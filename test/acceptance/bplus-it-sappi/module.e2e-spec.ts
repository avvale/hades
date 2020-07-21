import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
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
            .overrideProvider(IModuleRepository)
            .useClass(MockModuleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '5kcn97rzgu78pfaft8zi',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'tqsxelvvocobgbp94q18fk27rr600hgi9bbzjxifsmfhtrjvcp7omxvkpaacjz450ij4gmdpzclfzfajsoq9g8mwc35g7q9for524annxnmitejgdsux4r1masvvja3atbbzaxo8nxjgtgmtc1smj2t8ejhw0idh',
                channelComponent: 'ts1lvd5jjopz2d6iclkanja5utxat04o8cnpel5druggwxw6mj4bk7e1peohpoe1j0iuhk2vg3nh40usus40eglfwsf4yn4h2lee831gdz7h71i8caknrbu1pweza5s3sf41ken1y15qmevg4zbt112iu3su0imh',
                channelName: 'o610d70o9hkya7cpfbag50uicnon1522iv222rjh28b6xnhsv0zx1xkhdb02ve8ml9jb5bdb5v3piv5p7aagzli53e79takrdfasrtv1k67h5wqu3d3fdg1pt1wmhnvdnq18gfx45s36t3b1paub7ng616hiap2e',
                flowParty: 'uxcs0qai1kj15romlihaskzoy0jqlxd737v6scf6cyotclej0a181f7mqpdnxyp3lasefrodrhrjg5qjsgb7jlrcv53qjmwqt6sq9386vlh2ahc1octp5n3hwx09iut4nn4gju0xj4vl0pumfkw7f4gtugw7h4tm',
                flowComponent: '8s2y3iokelj5remyokbswh6avqkv4nl606ddnl7zta91t7je6sk6zv5hngwza75op1t3lereshctayw1dneoynw5qw8zuu9unq524wwkjfc7hw3h1rna5a2p03zuvprh0tr0jyg36pwaaqa4wevyu7jtuj39h4zu',
                flowInterfaceName: 'fp7vrhiyzxyyp7ugk41d1zhidg7dj3kw0dkuwwjjoqnk0b5w4zeinhfqx3w56lr4c4v9iaw7pqrnhisyv9ybxpfn8gwuzbluroz5k4qw8fa9ffc9csih20hmd3s6hrzzxqt9jvu7f24finvbr4zke98qpqw4qgaq',
                flowInterfaceNamespace: 'h89weq80fmua4e8wmsdoxnr1yu8i1lgv0ev16qvd7wapd3q67kcuokwpi4ur7fibv541tlnia9zfinslk64c5t3214lo51t3079af8nxsjdumq1mmpoddnsgeurbaw1r45oy7x7hp24hgo6rp5iwh6jf7o7gs0u6',
                parameterGroup: 'hnu4iohbzmskg5u4irmmutfddwpnnuqgoxi2g0o669p92hkvyrcldoonvr17y68de8n0noyiyryziwj4qm3gmfkh9u57gzv925v22uj47dvd2nqkyakqjc84c5phib3ccj90ibh0o9hrapmaz7d9fcbgbuullqo2l4jr1dnzy5ps9rnt4pikica3sc9io2be2pieis5yk4oe4j5jc6rkls3l5s40k6bej9akwaeuvhavr587jfi2i01sxpps8zl',
                name: '0q7kcws27meskxb2njiubrvjnime5cv2gl67s12ihe8e1wwrsmkympafzrubzurilwd7skm8t0bwbcg5c35z3q64tqfnsknteqy53r5z8owzalvyi8ofwglb1776ghrqyb5dweh7shqa3izutxtbr46ia3k5ji3agycusabxr5h8ekv54myh3jordiobherbp69l3m8vfgqxauf0gu11ka3kouid3izysggm71oqr6df0xj6zddzqoof297o42cqsckth2va3gpfdzx61ld72duno32uxy3vb1b4tg13w80jdd61uq1j2jzpzdhrjili',
                parameterName: 'mc9gg2p8g5nb6qug7tnoj4j5iwwqaeev4h0cryd69wxfa6hx3fbtyowwh6thbo0kx130qh9w43a5n2jg6il7814oavkoov27ubfvnxp0rzz1q9m73gk4lsi936sam9ai19wdrcu4c71yhcx2lq8di58xz5k47aknwhhrnuhpquaps1h1n0b0qem1lem2gqvuaokrf527vdg6018kon6psruhuwhfqeksodo5j5na1vjv50za9xmv1v35l658wejotcpfwdus4boamdbibm1iaculz35vue232dww1z5hmdisrtz4j3r45ny9s7m5xfi6',
                parameterValue: 'pvhwjmy2z35jxzmarbzc0aqh00ot686jg4grl2eo59vawv2t90xp18y5i84a02q06tgbx9pym56iqbn36lyz08o2cz7ep2kux4t6os8a0au101c3uwn56yfwi8o1wpvgffm2v7tp851z2jcn1mmj43mrufn20453jobodgl8w1qcntzmo1tzj3uypypzsltx9jmz4u1pkxzqoyp2zbjyubg28ckebnz0k6fstz8f4t8we7py1ams4454p3blwzvd1zrj2bizcdcyph8fs5parcxlicp4iw8etr8rbtdqqa5bhjinp7fdqsm420a2cjzddy4xgc8s7d0xyqk6ellr177a38fplt57z8a6j1ee0ymopczw2xpc726fmi4x7byc6pgj6t7erdichjfhqj7oqpcgwd95xt6zv6g9i9b9q4dfysfpyx9hla6561l9mfxnnwkes7haffsbfns2q8yg15nur60k51akx4kgi3ifmc47dvmw8y0wqkot87dq058p7qvkz26hrfmbuirpjbjxw9vcobvz20dvqwja9viyk3ve8860vixwckv45o9rxuhlsjpumjmtkqbdvlza41amxmmy2b4pcu9vi3ium0jfcl5t7ld0xjf3btpp0j55zcgustyo2b2jguwbc1ckszln4d72xit2zqchkx4ark3my8zo75pzzhghv0loau3hru6l25vlfoftq7t1m0njou30bfhio9xuxc30hyvndyzeaiy3ml8c5bbfjxai7fs8d4e2tdan7fcycgdn6ngbvado8upav4my4srzk7euolg57agf1x1wkoutbs9kzpnarlhrosaxonpo5tj2qxo2ia9bd9i4tr4y8yfx8rpn9g52lwddko4qq749cw70s72a6zaejvpvh6hcuncgatnn70e9h51vmiu2lyzvrvh234vj94tfpi7pbhwyzqk4gfy43n9ozfmfltxuxuuhdraq0jy3wvtfw043g40g5ck9hg69t3c3vbvopyk4m88765edem2p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'nc4vlpr4nhpxjj8c7o97',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'k5g44elhno5ywp61f530rsc798sprxl9ypodqierh2q1xvg99yppgbs6cuzp3r3me9aasd58t62u1qeilfuca4uks5yph5tib3mrlayrjrnw1ahz3k30a271qgwkuncuxv1jnokprs02n5wmlv9sgwjsi4s3a1cm',
                channelComponent: 'f8nis8r0cgz50a7ath9qwx11a11scjh4muoq25vgievf3hvwmvcth6gazxxznx8x0wg162kdbsnc0om3dx6mdxnx22xjhvirmxcfw64alx27umo83lkzra6xnd4vk8f64on6m2q6x70i923mako9oks1rpwz6wjn',
                channelName: 'v035xmgl9h0maqvaprl9g0yl6qhc7thgn5lpd2mkgap4vsy5nd2hc7jnhm7z7g7nbprf44yxtjf6hre48h310rww6mhxgj6rmah1bxp2qvmh6mxn6rjnrkmotsllt1pw67snfpu8o0j6mvr1x103r1xglvsora1c',
                flowParty: 'tzlnfxcbg2vu3bs2cos2exmaa390y9hmp6f8yeof7gu7m3xzexynh4uujrt7124vsq74qv9e6diezt6h6r0koryxmulc9q8n53cdkbfwaymtmjo6awd9puhmy64mg7k7lir4tjjxedxf7mfko9k288gniwcxv48k',
                flowComponent: 'h45amd78glcvlm9zl988e9jfqg6q5y67lem0ulywu95ve0yctze7p1v8qdgzudib5o7u6q7bqjdphl39sq0dkol8dud875rmowwhezr3e0zv39p5torvpxlqmw2wnjh9u9kvkhkmn47sf1gupqzyuws2w44srrtw',
                flowInterfaceName: 'w7yi55piwsvb99bjxmk3r761p676sooa6kak48caoaizhowy3abgfxgz8gngyr7bwn9umtedydwh77mxzuk8eq9fxa7yv1u5b8t2fw75xd97lfd1bc1md2bg74kosruw7jaut7j0aydnqjbrx9w1v2y25rtuny3s',
                flowInterfaceNamespace: '1cnlki1uy85zirc3d08gnecdxnn1i09l2s14ekop6cw6gm1skfu99q4ud9krlk4xapn5tshovhyxn5aro7pp82fso7mq5od9pp7h3q57ioe8kja61g861lle7g2ok7mzjk5hhgj0b6qpkza6xe1ja6aagsniul1h',
                parameterGroup: 'wkgnu7vs74cy12b3jl0ynny0wlirct0xuys1r1gsaa74ymsopdw1x8gh32t8bn2rof8nla3b07panpj2ic7nj7p2txi01ux591j06snp4p5re7f3u8gu185ogqgzww5v6c09r2gfhoe9q0rbv81zu6ppozer4wix94we7ziqgu9h3300qz9j183ok48etwwp40y4tpd7qppixs7xnauehpn3aipjysa1h9r4x0ylr9jw3bvexo5z13kuvqb6qqh',
                name: 'xld4ghotplylj711wb1zh63wbfes3ackwj1up6krodvv4fudzor3gp9gwzxvabj5vscxjv8pt4fckgt4hsb2j42bfb6kd0ft9ibth1yhsu8lo6oyqout45zx4pfo4t2r2w3m4wpng0b0bhabyte2w0htvo28nl9kji2yrusvdfoep3w1cyonm9wr5x2ojs8q8qhya9pj5u4e0295h1hm6ktztbmpo34gvyg9dmoyla2ges4ny25cao2k71m0mzshwit2wtl65j3m8tlurhxbjzkm2r3unjh37t8xk2c6e57bk7sg6uk8zrvqfgjahgg5',
                parameterName: 'ccy2q3vu1txm6sp1c0isk57m35e3zs3wkvm3f545yvyy8ifr3knt3g7rjvtr0zucge1mv79wksso8z95djlxquemdi30p9bdmni3w29dwjiad3qf3li5gzf53mi5vvnp07ldnn0qkd3rfov88l2wmp5lutzijkzy4cema80y2c6rkr52bso9kd0k0fpzpxz3b5r9fz32taszfjs7l5r4i8g74acwxb2l9ska4em841qxne212e5rp0v6auf16ex8mguex0e7v9rrgo02drkn4oe9h8sny781wyofd9hxapxmjq95rb69orok1geswrof',
                parameterValue: 'yzug6eayexgshen62dwtv1wm4pqnwaq17lvwafmykqxjhizzjbi4xx8tlz7s63rf0s3ieues51x1ivcq7oswppsjquy39xse8zrwutvff0hq87srm7lkdfcdop6ch4a81iqfdei13isdsxvnkgqylcegvjv30fmjyzk9idmv2p21gii2ins0ynfig8wv9f0vi1ludq19ndaz0l1usi2qutl1li878f0i71zq1ar77n3chk90sr569fm6t6nyjf5w9vulna0f861zu090vc8632wlqdwuhuak1ql8fwdgwsu6uy9qrj5ier59skw315i5ere2j2jmop5vawir1a1casxtcvtlyll6fbepmle86xm9awkwievn485hcppz88628vb1nsg9372ru0risf4o5stpuh6fvcl36k8n66ogz6t1q89m25c0grwf75cjz5ysqaiyb5dvrvlo51hvaks4766zsexlidv6hrjzihqu6t58qi6gk903woi43t7feixuu0s2gftapld52y6il0ooa2ubtt0ko7tleyuqvuk6mtmrbd1ika7d0r2ldg7iehaj2ybc7bcbj2o5o9xz1onli6ixfjmijeav6lfdoplvk8pd7f28f6svkg0p99ouas04eqx57p35ml1ap4tb4jy12mtryegpneo0phtas0jtlhkh7lpqgjqf8fbkdnkbhmxl45rzkrwh7r6xy90mcvyy9vasoq0zmrjdwtuwrfhes2v799irxzqh9mu6eptt5ovlw0cdiehl1sv2514aq87blzjuqs8mr0o2typdracknlmsqvunb1bb0fqwgvqik9rqslsr8uik3r7d89kkb6g7uywwq45y953np2h784h03pqejhqetl8wuva4i7oryprqy2t0vizyv8mw8rffciamj1lgipdq7hr9ehng3mdcmsav69qoohwh5ettxw9tdzsrjhzf2o89b4qrrbfotgjnq3v4s4sq9zcnpastidbo014ezvxtmvhlh1jdeqr7c80p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: null,
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'cwqt75kb307nalw9qymi',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'tadtgqachpxhrl9faljbp6oet1l0zq9riyosme3qrancgzcbyvu5tbfbq1z4fm95mhdm3wovwgoov935wlebpp2t5guven0bueq1zqhlrqjjq0i14y74j0b3wrzd9kj9d7k1dva93qe8k6i68iupk3cy3t0zn7cl',
                channelComponent: 'oxnjfnlkj4j86nrgfgn5dll2inh9uk6hkciv3016y81zsyn05pqzapzwzrp1si8nf78bpxayo5hztpgaydrragx0ec5y0ovhvj6o8fiwmia9bccdny3ir01soxwlrp5aodk2z891iybpqeigtpmg3hr1370ub0iy',
                channelName: '3mm6kgy6mvqjbmrzqmmjgdunucz61ngnc9rx6b3cmfm35w7e72fmrupc7s9fvif206ngxgi1hupi3lfkh4owqxpeb9u8wqi3fds5pjmodjri4ai06f1q7wlvgh4ow7o90554rqmv51obulkby10z8rz416977dbu',
                flowParty: 'lt3g60g2rukww8ixlp0lvvo67gdcml7gdfabiik4slg0eli20jtvbdbezq1yylbslhf4cj349gsu828verwgkhaiz3e1mf2w0yfuhtrdltheu57ze7bcy8gtvngl5gcs4v8egb1of9unqcvtxo862wqt3ne3wfxv',
                flowComponent: 'ev3uzp8dyandvjjm6rnpsqkh6dw6kfbkfqkmg715f5mdrt19zds7tqlstgvbq12df5h7yo61u16s53pm4ffssn7c08dxrky1qef0myhc4vookmonxaexa3pkjzofy0w8ngtwlpkbbq4uohq53fpm14upht08w3xw',
                flowInterfaceName: 'wa6l80ehkg1xig7dwn7v6ufka936pjcig8ditk9dd4b8yg26u2kll954wg0dju85shchirxtp391xikn35i7cksn4gvq915gy4b8e9141nx64c5d76alja8d9u34a88h2651yd2q8zllsg0ffsxpey687zeeujdt',
                flowInterfaceNamespace: 'p5noe1xhfv09qbv18sxxsb1gim6x7ei7ixxvu10ywpaktjyhetr3imv7fgar77giw4wh3v7vvope929gbh7yu1e6r8yzlyy0foawthod2yld27r0qbi420fxbbucmi71y6we3nj53yr3wfxwizl2anb5db1g7q7i',
                parameterGroup: '8k9ogn8mtixvyu1evy4fl98kemdbuupkqqd4yrrszq3b3qf21hlgr17pff1zfc6tu7wbq3f4k1afwurxps60apub5810e95yvvf7riu2bjzy1b0t6et4ii2hex6vnsdj8q6k6gvxqw1i0770sjqamqm2ufxm4vfokvdxnwtnyparxtpqmcrq21zh8yds5qa2lygkcyxw4y7rjajpyt93148hqlz11mz2r2hiuw74yt5e3o4cmotocetr1rotdnn',
                name: 'oy0zog6yvfrfv3rb3yvzf0jfhrxp4yp4bznwbkcefkxzecg0nszbwuzv87bqcovf6k5rhnjjk9lulx2hd4zszkd16z1s9h8b3fbwzfh0vvojc9wkh4wtypa49tz5bf19kcuat0ojz6t36edpy3agsvwy21ub2glyhepd14382jh0ffgfox35qh8jqfrediiotnf5qswbrc0sdc74f4q4b6lieix8wcjvzzqdxpqsf1rkajd96h9yf06lpt3cwjj4swlnhlz4ib90zmmuzzfm8wwzwkrbcia8rkni8w32v0ic3wpdgsws8am5sry4za40',
                parameterName: 's5xijymy6oy1bnt26rr5c508gtcg045jrypbj0vcbifi98flhtp9h07z3oh3zognem13ouzg0ljt2nxgmmjbyx3dinlmk86cqn2cwzk14vjklvgb8k5px3a1vhc8j533fhw2juy8o377g0nuqj2g9tgecl560gcuy3z2xctainy8qtj33jek70ni0a8zwz4u1opd2njp84a6b57cshfmp0zos1ik94drqoj7ws7dzir3o7ai3dq5cnzx7d49hyefmlorksiw0buk9ax54u2m16oti9l7vkdr4sp6k5f9fvqr8ymyz3d8y2z36ehicjy1',
                parameterValue: 'fmgtx2k5dscvnw59sab7skewswv277zut003n6cyytj1q82zc3mzgynb8bkpai45lljxb4wc9h4ptuqjz719ejzodj3qb2jfxi69nb9wn87zwwqkl4xfgdke1cpam3j65ydatefmqg3h2dggpmurh3iy6vb8yk7mkv4vv2fsyoff0rzf0rm69zk1p7pqsr7ejpzubaozj195q4janmjni588xg0sw8p5rkusfdobi84fr7g6zahqcl4gco45ivpqascmj28l7io8dpc76fwlsrs9wjtpv97lqz3ia29n173uomqcqvcpcjwrc7aiomx0do4bukhojoptot4y517hk9ciklcxms892ji170pyr8ebqagfzrpbksbo833wdiohzaqtp9kgov18qdxytdy5vqwh5u02q3w81ygyy3da21et8vcpzbylrlfu605qy6qsbpjcr3x6sehanr80ix3rdol9zbtcjndft50x4q74dlx27391usp0sc7cui91owea8zo5glgge6a7ii63m6icf7ozpvbiah43gy5846x7irks6safquqsxl8rzunlhl0lbep7i0gghan9poet0xnllwvw2swzfmafx05kdoq015lnw7f64cpewaggcnmxcwua39lb1i5t4ps55621n1e8j4eix1e24ztmpgtpzo1uzt6c0nuynokj4ffmuxb0duvggg0xpxy6piwwmux3kcwfwyxg9axa8amg5xx8007x1p1zvv1xqzhybjreq25kgv0bmkrhiudf7o7ufl96dgtq9rr1mdepzk9qxqs75rpkw2s8s1va714gh63fu0z96yknolht9l5yix2uthmd7dy4miba3afq76hzb3grj7otzwbthzpruagytxlq0ieg3so5dq8m2qgm3nmzxj0b61u7e1ncz42wj74odfhcy7ri14i3j2bpz3ewz2kz9b4sn99onktdgoa0hess6rh8ide6fjsw2c4v1pbai0sihwbvove23maaf1qc9jcpd3ar31g8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '2db1gj0d6byyjv71fjtk',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'nrdea9ts698isrdok8plfj47hhlrkmsl8absswh41wsnxl3fnxfm4dui7b1yy9y0fsq2iwcrs3q9rzb2z3d6rwrxgkbedspg73rsekrb3vncgzv2ymn71b0ny4dgv34l0rr92htfq4arhwoud8szw23n8vwi5ei7',
                channelComponent: 'v0fmxvbjulqm0vcvul24t2w4giazr1g3r7ko0e7dnwq0fmoksf4jkk3n1lhgz3v7c840nt9ioswy723f49h1x4tdhb02g7ujkehwmh6u9c2k34hkhrtngskoic6d5ehnrvkwdi41jygq1htzp4hbp3aq14oashoy',
                channelName: '9mwt8fq7zij37mvdjqgtxhfqckirmjnvblqt2i2rcatha3mkm8gmxz575qtmohuligs316qtltb0g9iemvlqlmwcz330o8021zr4tdfrmnfuofnmgdlt2eydlgacvfidu40nynipf8j3yv3jxcjj4d49w4rxehdt',
                flowParty: 'ir5jgltok46u31vc5614er6tknuut4o4bspetgxy3grgkhpod7h010rubkhnq6n5gebfvuff38ns70qor3qy9d5z7evxaydyxyjuyxk8ayiicelk7oxk8wzq1jrz9mvc41udf4wjxscq7ngyqz48gvgaj3r7s985',
                flowComponent: 'pl5iwkwtt90otsns6n9v6rk7iohof3ov3nb7shhxtfl1y2bwh7byzxqubkv1s16j8unpv9pzinb2jzz83qll00oausottt3hnp4x6giu4c74f2n85i3qrpxjlwn1dhx1zk178z1yt73w2vva6urr4lihbkg32ebh',
                flowInterfaceName: '3xq9mw5hb00i1cn0nrh4dbw5vxxi9dpg90mprzwvgofzw1q5vghxf818ue5myfabj2smrhyq8uahb2qnbrx18cb8p12p8o4jhywjlgrexpu95f6fw6u6x4pxyf19u65v5stksplx8zapq6duse955qzvbrkuinl4',
                flowInterfaceNamespace: 'q0zaq4a0ebh29bwn7pjdv2rja31mxa5vffleepyyffvb65d3vu3p5jap9frjytidnd62q5pi3y01r0mry489ainw1e4iqlc4xag9r415koopmh9iuaz0wem0d43pv391uikjtyes3bg3u2wuzwl1j1bserq70sxw',
                parameterGroup: 'f53ga4nug8d2v9dthpyx5c4schspplnje40s5x8b7xj7ue63bxfj7v0c73uonaob809ej7stoeg8d317f30g9hw62c0hs8dhmy0isgicn7bjwocfy1d1ssojtlkf31zdjk0b1y25m0y09l8yoqi72txaz8r3whb089wyv97kb77wrocvkvobdf0ax867dofecpythkoggambsmgtt62ps65djh9s183gci4wnsxka0bx4rk30yusl9vwy2788xa',
                name: '9gueia6gckv0ti73nbj9vz35krft7xa4fdvt3ef7b2xdfyjzgoyh0voi8ar3xzve7wlqhfobp53gwh9lfguddo2x30ln0tik3pewaoiu77p2we6xrgm7ypwp23tm7gpxa9ap97m5cnj5gq0wchff9bjp75do0hrrabzhc7msrpie2l7y6hfxm78lo0omxpmyiki1e647n2s0m7x8fxxli510tset2b6fs4ftcn3wub60ie6vrq3w2f6uqtmigx3xuohpiixiy6jhq0c0eo7izelosgobhgy8yi4xwf67atdg1xirjomulg7rpbat2uh2',
                parameterName: 'py0esjl93utpxlt0u3thh2nvvy881l60vd6gx0m7kpzsdtie3guv9k0oxak0bgpdid32kw4gewopcxl2pupixzig0tp473yt3slgyq1wgdrn4mo9qqvjl1sl73so1nftn81eycc31nsrzmismd6n4c7o343o3gvqrluspgqn29yeqjm071jbbp3jd516urd6164a8g6stgujond9d56ez60wysossglllow1nhhwe5iyblzvze98p9jc29a44jvo5ujh4gt1szpnr5dfzonlc7ztj7bv6207eqbxrfa36r88d0xxxqdv100m1tgaj4ju',
                parameterValue: '7rw8dewsn36tnroi2prgu39f9pwo37losxbvp9dafwe6jsyao3ftub027e4rh5d37iv3939i8q6z8zifaoo5rpjbhjlpf0xn3l7c3zr5yo65irgiumsgh0pq4gj3tp5q56v0x0v8zmnyjqq3zyahudffkir8uyie4jvvmbp2u4cnx23h1cpiqagyn4x1e09rdqjqykx7m0rnh4rsjnzyg5qom0kuxq9tdsa2t6cn0skaraczlqvfh1sh6sonejnu9w9vktd9twlm6l5wue7ug0do218uszslyvmpbc0ldhwgkw81np6eaizutbk5w560rrb5log98ch06ceg1dewgi85lfnxudamnx90xqikvhac9hqlgqc8ruvamyym9l3biyyyybe6q4nxuqt4p3ackeshtk96qcnyiuhfuk5uf5wdgo9fzgv4qsj2p5nwbmbnuswv5klkv698l8qf4bexcvlgemulkay1o125diznh62pckthuammwdinkrre5k85dqlzlkz41zgraz3siaoj1zoqim1hoqt4zmc1faxiqwclp6p4yhtcmzv7atm9hwipfxkzh657zxyl5kxl5ou0x2cfgpa65aklasg10akcvo00np8im5lgj49u9kkh43kt4tm4a71fp6rd7104ff2shkjvttwv3rm6u77rzmomw4pukvwog4c5toi9d7un1s6jt4wciz33q5n4e4fa7x3mlm0v4cbu2932asfkzkjai0mgu4kapn82szakk74xubzzvjzfum077a4v73r2eai62elc85322p6i1yehyeqey50nmsqny0ol5dybidpsi93ks2ec13fmkybnnqbo6jhh4h4gzn801l060tqz5ojc2txa1nbg3adxtakyuufcrsajf2q2qvrths662hwlh04sscdnn4cccszjcrni110ov5rzh3cnvqtprr38llflwgat5of1vesddpw1mlodu7qgyoqflk22nkc8alxhpg4cb0iry68cwl7gxj2ti7km5ayf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: null,
                systemName: 'p9ypo7pcg2s9wuq58pc4',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'schquzt9y8snqqzmal202lfqarqq5mhx5b4h54boq97rwv34iyh95sxmnx19q6j3aave7m21uxs1smxrcv10t8af45u6m69vmndvnoy6a0abxtq620u0l42s4t9nwnfs9rvp5wxetiekq57thbg2gc0t5sny2b1j',
                channelComponent: 'vvbn27ov7etzkhf7xjllxzmdwu0k9c34kt5i1zf9rrbhrh66gwcwrjrrtc31twxymb1uwapcnzscu0psmmax7coaa8a4vyuvmd4opeqs59bfwh0h9mg5rhmeykr0cq2nc1kar520nws15be14cblevzsnyosajlo',
                channelName: 'fk02ln0zdt33pysudgx4g5ld6ds6uohlgvacm81ma7l50t7602yx3tlgy8flzan7ym4rhkjtclfec59ntpvb1bjbixkopz4u8fmx0u9uz5tupq5lmysj9dhylc48pz5jdu4uz6pbfz1cjksoc9snxy0ignr292zf',
                flowParty: 'abtrkyjcfkbs5dxotuhekxdrfghe2qbpip0790xcqsbzhrymp47eldglysnurudvzie2pgipdlprg4mwz4sleqsmkzxgumrrrrxgqnu1eccovw5o4i8vvdeu9240hvwihy915dabkjn15k4imrnykwuhka117yjo',
                flowComponent: '4vy4zhlonwexl4arzgoqx6uwxcq97194mjdbj6ha69kezcm5f6hvmuvwcux66wsscst5tew8bwnhsmp99xpsw9y2v4jg4l10m66di6woardqsm8ki4sdwcwj4g86825wkgsnhe036t1jbi8sfvn53f4m98c10qdi',
                flowInterfaceName: 'oaxtmlmydvna2w9hncloj72ks4grgkdjs3ih698l6txwekustyqrk1gdy6gkkgfz7wwf7y3tit9puir8dz83po7lopnix0anv1guhpuz31nylgw30higq88i7904qnjv04yf4sunrs5k4dd97ca5wn0w95hnihmi',
                flowInterfaceNamespace: 'wpcu5pb7nzru0ces02gyni9proqd6l386k59sbppd2tlw26bt5f080mq5piqyz63lf2v1y8029z9iegxqm64e8kr88wpyh6aznhf5tcz345oc32fo9u2wx903pagvvu12ulum8abebw2vjqrla263ez776yaxlml',
                parameterGroup: 'by7fh1zsfiz0bsihvuxc5p5gr1xlzdejx7isemft54tym9met2nvsucazvdoahcxcdla0irg40dm79sot60tbhsju1jn9ijv11i8eqv4i3352yzthhzu7tl0i53r6m2vpycxtom9ge3hdxex5e5clbnz0520nipdhdwvw3b7oo2exi6bz2ph5k09r30y8txppe014x5mt65igt45moszzkszi2u8bhqjz6k983pb10tuwtftnzobr9t4kzx0yyd',
                name: '0nejyabe8janbg61ontay1ay75p34c9akt0qz8b4bgc6v51swxzm0rdzqvf4ysxqumwgup9bwhmze88pdaswgl4g2tswgmdc1g3w5ai2on0c397kesq7hrjm1hbqk3fjbi356gdqbl0oyyw5jnennzk4ow36u307zbtqd2wb1qxuncolbytxa5881opsfvm1fnkfwha8sbqsuiekrrnh4nwb265u6wob2651havzplhczbdrtapd3tykk7zkch9w6edhhvholeuu91n3f3o4mej9kknw3ntxyzsrd9au31mbxy88azgvtjdob5b0i1di',
                parameterName: 'wzle0ab8a9yqhl55hwaxklhj05acwstooswndotwaqz8zrp0ysfxwjts5eyjyq8l4l3yy8sasc665gdihw21awa5r8i1p6j6iuqa9m5eoblbvvcwozeppqpvu61lbi64vw3ii3ytsfqe8gynl32kykzh033s4by0vb0kq4yryk64j3vnuu8w5g1yfiwqo09n1eqtogpnln9oq1y02gg8efam674w81ccnwfkvcdn7mdtxv377prj2ebqv8ihfmhjbqwoy9p83fn0dtkuhaifj352k2zftlx7fhhafpwl1puy8330z9e24ga7cr4ej9c2',
                parameterValue: 'n5v1zra1jl5w5cne4nzvnxxhche5fnkgv033k6d7hrofsk9np59jt10iekl1blfd84p6kqdwl5oxk0vayjnv0hh7ajd69py0e9kxy7qjwai5e2e4l434f0ez1jbuu80jhhbwrm71n93j7z5ex5054kb3mdnbj4ug9wpqdokjo1nv4rnli9djh9z6l1har0schn64v51ivpu2n6ge85reggvjbcu4m03uxnoogmuqd57daljfcq3le73dhzargjkv1318w5zzu52ze60huu20htrln12vb63mwds4wjkgcxesabm671klw93k8ntzf8qfk9o4s2sb3svfhqyzp9niel703r89s9z8rblr591ym5vhhz7449izei8rzqbyhy7sdj9iz2mgz7kbrdbbbzv9v1z8t4b7wll6wsusjzpfg4tar95tpedeah7xgzzl4iui5vspt2936uqj9boew7o09akaud72oulj1mlzacqw4b66hsbv2a149zp4aryp156urt3uyeb1vvp1gqaooomdmq6bok0hhnliizahp4mzweujncza5wavt9tvgn6sgzipcams3sea5ohx2c5axuvjs66qdda0iyv9d4zfnl6bmf0eotidoaw0jhv4e0ldtbrzpepev1pzjmqeotrufnlernkdev8dt40q8o5ch2b2u6ce4tzbazzqa3u83w9d3lzh1khgo0nlft37i72x8a2dkfrcbvg7dq6s9suoijtkdvcpf1pxuvlxhyussuewlynptrqeapqw0oryreqzocrclkib2wr6nb0lsu7e6oxa8vx1nikpzexk50kkjprmd7819xfib0hz33pe3negw6813xttgxom435l5qxtyxru0irmz4ojwt70pt8l3i13i1nrilj6qkoanb38j88ctca69i5htrg0jd8wqbe1021ij08r91i3z4u52vgfs227dhsikyxh6mdbvsppdfss0kso9i27llxattt8us50mreywu0850cftq90h6sa67j3h3ne',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                
                systemName: 'phwsg837t662edwmp6we',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'cksai6mk3eljoz4a3w79lyn64qyjro929i3xlou0x68o9nugs3xw40ncecbtxzjw7kvp1a028gx957gc7ytbq22zhski7szemhmxlkn61tnw9bw6gg8jerln00noslepj032r2t48n5wn2u5ab858hdj8ktw90nh',
                channelComponent: '5vszo8otdfyrc9qxe43kbpbd7ox6yod4iyyp4rof8twlmlfvrwdzc0zqgwnd9vzyigrzwkwcs6nk24868bbom0eq1jxlj7r3ml9pvykuvlwbj1gtvzaxpkqut89lqza9txqyowlbyzsoge3mxpbvegm9coz9fsiu',
                channelName: 'zt0i26au56ylw3j4mmypz5dwmqxcfrmvzifm3atskallfkec3t75wfiq824vskbfav32asjmki5vo83a9kglcrcm2wrwwnao9uqx0u5xckqdmx5hzew82rontor5hbcnzzcscxwqrlbknbgan8ssl6jcac9i1vnz',
                flowParty: 'rlq9t1wl2xogl0akn3fgpvbsfduqlqmd3ckyi846ym52rbo05x4d6aq8e8fkhiuwfthkxf93r4uehtj6qbmuygnf6l5pgvm0del4svh74cqo37nq63gb5g9l1myofqxog91uzeqck9rdj648rscr5outn3aaez27',
                flowComponent: '0wzuay3qgpec4dyim2rhn78wv43bfhe5apv82ju6vx308qfkkx11n65xi5n71ibmm46xndy33jyxrg4qxavpe6cu1ffuiemy8ibn2w1uyiddoe1e63vxlcwpyyzrhi1y9bp6mlgm5vm8954pdtb1ljpj1yelubgq',
                flowInterfaceName: 'alj4kj6cp6wq6h861ejekcixu3mru1i4b6ts6pey03e56bkfbkofu7c34ppeapmld7xcdd0wo19wuac11vpusjb5uxqxh4725he231sf84v8ci20zosd6nqrcs1b6ebjat9rlhb0gnmqerk7hs55gb0w1nw5tf8a',
                flowInterfaceNamespace: '9ax9fv50ailqj3cjvcqd2i0u7tk7pgsd4mjtha7dpkt1lpkifdrsx3aeuvuvezztckp537x2bp9xtqo9ehonj3tlot2g6x6nsr24ymsifftb0j4v3zdsmj45efbfm3vnk0q1k0ap4yq19cyhkxhj4y7fgy6uz6yx',
                parameterGroup: 'wgo1o1u22g2o00yka6sqshtdd3u07ddocmoduzcg8e4a3qlbluj1wkzrwy10y4auzk4ko0nfriuplx8wr88gfkyhalk2lwlrrz1cy1ypi6sjq0rdpavluedf0ldb233c0ley4w7i0hnauidnxqd4aaxrn6z5l3oiesxmx9ldtj3f43ju8pt0vr2mi3d5iaxstu4rbpou1pal33137nbs8zh9oy0ugyv967i00mpymgay577sc1qm8epjrs4spu3',
                name: 'dzdngo0v8qo0h42c4xnuauqbafzz7dib88lhjq8vr6z6i69mhzf5gd7cycc3ja13lfj6xfoxdejd23xsscvtr8kk94l5c9p8l1gm2rxw40irqbkweom53i6nzlhxki9sxxsawvmwzuemjfu4g3auezq8coxgwumga37vztg029802b47hv74jhsezjd77jiov1eqmg8useu994qf484fejvio1jrm83snhasfkv13vozjjkhzk8pzp85lenhx1yenmbjh9m73j9vvapmo4mfkc4w8cvyo677ztu1fliue7hvfhgpin5f7p6tbcceqdn6',
                parameterName: '8bate272ij4cqn9524c7ps5n63vmlixchcelk1ip2kd2unxmdg2itkyrk58p9mmxrz9tfnfu1ufda0mrt1rqy0edtr0kx3g3cnj24ufbwgn2wowz91mrat08l33aag9nhhvnuj8kzo2douw15n3j0cgcubwdjwz91xfpfsfqr1gxez3n0ze0gmjcrgp807mws01bg6w6w9d96a2p6l3wibgbpw44dou9efsl8whl1v1utyvss6j8zlinqr5jco51yhbb5ysiwj61dely9nxfk6uo25u76k54n76xs3tq1nd8uhnmgavfc46yu5j3xex0',
                parameterValue: '9x4we65335ss16ootqqvhvzgbqyvx1medepvl1q2p27y641kgo8nrtfx74rx51k45ftajbgi6vwybutrddl5wzgthimtbjn45mihwj5npzx97wnnismydpwfrovqsbfnyyvwubsye8bqr6s45b40rjou52mfzfy4in95k9nihafpvlrzsdej8fa6nf09jwzubfg0e83gjooao7kh26tvzqccc7h4wbu5q6n6b7ddx8ngfts5ksx7blz5ncx9k2cjdjqynbqy8b9tz5ljfvmcszd8p6jvq86sbxwl9vnc5c7sqwi9mxpssu8jg6mnjrikcoax5mlyjloqd9272av0c6c8500218nn709n0pw71ryyqq91omrfvn5fzs4ye62ulzjoqfx06ysjnr8vy2lqabcue4ogyw1e9y8ao1v3sro603tz6qfytcefp21i3iku7s7gtvy7apxjbcodpjj280zpnl5gf2sngo83w9ogrzgffpqaqcpk2hs9ch9khyiodbq6408h21jiirshua0p09y0q5a6g09w6f64jughozd1wreefrrm50cvlb5hgbzwra4arafjt788r8wert8x7ss560jxhodn24nuicwci4z26vz8j1rzj25fqefrzg13j4e3i48db25fc0eyn3kg82gqyfmu7zmipcl0o4byd6l2sa6wycclmdpq9yxs2n6jl1wbql0bajkmodca5er1wwk8r49e9mab7t468s8k6mvybgvnwnj03ewh4vz83ujhijvje8pns87m9kh9kiymkvri6ju7oy94guo7ux7avewz7jnkzsk0v81od31nzvkcik03et8lnx8czkg44pvwmp159g0c96d49ztsi595phzrkeh393kgh93kb9kung0fbmj7txe71g3rje255xpn6bfrfrg6i8199ya5rv80a3bppgj1gnfyca8yw782kj6r6m6iev819lsvfwvpa07tn1gx2wmrs96g70j3ldjtfxps668fs0ncj4jrjrjg8rp1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: null,
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'ei9wrdfsabefod2qzvi5wj7sulu8usjbnbej0nqmz6it8xn1lllu14tlbjqijf4qztw6w5j5mij5aeeewisliw7t4h9qao3bcy6wsu2npp8d1cu1jg9jaykj3u2y3gi77iagl1qoqayj7osqr1t16xzqoig8p6o2',
                channelComponent: 'q8jjicejde9m2w55t2a7av6448dtozh7l9ab1llmui0jbg9ci28ow4dq8dhhqeq2v62w3hxi39etzvw8j2ljrqj3tm2g0sbbx70qxjye5unp63bdv4fngl3o6rnmooi4loik5umuxdbvps8cygh2nupalz6oqujv',
                channelName: '3euyu7aqk6jz0vqnwa4vevq7nvzuw7rwslqxxpexo1gsorrtoh3071m2xz7399x78pguwsx5pr8jayb1ryxbo35yhq6crxi6zep51bkpnqa370zm8sgk6ybhv104czxj275rdec4tr5oqb3sx1aor3avlzu4d1wy',
                flowParty: 'qmou8hiw6fz055vgvqz8qd01vex39glzpzh2n8pamjqwwvyszkto16cv9blg2kcnodgi8fr7ai14f6z1zfd6qby7ul67361un59v1qhddxrm77bomkb1ugxzu7whjr4i4sc10420ja73mryjbe80gz1iose0iy7y',
                flowComponent: 'wqdqqk068qlgdqe7v17m0qw79jup7jon60wl1r5q04g6tmf0y3dn2gwp8rff8g8ei1vpmkfh51gsbve2sm876ugkggvqtyzzv9hr46ce06sx87dlkgybiix9ye439lxp7d8u6ic921e00aijwhzlwyzbuz93dgrh',
                flowInterfaceName: 'e9387vda3e6w1rd7gavilbybuhzj0136bvahmevbj5mapg21dafi7lzfblohkwz9fkiq350dbmtkzmgy41xnk14fnnedm82742axal73814ugdi81ows3578jhsvcbwnf571a0fi4e1jsvbeo1zt8rz4yoefsmoj',
                flowInterfaceNamespace: 'oen9uqu2nidqd8ilqpuxlb7yrc79fhfuihg1boy3n3u8j9kpwux4qynos82wazbdmi53mc9xfedrao2qed2fatcguoqmzbf73u7fo0h000ov5hkxxfl8bofpd66vvogzvx8x7am0nkesqkz8f9jfhejpc5wehqut',
                parameterGroup: 'aehqwur1zdf6mq07r1hynhuedjcl0fk5gg2rmmcjbxtpb67rv928toq6wyx0t8npnrb6hxpblq26wv5rrxuwcfeh31wjad69ln8nrx7ywcrxhmbqil3ejry1253bj850i1ht4r12bg3ohb00v2aw0v865dbetian68qlod7q82skcxwlo5gyaz3sxy635azh7xhz2qsdeb73d2ajoxiqce7bb9k14n04x1obgbxh0fr2ptd1a671grxeoyvqr2h',
                name: 'tnuviksea64igzmafmu36q9pw77bqwo2mh6wlru0am2s0hz9pycgq3syw333cw7vk0uvzqee0p7tgk9759t663en9pmx8liaxhz1wpt9y6y3gs2bku16fzc0g4gq5jhjb7h12d4v31o2x9g6g4gaq970eyqfwu6gp6rtpvvgznbwvht98hv0xv4mjgexcoi6y9uk675netad6z6htvv127i3cyjyw82rci0i16gf8o3uij044lqknczuoj75rgflgsiy5ia3i6yv7ib4vba7i7ehrcetzu0rd69knvan90kvwmn5ihoo1xbg68tuhj8w',
                parameterName: 'njowpksidhb0sv0qxuvtm6elog5uprpww48ogup2xwk2kgkvnb4wxzmbkylz10qv1gniw2kg52islltpw1cziz1s0tsoj2s2rnakxb8cr5y7b8fk3wkgara7vne2mdws00kzpav5j8cf1hov0mfj5aolo4aowyc94spx4bjfe6uzgswp9uwxj0c5ricqaefonjf04ner8t8rmjnbpxwvyj7lu873myddj4wbi6bntsecc62y9ziwf32bwmanepanutaybkl3aphz8xb4oricqldlw7zyp64xvnqpcj4r7x2pyeck8vezps1y27bkkdx9',
                parameterValue: 'yl6hrx3q37idt51szirbfkla3svlyz29wj1m0jd9wh69wq3ci2bdbu1yqqov6wo8zsgaeitpa2vkz8epzt38xv8xokl8pfpnt9tu44iihllae0p7uhz41hdtixnp8ksk7xanxzirlutyanzqgawumzsq3lgkrnfsz3olg743r880klrjesaj0lgpsia384al7ctjw20o6eyuesuthg0a0ulckjldub5yynejjz9bzjg0qrg9plgx5ay37bl0jage0i1qqfvomqkeyb5l7eribpv1yaflskq6z8mkop0zldllfgw6x66sqtex69tsw54e8av46ra5ocoxe63wpewn7rjck0qi1f5r6logzh53suxmei508yep4fso2q6uuia8qh453543xf7gmjk4gfstnd1ic5ibj9prbaxwb57sgxlv42vwu1yfy8cc4crt6fhs8r95jemvq2i59nlbrl1mamd7ntu5gr7yow7mlgmhg54ag7sabl5ud2axmkskqn1mkwb86g1zrboow60jqbzdzpzo8jhsfhe11kxcpdb0vs0c7qsih6jmoff84oo3h8byigqth5u7bpts6c9tq0w500cerofi6ncy8qpqyx72ggu4seqzd7g1u9i1jceclad6km8126fyan2b6ep52ntc3d5dey2gaakqojsgtnibgco2fan1zfxtg84um0jp944wja3uzik5dykcvtp6topniex5cvrqti4hbttd2y22xrb3eqzr04wc3jyyak5pemn7csnkkhqgwdjzr37lkdlk4gv4n8qst2efrii2r3o6wavo8ry0poej876anekq4dqqta40n6jwz4crj6gs6yzce5huc7reqixuxsz4umqv4ii6wzatxy2wk3zmdjl9lbdh3tc8kl4w33gzgwcrzuoz9otf8n2t8czyl249soy1e6zdvgdi3xum8322cmilm46knj6k3sjlzr6gpkeqdpby6sbapb7rqs97kyjq14mt9yhzqve2ptifwtjk35dfnbyu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'nr786vypr1n7qm6hde63k38t04q1sq9pwx20sygf1avrgjnf0xsmj2od8n219xvtup9n00iubv0r21s5a916bmw6zh4ludljg6fuewckam6akr0e553ktd1wi851oxa30l7l42e0q3r67u5drnej65t3g8tizrno',
                channelComponent: '6we16rwkxu94nwak114f9zhqyn4513rj6aobaxx9b0kjs5ina6dlnpxmjpcn9y2v6i6d66u41n2w0sh3icm5vmp8p6d8ki3ukdhalmr8e48t8u6w6ao0hee7h1ju5jjnkd433lajnhhmnrs53ojys4nxivy0ydyh',
                channelName: 'inzfrqzl7hiu21rinu3qa7ftnxy5opqf9lqr0ub5iuwdkr8rkfkpp2mvktshbkpusztz51fqyeo31lwfibcmuiwt30gksvgapclvy3hu49worma1u690mzbf6ttose3jmockxhh4m7ngcz8f3k12ghhlsn12w4b0',
                flowParty: 'g10z3zjxgy3uxmixloopedzj98nsy07g1fpui2b4wdxduyk204i6eh143sot1mg1egsn7rjdmcj3u6pibpmtncnjzs2yagb7hvge5we3z4en3etlo9ofbvglmxv8z1nm7udmda03o9dx85qae23deh7aq0dw43uh',
                flowComponent: '1n6hgivwpeu7lo6g5l8lz9con9o466126hg286yvdo8k4c7v6iztlyif0y9z0a1e2egzxqbtlnb4smhaj0515m8l241uluvwjg4v3v6mej94o78uqmeuzcn2runh3x3vnqi8nlyd9dm71rpacmqa16lzip7ywazo',
                flowInterfaceName: 'o3e81tr226eb5epbpamqlrqr666a6pq2ejfxd05icbd35ge27b8viezgogqc2fj3qn7gsp8mhivzcnefmvd2rsawog3yf29vo9278vq0sxp81so0l8jwjqp5nrawsol4pnzhm86f3gga7eityuwzw4o4f9scty6b',
                flowInterfaceNamespace: '34epsitr1thk80yin58eabhiw6uvtbjdy8oq4s8l4pqcpnikpwjhfooqc24p9vo3rmtikckq8mh82ggyjydidfs34xjgsnd1scgts8nlk8yvghnypguijltdg733dq867e89fzdkptm4fjrtzcndtuiwpeelcuvs',
                parameterGroup: 'ag2lbgwe4rz9d3m3mg8bg8nez9sz44c8u4d1ptblduo8spvzi9mem2bht0dd0wi1n9893h1ob5s1d7irlbj8rqkxk7m9os21td8fv5l58m3g563tlbqnnowwd0cyelo4z0mcnkfqsgh8uhg5tx13l3in24jxwikq9f5bu7ctzidoszz81od2p0ox38iye5hq3a1427xf94b5hya95p8ksfitp7m5r8m2qopm31sra9qpn4q1cj4p419cse539ms',
                name: 'fgz12td2nzdf3ymm0bjdym3brmjxbl4aajeetntqsghuh4bqbvrf9dtkbg5cjklf7l1q6t74h3avyyl192fmiqcb444bq81dapxnw3imzjviuj2r9siebjmoef9uij7xhl5ka2cv9l81od85kjd8lame9q5y63lb4lug7ohti4sh25rts1uiooa7gkwled4pdul63z0uvdoij0xe3pc03zjxxhjagxlu2teekoosi01ll0ov9i3ttyqqsugypqjurig5rhdsj9y4hvfnkc8z428ucm1rkxpg04374yir1pnzu23fik1j78pn7hkxp7g6',
                parameterName: '0d72hhg3ucj9yrhvaisaps65k7xt6pm6cswripkq87y7l599j94c3efjkicwkwuoqtgmdct7t5m17qbsjdup7ay4jw6ird5sj8x8v55dqj3tkqjmnvzlgaq4wj58p5kqxk4ca2bw5gxekfabm1zfysei8cb6pvmfqfg3n1843i6jqtg5m938ebo8b4dfro2se71wwr66rpzz4ithvj3xdsw9m504eyuvekbhmt0n94ixnkhchsxlk7vric439gd1c7rlaqmcnasq7p03saasprebmc1znypbzz05rv7mwq9rend3fb8dj3d1eg6sw21x',
                parameterValue: 'p0k2l02u27td5wg5q8qu6dyjc5qmhcllijvnp796moicforybndysuhax4ks8aj79f3sjehg63d4s8qb6jt5riwcdgashcxv45cuw1ki515jytqb0vn92rd9knmsa2uqbclsadyb9b7ph9zgudbec6oulhzcotv9kf88m4i3kghsxh8eiogmb9w1zxed9nrpfgkybotjkqrcxz5uflgdc60datbxzdk8vmy4l53v62ffphlukj7hkp04o7cfqtxwrh4kmhptm0re63wvbvzzq2fx1mogrwd1yjug3ut27stjkujbgwmuqjihlv88ef2rg522g7e9t7qdyzh3mgfvd6udot20370bstd61hc2wttrg8l0k7x6qfpkrbzcj2kyrh01uu8y4o1mrkgojvhzk32lh35jlohll8kd4yvea6bs0xf4okvipazl5a6jvooab7tkgwt2x3llh7t0flqoetpfc6pkpoxeiatjqwaq5svd41u0prwdk8ncyghm2w9726l7oqovuvdeu7wxlehurn7i0cy6gvf1vgrqc9tfbb21skm802iwgiwqaz54m3j4itceki4q4kgs4mt4cz882i7u3w3gqdy6yqa6gobvy0vqb7m5is6rmx4ngut6ho4fob7to5y7zprdy0u7z1raar0qvbo8j5agi9bhi4n68cbk9z6qnzyhqjzru2jek78hhqfavroq5gu3w6u9be9t6qo87jj70atst4z1rdhem6xt2x1i1dmd89b2ek7dtf5cot8jztii3kmoerm4w2k43e84eiawlge4xuluhkqfgnxj1ct73qw4mdg7xjp1guwrc9ixglse7k1pe513ni0ew5w6tzi9aj1g8m14qid6aiiwtaqzs9e1e3rprz56w0kt13p636owm6aqpoao4n6vj11p5ss55irijv683z8yrbp39kfe6kc349f8wr2wpr4oo21py2y6vdsgc8qi3cq882uka0zgbz3rg6tkntfncbkk4vcd7kbii8xz79yxr2jo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'x9xxrk4l4y2w7m7g75ak',
                channelId: null,
                channelParty: 'qtgxlrhsc50r8lhpgeskacsccy898wfshn53e4btpb4rrfz0afpgkqesz49mfor3lqymo4oaqn6j9z92vjjaz5m4mi3y7llq5peg851oj500vzgb39s9nmsc40afz9g3b03bi4xa9hupd8vyxtv03640k64yvaa8',
                channelComponent: 'luj3a1xyiblfc9xgj1x2w71m8tt2y9u6praxq9fjfzju68r461dy6qnuxo7hi2jwcdgjh96m0kyvmeyx2yq3san4f15upw5bthz66px7e5t143aqbm103fug8hjwok9dwx7e05abexm928hsqy6m2to75nhwv1qe',
                channelName: 'zjzs7qo3cf1jufkk5za4oodyg4kqr0w2yj6k91slp620j360612hft9pqqwhgtqvhzwtlmplz7i2zwuqmfkfd53p2loby0c2phm6s1pqpd434pnpir14zlks0jmqazrh36iea1dstd868n96klfh87ie8pyoyexi',
                flowParty: 'beydze3hj26ukt8hzfd4dmsttmmp8a7v8a1vdfl5njbriwr0g0dk36kx4u56brjqk7mxwnfkn4qe872vlkt4nn8u9t5amjpagbjpca3jicme4g0tsxrzy6eiajrzoyfqx9ay27ny6ttpmyv3wkkcjcllyv21ke0k',
                flowComponent: 's4qeufkce8ne1u57avyt40r4rwupb8mjt94oe6fxumv2im4fq603eb22cmyq6ikmpu876orc01kmfjtqymf7atsdqw2xz5kzz1kerdfbdpqba1qfakhf1k70qysz64n9qun7bsst2hintv2ijnp55xz8kp1ubd4h',
                flowInterfaceName: 'h0jy9q0c1p5684qcw3ibw96t9sm36tqer28w7v7brh1cubxqxd7l985yp7gkbyfilhnc8onkt2m1nxgxgti28hiy666wm9t50txfrbb2ffeb9ula4yw6pspofkv0y2oaysclkp6oh7c04ybydodwpdkgkc0z3px5',
                flowInterfaceNamespace: 'dt10y7whoy2z2otd592rx9461mix976zbjxbgvmg9hsj56bdx8h7ulfcn99mf676c0xneha67o18z8h4gd452aaah3udp67vdri6fdvejqxxncenjo3uo1d64wnzdi1olmo1adjaq7c3b9epc1gyo6414pdveku8',
                parameterGroup: 'ycxhha5i7jgjhnlivqz4qzuxnjnkyrc4vcuwug4cigwqub49jx0bhtcodafxghu4emqsv1e6pw1336ifva91vpdmoc9tiitotmalkvqukzhhgl1as2b00dspw7z3txacrtv3hftj1kztaxeorbg1bdmg1e0pq3myjofz1hgbptay24xd751g0decumqubteim5euwcak5hmfi587i0k5ntgkj3pw3i93r8l78vlbyylqinqk3yuno1lbmmexy8m',
                name: 'j6tfzllxereuc0oeqpqbhug1dn2ybgaxvzdg8720izrphro4qwqvfoe6tcgpr0c8q3f6e0tmioyj1bmxv3htx22bhwtdtfsnvd1jbow3457xetolopqq0rgt6ajqqd32ynma0cxh29lvb4088r67hc1t6gbmddzlpblb291vut5nfgdj5c4o996rp63x26239nx40f0f62u8q4mkdan0ljt931vv9hs53dks0011fwl44y7x92iv40t0ocrtfj950uem5oiiowqq5qkqnun7sdajushz3u79qg4fy799ok4cv8d192f72toj7h6l2hbd',
                parameterName: 'd18ng9wyjrcb5pvcnjbims1xfkk66q5sz1umlf9jcvaivu98w7dew1syik9ibfsfp4mry5862wimsx14ppgoj4vmm5l3pth5ztmiotbb4nv3oxcqxdkxpx7bo0ailwrap6rnq3evv5339tggj2oj4sgeez5w6t7s197b0bsty0znxtdox1khb7y8s0e96zm9yo3i9aq63canvf5bjp4yradzhtlez076ec0qplyxwz222jcgruflmcgctzca1xnkfcbmi6kx6oqyefzk1n37ai3gbqmnk0k6qybw7vnpmv19ykbvhhc3jdddxqksi0a5',
                parameterValue: 'fpu6egefbd2fgffxjno1n0467ex3zi67531xzurfttjlpfaneyrol682o01auzncy6bbhbd9x643egnwlwg5drs28r9ehe96vayx6itg4sst2p12frbhavmaqwfwbl39wluoiwljny8ojrel6byqacok79fd9vjzzf04dm44uoabxbua7g0b1z347je0vs5mr4996cffb61h863sefo6qxlhgtkiierzx3ca2atsgqjuaiwwuqvgl3xq2x71swr4ck2oqd47wbx4b7mjsiniguc8inlwcy7omdkp0n5lfhtrfrwq5waljcgrpe3lmdbytj9w7eeoaj378969ldrnnxbrww2o1erpmrce8mtzl23albml0ilibsf61vnrfuydmmdy3gi46vm4xox6efnkslgkbcpwcqwx4s45o9dbso2m175x4ntniv8uafdgbuvjtm036bs5bmurgzbaqd6hlmh3rzz580i9my2oxb3mpljltbcxkp49yp9yxewpn6gotx2jme0xwoujgml6jzuhxkjqttmpar04u5b48gwggcndotxw2mhvn4w5od88wg6htnvl386bsz6glkp5lroibj8xj07kbfdvdhptelve3254wfla00mgr22n7jpz5nd1wd2v0i355k99yvvigun65xuh2acy3z73x8ugg6ru6z6a9j0yl87scn9w8p5tq1ouci48hcthoapwwvotvawsz677nx8hvvafg5yf4xitc3jn6loftelz2t9w0izmsnti8a0mx5yxmmr33qip69x7ftd2hrg4ifabz91mjnnba5yc1588a5myq8n39im6itsrnp5s3d2v3ambt76dmkesu06dlxhuoed1e3vlo8oo9c714n84e1iq4lsiw0t8ww8uayjkfta673a17q7k2x6w53nvy1jg7qc5s7idhu13spx3d1zvi7hy9p450umr5mnts7suajeqp50w7na4tucyjvqrv4j36ngs6ccrpl6cxqf4zfsqbua5b40ux0mq7wyj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 't34shk0w4pz7vym73ajf',
                
                channelParty: 'hc1vs1oxffejgt31jakj3mzgb6bw54s7hgq0vq25r16kgh41bkx6xkwpdxdzu8mwmmib534mfp5shaqxrujskdzsil4t3liaq54zcxxre4nf45c746giyhosolqru0a1cuvr2dt75hxwabbco3zyg1n83oqef3ji',
                channelComponent: '4zrtblqzfsnj0xhuzqikvjztg460udeo2ux6ptdonclo926p5cwn1zh2up35ym5hg6kwhni2r24prkl2e0qntqdqwn56haa6brwbya2uwlssr3zbip7ke1wahal5qoykp0nrspuow5solve82bvtaa9h2uh1ba3d',
                channelName: 'cmda0t8n4u9q48sdui3vzauld80azfco77eccn5zi5fnujkm36x03h6cvq6kxpqucrdtvj332zqfyrmfe7sbybh16ukmydhuhz15grbyena5a296zng2usvg13uixperlv426piqr7h0dfex95dm5wwabu5d25g2',
                flowParty: '4vzi11k73obgpezlsm3hnywj1fhgla926fk81hscdm834w597j8lgwflp2alhmvw4hbc3j1pku9im37fyuiw8n20aspqz3ngikkn9oc310bf2b23jpf61rpulabsbxuq56qg19q68w4zti05vr7zvcfe9l75inx5',
                flowComponent: 'czi81geoznme34w0z9xj5k0lhj35nli2b1wvon3jg4zp7qmujlmvebl6kgepax9vgn50xyx060qu9wlyh9jl4bfepsvpu9dtc20d7a9x0t3jmcybwhi3zt9pda863zazsgcrf5lqh4tz5ctv9016rd3wvzwsu0r4',
                flowInterfaceName: 'fpu5zw9doo0h8rqi8jz1utynsk6vx24ol2diqy93c50ptr6itgfna9k1dluld04e8pq6oa636mrw5g28d77y63ymsh0qf57gm8s930jh5yrkaglmupu6n4uty9y3sj6ga6uenfkjgzv9iq9i67izmc8fjuufhdda',
                flowInterfaceNamespace: '554s90qm6fwf55dnw6dg1e37baconrbydioawuf44dx8ftw7nh62ft95iiajxhvqr2h64s1tuyi17lrd4e35ofvcbonqplyt33lo4qygoap49ezxluo4uipq3k693m76pjokygbedbkuerayjbsh7wgwmnwf9z13',
                parameterGroup: 'uxw6wp43trwexws2w8cyn5u49pbnytq3ajvnmfg697gg8rngzc0hajwmlulpgzwsaw87dd7ybsdogbf2mi646ci3kg8mk9an6spo9evmnqrauaw0d29tymwyu5rn6qti4ymb8hnw4yog7hjrbeefqjj0jr5h8i685u4xro97r15letkpf6amcr7c1331z4sfwrk2267x2torpnvpxe9t0q4qu4cpzboei8ah90usxk3ovxcuokjt0w4i36kb4kl',
                name: '4pnuu5gym96644fbydo4d5xlw145ls0bn7m0plsl2ad1k51n9juc557ggnac9kmtawoqgxeubcgnl1xr6aof6gycxk5ltpsovxpjhuwx3oczpr7kwy0df2xk3kyxczj6vj2hu6cie50r6u0s2onvfbfpclxvot79qo8kc561otnlk411xbemvd1nnw3jwnj0lpa8p48a66f21nt5lq3fbttdn2nvbt1mxc6w8i6ab9fd34dj90homxlogmkbstl9gxakjqrwhj84l3xtr5yam6wuuidwod9g4xyke8b7mokkoaqnrg6n92g8knzr2gdn',
                parameterName: 'afwzamfl203xxek4onguty6jvclw39jq2ca2dwy66dqjtoekwxjddekc2kdvfh89j6mnx4fdz5t2x5tdfvjpmjs96nzdtakuqlq6ajmw6fgrepmz4nzwt8fyi1ckzfyfip0nm1eq7od0i2la0pv54gvb41ysjchsd1lae07cnwhfgthif8nf21wyyhnxabi98ycrr405ifhapnax33wna2rc4mjy3avrjrzwk2y02jq3y4qf2obsxscxurbsg6qe2dtf8upb1hz72c6b99f1mbk4g14sk4srdbvrl36cm4cro245ih43p5ess619248q',
                parameterValue: 'a4g5mq0p4k8ggbzlasd0bqu4huwrp2fvi3kxc5sx4v0jt4p6uzvd9npls84qrjy9xbtm2ljdq5ti99pg9c6ofeuu4od0cuecm8oy6wqhcriwef3q4xu1tbi0s19ps0ek44q4jukjcevlj50f7ts12781fmk2jplcn33w7rnf2s2yfi015ttm2fjiggaz1d6urq0v6erqbo1bsyt3jdapso9nx88iquc3qcdu8yyrf3iy7bwqnoznfiiga4dmlwwz1ysijn2tdgok1p4ht0tqqzshs544v7o29rznsa7q7mj88j8o12f1y3pufh8jof563lqdpgauc72sjuziwjo25ivugdxqvhk5xnck086hnrnzxrvbut7xkfn2dz2pxpr9d95mmsk2o2jlz8z8le9gdhp6qn1f28ie7zx6sm6sj10wnjlj03737tagtk8zxhdwkunv67b8yic31yax20taohm1k335gnmk95zsv3s0zll8h9fg1t3vxak17zuw4socviv38zgjc1dyk9lf3kii45rddmp9m14hq7fwpvxz5x5n2k627p6hp83a1fmaf66sr5916naqgdyerphbl87j281bknolgzyc60m4z5e4532u4c4dlhztmur1beh0om51hfztijfnekmo8c29da1ucgvp8grm7gai9hljlb3v19194nh0pt811cn3vhycnbg0vz4q62r078s37xkoztu4jg72fsmmr63yhio13ittt0qhveeqw6iev6eorh0tt2qrxhotcmamuyifnvrz38kyts9mtq7acsj1tyoap45e6xt5cmw9v1jfhicshz5it8vgq4u4ocu6twssmhzsynunc6th436rgf4yyqwqfkpemzmz5u87chjk66ntdion8l8b79boyhe15dn0x4ek7e4v6i0hmz89554yz62tcdogco2o2xeynppcmthpqx2c4hdtop6tty0bkhwpnmq1bjsz840k3r7dgpg5pr46rod0zu9sgbz0sphkshm51yh4ldsm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '3sqto25ozxxzzoaezrvq',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: '8pt79l1um2dxem3arg80pxdvm33lu2mcozxbohesx0z06mth1cbyo5ucbzn0l7mz04heiwqfnhh2801vth9rz3pc8vlnj6kegyz2gl4nbofnf3dwkd7jju8xbx829mabfq5uhouyt1k06nncag1u8yx3cge3w83f',
                channelComponent: null,
                channelName: '86r22dkr2rlzwc7l2qruhggannjgl3lpmxl7upeu8amasxwgo0mmx44d4xwphmdonp7miieea1r8l0nivi2ly4nslj6xpnxbi41t2j3iokrdsks7diwqclysh7slkq77f9qaxcexfgzdgyoq0wsp1oa33j74o6wm',
                flowParty: 'q45n9aqi62cm3kms13t8xn2n2opwll8yjtgfjt8hmfdjc48psdxk9jve63mdmnykjwm81mwp5ayakizqmt5lvhchwqlitqzzd38jz6ir01pv445eg9itvd2ilmy244iqrjqlfhk20ck3icybbvukdl841xj0bzg4',
                flowComponent: 'o5fwy3dp0g1edar7hpzqauu39qzxu98crl20tmh8wy1f9mpt4ixeysh0yed4hglm7m98augelrnrs51t9t5xyfabmu3djq92izprfn41ceusyf8kd162nnfpcqpdq615l81s23a0lbsf0h8m26qwdytifc5wpme3',
                flowInterfaceName: 'qa67lbrzdfd1di7o3z0zk8fghu5jwrnwei8ukpb0cu9m976dxfnxlv7sxvtpv1b2uoyf6hosx4hb3xrdyp6qjm57ualcl05gejrxm06vxv2ujlsykdaovg8lyodol542a3yxfcc0diakuhl7cz9dfrapphgpeala',
                flowInterfaceNamespace: 'c907guqeq93fj0gptbms7xupd7ofst1q8a6qjdxbmzz6901ofcsix0swc8d0vwvz49i5aq9lhvdzsorzwx5xmdm0ldheru532ipubmrkm6gcv8gfqbxszxi5goplwpr9pikv39jjr726txycm6j9rgex22xmuoa0',
                parameterGroup: 'kzletlsikoavny1pv9kyuc19qvzl6fr4y26qb9ne9dp60c72n9f2j73gggpqxl6b5wlfs58wlh3gyrvuq4u69ox75wjkn0iab8spxv5pega959aui3wqwef2d09cizexlf14fer4lz4wita3q77dojbz5akxkcp7m2bllbon5291kzx59kebkwkm6inkuql9s4di5e1ihmsw41igd1wm89i3u72x8lvfrv5qfzfi695vg0ndreqwj4r6p35bvp0',
                name: '3fi95dycfp8e8dshsn8x7vsmwgx1t5glizdrtux0wz2pwyjvwycjrb4a3cb62fi2uhw5879twcvxfukc94dmyrr0wwn0z1bx5hgtuibb9u2zlmso31pero26lhjko37h6ecbevmc6ggryklm0b2jdu91l5zpb7ebtv81fcadj7yoydpi44p3vupi0kx1ol5dd7xjvtv00qiw3j3f6ngk40vwpsmowxjyw9r3no48aq8soz98slq7vx6huubkwhxr3069egi1r9xvr5yngaft0669sfe8t5lgjr39jt537ttyqfh5fkvplauno7pz5ewo',
                parameterName: 'n2ut4bz17i762nwdr6vk6r2d1i8i5bxsmh5j6ffpbd9xhzhumq6bd03wlntlt8fxt149yq2603kdqcvvhcctkovk6ibxsv21dxgo1xwy65c0ylze6qbbmeie691y9am1v0vi9umrgjyegp8n8k2ae486zx6hzmyfxtump9w5x6rprbp46xyo1rbig5bhkyrdhgf9apokjkrl89v93m9pwzyz9ocqtyhsa2woyrvzwub19rawnltm3aexrwrsundhms6uiw6g0kqnj4jrz8t5vt7a4n0dugq3wfi6002qvfnhs8a5myx0bjb4lqorz5p7',
                parameterValue: '1ey04pjsmw1y52m79lxuybzcv3tpt6zdlq9f5zjxv9jsgx5zcv4s73inqfpz5x0isvl1szsmk33n1e51ibzjt7u2wc4lfil2t4j7sdcfnhqkf8fhtbihfuyunluehfbpjnbpf0vz9avomhccjyqw9wiy1qrvu8nta57x77yihnck560qkx5wg5frtkyruqx6k3tnq6uz253z4479mue1wt3sc9kuslvvrmpcj930968trdnvk77ta403me3yz1zfdsmopb3xfzs21x18vuz8wisu279vu36mg3pv17ebuodff5ebuhhnan2erlg6buewgxt48478ioleul7m015xk9qy506dyxi2e76g68zcy83985h6ea5aozrq21lw90jl42z60f4hficxane832nzgon88ttkhrpnwdxvmaos7tdpvb6p11j5s3nh5fh1e2ton3a6bvs7g7r6fm6ox49r60g39buaimgy5ln0sav0l5xbale3485t00ngxns9xiy0yttvomaocbpseunh1x29g1i73cl1o2929ath8lyel2c5k6zzjmqbgwuyv5ljll098jisfni10pf5qlk9ewcr16ie0vmnot5eucld59fe55jlv8m4m8j0iv17ia1ukh3uc95kzd4jlmwh51lf1chou32ejmy99jzlztfy8ykavyeguvr2qo9t8rp1zuhmzg41tpy7ayryo1lotf5eyhsvtokyd0k3nk8l42vs87bkzpbzhbk2dmxwl9rbj6x7dckvk7rzgjrq4scpwwtuip6x1e4goo7kr3vlvmlaqjsbwjypodto3ydsgzcj82deo37x2dwskl89npi2m83ygmwo2pel249jws6iupn6dd4rkxksmzmn1tmrzbltfjzaoc0689ljrlp9rpeafa3kr3ik5zg795qeoq73qsmu29g1z9yldzctigggufct0b06xnothilf7191r7aqmagok5fm4gkb92n591f32z46glhba9ztc6b1qs89d2q9tpok5eon',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '3zzl9oz8e66jetnjuscr',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: '263z80jz51q7q64cwvwbup6nnug1lhyvjun0e5mjb43naq1v968tu2bou9q0y0yucaex818poeczt78dj16kmfwd6760p2os0ajaqb98sq7oo42xn34amparubzegi6y82ik8ycm4m8nem52z6kr6frbyppfpn6m',
                
                channelName: '9ikihg57rqmh27p97fsouvfmgutzyv3rg9bep676qdrbum0uups3n81tfqk0bt805s1h27yhyed1ld6rsci860pkv67qczg148mde660dwtn5qa5y7xwd02oyi99tumrt85kf9ro859912nccp9s5ozmwb5mretk',
                flowParty: 'xxf9pqpch8ijt0js7gs8409viotc7tzabzme9ls3ykfr2kkfwlpna1kso313imyou492wuvwr9henr3323rfv7obpa2by8j67mfcvrsseewt1b657s4rut24ynlr1tme5abchmg1fxjodsipjzr1xqa8ed1nq2fa',
                flowComponent: 'faiycx9ct3o05yp8eqt466lkprbmn579u1r8v4fzpmunhoa0w8iziv1jfc4e64d41jks00jhkp1k4h09aexwo00v5y86ovyp9nx6ys6cghjmuyd80yvfxinzgvb04bceago3leqvabzbdjzmkcykdxovubpmt8zm',
                flowInterfaceName: '4m1kmgkllnele4ehelub5acpul26yovw4gix5fhysjg0r63fn7iglps4lacr6pbsb7j22ucz8qxw5uvrdhmvjooui5n788q3mxmzwfe1o1hgy60ao0kmoalnn8wwtx8tdrk46q8i1y9w05wwut090awqjdb1zx7j',
                flowInterfaceNamespace: 'yqdiu0h8bzqzhgmjtjcq3ccdded4cxwkm1yznf6ts3wn5a9xtks1z3dv6kxcdgkg3e3rnif85k4olj8bwmpxibjqhh2421cy458anaj7wbz6jd7ajm60mdfl0i8omi2ynzepogvh8t6y0gtnyxvwdys8mseanha1',
                parameterGroup: '79esajnppk7q0lb0wruukkni5aml7tk5zorg2skxbvkpxh3zyj6q1ufm44ruf2c0dxnkt3hk5qvsb35dox0xy5fpp1o8mfy3x2xj2jh182x89wob3xcqtj0oll9e3dfn3u11nc5smxg84xfuqvdgb6ehe56e5ctu7mzq418iq2evn4c2zy0l86g11lj2o090x8jplqjvkb4tlgon6he0l8s5yczdqvs11m4f0dr0dxy4xrrgtjmqwhtptpaybdr',
                name: 'rradeodm4om8nlgwtv4950isi3l6zsuki79tzorbsno0kz3x6yc1bp3l01d14ycnkyk24bmq41xn0vdi0xoafi0vmdfpjytnqnurxnj9l26s0lp1kg2chglfeq4gi6v465eyu1aqfdymiomvgh19bppwlnp9vda77zqshfqrsjkco3zi2vku72frka8xdcnec20qu2czld9dvjzvfjfbagbpgz4tvpyjh5ppldivec9941076kmrg53tdfq6hydjqccbthhdui9ff4tdikiwhv3hwvlzs622f9ps9g7ytq9rd9duyhhiiaye94ml7e9w',
                parameterName: 'zvoeg5x5pj3svnhw9zhfp7gwt2ydp0agfzbcb0ufhlg8dw5dzgkwkxdzlwruhzuc5417wivo8y3utclt9seq9vbhtcb58zub65i0qdcy9ndfx8fktsw80k1obh8vi7qe27q06akiwm33wej08djokwg1ap64z3jqcr0i1pjfflirmn39v5lsknphthgru5yimzg83a1vg0jhu7mj2fx25usl4x41q3mf5vc0mij5sj87xrdert1f42235tud1w94f4i95tlq0nwi9vllp5hfecoa2bgepkv330djkhr8q5xlphqw64b06w0jwi4qqv2v',
                parameterValue: 'bek2r702c9tntoghlq9tzn5420mfbwb5b40j7c4nih70njwbnk1ki4hjm11vx9s3inv7l9a3sf3pqbnyj43yc7mpclp44svbgt3txg2s4qcjhr9421nbtskflxvl0k7v4hun3v0t0jmev7g9s4w3oja1mzmsjgdezi0i5t59io9d2s2cpvwtkjqacpb9bqrjl51lfj9977y4awxwqte6p3x29n10rwkqhtc5i7133et2774eblcd2137v6coshffyd9lxo1eotfzol5kzbibdyxnrl6u13cqptgwbumtwgljjbc3cyq3ralscc8pfbph7qjcez1w85bse1yolfth8i2cynygoluion86jmzg0ua3a1r45my8yh065mjyc8300mkrblcexdbzrsufoa1ypp9zng206dbjrclwdbfpn7lthg6c6r6z59pwwo49llxwjwq8zx09ngjnwzls3k15ene1yqy37l9qizmqhaa3uj5wd0zdzz0f51cza1hv1dqwgpyt66sj14c3cmg0pq5hnk4pm7cij7pqrudbdahkvia2j58y7kmi6xaqg1tq1yc33wshr6lueswznf9s3mq4dbbpkkyc5aqhz0g4qql2b9ezi8dfh7gnuy9dhwnqjiapl06uetw7565m6whdswab2gb8s7ysd50o3ovsw6n02c3jny9pfwk1j3wekfoyj295ohz0me0k4yala19rwz3jn2g7yw2skz41bttaopcaed46mmi2iv7dhaveucfhkrim3mu54fvhum2wkfv68f7l1p58bltjrjectrlj02aq5mwphhlrjad9cchp7wvsrwmn1m5v6i70dyxo1ak1lonlof1r0mni5yv7ttz496twldiw8trw6q9ih2mspcrgzgq0r2z0qbtt3aq1d744zwjabpl89w577qlkf9kkzry5ctdafeuhmhhcuo44kpu0j24n0v13pst8nl1rmalrznpyrfpvb2300qu8d2erl9saoks2up6jagm43k0a4tzor0wc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '3zznsbcncusvvavjvxqs',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'hquri1bqnpngbzgsrj94lkficdyxc6u31hqy87kzxnkctnpgri8jehz61wm429ucpwrfunvism29jhgqrjbwzcd3mtrna1j2yb5lmkrupc0vqk9muop39s7q258cvpo10m3fjluklhlmkjyc0kjnancnu5ggh3tb',
                channelComponent: 'rg1fl4xtpm6qkh2upfrshjha1mnmtix80d4c63ijdpmrlqq6bgycswz8axi1skkc4lxhe9rbry68exu5ca8e6j7h560h5vopplsssjov7eqi7ma3mni0510vtkirv7g8pzyva8ymy62bqhpn1j7ki91n3ruwf8j0',
                channelName: null,
                flowParty: '77cvjd89nbma59hzu3z1wxtnv6nh26s54ku580yapufu45zihlnn522c7uru2rbm1j1ty2un7q4pw9gm17w5b0wr7s8teaf0piij4e2lqvrsa77i2u1kkd7h2yenf5o87dysp2tt816hy3roblbpnd4ejkmbaw7r',
                flowComponent: 'n1qx1kki3nvt27n8z5j45yl43b891r46fpg89u3jwv2igklkyv49c7f2akyl42uytkphd243i7ycsprljfnt0wgq366x3fozrm8mvhtc4msl5mn7y1eclajxfm6xt9z5ee9ldwb5kb6iyhm2mo4xjizqbd1j8roj',
                flowInterfaceName: '1hwoq4uadyqiyqxmmco7jcyvw5yjz9mr6dna4yf7l9jl22p4u7rtldulkdzde5gvfcd2x857yxste5xxkm6cakd8ff6zt5j5jzmwwvy0wufh53pmb2xj5j5y34ck2vcfnpfvvvbp1s9ggxb72w5ir0ad22q02jy5',
                flowInterfaceNamespace: '8ztzwtvzupvkgtmjfc40xs0tnhxtjueuoy3wbl40eejp75odb9fs0j9gx4zzmyzav5h2fat0bly37nmbf1lfzfhnmtihzxkjiauwa5m182c7xd5wdcyq49hiy9h0act7ipe21jz2jt6pd1lj364qvybb5uzbzefk',
                parameterGroup: 'q5x2wkm9d8uq2mag2ffayp9cllv5fhojtney09zc2tgqljak9jaysys6f4d13zyl3avqqi4s3kzjaris9h44yphdy4qfj899qzwiwmoksrv943kgdd28lpfwsvdjd6juhvuo3w7xzepmwj3blcjbxoobj4sip5p1s2fkkreo8pkhelgvqwqc52phiihqjqed36t98fy98tuofnkb8zub8hqp4c0p4qcc7xjd51mn4ag5ys5awkec01x40lwu65p',
                name: 'x4cvcv1i4wqzp3yvnlseiktujgrg3delttor9ws93nxhryiy24mltvlca49xcyd5x58fa8nkszzlhfat5g6xp77a9hk428ktqg3k7vet65uxix5l7gyt2ep966moloqogr3hzajxnbh5abvufn1g8m4vt8hn7hacilgj5ersao7otn5vo11kep6u0zfgjqq2mjta1vj79cq32nowjbe13ccsvtrrsf49esy2bbilk9e1ovntdppr0gz7z0bdhs25pdyzzato6c0gatalmgxvamqbq4jjl99r0tbn4ba96w7o7cezy8wiulnv1zxrg4hi',
                parameterName: 'luqcf3668ww082p94cwe4kcws6ynvvym3cdh9i1hpva6vuy78n77g0c7fj34rk7845wnftps29n3beqkb6k6izlvp86hiec09qiw1a3ccsqnneuw7zqv1acjt5vqsf26qxy2psixdez3ne01dfunmig188eedqnznwt50j51gt5kcfb03abx1l3rh122x1rtfquds35g22elutwyxo0bp5vag5w6op9owwzrjpa6wvfihf7m0ijf7jw4pjiygt5dogmq2h4qpuq8yc2tquqvpviuz3j111ulfz5w2h7rnzaf83l9r8s3f12hzqpuzbip',
                parameterValue: '5cs52sjoxga11j9m04rull1lohk6itp81b13qo8g93krg0es821684sklosmcvk98sbv801zrso1wa1v0m2k47xp3x97sfouj8wra4wxtazsu2m6qtktdgc051y8kzb7andwynfm7e6idh4le7iemvnwow5o8xl6p0xcg03nk6etrp8itieaatn6lcwlt9w3rjecssyatynl8c2yewyr0e9g045gd38467tocf9za9yqp9yapln4vbsif3njehqomkc2hkqt8d39ubqxg8qda8qwv0tp1saqur91vd7jtgsnw3lpx2yld00ccr272cxctfe98vxblgbbh87sv9qnof00ywaorev2jfzgk7die7efqzsl5bkyk95r90yl3z4j1bp80ylltzpai0a6gsaopgy990j8cuqokfgr238mfhs5dfrwtzzhkxtftsy7votrp81hapaf20xkmyp1o96cuj5q2kp7lft362k6vtxmbduduf21kkpqo8d1pso5ysh85771rjugy6cpcesvqvtarki1kwkc12s03yllxgdsrfdr6wi9bm8vquwow6u05kamd39xpe6ol3347pxahh2lzyj4h6olcosysiham33z5kkt07f0inqgmx4fahy0c87ldctwn78q416eub4jedmkmlsx10743dw2tu8insghthj5538141opqvc7lizgu0kar8ut7n2nlckjmvm2lp40blsr2pmvifia0niknlmntucd4pqhh5kycwmj7x7eoaf7f9a1vcl2xwxe9ym22iqa3agcsowhixvw33i1mueto385z3v9r0zzy6x8xz30vz8su2jbdbtia9dtu115bgu9oebxnabbdldfk3duzzvuudbgb2b5eg0uz55rdxu2sn0bjz34trihfd73e6o9hp1thnz8onuxmv8prlpdmusoeponvo3h4t6j14dcy52qe0lba84mjzid12en2rwtauid2sjbint9shvfp7f8yux0f0zr19ar8mqp76f9agj4fb4r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'qxq6s19i8rr9xf9dtonv',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'aw4n51f3o68v4lca0mnlcx9u0g6hll3u7ka01gzyas0inm1qz92f74d9np5xk9rybqtawhp1jr0l4sr5w6epx0qjh1on3ani6tg6hac2w0w9q9ol5z5sqrxmh2oljzyzzl7ga82rc6j97z2y6lgcqbrvenpf23mp',
                channelComponent: 'oigcul571lsjkt12mzzpd8y0ceq3787l6n5kvwpf30kgsto8yewrc75g18qf56dndj8p5mqieji06v1k4b1q1jdydurhq6e8wxc69f0n2ovg1qokp2gxvzln9dqdnhmuk24blvu9qcgnmvc217gqb1qq1a8yc0cq',
                
                flowParty: 'i44xrj0w05w85gikp4iw9ro5oqjltj7nxu8rvgra1gji9mwzoegfvtckio2bhvks1srip5pq9tj7ptukdq95t07womrzn202gfdkdtimzy23c05as4mz7c2upqsj0ht4movphsrzyiou5hlzjf2lg0ztz4tcqd9s',
                flowComponent: 'rl5apjr4yv3xlbkd6mzt6p267abjtn8d9h5uswgvypbetcl86dw8qcuahpesiz6otxp95nj613cfvwp2jkx3bn6ab5l3dn7gl468f1c84q63sblszv6vrizivvvazxmn90q14ti465e8fvw4f7pt9ipfdi1if3b2',
                flowInterfaceName: '27wc479giyqd7mo9eyh8psvs5tadrt1egzze81n0nh8v8kwfd03v9xam0sso4lcmve0xuodejat98exr4is1pdoj6tvpkybmu4b40xoyswnn63kp98slkb4bxbinlagd3zsvqbwovftxim4xg7pcdwnfc5y9gw4d',
                flowInterfaceNamespace: 'x8xk6h07ym2f52eua5k9uyvxuhofvrvm744ls19ulsuuwvk2wtpjcparfuqw543zkr0n6obqqdq72oexaayx8k37r2uea4pu84zzov4muzqqfv9x6eaaogtlrd7dgsf0qjrygo3mw4zi12igmt0eya8eincbhggx',
                parameterGroup: 'gx4mmon946kj12uyvdx66ysrb73q70cqv8411qkb413bpnw5kifadx5zkpppkaq3fnw0iej0uko6s7x8bdagbdwcexph0xbcyq5lp79nd8gpz34r12nu2bo7bl1ajeb7haaqgzqwcxsw48zghuxry7rqphtrno3nkxq4zpis8eipoxhpueozi1jovykmh1dza6nygweyd5rcvng02a4ii1kz3f6ss7x0ni7tismz5rgchtyb1a08if4yl0cj6so',
                name: 'd8ios6ixm6lq77613v99l3vkt85zytw8md2oirk6cy7f04l3wqgbhva5nocoo5rvr9vpsx7g0vtm1mt2dg6oo2bfn0v0j36tdct2wt2p87yus1n826kze72jmlpmvnejno71vnzno9t5u5intqzmxpibl42fqhzfr2e07u3odcvwttoqmmyx9h2wowgh1i63ggy6o20j2e8it5qfij51zti69wje4nztxylolqsistvzjqhdadngvlgqdknns1ncru7mdoki5nhlk1myns3aanzpmgaqawfb6ylm9wszmcd1hkeflaazibxna01jnr33',
                parameterName: '6xd6wh0z66qaoc5sx5g91rqv7zyblhq9w4sqaz3lxlt7j819xo2nvyezgcfbhx7kgp152q21mtqx4fn3giw8kc7jnw8tx1f1rcc5spig80mbw2bitt4cky75c2ft8w2jikzz41llyak9z5y0gewr9mn191i7faspngxujek1lw9i8atszdam3swto3rr5n3xo9t13fks0i1p0lbzw3bklmt955dsp6p3582nfsxiwlassxvdwlb8aa6tzjnk78bcyg7w7oknsl2xqzenkwea1islmpkbrgogsowe6d8vv8kd66mir3dm6o7urnqsz852',
                parameterValue: '5dfkpyxhxftn6pm3qyy1xfzjgvot9evliyygote56jsbb38sm2s3gmhx1q6t8fvmx05pu8dfx946goubk3dd6vrt06wy8xgsjku1d1x0edn4jwlwif1eznyqp5letvg8x3ha28c89w6qfxsr7z4jnknxte3tffm62m6im63pyib1kbixii4fpbcl95lkuy16lhybk19ivk9sx7qzqlrhz1lrxienexog89ztl342rdfvz4uw01pvzckn0w7e6nl48oyltc4gvzdflcxhr6gtu1p73adx50o9o5252lazchtkx4kv54jb0cknlgqj2udv8uddu0lrhgs6vku01xtnw3sy2778syoawvfcffv8ssivu05xmugfp4lmrmt15vif3svz6pilr5rwyv7ss2gjeqbeh1wzx6yd1mmcinxkp5p8dnd7wfl49ad3wr70ei0v772y73j1vr4629hc4rbxytmmd5g9itqz13ett9xqsllp8okix5t0tc8smeyrb5bov73bzz0l342jkmdpv8q1thd12ker5yw1jgbqrj7u7s560hskwu1tvct668dxsq01gswe7c1bvto591wnwu4gs32xh04babp001zzwbehdwyu9zipncgg5iqbcq0i5koik9o8h2fctvgp1h2lz1haw2c64j8qssh07f3xpw3nxkdrifyr077htpp1eicqw0onywamnra27i07op5unrcm56svbtrdrfo7gpn07jjpsi3ildfa36ukna4vtcqo0iizgzji2jwmsxoh22dzv70ndv1v2g1msvxshx0faigw843jwj09k5wjjoxyuk7o610j973saqs6qyf3q0kmhfco66f38o7wmpr1v93y6wfhcp5uyano3i0e4tqoaa7y2lk6z2j92o0ichh4pf1rj5it1nir2cdb9a91w28c8yjg5boxdmgpyk8n3v0qr5pjumaem7gey59sr1gjhzephm7ab3ke42tk35id53cxl19x7qw3qi111yuoicqw2wodshr2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'zn5fkzsvq5znh7dr6m94',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'ker1o78h3bqc2hg6f52pb7bxgi996upzdpuy78bvwa4z0r7i40jsmpl1r8zapmps8xysz03tffbdarky1e60udh71akuc8nvluosgz8u9fvmqczaxds3ish12bzr1633azaeu197tu49yfkc52w7h5vdxpbvvfli',
                channelComponent: 'cz6dyu7kwema2rgu0f02jpzz6wrvp471zmzpkntle6vvv8eq393hoo9rj9t2gqd7090yl75q6uh5d58h1evxw9vz3zz3bejphe4idvfo6yurbkjajzjcrn78vhg8k4ycukk8ynmrpou5ol4oirfocf1ap8u785rj',
                channelName: 'rgpov368p6n3nk1b21e2wiq4s2x696i0zs1nqzbc5dqkok4ipdz6krm91bq16dv6rpyx81ltsx2a0qvt4wh278x5ch5gyxinalr5g98owoy6ty0mrs91o4nrsjbdnqoi3tad3jupj1a7ldpb7slw0ooja738o6ef',
                flowParty: 'xtxk24l9xgygv8nxu18tqm3xxcclv9ib21ce4zawalpe5l5w7ak2lmmpmy96hsp94niz5d8aoptuaz2cvso8zsb1k0ic9pus9d5eofjynijg4fc4qddluev4meguh6y5c6kf0yt44wdolu6ig2bxf7xut9pf2wh2',
                flowComponent: null,
                flowInterfaceName: 'hw9pg53c81sjkc2aabw8adb6qw089kh4becwgz2csmv9isdobha5v0cpmmhy1ptjfvigifrfb1rk39lvvnhuv8ybnayc3awx0idoojk4ren5xvx4iem58m130fiw6scaa5g6cfe15bne9i0bbkiz3v96woktkrr3',
                flowInterfaceNamespace: 'aoea68ja7k8z946rkrjf91kth2icnnf7aq8xu1rnymkarg48fqolq00vblo7v9w5h1ps024p83ik43nwfrh20alenkjpvvz2yqywgj1o5ru6eelun9408n2i77ub5emre0np1297n92e72titmwk0h67zbot7sr5',
                parameterGroup: 'foezgm61dvpxy3ysn4sdayfl0xxppbyutdg2zhpme2hb5ekxn29lspwce897w3q2dheczt9am1u095etrboa80ruvbcza1r2w6xzt1m9mobf83comtow6z837k9wacic4b6fvddj9qabmh2g7re1npz8359eio5utjt1xxmhgyrnykhsqat96ntraq83v1hg2h88rjrael4st73zkdvu5j3fg0j947oqg3gcy4sl9ohbihj1r3jejg8vt4qz2ev',
                name: 'h49m6lcoi0li3bgmpmmkyuqq72v5hzhuagdongkr6t619pux1y6tm63tv7uinbg5c9wmdd002z5ivu930w999uk6lkr8uqt1x8lywjbuufcfxd0pb7uxw5m0u5gehshf2ogw8omnwgvnxgx4b4bdz0qvrgy14x2pxmgefbt4adr5edxhrrrkme8rsbop5arququxh06pr2uu1r5fj43cfno6pmddh78nrtwacnmz1u129man1bikfikhu0b47rckqs585txy6qgce3unnp9kw2ydv8ed8r1u9rmw66a7nx9osadizdgzpq68fx6sz9t9',
                parameterName: '9uhjvf1qzoszvcbs2htifxucb63yzygvc3r0q41v2x2b87cb9np8b5xxlu3fd2ogynnw4thwrz87xd8h4g1toqsdntewbh4jj4rk5w879n0idw19k270zlq5epwszbcqxq8seqek5a7u9e5i96zwghzeumdc0ssbmun73pwp1eftxzbkpwhlne36ukdau0innoizo45myju1oh7qr9eij3vbjb710bjek11o1r4h389e41tmagqmkhw7wroytdni52ad25cvnrzv4fxgzbpfyp4kp8r60ba01go9kq1cayzcd0ug10n5bempf3ms5vej',
                parameterValue: '4qtu3uhqcjs1dqeqivkt9q2oy6vloys3wp2i1h3tuh1gzgb53x86xls03n6i05n3a4sx7qckea5g2orcjinnyn9m6mektsoo0kwrs73bql28w7g8jvalj0t1whoqte8voo1u3qzhzj1x2fqx1igpejxaf3202bb5xpthpyurq5ih21zsau5w1h243l9qx5wg3ectt1h0k0hhg24f0ats447b5ksod5za00wefqvotquiyhs5flxvgok9h1c6glv7li65ntiz3f8v6ompp4p78nzyixuvt0fsure4ikysg1frfuhkpjazvl5u2siygbkae8yx07dipaaf75oo31fdzc17habdbhsfiejitvyd8zwy8hwdls5u0gx3kwm1ejyqdubyqmq3p0rqq6439yfimhqd3plv18januwsx3hosabhmo5e8sexmwb7pamjmak9s21m4cnnyeob8af1yszefn7ugaaqs01lzjo60ukt08zzaf9g2jaq4atqe1rnuyk99nor7rjvfa7oob6lfyafuvysq0tj5uyh4t6bbguge0cczi348vmgtau448vqz2ljngdf4areuz075gmji0b3b3pwmd9p4r4zb92abf24q41je5h0zxpq00psh6u5y36x5leult5tphcjgaby1o433zv2f2c56rkw9zrf2ihkvvgmwgcls2kii8wzmzmld25wesdu7bl2z1op15hmd97bs16l31sv44e710j02yc29kty310mipt1pr87ccztn0szm7ll6zu66qh64uyq29gg4s1ulfyol730oy7igk1dek63dcxk65ourbdbvkq10wss2jpsoik9igtzh5ek3yoifg4pirr8b9zslou94btmkmyksbrn6iwq7lpas7136ikxg64j83dxqk03nra3bu4wowwguqmhxm3cddivy5lzlx64m33tv7zkg3ztbims1pewymy8azekze1dm9t4hmj2d7pqamdq7fora3yipduelan2ixsia726t0qnkb6plqo3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '3zlopeyxhq2fy14tglxb',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'qr4yhrt34iel6xone0hzpbc7ariiq85eawygo2g23lymgmm7zibh1bbtd13yatxlp794nej19dbul0ar2ah4gvk1wtfjq3kownm8ld0vb20mmislxldfsno2bfv24jebnh9z3nnqxgp4nmcpbz28uhhqaog5ju8q',
                channelComponent: 'r6wav5m350z3760kcgxohptuf9dg92vtske5n883vxww1kf49jh4bmlhxw9k1zgd40vw20gh908vb9ehwgps8bto8kx8eea932gean3egkac4lxqha8juhl68mkf0gebqc6zbyzve8ay33lous6dqr7tenk56zje',
                channelName: 'jm58lh7r0ecxgvex4mmw5bj0w8wv813uvnzgc2i0fenr9os7z5ishud3r9k511sbesok123loxcf7vbcdhw9qu4yn06v9fpmpl04yr24f9ne0r0sxnk24muzl3j0y1n690w754kcszr2eojv1bvw4ssrlxsqcwbt',
                flowParty: 'vgapu7siukjm23krb10fhyyugibdr4pcrsnqokxqjhexrt2kiudypjjecu1uffkmpdbqod9qwa1h0byefx8rcaef16fzqlux6w154e9rgkpf39weyq0l8axowav546u4qh2yprjyjvk00fq7qwdejofpwb3h4vzg',
                
                flowInterfaceName: 'cjw2rwl5lzt70z4whilcuj9q38rx2d1aops97ngphwnoli4hykafzqc9a6uihs0tqnnu6om1sgpgenadteekzi9nr09zfuu4xb2ty7xh5mjsq6prh3wxs3tj3priqxkd7cd1bmynzxq5tqg16rprm5ct20u1i5gm',
                flowInterfaceNamespace: 'qlmv4dbv09abql2rzdzla7m8zt6p77d36onk9pzqow6h685cqozeyua4v4wcgkdssjhelzi131p646zfgr2f5r6cnb1qlfv5u9w32p8pn18jiqy6e6cpyat9zktmldc92qgr6lr8s0x0gu0t6pstnrlci7shk8ym',
                parameterGroup: 'bkvyhv1kpd84zu1ilbra2l5d7ja4yru7o3n37efj8hiuqfprq7w7uo4fthwphsuedv65avt4pylyldwne0smtt26kxwuqnhwxoqnnaw6v2ff5kxxwp1p4dav04o0w09jiyyg040vd55tboouchw1xsjsfpvwjk1i9a3f9zz8isnnih5pguf8nrys5lv1l47aesz8g2fcrf9gxc4lkxedm34g5gl0r72a9zazkeyf9vgkaydl0a3o9k8foc0lf6n',
                name: 'h2mgbebhjpvasfnsjhts36rd8kemsjx16j0wpa67ogl6qs4jqbnchvpww6v43gejg0ioff08eznagbp0las05bdls04k8zy0p1alt6n4zo5ptsikdeu03zufmk8nnjs1hpzzrsamv31mk3pt7v3yh45yvj8i1x6nuc52pxkfd8sabnttcsvwnr16azh0b06t96eu4imcp8s024wdtuegsg3pzu8tvn44ntdqwch9mpmesqof4n914dja83ukeofm484dnte5j0e6yio64zi5fbu55goqe3hlswt4950nti2clha3qsd7mtrxyq96o7vg',
                parameterName: 'ezyvs09ph4w7cd58aovcitpzp12sn5kratyd281ksje7h2x5xbe503gjfoyzr4lxeztasfgbxcdyaq0ixaw76lw0k7ruliq742hygybz9gk21jmc5ke9s8uf4gl1vxnxp6k8i2mfjb6buthqpsegzqirrewxjnhnrzn7l3t1f2n9yc5de2qbdrvj7e08c0p4i1za5xlg2sba178c4rvluqgi61z7atq8df4tjhvibsmie44sn6ktzdamos8996k0kmzuc0r9cjb3h589gbm3j9u86vhyrsnicndi54men9u324uellielrq628zn1kmh',
                parameterValue: 't08hkc4v4w1ezod5odv0kjd171b8c3nol2n4m6dmyatn1uay8s216vbdfcnlp1jkbmywywz0assrbk68h7sty0gzz9cqivhm3upajehceuuzsa55glotpn56cf3dl75ftl8dcvf72k9skou52u165qccwhgk7y73ev8za2htkkwqwe4bxythytoawb3d7b2rse6cqbyljvmei0t843a9io54hloim618gkjmoe8ibwxd0h034rvq7tpizh48qfq4br7ymkof9a6n0thfulpvi03mnlamz75rh2zeauo7m8b7ujwoiixix22u6parbr6bpxpsf5radpd8uxwuiq33e06zjmgpau0ejne8mady3teo4gzei92qdqbeb20eusi04ay9oapmtb63e6byq4ptdlxknvuc9veygcx3bylkwb3k89d6a18w0fywy0mg40j4rnlvdb5es94q2fb68its29s6jxk9xzxixydfp5cz78yk95m7z7ljey3zfwi8dcu1dacmjgexuklp4dewhudt62xdh5o4nefx0dlgzcpxtohxi1fah519dk3vqu8308io6zcamiolicydd45jn3pfdotcybpwvob0onyds5ya5ty9z8yiinz3qt8hu59mxglmvovgz1et4ck7fow0kbf1e68m3w0xeoulzmcxg07knu1nxidedqm8y4tl93iwv7w6sj6gdtp2st7g7jv3goou27ywp1tqtdvdp0uskqs4tb8tlm8h3ylt8f43az092bayohq4mpqgtjrhgsb98tzc2tjb31kas27yiy7hr379y5yhr25c41y59hozpy2xnk1wejm59f4kx5prwrvcaygx4k8qw6u6vbdf3ao1ew2r8ccul22tmqsln7w2hazmy00ex52y5aqho4u9hew57ocuivcklzjmzgklg3ab4bwwkz9gq45r23x9eqo8fp816hdg0ffixj88k3mqqf8mq5abbop8ankmzhrhz3jbod1q62ct5tttao4wzftgtkh7kwbl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'g576718q30rx5lbymske',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: '294ph1hv4k6s8z8wudgc5z0zmhf1wj337qzic0t9y5nk7pty7usnsi6xb02qtzbiqumt56j33wr8yvd8u35n0s04wdyxjep5gcb6ph64e2e55eel4u28gjecwy0ej99z1eopj3tg1hubotb234x1bgscr0m1aoxk',
                channelComponent: 'fhojp7cfmlbr8wsa9kkz12nrs23nokr6y0drlr9in19hgyerzpfs73xmce6fzbwwiwoql6lycl3mpjf2gzpskqr8omqrdrq6hxca0v6jqbod5zjbkszop0tf8m33d3rjg9rc7nhfktdmcjyo6oguxfgv55syqthm',
                channelName: 's4q940mp9ysjn9vrea2ayo8t5uwv1iy0hpi65tm9hs67wjlptupq3xy6ch0h0xsr60975i78d86edxyalcypnm1ojo1hynlluc7vsxs4gn6hitvprrgpo24636dim5c2b80jqthgp7qkde72i0em8zcdx0cgsggd',
                flowParty: 'j4jh053wtdz7qqb03yvsqiypp7kwokh7wz6i2j22nn23n3cebbz7ajsp0qla1ar36um90rkqvk3oox8ujq8t1exndei7vsxvth997kx0jrya2lkzvh7ch55cmdemu4h4xkaqkv8az72u0n5x8vdwjee23lg1csc3',
                flowComponent: '7m03ad6w23qk54z22poaymopak44w7dmoy6ge2muls7z7hidze2tcheysqoek850sbtyj9cb0sp0ypzug5tdbbarifn2nr6o2rj1txgnoy9yqkobsfx8x848mkbkqy48oaivqazlaf6oh0m2m8zq4osuuayccglf',
                flowInterfaceName: null,
                flowInterfaceNamespace: '7kqxa6w8eryu24fhno2a5bokjrn0lawniptr8bxkg5ro1tdsb5ibjyikwfbha5z287nvlp0g07evdctn34xtv3ov2xe94qdmyyil4nloig2z8k17dgia8rlh7x5u81awwe7xmo0i4yfl482g0d5stp5x3kwh83n9',
                parameterGroup: 'gv3mo8hzvtwbyzluxdibntf3kxqduf2x40m66i0290iguck2lpizd9nv3cqhgh756gsfju3mjjdj553k60dfd63e3sv5nnfl3vxn5hgr5jjswdrj462z4n6xwjr5euzl2tgjo1fcs327zthl7dn1sivnxafuaoyn950nyi4poq4j1jjg3w5e1ii2g9331tqgw4c23wxmflssnxifgzyfsjt1bkldts7jqvgxz5l597ick8h4h0zc62glz9tg80y',
                name: '0yrpgplvxosra7rd1qzikges39nqn2ptuck0qbph7m167veohw6imm7rexchi6yn8x83dfn2h0yxyzevi76loz2ziqo2duc2w02yspicfhdjkvbmredxfdpdj1wnb54ox9bdrswc8uyf5kvufo2jqyg6ewe56hn0os1mlmzj5lxoxrj0qya08vwql7qs01blm9g3tgwawilwz1cx74wcc9aq81cqlnbqq8jplkxz16ywpxscr3xznx7swtj6987s10le7wzuy6nw65c2i1nu8sqstzdw1y8hqy7ky5404dqqdrq36c7xmxo7clv48sm3',
                parameterName: 'lqhio0r77zky7p3z9fiemh8mc56r41bk4l1ex0jedyn6yv6i8kydwll3v6egznkm8e6hsjam7kebvckoytbpvefpsg6oepl35j7zuxgx61yy545ywiblafgjbvrmat8fsijev0nihlzoi25ha1aets61vl6ds2di9xy9zhmap9ll0cnrutj59m6vp7tf0zw5fv5f631yx71uzz3dowyuui4d2j0qfbkfz0owpfemcevcpg63nm8d4l557x89y9p6eq2cc7kshmo4bsn4y09pyai1gxtf298iw97pae6zov0wsx1y9e8v5elm48gur07t',
                parameterValue: 'robjwhpyz6nmc9n69afvpz9fg3aygm4lv98ftdb50wov9rmvb20i0eyebllcd8v802tiyjlfysrkxtalfmruv9a752pvabu2yzpm5tae2fg578faikpyp5ttynjmmasyv3063up8b7mcd1n6ktpqqxdmbdytow33w41vm8nis32vziu6d4wnp80xiodqfe5axwdcqhvxoys9ozw8vvqg5c7hkwlz1fds491twh822etf31ra7bil42ko2ox2zb5mpncnl55vj5jzuojx58weary5pz523nrxdrln8dxpj3olr20hzq4o8m0cg523qklxmecyxnkq6tt2gyu0d2w18tldmh6uktz3jdufuhqb5xtzvzuu1eyqsu3aftrdt0lmlkfjms02d32brcehxijitgh16thtmy6dr24lb1goz2srjaqsbetn2nvsig2phzz9xqb6cgx0j18gtcf0jxjuui45bjxttgzztrm14e33faudq99yjbiok7zt269570yosv8w7p62cludoam6fh6sxo6t3txlgohs7pxmbrrns4ko8l8kn4yx2n4gaf2proanteb7ztmz3ogzlfemsmvu9xn4mi1o4xmdqfa6bri9mprkjjsysp7qnpv2gye6ky7icc2otsiec4ugl1aksm2p82ndxsijrhvksipyzpu5bu7yq0evboc6uiiyuveo4j42ttxaz4u7f1u5c6i52mhso6syizi7zzyp5amc3j1fiaqn20gbscyrsw0truavr2kg89x02t6wk7gkri01o574br4c0ad4vezqlhvvc21aouwac8glormlnnl3mhu2m58hdksrabqgwkzmb1cbvewmu9qdjde3z7joxaos877yvzdlhwxuuwyvrwthlitdhnb8rsibyopkkp9qlydpbgynth82zf6bdisyu72red9o19s6rrdcv18dfvovp5bp5ybn8zk0ity2tzvoj8zbw8rjpam8fskhx7272fy8z4vdizsthu9b5iy72iz800bxujll',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '2te4ysjs4hm20b738jbz',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: '3z9puatnkki32dxjf9ksv2rkez4nd6c38i41mx8wuto9lpjf1p28v5bd5l8ou4qrfvatrlolemjjyzkh5gyffy6siiw78xto114ixai5j7qx8u6fgr849s43kgnkd3g3ejo6hfqw2ply76su4mczvnyn3a5qj141',
                channelComponent: '1n5of57qne18gdlk69sbin1gwlh7tepmu1fblss43lkgjvscro71tbmozg7w3c0ac3xth6gvtjp9xibnyuvpgexvhw1wm36s8af7umr45li2sd3r1wlewefgk3za45qxgo33gmz0ksainzvkyodlmlpqvdwe7fx9',
                channelName: 's10kagys1vxr7rhu8tbwaret0or6d95qs792dokcjeaaf0f72hmygn799xnmx3em69y4u7cx4hy5w566px6d3xr1ovfsu3t6ifpkxc2wvlp84f1dlahhne15twjdumt3b6aitt799qw0orzj021y92ttmdxj1tel',
                flowParty: 'z0fiuhli6hcqtjs8p41r7xgqv7gems5fjivdbc7nr5s7zmvazunaepqc5c3y5pj6br00fnqvr6kcmik0yyurw7uond6teudo5ipcakibux0mb8uamn2zpcqxe3e598if95e13x4ho392cpx8cx035jd1hhl76oyh',
                flowComponent: 'xms3yxv5he56napsnoroh6xtr48d92e8l5ohdjiwa0oe0cdh9odgxiuf871awaav1c921lc4ydk79myydvo6i5jxmw76gx531b62xexg71oi413zyg37fix7o9a6sv8gzlmpjaj60mpym20ew7fmovbxro05j2e9',
                
                flowInterfaceNamespace: 'ru8np2eic56qzexyenkhj8totvmr32ztexwlvttiot8h4pomrle9vs86m0jurot00r6svcwh0yg2e63d0s4egmunp8y4gnaug687spqpg94j6f9zxvhtrcmrrg97on91wayedr17y2wjzc30nw6jgln1lia34at3',
                parameterGroup: '1n6sxx5bsg2ih64400isn504ph5q7ea7tf3jul4js9kz3y9o77vhhclwvbdounme591ejrt7kr5yx8nyz26ed5sp3idu37iwlqhameye1fr1fr6rznp8p2vdqqazvga2qqvaaforxiu1t0r6s88k9mq68hz6qlkt3crdq9d7852z2n77sy2f10axx57zoy4y3ma6qz7w496p4rpzq6m04nxq33geouddrc3jin3hh48547y9fuw2g3e5s2fqbxu',
                name: 'ixag2eza5pbedz7h00eke317zi8h2gdstjxl8qqebiv2grsg1kcw092g554172hs32ncjsrhrz06wp166hkn8dtdhgqkhgl6lfewd7c0elc6yngzqgijuxvjcbof8j5uzp1jotociglpz46yeejl0cb0061o86nnlawpfle6smlxn0qhhgmt66qgopcjaj47ggoe5msakf4vf17uepeieb4qeuel6o0ozg14nmjlyeu2jm57xqc99xbbjr106vsv92gs91ob17macku9e7yeow9gye7gwm70fot5ksxwnyr3hwwzsoge0ossq8m3ils7',
                parameterName: '4876xb8ans93ugqlq5gd2ii3izt5xxjkpqa12hb2vca7cr7os3gfkaxllm641xwfd75fypazsl0p0mfs0in8dwxne7l5w82kn89zzfwbf6fivyz2bhrz1g2a2wpi85slu1w3qnkmp2p4befqvpng6orffp82bcw9uvxgfjjsaj0cs9k7je0sl1p040aenf27rep87u76h9mc02j80wf1fxspb6tptooslmu2f1h4915lsfej1so71ujstcfr1vvaka6ot65mv0ks5juieegt1ww6dcuupkg6k8etvd4gz5tj6pusdxq1vkl10mz1nzej',
                parameterValue: 'az324tcewcsn3uoeu8ivolbz3ct4tl3ms0f6cxwd1a524bis3eu3pdicsf3ljjf5shtjydo1zk766dh4eqmfdgvf4d7g9ybks351q58s372gj9lkpihaa1qdatr3jw7wbaq93ofwdns4lybd5ye9vzpcbjd13wfl1mb3sfkdffkjq5499su12shdlayhec7otkhtxxumfxe1nld8wvucmud8ez6qb0ttvcctfhi28pjvs566ch7ww5i6sqznpfhy4saqp8on5ckn8iyu366tnvkrgn8e0cpc27evq96rmicm4iumqhjc5yl3grftz1eykmqycorfsvst10uvzzu6h9nh4c7nxtfxe9uxsnvv7pamlc0cu0abbko7ym4sfs0nw1nu4ylib4nbkcymd2xn7l7c2uhfqdiqx9jphgik3c7u4303t3uyay5mopjz382tcdpkfqxqmfe0w14fttsgin40s19qglt3ciu40onv08yylzl2fm7aw3r6kq6ecf9n8yy0cinbjwrjfdxc2apxt9rie3ncnesjolt89y1cavwg8gcplowsd4msk09a1d8qe9psxxyr4mwgyj6v3e63x5e2yxws7x3ka526047qgd59rrlmvvr1bnyy95bquijrb0tu31j25acvx3bk25ynd7sgxmwltbbdw6axm2snutkus42i9yt7fh2wbszswe2rdmfky49tgd1mu02jseososrqp0xqake8xy2p4cf18ez2cx7a7ice049p8b8fqxv5yrkdayi8qhtnad61upxtc2ghoozdgaorxp0z9zlkrtlac3gdsy80b1gsj18bwja92ux89di5kvxq3nztqibrp4y9fujfso784y5ffcrl7uv7igoir63vqqauwl41zofvw2opptxwbq14wqulmih06u1umohrtogkhc7fwpwmjbxiszoedip253y65nemmb5iza0lx0jnkz39udhcem5gksk7tki5b8emidh7t7wjz878087cqmc38xpqrwjed0d2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '8pug3layxi0i17epn8y1',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 't92yxj42zpgl6nvpqzkdjk05voymu2vmg2ecffz5sxz62fa2t5xlneahk2r5sy2unlfw29zrfxu8p7quznbeitvnivygn2a1c67zlru5q3hxjtkhus9lemua5hgbcjqbbdpxwl9t7nwi7daatrus364v8qoh8ebz',
                channelComponent: 'e17mpfjuiae9ukt0stcrzjreix5c64tqrlpxdsarilh33mmovoloayivi04vi3uh5ii2jtxflxr6jqr8lye846som623x584mfrqielcor5rstwss15g0szrx3xs3jlklaljesekovq8okgcnrz75kcjqwqmvr93',
                channelName: '8x77kltxmp00iqdjl1zh0imwespiglxffy1vp2wk29cbkl6ue98spsv0fkxzfas76emcnqjsiomi8z5vpmd4h9hpsxwlt1nn5pymy2bagms7doqizulwas8y81f8wexcn33rbot5u2xlb05tju59ppv6lbrr8zln',
                flowParty: 'rcs1sodjj60b8y6q0ufpzlq5jm6skalf95x0m7cdv2g4zghuhqdkeyljib1gjprzl77h4r4sanf83cmvoudu1ndc9n4v7109kdkwoilfwlufye9q9i0pw9fxx71me2h79gey4dc6evopc4im04kminlptw7mf1xe',
                flowComponent: '5s93re2dut51dwoomqcql6pwfsi5by1x6szvnt5ca8afxsyz0k4myt6ohq9a2izwv3iigdlmme1ewh12jrvlduqbe2bd4afo8ycrsyp4blbqkd9glvfl5ob6kibd7g7rkofo7vhxk9dv83z2h3hxyidygm1j57bf',
                flowInterfaceName: 'kyv21li4pkpmkjs7najsm2ihffxlepeejwc9wlyij9147h2y9bkh3xzo1ru8kvyaj4jtciz7ofdes300z6ek76yadvjaqj6rmjdlu20li55et6pbmbrb2en34f2yskmkqoioqitedvec6rq36qp7pg9znxpwgop7',
                flowInterfaceNamespace: null,
                parameterGroup: 'azzag8ds7puv0qj53t648qvf33ut2yek6nxiyzyboj4brs7pgi7xmqvwmktoudzljajbxd2z5zixqnnch0azk51ntk829782qexifg2b5d1hq4ipcdx52afd1p3yu7xrfanlx1x2h1tgcs8m3vuspcceg5xqn6jq5jrt2g9ej94h8009m40uq0wgxm8ef39ax3owjsemexir4hyderi28m27wzfqrpekcf2mzao9pvl72rr5ktj2dfupcocjvsw',
                name: 'b0togymhd371ntbhs2c9egwquwlnzgm36a3b2l0h4hpcf0prfuvpqs0tvlvzc8zfh6lsnwflg8028isqxwbd0834uyiinihvygim35978dgs0bgkks7b7jxae81kef32tny8wn3nbcag6l3v59pjjbdo67p1scar5s2pt3jvp6yp6qgldqzs7tw70e7g3orgjllecq8lfxj8vn4qiogbggzzedgd1bmmrszgyj2wnxot38je320ouxllw2a43i1penrzi2s126dj15s1q0f210kvmb77unr3zaun6tk6ln12woa3qohc76q8bps8vgoc',
                parameterName: 'ixl6cy6m3kc48w1ryt2fz8cqv45l3zhhka8vfrjfpbi6shsrbfkfdh2xa06t2j1f7uhycew8lgjh78duczzee0tzepgg9s2a9tgzueh8rx69ba33a9fj9lx4ql6hzncqiqvb8jgje1rmndvvx0xv0hunq7ayn1ofa7km73jg2cbyn0soy9rmtftyisi90addzdqii4xbtddrj2tcificbn613q0gtcfxaaqff4usx1gowjsxbo8yrjvvjufaa7riaxq795em72hcq8rez7f4exy9q7oe6q3qf2k4g6lis9ui8thwv9d4xwdkuushyybn',
                parameterValue: '62v022q98ekaiwo5eh4b0hurwat47on7o6y8vhckgerz262zg85fzozs7u0xyw2dyleof2bmq8p7oiumqw94n1pabpsifj9up5ddxspoy6qhzw1reonjipzcohh4j6h79xxqcjy874pzsnqxcjxlpszsfcyxmhapylbfe9j5qcpfpu12b1vhuuvaed1jwkal4h9xjp7ccffy99k4du1ry2lx13dd09q0o0mlhi2rezex71cppd5g1m04nckrus3k2rrgpqowx6iij272qpywkut4pq37sle2cpmdecaz4qc0ck0vl3vw4jtlamnwutnai6g5uaegcja98nhxineobnju01aoeqsehb5h9hwdt2wd9y16da0uuo6sl0g03yyfnvehf04wsr67iftml3qmnju4iyhh1kaniy9hjxoklilbqfsnrlwnz7jbqmfqzw6v7l926turrzmmlfo4r0ehqytm13o4i8ak4wocy45vzh4iyz3bsmkru1898untu2r15zcyxv9myvc0mq5p1k6fj4gywdd762dofh8vm8ki6p5jofdnlsalhgutwsjboif8x0yuszv9khvvg2fvsbxutz43gexup0045hv8v9xfntu0oyiz5otyncl2oyrdxerv2qhp1o6bt3gpoqmrbyrzf746izec7107eg2ek6mycqwkzceeuxye7xxtw4pjlvacm2mclvf5zb1esct5f8u3rm3mln8q8wm05ynsbon0iu7rvo70mn6ymfagfgh3bifgegk5w4ualhobmsf42hpgq8cufi78yzzby518c12j7csr3agw1fuo6hg7223wfiu5m9lwgj8ktizejtq8f2ghnmcc533bvs95oxa21vnsljl7leacqq9fg3oz2w1wi657hutinf1h5pur55aqfve0irhnb3hc5gcwl031h7hkd29pr51a531gp228la6s8kp47nlvkdyb28qje71jgi5lx21gzk1papmin1tmqv315kpcfj11ieejf4u3oyv9qpha',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'vfyxd1tpwg4cjkkx877p',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: '9frtjjpzjwiktvz9ebjlz4sykis6nyxkimmsh6bmzdqt7v8e36pdcz196r3hrpgyp7ae114j341fq6zzntreuvyf0rwrbd4nrkkz43d8gs803lfvcby386n9oc863ilv5q1d7a1w7s0h8savfhe4nkq1njwbuquu',
                channelComponent: 'fno55dgn87wjai1bbju2dgtjcwsrepd00r7ouwmayqo3wonx218vkjhq0nej26y70yth6fmi6evm1y2ja0vs40ywbbg9yrorro2qag79846xhzco8uut2buy33mlsmcpl3td3we71yksx26jjkm6594zri187ij5',
                channelName: 'lif3qe9emk2359dpwm0kh3pxvr1lv6t1jd0c5tvnvb53otj4z5p5d6trsql3y8jwxejovkcu59kvsgccxg831rs7119ccqthbayx5hvz03gv58rg23do5x9w1vtdg61h000bq11rp5u22da9o8rhnxv9hgt5ykqi',
                flowParty: 'wqbitmixsaejt3y3g3m1x8aqvu4y7qooo0qli2euw9q5pzuporb3hiozm9jnz6zjkuv1kz0uwx6ma0pgmijlp56u7adb62k2l9shbay9bt5e5n9jz8xycv637bq19hthkxb75nf5nvqlqw2zmslzosbb6nit0gon',
                flowComponent: 'zwu6lsgstpyr05idagzm8cbdwon7rjaddzmbisqfeloj5qdvurzhu2fa5su7kkzf3izp7hm79grglin6lbw07frumo3qh94cpy9dflhey4uhpfwf5x7697iwhel0t914otezkfo778lpr6bg3sz0snyqm14zffzt',
                flowInterfaceName: 'tcik7arnrlvxq9p98z1wzc3p2fezqqgolbff2nw0ym55pl9czxr3vf1ik6p9dn2720mbg4l6rxlqx952js0m2mm1dru0gytnelk1s16pgyx1u77sjg20xw0oy7dewuscxpuylmcz85keveeezvyno7jldvqpkvjs',
                
                parameterGroup: 'zlnfhixl1r3x0kij5xxcl2gfnh6z8iplxqmiom95j8m2l8jq0tibm723oknccotzrekejp21crlvauw7vvzff8zy6wisjhugj1jdj82iaw7ifdannwu7kcjqz8j8rg1whta464gxnr2e0prencnppcsvrc7ysdmihhfv45dogms0po3j6tg45atjfalfwjd1zwbdbz0gmfwhgh59oo1gl2ty6oj5oaynti27hpk1nx8qxi7rgr1byict6h1e26z',
                name: '0sl794lru2o0yet8u94jckiu5ofuj5lf2irzjzcs31vd4edjqey6pr5af87dwgjrqqpwldl3og1zi4v7r6b35wstahijum73isto778hs7i2umpj4get44t5sfxsilcvc31826x7tkhag05g8bohjd4uhxl0u4btprjwdsi0p85bjckuviy0iohg2po8o69q6p44xtbbngv9t3irffjjv8lu83kcplpcjsmoxbm93nl8nl2rc8iza2bmuy4cbcbelgls0gf3mx0pq6dw3zyu3k0kp0bkt8fx4d5f76btskudd5x3hsbs8yu7yk49l7hc',
                parameterName: '7gl4adi579vv9b1lva4ioqtpgm30rruvpy4kl792lpantnsi7vu1pgebkut7381sa6qp5hsbpv3164bonhp9eo9gdw2hyxcxnba7lyh22nk130se25yrptfkvo39m83edbd7lx0krk9tgq3lxm3kxvskfv0e9b896uzvnu24tmfvn407vdkahxa6obuk6dz45menhqxa4xczvdwcvm18jejhuwt4qt6j7lu2broz3pfl6q722j0x2tki014miyu92tkhqttp9o0e5tft8lgc9ff84prvr9f8qsebqnj62p7orbs5vef90uxw9qyx6t7j',
                parameterValue: '47vd5b1goez633h96rveqmee0pucq6s0osyxbul88p7m54mnxi5vpvpui3jn04iopyco2sn42icrou9pww80j6fmk40p4zy2zay54fuy1ruuwj69ulb3r9hlssptktm0uqeplez32oyuoxv8ow6mze8e2h5ruglx9vflqxidt7hg2bvrf4s35gnvc8x9zlm3ayzy97tdlmt6s8in93xqnhj6gdwwwq6412fif1ui4b6fxl4tl2muylfe95c6acdflmomvgteneubk5cfrn4fxmrqr3367anix0698qvemeddh8fxj717loicirmkph6kpgszb22qvbm13vln6t29tn7v0w0lvxn5ufc38cqx9ym2jwykfbcsi44dlid0kdhia6lsrgdcqbnb0sxjov009n02eas6u5mryzsgwujlqbd4s15frwplmhe0ueeu6ex8k2ves4yjz3hwb5uoe76g9c6vibnybk4xhuq7nf5nsxkhskn04394ndb3g591kr1xmaxf2kdeox6tukbpcycqfg7yfb8pads3kvmmhmlwq6y68sg7gyofx5vv25z67ts0zye4nuytf5x0wlj8j5bfbt8p1r8wmffezgkpuy6ndoay1fett5nlgsahjry8q06pk3exur3o56juu35b7mq4p8gzq0q9z8584ipauqeebhxhnmt4pstdop08uhla061ts5894lr7f514gcllzqodxoytdumcfwixg9o6dlxhh5rkr4vt4v8u1imjtun66si6b4qv9rws3hvbji6sme9soyinvvf4wxokmoh4z28agqx17n43wjnnrd3upnua40m8vedfz54gjrc6cketumnto3qpsdlmde24xtp6q96ejbbj128ulwrwuchkamb4jv4rndo1uhv61rxlw9t2etpijg0fsfkbyrfep6jhvobcoha139bd7n3xtefke24jao0s6eg9zttlv13x57pybcye6t6f894sdnlmhetqbf21s4qye1ldwyh1iiv8lmrdf1qm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '2rxbcm8w9an1yhisxbasgnhx8lrym14vuus2a',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'w7uqsj9ngz30sf36ffwg',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'nta6yd00va7ket0iajj13jvuhqwr5aaijawmqmvbayoyoaa4dmmydnb2bm4vmv6y3dc00jcpl1ldqmbj21v2e7kyvqtpdsyk2aaurjr9k7o7cbssk1zefeqercig2aivkit0xms2ipzax6nb48gvxw1lqxgow042',
                channelComponent: '7nnrbznskwihe7m4ivawon63hkjtwswulyw03dj8yhkumdlxai5vllk49bew66834cu8cfkwlaf97ynh0jdlmj0qz4i2e8frf5fjl9k00xg1pirdxg9uip2hdgdoiaa3u4jvgoce84vgz351jy6ai7xf6ie2vljs',
                channelName: 'sw7kq7bzbuc3f69wdtbqkrfu2brp04zcgv44kxrs6ggfsobsryu6sizw0b8fbm0cu5ne6eey5j5c2phif2az7a9qhkztorv109c93mm5dgeyus15vp7ij4ruhnf3fquxtxpc8kqxg7kb5ete5giomj8x2lhx75iq',
                flowParty: 'varjfxlmssoclo7pmmgwqoubizxjl1xlbklm8o1d7q1y448xb8zuynnomluly1hz1iv1dvssax5pmuh8ia2saqvuh8l4m2vzgpstuqq3mdvmqg2hlfcumkx226hyefxkdt17kt2rftrn4r9ypmggep2ps0ybnoqx',
                flowComponent: '79yf89i47wgb7ja9bcc62pytrg2mmqqim03a3g7zx4eprid5we0oqk95cj82j45jtsv50zm7knkad3opix80e4exj78duyioicveu0h5ln878ji8cxji29rabhw4xowh8zybgpzqnig1yubix6p7jjr52l4fhlkl',
                flowInterfaceName: 'ux16gltoxa719ofzq337t15ohu2a68k1oindw9q3ctnm01m9jzyo5a9swi3ishzbku5xn0s3v1uh22t62hk1w5lgdfayxn1pi2p2sy49vo4i3c76h93b2sleajedp2hkx47rih8oi68n95siy3d0a26m7ix9rxf1',
                flowInterfaceNamespace: 'ja4lj4jcfamraypbjrda8t0y2ib4muyw1umf1c4xo4ngx93y7rswjxd0ib0wn5xs7nwiewttxmh1t6o7b9mk5sfoaf2qnjmcapvwv198ortlamawpxrs0gl8oxzmntj90pchhzkcx2b6vk9uo3nyv3gh27rzwu1t',
                parameterGroup: 'djj7m786oenz0v9ed92i539vxq63xw1dh4mawu76thnryyv5ixrvi70wpbfgaajh6c380ngcz090rqlzp8wzfiuqcbyugpx1i97m9tfsl7bta9vwc2d1o1o5lnp6l72rj0drl2fj72k1gft72k39cotzjli5zuxedrxx9ejqwfalgjje9wcf74h99it1n3jsd2h5bcmvbwf3sk981yw8r3baolnt4zl5p5lk5njhe7k9t2zeik7umuw72vaf878',
                name: 't2xjog3tl3zdd7d82ni0e02y6xp0dekh55yqym9hktot1y3tgfnzbgnwyq3lherbclt8usdhgu5dmm8xemuegw97iwf3bsa8xjf0h2qqrnjpszbkqzztyjbljphgahxmfhw8kbxrpp57s9x6cjdal6qtgnfi7av8ssiv4ys9o8fx2cnwawkh9aq6s28d19bx5fh2wetk6g6ujjsp1rb8zw58ngm9wsx18xghvob2kzzt6xgz1c1ur3mh0cxl3dcxzkwvsu238hc6qhplswjq2nbl0ohwoo9bjjuahvd26c12hutlgzfznz1dfwg8ja5k',
                parameterName: '5m0auyertyvy1opjaaxku6durcm7y2fq2t66cejelmt33ja5fjv03ucf2bjltqah6wkwh2s6z67x5cmuhack3hiaawxv8zm3epxyz8bpx7merpm65q8c853qq35ci5dboew69au0ckkq9z72yz5w7xi6ebkmln1sfr0vaw9bm4in02fekfz6t2kolpqj6yrxmbc0w8pq7hbei4vsd4b8fe3glh0sg415jdbfam1xtztruzpw9qkyllo0wef1tehip53qfqi41m898ydm9tm2spoyh0etrmscy46czho28pb07gpr6j0cgnbql6wncvyp',
                parameterValue: 'fqwuv9dvagpoptg4jk4uwknnittfhmxaq9egt62s10xakvj6oahx3k643x1btr0ct1eovg7pfhfla1215iy4bbyj5b6tf7wik7mo8citxxari41iui0sebx2yccnsfdbj7erufzsu70b395boibib0dtzi8zcp51kgvcubq3cjjjwagwpj54yeoniebh8rjhpgjikmyb4b84kisw8h6bn1y08p7nd3y9erj20dm5btx4jupvgvpzsc9voanixlbbh0fwzdxeahlgq9ag0sedkscdxgi7bgjfwh3uxapbm097hy7vhrukdctih10w58nkdrol4zo3jqy3j2m1nn32wxll5bcth9p9vlapluwgk6c5651m97plkxjiy0e1xx8x4ck08j4np3qawrretmlww4k4qsagel8wzoju2l9ylajr0di57tx4u1zxr705ag4zrmjz77a7z050ibs76kttbmvl3btlvctjqbkpze5rykrkw4lm3o78olgy8a0vurcagehp2qq6g2tpzyg944kd5tm0mkbh3vtahrq4jwbxkaep4tzazvlnzksxc1q1lftx9j7p5aujr6zh8ux4st3c9a03uu7sfpw9necog7ipici3zviq3e8m8e4zbqlef2b6be8qoaz0c1lu110cqekcv4at28usftkm7tfsl7xcl9zjwybfdmc44byxfxsghpa4ebfxezoh8tr6eviwak4niddmk7tr2utainskfn9i27abzarcawq9j9mykgb5thfrf118t84r1j459yak4mhdqllos6nqf8okxd7ny81v4ndyv19zwbexan6xz0b15qks81jh263b77pzsbh7cpdyw03earyxlrsegq3eqmsabsuw29nin8s65q23fx5e1qmru25got6wdra9c55q56049jzi1x0146hilmsrchrogviwbt423s4yhdfq14a4bumnksikr8a0w12pa7tslfqx3zdzr1037494w22sd67ofyhrnx4n1p9ujk16rxr55u32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: 'rqfsfpfy8ecds6himnhf44c7tvz4j4gi1d65f',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'p2d6ajnbxintqbwfjzdv',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'zrl4knshtgeis80ossjb92rgdy2qch5uh4biczpwrruqnnxapck3dihqriff8fxoqhknuqa4yocruma9ryl1fbpf0htn9z78jf65z8c1kxfhh5kabwr0jtlv801unabpoctl50m4jv481da0cvk7dw0jexubtwde',
                channelComponent: 'jo6prlq9x6chz4kg4lhlwiypbzbolucnjwmsf6qrmoryi41ssqpqqrhbkpk3dv3805241v5n3823l32yefn8y4dyzz6lw5n33xb4x27koo8caqc9y1tj910adclro4m6ae4n2d1e3lpxgdlpmlea7o21fpefbhrs',
                channelName: '1iqqyysflbrwjt42m4lrhe76kpjnske4zw8bz7upxs68uhcjaf9v435mkmp5hl414m9j3n4s8bewjg5pk7ofobbk6bta6juama5qlffn0n64n8dfluahn7atu40tc6b6zwkeucooslnyvipnnz60vp1ivabkiopv',
                flowParty: 'e9s9x7zt8ewtytilsyeo4yn9gq930dgpquhg88x0aap9r58lcjjquhlk11wtmrs77lkv5hpchf2mu08cvbvhr5td40fc68400fsfkwy2fkyjczgxj2wbiper09hv0zxch0r7n1v816j93wn2do7wfx0kt0dpjuqf',
                flowComponent: 'yxbmvq67yqg0itzyrjy4grd937t4hwqml7g1kdaj27oieb8o1b2kkel9618zjxtp6og3f526ob4tsrb3rru6s62s1fhoo81k4p9wadbp1l73b7c66vkta7itrilwwdadbove852nn1gf7wfj7338xa2qrocojee3',
                flowInterfaceName: 'rgwcg18myog09heoqy1jvx42h4gwtbaslqs35jovnchgtio6qkzgnamsg5740twclkssk8qxfynd2elk8n046kxkixfh4d2yonjnce9iumfps50j2k2a83o0b3h2r901gwjjvr5ab5j752oj0geidt6rdqwi8boa',
                flowInterfaceNamespace: 'e1ms2rpxm3mxvopyh5orliwuex48z883fparyjzwaf4muncdcnxm2kcbj9nctsawjhb3iyvsjb6kyznum2xkkx2xl790i3uq5h0pnk8ux5ddhhll20w0eqsciz2obqrocp44tthh5m8yfqqe738m50iz26fs7mz2',
                parameterGroup: 'i4vtm4y4pay04hlz8xroy12tclita54i5g8mxynm3ts6cizc8pyomc2hc2bkskczokae8l47kc693jm5imakaxq1r9beke5xriljfl5homnbhz3mryg4ezp2jfnj61f0jp9cc5t29mshb48wka4xo4yz8fm5w3mm00asdb8hcvc9gq07c8zf58xea14tf750usi3hjpg6v9v87ngr49syieg14o2h86yuc9qf2k9t4v35rxfkgeekbgdtkpgyew',
                name: '3povf4v091bgew9vgxvm2e8y93moaihswm02nmfbk27xxd0zry0pxrc6qq79zv5moocle0sps16ez9yqyslklmg6hlmbvv9e3iwo6so9vyyyfd8qw542iedfepvnpy1apvquo56b42m7rydkmsgf9x6h3g9quk8ojdgjg4mh9oq90gxesfm7nuuovo94goonasnuhednhm789p3e0yoomgoznzx43vdke50enxxb1kwpifq0ykfwm49o4vuqv15s6ni11xhvh2f7qqht2d3jldkc377yo23de4cbzgdk4yyys6fywbq2fzttnlqscmpv',
                parameterName: 'dvbk918cp14augfxtx0ku0ul8x9a62rjckmpqd2f693ex34zdgompai5flsyqy3yi0d9dy627z7np842l93bcs8g63nm3vrtk9ph9cc1jigjg60tflv2dbfkgfv8ohazwy6kll8oc59ci3xfpso05y28zmnf25dkcelo264jk3s2scbyeb1paadkktug95uyxyqpvky1r76qduuruob3fzordpwgm46q9obgo5qhqvuaqr10mtdhrp7cdba3eq0uyuipojgflk3a75r1vtgbuk3b096mtcfw88hruewcc506jlcnbem3fpvogkxsz5pb',
                parameterValue: '2xk0n297s7k72xss2l43gxyqhiio0g9t85uzanx65wwbbyqu3itevqh549bll7b78wndezscrye0licreccw3xcta3pyrsbn8qcwconbh8iobvxllsaamt84i9g6wu6vwlqv5s0xgswpjgrdyy59tnh6mo7sag7gpi6mbivfrm8xwu1gafq03g1he5p2v3j5t6eqrjz1km6pvjsjkpt4ywnr4a3zcelb8eewesvijcakfx4um75bhj5lqfmoykrp4hptcm2wx2qi57dynbevz84kbncvx2uxhoj1lpbqpjwypksnz068ogxt3u3ja53w7vzcms6y03omqch5q5asgovo1mpczc3wutwcm0757x5pwz96qfula2yirihezbt1n7pykjvre3j1odea7lh2y42igtinf7fay9mfnonq1n0a6pk11m4421astc7gsryp2u500pvikiibj9ph7m82akznp2af8a9dsuk2rs90t8318fgf8cam5qhotr5umykhrdoogsf0j43wey4wcxvytxnxylsfmgleng2mhbialivjvn998pxj0p1qxg0izw8a9tpqgczcs2z8qyc04nqu4a7rbudu69915trzr4y76u2q0dwq852pk5p74tscf0gzgalammdytirq70v404tqb0274t795hnurlha9qzhngymetrd8tfr2x4oric2s7s8hhu2kxp3ao6t2m61tso8q2mfh74yjm5uj1zpwvrlxf77s6z3pwl3d0memu0cyjahrv4u9syqjp2jfpy7wzz1bw2k5gqgbugrr5y4hpx4nhye2mb1qlqvmy3vlj4b4ut9x2mpbvhswktlsh2aw1lllj9w5hx88mypy0nh10c1wlqb9kz4r7vewjbd36gig6bi1kdxunkcrkummxhwdui5rn5o6frl4ykuaconwutk4oar4334cuflj0moejg3mha5ebqzc0b85ic86u9s97vdstqz67mup46xs51tjun6gnekeo94ktb04p2pyry2qadr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: 'wh4ntbff3dkslthn8ripeiypeoqwka4kjm741',
                systemName: 'hr39w8c3hhlbqjoap76t',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: '7tyoi5xib994vv4sfrmtn8bkttifyxqru97b57uaa3n7zdm6ppm2z34u0se83fwxedt90qhv2nvu422mj80jboipzgck7dwbg0py1rwq2ybygrl1tnyksulpk16en1mpykmguh8jv2m7qpmy6mgltmvy1q2qr4xi',
                channelComponent: 'ey240no8s5sfxvbp50tftcn5u76fkqxnepdq8gl6lrv14w1hbq4g4d2xembymzqdqi8an6btxqbil1u0xvmvp7qd56476bapvm7ypxvqvr894g2tlh554ueeszjw0sq866q5sotgsotkmba7myfkl17tgdzr1u5y',
                channelName: 's11adg8es556e8wrddauhnix95mouch1ca25prujpx63t855h8svriw2h90l1sdlgvrcxleg6scy2cut541doygn8fme1yd46hjdu5o5c5hmhh9fn976idphp0cgq7wvz9y3mxn62ox845htk5mz4vw6khoiyckx',
                flowParty: 'x7bc3fhf0xxvrklx84bnth26bqxcr660qc7363pe72z0ihpnyg3qki3tlvti2l6ktyaskljcvkcxivkf2vge31qfkhpogf0p51c6s9xvifr9ipsueyuu3uxdpf1owh65nf14veoa1405uj0jlhkatkeqr2fqq1gs',
                flowComponent: 'deh0m8mi7n5ai0o3j0ant1bq9c0zyfe9u60g6ycw8zw0v3yz0uur385a069eampdlrj88qbc2efb1os9ywn11u3fu12tra6p3nwqwd4h8n005wozpojenl06acqgy8eufqqjvcoua28vxf0ytzifc1pn2nqyqqkz',
                flowInterfaceName: 'w5trwyey0ofau03mlnzo2iyduvw8uawnwjchtjm7dgrj30xsqf8tibvcbjhhca2yeztb1t5vxogn2i3ia6guj0qfg4puhith98viiija4aroit3w08ixofi315ny371r7xcmn39d6roe7h6tqh7gugqxurr9o72p',
                flowInterfaceNamespace: 'tceu77izwbgyxs3wdm5gnpnlmwg0hojc7h5ndb19tnz7scucdweg8y3psib1axibe0tkegkpcwch545whr9ojbgauxrp83azhra1ruj5yw261nqmhf9qfqq0ml4xqaq085m516u7uq65iggo64wdrwz0vuiyc9ws',
                parameterGroup: 'mipfxj8ve4e7kmupod41l1v0mrphrgkf0zm0xypxt06i64di29yw5c7mjzgftun4y0db1462jvsriu1l2v4xhsn7mmx8p48zokami8nvopjgpyo03dcgjt8l5w285e2kc6azdreh244usld0h3sfsc2zscyvjurzooijklskp0uuyxmftoy6z8mp4slvwwc5kq0x7bygi7ky3oz6pxbxbucrinplbxogw8aunv796e8tdxxrsd56g55gj1cerot',
                name: 'ycdgpy7mrrvwrq0sonbz8hgem7ro3tkjkujln0spevk03fx7gzys1mymg8oaueu99aeu87u8immgnja242l85w81zl5ag0otmecmbhwu3x6tq1uyderyyq7tr1r3yaxdfezxdwbs0y8j258u8c5f07gndo9qr8bumgehu8bu3sj9yefjdg0yvsaqv3svy3udn0h16isxjtffpsiypwjzgbcjx95z8f4b6vzyjx6o7dqi94bppp6c6xeg8fdy239tqz7vva5wwlbe4yq204mk9729v2bk5k7sucbabe8ko5tjc5qebniy9zqvr4506u3j',
                parameterName: '81fz4ajr4qt7bmttqoqn90z7xbkijtnlhff7uudas1tyzza8ff42v25tel65825n3secpaucdq7cj86j63he9ll88mj47j4kg570wm7vedrotjftdm3zspmko0wsuo58cvx5jjwbax4erjel0hczzj1iou62jwqegu37xztbbd05vr1wos9gemdvs5q3wd8lfrmap8hxdj3nm8dlsdviwefw3lu24l861tio7bkcw1okbx736hsptkjedawc4u1ynawkmk1r8b4uz21se2fv9il903lcoxob17p5d147v0rhiratxv9y9623ylo8g88d',
                parameterValue: '4nlkqfe03l42nkbxfx7yg9n3z70o4lqaxktazv3fm1wpteja92ctrlgc3erkjj04wavj5dbylbwyac0nx92ze0e3fbhl09o7jx2lo2faspuaw66p8bn18jbajy2udwecp2wsrjqi1jvjtvmie8z82e9tuylnu7w7qiljnxyya81r67tngastujpqcir9z0n5837fete0h8hm1ifo3wg6mmblrobkahnfqlyqobkq138nm0c8n1h7y90pgxczz639z9gd9mx72cfyyx8l6ewq1o03qbw2dg3pu3d5ss5j32kcism7xlwa2297ximduenmo3gqegzz2v65bijc09o3iijfk0883ww7q7adnvc6x618l36c6tx2jk2sgdbk8a6lu26lze10jjtsvi6rz73ve0qfl068scuabuyx3vl61jcss66xepxsrj5s4sronseqc9sfajbsm55agtuqj0af6kqkbh9vn4x19s5tb7r0euooylcp1s17a9uql2gy0uex2882iamlfl1eypmbgcqn07v3gi0ufillwxzs4e0dcj4ffgzcuj74j0ly9zu25bjuhljtbvisi4ro67foxxdcurk0ak0h1ond3c4vvhc68hzik8b5chsqqxfz47hfkjkgnr640unrzvbdspdinvz8fpnw2kl43not8z1edieqinoxlumrf8la2wh260gfwc5v2yt9pzmwqxdbdn2gjfjo1qdfp89u00ddy6mf9xkm4bqj6jj0x3ffvb8v33wha9fulq3u8scoglzb3889azcjjpsgmvg7j8acpbrv78nqbizsxh5q2dmntpr8wamuoc7nucmj6fw2oo1le1z40g98keyjqr9w9od21z4slgt1w106qurbl7itr14mu7q64jrv72hpnwfhmggt0k9hjwjjroww5uyp2ripmepytnvpek7qqhfhq8b6nt51b0b9bjbl4vj7tu2yb4cwhru3jlhpek0l6j9qqxw924ziwmqelw79mc5w8awagitgy0w8tun5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '4k20mv4zom2d7uhmsu9p',
                channelId: 'xv3bkijo9gfjpko8zxz88ptd92skv9affuwtr',
                channelParty: 'uqac6hrvja33wt1hajzp8bj6zjrvbzdh3sowmq4qzlmrsrj88a87yve1a0ov8k2u752mblyu026db9fqjeo85r7kmpyn9y9emws8nlxwci5i3e7i7cdlh6lyrwpwtrv5yq8u507h8la1yfvd4wcpfltg8kgda8vd',
                channelComponent: 'kkl7xmff8oju3j886h0p23ps1j5177sotjdif3u35ey2xmr3hbuhr577n7w8v93j6wx8jogfc749iz8q9435en74q4uvsfqb45y5wy06yq5no92486whn7w8at12p87mb1c6ng7w7zhjbte6s9f55sarltcmh01u',
                channelName: '64cvnzezu2dese87hw1aapv0xysyr14y1uen8tw6sg1apnd7xy7h6kayuabebzporfa8usia4novllmj1v77qy3r5jvzhm8m3gad2cmdh2j204su4eefsd24c6y1l64f4gm5vdgzr7c36iabb5nyzvh4scq1wnne',
                flowParty: 'eiqc5vilqhgmnqxo6sq8krlzhf1d5eghszb3lk2siq593h72fg98uye6rql3t13hno4r5yyn0ghry4b3czgeit79ykk5lyz5isq87f4pbyod4liw7jiuo4t41vcvisa721ksybv12h9k11l1w4x8gu3qpdgbyqdl',
                flowComponent: 'nvkjn15fpqt4rfllmp0sb5vtvczgmsxfqfpou2n9uopd4uu2iyfkps4yug15il71ijhpmkg7s8q6it2h58h0q0o962hp2gkx7hgyjl19zepkkkr2wwoocqpiit6qw5hjk59bayevhpvlxd6hg3fmcf2hzveengk4',
                flowInterfaceName: 'tsx7d88njdx1gjp8k3smtiy0ngxnfntl7k8grupc79zrq1cksvdg3tfogmq41ab34oiq8fcijp4bh7hjrvlw2l5tix022cilwsk3l38ighyn5ssiq33570drm5ea9wwvom11juzw466dg63zl1pp4q6smrgmevjm',
                flowInterfaceNamespace: '2pqji1vgppvk19y8audedbal3n1yhx6tc0kqafwxqc5f1sdcx941lx8sl2seid651xomkevykpk1k4nwvfenewupvhl1y3ea5pjxpx4rsfl5rznveftrgtzn3flqu994ej3hj1i3y4a1ime2q4trzpjybd5e13bg',
                parameterGroup: 'f4f5qexlnwg0d1yuy8ptv16fusctqals3ds5s0idvdb0ily6ecoxni6ojj2hgmz4efzem8a1r6bprjngpvcuj7xbmx1jcvoiy67iwhm03omev9vwd0solibzb455cedgh2qjppwo34njnm8f9amims0571rzay5yyidnprasnw0oieo22s2081rb8qq1twtq3qptbameli4xpvd814hbck5inro4ogq14tgt5y0q74mh972tifxg8rrdpzo0ssv',
                name: 'l5bio0e38hifb7453z80isbg3ki9hu89hz328d0r1zg28dfls5xfragpvjsjic7y32lqyuqrzitgnp2wbvjx8pyrh0f0euwwjvojt7z6qy45kqm45k2qiwu6ud4rsrhzuf5cpo9j5hx0ap9wz8nybqiit44uzgtx0ify2s0xkw3c9qf572o8erj8z9mym860jrm6ssiw2xh6nfjkt12eqylilyfqg82jvn8ywsrwtaahyxiiuwd0cn5hn2o7zw97qs3tuwww0kg3qf3d9szww4wpgsseo2sp0nvv5ct2mydd9du4jj09yt48ib73rdg0',
                parameterName: '9ld3dld7koh7oyniehqxsu7jwehoydltx0pkvlause81oei8r2h5z4v5e26gizve27fn5vriqpgrr05p2xhv7ecnbbhhthmruc81pbjtjuf793030lelohlk6sah10p0fkuehxsbnzsojjhlzl1whwdaynvg35gprdsgcaezylux3e5c45w7r17p1e73potskouam1egltt381xgctncg8mwein2fhhy8fz696hehclwrzhy7pcbsrtgscknzv89pbahjclqieuotp32qe18oxgcxut5r47jv9amy3uugtoy74dll9nlg1p54vs01ecf',
                parameterValue: 'sxeihcoeb9xrdfb3xh3ocdzf5gpu7ni1h2lpjk9fpv1s7h7uxuv7ulkczioyt12lw3vtny19yiph5489evsrb0jjzj2oreekjmypk4kivuvauxqissqlrxvdo9ywnmat16ldu8zgdtcwma2f8y3urgunlg5941tf23pys9y7q3xmzsrrkbfsd4ke3vozi5jif2i1bzr5z7fibtfqb7ne10486rvtv4ldzwy68u7c6plpbnl4t8ujk6amn7yrkuhs5l9qaxebb0l37uawrifd6egpkeq0mng9dyr49p6nyuoq882dvfljrgyw12vjib3rbp75de4ejiiwpn7c5ut10dl6t57yov5svbddff10hg0gt4jzbfctdxt0tdeir0hd489jml5r57xl4f02dcu61uab6umqzysiq6vc1y7kkgqcrz8r315yaeem9utrbhuce6xjhb9lvczucl6yxy1q00yn43sl4n3isfbw9lvvu10bll0jayldvu4ve85itfwmn4ckdx5tx7nw4gwau53w8w4tmj6yhcmeijhekwiesjuc5jll8ksa3qs33je1n5z3tsqunn5an8m28vxcmnyps1donzn54zbbmnlg3wdj4dm4jhuotvnn0u6fo3kte23fph0tzff0x5wzl02gh78hkzs8tfr6i7b8ndexh7mudx6g3a7jvqkbjykc9zb77e3vask8vkn9lmyoohwidwlctpg001dzx6bej5ojzepvhp2b50yipnk8l3suycbhvrnixzh7g4cuojebopfbgd232hmk8eskz6xv92uw98tkwkyabej2pwpv5pkqh4y0s6x8aair7lw8pcr6hdcu0avynolzrnah9ihznqbe786u8srxe2b9wte34m8tqdsmvpamobd943oqe0mtt9op6g31uocuzluiem7uyr2baudahtneolfotxshfwgf02h1auq8noxmxh2y4t5v6wa1r56fr4cq9twi7i3tavm7hw1n8jznbacon12clec4ixi08g4z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '8catka226a6uzwhcfo1g1',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'm4sz5df3080xeisbj728oy8648wy50y21rw8487y521pxlflnpc0yotr1t6h4i6exz68vikecwadsj6nvtb111xwytxoigb9xcbow9ueufg1sgkrjd9tnmmfgj8eyd2l3tij1cyde94ejfvyt8dp45t24yb01ycs',
                channelComponent: 'mz0rax3qyf9btl7oza3dxngxyjha821ipmyebrmogigg7eosg374clg30qhbwvw1heodhm1s7muwjt51xc0h1urwpivce0yksgbwmfhirnmyscbuzen66110fcg86tzf49q9jtceclcm8js5rgk9p8u24fefp25f',
                channelName: 'vdi5ek7h0pny4mzx2gne8rj5bx29eajuvwkuvqekn1c39mwb1m9qr4rjzfkcl5o3m7slcihmkelge1z7jvsh73un1a6yqhh9nzxyi04td5rt0pt232wqe22dn55ftdcofl9wzxi4l3sa1xp1n90p37zg1s9cf4xd',
                flowParty: 'd7n0yomm4eq2f6ttyfcefd3ovh9o51ncm9kg0nrrt1zgblt2p6h6fh1wl3r85595tw09xrbpr156wk5acsl5ta4k8l48h4evh20pip4m2x4imp44m6njs9vfturddf0pfud0btz6w7g8kkgig2qwzxnqvyehgmki',
                flowComponent: 'xvdsff3d58in83136sfw5rsys3bfk3260pluvyc0m6i1xpaje34jayqeufco7aqevpw8373s2um00kvpfkpgcic2i3laqdei7tsxhswby8ou4sexpsbpkbdozrm9qlx002gpnjvi1m4wi0vkx2jnxmlv3xa3aydl',
                flowInterfaceName: '62l8099hto6gnasz0fnmo1w16n3cc9qlwy0o212kaxvspk8bvlkwfgmjlm2rvgkompkotljlhghyxwenkph0hp6mc5r5a8y53otkea2rdrqy47krva896prgzy63prckucopmot4vq3xim2tgv7wnekps7d0yh7z',
                flowInterfaceNamespace: 'i0xjsloo5i5gmmxgc0hetajtef8iq7tc6dxodmai93s7aq3gmqtzu6wep96kk8ocbylr4s1pzr6g8aohks4m4b1ru7gckmcpmdwaxozgi9jdk8xhfndx3giqg5bwaxpe8j1g0q50kb8acvxangyosxx8upktdtmy',
                parameterGroup: '7pa5fz4ya61b7kp0npg23m1j6ti9f35dpqdcq1uvknyq4365i7kxulqm2plzc2t90hxu1s974gtlqk5d8gq6v2rouwvzflmc3e80sysfmmxrmydhub6w16mxoi08tga3i8eejejdvod8ywabcdo4q6hlap07rwq45yhxckvgsu8td8mjlgwihaczepesahxk5vx7fsbb3j8loc4wf1ixyv8fgmm00haxiaadnhogv84c9l0lzgeocmpfl1x1294',
                name: 'as78vh0j4yve3d3zl01j37o1xq8c2r09hwxylq5r8k69qumq6yf7x9m1leav87rkt0kor6rvna7lugrbe23bm7fcelrkts50pbx81ckryxrdxkbqsciqsvb8360k36x2r2qf7gq7jjf94e039yn8g0jhebygke2lmqe57vyhnqtfey1fxt4e3tdffucfxqsy51mqnae54b3e36w25ygsqcpacgc04qwz3sik5d71d8la3xd1g0svxd65jqstoct7acpr0twq3z8ybphrndsy8ss99hxighama8gt1mwmpzcoxrqdjkzvyro20edc58h7',
                parameterName: 'u8vn92p64mu6662r04ulmsh1kv1vgarhl0ex8e08er6o5qj06tv0rz88v03atkqkmenjwk9vfdmoqak0pyvuy784c78gky7yg2l90e8nsj5m1ooffx37pyrpagr22ehkjbe0hfjah0kmcalm9v7bl7073624dryhismnx1xfzglc2hstvlcsssenrcbw71qt37rso3ryl9x2kvu0cpxmnaex0vv69osgzlwjonnii4wzc0ivowpw7wpj0mbckfsa6z0hh6a4cuq24e9ixklggachd0glw3tzis98s2wztonloc72ob38x72ty432a4sm',
                parameterValue: 'yl3mhxxy9bvcixnkk9xf3tsuso33wof6dvbx3ctrkw1vnmli7y4rbnp4ti7skn105mtdbzvs987gpjxn6nug392gdnxi8frw9d5rmtdx52mmrvz693frh3dvoeob182djz4tpzs0yffeblsbjqypqtk87h7jouv8rsj3phx5hu881ab6o5s2jqvd8hf249g4d9bgt12dsmy4tzn6nc2cz8kprdv7txufz0h92kt5wlb2fydds2yz4lqbh1kd1vnkc5mykrvqpps01usqf8ra92vsvqcgxl7g98as4am63ozhermacp0ccn2z79tb2w57akox18497js2nn6ld2uastmzomitddsbd82t1iqs765dfq6ycwdt15u1lw76vqx48rhh89o3nl9oqqgt27ouxgmw3b9v4bmzz21wosup0nhne4n4erpv1sb4h2j2m39t8ns7hly308c57yskd0zt0wit7mz1tru8o296jfbtnbwimn3cvi15qib8tcim1co33hja9xf62sqgscizuhx0hbj2naffncz7tt90kr7xdxflh77nkfbf03rm15ub2qv5om1jk1s0f8g6882nv093l8ctja2adz2hjkgdawjn7b2wrfp03vsozv5b1cihkkb93m9ee9cprm2sdg4pv1t01xh6o8y0uwpsh4nyisrvav2hiq9egs9kmsdcvuz8pbpg5dh265i33o1lqaxbizm9yk4jfie63e2kcb82bhb7w2umsaxx4z3mlm1gubj0f1isx6c86rt201o5m90g84ed32ea69yq7bv51ff4brxteya3ozqwlrw3biyotkc99zjik0b3gv73813wjafxbsdj3b3sv4be0seclaj6j7bvusabss9rhimhmjhqh8mp1bqmct1kk6nv1cczroh1c0wcn653knw4fcepew7uytj4npu6r3y315dxf7afmzn31sh45mnqrwse3umb22muzjc6h9itnedrm59qymkh8spiex9tlxtaj62fpyoohpbuwbxe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '2oewwbsyh3de7i8y5e1z',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'zlwymnpjq0h5w15znacxo2tei2h989ohvrpqkzos1wmf8ax4yoatp8zf1bk0ebbnovrnr12xqsj7ell5e9yqiyhqletgje1206gfrvp9avqig6jiv4xj14agqyukpl75ciggakxqyp0v3ucaeunbl5raortnzs5w9',
                channelComponent: '2xhkcli9lm1u3kzni09vhbtk34xtvkdqblcyblgf0n0b5z7k9dmy2jnq9h6lim9vysmbi6fzpkpx94ncn6rh8krikszwroftjzky0lzeh5kw8euj50ms4sk4e37g9hndy6g4o9rhbv7mywv6s35b2elxlw2yutmu',
                channelName: 'ushlpax2mtf86x294pojl6dw3yb5mtl9oc7zdehbk2xsld3kjl38ia1z5uw6eczctf7fvqb0f00oadu3ppmk9edo8chj2s1b2alw0jds7sdbel7i3el0yungreypub29jzlzlewib1hf8fekiu08uhg01hcnjcro',
                flowParty: 'd24znp4urj6f3yf0e69dkcstpwdarie9lbfqoprbv5bm8lj4jgqa0cyoaq6w4kf7tx8859a68v6c0dfx8vy10gtjbmxe4ddgej3ob88dt7ylizl4ctg2u0mqmvg8elhsn9d164nyk2wo060djfs7ik0auh4i7195',
                flowComponent: 'ceqyvohz4n0lney37ozstj4dbq6v1hw7vazl7cw99el8bjiwhzetvfs9670yviusbne8w4yj2qzz3gd8cy8fnhp7flesp8jioeoewqgk9vrs6adagcaniymy3a7bql1uscp2cbhma02lq7x7ee34dqw7ha0bghtg',
                flowInterfaceName: 'og4bv9lla65w32slmepvnuhaqsnld0n7rqgpeiwzinvy1ztv0s4ro8supzcz4hdghfj4hqka9l2ektuj9x4faqqrhjh98ud4g7y2utwwu5s0rnan3ntb1abdw6qg0nycba5me1m0cfuclvmxcf7mmxay29cbpb7d',
                flowInterfaceNamespace: '7o73t7qowvcfr0k27fjhnygjy4m55xr87jtah323y8ek2q7kjl74xoqcizpmz75exmqw1xe2gud9yt24yso4jr9zheeffgigbi54lfuemfe7wwz7bj89k6e3upv4f6tlm8fn987yxutnvvun6qr92ta9vpfxohrx',
                parameterGroup: 'eqy32ennppwyn1mbdw2mcla4hnv72lzcu9akak4we1zh14hkbyab9hefpscf5ckf8a0bk9gfdc6habcr2meoivsn8jy0bahi7ffkwh3tvu2e45gz2xv3dhgfydfw3qoe4usbvolntkbz9wfahx4dxw2oqrivi49mgt5e8w42h6xochv1vq02pij5mvc9o5004xe1fnpstz1bwgb6on81veapysz22oh0dtgzjq3x1fv5lphsddhmi1wxsi1pblq',
                name: 'ff6yd7b0txu209hywa0szpj6lgqtggilgm5qnhwu89ucy4mdw789iy6h36wjgrevb5fdttr0h4tqbnbz7kkzw2spdnxkfn7rh0dj4q4zrec56fdw9jbf7iooijr45vty175q9hx22sc50x3sibgbl75m1kuyhs5feus1n6g2qlp11qcr7w44tijhisacxeckj91lrcqnh3qw4yykbulww07ehkxj1pkggtozgi5b474pr2w5zgqm522h9vhcl4esfy7hk4wgirirouwbatgtwha52kblez7a954h66j0cuaktitf9rgvnlmx03ofeu1a',
                parameterName: '8vtl3g5gxfpib098nfwxru2naxi4ra6w54wz9j9sx1d8y7pqtti0th0dmmdurfts3q9ig8ptrnel5rx9xlfpqx9gz5w54blhfj22umkgpfqrling2h8ge81ot5k115acch25wzu4rfvofoiucte95h0bdva0lbyur4v7l8dr2xs243jsz26dlqvpuakwqbq0xubr8sfqf0md8c7kyvr8q1j400u7vl9ubs00dvy2d5g4mgv9lf979nwsb30dvot328z5czjmqv1ei2fjgv3oz31uow69z6rtdm2ofkj95fnv5h9w4je9109xavw8mzse',
                parameterValue: 'n1gemhjon3y1cfzy55k561pbuv5arbnzbb2s26u4vha80bvmrcx3b2b4r6fgjnueo1ywrkq9hgwtmwckpex613zbqkn9esp9efu3luu0v5k0nze6vv8oxqtjfg4xv1j204w0sbapz6ine18ufmbrc76dga5bo5nxuidvmtcli3bhup7mabb2squi2wpu07iyqbbtvluyd44cj8kmkv6yico19o3vrjo1a410fpa8cd26jc2mu8a0xsas231qvpe0i443j7a8hlejykaczadq7dc5vtj5lwjnbcs4qd26nj8jn0nmwxroty5jzrlqfzcf6exrygo16tfgd3y5d2b5exy3was6m44usiwnldxafoi6h1hdaz74ja8j17nynvism5v9scupyea2amacor8juj3u8yg90i31scbzbim48wymgnyauq6r8et2mddzh66n9h0q7s9h8s6n1cu64ofx6dww17zv74n6ygew84n19z4t8q44uyd79ov5eljm1w3dnyb7ursfpbg68pygjzqyq5nup5rlhn9sjyyz26i5ahxcibpmc4wx9tcu2ek45zqpk8z4rx2gswbxvbk7ryd0kv8fxoseim98c904wyrznkxjcsahum6p0y0b7hht5w90a4n5hwnmck7djq07u4w7skqo2pj9xl98ts229m7ctys2ibayuibhncs3p66p0k2m2oaurs324lyg0avbsh4ufwncea4vwz22xenda1wwv0wvz9zos5nsoce8s5250vqhzk557sw0n7a6skjmoy7mm0nnl65giqf3ncrjmxxjdry9ihn36phnzv4go5b9uanyr1a6vu524x1tlojjwzkncdl5wjpo1ko0efa4vkk3uzssngj8274q5moc2mjpgj3gua8t1mphum1xgsq4wk4xd75v727p1337bn9k2iuwuuptqsz7r0nnt5v8tta7qh55kk58yx2ysyhi570373ht9l7n44hf51ppsr0xgug4au1ijl2ubxn4t6ellqm0rrki',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'phfo4cpf923gr15l2d6e',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'w1ysmuydss7h6dmjlq8vp27fry4u6kge5cnr2yffop65s9nr2o9ohiqzvn0afivsv4jzwdk1h2qg012w2vcxe7i945xo74xsn7lpi0hhebksm6m720uihkd28mrm20e2c0e6e92hok5qmiq1k1ryakqlpzbfm4tn',
                channelComponent: 'wtcjdure3wc3mh0uozibpgamhu4qbfb1miif2302625pzcji6zaau7gc8znsnutf4p1wc9np46o6yzsfvsmk479h83hqc4a21lwwcw4nbv5d7kusug4fzpipfr25h9z6zdbqr3qd9d7r2aqbo5q3s6bfgnj41wiq0',
                channelName: 'l3gev8h19xzwe6q1udf64ztp7nfzqnlj6g07ttc7n1blug3rfpwhx8fs9fxqteifr778tuvznbfm8cjnm51rr7br9fcllh3mg1biw0nniqpytaficp6m7k09nfakdz2d6zwqsl8yh58brn5ymh763z3zxdaw4ypp',
                flowParty: 'fjs29qz7u7j2xfnqtikfk4lso11k7yagsukfqy0w9eqctq62kyi5u38n9lffppzv8frv3rvxl2oakjazwqk6vg42pqjzrjh51yjd3lwcx90mna57akn4jllyxdvj4cn9jzehgfyya0i5qvlo7vgeuv18njf85vra',
                flowComponent: 'r4rdlktar1f0yey01qpnqxl9hhe96faxfv9ltt869nueenlgfleuqg00i7ggbfkpgdvd6aw3vkya1qmg6j1rjk0ps3bcs246bm981x40nesru8b0rgyyli8bfz8znvx1tpfajafkxnqhv56anykjemihkyvlwz3e',
                flowInterfaceName: 'j6d4p781qsgq99y5y4acqv5x3xsu9a7xvy7pyjm7cv1g3x6yu9edmecj3mo9j9vqs9mvf2ffp30tru0lwyloem06uxn3rlb3w1d8m946enop4ef02102v38ewyeq3oeocrkkfh9dw0m0ef4pk0vuiw3fki9l7lu8',
                flowInterfaceNamespace: 'wy08z7q82297qlcoimbv4uu3guibewhsur8xjw8mzhan4j4ajxfwqv9efw8qpj4klkf0gnvp8ahvtp082sjx40l9oinqc8ysun1bs3vaxio1tqcz0bubwicj7w2ij586921gqc4y5p9d0ef2crxgehyig2co5otd',
                parameterGroup: 'qs85wixspzih7lcb7vci93gxzwj0c09cw8agfbnieavvwqqdlfgjdq9uk4evbt5ksvgfsoko0ip2cpn82abzfbwqfh5p0k00ychac80etq3r16hkkrfqwluv3b5cmkm973p64hng89xqeoe7ivougfdgbd6a5nrtg9lgdyjjvoxsq3vbrpan4p99czg2lxekfx922f5i9irz5k90ilw2uxtjibc186q39xqyt9mptw24rnvbq5yo78we7977tux',
                name: '7w6pf807mahkx7m5erdy1fkl2gh7kv47qp6nudnma77jbsbliwjnq9k9kk5tau9p6otshxye6b9h4aml2ucl5uvsagcnlt8rk6p15tc20agn4lt004n8q3u4x2fh7ab5pp28c1oacagh4sqr9usq8fbp9dmekq7yuhwhr3hr6cz8ao46azlwkn9nht3e6ez5w9pte8kux8wi53avdfq69kavs2u4y3n6zryqkljxrro0s6v3fw3mbgito5ijxyvfc0ky243xbj71u0c71oewh2tvly214rtpaqshbzv266fosopzdcrubywlgquzpzl3',
                parameterName: 'ay6c0x347mgpilfl2x6d7fpl13mloe22ae32vux4dkcg6ziqdhxndakfq7dubkrm6ynfmjc8gqs2vwi7zh5tvogblsykt20nc166t7bfzyur3asl6tts06farbc28osl1tuyo2u8p4u2kudis8ebwac63g3je546sevaf80myyip0bxnah6c3ee0hzxyjsncatqkf7y685xj6wwut31jrbyiwpzu1atxrc76yrwauz5fiqpeadw3jc5vsx6i1el67jr0llzzgo6qolf47nki1gv78hdwyhh24kocgxy0hje8nl7myj7geami2nq5q2dz',
                parameterValue: 'f47wdva7yjvve34642j7adugvrtchw0euoeg1t7nqagvxxcjn11ahq8cbgie8ej8mr9asdxyqysnmui9rvcqryk54migr5jl26hya6br99x3hyowo174yo5ookogs5p8du96j0wzxu3wsy3e293xgotq0q0ryea4uggqpkiiobxbfp53g2c2m6524d9b9ugr6p87hz1g08x700x5im3wtrdid20rd73wsez68ui6ysw9y6r1ub7gertelo1s1qtdwrzndttf6dchpjg0u1atss447vtntslcyu2fw1hm57rn8hd958oclp4uk9uwxlb4m8xgx4fdyw8zb5qlmj224tnk2uhkwjd5yx02l65711splfdyx6o3ysml4qf358ywtx6im0020ta53z60mgg577szn6sxvwo2uwwo009pogdb6eitpjs3gvzmblnmy17519wy298juh6gp223f2q4ueod8u1dyrbaalyywva9ryuimwfi5v6mvxjljien7qrie6vz0vhs7a733b8qpw0r47820nzfvtcgienagbg4f9rc8vny9873eynjnqglpe1wfihxolygl6a01vba4lnxj3g3ajg0678wxcpss65tp6jxqpvxcpfk8697nsh8hpyqxxgt19k0682vl0q4zi8rcm9718ityhtgui07xpmwlmftu1x26j62twgwneagvh90pe23vtu4awhpiw24xfh9q4gjfnl0lwi64l6krzptaivpbwoep8iluwvfkdv4o3wex1bib9kx2rfnn2728d8ji5rz4qhqxxid61ebfd4rbahv6uvqzmedghrlxgelsza6lqpquo35j2aig00jfn03kr3kt7hog2sx5hha21armw1wnprlefnx9592ow3vek06vws5f7ut6x3ucd6ls7yivkcul4iv0yupwxo7g5zzrbmv38ti04ljr5qgkuqk1hsjpuzukggm2bvl5146d7mrwh4tuu7ho8f1g66j5gffmj0nzhzc0gm1ui60w4sihbp9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '9qwd4pkg9o6crt7hvwch',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'ric6tk0zc8zk1nts7c81vpkqe54ez6ehweppk3ykk2r6b0ypsc3xdnva335mer3iestf7wzpuql7pg7ncjczdvy1b0lg6a9b9bpsevpwdmq3x5yyxxiqokfywbfcdqvbbu60pyta2wa4s4u0ui4cj0otqy9q5t3l',
                channelComponent: 'l9c3vg7o08yyoxjcmjgwm6m91u6gj7z41vhk4iz6utzprnh27fqq1ppgkh1a6zkold7wkt1cm85cp00vyto2zbs9428mvtw3zh88zx8sysh2lo74qrj3yt2mniyzyd4koo4kd0mvshybrgt3012v3nn041y4zncy',
                channelName: '958oudevcutzk7g7q4viey2t1v7bylx0xk1rm9leeb8r5nhlixz9325u41i73mqqbk7j7nfbgpge91ntbpbb7kv0d3oglicyopyzy5ta4yho5p1ac9lvt7qmbz56br3nf02i2senewds71ratp1d39eruqhv986qn',
                flowParty: '2t5cxtexstsvvo4crhbs5pbcsfw45vr14vxvf8msd6rihg01qm61giz4ww4ha46hdpghe5jcdnd6zzyp66xjgd9kmmsdl2viiubsq9zafht1scbbs8jn22b1iieu1qqetuhp294pfdf9u5ikfkfz1smvzbm2dz99',
                flowComponent: 'ewz3lnt0vgy87zee12kd9k2fjjva0hx93lcomr91kxvc5aa5l46dk8ney5qkxlj05x0z4x7430bnydlg01438cyxs8wkbqw9cw3exe08b00gyu8dql2cjd3mpmhe9sm9p4yl2cm4302wps5pd5sq7by6v6y5rspg',
                flowInterfaceName: '7vprz10g9gmo9nmckzgmf5g2fdsg73602y9dtdoqgi30fcdnydzy8l0i36moiout79brgkgamqu1ws2fb2j4dt5dwekx1zqam8srjj9ztrmtls6vok2md9of8tdb8m2mctt2ej4fhvujbvd2t3aoe3ykbk8sbju6',
                flowInterfaceNamespace: 'm8i86gnrn4szs9i4od9j117534bp42coi5hyrq8ouwzuyatr5uxn98t9kig87lquetsynx9o8ka4ghjgoiai4fsc9ew9ggvmzfx1tfw5l3u93b3mf4nxh33vxyjus9ulal9zotnclbgx6qmdschnosb81l97blux',
                parameterGroup: 'nmlm14vd3drfr6pmzj00zdautgqc1gbs6cxnp6d49wxephn1yx2wohz11ox2hqu21hc6m0lqid2ou9nz3e3srj2hy06eqvy1jikrsziku0c21dey3go2prvx1syysl1w7f3mwussjl6qfahq1cr6fojkfa65sazxol3qp7fgacjvwly9x0mz0qa1mb5a1tqh0e6t4afrusymy5l06csdaopfdj5nkww6o7y5m0sqa5ht8pmvvc9w7sbyo48bhea',
                name: 'r7izxawijm4u7br7qx1isthjjhv67k558aqpebm50v2ucnmqnillcifyfx2jzo8mq2jag2ql1l0p70x6jhwpbvj4l1g2a8fu05p1a018hbxyabtcr3qrf9xyjrixixcrfob9244jsef6prxy956o1rdw7oij5tnz997f8dljhpjifyt37nl7zygjek767a1fquqcetb0iizb98px3e9nffke0fhx4by4kjezo7un27kkr68kwnbtov0q0bc0720uu4xkmikk41cvrjt9lu760qacb8bevodf1fdyfgmlyu120eggize07iarxc7a301c',
                parameterName: 'pf05joh8wbkxqmcw2jdurly8dur847y5t7xjuo6nbjvp3mgh33guzfduii3wicneg6071gjwf4x0im9xesiqy4vp2zlytaunzjxbxdf06t99dlurea0fbaq9jqojoeh3cd6q8aetqmt76ho8luq7hflhl6s2ohjlv8i3iuw8l96u2hwtappo40aaulmafg4hnddbyq9snhbcq7is1prioth57czfxv0kj0jgrl5jgh0yfbksj3001h1ylol9cb6mtitbntfrxc2qm1bsa8tqllb41j3t8zro4wcm413nhlvbh7jitrxyn6ijy0ydzlcu',
                parameterValue: 'jkg4yp7516apfjgmyxc7b6k9674sl95osvs4kd80qoti710ypc74rs91hfra7uq12ge1ooc8ooo3pwoim22ep20kar7z3q5zwq7ok93t6was0ukco37jfab2f3kwazcxotf3cfedmahc1hrivrde6qkj5jszbzoft93l4fjbv6zj1oeufodpnj71lgeq47qcib6qg4lg1yezjdfnukxvac6mgbyqkt8q891se4pvdrgavm7kpoek5e9788873lbzpbkuhu63pl1kxxa6i119nuimyvuh99rm6t8ezwxhwuu53au0g4830wapjyb91y1ifh33zia9oew1vqz01mzy2xq3b3enea8adfx5up1p5lmbw7prqqugyzsf31foupp9qgperg9hnjaich5skrrqf8f9iyd8p4qi9qqkoli50pc4glz9w66iqdncz635zdr9fjq7j5runmo05xxw07pclpk0cwl56j7o72op0vdb3hq6hcinmgl0snwol9v5g99setynqi5xv70s747mdzzcarezhk2ylo2c67pma39vuex3xwucpnfioh1ocr3mpb76cbjo8xgg9t7lhkizxzpatemvivsnnqg04x0i5ir3er2sf4xw2nj2ying974s3s0ddaqx718jwjyzzt4o7z5057lcav73k5hdraaz287u3ganf5lo0j2lhaioavrvkhiw7h16ty9w44zv8l8azx4h6jhn5kwkmt9a0ropa0fw8f19hbmxea2jana4fpylc8qe6nbhvcwcogesic1orbbf8ewkicjeiwpic5fantf2km0hhcplo87n5jisvepcmnbutdgli585b3uu8uyqc7xjdh7uz9qvf9rkpsfxo7yo2y3ggipccyme3xzoovbz2j17a4rgssb2acz2b3hry4gylzde2qsxidzsj3kzrdnqncjd2pulec8wkp1ryf1etgnrap25w500mtopy6s4xb96oqek77ckdvcvrp1pttyxc614snpnosbrdpc4msavbw4j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '7y5jrdmffx05yy8u82ou',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'rpm4wq9zp0260lb8cd7o6oybsdcjqqy1ifsw6t2mma14512daak3zgrbpeuh1uxlaghfdz0bjsolrpii96uaq0uvcnvf6f9c4glks97w1c5yvms8x29o2yw6l98jydoaeuduxx6zvs61v2v3thrxm02swklaynaj',
                channelComponent: 'ovnafzpa1xnfsdvdleedc72wz2p13366bvde8javmgyypuhvlwuz6wc7y6itbgmxmfubqo7u40zt0yioj5wh0j7tyhl0burie6r07cqq9mqwbbtn5tn83vvh9k144qsl6amqtzhj7x7uplld15aifhjp88v38g1h',
                channelName: 'lh6uj3vv9f71gkl7ii0cpale2jihpw1n6nkkk74o1xkey615hddfny4ogm1ri7frmx5pudppx0i207scbtoli1fi7zim1mn5b5oofxotwuawsfk5kff1ii1bd0g05oczaihqfqzjjhny428jnpz3bv6u0a68uj5g',
                flowParty: 'sg2qge91k2zofmxoui3fwageejxl31k9pxtiykzwxols54ojga4zu0yhs3m4zkkstac5t1jfrqdb7l43j5b3hbgmsm7y6wkcfxb1xlrip4x45x3rv88xsr9er16tvcxwoy5xqmxoyv8kmhxnuwtyxrcvj0rd3xiav',
                flowComponent: 'ezxfilbt5g62r5lq7uz3bmk17nnj7gq5gdd2fgt8iy4vm3xwl0qmq6udof34ajwr505udbyb8ejus5ruyyd6avfum732eyd6r7y414bijh05yzhycreeelm67fe95sh9julhopt64nxwrbajevfqhhh9opdexz8l',
                flowInterfaceName: 'h36wtb3dqt74mfb4wqua02bacedcjjitxzb56acs6di02waome1nizfkwwmgwgjclb7o45m5oedva4d70lzihtrw2grcy9895wc4mpmtv1lqb0wxl12lqg4qmbn0t47p8x098fckadgh3p8c4r3s79dioit1yh3t',
                flowInterfaceNamespace: 'j1f4k9gw4wvx7thf0zj0zstf4je3l64272lh8nonzcaw5jylxec7sqwq1zdp9k9bneg3rry0pv7648iosq6ds8ym29cj32petqy1feaygjfbred0xnkas4cwpim8y0gsbrxr9molbhfgwbtrtx8b0ag6dcbcin4v',
                parameterGroup: 'jairq79tw456b7eg9b5lntj6b2idt5xnhnekcmuc3quuy9mlvmoskq2fl69dies49p8mfunvgf5xnxyn1owfiwok2gc23e7ubd7ps3yh6n6x08odlk8dxorzuwwzlun68ql0rwoo2ze05k82lzhbjx85jcfsvb4hnmw9qgq5hfmh4txl3316uukp986fj1uieggtduh6himoo33m27ckaudubz7jyx0xejkryi7xijtpud4qhs5kvvnftmmrnky',
                name: 'g6sdkagtk1kogwukbqse88e93mou9994s35ulkuw6a8x28w9i2224glwjn3r6885r8vsnadgnboiid1qbcibj8uwciu15xxevfc68rq7wzwz0wp6lekxkue1abfrptnwe3wvyzmqq7mj32qsivai1cr3r7q4cnjr8zgue0rnvl0tfwjbrbw5huqlgnf6jf9apj6dnla53wnrh274h7djaf0khgfcyqswg1b5z1uzuzis1ik62272jz6wgovlomppnho6m9wm6m7lg41yfuo9m1934pzt7xtwviw54xwbb2mxm3nrh3dxao2lyrbs2tja',
                parameterName: 'id5xp2ciyrn4o27y6j5fegt3fdh4ogvik8k995xf8rx8s7ieajf2a7ty4s65n44mg0s0n42u2rem2pufmtwn2sifaz5u7y1fticzldblnh95sdxb9yvjtggdxg5jbf1c89c3w1s2kygb029jeoysdavnwa73xb78u3zi1c6nqu6ecfeh4ytquro7mmf2qb8w8jjx1bbw3r37be3ozr5zejgtkmm9f4skvfhjiwm2d0jjvlklyljpsh2o4zjo8q1qvouut5r2yubyivi2x2rzyel3m3choc9joo0vjwhnl4gxkaftfa2lc0qxegz8ft92',
                parameterValue: 'q83mqd2ajyv4oqlubqnjpkg91a0w3gjrjke7hhhe5ynxmsgeoaad4ugdkc5j9a66y5ohpuubq8yskfh6ot6ut9jq9n236w0dc3mpbk7cnzy50irqwftmibbzi65coi359m94npawm7vqjjpj2oswdc2t12vl3a7kgn880u1zliheng9msgql71r87p3gwljvxmxqcqoag2u8n4lzr1w53slpsgdhufq5vb2rrmje1i4u2bcwmuac2n0hfdkukuyqu0eulzopwcc19cvzcoegm8db2kq6rp3vjc4ybt82v5gp7p74cggud8mi491eojfi5wcz0zpq3c4dqywg9p9hnafvlms66qha2jmqm5aa9lkw978sfg779kb66bj82wq2mtq2wovjazco5lf23dyrjh84e688l70hsd2kk7sd9ia7frp972yh35ch0rgzmmv92f6wco9zx30xqtq8ct5g1ikaaarif9gb7weldah0njiul8nlieeutzysya2g3x6tg2q9u2h49lcsiigkldy7nr7g79t1kg48jcto8tszcovuez2x4he3n89a8d3qcsqnexv7n3859o5xr3a054ekuspzbpbx8t1qo3fxpvcmcdvp29g8fdp67qiuzuiltvcspy4mh6cnk5ekobwllw9ue8a1ig5xwzow2w5br2zxm3nurdr5siss0mw79uvsenviyntxc22jt7t9fcd25mty3hmf7j26puz4su8m1qmkqi1480r5mmgjzoxa1l0d7tkp1hnmfz9w641szn3ylk3gvhcwid72gt1bqtws0vt8bmo4o9veiiqietvhgg7v4mydigq6gc2b3i4fab3yyaeefhm454e6zq8lzktzybehw32o4ale56c9zs7ht9b7frqzifho28semrrgobu5pb3utmazjdvj83sblyhqyguq1xtvugo6ybomruxyylfpr9r72yaf13ax58jweiewjgctuurawyyhf4v6biak7ohdpdqbft29x5atsih7j715a36d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '4a36ydazxu5lcaynlk7r',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'aokrqbt403rwqq39dq4zd0dcxwu1reahecjm83jbcufsiqxja7bz4wak5757bjgbc5vk5ubidshbnow2muchqvtni7pkoc1x6sne9opzid0g4olwzokxpo9mdzi5r91qrj338zhrf2hclg076ex446mrfflk15ns',
                channelComponent: '5a6c9wrh8hpet62gnk1el94sma4vczauid6fgr4r7m3ktz68r8u9ornasy7fslr7kztfwalncjs34hi8wgtn2uoantnhvpoq9xftui40zn0zqy25l368ynn4x5dielxvyxzpqy7esm95x87q43ofbie0opivv3as',
                channelName: 'urqrlorpo4bj9rpfysamxgraoro04diigukrb6ow1omjdsri6ceum32uhwmc641sjwbiej6zxebxqpnyc2qzby50xz9wzahg804ifgi18or6ubkt92iitso3pvij41s3vhfajka68sbwsw5k6dl26ui38najrohn',
                flowParty: 'suzfuth86ub3n9ehcaz9j4khbij7edbou3idi53u9gnm47ydqme4snmhp8fevs8eyvqia3ogr4czqjk24ufut5ui589go4jg8dv63rvr9ycwt8aky8hz6vajnmqjduq1yj66km3nu98ehao03hr7fhcdw5vmxxl9',
                flowComponent: '4mk9bvvv8ihe3nsyip73y4hpv94n5x2z2uop4vuj6qmaych2futve805lcry5yp5pffh1xek9223j5282mldcybltib58kbbzf1b1esdb3jvvvk507ky5bnpubxzfjmjz4c8prwytprlibxil6glvoyzwzwjmpp78',
                flowInterfaceName: 'vdtudr9i6j47qj7nud5vdvv6uqc2ir91pqq3i2d2deasd6upmjlk19svkag8vz22crcsom20xgi239x7km7m2xi0zowvt4varnpm1ktpdnvxiogc6wt7dzhfns4gl7sxppk157cu7w2segzrq2txhfycmbjsligx',
                flowInterfaceNamespace: 'c46456kt3lv88844zylcqu9gj1ki17w51mj1fgy3scuxu4mrpor3mgbvh84yc8kx4jn6posrqqe4y10iy2ia9g29dypdorkken30vzdka4p6hxohvb67uhyck6mouqocqyrnibx1tr8yzmnwxc11nsj9vnit6tjo',
                parameterGroup: 'tn6g90qo793gt9e3smabpg3g3azkdqh19luufpctwh1kfjvsbp6cxiijwqzzyxqzgqar89w6lgy4mytf0dhxnqujrsm08fafprgt2ifktgnt67sc8iq981pk4wyfu6elge4af2q69ww1nd1cyavkmgh93qqlj7pawddxi265aqf636f0pmsmw12q8njfqcwt46bb403hamwc5wxq8ho0xdfaqgiawbphhuqh98j3ibt4zwqd6wpyzilpnn8j9a7',
                name: 'q3mqwy6nifx5x9femwa9y6931q627pr5raxgx755m1v6j9z27uu4fp4ijjnm915nh4kcdss4htw12t1jado3kbjg3ckpa3ya1mrnwfgl5monurosi5ixvtmonmxa0hxbm6egzxdzhrz28c7su8dxemg1jcrv4sy53vb1hsjxza6g9jadehafmnscty2wkvi8cfoyvd4fttejs8e2q53407zm6sgzx8h2423hig13pfsvshf3655g40srhfi2ndgvrbu0zgi2g6ke73wq796hykaxx4c2rylhqn9yxvxt3kacw0snaoz3j3zvqkotsc6g',
                parameterName: 'fsz2mtyvv5ngd5m9mzjns1cx3z9v7e73k0thkbi48m6y4ckq4unugrjf0pwy848sp5eoi71597kwd4pb0i20ncgjzsh66q24t0617i8nmzrkor910v5199r8w2jrvok3tcgzmepodnz8stjookdiovuhmt1i7vx9qd6mjwat836ewsp2m5fy72wpg2xmzod65ujjdditun4yawpocsdf64ruztss10m309j5hcvjz9lzzbdeytq3b8jxrcekeoe09xzdpufrdcr3s85n72ljnmzinz9rp04yinttu27n7ez1qlbsfp9vsfuyniaobp5u',
                parameterValue: '1v05eoa6cehzi3hhghze59vo6gkb8yp6flb2js1hajym8uhyh4ld3gna6jwj19x6w06m2gob55pta7mzvscsrvrlmzoppbu2u6azfz7zkgfhvhrjcv974o2h82z81osv2nl2mho0y6woda6zs2n8dmxc04qbypsf4mnshx7z11b2q1u6e06vnb9zgxw4i9iuwe7bu4i6ui3qygpfz57wgcc10oo5viok0nq3j35oig7pzzlyaiq2sy5rp2wf8l7nj9wednbiqkwq49en2oya7e0nwyo9hykki5ktl6oix81lfpvqywcqsi98eum3mgttiy7bkrqwmsjger0n0iilu55lcoeehf9py4u414bmg81mvtozgbf96wazujwhbyc7kw1l5uw25gum9pji89g2elpzpbrat0ps4q8e04jyfxyoncckzmgewssjpoh1zi1jsm1va4ddrnmx8r1wf5cegadz7ihi41d19vju6bsh4a1ugyzchfn7gi7twgt8s7ri8s918593t1kyby23p1lx2b60y6j3zkoefz611msvym2bs9fl35z3nfgdq3b2dlii4yusu869q0jedhbh1wmp6zqr8rot45oin4w14xavib5v2v7ujv85l3p65bdy9savcjrfcnalwif5aku3ygkivrbti5o9y7bifowjva1i1y2cmuk6x112r41cv2fl6m7atrpfldcr2t3daialw3yrl9oqvoejz60jer2fqg814c1205ob1vey7w736s1cuwfmqajz2gotbcmzbos5nhui4cabcm2net7oarjbqa5igzo8jsu8yhg7z10jpmg1g21ybrbckd4pnjyac4c4tv3aunun3wbbsaqn2htmabmnklgea19napuw6hww89ixa9uy97f6mgkdbut90riqaai9wu5jxt09onwzsbk7qnqkiaxojqq8om0mwo7az5frvlxf6s3zglkgxsjcd2jswc58uen3en17adj62djoo14yg5epszdjviiw1wmuvkqzrmzz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'rq1w34udgd8dp2ti0c20',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'efemsbrpshf7onwggw0n857e7c0vro37gfr0varaazpl60g1aungm1uvyx7mi91f89n9v59b4e1e1krg5iqct53rzt9nhuuos8t0vp19yiwe1nctkymdtknmizyzl6jwxdupsucwlvud88ja7k1wd7gmx46qpaud',
                channelComponent: 'xa9x7r4yak22yra4guph4uxea58an8r1lyhajzbm3wvq27lq9yr3ijtbjetka1wvu6nd449ezivc4f4g28l7a1cnjvacpd1u36ssjmo3w00fy3rl2ogb5d9c7taus9rjrpj0ttim2xjaompf8x5dvmjtwa0zwwbv',
                channelName: 'uvejgg0n61bko0byyfkybtnvz19jh3umgapx7hegmszcy30zgzlgm5bfwlyif8k85jbnbsnw5uo8q9cf8rslxy8m6cawq2a5u8dw4jl5eqitimdpehctilvxmnkpsnnxfr8ie6ts0vmmn3udvwfeb2tik0l3zoz9',
                flowParty: 'tp6483fbwddy1pqyf77fzxl6hwpqubo1ya1zpey48zl45wiv1i873av4e2jqax39bm7qsh9yxo21xqu62rgvgher42aj6xubh30eae2th1d82uyej9lwjusznwhp8tk7bnw6uohe11jm0n8nnd0d96mt4lha2bi0',
                flowComponent: 'qv1wxhnik4if676cvw2vg1avw7y5xeyfrucn657t3kg87a49s1pfqjkg2tiojtjtt1j2aigybzy399lyamj65h28bm46wjnumfunceqh6l9siduvrhgpsaug3y40koup0vg1hobvy5try7csvd3kugkx7uvae35x',
                flowInterfaceName: 'rt7dcbpwr67qugpptg5ghayqm10woafy5zooilkyuaftas3d8zy4mdp070ig1heuh2ggyj3qyuahffa616xetgdu6f6p8tgo52jeaqakfc8ygmupg1ykceijy65lcv3fc95k6veckecn89fw52m5cmm2byourbwex',
                flowInterfaceNamespace: 'oconmvfcotx0he4ftxitnddlmxsobtnwqx86gyn4g7g1rx4omsu2hwo71is91p7v5gwui0woegqs299w2q3zjgkx7ps1jouadcu6doi5y0gnwjzqib78mtj1qf12yzghwdcq3rixqo9iuoefri3u436maizq8l37',
                parameterGroup: 'xukhwensswefb45qg0cty7onipwffbt4xbdjoz6lde26to3vzdax30vn71ocux7vgdtmgcrarabk4u1mk0m9tdtn2njilvlt0e89rf4cld6l89jznpqud80bksz183yyy4afrgphymzfovvmf7padnrlo45b7hdvazdcz8mg5tsyo2yacbw35k3z29xt2czqjwx9xzbt96rx9340hbbe5h1dskyrcprpbg0jsow6iyfhpwlye4xdywvhjnvmwdu',
                name: 'crvsvvs5t8vmwuql22f6ghejooqol2xvi9hrg8zbgww47ps3kqdc7ucvslxowqze56gxy1b716az1exy0nb0hwysizpki3xr0o5s3seyjcsd22vrqjlv0bksty6fhehpo6aoqa9wj40rlaij126p3g9syu0lxpu3pwl13fwf9adrctjieheo5aoey34hkfj333svn6ovht22ludn7u5oj1u6sgddebmv7yiojo3pvom61kae666tu2okoe9ah23h6n429z619udh1pae6usl552rofehrqh7tg913kftn7nkwjwqwk1ac3rmi22d6wbo',
                parameterName: '6vtjeqgysf8ybv9i1bwvcuyd0ypjubeosv3cyazslp1y2l1bpk1326w8mbk0djkogpnnh6a9bzol8r551ddgr48802lbkgff2yrlpeol00oau3pnbaji2e4nycjbujtddo3wzjdtaekw9bazbwsdh04o7glfi0ldqxdq5cmb44wio26dzxhe7sdc49yek9mgwx43s2rrfh31zpv6sqre70ubxkwz9z3onq24klm9t4oxzb41iq3si9yb2pnaaau9pkp7qzqvb6xeekwkhas09drvw17z2zaewmsxf3lqniq4p4wz4tj78tds16b59pas',
                parameterValue: '5nul2j4ca66npi4an6fr6le69o3el2clg5fbiwuqmjtb3xo2lw7pek9ije3bnvgr4pgfmav9b69p4s8ztb4jv9ygrbqnj0tpuoudvt3u32qlk03dqtwx6jvu37ryqvi86l2dmhhkg3hk535tlx9ukawq6s1pznwqk6rkke6arxlodxwbh6qpzlhqie4jg2mkssbgf75fms6f48fnl7r5f49g42zbqaany6zj1sq2u062b99epo45jx7uy5ppcffb5q4fzstgv2x7mk0y1fhayrwqj00vv5lec7hkjvx1ami3g0tt0jxlysw7xf8f4es05gmv7yxkb10j4k7g8m93cm67rdpxmesmn8cz7h57lfd2y7p79jxnviw97aemrqe137d9bd2pwg9vsuuixylmqdmnmzoor1jnxkeuag6k0vy9ftudr2d0zbx22q6ysml0im4zzieiqstixcqlfkoc736vy3hww7c7qxfmf6zopoyfkfhb9qwvs9xq2q2kk68napa265avbn5nqbciqsjhuvjt7oqjawfjfeyb5brwybt0cv7ed5grdkgw6ren8d91d3nbkbb627zpwuvzbrcpgrqioprbu8f04adaa46dl3378gdnkrtksudpra1hzmz3clxdda6gsloc4bpn69cgvhmlr6vbppz493zq516z4zoapp7m00h641txzdpo9o1q07bderlf3na4fk4ui1ydwj90rju8s6v1vo1uvh5xbcp1dcatdlkyndr5zuga64ly9ywn639ge9mjjfcgmuvzblwrtxc2mshgkl4u4s44mavaetatqyokr8sncs4xpm29f7nwj47bq4qqskyziyd5q4id0472o7ckt8eg5xzhby6ih7io8co6q7fy967z00uql4smwu1j9exyrf3abab6tz7niyzpbxqy5ad6qpis5o3hqgd0e3gq8km8o4hegv8cjkz985qqwsqtuwq280hg1gsztr6cwokx16oui5k0s47ip5nm3hlnad8cjf5nug2z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'hfotu55vtzz4kfxph63z',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'kqdqob4kj0vpof9jum9i31s9imbd4oo3hru1rduomxyxqlgy104ki49vkslhogfrrbjhaaatxufnlod806q769lpoca2b2r2zj2ndh7o1dm8h5qcc3b4orkt6u69jgi3sum9d2duenwcazlzlcpl93jfgqkymyyi',
                channelComponent: 'ychq5e9wq4ezrnplzwenn9brg5dgyine3opcnpl3gvktge493icajk6xy2jmnihhob3em5i9x5838bygayi2w6lh4i2i1dtlksqj3y00qlob63wst2d4znrz0bsz01qr05t2bplr0lunnl8sznyhas7rc0ktaj7g',
                channelName: 'gtjifzfo1gpg203m5v9r4l7k09rzc3w2vskt470weenrx9ugjox0gj8z7im2fuo9mk3eeivdw6ighepnq05ryszvn0gd8zklkayjkeh0p9xsxctdwis72qqd3le4opwq0hoesf55pc08g49nqqqcsbwh8c5o4bwq',
                flowParty: 'wb6ncvpqvcp1tevwx3kprhiip82vxei5yvzf32copt7wf6q89at8uw0ns9dqttxjyl10jdtmncdek48flt3vmhvdc6jjsy5cxjy3c7oi328vku8828jobdip51w841wbfrao4fm1hgah3m721vtliy5yd8ucud2z',
                flowComponent: 'z063dwz74sj75ckc9a8k9kcutme6axfy9lgs1bayturqx8ue7edg3v55j6s3y1h5vy9b0n7r8eks2m3nbyids6yzlj8trolwboyafiepnfntmggfft7iios9kqkw0a9g5zgmgm35ssf6etwma1xtpenj1qmbi6uy',
                flowInterfaceName: 'uyeomanib1fbxyzl93ppwoosmcee767zxusx6xn84ieceox1w1dtiusdftb7lnvoeq0311eqp4vepbzp3se265xfvafd6v0uzcnv29pewg79tj0cjr3jotwn6prpke3vkqdx9toaxdssd1papt8otu1dneh4ahgp',
                flowInterfaceNamespace: 'rquia7ud02zntstx9rpbtxrtf73d8p1fup03tt8rd56y427c0aqnp3oz9fqkshhae3yr6wda22cpcxzoa6b3cxy7dhcpd03h9q6a16q3bug3d4eakw2h8mp84kjr7l02n3xzo74izl04shrazwzdu9oy4cqkgatk8',
                parameterGroup: 'ctpmjrvwc07nrk45t3jrh0v8hso8mm0ztnvj7hv1n4fk8c7l5pk5wgxax3ks6ftl75m2eml8u13v578y0xvjspl0k49y9fypj3juz87isv5ozgdoghnajfj7337qqprc6lasp7n68w9dof077o21fyx7c1sm9z6pfvef6twwuxbx7viy0yknt9egzv74bwvgp413qdge6fwbwj1dbxauzf17gefbjqa143rrefzzgtalml3j4fxthvavapee2he',
                name: 'lehr4rmzcqc234p1wfo9jo7u0vkt05vhjha7o7zdofcxx16xwi2yqnw8ce9fe4wynmtt6znv1dnuxmte04pe5mic4tham4479x2h20s11um2rva7n84nrinbaatt1mrsg9b759vf99twkjlqjt81lrd2w5lvalh2zis8n4vi6aa5es3npriztamtdfgyd6pxrwviia74v4ju6u9k2z07fydnf6vv4v0awm6sgzb17tis9k5el7b7ulw0n6fmaqkda8qk7layig2awz0fn1w68rbsecfaeli6xbfjwi3f2a6wo6qrcsy1rrhw43f6y28l',
                parameterName: 'k94b8bxhhunfl5evrqriuzswcp4oesfecyu6c82fgsp38jeng86n6pd7k84n89xl1740aek2c0yp1jnfp3gk42l6iu9qs1wuvqoh8tapx53j2w2x105o9l79fqzeaam0f3b62k0b45lo38upjtqd9dec71zz05frjkue50oohjf6bi84k6m7vyi5jwdsemurp68xq4k0l348uvit8lnvy6z5ncgd0a4br6kmlmw930igj923oxz67nmxrygc82v15mv2jjcszomat00luxun1wi49vys88eys861h0k3afr4qid7uysosjgmu4ojvsjy',
                parameterValue: 'rbs65jn8fl1ugsq38itallbi5107chjle3mewi86eb6fryyavzyk22wuugg8g7l43jl16n2w6phun11uckj7yxlsfny340dgidae3af8mkc8qmjxpejin1vwjcp3yku574dxmr67i8snxa7n7ln5rob1znbck8er5aw4wkt64oo37oumvoleq1i9cipy00wjrt5slydivpn1t1geiaxg9ilfgbyn5sgu2bnksf2pzv6c61f87566oy7gggqojp6gb2e1e59d0qjq1vy92fzt8xrt70iq9hj8p7shigmxrkcij1j5kexkf580bltltk0yklf0tpwu5fkxoe69p92yz5ni8a0jqnc9kgxugr7glbkatak3rfcvq8ooowor1f74db3ybdl38eqr623zfitdkqi1xa38i5ncbac2c9tk9kdom0bvjl32vqgumvbpks8pocds5j1kihlrio3cyrilgg24o3z6j474p400v98jav7hug6pteih9ibqlq4ccvj8v1hjiehqjyjbxlthbwz61e2b2m0gyz6turt40emupnuiit57o67vexnlfk4iy83fmephgkw38phxuqckhexqcsavx6tcbhlus17gxahmda9or7fbwpqi5iqsmhlttkcwka7m039lg2puywd2qn66pth5uiqhhy04aso6fvjt9zo5mbybnu8x5fbr8uj8s677z3awoqm3tu81w6aps0o7es63yo596v3pe040dsyy3pbhiktpvngqro0u5fibv81z3pq9y4db045a64cz2epedqmpf74j8eag5xz4zvflp3869xxgyz8nu2wv3won92rzpsnvu5yw1q2s304o8g1epkytbfjcjxqzkc3zlncx0bs9kvavc4eydv50jcmv55gr30vpnn4b4ar5gsdcspgw5w9tvemye0bwh9jupz1uip11b6v3lkgbj80ki327d5ixd75ei4p4ewvscooiqyqec1or7q9mel9zl87cg5663jjtgf590ipzalvceiwv1jxb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '9xenkhpxuipi3bii0zec',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'ym3hm9l6ra0ivpv0i25nzf2zgcc15vnou0jbj59nbck60ot3j7b6noemn5yz16sg3e0c21abfrf106t2hdqm4x83h2vm7ogudhbxtpz2sfg084pxmvqzdloseurwjw1hgkhmm7x6n4etikwi02qzixdnodcxmt0g',
                channelComponent: 'xmvyx9bxw919dvxl0s9y3287dsayk3md0wu8wh0q7qel9zr1ef54nfggdk9ip1ibtvgujj9l31xn9gfek8w6jdhglco0f0n3r76izrtrj4jyk18tt8anqets709xmw6e3nn9z46h97dd1w5mz9orctkmnkxpddl7',
                channelName: '16v6cxvymnjpbsy33dh0qku89uwtetuubnq8rfjranakbapqly9gzleqiqmnh0bxkxbegctvt6xqtpazh0sd9mhzxntt7wfxqi9lm7b9q07kv0nwmr2va6wj6kn3j8t9kqnobely7sa6f1e7tcpsjolwxpmb7v7b',
                flowParty: 'zorlk4v3ichnb9no43n5nvurlcdqspe10jlbq4z4pyugjc8v83pvfrf8r064gtt1cx6f1ddrlnei6l4o6cqyai9wzs8l894vcgk40d24u5bbc6t5vowv24ellj3w4n5x1amvfen270b21jm5e8d18eggpg04o8s0',
                flowComponent: 'fy3pnwus1p4d4w4bz5qt6g7f5ysrbn9odztweokyj6gmznkkjdqzvusa767d5aaz7zwnqtdu4kdeb0n5hlatdlmmzn1avtoyqgyklfaqwf8r6big2o615057idhnsu3djgdtts5o3ktwtlmcsn30fgohdjnfpcmk',
                flowInterfaceName: 'tf3nfrf15rsq8zr5ugea39rtu5umpusuqabfjpkrbyk6tr18i2k1hj23g2olbqmu8qrhpvtpxe190cyk5k3wmv2cnf31vqelk1j3wakitx7b9i0y7kotkr1ul1a28o6befzw9515bmwrxifq5tg3rh8t99xcs16p',
                flowInterfaceNamespace: 's5zkhbbms4n881jk2hjtwobeja1rgvkig1hhnuilju7b2b0lo6ie1q076phe63solyt8jh6lss8adwccvmgme6v7uh63d6jixacpbnjvrmv146t3w2c1lk85f40zou5v6duxhl1nqdgc7mt4kv6gc6a4xx09b859',
                parameterGroup: 'zliuorxigmwu80uoias2vgcug1p4njvny4tyua0z3a1osa7dxult4y3qjv3p4dhg4kcbcx8fb2cwmf3u9oi7xf08e1spz92n0ybv888urq3en2kkqx2i3x8brbyl3e8ebwfgb4hfekbz3daagdjnogop5jmnoj4o6b30dehpz5i56yf04llta4jh4wx2e8x2bzfu2ioeztrd1eq37ev9pn6pktopi2jklstfip9lk8nnyqn2rx8ome0tbk2lbwiy',
                name: 'r4pu7erm6ng5mtemty8vocmai9q8t9xbqz9uy7fgfzeu1cy3zh8e7aptmi8odc3ur0371q3luva6ybna0ms7vgtwvx6v195qv1cotngpw7682luzbavnqi80a7co89h1a6aa66noimcz27wzfk26cbefcehoh4xaxqqeyfy7wi0tjqbkj0pcavaf4niyn6sovqz2jrr9m8js7nxtxuywka1cmyu6uffj3p44febwm4tj77e2jmpnug1nuvrh75wnpniw80pfdiqkce9eg7fyo7edgvmleeu0m8piztaz0se6o1sy7cy3y4qxdfbylkvl',
                parameterName: 'ds7dx4gq5gpnwsj3rvpr3bug65aj17hyiq0cpt0gbf1jiy6l0kenmxizo1d7hcm5wc7hds65ggx1rplk8rt0gwrxajfp0b4zn05skjw9gn407vusk7zwuhr10c2wzoc8aad51o988n2f1ou228ugjfrbwhl063puekgtbaqt8c13d77ypnnejwvzz5tqguvzryrcblr026b52m9c734xymbu3qg0u3p2hmp51p4gu7ggtzf0g7nptvu5xvo8prn9r8q22828qfvqfdwoidwhl9sxp9nyjok0ameiy8hmig0vxmvps33m8144ej65qnfw',
                parameterValue: '0lx54hr1zqoba3g1rnc4kngauezdsu3tat62yownpgeh6jdvij9cw95gf2aobio62d2icl7v150mwukh4w6q1u4cmxzzmskj498onglu0uvqjl5yw0vbdqhwot8q09m6ak4d4izkr6hnc7e069a0wjd72endpdb0vnznv054ul19nuaug9ah11mej4dpn5305sf9n7kwzbjo2u8z30b9ao2fqptkvy1setbzo5c6b7ylg6trdlkvt1423fllwlzlfyhyupmq99la1t8pstuf4u9khumnbs1w1fchc1vdk70yanfrkpnla8b0lvi6gg3dpnuvsjcvi1a2dc0ns90nyqmxkufkzv5goudg8nr5qqx1bji7iclut5j9gjdpmtxl2y39rjwvx1fd4pp94wjnnajffdfigo9uek4euw9awco2nma8fss3mzfwe9azr3n9mlr4e17szss7xy42btrvjyz2wt2ftb5v5eb0bbo9b0yrnxsju52fv0en96ma1c3zpycdvjdguka85tfrpiilcbi3fzesfr2ak3gihq0tpbu9zj0u1g66mdgwrrwkfzct90xoye47b5hh9qc0gfbix5refjwouk8gxnacg28t9h7kettlyxgmgsze9i4ambobfi8a6ypcz667tx83rhb1cepyveznk58x942bnurvkmqbcprsjoc60hbnh3ummkzt9mqoy92d5x5mgxgemlovoyz0fjpsipanptqwc354pkzxbnzlex2jayuwehqw5dp6ppf4k8ujzj9tuuwasuvm5mju1ds4ltj4rk50ywe2uvq900pmxdlmtxj0w49hrh9f3d0q77eeglazq0182gmf73h52j82huelm2qlfj9h35camvmtpqckeep718p2eufn9gkyu3nv68oxhw4jb2za9edctyu0n6ntfcnmebh91mgr9lwq193t8inh966n41zcz7c5oberom2653kloy42gfhra21bqwsu6mzt8u1tg92lovu1nuijnfj4ohchw630',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'f8uygjax1njrivq0mi79',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: '2yp9u5conjrs8acbffk4auk6cb1ta3x5leibs0y1h9x53ru2p1auqnmpx8fg7u9uockx79cu161q4vxx2xgvv4z37lxthb9ihynqjg5gchuiy55g3m779b9y4kbbrv1oib14isbk7z4569lqee09789n2r404jw2',
                channelComponent: 'qsaph37h14vcv9hgx0ngffeinqtimcgzhzt0wq6x4yy7fpacubd0g9bpro94lu9rt587rtjwie0cc8a8olr43bbw1zfp8534o4rynaiinscdmgq6lx739y517yksnrvhm49sg9vypwiwgxc8jlfhv8jrjooz419p',
                channelName: 'x5s1ibxh9x0cbag1bjc5mbl24kccdr6d5gx223qejvhemnzksse63h8zw2muwixa6556txadhch966gjf5xikfcyzfvz4cso0tirlawab6u8yokb4dgntunpxmgtjeo2zel92ffs8zq9r2csxblrij968c6k4c4w',
                flowParty: 'lpqwsz89p4z5d06cdoz98r3tkw8in0h7mhosho633pm0o9qv1r3598yblxm023p66gpu6ab2m291wnguktvye7icvosvixhtij76bi97kmidw2vvo50t4g4k9th1fiterb8haiwm3vpkh5kcdeyi3q0fpixe1atm',
                flowComponent: 'h3ky03c2ve6ndea1des95e5eod65a2ul0ibq7em8i0z1z5350dtjbyex8ifvbz21o3tkmq0trsbmqrzny82rxx32h4bcx2ipeeisxk00sl5bx845x39vfblgmec5cjbvslejue774r6a4etqmfh0a1r84yok775q',
                flowInterfaceName: 'qmhfak2dfkc90lwq9widy9urbeo0w97e2z136nua33qrikl8aehnte2sdg1upafw04i2abtg5f3thk70hjnphf51wi8avb6xnh4muy3owab1ovqi5du31cvb308r8rh12mqmeylpx7uo2yrldcio7qyo1qepf4ff',
                flowInterfaceNamespace: '9r24gwtt929tz49256x7l00n3uems5faf2shp614iutcw8v7t70stne2hy3ag5a15hxk17323d0z02s3dbkm5ox5t8b921uq70ldaz9r4iakxufdrrg03juyxiinbtk1uu0hfmd7gak2cco6kgshpw5s18ty16y2',
                parameterGroup: '9jx0d6hwuo9lyaqce65pn0tfvzlg79fe5x700l6frvytd7ix4p8gz3b35tozhxip0tztvpcxxuzagf0mbs429b3erloaazo582oxraksn3t4xn90bl3yfc0abwho312w10sl9e1fy40p7s7pxac7pgnie5usc1nyub7x0ehgfux902ja7du4gh2lxk5azwstns8hje3smrwzoh28lg8t2n9w9pzy63qumi47yk50ro3snxnxxkgj2336e5ejzra',
                name: 'rcfkoy8t26mfb83zakglnh1u6jcaq6czrozsl1bk6m394k1f7oncyl0ylj7c0wag7pjq0d7ayfdt0potmphvumw3x75lacqz7y7skf79gsdkti2420kqg8hsp27ejmlg11tks2p9w26svfta3fihd6gv8vbf5xej3xsru5q7lxoma2l12hayupubj9mgwev2e7m5yr9hh0wkfydu0pv0i8gg7sxbockziunen5m66pq8yhlrgm0yaw2us2jp1cy8nc6piencglxp1e8eh4imzkcfo9vuzgbtlyufqeq48x5fm5mu3eh4slvetj9slj6ly',
                parameterName: 'rxdnrerc45h0o9rk0v20qqy3u0tzlyg0bg58wxo1d6ys7ilxsiyvdd6rj071g5qr66cewqdueeev5stpd68qtvcdwo80qb1gnkhsf1b91yed58dfb17whfpgadvn89do961k7jxtswruwkxys7z775m86y6jttbih1j5ach8w5wwt1ps5yb2talpn5ki4g13wudqivjnamyy4espoif3p75uybg2s0d8opkrj6wrndkkgzgdtpcv97zd4xtatjcpj6ch8aw7tega2cyicrwo20xmtwo3txu9ypjtbtt14edn27tewn0qfm9pp9qpc5nt',
                parameterValue: 'l4xabgkql1iltkvpoaab1080gck9lamba85eiwqfr2gwqgi3so233rg52qdn04btciqx46es10etvkdwo8y07exf7dac66fgteaizalc96dhw7zt5wobwhfaz9t47sz1g10i1jzytjnm5mkp7dzvxmajfiw38n3v08phnc99x42cbtqzsjvmh5ukzteaqcbs83qhxyeid1p6enn9221143tiedo6jcqv8csfspy1lgh5z8p1y1pzsv7bsjd8bl7z8fhr64lljo4rrzmpzvva0de5j0fjlgep6qn1jvw3gfkh5fhp15pnfe38oqi69tl21k3xze6w2v0g14usl6foh11pu7ujw1l4dte38m1rf2a4s8vn57xjg7i5r7ndhlj4r40qziy0jw52bfudbf2vj03hgpwk2xa2olucjmfc699skehzji9fy89lo70r89jhpwc5cenvrlwmaztnxgck94ycnxvxugwldlzwmzcvdfmrygms69k2bu009wwlyq65upmtwrnys5b1e0k3uka8e50vpw28tu18715fi3gd5xz9w2b7zv6bzyjqjqwnlbyac589fd5covsy049hs5la5u2qraope82h1pra0km3w4boan1bv9a1p2nsmdlm6y3ebjlusyej3cpvf8c0ydj9ytaqy21wksfwnra02k7dfqrt43w3smf7j1whlg4lo1q0vixk4qz7lchwhagc3n9i38fxvv4x2yghpc7cj4qwq9y67lhegx5e0iol6bm9897e1ojh0ft1qbugygknf74suojtz4487sx8fea82ksyvs0wvrmanbbtajzhi10ccfuxxtd6saqaosyfh13xglteo7s99p1j2g8pucsa2elt8ha5zg3znprylt9cefwwnjvzdo2ixg7wc0fu09yihhb9h4134d34oa5i1ec7qa4q7gc2byu41z0sqn6fg6245b25olawfy2rwjwkc2zc2poe6ofybuz9wkccdzazodu4k1ud9ig0or5d50blcudbcsby',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'jkfq3jx8vsxvp2ttql2m',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: '8zl1lkl526llejwhhhj6qrndt0mqs1058nochq009bjesx2jse1qr531n4fxf9c10oifv40h5tl6o95zu6tnndtgvl4khtgmxghsg96l2rhk5of2olluq4eixav0c7k26qctmjecrewx3toqemjbk0bmp0tpltwa',
                channelComponent: 'n962f6bisba4uefrxfj9yyeq5hdrnxnr43sqkddewdhjxcnj7jfrrss9ty19tzdiq3vlhm0ucl90te0dl65zt6sgzfgavxh4cf3p81qwxwc7ph3c7szvz2lftx1ti802plinpgdl24ienqq7ophqv5rko5xlormr',
                channelName: 'dq4gxxn0avrg4cnkswx7qgbuux4gidxfg4xhn0fjf4kpue52383ujicg4o391xz5jl9t2pe2o4nl6blyrhp35osp6n8cxsovrq0izqqpt33zh3y45gj4qjo4uum0hbbz725zypkl600vod5s2txvh8a49goyy8p3',
                flowParty: 'azkxsewhx4or0z5koplck6ne8j0zmto7mubcgdmq1tjj8e660f3xv6u7i5qge1ttlx2fzwbi1n9pq8unw5698aczcmdrjg2mira2opanhhgwb1ix38g03kqtuwp78x318whei2jd6l6h3rkqgmb235jbnxpcym10',
                flowComponent: 'gkf4tgm1t72egi5i2nxldi6k5tuy2erwx76z7s2rpcsikr6usai0br54v1n7vkd3ai0sqh9e2s73kmssfzd4iyy5c18znx4vw4m8ozj5i1iv0zh35ha5rw5gzz3w6qqziu5p1c0gpr3qvfje5lpksqhyiiu8a6jf',
                flowInterfaceName: 'lgom0ejvj7x2yjztslyq4uqed94ehj91dbphpdui4mpjzxvye7hh6x5xp5d8w19nvqd2zih9nifyg8kaov5lwaujrhtq6jmzps5xi8a7z4ra2hmt7cgwn5o0vwmt7dpb502qtpcwz3d3g7odbqc3nx9pr5zm8xzn',
                flowInterfaceNamespace: 'uwnjurwgukcr8swr53dn5c7t1zm054129er83wcw509zp6nzmt4tw126kgm4o41q7f713c6b8i332q4jvcbf52g22gt1h0x6f3zsdzu1g17ddf6llqh1bdyetk5suygl8q33mgmutwb3fdy5s1t4q444cwyw6lrx',
                parameterGroup: 'h4wu4a3wqlxuq8ygyfap9mrwugw4hwx9ypu5w4ap00h2z4d4pdya5x9kbgttem15g4cig2p8a2d75k27u0tuiyzd5v0iai6usu3pofl5r6y9l1g2m69i1nknfdlai3nxakyvrv1claxqkf9i2e2yddpcd7y6hr0fl0b33w4aw8mmnag0hg97usirspqh5fttnarh59pxj9qxvy4nnaf55unrtghp0iphnte6q9wnfytxvq2scgb38h7cgyg8a4r',
                name: 'acqw8gt2iuvndk3kh4yd1mgkyobwzm1ooh3cnd2htahxeu93njzmuveay1oedshi58o9ijujhjpbrvxorwv7m0ufyazcz51z2xnklj3dn9q1os29jmexp6a8pacvacq4ku60hr8yd783y3492dquavznhn9kohslls6iyjh237ffmuf87m88am68u58bvj5oih58uu7sd6pu8jh2aoc6awp5ldlstncik70pl0j3o5dk6ljx474icneuydu36su5wvc1fbkcxkk232fa1rbzmb62e42mawagjaah22uep4dakl1f84soddqizw5297yc',
                parameterName: '49q3tq01t1ze0kal9iaujlvh6lj7ckkwqd32a7imev1n39pw0nbg19lqw1fwp0hpz5q2jp63fno4ve54vvimfs3k28ygj0ihlstdijjkcrjjkt56p49rwc1w369yne3frjc9tdb7ql7ki07h25ih7do8d51y91n5islt7h7f9r2ph2jkvn8t05qxt3zc7scuofp7weozh7vp9t4hwaup61g2z4mbelpg9ooccn2iy68ba46iz9ihjk7vvg98jww2f0lpcmuoq50u7qszat6fs0gswcsaecjoj4tfw0k04jwmnpvf3fnd0m27bypafuj4p',
                parameterValue: 'lw5gh63q7cn22ljugz3zb52rsgkax54chrma73ob60szggyi9n1gsax3l8gedspseifwts35079zm6qisblfmu3ztac7k8v09k83hc2eoxxsgpm7nzlvmt74mzqdeprzllt2rx4fv8do6yf3fra1gg96czarpa4riob2231a1w4so6qy21x4qpxe0x0ih5g6upooq7xu98so3xylvkc65qz1hpl03wwgwd88flic8ws50h6fw8wojwu6r56j2enr2m91posytgcmnhjfjeb4p4ip1aocrlvqz7b5an6sqa8ojn575anfy9yd2wuce7thjrk2rttn9w8wt5gwi38v63ljlk06w880xptu52l3h9p2y9u5s1yhw0l5q8ao2t3ys8e941gqxrpikt77jhdcpylrfj5ldek216ctqp5fg3jxwm8ly1iq5ctxjpz2xzy92npiet6bzzll7in4kk50bd1utim3wurlvfwqqhe2d5ops9rsn6ve4hkla4rtnx1ep0vsrh3c61dc0l721m26iant6sth2d9tybqkobbhxh5wshmervrzrzkn2yme3gmj8v6fye6suezx6tg9la169w36j7xkm15c06gmhs59e83qz7penx4m5j90ju8yvagwbug0vdouc2hkjdk25v8xufduj4nuag2xa8y1ru3enizkros58i9reokxg5fwn1y1kzgnbtkkw3s40x9q6nf6au149rufa7h23ug2p8ccjsw52yjfu8wzi7hm7tug9dbhhxup2kpgph30i9paib6g3h5birgk4d0m3ao2irdyi28fpq0tdqu91ron1u520fzc2804cqcroeha95r3v2tmpl6anj9nmp8s48d96c4kuxoz3et3r99qj7gvqrj4t1npuji96iprnbfuf6b9knmw98j6wv6s2qn7hk5i28j5h900bu3s5jgorcb66u1tckqjkgxal7jof7o61cgj23vsdza54ry5oeawsrn9rlvwfgjtn1gvvz3qozo34ks8vccf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'y8iwentn9puy0zq9dtez',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'sg6eb4ln5tvphc2jxil1ib3zm2i23k9rnaqtwnddk6ksakgtt3i9ui9uavybkvd7otk8as6lkdtvk084y1zwkc216voqxucy192ffzo3bsj5t2rvogdgqikpv7xzs1n0hxmf8jj7cgto6eq37teo3v7wco4mrbuv',
                channelComponent: 'qk40jr0rdehy4hz8djh59rodgn0xgemito1jhchedk5ykwu1lxo0vkektpvgyxf56jvonp6m9n0sia8fl020utvsdvmwxckczy32uk6fjl72p6cjv6kiq2038le4y1d45vybunhx4t97g8tbmq59h1r0wfhfmmny',
                channelName: 'jm5r7lg7absuok0opfwcb6mfznbtvxcwtcydhdwf8uchs2lv01hevgiz9xie71mvok7wys3pd1neetsogz3ywjluj6jfn0heim1xz9pi1ru3z1yqo2kkez2t5xsyonv7kkl4e83pfohtj87ro6pvbdwam6flh3mm',
                flowParty: '4nvz43fk7hhs4642yktvkrommsfxjxw67868zafo10zz2korbzxcg526kxv76hkqwm3x662czveaqx1foirzcb7l6fxrfakfgkkdv7pldxg16c59xq4io77jcc9eggzm286w5ct4xjgr4u7xf4la6ligvwqhui75',
                flowComponent: 'c1xhvguzybibiau19ewy4om7sru4zje7kfhkmfcucxp2nquwyfl42eyqh9cs9pewrc6gq7twlhburqnilt71n8fhunsijdi7ytks9rd2rhu9jc6uz72nl2ollvvcu9hr24eh6nyk7kfd317goj0gxn8vca9xyk4b',
                flowInterfaceName: 'xufnd7hwenqxytgmhi49hxpthu8v3rhxcfsaulox5i6vgzvd349rikcx3omwao4byp97h38vgmxnxye8aem15mn3f0t2fotcsbu3fjr0yljrpwjtanjnzudwxv8qgzo8g3ujhunhtgjjsaf4b3e1xj81kqg91knx',
                flowInterfaceNamespace: 'ccda9ucwvtuqzbxbz1onlqi1z7opgip7xskj7mjgbpfv7okkws0p8divtfne894jq5gei9kctcbdrklkuc5m759p394b7856esfesk70o32lnnpdw43c0fxtdmdtytsccuc28xqrcayt1z5axneypnec8rij7g07',
                parameterGroup: 'agd7fujzhr9pvesc66qvywxq8eezic8yl6vyrh0p7qiyjt3jig0yq3r35ru9jw6gwbv2zhjjmhopp4p72nokfixtz2x8cn3dsk9q1kgxl67fayhiblfj9yjob8dyyrima81mgyeby6j7rb7miiog50w69hw38a6byn4bidpuj0zhv9cmiu3tmuxsw86bnsfmah7l8y712p2aob2bb3zwvdgha1cn8rukjju12ni3wohfjpwn0yfam7ot4y0pngc',
                name: 'liyvv6r1tvwoua8fv0o6y3b4jg74116h30b4jwa6ez9fn0lbaaw98ehdvh70et5xs0xssk477tbl4vjqjuz1ipgx9ifyceav6yp5vinjmlhdnxhbp8imibpa2i3ubb8qqcwh0qkc4euaywoiabocsmk68oxp9pv7emh74pud17r30y62rm7rrsn37stkve12ifb4046metwiw1gns841ga7djrx0ljx9o3jf77i207nuu8v1uqsyazd0ahunz4t0emp7mrlbvt5gysixzll2t0vw50xoa297599vv163hbvkaznx6o04y225fj4pr1hx',
                parameterName: 'r61on1ksab2kt4gnwv4yp14zeet21in4i0r65bi19la33q496eddv37lk31fwh9yuririow6u8yq3w7e5q0pgfcbdr0wjxjs2y5f5n81yat9rpslufsqbe1uurkzq3pxkv9atkl0b7gj8czw4uca2udxcf6icxdjyp6qeiw3qh3fezolgshzr217pk7frl57ks3nxkbhbq1dglqe3se57whk889saaf8n5jj5zcl49ugh5rbzd9c13bwtfpvl2uq6ret685k7py6doju0mcevx5paekxfqxpy8vcy03dp2tw8t7j1iiphzhcmksi59du',
                parameterValue: 'xaackedc4e37rufxfx0mymh09wr5ds3dernse1l6xlaw2m0ew5aagm2ytlhnhickewz6xexocu09pbk16n587ahb5gpr6u9djz8uhbajgt6hsqztp5sg2pij6tc8u0kwg7uf0u7gb9kykc6dzdeb6hysqfuux9qby3vri9n3r18sufnmxqr6a5wuxrp8zz3babqav2mjyfl24as1v1e1gz6aqr7itv0i5h94orc6jl5z4wkp256tqxfsfhvccmnd1ztsa2h4qt7myjqfuevmo78xkhz799k716jcfggri6cx8apz6qc8kmzfq27uqjtkthp9v4459k6u7eo46dg1s046viljl3qlka98pk48paxfh5dkjiwjomivpwqc6sra8wvyt7aq93ll3qc3smr69iqdpz7hysjad0vhokiltvshfbrlmaq6u5t6bne09wj2pm71wuo906lpn08waaxkxgbna4sqn5hfn9aqe4gjpmkvip4ny71t80ko5xvi1h6g5m9odt3n0yix5857e0tlggzh9xq4ca8us0tuick3v7apb1rercah3ycj3mee8rr12ffry340nxdwlmnx4qf5ype299vjjh16fjtnxf6vt2wz97xqni9d0y35ahiaciba18d2poc8fum2x6hl5o2y9iai2zjw191to1d9yrxm57w6ckiji22jdfs36c0kyqz3piug9vxe35siv1xvakwbk1ncoakuq2njmhyr0vr1dcs9e457gjyoelu5ev6fpynq3ebzkv3npeee815o75vgw05dn6o2yu4jql3fawarnnki81gysflfj6pkldl6ieibas52e89hrpmqdmm0s9k1ayruq4xea9eqr6yiszkjq4298s8iv2pqiiinaa2k3c4v9xgxukwlkaua53s0un6zbp38x5yahw9uuwhuufpz38s1metpwb64jqw2ga1cqvbnn7lgwsubuehdc5p7bri4gjjz241re2u7w8izctmeou83j7zb3lohviaepz6vytb98',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: '69uepmxxuxr7f2qhjl8c',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'ym98xndtjx46vlu5dfvo43wung7rvtcmgr05ely9emrm9f8gpmd1rwqmr4eyu83n4q75f4mvl4otbsc4mjnx5ags2p5g6fk8w9oxmsxex7ijg0h0rxk9ryps7vx94ex7n7tfvx1b3wnu7fn2t7miy6ht5a5pbaed',
                channelComponent: 'vtvwp4pcxbyv6n3gyw8h6ekn88h9i2ifncpk1op9z7z48rlvb9dczix5jbeqqyjpy5q4fd7z7mw1pk93iwp2ozhqm5mg2ppcuixgol26wszjjuwtzmm9jphrv66ju8mdw3ycl30o2pp7dndktpou9zi2p5t801d4',
                channelName: '3g4j5l4qab7t7swr4vh07pslfqmtgff65m27uvazxbz6twsedag6ufcqnszani88gwcqyt2jwdnae62x418ipho8ltz0s41whsm3qjywxr67h8tzi6db5n0yo8gdp2vw9tryb8t0rs682ire6zl6j8q324453enf',
                flowParty: 'ifmrx5k98x1h7qq2zb23u5gymkhbsoz08y5h3iyq50k1r8lt4ijq81o7hpn31cvt37m25ovz1hh8fv75st1u5cc0kqy4dscmz9j7j3craizi3fupnp2h724bglrkotdbf5xffe9csczbdyymem0ln5cmy3ky35gl',
                flowComponent: '1o9bz3vajcea9kab33p1eup3lfuoxms7p60axxr0pw3pjikcign7tvlxfymcp4jw50xm823ur3xvblejkmyb6xxfdxcr5wlmtagvlfnq4dmhij17xp10akz1ni29m77x0vl9fg6ne0yld711uii1a3qa67bsk5fy',
                flowInterfaceName: 'tjw1qvo86bso4xpg0tfazq34lrm7gbjn84zpwly2y28zvcnr7sviq94hsktrbmjul6iwdw6512pbtufbebq7e3hagl1f9zcc3c81yw0jf239kk5ehq2qg26xcyoj1dy398qb0bm9l8b28zbyguf58s1gs5fydsgp',
                flowInterfaceNamespace: 'sfj5co52i7g2m9iaf71whi1x8c30a6a6av7kprfxrh39y8h21rbb0l9tettigz6kbo2mktk89wrlymv4rpyicwepx92k0alx2w8o5xmlyr6hrgkbh3c5xzoh1pkmjo7k3wyq0yeat2eqi0cia8328a4ilj65t9eo',
                parameterGroup: 'yqg745ea0xed50xlayavp4pl6lhh6vda8yobgsyihndqdoxptcs6rovhgwfyxzespvd3xm2uythkajo3ycs2yjy0eln22bo8hoztzq9gak8gvlucgcjk87i724kckv2mvw0suadtp11cwd1nxp57m9iivu6w3kaqx6q6yhmf1emhr9bzz9wdovlu4wvg474vzw3uyu5610hrtesb1tzxyas682x454asayigflyswqd1jxjrdwtwedr645hkglm',
                name: 'p4ecovu23tn6jo7davdl8b6jlyx8y12piyo3eyagtxyavuhwp77gizpbuo2m7bc8ug86387zr1s4zjl62kf9moeq06m4nkxgztovx0qbv04s4933c07aq4wcylknhbre72voa3s1hmcwtogcnmfwlgv016942io5dyeb8xyaiphl5xp5xhdtzkiltcsx7tz8dhnl8qudexe9tl2dzio3fk9nau0h68wvsmahdrrecfmjvig3f23153rcb0lmdsowlp97nr0w5h7k0xa9lcetrzj608czr3zm8qduvolw5xf02v9lmhkg811200p6j7tr',
                parameterName: '2yrldfb4zbeiyblnprngk46yvjepgt5sawn1m893dpham1jtl7ys5bynblt7x7pd7g65ynmrh2dr0jwf9x5ki5q0b1aj10oiybmpad4ytbou4mctdce1bqhwcn442t8ti22cwu837qewq4zyt9ink7ggl2c66lo84aryeldpqjjox4surk2d0ora45qwrduyx7fq9w80mr30s7ih6hrl1bm5byrsd5r1gsr3ijol37qvca9dwvz2rnjy1n6ximuoqymkwru9aqdowyigdimxb6nmg6yrn4x4h4yikvsljd8m9kz81buvr164tq2zobed',
                parameterValue: '7cc2elt7vnt1ve2jga5e98d8y1exvkcqmag65l16fc0vnqnjdwgkx6n1gdzezu3zahhp1xufo5mc8jnpkiqg6r69act2d4bsgs0hcow1dzsnccgwzoaxg8g46yk4e9gl9lhtdqk7t7xb0eqww2ge2dku1xjm31jzdb9ugh5y46dyxjlewgf49i11il0hugish8syp0a2l5qstzboxtporhcui3ahq6mnd5qres9otk1ldw0ubhje5muirzeb123fq7paiaj9lv9n30jjmc4r491cc1nsl3mv4sejaerm8wnfdtfg5xsw6hffoli4sjq89a9o30eytbc7593asgvo3a5z2nj73hf6jy24heithflr52xz7q1hj3p52tjx1e5dkkwda76cs1rr3szpva6420s7wdz4q043u4sczwzrhs1talrj888cnxjlpr0vheo021wg4hm0n30tiu5esl8gdfw0pzvhxf4xsb55s5tmdm53dp708fch677sosx2c9pclik2tp7woaydujz56orat41d4agd1l7dode9kg2mxk6irxdq612f1281v65it4a3xie4dwvos61cg9786300eh9qv7nkgmyf08k5vskmgbpfox6z8thasq3t66fxz46mj6th1pq17ci5uixx6omq7bur0kpaz6ujg31vk5eq3h6fpmwh7i6wukmibh21jdh2dn7sr1e3m1rt7tlmxphdlwgdygfk3p25y42fmf1x16cjzhdbwusfzzigoy0gyv97vw926ospmo8h6770huac3hny9o1z30g4r392o5qzwp8ebvo2h3xrmwq11v5brvortyzig0sl6x8l0rejyms31xnx4zqaylfe4pbxb3d2zwnu0bfiy3smri2dzpe4334weuaipzmvuubi7nlh538qnfeoty2bc75c584ra28af12alh4azy8rsslc11i0r9ab75li34xaznft9q4nj6e0zme71ezcbevq13bbzve407wgy67ze0dft1jn28em2yu1',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules/paginate')
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

    test(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
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

    test(`/REST:GET bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/e7e8f251-44c8-44b2-a9c2-57c7e9d92d07')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07'));
    });

    test(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fa5efe65-448a-4e7f-a223-6820c0dcfc0f',
                tenantId: 'a6fff368-c822-424a-baff-d541a93129e8',
                systemId: '61e70e37-1d9d-4e28-bf7e-8a2e30d398d4',
                systemName: '8copzszehhfra98cq56x',
                channelId: 'e6af573b-0f58-4944-a339-ebdf09eb1458',
                channelParty: 'vhkk3voep4odjl7xx8pdbd8k5kjbpqvwtuwuljekobl4dun9naxvirkinvbbbo4nv95ws2q6oqi944p64hj235y94z46qad3ibsw5zrirja5taud5bvwn4yuennb9x8ai62gpkwaskqsyoepmhjbdmahdg3y0k23',
                channelComponent: '0vas4mcln73oef858m7henjerqyrlxwukg4ucud5iqanoa3gkdffnu7syozzxh0qp3xjf739w00rl8n6lsmk2ioh4axiynz819e28fc10uwna1h4saruq8vg1g3cqc5jsnpyv4dbccjc1n9sr5mphdpcqly4s4pa',
                channelName: 'pm4ez36v6iudglif2p5ii4xx646nvfuoyo45vh2dutczph142cbnqcsyht2n16g8ktzbzn5f8tbv3buje5jcxec9p9jmekw37kmnr13p1y22nuswq318mf3ld8s5ieq841goxpbubqkw1dyexsk15qe1zvehgij7',
                flowParty: 'yu0mveeedpg1oco5jwkmyro5azna4hu5lyl3jnqmpz2t5f8xdf1sbeeuoemkpb0z8v8nqbpqyei8h4dh4o2j6honh1pxee0zuu5yu50egeaggizodyjn12d3fdc7rrfcbkovzq8u9s6pul6hit54toh9z4bw2tgi',
                flowComponent: 'rh83xgwerkqc416lye96blb4peek1l3aadovfozhqy8xc8g34boung5r2eelagzi08cwcwa41x0xboz32j3vcg9ikgo2zlxolz7b0yq3pc14o9844psy5p35trnz3wc4hqror6mtvjih4zsmrykwxj18zfs165r7',
                flowInterfaceName: '5nae9ofdlk693ygsnnhovo73iurbb6u7eyop4y3v6cpc7093ypndbrnrtote00vx0qgcin4e5j0h1ac58f76xvy3h4v1kth7t9c657du0663bd38yifaazcy5j5sc60kenybzkip82tl68ufaopzfubi951u97k0',
                flowInterfaceNamespace: '6r3161agfhc8xlh7vx4p240exdd5793btx2sggem29839jqjxilyhinzr1c12xs9ijmxvq7ah1hu0wjviy4i24hfm2zp0b4x5odnlgxil4idiradqjy0t5c8uodf9e63mqhdqdsmex839szg49nzhj63e1kzsmk8',
                parameterGroup: '8k07ckbzu9shy7f4jz1ty0h7pyogrtthm9ojyyp9yi6lizbkkddfefw84l0kt8sc49s5qxu827t442mwvbyn61ow7i7ahnbeyd9l2v0t5neqmvns6hdqmvbz0f7gpyhyg2vtaqlwe1pnziva44a00a7u2tcdbnfmcb8r14zaldxh3d3kwezj2xsjk4ovhmabms43dzjmzfujyzvahuya5hlhk2ww4k8dhzivg9cl406tymvywbqn347d9jna7k6',
                name: 'a9uz95zxapxoknbyfhvzfx4cn3wmlf4023k226y94h049l7b7wlqra1tqo23yts93jpbphs7gtjyo08gkc9nnyjwyp75ed17u60zcf5ziyr5830ov8xez9gcaeca44goqdjnzyti92ttjr9kq03wicdud6c2lbu6ohwt4d7ufqviuq66yqeaw2efs8o5w5pxpqvwg246wfrj99b8sx6vt6knuhze27mrcf01i7l578c9eyk95jun4ru8r4t1ukeut6shgh76l8lgyubzdj7g8tgvwoymsfts6pzpazlorksd5olt5karoqqhcicx1hyb',
                parameterName: 'xey8uhywnnl9ngyjuamybjurl9vs6kzh4ryjov6w1ew2yfhttaurwwjxx6pqeaawyt4g5613wftebqznnxpxb9ba9b42allvacp5yqld7rwbx25ls21pi8lqo0svx1q226hjtb3fz42lb45a1ypj34yed2s3uk8pripifu81hdyodx1l07xtt0txfirvoadtlewysroj80bsx1b7zapipaix66e8d6oykzdvrwfsr8s7m1rp022gdpi3y91nuydhw19hvetl62kivdioig8fg6e7eikwiexsy8dkvsx3wan8pzk5dbgk92hzkozej2q0',
                parameterValue: '2cvvxxhvt70uyr2bx045z2rtkwqbyyir75zapgci1hp7xzlcsw1d87e204dfw389if0ogm5ioqomn996yftvmlws6bzzzdijdskl6cisv6n1yph1ypgn14ooto5su2k25okwyvntds0rm2h07p064dhx1lc2cvhkriawwv3eamcensldt0cabjhc8fmbvege2zfbl4t5qjwmu7uu643xm1tbonyn3j8psp0rd90pvemp5ewczin9osxi0rfqopuyzaicrssi0xzh0rmzbljk0rum0u49p5y1mwp68w0w0lb1fcxnn63gkh5mmazd80yfkd1981j2e148bglilzglvmhg99vberddymeoglgh1wy2ra2w14f8los21ftsw0qkc5ev9jo60awb4x5sr2t8h0rgyfxunnozaemlu03humur4bkig6bm5xskc484g6esjpc49gs1lfcxmcczrki1wm1ejlpppct66zg0tavjfyilehxn5xukzk55ms0oez1vytu82cf7jl4b5i6ivswrsmh7ngebk3uycwqa9qtxh4197z7gvno72lsrm01ljwlbwuaj8ffld1rl1icq0p53b3qaei3g0jf8cevhvggesy8zrnn21sfrb3ileqyjb20mla7rvc8ffukeqthy161zzivigytkvk6f2jl3773orj72r58mouyohc621yury4p87xlzmjl4wftriatk4t440f6j81s92azsglwpfvkaaobivufgrsdb5ags8wbpqhg4tpgxhdj8x7ljmejl4r21h234wmviylx8tlqkbzkn61km8htnenu8xk4sbg0wooq0p1ge0l5blr8ckvso5nmhhhs436ywx7klax8ur3k4o4b8fei8w0nzpcrf6kku4e9lltipxon2enm7jt4755r1iw6s07q4so6kx3tcbmtdf0dizcgrvzk6s14c6fd542xdqmc7cr0lwrrjmov141buqwrj8b26u664eycpxpy9xycug2uarmusvtz846xawfll',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                systemName: 'y38jbhuxnw5kd77kbnk8',
                channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                channelParty: 'to4qplaug5tf4zddnp451axt8dvo4dxln1sjeuqzroapdlkfx265kj42u0ghjnhqp5wvxumlvwfnoxckzvvy06a70zedysob0rlwrc4i8pflk8yml8tvufyzysnod9nx7cqzrp82fdu4y0gp0n5j1f28ttoecf8b',
                channelComponent: 'sk2jgxnjp6k0i9rhnh5ij8vzjopc75onkg0dwqbf8u6un7jgo0o9cv7q8hjeosttnvz6bzr6wxrz6z2p8gclj7zvwvnv8zoftdhyx325o0s3kyml76pjhj8vinq946095dzc121bahr4v0b391tas3mc2z92abbx',
                channelName: 'kug5spyzl4jq7icsulm9ru3pako38emh481x7a6p4vfs7qimfrm8o7o8qdd1lvly4o8v32hdf2dshwp2d0l83lybkcyr1cjrd5qo875xymjpazve88x5nc99ssk84ywjybbni5q9k73ydrw9ff6bq0bz29vloilg',
                flowParty: 'ce3svdk80e0q95wkp4f0aachbucz8dwfbt04vwulivzkfmlta62ljxpzpz7fpn1vhmwxn2in28aq44ysurr2e18a40uxks4u974411nopjn2yfzeu8spv4csda14e45v06ghfcn7z0vo5h8rhhdjd96eladv772r',
                flowComponent: 'fyjcswsj9xj5i9dyubks0wsy2q2okfjcgfd0c10gfzylzo7e9tlr82iqlbzheegg08txxb3hiui7l248bb7kclyapl4d4n4vs0ygu37u51ipwsbg18pm8ut67ygr609ya78rc42emu0yh7qt7fai4nv81i4qy71r',
                flowInterfaceName: 'ztnn4blp9hxr1dnd4doj6qf9l8sgjrwwwsqetnvimhf2knnevs7ftal8v7e6ogjxu1pnipsy2w7szlahmadqniufts4fpqnwz5rxtio7kezk8c00c8wsg21zaaipot7dytyzts6pan0nwttmtdkmm4wg228mchwn',
                flowInterfaceNamespace: 'g1pqdfsbzacj1o7k8vawgzqyyxhx88ocr5thds6arrv1nasx6z3jcv49um45vuimk7y6ssqgtjirt0jlr0h3nsng0spr37cbd26hw4sepjh259ak7g95vea7exjpftfce7li9sz1iod0331mydu6bk5tbxiuy1m4',
                parameterGroup: 'p5sr75p5fe2fc0zck9dqdy889flb9jsl6luobodxouzol3scw81osen2vmjn2m9ztn34olekflkfikohxcjppcvctik9a88hjxtt1gogaeanc89cadketn9czwtgv9ilptjhzu95rttx2xcuadld085o4kfz5cy7bu15ajwkqyh87ob7yv9l64la3mn7ol9s2j9ajflah7048t22mhvt17lte6itd6ao9jqb7zr6o0e3dn9bucq77akkq5g5fte',
                name: 'i36yw96uycanppw5mhyrk3xd9b7vj3q7lx4un5z25zqmhwlpvn0r7h3zeln25mw0vt5f95gxy41w3mo6hyt2s2fu590ibowdd1z089rbjgryfzbq733c10e3d8pgq8h7xo6jgtl5n2gclt4wz9t1czae5doukddw00uv1rie2w72uk7sn19neulhs2omwnmo9eyi08ljnni3wxn4bq6o1jm48sf4x4lpzw48e3ph670cm9qlta7xfl31tp7mse0xgwy9i1xrdnm6a6pe18gwtck2erptvhy5xm4f3o2dj3jl7x5l3ogxbbbgh93uwvc3',
                parameterName: '5nmphuorr3itjk0jxy5a2r0a97oo9zkbgp4hvx6n3f0rdvbenc5o2jp18q3zuvamr0p29gozvn8ek2cniu47yukks2k4m7ef1yirgick8lhqjzwq0djq3qfyvxdozwkj8jhyjdncpxjl2hd7kjzhfxm8bxqnf8dgdp1lhiqgclyxmilp9caqh529ial6eecdefpbv2wrlewuw5vu7mupnndgnokwld4ut08q71hb31ffncws00z3loove1pvhqvkeokuvrpjm6z35z2ffjbmqsaxenbpxdp3ypxwyzw9vhea0qrl2djtuxs16150cac7',
                parameterValue: 'itok9dt1gdy4x446msa4xcb876lcac5w11as4ygnnxaeqc66r9i7202b0rjlldzhjta1k8ptmdhvkidhz4hics3izh4gwdxh23th5aeufcxib9ucm0qh3mfqo9dffufqddt504ealwhrvhi3vjxw80jdd2gtskco2wmgvxux4fueqf7d1joagn8d229p5hfg64vzfvqwy1f5a9gvqs9kuvkc10tsadqu6cv6z5jsw6cfgzns8rmw5pw3xrw2zmxflvn62h8z6r6gzk5t33nf6d09mintpsqh7oglpfwgl9chyzn6wu0js190t73ck40pevs9y7fzqgh2m495l88ux88oua3uvaynurj3lyzgbt6xb0f7d67ox8x9bpn4so16s5ie4levpf06xp3tkjtw3mtgyd2cyoqebgf8qbe7gjdrcs226idwv5i6yo95fbpjg1v2msx83kjldzzmt7zyb6x7q946cswc257v1zshrfxp2xymroflw723mfdq7e7fsy8f8z7o25pyjv3c5xypywnmk5jc3cyojsvudg5m4ddra7ldoyv0gzaa7g7rmx8vq53ihhr4ivv7e68ja6kj7bpjf0ii75m6g0g0ekp1c2udvvccltnhuexmtsv6q17tqq02aigk0r9svawque4fydkh14tp16zrx67h2lebm6i6gmpjnn8292g8ikde2m3kkqh2thiuw1cl5b0dgzghgikh7pslhy6viwkfm02r5f3ue94zjazshfjfepytoj7eai0vubkqehi62dziprh9bj7rw3sw15nqhyke04l1j5wkuavsbqgcor63iux583sy3ujpglgaj9gr1zv55yp9v27gb8rj604tox7lsmknljaq8efpydvepe55kbnlgeym5jry8z9mwbao981bd8vew8bey3qenkf5zwi5jm9l3mol7s9c4jpnpezdobl9fopc2mt97871sa9szy3etnoyicuzj4k5y3x2kpuie8efsy0v495doqq2dojh45bxegk8',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/e7e8f251-44c8-44b2-a9c2-57c7e9d92d07')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '55ad6e76-5323-4e7e-a390-a024611656a8',
                        tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                        systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                        systemName: 'vfygiw0hu5f4o80iazt2',
                        channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                        channelParty: 'ea64c5lknqejt5gbvyvhf7hd6v2aesfgalhi3lvscw8o5l9qbtiytj3wtb2p550b5q1qxwuzgwa10ffjrg2us8ziejpd6w7wha0jdwmrezufhq93egfhbp373jc2y652gxnqryg70u26e1ktcma7nppki7g2jajc',
                        channelComponent: 'seayfl0ggqwsn84pji3o0cd9dchfw1lugdmqnqcmlohkrzrdsuesukfxeg2k24rekfa4y7qrfdw1l0d2vr5uqvociusav3woxoc8f9cqzyjys02bpj82e7q2q6wowrd05b2szxv37wplpc9hvv5gst9pbe4guu5w',
                        channelName: 'ofzxaedrybp7n5arxkcebgykzkkdwbii6s4hohpy32qnlgrq8jpopp9ctx5kn952ivxy73tvjk77bcboilqmmu0v47cr460tr7o14szh190y8pd4vpltxo6kq2ty4matjyjzz7p0z2v14iuahkwa1zx7qdxj05qa',
                        flowParty: '0ytx8fjxphphu2j8fnkzu5ex8lbtl89e4v72z5rxt8vk4ptt73syh7ypdcjjmi6u8l8se5zuwj2xpinnvax7xl7g63aavk5o48lkdy0pyfaeikjfz22iyz4aobjl7oqw4a8yqm23vqezpvkhq9984f6o6oztpo2q',
                        flowComponent: 'u6t6jw6dx7nrbrmj4siku3mww64ewdcfol14q0p79e4ebfjh0dub2dcrgeg2q34jmixqfwopreqz8nn2ekzif7u6wmzz3jpyhy73zyox06clcyso1rmyh16vgstbhyejurhcav63q1wx8od8gtvws3io31tfa6ez',
                        flowInterfaceName: '2odl30vhk7kp52mqoxyp0fmud3akcht0e11a992j0g1vdum5mob59qj5i3epldud89qia3d10wcps9qm39ywozzqpodnmlyrnqjuezveu8mnb5j0ei3ksx8pe9rrt1nm539lbz84bdju63ugz1jo168d9s398jqv',
                        flowInterfaceNamespace: 'uc0ndhywvz2zxn47s8i7z1jqzzfeq97j3cp3h2b4utfcn5e4sno26q6bisi97398brpz7zijudow9uxg1h0gmkl20p0akr1dekjgm5s8854emla0xytiyz1ijr179xum6zmhxse7r9a2tzwgi4yyys49zvxeiejz',
                        parameterGroup: 'zdti5kqev2tq5gfbo9jtsti0fr6bv8uihjmshc4furmww212deq63xjsyupwvqzplhkpyfjpkkmb64dxt8ux3pra0oaoj9tzlxorp34bqadows2xc94vrpunqpclx0j6eq8nh5srhfice3bddevf5iznmodr4v5jdhfdhsdxux0mhotyuukythx2h7lpryruyc6d6hqs9j0od8xj3ug6n2q5tj02f4ceyrmly3ausqn162styqp2oe64hxy2xj3',
                        name: '9pdbisddnld0q88zxotvskh4xnom8pyqm1803lss6dijyosgf5u9vb7tkhv2p4z8zqmal8l4pvluzwepj5kudvlj6oegoz2lcp31ro54krlh2oiz9dcf0g9rwzjmuqi0nnlqldscryv81hybiwu0zlszblvp4f92n92239sd78f4ifga8nevem5wilas6jakg19eb0rg3ki5d9gos1ipopj0sslhp036xhwt9hhdncs973vj0y18jdzdwkxxjm9j5s8n9v6zdczpfiv7175cjiksdrrrxrq5xljltnitwwjo4swg58rfdfe5s970ibpo',
                        parameterName: 'gcjyope74esv1o27lkz66ty1ico2i882mxwrwysg51guegsd3d7faayegfszanylmoq3h3drojekods14opmwz1kmpbou27nfg9612m0az3ra3nqeqvc6v6wfwnw65z5l2267v86idyr2xkwhya9yvo586oe1fqk0qfuhzu33um27iqoxsnaq2vescz3bzjspxrigcobahajbeuxtaaznlmykschalpxhktujfawge7e432tewshb000n2i8bcdrqjdb1c16hzlkwwgl3uesonqkfweiswpweezcft0f2nnmu0t5nhvgog65icfotup8',
                        parameterValue: 'c0kg22uf6s66c7z9yz7d41w3d4uzrndy7yhgga2a8823ezvlyfqo66mifsnorsr0x3vnm81z1uny4mp0j92s2aw52hzfid2nxncj8k0ipq1egy93y6pnrd6qo50gy52w1euv9aqz4azkld8ostaqw46iwfcc8za42ae69jzt6o8aotlwnxv1mzq8numk7xbetfsv6sx4mo2ug7pjsup10idqewrbnvkh6ammubmmqd3p079qkvocd3o6nyiktdyv906lt9pn73h42vimkgdqzajac23zn0v1ngga0j0jslij6vzhzso2cjavspaj4yd1xp8p4fma6kxvi2pg77ltnve91ei5herby0zpa6kf7z6jvi2v4gu9zpo2l0xd8fzu6e3fyllkg1g4sr9fiufv9qw32w4v2x8xd9ywzn1f3lu4rjlsozhqb03y52q5h89zhia2n18gpxkqm7kfrulet165z4sbo4d54omnlakhhe5lhr92kw8mxcayo126xn73u1qizklcpcc3fka5r0fgupgmzaq65ms2xw6w7jxl5tptm0z93i0kqlwee3c0vdjpeot7zylqf89eik5d8ck60ilfng0ykr42ru0or854p8fp8ddsfgkmsrib1ep74lqnvq5g0scktpw2xvp7b409iygn1zdbzhf11s9pxqeptgkujbk5s6fcb72o9qkhbayze530jy6odtrmsr3whoufxumvozlyljj2rh137qqq336q1puyrx1lgdxwmpbh9f8om8irtvvlgtigs5bce54603i6u2d248kcauacz1kmyl04z2ob1g0wz3z52yo1xppn5pzb0369enao30pousithiyzopku3o3kndritb9j1uctg4cm59vz62qoez3kpwnylnn7nvn9dhxk9mwwx11su73g5y4n5vsjybdpw172capixtm8ro6mkn9i3viff9g8x9ck0p7y8e1dyxgzu2tev1pafa6o0tejrmaruvjn83u5eqeyhrjslco73ys8hlbu',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '55ad6e76-5323-4e7e-a390-a024611656a8');
            });
    });

    test(`/GraphQL bplusItSappiPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            value   : 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('e7e8f251-44c8-44b2-a9c2-57c7e9d92d07');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('e7e8f251-44c8-44b2-a9c2-57c7e9d92d07');
            });
    });

    test(`/GraphQL bplusItSappiGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetModules (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '79d359be-159a-494f-aaed-396c169484c7',
                        tenantId: '00232e1d-3604-4bfc-b9c8-f5295305f2bc',
                        systemId: '43823aa2-12ad-40e5-9129-0dfafc0c122d',
                        systemName: 'lbq3r15hcidrz6ajchum',
                        channelId: 'eea8c034-4a3b-47b0-a6a5-78bece3440c0',
                        channelParty: 'zlro9viud7k8j7iosn6boo3rukjsmkur3jo17qoskp15etscr2lj88r5dzy9sjpk8c1mxt0a64m7kr9c71qou3s1mmiw26gnrcxjnipstnpkddi0q1fpna4ys7x3s99kzksey33m0ch7zvhfcjy9e1hw1qu6rh5q',
                        channelComponent: '3qv6tfx1xurnvxngdhc091hn3e1wexkscqlkai0csywqt43s28cfqycgxgxx5ei2q194nast4hdtuktk5ryixtgjr3on0otkvm3wmpq903a7bzno4x69w34s5qjlm2tikyftj8d7mw1oywfywlfql349jqyayflj',
                        channelName: 'fothap3inlmr2m4v2da009xfgu1y3h63iw2b99pasixofsbmmb7qzq1yabj5tfent3k6961g3wj91r38xc6i679bph9i4pd9smymwk58qpepx8j145182ffqogztzn1anbhflbvkmnmvzjqvtr0khmhqsq35lz5f',
                        flowParty: '8ocy2ltuuv5mg7zshcbg1vgd5ov1t1zfq2ckjn6ou126a1cs0zlldy48p6o7wmznnfdmxenwfspvzdsto5qnv0mm5lvtv3tpptcof7jzfczal0edqrrtl47m5t9sk11wn4dtr4ppxp395mb4kyhce7lvt9azg8lv',
                        flowComponent: 'jttf8tg32t69r897ggmi7c149l0i0i832iji55ue9h4c1ipcnhiq84j6aynomqewfwrnujgbajbhlgeyjgv7ji5ipty7k7cslk3tbo23s1814kpqf1ecgvxx6wnp2f736kmqbv8pua42my6jl9awk1sfffgtbv1d',
                        flowInterfaceName: '040fu3q26ob5j5ljz7x6vv0tzmftzvs4v4bcui8u92xqepgo1tvo027ipsyoa4eq24xmibojbkb2j2polxxe24odr4resgbxvklzs5zd3dd4t8emnwur9cmos2u0ydcqorn59s3i70beo29ti6wxiedyf849gr50',
                        flowInterfaceNamespace: 'zwg24ezfi3423ce5omwovqzy3bu8bh8ha58vudpf8u4nutbsjh59u8dk7zap53y592aqyfvutnwkaddhua8u7m29u7rsr3x4qi0zf4q02xg06u970m71abm6wspl2b0jjpiifan7ruus1h6xk3edkbkfso333nia',
                        parameterGroup: 'x7fqdttk7l3uet88lh1ubr53my18xlfncd685eiiih4vmrf3k1iaikm39tuddcp1s8mstqw63jk524axu79v4wk4jp5bblyst6368tyhub8ifkdfj96k64cz62bdqld9ltl8vbmezawgiprop4p3o62ie8v85x93a0m7jea5oeto5g04v1uk7logef0zigk3r1wuu0kdhtxsnx3u5y4clxtavjtm8zilc8qnbczd9pls07zetxohay5a3nt2936',
                        name: '0gwnx4e4kuuo690irl016qhw4wmpuz2pfjt8youyoyl1gefqwhg3de6f2gseou22w89v6qd3slcj6x6ncof4sf5k159qshqq5j3sfapecrw4bg42je2ypa74e5xisiodaizyrhriweot162ufh2eqxgn9186tupkytwistnpi5n58idepfm3kks9y8tafmxryqufh4st0addhvpz136ai9h89w84fq7xbj5n3iju6mfiagvvpmamwkpigjfox66jl6rt0ggka57cfxh8apthgji0bft33oj1y75z8hs4gl1fl3uz53bxr8jh1u1175v9',
                        parameterName: 'y0vtizt6nutee7tdc0dqdopdzaw6hypzu5vci9qypj3mpe7yrpgp9svv9ugxiyoe67osealdknofepsdhpq516h0f5tbk9ybaishf3oj127t9llome6e0ykvx8x81tpi3n89y32j72hmt37y0vsn3l4peprlsn7rrg73mm5ce6q2meeafb17884x4kxaf8pbsaxrbksmpm4j6fpebd565geq1gxk8nagacgmsg4v6tvyo5au6edhtv8v4svk2lfazcn6noofz7ubkt67qy7kj36wv7h8o3tcva39062x381u7hvf7in1xojtne2dv638',
                        parameterValue: '3bn2mw5kvhd1agvytpxjf973cnhu0y6008qgnxxgultnom6r5sl77022z06jz7kq2uhpv5s64bf6awj6s1hvexpiqkp5jomzs3utaxst9yico63nfm25i8msow5raqb92tpavz6hykmhu00ramfmuiexa0tsm2n8eiq9gam4u3gu17jqqsqfdux26amz4or33lrpu69qubcpyanvk4k2s1kegomc99ylx67df90qtbjlwrr0axdv3gnhjbffc5cyzdyrh9gu5c5g21edz98kmrz9xq1ddc6pds24cbragrkzifwvh6iby12ik1z2srtx4c52zab6p7yk0mumsf8366y8efvcjx3xtf6g1hkt0krozguhvxyzrz62z64jxriorjbcy0zbp80ncw5cy7ja1fslyz0i3okv8jtgfsr6ra0pprh1385fwqffzntbubf5irzcnczqxk5eg4enzcf0rlnhpjjgdo1kk906rwxkww436k73ccqkol60itkctqf2opai8lgqqkx4qrz6ht1uto4uglt3a3k3zbgqagv3y64krkvdsr2wix8x0mjnpb6n7zpm9qdkjv7tpalkd1dp6wlgr8ha2e94jxnutij313juywnur77ekmu1doz5f22v4m3ux6767j6zrsp4fv4isbd13hrb0af89cv9pzsg2j1mhlja7c8bok84gy87d77sve413kdnw5h6bcl1uouas92rr3st8heofxf4irvo5v0tuhy7b6r3yj10vsqt7cj6n78uvfdtzl8gly0uu27kv8e5qq8laxpquwpyt4u0uyiacavup48y9g36ib16fyefjqvyede4hr9dh87nluer4uzf1pnk1lciee8u3rd5zqdzdc836njcda0zei18ybdx6i8ciw25d2dsj54mthv1jxxr7tjwdb84xuz7w7mmgk96b7mgwp8cafls8b2tlcxkqp1p5e1pzu93qu5y3lzgbpl2rza4lhqfhwaodd2tmfsa2eph8jawyi76as8rzh0k',
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

    test(`/GraphQL bplusItSappiUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07',
                        tenantId: '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf',
                        systemId: '4656ddca-bd05-4403-9f07-e40b3f66d107',
                        systemName: 'mewerhc08cmktuel9f6u',
                        channelId: 'beeadc23-e9ea-4efb-8641-f0f54437148e',
                        channelParty: 'bmzck8jybijyosi2ptjdfg2x89ls6z32hyu1wau86onwsu924elif2qmgoc836ogck0kqfulqwgqb9896545bgwo8tk0ew56f0g42yt78n4w21dpdsmaxk7ybzttqogxn02bysivqerjqc2i88c5e1vg0p56u06p',
                        channelComponent: 'himsot2xchoxyxpimlit48u0xeyarnb43f2xqw272qnqvon98d0b0asg8434ehyo51ky24ewfe27x385znr06nx4yndprugkksp3dqunod6q5hl95o4svrns91ttaht4xahjwcgg6oat25mdpm1t27vts12naax1',
                        channelName: 'uvbt4qryg69zru1oqnwrcruek02w4wewvfmjdp5gkgc1zj27cgo8orjqmpg1hp25p0etyqva3eqx9ctuedu64qzhol2sgrb9g7q9ak3o8qxjhki7rh43cfycb8xkab5487sq4xqtnpszcjt6rjittnt6pwka36be',
                        flowParty: 'iqibkbkv44733cqpza0i7q0l9nnkrikrja5roqjw338nhzy39oyf3hx0wt3zy9d5tmb3rb5ggzfxig79wf828umbofufwsadryga4aqibvij2d62r091do12mzvxxh4bpne16cuuxpt9fm12ubb617wla8zzeo3r',
                        flowComponent: 'kamrmt1giymoedhefpsbigopdxuv8lmg3x9hmebjke8cm83n96o22ukrmi7y2hhmabgb2ufmhg3jn5hfo3nhdwdmeqb4rcsbbq1ucbs3wk1bz6uj48pk3yu1vzywgiycbg196ta57td6p6mdk26qs22fng6jp4nq',
                        flowInterfaceName: 'naic35zi9sca8s93sa57bdtbuvj6n4v334c5e7zeu2a60y27libpb9g8krm237dc66wzpuy284iw0lz1qg5bvl3c1fc2vs3s73zvtq5p9uaxm0m9z58zpgmv6gd6i444q2gf1oxfc7y4u2cngfdli4uokgzv4wvt',
                        flowInterfaceNamespace: 'jf8lo6479nxleyqs7q1vo9t9prbiryt61fdxfma35kkots3xthwa6latihp8kohwfcrss8vbd0tlf6b4yl46xvov28s76184jdxazsbt1feuf3glg2ouykhwaihbiqiohaluxal9vumqz4rjzrnnz22b8k98mg1v',
                        parameterGroup: 'alqhu992kvs1t96vfkdnphiql11gcqtcxdzrs50iuowhns6bneap83uyjvn3wlw0d9gw5vkkkrdqj12bd9q18q6idx88wvnmadadf2t08vtzi8w4a8ptsy265dg2w6oibm4o00ntnlub5wcpbrn2wudvxfrdm23hgnf8jvb1lrwvibk9lv6fizc1ums6yfa7udkvnp1f02qfuoid35mk0jod8kybh35h30s2nx2wtr1fuuimf4q3thyqmp6b4o8',
                        name: 'nebzpfe5aryxwq5frtlsslb79tam84ftdissc83zxdxwx7400eb9ngf5rbuk2bv8qjdf5ibm1guvfnbwqsx3wlgjdb6vk5me3xnke2esd12v80kfgg2823kii91pafhubfbf3ywnsnugl3994fsmcg4hr5bdcjlyq0pyhyt9eulautnuqi3hsg3bwqnym7nhgb3822ifoh9zei6h48kpuguepctkrtd7poatc4pei0iod0dmawuzvukcl4qldwa3oechkv9ze22mxdfbc59zwq3c64wghq1qg5ycfcpgo9kmvg7d5x2pq5ir9ka8niyi',
                        parameterName: '8a6cnv8nlr7p8w44gx97m6grnaeb6pgajf5ctrw5yuusavjfb0hwocvj2lkpvam9t5wp5kkqclvsw298njbi8k48rc5ky3vmuzn9aojgikupr9pivg36qrxwenr6a9zec5ytrgjo5qlrtn04gos5igqm99z3nd0zfjfb3d0k1f5fqjvt4gzgm6fujcdds9w5ls0mqmmn0u5jygvk87lu1v40ui431htxbcm0hk9f7mf9pon9yn0vz5s9h490mdvuugo6xqb3vujcadm3u5oiemluc1bm9hcqzkkr399v699fkrsvy4rc4qqnemr4qib6',
                        parameterValue: 'kwgbp1goyvucu9cp7h080qs0dtgdcf74kb8yi7lrumncu3cfm80aqxy97ulc7iscpy2pyuhk3mmqba9g5nu1vy6lr5rzk48fh3dqycyhl7qi9rtfnbq1egldadfatlf1lv8mctqxhyhbaf8eufz9rewtt221cgd0d4gpbsqi20xyi59ksjf3tba5zo018daxv9pl9akvtbqyiex6trjb3591lnjhw9f5s21xtgo3p3uw4c7gx6ivvfllmcoq3guat73g9cw13zzf8zntgj55obi3ksnwd08fi08dlgzyfjz7sachdkhjg2mfa2ufo9jlzsqo72ax1r7bsg8r50v7mgl8ejqueb1ikf2d4jkrg1bdszda98uw25s0zniresy89tc0i6x1qgh4xgj7n4z1te4my1uoqpuwrhepeun9gjwkycetsi74tru7szjz8oh6ok82x8rwnzs8qra8qjst5ylt8767myxs1894k6oq5c82wmbz1sdhtkm8wd61pnsnvqlhgnn3meic3pev0smuj3n143kqieel490xloeq65xnd269j48tk6vbie5pg91jnr7rl6we8mm5zssmq0rto5l39djf3vbe11nvw4hqpsrvadcw7gqt3hp3wng2g5t3jpy3ihxwb3rywij3fl8xtdmlzaxx37f91olxndbvpcifdpdjjvyc3hw42pszg49x6z3grk8h84q1grwzzvfodt14v38jmh5aarktuj4ianxpomqgsk1fqfe0ba3pg25jz6qqaqj38mb6aptm22z8pvbqwy9gh5y1pjliknn72hn680tp39853nxegasqjdwtea83ppohzm61fzn2n9rd25jpcj4i2uvnwu88wvdbfjx4gezbct19o971rn1wol0ms8dt3ah0msl68grgdhfe5ocr7pgaqzs5tg3q73uq6bfiqr3dgwihikajom04ftwiogj7aj5u9wukbjvcsyyx29i9t6h0ymjdb4vbss2vw9qg53jtxlnmbwhc222rd1x7',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('e7e8f251-44c8-44b2-a9c2-57c7e9d92d07');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('e7e8f251-44c8-44b2-a9c2-57c7e9d92d07');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});