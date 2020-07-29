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
                hash: 'kjzaqo6yv8b9eeuasim4xwq0929x5ytbir3lna7q',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '2u8gngsktletctdj52lxnpdcyzxcplkzp135dmzkjtgzui9nr4',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '476y0gy3o8zvll1ysg3g',
                party: 'ndxfvoy29x7np77jxsi2qzaz2hd2ywai4f2hc34z17b2bwr1iwk9e5rlzfachpmnpeddob8q2l3h68k5ywj0xy9lug487fv97qmiwqp0vrnt4u4oe7luau5cqggb0xh46fosr6pen3wuzbfdzvw0cgmcrxk44tyh',
                component: 'kxhw96zv0ndazm128lfapxiwp0yaiqfwxg32smo3mitj77ewsnvg85hv9s57jso4w6guw5atgiphwqr2rgjvpifxvj322t4t6b810ht4peu4yl203mxqsj86h9cyptpqtkem15z5miwq1zucyqy66bp94h3vlpac',
                name: 'r20db795zi7n57os99g31jtdq22u8mk85blqucdmasw01tmci8ecs2qmiqeqh0bndf5zsa0ohaha4csepbm6d7b1n02e3j1v5onqeqlhv19z20l4udmuwqchse5kt217bfqkbsdw5mo4uh3cswrgp0j31oyt8pwy',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'ohqhpxrfy1i7uuifsheg5rx4gxs3ndylw35318plid214p0qqn8e1wguxpsfuu45gkncozcs9ntzujbpvnolz1p6wy79kovagxwadgv85xowsvan33z5zffkvs0k28rjq8l6uwq3vm1rx9ocv7drxd5s6vk647tt',
                flowComponent: '3blm1gruzqz7b1ubch2479eq0fr3c55aggnup83h6pn4wktmbs8sif8a6r8momrppo23v86tv94nyfqnlsy5j985zgpzbminpkwdxlndmf1tpydpglohfvj9ltor1ux3hz39k00yaa6f1nq6dwmsn2wly0yvu8ka',
                flowInterfaceName: 'f37dfumftvoq6nu063v1tp4r0lt2c4xp39ribd2meq2zm0ijnxk4rm260zflafpi6onhzpj9eiipnh1lt76k16wkwq51mzvslw0crwe710tcyznl7ey1dh0d39u9fuj3j3lsyy42ycfw08yjlr6euw79rum018w9',
                flowInterfaceNamespace: 'pmawq4gvm3im2jq8lr6puxfjo9wvki2vi0w4s7wox126zbccknzj718u6681lkjnuoxfrbmqd98lpki7bxbo0bhzc9vsnetn8rod107wzfka0ij3c33v43xy5lo2spi75vnwriexu1qz5qx11pt4v9dt70549sl3',
                version: 'yct7um4c6od589whp621',
                adapterType: 'xt0mrtza43ewm47si58qzvektdya8cpawmf6119s4okhmjp28jg5jkv00u5e',
                direction: 'RECEIVER',
                transportProtocol: 'c95ufdu6bj3goxkfa8o90ymnn83rvmo2ccawq1scgs1jfuutrbont3g75tam',
                messageProtocol: '1b3h1262sr6qmfg6h56miki4ab2ler3nooe97gfulygqtdj3gi8cdbb6c8a4',
                adapterEngineName: '3oasr7n8lp1wsd9vkyu6a9h3kpc1m4n6tz46teb63g3i5nly0pmlzkms8w59zdkjeyknu6vc4ltipooc15gsavug86lcjl62h1eepvvepfxdkh67g4uwkxh917zchxq9d60eelkvwiw9f98f0s01p7quv0n9szx9',
                url: 'rovb2m8n3fn5xkfjqc6jc5uivakhk4e60b2o2hqb6dw5uwrh9vqlt7x1hk0el4kai9v90ha4fwanvlirnaeuz1tdypssxdw773zdsveq89bmllbcmrc043kp35q7nrl4kx2oile5gj62jsllzfmlcvy6nyihxrqkjf8cog3y82zs3iq0vgfr6yiouxaf13z2fufwp94nwt04zmjp3rw8lbjc5aeklzl9r7np3i4t26h5mjfyb5w3fbu2ajw7o76nzy80drsu1wialut6wnaw8p4ooqvu73prt63qpwahykvbg7dqj54fvehqdcrhjsli',
                username: 'sge7mqk7mt9winiynux5zhih2j2ynl1nj1rcosk4vmqx0tmb95lzspnkngqj',
                remoteHost: '6au04my3cw8ytefk3cj4wj6wpy6q1jo7gx036wl3jbx0d47knw7xayug0ty8jgp0t6kuogtdstbggky5c3cuzhhytdmokecj4rssl1t9t1nuinw3eo17l90f6xiyzhy8gvjs3x1mi2tv66afb6sz4kakqdlb7qbk',
                remotePort: 9128806837,
                directory: 'pbb3w7bgnpec8tp2xlxqmsxgzc1pargrtquuvhdx4df6yqmvs5ijcwrnlqjcf2pgt2sp6t984bno382ci1bdi6mp5b3wjw812qljmz2ufowjdihpehyzrpv0wgw1ab0tfa9g2d4ovzwkdlu3jnp6cds5dwv0yheh1yln1dlq1g8f6v8xnle5bwo9kqd4pnvrinm7vd8uonkaj4h6u1eqp3zxqz9iism2pdxne3e5t3smmk2in83tu3x9vxc35351d5up00nba2mu7cz17b39edakxl45wd4g2dx3valph2n09ymkeg9scxri8u0dpfnsu61164skyaip6ymehlnhbl5l52fx0bdk0s8ztmcjiqsi5wc1qdto9h692kkl52bfh3gt6yn9ia4mxrzi48owhiqbc9ytk3sjc1wqm5yq46rl2mnsrluiky80kuo7mmsbguu2lcmf072to675etnvlcdaq0dmp6p11uuc9xbnrd9fbghp7t33gr83f8uzi7d9jjwv26xezlgbi6v7rs3u0ejg5sfuqwifprec908jwmcd91ljrs62hn5wxcy2mqs7jdk1qrp1m5nqgcwx9u698shzt6g3yqn10j85rlgcdr6wsx5g6arm5kevk4b98mu00qo2g8q3aek5qoa2weowts5y1qwoj7q90qadkorj1s8vuobjkjmvlrvvdeidt5ol3j5nojglmmvemr8cwxdi5f8flc8zdo7lcy5c9fekf9ypeu1821cefgmlo5lweebl4h8cofxb72qc1h8218781rcrwgtpd220i7w72h3njifog7cpa0ccp9sy593o2cfetgh8m14n02pi1t1di9touoyefnkynbx29ipbjw0u9xc9qq8bgbkh4cq9kyjpwcpbgazr3hl6rf6fjqkfl87hx04igke61n3elnhn5lpqx1cazr31lt56143lsc5sjvn3mlhwnc4i8xqju9zt4li5doso12mvew53nu4r4rsdgygiq7a162298d2j6y9egqy0',
                fileSchema: 'ue003rxh937119ii9j1fetg161ixchhtbo0uv6c95zscufj2f3lrtgc8u6w5da7f6clt54ygprbchwgvuvw8wc0n0y8tjmy4n9m1v8l4cd38yn3rxcgarcxld2bevarsayv15xzbwy2b8p59058ir78mmx0pd7pbke36o554sabwxmtpc34qiih1qn6zs0ny2ocmsngg5ao6fmhh9fqi4qjkipywj43jov2e2m8vw7vo5vrm0tqtsr163kt3r6eh75g0mb5oyuq9twg6cn3s82xw1xcrooljts9duake6tx618s83v2vchmxx3ah6odchkm4d4e13nhebr87soahqxieplvq2nceazpscr28o2bx0kfxp8sjbuseamsnyrpf0mkw0ix8pttfu5cx2dzm1jobaajwb14b88pp68n4asjlda3zxi2mnp9cgvlg6e6qeovn6ubm8tt16ywptu1ognpm33zz8jihbrqmdzfvvmcg5zzc06ohhxtgx44q3cwi4imfvywse2qyadw6uxj2udzx49h13v03eo4ql9mf0ms8ggzq8zri19c6j2g8o1di40yrdfdmq8gwlgmxh20lmq89fa2lq6miskeeeeymufwbl1fwo9gquvbejoqxly9itnka52p8hve5vmsu1b4lnj88r41nk0y6yw42emk2h9wng4pzf53cxdvg34wxr1vjl4sfienco4uqvb0iz8adnthr75qx48gzdzkzolgfr1advuxzdwm1rv6h4x8syugcwa8nn4w2o20ra7nlbelctclv1etepzrh8coufkafuusvbhtiyet98cwr85c9k7pvjkzhxqxdpa6joe87yhae2bwy2l0t9vip9oguqczxtjhczh4be5eip2vvghgiqshhpgyu56dgd59tapto0rpxlm1wdn1cd740u2hoqnttw9qs1c20bi8eh6vcx97t0f2smdwlme1fgc53oqy9htb44qucfi2qga9oi4xaq5ac5tc5iufhnhpqga8o81ngqjb6',
                proxyHost: 't4ea3v1zrc3j12j7yf2mscyxwx681so9jhv4ayacimerc5ej2w09tl544h93',
                proxyPort: 3116316104,
                destination: 'mw94e3nblu6aqk1yd1w6pyrqu70fj9p1iakgt7ch1g6soas9lwscpdsutnpqz8z6jiborqh1mi5k8xolfkv03yevukshsnf28k4e69wj3co1jomsabn4qc9mhit63swo3dw0imi4j2bqfg8r0yxqmpqn8sn57tqr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y24165hrqmsloiekvz9rwxowp9lxi0r4b57u419ie3crnjpl1n04zhni24d2l063tmfgcxbnpuxd5nqyhxv2xspazxmc43xvl06vilrnbrkzhexk5fzzidbqgyp0k12wvykiktltn9x4xzv9jidpn86zadbjzgyz',
                responsibleUserAccountName: 'wzfrqy8m0oqzf105l603',
                lastChangeUserAccount: 'xo3zch0oln8444ytbev2',
                lastChangedAt: '2020-07-29 18:08:20',
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
                
                hash: 'wwgj1egy184d9b9xvkgeb3gss298bqu3vqgklfqc',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'm063p73d6pdgct7mb81ezvqe2oc0mc9e03n8wend3vi1shm1te',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '5wofllp5e9ow1cudjcux',
                party: 'jnrijv0m0kz1dclgm134tqbtazbkzy8w0gvn58jizpbca347dvk6lj0sdcfmg2f4vyzd5rk7y1yjziypvujuhg43p4at5xpss0fwj7pf9lpcnpi5om5tqb0ku1kvnl9k3evm4qjsjionrff2h93d1s9erbpiwqnx',
                component: 'axmada8h99ogywrvnqlmhoh7x5hpa3nfu9r31fdwummru9x18r40fewq5yamit2x3v0c7zruedai9zr1zrhpnd3p3n7w06zyv3hrtv34pzdy41uwtk1b39gj0h8uck80n7pi6jdbp7ujlscz4rj82oenyn08e7zv',
                name: 'sckva73zkdl45bn86ja91m8cgf0xt11rxxle2q0mpv2hbsq7vdf82lmlnqlzvwyb9nx8cg8489kj2m3bk2h9ma2lzj081bsmzsdz2lrjyyjvigl2wu3yev0tg9qdwnh7nxfynu9ko38h6df73fa6s1ajd55g8y9f',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'z32ai3n20w0xp6b69zvvs34gec6x6on91q0bzog0sg7bwn4x59an4wix7qp7o487pxbwro7og94emi3tj7m70zmfn7ov8owgl2bjtntaw46wevlasvukk95jkmwiau8p746rpqa8q81xn0mh0b5q6jjs9usfh6ys',
                flowComponent: '2ltwe6dvxacn0jn5v1t2ukrw6htwuf1tkh1b5gw7ihlakxq6f2ux9upvvpbj5tm3kfns8iaabkkf47zuyv99so6sx2uy4xh1smib6dut5pw0qhw6dz9oqhjv2my73zy96z091lklxz2uafydoxpsc7qhreex4nkl',
                flowInterfaceName: '6a49vamp4nfm2pr1bwmcfaavbuuqi0095wav5kqdg4i5dwq2nmvqf16xyb5sdk9tsy9ize2zigndjyhdmc882tjqcbenvgijgwfzo2lz6jcajfcmipli6jd3c3tdjokhmqw4f1irswl71cjj3fhui9rwbtmub55d',
                flowInterfaceNamespace: 'zgkjl5uxqbavu3tl1algyuckkycheupuxh0kbq3hyfkzly8srie1ljkj1kgiqfop9ui24sd28ni3eyvufo976gtr8s0obhwpr3uvmh7iqdhsrkbvwk4fzvdyz7zyjen3vtw002gqaelw7c0xv8hnoaniwpt78ovp',
                version: '0z1fshzkxii0tusx10lx',
                adapterType: 'jnqawzenqa170j45hlllf9xod2iiawjlt4200eegr9tktr506psovpbfxint',
                direction: 'RECEIVER',
                transportProtocol: 'bs5pzl784qz987o11qc3q1vu6mh7cyhf8pys0cleruqa3xoj3m4z2yoqabr5',
                messageProtocol: 'odzw7naju9f2sqsl6qjc4jfzmdj9ept0kf94d26ti4rt5wh83iymguh1mxwy',
                adapterEngineName: '74dwbwd830vkqdr5okc6dr74szpuy4fv9yikidx773izferdrrd8u35a9smrm8325yfx7hz0sepbpd7os3ybgiy2bi80padeu6ph4pbjksnqq47ue16v9wd3598e4lyi3m67jkeqh3q4pf0c7pp91n8d0z76t7mn',
                url: 'dwr4n9mcv6jj5vjg1deoyx82agl38fhdqo2q0iv1kf517kfig9regdo2sj9toikitaed3qbynjd7tzdzbwff2h748b4jztjusy78duumokfysqamvp5u2b7rzb5s3v8bie5638rhh4ke0jnl7zysaulwlngnna0jno4ijuxmokz5udpkqajl27vpsknxdeeqhpues3zgkc1576duxphwzjs27ezc9b6k7vhrynfvqyhd8xrgb4urdtgb5560yr0yvxs87pyou7pgjmpzxiq8lzr7t7q3gwpie9j5meo1rt7g41wcbp0zkou0j96mahra',
                username: '8d6itwg7brnj3o6oledrser14odm5fe9z3qpucg8dj0ux86gdcmz4i8bwoou',
                remoteHost: 'iwvs1g58raf9y2lobdrrozuvyn5zkq0igjndp0z6zh865fjh02u1wxiic2d3hsyx0aynwknbnp8sh8yh6w9c79olgwgee7e8qmn2f9qtdy9aluyjh7v3i8y30ym009pkmlj9xx3n0lrdo4w5dko58rqjtx1j7zkh',
                remotePort: 9224749721,
                directory: 'o1zrjd5s3i58l46zej1k8wcjepw1f9vocw998crw1o3xpm6l1slif7dpb9w73napx36omufvvh9ras62r9ww2btwd59xfcbjk8rp99bndr6qemumi62ravcwtec2lin6vesfc30png02jiuzxp3qgdu77n646ovqtnc08jz8z2b8fe7erww6u1k5p75rprtydr3j2p7arjwsnt40s3niexk9aq21fkjmxtr17925zb8pse4lnr56kd3jucrm2lgiqr0r9ajxarsmukrrbuv8a6mv243ypb48mj55gxqchishrttku2qfwrg5kkkzdazuqout7m7njtgxw93bk7neie5fzpukzs4thoh4uwla9ofhwt44liekpu7k9jyo2ngjthr7or4gblrlzblsulo6iegjk4sh1kkzvgctkuvuvz4yvw79kd8hrq8njtxk2n1al2ptj2vwqk3no7if3qz62chxgp9e9ovk39yz3dnsar0uaev523eehosdve6hvq26wibl10wy1fw6nwbudfk2teb69mv7uiei22b2v21hllxbwk95ix7avboogkpq83tjp5wwo8ibhayplzikfezwog10g953za5oyj7ufl8o13u4e17ebjenf71dulii5t9hap4u87shgvdvbrr52fi13jmi507vr827wiy8ae3946g92lj7lcv5hjd9fie34c84civemq7w9ox78wbxl3biotv7iy78qdwvqi8hpdmreusrksh13dxh8z6dhkabr84r88wbtabh0dpbt7v147ntvyiacp4km4r57cc3sw0k4a99dvedwrqtg0xgakxmd5qysavzlv5d5tmicz01jn0xoiprb68ozl547fka115yvte28gy42na2l4dndjy9kj73lmqvaqrgo3w6gbu8ikf166paqckh04cvq4vztqeqhbo4nsz6qytdd16tr992vngo32832oae6qyikexsz2gcm43fi8rh8g7zkhubd7ik59sk4blu7eh4574b0ouo5oqs',
                fileSchema: 'p15fpgnqnr10p1274wcxs2lfuk5eq490oh9oee8vssr4lki19g9i6bxbxouvo4kkovgswfaj3r72o3t2d3cb37rd6au5sbiqsx219dw9kl5cbiwc7a49xther8y1o8p92137y5f564hd8qck94pysq77evk8e58rrde5byaq234639ne5uyjs5clpfijtmvu72vpkrway4o35q20nou5a8yzw8npta4z7csxzpvnjw4qs43sumwbdqj3gdpoipyggxkzjhmm28dagnutxubroi5qpiqpx55ueyz0qb5qbcj50b38ocukjvqarpy227zto9nkc5w3fzqhpo0wiiix8i3db5v7utyqoj81nl8ottbd3umjgjpxbsmh8734saofqro86732ty42o84pkqudu6kyfz08vh4ndrwe0mv0yahuaxsbyt2wwfnplxzvzbuf909jze9nujp2zs0v51uxmkqc4j9zymybeir3z9upf90k0syizdvn6neysf03rijpr7iwfo5gccb4pugein6z2li1omnchpzs6unl5wqu3m2iqdxhkctxx3lt558ithbrzzq8qmeoluh29fewhlw68co7kwbadctn1a9hwgo8nwo8h0aety1j36z66dbum339wkf2oq6f18xzsmauxgu6ko8bw733vpvtawa9pdj4rdqzhwy9rdpnolel0bloq9jrk4r5h6hwotc6p70naen3eruv0x2vs4m55z88po48iyfghw8eo9ortdabekq7v7t4pepn42494aj5d317aycg740g99j3wrg6vg5604d05yynwa1ju7k9jtjbb0sh5w6b4ebevv59rc1o9gzdvrod301uboixw83t294lnc88a3wesqv1co6wa8zn2s4sg62xahjcwiaor03yddmzztzginrlv3qsh4ukdtnndaonq8mrfkez3z9lfovw8yq3ksugxl35cbl3a9xsitfokdbtpj7ectjuz0pm3ym6rf6iwrcmibv9qfthr1te0gqbo5x8',
                proxyHost: '0t2ep2v3fj8ij64ptxa6ez7lyaf0kxurvxm3zu21s9pfd3cf6vjz0gap7l3w',
                proxyPort: 4242303176,
                destination: 'hsa23o6162yo4p1n13qviys7y3m7qp7824qjjhi61q99gu24t4chg9qwxjs8ipn0n5znelrxmzjh1d6yze6n0dd7pdkl7f8ffxv53dcvpsgui05m7ubkfy1jibz5gmdl8i90ai7djkmm1wuip9zj48figlxi265e',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'oxhdzx8qj8dchuz0zmy4yk3pib8yw8a9njki1d0v9op7klfso0g97bsma2kjfu2lo98czbva3o767vqxxs0886g9umiqp2hpx72aplxjy29uleuw0qvwipq9e4iwq6ht21yfig7nuyem4fjqzg5r1u4a5blawd2v',
                responsibleUserAccountName: 'qvi15kb8f5j1wfer4ndd',
                lastChangeUserAccount: 'vh1dpcplpqc9p5bzn7im',
                lastChangedAt: '2020-07-29 16:14:13',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: null,
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'nwbmoujgm3gjyn938j7m36he6odayv4ox1z956n1jnld4pms6g',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'lgvnbhsm8su2vqyatflj',
                party: 'siw9ks5unob3qcn9kvliuc4dehr8y0blaeshopvkymkhyvb3nay4zcrzkp4dvcqiwgwg1i9gn6jbzpfi8zd6o88uhvsd7irxwjwm22o0twt8m9ktg8261vvd4uzv5zitqtly7851n03pncyau4b0vmwt24jffxjv',
                component: 'kcrc30vo7w31m7gcjh38sakwyalbaov7sp9mq29j7kgpaqg9q36etqljmq3b677wwuk7rd2iev03j7fltpydql5zmh6664npicclprx4g3xphhqulj0emfeava9qsu66bdze80dxwtn14w081qck23ycj6ze17x5',
                name: '0txfb6cl9luev9a3stq6o2z2tvln20xpy9qymq8kvfq9ejpmdtleednyq44imcgar5pr04vqvjanjckcm5gd0695kcdr0mmw7i7srlyv7xii1w05l0bmo4jmzbguqye7ks2il9532k1b7vg8rib8aeh2wml38r53',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'cxupz3qdn52k8g7c6sp00stp51v15nuuwjmrhg8pam6yatjp24yrx7xnob7rnf5bfc226f4kstpc6lmkdhhapnas9ljie5y2qmsmkb2pwta4ydwxj8gf5z006l37aufg8ouxzrllfmtaav1ygo5702xkrlqrll8q',
                flowComponent: '9mehfgnpz8ted6463yc158uhjjycl4lngfopzhl7isncwam6ete8v5id0tn6n9ykvz0yn7e8jraha5rfmej0m50zncexwnjv6bsn0chqzvyvg8jmjygqfua9rboqi42h7in37f5xhyhcs01e3a4rtrtxdszfilgx',
                flowInterfaceName: '8ve2ep26lcuoydxgahi29ggd6uel6hv95p5b6rw76xcbnyaltioaw0ykb03jfzm8fnphfrxco8nv3eyxsncm6wg1f21lxh81bgos8q4a1kizep2v1zplb2w1zpg6ck8bdaozqkzdzj0xf0p5dcyaepj8kul5b61o',
                flowInterfaceNamespace: 'kwxhagpq4145mliv5usswqweodjd127pj125orr8j8ig54s7l794cfod9915oli92iocagmc58n9q425c377vsdlhhes9ixc7kgvbu5qesvj0agsy1d64gxraetr7a7s5po2fdlfxhj4ldyjwute5s55kjs9x9oi',
                version: '2ap3bx3isctn5tzr9god',
                adapterType: 'zbrby0jmf1jy1r57mwuud6s6v6pozs60tqopzahi4loozbkdny1mex2toyhf',
                direction: 'RECEIVER',
                transportProtocol: 's7k0mu4bk2ken4ofc6vigkrnrip283ik0dukhc3rwmrprrbv832bvk03pd0s',
                messageProtocol: 'fxsfoda35u5cxo4amtrw8kbimjefmmqrzqnxohkkg926ypv5bjhn9exj1usm',
                adapterEngineName: 'u03j4ttn9pkhueu18dbymoyil7breqxshgi70rfqndhsy4vl05cohdml9n1vhcmuxuf2e2fr3p6h4kmyewopvv3sel3jg3ekh4hq22g7fzysedypz9aepmqguzez7o1m0ej16ky9i1kxonz9o5h59xbupbt753z3',
                url: 'r5v8bpr3jlm12rxkpvyr397qaam6lfqwfyqcwdlncrt2pzxdrgmmobxaijca6930vi33cv6eqk9vrxc4edgbjvxhngyzxv0k8reig5ojxdn6uli9fxfbqfkgivt3aoq5c2syx9a3zmcw1fnmngkvy8ievk4dzyhfxzzx92dz7f69lk36q0x64s2qnabi866sp67oe70hw3272fkh4hzbku9oonwkezgy9g1ll5qjme4c6p0imc5tb4lxdux0cntfxts5rdtm8fbwhm5gbvfc8t5yef2ttfaj7z3iw4c1h5lc7bkof7pgm9fdp4lvvrmd',
                username: 'hkx2r35skgk5qxhrw4cdwlj2ans7dh94kuxit0j7h0o3fp4vps8es4f1eljq',
                remoteHost: 'vfvux7ip65azbu11z3mgfn1noyvthhgqsopm6f8z3u8w0gyag54s4nxpe61pwh7pgly63bsnotb0g9yqlgjixexrsmn5c9xnr60qu3idc7zf0s0tpecqxunpbv6mz3k8j55hxdm9mdvuo75hmuxpfqx0ddphnw9i',
                remotePort: 9413573936,
                directory: '03y705lfovyggrudo4po7utylos4lzfplvxtn2r7fep4z14u46zmvb7b6i615rop53xme43lpvceepsukzj0sqpr8ug5s2lh0vyuolfcrg12eey3isc3g9te8o5fjg19xprm7bqrcvaz1oinsgr4z9pt796yue2e39xfvjhr70d8235z1c84vtsujxp86gfjv6s93kzlnppd44cobewu7ru1lrq2sfyb66nc7ewp6p2q7t2xymrjpp3ziv8bt4l7zufomb0byt4vfmg0l1cti404smxraevo4xbz5tp84ztz666m43klttnqx2jotet9vdcosblig7m7g7bkotw2m97fn6qf9qahrw30ys9owvau22rprms14jnqxav2jtuk7um5ayrcfzq840ljhxx7h1gnf8kehx8f1b6qfluy9z42z7wbrjvetmqbav5l9aivykrvstbcresp7gsuhirt2kbnfd1zxt5p54by020rtj3sr91if7pes45vkwi9o9g93bvg6i2yjlm9mp7stvkda6fsb2heymt4u3hob4azv7yz6upul84tviexajcafi3s1r71zh9xvwlr9e6f87ycv9loj8x6up4eictdjvmaxayppn1y0lof8h5hxn0pdowq7yujsa6ck88wltlknz5yvd6s0bes53dps2arp3qcd2tbypw7368ge13abgmz4i1ubhad0q88lqk3e8r9umx6dljzc1o9lr45i8qr62tzt8hzm6ng1slx6g0rhvdyvxkco51u3wzgdh4hpnt806jtvqoqj4zpm662ah81g5nlkzr5qio5hk1eb863f7z2eous1mn1eighd20gzs50cbeh8s162gulztqill3o3e8wdtzecv9hyx8u1il0qm4kolr4k6tu9n8goy9hiehc9q2bz6f3d4y5h9w43ejrrt8lrw9r4nea0ijjpy8ceryrqzngx2fv13axwjgxk84p1jg2s9hijsqmw80s3j7uqsreuyzrkx1cjjzo1nnil9jkq7fb',
                fileSchema: '22b17vbcsorz616ewh4fwhj8rkwwgllrikov360iea3lrpvy23qwpfe3gmia6ehpax2u53pt9hilleqp8xgz6quhghhhtkpmyk62jwtyd86gozyu5y8fht4ov517bvrysu0dfvj35exqmo703ed8uvs1btc6mtktnbc61j9fbh8r6cmzwzowx8hvqk7cdsox63hp0b7yhvyh8g3f4sub37i4uv1ghxthaq5spunn7tse6mxepycd88waqa8vwbr407s5uqk7xouozwbb2w62pa3kp9hi72eshmgsroq1x0rmvaw0849yuspgdv80jzksya07g26y6h6lzccyh755y64swnid108uh3thlx0cu2ge9jd0ro850wcavw4113iafxsv13fbfpi9784vy4qnryaiq64ley2eum7r3h66b9wj0acobuobscahs79l1jpqla8kg1scwtkf1czqkutjv1e8s20j9efceefnwdm44gq4v15d55yd5mf9w4zs73muo3k45c0gpul6750booyg6ov315dc8sdu4rpt3bekq4vr73a5d20cas0f9pmvbgmtooew45mpm3bgifworn6vomlseqknlhzfnuo6zle4vkk7daizs47ji1n26rldi8zqanrbpvphybbgpif7ypzsl6ex3rdutouxrkzmsbexyk1asxzd3ylzj87ltuhbhmsrzev2i2nlisynhu1omc9o0ymskvjaim7igmhq5azj46o68ge7x7cmzegtujtg3lze4js60c24x3xywhbmeps23ez6nmzvaiy3qezrq7z82ypb5yugn0767mtzdhmakto8bvy0ooxhvvnnwvgfpyqe04cl0z455ajgdgg0jn7m2lciyiogd164bg77kxb00ns871s70ekw4mv2oikum9pfbuqsa4s8suv5tzbezqap2if94z99kenjpxdsqxls0l543iropd5l198xsafnrk3ouwef99zwc7cqnlt5zfwpgxsxespysts3ued8oddeolxt',
                proxyHost: 'mkpi96p0vaji69284n0nc2nkmtan7qx48eialv8xengdtlg061jto7mm3jgk',
                proxyPort: 7094148903,
                destination: 'bn1eo4zc82347z0tyv8l4jbcuvj21xc19zbuknid6ftpezgirdms55kz2byzr3b2jz1hz15h2juz21ni06jsm8b86tzm0orlqg64vogvzl8kiplcrmu0ewp8an2eh7923rg9nz0tiq81r7at4yyf3zmv5ehjhte4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'a2npsnu2rbvrb1rn2dikp752idgyxdl9qffrprw17l10hmpjtgwggo1drcn41h2b0rdak6r90j4pia1x3o3mckkz1v9xmbxgx3m1ierpjvqoglmyadiqobiknt0tn0zhv71b2fyr4ged7wvfpa1motglbgoolgcl',
                responsibleUserAccountName: 'euvv7i3xukigiejplzjw',
                lastChangeUserAccount: '0mvghnt36qcphivovqpa',
                lastChangedAt: '2020-07-28 20:15:54',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'da7con2fr97hdk9v8xh4k5fbqvdu3xu1hxkdsaq8wicrpuxsh9',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'vyqv2vsbh31gg4bf38wk',
                party: 'e2vt6dbvet7cszl7t4tdyzrrsy9z2sp2s4q576uscpq4l1g7bq5tmrbxe6m6l4wkb6eqvtn8z4sntvtv6iuwk5yc29clpi1eqsbno5nat29ftiv5fpl881hnk61adffmvi7phy9q787ehfhjplxqpg1y706zppls',
                component: 'zi28pi6ioqg90y77h1qn2aruf0r2y7w9so7oiugh7g5ro4aes0g2ipjqsmi08jiar46djbb6tj51etoxtawtbq359m5w3t0ktbajpzjqdgjjqc9c98qdisrz78w1qskzaexwnoykl9ppdbr9fzea1devjmfjuhm0',
                name: '3zfe4c0cfauhtk64qq6n92jtvg4dxes2b0yn7p9gmg7fdovao43pnn5dcf17qi71mre6tj0sv25qx6qtzz5a8jmam04mbx1uv15a30tv6w5293fgkzeaf1cc622ipawa70kv9qeo24ykodf6ya3y5ojzh3l3vv3c',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'smmo5rmrn03xsl3oaxvuoyq7rw1y0y0t6mpnnvkzh5wv4ah5eo7qqzy2e4qckac0jkup7i7s1cbeva2k2664lxlewlrzu8lwfzxynk6ochibn72flfo6fp16lb61jjc6p0fb6j1awwa4bqnt1hbivfijcj603khm',
                flowComponent: 'at1uosvotl1xoqeibz936p6wsj8wtsne8zo4xtqngzfht85ok529lwqiw9i6kwrzjj0bg957z6w5lnppba629n8hxm6eerl4bnhwspr9iw0kk61tszntwvgrmp3xnzihtopn1w2rgtrsd7pw3cem7ho73dftyf03',
                flowInterfaceName: '7ff1r3ve2wtba6649v8ujzy0l6pe4cwg4i50fwcbdtwg3me1qc3wbjbb0s4nrxbqjfheiwbppjfj56r18rg8hdurunbtnw2di3f3lfg9z9fp3nqs23mpme64hl33127gae5nbmn29dnhi7b1tom4e4tjhpzr71pf',
                flowInterfaceNamespace: '7060vg4qhungsg4t21xj11sjt7soej9c7dirai7qgcm80ydpwuiwmcw6h604p69s5zzm3ay8hkytvg5bhy03w5powlqiyic882iud73ft7r994xacr001m674drm9v3uceicbngzj3kmuk9s2o8kj7kc94xyfpad',
                version: 'e94rpkws1flolqqhe3ze',
                adapterType: '830lmjvn25dr6e1r95ij86ltdo0z93jewvuz3c2y29x5i7wyocy9r3bxadq5',
                direction: 'RECEIVER',
                transportProtocol: 'hp0owc9ufujrfrks0rk8whoff6y9gg76qds7f0w19dpekng0auyvynr3hf6q',
                messageProtocol: 'x447rg03up87o2rdt61inuo2k4p45n8xvlm5p5w2128w0ovhcu4l9rqkiqo6',
                adapterEngineName: '6ox18i510g79drjtaimdlhkw72h00ifn4hnxhtvr9uwrvmtcazj3ewo9kni1avt1e2bj9opdsv2vscgqlize7cdjab8bshj3jokrc9f5ekm5m5omnpgcvusm07ftw4xxrrehsjgyg8wiyvtg12am6areiy4mwy5z',
                url: 'x5598e0csqou6y2lbppxwm906s2nx03pl2dlirm4qzr94629wxuy6yd1k121waj4oenbaa2tbg7dl3igsw5au5x9mfhbzqbawyeozbtgo4mg3r7iaa5jneaenowqe00cc97yio1y2bfnsgsvlzb2mit5834boomzc9kh7wm7gd40m72myj3vl6jqw00t684d0hi2jeowcn1p8jion6jk4xirzky8gnljb0r2zoauflzer8j66k3desyva4lq59vv797o9h7h9kbjle6gz4t3wccrvhj7lfugn2jkzwal4lcxq093tww4q8ybjgiwdps8',
                username: 'kzaxmkowdpzx5dvde8nz5mrj0y0vt0euvff4i0cpl74uqz5twtcwd7hx7v7m',
                remoteHost: 'f81kwuelddt2pmb1eio45ra2f8b1f0r8woy8hxdfxffce7l5tg5r0rl26r5sqztqe3p49uclsriczvjmstg5g2cjakta26sd7abfac36dog147q0xis3rqcntynoq9ei40fba09e8gt4pb8dtr7pyj73wjtjlkxf',
                remotePort: 2608804089,
                directory: 'j9djsgkd2ek4svikhuu698djxixvdirqyrudy5n7ylrr6lkpyeuwmwb15urcpkjfuijxxm45iibozq45mfm3wvp5c88cozu64x0h5k5485abl88n3gr5v1jg0avh8z14v09go7pax6cm3n3m1p14j5h66ywhk7x3v3tujpnn6i86cs60w712m3dvdeylkj2zfx9rcqczz1o1uhyhi4gcd80gvb0b46cgqimfpnhlifz7xedwg9vcnudxrgocrrgseuxjyuet4jttn8wuoxb6vcwqdw2p8ze7e0m7cgff2f3ed105yqxhfkbxrlrbwvhmicy5uh3prylwyul836kgryrsk10f2nmszqxogcmexfe8mp4z1gs4hofyochuh3f4zn30g7lj6iwch6m15otjijow2ha3pb3seaeszo7pqorrzznoas5l8aunkbrtskzsjs82j1ymvm8rr37y3sf2f6ezqc637707lkp4go4q6tq2bq3ssuqjyc8qkcoo0222e86yff99y5g4rqqzt0fj4fvar964ufj1pk5guwzl2cjz8y8lszb73zczgltg94v6pxqka2cr5tjw00t701nnx108lv119i7654v83wyp4jqsculz1bouci61stcpi3bu9d9zlht5pijxspo2k9cmcuxfgzd9k98bb30o97oahkj1px7cnm7a4rpslv0wfq0z4lmmiw4untba5ghovxm3lwhb89rl881ew0cqoarv0is1g4xmfqcwtarb51w7rfxvsxpyeyi1kfknjui0gca499nzlppbh0p0tdmm7yq4d259jguc3vedt2qrgvrkhpxpffx59ge17wvuk0rvun1nx113tu7xgadupi3wo158guhfxu8i9tpq7jn67qdq6cd22xpmfsgohizwno8xfwarz8nlj040pkxmvyx2psqcsqk1fdmsi11tx137z8jpggyl5v7hp1s5f8clpe54f94tcaoym3r3bp58w30xl0xks114cz3bvp1on7vkg0p7oma6',
                fileSchema: 'n1vq6xfcfpnns9wl7xopgihahgdy7h0jdk8l3ebzt1avucxv1ovjeiy6i3ptm57b9slne5a1jxgy8krip7s5wmwx0ce79yq9ynnibuctrxwt33187p1z1z4gxkd839v21m4clisr7v1gcjnd95weqvp506n2tl5n2pr2lh7j95lun8w3ygeairzmmyn4acsf9fmzhczvor844l7653oy3aoqahh6t370xct4iqr4p54rpuo1eji2x5e51qfr5rn1mu0ugjati30ltax79z7juo375e4u18a4rrcb9en93ughrbz6w4q51z0nlwcy53cwmoz2hen16azwh1opnewhg681po0b8vo7z4hk0hb3ktu925dhbcznrjdwcy8hl0sui5rmczh714g6oixzcivgh5a9ldy2xrfgxkr0uzr1cywwlbld4r15wcy5em3f80h84aqto6np2uksijs3gb83pdussn7ss544cpwasmf7wx0wohitglpmiw47bc6ibgu4xe7xlwb45e37loqk578jjdu42akvxsbjynv6g92pdnz7ekyunhlfb1ox162vdpktv0jn543k761pw5jrl0iycg1sfsldxu5c4xgrqebpxuzp8v9ld2dkeoyzdbd4ra6mvvyz899dc5jq62v0jlqcra6s0jaadt7f5mj7u9l5tiqm4v9u1r20892m16foy5ryigd85zexczbpoqbgtt8lnic6vrhof4i9soxqxveqd6gk64vpklqrfbl44erx7tbwzb8b1n4y61nnx8k7bfdhw3fhpor77777lm1z1u1szs31v41dkz8jumpojakwmm8ridizz5vcyo0su07lg7nnqic3mwsrvn9i9b8a4fvukkz8beyh469xwzx852cfcprfba1hcucewjccotxdn3r1yuotuv4mixl6c2y8esd8y8bzqtjedtz8bn3le4kmgwxjq74l2tzac7gp0htgnd0yvrygoh9l1yz7ik1sk5ee5zxd03zdzlmi7qal146468ao',
                proxyHost: 'r4ezle1wifj64v2vy3xew5bb68tojwv7jsagi9i0ghtog06796ltfzda4rli',
                proxyPort: 3936338461,
                destination: 'aac94dv5p3e771ykh5noqi69n52fibucsnx8xatqigl5q6z5qwx4btgmli8gplw9n3neb8r6niqjg73h26ij3682etopeiing9dxrk11q4gffpki8zrydqd9xvp66wcxiihu9x3ubsxurzh8lmc6tewcvzz485i5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'blth5owv6xmp7qqb7f83ot3k1mvos5j3yqd8lfqybt290j7h58nw6uklju3avaw32eajhnys4x7dnww813ny85v1acglbncbypqli4hvqg07svj9gnlthkrxf0yxzsrfub6j4f8qxncqr0lma4ahcbbsgibh77eh',
                responsibleUserAccountName: 'yjpx9agcc1h75lvqv075',
                lastChangeUserAccount: 't5tustyc5kpi5aiwz765',
                lastChangedAt: '2020-07-29 14:43:09',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'ppisjpc4mn58s7qkvti6scbd0esg7k5bab047euw',
                tenantId: null,
                tenantCode: '9x1dn8utu3lgxsxxudjyinjw434q5exsxpv6lryvbzcvgpiqqj',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'v1eq350nvqrgz248czxi',
                party: '6tzrgrgnf78st1lmgnii4vw7cfo1jkqpzip6pjq5efjzp96d1z551qr6ih6m8b6c2vowz5h2d87nvy1cedicra7fbrg463zawzpsq5jpkv3wod9dbk8qkiqg8y5e3c08syg2jjy49ck7lrtzs9fhatwgsve8m5mk',
                component: '9zip7ift40uzdi0dcee5l7lrwkqij4w7o1n9f42lhk31w0a3g90s2se5922s474uhooctv22rnswwlv8sa036mp12wxa2dr6xhleulcoqvl3qzjoddiodpms1642x19petk6q97eogpjii3dam47bls8x4omdx3n',
                name: 'u5u0pmhpd1pol1p2a00x092l67zl5vz49mywyuxvgucqilr4udwg33dmpc4fn1ehexvyy9q6e515svn7ut4b4ozkomsxn4ek4mwkwtzzz1gy581vwq5frksmdifqfxwwrxg300a5vtcmc84m3qjw7g7kbzg526n7',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '85eiltm26f8o21y4oduznnqk6p4agv751z02pd8v5bvzm9afxw0rzta5dmzjl8f907m0avluuuwm0een8gh5joqg51h188wcyp1dkys2xu9s9dw2qrmvpndtbigx3c7mah5kw6ohjbf5noii2ioo3gp6fwubyywd',
                flowComponent: 'lwqjaixsr6lhxqc64julel6xt5nmqjeufmg4p2p9qv5is2b25hbyybrerllz823ditntousgukgup876ww4ycktf6j2z9udu4h8tx3a3c7xom5eepslxt3931ogqzy53vfh6qtqd9uf12i0bfhzlpoep5y1vg14y',
                flowInterfaceName: 'mgjgll4o3orwjmu6rlcxkb318hs9pfj2hbldt5tr90wykonlzy81ha6c4tfnal28ic2dvp8hqkkt89hud9clxlv7iblt6hh5kazktmczc60avx5mlv9sfeqwoiufhnj8ccry24oyadyawbk0f9d7a01gquoaiv69',
                flowInterfaceNamespace: 'rjxm5b1q2928o5nddqjmpoh0eyf3ef4gu6w9ekmq8115ta8fldid2xw1cm245784oc6e8pobd9bm6sdesi6r4lnnxcxdokzh7ytmzrqrcntrj716scz5myb4v457me9cq9na2h3zt072r67ors6oboonf8f47zvu',
                version: '1nop0gpg36nju3jkn4uy',
                adapterType: 'reazi6tst061cfnhridzib27znp4q3ixkmvuudhvh9qxsseoa91clssoh1kx',
                direction: 'RECEIVER',
                transportProtocol: 'w9juuq6wjcsxnuvoxnbkc6p49fw3h4i9tjb5htpqevz5ue8pktzshtg8tzei',
                messageProtocol: 'hoq5kylhbul1svyxqa495enjyqxgxol7q9rdezg0gixt2mnapchf0pjz6b2a',
                adapterEngineName: 'wnmzd4u0n5ctypltjom9aumkky96hp4a1cxya466rbm0jkjp8gvxt1p2bi1s0ps23q0tz871q2dt9qs64ehs3xkca3w1dcbnbfsza2v1m7noyeuqkpwsla9w2hlpwyskn91zyamkwnblz8301oy5d9t9tgzk8v93',
                url: '1gq3022fa1pvfik5o5h2mfxp0yrcgevd2b8bm60s7t9ehpq0n0p0beevb5gz6fsp84erj9chk6igt4h7n6b6yssj51zsw1mofybo4bswedtdkdvfkontla0wfebb0uxn45cafjne8hv8poui5wjflwn3s1uaqrzs528770kncj7ovqvqmv3pmu2mnbcgtkpev4bu0tqedhj1gkclzxamh92rj80yf4adrlljc8g17zttrfx4m6oo5l7w0jw64byz92j1so3hhrxk8hbsscvd8tcon5tr6envytp5t0a2djo7ohsb764tbteoyjjrg98e',
                username: '08mud75j71mako0l1oweljclxaoqx3f2opmvf03lieasgngsdr186e2qz0us',
                remoteHost: '9xnpvbharwip0q29qgo1ulgcts1q97quma3xn3cjvowyv62ql4pbhkvd5l6bdi6s5n80b6q7ug8umahz225wtlpyec8j620m7u60so80oyt1uxfo2weclor6gt69u6m9v0mznlejo4bxk3iamrhr0uqak6lfhmri',
                remotePort: 5588655897,
                directory: '4zeq2xdcts5tf1nxran8krui4pbhtuvoxuam9pn42bxglq0oubhzm0vcydzkugfntdkbbgvtoawca9ggn7wt1cr5jdtw2hond50hq6z4iz9zqxd5k2nz3ovvi2z4if5z590civ1klud7h1m0kf59fz4xw9tq0med47q5kugguh4j8l6qfhtx3w2yc12u2634as88hv219jrdx1zkm6sncm9yuwmdffc27ejl68f63z5oz91o7pivcd7ngsz1q9vc7fbb5irfgxr62vb2bhup3a8aoe6qmr03ivehqfw5gkuc37j2m2kekky2b7vzliuti5sed4012v4ywtedd54hu6pdfdm7pah45xhn5otn2fuhdq0bqzqi8j6ohg6bav2v5h28dljazzqjgcavfbu8fvh1s2rsdbyeuj63g8kqyzoique4u03j4cck85fyme1hqs6vnuuhe374q3nf4pjdwl9gwn15zaxa6jg853cwb5ehvd17s32bweypjs6s8ea2vtiei5w53nyti5jtn39oa0mn9gbbrkfdrzofp22dplp0aaftrsz8lgaq2cdwn4frr7xcyv6vzf9qgrqejo5olitcm121zt9rptcx5heff9e8nj4d41c6ce9scvkuudxr2i4uw129bdx8j9fvgped1kfdg9zzky4p8hu473xhhpyghtbqbr21q6r32acl41qafahqwirbl5iss4fdscz3x4sfspf2xleapdtjp5ve3omk15zyss8bcd2lhb3q8f8pse4djkw2syelff9hp6obrr5vdv773xyj5qqqnz206ld82224qygxdwverc93kzubb29j0bjnxljxj10kfu61c08qbowwp66twx601s5ar5hx9gjifxud1pcj3smbish0i9dh74zs71rtty9pwqhnlwjt5ule3dmgkd7asqgcuifk1aeokg7l7hhzuodesk742lmmvfkft452fg5vv98o2hu7bovryse25mk2s6gc6vf6wl9nbntna3ha909bm3uu',
                fileSchema: 'g4q0ctl77peuz5922b5xbcmij5yatw1hunsg5p9dylyaoy91hmwwiyu4muxd6vysg15gdhfe8stp6vn74lzhpqbr5z25u4bht58f0ipbfq19qsi5kn7ifhf223inde70b5es0gza3t1scehm17knydzayzx6evrqjbcfofxvyccdu08p4u2bddwgxbt646spurmpjmmttks7omp79uoduet6ms0lli395ihf7vh8tkxl9lsdmv5txbjsrnq7xodvitfkq8yzgnhm34sgdgivzsyt3hqepwmzf2mltnoepjf67c45ag9yl5kn5ujka6ei5bwvqw57fc0p890pvninqestvkazuduncr4h6vvqjvvosom38exga6zrvq013vx1b87r80lmrxcocmykbidv2bvhblilma6a4amqbwh5r6d33isdrghryshaw0wlmqs9kcipupsmqk76fadgcsgrtfzb04vwdaclr7jp6kbyzwz1vtqhuer10kq8jgkepdf84y8gh2s34v0txplmqck7e4qvja6le8l8rirushs4eewvbxa9195ebpm6s18j0vfu2ad0n6ct2r6a7arm51mdvb395t3a2gl82ur2oicd4c3jafrwetf9mt8fxvf4qa2l54o9eq4p1ngxh49aqxxk76nfh2di5hqux2j5kj02s7cyd9nlcmegttpav5dtosz7c5p5qgy4m2hrh0nbzscv0ibysqhdfr9u5wtuinowcyj7tjlrykg5pcqug88x90w99ct090r8t5r1xi954x4pf5wue8qwgxucwt4vaz3lrrjp6y9re8tz16i17sxo4lcah20tgetcnafnnis3oj5udt9aao7ufm2n8wllm2zq80u0f8hhtzyihrq3men7330dv7j612fch6ue4x3ea1ifo42wxz2s51fyellv7e9yj93lorypnqs03mwbzq8kz49o2q5iviop2f5mbc3ilx94hd8s4lqgiryk3jphfwz3787ox3dcyt9rwyraqe2vg2uq',
                proxyHost: 'b7h5gvsjdq3skj3xslxqyvndrtu1v8tw1lso4zseme0e3py7r7omy90hutlb',
                proxyPort: 7653632608,
                destination: 'zdv0g6kawr7nsv7w2blvaml5yfdhd1qhbwwucr05tkwmsmiem1swv8ql2npdkv2u7pe5epgeazb0wf578brxnwn9re6043tstlibc9mbusz0hxhwbe9nzq85o2234fxsx1k8yt04ltone2rrx1hhlnbp29hsbir1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5kw4wtmbyr673sv1djdxn5w62zgsfxghxfdnbbu8pr9eb5yrwv5lbyfyokid976s0vrm50w9au8h7fo5kwqyo85crjaz6egnhtrot83dvnjndon6rfj42ockembg89s4li1vkik8iy9y8mv3mnppca4584td8jb5',
                responsibleUserAccountName: 'ytghkjxz9thudsw8lbp1',
                lastChangeUserAccount: 'knlb5lzu2xgn636g9vwu',
                lastChangedAt: '2020-07-29 09:42:22',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'r23cash68omzlgfrwul0aox6rokvua258jez309x',
                
                tenantCode: '1yqt6l69kjblbbh80iy5xzbzhof3i5vtpjwhybn03zlm343igj',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '95xmgaltvlmaxgo72dsh',
                party: 'xt6qg96zz58hmesi3d3hzi8z2sl165jq622avpyppol4johovdvzrstbv70x4mv4ved3h34222zup9ubkari06h1t3u52j8u36x8f9r9omgxvwx9gz0a7t9qnezkcv01mvpw0snwldx0gsk7r8mj1iniqdit3zvl',
                component: 'orbsyl6gnlafckz5he6vbjsim0qwpt3lnbzxrbrewpofwizbujlsp7cdkjhbn3dqmdi7ot029zb7gu1hqq65mzs6np3pv2b8el38iyojb3iczzscilr1wruyyx4shnhqp5w1b3q4xay35u8z94j3w1vjfhs6kly2',
                name: 'rzcpstfau3xy9f0n22oaoq7tmhazbh6u8cngdpghdp38t0fongxszpzi92dgxyaa72rdspe7ofi5txcshtkdt29ym74ynxanakhlmlnr6m30jnx304dlkmuo6krvswkyahtriiooufx0vr59os7skgvrrumb9bqa',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'o9l8cvve2eo5sq4j5pmpnizeegs07r0vf1tdeimuvm40t5rjxden292lfoblmxiz7w5dl9jmvvg7apvbyl3ypjdh4ipfs152n3l1m4ih21lrup6dtowo3ylxhnmh13639heoe6bptjl91p7dpj3eg816tfh4en59',
                flowComponent: '716b64ixsoq0oxv5wqdicxrcric90koceq2nayqehitv08ehxq03rmaouwyhboaozcn9jh9t7yyaej2lfw3q9to6t0ih4a9lvae5bos9per0teb7hijsp4rszkg6qk60nic4616ia74qu8hitevkgzalvna8uphd',
                flowInterfaceName: '47vp379kltm80gir8xk1m5kidl6r3lu4w3ikkpr6geiao2z4kjlc03xi7plhbto2nwknwwkj2qypur3keqlp93nhicnhafo0u64rcg7xadjty362bk09tm867aousp8obk8a1hu68xcc9knwipj8yszhxldwl94m',
                flowInterfaceNamespace: '0p33ro3lgbmxfqba6srrii33r79uwqef66n57d1j6r2g0pmlfmhnubqkjmlwhva7qk0svc8iuldsl9bxwg5626dmlq4pg15ljhi91o7w8z744w1sedsyij6omwc8bczegayycl9jdtsa9y2qkn8uq7cg5u5xgfbn',
                version: 'trf1xr6sjha0p3mfha72',
                adapterType: 'p24bjba5x1hvir4pgmh3toz0cfynabty78hmpii0vjow8cunjodgknhc2esd',
                direction: 'RECEIVER',
                transportProtocol: 'm1o272vj4yhxd0fqn1u7mgalbgw5nbp8eoyid35rhgc6mao0kvaj30pjnlca',
                messageProtocol: 'aj4a0zrzauub7dnbinchynvav9gxnpmoz00cqom0mnq3yhs2odecxrly1yu8',
                adapterEngineName: '1tvo4g1a2clo6ftrjcwd8bu8z95y29vwfdpqe0ifh8snt0bp0gc07vu717tsn1zep01jec2nc3sztf0cmalo110nr725ag7eiwlsfehfwae15nvq04yoz5vuvd7zhio0r71r6hk9xqf910f9ui8oo7tg01rx1tnm',
                url: '03axz9g1i0zpsfsxcl2eakqffhaz3kcl0jvc51izskzykc6ed1oadiozd2ovshy53nkohxh5bl2dqb53sg56dzt4sg723xfihqvnln7vfqtmwd4twldvt0bcagu6ob9njla2to7ujr80l78ip4e7h9uvrfxv9oohhxrh1m6a4lyxuanlsplkohfkab7bkvnlfljveb7nddp1fe5qp6s31b0rno1gsvcznrk5lcg00ezvqf5skpbl3t01rf16gp6ysl60875442k8zsxyy3j4vln9ey24u6auukp9dig8ek5nym01arzrdd6slujj9j2n',
                username: 'b68fk5kj9rwqdi9vrbeygpkoffjz80c96n0hg4yhiq2vq4jj1mfgjqezw9lz',
                remoteHost: 'q3ya9c0pnd1z7wfj7oik9olgl6lb19hc9ue7s9okvef1dhla24dplhwa4ugvsx1sydbadp5r4ppw4s24bzziy5l9qlqmc8mtimy4wdd89ij36tf2w9hlm5cwzequ1jlcj8raw93o3d7g1e20jkkwv7a47e1c3p0u',
                remotePort: 7285802138,
                directory: '9o3dhsx4wadrrr4o4iv9xjffnii9qipb9dd0booavrj0e8piaxd15n1q0ncua0bccnwdfom278jopieldceylmwhi5rfzj3xf99rk7ckug69l3cfal3ac32gh64fmu8sp1m5lx7a4abafsv5vnbbcec7g8i00zbkfgkxeiauurnfdu7yz7z6tczb1i9ig912is4vu40095oocvyndyqp8foea9yzucmsyiz8smyrrjv9rc456a7f0mwwqtp39aypc60gg4y8fg0pjebnrc9hj1kmomy38l69j1h0kizq4btj51yp1voheh7av8qfpzbxl88fif8cjo4d9a623ogplc6x5pdy73nle3nxvqbm6xk6x5nzglzt0ku3pcah1qdzouuvrvw7tkpsqsh25on77rbdcjbh5xugyyrksi6rugxce8qm7pw961sconjsqqtrrog9cgbu474f988sxr16ip6ttkgwof6q4geqtsf59ru2xk7edk47ixy0nm32cbs6z8h22k7phf8nv9rjekgj3f1cooos6p88q44cbhegyyb10wlfbgsw76vfen3gmuzsg7w3tnr8qz2n01oudyomgows5nuuzh0gy0ts7yd34kkeaemaav8hwgzsgnwrpaal7bywrytrqci31p4hufccbupc2q13egrefejgm0lmepkgd0sjbeyhdapvgrten7ecitignimac0vjyy02fav7soir3zxkkenjjdjzgdjeaw84d7fmck7pimof41bzebprlfttr0a4i716gjkafgc5byb384yvp53fqp9tfq1kzlfze1e2kznm3wzfh5w5au4apxea0olrf9upioko76srwynnylnuitmde5jn5rbu54l3zjk5ugy7vs5ldf1zuwn19vzw7ws97rh4k0ym8p3gzt7tzczpygzeaiobhs5gdhtnlzd5qihvbq8r63qcg00odfvcdexdr0wz0gzfjrvgevmypbwxuzln83ylwrddcuhwtf4yg1qj3e2qos60ydag',
                fileSchema: '23yh696126v1qm68j6udafzslzyl2jir10wgjxlvonzi15jvq5xf5cytq7udklpikucu9psrtkn84di74w0nw9ujrmmzqt482qcyw4m1y5fcaf7ljqhavzyjnn3m31rnbq1iag4ic628ei5l3dgvnlux0x7nhl896wa4go3tecuq40ytxo0l7rp6kbekpgyp4ybvrxne6s11d6ktec7buaavepjar3gu1l3otcgfghalp85r1qrmyli7hn9mczs3d8tzdx09vo1vgpjkby55aqdxg34dks7c2ivx2zi96ukuh010u8nl53xeut1w3rq0s2d0kjln3l3zytwmbogfmqinud5li97bmd7734s410x4mduomdu94g01i6lrr4zp7tye6nli2mtc7mw35qnhxziq4k0vlzxyjctpt7hei5eh3fp28c7bf4wsthm5y09an3hus8b2owe26zvhnk0ogpe0xpvwabaihsdgyqb3ao8pc4tli06e5hj5r63gsvund2hc83zto1rk9wfg21hdauptnrzcrzg6m8deb3tef5txw3aqc4vtlelwie9kbw2ere0840j6j4yfv1qevto5b26eq3kxn4qtt1a2k6azkmhd4le25d9qlmavxfsx2spsz5dkfafgdt9828k1ekrbbkl4nyhf6ak355q6dkg386wei1tvtpiz8kmsxcipf5uwe1de5swlnkyhflrwcokegwmtociwnskrhkg8ivcqm0s8xvzw0ybj9kp0qwynapr827knurepuch8kgtuyu5lgoav641gehaw6ah0y6lsmbp70e1bz1nnf39973v9vywxvz53caxy8jd1993hbbvqj43ln4atcun8tb0rgyoaqxqdkl4cmunwstjvhv7yuqehqgmfaq6qq2g3fw21p52lfnyuc0jfe1wudqhut4lfi0c9shci6784gssiqtegtsws8w5lf0tcc4gdscjfmuzxlt5zgkppgw9eri1j2h030upbyio7kudcatsoqgx2knuk',
                proxyHost: '0hlyvnbf34w2ttnzppkc1r0xmlh5gq321nr1lc3fnkx4kz0lxvi75dsa3m4b',
                proxyPort: 1403135485,
                destination: '467vu9gu1x0gwsnash39vhjz07oibnie0o7460rij2sav8ipzqag82z5s3q6b58i9fotbs1a7wmgv7x26f087yehv7x6i8bj92jotwemuosbpt45k0rpxcr76ttshtlm9fjt6am03zp05guys6hfksq6a5yytewc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jqy4y3qvmeggz37itdvl3upqa5r4xcz2fe19c27uy1k8k88k1ofad9qqr52xc0fp3tmtvgvniblh8ephumahv0vmybam9vkuvb2kbio2yzud3k9yq2biy1wvxnlldn63fahiwcvuq8xhwsra878rwnjkldgjvtsf',
                responsibleUserAccountName: 'j8kregc4vjwsjd66t1jp',
                lastChangeUserAccount: 'jhad8wbtefqmct7aogk3',
                lastChangedAt: '2020-07-29 15:19:33',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'n2bz9kjefj9vet1d29uzx1zg8l75hlirb9cn140q',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: null,
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'fgmupw43kczk6hzmmumd',
                party: '0d0p9v4khah38lka9txn100v8kvv5m8zicqr7nz7h0c4e4rzgi2bwwgpo3xp3tfgh7x6aobmte7vcp3up8q02s36jfk4211a821ossk4vvwnnzn64jy1ugj13lhf3n5qm4lb9p8qyk52336ze475gj4g6knqvc8q',
                component: 'bfsisgkx8g4mpwq914n4dslmhqsth6sa8lakymbri6hj307trs5apglrtfnh8mo4le8ymh7ugyjwlb9g5sh6lncn72eeeheqngj0kgrm68tsg0dit0v42d06efungj1s5lcqs0rsz2uapaael69y81mexpxlv1na',
                name: 'gkghzp8x0emutzr5zi2jowax102k1u6j3yu1gkn3a0lt1gjobp7w0gqq8caud09lebtbomso01xthawyyggwcixnkah0zkt0jv6swo6x8ie8d26mr7fuzy07zkej1rfcgs4jdjzloe2tn35heebpe6yphn7cf6ld',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'zxt4uen4jpffy74mmru5p32b1drqzwqf69moyo31c3n8rmad1v6hee0n4x6ivhmv0xu11f9muw9dvn3km2tmzreyyk5rlvdh2n0nkmr0ys3p3l23ghtf1tmljgw2dpys42ujtfcd9vdww7tyhxbmcdpr3zfue0l9',
                flowComponent: 'fbc8hb0ak9q7rq7ls7y2vbhxb0jt6t0ttqh6lpx32egob13zph2ay0fdbvq3andltw0u8ovgrj8wnd0fr24j14ckiacnxkf54jqf4o0i0xssqys4pb6qhe4lpvd900i1z3kiw4swyp4ui9e7rcguhy3bhgx2e3vi',
                flowInterfaceName: 'a677tbwzvyrwqn5fa4cqbpbeo4xwvy3euutw25d09ch1qhg9ddv51kwgkn8n61wrq4jr5kwq0izdson42ughjtsnto365cf9dyudohjqn6u57eeqnwxqaedesh8pqaolbc2deha16qsf7sucgbrhei7z7ia7k3cq',
                flowInterfaceNamespace: 'me3fo6gsqaedz5a97w33dg81gia1etsxrb6b04ulri1apl5bltep8940hg8xh8716gdji84chrevztpl0ex4q26dajvy5i3nfssa09zaha371t7ysvp8i8ujwojxkekjw991x9cjsix50qgynv31q7w8kr3oby8t',
                version: 'ol3a0c3ebt0a3s7u666t',
                adapterType: '7nsrccc0u7su3o350i7touofrxey4441ejquc9jk80y9ithg8ze5eqn0xpcl',
                direction: 'SENDER',
                transportProtocol: 'y3dorcu9d5lddl94ie920fg1rmx4l0vk4mzn6zrfgsh6rhlr0ki8ejxzn6ko',
                messageProtocol: 'ivukx3c7g8uwikuum4ssqmkis6mf47zop7flsq75g0fnr7vy0dqcej67vnrs',
                adapterEngineName: 'apf4gw6nvcawsn75fkggp1e3dogmm7p997t9uompyphzr44ew141bpaw7ucqxnl3pmueq9vlr92u7snwhi78i67w042jwwgw1fnql8305n485m2qljh5rg6c1qpp1ipdj207gbn08z1f3ckvor8lltrb8lxv7480',
                url: '03w1giy7tm2jmkhz5qwgzubnv8hzypnrsx0tm3od97ckunb27zbvphevofek5tl1zeyv3slvcvpkf32zh6kd09t69oz8k4k5nxngiev8mbe4vm0vvq03aanto4pkgrn1sdjh1wqaukglwyadpxgz07br3eaxb4vshhgtqgaam8brgzfbg3luwlsdwgtk33h79ymjlfvb1stnb28utmvnktgnsoz0ft4go1lcbed4y3o8rujglafrh7zzm7yi7wr3s0oz6kod4554a32dbb89rkje9ytbnzytd7yrvlb9n6tv95lulyrrka8kaji9byj8',
                username: 'hcvnv7npznyayllxxh3d9ofrqt8zs6rjau71985d7hy1drrrq0h0r30024on',
                remoteHost: 'zk562yib3x6kr32ahwa0kozw4oojt69x5o2j6fivtahmgzhrgf2t3ieheff93g9d685d2hgy28i7o01zau56zdn1m6enyi4oqwt5jcw32z5vhd8xr9ishzvkxd7uwbhhyx6j0ecqukjnxy01ziya26iip98ilcmj',
                remotePort: 2860128927,
                directory: 'rkwmsn8orjeu0msixakyi8eymxxtiyfdnp54mzcmmo25qjld9swgmrkqhfx5aaavymbo797qx9vu74fivsscn4f11mh3damtzn79gymp5jn34e3q163yqxkwnjfo8jvnnz4ushcg0k8tofl9vm7ong9ssyyy010wts9uuxzv4qyjghr5glmir3x8knp04mpfe3jug3knin4xf43y92rtpj46ve9bf0kt9w4oel3jm3curxzdmj6nr3y95cwt172md84urim9it9ijblqg4l0esdlcwq93qi7wr4raxn1vjmzmtaox0e5k90qbg3hhv26ifa0ezax060qyhva1px3sy62zon03vo3u21inhrvwjcsm6jeaf3p5npv38mawmww4sfuqm7tzo13rbc6ulxazsgqgwye1fmjwm1gf91kvsak4a6a6p4rtl4m4t6c3e446cg6kjciansew5lnhpe66yt66icbji695bx7tk2sjpnqd4vokd6lidp330nvrks0lgqx3ir1eii42tb2nwp7acn7r9evugkia61ch3l3zq8sjhivqbrwq1stzggg420cu98u4kcr4m3fftgbftn8rds511p28kc00ean4g4yxeb38yfh4s5bkn2q4amyy7im7g6oaoy8g3k9zq5dj52s564a0ofhgo6cuk87dxirnguluzt3nl6934udnsrpd2arbf40zk0bc4fqja09q9iby6zxm59aqy3hh9i2i3kgi278jzwi5zwpv2megm0iyj65jaiziu3ftrv1rep87cprkwi44fq8l92yp1pqq6ts9q96t5gskitbwjsp4og8p6apavbm15ibb27jqp2m46upjbgecs0tpm6sijkveavfkdwmc18m2dspu2siav0n8mdh6cxmdwnf54wrmqfiw8pujzqycsrkem8n20w16y0twly51fcefspucj9tpa9epds2ov72dlurcrj42vp7ni26dniqa681fcljm2lchp9b0r9kmvf5yrkjt7rkxa50zxau',
                fileSchema: 'uld4lwsorw9ms2bbxis89rzpg2gn2un5vw4wmjm60qryrri23gu99ref0o8pjo336vxv6gy8kohp85bsxlt34l6hu3hfg3xx22e2b64vjr5f49yupba0qavug2id5qcta7lurxxivnjpzad0aj18iegvbsjvycxxszlw6ycafnog02sm6grjl1f1apjodzm79fcxat5nycjn369ceuaozmpv24qetkore118ddlxa03vvx061jtnfifxijd6i3nl6jxumjbvoolfaiyj6uoc9t427dtxh2xgk8vv8lsk3444i0jwczfdwxproyjhzh0gxlk6oivglhdyvis45kvtbyeviev911pcjvgudbor9xapbquatn91kyf8il8barzwms896sorj9nphvbtytjp5idypggne5r8fkn8mn8566p8mqqf5cof71mjt72yx8qqamnwwmzvzubif4xkf137k379if2ssbq9ccl5q462w5hpkfb1z3hq2fsa3euoalf8xcyv5ci7avrxbjbx8ouy0km6knv4h66b9v2s253a1yifb3i9mcwznjty24yclex0zol5yt0b3bxoo57j3collv6rargue1owafsb4twymw84693hxdj86ujtvqvq53ne27b21kjabs1hszmvxgk2cm6b2j35hby55pms9x504r2g28xyriwtigia45y7bu6m7kkdkimitxa04c7bgevyqrmfx4po9s36lfue4ns10k7giz1ytl4ej77s5hcjhzgr2tcpy0cpd4uqpwjsc3ge8co1rtt9blid7dey7ik6a5ojet0dczi9u9u2sou75wf4t56j2457wba1ddnglrck5ngmu2vqhq6iljgflbx4pqe94h4zj57i7p1v1pofk3untxfnf50sxohpirw9r8oly5ft29gjbyodqvfees1fpyvf88g901am9dmayikoi1fqzt7vdtbbxeo82f5f7h11dj8n8fjfh1nhm699c4x04drdp7h8zmm7ijsu5yeyad5v',
                proxyHost: 'k2ciyyk5os8m1knxyrle2d8wjnxhwk9ysikausdibqs1k7h0jo9pxgqmpj6u',
                proxyPort: 6924133299,
                destination: 'bs86esvc59pyf2vhm7icw7wdn6a3yl07jwpr2rglkx2iiqmmaqj8tm8hloe14p8ggrf3wfavkxs5ykrf8suc376ucgm5maf0kcuorrneq9n3ho271emfin3hehwaf9ewalk653w3wpgwgdtpz72w52noy2ypjuis',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vjq44z3aoybgmb88a1wwtp35t4uof0f22e7av0bvuukf3frjje9v4cxaj32lt0qvmhmr5rh8ra26xbiddpsk1wx5qqp6k8uv4h6xkxyo5ecl1955nym2nbpu6iq0ncdek3v6dy5ph54au9rzlkpzn1i1qhr38h8f',
                responsibleUserAccountName: 'kb31uwkvc7y4c4p6hy9q',
                lastChangeUserAccount: 'm9t0as3mlr87xl7dzpb5',
                lastChangedAt: '2020-07-28 20:23:06',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'nq55hyntf9tmcts02ehp7u6662pzzq2zaxvvz479',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'mtyu9fzy0j2sfuzxk70e',
                party: 'zioxtuvy23neu47nc8cyi8r1ttbs56zdllfi6yxn5145e72mstgm1hao4zmg4w01wze4vtv9korpkxdvoun47d8x8wf8g9a5q3aoiu6j0rhkss30zqf3h080fr6j1lrpv47vuljxz4mherpw1swveqpptbscgqzg',
                component: 'lw7pne9uxqsxjgl6sz4aqkvuohm3x5jrko9ztqtdmt6n8rcvrh6vvcxblhppmsg2l615wxizanxcstjohm0hvj9tcu0t30xdgbfi59qmas4w80wevetxfpvt6i2sscrjm1ruho7n38fh2iphu0a0ecm98lfu2y9r',
                name: 'bcom4acixegxzmghwfqku99tam7t9bwgjryznfg0kjcifcmgyg0mnxqn1yxjmmu9bg5e1h162y45oogd4lbqzfjdim76vnf2jm8hekcms4vvdfs3olaufpz0b1dg3mlnm7f2pg120vwelbj4hkews46xhlsb32i0',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '12dopq13d1tul6hz50k6obyldtxb14bypvtv6qokhf8fbnknywv92k30tdlq7u4ja5opmyftmgd5yw2m3vgit8n556gx391w4dm4px9qwuf9w219g1b89msq251a9eggib7x86mpmxyk0jqkp7be8w3ar6d8zciq',
                flowComponent: '2jat2ai6dbuyh4tzsi97u57r9sqao6rjz1xm91qgybr9rwg77svug4lxmie2m0rwge0x6j79hrqxa9wov7q2mxeevsvqs18mzypkr1kqt6hraeq93nykayk8obqk4x0jdr397dtph6pym90b714p9m00f5xicypp',
                flowInterfaceName: 'vfyl18rytg5nvlne5r787o7gll32nay2dxkhkwyfjrek8ef6td6w3cv2q9o7mwtl6nmgjpo5lh4x5aehkgoxwx2vay3hacl92owdn96va7efn62t2q04emjezo34xg8nbji8zmurzi6y87ebey2f6615xz4f042s',
                flowInterfaceNamespace: 'svxc7kbf6on2py7yf91sc0uya8xqif46fkqiyey78pyl5f6pr4ic38kxz3akqczvuruz6fxirvr0qgmwkaemv21decw3wghedojutgjzqd4kmsk3y87lwhcrv8hjx603v95h6lop27rukt85p75ycnldi81ksx9r',
                version: 'wfcjyb8jlq3x7ss9z83m',
                adapterType: '8t1knqvev59op62hp6a3ezs16oux1joicp2e0aji2fk47k3t1js54la3p4z9',
                direction: 'SENDER',
                transportProtocol: 'b2w733kfm98gvf0nuzg01jm9tbtrebx6o5yg5b6yz03p5pjazllgpt1ug6vj',
                messageProtocol: 'qqfod9sb613vom0sqyak7l9otv4g5gqp4t8i303bicupet6troc0em8p88pv',
                adapterEngineName: 'xl8ywl6fr52c8lghhbfcy610f8nm36ztgyzs5blt28f3rg1arswyog3z9o7vu1rrg0kf2ep5o53yprd7lu8sza5gjaed0yt7tbmljsaqo1h81malnre1tk8vxhz5nyx3b3l9klmky0hr66eh640gc9zg989ozlvm',
                url: '8j23e0iqkqn0q8p152c5parpa3ferbqprsfw805qgf2hnyux48mabjx6wyxnxsh9wlic9bqzwnv97j1t9rx2izh1yyjsq8hjjtcmrnxkfdqiogprpb052fkiyttaw0bfwhnmmiktw7muil4rbojppk436fmlxm2n7752e6ls2z5bs97q8yg4q94dphqa9px77mpj3a3cua5q0jelam4xrru8xrty4km45adl2w9l8ws0oj5s6qxf2g52a86ix1gcjos2bo2squ394kmqwvlej4v4bpk5bq1zx8ori60zzxkmzsbmw6dd38r6p0ngx87q',
                username: 'wi08r7wm9tof0dq7qc1tah49yahzke8ck3uk0nnz9c3ixqubo6wwqtf8c96h',
                remoteHost: 'k1ub5gahdrghlck10u7obuz5natpcpyk90p4qlxlpujuuwwi0qc64r13618sq4cq3denvdsc836dqci6znmauqloklc20m7122pz6r8ad6soczs4zy7ypmiz5lyh9b1b7quj1xfz0oazikrh6fumc983dd2a7lf2',
                remotePort: 8908021997,
                directory: '1fgclck04ve6qpdsdbfg96w46k0tqds1j2e6co5481dhm7d1haj9tfkavmg37hu9rqlr8npq67g88wwmjzx03gn2d7tgsfmpwqsvydrhrg2z786izoyaj17sh29h1qmsr4cffs93771wbfzc6gwuznaq7e1f7r8lxuzrlqava4yyeem6m3fzjom0j12fkv2xeatacrklq8usw32vvjbrec0u9512n4jnvo5nincu9qtqlrrqmwd0eb1mpeej9f24raol1n6ijr5m3iy3o63rcvmdn2f4wcrzx5gqwdr2xe5x4rp510pyfdbjnobaqleioyw9q48dh7dmaar9m8q695y6fv8h00urid9qi9dixyrdanzuzc324upocgi8dwo5p8zkyn9cbu28hf5860z2geody98eff7j7yyj7i5cdacuybb3z0esdq9rebouhyetp0ri5pn6zr60kjsgg3xw9yxfviy7fz8kx67qrlog6qqpzwevzcmg23r2jpbpmn2d7vtxve3vbt5iftg43ypxmkwhkjq8p07l5pawconil3a9momtp5u8mp945bpplrk0e2d888wr51fsfpdzz2lfzxhinri6nnnddouj16vqij3gy15rfszbn29ywbdvpgfcgposf1vjlmc4xbbh7p4zczsknh287hd0w5c3fj44c3xg9cxsxlt1phkdsp8a3hf58mxyl4a0q2b8k3vv4nzvwpv0yj02lcytqrsuo5qz8s1butffcxxfbsa3gezqwztws1k4c7646vm7ios6pf2ade216s3o67k9j8zb6bxxpnasar7figh2ojfvoe9x9iuwmzyc37cg5o46p9papzp0lu5rot99gecmxba5e4qxff0x68bwxouncrc7rsq1nncb7zv64hqwn84cm7tfp0ms2w0tw7j0tm3hgp194tuu86yjyc1tq6km7th1oadnzah9q3imtj4pwu2ijq7g9i5smpcx1kt7atb2ssixx9jcow6uk0mq35yjp4awomoi0j04',
                fileSchema: '57i65hgb2bl844j9r2yiimbv2y5x5sct43x6b5qr7ziorr2fd1dgbtp68dikica637me1y3gwpjkwsyxs7hd9x4c42085a5cud06xvxf0v0rq8b0uec2zy3hjg3baez1y8757pt6a3yuqepmficith05hs2f3d0wik0hif221f137jca177e4z7yfx7zl8g9r96qoy2huigpra7rcc4epllsbwpf1ytn427fr7lwr3ptvj74w7vkcvv24jr4hupjfa6f6sxwoi21jw4lgey1z59cu69hv1urmfwf7wmx04nvzc84j76gy3p83vn67r9xda8hommluof9shmo690u70n8poqiun5sz3xoxynmc9ewt9blsr1iom4fkxsjyeg6sf5uozb5fkpkw2fi7romuqfetky0d9hdhw814w3lbhv4udgkigj1nbfq3td84svkmpzcf00n76xjqksn4l0niyvg6uj6r3c74kr02orqwsqh88tq78o6mj4dyn4ywi6dwdirm304h9ikd9yu5qznesn9pb6xweau4o5nabq9g77tanz2x6tr4h8fhcx8e8uystblxa28k1qajopnwwd7e0tqma5qpl4ryna912sngir7wzsrgpgjr6dsth64vjl82gtcccacl3sos00301gareyg8bbrb81mjrjvwltrlkacar7mtnt1lm63bfz812le6wka2jkw27e0bkgh0zulpc0kdf73yo1kobrpzazp148aw3jgi8adut3iu582apbkjt9hhhhbg2gom51c38jjqq3w6af0b05uezhyh95ndwqm0xpkzx01yar4ts2lpxva8gpvy20yzv2cqj6xqykfar168rot8wbq6loduvm0i2inzk42modar0pq468n30kscchv37zav1pthlcpqp7xywtuobt6resjh0r10pskokldguvg0bxausqnaxbtm2z8tkb507fp3o9a1rkeuifk5druiow57uzlfx1g2g56cgkha7aol6upmtqg4zsxs8gb',
                proxyHost: 're23r7g4q6dno7roj2qs1kh7tcjtgfpg68dlk096nvayvwa34x5g76fjd6xc',
                proxyPort: 8932351702,
                destination: '3of9q2bz6zps7nnnc5nxqj0ovxeea25opr4svvjiclsn8n4h5eq06johp9bzo69972fmkfz1ltfthkv7hwc073htnnx9t8pcipr5pqjm4qa5qqlces9wsznejelxnud3tjzakilned93uusuczck6okrscjoop1f',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'aemxqxemddcbg5wlf3jy7ck2w7vhv3yz92ku62aecwi982a563zke04r4e8vtaylj0c7jgxwu3ccdim5cr811kw0zdnhnfexqh8e7dbvquas7jwu83lgtxgxie34qcizjj9plgazccogzbzkpuufvqofr4kn2twa',
                responsibleUserAccountName: '92sd1z2r2ncfj4mkrhz4',
                lastChangeUserAccount: 'sb5nenxnq0bhx4qq1cuy',
                lastChangedAt: '2020-07-29 14:00:10',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'lbu81z8092sja88jgw490jt8yvhaxcmovtzpt6l1',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'e8ueki36deooh2v20izlqu4m9pivngf9rsd3hy13h1eu107h1k',
                systemId: null,
                systemName: 'q0z11bszqplwl8i7z4us',
                party: 'wnh46jgvzy0tlvz2hv300980m3x28lc83dipkdzokd0ufwyzqpvfpjg9eqa0y9eep2a7l35b9w2h61523al77dcxz142x9xta560h4gb6gy1lbkk8rcalj2p3n1zhfggb5ng6cjegtk9eshjh3md8932iw1tm1io',
                component: 'gun7kx296ig5vdld5fnr62yd3oeg8ub2uqcvojh9md23v6pd72k981okg3r4b0birll31pgbjyckyhpcxqzaxm9rvhp3dynpea5jfw75brr3se05uje3gfonelvk3vzdbjqijd31jb2xm0zzac1n9n4q3b14uqh7',
                name: '3tz0r8i825lf7f5yagck4g8l0p7znsqkq9er4l5ahtpd5i0me8lhl2i20tonfenycmvmshu089cllsmxcw5civqf2snt0yqy8xfupwqx42uujiw6jjof7zzmxtjunuxelws8a3aa0rvzr4s10edavqwnbwq700tb',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '8qxpz3qjq5invcszs0ob390gdn2l067k6lb8qhxlo5lf9aoc98hiaaszbcya0jy6v4sjqdoxjdg4magp4mzd0mok8lk7jaykuu0zd7ll8f5uc7nf9dchqldkw0vzywiojs7rytp2v913u6gvvwrpxht9gy8yobam',
                flowComponent: 'qlmwfa5zowflj5vfvpa1izdgw0u50b2l5xci4mmk555bz3h3ebytmiwnuen7zdh6w7vjogiklpfx0arn8rt799kc5678cqx8ct0339y8w8zen9bw1lu4akqb93m4r9678iqjg6b7k3w4pyeiathtx1fs5rza79zn',
                flowInterfaceName: 'jx46zo99i9h19uaf17zvph09bbagckh9hdwzf10cgis9hk366u5jwcit851b8psmw8ksshd9fwadb3sb0g10k66fx47a7eriwdbe37n4xs0kniy6bk03wgd24azps7lr0002nhmambygeorp5cp05l2znez9ar0z',
                flowInterfaceNamespace: 'wzc0b9p8qwsyvbpfn96blenpi3sl534xnckwrzadhrci8q0buy8selnylrbnymnuuer6r48dlbec2w5tecjgikla3goxn7hlzmozro8i1kqde0jwordupa7qklk8vzikgxjczvw1mclcatzi7jikq51h3xzli8iq',
                version: 'vhf1ispanq0zead48603',
                adapterType: 'otkom1r1cxd8mqrdn1e298thun7dhb7bod0ilx2q8zgodxtqo9xwyqr9x16k',
                direction: 'SENDER',
                transportProtocol: 'mtvpetjckdbiujhi368w0o0qhpbtuyx7rrnvzooyk46za54e8yeupgck0w65',
                messageProtocol: 'z610hloxbzcec9uuvb2j7balcp2lt0ampwbck3aiw46owvmjbo4xzbip38du',
                adapterEngineName: 'bycjgpbfbx37hvn2jn4v77tx6wpj22yat9gkojn88pt65npij0xyxtm9cudhbbpuhgknwuh1sqodxsvnfjzmckx0fnefgzkw6ysdqfux68e13zrg86x59nu455rs3nnqnzeq58iw3y31g82cqw9waed38a2z3dq9',
                url: 'ctwrhvn7m5ew5umg7rei09kpwxp3nehmuhbs70abzv6f9wsk3dx3upz46fi7pvguv241egas0ue00le92ti00a81puw0zdmsm7uh5tspvg47i9w106hrsilgz11sn6xkbiyclosiomcwe68ezdwfjakgs2f49kczs3wqc56zf0y43yt0ohloxh6q4gz1qnf7tm3e8quk0sihhzeo0vytrf5fkfqi8lxzh5sj7231wxwxle8gg59mpcqscxrg26tbrdwnal54miikj07tre3dltfz6ed6mze45c44b0a4u5czawqbma5hysh9tgs70c6d',
                username: 'xv9sbqdwxyy5ak82chhexmhfoqtwazg7xmnf4pzgqh7s2fu8br4sbdkipgbi',
                remoteHost: 'xqrh0chazn28tszn2xchf628r6qrevm8az66gooj96e2yl8iq31sqb23mxkdzflrxud0pbq1498zozxnntob4m7o7j7rf626zo8ozw1t2343itbpclqucznpfvy3gj8juoz2mcfo8w77pfyu6umi9nv91ie9dm0g',
                remotePort: 9064942369,
                directory: 'vduiozzw454mhgq43jbdflhah6m05k2t8y5w9952jzpvv9a1zel2tvliu02eorc6eaqgk1gyumbi0xdiygurnj0okkscw3a6rzf4gh8w071gnlqwk4cbxa7trdkvtnxrsl7pz3khfnnplo3pwfv1toixogrxt0neg172ukw2jtyn5b23za1ibsvld1easneilkr3u5tweux00xn6k4ru1qmjmlvycvk12617ekz8f6ptfil8qsmb7twn6lz2rcc113eg863jybftbu8ktukq2cqt5l9f6u0ad6n0g4d737levkegbq55ht99z9m6evp0adk8gt8x59xmsnm3qzgbf3lwsne70i3f76pj7wgil0c8ng8jgdf2ehgb5rq56mrxc3qaknqm05r8f8poufhii0ukq107xbi8eke1mduht7jn74xki6uuolttpdv7rkofas74xhv8zyf4jqjqnjuwp0fulph6cb260f3ilyueqvklghj7rt25rgyh01ncf8voedmv7rgbmbf473r3hhkahxs2n158xitavhpaf9ikyetdx4ug26wrci1pyflq0mnp7fsu24q0fxri5nuv7dji52dn6ipdbi4cr4xb4lci9dl4ki4v7bn4pkqci02wxzghul7geat4sf6xvkwagk458g32pay1ib1v7li0hau86wa83h8d6qx546jfml32z3iihvdg3hgn2x10ufk51jlv3snbsg16reyzsxcgq5jinau8j7aqe7yeubwmq23kq5iibieihekm74gwjdlxz3zwn67pw2q2r34q3dupj5ctvoba070s3ufc1121b7fjeyydl9k2ppkyc4jjfmk9tv9vrwiykicuvvhg9kylwu4vum3fshsvbb5mvv7cfzgre81vme7p5x02gn0ai8no31l4ksk1s52xccsli7ycbvoz7xinr6979qa9r6pjxrrbhtaf6ftcfgxwou7sa6kma85gaxqxfx7u0hzlvny6idwtc81knrjkkkm5k2esmwfs1u86',
                fileSchema: 'r7zfh6qmiwwqind88b4ln5wz46489u1bq9qunhth2vpgyavpymlw6aagb2wgc38nq2r8928aksw8fliv8avkzgfxpphs8s612hwksmx2b0mveco26cp2xlwh9az9sdccyzcdyqxa0i7wtl0k3gegbs7e0x9nlz5upod2ndo9upcry8hdt2t613rqkzlq83qs18321cp5uekudxqf10h8fyhkhahoahanm6bnb2l9ldp59jpswblyuuj3t1v4msdvopb56kyxnu66moemijm4bt0yraknfbmgtkevatkbi20rmiwb8xibmd8xp0grwzbu9t5hd4upig5wlp1ntihlnxk1w0yn2ywlee0xgp659uurcmvotbplpak4j53su8am9w0xlgzxowtw0n9trgms71q0qf3pna7c2yzzp7wrd3ptfq3h3j7i47iv43e0p4mhv0gdkx12ijdxfb9i3lwbbxo3lama2gds7dakjfqmez9qw77ygdp5eqjfbpfe7oxkbxrn0xu5jzo73o0qtgsz6o23jg2ghbopaiw2dmdiwu465jbktfcxs1h792zxbqsdfgytmrkghyatvec1pw8e2m8mzsvnm5zob2nakxl3m2nwini12dn6thss2u8z2ir7og4istl8thm5likj9xl8hjhgvi57j0nbvzlaur7ovvy8xnhs8fsz2uw8shzejdkay051afwjacid0hafqk8czj8qyzom7k2u6q593ivsju3c8sk49x90sko0fb41gdqz59x704xy0ta766u1ar7srlw4h2cvgzxssvwyqqjexlw9x0horprqknma314lvw4x9jfbicmnd9h5xkdnztpk6btnn57v3cxu36utxlm26oivxznbwbqlgykjsfmc6trgybbpmbv2ucsy0b5gb4i305pv5fs066dnlun82123ts6ianjmsghta3p5bp80jd43mbijav6bmuafgfer1giaadwa43whp5tohvb8i2wljoyf07o56x7wfbrghd7q11t8',
                proxyHost: 'nqhceiznqbfmtti8ih6jonw2le3pck5x9zyhmsyqaf68rlk7dq4dh36y91he',
                proxyPort: 5967350022,
                destination: 'w79iug21tfgz0il5h3k3y7w7x6374bcfbjmlzekne1fgp2qheit9c2oi9nv1tnvpam1q6qqvpbcfosk46uugipz5835edt3xzy53b3l7glwn835k3wyp8p0ys32lpdxdzgkjxhj7mdutbe2j17cdvabhwsw50zst',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'j102x8aal1c0r67cjurk0es8aqpqitej8539o0275pi7xojq2v2rys5n0rsgx5vuhz5wbxi7oouisjmzjtv1jgjmzwdb7mwx6s9sjme6lhde024ggkuk59z6dk1a44tgnd4n5i1dy31re28suwwiqcvyxji08k70',
                responsibleUserAccountName: 'gcd23os78q4k0etl03hl',
                lastChangeUserAccount: 'ajb1h3hpth9710aibstw',
                lastChangedAt: '2020-07-29 06:48:58',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'z6tg4wkop8zo8aabrsdejabrnuz508uk48nn18ho',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'k2h0w8w7r6835woe3dlt93mbi1vuke6mlr6yal1tmpu4dtj44e',
                
                systemName: 'o88cwcfn7gs68jk63e0m',
                party: 'd82teyaiv6r8f9fn1xn2sp21fav6zto27e1eiyf5xtsjeqkrmvbbhr7064opkx99uwg9cus0mtrjj62a9amosz2on4poyuew6es79zh0216959260olnrr685b18cgndmww4z8hhqxn65regy83dql5vkvywvlhg',
                component: 'dh2pqsfci1n6bp25c07rk1c025h54eyaqaryxhavxhqpxl05pgritzeh8yuyier96v7ydn2uvececpzkjud2uney20pu5xf4xjy7pcqqghqoqwbq4xps7ai9809ovr7f3jt663cb0jfp4wf452kvhm8ri5avskkh',
                name: '3ibfsyzf9ilbss9p2am356sh745yte8z8woc96x0byb4png8caj2f3gdr1hvoutn02rql5w2yrl7enq9bx59gufbwbb1tki2v908r16awuf4gf5yxf51g8g3lbj5o3v04kv30p0sdxdtdlueh1qyrebu57hvfkm0',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '4f2lkhw665tku2vuqvwkwot1r2ze58s5n0gwty8sk303212kw9248yixg7ilp37wged1hrqfdea7q4nuf9mk0a6si858io98j1rn7bwmllj7g5k6mms1zpvxxrwy146f8zt3xy2ypywlgxcurxzkc21tgvap3r2d',
                flowComponent: 'sgjlfsozmca6h7p68vfz4gdi5gb1d7x11edxyrh0g6qkrofwwqoyd63hvtea52pztjssbnxwc26s9kzutg8lzv7eiuq2nw71qbpf1qh2ukpg5bd7wtu38l4uw1phuhji11n73i2ndjxh80av60s1bnw39j9473lp',
                flowInterfaceName: 'c9h1f80ndtopzh3mbnmw61ec3xbk24lc9k4juuakk5lf1anppk2an3by2g9qn7tmw5hgnrir33b5wckrw9ar87v41vbs477qc0aienv0k65yeer7pua9e8f7xrvfg2k0ivynf3aifbbzkdk3abuuzt9z2jthe9wn',
                flowInterfaceNamespace: '83lw4w1wzstye1mymokbey7jqpo366uykwybfq6vu9zqcjmxvq67mh3tcttyu8jmtv81pyulhvoqhxhlgbbdhmcqfi8oox2ss3ky4z83j0lx6tcs6dgo9k6etj05n4jxw7tka8rirchyqyr3osse7byvwt37jbut',
                version: 'qtcteuorzjajpcs103ls',
                adapterType: 'o1jl0mu67xmjr3rpw85qm2ope7ep1qw8ypk12x1mp0yp5a0gr1kx6u9xzreg',
                direction: 'SENDER',
                transportProtocol: 'g0wgtdbtt5fcsz7va7f9wl19ebgz8z83pnlaoujxpcz3zppgik0eghz23pgd',
                messageProtocol: 'ms1o6sefzdtfc3ew0lu6y29azsfb8qzvzrx2pq4rims2qq572bagdhzk2cjb',
                adapterEngineName: 'p49sh1jqky7hna00yi3zz7fohvvht41hkfgy96vpnnmdwk4qvlfjfof8xwf9vfffdbi62350lloc3ejx9nze252lt9y4fn0mp4lygv4hv8f07pcxmga66wzi06nk569k8mgkoi8tjjxpe3va5i34pgsb2u6i3zd7',
                url: 'a5si9zev4jkl3nnk60zll292xz5ioz3grkulhhkyn7f1irt1jutbjsyhfft24dud26qot0a47sg1zvsvmbs0mfv5j2j8yzpukbo7idx9hk02k8f6fangzirfdbst5g5pu4pcki1vku93pnte78bt06tvzeglap1cj9fkhsvfau5qxv1hnrqoyfyopwd4s7b2m70tzzor7ttzjq16mh0b7uvq9icqb15mo7gvw441fjm8yu3zdr7olp94etuza5u8r2bgj5vccd1r14wrue0f8hfnoavmvocaxfa0xyqg2y5soptpenn6zznpyvo1edz6',
                username: 'w7qjuw6qsgdqsgu7e4zb5o6hryqaucjf4jlwkjzpzza5ol2iplhmjq4gaucs',
                remoteHost: '1745asfpnpgqrfh3kt1owvq8r9d6d2ii4h58nf6ms39o2lybbpf3jzu009lym578hq69hk65zpyms38ow2dmuzkztoxhf0suxujf3hrs57i6zk6tu6azgt5neix3jr2i2ltfmafbxbeh9jzhyavakprco9h1bt2j',
                remotePort: 1924159926,
                directory: 'c01s5r8tdirg6upielyxvdw01da0epyeqlt1y0p8cqcudll7tswk773324djd20oa8318hxlkao8sy7zuugv9xn0em1thi003zkskic8gj7bcwsu3xthbcei78xubykve9v4onmx8vwd9dxojr3qghhxw6ugsy2a58kif86s021fh00b17yznezgzylw2knfdln3w3d9gouodkeygi0qksdo161dfq1mvp0bi76viw40m8doitl9l8jxraqx2bnax8055754ffj7kxcseal5e8cug35zyzy6ek7qh141idi20ogb4adu85mz2bmbi7kfu175rnf78fohigx3vncguc6nq4fag98qwlc3dyom4eqnwwd2xg0spuk7mehpf1sn6e6tj97fliha3q9cc47hh7lw8rw8xqd4u7d0ik2x76e27kfynvu0uspn222l4sq9ymzpt789fa8v9856kzujuhhwaq7avlihhuuiux73a9t6mmy3iwqwrwrdwxu4pdskbhcl2u6s2bs1l1xu2bm5v146znhm4j8wyg25xmn5fwokv8futm8xbbhn0wur4sx3w4fqz1s5uwzy8tyxbpc4skg03hxres5m8mwyma16p0fgc26xvne8lghffvsigsj815xqlr4h2pa97e0wnlbzcufkyrwbjwj94njo4o5swn6mmy04q02r9rwm1okujxq9291x12lcs8wahst4c0ff4l7297rc6tykg21i0ebhft78t38isl6yh5uwa7jye0onb0yl2ktitf9bv15n0s3n47lnrz46elkix22fmobgmhjrj1tcwtle91rbml2fooztz73j7fdp9dv745ufrktojd1ail5rh26wmr8uv3630f569q0r5zsm1dwsw0crq7k7fhefl201aduorsk5n2s6rbo1q95559ad7mmjvpus699q6i7h6zmr6fdz0f39s0l7snui5ja1h0p6stdjrgmabvmyii9ithx0mw1qrs34m50f0zi82h27kqk49p8ah4bh',
                fileSchema: 'xw3rr1f39ubwu7zjolynugu9kt0r7bjsp9cq9gafw1xdrmr0xyls19eqqieoqypjskul33javo8sgxrdzbf2c3kk1nr83h2pa22dpjewbc7h84adrlg3ocrghhalwm3a0w0bsb1f487obv6ju72493cy2s3l191acsg49m2ldaq5eqbskbz5tk4zmijin8297oo6f5enelnkmae4b5r6wfo9ldj17zcsvopxdo08zl3qk9qmaj0q31wf2kiuxs9qlby4alhtympurzyo4gnxrv7902gl0cx5n6daqouu460ohcgl2jnxm1i88zcthsxth4jze026dh3ixtfhuvd7hqb3cixeekmws4jgyo1iv9b9rh9ubim26ud12f7tv218l2z2k7wb0zj1wb76e4zcgr382nzv8i3ouket8ec32py3ydccw5vckmyoiit7ul8vk37ovlitxdwzdtprxuhwncjc8ycdbf3z78vsv47kw0dqzzmc24mko2ejg2dh39n8bwthxw350k6db0bl53hjjgsulgbl130qd5bvz23uffolmt8fe0ioy8vqsh1kammi7z1clzmhohd4ahmvo2yrh0vtpdfdcdlahaz1n6czku3yj5rptje09evtqxnwx48vwh5igtz398e203pr46vr3b5pqb5clakrllqg6yg0k51683m4s8c26ohbc1x9f5f36y3k8pa0guoz5dp9qgdyozkrtwh71e5hdgwi8357xzr5yfhfmi8upzsk6y9gyy9hw80zwxkp83sbvwj0uhryjjwfk475on742h4uium0o2dqukbtj3ozpnqoupif1wn3cz9fufwq0e3dazpz54jxk4lex8go9wkytqbn17c1h2rap7hu3dj2h7xn4d6ug9b4f537wvcqjnispu75dqe5pvuex8y3qysjbhltju8q247y46joegcl399s52kl91e0xvu3c23cfvx497fu716fz8e1daou7nqm8t6ksi8bypgrdyuy5g1yxl92k46evtxh',
                proxyHost: '5zymt6sw5cs0fbrxt3ap9167d87d49p4omtn6fpu3p7w3js2b9kzc63lmr76',
                proxyPort: 7288902222,
                destination: 'ij3v0w3nqdwr2f9nnno0syobj2do92zlxbx60qhmnvahqrqx5qrwkxi4hsiaxq7t41h4iy4uy1gnmkknezdn8jn1gdbbz9oicu8nuhfterb5gt2z0vgw04xcabs3tevdte9sv1lbg5qdx0nql4huo9s10liz1bub',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'k01ql87fjxmdwyylciyhlc6mehds7g1lqn5lr9why5gjvqj912nxydb0x5tmymlayqqfzn2bb1e3ztf6i1oiokpm59g7zhje19vbyor21clh86x7u02iba84s26eik1z04963e0l8qxj5w0xu7c98bazn18ak087',
                responsibleUserAccountName: '4v83z3xe23tprglwsnd7',
                lastChangeUserAccount: 'h8zeeenl77elj7iol9qy',
                lastChangedAt: '2020-07-29 13:18:20',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'toxyakan4iyl4lf7n6tfns4m5g4hrtvglceb81dw',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'zor6y797jau6u60372xhotgt6m51r3bljmxfpeuyqgrcqw9ber',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: null,
                party: 'tpg02bovhq70q9j6w552xgw7rm14qz67kch60slz6kmppunv29qlpb55ddq8alkhhwss46sh3m92ji1eilg66anes7j68ol5cy32v0t5gcqatdwidzvb0rhe6bnjzg1ihercigpopyd4uzs9lx81sbqwfh7832ta',
                component: '01fxrqunc7cres5lylogkjyzbisiggx8pmkdpoyopl84kuqz58yr0t35astap95343cyamwk9htmg0zmm2n6ugq2sxpio7icwr33wtq25uh64u4eaz5awc12klafq5bgqrjmjmlepaup7b7h0fpqibknrk37xz24',
                name: '52zp188e7qur77qe8sghf3c07f67s36e6lt6qom1vgq600tyg3sxf3oa4uk334d2ewfwl0bvqc6c9peb8j8inhlj9rrthi7a57k2mm1tlmawympsyz9b84mqdj14f0hp4f7svf9hgllap5rztfhzwlh92nhb0kks',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '04borra8vfaytpjvmcewuhd8c59sfi6hmvefr2n6u5v744r33t8d8p760epyyww0tj9ja4xj6cqx0ggt3hvemvwq7x2mliutkdirewv562bw5p0zf4ymgsb36jyczpr1vda44k0fwo4zvjsld71lcls0dzkud6gv',
                flowComponent: 'nswk960wvs219gwc16ml22ww0jtizf1zciahwxejurqf1abm8nka0cgera0be555cv0qarg9wpyg204opyvu0xdgcensr2o5vxzvwmfps1orv6alyyg1pun6454xhghdpdpveiwxrpu7gr7mqrjtalytuw0yfo3u',
                flowInterfaceName: '6iv1u0i7j8el58hwfbibh8i8ntl6svs9sbw18frz311p6uv1n16bbfqcokrp4lsq3in6r821tdp7dktves5m6v7qq4hlfy1dzfby9nlvtgr1ghaylcsuoqvk36txxjq0siesvnjkczti6hkx10o8zunqe5bt2m1e',
                flowInterfaceNamespace: 'lvu6ci1e7zaxw52p9znhhzm98p8uierce3e5xayu26qhnq63w94v8zq26smuan1jbdplpszz825vlveopun1dxau2nkiu558zxwquo31sl7vgbaqx3rlxgg3tzv9ale5avg0dl0lpiegz5t8hbbjfpj8g0f9jyef',
                version: 'pgzztazmbzd1klx6j4ba',
                adapterType: 'rtb06xjot3worac2oswj4ma9btfvosdv4b1uzdoo6mmw5cryl0u7w66i79rd',
                direction: 'RECEIVER',
                transportProtocol: 'nb5glizb2auwrplqnjamjsnc4or68drtbieenzkojxp3p9neteyrmw96d3o0',
                messageProtocol: 'jq9jl5zrxwmx6hzautbsnidscfx79cpse6uvui5v1csq6t8lfxiuw0p7cim8',
                adapterEngineName: '3cp9d3esx03j826k3pdhn0l4gid43b6t3xm6ifzsos49dpssikmatc5i63v1yydqfgc1m9a1mgk7pevh9caf24k08ue72ggjre93c5vaf0jxccr7wh1z0g5v802nn2e5gd8rssjwxa28tanb4e4jkzkm09r5dtgg',
                url: 'bo6sz12mwy8sfb6epbyvxj1sfl9zrcfv6ojs8joj7qyjshs3y6hnabe8bfy8dcv5gmhajhea9ykf0i239rp1rgbgmjth8hrbehfn844awy8w2y6g985zpl27vvg9c3erqpbhipc3nw73j2grjozupe9q97bhjn6m766ln5tiee3lkcaian625vvktfeawkb4tknm91upl4wvqi00qasv7i9wi31cdxswheiofrp7oreecldkobgqfvgkljoi5ad0py6oii43oyy09t516w7diq0nj1apqmn6jx15zu7gosh7l8bljza7q56sem9k9b96',
                username: '14upl3cs1nkclxwz16eacbj447cehccuyu69e0w7tnoxb1cbslv8tkmrvat1',
                remoteHost: 'yaqfhxnu5bk3wjcz80yr3gbhdctk158ioswuissnm18q0wzmy4fatg8hf5ut18lmux0tq3svl66ut6b1xy6w73c990vakgft4yqt3ks38qhhrmqdb3t79xbbn7i7ogndnh6u1nldsqxlgq896dmntgnjcs6i1bre',
                remotePort: 4440905404,
                directory: 'ecc33b2hg61bm2s2ldj4b1lhxoktllpiz8zf6mv9qcutyk2e2eiq7luylnzsz2fk1bt03vxwoiszudjyke41cmww7x79ynkwp0fhspw411qu72niehd0za5292y2nnaj7j3xapr968cjt3ip0bg0xly8h01zar6yvln1nsisif2s2k6ou9mpf0gktbulk53uzo29m7x4l9nzt19lixeq6x0xy0cnmzs3h0xh5m1biwmabfq65370lnbase70rgiupn6qo7mazfg2suw4lxg1g9ph76hkufbfpoefbr5gr5wwu02d1ljq5ktht8va4ckm2zv236uh4ou485zmwhp2ky7zpp6w9sbkrd3waspwrz4f6vfuscwnq378c2yj1rr0v0lpw53tmdftr3s3ljqtuzmpejd7xbxzeav4qy659qlj2schnflzu6htod5wpaycsn6yz82vdbjb88uppksi76h1mopokh59nqahnv5mfhpe5plwyji8nmn6bsdm50fkch2g72oi9d9vghiz8am5flaesd50dcef56njj0ytdsdezuwn2hk9gcx7dkxscf61oviqhfc2vplhr6ctbjr4fps4b4bz4fqlaa3vvufm7rh5xxqn40l6qi6rtxe35glsf999d6m12q8duxo8j3bm43mi0e1wt1tkt5okj35xozpkn2050nejz93mbqrz8aqnaxa9ewr6chhyu21e3slqonk1x79hfs2zlx0a143ijqg55pefl7rm4d1zq05gp8qo9dgdhyz0nypfedo3t1pebntt5f15vptukc3s84vkqmvb7qh3olnxsm4qotq3sdspcd1ulrdslfoto53symog8ztfwj1l0un17le47a5s09m1aafx7sa827nmh226zpto14nbzcr17t47ut3p3j9onaz89ylrbi8irym6coasajxaslpd6u3r49dk5sfk8vwo2poslt7o724apnpfesa34iiz01eonkf5w8xu5hkjh639cku84uhis6h49j6ndtru',
                fileSchema: 'h31lbi3pk56eyulwdz4iyxzceao6uke07sbpj95zjzyu2hvc6zfv8bdk40sk746gqnxjbd4o055kigpaxd37sil1lscw8emnnt6pof380s6wlk6kpab9bahwfl5tirpfzyh1f2s4stevcuhzt8v92jjc0qc4b7vnte5grju3xtn7iwfsx4fzl6r4jnepvrz8tph59g5t7s1ry8736c08n1kis83xzud000cw2v3zwa1svq0b1q8f9i6xyj2jgwuuzg88nb5pj47gdhbai1c9uamkpj6m8c3v80vrqamohhrdw5hody8ji2mlqns8rq6lwaah6rima28gcw7j6a8idpl1szsfjlr68a72llw0fr3pcjbhj2fsi1xuc3vyw2o4heln38sjdfp6j8omgpaiw1jlpz583gidujz5ff3y136m6cqqyj58sdti0zx2992fq0yhdgdn1t27ba4so5o7q0hlnrd4hlyzyrgwx9a8ihjtlqo2iqt1a7dwko02yhdge46c0767ro6kcdkkgly704ktlh7klm85q89sctd7zi149i1sih1axog8wbf2xnclu4yduh0j96pekaql43gk9w3q3ehpshexghumhgrc75iczd3xofiz24tjbkjizabn7mwux6qgni6bitfqiz5va33i3gt3fjeqrlsrnbv4p4o6bdk7m3r4q6vzddje2ioifwzpkrqekc81f11i6ogzrv3s8rc7o306u3jerhdynd9yqnnctwh4mvtb19o9lnabj36xl7kyla0zia5jeylk1b2pi7nsxjdw7kruyzyx0d9ithkroon3si6g3cwt4xjaj5id8jj94y04kl7xm54a0z3qs2w9kufov18ps4t1nlju4kv84gqq98m34150u03jiii9planod63fuyi5oyn5pz6htkmy6y80qg05x65pg0iqhlbw5f98v001b6g76yusxcbsedquq5qxldbyvfcgycl2gmkt5qdtwn9o1aeglx2ofcjcsyyl37rz2yxccvg',
                proxyHost: 'zb4ra2h7qndjylnqde7lvyoxl7kkzc6ff29nd0ipjmpzcdjpdzvhfyqmxgvi',
                proxyPort: 6373671041,
                destination: 'a9jzzq8lyltlyqglqbmt314knx9e4k5f0vb8opdxli6enh97ltz3pt34vb2gbfrbgvmp5fw7yedi3v8y79o1o94mhn5fgppa0h7ep3onv8nfw4q912cbcrkqxlhsrp7viycamqybm2t0uqzy48sy1lov5tk75kfu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4grjmf3k5fum1w5yulmvmlbr9cylrxsb4u9onc9qtetge5rshnx52ypgtfdmcql2h81jhkb3p8hf6n528k4yuctufogxrjczgrh7xr2tcyjimz78se6g6xk2mpwzkxvb1pz7ao2udlvboohjwv7zdqthya91yiqn',
                responsibleUserAccountName: 'o2p0v08zjofmbd0f4hpl',
                lastChangeUserAccount: 'hweb9iryaefifxz41916',
                lastChangedAt: '2020-07-29 12:49:27',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'av4b35bbqu9b4866rz2wxxnhdlo72mmzo6goqwra',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'ip7r184zjfaebyc7u8gpq6hv7kdazx2jyw5q90c454mphwb12m',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                
                party: 'ssvukmjldqdgyebp0vumalz3e8drl3mdyy26mb5eo8qbjvt8ydint9z76dloxxnbu5smww744qap84u3xglf6tevmeg5qxb9jo826hpumgwoft8yrze443f2zw0zgvkwyrqp1mq7msy3w87n1wy3pkvvinl4om1k',
                component: 'd5eb04co4lg486ltk7f0hrffu45m985001tjsb25t733xlf5390yjap1vjg6ctummatnhx9kw2olhsg37l32h4fqetjuibrg7usv5n525ondvzjwc12fb4osyytphqd1bhprsqcoeg6v3quvjwggm65gl78xc5o9',
                name: '6d9y5abduiywlieui0sd7damnpw609eugyeldtii529vylpbq4lfirdti13to0g3j41e1ddbhv9g840h3p6tg5ji4fvvec7s17ruulawcv657enzpgwr7lljs56vbphl105pjcmxvcvh54ywqpev6oyg6krg1pq9',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'opd2edp72hjgpdgax0uyw2duuiitxxhxn8neow4iywi8dzfryty85i22mxgwn1yl2ytnzhiedcb5cnibj1fu7ps1w6vpgcqd6a0wlt4he4edeevwerz52gdyk6zm5dqzaudd1k6kadzkhqvoed5ua3ptxrn7sdyv',
                flowComponent: '1ttyuk4k85o18jq20i9y3ny0mm8h36d1a5o0478imxvbtkbfghtjozjg73gjfvzp8ncjwt0znrzbgr6f9i44uvhfb94ccxsvge0mjhu79pp6a1u7wlgclz7t7ikh3cz5rdpmj4ud0826pqy5dpjdtgn0qyxqthaa',
                flowInterfaceName: '4do6xl9lvl17zjn2bvjjj5d6v9bfmhpyvb54hxn8qvspmew4o1igdkw51t0niq84r03lw5xucaj6opidecjxc30o5qn290qir2kdzc9svfmxprhghzqck98ttg2n91dqx8893ld71egfsafuwo5f889ke1hw0jpl',
                flowInterfaceNamespace: 'q4vp3smp8gompz7bsmqq6hporoekbo0lqbvsbpz10vyan438413r8bzktboig4448i35pdma7vy2ir7p3zo2wxfezrf76gaj7383nams746l9tldk8fjvrd963342lks4j7eebis679hw4h3icjoe5urdt9xvmh4',
                version: 'xqaxttnf6upwrs3ovkpa',
                adapterType: 'agqr4mwyalargft20n1uugt9vrk2z99lo7ytmxqf9bi4ftiplixqr1xbqvky',
                direction: 'RECEIVER',
                transportProtocol: 'joycg5eabuiw7v19rmk19iaxic7zv8a1xe3k7ccj3m2qru7ruc3ord47bku6',
                messageProtocol: '17v7ww75vxpk9zrkfx9585y7u5dxvm063kmul843wy69esdhe5d0phnuvh84',
                adapterEngineName: 'kcsxiwutsia8pmygvtduwyadc2kh287l0hygjl7x7s1wjm2z9lqtz517dpvwoxjlqwudyjcw4ph808p7duktxw749j69eeraffsu8rgffn8rcpynuk2vg9dl7wlni4xz3ladzpmtaqyf1qzexmgsjr9yym1uc9kp',
                url: '5namzlj0vebjvj95gegr9wxi5mpe4ivx0tivtduhswjcynlxo1zl2o9tp03164x8ujzyve8x9k4k44cfg5himcuga85r7vifhut0wmed02a99wovl49eblf0ob1brcvjxztovkys967oj122jwaaelvgq2dh3v2hkergmynqu9vf637s3wuhrxyvhrhnbi9jy00ppl5yw9ucaxg9epbyqhtj2gppyzyqlj6tem0g93yxgeb1iz1effsfkz4cdkcrdktr1r95fti6q6ppoj5x8q71cqsal4gw65z8fl6igjn3s0ox9omnjmxlvntsu3me',
                username: '39wbyo3tqodwt7fpyq5116dyuwoj93ie89u513faz6cfv65aif1piv8zpb9z',
                remoteHost: '2szflrp12nj6nwad63nfc4cmvpnldfed8j8v2jmytglos2yj1w4hed16fggou4w9e86rlzkuqq75hq9tebeck8ya3rznm904mzmto2y1axap4oc1erotx8q4xgne4y2nz1xyekk85onk2t3nrkdorg3qcj2cdcb9',
                remotePort: 5174632891,
                directory: 'girja6nc254uelep7pjeynnkgaldxu7agkz9yyfjy8zsqdhvmq79shu2vnru8mvei8otp4mjieke5b4cacnshhfhtgq45hqerslnok8o30nyiumkbpafgw9enbncnha5kgohvkuhs0cpsh5x3v5851rb9ndt2eieytz9ib5pum2rnnvkoupajgbk6sr5eagn3d2508f06bcj77gkx5blqjt5vf8esqub1qp7mvjjyqzgp0vm7ni6ce6b359qq0ljgdtk8cgv1cqurur9v2xz2c70yv1bynkxtn5bait1xr43eymz3dfsbml40jxy8rosksi9gt5unugv7quotq4q7oxfshwments0of3ldjkd0j9es47jbr4qcjzjiqwldtb9t3goebv4w6cdc95bucxtuyuxmn6yfsgjxl8rzrk7sldca3ujl8e16areey2axiw0iqv81huaabhja11f3flwrq12kr1g5r6jk1v0pu12h30wuugaavkrts25xll32h6c3fuo76k0exnax5t6l1yo5q276yv81re73yc8abruyl1xflrqkmho0z56akom30vihzqt3jmk3jnox480sgqlaysygmpy4dcls92tudggxwwgzi0pp8dzth5lrh1tfezp9d77elwqh3hl6anrie6pzmpnjpn3e87edgzmii43vfakldcfr4g6vnjlzaerfepv6ttbqaa3721glfpqx9er4jlu47gxq1aq7xeajgjupwmd3g96oedp47496mn3pginiarstbjchwzvgre0agravpbia2jruz1ak6neqla8udsvf44l8gf2gzsj51aggb930zcusrx03wjsmh2o92xealyxa8m3elkg50qoovm7dpbmybczb92e8jc08m2naa1bqzsu6n789h31mbbgiv294dg6mjr5cv7e745enith1d2tzgwk1g6vvbfpvrf2s2zbkg46y97yih47d1wrny25hlnmd98d9n148ter59p66ckfxnzk4pgzphoywhjtv5i',
                fileSchema: 'cvnqp6d968ppftzdyrt1utqc0seqf08u0t9puyf4rvemdlwhunizeftpmlb6m2a2jkomc7gtexk18zhmghanoqb74nqkik3zf8j4s2327qolwu955gtyuw732d52vjcf7lbljuhkrwwvijphkfuc69jwx8r9rudc3mq22qus32gzw6t82ckj1fjgzsxhkylucy9r03i4gtw1e0mn6v3k221qqlf61wv75651dijiqyanmgwhvxoq2dkcoa8rac3snqkm9gtb8rvpq2neu2stu6z4ae1ib3pjrquoonfser4zctw7rfvavkw94j6oq9hwbsjqbw5dtog3437n88vwcbk3nfr5dml3y96r579fjb6gcylzbkva5med6l3hm4q2af6xfhqo26l3htgj7815o3bx95yu2yyxi1ojn9b7oss71sz17lcljf35v3omgdmy2vhdkbseazccdvgdiwaqn2jkyawxsxnasf1b8j9l6gkitb457y5h565dwvbu0luzt7wcace1au4l57pjoqdlfq1s3g9t1dpm28472eum07szvkcep64n4w1h60bbvjtacw48iitpifsm4vib4bbf6oloh415zrcerpop09tnttufkntsu0rlnbgpq8eoa9butt9sc5gbayy44e6wubbzw8idclrsn9gmegbeli594xb9tc5h6mz3dvd9fq6poke9fhol28vwevpvc0vmgvl99wuu1516wkahu8yns4ly7a0rncvg5hs64z55ueuj1sp1z0zx3u49x5czwq8nlvxyofzejak618x1d1ax24giemnk7w8lhplvzu1yk85tuas54r10tbg88me6l91z1hm9gbcv68fw5ytrqaei4e3cp2ntyjxm5im1h2id37p92iwk8w35a4mfrozbxaoksbayu0lqafzoziti9a4dorzu6osbon3il8cml7fc9z5ewg1j6dw2tvo2enzqn53tsguoouu8xk5hp2p09oltan110qoi0bvr4yb8dga86u3h88ac',
                proxyHost: 'b06fmer0tylssn3tmgcz8mbo5weg1x3jkkkctzfn4jz8tfe9cw17n0x4w44s',
                proxyPort: 2124273923,
                destination: '6qjb7bldkxdow88rwtiha560lgnu9xljji9ffkg5vqd400y27z7gu9urq68x4waiyfnzl3hwubef9uy60lgkvpn6gkeeztmz30bxa6smj3k66dxrzu8ln94qsonp3t8jrweqmf46i010j3zdxaajwu93z7fr1d6u',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'em6vv7wlwd3bgb5ug3r1x973shh2g7drbf1wpviv6ao527yl57m6woxw2bbkfejjkz86z4161nkg0y419bu9uam6epw0tg9v0nm2b5086a0y6bc1b93bn8jyn0h72d5tsu7mq90mju2gogpqalbzh4f16pi6ho4w',
                responsibleUserAccountName: 'yjf4l086bqplceitmtae',
                lastChangeUserAccount: 'pr3nicgzt0lsulqkc23o',
                lastChangedAt: '2020-07-28 19:01:38',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'u630ddnowba01vg9u0vr2es3mo4t6gxbcll7ivxs',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'k44rodazumfzhariozhqupdjhvrb5ql76d936qgvjb7wsamfiu',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'urrd2tqc6xzin2ie7v17',
                party: '31ucysunc0y72r9t9kx58nvv1iwjun3woxr32126uubrb65iocxuvlliwqrfol4xm6ei3kewmc5ifx3wafyefjn69weacy3v9djyb59wu6m0m1aij5qxw94gxs4n4jxtsejtxnoprpjd2e4odefqv7tnbzq08bzz',
                component: null,
                name: 'zok3ko8903h3q8r5wuxopdt3mjikv2gy6jf6vhwplz74koel8u475jt0avabkv1fjleqc7atz92zqjhen2qdougkpn00hogm4q8a0vchtn0kpjd18s0vaxs3npiv1r218ci7kadeek848t2lptlan986dqm2i916',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '6ddoduj0d5qlobv121p8gcks8nwqriix3l5744eqwrn8tmasnzju1vp9zw5qzwdbrfjo0jb33wygl1d2ortvt39c9j0wjedue0ut2tc6f3ae8nph4axh22743xted09nqcttuf4xnfzjqctoz8c7ua9vr6hmu27i',
                flowComponent: 'brk8vhzvfbkrouwswd40liwhnlrzhg3rgun6uit45j8cmotkh66tbocwxjlwr7j64hd8oujr0nv2xv5jw1adzpjk3jqgjm1z68s5pgg1t4e8tvgeeqteyvavcpad2eesscpjadh3u0pmpfmyc98gv778msmsgiyh',
                flowInterfaceName: '7mo3c2e18xb3wuosc5wwk4tv0i1469fri41g4t76acm6e6mbuhfe2fw9jy3tfwg639vp9914roh90840we62wbftdrtmnx3q8u7b065ukpubz9vpodxyosfkw2vwgz5z3mpu0uxfy8x1g9tcwk7wq15ygn4b7cen',
                flowInterfaceNamespace: 't7hwr3yfmvlaozzawncoemvscyioe1uug99xz4zdlrdnaveg3tescrsr55xqhulgms7at3uuz7wvduk3g8d988ksdkbbp922f0oun9v6f5215lyr7ojy1xulkpppogh7up40p5bobdtkh1qydpsdu5fghd4hv3oj',
                version: 'rbc3fytaknjlklk7symt',
                adapterType: 'r7gszapjk91xcs38c5xavuo1h3bq568lte57sw2l205epm68dkbrl6at8ek7',
                direction: 'SENDER',
                transportProtocol: 'd8nd7znm5737xje18vnzxxgjtf0vunyplvq3skpmrobwiq8n5rf80kgr7v2s',
                messageProtocol: 'vnsnx9w7heqjod1t5ok5j332lax49i04adsq15f4pwz4ems066stc8nninpk',
                adapterEngineName: '7ljo5tvxdy04slurizszuq0n9ym1h7zrwiegiyjh5esbj346flpaf8iwpjjjxd53xew72b6bvjvdgfwy1y35mcgagnppz01koomb8vc0vdgpnmy263hrtdf1pw974ymnh7wm2hq7wglpgrcne2meqk1r8rb37xwy',
                url: 'h2n4x2321ua9imeu7wpjj7ruppiu7u21uld8d0fm8gmzl0b6tukq9j46k9s9cst7in0yvxrn2fdhsg3arcgq94stq6fgkul9vjtpeemd0bml04xfyu6094w2zp7lw0qnapgn1un9s7hqrk9nyihleoukvpmddka2gr4jao0g2d32bdthzjg4ju3c5426wpkbyjrd3dvg8pbn8n6eheenjh61j8v73frhrvwkf6fa2kiw7tvlxasrxcdqjmgp4hwqpwivfvgzrkjgxj4335mkdb8fdzherxkylfwe2croerwyfhh4isjynwlq0ygug3ph',
                username: '9e25hsf6f2vbpjnob684dk38rkc49epa1m9j2db82z3xakpxqjff4qvj61nh',
                remoteHost: 'vfvk11vimrt5q4itki1cem6gmurbjot819tuxk297vldnhw3la7nkoq15ukc0uivghkhqd19hzoaj6e3zohtgn8f9d7un0enwv1b1v4t3pcpg6ebdoup2wvpj0sohmn946f11xh2aackn1ezhntsumytgudsu50a',
                remotePort: 1672299261,
                directory: 'caboyutnn3hcmo8s0u1t5udad8bmbie57695zv4a9qe9jkz8tyori8es3azi3qqdfbikgilrkl8rsvapmpvz6zn8c212mzmqnt7r41xmm9qiarlvpcv21z2padbnt30xrolpqfuqght7gvx6txftszgy7lhwvisjrxnq1jmh04h9h0wkgsno3wylnytxufxqr5t80ixx2l0ohvugyrrr3vt6eekgnwryxozzafssdupz4b3xui4inbs4avayy2zs84nk6z69ura0g9vb4dvscs0bp65xhuuv61ws931ykg8hzisvnt7mrayawufuihe80yef87lq1toaxodgcrn4vwj30oo47bb5yykyvuo74oo8qqfhe39wxqyhpp6ycmpzgwowoxpx8kjxxffjjnd2cph3j096m28f2baduwf9vyenghanx0oa2ojqubomwnsuncti07iey3ail83q8txoluj39fsf68yb64ypxpposcws7gz82wf1457g6gei30hy7r2639il9qcrux5uur7luqdsw54d4ori1604cuzj35nceg40fym07tf694si7l298xi7lldhuc7teu3d12gm9904nikui9bse9j3mkcyszbdmke37a55j07lbouq8xf665eqfhx711uu5comofaazjw713unklo3n5809bzwxc2nri1vlxn2pdcagn2r4dw044tg5f2n0ku3d7j4sojhn6e4ydod8yuop32xhe28xi03au38cua1xy1k6e15rdvfuds8svnrpm4wrb93kmi0iilg9mtyzh5pr39icuwhh3j9jw40o6x7im4q81jxtdqckhi8g3hv14paua2j3cwqjxgfuyyf74qiu9tlb9za12dkuguia62ao1n79ykkta6tzh5i3dhzwnyuoo0jcgi5rwje2sfwxd6ebbkpaw7spaemem05qwj0e043rihehh049k93xhbr4vbtjrdgmx0y781yb3usy27yhw14vuaf6hebhogck40nrbtaahrav874',
                fileSchema: 'u9ntdbd6b7eqzgb4vdsvwth4o0e0xe2ufxmh1lpqbuo86gzikn6dz8usip4p3gp469sacu133xzog6vh51zcn8m7yqx3zagjszuqprk785wph1x6rd50uf8sipuum5bofklq8jwa6f6o6xs21bk27jkbpv72k03qszb8pxtepwp8ymzonufca41xl4pzficytg11xmi886k79ow6cm23th9glia9ouy8upz2fj3qq5cd7u7md8ig11fqo32c0yhf9jodfel06q4508xj5rjg7acp0jmcaobekrqloljep15yvgklm6hexx8flzzmtfnoi17x81d2audr6gftqcgutmdn9nf92wn79yqxehqr87tx4hmd0h517acqox1prfrai10wayq2631r1fv93krvbys78e31cu7hnbq909o4uvxnqtr7cttkp7gn4gf230ii2n0afy6q4svxdo0yn45bdgx9d654lq5x2oh654h15iscdno5jml6ceaobqxjj9wgvp9z6ivsq4l2jjer2oyvuftfws47lmyvzvb4o41u0jceuupdf5dc7svdyi7t253qn70dly2p1my233k5t7am4lmnbnzaodgx97oyneghxdjvdeec1ezs0xn2rw0bz7gh8v39zvwllo3ogizsrxb5zsm6cqzbirxl8g3wj14hd1ejg4si41pczbpr2q6h5w8ql57rbw4kmjnb7snpkbndi4er5ogm0mjiqhvokm4av7po74o0ylyrqotqcjdl3g7qtiko9jesctij7upsupu93nt6wrtpu9jtfe9be9ai84lrf25qsr4bn2ik2xx7hxgge6uw13s3xib1cjzxog9otewnu2s40hj4ibgaxo7kq63v4jlw6k9529a7ri8qt6830eiyv0q1edjfyjvyc5g2wwyjpqf5irg3xlz2dwwsy5z4ujf5geamt1nyr8ytraofcyiqcf43ydekyawu5rmp3lvnt1hivnesmz34wfcoy9x7ew2ovofgk54me19a9cz6',
                proxyHost: 'l8oznaz8hw3d6n8yh94eehz3y2xr9kx6uze4ewzwv20zzh4edycxunufwrp5',
                proxyPort: 5424307429,
                destination: 'jr0xot1v76s1vvudy3fg2oq24c5cq69br27ot8r3qoda3q2gob03biaauh6fd7abkxwkrve60hhgfzmzcexxug09148js88ulw44wt3vdubnm07rda8ymgh3oulpehjmsqhcvoyds9j1tcxiwqp6sa24dhqgtww1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x2z6ym1sgp1424xo41vrvprwg35soxgazlz1srnto9hmtmqih4538y4qu1zaibbouzdtwt1aazi2cspygwlyo5q5d69tnsc7j81if3zwz1dssd7sp3nzs2nazfxqcyxx5d0rcvr47nt48ir83plbfc796lls5lpf',
                responsibleUserAccountName: 'guwxe35m4xzj35vqyt7a',
                lastChangeUserAccount: 'x8ipcgdixfe1sudisnpc',
                lastChangedAt: '2020-07-29 18:07:57',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'y2940guof9mxbtbd1832wvp9tm5d7hg1oywjgrqs',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'zre719k2mae8hj944c4abjrncfpx9eal6n5lk4j1fq2qqhu7x9',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '7zdsrda0qb05piknl4cx',
                party: 'cqv229lzzsybi29ee6hb2cehhxcnaedc8gj2q7h3146u00d0wnt8ajsm1n6173b4y5rqjwg04bjtd52vfa54yfel10kksiiudjyzpoo3m1zgh7mloe84bbnaozldfpin9izlqjclzlqnc9rgx11u27lsxt4dipt6',
                
                name: 'h78ia1h9ij66hn5yfzexdtmr78b57ji7izk8t03x13qo42i9de96uej4js5crfrqu8v662xx0x5pdazogp57ir4o07ba1k8y7yyoht54dfehqs6k4krkbp9i7e3yzitorvoku18b2ig2jl6sskyph3w8beu1wzui',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'fu42gzxa62d1yhqko40o1xqxu855k7ggwir1m20z2sabq36xifqqnqh58k028k4khypy7a5gnhfnmeqfnlu7g1u19eze3p74msr4ln3t5zsmgh38ujaamlucvpw2q0d5iylaoj8txe0s3fm6wllm66khvw5qzri9',
                flowComponent: '4e065yusit5wmusszjgwmiqc62ad2fpzwgvnx88u2not1vc1j5b26zs8ja0h1ef0cjkc541d0ir6220qmvvnqdydp6k9gvxc801ykl17v06nadnqthq63mpdmcfijdtepnks0jdera23b04mg5wt8joqx03wrxxl',
                flowInterfaceName: 'teq6drlwdn35hjm6esgtmtz48u7vyoqc9j69weoil4acbo25x8mthl3vnyeb4tuivwarmof3vlyx5nf40w8p7l48sobls5surc907flz9mdvrnsac9coi5m662iesw331bbd1i8ek8dqiem23dyt9th6yn7j8soi',
                flowInterfaceNamespace: 'itzhcfii17rua4gg5p0pd2u1jew92tg70jt95kmswkjxat9zcr50kwsu6a1rtwntfmwfvm1wbomsid0j2z8pqawanyt0pjk9cll2zu5v6vgb0pmbdgb647ex14r2gicnf7rgjhdt8o21so32wt2jfkabkacpil9c',
                version: 'jl6zhbhn64h6gcu6khkx',
                adapterType: 'qcsgh85ft3wp29k2mm4vofu9qpj93ednoegvuy3cvnn514twj9h5ximuobtx',
                direction: 'SENDER',
                transportProtocol: '15wg8bxf4ml75p8schaoh13ugicyi3upxa8w9j0zmwi3rr186pj63w887qht',
                messageProtocol: 'q9i20ny4rl71kxujxcmj1h8bvilohuwz9mwd93qt136ohdkp6ghwho99qjob',
                adapterEngineName: 'pdlg5d7ebak2xtbpev8f7shumqairjfzj4jz5i3b159i7ywvu03i6rn0aqpu1x02bbo6wjqq5qx9i4jj9yxiqbtdypg89xso23tuqkdm3tf7drr4scjxtu4b7l3mfknxmejikq19x84xzpfyouuw52ww2feimdwu',
                url: '7fmjt4pj1yk4xpnq1wzpns0x4q78w28s88by1xpzyhrtep5ggw7lk8jmrihecwdx5mpgid6891nr99satq9dsbmtypgrwc9wzlnixne7nm9sdniiz2s1c481ayo1cj1iy5cuuicax3v9sofnff819y5lkkayceoa5yy06nhq8ounrihtuu3k40zokehc1p99ijruj2zh9ou136zx3fh37girzpp658w0tuskluaa50km8zrbd05d3rez4j1ep26iw8g7k5ju43b9t9jxhfalaymtm963uzhzjsg8xf6uhumx1ykeao202dctved2cmiu',
                username: 'uocy7sfe3ng5fkyc26pxhegqixrmfq3ig1pq7wp5o225sbt4ksqpad7mh14b',
                remoteHost: 's92kdycerh1fb9pb18vwp2ptxrc9sur8ikfyq3gmu448ank7ehueui3i2p3qhfzkro7pt93img78h0ij4cpicfno470oft56rvip9nwpagldl0mirb9ispn79n0zk6kpy2ez8xdzgwa5wvs8687qanmz0khwnle5',
                remotePort: 3581360855,
                directory: 'y3mt7x2448xykpzrcq2f7nfcg4mcmktqhvvtbzkitbazp4z5eglth32ki7kiqwd7jmwnabfpgj8b0x9a8tffxrow3is1kl09f64felq4ed0ps2p74pfvmq97f492gn0a1e6gg3sqowk4ivj0qgg8u9qprqv0u5mth4gxc244qxhh1jc3lh6velu0ikfpvewg6x6hiilezxm9n15bq6wpy0x35e36007pd4lj5fs1kyv4gtgmb6bud50dt0g52tdb4wvoy1avdk2n4lwfab3iw81irv3cgtpwjq0cvfhiomvaxfl4mviw2bqcx6rqsu38nq6801ru9qzhzurecog415a2kd8cym2bc6trofm9ovv2q3q6c0gqnad0s6rbspgeqyby5tc10u7tkzh8org2vb2h2s9aenw3zlcp6dlwvsomwkmuc3b7wz8taki1ksjr7szlesrna97km6dy6gouu1yx0159sg86h9viqsgjrw9ro6dezkango0l9lp4gbt5dv6iby7sl7994mi734021gq88ongvntzh9tccix38lek3mu6orols10fevyl0mv59pz132a9ulg8gviyh2lhwgp0s9p20u56rki5p6w8vvjd8vddf9a9pukvqrefcnzk6iks0n8ykaipwyvq3t05vccud5rbpuvht4syw2rzocsuvwj13cyzg2mzfsv0asj75u4ti3ljm2lktt6srgctyt24lf4hrsz9i2y0hlcvofiql1zupz34jw07v1i1n3zelx17dy7umcvu22choqnwuhxci2cr2t11ds954y76w4mx97cejhmm5i072h9tak4w70hkfiey802ecdqi9pfttliz82bezcy5kbcr57obz77hdrrgluxy9knxfknupalabrszu7m9o2kf7ruza8vcux2uitubfej23j53ekwrzo0qaf93ywftml4cn7uf61uuk7owqssrzg95a1aas294tjez8urbnuz1duuo3l2xfiqv1x8s5gdn7fr7l63wlca1',
                fileSchema: 'hiq8zvb63yq46jcza0z6j72jw2ba8h3iydzmg43qy0i3iyclolw3v1gdozyt1bz9efrd4notx39a0iep2326qdqhysv3h02ejfzs1rarj8pzvfws0k6zwuj97lqkr7neubj8bavn4x9hn0spp8tmt0bfta965pza26trn3vidikhk41j4sp71hexe5w0a33jwy9i762z82hs4534eu69jtxp57jfkecz7xtysn0mqxb0s295iiqbdar3n9dudvxk7ux95apbyj06qyfzk3nkso2qut1wt8yb079kfm76pglv95s1ujyp3mdza65cw0u0tg8u2sgcfauh76xvyths21les7r1jpgee3gfagan3i78bfmvkwr7crvfz4lv2ms0t1qeqq2kxb1vnwhnnjpmc935mybbo9ygc87ao9uq5noh1zl3c43qzo3lm6wxeh033mqnd6nrqvy18xavjrfc9os49dihij28uvu046m0sqpt17ikfoa70u5hhlamysus1wcedk6hqrpxj8xf7isre1j1cveanipbl7fybz5up0fsy6959cvq9leatahtrjab5biwg7ogwf44vd0ni36dv8skqr66ck5qlhuatwu3zyurlihfvkhy83yxb01lpunhfmh7lt04m30y34wy4difqttx2502mebmyxsb25kyubt30sj99yxdngyat760sfyyq614i9qzzt1yvaizl57d31ps8yco0hixrufcgfnzjq216iqbw2a7c6903ebhw337dzdhgdrmtw01azes2akp3vvwb0oh5z0r89ptlqm5t40shpmd3w00mug0e047jolzs0pd0bu8ho1qmca3bef627kucjcqpdzrg9ddve8kjzktaq7ylu009gmf7zw44hoy6xgbo08jsbpwolpl4m27bp22tenm5l14rkrirduno7l1o533dewx5bic7tnl5oov8h4yqk5a7v0qx5yu5tzqe7erl5k8o3kz8oxxrng323bh25e2kk8cn93mv3fhoa2k',
                proxyHost: 'ozwgsflldrzea538jyqsfi8tmjgdop2lat58zddnrxluodprrlg1thjo1m27',
                proxyPort: 1927360469,
                destination: '0t11b7wx8u9qecj2emqvfuymrp6ng0jwn7yzdpd5xylwuktldbuiw0o0rfdccxy998kxqagng8xm7g3wnze3ja8dymtais3diq04ntzlqany7sw8j1ghs8r9g6w6odavssurjc5l3kcm16dabiof07hz8o2qho3g',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '34gs6zk8peicibq895bp4lpgawwmvikv6z6aa72lbtvcsxfj4ly9f2mfnt10zfbl48j2v3hupuhfrfzo3jl8z1bkgrnx5dijt3ypq2ant4tyojh1d9olyvh28scsli2fkjw875x9b0sblpncl6yqu0tvr51ktrf3',
                responsibleUserAccountName: 'vzcdcntmv9pekrify1oy',
                lastChangeUserAccount: 'cyt1wz5cq3oxlv54844h',
                lastChangedAt: '2020-07-28 20:37:58',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '788yaoaityrurpgcasiaas95yr5fkun0wlgm6zkj',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '9dreqrasqkyxwus60smlkkh6dkoxr1ngag2hacjz4pytwx92jl',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'cgkg03zttnc6ek0ow8u8',
                party: 'inghlkcyt8brmise9nzhb7j169dzbbdnztwks2vs3ga4q7v93pnaa0lzy2dwio0stx9rtnubofllbt6nqvnkuz8rfb1indz6iaaod20nl8ny6pvqhdzr8vrtua7iwsiqpl8thkmmj7pyhpz06zpigpiyithmu9a4',
                component: 'b2q8qafgyf4v3gmf5guo2zrf6q00kb6u797i0fbdkv2tir4su32yg32gwgzp7riytjruy5q337cifo8l90dfeyj4meypswulait99yy70av8a1pdoesh8d3yu397m9kf6kw9dznlne9wrma12i1f971mjtiolo0e',
                name: null,
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '1mk7wg11fdbimanz3qet7r3tcnuqwjizb3pjcp2xt7oqnoqdrfm2e0ggbt47pq3xqvefg5cy9atq3daqp8tgf7kbwwkpr3kcxwtr0ty1hkgfkig1haobnusequjmh7nj3eontrcx7dovoex3n760axymjkuuj14h',
                flowComponent: '8oeqio4s3vxlba8dhi4percrze1zj8kbuiuwcwbo2938uvm0t1norjai7uvla7sbwhf7ryqntzmxjccpnav6de78hzres2zmpr2obp03mgfozm5qzik373hj54pwg3dwdh9hhimxcika12j36qw3uafrtaj6c0v3',
                flowInterfaceName: '3d643nwc04kwfdiucu5e0n9aspkz7qoo0e9bh73v9t9xtsde0cxxk581lndb0swe9hv8vw19860r10p5xvamnt64bqs19ju5j79tbsb84ljejcgjjh2bbryy1vqt1mgphib9yu61zvabagv50pzczyfj1q1f5grr',
                flowInterfaceNamespace: 'jdrccgltklwn6j1k4zektc3s0um532m6z5aqa0zx7p4nks510faubs1ojxdltz9hgbuiy8de9oy1oq07q5e80tscp5ka14mx96aor1b8wu6q3l1291r7yohhp64rufx0nwy476qael62vyj2syfts8uuz9jacx5q',
                version: '12shoqa3mif6i7akk32w',
                adapterType: 'wbyrg1cd55upqh2ss1vvk1e4fzbl6bk4w1bs7tkk3zget2zcgu77oz4ufbn3',
                direction: 'RECEIVER',
                transportProtocol: '4l8mycx565rluk5coobza2e5c7i7ar3uzf8zclbunnbi2bsebs1iiq5r0ip9',
                messageProtocol: 'li3ouwxyxpo3k1ogwibf1vsh6nwaf5uttybippytl5ngsnv50tgictz8qu8f',
                adapterEngineName: '8vamrwe8fz1fkrnhcr1ogspp0leo94009v82at86pl9mdhbi9g3fto2zmowjnnwxu160oqm6qc65gnzjju5ydyyetoanxuiu28gea8kc2fnivnux4d7oooq5nz2rliv7z3ne5rysk3f3yzhx0eagqx949ddwryeh',
                url: 'm5qa2mv5egcbjsilk0cmzr8isz4pi8wpqh56346onlfknv5n6is4ksrvm1f7za7kz3htk3gdjn1v7726cpw7d6lxnsu2qkgnx7r17i42342yq591j87ruxm4yw1xduui5wcd1aqvrjl3wsz67obyysmq4zrowzh8oozm12h2f7uwjzcp95ztt4wiqnkly7uo3bt6sdprzt9yfe5mxwhwuzyuwty0tul3rlghhxcnlqdanrpvei2vwrsff7h9wkzukq0p1nzihf6m5wfebeqrwpyfbmq5rdir3g05led3qp8c8sdze9hdvew2g2h1i540',
                username: 'gbtto8me26keqaeahuzg8svvnz9tu07st4zd79xt9ddc24mf3o11ynq9xgzb',
                remoteHost: '9yhooxluw26a4amsd12xq3g1ev8gi11yczgyzb5s6rv0dacqjeukiaf2ryaafjf0100hvab2d6trna9fabli91e838ea4yt47zoljts5yscahy2l6chozc7ggu9s9g0m2m9w1civabcz5s7u240l1i3hufsf61b5',
                remotePort: 7821565077,
                directory: 'k307lcls32mrck5kqv3iy7xp2izuc7oijq8kdugjlzbf9chfc8y1gw80lnqzm6nknomzlf3dp2hq8t84kv8dlu0beslky4wwxj77k2i1yx6h5fs5u7kkeztwdb01zyfyjhrj9wqngjk2ftf1m2vda3v56uwqtzyq25t283epthz14m4g79tytqi0ux45hynwufdsfxbrroeudgzmhdl0z2rbr1muo43a0ke1s787iv0izmd4mj6kwmxytmki1yflwoka0g1zsbetfwv1i06pz2mt5fta6z3sks2g6sssjfp89erxg7eao9un3b2ccf40hp4rxfn5pvilkcgheueuwzudoq539e91uh77qvw6e1xbqata1m2tzyo90h913f2mt2kxyr6az8w11bffrfw7lap9sqk4ul8ly5164dqj6c4mmqox94z59r076qzqcrk9gfmdwf36o7h1utccg3r3nw9k9uygux9pbum3z31scx5yhg3vddbikgstvkymxtgpy19t5219c4c4psg41hcjy00zp1bn3czy9bkwq0rn0dcqnvu2fqb1ewcyuti9in5g8bqgbk4m8gzwi1w1ps4gh24s5rnebxoe4gbh0mqmndjzjyjz68p15n44kdcjsmwdgoggtqqzu6nw1sy8mn2kn5qikqitnalmqu3j46y5ozpm20hzujjj5gldk25nj521ayjhz8fogmthwtfy0lyd319jrbnjd3yveo1i7f6smk4f5u3mlxafyzi07d0yvorozkhjq5z9cqrqsbizex6n6pwzgete449ay1fbxm58xzlodvrdxz9y1kes3u9ff4yom4vryw18gxj6uglo0xumm9zlxhv247ny0mfrn8jdnsbivxmcgjefj3qiaehh6fifso2ur4hkrvng0drqc9flou3pxngxf91dbc7fklvg5lply0flwodn6vx5dwvovp6z4f3sdh0izw1w4plc6hsplil0bbqcob1wer7ljgmk3smv23zxgzq0m5jqzalm1168',
                fileSchema: 'wsxmgvxlym7bohxg34uzxsskmey159nq3bvczewiohw6b3ja5272nlm5clubh5hwszshx6mlbydwoju6hxbjlqnrwat2oh7rvd25a7yoa28q7wclpjs24cls0sy0ag5zkmrh7jbclrq2zvgubez9xxehlfisd6x6p74fg6l34m500mu5t4c2odb88jptkp8rczbw6m1pak1v98c9y6zu72lgawgqogo14azm116bqhu246e1c1fwgavoxlsfnwlv5uk72ioe4yie3x2json9okw7up5c14xebrd47quxn3457wguyx9pvu3kzhzqta0yzcftmcjsqats1iajylt582fh4kxoe9ji2azwmtuqil25hk6xez5b3wkrhnl043hp5w2ey4sxgdjeimdvs3uf7nu580brnqhdtjejui79ha0oy3nls7h89dkxx9z3fosm99y04reh867o0srb34fiolp750xknfwpwunusmg62y8s2p812dbzf3tahnupzvk5upqrtjsczw0c5p1847t0i1qbaxhc9ybi2pa85fa60ue6fjv3g9tcrk39kp84pfrl9c64vkzlmxscvin3ekz500y68ux54dvs9gihqx9baop7vu5bc1slh39aczyn2avjsqdyc57jchct2wv1fnhqxhukmo34ue02o6f702h1h8ykstek62umjo2r8v26178phc7ygmky97tykmvp6uvr6j9r9fdes757hscb5lghq4nfg23tu19zs785573gp1exb2x012og866v79h0q1dixclwta65c98n51bs4geosqr6kj32h23d2ynr4wlkebvrwwajxojn2huxht47j734256n42qndd06oge2z15tdl3twggds88dbrwjn9a2pmrdylybhlhcxcelvqct343en22zgqqqvjlui82do91ah28c9g1muyywmphgv5mf5e63ddh0c872l4pgidsqcmu21z2oovm4hl5gmhc61m3cfnfk7gc16xkihtwbooonh7wl',
                proxyHost: 'wyz04d4gkq1hafi8ouemqfzxde737e6y502ql83rcvucp6vqfp88o5xdxzfl',
                proxyPort: 8525705745,
                destination: '7q3umqtvom6yw3t7ir9vsmsuerw7igyipptqz2a4pxd486q5n65vsf0wxp84qy44g1txm844twvokzej76z1p5wrwbzkkyi8269n4viei4x037ypwv5kmsvta5ntw1we74ls93iy6a26y7rh3ydwefr3lx5is588',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jhxi7fxn2jcq3j7sytx8hia8ds850hgegfcyb5jjhjf3ciubstoumqi12gzhhi67c7mwy9k04lynnn8ci7qott4849ahyh6g36hhpr2bc7lt3qhllty7511a202bpht03b5k834tjsg4i22o0atec2no1m5ma2wg',
                responsibleUserAccountName: 'sk2qjsyi7lsy8fqsyzae',
                lastChangeUserAccount: 'kfxhceergjsce90mb7ru',
                lastChangedAt: '2020-07-29 11:29:24',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'kr5wbmgr450h6tmbwfb8mv1x25t9ozp027f0bqri',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'pae662o9f68uktjx34tlfg4xwy3wdhwguqe0wo09r90p470g41',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'mwjd94lq8858rlmdpp9c',
                party: 'ptywjciflyfcughdnvu1g3tvickrftox6basrh3nf10h67kp7p5lvnpqzoe58h8ejk1cw9v357txns8ulwe6hbpm1z3vb8815me07yn6fvflrwke9laabkpp680ludpf38szmsj33mxwxb16khepwoy8rspwtkrt',
                component: 'k227sxn0gqjgu0mswixjyui14rr0622xmsot7q6s8qbaa1qjcwd4jbwvbwvl87f1eztdkpwu8ej2qfla8bewcr1mku4d98g3orrd1wobmtrnb6k3s4dmgnuh5amd5yv7swkonlxan16m85k6015g0nm6hm70t4t1',
                
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'hyv6ee0gr812qy47abhzyvj32haoh2d8tx1msffqzvt8mfyzd1a2l5h1kcwvji112choltvk5i3t4uw6w8n11fb5pajvmn06e0db095ch60z1eqp4a44vwtvsq8zn59fpqrgqrfx0y9z7dgntf2fm3u46289eler',
                flowComponent: 'wixzwe3kwpv3md1jfoyo6ogby6shyuhy5vcb5bguno1r819loccru56iqihm474o0n1zlzp36n6q255f19e62upgxjnftxu7bzuhoc7a00pntb62dkvygi18x46d5jl0xkdmb4py0alen7a0vknnhi7ixv44na3l',
                flowInterfaceName: 'iml2e8rz1ktmcgixr72ncb2nb6m8xdvi0hlgv2zd767axmjlbjlatrks38xkqu7rklel6kc96pthg0intldktbgdgg2m3hg45i7n31vmrbl7t8vn3zqmat6v8vqjd3xsu5h6i8h6bz1ohiy2b83lpubekny5yz2l',
                flowInterfaceNamespace: '2oruq5t9jkidvg5ka7zn5fvrozcbmzh6diiqfye48d0w6kcszidflwgbqnf42f6akggiscgxo39ocxhafrepf7bvr3fxpfku5fb3ez66jajcsxqd54z1bltgas57hll1a7c5pzg43yz6ixzt6f7980ppl5ycfddj',
                version: '64usygk1noig6c9lh0fu',
                adapterType: 't0tecj3t0xx5kd4j1791uwuuzb83a927z7nc9m7nuavwcjrwx5b9eatsomrb',
                direction: 'SENDER',
                transportProtocol: '811bnx73xbnun7yeq9dxv1abnvxs7z8725a4syyb65c0qcpa7fyb7z7rqsfp',
                messageProtocol: 'mbya3a0ymhogbdn16giyuwdyr0mz2ur94u0gdq2tshwzy9474z5prbf37ua6',
                adapterEngineName: 'squ8eukzku3utia4nnqh671ivb24erm9a7u4qxnuq9unz8ykj8ulnqtzwmrcea122a534b0371rtl1ryipy5vyk4qhdu67z501mxnkgeh8t6buodr4gnq1mv7n81ra13kailmg1c9u4vuuwjsiduj9llzrvzwg72',
                url: 'j94evne0snt9bcv6ktdfe2xmd9d650fvbb7fqyqzg249aip6mjjbmjn37adkyj7d6l2swtzfy5wf104d6b00aaqgibldq54bj4ndrl67frsb9ltkwkmw3tolqkmx8ga8xwcnx0scgkajalo15ixl5q76m2pozcgtvy3skzor3a7l6l83dqlnwvg0zwq6b14hh18t9j2ka2uqhhmr3d90sh45gojtdo0o0rixb56v3arflkvjm6khciy0c9wbn5pbxe2zluxxhh99xfjpsnienaybkoycfddf8im3ynxta35zdnm560l1oss5b7ogeykb',
                username: 'l24iy80u9wpwiu4aco13q0154wlb07drvthz81g1bvwumukgfgkfatbjnxfc',
                remoteHost: '06430cah7u23jcn75pmsjk996hms6k72rueqpdh22z3pcjd8s3dxzsls8tlfmwypgjdla7o6qbdv6b07oelie4kwaumr9bnllqksfu7e2lfh9w8z74219c3nd4lk116ddhknw1iwjnrxfoow9abeb1eyt704sr5t',
                remotePort: 6230930528,
                directory: 'o3m1vs0xcjavfa4iraulb3oa5onxaab1nle8ro3c2axg9f7vii3a3t1dh91wgxxq2xf7j84x0jvdsd9oudyoeyt3o0992dj1z6xv7p198jgj1hmsxvt0995fh5xq2w5v2xzs5yaylx25x2mdcnoeq9t7uegojhqbhk72htuxvoqq0erepe9tuykg9yspxxere0hue2g7mestxiqrqepr44z2x0s5rd2jfflmitmo8xoghrfsq1mpc76pp7me223dsyu5l3h3xhhduyznqqgz0iwhf1yvd4p7k32911rpicw3d1u5cj2l9g40znblonudmfprt5ac9kicyf3ojevdkeys6qn3pm3ue0ldr70h4cn8ap0ybmhjbvro1i4r6klr3k2l0jqjn0298g1ktnozkstknqpttrbggcn3wqyfhchtpa2luysypulev9pae7lqbuktzgdkuqstrqxu6wt0kj6ru8i95cc6jokovp2kvwzoxfyofx5zmr0h7ralp5vz5xmn638idpu7ra8ghg6kji5o42c8z8w6e59xczsm54dls0mbdz367b4jwafedash8kzj2opb4je2emqof93qojad2wpu7yqdus24m75xdnwgyjx38qagh389xdc3z0qgkkicspbbdsgcr6487ogyvo7xt0r4shxxb9i5l1w3l9xifz4regsfbd5noivrzc9jq5l78qn3hbt899zkoxbt1vqmxx1fy73p1wsbowz1sx27gvopclj3h4fxsqz1vg59sd7z43tp8nmj1n1sqy4dwyyxe2q1330h8x6wlqyanahd4lkn6amgpahlj5rjibimirraq39xwt2jvgd8fba2melpirvdb0bl0ycazkede0n2n7ahvek1hux4spd5af4j4ksibrauhj3r9sswf53t29qm59j3edegq0tz795s5b539dhn2tmivluao5rcz8xo87tad2sa321avr8d0kbw7fqjrw4jpm23z6gmlrruwbwkttz5h3odkb4rznk6mxci',
                fileSchema: '67570aprncixv4afi2l9chqr43oal7s0il3uf6r9me3nduzx13ab6bvtm2nfvy4huiwcfgg9uel4fmuce7m0v0yky8hpawztjeshopojnlqa9caszz0q47fkz2u7oormudyvmqumfgzqb49ye5eudpk70hhidnm8pxvfm810lzio2fn1zvxxo5bienvk5vx205zjxpiw04vtpcjn8u7mx4i6v7otd7z4xbp7biqn86x0g10drh9ir010zxowt4gm67ivmqdw30gxpm19q7s0qehapyxeibd1i33zn0zxeskd5xy0stxunmvfsdi66kpwxo0sss8xe9yn1mmfk7wnslamyzue2zqmxiai6ycwyd5tzufbympld2klcfr737x8lofozrtmsywyrjkqc9dzndknajreoz7l3ta9gv6lf1n3s68oa89ego3hjhwrof719zynmmjpurfckwo91tymmis81645mt76reeo44hh7xulavclt4drbbbp293mcc7zp859izsbkueuu4vad52g7x4x1cjxn5v8qr1yclmfq0u0nyy0ujb4a9xg34cueghrqatp5pbf70u9ues111gsudz3ebtsixha9cso22yyj5a2ddo2t0cf2bxa5q89q2rrks81tu4bc66tpe499xjb6oh9x2brdso679r6x5kvxemklim2ebdwxnz1iz7wijpkuadzlhy3w1s10c8ym8uq3fgwyi87a3jp4lbr8pnoegivatj8i5n1ycg1nd0ywm12yoz3wcdzg10jd1o1xlpnndcinfsnraw993rv7o5hqsstotihyjnfwevpyvta2d42qn40ykt6oxwweww64yo42vvqr7pwr99tnfeiqyy8y6ypvb8h520ml01c4ee9l6dlz3whhyupvp9jcswp1oro32qnblnqopg8rd9p1e4jxo79j2hpl938rhi2q2hus0fo9og3ae4u9arlfsj9gdxhdlvl9e2kpo2xyrrvypmt7ufufnc49xt8eyfa7fsxl1ds',
                proxyHost: 'p9i23sqxjp4pxlzh9zk4g8jqp8xce1l25xqc89lwv6nk09ucr8qdcpnzty5q',
                proxyPort: 1070012945,
                destination: '5px84wxtec3sn0ub1d03mckt72f24ju2y5vrxi9phzj75tmqrxz5ldc54bo3obz8yxwszw147krrvtyz2l2p4zy5aia6urz9q0k5njepozcly958njq81s2g1p7o0i7h7y2iykbhk4s6gsowh9dd5mjeinysa1mk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qkxs5u1vm0sdwjkz0glyvz7w3q0phmfs2o8ofv5e7ysga1vqp196ulcka799n55yf708r71y5em8in5vdip09abqfjognn5kqbgpsgtc0bqa3bl81cz3km494klm9agsbzuqflz8c53lkcuslq95ch9y3o775gom',
                responsibleUserAccountName: 'ifqh1wgrzdoorjeg3fsd',
                lastChangeUserAccount: 'dun34ticvaenspufrmyu',
                lastChangedAt: '2020-07-29 08:19:59',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'f1ej8621b6f7i4x898rccobu967b3lpo1exylovz',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'mbnhbjnbwy2g63p0vofitirayvwykiy7699mlm8rryod8q69dp',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '47ljp0gw5rfxw2d43485',
                party: 'rvr00y51wtf4j2dutci9xeiyoev4c9d5qt3hmao8w6k8ej4en3d7o9jyw675ix4px0d91oxg9dhjf81k4miuveyx0bh874unwnz71icd19dditnjo1exwxu9ynjdrdzxk70rm6q1hmz77rclrwmhf9kl7bmepkix',
                component: 'rbweal0t3smh7o3lpjy6bzfei0taly8hxxg2i5bus6zs2eihjd6jisddo3rfajsut4xw000rl1hft7cjmmwatdkrb1jg39s17qn8v65f0erratzd5emyvnc2tlu46b4pp7jlb08dgxhczhs3a2tyhbsmsnste0op',
                name: '9kq5vnrpyqqwhn8xf6jnlstgutidqekikpfot4wh9ylxgqgchskcle0fcsp0icq2w1liyayuck7q0z1zh4vwte0uo37dkp5hlpsdvqxgk22y4zckz37z9ca0jh7lrsf83z520ebghmmz0g7501bpafh1vtwjxvti',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: null,
                flowComponent: '5hf6jhfbvyzed7h4tpiqvnsrd34stsocorpmeil4xb5tm8ei9ypyi2a2mt66g7xhf1gfa1i6ya5khmhr2qzc0yicxm1rpdbxsdf4m2jg1llvfpwa7rvfm58oorg3aq8wn9mcgl8a29xq8hzagxvijmp6ip2cjsb6',
                flowInterfaceName: 'pfc7e3x0kdtqeq6cmv1xklp18kiyyrcwwgwpvk702i8929o5vlouhr09b0zczq2w2djk44bvmaoe1uwrdw4izbe9osshlzr7of7s5yaacmoyihczhqo94owuy9tvfm7e1elkba6kiltutrcm42s9f04jf05zj2q1',
                flowInterfaceNamespace: '6dxtya18awf8m30jyraxqr8p7ue2aki4kwz6rabgfodwavpbk0ho4ijg443ysi0ee8mbi9b4kyj7g5c1gvh7g7b00wm40y3lnu6jvz32hldc6y8y3068fhkmto1lie00mjw3vxqcdvq7xj1en8jxij64bv2b4w5n',
                version: 'x2knall3lho3j9wohnjh',
                adapterType: 'bhppmeo274f9z7cy2gatk3ct0m1xurfkox2wpwjyrqgg78godg8256fiuoi4',
                direction: 'RECEIVER',
                transportProtocol: '92ozhrtiaj5it5kaks6z0u9i85w8rmykirrbmk9y4kp3z3usioivlaurdkjn',
                messageProtocol: 'vmodbxpunze0bg71qkh6j4nmchxijnabk7ql9dhgvb28wxl2p34yckzi22h1',
                adapterEngineName: 'i6dc23bz6lxun8tx3rnp9ex79ub5y2y8b2mpq5wq3fcz08eqpnne17rpx5mf7b3vkyi7me0m63mo3zu7037qawwy5ncm8yx7advrwz1cz06h1h3z2xg4o8qdp7vzn2g4k6ddw6ne4ls0prckbi85mr0uqspzywt2',
                url: 'yy4gadv0rzebh04ihzvxheo5xlgzx9swvlqtf75hb5rbrptjvs9rrtmxnkk9w0oyv9twcxwbsxhp0nrp3s0n3x5mxq3gteyf4ud01d9plfigzqfmzj8khjq2vtoy059i58fmr6fsem16y1xl38di62pt3xbuvbblpjpioz8fxji9cse1e0i0lpvry3cpju00vheftz6y0e4wlz9o74wksrnle9osv1cv2kphf4dfkcbk7ceoattzh5nrj235ch1dby2dhd6n40a8u70b025zv58ftny2vpt2wxjasf2kb13d7rne2nw473y3swo7t97k',
                username: '9wbvsx4480inm0hwzja0bj44f8f5420dimowbzhhg7j71ibjnodhngrua6xe',
                remoteHost: '4nmfl5qn8tbwu45266owt4rv7k72rzn0ht3q8brivg1p92q60u949jhkjrdrxa61ekzqp6yx5341lvgkh117hg5j5ycxkr113t82ntkat7n35wnkj4fx0esls371fjxxtsubo5x4ftybzjpusnpl4kn2z4anhh09',
                remotePort: 5196534905,
                directory: 'bhmb80z1wmn3z6jv3k9pl945rrdvfef2b5qr2gb4xguep6hqnz72hw6xdr8g65zsqycrbm0p7a0a8602u1488ti0ee5c201pfcwdrjap8ya2t0h0o1rb8bbpun2sohpve27lmia0851tltwissrpea8k80dlo5vjc68qut9tub4jhhcwo8343lhg5vkup8y8by2yk9pkmujt2s8szvs7m5z7nb7sr7rqwa85rval9vmn451iqt776w5p4ztugbfldxer8g9owz0qsln3oskiltvkb3ydtugs5ixvjbl065bbdyepsrydq1juwm5nxej7k5pm4brtv56nugpogpdv0vh4j8bbll9gtr9biq68s6fbmn3b4p6fvmflxp56qxp4nycxcxh05ckgm59hux5o62ifuaczqmp0q1kq553rythmjqifdnf1ys28bk7dg4oik9odln4q1ed2540nw5ombbmuidw8y9fkvrdc0zunge80ovinpmdxeyijb1vqi7q3r0fclx26r5fny6weg5e4po3he777o4xhr1wuu2w2olqqsm7qexgk9bqen7qatvi88ot5y6o9ksmamxdb6gk42bgxbur557y25sfze5y3iur942ui91zm9parinar6fdp3e46h0os1gtoqaugdnfhcjun4dxeob25zgydhyg42ihn6zc52pgrrj3m96qsxcy68p6ztbyytb0gitsx5dw0a1qh3pt73c1yd4jgv004nijqw3fpxjokpic11c4achujd45tpoc6uvjltuoz72kgk7dml5mjeilaoda12l0zx03w757fs5gja2n2658ctigs3mh5oobrv4khtx2iifjjwhlkmho1e3cbbdfop6k68skosg7xwz3gahg82633t67dn2nq39spxs9c5jb01wpa0m8ea372w5ke057moqarzr3ixzp11u5k69vla2hy07701za7rh86fy7ix1i824xl0kfsd0j59m5kur4nd92jassf0ovgvvwnebj9iiclc8jg',
                fileSchema: 'hzebim2y0lnbj5ez52zcnr8o44grppximp5dri483qdm2m9zu16t1crozf4i5931mm7j4vis1tdjm4znlqa9s1j2529s4uy5tm0nxsqdrlb9kkunhwro6ruj2nh1loen2bd0f63wlqrgt8k87vso0mh5spn9umpi1sie304hhqe9hur2akwld4wj6gv18jjw3ulxkodsthwynyrjaj9ekx3wfttbsrgq6aueuhkosy9bknlrt7jwzvy47et25i0a11fd9n6t3zk10ag6t7n7kd3kodsw1vwme6kn97jwj7ls2s2vajtv8ixyo5k415t54b2mptnlg4quth74vkzsuh25f28d2rm9py7im0lafhrgs6k6vy1v5akqt35jy538tv2n2pshn2ah2yk6rxzbsz51ajbb3cpafjehn3v10q8dnkrv0f0kwb07b7au0cn1cs0uc6yt1qq6mcrl2fpsx2y0r17lrvkkirxr39ueayhpdvidhh8ssz00r5eunho5bkgr6zi6hoqrn5tsxmqgow9wtujacar7ehg4ihkzijp7hd6oadiqz15ktui08j81ppaoc2p54iprfxqsstozy1lsr76wkxi95maun31ddi2bj5ehwyzs79uc3ga2hk44s86azq6xdqjm6dp6rf7000ux2v7qzbptzkjesrsaq89kdn419c1kja1dmq1xbnxvsusjal856qw992ar4jmhuup1dlwxtjgls8ovufb4z6lof0z0livwt2k4ho98imok2z29pjbnhabh4oezbm9kwoi9l750q1jb4x79xvds1tv68fk2ij8f1xyynxrpgc2r9t6qxli18zp7prtgzcjvbe8ijunrxo1781wizr6szmjytitqj4d0g8t3hafxtfyd7utrsafxd4iz26z3twq0z39jwdf8bp22ho1tmcw7ltj7o7nb5e1rs1chpq9vf0mj1ccptuo47mvp41hc865xtws58tydszlud9lxb41px5adngdpp2myyla7dfxohov7',
                proxyHost: 'nsl8c1y9iaets2rjynxn5jjtotgh4puhxttloe152udk9hms1kipctcexklt',
                proxyPort: 2819599402,
                destination: 'zg616dhmipcos09w4sea4hb9yxq5h3b17udayyc1d96k47yfs3owhjxpme29k0lipbd8gbzqr5ya5oyjeg6zl6d1j99f1n5nffzg9jvotzveb7feyugtyykd5s8gvihfyrq9937mk2ulropwi83kswytaqtb4mh5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6cxph5gmhtav27jeoc7a1nwchao76xgfoqpatbx8dd699fu0rpmzjelcwnp6ffwwreo912xnztbwmr2gat1cjfg8evsi9qzx652xk6jn452d9xd3wv3oncx8rtsaoal5ho8tgga58z75ru96bqlutubi0o6xdv1p',
                responsibleUserAccountName: 'rj6bg2ed13ao19tx6nf5',
                lastChangeUserAccount: 'pjht90i84zzr1h6je3i3',
                lastChangedAt: '2020-07-29 03:31:45',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '9ae40pn8vxkboszfz3dgft2k5ii4c9lbgqkcsynx',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'd9on3pmejf1v7kppau3t6xpz3lh6r334e24f1azarmkvp8sxmb',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'zy8jix7hrxzu2k0pc0sv',
                party: 'r8u4t6tcf8b1qhy87amxdbmorkq7rr64tbjanc5zjx6l0e8w4hyz07g3q5bh8ho5fpvctb644uy0850eggoee341mymp6ewb9of2xnumgive7ch8ngheng4fomahe9hq3jrm5crtql2j7jq1m56zlei2mn0jg2f5',
                component: '7b9zmczz3x65nqogp1i0d96vqulwg3y9a3ywd0xnu1oh374gwwbb8kf532k3e3mwwrxru1kzga5oy2iqff1m6tunearcj382xzelbv1b0y53kacx6et0jxillak0vc1wed45hmz11mqa02zkmjzrh6ym9r2q3g9j',
                name: '2ccjqs6m5t5paiipprivgb4s65ktakm1mef41ftpiicm3plpeynczaaiv1g4upakpqnsft0ijcs7vtj6t36rbls4omkxqusw5b7kikwnq3k7y7wmrojb0s7az9gv16iwrjjh3a2751gmv0947i1q1g1zd2bro3q6',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                
                flowComponent: 'bcmz4p9nez5v0v0d90yqpuzx83xksgjg2n5052b78iqxwpkrg71cs2lo7yn3thgjzn7xih1yy24ogbjynvjvbu28rtxwh9qd74w7o7ljkss6w7eys2lr2peahv9115pr4th5hxnvvzer8y3psiye0xvm6rs3085y',
                flowInterfaceName: '4jq70axh0tu4b7o9asd34ydmybi7t88w3adwq69eye059ugccyz7qg7jsepg6lsge42kz8j76uf18ca0onu19mzr6sotm001yc5t1feyjg90psdtg3r6zw860gwrmqgmauxeff0fjz26h9iy9hvhvgoquux0cbp7',
                flowInterfaceNamespace: 'zok806qnahq2h3q6zafuypd65lndnp6svrb3jb7l592xo19q68c3juvsmbteobqs0vifqh72nepdc0v9vfampt2o78vws7robsrhc7ts2lgo7iyaoibr4lxiy3kv6r4iv2uhv2dbo8d6qr0e4ic0achj1odu2po5',
                version: 'uanbswmvfy7g1vj3bxea',
                adapterType: '54yl0qf4blj775lkjceec4yyjmg7999gvi35zr8pv7hkrzsn6vexaml5k1ps',
                direction: 'SENDER',
                transportProtocol: 'y6zl7zl2g2vwt2s9fp05djw7vby5r28d1q09t572uz1gm091v5kovxrjlr5t',
                messageProtocol: 'cqk0rxdpov5lq0rc3543wrhsgc4ounneyb46tckr1fnph4vewobyts02z97v',
                adapterEngineName: '3nth4jp0w11f2o91xsovlkwozsr7fsmmmgz2sxz6vh2kbr5f3w3j1zg0xm4m93u7qoax634eoh61gw9ug1u3pymparau3clpyhhlt54juyjml6wsalpelasnez7m9ou1a5xrr3x7c99pms5lyqlroggm2y7g76wt',
                url: 'hkncdylcd7d8vahpglidhf9mg2cqgoc8xqq0n24yc6hw3z7kyhklckhuj6465ckziqw6rcobitcnuwsq940y0h7ukdwqj0hu8m6swgqi1uefw48z3wvmosrkmns5shs9g17fwgmc3x8kltu3eixjgufksuinosh273c8rzws2rhl57ubpsg2lsmdvxvf3rugl9chpufcq7achs6l15fc740mfcvndk5iq6o0ic2tud0e82zmaqc86axtlw76hg85hztvdvjsaar8nvssecugovia14jb6dj0dck2y4e2x0bveg2agg0kibiqu01jlu22',
                username: 'wx21pwyud79j9jay8ceu8elzhvb226ajy2dow1lmo4oq77yphr3vzm5u8ejv',
                remoteHost: '5sdz39c27p27a74bd3g3kszqqzyvbhgqez8yeuqq7uvyuhf8wny4d30o14gaj7exp3iarm3rce5a7o83ccmj5rxnzh2czzfuy4msogneukwgy2gpf33ioavxi2f8oo6utxx2ofes1ibupoh1wxwo0d9f2s9o2w6g',
                remotePort: 2590400061,
                directory: 'bvqpqcvk3rio6a8vko8l1hg24s70v7nspemykgp1b562vt3qb657rkzrsq3247i4wpgn7j0ahmt6se0lyn1g5lb931mf3qa5trlnb1ngf026apphpdv935zynx2ntv62c66cd965ma5y8bnmzoxjzhz4vzzh2ho3ypecwdgy5vl7xthm5tywxxysovyxrrjkaqfkoa5baxxizmsw00s1u813gjcgyxjsflfc2v2g0zd1uu8m0zmm1z9ybzdn79knsqgseapvr9hf52knrml0p0o431i77i308apqn9s9u0yhoa5yi6l02ec9xxal9c01ucutqavu2wv758685i8u5x7pagn24bwnuvhxmtt95q4sylusgfb39j6tewtkt77uz4ytrvnsymr8iej8yqoonojr8wdcqdmxi8bhhpq1g3loqy152kyg6d1y9nzqd1b7w4qkxcj54qu8x5e6t174xxav2br72jrot9wuf6a8viuekdg7dij71q4z21nekaoyw3bb4io2u6rom8vw59p1h17usevs4y091et787ggmnj9qugjmlj6ib8n8ojf79uzbayfzb1pv1k6chcfc07j0h9bahn2qarysjjo6t8mcl8a3qukkzhgt7j1279csiyj85f2fotlctyu8f1pnvdtllsjw0z1xzbw6j1ws7lac6zx4xarjpmclp4dr8rc90gm62z4ez7sqtjao2qb7lztbljqq0rg1pw9y9qynic0we0walr0iyc8i1hgcltfv4pmp9i9sdtyikb6gl31mv4hknalj3ndmau84gevv4hatyuncz4j74monsc3jsiijtyt0bttlmctepd0pkakwkf3tqslcyebsqmvxgfnpe4xoy00vlcpl37xau1fa7sy3ir5gz4slseocq6aa0ojac56yhqb6x3cekati6gm1597r5wn1m0bi60lkiyu0n0ml4oz8pwan5izuy0r6b2sq3xso29xwj6qjxnpfzj7fjnckt5ni5xln912btq8gpaqh2c1',
                fileSchema: '56ngaisqzyuyp45gyq7t1xxxovref1nqlkq57rvn7cihfdzxbeghwwnfxqemt0x22mpzvqnrv9qkjwswlx8pc4gkyargmq7sjxfkpplxh4resv3smemigvhtj4ru11iz3wlby7zvaxh3ilgtupsvaonv0omo7a7at5z22gazp522jsndg0zy82qywjzolje3l0cdf5puvqbodnnl92qov92ri34barp6xdmcnutmgnq55p9vwt5jrveo2weod46lu41co759zuf2axje2yp22bw5jym49dvpejxfgi7y0p8pdgbs6egxsbvibskmj57oew4ovgi6ka8bkrxvwattd98up3o38tetd08tuz1uawtkscrl29m9m3sdx4060c3mnawsjslqt61oa4ysrma0ld3oprjyfdzxuvh9d25n5i0l8k0br8gc0a0lle386lzi1tdw5j0jn16syb42rb8gqnon636so20q8kct88c6o1q214s4sw5c92mniiko4z7nsis60mk1xmoz2ps15u7qzgif3tuuevphisu7tzr5zikdgwt07crvmf1kq4tw54bb610ygl76emaoyi1k7p29vmkne8h3mu9ampnatmct9cmsjnip5c1nu612qjvtq34oda0eguprdgx2ari8qamiqs65kwmjt1xi9ue2wxj1lza6j8bp9pp2edugh5l7nuwh2aq8r9b35xv96izc5pzhklvcn6y5195wod3z0ue39t0eh1pj469nxm9vvurrxu5a6my6s1ss4jwvi8nhucmmx4kj49vmsuv0dst7x4086hixmdlcl7hzesu2fhilo7p90xov8ilsniqi2qs0yentkac690d4rcl8n0qzugh05kbghf8g5bmfb8sx78rmebf81pepg00cd978a3zkhedq5ynssmfvf2t8lyv1ppsenjw2ylqa0vffrr0ffdnn0rxo6dwpbanme707wx4c5krl8linnmn6qduv5roilvw2d19xvxsbt2eqffqmpkj9rlsd',
                proxyHost: '3deov9flxd3khwfs880v9d0bw6u1ob8hal6olftq6q4l8y97sdodyykbm025',
                proxyPort: 1253092187,
                destination: '2h9e79tj882416hitv1okbmgz1ke1eh92y6kghp58ms6y16bxb851runbudd9hc3d1o34tijsxolb5lnt0q15beh8irhdshavwpvcj15hi0w64egcfuo61yc67cq28eaxxe3f45h03ivvdwluu9a802k2xe3aldt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'etxpxl9f6xgha76csi92mkvk3j8634ss0x2mie8iz90qlymtmdpp8wscis81jm9d4zw6qepm1xwnlytlxx9g826l9y2b7e566g4fj3cfexe1eooozg0zw1878jrlfbszi5rm5fal5n85c5ig3cgggxya8atdewhe',
                responsibleUserAccountName: 'xu535pv1n9z0wsbggunu',
                lastChangeUserAccount: 'jdeklfs5sdrcdv8poces',
                lastChangedAt: '2020-07-29 02:31:44',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'lx08fzk37o7qg14xphuxf4vo83prkdxen8bvocp8',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 't09a525ej5zxxpfao4rxl8lvithsv2xftc2vrm705vzpw9fex2',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '5z9t5dv3wqkc8vxsoc08',
                party: 'eltkykcrz55qdgmfegvcovmfjbniai1apmee228mq6hx9keykopnae6e4u5bntclyn359c5r26z01f0esbjhyqbj32z648d5qxz1s9166ilr3jx0c10jli03b55p9d0f6rj49tjld72tfqxp6qq8b28ylda5dd8p',
                component: 'x39eqjj0nubgv8bsmmzuxt9chlblgjg3w4jhnirae5z7fbhkk0ygna2o7896tzcpzp1t3j8bk06mk2at3kj4oi7b87oxlzzoyeqepge79q144t6sdgvvh8muz7lfn23ljd202vgkxzkbqcwmc84ij13rlkuhhr1l',
                name: '5tkaqfvbx7uzo7jmwpf4ct9a3niza2wxpfudrrqu4mp0bcdal67b3cmfqr71lve0apbql6jqs2tes37tbw6ejhb58jiryqp8iyeakj5ttm3erhr9rb2s89ls0px4lzwx4u6ozl3qkzw3pvehzf1okk57mevl68hq',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'zzf5o5tsvmxq4rz2ntbhuyv7lovxmvwpvx0p5rqw4et1p1whh0ycalt21p6sb06ueukd1u0imdg3jwrgeuefi5o721nh4qykvj1k5dvbxej6jubn4c8ex3l55y3syfj2vw9nbzvb81c94nky3yer8bbg5zcq236r',
                flowComponent: null,
                flowInterfaceName: 'hbgcdvmrnsexjwykpzxvkdcmi735yrz5ezu9k9pu6jijl9dk99f7frllvypaeyi2exbfybcfd0c3pepiou3l1m2pm550yxddt5t9q2s5pl9505min21ibrvo5jhn4qajyd5ds4qzgjjvt5yeuxav8ic4ateliw5r',
                flowInterfaceNamespace: 'twdh4avpk8copl564fnjdis1x58o6hykdr78sjtt7apmb3qlx0m3vpkde4s21dvzui2uht8tib91k428bh52ua648jxblwpcn9p5keyktng81w6a1rx8vbmwefelq5z5undpmjoh2t4sbb81ft89ldylsy3rugz9',
                version: '5w3n5i4jqacvjhnpehp4',
                adapterType: '9khaccbco5zel7lpnc4gue0yvsfnehikttnjrhydhg1m2wfe0d8i64yqrbx2',
                direction: 'RECEIVER',
                transportProtocol: 'swkxioqkpvio29d88bz101i0hn4pwl55dxj53bhxvt6an1fvryqbaoge9kpl',
                messageProtocol: 'h4q43bte1qlgobdg1g5xh8gr9x31afee4ulrsl7btd2o92yoqh8slongvbur',
                adapterEngineName: 'tl9r19ho0fmb1sngi3738pi73bfshgws6wftghbqxacinmrwo31czm362t8qzchzcehhkwfspqocac4navvsl0wu3p0487z5izg1di6h63n4u5xad3qxqndqvf19rautzdishdzchd365dlpos8tkpxlexbxenv4',
                url: 'ik5a5j64hr1ct72epd3msxf5vok6eionl9y86ywgtw4oa3fxj6ujr8g979r2my9afcowzqf27w6kbq1gt9bukmlckwxi5bg1xyqoth4rcf0ahm00aj9rq6eogniod3c0gyl77ipec14xoz1lxcy8j2yjpgziexpg9zaryl7uplsnsc4qo4m0n3enjm929j1vcw2jzeafgsgt9jbcmauog65vwol3j1q9z9t7vpkvg8rpm8i2bl682kfsjbid475116p3nx24j3bnbnqjb5eez4efhghl7hu2pj50pig2nzpngm5b1d9k7spwzzrwgv9b',
                username: 'b5ix7a0hnqqjfo5kd1ldqzopw3aby1kkhkuwendobknwus03rtujn0l4hevf',
                remoteHost: '1yxbn09xaigbmejx7wgp6dpbtwrsb52fks56nc26st27ru2qig3c72jrheeb4t6ghyupzue2wlai8srirkdnhq8bq4tkcliq4b2ha9daq6dj1f2h6t0zyx7nowoldn9mi4tocll2j74jaepjqpvw6og8abje4o3y',
                remotePort: 2670951739,
                directory: 'iw03av0njq5ljj0t2gmycitazu3a1okze950bkgu60ry8bmp6g9aqbrb0biwjzufvzexknpl7zcdk5zq3axxkvzqg831jmygr561vcm0a07qsosem9gp0q4t74thhbsjei2y4mrr3gy81vm33p5zy56grxh2kda1gg21yrthmoyhboxj2z1cvet9nzx1c2bfm46zonfg02qh09t0g1iodgz8gr2psk13rjgcmcnn1v9totr0uovgmk4gpab2aics9nmezoizcwtlxh2kf3o7b04fy7yzvqbrrekz3zqnv8b8o4gis4enzf1qbhqg2wme9xs4z5plzjtwbezfak1baceheop5rym7n0vf9qjya7bi3t9272hwzkec91gjbej4es0ablhibg2qqjzjvq1ny4tgxasxvs1nxlsx2cflf2vhl6dqpfg2dblnifa1ws84jia4nz1qaylfngh0umiot25dqi7tea0sipyzc9glozvg94cnsooerxjb8kkhl6i8o4xrubdx06u1h0i33tktkerc8r952ebpu5g684a73bwmmnzdfrl0fyo4l43yu1usv76b3eocgk6cjwky97x4sse0wkbv3a2dk7tvxkwvx9nq0nll9cahc1tvtbh176mhxm3pxy8o9sw3svafbnk6qjq971jfb4898hc2daqmdaasc0ippni1byqqdj2k28odycljppf0kkyi365clq730l5wqim6ipdh0xdpqoz1b47r5pv58b6qic56x7dnc46pqf6hxf7jfmi4oamjq1bnv4f4dtx165feha3oridcwzw17f41l6nai7dxithnxw2av27f8fj5zht4haza9yk5mopdzaes300iekwj149p11u0e2etbc4t14jzdxkt4e629ay7npzu0u5uidilqs2elcpdjhzvagiwsch21xrv6jgu03z9491ylemqgwq1npt7p8qxbrv2f20olo1sxj5rhrcdn8md9suqlpvlrquktexm3rcknez9ggg0x9jk9meo',
                fileSchema: '37hfqexbbf6xzb5qimsem0gl559b816tj6natbw0chum9gfcbnv2uayrq4md4rh4g2v1i14f2l8fm8kg4628wpw2lhezm3g8juwarlrbqw5a8o6yu768tc092d2dfpwhianuxniok0vrp5qlkwaw90z3jk1eizkx3eh6kh6ii6ymvb35f5qfvywe68f42mzdfefa49tzo14zk6p72r7eh6n6wpy0ac4v6ic2ibhe4bk316kco70vl2nf50bnxattgw2xz4oisnkxita0qzljpxu3tpn1bcaqql1zh1zmkarydomj27uzrfodazrgva45mcoqlrpz41dc8805h272eyk8u3zy1fbqb6i4nfoigsx5e64ftsi6oinembiwgyb33gson0xmjvha3gkqgles6oylkv3stv12zoy9ojnq2cgh54zztlndzbfo9dyuaivyvbkfl819lv6rbfgrqjmqghp90cwmn2h5el5rym2jrxfn2gka05ywx6gvx0kwgom2xnskmnizxsrwaw53v4nanqisft5td2febjv1euimyxgfhthadc1bbwgvke0kpmcp7b4axgaqh5ilgc1sgv3dc3dj1nskjb6zxwj488wznua72ogb17u202e2zmd44fadtp722d5pakn9z0t6aeg7w84p8v4gjv2141l5lanzzamqb4qvm4bxbw31699f6417rmiqz5z2ml9rv1hp1p1hg11d8frp09u9z78z81auon2cyp1hpezs5y1tc9ivztixgmlbynz0k8pj40cswslf92ri2hbekxw1h6ye6tqvw8ashu4txhhy2pxk5v1p01l3s7jt33e9n615ej7lz9y1tvrnx54q248bbrv6onienmwln7npc0462epgopy9wmnpi4amawa6e87ce3jtuqxble9u3gbz73e81201xvunv4py6vzkqsf6wj9k2njx0d16w9o2yqsvh0dfuu1j6akfwgaz0f31h5jnk1txxikfdqphsjdxbkikavafqimr91n2',
                proxyHost: '2d0ko13k42mk1p1w3iov2bdrh9zpicciyup8hrj95owb2uyseeqzv13c27z1',
                proxyPort: 7686655810,
                destination: 'dfstctnytukhxnwmpxuvamjuhnhmm331gnq508mh496rfl15cv2cxzu2p65pwygcxmd77ntvakgtqfoys2fjde5ryg8ngln8etsvxrly7g6eog18pasxudvs4vmd7uj06u8a0l6pqtdn0nj5ismrk0kjdyyvkmdc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7mdftsqkorsmeywpo6126st12s996wnb8zqbzzlzixyeongjprhy2jjd7krm0q07uwsx3irbwzt4aj994x8f49bph3yjkscvode4a3emywebyqq8uhonscov0n3au5alkhodsg1tln7vt4tfc3l2i250az3jdmnb',
                responsibleUserAccountName: 'sdyy9trlpfffrix4bjha',
                lastChangeUserAccount: 'z4jzscconb26za1hsrtf',
                lastChangedAt: '2020-07-29 01:36:27',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'qbj5i31mbv94um412eh9zp6c83cfe3n5xknz97tt',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'n2w6qkqxavyd2r0lzulocd0dn1zckspfhppc2xp1w2mraemohg',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'vaapc5pjw9iabv6nmx6h',
                party: 'utmdq3wli25x05vspt2tjjmn0hnvjj9oiijeaawssatdn0qwtk97yjh5mpbzdhgx2kmm42bl6nq9ashicrj8vnrbgms5s29ez1pu8l8izqapwl448ijlbyvzwldq1ewlo5ocwrddmqp2mqkdfoe7xuqto0g41iel',
                component: 'w6wnbe9se67bha2cce9tpm4gv8d01k4gwoi44dqo94jjp15iok4kid2253dbcr2b3hi4lnx8rhvv4xckajz740llptee909fqer138ek526ffhjg85xjspipbhgr9816rwnkqgpvt3gb681b7s1z5exq89ywmjjw',
                name: '8f64e1gazxrmk75dxm5iz0jh4vbl4fxuvpn47jhih5rwccopk9hwbfeq4mv0w3orvbrugn9xxbpttq71pmunjqs3yrivn3r5wgt34nthfh9ppw7mgu8npl9oq3cwou7ae3zce2mwdcmt7hc5zqnbmc00hvs2exm7',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'sr71q7rpe853ppix6lr57izbwi08r8h94vjrselqfpi66gbtlf2c9nu8nfvrccuugag7m1cxcefwrkw4r3b9s896nh9zwwnzk1sh70ulnw8hsh2mecumcmwd3cjkop8g0e64g51m04d9d9edrw66cmfueyqx1886',
                
                flowInterfaceName: '3ohrdetxw82ssqaxs9ity6pn6k4uj634thpedcfxjhk4f6ny6hj3c0bt0ik213xyqpv5ilkl3ljcxxhus44iljsyb7249yl6u4l5peeo0apebgjetzbm84eeya15m9j4p46ejug1766crmiuqp13zkbgyre5j5va',
                flowInterfaceNamespace: 'sp7cj23aopke320ypj0c4nyipl21un4kfdxue5uq12jk7qoizk6g2dex7m496a1p88d1bib2y13naldue8fm23ad35j7lw6pdkvpqc4fuuxevmhsps6cnak4xwo8xojqmquh3ylbe2nn5vtn60ik7p8h4rbve0jd',
                version: 'sko0vbses1a1d8kavzbn',
                adapterType: 'njdi273wq46ml76gkcvyyds8cvbgvbtvj1q1plvlw09d28stj1x0yg0wgmek',
                direction: 'RECEIVER',
                transportProtocol: '9o72m7wovh6d53c9uclhfunb0lul94q4xymhydzyxbvqmykfmdnur378rn3x',
                messageProtocol: 'kf346b8hdrmic3tlvkwmn1rc6nj6pvd6wy1h5qifb6tl3ocht5x40kof0kr0',
                adapterEngineName: 'y2fv929a1btbhyaxdwtatx97mgnfwpk2g8b91gwj744m7iau5pif99tfbb1ec39vj6lch77ywov5pv0d020jcd2nkctvrv7y58tw5r74o8dd6qxr7w5v1ojcbfkcdg52lzlfld3v7l1cyudyu07495o50b1dmmnh',
                url: '9fkigaf9q5h202d98jmrcpiba4xodaruiezxsbo5tkwqvacshfugtarvcjdsncmzuexk77my1clq3ndvaywcgpq9p4a12hme8qs88hst7hgrs55htspfq1ld66ho4nrkswt72klp6npbilrnasjiopdw69cqkanxpa7inp9za30yth5ozhktc1531pc44dhoyef0mimbr8uec3gtg72n7drq47grhrj66tc1dx0pgxvl09n8x9t6h90l5y6bgtxllq6l07ergrpxbtn7twcfh0na4fvt8qusvwzvx73dbp0poeihd0qaq5m30b18tok5',
                username: 'o5y54j4wovkhr4brfzdw8ordpagj5861shuyo6ufyuuvlnxy2jk0kr399e16',
                remoteHost: 'jv11zvfrhr49q2xrjyk7jh8ebxzl5g99774j5y4y76xe9gk8ao3xsbt5n28sl9to4r1i97iv7r6368awdbf6ugmjmro5zffi261p8126he5wbe3m9jkm9h9adcg5z4i226eqxiw5tv5za630946j8zh1j1l2ejd2',
                remotePort: 7449842970,
                directory: 'yx6lc8dz91l0gww655n0xl11gty03sit5kjwlagqx0k3snff3mhqhjpk8ehggug63q085i7w9ae7z62t2omh8pt3bubgqi8yrfiqly2okq7n1s0dgeix0zckyoedlwwsbxymv38ub8n2a3ez788qlmrrc7jf67mnv8lg25wnv2jylh2jmxj80cjifrrd5wcme8oeex45pvryrgi5alelpr8bqrr35qdtnjtqokcillorxotofvddghw6i2vmpy442urjr58ne5j1023g3u3nwrnik869wok1np194pzvdszpzec1hg1a39b2pm4fgterlt24758vwtkglj60dtgz3q0kflj3xjdnbqn54m9w1us390i5qelylnzlb5jf5bx7ykk7x55knrqtbmguw3vr03h6hqg2wu4wewhf4blcv9hpgks5s52atb337vuhzkxqyg00ka76lkrkkuh18vjuh5rsd1j26xb377opnj2vjlyq2of3g5je9z1o2rgpfpmkspyppvd6g6macj2j6e2ak9ohqen4uckwcrwkgsknzhel6ysn2p7xglcgpqm709wy9jb46rhdmlq57jjtnmtxrf8r4sid9oaelqx6sf36upzb3k3jj4zbexujpbznv7h0v756m6m0f6zjf1esp7xgm4c9yv41zwrhgz8wzsroajwpkwd9br911dyukau8ozar45cakg800akcqyh5enjaad5498wr1gye1ski5csa68bpmz2v5cmttqjbatt1mytqpajzvtjs57lss7ncz9f87szkztht5ckbvbxxzp17lmmtw3nhcf94ry4zjts4a6awk7tq3sizts688k2ll4w1n34d0dli4onw1v2kxy1zwh0bn7glrmoame2gsnv4a6ukdwhmbvvuj6cl2j0wlt1qvx8pjurv13lsop4vcjfwx9qbgc3l2gpy7vx6mtukblbqege7anxvo2ke2a8t0y9kten42hfw8uqwuj82btzq1e6x6cl7oothd9rg94gzqg02',
                fileSchema: 'ps93ljytwtwi5mylmyq2k29ckikqos6xu5dog476a3ipxtq95uas5p5ulq23z5ysjwjnad4tlqcvq2fmteo5jhisl8d6rabqs0qu2668xolmt6ap8kcj5rgdwwfv8blh7k35k6xmezetrips20xbhepu40jjgiikhghl6j7nin7ew1a0v2q1azs0tasoq01wk1dyw8xbang4c3yw4v0qmr8k80hru5cijckjbhty9byrd4vh3ah6u4x86q415uwwno4o4a9118qht10r1k85kau0hgee88o37n2zlp2r4hscml0unyk4ma4cmicwtprunc9vh228uyce44lthh3lmvkr1y2n73rdglchvxvsuy72hy309qbosg98qn3yruzlqxue0nzakmy058586wbngiaz986qqzrwhrs8m9lxzr4e594orfmq8gn5e3aq83onfth3zxobfqew3q4j356g64cat6f4ptd7qioceeb8885ntl2mg5lwt20vtagegptp8aum8e2tm87mbfixzyh01ikmxun41miam6167eg4xu0x4t6qroqrpdjn2glmquobewvegl59opqr3qr0ty5n1juj2b3c0llvf5bbuj26mec91w4f87adfhtv8dou9rwdy5k5g4nbkdgqlfq0qyjpucspzdxxgcz9zy6705qvkdjuvsx0g9aorc0kl2252zpzpndy1ds8l8v073edi5c2h5n9nqa19sj5x0yihw7c5q2g7kiolern00sr5wj96i216q6zhqiao0fxfoxnog30lld4j5xytm6hpqbc7bvxhqsk1njj2rkcwj2y0afwje13ia9t63q32dudog48py8u8u1905dcowcxk0qf9sf8gdpt8xtqsd7p0j2t78khr1oxtj1cv939ar3l6t2syzkt5uoxvex1glbentp51tc6r6m84m9npry7ujfvrlyy4tqufo62rp3gf2w2ny8b6jlfuxfc4m0ttznrgi24wf1p5v10k564phsqteozyxmzpaz6',
                proxyHost: '50q5romqd57243xfheo3qqi0mllyw1mbnmgxe4az1pq245jnwqbez3qadcf2',
                proxyPort: 9385633773,
                destination: 'taucm1dexlvw8wr1s934ydtt3uqyvy3bsfqjwtctdz7xintizzy4nhd1nkwqit62nhskvtqai4waulb60y1hp71ftjjf6djzeduxn2h49kzll4jaskwwwtv87vrujmr6xzcruv2108ab1pc1p3kinxmt34e34bad',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hxpx7jfy63rzybghrdjczd4qp4i40jnrp5b6i2798azzngzzzpw5vyrbperhgqd1r8dnioa5o2up4c40pkc4wohi2l8z1t69hi17g90n6ds5rnmxlms7xgbjgpo0v2v112wd17rjjuzgo9wld47iz3ecra3q8dok',
                responsibleUserAccountName: '3se8q89r0c31yxzn7bcv',
                lastChangeUserAccount: 'n4qk7afvse1zjz35zzz7',
                lastChangedAt: '2020-07-29 05:00:56',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '5sb93gpzgguhlo4k1wg25d85x0hkqbc2eab789y8',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '6v0bg2htr5o6f15ai1b12w7lgjpzxhdrflvwfegtckoxwbif1h',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '0hxz7lcbcwsbe44uwi6q',
                party: 'hslzqoed3zc329hwa6ggjhdg68f2rg5w9x23lomzop7xo4bbh2twcen4qquswn7p928s1kcmhqw0s32j7x5j6os6d9tj9gtg6paxu6799v27cdzde6238wrm5q00he5ceskmo3s031coa7jlewgtbjimzswvirjz',
                component: 'ydhporg41uszqxzyqcpcg7oyn17lqi52f2cjzvsk0ysyhikmf219ilm8sknmlf01u68ui1xgai3hxgieef6fu0wt8d8algh64ubs9z9nsi09zsef7gm0y7yep57gvpkhcexgdg8hnl5arh0k2lxdivbhuvr7r7z8',
                name: 'tqz5uskof3zsbsgwx4m2tqbly08yiwzu8vbf0mbcy0363t0ic7y4agrcee8bu0e7tvr4cevd8jbouxzliyij1km4zoryx9gmrvk96rcn9970qqfsqowyrvmzxhbcnc0zv1bmpu6iw9lne03pgy76aow2ew6wf1dh',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'frofj8jdg7t5iq06wgntbs0vtel9n7zsjz67ho8lhj981pvl0bedonzhn8k1bsf6xlnrl7xbs5fncenbh46uezhoh82q3snwbfccqhg536ye0xgt0ti88pafuocplolsrx3rc2zr27qeq6u20shpwo0px095yh2n',
                flowComponent: 'ii4b3p5laq3c4z5r4al5mw9e2v09buq33o0ilf33xacp02mxyl50k0v0rxe9ecgenudaleg7hxoy7jqlo8wvpt3upiel0urnod5jlrc09ba7bzw5rf0pkgd0felm8k6p3fyiw6o7jl80dht42jatzeicvdqb19qz',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'yj65lz5gpuozy799kw2sngywrauy0hy8n7q6lshkii36602vrpvyiledv51qt80ah0f4bj5q5gozk0m2xgsv9qek12d89i9o3edsqf1xievul7bcbb7nwpphjgk7xvpgpm3oqz5jwmcacofrii6e0ptk97npfho2',
                version: '4w2514yprss76sv62zrp',
                adapterType: '2ghdm44kwylhv6l75ui9trhpmxy5oxujr9iu2sxxbafe276atlaigvzvvn7n',
                direction: 'SENDER',
                transportProtocol: '4y7udyhcg6a6vxtv41sz29rp494o8pnxvh7lru1vg8agpqwe5s3n6yr0i7se',
                messageProtocol: 'svq8mhrq0uxzu7m9t8jtdjl9nxkkeh4dtqqy8obbs668pdx2ylnl04gac0uv',
                adapterEngineName: 'hfucs5a7qtpz5s9v9pjqbg80a259u89jg8ljhaw6fu24yq88egjq30iash2ctwma53az05xivlze6g78r99d3n3y85fspvylxt7bxabisobon05svvv0t8jl57f5kd4mhb5iwmuwpqywtkomcyej0w7c5veai4fs',
                url: 'koxaxvyy7mx0wufqwa48c74d30hy3k77ht79f6vqj7huhyg8w89x3xypvuaswrkfctpb41nbpe2y3a9pmyvc19c6io93v6ncpdsy8hf01ph1uhfdqf9fzy8vx8bvwudyzfr6sgo3y6l2g1lthhld28igwlu7dzrjjnvdv8onlaw5uxkqtvlj4kk5lgpiyxar7psvfxij2onmr7m8mq4al8hwuamkox58209ga0zapxz09uou5w1fvq9x17yzbfkv5rizdv928brct6k6vhaggbxgpfa3ni3fhmg4rcvvpsh5bowwlgk7ws9bprvhehqo',
                username: 'm8tn9kysdrd6dsat4t71zvakss218zs5mtiqydsz1bj5ysqozlcwp87o6h6s',
                remoteHost: 'whi7nnbs4nd25s2n1c0dwwcuqh4qo56a3je9p6nl7xx8hlot3n9nubez8cv21heuzilu556sd7mj46aemvpm4rk99a2lw2hgxllaixgm15xz5oiw26ityzgpmbmlozq9iczkiu9z119lyukzj1o42u6nz7pgro8m',
                remotePort: 6323033575,
                directory: '07ghvgynlmmqo0zsd9otzre207r0pkkkkz9k1r8k0g01ljzf8vwweie4w5h4kb9clowmaaw3j3whie4to3matuiboagpcdifi2ybqm5mw21b5qtf1k00lurdo9m492du1h3nhio45cao6a0z060x083nxtcw60uj0v9yok51xpl60q1igkyp56m6docrv86c5gu0tcrar2jjw1cydo904tor766w81j0utpbom0v0m5dx481rd7li6xhs7k13zbzmi8zcrdwamns91oh8arqdhxru5z9qkrrqddf55paz3zpahpu5g2z47d44chvly394ly8thbwkntep3dhgbs834x6zpdn6447q45ak92aigcsihywfgxt6x5l4b0iidk65q85gg6hsih9ki4mlwu1bv3d7rztd90em4p6zyponr7fwe2v6lspra6nemp7lcizxbklt3snta5tyqti1qi110fe8dny5pwsdux2wl5y3amxcwto9i4lpl2zly0bdon0tvts32kau9g3d14bda3vrstm4tew4aww9wr4cdyosxng0vvfyogi2ggyc8mmlo0kddge6hsgngfkfhnq7wercpf3gxw9c2ba73gn2tef8f9d3ccghmoztwyzaqej7m5t1g5n5n3abzy6d74dnxbxgjvhfnog4z1epxk4o1k70vpcps9qnz5kjly7z2irn8yfehnbk5zrdzi2q113dgbsdudc7ffc5gxgz2go48aewbscx3ugtheclca0ftbcqi89uomegm820suhiefe47hy9ccq5lqvswxj7r2oe76ef0k5be4a0eu0ds4cl5d7en772uqdlfh9lxf9rv3s9ftjvbq3mm2zionq82v0nr6snv5e8anbkb2omy1zilk1nve65qbpdr7qs18qbdya32di9le5kdxyda1u1hbj4akjulp9nribvu9uwztcynvk8yfnb9s6d62fv1vsnwbi2lnk7fhbanye9g9x9ykgkrrhhy7usn9mounogkaa42nzao6g',
                fileSchema: 'wl80fn3j2jd82ka3nih3jkxsjxntdy7xtv5fy91icgd10isl6prhmsqob2jfb0w3gn808vo7273sdo7fu1sj1ue6evgh17mko2hmzyz21qxvchm8fmy1psfkjoyazzbsywufai5lfo3kvo4z4a4s21q4m23gevla5bz0nyaepe7qvp4xfezlih73fe6u8oxozzna4u9qknyet0qrg1sqyywsuvzfuksxp768znaey05shwfdvef0106802dp10exsgxeronencgjzagy4jpb9zm2ggi30qi8lxm33bcu1lirz4139sf2wutgi3z2irh5za9rus60ugbgu5dygf0whppwv23q57o9b7kj4rlo0bvxrv67jkr8jacomjmfnlyv95hm5ug07ecjj0qnyekq1vqww9fmwxkbw233air4e82t9dshfr7cc90n2bqmt9bfben61u48f9g8672vlp8co3r64rzfqo9kf09cj9bj5y2bm6wr51p9gyxsetllmyjua77ni7q3tlp29w5rz2prbt2aveylyxovye6xuxxl7lzxsw9h3kwpd7dg96crqgi58f82pj6lnd6525aj09tlovgvtye27amb13w0axkr4w4o4v0t1ne4xt91rgaonbmozy9o2w8by8tc0wjx0wks5gdmaw2ydib9b7ab606qx3ny34oeigc8kqvexcpkgk8r0xsuwqckuq30b1rrhqm68kns39kwdn4ruzxeyz4h25241w427o21gohuoukbe9kd8fqj3pa214zxemljjxrvdr59t9cjyws8jz1pnb6sb95gpy80jjerh4wk3wzcchyzfl51ef5t0mkzj5xkbc2zy0vv36p56tw0pgamyp3bmhk1l4fo68g08pzx12lyrzlfkwyoxspyq32r2qqjxofv3l3rp7rtjf2x5lx48c439cyohyyr1ag7gt5cxdgephp8vtq6cx0xvg2s23uryqyrujl9je10e1fgiy0j15w50845i6c8vlwe72yv62wtktgi',
                proxyHost: 'i3nciclm14o7th2q61eq3fvmt5spdat5wqs9tsk5s703oyf16s5mr6nl2c9t',
                proxyPort: 9636196386,
                destination: 'p9k1u9e5879k97aiv92hf1ggd6zckb0joxray3t8s3387a3ryh7a8latq9s8x1bu7avgtgltc8u144ug9n8vpga1w2eolkopzpw0bfya58n8zw1dash87idqgwamfrir8lap494twyb44e9yr3vvocqrnm1u5qys',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rgp4wsxxfb11rx0pckmawlqrlzppaxvx327not44b2woffj9r2qgtr66wct94lnab41erh7fej3w8ysdweusrmram2u31zfzu0euboyunaqu6k09fsfnp30ea5ls6l6b1yg5pv68416f1fa1zj8zbdgp07cadz4y',
                responsibleUserAccountName: 'th0r9p6vaszylcj2jr4c',
                lastChangeUserAccount: 'lmgn3183uwuhjz98x5sy',
                lastChangedAt: '2020-07-29 10:45:16',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'vh62wqyn3i5di33vz9t583pfb13z82qqsbkfbq73',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'l7e1nyjr1cj8eola2ghem467huqdvzxnkmwimnjr0qm24gwwj9',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '7q46t41sq7g013pogkw7',
                party: '4cycyh1ucynlexfilx45cofwtejshxoqrfqaelj1uf19vs66nwynz5v9z8w9prddb62xs4f53hxxj0nwctwg2i5d98cmvxxbn4pfqe3ce6ovj517i1fhqyo3vqebjfgfc0hlp0b5lyvj97fsy68so59xypil49l9',
                component: '1z8g496kyg7fzserg1asuwsqjp77944wx18zz31ap2rfv2s0dc8jhf3w9xwhhcofstp034h7rrmuhrqraus74b4p4inwshj0cqar0q6x7t2jwcss73c79u7f5pw5xbb7ewugzjj7p0qzz10v1dk1zep6cgieb1up',
                name: 'sbj0b1fkk0bv38xma3it04bfdnodfxq7ad8cc16bu2dft5o7edxyqhlm2n1evh9arq4jufv2borqmjtsd254x8w33kg1rb6zd53jox5q3yatkmurqnho6ckzwdmvglkgir2bww74mjsqy3smahr17qu3afylgyly',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '4yzlfl0ihotaezzmazbje03gsoa0qvgw29jnmcxbtlsu2ws4ty2qgys3auku88qpsh1ox2z7zbkh8yh24fjdht5msyoh4ezoyma5noid1assm6vqnid9irca5axvbb12n6y0i0rdeqstovg3xggdcef8irofkdd4',
                flowComponent: 'kn1kujb1fav6xqog3u4mp7mzpe1uar4xcj2e4hzu2bk0hafrndwhx1hiptcxr5vxgitnapiwf6d6g21zrpmf0m4xh763w0tlny2vah80nqiuriqzdrkn1e0s4gtavx3bnxp9oqwnft89avnb2jd5ql1ldgggq56f',
                
                flowInterfaceNamespace: 'yrb5uvf9b11etl8wovnmukn5igl7m511sgj7ty5d41jdmo0odiv49y50r7xryn32jpu57303vlwhw71i9itzb7p2tj8zzr50wy1t7ae15b3f1yndobuxphacwyo1ig4gqcli07oo3waxr7e42qhnq744znt2xqcz',
                version: 'bzb3kvn90nt0r6iesh3g',
                adapterType: '0ofwf031h7wu3juv4got4v2vwk4xv3zctxmy31fy7saz14aqak6utawsjjhe',
                direction: 'RECEIVER',
                transportProtocol: 'b8lh8g6ng7cmeoyownkcvzq04un2bk983j0ghmf5yw763oqt87d84i3kp7pu',
                messageProtocol: 'ti1vui421q29f4nxk86lyf9cov9jekrzv5umzbqtpeoytpo1os1inmfewn0s',
                adapterEngineName: 'hclqjfao6ky4dcu48ky2s55x2356vluf0vyhqt9bs7wh6bvpk3ciy9q12pj7bysgp9f4anv7anhmpp90zej984hqye7k83oiasihe6irxx5tp3lvsn1evbjmr77au1wdzg49whjlkoekw3ighsgca2ch4dtll8zo',
                url: 'n1cvjc6n06uh4ao9v3k0vozqi8qcsiqzucoq0k87l5eqyh5qqvvgitok6ec9lqymefdmcb9a308t8d3jc9zsim8f0b17yz88o8lh1hrn5b3i6m391qo3ycu2f4vr64mfwlkehyw2lkog2p3ilpes99cju96u93f6iujg3uaesljygpsqz5l33qlb8or0x9nj33zxvrkyh8kkultn2qc9vkb5n5u6rztwiyiqs5p4373t7ixsigvw0tuy8btcfur4yw29xivlg0jumbrwuep4966kmve6kapnhtqi7ubkma24grdl6jfisktz0fdzcucq',
                username: 'tdmeemvrigj0avjz20d90ab5r24qooapanhggd1t2d411xs4jh3dz988skjk',
                remoteHost: 'w4yklkppzerkie2ys1zinwm9umulexmy3pjj9purb01350z6axq226dvvxpincbja9bs6dijp077u955fasw3m4no10tchrs4mp3oe5dww3opzfbc7t6e76yqxagsezd3ldn1fp2xek42smm5rfstwd2pef4ad7m',
                remotePort: 1073082742,
                directory: '2hma8xhq67bm0g6ll89x0iu2u2gb26gdz3ubbigxeewsxuur0qn0wf132h123n09ew5w00e887bfi1insyl6sp2fafzswrqnyj37h7dgd7koh6nhdd0hh3f45t2zrew9pkww5b7053p4blufyslfgzw1yqh1fcazzvv02193ft674slmto3d35z1sywe3gzr01o60dkwluseqc0yjstx5okxw6ox4cazm92e9ol045mfaisgbo055mj80s1ihhc3gef9q1ucyfpg5oezds88ka19ycb73gd9txvmnnfvhpvtqd3jazzqn0iqf1sda432v5bhyrccliiva0odpgucd318edngr5lwy6o78gsejuztcfr516fwx5k3kdh5ht0mqsly5vp3b6abqt50zz7lfoupn6t8gzb6gm8uvptgil9sc8o323i08bny6rdo421ntwxy850mhit542ss71u1lf24lov3vl9xzi7ye9onkyq3dlqv701le1esgvwqlefw6h1x9t1luvm736tazznxf7d3a3mbyyrt6wsho4pxd9348mrau7uq32994swkyncpm4iexa01g5x6cdc96d96ahczyzp3rzo4c6mc1yq2fuxs5fogdnjj6b9jirdgg2pz00wkfm5f7dko3qkon3mppdzkyyiwos64b3z3rvj8abrm1mpv6yewctqaue8mfo8qdfzy77kz0lgkte7ptf6ity6d07e6wjifrzr5s55ag2zqrby0q8fee1hvjd1a8ozpoyyu2udo54idxn1flcw8nty9omjk3bt8hz18pfilu05x69qtkva378dwjo3a26my4fahcxj113jab58ib9wrfgxmhp4yfm0044yi5vpcfsc1czlb7jwiob54epkfozp8ioadhb7pyi6oexisvrm7fwsbuphjc9aeedznzp2tpo2mt2rnxo4bocu1exh19na50sqkyzrpoj9m3l1fyu8b220hvnvps5zdu4m5fby17ha5r65ibblu8c3fte0v3oi4',
                fileSchema: 'zodtj7fkjb2e1hkk7idg41cbzztgaip2mwap7wjwxsoif4dfn8srzqoqa1haa15a9l7gj9wa8kek2jauq2tchwdy13cta037e94745r319gn6x8qyqiz0obhfxe68o86horiev25598k4axy5udmdm6xfdefewyamk62b32ef4ningh811oq7eitvaiorppzbf8ki2gpbemwjwx2r4t9z1gonipwcahmwvuzocevx5px7ygiol90qst0z0u8wlz72cu7nos2ajmzcoy3t7fib5n7gw6ge302ioxt1c7zyl3cgnhf6283plwp3lznjoao0mfzcvlh7av1uxxp88tvo20t4hynzpcxqj9qkwimo8tasat30eedtv9i9hl1sy9cvbkars2iq7uqfnllcb9xohe7j0xw3zhnlaqtsfg7otvh71lvsff9zzd190kn3dyely4o3ggpr3x9d9lzr2pfqc0vlbi0r6i2ae8fsdvzc71jk9ae92v6190kxrtyknayxr1y2w27mikei2axrw145h0ez83og97sk0f238xe93o58ed4ub704re76rrskhfilirq3ou9fsigpogwsk5l7ju0mw9rebiu87sycuhryopu075j4p8ozi4xp27uk6napsdhmu6llbjbvp3o1xvxo3ngczved665noagrn92evkpvdjyqr34gfe9govl455pdfz37dxt3brtrnrfaoobxmdaezc34dvzvi1fvmfcqeqbnu02sr44fodqwkr1rsu224woufsiihvbw0iac9gkpvao13sg8qnims6gpcrshk75fm16ghrm2sjep4x22dkmq9rq2mnuej05901uqgjp6o3i7mhwaqhbsbx9cyl73jcoanioewrt1405ugz0lqublat52s58ag8g20812pqs2470uvzzs6bv0xb8q704ss6sk38pn0kvat5lgat1gxsqaelsph6mz2vp0f8xgg4vz3isjvko3fefaimk5cv0n51xlho6pqfmozzuz2ureiqw',
                proxyHost: 'sm0s94m7evyuiw0gjrh4iehdmsxf48moyq9y1v3jowy0yfhsln8wamjhl8hi',
                proxyPort: 4863794688,
                destination: 'd2ff2jjgmsh1jcfe2dvoao7a808q64cpw2iea0abjf5kob9agy8mugv96w0yixmzogvo67itzgbvnf6i6zmi9i500r7qh0qp0q3th4lg9mb5jmalim1xib9ynf3h2h9fdowih0k9qw92i3ons75l6qh82lfgo1vp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7g2x98regvct8r73975vv4xaqwmxybwam698krppxxjtr9l2rszggw8lgp25nnijfpyep7ljj0cbd7vr3zbv317rcb7fbhlxn5h6ln5r5cj61ola7p83gtp181bj17tpdge7f28nwkmb3xpbpnedtfbcqgug3e0j',
                responsibleUserAccountName: 'l1lsmhe9cb6c8odkz09o',
                lastChangeUserAccount: '9nbaizkfrnn9fmpbbd3k',
                lastChangedAt: '2020-07-28 20:41:31',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'easjbeto0xe4awrgxr38s1hqg9l9snkyg5redzae',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'p8zvko41mjvwj5m406tx31g6fkvqyevbqmed5w0l6lm60t8u72',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'dcsbsg5b3gy0b0yef8ao',
                party: '715wt47urpi6xpk4adhjn8ur062jx9cpjdpdv3f8x7atqbhpj786gku0rtvom27z6ttt7hv64k6vrzy15l2m7ih2vbq6wy8vrxkg33m2jcqqpyz9zw9jgl0upn9ikp98z7k4f941vhtpmz51ttlhgcuzb3hropxg',
                component: 'h3uma9aspk451o6jbhftlx9nj313rqnqebhufpdav2swkye3a8mtfserqlgembdpll7lf83is709adcvbqnb9x0ei7k2b4y9nrg5su5hxhifrg6nyb0disi2nfe6tb4vvlsk6v0xx0dkobty6j21qr7if6xaenlz',
                name: 'daatx0gexkttrt57j4c0l637uxb79u1fuojowiw69ln49owry7kkoeh2tl8p9dh49vyn16jleg1n3hshnlt9wjm8lsha1oigzqmkhd17wuzo3zf8clkf6ekpd511nbp5pfwak0w99j78gyfosk0bue42ucp6w95e',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'y54humpicsdif7rw4m8ueu9aiu9qky85q6rr4hn893yw5kub0jaadnx7wcbv7cox04vleeyk7ajtxjv0kxm6uhkt1meczsbp365dh1f8ausrtl68jcvxqotjgyk55sp0jr2q4m4a47nvqcwk66d8xfu405hha0jc',
                flowComponent: '6r1tgtpqgplq3lindox770zx17t27vq7rnnhpqbn9otfq64wkwgoxuow7eu6k9czhi125jg1ip68e0ej8g5tuu78k0dk3f892x2u8mofmafydodalf47ajowj5vnrreywrl69ttgdqfnm432dde3w9tgslerr4hw',
                flowInterfaceName: 'jwk726tc4sme8hy6kwmqv6ihz5xr8dl4064j73fc8cm36ai3db0fxzkhyemsetwdv5ltzm80x04xeszgs87m4ut8287manqw25hh5hqtih0nwfxmkcxmyv5p9agec44am3d2nejsit5r1cja9msvdh812xsn1aa2',
                flowInterfaceNamespace: null,
                version: '5hto40jxgacfihqtudd2',
                adapterType: 'snsge4pl6py9d9n0h3ur8qjtpivd1u6lv63nd2wfxohnty80npv8pi3r7x4z',
                direction: 'SENDER',
                transportProtocol: 'gfvxsjvjqbjni96dmvtqfsuu092nonz99j43k7aii31v39a19j6h6hv9hzsu',
                messageProtocol: 'zt8ak5t8rc0bo45ooxhklvmekriumj7zralpnlj0l91dccdjafffm4egr7o9',
                adapterEngineName: 'u9wagptmdcs40d18eu4t52on1qkltgnfcz9x9psoxjc8rapf0jc96enh5hnvymfxxivxs3stq1zrm6ecerffyfljutyqtuzzzzdtejwiizmlv99jdzj8mq2j2k2r2jdwhgud2mue7ues5xqs3go11220qg3i89ui',
                url: 'ryjcyk7pl4anbtgpb0q2kvtrzy181nv9hcz89k3f6xmgoli39ykf23ihc5bjs75pvinqw14mu3o4kx9ql89si12b4qwkgt41euobtdukijxz0oyxs7ncty12dnt1wwf8chd1679spynnffuhdckp3nl6vg22okdi70n836pzj4ghtvijvgdmgxovx0ytn42adx0aj5rckpr5p78unh1mf7l3smv3dy6mapkq7bz66vsbezzccpb2t9bdozwrw8q33dmxrc6tdi3qv1mbsm63o3rzs2rxg7bcfbyr4vcexx2w77ehjm1xyl811edxfxn7',
                username: 't975aj75v5u3l32z375z8mv551knnd8jy7rssjlekq629m6ji0ok06b78ygx',
                remoteHost: '2tlbtsysxqqzkcpinrz7z03qjku9eqjabjmfyjw87f7kq6av8xleiwngcsvzii07nzeu1ons128bte78mzir83vtdovk1k8kbrkp60hrkclpb3gngm7kvjigw0u415qc2kk3dynighhx545mu9b0epu2kdp986eo',
                remotePort: 5567854922,
                directory: '5tr8prjqypswcz2tserdny3agkih36z3y7t78ka163lvxy3kl4hnm2vii2m6q2b401mgkv2mgaas1xqyla929qneu2pdab9q7v8qnrpjk0pnojocom7g0ccmim6k77vf8ee9bnkh2apx2z3z3ryhmwxm529phya3vqf3myxvu3804u17qsalxjsr9ghi3o2lybw9m91cqs52wndb5easf340revci5zpbcbllosqptgny4m33jin6dn3g03bci3fzxfvkby1ikqeatw9cjd8borm1woejhebrmsnr68upmq6kpv75gyvd7m36qt90pk4kqjnk8jkg48gfgi1wrxzsnnvqybgfat00wxv8r6gwicv0n33i34xcsqt8r8wiajgmg5f1ydtpm36128zl5ydhgp9z03gsjd8tvuf67kd06thra49ayd0vstiv834n1pj95155v8xwbl2g0dw7syafybc8li9056fxh8564duzlckthzn90kwkan6wxxydjvkigjlt6l6l9v0erf76qil61n206o4mjiwp2hr559m3y8jr0ayilba0tbui4zcaek5cnm9g2z9e764d65nbj1zkqexk2ylqng8g2u9fwud1b6odz8495ihn71j4n9bjvblwq7myy4vjphxnxo4zqmen449t03ke7piy6zgoj418hr36mxy1srhhctgebmmx03vckx9v1qjstgv19106jhdmc9cfenmh4gxgrgo3yfyal6tr8moulyrch0nfem4bg8ehr1mj49oftd4lrwyd9yyiape4om2cuvddr467063klw30oqz85n4tahvsqftfggiu9vbokf6tgsle0r8amk0kx4aabmfc8my1bablukai2yfkoarlu7sv7i1dxdxysb40dkvt0zewh4xsvi78dqn5yxyatvmrfmeezn09tnhc7wn922hsp8a5iltb8raeyak5ehdl51banc0u69gu2j5821jpxbw267uj9tevglpxl563bnmqvnmuiztl7g2w3ec',
                fileSchema: 'xrn3g0lkr10dyz87wgg53v1emd8vhajy2xnwetabvoso3xmy272gjkqpne3xm33s8j702qsz5eohrtnrqywdnhjwpuhr41yt4jm8l50k50kwnpz1ydyesd1n1sytoz6l2e6xwy26ykqb4xfc7o2f2hw9bdfygs24r39f35swr0ehvq4hps72pbhw2kgiqfybnkarj6ny7ekyvnyo2xgz84nn7qv37x81emjf1sh6pp32ghllycqgvofjqaa3t9fgc9k3q66xvk6e17rj7hgrvecfxb61nq79osynq95pqih2l254krye8m9c84s12yl5s5chiox72kyyy6svjpetm5katbsvsl630uhng1ynowdt98t1roh755loag7gr92uws3wwvz6c5z2j8xul4yhh2o9sxmyrhqjkr000yrnig9ouvdwdg31hadayd7rste700xx3qvritpyxuk4mhva9q4tbhl4rc42i3echd8jffdtxo5v6pxfkhte05fhi454ih42350zlsrzkeyfn8dxbzuoyqjtdrs4xcz8zvulkgk3zw8jxse2snj8umnmpwt0t9uuzdgq76pgr2y98obkcgvqabvzx19x4ons2owssmoyhl5tkutniliptag7286n9quwoo44hu7jk5wn6m2x9b78rfohmlmyshpydvcejfk5g8a4f3hqdbd5ds1epzqbfa0m6dgo5bwlb1k5orfs123j0267mbjsxld36cvoqqizp1cj00bv85e61cbqs34lsyf3rbnfkjqnxcysgxepf7vk8sbadfz0npxk42vktrquhtv4f14468k08uzn6sy0x44v69a10dj2zm56lb1g31jjls5d3sbyxm7681rhodxy926k8370mevqb80v2awgm8ckextjqi35j4n59db6vpn49pxg155n96la3m4e12t5288x88rkowfkimux0hsa8io3h044puj26qcam5gvs1ggrbxx7optjsira31py9ra5rbl4mwo21n6qcvzveyd',
                proxyHost: '6uhtdr7tww5mai5uxszy8b8ds3t82qi84fk51ul3ujje1p4sc2lge1806nlp',
                proxyPort: 3006323967,
                destination: 'wwvv24i5lxn7yb7eounv8wj34stommfrwhid8y9eyxscic1tk2ba57fvxkcish4f6manbtel6dqw756o31mmlq49oildzidsuar5v0ufqcja09t8b9tkfthhf2r4gn92c040hr16c2zyqv0l7nqa5nmg3ndm6fju',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ggwe8wq2c2jzc97pj06ocu8eukj0kd2jrnl0vmue8py0yci0nhaxx1dn5shwr6wybtzn79hn88doatltg9vj2pxuwtq68iga8v23giqscs9c4nl8hb2c5ni0iwma7hby1vl40j35z5ymnrzsso7q4qy5a5tdj6sq',
                responsibleUserAccountName: 'imf2p1dm1u14hz11qg30',
                lastChangeUserAccount: 'a88nope9s552xji02kvj',
                lastChangedAt: '2020-07-29 06:35:17',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'xj0fu2u5nrak75kkvg27cu47aysb2h4urijdrqdy',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '1mgklnjll80t6kqr9c0awh9y39knh05swp7i1dzssf1vn9kihy',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'g6zz7zrylaleax4ubiug',
                party: 'wjaabgq8rivye5xgmj9bcfglyxlmxvalxjeumc0yx6x1ze0hmlu034njn2d9kuo00imlhzbhc0ehb12bojs69i8uj2o1h7y0g8exi7eoucypcblmx28xtpy3mgps11t157nzltlr3dkc7ukei4z9zm0xdn08s3jf',
                component: '5zg91kigtf8pyi00cow9nwd7hlm2h2s1asbj3ycgchobinxkz77o16emde4jxb8dbbvcvy4s5omijd45qsuv7ba37fni8ncp8oayp7x1iu06q9i1unez0ujfz2qeqjfkbshqzy5x9i5yzwy19bxo39s70gx0xnxn',
                name: '2j7wqppb41o69zl1kt4tjmehjekbq6zihhphnlfdwy1wciezmlrp4pszytoibpngwez8uno1xh2og6e29peuks9m2382fm4u5capkw1f114w9pkus8bmgglyc23dw2ioqu6ka2e9c62ucgzgrvpi0jzvfyktdjx0',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'o8rqtz7h2spqmtprprdfwni7m4it6h1ptktxs56agasl6nwvdvrkzwr5cr0bbrv5n6r6l6e3vs6ngpt1ya2eeuutiaeddqchvraun6m1ezfotk3dnrqyd8d4st41d0d2vcc0blmc7bauxqwjgs7uwknxwkxcs3yw',
                flowComponent: 'bw1x2d0vz41arf1ib2z8g9xqpufehqxqh4635b2enhfer4q3405gfg62hjuq77encjmykzv893wqtyo35c9t6urkvv5c3p5s3qsouvlmb0zggfx0o5bz68bhr3ar6uiidmbo932dt1upfw5ss2zpbdqda26c2xuj',
                flowInterfaceName: '7ns59rl8yd8zldtqd7lnf2h379r37xik731ncbqim5xs4v7bkaop0cnyf6ov6gyktb3hwvdd4gwiyqbt93c1u75kw7w8wmou241j7csdzftyjvqycrxxpi9nt352af20tpl8me3lplx2p528gpa5lv0kmmxp4hkh',
                
                version: 'c9yndczbhxlhjhvfn339',
                adapterType: 'r5ijr8mov5umz025o4ydvoete3j0wc1b24gf9yew8ru65bg3ar5ei79c771b',
                direction: 'SENDER',
                transportProtocol: 'wxblijogpqj6ohatt8ticxcod7g4jb5naagwu6gz3wk7lyq493q98jqci6bx',
                messageProtocol: 'l6o29ws47iqtvu2cb5tuqu4qywegl884qzat3wgjbwbaf45zuohzx0mlyugv',
                adapterEngineName: '9cjhu187vzn12ct2zjp6skr8tvdu8ynyab6gmq5558efwjekccw7aao1chfpgikx2l0tbbw8fr9gp2vc3mymjtsk0dxxdhr03g3gnqxu7a93jn3cty1kr6f3uoj1b6asvzmurvyaz64rw0913su49juu4ozjsrcb',
                url: 'd3h7c9rszgwu9sr8is2d6a6gluwgm7w6ipj4ci6u4sscyk0baze7bodob4rmsui7a7s73ggfxge3nzr5mvp5uacpd7vr70rfh4izwirnoywdst1xjyk0pwoe15wxol40r53hbnsrxxesi3pbsy7hc90h3xgdmcmctup17xco8bthg7j60x4ytqlmqjdjy09jb7vw8wzi0lemw6z6ichmrhvwqm8zmqj0rhpxo8wdg06sn3h8r7zpfaslay052geruyfznedmdjjjfmne4fl3e04v0g341ov40o1n2rlenqn60m6hzwtjieyurtn7382e',
                username: '0qr9xmp3psc2cc388sj9391opvbhkp9qdqdhsyunikp4b9jxhpevo8vok5mw',
                remoteHost: 'pf2njwe2yztuf7y9yfuszkyaq5l4xak4som09n6aml9neoca9lqevqr2qnrmoz6nv38aidlebmmlm9s0oednxhr0y4sti8rhu28jp2wxysj73dch03pnzcsszrmymb7robdg4fa23d6k9eu82lhhtj9yaakigazs',
                remotePort: 7597586656,
                directory: 'nj3hn9x49b60tvntuqx34m7jfra345bgh08nw5hdwat0r71b8j9ahy7518pdnodly2sxy8hsyfd96fb8o3xqdtslxh1xqxfnhligonolmqozhv4r4g8jqrk6ybs1lg1dnsp4lzi2ynncqfet1gi3jxn6vvoy9aw4fzp3w7iw4ohja6igmbrskcdv5dvebiia5ituu8ri7gclh6uftheqpdxo0ys7u6acxifbhzvfq1hbd9t6eks77303c6wrbc32qtyihjs7vt0mwh909qlrhfn2t4p41nxuzqjp8enb2a53h7lmkdu0i6fc1z4jc6b71uq8l4ohlqo1vg3iomk9utk2hymm8fl36vhfuto2bftifj19i8txpdusylm1utnios9bmput0bz60dv6211stau50mftmnr1h01xix81sdnu2u0fok222s5ipo827k23ho9q0zbjp19hcv2zfp2x2ymyqgin0vjam8fu7l60wdjurnkyy0aip6ysy1c6di04dcuetdnnch0baqh1pfuyppzqb8lgedd7e2bxwjhdm397e0klqddxbq1g0f4zh31qn7fm12b2yy9s4t0gmkghvdlyegm7fz79ej3ovwrh2b11mw79xdfhm6ekkgdcjtzxl0ga168uyznks3b5lb863kirjzrjgsqpyk0jt8lxmgi31fe7bgmkuxo5y6a2prmtmtalm8nvg704f2ag7klky6x66v4nj45lht6q9aawzvsyth0njajleqzni8hxzncnutavna36877ekowzknaer9asu41vau6q0cfo3gnwmvfhiqm87isxdgpnck2vz5zrgxlkg734sfbndiqiq7ojj3bx40e9h6a9vn03w2trz6xnjirt39fkw6y1qn0v5py89e2azjtxhu5v3bu83kfe54clpqcj4mo90id2itprbmrtq00sj7x19x5etl4acfgaf56yjlg3vaxudgyet2cde696qu1dws1552th3oco18owcv9qi8ne456ytcv1afie',
                fileSchema: '7ns9hshqx4j2piogmnel85n6hkusxo3kgosgor4e4pefe2euusr6lxd3lzh8pem7dtr0mixexobprarzbie6dho55mdzvu4uaobqiyf2fguloy2bkaon4yif2hjcf6hw32jieudiweua22bllvyztmjbpp8vq1yyxqlrpej6tjy13pw5k5cwjk122ucbrqhwky9hz4qzdsthf7nvxy5ts0rptuv5gayzqacwlngitzjb68g09ynnafvg6u90h6wmzfq3olf10ex6xirlts7zame8smyu63i1wsqauwfmc0bbodaangca3snd7ju6ifavqs7a2lyxen8i7r9sifaeo51xdf69hz6rjikwz2jk4gun0eypcao1bq3aw9xuar2jis2xjawupw04ey59dwh406jc2gpuosaxcnkwbmygyvasb6vkm93q2yr5yd179qn39xx8m18fzz4wim0tqocjos2v3srx0d276rjf5omkkpi6wp4mjbdyxfc0pbwmygz95g1zgno9uiy5j9hd794drysaugj943qoueihoyl8uy1vwet0n164t2kw2osjw961ekk7ixx1g4udax9gpelm30lddxbm91ckqmsitzl1afwv7u0e6zywu6r7p91n4vbwc2p717yej3uidbhya9pkvakblhgv20n1zwtyzowr88bbgfs04jdniqdilbn8p93ak6nkt0pi96o61hedo5q82jp7frccp0vfvzj2xtt6t8ei7xyh48wurda3om1a3oyfrcr64kwccdi16a2f5dgnpmg8od9h0c3xxyesgz7073m03i0clq7wfoqndzrf4848vmwdcyl49lohdfbejj7ovlqors5cm2lq0b22xy08u5xq7esxi9oty4jtavu0t89qsnmivr085am61j1dekvkdqg3c2nz7y2lp36sshuks3i1ycnliw61io1ondz3kiu5a95blduwkmir1oan2oylodsnvsitu7qw2ayv7m9k56ji04koz9uymjd50nxrjb3s',
                proxyHost: '0dxml4g791lpxh0unxuydkdpxoiy1mfm1wlz9gfxvijduj1do3cscvwe1cxq',
                proxyPort: 1647275242,
                destination: '3b4f43km035ol4i4qpa9hifx90pgj6lteidl8kficv75ognio0qjfg0zugormzx5ao3wtdrpnkfteop6dxtgegemmqbbeooivoqnjk98kaqjpfdb8b4dq3020fmztaqr19a1qa39x93snjk4c310vm3ymqp8z2dh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0znuzaspaj1wsyrv8xjucfjk0wgixmajxo0x69ab8j3bjpzawk0dtzowqef6aiinzg95ssk8slutg79jes5gw5u17uxflaumb6sc05mcjfqco1n6rnm6bckrpe9q72pzemkzvfw832soysx8zoux7o0shnc0g4hy',
                responsibleUserAccountName: 'xagmtmmma9pefwxy8q87',
                lastChangeUserAccount: '7du78vyoqwrfr77acm2j',
                lastChangedAt: '2020-07-28 21:38:20',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'zqa6j1ehc98js2wkbnu1c593t2ae3a75a75xw1cc',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'toc6tj5zc9x4cngh2j6wd8yums6u2buf0sgsqk8pvktent0mpi',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '69yte3z1ukd5suype4jy',
                party: '6l6w1466pg6d1ktj6jf3wi1f9nyiydqlmiopuzozppnteqw85qttseq052t5oajc5ydtk752dg3c6b1g1l67uaxudvw0z9cn9k9ivtqkznl3kdfrnq35crjgfnpzu7q1g7glns0lbeofauqa3jxyc0uyjzfq65v5',
                component: 'omyiae7a3ddm9tu4nt7u8r5bjmw2eegvy8ny1ulnt2hwybn3i3nvwhfljv6o8nc8d8a1t2gg83v01orjshymmfd4mxycoj37bimoc5jbdpkd8ueohdcsl529gfyvg4b5hyl57291xey80wlcix5put1phygzt0tr',
                name: 'i6pueixtvgj3tvrgvff2x9m7b1bd7f1tp3ryoz557lrksygeus4qfdufdrgn8c1jmnxtt8ror0vegfoworx2a473q6lzb1iwllyn72s3d6nzex5mlaupqqs4zuutwbkqwzjjhljjxctxv5ecf3kwqsrgi30bnepd',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'h3kg6r6hx5fwo30n01mbkb7iz1drilvy6elxwzzfo8c46rhn1t9d623yno8gdp8zajnv9trjr6f2gfu2tt928xsjuyymlunzbmq0t3j31m94owtmmqs5j53h015e9cryo9m3e6zop1oelztsdqcbmbmv23vjk8w5',
                flowComponent: 'k01hsar9wqlw2gbog2kzqzljlt9knipuhktakkh4f49za8ze43ixgojabad3czdp9pbce36fureminudqrez6dq9lsi4j5denus09uy1ofdw6dtdk0upefzxbh68ifzgmgylqcvm9bzmd8dx81v9gkn9ttfw9mjj',
                flowInterfaceName: 't880bnbii9q8uwa2vsiicxij4s9d2r6kia1022pdixa714usexof557y3p389nwkgc54nytzwizw8lc6rvaqoowv8gxw7ml86xbqp3h9s3lsihrb21767nmfi2hb1mg86c6q1tea2osbkszt8d3z1vwv9xuwatn7',
                flowInterfaceNamespace: 'l3u04gooqp94fnwyrt8cnatys9ks0za482msknm0zupepsqu931dbq5zt9y503pqp5o33mn1o6xp1ptc398uqw3xce3v3un5pcy4izml0qm3xdw3tgae3ckxkianoj982gm8bz9kv1tawcsb5rtlmuc4jzl1esuy',
                version: null,
                adapterType: 'l181451qtk36wbf6rk91a3s6rm0q8o84l2xn90o9slpqlzy78g4wvmf8b7t4',
                direction: 'SENDER',
                transportProtocol: 'z8j01ox1mqvh80wpzp9v75gau5snyplakgc34yxpscpb4tpz585zmlbtjkkh',
                messageProtocol: 'deah0bqbop9h7wf3iageef7myrzty1xbw4avgavwl3a2jm5xbahikqhcvgom',
                adapterEngineName: 'z4dmi07qtjk8szyl0ac792m5dtacnw0qbibs2z9gpyvjy5depvobndvnz20wpc4u86onv6o13hans0bs7spc9gdhvkqb2o4fqdk3v5wr4yz8yqtsrjorj6fbe6thnsqhkp6hs27jdu6l9e06sclnzzrs6sqsovva',
                url: 'k6ssac8kedjrcdptbosa85bsa32hczbc4i94h9gfelf5phkcuedcredh20iu2ur1kedu9q56n74nsk58i7bplbi4dtpv1n20nzbphw8fes2uzx0oqymnci9equ723c6yg4cthx4v82d83a2xqq2q8ix9th3uxec7a6hq89egv1cqu11n8lx379kye0hm068gptuogkzfhjzqcp40a0bm5ijhl627f34jz0ewiwuh6mlepc4q7pq1xwdv0rh6gslblx3h0rmu5xe1ihly265oldgq0pez4enjw3oluplho81qjqjuftxb4t0sian0ruat',
                username: 'we5ae8z16jopcb7jnnr3zvrb5xlc99aypbr73xck0dy23mdmyvayx8au4zas',
                remoteHost: '35d2azq73jfcis24cxj8jf9jzjjtp3pphv3ocg0obvy8roqd6aywi2y35vkzlsujqact567nakh5y78h2e2cwzhhmmkx99enjomlbaybhhjdki831vz86jofa2c1xfgvass1fhxbqcy39nsytyqz1gpnvypoigz6',
                remotePort: 1830941410,
                directory: 'k42mit8hhs0lmf0ys1ft5rmns1i4c891j923lp8f63zpvxu9b4mhj9cnd9ysltyhon7xr027m42mk4t9k1cj8t1fdk5z57nj82d2jgi5lzavty8n1sg8o6wvh49gdllnmq5zu7529cmoyr0u5r7x272c8s3para0kdy8wjykns512wmgxmoyukqm8n1z4gd71wqlgi5y68y79ia3h322np3af7dj81li9f3xdai2fuoq9y0buvgs59hd5bvfdvvf7c27mrykuucli0pisv6ozbclm1e8y2nj0pfs2jaqd2mrc8zx62ymx4n6q9dxgi0dkz39ia7zdqc26kvtgk7ufhjhuw7pw6z4hen0hf1sk6ajm8gbghe170b5uv68ucy8x48ncdvpkyqmrrbcm9qy1bjy0o26w7mszncxjgj35zkeh4p3kz3mqkco7q7cl7ge7tfzdqm2vl1n7aj4ezbf1mbshln9fmafj160n983ehgfeov4dffzxfxpv0675dvnd9hha6ozh94sflfpzritgw4qli774ilfo27w7jdth9vq40pzqpor02nx8fbu8rlrn9i2juy4ln9bwlmy6k818sa6ke4054az5vrnopiqjydc9jwrcmkrhj5w2wkrob56vg5nr74c1x5xz2ngsp5u7o26mz7ivo2u6s85q3tw00urj3sah1yc9bd7ginve9xtl4xqjeec3jjt6k8j75w72pf4c3095xz1f8evheszwikjfzw8ecturkh9mmo45etcou02k78wz5e33blvmvpacacssgdxz0tvyesm6a4iv16cfwr2zx1jm3vw14v2k40u50d7hlg8gd4rifijwn7qoswj328j11rap2pth7r6p9osyhj3m31j606zc56ox6cva4zhzq60ioidw0zo3jv1cv4kznaayzbmcfatbwsm72scp7iukevq9s4ri4i91h7jetkyakeov3e8kzkw73qtb883dxf8ckjkc88ks59ae1xmrd92xcfknordvbcrzvqy',
                fileSchema: '87xc8v2k8sj1yteek7o04sqsf0004fn5b3p9oll3obhtisjbu20wrups1axfm98pwazxh1p2ygk7qe93py765lzzar1yx31iheppez3lowrkbuyzg17emrbqd660k8n4pymw3nobsy1hi6g65ci96cgtw6381pmlra2g0grxfy2fx2m3g9u6ijntd8oypx3nmgaov1q2tkbyidnrx8xs4x2cfk6jzn5sxqjqehqq34pz1yhmrfzph741tm13dvv8cab8x4kshnhymblyobi3oo03ruxjo3xdt2p7uot7fnk2hghoe1pafd9eure5bmhynf8h1shl1dd34tjqavrnszmlboqjehsfc2d4r3mdkltylu99j1v3syfmd1wftc6z86cvg3zhcloc8t1uzraual426e39me1kvbz7kjt7fs2xnj98muf75a8vc47dofb098f1tlstqs0xhs9ibxgcr5s1cyvqi5nmvu6zsgyc23w9fv0o2m7ja7i3c186qbtkn2ur9axn4afuvlgf7kysi1w81xt3jlvd6seh8xf2ik3esny6ucl3cth0scy0b22mvw5w77jzq1n5bs0rgdjjxqqrq1abqu1i71kubemr8pfnddesh7xz13m8l0d8o40o30jw1osnj1wu52uq3s06brg3iel2qyzse8d2bn6n099hrk5vdmxqr9hjnfa8rx2afo8ihp04y2n6aj1mccqo3j3v2u44b0dxv9y537i1bu61gr2jwxcbxvvyafl37lhfdef2czvol5out15s28utkt3rsyelkxj317a1ic2rfj468qkefdju078lc79bbm4gm264ff5qu9ur2w0w7y67adj8wlf20phia4gy5hgb9g95zmkalx2jldih3hqpmz2652rf8909yh37r8y3nhk8j9p5kpkma13xulv88jyeoderbspmpp7jruzyj43fk3b1mn47udxr163uyaid83hzuebwe73su71p3hsbnqfh2zkto15643j9hyld0dno734j',
                proxyHost: 'ujyj5ya4mjiqu8lza1wfx58zv9hogmjgr4zu8m5jsomj19repxw59ur1k0bt',
                proxyPort: 5675625834,
                destination: 'iamthhfi5xq7xvqqypq3qlj0vq2un71vtywyetog5k10yu4qgteqlr15tw297lcjrp353fj29zu3ex5v0325zuc9cgjgs1uxfpvu99aag2e63d0bie5ui13gphie32qryxxa53rs2kiikj0ba5pdpzaxyu1br4dt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3c0fowchoy0dyca605m0cuefi7jlc8o4z93cps2hw0qnanwagiinsrayzn88si0dyco6boxolitx9os1cjywhpqkklos934t4dbtkf0p9x9utp4sme9szyqbtjxuidbytc50hqo55ps0ysn3l554jhi1epkurx4a',
                responsibleUserAccountName: 'syf3z5o1f9fvu6jfyjy4',
                lastChangeUserAccount: 'keyyil336jnpq986h5cc',
                lastChangedAt: '2020-07-29 08:59:55',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'cgpm6edyxpggebvn2ge3391ogm8zjxktdeepcxyj',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'vwwra20tuw9qdt6085ffwdw7gwq2z832va3hrfatgjw0hezeex',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'hkl87417fqjjtynuqqre',
                party: '3fh8h1tnlrmtlzhomhprvvstj6pwpv6cze8hjdpawwftwk6y1uz41qwet2qwvekvqzqd2aj9ckivbjm1fhxxkfc85was0tf57r4wep394majnj6ovztknb44rkwma3c1l5m3w94nhl18lk5osmnkv80dhl717r8r',
                component: 'itaza0e4q4y4esfcwe6rqq9pr94retp2ipwatgpr23qmdlcfc92w52qi5hsvz6nmbie2xe7feonrjb24me3pkhgyckpsjz32fo3vz8yd8zsoyp0rkmwjrxjs2cux9a1phabbp854no6grkoix1fmqt68td604zep',
                name: '2eod73yho7kjb32a0lbtlfz0uvh5co2ev9v49pson23gsyolmngrcip9f5rj0cxadaeojrxao6530owmgw0ty10pb8o91igdcj87g7tn7o277an74t00npy0t5d2mxxc4q3v5gz9yqrfwq268uikbyre9sau8kr0',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'r62d7sxrt9mwo4itczilpixg8pbqmzxsuifehmqtdfz3wd8wau76r1zv46rmu4bjohbwd4vwvqxi32ek8r63bt5a01plqc81a2he2akyjofmviqkjepfwi1bkgntsnek6bijaukta14ar6gw6i4ajh6y6vgse4mp',
                flowComponent: 'cs1wbny8xq8jixddyuubgbm2uil26eg0pvr933h36q5pd8il5zg4p8swnz1uey784rtwetepscvnxzv27j9v7wey252w05hdsx8xvw03gizcmeg4pjj4d22hpv5c0yjcrizks7m3la5jo0djhj5crj4gy6rr1n56',
                flowInterfaceName: '3ambifntmet8t31bhhwjzo4cpljk4l5h5340yomjzqmsw8rt7lwug3633mxexv6n7muzgzksdsrzyndl60orcajpq2yfwzkwmuvjdn5xwy825f5dvwz9n0q34dop95n4bcwbbxk3236rbxrlzx5wfuurxpb7xyrj',
                flowInterfaceNamespace: 'lielg2upqtpys5djg6btikcudludmtg1cdjqi6anjv9cgpd75kqjkv07e613jaf02u714dvpxvbax2wu9kko5wl2crzjkdihzqwnjypba9gd49mn9emj3xbuef8go2ez3pset1zd3mwlaxwbvilfkrdwyfwp3p1j',
                
                adapterType: 'n76tv9b3tsdaruc91kmo72sumphkvzm9v8ljw5zsxi260lt4drft1jtirz88',
                direction: 'RECEIVER',
                transportProtocol: '245shrxl5pepxsk2knz8a3vwmqarm7p4vssnqi2pnvunwsd6835w8ba549gn',
                messageProtocol: 'ii9kz0u78z7ay66ohhd7wkctld09i83oq10zj95y7de7saupcmbmbjxxm4yf',
                adapterEngineName: 'fiuhowqiphlk4zwn65lcdwyapkdzybx8dsn9x5y1bl04dmu1vlcmlguo5nxxs3xemg454c3kug83g6x5jhf38jyfvp1z8sgkj9t2f14ipcvf4ahyp94b6nqy1h61olbor309ztk162jfjuau8iyh6bw6qwudliiq',
                url: '4ck8u2m5whgq9jog9a6al005rk90wpnmgpooy0j4rido1p283slmzk7pvjj9budpvtm7ovsi7ov4kion065tstlh28e6e4duqpx6yjt3klqu7vd1t9iriuls5vwswgum79faykiz0vu5yodj8n9v0n3owvsrc41vux64uisl2oojkks516t8orvhw5c8b0afecmtf5ekkry6awe6okp2h168238ye7fl895afzjaejq04gb8aj8t42yr338qwyluqzputq82xvs6q7drxq6omy2f2yyieo2zh970my1wcajxcx8tm12rx6l2haai8ppb',
                username: 'v44wlqvy6r77yusq8xqf0jevyzb6ad2e7zo8dmwj9vs2ky1w2hdkorjgl5tv',
                remoteHost: 'wk5yvyyydnropfroo6a1bu85cvtc92trdvzr7y4355fou8ucw200bvgzgmowd8mwxiaykcrazv7j804sc6mlnjggzbaj9qex9o8i4pvmu4u4k1wjbiw58qpi09gm490gi3830a07a0jqxwvxomehq8n7wrf9n4xp',
                remotePort: 7511566152,
                directory: '82t289b5vecd2m4paukvc55ajk29emb7uvvflexaxkdmy1k0119jl3d0f6lef5c66yqnuumu3f5629owk00q2dc87ad7r4ex6djq4r9ftczgnvpi5dyeuhuwhleup2btmiezc6r8bwwkxdwiarmrubao02z96hu0i7t7hvo3cfg8k8e3gto9870he44lv5rdl4cxvhijjr9v6z2zb4g2fo6xj9jjhqiltufj7sz8tj4w2tb45eaal7j45g28lxhkc6zhurmmatwnuhs35bg2khithwkcfw7v57nmkitwkgyfg51i92nsow4j5ll4yxya5ce9xhjjnqu1b28xm9a7vm4x3kkbnbno3jib2s7ubs019zhy4xo1gs4ize85b55uz63e1xmte7uh4prm3crmkzf0muf459qd1jcdp9m4hlew7ovx1ys2pd5nqptmn2l0mzxq3bo9sudl52jbr2ohx9m9wc4zq6tmdvazitdm144o607pfvae0pcjykh3eczh8jzp3btcbg75xhdkpjqtywy9l4wcpf6kjz5zlbgmwjtwmw6cfuhxjh92avdxqrgvfabtpuklzaq9ufg4nfy5dub58a8cxj5w139u2e834o2r51vad0tu8jhzm4bycft4nwotv6ofwj73y64z2f41oed2a6eekd1chueivzfmkxq0pfiy2x1gg8umvpcvomt5syatc5acetej97flxm0miz4hzihzgq8k57irq21x8267eizaslkl83d3in8fi2u371gjhvyx5kbi9s381lfv576dmb9zrhm9c1wzble61ef0wios8rziw8r6mn94s81sflbvulefiqq2m0krsapamv0x9nd56sngg6nwgi3hxismwkez06vcql5ramgpy4vuoh4u3sgglnr3ufpmpoqjlhzovwhfc4jz2vl2jsb7qe03jaki3fyixr95vejskor7c1r85b3g1kiv510f3oyn82cxqhfsypi0n79d3c520iz2hrafwenrb8wg3qcsekmy',
                fileSchema: 'u5i5zcd7op7sidrkx9qbobg26ykjcc8g99hhqplgzliy00lnpn6vlhzcohcstea79ppl2v2n37decgpm1fsgob3gkny1hme9qwto23r7dwyj1iti2bje6p5na0kao2hpb5u7wqek14a3n1avqwtuu37mki6if8pb3kh2xtsqqyttdliyg3xbok62vthbm5mmff7l55sngs9njgnydc08fkrk5zcpben0h73x9zodgsz82f25m7ibt5yr2y0wpyjxijz0grrvjb0tho0z79jqril6j8zauulcrrzaugmzy12rcrys9h4i4ostvlc6q8ak9fxr22m80vzisc5fj1csiv3g1p2e89kzpo309vxzxujhb1rbx0c49r7llqyheiehmuwrfzztwhv01iyyjjo00sgxi2q4yw8tyxht3o2d738rjbd81ge67unnlal3nxj83cgrmvmsu8xz6h7aafnmssco0ev85s8dehv452ocus8o83ksao60bbhrt4kudyh32sb9uwbh8gmwtjs6zsvj6nzcmuo4jf8yuaa4aa6z9sr9h8irnpf7ixnw9xrkzzufwp5862qob1dq7yuv54zf2higb0ljurgzage90yq2fomhd4y2osltrnsp9klg74bns3rih2pk0xairbjadq67ohwl83qwfrkbzer8k11nsynb653b6s71amrj08zakboyw0sorsktyir1uo8yug7lbyd16312w2648n3lmxlddigp85klt73l77asfxpojsu42vh4dp9v2n6gs8nkdeu01lq39mwbq27so5rbyv14uq55tonva0sbs70tebfbgv88k5zb4wn48z9wkspf4bd8f3ru63e2tf7aqa1t9w4rnbub08iz5rp8fb04bgw0zdwq32l7cit1m6uguzea04elqum81tf83o2lzp7e2m39xp6pyt2qjafjh42wtr7vloof3xl0qrok78esz9hd75d55b775i4d4irpbcnw0rpr7uspb4th4p5qbw7adkm9k2tt',
                proxyHost: 'a9rm3qnnzdt2lxqmmp0tyvn811kragbpe2je40oof1t2q8vd3xt551008z8i',
                proxyPort: 4309978072,
                destination: 'k52aipivd8frcwqpkefcs03nzev9drifv0vxjdt2e26k5wi8yv64kg3c719ewh15szt42uslc3zmce7qb749lqjalff8ol0offbjzdgeuwz11113w9b5onzwocywnn6aps39r3uxe4cprhz8do1z5iw1b152hedb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xl95etufw6n0f4y5f4cnkrpnm5gcsrm6b48dbqa060w4948y36kr1yh9jral7il6v2f3mw1j3tr087sw71dbom67sbyb9zvgp8uhtkvm3441hi3cw28b0eu166cwn2w93p094rhutg1acjgjarceb2holmbzhaj6',
                responsibleUserAccountName: 'w3q6ef0ohmdv6zooq5te',
                lastChangeUserAccount: '1e4chys9mi1tqr5jm8i3',
                lastChangedAt: '2020-07-29 11:51:33',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'ru6unrz7ie3kqmjxua7ql954negjf10k44rro0e6',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'qgffyz2myrpntod9ok2zxnwturxv2ke6tklaqpy55oudp9o9vl',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'm692q2uejn3wa7hrjakv',
                party: 'fnn6ulg8gar8797donu9alfzkm1f7ibveljp374y2e37mg9al1f1ctmvtv7h3drpttitjcyuohg6lni61xr93c1iohdwiazijdl6jch1pojerzowx08tsrfc9hnrw8cowacp3pwac39jthagdh99oqef9faxh0sp',
                component: 'xxrdb55ndkq2vdvyodswjt22t7c5h01bls71f3ir4in5cuwui2qilexdsa4kqiazoz505ymq2ziofufn0hwytdw00x99f4c2dqr0vazxhhpx4jsy90vpr5dqwllywnac4qdt64mnr4ymolepyadt7jwxqcsbclcs',
                name: 'lpz2vdy8szi7ehwpb81v0jiui0lq1wbfpokjyhl7i7nxgu4wndyjfeoy9enh4udf1ys3gisb46mii9ffq5utzgw8mn8d6j5fjt6ehouu3hhgphezq93sogksu5s3fwhtf6nsqv5pcn0z6538gsanm58rtfv32kge',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '46hxevo4mdnprpulgkgpjm2triz8pdq03n2xofozw8eow2yh8w2mwb08c7z0t1abyx9mxb05sr28tc0yaoe11rupe9nl7le1ig3ytdwe3p52u2izr7vhwg1fa8y6ix6nx1hy8a9n61m95jq35ed1azlz0ovj1bc8',
                flowComponent: 'ftb0twzkz5rukh1ubq1mgmcibiye300lqlspwjrfo5wxuh5vdw2t1s1dtef3x4sqyzoe7zqon1yc6ssjxs2vx7h3150bf9w6mw1vsiakb8so5r4yq1ttff6pp1gnsyry3xxushc3vgp09cvu1gwdgzii2uppctg7',
                flowInterfaceName: 'ryy522wiwdhynowbbm7mv9qtgi1rpddi8g1tw6howq1wdpfin144jh5sy4yywfdq3ohlqnoe9ru4eacgyg1vkk1n0sfc743jgr2pynptz59enqkkoyy291uhmhdc5j7tx4zp83qc16uh3v80umthdbcdqt9pu3bb',
                flowInterfaceNamespace: 'a71evrs7t24wqzej15n2l8lh42px4hej2ec5xrf0dmlc4f5jkzeq9odqicaflwveyxr2ygj65mrjdw08sbt9jfomxh0ukmzm5bfxu03pwf8yklitr6momtg3sa9cnandspdfwyjoe64dtboe95ro2ejaiveyl98o',
                version: '6d0fgqro5fp8lt53lrpy',
                adapterType: '7lpyuvnwtjwkwm849y85j19gjajxowh57ubnbfcvox7ueawvvq87dw2syvu0',
                direction: null,
                transportProtocol: 'uzg652dboambiofm2pv7rxmszg4enwm8c76r334vmmtwzom2atphqsmi99fw',
                messageProtocol: 'buobwhnkel2o1asjp4h4u9ac5mqqqr2302raal20cr3zc213oipd904hkn1o',
                adapterEngineName: 'yvnb2rc0a696coptzb5ttxu6a7hnh9c1t642knq90jahn3wmbp5batzbrd4qwped883rq28gt7rb0f8nqs1q0is7udnr9l7we76kxgf7lpkbjzkhik3sg6osn81apimsyav4b8egclk7tvsnnb5hpbjpkpso26y2',
                url: '8pvf3cfginpwf5d8yk2jwut38ho735cvt7f14mjw0j2orknmr5dqutydbu8cv45ee9rbmfsdwuluof04h7kong7zamkgz697ixi13i39zb5ywu4j6b545edic1k4t2nw5e058mlmaa09e3cst6p6zm3g6shkey5n1od1jo6u3i3anf3tu6m4sxuaufngrsdhxpmilfu350ofpwsy1jcz0qcvmj87pxovd116wb5y8mblkfcf4tp2ifjxwla3agb8zqr82ubj4qv133if2wqqtvuwyiem302le92ufan8zem4seabr7ilkiiaauxsy9l8',
                username: '2k86l3okdqyzrbiroend6qf9iv3de907ojixih2l3taul2rhm7rwdjv5e7m0',
                remoteHost: '0ajkxu8ay9acbrm2dyulouzcumlvmevgghcal6v9diy53i42vfz3fsm10q6g73uoaq5xjvuoao4xgy67pzch01pzphrvi4kh17sbxqisoxf1pmu08q8uni20gtpegl4wblc912acvh5daojgdror9rjb3d77dwgx',
                remotePort: 9144095284,
                directory: 'rlxpx1nbfscwck11e01n74qyjiphyibygbxtp9hdyofs1w9i5ec1kn8pnldpcg5qpji20s21ox4kt91k7zn711pb1wq8gcwwz1ko4bg4qqc37q449ih6kpkngk82z4kyzt9eqzmthxqm688f1dxeqjxtvt5m9ij44zlzkej4561mzfu1828wdrmgzdfrg95e0f2ufgg1wj91k9xj2lacq6ob33g2ozwm4wh7wnxyduz8mcfhcvvlyjd0zj7o0j8tavr008hms9g6bxfzrdfg6h9enkkosb3z62uph328irqwkb2ri95cbuog4vdjd8jp78qye23sabiycqllvwwka6g6t27x4t387j20qfuhnfqk80iynpi7uyeiywbczfcmf34j48ls3zwnbynfhdf6s8loacgmdgvs4qsmzsyq37c2s5h84kdm35ud7fr2uigrexajt80jgayg590vevqnhi0rv3ojpr4m2xxhk9uo2adlxpa89ccegfuj701evzoo5fd0hmvveyevqk79dnb68oh08h4bhyyy7ke0ogh8ytxshjbsmdhc9ax03uttoetgbj8bp718606db98w96vv9ggcsenfsckhgl81c6fwmdnv0czzqmy3rhn5lbxjlltgk32satnw4kiekhfkk6egthswwngui0az3tjwtss4i0xh3vc4an3mmf5k7lk8epudn1v4kob7ndziuf026k847alqmofuucwdmh5m8vfsyiogknoem9qspycjmntr0c4sfds0mp3186sx37nrikopxa68wn6w0b958ahtd88uf2rdrmdcqs419mt4i1s895tna7zw15kgi36mdqbyjfsbe235t0w536oqyuv3s99z8szse6lgmuat9f5ua2b1am2ao4utft1oxb68w2wgkq5vdiabogvr07s5qznmcxnpovaq6cs7eht7evua7ct4i1psm1h2lcev3vi7ynag4ac7xss0uac8ixmj4b9tuais8ddego8wj6j1p9qc9jxtgoeh',
                fileSchema: 'hivtegszwnm2702xd9ngrzujk43urd4jx1ec2iz8xw8xms5dx15hcz5w3r70gqne7hem8320zxbne3atigpue5h34lip8load6xh07tjpo8ode8ujnt19zb5gh83fa0jc9ixct31rxhynd1usxlcdz8x6emsabuvh0xu4tkk63i97n9s63ho52o1ekhzk1axag5xrku5qlftpz18fdv4sk204vlehx64e88mbnnqly0llylv91uqz5fxn5qpcv3rflu0y8skct1zc0sxcu691vb432rqjd729z552otd6d6e3shcy749979qlbhkgifxcxx7o338q1p9j95clqv35xfoi1t6f8vtqbgzyfuk08jvnfvfz3em5sbu5diw1mvoyjlr5u5m32su0pxu59zvtnahetmz9pzf0eg9ogc9utglc1kz0rcqjtycrx16kgohqc70perkbv9cj46ez6s7s5y501z8o2fuc2hzfrjvm7yy1hjgtlmu3kq4my3pd8djegtgohcsfptjv1zhh1t44egc24ius2gvpd61aa289xlymf6ylbden9qytgofo8062xoe8xsxx8nplxjle50tdcxnx5i39rls32z4qfgit2tfig9vzfhsp57ml4492jrzastlp44glp6vz6djppd76kf64t71lonoprh6068uqj6z59melk1y60o8oowqgsb7uf540z60eqjvqtatjqjtwm83s6if39fatuhcxkp3nohlvrc0z64s1c3e6yb9ly1ra1t1ke3of03t26kbqmcaslw6kyfstov1egejhfmc6dxxbjdrqjor13rkwsd9zetj02wkgbau1c6he867tt955pwi29mp4lswtmi4753mflsbv2fw5xalhi4p8iecjds383l5lecihtsb4e8nlz0wuoay9ht1ra4l1r5foyr50rh90mikve9bkoeknrd1ckk2vz72ufph4h8bwswae4todyf5fjhriydkgendv044no2vjuzhfqog267e4zdsdb9p',
                proxyHost: 'mmihm74mluxh89zyo5r7vurk6wcur0b3qnmdv4i16pwvsop2vm1lctzm0ur6',
                proxyPort: 3878616542,
                destination: '1i7zyt6xgz313ofyhcj9543ay5qf2eo045xy3glc4kc0ru13e8rx4yzpvcb61ujix6t7io9xl1vmflqf5ufruifpel599zntuqt5svj6bsx9uex7idtabm9kiqeu5untwg3n7vq3ef24pobyqt9cismeurpa2f17',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'iacc1arkre7an6a0wrs3xpdik1chbklhvagb41p3imo38urmbb2c21fvj4tfr1wa9kbpbico9vzexj1n919b9j0ms28jy9xqk8f9r0utgcqtjdv2irkstyjtwozxx3mrg3974f8n5le9uhwh9figgtr2ddd8rprh',
                responsibleUserAccountName: '7zshx7pp3c5vh7vs09t4',
                lastChangeUserAccount: 'qbotlj7bhey8li6eremm',
                lastChangedAt: '2020-07-29 07:35:47',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'wnd7z5x4pnro3gvahl2mtaac55zpjtj8rn8wii1u',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 't2lrpittcqtio2av7ug6pmg88jkf5bl228ywx7ow2r7bfre8jd',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '2m1x3kndd7ggelo2tl3p',
                party: 'o1vot5oooewdi7u4wo79sluo40kokw3d9cu6sr8gpj0m3hwqrktqagafdajnybrlbs1isloo74t0xe9owfd6xvzowyocrg4qdwo2s1wyiaejqxqhdj8ob58gmel8bnou9ch2t393hga1z08m4933d4aarhxxuaxa',
                component: 'cvgdos116i6hpaqfmerkr2ft2bnq4fu0oq3sjpxek64udgd3moph1zkxtystfngs4iaw5ysg8ha7wa0kywpvjwy59sqjc9plapxxw64o0fzescq0p57q1oj7ss2vpb58tq7qt8bthq9p1x6remg16e24t9fw7sgr',
                name: 'pnszjthuzxpxj926kshv8qk4zilsegkjfh3wrdqwg87zhmv648548ox6hqb4jucdx1us6fsd8uhfkzxc5yip03vbsr3qwegdeqjj6i9890b47efsqv2oeviu7kuxkg0dbtk1j18jjo4tuf8gnfxq8nybgx9q8xcy',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'glcu85hp026qjyyeoi7f6m35mbmyx2na9b0w9yq4u2kdcv4wo6s6mam0ivr9q9khubsxzf683slmmctmdxtzd2j3emtdynodyjr1rlgpm0qsv4q63kuax2vr8zho4wr5qgsl1e438bukoas08sevpdq3p2lfi74y',
                flowComponent: '92pni264v1lizacokt955qqmu5jzu6qc8uejvazkug81ivykwo1ipwwup8bki6x82baz3bjcxrs2cmjtpsux14di8oecn1wdjy9nuo09wi1i17hcit1t6m64jnjfc91prlqo1pwrv860ho32h37igzvv9d3p4j44',
                flowInterfaceName: '88ukuowkdgo01yclu4436zah2vd1drewo4sd0066h19yveo4mdla5wjsx5zpxh40bc3niapytl5ryy27nz8n8uuqq1i46o9971z4u4b95oicoi1ngmnac1djqdnm0pci207tbbnvygqk009pncbj3ul4zuoite1p',
                flowInterfaceNamespace: 'grocute3rmq8bklf95xc90zy9k8pzenlhwho256d6ohrgtfijr1mpfpqfe0u1w8jsywo1qf5f3ct5c5nhqa14uc4h5o039n9gth46vzlyl5m2rxke1m1zplu1nvgtub6oj2veq46vhg32oo0ajcwrnogh3l22ipj',
                version: 'c8wgne0u7gh7qqtid1fm',
                adapterType: 'gs7ej0crgmobtjmhrqun17k13szmdru2ribugawq0o2ypj32myj70qm68rq1',
                
                transportProtocol: '2jvkc9ey2lgoiiqyln3sim1o9gv27aymfy478upkuvp3jkybp3jqvl3kj4ta',
                messageProtocol: '7k8fgqkrueopkxssipqz9uil20ncbq9v27w0exg6hh1xsxhk3myzw82lj3bn',
                adapterEngineName: 't7e7sh8ohg41l9n1513q4691x67txhnlbkj6n2svqhxnikzalax9k74iu5yapl4pvonx869htztzsklc7vk3bpoiv7vxb6xbuhhlwljfzpptjf2di7sn5319xvw9xst2y8l38pfcdbbrl4vlej7d6kt5vxfhpdgq',
                url: 'b524n6te6rh3x35sb8jjc1cist2zf8p940ebn23rcindrzeee8vnu5iqsq7j6u8aqt1xntp8gwhqe0d48q7tpqa4tzz9v0q4xztg5t7tdgq5ut2rakm6pfrzhwzjugynio9sz8ihp7oyusbvn7v33f0hsqtcr3kr6jxcgi6r1o23zngm58ax05gu2tvfqvketymzcakg76dq9srm98e93z45bsi3khtfzle3edyccd6hroeqztntg72133htzqj2122bxbidow75fdv15dqu7qax7pa31r3qm85i75bc5oynmppncxufhxr26e8x06sk',
                username: 'j3vsmwmtfpdiila24wt161rh4hebtyc6zfq5zxod7nq5sdvrlymz1wn3ydje',
                remoteHost: 'thxw0uqxmckerlap5va5qe82r1t1oclbmocx57i5ei25uyxljrzhuow0vuyzu5q42rfh0vdpv1q5m8l4o66wqztibb4qslhbx79ai1q20vu6kdcgl8wsmiwltn5qaftitjrviqe4tw7ix4py3n5pd6yxccrjfq8z',
                remotePort: 8538569550,
                directory: 'ib8e20stmwuh7qim1y128dawx0uu52me1y18giped75p58g6b7x397nuoxs6n63j81w2b428j0qtx5297vpko89md7tz9bc2s7x5h73e75kv7121flmx0gem9vlv5sdrmol5g5wfba8mhifc7pevyjcz5n0vkrvy0kzn0gzk1ewqriim7qnwkr5cep8jn0hflujtuakvff8nwdbtgn5j45p8rybdhwyz8f9bzaapqxvk7gyvy0jazsv4kba5toh8lp0o4uchb7k1pf9i07oxaa4gin7wc0maffgdf4trqiizfjfvxq0wphzff2n8asybe2pqfwe2oihxcpuwu1za4jm39mq9hwdzf1ddyvo8w8okvel76yr61iq3odwubre25e7y2c6ncm3172f9bdoy1hx5rxdqeyj1cj5iy2l2zuh7s8wrg98aiq0qlg5jyyquvedco2chi8inv0b54xdef2qzxu8vx9tnrr2p1xd5qwoz40vjn3q64g3kykmtqjyhnvasstjjl4frhvt6vvv6jz1hgm5jyl7irxwjfhjpis0wuahabb77me7rudrc10m251zzra7259yjls8yhyer6kqtlm1gipyqw88lmpx7843090q5h6n8l65epvui6e57znd0qo4nixp6snz3v7o3yeog76xokmk996v458dpabt6mb3zdiqdue1gutvbn7qw3pen40bhe2daqp2l0iusmxb6unm5go6s0ilwwbd9z2d3ri9ye93moa951v887pegpxijlu8l23cdsxiwmc0d0h5e15txi4o28us8j8wgk5oyb4iy0y9j4fw1m5itoyuobp28g672tl9usi2ulufdodh24ckjgtrigivwa1ufcna5gjnwqubt95045jl7yufv010t5lboil2g426yfhhvxg9k628bnn9kbv9mxla3m583rzqde33jammcrczpxqf9pr7e3nhkg22btqjg37z44xeupxcohr348tabefggzfzc4jeoo9mzowhulmdh2eil',
                fileSchema: 'sqq7mlnnvsvm9okc4yphqux067kd5lkeewmrg6cz2w9ldyuxqdupemgx6n40wv3wmeno64qovqd6ac9tgbfvlhv6s6yhg1xwnc29cmvq0bbtge2fk4mdeh1do6ftsw26zneh3xux1gr1remy0iqfr9neybnsvke8o4h7po351fe13avbk32lsqav2zuhl871f2rpdyrf4vga56cf7alb8h5pdxutzyhig566mgqqz7shlgl9jvb1yer5fid1pyxalbcii4zwgdiwxo8m4iyk43cj8rte51ywx7i7ljh0vm37tw0ntlovcxkxpboe6ecpbmsvz96tn8nlijkavxwcmavib9gzms4grsf22752pl5xzwbtug5v611ktu8n1p8iv6kvc01yrakfridc3j57itibbnkfmkkas5ur4hch0lnopokvnh7b7310ipzgt86q31erjl3n12o16bn3nbatory3b40oqk59nbr8dm9kmcx5pm1dr6q2zy6zxzxfhlnpuivsp5rl68ydd1h1kf4n8jlf6pedh3jwbqwqum7i25x4vg4dzra75ibsg9yrari1owwplxbiu33su8andndc8kjgn1i5h5ju8an347farhrp6rnm1k05ly8fpz259onxpjc32e0517ezyfgr7e33vynawiks1twdaowvyumugyyp7q4wf4g5k5eap5uz2010p58h8xkognhot0gjrazkcqbm0i87xsjoz3l1zbrv9hjik8ljcbz57zhdz4ed1t3zo3rmfw5yge8x5pa3l6kn6e5oioaviyk8p53lvmlfkwpjamsf52o4naq2qt3phinblq93nnweg8kmr6x1showx8hc54kosrl281kb8idzkqeoi6f9fc5l2sdwsa9wlbor432b0r1o5o1k98ts0v1ajn5vldzivre90mt51tpso6m9ax1sa0whj3d180oool3ku8xy7co68l310fygo4j05eqvtnolpa3kcmxx37dj4utke9fka5vkbi96nrrykvwk',
                proxyHost: '93atbi665dodjkjga2u8x52cxc7cfvwrthwr0vzck7d7p40ywksruqgbqulj',
                proxyPort: 7792240540,
                destination: 'uuevfwtw8k0scxje6fkagdc4d52tx7nfvnyomwbcqnqmol49dmqrb9tbg80ekw2fedoxefs2c6z06sgo1msittbvwcmvapgsvjlnin80y8rjtleax57ainvkkqdn8397yh74b5ko7g8576sai8scj4c1705yzqcf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'smle7ax7nviaqji3329zi2rip4xgg37wiv5sbqtpi4kpj5yq1w3t3xj8qf9jheoh1li9vaplhk45431lnok9mnbe0a99n0olcsynce081lk7399gkivwr9qq45hr8cr6emhlc4gcl5xi61mq24jlrt2165oano4n',
                responsibleUserAccountName: 'szhkj8x93zsypwb823i5',
                lastChangeUserAccount: 'dy4tywrna9ot88mqnqk7',
                lastChangedAt: '2020-07-29 08:26:33',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'u8wg2msvnrrt08jdp92kyxehi3pk9771mhlem9yy',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '7ox1tjjx038kugef0zrkplzd83afvf82vb7x5vitcthylq81pq',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'o0gkffft6hxeodkybtyp',
                party: 'jyjrf9meczaq0i9ytz9w1ahzw0oa19tkmidnvgpvmb4wsv7z3lgygza59dn13mcr08w78p6y7uz7snr1jx2bqmldfaeuumy3e6hqytbx4nlc8ilqjnmka1g0cg8c3chj769wht0jr1v5r59o54x3yyc5204q04it',
                component: '1475ocbrxuuk33ru474n15n0r4llqensb0ki4r72vll9p4emhbszi8ifsofhkk7z7lhciczplm4su9i59suw3pom5bhloy9fgo5s4rqhbdb93aisbgni85qo89di2vqjzv1m5kgfbzrvitg9bqovop9huvl639vc',
                name: 'aifry5465gk19m6sxxoyieckjk9naaoz7cqf7d65bfyib0x378heqiyfgw265h0x1swuaypixuth4zjxem2k7dv3yzm0bbw1wav42ia44lrtv3txmg5sfeoq6tzitsu0mms5by44adja5gk5er3lqcr6vcg6qtje',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'cjvbcmrqknlx2ujb0lzbxscympjmlcc9li7pohy6cj7nu41vbv22dw0afte5mhk5hawtdjrodivk8do55p4swqihvr71b1hek1ex19ayssit1fls8x1sb3z4md8s889d18ehpnlysekh5en0xhgq9fwk91ua57a2',
                flowComponent: 'xajqk4zkfzgn8n3osmg3ujk6q8n011zw4nzj7ekruw82t4mfmatywy5m2mp23j76qxo9gjk703j592ty5e384q4wmg33uaho23weltlc1sarj4pku1p0n1mul3ha2gwbaknfopihr8cvwbk33jp3lff7oc7c89i7',
                flowInterfaceName: 'sf5ri4ze4w2hvf3bkyjbaqka7jo1714yjooyeijeq3ztyrbmt05r0f8zffu2ums4rl7ogskb2u0vndw1syoziqu2mp171b23p65zzuwaqwrf65l2b17z5op7dh2ihkuuce1s71wnle3rud9i52zs3471uqifp5pk',
                flowInterfaceNamespace: '1fkhjh8p1ueu8n3iuy79x0msj0npozcquqfr0x1a8inqmar5goxewz4jok69emjsakk2289twq6fvackl7nh1pkrehkp7hjj9mc9blhiyyldyee09ew4w8nipur7gzcfwslnrzdliq5cvirpe60j0tssbeu19hg5',
                version: 'yey7q1dxyzioo05t12dq',
                adapterType: 'rhbrzzvb0hximvzxbqu8qzmohs8l70jkzurjrmfc5cjg287vf05rbiufddzf',
                direction: 'SENDER',
                transportProtocol: 'rkgc9szfrg4wp054mdij4ldlhqcn7e9rs2l62lh1cgm5luv2gemdwxok2x8x',
                messageProtocol: '5g4u8r48j6oi1w553403znybqdlinz74be4lrddsslojsy3a3rx7v75krz1z',
                adapterEngineName: 'ukmgxsnao6s2y1li5guma16luzfa7icjeuap2dy9wyb0je2snhspmaz1eutv6vnmhi1t56vhoqvnk8l8f9cegn9svtxlebn0gckpouwalen9uz7vkpjff4hdqmjpthmf5q9hk2ytewfwn9ng4zymad82gx3opsi1',
                url: '0a557wtug2pc3nm3na82ir1gl9whlgyzpz7aea68pdhav607tyj5ui8rhoeiz03vy6g6vl3cnajhmpy5k3b9spu5mv1k7sp3als86ef94pn6r43ilv5z16hw76kjoupnwl50qtrvtuwjnq9ppuqsaqo8dvcuu2842km4xk39568mxts2cb7dlt8r1nva4fyzuyva0rlqfkywh5l2ks25c7u40t385x3qxtbyrxcgzng5ifi6st426bfpetfz53dxqiceb5udytg2bwieq307ykk22d2xprcumh2w8olpsxmih501l9arndyearn36stj',
                username: 'od8nazgwvtogobb5u30e0a7v1kikkrytysg3av026aw2anb0oddjp529bxgh',
                remoteHost: '8ejx6olxg192n2e23vvafwu18jixk13jiiz7wv9rir9zp1ngcn2yoe47c29x8thwghdsz25yq1eic5crwf65evum3gpmtqzdu0z0mop72c7cdngmuvg5m8ts3hqjcqsvot9lw3xen31gvqnrhsyklk5tlyj1mc7r',
                remotePort: 5921445995,
                directory: 'nw06mtobojpipg3s6we48w3ma2q94iwwzox8edf5xyw2oa6kek82vgvab2mzflno18gzspn6xxnf9uyqz0hv32jnyesandmsscsklbrvhtbhlj4u5eylsph5xvc91o88g0l2nc2e9689yb58jx0oa57broehdjrir35mgk9sas8cu05lii84y6vdqhi2iipx3sj68380ty28mceznyjgvkvaveazuvv1llrsr7tmo38klq36i8vsbcotyyotmjl83sprn1by0wduh23a5nxs146e2dc5a1uix4vxvvdn2rgeezsc3s031e2yzu4a3hr2a1odjbhiumg83h89w1oqg2lj21dsg4165ssgwdxe8ik26abl40pebbsfv2c4sxz8lzbth6xmaefx6z6rlos1j4gsig6gfz8lym36yrqlrtygp2b4vb0krus35p1mw0uc4kaw2fjs5aodznortoudl6kg2axpzst8add2liuebkfb5grrsbh4jg4chp3wypihff8hfkp2e5hya8k4mjbwoqvmo2djkvn14t56nfqnnh42d4h4pyc7ikiqws0oh1w23tw543hwe9d8ui8rqfocy5355y2x7urbapcx68p7hj7kk603k2tqtscs2sm0u35elsgi0yv1wn3ekvhpa1xne3okls0jepmzy8hzzkmltovejw1qj8tdwq7u43knhhp8o84iwpdbup773mekh5yqhil0ryu1zr1s1uxgh6empblz354xiiecmucv07wc72so6tbzh8am0j900lxxbqdxh7q4zlm5uu21m29p2cpj06tzjhyeb0zfn5kh19cctb4fivc045t9ncaip23dk6qwvht3f5dykoy6d1xpfplz5392b785npbefsnjerg23s8wr4zfse022xmpbua8ob98cuq4qxqhb6h699bv8p7e80v9ynppergyi845y8z9p1k72b4d8ziq97r2ci4jl84dmlsyhw66seidla7d9rs3amo1glyaaq5v18b3pnj9va05',
                fileSchema: 'wkujnykhmusql5oze05xdsvj7ht654dy2wcriyihyrpxcl569xhi3u7ff81bi132vznkhk9lqc5uf6f9ub55vhxoy2bn2nw9aqn5oxpjvqvz17ossi6lf5rxcqq5eogi0i6vby4ap93b53uy9qyfwohqfnsu9zd2sfc9rmxvottrceki8ubzb3php7zwu0fpn3jdgr99m5ia5xt7b3dh2e1jlv0uppkhxtcmeqbpks3zcjmdpnziodsnf0q9vnxxtz2mf7dvmvphzv60cjdgsxdxmng48g7fdycqfxejbg71ktjl6fvnqgyzcvwnoim5y78gvtuh8g51iapv3lopk12j37yxap3tfuyu9dob90cnoim4v04lxdvpnhnpl7lal1dz2k4qltbym4umon2t75p4hiunudg4v6i1zebmazbjstchd1310od0nvwggfrj6kx6pglhhecy0ydsj8085eb8o4yqb3fzq0ngi4z21mao2u7sf9bq53sgcn1mkruelhws89ubygoxg2tg1i1i7guqm6n81xsf6mmcjolsyyspiewicd7bhhkeg6r2gsy050hcu803rrw73qarr9ebfo2i33eybnobaod4hdd0p1vq617v2w1gu5q2ij49vadred1l82fxw3jad7wjwdup8g5qcj9c73cqg7fm6dc90r9131njmbimm0qpb3o68mierhrmhu7s65bb8u7mp19ajkztv4z45fy9lzfwaxapya21cvp7ldweadx48wu3csdnzqj9g6waqzpc9ym16q1b9e7ew9ibevmedk17m4k6svwmesltig5ouuuz4tut2k9r8f99cnd3obtatr178j9l6gttviywmr1yz3e2ao4mmwihpyetqx1ugpvmve731wg42dipl5rv1a01zlkfbw6hf6b3fuy44pdj1f5ne8llpv4apzbyldc2lxfgczhgzn8mfqpm7ppk3mjn6ns8j2udeixvkr1eahfhz90s04lw20uccjwyk1m6sbhxcd4zke6i',
                proxyHost: 'aux6nootnsajpfhpsvjqeipewhf9oifsdt80hr39jphorljr86mxqubsm2ht',
                proxyPort: 1759451411,
                destination: 'oypx4i3red8sfycuhlpmh24jqr2yfuwhhq72x91kyqlcnuk9qf359u5tzfbgop2y6pqyrvr1yh97tjqrfpwgjvuqhfnk8txkinxkwud70jcqk3b9yjf3ctnoq4alhovr4cnulba5ygl2xszgepwtvek46ym6sfax',
                adapterStatus: null,
                softwareComponentName: 'w2d0axfa1l03mnhvx5b666zccu2ym7mb9yny3wcrjdz0qh07ueuqkf9x38340o71zk04d7i2zgyxp9pltoedkdw2g4ndg9cfvy305z5hecytwhr7zvdev7v3do4h07k2kxbqe2y6a6g4lgl63w8a8arr2j5tcd41',
                responsibleUserAccountName: 'gcu3yt07yysn381m4zuy',
                lastChangeUserAccount: '8u74e16ls8m6ttcrslzp',
                lastChangedAt: '2020-07-29 05:46:08',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'ieszhdsfbyxry1jthroay10h41ebspisn39xbkd5',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'qihg1cg4a8cqkwexc977akh7nhgs8j3h032yt3ykdb28r0fref',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'nl2eis2k585nw1jyfquh',
                party: '6dgz5uvo6xaacidonxbxfb3i7husej0qk80lwvpgyjp5w1sccdh0aewszszv3f7ufj50kkekzg13dy4hrkn0boriugtou0z3mpqpuxkq5qaackw8pcp5wnamqmthn8bsm8htqcyonrtj0oibpujlx8ekrcuvl69l',
                component: 'qh6e6woz8d42nd87k5wnzlbz2t5qx3suieth53j1q919l8d80rxod3ht6jrqbrwy630onk2rhnbb7gurngmzl05q0db0tbuf4n0pe183zw3cgdzu4ozv5a49t03nzof1cnv3bn9l6owqxahxs0trqg765w3hl12s',
                name: 'zjvudd9qogapd7cp7eja66kr57k93nird6djqo9qmu4lz58bh0fgtxpf4v1v74g7pp8614rxybasqj8sm3k9paev70acy8xnc5c774ketp3hdkqqmdyxn9alchjmcwdgzgtf54dkyp1fwm39xjzr087vxv8uh56a',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'dio8q7ea9s3oh9dgrarq3g13gibwtkm0qtzz455bqt3l5u1q164fm6o4xp03os7bzlesnbs0ofper60q08epkvlbvrlf8kccgzq44qi17fpc8vby0u8bk5yxpzg0t90h4i3fxhe65yn2her0rw4ftzvnxpxoz78t',
                flowComponent: 'm6ybv8lx8r4c9ke71umqbluk9rbtkiykpw0t3y1vumvvucfbk42zwf42ve89nlu0syptysax10ayuudbautlq69paa59gn0xu5x6krqtglnmnsm4u7ip12mw8h0fg30ty0nsqwv1cfp57pohfps2i0i25i7esp90',
                flowInterfaceName: 'qxuaq22wy47cx9xx6jwf0z4d4iv8f1edwey4ilizewgfvc4pln05z72b54pur69w6y81yas1rzzxmktu9udg77b34rxxdtjuh99atpxdzbx1jv2pohol054bli7dr9pjmhb1r515rj9h24kosfinodtc725h0vkc',
                flowInterfaceNamespace: 'w9j9a49xh88f7l2wmvvnqeyungez1za138t3o9mli8ysj6wgzuyze2he301wm4pdfenyzhwmnha2k6666h2j4vzb88wv504owuzs56irqe23wef87rmjv010063lt7ammg1d31ucoga9u13hjbwuo8apy58nj7kp',
                version: '0w4ik0jbwaaqk4he44ww',
                adapterType: 'tvqfrlmvjqxrvyvt8evg7dqzrrxc8k9vc6vlcxs7n35z79a95xlmi9rexu86',
                direction: 'SENDER',
                transportProtocol: '55gp445g9ylmm52i0s0ebx20tjfo29ynsmwf1qkdco2myzav0u5el9ijoptw',
                messageProtocol: 'kkxa5rrri7hmrbyktut9o9vql1k4vs03qo2cetb9brrx69x49khxjvywbvtz',
                adapterEngineName: 'qb7n623dezlfjtct48lu936tt23e0sy8vov919whsc7zj1j57daeouumir4jla8hpwabuyat5f2bknpcnzaei345fyr0a1dkaoaurl2l4378suxokmkhrjyyujnvnqlfds0zo8yujb0ksywcniiumwbb9r4c6t7k',
                url: 'n2knskdvwf51396fcxqetyubcd9sz06om9b0xonsyid1g1zd3mpeu6c3sonx2b5jjvxgyfihzma6jz3o9dt3hle3obolag26mfv81nu5ts72mczgc1568tmx1akft96qyqhm6ylug5v0xnk8h8snbxiqvt5u3furf3u9vh3e54gtz5cegjaqo3wy5co7wpti8rbkwjxxrii4gmlt16t3fjltdwlh01t8dbh96o92qz3dqx7tgfybsaynwihkaja31ps6ahdivlxyt4su75ncm3jk5rg90l7tia8f7bbhbru82dox38zae7y0hm9eg3sl',
                username: 'jyvb66m1w72w87anwl0cq1alvmdtgujw38kmvd2uq6fiwv4g2c6o69b68hvp',
                remoteHost: 'lvqjuu03jee0p8u0zo488hozreohk9263iujxo5jhpm5y6lou6t3mp41w3m57zpfiz52tce78plnxp1qfw9d2a1kb82pqhiotzm2ael23up9seigrcvfzyy0jogqtifru8hat1kj0uhkuflgcl1vj5jvmz054zek',
                remotePort: 3532723704,
                directory: 'eedos07bica2ne07oma8alvk6273gdr2w6k0m4cj7sg3msgz0h1da92wfcdvut48p1vclkbwlixfkwk329wshzag7k292c7rw7e70pc4c353fk2mlua0ovho96uzchsksdlu4479jmk9al1t8ygeql7rpxasy0o68nvfipmtfcoy2nn2jswj4s6g6pdeeacfyc48rmlrgaddn7sid2brw6sfoyiaasc4e5ltdkskex8lcfijx6lkr2gcywuog0ntsr9eky4wdse93k3yff73bd5exsv3duvl99g1pzpxx09fdsxjrllfbwqrkbx66pz6ro4hwnoq118sx7e9ba5y5s93s9z60af6zm8pznysbfzaxbnnvy330rpjcxv1m44c610h4z77avij01fxpzhytu9z1j6piz5xbjtgdizvxlx0wj9vokgd7rr1ymr43ojoxxzwn29d7znto9obvjqcgln029j2r7k4zgzxr6sattoidi03sohbt7v9764p93nhzvqqvcbzhpmdqbmapfd2wshqt422j05ifc0h8shyo568s20tcecv2xr5qxpxxi67wmeqh2bml4u08ungoi6yu2yl91hwxua45nr17ney8g70u9p5d1js4xukxooxgoqztkp3fzjyq9kng79kyccz3ovxz0sol04o5dco4fhzrtox0h2m44lz7xbgm8oyx258m7sf2ych0nm8rqhlxfkdfmmvkzq9kyufrstu4q2tynsg6ag7nu5g92626gkzulpjr9njzw7anyo1hi9pcifxnylfp2uyn8fl61uea9kesihpx1s3wk9gdw5q5r7xhqftiryicmop1pkirsqne4uilrx04suu542rkcvu952jo4tyadzbs0m5ou66ozvuvu4oo18pk3daw0zg4uu3heao59lolkkca8g2ehab74m4psishg6a2ux3gm7p1o5ov2i5n2q0gp6krc6umntoya4y78lwzw5f3ns1qywsv1ouxjzc1uhcsa9xipk1ge9kaht3',
                fileSchema: 'eiuit1e3fiokjyrx2iwss3yfsiz3hzgf3wofzv1yugtyjrsyl0z8vaqvz3gg559yfdqi48ljbnzi29t4cdunbrq9ndp0wnhnfksifkphr33xvviyywo5pylbig484gzckw70kfgivbs67ajhuajru3q071ayjivsicqoi1c3l40ur2fayhkj35tpfkns9wck3v5ulwmtrwibgyj0qv5fpc1r1qhk5zczpd1g60ckx4i8jha2ao6890ov13bq4w9tby97o5r4qw8a2vuga5p5b0cpktpaxg7i21o4itynb1ztdpsmp8ppiuaye61jxj5uzw6135i9on2rg26wa43qv61oy6xcriycholdrwpe24qe3o395uexe5w1yzycb03q51fj8q55v1qqoqghsotxydqk9ds7jgmjlg0l5k9t65gzvjcq0uxpakovpkik8w74k8ss044klyvx1nw3rrilc5ldbn86lyr9n3dcd87vq27cpvls5v1j2ll09wl21jrc7jr9hpxafu7iktdlqu2ihyjiejm77liqfjwyzcrqt7e18w7l2h1mk2ux0e6l316wjl0ne3u5a09k9nl9li5w2rrbivkf1c2lfecze6d48ehlqfx78uq7hs1l8zqhpqmblcu9hdxuev9ryjcg6nt0o5u6qinqg223mqepdytm59116ctpatxec07fx1mue72md8sx0hnp9s1vnapevf1vrc0n9mag9g6pjm1tr2p69psh52y4bdw82a4vwckw60umwtja6fq9civcjif4e32elx4z3smizytaw606432ugrv62i3bt79a7semgxt5acsa21zfr5mlzs6473a6o8dhnized4ittq4dxg5wqmz0isnhslbsey4ou61tj7mztshmzclx1mfgwo4nwj9kxl8oqj8xxc5n6ii9np24tywdrd6r1bc0n7d40lo3huur2yhbhddhez1hr0vh34egmwloojr0qpqzbdgvdjjcjfum2nljdae5x27y11zzo5pz264o',
                proxyHost: 'fyt4gfp5nte8ajdw23jg84ghcawzdq80si41xerilh48ug9a6g4wh43wknmy',
                proxyPort: 3784541480,
                destination: '9ge48inu3wwvb4g4ktd4babw66qai2oxrbe0fjymvagwdmdn126m0z5oinh1mdau3ysabtr2lrss5g1jctd9vo6w6tcwrarwx01iu8vsxypnjdodc5tz0ymk4fw5exgyno1rbtg2ls32grgyrq4bog9vqba8i70i',
                
                softwareComponentName: 'ojtthfxen5dcat9g3xdmcmbjem1pwxx5e75pzernfyzdbtmbuk4bd8lxfytmpy9f0cybjbzjv549p5vwuwv4d81t98q5nixf15m2b2j4o7lmsyhpyn7jtza3rayetz4oqcjs5gwe0ntfvb9jxk0hrrzmrevz2h08',
                responsibleUserAccountName: '5fm4i82mg1qv2yl9txpo',
                lastChangeUserAccount: 'h8hfvzf1ea34b0zzzayk',
                lastChangedAt: '2020-07-29 16:18:38',
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
                id: '62yjecfg1ear5xr7630g207rsrt4f8sew4w61',
                hash: 'ofwnkjre94ky2swn6njqfwl076iol8uk98mc8uzm',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'b1f2l66obvyf3ausq93afo17zefsoo0t6fneuhsb6u800aont2',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'v1psmfd0s3lck8pm2ec5',
                party: 'zwzu1gxxxbszp96byozurlr19qpfobmhdftqxwruqfac5n8at9joypv81u7czkqlockmmkfdimcn2zyzexypg1xj06v82niav3wfwlnbnozb7j4mk1euujqhmcwfagcxquifqhah9mub5toa7oeehzpi40x2ewen',
                component: 'sq2yu2yhy62t65lq52o1mniirfilfa4h6rg3sbuci4x9u88hqxz5mf3t8j0h1wttjz6txr8jhu3sngchs05m4glpa888dwfr5geq7nst55rxdvr0ms8jratkj5momwmgh6jvjzvdqdbktffypzc4ycok511l5tvy',
                name: 'gslr4n2viq2r2rrb6qhz7rx4jsz87g3dhak8ew64tkughq35lvg64fr8ufwxwb4uvtrtrzt0eroiiw4r25ck1w64idlhwd2ecyqgu4kz812l6tceuvpajrbqs9a71kvyesxf1nbwic5fhs5s7rr4fn9tnhz3ic1x',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'xr00havous64538po7lu18cmp7uhf0wge4yitizb7knpujgatgttmqgi5ns2by8sn3iqhzvwa8jrjk3oi4jalwhclmgsd731iegqs995m804qy96zd8wzw3w93odlcwvql5dfw7zpxfv96c5abcny9tlzth3wr9y',
                flowComponent: 'z74xsq46tg43196sqhuifknn07el7whu6qqruwr4hwj65wg1ipw3ko4269b6dt9w5fiakmo3tgpjmxjb0os887z4nsczzf7x8cgda2ry9chcuyantoyqat13ufz0iv1rngb8l48zrqb0wrcmgb8jhduyl8vgspcn',
                flowInterfaceName: 'goorh3mlaiqpl84cid8wd4jy84ckr2inevzewgszwv7pc05d7j2wljv52xaymt1lcoc31vwiywiaa5ap8horct4qv48mt5rh8qq3rvcmcglv07qmtxmolvioo1dvojpdizdd9enleusqrm7ngjes7qflbjcq4goh',
                flowInterfaceNamespace: 'tdo5gmk35421i3e3so4gsj9n8antjkgqnlnivbjqtpoz7voa2zqexz21qn4rl4jns3jebxewd8aisypp941bc5p4ry1knu4usvnird22bc0qsco9x03xj4fehieruyd3qt75a2bfoiqq5eueg1qwh1eu1eg738i6',
                version: 'hvy3r9uibwaplhawbyn0',
                adapterType: '7tyinqqglf8dmctlqo2b02zqyuqdsoxegn253i8f9t325ntzxkzer1rbvfok',
                direction: 'SENDER',
                transportProtocol: 'gnow1x8gr7l790bd6n8eq1cft1wz7tngxousa01ca6l87nbfac5l77xms8rl',
                messageProtocol: 'om7rsytt6495yc27buecrzu4goevgq74jw6t4chkmdg5xygg71yut1elmp3k',
                adapterEngineName: 'dgecli8vah9x7rfc23qespmva11omegziytpctmd9rfo6ieg9dkbwfi2c5tjg5vwx082ptk48x9v0xikrrjqn4z0nqprgifq92om1g0l9018c0vzrcyz3lo9mbgts0hp708qhob71jfaauy96q82ixtat7npzd16',
                url: 'zj1dj2w4k24mmxr5tdokmvlucbsup9ma6t2xcaztgwypei6e9s4d6oazeh25hq0ra699dsomlnq17suoee79vlwv25kbmy0r0v27p8k64dcvonv27p3xent81osndni6mabdes7yolv72lka8ha10krpmoqfqkhrmo86ikndstylkyjlmsv5jehysilmuxevy3omveyw6rsj0kfb1l0krwffnkm18jo9a6lj4tdpyiipi0ucdnmv8hmbbl1rjfs562cfzeyajdtrs0wy678ox2pmn9f568ej5j4u3o3sxfz1b2b36x97l00b6o9p2b3c',
                username: '4h0e3mu62rmhsqj3zbfwaud2mgjgpcxsa8ekmval22y046d5ssfse1cxb2q8',
                remoteHost: '2a052ctxrlpbpnednzv76zopz5ljd0xb0hhakhrabhcpxohczkvmx61sp5zj10xfxankij6w5k42y77u54oaonh1mq4qrvgs9kqn6fybhr48ar90atyjtokwwf2fzn542yc9hgmoh0bdm7es66ycz22oys3pvrpl',
                remotePort: 8277883283,
                directory: 'mw4fxkpshv1uqgzycxmazu1xffk2arhsn1bsrglc13pp90zi85m4xsdzrbh0n9yxmwkbdma2w47ayfu57abfnxojvubrgvqfd5m3fo0a3pafjtgxpoh69zntwttln9paxu9kd2h4zw1tensr5aj7q0awcwc6tcwildvmzjkvs39xjrjyjhbq8a2f8xjzim3efc0vbk11oypnvogwnwq4ko8pt260iv8vn6tq96x4sfur03gbcwja92vjz5s3xx7ulu4xm1bif0h0in354hap15bksfksel8dz0n806a2cwt6pixcctkjq7uh7gs1f4ba5oh8fjp9s8925bitimeaka4aipupxwdobfwoi2ax5i60zlhxvc2yifr99gtj0velh4vhapjev38grkqa1cyzp8pnhnrxmbf8d6ohd4lgreac3akxfjtg3tx8scxn0jx2k8eaukz306mo0psv0y90wp9if9ngk9857eg56o093um9i92dijkawlqjhbq4evdtq6omr640xt1flsyid8y1ylrp9e2vvlau1bfwk2so6r2tygqe20ky7myj81o94jp81f37y2pddafnwodh6z0oji1c2k589aktogoz1y090vsumlba98w7ryott5pg5gwr819pclfovip2u7536ar58dflsc4okifgwfbbw4zt0tt3gf4yjfam7slm4rk4bmdncslz8afbl639z4ivp0vh7djqn1d6pa0bvf3zbdmfu8czwbm695d2pbhmgev3co9u149oqmsuzw8f4ap8am6eyor1otxz1m5s28a9j6yw7crm3g6swzvk1au563rymcggn2t79sp190r1jv0jmmgjo3zz7nmucgkkpwq2cy5bimubz2clxl8daxqjua3mo9cjbyts7u3mhjgmkqvd7wxbscozenlxrdkae01kchqvxftsmjyvzz7w9igunlwjuasvrrmx8q3tfajzsz3m1nu5y5nwk8vfy6swa0h0e13wh4dvxxy6raiyz24p7yefy3uy',
                fileSchema: 'j41q16yrda3qkuwxnsukabfyawsi9r5l4weqys2vb2v6u3fqjyit6i6sh72agva8z14y0tikllbejvrjw4alp8103j8uzgsx52gi3xdxk3lvj01ctb0orrtehas93oy1uyemzfpzdbwssl1sgzckehezaavqcauwf9z4s1mv4majypsjxgod4q12avwqj2odp106d2mh7i25ar05k9c3qhpyq1y33glb44ejn6l7mpqwr9a53ucr90zsyt81hjuqb6knjkji8h5cymiocf729mvq2ukpn07ghcb8y1zmblzjade9f9m7ik0tial2qucr6yr24mzg7mvb5ij51hj9keck3rcdj0ereupqq3fi9dxorux0if1tedjqxf49kl6u4txhl6vl9awt2c6ybk9z4fvsavi1zp1yizot0g46avqlvw5t3tiyw543q3sxclaxi8b6ydgv56hej2iulzlbt0qvekvuzj31v4f000cvp4468k4m0i7lz2hv8xq0zcmh9tiqelayesleprwl5cxazcgc1rfhamfq2g1q17mbrsyu5rtn5838koe70ma25glq3ece1emntbwjh1ry22ncd5jngnuax5rsz443tfb971u1gu48vg9fja6vvnraod2v77tzi5t80b4iiofdlkraoljczmoumn5qrmfvpe5thsugk3qxnr4tjottjxn3hi82p2u7xmvxg59l4hcmaouvruhktif57pcc25dilwaadmls3qpufr2beati24s2f57syvo9n2eu7sqh7envh6v9brx5pm1j4p2r1gnorspehw3df7nfu83p3mvsso6ygsjbulfosm6i5rvyrvx993wco36icb2qks7z4odj4sfd8lj7j0qlvea6ozudx6o9pkq1jwmbj600awpjlhu5b251hggk7xjexvi3enskiwsf7hgegsl7uq2im78p843auex2p15ieft3iqvg931ufdebdmoomf3cq2v24gxreqoaz6cu2kwngx1vunojdmylbn20',
                proxyHost: 'n2kjd6tcj5pgbiap542tnyzk921uhh4xl2zdwfxh18ql7nh5vzdozhk1qerl',
                proxyPort: 7985562091,
                destination: 'z0m8bkefdgm9o6x0gnzaopil4vv8r0z6pcuiwigrumqo7yvhawrh1wtnzmjn2x7vnix4zwdtoyp8z4xhvx7l7xiyi36h0bkkqoxbv8aozbwvl22azez4comf3h4ouse43s4vagohh7mg3t6ijklizr0bk7odp75q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xcg1x1t2ofmarm94s3udvd2oxtqzibec816c73srvoa3ugrcgrwn2gxpunwqnxzdwzcujlp5wxwyde3ez9cfwmicqfmyfl14wntvv0oodggnfp2txc5su3k7ksefkjkd4tsee9qagx1kanlynl9kjn3sxmxh0b8k',
                responsibleUserAccountName: 'm7gk7vlr00armf6n7wj2',
                lastChangeUserAccount: 'tu7u12a92043vygtngua',
                lastChangedAt: '2020-07-28 22:42:58',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '8o6lv7qrqylqfceye05sr9q87ome3elnurmcfnn17',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '6v7yxbgd3163vsfatr9ekiqndg7c3yphz58990o9cpi4nu2gkh',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'a61btldowivnv1ft6azy',
                party: 'anpwownrl5ig4x4kiobwvu8eoxdtobaba2guvc5ubve6qb8bu24lbkcw6cze6ux5hs4hh1lrfggmodl55ugjq57x50g7dvtiq42x7jfepqwx1d09go2n8gei040nnvy4uhevyidw30iokxp6xmpwf59a24336dlx',
                component: '0bm573ti2lj2v0yfdc23bux1aq9x7xlhr97iqg63wpvhmuftyba3c10p9qo2mjnindot91x75zmundpfcuh3c6njsjzmfrgf557gc256h3g907nnyc02r537ix0sm5wlfpd3lpdgq3b0ac9amyjfm4bcri1quog2',
                name: '67po61f3sgo9v9glztzxe9xc017wkunipo8jmr4786767kezf8t4moauttt9hhlt1zc8edyn21gpo7q6qfoq47lu91hieehdrb9rwxv21w60u68dk8v8qhpo7mdiz5xt2nxgaxx5jibjyabpscoci6qd8jt3mqqi',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'yi6yzcs86v2nk5wm0tjcu7m09r5grukmggwmcfx0g2yxu1nt7kiy7exxcv0ad9h8nfg8k8n930buvijrz5jkxvajxpoke3ij4ndgdpopnc58609io42t7a83dyyxt40091io4n7yai4wqm4dr8kerqc6bk8dkl3z',
                flowComponent: '26xab6lv4tumi06tcywwfomrrbo0dyytqiep6o2xa72gso0wmj2p7q6jvcr4peb6ikli12nqg5afuouc1pyb2vj8v9l1g16bojbjbc1n45faxyfazpq5cah4cwjfxxv4dizzo1szoc7nbrtfv88cndrxh3mp5iqc',
                flowInterfaceName: 'alxs5e9tjuob1o0due7hx2c8a9iwsd4xtic49pla5bevcnmkjm6ithrkxrry6buwh0m31a6a57qbtv30y0weg3mbldmwh1laf8m45exj717ata0r0qcsn0r9eqtco9v81cax0n7tl1hfm82eigu5kr3aited6dnn',
                flowInterfaceNamespace: '12xp6danxzobly495io3ihly7xe1o50ldaybs7sbhpzfp31ftaxr8kap3a7htvakwuj6z04nnqpy0niu3cv1bc1zg4zr7ixaa449duxwj07cgjkajx0mvoflfhzmzupwnjay542dgke76a2pfofbhr9vywqv58f2',
                version: 'zzuigteo99at255957wh',
                adapterType: 'jhtdk801l6ox7sf55hiouy36klnd0chlrw9a0tw564m510zn9obidw759uvk',
                direction: 'RECEIVER',
                transportProtocol: 'b2hgbfhit7gyq93l5vwiu4xlr0pygzg2ub7x6oc70j4lwuwaim5fbpanhq6t',
                messageProtocol: 'y2lm4srggwah4j57sv88kkck2bvlc3bn8htkp0g1n3sw39s9n9vf9onz7vcc',
                adapterEngineName: '3d0s9rc4st74pnezob3yepcohvednomnqt999dirtgntyiacajhydsg41dheuhpp2lbj10hge0lkgz7oub0ipmnvir6pvyzemrcqqrc4vtfxf5rx5vqsqz0xnl5suzh2o1xhye7kptv5c7xxib7l64dng7vpatlm',
                url: '011fml11urcx16y3w96715y7bhefq2e0yhrq5pb2la93qhxxi63ecvn0lxj92bjn6wdlpgb8o92r2nzlxsallncilnzf4uvtjz1kg4t71rsr5popk3ozekew3ann89y83twtmy6i5v4udipxtz2qy4o5ipq754h4rsq44msrz9srgd97je3ospfvzbux39ikfyloa131di6gc5x3kos986imspe2fn2nr6mwwo4qgj97gcazatsk4u8mpr0sp3cwk6ozz9mfhmqmu9xf2pzp7ljobglm19joyfyhlhc6h6herzkdr0kaxel7euk25td9',
                username: 'o8ghf7ph3otgsnbplpsou9jz62giihbjvdbrbtt8w7yn70jng9aecfzfk9t9',
                remoteHost: 'ql1fenez5l2klyh3lznvvfo0gvg1fb01v24tk1nsvtkftf2vb7819hmyntbtaod6t5nytyfryp090sh1ka30ih1obri943p0g9h0qzfobekccsvwd9e0t3z4ncx73vcg3u5sp09n2zbmdocze7uawwmfw8ap8d2v',
                remotePort: 1720604804,
                directory: 'turq4fdneu2ekr4kl4opdg83oljmii6m64gx2ysynyveip228or73yag0ugaj5oqo767sq6fcaq5a45hvg2kp5ii7pedg7v0vda3753m5ph8hjneje04b480twn7ajn8wquat7vdz0jml9khowshrgj0lj7dikmg7q6o955dmrjk91jv7cewj1a8hytv1edwew3vewr1roe115fny7u0bp1zdkxfy4tulo242v3y4a7hb6y54pgzakw33weqi03yllrt0w91jk5h2gymva6favgl9q5q6pwuwt8bxerr8r8iw9tenud0i4gcm6wj1qw7tmozu2hrkn6ehboyquf9nt6yqex0el0j303xez74q25eronypviqp8iqga9q91eymerqq1rvt7a7v9ntm5kt17g06k4bq19e7cnthto1jh999p0ztqob5lsxh61u3ickebuai61yhinhtttuddq4r4eblkpkqblowhgl4dcds4g4cctnuwjre0ccv4s4edzpivt3o8we61jz379q7ifwvq0dak9qvi85pb8g3nwgc8oja5b5z9us65ckenoq9sm4x0u0c7a0rvfnsrrd6vqrldlxpfubqzojxhk6epgbxjqi4nm2rx9evzjnqo3fv5quaynhnhaoo5tvu74l39mk52i6xwr55bjtp33y50vsxe2q4h3ebe5766soj9hsx7obws34t26e29qcqi4sclgk2npmrasokwh9yszk1mooq5n0kwkqhbio4x78acrtquhcdmsa4glygrg0t7horwmxjh8q755zd14ytztc254pem81t38cf6aicugkx1u4br7iex6yssknxr3kz2f3jfp8ns2zljd2fzrtyigxovpf0dtkq9f6ovqerqpp0dbe5rv7g5kqegiob3ktv50ll3eywshffxhnsqub3ea237fzutaqht8w5kp49hnm3r92tr5nioql4hq5ajue6x6gaccojxvrqd62dwy0potzzudrhba9kv0ppvaqah4cheu3ydsf',
                fileSchema: 'uo38x3gi6reduwp2hd49koeri2w4ki2kd9cfjt7cnq4i7pkioqsfj2qd9hvbmh04u5byw6m46tl294z1nvfoz5imds9up2qauomko6f75w8de9pv2mdx403sv36suv3okaihtba01dzand81660d7xovn07mds7rjwn16jbjgtik82duybn152i46707zyg9r8zlk8864ronvhz1wvis8rgszn2n8calsm19kko1uat4p2ckwu53o6r4llycc7ghwc6gwffnfgxrymxqj0axndbj8v4cz2co7y1evxn2afax44y6qws3i03smq15xuprvkgjy3px6j1hs6i2bbjk6xxeosplsx0lnpnx9dsgz71l6tt913o3f7461pcv3fa2t5ah7wdgn943ebfjvof0txpf3qm7ey9ux81zejr52ehtc72ujd2to4chrhomdji0oupg93cng02moiyo1oa89oh9zjytcnz64opybyppr4q5fz9dx1xloy0bol0l5ow795ng1osda748t3o3fd3f874cw0bb7g54o4ct9lyu0099zcek2tttid6lq3qa6a56p8hcl7bp3w8di3bryac3bbtitp6zcpffrloj7tehubmpmggatpl8p7ffkn895pxqlancnrihbudtnqb7nedvykog8stjhi4e0mfmnyzrgvm5aynndzcz4vkhjjik00elznldbadwfoehq1b2b61m4nl7sfr2jktrwp6qu89gexxjb5gicveln4y7oi02xzlpz9opgie3mmgsfufk70dklq8dvz36cpkii47y9xqbo9nl771au74cov6kc7zdmx0aheosg8alyrhp17apegr1qngj55m1shghd4gbi4malvrnfgltnodkovu6l1swpk56lxqygxse0m226f9hl3cllwnh760e2o4pacnzbduyc94mlvi6azz0hnfhz8yugcr3n0pmpl5pzyhmwcw94xndjswwz809bfr6hh6xmhmzozumq5fpotky7x7cmj2rvhtb',
                proxyHost: 'ldq1940zwbcz3ag0mfjnm49ldns1rws12pduwr5o8tcy5hspz23dffz10ent',
                proxyPort: 6981342497,
                destination: '3e768rmq2p9gd3beow1usfk6njy79pfilg77kzcf4gm8eo0v03wrgk6pe137m40f0b51kf5ygj1stg7qbsq9f84d358uiiy9x2aslyytbmc5ykv4am476t3w5qvilcmfg7n1vvvc9nqz9xtkh9fr4kd2k9himurk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'smymk779d4j9pm2swea3cd30921umwe0q5zgbukq7ofw29vluipr38n6086emxj1av3jrkvoqvqczg5i74cdlj7bufk7to336t0kw13plwtdajzgaz1cc5cdfsjz68ydl891hune1zv6ac0p1bxc7pbhus5b7b48',
                responsibleUserAccountName: 'nuxao5b91fb0qledoboj',
                lastChangeUserAccount: 'r5yne09nv4qbgxyj8vg5',
                lastChangedAt: '2020-07-29 06:38:07',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'p3t3h0dbi0mhnyd2wixl9w9gcfcgd7bk2ozs3tug',
                tenantId: '4yr276bt03satjfurij5o269gi6y3on811sb6',
                tenantCode: '8rffvreaooxz6yxk7eziytvc9y0mv3o2zew00p4ul3gp153fa7',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'szqpavt9r4oiqkjfovoj',
                party: 'eu6erotubor3cecbw7wruhjhpqo7e1x4o5cu3wlhovazh7suc7pf9r1suqs6pi801t2ih8y1svy6am4ly5khirnr2t8emebutt7f570gvhwx6uwlgbo33xfcpuje96ny5tkz3dhpzdth6z49hbfg0v2a24azxujy',
                component: 'zv6md4wp7ljo3j227y4ptyyk4mc1dof2ba0kjy9rwf5s07pni5vay6k87eb6pp5k5pfyr82rq80z569nwuyi2e6z8br7f1hxr4w9rtqswbg1ecv1tklkwybsaqg11g5czn92q03q9n6t38mb8d3ofkk9o3il3szg',
                name: '8n9bn2msc90k8g4g50s98f5tgk271acc36xh46c4ch3tfrvo3vy70c50hkzrozp54kkssmqi2ezfbsca7tmqavtego74t2uwb1fl4c2k3saliwsm6czop2vyaj2enorl49jl9qytlcv7d3ejyp3nt9f4rxhcqgyl',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'q9g2mf4pzj22589nf5i4g88xrde31m2xe8jfcp8620fiyxdqggpnw78qumhk713riew7el2ty3b97hefmjake4sy5doeg5j0wzsqj3ob9kx4nyr02vork3sn2clwiwy9t0cfxaisbrsym1l3dnfw9zap8h3r54s9',
                flowComponent: '1s7188ot4y8bqhr57zue9a3xtwd4x6e236y4zyo25qgytcs7y379eu7wbp3e5ibn4szsyfjdkl5b4zc9fyi5dbui5v6m663xgzhuayv00yvfuo0v524jagn5hjqtyau15hit4drsxwh8by218d5idy5knabdavzp',
                flowInterfaceName: '8w29l464ryq23l6o10ewl0fd914qbx7lidrvz5ymt5mnngn7z9fjhaeydmuf9hzrcg6tlt8nts3g95u4zn5vywr748hvjzk47vbhsnhwowm6e6d950wuy26p8s0xwzq25ubqr51un5hk5zeovwupy3b7yk3yfl97',
                flowInterfaceNamespace: 'c4jj0agbxkfpy8uuuz097q1yqgrrq4rd4pkx59txaemxkz3zex52391m9ts07t0979pmxfbvuvd9dld40rcn1r5v2wts1t16jw47683d751msiqvz8vucehm42f2nwbtneao6kq3vibs92u95ur64fj77y7s6m7o',
                version: 'ofy9ie7ulgoaau1531yl',
                adapterType: 'k0hu84rle149omdofi2d7q0f7onnm0oeag5lgqao58svhu29kfayj5j93mpf',
                direction: 'SENDER',
                transportProtocol: 'zwc873431xud5sqtk89u1vuxnae7jj9x7iee4yhi5hgig3ulkecv9w4189ez',
                messageProtocol: '5yoo4igg4i3m3as6t8wuxmjiqg2n2kiy8ukhrxby7e47tlq9z5x1jbsd59t1',
                adapterEngineName: 'tm2n9p9l6tmilxvn98y2hewwodlyqttz4hy8hnln1oii4qfr8jmj6j9l8svt3u8g50bl2u1c0irv9amun55bbn7ks22s3cfrdf4qhw5dtm8g6521vsdcnzm0908w3l8epvqcb9opoy22863sw8uxs3ns2ewp80x6',
                url: 'y2tr8oqp0kvglsckb7j5be5vgl5ik5kzwqlyhas50oxaehpl7e8ws7dlu3fn4fa1kgdgfpzsm0dhn1kb9j82xnq705xx4u2rwb0p2c3pfo97frxtvamekwivjifelul80po91b8vsb5r5l2rnd5ttcsdvqpw88jjdc1ou3l6rbpwwzwgixqsc7kgq8w688enq5ib52bvrgf7949gz7p8fdeaya5o9l419weu3jm7lxtgpuiren11uju4dw3oy3leyzcp9gk30n61xtcp86qp44ecif2q9ckae32oqbyhyjgji3etiocwgdavrcskj978',
                username: 'm4sf937z39v0eaeczz4qnqdvtkl21gzqnjkspkmqdqqvb8vmbq9isydu8dx4',
                remoteHost: 'pvgzd7xvugz6t94dd9a0pwoyu8q9i4xzjqj4im0ykrerelh1lcth5j5l1grnyfjzkgv5hgtdz6qliurdaupp8aqm7xie2ftv3dlf3c0yfi0aoro8c4tsk1i4w2qmkmcu8f9qu76htgqm8351sparb90aj7c6xid0',
                remotePort: 1932794685,
                directory: 'g7de71byqtq0lobuhxk4z3pupjk9fh9vlu15ziehqzw1ed5gqwzzt558rov7a0mf6ona1qoait49hvgrs9n20fkboif4wjx5uf8wzvkvi3t10b71nrpb32w4901gz6xcr5c8jksqah8ibprx7ppnmdxd1amhfe4ex2rrpel7wno7m1hjqtqj6rfuro2gn2jkcg14u11305r62q8j9hlm0zkfgpoatx95x67onks56n60hhh1m3kmt9sxs1oe6t6ie6ox6jw8mb57afeam92ni7jvufbqn899y8n4jreqy5eryb816q1pkfh48bm75mcg8jt4a910mikkk0ypa1qgwvwugbzjpj137qo1un6v0hk4a17ppwbtkpe89wm7m96fhtzpsa058z8uz6t9xnygdtidg40ug1sw85d3un7ale9ppxtr384pl8wi94s3o9ondnup4d4n1j6tz0h3njnootjye3hw8i1njs1hkimbl3hm8yzo4d2htev49zwznng6sjdlo7dvr7e5ournrkow3tggw2zqu3ia1ngydmaj7kl0q830kd18jmn3a4ldwbwopj8km88132thbcv7y2zjetzrw0o90imydvbzwm8v4han32me7h9g5eigb8cg0dzocgenjdb5ks1zqv13kzm5l5qtbeu8o59ep45tvrjnl8zu1aen9dsiwmraswevg57o4p5hdpqkri1hn2k0wgg7vjqzie8h4okw74zygz2e9zqqsxtgobktxjjve4a2uskmiank5x3cuzgjxnlirj0hc94hrihqjpr0b1w3f4g24yzpaloe7t25telnj62gfdrqswyz20s405g6tgdy89drkwubti0ek6ljolt3ptx201am9b45agazwoo1fjgbqnuu5kslycx0f6e0rwye7jo54bn623b552fa6j2x75b2xtt0v4t5gjntp3gmznujimftqfhk6hew2fkzjf5pvp8k6d3j39ch41k513zsejlqp4ewqy0seib4g5re3u6eovn0',
                fileSchema: 'tm11h0b70plgbpmtchomro4rpswj5t2e9pnxm73cf64u80hepv5ff71w45gb5rzjsrbogcy9nuhisrwdb8zhhah2kturrkqqev5ivmcznqv8hyec3h5v45jxhsi63h5ye79t2xjlygny8tx5rz9i7g2ifm0i1zvutvhdozc299nped17ih163l7ofq7ivntkyl4kd01val1l6x7x08z5yv9yo7ao908sdvw7l2ewbl89ozapcae5a7fmkkumyjlugjghblqfurn3oaxcycqy3gdp05ghfg0vyvn44bs03z3fkroqs0pitghvunl6z2bviug1d4nqc8njdquktzjs9wjnckwqagci6zrjb01xtiq118zgq0cp720k9glnmauewchk6yis5u87ws6otgebaeirg0wbkynynlr33fw2edmkz54qm2q43rdm62k0mf6hlj9qrkqvdelu8nhepby4s2jd2g7zhc8dvvg4i7o2j0sv7w8snj98rv87e0gyvdpxpegg2u4fa3juqydfxq7xpistzv3wypewe6t0e8eskenzklqzq1mvn1as8dszjc0bhe86gmy43zgctz9gdht0xw1jcgs2bvub25vwnijlwexa361z72wf4e8eg72rbuwteezyu14potjs5ysgemjq1nx634loi794ttk993paap5g6nku98u14zaj5mnisq2hypzk7lvbq4ol8noxkosahz8vwevqivlkm5plr69m9n3gbztbwgh2npv1mnxjaj8k825tcxiu4hxlulvmxt5gwa7konk0s108pey09rjizsb6mtp460l209ick96qlpuo357rwbatyqywi1vy24hvcijm68st21lsuvi10d0gx587qo9qkt8z34tnuk8ixpmgnnw7zjjjjcxq0an3xl9x6zveh0zf19h8etwv6c9luytcbcyrlbunr5m3aksjs8qnoc50qwcj7i6v1sgvr830yzdivh65bde8rwxm9k1rgm0ncixk19zm5zgxq81cxuqt',
                proxyHost: 'ktnrb5w84y8yb71ky0c640yrhrixo9xvixw4hn90ph9qmrxx3c4oqwjjb7jl',
                proxyPort: 5271825308,
                destination: 'j7tfumbmhd6nwbh8bx3htlr2heb8g5clxn8bkjo0fn1954b788vm2zv0ny7xxy6wvvqhjfnlf4l66r7h1gxd1s1ec0pc41oabxy8g6fdi9hgitb7a1omnj1vv184nivd3un8kndxkqim6cjz2b6heq8uwbonfd97',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ogrxfs2rx0ap726xklx58fw9d848fb113703q1lab9pjz6mrfxgfif7zd78hkwslcvrysa9ayvixpjoid2oc6btkw7bbcm2bu07oyv7b82ayrbx9c1yx87y8k7otvbpw6aqauh97sktaltk3nlpit8twxjthb8qe',
                responsibleUserAccountName: 'a4tp0j98hx8lecura48l',
                lastChangeUserAccount: 'vsd32mnnr02md0am2hs0',
                lastChangedAt: '2020-07-28 22:27:25',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'brfv9etfxj5dptask3q6jqurni9cvb0bhhtj5ewy',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '6gumvuj4v9k6ttrhp7ztilo0qfty8ylzlghavva4w2pannzn46',
                systemId: 'ixy2f9gkfmig42oe4ac54mwx9jvful27h3xkw',
                systemName: '3ri6j9k4c1qy04axwmzl',
                party: 'jtflz02cvm0q83jg3n563dy2ik98xu32g8tkeznxthv8hpupz6b57e7k02c51cdahe8f8hgq3qi56uvo5oiqr0alf7iimqu2mqzmartzkg22eklf3y1tmnjd8kda9d745uibg62n2p2amdrvvj6a512qoiyq88kr',
                component: 'b3q290cfy4wmp3vi1wgjjwucodmndrcktllrbgs938ffxjvikm63wsgp0wp4xaq1jl3u19x5jjc5bsfa3bzkdzdjxz6860sspbciwzag191mky0gi1uqvp8r947r858dgcxddmx7dmdfbw0hfegddkd6zgo8nnbr',
                name: 'v0a5mx4qdrbkb8aa11p1bi6x77iryvn9vz5mm7vzl6331igml5cvbqlwqlakvghek35w574rlr1gxfcpfb6slkryvjtzskjzk28e9nsib2x2y4ue3n3x19kouw4p325485bezdis160n7sbr48y8a6fqe3lsu4pt',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'fe6hhfnas4hvhnahxw8455vhlcqe6svq9mmg6s812178aai3f6hl9xvujpbirelosx8pc0xdhu0a1vzrg48cbdhqgo3fl5c6gubhnxhg8xl48owkcfs00aky7skcrjg0a3vkahos9gvhhvw45y27y81nnlp0loc0',
                flowComponent: 'ztoj4cinec7jww6t4itniu7fodqzuwsjehxo8nx7fod2xh6wuphypt69l3xk1zqqptghwl31bhbvmo8iqpjnwl1ix6qfltnt1faj234jmn0j0rdsmsj0zhc63m5omvts9kqokbgxvdhicocw66f1lj7mwsruav8g',
                flowInterfaceName: 'e7dllxmokzbm7hy8y5kiuuw11ax1bkl07tgqkqdgwa1wjlm6hciualp01utriro0u3c7xf77r6m9rvdte88lfu4v7ok103u7p4us433ld563x35xyl5lyt399dksv3zoqoznybbb4vnc546da7qx7r7h46rxp0tu',
                flowInterfaceNamespace: 'b8qsvxzhv5kn73t4b7bpuy1b8hnbxg191dwq62m4bzg3oug67t6yen09zr26qzt9x8blgvwo3yv8qo4q05szzi7qxteur0n5uqsy3jyxckvqwrvaij6065h56fl2wat4hu6v2lv5uhlw2tmdcfde3wi22zxmkyu7',
                version: '9jspu4u35629wsuwdmnf',
                adapterType: 'ns5hs5tnae8f4ael64saca64ajtebo6weu68pg041i55lctvqpb92fbhb4lz',
                direction: 'SENDER',
                transportProtocol: 'ceg9xxdqqc9mvjq1resc5ohd1whki93hqvgllulq3mky5iimovpx7ijgbxyy',
                messageProtocol: 'd379ys5g9kv992qdgaecfrzktj0l55qkiikkxi1u83vurhz4yqic9p275r9l',
                adapterEngineName: 'tppia125gsi4cbkbipnyvh8n3fnv1950v93pfiaqvgjodwgf9yqmq7pg0rxdy54p2zcdu46s6f8itt1kz6al15hjqrh6nld75s27wab5evvar8rslbu6t1q9i5oq8r62ole0m74hlq45zufe5a66wssn6mnvygam',
                url: '83m4mf5x4y0blx1wuy6uvgalq1rculcnfb854qsy5tdv0yp7yj2aelu4px4jyg1s9t9wb05njaolbo08w76v14cohfpltf9c19ci1ul5ekgt9wsagpq71rfbp0sitoqmhrwf9056f2k277tcuw9eny5sjwkx6v7lgtjrknhcmg1j8d1zjkujwffvgp6ssf3bw4k20m8al68dfgpch1z2pv6r5o91cbpybv6v7wk83xwpr91v3xk6ow36gw9i38icdhltygwa0n52z388wg7fi9pggz3oxrem6mnvqar6uvnkyl82mvp3xq8h6gu9soea',
                username: 'z7ncpfh4zb9efuq94fz03tqic5tvfrjw0igz17m34s693olqqn3llzwknt28',
                remoteHost: 'i6gt5r6j3qe0toj1xkf6xrz93yidf1q9fq0i69h5p5pdcdbkbaxrzpg1w5tvtuc54zbqn1ibp7se95ib93hx4s336dy6czh28dyyu7gq7y5y8u2n5o21fk5iht0uzeywkomq7247kkbtugj8obu03p7su2vcjz5g',
                remotePort: 8420833957,
                directory: 'adx2qi843jyxbx8ykg9p47cj6riodyxts71eqy0uv9wyq1e5arx8hvj7ouapomgbf706rle6cx78zz9jei9uo6sbwuanbl7grtnhariin6rsytppjhy44k1swmxkqzws0a6ko36azjb7tpx5eue0wefgwcwt48k3tw2t7r0ln5zg8bq72qqvx4fzzyy93311ubabp4pqwgofsf6fl86xj2w41yhyt0xczalbj9yes0njpsf7mo576wiybh41x7h6pwwe4xknc1kzlzz1j5dd6a137d4kazoe4bc34aqun654l53vct15h4oi3rqfszg4yg0kgr6wdtwwa5d0kzmno7pavrgzz8eyyrtyemb7tqo7iyztyf4p0u46ce1rfuezi66ml0nwrtt1ques93mxfjtpk7z5x11pdwwcs5e3ykr985co1h1jwwqdvku6n958g4tob3enuxxy3sd3bl5qekum6xs72n40qxvolwpqpcmw3j7fbw05w1d1lxowz04h0ta5xgp1asgbmsrahi01724u15w4st5xxbs6liwlfmynxbs3lirsttrcll6pney77wfidr0y0pinlbqbce5m4s8busmylf25jp11r55oz7ax3rsb3o1an52qulnolkto0jyeatsgcscg644fev02gt67dn73fxwq3hg2mnfy5cwmyktp7cdys5vro07x1xb312gcdgncvmp6mhuql2ta77g9velo6gz71sirvd72gyt5i5dux20kwiwzn6yon3m205hqmklt5nrbkbizs9sh5dey6u7idk53y27f6n701ur614rtob1oaoofx9a7v4j8j5z1i3oqjbqtlpwf1mcsvlhv6l4jvhx7rd4pu7kn19liblgwylkxp8xkexghwbcquxyxs56qw2m1sgr3ot5afg5y1xdsyr2vtqdyrbct9bkqn5fe3xsp3wng5jcxw2n0vvma99i07bjqumh9ga0nq1yex7ij987oqum5qqbm7z4f5p9zy29mo8jsbfwrn74p',
                fileSchema: '3g7uki1eawg25aup1ntzb1xgw3g4dls5umq0el1yewgxm90ev5yjrvi0bcwnfq90hqkadeu61uslusyeihcbhh5ttonpt46zo2nxg1rrmj1tpo6joi5durea96x7wurku4a9ak85ut3micsftm9lfbv1sgz7fyc84tlg0xl14kvf0tqjzfctg3ce5qj7z8c8v5ana3uz7o073gsrqq50yfy5nw1jid3x1f8tfbd96joz8ee8kslos70nyx41eyqp7lluh4z5j0929by7fq0ha04s59f70x7v44aoa8mlmncyar99eugow1lth0ouvr2j11sej60xxoxuakac5xipgjqsvmjdl6cb6cdjoz5jdjp0ntwpjn506fcvhrfp0em6vuiwio92bypq8t8nmgu2po7166de5buhachbaptk0bp89k6e557s4mio2frcsx7icb9bc9b4nfk88yetpx04dm4vzgws9f538p0nmqoik0b0n5dau50ah7mz6k7vdr4zz93x8vtzt17e7g4bi0uo2fz0ciuyf0py41l2memt4a6nwoixtwrmn1hgv4w47aq7lejbb1i6y8kjz6osp9iqous6izbvy69hwu4tk6mk6chy4i4zsf4vnwbmeng7llh23l3uqic78ymmv4a04yn6f2nf03xb584zcalczf31smgq4ed00efbz2a04lddzsrni9440r3m2inyux5jcj0uq710i7yvk7cpyjji98uwn1831a59oamhhe25se6of0cgttthypujjobskyh1v7gdqt9e1gsnqkjb49irnpxwu8afasoaue97x76wx5nrn1ue0ogdiq3106xf295qd9xwllgxv2bn8psoqzaj2g0xwafcmht7lwz9os03t9b65yyp6fhrcjiyo8p1uh51p9kdh3k78re59kwuxr8aztz7trlf4j2zp23z1jb84et72csci4undwmjhifcss1b78rl57sobzi63vhv6dzylnaqzursdjg5re4suym9a3qb1f1c',
                proxyHost: 'pyprc0fhbdpz083kj0d0j7th9jf5t9u6p3egbted9nnw3o7teo8smn2ojicy',
                proxyPort: 9586358555,
                destination: 'vnhmniufmmxgjdl27acdluqwtkqdq5wljh0m4y5vsz2v6tdms45gv5y55yfrvhc8902zmapuxfoy9f516ae8srkdkdkijl3eqrlv03o9d4aidg3512u1oobteaqm9wvax9zcy7e5mqdgc3y5kvdjqgpshnu9idl6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5p4k3hqt00e9gefnbflstk3z13tm7jqnkpv3ptuva6qzbj3bd4rwqsd9eva2v7u5rkidhlee377qwe1m37blu5jdam4ngqr3zgyj4rhuich29cd3exzxa731xlue7vtmtfa4l274n9shvf088jldwsd7nvtqe42l',
                responsibleUserAccountName: '9deaoz9hhgbp0crbp4ki',
                lastChangeUserAccount: 'wf86bbu801654vh1jc27',
                lastChangedAt: '2020-07-29 14:38:17',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'm5slg4efwsljn9iwdmx5cogdenoicomkzvxa3jze',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'ks9cothrpbiutj3xana37azkw9wyb5kpcsc722lhna91hklud3',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '784rfenyn3t4m95ej2vy',
                party: '5f8naxtbkverpobt7vgjo9yon7kdhwkptq9lpa327nh6ucskj7zhqal18p0e9u8qt7utea39lcef9je0sqrk69qiwqx2fy6464hy2jnr0hvgikiko0cyhx52aoojcgtigv6dq2j2kg8rk4s7qrymiblw6sbh0a9p',
                component: 'qvv0103q1yyx2glkw55sdykwonbj67xvnyjgzd9d1g1qmvpjxge7xduns1oj5kveen0t1m9odyejxnxrynv2widzbam8aja5upj44pt0rpo5t0azngm0mxnk8hp0nefqs76l7vjjjbl0wgubl050z92wlgix9td1',
                name: 'bg8xwknkadfwm1h9gtersv3tcqxnobirzccy0z0mck71s5np9myw6c9pzvd6u2zi86rckkp70s3gd7zqljus3cyq6m2wq1lxg8n7zd6ifu5ui5hgat5pht1ety9qpjtvcxs22b96kjyldt7d1u1f9dqg6q0vods3',
                flowId: 'q7x7gltsiah4nui7h5gk9209313xvzmrezsb5',
                flowParty: '8ticaxi5xsyndcivozxc3fy2gosjeovc81cjv690rt37p3in4ryvgyprtqb18upqgqqnyamdfvi7frtm4p3lkwrzpau6chubnqm2cnkblr22taq0fvj6g3v3jkk1twdkwv4kul2w65kyy844ei75lh53e6pyyz9c',
                flowComponent: 'fk0pzrb4hfvsf7if7nnaezg44novd0h2ow4wftven7pdz2w5b17u58w2yrwe8xtncy23folv5p6c35h19qujojjybfy7puc1y9kwbc34hscnwvtrrvtt5v0oocliaorwvh2zhnernwgg0uqar3kqes3k7ph5rd21',
                flowInterfaceName: 'o3ipgexd5mhg6puwp411ioi3jqi8xdvqp3dglv0q8ooeifgqnk1exyv7qdi7pyposfhgb6jk07fvf60azz40ilxcp2u0nb307xsu3rz616y5b1kd0i8tace9arcob2i4pjsfbgphzba8rjrm06r46t32giqlvc6y',
                flowInterfaceNamespace: 'birm75wz9e1sbofr0p8ijrh9jm9ho6p9mxlcd13n1wyrzck1ynnjdeni8wfb44tfex76gqi5nx6xoi3x394kyi2ssfo1xewizz34vt86qaplr1l1qzl6jdy56t6pdd4c7xaruuy76jvs7n68trux1sse9amqhjwd',
                version: 'g4yyc8m4x98t7dj0etdl',
                adapterType: 'cxzhs6gpclp5ksekdppi95w9ojin2997p0ul32ietserdm9kjcft5czq3yfd',
                direction: 'RECEIVER',
                transportProtocol: 'cllpfggmmwq8za6s4cxp9zpwfqn04qh6nwb5z8ohzieqkmqyd25pib1vilvn',
                messageProtocol: 'o1o1n4i6tr1xwvv8llri1f2fqhg2t0v5a8mxlml76pdz0jhljtc0ltvv85k6',
                adapterEngineName: 's8alpbezz0if5impeh3204ol9ppvnw57m0te3adn6415ogr99070hjpw6hw2c17iesud122lfvvxpvz7rzwqpba6ub2ffop590730bh5u88b18zgspv4t3b88h1tpfggk6tog994wc21dqjpuusnpja0vm6diqx6',
                url: 'bdsoua4vwm45sksk3ivv46bd7cfspw849av1834b9i98e5hvvd3m7b33elqultwuys29pe5ct4h4u7gyhau5exfubvaz1ic5zzlkii13iah215s772gi225ijd6rvw3meg0qszly4hrimk9b92ke3ouh2fvc8keuw24tvoi16ggfzo8bpwn9gi9chzczhsk6w22fn3jzgqodaib6gohj85rkn67it5z4ab9t3k5d5c8acfdkzm6o7t0bcwxgixtddntwzg9haif3qe5ydjwon1wknh9lyua0u7chg2vaqcrdn80nyh4ys56pt1v3vb2r',
                username: 'o1jkk8n9y9hkawgf1b8p0jjmkjufbshedfm9v32pemgvwlfviqx1vge7xyk1',
                remoteHost: '6scv4qtv57iq3anubsqxeympzxdo9u7k3pljwtad7ax0kzlhpnzpoylxlua1a32a4ueqpyhaym19d5ovz21r68wykg6trz0yg682tu4sxgjx00l6gjw8gp15265yns8sihv119orzdrvye4mwf96p8zv0bzvnixj',
                remotePort: 5354479103,
                directory: '26radc8ipqghcqja0qjprplu6prsvebybxahp80788kxuba98qik6v4ftuvkdqdwygks17gzhu031ucnyz61rflqzqdd1aus5dfozr3975omlyqx4kouq66owerjv1gxyxx61jj6evebr61i8oei7lusc7kbd6the2ebk2x56xqcclm4l4tgwwoh32a69ufqavx4720ey3z1kqip2fajp8w6bufs7g3assf2f00cho3hzmat7vbhkygsx7lu81yibwd1uf14nh54xs71l77diywptjujnjfait6s05dk3wxl2rlkhju7mwolg4y1ch5uuhcaz5uixxc853orj7rt01tqz48v3x9v58qyx5de2vl4axyjjkvzwb1ljmjs7k3jnflp7iv3py3lxva3mjr0fe0kpnka1c5ac1phqbdtu2dma953myi7yh0560riyjtdtvr7vyy29j9ujy0sw2e27jta1fsa6wfn3dvjmxh588q8x61i3n1qysrim2ykvrqbt5caf643bnx6b3x7a6tn2830zqbks8o5m3k7m100ddr1we56x9ts7g5i6rsumatgxy06eqsqnvsrwm1nstu253qxnlfeexmsebprkytt9ii0whs4qzhv2sfa0zy47ozi6c2okqikat6u6lltvbncflgrsh0wr1itkz2n7srh9c95sdtoc8kygfzcouirnqzz598bikb22neki51hrx7n9gk159t5ecgmgg89xltyqnchfjzp0a0to5s7b9rv3kupbyw8akttrvh1ji4z8hxfnxz0tvphabuw94ervxvtx2ovna314suw6bj85z52qalc63y6ma39v7vexhuw9byp5dhn75ahm0d0qqxhxqucqy9wb8gbqjixkq87dhz54irg8v777von78sx76lbk9iwxurnal3khbs0l9otf4krb03h7g3d94yq4d8npzhdwo3yzv3s2riwxcv89vmljq1uad8mqqcl3hupeoi4ovu5548nm6wrxycvg3a72yyiag9g',
                fileSchema: '5j9pkogl0ve1z8866qbv7mmlmkbu3vp7qz82pd8tzg0tvfajv9fg88n96w6ikkxlxc3trh81zw1ysfny1ymap53cfqk3woc5snc150vl1tyka7zh269zqwfbuxu357tw7gyg6ib45v993p2j6f1u8egxich4xk6aovi06vusbsdqp9y2aaexjf4dl2b14m9zpcpzhxjefnmkvssjpa3o50pc84gxgk1ub0qgtorm35z2kymj77mk5n6vv3c4lij9irqesacqk4cx7ctfp07sjmwfmca3iuoa4jw5j2jvyz7jzhu8l0rspa6x5snlwpkjm4d00kuvpwey968j22mtt9m6jiyigpy4lvj2e5gd33elzji5ydh66v3qn54j1zbrvklk4glzd7onl7ol7nni2ebr0s8zhsp5pzbtdm3mubepcmcd610h47dpabtkbd2kqqqiejq20o25i3r5c8qxg277vht5qz4hw5mjw3jmg80qarnuovwnyxvcu77pnbhofdd4atgrse8u5yg4wotoi9wd87lju5zr8vpjnw72row58jn91gyswnpn0sqj0sdaqa572i24wilrixzdbe6reg7o3v0ypwli71vb0d2twa6hs1mydr7gnjo3xcgusikjwri7r7hlvqdv8kki2vi9oumlratkkvpfnmf5tv8ao2z1bmnba1vly63efdm5vnc6dghe9sifq5he8c7ou6odnmhe796i7on0y6qypa7j6gy1isdsubdiei98dp1tfxgg6lwoawnfnaffvwr7g1zkrgrt6zotdxu0nx4tvjessso3jb1smbeczhg4pez7dm216ibgk2mxvsi2w5j4zy0t57rdw5j4dmn03ugri0f0fkq8f7p4tc3xr8jl1jjz9hz2hwv3n7xm0hucoqixfrgtiehfju6h8f7m0nkhiomqmhag7pz5k4jyb5dus5pwrmerpr5etpasp3l7jvy5k2m7pkdytzcag7thm2nu8yxn1yuzbrmei6iac7gs0i5q9z9f',
                proxyHost: 'dbwl2t2zez43g50nr3eea3h4xcj2r998abubdm6v4urye4dzc08b5st9yptk',
                proxyPort: 5774626837,
                destination: '1sar898k1hhr6m2u3b2zl4q5scl1ddsh6wj0qj1ngje0demr0pjbz0ldzpbxootndtlwahlcd5k236hk7msejn05sttcrlb1xul8vqywrxl56s2elvhza9sm87hckdlkdnpry5c7zvb2276av5bxqz18dsmdsacb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '221z6dbpix8hv00lm6ejmmdctmailo41xof3xz6rc1ii3fsn6z5947src48fhu3hfmirwae5kzzd43kkomzms1k7ef7rds6rm3senffy09cbia8sh5c1dtf3lu266rv3s5kitzhmuk9dv7m4maf92qednsvsyi8k',
                responsibleUserAccountName: 'qyeffjxxd92w923is4hq',
                lastChangeUserAccount: 'ohkengcvgpx17of51vgf',
                lastChangedAt: '2020-07-29 07:10:23',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'awjzwuxmnnpkt66ysjyfrlm2g94eubzo3q5h9wri',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'edmdkbpr5nndr0uavycnk3vs2jlkcr3l87dmfadrohuh9scsi5k',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'x63bwf1sgixgrheochv7',
                party: 'ct1btdnf7srjkkzbke94gzuu6w8089udgt8rhcdwez88cj8kqxv3gj4jnqwzapixwdot2uidp842pvmb641f2olvsbenlgrtv8snrgu177wvix98d4r2z7dw4gfjam2qzwh6pemgewcaett5yrgz2gxlftab9qrl',
                component: 'ja3mb2jlbs1diffqok3ahdn0mspichpuwz3n8ar5uk3vcd7mj5a7kqk7bhoykgmvgjr5qnvv3y1wvf6f6kj12j45ov7oskggkcxvo79mgz8b5ro9hnnvgflrsgqcuc2jk87en30ook5ksfzugoys996qfbhc8j6n',
                name: 'xg306v708qszoezwe6tv8i02k1pqjkovywdrr7zi9tlf44urt77cidcd4gmpk6d9z5v4vi20p0rp312uxgl2m3x9yaw95ecp9k0zclcfssf9jguvlqfae94y76qevuj3hwpqmhkahgl5l1gr65paet0yzkkosnko',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'c2k0fghjctihvj1ycfxnyvqtkgdbhwkckdck3s90x0088d27ow7c90fthzt2b6df32icp0bbs5wvx7un6utlystueu0dk0mtysazd2wrcwgnxkky6lj1zn6tcpegwe3d6dyv6kt1yr8hz46yu4e1x6389e8guxm8',
                flowComponent: 'zjd9xmxcuaz7hz5tmukcijtehr4u79lheap2yppvopbrze6wi103h74vz5izcymhmrdah2hg5irxadbeyzvymlu51q3rkws2i2s4xg83yjwyc19hza235w19kbeaca9tefgmvgxk4xaayduryd49msg87ae37k2p',
                flowInterfaceName: 'feww1yzv87qh0uhynqj57p2yraadzlcb65w72v1icaop2ra7zhyle90i4ga1rhaufy8g4maus27dmq2nttu3d06r0gzjk21ylgmdix509itkfe828nv91rq6fz9hmfmvn6f37wljp63xfgrksfh8hkevnt0dub9v',
                flowInterfaceNamespace: 'dzgus91th3f3zvk91klk5vwwozyvdgsvkmqry9xije1mv3uevvr4580w42nw9rbmhrbwjwzbwc78ee878a9i15ibc67w8g91640ooeez66ssdab15vl8qtrfuvgsgl0cis94cjl596b2b6prif24cn7dlzekja5k',
                version: 'c5tbqk3afqwmkqlhulm5',
                adapterType: '3hl63fk17ent3fld0nowsyb5h8wyjkcqgjzbw9xs7xsrkvt6wwbo3dikws91',
                direction: 'RECEIVER',
                transportProtocol: 'qa8wrb8uxg1gpoqbcvvww2ar1ajlhrh2b10ru0zq33ykyv67c5xc2fvtmkzj',
                messageProtocol: '3pmjf2pllv69og8415scvh476emv0vyf3s6q3ili8eyu53edc11zd7riet37',
                adapterEngineName: '8aw7tlrdc17rwomxfrj0cv2rwfjie42dk50ycruxjsy8qourm1bm949f976bpomw9nav88yzd0jbrpaj30wvnkra099hhs6dvpusv13yrk1a6nt90dfwp062jgvrdum6c9mo4wd2wgtvqwulfgay3vo5n41xy36t',
                url: 'abn0c0do5jt6ul1uagcasxl4fp8arc46y1uavg1ri975ax1kui1lfij3vg9fgphz7wybzyy4lzhyf2a9vfk66fem8j5264qd6pnd4zuh9r86r3c8wrfknyvbiemq6gjbdvf0d2chwg0yzb3jhuhcxn77ov35b9b5n8m2s9enmzejqcsdqkwmcmjqozx54sl3xg8gkna2l90let9j9cazud5ykqfjfi9hn082zaoyo3m8vfp70b1jk7kvvlywzm3kry4uu7hjzwwaypr4sjiexkrvwm9g114sasn61y2u8c7rkdeeet53xjrfsh83k9ll',
                username: 'f86jcvbdzjvf1mamm85kpgger9f5k3nmty0z9tdt1rrhln90etjtz5mso2ix',
                remoteHost: 'gxiqbwtvsfoq4rkw8v8zd7ggeqrug6itx4hauk44l0aezqv2yjqnw4nhw0rlorkwxp6na32won1ds17f7i7jm1pfm5lndqb3nkgyjmceddi1kn9slqkj9yk8ckiu4z1j6lilaz9rfo2lnzm9ujw81505x6wjpjrz',
                remotePort: 4253549990,
                directory: 'hrrw4a36ar4uskdsfw37xype63l5vcwyut57fhggau5fw60js1g1p127bvcryzof7c85ce189gw5xqum22uci0udrqvl16fvj6wj1mzwg78hn0gskqglzm99tcnawx4sggs4eb6rz9zwahln30fpvq1d31diovzl7s8befmp1xfwhodv3afilspd6avz6hhrwmnbmj1a0c7rn3iliumx72hoetrerbr5chif34l21ozqqgtneofx7xhcexbmqb7izta89dt9kb7ocyajebup1zban3p05s6iox281q2vx67iv6yhukipwhi1at2zqgpz4behtsg8qnkxilr8xddgo8zz0jzsicw4o1s3dzj14cf2aqcwchnoyzp7jvo9xlton18di629ct2egpr6ul2bz96cfsakpbx5chz9j1dq2fn17v37dicb8skw1ro1y90yxx5nwlec609a082rtsc0o0l1a4itl5m9vmmi1tmgdvgybjx7tvi8kgeg5v60yi72y5by48li4p43w0tnmumlehyfu0gper8ooh1l97z6vodj6dksau1rt1yv4hy83tuz9q4g5xxw2zvdp519m8hqmaw9mz82u90cw5baim6dxnv48tvwfcmpqx0n4rgvwo4pvmgv6hz5y9y9ascbg78ogj6mdal2un96rugv48cpz2i64kfdsou3mmqkix3ngaiuy8d6hmdrr9ccw3g6vwu1087uqhuqmcvjro0cr06ig7irfpa629mj77ht9xon3qv2q7zp6c3zs4jq671utwgz836ay6g4m6ibsqnn1fiwjs6r0vnphlhguendt7md9ashu3l11ym6y551rig2mlfi52eol8blaona3pnf4frap76f3nanmk0xtcbqcg0kaxesle15fixaz8k29ijb5sekn0zvv0wf7ndcxh8vkqjwlg5x4dlw14oojvz0he2mewrlk6ns3r3k7yz3lo9hvl624gkzyj79f7yqjpr3fber8fsva2tcylq6t77pdpuehh01',
                fileSchema: 'jif025luobm1j13alqhx5xzrsgv7vddiv13hri8s1igi0f6are2ntjey1c050a93gxkocx7yqrpw3hk70r0poxl7bo81robq168ula8ac6d4hieyw8xuh4oszwt7g1xfg5esza0gxk2idzit9f6spxcqbkgjmo5ynkfjgc8j9glm0nqrowv7x3djgrbegytmfskkuzp37hui811f1nd49qz14mjkapdvhvtyii7e27ikhsn7a05gxzoke9oun6m7a2ue9ptaqvumwnhd7u0kbivm7s09abkb3qmv10c5dqychyrto8xar6hzevwvnywso36cehvasuudryil623t4e8ezycb7smgbnw311hg3lcmdm5edaoswwgy8m7cpqz57oc4ejvcc9blaz2cjm2se4en1kw5j5ag1yctgg7d30bj2f4vsg2gjfzx5mo5wjo1cuytr5o0u6anw0l4v38wycukr5yb1r5dj1r0re7bowrqqx35lvym4hr72k4dhomnzi0rm026hc9laed4dm3kxyxxsz3azxg7msqq33cxryzw066x8pwich7ql69s5y68dbfi0nxcp0uv6yiwgx7ftjezkbvg2d3m2qr5sgfrmzliwuig7jdn3pkrrf2rmhcerexlubgn1tubz8sr9jkgyy8osu5rfic314971ynrp24multv6u7zqdfga6t300fhbc64zl0x0owl3hn8kcodoqlg305u9wgp35uwlfhznmddfsq5l7k7yb57smp1vxivtw4ucjhrwjfxuy602gluiaulqevsi1xpjtej2ebzzw4lfc9l2aw5fs28wbpd52b34gyooojhiwemicoisf6cndwo113ymbcvmdjl7d2a0ybo5pbjv6ywltx24gvxa1ggp30gaa09zranyqm547i4evixq6pvvfu3f29sxbgsv7whlocvknzchax66elb20g30ve4kabdsvj2d9zs2a0n78d3kwf1faxxjh65u8lxvpxxxvt8vh43qclmmqt1oxt9',
                proxyHost: 'b6xz4lrvoijrbatczw9vwwx5osxiy7alpw55rz723yuznjryqcswwl93pb37',
                proxyPort: 7559418635,
                destination: 'shcoanvo4iehj01kixjxerqx96jhf2xtbvnjjz7crgar0yhn9n4ou9u9klpfsjs1nhxfefjoxgyrp69me42bgs4spnrf5lwq4g59orfwnd1ihv5vlt4ug54g7zo0e4xbxz3flaq02e0y2tjydbtm2y76g88paqn6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'raxvhqp4actr5v4rw0lljeskn9ggol4pc0ka8580e9rbk1gges1qr8i9ljlwrgts92amv8vnfyjkxfymdzapvafd6y307uj1rqoqcnduk0rq1w4vub69o0n6mtfdi2o09axqhrbufkywqp1bg4nrsgl5ciu9fdyr',
                responsibleUserAccountName: 'js6wgia607k6qx90xu7t',
                lastChangeUserAccount: 'dyyi2mw9m9odfin5mh5l',
                lastChangedAt: '2020-07-28 23:46:32',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'r6quwlf17p0k91wyqego6816gg5ftzv578f3cv64',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'ygjpw8a8l4kiaa958g34jjzajj48zd5nyfdclpqq82frh19c1i',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'v1avo9bghww5kelj9f0qa',
                party: '49qw6tholy9679rgs0yvndkwusjapa8m4sx801d86s6s6e0rzopl0vy98eiziond3bbbygsqm4hld53fu2b3jlgu1uyv4cerdty7i4twbl81hlxbyvg28dpylq5f5y6i2x2vkcx1u717z8msmrxel8epld6st9hy',
                component: 'prx0rpwrsfet29v8gwx28i33av05foda44qjm8hnhfqhywc0hsqt38vfqtd8sd81egmeee3qnxxznffd7nnu5r78qrcgqnq0hzgxk7vvx3a3clkg99hgniyyxcuzia5dyvlobw5t6snhmcsuc15w4pzso3cu8tu9',
                name: 'a9sx3ypj9o4gxhok0orwrtoud8cpa59z9moj9seqfyjt0wum0aw1toyeollwi3zsaw311h1al9xdpf6hdq9xko6lu5s2lk394wq5241vkxaabui4q3jbp62513ou3bizhyx6t98d9rlrsv3do5kc5hlqy921zwn0',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '4djtkqtryozncrvzxjmf9g430s8tkumqcue8apjp08w729s7mcy4jjx2v90d77lymidh9y7jc7b6rq9xoypx8ika6cgq2nqbwbty4tmb2hvsr0wwtdv6bl88t7tfdupewtauj3svaxkch582d65yrw56lznl9nup',
                flowComponent: '1u409uxnuyjujkge495etprdv5jihfosk02j8ug4efmai9rnpvccaoit7w4f1opklt3mg2i14pl337gbvr4r125gypto9evuf6654x00ykgu7dgeme9y3ncc404cjthy80ogn4z4i5nk35yebaultntdnapc6pgr',
                flowInterfaceName: '38bg1tvq1sp0ojp5agx3v1j988l411uf1kardrqxdkp24yaxevubbtqwqpup7ddehm8lhw89fff8eh2m9njwe692ks4soaky03uehmjv206fwyuyfxkwa4nbfduhuwx45z5ww3u5g3g0qssnwse1qs6sae3aoq4r',
                flowInterfaceNamespace: 'eds20prcucdrmf95oalwkqsa2ktz22fzlu7ijo43r42q86qz4ra795ku5l9o1fh6ouclz0yy1akazspt6dncl0gzh83rrbg2novwvbjv5bs909rj23q8w4c9o52g68uc6wzknn39lzdbooi225j1znkfdv7q3v0d',
                version: 'a7z63iv1ckj5hthe4xo2',
                adapterType: '43x9311pmh4mafvxj2naheqr7pt3x6nz52e75x37x9ko81gjw5pufiu5vmf8',
                direction: 'RECEIVER',
                transportProtocol: '1r0lh0xghb9f8ji7psi2zpdllobptodeoqj6v49u5zdfs7vvrrem3xnisicv',
                messageProtocol: 'mb0mtkm2vt3kkrkgi5w6ghn0y18dtymy3abpqwmbfgg35oomlssa74zdbyw8',
                adapterEngineName: '0ocutj8j0jihk5xhi34tm87u4w60nu94mn71q5i5jilcejuemxi63fto04zrakw7v95z9sekxj97rkwi0mq2ipvqot5jqgau767pf05r60q1022bgd4tb3bf24jgrkdltw9w8p8gzcvuwkix8zay72xkyrrawh6e',
                url: '0lz3bu8eqt6qch67l6gtxy15ndzajxj7i2vpkb5cl8dnu9f7u79w8l42y4p5va9jvzcmafbzfppl3lv91586cd9a2rcoxvjxh1eecr58eo3rpcptis6u2x0kaqkgsbed9vxnywuqfvouy4c1bp9r9s42bdk9i8oouvh8fzkhop29q56qrapoug6yvom0rhsx70cvys7z7w6d8ef9y0l8xbb3vm1eqlf8i0xfxsr6dgrj6rcsidd9vsg9u4ubfi3m7b1ttzszqi9g1y08ln54pvmzfi44mt9rncuknga8008pby7hqmjzi6m9vpz3tyu9',
                username: 'zsik0yqpg7c376wxt1bulejdbvyrfei77hwfusxldvxazliyk5xaz0rivez6',
                remoteHost: 'ne17ksdufvvb2kcfoxmxnu2vjvap8a9y43yzujdzz60vd3tjwt9q7zl55aizq2ii9f25778lkxu5qvd2jes90tqon280iyybewipibbvo8dlch0m4spmwbecjx0hpppvworeyasqq676kthd6fycp5vooraw8qs9',
                remotePort: 2056152410,
                directory: 'l5kk1o1pd3en4l3ct81qpxo51j475i0jjjnxk4giewmfnb4de5lpyi546hr2tq4vj02rhxf8yu4pt9wcsb9k8x27qfqv3j8lnjl6uaukvyxoq3t1s01evavrdummbyg4czy9ag7dnp1kyzp1zz1ubmjj9r0zo9kw1uinifsi0efjddohmth1jbuz2rs3a8tj1v5m68uc0gedbjikvxz4y4spogkf1zvu2wl3ik27kzu6x461v21o2w3jysvty8rth4d2vv83vai79jflkdlcr76bbildwkig3pac3d0rijq1272xpcujbk926owm2vigy1wa217iiapwo0svg6ri9yt6boaahedx59g0bbsy2yjs1gwkqhfyvztp42kdky5ub27uxzosl3y1j00s4zkqikxkdgedvefig58vtawc3xkudy1r4inns5iwe2ozmqrztblywzlu4ud5626tzdm6cgt4iigwc8z7sj222jg2tn8wplijpi78sev351werhd56kwxe8ubm1yqsgh5d742xhysjl3cm7ftlwn9rsuix7emn4lzp3v6ytqiki6glevmwgjuxr0u8b63dymo3xa4vd34u1saksqjosblatktue0ac8pd5ppm0tibm79si44fyyia784us15ypxfdss4o0zfedn7waln9n0g8u0gai70prrw0us5ubfysbkchrzpfzgse7g767wt0zayqhhrrq3vrdu3890shoe6d4hmxtxn17132q5tp9ua45whi1dwebk5wpc7fe2x5y7tyx8ulj18eqp7uafzr9z0esofmilnhccseh67si03sn0rmcclc2bncg5tui80a40pdvl06fchpvonwx6rv7662f3ebsekte3bzud414kdgniielbb8x64q92nleccp5b4k02lhkhmmqjm0j474e69tawt7f4vraz3iuwvqiwhxodx6yi8hsbkmsohqer1ttplmhw9ul1e64hu2nxz86lymrm1whe2xctnfgt1a0ftkfn69u912',
                fileSchema: 'cinhkj57mjab4yvwjrbkc53bib2zyzy32nbf35n2zgbyvr9hsfi2t1kaqi853wxy57tmx33z1oqfnmqzerj85l53ftwfqz2948ysumqvzq7wwqh701atwxj8i932uuk28hmfclxvasf9xxbovy1vdew9q8fumq08ccuy8k1gsyu84ok94takp5zpdfx1zq6258m666r8q0dxv73i1k315pebf0d5apunw6mz3x6lcdeub39jkg8fk7sy3huggvejw2ldnantnxfw532u8vz50mfarvaremolq2dsjrcqdqu0u3orr7tfeo4568ltg3ntmku754hv4whlvevrsz48ervqd2r1qr3zbdw38lhf6ymg0nnnuxdt11mjdo5472oqihdvgfft55olc875fg59s9teqnwaogzwhxonv06btqjflzjq1utfpxsqvf5godz2kj8tjeg8o2m5kxzcljxn5bwtd2atp57ks03tc457ga3l1vgzt8kelxkg4pmd597qfil3sgg4jujur4fh6swa7zk2j6nhnms2tb4r2z5kq8vsfc33ppsd0yzlazk2nbuf29l7odmwadk9jhspslosrrhe2zqfz8dfyfb92o9q831l6mnbq0o2vv9fqfpmfx0ktvulx21cn4llypm5zfnztxdrz6in3memh2tk1ppy0k90thm7yymaq8eh898fjfd1a4wz7mz301zvyyfze71zgrl6o9l7zpppyyj36owqnurjvyc6h20zrazlot5l8gu2ac8o128j7sd4dlv8wgrj715ruiz1oo1oz4ei5m5wiwz7sdjefyfvelk8mgqgku8oifn6378clg4ikkvs71clslos28i0x3jnv7b87qhgitwniyoxxiobjdf3q85shh5i48imqs6emrv99ty1uojq27h9g7m377fh70u6tsb6qi7lt6hos8mt9liulbs6w31bk2gy2jgqj576spgxv32b5bhd4zn3k2u2hhnejprww569mrcptn0z1tj5kelrnmz8',
                proxyHost: 'ougrpnevgei4e79qf31gvdowbacnna8ass1qmyjvxd3ofqonzmjao2snufll',
                proxyPort: 8533354414,
                destination: 'bmxsmsr2jqnyvygj6bzlx0y8bzhgma9pvfcv0v6b2gevkgb1qks5k9fkhn6lrz50ahl2jt9fl43lhzurrbkpfml2big8y0fi3qo78n9ynjkiumrdxrerwaluvlyyjghw2oiv8e2kah2giv6eje0y4lgqyjjzpj0l',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'f3uvtqptqnffxyilyln9jd3y0ebkmswejg7rk7kotaf25dlivtfc8k55p47j2xozaz37am6qur2nhc9zuvtsjfj5if8tnobvg4t17dc7dpxlp57ngkz0r4kmuo87xi6p86ux4jtpjae13corfhy6wqr80zvkr7n3',
                responsibleUserAccountName: 'vx0w80t9uckyq2623unk',
                lastChangeUserAccount: '91yz9kh8hyuqake792vu',
                lastChangedAt: '2020-07-29 04:24:08',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'f2zqeqaupq6sg2p1n0dcldu2bpj6hp3dlfkgpdq7',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '9ldtckepvn0unz70in34dp5o3812mzez0vq4rsjilnlu647jdi',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'l566eigqhfx83em1ryvr',
                party: 'k4ppbxakvse7mx055ggu84xcn9c08sfwo1tx83oxxz7qfy3gdjritnbi30s9esf1sr732t1ttdp78juq91glbwi09i1h84u93vd4xkkmqsnhs0hbcda39hm3j67yzk7zzcsnblnvlak73i9aoaqt7t8ulsxz7x9te',
                component: 'w8gnrpnx48z2uzavwc1yydrktlkfw5svct68yxfkle5g9d8z6hxz4ek995tv566cz6d3iovn2neaxffvnzhr175j3uhyqxgn24vqe6hraa5rl2z4sdw8wjmn63minjnfgnyup1imfh1no0y1xt6b32xxs1kcozxn',
                name: 'q4378tc14sufo7z5xae3ctrmvupaac338l61ki83rm9f6t1pfd1w1kt6puu1jfb7youbto94lwleewvhjkkux3truzf8jj4cg4ctq025x2m94j644g4jxwfw7xabz72b956w725ea195ss60gmpxlndax62s3nho',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'm29grtq7pnj0a13nxiz5my766t03brzlo8om5mm20rpp0f3rxkryd52urmxc8xsu5l2yb90gtwsz8ppdakklz26pl6001vvvmipveynqba9fs3p2ki29xz7idg7k31xerpiwrz3si15s9e7jivj4x0hazc1omd8s',
                flowComponent: 'wkne7a9e6amc85q6hp7avjydmmph9qsk2sxxzzixnmfohk0knnbq02y4ksw3l940wd013lglvycq1m62fwxzw6hcl5on3i2y7j13rog59r8496q6c849fuimiqjhdieoj05sc120l0hgvj6pj03huxa77y0jtzac',
                flowInterfaceName: 'ys3xjyftxpszqqqm8ywv4pw1tv46podlygfmmyo6vukxv4te51a000ciducm9fds6b70bt5q4alprcw8fl6bytknnt8oet1qatk2p30qrithfzqz2smbv5t8sos9axfjj559dtplul21udc933llyhrmfwn7i7l1',
                flowInterfaceNamespace: 'smvaqe3grvbf0zc3i2sol0pcdkvd76q920ulioiq7zdjau3d4nstwbjt95wbbl81lou93qtwbw8uxobfzmfxlchsv89590iow138erxa71pvu7zz7l7hw8ec81p9evho3ykhvpxpudhagjmv9kk38ns4sj8emgfb',
                version: 'il637sud4blnkxcuvqf5',
                adapterType: 'sjsg857nezi5hkpu4rzsw9hfiepoqlpvdfnprhca31uw0s134xxdm5vgpzvb',
                direction: 'RECEIVER',
                transportProtocol: '8yq8dn1wbnr3fjvcqji1eh7ji1j4fd52vwcztjmvz9avw6h6ak9xubwvgkkr',
                messageProtocol: 'o5et3timj4wo3id7fnpcsbryzhw3agkw5yy1u5tdsoqf1ntjo8sqggjgfvlw',
                adapterEngineName: 'pcx6c1760o2frek5sorltds7mmjhlqg3wyxre0xufgjlbxqj1ih4m4edo9wxa21phfid79aud800fr4ix42lzd6k7crrilqm94evsrlo9682tq19w8owfdwk18w5s172ub9uq5vcy8i0ztx2afi92v1qbqybqy4w',
                url: 'lowhphwb5n2ona10uvsad652dwawy0rb9s1zwbnlpys2kkt9g691n8wyopabd3ww2yh764k4905uy39l02s7xj1clguh4gilpde237amhy5y2wm8f3x1pvsaqcpyt07fpbq7oo40quai6wnhmpm2t8any1u3ls80b272wj8oux5c3jzokdmbh3zdu8qm2id1b3x5px1uigxzihlnrewdixezy90ok26314iy5jry7ar8iaisl1ebts0kc6fwr2721xvd67syxxsw9dpfube49d5vjk76vpouum0hayozo9hekjy0am3rhupgzal7adf3',
                username: 'yvkqp8kaqwq33bfmmfhr5ysaiwslmmwmvaxepzq2fxvd97kknv2ip5r9knma',
                remoteHost: 'nsh446q7kip2z83isdyq90h8co1ykb13652jmw83wf8y61z9ll7kk4aq7a6c7k9uzydxvnxbx2s6sv4hikd9fia7clbtx19ou13heqq5pa3rtc9h56zadiih3hxzkuctjr6taspuey57osvczvquag4tilb7jlwi',
                remotePort: 8201054217,
                directory: '8uayrjm5jh17sn557dxs93n27b0gs38ekglqvfhhqexi4i6excv5vtb9bq8uro22s888euaye1823603cdl6do6eucw3fwtrf4n4zhwljw7rysjlj1jy9b1cw8mczmbu3sgsfbyuz93kugm3jf223lwj5utc208kq6a0pv7ycbx310l2jx008cgs9vwzn7f6x6ormu8cgu1wzk7439in5f6gqi5h0569zghxxd2foa440y0hymqwgciq91hg623rvi746rt8j36ifzro8igrlrv1fat43usbcivogg5ui0g7epcjoeihrazf96hrvv58bksdbuw6tbvwsjrmrcl6sof55oyjks1rrb3fprm6r3c5wung0vyk7f4ddy6apokhv02vusqgj8j35jfza3socbvui9ncgle75c71ibkdkuiqpej370akepcrwj6oesreytq96elotq6v8ctrhocapl28ws40y0fmvv1xir6xqiu2zna9r0lqbp8xduu2jnuf28spqyjf7ik6azyl5dqkrh70dofynvakej1e41jh3594mczojhvkowyo2xofsqjkb7ujlpc6b0z2nez4pgyyu9dm4kfttrw14zuj9oigfynsk5q7dcegkkuxspu403phiu6bmoztosor7240tkdcijknh84o6z85n4lvjoqfd394yu65j9qqlxdm113f4jtjvr59q8ht0ui8rvo8mswsmd96dtb0av0ad54t0pcecl5wjedue13onhns0o1za0xubf6emh7114s9tca689uic8aiw8g2fgojcet15cipseefnselnos5ffus59humm6cqvk38i0sfk0aunb7yktezqulua22v8x406zpbgkb9mgt2w20uy68vkz12adlpcezzaxlughoep5w3pj2tb7drggqeh24ux9cv82welnhrr2skkdwepi4lw1x41qwa0pe0ouprh64vj8q5qn9igcnsc2yds643ad9gffz8pp43y47y18fgy71xa4zqvrdmpr4',
                fileSchema: 'yo4fykogzwviuz782jggpi6t3uojelywk545jzqn7hdyncjo4ficy8tay17jm1h70ibmphfu3l0yg3bdvsnn56xdrvf1257k4eshryoc32jkq3x6zhzb9bf78kgx6haemwztug1tpsxelce0a821cf7dt0zmuh4fd27638jzexxlygae11jmdspakp7eh1gwzxfkxu1efpnf9iynna41t7drmzikm0r9cwihcyatzl2vmu0jzk8ftyy9z4d2dcn0ep33gudttjc8yv08vcpa953h6jcz89eg9lawxob6evczh0hs8ncm82dk09e4obvuvon4ty62y02xrtkt3dogaepjwdb1q7yloe3ly61a496mp1m9izlxl9meb4gd3mhgtuv7pgu9qf2h6vo0jm8var9ox502neg3ud6yxlbymhae6r1piigx7rxrfqh9gydzkkivmohxgqxoen3ptjdj39oby4jmej8598b669v4eofsab1yoc7xjsn7ppfbfipdvjovn457m44zvwtac3zeniz0bmrvfotbno3o0bw8soqlqt5iisdsoqsddlcjdq152z0w4gyazsu6j0l69hb30erypafnln6be586r5c3pu4dsietg1sfryi8rzq4hgwlu77vyq37om98t7sd7r2ujd8t4qr70ew74grgnxpimx3n2d3uzck46061bnqe601u6fgi9w21gkvr4d83ndpfbhwilcvw0nslhlxs8gp8yt492y8hqep8qo318gwrwbsebbp0v5u3letghbbuqf883yj612uy20zeobskfzgx7rqbo034rafmlt3d7hwkygxkvso6otx8m08esj7q3hybj2g849q8fuj9nqp7aw4oc098despv45yv5cpp0dqiukaalpjnrabonv371mdnv9a6wi20irhv3ntp6apw6f9tjajiwzszofqox0rlc7ks005xdtshshtfc8ze00rhmvudtsra0yk5wsn1vdg76ukgmtaf6we4zxrzg8xzvmwa0r0',
                proxyHost: 'mxmrz05p2rhc12jmxlkgkm3tp3x95rtz2cg320yivpya56w77ee3vedrxvvs',
                proxyPort: 7924702048,
                destination: 'f7h26iyzs6ug6zlsgu4yjf4m4x5gm0ax3bdh41p814vkc9au19hqysxhothsrx1i5pj2qby4uut86jp8g3llgf7ceg6djx9vfuxntzcfdosltmhu4dyc2kzj4jzue8pc83jt23ctnkrpmtmdwpr1l0vyvgrvd0ul',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'aftibkosl0bq3tw6cg7nswcils5536yh8jx2dxp2uf9pts8zbynopsin7pv4kc1x010goteqbos33i2hs03gyarb1egfdczjlood8fev5pyywamp9erymaospnyglzry7uotpzwmtahn0kwx6i4gxgiaxz28zbb2',
                responsibleUserAccountName: 'bbv8dmx8e68qk2digdfs',
                lastChangeUserAccount: 'apj6nvvdr32is6dxg5qe',
                lastChangedAt: '2020-07-28 18:34:55',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'u7gfhbj4c5jtdayr7el3ihq32yagal8aofmngazb',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '7vk1ilsyu4ahd8yfz37bqpw4iepo0nd5m0mn2v7h8pqefvv3nj',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'bu82ohk8guyhuj8xkfyc',
                party: 'n7uqelr34v9fts6i9tq4h4ienf5nqt9lj91nr1p5mamvg4mynj1k5ecr3fk1x4iwjoelrycw2xk0vpjkomllbb9l0r8046zzve2viqmemghargjmrmqds74aenfehh6zl293o1hs9nen7jck25txas9yi6ew12sf',
                component: 'a7lxl7fxrtc3ymai4s5h3v2kbtg66otva8i768w6nxk1iptynqi3c815yx771e9pychrlmw5ssz23w4j47qbcjiz9irpjczwbr9gnt4wnanuezw5dcaz44jm0bxg16ow1yh8uat7uvpm4jliym9po7lpz10p6pbgg',
                name: '9tnp954p3m8hczfochn0fq3xqis1kvo6ivk29ieg2hd9j63lyyf91ra5v7tk9jg3232375nuneszmqjvsr13elmsvs8vihal3fm1ikckng1iphpl11i88ofb8hzmfws6guvxxbe8y7uhm0ai0i357x95hlxg44pn',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 't41kzjcitdia90pgq984d2ku45b7b5td4fgyt7ndde5cmyrpxvn0acwlarvj4rw4xycxmlalejzfba3knu35wktzndoxz0qm3w4sopeu097fapr2gc6h527ifl1x1ledpviu0qxc0428vr5s41usmh18zuuaubhf',
                flowComponent: '63wam1gcw9tnqyl999svicihl18tj6rjkpnho3b1ko7o8m2ehhoroumpu73r9a7pslcz438zozbzpt81ma5sc9t7sr4yjlrjt75pq6moxljvk4ctlvpiifso2ib5tey2qvf86e5uu467fu0z2jnmm2oqfc30qdhk',
                flowInterfaceName: 'pqrz3560ab0b467n7kr6x3cy8a3s84omvchbdod4inhnr5aqgbqoa1yrwrdg2lou9l0i3i8q9u7jdidxyzlx5uqfo6glyzh157q0mmt2ze5nx95xewjdaq4e0b2uqqjufoq5th7hhmpq7ocwyo8gqzpt22202exi',
                flowInterfaceNamespace: 'z2r7yn6sdwymumwjc3h2kvs6g6xehed29uuimkws46cobnargcti9l4ofmwcxmc65wxdi1f5269da2yqnik99t5pbw1syfhi2vi5x1efj67gzf2syhnc91qm413r0dmzo2x4xweyr49gndquzipw27gcclyz1y8y',
                version: '0tzq4thqqae2yclflnw7',
                adapterType: 'b245zttt7ugmwi61vjjzvat06oq7t9rdslx16wg2kpf4du6rbb8xv1idi8y8',
                direction: 'SENDER',
                transportProtocol: '9pixj5i4qav873i1wcn0xsagieyqpizfn52vb9a6iwb9wt6gf7lwd5z4i1kp',
                messageProtocol: 'yt2l1behetwyo83ro7k0c2gw2j9ku4njigx0o3aevxx177av5wq67ve4slao',
                adapterEngineName: 't1nnwg9mdw3cyijzr1lghtxgtknwumhy59oaorbxm46gzybg1dqob2oeigeoko4fpctc1o1vzp49atwy5lool00ph29tw9y1jwc5j0wyq0ievvglfkeggek4y7xku6nke7xoa5sm4uu8dnhk06bbo65dqf4apzx0',
                url: 'c0o8i7y9g5lchodlfguh7vv7rvywhlk0loy1umyui4m1cwzej1h9ca5fn6bi4jjf8tcp4iqk244qlqk5lsre02ooh8rk642bxd97q3m3pxkmqsz89oez5ocyw87l5d8602vu0k9q3p0zqpd8wcungcht1t1tedov5i04zjnr7bi3tpw557dkel86ekgp871ade9e0uf01heiac0eoiwbwsaqojh1frojqt9wjuuuj0yb9vtnt9tehlf68lodqvo1boqji4yuhu3no90vxlau4ynw6yv0lrwsqnanbc0gpw8qdx3l8ml4kb0jero6km9x',
                username: 'quq30sum5znqfxnxdayno8j3g2mog8m04bwi9aq7xkh6x22ibfcvakcnwk25',
                remoteHost: 'inx1wq4z6p87y2w8osyw7hsvzzwviit8gea217iscoptfz7wit8b8mf7176l54ycecwwhngf8vmrg96nw0gkaw9b72xuc52y2f5zi1j5oeyeoj4anav4oijeylotoozq9qpdef2n4dan5ieps04661d3ii6bl3ya',
                remotePort: 3559717297,
                directory: '6yslb3mpyjlnv5fz20qw008h5al1o2igdftegyanpsrum76e94ar5gt9o704ysz24wcjkxnm3m2ydsj1aakqz4zyhgs5gitqmzx9e0ilzx3cmrv6yfet0rxqb1iy68w4cjiwi2jwc3xcfc351607b9j6nz9vj8v7o2cif5he5p77g7asjnajwl4z822h40no8hs83640p46e78cf3vlb1rge20tfbghnnw20bgasvu8z7ghh01gwwacpg8rnm9o2zh52fl5oyck72wvc3vjbkn6376psbqjmamkd6ezyoxalts08yb49s1j7kqe0lfts4rqfqv0pi9pby7tumc9z4jjwvt3q265wqr5kf1esc4msbji2jhfjwjdckgjrm062shwxi41yyj53nlijpnk4v76v2qgyf9guoqyi75nuo9wi7d95prhbduz1hci1wy6wgg6920b0bg1i71d05s4kvbswhz00yd04ijb99c325rh2fq2veud7ej1nb51vjshhxcsnzjskpc8gu0ei5jba9si19t41fmc0qqjhhflrq7szbgtvq4zk7gp5ls96wxk3vr7c8jnll4ti1iozofo1m8q4ni46a2pj8a5p21ve6k9fshuwyluxoout1gnboc96d4bs9hmm56jwfkc1gtt1zn33sgb1u09m0gacyq5bnrakyv781ke5zmsa4hwuj7toubcpqqimet46dg6mphzy8k7t5vf4lmweh383rti8sg280la8b8a0dtuy5yusccr35lgvlim26sjgbmpewxgtrkfgc86ihp6nd5pk5bjbexz3ktp5e6ouoqz4mgov89c9xg2c1c3d3a4o6bj7zur9qpas39tx2pz273kit5qf1fisb7ppkllffu16bnhgk2ha514nodgst7nebou89x9daqrqw4pffi71nt4siumkbedybqddktpfruavonhn72wlqh4dd2twq1ez4t0i94lf1kgemx6vet91gerlj6hgrvpkd9ojemmz3dsxybfqkxz9',
                fileSchema: 'i8l8vufb08jwlspxkrmg2n7z60bdcvbh14z2vwmppgxa16l73mqvmv0yjwwqrxtfek7zwlj646wher7czzp9ecvz8p99jxhs5iotajdzppomkfr9aeczcpixs2606i824x6fc60tlnrovnl8te4t72wg1qbgf54tdmo4j7h940k767csls2nmrlzuip97k7w82d3m3fdeawc20kmwti8wpnm963auzg5y6cnwu7po30wvbec5zskzo2vo5qe1q1ae8quieykazkt49y8kq79knwexb5yb3qmpx7tztb38hpdzi4qcqux5xvcps4xjcx6qb9mr8k2aaf1mwxq0puo2ddtde0qlbmm0hmfp3dm0h11j0hva5gk8a6oib0gnd6v2rtuhsnjpazdpe8iv4v23nxoacrl9lflj31e6w91ksyg00a1z82btz0rnjfxh6sw8s4ycvl3fmex4v5k58ry7rd6xa5ksii9k74hrn9s1mzcqhogyt56nmxesqn354yjft4mhal5ey1nd7fblngitcbgpvndr0tbmxraen3f4lrhz7wqiz2funtksiodvjoec6891c1zgb0rwogud968t620b5qsyfsele14wfed84pjw2bezgnhreq2asdrzgwv71vlhfqz0mm9urbh80kd0ep5h6jsvzck9u8zeaq7ngmwr761ey785jiqdqiqir6qzturdcv5az40pnhhbnx7z1b2hrtx16t8f01z3i3nmbcryjq6dl17nifol19b73udl6j6jkz3u7fu65zedqeatrdh62of48qf4r7hdd9s0umykvxn4acw4v17f7puk8uzgg9uydc4f4tfegt8rpv1zr7ok8f0jx8gvsgbi8p2pwlx7dv16aosfgytyjj83tq4bfkftlazfwko5kl8va0ytr1a7n3ujizqhi46evlucg8q2qxmojbs4s6ry4g8bq4594tldj08a8dlfy74pwz97uehmez2hfu6di3cnzry90m5orkg83chbzpzkms7sbos',
                proxyHost: 'zywhsba3hgop6qdcebws3n6pufhcvsbeoac6o4ombnhv9a1fah7xrjyk5qfd',
                proxyPort: 2465343375,
                destination: '0cbndn3vgybtpdlmz0bn43md4ny8py466nau9sfim5nxi3aanivckkifsbfhju3fahz5hp5n1qw1xn0lsmznty2ov0xy6k53zppsk4emz6h6ev0mqdtiaissfx00gg0rm32fb3py71n8janae8w8ugjtf14sbhj5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x0vw80yriyzoqhwmqrdhigx1p3pyaj6403vomqauo0b7xuwtm7h8zqifn0t9ntw5gc84r3aql5i2cyuwzh00u2tnwy5vt9getk7q320uzxsu38hlyxt7c6ogn0vv8wrpf3odo9vj1mfboq1ebvdfg7606n2x9b5q',
                responsibleUserAccountName: 'e576ol29faa1dqsldj5h',
                lastChangeUserAccount: '16icxih1bjwol9cw3rgx',
                lastChangedAt: '2020-07-28 22:16:01',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'yniu2w3ymiiszprt3trdqbtxaolsd53e7eph9ui5',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '5vd5qi0t1w2rdanxoyek5sq8yinbp7lu1oo3m2ub5pc3uhkysb',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'jfmny01ug6br02hdynao',
                party: 'u1w9441pvdr1jk5fsfaes603h6djoyo7mllwtqg4dz3gs8xz7kvembtekju8nvd0nj1x2k4avb94oqiwv3a5md70i0yebzio5y7hwbasf5h1p6pd68ikkumyn43e0znhx5kaljdx7a237vft673tubr49th72etu',
                component: '06azqlncl0g9qmy56zjvx1c0f0hoz38sqj0mlsgejrd7x692iww4kszcfbwig5kzmf5yew3yk2zlzqe8prp7uf0irxpxnphpqfqfkabylqxdro9ezn6fv653bsjpneynubmjeemyx9gukempwbircm4oic0fs9zo',
                name: 'vctb2yaq8ap6a3fr7wt5nlzqag2i4557lsj2hhol3e9ntxdgr05gtstyi8hisf5lxlwrr2sdrl69wk7ui39zkt1g5i55zwaw2nlih69044j0sdwbsceaijh1z89gmmq0txpsr5sl2ejchixez6a2sqapqmojoxgmf',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'iz2t3l3k02gnbh65u1jo9tf65wy2jer13q6yte4uhuzmvrz8kj1vlh565ndg2p58b8j8w1e7268mg07vbv3y2om85u9efmr5ed8s4r611o29c70gingkur1sq11q21kg6v5a2n6j4gmk5l7qd1bmlf9mfuea9tzx',
                flowComponent: 'roepv7oacglrigx8j8dve4xi2usuhswv6isyvian2w56fjstk5ktltamdoe5n2sivycp2z2zhyqgyqs4zuzf21puydj9juo0yrjcveim42hacrtmwcxyijlsbrsxzgkam5h32yqa7k4uimif3jtvq0ri055p302v',
                flowInterfaceName: 'dq0irt6eyuhacxx446z1hfrnkuhhosub03vv0qr27fv9a7uqxqn03uvyadw64ys05hni6n56fz9ouda3rvjqg807aqbgvkqcxd625cj8sc25k3yoj0phghe7mjbnvhiffo18yk4zzyf9y9bo3jgekpktuixk34ic',
                flowInterfaceNamespace: 'h3tgg8swzxkmxhlx0uhb02jjoqe098mxoeb51ek5mt9kxnxycae451ynlg5nwim3x8t84pk7htinrhk844m1phczzu4vifwvwb5gk58qcs0q9uxftncdtgu5rc5ytz698q8dk952s747v7flngx2e8gch472rgaq',
                version: 'bbtpgahsa1pl9h4lp0r7',
                adapterType: '3ueiyfep4b17rcag3xgu5g8l7v1vjqis1nrilgw5t8xouuy3bbahah8zfdeb',
                direction: 'SENDER',
                transportProtocol: 'tl57txp56vpda6h64bluh844f3s1gtsvs98nmqmfg3mp8dm5owxcap8ejot9',
                messageProtocol: 'w5nvft7cf5sln1o051txnedpml7fvj0z33j3y8gqwgck0nv1bdrzsguhkhy1',
                adapterEngineName: 'bbcx9fp2j4yg8ab1acys4shrng4c9auco5hexqez7eld4sf6mip33j3k6acx7axnk1yhrd55ck5l8ipkbhv7cj8rmd753uuo3r3dyclq4tztmgcbglalco8yer9da0r3jvygxtffdwsq25yqvgllw13gte6fs5ea',
                url: '26xh1akw4uk81tz9o7mapkodhku7ogjnxbkfu9ww4rcc0je47dktdhy7obfxrxv5hjko5o1zsxda2sd2ye257tdpho74ysvy4h97dnz19bmoi4iop4hmv3g185bmgek3ootye9llzp6zap569rsyoozr0zfhupai4h9t1nwydf0b9jil6fztaeq8j3qyqwrqg2b9dsqpxmiz9kdz14q25thjc09mel50ip0hk6h69owla65xru170iqwkl0qnk833kvsfnzytirqe1d5c1fonduzcsq2mpfhco4f4nugtgu98sxd292dog6iggu0bx68',
                username: 'q34d98gsk7ll68tmig8yxlpxap5qewy1vyiu4xg6vx4n3qaoej59nkmmzadj',
                remoteHost: 'yia4ufyfws2u480m6xfvemxttj3sm9xye7fo7da2zrxgoywlsrv6cr8et9v6tzvr5t5w75kez0or1lraz1e5oqgmcl2tv8a8qxgfozkmpggvubh9rdjj5uguifp76r6xg59porjmin9dv48k3apgy1swhit5vmc7',
                remotePort: 1133300609,
                directory: 'l6k6qwepja6abmun84glglz0tq5l82qj9qx8iyv9f7y49ozm4qui1dlf93c00qula4dcniqrt7lqm7rfco5wv71o5ejnxc3lr8roq8aebw66j48uztg60cvkzb0xy1bfod74zasp4umm1jyks5dyzalqfiwokhpvda79x8rzuzhx3utpqheaszme8zfexfjn9ydmglsl3pjvh65u3zmr30wi02skqvbdyh63oj0hm6d5w0zizi0944x3j8l2dln1o12lztb020xn5x9g3lzhzdndhegisqyl0w71vjoqqblsitz3geqpaynifidzo1dp4i0uvo4nx8qxlsgc0jgnx4xdgqo1akcfaqdf4wdfcona9awjy0c5l3tq1zj0wm7dcte00ih17ecrplg9ggvfradfictmf9imefduycm5m1tfg8x31u5agszlrqtwg59m1bws5s51ca6dd0tpggn2vunooj8kn7v3zvq1qzpijllzikeec2gnff3xtg0sf8w1qxineq3jxlgs53v4toz2eig52sqve7sc08d20gt368s7cyd0f3bmpilxzcivkfrt2xom8j9w1q6rxrpttvc5r5iw4327ij7nw1xdspbkz2yipyc2tbhvmkuiuz646fuvvn73ffunn05osfghqx1yh2rrjyaxugwoknrktafdgo0fhy3i2dcgqfgznhovnmdpyqf3f746t0o9teqxq3l45g29w0s33zbhlh576w2j0bwfo2by1az1li1mb41wpo9nq79jvuh4aici7gmtf1pw5nxgwsjmkk27asbcrmcdd1td9j6mzbnvfvx3mqo8a63alfmzyq9g63652whkqtn8zguv3l8bsg2qu055f8q3r62btnp4s6l8djtwdpvtlgi4ghjjrx438o7igdcuuo0wn0jfbxd1160qtct0lguey4fswd83udxez46ds8k4sadgz4ipq7mngpp5wkp6pqgxiw74hhijezs9wolm4zoyzrgpewg5bur9vjz0c6boaahh',
                fileSchema: '0eo61ywnck8m673bs1quvoxvtc854yz1lyn0l0twngrpeoqnkmg0on1oi3dro0p1xn0sjlx0rgx6k17amrbj6j29bzlnwssizv7uaxl5inln4lf994o7y7mrjsbwqwb9yq65zfjtwosq03a4o45lrh5ikl4zukj0otuji0m51t2bfbf3vnfsox1eia311qn79hiatrxo84aue7w9sup0la7de1g66fopzcbl849dcmo6vbkcop0wpfy3zm88gqhtn655yjzaggkxl2hgkibpon3ayczmzvpfc8o2hjt2of7k3z1hu0yuskhw1dnwex54imfjyyimsyqjpqj21ob5drkx4c58emnwxul9ykpuv8lkayubgpmg607k7x9getlnjpt0trd3fsdq66601g3nvg3s1rt8kiwn8h43xxstil9lf1s0fd4jg3xafaxue50xiuvk71qkee8jcacl0s5znmkqyis6sskqc2hjhtooe185yt4g9bvgqrhx7lyfddn1ppuga2i600pmbkxmqq33udlsyy8cpcibyzyndl1q58jmpyktd2x6djkylrj2f7fiaygfdwbo9uh5g9wzej9dc3s76lwz95bjippiesshma8omrwq9ozjoya6pd489t0rt1i3jt9ibb3z2zb5lyq7rhamuuigprpg0d6zqpq122czf7fcg25waeb0vy6evsb1pbq40x2at8mzv7eg91ligqumnajq9qg10fhnkx130s4ro7y2eff79h7hdr4kynzytbdp6wsuavrbwododk2w5a9yvrjk1q49cc70e8rriux8h4geieoilolccgrih9398ehj1bw5jtpclec73hzn5dybcwkt0rseslu3v7g1mxry9icpfijval28vi2fm82in1cew1dfvpedsne8p3ld08b4ye0rd33qzxsl9osrwcicuxbzs43pmmzbmzznxpedboxpn5f9eiska8oocaxxldriav5rn2ha82byxg7xu335ukxnwaeeifc7q5iuayjm',
                proxyHost: '4vnv2bq489ids4ueq9rhrkuwy6v0ek6up5t00xrd30yiixco5d40jloy2xi5',
                proxyPort: 7515753779,
                destination: 'i936h6wsli2azp98hrkajbnnni5c1lmyafk5wzxquaec3votwmhdfi8s38t10sl3nh5gx939ctiqsvrod9iiwa3rom8z53v2sc1c9y9cfnrj4dxqvxzwr4s3nn465ra0mjl4ktgrlsgp8qdrq7eoooxmy8ipp1ue',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1k1wd3oa3qx41dody825o0o8kt0dj1mxo3p7xtwo7ev329ijfyf7pdjnr0x6mqb5c2tycwqwnv7q9seucy4qk676t40iuyaqexeo731hqikyd5v2y2f0jsgsm3mduqcio6vdo55lzgdbbg3g96bjesticxtqli2u',
                responsibleUserAccountName: 'y5owkdp2utmgeb677gir',
                lastChangeUserAccount: 'wovbjazgc3vj5vly6d5x',
                lastChangedAt: '2020-07-28 22:59:15',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'lkisoqe0hpfjg2wbnx53ii4ah3ep2ueb9epddyq9',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'upsq8z5yub6yf07or0qolsqrnocdlaji7nszvs2925eb2vbq9e',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'vinl2xpco0dh4zxqkj9j',
                party: 'cv2b8qr5n3db8huev5osxabo6oimcgasl757584usj26cxh2vy10kmjxdu041r8eg46lzei8fo4dzngvzaygrrz16ipeqiqsfbttja10rdppy16vy4xms5m45arnfr6hr8zgkgknxbzrvqfx1cvpwnlgl4euqvoy',
                component: 'jynfbuf1ngiupu1fg4wwkca33lb404kkhq1oynyu4wghl8jq1qci5xi53h1vrc3ar66btpamisj32yijdc023dbroyipkrdb5jfic64agget55v687aj2ri8poudon3j8pyyjjyppkvcgzexbpyyzvrzpwmqbepw',
                name: 'pjav673ibdyukdll70klseclh283nqtm9s0dptta2lfwtiimvma8q0n8p6wvt08yulmvq2i4uwz0fdq2jm7753c4gahzkhx5o89j8dqyaj59278c39dxb9xtwr1dsuzcnb1y3xziiwxot8wnxu3gf59hz9zwois0',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'v8rq6eei4spx8w5tvukxvdaqy649azg92up8lmms04oz3awwifnotodc4ftx0cecmv9tc2zpeltwp07xvyf6os19hwwubdbplugfskga7r74ibtqvh1pa6gq3l2nwu80d0pgredqxjj6ntotof6aob5ly7yy54l0g',
                flowComponent: 'o50f1yjzke45xs6aec68lfo7z2hhcu3dzaijbuo3i2jpzybbtup8862lwo5k6b4bqv34lg4v6caeuogd6k6u3bhjqsb8149s3m546eh5x5a3vap9jmrip33ms692staxg8knor0ebfq528e918zvjq13w9bi6iby',
                flowInterfaceName: '7p4yj9f74xi9ea04krtltiu3sks0mjvnfxazmzq4z1u8h5ztuxep2hgrx9abxu0gx3rh70zccbnnj1opafpz1gcuudhqq7lcgzqtlmpi4xvto7uioxzjf5a2oegxwxvl37j2f7qxjb8jeez9cab134dkl013y2yr',
                flowInterfaceNamespace: 'jtx26ioifwhzqwiqnc25anhephomua2647u7bud7tow8ft182bdwycizja5nw73auzltld4g4t68ikti0t95cv38643gm1acvkobg8v1lu1f227axy2cp7cvhz4ymo12o4n825dw92iebfm6xzo2a2azigzotun4',
                version: 'kdpnyc844ifkof8bsj9g',
                adapterType: 'yfuk8py2c14zz2n3wyr30xz5yezl1h55cbg292o50fazezqfaed0ezgdd40q',
                direction: 'SENDER',
                transportProtocol: 'ef3myuf4d2hkw2whdbv4qlvnjd105908manqso5lmt93er6v0nx05pzaxfbw',
                messageProtocol: '6vx4231j1nfx578kls9qu6vwqp95sv5ed9yx8z26hamnqxm2n3c3pwqe4xcc',
                adapterEngineName: 'e8wsvvp6rosqok2li7qsnm9g252fpq32wr5ux82ub428u8w3l1pmd15xbqqobbyq6dnlwetjp6rncrzy163jjase5lc6jrm8wbab21dfbqkl9gd1jqe3se70u74zw4ywjy02wohpc15f7dsbw2iulv5uklpb0awl',
                url: 'ggav7mitc7acup02rynuu5w3ln43q9cu2qscxl0oj38j27uffaf0nrefyivf3h8cr6mm99adi036r1s8mstdhg086yjt61l8uzc2p2l3pes3esp6car7sojqw226f9s7mxcg7c0v4uo2910e1ujpf5os94s857jlkk5tseo21joap1anlhgzdf45l0hv4uehl7i52j37sizx8ct72s228ok990wfsm1f5qnboddc0k0pmd467txttlk1v1msj4gvkh4701peiktq7b2yf51oj7kwarv989o6es4cuy8bdet0c1udcp4651v67rzfh6we',
                username: '0jvlse3l510h620zhkbetylxgvvn9rp5k9j4h3yer715rlqi4uxkgqw6mvs7',
                remoteHost: '03n3kw8b4rxds92xn5bt4e8cz8o7ryoitlz4s3oi6h3uezoapy4lxtn8pzhuduta7p9dh1917b0wl82rpt9k5akfnpxx4m07jlnbzrw98i4t9itg3zsxkbtbiyajqki8vw88lsazdnow4uify9ls8u17ltcf747e',
                remotePort: 8183294738,
                directory: 'yvnzshuzccd0tw6y1e6vfmahs6tmfdowb23g9l9ebzl4g7pcpt97nitotoprd6q8a7izjpmmlvpl9s2px1oqzh1lyax0xl3f41a0v7bjh9lredexqj7mliyqdndhv5i1kx4ialzx7z53dy2pu594n00jyglxbtnov44nd3qk9buvzep5krpck45f2xygbeim2jthdpou5bs73ywzkl5wznsgtcv74xaanu8jcjb4p6dxwjmwf34duckbkxwqd2c6kn8nvncm8opu4wgnon7ulqrp7j9lrvxfgp85dg8t6ca6yai1oixkrqbuk3a88idzj2g06vqe7wdo6qpwjnuvay2vfxglouyqq64z3r4br56znpxruwkux353f5sm796c5fzsraf2l7wq7pie5a437vkclnii61z6jr4rrq1pqtnzauu8gnsyncyuy8fcr8q5wcsaxp0sr0ryn9kbew0vmgo4a1sxgaq5r0nxxnijidv3a20mf2ni161drt7vg8450bv89fsv54jmdkrhmvt4j9pryq5wi5a49f8bsu5kso9wq3at706dipe45gdrugkhi22l3ts0b17x6qw771ko9gnb9f8awds5pzu57me1ordoj8qsne2h8agyc7w3m8z46jdnzofp8f0ssbfkh4jvdpynv7q1svbqfmht266uybvicembtr27jswtj9fv9v64tcnu7ourpwtr7q58bqna9otdo5hz71cuyw5wjles4m7w0dd1b3n1bsruaflyhf4e5mfrixzrx28a7wuvr0uymk3ephoo0oaru0drmd86bq2rabsgytbg9vd19jtig2xcr5vw64m0hr9bwgmplf2trh3rrum1u6tgvm4yesxufa1pzeyexa7gp7gq67d82xuf6zhkv1wszkghdky0e7rbzyo7mtymqwzt8akjf6kuqny7rh8yfhk5jr8oquwbfd6g8k48bs9a53ycfmcnvm7cniisngaptmex6xccdjaykasnba8r9r4cx8lr6klc18gg',
                fileSchema: 'aynddswqoap5286m7cayvu6zd8sitt7yryhfx1uhyi7dm9jrexsrmlodbebstiptncxl66vqihzgogpzhcy36o1z68r6tj8n6fzhmynks989wqjqn39hyyiosil3lzmt7oshmo2ad6p5rpsx9zik7er3kemt3pvhpjced6tk7gfq3fzlrinxmgacpq7qylngbbf4olzsleonhhms3l4rbse6c1wosfn4v2ejihrn1umqtqbnoaf0bcb6hkjb1yj2ir3zbtd0m5g5i608y7b4pa46aoe70zcmwmepz1i8y1h84e9cy04w8tdd48jzwck1p1zh2zxpyzov10qc46bhfwifh8oqmeb35fdnarvr6uxnpusctj9jx74qtslrb6rneb1gzexu46z0mr96poubfbddmv2oo21u3ivdss048ljdti01hkmqn2tbryieucbeb6747tu4gd6cptgrbq723a1ymh8mkpg789jpc84z5ea89ftp2b3degpsawq4q3xf16j4yh9h8qhvlb14nle3j3pgjtp7qgompn2ul1gkeqoijrdsevsyb6ksvn634s5wuri12t8y96jruc9xw7g2o9cah6vct9ei1kfvugvvei9cmftozhp7ymiyogpkt0htuih692be9d6rrpy59iab46xrc30h3az7e5ppkjfll3d266jlfyxe9wugwlt20koxvej938dwy4t4n9swrid02lg6hgwwzigaji80hbcvdn0f3r90yc0r092skjif1h6ezbguhr7j2z7qytqq8zkh1i6w9a4uvirib04hrdw8wvdu1dhal6u8ys2zuk54wsk59ojfnohxnwbjfnnkt0eu1aij4zl8z7q8k3v0fiaqnts857soc5ddrhxv4qe4oy13ca45n3ubnk36a4rdedwyo4os50uqwghmonvl8qtpfgpv0eaquzhiie24robav415nka13nanzyeijetu1gxdwmfj1ldhyiy996bpu6mtjt551p5g7hf9s0c2r796qvu6',
                proxyHost: 'vcrywweqea3a9v6l353ce9786tqg5d2p5nhtqm534y02c991lzkuuzz8aw64',
                proxyPort: 6388023997,
                destination: 'oyo72ujxt5o2a4enb10zyejovvlb6lt7e8qgf1iks6bhr11nrawbafkb75ndjvpa896jehl0kb5e8iskyxekpluvwgpignrt8qh4zrkfnnka9xaupqz901ac3qr7kcxkwtfasuavo43bbggmnrtcvv5b8k8rnmua',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tu7m6girfbo05qr2ejgzcj35irkfqvh7i5c5ulgzef534bs3lxwl2w0culdrprk09mw8kz627cmyz0v2471stbu1abj6mk6quxlok317fkpc937byyoxq1jvolvahksxp3bnc4nwwjjj73d7ywpbx7x3iwx8gx4l',
                responsibleUserAccountName: 'dci0vuxjgwjrv9f8g6tq',
                lastChangeUserAccount: '1b62ui3atoxsxfqednlh',
                lastChangedAt: '2020-07-29 15:43:53',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '9gz7qwufs1vmt6nhgunrqw0j83s0g717axc2zf3a',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'fp0f031joxugev5nenrrqv2q5jpqr62vrfupm1o4bdd0crz9yk',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'r4t9b1ao9um3zjafpuat',
                party: 'xhufo9fxsr2ijfpe86u2sqq4bifkav1lw3biuegh5ml0p5hhg05wxoyysxgwq04zchzpcnojfpi25q17qmpthx0qrpb2dc9ubb786v7fkvj2duuv9pe74lr8rm1uutr8q5n5cznac20wo4w7q86949ptdxxgcg1w',
                component: '67tpkhp02h5g18qo4dfnj09fbtyf93o9j7hd73dbo8mrfhoojkzmhk89et61l4asd3oth59l6ovifmm2gxlq17ltw39bd6z9kmh36udph658ig4stthgpx4foma60h8xv466p3o08rajyeepor796fvunpf9jvip',
                name: 'qq5v3nvbmu3xf4jqkprkcsifsp0i352ghmbr2mgj5imhpsoesap810sbp1ipi9dfaqok0ai3u4m61f9gzm4hw7vrbnuow3jbusjo4jh68gry00xqh2qm4gf9hzt0wpl43rsf59umpuv2eu9n16zrd2b7p4c5e10g',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'vkubr5rxwz4ervonts38n17njqg7udclfo7hee30dy7ty894095i4km8l81m66m7kvi24h28a2prqqwg8ntfzqpmtskrjwz10phfi5u98l26q9bv3tb4v066b80j1z8gld8v8fj5g6o6i5hjb6qxffv54pv45m7s',
                flowComponent: 'esjm4sllpn1f7r2v1p82s6lypdwd4miuja982p42ngwom8w1o4fiqpczi3zvivpuq2j2g0s878on0kwnnout2cytwyugfyo9h3bxd6naah1irkj5fl0776tbj98bthye62fyn78n9pyca7flsc4apc1zs9jjmqknr',
                flowInterfaceName: 'zc81c6lb05l80cl9qcic3nv7jkk3blnp6cgg1rxnlms5v5zb32g4q4v44nuoxwli5hneebru4lyvopwh2sylrxi17q1s7nj9taz8tcs4u9nxnmf9p95ry2nf9797xv4rair8wxs9z4m93pxlher35tp3fb45czlv',
                flowInterfaceNamespace: 'jwgvygvevly9zkmszphytdekjovr11pj57o825611l4i0jj7nyylgn6ifjf0jxtw9h077k5cg4uym8dq7ed8yuvm2bwaoa8vj1zn8lklzdnk7jfd2qv1doy50w8pyprelkqvntun5i4eoz6xzvqs9h4z8ldv7j6v',
                version: 'w8vcke7rf9wajiufdhoq',
                adapterType: '5skpvj9rcor3mkihg92fezce5fr9a8wmdk0zrm0avl9phktn2vpu069wk3d6',
                direction: 'SENDER',
                transportProtocol: 'sq0n2athh0zrglrpzwhg50pku80fa02gnx6t8b4uzo3tvmybuu0stslutn9k',
                messageProtocol: '75ze07fsz71qls3ju5nwi3pu1p9v21h2hd8b7gr33lffyq2yiaaru8u2feex',
                adapterEngineName: '79hy3ktwr7epr5f0egr09l6jc91ldk8tmc2vmriwr2vjiwes65xjudjy3wasuktlpble4ijcdu0ef93vq1xnfdsal9tlknztd1qp0ve8ua1hhomi1u027m3xperbasi9sepftl30klevnry3qoanvun5umowz855',
                url: 'concg2ra32xowefc1a9b28kwyien44eozk0nyxhzrbijswvv6ythw84ekhb0k48kiniw41jp1dq8my26mcucx8ua5pdr693eodjriueolg3c274etq5dcrwoc4o1qrgt2d245ys7ri4nlu29cuhwwe4dvyjpzlqvl4qw5opb813ojjk20kijtbdqz9p8vxy57cuaymyu319x381czigr2gl4uy1wwxh0g0infb5po00c7w900zpsa0ciqn3g3hqux8hrbxp96nuxvuibqg93slni0gqanlhqsry1e1nowccf8hkt7oyzeict5j39ui74',
                username: 'nmc695jz1s82dw0ahw4k1krfaq9064flzsaihoj9llwvsfkf2uyp7txytsns',
                remoteHost: 'aq2omlnmf7foh5d82cakq7pqj466m128y9a7ktjoh8ec43nd26xjzn4govsxuooth1j7r6kweuru8xepaytieo1f8wohlh150t2m0wd5rz7zngnr8jxkh9gkfjr5pmj59rq4jg2hsyhmdx8zts9gqk7qzokn9vop',
                remotePort: 6130382602,
                directory: '175mwjo9mytmqv26ddyf2wpxz26q0et3swt25gftpev8z9w93j082di90dq9w1hbstqn14rjheynybrbg77sqgl0e9b0kdvvxkqnm3wiegavae6o0mbkqj1ru1g2svmbgjyeeowmdtv59nk8t9ryr5jd2j3x3tydxz3sp7w5mapw7sxwk8kvk4a230d43mjlqqdwtnbabcrpm2kdpezsxfzhkpbyb0vj5h6f84s1n1ocqg5tlxrdd7scp7ng4ngsf6rvon9b1w80oblw2hqd6b82k34ng4wdvcpl1b4sdlzaj8n36dzrwxn3wcdswny8k3bqo2nguxopsffwljsryuqu3qi48h2epf2vez1yynfizgu9qsqmffj81spuj1tz09548qdkc31hb1jh4d0x1mn7kra45k0dib6e6j613xmc0j2ahyh3jvbvx9hxtq04whc95jmfhbplmhthdmsm4uom30bixhhgjt5ekmdqp83ydsm2t0ewqt485fuubgfl9cdoda5171gpug05wlf07wy4ph3rk64s64fm2bml10xhykgdnswf0i73lc2iuou14gyhr21v53f2zw36qeer02oaesvieqv4fdp9v6y7kz9k0zxuvketb3l1pohdmmg88kyguyikdztujsay7j6oxf784jehit7n91uudb9e7pgnprur8vdr6sg5pb4l9520xfxlds4gqu0ddrzk24w75pl5qodl5tfab5n1u8kx5lhu7jgreabdqdc15amfv1wbw80kmeyp3le8f6tsosguk2pcpt8pzeyymw9knetxjnco534cv9dlv8f2xcslx6l5v802ihaibxr6bt5wtntt7nsetvgumz2km8zvvjbibof1c3l6evvo01oki6mlapl4xww9m2nsvytjyqgkai57vbx8ln1298yw785y79x81kw54rqzpsc03vuojq28rodek16768k0ik8lhncjiho486wehzhhbmx5vsdj02dazs3omj6nrj2zyzvze3yojqk0',
                fileSchema: '6bmfgvzrnmnk31mdc5zihr5ija8ct81bre2l1n2xgucoena1y1dopn8c36otz9camqhji8w4xs3ixl318r9dcbfzgbu11ftz3e6j8hlvcke6wskalfkp1zooripvc0jv7aug6k2vcq2du1l9ugvzfszxoyqfyvrsvbcawwa4v23czn6o7nqjjqvpdsvgbomf8jgnuvcopie2cekix752ydcc0fyzen8gq1h2odfcywihsxbsvtsrdg0ag1d7vqgm8o38aq559ngwtrrafo42n6135xnkvydec6o133606ghhfc07r63a5oo4vpa4xd0tuil09jhec3pp8d8agxtqpvdovp9u046z0a6ffguhq9lkxwucft9dc30km3bzp29v6hka9gb9w4fjjw63vzqls0rqqk6z7s80p4gn7d0g1403jiu5k6te6fnxf9fx9y1nlmpxwkp03ijdtvj3k6s7n3hmtrms3qy6hz030deao3835nc2dzkngknf99riypcwihoyqw954k8nm72np0cfonko9zdrd1lrph2kiuzk08j371401vt4lx9o06rdfrig8l2a3jio9zul1h4naohwqgavfmtyy3h1ktf1h3minllz16u6ta3xn8zqtd33b8f20k29p9z457apw3g7lodelho88esdet9rtfiff4gaszl7uas6cuejcvopt9ackuafwmolkmw101s58b0tyspowpk6z5q8hr6rjuwvifsjeif6yu8te02qwdhxgaugzvhy4nnidw3zetr6by9xmg38ktaqq27aqnvam8tqptvxa04dea4jq0bglxatk46a5igfnunxv62qz7rv8v0e7qu5ma3c0wtwg3g38yaq1zfni9ypjsj3301v6mcvxzhlnufpzdat399j8iefey074mcpplgchqrqwszk5uvaajjtofna7azbx0yp3q9llgtu114tp5ze9gtrvzk93hgj0vigls92hhhzuvwkqwpz8t3f26q3bevn8pdqt6mselylchr0',
                proxyHost: 'hsow93fwba3mty3g6vc1niuo68oddw78xmaqqw9h20e2q7cnbqh1k36fagbv',
                proxyPort: 8992361515,
                destination: 'a7whbpqaqba4qo51qobyn9feqepeaot9hzpeqsslc6uacinjmzf6oassxredje5fb279ks52co474idio6igin9htzpn0jdl7wy1obfv86h9ol70ydkslc8sazgi2as3iwusu650ksl6suegn43qrceeqkpqi9zm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'znaqwt1wj7gx7d56tf4iqx3h8cd1ybd66sefb8c1wl9m34ffv8jsd39kpueqkhpa23eno7v274pthllgabvuxv9yq2y5ioqrfoxgrndsff4cqkq3q62jqda6k4hyfwke33is0rux834tufdzs790gknv23ceoyqm',
                responsibleUserAccountName: 'gqw6yom96ddtzyllu2dp',
                lastChangeUserAccount: 'kd66j3cjppfchsexnepr',
                lastChangedAt: '2020-07-28 18:32:44',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'qds5o881zodq1en24p5z6ndgxabla0pz79dpiac5',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'w7hhulpyqsmue2ihmvzt08t8sjra3djrlhlc1xwh3s67ip4z1v',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'nt5v5lmqrne6z6out22c',
                party: '8xd2fo80nsnxm08pe20ohzaun2j3d6jz1ms3k5o53q6cct7agcl5f8mjdakg5xnmyvn3ngbewkeh8ype3u0phpbwz95cu67hkagx092xoz5ku8vlfl7jmq4y7fuqqpwxvfsqwtnfuzqsmkzf9zss9ns4lwk32e3t',
                component: 'kwlob3jmo29fgtakv6hblfp1jnswzmocc1lwxcf65zmolnpfhnej7zlt1y2yeyw2quggchy9wvel2ax0vponqzkr5vy541se2skozavj2ogke0ezmt68x33uf1sca3qeqrbnkiv4ttgfpmoipmd0fp5iuc28yrns',
                name: 'ncydg9xdtesx2bmqlwmf0r5162h52ofyksyp04lrbvl6s3pbs2wbv72ll0a7ssuljuew3fgcc2944yhzxduy20pqaljjli696qc2eh3hkzbd41y7kgcbrkfshn1634mx3as8ubc2od06b6juahcbik6auufbgc5r',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'jvrih3mcrie6mm26t1kp38io5r128p5wi9f73ytzvqq8d9ozh659hexuhlznjmhwyvykl3m8jtijr93srgrwhj0zwod26ir7rn1aghc9oll5lg005z4hbvjn95ucxgrm6sl6ialojvinbkegv8ru6etlt1k3kg4c',
                flowComponent: 'msw3tlwh4kpxii7amqm733jf06dqz8mm9bv5c1phuhjjyoyw7ts0gr7buq2k3wm5bwqmvpasbflrxigmkof9f5euttslbpkuh0s7qwrsew8dax9h2yoouawy8ajnlu4bjgi9tiamt4x10uhvg12ukbjqt8l7ubrk',
                flowInterfaceName: 'm9nzr4s88lkqekv4eu0ctk9ieaql2c3x4xpkbzqdyu5aqhicdugetlwrov4ma4p6415tzu2mogrx9ev78ykztjlw5n5r7fcc6nlud0ci2qfnba6ihyzfe03kzhp1kyqrj8c3mgfksji1zaupbqob4oziuv499xxc8',
                flowInterfaceNamespace: 'z16lceoee6h72v5j04bgfbrqzyx0yq6tdqn17brutl65jjd4zc4axmm10f030bc8ocry4qqmrg22b6uun1yumakmiz6nx04ljkwuqpf2u8be9v6n81q8yq5lq3xefk83el8o0td6n5spja16zoqfr7e709g4aw6o',
                version: '5ii5mxutvnwpob4szlyg',
                adapterType: '7yqo1s0rqynqhosyabpx4k3oc4xxahfdoihkqdym5d1hauoki4bgh3yfded5',
                direction: 'RECEIVER',
                transportProtocol: '3c4h7n6641jdj8u5v23rzd13flfkf3c8e692a961h5aewfxnvn6be222f1wa',
                messageProtocol: '0ue1eho4w0piiocwsu51931e3h6lpk90ooys56p7jef5casycl2yxgqab8do',
                adapterEngineName: 'ohphl5n24ige0vpbezsczc5npbgyhqohz8d5lv1y1okqmpv0plfpggu6vmuhu5d4zz69ut3zeikvtppd67fyik27tjzpyfiy7k8p2a341a67eji1t3br1m5iesnuroiktdd48g28yrakovwni44rbpkw65gh6njj',
                url: 'vlct7h4gbywbkul5rwwdxpki5h7qy874o5sf44xke6zu8i5ylczuea0dfjv30lu3w3nhwc54yic6oqca4t79vlf2z8z6vuhdas1wtscb50p9dkd5qrp4tjguzn1q8y07bckvcf5flzpg0m4ev0llw9i44wtte3y5308yruxmmmbhexn9daeh9bzbh5uunnhpd9sz1reglf10n698tat31f6uumd8fxhujcn3jse076aubp8d149fnk77abqqqft3x8uve301qlurr60q4wjagqqihqg8ki1n72fljlimk7nvgixmagegltztlrhoi4fj',
                username: 'nop4cniucywzbmwr4epb2jlax2uzwymb1keypdnlssnvjlngehgev57xci09',
                remoteHost: 'vtp0zapdx5wf7u3qwcvlihsd2gzb6sz0omucvl8d6fkeotqbns8bbs09px6b1dic6lykat66dvr1rl1e12vd98eh7412rr9rveg2hs0zfqmthzsv09txcswc81grl6kw668gduqh0nktzxn0ycqj146jr9ykepl3',
                remotePort: 1866839427,
                directory: 'u1k7zzoj0wo20aqbsrv07lc2krzh5nk6m28nbsahaqbb7ltj0o2e67r8majn5bb4ytmh8j0ck4fjpxmvi81yswmyxorzof7ris7uexvlwkjwjkcuv19dqh5ajkph3i4k9xengu6z6vtbfle2hdy4irjaht922hd89rnlgpzoqp9nlm15qt9lidkr79conh5uncr7ra06wazy97p7vtvubpk8pvrpnp1l87xfs4kp6v5xywl9ds887dd3eyd9mytdwfexqvxbk7gur4mijgsoltaia6knpl993hoyvnnpkf0e5fva03lapy5tuy672ccv238utrucxneqwrqncfide3kvpz39pz0crg74olnc6kgtbgpj6njkq8gw4jjj7nyky7aya9xe7lgh44m85hagemtycisw0fp7whrqk94o5pbd507wvx38700om9u65evbbit0fyqdj13hagyn8mhy0qqmj435u8fsoox3v6jvxppp7hxq13vslw0dvc6u1qz85d0lrr2ir9nfb8ybojmecl69hxungumvsyin9y0y8aeeel2isncu02o0hicnsg9hxvjbbhl0ey2vheaoqgeyz26nts0cr5ttce4qfzbckcn0i40rwwyvnoxqefz6fng912vsam68qkz0v2s87nqehs464715f3f7m22v55hvmla4jhx6vs1wycc06405ri7zeoiybjup9vpcp3xphvdlv4xjmln8wxgwxtl8p5c2x5fi5zl40wfa4bsywcy2twy7fpmaaf0zsk2jw446pctcznuw6q2r6pch3rmqg168qekxz0c2ikjgidznl5k2ww9l9s5quosn1i212r5wh36lww18qwygvelixw69mvyrhwtvr0cnkizz4ia9qxxy4ajxv8rnuqdp16vmbv97tlk0tdkt5dns1lad47tqq9uukfwtbtll35pv3pakknaa5x4capf9qn1au0rmlcym43f098u3u3q8nsbbvwn70w6chh628uipo1qo4ufni0n22jcb',
                fileSchema: 'f3278c6sjcdzyusg23i4no3glz4jt3q99yhfu75h4j54f3gh3q82nchc4y2scb1gyox81xq6d2dr5x3qgjo555mgl3ytx11xgu14eeybli96qiwoybh57zahpbkja0np6thhmliuqo98jscbxzfsd13l8wb57xryoe72yibopkmzemxxslh26hpjd6tn3o6pwqwiwmep0o7kr9lki3okllto8pqzoi9g4ywddewa6947iddhruwlgh65ugpuu58lajht7hrxvrm8tf70eqe83agp2tzi8c41f2bp6txyt3ei4chtjrf7vdzr7fkypj078j8ujzgl8xvelgim1xvn4s15c0swvyecrv2tiic3wjw1g44wr7q2m41nnc8wegms4jujb7n74gj474cxabxsz8o8nimv28mvzkwn5qakby2o4opvg04f7zyoeiodvigryl9y6rrdj95na3kd71wx9c4tvprisw98c8qmmtnapv94s9girp11iylvogy9xui0qmv2ryun24gfnrgas494x7wpr3uy4yd9om3vb2kfrayfr90pokwywazp7s83k5e9mmx2qa5p05utqdr3jmapjagaye4dp6q50wxs2041c9xdugrp44myv5ivbu1mfumibtg3jorvs4qqlh4fdkyjqgj5s3v4wiviqobq3ckp8cvq0h7bnfpccbde4bts6y55ravg4uwcxft1vqpb87ndrbr3vbeqqzkekozw75fylidbshvum42yglwoy4me80bl55kkni0q3pcfb1b5s77h070madtn4qdz6hgb4b9mundkjhujbzurjfibji2aijzl44m1xea79vx5f1aarvoaj4m6w8a3fbn0hiu1znkbbayaeoo4nu1mmxglk85rrnhn1cg1d8lto2zzmsxwuqubo8i7umiynjxw6i2wpo5lakgs7x9ki0vhlhxuc8vcs5pn92w1rmn9ptqy226cdhttwvqrvv7xn568i6ehwwdrgj0we6bccvjr945dvmf16j9c',
                proxyHost: '9g6m04fkmrhsqldgg87cugi3eai7fgpx4hi3s0rirmzcj8be35njaxdcli0q',
                proxyPort: 7078521510,
                destination: '6vvylnr0omcn1ndrl1qv4bjm45mdyg733k6dp9kyypi3jw55rz91k767s1ktqxrbt4638bgjqehjp7tvndca2rm34x0bo4atmod6yiu4lfc5wm27r5uvsw4ugkrhtqhvhfylksk90lhifvadg4vnc15mfckc93p0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jcnbfko2xirkrkyzo8037tyey2gtk25xzvg11yqg0co865gycr1fe06k2klo979813nn6vexfncahpgn7x5msc7xxul6xm7n5484vy5es5mxttvil7izr5eg7vzxi5znda3yhliq9vilib2uk68v82d7md2zg4q3',
                responsibleUserAccountName: 't9ae51fmo79szu0irilm',
                lastChangeUserAccount: 'w3tvaew6l956itbc8ew5',
                lastChangedAt: '2020-07-29 10:47:19',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '4ofkhcishrqqhdtfn2gvp5vu274ixbd5d1yy1ye0',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '5fto1dol07cfgw95a4jbaoykha0x3uxj1r29y33o1czkvznf7a',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'kefpgtpjflsgbvmb9t6r',
                party: 'dl8v63967yxhwvrc8jfq1g4pxw16tajk63vfrbqly9wp8q80j168yh91i2w576v0lcry9tlrtafdpcz4avwg9reynqzgnfzendkjfy120c2yarapkwltra4t9eqchrjpvbnxw92uuncn50s2xw69bwkr4o6ep5li',
                component: 'owmwrn56tidd8kuxnnh31iv7b0nas6njppw3rewzzv5o95gga9bp40iyhz866u4fj35kenlcncoofmpq9sbniybiyhur33qk3j2c9xi6r6ki4bnfus5dw5adomp1uqxiqpc5p7eqz1rzvxwrwvb4xjs5qbmuxszr',
                name: 'pp3rs25ddu4d6094xd1fil4b2py0wp85oo5re82rxlb5few4ux7mynkr8t61dj5niiqz75tb5sw0950blwp6sokqiakofvov9zxeoz4fcd4f5ns9ku7kd932ehfyh4qm1uc4uwmaqusxtz2v1wngbodnwrloh4t1',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'hpyh1o331stzt6wbic6p2878g19t1eqh3edrcp6rj2vzfcyafxr0xwg4na0nuz4x8qdlylv9rh2k91faphze3mqbco2wov8uo3ttd25y2whvjxhck3s6evn0ofy0gwr91hdh9kzpnb5to7t71fiabosn2zwi2fue',
                flowComponent: 'rj5s0rm8p1caw66ppkcwxg1lmeq7s90sxaapemoh8xdn7rfs59134fn4yxni989jqtk12nzzkqlo9yc6zxi5djkw6vyeyng2eehkn14mq32sr9icn4w0jq87nina3mlkbdjilpzn0gp0myrpfm45mf9ii2bpmin9',
                flowInterfaceName: 'bh3unl8kpg2vhz7p6q9e91u43u8nbth74qc8dlpgxiyzp894pjo921m3zrxildcneri0bko2uybnbp58882enh4wre9qf3tman2jspuq8vvsi0tw4txx88gjdi4gld00qe9i50qxtq3v20cp730by81i5znz7tmj',
                flowInterfaceNamespace: 'hss8f7dw208apxvlcn9xjpcqfy4wztvwaheba2rontucynm3t4ee0xektsnk2rdbt53y7iap243r44516if86w1lbtlvgtuk4466jshpel59xlhucifqzg3tyccwwpw5t0ujyupy6bpkk474p4t9fl9tqk4q84m2s',
                version: 'nc4p7t0542zfyzcwccao',
                adapterType: 'hmpb1up2or03rz5sf4fqingw4d4bbil5zt0f2qjlnnzvjfjagvt6y9m4ppi8',
                direction: 'RECEIVER',
                transportProtocol: '9633kocq69p93y5cqei06x33k5jrgunrzcby6o8fub5bwh7viftpjrchj3sb',
                messageProtocol: 'r2lf53kco8fvn104egfcqi8u5ts7uee3zoosyqr4j8wfea994o5sp6865kgw',
                adapterEngineName: '3uwjq2mot3pi9rp38wq3wgagj9urwb44fqjibmqaa7tcce2u1qq0ctlq0ujxaafrksop4m81d0axnhhplo1z7inxpl4w083m6mtmoawzdr4cc0tncz1yr2niostdvwdcsdmjqk9u391pptjujo7i3xe9pwt0z1or',
                url: '9qx0aus0wxnxa8tw7md83s6xqsszm3gxk167udghp8ozoh1a3hw191cr2l6tuzis4zprb4bsyzwd25hkmy1m2alvyxl254h8pyrs7vb5oavbh66i9o3w9o8c8qhob88b4vl9u6xij8cjq1p74mwtoidomc5yaettvq0a2trnonfpn4rzmipt9kcqft84jl1di66xkvcdqoklqiryu3t0iwr7zxaonaoifkin7l1yz42g0memqdtpbkg3g91jtijsa9jscdac6m68b0izvcbgtytxed39qz10fmsycca7gzr4ergm2xjjfrickfpc6kub',
                username: '7vwdpr3wphitz46sbufeaw3os5imry3ea4n2j1lj3sdnhcmdcchvngnaogow',
                remoteHost: 'gvalbb15j0me70c6jgvzxxx5reasdt4kdqex6la15jgg44rny3ikfs98l73phxb202yr2iuibf9iu0tu69h18nepp9h6x4d0lcjclcd0vwc3wirrtek8egd7sy8l7ogje5cbtrrs6q9o3i6sypu87z0pa14djkp4',
                remotePort: 9668017107,
                directory: 'iqfa86ze2kx84wbsbuxwpnz54xscdmvhg5she54krw0ny9af387mszf14k3a1yvetbt3zvziahlavrbn5k1rwrydy1vo6aja9wnfwxmiewqf8b0wrpg3fy1tfcyb1hjxyl92qrc3ett93346hebp09n765ervi1i7af0kvsmzdka8qfgayi1dn8wbd13rspx6elijt9255s1fxpd34te3v4g1qoc7992bo7sn3f5v5yduy7i6stck8g2prs8veo2ihgwih3hex7cxfvj2hfsw1161w73p6x2gpxupt5fmop3ortnobrqj3b3awe5vf1artie8mr71msts55zfohh63nzdhzof79tgjnc4gfarh6xuhh5y3t2etbri422zdm2teuagwl57a1k3m1areiwi4b3med3wlffw5h36e9x2c81k6mfg7t2py338wqm6hq580vkk6ht1sg4j8x6ah4iu7ndomz518jjl1wlvhvyrwrw0r0ooiy3pobh5g6sbmmuk43czi9rq7bk8vphx0l4a9tmlpacdxz1chs2tuuzpv1yqbe1wymvzjc0fyuwz28t0ejfg4po79y219pzz8cszu5crybf831v3sa8kppy1wj3w2i4cnmpvrosns61gv3w58gt8pf460hsf6pcmqd0jhoe0gvbhsnvve9xwup2gd940pr9rxnintr3cndyrvq7bk8zk4hxcsaec177jhyh2cpw0qbq4sl5ps2a5v8em33hr2ak7vgps08ufjes07vr6n58qxlmuoklhsivxagzej56paq2xcx3orwy5w2pj528l0nj457pybnff5g8mq2vn9cjlwkdpidelax8y1pv95evo5by2ifdlie5dx0rexvbjwp6zv3wggmgxyp8lwwm9m0x06hxsnje7ep4gap7hvg4oxwgwfncua970b6pfgm08k001j8u1rf4lstc7o8tuaofbxuzvgxj8742xjb2ra0n8ww7bmhbtil6titm8ewyimjfaau0gf4obs9l1vj5',
                fileSchema: 'oioah6x1cso6lk90885b5v5wu4jme5aithg3spfpn6nqlr3qgqbi3xode6mvqqp5dpx4j6caj5wuwly4e91lntx9r732g63nkhyj75beseba54adk23anao0o9pctcidr0cz6ek76d1pqjutbvrgx85bn73dgl26kk93ct04tiyh74xw7tvl1r0hqgwu94vcmc6g0w2zai87mthbaxbvbmrs9a7gk4ac8uzm29vp44sq0anscumznz7sr2tvdstzmhlhswr9j4n2u2z5ewdx5u8hg0lk5hlbsavpe6x6468laj0s5mvikd64fz26uwlznamm6yjlpskho9r8fjshjmgwz24mvb74a03grxdeanzmffcyqav2rhzk8k5djcfwj0a3ic5oa8220ic94x7zp9rjsw8enq84l1o35pq30khwsfm7hwyd139nnc9xa47mr9bkiu40p7q1twn7e0ge88hmpvv91xngpc49xs6bzw713iaw5p2pfia005yjbrue86t5z89avjrvv54miagh03gk3yj1nc6sd63twgwdqd2mopeqsyk16mr69eo1ikb7le2ya8fg7hf1xlmaqyanzaaryutksjwadsqnauxmxoyukb9c8c8umcl0gvp6qgra82tpllx9z6z1u9w4mkzns1mkrfqgwx3vcr6pr1k3m992nrvr0aado3org4buujwq4hvufqq6crged0xv6fno1wm0r0lkbt7hv2suqo3kvfxdoee4sv2vgdj3fh5oxkroxss2enwqdly54ycf1l2d9ckmhmwrgbs91woydb43ve0nzhj8ocj7rgg6q9epsi8jor7n751j4ogjt89f4p9n8wzqf8zsd6i0343gzns81639xkl0ampwvcds0pawtx3k0u6h6iw2kvehknrrfpforf1ywelmpdcb5dddujyf1kxmrcg4nmccy6xkqojjycfp5av33f2xntnjvyxcaoqsw5t8v5azqgeqn0w9xfnvairzpvf2np5wrl1iwa7pppny',
                proxyHost: 'fsdtmmietuezjl3s8r8kfw1vb99s2u6jv6e5kw11v8bwxd5lf82n0xbffi1m',
                proxyPort: 3761063086,
                destination: 'uer6j6sm67u7d82j83ovfj5av8vptgxcrxt4pllqa7bg04mv7dy3wauprhksc3f7ztnwj0ce0gm650gj3pzabmslikv69n5pqic0fmtw35gfx3giyus82i09tqbbz1j8wx5zvzpl3kc4lgcb2o3clkbatnarmb5x',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x9il742br3y9hh6mxjtb2rnl01ry4w7uvsrun03ey6rdqv0u92cw4s4hnt42x8dthcydesea9260ssbzcr7lxpu9amwvyxyskydttvza1ukou061e5hw4q8oxznqidn8zlyte71a97rgzhmtvnnj4014o8do9tag',
                responsibleUserAccountName: '9tqk3qs8wxtsklxwf4nj',
                lastChangeUserAccount: 'mw62j8xop20uu5hkxfsf',
                lastChangedAt: '2020-07-29 03:13:45',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'is8rm2buobw3a5uponodq1bjttt0wtk2p9d1oyvc',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'nm4lbjozw3y7w9si9k0khgzdjve0cl0xt23dko92hfxry48ya5',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 's3kxuk0qb99xilw0usij',
                party: '9do9o1337wb0ipja7lxpmxr707psznob1laijhyi4z46jzktregq8qxogv1gy8xhh9nm8s55th6fmc9tag4awllerhn6408ij11bwgc99jnsqexknjbgso6v00emcocndbsa33zydp0ujapw121g4iuwd1burnwx',
                component: '8n402gwkpczsgrncqj14brnr1nxgt6wmp7asjjg6buga1no5zd9n91k8jze1td6tsx8g5rzanr82l7nlmp7313ykg1e3v8utlgc0rai9chxcf3l34yrxf5mr8z57bn7562a5b5bsg7ue43ru6ebarg3vbdu3ikb9',
                name: '6zsnpm3khahe2zh62py7kj0tev6pq8jr7i6v1dqkhd2onegy97abeaaxopdikn6wjduxcf4ml1k07crdoz9w5oejwmmkjv9euymovbl95ncbm4cimx8uxrzif2dnf6ctxb8dzagjpu4zioz1zcnt0euxa7ryo433',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'ljymoomk33hcf7in1qgcl0h6x9mkwwydk3gtplt1zz8af2mkmo49gcuz4r02c2ssdcm56sjyiwa56gk8yie6oefcz0fmd32jj0w7ep2u6zg6necmr3p44lo2e8484rpvwcq00nti79qpicv6kg0ktpgagu5arp7t',
                flowComponent: '6g8efnm9zyydsy8ilgnrvaettfmx64pgc15l04mdm8629tcd91elagn4kdsgwtihl9mbiwrw8zxd25ckuskzrl1th48es06uwh6aahkynk9vvwby0kv2dkzrv0ntocfp2cj2le4uy48nebo0r2mq4mv86k27z60p',
                flowInterfaceName: '43918uvn308hx8ufw3kbqc1o60mt9b6ns9rd0quspgsud6v9rpnxlrv2k7hfotebf9iism504b1wyjpdnqxu69r7e0w8gg0baucvhsx4uely3fvdsjgtvgresl07rabeysc1komy110gmdn1dgpc2p8llf8f2xv5',
                flowInterfaceNamespace: 'qcawx557ha88cegw16tm6o3m6wvdlai108tt933cc36ab3drcqatixw66f1eotq7mlnr5tqztl0i8l95mvix1a9g9rkptfe6n0jhes6kpllzvpyo9bq6ik7zj354oolw6unw8egydko2512q9c224ushv97pwyzr',
                version: 'qc0tt9n9p85d70w1ae5z3',
                adapterType: 'agc90sg4w486yt50wxd598vxuibrbx1zq2bud8hu6z8eizp7psjb4usxscts',
                direction: 'RECEIVER',
                transportProtocol: 'hygqyrrvjagms6jblzwyjek5ybmrvjrgpjgdxt0lg0hgbruy5sca5ci7a0oz',
                messageProtocol: 'sthc42wpe1b6b7tfpgvj043v6q82fziws0xkjfpwgiongyrpwzallgl8zken',
                adapterEngineName: 'mmczri591m98x1b3entdq4or7unwsntj0shecpbjrjpc9id5kvdcenk6eh3qornq9yiu9b9zcc0f3lvst9crkqj73dkg34dbxr0mq5nr8qa1y2c53u9r0pxz0u11v84tzejtdc9701jewlxlknhg2uo9v0x7zqba',
                url: 'n77yw1fzzi2k50shaneiskx631sfa37bv7ek15foaiga8znx4s5zsqbnepa17ru837dt3i8u59wa1nhvxqt4n9lfzdromiiodw0li0q7tot2u86wp4m5x01qigv7i5bp1or2hw6zbpccd0b5r9aa3c52nltxfb3p19v59hpx4lg8yju86176e6sj3xrphcus1xmx03ssepp51pcyemg70q0k3vvltaao0hfgsg6ab9ajf78cuojwx7t6ch7vqerwm8mrccyfqjxs7uf5d08tnad8on5fanqmmhy9gepu55ypn22g37a0sa2d6o8ucjll',
                username: 'w5xcrx851u5dx9ugv4ai0d7innx7surehq0p5a4jjtl9tl9ws3by617z71al',
                remoteHost: '6s1r29dv4a77nfekyicdlvl1bbli5ii4goa5u0oyy4suecoh31xhmo4rb1jma4q9o9plm6osx9jk064493lrbzncxembua289pk89zzsaj7aqi0039r51jsjzrdn45f9jfi4q02gfrakw7h2bloxvrs0fsi5y85v',
                remotePort: 7177538581,
                directory: '1uow3twkfy9qnd30z3jtaelz510gdsz910rjhpqe2t15f0k8m44kieppm3lhjg6ghizq81z62shsqc0hk0g1zsvl4ebkjm1kb4y39nz1pobq1om2tj78p2smuguk86cpfu1ix1t967gipa8cp1dpdxg7h3nnqolwwfq3ix1t0hlgt275clr6u9n88xnr9p88iigv5nx8ptbkexdzfqdwnt063zzbr9rgn8m4jztlyhaoxmyep94yt7bkv8yw6b9v1195nnx4r4sf523rf2rxj3rcm7z5wh2fmhch0ltdctgsj8zfeli8mrdg7xkunb0nvwqsdje5be0fuwzlsc5hmmwr81hhev4tyyl7ao9x0d8rem9odfcwq46lh1l5bp0kxr7gtec013uju5telcztdhlntznkq0nyb6u38ost21yztep9ks1zsikgr7myb6l3hlo0rd2dxm27jvha90cxmipm2yclqax8awfle740omrwccjub84p1rt723mjbctzirlx2hnfzjh3vmczgraulbyz5xj59sm25cpq3iklz9l87mfi534w62n1gswv9n32g5kuu3rfr81dat63heq2df4ec8uw4btn5ci78zli0g66yi8tmb6499jq1dw39ynakz1dgqvfpeukhssfyrgh0nc78znvcerg6tmagrd8mjr1q21cx3a1bd1tzfliauavut1m5svnpk2pysu9kzmcj9u3225ksduvq4hsyugsvb7vrie98ueb72qe6gd7uav5je0lyw1ol18pcd771dn0qe9l8iduv6161hr913s5cbdqpulaqugttg3epqb50es3wvkrnxapz8tndq9s8916c1jwlfjryhhp3k0g16vuww4d2kooyt6vgixwpe0gxrt6c251lw4dbsx2ja3xw5ceckxq057cuvtcxmnpu3n78kpj4zf4s1xvbd091uxs27t66tqq99rh054bayq3e8nh46u07vbfkvkz4e4mlvmbptksaa58o1q9hhryw5ciptyd',
                fileSchema: '78rfs805ydsea52vrbtfptm9fayyp2hd2hl1r37w3v88w2n7mf4ytw2n8ycf1ug0fbrixueyzre38q3x0jjvquq8zrlfm4117aedvcfsj35192wijxz4svg1uqr4jn6ay13zbnx0cgtyg4zdgs690bov1irf4kei3s61ppwmqtaw5mj4kwlekpzpui3txyy3verh4cur9bbg0x2nvyw4pedqf8hh1gud5nulscejdt80q4n7df260k9j3i26ku9cxl4urd0uk8xgfoxq41l0iqwtq0c2pr7uvdftyaitcxhfltrn88uq7icb79mkou4f35zmkg0dp5c6215oecmldqiw65772a03hzcd38p2wpz6515zt90wwr7re8hjz7mh5kkug4fwa2bivamuqlbq6hidxlmrmcyiwr5v6u0l7j8bbfafllghcu3n8dh2ubte3w9gboeum54ccdjszartlp9tq7lb0cqc3d3kx3bzoy2xrpxcm9r3gwgp5amnqusf8nloho7lx0cm604i6qsai22zrimqi2x9cp1vfc1d8xdp1e4pim54xh73b94qz1ilb782gnxzskem80j8makx4qa409yv2ch9816739rb8qvssixnumizf2e0dnptxb5dbgv1v9fmzg3lzc0e60s3burzvnrsdyj7gqho8c4afnesoa1e8awn6lazjbi735uadjahkfj18reei09ivvtik72x93j144otxkg5w28websef5ey899qm50fqg8vot58gz4ln9s9ophhh50k09syqt79km2q3nbs3cfbfaasgs7wfbo8818xq9q0yxj212rbwf985qq5ec5py0fw3e0x946wac0gzr1pbnhsz5bj4cnnn3cumvt66cz1n3txf647azhfbh5l5qhixfe7v66w49jsxke92l2ulqkij3rdcu6uir2anlt51bmhib56lby3lnbvbvp4a132dc3w2but6zai012a7qsuoxk62t4911b2vpto1ydsry1axpnufnh7',
                proxyHost: '5f3lndhte73cm3wdisrzmb7t2w36us0dfwisikminzbdvxbiy6y5y07tere0',
                proxyPort: 8824224876,
                destination: 'vzzcq41o9k1hvp94sushw3cgqtpqbj60q3hfowcq252fbjyye7asjtrfnecxx7v90izjfoguh5329c1y1zyodftnb1bcp4phd1lbftequ3plcl635zjgzu75k1vcmcy3dlz6ruaqxbw8g7yfny0whfdxodgf0oem',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gkrqiclmekurwwh2bfpxyfv4eehho9yyj16vzfhc6u6vmz2whgb1z3rav9tah1k1h860axx09ph8uxhvwzqn9lx4ptdtr7jfkx1bf7owmt3q31b8ehhnswu3lbt4ika9xb59djvqqc1p6mebw1rpknxh8o0h73lq',
                responsibleUserAccountName: '22tmr7n8vcer3cad0u1z',
                lastChangeUserAccount: '27fp9d1ixdkxiwwfkt18',
                lastChangedAt: '2020-07-28 21:36:27',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'axqwb4gv9ro7zvwf9g820jili8l3fmzj2cqvcdu3',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '9fc8hujjvf5g2wer72wolafgikibhnegthbqdut23yz0dbluvz',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'mrz5qap6k102szjepexc',
                party: 'ma50mx1hkzc6okuik1w8d1rbwnurv0a1xy6gtvz249pyznt74nvmt4pak5kezqudmi8ubvcdle0k3c04hex7sx3n5vg3fx3scem3o2x1ppzs23x6kh5h5j2q2m3po7qrlb20c9rhf93a028ijpgu7gz7bnm6h0nd',
                component: 'eli9jgdz84f4rk9k70chag1zwqcxclnud729o8czp4rujhi173puxt9wy0p1q0evlatq49n7snq4tuy7tv9n9f1fuc4d44vlsienvxw7oabzykz882hc2xl8684mmmjp222aimw1glemchpyswffmxsp63c3ogow',
                name: 'ys9efk6rdnxam3tzgw4gfulfnwf4ml91b4rkyp8s8yweatfxe6t32kaeur97mwxc8kdzb9qqaryuoysn2upalopgndxhwd0jwrvtf0d4g7x92ap9b5sqtfhqjtsxuce629c72vtumtb844pdhtszxiwbp0v1em0l',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'ubz8dve7ul87nj3slnx5u3jsh35pxdoz8z8uwrg76se6xjvw8cifeeonmy0xwvtlm4muz3gvfkvyic5gu5li93qjohp9zilqsr7tffqvkg6hg0r4pqs4wduut87v4b89qpu2n1cmwqc6efpblbqg3dkzr57t0x2s',
                flowComponent: 'ntv9m1bqoyj73djm9scqzcwqov55fvtt4f8saf3xl2ilsq4jss79xxcf97gv5i5ogy0r122a43ruvan7uacbkdpypcxvih5lffpj3c75pj4al2op6we74bje3jjck8io7x06w5zh71hqpmyswy9n68d4vhn713rk',
                flowInterfaceName: 'qbl2sbufi3vz8904y4opouw3c8i0o4g7bq0523q0mfv3mzv0hhub2g9g2a6c2nvqaexdrvbl5yftpivhuunbtpmbpkazqsc6ti10e3hweoi5swrtv9foj3dvw96nljgbwwhl01mme0mqigjc1n56jawglxiry5pl',
                flowInterfaceNamespace: 'yl2v318p5glz8k5qvjmjb2wd7ac6n1nw35p8a0j9mwvdpg3k3pbridefi4wzu8lxsvtq9szy29u9xqbvs1wxd3ccjbuiq7840zo8tjtiz43o8r8ty80qd1d0uti4rmr7bk5gotjbtim6fqzv86212ceuyv1nmfpd',
                version: 'gwru1vyddvc26sdzd67a',
                adapterType: 'dgpehx8m1bgku6p8nwtvisbzxo69nmh2mejgxrwk7u6sm9m2dznafak0xwdv9',
                direction: 'RECEIVER',
                transportProtocol: 'b9akaaubdcuf861tcpbnlh76ndbq8mc0o48lyqo517ddel707wk1ukdgqayq',
                messageProtocol: 'zt3oyssv7caxsz64wppdbf9rp7ovmg11lgzrds01gwyrdi7tkij7qpee2eod',
                adapterEngineName: 'o831x3mz3ob676cw4hmzyb09nrpibqw6z3n32a0fxeu6mxef03r4rqfv7rgay8aogg73ropy4buamrnm2n7fdikuqf0v5dn2bywgewhchmuhr8utpg1oe2raq5q8jckmh7v6b4z7rbzzl0l9jvcjf3cqhdij1aej',
                url: 'gfez2agpt78o3lhhivzwommvlkn4i2zne1uconcoc71ugynkbkyt27ixtixehzjkcjgvb8jzbz2eca6r4r2ctuo8ajw73tyhbdpabxuw0btu1oafhn7c5ry8lcutao5f1hl8yx9h5p5rp74n735jwmg7m0z37ue3tqeowocz6t54lxg8dehw210ng8p5p1mal95hj99itdwe37kvxwe2pfsdxcffiskjyc8b4mgaplgb6abcvutwd2zbnu6fe3rc6s684nztijjmw3z0qjf5r4208203v86a7bgxg4p513k8k0t24fqqg3agiwkkxvs7',
                username: '2weosuohsw7974b9ch9wn4yp7lj01unkt98m2eph3kbmomri9ms0miyvzxlj',
                remoteHost: 'qc23s73exfi2klmlyt2awjxqdqjhpc6dqggfgqs3efeeogwkvv47c3yjubxicos0sya388gqe7s2tsjh9ogp0dlu76wootp4leklt2yq8iblfkzea1h72ueftg94a88730ivdy24rz2kdn4dsi8t8kxv2qxxth06',
                remotePort: 6804476080,
                directory: 'krzw3vl0o1c5napehyumcwg6j2bn02n0kacj0c3zdhr7xybzx3e54wkvag2qhuyxhboip4nmb4arl79xf5qntbm3k1t9hnpzcexpe6llzs5gtq4erfpws1qs934qhytrt1jljh9zibd1sjs3bc6s1d2p49efxm6ut2q6p0r3q7r3ehgt52d7eh9vpn6z21nvqku7uh2gbsl3j54qd124poj4nz3zr0p5kl5iy948bn4xor751zygmpu7gkjhrje4be1ut40gicz8u8ipg4kq9gu5wdiacrcdgoe62ofhwb8jqd89lzpceisyt0qtygxs358lh170ielbxknfjxuga6m4qa7g7fshajykt5jjw3l1x6pd46lxhlp19nfoifq2egrnwb00d73zhbk4f62y35rvbl6s85gutw76gd63h6cyu7atno34g19gnw5xy9dy3582jowllvuvu5ihsqg0vywoq4imtno9yjb8rqhkrlsaj5349pn66dyz4np39537h6om2ta7hkcywgbguqjagremxg2i2a2nhimdhb0a7mq2fqeneyo1s0nonjheg2ox8yr70avgrwaascrsp5d4sm1stffonwao0jvtkonmo8k54vncmvp6kktzeavvgbhuj2urmja7iph1uw45x49bi4zbcnkc6cui3f8hnzr9edr5qpxmi13ec7buwjyuvy4lyaicg6fs2971d1wfdgbqt1afs7zyixf3sxrs2abb7k4dmbrhtv7diazs5cp2i9zb0x5aomn8ifvanbu7d5zcacc8nkufah1n0n6b1xauapyg4nrq8tvdnsnv5dfnfunlopf3v06k00ai5bjz212e34s2w0ro9syybmrk2iqctbz6ktjy2v00a41ix2asd9ej05iqo720kzse2r212m5l9xp6xno58jodsj0uz9jb11uglgx9nqybi6uwu9eb92pvxcmvulrxyml4sirruc9c3cshnnnje1q3efollek8we5djfmbgzvd73dz835mhsf8',
                fileSchema: '3d1wzxmgszu9owwpftcz89u3orjr105pqyrsgz8k4kcwnb97esffxyi07kow96aeohdmsl5tpfra5e5wdndl712h04g2k3kski5afcnl2lx5h2ud1c8q0xvjokvwv2ghca0ylqhjwi85etgc7jtkmjse8fyui4k3cli6tp1b2uygedv9li2yept9smfhhd9km53rnb3kss2k47q0un1n2bz9r8my34r8zfpozqm0or6bktnd9xffqlmddq8y2xkh6f8i3eexsjn3xwjgcq6a87znengrml250tvnhrsg7xa99ppv3xo3ht13dprcitz13fpjrc4nkfz9j3inavhce1tzgb85mpqauthc580r9ferkdz9kxlvvu9q2ca24egwf5ob9iunsvp57yiktzu0egx0z907wjy9asbq372cmw5doke7r00dr2ovjeskorcnyt8p40z1oeqbf5jfge4jz2yun490uh8zrqwz4vvpem7sckccju7wlnfjunzts27gxvkhymqhkkz39nc1wiyqsemf0aivmhaw6mwbda6oiad2hr8icedqsv4s08vjuq55dqpgw8j2d7pq8dpkqt8ha1lecdge7um6rv4uykabfxx76h92jicuior1xtj8sde2bhpu0jc6q4m4m8khmq86yj7qxr66192p7ahobzwap7cicjklfnny1loe1m2ylwgma9fxeqqo1okrkw2malri14ijs40tz731bfuvmucxtmmsqbaujhcletfshs8n6y3q1f6cvxi5gwzzsjb5tg3cg0hw43tdcyl5skxufy1kidc8ybaazcjshxjl7im0nsvy1zqy3hqjsxhl8pbo80bh9ev080ximiju9rmi28emjt02i1anb0vkaurmgrmz6fspjsijbc46tur6avrweaxx5mqjt2dcm67ehoh1km3x327k6ljhs7sddr030xdqiw090d3xqz7u9rlbrtqazdcmrkdlhkhq4ij8aagxn93uyjq9ttimwg9obyxo5kv3vkbs',
                proxyHost: 'xl3j4na774jssvzjyll94f1hfzawasqlks7zm5akh9zak4rlugg87k470xd3',
                proxyPort: 6979541771,
                destination: 'ne9oqouf0203e3xe5euwpwv722fbtghoxs5zj171zfx46530h1lis34qeydu8vc9kyh51zz7bmia79set302s5z0msg21gzv1j448imer96jcvdwfa9hfff35osl772rbxad93vho01ac6zn8u6mk4gzmt27w5te',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wmoyq6rvgzolgd6nog0pgbuxpdpykl419chokmmqvnesia4x5itnhskbibdbvw3r8mvx6p8sn7c2v39w7pg39m6eegnmwk6duerndoswng1wflw2c9n2h49h4nnvafvfm7ammzshtlhuw340crvrmc0dkx0qhokc',
                responsibleUserAccountName: '0fv3dlah1zhbzjjc5ce0',
                lastChangeUserAccount: 'o8tjuxfaaiu0kg8f0wuo',
                lastChangedAt: '2020-07-29 12:39:59',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '658ri996vwp4ebtb4ewj7mbgnbl4hfzc6yso5d2m',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'd2gd4puycbimod7pl0cpuqjgg5inh2vfwz7ksuzer7xwsgjdl2',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'p5a2ftzaoqiyo548qtie',
                party: 'k3zc0w778sw6g632yipld5o1jjqxciigiuskddcpvraq69ms9xqnmw1c6odzlpgo622jhuvlbbs6de8seifw60ho1vb0j2l2ppf45o59enj10jed1by3cimw6yds58dnk8053ilobynhs1sc1mvrrzjr6wb36exj',
                component: 'vsgp9kt9duouqq8pzq1xpjtxh7nkh225iwwu0jjjpsh7iroadf28osnzgo8xxevb381e7gm8pki8g63jk8qp4trgj2ni1l2a9j2u8lnejrnh74z2kci9l1qtf9eqpyv3e9c2n0piffjg3vyqpllpf11zl1u4kmzd',
                name: 'im9duawnmtjut9ljns957qqnq9tio88xzciinza6mquuo4f1izs6psj216k93mtl8ma6oyiymr7neqbil1kno4h7xb2xmoheze7tq7z7cfe57y1kfv59w34n649q9b55ptkwxf684m4bcrkpdiup0mkudgtifsrw',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'ryi511nkudgq1ez13lj64ui1seiqyva4jbpp0iw13hy44wbn0gx5nhljs1w04160obijb3zcyiwpdraebe14a3ovpvzha4okhdc7wv8homnl7lrstjolz7p4qfoz735onsp02z7lv92ih0mehgfrnu4q08omvh8t',
                flowComponent: 'v2f54sgcl7h1zy0qznqv03ig3klwznpko6fg0gs90f0shoh26j37j0gz6fkewtimxgfn8e4rojowpny9daw8v1m9ndso88qyhltyekniimj1wzf0oo4hvgozgpkc0j45qi777a5h3pnuz3pslc8p1qqzkn9kzfvj',
                flowInterfaceName: 'yo05xzcmzi16bmq7anbdrd2xmv6noifn8w82u35l8uybqgyrb7zw9v40u60s894ybq7swonqisy6akoz9jqr6d71p3wuq0u65ex8mmfebsvin2zeyck6asojfl1cui66644e1aeopiph0msdmrdx1agooc54tk3y',
                flowInterfaceNamespace: 'yot5c8dtmbn9ztbfn21l4pzxi2rjk1ilbamhvkav85c8iwga0lr9d3rs7rcnre9sk1w3jznuloyf6wajpiofxgsvep757x87foeuts5wugpzt903me2iz63x3v1v0g9y3uwpm6995dqecacmh45fp57ds56e0jy3',
                version: 'pxehy6z42amtk1hi2q7u',
                adapterType: 'y1fqnjedi4iw3stg209tg4504tb17ahv0j57l7hthxurrg6ve7zhnsppyjto',
                direction: 'SENDER',
                transportProtocol: 't2otkd0yedbhl9a96esi10jj632sl7k2blhl2xck0haq5wnjo6a3vr0gpch3k',
                messageProtocol: '39koqx5ennr2wpqupltqpmp12brhqtfosn0zw5i43kykhgiar7tm87fn8ijn',
                adapterEngineName: '1crt9sdifl3yvdgq94rmvpg5jygxihxfn3l82cos40tkcqr75zovlx9iad1betbaqgmcjhsinme45i9s6p10jpq71hmulxbvoyju47f9vbbe6fafndm1n3m03u2by4gm78erioue2bashhqd9v0afrux9rwuq9cn',
                url: 'ejcwclnl7h0vr3tdbarql9wi1bwy0ren8pxrlvlmmrs37kqzfqfvu4v9jnug4hx5bhoa0ulr8614w220n8szcebcad4u8qubdenqr9ztfcqufg3urw1yw1egrisruumqcnsdu2qfev9iu7x4fcngztwrpz5dvd5y69hlwznso7o1yhu483pxe3z13cm1qq7crnygnfd36cglg1838mv2fyhy1pd681vxncvrrvdaokoh96kk9xu80q8j5ummyckylhnzm73j8rvqslxgg8x7clhr1qexnqu5o9fl99forlu0kpspu1xqyrpcxdk194jn',
                username: 'i7142aneksz3ixiusb0qicjfavf2bnten6ts5ctzju7b3c3m0c5iz7y4rfz3',
                remoteHost: 'aiaufvzm1vhssar22gq7ufvou2jl1pxifjlna9o7m0v7w1n9d7kodam179m77s6f6w5lq0no24zj5zlnpf954v811ksfpsllzy6wmljp0ni1vmsxbg168llljo4da19k71am4p0vimrn8ow3ov4b4lblvlnmdr89',
                remotePort: 5318807873,
                directory: '8q4itlckw2e1qcla6de6cdmzd2d03x82k7hd3q85phitrnpsi1qqqsvujleblridwjzdpmirjaozuucb6qryaod9u9m4j035nvpcj84dboxmcw2ndgu0e04jkfpjypaslu943vrbdt8zwghfmpw5p0b0nnwdegqcqryfw15g0k5kr15m8pshqvhf0dlum2l906vwfumrdn5rfaf5efuhmgdj8p0el7pcat8f7s4bpeu2slf4cm7k7gcri92ykzclfx604ku8vdka6hreuitr3b2nawfc0nlskqz7x5e43tac0o4mi9yrdripx2cpjobyyyv45fmragfyolfe6nv0mxqqa17bfyowzprg8chj845qgjqjkrfp1vwfi45nuyf8okyqkrg0t12m3r866z9zzjnhrw6ezwlrpd7xlmg1k33zcn6v5lcqrdkmltwgreghhlyyofcv0nb6v159d4ex1nlsbzmx6m9kpa2orpf4wzg8bbb95e233chiti703mhkwf2nad5vwbv4gpwpt5f96cpmhrplnmerdptzx9o1ucseo5q53uoha4rc3ml0ekuq1krc8fswrbldo130lzoqkm3a11u1viksxfof4hky46vzo6py216laql3b5tzo54hlsedwr442ap8m23ho9nevz3cqniiho8umzmm1yzpdjjgf2s7nfti3bpexhutndismcqsqn31vi7lma60fzybin3xd8x4it6vs655vzikbm1ppwfh9iemwo7r55l0n6tjclzrksmkratcaayf2ftg5zmvdqm29g8bai9qsq7uag62zonk9b297j13dd3ckwre58fw7rndjpg3xlknp74rrx9zz02zwj0p7rw5kwanwo1j1bizwv4jmznodzem40lt4d35s6hk9nqakvkskxcos1y8vetfoqe3297dxze4kipkrsu67wg5uph8qcdbgejm4d9p8iem0qvvf5iujud8v6r758dozurr8vssmm8o9dsuxwvtanphjbq4k8p7jjz6',
                fileSchema: 'b6iuyt5mcethohn9t3u9gbt6yh6wiicr5u7ekvybsm8tj5tkgws9rv86kyvqxxzhbitfeuzt2zw7brm70e615eaguhbyv6ouamkq4oy54hoaf51lm1afl75jdhf8xch9gpt4w7fliqt0rtgdexfgclf35f69i9644bf771by36r784fdlotdjaw4eubpaajgqw9fw922z9pbyet08bxrjljfen7bb42q9e971807npjzuetr07xy5kaqt5qyhhsabmaals50k6fhx4v1giz1jtfss1q96cdocmxtgi5fncwpuzb3q4v0yojcnz4y0qso0jknlamgwkpc0x1g4qd6zor4otdvfv771cjct5iomgd8j9ppb7jxtly4yssglssftnoopgltdicdf6smpqqcpw3f1dbk9su137y9h3yiopqtf8nsu9ol6yadrswwfr51q0tdn756ypmqtdtrpjwwbf5p7dqzskzlfxnxwc23hzay6j8nv4ulmhwxmv9g3epc7ld5bdvqawzj1iuj5oe0i8b6q5eb9eix9u0bp8p27n6gt9z4hernepsucry29vsyxf0n1m8acucxr40yhdegbly5cn4hh8s0uc7ni1idtmb906r8gkf3jiqhzw83k6gwh2xgj9hm61wd36osn98guz9p87w5e944yu0q07kamlm65lavib9huhlgyp8wbxnqpbky2y1eyikejyjkpxc1xfole3cyruor26cxbrx8pzc7ynrunngo24bckzc3w5wnbro78pc0p65lv7042cqxkwb6x3eaksqtl0t3lzicqvrkveb2wtzqgroff9vhe1fnmedc017stc6k6ewy3h2e1fhgx6xeb04whbs7ihvaszj1nv0ulc7uk5t4u38e9ivcsd37pywte70g7nl1r66p3hvihbk44z8jb76ybzff4qqzk1qo39met42eqbuvr85sbui8y949sdha91mgz7hykz2py55fwmol8p9jow79k18y6ehi9ry0sp2aepvpg6n5',
                proxyHost: 'xt58xb5trmx9a6fs1b15jnmfhg4bkd51y5fxcgpxbtp23uv8jo11uzx0m1hs',
                proxyPort: 6722116562,
                destination: 'akywv9nxpwqbl02vz2u1tv7zk5ial5hjsen1d6x4kqm530gr7ryomxliobqdtz5yvyv1sa180h7mexh0ff2fv8o45ivz015r7ageqcu97lncj25up0aigd9p2ao6pqdjmk23tl0fw7uwsxg9l1sq9wojk6os6dq6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gnetj8ma3tm5zextf0fendzztdll66pj7h8ojb92ltn0hetig1671ddc9kb06zfawvp3t7lsezuezbpus9dcj3pj0jv3rn02hm623uf4xn64kojpnobauoksvmfb8cj36xajm0fnh8oaz4vau2tg734meejav7ya',
                responsibleUserAccountName: 'skuye2jhyfnqqfsl3oub',
                lastChangeUserAccount: 'e09v8z9ibd7mwdec5vnc',
                lastChangedAt: '2020-07-29 00:08:34',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'ieb6ubbuxnovkf3c5rrqs28v4wcdv5v67t19jf3r',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '9x83o70kj37b6ri7e774htgt6v9u1lk81f2m58g9as47up8v8c',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'pynfsv40n6h08y5uqv7p',
                party: 't4ays3rc5v3chnqrnbdwwzdizt08p5a6pduoix59mx6yxgr0xxqiukvwza2irni7tk1s5stf2i1cs7a9d4h6rmbj07qjplh3kzsbfhk42zw0jwxssh8ye2ihjhpk6codwhn9eyaenlekraba7uyibskk52ef7zms',
                component: 'bdsodbumoth26njn7eg1gv75tguep85qdq3tfarovtpgpdmh3evjhd6tdljdp5kp8zdqudt178gbcw2v72bq2dpfyfyzomzueae1uiqyly5t312ykaizj1boq5v7121e3lyc5toxbf3diya1n4mw3h766i8ls384',
                name: '7npvv810dlo40re1199415rm3493lnirpict73zak4m042xdh66135sbke5olq26ae0cg9a5mk6wk3xq7v2mkrhm4cpl2lggjy6l95s89tv2hoj91vjb6t7ugo64hu194g8ctlwuq1uvuxx8lf4rofgme2tpqnqj',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '1qhxdzui06c0ldlxz3vzfv84nsb5pqrvnsqdo1s0om646b8fhdtdqwxlqi83nu8ntczs785tyycu6l88bn30qch35grfycef04nusituhrqnjfhutdclvazby894rhcrz3sde1lyuqzdya4hmgbull446rhxsxvu',
                flowComponent: '86u3b3tpmb0f31i23052q3n32jsirh4gpr0tdvsikohb8np8mza05kajsxc1yvg2jfdw9ao5yqj25bbnmjxvbu0chyk4hqgk9ap04ns64pzidr02oo8xrq9t8zysgdx12o7nzgb791azqm2o3wutq5v72pnoynl4',
                flowInterfaceName: '5hihxz7cv2o2wyqsa0jeqa9nywm0q87gt5umi1u15ime0v05frvlt38p3uclxedpipadjki1zpi39qtw2gclo9833wi3euacr43haz7v21wypdyhti80s58vehnf1scxn6hhjd1u5gay0xrxeqrqxvwzuieup9en',
                flowInterfaceNamespace: 'hbzmntbd8svkgnq2l6apm9sssryc05t54yb8z5mg2b0c9sz27hz8t266855mrkf7c4rk2hph5ch3p9egsoikybz4bu1mbpcpn1ac1pr0bpgvnuv2ui1bjz69v7e3r3a0xfpvrmxq3oojppcoq6pjwthbxzqc65tn',
                version: '72hyofflgciduggbut5g',
                adapterType: '0dnb9sydxmefu24s7g8smrjf2o6j20nmida2ie1xr6m5mec3hyktvhobmbdx',
                direction: 'RECEIVER',
                transportProtocol: '1c2jbtp5oq1exyl1ejwxkio992tee2siuvoknq23frypslatnwfuhq8v9s9h',
                messageProtocol: 'gyquje0dh1vhdzpz4b5w88k73v7y8doz67cas7rfrb9zae9c12w3jx3faksia',
                adapterEngineName: '8xwip31jc849aoithqzanq4npaf8tldtgtyidi6tuw0pbip52qt2yuwililmi22ncgsfhovcdlb5l2zo1v8ieba5lin9z1hufoh3rdwnearpbikl0bzqa0fpzeucts0772evakpuwba35oahriohpky17ailh5h2',
                url: '527faxzz3bnqh7j90ubwtgjm7t012l755t57st4h9wp71ba6l4uzqhpaje532l440jjem4n4h7kxjviyv7az5wh5kwj7n6z11hwov02bcf0hp7u5rg3h20odk7ky4dise5fdwk8yerggal5zwhwe8n73pko4btgo8r6i9hlbw2i72g8twx1hwnoxhmy9qrq3hp7ysrnf0rf1sb0bizgyd6yxnp02i513llkqiia7jg4lb55bblbk5folecoxwlov5p9498g3bawcjw38o7d673viiu6e2w0qj8wh6t970z47ofwzb9biiybsj8385wui',
                username: 'wfg8weo5zcfis37z3q5uyaacxnyl2i5pbp6gduruyjhgzf2qopw2j6zl7fwe',
                remoteHost: 'otm7x646gdy1lg4z9m9d46ip6wv2uxdy0alr7ssh3ut5p70bohl1v9fs00t02ul4p2mbu5l0k6lmqoem47fpwebcyplf208itaxw7jsg0im1akt3z3p4n8pxcp7g2yp10lyaja8ejlbvt4oys28jr3mdcrgqgo1x',
                remotePort: 3851488280,
                directory: 'z19w06p73bvxd6xcp2eratwygkg4i5teb0l3yplakqwpl8rj5zjsuszrzlu5j78g8egrs02ux2mcvh3i8ed5zfj7mv0bgoc5gunzfa8hsn68j1udcx9r5tzwl68c09q862plljktuj3g6qy5wvslw7hcqwkzbte4a72da3v8tsxj0wq50a7ss6wodwmg7grq2qjbcja1tcxz7kac3s5k36vpx0qobwfi43o1exyn6cflvl1em5mse16ob5shttoeluemfmgk1oxdnwmaxoro1h93kepl3oeej5lmandu82hupqy9m5228wyswyjfhp99d1fskp7lapi6q4v29obs4afiv8jtrvgbspmf32pue41rtj3jxjutoprw5a68nqnifg74ypf15l852nr3yptpm6gqwcwlx9j8ua4txumuy9i6ky6tujk8l171qy3p6cwfipewcvq1n5ettsrj12lmtkykbtig7r39cyaev7w0xjjxo4rn4t09ecejd06tsdwertk5wzigb8xngegdzpsntif822fhdpa955o1yc01c18chtumlslbgrux13uirpgjxtr7da4oqeehsy1jn6ov2mogmmqwykejswbwp3n4kcmzvqgai8rr9oob3ytk88n2uwmkourpftmukxgtvpii9v6qj85dcqgfqgy9vno7d5teuhaboeeqt80tw623l4zutb890no3yr600iz67vnx314d234kc94tbx8i0m2v4mej06ho2xeqoic5rvsbqm47q2jysykqt9c4nm0q091ov610ois144s1fcnjy3h706p9qw0m7sdl5c8tjibny654j506dpmre1wg0419sb2pfkzal61zzkxplxhyzdlcxtqdiqgyh4h2bu5it7xjmm31fgtwvjey4ni25gzhcha5ebfbhf0d5fxp4uafqjc5701l8f0kgg4wowtzajyj30txri8ijb2t9jgj2bibuuz7lvmr2n46s2jnqfxd8np2urkdn196mybvxu2fa7xubffc',
                fileSchema: 'xh4t7gtinur0t3tukrpjtgx53tuoz8w5a2bff60ca6f1zbec4nl3rsjxpmhk1ok84jya4pmj3gfbrk3np9mldhhrksvmlvyloddh89e5ri1tvt1cai6mgg0htx286id5jp4f14i66e1tcgnmf91k7kt0tl6rqyt3ly1yswqq3ppa0dhf0nquzahfw5k4e2jt99q91iofqxh0uskcdo5ujbag9v3k1ar9cewpmniyg4i1n7gjugikbaxb0gw7z41ivkyy7igd7ejy5j85es6lq03x35quznbhdnu3zqqfc38rrkexqg17qevapmi2wl4sccusdwiwe3kaz68sz48fc566uso7umspzr7d8pezeo9lmfqdietwoq1vpewirakd272b2dl2eya8jstmzm4x8hoj1se6pi2wrodoxbktjikovrebhvq012p8lvtsu1bm86sk81d3nvadrb1mibtlvgenqts8wuny3fflfajjgev3v4c3al782fa2dda20pinr5d86orhjz8dbu21mxpfxffd2mmt5epye5z6evmn3m6443qdc17o16952jhqx9tsagvastt78roxjka4anysl4xiaw6tfgd7x1vgcd8gx6hnqd8sp47idi551jycr5b13sgkowbv9pa4fmlmm2dalye3chfki04l7sbig7ylllm30fz6hgnbcax6w9mlw5jx23b4s63c66k84e6zc04eqxq05367mad1rfjry2dm1xfwo51ppa8o5rp3q2hksgzubd31derh7rzle1759fzf55jxlwzjx3y1rjjfpv2tpgr7hi1tz22pkrdn5wu67kz8infnd82k9sr468j5b8xc6mzu3m4fd0q8wkweoj29j8br7pv5grqaub2vwr9kbbpkq9toh07blh0lbn83kjrz3rszji51b0agazz8z8xfag5o0dn38mz5qcatvyh9z9diqfc6wvb7ygsiyovy11l5mblithxxq4kete4qxnggi33jr6hk8xkda3cbyzl7rx2z',
                proxyHost: '1ht0uh8zlesgve6hqhgjy45jhz576gz4tujdb7xbtyvs5co8b2obpz5bxnm2',
                proxyPort: 1582305572,
                destination: '2p4zg5r4hqnczoi9uzvky99kpdb56l0fxf2simx3bgdxysot7ag4vygo32xl4evui6tvdbexumtnrye2bbh6glfjtpypwbnyaqyn68wmoldnogmpjfdy58d3vs4vm997x7xgdah741dusj1jzax8khgrb0jmpb3c',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vn0d63evdz6im6a2bayw7w3ndqem3au110ppuokzauwgkfxfm2e6t1jyzkj0997wraor7w1iwp6hsnfhyw4xvgca4wyttq5qndhol02g6muroyh6y6tw3dyxt7nxm4gixnpfo4dbgeqxw470bxmxc964tipui3lh',
                responsibleUserAccountName: 'rlikdsa467s38halbqp3',
                lastChangeUserAccount: 'nkloavsy20nj40h0x376',
                lastChangedAt: '2020-07-29 10:02:43',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'mpezwdk9bamx1l2ez5qiyh3z5wke1f9l3ek6tq4a',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'pttrtrf75xu5vvjckjv4mh20zbtrybujadzt1sd2bthfn2lqvb',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '9oyie6du9okxmvy9qhxs',
                party: 'o575obn5qmb4mwf7x1gj6f444nbcwrx3n7l3vvz5snwu8sighhqagbdiyudlicsacfs03sknefsjbrutjixooafqqmeb3z9yydi4mdwrohk31hgiy1tbihvk0y45jgi7qswqbg9gprt7nbclqy7blqww3bcxscng',
                component: 'gu3mwdpfxw5v31mw6lfejgn8tzybnbb38emh6sz2psufsu3bt33v04ygkiphlztgh93jfw51esze5iksli23h8hgrbh2bmch3wpjgcv1wu0c7rkcpoynvahx0tjvszznk19scyb56bo9em7hs3vvz73div2l0pei',
                name: '98izmwh0tp8tihns15sxtlp63xkjnrkg83czcnuuru2ymw505yzjbne9yyjfp6rzbtwuywrim6biu1hycfjmfcbjaluje8u3d61370tycb71c7d87kqw2bvobao6vtj552n6saiwkcoe6834yrv58n8ob6wovjl9',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'vfi2cqxfy2pyn2zvguuhshw4bafr7ff7l71x2ts6blh7q9iqt45zvvglr3d78aqwhboddqzo3ihj9y7izyvvq46qzbvhbo6zmctrpwjxzybkm99oy3lbp2r9v0nb5h89b0dx9g2wd9i35cubujzpz5v3zxyq8q14',
                flowComponent: 'z1fqp7el6mqc0y1akwzm1jurdf0ucqzw57thdjfj1xuskxskt1dmhc2pgrfe3v6umutvzws6eidhhrgzdl6tg6n5pd3a3nm3wj38xf46b09eil5fqtu4w63fcevdq7n1y96rpprafjs98dg8agcau6gi8t35k55q',
                flowInterfaceName: '4o3b0djzm6v64y8udkf2bz6pbgacn1eichu0guxedbw08i8rjhp0b3rju8a7saddgs0xqavb2i2wb2tkl8y8kg2yrj1u1muawe056gwngv39gblibs6n7rrdwkrkznnu5jlpshtl1f4ferui90c0pcdgkzzcmyb2',
                flowInterfaceNamespace: '25u4umqkbec70i808hsn92uvs723156r3hjr1y08b28d5aqen9l5gb8jmuo0inxzi773sewc6u43rckj0wvgimlkzr9z4iix5m3el9tptsrphwz97e3fs3txk9tna3enpmhfajbqs63jtl8cnlnnqkm7n76149uv',
                version: 'oit789m8j1uqk7xr0amy',
                adapterType: 'gx8lwhr5z2idrub2mdv7mpoai02kh9jrrujqngmobl123bru7596jesc6oyi',
                direction: 'SENDER',
                transportProtocol: 'yx3zbp4c5kpu1kcv2621w1nkqmzq8w1u1jio7mo02ual10ljywz6xj7a3agq',
                messageProtocol: 'n4fgkty80r56rqv2duicu0qdrg3aqk8b1ds7i1t2vu6ixbk3cb2qepl28znw',
                adapterEngineName: 'awjiz5osqlgwdn2991qytbbqv34vil92jtilxkzau6zqp1x9bkkypxxnj7asdw1qrawpbkyn2q2aoyus9mv7w1epu95dlnsgxludh9glrjqu7rzpjfo2w0zsd3srjthkiusf5vobtltwjyg4bgim58c0251f1juw0',
                url: 'as2pq492d4n3wgnpnk1bpif5mpy3e48jzbos6oe8git3wvdslhs6q8jypcpcwed1pt7wd0lppxoggsn61rkb4pqxw5h7uqjb93u1ae4uwdykdm0x39roqdxz2o8g0pklu1ox4on6p60d8owog9tls6wqlpze1k16znhn1of3rcigvv5p8zkxvyiqwu7iqpz7yrb2vfork8dnfz28ffepuxmrjg5q8y5vfrv9qkim2qlihf8y4ho4s9vl0q6hfoysel7tmymxk2lzyb7jkvasydyv3umcv1mmm61w1yfs2k4ak0ctpjuhplxgff2wpunx',
                username: 'bvpxsrlwa398vey31yv4e4w2pdcl133nueu3m21ogv97knjm2l0ylull46zh',
                remoteHost: 'gmsqszcqak7d1ac9rc4ldqdu84rnni27f43ekqppt4xqejzh9xq06dc1aak9slcs77e9dislxfsmfvlbninip7ku3dcdybrqjaj98ekv9bx81wkdqumz5dft001zsjqy6mlftnrlhl1bwlcfl001xtxzuws9e95f',
                remotePort: 5425101793,
                directory: 'xqv44hx4n4e7spoo5xy22kvxpyhtvu4px9xzv2zuljbdov0sh3i23xe0r28y7turcz1n72t06423mot5cm22es6h0dwdtwpiee2t3txjl9nhvp5k95stuc2jotucrdfkj19pwf7kbhyakb4g56kg9f898rsvy4evkjgbsgp1a6n9lfnrni1rl64so82g7p1qt95txmk3uok4gl6abwp201s07w951neunx1gk73xap9uj58bimdl06fhlma8mn4o5u3holkkcsx8pl1ye4x9sfob19hmz2fd212rsa2vyhwcl8r17lm87dg6wxyedc06m6goq5p17qg4bn56ffk5u1ws1wcroet9s1koev1fy4psokw8kmmzmu9qlqrtb1cxww8jdwpg3clslz71a3ob7dguz9d02hyixcaom3v2sls71vpl1abe9p3gsia061g1qone28ksoh6iz0q3x0evm00g6wvcxro8kdbtde7ln6r9ts1m9j91c1osbeej4121snus25nsqxx2doys5cqj3xqgeuzfzsati1wuy3l9ot2eo7rsp4my8z04twetalq9ev2yjc3fmmi73sj11xem8l0gty4hck30km2yxohxjc17i6s4lmunef4ge98j5a2mcful1blr4dwb1i2v8v9nsdk4vig3ye50enttgon4l4d62whz76rhdw1yp0kdtwkoyf39gt2r04bgtncn5a6v5fvkymb042qbg8x89ndb682tum02sxse0xm28cin7llwjfcptg36wa5ea9wit15pri8l8nquffobv3nwvb9qus04mffibqhzumdwz7zplkftj7gmim5n7oqzqjpfh2q5df1h9xi9v1b08zlxdkchy241mepk3bw9s27mx39vpkz65ux96fbszvvxjhozdqd3ojyas4tlry0vjl0jwb56q4h95wme07uw9alz6fv8mhcvw3lbzb9u3pyaum2tg1bm97e1lgrh0g2h5h9xxfnl2vf2umc35if7ryzvcjdbcrmz',
                fileSchema: 'dmgew6vtvoeuf1307i4g2eqztv552uftslvhcssm4t5i5ovldmvdvcrxypng55xwbo2a59nbzptdvxw62j9rmvfzfz4fb5kjw9salswjnt9e6ajg6ecaa2dlxhazfit8b31l8f0m4vd7xhuv8xggvv00iqrbwfc6iuvs1rx3tsb3j2d07c9d1vduvil68odfjrqvha6i87ahqyy99zkotkorwb27qrd7gqf2xypsv3addo1qvl7lpg9zyddubsrlv2qy5u3ukv5nfgyt0gr22dnnjuwc7anp94zzhll7xv0pt30717f6ch4yrj0ms2fnkearprdeiqrrto0fqic74qiych2eokn2n2m3pf14c8ez7qcqemow28sb942dxptm9vhnplfojv39skwjewzztfx3shs26mx9zu1duzda2pmfthucowdg1sryc1r7psjjna9lj0dc5kh8uvhelvmi618avpi0yw46fdj86xoq1ouh8q8pk885o0ta8gudkp2pbtejpurf4sjgy51oczo7cfdxph0p2056ujkxh4dx32bw7snnmm0mayu51jyw7t1inp91ujwubzprohou4jvtvcld8hbl9bwff6eott0hbrad3c1toi0z1jwmnt4urd7eowh8ccv215awj7aycd3drgzwh4syzcc02ts6ckbksrn78x9xcvhzhhbl2gw00j5q0we51202yk67k3dtl0qirtmbpa19cfh6ln2ik0xv8g3yuj3zx5t45xnd53o2yy9gwjn2pe1tqmeje3zjmpovd4z01z98szw6u41f7dd73ewsoli2dfj02v8p4w0pke6d3niltpvlbgh478i0m650ahb6cbilnt01f6roztxmvpgf3w1utrcfnju6vyegthzpn73vlgiqr2qc1aztugh6bh5rtuvl622jp06dh45ra0es3guszqvw0pxumes2e2olctd38w8dnc3ovvrrcuetweby8uhaji75cyuflqs54q5tsc7u76kavqcb63y1bfke',
                proxyHost: 'fc3sjqombqmu0trhm238ppb19rb91um19u6pjyrckihboyreqort8d9ga1vt',
                proxyPort: 3624633316,
                destination: 'i8em2cxqkehmkhxjerthzt68vomb3mcp134pbh2wfci2d6dodj22ldosnidb6y211o5nza2ek5tuvnpbwcojrllq53zd1obm388d4ba1pxofdizyp2fqumhah0s02bxn93uxl41eyuiwwdle3r4ms8imt55q73oz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rbqlazda5gk9b8z4o40wyt2ukp0l2nbp294pjsy9qnzucaafy7aljxx7mlp63xmwlt9yjdziq9od696g9clfitrs4eyyumt3pa4tb04nvvpbj54x9zsu3verjxlybw1ewmjsirrnczkj341oj0060nx9m9jevshc',
                responsibleUserAccountName: 'pwq8dewqzi03nzgcw1zn',
                lastChangeUserAccount: '0lece1gll6vbmd2rfs4u',
                lastChangedAt: '2020-07-28 23:26:21',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'g2lnme3qlgv5uci9geqveedyljw3wg4jwceznp5c',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'ggj3vgp7l9m7cih94vd298vnbef09b18a7uk1v8tr528tn2hk5',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'eex5v89g9oilrkuxs1nc',
                party: 'c2rduar99zs7gbxyed13925a2znomypz8kvg3naswxpqwx15gtqxkawj72xni6r76a1hzvqitnrntb54vo8dz77z4qzhx9d9zci0mee0qluuv9ap7e4bgosu6jdmcj318tugf58oqw49yyaz3ek0euvmu801rky1',
                component: 'owbpj5zshgmsu9g01b5ktmzwa8ltqs4nkltestha1xx28n3vowtwhx9spo04u6w5f1eprtugqs6ugs4zkjk5vg463q38naxjngj39p3bje7dfax9qxqvdbq4db4sdygfk2bgfhcxp1niofuuc5w1hwns6bjcmmq4',
                name: '1x97lxviostsnvsfcbw9batjo79ud1rnr4s0csa1gwe6ejotn176c6zzw6nx871ovjkd7xewzsjsycgzj10csgrs0w3yla5gg4s5mwmmjbj4lkva2a4mgjfhzn2nk86m6zmn2jiy6ezrqa3e9e2ndx87m5qia5wi',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'iav9hiw7lr16y3lyj2dz0wj6n4myjz3ne8sz1srfpzg77jl8vu5dsiku4pac7028d4ulq7832u7yfmxpyiavxx3fbqy0ak0afdjorga8iwy3f5heb0t1tc32p9liklgmok2g1ry22edray431y1rmvy1dzxc0qxy',
                flowComponent: 'pzziwnc4u6rhrxrzcvl6pt2zmj77cw932ctuccxxpfepzjs9ojg9rv0vkwsuszwqzydltacqznxsuojpb48d3spf0h2vktwcf7dxtwor7vhojgefoza9eaayr980nl7ltq1k3kbx67crrysr8251n3j5bxruy04n',
                flowInterfaceName: '8ep65kndv3tmhtvyykz4vxhfe9tep45irwpjpz20w0e8amgaxkhc2dp921dm2wnamzxjxvd9hsw4rbhvtzmafz7akupo9jj6udb9fqzchgglieky70m8h1fwc1uazfrl7uvy8wflglykpne7bkq5l2rhznip0zdo',
                flowInterfaceNamespace: 'nltsq9hxi8jzjqh9csuv17k45ap5sjhfwm8r17m3jfkxlmonsjp4uc8royosf3n2acr94m5fgjeur0iifux2fmdzfy9x5rq8iipbks80czlmmjm5y9uho05iz58u6lw427u4ekkngqny0hw76c19p6bj14ugnhia',
                version: '0c3dmph4xp3qugksjfer',
                adapterType: '7hijmlezxdgfx3dwp9b63d8muwk9u30rdeufi4owqvsk9xn6rvj7k98rsq3u',
                direction: 'SENDER',
                transportProtocol: 'zp8wflhevc53v14egquykgw9cf5dagxksjajqwuzj2brwzz7bvuqmcu2guhz',
                messageProtocol: '7y3uahy0l2o9wcjocefyujd5znwixsaf5rf6bcjzhvbw0r9ccufoa386bou8',
                adapterEngineName: 'ymp54651azythijc4t5lvolenmicytz2lq5430bt0443cmcm3xdj3nkow9g812tzclrv0pa3ay7k278xjit3aruz1np4bn2befojd59r30jn9w7bkem67zse20u572dmcozjiqgt9l2ws9qki7e26vaz1o3xe277',
                url: '4vj0vivyhjk9kf0ibujg0s4dmv14hagf9pkc8n18fnfc4q5i2gta1bjmbgjay5x3trlkvzpvg6p7t279nv4pvilx60lrf2rvvsaabybcbs56m7drpz1ha4aa8f356wem3mlen7sz1xiu0620fmc55l2cu4hwz8liwltgurtjev2zxi6e2s42i52uu7fb0j7ckhooq8semj0by05fi8bp2bl5hr4udwde90eot7n0s4yxwlkr8rjrtcvu0j3puh5cygcpe1r192kwp1y7iej2mkbqdb8m5fckg9oahxhvz1fdl2shf0f6iges2lxkmhygn',
                username: '0bh548fesszxyl4pj6l7krtgzyx2jog4iwkhm7ondl2movyw2tkye4jm7u3i',
                remoteHost: 'nq8zyobujca0cg4mltf8gxa3lig7z7bjgt7zfsro3icf2aa507anaibmlf2h6vowplj7smxhdk2u5s1cp3leva4t83y7an6mis4ho8bveovkg5het6zol1sdzb3h780jeukhlo0oyne1pudrms1ir57gjfvanqz4',
                remotePort: 8424734278,
                directory: 'n9wu242pz3xmwy781pnds06sskr1fn98680on6pmjnzxkro1pgbtje95fr0otm3freu4n7cflthkghiyczucnpemoy6t0286cndioysdtpecf1vsj5ly0elcboejb0vkg8g92kqy9uyx3dfbmz5qdedqn8edenmr4u4iunl78imhfawmgs4uq0tcppbrohsdi1n7fvjpciet0itoc3g2dxu4nkimydmaahf90brtbxppq7xe7qvpjx0so692k3d0t2aw1qgha5dgi78csn028jhweh6yqutqli58aykqrjcm8cz841qflbwgrmphi75dtem212dr6pmne3zino4pmtavco6wjzjuse3h4p1t7iipp781wqcuiu4jsx9gjkdlusm30xxmqj6ai7ck7nbhp144jnniy98t48rofnk8mrrlz9xbo7d8h4j8ccmw4zsy6tvk0rsvzpchz6m6ra07spkszjcv1uet9tisqq35vjkih2oanpbmm3pags9m7uj146mk5f6pqpdbzk9dyavs3xfm0qzdyxgq2g8a9a519wwmcek9f0e7c2je6ur7epbyfhiczuypy8yi9o2vv4gunhl1nddlj9ndj1dtt4mfcsgb38rntts3osqlcph1ipqx3rrh6j0749tp526kmgindn9z37zhvgairtkivz6h4syiycj1bqlog5eds7qde7z1iwlcrryxgnyguwqx7hklug9ccidolvjvkn1cfi879rl3gcwkfuevspcjvbkyw7iwnga77cnlrq4h62fqxjs21ab92dr21pt54rhe9u3fmwshddyd2z8nvsrjv4ju12hvy7fz7oihp735nefvzrzzem650c4gq1dfnw5ru4tu631ji9fqdidx1jq7xt2204o5sp5o1m9tajm6wr9fmfzn0bugxfeqx594b7j0aceoi9musgpw5lh3lqav96scdih2ktalvmkkf19x8xm7br1r8e5effe2htzhyup8epj3f8z2pf4iikpx7npjjdo7182o',
                fileSchema: 'iijjk9ly13jozupeodvh2kisxqpzi4kj0799eyn5mjqc1rh1jjn283d2pxet30hrfbgvy969061nok88ta6v855vfszulbdrfuq6b1p05y6uhsatp2fatna7layf6ytwg11ln6o2pos8demd585g98bs6cj3cv9zo312u5pcmcbmbjab88rysrxnazm4p9f41f5tnmpuwy2bbrjfecndiizt2vrwjy77x61gny26idh2o78dfv2w1ole7939qklpe31asofqnzyx39o9bybmtpwsuq02s5osrtbazku9dtv723s5kuv3avjnt3lcdeg2xst9jsrah0le0suugucjir6wpb7zd6t2gjpxzg2e3607qey1w6zy7hs2xrhm4wu6zr4dd6p2842qcq993lo5cxd9gxh9m714gabvqk58yqdeg5kj3phl3vx0qzsbn1hxm8m55s79g4pm2x74mn086gmz1sl5bp81zabpspku558wywn2n585hj1qobbyzwpwzzb753k2nj3q4mt8i30b4biuogzaa1t3u12ueziyuhp50zobfc7n9gu2izmfwvjq7zqnw155vu48f3kc2il0d5cmaq2kunpazixgmq1q3kvzmwtvzf0ecbz5e1g9ftrfo1pg73kaq1cf5oeqyzsrxwc2tpuhrozq7mlr01bqxpugkibrn482rx9ogh983hj68flro1a39qvkctidw4y9yhfq7jhxccbqus9v5s0t469ssape74cok1ev2eb3neoladr1y2sjpyvylucbzwlf8puilgbxqycjoln1f00c3r4dpdys8x0cxzdg9isp6l6t5c6uqk9je8pwmpmcph033n497tkpupul9uogqvypu9g5q2q21q3qwx3bic8271uji9ixd0uui38lew2ou121lbh2jg4r20bj8niltg5yk38fujmnoeh08nwafjiykdr94fj9qc6teaawhu54e23r3eihyzfiwov6dxtfozr8jckzj8dkooai0bkauiza4h6m',
                proxyHost: '6ypa4ura0yyqpsftcczjso8izdfbn9b207kx3uggpb283ppxv9r920ngylhk',
                proxyPort: 8455921027,
                destination: 'nl9i9a1eyo0z95t6c3jz20v9slyuaa6bf5ed3ya65fmnplgwoq0y5vajzzdsujn0zyb7nls4vi7ygm7xqdquh42trw98059ct97a1ulwil9mvxopjdo9yyjbnsfpllsupjs8i2fs0xr4kzjop1sojub60bqghgm3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '54np2cxto58f57ce2x0vk70wynb61dz1m1peaprkzqraga4kimg8ng143fftr3svf7lgxb5bgz54w6cewm5oeura3kzm99lctd6d15ptrpba2j76n1o6tdv6577ky5i5wmjpppu86zzkyjcdpwbaxoh0alpv3r50',
                responsibleUserAccountName: '1fhzcpnlyp95dgkg289u',
                lastChangeUserAccount: '39douuq2q490z7dbcygw',
                lastChangedAt: '2020-07-29 05:32:50',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '7ztmz7bz14ij5bdrs01gocq9x283qbiq52rymj9g',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '85xw4bvp0h3lvbyx3pyk1yvcszkm6f7g1wx7qq02tk20kxzw6m',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'js3sy3afjnqs6m8t831z',
                party: 'rxxu3j76ipy6poejabsavaiagyag57muzitntgdqstva2xga51v03eza8mhejrni8rgq6jrgu4z60sklm6ekrhfswb2jac86l29e31ztqaixpt2rm49t6ds97c3v0ts2faayvz8zdn9gi6341v3r84f6u4o41lmx',
                component: 'qb0rq0j249lmxiso5d0anxlwoefirjxufmpdjol2o9b3i02kw78i7iy9n6l31zoeu0irnufscyrj8vwwfsn0nk62se5gll4jtqcpvf9nula0g8lj8pbq9b7e004b026arul1gj8bwxxq5m5tcsu1782oejr9aotq',
                name: '0dcybs851ayavp9rq5iqyjpkqwuceolqmyvy7xdsm4acocp1sjdm7hmu6tdswvv3piewt47lva41y1xbih9kekpdtmma4vb47sincukfqh1u0zfncs0c8jydpvhj6oro5valgx0pxs62t3ebvx7z8pwquevps8qx',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'ruyo18t90qigndc612j5xlezpd6m3b31sgrivh4hk8e2vewp6ex8dehw4r3xws1gogzv1zpiun494piumezjgxfs1jdqhxkynmgvol2tjdzlo7xbxspuisnw74il2t6mfdhqz6mb5qw90p8d4d4of5ps2zxmau10',
                flowComponent: '2lo9yu5m3d3kgvczmhd2qd2g7kelq78vejli7v4j16vzxi8kv0hrjenzshnvv8i7hs59k9qzp6fv6t8sivucpufeykpkq0qicvm3havv5kjw3zijbaaim0pnve2bkkoyr0gwhakwcq5x14ajgbqvzhf7gnm2u0db',
                flowInterfaceName: 'hakuczq9pezd747zkrce9fef1wvfn623m3q1epg77bsow35pegphbrw4pn0rilcfutp5kv0wz300zgu0gjb6ig03e71ir2rstxcg94uluzk3ahjxqwr9ahxhn851qrnpeniwc9j7bqkus1rhklumdpjjhb0x1m97',
                flowInterfaceNamespace: '63ybt5sv898r3dey33fuenvr055rjby0e3lz7utbkps2v6mf322xl1dh29vix04fvxe7w9ehi17nt7t66l600h8qqu2xajvmwvplsz4j3p9vuiwq2sii8i22atpktbjfpcjqkwpjhjazh9vj1dxj11ncq928w88i',
                version: 'rdv1p6767pu1jyp1t8we',
                adapterType: 'rwrbbep41gg13mfbex6p4uq25glhsjgp4t9c5yro5rcabr98u3rwywdblz3p',
                direction: 'SENDER',
                transportProtocol: 'mr61u7oyjdu5m0uut4xn7oh9isksimdidhxtsbv0bh1aleextdf7legsdegf',
                messageProtocol: 'kw8qd5cy9pdpv2mpi6mi0vn66sgr0q2ztrp2w6azox5hlt6yhrfnbg5ykua8',
                adapterEngineName: 'b6cyhkqixneeyutrgdwbhqytywhttvo0ulx1v3sntpg2babtvq24fgpj22i9r1id02t6codoiif03ehhmchckgj8x133nhnfl1jjgi6ghtpjtd84xuhmn3i4hhl9ubws0y49k0hn29obg38jtb7r48ngqe2jk85y',
                url: 'jax8obxp0ct7y211318fqkz9i3zuu2xdqef2ie33b1crwoegjm043sksyzqzu5ycuqp3eh204bt33lf3azq6dkf9h0pb8ddtuq2a8fjils1ztav1g5i1l38p132wapwo5ptxjs0d8nbtwjxarzwfj6mfb5oxmkl0gkgg4wnh05cm7w426npgn46sud2w3cpkqf4ub1cnryhi0izjyd7r5ordl6u77dgnyp95gyjnyc0fvoc0mdabplrbeqscrj7qx7jjmhstkzslyirp192vwhihigk2qow6eb4czbp98pqr2bb28zw28103yegnuegb',
                username: 'o69fslli1izlyhokcdkktz7in9yeo4z2ocpjsa72dy7q0rbau9hangdcbgkqe',
                remoteHost: '17b9e0yx0tddkw98rt5np9uufzn107fl09ezlz8y4un7ylskbe6unth4vjiklhu8z7bd80ftkpt2i2tn8vi8o7oervampcd9hlkmf5ejt6hp876vto69u11egt6dlhwkmygf3vlj2iw0ra31dshag70l1rbbctdo',
                remotePort: 8399376276,
                directory: 'g4e280w5jkohs7tw0n0glaev5w7rjqgdaoocaid5g97w7bcxdm9haqid64pqb2gis9vgjuv8ql7z4rhmg43xjo15gmolld1a9ynzzp2xd9r1r35r7r20yser586b2fq0nj4t4i4noh9mml03yk2wp2eqfxpwdc0prt1xz3wo9cd88jkmcqr1p3heg5g20gq4cmqtdcqcvi7yahu89oj7j3q68efq4nwe9wozog60vui8n662kpjwdgw9p2x58q2c4qf2z10i2ytt8vxitub11i8fgvre0c9qywa010k263umgeupeaerbwxtwizgh3akhehuymaf5dqyt4sqf2o1qz775ru5y5eqeafzfgj3c522oygbheod3wt4fn09yo15ia2d8jmz6x1s5b1cu6488dbvcfxny6ar5rl7nkg5zw56pf4pp7a6zqx5vfpckqlh38z860y47yil1hpvjj1epqjmf75zvp4gj8sgse10ok5som4o7g2l6fdcqx4sxkm5a8owaksv6a3a0qd5e16qgvv0vqrq3dc6lupl1fkw391ja2mcz6cuyzzvid25ma5zg6vhrxa7pozqjxnlelgplaqzaeos6f4qyg89hmjxpatikr82ummfkza0hti2am9dy2dpysli018iq5anv5w7wyb4wvdu7mgxwwjsbbbt815qezspwxpfg5xkgynpxhkajtuypjsp7rg67ji7re22afvm0l4bu20mhwgy7n7nblme77juluy1ctv3vouamdcxpf2awsajmu6q0kuifb5dnephbjx0ywjwpd140dxiy9d3xntiz1gu2a52nu1h1od4d7de1uc29wbgzvg86cjrrbr3luk18s4icazcja1x44g25hcv23od4wd0dfkct475g1jq1b6svsldnu6xkydhoqx60va6mlvi1jah11occ4o16imoscilsm1x74i91fqygofylaj8lyczfoa3l3ly3cbu30zy1m7pwq0exm4shztz366sx6kvs9zhkkl03okq',
                fileSchema: 'hwnkv74kwd5rxv0vqyjhtx2o07lcpdb4m4usv44oqgupdynjch1a7sgiqzpuu54o61m2352a0dardvs104vpy7nwf7t5ar3cp973xv4di3y5hl7oxyichrojygedzyl5lia9ret35en31pr90j6rdlttxhr8fg9fmk9lm32gk5rg3ntrfb8556q5m7ogk6ywtyd9sog6fdnm9t36ujndy9mx51vzwpdzzqq50w732521lfuin86bn3kpezk0zbd5dzst9giwqquuq7afqcep3ojvovlbwa0khi1qnpxz2686v6rmaqch2ezwgbvgpkkl9nhh9vjrluxg487uqk8dokgp6n2wfgx1e1zk3r13jqbcmvdsms9oiakd1gm92tsa5x2kvab85idi6ugtpslr0lt4z91ze1ewlw8skqupn3l3hpl0gmekfqzkle0l41mj352dm8lt0qsj4en5whyxesb47w9or4yph0ukw764z29f9mrfea8lct0dwct1a6tfr4jrq623r9kewmwrwhdk3jh9wapnpkvxp75wcbejb83kwdbb2s025ojwgxagx2prvubbmdp98h0d45wupnn4af54bjp0p33ol4yyootca45igimm7m20iesqhszka6br1807byurk99qihjh09srfoii8cp1fjx47n84561lwzvc1yfo012o5ljhefet8jii76mg6u5d1sxb7zagmljpyvda752yimttawpwtvx3njwzy1wcxk40yncoin2qxbr7shbldxm1cdxz1xrapskzuc0x6lg6kkkouaguaivs4vqipoyiph8h938iw7tzylgnwysvk08acpq7f7jjpc3b9loixr4nwdqrjxvxkejf20d5emcy2r71frpmdsx3b29sqbsys3n4cg4uukm2103t6kbfsl0x5hin08q3atc4hwaa6l6zhaumdp0qngsnoyls5zmv6axfj0urugaffps4rfe8a8uq1z9ksgubdxb4urqkm68t2s62bfjyr4hxm550',
                proxyHost: '7l8bgggcalo1aqd1hl3alkky0qwzwg2xqkpweju136g1hkkbucgqjq866kf3',
                proxyPort: 6576458665,
                destination: 'th3emwgaalf2nq3se53026b0wi7r6e93yc2dvda6b1mjkvrduscxdc78dcxqfeo1yaf0qe4m0luamkazomq1aesmrhiithbg7g9bayayrfyavl6ee6mas6zqy4bodpebcktwdxy8ovhjrl6kyz0e4d4i1e6c3tgi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'r4byklwmik9bkw29ransv0ib5et6pzkizqz0u37ynmg09b1fz9kc9szykwgs9cqj43zlbop8zkragtgsaogoqyeo92s1yvtawon0bcb2eb1luz62bh838q024cyvpull00iujrlfqykw1xufru1ljsl02r4m2iat',
                responsibleUserAccountName: 'lgusjvlwrf7zl3obihbe',
                lastChangeUserAccount: 'ufs518yc2w0lcwvsw6w2',
                lastChangedAt: '2020-07-28 18:33:09',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'tc9oz5s1ex3k5dd4xkwirs40xm1oormpgh5erhvu',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'vlwdy5s0kuwwfnp8pb64r8j1wqrwbtjr217uob4adlx42egc8v',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'l0jmkw9obcd10959u3xi',
                party: '2jda6hgenzplpwy0jfezf9jrza9lqj5s8xqcl1ky23b2l7mk4bdoobsblswdwfulgfzjhp1588hfi5g9pcgsjur9j2ejv4243losxeg60ez6toigy7mr9j77iifh2jp93x4k7tyiimvv982izydva83b00aq7dgj',
                component: '7jtx5w64skvwtiq0o53smm5g046iq6z1f9zpoq6duhnggbixpagtiaaf1ci9hbes9zlykery03j132241wa7unnt5rw135394zlqplrmy54ks0xufrv09j4dsya4u6y7n331hsmha9klfk8mex5rxs4x78h26h2e',
                name: '96th762nn0o7w73gteovofnmsk5eabuaxch5yfvft3vb63htpombofjnhg86xfjn2vw06ydllhtqoinsmg9lb0j69bpdjbf5h0ctv0inu98ep0xfcpz6o0q840bmhsnvtvq59bpjphmxvwpor8w1swpbbvkhcfcc',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'bc5ejg71aoodmx3sbwesgop45oplgz5cvmadlo1764a5xyemwm7ysg2keuvijab8hffsa6tnwnu1ivsy4b6spuda5z7o58yskfdovu5ns9ucu3v26u5ax468fmna6obpcyphmg6pi2icbwu94h60tj5spyw6do7v',
                flowComponent: '530z0bzlzqit4qg4h3xxtz9qtgu80cpfhliw1ad74l3ueoll3eo438raetw5v6h7czj4g9h305ua5vijs6kj84yb7u3a5oa86k5jqkm1slueu0wrdzxg1dv7c6mzq3cdhup6tcl5beo9ofahkvk0yvg6j54ud42l',
                flowInterfaceName: 'cfsg2k3676f18vgnf5l9jmfwql0iahiz7xghecp54u6p5qhqzstzcj0is0x9urvyq07wkt79o22tvi1lvcsln4ioa59u4dpib2jib7wxcntbq2drja7raa72su8pqufm6zsdypm54cszwfjxnsc4h8jdjtjvvap5',
                flowInterfaceNamespace: 'lztk5hl7dm4ns79cmqcwwdh7buffqecfmvjlxqakyvozlyx6gqpva5lggdwk7rypeqxlhyl3gal83l5fnhioe07142axdztr170orcughnfwinzbnffj10f55jr7hxna0j7fxi92rd4oktqgd1xmgen5m8y5tv75',
                version: '6hukgjz7hyb0lzvf99rh',
                adapterType: 'd8thpowzshcakfzickttare3alv59hjp00htrc26ntxn6r9773crpcp4zrpw',
                direction: 'RECEIVER',
                transportProtocol: 'v0k7flz8hyrx7zdakozbr9sgz6fxfihz1e35hbbmm4p4e5x681vtuo36bxpe',
                messageProtocol: 'oguf8bgi99s9pu9g829zpv3um9nperpugebgxc37h5k1kq18nf4sq4ax7cu2',
                adapterEngineName: 'dnwcbl0kpyqbe9n8o9orvkqgmwn0kvegp7aq60wgi359slzppih4swd3xh2g7hmqn5pw22fhqboz5bicbkmmdz89bzdwuf4xv63ppm7l9y896w9ma3rv04vxklbnmkt9rakt4wixilds7ejvq1xz5vjoe22gmsxu',
                url: 'w84so0cdmq7oijp7r6gr54674mu410l8z3w9tviqpocrlicfjr4s529aoffqxl683khnphjq3ezl8nm2z5bn6xdllecpaq44xu0548ls6789g8ju5er86mzz1nnuu9v3isw8l7r43mhntqeyrrahf32m4at5fptjmy9o86zugpsncfrpltchc73jqt0z6gh8bt7vd23xurlevf5lpzcwzkqyizfzbfxsztmjmwjpjxt3lb2ehcxjnjvm6i0sqqucjr71yv01qlindlv8bx1ychu59s8u6jbysez19xziaur6x50qjuw38vaip475ex5s',
                username: 'd3ujbht3wijd4l7rbnqu0clbucmuzy5llj2xz3mqykdhzet4jluby7pl0y3s',
                remoteHost: 'pkleivy5mt1kpmftdr7nlfhi9rqwhnh5ushldv0zeq58r3dkq5nyphbj8cl3wllrikxnur7ws7cqeh1435o8e8o3a3grsj7aei6yl8twkbt0w93hp9yqufodd6ndsm7vf0lrtl8wxm17j1kmtj24grv6z3yiae1hx',
                remotePort: 9412898449,
                directory: 'mnur1zfl0nml1e6s2808vtrwtb4h00xpt2k1qk1gh2cuz6q1d96u1j0qx71c0enya2sts9t59md6ki7nvlvku1ypbfz42jfx9xnvk23byn8ug9gubpnljbu45vwsw5ypxvzqfmbwehnqltnkjgxs3q8xwczqvoklg20cpe1z4rogrd9on24lnkvv9dmwlhn6rp43uavh4ypangvez9dcvlpp2g982i5ir8mg11gq7wj9zrlll2mba1umgz5wfhfhky3z70uimitr505lapwt2npdtsa8ggdnnmr2bada1xbxebnzlm25j8u6idvhnqnuzzz6u92rzdzzvfo11bs15bqlb7kkq2dy0xq552tqk1hau2xirgjrwtae1sszr5rdkjvractz115ktxhm4wuivu4h7hpa2h449rbbodmxrmc75o39fo8dx22f2sgvqn12qk71jk4o4759w9he8v58yp4wgyd8gdhvw114nxod1yxoq7bxu9wb9hk76ylql8inknhhe63axx15w9jtvlytuizzoppj8i4l88y7ne6o11rxywo5a7yjojit1xfe6ew18c65wxqheoc10rrffdoi4r27i2tgyfw4xe7xouu84pk38fq9ajkkemue8msa3c2udld1595e719uiw7b8cm5oiablmdanf424uugpdr2kedmasmvwqct9dlbb168vl2fcscz2d1cjkrxtgoy1bvyhbq5m2hdhsovf94ugyutayl2aitz4delpqzjob4rvwpccmo1un6th7pruxpeu5ocnqxafg38fjt8pabuj0lxcb6yx7ay55d2hsbyx3r7p3qct722immxocauquwq1eq8o17n3yktbmyr8941sutrbiujsbesrvfaueqtjyu70pxauuhii1554fgc0apnwol97pbf3t1mby7uq34nm7dxd61w6tdzc6jcxybzy81zcaujade0s7c7hgpwn0jyoto44gllvf6t37hnrod8v9d1xvk166wqmldy16yvvegnhzi1',
                fileSchema: 'chqh6xnledhqogrw5opr659yr3ni9v426dj19ulg6i9pfesi13tlwlaf27rhlhekndjptl7hdeecjwqtlmczkxz6rc255vd80893co15hdld7xjxyhqmje07s2l6iz5w8mrs6be5jxbs0abt030y2l4gqs1hdhqt9w19rwqlw9dw7lniwtpzn82bdtidulgbxhw8ixczgbzr1w81wu69dhi1tffxpzcx65exgpcsb0mqe88j8exakq0xgxuh5wo454hn8r03is5twatyzdaohkv4dq7f84ckquvjkdm67tcljybp4g3cmtr47emao0dotsjtivmgyan23ar9ftzmgl5cxcttah5un99oqxw4lyti3sqgonrsbukg3kmvutw423d10h8dgrckhs0kl73yg6bnj1q0akluef2bibloj2e2uumrpvbrk0fkpavmj63htdw93c2o0p0qjx5f3mbt0lio5sj4a4vt186ldh34l7gx78rr261l1euu98udpfv281lvfgwn5s2tiksi76v232ddodsg6ctok4vhbtw3hypsy98kppxb1xoiao59vf779u7wwyg936adv80am8ycwqb9svv0gfzd666ho9lwj4qvz0k2wt76nficrj25yjzk3cmk0gjomfzyxwveddgfv4a5uwbqbonzvqr2rqde6wia480niz0wo38xs4af28o98n0n73jakm437f3w0j0dp759g1hinnodo7zbtsx5xav1us17hio5sr4cqif6gz3m13k4yuqc410trom1eonpemffcf8qc5ncw2v98kk9y6pxn0ecoiekpjbz6jq231l4chvqjwvohrgkj4gx3b9gecxt0si3add3xotm79ciju0o6ypyfp749zhbqx5kkt9t4f0frg1dk8v3rh6hj4hxkznkqbl36l8l2zyvt8ks9tfm94156fjfe4lntoro5lh9hymsor863v90jyqbv19486yxj8ih1hvusazcjiy2vwnraey304olopbgrf3y5ark',
                proxyHost: 'gxn3xlsxa57uaq88x0uzu56xe2l04fpnscrua3zw3j9v86ksuynaft5r7o6m',
                proxyPort: 1041174669,
                destination: 'kjlmic5mgyz5p8ta4r3t7bptm35103wg6y41g235ok283bo4dtengjj3kogj60vl4ry31q3e5yhbojesgipqu4rxiefli05g6385xrukjmej7h5cm673farivzzdixjl7nastfobeistv6v0bg0ucjcz6kubm926',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'fdjo69722na145g56c2rob6ph91z9p853abxyllpibvwcfifoscwbldy9mqy86qwj8kb3m1695jlygy18qxj5bichkt5ivitxpdzs351sykmn90zx0sxkqey0wcjpgzk5p0xvgdzrnwpvtxxcy8ab5pyy810wipj',
                responsibleUserAccountName: 'p4pc6n70hxsm2nwza0xl',
                lastChangeUserAccount: '90iufaqqgkzaw32icamb',
                lastChangedAt: '2020-07-28 20:38:52',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'ma2y9riefoktnjks8rmxsn63a5n52v1g09ixd7ab',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'jtad9skz89alorpvtoyc48gwojzi769hdq6p38soee14gabbod',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'y6w55drco2h0s87q44hp',
                party: 'ehkvdfyf7m4elvshvksyuwpavwdd5yra3msmsp9dl003nupi1jcqkflqfdp735939qah1w0u663ifkwykdb6kz0vpzjnxzycf4ya8doykzexlje448k6hqphri94vnnac034aq5mbieutubz6huqidjgafakjtwo',
                component: 'p2nfzhf8nxcgb73848ze6bqcv152fuundvfaivvwps9ee97ui7codo9819eioonq4lju5oz77n05alol2x93opm7ndyqen7unk9f3viakfqdm5zu1mt5nxvip77ycwkiq0k2m6yhke56tee1q1k8qs05bqgwgoqt',
                name: 'kyrfzd04cik7lcaadk9ijawkfg6xls8uy6o37822ynn7xju2z9bqpvjl21kd7akzm74mf5evub3txzripfxdddenkdnpnjtsx958d7j3g0hvaoq4zvk3oy20jozb3rf5xso8a17jwu60jze6tc9fkkrqipz4ndyy',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 's7sx51d8vvxt8diyvhk8rpe7bvn4e0gju0ywwfo9xsmzy22guv9z8otk30a65mqqqtcw5o043cevsohd9t9ekdcg0ht8j5pvlb722ce22nhcoxbt01vgsvta6bfsmy8qtd5qyd679k8u4gf7w36ulf1jd71p4zw3',
                flowComponent: '507re9k1n7e0xgi2jb8k62lfnogx8shn0wmmijztndmga7s31c76rkanxcseo6rp1bxmb91o5awb95e5dy7982i3fwov1jvs0njrb3vihl1qo1fnet0c3d3h6sscvb3xrxnisk8qje4wt38zdpseogowkgu0l552',
                flowInterfaceName: '7d4e3zk7l4p817lyklyd0tq7u8o8zdaga27ah5wsdisbkx58d0wxom90sy9scrl1orkme4odbnczgyskunze3823s4pf8f7gywq6ats3dz3sfqysiuk9f24ahd2b3pf6b2gxcb5jpvw1rvcus8fnb0fy56321awp',
                flowInterfaceNamespace: 'i85sq34ah465kh7tnam35c0uaj6lb5a1oxnzwnzah71yihp58bazy42hwqzkhf1ebl1ylkl3x1j4f30jpv1ualtce9397xs09us4cpvdn1fjj02atgsoz0mle8sy6n0pmbrrag6kfquktd5219n9y3k4yk1ts31f',
                version: '3p5gg14gw9kbkxyr2kwj',
                adapterType: '1mfn8it1dsl23y1zdyhswf3z68onokqyr1w6cls66dq4z0sbsnboolcieg9w',
                direction: 'SENDER',
                transportProtocol: 'qh0m7ylvankeb7av6cg6gc8ise7ouptgfxubfug9ow4l348ccwz3gtz12qam',
                messageProtocol: 'lzqa1do2979jvftrdzeuf1bph1zzy59588drrmeab308k0zrul7axbuhiy5x',
                adapterEngineName: 'jbe39w8en43sw8oovjrd7ly30ieitk13clo5goma0fi9msa8gpuf0na8mqhu8h6ck8apwz7gyv4o9dnljseyjsjzy4th0z10tlr1u5dml6i7o320pdllcf4gv4v63hm3is3nhnmh9xhwnhq0awa6o1aheejo97ol',
                url: '640an5h7llbfi6lytmsxh6gq4wg3q5qe98g0yb7xaxmvy59ekmh85yd9et96u9qf1kh5etp0jtng3zmee26df68a6b220al063kumh7pflkufhnmpsxpi9nxwegxqsg0dp3pfri4ecsqmbx2hct88gfrgn7ox3k0faz9sfu1xz23gcn53bzhn27wj66zu7rkfuc2gvgu2r5vwww90s8a75bnomo360gydlm4l60vmcc9nq68z5pjvkou6970z3vjtdrhqna2ygonqst6s61qxasbbmn9mudjuwlcdiq7kpk4bxtqd97i828gxwly68t6',
                username: '303n1ui5fvyigkfup5jo37xi4fffvmx7pt1p165505v0xrhsw1w3dsoosid3',
                remoteHost: '9fvf73556fo2ijk3wtt0pxyhlx26rcnz37h3zd8gspmt5wat8qbdx3zo22x6itli8t51lnl0bsxwjhnutoajyo840i8yci765iae1uu64haaqgpwn7wa477a0j5qn2hncxm9wp4r8yr5rzodj91yzedm1htbz49v',
                remotePort: 58851477881,
                directory: 'arru2ktdjlovh2bznzkee8r8lordzreewt65u39mi6yfm9s1xlgtiyx7puoqa829gnd22pi0i8evtyt5t2bhlr4pp8gpnmhf8wejmz7gg8xu5y9801x3t7o7jympxw3ovu19zany8bbd9ljh1opifktpvo4kovgdu5pve9fp6wwgm8ymqc6me6zye3yka215ewcefm0z2jfkmhf0lju5s7r9agoqzfwv5fgijdvd0d0sktkayk0vg7edcevt0k9yyclhn87twtf0eict3x3h7v6k7ye36ctiulrp1hp51pq78pytyr0jdmz2j2b27yiv1zgyy8w8dt2coe2v1egerko104dnhrll04ktjtqlbogmdgg3scyg6ly9u59moja160yx3mbe1bj74zalxe8qhr6tz3yes6hf8gdzl18y9k6s8q2em7ftjt64hxbjfyvuvnxh3i7lkae7550xxhlq03cr6i7jfkuzyr0n4kd4d1eow99xdcya35jmx8qnsoh66qqu21upkppzf9w7ojxwijt6k7krimasffg45nsfwc2y0zx59azbeis20a6aaiku7j820k8cq76ztc808rn65hg37jjx7dsdp0qcxfwv9qpmyn87bkcvmclupzvvm1lc7o8wbljjguw3lnzyjga1uhevaklta707duhi40o70f4ypcxz64urnin97oatc2pp4an52cjln2xz5hglxjjx7y0hceu8dze1gwbxfupgkr9xwvp6nhmlh79bdr80p5v2bggp0dlmojajxb03tdiua0n5g47ux3zrtq74jhbj48rp6ziuh56d9af39p6aqk7i6i4epiiy4dvuvi0b2p57afxlj1bw7s9c0cehaj20a9a96ih7zz7cvwxj30r7jwqf680tolr0w94da11qxw6kzmcv3hru5to7zol78w6he7cpnm5c0hlpqkoxbam3htpacczlimdgt35az6f83gtye673pnbkbmwxr0hyb8sj9gdqn419iokhsa5h13qpofj3',
                fileSchema: 'wj3bxc6o3nzzgmcxlmx7gxbtmigkiolprbtznehytlathh5j3zejtefj2hy03mcs0mx71rvfsdi4ynr6ep2w987l6gzhxcuxl5xm8rjyzqr9wmmqulrw9a5zu9dbtmjsu1mjjey9um56wwr1x8gftblaq66zzql2qtnt4ex538qm50biq3d6di33tnyior1f4s6n282ubq6b0dfxfjr2emsdio3m3rmnzxjq2w69x2xccn235irgn990wro31eb5emcm3ljsy4isvzfzhtb90gjzlxtdkj0qysn29tfwzvi7s4p4owhv6obuc0nvlvymrh1fopjbdbps74p5ofelp4cm9118xoz23meoeikq7q12jup5o1k4ebpibozj4jtlfdsr82uhg7bhg12vl4jzzm9gfcgrhculxdfgy3b0425m9h9bgnt8za95czg0yxim53nqqbuy0gl1c8akscvdjk6s078s5ehl35ylx9btxj8uy7qespx0l3l2tuds96ujuqu7tcxn8r6w4vcdgcgl2kdwg9umfz7hlljnml6i7etv6tgmwg67hbtub9qn41xaj3tht5mw5s6m1z963j72xpursyf8gjfmdcm4kta53io9ae7bv29upzuixww20l1ijwy1pm5jjug9gpbv2xep47vencg3qrxo107qz5e001nk9pdywqebe0nwzxbt22a5480d1ph1j7oguk97cahfuj6acusd9ymapv8c83zxk5iry77eo2zo59cvcevt4ctyo3u5j4sd37xt6ise5nlk0y783v71wqni0dicb1syeoh0djgamww8zznniezc3d7s8okyuxu1fn9biboj39hmx65jjva129c00rjykhxahm8ka273immyewdisvajxyoyi69jdnohloezeakip7qy13146f83r5jnfyu992uhgto4mxzy8zrdcw81533mzudcfbo9fu02ogdjjx2ykok8uirs02l7beyebfm9fu4dm9o0azbpm0pt14kug5et0wah',
                proxyHost: 'w558mkmv8rkcebydiqe14r92qwbh3elx8co86p7b425yjn93s8s3nk22nsns',
                proxyPort: 9814331120,
                destination: 'by7i8b38ann1o9bqxxg0teawl9gesq11y0c24c0bx7h1gv2znlkdmqsh2cnrn0vwnheadvuc7r44iqz79rn9v8dzqwm067eko0pe58gp041s1n3nb8mtzexj3m9tmrnn5v2b5pyukih8smd0r88qvrz1wkoqglf3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'svz18ofvm2z85kqku8uasf2hnvrckrc85beifzu43gg9zh4x7jvs6jxw36tl3hyuwnsc0b8akx9afc9pudjl0ra2fyidvh7g8c2rybvp5zvuqafievljtfxuyqhsb15lrs3ev8baxk5k81ev1p2o2k1q0r74b9yf',
                responsibleUserAccountName: 'f2yizm3t3pgthpl7iy1w',
                lastChangeUserAccount: '3s326pcvfnwomtfsdqyc',
                lastChangedAt: '2020-07-29 06:26:34',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'rjqxbllemao9sq0yskscoywyqg8r6ubwba35znm9',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'xmgkrsvqu3tvun78cvuy2xj6dxh6z3tf5d3naglwb1o9qh8k50',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'z2qnc5a2peh4izolcu98',
                party: 'kdguiedcc5moxry24y598um80sswxha6eylnesvzzx6hj6inr2ofaig8cmb6sboim81s1xrj9sqmqhv2xgnwgqj5wdwwex1kx6k7j5amxon0llyj5y4lujtcer8iunyyb4r7kgdhwxzfidtflme9wcwej5fsy8ne',
                component: 'aitr1met186k3fcs5cbj4b7bsbnlissxf71cq9noyipz38kvalm60m0obph0ocn23ps9eiwh1hn1fdmxuuonswh8jjj2t11vgu122mgnt51y0mgps02ao4tvnht5gusd7eaetqk0jrzf7rewmvtn9sd2rfrfynh0',
                name: '76bn59ke209k3iatwgbdu3vho1uizkqihcgx20iuhsidtoxxivgb6ply7k9pp8ye4gksi1u1hcfz8oyxqzuhguwvb0edsnmo8ht40lt98h2wyl9khoppaghrgv8eo3t4lu2u4p3ld9npa388a357xk3tqr4md4ad',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '6oekj9iq2bboggtxm4fyhxglht58fiypnimlxycqd7yvcsodtmetl0g1w8oir3cv7uzzsknrh401hrgopgrobbtcz3ctzla64vm7fqf25mt1a6x2gk0yzq51hhguk4rp16r2mvc6vs4sww3jy8tc8t736o556xkz',
                flowComponent: 'z9j6syip9y5tnsohtimzj6ya2jl385z5d6yxfp7flg1rzfukz7pjjab4yu6tovg5dc8xv3ho4vuwh3ntirwym6oc010idh1kwmtq7ucjwisw9n9wukwg2r9xkxkwrzge3gpeckuztervl68o1fdyqiw1y6t4k88y',
                flowInterfaceName: 'vm1wiyolfqjhb8czufk7h4aj5d4nnslx63s5zdpzmzgrwikb03skv8kma6wj7emfid1vtm5bqh7ynzlzg0g69c4dgmo8vvvfakzc9t15e64h62anp3qwygqbf32vakngonkdth6jml1sjvdz6a9geuhpq42opukx',
                flowInterfaceNamespace: '1t3ldsc2namz6i99ldtaodfvh7zmv3mg2t0vmrf3pqi1kbm937t8zm201soe9xkt95k1s1lkod1d5q3uk42g7cwtm3k35k4m17mwol4bowkd7mtoa6o9n3ggqtok6930p7k7v0ib3rwxn3vyunzcu1lrth108muv',
                version: 'wcck1krdpm45x5j6kepc',
                adapterType: 'dhjbik7ji2y5wfsj80jhc7mclhrbv4xbja9v1mmuu4mwu3fcc6iqt4c3ii07',
                direction: 'RECEIVER',
                transportProtocol: 'qty6g0a6elvsnrktr6fv3mirr5n7efiflkg1tkz09qbjv156bc36s2yiqz3t',
                messageProtocol: 't1ynfke7gmllwels1ptrwiju63qnwcxwmt2c219bjcshltjjcqn2nq5q5qbi',
                adapterEngineName: 'e42oo5jootu8q3iaepux5m2hc5scx497tzhhme8v89dbqvvhtyg9is0gj5ys058cyk4gtihzhlkl1g4bog96gx0ydru5abu9vaz2zmqm44w9cic6edmzxwo7tesu7buonrpb770a54aztqazbgqx583t3vlc7e56',
                url: '02trashnmrtxzzkjwcgd3fa55tfl4tuburg3fi6njr180hud7gtozahbdpl5v846ixyrxsc9532avl1qmdchcdkjmp937u17zica0tl9sgxl1ld0zilik2b7kzo0i0oriamt0e273pyg6uu3zvmtazn3fr0nmv8vyvbsjolfaia0kpbpc0j4bpqhkge01zyc5qz7sdelenq00c2h5u9ijqk3z35xsj94ug0i0mqudwcb93x36ataehyq6ppljkr1rb2v4kxfk4zkiyic1dmt67z44ntqpdc35jtup24z491p2x81biup534p98nmnikd',
                username: '525viyy6bo304snnce1qg9ukeu0x7ghb6uzx2l3q6c5wl9xcxjqgx0rucyh1',
                remoteHost: 'xkko85h0172b027a1562j6auqyzdtefzxz15ytd76j8fibbbcw1684kjph48meo7xfuznhwx3h38vkp40swgwu2wuhao3qxy75figa63t3v6okyq30qjm8qbvcy289ss9kozam7cuzoyym58jsolklj8z2x6gu5l',
                remotePort: 8399764035,
                directory: 'oa5nq5wme39tyik9uwtpdmbmtjwvgmpw0utpyeu3qdcfykwglbvbhhvv8ea4vfetpazi2tenuoxcsr3jh485u3y41bh1dua08cuu8gb9dfwtj8mf5l5qaolsuwgywcpydxbtxurh92ia9h1ujoy4u6qv1aeei1ddz8ah57i2chcbkppcjkvpwek66f32iaqjkrjwk39opb4udamkq8zonftz3xdg0g64xmra26wv76b8gpkkzokklev4629y9gmiiiwucsniebm2r0qu4uutkc4g7lkib83am9refep9ywces6obdtpst6zs00ci7l0b69uzxdny9iy060gs7g8h0rza5ha2e3i4wma0xmro1gq04s0oxznxy1osssc36bebjrap8kemlxkjbq4s14bv9jqq4p07dd03pgjksfmn5rzqxdxn6cl6ccao5mvgw27j9ujl8ttht905acea1h27etkxamu6geldn1np3fx1nxbz0ix9f9j8dt0od1a7kmkt51yslr0ljkdi7zad9fg312ru8y5224bjok479g5ysa2huo5vo9qaaive066zt0wa58l9zlzwkiejx3hjj6x3bdzilcce4og0ib9yu34uyyn27lh7cjhcsw54uookqppbhe8fcjkw47zaph68cb9054o5fa0dbhur1d0ok17khxvwzw0xmofadfo6q9fsne6t3io73grqifyh7dng345kifurrlfv2o2t0k2qkd2k1ezjxminflug952mptynegxw4u87atg434p2c0u36l23kf3pe5igsswzsir6sngvxsjjbybceo5y0t01du6sp9cg4c45pgum0onevjd70uposregrfyh04gwnyri895qj9m9b2vj6nzl7bk1hw1jvhoi94ml2gsbah532w7vs1bni7v2noo548qontx7zid7fp44esb6axvwrloi89ngj84i4mbdd4nnmhli6fmoa8pdu3n0medz8u1d5xi8z5v0gsvagb4mw6sl7d2qfvvf2f0bb',
                fileSchema: 'wx0osp9x11d4wl2zeh1by9zh7swpz94taf5abujzgkzp3wncfhw76po5d5a9rnu34wozwaeh6uiel3patlmv3qaac3vfrbaqm98j5d7iqwfyehfvhmrfiea2rck92j0b1a5uvj0pa4k112gftj2pg7jze0726vgv13c4r7hbiyqri1j3jcjjn32eaxescs6jxm8em0eqwc4qq9hglnrila59pao1n1g2sppum47cuk662ulloug54x90bzkrw7hx5rdfxfs59wqesmnp7eutaydxvsgppwin5c7ldilcbxurelcrs83ech0do1290nsicc0hgbygn6k4mgzoivc2t6af0ew83evr5gttiip39kqoa33cy4coobu8cq0h8zljm6op4twymwad9umo7f5oe4ifc8pkj524fvk687rwp5ai8sjwe1g0v88xtvi3ra2q5xty7ls4ettn75gujfk9ufkn23d9gaxyp9ffutfg7ieofd8hp0gumfwy5haivmptvc8zkmh3ma9y04oorvlj9ofas8yifht6ahfoue878cirkj6r8f43z5avisq3ppp8i7lwht1q3bwm8pafv75qmgo4no8htk3tuamqug9qkesv0oyhsvtlo95uoa6brdi8qq2hejee2lnwatwewp2ik7xulbfeg38nuq48pt7nthz1bjz105w3kz9qb6bfd4btwom4p9q8tva096tqz4r7pmxb3bbudqb7kjls3a4a1m39xxq343i596v40xtxholyd1dr6o1oo3h54fyeayxdilv3pasl5w1zyjdoda3coq24h3k9rs3tyef55qz8zhgihg2v4djmeyg46r73a0zut7ooda9sur36u8kxj8lyb5316lcg9yqopvtjolgqowbjwwzu7b2skmjxsrlpjhvubviu0n0bln7c8dv5o4wz6ca9xtzioxxvb1q6wlbtj1jgriel555x2s239coi4lpvmpf8h59fahszlscw7mm307u89awpuyb6uhvy1k89bn0a',
                proxyHost: 'zyvnwzckepgrp447zh69s713i1myve1b6m4zkx2gch0kah4gel2whn49b3u8',
                proxyPort: 1825034765,
                destination: 'jk62423jf67rl9dyw54rxg9ooivq07ojhn3xbyhbczyb8xoewttj2i1pfjrf0ndldofcd3iufuvkf18c7b6hv1pbxgqqioc4wxb0xq7p4tpjgjw996a12knmvgj3c6iy9vwnn07eoj21fuihgrhfidn52qwtd3vv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jtn8nkr8om9e89hrdhqglo3uvo8lo9hlrlmv2vhgd0n9ixu3ljzwtyswfv65kdol76qa81h5qv99352hyt2xhpihmfr57uguktswc688o8brsw4js6yc6e2wq9ir99hbxbbi9b2dmgkzpxc2ss8rl5zoc1i7c75v',
                responsibleUserAccountName: 'ypx4zzedtq3g7plan5cl',
                lastChangeUserAccount: 'pigvtzq8xh1quogjtazx',
                lastChangedAt: '2020-07-29 07:33:09',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '9ycl8ftlf13iotu60fhm3op3yejsuqouxu4p5n7e',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '1w0ixn3f7y3n24uqjabbd1wt1572mm47makmj31f3gn9omd0n4',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'wr1s0ag2lyamhegempdr',
                party: 'gu7nlqgr76n3uuxuau50n9h0os6cyf09bs9qoiyphcae9pecl79avb946w7c93931k5qj1howil38e13ql8n2mziw0x5vwzeh2pwfqdymlh5uarfkvxv3s9nyh3amye5919b1a5g0g6fpskguzo90fv2j0pwqeas',
                component: 'djj76fa7j0rcmq9kouby0615v8jwuap98wzs8tv9jg6aqmhqpah4njcsorppffdp66pvo1j6e29kduzn93fbf010nhhe7log6oielhp3el7v0681vakh8gu7d1tg5hp9j7s4pwloljxxpoo6qyjm5jt1578fvbcl',
                name: '3kuewgdhik39xsoo9vm175lj040cbb9lfycfq85jfi92wg7imu8fas4bei24s50ihuv3vtpf5kjfmiqask46sxdgtbe990m81cmh14ue7b9rv4325qbke6u19gdz3p08qz9vo4h4z59ripp153qeivv7q9gfod93',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'ssdhqjxs2igwrmsdhg8epke3hxiz4ufgtlw91wwej7b9ed7uhfvpmtg5sso6aav8j6e25oakg17ieajj589m0vj0cyfegk3vu6dhqsxuxqa3v0st08f7hm112switdbrl93apscw9rs02aroeg2vuu3qddffnw8s',
                flowComponent: '8jlq6crkied16cnalg2j3lopx0fhis8qxb2a4cgxbzelbrd9yqlkuero9fmdjtd3id0bba7w48vf0d20mactjjrltg0fsnphfgh6kd5wmnn6vowda54vowktfx576o6328eu2u8sd7j23ec3jbvsvehr3kxqqlqd',
                flowInterfaceName: '632xrw09k7ket1wxresl61bewgoogadov019zpg7t1ylk589ww0fohf3kna3yknfd25wacc9r4e14qoy39iwdax3g8xikfvd703go3s28upy20tdq90zp9p2jeda68czrsx3m3zdt6kjd1k62lmbc7tiq6ma6q8n',
                flowInterfaceNamespace: '3ysztkd0yxnmgjxzoa33ua4giyapcy2dadabsxtdlrg3ln2gfr4i30huth518xibtu1b7ydwltlcu58sl7m6l8stvq2qy3pf67h605jac9sntrzk4119trwiykmx9spjpb5ie9y6uxn12p4tgfmm5kh162ovra4k',
                version: 'zurxu1kctv6vtr41cw9y',
                adapterType: 'wunv37clfl9paw21bz83tvm6xb2tq12ixpmk4rf4q1hb4h4fu8zswvy0vbuo',
                direction: 'RECEIVER',
                transportProtocol: 'geotnpb6bnl4ddo30bw5y3rei3auqysgeuifllaifuvt6jvbr5chjxz4toep',
                messageProtocol: '3jgjd9t8xoyq0gqzw9yj6ysqw7fxta8m5mbzq6mwhoemngyuktflbn7yt563',
                adapterEngineName: 'apb0s6f99iwh4whxhf1vsdm562zjgpqw6et4jq1ppi1el48vwl75vw9ok1sxc2rn3hcwux8zzgyoi8flu9jzr66b084v51p1sb9nijicckpmd4g9pbocainekh1375f6gmz5eemqujs93i3dqhtppzsoycslto1a',
                url: '3qsn0j14sypeh32ebzii9z34ydw59nlvpf51c36bzmn38h14x31czv3od47j70793gsfvcrkqsg44dxh22uuyaz4ojp0oenwvzwlc1zizfhlqvswnaxdbaqzydf4pqozb717rczn6hj7eui6nbesf4ido6tc61l6qgfnpd9xurql59vhlwwug3lp97iww8jr49yf3x91ukii7n7fdrzkib5w2m94kb8hogj8r26y5r79iwkhdek1p7awxos2lc4fdyp96finrbwf1dd4da15ztbchqjrlvbeos6b3p5hbueoy46usnbcrsaydx133t6t',
                username: '039ktv7912h9mc9n2kzte2poeekcvgg4lq0qzmr3lr1uuahu3kx5aonx93a1',
                remoteHost: 'dqrrzjv89212m1wiz2z3uilq7hv95ntj815sds852kqzbelnj6kyghbvh8v2p6cs5kxo47pjtizcwmevet24azjhs5wx9obj880aq5i7mxi6siuo2jf0dfiryayih710nq6t44iyr6y8qqicnyd60k183imk42iv',
                remotePort: 2456872179,
                directory: 'q3ofp46cpbbwpbutvomin6jml6ecgk4f7wzo8npu12y2rbzzv3r3k7ilbtxdbfihlnquh36q79tyba7htxxk5ysn110rdba55cg6a5v16e1nm8kkknqi621u9pdv7j09rcorivrup8nacq0drj65njq2y1lkqntvsb4hil4kb9gykwktbcplzgivxjjx68xoeakpqjv9iq4g0oly3fj3f7syb54aupze75mxu96whp599azholi3wpqh8dxz0d70yzdqneynv7hg0ke0kbeikj6wpnukt8ir6h3s4ybq9djgiuny6i73m2334x96ag761ubp9i0s4inbpw4c62bzzivmmuaxk0tw41nggeh7ln2vskqznsfn9s2gaoa0ulkgea1l5bgh74d4xab41lhxzps2zre34u959adcjehclz10mvogxgvwkb2hctmbgnt243cj96ekr44p99lgan8egaszttqdxetuyui520ghbp7c7czgwr0dq5632j34lyf0z47yrdhoscs9a9ngwd6oomn9gjx9e83ptogmy84kzepbqimu5wjp4etwq91j4lwu065ys4g8dp72pvja3n9h2n9satjtz1995h33redjxmmoyy255zi5nqyd57sw1ugxz9d5jd8rmc5hp53axoov7709sd6o5tb2gul44gxpadk6si2u7cy9jzm95216a7jixa0o498dhr68gjjxxf576ij1jqu03fb0vwvohe4gab716m8seko2pr9vgbetfc3e8hxo1s9imcfgbkgsgi58ftchl9439lo42py4oj9tgfqd15whq30m5wfv3ioz5lre3c324zbi6tml0u5n6ay7ll9zda01yq4ozjvlhkwf0tsnqg2hyy94a2olbjtxfqsgfzw3ic6ewg2knobsw0kid3wawnmzjdd82ysmgarfdiung7akrhybuclfuw9ekp3vfzkgdqb64ct4rhwn7pa7fq48i4f2d6nv4pfhc956o7jyn1kgulk2kexuy0n5k1k0',
                fileSchema: 'pv6u575j6xpo8nbuqhs9nzzfs5r3vjdimsbflhadngkx30llu4dswr6sqwr59pghdbmf9yca1cg2kofznyzinsghb4flrx94vxy61rtr1t2s4ezzsow86efj7n5wwqat729k18rqxu1m8emlelm4j94tln44nfliaae2mb54c2guy2jxxim5gz5tg8bxqrdmjj1xst31kpjv3ntvrrpp81t49btloqu3p1qkwlb62byapn5c7z3jxh76d1v1l12s5jvygwdjndrlu3cs23q6ip71lpr8776jdn0bq1a4st0z7s17gebrrtoo0u57oi6lmrkly1az6zet6aom3b2yvri1632b4y618vb8p2aouw3sgw76px66vrxhn98gwyax03njzlnucp0z3gy1wxg18h3adc15b8xa4gufpm688xi317050m6hixid0huu3yf0du2p32n75km307s1y6swqbtziu7z7tnf618bz4tox3sfa6kd8uwwc089cjgcrmaxcudxokmc6f3g6ivll7b2wie3uq7qa24tpie9p25na4hod06jzncwt0rv05y2rort29blshvnwskyjl2ffw76bjvd1dklz2qcab1qn5e8t7fv4a6g2uooae3hxgmr1g5nk39vgqvk73ouixvhu43ky7tuay41slk9bkwa8whj9afqdgg2s725skyaw985t7wbg62l7q4zvndgqvx4l5ejlf2s9m5rod63q811yo6dh0wuvgo2oyqcwxg2bzziohlndq707mpthxbatd6cmaoeswvvcvm8bg6wqtjwpwbjncgoy6df5uh0e9pr5uwm6idpzub3gaodu3dty0fkna3gfiubmy2kfnzndx3zit7sog85lupsg3ztv2b418gs9cfv86hw439ceke3l7n1l95ykha4gau5wk5x4ih2zpbim4lh4jb4j9vixziqvlkkvkri62rmfk3orr5vt5n42gutt8qwjka3tqfyctrg8mxki6hxs4kmpmigfmn7h54d4lh7f',
                proxyHost: '4ar1wz2gyyavm555k7bp7bkq26fu7fvrev3kk3vdxnts7mb3xtohqy5ccr44',
                proxyPort: 7148612441,
                destination: 't8d3ytw0hvej512v5d7drvl30rczmzqfwppj7eiq4tq90z1t7t1oh6kgyyhverka05r1g2lrcemialeaum0cbugwmrniwl2s2w24f9gy4wsuh6feklsvc28x4zfp1csz6acbnbu4ushj2jj1p6016cztgcib1azq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ekrw38t6nmguw5lllxjehfuyqd092gjf9gu8bpof4xge3spe5ts0wzgwq6m20011z4vs1zf5uj6fatoyge2zfpjij87gizm46ee04itu1kny4f4an9aqys1k3ezc7rmk91int9mwrl1y79r29q1nzz8acgsv50h5',
                responsibleUserAccountName: '7hpgbwk3usptsvbh264t',
                lastChangeUserAccount: 'lmqmjgr2yxz1wqf295d3',
                lastChangedAt: '2020-07-28 23:51:32',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'kp5bt5dd3tfozf85vjo31ixsedwniepzjymc6cth',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '0qlkzvpo8olxjc4e0bdqd1o6jzdak6m28gu2d6rqa0hkjftd8q',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'zrh1it0to001l4x91n7t',
                party: 'y2l43m6bgpxhinqgkp26l8lt245tc6xcbdgrb8ukduipeulle05335hfzz4h4l9qrb9fuxu6vyn0jkmnog9b2ujrne4n6xn7hv9sj3tj4br6smmun40yv1n5ql0xxbk3ltbtrza47byp5jelc2lneyp2eqr3b9vv',
                component: '72z2cmhg0uy7dcotl1e7p6qwq8rksdayzb2epf9p21d2wwjj1dc2k7w975za8rybr5hi312dlmlukj1f6s2xsq3fasgvrxhil4b029jbr0exv13nnqrpgyjeaj4gwgr50gkm0ahjbd23phe30syd8306ufe0jux3',
                name: 'onhvmeg42t11l3spkwtv4gvcdcos3nqvnwb1vx9sz8lujvek3lwi9spo2aqya5rxd3t1gke4jv1tlm59dm11r8j08d98kgtcxj6ak9kqkk2koy2ozqgptb9b61qvsbtgntwu7j4bmool3zwzkb9sohnp6lobrnu9',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'yibpw37abu07uvs3l5rmqk348ol7x82pf0hgw5ulvi24rrj43rw157djipo6euqptzswablefpl2n30lot75frfkjgn80o8uleccfwd2b5hfwoh926nglamwnf6g0ojv9lu2bwsd15cmpes9tkpgqs2v9djyldbh',
                flowComponent: 'oss9yyx29urjm3teawu6qqke8z1cn1axg0de2cd47svohm56qsv1wa5cvyfkkhd90qvjs6v3l42fhvez30hipeum8r87swtukmsoobrnouhd0c3jjquf0ha5mkha4gpj2gf8fv1ponj0zwzfiz3ydd3cmen2arzc',
                flowInterfaceName: 'f5k5gvj1b5yywtcsvjcguv8xswxci6uhhc5zjaebjzb73geqlyb53b9zmci0ys57ui9mg14xghsi27b3xewzdfhwqsr40ju98ylaiiculeqs56q1zqy9c1jmn1sifx1916crxk5mljoitpq54rgrcuqieknib1dz',
                flowInterfaceNamespace: 'yx7ltf0wpcrg5ee7qxd2s75eyfeq0t6tlukgyqyau6cclzefeia4mvjpf815lcztsrbfvzxvuj3mysf5h42r2w9cdl2r5mlyobmn292ciw9nsymav6isozb376lhrrzwvyyijvghhs4plpbniuws45jsiy7fjizi',
                version: 'xqxkr22ukc08nq6xrjte',
                adapterType: 'l0s5uhmmh7nuq3ub5pnra3m49wmwk670rf2yoapgekdbukoup08csaqpj56d',
                direction: 'SENDER',
                transportProtocol: 'zkb0yioi35du6auesbvssltiurafd3ubglfl2itze9s5hn98oydhj10ucx4i',
                messageProtocol: 'tp3ez0idxxv23cgnz3ayx9mf84zsfp9sfqo8xhiisciwzgihwisc0uxnsnku',
                adapterEngineName: '3kwphkzc3jyq1tww3fwl6c44r2qkoqte0o35tzaw9lx2g5out45kh5ltsp6twkk279zmrcnq9ltwf4ugnfs7rsaz6s0h0gk0xw3xl6qipq3bnmy0fptcidlbcee7vqzyit2epn2f2297shur2e6spud08g3msuo0',
                url: '79v1d6ni4twxndryhwqcc566gv52hxwz6hx8yj250c3cyrc4v6mm3kc98qgqwx7pqiislyrmku0utc2bu97254cv6fhvt9rxeafchtecvurgjvnelozan351zjw6b7ej0725od0h0vb4zgkzm6gbqckjvszzrijijc2u79zl7gvautxn8qxpqnistpxdlh1kuemduy3xqw1cl8uutaqqtaa0nlnopz37u10yemdiy3de3t1g28fcv4ruu7t627dv7yabshlbheuc46qx7nfowv249yvsbtfr2azj2azk09hruz096nicuhk7hjxper09',
                username: 'cu13gbbqxsezmtj23pdvy0eq6yszeyl3yshkwi5a273adz50j88d9a6b2c7r',
                remoteHost: 'b3eu00ueuwwq75l7ik8lid14t2alewvjd4od5xhldmuckyaj8443874yomravcmd23p9rxw3x2detijrr6bsi4s0qpvdrj0ts37ho39ogjlpw9szchnwi0v3lp9u22ug2xc8fsn2o6rqv3yypwdb9dl78se5r6iz',
                remotePort: 7566761854,
                directory: 'to18vucux88nlwguxrktlhk9cjqk6c0uvlbmdmnhqavaen1kq1ihag0ot891lz4o9ukjvh09uituz44x2li6jgvvc0c61f81a5uzessoo51sk85y4mp2fujsrua1179yg9h4nb3uqx9zwh7ilwgen6j345ewvvs6wsw1vw4fqhffwbhbfgsjxr7i6p1m0gzygn0d7x8jkmlea1v2dha6plefhx6avt6fhiymtcyn7m2bebp411wu61sc6yuzz8vutwmai1blxzdf761m9vwulc9vvddv6dh0n9i72igrbqp957ptj32hgv3znz6zan6jbm9xvikigoqlxes1th9v8pfi9w07soxeskmd6klu17l7jowursuk2ubkkvklkxl3z6ywy001pxtjyia4xuqdgodmu2i7kfxvceix6ubgyhdv2bwmunddtt08440y56prqyxa0wbf0mewj4mhodg9mug7d7bc8t2eelxzfoamwvhm945p1t5hj3qjp92u3twksa95hkns64sgt7ohi6jw0mv8hudmucwx357uxyict8zkhy4gza0udyrh19u3457m30wp37lai9jw67djy16pxgm11fpszh8hk4htfar7c4jvdr0q0y2b7i7o12eimjw3mj73xah8guuipryzzabc3j4px6uxo75crqm62mk5m5xi0f9ib8xxva9vo0zcl4088qxzw6y6a3zm5fnz1hjuzb0tegg2k1lxbk3zrqe9b3rd48vus8lvm5iz8tjboci2swtpiw19153intcfy0pyr0zvi1x292yok1avmf37yd86a5vrhl1wt00vgaxcvjlmdbwtjf5wiqfulgc4j45ck2lqecg49ol1xezl6vg86149vjfthcyie7mpil06a2s9kyo4hp64npnxg2e1d87t8557i2975s3xsmerkhnctcq2417cedjjdis9njnc1fkmobb3rz8f696cq3oakm7sq40j06rvks7y7j2bcazdtnbqfeh8duewkkb48idtqg1y',
                fileSchema: 'qqcbgujdzm963exmt8acbxlagyp4op5mld0f8bybs5vumw77fpszb6vm1hxfq2vpznw9z9m9sb976a44hk2plul6q0z32m3qmun5u9d835opb9sovlwl3cj841lvmachtafy11w1m81w54va2ynw2d8dckmtneicqm8xa6uaejghfdggwlvh5dhdcp32gl43h6sl05ia3gotht91pbvexsnxjfupvusoa7hfvtndrjdtah8nbdcnwy389wex25ntfhtphqy41cn46narra20hwlcpcnvhvqirxrx6anjzp8hub0zeinkarmz73oni5mvgfq18z6ey7nrear1ekao633q73eicbcdqlv110q3c5k4ge5yjegmwnep1rtm1d0vg00zjhozmi5kpksk5aj1h1ww9pw5h7rclgjhu048xrxst6rsgsvfjv2hosst9t34pwszcmlrw0j5c87th2n5z0fnx00xzg2eu209iippzpozd2vbx2k6wp1nzqzdaxrpbfr8ogegltwp7mhuorkc1bf7qiaxqxpn8pt225q3luz2z0rkqz2fv3h24aum69fc6s1kgkrl3uof04bx42i2203l0bngmfy8vdo61krrxp5iy6ie3vyhnah3v17djwzekqbjw8oor426ux5xd350udp5qwjvco9k2gl41wd5q27umxp42l2frp8th5tlyx6fnlvcf64uf9uk19eaj9w3eq1q1f9ibhamveujpqe4yyc3b2n41ncandkozshiap953t99d3cfxnewojxzbn2zn7rwzh4rncux6trzydjgned39i477nmvixuimsk2ks4ddp66lmqyn1xg16vmv0aqe6p1uy0w80p9qfc7hu6o0flq0h45r26kb8wyj7w7zhsskzd1ypz7lsuyi7tzpise7eea1funorbkhtwjg1ho4py5r1gqqe77cd1tlg2a5zeucopl5e2s5zi2koic7n7bgyfmvcgmi0smlb0yskszqs23tgazzd4yvaasho6d52uj',
                proxyHost: 'j19sakwfp7arfa08z2733bqai17sc9lsuw1lvc3awhlb13lgr6a4us0j5njwu',
                proxyPort: 7311642517,
                destination: 'nmqj4betk0sgzk8cbkkukiu0ey9q4ta82s2qquuaudu6ua67f6fgjk2nddqanmny040ew4x0343w04bb8skz6pe1oddq7tievafbq6b22df5bgk718pqji6wsp8iq0rla9wzr9dipal4xq60zcq4bxa79w602azi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9b34xllsxp3so9vosjs9egnl1n4ossmrzsvavedw5nkp65u2kcs5mh72i3wdkksso8ncc9xk51pjbd0ekfua8byc3v03ye7ysb2dfvjwh8i0l78fczc0zjijuvdop76jani7waf6644e3itb9mnny32jgxgqagze',
                responsibleUserAccountName: '0pl1blo709wjutn1ak6y',
                lastChangeUserAccount: '96ary0b0c96y18m18lx5',
                lastChangedAt: '2020-07-29 06:47:10',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'csaoqdaeio9mk51ysffnnx3wfcj813ogl9j7vg0p',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'kkk7c1esx5989r5j5efl281y5nckvqvfv78o56etjh00hi8mof',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '5ut37xmrzk5gwstk6992',
                party: 'flyx0kbwru000r9i46d4dkfuztdhv074qz1valqcnod4uud89z7oh51ygn1nnwjcxhfy8m40240066uyft4kl2f72sk41cnbchegppcs0mgh5j26iavlhos9ktko03qrosb4c8vbw8yejvz1ohr5pvnutiyy337n',
                component: 'tw2hw5sgbcwh7t55cagg34lurwb5bx3rq5cfsldjb1f2yaubo7hi59dv2wvnocrh6wc0dfgt9l7aykstcjik5uc6pzdi9r4bvfnielb8lt3yzcpp9m5x6spgfcufd64ssjgdkqejcr0cbfue7xlwcpjm76o62wou',
                name: 'v5kvthl2pvgpqa83y4ng570u07ncj8avm3ykiftp678f844i29t4wyq9aetvydd7vdv0z37r89v0fpxbn5ubxbfj2k7hqlvyisd1gjui96xydzwdks3nyl37qor79xw35gqqs8eywr0c86uq1vpnhygeo0m688o8',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'qqa6ij5826lse369eehhq782vevv8dc4atmm61v4x19m4nxmqgq57mtg1b8nts689kys5hwv9pch1c6m7e5wl4g65oi2o24jkad14lry6jw2fppsru1wsn8oyfv8c37q4828m1r4v6rfpaegd2fusjhlw35pofe5',
                flowComponent: '8pn0d9zkdscyn8cjhoqhjvh6zblltthyafxo909xj6dhoekppkktwyzwc93ng13m0mrvgahrn2tjtg30famnat416zcb0o6mk0co402pa4ujz4dzxbasmf2qk8kkegp3o7tve7cgfoxlaexk1tv6yvn9l8e3joxm',
                flowInterfaceName: 'eb5uzvdrttrq6awqtg86zccs5hayd1rf805r4agk73glwkuh23bfxxyax28catmaoao1rsmquvphzw7yc16mqtz9vdmr2mk1nqkb6503g2hqo9bn7hikf0vj2jr22poxocb2a0tgal8e6hsmc2odau088dglrztq',
                flowInterfaceNamespace: 'tznbyeq704c5hbtokh7tkzs5re5910bjludaqb75uz2b1ym42vba2705xocphgqzmcxsgrka8huwliktimusa4echcjj3s0tf9u6trhsxqx4v4pqosw7rwcfp0fg0ojhx0tptasu3jjz1e6sj4nevirk8wsle2kr',
                version: 'gi4fzcnymmbwf5zdd6k6',
                adapterType: 'es8nggu1obiowov4cngqy3daij7mhn49g0xryp3xurd922vgcfjbyu07pz5e',
                direction: 'SENDER',
                transportProtocol: '6raejpmrfg8me15jodpnyuhou6p4ub6zvgk4xdme1synr3a4psn1150etutq',
                messageProtocol: 'dnnbqp2dqffz6lhwx4klolfd3799ari2637tr4tmsr1ykdzqi08sqbl6vc6p',
                adapterEngineName: '5uwfbz73k4a6mhnk7po8q7dzcl5oe1a0fxh2f7pwz23sbykqdpmfd0xufs8xvhkawjvjcm7369c40pv7l4qj8tje9fqmc8dphgg0eq2skixwhh1th7r6xpw7jgcdnikydasbgk5yolztqmyrwr3dmshlyo9jbp5z',
                url: '0djcpx2bpfinxidb0dn7h3tkvuge9288v0ob8ff2r1fqxwz1pcofs3wxowkazsj7u0nqvnw4hc6diwct7j3ylns8nzdizrccab0tq7lcgl4rr45gi3wu0qs56qtqum3d3yvjf581xm33f9jic5kobuc4abq5qu4lzo10b0acaj7phfzyydru5eiabkh2f0js282zfhf63qp80jahzhtwzix6op1m8q9t8phld7ymf92plnubp8a6qk0t1bwcbehng7nsernq0ujpygp7hr8xs7lc9sks7svq3dz42kluunq6rg9rtssbrwlerb682nnj',
                username: 'nu98176tf84m3rrpatilij9pdpbkwtl24e52sd0cni0k2nyo9eoc0xqfxidx',
                remoteHost: 'dlb0th0r273i1awo1u3alfidm0q48l4t0l5lw4hpdlunyp5mtsx1uj57cvaoo0oi58o809f0oux7qpnw2t5gn2d04v67oo2g1zeciouvz5pqib4d3ju715qx86pppkze88aortr3tasumnwz06yhqmz42uwerqlh',
                remotePort: 7627189444,
                directory: 'hec8dmci1zh6jdikogr2kb9obbexbpcpbts0kjegz8jryy4ydt0nccm3dfhjry9mx7pjvk72vqb0f4emopjqmuv4soe6tnnauedb5iyyo2nyqehvwb94jsuedh86v8tx0qyymk93ta186vdwc7ze1kypztuauwo1ljyu9io9qyyq2f0xduw34hh7vddgccsjh1vepa3z06qo2ozmru7ds69ui0w815ygulzoqhz6h5rtpaeq75wimm7nicyvrs87jcvdlwesfutev7y28sln7awzuxvviuycm3nzv1dyvnkq1phphbsv7k6oe98csh76ggdk0vpb9k9bwujnglwm205rywgy1xk4hhhsspwab5kqnwkp369c4tcgbmvx6j4r2hwr4m6afgtfnrvrqg3eve1hqw201tsy6g8bzch0rn5orbp7hcb203fyf0o12dzk4p0rfa7hcc3drceixxiqx28nx3dhf3yoooyhvje8fn1y4c5s1q97kqrc2jithfej5usl8qbqz1tmmm2tg3gimdi9dx9kov6subsgz7nc8lbawazin71qasthcnhk432dnsg1qtp68i1il26fknwy8pjsqojt3kuk63il55xv3y85sx3ri9f4tqavi23lsj3uxjt4vzdiy3rir2ifb9pp2bp3q9ie627r6gfv8s9n19gxve9x8raye2ofjggwhlh9o877wpqogkyqr1i2xjvbscvjb0r9o3ukbkskqkvu1artfpykl52vofjzgz85242u1t0jqctpp8acxrbuhxgctvd2mq4iz54xcx101jtumdmxhq7se5289yv0fiyev8qf4tbbgy8o62us46o3q7g6vk7z916a2o05erl3um1n6piva0cdb4szqdpr7864ff3n21i0qtp8kqnmra71rffy8tz1r6dg590d8gp1qsmxaonrjl2yk0dfgtz7asdislnd8ht9mcoj4c250agt4n9idvhilxeccud99j3ibl25xmo3x6ape6i58pn69jslm1tx',
                fileSchema: '85ysr7apfcqijppuqbecct5pje4n2dmc38o52ldagwd92fm6z7m8re46kaa2gdyfud6ru0tpzxgzi3t838w5lqfabbfwwz7podg5abrj65gw7bn65j3z3bowwb53kkp2avzspxt2cqk0hahhf7jrs4q7ezpejvgcxtbd9q9zpb9okxnpnzk0jzdv2sj9hhf5fmbvoq4aos0w1gwdxp4roy6fqbmarht5tzz4bd0imgwpt3bmw3l8jpesmm1fdrwkjpoomlxu3qsygkdca9lnmev1bugum3dz9cwiror7kziutt3v5mtfwkpiag665b67pjs59fmt0n4yix72ybh0o7xrl9x04wrk056ldj887xuku1etdiw0m5zpis3f4j6s16vu86oqrfej7reumez2iz8k7edd2wo3jeqo5it11hwhzodgpvcqfgn382lkfdqhbz9qnilo5ds4majrjs1aghvvi9ae62jj3fn19muj157fx43oivj1or70w3182qzlty2zza0ku4pzezvmtkfxwe6ji88jafzj76bhdmu9b0dfddspx7k8350o7hjaasp57x1yzbjkf7nn4d32g8k6vatm1ggz8j9v1cfhynmsol66mk5jsha312y806i83p5p3qvdv7h28kqjesg972dgt4mvwaylroj2or3kno0w3m75uncm3yimb2jzqe1oot5xnf97wox2it7tox0527gtvd5lngrwwk5hcd5f6f4esjbplc7yqomdlzj1c37po1h2u7blikggc5eqi45zcqxtlisja66oplo2qcdgn34p2ifykb7chfcf90v9d3orjwcxuqv1z3qc6neoihq7057rw8dwp6tuxud2c6kfgoip7juqv8zu4o06uq540b9c01ges28cv8lb8nbv2nyeo6dyqawlxahkn6ofyqm4q4tvr7m6i8bsmm7e0ww9oxydmw06p20prb20bu2ck4peajbsqtdfcs5f68ap9g8qk6ctr2gdvjhrnxpjfnf4v6tonmpg',
                proxyHost: 'yg1za0km0zkqdlnua571zeeonlwh2o0c6yesrs7fxqdhonw5835wc2mkkobp',
                proxyPort: 80259853232,
                destination: '75lsmmud4zx3g2nxtl3k85ic0l0uh4u6sas092x0rxskim43wuy9forzop6geanayv5p4oqjq7rzctqhi4oto1tufmupdlr8o84ndqm57os4o2u6f3vvqauijsdvsenvhvke3gpuohp3tj4onpzhxj2wy6mgudxf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rcifede3jtphvndm77ssxp6v2zvm1iqfn2vq1r4j07htk1fbkrc2kuva2g3t0xulzolkg30w5bx6hrn6xpo7f91ndzh0z0o7i0mddesx3n1yu55uwkt1ugpkobe63osyggz8tvwheokv7gr763itfdb7xcvqwoxm',
                responsibleUserAccountName: 'ezapd3bvirai5nqjncyh',
                lastChangeUserAccount: '8i2i15bx2v2bbonrkm2x',
                lastChangedAt: '2020-07-28 20:51:02',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '8dy7o7danv9o3stq1sc63rdm16xdgkh21a6vup0u',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '6rkqy1q2qeeischl29f4wpkmbn9anfcqv24dtwja5i3ze5nmcs',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'qrbk16eniizek14ww1ih',
                party: 'duagb4r0ylkvyc6adhvoz9pvvmka8miivvrfgutt9g6wx20md3wttq5qaoe9mwim9buh6i7r0i5g16n09sgd768zlfp6xjbd89h5k4chmaw5qelhz29my3vl0tnl3vqsc8gczwhho5v4b0bpnfv0h96r8imddws6',
                component: 'dc9sx7kuw2rr3wmezf23vilopaj7npnck2s752qrezxgr8yxxaav0urxjqk3i6hngvty8xi4ewqi2yi72okf44a7qcivwjoxd5xfc6wtg1z2rf5z0zgcgu248le3flb59zvwtjwlzy4fl8begchcjv2qdbplajt3',
                name: 'jallgv4p3civ7eu8p2mtika8394b4yfsijhw8ssfi80naqmjc4dqo76d9nn3ye7mnmsbemufcql9250myecevqjbcudefeq8pkro9occrgs6iag4es4mx8cbic7s386n5s1lsmrx9o1771dy5q6aat4w6qn5a6mw',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'tq2pwrk5k96h6p7kmwzpa0nyd8lude711f4y2i71q48bcjqbqqvknnl0zsauj6u8ppjrhveo3pu09gyr3fny4viyvb8cwljfi2dq0x61srcksinukn6j14e2pfws1o0aafpqh4bj6t6vbafcodsa2qxnou2afpfc',
                flowComponent: '6shszygxa5jq7gafbx76fqsx023nvtvjkno60t5ir5wrbpr7k6ux7as6acb7oqkqsa5eclh9gqlbw7fjtvify0mb0mcyw2lpo9i4cnfu0ow820exlp3eygdfe461zndwvsej6mhwlrzcta511u0hml2qpx3fizt9',
                flowInterfaceName: 'mvdkmu9k8569jh8e96rexr3xnhklcivdzqtxkj3z0zu0ho28geni612ft26lyl8uy1gz77cxr37ws3lng8mub19ujhojmblpw7bbywv4p63feb6npb0z44f5xhq5g8qbuztb1njz5c19383vvfcslp0yl75ygv5o',
                flowInterfaceNamespace: 'xzkdtgoixrveambphjzfhpqn4rijnjaaaqtj89ayw35h09x8vk01ii632zq6ipr3kugqt0ikgmri5gwt4qat4ww9k1ldzux36s4sqnf4epe1ay5hoyzhz8zqb7f1mrrkwuuenec1iosy5ads2554geofbxkblepl',
                version: '1rdobdl0wcmwarkft3b5',
                adapterType: 'egr9ydknj2wnernowqifk20nolddgqhuk1krh64wyfp1e4559vdpitx8i0x6',
                direction: 'RECEIVER',
                transportProtocol: 'l7g17ei2j9res2bq3swfu1mil5n3ov8at4p2gzuky7ff2ryzty2hkuwtvss7',
                messageProtocol: 'zti5yvadn46240i2qi3sn4wqs0kefwxqz6jjfqho9cjd5dnarcpo0qfyqxch',
                adapterEngineName: 'fg6w82bhmlhoxbz4dx32arn2cbhxt7b896zrr26nh1pha24be8gs9m5z0em4twfdqmdcnw2reppzibbjs77u8dk3gjve0du41xn62rsqwys7sbxhjc35180849986p14rebwhx4ah7ot1nd5plw0tlxgvufrwsz7',
                url: 'j55cppuddeb64ooxn2x3s1q93t3mlsiovph8uozugwqguw9h7e661fw8bhtzf3d9cbznke70uie5b2xd7xta0xposcrwa0bd13j149n6454n5u0y2616pr8wr7v6tfbf3vj63d9gifd0cirm0da64y8d7fz8ne8pkbyu56j3byh2ptsfvrwnmrzdgi9x4pl4rfk57ff8cvklkobosdyjnlht342z3bd1j8nlu5qzcnr6i1gsfcupr2vtj7a04pr7fhalfrofivv3we1x1ozpjjga3dfy137o8jpa86p1wx2mmqd2szn38ej316tl3u33',
                username: 'msswory3blh0nndj84gszeqsucncljyj71uew1vl7t1vwwois0wggsu44e9l',
                remoteHost: 'zerru0wy7qfd1dy29zwe956gz1v53vb09p9zaob9et2xs01uw5xu3vfuyfhsmumkfib213qj2e1ypatu2isu1tuqtexi1j954a8oqr79i818rjozfrimk9vdc5bt3ylwbb71c9sr4z6ytai0bk1kuepu5cyed1x2',
                remotePort: 9869362868,
                directory: 'inrz6tgmt5h7fxppraodc3quv4q4pwqgk017nu5at5xi7mvubogj20m8nteajckj4in0xnxi7twe1zeudrnpod0frb307c8ejb8je2hdvfuia68jfax2rfozje3qsx5t6kypwvb17xikptryawvtrsfkit3iq004aqjjvetylm9u0df2ddwyd4r7zqyetbf7kac0hfqb29c1r636sebxepku8q6d5ek6uktk1c1738thzz6gn359amq5rzhqvd0ly944uw0rh4cby9w8la13n11edt1in4epz7824m76i8fdge3bimeaw28y5e6k0iztf52iwsi1ko9lack2ze6fwbw05lo6fquzrop74lwikuak9xxph1ggjz79lrlda3m2ugftnzzptk9qht73eh0orbfn1kujsn7q1529nzgx52wrljnuk5w45stzlrw5fafm99kg3widdcc4umagn1mifvjr2cm9jw3616bwniav0cn75a8my3qcm7hincu4hqfc1rt4o9o6c691yxs945l768o58akt15uf4zrhpiof3cgvulavs8vss4g2cdqpkh1ebuarljhdm7kp9ih8q2iyez1sp8kcmd89v2mwjj12nyra3av3y6xufrj0j1jj1xhwtvo41bkry1w8yvw0lcd8cjlpburce1r6f2btyy24ekwszrtb9oez3ricmdklqtktqnt7aehg794b8bmklvflrl3gsxq9a0h1ku48q1p8dxqczd11jlpclzfh62y974cz875vzimgmey9ind7hxngwwomg3ptwe9iejxfza5c4s6m8m5kkx4u6vmnbw4plgl2xd9sitcteymzmrs1b2ld7hxier6vxy5ciiwskq7q8a405u9aacqgi3imt6e0wnaf5m10801dvc7zje6ly9sm1lghkfgci71573tvh5zk20j2uniwhmq4y8vu2j2agq4okechivxh0onvys48zhbf2y5xmckpvbdvcw0tbv8ov6dkvrwlzz29y9p1b817i42r',
                fileSchema: 'zl47g08caa9s0n6wjv5mc8w2f79h3puwfzi9zxvtq3e9nhd6vzhm8kz6oudky4jq8gjtpsmjx6jhrbdnk2kgltc10xw28shegt9yejx4mygn6i0pc7wlm39hkjzfe6j8nbjea51tflulmdw9nxg3i2ko1bp8t4tsi2a6cpr6bjyu0fk7ovyr1wfx94m9wz4zxd5l0m7g4wsesng5i3ey4h3uihr4wmfsp19brqsgcsrnt5qaj291yhn9m9ffx8mndzdt616v06wf0p83bf15jguryx9yc4tirmjb7auoqtf3xkaenncp7yet01stzx1959f5uifcbe0yf1yp0vwkppqwfojaum1k71sb0gscds4zbnd4hnjwq5ijf2moipv3a5xtg689jkpk4lbv6s3pep9kj1i28v6remcnda349017cwje8g6ou6rof4q3ji9x5l7t8q51aw1mbo085ka1b0ifg4o84flp54hq05unruqvsbcw6eoxt0w4yl4nhfvgxmeny7xz5nhe0asa86w8p5q5qvr22detud2pe5meuavmhy8oa3vml5enratrh8ko4sw686bmyji6w6xolyv5w0jwzdz6kd2erv0v48vwpmmzgp5amtqpyrw9y8ot1y9tzw478xkfv3clkgw2gw0wz9pa7djow8a81e9yoe3l73h2ixwtxh7f04bzvki0yrgayp0lezpft6o2uj5dajmefywt1638un7yzktn89hrphdd39oz5h3pssud1m61rlf6xq12u0bjdgnai48e5pe9utsembudg7ns8s6il55a8jw09ewc5d4qersufwcl7u6k6dnlavbuqxipk8wvkh5nip641oc57hfhgldhqrd7yftbw5z1pnksdjpqdeukk07aaulvcszwvzjs2ufdtkrgq4msdk79ub5w24xw3e5bjx2e69861g00r3yf5ps0hlb6mlco83z8ozfcxlx7wc6n4tjdl9adldlxip4e6vk0tq4mewrevyuu1bec97ypb7ze',
                proxyHost: '8pwmjv70ad5k0pmrmkiex65if3p3c059pckht5rjy8kd56yj2atwlsyt4crh',
                proxyPort: 2393160313,
                destination: '796p4h6fklux1a0443cqc8i68hvill02ocifw8lo5dih10vvdq6zfljxlk7xmy4zm378ma3uutequbwrebezkxh8070jprt9hv1rmfzv6wdlixkvnxwsq6udbdmcqnjup5ynnp3rjlw6dbgktb9k49hjrcis5g4e1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jt1q15cpji1eepon1slob1f9xqjptc82tsjd0a7yock81koxmhhj08s1b5e18b4p7zbt1e404eyfghonhi4fwbw04ot21t6j7ve9yufeu2m0pwt8emjfanyronhssn7ayix7248ue9se957lpiuwhmn74yeqqdkw',
                responsibleUserAccountName: 'e7ttr09lpet50qo9hvem',
                lastChangeUserAccount: '1nvpjbidcubmri9iiz4f',
                lastChangedAt: '2020-07-29 01:10:06',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'pp06xk7fwvvucu44akwmmose53is5xzkmk0gjstx',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'bb96ynaghcw4hzedhd7cincorw1cglqv25n54jarmlqeg1ami9',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'zgqw7zylj5d63n29zzka',
                party: '4541cs52356lx6vxnmk7xjpr2n27igaasydqfkjgbtojjiiezn9zdjf2jg396p3alj5rl7m6oacrco3byzbdm3qdjqbxr2vwwhgd52hrb3rhxv64q0k9iwjatzfrfxbvdfusiw0ija548pw3io9qvjukf73dlrol',
                component: 'al4bpbehtbt04p96z7wm99ctd5u39b8rc4mq08xfz3z82m8eyd3xq5teixmzygug474ahyhh4sp5lajyxzp51iiudm9fat26d04qr60n7584vwms4g3uioo4kn1n9lkhaihj17beer783nkeuz0jtyorv3wmwire',
                name: 'okm08iztc14qpzr8leieobmzgtdwrzeclg76fhmzmie5xoup7fqr5m14hmbc4scvikx4fzjc5ifnpl392j2k6egbs5ge3h6z61p69xheid6arao5dg3llvhqk60cyetnhz2j8wxn6h2xvwasfm5ln0w90pchohn5',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '7qd6apbxhrq8jbxave6q8gl4xx7algxv7fyz6fjmb5412bruvtf6l549caz8ji8p74zjxd0tqmjn5d95j3g7v2l89ln8wveu41jqgt4q4ko5cys5ieg0du0bmimpkjj80im2w4sfrz2ddn2zc2i3v3okxivs6hga',
                flowComponent: 'fc2jz17dhizblnehpocug5hfu5torj9wq22fcodiao8ex8ylanml791auqi9v0e3j0mz7rq4hvtuxmow3atbsmdeuzebvyw1ewq2xs23a2159odxgysheiw15l59mjfxdbalij631srrx136ljduytn75dksh80u',
                flowInterfaceName: '4os99gqng9vtaippaevordmfhashdmentu3k6ae8hxyzpgazl5nvmquqf13sj6yiebp7y6h2fw1pfqpaza9w5pz1o033mq5frxzr6uvow8gh9ojlp9htw0508ynmqcw3x0zrmldq8p6qwjruleie198a9zmmcc4r',
                flowInterfaceNamespace: 'v55cdf9mmevf0fr2z8yiaro4uhcvsl0iswyq42r4lbliz3ohaejhf38hzwengziksg25dok9f0x9r4fgw875shmm3pcqg47qsx2nxif9deh34sgxkhqcilq4iws1g5kiivqrp4a94gneiltenoqxirfxfbnbiphr',
                version: 'urfh83k0mde2wzv3tert',
                adapterType: 'mb4e2j2v4uglvrd04c9h2jf31yxko6kmxf3fa19vzy73i456h3nuo1x79zyj',
                direction: 'SENDER',
                transportProtocol: 'ge2upq93noriffkhfw91jif1w8txe7e09f3xdtrog6qpqkrfn92tdk992twu',
                messageProtocol: 'uzjlu80bhl1hxyn2p9d77a18jsvoqv93t4p66xo6h5dos5du4myf392it08m',
                adapterEngineName: 'kn0ollri3wkzx0d7d03zbx48enpv17sc8qu6a8e2j0latwyud8j7wrm2cv3j9rcql184noev2u4291mg8dtfrx5n8uwaa31dov6t9dj4roxnlwdqfmfquik9q0ysbobg4890n0cejs4pbynbuziurwyjrtsg7peu',
                url: 'cgluei3j5xl5dtsgsmbimnscnxnbekfb8b8caaus1ddprlmwriyjf843xsy1sblmx69wjznguafr1b77ct4iyhe8qex078ec9ec2syx994hn4eui9acwn2fgt7td5j4yxbd8m1nxtiljxu2ksas1sdllzderq6a5tnuqb27fyn6bx2zsb845y44jj6nolfg25h2dpj6j3siqt9szvrir2p0sixaolifd523x9pj920r2vsu7wrrz98gihjsufwt277x5mynya8hjmqwncdqvoi130n6vfwi77o342q73fiklydk93a1imluszq6miw1w',
                username: '1anm1ud0nec3t1cpcvzct03znmuj1rw3ik7i5rh1m0ylbzio29h0blcvjnk8',
                remoteHost: 'efemm6q4snbfcu0xuvc410cvxtm31yhbn0qaq146y2wsvqwxtz3ctr61crem8rp5c7dja04i4kyv3yih51y2f7ikt8ufos4wfi36oxvafa2yqbdo7cvhp94squpzi63xpatvd82cu0im8gvt0w5eqnb3fm3as73y',
                remotePort: 5800484558,
                directory: 'janhpw89e86qzv51m1l592dgsgyi41hedm8uujcgaw2tj5nwc46gitma1264ag8g09y73jyo2bow667i13a64auqzpxwx0bcwp9wyia6a792wjgf1dtdnsl199c0w15am8r06zjg5uhbtwwv9qtz9v9rwihpsbbllz4g3a4y1l2qyngl555oiql9txbw3yrbpm5ep684n7jzdodk2umqc5k6suljapbb08k3ajn1m1wds2h1z7svy8qw9wqtjp0n0dnmwnj14gxt45atyvvsisdl35qxkp9p6d1igz6ikwvjkhy0ewtk62hhxw74vxsi35buhw842wy22zpwjytflwxhnbvs7hvwyddeadc6r4xtk3z5mzjxdd0k9jxc5iis6qdzz88x90g7hvlfyrui8igr1x81m8tmtogaplqlop12jomjzqqzliul0oy1sedrtwg1e5cwifu4fcoqmfkbncynz9g4jhy42kkfjdehu7ftm0fnmt4ca1fsgno8hs7asqhrhnx18bfbhuk6i74vxqork7zty3yplwpq3mdq3irpdyhy8jygh1jh2i8duq5rna4kdmq69eabrhmjvi84zt6aeg0qia8olo7px6zvef08i74u63zhybzjof9l29ufxv1ywmadkcyubnx60e5mlt8bj8xtese75u0mzo3k0qgszvwlojrnjk391j6qsesxpkvs43u3475qig3qdj42iraz3vc6b8lo3nv8xtfpvgz6072d0yxqhlr52tekkicdlmbvfdpqli1u22b2fdn3a0krz1cljtry5fsdwlk0fe34lb4ivjw5vqoksknpd1z7ux2rg7hc7fk7vvxkdxyo4he2c732bu1upw60ppsrxrm1wksuvm0myuw2z9dep2p86bqse729pnizn3hxmuqd8nly48upj19m8rc3mbmkpagyew6q8b06kjlww09a4hxu4jv071qk1dv024q4zzjniy2d11cmr9wpnke0lgfh6evh08jktf3wsrdvc75hzgir',
                fileSchema: 'os2qnuqzqf2n36qb5n96fm4p2uvudj5z7zrdd5kxbxc8e8ri9ljpdo914r3jt9ghnv0exk4l9sjn617vm0tzxea05ytb6hcugwpwi25pgdgpksetg0mv71259ohimav3swtq9451jq6pbyhpokqkfvjbm0ig1d30k0zbchw0ok0dej7yc7v3p368bwy0kvhopjj3qieczu6juhuhn7lf6fhehclnlai4ppx7jujhithhtpbzb6am1rvw9y1h1kdk7d0oxumn8la0vx28yfkzbgag1x8j7n3rb7c2bbgns6itaa940ckl419wryj6yuuxb24izgu1ggidfbsjrzmyxzy560rze3a2ql2opm9sloidy5yew3mkz2ipxshupd4v3ytzx86rqh2xxosl6c008gvzxagl2uvoamqh385zisprpvwa33d7e1k7z1rqs1e92w8gwy6qi044m9iy3ode0lggl36mp73hp7chpxsryw3wo96pemrji6gzt4h9n1xopzjpv96ebdwejcb5oaoydqqm9sofid865a0afs43ufdfyi96i2kl3zdju7kya047y061v81h5weojuqx2duhjahmcj3huync1ahh2631qofy0wu5djyoeqtawun2tioccuew1vawmvydr6q01dr619c948u8gml14rne7a9fdrkynere60ts46wn6mc4cv1ejte310ptnjxfqwa7c1xo57btutql7rpvjpq6nv9hizq2i2vyoos6fvgzhbgz2015twvjr4ej9mmdis2ty1sxaidolqj67hsr8dfmgocvmzmikyv28ftijv6mqq2ml76lqjltcpy7mwnteqajq6mlir84sk5pcjdky7s40zjhwakkx9ed2z5mukrcntuzozmx336ehe4fyqfmatgio4uuu3bevvisw88wg0lz5lz6bj3bcfhyzjr317zd6z2uurn1ot19527kzb015y0uj51ddtjsyq2s14qmizkgrz7jc2n5y9lvv82oz1trk3i4of8t',
                proxyHost: 'u7q9uv4iyik48s370c5jt3g7zyeaj9nodim1fe3nkfpyiyo5hll1iof4knr4',
                proxyPort: 6903585239,
                destination: '0nlxienlnxmim9b1w75bqh34k57k1zpld5d50atvarvxmi4u8ih72t44ql7y8kq5dtidg0uvvltwf3pzm6milocq6wlviwyyg6bwjdk033oaq9rl41q9a1tvayaezfbbox0xiujefxx42f3yftz6sdczmzw331zb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 't9iiryjbm2wzkanjy4ljw8hop2ygn97usbj9rc6frktt9og01yrwbjejyovqtpvnopppzrcv8zz6uos27qbwuu5jnvvrgeofddzfssr2famki2itjhjttxfc80ng31ytc2n7wgygkejb9zn4p0gkgb9j47dfwwp71',
                responsibleUserAccountName: 'rlolh2c12slkplbb5o4o',
                lastChangeUserAccount: 'a0kztj81x5hf8fsv0xsk',
                lastChangedAt: '2020-07-29 02:43:29',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '5qi7ow4vcr1y6u41ypipukv6j6fgffeqe53z8sjm',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '7g99g7rjbybmnuhk5yhtcjrhxo2hb0zdackg11k82dund09i5m',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'hbyhs1fhnacqeonrlyeo',
                party: 'py4vfoapa3204il0q1apevuhnds72l3y53ybb9aga55x7d26qh51c21gjpqvcc4vkkhb0z769y00hb455pvbsgcls8xn68j3zs353dpccw32gy6zui3sj8k2yqoopbpkspgm575p38ozh8pl2di34y5co6zb83kg',
                component: 'btvwjb9yx5wz7y71nuea52y91obwu57vf5tyxljp2gcnya7jpcssnqowg4o4i0zupt8g9y2fwdm9oxi3b7lm0ggfgqagymgspo71ivlsilvms18gx0if1q1yc1uf3qv8nn3t1mt0tz1cpuc3nhtdqwbm7b5wujjt',
                name: 'vuv758avxdeasxvybjbb25psz8s2ntz65wk00dp9zd53ke86fb691g99gp7hciaafl4n95mn1l8yhh1wx3v311erk6nclyg4bw9va3oxby0rjye6uti2yfku8ud19b7p036muxo3jqbsk4pmipbsz3glgugextwj',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'zev32vrj00oxfygnbbjq196abspy5ujyjyj3xhmpqo2d0sigcrqh3v1ldq6crcmyp08kpcorjjnsujvusaaydokjt4fm9u5wus1cwnak63buzx1dnpcn3krjtni09dq53bh4epinerqabl0ka6x7d2xivh9pqtja',
                flowComponent: 'ao1em30i3i2eivsk2h4a3drglncobw2u6vvozrmbmusak6s6dpzkisyp1059r0oy7z351rfoev17108q00dl95qlq3to5fhsynrtz3l23jhkuqwgq1e69bo9fyobr15zdrpgwimu6aot30qc7uvr5doe0kmgk83u',
                flowInterfaceName: 'ipvrcn77ifubbmmm5lu8btryayapkr4hm5pch09z7eurxuxojygoiix6yptvzg8roju9cg61ecjimtr0i8x19db7uzyl32s4n8x7ghf67q7xmlesf0arkfzxt2qyc7s7s6jwrj914ovvnnr6xx2hqx139tda7lv7',
                flowInterfaceNamespace: '67mz9hblwgdwywpkpetwy75k0gv81kypz1rzwxzjjbxvs4jgbktzmizbf0gzfjiofhos89y01qya015mc2ydu6go6uxke7suiurarx9uqxvug7ec1zz8jdt7tef4djy6o3v56lkg4mhk9tu8gmij17z9p6f5tn97',
                version: 'zqpqqgliytn9h8wm9155',
                adapterType: '73kubidgb8rs2wb3qir1464ui622aci2ovujdfvkha6t239jf7208b1tfn30',
                direction: 'SENDER',
                transportProtocol: 'dzuvdquxtvkdlidg8z2cdu8g716ypca35j9k76ayt5ipvua3164vb6gbz2dt',
                messageProtocol: 'kac8pxnoj64cqhp3qam342opblmp8dwo90x765rkfqpyntyccrlwc3uoolq0',
                adapterEngineName: 's3kcnxwb7ue8r0wcy34vtbllfqapb09olrqxcoxr1cqzhtpz2rd9dcjsr2iqepy6bm4bc2tvlvmsubmfbdxw95ie6im1f37pns0jp9u0e5c5gqzwyffjt1pc74vjddcuzzju88jhxwaih1qzhs20uxzdroawnspu',
                url: 'jiwh4xqmbg56fji66d7mxvxoo4f0yshdh7ccbah6v8pg3ww0x2k6lgghzu2qj994zbiq8jp2e9b4m3iscd2nqw8pivfsmsft8eptmab868s5xrisb7hjsmolrdt2irpbbi91jbpnp46sh5xw19q46z2pzajzk4u32pb9d6uyjw8vvrzy77qpzwnyv5n93acir07y5xytjmu99ksijxsai1j836qqgt0uptjhmp6fsh2up3ioew7cesi3axpkql9zqmujy5360ocj2jkg596b3zit6vwx72sfj3213vq60aed1mfcxi94rzd3ab7o2r3x',
                username: 'jqfvapye7p6h3hk2shx31ueznucqozl8yu1flke3r4rxs91qkxnnn5dn3wdy',
                remoteHost: 'nytc4p8k7lakq84rhaf1r395l5hqnw4ufm2ifvm3t2xyigpfbcc7n3krjb92mc5w4k5jpbheitadwk3c0zn70vfjsxjf5ftt23o61ieib4tvfmhjs431s75z8wkp94xxu5npzwsxu2cht7mmeafxrawrc84lcsin',
                remotePort: 1054493142,
                directory: 'xj0vq7xxzbh2mdrvbbj0qthr341341pxa74iciuno61mwml7g8d9uvmdtvkls83cdwjtsyuwy47tde551s18h257fkhzh4h8bgyc5aazno77mffkbcc76ad8nzfqrl5qriwt75vleevti3xgoi8e9z4dorwxlkrno8nj3wk0hd61uufn1jb8zdk41b0wowuba5yqjuxemlmyr1wy55ayk4y3mzxj8pxwcmzp7a4xuehewjk263nr7h8u692msvb7qjgr04o4hctfa05j1cjbmxrczduke7b3k88j2mnwf7usqfnpijvsadwtez2m5tnwut9x5p9pikauztnmjfrvkivcmf21xlqqdn94hqr7r4190jw9luv7fktmedbzka44u18v1b1yqrzvjhb5lfpapcgd5fyi195r3jc3srsicebccozt6za64j12p2hk5brl03ff29vsv742tgrig8egbr4t6n3uam41ljeojas0horpmyypnj5v15egb39etiidhek1exy7bum32tqkz9gzsah1kpfnktyhe53akfi5iledvhmfqrdil7z22hudnoyfl9elusz1iz2dgfdrfh412cmz6nu6mwvsvx90z2anerdx5xj53hvwhkzmqj2zg5mlsk00wbt3ynm499kscae4x1yvqiudx5rc1pvhpehbjyatr6cijmw8ys1dz4sijha3dcennf4ju8j1rsp5nq1vl6zemvvpd88pbjbs2diewpskhfd76hebvgn1zd3wuku1mdjwzuznpatfn3zzgesd0pv7k21vz770x2dc4lf8c7zlbcmog90d6whz2gf9u2kkord4at5n49p99pu4jyc7eh9ucn802vhhnfsb1drw8llqml3np6pgmrfeep7bs0yql230bj1qycf4b9ybutfmo4ngk3jpc6y0h1c0rdu3g2qq2zkz98m6fmbfe8otvp03pzkbe5yf2wktgmd19k261rsgzpyi66cewzvi0bog0mb50qkynlpt85125ctweta7',
                fileSchema: 'j2mp2fr5w1tjovtrxwh9gtw8d50s3m5qd0m9wuxera9p0177s7rcij5mxxpqmp1jczr4fpt892ntld72wgkedg83pvgcw8nhkcx4mh7sgndtb243rckuym98n0vg4f4f4y2fn3cdbtndrtd5glqhh27rrubw0cstr9a4hnbckc7s6p4uwlax2b6bs7pt1jlrkad0dl2fx6h3ly9lb9n6hmfq7ewodled8hxjldff1syb3rswnavg970yvrv1ua0m7rka5gyo1ojsew864r8olbtusuityi6r0i572831xqt444u5txftyznzaa8p2jh2f9qmtzhqwsst83icql1js782f2rrkvoqxz5boki2ryr8jxtkd8lac3pygsujdihulg7028c46j6qgh2jk5ey9fkffwzazdlrvabkpd0khzjjz063zgpmc2x7vwqudqpgwknhzko3aiykc7jdftia7edf7u6iw46pcdtgoyiy4gfscie4a37ya1l54xt5rodg56dlfc64jgudaqor9erh6zsgywyhiatskfkx3gmdprrtbayeh2ov9htnsxlfe2tuiqnyeln154pc1srdhptxxiawvt6sjhpw2fbs5jh18tadgx33vptjd2jb1f52qqzlkud8eikclaaqta22xy1mb6gituxwzwlpiel9zapo33s15avq3rknobp4g8sipk46gt5gf2bc2xgboysv4zv9zvz40m73laqhxt01ks3c5flahgvl8c3578l0fx2cf4lze73zwuy0ww6luybcsetekjv6chzb67d8gfl9lr5vwctbu79ze1uumzpwsdewjjasau96t266wz5gcw9nfu715ipj56dckk4jmocxvy5u11j0lzco78t40mxxe3rmxzspy51svvkj1s49mxxgapsyw0foc8bwho11va4rfskc31w802l0enbe323lz47m8eykh0ln9q4ayic8f8fui860zj0pkpxaoho6muwpa5u8q5on5d7jov96etzhwu2uri2t',
                proxyHost: 'kp4f7yeoa6qj0shdu8vjydnuf57en9flkapjpn1l1i5nfsajn8v87sy9tivt',
                proxyPort: 9671810118,
                destination: 'gk6ojq3k3vxex38jbdh1xcd7x81xxjb8lh2et1tnmly4c2qw3ujtp69tajh1p7ksz1rattbn494f2d0nzw0fm83odjh5sotcsx1lnxfys4omely263hn71g2denwfndhj1nape7ef53hd5qibrjvnytcon1hpx1d',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1y1ms7u33x5kcu28jrzn5m7auib861ecdptpmhrmubpa8jsnbnotebdts2c9pn4pb7prt2u9nl7wz5bu1bcm1qtcbo1mzzopjm567ffayyumpufn4c1tdjvaxp1thgxxfn81c76bnoknv5jy7o4e5eksaq1xpsrb',
                responsibleUserAccountName: '43ugn2wkeum934ppfeqkt',
                lastChangeUserAccount: 'vtl8h3cuw8ihd8eznl3s',
                lastChangedAt: '2020-07-29 09:44:39',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'zj39cvpff174wymxhkauu1ipwdoityk5h47f6mnr',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '9fkkocyy6ub04kq4c64755piwwqxu3oe4r7mlwqaqf7ibkshnq',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '0de1k1cg63bt3s981e9w',
                party: 'x8jgtcquu0ahvf08xmgsiafwujwi72zx0qcgahx9qnc76vkp3g7wln1ki0bq9jaafsc5x7ezeeajyhc4de846d4wwf1rdknwp0l10kwxv2q6wwikr58tmgh79i3ybzxyb4l9na6ls19m09emtg8upnez79ixlnws',
                component: '7muzk2el422b2nygp5jm80xh5g4ii7dyzm0ou49vpebmo30burlykpvn9z01baqp0e0i9w1lv1scno8632uiqr8hzkddh67a8ju9inidf00n5hqc3tvm152pyqvln0wc6w4tvuuvazwlstl4i4xs4rbf5ibegvc7',
                name: 'bvhn2sf9i4dhxa026t77gu0tpyltmmpkjfew1laekyj8uf5s0oh4oyzz91m0sj0y6xq1hmlypskzn9jry3o7bw5jyp79q5ioquxroq607nxzk0bnojhac3uaxg7xx1j3jpwp4lq1sdhr8p0t5r7gk225lqb5rfsz',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'm5tg6ow5nb1oo6k2r4bqvquuxp87guhg7aoe4rufbn0qk2nnkb3el4rsxz8o9tz07cz91cn9jgj0620c4695ffjmyttyfazyuaaepd5lds4tk3xpma0ra0udriirgwkth39p9xbablqswmr66l08vdfc877161mu',
                flowComponent: 'tix37j0qq6sqmvvgcr3lazbwrw9ygww56hml37b90h4cmw5596l275zhnsum9ei1emf04s6o0rwbt4lc54qix50gmjo8d0cg989ecswsby38cbzowabh1c59w8xi7fjg8wu98iwj10ahun74i72oqwij61lx1gjw',
                flowInterfaceName: 'j3k8uy4s285t4xnbu8232xitqxlqcer86b8s0phgsy4pugffuqbhnsca9rx43b33n51boyvq0ozkbffug6limhmaz647i0f1lqg0yxyjiv8lgfz57r2elluamzt3d42cd8hy1r1c4cftxnorcve1hwnmhaqp376z',
                flowInterfaceNamespace: 'qoskci94sn7al2wbuxfiaotr65i71ruoqumm4to9dkqxbt4kamqrt2bcov6cb2bdlir6btob5acz91gfe4l6qv45e7usnzrb2ux2c12n7x184gymkp5n4h4znqea2ovxjxhdfbegwp0jsnpguo655929fp9i99qo',
                version: '3s70zgm6sgwfcism7qpx',
                adapterType: 'pzkqm66eci7dq6sldwjnovisqwx06xwh2nd3yyk5musc0gco5qxx89xilw3h',
                direction: 'SENDER',
                transportProtocol: 'smnjj8ba01wopcubx26fasvtdfaqryv58pnfkc53eovf41d5itt3h7n3tbs9',
                messageProtocol: 'kq1wzbb76y3randfory36frt1n6bhmuvlgae5q7am67pq4xvkxpebzz0oj3i',
                adapterEngineName: 'ppllzulz56fcv59lvjmlai9cbf5afqjpqf1f56lwpqzax6p5oiyokdq9ki6rnnetgazkgqjxlr9gd8o93ooc69d4e8soqn8sq5rl9edprxmr5xatv7cmy0nvqavleb86eq7pukjmlwwexmluf32dsb6pomivcfai',
                url: 'ripop7xxpswoijh4pyfo2qzy9qz63ioliwjdot0zlbwervm5kbxg01zal82gbydcns19rwcwatl6ftix7qjc0vhi00ti9etgdq0t9mt5hz8wpwxi2qq1zl3estcwe35rzinfxmlwu5aoherivm24knliuaqjodvm34gfjsdbs754nwyy2eie3kysf1wboap20qzrfggiyhfjcv07xj9t7heh140vrgfyhp45ajxbcq8oc4b16a3zcuo82jk70gu8cikheva77r5zljn0t1k7ioxmc4pzymur26xfpn39lwyw0yf94q2ldsrptn2iil9w',
                username: 'r4cbn02ic8g6mskqthjqte3yart454f9pacvdwtcmo69ygvqxwjkzyea0mf9',
                remoteHost: '5zs7ujug4xdkrcdar8aq6vs3zb4xxt6qgopn7up4ncvwudzc9k6y6w8sudh49iz9k1vkm6nvykz8s443zqgm5ebtghppzn5tkibh8ezqtt68xzv7qo1gftqqqsoxxebfwtgotbsalam7gk8z28xfsu7b2zurcxbp',
                remotePort: 5441449999,
                directory: 'p7mum2y7aiz5p2n13b70t33acgy8wemx4wfm3fdyzhpxndfe0ejnvtl1gmywt5v0oj87un3n1wngb39e5lcei70xux2klng7xsd9fo61vuxrtdnq7owu57khw8761dmtgzhyhbkt8inbbp0hpz4w4t7z6lpjlz4646zvi61pwuvblqmsuam1wif5f63w0xsskpykgear684dvwmqp8go00g8jx8bntt5ivwog0rqq7fe8b4wrsx9gje26in19a8ztskslglpx5wi1ji4b72jccwldr0ybw71q69i04zra8zrdnoh2094h6810kqrejc26rir2bhklnxhhby6u98xhugmjv3vszcw8yqqe3ozyv21gw7ueob5dnq1ozs0zpyryybcmmnq6k7uqh3fwyjq22q8mbvg8aeur53igvftwwmkdl6llzmolk6ogd5fqtxricoikny7b7zzloulpzp02d24ozhasshw42yadhj1gwb0nwe4sab13uvc6uw0g2twwsyi4ifkh1eoyry2k0wwb6ovl4qnftp5jifdio6quwilzfzw5zi0udfxya2h2x4cp9g9g3phesg6p0czghzihh41onx5sjcua54jeyfyhbnvx5jofrulxl688zw1szum0fhzv92517uhfuy7m6wajofxm4sivdz62dhc9whp905f4iikzehnjf25yr001iotv5ojns0sf38uo734nglu7u7spn30r6jjdhppxq9x36mlcstjk6wdcfuez4gr3w7ch3s9wd3tnd7clmlfip2zrjj410ci585k9ea5erggam5ex9t0lh5n9lvlskp7b36kqtvxmjvosxiyt834w1ijnxqm3olxsq77192hkvucu0o0wfu6cbq5iugvaok73c445y5kxgy59qhj52n5vt7joih9vwn8fy8zd6jf5vuysbrtxpv0j44fros7bkvr8vtmdy1jkc04cdgsv4ulydyfl353kt1xddvfiuzt84zef0vrkh3w9fot2jyis8fc9aol',
                fileSchema: 'pc9zbo0syjasl8o1lfwnerm4c90v651nm9ju3lpfr5rekzml0ggikb8xy0wfkrxbl4myr65uwfk2yzaxn278yz7nr6ijfsyc8o3kparix4mi7cnje5pgqaul7qfthb3j7nqo9ov56697ieeoqe9ch9vvxpnwv43qoy28hwirsi8q1powiey4nzp5ri4965rrnrtbxdoykdkj8jz7812m1ub9k456ngm6vb8m8mdtsdnkza7cdq6nlsczutxduhso8i940fx525chxke8h0tz5tfw7jdc6kz5mk7a3xzpb9hyuauu1m9be5ejln5k1o3cqife8des46gabt6hrzdgjfbwyqas11ipi4uitao9ynbnl2r2c2ee5vjveqq5sejdbu03b0kx0pkhu7bxqvg0qon8jyl5rz9hdxwcm7qai3ofyqtg1bv0tri13awgo34g3ptv1mw25ry7ot4i3p2uunb30ceqhpel83gftpnzvh48yxun5a66a9lbb29isf1edj3a1wx1v1e829dhhrxxcfzy93ji4gw8487zcs4o0zp3pbwxzxzejk0c43e2tjhj3s84ff97jr3sjhikds9kb3a729nxnw0admxp3lzsltcongvf8ve9coxc3eofh1jxql3gjyd58qbrlkjtjmvfy6dp22rmkxgso2h5gqimw0xzziitv5smlal3z47lkqyb643bcldhxxx49fcy9umb4qv0oqj4cp1iptvhjmtr5oe9p7722w9gz23456asc4k5tbk726rz0pfa2f8v03jx5er9bpuxx7hh9je8iq27kfx177oq3ucoxqjmycq7wcfqhngd6f2zzl7b11ey5uvmq9rb49ph79fja4s9zmfjpphk1p5jhsqhevf557h9co0u7lnxh4yexyl8mwezc7xpqllw3v5hzt2sft3l2zqvre5u5409b1lictnjl85dbuvo19ullhjbwlg1ms46lvnv02lsz2f8wt8zrwkwpqid30bcubp7jktr02jns3x4xio8',
                proxyHost: '9g7b033s6i6amnew0uy7l37jd2hdqovy4thx80otovazgcck4s17uhw4af3g',
                proxyPort: 1888619113,
                destination: 'l1ab62jcbd1oxw7pumpuvh99ctj6dno5b5girjp2kwpzkc48k9vtzhh8p2ne1ia6wys3ffl38jj6akjiyxja2mybz5rp91ueot57vkbwck5bn38ihu3sm57owyq64djgtf4noaqnrg2d60unj2w1t1exy07adz06',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'm9ccrj51rag9q69iybxkg0ih3e1ups1rbp8j9udyonxl0951kab4m8egkpyv9jkm65y6p2qbmgsla12kfeodgxlx70wlzzemrjytwb8fyg8abjza9bxblqdobxukymjiw9qmd9jdayt4xaagraf6y8l4ecdjyess',
                responsibleUserAccountName: 'piytqmvp3ypbgmhtg1ot',
                lastChangeUserAccount: 'aw561d03ddrqa9s0w2gnb',
                lastChangedAt: '2020-07-29 01:49:56',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'l9o22ffi6zdxoe4d8yhuvsahg1qiqazqgyor44d0',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'wqygqwikiclqavo31m136xuefiq579uhat26jtaw47ultr5cbd',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'ykzfi27hvho6gj4eifn0',
                party: 'j44ryov6u7d4xdcs2o0vj0q0ytftq45jt60xlb6l1ikkx6rpgr5ek26874p6h2ej299j5wvvpc4y1hhhogcj96ixo90devvwxxbyoq6yslfl0kk74w58ufiv14eftdzfcb99ksynromgg05dfqu538429fv3zifw',
                component: 'ugkmgp7tzr4o8oiksbkiy1eygzq1vkbmiybfz8kzs9q7axjbshyxtdx9tv4xiiyfpiu3srm0ucb3c6zntfk3whqib058apccfzck9hw0usl3un8w7ibsao6042b7j7fv9unffdl7fzm435nvgdm8gq9xaysyzd8w',
                name: 'qzbl4r8n7x9hki0skomgnuurrl53n48yy2wqwysy5e59rdwshn7izbzws5iv9imen542dh1p98kaaeensy9j8cpkcih6jtnzwbyegzi4p7kq1ozyn4rm36e3ng62gq2mne4l56f65qlrwzlk4mri54k0d7us7joj',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'urq6zdi9vxocwutnag18re4l28gw29twqnm8r58uiedzu1mwn3xhjohwv51o63xj8cyezblztkb4yt7zj94fyzg6nhsoojadpcy4w0qha14swe5pg253mhw4tru6w9mfyi8kj4jbjprmldfsfjp12du8ftvcvpkr',
                flowComponent: 'decx29wa8j9nin985nt9y7d4c7pg2ihc16ht5lvfbntiia37nouet3sp50j2htwvuowlovje34w08b4idlsetknzd7rkzklcwmyznub8fm0q0jlbnpb9evfx9nu6klg21z37nn7ouuttr7ij6u619929zybkjgf7',
                flowInterfaceName: 'zdddb9be1orpbgpebx50tg2cfomn1vlcz5hrnitdy1m6ozr8etuajvvnljd6ilrqgjuuzpggto00wg9unx5qxk6t8wc5i30280repj2n8r23toka0jk2lyruon3ait1bmyiors3apfagyuobvzra5nslxaf1ox4t',
                flowInterfaceNamespace: 'we5a2jxd2sjuse0v0su9ytpeaa3ll69ni3ctjx7kf116m80gu2hhp1qw5i1t35y0q23r4cwvcmo0iy9yhoadd2tli11glmwhej02n3broz4usyimq53kqosmenl4bjyqaac0hfssowia9tn2ta4quf6ib9eg5hgq',
                version: 'buuwfyftnrr04mgxrfji',
                adapterType: 'dwmz4pqol5304l1m9uj15o0ddiwol42pay0mcuy7gvtw2aqkrsgt19g56asr',
                direction: 'SENDER',
                transportProtocol: '5ootam32ndjg7zsixdz1ggz8c9705umtgpv6wpj6nbzgfy8fu0n1ak3zz292',
                messageProtocol: '5hplmuay9c23ah6lsrl4dudsxhx82sz6a5rvql7ulm54a1h8002cjghol1pn',
                adapterEngineName: '9o901j1he208x2g2ed8trg8ow7xhrrwif1zlplskvsu1phzxwiuzvqxxkqsc6fj179oubc9htu4gps9r79d6cb96hdyzcmk9omk1o511oox5ablljbd68y261v52w9gedgqrh5uuyco25moco7yew04h8zkey0zg',
                url: 'c4ya1uvn5if7is1dverqukbuie50eg9s4k2t3muhj0o89xbkyre3ezl8yrhpvqjkyzwpl0tx70yt78j4v24v0m36dunqy9l2676a4a6l4gpncxyf3tnmhtlbggkq31ipqro3ndynus9swy4upopn0n353yn59wsa3jf5u2js05vvflwb2zh2j5v2g2nzi8igxo1hknkpak1yhrldu0e09pxp6jm7b594yjffnzrh3mbio3hhgvzvusugvjmd30d213gmli9u9j34vkk23n56k88mue2uj1i918qpntd0xmh5sn300q7p3ms3e9nf8ipk',
                username: '0frshcd8v0wixtcg8hmbrd7w7880kjus1j08prd8n1x7eqru08kfcvs05xqq',
                remoteHost: '9ts7ashkzbvacq8v5hn5c3p0u1xyig0cv70bwyz4zl7bb6cub28tulluygnfrhghwosf6vv0v3qlfy52efc65bqq67u8oh9ztosjr3ul4p9e7cuv6utcrx04wt3iae783nmb3bsivddzxaeaicto63ied98c7idw',
                remotePort: -9,
                directory: 'nk6ybh3p3543sxix90u1vgf9yvf2zlsltzolyxl72tte9u1x1ofgabcq78umcih1k65x1zgogxkacc17dto34znmpq7fp0ckpmya6r5pa7outho0hj84ljib5bfxy1wmmjsvpihp6mbi5lgfjqul9785vdl3qwgh56nbv86bvv53fkyiosg5gwayt2x2z06kh5miqs9ju2vv7clfvlb07ecgnmusg4qop9rue1u4bgou5j0dcbjdjcpo3wy827bu8ldymlbrk1eknzee5qtgfoshpyyqsl45rkivazshj4fzwrp0n2j5ulhotbikioj89drlul8fg1euty4klv12hkgso6ke7cpdu7a0c60bi6ek8i8hjm88otpw3mmyx23omysjrg5lzk4kar8dvf7e0v41fgt3bzdp4sqvxzavxo1t13m4izv5ln2yj3l4zu7y8a0rdsx4egansd2zw08hg2nk79ddaz2mberu26bzh8pe1p3un05slrz7alrm2curyet4i7nu6oq5fbqzmtf1kt21eza0tjab32kr47f9mvcd8dqqg2kvd08135tmmwysleff5ywf8i2kpe16d7nl4zcyzxp926e2mv8whynv0towi747cenai4qk6ex28nkt57xp7fvorx9off9woyapdy7stwevtqt03z880taqv2l58qyd15c7pvrqdgw3c3kw8djc5y0sjjn0rd4iawjenvbttqqrxe14qkg5i8eb4cyi1uuottukijkfwjf7r8b14z3c60cquztwhvn22447499yekvdjh075xv6dcaiwliqg4x177v7gfrj90myd3hkz3xyl3glpp33l6lcx8bffncah8jb1tm4gi0elfuiysaufugqq3qa4s0doanuqfu44jl7uqravcnpp9yk5u1auzw15llhej8t4gfrvyuqlij9p5u6fzlexibu0d8clv3ax6ns0mqte3u7ocg0c45vif6df7g0rm3ugwh36iw8sauzcfyq08owvh8hfvlppc8y',
                fileSchema: 'zwwkbhixomnlkh4yqaob6bs0k60axiwqmgxoxdl1ec97giogqrtfk1ibcn6efcaht76mc92ttnsio6doxzitytregmnph69ys7nvg9x8dfpds2s5c1dw8qy2jp8n5u0dwi6a1dwqfwpz7wp3bnyn2kdhim1cdaibjnyl07h945pvulyhpeb2vu165lehpzzz0usn5b6zbrbbuknlsciw20ibtz3skmtbdvkprklswr6bmvlfbourcftmyxnn792b1sbic3wdhpcgh4q0bnqx2ta9gzhcng92yqdf1s7otx42y5mj0sw0qw5dsqtt94q1b2m29porj1fiq66b783w52vg2rdmbsb6kqhsi6lfhwy6o5axikl82xmcz65ivsflihun91wpszapk0sorb3btza9802pv2bp102ro7bly5dvz164nqikfs5boz3pf60p93modgm36tgmnqvc07ntge8qxg621kwm2uylwvzhq7jpxy4c61v5hyl82z2dsb2fzscciilbu8hrptjc269awgz9k8od48zvv4u03lun2gg7fo1pmvp2xkobc2hhn8ojdr5u4jm5nl9x4qx8h2pobmckubtlhjzz5px3bnalsln0vpqus9vlx1n1vdstm2utyabg21qlw42ms6i9bv2du1gj2awc72dqxbn32unkkdsd66lkd2hlzep7e1yr22w2tytgir66sh95it5u85jhuae4kz1lanryjn86e1fd4i1rj8wwnnkf5fngwitccc8kw12x12b8ff8gf7fz2ar973o90otbhbv6ljdtqdzcjh53wj05rxtuzxu1okd8omto97t7y10ai7dygv9ljm16i6qggawe1g1ujon6i1lti7n3kf5vtt97xag8wtvejatzr9j2vw9jaq2m52o2oco5gcf5ua1zs3gbhunh1lyoh3ff0d4nhhjqgitszjjlk810eknegtseuhrsclztg0y35nk1fbphv5qhq1tyq988hnyy4ym0urob0zg14f7eli4b',
                proxyHost: '2o5upzjybbx3vbg56enu8b4hmfnkyoecunmtvu4jg5woa6u0f494rsx9twf9',
                proxyPort: 7407015195,
                destination: '0pn0jxqp1g775hpyhm5v38bbvo91q6t7o73oseg5ncj9xkkbsqh7tj7g1snd67cqawf9jpct79385xv2szvd73w1fvyi0i8uwuusz2xahwkphqnrrwp3zuj4ukrp28p9o1g6wrw5da9d7xm1o9nuku4e8n945xct',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vtvq0a464w5er7vorjm669dipr5zzowngfqgsste5zopha2sfi79k1na2dox7xhtg64hevnrhs4g01luys0xoobmv5a5j9sgh494eq7r4r6qbfy7ri77ia5rbetohp99u6igw8shjo2godn4uilbjk0ic6kz0j7o',
                responsibleUserAccountName: 'th883psni3ix00jyg8re',
                lastChangeUserAccount: '40uje6ppoxldtdlee028',
                lastChangedAt: '2020-07-29 08:35:18',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'f0ia5lf1z7xqslw9g1l4vdhxordx716o7j3d19xg',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'b8rimv8fnyeiu5sxayqaastau1wi4968dp5guwhyriqhd6i2se',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: '3t4vn7gc6wo38xuutbv3',
                party: 'iz6e9gi3wc3uqxetfdlu2bdezveh7v0r2unj0ylv9f9ys3ddc1b7eygbx0ef63baoveo0vlbn2e3gchgmbdhf2hmd05j6007o79rul8uo99v4hjsa85fbwfi4khdmvom9y50fqo9pty7tuse29ao03qjdxv0byre',
                component: 'a28dgjzk0e5kij52ga35gcw5iz4hgvlz630e4arggugwp006451q4a8uxb4lqbx82ubfwuoxosmvms95eun3ka1n6p31in63rq29hc909mljoghcvtc88g0q559l9y28p018it6s4gmp94r8xjukruzuvj7we10v',
                name: '9jbgcoay9w56y2hyllh3q36inqyr6aa1ygadb1rpmsiejd11qys87myrfgs2xhtm15frob5ncz6bwiv4fcwi9kmdgvrh942tfcymomr37rx3v0m2rw25605jwwu6c2pft99suy6feg9j7664162mvwavi9wlepnm',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '2xhdx6m8a5h15rahgxv7hfmjcirvbzbvj4lwgq73wk1kbougbnbubi163dgqaw0oujfgx50vag6uhdcyzpjp9828t9mwelrpxj3mdxji2hdgplk31iwc00tpslm9e92knx9igpcfm4fffxku24qwqtynshwt2w4a',
                flowComponent: '66p7k51edpks9k4p07q1f8fr09zds4l1wmds6n6rjqfbulot229w7lc35xxdfsgkle1jz5yovi7mqj7gqun0c7ptfnbn71yndzecpz0pku6erw21gku2byqeb9ussysbj1uav0a5xucsl3iem9gbh4vx7p5egbym',
                flowInterfaceName: 'foahzmgrhzl51afakssvbmu6xskzuker8ermojt6m2zh5bam6envn0f9cyeumyvqy90bx0s3azxwe0xlu7q120eb47x2x71osknwhrk5rinhb618ppkgx0vq8kh54jfip5x4u0e02dawfh172vxwsptx2cfojdgf',
                flowInterfaceNamespace: 'raywdby7wwafed1nv0suzuqy2rq8q28eo238owpxk2g63j2x9l5pbhr720q8sbi4l3gs0ywmm5cl3iidqyqxjgoec0kks8mesqo2z6ulip2vrn90e0pw9iw3u48z83zwaua8wkbsj2gf7n9md4vz6degjq37ftnj',
                version: 'zl953wye9l63wu7ymadr',
                adapterType: 'xbc16q14yxwenqavw07jjz58ulwf7odq8pygnwxj7ac8ocx7cpdki6b17cfd',
                direction: 'RECEIVER',
                transportProtocol: 'ql2vse17dt1orsabs35tze5earn0a3hb5q9o5duhf5c7jjd1vsqlxa2k8zup',
                messageProtocol: 'y1p7rzyt81xv37frnyu4d6ph0t1f7bnfgfzcap3xjki3wvuj696a1m8yjko5',
                adapterEngineName: '8n7o04awunr67sjbudsa9u9dv8fp80b4v3ryi2e36istqa53lyqmwn4qm89ipovq22qt5kp59jxgulrc9m01b5ktsbgns1wjzlo2tqrlfhmv8a1t8v2ll89ye30pnwhel3uminmo0t1cin8k8g6kyejhq1fvprq7',
                url: 'c3pdagle96486q8xpgabd9qahsk6stkhqgxcgoletchxxau4o70ww0b5tyflchx07a9jufbikm6xtgmh4s3sl3o26scm9x9rakmqgckpw09q2pi5kvbm071rhrkgqv9ffik4g0a9iwk5pysnb9t2zzc2pqhhx3o6vmx3h3xlbcocbksjpbbsi2sjh0z0r7gigcb3xp1hkm1w7pkyinkjp5q870s2db3w7lntl4szhu9bzgoz7uimmft5epeypcve0nfkd4o9lj19paximkxu6o6ct0igpf89qtptaawmonsly06e2y5v86naei74rqu0',
                username: 'e86ebqeripivzs2k7t7a5uwqxyycnvotb0y3n2pnsquvupvvz1o2od23oewv',
                remoteHost: 'mzrq6k4jsdcbztqt9pjrbfqqr0uc3cxbxs0cn5flaj10g1np54dbqb2b4w271kl49hwovveq0rlqpf6zsrdm5hdpddulxp5tlohnq7al31fgmafcan8mzaephe8s7og6trmt7tg3g71g8jfwr9nfjwi8m5xz8749',
                remotePort: 8972337038,
                directory: 'rbsngm0gsmz8uuip2pvktx68xzqdzhh2jr645jmpupo14qnbe0ydmxh9n923bfv2e83o3nsg52drk63ndiv7kd1qb4e2pyg5sh6i3nltwd04rjrkqw087e9nysu46k09olwff8jd3i7a0203t17n1q6cyrflky8xsj25zwjqmr6xmvg7uau6mvd9usb4pwt10v82ctg1plaor8er2069wk0da4ejc7gnvp89pfxcjhpd2jhzz2o1lu3kc35cz8rmv7t9swldn1i5tllolsi34oobiq88ea9d86pqryd1i703hu83ldt2vj71bn271vfg2dghyn72krgfwdg7z0tlqw4eok78fxmo1joji840cv25swbe9unc7ajccq0usnv617fsm83vs57fnr9asac6gr929m2ayns2xmsbj4v2nkjx92mtmbutaa6m63d83ot4mmeslb1l1w8kqcuozhrms9b6gzwmjdmjkeabazqr5rqb7pcycaswbdc8s0us0getd3i8wkpwekdjve81sbjwvol43cpz4yvpdk754aupagssh5u2c5hqamev1w0cojizgz6g7qq9p4d9rodv0x30elevinjztdlci34g4jpccnzv0hqy7x2ma982trkghtsvuy5hnns8947il7hzapm7i3u34tpxznux0tjjgkqjnphl4bhoa7jgdit77q32vwqa41bxr7dpmsd2jyt8vzeectcpf5h86y02cllz6xf0ibmp06eo4nbl52gwdi6i7yeoi58yh1oarpp8g9v6ak0t1ik3rled8o18xh90noovr79upiktrlkej2smsg8k6vduxtj25b64xyqc1unpdkqddc9nks8nnunz72u4sm0p70vtc22f182dfhcai1zwegs7zjg948c36jhvb2xdct7nsu8cgf14mep77mfphxzo7omyr5oooazpyyhk1v4xde9g1994eenr6isnq7cirtenztr4y2au5ck1ml8wbv2vbrzxxamarsyw54ovmv4ubems',
                fileSchema: 'qsln3sdbtap72bif53zv0b7ulf5d8nnj1z2i60qi3m4gvkw0jpws7llrd0592tb2q5stupy8pwd6hxu2hlkgv07dongv6jwdmo1eio2govjvxbma414jrckkhb5l3xxl39x9ckkqjbtpkad0fk6u51xu23lm449cg1ajyrufo5vimq9but55f267v31y2w51u82nhbkuvgqew7tb9mkypswaxgja8gunznbkc214bzshtnco0gf0bpkm9f4qmnj10l001915khjwfqa30uy1ch4lp24734nx5ozqglogjub77tqtttqsbmsdc6zmunhd9lq7zpcmq0mcmw7hu8nddpwklcxb974p9qjesv283dvvz83finh5bw83lk594jnjdaz1aiz1p936rf9ea5mo82eto6byijsqivbvagwtv32tqtygys0ybf0yt2vxi06bzodmjeb7voawn5mb5c7hwkdxr266f0z9vkhsn1lyj9tkb5491qtrr3k1ech96d59jki9y5fnb4s2274a9ib48zjk3lowgr68ocnbfooo6mqz209khhmatlq6f8s3ps580m1i7utr22et0lom3bm41all5j52a040ga6od4dwarba3os71mto76ls468nao91ni0kbiqnrai4n2r0g4ll8g24pfyzkg57h7weuxfaf0afi4244dxa5rithgyurvvh8s46xvcps5nuc0wpya2w5gp04n0qae9u54drcb0c1vfc161ctp66cmafih6lz5b5j3s6a93jshd4necgh1b5g0h03scstge66q5f29st2axmjwcamcmv5pjexfta99b255ivj1as6stag0cauphecn5m09dne054mj0rg4kccht7bp3jdyew5899cm3r3b2620zhpbw81fzbn7x2fq7238jv8xz7qqrxiylshtt2e868eormzrpyujfye4gwlw74km11hkfiyh1ijanha5vlqgv35ibi2loh3f8cetn496l7ckx4gzp6cwqpojzbpbhq',
                proxyHost: 'mf16tlnj8stbw68hqhzsxhl4ldg6rw40956woerwv4b3s0z8ucgpwu4l8tmg',
                proxyPort: -9,
                destination: 'uke9hofcgig8aufb76ety7bwyen4fsnftqblndnp6utfllfirv3c6wcaiqwtfwe1x82lq2fsxnvtdqw3lwur9y6ojyjjqh3fjwxbmbvsysuak32xof5mv5le1ekazktuuw19h8o0ydjy7kbjnb4jwrrui8ahdcyp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9ata8lnfc5ly1lj76vvwfllk2vue14bahzldtn5db8rpfn9jlzidyc9syqcgczsz81gr1aqhb505rq8nhettiw7sygfujvs26liih9jmbmq3gy54m3ormvjfxrsfxypg7ynyqn75b9961zyn4uj8jsxlwq5dwc2m',
                responsibleUserAccountName: 'cqmi2w0mezxwxbe6ye5s',
                lastChangeUserAccount: 'wt1e1awb58k3l6xakg6s',
                lastChangedAt: '2020-07-29 14:02:24',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '3ozejrtkrat7wm7qlaw9xtn8pejmxa522h516729',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'r2sup8sl0wis45whkdoyimdj0t8vq2uzfkitb9o748q6fgeaar',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'eid3p3d7zpchtteq729k',
                party: '532kgfyj7v5yrpni5b2hr3z9vx6xw7q0t4lxse3jfxq9i9au7y8b6sf25jemk65hde6e0bpp0ex80i9udeisfw9ixnpwunbkzz2cidms6m803uypesqlspqpjmjenp4hhnnwjv96tohpngd78lg2pp33shi8gtc4',
                component: 't7un3gn5vlllva4evn6llq6k0e2qw6guwnd5c13vblkok6ml3nd7io6xn5rw6hzwd5y4ia24oqdkvro8f6vmazb34skvws8ah20fbk1r9i0yiquevkwbu7uxmyzaa4776wrg0khdw6mbt6urgk0cxoka3r4biyyn',
                name: '9vy8oov5hjd0s0rc5eo5aro7hpdfh9ufjlk23ksozbx3at3xhavbfh941bqkmpzvo3m3us3lk6sscq7iqov9xhi4hynsrmp30jhk3pu3p36a8q3zpxtz4j9e7yt2zd6ysawv9lljy2ki0l7zum92r78f5rmmyu1d',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'ancnhk32uuuadfvhgsdjom7qmrtfd4q0g583ilb93mxe0dvzcx0zlgqrqho05pxpsb6odlqd0kon2k77o3l9csi290egxovnc1t6tewdq88r9tach7uwimkdk4cdnswjax18p9g1x8y4po4qrid0l7ayawtsbi9r',
                flowComponent: 'eek3zrtkz16yzi9qo05ddd55s6fog8397ugs4aek91b9awr7a2jeak2qci5uac8w4st9a9b68ykkj2yfoptpsv30q9x3avqbx8q7yhexf5n25tohcd2kdshdpg9ulai8y7dhi3g0my4bfeqw9psxtr6zxin3fl55',
                flowInterfaceName: 'xkarf2rvs0l9ugffinzxcmhw5y64tp0e7r8o2zqmit26mp4ji8kvvnva0p1a6rrbfdfi6sqmckdnwc58rvsecy0jqtds0pxnvjrs3d69q6x4f39w39ssf4c521uqrjidfvmquqqoot68yhcp64hzr4xtdg2eu4uq',
                flowInterfaceNamespace: 'nvry5z5tin22y2hg77jfqrnd0hgnuolsze8beqryis18hd6qtaa7580jo3eynavonppb0q8e8c842yo8lehi3afbu961yhlmiwcac9el3x7udu9gbhwktj4q5wj3npq29u9z9su2ys3c6wjskxqf7ucstoqqe0d4',
                version: '614pn4arla4mu37znxzn',
                adapterType: 'x2wek8o2bmp6f2myofb4gxndfkbo9h06yqaynm5yspkdtg0mzwpuyq28duql',
                direction: 'XXXX',
                transportProtocol: 'ql7tdk4g6vaj5jciq6vc4hokjijncvv4692xto9zq3m3ujb7l1r962ekns7g',
                messageProtocol: '1ftl0asn6dv3sk9by39gnx8v7snsdnanghubqztxirxtamigm175lufn2ela',
                adapterEngineName: 'zodt9icmzixrgzstfuatjcpo8307h4r8gl8s6grxjpxe1qskvggvyh0r2dhx6n6af05zd5l5p82lc2zc5gd5igf1smzbmmvdlsude0be0ci38t8uo6ye40mbk0ph14tpxac0zcw4tv2hv101lwpkzx95o5xet18j',
                url: '8jzuyt5k5s2tf511e16pe7uc5mim1q7hfhfqnfopucxf99gdfhqx4633am447y4nlopk5olc0tp21kt87whkkrl3cp6z51lb2muhlr10pzvxoedoe6jflysz4twtsrrkvyz64clm2kngwbujr5ruenul3gifm4ge8rtoz027ojv9hnayjfva45kyyqdflt9eggu7qwefkhdqp3acrcfj8y7n5pke2pmoe9e4szto8udcref8wpjepgsjovq3ur5l230nuyhclka34eb76buydyq3cbq1qwoqks44kbb37yo4ir9qzu377oa8obvhyz9w',
                username: 'qjfj4fxrd06gjnjnnna76wksiic8wr17pplvqughdsr4y5nh0r78knjzowz8',
                remoteHost: 'jgi640it93eypvbtpsdmutd8mdels7f7f3z3i1vorfcesny0uxuj0hhrs79vgvepzyrc7cw2fm729il10p3s81ieodhlgbxjvv0ws7sjnchm3se9vaiem6at1fktffdk66e48ecaaiedci0fbu5ze8obnyewaw6y',
                remotePort: 9290142085,
                directory: 'xvd3leyc1bh8xlefh6mnaeqn1y9ntchctovfhp1xvm5mc61nw8b2nsd1g9br1e0gyws8vvzjumlz8vxyvwmi094dyn96ss6l6n69b8vmjlk4i6hxuaveg7z5uibu789ymv6f32z80b0l8bir7dtvd5tl81winejk8b63afqihk6d5vcdfuls6oo6je1fk7stdr39xnb4cqxj8el050v5eg4v82znbfqf5bbtpj79uf5ev1jm36vd8ycdt489x88ef52qz4z4ar5x92kbedyn2jmg90ex8xvyxyszhp71qf2gi3e6xdhdelymh4fmnbro48nicjh9559guoqrb1oach6zr09xyymi1da39tz1qou5l13fn9ro5suqgrnfqdfwcvhnvn0ss9fzzpr0q2t93q713ll7iqocezv5kyiyc87raufcophbm5jq5gtyf4poz41wl139n89b0r13ez1ajkof02a6bh7rgl4doq4drmt2b8gry9rgacocf9grkf5nr8q9vm5ksfv8kquvz5n1j0stwy7sisfe2nmqbig2zgsz4cggb2bg1r821i7yarxvv7yxri3b8623plb8tutl6p87ovi4aaeri530zavnnkcvpv7q9eefwf937q842qkc3iunziru5gvq3s9p2n9zob5r1fmn3onurd5v8zec86lvnfuavptp3o3eppfosxq1nib45uqng511r9mrpsom3f3x2afqb8aecqc3rmw598eeystsz1dk07p6cpzd9kjvawpm6o09g7zaloivrpwvfr03myccej92td1ic1c28ihvrnk1vglh8ep60h0qd5jq689uetsyi54or3vdldvazg4asam8395mi11zr2ms0xbmyx4b1e4tiy74wbi0qpmb2gw0aps7pik5ox0v3rn2757nja7znmop2jrkwuw3d092hopaqg31h6sxjnl8x83iih3t9f2o9cpd9hsk48ii02l0owr2v3voxpcuq135spt013wla0eia0od466bazzw',
                fileSchema: 'kcaa1kc6bqs2rgenwj9njb7rvjyybofpbyvpmzeiboo9dx0dqsratd20t23kjampjxhwo70dpierdlnbyx4f9vq12q992kleeqofihl3hi4jb61vz27y7f9ps3wmzecquawab963ncquh92364pink4a1fvu22kct7mk9oa8g41aqasfdds578nt5ge2zz1qs7pnkfrqvgxeges3r46pzwg5edpwwtszd0105pzxauvkcu3domwma3ays7fmaxh49kqknq71h4qg2omvdy6mnh2judty9zza14w1x6p66rdov373dka91gpuctnvl7ex0ban4maonmx49hhyqogymdhvl4lebtjoe46niqenjl6v1srsdoa81ipayt59fokwxu2ii3comhgin37ngwoytatuw5dpswmztd0kaev049vm91kzzw6838p0b43opgzv2csqexz2zywz0zfnwz21u075ge9nwp2tq4sz6t3out8xemkghdb3wbjtwx3pyg955nm5tnyrudcgye4smmvetml0mt2es1xbhzsub2jieudmo1vu7j0m356ia5pnwqez50lvewrbgws32863vsib1i0d7wtloedvcl1utj51t6syla11mglvh2a7qbl37f7b6lymzlxmtx3v1539l30hwqr0dsn3m757er7xarq31sgj264bsfwwisehqueo5lrtlmrowhgov3bi3bqu3c2kl45ty3vdfbs7lsaxjd2fjaz5r5jj9pm147m601lalpahgnuh1rqcy2vyjfccltmomre9q8lqlrl8efj36v0mq4j6ofxf0bee02nigdnubognf98nx7kctv5yqhhi50s5y6qo41rqqqu5ez4ix5ergdswwac0sm9egfpzg1xjxxr2drz7us79wcrd2dk2xvkz8715m05vz6mm8dxxpsmduwwezh1axwc1uxklttbr2rkwk1d7obeqy9mgem1j279q7taz4qf4x434gj1dg6feq8y8uri4cnwh6c64jh6zyy67',
                proxyHost: 'mc27s61a1s7kmu9z6ntidfx8glw53m8kcu9jszk00baqph8qpkvznzwzulcy',
                proxyPort: 5683443947,
                destination: 'k9s43kijoajksloyy3vtvjier0a26m89tb3l7eoexbuqzfdvktr3ro0byepalcdibboxfheijzdkkr8pbd5k9qaipnjju0odl6vtnoevj30z1adsspi6s739ovlo83mq2kn5xlu31z7mdadd0pkefe4mq1973qxg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tx496rfmjphbkechzjhgf8odrz5tpz6x1g1bclz21jilcxm2zszcu2cxyjxn7oe7dhho4chh4mp6zw6czmb1yi6fnslini644gshymv7ba5x0zqyhbnh2cc7d1gbi1ghl5eokc33334bo1bn1tyn0m13rbyw6f5n',
                responsibleUserAccountName: 'dm2vcqzw85fxtmalc1q9',
                lastChangeUserAccount: 'kt8jmwsqqltz85y6ss3b',
                lastChangedAt: '2020-07-29 10:58:19',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'szdbjzuhvrfq6x818my9ibjgfvcdfde0ffth2jpm',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'n5vrio5bt1wtkka20xjswq7a64q462a53fa0f4s04ucrffctd8',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'c1le6nc5yutpjjxc5cp5',
                party: 'jdi3itawz1nbwab8sbh5401hiobnko93erc4cduis3jq1g3vks4a83bn6qm6g12u6r7rlror7orqrnucemc8q0s96qkw6qph90ekv5v8h5g06utvtbekcebggk59qngfyah0jq4ahzcjxjn2yh5t39rneqmshznj',
                component: 'n1ofp71yuf2yqu940ix3cxs6odiuce0yahcsanktl3buq1h0smvhxpjdqsmmgmn2ldb9ynarfkrx9bqs0hrbtbq7swrumo4bhp000vcabzxvvvnx2wf1euakg6vtu0kadue3ar9j23i2xaqg43vy357kodq6kqm3',
                name: 'mrsnzqvqs6h4df3anpvbz2mba487wu7zj3nehdhnnjpjgjst7c92ifv4ut7lwre5zc7sl8qynarr95ldvwg5nnu8u9k7jmw4z8tkxgcfvs2wws9e6vu5rlfp9iq40giebgpnw4llimpep26fov2jefg8ae8583tq',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: '2fd4egffwolg5dq0rhpaenomr0wcug2rxb3pt4knym8vjf4417eruaviuhjg61nkkdf252nzmmmb115fq0fflu0zesmzxp5ogh5iwh9k1q9dclr2dap7tb6drrqtaftnr7nc40xwi5pdf1iflg1pdfhimavyw13a',
                flowComponent: '2pqmp62inqcc28yqqm0ikfjhvkda5aj93y7u4mnq7kftng3d6b8vow1qskxts1t8fipuop0rscdoxgmf2dnohrsj0pghl2uwvbx3usvpseph6awm0cog7y33b4nb2mfw0nxobdkb62vzja8td78d5zsnji086acn',
                flowInterfaceName: 'r1oy81tz57wbfrid5hnzywrgilyy2d3au1c6ntfb04vdcp3l4v2cjmztqk3gs6m28lutrv9jeys28rdw54242svum767faz8ahgeuokqfyzqeyar0uefs01zr7fy2j3dn5d0txm1yinzkmtlghahe0fylwljcen9',
                flowInterfaceNamespace: 't44edausy1d7u38r6s03eixboiyymihx1m3zrz4t4rucl426lgny6kt2h34ag3i0kpkhp0tp0aq0czg2toinqi0frjbdkehigj4zpjmzukwmal3xk35xcfg7hfbky5hqf69dyhc2gzmfxovix8uafah7pdcqepyl',
                version: '8ddmu2uhtw5xbbsrd1ec',
                adapterType: 'bii5bwtlvygvabbty9unvykjgwq8cmfu5iibmv0gmkf9g4z33zm8yf8pbat3',
                direction: 'SENDER',
                transportProtocol: 'utqu96ff2zl3owbssbek314kiwaxyglcz5seu7rv5ik8l9kns544sb7t6kqr',
                messageProtocol: '63zwdhbodhzz3alwcol9eoeedy6uull7a2efetm988tqdamz34t9ukdu58tk',
                adapterEngineName: 'rcdd8jwyd68tehqsgr3ymvjk0eqio94ic8ea0d0x2t9ee934keqazmd7is7s4eugh01tyzceityc9zb65h8bbar6efhmek1m4tv1ypqqm396uqrljtam7d8hiu2h4fkomnrkws3nnuj225e1i80mzl00br9n2azr',
                url: '9ydztf4e1al3e3bxqejhh9poultunn8e5t4xmv91vljr2znjk7d5qy8390xr7hcuw4uk24sz3t3lgggn2suera1lm1tleg45sn8g9wrltk89dlsut9ichxz35ds5uisqimqn919ra1ulzxy1qmy70ha6r857irh5x0oaeshabfz1fw6fi6sdragorkfnwkopdmbp9266peuuxgp9i972pfcoqk0tk0aj5w21pnt3jeiedc7e5gftphm215s5ebtnhhir5ewqjc2zlvps7av5ennepsubjhlzwyv5a1100wemlge8ooq4eav4jo24qi25',
                username: '8eobh52gw0p88361yzh9er6cej3zds784vgm1yvves23kynoxe9aicx3tlnw',
                remoteHost: 'ycf0wlo28t18g0yv5a7weubtzk0khemhtxnbfm0gt67x3nhs8qh71r286owifsyusiarnwtheqphjkcdk38237dh45etrshe5g62m8coeq8xl3hxtopyuidp46h0vlnzgvealu3ez10pqqvqdgfy1grrk8bqkjcl',
                remotePort: 4102851048,
                directory: 'yt2pr2pv4pq9m1z28uh2w0au3kb9p0f5rkv872h8vtftajlj6wfi4rpgr6lmsudtf3pg3fd93rh19emuexfjeo0wnzybo68xu9xh6ztqzxc2yapdwnuh18y6kcr9xypnb8vmw9g6cykbgaj2uy9blh1f5pyy5vh7mpdic7acc7x3r1f854hd8693fyca1nd68cxydd48dbtjc8u8d7m29z9ngoctrv8x2kjcw00rk8jvn6w7pb7b4k0ucklch6lyf408kld8n75ns8c6m0326bpngjxukh93l7ng2nplenqpwkqbxzvv6e4h2vpzq5expi9cmz66kaauf2i0kuftfh6r2l95uulpm72f4mnqmawwskhdwe2fier3zrpiw5tezgzuy4dbgp0z7wo93cw0seyf7whinkoubx5ol1dvgq5usru4o7s13f8es9n0wydizta1q9u49e9ud9frx1ectgrbu6sjajuoopgfvnyf3qr6kmrfu796ik78ifmll7xlg1pwxbeqf7gyltm5g84wxry9ubkkk41r0mkilmragcofd6di61k961ca9u9q8qfm4pfo1aa2tw57xna2j8px6zsx69xu2jnzcxh85mye058o1rz9d3s58cd8uq3akj67rn0d0pj457ub6weusodtvu7u25rp0st9aaizqt3uvae8twc5s9oz3ml9ae9q6jhybywhe2efer7925znnutc6srtajlaznbtu11jtew82xxeo6bb6ifgkpfipomr1mhgiy669kdvs1cwubeqq1hsz9e28u7674qk8lq3zu9j2hjsz008u5ypzpqwmjofphvz6y572qx55ia2ilg8gekzhhbwk6dg7zfv0yrotd52zkuh3jkay4ul69pihojcbunjbw6cz7tkkm2s09op2ypcrmgn2aynq32nodi2g7435js8v2i6rmigr0lkklzuu6rqixrhnj3r93js30vsncwj00dz2tiagk4t6wwfleqge6h9tdza9nvyxv9whe31x7tu',
                fileSchema: 'td1zn6ypgo8ev6xbnediq0n587vormbb5e8x5lcrf059w1xkky61wko1ei8mfomxliolu8uehaox1agw954no9z6vk8bsakifarq8xqdmotbg75t3o583ig2gjn92f8a1oc1wzowag8gy3clm5kwz6nh63kx34hpa4cot1vfqxbahbiesiyoc82ij21a0boup9ltxw6n4b5joz426znfvh7hedrmsflq0mgjxvgz8o3asdys38i8x3vp8uncr0mp6951aqv6fvn6086399i9e92okcdenklum5zfj4zwa39a9cvhqgkk5immav2wmsymnp228uylx8dvl3fkqbbz5qvf0z51m4top5ht8twhsu161sbfepfka6gu5x1jxsvon5chcnrk0lfwrevsjif8qz9kadvswad35hm1yz9g3tth61aql5e2usvtvp8c2nix9918k7ovphhadfxkdeeijusdrdb58uiv6vczr8o57s2ugycyl8h56p7n85n01es0fnsg0rt3g2sebwovtt7p4up0djzomqlazmbdd2bc53gx55gt9122zl75wnn0qm89cysngjhxrxr6kz3pmrmin9b3vpnw10ziqsh0pxeigkex4e2sxwnibx6lt50aye2ydsujvkvdf8illprw5qladhbic2mts0sm73bord5d3ysh5bqfiznnswrou1ofeqkl9qwqh79tbd9d5lvcic9xusly78t5506iu2ih9kj7gylfkmdotxpore3oc5s74bxijmrte97tc1byy3pug1r6htfda8udi3fxcp3r8f421ck54is1eihvup35xxr1i853exzpz1hahn2py0k6qcn2cun62klmdawg0gqznnh6j527yhrira1jsgx5yssg3pqg5kxapn47vzycs1anbwjar70znsened8vkh39ynpvcpcpxkcipr8vvy5wmxgn84ew5iqri49mpi3pl6u8uwii4pbp9rmw0u15hlyxr2v3mtzf5tytxkzyso6ugndrja4b',
                proxyHost: 'jlq9e1sweyaz2l15gh7f4i2zobtwjm8mcwxykyiyv24tr9ogi6y0z02jyhgn',
                proxyPort: 2022730067,
                destination: 'dv9nu03se1ptu2zxr5qcjc01zu8kvjpsamjqnosxo694g3y0v4oiesmiss1xpi4u1z8woxnye7g23nars3ltgiyena573tg1xvljp11j2mf59tu88crqxm5veuttrre9tb1swbze9a4i286zjj9yg4apby9dr22o',
                adapterStatus: 'XXXX',
                softwareComponentName: '8fc5019e8wjtqo2jcazjthk586dk5mteaahhjaa1raa9tzch3xwmzdiar6cqo1egdw2r4wimbwzdr8ofri17j8xe2sdurusaauiwfbcc3pw5ujqrqz9t3akqc802hzc7fgkkxafy7eo0lveulnlrfklisc9dq75s',
                responsibleUserAccountName: 'ljp4hsbuy84x4cnycpvw',
                lastChangeUserAccount: 'a2fqmyzeu72nvele5284',
                lastChangedAt: '2020-07-29 08:33:07',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: '4jhrth0jp5eq4gn7jqckih3ajxcfe5vk0ldxkzcm',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'h47fln8f9wpqma7was1th3y81cmlt6ngk1i4y335ljn0iex9it',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'jz1rkx2nwgmndfu8av3m',
                party: 'ee8wiuop7pejujqi6bpyk3am8m23urgktewqwilq6en5wdfhj0qpmcgpt8a6hsg60ejixj6nu9lcujsoewtfofbiawd9n9zq9xdnlq6ilyp3jg3aoprbf0iy5vcqzyabh6wtu1yemsjwlnbun1nta9ea415jvokf',
                component: '1mf3l76dufmxo19099tao7yvtjrxz0nt4t7kd01z8o9new0sjhd85nohjwuuyijo5vwcc155i0z5irkzis4bp1g41hy5z151k3yeoidxf488vkvw2lw18lc7gwzy9g2qcdov93roznx3ktz1vpkfin4gglybn9px',
                name: 'fjti8p0bmzfcrs17bx25l9ug4vytb1oncwda4u31gqfgen3946gkpsy91g930cb6ai76xcu9zbtzpor6cfskgxidplvti38ww53756mcd2lshqohm5pfkrwo09dj5j8zemyu2w4wcneursmqb00rgxlh9oa4swk3',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'abn40irl05q33s4myqiswev9ugbegr54qqkvzrxecbvgji3lqh2xz2w7h5oqv4jekdu8in30abvqyu8xcsea0uqhu8zf769udlsylxdxv25covzribn6uydyxrmlmmc2la3uc2vzxnc01ceip4w01o37tqfvb9g5',
                flowComponent: '8323684jd1pg4lkltkdeo0zdn8n61cqesfgvgmnbrzya86ujpy0izpvidau2nupn4slvtvduzxzyv996kpb3xx2yidjx0j2vpotz8z91sj9d2hqkr3l7nc0hz4tm8td4xkqj7l8v1iibduq2qpske2h8dma18p69',
                flowInterfaceName: '9qrdtt15bfhma8ygtybtt8ikyl1go1fgbmsafoivbxi4qdf2fgev1m8tx9dau3h9gg5kbhaejid9713tut87qlj1yyz2ozc8arxkp5pufh92qb62rkwi5lk0ty0qamuxkv2h5k3p7xtwpwdznwzoaq1paaccrmqy',
                flowInterfaceNamespace: 'jzeasm64l8qa81r52hkbp1x5m1nz5h5kpnnu1qcrwi8wfd0mbeyx7ztpo1fzc62t2z4atcv1lep46r8fncy8ixmk4znggoel0wlr3w2z86m2lss2h5hepqu7nj35mfijtd5477r32u0tnjhgv7vm213zjojenenr',
                version: 'gqz4xi9sxo6paswo0i5d',
                adapterType: '3fvsh3sma6aaid1va09djvzxbswb2hybf95iwj5jop5vig7ab656gckze521',
                direction: 'RECEIVER',
                transportProtocol: 'ld4akqzbbvmju5mj33m9te013hs0y900tiv59kb4yis7hy3yaoido4ubqgch',
                messageProtocol: '0a6mmvvq6kqct73o2d0ir8z5ijz40qttsgk7xlmc0i1o997d7bh04qm5vu59',
                adapterEngineName: 'n46um9xiskevjvps4t6v7zxgf35hdgdp4zhpseid4knwzedoj8calsvtbq1deyf62cy831ed3uubszj0hia0u2z5y81f49zcz052r87l5gz1pumlmpzqqz4e498aawv622wvjg1luprae8lr7oh2xp5u3kixm5ax',
                url: '9tibbyio67f0v1jgwqeq9ng0ny2hayczu4vvwjgrfgopkkzs9c2owhn5mnecknrgxb6gbr50nm1mhigqt5e2zodrsj5nreu3cgvnbk4r072ma4wegbq5xfhd1k4shs9slo8eiymalh3v8ngusrd70fzbkca7i19di74yh26j6l8h24ufweoep6bs4x822ur62062m4tqa566diq1d3maln7k8lai39zd1wjuybajajmug8gojjwmkgnw5m0bis6v6hnhyut67sqmv1gsmenmjquc98zoqixbqjrfaztfp8ohb4g2f3fwyxpvuzl1ph62',
                username: 'odo6437crq74mknve2n038cw2uezmyn8z8dcx1dmxrs1pwoqdoa04v6e3pnj',
                remoteHost: 'duud2nblwc0kx70g79c3mzwa3x4x7xl3c71sdbj7e0rmv84j42u010dapwhro83em313ashbdujdr5mkc3ktejgy7kesk5xmt5rqxew0qsgctj4erhkomqf9i5lai4r84z5g9fejbxta0wlqcwsqzl0qwk7vyg0h',
                remotePort: 5347993171,
                directory: 'h2ursk7m2n5uqmk7vpmjlhm5jbjozux0hnpcesulsgljzrw4izvy9ymugj6asbmixwqqyxgi0zhyuu4y5xx05wgtdcwzhu1t455f64jeccowgtzhqyvlv51zanv2cu7wv18xa67nha7nixim8il5343yfsdgx1l9f3cvd35o03tkcb24jou5ain0v6fsr52qszqb5yjlqzgwq4gz8g4ec7vxkgtjzgz1ewiojxtgbyfbaq8omofjp30knn56j96uinfiizfu084877s6rrwn2hptpaniv20r1m3rcx4f9lzw0pvim42pjk2cgq53eu78zbrx5egmfwakukp43olyjtz4f24pye8be5xr85t50euxhmf86nzl67cfoptlke5e74cbtjjxrbg94bhgxn3epfpwvbhtrhy322jx9lye1sk5gfvugshcf9vmjrevum7p2vy299qge87wxd9p7a5lp87je8x5j3nsxgw5uc7wf32k8wy1oy8tb8pp8h3rdhc7o6rw73gda0py1mmlekb3742jtfhd2bllq6kvctlfj4v2m3kgxlxpgbzjonv9idz4sooqt2mlge5t70oem7l2sko0f22dmd40x6qxw1b7t70ad6nmza014jmuh3alqon4oecnegyyw01s34qa0wj35w9uhgxg86w13s2tr5ysdocr6cgju6aama5gjylidv10k97dqxgfqpjgpcacja4d9jzhtfmx7amk12n8lujddf349qu83scdjv5p13rlew22ezc6fu5ena728vkis7izt7d1yuy3yo51k52ha03emabxya9ercai37ckag6rpb1mk6s0imoybldh5hji2stg2j92x49bm0tbjnc3z0fj10x12inf3f3czixemanoa3ngd72h2j6xjgwcsx2ksjovud91ch8c1bn118udcven29llt4vqu8198tbxyvbxao8iandm4gh7ukytb57iew3sj59i0ml5conk8jayopeo9163rjkdav4f2yvehoh4tj33',
                fileSchema: 'd2mybbvnwrw8awg3uha2rm9k7o1mhk5x4zdl013v4t0wqxzd599ka75e3ezdde0atp0sijilbsn44lzur86d9jrie4yg8jexubiyza15brbwztgrkmlbqe07u66f7j2y153d1bfkrfr9s3vok7xg9ei9zyov8uh2rfn34qou3oo1ecbcniqpl1jtvnkd63fyziow0mfvzzolhl1nky2iomru0uo30ehx5gbrr1imwxwcfbc2ncv15knifugef4jlpy42b0u5lv2x01h7c3yd3fdjg8k8adl0m1p18yeykgw14ri6m2y5y101mw21mxvb8rrdqipfgjv3rgfoi2sf8z1o5cxiwyynnye7disdc56ygsrqkoldhwourfi6eeiqbbbkkkprmpvbv2wuj2ugaj736ewaw6opowy1hpp0hdhc7twlf305ln9lu1uo3usjyrl7l25bc7wiupo9u9uvydlo8lk2wj30aihfdwi8dhiov8h7gwte6ks8r7zsx6qf6sdhhpkzuowjz4k7sq4cbbpg7dk4bm901uqg8m5d9e8j9mpc6mtmomzf3fd0o0fd91tok22vkxx1nwwgcpflqyf5sje55hbszepq0nx9w628kiocp5ztgq2ogfl1k9q1hdpzund0kv8p7q36z5dswv1k6wxpgijexyp8iq7epvn8f0zy7r8i0tohr2yssjrrzprzn5qs5ruq0b3jblt3w2ejp6s09mtjig1f2l6ezsqg5aw6l5fv1lv7mqwpgr2xpgr7n00eiydp5y6ljthwdo701d8kh6oobydxby5cxdsqhrpa7aeftxo4vmg2505uwhfl8n36zh4tzsk9p7dgmf05sx3vhq02xj10h8kyueluwkswua95qfucunj2wis5o50auslwkmwii4yu931ok7sdytilqwh47rh5godvziwl1bn6l1rusllu7fbhyl8m90xws9tc84kf8u1t3neimahlveg26e0akcaqe5boc6d1iey65atfz4rjwv8abfm6',
                proxyHost: 'a63gky54a95d65uu2oielekoxff28du1lwhano7p086et83vvkty19c3ev28',
                proxyPort: 6717479710,
                destination: '6qmjhbultu96yay8iky40mutix4ze1730cgabmuisvbvkzj708wtmpnjvz2olutrbnc3qf3i0o6o1f6p3fuszrwfpgiv3n65tatc68vtxcb0ayodcb5txrbt72sg50o5qncqnd66paeosr0nqjx3aa4ejhffr0d0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'esefprx13nzg75jy0mrd1tsbk46hxqggrnl8ovkrsbral76aspofvrduo58vctgap6z0tjotzpppr3umaqjec5qf03nfl3q9e96hb3emuyta62w3x09ts5mi9glt6s72uizvae0myrawych6wo5qcw9x2r43phmq',
                responsibleUserAccountName: 'fya76pt5l8ddbqri805b',
                lastChangeUserAccount: 'xkdkls0zvsxzbtrwag6s',
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
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'lury88tfvu5how0gf84ce9rw9oibsapf8qq609y0',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: 'fir8fjwqnkxjrdglguj58a04npo0f6cme4abp2d0oghj1w2vyd',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'w5y3mwn3gv5oitkti8f5',
                party: '7kkf86aqhqh9o2c31qfkkhjvbnsxja5pub2j1yqxlagsx2iaxi6trmhnwx0al3c7a2m0my34e65snd1iskw1xadjg38eqsejounuk2ihs6vhy8ujri1ut11lhpdeqtmvw3bkxcki1sk2ldb4rl5amw2xjqifaaqc',
                component: '2ce55qa3302yx5ay4v9o0lsgesp1g92gik7up276imj9c8430wx1z3s6qi1njjrkc4hkpo5hpil6y6u754fd425j9vl5v7lgv06lspq06l2d9xvcqwmkc8oh5gnxncbzxyb10pe71oruir9u895a7acwdkcfywod',
                name: 'jmyazauwhrgnc7myg0nkam8ghs18a0mreutsalja8zp32ndypy6ixm3hjafrm29slvlamo9faartsal14dtruug6iinbab3r2cnh55iwrq5pzmwxfodhka8amq1ak8bcnfksyxsum4k6rw1nk9wmtbkg53aqgpx5',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'tybk7v0mxdy6kvfto4zn1d9fcog9dgftzfuvhbmwvtopfd44x7690nmsm8ndj4ch2fn5fodyzjbbfz1si5ajzgzqo9cto210muhxbdtcm1vnoxvjo3344duoa28fe29pqiku9v4b961ke4pk98b2sectj8brmt0q',
                flowComponent: 'wy1rt9rnw6n20ol9m0z4qbhl64hp9o5xzbngrx16hg5ech4zb6cxvde41855mjbyyg3qxowutqmtssee4auhvo3p5wdguup2tdjl98uc3pw5waiou03vwqbian7ivre5t858bd45pyghvgmumuguqtdceyv0rjok',
                flowInterfaceName: '715tw474j95qz90tpzpr5ur03enkox9i1paa6zjmw7v4yn31smju7d1ymswm8k5c8spp8fktctwp3ee9mfllda55b87kpn6hs204x44io8n5khreenessjgr35newofl2ms86dw1m2c8qemcfq5eir1oa2ru5n74',
                flowInterfaceNamespace: 'eotaui2sbmi78tyzgzrk1kq659gq0pwdrdf12exwd4ld5cx1qoorspzk5p04vcvzqz1nsfovq7w2oroyt1wq7sllo5s43hzt6gl6ocezkqsw8o1uq0fpqamvbbqvwxqgys2iwc67zmxjkbctfjsyec5macp0s9jt',
                version: 'nrdhg6xmazzatog1n069',
                adapterType: '2f45rxrmc370irhaelkt8eo8kc1f3mllzicxq0czhx6i43wc7lfz2qpoljkj',
                direction: 'RECEIVER',
                transportProtocol: '14n8kk0pkth6o9uy0l78uzutk7w1sn91rr42y1re75yew40agi6q3ah7dtwa',
                messageProtocol: 'wv2hw8j12unhade8fccli0g57j3zoxmns9qaojx5x2o09wme34nji3pz1epl',
                adapterEngineName: '1na7dj9yrqt98iudl0gsht9ua0ons44gav1ymxhvys66sxfdolauvw29khmeydtmq952gqhtalmwejin7of87kp0ckmdffskipqc8objyhobngsxduuyhki4auanvt2lbnecdhra6im903lgpiktrauegazye9vf',
                url: 'dn2fusfcb5j9i3n9itoqgsxyvy5e8et9gvrz7nvhp8ia3wb760ecgfd63zrzxlvia90gtdda2m7cayiojj87qdy7vtyk3j2ul4n24vfwt7emf0hlh37upuzkgaonvkepowol45zegy7yv3nz843dgc1kkv2ofx9qvjo48dxjtmt39kw4339zaax9ocofr9x6blgq9cb0scchbhqbuujlgn3bucd0uyqc4rsb0odsoxl61iexx20l686bziqghseghtspb56ybsft0sv32yjapa1w3fxh94koyrku48q4702uwi9dhwa76fg8or5vrel8',
                username: '9nrhnz5vd2cub2vof2e04amo2vp5e733v3114cb02229twmwf2aebtt6igiw',
                remoteHost: 'u98hjkmeu3vidnakqux8xjb5ode6wvqvho4dx20bdv6rneqy4p3udncms4qpyeu58rrhbx2me94ghmtarrcmo5jndl5s135akmyye42y9rcx4nd8p82gf4twnw93o2dacmk6ev4pbu756sxukg7zgec4b2fljrdk',
                remotePort: 4638311296,
                directory: 'r8c6t9bqdfxnmr2lmmvos66mhhj80a3o1ljzyjf2ukzrg4rixajvl21sjvn7q5m6ub9y56h29n08av04qm3mmbumkmtn4jiv59be0hgbr4ww35uktc7qu79kwa83pz71j0xla9q4f1brncxe4mwep9k05gp01f5krsgsofczynzlgkl91sh55l96pkhp7o4vgwn3frpuacdwc4e2fttwqejb50xd54at4cw6clfu4s2zamhk6w7sx2aesicb1lof5td6cbfpjeed6jpl76sygljigvsixzbxdgoy1lmish09d7sf2dohmokh5stwmdlipmva7754jlp0uzluig2p1r4lv4chdt30q6ffjv10gc1m4t9geunr1ckke4kolk6dsb5zvto4u758w83cpz2nu74ra5509zg66ynyktp3cuq30ibutodarr2aqi3oq8b0bmcu6mki9uxzrca0zvo4kfela5q8lpf1alpe4keo3ns6pyw2iac3t0lavml6mzzfpfj4mdf5zr78tpqt45k3vgi27fwpolpioqp0j3v9sam159lxsis30mfzvnt2iewpcsi074pk2tnu1aiblqqhkybk3508cou0fb7pwdvi985d7h84fe1uxjxmrscc1oeneiwi1hu16jjwmd8116f6in1scgu2o2vs0butqkr300fd40yn8jpgv7dhfydbvjztazx3ac7pw7iq6vcj57wjaa9xs3fw7ekoju5x7oi8ivm7n1tmspwieibwwwpon1pkfctqw44yd6fmi0i84lrdnpa1nyn3ls9jtxjsodmu4g9jf2cdu0iuswrmoyvtmin436l75z2cz0xj600drjm1dm8igsz2rxf2lm7tz8wj1oqnuo8vk5dgv8j8q0b1j8m7aek88pq3sfcg30orrmokw5oxb14epxgpxt3d53cpwprticvmxe9vwwdn1a4focn1mujkwvwh3ozym2zpaelozo7ottxugj02e2e9uo754aprj49vax5oa006k23ydqcx',
                fileSchema: '48pw62y28xz68zal4d1btuesb8ik9rmw9q76b50qo5qoo14u9ddwjiwgpxwgh0821f28fgdfe0x5quyszzjax291kgdue12p6ykcav6xkzmoe98mm84g9ppzi8anedpmlk8129oixi4hbmx6z97ihv4npqqpo61glr45a4clju5d2ep0jqfcmqge38r8gsta7pswzwn5vp51eqpfbmrv5qz3vgekm6uyher87bxwtqtkp21c2aonw1v8abedxb0f2a5uknf2lacmkcab013wb9d3pe8gn9suy0cshv8033eeo8myk8y0uouggktepstkv92xy831vbuijbhev1i1gycpdh3a51yjw8teuh3cmfvshzs63clkuhbfws022d5f3463di2aov9h01qogqewvxuaftr6sg1gl7onr8hl30nsdthuln71882wtigw871wsuo89ffjq3exdnqzgnj80oiv3pas1kviutknxf9v0d94yzw9beds4u0jypmxvjfn9mtao6tal3nn0u8206hkn3u1lsq4ynycf4nknubko06y80ep8sjkahaka1mfjlu001jzns06d4coua759y7stm0m26qtk9o6yyprar71msv1zacw778g9ah89ebtkhpxivb4szlgig381ikucbueasuk8ybl0xaf95y8fpbebze4knfwql4iqbqw8gvduo0v48xu4u7gw8s0gnacwbv3cv6fedwcp11m20wx4our746ku52q4obofm6u0z7wiwqdx9i0eaa9114q9zswrq3nhnvz4k09kwpoo8r1eyome00en00uhdfa8rgslmuo7g7i6np7q87ga4v934vosxz7e3chuornoam5kiik9siczq961l36k4y8gc9qcagrb7e6vghafz8fgz0ryyya9hhbwn1o8s01olv5k6eqdkvm4s3in9a52pgt5uwj4md6fxbb6m556uqb6z8iitoyzlj2dxerxat5j4jzzx01mvsj8xwxjusaon3wbwe5tei1t0af',
                proxyHost: 'dyiip4z0005y1yphgwrj8yl88qpnfg9q07vtaju8tnklhm0e75hy9in3kcwc',
                proxyPort: 9886272814,
                destination: 'jeoyvdndfzofe90zxj94pne7h8c91i84h61dz9mmv2npicujqtjehp56sqh6lrwklnfkn777w8k4o7bjacujsnnifxdkb85dw0qfckowdk8iagu5u7efykrxs0q4f36jklv4whqrj1ip0vikvv7h0mipt02n8iv0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '38uprnwdqkh8r00f1wjzf2stxg88qs26kpl412igr0ztib0g2g80dugpe5dpn2wp6ajtcfebpusugqjvbb8ga0ix2p5c4u1pzid9a6vbwrxx83490xe1yx3okjh3r107hntc8a8xh13dldylk8akcccfg46vgt7b',
                responsibleUserAccountName: 'cudotbdpvntwqsonxkwl',
                lastChangeUserAccount: 'ojs78ueewjbhojzxhr6z',
                lastChangedAt: '2020-07-29 13:51:24',
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
                        value   : '59cf5246-34df-4098-8660-a55e589e4214'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '59cf5246-34df-4098-8660-a55e589e4214'));
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
            .get('/bplus-it-sappi/channel/59cf5246-34df-4098-8660-a55e589e4214')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '59cf5246-34df-4098-8660-a55e589e4214'));
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
                
                id: '62932ef3-dbdc-4fe3-a6d3-1009b72aea11',
                hash: '4qf9j4bihzimeku6271j1ztt65ulqprc8jpbf7b9',
                tenantId: 'd06bd610-e669-4fa2-a23e-77b98e0fe358',
                tenantCode: '829poygxoct5xmdgwuctv3ted66jsa0xi9urdiraev0gkkn3z4',
                systemId: 'a096204a-efd1-49d8-b8c1-46cdd7e3b487',
                systemName: 'r4mo7uyh0g0rk0sbnw0m',
                party: 'lv8fazw91hhjdbjrrniydu2il99w7xl9yc0kqjwqqcrvw2067rsh1kiq7lovbh90qz977r87xwex347r2e05s9t2t6ib8d4n0ha53wu8eh3k9fxyfyxarvi62xt4wk17oyxl56erm9wr7uqf0s45sma10jtfbkjl',
                component: 'bu1412rvwi00c1ear0hg7vdsa96lw1qhum5af2c0anvyvvobhm9ig3izuq1empotla2tx87mahinxheppaqqvggxk2vh42xm8rqx63tyo911dafs1y8anxvyejoyfkkvbfc6utumd64mkj02fmrq12xzeysqnep5',
                name: 'zf7ieu6q37k2unzqzyuiez1rmra6ezmyjs2c9729yrh03sd8eqjrc5j6dkb93ju36f2sbirnjsk472ipzb18ovt9l1rak285t7vzt13dc4ciqjmmr629w970vult029gld038fh5foznibmra6tf7zg3ouz7c574',
                flowId: 'a7cb3dad-d2ab-407f-a659-6605310f4a37',
                flowParty: '65u7fx2zoel06tcmlw2ip013qk55oze6jpntk27irkzyin3v8h743hjqm5kmqtwx2wrj1lgi1ah5iwbku8v52ip4m33hwxfvbejz812k464owbd7psfb9rvx5nrf6xox9pm2r0cswtgw5aeu6gk3ftgtv2sfahop',
                flowComponent: 'kojtpy0nvo201eomr8r6rfjjp9o49v5k3o4x6j4jzlh5b8pycw8yorerpyodbu212fb0qdrqaoppqtg8zl7502qugd9jjud0htuf1f0iibllk3zqsrtukxk7zc4w87jafxpy68v4zbbgs9sitfgk4ddkdjqbt4b5',
                flowInterfaceName: 'hz5ibf1p896lx3nbsyr1e5i8zzhy6a35tyj00afgeo8xzar6bsma8jbaqx5c4evcxim2jiu6twpr60crkna9mqc515cfn7rdgp5yq6z4c07ktb1fhe8fr2f160ereunoj9ccj8bv5jsi6y8ea3ard15ngne6zjoo',
                flowInterfaceNamespace: '8x96iz6g7oof9fl02kivv33qg1h2p83bccvco7x83utjlnbyo1sa8e4zal467dhksvoxllefhkh9djp9ac5pueur4o02lri7hajis4opmrrekxar3y8adjjyjbe6aundvnris5p7atlfbi9kgmbrsbg4xv5ubnxw',
                version: '5ebbfg2z2owohrqueduh',
                adapterType: '8e5xth74iio7wpofju4v0685qoy4jye066vlofcbod82f64blygmkl7a9gd4',
                direction: 'RECEIVER',
                transportProtocol: 'clpcszisjid61re52vn2b38bxctc9k8ufnkdrtqnmp3zgtzv7baywd39yp6h',
                messageProtocol: 'wdiga3m0e1htneec7q366dwzbzfc51dys1hhw9n065ollic0yasbat21tbu4',
                adapterEngineName: 'gr94f65vhwb1qjawiun0e6au5tflok4yxoerr5m5jn3m9y4475909s04hvntdig21xmy0b9wr8zeuqmcixcp1n3avmz78fbbctdvn3tqeetu55lg0i5oli17t93hhozu70vyekhb6ot4ffz0ht7t3jiltww9at18',
                url: 'kizpuavb8rnifqtt8qdpu0ov3i6oqg7tebdkjlyc1lo3p52ccoi3dt93tl35dsgr1ehno6sfo998re2b1e9nub73r27cpuv1qtl18g3jyi86u3dzb1jaxz5oioauo0uc8r4cw4gc5wk6vspco796vthbvtgdtxghy4tnj9wglqwfwucuallinni6yg7sz79rlqmwnflhlicppu4igh2syyzx2l54cahxuukdm66e24x59aqk6lf7jole6fc9wo40nqbu277h6qrdlms6ttz1655o4bhi00fb4lj4zjoclkjw4ipweb62qdjtklc532gp',
                username: 'txo87bjv5oaqxypnj17gfjlk9sbky00imanxd6276lrqtjv0xhxoh6nk3skx',
                remoteHost: 'gijlzljo07nagbdxzshph6e1298co9ei04ah4qiy2zx1s072acj8iigb3bvl4avabq8qvmudyuesh21ikbu2bp4kv4qr78lx9jegfz2tbzpyncy6a0eu374td8lxmpj7yozdvjx5osx7e2qg7w58ib26ckemfa9d',
                remotePort: 4107973975,
                directory: 'vu4rzpeqclbnzna152yhxnao894kwcvejxzil2gz1z0qyxj9oh9mqw123yu02ya0sfxvh12cnquxhzkc4mh4tp59zm4zggjn7er01ddioi1dupcrd21cesv1clihgshpv5m8q71497w3j3ww5570o75h84u979gfqjj45dr2flytwgtodny8edjpnl8wlcryiqi8nxlfaf3chhs85v283hisx5e3khz1ud3vlvysiaii77wlahz09ysz1hayav9h1ui3ok66hcsah3cwmd794liekt0i6sekybbud2jb9eb7sqnm4k49emj7pzygrhxighalc8dvul6fahpauh1du9m10oeuwhxagm0yh45qgjmq0pvwxp2k6kjafwurfax1db8dkkb0e12ghlqu3252o36dnc8z47x3236xbz44h29oggrzzqhnezjzzkv3ndm22tkzna61h5oyfndwrdkfrps4sjp4ri9cs7dvwr2gpuadpqiv7cavsa19jfprp9s9q4xur699rq366xypg7w2bonsah8nyqpw9id7de559osvsu46iec4drckx7v8chl6lt6cpff9mvv29yil4cnlcos2aebqa4h31n219hw536m5mx9sa3p5imt7sjjp7rhvhvj0d0zdvduuuq39vxx3uecs099luub0m3ap4tyfmqpd0v1ew343qn7fxds764ceb59xqfn1v2psxnc92jk28grf0dbtvr6gzef2s4fk9ltm5av5cqrbi1ytqihnsyczgqxh08ri6g77h7dsp10zw1su1hp1o0b4gnwnawr415j65cuthtp8s1ojnrh2ubhl58498tkst5ci60o5ep7v4bdwwnyhijmdezzmszzacdz04lsw55r34r2i8c7u7o2u29jg2p0sphjc72bktv5puni1g9kg1eqw08a8vuw2lxmozfe4dzgfehuvz2aooyzvzsj6y5utj9zru2mlx4iltrly2c8mxx2yuxcvcqyyw2tqie25arx2ed67bzt4maxs',
                fileSchema: 'ck8f1xyni6nrmrmsxexvgyweteabzp9bx3njtke6isketfi56p5eiy99lgputk0zd8zqwq9upa2ooujzi6lbeaijvxxfatrik8y2gbcy3e7oz3x4rxthv9psb5vs80y5sik6ceg5x1tnvzwyktby8o7m6mnex4mj142kt9jhundmd521gmjh3oararwh1wz9cptf4k3uvwp57je0yubx6bxjrzeafk0zo15txnmfcptyj3p0fn530mx4hj4ent2x32r294q5n2an65a8cdspjr9n9ffciq0vz2g3ouabucpcte4yfrla3p79n419hty3pis3ong8eew1zg98ib0i2srsw1s5i0z4l4idpr38q41uic59x3r3bsq7diwd5pg19v41zyxltu8kie5tv2n5vowx4yrs4x7ch40ow739sohcvi5x4y2q63d97l9wa640dxsxlrs36vi5fdv0lie23s7z411ae99h1e4d5xedlzqqqk5xwr0ugywm6sq24rmuvf3mwx6jzoh2u9etoyr567v5xtzwa0c1plkkh8ykie96t69juaxv28c4ym6cxnrwdr5noarxx32417wl8836pek4pgbglzp0dj0ss0ns9gohx74y8fgjmuc5pu30i8g8q2t4hjbz30ymnsmzwqrb4x9o4f4xvwbpczskat3a8bhib1v4tvvy2g92vtc2gp9505dgmqjja2f7fmkzqo4axtisao7w057k4s0avg3yd2rlklottsms63fu39iph2r2hgezxujkotpxfv9o4v8ox4ez4vmijasn4mdb3mjjfiyaimospa0j0lrtjawxaaknmz1exv1vxl7nwynt3cf1dr6i9ixsy9mbzsdzjagq3mb8drqcaw1q10dw4go08nftb2mpbjjj3qmpjw6mkp95nlucmi392ymtqglydqpuale1w2trvs6n1mubnr9g61qic2ohtjhyb8am6c5xsgsbf5i6u902eh01bxskm5w1q5d73pdr2ywxauss6jlklf26',
                proxyHost: 'nv39cnr3pgs3gn65awoywt4p4vui52zrzfvxmi8ge1kt8xsonw3r9vk6kam6',
                proxyPort: 6234786474,
                destination: 's1dn74v3jykm4jd54pgw3tbvezj5os4m0dyibbmbx350qzp7vwft7jq8ax0rt0erpvymc5uz6b4duxeqau93kkk9bhplm13eodmg0s49v62vcohrf03a7zvawfexth0vh4veh9oy2zw6qmgv4kjdqleimp2yumvn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vlp25nwv541e1if57gr4kavqjxb6pgtja749o59i8976ragqaium8jpv1hls16umrwlcjxs5o2l8tmj79av1tbnr43twh2e7jmex6i2bztru0wsqls433virkatcxmqewxvsachlajsxcexlt6j5evdvxk2l1rua',
                responsibleUserAccountName: 'tp7u9idma4ongg60vlfd',
                lastChangeUserAccount: '0nspwtz260pv98070n5m',
                lastChangedAt: '2020-07-29 08:21:21',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '59cf5246-34df-4098-8660-a55e589e4214',
                hash: 'ompyfoy9ehtsso0cd6pyw54gp0bswtlug2wx9jwr',
                tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                tenantCode: '4iwxkawlwdwwma193vhp2fpo25uzkr6yiip1kmp8kipnkvpixs',
                systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                systemName: 'ofn790lk7y41njfamrxc',
                party: 'dr1vwaxj3v2hjyjxgmy0acjzvmufwb96qwloqffq6eqowjitql6dpzf330xsoo30c43bxw8989bif8mazxib6i3vgqyb911kpprx0lywhvlj2e325c4jiw105y5wlrva3fscufnjym17k1j6y5srtr29jez94n4j',
                component: 'ncl5y2ct7ly422ihr47d6rhux1hdtx9fcn876o7kpuedhiihkj0tbnqhk55tcwaesknxlv9b89zx5doxzb2cmchthoz5a35yldpecbt5yvwnus2g05jnlqxqua2w0agu28nn0w50250g7zefayel6dtj3bg0l0d9',
                name: '82l5o76z6ye2bzw1h7p0bzokns69tg0jcn1ix2x1pvl6vh833tpsj4pa4cran80we4mhhrc799q39nuv84xywosmvnxjx5pcl4p14n5vmk0r7mxp5sxbqqht1ekpun1a3ei6dnghyoj21m93qf88rv42ubqw24rl',
                flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                flowParty: 'm6g1v3ygp60dtsn7w96csv3cgguy513o6km4ykl9ermh0tmra7kjtylgpdr6xv6rcu8lhe6ujhwpskkq3lrbf4u2vr9nb88lo0rzzg84w1ouja93nmn6tsndq18wmsxbld5rmycg514976588gpsvn6t15s58hkr',
                flowComponent: 'ad24r99hqrqcluf5pab4x7h2bwf4kuebcyq80eqx6z3w9tte051hsgy5rcl23txwp8jgqz8k1bbg2f2ompedt3a171tzy85to9boux7jmdwpsfe2ydhdzzsv4g9oqwcyjxupexc57hkhq5xctz3r0g8ff5aghcm2',
                flowInterfaceName: 'gpmhowp4w33465ve8tgalo5t0d8xt9imirg79e8ufmvp1rvvab9ek5g8c70l82qbt9jetqxuunuajo1vbaoavt0sttwibi0zzt4zp874cgb48ktmepo3y3twj0k8wyrppfzzcgxre10iblxiqvwxdi33xontywwq',
                flowInterfaceNamespace: 'wlllhx1bgd7mry2goqv9ysm8v8p72mknb5ifx6c2kx89qunk8v6ebhqcvo2jhzt7xvkqgi4htevk0cwh85s3jqlwwo511y9fbwdu98mgy1g3nv8hypy2qt86vkkwutaeyeof5kai9f4qkzhf29td4w16az98uqfr',
                version: '7izxxfxvpu1v7fd1fr16',
                adapterType: 'bt7m979ngj5m211io5vw8jxqvn4c09hv6xqqyk2y2r5ooex7g44tm1bldw8d',
                direction: 'SENDER',
                transportProtocol: '1kuwt2p9nrq3e6mimbqkknpzbjngx7k7clglzwzzohf2uealwyg3c44i10op',
                messageProtocol: '7zmgnm5ysyx9wdqpbtyo310wqf2demm2e02h7pgj04vaf6tfntbe9ai6y9ek',
                adapterEngineName: '01tposmjumkym217isxdxfqum6hufyusucvicdn6v55sxxxsv5rog5kflxkajkc5nr7xgq467p2nhj133tka2u3bv3qjs490sf56b8w61ah17s5zj8r3j97wtu0qxzwu0qq3scgn6sur9arhh9oqg8cw0bmennoj',
                url: 's226vrhyaqlr1qpolr6j6e52grmko8a6kfe70w61chn3ghmxo1klpfawjrau21fo52y6ybel546yp40jwwk7lnt3quy337mf46fu6ekkwdeh2tdyd0f0s4y04cu7o3ak4ilaz7ugte1nee1098dt40apdo8pvxzbg0ln9r8nyu4f4xx4dpyahh448zw7fmsme9r7njtulf5h1rfz8fovug34yy686r9wy1kh2ie11wzef7g8ifc1l71khv0pxz4ow0uuoedmw9klalzrspn57gs4rdflgqa0jtzarh3izxdan7q7xwrjl7yzplfxac4q',
                username: '4eec2k4tv0lbk1880mucxdcfyvkr4lrdl1opqx6tc2ed8x9dq620vxog1dlg',
                remoteHost: 'd1wl8axqtqmlopz81z0yowwgm740m3i4yoob59vtcxgfcrrr7t99ecr04esfov2hw4db4e6wwvct54qqs8pnp1zexb2yil42sk3wip97kqoartceim21qn07i8d53jhs5wkjos8bigsvu85b2uiuhs9u3g0id8mm',
                remotePort: 7116965162,
                directory: 'yb8iirdse73twygj7kq7n1ua2vn2e3fw6f4saumhdvdxgx3gv9h04zhnnhfgohsmp8fvwpwewxedthrgfnant6sot3wzmfzs282tdojbfe6n3ts6uubc85tlvp8qq3wt7i69c39gyoqujs11ojhh9oumphu8ardmorb4juwrvu4ehkiim97mvscog1caqmgkjb0kr2o1l4qfl598w5eazgvlf5b0ffzr2z2jl7n4dyok5guenakzk2ru82etul9nfbn353yh2pzqs8ds4iv7eeqskvfbem98h1qbyyrgz4d7eao6jcy9yc5ku78f0dlbca3hhvnyd75o5914rmna4c8gotpiswb64ucx4rnf1uxrdefj4c6unnz6jfi0b3ug9v1ffefmud77sd243qxh8xqc9yp7eohvolfr3b4inr6oia1ucdfzrt5ab2739uewikwp19exykmqp3hvkmwetfp21x9wjngbied6t8on5j54cy9v1py6dzsov37zfe93iw0q7x54m7d2m4j0migif0bp5zmt4osj8a1m6lxvfnbiilnujcej2q6vwppf9r3vl0gv1mmzoytqda9crl3g1s3o2louigtpn9o35265kwyuy8k7iyfntxz684vnndwu6qrhmwfvrp537lqahdnni1zqbe7n9bql7t5okmral4jdocmx88zkrfoymr9ssqk1d2523upoabvoviwo1d906lftvh2qpb251l1ypqaahiiaceonperzrktjekbkf7wyz1x91cxdca4msm94ymixk7uh6jp1pfajj69qbjriri8ds2uuzs43h5f5z35int02tzn1ct32k4yzqfcdo5symwaikcgp94q870rbye9yf73q7c114iw3yoafd668vdbl6z43h1chnlnx0badivpqzjn145w3hqt0we5stsbdzqx3subk9n5668ewm54m07ng0cwpoa2y9hrka1lf895rkejj9w37mefj5c5wivzkr5482ijd11b066ldm0kekz70',
                fileSchema: 'xmjdpkvf0dg5en7s1if47w2c09gop05ktgmgqnsujw43g6h4wkkphozizqsnafzdn0r0qiprl1dczcht9kwonucoxwxw3140aad51gd93ua23ejowldp58jy79up13n29leb4156wdqf66vi8j2o1stnhjyf5pnfolssei09vtkpqowcgo9g8cqcma1lk1ilosk8kh2sed0kuidfl8oihfe76ouzul9b65uekf394ss9nxisfg7u2q7olvc8szhzk4b0labrrn1xl2uo7g7rhnxg0a00kxmr3m7ye9pugcu684qy9fmtp6c469f5vzudr6xu9vgunr0x75kw0zxsepw2nt9m8nlw4hn0sfep1t56h6bbjkod31rkrnf9ohc5gf0ai7g129rjjq1398e7dv0rijbimid7gj5ux2k0rqu90pvas8zo7duh002c2g7hgigb8u5aepj5y12hwn1vd499lsl4mzvn4crnumh6rntxbif3kgda0opuuwpoq6zzwm9smzwn5aeqqhjec1habzvdg1s4jvhx21wd8nxzd6ejy77pu5jetzzwnf82s8jzmdb1m9evfpz75l1qa0zrdbtue1mmz6n25364gnqyes9ceoh04dyre1b52x3v7l4hy481ldmm2ryhk0uvdaak9fc6ngakpiznrgfu6lnbja9zonc7zvuzvn17kn0iswot8mb99vl6r8dis2li4p5fwcd8febr64wv92geu68hx06mnr8perbfp2afstxuqmdjwh3g0hrn66mnt89vjbv7yj3o00vltngbe08r3tozw1zg29xpczzdtildjk0g8ut6sh14pldpa00y9d1m8gzbc4c1cpqovqen64rmw804vf0ok8tvbgnwrmu9vhe4zj0exvphqpzlym1nbdbz31hl5lvlcklp8xbz8ytuu7az0z6tn9kxq506z1g8kk9h8gua73my8mqel6dwusjuixa19kv44tz8gggh10bpg1n4xp7ujtkerbfu3wcxpbey4pzg',
                proxyHost: 'h7ljkytyhm0m9kb3cdpquq2uh1ju8qibvj0zt6weys2sk7lrxz3dcz2qz7nd',
                proxyPort: 4753659124,
                destination: 'wy68q3zbfkon16mkza5667lrmvzy3n91omel9z8dbojamzh489o1jeg6rxguhmlr6uw6q8cihe0qmgw17ymvc3kqexasmmxsn90fs3dx2pq28dlxbby3wku603408261fr00yywt40juq4chneicihmtj6icy2vd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'illx3ow6jfqsf9np3kk9tjnmsblmixqdes4tuc2tfpix8mj3al1bd2pla1scs6fx45na9aymkqmm9z9vjz8dhq78k0l9rsxxbmt11aicmlwn7fwotnsh93xn9dcsap7rd1d2bwctt2xqydqb8vgqz92ytlt0b4z7',
                responsibleUserAccountName: 'ezm2skc2jirrekvrr7y2',
                lastChangeUserAccount: 'ed6g3i8a038un4uvdvo8',
                lastChangedAt: '2020-07-28 21:13:12',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '59cf5246-34df-4098-8660-a55e589e4214'));
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
            .delete('/bplus-it-sappi/channel/59cf5246-34df-4098-8660-a55e589e4214')
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
                        id: 'ac7c85a8-0496-4b3c-93df-a9097f933085',
                        hash: 'qdlrflzp9qpopgh05ucf84lvwmuqoczfjmaod8db',
                        tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                        tenantCode: 'otdf8sn7oi0ir1xztzh3h5c7zh62jlyssa5abiev1h16cvrwje',
                        systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                        systemName: 'ta327znqtb5isusk8eyg',
                        party: 'w28b1wdl7mjyfp2pvi66afm6xa5tt5y2xr00o1j6vsnzscieq9qga8cg3e6jl5oog8llxy1aijsvpewqzh1n3kwcm6uvkdcwaktuey9krrjsqy11imczj423hxue5eq18bne1s9hlomwfwmnmoen9j7jn50dcmyn',
                        component: 'va17kepevxhqberkk4vo6ewjmltbh05rn6n84od8hy5m4uc0dxlpam1h1hoqkr6gogbxzn9pvbzvk3m9tg0yexa2c9op1ywoiesnja5z6y35hsu578n2u23vg3jbkwz93i1hs4wnbxdjitoanofh0ld8qk2cu9xc',
                        name: '3ibadps8ebud3r9975rosfv2323aq816pxehzcrux04peioiv65806s3nktlsw4n39xfh8bdcaxpf5vke0e2n6v6hgxotebio8d5nm68049iyodts42nqtbysz5zx7pktqrczktpc3klvd1t6k306cixf8o93z0n',
                        flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                        flowParty: 'cg4e4wgm8og4hgvf9mqpt2rx9avf4sfy63yffmq7lolz9yr3z0b3jj51gq3m9bd0er366g2z4br95ek2a6hoam1vwj5l0qqtxvwf1ta3gjfilqqwnsdclt0h11fuuk2owkbgou3e4jgsaejj8d4muzmrrjgxu1dt',
                        flowComponent: 'gkrtpuo6a1dpy1uz1302mtt86205rbxlh8ja8pf46rkoqxgbzo5rrugzo6fh1yfzxl3g94w90dvg728qj64i2eb4w4ke1e0sv145jy58sgqbwpfee7qzfpenibcqvdto8d84tmvlacjch82qjcxf71pxpv9yghla',
                        flowInterfaceName: 'in82wmcn1h54i6f5mvr1yybxbpmsen8wa5c5zufew4vj0eqod8imr21970tn2rh6ym4a273pqsyy1puyypmdparfntixoubrdt3o9uqf04kx8cotcoo0b9pdtc7hsxz7sdsx0r4eo8hz235td8havjc1s0rp7lot',
                        flowInterfaceNamespace: 'yq78h3ejt0xq85lai7y5e6plakmxnszair40nvbwrq52td51wglv0f1s36mc72yeuxmarjq70hdgoe7brxcaqkyjdt3pr0xto9l1ltau4706cz37o8n10a9xpzwnty5opcfejrpgy7b5vx5o9awuudxhhn3s4rxx',
                        version: 'hlugehk42f7q0cjg90ob',
                        adapterType: 'ym8sfsnwhdpo3ppmboci54vuy0d7mafrljnp6w7pp1l3ozrep95yzb5z7199',
                        direction: 'RECEIVER',
                        transportProtocol: '6nx0sm635fa3uuhqk10myoblx47wato3ep4hxj12kuxoa42xqvraxccxr283',
                        messageProtocol: '1cjnnzdh2d09kawt4v6xdpu2kjhu1mvr9uwtjw30bo0w3nurqatrd075l0vt',
                        adapterEngineName: 'wnr72m3ojfdva94fw2gxqyiew8um6stqnat4kkaui1hgcjtkvob4r2rtasgrltv4dg6njugaa6wqssvdp4zckvljtirqaehwtgier8dk3drog1qntitao1lthihkciab8sl6mzjy95137aivuuwzf98prju1wupj',
                        url: 'tf8nzr4pe8strl0t9xamiku3dnv7l7h6c0pajp3t8v1by0scz4nesxtbpy7jb7syrham0cv5cqyfb6lhto0etl2ypxsyyzobx3fsizulcfcapzrc0yft3n4wlrr9bdmmyvtggi3isydadgyfrkaoci0u9rmrc7pkb5adr90ezjutaj6koc3mmal81u9toqutejj9vi0y18uvhexwk703ocut9jtgfgv3ni1pqo4s6hho4lbwgp6gk9j0sfl31gfu2bkxqaeuvfmqsnqxjpp24kqbesk6ll90yassgpjtpx81r38y1vnwh6ur026w3q4m',
                        username: 'll0vdyuohdx43new09acq5e2awjqwweqvxtvc5taxkpq01skhlv0gb5z9qly',
                        remoteHost: 'c2s5aq1vs0kcbgkb7u6lxpmdjg85d9jgcxrcv80okiriy1kihyqd8odovsqsr6sl5gk3f0bt7lhp1vo0hwrh3tq2jxbemb0pz032szfhynjp5elvdbqi4ni5nuyvons9h5g3ty8oa9r4xa4cvd00xloax2nxqoh8',
                        remotePort: 4658567702,
                        directory: 'a10cnq28hevj0h8qcx4aj9aglsdc9e81gpamzmik6jcnnkxyq06cgln9ajt1lqqb3ihvnmjc3687lmkiz362iam60tpagrbzq49aqwy6so2gyk2o0ygaqlxe7yklg3irhlus06xd7q142hpfxpxosyveui59dablf5tc1kfs7enclsa6uygweokkb7oufph9a5pjx2ev3n6f1q0xewc0agfanp7324c9koqixo21scwzheenqrxs69oyo3s75ohyxdkcugoe8h89ony2pchs709hpx0vqw3j55al4v8wwga1ueext15rc4pvtz14b61obkmy1dpkzd6bjq6qxxuva4s7l312fuwvgz8qpvwipemp30jffxynhrc92p1nx2r78bgfb3435w0pegoz2hg888qwyhwug9bo658jed0ci3e63sgb3x7st3k7z08yx0xc6ex4myyg7i2q07k8f1j1samfdb7gwbhg3i7ly8gqpld34ziuk22vllj6k3nh9impdyr41kwuv9tpj3wxtwzt9g3kb7bq0q38lt9j2h70wdem3i84hs08judib2b9acng72ll42hl950532igqczjsfkbuey8znkyzafmpw4oqovjcrmoespfvvmjgok4ypdz4uya5ytpj6zq5x32yrn7leul2wffxco00g63gktjvxlqct8y8jc1bkz1bq7k4a7itiojlpghp9w8jftaginxor2teyiuvmfwyesfkbon1uq701hn2ktvcqmr407pwjmbkzm9ghkr82tyjt2s16l0amc0q2hh3bsd1k3sr0kljobzidmuoea758hun1jdidxxkv7x49hywu1eyoi6pyqzq7duerjcaax0ogym0v58e7jq3s2jg4zjma9mbe64xy8dhchvq2upg8p5tbi96kkhclu6fqea87rsasvtjbwwllxur25dd5ru8mokkopm5rq6ajx9ol8blschkv7gpcg8b1e8n2w66lp8brvwmqjlm23twxannxnlzd2t760m4avf',
                        fileSchema: 'dkmabceajlm0u0iik75kp7oiyr28ayy10kwufkm2frxxig2tovxqrdpcxq9oslblvbyyjod7c0rp2c0q90620d4hfpdexpz955p37xpcrohnkbgp3fm3zmr8q9nu7pr38eik796kfxn63q4qpfo2e0cmq4bb1k6wrf16jd2r34nkwdqqrkxbxs5c1p4xvacq456423jnay2pljampski9dyjqzjbz4o05faxl3cmgyg7hjq3q29k9bsww9tq0kby85tplq5s3auzldihfh5nixnyz0qzupdjzr3ommldpj7xtmjj0a8i96vpcis6gse67e1pp7m9c51jri7d9yishtktc3s7vghu9k57d96gu5arv8nyyp8psuf777yhn5wi615rk8swq8slfbmo0wapb09q9d5uqr25mgacscbhifrfxettanvu28awm5xy7fmcfe4h5w56tqv19j35tx4p33j8592z8kdb0w1ab7t4no7l8sdzhverv7zw6sn4v4fmerp8s9vx77f6ni5vdq40syx958bzo2iddltkryfwlymcvef2ddvth28hshhn5omxpl0rpwompe5c68qs1asleo2fbolx1rape9w55eknney5qsk4x329qcs3804ry148wweic1fw23udqtnc0pq4a3jf8zrr2svq7rjnwuyv7hg2c3jpa052wob3e36jakw81sj87vtrsx3ca4gvydn9db996v1b5g4ltq06fevdg42wr3oc0cmashvw3tjfma5yndcf6tjspwxlvg52shqfsa63lwv77i7lp3kte9apexk8ag4fiy7u6mdeu069vo0kt16b66fhmk9jskyfhypnj4u6lvnpxir5nbf786juxxov59pc62gm3ivg79mpnwzskg8mv4un0545tauj7sga30sqc8qd4pfkol316cqfp2tw75qlnp66eu6pjpd4ph8onvq6u7iztbps9ki5eoaaoz132afrn9z94yhtqbnsgca9lt669lw2ueb7zr9h8fkr',
                        proxyHost: 'tv95awf7rdq0vi8g0aspcf92upzhatneepyd03rbnq59vixktoz4glk91ep7',
                        proxyPort: 2578618100,
                        destination: '9daqibmgt8al7s625un95gzp7zhnxhiilww59cdu73rkjldvdcl4bu3qxi7dx0nuy495tzysgwg153fzzn949d5v4e8zrd4uspga2l6a4ke2bgmmk7lz15bjqkghcc7ej6cpzwub7obijz1z1v54n7v7eb4jdlmm',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'c1z0rssr7yjqwuiwgwnd941zyaiqgk2wpb8jlnihaaeje7fgvgfvltsteo17metohbzzeovsgem6vf1q7uvacbelhoo9957r9sunjxht6d1e2ipef7i3oh318w7g4l34flf8b67cfzrrc8tusvckq170chemohm9',
                        responsibleUserAccountName: '5vy9t3dibo54wljm49wc',
                        lastChangeUserAccount: 'ccjvzbhdn0sv6rw8rhm8',
                        lastChangedAt: '2020-07-28 18:44:34',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'ac7c85a8-0496-4b3c-93df-a9097f933085');
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
                            value   : '59cf5246-34df-4098-8660-a55e589e4214'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('59cf5246-34df-4098-8660-a55e589e4214');
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
                    id: '59cf5246-34df-4098-8660-a55e589e4214'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('59cf5246-34df-4098-8660-a55e589e4214');
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
                        
                        id: 'b08e1522-3c78-41d8-821c-224986c42673',
                        hash: 'gkoa4bucg3vb4ewfvitgsx5k1n0pmrlnj0a8blkg',
                        tenantId: '4fc38c49-f73b-4f98-8bae-c5a4e51e07a8',
                        tenantCode: 'fffos60ff151p6maqt89iepoz8bjegrj9qgzkf36jg6ss4msz0',
                        systemId: '503a053c-a6ed-417c-a541-761a24991e28',
                        systemName: '2t1ljziw457tt18ftuat',
                        party: '5bw1sn1nutyfhlpzm0vehgl23kbq5x77fi7skvxhcvc6u8jnmnkyia68e1eqmeoye445hhdm8qfckzdw7zrnzeh7ylpnui5m7edi4f3fm4gwk2zu6r7xn4yikdfyrjbf5ns8xi1bxcq8hyizen57pe9i7a65enlq',
                        component: 'qvfry4wp87pl416zyvsiseyz09qnw1db16m2qmi3cs2yn9gp15udsw8e45a1t8v3myibjia1bmtzqzz49m7cqrinq1zrgihd2pppn3qzz1ua49v3ppbxm6opawv20x2kfx0d8n32u02oro6yrncf1i00qkh4rbd1',
                        name: 'oc8vwgxeg149mvv2sh4trtfuhnu74x2c967yhs6dxl4mbtdao5tbtdym702q8tpyimn47afk9frreinxp0zu4o7zh5f5cebceqks8regjcjlv8dzxd5al688a6ikcwe54g3a6hsj0rzjcehp6nlbnqdcmzy8ubtx',
                        flowId: '749da2f7-c345-4a23-b081-476d8f58f164',
                        flowParty: '7i96h4tisu9wanyrb04iy51zqjhvpa55mxto04kogvdy92njvx73dd1lvb8arqcits95qcuki5zte88z591b7ep79djmsrez1ge3eify4vndqqmzki0ule18h8daedohekfw24ppq4pkbvqdz19go1w7tf31dz42',
                        flowComponent: 'pwwxq5qm6352hhgkt42bj0y7u5mkj4sg69470t2d72ezeoi7dbvcm77d9scdk65kk3xi9va4zhawq2e40x822ow6174lqgfukrlgreile0sr2yox1zzhikfvujcy3qloeewkwgpu966mk61flz1w787qmeifu2i1',
                        flowInterfaceName: 'pbns6l1dpv7rsu644j1bxgf8l33r5czdrcv2d1f7mwglubpeo8g80dmlkq3t3czts4aycx66kwaxd8cjql4gcmtcjppv00ysqa5vec9cdhui6hpxysg5ir2ughkquz5w0vwjl2hoe7ji9eim5h76m4s7y4z9jri7',
                        flowInterfaceNamespace: 'zzvwyt46qx1ylv8nbnou8nit1frwieql619bp4pybd0pqgokgi2q36a13x9uj4zb0pagr4uio2argab1x04nhg7xdlnzegm2vceia1189xn69d33u5vkl9s5jd5l08vtoczcai4tvmwazsp983l1dc997nkjm5yb',
                        version: 'qh79qb26wklifbkkxigb',
                        adapterType: 'fwnohr9wivr65yvfz53nvfhjz4h3v0pj42aed42f66fb0gmygf2ort3eand8',
                        direction: 'SENDER',
                        transportProtocol: 'jrakr9v0j87nhqk014rn93syfro5pok7yqm0jl95o38knyjrqazl8qpe9m66',
                        messageProtocol: 'c0cxfwd6gdhamd1it3l6n5ge2nqk8fxynzbudti439zj9yule2ebpmiz7hm8',
                        adapterEngineName: 'ufuhb4wksad2bjumdmigvt3x62bh7l7eyh6x7lkvl0adhx4p1vq28itog4vna10ydwhoiw00z33asqeihmrhru8lwqkaial0mhbq3tgkncsvkos1o4xw4liwretu0ij1seftrg1pdqawa0tzglgxzs5xbwdzxdub',
                        url: '7n15tk60z5t8gu2x3qtbg1r40f8b3a97l794rt8g3r2purp7fm8kd4dsk0k0orsbvr5f7wbwxi8qgah6ahnb3gvjvwn9m3srhfusg0owb01tpx54tyic7kkg1vwtq8xxbrgygj6it3ugwowcp7cz3pp1qccn2n4gw0brrqip62ou5322m8yeb80eo9jz1ebhtucfggb0vp686yjhygkid1tu01oxdidm264m0402cgv6t1bzw7grq8333gju5b2q052y5brh9m887hhb5cgk5la4e4kuebdo595oo3284b34gv7z7rdekod2q6etce4m',
                        username: 'jfrkwrsssdysfex0gqv20asrbxkl8fozud8nmykam60j6lcmosozmxszwz2z',
                        remoteHost: 'ux962kbbbcpghm85fuh1iih1747z4ovxa7m1za4gfdp76eqtm78ccr0y1a5wipnf33ia9bs9ihpdjj5ids9qcw93qv7z708gjnpbzv72vqfieg0fvaia95ah5xa3fne9ed3j3yndyofw5nrwagx86pwmojeea3cp',
                        remotePort: 3981338412,
                        directory: 'ehdme90pagv2v9g9gmtsiz1949jtr5ziuuyi3dt4mtd7y1v4w01at0zehvivczfpzyrau6n809iwomydx3h2cxd0sg67bi4cbfwq4l0fwkb2ah0v2jk2761khz5j9a7mqov6p9zfbvhffmsx6wk9u5fwt6x8wm6g9vmizv4ztabi5kqbvepjburqsufggjhe520min8i3749y6dgs7148dixva9ydm9978ag6qexf71f8wc8hc745q36cb3mccwa07zgbwj2d6q27qfd168abpuch8m4mfkrcxiboqgkd6lcypwt2o4503hf5onp5dpk9jg3csqmui0hy93s2jkjnm5ulcsod4u18et28r8tdi0yzetmgfxsc2xhh0dvcyu2lp0k2qgyrewm891u0jrzsp547w8dv71c5vfenor1pq9f317uaoo06qckf157gcr1p7ye1uh04a5l6doodkecyxsq1ne3cg13nbdt2bddcnfagh3gx7zfwsotm1twpweewje73xct8n3hxpiit3zpo9ompst9xyoeojnuonjm7dkhxq4v4h1qejpta6ys2p57jhx7re5vcey43ox2ir25e5m6itccjbrmfoshb4f8bctlf8kprvbm4pxdiledatyi1l1m9p4ak98amaytonegan71xq9714w8df1nvmt0nuldi6kll7icjqukc50ply0zpw8l2z709y0y58uuifstgdpltkcw8eqg6lot2st3r0qzpjrj9ghq89hqpqz7k905vwmkel7m1el8uz89qelzyjxem70z29x9fy33mc4eaho99wjo5vj8v37n41reojjcgqqvd19d9psh0i8qwbtehfswyf094l4tlg2npmpzl0xtcpc3eifauq0odjyy41f7c3uhemgv5arrgp589o509xyhexlwxhpddpxihhzk4c0e2rnpn3b4pzx21vcvn70jk3tugpt1lmjy0cfzlo2xku69ik9125pxbhm7inocksdka11j0kd4p5z90v7n0z31',
                        fileSchema: '3kr6c2udkvuuba4epekd64dbn3edbdzmqfaf8ozz6w46izbo3tyzstcepes0n56t9acwliy27ajv7whakev3vedv08n1pjrz3k025kdzyhdmsbxnxhaugxeko5r8wiveevo9h9cr1t54wjueo0tltls24bt4kaa43vjwqjuxp5jh6asrtk4qq9ev6a15xsjhs5197afpr7f74sro95tuizjk6ysb1f3w5x13faejnc4da329htxotlstf4fvc39h6ehektb63er3tuzm0fht1zj1u0ev7z5uldmnj1xkgwrw29kum77m08w7ma7xps0q2jui3f1yzrhxobf31lc5ci5aejuchg2ioznqzm08k3bzsm3xjnnm6uvkyz045pilhxw8btqy8fs70gsa7uvsvu67qz501n1s8o2lq4hr9phab3oiamfongw5o7b0i73299w7zy81ovcktf7zt9z1iwv4ewck5isw5jo5o2cix31qy9nhrnnfslc76grbcvaw4lw2oob5y16ym6mm1c9346hpdikb79h0jynqi6fgxxfkt8qi7sq27enai5q0z6nclssz85ft1z44otyzcirmau9n255ggrxwtgxuv4p3uqhazvikijni3rr6k451d5lklkssol5qmaoi7tpwbwlh1rsi1hha479hi7rs3jvziu9fwy5emtrz33q0wjmm2cjrmrkxh65ix0gvwu89vxg4dewaejnd3azup63aqt5662d5xmlgg22j8o8brwos59cx2jxd64hjpl9kc4dtpxve13ppjg6gi85durnl8qjwvyfwhylqnc16tniqvjxwcv8rlq3fnwg1xg82uq72agrnigbg450flzzj9f0hfpjbnxh45rw3e6c83ontqgxsap802ixbr2htr7knk5vxkjvfvcbaap6fttuvr6zy5nfa91il5mbs0kkjy8qwgyulazsdfzvw5jekk9fyj3j4qtdsnfop88oclzkryn21seiwn0s2f3s07fk3hnt294z20v17',
                        proxyHost: 'jmebthviyggu388n2h0txvnr8rwyfwik1n6wfoa0rbe3dyitl5vuj7q1nzje',
                        proxyPort: 3926266145,
                        destination: 'bcj87si0uh9yx44gr9iuz57lczw7nc5eg0ypddw93ew7lk96czk8lm5xpqw8ye3hm2885s93vl2lulqqv6auliz6vkuarp0cqlye5s3vp7xs7dyzijwb92fsga1qwsbfqox7q1sxhef624bj7sazq4tsj4w4i19e',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'v967ykrxq4h45asz5i33ir7o079gsdw68it0np80pmgfylhew21fz7yiveoib51rxbxwu3k2lodiml1t2wvsp51078iqbiznadhgsnhg55v6bdfdho64kz9awz1vvzl502y5ca73xeckljovs5gm6c7zyhxz32eq',
                        responsibleUserAccountName: 'bpec5nxgng7abqrfdcz2',
                        lastChangeUserAccount: 'j777zkvrc95lmjkzlr2p',
                        lastChangedAt: '2020-07-29 00:59:00',
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
                        
                        id: '59cf5246-34df-4098-8660-a55e589e4214',
                        hash: '1rsvwslus14dqop32wnw2vqv3shuzgeshqqzajws',
                        tenantId: '1e6eb83e-8f30-456d-a977-466d6a0acbb2',
                        tenantCode: 'a8mucero8hoqi2vqq17dtwlbt619vyxep6m7cm0b8dr673x0fs',
                        systemId: '7558f16c-7e15-46a0-8731-13140d2c9606',
                        systemName: '2jkl5avg1cn08k9p6sjl',
                        party: 'ro6akq4i56yhbsuy0zuflw6sm988aq168g9b3jk6v4ujzlq5h2sxre9ojyv1hmpnb9piwgo6nholfpdlo42gyubas4vnwjj7ku8eiiovsf4ll26thzxsahkxprre8ytctv96ewltbfn5b7d94yg5sl7q3cp853h7',
                        component: '1fm2m04i6zb5cdz0ednvchiy5n4bau8n9sou6oku8rxeggzck9e6bcafhdszwbp9cnvc8mo4ws8sqi7c13sg7sy9ddekb51qij2w78u91sld88ooa1k5n4fnhgu2oyj1nui1sjhg2krrj57l8xrwwry4crz3em5e',
                        name: 'hdxbzj29sz40hwznsvigtnqeptkwsua21w61xnhurslj38hh7rhofjjd14t1x0s5ff5iyd05lj5qpv0m1ifvb850utxjjr2ygfqs7tljwr96y2kqtfdq5x21r9gpfi1568g7ivw6gmz1l2ug8uaoodk0x8ugbjhx',
                        flowId: 'd1feb162-e4a0-4594-87ff-e7762fe6df74',
                        flowParty: '7j4wbw6bs79fhh7e3re3c85sl2ef4rzqeo897dwgkdzcym3hggdhftw0zdkpbt5r3dmlxl2sjs66ynljstqljwlas2522hd6ri0krxqy12ez6q89aftmoml27qfcope1fhyd7gnsbvzmk4vye6qxmzpyth98j9lc',
                        flowComponent: 'vivi1uf7x3ia6rl7b7fwocx0ehu7i251krwsqpbszwn67kqmk6j28x41rvp2jluclc7etg0wbrof0wkq8qbgnjfnhl0m37cetu73jbyczjcmeu53trbb6u7g57uvf1dyh41ufhk0bqdpau3hilgagnncda6hsrqk',
                        flowInterfaceName: '22g5wpgsbwzm1x0aunhj4ttvco0yl3lscvzsab020701g8j5bqym32oktmnzy32ljuxxlz01wbalm1nz6uuiqt4odsc9jdfxa1r9xx9pgchbgfya8nt43xwjzgc44bedoeh9xvejlnjxst1hf012vm747q9i6vhq',
                        flowInterfaceNamespace: '7epj9ozc2i8kgu7rphvjqmlfgogbh7tyaosqawdra1ptopzv9w0x7e7pt24x1g5xcolwbnxt84ahlojmemmz3vmqz0zwl8na5cynew8fidrxujreybhkytsrl1x8psn2sas35v0vnwwo1ba621a5ub5d3ro11mx7',
                        version: '815a0oe5w5dns9aw4mxq',
                        adapterType: 'w6ee4fg8n5sl2mpldnczjuukltd8u90l4ltved6lb96kc8kipopo2a5y7ono',
                        direction: 'RECEIVER',
                        transportProtocol: 'j5ay00noifv0ws82q7qp8lmmyq4jxnp002mftdxhui4vllr1crgmtowwxo9w',
                        messageProtocol: '7efo4dt6qobgkkvuu9bc4qlp0uxesbjqn3ql97bmp7aggdqacky7byekvmz9',
                        adapterEngineName: '627jtn043e294s2xp4gz71l67vcjfg8idn9n6lltifj6pmfrt4fdxpbsf2hh1nephryz5rxg0394k0zwf0olw3kx62xlp9meehlob34jy2sh1x757690cqq6g9orqdcy6j2r3rhr271jy6m5bgf3l82l31wq5x20',
                        url: 'dq189ektxvi35pkkhkjcabnpeszv084p6e66b11lit1nqf57t02is7ey2qkkv5upfleq7cgg0t7o7xv1c0t9sn036fkdr9jbjd5q3dsdyw43t6t4yexaznu37f6kkijf9atuxvhn1pdkl3u3mm4unnsfjk8xgw0hdzy6bire8xh5x2l19131h5aashze56f1qjj7gb5yxrh7efhigc2hbjvvfhf90xs4k0z0pncbznwxns8wglyo23pajazctlqshm682jzw198aku291olzh3vod96rbqu4f8n0zg4i5fek9ipwclyvohvlz730c84a',
                        username: 'elf0ppcfiofdljkdlc97y279gb4zzfujfvithtastl53g2wehkx4t1u8i26d',
                        remoteHost: 'ddrvb7w2to4viifbv1ehgmxxqclyd8o519w3isyzqm2rw5nmjij520b2ixg651pclo8efyc9hnkqijynwrk0tzxlxg5dc3g2cwv4elu2fps9xk298sl1w11o61k365rdfvm40db41zxoehhnm2g3swftkkj60pog',
                        remotePort: 2050308579,
                        directory: 'un4oj28taaaekwi3rfornm2fipcihxd4qgzhd610zr9v3jaks4yaxc4y1ci4hmgltrejzxkq0nhufbysbc9j5poknibbgaxiosttevvwk535uxsmpyf8g24pshon1v87nq0ip9flwsymw81v6szwo8rpuhzuhnwalibjyt3se2vjbr22c02qo78v1g04j38d5u6n3y9y54vildrd9z9l36ayyewlvgzxg4jez596sq1i32hh5mopujksncogk4qkrbdfzbhewpwhyv0rxtrwgb0o40jjjj1pjeh2p3ajrb6mv5mzo317gucsxeww12vlds4c8vcq5efytwk2x2g2gx7sxetcynj8kebdfrnwdr4j0a7yi911vnc3t8eqbfeplqcra9df1dr0lw5mpzq28qadcp85vc84f8l304dhecrkmfhyy51f4brow0yqukkcswzjdadtm0q1jn4luna41pijn43evkvjhfum2x9odz54wjgk9611t23q1k6l2mhzjekjqmejj7d2hn4hdvp1nwblg4rtwj2ype2lqkorkgu5zqc3ol7uv3kx0kaix5anfudn8pljxox2gtt4yd4iol80ycqpu1mwyi56buqysxgdnzbzljryw9oxrccwrpsrw23j707awrc4ngeb5epkbdaa1zn1h6sbgehiqgx48xd7joyjakheq7it9j62cwcldh7mcijurajnhv1l96mtthyh6a2vat6cjlg1sofyoy9d6mg565plgqer7gm1if9xzsy86ltx22vmjyjdpkxxndblbnjfdx81jukdoc063m7s47mmd4ejqugyg27qzn58m0yfk9nv8jxymfhkp9seuiibp54naqrzjp1h7433ioyx3ga47hgjv89e8236r5mknpo8qncfxv3fo0rj5rnt97pjqf38nlp8beqfb34by0wac957td12n33k48y0oevl0ucvzkaf6khkfot874e15iu4dfoh44v8hjvptry2hbxydp7ix6s3givehma1cc5h',
                        fileSchema: '1g6n8x75o86ln08f7lokzmlnskw0wcm0w92hng6i2ivkxav6zc5bzc9l6ud797ig1io162seezgbral4rujoz855xtw8t3pxtcrcibxr4fh66ylki7u8v4gqmg6usxmmzqyy9qokdffmwvx20im4rd5ukqk0z100o5s4c0t0edl2l0hzrn4rfsiaa4883dijxzsnidoxqxa66hyvbptt59g5kt1lqv6k7n64gfbhrqsafjy1agjfd0r2hro5byvx4t9jmjtjs0utowcq6wfwc609bjhkm3cqdoag3rilg1a00ppz2ljdmuoekg83iiktljr0gteuu9cvnnxqo72v3u2oc1b35teevdbrewqogypojgiylu2ydlee5ij9ee8rtqnv6j9nleye1tykflb9je152o55x1hy2su1knojs7ptsjzxqhb0xk3d2znu5rjbnlgcsnh71toz29lu7sl218dxskrfi1s4v6u2bg356rifuq4x8rd6vg4o8gqpk1f93m5x7u8cxo0gvim3tkwcsvlslmkh34xgl6sfs3fx9k236apq5a2rxpf1fny5xgx7ap00ks5o4xtx89i33uekciaob3fp7sgkpc7pd2n9xmbhqs0wlnpmuw3m3un0zjvso1pg15e113ybhywd3pm2wv2r6rligvm4y5vtdvaact3jlxjqpatrlrqvpwn36dopvcimx1v1ya3wir5hzvbou1sb1a1tqx5fs6gwchzoff1cviq92hky4ne9dlgzox62i84d2xtsbd1ohuoh73nxxku32h3v9ualy00esr29d6ne5szft0y7dinnc3aeqjsqve5h4z8gzqofutauvl9xpbmgmh401d72kutmx89e84ki7m82tkmpzifhhfjiqqj250c0okzfijhgr1bt5jbwrr4nt9b9etizz546lz17airbd6opp7a7ewwhmaehl63pmds1coa962ag112s3tploukog8z0uy646b7q3ict1x8ve4gycbqcrrodcv9uo8go',
                        proxyHost: 'vhnziek1w7hp17qifg1md8h2hu3gzpnsudeh5ltma2ex5hz2lbazz23k6lf6',
                        proxyPort: 3711353111,
                        destination: 'i8uu1qoay92720j0r3fhagtz34uof3tbr7xr4qtr06z00bgh5jzvivb2gxgn0o5kza04g6gyglo56amrq15n52jmmd7fqftwstxbjx2aohzcg8k3rl6okk77jgyckvjvdehazttmpysrky3351v5263fzj9ffclo',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '1sqow0f660b0b9mbnloru6way09zh0rq7axyi0ha0xefkb13nbt0o13vsaob2mltkzj097umkz0d7pm882twefadjzr0ab0e6vz9jglnjd40tqg0ubyzqlcoua0si1c3k65wyt7fn0j6lw1n1c3xf3ap3gh0r2rv',
                        responsibleUserAccountName: 'uinelx5vz0amz1wsmmz1',
                        lastChangeUserAccount: 'kds5ozs72gcc1dezz1fz',
                        lastChangedAt: '2020-07-28 23:06:13',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('59cf5246-34df-4098-8660-a55e589e4214');
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
                    id: '59cf5246-34df-4098-8660-a55e589e4214'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('59cf5246-34df-4098-8660-a55e589e4214');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});