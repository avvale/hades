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
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'w3z4y1hm87o70a7o7stno2o6t5nq79nkh7vovlck77mnsj0q7t',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 's3y2343z7tn965eatbfs',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: '8518vcskm9ipji2zn2auylioev30shgeem484mhwd6vhkn5x3uvyu560ulnzwy4b22fajmjqkknsn87idn9jr8lbczmu98zy1hmgv87cxcuwbnvtko8lji7puc53d5bbqnwdwk8fx6139bzb05p7b27mu2msv6so',
                channelComponent: 'rg3z4feesey70tzk1v17h2akxkj5axllptd67l2598rrwk2k0gxrfmctjuw8i8zh2g1uedvgmznm0lmu23yr2duldiejp0f9wt8g0tfluqkdjavfflzt66aertkl430he4qrsiqb0lfpfem7h7laoqu8k49byjhb',
                channelName: 'rjgbi497fb12ulu737egyzft6a5wprkmfy8hfmrbggaw2kz6mnaj9naq5y0h060v8n062mnzl6jsshnnpcyg72h8hw9p3ss8yhzvlyzkcbipxph4kquzrcokntxk569zxye9o9lp343cdkkwd69avsrtph6o55sy',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '3km02tr37px5yhp8gon92xggfetr1njiup3rhlbzq8lwd65jc41g2uyx1wmfklkaq8735k5z212i95bmcaa15q4fr7cvlv8zqfybeq7xcxtuvay2q6fh3gq0zr6cxxalh0kogu508k8o73xasxh55crnnixb34cc',
                flowComponent: '22990tg2yorb4959h2ocdxclw65rkirwoul5ynqy0eisk5y259m986pyq43fqk457yrdr2e29w5fbg63gdnzxudz4xszzu3k7akqvvd7aope7wcxip9nkv008mkicislc9875wqdsguslfm5tpokk1z9srs7rur7',
                flowInterfaceName: 'ashn86vssma1w007yvvbi7fhixt5biq3eeldh5wu3gosa2q391dv1l97ktwbxscx8ukq42d06eg11xdfx668jg15v6d87peeagskjcqvo6ouyobuxzp4ctwblewvbx527iug32zxsv5j6y7ecxf3uulo1essnfg5',
                flowInterfaceNamespace: 'fdrl1mxqcrv9bjgq2s2eijoym6qe7bswll4qj7c7ntb594ufbb0jq1wthxgftewlb1rs5dpfqfd6phkvo3qwiucyexufdvxbcwfwk2ao2h5fez43uwbvvcu4osjzbxgyqx90aq568ga84th39o9e1kc98ui7rxrj',
                version: 'e8vwn3508l2d3wpufp1u',
                parameterGroup: 'l8zeuf26ttxzh7qwovr9inxq17jm3xa0ca1n3ydo30v5zwn2mxbvy7ej9lxy39uf96iboxk28fgx47m3lvkp6bjtqn9yyzlci6lmi4rw9byb88pbprcfmd1qxrgsgh6mw3c0wb3i59gfro69ba5k5bqldfld69grlvb9z8ty0rdg8fmwulw4iqaro4r96kwis40hv579hcs4c8inpoituwji7jsie8s9pa5uwia2c6k6afw5ehx3fdfeabnv5wr',
                name: '2yperj7y007u2tjlyqcv3bdhuoxxrx695i8djlo9snndvvolxkacmlkwabiyqxyacxuwfuxpcrhkz8zcivzqc6gjfy168cgihcwc80sfoq4ueagv4me8if2vtli6gd8yj3jgol2lb7lg0lkwoie1mdaprna98bacb274vhws6uqfge2b48qmx6vz8tpd2rnrzex9j7eyjbr3wpolm8r4ll2190vzm6voq1xu97xwqkhabj94fns0n6bsqj6gzpf6c1v2g8pehmqhpew6xcvf2m2x813hf02xqd4chlhp1jxfg27n5cc6rth92ezq28aq',
                parameterName: 'umr0bzodikp94u7qxeabblcxuwnjivi0nt4t6j4mj82mp38604z2ogvrffqqz422ieajds0d9my7alvzqbm0a31d8d9865u2jvdhsuey4d3j0mg7mzv0g47p7fdjwhg4ytfwh0u2u70juoo7mx8irg3xtuaecjia5oj2s6uwbh7m7ir7ty6s21f254l0k7cdotjnpipgs1ekwa6853tynslib66u5hav484slod4i1bq7pzivfvotq5jpn77xr25kz70u0l0pwt0l2hy6r2pppve62crqst2xwjoyhw88p2c2yjvj0fxcaltukui5s0d',
                parameterValue: 'jgnxtndj9ps22j289vltw8w6s7wmqazd4h11on0v5kn03y90c9xu3prqsiwx8knqex8l63re7okq1i8z4ibybjedwm3d7n1js94j4m1rxs4c04jb37ngnjn2pxgu0fromvj64p72asld4d1wh8ut3e2tl5zicy5w3cqt4tirxa6ofi9q40rlxq5huylqmb4396801dok82xpd0xvc02v32bvh2u0k75iknk8hvctgnuc0bqyz5i7a38y91oqo2ko2lweeuffwptm2hpl7re2qj4vv5t25jbo9b16yan9u4dj1ghfzkxis0cmsugc3hry7xrdrzj82atodn8v4izzjhvn8iguf2g9sypmvtbstvfjilpzigym424l2kv0lgwrb0jwmwmqg9s1o1uxwul08w0gj24giu7m9ogfrprqifi7gnyqaxzb5rh25wtqudxrem91rnc359d3pcn4f19a17oztvqhgdw2w7gd3qufp57fs7d23s183flf8shb0b7opgsh0e536sbw33piluqsszyudcz5r0vncqc2ahyxa3uh46ljlgcs2pjzs7pw3a52v3eawg6sp4d3jn1eoof96c30lea6mratg2t586t0950mxp9vadl6g00l44w9ic80oaa856h558qwx216jfbdruutm82qt8xisj7jp62gnkp1jjqfvnil8pwdyfnhwgyl6w73o8qod7bgxh4eyl7f1ujhyr0clfta1gi13jk0yao1qocc5tkf4oro86rpe8de9bpoveqekfjd7rabgvijn7kx363w9rrbzbwlteueio9by7s7tg189xlypuwz5ccj2rk2w971j5kcaee2udrxn499guerb4viilabx77fe53si9npqcrc2qof7rzxpt43fmaj7vvo55s18y93srvjrlln4buwj8jvqaiarhrmdeic1nu89oy5cqdku46un3ccn88odq8a8yxgzovoizdaywn7si551il8jhdpxsmi6pqyicu9ojo3eg16p47m3rt1',
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
                
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'r9830kjteys348om8dfvtjzbilo7hgnj679c43lagcve5qmfpl',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'e7znbbrjufd50vfyj73n',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'c20utiet97bfkhh0j52i72kfdd1lsnduxtoxrgc5fh0461t7c58os9jtmyf9uj0w0wmi36te5d002ianjpjfo1pkx8dm4n70fcpuvo8j4ssziaoecb00ndv2c67t3ig18txpm4lc04kc47rgd35z1nwpttr066oe',
                channelComponent: '0bto38g279xx9nrb8h534gf14rjji250ef7q18k0w43kh4zxonh1iewx71hinqzr8oal12fw06c4sp6j07wl77gfs6d9wotmickc6xh1n5bb6pd1t37deis7kwzmn9d48aqa5qbzrrojg7lrvled8dmkr66vi2l8',
                channelName: 'x4iyc9rdbm25gkglhylchyzbyqn920cdfniv3ja8gwfhrtheo9qo7p8b8sameq409zoi34azzexy3aegbzolmruyspwt0ywdjqa905lsmuhmlf20hi0di7tahdfrmlqw1cf7eti53ytzlrk2nh42wta5irwf6mbd',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'env8aem8ngzi0vhhixs0u4u24ct4afywe1435bed2jbrgqf3nsa9l07jh2gujp7hgtilzsurj9gidtp9i54pg8nn2ejprj13qhrbuc29t4284r2g7lp227ryav8xpeudnyxrhvtzik6srphkklob2yw88rn4oobv',
                flowComponent: 'bgzlxmcd6px9h9r88tc6lpxx9rt6z8n6c06xhrbr2uxtouejuctf5l6zyqv8r7tm3wj1cywi220o0cupmy0bpgs1f73cgzm394tfwwmbnbivw0avuc3zlivplhz2x8hocxel135sg5xvnawm88rt9hdhxdkxqcr1',
                flowInterfaceName: 'k6v9f3k2a0lnq2y2caymf2g3u0bapypqemi09efbuu9rjyr5z979he9s5qyiskgpeqnvcblmt1fxqekmm3823rdtzveqg7k41wiai3o62ks1rwkrfv2qjogw0gbdjjm8lkrd5mfpgjvs1hyjausxu3y1y6poldcc',
                flowInterfaceNamespace: 'kmgd5qzu6wbi7ymcg5ajn659lqv7f49g3zgtseg37tv257x1tqib07y0smgn2oszjcowm76l0gxp5fm1vgcsjyyzo2ltq9qylfn0apvisf4kwbrrvfzi818w72g5u3ku82ebbk4nmcefgpzj7mg70o3zigcaofmx',
                version: 'qcn5j4466v3ciucpufu5',
                parameterGroup: 'u5ed22rppbyhddpwuk0iaoscae5r8amz7yacqh4rdiuf21bvmoalyouvlcldc9uifsv4rn38r2uu1x6x98mowym2jeczxtzslvs75dtb26qu8p7lgy9fi2ztkq4tnfw3k9itg9c1lwoddee0p62j8zqvs652zbe1itx4flrar0qmx4x57hytslbrjgd3kkby1yo56ch1t962o5uhirlnwo3kxnhj0m8ax9gr4vd4l6pei2dx9auuvbuqztisu03',
                name: 'jtznfj1dpb8469zo0f541l4dcf6qpo7ijmh6lzdgr7j9xfzusvq6fhk7w9zorkpjzvlhm9cbt8pi7hf3fhcunvj6npjehp65sfpmlh9pkppmffkus346r9s15tlld5p9yvp46henhc0vux46h6hss7a0ejninv40hnx8nrbmr0egvj6zmvp6121ooh8so7jcxwzt4kpl1y47eaxvpmickr3dthtfebekopihmigvthh46qzv9spfzeg6omxhq910r4tt0ge1m7usp7c8wsg2nk2l929er9jkoxwbwan94nhv13nykdy56l1xhegn7tsf',
                parameterName: 'sgl41j16qx23wbratmfbhmyelvupmjgw98eerkuch2m3ont67rcsjj4038lfp749ix2bgc0anfm9vf6bzn2nu6s32sv24q4qn64ph4c4im5coj25j7hhtavtfny8dxy8zdfek2xas3bm2kt2shstf6xfqiv7xkh3bilbqcpszvks82t8kzvylkqd0xhn9b21pluzw7r6u8rbu05a5fiip46iq3jw9qqxzinnwj28433ta7au8r2c502pjit2xvwbi8vhsx0ny2a5nlrudhejtlldabj9r66p2vnu5w9lvftnluky30sc4kjq7lx2ll6i',
                parameterValue: 'u89146txwgsaxp07w6qmkx1452cftz5f9buna3eit7i7ifnwpkl83hjl8yzsqgnq64h8qg58zea4ysxoor3xzzmz46wfsj8a5ld825vfozm2utyxi5ov995x8pwvymz6o9l4sc3jwmaykmyr8rvaoxmdukl2a6q4o88wguid2bpi5oiudxolc4iua0wguudckxe2g8s2cz258db97xryrks8uwsg0d8sb88uvad23x5mb1wk7fp0i7ojpl67fep9nmbb2n5tnqsllpj703z13m7tl9h440s6yxxop8xlt7eqxjoup5hlu4b64gbmv05hwpuvzaobtsdr9r4wkae2vwpmiq4ophiylabgt72on2kz4turz2grgms12fv9to41u3alf2mgglneklgbxrt3p5nw5fesp186t7x4rxs63ghlwy1p0k2acamj4mfiht0ii6jksg0wrqlchmu3r7ji3diw2v6p1pf1y0ep9vsv6w1zp2sjwijcjz8a74dthhuuwbv92kym81fs8vuo547eg63meb8xts9c5g4k6tsywqjcga4yx5j6v8r3hes3qbn5hggd6ucqjoj4yu2ez3luvvb8jnegisigry06wbtnygb1tczhngqixw0ttd629cd3yt4knp7eu7327mbxxjpl4r4vvhsy8xcbnxqtry392h48po1852q5i6oku51x1u75xxivq8j6dyndk1hrra25lp83sb7douhqsd5sw5snokil0y61y3bhi9dssvpn694elxvzjjl02t8due62w6tegm6mzqfbhe0dr4r7fnuu87aovly2098i39hx39ardb5948wod5ixzd7e1e5wzal39d6l9ow51bmk5wbm08f3mn99qsevpef6a0h57g6qwqyt34fci9c20mrf29farnmacb18yixzc3bm85j9rbueor34zeronenq7x94qtzxmghq4xsmi5g4bfsuniykb7j5j5jlk6notg9mof3xbxxkjmb8hddm8r48ncsfb9izkimr',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: null,
                tenantCode: 'lmcdmva3987ps7q1w6oytpf29ihkx6y3l4i02ojar0rhm42t7l',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: '7bb2btiw0ny7zare9md6',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'c94smmdt09wh5mastc1ajm76vhuqv5srvxu1g7hqh58ap4x2q7gpi3w9vjdw2mrnl77v5c0koglwx5vjaqqstgyzuxi6lo7k9ulfwm00gjvxukyi2nc5jj8m4swmv6th9l02duxnzh5bgnxddla15sy0gqx12973',
                channelComponent: 'c0u0mc0frhn9pzuzopej0a1w54zcd49dzhnsgh7z0714lfiyls728pa641qhsyby4zjg4cde6xuey8xivpf9k6ywmb7vmqgv5n5aygr5rfe7b7k7b6ud7oenia3rpsrhkkvvob8pq5lpmt7u10m0vo950jtx6kmz',
                channelName: 'pcum1ex057d46hfxi8publs6j12zx0zpe2ttx747w3o9h8rrrm531tl7i2q96g6j03p3qyapwiss5e5tdspebj32lncskscpgjauofy5hf74ypx5rdgrlvtcqqlbr1q1qdh6whjod3kc2jyghao8n3c4hz089yti',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '2q8b9o6crbl6ge49yforjnm1hk64p2mb6nzpp15086vnhh9js24np3bkworj73e7pd8c321yyibrux0k157pf1shuqjafoqz74gejn9nw2vp2o3hbm3tv7omkcq5xo1r57yidemtrex2pop672frmsky7rgzquhw',
                flowComponent: 'kw8okgheisu4g3c7p0ynm767g9jmvmabca9o9rmwv605m0ctr4ghd0pw1wffoa7ym37m99cxwi7d6u5wuvkdis1v1cai1ntt4drsrdg3rq2h9qs6y8wtwkp20xvadjnibgvl80y36fct6rfeg1ggdglk6e0f722m',
                flowInterfaceName: 'i8yfte9m7urv6a3mly8wdee3z7cu7cj9k9iwvox6t3p7gsuvqbaau5hqq6rkige2js8a24qiguozu3baddjjo1oucdaxew7qdvqu6vp3hw06td94lzobe8j9cphafovmzb0y6o6o9wcrysrbw617tjp0mhj4rcrc',
                flowInterfaceNamespace: 'w2c1p2p7ogag32yra69t6z0sskq9hnqs7ztyh383drxh1p32yl8eudsrb4neka4a9fl59aviuf5dnrpuc1kne5r3aee9hv205qqqhb9asvayocre7ly3s6uljf5b7fgu0eml3lx07b995ehlfwyusi6hv4lpc3y8',
                version: 'i23zkb1yr80s7xvws373',
                parameterGroup: 'qqkyeka5h570np7s2dzdg4jp4bv76uy1gubt3xrvdik27wz9r9863n7pmf0d0ip72dt43aiouo3pnuy5ouli7xglgu4fd9w2p86c1ci9126feyev0v8kpn20kedd6re17jowldq5wttd033ncsf8d0w31g5n32ngiefo3iev9on8c2u05qlpejwmssu73jqoqvxpzlv1nrmsf3bwww166bapmy1yeb5t0shhsbtefl8gf924uxqk8koubz8ji27',
                name: 'f344aggr5v1ewmvy350vsjs81ge411q53sy41174e2apcoefjyj1jlurbal24l1m62crvbxeucgs3s7m2reh4as644juhv669o7fdoftijyq2z1ghzsj6gp0a1sqnyngsm1sr0wxue5r7rqwx4ut1xil82gxnwas6aqe10e0xl1nzgc86b4s7zrndos5lpcy19aw7e9cciro7lym1hkq629otdw0befjlsuc4ywqsmqa2sujcf9f44f5x9gjayt23dsworh79hwdn79jsf1iw8kd3eu6ds8l8hkm6narlbnbeo8104z0jw2qnctuoui7',
                parameterName: 'wv2f8jx83q04c27b5gymvu3dp1w4zpshwiv1zb9n70lvrswtwqtb9ru9lp3uv073n5vg52nx72a1l4kf69ebjt9lcej8f1uh9s574ajcp84gaimbd33cnr0xtwnemlwgqw9ifo850p43wbp9e2sfntlukitwy434yv7en38u2uhgbdj6fou5gc629y0528x0uy7up6tkfd8sa4ntlrapruqxvz999r662rgxh4f6kcvm3a0qhzet323jktzzetiqbp8bek8d9y4sqtidyjyt6hgj8cq2mlvo23lz6xu1ogq4fq06lsndgrmrx95zw0j5',
                parameterValue: '1cy9zqgn7vcncrzbojt3yte2xcri4mwhzslut4w8ygylc6kqcl8ckp4sk6f8vg1w1amehpauyqcf13ztqlbep7kwvwypaqozkimi86nfwkglv2ljgjndc2hzrzsghbx5hq8zxqqbrl0q6ocp7t8rjz8fzj8skxcoyjap7ekw3qzafgu56mrn6xq440hc82xjp6xph8y84d0r04d4cwzzau4vodufu8ku1zzmda0spj4glk4zqlt0zvhr7g55gbyj8lb4yjccio8et6hvajp2rrm8dx4403c5qq2rrxmb70y2apbjrwn000mhj1fvhwq3z85i4cored31im8vn7z936gclxf1b4lc8r5uxb1e92d2nq4vts69p97ywkcm398yy9edrwoje3neszhwhjo68t2lvj2pq92a849526d7c760g7nydt2wj4er8xql7rl06ecavaxkkpnlf2rzokrqwuuf6g37ggo4uqo0u8efa5320o7xoyo4jzf8p4s7soslv92gkm849ml5zu4o3i65mcv9ckmaso4871kenof1m08b2hg18xuea77zkm82i9c4i6goiytupefkocopx396c9ye4o7amveky8vskgx9fzs5161xs6webb25amvjtjabcxguytzyc6xlkczv52ga7pl4qmkw92ogulei61wgjxs748dtyb54hbaee6udddd3jkeubz205fzpiui2yjqlawzwi4ln6u6ly9hcv671qkfuaaemkl16y84vl1d0nkwqyv3sg851yeqoe5ajbry2aofhbxw30vwkhohxb543tnxhy1jgz2pwgq6a8sf79ddyhvsxx847kyz94ooblso7sa21os3b8o73i4ahebeqrezaag9lbrdbjaymv0z68d4qsbh0k84elgnx6vs6xbtljqwfw2vii047ztc2jk29p9gu0f094v6db1nlluk0hkouadr9a0ccs4cjntaydi3yi8s842sc0rik1saf18pna273oe2ojmqm721ihdiynsyu',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                
                tenantCode: '5kmzem26ybnlocltsk3vbyccmw3rgcjgarzcrvarhd8agrfjxx',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'goaq53936q7ias0om2r5',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: '78dn1tpn1ii7op6moptnbyrdjxz5sg3gwmeb301c9qxjnykw55zvfnjcgzfaiid71748ggowmssqa8q6zf7rewq9asg9o51sfr791skk5uqpb49rc62rzj2hlcpah7zr8qapwaa9vllj7b7e1eevy1hhjzxkdfih',
                channelComponent: 'fxd2nsq7hpek2y67z7448pvg5lebz86bi0xuson8p10pxf0p994edo5rb5qcs18x4thlulwegmornlz77loxfnpdb0qfcpsg7ldjr21nbequqie9t9626yfozl1pads0yk0530zdeoszbx323juvo8cmk7td518g',
                channelName: 'klupe8p5i9faqg64adoatreqgnygifextrinhggv7s1fuho4y4jdbwsldhkd63v0rkqiizbfb83ti5bugi91pwyzns5x7wbneb3k7ljfqcn3e0ujc3c17dd1cg0apvvok8t14fhve945o54af6l00keg76hdbprn',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '1cvfcb2rmvuxbewa460ianyhmveeo1jkd81i8phsl0otahm8qwep3qeop0qzdi2k9rhz1nmzxdp6cuu2dkszm1qae5maomyxa2bep7jr76iyn17kxfigsxvd3cpjjugakxsctydr1h4qnll7ub86zxkfax74rmvv',
                flowComponent: 'ariuywofez5ztd53nlvwxmkj4zoannd1ziwsvo9d06qzi4ihcl01694ghg0lcnx5xx3k2a842eb0q2exg90qyr98dhta02j770v2hjjpux4atx93vbfc21tfdhch9hofoi6wvrey0o2pb02hc38px58fo5t9n0j0',
                flowInterfaceName: '9exp789xfuwweskyxw8i5aq0q5fz853ff4v8nu0vzj1206yi91buoxj2iijj57sqr58yqz5bkzytdv6e99zg5imspswol2gg42ab56s6ze1z4aj2hz3h7if1w3qx1se2ek05j00zax75h3ba4t1kt0gj463yd9nh',
                flowInterfaceNamespace: 'k6jpe3v6it6j8h3bmlg3f67hnndlkiotjrh1bmec2vxdo7xceafyyemcyzst31ur3yyzs1pwhxe5euvdavfuvu5y99ezu5te5i0j9nhm8e77aid1u4dgzedtc20rmpywyoxo6qezb7t26uxgb6tx2o7xi9lgop0j',
                version: 'dl7n9wna97g2qwcjmtx5',
                parameterGroup: '8ebqx6smaincilo7o5kwxi22m0tlelap78a3lvny4wv9v2e3vqfz9vpgtg1ol172w87hiym8jrinwxqkhetdzp7jiwicupmhf5ryqnyknrk90e5jinlz7qni3jceu4rxwzw6rlmebrgnzeoqi213iic2eopfpokh56x4p7l8ibneogopx9xeyoksmf2m0t2a7lvylxiv9gswbc6boxa2v1e39nref2vv3rxuaee6nihlp7v0ukj16r1sh2m51xb',
                name: '9j862l6d3t8gll77z094mx3jcy67a4j26xxxf6e8z7k5oh6wkfzgkctjqmuftr0yg4xo6l21898n298q2xl67ig1oyoxfs8nqsdtoovkss62ypiommrr9mn8vo5nskqveq5968mq4qtoyugtk5q7epk0hkdh3nnhbx289egk1fui044in4ueqqi8kf68jjbg6501smzaifqecp1bruvcrqpo1a6zxb3wbfoldj4b9c3cd5qllqmdkkwganhodatewomj3k5m42tpzywekah2pq0lvx2vjgbji9xpmh1znnt28y1tbz9gpmfv7dahymyl',
                parameterName: '7401srtpi50l4tcm70b09raxlupidhyaoo1jrcg2k5e2e4wdf22iwd4c8ky5hla9b4srbchk6kl40lwgmos1xb7920txgdwlm0cy287v03apumwcxgdrwmeh1ly48lmpkzprkh43ffhph7no64od4kbpyd6in5vztzp4ux0n6try5iq7tma22q97yp9ynj50dl9q0is4rwwyyd7myahkt5hp02fpwv3rx3esrjhgkwa4a8w4b5fc483clp31w3b0vhdp6invpd39nl9rz37vmfjzt9iwkqpv0h6ckxol0ti8q71mc6evs9ta7qcj8hxt',
                parameterValue: 'tqek4d4by3ue1t83v85vx7nch5q7noufx3oadt0jlkstlzwa9ezviczvmzgothntur5k2hw2yvrrokmoes0ep0t3fo5ykry6ten55dftzmqsurvq60cilhxfd643q8iu00cyk1kxgokwmqs9gtlhngo80y1rsgukodmjz4sod60ledkmc3mht9ypvlu8jwxz761i7zqgkpu528lyq8wctf2imp1jmvqpsoaozhs3g6ysb6aomv7ubjzuv5r00zhwlkgijgnaihguv4np5a3d9y8gizavlzq38isaty1pmbkvfuz21jk728lifzos7e9bekr130ft20d451jug1kyteiaasd3s9p4i8ikujdzh67ldv81y3cei48z2sunbztbb1mpxlx6uyc26e1kkprp16xe2q09c7c259vkdtjxz34u1sa172nulsv10temiwdupg7n4r2itzkdmwz9nl5s85y66nkr71k0k2a0ptv3vk0ods03l6zcwddaphf3pnb5p52ify5nokavotoo2rplsb3ztjmegpggktb5pp31bwxbhvbi3o7wnonsjirui9ah1toqxdua9nmdbm8mbsr3q0g7954i0bvcdqt01dzhbg90p3gzbd923w1d1nrjdr5zv9q4q4t2czkr1d6zkxrwjzufaj12s6qd4u376hyd7qh1aq74dwcnc917ex6jzyclmc3y6w3i4zwfkn33ghhibh9y4vsdqcmck7rj0lrgrfzte2bkekej5rzjrc3n1varm9eo1nwq3mnf4n0oautvugt4edn2maf1emrmpu90s5uo69owha1qh92bt2ajo2ytkw1wb11m930rfwpxha1obn257gfsofun4sms7wwa40dcchcj0bfk27bg9utgpjj0u9uniu8xerq7f5eqlo7g4ko5hotsxx0qjhw2526qniptr7c7r9oz6yhz745upw4w6fd8y9hwvkl04p8i5rwcnj36rf29sn0zj5dsi55128a7jw90pecufn9kfd8wra9n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: null,
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'q3i408dcsd2bikzxv205',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'knx6n91ksc143gt5fhmbgjh9dskohab3uayk04opplq0av6gt7arfmytrchad09xzpw7ijdsslytmqq9lvr2q4udxjvyaw7yzg3f7kpt4e8yy20we6a82wjhcmlmiuwjqieab7bpeno7y24m04ml4217cksmfne9',
                channelComponent: 'ahkjtbg9z4kgpbb14ia0d8ck1lh4kl7jv79c50b5wv147mkrmpyspsu9cnxp1txzlhen9wdr5yahiv3svyal3i0os1rdvb68dozg5l3jq4dnov9jx7si1ew7mgbk084vutmj4sbysd94bnzs6hl23hogvkzd9838',
                channelName: 'nbiox4oqygg7ccjgp5596pr56bao33cmlaahc2humuubahe1ejv1f0v8x1sykroee67ya26dnpl69q5qm75x98i9n8mjvtti4dauvqdpyk5y949j19nuoe44d033cgwqda2v1iyrmqexvpp3thvrx3ppi14u5oa7',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'xigr3wxqb6j7pphg8mx6nlmmn1rsz7fr84rvzdhe62j4vbftlew7zhqlji6qtije3kw5s4w2lmc9tgr03oe3nvurw12kxjjn2nub44lqaeqjzgagqojd7q53nudfg6h95oy1tsob3vc0vyk71mln37slkjcj7pti',
                flowComponent: 'ozgbv60ipqp0q5s7fpqbrgq7fyyhb4pkbf2tzsxhpsn2j39z5hgk4wzavprcwz1dlh84iz07lgpumssmwr32qy8pucfg7jjhdp74w8475xu6ot9m8sa2xvislfgpafqy9vm56m6k0cbtesnanr2mqe66oyvr293q',
                flowInterfaceName: 'kx2p55mhpokg4g21y1ep4i903vwxuzknk078zzy77netmv3asbciz20pqtlz36c30wzt1t74hvmjbdp9narl0xyh9r854zjvpbb9vfhnsyon5qyqygkhdjgn91fio8tja4d5ofmzyakb2jk9bka923pwgngsjhp7',
                flowInterfaceNamespace: '0vlj34jon9sto25nwbq7on2t8bszkd0ibn6bgc1l7f5plwcsmda16uoheegjly2bug68y5k49wlq42ibift6q7kh7owmw0skvp8dpyk06r4fdsusvqh3z4lydrosx6yze21dzaosnvos7wafyf9ylusvcc2ankpa',
                version: 'mse6k9dp5ydgce4g14tb',
                parameterGroup: '9xp2onh6787i8trs3c0bq0rhwawovc7pocjj1r55vl0hs69evmkcsmp6fc1jqh18o678ofzor684sxq0achrlribhjaog76vahv5mcgfyqigdz4aulsbxh8jg3grt7bjszeryharbz06ezbzz3i70hheidnrprw08fq1k3nn1j19btwpr4zgfzrwk0tg18b78qfwv471flo0t79bltbr07u25pexcvarbkyvk0r5q9yafw28qv5dgqmueoeplwz',
                name: '2ll8e8j3hn19yyamneu5uh0wwnqmhgz6oa691r5pctko07tc4ki5fe44drkjeox6552owpkrodjdm0mbt6lhge4ra0gj261do9pksy2xre5iuzb3qym3rumeo00imabncqasgqvi57oj0i8topt7h0k8vvg4i8vxj5fp5psd12c7k22xrs3t8g95l0o5u7tdyl62pojt8lckm4vmhhv133hgignwwaniws0pm2api0evscarlftyjvoxbk5f6mrgg6mg5sdqy5vohfm8dpzrg6xz7zrggq9hdk3uk27p7rofm91h90ftx2q3haa8yxz9',
                parameterName: 'ayoeufy6pmb0s2q44qc5fzvmva1u1zptjledhk3x1ezh52c9bvoin2q9ibil7vaw3yzb4hu2ql3jq2g76s100iyayvjbx09mmh2msb95q272g3vuggwi8e46npuvpjulhknch4106n8ef8238g83rqh67jk3fm5wuajgyw6sj6vk5ah8cxoa1yngfyevbrgogd9t9y81xhtoj4m802jdzefjfwc3qx6a9j4qkc0ddqkospg8c0c2yojer3cl8t4h13iunnapwy2jefksxedmg3c9rb2dq87l1gtlivu37k6wjvujo9qfk29qsvv1zlas',
                parameterValue: '3024wzbsfbrgiqfmrxghomhtzu1mwglssk4w13vp4b94msom70jeuezaan8olkdq8jq97uu497qd4orpb2t4rsul1ohf0zqrimsrsmp60ukihkssanwc6krym1bq383htpb64alqlmzstoco3m99io51bb8h49xel2luha2sxnz7j8exzlzey9zknnl2q95t5so260vlidrp6oi8fkgwjn3h0dewdfquppc94ke71bpc7m7tq80uarbvz2suburcn7j60ceyk2scmsgw35xrlteu1qg2ae9x6s35yyqg1y2xf2imln5avytcpgoi3abdv4xn8s6by6zvlupzx11s59kusd65jaebwv56iwd9adjxtn6bqbgk3ka6omdwg5mosx8iprqsdbt4lprojdwzp5ynkny42px7732ax8appwfm7mb50s1njapqexzfbujkwah2g3zzt9w1wis69peb8dta8g9at4q8e4wcj6a70vsqt6tekua57rjszasl9v259omdrq8p765pyhbgvvfh48r2xxpk8m2e78wprlvyv3e2osf8eo1eshyynht7p803cl2kjofnr6036duq6ubuthx5f8pjnk7t71o5qisjilpedyzeb9by6oijlf2u0ucr8j7f06o49qfmltbvd5m52ejd5la1yle0lffhkjjv9vlf7hpl1jhe3a65fhxss5d3oibasveshonwhpkig9o2w0gli9gjfls8gb2drrabcvpxc73khj9p2rh2kg7ldg37j3vhp64wmwbeil2kyymyc9d73fmbdaj62oawqb2y8wkiqavtlmct966qjvxb1pcgw6j058n9ingmpmyfus3857erokaw7rs63dahpq1tppin9ubcpw3umtwuonuwdg5aipq3g6uw506b0s9wy4cu4n7dh7mkxkxk9j1vpitdtjb2yrm9oet0e4bylhp3yqrav6a2i7d53c2q1gg5od1yyrfg9a069zdvgtj3iedp38y2l0b6ngv2t1fjxp83vbcx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'jey0z5x3lrdsoojnjbgu',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 't2d134j01m8ouzry9hdqka9uif7soqcilsg9uoa4qwizaotma9s2j42mvrofn6gt2mcw3kr8qp7n4d9shnvmugz2sx1ohdb6u15e4v08im29su0tle2o4rdg986x0twu03hwjnj7bdrmlob7l5utkziehw0v1ze7',
                channelComponent: 'sfar4n5glld8025vvi8806jlrsg1rf48yzdv06kluon1no9zhaui68urq3a6oule34gke8yh6ht1rsuxjrvpqadrj5cdtsfawz34827ngr5jd9dgvf4bfafqpixu7bjst6msu8ajpcpyxq84wfsj08hinxwcidb6',
                channelName: 'dazmt2a1jm8tbo5cyckx9181o6us0fgur1fl99w4oh1wcmo2g839122moxeag28a4tbzmd5h2uxg1acvd6vjug3ehldqact5m7kqhk8x18d0h5poqcu6k39j7j2xo49vad2tffsldpdxz1kn8g0u49epyzw4p1n2',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'plptqqja0fr2tfga3dtrcoot6m0pdfl7rd6epbhu826igjf5fndfagr8pk2zpjn73oyt74tk2h9qs15og1mrxblr6qhsijmakx0r3uvdcbqhe0enc5wawopfe8qhyl7jg2h5s9xhd8crzm8higirj44bgvpnypix',
                flowComponent: 'vl620wjv3iqp7fmqmxf2hujywkhfuko0sv46ma7fbk7mij7q3vctq6mr1yph302zn7zhme11ojn5e62j0wzqnmizcugj29yc8broigr373doxsvdmi67jo08h1fracoipdzj6mhn8zha0qxfvwn1ekrch5sidmqu',
                flowInterfaceName: 'yx2vnyw6v6971ox38ce0mglqtxi5frs9pnb9lakvrbrcca5x7lgmqralucs5dvfhqz2cdk935wwjdxji7icjxsd4ldo935ykj8qk7c4zgv3gdn26g0x9h632zgyklu2ywujy5b95e4tj1965j3651xr2pzg2302a',
                flowInterfaceNamespace: 'ckiu14x4wsek7am1653xd3uqx41ylxmy5jrg3sqwraue9zncx7p97cu4haw27ohtn0049u2kbfd5warxg7yzxf7f3xbd7wneetyq94o42d8rwofhrickjjd01n80rldb9hdt2kf5nuz9qf6x90eircw5lbxyerfq',
                version: 'v92hsh7uwfb3grcvwyb7',
                parameterGroup: '5xga9y11xvy4n1wlkmrrw7pnugnz8q47untqdubitisfj78m3tkvjq2h02i2h039bzegmi5nimip7nbivd1buhc68wknn8fkdcfefhepuf9kn6cd401muc9yboh1bsufy18y5y30pc0tfzxkzjc6a60r3vq1u2v8j4b3mqscwjtrqyi719y04fm6081wsbj0xb65zgko61swlaqois2pbkh2uhxwyya2o04903e8eb6a6x4ur3mwxdzxmupjm0m',
                name: 'z7wbzmqeio2hn0e3o9v131h64v2elnw4w3v87vcf6yre3hn9ratgvbzcs7pyk4098hh2pzyr7a8i2zxauvf2povi8klwcf5qw1u099bf8om7sj7u7espolso7ygwyp2f19ivoq4ff2z3gffyo7kiyspiy56mashbls51zf8hylyiyl4kv3ydg534spivpi9bvuqhh23gnenjc80ncdchui25hsslazn1s7c85kpedhmoyu0j71vjsvjzs899fojujtzitygrhlvuq43bmdwbha3qf5mqdiccz1rakcubf2tf52yaigb3jbsw1vv2kd7a',
                parameterName: '1v2cn5zeq7sfq04gz703ljab81zsqvervhrpi1i1chd2hdq1uo1xihwnoqwgdvr18xrgc142m3vv2infs48sq5m0c5qrxkn5386dutxwitoy705v1q3b68qhwuiumx4pg2b6ywolnhrbsk865c15jqbazu7frrhwoghau95uy13xcao0t68j816tazuxn2uico0ox3ffzl3jui1s5xs8zk12ifc4tgxqy3d5plbea255yiukyt52kzypxpvggvddtkicg3a71zld4drr7816l2gkt733p0eporrk4urs0qu41yj9zatod9yubqo7jumf',
                parameterValue: '7r6kvh3lfr222f1hjizby433mum3j359ibtwop5x30zact5t1ph8zhsqwryoyb2ru0t5l0o5epkqqkp36jw6gllof1p7awk1faya13f4cuwkxc62z8sippsi52uguhgfvvkqwovqcohlxytu1ptbhggq72ljpqkqwerh6a2v29u26dpf15gs3uuwkqmdw7o6by1dk7or3vd3wlxenapdv25sad33tv94kr0fmfi6pe6cnn1pie8jmspbkv0yjqmcds1rg3xe6nfwcolntzqcxss2y2mpsg7jdy63fsf17qrlbmilrg8azs54opdozkua593gcxf01f87hm7p5we746xi56lyukxofevv7pgvse02u22yjlhcralzormhbw52el1ht78vx0n45o20w6g2cdy1z53mtqqlv2wmgvah8fcwrh7odezlfeiqecsmipj8vja6bjm9axot1jkf5075v5ntj5tb0dj37mpsmxl4apirxpagfoyb9h6unloh9ws3t3ph0nj8zdgcbepgy9lxd7231qgpg7pgri9dsb4kljv4d5uhomapbxvbp77afuy5ex9qwh8lc1vakpprizmxubunhpfz2he1m01as9azbu2u81dnfeyj6ktt7mgca046ojgfsr7rj8bqdi2qpwch71s622hlzoo46u9humw4ka28b2lr34azzx0m0q54ofkrj6n09aohxvhzbscvxr6nk0995f76v5x7c0bg6ybrk45kklkfe0hazhtqg0pcyhaq8vlrlfpbtl3s71tgm92i6lx0re83b5y53x3fkhrvzy4j8730m5zf4y2s6hzi2vqxgvrh98tloh9c2ht43pacvvyeij3j22etxc4ej4xqnny965t0o6vdk84qp3duldxj4jfd9zed0e6bjtn6hym90thujd7vkd3xkctywfz9xfhsy1prowwv2tqy29arhtlezzure050zn5emryjsepdd318zmxlnc4defqjw3vec2ek62h2yobnu95cnplb7frz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'bqzwpv7dn5dq2auzptqoutwrqrvuee4mmj8msvq65m6akaev5t',
                systemId: null,
                systemName: 'sh2o4ocd8gclhj926mbx',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'xyakb18sut732qpsxwa25rwd5asdks47hoi0tptt0y8lpakz1l3dhdrur68qzxjx18qk8bqjy1rm2g27t9452e2jhl6mel6g7lf6vo4kbil11okta0k1y8ebwsxws8kh6mgl5bptvgtsupvj6uen0gtnimy0l705',
                channelComponent: 'c4n1fb5ri6gkgth856g12dzq6hw6ybajzz39i0an98aferi06umh9j291gzhl9ynv3zsh4gjjxk51ets5ewyz4d4vfpgk0r1r0zu4kprchfky77v3kxf92zlmvn2os8tk1y1t3vjl8nopumbcnctjnqo4qixmkku',
                channelName: 'xdbmtkdc8hj3tn4aex3rmnlhqxkxn2p4bmr83gc6y134k2sxvem56zw0tj0gv8mplcmw3ohi9l2xwrjhsg3sc91vczc8mpdz2f1il937wx6lt8gg0f19zmxowid0jk10wu9i2auw778eus6x95nhrp3svviciqcw',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '8facs9mywxvjmwzqb0fynai0yg0uheg3ny34qn60zyvd08fsr2xzll1gc350xsafd1nqlzfgxdjjauoshw549yjq5x0rn4sdqegt3nvmcitkrwlqo0ujkk4zkx6r547aztff0tg28nd29s0kp2j27ohyfuv4cntc',
                flowComponent: 'lmb548dk09rzhaa4mlr3mfdotdwptadjd6u5zw6hox2wt4zepfcrqf0nggbkhwa2h05gyd8incg17mdflcqphpxdhjemx1cgxzslhdzdszgsiw2xqz1hgh8gvwytagf661jwj4ez7c65q8ka8gdpa60l3nlm6j73',
                flowInterfaceName: 'pbg7u398f1p4ihkal9vwhog353wvuqox3o3fnngcrxgewlfecnvzbwvawl0876ch8zs785fwk75pusukwaz25v70jzp3qqkntm9abz0xkgpxxbadz09dco4yz9yiffcnvx5vx1mztxv4y0egyk3icq999uh8gm97',
                flowInterfaceNamespace: '0054mi1ym2pcos2jwkyy5ibr17m376dkwykpdj0wnm3n3528r8z1zxiu56gkrzlvvvasxp2drpq9a2gim5ewt7ed0la8aomnzx9afosn1m3ahiglorqa3gugfborutghcyrycxvlimtvoj2kfb2hhmezxmj2qyuf',
                version: 'ph8vtzwlupjbz11cwqxi',
                parameterGroup: 'dd3in6090nx98icyeqyun75lpwj2215fwkbo3o21kqdhnvt4qdlnv0j8kp97v5m45icivdz6gftv9c076n6bllu5p65kkn5eg2cgub4qt8g28132cmvcxturhquz1ffkz8vx5pqqm14z0c6t8sgaoyefcq2sha87xr3ogr9tw0z3hv5orzsycgnu65ms2oc9tonyg2id8qufyuk4repe7b449127u0an6geqebzo0y0naxw1p5txn3v7lf1dj0n',
                name: '5l07miribfqc9hc0rbeqkdw0ch2xkvl6c9uq14r6ffjtf2s4i5xbhedcs6oy87gbbx7e68nt7zetk2pb7z0d1m6dskdeyndxu0w0xzoxsccoy2wn1w7jao2sy845ds7e2y6nyp6kabuepiwb119dbdh4skmckb04dxxqszxxn8xb495lwiilina7s0cg3oy485pf2uelwci45trz8woqwo39iil9wkp8wopjjlbz6lf2zxac563k2q4xyhv6dul2c4vfvpz53w8hlb46im64flkivrj9u1pkkvfyf7lgkeel17r09a2fhc1uonx3kb3g',
                parameterName: 'bjhyjy49gs8wynxkbtc5v5j9javs7qqd23iwr8n94zjy8peeumwten1jhj06do79ey9thqd19u32bcdfbr7hk91pweizycah698rm9gxso0553xnbfp9l669rpki9hrguln0j6khseobu2xmuvnlv2evjo0s0vftuynjctg23nka5r4lumhnf39x3dv5l6nkq0bn5rk2zu3bsxvds4awfg7zfdxhg0487vzrlsth9mz2ex4hpv0yl7udx4h6kcu7e67mp5s9wfw5e6jc5urwtxd83wpfkmauvuwguh3sok73nhdzpa9mvhx5h1ckpwl0',
                parameterValue: 'cmiyf69ij89yfs6utfg4uhajonldim5vs8ss40aq4nf4k8vysahjce0k054yor6to3h5rukuu8eto8kaq5alewah1dxjep6bkyz41j585jd2j7wcka5j0olbkscpoa9je3rcdbpzcg5qdwnvt46kxofgge074jueex5721d219vz2hov45jlid65i08rvp25o4v15b7nxcc0cv46l7x1hfjg9q6bhlu5npadtp999p6x0jvvpv2yrbyw1ffn6pw1ct9lhsrfexl9fcndu3udint6lk7s1usfmg3cx6seblmi9zrkkvc34pj0dsq5z6hk1glgzcopf66t6m9qi95xpcc1cefwq5q0ajku3kc3gqjakzagsk15mof9az98egy9v36g7bj8h0c7xzs61rz96solpm54a1py2ceqjuhp3ews8dxxai2taydjjzued117aqztjionmzf4n89xkrqiolm2jtl1pck8x2lwivq5x706rlykt1ed7i24lqd0gttxnitap1n8sfauj3x8dh1jce16l2uit640jc6iuve5lxd02fx3rnx3w4cim1tiidq1wrs4o3ek22it7agkka2mwh9i2tpg8dwcifrtvqg71yqmuilmkw49e2wn8j4mfjm0wp8y3zhplhqc9wfnl5fmopzw75ckwhogakq4ty118u5jajmjb88sqftxyunv36pup5b4ytwjlcmdhc59w1u5610rcbzngv143hy51xb9xoh37x2g0vsin11ranx4bgn8ab5xlcuepr2s9ec454d9mm70j9a571m65bsp4bzck0b24x1lvv99re5y80l8xi49iig6ab8ueik3fa4gi0mc6a6684xo4q1iepsn7v5he02ga3x8xjgcnyojtw23x2fzw0ux5g622ibqv1tjwkil6gf6e8m5ymw571ahsc4jesxgtux6dyyxc7emdj8qj61nf8mscqnwc82776ti75dpcrapcmg9qxsywto2y83og9dw4y6ndca120lu2qvjdmco',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'm7cnvnqtztkkxkfacnyiff29qsve4djjsgqwf153pm00q4lcnc',
                
                systemName: '8i8ccaf27c8vvrojvnbr',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'dcruc1g1x939djp2xjfg58xf11kvguhe6v9muidfjaybx498xyajunmyrujdkiatw4tas3b4wouyvdjsbptjqhqqla3gtqmjrxwbh6ii6fsyj9qd0tro212zd3vuq1ijoqvam1ekt0yug6quzhmn0rkgt7mgb9p5',
                channelComponent: 'pcw7776z6mwaj400oeo9ojsbrrjtc5tlybf4r24n35axox3j6g4a1g96h0am4n5nttc2m01h54ahv27vw2867laay6nc7gstar85vzuq95kq4aggl5znhi3jsafinuodcza2ea4vc489twkntga41eb0h0gy0w17',
                channelName: 'g0c67fo9fv0l5dtl31zmb0r8cql6l37lkvybyjk3datlnfx5ouog696o4yd37024t136covldu4mflixpzyyt2n4zqd9jhlmi8e9k0qh68b6d6oquymdcemv3jfzimm9h030yit2hkybe1pwojr2mbm2r05zvrcu',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'b8cy05guu1prhqkyk16pzebsxc9lebgewz4qwzgqpns418tw6qkguoavcubibmn8zofxrrr4tzv6gcb11bquqddqbzy8ljad98vw3h0qeoinv11fj6rmnsrp02ju2pc12g1sftx9uo7jxp5jagz7zkk59rplhini',
                flowComponent: 'dk0psms82pj5hfkwwlwvns3kto5db6o1z5l9cnf1vt9c7tafcy9sb8q4r00tomqcrpqz7yeov04f991le22fx5guyt2plf5i7blvzd1qmx4v283kjkrm6dlycny67krtr49ur53w4nnelvtpjlqfco6pprkiqkco',
                flowInterfaceName: '85279z1r2l3qszz6hho79unulal4y1ccty2d71cgahijr6zygn6nr9zqzwkccbe7uaeljfsqvqnux3wm7fsexiri6azyy62vnik9a7ievgoa9jtk1mzk49m7ol5j2586gnguu968y27o6v5h5503nng58fwtvd8d',
                flowInterfaceNamespace: 'coo31s9cj38t1cumjtkgrowmm100x6v9nt2p9onyr5dzzsgjy1qp0u09ehmprmiseeq2kyk2xy7ac4l8jxw2rn39pg4cn9mmooskbkracmxmjess9c1splp91tdb1ltiwk8nqdau5ggdzyhdx8usufpoptgc4781',
                version: '8nsommetxy6i78htcctp',
                parameterGroup: 'kp8vpg2h1nrtof4djeuj569ggnuxr0x71tju2lbu2njwuz01rxu798lkxptaty331mkkplemrn4cz0clvbv08n2czm54bormcfye9mcn88w8sa5626e023zv2m5ildtq9bn5rzo3lg6yk7sc0l7epe8sqmaz2qtbitl4v5vcw61s4wo299m9wj1qfa66ybbs4x4x9oezl7375vj1mj0u2wssa42lj469m5yrro4n85ra2r4f9tgzm8z5sy1khy3',
                name: 'h4lgmzlzoe6hwx0sbwbvy4qla5srumjgu7mg4z2hod1m6dcyyhdby7gzsdm07ncudr5iq6hr98adv8youeetrci9swmr91771iniunkr9zttvcajholgmpyxjoioixl1k77pz03sqph76caircgak2gtx48q08ewcpk0st6xcq49sr4tv56lt93u17evicqsh2tnkpetw7m7cza7h8cc2pc4bcuy7vw0y4j7ec3y9y2cl94wp27db6ipyebisysteuvh0qbb9i62o194wplysf2so54lfqn3xmf2b2xq9cx3caepqnzsi7plv662usbp',
                parameterName: 'gw56bn4x6ns64y4noiwjdfqkggwf71n7fwp2bsxlxntnyf6t6p8m6xny5892rr4pghy32ncdnn59870iczlyb32b8h64c8g2soymslqu4ts3readhlv5hbnfk4efpgr6vtacrxonmx5j4exxcy5f3xil2mbln9oexc60a02dheh1hgmz8y5d5eux6hq4edtlj4b93femaciq7dyrdr3t20w1ai0u05a4z8l610l6jgmfnsso6drl5sozskj797coxv6g42bx9nupdkaw6vqepyq8lymfitjrebllw935vu9ewmbxw8gfdwps2f704fvc',
                parameterValue: 'uf3wu04a76smu53dc68m1l8rhdv45fqvgxu8k2v4j6jkkm3bjd8c0jfcc6q6kt4psu2p4iz5rfh6aznksfb6nd36oe2vdk6frgeqda53rruf5gwj11635mpfr02fgxhsg9bn5h2cubmhv746r0i39s6f01zuaweyffsf8w42ggddtxw3jt991hubedc6lkfmu7zr4d9yylnbk8m1ef2zzizd5lc4t9llw2b47umj0oxxbvl1fu4z0qvdrlhckgybi7k2mxikev8g7bvaeu5hnlzy05jnajg4mexl5jqqu1mqlplnsgjz34d0lxz2gummhs0wdfbgfrg3hb5ohq3ems1g5hxmtw79bta0u0odloyeyoabflb2t2qejg4liamqjeu2h5rebcziqndssmn3b3qowdp8wjve1d3vl12672nn82e9ak46v5t2faj7hqhtctrirqur9vz7gld13keh5oej7veasdn6u8zlw98nrzummmoa9s6a6v3blblbp14ccreofumcayun96g7s94efuq24i6e67uo9inqvkuuyp3e27nb2dzfxwkzocrows7wi9nka3iat2qnzqfwhegmlyyjtcm6xaqirpgdnvppbfjalqudu140mglp4g5ajmv1gibo5sj7mi9ux8nybqo8yggxcgslcn9haw7fsbx7db516500ng6ob4cw7svu5eb1mz4pax6jqt88p95l6bidll0ioymocn7jlfydfe5gko0tq8mnxk7svjys84bt42f2k10a9kv2sfw10cou51fnpqj67aop6nxetxuvkeib28i1rcufl9m8lwnbmfikg1esplbnpo3oxp93wvijxlmlbjwxrqbu1biid17f7lqpha1pq8gkleh2mr6u36diz5u6slvk1bycy5p2l3yzjmsrhyvg3igm0ehcjbmne6km9x0m9p5xduwq06nqa5jhdbn5as6jomiw9ta9ka0zoi0novaf55h3jk1p8zklq85k3fojokf1h5x026tpmd2pwd6c',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '8s4nyh9fh96ei559ccheofu2vmagrewtdblnblwde60uwbv6te',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: null,
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'z8wzheccvdo3mtzhivxvnfoyzptakwwkrknwffy4gag8qkdganspluoz4slpho5csh0wr1l2dm0r7bs45mb2ro9yut0n5ljhd5nu87vu1usy42m9vckfy3kmryv85tgt1arntkyvtwbdqezv1q3ba7wz5o0tx4xb',
                channelComponent: 'gfj64d46w2dy7v08jxbyghmcdq6sbipz4y8elt2rfcoz0lfjv1j1xld372zh8l65bhnzi54mlunzsvvx8nmtzmyqoye57jzzfnjzp5m9qzgvy46qqtyg5ykqzknqbfasjkawgbwesxxj9migiby5udwoceycgeox',
                channelName: '3ilmv47klw4eo2ey5a9mdrdog1y9h2jg9hy7j9l4v4qtzebe0mp2wby48v0rhh8kn7csjcem5i5qnwbez5a6185y5ichkecxucm9sqp24vh1w1m2v5z624oqsx9znmy1nioagx9c8ebubikryrr4xjh18zsra0g2',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'd253og5iv4h2fcjjbw7vfsfv1r7v47icpqdcwm2z1cjpe2gioetrfuxtrron6t4j46djnchfjy9ac9xt4bqsutf5gbb9i5vf1th187lbvnjelg3s0gg506f96xebq7s0dftucr1icftrrs9l3c0dkmrrarf7vh54',
                flowComponent: 'vig8byrdisf5ezdbqzcmqsy2w8rv23acx4zp8scwaffcmwuqjnrczhes1xbye38avnimu5jzbgd8ljkisbj45guirdgsao50imxvxowo9tfndrhsprg8ekb1lgv5gvkc1yse51bvkvo2byj78587ff1smbi7gyyh',
                flowInterfaceName: '1z62yjy27wojp5m9o9ivue7rxkgagmjq323he9wrxuypob7kqryko25l7ihn5xxr7raj1uvz34vm0q5fn5hxyxjifvlb560dpdlc8tznonyovuf9juubv6pk4dullu7rtxfg74qycs0msehxkma9unu6kcqrl5a3',
                flowInterfaceNamespace: 'vyl9hlo1tz7qkw8nye9jrb26m9ib3bpk1t2qbrb4lbtzyenr45zoaj03p7ig3m86komos1eh8w61ovksjzdir3lkkf7omotxz58k6ch7s7gwfzppxdha10rir5hwytie12za5hcysnqgwfcweapa7vozqfe9i5v8',
                version: 'q7uba5rh0gihphrnmvtd',
                parameterGroup: 'vcer4scd19ismw4p50v3arwy9je8d7bh6aacjaui73u11lci9ni3kichsja14g3zwdbjnmcivfxoqntiaxr35mtcc1fm34dnem2z93uhwxzo5q4clezntdgx3zk63l4rrtcgoguky2wr4gnzrsicfef1r8kt8ghq3ox8p1f8qd66iweqyyubpihzz54p2dof2ow7lm1b2eh04zldrf41vvq4nscjry87h2s5em26qmirk8xecfr1rfy6ha867ms',
                name: 'd8c40ni6wlldgdj2ed1zcgw2ixv4h0hgwk7qsn73cjfkyrbw2q6za6xh23l8c6mnedcvc09xw2iu9gwho44knu2r7mdku8dd8b0bul5mbxjzjs326r3bll6w8bdgkwbz1nkvc7ocfdlary22xb4guy8zartvxxofdznmz7dsfbtvdq3ho1affq03y6calc4bu0vim9odtf537pz9v6jr218r3lymjoswv10wsqrlzlyr360tmvsghsvbrbay856sj3sr7jn26zzoo41c8og9hwaclpk94r0rzy7lq7fdtmseil3aggzmzzmzdc0osmmc',
                parameterName: 'otsg3pwjuj3gy21kb7gs9bb58bgd8flgkx86643x86xv3ufyapg1wyv4etvkaaix4voj5ig3uqta6jpbeqqq76mr7e3sygjbegl6j5j8ws0i2tsp58fdu3an5z706hurhcgrpjhb3gckk9ej2x5p3mhtdy4eh9gt1yedozhz4jc61iv1cmiom2ijut3r20fycld1qbry1z3hes3sqzdlv7i46lpaxalxz9dmc9oe0q3udascfacocx2zfw2bic1ckpacr06bjzvj0u0qan4czkae2fu3q70wlnwgbtpuy0qbiawka3jp7f01ruf1uoz1',
                parameterValue: 'jb0s62srjkqlm0oican6sm36cnieg9p7r55y93iq61tf27kysisq4cfp52w1cqz89hr4ngis34i2hf56cqll2h1xjaun7xp6aq88grdjidoydyiq50jrr4lenqau7cqlhqf25gau2tpf1d7h6218m3hzrzbthbqxkx9x1vfpkwyxrdxvj7xofi6jzhgbyxmvtkjv6np8vfb3kah787hvwh3yp1mxhu0nwtee06a1phs0lpbf3a7z4adaf3q2uymnyzdd39vxiixczuta15yuw3oajza8io7y3y1etu59b9vqwfwketj79146p5hbbjqh4x8gf0mgy2edykdnpunexvyyhk4kfgyv0ph8cjfkbbl6ewle8cui155inu3nwg8b3ddk24ozpi9c5jr7zm30y22ha937qywxliorgdwjhkt8hbi2tk2eug9euqyid6obn4rybhitl8dt0e7tkkucuurwrxuepk7mq41kzm6cutfurw9aqsllj5vpdkp6mxd1wpm5rq25b94b0zeyj9vrj5hxjuacrga78fwro244d0ts2jqjx0x8dtifxri9niwlewehdrteipylasv32htx9oqxw00v9g6krqqy5jkhh29r0d7ua89c0wf553k7gf5rb3gz70aqeiqd6h6ko84xwdiz7z78p7faiz1vfn6t7eyilka37u2k5vfgk3yj0m9x5ujpw7ktcbsqkholndbqfkzubfihnjrd5eh7rdqa6jz3plkydbcyt54g5p8sf6orxra3dr0xualdjjam9os8d5r2yidqkdloc5h2wbktufbltoqsohejynfc1g4bm444w1ywtfyllgvll0i3v1254z5lb891bgz2y2w42542g49ci56pulgutqerbqlrdtkar61bio3gxei4ddrel3vpnjn7haoe2017h4sg3p8thibt4skyhhibskr8pqezvxeh35ni78css08lw6zj1d1ed8gmx6fj407a4f6f8jzrf811ytunl3k56fz4y89l08nb',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'xuzja5fhpyzpjw9le814wc4bzbkg5ozaewoc2yfztccpn7m09g',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: '6legvbj01vftyhqsmc24tl52zjnw5dfvmvmmrqdffthneqelk0w3vq7s7hcai9hk52dl29fw8nbpoj5tu955tqy3n4qdtv3kwwwhw71tfe8r6x1wwz1ajjrsqing70a3favw1e5k9x0wpvrrvfm80qsegxd6hhh7',
                channelComponent: 'gumt30dogvvy33bwh03z32x36p15ml8a4km44jy9hsh07kb4fpah1hw6esj7s3nn5pwrs6lgbwuir3ndxde76e6by4zkjz4eoedstaaue59xy8b1myfku85umtntscre0ffwpaxbca2l1ngctlhrhbr4g41jzs92',
                channelName: 'n5nf1llcgj6m1uce17vcj0qh95tm61tc8jowbgdrq6brmycxngcb85oz7xw5hgwgtxtfr5qk5v69wapbenyizffashvvwesg6kprv6yc62qxse5osy2c1fz943u6qb0cgae8a3elxf8iu338kzwdewex2dhtx66t',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'kq0vgg8enjrp8gbi2429yn5fak51jt1cnfzxfbp0si7wzjzkeu1bpm9wkznxm6j5qkj60stphb2ir7d6knwmg5rnefvt4hbafwwwvw7e353e0an2t4nps0rkwh708rpv1x6uvrh8gmzbjn0aegmpw4hnn8hlqhd0',
                flowComponent: 'a93m7jeycbwrh28cbrqhh30bh1o31rvuui8zm91fbthjbwf2dzexy8kd0c6hlyykydmvng0s6k0zg6dpo3z1ouv4puzwrfxlr97xn4kdd2nmov9sn4m43boqje9v5u9k7hq8qj09e0fdiihj8lko3ry0yn17vyit',
                flowInterfaceName: 'hb48o83drwz2tk4x0hq0ukt4l8podj6iswlja9a2b0lkwag7h13y2vmjraed0bfy6znovdvbw37vdnh9j1h8n1fbu56nagj3culnu6ep5x64i1pi4hr5yat2h41n65kp3ameeheme3ffnol08i3sf52bjv52u5dc',
                flowInterfaceNamespace: 'rrcduefdq4tg4mlekyxbe552te903n0vsed9fndp936bq2sxw953211m43xheist21fe3twkwr0v3mp35mf89o4kw014a14gr4niewbn200ra7cqc5x0f0vt9exacobefdzpbwkcje4vfad0kz481t4l867ourk2',
                version: 'ac319du29drxyrcf6cfw',
                parameterGroup: 'n3une4zv6qs7uwrtbqgkisnh0whx4kqco6vt33towh9q6r08zo37jxxxyttz294qj46xiknyjstpvkaqjmwlud55nuhhrpb4kibs058qhrthgvxejhpojdqh2cdi7vbbdf6ryszyleyr31sm2zzktzj376g66sfwqxkx80i1mc9ioidfg7bp5vqp0vmafnhct4wyux083ldss603hizhlygbrtu8qu6mpj9mnwetq0hwm7hk8n29rx1hgmnadvt',
                name: '64lb3xdtijiew74gadzhl8uzmfe96byk01phsl8rh0ny305aawa4xs72uba5mb2kxitx2fllswpiot56jgl2ypn8aduq4hxfp3crydh23xpwqwko9z2docgdi9f7qui61thqpsguaw1ni0agodj2krcgqg8sqv75xu5dd80tw9oldlhype5xxlqos8ocnwhoos036e0xxuybsmky9tufmxatlyn8td71r8bfu0tkvq8oqepcdhw5h8phjn58df4hvq2ta11e0zzg4cj0idpcx00c2vsgqd8msrmbfzjd4bkxh8v3s083wgopy6mpm5ta',
                parameterName: '9l7edrkefiyaedwpgetmhccm9p07qz0dtt23r04vfar4b9qbkyp8hsc1snals20qhn23hfxjvoka9bzbpdd1aefnofxtsgvdiu9v7p8m1uf95cdzvi31zm2zqahw5h02jsccx34mbivxiuez8k4zzzbuyzd7q41u61oyl560vt1kz8lqfakm2708cbkw39ihod6qyb8ytkbizalhvbyd7350yh4cwsm0c04x0weqv9ktaw85ugact12xpnvhgv8uznj7f7zccvs1ny1q51v1o5f0r38i32hpqcaets9c5np46zcqm3yguo5n35ozsdjl',
                parameterValue: 'sutbo5mcnt63aa62cgtx6ih3s3mu3tuch61qm3ns0yv8c7rrc75zcuovwrge28b0d6e06v0uhjrtlnctu68duukkrjhyvxw4hsrzqreef94dkatgshrgv8t720vfpwzzuu4njxktky00rciabywv42eku2a1r9ig76gpp535cguaezhhyal01tp7e6zj40sflb5hcmypwwbk4rjy47ws4641p1ugh1koc964eot35cou4lny77okg0z6m0za96qhveyih1w94wchhnv92a2b4f08ikcjye0kts7ltdghptj8p5cacebszjvly3616crxiebpl932kmqcrcjx3sow4f5kcqsxyifjzbxhe9mbo3daaxe5i931ghg81wh9j7n1rjim81deqi02vnrbr78zibinzmubx8kg87zgsloihyla86g6bhnchwtlyipua1e0rbsi0q8y4bih855zfyssjhz65rcj947q2sqfsgcke6rb4ng3hv1sofm4wf8j58hof7ahq28fh0t93fndllpg5plhfxfeo2nos0hu4omd5knlpg47ib4wud8dhhnukyz7gwk3icrkx448jlp6p6hfluj5adsaep37uzbu2i1z6960pnebfvllkc1hvpvilxqf596756ittw7ovggtve6q35e8o8lsxu0iw7qw5oie2wqhqnfzvgbm2p8zkj01zy7u7bb1pptotu8ame0s1uhazprgg7m19vyyga9dadvu75ec1s7h4dvbib3w6l34u06sbt4g4e1p0wsyep94xgckdzouuwgfd09ptjf5n0lf5aa39fua6t582r7nf99t6ocv6vacbl6298h0ira0we1jqwwkq0yooqr4pe68sv3o4xuiyyl569oqf2ho2i4s50fu07jq26p78bo9yc99uy1j51lgke9doq408hlxljvyaksfda32xwksujl4b9ha3mu60z51cm3tad7jzo6mqm0dfsubqr5w0hn4ls3jj8bp0senf8ustmki0kdjcgp44p7t',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'wenf504lpw1970reo88esgwi52doll3nihd51d4fp48eljcv6e',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: '35dxitzyh4z5av0290ny',
                channelId: null,
                channelParty: 'iiy485s16t52mysody3pnypbvzbe22y0y1riyncwhx7klfvpog74a2mb5thaestedr9y799rizdp8mp9cde9voi54c5m6h80zwj9mnqd7kq3aehyp6n9kj6p2hlv184rjgd8djziowe18cv34tttj1wj2agwchtw',
                channelComponent: 'ffhv8vyfpzq3xl0ix5x06qrmaxkhhj3fdwrvch9mxck2q4ste189csja409e36maqn2dln3cd1g0mbvm5ermq2f11ga977ycoiql704fd5pgo8fdyhxi4t9d1c5a6gg95tsa66no56sms01b4c2lusq6yud1a0xs',
                channelName: 'l2z0lkzs3grlp0jvhsi0va6e5c72jj7exh066ahflk158lqlp6l2goysfeavg1kkiklurqt8qooohub1e7gog2n8pdn0y4qg4g7fe72p2a29ovdmg4msee9mqvebhh6g7a1rfv3ozydihcl9qpnyuc799z0qo4sg',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '8ty1ythx0y26mwzwam1kvd1wtta8pbv1yknn01z4op1d1ilem6jmdqexvpt22glean6sqau66kvf82jkq2v6zg1mf7n9xzxfgubsssjt2kv2ns4kr5pjvdngi8i68qxegzj3x7kbl8li9oiw5p4gmdm0ab2aqcer',
                flowComponent: 'adzkqyxiiuar8l5ow3y075xivesphgxw89k2tax44gm6vllmxkhfbag4lbqoon5sr6oekzf5atnup7j9k9w9f0du9hiqwrazg3b6a96p7r3llcqtz566qm07gom8k5n2gjyz1gx8wfcec3k5jzj2xh0luyd670io',
                flowInterfaceName: 'zremxdhxeyapcmufwn1yta9djztwld6mx108gxi4qwz2kl646gro6t2ffrstyd4bn337y67vtaf1f7ro53va7xblsbvotmwmt3g85qx1lxejy3nlnp7iul0n0eqecpyjgo1oe7dyywrw8cpvxby1ndawlixteq90',
                flowInterfaceNamespace: '5iys3kdwynm72zv9f9uwlt15rsuqlmafd7418aj7zy7uhxde1yz5ozfefo9e10j5ds7p2s02hry4vhlab2dcg235mmd97layd3shkbssm0ku6i57a79zv359dzm7un13p4t2i6peou3wlzxsbeeifbcue1zaiube',
                version: 'laman7r3afircyx6fvr0',
                parameterGroup: '6u84j20gvit9i0pes2jvd23ex10srj09lsk2kqbacn6q5hze0w4h8xmhzizgodqk3as0syv2l5wuflpge0w5nk9325yrlcwdf0ar5ev2o6l9jiczyfty6j70a37mlerrb844crb2m7a1x4snk1893tptht6mky48qrribevq5zesjacm25cybhuidu7magjceqen78dm7jv6o84mui31an8aoi7drimg5iwu9qtuueb35ulf0064xxm5lw1pny7',
                name: 'rjtpjh440pl1j9190lvwcok2epdqm1ch46qs3jl46c7i04ktjs93bkzp3i67n5bzj968a5wqkqf4twalldq7qj8gusmc9sv8nk14gfuigrtfel7umiz5i2i6rf5na2ncj5r01qkv5k327rd79zvsdsknd7w2zcx6n5w92hgcf7mnd9wqk4dnqyo2u6hsxs4a18vs2f523j7fxrjo768ol4v85abo7s3ni2y0owcpt6avyu3ts3a93daeuzive8y9mr3emox8bcuzn6spu2aalsu3qvhukfwoo14fxxlpd8oax8dpsv8osdw52iubli8e',
                parameterName: 'zlrskpswr26kj076q3cv4wlxbp3bwdnishnmeqz5t1igf9if6e2zmkxqqkgxcsgk3r9jn50ahon7rdjjavtkixjua6k53knxyhpdi17y2opgomemqlmryht79cqx3rzp933prv1rd7s8oia9y1fmui75cuu4mgeutrbgipz2eo41cxmpm9drioiklfuseaswpdvtjc6op1gl2cejsqtewklalc02b6vuc030a0y13jsvn4cyb1ab4f1tns9mffmphfife83j2ii4l6rak5por42vzeqfko7iuagxrt5w513020emow7za3v95hbuhg58',
                parameterValue: 'n3g2h1ifvajyn8nvyfmnnyp906xr4ps1kntewo21wzeg7xqw54znugw5rjfeipmcwv772htw4rtqgu8ib4e2xj0q4dhk9u90pks23cak39t481ut2qjrgbgsm8zzs7t99o36mw3f8aoqaeuckv1md3t767yxr3vog5nok7jv977kd5grnil0dwueq1ent2vucvgdx7aodrp52l6ottbh58d6gvawsnxtj69rvun1mwbqirq935x5m74k43ypyfqwosit9xzertpnuhkqtolf7nsi3uvw31ry3qyh9iobbudxv57m6eelywvmjlctay5x7dytgtqmd2prph6mzl0pnt4v3axeelxtdkqrlex49qoqiingr5pe94aajbjcfxm7z6vlu0nm4ttzm5cb66kpsga3ef5x21omeoujs0110sd78mifswdjhggkdid70h9n4wcjmujuv8iqrxeqoasd9hd7pewzva90e3ulvb6wi5vg3zkxr3ey7v7yf4sy0x0e99p5ycnt4fakeusxqmwjy0dvqnkn26utsrs6r64juab2nemlcuuhi9xj7fspyo9qim2zm9tqi7e1mo1ph2rqi66n8xzmu6ouytweg5g2g6hx283gia38y1j26wlm2w5wiatmr8vx4mbf2086ozzd9sd16x0scxgqzvqzxoqjbxktlpbl6iinw3gg57wxuhgjlmow5fohxu8dt9wmlocl1kapipv5e0f134rpo6mx5d070n7qg7my96uleqojxgxtssvm2h63wix68uc9g82yj2fn0hy10yftuclgowyfbxkr1mpx4eau4ydyul9ho5330tjc79ddg3xvl319una8rh6cg6cduf9ph0e45azzynphd6g8kybofjqnfn40goo5iv5expht9lv940vxum26v6cdvwajsa7sn63cuiez9wwwq37mgvmnx0ev3rwe57ni6t6wduahapenlf6nsghn8onatfnf1xtbk62rp0ghyx8fcnl5ohwq9nj3lkct7arv',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'rpfgngxv6oi3jjccsl0okl3q0gegiugsl94qcg5xb7ot96rnpw',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'bis995kr8j2xmgsxm788',
                
                channelParty: '9ddacr8wj3m01pi5qg7ajpn2h5pr8qgh6h6j7hz9854w6enfp07dp6cxiu1hfgaxmy5bpg43ys5hcmi4ddi8ge1hjdtgxafdgjfcrmx1btarmtlas1n0jqhv2kacs1isowbs8csycwn8dgy14e29m6gh6n98makw',
                channelComponent: '57zpudcoscxw06lr2zjg5xpaxz3lo886urdfcrh3kh7pgi4yt93jxkopnphuxwdnsdl9rsr56494akmwg9xikue9e1gq49jkmm1zyzmwaoqjn48573xcbahfclg0tqh3x25qoxkwwh7mtn9rwwkbs2jyar6y9d5t',
                channelName: '0g0tjrto2t7fwkgozqyz144fpdexmr6q1ycaqvsazo5c3nvho8c6ytz4iyxtl9my7u6qhgwjca3u0o90nipdgbm28ijg94tugcdx1v4frchbzowyaidtdsddn77yedcpxes9p4ijkme1oumpuwnxpuz04j2ffrtm',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'bi4v2u5pu9269t4lu8nz017hpl8cnsamsale684m8tggdhe31uu7i2odbgf8z7aab1blk1s65jlcewf63otfi9nts744xwmogoyxop2327jqjlwzikm031kz6ex5mchqynlg2mlh5f5n3schtm8y69gfm7qli8nr',
                flowComponent: 'ocf8w9vd3kk2603023cms4mf6ylucsblvuocch922enjl6z35bjt68c5rogoshwc7uc08hsf0mxbbwpk7v1qut1mc8f5364193tzuehjlv5doxkzkxxz10smfdamrl6jm07j6adoemf6ud3cvee71kyetikwx45n',
                flowInterfaceName: '70tqd98rsqql4cvwudge45ob8k1c53nhg3yzz1xwruc0f89n89siyhl4c0udhaviwjafhkrossz5f5zm6z5jnw60s11j59k0s9p54o86dk4ht97fd4fgbmfepv1uzxjyd4bq7zivj1hp9shhzrxe73zqdk2z9mli',
                flowInterfaceNamespace: 'jsywq7wx0rugypcddu9c420768ypi0ueamash2vfbat1z40tvjh2i2gkl2z6qch9xu7ilnampyvzahs0259k10dhqxrg9zlh5pkfgoy46246rhclybfaql1tr5pjt7yjpi7exi8daxyqmqqamflmzpqxkq039oeg',
                version: '9i0u24m8fkqjjy0e67u8',
                parameterGroup: 'q21h1wdrzsa4hpra6atf1nstnikx7pkmuq01xhdya2vzsnmyqpo1j8kd0g6t8apvnrybvrwi2lgiwwde1lb12jnl4hz58nieb5bpqsb88th7e5cwmh9q2b9jzkifj4p159winxftubm51okig382lj85ckpw24tham6wfi42qn6m5wi9xdk25hnuf2c0t4j59z4uvncnstcd0y98rloi0hkge5j2c9t8rfs4qlev6xc0j8tni3ak4xt4ec1vqo0',
                name: '0u03zbajtd1rvdld6p929eyppg987btfe4nbjesp36g1d1258aq1npnjv2rsaiid5ua5uzddjay1ktf0fzl10a4m0ne0n4xm6e0ktilznsityv4ipzf73o2eh62o87zpzdiqrn51uvf17ozp7mrxuuy87mn8kwlg591950runi3u8g8sevz4dpf4mj9n847s4zvv4byjntwdgwvdnjrigpa4s6z4m67s4bkycfjdbf1dhpj7xe0ptys59wl4kir95hhkgu7le7xmci219787v21tr1jdnj44y9y0elbtfmwvlufk2vnnj2k0gcfvmn9j',
                parameterName: 'mhgwv66lj70ggxteusxaoide1nlka836z6vfj3pqan494luglbf8ii9nl7o7cebuary7eb8xc2b49bmjrywcm3kjlurn6dim342k74y4mzmb2v626ztol0unyud9aebiweztmp9lhwbs6zub2fhxwjofr127zkf6v8xybi4cbuehd3hn8golxkngovf0wp4zx9yrnlu3ybmtkgijm0yyemgn8qhnsclinvkj38y81mhdwrgry5xd2n9l7omlr8xme87eql1p91jortnh5zi0ppuwfh52d1wblur7e06p8gfgjbwyxlvomw052p1j4o7a',
                parameterValue: '21yvwev0y7fcyb0mz2gmtbsqezyrb6at0u5s0wijm4qoti3uhu0f67wcptoa8q0gtfls9wtxadiholr67b1zqutml83tzp4npkssnuk4lycrllmzzc8r8xeqnlb1eq9v8dx00k0ve7sq6uotubpsyb2lcn2gmjp9zyo60kerxjeqt0ezsgqya9pkbrl6ck4n4c3aw21v502nmtqtfa0aitzkhrfy2u3fuy13ejud842szqe45out9edixk3f46jdz7rnzjtsa6w7fx54ap7t527koeobp7tqaos1g7o5yan530jcxo922zplzlrhu2yt8pr7vvynbchkj0n8zw548zw0c9j3o2015ki9i37vlxnc2lfoup2hpfr48am6m71yv9kspv2k0pri0800hztixcmt400eghdxoem5eeyvurlbrtkq2h5djygnix11ql48zi42zt7qhxdjnb992qhc3b8n7hk875tgfmjhizu17x8w0rajif6isayoq329mk2k5vxkqw5wvej7yp8rg9gh8u949vkhzp6z55ck8z56arcfzcdradchketndeaso9weh9y0tz0mtb2do21ubkzg7oiqhx7jch7n2zn8dwexw50palwih30kosmk7u289s8bo6rqcbgsx8i32obrbilic61q9zc69348kuq0vrj7zcazy1glzehfyaabffunya9u8nufzg03lgr1g2g3lbous5dz2vz2wfvjqq4jucwnm09myr0mw2c3djvwgv2olvhodg9564erblte7qtce9eavyr2bddk3p9jejnz5un3nqi22tsfi1xbkm99tp9prz0pz6ewdtjwi5g0c2kfdogyep22m95yqhk19ch4uu3conjht8m7l2fhd9yk631vsts3jhmzr2zu9fsgga6brqdsii5qugk5wob4q7otrjk7g8sstbp9mdkxgd2ir5hulhiq8ras6un0zvf08b407xy4cqkpsk7ivw6qbtp9ymil87r5pbhx1doq5dg6t7lpfcfa',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'hs10542d66oioynlyapx836yxkwm8ildtgtlgm6r20kpcg4kmk',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: '2pkycn32uerd72sv8jwd',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: '93nw5vbqfq3xf1fe3m7owz536huqwps9ftuds7037o5gc7zcwkntmo35r6w45az01wtkmqdyc5r4xsvhoifezkezpf90xsorinlq3tmfo70pusthyp6h4r9s6y7dgl283v95tmfe5zbutb9avvpwt5hrbml8ktd2',
                channelComponent: null,
                channelName: 'swrqijgkpn6tmexilqy8ivx2x5wxoccmttiobkcqj7ng1vtkcge2uwmdqj1bvg0dco1b09w8i5hfakquh80bg335s69uvrud855eqrldkgasnlh8cfiq1j4hldvd5otbh81rjlrecue67asg62fm2wju87neoidw',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'c1gjhc32wlxusw8g2z2dcr3lk076skih0ats8feq0byz81z0qbjgbrgpx3wa0729ngb88kd50e1d6a0s4b3e1tm7klt0yz5tyvbh90rkqn8ceaduhk4nyv1to2eukwbpooy7gsg7vkzfcteoqvsvgm64b4kfpyt5',
                flowComponent: 'gvajzy5aat7hcri5ovowq9m1txstl3egqgvl9n51p6csrkni0zt4pc387vt78874g8wwgasiaufnjuzmeysvu2ps9oprrkf158zteewsuyw58og1nyn65tstgd1abjjv3ek8r6p6ccxu8rsp1ic8be6ec6k5j9md',
                flowInterfaceName: '4dvlbdd54ktl4i2sijs9um9kolo7s4xhicgosy3c6rn1dwexdr0w1yzxlffgoyorapl1cx8tdlctei13izng9suaf6ykfhjtvqrkxb2ohku10osznzkzpaseer95aiuyw1i8mpz1oaqftypeiwngnhyms55ph5cm',
                flowInterfaceNamespace: 'pjy3es9di83gzggodrq49uz3wlkq7b7pfgektblzfyje3e65exio13lu8xzhiubykmv8zbvzx0z4qs0k9gjqxva3t72vr85ycr40bo4py9kf1j1p10xrmj8x1iptzjcrzkwgd5r7axfydeppzdembigm5hhxhu5u',
                version: '41agobtkt1d3pt8006jm',
                parameterGroup: '8101zryfq0dh2vm5uiws6o86xxapqd75jdahyabs3g7kcy6z6ruk5inkbooe525xo4xe8v6h801o3a5n5r7fyuu626mdm8ghshuf6qep7x2dn76sffm5i8csnmhqch9uig77el6wi3pso73eij1lxl7jojnqmydm83h8byh3nyeqqxuh88up0ivrjd5djvzrgbmsi7by075606uffmmpoeqpp55oyy3tjsf6mc88ykp3qllmw7vzbmg51j44lrn',
                name: 'iekdi328d75wlmp5sikyltbnxjn79ndwushxfcwcqs543yro4gj9w13xxgv1qjkbg80xo6ovl5f7egabh62fvf7o76vtyuml71h5k295knuj3i6cyst994f3yw9s78qhjixftnyd21snqjfm0wtr0cfq12k8oouvpt1b3n4t7pavepj8mr3tku8sjy44gv3uz55odnal3gjx9iq0xy6hteo4c6vh7yjvy3n496aqnojbrgn5gargvltgxomrcgymqvcuscl0n36al88qw9pju2dp4z5xfv9gl1sjoz3gxdjill376x8isz3c3mqtx932',
                parameterName: 'e9199gl2v8pmecag5tpjz60jh6nca5doj0w063zcj7h3j7l49dn757t78pdabnoyrz7j07ia7w5ovjtms8cvuanruf7ggndrbp9awmsb3zf1khqr37ked6ub8dch8ms5c84er74juejmc80odowe7x15iyn9othiglyokbhgyp350tlt3b6agv23vizo8huhtpv6cenhj7dr2iwbdoeesx5n6h5dpv82s7ed8ow6etrh32kmy48se1do70tddzs21pj8nhlzdwyo6jgdcv4kmbo3it70y1ke56605uqbr38ojst8ce610k7mdvwu2e6f',
                parameterValue: '5jajkgjhy3291cgf24qevq8fs212f8x2z7alspskv6tq2j4fj9xb1ksvpzmuftlr8jq9hbid4s3fn364ujyyoue0jbh4e90dg7b7mfuhcef7bk5kgzurmi6y8wkhps63sduazy0r72fy1swe0h86eg7vrkcwwgzruttj9yk2av1s82z4rnk0xce1cgie86kb39o4tes1bl329p130x998l6c5zlin0fjlmoore9luclhn22omzuomaa5yfdxml1tn23mgp4dwuy5p62u56njbp134jahl242widj62g3ieu9i96sixlrxp2v7vcywntawih53iamtko35cidr4osxvu2cav83s89co579ulzz8gqhccqcf5u8anelgf5jw0kvphqs1dd27vb8m23j723qq5hi68wp8g3oywdy5fu9krf6udu25kz51vv6xyg4y90plc8li7wfxaueo5vpi84fdp8o2ja6cqwi30zk4t7kvbyp27aq2yzrg2n652qj8mdiayadkbp2szitt1h8q0xi77jdjc9xanndp5ufogdncx9rhb1rd8nec62q8w7h2zdke8jr9344aazuoqs1kj7rmjapsabu2v8ys5biaxxbgc7woahimklnup7u7v3exkpuol44tm3v43y8pybthhhw3dgqqra6y50elpfh00ygax0vizqeuj2tnv41w5qh7n6tvb7nwrizkmqi5t65jxsklozlyssvgpvbhz9s5d8kirls2noe3gftyltwyd0f5hrhdtg2gka61bnf4mo96ozl2wf6smgw1bmmepw0eu0uax5bug6h04wy2p9gjpi26m4w1nuq33t3ozx9eqfot9s4hc4cbp5n7rzl8w5ajk2au5kde8kdjrlapmscopfavnaxzkcssxrlx6l26w286wyd60460fbeitipb1b3xinxas7321viuklk72xvpfgnfk7pcasa5r1nyxw66q6neuc7vh2x66m9ppw9287tc74b09ic7popnptx21nayqyvh7u',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '5sdb5um3p4bi4c38ei9k26n5y4kvgv12ejfkuehc329sqzw5qm',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'dt5e3gqx6r01b0mvmngp',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'lidi2j4vp051oohcfqge7f16u7gr1ke1cwd2ancctd43u8dp6bmtbcvmb06bajx4gniywfb5di8ghztfmzicip1otbluqftvgk3x2v9uivf6upob2etqhnnkmzig6cbvz3nren72vy5r70v04mjjh5j1m7qwh3rz',
                
                channelName: 'eacyf8so6tbfwg5pgk96x6dqhamgm5155zq10chbfa52fjto7ir8wg94wo60dtx9xc4q4vl1zwub7xdmb41fk0utlxb2hk0a4xjt743plq5nt6z8734az1znyovo8pofw4fswxjhpr7yl9xv7i8yfr6nhpxew6av',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'o5ndczh8q6wvg2f2i3nrck8nsd81u90n242njs81ruc53byl39nxpoq5s4avmr2t2htc87ccmua0s35eqfnueyqkw012np0vj4g4386d8hys72gvjeh5r1l7ldvnxtg2iwqte1px0tn7y6nno92twtntzgki30sj',
                flowComponent: 'piwg75crebtgv1pw3kvsd5ah3d3858mh3gri1qlsdxyirz1thmqv6l8356ktevd5sw1u5p3y5v8obxvfe7t70tr0xa251u56g6whvwx7a4jlzbcnlmbk72hdrk8pjv5e9h1jhc2mjwetexi0v7tf92odxef2swd4',
                flowInterfaceName: 'sftppbpd0s636m44ffd7mzbz6ly7r7jfcavfoc36vfwggiiwxdwa8som31mapxr73zjge1cqs1r5493u91g6yrcklp47sodo8hcaoa88p8fr9yyohed9c56ljxer3z5idxygd22dmkh6dv8kjgye5pro516sksof',
                flowInterfaceNamespace: 'i85j9kbh83cid2u8cjcsl1l0ohb5294eygskznawh8s834iqskloe3bv2m6zd3vyj6ollh3ps1wad9hxkgkjj68dtq7z01ugn2s3z5eg3703xe8e11r6ldgnyzedjvw4kdvwa00duzytijlv5axn20be5mu5i4h3',
                version: 'lil90wmugu6le6ckbdjd',
                parameterGroup: 'fzqojubz3c00du8xslalttqwrr0gsfye2idzpiyovkmpk8ij3xyvaqxesi1t0nnal57eil3r3ek16cwgnu5gadavq72c2okiqmh2zbg1yk4od32dmi5c5m05mrqzhppoau2wcpb31ltvs87zf8hopoto7o7fr8xw2d8a9el6pk6f0ghzz9tk1w8h87vubth49w4hf89buxiw67u40eofacw2wdnacpnpn8k9jx382dcnbljk99wli764pu3xfry',
                name: 'm039d0l16jzo7v1bq1z2c5sp4n3px9fx6b2ok8cfbst8c36p15zsqyht92y7z8ym8wxr2f3p2wbu0b189n7qglnoj24nzgq8467md23kk5ypti6az46ezdbyjr7z3d74ccnblmw0hpmt62dfkf9252ou71nxcrxe5agalqwv3jqvqt99zwtn04w0x66k4a0iszzeje4e9nj1ygu5mz96o2t64u9pp7ft48w8aw6f3d0yh3jrd4n2hzbnzd9f41j3x4kbikraldd66y8ulbijol1gk471ufarjnirfc5po0qecatsad5lp04b39a009x8',
                parameterName: 'l5av4oap56okkw71wp1uekazedrcjroa0xty2j8wkmk6j314vkwn5azex2u1d1d2czcyrxqfte2cais00row8a4bvdlkfp3m1eyzxp643sh5e7mvwwkoiocoy79pad8y62fqg9h0p9i119gw1add5nqibikg67wc43lwajo4unmx759p40pmlizdyqe7om82pshtlvm485hs3tp5ko5qerid7h48gvz6dvfcdaxbclemllkyci6piqsye8j5m5cbfeu4lbwuv7cgc7r8e5msav50dqmn7n3kfuga8wsmoyf8c9ivfjlmfnwvvh7cyqa2',
                parameterValue: 'vawnbiur8c2nk8x2ksv6akdja1jr47ldls3xki5dp5wzdbk7mmlfyy6b2mrjmes3wcapnxlu318kswbqpdjiosf15syvu3irfayly5a9q4vqdbp878rrlb9s21061y489ynzgmh6xf78vs8c15o2f7ytk4v36lug4s17h2fue20lmedt61g42vt2fci3av74dp8pu7wqu9r7z5ofv3quq870xn9k62h0z0gh2hk9vmvh4fvdj7m4qpm51fsyk49vvl1hyni05n520gfde8uwgnsrj6o8w8k0if7agwuod4k86mqy45laar4u35kcrcxfl95qgpenzfwxkoa2l5wm3b296lsdw0aqicairqvbje0g3ca4m5h8ptjiec4vynqx0vqueypry0pcbjdd0116b8wuvzyoapo5kyzpgqlfs5q8kw9w5qjudr3qoyr4kmsj9ps2i2k33phddj7xhv50z6ov3sqjlv3lkpvpwuvfkf5pzai14sox02kny3ivgim0i66v6zwfzbecc73oi0mzrjv53afygx59tzudom7o1aooxrsrh86aonndmomz94dbk4dsokq62f764t2x7bpa2sihpdwnluuwu9q6fpgdacdeeiw8t7rnkvfrmcq6zzrioy8lw0i6jf9xf1jhroyru3jpovox0v0iqb4t9ay78ucf1yez5wlcr94arcj72modsagnxsrkvlizdgezekscrarmchn1icupw3g9c4aj1pi7ke238crr4o46rfuyjzimoq8ezpboa3ruksgpad9mkegcqluf5606j7g93im92wq0ws9e9pbl146bwngx54gl8vmofmeevziskzba7aw6q1tdu6g3kqdv2sx0jmq4weyjopog53i5vkzh3ecxshqueu5awdkahrly4bizygkfhadg6zllngrmdgco1psrns0e3e1cp6k94imtrhk82qekfro0xyfy9xo5d1hb25z7q15dpfaz2zqz7j52gmkuwmbnoy0bdpdktzptip6u2xkk',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '4m73xkzqvhweazzqlp7iy6a6u1h8s5eml37br44sg2h6wombhf',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'avt8c7xvvi68tst6vfu5',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: '414fhp0zw5251s3b6jmneerf6df06i2gyiwe56lk66656t314vigllivywsk30n0l6db9ubhzx264sf4p0f6lwf7vb2s48u0ulxiukajnpr0qhm4z4bok589fp01uf2h6akcv3isgy3b5wwcguy2cuv5n9423p6b',
                channelComponent: 'q0aah4kqs2ztto4utnbkfbnw28xj06li4n7rfblnmogtx7ibcsix684fvjdbkdjpds91tkml1nfbwj0mxhjwced4nggaqo5epr17n71jj401sonflb9bpqqssh1t7b61c998waqzvi1oy6qiu2rmonm0mb8jqq0b',
                channelName: null,
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '7l4xlfpcsi31l13nqjqzd3z806mldoou9scuulfe43arxso5831ct2ars6ywo6dc44f3k5p8dqggpq9bfmzh7dntb4pa1fxy4omorsdf35pn5ns1uwej50e96xdrzx0e0rlttjauy7q07vvmidlyr9nn6y62x92c',
                flowComponent: 'oufpemwl7t388ls5brek4bdyb2ynhguo2qi9gvuq8owdr0boa8hx67xaurz07ctuvba8ytltjrkyjw39yv9hoz6072guhg8pcv364v70kz5ife49przrrd0r90zeew2maudtbo1vp2ykwqxf2mnmid1n50ed8hzw',
                flowInterfaceName: 's3ulhu7ud3njsktj4erbphn601jqh9xqjgj2bmvryzd427v4pc6dih1rillrqg20xugit13oa9a3xqevz3kj075l9beiji8093porrm4xsvppnjv6a0c3gabn5wggysx01i5thux2oq233sa3bz9nc8q25hdxy6o',
                flowInterfaceNamespace: '2zbhmml63qafwaqweajaw6v90pl36zi6cfqpmobpzxq5j79rql0f638cxl8yxahwzqddqh3n5ucbwhw4rze8kd05n4f47mweh4tw16e2rb27gukyuk24npzvyt2hxmk74iuoaw37ls5u7mqh48x35973213ti5rh',
                version: '6w7jxeqmb2gsqkefwfpa',
                parameterGroup: '4mvqlidexuw6pvh1q1m4qp6vuu9ffyrjkbc1c7bsbdf5v7sff4s7yxdxww5hyzlbpw45nonhg6zvh72rfml4gaqlg6hejulv6koro0t6t7qj02kd81r346bvxb70pertu6tovb3mcfoanmuudkdged820fznmvl0xkgd9dtgic6uglk8c3cpaw9ruuz7rovmi9ad2rl1xtb0bzmeg7x8s1hhc8chuen3n4bvd0wva6uhw1sv34qjdyj3qlgot0i',
                name: 'wcwdiip5noh04tzdvwdk3mtd5omwym27i1pwv6ktw6u52wjpp8teawexcxjh86ecklkmf0an9ijlaq9h21g9ra9nll2k0h9uarp4k3if8htsevcg6sc649ve76osvnws7d7ag7gnmuxv3eeqrcnuireakvxb2f007wgukgm7uko859ffr1dz15lfhpue1xiz717tco33q24zfmzfk0wda1qptvgs2os825ynbenmign2fx38lfmtqshyq2xlqgdbdb674fd1oz6cabtod0s2mompaltmr30acwe284zvbe91d10vhokhl4kfp4spwn1l',
                parameterName: 'r57cc3mnpkkyedzchybcjaszu4jyktwqhae796fmxiqkszy45bww0djvp116pa4bzzo69ndp6t23vqk1oh35z9b3pbhda4fa7qpt21t497zbowde2l2gytryg6wppkbln3452jaolec6pw4w2ku21tfy6rfiz3sr9leshzczyx983oddn5ztp2uxs8c6eo7h87i4sa7gdymcep0sz57966vhsr7zmowpru3prbv76qymnqgmj9ksotw0jr4gbdn2kq5r6m1x5taasuxj07rri3focnybia7n6jtpj6scmigd60passqolw0x1j9xl5p9',
                parameterValue: 'phcea37lhckecana7ylvw2u1ff2h73yln2t30f9j3x97zcdbnujwdxs7obpjaxx2dssado8nrf960oroxvgybkrpc99rhjxq2ys0dc4anlww22zsgn6082d1oy3m6ms3r1yngynfh2d62wanpdd1lg2wygky564mm88a8pwel7g986ocmb8hpvj8k76tn37t1z0n69xhfdg5wdazsgbg29asqcwvihwk6iheasv5ngl7ogewh8sn2zvhq4bd3qzi4kh22o48e1g4u0jzwxjyy6p4atpx4akdbu33s4ydk3bcanmff8cci3n9at2m78452fkp4f0g3cmnz3lw3rxgi7boydmj9eaeph7ccye4n3z9fqldxshbr8oplpe7b5cw5q4h3nbwng944xzlt9mn2sd4fr13eryp1i51d4c1yrdjcmxmrm337ey2uih1es9qsokgqvilgs32d5sba0qajt7wx0mjs52tt40trazlfzj1i8sfs2vpo7whgwor2ebxac68igctc0g8w1wfysd5aonfjofufyy61r21hd22tok5pn3u7fahcrcdal3560qijqhb3vssy1ipb2x3aou3bxm7d1jdo2jgo34lpprx4mgopqd5lmagwk6q9ofiww3jrq5fqqvd4mmqd3svvporgelifxnzmu9bc0v0eply8s2032jisufey92qidowihqw6ugod2397n3cbg1hryqi9cbqs0edg25bzhflrbkx7818p89dpa0e9bvbuyaax1zbz2ou7kwi6c5v4k538etyy3u0a3a0u0p9btvzd044axlgj4zbfyj125lqzkd5u8lmkd5q075eh8gru0gp1l1odsm22z47azb85lkpfdvppglkwpncdwaxonko042kgnrc8nb12xvhn15h5putdxi7ir3ojoikwyn1mvapjcdgq0esqzlwgbmn2t7u6rekw37vpl3xcful73fe527wf5jmgyrnfdx0v3wc1yzjt97jitfh78w60xblzhis6z96kw9f',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'gvy6slfregx4lcbf0fhks2l0q0h979qez5xipzhowt91t6xpri',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'a19v4lt2i4xce8iosmna',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'enlr5024i5kmgh5666r8udegvftd1sy47sks1d5vhr8gh6v6opisqqs3cqjo292918kcc8bej34phxc01jte0z11ps08ybwemqux98m5xl2e51pe80d0nz4kt0e6hi66msolwz4fchxa1hklgoibc3ibuwesqw98',
                channelComponent: 'quiq53i9b17w8bhjmmwb90s5q990zgi1fvozzjjf63jy8w4aqeor4kgingweo59fu6v3ey8a3abby0tft45lexcqau87oqdl3nqtxtqtok1yu8nh2g40u80lhod62m40csbevtzuk2y8fgj0ydcnacrj93ypm1ow',
                
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'koeu5dwf46e4q9kf88uqqbvr3gvxw81979o8zlkeiojfjdfhdt09h51djtjm16kjc79wficgo3xf2qu0p0wdym3x9hskcufvt0w3j5yl7ophz01pu9fiprd9h9b9wbaipgfdni80jfcz1pgo5zlvbzw3fmaz940o',
                flowComponent: 'hobuzegbdcqra8cmto9m594u3tfzzez8ofs8abb670vmps8ounyv2yq1qlzd4le1km32jws4w69ggun22rfv8rka91gq0kemlwru9yvn95jhj023jthebf13tequkigpgzj3hyruoa3txuphqjr9r5ed3t7pzobr',
                flowInterfaceName: 'pahsvul40wcbt9drkepnr7o38uwldzvikxkm7k735uzkh83wupnajtv48ku2s507jer6idz0g5to1vawyw7x6b52uo4r6dysm4xvz0s7qbbkdtzk0l91rz58e7y8q54r6fw4yr8ao399edogz5bb55p9yuc5j5jy',
                flowInterfaceNamespace: '6pkfu03cek9ygsa9p1unhuxre4xhyrn6g29wq1y49sibyoiyucfl3y3flwtzjq5j1i5pxgld69fvl0llz9ek3khz42ywykepbfnishgzzcynx3of1o3a7dgincmdhl1vbrq6e6jsljzgm8tlppvvtug4q0t4i6km',
                version: 'zelv1xmxmy6tqansm3ul',
                parameterGroup: 'u0gtfs0oeljbjcdjvnfkqzodyoeka3jiw1jhvwn8blum5071l4zoqyu7620x66sv98lwgm4jtyqmrp9i6rcf0kjewjc0pwzt3iq073yywlf4eacuwl5qzsm2hcvz5k3sfkrkhi2k1ww4rgwxnwdgb7rr6qnqpw5sr1xgymuzm3qudcax41lg5zsvm2rd1n5ey27e5flp7lybc2oaik2clvfauommfepoiqapv74c7sclhfbipfrd9uzyuuae0dr',
                name: '1r40h5wy1l6996dlgfq3iax7msdcp5bk5iuj0x5mormo21zdnssddabch8cz0ea4h71nts9kt6hn7y2xkgjfhbk5oxrc85lkp7iw3yh5a1qp6273yf2h8kf6hrbsj7gofh5tys2o2gc7hyepfgy5ut56jrbb9ype2fm5g8xc30mz4g3xizytog76lpkd77qmft85jd9fjvf6d6ff3b92pdhhqf1wwnksi1doo3sa1ymmy1roartuuvr9xbyxe8nohf6ezmi9yvyp42nf24t8xxqshy2yg3wv0oosv8cfgv3rh8gt6ao5qsskaeh7tdx8',
                parameterName: 'srn7umfzmy3vxkfhzls0bam1mg9z3n0uwh2z0a1nmcxl8x58r46kwtl9ex70r78u0s5sd4guxuihjdewrls7blhpiighg39g2slind1whjp8t4mz5q19nukp4natr2ytrtntao0akhd89rjkmyp5otuue0cnu2b401v5t40aunp4z9qdvst4bkx46r72uhbqgexgkgojrfx9qmsk198quz0ycsr0h7glf15p9ljib9om7ufz3dzbicp7igvpmp3dh1m4cctziz2aec8tii4ncbtxjtxcxaldy7yifagtqulem6ohghm4xplklk35r5g1',
                parameterValue: 'pm5s1buv3uhuttgf8boy2vxlrh16kpc481dj52j576f8cqlql3fmtrc0mqlsspmcoozxcgoo4jvzsgpydf69k2cqqcj30ba6t81yr7d3sl6vpk6v4k5cndhcs60ch710rf9qwzi9jt6vbb8mp7bkt1frf1z14c42i5jwx3rb667lgn0dyv97oivu9ae3q0bqfgswhrb8erkrtn8r3ysukljjxqt4z84bqufpym0j9c0yv0hnq6ah2jyjk20tz1qn0960r4vhhxo2ctc3nn8gh3wcpx7ksm9nm8p51lh2me51fgwbz1f903n4237z071ivfd3zrqtvt36ug3zeedunpifdg2au7qascb99uov0avp3h8xgkhsxnmhalmewhkll4dz01y1fwcpehdoikzk9vf2et65uyliywzf06l8um3mliczw0wxm9udca4r0k46aw1bu914o840my75eb5wez9ogfqfsm4jhn2ow2ikmqhutt3cesctgfrdoeagvak230e4cm1zi3qmx39gcpy9szzl642wrh8z17ep1bpib7jgtfrrobdt8srgfqavauznxt3orp60sor9blwqhop8hbmwl2ks8fwx4mk7za2tivjneam1xhfby8p9bxbgclfvw7z2zyz2u3p8ilgicppbvgvqqgaivtkpgpzhjov6lhsm82w98r9770t76wkvyfz6j3z48463nu1b3ohs0u0v1jk9k5m6rrl6ei2lyjpr0al6l8q2j69u1p3frl7gio67ru62sk9loakbk7mboeleo4jth75rruuk0ff9fe20bnwestdch1aw7iw5osg5hu5bbdjrczosn9zbdpsatfeavy30qiuotnfvxqr4s7d9ohm5djpbsw4al7ywbcw3m3iopdezl1v6dr4ddd2696cqcy8hatbp5w6ei927m1e3el9egjlneaoc0fggjrwjtmi1ryfe6jucyealpsvbbhpt1id2yx7ivsnb0ys9kvue51npsrf2p4tvvfo8tn7e9ovg',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'n96er009ot4h2st98cnynv9lal7txex03nmr2m7b8ynfun32we',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: '4hm2re5buikraw5lgfn0',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'kf7efoksi3y815un5fjv15i1wv4qylyt3kfk133lq9hmykjozcbyos4rqky03fraomfpmnvfs1262my41extw2q17sd6s740z2p5qwxgoer1xqiryunmfuxd4k56kvv3hdjunxxqh6k8ggxzjvc2vsx0e750dj3f',
                channelComponent: 'mzjme92pcsn3wbgbj863blv4cj4acew0g9vyglmdbfa45weac2rm2pu5txxwta8g0hu6aldjb6ouwa6196rz1z40r1077omi5zskwpthexow6y8fiq1pcrws99pdd7ow5jvet4x6t3zbg06wmhjkqvay29tfprou',
                channelName: 'ufttudbjptlb0arlmcewlkn5b18inhige8omwzy987nx9nqripmon4ccv10uo0nlmal8maem8dscfwfx4u81vxtniy7w796r3biqil735uoc538yjpzd8bb9cywpvkpgc4ct627amjq0kxnudh30tetnt4fmritg',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'ivzeglt519ma49pp66mj6vdgj8yacchknt2ouivhemmhay2ieicj6kwzbj0a18rt3xxjyliuomvjtrwf4r2cdq0wqpxl2m6eb2z4sp42r631j2o2fri2ejbqhe5yvl8jov9tbjy6z9zy1oux1pvihvng4wd7kqjv',
                flowComponent: null,
                flowInterfaceName: '5pmyalpxkye9xrg64i6fna93nq5d5wz0zn0xjauga0n9wzr6ks7tsb5ezbeu1338glmae917l4vd8v4tqbrig4l51tdg8qdej8txn1p2y7v2f9856qr3vdg2bdmedtkuulh4djl1dzuxu0ezp04ltau8bsfeh0wr',
                flowInterfaceNamespace: '1n9l96qmjq67ed3s6z5xelmmehnml9dffx91a5dgmx0x11u3ppr0107cl7cykrs4fp6ogyj5uqdyjzfj0o7kwp7vbraq22c9tg6g9ancdhh2q24xs7b8x9zzepya2kgutau5133e1d9ka96lcohmldelpdwx1qp4',
                version: 'yfm7rsoal4low0avy66d',
                parameterGroup: 'qmyxe55yzpzdbg6i23mzpzqxltzeg5u1smscguvxpg2sgbtooj37d6vhr1026g6mrso57mj18qxz219giqblh6sxsuw7d5ryvx6po2iun9y127zaovdzcyqg0x8167d08b1n02q477mimhfegr1afeq5je1nk4hycdvvc2a6nxlav8q33ekws05xvauuqgdo84rtwl7zibmq37hsrqphzvfrg7uramh7z4dv6yk46xahptgyu5qraa2yqdav99v',
                name: 'vs0bo4y9gg2x5sit120ez25aqdtgqhavlb6dqdxmvfguaw7l9ci55cnumqnc1z2jbhcphqt1ajocim17lqzb85pq5c214pwohds20oxoa2mb7q99q00nfs7nx3ki2zcof4p5nnhoex5klklet6aowz57moh0gipfbswuc7xfy54fkem0mhhunyhq0p3a0esy14qcrj755v6rqpqn3u52e3fv4d4vcf9nt2za028c7rcys49sm3fujwiti1s6j89nuhdaporh0vjkt6ene2s959rl4lnajfc2ymqp4sgi36coykkavcowfe3hcifrq96m',
                parameterName: 'x6ixrs8ywyigvsxh4nz8qdr0rz75f379vvz9fwzrbztrggubcb8ape31chvxytrc15ex3f7n6ipn22s0mmou56vheic73r80yil1u4v9r3fqqtu13n6jbsp39x1lcdiq6h24sh2d4vms7q0lcsigl2254syrz1d7e3kwlqmxjeuaiv2xgw6mbzyk39ayganxr2uk6x19u8lu0jylyxmfdph0j2dx1nwa57e1cnfz330hsv1be6x4kkseqefx4xhqm9kzhq9j3cp9u6k662plywf8qgydu10rcninkutmwkx8296fkx6ze4euuao8yns5',
                parameterValue: '87w25xlw7qlhsvxj8cuxya9dvqlhks0mi46i1y1ovme4qejmvtsmldqbvyuklqzao8mu1rly07gg8r8gzd0z4jbxv5x19shfcatcg2fa8eszx65p7qumxxlmugj35wr006hqiwgfp9unr7l25tfjrjicqsvf0wl38vewuk6mjq8k03y0wbazbohj6r8mpmhbf0ap83g7trbsoi0hrv7ecou0yqi4nn4luzuy377lkhenx1ssuupo6znxads98mouy9vkudjdn8n58y463fweqpew7scmkcu9y5ejs2wg5rxtdwfn5e7two5c1rki4p3c6b77pwaxxyi81ybjth6jrrrt4zdnm30a991wsju4wb9uiz9c29emvl33cmo9cwvcsrvv26ca1h1rtix0j5rulzenao59cwd7l0u5pnjthabbexuxf0z6kphwyecysgn1vcax44q7hgbehx9a60uduw1chatw72h6v535rv5rah6jbjtwvltumfcfrmuua5d11guu3q56ortsbf822tcfr1o7pvipdpubo8gdmqs42mdkot3u43iaj10728n2hxinn68cdxbtwqw8jmw2qeyrmlvwe0e1nn1uj4kqytl2ty51ktcivrsqykwyf6hhxfzrnhaswugt9lulxjgglos1u3svry0kce22fk2epzp1dgwczv16qczcaeqiyr0ku0vbxvzaoi6gx3vcjfx2rha21nih5dxxg0se57fbpt9csaga2rzlifh5d3cnvxxd17k19a9k3pe69kcbvunvndtceeo7kw8jqrw2xbgx31jw2cgir6abqzod87drbtjndyprx1th8nmyviwuxrp89hotgammyzh837ua50vgu4af8c6arhq56g3hyu5wgcboojbtsazdadkna9icmieb4sbd4e8w99i0chqya8vsyejpv4ikwmovc8bv2ov739bh4kk9mwpjz5v4hpdm2emyr5wfitsbbd8k5r8t1u8r5awkisz2edvtsoivwq888pj8d0pe',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'hlankuax8snv57bbimlzesajjmogbf3z0ljl6nucqbbbnbzg3r',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: '8vw4az5qsje5ux7i44fl',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: '60vt7zyajaovl7fd41z0e1plzn4hccfx4j21zuf36s4by7uwi1kfz0lemrgc6skooqq12qomhugy0ssm9awnrpqonlakskdvhmphr4qzgljf7w6k50quq0c2w829jhr12p8hxg9njg0svhd9oa66goazfv0hvqoa',
                channelComponent: 'gat4xunou69hheqcjwywjoi4e0zl762izj92gx861bhocnojj6jris81gbsn9il2ykh77dpemc5ubldlvzmmxtg0k2tmic7ci9yl0rq3ovzk2c380ghjy2pro2mv6coghterypydsrgz8txzm1lkze6ycgyg1jb8',
                channelName: 'thx3op1kt40stfg5qta8ozfnrjt7yqeqz0xz8lh6oldut5gk0hruswnw536fydy1fnw381p2ftbfxinfrtl41zgbp9dzkihkk5zmm4vi3gyh1sh0sujf05ylisbq781b0qgsjdg23fzd7kjk1r71juitlxkrppbm',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'e00ltrpqlod1a5pz9we4xza4udojlf47utf8fjw6p2qo598b8tbzymdaa9eaj4ls0l4yfqjrewzxghxo1lzrb74f7sexl3dcn83tr7tyuh12xr79fbbao5fj59xclonoc713b5gce4mc6uz5ujabn1pb2iw4wo4x',
                
                flowInterfaceName: 'y2nbihveitykuvlk4wvvotq1c6qxyv4j9eblaid1wcqqn7bmfnn7q193t9bs8h2wrw28qdbcelxy90rdjtacrz069ibg75cqnivebjxmenyo9akdjyt67ba6iy1rcp9sgyyfqwumfbf4jpcjf2w1qr8is0k65r04',
                flowInterfaceNamespace: 'xzp1wg72khw9gb1yprso30ph94zvmw3zn572ibxkwlz96crymn5yvcovxofl5m0gs2rat36kggcm3w2yzcf12jqakl49gbbt91fj7iajqb46o65eqjw4l1jry55takheqwj5kt93pwwshyxzzt7shyjae61fpzdt',
                version: 'o04v82kffkxptx3qp6z6',
                parameterGroup: '0kmb4kkzkwybd3tm6jiqjmnzlkmykgsxrqnk8tg57up7mit009lowq01vloibmmzn28bibbkhcxc7h5lo22e3ssdm05kn5cmjc2l4tky8maxx5m2mgne4v1iqvxsp5c35ig6tzsdf9s14z60cl37qw7axgms0khdir30n88j9avt55zmz3kq2wlr0blywsh8zvcyxquf9fjfhyflcz24gmddaf05j9w32cs9gltil89245kfoxkglhghljkihxp',
                name: 'oaaa0vmep0ld5tyciz4g1aqg4aap7mo3bpu968wzsgtzecq9vzpuaiee8v9nwin1227798ok6hft6uwrr7v3l2yoe9xlgksbveihyrlhzv3cgr4fllpyrmtbvx4dfmtq12pzhry9dwvg2zlqirm7bo9ubi7isqqdpfh98h24ro6zdxzuod7jdewz3zvwk6jkout6wg9wrc8smywow2am45440vnlat6dxfh18vdtuu29jhp3rke5hdujp8qakbt1939edln40cbbjacmk9bqa2ezp4dbf4gav448bnkythbd1q8kme6ju7ipdp1wxew2',
                parameterName: 'e1f4nygoo74rvyhcgk919d00baep2g0wpapky2n7884vlmwxqqht53do29z1rdbexzgg4luybk97vx46shld016rqo0nbwhr7l4sfiu2j9xesgdpb91twombi71ro76if868i0fy3o2d9zzktzzxuf0gf5u4rw1u891efjv4gqrqa7te64nghce7tg4hu13f34xc30j8xav6dhggkyyk24ptae5j3cd702k2dd0dgs04ek5po2lb9li1p2x0kssregyxiq4kmfoz24a43pagcb44wzscao9xh1hyi8laecutfau0fi9j5m3ac09wnl04',
                parameterValue: 'mimn0m6uczf7hfmbdhs4n86gopxodvue0mhi13a1anmvks135gf8e9hu2b08675lbgcwgrzvcdj3f91vlndmz8ldqalw8ufbryuwpgwz8kmcnypdywev34idcj3dhlpcj9szfws4khmd0j3wq5t2fub8cxsdzmsnb21yvjk8qrz7t9orswbkmn4mb14gg974q18bdloqviwb9usnas5qlcxuix54n162sej3twm3b4eknj6oe7a9fezmx2dkepl9jj648931true1gi8cw4ip24y04uzpg38ff6mzlmo7eujsyo4z7bv2023onbr7bsm0f78su7stql7hei8yhaaso2wm8j9252d8h75824qsfltj41x8u9r44xhs6zzicrdslkeo07mrm2cti85wx0scz6xqrmqb79d11klyrnwxjsblashpnz6kz6syac7e29z6paeqtm1bio6wt41k4wbu4k6i2x7z7i215cto4yzoo8sa7h3sdu7pdavz317j1v8ma5u28epd9bg6w0hww3snrx7k0ci1dhtw6hteunrzgr4dqoivarl29glnzob26ti0hqs23jy6e73cuytul3p9ehejotlucxf1zfqxn6cgld3v8mefs5vi4pohfhbxzrycfb3p0gona5n2f6vmpzg7gps1ijh1qrg2nblwl3ng3io2eghck02jvbn0879q1560fkjbdf9icskz97pz7nl04iquozrwoym3in99xalmzislwzesh004mp6usb1cs3op0gnnl80l6jl7l18tfiaraa34efp85hy2pj17577lkynelgvar7ev984kszsej3ladhs6i5pc470tfz1v5df38x86u3gb4594qnd8u1npul0xwltg1mzw67v6bn1pm20rs00hfjh2ctr2pjxayzig9su1uf827l4hsijybf22wp8savvvne39bdmt12uc4lvxlaw12hr21tol0tcv2nyqd7r310q2lsors2d6xu3jtk88fqmzzoecs18fxxc5opn',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '679f7akaiymi6inriwy9m6vgatackadn73awr0x41ao7qkemwf',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'wpgm3hnzlrzeu305jsfm',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'tqepcq18s3o02hf4345z1oubavb0lyggkn7cpbojlklm850uiuujgr0n8jxaw7a1kjuor08ku680afk8wm9sz2bdq85ej6clp4e6r0x83ggbd2g47fs5gn4r9g8rfad7p7y6tal2guoa1xg3s6s1b2gfb6570a9d',
                channelComponent: 'perl2jy4mjplt9ivamtubdslru5crcu4kph4wfi4ex71d199wfjjq5dve8dpc15lzeisj8xnt6zfzs1g0pg2fwzfd5a5w3qhcp03kfeknd8limigbzapulsiwq5g47zjs89o2h8h0978qbxrnzzffdyt9uz04u9u',
                channelName: '77j6xh08u6ucij86h49b6w5hka9mkdmvbe0acyjlru9ovge72pkqek8z9kgppcyn5b3i10hyhs12golp7z9ubakp0f1m53ip018h2bt4gx2ik24uiss9rkyqocpvyjqmqnscijtqzgscuzmd08iacurzg6or2v46',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'si95iis8ka6e8k01n0ixymzb001sz4t4sv7p5fq1rbg0miejvvb4kz02kjbbsuj8mktlnxmi2z5n432xysnr8s5ofd6n06oevij1re06q0l06jej0qh0c9pf05ydvpkev3n35b1ucb50v52wbw5ft3n5ekqg74jb',
                flowComponent: 'wnfkuhnld83wrs036hzc83tbwipc0r5yq2t8ydn5oztrwhocasx1dkbtnw4c9vbz56j2dpnhn57bkx67advbu12w16atyksylo51bu2g1z68tp7wqjbmhh2qu8e3ikxi33s9b52bsuz0bsve7e92toeq9ddzc02a',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'jz0km699ykohpkyu83fw7dzpe498qs19t9064t0yn1c7dcuv8o9jrbqmwaqyd0m8mbp8aejbt9q1w8ymj7rcp44kcje0mun2qjavlqmgtjjfcgeu6n1v0y98imjvlh3utox9lj0qmm60ec65iv7680utzzj6jq2g',
                version: 'o31kwzifn3e8cqp3j3zq',
                parameterGroup: 'mtegydgsuvrgv5h0q7q1pw09pk2s8bl0p1il9xec8usmwvh91aio1r35b8v9pizypwyd2a9zd9qfepy3wx3tkrpd137ndj5ld3mh11zhxbil08r3j1n9o5919rxn2rlg6eirn1gk8194dhqyt8q1m3gahqhae6dkwbaomy67wi15krgzz4rq8j8g0d924ze3pjpx05w8wirnl37o7dkt5g8veiatd2je5qb7z0l5cbsg21wej7mfhxua3tirc1z',
                name: 'xlj4fntmxgmlm4d7roc2rgbs4kizldo74vp0t8sdzvhqatsvbf69vbdiefz9n00vf9x6q6y4d3puntl5pj46s77zbi92z5pk97h3o9sfr56w0tihep93ey6dfpbo27f6nb4szdkluz73ck5f3pi8sc0ojhd0rz40pabfmu2es0e4loahsmnk61udwf5e2op8tpb9b32vclqirir3nl0iv4advl2ixra453xtfcmkgwx5fqhb9ojq9v4435yihrele465wc44tz38ie3odogd0zlc8x4a6zo58ur13bj294y6w83ravk4esio2xrevume',
                parameterName: 'q8r18pzx92mzs3zokcggg28zi1wo14npw0bqeg3a39d9zdbpeyl7oib02yq4vn5mfli20y3dl9mr9z80kb8x9ghad27l3hzi6ijo6o9p9firduh4j2xw9cmr0y8qfe4470ig9vofe3dkih63ipvqwaxqd13fh92iya7dk0plx2cvv0j1sd5w4ka74e57emh4kmh0e2gbnry9bzwpiu8brpiyk52xcd4jjrf9a7hgxuiljgd5fhnynz8tsfwzibij3ellppgzafxz0ge1ucmqekxlsyu8za2pnc32h7c9459xn0xmdf44viofvy1776k7',
                parameterValue: 'x0atidjlf8w1570h1bxtgmlzpdf8w2hpeke462zgaq38p2etr6gxm3l8rt12q6jz7pchubyw5qcifkd62pcrsx6ut9xin0xl4zajzx1w68vojvbw1wdnvqwyeczcux4seovqlrb50e9flj6pmtpq9hwyq0v2qamvftnlt6mjq97b9ncnu76j9gaa88qvqx3o1o9s4an798xzgsqfvm5jyatkoael05n3jkbj5qq9azwclj6opy4ucbxgg3jmgqan97eupi6sk0q4k92r7r22fv742bnhm25gxchelfc5gwv6xknx712ggcr8pa6ewjcdzqip7dq9w13esfd6rattqsc5i2g9lm38uds063af9ekr2spo4wk9yc6f2kswo95wbb3jvhxm6os2s2jl1gif3bk3zkt1bx1xvzjiqsb7scbvzvrt9lz1fjy89ri5js72nifjoxp27kvdqxrterzyevsx83l7nsigvy52svsd61dsmefifpmkdt127ucvm08587fpnn4fw7wx6cl49xazqjz38mhiz7usqpbkf5gf2rfjfw5lvri5oneb55ayjvpny78hd6qnqwe9sysgmhuz0jgq2q69gmghdorwn6r4k4nzzef1q9gdw9eqs7ba8n4ycobwg2q8ar3qslyaphbogoe1nnbriswhph6xdkp11je1bgq9accu7en9wtbuqda09ype5czftke9frxtsgo6m4f1nxzwzyf5mgnvm7zssznqyqdq4xod89nm11c3vuphg1ddogjhdo969z1x5c7j9ua68ary5ehq6wolwp763tx40lylvlivmh8c8pniop0x5j1szk5bslr2yzwu1uz8qpou7gqquqhh7fqdcs8o4pjzf8izzxo254gqr8w9yu4bgveq508u01iaikcjmki9lvxoedxque2j4fz1ucrfbkdjrqiqm1soymm6unjqjesgkoof3mig46nsmm0naly15x5lyahj5ah0e94jp3stqm7o7f8r6tn73j8c8aw74kan',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'dj5i8ulov5x63zqp097zx4xttbrfothxgrf8iswlq37yrw2nb8',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'zlzrybxqb62zjbqexqcl',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'yjo7afm2kasqremwyud1ktdxeqnyc008asj06gclwssqwaeidru8eda3dliwq4q458qn12b1lu0xkyw736x9obp0bo03nm0a3kuxkponkh8or0zc6wcg6izydlc4d595x9gya84vr73v9piy0l8q543ejmypjchl',
                channelComponent: '0m9uvnwlbmaqtxlcapm01x2imaq7qghbn9c1rxw9ntrqtfh2grot4gzsn99y1p3xdmam7qesg63h4emvucyk8hlr9k0o1fc200efm0n0zlypm5j7dqmus5zcspdu7c96pmzm0hob0xtvpne9de1y9hetdeev0ifw',
                channelName: '6p0ycdl58vegbi9toy271q3qtl5b9vhoa7r99733s7d5999cdm4jcysb6ykkmaxf5j94umqwdzgfcrne35hp45j7t3ibt2dolevdy45x8oz5khs9v9pm6irlxhsnmhgf2fy2b0lwr1akuycbde4v01faj2m6jmgj',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'tehn4z1auyp0beuzne9l0spa8d7xzp4djete7592tgw3vz0rwz1mwv4trruuqhgk67exrmt9zwopxfh8hxx7hzfg3ensbkgbm00h3nz0dst0y7i9lp4j9nkvprg43x1psd1ppafjs2kfnsig55fhuqwlnk2k3r9v',
                flowComponent: 'mfzhln7t3ju8p4i5ontn2ly25atm1vhmuldbbvn3ve1wutjyajm7l5e00vqptp63y6l1ebrxiefcpn1vzvic9xx22wp9d074o2lwchk9b4bz2f4dnp8imufjlk4zh3zoq7n3el4a8cp9ycyknc5jucvyw98fxqrr',
                
                flowInterfaceNamespace: 'tr11qc0fd86ia8emwhj0wxnz3nnma5yicxy98qd6mbb85hx681k4lrk6cirzq50t8vdta4lpspxji0dezzz5jzi3vitmewy5np4zqwpi3ave2e71pq62x0zoc3imgcbtanutlxfdg857uvdw0pmansky1vzmgf62',
                version: 'bpr4sf67knx1radphsa5',
                parameterGroup: 'hmwhb0kuxixiadr25k6pzmwmycu6c7cy2jz3vnlhbkc37n1f4ikdarsj6ea4k1kyp1jh2d5oca7poc3nd99ldgmo89oe2w0rxgbw4l8zjfqcg3kykmx3god5m6g42us0odwr8k05ttosbmijd5yc9sbwcgtl830zw0iuqmomt00ceip3ndtckd5jro191h9uw1eto2z31iwxux4b63vhewoa127oearptugmfl2hutzpg3x6erb1gq7qx3evfxa',
                name: 'zvt91jus6x4dryefh3e7eam4i20mkmcve3seotl5lu2sb18sdyymq2e2pskavpccclq7z4cjwbzc25l80l5d8nprb0duywe4kahscxfgvn5y9zg6azignjc6z2vpyff06l0hne4mkkar17f12hscexju15dvrkv30g2wfoam25wswre9j08gf6n3uqlt1wovaspk9rmvbx6g6g5ivkrpe26pv7tu5lnz0oxvw1311c52kh81yfc84wwx2ibgkj72o0x6hmlhga38664ni2jgn879wkfth7aoisd4gedbc6gajjeuwk2mxivmrfp8oexv',
                parameterName: 'qkg06bucpmez5fh3quvhc5ajv241f6qkrkoh5dpvav9ovuhrxel4yi6174c22b6oc7puwzpu8tofv3ya2hoxsl4thpyw23c6arwh3fotbvxq8gtf9rutfn5w3vbl3wwwckkxxi6o1006dmts654y2zu7wb0wxrwlbi7snbu6sid7uxx1z27y8zg8bw4corgyijrj2xeilisodcsgi6t8mmnio8fjipc9rk5s4m3xcmdkgbri7wc0t0y6ydz8k36wi45nv3za5gct7kpo7haaowcxfo9qreuod110fu0drh2cm0q0p6jp4lsmi5249cl1',
                parameterValue: 'fbqh7zi9xne8dzgdmofyq43l1sa6ujxrhr2ops7wcan18b2rrxgtmpq0iovyeeb0bqjj8pjh4ceb23bvly2b1mou87w6fcd0myk93nu4v2xm926mrdvxlpipp19q3vqc49nelsbb8y0krkrmfhoi23ocnxlb6i7gen33cullqt5jn2942vx6lf2nii2i0xw4gjrusy7oyniivg94w0upnnljp3o4lj73pdt2ctpcqefv3clz5bj6ui0svavstlflsgc4u1nct04v27xz7k17wbvu91ex8wt8l3qubkhquh8mwu9nf2lwsxp4zm9zt6vez6aynq91q7stmqw8wazrn0g6sk6jm9wb3v5wbdshmne53z0y9xx8r4jriwd8t0sf8hsqh7soagmogaxymyirphrxx8yrotswjd0htsz85upm020icmal5ywbv4ttu3220y1yuuc0trkuqmoby44c8jypeugssuy2ohit28vhe3duba8twg30ifl6ms71kp7lss83l6umn89i8o7l6x0pl76ldzqngiytmcxrhuepkxfh2ahx7czrhvgs4mz8pqbka4l2ajefxfidmj9lsl78g9968v2r72mcqea34u68387nb2fd2unnfomgr95adac82y1iysc8sfan3ci70k0ljhuv7wv8w12d43rh8ezood92ydv7y50pavqt3sftrbc8w8zy6sonrn4uqgex4embhru19lw9wdqdvsh2a0v64yqbeaf9u2ltknfksu7fyib0cigli97ixsfluwznrt8w0jacclyixm7y3e73452c18rvyy36x3yjus0w8na0ejwz32xqxtxchzwaijp4942cdqjutnzwsxqx7dhhsc6y6l52wfnsv5vexc48939ms6kq7p5oheiclksptasdyelelo7f7gcf0yh5rjibw4pk28n821f5cgii5p96m3m0lqa3z6gucfr6km1vbk15wvseria00gs6p37iwpfag64ufqyzem7ems3d4yo60t7ghtx5',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'fninkof3qjpip66s46vpbp9r8l53fwrl3s23e37dim9b8hgqre',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'x2ued3v3rq9b6gmnrgdi',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'xji2cxiq2sfgci77nulhyueug8nwdqcgztuorec77c70v83fhpanwjk68e0jqwsy1ixib9wow5nl4bskha5ij9s9ntbkrrjijo1m7d55rezo7akz1r0d0cf1jp4g9nt78v1ragbs8w00nnmv0rslacnt1ongpo9k',
                channelComponent: '4loiuvgvkk4bojl9p8wppcc6k9zsan4vopn02s72z4rcec35xbb0otnb9t6bndb5nc20pk5yrl3d1v390mufhuz1y9aitbn5uz84z376wylnl90be11q03tzvauhcc3ofgznlum7w2v6yvox4jb3tecqmdlnatqb',
                channelName: '0icpnqhkgoqpbv5jqttdtyeqslf1k72965iond3mznzp6ylkxsgb0x46ww6nd2hqjs0wp9j4en7bg2i4icys70jy54mazwp2a7tbe9bwqcpfkz1gcz8w8nc2u2fa9p8tdogt8hxw4b83isylugwh1hntacw2hhun',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'v3fg9up1nsholpqhg1t54suxdx5p590jg01peydkz9287ity3ue60zue5hp0xqobnahbx0b11e845dc85upu19l0qxj4cnjoruelj72ho3euc6y4xm3k81f049mzhyah4bmz32iu7vrjsj6y8gem8xjce6bi20ul',
                flowComponent: 'h8y1zdu5kndjcwvtszeod24jjjhu3xihkvfn91buktarld1jziwo1n8hy36k4z5pwkwsfbx0sq1qnxkcswx58uutpxgj16l4l6s6kc9r37609sg9pbs56tcfttk87ohzn5n0wnlrx8hzglpw0xbr58rppe2snzuv',
                flowInterfaceName: '8a2anxbplfahae91s95q7ojed8tluqn60dbi55uop79lflf90hpwgvwh2y9c6gc07hij9t17smqjbi8m6y2szz9pqqkou9igb23uuqz9evvy04966as32fcpze5idq5gs96nrl8b8565rpb58hda2qs7ysfwvd39',
                flowInterfaceNamespace: null,
                version: 'jhg1z5cbaosk1lx3u53p',
                parameterGroup: 'oqtmgs2gzygkwqnzf0qpzd29ek2b5spya27mv5jdw6dreio2hultn61f9g54nexfz6j81mk37gd8h3da5ztse7var90ixaw2q00k3ohd86k49juj8ad9tbk5vneicmx8p66x7b50g3ylrcjh3afsiuntrgyqff8364rcuu9fti16itqcsdfoddksz5kxrjli0veixbviwnlk4bkqnenyq9hddntc4xjl164pbd9n51vd5vqsqtpi43b3y35zw4m',
                name: 'di3qe45f6y2h9mbhuzz1w2v0sbfy556jezn4qkwkbf4l0jey5qou969sasmpbhiijwu83guq2na0axfwhojr41buptb5y1tmik7w7yar6xyxscx9v6f4y5kzxwacl8b37q8icn2i64tgu6i0pfr04efln0bxfvp0c39qflsb5rdr051ctm88ft8j5lt2ebcwaf7bmfz9da0ve23lf35r7y54joyjoicm8piqgrw8t498zrycukzqthbmkx3yz0k09yb1yts53diee6s5ril6z9uz5j7rqelgcenp1u57l246x37jo2gh2h3zxi3p3hnk',
                parameterName: 'xmo7dotaco2xbz2xyv233i238xdafkvtaf17aavbpxc816bdh46y713tnpv9gkvyeige1yoyd03qj8iu7daccek992ki3p4k3ht8rspn9f7ubay1ffqwaucij14ncad03lkxv6cki61a53mjav4j3x2yocqhhemwydz3072t0h1u7ua333stybai9rbakjqpi0l9oba284408uyv4naw719lpd15g4k9lkln4c5nsenklx1kqzg8tfghmf060963fscuq479kdaz14eqo93fl3d22fzetoim7t66cxmm1w8kl4alknzq7ol34e4n3uem',
                parameterValue: '401az3irarhm4giz8sl4jnwlzj15red71ts8s8p2l2dvmnd9jyeuwq3nczvfdrz1uik3y0jh9lu8rxgez4hqxsvy44au8uii215x62dcyacc0w2mh15navsaemg66goi6wjft2rftn3o2o3vj9wnq9zb5nm66dur2bscie1etj4i4pxpm1pmehlfmr2sdper776s14o3yy4rntc51zim8i555iyuw5ruh0t4umfj0013v99o4e2czao5qvqqaik9dsctnty410z3i0hv3u89rijceu51ca8zwo8ozbondwvwwfmyiez7uwlbfe9roz6fk6a8qzng2ichu4bw5x4y04aktrtjn4196xpzxcu5yxmpwcvo3rqcroq180zwfp27ph9o73pa25h9h9vaxzlatr5v0jl1o0fpsc2pl8pe7gxdrkw0ksh6nj6tleh9v9re12ebjycf0fd8mvtupyqmo4ykzsyrldc40icok9jbrvlhnuamowghoklbq4cwik34u4eondndi438zs89h8z2pyhg7s322hf65cw5y5nppsiaptxgxptpa3d785h7q4xyok487webrhsw9cd7yih75iqqb8ug9q80bqc42tgztxleblfyvfhhn8hlxyig2v7w9vpkvn9w5tm535ma6od14dsijhiqdgx1vo62zr8qjmjq4g213c6pdst3yw3msbx8bk6yhq23bekr73lujuzx23wrwct0xhln1yvq808nt7mx24ajhtu9pzjsil1vzr8c9msnc6qj0x67h7u9pj9ys5hdsnuk3qg36tu5izl6ug166gv051tsbk404qcmttapwsk9l3w4zd8dcf2lzydayd5c5p0b6f92aglnpjosn07x25a0q86ac2fk8x38j13ack8co6lz4ybkyh8w5wltae4292t7a3pexnd6oj41pgynjkr5io3morx714xnrhg7rlc9zt8n4pwdg6e9ux2ir2t8iodf59q8h1pobg9myie231rg0qevx8vmqr2fomr5',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '2a6j051cmsc5wgm0v8fvr8ecswuc0uwpduw3fd5jrukgsw18d6',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'mxw7ycewsncio9l8sxc3',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'ev45ezqa5q9webc5ucjxjqeu3kv90ek0bptkoppz56hghr243ep3yhamsyt1pfvltijoeyrzgtyotuz0vtroabp7tpmq4pns8i905jjtq3mzcsztibc72cx4nc8aukvyjlcikpfyi8r232oeiovyiczliv6ym6r5',
                channelComponent: 'kcrg1ln1ducounh47wwecoyb40jw6yjhirita52lv83tvrd6l6286cd6zjuliw6f2oows8qgaz493sgjsz8c52f22v4uigtm4y4j2sbmai55b15qcm4tng5ekgxmepoj90z95psae2b7rqi9ja14y5b9geagdonb',
                channelName: 'hea59v4qqyps15fcwdl9ar53cjbbptohfd4dzkc2fhlmcuvdxmo3rhbb4apz7hx2tw7rflisqifpix0xayygrf92dvqr7dq3bu2q7f9sronqls6atv8ltzviy1ecq5kolieihgnnm7ufj7mymtpwx67jz1rsl210',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '3ce3emqkesi6f7ny12ht5nvvc9h8teki56njxps41y6emcw745936rjewcji547nh0e1i2ng21bjsw1uivuhvjhhoq9sedniah78on2yijlcy1b4eyfk451sg62ojj8fmmkxs7mn07fixvbkw4qshrkt9ed1gjju',
                flowComponent: '19jpj7vnwr3fiiox64hf3dqihw7yw6i3yxw764wz2sapvig7thkfngqbzywn7yr0n2zlmcggrdict7gbl6krj2cx7j3grdbjlwf0rb6on40de2o0ou20a6ixo5wfpup2yizjbi6vymbq24mprxnvh2ghum716h8z',
                flowInterfaceName: 'qp7tfksvkb9th0kl6dfvgx3ja5gfh3jsi5jgvgjq5ctj754ifsq5pg67j86x3iqt100vr770o72gddtvpluqjefcf0a6ehnj8txuap261bz345zzo0jy77880sf0o4lx73vqcet00a2gxz9pvpbu92rjbmtfk3ay',
                
                version: 'bdiz4b7bqen8ilz2b42f',
                parameterGroup: 'tgaj762gfgbqkpi6r2osedojjlt9wkxyjw4r8nyloye7hj881bzhbpysaj1xcx69a4xdnqd6le7fzwnj7v3rnd1m95e6ekm3ex4uppxvd7e4mb6j9t1rhupvc0dbkqtii51ft8e3yg1lvh1fw9d23qjboc78lysub9syhp2m5l1dllitrnyp8a5tozn561g6rnp63dsjczm12tslcieui6qdbib3yvm3w3cqdcubymx8sg8mg7ca3t6x730cbmm',
                name: 'slwuz96xqqlh18q7b5gjtgrseq1564zst09eiddl6otn3y31tjlw0xa5v6fu2rf16pd8x1e2mg20d55xy34br75ft0hg0fhc1vbz3u68ys4sbojx0rd1zzqzph9ergn1fnph0qt3gzd4318ytpu4tramyr095icgmjxn7s1qqkcli4y2ghv9dmd1qzcqtk9iiderdes82e9syn5ovwfpfijab24sgi8suxi7u9nanm5d8w8v52dy6bzmscbrmsgut1rcia42xifvlcehgotfxtzwfltcxwvqb3poxmavl1jh66uf40wgk9ux62mo96zq',
                parameterName: '292pql6owewhorh096r5rn7l7lv0hi47wqv5g2n7tm51fpesnnf62nkeles653jalu6aujfogdqyhkjfgf4b27caxf6sx2n3ic3yjhupikpix0pyd541hmzg40yktp43jqmw8vp9fup84fg9fiwytivx7vriskqv8boar761sqatqyc9b7t3y4s831q7y6oo04bvyuk895nr5s6bvr3dbsgsmmmbkd71cr6fu7fx05xgc50tdf3r7spik163biyfw97320gwxog23i2t6tpa6bq88vgkvcv5ydb45koacucox4rx0i4q3qgyfjsbt9fu',
                parameterValue: 'zqnqd64ggejguzk6wxfxcozr6zkv07955ac1rvll29lrt0xuenrtyzm3du9de32wmki8idsjm1x3t8zd8hiia8pb40nomxf6a6l8r487sssgxhk1nncsczt6bfv6to1y8gq1iesk4c1tep8h5874tcmu4gel8240b4kaxyx8wtd6ol7hrivstqxtany251vgu92mpaoqzu61l7q86nqs8dtoqfxyjp771xefmy4jjuttrs7vqe57jkt28uu3hkhop6z6yasvm6c2l5a6tldx3ohnxjw7c9ifbk8226w8vokubhw2g7sj5i93kkiqgjcqpe8zpfbvfoyi8szdt4e3g06dw1u9og9d850iwk9bep3mzq4nk35786xd3mumfbeepeb5qbfgpjtp5ov4t3korqpwzfx5pxmenlczy7ehw8ai2lxqvglmg2xd6to02uz8e1fetv65wc13jjq91ik9oku0yzn8vqwpc0k7ov9fp5l7b7qbe06avrdkcwuut54h3vm5r9zktt4pdbjwd1b9l57cznrtbi8nn6qwbwgo8m9raarux0svl8cqf7lygk23wst9ag33tm6o3bcgf5esopd8vjulf31ufpp0o8onbxs1gwaz7y8104c51gkz05k5x5jhp2ilbephovy9ei4qsd4wku5s7tpmz87x6pakv23ehzimublmjov65nt8l5i066pounkorxhxluatuqiqew233u0d4hlzt4d1fys3n8cryg9lcoq1myjhruonozdmfixbuhnkx9gkap8bzqix43qod0ncvtokgyvm5q84p6p3mlgh4px4blzol2joc7mze0vobbgu4trab20it3ubc6gl3xlnpxooh7ktis4gzj3fiqnm5kywe52q4rka2py6oiedzgr231cucisou41aploear2zvokrfir2wrzxawqoqx6mltg9h2k9roboefuixnrzvvs4jwx8em69betx8lddi3cj537wlkbw4cu5d4zre71tmf0k6f4f2bzgzq8v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'mblz6uz089vr7siat9n1t6m5oa098m1vk9kvvfhxq6s8mmtrp2',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 't4xpenir9m956egegzv3',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'hc6kuehegyjad1tvyc7fm0ek8o375j102je21axrgc3wycbr2l61y5qdjww54fpu9ld383y3vlx69hrlbutp9z5u41pfop7qe5ttoqtfqba4eisszh4mkmkksi7gepnrhm9njm1uk1ywblybxkeklwo6k626lb8u',
                channelComponent: 'wq3x2mxrbkuaxl44l3w569o7gjb467yh370cpgw9y3nn9bvzzi3sy4t9gh4f7nxwc0hhgifqvsigt4vptsdzsngsmwzjcjvm4xhszojot1ihz0l5g4t5y6eizdoxzcfuw2cadim4078tn7hi6x8c4g1vj45l3ibs',
                channelName: '9u1ukgu60wgl4c89ojsks8p2tz5tofwil664ccexhy81lemsfxxo2iwutok05mnyacgihrb4fpdkz6saotxjn07vb5y6ykqijzwagasblte0o3uc12bs8g0iimco1augmm784kxhdjot09ecbg3y61ed0dxmoqlb',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'u25nrt6h48600lotrsmnk4w9uzay87hyodj69lokz8592gdbey8bx0ct2g30nfx45q6p17nye4rcbcxxfdelgt3qrr7vr0g8o28nsl2hnqnwspsorun6lxv70707aca9ckpzzf8c0xe463yn8nyjrdnxr9a8gn3j',
                flowComponent: 'pbuyyvtu9342p575t4kqusvcvhfqltardm2xc4rzpbxeibjwhxb9uwl5bizg9lr5dccoomgsg5ay2ajz5kk96rb288mynmgq8z61bgfk632212lf3zncagiw1xjednwnunfj2nlan16oqd59v1ed1tmcv0dls0ow',
                flowInterfaceName: 'b53fs4e3g3bya7ivrwcsr0q4f7l8obk4v36ja5qsdcew2sgaeq1x6ud0qe1bwuvd26c29d9glt80nroui103kelsf7yvrhz0jubj71vldo3j51z4vnziqprbl31j0vwx8btofr8am415yfa4l24x94wrr557efqg',
                flowInterfaceNamespace: 'by30txyud2kwbnnqg9xsqpwehxgmwxqi20czzirfcgmpikf4mdgv47clxrtyaapvysrstllnzjfbk07v2odzu256e760c1cda3ga219zf2257ct3bv95ji0plckwmsgy5nlbcfbvzb1l85ceessfbouge9e3pjjn',
                version: null,
                parameterGroup: 'qvq8wh9qdfcohhusl3ed8ckiolztch2lco45ilmrzb0hnaew6yvfcmamcs334tqdxvaj651eia5yak3v3bha13s86csdw3tmysy4ompf3kfc5p0icozcsj3jp3hl2a17uu2tjozeyhlqj9hu199ien7goe13l4oiy4aw2v1aguva8rbg5kq94rh1xalpmb9zyz60h0hsbt1m0vq8p0abtcdq2t3ethgc8w5a0tbmmanwmvk7xxxs17wg0i7rro4',
                name: 'x1ak4gn0wbeer7b4mjqwdp3i4hbwjl3lcp8n2s72375nhjnqtjaubl3gyrdsomf13cyb2skm93fxof9lm4maep1vsibu3t10uh8sz0cywvwk59lrna3crix2u00426n5sf5bqjdrlg37971cohqz4adkjfnh1sw6tc1w2znpw7xiun0kfb602ms52n862z5lepzsqzr6vv97r57v4dajobb8ocqmi2hf084a4uk9s9zx5ngdxc56kqnyrj9fqy35hnen767sxvssao0lmdh6wrhpjcsnvzy5s3s22r9vvlpl3axrq2zgfc5us14nlisn',
                parameterName: '9znf5ohlixvoamjkyjzn4z8y602vbgbk8pfzi1f8t544t89yg4pm1clsabrm8au1mhp9wzjeaztusia8k3iwnys8zqikv9cp05a1npgb0mytfmdyb2h2xrgu5s19dantlle2bz387cmkkbrq7ok613y6c541rnhp1di2zcqjzvrgolr8w0h8vgxjr1rcfg1r39w5ttgjfts59cg60x5brkdspgbofgespkl4lzg22r93yvl4cbyq0webi75d6k5s61910l3rfb4v2fm9l0ad884nv4umpyk95kz84efiufl12x5qc1xgsfwzy3rds9bs',
                parameterValue: 'rxis0oni25yv0ox5aavw3aidaz9k3xk6pqhrk5xatch10cv7pe9alr9iyusv8nbd4by5a8qnea6s7ksihrv1a50o9t24pfj2ffd71c4kbtrv8oy94nj51jmb0bjvfstihmihvynqa7g7rbyjgzkpjrbg25o5x952iys85iugagkamu6673v300yw9ik4kf2cjc5uexunvu74nxf90yriwgak9d8ntvawvzc6a8irm9ajtvlc71kqr4y98i8f16g1kcndl1wd1vdztdslr84sagdo9ycjaf9iq6kahcbvfmfqxp94h3mdp0dbevwvjsvzh5bavoszimuu0f8wcyuhr4apwvu1qo1tpsh37iz6lu6xrwz2e2dqwy70izh9r1m9muyj3lc6qno5863e8wl3t2ffvskkgh10d67a0iwkiloq027ek2qxno0ozvgrj8d72eib6s3tm27xv8kn7opxqkk1n9cbsha95hxiwj75d2quj1xsuve8c3fxvbgjztc5ha6158j5e6dbk3zs3rcexuchxkhlol4r2ej2vs9pc4rsz6k9slhghkfst0c315oxzvmn956cbljtnnk512dx8fisih4yvr4oqapjl1u4bicel05kqrrndltm83aya3jiiynftp6ww95imbbj3hrn1mqbz7nbh9tffxkcccbj1o3nw1rw9z8lthdjm1fns5dzujsgkd7f8ijxvia8mf7jgvgw395l6fvdpigpqcjic3a5qhk3suoupyjyn34g1zapx5hn6j58wxh4ip8sezge99x19v9sicmhdzswia1xgu9wtmtp8wzc6ovtazpvkmlh5bopalg48ob4snbyg2r5fc8wgg3571wistr17an1o776e1i84cs1mkzu6mam8ymw9y1sa8hsust64rtsw78ddtiji3jqjxd59cevvrwtek93c3slh18168z90206d020yp7kk7376sh56n2ch57hntnn4sc3slxvf31s6uref44kagfcsuo0oli57eqonx5e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'dhs7uop3d6groj9df6pf83w88y2ml8iy55w1jgljcin0jtj1hi',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'lcsjm84km5edl7pl08xg',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: '0cbcrfvi2vkh1n5a0kcvmgu77aiqpb6pabusnew7ffi6bo7pq5wqn8yjvz83jn40oxv1kjkjifas8nx1t8y85uspqvbus4ihe7nad1hjrdj69003ieurd6e7urijtlurcqfwhibqxpsgxl5bvzqxuhmgerwey4fw',
                channelComponent: 'ngp81gj3bs4lznoqga4x8nv9fdyig29pco1phw2w84yv2uvzu4vyfa70q3htbwsg8eem0d96mvre3ael7jdtrkhj6qtdwv19sn4w0w5vlsmelgmeukxg02lhomtgddd8pud3h3c0e3ry9iymo2ofn2i05kj40y9o',
                channelName: '5yafpcj8e5i9sc0zl9a0lu3f608aqozqy7508nuzvekp7sia24qntkicc4nol9jmrgdkdwjvkei8di0249n681cv16wff1f0cn3tap64oleb2wvx8m85qy8e7z3duqzj3qji2nb4nsplt5m7tne9jbwik6m6hjm7',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'ih5bdkjjqxq8dz0dob0vdvlb8gufo7ek44bd2qknan3v4ubbwxdt5tuglo404xhxjd73w0tz7hyz041lba3frw3mf5o6ns8ojphyhhw16d3s2kw7bp4h7ee4uoiatzjc5f5xqidgk1yyg5d0p5z8lnattjrw1uks',
                flowComponent: 'rfaqpsznv27ewn0i98uafbkyhehpj5w17kjje31y1pt9401ebkkz9nbclznc8u0wz0rn92g3f64lxsteoax3gmi4oixma72bpgcoyywr7rlkjiitzw694nv6da6h84iip5nv4vupjh6p1fc2cqfkie59op4npvrd',
                flowInterfaceName: '7h2jhqvey82emge6y6dq9cucv2ny5u5spf7tybl73bmq3z1hfh7r46kuorybeo22la32tsh2yq5paa3vjd2r76lhjnhzafnjy4sh2k4u50d4j3vknjwyvn6shz0w7aa64ke4ciz2qj1qvdav4yuk2jpj9e8g0n4o',
                flowInterfaceNamespace: 'i9enrlwi4txfhug2yd9iltocv0v4clz6cuj9szwcc42dft6q732x3u3krhtn8lpfr0rtb6n7zfgai0jta7hs48n6he5can3ni16muwy3lpbojp3q48x2uvevr5z6hzns09mjvna2wr0w4mnz6pduoolb09fmp86q',
                
                parameterGroup: 'je5hfnfum46h4d1pgwv9newgsw8cm05ars5hlx9fbxfobsolqxz2v520101c5jao0adx3tncyfs7z8ctcammziidfkymm9spbmowimfwji0xixapw7c9ksnz99zst8wrtkbp6e48egqnkzjwhxsq1mqddeav9161qx34hamidq56u7jcl8eukplmt6x7wa6l3lnqnqxje4b5s5t4yy3fe7x4jwfql0pwjn66ednce6i5tx1pkiu08t78sm9sfmi',
                name: 'djbdt5filhjbiurphyqi0amr1xqwhz7kepm0lk2xuatzocomvhxmx7bknafygdlb76rcoxi1vosks7wne9e4s2bxgaqwepec1srzdz3mgk42t1d1hg3lwt469kyqy5ikiqhqi1dxbrdypr1d474k4w1lrt0qblnabwgwnh57860eb6xdd3lu98je0jjqoy1cbqjt5uofqcmumyajb8u35ca0fjg1b783njicuyyzhkoxyywhr7272z260gicxiei03w44addmyaqkjc5dw4l4xre13xop8df3hzxaz6ywrq8og06nq7y9z2inzip0ejw',
                parameterName: '0q1b0mt31lpv47nq1c45bucgdmz6smzfkbttgrpjr8rk5grfp3elxcydbi0isg0wh7xbs8i3f0v6d4fa15b5qp2ycn8y7sqmt3xb817no9rxn9m8545wsqxtsq4ggz76q5h96uzr209cznk4mxntlxtyjq657xza47w2kxzz7ir6i9pesgyugyha5qnu88mz27r5ozadgcjguc36hfzqh29eztwpfdriu2ewhodf9vexvi3l5zov4s4t2i76s0vsk7dh2resule9vmyt77ko7rvx1nigs5ym8zactmbil47zfkuy79jpy6d4u97bg2uc',
                parameterValue: 'i4vv7wbo3phf5l0q49niu3xi7tpz5eytdtausdqzbzrn89k2umlcr2vra6xtkq3ewnw2lf6bllnp5iguk2mzion632nt0v4zc6oh2a770z6ftxum7xudim5q1bgnqn8yjru51k1i4narr7sxmo3hmhoj9wsqwah7de11v2j7bo8n2fv5qmia291zgj542g68hus3jgqczenm89i4p0i8ktqek2bm99l6ft3htv2ujkvxn9ajxext3qb0h46kky56ttok8kqt4ln4s0ky82qz747rcqtdh3owmoznwfjdiqfacinf85wuzs7ubakzktnrk5obwvhm37ynnjsfd2rpc2572ttufeiwrla31w6d6q5v0p29s2umuw7cq5timzfxcsnkomqy10vyus705cjt3v9p5vluzzg6r5mxv6w4h6c2bzp95nnij23bdhmqxzouk8jnw9ic5h6lq1rwgn1wmj2p77rwmk7eqodxjbugy1aus881wc5z8p17jfejcuv7dif9fyf3uyj5i1x3t6e60fqd1dm6qhbb771n8x6zjr7gh2ysd1k58xy5umy56h2eavd13ydgi7e1ysaf7wm25h50t39qccdb32t981wfc600qjo9vih1zci52x8fcdyze9qrh2cnlvmgspco7tja5zdadfndfxun9hwvj2wnofbjd25xzzat2rojnwsfij6z42sdyjiboei64yf9o5rkwtqq3nr67co6hd8xaoi9ndmr7kcud9rtjlcotmrz00kzc57a8005lmch37ingnoeo65g0znp3b65f85pbmxjry0sj3fmw56f1yasy3cbx907y4yypdu7gdmxv0xprklk5jtwoentlua6scby6vl4s5t1musk6cmme4tk99pr4fvj8bnvdj5v3lrj5lg3bg55hrlrwfvr3asmk7w2dykzf32o05ml0p9ggy7lxi5ztjnuea7upqudfdootm15wlvl2geqsazpjkhal7e47e705onn40imsvyoffar3zqzs4fi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '2dxrzfxrufguybhwcw34bdtct8lumoddyxf8u',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '7qlf4np5pcre73krs4tg9hwrp70o9xgyoasiy6t2fejha5f0mq',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: '2f4xhxayclzidb4l35uv',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'xyr9cs9sjsltzr9do1yw2bnqa7t60tvqlhi39x8wcq36fginpwityyk9xagp3sv54n7ewmi6g9ioz91sbb2e05qerczx8vlcs2fzteu6me2bl00y9e5bksgx9vfh97wss74gohuaol9k0uo358hl20l6u1jale3w',
                channelComponent: 'cc5sppanwqwvud06aykmg5b2nsryn63tim9ojicoqkzmj9l7np3l0xlqjd8ukkzru84kltapzpn0lmw0j205ymbe4jygschv2940yh2bxdw6id8mqklbv7kheshc57j8ogey7j3z8rznboyr4bdw8r0mwkuc01pd',
                channelName: 'llwsq3zj68rw1k5icmo53v5tyjb664sacgwxj1z49biy991s8aaxrlnbd9lr9u5ahz5buha52drcb0dmmdyzblpd0tntsfxhys9w69trupspd1o3mj0w4utfijtlpeuf6cw62onhzh9zup0nixoqrlbq78t0xbso',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'vaogsprrzup912fkpuueuhw0c5jsnpdk6otb3pxu6un9veoe6fvla5kiceo28sr275c04rgxfq6hisb9yhm9z464xp1srcrj5940574svnlrp1ry2x26zd4bgv7l7f1n0bodypacfs5hprujqz6708yqmwh8orx3',
                flowComponent: '4o1if7krw3iww7zfykq7uaj4lxysav23b8fylt6rknamnnqr4tcyjmxdgxv67v0btt17gajn241gm2xvsfd4pz0ty8u62lnhgk6evoeiygj8uchyx4h9dizivq65s27oa97fva6a4pxbzm3perfxrje9h1g4zk3m',
                flowInterfaceName: 'gnkjsrbgp68a7hsfl8ej1lgqsu7ktc7846zmrtpffk7xg85nu1yjdleb00am2jmjmemrzkfe9cd78gwds7zr8lvrt1tdbp68k4va873jkm4u4u74sazaxq30l29r84axa3rdhe7smo0t8gk479q9e56e48qk0e13',
                flowInterfaceNamespace: 'vbx1go7po14vg6s0tkgc7fyukdo7xqldjgck7bmvxc03liztf002jtn61wx19se2vy608etwpb5akydr82yjsk4o1jom6yp8amje3xhnzu0uxx1c8p5plqc0ypktwj2d6n4a7fax4uwwr17ocvxnucv0j99y4tzz',
                version: 'ck73mnl907fakgfvkick',
                parameterGroup: 'qkt91h5skmchi45rp7qppqfj7bsuwyw4oe4b9zq85ajchx1alyuhwa0dnevuyi5futk04djosmrkpttcyyzcad087y9qkcji4d3jwfxsrhw0bww64w89ji97y9l5rv1vmyhtksris62ut8ngbxv8la8nar5xthk7venin5gpjsl8ue0dov1ba54r6wjtf4254q4nqe1df0y614pna1xkkk3ic7fqu76p254eyk8e6c1l9a2lx7a28efr3pzp0pu',
                name: 'hdom8dhtgnza6mkm8yo3yt5qc726f2xv5g79ja1897puw58qw8duh3zc5wt9db63t8655dxwwlf64u2qx9s2kgac39z41dzaikcvw096il6on3rxgddtjmemmb734au52mtzyc6jtleaquuynbxxpmdwlhwp91bx9mylosm65yrz4hy4twkb4qcjr2pckcu89wvxnr4rhuibg3navwx0hk3ef2erisllcftm5gfaalq8wv671tizbymf7kqml3htffi26pvy3x3j8471kj5y3eie34kmeev0r0yy9s6rtbkelfk3uvt4yb6qfi536e2i',
                parameterName: '18xjmdh8slyghexf5g0hsa5xu02rg1njhcd54oookc4nki47qusjfeqw999g7wdwbo3lkohrezj4713dw8e5wi2d9deluqj9rgh1cqgpp9dcdvnhktvlcnrjm20d54c17gmlw8dlgig97xweonrp70d7p1pgt43x8ztw999g2otktreui5gkz4k4rjtled9bbe9engqcnygtv1riz9xwpn9gn9rm2zkx8vmeyludk9w05dczyptcn7mbw0oowj4hvwsxro0ult04j9mxxndaa54xguly88cr1woi8flkehfp2ovgi7ueg734pmqnwi5j',
                parameterValue: 'syy9954wohfxwcoo66cfpammn3qkgpmi5c72ckil5c6s3muxs7iqvjvjyt7kbf0prqeee28yufb5sh5ywqmx1lyn3mkf059b4vr79el7dakw84hxc5dn94o611f5exx7489lxaxirj6oiloh5j5qwlth49zk8p6mw9h68000yv36prh7aazlocewdnan42rsi2z3f6szbln7f245v95tvlqm9aqv813o7kigokx0wtj7vaes7hjwvpppsb0hnwaa05kvzxoo8qw9ljgbopg6qgbxzn4e9a8cxxhc4vt5v7s05tnaymk504307mfjsz7kb8kx9knloko6a9jt4zszgdrflp3orcmh445msf0nmogg1zruwgne8jqyizw8v0d6hi3kbch3bnr5mstmg9yyrwea0d8zb51sx3tl35v7w4mjnub6y32ijjf62lbzo4sh0xf3j3bwsnhsq5uf76zujqb5kd5prnfgffzxbhytbra98ad2glbtj6g0gfx4hk5jd8g3vopt7wzbve4w9sno2602bn911wl5jb1m3led6b8sv59i5mr9mldyjt5ubhunlln5r9xbdmhnnvyeywldxdlrii62mzmknyzi2d9c40z50cpqcf4kgzg0ro42eze7ajf12zuf8f9obzaa9m7ecxk6eap24d69rkygkfz8tphpsot7ujd6kcb38m6wfoj8k46oskirmvxrn1iyokp9kqza74e8lshnvxy1495ma89ktxs8vqi388gdbidhqy6zr7t2eh2hzibsvv57s6939ccxgbtx5t0bt51t8d1qtiva4m6w5wtqy6smcis1dvddli9szl4lhlxfif1ie65k6zpp11wjkzerdeqgd1w56d6d46swpr811aootk9wv662fh2blgvvgbn2sfw3gn68dqs6uocfwukabdzv2tiss0n90czl24zfao5qxr3v3epdgwvruxveqa3b5ewup9vuc6dd6ijek1nk9yx3yf7eqcohb39qmgzz1gya38se2w0o',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '6zvg0ju3ihsb2el29w1a6amjh9i0hviq6vle8',
                tenantCode: 'dmt9clyhnhr7tzrqzugj5194i7sk1q4ku2d6sqd7vgr3vu7fqj',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: '5jhk4khi5isqmx5p6iyx',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'e6zbvra9ftwpf5gnhlpfpqi89d0au7c17ed3mh9bmox7ymksnypns79seiitzek5vcxcfhneccne5nx7sx6zg3r3tfyqx3y6cz8grry9igvbx0ogttxai607b9w057oq5slz0enmcm3lkrgpg3bin72uqv6w3b1k',
                channelComponent: 'mody7itns9mvf6xeaav7k7l7mvu4sakoy9eswvpnqhktyb1uap27lsn5wen5fqeacsmyr2nv980yinq826oor4yx2n2v6q04s4gxw4cu0pbp6g308rw8p0sai0w89v8uz8jzfm2wrqemd9hqsiguq5m9nt65hr10',
                channelName: 'ytxvyzmv0ehi1xhbeh5s1uvwht0q3clsglqtzbmnb97ypfcd50vdxoob58yl3eaai5ikizg0wqypyk8panjyvmk6brbloevxkl6p0avb7ksbcywvktmavmdoxdqqw4b1s0vu0kp6249b5dn3kageitowz9nrq881',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'wr4ew9rpcf1m4mnz8qun8fqfhynoapvh6v7xdqpvu8vas589xfwhdxrvp69tbbievoz0vjdh9zy55vtbh06s8eob0kw2jep30d8sx2lje4fff731d47xccg3z4xej1pul6p46zjj8lgvucsw70476yy74itirgwk',
                flowComponent: 'xhavezjiuqmp3yjelxhad2gayb0zo05xkaadqhgztihqg4k3jpijx1dha0wmokhowht994u1kk06gwosklep9jifgp4dlni57wwxoewma3923yb7yug94sxipv05tb134v1rm57fz89jaoldbhdl70eycfgv1i1k',
                flowInterfaceName: 'ghhtvq0cljrj4y5hm54azk4gwmdfz78dfi0cclraw0ub08mrqfv6ie72k8jk63cj16r7vn718mu5t233dymb6wr4bm51zk4x0uhmtn2v7bs1zt7orrmtdyjv5ntfpo3tzfbsk7xy7ow1j46e42wkkxacc6rcmwiz',
                flowInterfaceNamespace: 'h0goigo1j1x8c7zjab3zv5zcuf8ulb3wjpdawg969n8ohngf239ww35bbe6m0mxm2ml2zta92k2a1woey9bv9surtwpmn9vdi5an73srxqvzgi1dqby14qqjnhscx2cr5qxzvk7j21jnzne16gvhae88xlt2oww0',
                version: 'a90eo8327r0o1ml9hn7r',
                parameterGroup: 'mmt97ec6zjonkqu4hsr5qbq59689gv6wt486tl9b1dhk90uovzafv1ydu7gouzqpjjgpnro2joiuijwdck3xixhapx23piyfmx4zkaeb2j0c0ni6lolgau7pyfr4hfeecesv4r8nvub7w0ylaizdp4e5rsr1iexmydoh1eke8opbapj92qx8b6cstybi8d4bjirq4ogtwxwxir4c8c5cyrm0w2dj4arenndp65c4zd6k19xa6awjvqsa29fpzxt',
                name: 'l5i0pb1rt5uk4ehb9i4cf5qa5en0yytih5foy9zxwmps5vn8t4v8vcoj4ng66fv9xfoco01d9kttrefxjorfi740ocp77uo81ej2h6djliu8l8bf2tvbmq3h92yzgmdmq51uyyfrwisiemqe7oxdp5d178f2ymex8u9kvjy8rv0g2i64fueulc3qale32ceflhqrg43aw30m9kwtow6xnq05rgyqfikmzu83g4iq2d8uqy7pqsbs6h2zwmwyrif6vyx0d203xd6mrqa2kqz8lc0l6suc8lclqv9kgby2jcrspx0momq8fydhxdd0hml0',
                parameterName: 'vczs3vz6wwtmu7xj1dakeeeg6sx2jfmp560cmtvrrsmx26vnkjo9nea98zrm0bt3wqiopuay2hyi6ir2e6y81ch14pzdjqwmcl7jb0lpsunfywwv5t4a8269djlix32x577v980o5iuilmah3a7twhsgtbcrlrgd1t01mdwzxpac92w2ov3q8f77auvanam2yu2miyop52jq3293xcmf1xdd1ts4z5fh0315rxoxji6gtnrq8dkqy4128l15w6hij4c2a2s43lhbptgizz45cciuo5azm4ef641x14dej06x6prmjrmwvaqb3cy2fy38',
                parameterValue: 'c60xejs8b0hwvde9p2wk0epkghca0935snzcki716hrqcta3kq2pq8vxzvrt1xqir1c9h1mb8by3ibqtu5ubgrftp5k1ssfpo3q7p0h8zobwhs7iw3vd1gtwbbmsk2n845i7ez9iklvatepvd9vcc9pwrjcn67q6xfn4epwdrok0xfg1xv68mdtqlm019k117mi2c9hnt2d8xpci0a0ouc7rcn8x7miq88g2okmo3fm8cepfh8kp0486mnshks6lbzjth2qw20xi17yjrqlqd60omm56r3taifmmhdp7jr6vead4stz3tzolqso6wbvtv1v4epzqv1g9hj2h2g5gss8qjofcn79orx7bx3e7xe07oigucwaq021brx4bnoaf6r8281wyb6gm9o1hoo9j57eh47k4bvmpccth4jdu99q9h2nk2r4ak368jzbw4a7mapnw83xyk3j15q8ju0b920df2avagpxce92rxummf1ucuee2agh0ixyjwwrlajo857op2cd4fp65jinoqbf6l4vfd6quo234tqru8uhzbmx5nmca1l2tfbjspsz3ohs52orpeft8r5ntpfw35hjrgf6wcj7e24lw3hzex9ddji91ill8nz4484ufg218poyo6ev8bdbwe58wgq68dwrgrdiiteaj5w5v29m5f9q15ceo0t4n4ekmpd9v7y6hf4wgwu52v3vb3bz76yr6e4571sd1w94otkfaece2hrl89uf0v9xigbo5xuyhwepkr5h6zpxf7pygcdj0zavflj5h8k6xtc1jqyn9cikaa3bf3xjwpelsgewzorzsrlpfr0x4xddul211mss70yppzavw9mj5s8sw5xeh6pqer3qimq2pdytnrpslshk6u3909s19eonegdeuu4jmyhp7i9jx36wf7nmqipnh7er71lsz5day2373mfd9fd28o3c7u4r26zcw8vfwig57tn0kyeaab9kq3kw0ikm5sbpllzeef94xt47rnjt0ww6cp1l44ffm',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'i3ojnhqyi4rcps0mhgjuocq2lk5i22l2xktrm7jpl9pnjlf1s7',
                systemId: 'yq6l3uqrm3az0kt7h2y98tpsn7aww9ijf6xxv',
                systemName: 'ueoymbajxs262rv9k0um',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'syaqmvk7sz98fosm4r0vvqinvlrva7b033gdysqa59ly8gs5wt50b77sf0dsk22l0pt37d2mkungji5atw9p8nky67cq3q8531u33sv6urafpko71zcbhtp01he2eliz6y25ztdvwuihfidzxoel1b98u84fabml',
                channelComponent: '2ftuatrx98obqp6npfit3r5uoc3s5wgn74mx3j0y96hd81rafc13vyged7u9iooyolvh4jomzr3tboqjr8fese3z1sfrsm78788ph9lm6xgf9uvtk7dkz68thrtg8my4ikit00hw44y4wsuszpbir7wi3n7jcoo2',
                channelName: 'fcf66lvfkwoi9k1bb14dur0vdu8287tr7butqxx3czz3i7qtdq27ow9xmw92popablvxg8h48sn91ziq7ztqismj4ql60squvbpj9ilp0t6tq7h8y5ozcjr8vx0c354kfy6p9sywmaolheiu94znk29zfqdwiuwp',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '84i39oen1am7mym5lvgodyue4t5wvjxa33ik7jy8zxafmzmxs8yiq5keuw6246dvhx6xvldpumm9a0onfppvkgwhpi6c6p71e1zl53irri7tr53p8lmthet7i1dncan9kzkcwtq01dyqc1t09x9k1g1x8ufy7k14',
                flowComponent: 'uabfq803kd2fngzppoootbaxsxwlo3oz6m3azvk01whwt1kmoj90onxirrcnqnwqdmbj8x5rf78mf2dbd6f85ontrffp563ii0di4z1qi4jtjotu7p122dn5dlhljxoqa3tgbhwbvvny2wxssmxpdqdwlkc5i33s',
                flowInterfaceName: '6yjfmusmz4wtho2teuhokyeqqbulr7zxjo5wq9vtzzzaifpx6vt2233m4hsnlk55wquj43lt7aum67we6u4wwkihu3jftv63xfemn4whzjimk05f8ddvzqzpigflce3x6n2ika1f8x62ge6efqbjpv1mrj0okddg',
                flowInterfaceNamespace: 'mns56hx94nwwr050ijr9b3g87bgdieihpf2d4l2of09vpdqa55jhjfqq4gpz3brmh5wcr6fd5hu7eubbujwq6aqcrlmx7v2f2j6hnwcpx5fhgxg44e03y31eyx3grfmvve8bbgaocdw0y8bct369hkew4t2hjvu1',
                version: 'j72q3uvlz2llylqkwjnf',
                parameterGroup: 'nc8mowzi5ipyqolo04u01g3y433xasv51u8wb34co3j2mnu491gl7vzvochy9qfiptz8qirvtxbgd98e8c6lvsspqfcmpaogmfqvqjtpl41nzl6tv99j3m1no3s5z5uqqpmfbgs6u471ejx7b3ubk49yqugb7jr50oem0iadvp13x24bklkvy87aag4pbakbo5c1xbdhpapts3r3qvxc82fb3lb88udt8aqq14334pnc5xc36ovpgr704n5ck5o',
                name: 'pgs1p0vmcgx9t02u5ln13sd8ylxwcqqeyq1l5trkekijh4mmeee6h7f9xe997of2rq6qxy7pcq9amzkmolqbk8j6pmezhgwvosusgehlg6q04fvitbuos16db2ixmq0j55ovj4orrbuq6sftedjxki825bhigge3pmwc5ym8kqog45grq0zhw41ay2gtj7okqzkrs5oxxdg3i7oxpgry20u81nsedk9t26oxtz5qyox3bi5tjd5zia4s33pdpd5r87kynzpmfgmzsmwj31nnmfy6sf2sm0d8v4erl5f0rjihxh7lhu57rnpk1i7i9f18',
                parameterName: '4zgphjgxuqhjuy207p0beb39lndkt65ufpdw4afqffes6u7x92q7a9kwkedh8wp9hno7j8va8581003lpq6gljmwfv2oyloo8xg2hp1c3x5dg2a0x6iiqvl11ypudtbero4rwtgiql0rz8lz87jgcfqg5c3zpdp8uj6gqb2eqbt9e7dyozhqtqftm5vic0xsqkujy75nwvtbfj3jk0ze160cgomut2ap4jkmxa82et0e3rrigwmms2q7hzk1jswinmvrgsqpwnu3vqr4z113bj1uko24rp50cs2jn78h2eg387u1pbq90ncgujs9yrjr',
                parameterValue: 'qrc3sc5s4ws44yzrfzklfirxdye9key9ugm2x5yyk9kfbou0vl8rw8f5um59gxii9qneu8fync027venezmdoseerelwdrq7fqgqu1lbbdtlcu5upcacp8ust87rlkzv782546zud2u9viu94qd5ge9k0w2uslyexdv8jrkp8qvvi0l42lucqt92ki5hhlgswt9uwca6ifzk3h3mfxccl3e79fqpfudksy74s5f6h2a6gwmex9nes5n1m2ekcwebbvf2etyoxz7melfqvbpjr8tgitbo98hwt817pvwlfx2ytmmkzwbgqbwc6d6677gy5qqjvbe9zbigvvcwwjeb17kwjl173u11d7bqqrvt9gf4y350hbhfoabotlc8lgstj9ih9r8t1954isiz84gcbuneizuhoikw4wiin74zpv7yphbdzxx4325ofkkt0klfsx43y0yhj946axuehou58qn4vqs565z6s8tgta3s9xxfsmz268fy23ucrfhiyfeb63puynnrdulj6b88ni7ak4o0wg7dfb5cs4nasf59h7jt55jhae2rj357p64t4n6et9iyge311oc1fjfm1yscx16aksbldcid5wkwtc12vuaghuvs5vig5zgq3cyqao4rev164t885hh13a643e02wyjo4o7iqhopthdbu5c3pe74jtyn3unqkznjr6wbhjbnb1ul064n295wdooq7pqyojca03goe0dzlfi69adoa4w14ijb80qfon5i9ev3iuhakxjumupk7379hxv4z7vqerjy0dq6rulg84ega1llpco2pern8o2dkt9dce8p6lz2bmuxn7vkkj3ot9pwc902ff6mwbcz3u73ybo58k26ziw2m4eyxch6bpmk9t2msbctkh0qwboto9xcye161njoifobzlo54035w3puhm8x20ra0finw10ynpl5g7allkqouw6ym16fsjlxhl2aw99co1jfhrgm19mlzrwojv67qzw8pisx1250a80yejs0eys5',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '2bd3s7jtcy2u06l354w77pqhar3ntkjbqpmnnoh0j3bc3kz8ba',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'n600fryg5ig3hlgwlf5c',
                channelId: '63f4tkz90rzln0w15dywgaoiyocmr7cobgpdb',
                channelParty: 'd8c7d4smf6eecot0lw4mac37tei81llopdu7zca1rl7wg5g51qsxzdabz5fiv2gjlgxkypq1k4vqblprt5cae6aasei1qy69urqvhio7g64nbemw6voejbhsixn5ktnzh3cw2sppbzt8p4xy47nan20yp465383g',
                channelComponent: 'ticbkdhk2otfpvweu9qgvtm3wj61aprnz32drcxw0mgvdnw8xxw87x8hxqew99hila9rvzq1d16whodgsf1a24mcl3rw5t2vr3daxkdd8ry6oogktnociyhjbne6rdogust57auq0ae11m2v31jla0umyd0dtirf',
                channelName: '683kahmq8s0egbmtr1bj6i7fxjsh4sjuz4s49hfh6y3knbwky78jgxy0nuzh0xr01tpfkw1ibn6g3l3npb5rflnok8o2pvqqhiu2sw660qc3yir7n422579pt2nr1h2h3psz7sgtiprogbmsagyc7w467dkf7slk',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'uazb3cptoi85vuvglp2yqpavyqm272kqcsvzplqh48rm9eij3cqdpcw18uyb39zs5oayercz8rykcdaff7ximjhm1q43jo641taxz7e70wbttp65bxw58voteg6gp77gw86wipbbrr0zva3lk733hao4vr4o28h9',
                flowComponent: 'i57gzb40xqjg1i6543fmyh8h72h3vhwiqzk3gikudg3vvgw4fn4eim8jzgz9r6wankuymzopiufpi2msk1z2veqq8fbbg72pekx7iyfna511zen1rp91wl0nnvvggfgqh6v33mb7mfaivcq584v1l34fku1opnay',
                flowInterfaceName: 'lucldzgb5nhvp2ham7t598svhov0cakragibosu9uzasyh52s2wbg14h3hg3ovgqj8y5fhgdstvrempx2e60n7wr802czpckgv6rxuxtijk5imgit3vmw3jha433ujniroddbxk4it1ltt6ckmezi8dlqxhb7zns',
                flowInterfaceNamespace: 'yijw55nv14t7qmi5s35pqdq4hswjkla5rzjb4iaqu2e38ize87i4zgbv6z5zog89j3sitxl28kkbwcestkkf013krzzd8x9mavygt78xcrzx780zckeljyl4h3gyxv27fvycn57wufaudez07a8id9m8sbpojj91',
                version: 'i194hlei0h5q3rx8njup',
                parameterGroup: 'ayxv2828tn570lz1u45gtu66i9px2dxct0bwpjloywwjzr59r3chtz7hhglyy8n7fmiw32o8fv3nh9fexgt6lul1rv8fu3y2luhbiws5j5zg5j9y1qj97dedsdc7e5nnnb3gzzofd0ad31fvbitqz9jgmxnn7tbnqikzmia995f1ps0ua10tqnauxftaxs700leewhdu7hqp57iictbvuzrpai3bu8ghxu665y9r03lrq0fwjg95g2mydzpg5mr',
                name: 'a03gp19nqa8jy8s9tla9nmuvx0y00397rivp1f1msuby2kldu2plcad5m8xn7vqzfm5o4nvsj1qeus4hhpnqdl7fv7laju89tsznu055milhvsju65vem80sxpr491b3gu7sg0di0annm631bml6xbt4c56thdarnj5jexyrbppusysbdweezkg2g2xvpcm7mwcp1hkdwzeyf95thytpydyyps2z6q4v2dtjemzu66d3odj255e3g3t79jv1xuzfu6pzeqwj6loo1foucbvcbcxuixi0duifoxk7ujuxzc3n3zi35q9ezxkk6nqbjb38',
                parameterName: '2fukoeu3bp3tfo8rhmcsflea92f1v0b7xg8zjhtgaubu550nza6hhndlkt89n3ow9o1ulij3momm5sw4o6ux8r9wop4z2efdl0v38v069xabk9816fuiaiwgmhpbzb7illkv2wp4djsd4z293922l8ip73qj3u71bobs7r0xngb2wbma3insrqw1nfao6zi99z82o2ayefcbtop7lvp7mmp6lbz02rby9aiyox2uqprxamvrvrq3ce38492avb00ambqemnu14685e94a133zsfupwe63lckw6y009r4el6h6e0lp3lhahks5iw8rc06',
                parameterValue: 'w9s0pzrgdo1jcgof0bnyiazdwsnag1sxilt8v9pla8h2ge5wlt0vy9t7hzrnb6oq9kx8q384b7mp29eygmg6s8r18q8q5wvayhamhk4yeul5e6x4hjm3t56c8okqijap0fciko3fdypuew2h5p8mdq88h523m67nygj84ae20pgal45ylqzbhpyc34raawahk8a68kpul7i0h9j2hn09vk964xfhdfpivik1f1qxu7gntmxx9lejd760cgxeteyletey06xk1mod9bwrq34hs0m21hseygec4ruhnabl1xcagr6smkd8tbhjqdh8p887irwuid78g55ecifvdk4bustffgzr2xjm0al39cm6s5hqjmmvofocgraoqdfi779m9v4husqwera7s5pcwxt36i8dfbts7q8x086nanxck0nz3niqdkptg6pasubxd0ewpw00p0ixgx20fow4np1eag1p4wo8s41fpnne7w5cmhnuydq9xw9i4bql19xe1skuhgoprkge3bayagxnih9jw6j4jw41pfxxtzjxk5phzmaau3uy7co6hkplx5sft53rmgitr9flzv11a41oq14ehu4lbej6ybqxongg0czk38uh7xx50ifegajwomo5o45hzxd64w7gd2dp5uki6udlpluuu67s56g8v5w5wt3aclz9ze4rhn5aurx4fiyzk0mecfdxigp49s7d4bc4chk4wgrk6vp8krqjcdejbk6hfa2216xgfcjgbene0qhn369qs5ks2ylfjm3jzo07uimz5st0h4ai7tonpzjxyf1dqofy0j7ht6kl5e89hk56htckzo47r0tf70822dheo3ve73j0e1deucm1tdwr5ashvt6h9c2se4oju3dxb7as6n5jx8sjvcfu5bat0i56eyeo0frnpvlzaiblo295h3j6hu2zx3rm4bxe2m1mzyr4kiebddnu5yw0y164kdm86z79wvc4hrpn8r1a3clkus283l10mmp64pwxelmixg4nljky',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'tallmwwppzujt4ewrcmnoasde4jo6c3rp5x0i90xx296qzg3cs',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'enu7maf9cifeorkzzdi4',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'sdhvtfcw6oagw2zso5258tsoz1mznk1756zbzyh0koe9858ipon2pbfecvun009s5p6tj9ucmn43z4ts81720atg2bjj45oeum3q64s8axfqf2tb3li5zzs2jn4mn5av34wwj6iz1u1jzwglhjvyfowoa0xinzuz',
                channelComponent: 'tz3nm6shokvykyj5myebp4y5nywy94j8dvhw8jzc4pxmcnw4tq0vj4ibzh3l47tuar26qd6yqjd046z4hzmwef6xu3rwn993djwduoxdtqcyimkcxk174q9fzxgy45zos2u8hmby8uuq5lju9ytkldv19j38jja4',
                channelName: 'oavid749dsgk3z9fybk31eeictxx6anmiorafa2xg8wgnfrp4ty0u478wzprgew7mfypxkuaqvw7searfffjfcm2j6im5b5f1ts80fn29m8khjiownkkwo35ovilr4yifuwzypv6tv0kdrqry8ntyevm6odojity',
                flowId: '7opfp8q956ujyqhtuviujca2doo5rd163smqg',
                flowParty: '8nigxwacx4174v3h58wy8w0yi9pf6qwd0mj8619cam9pcu9dph2zier2q66p0jk0osgd0wuumt8b7gtjfkrjikqct7hae0xz005j6m5xs301yuin662j0rlk5vm30xg85fnsludl6jpzzdaevctxqjq3drzx7eas',
                flowComponent: 'iqnvbwzau7kj8julnolw1hl3pu9xpowcqnbnxowhyh40aywbrhs6vlxfll4v8pnte6cekw2j41nvb3jpz0qcyi8n28v6ucb7rv1okj7b4qo1oiry1cc20ivo1hcyrzwbwt2fwxk69cpec41mu5sagoi5y96qs63g',
                flowInterfaceName: '7mf1ejxu9owdn3bd5hrnygrd5alcqbdddgikpvqtimwaa1lqcmejlmj6m6e2pol69q9tgpi3vaipzh5gn80tehnfi12f01an4qi02bckg76uyv1op2vh58882l0kqbijogabrp8ihuhnbo9o4uxvnsoqepeiubx4',
                flowInterfaceNamespace: 'l8kcoqlz23xa78git4cozh4gj1ewpg09gpm5bnpswifmdh2g9ksynzb81soh9iz2amh8btgqnqfqrreu9us0win6qha1q67991tot88xpza6ykapeaj75bmg1xqsrpr4ng2twj6emuvsn0oip3qpaka5av15rrhe',
                version: '46uz9wzkhvv02a3rxx5i',
                parameterGroup: 'i1via9hq0mzeudhxx9wfp81zrlu4i9rvyr7yjgdo1rq4661pflfmxruzd9ogbj1rby63s6x608ivnbxk3fko6fzpapi9i18ywhsttuicnm3lidl6ncmkiqvbfftjjhldzy5cdrs98r5r9xr4rfay9kuud8orwgwzz6gjp9knxxqw1gla34ofogch4hiw1ll0lhvedtrvmejzkgr91vs36edyh259k8zd5swmo1r8ldi9jivl0jdtcjjp8t3np67',
                name: '22npb6rvpytouky79n47bsre3zzmrwpcbaufhykvosb2jsxihnhs8lbn1c3xo55v5h1dw077ba6qmsq2pomz453c4h1hkhcrmlbatbcc3ppip8x3sab9j80jm6pk2jdvwwt781pxkhoddmsolm43gqnzstbtwfln810omhfwcel6j09lp8m0ocru03cfxg5xmjcm5kaodwocty0h3ljwe6cemp585o4p6vwzjse8b4htywe2k534c6oyc0wpafnhssp2yq5phflgcvdcpuhst55qbidxhb0sk76ord7p10selpjl05k16dupwtmit0ok',
                parameterName: 'p89lvio8fdh4p7f89ky1pj4gjytgt5kbycmqdqrtfq8n7yflmiia72ime1wanf45indef7r0ixbbrfgvujk63yz8dtns3p8b9sckky0g8e8bjv0pc0qewg5n0rv2oedmmsrgyofka87xediaitlzwytscyoljystvi3br2ei0ackgn48azvobrsnkmqkvwpf3tjxenfn1dcnipezq7cf0b32pqzlsno7czijno2ze5v9cvywgibr6qtbp33iuzrkumnkdaetdqdwk8s4ufxxm15snumgmz0onoaojtywxzwa0puh6281xyp56ed2xewk',
                parameterValue: '0vd2stje2fn2n7s3jll5hxnlhvc83o5i7lwid83vkt6ddvve8ono8mtzws4du5wz6zm8w02kzady5zmvmyd47ch5rbovxxboxk47lmotcdtf9sdk7otcft6tanyimpxia2nneiuq1l60mcsi82zaqupiyapkbthvbx9dq2l3d9vd2nl38otkdb16q7dk9o9j4u0n4qs8xw4xljcwhyt3kzhsyubo7l0jb3411c5rgpl2aric7z5mabu01r05glg2b0tbfkx12a59mkqcnp29yym1jdx0747j8qfqazvfeuzb535d2vgbotkucagh1jp23gyuzm869kapkbr6zb7yp10idopeuvv0asg32hs4ai1akaj9q1zcchhuyu46afwx4v8oybesizzj5h085wz5s01pc5g9p8q5bsva1b65cbqd0tnq5h4jz8t30vue0ks1nsksl2842iz2jz144sze9osl024bf2vdh5101851c948gqfe3bw615gyy9o4gs46z7czcicps70j8lgwwao6kmjbul3r8a14vvqcinqqqosglx2tbfyb65jxq2y3cm6bhq1r49z4l0op4j04bzfk94nsnlhm8li7147f761xna2w0l908qcr8pp23kwkgc7u5wabcrukrmvwy45vp4ewf4kzrtycibtal0yozbavp7sltc2umflcxqckd4kehvor9hzc0kyvrlke78dlt67532bwxcesfdclwwuojg451ihk0di4jpjtgho8tm6rnakxobre3jpb0ml38h4vv041hbj964luw3no3jm5voue56aucovs9k04xqo1zi0ysq93byduxcujk1olezht1iu5zt5x742bhkv91g193tsh7rxbkr2segryziapu157sd3owtqa0nk7xgfnrv9mywo3gh5dehq522s5d2mzbbldblhej41eastisjs65gleolmeeyrk6fcgeude5dfp0fkxtmlmbbkmhgsyujurdg32pj5b8z000g97589mlvaxao1n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'sd5tgw4dl73argd5174i7tfgb86r9ubbury1tc2xwzksff2nwxl',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'leqr1uk1pim9uq7fco12',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'trz77jm7z2v6zhz797yor1llwpts5s01xmqln5gzie75l035080dr4bw541xf1cof3bvyqy1z2az7hlgizycpuvfocd9lj0j3ea34lsvz001ehvomblgz98kxgvsiejc2ouudzf2p4vzcpzs9z9bfi4ve7i1uxn3',
                channelComponent: 'ovwqqlacpz5q4h4jrzwone10otdgn50iutj5w0dxk4mehbdung72jjwapxpks3mr250j4ev6we60wsgdcd74d8yf2dv1up4ggctik27bb6qw6l634u361r70493qlao300l2qqdhg1t27jg8bzlpxoog74xhnxsq',
                channelName: 'tswq9j9rbimyz9thnww9f4iudswtne90qk3zirav7n9hrdlkjgdl9s3g35juulsthzbydvh0j0iiy4d14ok7iuhe379rk0vsewtdjsmn9vdlv4rkro38fryynqo50vo12bfjv19xd6vi2c7wl1kptigakbg3cgen',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '3iyqhn7hj5j9r0s3bfqn62w2rr9a5kewyxdb9bnbt9wmjmqtlh0mf6t7wwnfmeookb953t16vwwj50r3l9yaxdtgixkgjk5fjr459ns04xps30a1shf3y6fy55rwlpjg5br42m61psi968w6d5vvgbxy9rm9vidb',
                flowComponent: 'eo27hl8txavsbg3jg4gc6qrgner0ot67h9su8j5fku21ujqyb1sr0uq86xq8k13s3xymld5l5zpgsl4zb664y8crbqsgbqd1rzbg4molssdat4s3337cljmed2lhak943u54i8mz4vwa8tnre7ykuegmkcai83rp',
                flowInterfaceName: 'wigbtlj00275e9x1aswvkpk86oh73xy9gp0yatve7jp4k3le29p7a9wkn6iy1twl18fphrym75zd3j7sk15j5ds6v4scv5fytyze1rg3tak8ly7ma49mvj9x7d3mw3shlu5hp9wlb5u44b65vqgufdzprfhdiewk',
                flowInterfaceNamespace: 'udulqx0mruesni9zomsamlotfoa21kj1ccc6xqphuqwgbgqddrc14tfqq7noa0iyi3sxb70s8som13kok8l7ppjo98quwn4pijlwp5oyz0a3eis3u8kksxb7xesfrbxydb60fsyclptory30i8n1ll2beixuo909',
                version: 'q6yfk3omurdqfzhsmwb6',
                parameterGroup: 'exgoq9puf53wdfwemuysainr7suubrn156l9fifw1im1ksaye9eskd2cmwcg27dexbb1ue260mdtia9182z2f1qvinogt3w0acxi7yefmbckn0vh7tr7bb0m18wnm3h60c2is80um88b8cex8ppkyqltplrshzpefneoh29lq9wanocr6xq3xem1xefh582u5kvj1in02e6wd6i78n07l0jht85ervpv5q1rcocx2mmyflu87o0hakag4p8qddd',
                name: '8jzuhonieabmjjwwz24b7fi1ttnck088ife4nf0ikrvo0llw3di8eedvylzc18w28grg1q582y1t124ckh2wmw0dxcud2wiz5m4utuaoq2h76je8vuv6e5kd2iqp4r79fjc5nkdk81na7x4t7t502sgw78uw8gtdyhzqim9dwf2ic3y5e69fn902nknpi1xb7lf2iq4i8ekto1m8igwba2ntet77ydkriqzoeyjdop3fn1gtzp3whmpnvfuc02vdd5szxmssqgdqvw3o3b1kctloz87cxa3gzw63x5p4ldwiny8q035epwyr69x01qii',
                parameterName: 'sb5gm9letwom1vwk6f5fk9hq1l5lz5ganapyg3ji4590beizeei88gy49pbcvltkwv38wxx5ye16nx1gioc1dosbny9cenpyhp7cm3gydi35oqgku0n7qcogzjb51clelkef018wx2eeetkn0cqvuyx8jxknxbuzsb4jp19bv4rm26fn9q0gqxw6wndee65dw5bpt4f77g3tl7yjut31jptglxulcoy4hgfe7x568q4qg7hi08ks5tts4qjdtx9hap4slry6uuh073r1voeg0no679oy6e03oqs01s267fpvni28fcswhcn3vleb0gwc',
                parameterValue: '340ddytr755bvxud7kf90ns5h4jn73mf4aiblklhgy01in71u15rdpsc58iu9mgvasm4w8iwc7dbdydqn460x40adsycn8ki0gxx5je3gkyss4z4kvygs7956toh21azgld1cjz3jfhdt462tdtj4px6zx062hdh79fz6byw8c9bjdzb214zc8vk72ln1k5hgk61uu03ww0xymifdkggkrv6xe5s0h1p1bbgifup31d3h2olgirgd33tvuv2r8muapj2765ewiy4p6sbglrtrl1289v1dbr0oefxqxlc1f9j4dau9gykllrxnbnky5ja37gqx18xnjjiehq94y01n2hx0ex2bsqeqzypjji5vms9wv0yfptld56vha4wbtj186hjgjgxb9d75er0b2j8hche4pl3gekdod0pkujm8epj5md8r1fgtlnrmcl0mhjcbd99bcywjl0440hljf8jzsacpuyy01iw96xb5hc72ayvxydts8iyku79mfx5eoqawrgs5efjn7m1sdqeba30oyxlfegqdht1yf0w36kyf5ahgrw6938trz7eaprej70hwk111dmx1rzctp5ljplxtdrxllpczak6zxe27zvp7zerehtgvwph2ipavy4txkpqa2uum1p4i1yciujdj7vmaqr61poo8lwxkuuro0nkb61un9c2r969d3zt5xsbnrxy21opmwjz51jq4mp1i92opqgew0kgr6cnemwignlg6tqjw6qmtsi5vttavbswotyrwpdxj3yevy6jnomrqfmx8yk7gdbf23kn3fs8v8o16cwqjh6sruau4sh4cbpurt7fcxq0x3ckaydu0ao5jkovq3ucjq85am9yk85xgkakpt3ox9yunw12s7cpvhyczz5rol9ylcazqb4pafb4d1wyvq9c4hf7639hknfc2rxpe58ivd5hctr7b2ocadoy3it21klx68rnzd3tw7zdx4jcgyz7avrrbno2nmqjtqwvhbzn4ptpaznuindx4gtm0i02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 't57qa6gchtnjutowndh1g52d9ab085ask9vaycyrobnaflo3kx',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: '4uaz2y0wh2wxypf27ektb',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'zva8kmr1nqr57wbmwbvhm8hskyc5rhn3w5qfddw6eot46iulke66pd30gzi2zo66t6qhn58cdmwzhmyo8wcnaxe1lupu1j8702e7djt510hlyi2t9i9fdgbusitpi54i0z0gmb1o5ah7w35jo4smgf8xdd3zb157',
                channelComponent: 'yk0013avzqus39daukq6w0hsrlxq5w0sns1oqq18oaflcs08r39avtd6o004ccebpc4eovix3zx1vbdaaalzpzpz8t2qzmzibw50hm0a17bbt6p30hi5vfw7v0whbg1m2fzc9r45uqadusepuhhm21d8t9lwfpqg',
                channelName: '229qjidn0kxpsr6rxdnzy62t6qnj4t9po0ejzuhkelseagp8e8w5wyaabjs5mgea6mq6k6iphvzv2ezuebnnfh39e2ooa0ymendndw0y9bwocvpgb0y0q1gcq65ysumyz83w4imugw0c428jbp7go1zr53nb4zav',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'idrekz4elb6927nf4mjr1p056crd8b9tc3fkv4i06gy7iyuom4zxorjlq0q07j5jjvzd1cxqhjgk1bh6k4b2mbp8fq3sgr03uoz9i7fopr9okci1p7secho9jtmu4ppafh8w8puuswn7l4ikw79eaibewcd8h4wz',
                flowComponent: '9mevtfgjp5dgbtbxb8kigb9y3v6fsl3ujndarpbhaf349khvqr1a8898bysdn8aqengwfabmj3cqluhih7nb4qx8mbvc2y4pxj5p4inzkmllzgp9y8edxdz6c26444e63rebc1qza2t8h7q142zx0kkxep8laoz2',
                flowInterfaceName: '8ttis15l8qhhzbnsf8pcnon9028exymz158jaci8q41rk3ljclox4qtwopm6zltpwb6wilnsdbsqxdb89c3unmzts0snvfdf90qy55e58w1cagyzxuj3uh2ppf3rqpp0o07v558ihioxe6vqqv0ukjnoa9vumwyn',
                flowInterfaceNamespace: 'uojxu5nsl6fhwtnm3gzb58fccshvunwe25xbcl3kpgl3p1m22aksqqddk0gdkdf74r6ulja2xb9wvj00up1wkncpdvztjrcb9jicfonioego2m9kdyt4zkinnjzgq6qs8fybsde2jwg03uqvhdyvfnqg2joepwbn',
                version: '8e6e3tr86795d5xsk6ba',
                parameterGroup: 'gg41b7kykzddhjsre69zmqt6eew8kdl1sim3qze2rtrou0igi6byhpz4b6isyw9krk9ud8345t37v4d2sdmbdzdhhd45gvf8mec1v31vkc17qwfv5646yhkpoem42f1gjos8ophqjuqji7c4mh85362oj223f60ztgi7gh78b1y04kiusv034cricdg8u07pnluzz77kzdul5uswdeqkhunto996dxpqhfl2zz2ywrjgz10hvkussnwc0e7p9yp',
                name: '6h92qm7smbc2gw3qjuda6kqvoldw3cmuo2xl1wrym24smsygq9q3fdds2thkm67n2jgeehvanpyjrtdsgulhc2hwdb1x9kopsvl16g2kij8sshfgkwzfalwtlsgx9qksyd31rdozkk2cov10369krzbrzbomix91zfrp04jmbfz69ss5dgnlb8byxtx7gtkex8xvi4bffenrzvhpnsn65254xigguzxuluxrwxpgh0fipw7rj2nc3a8infotn0zjoazzwo9sr2i43dnml7seobyb6fvsljb5o4akhomwrim2ybk44rxuwdq282vdfb8c',
                parameterName: 'zgl8a9v7x0i20way3cslbnvcor2sdseb5iaph0qyxlr5enbau60f4un6q34s9oeo1il7m5gg03fh7l4n47n30xtiozrsm3ypvelt6nzlbsmg6s6muuw9d3gprgjwbxnw7v5ndfjh51aoquijl8tpiq3rp56fcjz3h1kuh4vni6375fq9yu1mk7518v19dejmoabw2grqrv5kgv1ac47jom3dx03gsh7no6rgj0q0eub0idikpgifl6875zn8kb22zczwf0nymwl4vhbgsaarobxz75zpkf18o5kbnvbu3gfxf3wc1bi7ax1tw07bxyd9',
                parameterValue: '4fhvuj908cznc99jgu6xhccamrsr65y6fsvk0jrwgage0xv9cdr7rp3auq0kdefczrodh88rfdg3d2glrvg5tqq4r9vrej3wl5hwn4dkq4j933z6i8m60vhq93bi9qi3yovpu0pbq5cl1st8o1tktpglciem571x4cm3iht5vbnb4vxuh80xtpbi9lsb52tuof9881lwwex0a3a8xlfjxv2vi4ea0stysm34gvs5u0pq61y81jqpdgttsj6j8yxpvtwdch2yyt7ppnt8c8lem2da3i9piq4aj5qczmos8leasyg0u6qno2od84lazllzabr3hz6odyhqoi4d4jeyis0tfd0a4u8u47fkkpswvohaws4krs82m0upkm0d9j4rtd9m1bw7j4h2u5nqsa1yli67vtjtcieb1zaztl42t47nuc2bnvc3o67e31qizarsrhdbx06zqwsskiq54cxt6ah8bl26rtumly456ytkuyyx5v0fgxkc1o8u56lrjwc3urv9ok6kblafke397ewhiyashi6ex1v56cjbhj41itb2mzbjei4myr559mdk50fgoudhzuyk0xp1agnhh24qw32p0zk81uo7btwz3nxypukj4ay07syqjtfht3blqti0n90870stox4gdtluc6mrpaihsw41wkisq6u5dr9q8p7dgdb4pb4bwbzobqoz5gw5rh2jyy82zf9mjebnbieezs5p9mwgaux19d56i18o6s741kff4bc0lnt4vezlqepqozwqbuwivglvyqigjmwtqdn1y3bmg2dlkp4diaovypf81tbv7c5n3k63u29ka4e1ma9zbtda802xn48kqk6sfe8868abypro62ysufehiasokyx1w7ivytnlyzhsq4sjyy9c1m4waxcjxjipun0y4itg8l7m1f9alalkjw6f0orl4tbnsaexc5xokeexf9qo115qkfiekg7d3x77q5ltuzirl3p17v4ftg6q83d5g3fwnidb61aqsf8mpqkxlfia',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 's1cn5d80tdo76smpc2dwbwl8i5nihzfumj1nrqg48iz9cpsog2',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'lehyim5l8wc146zblsc3',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'p1zqelffabtjsja2n4evxk3s2npe6783retc5heq3c0tk4brssn3dxi3bp9hp9w6fs8d3d4sf2g4qmgwy9p0zkxcrua604ndpi2v7riq80gqfi1y5m41gxyt65vwx361un3wvfuj1ia3ry4h8bbdjwk4j8p6495ha',
                channelComponent: 'quh8y38exa1z0jq381osnn8bcgokijve4lvuktqgnz44rpnpdrit95a7ravvzn4akimmyxkd36ovyq1vwb2qomwcbhapk38c25t5pt38jc57k8uq7jt5mgxxgpjxt7x2jlfbacb14fpickbyx7b9sgt8o4eei9zc',
                channelName: 'oj44das3aotwhs77wln0wz7tstgmduud61elvihsqswu9qd8e2g8595yb3jni7hb5am3hj7dexep3kils4ledd8i7s9ugnj07qdxryu7aqn3uk45g1ossbtyhk4brna0kfiztixjrc11tmbgfbhzqw09rkdd4fy7',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'wuunojoyy9ftg3g4ekm37ri5rn66w8joiy4lzngq68p5e4akq471fvggtnut37i0nuoxv56uh74gki6mk2bvfsfh4l9nngal31ozzke9sq8ywlzrwj5pg6ig862dausjn4q997e04c5mtzkp28wb8b3sxh2cxl4w',
                flowComponent: 'sw6jt67sxlabl15jg72vz9y91we9be315bbqhkpcn6p4s0smphc3csyfb1uujzjkqgbsc9l4dvlvg5utabn61d2x5vyzmq1s3vg0q0imwmsibs9z9wuk47y5frc9u04k630xhzakt9l00cve7rcw06r4n0tt3vbn',
                flowInterfaceName: 'ev5v133zr1m1qxr4x5123zigk6yl912ugt3a4rt9qh07wcbf0nxagjw6vrxhpff3c0rk5906py4v9660dfyihhb4w424k8vwh4s3ypfdstppaxz52t714qr8kvfi443vlsa4pdhyfrx7g9nyt68q6m9wk4joproo',
                flowInterfaceNamespace: 'j8v6sxmzmi23b4ptqn8esg0xsi96ehi9hv0zoyd0y3mci8q4ex8y3qti5a6kgblk2dcaetb09i33kyojouxm5a1txcn671zszbplvgvt04qh4h3biudqob3joczp609t45cs86s6mw580t10ma1uoiuq5i481x9g',
                version: 'dcxdew5ojyy525fvnzgs',
                parameterGroup: 'f3azoi1y41dlt1equ6135cg2fncgqcz3h7j0voi4gwg5owrtmx3vunlx63isnkn73sjzsyq9vbzkqqsk4s5bz0dk2irdel5qsufo60q86fh1u6gk5io8zzgzj2blk6454nrol3g51xeidg1lakcdl68sl8e703yfecsss16skmid0o4c7qhnmlgall9gibwta0b0vz6m09ch38kmua108eoua57xrqfr63ct0io26ywnzl17kywl2bgabqs7vsz',
                name: '9ut8vfqx4uutr44hjsh11r1xw0rxhyutyvnfltdmn2ycmpcdcfeilyl1q5i13mu6swjz0xiqaiu21xw72qcif8dtntl0vhv8xtbi6uzbe01gk2zq7gnn95dgfoesplwyvojx7zle56mwdqhncp6w7vaoxxanwa62796gjoonw6h40lygqyohdgsyi1quec99piapzcltmpbjond9f55f9n89jdlzgomsk7jsg4uk7bap55bl7p7c0aycvxzwkud6imys8okkl49za0wifilr2c2tp6r5mrzshtgttkp1awt4ao8imz3fckof84a20iy0',
                parameterName: 'zipsvkbiidoglcbdrvoeyv00tny9gr2c5pg6zg9l6xrbho138sd122p5ondoam3i5broeh48z7wah9i2ezyyourl6itshnnsu2rczn05gli66xani2bz43z600iprjhj7e3fp52cypgxk0vv08oz9iy5tt4n01kuk39d6elobi752lu30rn41fekljfvtuf4ou20m9jyrg73q3js875h2cdhiv8tyys3qpfs0us2hui1yy2w4kfn1vzprlys8gx3kwb4llqmjks8rp992j1rdp1stpnm442p8b9llmudect66o54cisz05utiqajgv4u',
                parameterValue: '3phzbj7kiqndch3i79ixagifb505nvaggj5pkvswu7zndjagw1mwag8fqen4mx83mbi13rwskuhodwl84pia0p1g1k82ma2ma5zz5668mwxwnppxkyncl5mercsqfsm9934qhjm1ni5jdo5kviemccq7gppcrh3k6mm87283yuc7j38653f5tjigeq4s4w5sssb7uxt2hgzjfg1evpk4vj0oy6pct22i6d9uzq0taxm1sh5852d2yl2ou7thf7q1pnkf6vg8yyacvyz21abarxohzn6bvrcffp1kfa62v3cx4j4q39khsr5fc4wtp690l6zsdkr8pfxszqwroqdhdvvwb5v2foovchh97nysm2zzfp64ul1g1rbd2u2b33u41yatw20143x89ps9bryud1ibxytr48zjsjftldwhgc6fbidz8fmspzxxv1n8rf5opu5zwyj4mfk6rqj4m5y2j0g5khlvsood13qpjhdgfc6d1mbnt7vymrlv5ifeh8ukqvqqiu6787iwixzipdk6zzg19efjjf8q4c67ardjio578qrj10bsctc8e341ayow0t82yq28e97ftv5wcsx6qxhhh7cr2isct3idbcl0eiywxkrn1q63qzljzs7eyl8eaoj6pkcmdwtppjzuo060ru2kj3v7mtskt97zfiej65w7zb7l768u02bws53x16kbf0sn5u73hpkh78wojlz43w5yc9svw7qei2donsmtkp368yxxiyg6r0xtce5hqb58jeu7gez44mkr1epe8k2y78kvfri603eqps5n588u8ok1nsslgczbjv1m820on7x0f2m3qrexelocy5b38gpon36myo1sbxabtmsq8clxdwoc8wpvknsxeoz9z26u6df6s5lf1m1lko6w3of4158oxxzyexl1zip7taqn0f71upg7rnqewvnn2sebv1keuxpkll247wjxp2egcv4x1ilm64dqt6oarfnbizklyov1q70gyyu115cuwpug07rf3ph7',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '46uwkqbmut4x5hm5wc2kb6llbua91h89dcfrxirbdylm3pt8il',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: '3j9hy5jn2r98ux9d5gza',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'soquf7wdxc9lg8o6s6lbc83lxfn99oqk9hhwb547cyx63acr9eweyyu488kj0xfij4e9tv7u9bm4292meml9exuxhk4aopqyfcicwmd8k85msb3un8qiomdqqew378s0dmxcx7p5xoqnbjeap8ebg5rvq1bpp8jf',
                channelComponent: 'vz8ojijsbi0zolpp07ddqgal57afkcfyez6gs85gm35prxj59w06y92z7i4qjiigsoa11ix4u1n60p0p2i0xxaki6tpixumq9l42dn2xkbii5t4yp9i0z22zu06a6naqp5p57gocpsqid4v84avfkzg685nmk0hfk',
                channelName: 'gognpaglmvgvlrpjkcmdvbxzmztz7umwofuz049lha63e8sn2rb50hapwbdahp5ljvqjl67e9zki3rqciewhb56778y8vsmq7tqlish5t9dtj1rtnb73kkw0aggwtzcq7hb2ik1kvumnpvrdcqu8sszcufnm3e15',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'ah3e3ls3u3rwlbjurelr3bpkzgnodg8fgy39z2ooa9b9wvge4uttvbuijfcyjtgiq3vi86zkut5yl97oe1wbwhj6d29cl0w854azje4qoodiraiu7hmeecsmmbb9w8x150vzp4d5qncsc80xzrz161htgq79m496',
                flowComponent: 'u78wlt06sudax5pirn6k4hqq9jsevlkd4ipomfl34kedlj5c9ghp8v5pqhnqj333ybky04hjurto9x7oc8lrffs9bvj57cst1yytwcqf6qz6hara6d93e5l9vzdhxn6nphlij1a3jp87ewcfd6oe4hmt6jujoszg',
                flowInterfaceName: 'ru2rfbyjv8ntyn9i5fu3ecbfedivdes60kmbc0tx5a9t2dwsommtkoej7q90upqqh8igudxgl549s5qgv8x0sl8v0oq8ezrtrwu8qxa7fse5ff2hb22775j4nbfsmjoihtvcgl374vj6pt814m025doe2kad2e4z',
                flowInterfaceNamespace: 'wl1mtb4c2c99olrwtdz57oikuou9litjtksaqudj8e009ioid7twucticlfkoezos7ubaj21kwhc97ufblh7dfp7alzs8t2buaqeq168d8sr2oeo8f9g00u554kp9gk1fp93u3so28qsc9mhbuo4dcgi2cfenaal',
                version: 'tbwwja00gneoa7ogof7n',
                parameterGroup: 'mfxg5sl89zn5ctegpqpeqkvkhzjh1w44xhoc1yjfitfbdqgpxljmole0yq1t6xjw9vi2xmky6ocg86g6mtbjhkga81g3kxhcim3paqnxcuh838495h0wm4dwzoibxvenk4vbwj33zubvcf54h1x8qsqj75gl08c5etxaqkv1qvz0dl65mkunvskdrwy5a0wssuoljg87gh7fh4viswy7rk79aga2mmo7vpmonefd99j5e8gkc470a7p0cogb9yj',
                name: '61akow0h8c921afvw2wo6eo4l390snrgg97c52dpt5mc75574umyuoo8j80ag7rdj7690jsz4d43lfp88hc2wi17r9z9gaw1juqr4wrb4sj7dpuecprumcceionwyxqspppc8g8cv8kpkd8407karkimbuc6tocgl5e4pv4wcujwcr25vvs8x0brt45oj2g23t11tcznjf3yftz8ezpns8pyu2dcjyko9qlbbsxv53ra4f3463jk4a9ypjhmluwaxco0hxpattkq7lv556410ae91mljns7h4a0j35dlz7tl1ej8qbk4vb2rftrn63jk',
                parameterName: '6k96u4tikz0ejkelj0r6as0su1v92rw3vhdzh8ejwnyjmw8imcldzv9a67kt69uyxrnphtcu0bzmtki2a97ktqu16knzq2udcpczvzy6m4h6qm7ci21168bzwu3jwqu6ogjb8wck4ldbgo3ntfbm47rvwqwvxwaqe3bai28n8e1ugqnvumu4dvsx8or606v761ff8yl18tp0ltq42mw9nz5sba65oy8lr96qckkcdr0mfeatrur7s7hi85fv9hiikbd1lvxsyg85f7y4z7q85jtt1r8qj433rtxxifwfw3c81xzsv1zvuu9rsi4aby1h',
                parameterValue: '5hwk6ozj0ay90pr4wggsfnabv6zu0aad21gt0c67klemn7sp7ji0hco9oc2x1h1i90hku43908xk5psczrczaehjvt8gb452u61lcfbrzcxfv9n7wj4vnxp85rm58ce2v2b7otlvrc7r6efx7sjgzx3ewoijfden552t28sn74mud946lcllujy0hqovyxhhcia7innhowcfmgrn21satddal5ls3f8ywtq17hayrmjcepjmz9no3w8s92um6qolvme71fjffyb6mkrizvner7wv2ib1v3v17z6qsmpy7u7p27mgc9sqahdapx7cmsq0m8oyc5hirk5g3wjhbt1hbc2f1bcz1o2duvnvtf1fwc2wjyy6vbp7h0e8gm4r7qfaf6l9evefvzqfzeohu833838w4z99jvlb4mjwoj4tk1v7x0y78bzhbjzmy6r9ob20j2eol1igyzy0z3prj18by7ae81iz00rxkusxkmkakcwzkm5rbiqbfghp1wr9840dla0oat4wfxvah32xd6wmghlg2pju4mxdwd4ters8g09awwao8hbb1urbxr7j708zym4hle8gli9j0mf77iuvej42iztsmg7ofg1frw7r2hh5nijdlyelw18jpm8kjpyujoqeezh81jqxen13m5cwgtfp20lgueraqc0v1hgbemcfs9jqawfeawza91plefxj94wucyr9r8tzqvzwyxywd367fqrow9hurkwnhz2i1oyvo3yk47t2apu2hsbvh4m0ty3ydpxrgz7rg4qamxh3cb9ddqnl8j4coizkj060il3ualbqa6ll828crgroimg5pwok1sw9994uaey2eap6gvybr1q91zk9e6q8sf74tb0uu5bf8nfeq6coodmswee9zhy0v5p9y32cx3ahi0vcsj5hwegilgbg91uoxb4l13iqb8sz8igkdi44dlzp08au26g3dxixp2xg3r4dvedyopsw4jd73f7irg3e54kaj7tqbs9tna9f79sj81ni9xpr',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'pb51wp44lo2gpct3v2jnys3mfi2lxyx86ddj12tiokwgxmlwh4',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'tleexq5a43twp1qt53h2',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'btckc777ust2uo38mq4w63dp5ynxrepuwdfw6kfxki7e4fzm03anhnwc4jusiqshhil1x3nwo5qtj42ja9tb8n8jb0ttc02ncagsl67pzl8vde3npk9xa1cpzzzis8h4gbfgue7ctfzeayn24nauv2lm78gl1q2a',
                channelComponent: '57yzr4hm8wb649dh3t3q4jfgs42v6c2bgyjwgl4k4mr17v219cofekbf2z0nq5n12glheqmecw2b7dfq4d40avr78wc1ejm2ho6lejzufxtvuu0rin1fquxalrapxnsuspqgmzvax1iyp0b5gejls4dwimwv33qx',
                channelName: 'zx2825910dv5v96sy43nhiqlpdo7mothkqw4cb5rgeqwr7q6pr5y18atrcyoh6483u94sxvhhblrgv5q2vfxyk3q8tiu8iugqlzuqm3qu889g7762bxjn421ig0om63i99ha7jmiyq2x6up95i7iaeqteul3vt5xb',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '6rs64zyom6col0tl1iqv1eh83bk3b2ssnyj7a3fkunxaymjhjpdovqnssxf4zbkw1mwvbpdwqng562bl8b6jz5835qb063pbia6qksksvkzup7i013ahms3hspts3ncnodnda7swx33ekotaspsespz8yvpauwsf',
                flowComponent: 'vztwja75824wlai48zohlbuba9o32afl8i9nd8j8am1gz39dd5ahcuylod7hfzw9xgo1fe5xqzp0bxe3mv8c1gwue45xerpd0ccxvvarygkyx06k1swsgzyzhkmn4umyclqx7zjo4o4ylrr0tt37zctw5b0abxl4',
                flowInterfaceName: 'i2x1hhf4w5wd34l70eyjkn2dow68c4im90i7xclgyiyjbu5fbe9earswumyrxtgurczuxqx22aixktgp375sdc67o29v8o5oeic3k4jwd3gat4ewuxq0vis665jp9qi8r41bykjivqkvqhqf3x3os47v6mv2m1sx',
                flowInterfaceNamespace: '9e7tyh9rj8fezma6jgx61iu340ta84rii5cisxwcw2sr5mg5plbv8zbor57nn3y5s138v4lvf45tgblfun92snicq161a59cgi1xixbfzv66xk15cpmmuxsgmb021sf7d7zl0jiyui4hiaz4qpd6fx8a5qo9houp',
                version: 'v2raj7trfrvx0lz2q9ts',
                parameterGroup: '3wwiwp7jgtddsyfyc2ewtgocheaji7j3s88utj9ojwqxazuoxcb10ax09avwez0bwodhoh9l8bjljckjr1lfo282tra4ddgv6gz0yq6fevndlnpx5b4jh9xhge7bs7vukj4tk0yon1x1jkxo2vp1qdv5s3uhvyngdog9x17kntpwlsjwrdzvebvjr2qrk5fai9x0v0o8s6v72ycsv5kibheckavtgxjer8l40t89w3w43uhv3r8qg73jfvs3a01',
                name: 'symreb19vlgx8ch0x8wjnysib0z47oto2fcm3wmkgw697jbt8pat7kvwrk12ww418f4u2x7ikbh6au3zycv7ipxyuup557alkdu7ghmggifo5wrxv7fsd651f7qq0o3bcqb1vvcwpbxphxh84z6q16xw6453arc43gdfs5dtyh6vm4lwdtgi57zzrdok62je6bj5iljoy26d6jtk5fcy59nmjow8dwvabetkuv3qjs8cjzllzqw7mw1p81gnxt57a7r2mgb1rrl5tfjruj5cw3ykx01gz10oab024c2sulj0qe0gz7twteo8s1nvulqd',
                parameterName: 'ermz93ghi882xpsfodyah4klys83mub17kyyrlfukxxcbxoffxqyhnrv3volw0ln2fpd90i4ne0dsy3drfum46zjjqha1y7wv3yc83kxjbg3tzy5sbm1b9lt80r1zmvdvs7sh3gnw0m4wh2iwf4vwe55xplo3ste8bvc94ftp6k9hf6qvkohmvzc4bq9635uou2bylcd04snxijqco0eah8afy9cyy2h1vyujv9s84t8sfkyvy4rz3e7nhdlp96mma76tsz24z8awz9ehdftp1owo68312ka65xadhhwf9qqdehb9i5ehuu3ipkaifdv',
                parameterValue: 's8i0f1hfe190cy1tht7zh43lv9sik2ngz3ble0pssovq2v9dlvhcz828627r49naao0ku4vbiwybsd1c847wntd86ej4edwjfl37gk9a0gntk0aq73glg83ld62tzp5tht71pzirltijjyvwbuygulh06opwgvr7gort6z0fl2qf4ycoisgc4vt0iggii9gdkfxmt3w3hnvd28nizrgvx0z603pso65eu98hp63tlfajxrjp9m0fr6ltlf8onlx49fn8o5ahxky1fia72z4wi09has20y9o6n85oo08y4vow8ifh93q2fxz6x0j5bviz5jeeqy1icftydzlb4dvasxe2xhlbc6gcde1ory2v1gw1tabuiebs21j9d8otoydrvlmiugycyxrrp5uqo1oml4k2tltxe7dm4bqvc417p0f1c03cmaw6mfzd7slosrf9e2d6x5y97utzrhwwo6w98iajiy4xxrqhluc6h58ab1ckvdxo4uen50twfe570q5y9oafpdbo5q5gcc2jfktrh0xmr6jejfdru3cabodz5jbv0vr9jy7gldjob8espnu3ziy9wzs336mssoxwaendkdzn7vapq0rd1pcmtbm6bdy2se7ewrnrdgimspnjuemtk9m2nbsqcdgxf7gjjpap1bn5geth4hcyrgler340vdcbta3jjon5ziq9m7eqsc1z3qogvk594ydb9ainq7q5apg8wossgb0kzg1ha6iazc34jezowqzjy64p5nh13yqoaw74wl5g7duydkwei4fxeu94r0d5duiqqsr4e6z1bw0mjmxsujilkrukjx3hkp8k3bdc7p3i6q7lkzhtgv9wrd2xyjgqhgvanru86d1lcs98skwpp9xprwol0f15v4uw2xgypi6yr59bbtx7iiv7oahedemrphqt3qgstb6o990euvmgop7732t1dqu1d3im5wlvbl6on7irwkyueazgxzl2ipx6abxsnbo0adqc58ypkp3urtslmmuztmtiitrd',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'yiocfuslqytxoh8vbagcagczem8i3y9j3isekk6ohgmdsstfq2',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'saouid81fak52bbgoh7r',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'hwhfolxlj9l57xhqbalhuhi8s8q8vsrtg9fg9tf2hzn81yoe2z85g2nuabn8jjhv91q2kqhmu2apm4urdwuve0sdq6p9crnna98h4w2ygnixx3251tnk6bryoy15icv2dvpm3q1d85kaek5sb3kxxnnssp4t2s4c',
                channelComponent: 'tb6befb0k10ids65yvg93ir34i1sge7wniuxwz59b4vpl2npu8ck9kxox3n1qaag7uvirc86ziytjr9jne7gzm43kavtcey4231z5a9o4s2b28fwckhvm2dtitw8v5yfdoa4g6wskw31tcl24w1gy6lj44l6cigs',
                channelName: 'njhdt4j573o6lkyx6ziyuzt6omwx9y2d1blcmo2huh4k0616t7a4zw8moslb4ubvo4extrgw9a69uklir4dtqvel1ntiny36upp2an6180x6tlkhos5msunyngg9h7zi2vl6pma65hcrzvll57uc3gn2yzfltbdd',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'ljbf1qj4cqxw7h1g47kpwptavroznx4070x11rsuhle44ftojzjhz5229xf3x1fx5bso56a8t8uszmzh81obka1btutgjn7bhmgvwrf1mtbpurxanxd51fzfjff9ug5p9tsuze0hv9wphy9hg2pqk3rf4f7xhvdu3',
                flowComponent: '1h0z9tjtsg55avzqkwk9meo48pbeg265a3ixrlm4a2c66oyz75fb9i465tpmszlrorgxmprgphlcpu5hvljf6d8mo581sl7i9r44hqirj7qcz1bgdfqjb22mn0p33nkuo8mtvl7i7tbfvzndxbk2vk0to6da9hue',
                flowInterfaceName: 'h3c39p2byr8vi2n2yg9sp90rygcnkqmwwrl2kdrfma7pvvdyz5c9oz9j40v7f0h2s0qbtyx876zjjqm2tpvb0hgrp6atcy3avaxvqssuvsfz80nq50z7gyzc08s05g0pye5m7ystcvve1xjqppxr63yp2fkanx92',
                flowInterfaceNamespace: '8s6u483j17dfctqwetghl1iw9js050mxo3ywxx6oj1q9of93i55kaa44r5ul4lmfovl9ky2avrew03lf09btij0dc4hto1d3xrf642r07dgpi4u0j6un2hlpizaeqrexpi5cszj8n7vu82zh00m1zjap6m3tpu42',
                version: '1cvm9rgn508x2q1mt9p3',
                parameterGroup: 'aup4l06szmc5q93ombduolg4obh3e3jz7e56yxhq5y9js43iwsaajmj5vb71kvqvb7b2654at86wurg556sjw8if5punkin3nh7xi9lcuz60cto23mnb6szx8v5ina6ilt74zo34o1qzq92c59tc1z94unfalwb7ajbr3kwh64j53omes6fkmmuxcg09yye16mmhsm0p56xrjhpchbke7dziwtp3c6srm9asa5nyg1aeb6kf8xbohylbx098o3e',
                name: 'o0wrenwh56l42uocouhdyt8j7fsk4f2pp20zyhndv3kkt65jnfigr1idqwowc68k815hiiddmj9xzfpy4rnplqyhipp2oo958ipyaq7iey7ze33v0sjmdjade6yhql3gca7so7b02xbkzyhe85zv1lwmby3d21p4xqur5hcu7ocm7nkzzgno0gkiytxdncrtaikgwualo7g473utiwcxzrkgnmhwllp2pkjonczdxq133rh8pn2b392qim7twarig7k4zqz6cy4k53ihf3ge1r60xc5ubwkf24cw252vuknvy7qejhiqhorlrywthzik',
                parameterName: '3wouc3q8u1d4aatfdmhcywgrwfvwsbdcbkz7u8r2uum5mivvrqv8n9jvcoy0bbfdzp58quq6150lnkgh5xbyj1ez974oj8w4sugep55ujn63nypbwjpqarhuvey20r6b38nho64co3ermy4dwqgvpo41dq9inglx8299nitsi0cm0jwopih0omszp9gxkb0sedg88eco5a1mo4hjdliecp189ktbpn31dlmhu4cruupu150gvxz03re31sgex5sa2n3rqg5kdjt26zwqn3zhqouqpmkruuzj7ylzr94tguwp337tj8rgeblofb7qhw2k',
                parameterValue: '9hlwtvs4ukynkhzqwtqfj55jjc77a9vu0ydwf41jl2bvp081dakl1zmza0otz4fnkcqaql1y3b8n7e2lioc2urjjla59jgyji3mu41pqyz6y64cyze62lnphure6wur4b50dqun6jwosm0d5dfu42bq7rnr4u0o51px6s0kotayvjgfkd3k3kz2d1494lz9xpjraoficd625igvyhok4n03o1iqxq2wbczq1aldqkx4dazkmp43f4e9dgogzlqgnx1ee6xz63r7hrwftt9ajjbbdb4mtewkpfipm8v83i1hdso3bktjd2jwmgc0e4r90255fbp2binvxfzjzwgwsg34ylpu2uskcvnyae8smgd4l49b3mvjlefmlfijivbwy53e76kqbsvzclna3gcjgr6aoj4jkv392a7176nv6q05wl3f446vf2k2xy3rz1aqa6epa5n0la3zvvi7d9uqz60le5uyemd20cs9slcvhp3nq2qv6zvwyo2p6icpprslqj22igks0au6pckcljrw6fgwzbr1jek469vv8waal3il17nwlshjukozzzim5rdehsvxhmm8aovepgn2tdt7goojpqgcdjmbgtlbzg9mkx0pekfl2jb8t8km5wiysmrueiijtmlbktmp7816xx6dzvtshdut0dk9y3d4hesk6vzwws5qif9xeqqaz5fgmzapa8at11o0teaoyk0s4wxgjgjqh3b2wgru00zotlbzigkwyl8vedolmej0u894eqhprhjg5mv7ltp2bixbnqnh71rbfhjd7qwbyltysjnziwuoid4mssofhidevkfxcw7ifibnpdl4v1lvinwfplmczh5yum1t4yqrb5hjxjg3q1q2x6u2f59pblyyd0i9njzg39air492bucjcwt7rdo24xvqfmbr3nrfngmtvp42i89ovbnb883r47cn77xzk5efjvgu4l8d1p1c6lhcklj1m3o44fxhnkbn8y4y5nkal8iqpkuyi6pb0rsnvfdjx1ga5',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '6petywhypk3h42j0r7duwa1tgy0mv1gsb0ebb9riexl0kj6ff2',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: '6ilcjblhmm0p0fx73512',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: '6voaw6288o17yma4evti577wbaxibxvzfey81wv1spv6kj7np3bvi12fb73e7dn2dou1uhguzqaqb3ft0kyi0z172vy5d80646lmksrfz45ewpep0m8dr14opkyt4g0jn8xi36ik9ua263yh05zdru5fr543tv24',
                channelComponent: 'qgq2ijui1eqn70bvanzkmvkm359a9rfksa0o05h76ja5eemazz5yn6ucu9w6qfo1hzudrfkfglffn7zup01j33k9vkzmb19bapnidyyqdzkd7f36bfwyvyyowknl7df85k6ovezrrvkf75ggwpa5ov50hzv2gsvu',
                channelName: 'mmnygypudpfz52gmbc7f4pu5nncrvuaoumdav0m2vmb75k4vg4zstiiczcgyo2zqwgi1efaitausewo61562ecdh75fsb6dlydw9mfrgtij9x2a9apl5ch84jkw8i9r0s3fbkzptf1fnua0obj150mxfp5iqj8p3',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'pqdcyojnctr1jnrh58vh46ek48tjvibz66cujva7dxt8eqawmc7rda3hme67ne2jwcqucar3obrpnrb0j3rmfeyy83cgnhmv7zsgiguwdg4bj3bbe5a17vaeonlcl9yxabny1hdgqrdhh77v5wu2y1z8pa6uau9a',
                flowComponent: 'a7vgk777qrlyxenegc6nfo36oxvum72a8ymjzbx6jvoryc1vdzwj55v3vp3b8ob9fygutzjjaueogwvlgyjr3d7jl6lpu9gpndbenpljxqmmxaab58g4y4nee6xb6cmj1ku1ulicb44lxb0ajgqz1ozifzjprsr0c',
                flowInterfaceName: 'ao2x5mavd9xt6ns1jyztko2lv322svz3le8g2ihwqmrk8wjdqghvoe9m33ysohcfjannayi32vbcwawp9d6h2ubegixv8wez1mfvzq22s5wbxqh7un7nfyduiqj7uhiym5tjit91uzm9y7jmacosvo6qbfaowzz7',
                flowInterfaceNamespace: '7wnve791di2urfy97rje5m3pvag4smrrjhavcwpvx4ewyq4p70eibqb8ke9izmdfwg02hswquojobh41ybzp9z53ez81mvwjlrjm0258bsngt5kjfcztewfr9ypysfyklmmcb9xjuttl1ugu96s083skngkzfc3m',
                version: 'tteppulg3bh76g278n8e',
                parameterGroup: 'oluzsh3u87uix7o7a3vwcq8gkg7anufkzf2kwpk305j8r6pwnhm899v49iu1961dbo9sxyvqnq83yiri8qb4rniveu0of9mpt7h4fvut8nmg4c4p2r3061wa7pi8j8dbvhs5v1ac1xoxr56bxvicndqjqeyucgbzwazfndtrg44xt6pi9mc69z9w2b2w4o3m70ebwf0vilbomh70zkg1oxb1woes17oiisfnc951n1oy1lzcd3ews0apjnp65z7',
                name: '3j1fa0pt25axu23yrnyfmyg9fi0ckdt12bxfxlzi5ituo60pgjxya0n6fh3g6hj1iobkjtzg7c9ii9yidwvs2q25g4ij00is89zly3xxfuy7imqcsnwp63g0da1g2grdrgh6hzsan37h2jbunvaukraq6rzn2wjbzzut1utyv7nsn0fgtp5q9pnmsk4xegdnzjz44t7pa8k8eh5tok4aiurqtsg1j1o60oz0a6v3abra4192f7vuhjwq51mvl0kkbffeu2zh0ee42v685ala1kh6przk2usfhbhuh08fmnrs253ofav7q5slnytgi2wf',
                parameterName: 'd47b4fv3i05rxtbojdp75ytdxk2eygbfpu5sycx15ou2wdqqhye0ek9j0dqj9yt0hgzm9x9b28bnmghj9xuje57rnm062xaw4kk4cgq9fkc6kftee6dp7s2rtz0pkorcj2bwg0u2wryekkg4o9jephc1e7zoxejbphom5f4wwisy5q1n47a0wb06itold44dtxg4oi4ysgewj4g2mqq06y100ozurxv0zxhcsqorzwg2chqzspt9h8sotl464vvb3wd1ea66t9kgj3u15xyoc9086xowcji83fwvog0l7jogyfcvjafl3r1dd3gn353n',
                parameterValue: '3bjw3ma6lmgh9z1inbrdqy9nw0i6ghbuz45tr3fy8w47nlja5gmfjaaaembfvq0hv9ajzf7tx4eapwqvahynurpaw20fbwphq5jare7lm9hrrqcoof8a9oa77lv808qfaz7m5ojs9yxchuwogn01ya3r5equ1m4i873ro10dlaf3uxfobj5ei68z15ftv2rnuiifjlp10r69n0ippqmwh5dncutqsfz10kxy9cz7th9cdaacqixcoyzhhljlam0bsyutepal6blwlmf6ke83q8p9iifw09a2mionk01s2rwpgob7gun4m2ubi5rv3bpfa0mpejc75vii9x37vy5wxyboxrz2has57p59zg0ys2igm06b6p8xck7190tl6cmxeyhtmnxnv5tct41ca4yneh7kkn4d9cr55vom86nimd69mhnfk7k6rwaneb70hx82tkcgzzrqa0o4pnelkdbt5je87jwc0ya25g6k2e7goac2ne0icl95b7fs6bxhkytfdnuskopsxg3bbejopz7n9jbx6h9xezd45djmkwcla3n8momn08wxjuoproxy9apr0h4w8k5nud5mdpthkcoyl4xs3lsdhkghfjt3hque5w57d1dzbt2k5kub9gt66frhus00pdjqahpja5k28yfkhcl9bv68tlh0am3a4zyizpwf1g42amdc9in1xkrzowpgxt7zd7fo91qdg8eodsvukwn0v09m9ss8mpf2mz4yvbp3wabw6ykzfhbcei5ww5sia9spa73cg6ers1sk2jy3nkxaoe0tr4mzaxmq0y0cmvxd0lm2g8khfuvunzgz6o794d3vgi10b9kmcasgytrvhbhuwfhq8b5so92wu5zjjpwbedtieotzu122vtfuqj1vyuyrvs6a41e11puckt3evsz05lmcyhu6z97lwqfakirezjbpcmcbiukuo6trhhp578y3q9s84jx1ro6f2muj0irhwn9wlvj3conhimj2onhg5uk1s7c3lazwg5jtibwy',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'm1agqxu9z6zo732e6jkmdal78ukgqfxd2fojq18ktfyjcz56e0',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'mkbf7e6vhtsnvecup87p',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: '215ip9djxd3geb0qbkswh8bjo6vmj9l3pqxs5mg8g3sp8kvcbum33pd31jl5my8ne09epvxqqlyrt0g3urmsjy948p7ml6xq36d1xpqhf5kkwm8j0tquhs92wfljnuygtkjnz7yrgeg2edrhgxgtzh2fc37mkhj5',
                channelComponent: '6frtzath00svn0enjjr7h1susk27o6j4fag4kxgac2ajwvk13fksshvooqk2gs5jg5ssjttghk8394svqncg5q15u3uiiz8uq7ptt50bw9ikhwwk58mo960v2kftd7ceayef4yc7v4gqicyaxt6x48y4lk7udv0y',
                channelName: '8p443ng9q3qplgdc5rbt0o47eyj3frpndzpt4mdt6ytr6b0gkm6lfx9eq40mr4s2spb2nwhdhkjtmgfct03jao7hl2moswl7xu8grf9ljr7gdwhpbk6svv0wfgpw4vv11k1ld2sgphoyfagood77foftkwcyqs2o',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'xlmk9vxlszznip4p4wcruq3hvanbhe9txe3yuzu70wi4z7vuftnbd5qggvypvhms9x6jzm90x6l8r7ekxywkeo2hwaw15giub6te5iicbd1fp3lynn8mds7236eadbyy84pdip9xlddku6z24cj9y7yqo3nc2als',
                flowComponent: 'ua8iimybu58yqy98gbm2wb8qepwtgz1oshkcd4tl6sxir70bzcghubtxrebbihg6hon18vxeohihvb6r9spbirw3q98aovf416o8ovkr7t74yiiy9ufxegij55rnl1jw5zgb3i9baxnp2kbqx9lpjyxp60c9jh9a',
                flowInterfaceName: 'hjeu24xh1uaags6ulizgi91v7ame3j7ix7vxumn0xmbmx5q7ke8q68tmt45slyfewn6l875maflt63r1r5l7887uhmkyiks98sa85o9kqinpu6e80wux813esv3xuujeviltqz47kkif2sxjcown6x9q45kvk3iai',
                flowInterfaceNamespace: 'kw9q2yh5pur4pdnhk1iu9ah0jb0h16t1jymz1d94a42yqe3d55gz6ehypbbrzmpk2m2spanxnkgeptcpwwl18zg582iehu7wjeyt5s0z0i1xf5lu12k0leo0pzqz836sm9srf3rbi0vwmxqvl2z3u25nzyrfc6sc',
                version: 'yqsp6sssajfjs8zv9k30',
                parameterGroup: 'sa925k4r4yxetkxsxnjwvwk2w48sd694flqctnnspjo9yameq86marbp6gg9lvc820p66b1bhqhacg1cdm6rfm34eg6ck35cj4neph5pmtxyzq3ty9iftahliz5czcf57z58ud7xdyg9wdkdjr4puo3vjqq0g6c7350zhsx90lqmyjyymgnm5ko4bj4jy3gamzj8ynim5qq5r3c9bhmvilw1nxcat15yle9at7rows4zmu9opcmolwtl06q5oul',
                name: 'u9nra4ijchmva8u5hsf1r7mgh7w082z9op8tanosn6cvpe8olqn7cfju2zg48v4wmhz627efi9d0voi7t115n4wnunkr2sk41rvuob7j52hq60o7o5xl5e3zjjna4616glmvidiaekwwx35jqi6ceeo97d2cscsdl16xjyx4ssvhiwqx453dn3zn1shel0j5auo8dn1jk28uuy5u3ii0opb57c5t1z02m3bx48f6khpsns4n33v094si1ybbpak1ohm64eswwmvhqwxkgfnwt240yqqjpz27w8lhxf8zvghppw8wc7e5mut9s32oxsud',
                parameterName: 'rgt4z0apnibda7faq8yr222c3bqrfpmu53nhmdb2slbs9mvo505sqogg94i2bttfoid8vkah6b6d2itcex56rtbszhrnl1lghe5c9vix2bn7k2ymxtuzzxpgx18gg47k47wybhvszz0kaueqxsvm8xz493m9cgzdvshtfmtiet5f8kfyzvtdde0uvopo05ra2h7d17us1pdtwsdz6egu2e6qch7e24akawla9f2hu2xdpjkk59xzbnrg7cr85qlskom0kagzvageal24pws4jvzop85314ortsr36ndwzmw5h0972xs4ph406ck2jfkf',
                parameterValue: 'zea6e60k9wonksdgvf98ils61abm04th6moemy9b34k4ngssfcd4dtu7n2o05ml407xblnxm41rqe8ynj13tcobtik0errotnl1rhb4xr3kaugq3jcch73bio5t0u85z1rcwsgqgnco2bij6v2eiet0g86itn1zbtali3d2bo9exk8gp8zgty5csm6tmn0uygooswqn6qurx7vn0iy5xv76p5mfkoy9te6g1g99mwpi5m1a2ji0u9p2k73a2460m7kfa3nvp70x8hqxh9s1sm4wj4hnp10fpet9rrvcfsri2ilibczr5yewabwouhiy1qldtjy69cuzhlbuxidgdao0h3bmc5pgoybrb8gk14bpmfruaje29l5925mkklofm0xcuaadnxds78ld785uznks0by32vl22teog85zpxk5nvxfxfuiwswzk0ec64n2cuo44lgqbzdtynuuuq3m1slzsqivs21niyzazxptynghd2tv6rdl9dno3hmhh2n76w0tm56s6qgpbgelbrpzq2f9yafjq1q031i1c8lb2orpukkx4euvkf1zbb3rrg05fydkjn4jll07orkvbrd713qt5bdq4bz7ji5qgzx7nw8zterodwchepow4n90vuyick8pkjck89coo3688pa0upf3bdm5u2wekb98zsxbi4i9rqg68u8mv1l1auo0soq7991zv55ltsk1iu2herxn15uw4021me5j1nxtisv34h2wxcewoceonvxn4nwbvdnfhm9er3l2fwdjistcln8htqz5xp29w8q7nvssoviatgwwr71h6ja2h4ef1zf75nqtplgzzit81qusf3dpbjybscuzjzmr8sxvw7d9moa7qcfp214r2s9s0aikyl6niuhk58ykug0isx6coufx4zpghwrklk6aofwfxr9kv3i6nzb7p8g66f30kklksd9say217drc5m2x335acsqy1aluweh1axmc6ou3tnpnb6m4ewqkkl1on92hx7l277vjoso9h',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'ka2f5e34rhrd6bhg5x9dmb2jxaiqo567nm6uvktta7npwxbd5a',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'v853fmpkoixk7ib08wto',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'xxonsd89ce8cwc5clhc4gcm2f0inkumzuc6ftw2el4cv2oq1xl23tnviguca7fqexcq9jgpxx6ycppgrh85jkgc3bxkcmrl3or15cajqbbfxy04iydhxtydoqn5swtb6lfcnl1dqxmxh21g27tfywpx4d2iwzma7',
                channelComponent: 'kmyqap52263ftizrzerakr4e98cqelpnsj1qw8mpye2fj5im8vdqszsk8xog99n1d999bi4t46u0d0f1nx35rvt7xsl2wjzljo2ihjvp1una9p36hrbyg1dfc3iuxvxndx6iqnv3ib8au6f3mzsztyp7c4hduqql',
                channelName: '6xp7l6edtbmz5yflknlja6wszgg3f4ki0z2ljlw5hu5p6qn1lc1xpk1q8b9docxzwo8dxx8iu9trpr6jw74220w3mt9ocyjtgv2psavmkazb1htctedght2u32z4fubgematq8fr3aqbmjwzlf2rdyn5zzgfu0um',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'cd5tvnu51fm9z0t6543btosb8msnzgr7sydvfeksrmo7z1km9gmcq1eitps0g91rd0ptj7gy735y7jzkm54bjr27uq8obm9fyu6qsye7ldzsps5stslgzzbvsb8kfb6io6nsknrajz3ey5h20sorinnfdh6n4lq5',
                flowComponent: 'jkwegakf81oa4qezh4zcm5jym98rjtp45gho4zk3fjtx6dlqex8xpl0hozm3iigtw6had3bcejeybxyf1v9q66gjg4wfuwvo4cpmp3dykbu1fobd7t956o581bzdsznan1cef38iwyrvkhwznzfp9usxj1jfzy2m',
                flowInterfaceName: 'xtyujkkcivyouzdqvdacfsi3g8lfhowdn29i8rnne2ptb7io2spwg0m6jde2ovacc5bkczjum48rizy6r22j64ofjmx8ib252eeq4bgcfc8kgeeeqngeoms06oz8exov2es8eks3iu0qm9kif8m32wlxfjehvsbf',
                flowInterfaceNamespace: 'mnojaetsi1kvkabcu6x9zcpnxb8ahwx56gjiizh4s5cja1keh8yia8t8y4e9gzmfy8s25846mrxuthr2yf8wv7c5zf7u0s08xzxkuo2jb7p1wxz9zhhe1rlwvd1o1bd2116l217qcz45b12rxt7q9svmq760pxcmw',
                version: 'q3cqvtrhe6gq2ftdgdqt',
                parameterGroup: 'lm8trwiailvpns8ec6vj7oesl4sfgp5c8xj46x5uo5gsjkxahu4ua4ie73427id47jf9srpvc5gzt16m4gv51wt6ndxpfy5idyeefn7jl176cn44dsms0mtj9jtjl9jx6irqvtz7ldlolsusw8yrycfcaimb1h6bn50408trusengl345kc27ywjkbglj56phrnqlwdocv9ziyng6cd9ilmsm93a9uaf5e1vcgel43rtgfk3vb1s2nhdw7crnvb',
                name: 'wfhc69rwbj9wok3duf8j396xrihe2enfgq8hfgxlpkh85fiqerg3wvxt8qmlfxm2200zgrkf0w5qzvsfmgu9db313cvlvduphvg8rn9dneqb356imd5ro5wq6lbihn28rr2e3prn0yrs0jbrxdp0k9y7w2vyfh8wvt8un0nfciy5cz692ugm10tcikr0yce5udhgy8ixafjlmtfv5mei104ee9rgetzar3lp3a8isqon4901hc29h6fmo1nk7s734fwuoq2a1epnacspn5pumxhvesmc5x7j8w628vuvfxz8gob58nsjzyb1obajx2s4',
                parameterName: '08izhkvf2kdhqe2l3lqbuuvy9qdiqu6n36oiz2dnk122kfhpwlfk9oin0zspqmy2igubn64lduij27yxm3bpsv4vnohizg8nt0gqo2w72jewwhx0cj9sj7fbkgtqcsq7zt4zeg5uxlhcqubugqs1hwdco3uqeolo7szkyfsn8wf4v7gi6snu4yv1fuj6a4nsufgmp5uxs3oz2tftxvggfjooeau0y0v5p9pznpsein36esuin0mwojjkq26eo0418yfdwh7yafg0l22rdol9uhy4ryuna3ucaptxeb2d6vzw3nd0oyf9eekew586859i',
                parameterValue: 'jwhb9woelqbv1nzl5mrdhjhavzdtvha72vulppuzf0opsn00q7smgtoftgi8w37jxi9j0cbds20k6u39mte5ugbi9j8j91ncens3rfucf0qa5u2qycxjy3rw9i9lhped2wr58iy87g8qk5tu45oluklyetq6o5oko4e1w2g8lbp7ytvbm8b1wdk2us1eeil98ucdkh6cjzr0uyhenm5plk9o991lds1jn6xr90q7hzcsvszeh7enwt2z6ssfhvm86ms3c85m0f43qi4kqi4gr7qbgsspq9jkwi8kab2n7nlng1ixo0mwd2w3lgnlwktikjky5qisiupyjcqhieihx325kk1qs256jx9t4ld3klb5bff7e95guyrsobyq9tp3rk30y500ryvki8mynp10taj6qq6ii343mjxxmm8fk9u7j5d12qon2ryszjmgfd2b09pv7wmjdtb7zr8syyoi0uuvqwyzerpsaan842vsys36p0orf19o1sbbptc9odlbljky63iemq7or2pwjj8t9mjsh2em06niknjkws484xpipu1jtmwqy5l0dz4h3fka5mvp50gv2gzgapibgq1u9qpo4nkxezt6dvve9j7d6r0jupk75am7a1j1x7ourxwxeouqoh1lbnwb8qz91jlu7jkud9lbmkg3owd03ejf1jmwdgm1ce5qbdhvd82msu60svjbutuepazzddvtdf4e0t0f7faei0tmfm0dnruoefsp766jg8a2dsaomkpn0au9hxbgtpdp6y4xz38klzul9wgwro6fenvjn5l0rrigrb566snwpulzsatpujdyttz3nsjhmdh6msnbq1gr07l7u1hjoq8wmawb1rqlvwz9t9rgvqp4e6jbxp8kd8e6e5o1dls24651fbb2ss16g9gv506ak43nqo3hgo2vk5w7xuppazo7hzf00f7n77qcemfllvav6m1izbzb1yq0ribrlxs5l4ka9nireqfp32f0xcy0vnpwyexxz5ui6b04hidq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'gmm2nmp8v2eqbz32teej0a9iegmp9teaduv55ugrhijjip8pkb',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'kbffz1fzx4le028yenux',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'hf28gcgthacyd9dfgjnmr76tl8abl24h5pt96td9oniwvq3qgz4oxi1ghkaby6wmz4k49rzp20byi22hczwt0eigm9iq08rlbzv3of1bj75ojj867lzg6dj7580iu4talx05s6bj9mjhz7m24ww0cuzyr10zt3a8',
                channelComponent: 'h1jx474dds9lp63pz6bpttjhb9oaicbcpyci4fwgedtxiztifmryxi3vqngj4qqfh36oledcg5qg01s1e8sjm5ig0898nef2gsdab3viqbtwdz7a17fod7evejoqtct24kn216vtna0kqp01usadgzy3a6l1oed2',
                channelName: '32g3016j3r2hep7k5604p95fb3nk9ftus5vy83r18iuugq6uoqxnr42bym2sfr6ntc1lgsdsft3frramm3wka24bey22qi351mdyv87gb76xrsf5l5hoyx79xh6y9rilk4h9xtp5dj7m43dqwk65xvtv2brqhfry',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'tbbynlngkuwlpqjnr5jkvufmgwwgbznues6es12ei2ur968lemazd7dn3pm2o877svkr0npotr2n2w17y7d6vf6l5jjzocfut9wtb7ll7tujwvkiikk8m6nja3nzzvaig9ngxxyyfyrle8rnx5hpwq06kwcuhbu3',
                flowComponent: 'tz7b4i5xkoy7hil3nezh4yzxb1m3r6mowmv00grwrdhgq7eo58zo2xi3xov0gcpnceae0cdlvr9qwv2fkiw5ey28rjti6jucl5zlfv9yv811kpoc4fl6miqj1fivt2yi5e2lhmzd1xeaek8ts2zyvrlagrtc2ud7',
                flowInterfaceName: 'i15rjvqt6j3ymlmg37vlntsdvt4bzqjz3o3n5k7bzhdliti8gxslno0q5zm0n8i1vuctmh0yvhsar53ix4ecpn8ggcp8g23hatk21b3sx09f5lzt3o10jp5dtvq27p7070n61m1l0pm3k2awgmrckqvgpakg0cca',
                flowInterfaceNamespace: 'nylzxbxgp7fnyh8smfsa5rhte3ugvumtt9no33v1eazpson532l91ts6lsgim30uo1rng0hb1xwby65a1ytw2jw68ltn4hx6mnh35cmrle4tiyaxtozjixnp8dlbev97it9n041u7iwnwbg8o5nehk4se6nv2l5x',
                version: 'oqsz8ra66eqkhogi0l1um',
                parameterGroup: 'jfcrpd6vv0slylg6uqn1odjk6poin97i29i8cqpbq82js0s1x165qlew9zc9en5c2wtp0b2mec562qvefb840gocf3x9htb51m3j2h4peu4ph2d15yn2hgx5irhvykt1fb7jgsksjxfniyjto26zpi03uyrltxiq816ljg19tcmod3kfij9uextm98pk88b55odbslbz32zvc7f0be6vzbjchg9bhopmea0cf0h4dpuj4og82u4fewhspvbbbuu',
                name: 'lnatptyp9u01v3jm0euk5srdbpci882e35gtcskzya2b9geb3h9fom4wy0lqxwoxfykto2tr5te4fkgbe69sdjyhy8pwqw1chc4zl345tdj5ma9cyftqq7h0ktwylki4md07r7dfdj2f2eil6kguhvjt9h155yt7rh6mdhi3x8o0ygx9h0ipk086r5x4meudlp5dtnwt91vvz0c57lku79seacjd43r6eqisctbesm48r0zd67lhia7pl53x1igv7nakc1zlz4lhvkux9ewuqsrs4xj5a9p8xvhys2pas6ff2z5ffeipneuq3ng73ho4',
                parameterName: '8t26crqo4hc073vq4y7liooghp5h4pw4jnpoi4qjhyzwp1e8f4jq5s6f96h8v9orhhgexm9bsjfh0g5bnwnw4kcvoikowvoemi7kdxu9mgnqzem06adz7b7rfg3fms1xzcmnb74rxed01covdegz1jwlq6sbsxhxxtdtrydjm8ulip49x8quuo4yza2cpjjp2pnwcrk8q3e2jya4rqtnr1u8x8y46wadvval6q8s9od1g4zz6xysemtvz70plmskq88rqpgvae7zst68jc7394x6mkveu9qfn3yh6w8jwr539fh5cxdrv1kykl1cxa5c',
                parameterValue: 'n1w4c1gfxh3rzf9tdgxrpm2ffqfmqz6uh7qhqwiqu7xhf6901181pl8rada0n49uzm5arspcem144r6oru0cizbpqze77uww4fzvzjlc8jyjj211z2izdqw27fwmr6vjls3gch78xdhm796r9pbo71s0gtha51nj91izg6nxteka6p5lrdhwk3kd0pqq2dijkd31meg98phobmhb836ku1vl3j9nfkyyzp6voe73fw9h8yvx199j8a2gqr9sui115kgk7wgxg3a5zikk3mc5d5cephk1sxug9hmoqpmwrw3sq3qhvnjoz6azsnsofj36r4ncxlyf8ourb037l7loxqo2arlcrm7kthqyth0yj37j582hbb4nxo6b363c5xk260w6g64yacx9lh2caau3yz1mbczf5t35kuaawnjy4tgp81p01d5k4if4frd9iojhy7gpxbohkszt3kmzovhtn6o0nlvc8rrpnwn4ipoic12x6sxb51lk5t92tkw15n9z5vvmqh7zsd468632qi0y3brnzid6m3sdr4aejz07jeku06ctcdp7z0yzkwsnc2vaygqn0lgvxwarlt813527hzg4q6voc1bcrvajw4oj2cmwmqpplhdwzvqvsefe7lkm12jctkv5x7ifripmvgb5u4njzg7a0d9eigzakjeso5wr4qd5rk9af573pmwmw6zafxzmldo84oat9gjsx059uspicu73xroot8j58x0cm0iwy61ik9ypufwkajhcz1jt59sfd6nubgwkeztv1tafmc6lfqn2uwp61ba3jkehyncf28ei4tvsol5bduoe7dgh86t4wewdip5xwiy8tj57sag7pn99tsfmzeiebk4i5n73jajsfhc6x38ufq38r3vwsk54lkx9w21hz89fbv7vkoks73m9i67ewxhhvk1h6tjffxklpc8qj8vf9ivu6av8zpbdcs3owwi5fvfzwwn51wy2s5kcbheckoqnegyqwp4w7vbxgndlwk97lxxg0uab',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '1kd8mdgciwmi9nwvi4bgiuwebjmao94pt1p62ji51y1xw66nse',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'mjqw8n7u9a32ddk02t20',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'omxz119gjv3pyxnjy6292dt4bwokw9mb8g898f6ebbegrtmtpus6h9vnomno9p7lc8xex4lv1ajk3ezazdlnazr8gsunwqza8n2kzmphz1jaft9jps3ku8abls9ufsvqwvl1t33u3yd4x4nt7ncu6bwdfqbwd6mx',
                channelComponent: 'sykc1vfqmdiifwhx1fs9mam42o57zqovquq3qywmdw5nlxun98d6ec2ln3mo248m6uw99ahh3sefoewmzarlnsz108iy79r0ps2fi486azg3luxrd6leacza9l2i3hpyop4wcgq202mkgdgaqn7g92pcconlwu4r',
                channelName: 'a0m878h5ih756r7bqihah5pjqrr69b22kv3u4rx38simu7t4rkmm2sqceti5wl52z9m4yjn7ylybzb5g948yhds8jb1lri5l3e16tdugcst4x3rzb6or1z6ke4tuq42xzagv4gjgiw0h0yjc2sav3tpmyuworttt',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'qry76sn3pf76ks0ntjvuv0chhnr33umdbdph4tqom788wec1wqs6ybw5v6xwbk0iphsa3dez48pkdpl709yzshwcxj3qqda8kmb23sd6j4y1haimbkzmcszyp4hj38wpklp548kpz6laudbaz7n30qo6y1cq58b9',
                flowComponent: '1v6n71wixh5sffkz9985jzud97z4qknmi2kxfxwp9uiy6aby3asnyewq1j2if9h49w90fpe9zture2tkdez1lermfl5w4s91xg40pjmtspb60olakehzdp4nkpgnsqjfpndc7xum6fxi8dpnz03brbdwlith6ds2',
                flowInterfaceName: 'rl4uw50mf0iz1bx788oe5tn7f1cpoq13egweuvws08s0aifk3rjya5lwnp6k6idym7dvbyo84222di87d6gcfutw6qqsjr0yt1mutdh2ze0f95ngeyaxx529uh74ody2z2xzy7okil14o5i2sg8r1wuabute3pep',
                flowInterfaceNamespace: 'e9aizfa6ikc6oexwc3efwb1kvbg4hu39gocvhsqbd2hl3ly5e0s5ymxyd6ph4ejlck4pwq3luqn9qp1mygay2lpo540rzyoqbh46y0uo8wxdg5fhmqzwi9qcad0r925igiolamx4k4kvvdq93aa8e81egvh2fvba',
                version: 'a0cn4owooxgz0rpwrm4u',
                parameterGroup: 'bi76i3b6ijmou1nxk7yqybvpkvc24em9blju7ou08ksmen0d8wysa5lrv9whwr1r06ogqhb95kir63u18t686ocycz6wtmjcchu2lwj8p5pgwohz7jjqkh6zy1l68x8f2d05hgpyckd3e30jnu6927e5ezb82w3rueh5vm1wvp2zrj7f4g9o0nn8327myk2gl4ttgi7ftkoo5q4fn79v5p16edo8h8hpse00l14xdokfxhg7rkx55pxs6rm7rt4h',
                name: 'c3trwwz1dnkey4sb74t5zlsim0p9ejtqpx3ng4zfco18xnykgvep5sme4q38iioxfoqzno2h2zbz2do3wljc5s7ydbqmh66m9zrgqbiuvkoax71wklb3viql8w7jacg324qi85idfag8to6507g41s7ln4e3r4053qfamwhew0zrd3xaigw6e7od7m340wak97ql8e9p3rmr68y8llb2d4m1j5eyvel5uw4mqqln7fllq45j1nk4j3ngk09niobiok1tab14ll1mxp3ahv04beg9zy4e0corwnkjjcixxuvbv8ldwn9do3nlva9s30ab',
                parameterName: 'zg1yobph0ou1wxdydcfw68148nu57xroe8t7w6hok1yyyxu6yigpp7r8pgdsr36szapfakclumudgfw0o5isrwjycsbktcbonh78t81sfa3h4ukc9yasjn3kgt1b6cvcniprajkb22l3ckem10jpce6dmtc5rdlaaikhovkxw6n90bqglz0mfmu7bq2px9ou3xh51xfgyotv54fynbl3l8720yl4mtfp68gfax899y2foh2u6yohl647ictsmk6molkfermi23a9wh8ryu1c8p02vx4aussekxmcmitux1p19rvpyvygqjymn0ciwjwi',
                parameterValue: 'jtinpi0ddstlt2ac58k5v2yp3nzkmejopgd5uoq4o5et35c6f038dhbdqrgqhaosnuibv2fezbaz1jortx0sg9zjg42dlffrd5okd5wus8zen0gj7z5rpzjzoiegevay9fgjn9e8jmgb62giyrrtvnjpx1bgxa6xnstvu1ouzpb9xauksgkmz65uodwa4a6wlgw85ld7tysbhrhonap4acr6h8of8x8n4oiebt3kiy794jd25osuo4wwykbctt34v19xv8au8b6gg1vgamfu7vw5wm1yakvp8464z94ebex3mbj3ngv5mnegywluy5khsmih483u7agpmjkcjb94s6ru92d5067mplmax10ihozeagwfpxy3valge4uk4pkoi15kiiopypq302fn0hchir3kx08o7cf5bsvj761ydgg0uyn9wvn5pznqtsc2w0l6o34li069mgts7wj7my6ckyc9q2wa2he6dz3m47sno1ts4clozdw0ayc0r1rkgx0p69u6vr4bm7kvqujg5pxtpfs5r9gj9hq2ejghvykpz0putugfgrm18gar4egicbk2lrofsu9gw1a1nwxrf9co8u2kjhwrn7dbzholpsxqxr7aqhvl8ep9iwvkb805anhw711boyw2t72hotjzv8vhov30s6hwn6c73ew0kkzn9h86hvy1xk116653odqpkz1cgf12ar1hie6yeguqru1li56mquza4fqq0qaqif1vtpfa5pkqv7mmypf9492vs6ibfwmbaelnlnf4lbljkqsrjm5auc38ukmrgs2cwmtg8qymhmfh0eqj9fq3oua6aca592b9b9d5hb3x2eg2khx9lvmemsnds8nhtig9mg15wm05e2gi77rvvxvroglbceq2wiud9eo8myzrint22wm87tg6inrl8rk9a88phdo4bwvuwvx9vbd1t1z0avzm6wpdgb3p91pgdvs131xm1xctxnn8z5lu1juu0mtsji7uetkangd27o63cdlvtjtymm8j',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'hxbhg0t2z6vt8x9khi6fhe11r2xkzcgopimlbed388phumake2',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'xlmqekrdopehlg0av46y',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'qlglxzisrkigsz5li8tdj14sxr4f8g7xvedjrh374o4207e6oqrbrdoo85adi7fdxchnsfcjbb480l1ddx07woeke2y4wm9mbqes1da47n1kjqduqgwbko7hzxcrgvgv9anoey8wm06tvw9r6rsjollzdyzoupu9',
                channelComponent: '50txk4ml0u40f8d574u5o8g38j7uo5c08w9l1rg956488n6tu8hmvlyiesdqdrc62cl0h88lv2xr1ervcnw7xms1pdv6ykaakl9tqz2te4zxl1zaoepcptsnprr58kcqw55tuop0weuj8ecqirm3v5q3nk6sny44',
                channelName: 'yydyyim7z3o085ruh945nvbcgeus6kamvq7ovxhzcxp3vv5ozdu0fzuwey73qvfa24wmz9kaepcfy82k31g69s3oi3udfx4a3tt3znmrizoirm8jta70jqta1r9g2km1p9m3wbqim58kjlhmrd0ualpsg6urokvn',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'gpnw67ezjye336muyspv54jbnqp9l2kg2kc3zw7xy8ohbu29cn0vuztfo2nwumhvq8lhuroy9dl8m26e6uqxd2g7hd77mthqsdv7b04i5zagjwkp0jc1ffzje8kw2liujtjc3kbrg34vqs2pov6z2wsu4kj09z09',
                flowComponent: '6a3a4dzsz1yxuysu1ha1plz1u21ph4b4nt5bh5gq8nuxs6owlmsyabslc9i667b32qmy2b2o3bagr4x7ud8mm3zmmzt3nrzr2la98f1mxav0v2xai1hc6y9wvzfxqg0wtybb508ainvqwmwau8wfqm5m0g9dqdzg',
                flowInterfaceName: 's84uidcof31fdrqf77vmbkrzjavwa8bc5l1owhek132ga8ny6m7zcsegha3pr6cucmm3rnol3ko67m5kkann5xjsgrvv9jq7zoqk0kmsc0wpq8wtjq9orrhfmg4qunpyxhzd4f0dktc9d98wqko82xaliany3o3e',
                flowInterfaceNamespace: 'i9049s5n5ce0uuvu6pcnplh33kebt67k3ldojwj66ipka79b44sxr8bpw4jmtsaykrdz0oc6x5bokmqyne56ogf1jmseblg989rpmwvwvtbg76hghnjvkt5sf01k1im0bu8ir21ngxo57k50nsr4utsmh5q0x5hb',
                version: 'gzqqifoksj3438j6xnra',
                parameterGroup: '81slhseprqcip9ue4qfchjwnxx57mkqhiuf2eerrw6l3eq7xcqubqdx5wlohf1pht26625ewmipzmgs4p0riz9mbzr9yh8qlj9kgnoc5za5my1blvz5dxki3kwtzvsxrsq98fqfmzrfjqe8i9p591me3559o3mdy9xd2di87sf39xzk6y185jhz1wzddfp6qiurhui1vfysc6g9rujgpiq813jvchcsofddusa5tz8opjnrahb1vq2bhijvjozh',
                name: 't9rur99z78agr9ez0qc59b7vkdtp2i1migxy5foxmcojptcxna11hjw43k4sj0nlb3hfnt2gj8fef3qbsgf7cdjjxrkozamwrmg89zwbwfa9okq2dgok2t7g50pwx80m3b18iol5udgw5l1vavwlsjdsbx3587rg0d4r9k1mpjr2i4xbfc221eoqlcc48tqvzkvbkygym1hj2qw8o2q8quc105gg3cjoj2ewhdnzlj8mpg9r1iqx6f34ed1vxygxt1wds6mfumgpdykk90hc574blnkh6zutnvg7k2h9srzmhwq2c8qyn04c09lqj5afv',
                parameterName: '4k2maazwzgmiilrhbz80kw15hn37od5mzxw64545phcj52k1ect8ubj5b2b32cpdcmo2j9fi6nimjukja1aettc0qcp0dd3l53msdf45yea9g5qolu5pt85n3i3y39l0kjp3k5qsl4pf5st2imbr9x0ozgbgp9th44to1xarhki4sba9idzfsn9tyh5qnzivp0552f4p4uk4qgua3np6qhcq1vo8d1ul3fk3bldoj3gthj32pzupz249fph0nr9anfifxzfugcp0cep05ifg2xol9n6eg12y5lcqzf81chg8xndsr6a7d7gta9o84gzr',
                parameterValue: 'hrelja38o1e4rm5i8kp7esu4tney2lohdyr5qqkdev3d7465javmhmme2j1e83rgioynonp5ujr49etpa603jjglj02y0kpg5s57zidaltetuszqeb98vh9ol23o1mh5hkmmy77mv3yftzcx7nqbh4cn6irmslgvvpqhqcfr6bljc08268jp0jewk7m2gekl47hx6tisqbspkfr6zpfevmofojonxe288rhtiadxiaz4can63ncloui9ti7ih7ugq15abn75uj3zkgpxoy3znq96ekk6hygt00kng9ginleozm66mlhdjpfoc7j6i9xwbd4jpfoqy1ukwhech8snw5b3pd0oqjk7kx1rd1im7wz7xtueavn1gcss1j9a3umx4o9f18t8drpm0y2d13zjrp4hiruxtu8ge9vvbbcpovcrwq2d8ejzjwbmhmjf0iycv3q287ehy55s7xwtgxv5iq20uddv4u6gzp07v6bce544o56uldrq8x2lfxrpkwuyggad9kbs6vb0peb46k85qdu5of9xhrwoeyu6xlrskahu2nch6qc0kn1lkn11020zot4dxt89ci4cb9x42nvhp7rddhvmjbbe3jv0n7fkvgk42undqrmsjp9vjpyh3hpq8xsbmw3gki9eo5z804y038v1p7glda0ur58hy7rw9lraut8jfdcsic28ad0cozmzie87vy4lgvjjtqgvez992rv05bdisyf2i45k2v73m5trvd5l9soiyw16zp4s7w17bnwqw5imbe2kcpyc8utzke2hl9ifftwgh4vr4wno90frnp48rjadly72edfz264kfgruc96uiccc13pss6asw37ma3f8sjzq55ee4z5ypr0pok86f16t7a3hwe01mczx5y19nyubksi0t1kppkr2u4w10mtsav26fhueq6ht0qi2pxz8bbbwfapdzy7eo7ox81vxbjahgbq15up4uthx5wnmxmcqkp40ealdaw606k7ryz10s2k1kssop1gwza56',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '60fas4qv4x25ybkk4m7ern7g5laokw8j1zzlanwd7sdylc3l0m',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'o1td2hgki0uzfedsdqn5',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'htmd5cflpxd7u5cn6e7eipkf2uek8xwaq5uj6mkiqgop0cfsbsytdpixy7yx8y93b275i2v601a6zsgoi8mp4d54mdubvab80k7r88dfz17n5nqdtfm2etxzwjz418rw8ot2aetgsxybhc5l6os3w0ypn9sj2p8d',
                channelComponent: 'cxsglrocqf0zjeb7sxn1skx5cxxduxx3522y71pcs619ug3dlzkbxax3nat8t3wr6uu0qq9uswxgacrcag4w9sd5ik3kgbd8is5lspnxuizvk0hd8q1xb6w6k3atyyzy0dqtpcqx2xmconp6xvwqhfiac9l9xntc',
                channelName: 'gfq4lbp4bhsducew3j0b8svjmbsgdtelzizf0je24jf20md36k2i3m4i40t983esnke0seayu42lntf0ylt5prfxcd12wsuy4n16nkk3dvijn8g7uyrg3kfupbbhvtx0pz347qbiwojve1aaf4xvdidad4eu8ova',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '1hti2nfl7bkh8g35z0fpsb1kazar5bua5q12laozfxrdy1hy04xmagnftfnh9nmq4d88qx2olay2iuf1yl8k1ldtratsqqqon9qvjkmb4vvd5u2x0twb23uethg4tgfo9pjgycvgvzvh8ckfe7qc92vng9vj1mvr',
                flowComponent: 'ccc17vnr6n3treamdfxsuh0c4awmqbzsgm4dmgkcfomfoxouwpuuwxhqo15w0e76ql0ziilfabho80u2u9ewzpxxzrvypocok5b32ozb5i60nxunvb7cqvn5uuwqvidedaesuyt2gaycyu7hs7t3ai9bf7t1do4k',
                flowInterfaceName: '46dk0lzhgx9fl4ac0wfyyxpblico1e4tbwku5fgfj07m1o1c6dmvl74fuk3yxk3pa9pwkg3sosvho83einds8ft8ttjju2r5zorwhtgcumgsc0cpc07dkbz46zmq9zkfwdvwz1p24e368wokctyi9xcqqqrnqnur',
                flowInterfaceNamespace: '9j1jnue9wnvlr7zxfffavu8ux3xlklckxainmhpkj6vkstczizg1sohxq0w13rdbjg81vgw2pn9zxuffpg2dp6xds8gnscccndue21dub6owpt38iszgmnztkpdqix2wo7d3gb8xbzdopurfu8azlxdafztuc9cx',
                version: 'l26lx9y2x13j4j1n86dn',
                parameterGroup: 'blr438fq3pxj7m5q03m4g9epeqn5q9abbyx4l32drehzhf8m5ggkcictzvf9httlni3km1ylk7xkxhntcz1j8zujvyigag4i2h9602wp08bbc26qo4md5y83fk932gvmzcqylvijx5p7nqnyfn5o9g767g92j470joxz80msrqv7rcklzp99x66y3596dti5k3cmo8ohnqwzzttt8n9twl601xh0svaq3kyi48269f4wxa05xw7nvv8fg8g54od',
                name: 'hxj2nga0qgkq9oaii2tf5f8zlofenlc1ag57itvbxhy5kjvau9fk2azrtqm4hrcde5pei4fqd99pu1taspl0vmxfw4b5h2758k6qxtdeqs31x7pwaq631zajymw1ywjq3148tnvsfpvqcwge2qbhz3qs8voep7odtq7581hn3m2pzo5630ihobos19hnueae5qrat5k1mp7roigixl4como3334z6emg04qmpcz3ob2otg1gpjndi3j0mkq42sso0p56n0apq2mm4fgc9lvw3emlmv8aky9705iiw9t0cuaxe47p29gmxd8bu9tzp6pw',
                parameterName: 'wxtqr06yc16lip999mkyiymto32h2wryi829s7yzimk2s2bub27j1tsqtnmk4lo2w61jggybz5dv439a7u2ca6z82s6vvg9nmkd9nqlvjza0sb7o0c87qdp1znb4raiz2mqpaj9e6wgmzeh57054oi3e7mntpl1fkusaqqlz3zv2jj567wut59gxle0tojyfvjxr0zn8ut674loqj9kl6h5ic5xn94n39i4folg3wu1f5fsb7ahfrmsu3l0tnkrw5wizjahy3zdsmxwgl3bu1v5uh7gkklu0rl8g5s6myiyw8s2c402flhchax564c5us',
                parameterValue: 'retavmi55hoqeulkenxk4n8026225m5eqb67deyamvsq4l66oa2iga0vuaglxbqj2zrydjj845oskq7xliravc3qyyj5w5uavd7ty9t3d8gjbdf6jg0gka0ulnbojcue4etivkuw2qxi10a39xp4eqf1ss9nomrcsffmftbf6iitj4fz12unykvfx8ggad4xeohog6zeq1btnidiiutovv9t8h087htgbfaz7optrzhaogu2knifixk8196109da74w8kslt9ecot27ed82ssjrtcvcbtobb8nmuw2g4v8rcj8dxluvbvn29g9vvrpcm06pfj4180ce2x35l41w6zlvr0nn5yot3s4ef2dnbi0jj6v3v7cszr7o9x6z074hmm6n7b7trw1yaha52b251yrstbj9i64gyf7dcw28h27dw7gpdw3zzsiwjy3vagtvue44lgm7rkwggj9dcpmoso7zbhhiy26zhb9m781p9a0pulkgl1y5no9k4vn0y8tblkvpkes31fvu0xaav67rm2hrc4wzl4b4oxyhnhhut4ahvfdakzy28xxj35brfs5busmb6u4tsjxol8s4s0pwk7y8ed4pa5k8p6s6n1mek4bye9ne7mzcoev47x9lge7txb1acmvhhq53m2aawt94r70p91bokepme5wu1j0uc4fueve96xnieceqgrsnwz4drklj2do6pp4ka8x87un2iug0no9x7a1y377r5550unenkwcwbo7zxfb4v86xusauke2aztmlyifxspay79rk97aeib1kbe5jqkjmwve49chvdmvkd6uopjxdjnf3eb9ujmf0n1acu32joxci5s2t6dcl78zombxca6o1p7bmw4qqu14mh5807b7u1rn41cz4l0sytuief5majpp08wje39xzsde1q8c6ki0hkk1mplt4a11lun9bntmk1i58tl7asspqxwgfu7zm1w0fve9g1bl1ie59cuele94xlkwcq0o71t44kqrwlovt29odxyo7i',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '2cvkpabk1xq8z0v0dnwi3fscdk1onxtgzngu1ki8cx9fi96e9b',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'ssrprz64nxpet75ijy0z',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'ea1fiicqb1xpwlu0mne0wuwb19f7kr8k7cqmy9mfgpcjrpbkn73qe8v2zxbc6so8ebu62x7t83nv20pg4nzmd3nwhgv2glkf8oi1y3pe7oq2m48lad0dp359203t1xukb66k7jvszkirtyiumbxkf9cljp5a039y',
                channelComponent: 'wsnxryjbosus5jcvlvmz7ifrj2yz755tmxe6ig7xfrpj3f0p4ynaiusfo6lysvlf3gfbb68l1vyarqq05kujd73cu7uoc6tzap4yshmdavk3239s6b7cwkitvsy7j4lxzo415ovfwgnmndgywilkt91x3t2s1elm',
                channelName: 'g18iaf6ynpthbmr434yyv7o86lrdwuvjasy4j14n1u0nygfsk4jf5e55sjvl3bm4hxmv7u5ctvcmktoov7po1gjuz7c8adbv34f7juwzoofkp99nh2ld8d71gqa94wqw9fqe3gvd4flmfuxk9ng7ct7n5jpirgix',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: 'fdublkihk0v397m72cmmjky4nigwhqev9blxrbkabp2uc14v6nqg3yw4lbf7alz8r4ej1ctwgeucqjpwqfioz23pwaqj3vn5jmdopec3ffzn2jtvslenvetmt3aqp9qdvtaqabjva71tarob92f0f7k0mbbcdtvv',
                flowComponent: '1jim4lvr0my5izcgcmihl6e6ei6ce1cvj4s3qx2ekpdgg9fucxuyiu70ojww8e6lyw15lmjodx6bgrd03enl1w12t8lim6j2oj2qywmfuii5s8lgnalkx75pi6n6j3jr28h5zbw2cp0oc8h964pciq26lvrx91y1',
                flowInterfaceName: 'zfck5dqz21qt7v9k1v48d2bvfl0vuq2u6w8vldt2z5xdbm18lky2h3kyu4jt31th3jpodu9pr0jbfntvdgmb2ijeva0q8mjunw8exojgcvud4hk1pz8lqju7e8x06vcddo7wn5zf9u8lnziubg3pbdou0t2k8sk4',
                flowInterfaceNamespace: 'w9tnltwi08sf9igjzvg17uhn4rpf6j59aco7gxd95o941kwe28th9o19kun4s88pepws2er2761t8ts4z1kw34y447tncbxgadya99bbkn7zrkrj1lk9wgyd44612k45ymgqj1jfce7agu524esu2gs6x5v7tnc0',
                version: 'gx6rsul9bnmwn1bouvcu',
                parameterGroup: 'b9b5ia2kwbshy8jvnznf69zxt55j4z0modf3j3fcu92jzjc2pwub5zp5d3yzff75or8zp5qcwbunu0llubnkxk47pmxg8zgav8biv6tiz5uyf7h9wwqt5zqf11paxc4vhn384zql9bhvcyrr0cvxyexodlbhrtxkzsy32ss2y7870b9an8yy553shbcsmw1c03sqzcka56wl03nrc4igd121tfr2krftld5djzlw0u1ri3nl7xmfmwweuxk474p',
                name: '4duiu0t0edfh4cons6mq2v5s9og24hyusqdfxfz4t5i41uzcz4n0dsqpkdnz6x7tpz0yxg8troc5afrsbztwns1d8dv2ao543pl05fu8s9hsbb25etdsxnzbs31jn87rmsk16zdqyb9lo8rsj9lnczhmcj7d1dqmq3sr0ror5hkmdkmcirmumrx19gojmn6zvu2a9e631d354at9fg13ot2xpiqy5m0wbymkm8i57moxfkb5pnexll8vmzjcku2jdslsmx7gng147rfl9nahrlw0lykh37kp9snmz5f4ae6mk1h7fhth0or36pee9j80',
                parameterName: 'taf9rmdip4uqhq86v1tq22q2mbhymuu17r64b2uy0rgn1gvrj8fourwr1k03sj9bdqjjify432hveqi8xda3ksuyhmmkl2ql9z3c1pziez2nfjc5fq52kqyro3dxaff88v4ookxjdl5lix8hq8vkfcihbv81pkntqe8a2tswrsaaqfvs6iq1ig3akaawmfkwc0bmdlcjgqbinrpkjg5k1v9d7820ntjc5dpv7cipnkldc0myl6g69dinigkx05zih66re9utas84arwsiej72cok2ihinlyu4vqj9peu1da1mxydfdo0q8v7u8dlouiv',
                parameterValue: 'zlldfjfdu81bbrhl0ecceone48b9nhts2gw1kfdeziqrfcqj03zthrck4nti3q0pomngvn9cwieg46befmzmyz1s2loss526s1z87trrajcnedcotl4yxr6bqgfuykt74dnpdijzzan8384b3aofzeua6xv2hzlpt11tots913y3jj8ewb5w83w1zigdd5oon85hyylkl5c11uwvxapjbq611xqiglrr0sgfqi5goux9imxahm52sa1qni0hwj0ftvrup1rdw5p1e2303bybhm6140r4fgszskg6cwjqygu1skxos6hwc4b8ygxp03nx41qkkaqkc70fjg031m2zhggijqmdq0zcxlajza2zzrfs1e6pgp4k82au5qsx9gm2fdec86iwvmx8x81eohcb2dmeraflmwn8dhigj3hk4zs9ui5vd3dv12n6qkjugw878ydjc82vd7tct9j9yki3r0ny1mxhofflyq7wds5a7zgfrw72jmj0hq9uc3xaeiyzvtxe1kn2tx9z94jdhrvdz5gmteoqprr2lh7n8skd3xpilm5n52u03nqs7tkkxxa2yqx2gaa7pk9t3douejllp12p8j063mcuxtbbz5f5dholnu8tcje41b13zmt1yj6wv9e1j7srb49oh9zqvfknvj2wq1xb6wzigqhu3jf5eev249gpr3d36u9fyszaea70dfwe387u7etusrxot5vgq2xvd6iguwsneq7sz5mqm3krlybbp9tcoicotocjzs9gffpf9nqkle6cfm6lltxoz5j7oookykdtnh8savi30krbx2gyp05rl7n96rmcfxyu0wdz4tv4yphwkg0dau8t8pl71dvzp3349b7e72odes0d9lzuj73bvxlfpzecvj5wg6zye7ai00bjhqzuq4zmy6m9sa3j9712h6qjokv9s530zy8spis0e8ltcvqu8ggkolqjtkvfy62htzltjioyidyb7s7vvmxoc5o7aulbq8yzjy0slw8bgofb86lwql69g',
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
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: '13t65f5shroa6tuqt8ifug6nlv74r7kl9fpb1pns8jz0mpa9ps',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'ckrpuheaq098xo8dgo6t',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: '2w88g0qomjxtzgkve0iv55pw0btpct6nmxfqn772lzkoa47ve3gq4kexzyps89hcx5a0ib8mzcak4f04l4x4cpdj3rkqt1fvyq2m9usmvhnul9frz36hltk11njlzpvatdap6aly4i6z465k9xhwgyd5tbrnu6y9',
                channelComponent: '95fbgf8tg2qnmq1thk0ewiweipjye4r3kh2cy1kt7lf34xf06723gc3l4onfsb2ci5mb02lxkqn2lem73a9zou70lxkg0r4tatdp3vfxt4b72otz0dibjdief6gtfei9spg1f2kwbt7fnxlckgyzdqban1gv3wes',
                channelName: 'vcx6wcf2a97vpjvvs4444oprz58ava4xpu5f49vfb5m010srkvhgcetk3nz571m4rw4lfu3lqir4y19zdjstz25603f74c5bskldhjhekw57j28oyptufxdv5icyyy2zta4a8vk52i0yidwj6iq5x4hmsg2iuc4h',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '3aim6r5lmc2nrmaxpndx6ppmu3jjttmdtoul7t9396tj3qsyeibx9gnzfsc803mt45mkfoqztdnsmk5ry930gaosptf838irpzxiplz1r6hxlncso7nnxibk809us1djyqhkdrxfm7sblyb6xltwk5zfjlfan0mr',
                flowComponent: 't82vufj7ktx479u0sa7h4dzolfgi3d3ci9rb4nyrsvtlsjo5gext590l0j6f48lmqo02h1rc88bgadiz26auj3fxxdtzm1f1psb58ufsob3adpga2d8aic1myezwdm6t8n7t7k6w2ty2e9774o9zxi7dkwj3fhzs',
                flowInterfaceName: '51z7bru6nyabuiz7z5zzixzgaxelem7xqy6p016lz907ddt3i8vd6etp5bzqnt64hvabwv9p5nvcfyq6bwnyng2unb1tfjlqxzg82pal78ljior1x3oaxmkv54qqhn8wpni86q9ywm11tpila16r7epwwchiqo83',
                flowInterfaceNamespace: 'vgnbc5w82gb6wnfub7oy7ntz0r4n4z24u9m1q8ycyp69nba5xxhd96w5aavwxk319e30fo456ccodgz5qhyl65dr7h96nae2glus1qoh7dkq89kk3uoj3zc7s1nnuwlrnifarcttd1jhoo41hnqqkkvwvpyiqpk2',
                version: '5aztv4my36stelk9l6tl',
                parameterGroup: 'n0e6f1gfaa7pnwkt7935mmdn7b6uysxv6dnwc2opll0qt5847bgwd0m2heityb4d0b3p810u9uosxuc50m078o7yvmc3djlzkyfjwfsozy8e58gelds08cdc2l7usxp3pfq34hg4d3v96bw1yl988qptosjbmn62ovytsllispxve7lme2yugsuzx8bly6p8xlpelhs2hgdbqzj26rxg0xg8b3x2cq602tn95xwiriev9t6v7spugakgds4auep',
                name: 'uelz835bl1c8k3lic4oqao3gu4dhpo8z2k4dja4egx9lxvmjrefluezvtvxxs2062zyf0yyum36tv8qhze129utcn190aj5q0k8yapqijvl1o0ku9c70afmuc4fb19lf6v7wwmeb9blz3g7lhsglninw043yrwn0gyfi0iios2b6hpmoy83aa5of5ha6xnzk7zbjk3usf7h624agci33omx9di7sj9o2utdob86hsvbt32z0yiuytetl5rmg75vc8lcs7mj7twf4jfqlnidp3yx0zfvoncjmm60e9cmetanu0u1rr0tquzsbw0m8j7bq',
                parameterName: 'qiwao6luhtdjk9ctg4e07h8wx8mfpaof3gl5a80z8avpf54zjhryknk7p8t0aiw8lqyla4irep1rc7pyb93o7rf6l0euse7r57j0tjs0dyjl9xzdxrfnz0egd0d9v6y3h1w6e8v3jjzmwckx5jeh513d85jbx62clp84yth9gza04r89zfk5h7sutbcw27d750wkhktjvduieo6sh3kqk2iiwg71bpi3g3oc6tu0zniub0hjic1foxd5n9rjoxfvk15gns4952mzg7fuo2ofjesr8cztzkxtpzc0x7ys5xmcmhrarwkwpwtus3kf9pfy',
                parameterValue: 'cb1ahxmnuidbjvbf5nv3v5i833ieup5n0eutpa0hz9928jx2k8m1s4dw91llbtbi6onfp4n76ght17blcayob5burg0hexz1gd555h1gpud57o8g2s5hjbcukimueka7hbhuq79he27ptniai2956cy9zaa1a3x9u9zzugs9s3oriiyoc5yhdpxlwoajno4224wfjzubdo6a4k0j40mg5mnv5tq5u7oim4h5t4fjwis9rzjz0fothf8hdrc25om7ibo457v6cnfixp0a3sj0heklfuqb4a7e0x36kml05fs299lunlqddm8cpnedflo561ezo84v96bf813f4nduf958urv00qqiiumrvrba85gmvc8bor8s2rt9kfxu59mra1zoeoxylli91pxno6snjc4i4m0az0c9bra29bmd4t9o8usmztufo6c4vebnuybnpc2c6a5sn6v01l2r93jjyvn3ygjbmhmj04lsm4qn1kq9ihojwivt6znfwanh1ehqxxkgv7rr9i06vljj6un8tb4vz553u3hx3ejwgklqmmw0f6mcnjhqxgshhqwqtbln1dvdh18vkwnpwhs9ezymmsfgxzd1m3fgt6y03vqnkcuke9cyu4k7owehr520q2enzhkpyoeieyaum34xid19q7v25iqkkg2g3050zgmspkpxy4we3psm08n9yias4elgclvmk4cspyfnp7quvxt5gsoup1hhzubd278hga0mgbxgnp1a4j4164ksv3lxlbrjlas1h9n5pp6xic6qlymt5g6fmqgj5w2yo9n0xbee8es50oq1llx0btq3gvfgeinlhe5a2s2vf8yqimefqz2ctzv9fne6ja0jnlx5ji9q0siprkhebo6x97o591jtfauwozm9s5wxsm8bolbzcj1o4918dg34pa64ajuahc4jp1xj5ejc485ucx6637gjz74i431c8wwhqmr8lgggqlx0rbyzoqoa02xw1tcskeavb62ifoaynzkeizquy82quekt',
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
                        value   : '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5'));
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
            .get('/bplus-it-sappi/module/9b46b3ef-10cd-4e63-81a0-dd0e41f916a5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5'));
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
                
                id: 'c8b0e4e7-4bdb-424e-9efe-81ef0d3d2350',
                tenantId: '29e1a413-2f05-4cce-8906-8e20884a2881',
                tenantCode: 'mdi2e62kg2sizp3v74yy1hplddsf42sy7c8opjhpo4fywmwokb',
                systemId: '4d62d263-d63b-4838-9974-22ebcbcf6d65',
                systemName: '93s3dfxxjg1h7salsplv',
                channelId: '024dae44-cb07-42a4-87ef-fc077613c3cf',
                channelParty: 'dzci76ela44xxz3dpffb0vjxbbjobjrjdir2c6flxi7unaiioazv3rfe10hsy8odlss2cpamal1rff12g7nl6911eo7ekuv1k3xtkl0s9ft5dz6mf142ci3bl7lsuzyx7em2vvo6inu21yu2nuc34jn2hwi01pup',
                channelComponent: '77zzn6bt3rpsoyqi0h3ud1x0omnav71gpugtlfvj2wjlkhvtrux88lvdvsaequ0cjxqkx6pp92srvi8f7iv8q6q6gn2si7u6ehysia2406tg3rgygbgmhzokfb6b3eg31mowm12fp1o2xtuc6qb407fmpy5cf76x',
                channelName: '3xxd6w9hrfan65ebe19yul5r30n831p8ichiy53vbi9k1yvencg9dqhccpuzcf0iyeogn9ihgcpehjw953j3scqnawk5onh9elkmj7thyyevkr4i7rjvf2azo93jlikww2exj5csqwcdeganvpzqr5agg4kqhzzw',
                flowId: 'e04294dc-ea51-48a8-960a-2d634e894317',
                flowParty: 'gsv0wqbrhi9ik4wkqn0z727052s92i8fe94c0t004o3pdl18poai58lmgn8zeg1kojwuo437whefnle33bd61yclhqmp5gsf9a28h8ohdae9882hv7b5fdsl9ron0gevwt851rv1a318drpt3qcndmvhk3mi2qkn',
                flowComponent: '7ouy4ywisxoguz9q35w4n9dnkc2r1dcocajv51sa915ygr8r0ac0fmkp0659yhh7v66antzvd1y7nmlv542x0ydyfpita6g4841ynh5xz8bx0fi8yzb6vm7xp30uf9tjskh3jov3c3ta7deh8vjn90pxov9bvm4t',
                flowInterfaceName: 'xla1k3lon1w832n5wolftmjnbdy4clu0t0rmc6zui32cm6u243cdv0ctqc2q6eq2zi4p2p36a7wjzyp3rezhz9sa3jnqxvu7enlkk1fwpzhzhfbu70g1ywf9ykdk7ux1o05q62dw2l2ujcukmhsfmledhsmnp3l4',
                flowInterfaceNamespace: 'kunuoprc8kh22a5t587u887dk4i446d7knypo0psgg8s8nsusqyiw91y1t4w5c1htfewc549g6ct44rylgie646326gf3qucyxvml64rye75qdxcwb5m6vzyxlcegdnit1zbptwruh3jrhcpz57en5bnqo7nidi7',
                version: 'jnzb234ahpznqvg1ac6p',
                parameterGroup: 'iougnp616fj5ea8nto8eeo29620y7347l2r66h3556526pdw7mstghyjhuvqgsjf8je5tjnh5jovi4cx58qdwj3sm4ti6ksvevcembockzno4aq02ec4kso2hfi2dmiekm7nevtfd8x5qvfqj9rj59g59pgb3x0ikptahou9n1e1n40div48h995vl8zt4oacc8zkqjmtcyry49dca16w30lzhslrjxp6ooqzg22l7pfberl20b2hka1e2lrwgq',
                name: 'ar8hpo6lyoem3gmqdhz9wq36id3ixxsxi5c4yxliss3de01xztxkuvigp58hozjvoa335si9qfjje3sfcaii093uj1sao6pw93cqfrfm5n2lkwnwghkxedmyu1q0tyyceji4bj6xaifgrct0fnrsp1irmm0gfrigkzhdupba2win44ws31g30x4umc07oikpgq4fhmvln4m545hr25qa408qnrccd94miw25l2kurbif79kuuksgci9lpnrx1w3tm7uoev6p85eo9p3p1vu60oj61xvgrfmgmwqnzpatlxjo5mkqg0rl9yhh61sk6bvn',
                parameterName: 'e5xux01p40yagt01jlj5kd51mfoeo4z3igd6tk6xyrsi7pqayfwrp7qac6smu4r4oe21l5b996gaf9s0h38fr755p1aj61jlrmg5kk6vj9op9muir3ocv4r1f8niomck4rfw9osmp832vpealy37zqvvppmmdmtru5xm41nkwtx5krl1357nnrihohnzsufth2xncjawfb350ysvik7eiv39nfg3k1ddd6r5yxynmpb8sgqcufxavjobkhijb2eu9wp9bhmrdxb92ywzzq0pc5kg1kqxkf9o05qxjq52snp83nqdi2uvhykt8zu1ubpd',
                parameterValue: 'hciduhaw8zng1fspqy4niuleqqgx49gb1i8n0mxpxpcfbfvqcrzcihfoo2kkkt241l8vtln86uxff666td8qwrsko6rdwumk7y5t3l39dtprwpcn59wabc0gojew65o1j5i6svia3wgl9xzebkycw5boh02f1b7abco5f4afc5wzkar90glrumt2yxjphcdyrt8gd787r595kjqls09o29oosm6pavcuwbvo4wsxn6sxrxer5xymzwz5b8v5uwvyqfxivssc7w7c31gi4zqj9i8wf9cxzv3o0n5k0xbfd42kyqqs7550gev1278x7l062nk8rjpft0a8o1ddrqo0cx60xf7licaif8n65498idxhl4b9d38hatmwv6p9qi7qyg2n7sln50jwt72vk7m75lrwdycxgxfqw1qryv5aaryxb7mnjil03qjfy4tebvh4ufsac7197l30wdr8pxdsev1d4sl8s2o7xmqx66w0v5ohsxvjkx60qvju6qn5kyub76fdv6fj51wamsc8lkukwsydb185r88qek9bswp33qplrx87q2chjcq464wu6yofbt6lvm87y37fp5ajlv17cgprvvtz4sha2gbb3l32mxvx8jtpksbh8kneg0o5e3asenpvm59y01dwhxdq32k3ct4vb0ecwwuxi4v2pyh2smkjn0g18tf8h45tdhzjpp47nd1jui0sh0xb3fsy4ff5yxz91utrwljl30srq2tj3jo9wuvkt1h4zir19fjmgomrw8fx5wum5ukq1jithdgftb6qwzxdoyv560ux320b9b7nxzsujqr5gqm9cptitilacw6mhraksbx0fh8pnnrnoumf7b89iszhgeqkuh77j2kpdmkeahkoi8g5i2436u5x1ivlg7t5vlnalphexgaikabe9atdn7wagrg3g8p8zjz4n7up32747gwklgeqk955eliuw2ky6zbjnglsepaztlgirm8t49l77fn80uegclpprlo0oqhxwss0q4odfds4',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                tenantCode: 'dmiedivurm4q7o2jzx34gan3djbeqk90lnu19bynrr1m752ot7',
                systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                systemName: 'j3jocjyz94zve3n6n5i5',
                channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                channelParty: 'tgfuiltqsyu78qyh0tj95m5ntnfvrojgr47lmat0f322da0p9qvh3mpqwrjcl21xyhrgwbsnjjw3zddsyep77x1jjih102cx4v5z44w1vm9ak8bmtb6f1advvbzlnkr84nprwwofbagl003ubojfblcnuva0nvs7',
                channelComponent: 'wzba6ws0qsf37esel8jxyu7zaj3pzigfri1gkcgg8t9ni79phzdou7fymkbzmqbzvkw9p32y4hmmqepfbc411gw1ago6hlup9spf4igcz3g488yt3s2dyn8rj60izsi9sr1451ej1ud5dc8j4nccpyarw7zza0wd',
                channelName: 'palh1mjr1rhdyz5q0ecbmi9mxx5c6v5unfl7ilc01r45vjmd7e7bll1p1ti7i15pktlxullwbj3uup9femt06tbzimti0k3c0xelyll7okbynvkovqgnj95zyr73zjsdifjk2xnfq4wrmzv0y7ok2om1kdgrqqy7',
                flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                flowParty: '7poa4vof5s73pb6fkowuq4gmt7dik64rt4lxs2ds1oc0prpzc5sprj2mc42puglngncxrgv74m5jljaqxclhallkpd4q4nr7rls10j45ehqlgn46k4ts9yv277yda249kts3uptecfb5ysd687cjyiswiazs6r5p',
                flowComponent: 'ag4u1os97tzm2pg12mxy2q5zcd39p9z7j602285sakc1zqt8ade6exir5s4o8sbyqah94vu0ib7v7oxrmowi9hwrxhsmowv2c36geqmxubtetuq1ne9v6nb4k8l7a931mjts86vr3x4o63z7giy1u3vdkoybdyz4',
                flowInterfaceName: '5s1krqlzdp3kyc6zxn75cxaf6q2xwm46lah7gleziknfuqszpkdgy45bozdzyzjpvrrzfqxbo7zavlz848kvqo4qqyb6lmlqqxz5yvfp5e7y13zmm9kaemb8baibkthi4rxgqwlmkncx4t2ikwt4tosvhbl8ey9g',
                flowInterfaceNamespace: 'bk35sijoxweu5olecrtkix8o0d9n051zmjxlml47demq465642jc01maxoox1s0a3vow4ri2wctnxgddzub1jx5x9skguufud6che1elihtvw1b9h1fmk7artw1mb73ytnvbtpqo237pot2iu3dl4joelz9fpid5',
                version: 'iru4ul5x0sq8q3hglf11',
                parameterGroup: 'p30wp2g4f9c8r4velncayykucw0erp84bv0323hp80ip5jk23481290d0228enub08gfv2aw8s7188twx41ddn16z16np4nv1wvateifh7m4sjybli3s46yx47icgaq61d44c9d15zyyvxr91lgv44tw0vt20s13rdp9odxehbc20qzb01x8e2ty0g25emxo8s4vl5hkqb6o5bscv3djqh7bxbf3dpwh8lke05fpbw0ge0effttpn2ng98fc1nh',
                name: 'b3usy9gfcxcrldhpeik1zfxgexi3d82btj25oprn2wvq239bnfo36f30bceaaqq1fp7fcnkiaafvcq6ek60ac5j8adgjbwr5glwhbhnmxr9ycrwztglfya4mt00qa4xad3jbw45tam5mp9pz1blesev0q0hd3yogpm6e5ao1e4bd161urptsxtxttvf1smqnk00f6fxh3nroyhsctlxvm77g9n7gzrmh5wev04cpey8ifso64wetoeetph9afq32med6no7kp3gc4crngettrbx3b5cav2hl4ezxri97hsy1pk847ra40vpgz09gprgj',
                parameterName: 'gi0j8mzjocofz46al8jfqnzno23pl6k3za04bt45p0g9qda7cip0n01urmi8qy3ss49wti9ldooxg7c5ewph502i6fqmn8a4zncpf2uwr2r66jea3frizynugsthtohg7o5fgecjz0aw1dveyy38tcepp4r2vhj45qzn3yud35to9z4ypk37dv0df0gaeqype1dpl5qa76wqihr9j3rb7kwhrttnm7vxwolyw7u669i6d05nagb1poplnptuizs158kljc6le50azgl7ax76kqxmsnwhglo85odkendm0nikicdoe3ij8v7sthr1nkj3',
                parameterValue: 'hlz7vuf0xn7fx667nifwu38rd8wd2w2cz4v4oca9bqskkbn4ruzu2e7412dxc7i3jtpri2fjx6uc0nsospufcmoizezgpysucit4sn4v5hoytqk7pzx6f5okhsclezpg7qgw19ra3vgbv6umfrk83dj9e0l2oi2ljap4847a73dcm98ykffmac4l8ezm8iorqkd2bg104wfqs2wd7djrta46h68bxux9t5d4y0xyrjp6wk8il5h3lui5371jxx60rv329k6uf1bij9n0j2i88sivtchz1lnip1f0a36ja88nmc8e1hh63nj2mja0ur2rkhwhahbftsrwx2oxpnc37t2xvqs7qu0ny774clzgpnad0a9dhovrpb218y9wezghvncpva676rc3cedntmbvwxnqn6qqik2bst9upj3s7q7m7xjhsuqrvj83lgxz0pyw6ie9tjf4ipa5gvju3oxoy4y5m97m8fdtt1g2zr3eqe43x0lta7gepbucx39omfp48n8xltg131ejt9y3zsyt81mtkdvcqbksc2286t6d0sye1hdnq8qde0urb04ak23uj1l4miknc1tauw8ea41p8t9dcnl87oddaje5b6wfughiz35agay28p3dec9nrz0cprg98vow4hs0j5gy5vnbuuqava5srf82yr9jx93q5vto0rw58cmm7xctxuhchfctb0gat37o6ntrpsyfbn0f1te9e27kkea8ykrmo3xitd6rtft2jswlxbfrjp6ezbh6qg37g8eowveulp1r3mhs77jbmht39xe05ecvnyi9upp12pdvb4szyvk6256av8wj0pzdyspsc06w2nys2qg00ddk7wvujmpbraibissobc5knzr0mdyquprggspm1x2ckiqfzr6apprgj4qz7lwe2a1oyrgntwrpiu614sctmp5lj5epbz5tda0b7hhmm21dokxtzv1kpsmfd4rsvidad3dtkaq5akt4iwb25c86uapysvpix3bk98xf7fr3r1nm',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5'));
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
            .delete('/bplus-it-sappi/module/9b46b3ef-10cd-4e63-81a0-dd0e41f916a5')
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        id: 'c5d71b9c-3429-4744-b3cc-9a4fd9836c63',
                        tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                        tenantCode: 't8u1kx8t7x65nim20jmocdpgcgokruy53imqxdtgbmpmvj1vc6',
                        systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                        systemName: '17f7ect8yrdx5ibsjk2r',
                        channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                        channelParty: 'tetv3h78vn17bylg4zjbfy11iev2p8wdpgmbzf310vbbnjjy28vwgzzfw4ni80gd9yw8eyz848sylxh389to12vtf75ihb62ohbw56mrttuan1z2u7w8mejrlu4xvv3d0myz1bfth2s23mvgwn7hl7h1zydpyjp9',
                        channelComponent: 'we9ngqoilxti3w31t8vnwuj7gftetpxuy2w4s40qc4lwu5r17vw5fochf1abnp7zqt4txr1xawho0lesn2w8od33xoaa5v2o0op8v74oe30tk1dmlhtc9dde1hvkn1oq02en9oe175bphukqj5usnmbjq11xtj6i',
                        channelName: 'omqjd6wjr5qz55wxqzx4rxi2pyh94hlju71j11eo36a7txgtutmurk9q3kvmwb7b8729df715p6eiu11o9hbqviokajmv6tn9iud5fkoe13e3e7q7azrx9btmyzpsnjcdot7gzd4z43s4r5hcrpebqkitdye312v',
                        flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                        flowParty: 'rgox9q8tjv4sbjv885dne0m8gfgllc2xhhbb2fbejlaokchicgqbu7rn2iysm3fzxtzsps53ca38zm1kn1z34b6ub7bbr3nzy4x97z2r1ctf5fxcxnk8n2tekvkne1xqzq8h1x5y0t7jayzjtq871zqe7qa1mo94',
                        flowComponent: 'zmh0i4lq3t5c31s8er14wc4h07hsmkn9oefy4jqrybq46rif6e3hkgx1otuiwt19snyji6wt78zlqjshhodgchy97tg2numht6tywnor0bo3tncl8ak09g07xltpkyjpwsxjr2sp1ujlz0c1x0qgpu43y9aw7l4c',
                        flowInterfaceName: 'uww4x2burwu2ptyqzz8l3oaz4c8l1a1jso6ebnbozm9k4jl0gdoexsg9kiwucflcjnqlvoc97ux2ziu98jis3aa4bt6bk5kicibnah638cto31dbqmni8dweko4xsm4upp7o96o6c71uzrf4fv1zykvdtoxvuhzv',
                        flowInterfaceNamespace: 'ez78re0h8mexn8t0nwe1uzza6cufiih0uzga5ciwu252j8cmevxnvigxtefzyy0w4gmgrbmvwux662h40nokqiyawvn66z3wl8iyl7pleqbs7wkpzr70i483pyneclcl97rz98xxqom6grrq9e58wvonc1bz7ixm',
                        version: 'e3aqrhnbmayjufhjw6z9',
                        parameterGroup: 'i35aabio24ax52ch1lgc5o7ehfnmjhszyrrofz20558o9egkfffxppkle0veohfzx5pxczuv6reb27amt1yscvkgn7whbufbzsh8e9yd0h6ymr7gfoibi5t7owsqo8q8k6ofaoa5zk77j81xhe884knk7vgvqtc5wucmur87nbqiuz4q3qkrqkh6dqyqpo981v1y4flj8wzu1li6qc22kg2iq2hw9mpa8mtgriv28kmtxwia3mfl1upndsi1w3b',
                        name: '4uge4hr7r7ev14fv2y6wvvf3hqa0pbloj1jj6jmj6vgs495v5gdhrs45wtgmpuu1udg14b0u7mfu5fjx1u7endvwxjpet9qoi4qepsphg0imxslanwju8rgj1p7mgbzgydpoktosdr11dbio7zllpyqam75eb38sywldm3x01568taz0joe871ywmm8i43maerhncjv1e9tczqrwi26cax35bb22z07yd8gp7elk8ljht45w2m98002w165263vxoy8c9dfsbozvlroy2nd4b63wjrjfg4ljd6irm2kdc92obbb3c0ca39os2bqq1s29',
                        parameterName: 'kdkjzou9vmqeaxed8wyfrhxm9e5eco3dqt9byg857mn7wjoovq5a03bioet6bm0lpgduh1jx0kc4ww04d5xftsdge2fubxn18xob4s7rkuvv71bkam2u4y0v40s2xa1spr4rwrlktmtxeptvaphxlb07uxhd9oitk91e3j8r28tcrekttjyqx4po3oqalksprmpyq46v0fh9rrrl159fere1v0jpi3wo759gmojmggw6row12iwbupom3v2exuipw64iey50qb4ynk17uw3rnop1ezxianr3jyfo1a2xmkvn2pf74mm6uopxbc77u1oo',
                        parameterValue: 'wmx8ghtidud8e2blrkx3l1vg07d7dnvpma51v2z63xg7lb32o7kwul7h2ygdpkbgan481e0s2i8133k6vfnnd9qvppamrf2rf1h04gkwsti3jiiwxpbw6pzw7wvnj9y9z2z9x22cqxht0snnqe8pkyijwmkfqj4bfa0htuhboigvbghzijftb7fz413p0gy3dfh5ayg4z9r2xlgahab9a4z4o75ptn1kytm61bapz83ugljvu83ke8mwvb4k475g1rfvomddcwgxpni8tg7j0t6jh9ztknd8uq0el8ttfn218h46guojujt9z2eomojndk023ytudrliuksi0zktibu5wg0m29c7tha973qkdzvhtcwrlne6u9l0nwk5cqxxs7571omedyr63d0ral40249fdzttx1pkk2mezwnqmo91xo8uitc5kchfv4e2wh0z2kmcrna4l8abezxtegd7hxzw1l40gzc8ne14iejymwu37ocld919kr9cywfjw0ilng0khybse77iiw4wv80w08nsnoisr0l3v2gw5vjhijpccn6iq8kp270x0uo95xrnk4jbyjfr41l0j78zqhgtzillcrmnx85cxnx29nhe4n7h5tvy84b0rmukqbr99tgcf0drscct13s6ud9fi90tbqoohr7sb9e85072cq0bbznal72v3drmjkuwjyhzt8lu6pieun3702iuduzq9brnpds6dpbyxy61zdza16lyctftmd8ugjmqs4d2afss4jlogqt8vsunboq4zxf5kzus57t7xqjsgkzichzsmx880ytuct12ryfp3raevrtkvw5eyakklpx6xhnbkgp37zaqu0rkm1e5qz4t8em9v44wo8kgreaoa274mve0tszvk8a4cidjqwcv6i9u4aa8nv5s6bpw6pogoj8nafjnbk3ksk7of4mi36z0w7xbfzx1mku9pe7n3kpogrh1wzddlqh8n1cplts4mluq0iia92qyf60feixigvs6goagua0nn9vx',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', 'c5d71b9c-3429-4744-b3cc-9a4fd9836c63');
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            value   : '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('9b46b3ef-10cd-4e63-81a0-dd0e41f916a5');
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('9b46b3ef-10cd-4e63-81a0-dd0e41f916a5');
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        
                        id: '12731fbd-7de4-4d56-be18-e5d195cab6d4',
                        tenantId: '54c94e66-4ecf-4303-b1bb-240a442146fd',
                        tenantCode: '0jv7ffgpoeaid50vyw7zc1783vgdtix5cs4v2ts68rninn1pxk',
                        systemId: 'd7859e29-da90-41e0-9ea2-9052bbac971f',
                        systemName: '486eo61mxdfqoos2uyyk',
                        channelId: 'eb8d24d5-a39d-4ac5-9d25-78d8944de5cb',
                        channelParty: 'b0g0ehidxxw8a59mum6ns4tygz50n7vf041ix7aqcsr33ejjb6oxr5r0l17woc2qjqvg9cr5gayb4kor4nbwx94ygd5hh2g7t8g2yowk0rm5b92iuvf57j3idyls9tis32i2zuhqz1etm44sah6aps69sqpybtzj',
                        channelComponent: 'o26oh8cqeoyqw2jtflnq8l5wwp22v1o1sxooqsffrt2cnlwiyo7bh1x4bivszzl5s0dimlnte068odjt1eytm08aamu7478e5yx27fy36u05kqbgfb7sxvk7rynk63jhkj8etntmifvkbdyv2ocmo0snzswqqsfm',
                        channelName: 'thdos0jw64xhm8xb77bmr0kdsrnrdp3b6rja9a2b60fyglin9q2f1k8unu8igwibb8i3ku8a4i12g9u560eerfe2bc8ztp35aqlxvu1d3wlzdx1c4ktrfb1rboqv0b83x6h5i7tksxr04ydqgll6520h37fycbna',
                        flowId: '5d775c07-085c-40b7-a79b-d3c6b2b1c17d',
                        flowParty: 'g9u6fc2e2ycjtdn2by0hdkicxu356wacmgh6vq4ycg1zoqulfb2fg3r126lm8vx8x13d9ecx5ynupia2btzp3z89u99dopr4p53ltqef18ys2t83y9mis51q0aufem23x0tjncbwm4qhbj641bcgxxno04rzjp72',
                        flowComponent: '78uujq1o6q3e17m75vh3g3ob89uq6cd8p4v8hfi7h554wfnjci9hmh5468e9hmwukoh40hfb57qujeoprwwd2b8rlnea4cxdaunfs3jbkgzlxvsd6lk6i24ron7sh8yu68i5f3tirv9pcqh5jfgvy6h59itxga26',
                        flowInterfaceName: 's3ragsev6e3gqvgjbke2vb935vs78db5xeatzne94bs134wdanahdht5srxe3a7w5ti4j1eszv2nd2cv9qsp56orr9jbsv09mtkh33a9or4sjhyh8d5pb00num4fazdhgo229ihee2f100oj4rq5ppu3zysa3h3e',
                        flowInterfaceNamespace: 'ttaoqu1o7i7cckelblk8olu4iscx2pybdbpaev85uyk2jwb1gp3jtu2glmjxu9ytpqq0b3v4xfo8n9ttr2dteb7qj11fbrj63apaq2ngztr8dfxvgy4qi84lmabbvmltghw9u1yrhoagjf2q0mu6graoy6mf9ji6',
                        version: 'dkbe8frmqd91b8wr1vy5',
                        parameterGroup: 'vp58fy8hbx2t6v09v92xeir52oyw41kmkncjzk1uv3s1sakcq7wjuskbkjmb9ery3ircxuhbmnklys436o749b601124oc53ee2ev7ov910s67bb0wa2ydje7nceg7tsi6ei909ttwnklh2u5dh7a7hqlg44fz6l7pz7if50y1eqbslwememjf6um1sydfxjyfbwu918kywlrtkqrvr91vavldba38e9vp6hnx97csws8dy8nfeztgaolucegmr',
                        name: '01uad0qox9hg5p0b3bxb0w8xe696qyefzst4308ww4pv10sffn0kk8urbnilc015i0t9ctm6i6ehxyzrrim49vm9tor3wa92w4sigsq4unxd7mifnmq3g6yns0brumcepsyss5dzf6utxx4hz2g40u98s43vnrwm6n5sviazrzyhfn6xavr2riqqjd2jxi4ambdqscz5h4e39ve14m7vslxizx6815pgwzzlr3ngp2biwhj6fewdnanvjrkakpowbc83k1a93pgjs1pxnjk629e9fnzpwqhdpltbw71r72y0b3wg5kpbmcrcoqsfamj2',
                        parameterName: '71432lf3ol0yf1ad0v5xb345kzmr0vl9huxi7zpy73vf1j5lpdxk0xrxqz0nmhe4im2xb8q10ppu0sh57lwglw0gjqan9r7m0pea8l7l65f9vp943roh0z98q8d1hmvagdp1zoey1p0ccrwj3djlptrt1gc70lpjdnym66k1d1nl7bk7ttzbcbwy4qkqfkft3qxabl8c9l8q83a7qodviu102sqtwpa6x1kkysz5m63os725ud1jrxwjtc61oh4sktrcv5e0fx7t0g9es8983dw31t4lafxlgjtn04z7o8lq4q37tlbr44ikpj17v48t',
                        parameterValue: 'jb57quyqjqi418c5y1681qz5rokmwfunjf4iuctmlfz8yvrwmbb4n7dq9vea24okwo3sthanumovfcl2n27wzcnvhy7ogp1v9pzpskg9dcfzr4vbfjpw2xgtjzqayvs67qovtxto3cz7qnn6pqx7kg2rflw4i2tx65p9mdswnbq97waz5fik0eguqwgqwnictbvgtyabwq43y1s097gvg6ahitqqmaalvofum82lgdgw9k40cl3vbd8ysxuaja2as3abou6h4yncifzn2mb1fvf0uk9xqwuo2105du21hwsp9uzuwwb0vu6qb91vcju01mz2g6d6yyjl5xla8tk8kbk60js9ddf2cnstqn8uyv9rmd5vowcr81redtaltwed35kx75v3r0dnrgw62nlezhxkri57jcgzky5nxfrqifmh5sqm4tzaj14juf86lc3d0hg7nlnglw06cv1pkusj7n8mpcl98kdj21wk3ovj7oti4g6es08t7cbqxu4q6mhlxy9svd7sacaqde1ppsmu9bnnjvptw3aur97awb175u6rg0clz4zjf05so1qdnoqgef2lgi7bv1rcl73z8ew9kp1hfkm68k2hld5q65ofjatqvjiqiprm7acbw60pzzzr2ln69d9x2e07rrifulmrhg081ymozol2hodd0cbrx88x69uvgkig6ml1kim79g0ukxeze6i89oa51800nl3i0jqiypmk9in2gfunqx3ck9d700nv0ptkkld4myvahzwaqvk9a6n9pvyvhe2t50abe8p620mn42gs02h95cv3xhkid1xam16hzpec63wn2kp4uuu1smehg7qm1ve7hgv9iwp07pfir44uhtkb6euamdo6ocax8bvxz8ittfbgv1wokvyoxpf24xzel77to399yujgpmvk0u7po0dlopgc9bsdkrzg5ab9z666kbi7a0ow5dl6a862uglxynv4ub1qf510r0dsa4ico8oykul2ziib6ekc9u31pcxc2r33vl3z',
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        
                        id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5',
                        tenantId: '9060068f-f191-43d7-a82f-9f4383d45192',
                        tenantCode: 'k8mimbcjkvkehajd9214iqfqv6s4669hwdlnxl6dfcb8if7uvn',
                        systemId: '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628',
                        systemName: 'u8jysu98u84hea1og37t',
                        channelId: '2ebd8c85-6286-451d-9c45-cce811930df1',
                        channelParty: 'bq3k2spt2kmvr8cigfg7vhqv9u63xpj3jai2jegtd1cc395lvrn77mkyuyqjntjnx65iii05uausgwqh7gvoxty3who8ibl3cqtvcb7ys3a0h3zv0ctnotlgrbmtlksqbuw6mvhq22v1j4oyxuofugcyaecz1f3y',
                        channelComponent: 'dmgci28p5mfo4buzeone5paumgotnwlqi91tx5npll8c1voyzlpfeeedvs73k1ia941v4lvhtn3fo3l8qpmuyjh7hkpcxeqejqf48cgx8y5sh457wp8ajwsgdz6p8uarzkk6hy5ma3lhf0t1bcgnocc0miws86jg',
                        channelName: '6petyyhqww1jta0nxs72t1xf3zzc9i5wsvzj6z6cvbk82ha89weojg0k4c3o97i9j7hmi15ncuu60g4sstuxw4ndv5lakxe3wkhu8849hwxd4dukkkn3c9wa1dtjkokqrv1g3desdf3f3dzgex7k5okv11zf7vc7',
                        flowId: '75ed4c35-bd6b-4793-a9a2-8c77de318c6f',
                        flowParty: '7vrwgy193d7k0e8wm1wlhgu5es0at9xn9583fe6yn26ajetafcut7n5sonqnzrfi3k5xwgy1muuu90qsu6v20yzry5ga2xaxj7syu8no8g8rayk3dybna1b37ifo4py2uz2g8ne4mnjlytqd2doel904nxd7gtzh',
                        flowComponent: 'u22wcop71hi2zxdfmrysc8muxipu9kr1ja8ot9nwwwihjpfh9injw6bc6iwzj93pafkuncple4cj45oyngtlkaewlm6zfzcn9irt6d1dbv5gl6rdndv8ixhwxkxu6ljq6un20c5ccbxl9xn7rd7rbwodl852dbva',
                        flowInterfaceName: '8hhm7gpigamn89p1lbnmzx3909m2rfvlhxnu1pemub49pryqrraq6sgq08goz2n3uvw9lr0sz4jlspmgi3ucnpub7tm6p0divvgn8ubjkfo5qx37i92tv4hynp4pvlm6n0nma2zmzndlutmz2ltbtu5bgsyj8bwh',
                        flowInterfaceNamespace: 'pzwbld1hxyvwj95sxv30pl87n751khni7vi60yonl2r9z8wiyq9bh4s2ymo65j1x1v1kp1kft218kdx20gmwpbtzv43cztl980ix2mpl9o08n5dv4lhcea64cv6spk6f7s86jkynsdw8xt0lstialmrmvf5xldtf',
                        version: 'ba9f06itnrssj81wppj0',
                        parameterGroup: 'ke3pziyiyjmolz7omsa4aotmqmkpgs2jdoluqimn9tphhro3fmxybmnnio8pd3y4ldbqbws1kwb8s84vvebwh15sdf32zj9yrb4uct2w0f7nh3l1h83s76yrdaedygjmgxtamgperf0arcgbn8vv0aw6ryx6upgky3b2hpto9pqhn4lknamlj47xfbkths8ftj84qjp9l75v17jfipgjeleq99rqztj15ezpbg8f3l50j7otzfx6i24h5du3pnb',
                        name: 'xdabauu486s8yvfa0y9rvj5kv3733deq95sdjy7c7kfzk1co4q26gbdc1okd8q32mni1gp8uwiikjfbminwnysy70hrgncbjimux5glsllumdprm7swgwaivnduebff4fs1e2fnjgbtmy7bcw0podtaqsvlqtiv3y2ul00utl82auunvzamxt0ifjp2iftbnooawjvg8gro200aje193qpelalm3pbbqjctk3ae423w5dxaubsxthfhakems1kg6zs2oys8gvsnoci7660cz19iyv1bral6tmbyvkhvyvy1n92o4gfp3kx8pwvxrqgf4',
                        parameterName: '8kyutxkms0dq8lxr1yms9zhkblz3rla41oxz7rfep5e9u44npaiukkz3bj44k06bf9a0t00uxrm52g5wlr4k1kcz4gxs2ut0jtyidvy0shes18beprhe8u816g7pkvfdgs1biajkc40j1on9f5n88g6simvg1oj6llz8ddivl0ry4xyoevuj4unyrdeuuswl8w6ea2xk39a8risvebzizrvy23bpqmdjcllxnf2h63yrb884ba4id0qxzriechixhyt3jsfgig2u0ai1tx2di4j23d6duji8z5p5xxs2p0ol3u8qdjyj0blfpkbjlqbo',
                        parameterValue: 'ethkxefa13f8hm30lt9h8kx1lvf9dtobs22qol8bgd4h1q4naxvcxkwz7txttjj8i8nsnq5dejy0grc04yr4q8mjw8b8czdigc31kdywqn9rrujcrxoane62k2dm2okojd8tt47snbo4tfag1wcrool096g4mmg7ls3rxwsu720ucair3sg1kfe0ceciib8e3il7ovnab4cnn57oi7pg9oswlm3h3a2pdn2xrv7kct33m66vthc60bjo67wgep8gjibm8yptw3p2511uejckl1sptyha4l6uxrjdh389fdnzry75pq2hxggmjekmnrdzq0spn9x8u0eni6y12w3w2mi2zm8b3pyhoudevjjwej3vy5tke6pcch1h6l5oj1rjd7s9oxxzqbfr2fvw1rkazkupxbr4jpaxoia7tfg6dqke1mrqukx4u103xqmg3yxu6p1zsg80sfja47vfvxu4ks5wpqccpz0zq5z03wh9i11kyelog9zl8e0smxid9s9sy9wr4xymhjjo84gt9x74zt0j2df4jllbdoz4f1a23lciqituymkhdrgwn8n75ubydc1gy1tac8xwjmthgdfmbtucpguhgjsccxbv0p1cp92mzvng56i8c2q6bg51ojjlvj5j0xnm4vutjaezkdi0swerr236jjpotz03q5wm04lr817md8qckot74xuu75qc7zl1tdpn0wttuahos5d2hk2mo6we8x7gwtf49epk72g24xd05uqhjtf8n0qsyodhgx5wuwoqumkcuycigib5254mbjww9r80bcyf29cy1vki8m71cxkewpa3nbx3ipx81cjgyb7il4bmh8fsv817c7fx41r9jywfhc6s6gl2ulv23x722d5fi0py6c35jybjeaycschu6pg0y4lcxk742gydyryfwjp76d60pt1lu8z3i7qpclyafuoe1c0es61xd0nusfrek9ladqe52q2cia574ji3rkvcrgjrxkmfxmijrh0mbbjfhfkc7vbvknbb',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('9b46b3ef-10cd-4e63-81a0-dd0e41f916a5');
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('9b46b3ef-10cd-4e63-81a0-dd0e41f916a5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});