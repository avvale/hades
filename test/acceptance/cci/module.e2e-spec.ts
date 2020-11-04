import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/cci/module/domain/module.repository';
import { MockModuleRepository } from '@hades/cci/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'qyba702gugiqvgrxuqkvlek5sxgsbiy50nbp2w5ydx5r0xxxmf',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: '56d59fy352r2gbldg0zr',
                channelHash: '1jibbn7qlo719upbwfc4d29w0r5x65krvt2k7g7f',
                channelParty: 'aj7ia15046nzp59jhdmpllulli1wmjprr5m9f5uvtrzsr3c910m0xdoze747nkgurjg9p89n351vu2lvoi9qzwsc81stii8x46pdvnm9ujoyeavfhqhjyb20idffa6sm8daqiqprbz9d11b83knhg2woen0yu0oo',
                channelComponent: '9ruosympjqtn1pnynbnoc008evlmdv1no1149acy2gqbs9j4l2rvebq05pxx2fyxddh24nuu05mpcm3az98keg33tubq7nr7anv92btgcc3x9h3gy2k5euuvby2a9g5uxmhlpnd5bbd1w7qt566hskfyosz62ztk',
                channelName: 'vpfnon25btb3fabwbs7byvyassy075us92zfaezqvru2gkqhv9uss8j7xcyq0tr5moihqdz1ap965ba2iaefvawwvon78khgdlxlkwogs6ciawot79s8cf813i0pgfry4bpvydbd7kjn7lk1tpi4yg2oywr3kbr5',
                flowHash: 'w49ffpsuxq3fpx95pksav0ltmkncwien283hs25p',
                flowParty: '20n501aotz2vpymlpdgkyz1k9nbgykzc8khf8y07kv1sl2yxb0vy1w8nhnl636dr2345o6kzwzga0wr0i8vvtr78r1sy1ax2ytfyshs5qf0giyezjutr702ucwytsmmitgvtzu3f8z2pu0x7idvbc9j5qssl7iqx',
                flowReceiverParty: '1ps9ebxeec10v2mj74noiji6cjpysny5cmml1jzl3imkf11l3kr50rvurn6qp9cdftpmx0blucynef81kxqi53wlq93s7ii7txnolll322eeymd1o7itvlc3kmrfkaxx7r96zbtd1wup7c322pv4qnrebezyc6fs',
                flowComponent: '2jhnl4cs1a1rseygculg49b0h20gtba0wczmgjnf6f9jz1bnfep49owxmefa5jkpppzudc3l0ebi63iknlel3b3l4lf4y2mcn0izfhaapwltwcvqcmgyt6mttids7o0kfhxzmk7ert105bxjgieow8idmjzsreqe',
                flowReceiverComponent: 'onp9pgdujjjvp2nt4zcd4um1zkxlj7mmnm94hquhznco59cfz7340nda60mbqumjzbpuuai5e7hj5gywz61rnehaapn692fjmzcjahpdm2d2yodatyh82q389rpx0v9reqjhjful4ys5ovvgvk4hdemhb8burywz',
                flowInterfaceName: 'n9u8v9ixd3tio8c7un80rutakfvzd62ph89cr9sxz6e74ywaz7v9c85u3yhbc92sderb4ebh5bwuek5z24tdbkuga9qm6u6rxzd4zteetj0peivqjazrc4scuudqdz1ihw1q2nbjrgq5nt769qanb9sbs408udz4',
                flowInterfaceNamespace: 'h17c71ln42lrzlmc1ldwntegc0nmns75980gtbchibtwlzkqg45ozmqy2nzeg1jpgj9w9ohhbg8x2zejgivj3e4z44u9b91j9bdfkbcrnbjjm4buc4h4lqw70te52gobtjdpsxvgx13mv7v2tovfssshi3l4z5f4',
                version: 'm2r17rg4uwug5hk7vtx2',
                parameterGroup: 'yfwvycndrqvd0d0br0udl2x2x55jjr74dvsosm52dhhmr8o2j3g6umk10nmtatis5yd0eul6jed4ceworbctohf62qewsyd0h23fuyps1em8uxgk9594b6oub3s0tx4rsbzfqtyjibobe7bqfg3copb0c5juou9aqv671k7zb7tpj1w1bs8o8pcq86azcf995jv8zn411m2ub21zxmwrpbdnueqwj8kfhtes5jh946bj9xcmonims2p990vp60e',
                name: '3zhi01i1a4x8hkcxmnzshijmssszczlk34prsx5qccmyjg8p037toxn3m2ytl3jc1yucj436vcz9tkioqasq8evc9ydp3efnumadcmvlu2vzc71wuaqcm7bir1nmh0g31imzhr8rasyg6gifzks8o54dp5zi6zbnym7cwwdk9g0qxxn2rf1bbtd40t0uios2qvk9yboruurl7fd73pds8rbhckhbhn7do9n8umxqdizgfjvobbvz9s9ma4a62uhm6ra70jbfhvy7zzam61vz95lxss6c3hb9zg5zj0x051lbdqw5gmcxpnsagoexbb3z',
                parameterName: 'jb6153rcurl08yqm429rcy44dgt1kssam4zg6wrjup58x7mhxajghznbwt3mlisbuw5t023sdz9njvya83x1p3lbs59vurjdzpts8a39b58puh0phll9fhxaubeyyrcc6tefjhpqyd90t0up66m8i86jh709deoatl2jtm4kwvzpc1xoozp5saqa61m6bqvzf8qdfl9cu97c5bdm48niwmzf0ghpy0qsje6uzlwz83j8pnggk28sct24uoh6vdffo537f0nc7d99zbysw0hwrwl7l0kzsdvjemw8tqxnrm5zzg6ullqbwwng05qd4jqz',
                parameterValue: '6ba80pdnxjg49kuttzluqpvlbokoskt1qicim0r2ucqsunk0serl8ql0yiwsf95maseafrta491fakk1kb8d1ot1nl5io6nl5v68mw9w3ek8xz0gjmw97di7zetxy3wxmjeiqdstjgn7w588l3nh3sttwup3yf5go7s0vxh6aq2tzard1kuz7bspjp6txgyih9lagssmqh5ggwc6e2ki8tkypmlebclalzqj4ewq83urlobmx9cxyw16jg46l0tq9d3rw2wys2m19r39um4zwgq41q2kpz1454srlct6uhc0z265bip8p9h4v2pebaqq0lw1xtdo34ayp09syfq1t1pq33p48l89gp5kzu4okqn3kjtkyqtps1qd7cous71k74u9f3kcaswneh3lyg8ztpqb01znv9v2h5n6rbkt0xp806zp11zcdg4zxmwokkzpqhqkcjfkg7fqub3mzr6xswsujpvtpfkvsl6ttet9oltjreqfij3az2d6rtg1sxbthw99afuzqfbua3f06va72lyxcldfsge8tgukxdrqfywiwvl8g3b9vccbnfv1pdme8f81pujnt23f0omq2y0tuaeoanl1q35ld2zo9btsa0wxja3psejh4qkr2ua2eh9jk2w712m08in31noqzsyk4ftuj28ndn54ycvfk9pqv0eu9uwd0loopccrfhxnma75rz5t5qao0efweo7rvnkwcr3zmznxw3e7tn3ivob9g4dkeqefarqopgn755dgxmky2n2vn2stgsw2u28qsd3zxl30ug50x414frjwa78cez3d4u4q88rhan73r5scoe8ja2fq9crwu8itehy3fhufige0m822kjw8q77214q6l9n0mvfigun4cvoey0u02ryv9c2jvx5goezgjg1vztbhhblaaosgptdg2d43zo4ps0acf7ztx03a0q1vnq1gdlezr7ji5fvng3gtsno50eryw0oi11zczxb67int6k8l4dtd74rz795v9zqb6rze8uzsbtu4m9qe8uy1wkewr2dnp7luft1sq85ybf2qz2kilrxqfx1m6iasx99ag25hs6h7xywss65g80mjyghtjnjjk9d7i4be9a7ey1vgo76e0wmisz7ajt2sduk3a2vj4c01xblzkvr82h5vl5ijr7ho036j4u5e7y1ftv5rirznwidofb88g9ilohokruz2sd2usopk2bheucl3popblmtobhq7f5w87rjmej056sjwbvkid95i94tva4psep6ednnlhigo185uer4za7ilec5sw15nrtjb0d109ndrl5ekiqkqxvvjunfho2hun4ww2wks4w8jad9vvi577d4i478q7m5y42l5y6yqdlwnz1bgatwl9zf0u7bhu5fqkzvog5aflronrlzd0i7t0ix8xsy7bfajsbk1ehs6klj1i4sogvi43h6xfye13euzsi6gxmtku73ph8gjr9m4ofwgv2g1kzuhan04x5lorsxjvktq3i2d9o871ampj4esaw616qgbl2840vfki0h39djdcn0ej3bixfhn0vxjtzhm0oq0b5xpvmr7c23vhb3ft36ffzs6keoob99otgabvgocym6jt7tv3yqojhjkyljhdabjxpw189hzfv0gzapjum99e63gpc6pg8l5e12oknz8e7002o9d8kugyvk7s3y7r3z3fzetprvwojxib2l8xa8ipoiw7xdb4vgvcykovrpvcrmqvbn1cpcbd0yxazcuffa8nuek3s1fe2zwjzeixordx0q9jxlne67jogq71yrgoglluhmp0vg8b1mzb2nn553ldnimsvadjde3f10prz9rdal4da1x1h8la4nat6pijb5stgv0gz1ocaq2si143tndaf549a7xtnrq5hx518zcaa4ba4j19ye43v9oaxkavl5dmmp4q5iqmajhbgda9aa4taakpfflhimbjw41ietfogzozqx074azm5sy7mq1khyru7xbg1r530gdrm48gquusu8k9tof90g2k7v2lj44xxhr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'gjscx5rm9lrq4m90edecte5nf7nh99rcqcj9adc13i5vxjng2k',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'st3gh8vcl3b55kymzmg7',
                channelHash: 'pftdp4i539nqymof465bu8ytiq8dnzc8z3wib3ca',
                channelParty: 'err366v48qphmk46lmypie5uoo654lisje4rhplr23xyotyisev0cgeixr4rd6tcyh95p1j91h5k2p4h991ytnphc7yz5cwac8r1psb25p4lb1u97oob06eyg21copvmuduiuupr6csqahjnrxqsfqy07nqsb3t5',
                channelComponent: 'a9ma98v665ydz8i2b4n20va1uicn7votd35lzspvzvptijwbqntjf21kwcqxjp6m23jmuk90oi15vbneojt6aj4eaz4qe2w3zok0qfea0j3f9jlkg0k2rz4eesr48h5i965m99tn2hm7ntcbemqn6cnu5pt6laxm',
                channelName: 'r8y0rbbvc3nrw8xs96xe2y56cqo1arugrxlqb6bihcdgfupgvd9b8hfzu3ee48ij2i136knlaxqa1dh2lxvhrgxxg5l0amey5qccvm3g9bw1e9agvkfy327w4ruwijn5xwy8xxsygt7lwwkqtz8xg1o2s1vlq9ly',
                flowHash: 'fxz8rvmbp6bq3b9bmnppzhkc2695ttxcggwanhjb',
                flowParty: 'x1wbzjch23hwyh2kmzsb7bq4ozhsirwk8i6r93e8tmle2rqn58x773uywc0qkgtts9hn9sirukuerl1xc8iscycrpkdlgs53tk0trzlm6q32mmw3gpc9ka1e69t8ponkdjniqdzjeboup2i5z3hexa3xhobf809d',
                flowReceiverParty: 'e1i6y1jkz71en7m7ihl3xhrkljqdktq24cgve80r5g11unp3molzdr3e5y38t563nggqp873vfcb8a1c8i8cdcmsc2jq420w78nrth6j2lr0j9rs5v0gey5hzfxe4a9gm6xzu619osn07y2cw54qg4lkgl7wbrmo',
                flowComponent: 'yam0enqbq3b84afjubw9p3sholot7x27b37sb8vv922pkrwnowl35vk53a5b2hnnpkcrfonbwnlbk0lydhfqx9bcco5q3aggyyv6wwaln0tuib1i2efk2d140ra1ya4qwd3ub5ejf49jvjlr1crsh1c3twtzkhov',
                flowReceiverComponent: '8o5ae98gny5gaakhn4hdgm3gxe73ttm2g0ux9qmbuxg54udddym59j7szudvg6d717hwppletvuhbq7h3gtit4eztbmadken0mzl3783j65ygy8uh1vo975zy07z0u8z69134myd6jy928d3m2eifpwlf5d2cqdh',
                flowInterfaceName: 'iuxvic5z9w7m4alqaqsf9oktu24v9hy82z4e9trhebh16zhennoukgtballqstkb3vxp3n5dojoalk6qbx9o8c3pa7oemuzdkpit6kgejihf4isj5tkboxqbwul0iz3nrmu65cb63eqygxo5ulnyrn6q51j0xowu',
                flowInterfaceNamespace: 'h7zkpxr8mkkhz31yr7jl9bwhvge364pbc8f00x2l8uvo6vmuii5i5xo59ylofbynjm7hq2emltb0ehcb57zm61mfws302ei8nky7c0q681zyvjqah5g6r7pw91egfbss5vta9sv8j2y5710sjzewgjvedi7luykj',
                version: 'vibaz6td5hjm3oopwg5q',
                parameterGroup: 'u85q54xakq3t2acykxkz2d5eujore08vvyzbnyxnf563tw9dwqhfq7dbn96k55a8sczzlb1qbziczkpqz9pyc13ddvm2svm1t4r2jz11fp0jbxrj2s0peknc882di8phsogtn03qu2ethwu1frwpxhfvptaayiuono5z9fhtyirabbgqbq4purvsmsjdozm4za14cwoqqso1cge7vk3vm9adl17fv1l6v78132qj6iju2xj7qxiucnccnwsxtqk',
                name: 'ft61ri0yjqep7reg8uq0d3p94zq7oxltzqha4r9re2vhcpkzhh6n526aucgygm5yykha59qn6u5ovwpei6kixw8t8saqov38dhtq16cvcscoqbynde6m1lxc3fr3j2uv4w8ozttzfby847ammpy9d2dk30qsq7iynapyj29ky00qkbyyi6dufkz2ewj0npyjcr50c88sml3bvc93c7fddq63cdoct14pgj4phwjma133cgj1f6mem8unrvx2rhfmvw7o1nkbz23f0970dyxix6m8vjy44vbcsamf8rpk0egznwwzsr0boqs9krfhevt6',
                parameterName: 'dbwuhgtwrn6nv6aoh3mm8y7brh741za79yuyfajmhbbmn4h3rr69vnsa41iyu1p1ybv5dzlzp6llvec16ab89umg85iu7oed69drue6kv1d5gf89qq75qrx51hnm62qfuvul68yp35o86k6wfkuko1uep823ovpsai0aqlepwwap62ntsaxs9snk5xth198gqkr4jbhycuud9ryt77znzsf52lg4z5sfgfimwypa3v67uimuir6bxvaqckpw8p1wsv2mj0drehivu2k7lb9vc838slhbzdgc6mckwbfuxhee504t0lv9jqh4kfpkzho4',
                parameterValue: 'mg2mc16hzublq722hexsqc7pocq2s4lfdon38854bvyo1vx1sm3qjxim68z6vcw6k9fyop8jcbw6riiaghfzrv6urlq714iacjk8x27xc0dqc4w8dbbbix6ugqocenur7mc7zpyxkniq7q83gtvgcdi6ujh1ghlmop5mohhcr0alz7bjfcetol1q19xav3fjnl1es3qy0wkwxptyykgvxo76mt0npthj2cntpp9pt4yytomtj1f2xowrlot5pnvga4spufhr8fzkpve5o1y3f18xz20fumfhx3ewxwuxf1a5mur77zdwxbgmfots5z6yoa2hmrxjtv6xozyglq4bxbcrpflecvk5eok9d1kbalps9d3dsm9z4k728s5i2p33e0orh2icgnj7ql38luo5hdz3fd5ufxsn182krkz5j668o14pvzpqasjd8tql2puexjofh44hjcob7freg4bezx1w1xg9isxvk4qbifej0boe495nesoxlniwocetlooixpdvubfdycx4yqufsx03rzkeq98llwd373w9ovcciajqng1qzaan9adp3dje6stl2j79sof22qpodu8uyu2n1pltjdztnvng7lk1gl6sabcmz3zf9xhohtalbxheerii7pccnxrpvypaok32vfuy0yq80d15xsvv0v4fvm79vzz6xxqlzap8r8xvjziwmnps6ciriw8yvksnx1l0xe0pqi23eifzd8pkajkpbhcqv3woyxksfle4avdwp8scz5qnmncno70pkc3vxn84x1pdvq1q076a6rljgo62dzitvo0sm7sxh8gcbjjidmrgowhknvzeh4j417mgxct1v7diykxg75c49lwtooa23kuhy7tilk7y6wrv5rz9tgem1z0mlvzbv2u504bb9fi1k41263e59v5n6uwiukpo5ieaylvfwhdjhybepo578jg01r5qz8lf4fg3tqiadrzaayir479natck0792c4uo3e7vm5n7cm1nerpyu6botbdhl4ifbzzc450k3trky26tq0n2j7rdwq74c2jdim86zq9r7m00k7sshplmvw2icsprud4gurwl3d3ec16d1y1snu6fv0o5qtk0fxxh12x71ljbdvc7p9r3416gt8iqxsyczcxi1ibq9c3f8frx6yjo1j9qszhlibpax4x3n3v6jfvywy3ou2qi87hcbaqrit4ql0q4asat5ibtzg5n931s1vuqqfmar6oawrba1d418u4i63ok75fltqnr5o02m512hpi3zrdes2hgwgpo386wgk70wdty8bm551f5ur2qoxk3d8uw4ejb7s6u19szoebojwr232xtojfypsicx5lp95nezy3tn5pg12conmpric4yuw292pccfm2fe6qobh9fp0iwsxdvw68g3h2vaget94rpu3oclf6ef71ozalp23qxesl5jzn2zxolw5jbw97vnphddpfbqa2c5bi274er08qufaz02rwinx3zrgalwgndee5j76gnzvbtean7ytx2769lgte9twtr4yjoiyqm3aaj4pxon4652wiqrelr3susmy4qw0mj9sfztguo0e55kx7frgmz8sxx0bgpeosigbyznndemdz8ws82gxpp5sirfvs44j5ztk4izwa1pti25a893gpbjmwgukkhzkgfi9vu6l8qz1msvmkn2wfdrhoy0v449gycbdtuf98ht0o1hvxxugt37asj4hgt9db9rluxbd93n4fs0dw9yfnenr12jl0i0w2i5z7btx65ljn1t0yltq09lz13v0l4rxketgp9wilsx51094g7orsqw0e93df7s03j8rrlq1iaxjdqk881ipz3zyx5pxsmkx53w90ojcsc6igxrktc9cz70srto8kdt4iep5o6c87y0zrpt7xvskmfn2k0zwytbw2ml8t3skmmfwsrv81irp0730hpsnqm7fh1w7sxp933gu6i1jusn617wo606iwqir7axcj1wrh9xva3vyl9y18bo19ggkhm2im5uti1r5yh5ymqsutj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: null,
                tenantCode: 'hdqbskepu82ryj4mgkiwmmq5tc7m9ip3umccid8f2ho1knpp5r',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: '5t8g5678l7u6rmd0m6zv',
                channelHash: '0ok53k70a5j4l0h94rm6orje224tfiog6ts5yma5',
                channelParty: 'suq549ph7coiz47a1978yykcn2oc9fe8otylrqt4bd2whbdkx2rp0qxrxtm1qeumafxuye496fxthge3ghuge7io1xt2gc6ptwkxq6p0yhhbonbclnp8vedklgw9zb2924bwbo5igptlnt1pd2mceuj0dib17gpb',
                channelComponent: '5g2diwukzczvrfuwyzn4ev592l2hcm1h6d0bby39rqea6kv4ot9rvqykh7vnxtr757mu5zoc15fxuzzxbve9cz1zkyrcie0qxy3r7adinccn5lkd836h2ui1d6s38fc81q0umtsknqnzoaarpaytpq0wwvtyc3cd',
                channelName: 'yh7t1n3sdl37v7ci5pvc4z3zwm63gm9kbbhrk9in665mosun9cteaokemm0rgvplstsuxr34y0i2pvp0dr1glkanhoq95onp1c83pde8i85v6a6lqzbb5512yqey9ojtft3ahuct3n0ztp5acm8lz3h6c826llfi',
                flowHash: '301y8539itacih9h3bowywe7gfeozncllf1catr1',
                flowParty: 'e9aupte42y5iy7o2rzdcpax87yvjljhmycuh6c0fx6d7uizlmd9f924jdoimqm4dd3cxc5rrdkf14djcrjjkd4i7k020676axfh2iu4q4m6qogifzlncxxznt52f166ug1tj9b6c15q6sv8tlcfmqupbgru6rsqm',
                flowReceiverParty: 'hul7kp28ko3eoaw4cbjhlf94bvfveodpud3tlblzzrrbbom3352md6x98mfhmgfm6293abhercfnhx6x4w6nuu13hf2295k5qgx4aazjkrfks6sp9o5868oq07pfksbr6jswb633l2aduz4wfjv2apvjq9umv49k',
                flowComponent: 'qc914w9gbtmhqxsi7fh5kf1dvobgeo2b4b2o9lhn2yio3bxuxnnnl4mn7ifo98hprxz9gn8u2mqmf6fxzy24rs7p63iqhvoxz1a1okjt3a5beo9wk3i6zr4buizhbxrymqmdxj8tyu0rpezo03tsdojym6qckpj9',
                flowReceiverComponent: 'bra0wkmmxdho17xkca9fyspj84pirrxjv7pjyhtod1ls8bicsfmc0sao3q0upcfa8fv0mh2qehb4jemzbhhnao61pyzqou2hzuw9lpqzufc7ga5j821tt9t8ud4dveqhau3zhlnoc7vqikrlhpwgiemc1buw5l9u',
                flowInterfaceName: 'kb5jcg819orb98q5lnwgx4pwz4nnmc0bgw8an5z3c3q3c3zynyje1kojmm3x71qcq5q29x914ua683aksp5oz3w8chxf2wc6h24turdzlc5nvm7d3w0nvbp6lt2oomuysmws09sx6iqtdv64vl2y52tpemyd3rfs',
                flowInterfaceNamespace: 'znanqfe68b8ynxt9m3xzem1chsrds6v9q4rfh9p9u1ztvcjbvun6anje0tiyze5e0zz42ubahzlf6011ydgtkdgyidqdvofldqc0n9judf8e48eiqx32vqpktjlh02nk2341r3zmj1zvdvci8jvfkgis5441vjvo',
                version: 'rjikys5zjlphh19jvt91',
                parameterGroup: 'bo100cpf3lo7nz1fx9gti846zgy7v32chsbp8f3ke4xxu1hhl1yz167hxlbyu20zskr1tvcy4gy53liiipnzboszcu6uixjhqg8v80iibrw8d0ero24z6vo1o120h0fiur7yzbpy3jkl5ijx53n7vz2pt25h70t0ipz9yvfvau5aosdqqbcygn3h3bl0e38z4bg6ocve2380j0ks1fp5wa49k478z7wlb7slyyyhq4lqknbgfxj5e44gr5k3m9p',
                name: 'v9kphcei6pt8qh7ijdnoa2d1iba6wfgs30tpnzjo83598er38nuo00mx005jqptz9ha6joegd4x6pgvda9b39qie9va6jxjfsnh7y7pj3xsxzb2int6nbc2bf9lojdjzxambdntomwvsn4kgxltmpsl5qv9lq57ynleod9o84rr75q5ao60sag5cxo5h4setsa8b2hqyy3evjk5u1ndj1yq9qsyueelcrf88vkvyvmf27lfs3vy72jcj1oeenyc1slsx76rseypgy058ul5c2cwjjrilgr91aqd1joeb3xq7919qoz6iqgt2m82b75ls',
                parameterName: '6f9c42vfjilqpwqkw6vch00qx11wbofwpggipfpmjbo9770z4cptc6nou95m3hbxh8lgzp449tu800g3sfiwq0085ps5h3tbydvuheky1htu9cs8zav589554dqu7rq5x7wubo3ij23gck7wwv0vqufamt8c8fa187i544ianti7il7f8hzpt1de27udy1xin932ocpuhxupz5n1prx9yps3pciwoybxqoa7xxjwpajs5kkvfmrnjnl0sdu8tfaeqwu113bmn3hu6mqdnaiwqkxoc01rn6dswztn4mezyj674ilsmx2825v2c4pe44hw',
                parameterValue: 'srdddbwzz4cmx7zvf14u1jk5tqy180w60i4bp5fq3acmqvs2qzakip8a3yz42tlkz7bm8v7qbm6181ephrekh16tyosn8zdth7d3tndotuqnidekdk3foo82bnvjtam4i2xhb970pf33remrc8rcukflfo0jgxwljib686hy2pw6ye9jlapq2umkvqhyefy9kk1quoyngjuitwpxoux3in035hdtoagkmp9ym0o10cuwdr5fnm1m40l7srj23eilbi7fvr94onto4poy7txl4uacruiwybmew2ygavzoqkq6boh5iojwml4b9dmvth998pq4v9sfjzi2pt7if7jxk6mgqnxy2mrkgtxiyjoux7rfhmxnb32p86v5nngfmqy7p9et16iviotdb2vbtablzpzc5y523sy73tyg97t58a4z7qg2bb42fvr1qymfcx9sgyd761f4m77y1hhxnm6tc7siqrtk24n4ko6kf7isabzy7un63g7ntep0sygmv8k1pogmsa5bh7vzoeempwvt2ju92w27hu75eehhs3cmipf9k1qs2pj9qt3rdrpdadjcibeb77tgqi82jbskims92m4iw7ym8v3iv08agc8m4p3gkyoj6jm3wboahocuxam4odysd1pobxxlbzi53dz6mom05a3ulu4bhu8uhm5o4jesuhh9992bg5h988ixudq00vbu1qfqz8yh3m5x0kaqct6hgt35cknby6jviuwl3r55bzcro283m0b5ah8bzm40j2teztosa41mpj37og6rmzvly7rnpmjuifsebz333wr1k432r49tjowxou6dczpy15jc742l5yuikcke5ndumy23qhn6yt6jn9x2y02msoaszbzv27c5u1hvj75h4ytqt7cza7bvkk0teeol3dcavuaakdeafkr8p1m0vt56gkihe00icsy9qnstof0u4h3ewx9ud8zufe6c2w9sm2a6dob2zpl75kdtf0bgltda881hot9yvr8i5619ra8q6mmez5t23jvd55jiva8m6x8cwkkusluo1lblm7vncsyselqih8r7zngq5oidd8p8xekv27n5utbktdhhvklv8l5vielu8ynuwxwu5hkzcfyjatcj9obzhl35h66s7rwx69qwzg7alephuv9wernosqco8r9lizm004seklfofuhysmc91chn8b0fb1uafwfwan1h8et5qewqkcbxdsun4zk1a05tqg2urhhk1yyd35mq019ey5x8hfsqjrht6gs0p84x2nnyf3f0h8poy92bad4eb1uorn48i2egihm70btsbrbgigj8wwfkbz4fcbjp20r5aqqvf82hocmaiw3m6z2bid2llvywls3mga4awr1sm9mokwjzq49nz60ceh1q1vag2ulvdef15txuon5kkrpht0q8iu7hsb7fxjgaky767n8tfm1ayvr9faj6azciiuujstm7fbriqzhmfug426286dqq92f3rypn4l5ov687g4smrbl7gupxca58x4vwe8r2rl2gcuupovjvobs4z4n8t8jnkh201x61cp06lvx7eclvz5o2e46n93yq7xj1kpeg0j232a089pen0eva282hma704nhloetdxu4btv1tvb6kx8f4837zqxhcrfdvwu1aiohxf1sc46rd9vkezm9tg44exm4rynkxhgps56dz0jmnwptfbjujcxtgnd0ywdg9pfygsjsk3mmouu7aii5xtnw0xepspznjqq8itm3ohhrklxika4n9ztwqtkkerkfu0fdlrgyci5qpybciiy672twepktntw51hvr6turvjk39e7tj97xvd2fg3ah9tce2denarzts6axqpqwkt4objy2i6mgcuig7qs7xeipxuh7kys7a1uuwpdz4x0w5sp6zpyqqilqpi1wzmxtah7e3qp8bbl2wu8eqt1q5w1haajikgbc1u5akrx8ry087x3aory6sxu0dbe8j842nw3k3r2n1urhih268vyjwa7pcmzq340anxvyxmrcuh7vep5xn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                
                tenantCode: 'is8l8lbdvky2wfqu4alhbil9vr8swzfoxn1ijkg39er1vixn7s',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'wfs6x3ip914qm0f1gxmq',
                channelHash: 'qzxugwnllulze21vxiwgat7ivro54d85uhk20mp5',
                channelParty: '9gpy15zy62xchqz4vler2bwhq784rvnxwnekik60oyeba880hq4qf26nyvtjld8sbmj8rxjyxzy92omselbjup43s2y9zp286t36c29zw3lfypwwrjlmg9xpnktos4de4r6ddjifwdpuwkbsysa7vek5tl917btw',
                channelComponent: 'iqxny5ax7xut3v2o5g4xx5lnpguvn9vkaqvvgndvob0u1h8lhmx76qt3mp9ccnla1m7wp1mdmk54puwow7cbd6h12gfnemr1cxzumhrzoaj87a8kprov5o9294cqwygw4gpyjsqrpdwnf2pdwdnm24wbggq1lfgp',
                channelName: '2kajzhc4ne9grcwz18nyhifn6xvyip70087mapzsh4cvdnpbftkxbma5a6usk4vfgdnv35fskynlegd02mrtzppowpd8m59ubxado39kv8uktcllfndhcxmsul2fu1toysl9qdztepn8dxavsqf4u26iuil0k73s',
                flowHash: 'owd00dxcgmyj02wlar9qwljqg70ogfnji2ojuv6b',
                flowParty: 'yf2q0i6np3hvapkbowt91su1xrtu5rpzsxq8yndul27wellywi3cu5rjzg23k58uxkroi1jk69nn5s7wj1u0fhrhaduo05kb1rodyjzylu2e1456rny0f4nzrr052so0we68030djxxzw9agfn37ro2rd10fwlii',
                flowReceiverParty: 'x1i7w4wo6s93i9zzrk3u7u50fwfsu903enkpw1mcv5htvlozx8iqsz2dd6j0dyi48m4gip9are2gxzboimustds78pyykujhsp5bq27lifi5j1xd7yvinj26lhsdfm79lzewk17zxcte7nkjzwc29y3g08ghspnp',
                flowComponent: '8g6mjkf36exne0worwuvs5en3ajmuao2dpha373e8ct48j84avu68nu5bbzwvtkyw7tdk6is0jtspnjiz6l4xpuyywoczo3mrk8outbhwx2dpdj5xdhgk54zy96fcm7p6m1vx02sra7xdhtfzpqvufuo5bsmb8zo',
                flowReceiverComponent: 'xy742zctuy4tau0wimop3f0rakm81nm31s70etfcejp0z7tsjon3hqlb72ioub5hs2id3elkbbl1ux0944maaw4w0sgp6i5ulgwb9mdb5qseskqezwqbr72i0i0r5uqk265m14lrrsy1o5dcek4znl1o2f6bw5zu',
                flowInterfaceName: 'z4shugvt3wrcnwsothkamg5kmw5erm3gytpqf74uiuqad4n5nm7uw23ksk39ukxwjqybd8ovkd7izvg8d0qcacay25es26lxrwpb3x2qyqadl3oez5wh0macivuzgd960p06yjmf5yle4w7kylyjol0epa6qnkxq',
                flowInterfaceNamespace: 'dog0ci31vf7fobshli50s8vy0ovsrbww9i0s8nqpylsm1fckyj6uae8uokbbgoimq8g18e6kjg8j6qe8mryqhktdmowqet5rm8ebykhco3hbekba0vnkppdf8gp3vch5gzn19ymmlsac29d2qzzip84pqgt7xxv5',
                version: '6yh4eqz5acsbpers7jfx',
                parameterGroup: 'kdi6muq81xqf76mj1rkj3zx2aeuv6227a3ftu9g5g6bbls7lkrcq3h65bdhzc15uj4xjjvgv821wfvrfv0n4pq6k2ter03a79ulh9d6zfz3swevb1yuia688wqmnju9kbcz2418qzt2lp65l3kow4ot9mjika9rvd0aylul60ztsuir8mgx1e9376scbfjklkwpmcahjz2coyn55rs1xga9uu3nxxaf0ofv8bgkogrjzfni33d7spi2ocrj45u3',
                name: 'dalf8zfx5s8vsg9oiiqb0o1qh2pnnb0kb1ef698jakya5yorexe0m5f7nqxww1qnew0abmyr6wpzrupgvql0jcoad1wcwshadlso2024iklfipzhrofjfhikb6f5natpivajx2dq4txuz6vlh5gmlry8kw5rit0voyqv8s6i15r2jn8awmwbvg47enpm04qijz29j3udera4lggxfp9hvst4w6gyz3e9hmp9om3lfavhdog97etzt7pvquwtiuvtenaprkxxvier2j0r4ril66w75jxf6564pb6djist28h9fl5h7w4j0u1nw3yhhwqj',
                parameterName: '530cnmbrn5usgqnr2u5i3xww9cdag7kd9s5p9qo791ef1xatoxk2l4nbpfmjs3hydgr0wjrhzef1dovbnm9f6nq6f3znhyixyi3w6u5h695tyqllh6ji1vmtn1rmy1jak7so3cdtgp759kteq36c06a6usnldsn4i26eszpzk9kvqy4xxlc4syvty2eu8ibjqrq7glvv87svg58fcydsn4wj4capkck1wksv3k0f8u1pwl0mmhwkmtcvrd1pbsq9wvslmlpsy4baehrk54wzx4d7wlhy6w1krhvzrw73uldfn9phdiccsw3t4u8ovqh2',
                parameterValue: 'hn4yj6pgujmd774oqq0640kb16dzuwoxsp394gd6j82939ibytjqinm094mnb61l4lakbtdri4utuzt4odxm8yd892kmmio0579pyapge7xo3zt1uv3g4967tli16s5n2jak8tp8dikh2ft3twss0yvwxp661festijqqogwxsb1h8hgvag21n4ymhnqst2a625sb4n7vccxdux680bs2xx86m050dqfiimlbcea7lws3v1k0t7vc058ccp4a9u02avfmkcvembmtnnco17rdu0j0hlyvev0vmj3cq25wklxofjw5osc9isaw0z71twpx0s5jpgkqwxz6f2pqw2lo4xls67vv3vmbz07qqf4r4vhp12ih20in0iwhg7vo5v9kheosx3h0azh25xzvyzj17q98wfnk1pca77iu8hxgpp1bsrm7sw1zh9girwcc91fh4wa09ty497p1qq12bhwzcpvex5k49f891l8czbg5vj9dye0m6kmi389cx2z4n65y5u8khqeaww70sruwltyl04flvu2orzrrrt5ledzts7hgfcu3swl9ck6je9ra89pxfbeiip4kzj6pfha85fup5gc0yf4iw36ryk8sjgw1xija3iqjq1kmfixqcpvj4f2mg3aoq2d9xqrvwywpq1nhwkxxjhw8zovaelclicujj6q8j2v1pukw3ctkwxrld867jj508tep71lqfw57crgeaxj7qyp2nhp9zr7qsp3y3eiu07t3dh4f3377cowp8bh584pxe2rshl9v6u5sd5mjtk6wq1dd0k6opfu8v9cdimlxahbpw5898bq518isjunvg89642kt22z4obysqgl178kk7dguntr5lqjm7yek18rdxgz0tr0btufbamb77dmd8lyfurkdq6hjrlhil2zmgxjpzv4vl4yf5vzfhrs112ipylnd8qouf7zq37h27nazuqjpqbjq2vylewkulibu5gmypzi1pnooth5gdnugt8742vt8nrgxhnqp9cfk66a6mlq55sb0yvy91u6xf4fg15dikbv7kxi8o4wu0y14xvb9fatq37ojpuyrf4l68qrpb73z3xgl92gc1fkvwmhocec5dt04xb0j17jy0kwl560ym4ngj0jn58nq3xubluqf9bcpm7o7pg0qmw6f9itg290f0jej126ny4cfxjo3nv246gelqum8y6s03vq2vgxmo5gpjfnm9apg9eqphud1faibxohq9gktbc5wl8zhxk2o1147rfq9mdhjzon3ceez0y6pqj4u1zq8b5tgdli7w4bdjnxzry1cvzkye990hp10a9cy349e2w6awwn0mecmwbbqz6f21adro2aheigbqsodpvf5boxn51kcma72flryez18mcupm6wg2k45aiw0z30b846aokcjvzlkj2bvndq5l45juu38w9wf0ev2x7n1rfevq5tppecsev6p5vzun522jcfqm22ip9x29vw6furr6hxymzthuop2d0g94njoe2ngrh7aomkxu1mz6kgimohyh04ev60l1xhr57be98mylontnodumjag0feyu6sessho53h3nwa9trn41icbdu427w80u6d1rtqwh01ewj6tmv3kma5ae8z94zcsui8tpabauinbx1z84n6a62jhr4g2p22czg29cx8jqlytwq94dsarzaorwi64dk1n2x2gpecxl3yesetc6wo9uedwjorsnchvo2tnyhx6oov8ub7db1i7l4nvcuy1up3vu6upux50xjemyq35jkjo520x3a332ssloza6fdx8bo6riae5bjlxg4kze9jv7dt468p91wahz61p1llcg2g28bkdhfzkaglhd2qpwrsqonpbdqlv4yf2sdtsunzy1gdbh4bgco1rpdj2xpz6cbrx1cmijzoo5m5h2o84boj3ngbj6ekclc2wns9geazazgje8efg73t67e8bnrl3vkr84rkbhucpk3sz20enufljsc6bmnwur2itffenkpmiqywotxugsn9e006bslo9g5ru9gd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: null,
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'ahyoxlg2mul4qcc3iklt',
                channelHash: 'x75q7v5lk3caya5wt1n85eyh2piehj47bj5va19a',
                channelParty: 'gi4x2ztlr1coscxtj971benkj479sx7gc715mx358datn2l4sdfu7hubsi2hx3ck01zqqydqmaatdtrnfe81qgm1wqyq9ronn10ch29uxat3j4bqzm8qlfe9vh7ocdntvhk1t0vu7a6fhkue3vade2dewi924on5',
                channelComponent: '6plm5hfchoechrrzdq6v331gxyz3yjtt7r3wtr1ks7wzr1ogiof9j746e8cisxks59zoggafy2o5sqyjy9ap2stslcyoaxp5xl1swnk423egdqen7gzsxd418yav06q5ll6b9ymlaxhcwxwcmy48hekdnvd3l46s',
                channelName: '6u072pjeb53u1rlka5kf3jicpz4zfhh6oyjtblf3rbxlxpr7f4tbdsejdh8nv61taqwjctd29zxzbqeshud04w6uimkv61nznkalvmlp8gsk610bpfuylqg03fd5p80cdafz54xl08qyh4tit6efs48hrx98ms7p',
                flowHash: 'bw6wl8xdx6a10l1d775ls42fva5ta2izow0rg6fk',
                flowParty: '6b8ljqc6xasvlz1m57ppgs2815a057mjp0fqoej17ly20lq0zbsp60eemomurqwird722jymckr65iwswr1n3bqjljk156hk0il80k5m1s4lsevvbl2sbhhgdknsnvpkodxy2nm8p7suww6pgbdt50gymfalhdoz',
                flowReceiverParty: 'j5ponk2qi9zidr824ih0igcxyj5q0db4fe3twzc6pmoew8z16am5rcirm31wge8t4ugkj21iy5qrh8kt8v3t9dy6awyy1geqwi6j61nxsdruemmtgsfuq1ghpy3tbs7v1tj9s6lax23cc03t3akmg6r0eduaov6m',
                flowComponent: 'rpic1d6x5ysqkhy4ky7rwq857bqtoluzy3td87lbqco2orkce6ll7od30k1rji1v621793b7qspbtxvhexzqhv8qug6wvoie4he9hmztmab03vy8dv8xcw16ff3zor1jvz5t4yr31ih50tj2ieqz715qagcnbtu0',
                flowReceiverComponent: 'zz1z73uxyt7nbo8c8h7qi2yfgugquds7ksh48s2b7bw0buljajok14ttqh6jpgjsquxdh5ayimfphqktug3ezt2sysa4es2h7cyfcpw5nzkazz0ixlgp1yg6j2fmin6mawjmjsjchh94k2oy4z3r5i4wdvanovz0',
                flowInterfaceName: 'i00v8xsa762lnzcdq9isnfgdxnljc9638uv75lehdvf83rpxa3mzdn0zb4h3w8bj6udgycphoofe8w3wqpvr74v2ilgvnpmfivy3759g6szhx0un1e04rfc9m3xbmiyyrnzta0ilt80m5xac5bpb12ewkk6c2qji',
                flowInterfaceNamespace: '1f1eggmfbg4eztn7m55m33iooz39vucuocrpdyt91vpf4tbboh0gdsut7s8pzwox77x1ytli83uh7m127ud57xhxy19f34jv3fhpsrgomr1422ukvd950oa7dqimr1k3vo6e7c9lklbk57j5vdroj0b8hqciowl0',
                version: 'mgeujsmvouzssalg2xu7',
                parameterGroup: '3oh1rnn4xrjfr09zov99hl6l165230yhq8nzp54q35ap0l489l6igeswmbn7g5rpe44wr9uobcyazntzujk14xzts7mj36xircaemc0nmmuab8jfjhuiuicapa25gtpv2v5ihfe3oy5kzkqnijod5aj3jvyrtz5rfzxrvllv563528fhntssa0fabokvfjfu0f3259lgb3phaate78jhukborjlopppmycetj40dgqznjgytz3jp848kwf7cggq',
                name: 'zs0fmoigxaol187fvo2hizuu7u6ge8soj8v4x7qjias7dm54nulcn2opa2eszfryn2ad0o1ssreptrtzqbwq2nw93db67t3ncz8st3mm7q44vhllde3fkh0scyh1z0izgn0h9adq3voeb7hejex6bin2gkqjksbwirwwajqckhjb772ws1fek2lbz85xzakphqobf5urvbq9yceofvi5ubozcb8ql1oy8o8kbb9grmxc2wuna7du7sk69vn7ju68ujhu1bt530ok39ws426kegn9ff17nsv8kb5hsjswk36j0qlx5wocuon5fgerg31m',
                parameterName: 'etknkhjyo1c5lik5fiyp8udy0ddnd30i1av5u0xo9xbcqa9pff0jzjdsx25ynt19uzjke6jnb458p7ugudl0gqrsvaol8en62idt23rxbh4z9y1kvdi7ly7e6rpzo3ct8p3m5ipa7kjyzfllpa6ayo98cm0pc0gtvy9s90y6464pq4kat5qrrrc217k2ts8zjser2tfodeom9ykfz5ylabx509dautlernkpm94kvrnk7cl2p9nv7qmox61v5kuo8j5pscuj3efadgatvlcakfifd0iy05n80v4pdjns7630nmxmbv9za3n9xid6nin5',
                parameterValue: '599974eilso95g7ved9gk3qac93yhkgo8ex5tgsm13mq1vbwbnbxt1udbnn2ze4448ftdb3zh766tadn5e4kxtv4tjc7qu1ics9cjr0zggpddnfmpg74w7mp6akx77u6p38irzdmk74pk4cy6z4r696oct5xu5qbd13loupo8imnopbro24no2j8my1nvgmjqtw5rd3a7n2twdy7jq0qn3c3djchikjroji9ixpo8apwc6prfpcvlgzclihkzd28h5wcx2auykqs4g0jaormjr57ng9qqkg26sljxilz7pg2q9395kdbxkdpcix6clt8uud9659kt0ptte10x4q30pzdfkf77sob0zhhqia1re9ur362mocvfk2warbexbg6md7xga365j0o2rzktb9hc3iu8mfzaxwpmoatn1d85p5schnajvtm47mlkrcs1o4m9yyzchx8i1nje3qqu3qti62ozdsfddmolwf0phj03rokoxl625hsdsm1fjmei9qpkrlz790j5nhgtycngufk64mmg3rnb3crzj2n3v4w9gygxn2ex86lbepnzwm1autcpk4vw92hujcisotckaxeq4sjsbytxrjb354eyjgp7exx4d4i1scxi4kul47os38b78suxf0juhb2xdt1yibuvxn8oxg9z09m0jdv6tscmr2mrihjrf82bqzhdn10ga2zkc9c7ax6pz96tsbipgfr5he1cmi1u5li6ai5uj3phd7dv8yildwroz5dkw2m70q7sgi0fop2gwb9dq0shw4mcwz2qi9psmv46pj7qf9wbwmg5zdnnojbeycicokau8cnwdmw7wp032t8tfcq8319kdvs3ohc7fw8jdxm29sj98840gx35nvra0jkjyti8copl7ymtg70xonvzrdbn7is7whmo4570x54sfvseijhjobkfao9vtgh2n1e13pg074qd6yu1k1876j1syv289dlnsp4nsx6nec71cji2oxvuu847rd5l8be0md3sc6k1m04tg4472z7lxl1wenjzpftugtw6khj6vfb3u7ryw9six72zyp60zkjc1luh6z1e08ty2elgzvvcfbu5blenb2sw61a9r8agtjj5kump3hhwf70ngrx55mfyks4iixhipp8kitcs5j0108ioo1i5ltesreyynkkqbpjg14tv20ei541xefk4gb9dh7w7q8oaxn54dui5u8uvac6wexe2tva53ogecot8rmlhgwg3qa7p1pdn6qkfe0ls3yb6bvjkxjmoek734gor5ir31masdlg47u69vedu2rvqzstkqyquh1iutbw4qygqdzwvm5es87cs6lhyuic8w8ozgz1lgd83ncyy9jqaj9sjsdae0k2izf1vizhh1vk0cxr0g7494m7kn97vbnwh0yw0rri1e8slxi2t7jty7kf440s68vksqu3lx5j5zldsz3qos648olui84re01fpq7qdzh5yk1es0dn7z649hozr8eakjczx8vwuegde2u0rbzwqwjwy8ltyz2adssd5nru5bscqkoy9ubegwsvt82ak38gvm61bsz7zdh8q7514bvgvf2av8eqvi9i6tttbytuov5byx288wjt7ld5ym3zkl21plux8fsv4lzfo4fjgia07ba4x03aigg86eudqhn12q7xldvau9tk1qas2l37vk5zj0hi5ndquhtbsr5me1d9k3727j0chm40fesco4hs0ztoomkgsg3xmd5km2d2mdhldobtysposuuzaixeyd4l60r2nbzn74zj1ik1jmagzn535zp1cuzcmkrzv1zatndnorvus04mb3q7oye9ds0pjoguuibjt7d88nwbb9yr66y8ciqb4r0t0up0yuhjufxz6e92f3eq7hf30x9237vevycnh7cgp7v2qutqbolmomcawaqf4lkev54ijoq3nqab8ul12xz7kx09f9mdj9def285ncx30v6ijlrm4skswhipnld8e25dkzm7jvw9iwut5t3kouytanwtivr4zx0pqi5vrptk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'zrdm3bl1d3yf9ie7wjck',
                channelHash: 'wvl9xh4mrlu4hodaoq3g2tt4gnar9lpxvuyg383j',
                channelParty: '7npekvkcgngxea50wyglzygjkvcoz3xaw4z53lbt9q320dsqy7wwg1cd06pgh4xutul9xn4lyoy9qqdd5qipzooj2537ubk2oc4wsbnpwiyar94j1lboqvjmn47n97elup3jz5z215mbfplf9vjw6a6mzv1yhvzk',
                channelComponent: 'ad91fta8c4n7eaxlvge3wqlf7kl6bab9iy4j6knf9110nsb7ki052atiqzg3rws0kxgsb37vb2sf23xyo6r48mo76jr8d41gddtlziuuzbrc4kmrono88wgn4agss14jacj0ofuvlmc0dveti3okk3fei9fry2iy',
                channelName: '3f8vlmskesxw5620iudzu0lkem284xl9mefjfepbe047m0bzxu0lbvx6ciqh4e9bz1u8tnei3emesxlaglwtwdjwzkae2e7o0s5ucw92r6g0f9al2a8tsa70xu3l6uzx8ew7kr7zyw6rpyg4q57qgo6ocrr6y47z',
                flowHash: 'ynbvshu5dv9wvel4ye8dpz79xro6n50y4spby3ai',
                flowParty: 'fefjpp6t58324j27no8k7y4vxqjr1d9k65hugmudjffawlijbj0a2iq6ochg7xb7yqdv10b1wpgx7o90yfosw56t7eiaqq2mrh3f9k0ymcnrkvamdpx9gwb4e4srhbfxtx47ozj5gknrvvib0tfzfg50l58hixbi',
                flowReceiverParty: 'yzxxfngfu3f91wwko9qlaqejqzefchb57zag2n8lg5qp14f5lwy7r4wu2edy0bh2f2648j670nzxft6zkb6lej1d3u63w1ruvgvo468u7ik1rgihj0gxxf0buveuo3x192r101l3eicvd575lr0cglbrpnv46vmd',
                flowComponent: 'qle9ghp7l713g098s0rkc3h57nm6kquhfg47m5ysnjcym6jt10wvf45u8tw4tanwjkn8r2r3cqgh8n49swh8akshxgd8njl5tgwu6bqi5dfhdhsarau2wrye7uprlv2j44ux0afxlnd7yc20bffxczbx8sv3gr9k',
                flowReceiverComponent: 'k5vrvcv43xdv2hsl2oibej3ky5kaho9yfxzphe8wjl6l74itly6eutpi5it6p0lu3ln754bwv60vk3avl356u4j6gjeqf33f9917lpe2joixfophynhzbwlld3x1e7c4qqe34k8eyjdp1pyce6lvliwz1ydftlrr',
                flowInterfaceName: 'p8boyxczvklz0k7797k9fdhvoan0kxzmvk84gkv9rk5htizczc0f9cms2t29f39103awcv8ceguudefr6eqluk7gkv51zazgfdpqk3f0jv6gdt5u8z880m41f8nowbw9wcm2bhap28uy628a1ny4d4hinqy8v38j',
                flowInterfaceNamespace: '62e18j0skefgrk2j3qv4tmigv3evoscgwr68ogg56wcxb2dj1fl3qum6vjx9gxpzs7ebbmp6xe72jwyem20ho00fqbes3rzi9cf205wdy41dwvautz6m3bhqzre39yzbxwxj735qoe95gf3b7qq5gwqpb77enyoo',
                version: '9i1fl20y182xi36yz7ax',
                parameterGroup: 'eur9uyduuacvfhpc7yrj0zrt6lx5f2u57maep37rinsn532rly1xxkc2phk4hetla4332w4pvija4hnru5dwavrlaj9xc4apudd3tf2gtt4e332nm7l0cst1f3n56rrdxgvlrhsgdzoy0df8uuj6wz6jspb95wt9i7fc92qazwfe2l1xe9gpm27dbxrptv19077sjv3bgtnrvp57p35mg6w002ksd7ljirv5c7pa5ttytzh5uq9t2ld2xnvo16c',
                name: '09e0y1d86r22nl6esj8u6mt5vo4fk4twidtri4tk6ndmoxf64215lhum0urqdlp82tmd58qf3uuo1b5kqy199a7dsmzpyhuzsm6nidumo4p14403m21sxqi20bn7072zfee2a2wfwq33zxgfto0lrgzj3o3awnun4aqr6he5zvkhofyhvgw3gt8f7o706a37jmnek2gsrupcf0y84kiqne1710b9wbbgudzwttwksqx5tsch8d8srgorypavssomxkbf36i6a5dgcsworsa07sbeo1gcvq9y4dhe19u6e2frfol953erdh1c0aog78ry',
                parameterName: 'p5hcv5wl572qthtvc8hu1sgs5s06e06iwtclf18hns0u8zflx6on9tgzgtcbm1qeb57eb1pbmksgh5jk40f3u2a8m883pens4hlt3b9j9qehit5vz7olhkfsarpkwtq0j6hei05jsif817n76tfy0ftj76wfeij15td61imleuk929gjaa4qkgd8nclejyyke34019dsqa7v51ahligoqxvy2wey78fkx5b5fl2cc0xb6izi229p0sk3kjiokkenkn1lmqypsezx4dpak54az5dx0xuvt76zri76ae8fc36t0a631h2518s84whm0tex',
                parameterValue: 'joqcqv591tn41saf0y5zful7v74ojqdzaf87j4ebcksug2fvpovg5og36p6ovecztb7lqzunq64kbg9kxvwrwgmhw4l2y5bhapdza51u4ohuk73hp973ax0hemecxuub8dmzi9x4ui58dx9rxaupxc2wtcchflbf8b3udvq7f83wno38rmtilw09z2kr9v2r9kfjtla2x54vui2o6gacy9by58rmodlfa4gl4t5js06l5jv4vea41dssihm1jl7eroafc3gxvkcn4smduutklblvei41elzr2ziy0e3bk6d9deer87wrh5t28n3jdzck3itnua26f9nogygho4bd0my91ev6xawdzw3l97spft3pu3tjcxhy38ekn596xmprauwl9otavibs6a00ue3w9cc5wdwlhr3q1ue3lh2p7pc11c6390odnmv34t62axpwws2fpe271ioxgpdes27gei3zqg2kk43x887i7ej6ftehpaexceefvt2eo3wdsq345guf74le3ji67ptawgi6bvfk6qzziz2fbmkqe0rr43ixltzln9b2yarezhr1np663eltd0bnaz1vrqbsjz3w1h2ukc9fv1qd9hju27zo80evo3i8mtpqcor53fpyylp699mzkz0p4c2mai3noxf3vfvh8hh8o9ut5231ahmpcnmv77k95oajzn95xfcig32m1enkg0a92lg2bwyfuzgg3hiluigu0miwvu1x7gk2wmce4uoto2rjf3mqmcjs5o8jjqxqj1d9wib9vq85cj2txl4havbgnlh7fjm1zq0i7a1llao0vohhy4rlk3xf1xn12odqbgzdnsdl29eof56zsyufn7nir7bchqouc8j3l507auw1rk3bojd0glrcoqraaiyzpwqm9ybuvzlv6mrew9hgo6bq54bj5q0gmhb7wyn32qh2i2hxoeudwqsjji529jg38uv33boerejbnrtmz2641x6e56nodci3y8wxij03aexuhlqr9nzezxfkpz8c6vvtauuuxb2nbtyqx8u9md6oln3xdohwec3mj8534vz5cngldghyjrlbxmp58j4u6op6jpgb05eqa1yo94lo454v0uoxl7qk9y9g6cukty91ue9reqmuh6joubum8fopzf622qywdqdw2hi3ctffrjjarrkfdf3gqibdf4cki6jht0m8y6imb9iv888hrqg84kvcuvole1s48byv1gz6wavrhji2sqwgfs8b6qh94hzoydhmbupld3evaune2osnaxp2t4aaiw74tbxvuztbxh35p0ob7125defljq3ugcp2j7qtbk6w6g13zods06qz8otchv0t41nv3187zscu8ggjincwn1tbjja2ks39xvafvpqaqavj1gc97tlyywdelwdn3gzl76zz43fbt13na2rrdzjsbagbumv6rk9bjc4rq3qggukdxmipy5t9acdvsb9ho058k85rcri820aqrunxrda3k75sr8npyidg2gph9mo8zq0jjuxmsl7pgrx05zr8bybj2lwbqf9w0qng3t8ee0kc01d3fqiisa38tejcuyhq1eqzv7anwjd5od0twkq2o2zroujj1lhx8dynynlupoltiwbrrhf35l43y907c6puzzip4fxxb0uaj7ityoiuwsx60cw52tvuw4aqz4eau6da62x0r2i787kotsbu9e6r2nwsp8hpcgjqjmdhx5j3p8tpnopfrnk52q6w4zix3wxannfru27vo1n32bk5j1p70utpnh5z4yj2eudhb6eghsmmo9j2m9fivhykgw8wz388ybi7lqh2w9optp6ileduvqum416qxt557o9k47yxe9h9kre2xes1pk7fzlrkcchd9aq5ajfejymnzqr0ymio2qfqp4umqqmzvotcyqda5adbstfuxhy0z74xhipmddxfmnhh72dne130nupo8maadxq3do19t5evetuahdcanq2ji10ypk9wjbdj4f6obadex7wmbcywyijeb9brc6x0sttbfidvj0b4pzaw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '5lvkix32smfitbs0ci4wsjjoalbcmr4ey90kct32jfkkztvj6u',
                systemId: null,
                systemName: 'g4xm6evl702dn9whz4sd',
                channelHash: '9mf09jphfuylqauyg36wrdmwm8lo4gyaaxqciw8z',
                channelParty: 't005jt3jkece8igqx0h606qdp71j8ppnw0tw5n8c8x5pzycd5dbw09ztb684fdy85r4zfd22w1mq93d0av7p5dr1ahvftwyd28pf1ljuqgaockip6byl2oqcfqtk5m5qyl9swe9zgjvxuaunnjplr9zgnme9fnpj',
                channelComponent: 'p2xodg1hi4z9ctorvy7mhhu03m5arnot3pki8bfy0ifesqvfowfkjwm6sv7adihuby9mpoe3n7h13z8isgsjjufky6uooi6lndpx2l9qfj4o18lc48jetd78mxe07jhrh8uy35k92xfjikh63d2qv97netidh5rk',
                channelName: 'fd98vjprm7lyfhxm6ves24nclynd93xmc7ayhe38prblz36qb012kxrpkzitszobhyalbpcmnyug3tlwzbtuf3xy63oqitixql17pwsuxsv4kjncrf2pdg1txkoyw317ws8eryxe2ydqxn7viqnhimg9z5e0u19a',
                flowHash: 'ezzdhwj6gdmgr9fss7mojuc0cwkonm2ku9b1xwi1',
                flowParty: 'lvkpt29exh3lwtzvbolltf7zs1bg6s4n0yhjudyhs0m7kx3v4wfioyh0mf6lxcj7hts59r8n9tj8gyo6b2xk2ikddbibacnwjhmq8f58n52bwre49bq40qg7jd382ff7rx1kh9unlzpgkyk2uza8rsulpkumrdhd',
                flowReceiverParty: 'w8ge7htssb1npu7w3846664lqxulkoaa8jdessbvn26zmmi8d903z4q7wowtz1dbu3zmahigqj47yftldrurhcyxzdcxi8kqd4u2904w9g9ugoiuadhphed733d7k617b2omh54wboj6pjbrdeeow8jeqxkom3mg',
                flowComponent: 'cveud53ht0bhsac5ffqx9t8ojr8rswecskb4cviu78oqrtzdbyhdf5gmqa7kpvtm5pfa74eh9w033o50xknifv5wdrr4kqz2z672t9ijxcb1kz2b5zjl9xokgxscvon33i81u89dy4gu66rnljtasj956jw4vs4n',
                flowReceiverComponent: '4dqkjnkknaw64ogy94ejgxyf8gsx8hh17428f0cmaqbjzbi0h6u6gxnootbnigzsn4w7dhuv4k4nnd4lqonuda7helo4dg1rp5xatyv4kltgkusewvfwgn609qfes7quux8l36skns4ufju1lebv7rc7e1i1trxg',
                flowInterfaceName: 'qb5bzm5vmn6o4op0kmy8cxdjnsiho2drmufehxdzgpehy62073leirt19ote1fvv4yc81nz6feq9l0gwr79stk36ilyjqe1nzfzu8iteymbsfj3tkkh6sx38rizaa6a1bf3aqakfaqrpzvtd3n2avnwuruekfsi0',
                flowInterfaceNamespace: 'p2n739pezkskr9c5ytjffsdn4wjfkmj5588fj20akwaan12x606frn38kes74cyo5crmkjg16ud2v851369a89r8qdwbly6wdlvvyqocjzk7mpjy25o0z3s09slc9fm74pbhiomtxtntlv4w7xe1ztmkhobzy9kv',
                version: '0x7tst14offe7e3p5wjn',
                parameterGroup: '3dlmiatn105p59114l43mp0con02vd6xsof1sncsr7xsk90oevbmpcekkrnfsjd7j32d9xyjgo2vwp7evq1enda0p66r54jejp6bm6mm9cw0r31k6aoesu1jngw7o6918l4v6ivy7i0crs71j3abqogxit4l6usn7m44yf98ruil4vju8d87uaorjqo46v1nkg0ixvvse0f0xrowld7l0aeh2ed1tnvkg4a391iw2xlfe9wawm4xyrcnpo4l955',
                name: 'dunlykd1tnf6gn4trfn1dapfpso9raznq0t6b1lyi6rg1gfyfkmymmbcm52mybn39og84h22ub619jfhrirb741r5vtxvixjpvrqpryz08vq94jhjzk0odhg23uefxxb86xlhojqw2kc7lpi72j85nokfghz5des1bjfa5gminfcmpyb50b5z07hjtx031nt9vk6n8pclhgqb5eisir4e4w8iy879mk7hpizhcb9gypk10uusgg4ejytk6f2c7938v5a8h31qgyp4nvxrs9zb0f8rtemc8uiv39tht9ptnw7y6xtdpqlc4sfhecegdf3',
                parameterName: 'f6jvc6o1foo7u6enxyyu10a3zvu2ydj923243dw27dvji3wtqyqp9p3yavypl9dmpfo87yl7w6d2zbr6un3cf9ajbbt56ebh0qla9z8c5pp0lflh7tkwlg1p64ziacolhxy6xn6ldikljhqjhbzaxatkpxvzzsuqwezybmkmbdrcjj9rc4ojewpmviy1h21vkjrid73ihclqhf81qsjv2g51zl1b7ieln000ox6qhj8qxskd7j1bxgdoxub3dll5ju68m9rjrzuzgicel9zmr5qftn6zoi1zuscoriy6n3dq7xxtxj91ubjrv4pzvodw',
                parameterValue: 'mphul31g4tgtx33re935bk25wtdqwaqi3fgjblkpg8vnxo89n1q84a2pvc65vcaq8o2ixwgrfpxxomz4eyy23r4n63c330frl4vgbjnnue01o6i3my72ah79fx69xfh12vik4s1uzp3r8fpysfu4qgd621g26t56riuy4reekznrga5ktz4sb07czvpstlm5dvztwwt8ompewbd0kyz5n31gjvrw7adpxf6g5lr99jjwk4saxcztnv4h1t180qdx0m2uilr9udvpga3exsdxoqx5260mmhs1yypfpbvj6oeu583b64q140qedpo25iv1axe976gpadvlhunffz4yh4g5d5pp6hobex2ulodksephqifutgscu9k4345ctvoh5r3mbrv3q9kn68f3wsrno672mbn0miqqtqsfo9wzvn8h8nxu76xdadumiuoo5kdw8yaaa4ynve4ox1lr1bnruwe204fkh0lp3v041f27y1zeqmykrhcxij6cszr17bqgdfzcdi2581jykgdkdp1ajmh28kp8qp6c91s7ztbw37a6vci8h11qniofp411dljq2tkuqc8pd0152325f0l246a4piz0sibq7zefxym9oa7703rey2rhgrzaoda73wwnhq2lt6rdcvu8y4h5upy48um53vftyzfnzev4j2jrzayjq10y0u57z7fx2tw7jutkdmgqydb1psp2ocntc6hccyjfyad2saq7cmny0gkdqv4171c29atqg3dppv76uprxqqkuz4t15ctpnvaxk7ce6z3q2chdw87wlp8ac3xh6azhozu64p7dv196mlq4ib6zyyslzvy8ufe9pid5970x358i5xdeo6igaw7u3lyi719ghky92wn8jd0zjcmc18amcharj9xvnkkziq5bpiddeaakood91txrnvyhk8t0lnezi570ccpjdycizm8rir3lqz0tnco7wwqjnempsye6cq8xc7w0ipozjz2xwqz5hhbwvg2xtyeyiio6zqixyqazkexgwgfrpldhblma4brz9flqtrl41vc7sfo8nif8afy0l1beo5wvp29g560v5t92zq4wqjwkdq08t5qhyb1rgdwoix4ixk3g6jjst473sl1f3jej2p044fj0zou83he080lj1njpu7omtri9dt88orb5s8uifog3etyf0dk4us68r01pr2udgfx8hlypibbiwvcc30vdh8yxpqd61hzatmxk53x38w06ful6hrutko1g124b9c61iplshz8qz8ryozx3zkux9ee0vmvsvh0ahzdfjsc16ng7vb6eilmylasvp1kcfknk6syvf8gpbw16yrgl5xsbxxe12kxahho4fclihmvvsxxkisltqu0s054t7w3y2qvroyix1zc4qz3gnr6jeeru5gxo9jwcv2394z7u2frhmru1m1d7ff96tjh9lk01uv0d5zklwd47kw75ipfd4wzqceg028fb22qspzwd0961y06mmg7jyoohcgxxo8ib84q9asy24lqwigkvsulcha0gz5oajipezi4rubi619xyccz6e82rkjvap383153k1c5m04mpzqe3gmk9yu2qe1ae7f5ooeeoojfw6uhvuembajep9zeo0dxwnzgu3ytgfvrfb6x5ni0nt1qg1du3ssoukei2nz8v1kazovdkzep8ma7lk0z29cxjegblk6mv5llmtn092lf61rz1yhx5j9ynwiy769icp9jte0wzk9b16tn6vnbuc881yst0ku3v831uvbv5qxtx71v4u2rr1ba6cs4h4j66677y6psjvkat1amkhi9lda0r8h9q0v18xtxxczw6n0mphzwebj34xrwvdnwrdfsiv7scny1jj1uvze43wygruwe2q4vxnu1m88njxtt7a4utn4aav50qcpu354jmr6tdzwnf3ae8ql8yqn8knw39t2codqvjtgq589r7q1pdnqyza78trfnnvh5xhm26uc7pge0o5ji6oqiheo85ks55eem8fwgueyk2apqsoshnl21poaqx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'ig8lbuzzibz7vhm340cwpaneg9tvsale2oolbdsk1nbd4hsw5d',
                
                systemName: 'idydzrbfvooqinobs3do',
                channelHash: 'o8fea13u5dv7unp1r52fu0t1max7lef4331iqqsy',
                channelParty: 'jh1q20qznqwzrjmiuil8gufmr5i0krgfkvp8aw3477jgo3n3psmxar91mwne00a6gjswmjta9lnu8pg757njrb42kma9st31gyyqbdt6n5lkmifax72po8xt7j2og558fer55av87bkvlwqyhmxpobofl6uogn15',
                channelComponent: '7dssoqwprm455b48ath6p0xne0chpvj7hqkntiucqexbv1c1qyhjjvxm295uh5vitrey3wbwy1vjb0l0y7p6puaeymp2okqta2aqg82zquqmbmwp8mrp73zxeub94hgpj8ew7p24ruc57i8zdgitfo7r9g6soerh',
                channelName: 'cd7q1hfb8ksyai2eo3mwkrjt211f5r9b1x4l6xj1ki275aioui3yv8hs5mfs02lz7pmtpzorkroep4rhscj40lep5cjjivmftjuomeyf1wf23e9rkoyrflo5394bvpnncqu1hdggivpean8fp3twn4dsrjtn8yw2',
                flowHash: 'evrefixbpe4gicqgrgbd2kr7ftys10xlpduyt73v',
                flowParty: 'og2x7qdfxhv3wq16sy0s7vx1zn47xw3ak6qof2o1lxcfttsbenxsei6xekyfrkg8gtckpltmbj2ixc5sh5ssnhbgvjar8kpc96kxryi9upq6erp1g3ivruvxfxdlsplb3gwkq7w7tkavbljajypd6zjcs63vleg8',
                flowReceiverParty: 'zfy32gk5d7i2du5lemwrplony846akul0gbqdmdgitarlgkat8mm0f9ksbxwn562wzhxnj844paxtgecgr67k65s0q76lhqusq4az451antrlhms8apwjcnowh3v5p0ws56ermocb1zm9z6eea1tsmtkguusnclj',
                flowComponent: 'qoy6a1yjel5s0o9zmlv6cntllup8g7ji75pjs0a3oyz4m8xast41yqfg6v6grtcxlnisguqtrqosg65s6u31u57kerfpkpf1bolhd9oapjnjct9xq9m7ed2dkp80o7sogwhk6922549i3d22n0iqv23jvd8ooncw',
                flowReceiverComponent: '50mr7c0sr8t5rulwza6xbrqwe0jqeykcn07tdsxrrstfj87ryjldvheq0kb8yshl9wpztnptyjo5flgl9x01qjr03uvn816m9j6m82qemksnn27pfwa7ky1cka6u6shs06xse7y187r0x3wln1avr783zs4wcize',
                flowInterfaceName: '1gbz2y2ilxlz81q0ylx6q6v7b3zzvdu33nlo48bvo8furp8to75hr36mxupq8anvyh9h9lp0ss6m794esopl9wpet7rilu3wd3f0rh7los7xjobwwguvbhh8txebs7iyjf0n3s9of712iid6inwgqhy9dlsts6t3',
                flowInterfaceNamespace: '0vfwip7mkyxnl9gu6tbo4ar7935x1zji42wgsidw77q6ybhv1sh524sm3q3pm83o3q7m3azb14fcgrhbgv245hflb9q2dgapravwkd3rrt6xc6306ddsyx6ucluk7ift4860swjrvk06rijk3gwzff829ubzpwnc',
                version: '32xu1dzorp1rm81s43tz',
                parameterGroup: 'g4p2bdyfo5t0oos03wpg1l807fkq3a00kvzuwv7wzj9phk570huymbwaivemg7b2u6tyvbxu9x6wof14vuc2jzwattrbd2xbc1oobupqv5dzwiol344ftf1cilr0wso0t2e9k3xscsbz6piq3tw79rbcnbu0qodaspkec22ifzyxmcyi1bs4coft4lpemxyckg0fx3zc3kluriyc8226ugbpcfib398j2qjjbgsxtrmvl16f9v5e9q2vjjofi96',
                name: '2qzzza4v8itcuyzbaq0gre1ay9k29g94blsrxgwjt8ygfznc1qsmfdugsulw12ejp4as1cc8h08d9116yd8f779mb5t6vqdmjqwrmwhdv9j6syfxulnda29q2wqfxykus0mhl2lh8celtwsh3ytle1uk87iw9dpxblbqd92xwzqtdprj9p38gzqlnpm5p6oorr04fako38nvtqe3oy630s4ykkfsfbijbh76f4g6pee3mbk18rw0ur7e92j6uvo5vp1nozwpbau7fo5cctsuurg8istu8nsv1wc4nv8emn4t5vb2m4a0ufd0ewb74ozl',
                parameterName: 'cxk8huemwdubz4vmt1wsla0cv02ohx9retw6n8g4f5grmrno2ny1j4ybw3bygrhhomtiz20stibsznq54fmt503ugroi11xyy6lcygbxu5m374by3wvjq0zvwk0thprofpp2jp8w1mjb9cy1ni9rgddqhdrvpae8itrpq205utr40h55y4ci9io55ttsmkdt0bfy5l89jfp87ywiktdj1xl43m5g2k64mkyldd2g7ota2sxr10zofhgzpoapmjarca5sje5sdjfg4j6vyr19amx5jlmc8updvjj5ne9ooude9a13nekk589k3is7wjqe',
                parameterValue: '0wpq3vme1qzidzj7c828h73njyb9r5j0s68490mgbuekyf9z7nxbwvlsvh4i8r968vn52rt8xk4sxbxgiopeqqg2l66splub55lj4cpk6ajeww4hhbxh9pkhs7bjp4sin1tpes4l5zoh5f3krfd8tgscmzfnreiyxi43deokxtyv1ytnldai3iu3dgkwqurbaeqlv0axu3rpsxkyt8pkpcxsvntb9hcba64w6wmoln5txkcnjqpcvys4pn5n1w6i12dqjegzirmzod1obpzcgh3igpnfds2qqxlmhxv0kx8bw0axmrz45aoh63qu5fsfg9hea52gdngsyxwy5tqbff6wsjbwsbr0ubh1qc8q7nsy39xogj5vvbkdgq3nn3n7j2x8xffyy1v4n957p11pusoee5pax4up17leljjpmt4ce31ncy0k9qkah6edem3ngzxcprxenb4rk4whjct3osgme823eyier5leuqj1l49qmrvpl3tqonyyr1jtpjm8x59f4pyzgv9cor0mwjs8rb2i5wh2aysfrbub9hj6qvgoc3pgq68e0h0gqz4iv102tg0qxdklntfd5k9fm7seo1tmikbjxfdmgkze5yypacfkzmj1ux9dcxy0upecjnicrr5p1swvsz5d4lmp3p6u761bp7glwps39ut8u7b35v0vprq87t0is01vkm6mak8o1ugtepl89b80ikn0vvbw26jj0frr1lelndvav95hiztdmqhbebqda3y8p5n1t6e7gtcdxd2dfzhtzepf5k52uytrpmdi6djhgyc784v5e7dt4jbiqez3j35ir0y7megopyfo108ehcivf0x6dov5aikbrrhi73wsf3hc8fwgf4qwzn2mkd9zfdbx56bfwztx242wnlacqvnu59kwxy4g4zt04wldwjzuk4nbfk4mt194fsu2kbk0for6ywp04y1nhijfennsyhqmr0qajhz0k8wi7n4o62hof3aw76g1dd4d66upe6u5cmryhlsndkl35yv5uakknajd5ww7qv2fwsxolk2ob846ork5avhxlrgxeedw5by5kgfp6ax7mbqyj1g7nlbwhzrpxs9241x99f5qi8j7xd096mixhnq3ww7gdg8ecq3yqz15xozimnfsr1pw5x9yn9r1ahdrdrfykzfivyt7auhh96jqakcl57cjracii3plt6mo4djdyvatj1hlexxqadp4nz560vots20ma1uhq92rxwsy00vlv0z2y6h6vhpbawka7j9s0rmc7fumbf4mv2g96t893suwik0ovk1uwevhoaqd6fg34g2tm2bm8npwiptewomenwbg28k2vm1a1iz5fekyp7ab5z4bkkmzbowk4g8jvjpopf1e8nwbwk7avxwfsirm43pfgobscs7fla5wr7um986c7exw8jqjd9cjv50i8p6mlu69shut07394mbpnrk1xskdozps4lzbyntdqe1dkqy7hxqa9xemlnmkd8tedq4btw8tpf6ifvhzdg2rj1tmufqgmytk1a4tb30xh5fi66f9r555bjgia5dw2ccj8i62s044gh4vc8af4vqh8pfvixpmgnz0cbjrvn1p2lvzspzdajpz20okmjljptpesxpl6gysy6z8mt9b22tixyjryylwd0y5d2ftauhbv1noa2zbyw7evalz7qxz3wagk7perqg83uqjlqodqz81d8vhkl6ntnzm75oy7dvmquvx69yn98x2hfguptagj4em2s8rxthzmumxl5zwk2o1rbk3s6mi360x3mnqme07z2sh9ogvrc4scddam2p2kbe7ceomga1jpj3c7tc8hqmuzzoh3zfrlvnuny4s8y8sqnq5qoivv690ytz045hnsqlvuk6oa9pkeixwqlflc0mdlhye83aytqkta5y6y8j8ycxhalwniyydis0uerifkz2so25sa9ifcnjyxv3a683f1oh90chci3iojpg6stcj8k2yn2wigsl9wqctvyvfi7pbqbecr4b05t1apm268qf561k68gk4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '7mpp1f803cy6li87dkhhppixqpa8fjidryi8viav349bcz7wca',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: null,
                channelHash: 'gr9uwnj3en2ag8bytermhu4jxwlksbzybncm1c1h',
                channelParty: 'a9pxykybvy1ar3h3391khilk3rvrq6k4u2f1aev2kn3y5u532a8iztrxahjlry3m2wjldl6nhn4mvay851sd6r413q7uak4t18g6r06f1y8i7g1ftsxxprrfmpbf8bvkcezwflr3wapqgl6eqrljlb9upnsh379c',
                channelComponent: 'oxlrs0fad42smjlcc7oao7zte7czm9ly72hxm5518ch6ie8x8qe2rbv2z2gmyhg345rp9lqe8r73d4db57jfhbnr1j5279rc8niy2fyx2bb6fn4vmjx3b207ywmci67h26inzyqtd203z2nbssnourr1sbmdp636',
                channelName: 'b8wmpcyjtaqmb14j5lvml5vrqie2dupfls58ioyxobuzwn8km2y2m6cc4f1dd4rmmmjgqjjq8c7ch3c6hs0f47n6ti8fipxmhxtjp63uxjtp3sbip416bzmd6yi7qygewdbkyepobvum5bkixb3uueobtpgcr9hz',
                flowHash: 'xz7l653wd7telp9zw90v6o1dkvlaj3ay66drixma',
                flowParty: 'cn3s4myhuain8ns43hfbwvh82ytvq2pog8i1w6fu504pvpt0m7ru1wshyrxfjgpf9k3h7vgeyw7karrfq5o9l9dnga6bfovfpfvkw25zepncjenleiumgmmwkd08g9jg8b4mcgrrgbc569ro78re42knlu8l95j3',
                flowReceiverParty: 'k56lfrd0y4e41xycwvv9lijpd7dhvo8dvvy5mlb15npd3y945npa875haxs03eyj5c7kx37tegedggx48mocap6wojhlfie8vfk09t7y0bqws0e921j6zadi1taauu0gmyyvdwu7422bvb3q5uu3fm4czat0slhn',
                flowComponent: 'z6r5tbidzpz4gke4m74d3dw3y4rw90k4u84w7hn4rwd2taur8tcws0f7gpzr1e3ag025tu4txzfwdazyjnksg2w7xv0wirdqu7p30l5176m7vckedxggqkezk4iui8dzo37zka68lm8jrytkfh7t8oysuqz3mw6n',
                flowReceiverComponent: '01dfqraed5z9u5uvsjocfexymwwk8kojotr7buf7sepqy8cmvvyc5pw0882hrx1fd5emmnubqzgfm35p5ejusxnt6ic0fx2qupoq11phs56bypip7nqe3hse7mitsbqjmk6idr25wkwsl570tz77ujja0mwh4pm9',
                flowInterfaceName: '4vknfunl6zwx77d91uk7f79bzyxyv2dh4orilwl21jylpe4gj84pkrm0lbatkskk66j6ke445niilqiztlg93ac35ohi0qmj046d1kk4w6l2v7d17j68f7yqk3evz4m9kb15b4zh6pr91k6yjd4xa3o23mkh8y9l',
                flowInterfaceNamespace: '4z082sjrl14lgabbksrh3alo328jgsk3x05keub0l9k8rxutxcm1huv8xyw085xjku73d849x0btm4u8ror3o3l9mfeli514ll8di8s1mue6y8kzmzhxfe1na5brqbswtlszngvtcw023tryzaw51t7rds22seoh',
                version: '2v2u1evxkb5uu9rtltob',
                parameterGroup: 'nyx3thgt0gw9zbhcngj4f1txgdypktsujvl4nn4p0i0d9njnqokd1anabelferk4d5cq5m9avrib75xta720iz9fce7kets8ujlbkr96e59d7cclhu0z527ityovih14kzgvy0osh7n8nqtww7on8yw78k1u03ejvs9jkcef2tmtz1g6ihuxikotkm345jwfze5qg3fb61eb8a9xa5hqjgbwwjbiv7hyulseub6hnki7p7axh03ofhlud17g4zt',
                name: '0w0nqekv9qno560srkux3xrwbzlaola4jokcla6qis0jmdgxj10mk8r4e6jm2dgey8qvnsmx3m0gowkgwff87ku2obp9h0tf7noe6nt8oa1e94tu8p8cqg8p6vo6068h89frn2qhqjvq501yn6bljqbov6lfqrlzfm07q273zeo21klznwkasb8rdmjk0zzp5xhko330kafuq2hiq9umyd6tt6xfj2mm2pbabbxu4pbjuijepwadkwoe1qv50zefu9ipmw9qst88vmmmmkxe5xj18lximf3ikvs71e6leblucztegwtmenehcuo6y7d1',
                parameterName: 'jadsltiwz5qtuypf43qdemy86eakalqk9y3ltzj6tcbs1aai9vlffg18fjlw5k2flhzgpdv2k787kc2iq95j5eyq7lbtbiovpsfqait4ptzm7lppki15vg8bakmbtjoloobe3834wcyc4rv6w4d3tlr01kxxcccn0atvugw0u54vjlsah2rici96uwkf0lc3vysyuitm36ikjtdy3miqyexjvbqnea9ke9ad5i9riugbuptcx7lwjhkzyzaghzto1prrnry56gnsagyowslac9aau5gjl2pgubfhjzcz9iqfft68bcyyc04eqfv5z93g',
                parameterValue: 'o4w7kgt1ge4g2g5tntddb03a5zhovrgaal5el60ua1bcdut89mrfdp24dw3kd6it6kta595ccjez6h0kb0ox4co4zri584qnxbfayylf6rfvg579bj0zemelr9yehejy3ny2sl9euud60o4s77zszmetrcn8uvzh2znrvgrgge2a73pk372ancdeviszpkhbejb8r73xgte9zzxo9tfbgew7w4g8iro30t8uv0gymr15wnpxqekzjvr1z6bcd91vhhdqlfkn9kwmigklye6d9ya2nm756wz8bk19a9hysgc9qu1hwlv0e6dtqmpkaecbsw4cyz7zylvw9j5d8gc6ildxmw213jion3tipj7gz0um782o30bgv6ugvnhxrugfrhxj5rpos7gtyke0kku824umfmprs4en4234mu23q8b5awza13ak72k8k1kbilouzbl7v7hso9itp7m2ao317ebdx5yxshn6hzrxslxexve3c1b3ob3ytqylhrmazpn018xcyyyd8xd2larfws5hsqwq2gyuoy5t1gsbe86k357foa6hud8zboqthrems540khbcs2m81oh2t3yp9cr73a5vfiiw5vaeyse1q99rmyijundmcjhkmwgwg0q3sjgfqv4khxa6y009osjot7o4aoeyxfrydq5t316053gh0voju0tgehf5kzdrnf8gw46d9xjd1tujfdtahg7xaop57zr4nasdd854z1uqm5b7oly7v5lv8znegytzvcz5seu1otgc3v77vhxaa58vmjwg7oxngom1g13qkddexl9qzm793kboqr6byzk5pfvcifwe7rsauiuv5n53sa3dq8onjp3u2ljtnh1lyqz85c1dgemt4n24gudgl5nfg21wzdw9n3tcy06s61bhsbnhw4xl8q44d21hrpl1afn25j32qaa9i8bbxy7zezs687y7cfvtep67p3y0ygu1edpr2xf9l9bqbjjigpbnoffbimx3xifp1jzju81rrawmz3h5tfeqci3bu288jfvami5ppfr0xpgosuotzce8z4z6gqs7yy98iewuuiubxj74d5u1wfoc43co7qq9yjjpka1ysknro1uo8iaqavuxm3e5sv8cmbrk6y0lr6d7vvvpxmkdearh4tcyc9ew2rkcpzh0svqsh84pdctus7f5itj0bmj5uc69sc6iebh5989kkz320r110dgcts9qyclyxtg36c8fb9th2h2f41yvfogfwtoheuev9gux5k19g4st3gmgmmry1pe1wzzn1uieppds0091495ckhjv7lav5s7w01bbgzfh26h9wo1epz1p21e5zs7lah0zslckxrm0oohtvo2tjqkdet8boy827ufza11vnh7uv6615d2y4253ign28xe1l7ccje6m4gvyrcfj5wvwq37haa90823tmwbj3y3uhnuh418qjanqaz3zgp0uiuf0fm6csucjdn11hi0rgmte1o9nyv588s4m2wiuwsfdkocsbqqete6r7gd0roxwe5ov2d7ttxuk3v0x6opbb0sjwunz1zn4nmee6r857za10mcgbwq356yb80yzfff7z5e3q7lf4oxyc14695bxn6w9f87cr2oh5xtr2r3fxdrbjirqhpu6ly8rt07hn7az3uzp81w2y5vajx7nnnj7qjhbig7wuacean46my0zv52povjhb53ks3hdll5li499p4muujto46z9a5izfeg0eby7mhkg1iylysum2f98ba0vy43wm31i82gwilo2a625i65q9qs3uj3553394x26c4plmb608eboj9sfmxxquv9pnzztlb1tvp56xubijapq07n1ent9hunf33fh45wxxlnmjev2vscoojhsr7jnm43ignp2s8d965hju21cfoqatgc8c7am25qw82t9cqj8a44377p02so6bsodrdx47vjgaahmvtutppjvmyetil6uaexa3ccwqhd59daexg4ui5smyhwz5vil9g5bklp8xqykpy09sl6z0z8eb6elr0e5ap9n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'rmrvhosqvvfl74crrf1gwzq8hhhe4rd234qqex5nswhxgj4qw9',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                
                channelHash: 'atzi7bad7yko8efx9zsu7koh8d9593blhwbglu2a',
                channelParty: 'o6o9qczxqmlsxm93j5lb2s1pala7dq8hj4sner6n8yrpfan29mlfln4qvlkhyi7hbrqm40yh286msr0yeo3i1xumzfntjsft003phi7ow32zgmrx2s6tp1px5aoaq36ysutm94meoy9a8gs26ok61gjyg4bvdons',
                channelComponent: 'mu8y5it90e0fn8oo9xh1gv3kr0sz7mliqwupbhw37mjvnyrh0lbn9u46g56s3olqymk0ghlgvm1dzwrxlck11rjiztaq2m2q919tt0x9rgc0tzc8mopyb956gqh85g0eq9ai6to02ruj3pozp8u6h4q8acfskqh2',
                channelName: 'i8k5w9z79tn3gv32pd3yib7ez4ov9ustvotadqqjp1c85d93zhnduwf1enaxcmzvqkyqletqem3dl7da90fm9igqhhbzfz0ghu1556k6agbq28qv3y5ykg9xhmo0upgohfhxcxg0veiqpol9xgeeky4phlk9uh7q',
                flowHash: '154pzjryftk6402yu6uo7x4y5frflo3k7h2p5kmk',
                flowParty: '7iwo3hbxv7sb1e9pjzmzbaklixawuehjrh9muzhssqqueb3u48unpp7fsxcijnlk5yfywrusdvkl64e587odt408d143jd9rattlqlkk8xlechegismshn7d4u1ltt7z6yul75ekpif9rxxndul2khjoe95ic8z1',
                flowReceiverParty: '2plbik2w8tjwu3vvwukyjxygf6ucx5wyh5t4lftcs0brz0p3hf6u2vb7ank0d5rwthxoj6bd7kw48kp4lrk45gy7f2nswd2b9uagmoz4jov51g018cbn1e05vmxxguzex26ibze11xmrmk1xbo8qx6r5k74mx0vk',
                flowComponent: 'tbldamzain3bwj2bgzxekjk75f7pm006c1npu4cey8f6ih2nqk8a7bvwidskxo8voakfm89xs69h1e939hy210jnyn2m4qoeauozo8vnlaku0jh3fxjo6fqp6cazv18of0hguijqbqt3omvjw6h9q90edl0d4d62',
                flowReceiverComponent: '1n7t0fz0j5x5lqb1dbb5aiml631emuz0sf3auvxnj8ywz06r6vfm3mrelycoyft27adh7h6x20456m3n3v3q3juunkerg41wi8wmizq5tp3k7x2p2bn3zv5hbbfxzjnwixnq0p9ts90syqxoapeluzgdlwefg6tm',
                flowInterfaceName: '4ptru8qt2bllhrjdmexgiuu2sxcgmr6vdvhf4caf1v6y4k4fbrvsvw20gaw8euy92c7f4vpa3xocek93jo207j6ejszujm0cx2hmea8ve5lb6yhrkhzguq8t5eeeu06gco902e6xf0p3p4aacnl4sgh5hb8grukw',
                flowInterfaceNamespace: '5y8b1fhfxpswwba0jisddu579y8dyi7ufpgn1ngqszm45hxg6w8wsr09t100sfq1gmnloar3gf3ybuere39brzrq430kjh710tq0fxxmhkcs2ruoawevimtye66wprfbzit8201qdyht1c0qsqxuohzarvbbk2he',
                version: 'zc7bzbn9utctj8gak5oc',
                parameterGroup: '570y8q9vm0dk8jgbuzf3d5y4dksdh0ajgb3q21qykar3nbm2vh8kfem58lkm0pgaryu8lgo6sgwi7fyzvc90etdqq4bk4fgep0anrsgsxpyaqb97bvy2c8ckiyyn8zdsjo65zqpvqzbg6nzb9tsfiijb9njkgmib3dhyjq27anyzduboi2mdhanusjexlpbr6qmml589i46xacna10o4ujvymvg5mxf9u26uw314ar1u7rw796fvadn2vg4uqdc',
                name: 'f1uwiuspyyl083li6t69zcj3gcp89xl9dvxi3ls8z6wrbgjm1ohhlvesq37keyh26bk6jwz9rslf56ji5ftci85kr577z9towpok5nu2ob0s9cpr4pqfxkmx8k6p38ml76pfkx8mpzz028se0m83m47rfe6l06z5y7yklmtgtmwl6es9jw60089w1zprb5ti83awpoxvk1ohy55uhtrhvkw7jipxkilprw6iipt6oicgc2tfvtoq5kqnaw5p8dheqfl4oiztrc0e8n89zv5ccxhf96w9ecf3eazggvtw3mnsgcqqal7wxye7jsaiualg',
                parameterName: 'ad2q4noz2sg5p1l0ltn93g1goe0o8r781e41xd9mrwv7dydhti9la6gd2ig6c18cuv2libd4fafuhu4qzu17wdzf9syg95sn8kiodavpaix71csdhxcbmybix2ajxj3y0ulk0hd0chw3fni7240ih4p8xfd81tj2dn2uml93dg1ytlmt5iflvaybf9dzs4r6uqaofsjx763hges189z6u8t6ejjq0d2mv0rd5d3t8xfwrqf92p49ai01n9fk9s4op7f9i35omx74192sv5otdvnxgdvrizr2x0prkp67ccdj0s70ptc0a3xlya7avi6n',
                parameterValue: 'bhy0tksg4vl6n3i9i6xkl0xxu4rw4xixfcg9i00z1ke4inzzu77h8lw0eggbza0a2eyqe4gewiba49a1rlahcg3nqvvca44fiv84qoe47lfamaruz6jy8zjhan7em9q41d7k20zqx2zxw6z30vvpkz9b4xjrnet6bubr8go3nouvr0a1dp0zr5ho36mjkpvhg74hq8hsfua0991bt5oscv2m5etdnz1vw21nyw686z5azih82qcv524wzlzsoje618i4lturoofrc9d7r1lkc0vdsdbjcqi5p5tlhsyxcyjig1vbfcgf0ogct5tqe8hqg7131v47j8mofxdt1ozqoj7gqa08r74fw79h3ys53t88fprvnauej86tg21beiwztxtv1fa83hg7m3r1f3z6h0zol7z2ppof777hgy139bf5y5wlh6ewd45hr2gktyli4kc1akj7s8hsw01zk6if3shjmzl7g72ybuuxbgn9i3rqlisggpa74biwuqtg8eu55gweii3i0qyd0jnh8ua3wh1vvmu65u0p2iuh9tjkflrdlwpmaymjpf663i2ggsvbxg893k0b8ll05n300blsbf0ob35lrduyv0jappa0z9473wuaa038hr1aa5xkzt2kvr43epbrfjoge6ohvpqcfvlp7drd8uud7dx9hzsruiwz5q2hjpjh1z1obtushs78vhs97gz60q4d7meyauva6mjfyt71jj9sn0bzpbn9yqczcfp3219bd3cbiu2uekl7xlnw44si86az8jd961akd4muviwnceiq92k1r3hwb2aj7i86sy8x7k94dgv7wfku62y7i57y56qylt678922l4asqefy77vx3m6u0qugw0js13cszp2qtgk0bpgkgbvny1j6yfcrvkwhwdfp7d54vxcw724aqu8jovck55zpupa9g77jfbpwiyosu0ylw41475y0tsx8y7ftq8dj4i7asdv7eqroymwiivzupg5ozklmpszqvka60nt8r2bpfqsp670fzyvdr01riju7l24taud5br7rcc1yeblumnr9y2y1iagvwg262uzlfsl1lxze4820pgcy6xudomx6khw8qyzrm6fil9269kgdjs92nnult13tlm7ay47jwboqxe6fh39wyvmrrm96265sbf8om86o9v25dysd4co2je52o4ftgnq6t3x756eq9782cd7blpf5oogeeft0f3p4sdkon6vu81paj8p862j8zoqflsr8xaxew3mu46u5nxd17e67qifzri598vggm3cffsx6lu4tztrr0911d8chzw1tz4e9r3bbmjufmtddim2gfdpl7vrzuyhanaxj4b75wyd8nn79yp0ersjl2wg5cqzhq54achk7lwvng87jbluq45nzv4zynmwrzo8dj0hfwwsypn0rvmby6ocw918s39kxkglsaqxnixmpknmjxbq6j1kg54pa66xga54s1hq3g84214ylp1h9p3a6ezetqhz3gnahsa7tgxdohpugpdype7e7omf5ba6v960pstr8o4egl8s59wg0ursdqet6cw48gvdl8sk6qtsazetme8lh8tbwy67wn4ln5futclz9y272ox7uf49q5q93nr2lyt9psk1rgla0llpaoj6bgokd7zd77c9p840ay5f01m26o35vpm9glrijkvs1h0skdp1dzds791kip2om0guy125wu4e9ze4a2siuq293nlvjpkphal1urrz4y5a57jwhdptp4s5kef3fyb1l91jddzpro9baknrak8e2w0rljd8wprrjzv43tn0ripcv37ars8h9mzp5qwzare7pf6tf846v7je0jy5jbha14iuy9eftlzybnwk4bks0ms2qfzej2v45a8atalq8quvlttqk4ntqsimgqd2w6uicth1e62t8o1f7jir8f1j721ar1j4c7wpw0rt0l81nkqroetyymvqcvv4a8qvd5g8rgicmn5tnbrnms3q6lcyo28vwx8974k2hom56gezko8j5jhdyfzoi981e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'e48ibeer6asjm8j0hjvsw2x59eipuxc2ja3pt7wlniety6b8ef',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'y7b8a65jgrkrlijododb',
                channelHash: null,
                channelParty: 'soriwryrp3aspkbvw2y7hu36phww1o9uf5xywz1qz73l2amhoi0wrydtnownrk37ucrv0ih77lqvvcikvcok2qteen6d9b61f0lk3sm6qfzimsiji24aa8d70924qkk0hd3pne4s6tup4c0hlzoklkjhufuiyypv',
                channelComponent: 'xfs7ns9gzcob6ad18siwrsrnisg59nrbujmcvwo5rb2px9hvvdefd3l6ortyzt74occnzkms53wjhfphamqt066du4w87f30i5zl96okpjwjqal9md0rkxvlhcs3492zm0by9ihq9p3r1rr5r6a4ko26fmcmzx8e',
                channelName: '3ztf9851qwpkp1kw4i64ehf7w5td6z0tdjb3x1crghbw03a9xw0vi1ozzubtbo4d3cnj9zo8tue010u0jbexlcbyj6gpmj7az6lip65ljh35m9mtygwkscadie1jn1i1q2m9h09mfspdg68r526p84g1eyby0yy9',
                flowHash: 'g97chit8gp5dt1cyfqg2mfkaisc0tn2wapn2ra2m',
                flowParty: '1cuuifehpfcpmrznsnztjnuj4h9plrdukv8m436dxg1fwxipu1eh12u2g9ilef65aawaofw0a101gsisrtliak11pbnykq5yipb3od8p3phu0k94kp96veo0s0he3pba1tjkl9ih367nnpydsinkv8q5lxororn7',
                flowReceiverParty: 'ou04ukpr9ghaqo9n6sd2ha9uqmvx5ndfakaxlx960av6c4fc6whxi4jpwht2kfdox3vfrrgkiscozqhvjfwoqu62tcbddi19d2qno7q06ckbxakkvkhi0n9k329git92uzg8ymerg46rnawnq7l2wq2y6jp6mfq2',
                flowComponent: '2s461f2pim3jfu5fynq61ukkim4zxj9jy30tzthnd360xg6vsvld83j2gs1twu2z8crizs68u8221sbyjxqyfp651m5br2w0mzziypy6tv9zxg98l15uwm3l2ii20wbea06h5u52o926peswv10dsgf64uqy4ski',
                flowReceiverComponent: 'wcfx0ymojrr287odh9zwzmajfapqmpbhd2b6369k3394yj8jsardixk9ns1dtyataivdts82c8j6cfbzupops7l92778cbk9p4w9whq9jsxwezbxefsl1qvktvqal7jy8wtv2pfrwaxeets618ts8sgi5z9h888f',
                flowInterfaceName: '1t2itc0qgauporh576c81jg6wc9uwlb5y7sib6cw9rfgz0b6ta5p7skpurndstulmn04ljont0ll2h26te7w1bev67hmcqmcybesbbeu96f2luf6bczccwrqcfwhmls3ng48j5dbpcu20xfoqr1hdnlicb8ss25l',
                flowInterfaceNamespace: 'rawn2vig8nrq6eeha47dgzqscjxcy1opyfmisnxta1vlr5bttxnvn098d1m9wsgx6zfi2wfm79wv36ehiqb57cnknp73bsbyx2hy0zil1rle2ma6dw5c74rf96oq3usxrr1wg89yviksp32z3h3a9ftfunt0qfx4',
                version: '616ks83npxwxippcxt2q',
                parameterGroup: 'vxttqpci8tq61qr8u6ysojc6j42ewsx38ibqjdi6ylco4keulrztr3jg09b1l1cozd7t93vpf0x8viz44cjqgxeo8snd6537p70bhv4ol1xxraku28p5gxiuozkr0lsirimp862pmx66ozctrpa30d3l3a5c6iihzq4fk6gdwejtoewu3bn6xa2fecy7q43q8o9m2fayalleflkt2ayl2rr4myk10bykaj53cgfizf5bi0z2c76mddgvnyov1ri',
                name: 'z01192kamlibcdujr7ayhh2czjlvcw4nvb5pekme24g1d75oxv2np6hdyyxayk8pwttmsx8dmfh7vcb3g5pnzyqa0xc2bexekzlv1n8je14lropck014a66axtbjomdtb66jnyf8e0n67k4z9phuqf96ff1mjovggqoz5lgbssk64qfcfhr8yfq249huhkrtt37wuisxg6ppyazb3wxtaqe5v3a1iycvddbb5qbl4td9mn0reylpakhbbpxuhy4ro9cl8ijjrjcqh7sdatl8wod2mi5e56r4nn5jwnmubq0eraj6dbak5d9crogvqdlj',
                parameterName: 'zppiq8i51or38a2gcmnk8lu9w5jbxfrzezkxffmyfwd7huwj3ucltobis1k6t0qbqmbwdb5wj64mhltbkizfgvcusump60jxe23x99yrr41hqbhk0l4jawmlj7251vnyczt2gpakr55ef23kafdfvd6yxve3vpgrtlpc5mlr0q6cdbgykmk2mgy2hn7dhvl9g6iemiqka4n0afjebbqkkimogvkkrtqeld6nbp6pqvfddx43w6s02jqaajfp9dszx2p57itprmauijd7xx9fq9alziywqcszgirdr14lk1ei977fjlh6levb63200l86',
                parameterValue: '4xsme4o3ea77qapik1lnblqj5grbbaksqqczelafgcvb77ky5gej68on9ss8z8qmahukfxjbzh10wyjfi2va4quyxhcoyvqoki40aeb2wut5fku7a8fhagjxmsk7cvhz6qbutl9nih74bq2j19675mm1kn9ilh59dozh4kh84uzy0g8lhisyspi3ye50yi9hei6ry6hnqx741wi7p3gistuacxkww2mvp3of99z00mp2p0tnqb7ok6plyq2sh0naz2gecftzi3wl0jhd4dpj968d61ajof4rgj3s9361jopgyqavhn535zy5ij0l54wsutiyfkasvxlotvbs1z9x7p2htwjf8l3v41i7nv91ko10sgdo29vuzzh3vn16wmb0ximby8ugo7fj86sltsukr1wff20ryay59fym4u7f6uloeq1awqi0cuhyiyzhkc90u1j05nveu9q25vp9d3cf1wh37q41kj5jcbb14pyp9f5xhtsfufrcfg8brncjof52ayedrmy0jlc5zm1o5b5r17rfvf180ttdrdqcf7xbirylpgwzafozm5xv7nox0wzww96gjmp0degivcqmlkgdqjrn5c7r6i8u6xl5ajww69wyt84l99bro9y66hs032ohb2bq1h1du0qpnsdialfeu77m9pa7u1a5j5wo91tvhx6zjju25pxoeepjfh6zzg7mudgef893ah45v89m1vm2ikbgcyxhdk15rri5kqasp71e0ujhq0z9t3iicgab1ghq3ax8ponc99h6z3conh3zw9tsgfyk68arz96q32v4ek9q509lw32si4rnfl28e9xbzqcvbk886udav2aew7optc0bq0k1197t6sgr6474gxs86dhii1a27kaw9n5w70forkb9ypqevvooyiut5odr2qen30vehoj7nb7ohwa3ihqqrcn9r0ldl8jpbsgirfp3jhxlf3pqpu17tkzdf7vtxpl5mo3ftqiy06muntrry0b33vd6vvext0sffhhg2fhk3poluc26fys1z735mbyxnla8g3832tud8rp22xu7m4ahyb9q1mz2rb7k72yjgges59ozrrpm0yr5nmz6mrb7qr7tyt8hy2t7qffb4su47n355famgntx9fkvrn3c10misybhxk3ua6wucy6ol22r1zb43pwrx0g41e7cvtizj750jeosy9lib75q8joasqo4abjzq4fidn62ca5ezajnpdbbea3iwtwxbyveowxtygj4wv40ydatak7uwg2v01izk0rsl8i47wy8xzottqb94qdhz60xw0k0qckult10ij6pgk2kq5dokgxii4r03cjm7c8adwi17aoip1fak5dn25focitow427znfvcsqu6mq2om53blnlbc6vx21nuiwvrz3v1rsu5a4v3aq4iid1a0tfxcgdoiomjhvjbggcitrc0xhbzjvqiccc7bx8ldk9m1eubtlvqr109lxuf5vzuzp1gyzh8itpfy7io36sh4su4vvyvoeyrs3inz9ax22pb93uirmt18ctemv75ymset02opq95e3jngy7xgh95q46hiduymsvikel5evogs4ynd8p47izjzt8kk6vh5npmxp6fz30lisd5psjda7svf6ntj3x0bj410scoqcei1iez5rb9zttxd00urq72tix71qdl0560f5hgbugk9nb769nkhs3jw7a0iozrv3gy8w3zkpap3jtvwxh2vggy9yyw83k9b7ffzehwme6yem2ongtu3r2nct8z1hhl23yrbw2307n4ci0z49j2jeuiwmi23t16bfb44xaea577ygdhi63itgn3vuhj5rt4a8jhckam9rjalzb86yducuij2ptt2o4ftqim151jios7o0r2kswerht5mnruqetlgjafx2b0u4q1srgid1tkha326vh922jb7m6k3o2ailmmvdfgufkl3l8oa3s3sypnv6wgik13map98jsr8rk0cavxw0pcod97j73nvtwlv53syq05hu3xx1p309tqk2i2c8mt4ve',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'o5202kdxdin12sfmvagcumq1zl68dwpdh4653xco11iaa7h5hc',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'jc8bvf0sr8v6y1kl5lkt',
                
                channelParty: 'yfh84yel9o3h0wafrzflmlgsgfxnbff10ors7m2btod3quz5xovvwezmiptr0es52ktrisrqxc9v1x40m6o4kydv7jkvq4d4k8pamgkjbglwjn1uvfaqttisb77c4g1c174cjbli4488u7t4wo1ngecrxir65qyb',
                channelComponent: 'rhur6h4dxxv11sq0jg7kene59edxmp7rkxy3rwxklex69o2f89b3iyttu3sz0uv4ivv9hrfawaq59f9ayc3kyfyuwsypcrr9g0vewfxhmbsjqgmevwtx4vqc4bivj572u4cojekykdwurf8im7oovhe8a5mda9cx',
                channelName: 'r4ng0o7y6cq41yijd8c5nqy9n73hqs8q8swld8398rumg0vp8c4mn87j6afu8cvd0d404g1mazm0pxnxzs9ywesvebbpc2broypri5p9lljab52srur9ra8763h1e9vj3md8bkxl6o9jzdsso7shimg6cvl55p8c',
                flowHash: 'jyajjptvuowulac34ysr61gusc2zbmx0esndv8yj',
                flowParty: 'wi1iuv6cte5a3w8texecwe0ht90yf9cmi0e19w2l9wfuq2605044pv32ynnzbuzt7br9ciplggjqvjs923kt7nt796n0iwe6ra3acz6r4m5uglkfqhuz0wnslw27rlht2so8q2cnbppmc0ol7ywgwa2pw4vs4ss3',
                flowReceiverParty: '2yudf5g7l6x8u1zej219kf0r8nmxbfaim5xlufx20ud2yurmgp4ko7tdqxdbm2yrauqlijyofutlozstohses1yl2tj7aydlnr9so8hhautlbyfty7h50709135vvf2k1wtio3awrg8dyzs48lrf5erfscx8rvea',
                flowComponent: 'althpchbsydoyor40r3v453cgnwk1116e5698d1l8djxja3zxcwfhjxpuzi302d7tknkfoith8ov0wn8e0q5pdknwdszchijk4zc4myclgenz06yto33prs0i1eloe1ywj9zy0dm9ifwj6jdapaky0lxbpk306s1',
                flowReceiverComponent: 'anz2jf118leh70so0cxlphf2ckfkgg2flqsrr8uyqhnp29ot22evh4htsn2riuubobpee1q8hvzc818dnwi6ps0ynolie5niv52fh6un2irgm7xg19wdzqq7xhry9o06ivi0ag7wsg4z57b1yj7wkrk7hj78apxv',
                flowInterfaceName: 'kpvh619r8m3o4wo5s0vjlg6evzyu28s70be11orhybxd4jlbs8m4vrjjrvpvjadd4rlbndl6zifnn8ru267s7vucivna1uf1x57eefb4icrju7hl39eqpmbku3zadrxda1b7mfh35qli40lshxvgzxumgsnfdf5x',
                flowInterfaceNamespace: 'kb31dwm8u5kbxdzy7tfz5h3c4wzsggq8mjf4bo1knrme475h58ozwv7xckdohobuozos0g0gw7e7k40mkysa52ldp4fp5q1xi3q7geib6ldd4io1iqhsj0jrpe2h0utv6wkibyx0iojc7vjq28zzlvjo3s2h1ghe',
                version: 'r9nf3rd7w5qvt9nnzka8',
                parameterGroup: '37z8fz6l1tu6xgvzxvi1iz3id3b1l5jrmzwfzq0c8oxf6ferezgpx68neztmjl6ztsp1nvdukqwouphch18nryy2e2jat80b3jey496ktl8j6ywcjrs60n429kvlba7wuni1tbvezqspexfkwheuvslg87fjj9nectn70nmudalvbsl8znq5anmowlw6ald9ne9z0hpd636garqskvhxa08h2r6hv3tnm5yqclxl205pcclgr6qfkz9nhn3olm3',
                name: 'n8m0rhqa95x8r6a6bzvmu76sdsvq9mmt19e0slojs8a6i9ltpkhq71yfekng2mynit1d7bo97qkk3yjunvf5tugh5ecfy3bz4gb4sv7z56p8b4ln9wlkk0be76eygd8kgnbfn44595ejlyzi0095594aoijk376il1n8ee2twxi90us87g8xd32van2g6o4u6uuss5a2h1pubve889vfvbgldchtk0xzug4jx9ee3onlvcj06kqi9houb2vmequzqbe777fs40nrl4zxezgaf1i0b37eyoo09t8ad0hbtfkqnkw8issncv0rqu4q7d73',
                parameterName: '8ubj89vf8cammxpvgueeamqhfob3aanj5tqc3kibos1j2gjey4loz9nknvjleyuu4lzfwtzhhwa9t5g8rvuoai2hfb0abk2eii3jcf2cvdora5i7n3ogadkryiz4l48n6mtw5qfjvinp95wf0qph5y1a6ryez1ksigm03jqdimv4uqpi2utsisa4hih37jke5c818oeewfmf95781s1i0cj4ebeomvera2qjaueranns2y825b7ub9srsq0tel2qbfpipacy3z4ozs0qslkwyvftqg90l67kmzjnays4q4g0jj6rgb56b0wwblnfmhje',
                parameterValue: 'hfl62jfs8pyki566nkzzv0zbor4g74pmhh87l3rocaun6mwltsdgeyrhc34v2zcvw7adkk9srb0uiobkhfr75sxhf722k9td6oz2mgpllmrng3ekbji2srbcfkp0zspgu4qmqvlfjl7hsh3om7o7qi0y71wminn09rtqkl54zg26tu2y79i25utxq3b3o8e1orvt6d99b9fypljne8fi76m0p0fkcb4dtrlzb99234puhuaajfovs7fr7j79mn3p41pynzzsxzfsbqro08vf4zo82ps37zvo98zgvmaoy0lxtuwmvil3u3t0u2fcfxo0cmqae3wkzw6eyoguwv85eev5aguxqj06xhoczqm2fhn5vp0hjyc50shde502xrsbcyey7zzn9m09lrzhiu1mmgzd1b6iki3lpksaoexwig6qvwb54oxj2aund9lsn8qno9k8a1gi7eu890w9h4ue8i5tblsthflqfgjwpw6aogo4z972dusjnczceq4p5kejownjo9b25jtljf3k7cm5dlts61v164pgmv54y1ba55t65djvfdutnwt9fwm3n31dpi5rkihcby0d295m188kudabq9lvvr0ehkhm4kilxv980lzlpk2i5xr2s55jg7kztt9648ugrf70td3mvl609ag0iirrssnm6zf9w8026ye7mgymdwel27ft8uerwd7i2kaits2v70lgreiqb1id661v1pwpxwl8irk18uu2b09ca6keiyg1v9lh4amtvye1mvpq827xyc8wvd3zsjlasg0qhmyl5g72gt8tttwgafzaw3j3dpj4c4k5w7ui25moju8zq4tnki7z4w18q6fd4tozaijw5mfaz68x6mdgogvvl5bxxugdw8rs6q5tzz8s2pzixuqqor4jkyxpr157onjyejln64jxdhaz8lqdmb6c02o0jnixhms20exqt50rtxx9r66uti99u3c5w0nuwxi6x5zb782er9ftrjvlttyuta5xup18zvqbidghckt2ufyhjy50dzfymo482504no3a1m0i05437z4uknauddnlatc83uu4h8wmcscltmsbbw33231nuk5b9lkqm4jt0lpqwu26u8i91tjalftc5x09s4rn9j5eamw4wrkmondo7dzx4wwvg07fdl3o8azc19ccd6ryc1cixwd6ecw9re3x3kbhdonfkdbzyhj1okhtfxusipqqzaxg900v1pkusu2if0zeabrgyn8wqewmcw00irnooxk5lnthrcppuwf8h0sg6ghlbprniroq3pek83lorr01fyuuf56zisgddcnu8lk23xpbk73v09gpgqgao7skbf05d9pipf5p5bk9ng4grqshhhctlo71qpjztk6670by8tqjgnbew1bip1e08yqibmfgeu30zpi8myjvgjkaldarxt0d8amprhj984yk6enya3dlf6f5o85kj7uqi34azwkhu3gr5sokihukiwgfbsv3vwfbsye7wwbr3pyiyacg3lj1wrtal7wja1x4bmwph7girkl39e21ehqlkdllom8nyghdwwcdjzjnl347qr1sikrnap39swf7stim471a4qplczf5643a4hk85ghukpvmdzt8tpida2gt6yhm1nkqso75bttsdaik3qmbcxogxtlmodxn9g1oyuya16pg4ryh3oz9ik7g0enptdkhbhx5curf96r9jlizro8dk7nbsl17o4emw6ql61aqhkxpq9uu5dr1oj1ox9zw9l6mo51kcsh3n28jncbw34wvqtd3fj25rznt4n4lpwcnjullcpio5w2tga0mpyvi3j6udusdds0buucrxol7t73xrupwijhau247yxuq3x7jmdb7sbdeym5zqeiwskqisrcioa4b2z3iwa71mtipfiamxl0zi9cyot90oqyjrqoe8r5m6b4xfwvq41iiud766a2gv0t30ty44dgqaa6aznuxt7gftc12m82lx1nug5vhegh2hg69i8bdmnpdawmoovuyb8jo1f1rbw0ciksosk6s',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'z52ihtfkwzsfrfa5q4lmansl68ykn9spgcwtudkbte8f1fy2vt',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'vflernaukpovhxd89n87',
                channelHash: 'n2sl4f6zs4uoog2j201hu8xt79oo5halhipktggq',
                channelParty: 'k64koq6txq27irnjy2ya2trqfd1hnndmihwnjaz1r0mhzaumj5h2o7q5r8wdtqhk5ivi2ag6nj3h3qvec6pp7q4gbdjpikp63bt04s6an0njrgw8o8v6zd6uhfpdghgq8mcy9o2ngnl36plpcurohqr2fejlpi3h',
                channelComponent: null,
                channelName: 'thd967zpn9a1ock3b89yicjlbae4jbyxuxviq17g884hm7ikd7t94k49xrnwwedoxuoqsmm0fsig0qy7seq6sheapsuu1lenx2ilzrig76asr9yxvpvca44riyayy0gabjbposwjoqk5x07a01mway3x6fms6qm5',
                flowHash: 'vzkz8xwam8eylza5r4ygumlyfue084z84i1ad09z',
                flowParty: '0sx6u6ggjzr3e98p5zjv0sdjozsz08o0xn96qbnrhtdiku6vi728r7wnxeaoe2i4i755f2ykgyj7wq1fz76nmf0nau0y7hxyjqlt52aqhvy8nffugs4h7l4ju84zi2cmgrzm1scgo6sybl3kkp09wkoep0jz62bz',
                flowReceiverParty: 'p4g4jb98zdin7i2v4erv5crokookxpn5hgdxlb5edv7wxz8g1dt7el1ubtn0m604zcsqamwp9vhcuvar0706dw3kpe1nnuu1lxnlc8k0luyvryl2f6d8x321jz1dp34rkszsg3fjgvlltptmwfem6qaimtos5vea',
                flowComponent: 'vsxo39gtdaeq0qk3oo273wcmst7ewu55jgwgt788twze4bxyf1n6o0rgyas1lbymmjjtj3k6nfi5y37ke3o3xpw37eax5zyfq54f8wlmwbbnl10nrx8luoupfbcx6qy2m87upztyjs5r0nv2wvnu1ndv6lnn33na',
                flowReceiverComponent: 'qyttj3slegxcwwabmow9khg71lcjje960y7pxm5ec4dyka6i99m0olvwhwy3iqmv97tqpliqaekxa06x90g86dmhziw9s422b5tz099n8xeka6ozkbg8i7esjqourxiajpq0icfo7hvlrvmgvwh2dwax4zh0efxp',
                flowInterfaceName: 'kzzry0w3uqr2i5ire6p7kvevqgka9oi8hdwcl0a6dk9qzio1qyc0uxd88ee9dxrrefllypjsf0jq42h7x9xyb2shoixyfmei46r3b40ntm0g6dss750od61q8pr1z1d92lvfplld46817uzwbmu0qnfpof3houog',
                flowInterfaceNamespace: 'irg80gugoea5qtuir25d2acp0nkznfhf85gwnid7zp1nhdlyoopa4jjrsdhiyk5lueh4yx2xr31n8jqv562v3q1ctyxq0l3ei8y64jkx68zyhuputqbmtjqfpo2vu7dvutq183td7k6qec9m211t1uanko7stvyf',
                version: '2qay4n7jfcnjezwid2ag',
                parameterGroup: 'po218t130wqz5elwa02x5sxzqb2l2g6g71mg0xdb26fpphzjf9dzx1hoc3jj57cugjqfushffrmud3vh1riujm9jd17zjiyv0vde6tashrcw2hdhwlfk6kzogiaemrifubhkn881a37cidswcihjugc8j0z92667kveuqmy1tlnncba1kpc1rlasmftm7k137njlgqlx9c1p5riqaqbz5a9801hefk9ob8k1vs3u06dkwmafe49xuxdh44qg1sp',
                name: '902ys66nvll9fjwibl5qz6hhdmyne5voujjwpv2oi6bzrlkrdlv7qwqs3ijf4jri0h4fw7amb3e4360y2s6vcn8xamonlzxr8qt5276ih9k6r3ccvicn5zxlq5bco3je2kieolwlj8i16amqgaanrwbayodzd7fxpfg60ctlcodrrug4c9aywyeslwqzrvmagr6upn17wtc3p11fyoy4nly1nm8xx50fuojizu2zknhdf5z4nbcay98fh8d9ey1dm7ztk31185z66vdcss84rba8yqyyltsky0wzmlw38avr6vrixirefoxaevykgxh0',
                parameterName: '9m6y746iyc9q0uak66zrtq2p49rg08oibxfsl2psif2om4o1k8vuwvb2c0ytk7hr1nw24e3pywfyihwti37m0vpg412ynaeny30t9gt843fs0o7gcdm0gyaob9x6vfrbg1782pzd74pzv86jarbw7mee3e3w6g8fi02rz074ykiy5tucviwx9dbqu0xfi1sc0828fpovc3dswtd5fqbdohs8ss44j0vwt3aip9m39nqspywq7k62d3gkn10lwsgxntr65tw3e5dzlhmyyfbczetr50peoviggpt0o6cnahuibywk6hetychuxiddtm1f',
                parameterValue: 'k4mdvlio8yxmfgjihv12ia4m0hvxjqlh8pddum9lo5haqxcgbm5vggff3hodo7hxpwzc0ki3ny19ju41jbrt39a1bsfsxzxp1rwq5larfdduwpdqr4wrfmvvx7mgnu9mo1gtx6j4pftq86rpjlcod8yes8v8d7vzvxwe7gavanm16yfzet2wp8mksdbm5jqzxbh7o79i50ry77spiughkht4j5xezaoyhxqtcgzzkapq25iud927jvbwwy7lr4jg1u6muk2vehv6ikqvdeupcokucx06uytlz0y3r22n8dt4wosgto7cnpxxuyds5r9cmwn9k02ko1uu0c53i90amyhdaavfygwe3ru5f06ecuivei8qup4hu14ynx1p14gquj51h0fx9157qu6vs0v4t2y39no7dookjxqp6pv0a8y311yixlvm4rfh5wx1cffken7dzjmieww7wd6vzibu4hkd85zfm7grdu57079o7echs3kgf05xa65j5x65qwd5nlkde7wuvouog3mb4axnisjaviavnh7uxlvdcfezmt0em038l150yzgoil9194lyck3572aorqv67scg2i60xrf6inq7wif421bpha1t3rytmdllyl12744wk4n4t4w5lagga0ymsfyxhg0h7kxf4meyvrjj1p8rwx4w9zqaowd6gb2741zsosyk1ux1glt9o7t4ugkugki5desjzt9g4cch8ks8dfutt33sazkbdcsk4g38ubo0bu5c125q63p2k8vqneye63p19buh8mwtyff6kt52xkknhftxxsmj54kh1kpkjhbo1g595i9yra8eeii6q9d2jwelkcb7mg5lu4vgnbwyskqtm334h11jmatyvt0be2xp9w4pxjizprk60qom442xtzrx8yx8ll95wcno2idxmta5zeukf9k9k1l2n3nvn974srx6vpvy70mbw1ls7u1v27qi1ymc3syrrylffzqll2ug9w9mayvjlj6dgnh1nfxb1xxafzvskba4ks2vpqz6iqidpi49d3m9c8fwt4xargwspfb4vq7kuf59ws1ktmymofcamu9rlguv09sn0ifw6pjb83pl7xi3rbq0vxchzdrh1egrgzlqmnjuwe2gmyx12051d5civhi7ne2bscv0rr28m7q30d4v6plulpp8o4qa49ks2a8ytf8phb4m9z9zt4k0v0t7y1gk4rp39l1twbcqxkjf17frk8g6m52h32or6h0bhwqo6wf1sa0by3vinscqh1ltdtcmf99opycuzjmjg1sn3k9cpmp2svnr4z9sniu69ny9ki8qiop30msxurzczohmpg0kaet5nekkdh4wy6k65481phktby8553tu9zc23kphjdmss3acpvrvazd9200gt3591ny8hvuv56cji1mkefmx1gpzypfqx1uudo8uau3r3bql0ral7ced0cp7jppc2rbc1irkrtcvd8a0iu0ehm6rru85gvntsb58d7zjg1zrdz9v6d49xhdp4ntldel67wffu4eiug4a0o45i9abqrrdcs4bq4s36b01sk2xgdi5mkw7qvre8zkukpdp1uxm9f40yoqcm906wj0zw1sh7tjaz7p00gpw8qserdgdm7d8mzci0i3pllozrj28rx20orjsmawn80aslghubihv3ki9u4af0v5rwz1tqwh2s7yoiwxe19bw23eypxrx2k67rndgakhe18z701sxu7sbos7ouiqz5iq33lum7rf6cmopa0susm2v7su9npo0qbvw7z81odpuxx0bom9w1ump1fz43xfgxqgarvhnc4k6o0b3wprawgqpg5wr2r4h97xv6583fa343sssa6s4exgnnhmzmab01kl37276zudkszhej21firjskf31e0dw6jgu9ijvsz8298xshk2t38bfovkqelannrmimf3p8inaz5dri7clliscuj0u8hhumix5oj15apu3cmc96qx089gi116r3c9cg9bqf2ornz7b1gvi1as08t072l14r8csdzgumruf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '2l8u921ye2g5dvltjpggqy12qvwbojd7isg2vmrk53f3nculxk',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'ie3sfjzwebivwoka2wq9',
                channelHash: '0ds7jjrazrb1nq74319yzwr8a9rzci70n13cwxwr',
                channelParty: 'v36oimzopdkkhh52q33xr4lithscq4e6f2omxdsgovox0a1wtq665ymfw6edidkgkdr897yxd2qfsq0dv5llxq4wigwo379xrsegiljn4w311t8siyx3ekuu9dy6nt6qee8uszopf12dcamv2k0j6ejk8pkteo3z',
                
                channelName: 'r9dm7p1lxocwk4mxe9gaginl2i20tk08686fj1655t4nqv2jzc6dxw21jq0r52fc384e4pmgkd6hph0qetiq49bgbgwsgy6em7byelg5o8e2st5njiep7g05w54muy40uaj14ps402o7v17dc49az1gdefby2bpx',
                flowHash: 'wlxs0k9ukwzrl9oj7cpp530ckm8rmdsp1sex7wun',
                flowParty: 'yz9vjlrbsf5j7ze4jwy3gsjvw9mwpffb519antdy072e065owpdw8sj579jwzr6w04d5da7y1nhjyj2986pcx4m5ocr4l4zx5j5dja3wqeao2fn8za0n3409oa1xzx3s4m97lvvzbefbukb25g85ywec5iko1b4u',
                flowReceiverParty: 'vf3wltnl31hw7p6qsmm5irkx36tpyoveh9j96xv6wlg5guh3l9xu44reaq0dbg2k6wj67ngens4uh9yhphqj39mxw12ez4do1jpoj3weq4fzfpwfxbydy6uyjwsz84i29bhgb6pag70lvd2a386y6p2uvwyk9mjq',
                flowComponent: 'r2hi5gf6ia9szi9h52yxz8ktphregajd0nbebrzo0bwbc49gw697iz9toyvkp834f8kpj52y478akt8z45t2f71rq85mh1c5atqyya6pi3kgsyrb74k9fcjvqg6ioumgfsipxay8n9ykwovghrgdot65odh95y4m',
                flowReceiverComponent: 'be7hm3zqkpkx3hl4kmobxxrggqp0r68apod5en6ivomcuosz1f81auv67c1frp87idpnrntd04uk22xrexamha2baqalkxf3lccken5jggm0174zhy0zu7emee3blawm7nbkukic92uffc0em4rbccbtmop7zx4m',
                flowInterfaceName: 'bwja1zqzdns5dc598jt07ceovxbr9t5oliy9slwbk6hza92drn6s5jb4stcyyg6b6ptvnudzdbs4jh9sr43zurg7eqtqea5jtayjwabsf1ydzty32gb1zsyhjl5lus8ezjavlvznh0vi5et2f5thmk1j8cy6ipdl',
                flowInterfaceNamespace: 'jukkn2bou4jlrfch0fkypgcqts5ps1dihfvwmx55zu93zj8vo7dhea99at52se4qqx95vox2yxkdpbvgaic6qn8grw4sjjm0tkjjbkye2t04mgzvedyl55xrtqmg7u07cmwh4hqbwqtcafpe211wf7zc7d4po6e3',
                version: 'bxbx55jajzk2adponvdq',
                parameterGroup: '1z0om2q56zwy01jrp303fazvlfnb7bqvpjtjocnbzmhgk4lol55b241m3xar037qpe02em6ud2kk42s9x9sxze6bvsuj8v7wmebmqj78lf4dgo734edcu7e4vm2wwtgtxx7aktz65oeimm85tdczwg5vnyi9n3kcws0et9951l5y8j7loyq6620igadlmewt438ssvv53z0ljj83p0ot2786p8mi44w6c5rftfhlqijd7wf07v64tzt28qkj0ck',
                name: 'x7asqcsnpulmqloekoswlpyojeiqczaw0mupnp3d13tvjnbuwims1ft7v8s0clllorzdju5t7s01rv3argms496h8tf3v6eru3fq2kvu36qtek9dpunjeaa1jk6zpths346s00h0blu1vokv9r0ejf7py5at3y4qzcyoo840z04ilogrvoxzq6r2hh7ghfi2txvalc9cqdtvq5vj69p3k7si3tge4rfg7rxgvzef6ugim3j4lg16byqk8cd6iz67z0xf5h2g909mox2hhpl6mvmve6zywam42qpe7mltabzpp5gmt3c0ch37ix4crovl',
                parameterName: 'euzot1zwhe9qyuj1nlltmb8pdi2pdye5xeu09tgr4k59vx4q4s0qrp009hsor4le0pfwgrb4gj5od51sk761kr2kryfis3z8ozksypanu96p3s1nop1195bi3whz2ukx0id14bq01cs9o9guqrc4rzyo3951qa40oo22szubw7f6c5m2p1m9i28ubs4efd0fjhcjyd9wu1nyfjro0ghl1nl5yboc2mvfquxmg0b8h7zx7auht2cati17iuq4kflycjt2x71veptj0n7h67agnikgx4xmgu3lsy2mw5ywmwk9wprung1fu2tvucnke6p7',
                parameterValue: 'oh6243tx5xxfn58r3xrrehn52lk5dcgifmj5cm8stm5ayg9gasaztnbr1bvcvoy2fx2ghxg02seb3lj683wq0etgc46jfx3fnfjl61ht1gx5nj57rs0zfme32vf29kl62ej0x1agm9vku0mtqa3hgfjikbx9t8ef7bz1zs7oydiomrb3hv4rix86978fes8fmfgdqtl9dqs6ygf4asqs5h03wcshu4wwjw5253atg75zmmjc3yg3uqwzaudek8dkj9zoq8l0a44zx4uvcdzzddrspcmasxk06eyfbt3sj4rpjz34xa31i28y4ekt1xzhn98ydvls6u667db4u238lzrkd3lhme9jdul6lksmutye8jjz2aj6naky9zrii4z7214e0urdnw1ypjgtumf2kupst7ab4htw5vmuhdws0ihsnz0fkhs16lx1wbfpdhkbw4v9o07plh5fuujet3pnji0reu3g5gkkkt4tarzq907rk93ihjljgz01cbll9ukbthoobui9zlcuivbyzcle4cfwnar9ohaow3opnzrb403zbu4olqahvn1yk8niesv8lzp912dhm96j2v847usmxwiol1mu14j4iie8c37incwtmp589mo6hfpwhze2fsvxk465fmu7y35nw0bos9476x4pwu45gqx2nlv1lqbpo98wkbxtzr4ibn4h9n320k7jg0q2svs0glr64lmdcndpygfe24ztjhrdf96dckjnrh5fnlb2fd8aamf0mh8n5g18rv06gafxpvx4s4liwmi0d9dy8hwtt1rmj6mp4ev2jiqfhjalbnv5ljyjsrui94mp72u183nxuw74yl19yushy8l3cf46jyory8mvxisvq11k4wz3dh1wnf3u1u50rfnue2me6alcrxtyyv8h5sjgnu5i5yckvggp67rvyzg7icuar1uvif3ixjp68ol0l6tf1na6jhz0cu3xz0b5pjqpd0lz0bo1ax69956bwhbxzlbux02b4o60m5rx26ziyu19th8hou0ouv62xbsd0s5ft4hij3xq410sxmv1wi6vxhlm5fm9nofnien5vih3bovdfiu8uzd6g6etur4tp3ikapozpxsh7new294fsqae84i9b5zezswjb0vzw418q1kusb8xukqex666vfirg6gqgr5uzpgul6s0xcu5ha71u3cwn1pb33c9o6mc31iveb6teqq7bxh9f2kdzncyd97bmwzd81htb70ecucyixkgttydmisd7hik5oju1786iidzbt3z6hcvzty4o3t35ok17vj6oh4gjj84plif6hk4tg9paccq8lbybkfqdwcj05apqxv2oy67afhisibi95nssym7ouiwyp44vl2rql4mmxcwsl0f33yxxhwmxage171e58iocaod7nwnwwzoutyuzw635gckz10yo1oscx91274rnpxl1m1pc0833vjebmixatzdgld8jnhjqx9jd50rwde6frsc44yae6kidr6tdp54lj0h0wdi7gttb33ke32h0opblmuygv3iap7u7uned0nqfu8nhatj3cgnw4a1215appji5uszlk7gfjkq7clu9qbijh1zmr00pud7kft77kxnat522mtmbbrccwrzs75p7xmyoflzm197031qw4npj9gn3pr6tmy1b1peig2hjzzt9hwgzvymrowrb96519kp5slm1nucczjg4bbs70cwnfheq9zvhs8q0io7vacgr3qwtqux4zhn0ddtyubvjp0zkfu9qa83e7r54xelex6mhlz3b23f6d4gfycghqnz710rl6ca44dwsikc66b0vbny82qtmn6jjsszjecykqupj8tf3xiwu5lq73uda6vs3ocgiam8z2bmxtfwi13513zvopygpk6nq9m5o8y29r4hb0aisrmor8jn7ydgvaydglvlpvps1br3asrptnrinpvktcwxwnfs1alm2dw8viggjghhbxzetsp12d5u26l2ujcjsv6jngm5jqkbnt6q6hmmu5ws5xlfv8l8xawv8z2m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '80quzcxljv7nmo268gfd6wvdews0aqwkufhilryg0n827l8nl1',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'nu3a7i5hwg6py1rnwdxo',
                channelHash: 's75l1ctzgiivl3uwy1t1wyyvsuxc4z79seft4ce3',
                channelParty: 'fuoke1mvl4v4d3ezg47l6rlb5ackbv3vrn9ky490tl3s0n2g3g7rkviunkv04b8ctyhwtumk2edcn170fwq765h3ba27tqmh16eqqid9xdoh0sm8rokeje66cf8q9r84yprfb32zw1lzh01h25yqspswb4jhwfx7',
                channelComponent: 'fd7alxdwwcb4phhyigzfm4tgc5rn9e63euv9zhdnvi4y6wsoayayxidfe8mjqmuja6o3fhz1o22qsif49yuamecoamn3qk417t42ryqj3rjb1mw0p73b1h86na8ith8slo99fpbu8d7p0rcrxarkq1ynnxk2rbmo',
                channelName: null,
                flowHash: 'upj89lb0d4j4pznfd2o9zoo9m75u73s0m5jyv4pr',
                flowParty: 'fynitdr18ubs1ansphhu5p6333ik218keogu4bmzg54sognj9lba24uwdndilej6iqctpisxq7qrg08scs1mwggp2iq9xqj872a64pb4ber381ak704cczg1kimllgsy8ksy9bzn4votagymdmcrwc2v2vigat0u',
                flowReceiverParty: 'xhibhrod19i1h1gaqetwdo6q53u7g79jw8xc1k8gym7bj08mgwb32wddku7yyqzol7mgcj54739dv14ergejg77ql06bdkvdsqon19izrku9sgq409795ebrjdpgkkr63pkfbxnin8bj5qu2qqx2a68jawhwi931',
                flowComponent: 'lplkz2160xwsq69fgi5b84hygj7xziel0l41nxfbmzoa2tcizi0sn032tnil6xhiv9ie72mg6s8bepn566w2mitax4nfr8r7k34anmq4awi7z0vhlvk20st5hckwsof4dazcxcpmhhhcj87jogeg1vgwy4219xph',
                flowReceiverComponent: 'b5gnkskjfhanyaofnq4iom5mdoii9hs12khsb6egnke6vuwdkfkm13i7hvf8bivd35qudjlylabfeftu97h3liu2kwk9xwz1s4qghd41v07h15jzm995xx9sk4qs2zrpmch9pewgwiihrgds4x4sp6lrx2erntbo',
                flowInterfaceName: 'intmefk02kk1omu3b0i2fobdanx4vds9ri7h9wf1sspyrjj0cjwyszogx51jayxdsz026mg49kpf7lyyjrqlwouqigk0guab3u7n23a43kubujij2qv3mg6t88woopxlrgexxw0gw87i95rzwz42507azm7roh77',
                flowInterfaceNamespace: 'zvb9nc8447ridg0j3ilirppbej48qnkactyp4hx555xcaq2tjbb9kxrbgqmrrg88zn2bgual7qmw8m4rnntrqkf4y20djz6wdbgovhypoeink517rknns7opx0oh5sn9z6bdo17d03oif31zvnvvo41rhasznn7v',
                version: 'sc10mr5om5fky2mdzqow',
                parameterGroup: 'enw7dbay2f9ubvudrk0kj09rijsi865r7cef0xwa3up4vscd412q1c1ch8g683mm2zjusm1wdjfw5ke0168kzv7fxkds85frb73ld0wy42tvinuwbgjy1urpqjnq81aagdd4dn58ovxullcnjwhbhyurbmtllt1we65isawpxdjzl6e63mgrre8jm5v0vz9ftxdfx96yo6odtwbgl5393e5u10l2oyde4cnals4ug15stu2nvqh1k54hx2id833',
                name: 'xwtbfryidjg181hbadp86xs2k6jtpwvrel2ypapvlism6jme5aa6kojkp6aw3feq8m8silfn3bhs1m0cdf1v4pogoxdoxzzdjylfk6rxg1v07sm8gy1zl09a1qnru4rbefxg5q1s01yuh4mq3pdo4d1xeksauqle6loafrlsv20gezkcjnhcjc7qe72jh5j2ff7loe09erlygfml41bgvcpswama4bfm49zhixli3cpnlbtc5knehyn5qe6eai5cgqmnu1p4rr1iy6syz635nd5g6kmy9u7sknxscat85hsh7o6z9clolxp7te5l93uv',
                parameterName: 'yuzkxr0xqcmr53vbvdimt286czu3ktjahfpsc5i72bnpk2egboj4eueei2fnmp8m1mtbkn0tjle1k8hccz11fdukoh09yzaq81qe1cv6l65g4ya7jc9fcbfei7astd5zii1mkb7l93q6rhn4jwsyjaom3fv1t0dqjbxq1w59oobvd9pgxxhvmzzkx3byrfiucpdmficmjwzpi9xgu79czfpmfp405qov84cj86hq4mzyjvlpwg7fin2bgzfeq6wzyoms96jj68ryifkczcoafko435hqi7n6vfk7ilfgpiv6x5q8ob651s8wd0g4jh9o',
                parameterValue: 'myprcf7zh2scderaznsn4tstkvqyx75nxqemeoq8eufb1eit5534tdv7q157jri41d4hr4br8pcsn1beq0trvqcxometrtvfioymdysvdf0o0pl10d97a2r1hkbkclrzx6yheyl6qr9qn5io4wp5ebp6a94zptdrpdedrw2t72x6wo9nxlnjshoued53iv9mqezqjka6m1y6b7ys23ay0fdfe10byl8ttlvegoqllb6d5tdd1hie7nwz2vilahy0dhxgruud9eykzg4sjzd8j2m2ez0jzptrtxq25l3dd99fdqcin5wbmzx6akk252h0cru77n1cfu90129ckznv8482n2irhme5qnxa17tq3abpr2exkarpezaxsb8wcnsdw8w2fbhb71v10825s9vnm0fbc1nwnwlqjheqs50smdg0jok5kanmo5yc57s76vmfkvamd2swd4glcb3i0fy67otpaa3gouprb6sc75r2wdtk0fanwgyws2scckwtkt8zzplafh5rjvdilyh93j6xnsvpq22a2eee8p6krxiafhw85is7mtryhurub5l7x845by4l0h0l2iwsikecgqb2nl36cskbf1oly63v5ox3c7l6ubm5q14dd69ak7u8dmwu23sk9r0okaqcfk0tdnuflzauu4imipygkwllron7u9m9hu0nrvxaa2ils0ahnim7o6tlyyhhxzewpg5bgdpi5uha6pb5nkrnnuna7jk3q3sp5u2810faetkm0bhgk0c8dobz802gdj1rwmelcqm65nzxkfl6krsg0lhvqy2sz0tppl9z1e3jcrlx0q6rmli6qdxlehtqej9izs2p27xqc7rjazy2zbhilsu0yzpxz5f52fr5wymrp5h11bq9qrpij9z2tthqjzg7bsjnuqcvobxknp5tejco5726djkeos7m8j9aa9pbotw57lb35sybfmrrh0lu9a3vjnvgmy4vr6m7wbpmvvuzygsmzcqmqtce5kg8szobqdo8p9mpxoubaxt3yxmmbcocrj99pjkewymi5xegf649kqf8wuxjrrt6mvf7p72k7vsvxy5sbkqadctocybywe8zsvr36e3kilrv52a6thpwx5e7ejwqsat1jthhxsu0ee1p9np6z6hrv2mdpt2lnmpqe6qdnpa3bk03b21dvis16kf8qpucedxg3oabxchf20khgfiwqr1dh5at0oky7bl11974ly00oevb4mbxm3stolvn5wfmt5b8thx7avnuhd5x7vcg1hqxbzyyna5p0f7ag1j8t5as4v8ze5t09rufvslei0vlcbchcoe3o9u4byxmwwhpkebfz0ki4mndjlr997g5qljuuc0yh4mqxs2scj72zn8z0o5dg6235kc2s5n9wqrva4g3fgqivl729ad3aqnhokn1n0v1aq8clueqsrpcy4qihj2fpr1gqkh26o1thtzk8vl8jufet7jq8fqftno1lcx8oqvfhqxqd53zci03io2tntqktqaiqzctjj0k5mvub89zkwmsrnl4ghem29giktkeofyziyaq3y42kjg42tjurc7ffyrt3qt1o470l5797ca87vtc29z4w6a11s69hets1xz9rtigq8kcf20dl5x2yi7a7smpaejwyxmrltup5io8ysejkes1evv6gky7qsk6ctxcjdv13bp7e9usj9ul9xz44suskn1v3lwtza2t8dkq4nmnpdeosvix4apreibh7ybbzogww06gnc9ajog16t7xlhjondg0ltasvgb07qtqu5xkkxrb1efj9b85agxt9vvozsa4xrzr9th0cz9dztwhgta0tjsu6l585y3vjwol8rpvjq5hifkgwdg7rt9hmy23viu1jxf0z3hdhbigyiqcex9tvdlg7b8y8zqdlwxv2ygwu2wxbw2rwxbnyhjcwl264myioj0run673ermhy68tmgvbxyhtlbfrudn9dadql7z93x77plb70cxhq8qbcphj52axd6c0z07ospl6okmxp9ekbnh1h8oprf9sypn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'sti3re1n9g97lri0b3hggbyybiy7qrzoe5xmy6l7pa8rn3ts0d',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'kmznkecq6xtthocvyd9j',
                channelHash: 'e11ogjpei210trc271v1w6k3zto66hf50c3glotb',
                channelParty: 'ifirqp59jg95pcmast8ikk3rv202yftxilf19gkj3kcui6u1gyris9lej4etnv7rivegb8ts8xvlhfimtlsdl9at4155gxonk8854mzvvyz2r82bn2l22hcmmykykxk8sta6cfapfz5zh8ei3pj2yd7m4c8fham2',
                channelComponent: 'g0xtpmokbf0f69sz15r2jccfxcehhvbso5dnf7neyl2o2obeyw9s9kx2c6p5t5oi71k8tm4sq7xyglsqxkxker6mbgpmv6wnnrce0ep5aeidiq4hvs7khbixz92ldq4e2gvobhpq7f66ecwsvaty7vy2p1a6cawa',
                
                flowHash: 'sn5k0p7h8ociea2ae7va433vuefysiu37bfqt3mw',
                flowParty: 'x4eajj8tsq1dmpt6lrlf7mp3gwmhv1n23jc07j6vykctwcem7nez1w73jl24lwc56y951tcfnbqp480ar0dcyo43pmz2il1d8pm59njczfc144cn18qri6yym60v9nisj6jxj204fdu2usb4fkp6gcn9tmt402f9',
                flowReceiverParty: 'c4oeyotibtpdepyln7iovid3u5r4razoroh5un5kwprum46vg53byw05qz9jcuw2zqgftap3hx925zqpwy7ncnuol4047qb2moz1dv2ckvkaecdhgiro0izmpjxftqkl9d5241hti614mqp9brvstoxkjv7xm73n',
                flowComponent: 'vxuza1a1c0ye5odf2f6lbpb3y5ei0gmlpm8asi2602moljxdvefhy6see3erxhwm6wvv9q1o3t9pugw6vn9w0vkt6gpx83qubvx264a8nf2fpk12jvm18lv3vvbp6q9jpd1kicunml8ao74ol2nxzux3olu5jy4b',
                flowReceiverComponent: 'ivl4p6nwiwfe3iff5uohpmznrpx0zwbdr5bizrg57nqzuz4ql7uq34ht61yfqu6uvxgary76csfner5z8v5ctms86fpeh31fhkf0ndwa6vuyd7j799w9iawbtly5yjfsctgw62c6mvymei369kmip2cro147n4aj',
                flowInterfaceName: 'bq1mrg5rbsumuhnc1l4yzluc84esf3og5azcbr7nm7ktbry2p453ddvuxxv7arwrnwn9vapgmuqw8ns04n7b84cpag19wdh7jbfb6awc6zucatf4aj1841wanzv1urmxh0rndu1nmp9jas7hjsvmmc8xzpxrpzbb',
                flowInterfaceNamespace: 'dofxd2h0j5249rgj2zfi65xo34j18ntmcnzs93bpdyzbt3ky5z0euvfwxfk1tkumt98lhzsbnce65xyop9s62m9zr6q8uri1g5w8pxse1fbcqxygskm7my9x0sbcnquj9tiei4ju8p7t0evecimvgzfo163tabhv',
                version: 'oph19rlin0n0gr7xrfht',
                parameterGroup: '3ogeqtesi5llbqciyji45xql8zi102q4jru5ie5pl4n93wt51zqjtnhlvttpiyirda6g305xjd8v03utauz16hksuhq9o32osu2qxuidv215ap1lub1lwridos2zzng8k73m3f22vhluupmg8c7h79i6oj2hu813knx5k9h9ccabtpm1u656vpcv9goue0f85bixa2puk71duguigu2526ag8def136gb006rt9tpxfeln04z099p0pg8jb0vrb',
                name: 'h2noybkwp14snnn761ealh3ynx7d9jjdnzlkam9i7f0ndwz5pqptcmsdv88qm8ix0j0r1g36yz5155hx2pam7gxlhgd5pxuumu52b51hxtk8xapcqq9xzw5vji0toqiizw0uzuelmv05tqfyj0bhsg53p0fbj00mxtwpngizy3p4jl07x5q41xw6vxuejusp45f4uvxzcnx5pa9rccif27hz38ebpg26glo99qim9wd23hauafo0eavmb81vfiu33wz50dk8yfwp9souh55w2aptnnjg0q9q3oopysku0mplej3mjk4kwmjq02xlk7gc',
                parameterName: 'ymuoxv8i1w71qmjtjnmlsaj020ses9qf4jdjxruz8h2ja8v3l1abis5tf6smxrphvcyj4rye0v0wfuarb58sj61iql53izjj02rke8nil9l3re9mirf9rt5xsn3iqy3ehtszbe4qlt9xsco6fp0qdog2znckz6bs4bat6zwp9phdubjnrzv8km835u2fuvr3cn0hvza5c74vzvwn56rzvqfgq1wn2kvfy0vzwsrunajbj5jtyeogbgd8z380aganofyyicvdly5kipqb20nn42rk0dnw9958orxqjwcsq5q84vtvi8tfm5dsv2dyxxx6',
                parameterValue: 'o7gnwlj0oq5zsj5qhu0cm394sly5y28534dzvghkj1b6gjrz45e1jua6ivd5gqswz0d4pxey1bs98szmt1o8qs3h80k1n5fllgodi79e2uazz0cv1huqt30w0bqo6nvuiwowb8n2gxtb1c5tc1xrhemqja9lbbcnmc2yxpebsuqz1xcrbw9fctrhkrmodb1pwsjylun01aric9pacw38tawasejfazhb9h15fjzbil6wvxjy24zenllfe2op3ciy8tbxk0e021jvrbrd95jts218akkf8wn1n8ai7jla4ltyy489lmpeu9tcpbuublfwroyw4iptl5cgig1auux6ptr6shzaelijmdx0ju3s4lnk402sfqsy0exoybc79dua3hwyx1ofyfhm4p1l55lsc6kmmp7t216fv5khyn83po3opvcls6lhm3i198rk6yenzytkm1ae1j16ggwwhprrw02vzs07zk25p4yr1dra9w46p4ku0fvah768rpyz21dhu0yaowz0jbyfor8d0ezcx415hqwm2h9545yss37cxk5ez4ibnohula84fqc7xrowcd36v8ovjcfz37c3tu5ptiwtrcljr8b6mihfwi793jofky9wv0wmr3io44id50130ea4egovusqqw17pff7mqvinawhumnlmd8r0shdoxbo55in2wanckco7nooc0pndgov5qhxounu6rny4c488olc66383839igz041qhws7f9wuw9hc4hrwqtzkmxoiymzswsqemapb5kal6s0psxz2h255q4c2k9btzs3kmm4853qsb6r2lb27kq1ym56lf8nxbqo0iuwahq9drbxq9nu792iu4g80c4byuwnu82fgkegztjah9mm8vqe4585hitgzbwqxkblvg08vrwkzx87q2tqceswgrmha7i4x0y8vfj2znvd2l8yei9n8amljn3k1eeo1m78uj1518s71d3hzcwa11o3s4x28c10v0xnnb5m0p3j1tjmo0xexkqm6zsm572hwfnmxey5aqa9sz7y7eun519ctqve15fcodmyboxwqz1lmzr2vvrhc7l1pwvb2qmk0qqx9xs57ijphqdfb7njr9gvpraj4wmlqabul7izjwdfb3a519ye6xydnq3rp64x80u1zsj93g5u080dbsmog6q0ojsla9mb2xdp1a9cg3rd7n5g473d6s9uui7i0chjjxy1kc3i66go05sarypr63etajx6h2pbiszdn2fk3wt0ups3do7ibkj19mhftoymrtc8sdfjzfun7dewpme4jtnicafqbb6g8k34bju4sckyfknm5ebensplg0eolhfxj4nxw076y8rc0pk8a65pofsywk4zoezeckt4dno18lot81sobypxt8afsqyam1n4mqlq414jcsaa8cqnv1y48w3kkpey6tt8bj6cqwjh2e80geghtu862pbffjoph9t6183fe9i9qxjditpojbqze0om9bqi214lw9r6ts6w5hpq0eeyxwzgavit60y3dncp16nv1akj1jz083lnfhi3rut28m6eal73k5a1c8jw4ulc13hqyym68s8wt7h3mugfxdm56nhayagbbxzhxbxfk2a752gbh4bvrolww2nwk8f1t0mie28xdxbyhs7erwfovuhji5dqq6k9jlxavxwwwkoaj2sm51dwzwk1oo0inm2ebn35e5aspmgjr9jc5z6b3c45qo92362ozyg23wsqwc4d80pof4pzf9e1ftv67ez4ptnmg3st1j7b37bm88a0huxqvdv9u6ygub68k0d4u3rku1ejkrd456z2kw57owxx1z9xthjzvkg8u3rmw9eqllw76gyhv3zxp8dc3x394yd6vhrbe8bop31g59cgw4o4pvyuj35bx592eygibtz7t14wh0evcw7pvxiknru7e08vhkk1zyo43zw5w61mno0tconahd1c2qov0z1x0pi1wm87f59finc31lu1mocfo1tww3ypxymp88a8sk0xfbs50v1kb2yc0kotsek',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'wo9ih9dsv6fvv6km2wzejj8xgaj0cn32911r1ojjg38hmbj6d3',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: '1hgn7oyybdnqtdazoy3o',
                channelHash: 'omqedax9r0pvev3ldqbei750hxzp47u4m8ukk3zg',
                channelParty: '096j1vgz9pk6ncy596h37i8n4jysmirq4vwtzng520ehme35sqmtk3fy9hyzek0lilb50phpn75x6gwemm2t5ca7zw48ure7wn5cvgixybfrs8msytdo08elz3j806wsqb8pkpc74qo366fb5ypa4foq953o64gm',
                channelComponent: 'kf43udidglthr5qau5h1844aoba02t15aacqfz8e7516vftirwci86tz9oh9oqtfwrzikf9u6i3gy7vkb939npjgij0x9zx63jt5et10txl65vw3z7tbggppz897dkj8l2wonxidgja6a1lzgvb2negwbvrrh752',
                channelName: 'he966ynqo8jb7242nnii7mv2z0tygn3v5qvmq22s14khko58ctidccqxn74qm021gawdlj3wyyzavqbrd5vohpqxqlc8rsgw3emky84d28mv7jj60obsy6l2xgk0pwrh9grec6gkytm44js3uqgfi3v6wy6md0tz',
                flowHash: 'oeaff12prvryva0z8kdxd3p1zm7i81ra8ykab9l5',
                flowParty: 'xcpqfmdtdlkgmj9kibfubwd98kra6ov4c7h8fcyu5dqtv07kbg1u0a4blx13l2cj05bnqeh7fg4648axx0w1702jnt7a5jv70tbg7v1td2h6879h0yg1qy93pqsna8ertx8uxv8zlre1ah3m8ckbx579qk8kr7vv',
                flowReceiverParty: 'bd81qwapq6402xaak13x1vmikbnecqhfvojxiu9rm6iuek6qr41uj78h2p83joe5a5j2no3y4b2ep3esbhalwjujwkmx159ovo6mzs95ap2n2cfttageccvfapvduog71klecntg0v1ktx5eisgviaqqqexzaz7v',
                flowComponent: 'ha9kljqtve2lp65i1rpod3v78li43lfyj1bcz79xdlmvmsz2o1gqxsowklqa3qj1vu7lxjp5eabhop5237daj9kxjfappl7kpbgywivrumrtn13f9f9feiuel0z9rn31kissu84wimjibqxtk6ua2nkbaillupcf',
                flowReceiverComponent: '35fa2yx8s16xninpneam7y3q0ogpgjloj93ackavqdues0ftvcqe2r00r8857g3hn30uoka0il9uwx5du47xamdjpv9jugn736lmxfnxq0bdfugtwdibvweahf9f3uhwkjnsg1gylbhgktkfp5kezdkh0sv6t96y',
                flowInterfaceName: 'nscx8plhnwn5zra0szq0dnmtfaedjgqnx8pxg1lrwgzq6t82apd4fz4bl82n8t7zz7pwjpou2ul4diotufu4u7qqn3ist0p5zp2leimy2ju7ucpja09x8rp3334ifhc0bkjapz12nlabancx2bxj7277574gba4e',
                flowInterfaceNamespace: 'ucb6l3md2url4gf4oovolki37tgsm8tpt671v2lcujlgest5vn3ekgde3fbnrsc2cdud8nl1mbulgv1xj7dw7f914nr231otyvxec9y4b9nvk29gdemhn8rptz4gagog3gyupskctj548aiime4jz0ezmc6mllso',
                version: null,
                parameterGroup: 'e4r6kodp6rtux01ln3i82ig9c2scsgzqcn2tg8a4hkh1vnzqwwlex45mq7fqzu0f6yo3llp7cjovczqee1l09jcbpnm5s2eeo6zhx763lvci95q2k98ezfagb0vrjpud78y58o08n2zlwf9bia1sqb0g899ctc7bvh9bjsn0b3aq9k9n1plqcnnxrsdt1prz2ci2dq1g2xm8o0xx07r1dvjcaqcrneuknebuqvqyb1d5gse7rllm5ox9eq8ns56',
                name: 'blhnvwc7oqhlai2mmfrtn6qv19xgeqeeid6c3fej5nzty89a0zuwck9da6l2szdb6g2pr22xpun71anlq26ttsagmjalj8ltbyx91y014jgyrn95rgw9stjp6b6ijg74oh0h1f7nesqm6pa9qiowtb5a6bcyaxwupjx1ku1zn03oahrq5y25mg34te87mmsbde3w1fju4zqdoy54ne06qcs7gdt444fq2wlvcpzb1qqbrjvwrh006hwn61ult2atcijryhgvowd33cf21r23t9r1kdthhtcovkw0qqn8lk92ic95twnpyw239ahuk8j5',
                parameterName: 'g8khpcjfvb8bglczysuplwem7uxpz9ksf65cmls4g4c91ju2qooj4q28akei85zbg369vznyecwy8hfq830c6hnecdf2q1seuxq441aoqmkwy48qgywyaqfaj2jg1dgzyea6m1w9pevdb4a8jur09scqevb1z1vsxhx08fs3im8azult4hjjnuh3knp6erpos5hkqv6zbnwes5igvlc6z1jbq2f8zpuv48bwwrib940kbq272nt0u92q4ykrslg9o5h99kfjo2pyoeczfazwfpmogxk69ve52blga2b1mwuuehinpklfxbz23opfeaye',
                parameterValue: 'wgglwggwzuhj2c6weu64kzivldwl6qar5vajdrlls69wzrywoj9h1sh44vqikb76yd3jch0110s6w8edyb0pk4z5u2437outv3nkul601am334hzck2wfvocd0jjhcx7nlmzd8lldlejkq2pkdlhp6dygmubk6bslxijgj9yjeophnwuv5qs2gr3sf3tvzej6d0yci7y2w56foimjp28f6h8akw3a1lm8x2g8xjx9qnphp2s1ra7vlb6l2ok301f3lihce34gdoef7g5jjghlvw5n3i3o8knwe6o7q4whbp0mene5q8tebyycuf02shyci0eyovijtsrx2sd52ryv53yu0x4lyuc4s4mi4vht7rwxmnkg4ubnghfhru2tzt8q42pbiwe2eogidmdvti87wexmm8j6yjq5mvo2jvp1j4f1xghmfj8h9an4lgcuaplk7kbxw4efq9mh2h2uh462wfiqjsj5qcvp1t5i54fi7039vfuevi71toypjj18j15vk17b20zmt1ikxxdf50cgnma5uqi9w9lrwer2ba860aj1ohwl71yn2yoka4f8zq6w6leedxcx1go8s3fzphmuirpka3bxtwoa2sem5378wxl2n42gltz3ww67b3odv75omjxtxr89fwgftioufu1uetu483nhqyv2cxqpcwd4k0wauyfgnqud18mzkltiumjx4tnu5nsqyyocbp2kzwgfp6xz1mq6a0ynyf9d9hqm5ewygvkygohg2qj0a72b5g79xtvn61julvosq5jed5l0vk63wkk8z4tkkx27k0qppgcoxbb3ygfkadnz7tewbh45xhgxcu9r69ljg85au872yrc8ct20tw241vnt2sl5i85xxk878dyhts0xdzfh2x4jy71piivvjeyhjcxr4dr0ljwyuuxhozdfpzevjgbl1cdtzguduv3cm9wobvbfdwf5470vmn69n4ocedykbbb3rw9cvogkc18qlcjiobltvfz40pviyudeunah403ft7kdljfwkatj9skhn9t0v60tckuj7k084ouavp5kgp5u50yvcdb1yb584fs7ux83sn7hnjscaxxrdyayfwmxfn9qgy91fit61o609vsl69q57qzok9wtu9141202koej54zx23o2kvgg61ver0qztfj5695ssv8j7ft36jxngm47kwxeaivyn3nejkqoamjq2t0bs85efiyloxcqyl7itsn0d25cfv37ifngdsof8omewpcmaklfv0hviociadpn274ajut87aju29rwrdq684bwxkodksmuhlpzuqgzjg6d8np3xdfj21npkb2kan3m2qc6qlcarsb3i6j4qo5v09h3uzap87uogth2dtgroi1rwbhyshdzq0gh8t6fdbh5umqp1qjm9uk5rv38ej89rdm3f968be9v94qpwg3q014g5tolwc08lfp63ufo7ax8cqnzkik2fvihy3wzoxzrwkb0ecurybdxcjgus9l00vfjc9mybae99xe1s6npwq30tmvohp5l0xhjbpf16juakd0djc4umrzxy35ad1ixgqudwfnkazu04vkugocib0lwdis2ld0uyvlv7fq3q4nv7rdct4cdhi5cloiysc6574z12gq2380c4gydt57q8nffkj781hn1dg8e02xo4k7acn69l594c3w1955zb70ckiwqmr3u4vte6nshh5ay8rx7squ9w8ekf6thgkf5k21t22m5sfjyv19pcia2ajqntaga6i8u0oichw38t4z3i0jsoo6waw2zbladnbbm6l6oj03rz061daee247dahmuzau380cpjtmotskcqbhu266lwb1grqfp8uslr3rphxrrztl151jfte4wjgneex468nfhz07yxay4qc6fmc8jkplbnc4o63preq722z67etdetazhvti6jbem7j6bejzg4s391rng1kdjagka7g23pthbiv4wkzihe32hle4c3spd8cvw8k7kpbmel4q2ig86phejaovawuftlwizlw90e12xfwv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'lb9ipxkv8jw786t5x1yskyor57r97zs31o3g46u3lbkmkcowqz',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: '1rdpc0exfx7x2ge9ayx4',
                channelHash: '1962e57gzcd98n92mw0gfb2e82onhbzfxd61blm4',
                channelParty: 'dwln6y14d3szbv1wpqkmwgx7bveqe3wxsect33o54xcp8kzphgkdv51oa3o19c2dk4d40jebokk9h6k78gc7ob1xc1zm7apoaq3wko8csehuyuy761ck0m1t6fgj8fxvtg4j1odjap7zk9tlyv710gypladltde4',
                channelComponent: 'acav6tla5v9mzlnd23n1yle8cqpn2e3c8f0kocg4cnxt2ugm0wx8tb54de953n8inun3ae3g3kb1f8u3ju1xfiju7z22cb5yu0o9ex20yli8s535s0h8qfno4n4fkx4jjwklcnftjwbtbzlhsg6u090f6yawx2nz',
                channelName: '4hc1d971xep2ur2iqe0z4tk7e094hxxlbecslfv81q04z3i6iz5f8eefl5b9l0r2mzasa3fsg82uhabwiat242vygz5kqlxedbdqk2e8bap2w8i5wfi8tyqddzf17fz0bvvb8irlezkddift1evrjrwp75f92co4',
                flowHash: 'ar699z0cycy7bxg467ch2rwy7ykjcyynwgqy8lqe',
                flowParty: 's35f6ozfvvsf749yoqwmbqv40ckd6hc6bc653u5p69j8qzp5oncglt64olpujzub7y6q56ot7x6fe0j4r9p5usahxpqqls4d8uj9z3bnzfsyn7ufrl74lwofktpf3khqw2s3qui4fz4wr7z6muxi700vfqlj36hj',
                flowReceiverParty: 'hqcgujd4vuem5vo5h5jx80g7gchlbg93pyl4ykntf0jvuiet9mi3glt4wdvnjj3k1mtncc4zu8bzelc4i3viunbdvpsb11wp5qvm8du4kxi1vk39bxboix5bknawr8kub9ccdtxesvvswkp367rv96oqgm03tphm',
                flowComponent: 'pi1j5gqvgutfmcsvsno5zax9nof2sszn9lagtyio3wymzdsgrajlsu59dcfcxpe2t9pk0gbhrfbci3rfsw0zpepi25guteojk9xtzvf6twzb69vea5wcqy29nw8hs5qulqv0po3zvb3081g8ww0oy0esim8v8nl4',
                flowReceiverComponent: '7rl08d7ekkaldsfccwxhdw9mlwnmp14xcd234bg6u9jhkoofjvufpw4zm958ehl3obodt9uiymgoyh1kj1pj96my2h86psp80g4yneg4c20e4nxtj50pcihq9a9mm9u2lvr300l3d823ya3ycm3ubllkei4oehq4',
                flowInterfaceName: 'y7aw5z4sd9jvc4n9bv1ngw41cmoi88ysf9um0ao2ab4llfd4742sxxzo054cavcsomnimkooy3yzgxbpkz105i39j1ahc2njojmiyrbwz2ucjimr2lvmi3hwdvy8lekk2jz39o3ult3nq1naeynbe31d552r3n46',
                flowInterfaceNamespace: 'i5az4dpbdus0lvzftasmhq2tzb585znmd4k8363r3buidm0bwtghnt4jmxqogl3i81kcr7q8225tchwgwa5qpazahsz3ami57ak2v31xn4bjkt0ed8ts6e2i6ommt1ltxsb0dcmwqsb3syeq78dm6afjttcxjf4s',
                
                parameterGroup: 'ket76mnau4y5tlf943wpzwdoem1x9x1asqs1qm0x6a62n8bbrhegtna9ex2dq5mfvevunlk23zq7x0xps32ve42y6pehajysm1drhn84m3tbotd80pvi88413yi4ulw2tig03m0iwxiesp2h307nkkb888su81xjatlpamfj8n9hyrqgflr5qf8boelonghwjrpp507ohm8dtf5j6j8z7bxn7l9ahjvf2gyqrx96bz4a2o4sye1y4zujgah4dyt',
                name: 'ab9ssw0blwlmn0ci5lmq0oxqgra7w898x0y7shhhmyzlxfvpewju9r45sw4i9gup80ouj79old3h7rcfjs64d38whsx6fapa84385v5h6jwksrvewot7rwkollvjzmgpajuc7z62jlo5op7g0l8omk76i6imvcbxgk40tw0w8q647wglea1qebsi1fisyfdhkf96zs7o0pkz1m0uhkfozkpw6dw0go55qlahyluf6iqhmyrx86ykdxmbdsxyt9n4paq8d0ug0csjjsbvq7ng4de188iqn6ny4nvs5pxv0i90vgs2t652qxs4oru0rfgz',
                parameterName: '7kunnd9jgkzlxzoczmfiflw31afp2gvy1bk66lho3aazosuly5uardb0opu2b6vhx8bp2nulseqt9ohmen4r8o10ncb8jdk0540f94fpn70fhi3etz6i4qf9e6mhogdxht991pzv12wxv0r5tvxec6ycyb7iwn2l3auw1hufyqp2xufbxkym71cxmsop242yhbq20qep804c0tzhwphtx7ru79wn8i7uuxygxukkn0hgpsbe70g03hdtze8qngqxq3oj2qzuhdip7q1g8ah8bk89lq6ti57cs6f7qk3w7khqfredqy1xod3hpoklbps6',
                parameterValue: 'o7b4b1h6gexnkx5tluv8q7i7w9spo82e35ydcpqdmi8wp3fbmquae17ndakdzfow0xub6cwljbtgeaoadz1s1dd0gb191rm7cz3utx8ax6gp6rh5qri82dbvet0tvwbpyel23acbpv6duy3blg7z3nvki3xro1uz0ut7p5jrz4hlwmpkkvgfwugwrsy9ogkxf906c5bwwgug6t5d7r01tf8cg3ciy2zou7we2i5i7splbcyozjfc7nc2jwn8xygnglkra4jp98e1wfjpegrs93swm3gg3af3jehuw5m9isuy7134xmbtl4fps4dlfavr5agn057z5q2s7jienmp7sklxejaxofq0tdlry3wnnfg750e1glg96gn6s5oydxtnp7t6kfqoubq1cej2xet4wsqegzjids6fo0oxemfx4d07lx5ml0i5wiknfmrf20bahh93zlgbs6zw1clihe4thwgvbw42v9o3s8s5xxzc2aa94dz85qxns5njbzdsogksnk85ckpnlw22yjv1pivtd303caxyoib5iwiydqqs3nziahkjy1v3zqaibs1hkvkxx9f7lgx4fegyks57gn3q3b3a340mqvwp9gi6b1joml5udsnaam9obi5zfciafl5twtehx7ecgm1va1qwgoon2dt0lx1aev1dbhi6u32br3vsfbxfghmdva18i8av7pkbjcqr7gpzpmi2738sd132k1v0e4m8vmql5imj57y9jzflr7pu915onfj2ego5fmlpqsjz6qh5k2hcpvnicblxn9q6a7puwdvgxgi5d0fpficb1pciqv0god5tdkucg6ao190i54b70uju9jyo4ejpftwq85dao3jccvbahbspj95hlvlvfcbwlfbbfwps2fizsg3sh3zhi6p9p1ze926aphaftezyzfpfqotmfgrwqw680bu7qn9ebkl1jqtl5i0vahiz6grwj2lv8wm5j1c50gzzre3yd0bx3eq475n4nelwb0szlvya3a5ytht9m7zgfjpce2tww4fdlie5m8gq4xa572trbrsq59jtjb9bk697wrqdw6ij90djhtg920i0klykk9xk0rhkqk2gwzbvt6aufiu6sghmu35yiu7s2eka0k8cjhlcnbjy05rkdx6qlx8iqnyvld79p6ty19krwabyzespyany0c0zvk5soe971xmyyvqtt7zj8vpbpjz161gvbpq0pc0omg11r7h9zifx1okljn7t5azqje8hpv5ixk6mfng6exwybzsc0irwplh9v050az3omii3m3xv9cr9579h3i9vmuv8myhnmcvvdo4qp7g0plhlltld0m8hodoy8g40gfgd87n8uopnbsvdplt4p7u7zyvtb5vea0ufs298f7tqph7pu0c0zcwe20purm4auyiaeyolf9yv2trbnhoyua0hodbs28hw2eh9gemvur8ojx9jabg0pqujsn2aqoyquj3w31zphr9ayckwekdbrso994m9iac709sq19tzaoujn8n8z98p5elnrtnocjkqreujazoo393xvyp0w619zxg9n4cr4uincjlysdrx7gwgd1ujdovn065vrelfvfpvrjj2xsjovsv8z1wyjbdsxjitugvajamuv1kbojuo2s30zx4usonswnbannnnjggv0z7tptuovfelorjj0yu8s33svuhjxs6da8do5ewqdx3uwbz3udv3ixgyjwobxddy248dmyrqs1rhyarmj0m807sdalphev2t65od38owawmuweiiw47a4gn69j0chi9gwaf7ofpmbwfmfwcnhkzzydbvhf6594wf58t08qm83ntvk5orhy2pswv50dqsoum6bn45ee71mltk02ydceu99bk9ajpqwo3q3jt3g18mxct6zvitg4nkbx3175akj8dkj14wbdvvr4grzvfffjy83qvzf48qpuy5e6bxbj2h0pj4a0pb1qb2p90vn47v4lgfg3njmwpzx9b45nubqnti0310bzaa98dwbt3rmtr2ow1e5q3uy22o09dw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '2aa1ledkbfk8vbb999tm8k38dvad30g1ehmmd',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'pdwwsxnzxqrg3u6enmpq5ttjooj5r9jp7cw5n13wakua5nu2hc',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'lfd1g5ackxts14q65kgn',
                channelHash: 'o5m42nxjseelpbtdzkxxv80ray577ngjd8rzrypv',
                channelParty: '180tn5pc60n72uyje0dkpogu03w1ufaqt0y9y0evkw235gzysqqtm1rjq3jk82jmoj089mswbiad78g27wenetjgtr3o7iv22cwma9867h54qp956bd7zw1xmbze35jx2fl7f8d5t9lcfxi4r3h8xabhjorj8i2a',
                channelComponent: 'pxppgk0hm17vfesnte71of0gz4ny8yk4iyrthgf3g3k0zgsr5whh25a4po06xdcijxt6gof2slw1hy916qz07abajgeevqyyd9qszy7625vtojgwlrrz41okeqpvikx4p9k0njb12wn6fk94euipjjmj5xs8hphg',
                channelName: 'f2vmqzkhk66d7tj6rqyd85ui0mcn86bk9ak1iwhfis5bakzbn89l2vsgsrkxy8kvjoe6wr22c3nd588toqvvl4hxuolqiukwrfm4h51klb8qzscacfbgrv4dt1k7yzmmdahdh5zo49m0rpv0744ex9veh7bwm2e0',
                flowHash: '5p320yep8wlhqra2ltylkyuxako2z59b2blya61s',
                flowParty: 'wkm1x9bsjcqakg65x9coeqg0y0uowgw8vonlbsel3kzwhk13kf7s9el99157n8fqf3qpjyxlshahjdlty4rnvfyodepdm1714qzmtaa7t14xxi1q0pt651hu5mp2wjn667dxes5xkhphd13l7mkq9madzb0xhsum',
                flowReceiverParty: '80js0qtulig5rh0qonprp4t7yhfxd0vi82l17ramof46ayiop9bd0m2o0xt0tlpjnpjptssg2l8q757kn49i7cwbx8iu1tx6ru47si6zieraozwz7bddbslxwvkt3q0zo3qo5tyfx2tg9ynofyi0scdh7sinx7ku',
                flowComponent: 'wreoinzrxaqtck4rwiiir9w12j6pxp6vh8gn75bbrqr3rjqjyi33icvjb6m78vfbxpkozs9d8gumhxrp8ydrnsp4sieke2zgvc2aq71f0hqb8q4oz2gfsvtevst2g0wkv474kjjgypzposcaduy4y96m1e57rxqp',
                flowReceiverComponent: 'lyvamegco9ces5kehwgz46dg7ey2t0kcc3ugsbbfs8j811ieoizuz3p4p6i1qpznd5i8d4aeyjq4b76d9njoxe98hl0jzyzfpu6sifg6wg9xd7c2uwie74nb9j3uy44o7largrl8eu9avi634p09kqoqhu4xchck',
                flowInterfaceName: '9kdbp0zv6h7udokx75n9i9h9bz40i6wfnjzfdbq6w5qrdimoyaxuylrorpiyu57gyprqgyuqhrtd6muq324yds5oimw3om03wp02rr5tg8u2glzfqihb05pakckjdvtswaxpkpcnwvljqw7ffds4xmwlu6ddsedt',
                flowInterfaceNamespace: 'yg1rijztcw9wvih8p8tcn77gaepq0chmte13168yhhukydtd50no0axsfdf2vlcu4teumgcee0l7tpw9o7886pr75s40v5ho7s9s2aye1wj5yneq54thercvrw6t514at7h8rkk1ctly8ma4puxuxwhyfvtm3p1m',
                version: 'am8kf4yxppnqhb3py7pk',
                parameterGroup: 'bkmz0gphe0vblq5aqsn85xdarwr7vx6wld9q3co6ms5p30lxycylsei3b1949f2t5prgg0sfmr69y3mpq1cba05lssoqfkm9le3pllxgdh0xjveuil9314xqnlgn7o0veatk36ods3plmxi2e5wz83g4n3z7sh0re9hriuicev1zq9hwwlbdoxhmfsrto4z1btuna7gikebipuw32aallrfddf6737hfuu55jbay4e7xjirhzzpt6fhr1vzcmdy',
                name: 'oysr7jjle4tqlc46bpf4wdvtpi88l24pg13huspcp426159fcyjpdq709yjklfe5c4c48rs2yf1hlb1yaoiiylcv8smfp0yrbtkwx5xevgcype2gnkqq4c94nw6ap3435ve2yds6ffbmzslyw3cwxqzi638pl2edytfhpqkgc1ys7jabhdhc9rrbv90dqzyyyi4mc02bbtz5hfbpeel4s68f4khea2yp3nf0mx1awenitdt4gytkpttpbdx0yekzsy549v2m046ju5c9dq0imeln7rui6p1a0ybv8387n1ng40qeu5emlgly7klhjbmj',
                parameterName: '5v30bbe34huhby52rpjd5y87v1qwe5l56oh2c9acu84joi8bhokdvchmd9rfn18a63bjw0fo0n2qhthmj7qdcb4c5qppesueiwv5j1nb9be6x6f8w5f785yivcdtgouqxywdnbklwp6x6g71g8lpst0aom66jxety2hagxxtroll23dhxbc1g52qk2l02qzwwluxe4crcre0e712913ywhg16tb5biatdsfjnqvuxl8cqxam05kbux791oybsrlzv61otmk0ljc1bihtj9f26q8nxth88ipysrskxf3qida8uwcrps0iaow02wo5zbrc',
                parameterValue: 'pvsg818g7onaf1zyrkwhhd1wn9f3xs663p2u6jzbs4srhlevepwyv15hlww2ieg02jmrb776itt779c1658qrcwqeqt9bfrg8g1ycdw1o4iwv2zvwbmnlysu9h99omqijgb5vtxs6jfstfzl30d3ejjbqoaem3vuvlmfh57stx1s7uhucik67lb70tlhv2i22yyydqa5dtq3k0k5h7capw8m08tnvhu6z6h88aved8230roitpi6jw7hpy05szlnfrh003c4qbvfxeezcv0ugjz3i9ypigrk0xyu2kbjdheb3e3t8jflifigevl9yhk7bupoh80g48xtw28wvonw7sogl7npjocc5fd85721155cyyqncqn7vh6id02uaz6znfblf5p00eags85u5hghom9mjubimwskufcygajdjz6fc3n0r1ok7f2w3kkmdmr89urvw70nh5pu19tgxyxef3r0hf3cf7cz6qra10frtebxeij8a3biqcdxaluv0h52lu54sxtvvfi5zw4hpp9ldboluodrpi1bj6vl0x9fb6x4gvh8epautw1abuqejpxdv4n511c0dt0dahywudx2w2q6oh8dhjflf9d8d31x3sqqwc2flo7ztzih4li6mwdv8zqlb70xgnpfv6k46eal2nqtmlln4rrnlpebrd6osl35puz8knlntmyb8ornlmc72ojjg9o6e3yqumy5bk8gv10bnd8g1g2wkc8h24iavtyz8nmsnyzke1ij7yjahj9dbq60vxejmy158ftufldlz8dooam1fu8mc40ify1x39cij939lmlmuo77m0m9g0r3mcannfevx6t9jxvyd0vyhfc0kd8oxdpnq55q26mw2uy18aw9r24izw6chdo4eknbqj8d1k43d5ah27k1r1bwhzqsdv48gyde9e2ww60m11zcadfgj3lb60xvzo14gurmsifn52xai58bqj1gakkjr7lk9fzn05azjscimshsbdrhkuky1qg1nabg32dcg3ec08ok00e2nlfjog42jw42zhliqqwvc1ikuyn3q25s1mrgp43olf86xyeh15o11qp40c6pj9p4raj6nzt5nqnlcd4181v43nz9lrqehz5x415efabva1zr67bo162rjm1qh90gal9ttkowgvsl2sxtqedhc67z71helzf2sbprooctignbr9rxqqnzlpwlmer40qnu6ryn5vuqq9fubfxw3xolc2w3x0e0jepip5pixhkdsg5ey82bbm4snoa36gxvq4kwgvtkq8ejdmz4mnqn6j0vq6jse62vrk9epd1kkdl7u0vu3abhouxor84zrr0qjgdulvzme7ld011ah6eo7g8uamt0rauc4tdzh3w1gv217535xc8rt6jexnwewgk3aoj04ummj4rypprbrdm40ttl8h4x7ks3xe1mfsp6d8ahylm0ivvdoe7xrargjv96qe9fpvookj6lg2kqafuxq8kiweanfqe7tisflxrp3936uq2d4tmbovbj0vsuslxkusxf20hd6zws5nkd24dkucj9rw5ikxyu8ietg4n1wf4se92sqcwkgxjd6w09vtbio1qd35ycwhaofh0sehpk7w19cuktiumkqsdx2yzz1z3sdgeviseege2m2sbpcwm77xo4ijwiji2v1mwbl8n55x8tf7pvh9yd63rz819xp5z3ylccs06p2idpq811i44vyh32bxafq4vfbljjbvhvq9pqbmk1npetvm3144rya9d4qte0ta85hohsdie10qo2ygh3ufixfhno9z539le8b69so8mzbv0jzn0x398nc5fg00ylyljj8nfkia79xmd0piel26sotlacp7m9i7jzgvkskjes9pstgbdgst9fq311z40j6ro5vlrmf59bm0detxjp263oz7q6isuwnzuv6jp9cgad56ye5ags79ul3antpis7nnvo3jwhul5y0yhiqtu36elq9dre9xjbgrq6h57k9vsty500x8wvd82nozm2sb3o4litieua9j8jueif',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'hc3xkd0kstc25va1t76on0a1qyhrmk992hg4f',
                tenantCode: 'zjyax6l3syyg11fgwhhmpkiwr6lppnj926e3rcu6ilqebpztnk',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: '7pkvyntzu1souiyzqum1',
                channelHash: 'qe1oq67hfs6glja9uiych07uqlz3yb48ebf56t9i',
                channelParty: 'v5fuaegvtc47x17x2lkxzq0z7oscqajdy7q0w53dfs0b56y7ya3qus625yikch49leoy8cl99nyht8ieuokrsc3qjj4uaf3vya8lv5rlkk7elbn9cwegj9pocjz7jjid4922jcms8ly5c38di8mfih256n2jqcr5',
                channelComponent: 'sxbwi1zwyrtuwpw048iu94oqehmz18u3ai7j7tetp2vepecw75ecizfnqjyolg2xnv8b4fk8pzxqij7ugu3nv1zgra8n0etnfb08jufjtbz14ikpcrzw22vu8pwit8k3k6yawm3c679bi47mjqvg5bvyzwx4jtba',
                channelName: 'yid193787g2kkyt52sxd32g13lhwvmn9u7s4c2b06xpnwnavnglsagh6bd973k8avlcv5j10n8fu2t3zjypji7jg5t8oii960u05akznrcsa83ros4duhyvewcigqx44uy6ic8qxe8g3tcumsf7p8i0wo8szdwnv',
                flowHash: 'yw5g0h9oykzchnsruzooawdzotn1f2h8cgiobzua',
                flowParty: 'cpj00kcdkhdtur8dryaq87z12jbppzqewkmn14ojt4f1re4i3x13bsot59vtcjgquh91y0psae18hozq87v9xncvc0poyp59u1upphcnm3ecjbacqdnjsk31o8tygi4b17eativ2xiar2iakp9k7yuz5i2j63a9k',
                flowReceiverParty: 'jrshefyu3zc2ip6zsrduteustjktmreal6qdcoytgjgrf6mc0be1xi9hmboriju7k8nz541k57w9qp8ct31644igo792tdx1reqeks8ivuwmp9sg29plc0p1vb5zc4eab05mk7qsjgo1uvo3ravt9d31r5bs48el',
                flowComponent: 'wzfy2mlsn9349dh2xs52kt1768q7r7nvu5o7i2nltp0kj9wwj6re6dyd3x99lcprpcggbnxtouqzellk78oi401hahby011z7rk1ebbbjg5e8by84jsnsq8xjh8tmc2cerd7fywvmulv2ew7la3vhhichgvzle0t',
                flowReceiverComponent: '9cqzpeoadpbeg7btrz1ts6e3otny4a2olpuknzmpw2rij14qv22ff2ew65g9gg3p6nyce65vznc1xsskjkzp3lj17yr6xnoqhywcb6ca6typc6sv3m9smcjios9f97im3djimmjs7h152arejw6b72etwiztcj70',
                flowInterfaceName: '931oxmpndko2efkliznjnkjs10082i9czk5bfglef7c3v1wa0iqkg3kmcjrzb2lpds6bzkyt6mc8v4xbtgo3936mvpftt0whuxov0pwiicb0rl1h387klj35vniz0uxclm2j74i83uhw8ta4tvwqm9ta3nenxhiq',
                flowInterfaceNamespace: 't6ovm8k31tocyssykiew5fnlo5r7cxqbh1mifkg6ujr5548s32vrqtuuw6fqjpg1dvxbh0vxizp89qreblsc2po9bpj80khn62gbcyjafbrfczdr5mozqagyb1ajw9c2t2swx800o2nezllk4gvjgs1ispeb60fv',
                version: '546wkeyrfyb2z85exggw',
                parameterGroup: 'hp9tsot1kh0o74zitdm94e37g95lyhuqw8l3qv38a6rgckq66xge93gk32dyw95co9nsnc9zbhaue3rcc4jkp7i8vq27mk6np2kq6vtd9x3g865q2bz8mvkp7xam2yaxlv5aq3w3m98vzr89vkwfv1qshk1ixtzc2etha6d5p4j91fg53bmoe5hk9hko687d21wes6fyha2oiryom6w7kpykx80j3rm6qxbzq65refn6e51bf1uefqup2prwfnx',
                name: '1w9zfxn8ych6u0nh74wss4327htex5qdt75cog2ui9sp4gul7s2u2z5cp4sc0d9ov9250cj1ekx3sjt68yed78xz30ao0k24cm51tsf897xnfipjlftjks3xtyz36kolzfgq73ctu3pxa2ofykxte296yu1ahagctlbw9p4k1r6fi8mo3ihto72hyu1iezo3muf1u39xwt4ebe1j239ddrkk3tizz9dbmtbx4ao6ey6cdo1md1z9h1jdlwdyxsqzz5slffgsol28vmvmab2oxh4dnw365t4xzo4nxa0pbexi9o6gt8f5aem0cf435htq',
                parameterName: 'tugsod4sp7v0kt891aw4liigxtm392wnk7so2f97jwlcybn3pmjp34qxbnho5r093x5y1oyndi3svkcb2ta06krxhec1vdiczznib7bi2syjhtsjtxh2rslyw3lr88oyo5f59vjis6bqx858a4oh8lss79sy9bc30c2717lricxeweem5ucywo2zmc8346xle8cjadvtdmwaiajo5djj2qo5uo0n7d9zeb6f9d9v70bk65y6ja46fp8ni2a2m8u76igj2d7t0nzeft2x0uvk6gpso40df2j87g3n314r8vgeveb2ro1n3lpclwzqvdx2',
                parameterValue: 'r9qg9uxgneph60q5xg5dgjxpzf352f7pgtat3w2touviknt21botgvs5vaf08e9wok73xwaz4me7722qyid9jetil5pcu93l7xs67wqqzhem9vcb7fuay04zyfvdvem0uffa462flok0jvwfzq5x8pmkp6ywgpyfr8t4r10e90iemotw3h7ncne0wjwetmlkp72fnscs1npnhgs4jgha6avv8klpfzbh3v8touxy4sb37h25zuns60wspv2fc42s5o03aba7f8eww5jq74r3ch0ex74l9ncls085uulthw2rv22lcipxruc1hmjp2ohp27y5c2vwa86f395mzqhh9yswmokbvjpayu6h27pkbqfndn8i8biu9pp1wg5952alsy910umdjovf0q4gxkvgq8fevpyhmdjv7mvu6mmgd2pzw4k0sf4fak9f6nc52z84cl6dnp5ki5qyx6rdx3neh8tozsp3orulj4ipffwp3ryq877rc8amdwadcvh6g1ddpa2x434nbq5j5aczdedfycjcvlduhbzkoumicjl0tzp10oam4dbhevbhfx5d1cy699b1dhtwgiuua5ujxun1yi0pm1szntytr07h985psy9ior0sizm81zl1ssc1iosp9hqpbsuuwdtrh4ep2jaw3bgu6n8w0wxwo9znia96xwgci02b2nwrbwf4md8dnx4cr6xqqar7qgx6wdriv6qde2itgw2jqjb6gvredr9ffixeionboobgz3904rancqp66akm6apzfj2b24t4gbmazxgmsvvix7puqc5gltkz76vg0r7teeklhql22hdgd5xki90bnxk3spf4kesbpih52ttu2pfkrfl4a2e3nfmg3m3b1whrl1op04ptgi6gfphwydb5phkxm5irvgcmjos0zqwamvxtpmh10t6o9hrcuuw6ggbvviinrx1z6teicgttv5oqq94ird675h1lj8xj5zr19br7nc8r5unwlooece18qcifol4bk5pruykajfmuopaa8vnlmn0m73dbbz54kvcumcjh6slpb6e6d3bun0hje56xkqdeagilbmhq1bymfjt65uciur4zywt607qvwffp1p6oimou6001vu7yczdddkzo3yr94jy3ihgcz9th3jcpxc5xbzibwfgeb6hex8nlipqsqarmkfa6vb5sxgq12z825eh5w890jeh4qsoerp67f8cx9vkyb6u9zf9nq0ykkqq7di97tnvpvjlj9xywig0knwg4qwers4y4459ci35bjbtwwtphgrq25g7c7efxf4xtlotdmkdh3x8j9rrf5fczw95loxm3x0kxli53pjrpcz4s4k1r57mp92zlm8jnz9iqtb2admekdyb7g8h31cdhdse1y4b4s8rsnt3s1vevbkc2ivqi4ocal33l6cv2jsz7yzjjs04s9x1d246udgp1pbqdsduv95tohmte6x8pk7gb2wtfupc9bab9arz05fgcawgvldoawvkr2z74a2lmrhzwjxgf8fmz9z60fv6uvqit020paa508hsbfmebrtqgrcq7ccon9g430f89x2ujwrqilgt5atlcwiely01gpjkmg70ur88xac1jxexcd7ynck1f0498gmn4n6crziqek507lx73aglzbx9rcaf166r1z5fdlcnxdgs92348cpiuzbke9raluek4a9zww3n22c00533fxkrn8kmvutl0orlsmxgbzz079429v3fr763h3udrl1r7j2gvxdx2l0wrwwyypfe6uqni6p1428yhuvwq8uctx6a645mrr2x9ke02yxpvagj2exfu7yhqggh0687k1c40bgp8g890npz6s06p80l8kqs7w9sptlo45scaq9tptabmv6vbhcz3pmcts6p4z6nkr9zg4hapbgzt2ctycv6oq1ohn69rrdbwro146y8wtcxqsy0yuypowx4sulrykou38uy63kvbc7efi5jb7b72b3imwj08zwruzjfspycgiaq2m0ks5ekw8inu1z8bf69xwqr8uw2c',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '8ylnvdngb75t5rr8w1te9otzwd8lqz3ti3q1wueup11zzuoz4c',
                systemId: 'lnp7fdybpn6a7wxa2rw3o5qryyowx1sw5j6rj',
                systemName: 'auz1sp8ry88hwo1isbzj',
                channelHash: 'glfl98nrwmgfrbkwt0fo7fij57lq70k9yg0q5d2l',
                channelParty: 'qkb4bvyr19iy2zvr3z6dr5l459ttggndn246fc3bbeg66way9dil6860pahtklu0agm0srjlz3bggncs8wwhys1q7yyxuehvy6gl4pjxl6sjbcwf7l70oaobx9swgij520ywg4b4acm9oshxah9ch2na4k1rdgxe',
                channelComponent: '07p8t2zlxvlu702qqt6zoaonrl0ue02vcl8fsmbo8gncs5jfp21r7y8puakhsqlw1op28txsjc02hhnwk4l3i4w5xjfp7lj0ual7yq8wtt8xgx6s4ljv15kz8uw2z43uo2iwsgnxw2ve259jf4au3605mk4pyrhz',
                channelName: 'j4tvx52arxencgkjahzyt0m75wmfxqdfl1bxk1y3opjgf3lx59qz8n44xgdeohr4p5t2un95dxp8zie6dx8xshhxynwg79zwp3bky2ld9db3layiv3osp2eg3f0lqb17agqrpz8r36560i6ctoyqmsy5iw2zk9v1',
                flowHash: 'cbegqeund3r217kkbl4t82ll5m388sc7xngqfd0a',
                flowParty: 'c7dij3ufqx8c0hksyso86g9v67xn54yk7etevwmwbhrrxktoixvf2q4cvzgw696povyb8uee42nakhbvy1l7zl7j5pt7ckdkts4wnqj6ucfrgx5u7yyby3tnwr43tyehn0kdyl8zgsag1p6g4sjg3u5v6lae065v',
                flowReceiverParty: 'l56jsee3vmlnz8wwzikt8whi9dmt7x0v93qg4tyzm7gqg14k5kxpjjpgqjvus57r40666evo9e3kg95fn661a2cwj4tf4lh4xy80d8afay4q2picv5urditci6o8cmhfhjeiyw77lhr1x1qpzi03rfterloy8cox',
                flowComponent: 'fxt1tmjs02qe0s1vheyqmo4370xwwbwvmq5ue096mj79qjjfdncy44lqgfgyd9qfntuh2plyjjrwbr7iyi2m71fvavtp1g8jywqkiubyf9m4e50cthgijlzwb4l0duimwahrn6qhvly7106webfvuns5uiqmqm62',
                flowReceiverComponent: 'jnq9d6ckchxeyblcnazg1h9ofx3kleafgm5q3tr3iehg86ouix84dd8gxhzyqrry73y9sfnkzouaayatin26xe5bwpmcyabx6uplc8hr28cnndhgf0saia4ikjor47julypk6sz0bvdjqfkthtd1jt0vqsmvlzi1',
                flowInterfaceName: 'pos3gixth4xuufaorxv36gt5vujrblofcqgbr0axtoap40lse4oa3157i7p3jmk96b5rjo2sqwc92dnltdsk6rrv29ki3iihsk49n81gcqxsis9tzipgzitqtxqiagt0pcjytklnfniw7unbcjlkq6u36y4utb3s',
                flowInterfaceNamespace: 't3dzqvhv1362quwiojlv6k7aqis0hrq06081wpscg40rq1uqunckuzg1ytaz3kwsewd4b4q7b3majur4s6jud1kbyjc2tuf3wxdtwdcrlt207iilnrm5tt03kszt2407c3o6hiihkcgo2qhndss3t9vxr260bai3',
                version: 'rulpf60vh68t9x541svf',
                parameterGroup: 'xt9lk6kgm783s0etzotdphwuf9neo768yipcpomaxrk8dlf8obrgoxe7mdgp3knld7f7egsw578l0759ogi5u1gugy5gbag783culesgxpi6hctm1fzsq46kx3pvwc70wjvx5hv3v9t2j3p6c1swmn7rqhttqt1uv8k5sca4wviz0r5jtrmb0bpq6ailtt8vtm5so1e1ljc0zj1ffkeahtrmh983njcurjtd38nkp7d1lv1e2yma0uqt7pdj1y1',
                name: 'wuxucqm4xdexwrptxnr802iy36rb2p1vtg7osr6wrfbhea5beap8pnoa0v7j5afsxtkeho6i76dv5e5nntz4ul85v3hvgtszj4ihj5b5uejakem3lcra4o2iab280696y5hy0dr48tpe5141vwt4n1k7zltteywh7g2ovoojyb4hewtmz4jq3pv1aat0us2mfrrkakp5bu2csyp2z7okvjqhtsr953ganhumku44j11dybxh85v59g1e0aqed2de900j6qu3xc23th14nh0i0v7qk4yte5papl40k64gar5kgemmw8h9axzzgmagpne0',
                parameterName: '5j17725borkv9akqsdlu4wpi5gp7gjgdejhwlpt0gb5quk01cnrsqiljm1znba9su5m4wzi75y0bo1e2mq0gl3tt1uv75146vo2a7p7u42ne2r2mc9mazeqbwsyrmpu1scecr6bodu721vjlsktwrw60rjqvbadg6bnq8ad03fwvm5954c085o3gr0eb8we3latyz45i8jgxmb67rxeshvy8ma8d5ir18lqnnjtkeon2lityrmtpbewhalir2l5c64u5bozhq11l38hubil9t5d5ge4t1pe9bsm0s2arniy78zg8tclmcxn0n0slpsxe',
                parameterValue: '660jr7m4cnker33scifsbj7fer48avimvxzzsgji1rp8b02mltc0b3crtf5bvptmw25kefzor40fyco4a4gf9wntphrt9jmwgoabbpztm7hehmqi82ckh38gh0vkxe7xumyeyuct922flr0dg3ayhas97o31632dbm6w0w7zuog2jhg7lish6lulo40ttm1kw58hihr4cch2hzz5trm25lpxn158gyndl9a4imn46x0e7zn7o81ckaicrgke7nuss59ueq46lmm8k2ytlp5po90p5g2sjahukhyw0z6yc4ot4qnf19s0kb90dejp5uaeqfbtxzpdnypasjs2encnwmkwtwccepez2hb1god26bkq7co1npn4zktt3aykz4pjeew8uafje87p7jyv5e1q26og5qyw19ep150mfpep86aepu6vnp7i13k8sffn4uxtggaag9ew8t5u6x9iyuhrblzmdc4oi14oytaq4e962eo9i3bg8m3u2e34lrd74yqpwy67phz00khg20ihsj27cg7kgqm3pxudx4wopnt3fj7tievodw9sd32wjb2t1d3evz3riqaolcfwljywspr456mihbdi1qex3kv3h7kvucdanhbypaka2hu0wwaxgx14bm07zy6w0nvy3857d0wlxpin2ny3axl5kc8bir52kp8mwlgyncd4um2n4dd82ud0keyyay6xhitcc4zdzrzoh85a0ny3tgurlsls5l5jzhlrglv5wgy8h96pba76ygy97cmbyxmfkxnbnqwr1elvczcqttldze5vk62smlr173rgxe3krz1kttxolh2cz0uq5kl3bdabrjp93j56iaiqec9ywmi1lr8v4aemu1bwk8b464oi0akqh042qoaare9z9fjb24tqc3ihbxc4qbtgr8rslk2s5drcbnmrmjsx4sju0zhfq8dahu68810yo6fqwmfq6zzel4mavc2t78m7284v5dww8ydbl8x0100omcdk3i7yezx47f4x32aorur5fqn7s4r8pdhw3k8nsnox1ldpn6qqvy2sv9ehaik1b9ypot4t9jvao0j38qm9yi77n6x67xcw4vdbo52y9cy5e5f79zx2a95pvb8ruae65fcgxb5hfkwk7m5dk7whqsvsbydl0g1r48wxoqlrc5a7xin91brxt1p429p9oa512k4knykzz19oydgkwqf0jvck1jdlwzqali5ji8qz9gru84t1n81ysn3abhd0ft47si24cf7jr5n73obp9cjz4w6iddoo8qumiwlshnftw2y9y7m9y4js0jcf85h3ljmjmc4h7zk2nmy5318230dqwfmcp2521s7ta611trt602hhdq9ti4ixok13qfrt4rs82jzh97bfl487lpawsffsnzaufwfmzgo3q4co3k12clh6ctu073rxut0aiffx4hj2wuutqqldgxrbs5z8elyc6fmukf8m4dzt8do338bya8cx4godputm5xwfjb0qm9ej7nr2kqor5j7atybhgpqhwn25maxqshwgy43l5f2ckeml62oa6t45o7gjqmcurh5jhvvi8zfqbxtafazo9y3qqlhdwqc81b4h2lev54yioh0su450d8i2fe1luk2g1wue1uvi8gl3n59tuxyqz311op2okh4dhmtabd0xreazhbl3wb1pdn5c6lgpsdwqqjvvpc8wo6ujk01rwxtrmfzrzfekbz1yd6ybd8olq2zxh7ydutgcq9hoj36p2wm7fsbw8udspk8xufgr4hvg4m2vtcrwgvshsmojzmckxzt7fekgtwedkz5de8uelhdyyjl62z9jrckcbgg3rrzqenov9skgz3gskizllmd00b1ene9c5fak2vzv18cdx8dyyxkntzg475h93sdpx9qhk9oop3697pbvvbhnjs6crywls4f202evpohlof1ap29gidigd4tm5g823k87bz3sd7ly2pfchu0peo00amizxu2gz5jj90ro5wjyqp4md1m0ppnz9rmnu67g7thin7y22l3qx74y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'l7dlfmj55i09thvy1q85ev6pfc8k941h21hr55irledoadlgqe',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: '8xzhoacylgog7ba4hqua',
                channelHash: '7uwltts9fb4rtw7dsvekvd243i3653jrn7714ne36',
                channelParty: 'dpr25v1a40hkg639wjobx1ab9pb5881irn84mygrtxluvtilgrlkauvvyzeqw5u1f7sv57pjv3rwuntjaguruo09rdi71zmruzg8mp67em5c2z8ssgcdmr8ezxujcl4t30xrorbdji34gttcfyqpjeoq46hs4l95',
                channelComponent: 'fatcvr44pheymms697oe9pbgnrnn3g7zpgyjg002p8qojlwt61e0vkw84aifgij9ey43wiv82ygxk9jsiiz4bvc7wprimeho3yrbnmol1dutgjqjgdbxf6vz6r3cqc2s31ep37c2pxwliwer5vv3bnx9exfhj6q6',
                channelName: 'jddhs6tjxgpg5naeeobjveynfm4fabfntlo9o4ndbh61kg4eagmmskg06y9dj8c4pn2mov0qlotl2j6tvja9wbj1g7xx2qwoqk6noa6k582fr9l5dr25ca2xmyowr2dpbi445b35vcn6eoashh07grml83nbbqrx',
                flowHash: '1wt0grs61k5jdlhw5jfpiqklcy804jbes0qc4uk3',
                flowParty: '5q648g6iy38lppor7q9zf4s8mzt84hihu9j5e31d1lpqdg7ugyt73kml4jvrc2jlq8xyhhtaqa7k3qvagci8b933xy2lcw6jsypjw4mib8k3d85te68u3elakhmpgfdocvxl1msqncho6z1zqe3rmfxqsgal4cog',
                flowReceiverParty: 'k2z33w2jodjqrws7oez0btk4byr1w69l2zk23t3j374qwpw2a3iw97jui2zmjjq50o480u35duilxjj2hczf42l30arbppbd3sp9m7vhl2y476g282ddw748a5kbb7zhofu2q3kvag34m7o1irfnyxgu0rdjls20',
                flowComponent: 'gpbvb7hopo4yh6fwq36hcf1bnrgv9m0sb02fqwltfv7f1mpaucdqj1v3iikwtmcuvfrm876g46uh67hpv7u0b07a4g4f8o6h8em4xhgwu9juiji762z8ls6twz1xqr0xv8kik05sukb4urg9jfnsa7pwimdelmlh',
                flowReceiverComponent: 'ldi8ff90vc8wrfkxm5zqb5eg33anceb9zlf7mctlclposb8k74bymcmmy3ydmwbf502o0m0ryil3hoczby4psyt32h60nebwzyp4lil3h07g3ss9on79begwlrr8y7q1zu46grkuj7c0zwohjqf0qkknmftlnw3l',
                flowInterfaceName: '1vdlhvsafs2cxqaksylh3cumagycka2tcogh3m8iiremb1ak9u78fcjohu0wd05aibzjwkmuzb73e8xqr6azu1r4pt3y69lv0f0xgp46376npov0hjq85lide6i0qek3b35vtvvfq1wwdtk9blgunupy798y6i7o',
                flowInterfaceNamespace: '026wutdl1br42hznj44xyevee6m6r2ymd8mgklj2ymmt9n7r20ftuuogf7tu2kf7uvk8vvlau76vy229ylznwvyygy8biiq8bjkw00f8bau3jvvub7g2g6o9enf58itvd77ljkdb7nv1p1pmby0nii6hoa2s75ur',
                version: '8j6ahas9w44pomrrffy8',
                parameterGroup: 'tpk20l4xevahpjojlns02ii588g78dm3uv4k7clz44nnz8z4ugvyvx2lot501oj7hefbsnxxypjlsh2bbiu0syee9dgf8tz3f4ktwrxufuxl1boz6tjhb0pyeq8mao8b134qqqbawwx2yfubsr6w5vrvgqq34vsriqrun7u3s7imjnsqz7n0k8qabyf99e4k2un2s9ksndnxaq79tva4rsyrqlepe5bq6sqkm336zvyycgiuuvel8qntgz9tcc3',
                name: 'wfu55oftun4ufl2801jkhvx4lviy9t5ylyi4ll7akwgmo2remx77yq6505c4ez6yk6dbgi4ta1wtz80ezdcdqrbex4u93s4rylr1q9hc0u676snoflkap68le5qp1qzbmmudzaou9pej3co8gsvyd0875kohmrpfg96nrrawz9rvtvbhjk1s5hsky2yizu2139t9409g7dc9lv5i9yoqyjand6hfu5u8iypdoe5e6njhwe3n9uxpyxr31umwcfmxirgd241w7213dmtk0zjq9u8i3ypnemdr14q2gs9coxmcupsrx550dtp6nutknebe',
                parameterName: 'mdap2x1i4mef3iazisl48dbko3u9ebgap5ja4o1l9a0tr8ihbm0d323pq6u0q6l33pj9228f3zswqqoxebmdxh68qssyn1mnj4qbvltgssbyrn1h85c4o7tj1zgp4v7hmww0ah24dtgn3f3prowof580xun6y7u40lsciupz1wr6bmx2wou1vdrt94mj1glqe0zcsr3itf93a753wp2f22g7myww6ztcsxqa829m72oqvc9b8jxqsvxrp2u79nzualx88htnx7h6ky8eoai5amhiyac5j57cmyr15irar9immyfg0dwwtuw8tj5h03x0',
                parameterValue: '7llccgwo0j4pruj0masdmte7u10a7kyk2tqlank56jg5v50an456eb37i3ywleww66yw2r83l017y5oip1ijporyrrrfw6u7xw8h4dzi2y6n0zxot6ru1e7usepajk0rd0pztbirm0xutsyf1usptbgfune3dz1sh2ea2n571czf5n6gwxj4qqqzbfmq03nt83xx1ba23iuopcevbegf0ft3z37baauhxj95czsdyny3md6r9b5vssiy01ff9csojtg99q9j24ho8fivcq1z84zq27a3dudt3nfccivwt80r17zjsh9qozggpfpezvyv9b77meymp6o7n40rd782h3zxrhrc1eafpbuhefi76x66ev40m3mgkxvtw195ade0sclasszaosn4ge6d5l6ukvnwpw7ngc9prgal0m4bdfmg2obghmeonolt8u42s9gklxqymgh7jg0warbyrxxssqjug22shwxi08xzw2ulc8sootb0e5eck5t25qerysqszyidi1ttiwa46v7vhoijxtzb78kiwfs49ff6kt91yz4x48hrjt83l2voiyfq6shxyur73learge9ba2i0h7cpw56y5lk34cv6bv410k62mjkpeizwounzc675h3fvfy1f9jfjqkopg2ntck6ji11xd55d7hud18lc2mc910s8suz5mydoy59pc706zvtekp28fevhvehrjen8ovu03z4opq2lx4ekma9ktw5lzjd2s0u77qhrd6q7ubr3vsngarb48opk8rykszuswg3lqlcljgtj4h14absnkx78beisqsbyp8gok9y9oc90cc5w8bb83qo6ijyju0zlyoye3p7rcpufpc4ishqo9uykj50b5j5sc8wjc0a89mfxwxxgre9l6dvp6hwnk3caggclzps6qux9xk619he5y88b0x1swxwfzpqxjj2on46xwrt11qmx9y81rtuax6bkcoyd6f6cbxhi67z9e42awz55yna28juxudo0v5w92wxajjb3n4c76hhqbp6gliy8cafeclvrwoeh41y3dmvoou8nqv31rgwbk8ms75eqcz30extwdos8y2vg8zzua63hizgnoaxydcugq81slk68lxxyi9byxrg8quhywdjwm661f8k76hppumvvdnhw9ulkbqqqikv4ixbow81sufegy9bp7r81g2z1obw9mph0fjzpdr62e352j4mmmlb1c0v6gsoqrvvbignzwk8prdii6qguzsh8j82gdyk5b6lgi9myjo7l9fqnkaaoiaj95lyh3kxd4f70gmsmdhfpg0n5pvsdw63joxtdpt5tsi4e0wa53jfz2ax139d78ymcnhdhugs7y1sjhy8zjnbo9bgem0x8woe7kn4loh877mbjly6r5bn4h4to6wz489nbydei3m8pliiarha2qd4c0jwda03o6nmp40jqa6s1h3wol7ekewwmft4c80aai3ph8rnav6ubtx2ys6zbpoiq14mfd20ha429i059c25nn7qpzl5afhqivxqcy25qpeoahgy94p3q8a2u783ajr1j0zefe3u7t1s7rnj23w8aijbh1oe9uwquv8d0nfqy7x1vdl66fbo4p717b93z8lisds37gahzeaacl3sxk26yyroi0t6i0shnrtiz6wtd58rx8msxzlpp5nq8vovzbhdmbrff3djfobg2lq97bpuk4tovwozht9kb8xvvmloazshz40i20ujxlh1z8fnzm11s6yo6o0k6bqphuz632htorn8kw5qnw3k4hh83speu38dnuxxwoxhkr5jl08jwi8hibh4lu6c8jybfgnfd6j1afmhiqk1s5r2riiu8rd3mgtmkt40rf6r58ffifhukrvjs0ho9wlnh09k40zu4zjwo7ohdyv5l2ws5jd0ezrhl9i2bo54xmsu9lak3zlk9eiwctujky95h37fs9iaskk2omld7kvbywfvt2q5igapn0i353uo5oytpr0ka3xrpr7fork0etaud7lwg0ar6pasfjm9m0ri7uq9x8i9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'tbbqva4rf50w2vm4kethjrfe1zvf8eip2e4bg6sik0phfwn0pr',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 't5qeyhzl6n1q73sfyviq',
                channelHash: 'w50z7ccvog3vfadm711dw07geow1fcnn4q73gc1p',
                channelParty: 'uss98fl2yca0nbgit7y5y4gp1jbby1o6u3ix23dswupasdxpao1obhzbxxz7cds75s507ot7gk7733bfbkcrrh87gre4rmid7ew0xos90883sxk6ekh7fo9ittwnk48zyn1c51idw0va3n4r7020meqkgrp1d8h0',
                channelComponent: 'a17ei3sqzpacea040yjatfjznvs7o9toargygfntw6oag0fspftwqh173z4cm8aviibld477poeuyrvlidwqm42m1i0n8opya762s5jh5927xxlk2x8k01nc3d2hkny0gxtxczm57pbvbfrge6fy365g7n9oe5ru',
                channelName: 'hkaxx2jqvqo2795y70sv1p2lhjqmlutvymbgpmk460b1ct9luec4z732k2emhi7z42twd91ei2onaf1t89872hth6fhv372jhx0a5gjh68kyh1btt2cwii0jerkp1pv3t6x9yzzouy4hg80im3gb1z0lpyg5x413',
                flowHash: 'm3hkft7kktakddfblh68yydvstanbqx0awicx3mob',
                flowParty: '0s2u3qkj8y9408g448bi5tb7a6xa32svtgo2jyced54w27ev837j29blwx6mhhmif9uey6rq9adap0yfoks7kq5qqvsv2crz5qnultouhfx2y8ncuz0ezh5a6re717bphzgmxdxqkv7tdwqlht4a35vfqfwld7eu',
                flowReceiverParty: 'za4wvh66viky1ay38nlctu4e0akttmlb2yj9wlksb0takolf8cmwqoo2zjpsgy3o2rnzzgt90ey08433pujh0dkttr0h6eem49l3ubpyqqsgl1gg40wlhk6u6yo93n1h0a7lc3pm0anhb4akb5h26jk59joj2482',
                flowComponent: 'arhfl3498lmfs1kerb175n56yac0b3wama5pk69f7kau3ib7iyj0blpoedw9yokwwqbaju29b9b3h8n0oby995pipaux2ewuoq7jcw5mnxy9p941j0s0ubuue9pugt8l9bhhfd5908p6cryx8lc1g0yucie103yv',
                flowReceiverComponent: 'fa35q9koxyoqc141uh2bq2xzu79iqtl5fkgysnjeu71gyzqznq41feilv1bsfj0urs64fa955nkz7pkce3z0s2cg85ddptkwimmp0jx5lnjbwvvk0o6ilzx3jdf3zxj38vnp0c9qqspib2a2ok2yo0gdszlkvsa7',
                flowInterfaceName: '84dlj3bz03mu3nd511kf58zszcvz3icuwj8dk7bji8uu8rirx8l71g8w9nlmkihqankrtaltzsirh619mm0evikib84a88zzhhm6weuc5hch8nrkrw39frxayc3eolg9zoajacpsz004s9jalgf7p6fp7xw1rbjh',
                flowInterfaceNamespace: 'beq790lwurc3tijtmqho59axjlwp0vbqgd3ak44ifthvlriguxihlpm1510aqcsf0p65f3qgzec6zswig5rl7gn9ugff83svh4pspiv94ifgir0kycnkehhd4mo4u7qcdlyh155apps6u5ikmkarvthz47iqmu55',
                version: 't9okgh6md9izhxdokusx',
                parameterGroup: '5qmifd8fp9hvdtlw3rjm5rebumru21yu7xlzya34jnxzneyj6bffisxbk35w3kdcagvbphzsk2bg3s54gd2j44bmwss1gb108f05fku46t12dka20geiqcn2ju8bl4eq17gj7h4amy8sqvz8luweup7pwgxbey2dckmop2dpjmk0v0t20ntgox1ipbk68802e40i66t8bix1lnh30n0lv21y6s55k5xllgylz0vx9nbh0ib89x332vg08ptx2hn',
                name: 'dfuust7rgb8y8snx5xv70zp2rtsse8f5kohlmxllva388nv6bulu3r0lc5p0qraitz143hy3xpv4r2zssmeobb3f0u1r7q2p8rxymbllg1hw4ex5rtc3vs8u84c61l8xredu6c2rtlfilkl8nkupehx5d31jtygcof717xqepwgpibh2n3aj98b8ircptag2rq50cf7szezrude67yyr7xl3pipsbmixv2abt9ehyaxu1yaf8th5q27c5i7yprogzh8y4yss50k7ajwq0n3zzuloxdisuf1jc3ggf4sp58vbet602ougbum1ore4q7gj',
                parameterName: 'liskzupfhkgd753tulhlnyv8iqww6vdbbu22u7f6s9j94u4q971wbe2z20gmrfo0qig1s4muq7l3qoujmtgot24sap6jafu5lhlmf7vlgniyjgqdqpbxfyy26g49878k2astzhzv8jq0f8os5jkwhv9fi6z32ei0bho8md6qxtx1726ckv5rwavmjh5zv796h3n5vht0rmnvfp76afxqjjsvrxpo7b8zwy78jmmrmm5q5b37o9hmvhl3zhkrtbddeo9uhg63937eb60367r0mc1x2fyp0ic2v1w2ouurgw9m82lxojyozmpn64k17udj',
                parameterValue: '60bsku0t7ruyyfj7kui8fqioz7as11wyvpp3ehc1tzg3whd9wgkqwhkgq2yuubixhlxmkx82lre5pc0mxdemiutd4u08hbusfbkg48h4zpul3ws5igfs81ty8sa835ltrc4e4y5374a8fcig6t5xt3s299c9v68ic5dh4cux5yoxhcmccla2weaflla2lbh9cxwcfar18u2l2gbkqhhpmmkvam2ya1xftpyhfc6m6fnj7uq6pdwhf30mheqhw08tgmx104pu27yv0r7i6dpdvwsdiuutqh1isvtt21awcbjho92xvxi87qlqut35hkah7cszqdr87ags48kpoaqspl0mbd9f93oyr8krgpve9bfj81c9li3wqt0mxb6ajyk9yvjvswfn7pg2dgewr7yi2po5fn13x7o4g6fu4lk60ncl7dc7tqqo8sbnggzvrofbwvx2h3irg7izgiwine4u1uswhd665qq7zrzogagluhvsbqs9386g478tdhecijsnspavef4ksxe2p5qfw89616cdgta0kpjw0sgk8z4m1r2rdghh09s6dbnr1e7pbfhbw1re18142158hjknutjrhq63zgpqk0afnrm4jwvxe1jdbmq1ezseyqb2fq5g84902snrwpyfuexggbzlun9va8a2rlvtf8hmoirwlyq5lsnyql9ntnkncj0q003090be46fx8egepzo48wckfr1llqu59cigzx9kg6ravmbo536fbl382sxz2715j0pim8str6gh55l1te4ap1tr6iiye7ir7jrkqziebaphyvvxq2wdg7nshh5to4aq6zc81i16fh3zqxf4qesx3vm19pvwq4piljovxll4xeucv61tok73spr4i5ecerjiykqv79jxq8ryl4vyzl1lavygggzto55bu4x7zczxcfb0996jlqnaj61qq5aqwdbnit7knykawja7c7idsnnmcnnsvjcst40wjyp0r10exvd4yyako85dshftobfnach7dgeuf1rlnyn6kjsfmdbft5bu878jpzssfw38924t6n1ofefp9oy9tp33s2pp4gfz5ka0s5yjerp4855k4mordcihywbifvm59vd28tc5cmls7u2sz5mqk2ly8xqi7ifpvrslu58owd93v30s89ivfbb3ky54ksy0auecbcg8u7zdhdg27ltmn17l47u0ryl93igbnp4yb67z5gmf2mob5de08wujmwzbn0l2wanji4ulnrjs17be0pe7rihl2dj09lvtvxxy9ng5d2twld092bej2tck18kole9xist4j27pd7ywsmxqu74m8ns9c8tid6hfnjc7bziz86ney91uaji200njfzchph7gv802yxs31l4boas8gep3t6f47qpdk0pqj1l70tielslpp1u94w4quc040ed3xk77pd7ncw0mf6vd0mmyzztw3f3rnudfjsg4em3wejjsps8ywx6vzrgckxf2frf1d5d80egdk6agtwjl9dqhwbo1tpkoe02tzule0jswct1art40r5zwnxhvlcdbvnbq5ex1fip299xoyl9rhhnoar91a0bl2k09byt6fhrhg2a3i46a5twn2ok5e4go44fc59crkccv3d2ssi6stv0zmb6za3g6xtcg2w78qzktxjpilbg89golv22573iw1rirpf0npc2haxlj4ieiur9yosg0cmx5uqfyjamhdeix8i7tn0f2b04k9bryt9gyoqcm9fef8v0icrq5fo4t4ce8y5hj3686vh8uaas38yrrdll6nx2ypnfea8cbsnh640q9vnku6s0qgg2j6yrb41oon6tmrnkjhsi0k8evstmoi5mcflygn7y04se9wc07lt45luyn2rnv5p88omtimxbk6q75h9f3488gv4q2ojzdyw7yte4reyrgbusx03gfum4vpxy5q39jfg9yxbj3umrb0vwd33o15issqcf0e0xnsxdgl805dhudmkkmzsg7yrt9u9b8ugb7au68rh9o5pf7pdojpfyiy2zaw9v26lbf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '8bgrlro4soqjwr3gqy32e9x2hkq97wkkkminiohxp8lv2sf7c46',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'lku1rs3u5dxk8fhg0epn',
                channelHash: 'i0od6jjcnfw4etk362pf2eg2gu7n5pzqyntlnf88',
                channelParty: 'xscph7r1r0ee4xyardpjq1gbdnho1shzoxw1tpc5oii823oxavkuo0acjcuowgwju221unhw1qpj6c9utzrl1xtks8ljurjmfb175xqpwigwogvxg2il2ht094x3bt3py1ty4y8wej56u803c2deu8vad35xz06k',
                channelComponent: 'nxbfux6ddftf16xvbcqmght3wbrs0qjxxbfoscj7uy36rnc0f0tb9mz1zl77r4vfyn8clvopc2q3jvq1shjb8o2p2kfon2t1rfu06g7ll3qo0zh5kjeogodpe8pba4uucbm7dr8yojzxyqi4ei0ijxo0imo0sna8',
                channelName: 'zywj8s26mxgplbjgcgpbt4xgsumjue05ixiuzvwhjdulfdsxihknaijpve4yhha2natgzl44hvon5gs0r7jwz99zcouy4ihv08n3o7rklwdac6to1eppjfewjqiwiam6de7hhkw51vfbteuw61hxo69bdcirj0ie',
                flowHash: 'x4xi3zr78lb1q6xmp9voc6rw0b7puijp3ch4nd7b',
                flowParty: '5xoynxpatqzr0qwjugq14r40l8sxi6topq4ujsqo686z5xi2d7nuk9dxg4sdxm6zv7es3xbcrwm3ohpyvyhpt1ogno50omlouvj5aoumtd5bwnbegqxjs8q8x99dcbjs4fmypl2qt6gepyn8fij8eo9kg7fxdaag',
                flowReceiverParty: 'k6v8z9c7rzgzv1p2k6e4tpv8smix14l09g7sk7w8nx1fgd219arls1wo2cltr4hoxez12olt2g1nq0cpchia8wjm8maagwqdawi2qqrs7w08teuni4ue24kpa60mfua1z690gegohtqc3nkp6laqkfzviuoj5zuq',
                flowComponent: 'vpoyrf8cbncjdxz64hxvd5qa3vtvz9apyli7p6sth03c4dnrwm7l41ll8duv6bgeqdmx6i038wl0tt8qt90sxxo288iakflcg0h2wi47gj1nu1yd7l0nmm8mzn7qx41p4pwd5nqtsak43euoxfer7zff9e7xolak',
                flowReceiverComponent: 'kmn0wqnyg8nghcnf0p4j7pd0qnsnhpxc4pingflasii5vubx9fzb33a8dvs65vrtxuho004du7iihlj1jjsqo94fzoyyc794y7s54uc8pn8b8l4pjtll0uyr7v44vzxsj2iynh0bkpelwt2xrh6o1jt0ahm53vyz',
                flowInterfaceName: 'pq4g89jybxxkj7wd5ntofk1cqu2unowsas28jf2i136kr796pc01somw6cd39nw6s6dt8s8awuzdvepu8beg0ws7rlpoxq2ap2jdw0zcuy84wfvzzwpbx9ydpsmckwxf4fyf3hdi7bktmuj8fk7hq6i1b5ej6ls9',
                flowInterfaceNamespace: '8ghjxbl3zktxsltyavwwdy78ck8nqxxkcsqntnv1kqec4f3qtqw7zu14s88dleeodl398ca4t0pwqdydn3a4z4548ebn8pxhbysbcbia9vkvevzrd77avc1l20yq7d3ybv2ua64yhpnb46q5iwoj10td2j23sk1p',
                version: 'g21z6sew2ppvx05bmv2q',
                parameterGroup: '6h40nnnwh3grb42a4fip3as3bw31velbuv23l5an94q5j153s2iwjlysya86kaultw1om8xmu87h6h8jzyn4lq59unmtk86e9rjgcta7a24ockz8eln2w004svkzjuis207z3dx67ou546cibk3omjualhv25iyl8d4f0v82s5o8btewprcn0uy8o6rpjegk4l5fdc4lnt4bnrkxkvp74kd9gff1jdc2wuxq7uc4qidw16yjj7dt06ihluz511q',
                name: 'ttvu071x5f9mk9anumo8lnm7l5dfc2193xgj05cblyy9p4wnqexvn0euvxxvvv36bnx8mshmxjajdocto2zgtgyvg5e8dm524crpgsyz3tccv4nueue39q0qa3fzji7j2dkl3w1t8d18t13w5xnsvhrdl9l4fw5dxw5wsm7fseiel355pkg0vba1j5xmv72zrcg6j4zzor2vn6qnp8t15y1ui5c5w8l09ctyfivzop0p903505d04ja4oil1exge9nomer6e556gpeqk3n9c57nh7vh18075xzl8vvgxw3gnl14m3y9tsqhpqnhr8mht',
                parameterName: '51gl019ivc78bs3d5d837ch92yvjanzq2wve2jokhm0xmdrhq15aem6m6kv6sqbwucuf5fpmru17k3653jcmx855lq8o9gv44ueldo7r3g5yp9djynmzd8xmlc87fl1qhtmob9os7gheyp6fpn34xjngioawhg4vihu2obk23fhpnpefqdh1qshcyjspe05e7obe6rnn400xh1or01o0fizltgfk64mztpfrikhsxqhrm3rxzjy4aucbe66phropsz3ur8pfqiqb32penv7w95vkf6x16sjul23yxiy3ygxsiqm23gkece21z8teq63z',
                parameterValue: 'lxrv11ht422l7c9f4yfodnoayxfc5wnun2vgy0dqo1duppirs7ruvajqhfm05kzf8yqvvfrlq60b0avrlzgof9ne3gipkkdo0qvs9dqiwmn6m866sszf1zn3rn9dyl4dlbdrm9hse32wpuf2zb28oj7lbownt9wz5ubshjw5cu5v7f2cmh431vixexrl6jcvbosccln6qq8v3dfl91ript6ht9p1g7g35e75505afkqrt7a399r0zojvnlo5ugsvzjzikeqeevitozan0wcj0gli04qyp1yo6jmpamatcic17cy7s45dsecnd0pnwxq0y5lrhz5k8y276nbxa1nxtsauqf9hgq6q6tz6ixb3rrk6x7wctg13r3xx0dcmel3hjrqtjffy3w86jpzmq255k83vlxsz3z9vjhc6s930fwv4mye443wj3ccsad27a22xmymbag98fbzu2cg2donek2t4ed9g6q5sil1f09vrrkvrepi03twt9shwqnlivip0vulh083ualucv55953t46jpx2d9riny5rranf36whviw16lrkrlxvwl4givqgu55w8s37dsvel2xtnzdnbtmrnhs8vq6h7qfxv7q8zdmteomfowev8kfgtzz2p4toyimrlquz0wnvzd3ougrx6apz2qnrqx4emof48ib9j6rmx0685i1iplwnfhg65b3hnwphuz7qdjn8oefqgbrx02cu64h40qbstujwqeupawumv06jxv0twflnyw8gn53vy4k89u76bqhi0wt3yijuiahxq09rv2q9y0d1wibbt9lgquup5ubx38ywxp97wwhc3uxnwr7w29q6tazf6wclaje2ymz9tic6c3iib0peb1k3g28ahnqlpuerlh0gcjkc2av5jy80hklq3lp607g62w2vrneeavp3hkcsv7ijxtgljnagxocbh47eccz8vir5f87926ua7qu0pvab2vqfanehv33t55t4jj7ik9ojyo2txom5s3b3b6g7mpdjjbxydw7gv2nktxre8z1jx1cqq80eecnkqn41ndn6vsokbckimrhvach2wr4m97dbu0pzf0b07bejw0jf3e1pl6ronz63m2vigqj5q4jowxos5q3g9tug3dhe4m32c9dhldhl3mo9oe184g53u3610vay2lqid415wvir2pmwpl5yy2hevy3q6ic0mr5w2md18vdpr2szjw9kmft3wjvdcfjt2doi6frclxjrzlqk1qh2ipg2pwfkyjr0fooj7iv6cmragvyh3f58r3jwyie9ab47e5o6zbygzcet2qo7idxfe0cfddmkqux67a9qmov7brbu7lyds6d63aif8ojuzgmycnv8preue1ty25pra0ydrcpnzvb5h8ffs3nwy57js4tsoz63tj67m56av2rb77txxnsur4x6gokpqenvpu600cx1srd2h5hvjecy72ltp7i4h4vnnr1phdzgeum271rn2cyidkd3g6xkpsa2jh9bkurw5nbqs7cwqw99fk24goxipv7d1lke30a3fou4jev6zg0m1hcz20fb70yz8l0tpxj11doh14qgxc1ii4n0ky64jpkeu1fzfd0il22tnhuxnvokell3km4g52ris6o12irotqt7uvr8o9gvvcvhd1ryitmlhnsx8qnr8ap04zzdeceh35h47wek87b0cugmn9z1g5papmxa08p55ov3m5dcbd7j4lr1ryz2iatzomhejd7hip2bfeq9342j2h5pv9n1uu4hxv22mh7slgnlmrbe7rnjec9smukk184xhoinecfxfnvaftox0g2qltdvzl80ec85x77rw4isdrgdtnn9ofp7fa37uuhrvd0z6bycll668mrkoi4swh0y6cx3piqfd4lyck1dzwajmbzzg2msj986z7oihcqae0vjsxg7plt8105iaxol46v7tjvimyd6q2or5ezjwrsraro71v6zg5fevugi6xwoxxedvd71ys5i94bluwi65g4qnxeuklo9ws6rl1cxvim8l4i7osqzjmb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'te4mju80cut0c5xruol8cjgfjv5qyfes91aqej7pf5wkwze7m9',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'sfcyn3dz6sz8hqh30bazo',
                channelHash: 'mume3agkv422334nmxz3pjv3b14qfr8dsu7sixup',
                channelParty: 'g2j80hib3j48ajaz67fwbub1bujev6216iwxew2ymq0s53578g69dxa9u4b85v1rjz2v7l4ieixr44sbq8jn3si9bqyspmczw5fk2j42croxguelkr8wthr70h0ot1lyvz79njp0heomtqq0h1a0akc3s91a0t6g',
                channelComponent: 'e68a8zos81j2ldk5hcbgd6zcb1dv1gsi8ksht287k2qix049nbncftzy7tere4oft0yvuslog5oeqilomahsdxegrco4cii1nzy16k4stwhstm5m1t2rh4vjup3kif1yc0ldwrfifoxg68qffe086wbja1fetjrz',
                channelName: '3c00ob6u1ncnzojc4w1aaflvg9nj3xl9kjitu9k6fnxzip002vu3o6c0xy5h8a3znm0x1rzdiljbf5j06z9e2s0m5d7dsuvueyk7fv62s720udsgcaqwlovrbq2lq03vjs2t1ke88zjn25v1wvnv83p9snyohkbi',
                flowHash: 'u4postadbpi2npflvwyjph90jvw6gkhz9yeb3irw',
                flowParty: 'vjfw4m4ma61bmtlgeyk6vdeosf78z6172mrx4oqt1myosrk3a282ej1rkfihggibeqtg1et4so0oxy6ym1tuof6nigr7p3l7tmytfekm11wxi03l78r1b79tg24he9d7z26phubsxyc3kqqcf2szzznf2cz5rbs6',
                flowReceiverParty: '55xkgn27wl7t6hspjrfjvnacu4uiyz6ufvuux0d084yw6l5xf3ojsw0u9raixyjcm3xiszt1p7kchriduh3gcr1v07rm8w7qz7901o0k2qjaegukxcj3wnwtt3kar506cv6g5aafcrpoqrb3idwegeyxlo2a08fm',
                flowComponent: '4g3k0bg3tanionaak6hj0c1ft1nabo2kx15wjrinfqs342c502pg4rift3oufwzk254m53jxcqmrd3kq71an8momvexnxysu9bshtnvafon1xz5aniwieny2i1x2zu1ey9b62uoe54zrcch8b85legi2mcjqb0tx',
                flowReceiverComponent: '5e6vdtz0qryx1nt3q3m86ocw695awwrx9e614amm98oviv6ayu8uyawgz9hg3h8zn2ku4rd1h1w690tf3qzj697jz943i1mfhgheibcdm7kptiswqickefc72f0a30r0xb6vvd79yrp4ktxxe9tuzi0qxpe1bd2n',
                flowInterfaceName: 'ok5fc632v7x65oiemvxs1f4594jskw2weguy31ffo18fp9u18x3bied1azd3s3ck58k47hy6s10sbn2jfef5hfffry2mcneeocej1785clt4jxp40twiedud13j1szya1cke5t77laixe8p5ecso50to2x8rjzl5',
                flowInterfaceNamespace: 'akhre2elnhpt579042boq7g59g83he22jtcajkdw2puqzstl2ash5gqrnvk0w2bxdww4q45mn2ry8a008r5yxzr20rhfs6yacgx9u8kysbk06labpqboks8jl5siiovz8bwtttdunq533r1y5tlgmncvsz0ulztd',
                version: 'p1wxj37dek9tpaxpdw2c',
                parameterGroup: '4pf8ujzvs41u59rdzb5r727ulrchuxysadbxieiec8svksmwv6d265m5g0vhlbo3yziapdqb6ybhnwjha7kupqaiuef3jq7ar727olq2nzdkfdry8eoo4gme1ir02sm3cp8cq8a5nefm837cgxp5w0zfstezjw7vo8i6apa0r44sroi2d80su2aqvq5qkt9xxo4wisr01j1dmmezxnfdh03cwjbgpt4w9gpaf9x7wkvf5jlkdlq1ezykubbs2e0',
                name: '5f6r77lqdtq0x0atqhbwltm8mugtnejlfadkfax5o0ssb8k3ldbdzgidkmx3g43aqgyyzcwk1kxhjvqyn7z3yc3jm2ul1k2xw6s8z0usmazqkomzzco4d02qwleylx7pi2qmxn4xywcnrq4a8gswdhrlnicrmz2kd1phtjm64rsepnjqo81lyq60fjp5fkr3v1hhy0ddu5oukoxa9eilolzd5i1pwe1xbzlgh0vbrac1hpumt0g8xmkio6asjxlcbq0an1l44whbjpoqn5xkv813nicjpxmcv6o86i5bmar17ofvk35tldfb9bau4892',
                parameterName: 'a6ujlns05et6lmd3ss1870f0nab39e4pf2fhb6o53b7pclrkg5jwa5r10tpnoin658es020u0nuysigry1xg58xt88ykmvjnmdpbwnu8ok1mepxgt9l2wp7xqj8wslhvmz3bxkbacnwjgusedhe2ivs8377m95gascaayyzswib0496dso6ba10cbd9qycv84s4akwueabghav8xwnmt7l3r0uqzo1oc87yve3fmgcwponkk59b22l2ml417b252721d2h6xbjckw7u5jxqw7zpn5fcgjqz85m481pv0vlzgs4zoflxfrdstsnqnsb59',
                parameterValue: 'dceruxsgll94ld14qlksm58zdwld4uhrv9gbwi4hf9xdobcop47x6zxvviukmjz9rk963orc8fvjp90kpcooiyj4x7hrc47sppbs65c46xcgu00x1sj3odwgmqdyzfpvi5efgt9fo7mlxd1rl01oxv87mpe8c1jbmcnb2i5t9y417sd95a7zh26925m9tcvzroqo2ir3jf3bbtthzbmtmiin2yq6fqk0uq6klsj3tte9mqx4309x1erlrhs2202ajoupg4goeaozceiawdn07b9ovx1hwmsp2o2ybl74t8fncfd5qcx8tci0galnx16exrdtb3zalfb7mayxjsx67y02m7nltggc76xawry2zka6v57gogj7tu0pd2b8ut5sgnjji6y34tcrrl3o4opdje788hyfgym32hryrqkyx53ga7wb6e80rzr7oawg4zc6nxd62ioxznw846naxo0lzrqir8p08228xdgyyroo96q7ilkfoojjqw3utvxv838d3iy9xe3v2i3th3qwu4i5nh3yxqurp4gui1qufh9va93ie6lknv2mzm1mlwb4iad7joxa9qqnb2r5cubl5b7s65jmx2e21e81745tm49eh6bfy6hzlkma6dzlterubi0uopn0golaoar987f68tkrbexzo2hn2zhkwnfrfi2qraycdk7rns7d7bt6gpob9brp9bhp2gdpmadzh2ly3l8mxcdzjyd3zjuhquyh279196ti84dwz50il6esfb1pmx6apyehmtj3i2dex3n4mplyerqdvj13aco5zwcmqwd92yzywoxbz5r89jlixekn0w783yg2dkdhqxzhvq0070o1p8ywtxfijifzzhwx54tcb3hsvqwk3mg8sib1k6r7pi3zy1m1dh119gst7cga5f2iplye78uub0hriptu56y5on6x0w2tde7h4wol5vdtnpgeirtxg3f0pjhvfp5u7cm0tu36t0vf7bg5havmpyts0kxycllolxvy5pq0dlzixxcm46b2nkv3i4yksh98tw0evwtp9plby1kn2gx955xco98ux4p43rft9tdtv5purrr8wke2yxtqfl65atlo8igrx0k4jdy6cex6aor9mar4zd3vot9512ka5qjxubq70fmfuk0rjoc0qnnkfm58yfo0v0kgs2ns2tzsp2nhinuutz0vt1vw8br0n77txijifv2s5nh28skb4yaqunkrl6dgtlmx3czm7lmxwkpyxj0z9a9g169a1hc3x423uch6fgyhn5lq7j54p4lzhnfnwiripw4jl76ex4egb8j5mm0l0tea1huaaikbwi0iqan8u9ewh7zyuf8yerc790isn491fxgmizg2n7issqp8w96at6qj99lk2lisu88njztkequ8gwedhohqydq5yxnj25r46kbq5x5oew54f5eewu5zch2kl80ijv14l8349mp310qc7pjiaqayic3lwfod0ytub2g6vhb6y8vs3e86jcq5h0anmxq9tvljoia5ixpmlyrvi3zdf16pyhfl4o43l126jbbcv7672tto9qqdwufh2dhs06ppjwfwh5itm3gjnn30cims0zn9mrr5l82ru1zfdtg4rxrcmhf5ts64zlysd5hyi4dw207l68ylc56pabmf1lhsvsjbczvyov2g25gr54iih1vx5gybz43huripj52qprwqikzubhr9jl7tqii0q3ak6rtaju9vfxv9srx3yuym26lrrsl54ece114j6sroagr0qnz6onhsmfr0itduft53ddyx8f2dwp02uzsknejfbo5bp2tqm9h3vhucmce976ayruu81188725ohhvjxx7jou6thj9291agigccwod8f6b2g9yeeahsv49ymhmek10kex0gwawswm58b9l481ajqncyxvlidlutg7zvxe8twprsudsvgtlfqtwqwb9q7y422f1otuzrvvp5vs98bjodm942e33ng593wmii91qk0ds10lgoo8zrhu8048bs9ol3xt5ot2cq1pfr1gc2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'gu270to5cnpbmxzqblgjsqlwok49ctl2eo5meof3nmefer1jkv',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'qq86spfidwvqf0ot6ra9',
                channelHash: 'hdwj4sde4ai2xl1p2oyfg2ns03q2jxledlw42b4q',
                channelParty: 'ljqghyxxrn59lbza5y2ihejzvuohwdghppoavgcr8eq37d6ci5zk4djbaabg9lcq5fhnk5p3zuitwnteoqj5e54c8fb7hagof9nl1snvfuvp1w006hw2utu1owoo2l2dwszt38dwl2xlg16o9szchi5xijv9kukck',
                channelComponent: 'f253a0l66qmwu3xro1k1jcjev8f12e7xb76bvpl2zf87fy5zxb8az4pomtp9ut6je44d8ez0vh5xc74a67t4k7guga2hd0ue3vx7h2skz9qx54nxp04gfsylat49xnx2stikj6hls9s3ffohvah3zhan1o4352jg',
                channelName: 'g4rkqv73pby0aygwvazkja468p3ta1zmkgq7usd9dnn8q08fgsvukiyirl6bi5wpv2dj4dscj9fqi81f8lcpfgj85gyzqxvdjvkv9qus2hz54p2hugd89maqih6g8dtt1o3k3zaazhjedgdqmttos3hfooqppfqd',
                flowHash: 'uqy1e34axzblrqi5nt76m5t1jz52pmj9we1al3q6',
                flowParty: 'lr1mz0m6v2jrtegeg5wmzastwyk403rq1e3cyuuc9ym2dv6pos8xg78r16h6ijlrwoh7fu3a0b9sz0stemt0izc6fshj74hioyphgree9m7mx4rniabygfvu6jzsontlfd373dnjl574z7wobw3ttq8rhrhm8vma',
                flowReceiverParty: 'tr4heyxvjxh75pcab3bkhqca3hdt0iozl672qjofmni7k7vcldsv5j483u4dys6n0ats4dal6aao5bfq0nsznep8zgn157rej8lbrw17zfvu0xe3fu2dox89nv3dxn75pqs3yuxy60qqclup7ecnb41418og4g2l',
                flowComponent: 't2jyzn8atu64qnalk1rcsmnae0abpcrzvi43gfekid7ylj2iygi3zsn70dsz4vcrgu9z3najrlk0vcm25gb7wky8kn4uusgfrggi4gys0aeu2kqcl9yuc93e0h2idgn23yb6sxl8y7xsf4etxdzzks96rdss2v2f',
                flowReceiverComponent: 'bxnmctcmx7jrpi41fy66x09szqmh90gragpmu0pnqa2j7wvp8t1vwx1egyyib0s1yh42tfrltbn0cf3ee5d09jafd5cjiuydmjzaepi7ep5w8gwyb3m6o7vrbll0jccfa84trl9736byqsuueund0mj542ebne39',
                flowInterfaceName: 'jr193hrhs60oe37gqalxau7yzeaplp8ua022jnamxiitvdso20ovor3jimcbm7dlac0bbpo7ym2u7u2mrc3zc79wkkx92equ8ecq2h9ye6tbew5616r5g85sp09fvdfmzq608878d1t2niuek7ao4aex4ysr5mc9',
                flowInterfaceNamespace: '3o382zrjvz10vj0oxv52w5hugm4gnwn7ajcrki2x46k9ey17ktg1d5h18croxyqqwec4tib7is41ulpeas5lsrj4917vu6z1wc1m3ago1db92omszpagm2ged8ss2dvjqcqlj184xzhy162ybqylrer12814vdna',
                version: 'ezowika54i93hkoja26r',
                parameterGroup: 'u2c2qldtwrxd5nkzfee2pnraxbkwckk1zojberol78oikmbrgtm3n0gl6oqor4uzxo5ccxdlj0o29b5bu48cfvailh3npr7hcoivqahtegn85rt0ism0nneu55n1z7tpt6ewu1yeuv8qyd2uffkblot8dko013i9hgndwzifq11nsney3pj3ff8badevm9hmnv0be771y36p41hwdfde8yl2m6r9ne19buina2um5d6068gdynotvk20cygob97',
                name: '7jm195ftsr113ci908kdjwfblpukzqhgxi4uzo5f8m3718unjqp52d6wm3o305s5j1skce6o03pxzatl44r1smzc95twmepq92yx9wlwowpeui7vzpr8cznzdiwmcnf3rwfwptqg3auxbmj8ovmeee7kz4c4xnitmgp68k2y4nkkv0i6mc2dznagk2ckz55yrjon631cvcmpvmayo1p2snf795eu9rki7fwudsuxk4dnl5zjqa6tmj3bi46vnjd5j9x5hmjopcud8504zhl79f1hlb2kbsemv8d1veizj9c0pz7vz3rcmmid2xbq8xeh',
                parameterName: 'mn21uboubqfprnsmyx5fhr6kkui4dnbrh16c8y8rzmsbirwdlit4bhqtvt6074lqlfi9hk9zi0cf4tmo64jzyyqcvd3uobwfh0d8meo3ntlmaq1jlmyluvyt1bzrh0msov8zsks4ya77gwsocriso4uwtypx6l6k38tisz43tjtzxonng72dbuk5npqye6ktyovr3bmwh7udr4t9ros20cduocp6n2rscyh0nj4nvshno2ymt9o4p3lr1zy3q8l5zarjhwmkqcndhbrvig8rql2y7cc1jte8zf67s87qo3z6a4kyheev8xlo9hnz50yf',
                parameterValue: 'rconu4oiflz9ftq0bw6jmllb5q613ys583ehnzongv9twd256qbsdh5edaxhsn4nkuzwzudxbx2wa1zs7cu0uvofz2vz32mqlrdq032l5833xf8nfbmvm0clomitntrydnc25vh4hghcfxek3yrk33pnw8p9dttgssurantipcbrsxg8lnq2eyle4zrajdwolx94dtljuzmk0254cm3rratntn7349equ4447h78eedg8e0zsl51h9c38lbfku2jbnzxq7t0c1svo622mklzio9y3hp5rr4vzrayf6yjzs6jpcz5umrhmqxo529gcvs7kgp0pdnbhpy6v4f8wul4lfy66pyai4q7zuk96vc0zart2fxamep1bqazwbngvzy97eh19fztebkbawrouncm1z4x0xz5pv6ycyphc9i8mihwa4nei2ikdsvbh8ufpl9zgrevk3hnskjd096omow19kxdje6p8qgxnnuzpdntnqaraaxruy3zeqdnj1p0ck1bzs7jrv35yx0t6q5u7wo7koghtqys4u1skgzn7la85by1jp1dcaxma3j0gd8dkc2kn2pj35mc2ws70za76gz6t2blj1vldcwvpcje3eav2cj43rvkojhrfuz774cvjr12h34wczfk9qixiknip9n49ooaztzb99ava2d9j8kjj5lj4rltui8cxqwzq3z3y8hh4j3vz625sphy44fst4fzl79q37e3x0dptnm2054plwq661d26zkv547jpni03uu22y73ar256wnhjdmfbvt99nxec6gzybgyp8bslkj8sil8w2ixgkt5cqcc14j09vditr3kk2jt33w40t5vtto80i0al559o1b8a3y5pgfm5r4f7b9pxmck56aqf034he7eyovpng3fyoryvacuafg2vldmreqnl9rqvwt2a82x0n8objdrssnbg85nfqqaeswd15qtmpp1m7thg3kbwfns289o27k387w9f18wt0euisvcyrhz6i3w022wi94qkr8wv1cy23b16k37p25dxubtxk92c0rph1igah1r1eze47xnzdzl6k1byil5g7mws81yss3t0dvj4z7iw2lan1bzv34aip4j0d2hacyhmcd3b25sj4awg014b8wyxh0vnavtkbt0em338ovlvpkha63dj2ymcqs092vcj79nj68ghzaj6eijlp1cxxk6dvqxw91sjm8w176hz50w0i62b5cjcx1si56wagxe3rvn3dcre38m6mggh52cplptr8lt1z7wbtm2nok8rqc1ie9drc89ebhbrzet7yeeqf2r0o4dznbk06humfqq840oikjfwybgnubxhhsuvkhlu11pq7d4igmnlvgw8uc7759c6czpgurds6snr7lvwkt6ane24u4mz4k2e3nfm8p0pikfgmc35n8ka0hja831tlxokmij0u1o497f7xp06kf9znk1jj7djn12jv4ohw8m4x161xvhnechm4dejwtl6qevawda1xha5wjpm0gq4fvgr1yw82vb1tpjl8icom88lr4grzc97aj9govqxjsfhokr7ysx6cjjso0u4r173myqyj5zw9libgsgwprd1f5vcoaij7q2o5a0avro6nns6hkyqi25pxzveh68ythzqyktx72tcd50vonrlemr4otg4ih4q6liq257lksqu08wur0kuau5kimc744j42fzr87qaqe4x1jizy2z5szscfriyanam5j0hrg31nkyxc472s7ssutptlj3vuycr9t9z45bazmcrza8uyaz3h2b763rurzgy81n406tsbhpk967e8uks09smh62ch1dk5mqwvjud5sw684noqzfa6yuvvqm5597996nsj91yc49te68sm8qlmd6vepvp1e655gdh0587byhca2q4uh4zjz0fs1n0fltx4zyt3bu88pcd72edslyiy91nw36cziuvs9wndmj1ixiwvxnru3v4tpr8bixvt222gfrkpmjua5xg0h07h95gsn964mj59gxeheeqjgupqczaf62',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'ceslqzfikr3uabhqo8b3jglinsmen7uav8304vdxw0ulqeq9gk',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'htm354py2auv0j2u6f37',
                channelHash: 's0pn1xyvpjpa2c6mv0cyr6uarxxwikqpablgfos3',
                channelParty: 'z2mclge81icvrlg9axpfgmxv7raenpa03elnaokhlzdrut3zg7wbwehlaw4hfkkkyw9z1kr48yfc6pebv8i8tsqzlev4fm75e38du47ajnccn9y42hj6zz8kjm97dfsl67a9mebfpwnq5jr1vfxgpgu8ejbnifhb',
                channelComponent: '54l2g6acz7a4rvdj9pjrnknlsb2e5gh7qdonskgr5pntxmk1tsieen1hk6y647zklvin5xzqfl1qrx55ttin3qs7kamb40cnm43v8snah4h4c70w623fq9j0685ot1y6gdvu518jxgjyvf8qqe27xtgssu43uyhh4',
                channelName: '15hl09fjtqvdxvr46l7b9gk2e6foix2inxq9zi0rrpjzrm3zalyojnnv9xlmgoc4z4jmn9x8mtlv8z1s7vfh78m8t6pu97j589p5obepcrujdk2ib32uwcuw2g627ik6ebpgid96o6hr3nc2b1aejsd5qdu18m2w',
                flowHash: 'jijdxl5pjy6gtfnjyc4e8c5c5gfckotcinsr056k',
                flowParty: 'kug4t6pdily1aj2ketcn2qp5whvydjlpjiy9j127q2x3hz2rwichp1vfz7xbhvcpxp9ql8x2jx9un3b786nej1bdbd7mrc7qz97owl8ibl8slbgz74edmngex3f2qbcsmzyyj6d5o6k7qhpp5n44qsa9w22w9fsa',
                flowReceiverParty: 'phx9z537tf5yx8420wenhz81f3wjv72m7xq6t8upuk2cu4uq7q8w9f3s1jwh3hiz3y380memat04ybpxe2y3mez3gqeumkvt6k5mpubdnccvpmp4aexiwoe9dlk8cgrj6bad7urxj6n4iff0y4xgvidfrh97hxh0',
                flowComponent: '135bvhovp29kpylq24bvullxkrwls23gqpzv103xhklzcvpbi2gxqcl1k2h4zy2gyl3k3vnjxalt1y9xpnwtm3h9frddo8cr64mx4m8uvz2dxz8scymy6yumavrmx4w4vtq4p7w6esdyctv5ozkvb5mrfiremnx6',
                flowReceiverComponent: '1ydmbfg32cg1s033jcwrbfgm6133opaq9dgkfkyejq1cuyjukwzppae5or0lrhoasmij70il4e5yefqb1ary8gobejo9e6sutu2xl416203qig39u2ee96edx7gaglj4xj1c7d6fxvzibjsbba5w5sms5maisjx5',
                flowInterfaceName: 'nmzq8nci17cjem7dp9xfvdpasj97xuw7tjsmlj4nqt13ey4zj2y0jsw609ju0bxhtifb4ln54tplxwqeo5xftjh51cm4u1773wutafnb1ie8n2m5px85z6m6dpb3gkl9r29dy8916herkedxyqr8xx2glbc9f050',
                flowInterfaceNamespace: 'sqm5x13oaac36feb237ok8cxu6q35qfh868w0i33iok9efh5wpkesvgd8bc232qpta8m1j2tz7a4nww9if17u4rimmvq6y7drm7kwxgtz7v1rob6vi8so3m30xfdqgc5jkf1ux56n35ghrz4be6iuls7gy8ke0v7',
                version: 'vlv2nusc88thi60ehsnv',
                parameterGroup: 'c58vw0jfimcvz8375e0etd9bg02zq1nkrujcqfc8q8ji3o4aickssakvajmy0y1f8810s8m0b1fgxnnayo45u5r8iq7ditdgmlh4qc0qbb9lnzv9f5zuth1z8aytb0kci26njbyuj1ltt39g9anrivjybidrzj8bxv388f49yh0q0pmvj7jyyriiyb3pna6t03q8m89nhbvbkjmh9m3xvq3jq9xkxfddp00r3jpcbt19o5rf03nbn95rnq8qzkr',
                name: '80wcdqgubpuloqtqnt1ov5winyol7i35zvsjvyemfkpdql3h40hes4ue3kv9unfi55dazl5ldsvrzqbqmzj7x9l7sj1czjbbmc3qbqaud6f68g9dke56gpq2tkb7gwei4tgdj4m8cuj3wyniaaagemakh86ldzwydztcw62ujko3p2oy9kmu24yrlmb2vzd3s6u8kl3l1yczqgmpjbmhqw3kbhou3lqdx8egyyvne8nj6ac3ch66iywvj5zsmghy1wzdtmcstzxysbwf3630db79oz4qfakfjtfdg58g8o8c0g9q94be54f96s2rmtxp',
                parameterName: 'm6isarhpzkewrhkua7vrb626dbhsubdia97zohl3dvu8b9848lme0j1p2mw4tzk6oe6vj52nhr0lf91xdu9ignj3o2ucluvhke45py755bb3nnwarq3av9fqi5akktrzw3tj11v79s00fsu84sld58ux1oqmnvrx6024kacxx2o6xj1o8mqeuz5jz6ly93gw2tzujafrqdct5bb1yxbw9c9kkvbvnemet71raamzymgqs7k1scuodb41dg5jacwzd8spbbr8p1xoljfrt0trb3qrx2qy8kkjq67hd5kuzqjt3kkkpvce5kjyka4a5060',
                parameterValue: 'y54dkghenr3ly9tg3rqptkpx2w9npont3v821jtmli1eep1auxrwsja5jstt39173cjha3g7t427ko6hk5i2fj6cshihinvx1l1gfjvcj7n10rje48hko7rb3bn3b0y5ihfuf17o5rkjdqv6e6b1cvp58v2wzkbhzudkbjoo5qgrvqgovjqrgy7lpt2dmkbdxxaaz2mqronr25mcczpuh2lwr3unydtbpffqafvwe0utdd7bydnjrcm151lwdtv1rfi6un8owzon9x35vd5tpfjba8f987wrkg78jsy7q6x4zkbsej4nq02tjmsfw9tsjcyek2o8w85ep2a43qmp3v3z2prckun3rucq4o5pkt57jsgk4bat83ftnddpi1hd3jrylcucudjxb9a1wwq6xdvo6eekmpmgo22azoec4ejxqxbtnqa7od791ngyu6fts9iue3sslmxfevytezza8lkew5760decpycjslm88bbq0c7f3ikexy48l5m2rf7p8qipxc3ghg3iel9n8wo2043woidt1aboz5jlif2wxvh9oqbi7hh8wks25b7s8vku0ik86frc8q056kdxibxjlobfw04tubnwkbnlpfgwmnhwueslpnxqzzjmc83wjin545fpu6kbdi2rnj0wm11omfd921xofm19rhqwh4325ehquj39mth535732g8xy5i5dcgdplszmokbijrjbakc5rnm43z7vs337bytjhmsbuy36zii9jpu0teo2b2s0tffkvdfpedxozomre1o9kri35y4pmjx4gol066kvoae687w62zbdnujdj5j61up6mndxaxouogaxvan2azoj3fq3wz1uq7nrqhampxjlosd1kdufpkpjz6vdy4zhaehw5uj9ssj0nw75tvbemcao88dleshe4hy5skee11kyufnycg1j98jv7lwr05y4zcskpkxcqg2qwm6xubn1y16hdnxmv1bo6guxtejmvwcpaokl1divq9w8fingxdk4y3ezq6nljl9gmgrjw2f7vzq5mhq17voucbm23whi2ue3s814y9qd4ua9zur7tmfkw0se2jefc5ye2w2g5vhgrwxu5dm12k205wgmag54yd715up8z8ps4q6dzradp0cwdchgqbnlst9ox79nkm94djqnsb2fm16xuu92iqho3v3k0feupl9no9jeyvhg0jpzlbm79ckgkenqt0wes2deogeomvk13igoy81yqi3bazpsmkmdwvirhc5tds2qz2dd4k1vap86lre5k1ijygtsw9rh8p9ewjc9sidmospob046615uorg18q60mowosr2zzal7ddudxpcyu6syldi710d60b2bkw6apijfobfy5882dtcuiyv3gg90x30zeubeeom3zdoxu2x9mx7oshwavuyzjtz1l34rh41uswabuprff04c8wirg3vgqo4re1upgy2dn6hhkfvd60ais4y8gmbgvgpefzv5msoipwgk5k33pub1c37lm9y4vtk9i2jdjb70b2nfzc9sn6q1wueincezbspynyeh521hwz6y3qyhldh29x33lr1t4m25cp4ljci5qqgkn8v59dg00lku4wwgcobop3czubbuwf1qdpavlxt2xirl1tu281jo931hxneg9jhn7uellscrpxc31tthefiv4v9nr3fiympuiwq67zmtfgeainspbsx0gvzpfdeqdfqaap0tytcsyt6miy94bywetao39pjt7h75ji7d5xl9netnroaostyt4xwql2z6kymbeqjxnlyfa5h7l37813pvi72r4rkfmb3odbwjkzf25gjw6syvdwwlor87exq69j9p3sgsnu04wa50l268m2268054yx3gm52z2xs9bkpsjvot55ij4ptc2mui9myiyhueff269ow3je5oyrgo205lmeuxwmxb09z07k9u6c0an4pb248bp3w6n1l2lekr4age3cmqqggpz34rnenvxnqupnf5hu2eftyz6t6so1h5shkomrhgotr6owlvzlqwkz5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '2q9h4kr1y1a7tx831pij5056re6dc9dqhk0qt7sscovpycvl7i',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'bkscftx0je14fgj98tyu',
                channelHash: 'gfy7jgkxij2sp3c1wwa22o3gb1nfzo0mnentcze3',
                channelParty: 'xhgb6iacff94441mu3n63t9nd4997gxipfavry9v9qgin0pjbpf5av675tmu00fmr3mb3fecunwdt907orke1suy1xgs0jh8u0pqtpip1mjywo31me3hf32ptdw0xy5bdiw3lghlt4921pm6pqg1i75aoh9bu7zp',
                channelComponent: 'bql8zgtdp6ob20h9sb6kffnbqck0zix0n4y23ift1svf4mjdnurz8m54z9x5bfzm38tgfybl7bwriq3bjxfrqwg0yzfy43x2j107lmrcnpuf33hqhlsk4d0ibchpatiawixyn9123swkkmqrqpjj2ref8utcmn3p',
                channelName: 'zxenfe9eeo8lb1plh9d5j9rvfvsiqi1q410sufnhe1txbb7necjwpci2m1m6gs8l5hqq5se6erpydlkzcz5hygni8y6o14e9x2fkaohwy7pge9m5rt1jrvzdmliyitaf47gxy6jlrqhpevdbgdlo81osiqrk0o164',
                flowHash: 'jggv4z9uw861lihw5g1augh77o1othigxgjowwcr',
                flowParty: '1hcph9gz5lb8jb0qoysa6lg9y4edafzygza1r26n13m66tnjok9kzcy6175y9xce3rabxw6iwbfchbi1emh2uwqkhs3ivu9l9l5t10per4x1n5ln58ech7m3j6odwqvzbrzser8d3yebqtdll45m1t69hbu3wtco',
                flowReceiverParty: '6q09n11zr15gbtp6azbyyrrocvm4nxrc5p2m4kz9ntzacdnrt3vnlakwhuvl6mz5ebprt0ffgjtffbfp8e292j1wixmglujot7t74hg2l5o3ixiyf4mo374yh0oa3zdj4kwcwf9ly43nu8p1hkq2m83fpwy1q3sh',
                flowComponent: '65t41phvs1d3ia14mnwqztj59ia51dpnmq6oug22rwtl44fl8vkgvr25f3x75fzzamuwginvhgdh0vqz977kcxzaw5i3wibhul2v75y8npc48ayrpmbryjxs0grrkgtm8oeo8wpvk9mzc0lg47sebbcllclco1qd',
                flowReceiverComponent: 'tnp878pi8f0608977nu0p04bxbow7shjo2duezol43zs2hhug104by18yfeo8lf6lrz4vleoscekropzwlhuqjc3svtwdk2yvfcyl4mpsoodczuezm98jn0mf4cewxp9mc3swmzeq09tyeo3pgjf4el1v1ozyffu',
                flowInterfaceName: 'nx68g5ozclatp78v3lyo22b71t2stoe04bhkk3xjjy3nyrpfvfa4udza60xkm8yha7mrvrzp7vqlzpdcnh1yom1opmmdlvt0s6rbyeq7ve2l6798ow4bxdcn4luxjiczd6sk4uophahisa5zpttw16sdchdqawlx',
                flowInterfaceNamespace: 'nv8ifpmmukhqdbjk535q2c15v4n6ou1ngr34t0a2787e6t6m3vgky9ezqwqldaq68xn6o023py3dycdcgturv7oy9qj87c9nvgo3ewfs1lff82i98kp5ko340jky6q3cxd1i68gfx4fivmsj8rhme4dunjimfnqt',
                version: '03mmolkdic4i8axty2v5',
                parameterGroup: 'nbhd871mw1h46ro8lytbxq3h7dv15plln1deqvl2uwnn95degynm5ujbktwn9tlntvsami5hfubjsycsw2e41hi809siwysd753thht2zqug7vc4ie2d7ja9p1aaf8cqmhj3vifkpbt20wat5mo5yak8uag1cb1rd548osipjglaxc24f3fkcetphnupgy920wspdwvhh9no34ps0fl0xvnu15nz8cgaj3wxazwfdaq70ynh4h5o0dvpq8qhp5r',
                name: 'dixp5fxkjjeorz1g1wop50g7xxtdffjo326d873k7aa5peqclt0795k38yavc4fty3pvw6ge6w7jqv0s7exe8pwzk9luw1huwjgetkgwgy7nn71jj0951zurshyakwujqc93e83wndtmingfrvlq43mvyd7zzvk9gvo0bobgm98j0hs22gi9w400cghjj0gyfh59rjdesgp0f8p919754yf491gr9b1s9rksndl07tmor8xss0oothmckms9v1sy8cbpmw9q3to9u7dm74mr7sxpzf8rpixjs8gpdoelmvrd4uqx1syyeqsy18wjhuit',
                parameterName: '2htlt4q4woniutninzf0eyb88l9xqavs3r47wq0fk179g72ssit8p9niwyu9e2ggddg7yi7ayhitxpzo64r7vj4kq2kq7q6ttazjq0aaqm2gg3ulv2nbwjij2z6qdqtd3onx5qg0atvdmyoqc10jcs85qvpoutyu7yj37pplro2gadzwbiz7ab0ykabe7tquu1p0l40cql4zb133gbm7o8i26ldapxbg9010k2ckf472lmkdvgt78r4m56ob725216cki93gl2qs3djhju1jh74itoxnua2p8d8shb2b1jmmpnia838lwgqjhe1xrqny',
                parameterValue: 'an6qm8t7djwmu8vrdzkfbvg9jrh14uaapusyo18hj32jsntp6yqemljvrc8m78deezfgt2148wxrwwd06rkos7m0fzlx4est8vobalfhsp0nphm4gd8gl93qmmt9texmdpzx3ybcb0xixchzha8t35ve8mwctznhwzr9657624u0syh7dhx7kbju7wn3skfpxtlzt9mz3h07l8534iimbrdtojsppf9bgq0vl9ij6ek4hovbediiazvmkakne4wcvgn4gx7rc3rby5gglzd7hp01kh9ca6329fr5gg77k4d1jk2tuh6zakp08ldmydq70mu9ib2k3wqc6fzayjkdmgcm8zlxz8tgczib30fc8asgqy43uxte8o2we4cn9muccugywyilkaeaijhs5xryn68m1hodo5w0kz26kbdqc3ybq5uok8e19d9sfam143y27f1lavig2nnf1kqq0e7sf82c2kt701eon6z8zrjj5sk94xcz5kduqfsrldctjazxmkcde42iuu0jv6786mole5eqmwtw04wwfflsuojn5c5huv1qkz5egc1wd3ovgr16d4tydv7yuix8vppi1o2xly20qxxi8a4t4va7y6tmzq1w1s2t4k1fwwyz8q6hrwg60rcy5m0uugxon640i8ircv7re8sonaw29o4g9z7d80rs2mx7gsenvh3s3ghaxw11nygi8puknsjcqtks86wasdnf0xsabmof05u4hltfcr206i8p0o1qenqxd50n7dtfn02tqp76xvgz9r3kv7j6ubvbun9qbcpju9c2qaqducqzp8sbya5jvt9hnbl21gh7caxqfyo0006qfqzy7cbvetywghctcmvuc5u9yehru941k49bmpudldhmbkxd3ne9uod2vzpbz2z9ireuu56ml36sh4th18agvmufzct1hp73yq867ss1y6n0v2aj8fyloaftqv4a5qj84lndtxiyh739uouw3x37qk3ap2nf2s5hb5aeuzb416cc7ogyrxtout0fc8s1sduj8zfgsyo6mswc5ik06neb8ff04vemfb75mfgc35lz9o0zb0uqqeedinkjvomhun9pqxqz9hc58j8o2jo8s1dmn6tjs1whp9rqebwsr2sctu3oc4a8qzqi8suyls8y1bju2xibmqxhb1qpbdvnli2jmcergasenohf9ktyrcfax6v9vmoueve0cpm6bc1o2paok085yze7fxp7axb181qnq111spc3lxlcjvce1x9xrf8jw16lcq9r12vo486c2h1lj3sccskaw2tbjxcrx7iifjc0ji52bs1q09f8e6e7umg3mjbu4pwhwqdyh3l5fuvf3v85cefdawpmhu08f1wmh9yzmeyjx46rs5pyonwx4e1cduzsu6vcj9ezjrr8f55389zyosfezjv9ewyf8hetfr9ayu6we5tbcfw8xu89ffobp71yncujhmczv7d71fq3cj9i5556t3nzhwpo93wjcgvpgqeqa9zoiz9oswyxrn16c1e9k0gt27pk0a0bontd868udttws969p7sigas4pewxeh7n6ui5hhuszrzxrcqen7bl932naa0rzk44e9mnei045ny89vdmu2wimim1ccwuvfaljkzbswlmaln635jmf2p24tlfsmv6n09frzd13gev7hdm6bxksdy3tdflqwtl0xnlg8dm7kh6mli4hjcs0l9ib0an1q5yxphv0ioxczyp6onlr39h3e7j94h5e7ww2h1vh8inxc3rzy7bdob4n4c4bd3mlkyir3dxf5oahntt9stxlw2qr9czx2848ok1zmp4wcie5ivb7oxdapbq431qni1a7q1uw3xnkow7e7h8cxcphq6dw7i3348rz8su8gp0vrcnx9cmwin8iefbt979usm031pdm5ee1129xu7cnpmoek25gabn6jvwrev20plmvy9puc62rkst2z0bhhrbqw2urntzj6lg22qal6f3v0fwtzn4uv216qk2pdc11s8q9sba2wkp3ds1u6c46zvg6sfu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'd7f558aixlus9wfool1kfaisqmgnrnnv06ixwy0mg9e1e9i20x',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'w5fetkv4s9pafq9i87mh',
                channelHash: 'n4kob7uuoy9le5diyhv4iperw5h60hwojh3q4gby',
                channelParty: '3zcikorddnv80grc1lrke6y94db8v7v3gze090rpii81q75cy0yxglsylah3yciczf08cijx1i0hhrbpxy1tlskynmbs95qq38bviw160ve4cyusxha2krko4ww2nufmystf2mbe131wftcfp27w8vicz2d8i6ku',
                channelComponent: 'c9ldp1iwyrr7zpdki0ysp587uxjvv2tmwqqh72okh7n2cn4e28gg9wu95crij15afb7eqn8jy40z1uirqfpw113dt9kc9u5e4cmwgnndjg61mh4asxxatrmel3by65cgiy6648ppxqlu3bkre5wrgactcnkhaf77',
                channelName: 'nqxlmef8a2x627277mnsfg4wrqrzrutq4x8jbunof2pn776vmaz4opb48azxrjajkgqqt2ue6i7lnuq3we1p0atkezdcdzxn13y1sdbttfsnsw01liay2yhq9r999hemxgzs34otgksmheozwhw7w8h7wi75l21t',
                flowHash: '4eunxbmxbjmg1penbv92o9eb3u2cfg15gv6nbxgv',
                flowParty: 'd1scft5eyaz4vxn8cakzaqdxtofsou4xr30cfxns5uzyvhj6n3e4x2gcobpeksotu3t8eokn52xjlh2uud5daov576kkd7cxjf7er7jg8krpf12gx9r8aq33e3x4rw1ho2v6t9mwoiajj78ei1zuq7h7iwl8kvwpn',
                flowReceiverParty: 'uqa2xln31vs7cmfflvd8qjgzjbnlw2l8mhf3tvuvy5p9xj2mk6kb07nx51yldp1kfq075kfk9b5z4iuau1cprn03cn0dqx10s5qagpgctq55k4qx5chlazl6wguzfkfsm4szwogpko8d892dshj1207kjnhx4b9w',
                flowComponent: 'x4tau1apuiopo49fktnpuwfhh2w0attedk3khkcvsw6g5skk24nj6mhyd8ezspm3a1g9tdp8dzz8xp8ij9lufh7548pkxsuxmgpma13t0u88ojzkwqlx98pwdff2tkk7hz3fdcd3dzynksv81m2i6ohmxngifcv7',
                flowReceiverComponent: '95sr6ofkrsn1khtd8fwsfu9n0f7xm6hsex7ovad1zg6ilyuc0r8g2tjbu2rcre7y3q1yrhn6r8grhgt6sktjru39q5iasuojbx1ee9ctavkgb8yog95ckvipqq7d2i663yojwo09dxmwy9tkfx6kzisrx475wds8',
                flowInterfaceName: 'l7o4jbnuhk2t74u8y1glziue72lp4zspdqam4uk07n6o4r2zcfld80vb3zizwu27q421d6urfh39avzl2nj9q5xu9c63gis7lbi35xh737skahp99xyf2k2w6k14uag1pefshab9fw4lm81qoxoqh28xyjabehiz',
                flowInterfaceNamespace: 'p6woet4tk2b2s0267xz1bipmtiq0kh90b9ovkqix1hgqgokav5ohpa66bxltvb2z74a3poatw12jzq2j7iikh8zf79xd7a3moctcbpinsslwcq911y81znfsapnkplju3in7eoxn9bz2m00unoo00omxd8qyoi8f',
                version: '5a4y17drlac15ch8qnv6',
                parameterGroup: '1esvhnw51a5foo4gnjdbhvpbg61nws6fittccstlapcx9ddw22oxglmwhljew8ylnsn1rbkqpsa7spk6dueqpru61d0qlo7d44n1hrvuwlzd4fj39h2yrfs3glovsatq768zkxz9gxud00m44tyya5oby19epzcs0e7r76wbxjpkqrr17pypu3gttvt9b5oohbdg0gme0518inu4vziyqzmg92gz9339pul6efseuzq2xcr4rpiyel1d4aa0v2s',
                name: 'ccx0rlfwbot6k1gpdo0u1f1y68p44cfvutiv86ocz7q78pqltwy1alv68g16amn8aux0eixwd4y5bgfylkm5c4g5hqcfbdlpvu2w597mebtguc7d1svpk0rz96pw30iix30gswa0ccrdjmjsc5eeic2s8k3mz188cnpxzbpmv8emjz5zovyw9uxw6tzfbwphy6us80bj650yvm3o9pm8vw8wh7ce6ra1z0og09dpbcd40018cf11zfa8ll5ak8xttb8qh1uky0a066b8opchbu94sk3u0qqolr6h6y3exse5z2ciuyuglmvar2vfofim',
                parameterName: 'anb5jkum7atre7yxzgaf7ihkb7eq4ki70ggf2ohw9btxvovdyy2tlx2v0pm2qs1f9zy1pmw3z5pknicrexuik4f0e122w60g2bvjezehhru1pxfthf3a1nxgd8uba8ptouurrjtsba5l4muplvhvpvvdat25j3lkfb6f5z3wcu4rbop4pap6x4zyo9i4rctga1ynqkpi4k6irlrrptiy196slyp33h0blkrrmxnuheyfgu9fubqxu2ax9702c8vpwzxlhytesojninuuzwphe12numejehnlkdlln90qn8y6hxj4bq1ixopqq3zb3a7x',
                parameterValue: 'jtw3j5ujmbhqel9riz4y6gdbw92qftcfcjf50cmuqlps581nxdx3gsh0dn3lncj9trnnpeh54j30lcp9s3mnxgg17w3rfeh4mpvaw16x9ikgvkx611tv2oj0hh5fuy244kxg9r5bm7h2i08223v4zj76u97sgbxfv4u37i53ufzkktgj885hloikddsrffxp2l3jkw7bnj0teqkhpoe770v3oxrxdespsyjh94tqoqzsqnzazi4pzvdfsgyf43jfjhlaj9agudt30ccei9446yopk540yfh3epj1hptqtjv1ix7f8z648d5usm48hlbmwounghdb8gjqtrbg3a8j067ecfb9e2hs8j7zp1tvldardszdtdeba05rkelurhnsrg99rcahsl2j67l7ceq0qlffp6hzpl4ljshjmdp6g1wxsfmxivr0oqifreiwihh34dvnop739u80ct24y6v1x5ko0q8dy2y78sagi0ka4c3xyhyehs8qqw5m5oa42ai6cs553zncshw128tobazqqobzlsgegigdr5fy1r4oyqdszoqxo001v1k4d5idm223qh7l6zs91mo6cb4z9v81w5msbnxj2s0421qi46w23fdqjunm9kgub85x7fcdhpvtng722kw7gxfxm6irs8670e6fgt0mtp4gij1pm9p5ve9zoam7bxqsy1swky8pamxzzfrde9pkcnuopqt8ifzyoz39svohgcdfgj8l0oala0u8phe3mm86eg1gghan18re7y18m6qe0v0pz1sjtygnvtacqgdooorl1260dph36b1g6kv2zisvxh124whmipc4bkyx2hnev3xakkdwg4h26n8w9r2se1xd3hao653w3dtxznzuirivhun3caf1z7hsv3ppcfgnehajrk8mmufn6ano0m8evdhboxs9fkwkcy132lnaw60r5px7t0n1b8ujq8447k75abmafexsgewr9gxrqxgm6rvx4vobxj8gzmq72ty1zp6dvpdoe7uh5u3u92kup3v5w8ikgf6unga9q5isyj8dfkl40ifdb1pcl1lm9fpxwl6gntcup67lw8qlbrtwstpzynx53wfz0jziuo0pm45qdulksuen937szpqgcqhaubylrl6biwpgul6voevi3l8pdoq5ft7m3ztpiprnyjwn0ttcxr183my8o9tiwzhmfnik1ujermxr5aqbo74bl497monavb6um4bzmvj3c1rojb2z9zcs1ghwb7vvxb6zbtr9epu5kb07wcp4o371rgrhsg4y9vk7kvnh94csuxydrlow8yziix2qhkwtgt6zvobdrvb6yarnqraaicd8xehq6pc1m5f17qi365k4z43c8nf29kir2lsqwuac5nlzn2tngkpdwe9lpts8tos2z1rwm16pmki8en9itu3eji41zeso1rkeidl3ik1qlc278yus3saort19ilxomkki6d83dt2odehdajt1isg6by37igni7tzwx42icrvd4wpxj81qr6uz08a4oqvyww5noovgzxgjg8yrkrezzdxr56ogfifo3z5udwdje724tqkcgtuxaoxrwtleepxss9ik0ph0w3d61b8n180odxo5qgxoerojsm2xlmvay7j5phnzqad3cxu8f5ivo3plqvz91yc5q7co3zy9xcqwi84nfvfs2rwmo912fveivexrkclz4u7hd94hvijtev9jy54e1fvbr4yjjwj2tjrc6nnyqlarnn7fwk4vbg6rj7d0f29nts3efh08gwri4l9qta30u0ivlh3i0u4l2f0ce2oi9x11spm7nq1tdvkemewxobayxceoyj1j79uey9nufxgckce9mt7mdkn2gn240df9q86x94mp2hsy73chx2klyq4rn5ha6ojtv26a0xcth5n5pfhwf807rp6na54sdzdy5z9xfb7aflmm3mmtzhh501xgln5k4ynwnm7yk8vxw0hjmh0czqjz3604h6wvg13jz2u6ojzsejgbt1ye923loec8qdty5krnv0i22616',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'q7wvenocufnbd7zfhkdyl1q60c792awvtkq0rjuqata9ldj1v7',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'nvcy9aprhg8leq01rcv8',
                channelHash: '24j8prtyfo46wqgq2jy608r71byaksn9bgsw3k5t',
                channelParty: 'aqflyp62ddcfevkew0fzra9y992e034yxzxigljkxzog5a3li5b2kwcd52i45859593s4az9hixde4ll4l7snd7wnidvakpewpppe18xk1r6lvwcqnt3sx8wlyk7788y22hkf3v9l7txtboeaifbhyx1b0b9to99',
                channelComponent: 'u2yx7ln4e1gaagyhml0idbjpyb0acgxo7pb23y8gpvptik68mqmcpkwebbt7kfnf2aqu9udygxu9o7a9gtpuls6kswhw5qxfx9qglk2lodau4l1zzap1lmmyjjj2fqebap3x9h4lohgpad5mbd2ahgc9y1ligi7w',
                channelName: '1p2uq41colimyud0mzk7x5qnx9ccovfia0qxyop320fphtu3d0ximuktjcsvwk3v6lch4fpmob9tiagsutb7p5coh028t8ihtfl2ga2c4yjahd0eaonn15vh88pwc0lhqrkdcotonqa9er6hy3vp5x1za07t6pdl',
                flowHash: '7jp37g595qgt192ve0kjszgxqac7lhdyrb7dfegl',
                flowParty: 'iu7u27uz0skcr69gdvwaaniesl0k75v9oauflui16a46qvyawgdiwsvu0vv0allhb6tv4naacixdo9itc8frde47y3jwzyzwdepegg1xqs60wg4y6rxewr4kdewymg574jn37p44i300y3a6oarsp3emu2iyfcrl',
                flowReceiverParty: '8p2rlpxrgzq1ncn2e6xwt3v6qog5zhhti198gpaldqi30rgu9ruo1l7fq1mhccgwc6fbiqguctny399ay5eir8gcyw0x65nxy8cnzi37sl7w0c6vl81mk69n9m3360x3y5i063vpon1cxsyybab4qdg3bftnvph4x',
                flowComponent: 'o2l44p8jxu2bu8dovi4bsn0jnksg7wyaxru8de7fkiu7z2knrd7gfyqyuhg629gq1ouyiuwnhwr9pj4foamfvgc034duw7zjellm4ybh4jximd2c2ejuy6wrxbvooarvyfkytv6x1mv8rotub6l1yz6xblv8vn6i',
                flowReceiverComponent: 'gxwpcyzteqcsu5ssv9naz88whr8obbvwmpq1iu2n0fyakw30fau0fmev6zfi4a3geka39yde86nk55rkoq69crzmj7f9p5zjxe2n37vn4a62jv1yc7yyyyto6uq4ah0frt0onmxa7f5br0d1om8bxxi6z4b4zn3v',
                flowInterfaceName: '3drfzhjyhh212kofst23h78llovzbvjjug5ozkkfsnx3mzlx0mwkkyf625pc26vmpx0774mxqt8q8bhhba0g93zof6c77gy3d0h2aiawtvmoidf4zh5v8f0l3895m9xxpkvap6i2ys2ro56deu09psjcieqlzh6x',
                flowInterfaceNamespace: 'h2gkuk2naky8261mzvi6eq8cbncsxqob5de8p9u5vxs6ol6sliv186ss8mehfumxa2vslqeg41kv817po3qjl90t3vwty701wp5glensjigyn6aiqdmpt01gqirgz6lgt9ncayxup14h5xxiwe76ewqf2k7b6o7g',
                version: 'en4cdllaxwyk17ebsour',
                parameterGroup: 'ef1cg5w55uedu9senjjbo869csvv8gqxrasgoed71pw38e8f9hnoldeziu3vq4qzkeyfsy50gz10i63ifh00fr78bfhso4p2t8e0jmx5hjt5x89xoreivpltance79wu54b6s04gg5cy02g3y988mxefyhu950iwl6liyqn8hcpabb1uflxk6dg44tc1shminqr78xvij6ljfuhubpfiw6kpjg6lbijasul6ttu4cr0pv3s4kn6gerpsbhx6fyv',
                name: 'zm8kosl8xjd69l93grzwesbptklx987ztre7l9z4m4pp1sb81wdbsvd02vz7hriq1g1fp9nz10uihqp8uwxpuaszpfjp6au8u8ezmmwasyl1a394st6zo9pntaarjt7amymyn1k1rf4cz9kthlxxpy1qi8btlwn7gdj8qaiipenuma8pkscf5q9e2h9b1m3ri7di5kq256cr55p8gjoeiuqnwi5yu6nyw96la0yjw8tru9ixaqle3mvvdbszy4fo4d9z4qnyq839o41gxttczg27xs7rm1kxh8e5b1uhykag3gd2hh93gesba75hpo1n',
                parameterName: 'ivynivbamxi60dp07930gdq7kmavoxzmmlrj9sdpr4poqizj5xznt1qkm9gnfl7baxz8oy0ut8o2pubg6lvdgix7uaf65qcogmdlz7kr9y20hiu7vdtcyo3ja16objhk8r7hehzusv4li4byw5c3044756i5t0lr74lrky8ob5ak3dyzecwu7jfpqmw1s5fdx3btysivw58atmdrp6x7r5f6sliet6e23kyx5mweasy6tt57n1mja427ladntboo3poq15mdxyiexx0s18z136fqn1h531p0azadzrcf4vl0s45bt8iqwfmoquqfu081',
                parameterValue: 'm9cm6oydrz7jlfz9r8v9zp1ldf557lbp8e0yxocypg4g21gwjn7lqv5dzog7whkost338a5bvinauwh3j346lxhnfzerv2rckj1c22qpbrlnarg7mpe6ilj9016zfhmlnz1467d53izb72u0mueu2te2ftl5dlp3xwawl0vpprfiarf7xn512dw8ce16db8iycpmeo8hekbo64natbr5iktac7pjmrmx9wi2dhepkxsr8875n2m0gmnxkm0ezkm3cijprsogur3wtuv47onpz68e8iy1p2gjozfcx6fc22co9i8e9lgtdhhs8o4er810199pjf6o2ic8ybjufc70qyshus48unpvpksjpj8wrq7ov0vtxlvs5vh9i0o8l39vuzdnyl62c5rac8rdqeo5tnbi38hkbkvtb5u0vll5zrwti8vl4erv5lky367z95fgdn2ezr1fvjdypvtizlovp05xus1ho3mrhp9wdywzg864r2s4yafzjtc0zcn6huf4hbdo8imjpgv8pbm51m5y8dvq5qyp83dgi97ipbtogdb9xvfw3xjj3fck8t734sc5j3qlbkoa3xx8aqd8okl4b1jb14t6g6kjx2935uvieh5tuu4avl04yaza1vzwcs1bybm1xmqhaculejp4tep125g61kke3b52hoil7nnfzo16agqqaovx92bkkzq9xv0duq5niamgt4mmgvd2lopbmv8niokwppc01nsi9e6sxtauqsdamza9grxx2v3ngkw89wwxk4htektzncjadbfpfab9dsovvi20m8hld9i29ylx4oiwy1cez1xkfltvxv0nlshvismb9zq9nbuonhdvi9edgiwzs2j15837tyeopcnbv8r5vzws5ql1jc2rtltg756j9awkf9qeiv2uf9lel7go8l3lc7wu2h6vo9suvvwcje3scb29sah97kbgad6xmncjovl7f6gmv353fixuc5nyp4l3yh8jape375alxbj1px4z9h4uo7tkn9z4qkvvjncbvqkglk1bx9sd5acm1faes720foq3w45a90y5i0au2fluauk2wg5sncfo21g9730fovp5bq9oi1a9j2qvduwq9bcj840ewoo6lqjrqmcm1ik6djt81wtsizn9yxjkdtx2xe38zq35jls8tofq7yw19uy8nctrb7e1eup9hayaxe5cv9tfkuxmrfdc8bktz7lh7zkk1943l8afdhcu72oaqgfbua1m57xt417cd362izgyxq2h7lmi81nncvf87xikkvdda1z187j0rhv4dees9l3ztaer0y2fw2t0ipl1qbhc0hnrzficlh8id5nar2amuddzqngss3n31dh7sg3oet4rw2lbz0nq8yvfbd3u096ivq4vny0qki1zffa0gdnj7iatw6vl4m9gxrkmq3e1793mubs1q1qstklndcd79sv7xf9fc9350m5lwt5fzqndpwffky44eqcbyd1qsoy4e8txja26ytmfomtkbl1vi9mjylby9tz8y1psbzfl44pxermcejanltn8jrem8gb3ontjdhy24n24gys9z50t0qs6sdku9r660u8bmo68ifazzzk1l8q6co6yyxea3xxovby9tudd2pz7xm9u7vtww54dhok5izitlwzxzo15y07y6nvcjpc3fcws0t5c76htmshjbwlmgy09h2pou66x9c4uiw5b2iljd39clsuo9c6xqz02omxmei57r4v53gsaenfln7i5o2tjoz1auxz5rpmylr18xgj52g0zu53hd3j35duvr1birpsjq8feyr3rk41qjex06jwfy5wffrb2fuuudgaqs1otw33mjtdm8lx6aft35jkwcxjtk61s7qu6a88ta9ocunck3po6peq8j6q3wolkpcea6kvf16lvhxu33mc7xjrnruo2p3t9lo9kdcdxn778vuusewvmh72xafx624if7oyvjmkgxetjqr3jx8ivpdul2v59lacwwyko0cs2pqhjhme0ahci309d594xnvhfoj2ujsr93rag',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '6ddgpoccl6r4t2hnu6a362fkj5hq1q8aenffydpgr5zfe48ys7',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: '9w24k8osakrs71oxmafx',
                channelHash: 'lado8lrp08kt7l6f05ar3qcskz3arubo6gxdt5an',
                channelParty: 'uz3mtvclsqj2j9q68zo2sf1okii0aa9nwbneikjz9u6yp2bzxzq5fp1unc1rbrclsra30v0q3mc1fq3fvm33qvhfgxle3jljqcm3cqk54yhu3zs4z1plvvrns1cnnbwe3pa82enpt8ti040fhjwnnzipeg2odnx0',
                channelComponent: 'fguezzpqnum89rdfiwtooau8zbfzmneqn4zko4ttarbt45dq6p04lzj9hn3jr8r6mep8y7oyrs8bwayimf8y7xiygkr6635dfum215xze3fip26qejwulxrnlmanwksv0wxlheu6oh7e1jaylvfwr6y1ca1jkad0',
                channelName: '30uiwlln0jkhs3d3agv3vnb50c7memi7t0mychq6v0nk669u3i66dkxvvya8akkdty2t36bso21k2x6kv7o1mlnjx804z3cwv4ftrdfeg18b2ngtjf5u16snaenjui6sge8ohw905268j5yejdfp6qswzo43yy54',
                flowHash: 'lcuzfgb40ip78of9mee3es0j1exyjg37dpei3cx9',
                flowParty: '56ygsmt3cavuhntpwt2bhkhtzxw90e6kpdn0vk8efthxqapmqijd58932zx9l5fodetyx7n4nt72wqvl67dd7x9ei2sgln0zlcib01t05nlumea1rcs96ur9m4mofbjz3ryikye2ftnb6dbl1shq2spnx3j9pn4u',
                flowReceiverParty: '4vn8oucrmlqim8gs697uuquoniret30mzbkswypf0b5hlvtomubp53du263lhw9xl6gmv4dg01ybpu0hnrt0u2czeq0p0w6abxz580wrzqcmb02q6lxrfsgn5lcxw0ohu4zc0uj8h43y1ekg1ho15m10ou0qtvat',
                flowComponent: 'bqzitqga0pk8ngoj7x2pfs1m84zi2nhqfqasnmpdktcoi0dzvbd4gjsmb6dw8zk6ctz0g1s1ajy6e29uwkze62b36pd33ahmfohpd0yneurwu4sxqk71mh8jz83jp3cky3plw2ez1v2fhuajmzaemykvjtbckpdhm',
                flowReceiverComponent: 'cqji271k820ki8damwhfeipe7qgrn4qf2yv6c9g1eluldb3vi193wv0wi5kgmg7p20duqusanqqa9tfi81jjrbhk5cucuvop2ytv0f1xomjp7ndj9er0272kh3st7ox58vqbp5fv7h4r9p4r4p17xbq9botsuyjc',
                flowInterfaceName: 'skign8kbt5sjh9ifj9mtxd7os6q2p6dlnm6k5185tozb99j6lrfhrp8f0yrv4ccdghsmszbuhfvv9xw54fuyzxvo0v3ht0le274bit51twawet3cirlk3kcggm64yidxaffom33p15szw9fx6cb2qon9lq8o96el',
                flowInterfaceNamespace: '5lix0bo57qkuj1uppdxnfds4qtkg823fhbanr7d34ersq0smxk8csj5cud8yor9zbe8q3d4xttchch4ql8ux0wtxmah0qztmie86b7283gv07em2rcgxst6e8y1a6y5r57ksp9sextj3ebisyabk3ar2oisyahlo',
                version: 'fw1vfktcpw25mk33jpd2',
                parameterGroup: 'd99nvqw57meaamqht738nxjf8lzdhnbd4inx6lsgrurelkh657tl3pp8xk3x5lni1s9lga8lycq128f8ovp5hg9a5fotofyi6xzu6b7qexk3a7ka2moj5ipqjjxy7ussv9wex1tizl1sxcg1yzjmvfr7s92kugmuesn0j5gnozb73439ko83f9dn7g4oa35yon4791mv4qxn5qmmbot0bk16nd3hf84y5iljpk1k23l41awit6i2emkbvwvrldh',
                name: '4mldtvf8afn4437g2mhtomjg7kghuncuo33dk0antmn29yja32kohtw10c9yanv0jd7d33wm8ukzusvnsxfseybweqe1emynarkns36vql0dredwajelvk207oq8p4bnrnp68ae8nv5mfikwnxeqqem303yh1om3kgs27bkfmuqu2kf7yqqbfw3xmqwjrg50xqaxgz0hoq36dqeo0eov47vv1tifqxmp6ulqzqlkhgv9rsldsiwsbqu94ua1jgpikbhxqoe94pablv8gv4tjtloifhds6xs951ucsir1yzw4v0ilr0h8tgh9idtto7rm',
                parameterName: 'gg1380iv2ovtwhbtyzgv8porjhtgahsq69tsh6j1y05pi6jrlkrn5nid7woovk4kf9py0n37upfgv1rw78knae2ijzbbq92z17pdse0y8z8nnwqgb59hnvwihhisi97w6iofj9xx1vurx47ojw4vgenv1ts6qn26lxilajle5df80dmmnolpcm32gqq3o3o2faghxybnmxwgcmgqqbksm26wljroywnmu54tltonpll170my07pyui1g0lqfom5aq3fuxztz04ddp1ghog0ea448l8ry1fsbjcby3xorddxdz9f6rr0i8xaln02fcq8s',
                parameterValue: 'vxgijwx01olujpg1spgw5gat5qbr8xgfphbw8dcwbsyw5govvv0u44wt8n9dqox1f88up175jac66tswh9htuq4v1x7fgzggk9kmoq5l0684ri12pbvlv3yo4z9z7r1dycc3stg3w4a3v7mg2uessx3vzokdiea06tvd0e7fjmu2t9m4h76k03z2px66jr04z7c74yiw56311o59q1ja38ya2cklmop24mv7uvsfpj5muw1a7sqem1yp7u49q5fti7c5fmy7eouwmn3ozx0sj2m70elg4mapcqx7uq8ale79dpvpzzbnj15r6n4cevlax54lks5dhse1qvo3vy9ai02pr83b5nzjp64yr0djd0197cr76b21z9kiqr4ez6dyzf9w43n5thzbpnzu74fwiv341r93p4zbqaxi2531g0t3zoh1zb81xdhvfhq9ojsobmemfzds6zewszjirax4o3bg507th4x9ohyoojwnj0fvn7mo74be88k7bns4oam86q7awlyipj4xsn8j14mdlltyij6qqablfn74uvq9rahsxydmc5fxoyq29uxzgos1mq0pav6qb0cj64br5quk83ai75t85kk8ny5c025ezpnicrry2zulux37y47kaeln9kouw5bjonrokkahnpoig0ivg6jmid4jtde9yxwex4d02olj6w8gm6z299zecprgoh4qm1uexo3w562um5t7z3pgs44c0dgolurg4ifngkcropt11322z0mkl5hwuzqlau6c93im9nm849ediotfj931r5l7bewt74femexc9lli2clrrbjx249xwi46egw4lqdjg1bhjvj5f5kxyj9ltgke23qvdj0dtochdbj4li9uiin6128wrqe3n7t50qhozmhiwzjspdrmxlyng7vpp6rqvjg4oyjsd6pa31iq15b92a606gf9m4zxd71kl3opp2tfz6x6wkaofi6frdw9ofe7lwpqys5hrpax1qtjrhrs9qb19el5erog0d69uj5un13e0du47vu2w8k51iacg1eo15pf0oxpoegmkdxcw6haho15c5xz60g4ay2a3aszc45ob5ms2yhcgw0vqt4uoufzdcj4v4ttnhu9pirsgi1cq9myyjl6rqku6q5bst817vgwn7bcl57x5u4v7yx65xgrysuvbfjwt2r5wyh3pkb6e23vs8pofb45fncx22u2k1lbi62hl7aaycxe208qgev8195fw6zw1ovat2e863vrryotcs10rxb7b9vbv1n7k3yu6g4j6lsm2f04egh1ek1iblvjpwnpx6gpamxz46kpd2nha8f9xpjjhepd8a0d2q1klkmr5bpe3xcwi1vni8r0vfdcp233wpwh9qgqfpk8zcs6gt2tjr30w9xnho4tmjymexdmhvytux7krm2bbmomn2lc1ztfp8gm7vbvd339x737bmcpb0izarfbpyekg6y7o0gw6hwbqt09t836oev8ieaxw7j6qg31z00yib5wezsokreekpb1li7s5oa98qnsaw8x1jezle4ano0e3hrzm2mwtyok4b595drorttayihvgqqwlnhqz6d0o80t7z7d6tu5l7ihq5q0vwmtta347fu8p945e6c2kh1w3aogjxfzr8ud8lbqjbnccrnqczsecapwu7rn4ob452v2vxqs4kq7vun1newfhm4e7496e9inztjg2iptych461vdxdl0ngf5ot9kfajqd89pnl9iry5tvpzpby564je01nwwl1h0qs4xxb7zm5uqf2kfi32uenh1341hkurvib477sk0ehe8a42g6em0urksrwakefrjy2d9lj9vcsfo1ktex2figo8ot1091c6ffdkc08qg20zhg3eu8ibva56hx3vu0h7jgpyezrn8u34zare60fzblum1m9uhijcy2vd8dm82jlwfa8ozfucp8ecostybn50sbk789h6gcnzg3br01379jkcb3119pwadc45305ch71kqdt597mbhuwtmbi1jyte2w90e8lj1wzlzb37x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'du05l8jom6bzmsfyhgibxuzkqlriitomw7kt2cw8waal06p7ye',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'ahj44afjwhhpn5eiy96j',
                channelHash: '6ezbzydrfhygk67xux4aupodswvfp9uguv0558md',
                channelParty: 'ea9w05ehyf9k9rlqvmrf8470xaf5kin944xzlasot9cr0w4q19kshm5h5lbwi9zgs5jwzu2nxn10bdaauh8qrduogxb88lmyhc9r7ta9w3l070s6nvwgjw4fj02gy3b6rr1rk9bsus05k6u8uy7xven1mqnnwty1',
                channelComponent: 'ypeyu650yf95u3ccvm8i8jpe3jg0ehqcl2pyhozpiuumsh2jgz71vczxpirc870binea2a3oujoeiwzdia1kjeix2lgzqjesnrirslrffdansv7wcjd45q0d1deutwbt7t8otdium3ai26ripuqk4qm8ytlugdoh',
                channelName: 'y6x406t6cmu0aekr7e48o0l0swse94vhz79uckom6hgriuzi3zvoztok6b5kakxbl67nxu8gz84jp2krx63bsbraqmh99kz9fh91ldvk4zywmydx2chsi4p95ytl6cv7rwy60z64zybqik5byugn35n7hgvxklm3',
                flowHash: 'j8vjts5lo11lnpaly9wqmll68d5lp1lo70nppmr4',
                flowParty: 'biwllqd86efmim3fbhuvs1z5gaaf8pyye0n58c9tyquwf3yvs8akeqv8y7syi5epjbst3qaakzro8zgromht4fhojxlfyzztxjfrfxyn38wgqlsvs7d8pyhg6zl78kwv28cz43lqj391cn2wlqkoqy9o1s04vv90',
                flowReceiverParty: 'p6zb7e6g7cewmvkwux9xp97k1wyo5yhbt0gflqyrbaai0pgzgmvu5xnt7c7bmwq4fwiyu39n4eprcgebne9iks3btnl92kx75oyj33t5x9xkn7foijbu0606kj7soxq5dgn0uv1fqi3hhed1sta1old15gpof6i0',
                flowComponent: 'po12cmg4dik5dcxfgxz55vsrc3b1u1cdbrwqxm510oqyuxhyg302xxwhoe8s1zo1bti5abs1msfbzrj3nrkc2xpoaoa6r8f6uuwdzfrps5buzxmurmz97sgcphbf7ontxcy1w0cxyq4wnvrtmqkj3ycqt6gxh1fz',
                flowReceiverComponent: 'oxfw5ugfv6ihpjjfgt20330t6b2xm8wrtij19m5vfpgfyq8uxea6yfhgqxb7g3wztn8za5v3yc9h7739pccrc32q4fybjjqi385dc4xwf6j9m2l67ynafe5rzw6p057p8sv5mdeicomucj1g2rdrq5oqwpe1bsd2h',
                flowInterfaceName: 'pooyjn3fogxjm7wltlqdtt59ri1e5im4k3c4wiz0montebvafk1a8pbs5x8rn48gejkyp864mtqjtab7873zy9ehhn0f0o5kqta2d5qgl18besoili2d13k1yj7p5qq26ijy7cqfmn5uomc3ieetxx1dbaney25c',
                flowInterfaceNamespace: 'nkmy2ingox39cguq517kko21e2gpc9ogaqeu81u3zt80qyrz8dvwpy2nubn0ieb446u7s0k3yiu01cad5fsyfbud2cr7eybjfxp188gdjppga4fgtk94kt0jgv0ta3sxfxah3zsvhp8c9kzl59xzbwos47hjnr84',
                version: 'dtio04vx6e7yovz6d596',
                parameterGroup: 'qwk8qjvrm86stpiz8lamx1ey082111q9nqxyl8e5dlqlkwyahivc47y8tq3qtrrnfnq9gc2n7z5kb843474jgn5agfy8asrqhlbgwnj93tk3jpmhc49ebp23f7nzodifgoev7izs25jdgpb7ke6708cusixmjewwkf9nha1344bn7bkhxaf0o9qz8prab8vdoh0mvo5cv2y234vlhqj6hskbvd27b9sa1i6pebck21l5hqj7jeiq36axqhxkkgw',
                name: 'o3dvksw180rotv40az4aqn9fk240lzxaf3a12jrdrh3rmkc2u0aiupwye0flqdw9hwaivjq2asb6sg3uz922up6i1ttksgnaxedoyi3voq8yk5q57xyxni3uxo2q4de14l00xzog467bgpddaj61ws4l6dwdhb81gspo1agkytfzyf2qy8x84moiz80397ckxqadxnxmhz1l3n36e0gectw9vq3k0g9431iz9cfvikz68yeeay6qqkxlzibjineybu4rmsvgoyxaf6zkvw5ujtcs05aldke15n3lyoax0x0msow7y9kg62x52px9jr4g',
                parameterName: 'tld2lyfwdrm6p3ves5ooe1l7g64usm44hzk3u8ufh9dbwmk5z62c6bd6qb96y9yju48tlejrmff26l464sx7toifqv9po3cbx9ydz7kn42lo8ix6xw4q3xas3oqt4mkcv7ehwsbt6uo6qzh4h1n2za9o0cxf50gy2tv24rk7mdi2j9muscxf1qxnaawlnupijo8r2fq2vge2ma66wze9m998raul59fzkfn0zc9r7mh8dunkb6nf9yqalg7deu3mol65j12iqz2ho6d08z0llaql3ttpuk8ffpleabyrlgqsfvad983d21s9pkob5wqn',
                parameterValue: 'wu107cca76w8ohdyj47w0q7x29znwl5l2avxi0ud6m2s0o3stsxww65ae2rh4h3kkcrrq39inrpng0r96zne98vlhza03pipix4kxfwh2lhagta6hpvj361w5apydtfwtgyv8bgh5mo2tbjzjxhfkdekbtnwr8qlveiqrkey48wquk7v0uq0y6g6rdacya7eanth1mngyval2e67vh6tlcaclgky832jgmqdhiae7xf9ks80mfp3mout2f5p3qlvde17x0axo35fki3tidelqnq8fjxxb39lss7w2e770ba2wwospnhpuz3rxoifkduej2vgul6hpvlgdjsbgmp0krr52gdl05y8um006nh0o5isid8iu98190f7b17ess4ssfz8duk12n9hu9c21zj10l3279u3tqu2vtwvqeete91dc85okvevufglc9pqk2lclkf3zgi7xtygijs2zfof68xtzwfjd8jtgokc6dvz9te2biaz8rs56umddeocy1sk0qdvpdwvuy0o0vvk0nizbhxqv5it66y21yyto3exiug6jnx4hztuxijukfm7i5ejr8luugo2cnvwnx3slh74xwj86fjins7gycghl16vycdboak4v77qiqlpp0xp7zf5xqdzlv4dq18rcx940b5vu3e3be4j94mu3geg775i7tj0mm3cckxp4epk41hj1j1al1oae3wxidpl52th0vputwd17fpbs22zkyrnwj822q4am7f7oy1zjzmmown665q6f7778elljxd9a445jz5h9itgbvda9eyx0budpk6gp366mies0dupap1tpzlhhdqan807cuzdmrgmj4amv2q1f97s0giech6vfphxw7smy90agosezsbm3x1q7yxc2chvd4xl5cyfdy5joteza7tbzabg4kiyt3l9869e9i9rokby5pdelw454fvfn5af7jxedm6nfcfvhgx3dlv0z5ojtzzomt3ehejwuivmcm9lyank0zw88o7yrqj5eimymapnr012vm04jq7ochn9ua1fpqoq9gvb3r6gny8afetu97hgq98pntad0auhdf0oq67g3qw5cbjw09akb7aj8eftgujkotct28ont95mwjf0o0vc6m2heuxl46dw3ixg5ifpnc25kreq71i4dqyqpb7vnq4920dyf8fu229o699ugmptqmx3yfafnhj1s5g39albw4cb08yhjwhiz6ww1d4rj637oyo63hsxda2rom9ils1yc9b5swzc1tpxw80dhw09ckxgrjdpsiek833rb0os32fgcb0xcng7t3b77h6vkb01ct8luuer8qo8wcu0qgsfwym6r89yjz23sk3ze4m8q0a3pxv5h2i53mwielm5n15ye4xzu4qoji1r32pwx0y53rjav1syy1qv3o8towzz9d8fngg5qdk5vq3lsb2k3qob2gfrhl5ccp9f9w4lk2qsatmdm4b9382tiuov2zxsg56yy17oto880z4fod7lvzgj79q9ktidbl44ndwjdjg62ok0x7e9zio9m8sgsb7hdlzvr4oc7wgz5ay84ocarqabf8hlmhkvayxj4u6qibpnmf0s0s842pjhbpk4e428m8juwe90tom0n9gb81jgzh9ef1k7ddtj9qwyvysriyeee4xf7xxwvtipvko9i08rlxmrai8ro818ef5ikcpsbcjdd3axccr9ks7dv3891j0ntozrr5zopbau5eiqvjs4vbxj5im4nmy1bp5sm5lsyp6ociwakwp2dgyeo4hlmtmtluem4vgv1ndcts125vzz02xh4uuvqelv60l2yn7wyu0c3m5vjrlvx5na2kqvi8ctmth8b0g6g59pvdfn59smbibmxrlcd6fug1d9rtz6ka1zsfg43xx4cl16bmddsdxsa2zo4dniposgf1i6g439d1u9hn63qjbv48zv0qx6v1hj35ly38hwmxr4vocytwrqe7e0y6o3sdypg9syj05obwq9rbdtqlrn7kyw4vqhlbrb60bqu0rkh8hdcw3dbbdu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'ag9rxpwbxe3lxccomzi3xkqjcgr4ktovu9k32bx2baapizcedy',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'tujplveuhjrhrmvxqavj',
                channelHash: 'fgghyr3iu1tai3n1gg3wzjmxm4ydjl89g4gecbuf',
                channelParty: 'af00rgwosy26u7gm6g24zkdom82av092bzbiw0l3qpcsik8qoa52urf7vb3615475ywrrve78bvbm7ar321y6hd79gzrxz2280xrwbz2rdgaggkb5q4c1q6p95d5jx702wqs0z631lb5k3saqx8uresmalizmsy2',
                channelComponent: 'ahgn5db0kogv4uzxxg8u05244tox52mt4er6fzpstpd2w6i918h2cxzkdh33htsqsjbohvrzmndzo8tk3g56a80wxc6u4ocy7amgpio5z1tuondw9porlcpi3yf4l8694hahhf8974yshsd292d47mkz03x25p8e',
                channelName: 'v1xe4q206iw7b9t9cwb5y6cvk11226tfab6w3kmjb39nw0l66e8entp0agdriwxr3eey4iv9v0r5inyrcsap4whvod6bes5tzq1strgmuda1eb6ewynzsmle703mqf0eim429f6aal74cj81i9el2f17mawr2dvr',
                flowHash: '5cnd8qt6aiqgb1vx06jriopd6ocl9qn59i9kbets',
                flowParty: 'u93oin46l3yvg560zsmyw1urtf4q6g2snvmmc77vwx3q72h7l0hy5ggomve71fzzpr84mgbxrd4q3ns1u0kmad7tyji2ni82m4zd9jsudxuglxn72gbmoewrmvkh19q0rjr0z7jheuzmfeawydy6ised7yl1gaxe',
                flowReceiverParty: '5pdik2cbvnf5nlrdu3egh82lpmfg0xwb2x6e9hdog9ackmtw1jti0ll3drmak262npnhp8k7qe4rmfvabeyymmrqx923u0uwwq1v617viy5hqdvggd36ekkmw22yutr4mmf512xyj12r7er2f0t2ovs0ec9cq1vj',
                flowComponent: 'iusj9wtmadgyind4cd1n4en7slpldzcgu348iqtc8766uy82xogv6a46509ss4hxhsafrzpqtee2wr48yn24wkg5uw42injfxpucop8sitqazyts1lapfnr526j37al9iofr4yus1cvhm65hm6xo1x5z4yjabmsb',
                flowReceiverComponent: 'bqyolxrukx1ijpmkgnn9xky7n5bdjztr6vomp5ufwixvomd1z7oshyn4f1wi2rviyuwpqb15j1azu7ozbk42q3s85x8d1y5r0y9jb5y3r2jyrozehky1h4cnqre6fqz9dr54sm156c8jqtb6ag0t4s8xnubdqj2e',
                flowInterfaceName: '4tlohacpge7b750hyfa6vpmwy2zqofjr7pwkf8dq36z0hcg4qjn4o666wyztm1pjv273fsk7yy46cnsbatqzj1e28i2475m8e4zbgpjyeul0wisw4y2chwri0t6h54l0if2av23tlpapsbhpxrhctodxpayqyowmg',
                flowInterfaceNamespace: 'o62luyr84hfxp1rsxcvegqnvfnzmq17eetn0ox53my7jhix54wqesaz0erhxgavfdpp9qtrw8alnpngawy1uxhtte1ymbn3jff1fmwlkqjibvzi4yed6ar4n6f4busdavrtnuig9wb3rpn1vbo924q0uwiu4vfmy',
                version: 'po6ck27viqzycsi6pg80',
                parameterGroup: 'a8i0fmajmxbujjndnti9v9uoklsdnghrntzg24tyvuvcjdc3zpinh5jyrn3djl8wa922djerdk7c4e9ianwniud0obpjzyntfli187n7zov2rklkylvxv48500hpu1cbsfii13nbs1zu7cri2ahdro2iblu7jwsm2y4jlvfqdihkfac0872cwlpbh6k8jrs3c2e3k8p6mdoyipt3f7mq6g6llm6edc83yayj0uckegl0v1d2kcw3vhtwpgsegl2',
                name: 'lahhyz8tqzt125w6yw91epfw3h1jryoc7dnk2vogytljr6q47s165bo5c4achtm5bmw79dgx5lfq4i1x5tgk3khl8i3sribr3kf5j5yzy47h6bwilau2scvvs6n2w3p5eqctm6ac6sqjnyzdmhg6qdhsrdz62kc9qlmyg65pcribyyuwkcqswqff30m8ppjoagf213attcy9oqwguqiv7tud70w5e8s8gam8lx8876otlxgt8dv3ndvc1lb51rfmmpqlof22ux6mfgnexqis84y9s6kw5k0e3ktcxloxll6vllvdr6b4tlqmu0a3ni63',
                parameterName: 'uyh8selngma2eyhn8y8mfi54kxnxvhlex90j6f6llowuxtftyqm2wllvhak7dhwaxh5u1go9bseuktp1rr2t3hxn6tjt1jxebb8kwil8px5fv0apugqtvqi5w0plk159yymur3tgdi98fox2t4v4j08o0tjp7kpnokbmb65veg1gd307ihhli78r1e01rcqlukafbf9hy88p15ltfrx1csrbkusth8xs465g6oxlh8x16in7y8gxwdamp4ca6s7mbh6sc0dcpdz8xponflcjg02tacq2f4ivyfhepqsavo24blpu35sfiog4dwg0lumi',
                parameterValue: 'hv5rgmbj8b8fz7zs41w0cgq86d7jc0h9ed2aq5zr55sbfycoomhkturd7f53zciecqxoaqi90ozuatajppn1abdh74b2d3rrcztinof2orsmsqwodjkt774j7xss4ylsmy50vghax0klpd1zblna1srmsxyim0krlcejr8wdiqflsl1wd7g6spxmes56z7w05wx2gkv1e33a0hecjfyh07ohblw7222ff70ucq3ij1eimliemv344k9etyq138uunvu5ce9rndqi7csv94myhzqeu0icjc692rffii9c644e7b7xxzw4b55hd0zmlgalutzskg10pcpyg7ue28wihucq4x7ude2w8n04cvbjkd3wj8ucajtfd1z7z4v67z4j8uh01kkc9vp0a61rahjyqw3gpojccfm2gwwtbeq4kbp2yf19frlvhcpvvr9pge06bsga8vjncbbhgcfje3ks7yp1421eqk7ornzt56uc55ucow60l1iy45mj8qh3sqvd0laip9cax0499l8h85bmav6ogbeec30v1j2t9zj6wzn5vysz80x4utkd0hghd385ps827r4zczr9rn5zr4tuova51x3bl9c7asew9lc02xsstus0fsqmb24opr3yyrsofh9v0flkyf3qccmaqxtrjg3jkc5hgqdusathkwz1m9gn42m9ivakg1a40sxrmffu4rvz38vgovzxd4wrxvpf5yo262wbnvkmye14j7hv3ea7a9efpuqnsrtabivqm9fb2fbhyzi3iyqdqb5gj49fy96lb610x984i9kx8l31p2lvj9f4qyb3hj9de0ey3r37yc388lmxvl19xw4s0g8x9iqvp5kumj14a10xqayts0rxkj68n8k10qm12cp9hzkyil89yjgaj5adfa5yas3brquaw1b2zpklophsxlm1tf5hetjtfqjxywsq1lqs3jhk65nb7czextyrxytbkvc2526p22v9uce2fs8w44n3vwjk6co2aaqd2dppgxcr9jamxb9cnbuh6g04vxviuuz1lz7ufiurww39ysm12s9rqb391158dtvd6njn466o1k2zusp6penp6ovyyahkit3nc5ji1x4p6f96ts2pit7zx5bi4502rgt89gkwsmnb7m2g2hm8i25213rmb69okz0iowtoue9x22984xbws1jjaxxrrita6lotqgv60xpagopw7y2c8w3g58x5bz0vvfgdn321dsxw6bzas1ntkzpty7h8d37udz05vc2tbp9s0i6oyzmwnpz11bhhr31c9hrowxxqmrgcevob9mdwzgyh0zq4i31da2y4i7ne2n08x8rf3pyyw6kx4mguu0rhts8d6iqp9awtef859sbravvmk9zflxq01r1xmehdagqircjyhzw97a10u4i20qgkdoegaqtinufykhglq5o9scai39o4rbq3ech9gjsdi3fd0ld61vg5qwjx6w8g3zwffieumc7ex7xrebs44wbfcwrtskjisplnfds5wfs7ri5p3lykse4vmq30u7dfc0dfdyy7u64h7ao0m76ikabuywzgrj8tahqbulxu18155b8jzzjcc675b3qxq8jt3cs5qfs24xcte6jxqs8m1hwvf441qrusb8rf5ye38ywoyzn5ybprixx0ocydnrht7iko082pfucdri69c87gidhbvu4w00cen67tjqcwdxrglpjpveitge78eejd2arcncz9d93cac2ru1ne1pau0q78h4q4ruajxov0dd0r8lemhfygttl4k3loyqdajsfp5ugzkpa51bk2az20pf7n5s868a8xli5a5vcmza2had7t3gb9dcpe3zsao4enj51mv64dcuvp6xne2o5uzlgk79pfeucjig1s0lpvkrj2cgkhly2b9ysb9dq5x561byf9q2r10ccp8p6ib4pc4l7gx8ozqjmr66qwjj1zesqx8wmokwz5w0mmrh2qgh38fa67286npaidkng9gnt3r3b1inpr75u40wtre7dex6cnw854ohs58wnx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'y065eg7w2dz60zvcld8j4ijxxsqi8676lrj5gljwnyktzvf0h3',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'tif1r87mdryq086jy18n',
                channelHash: 'br5zozyhqmv27tv5d8fh5e8wv1iw7n5ws9u4cj9y',
                channelParty: 'dh1iup5y90u5y7ynodcaomi34lcvo271zuo2kgupug6gy4trlgsfo1pz9cwfrkcuz4avoaqokm6egyng4vtsqqyy8ok7w3uuntfhtwwu3cjmsw2fti9kdyz5tymxcbi1u842bhxxy7myy3j9mc7ej6bcwyerb4v9',
                channelComponent: 'zfxd0le0cc8218gztfwfgaynr33u4j7btiy56hn1k9fm0gohrea5lk5oz3pna1omxg9dufkpe46rl9vsi1t9hooq5m8trqzicioy7ov2j5fo6nmgurpzk35goba7456pf7scvgg1ys0emw189alcljhu5trmqy0s',
                channelName: 'zcafw69rnjj4r6by32186pg3cq7ob1wxwfafbq2iim7n6rdm47wazf6h8qxz6ywokrch1i2mpa78ftqkprhmw5cy7pc2b4o69xie07cxy0wvvrgypk9pv5capph16srhatulx79ii30f4ld7xl0yhi2ztb2brw1c',
                flowHash: '7ecyk0cx4jhabg1zu7kjtvo5xmaezi6qnxi0h0rf',
                flowParty: 'natpxvhqnk0beuafdqfvh8r8nkbsxoolqd1hcwmbq4ngt8l5y9d13c8zqshh8p73tzb6s43cik5o3abfw7vg99wv35b16ofi2hapnanqxqt1acaf58ib6ljphr2122qtr6su9kzx4yuofdpn648hs57k2mkanssy',
                flowReceiverParty: '237dcr7gq5pan77rs3z1lpdls60i70m41i1lp7suzifh936z4dz3w05bhv0v3fyy2hw5o1fchciu35d2b5vay1n2rnrspt30x0ogx5tyfihx37rs9pa5l14pbaxp92576u18v156n3quaqv7pprn2r30e77mfsc2',
                flowComponent: 'u4v9qpsn5g2pn0o4ibvzxx0ara98hhg3frab3exw6yg7mchqnsj1xx851rn4bo1gx2k2pdoyf9zp5qk956dfnvh2z6gpyycn0xkfgs1ek5uz71cg8o7l9g2imyv92cdzutpor3fm8jzxs0n4qn6m82bh9sm9wv6f',
                flowReceiverComponent: '3qufeh1by539t9z7tn4tnyqg8hygak1jra6eoeeqg09gkrzpnxxxs4ou1ab8uj2qekiusk9ynr4i48kn004btyqytgpg6ah5yhrfgsrtnxltct7h70grw598x331js3bwzswkjiex2ggai78v1vrkvlxklzw64xa',
                flowInterfaceName: 'nimqdm3quy1bclwv6a2rblo537x03no0tti0d9qen4xuc9371j26eh952fbkyv6aamrr9may106swdzvyl5rbb52ama6z568onvl6kgb5k38khb7g4l18vsiz7kjrgv8qba49vys5u7mv9u6lktg788cfzv1jthv',
                flowInterfaceNamespace: 'sb8mtsks9p2s2nm6hts4p254krlvmno2pjsg3mt9qz8wa87lweqcydbhzl7ua6pvim7uje9ydsvwe5rnzasn5bltot9vk6qx84h0w6x0ld7paqhv8qoma4oyuvo9za6fwccktuqh253t8kq51vdelheii6rzjeuep',
                version: '3htyzmfi1n73mfez527e',
                parameterGroup: '9m40ler4grj6hk8blrzwwfnqiuzjd06c0qtlkvcjdhvdnyq6fkkony8vfr5cvxyip1bq7vo18mtde9asc7j92ql9g6r8us28vblq6037q3bsuzzfck13800gtog0tex4rs7bbfufh0jfvbnrx0p6eua752s6914y5uyttkt98dgzwm69yocopjec42ksj30xydxh6iaoruirt0qwf5z5jps517odm5evu4lmp6n5oq2m3z6ip2h5kbii3cv87gf',
                name: 'oxvqo5pdvrhw8wjkbn95a01ueb5t0qhupvy0ykt9ju23nrc02kaf57kzk1nbefv6x1enuhd949pt7bedsadmsl7xt2d0f6gfgrm3ay0lw3sgtd1rvv8t5lyj81pr6o8zpcmkm7y5dwpqfqq68z51o6p1yps482h574dn2wzb1kwhxdykul020nn77ortgv0qyw7ssffa1k6qsm0mrqaa1ogt0s063vt407gazsoeijfvnan03b8v6n06wmidoax9etarjwxgdoeokxl1ttfw4b1b3l7rsvj2p375d0fnjlc9gd7u5r9au0fe2lrxjluy',
                parameterName: 'xtqz4bzt2x56eyq7w8lhufzwljo98qare03s1bmr56z1dqmu3ln6pv6kjcmh2l7xjttb85ydzg400pjlryknxa0l4zwqu3gi3w8m6rkhiyroezxl07y6s9i7i12p2mxnd2o3wcoeuwhahsfk5e5q34k2cur5powqo6v7ypjmiokel5s2zionpqum8b74u3kwru7xrtm366g4rl2x0qpv7xsg2s6mqg4kzz65qpxqitvfpixh2ecrzb11htoj3t1uvcluhhcf7t1s2ujk0ghvqaylfwftcmdl7zxu05aha9voz7spmcoriyokw4elxdve',
                parameterValue: 'uzytak416jb13sd3w536tzq9af6rqmwfk1kum4n764p5mubtyhvdyzpfnuaudozv3yh9ytzs6pz8vsxa1eym3352wuaeokhigwubl91gbrjaevfz4gbaaefcbvcdc3ffluinpapjsrr5wldj7k7i0mk8vu1vksavubl8noyweakn2xr2lmv2m8ca78xdn2juyg5op3qt1xzmesn8w8hzqn6dzavictea51lfp3jkd8xv17ecwuj65ve1xu7ql0867f3k0dmf27c3xp7mjr68rz9320u838sopyb5zo5hfewtlm7i8iozhapgnwdd8fo3c0wn39hap46c20ej46dostzv0b3qe9bgsvpp3d79xk1lb77ahg1vveptsu5lpu5esd1ru2zu2heyfcludl3mesl7kfco39nbrulcxecvuylexfm1y7tko9yw16gp9luvs0via7c16qzw6nkt7oksesrvkad24r1jb8j5yrthlr99r9n1zvjblak2j720xmcbw76e02w1u7ab961zde2xvn8z6goyyspya2rxj2xcjw3gdhcryjqs7l15w1ir45rpjzy7nrnbxtrvxlxiufl67i38uf8c6ojvwmpa0wvt4xy9qts23botkbrynw0i4kswif8kv02ddth6ltpkk7aypqja2birpv2azlkvcugr7aracr5ucgfgbdofdf4xo42ebigce980zisrzxwen8oulxjpkjm5dtl0av3q34li6xeg04vazmblkb9eobq5g5jz5y7eqpczz5f0sm65i2dfp178snm5q03zfl3wvo3ijb9sgoj6bkh3z9qrftoyumeowkdg5wsrnxcjyahr25ezfl7hwo1lvqkfzbfp1wcsi06zagsb8xi8wsig0y30ng2xqcpcetckvoqd0gktl4y4feln31lepsti1ijc2fac2k5m51pjh0hiyh3qormmld3az0ll17m0yat5gnqemtczqbpos79nzqaabt5zp36e37beuu8j54g420j8068qcrbl6nh6un77tjbaapq4lwyykqsai0eyn2fsv1hjhzvz5t7lllvhjd8ymh8rwz20ar2x0qm8yj07vzhrlcq61rafitslutr14mxnxhsd4ng6ol4afiivgss4jmut9q8r4jkjeg8qk8oiuwvb4wpsj2iggp3a2tfw8djn8h1adphzjo87c6tce5q5wu7wa9ymz7btcbue9sf9g2igmn2f56mb3bnb1a6dh43bili7jjwmjh30y6e7d3o7khipajvdkpxzu97ihithw1k1fesmdnsjydnl4607cpewuvi1faq4vx2ullq261xve8cwamlzmyg1sdennb183yc5qcpptmlagwuxwtmmgl27k5g2ls9njf3p3kbb15ajmfms74efuusg79r8kp02un0c470m2y9b66mqsdsnys9gc21cj659dc0dlh5512mdiizxhwfkbx9jielhmcd8t43tkbp8dj5mbynpt2qnwmlo4tqt2izitcpvq9l7jedr1rp7m3nbj8x8muw8utao11sobh1znygtkp2r6y1x65znvuspkrivmqczt6qp7vod1ryre1r0gx46s6vllvvc8b9ar3jf3bdk6j9rjqpqjthe6i73kjp3sxswgj3ct2g3rfw8s1upq7hk35yisq1r3uxxxsv9x32sz8hx9mi5x32077qccjk1al0gea0k2pedpvzaf6iwwa0kpmrqs273kp2ny804mih9m6y6amokom22j3wa8tpavqpi7hhhcc67xa187ds4a4ovu9vofb9vbtylauhdvt57m3csinfuve105g3lto9jf6571j6klb0dq2msygelaylqkl0qstymorxfj7zfpdm5r5r9ep0zrg6dv1bzjnzly6dykmeoqmdq8g994t7penkr0mk0gapov7cj40cut3q2catrb8ix7v7fx7vciltlgymqd5b2tq2l3bp0hgum5wtqx41kutiy6i347uyhyt5ixfiu6yxitqu6ebwdj8y20pzb7nkxbyj8uokeg5r32qf0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '7ctp8kdk26aq5rwgeki38y5jx76bad4f76hp0wajs4dcnnyozz',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: '7orosockye8fb0q9ijmr',
                channelHash: '2d079tlp0icjeazun0duz076ozqo4xihhpixmwk5',
                channelParty: '9d079vdvv7j947c7nie13ia74sjs14yvxjrdkdxw47plzt4xu9u5ur5k7b1gz0xd96qgbfmkh8n21fbox1fs6oqpii2mjxv4ta9p8y4kjsdewehjac41fuq2gr2h3uz5oy2h96kcorvjawwc9sid7p49plhpf4e7',
                channelComponent: 'uzv4zar53smtfdiphbj7dtypvnmyelfg07dkc5a3z1a0lur0en20fc9kjhiuijqipw5mw4ojr8u3a8wi5xidc04570ep6jjmz6nwxsg5ujw23fp9ugt4p9fhczzszbj3ixli1gkk1jtiizj4hxo84eimakplongn',
                channelName: 'vsyd6s77dxvh8nu5kv925eh3f0g5m6ugiqf2w5s7ca57z4n3vvksa08jnls6vx22hsw6ach45qrduy9up1p4hkghcmud4gfbsdn9v9h6phvp2ccdl162xg9intflum05ijcp5rfsjym28s1emtlsiiii1srx27qw',
                flowHash: 'bad4ing3gkvvq4b4un4v9gnq57lzfor72qpe4k2v',
                flowParty: 'wf1q79weil16vnw95eyyhkuf824nzzfpxpnlrxztx2aax9yogv0yuhme9lp1zla9sh7xn54xbmqym2axlwqityq5xtroa1yx992crql172bbwh4eqzk4t56h528d533ya5e11kl8jxuuxrdk338vg6oszgtfuoyd',
                flowReceiverParty: 'c4f5qll9io0rs5c145l3c006bxyp9j3y1xxrjek64oshs9s2063fzqxzcb99xg72nzcvrlu752n6g93xt0dhs7i366do19buk2hnsp4i5pncfanm651cnb5vojcbm5v76rge3jximx39xsqjeclbe2ehi1r8dnca',
                flowComponent: '7lhqcc439klemvzexjsawp2ua8eqqvfllylhsadngxnhv8uabnas3560x6eh2r4rzsxxblmpvdr4wbr2120n5jnm67hvu01lqohbyonr22zxcty9am9ecpivwhn5elaaz1jkx5m7ztgn1h0nhuk4um04mwu64260',
                flowReceiverComponent: 'xahz1rbhjuugia2ip1aa3h96sf1vfj6heocrjqixc2aj2o9dos50pk0k64mapbffd0mvvqz41kj74n0k1sdrwbw73zttihzjf6kx24wcp1modiw2acz8uc47wz0qk8kb8s52df8y9rns3o5dun6c150g6r6szqs7',
                flowInterfaceName: 'foit1gqxxxe2mcrfxryrj1yxa94l0d35exxt3ng70bh62ldxyd6sthqb012hfmhxp1k8yhgjk5h09kj57a55x59snu22sno3axv775083njiem0d7ygnxkqa6ugz7dlx5jduiuveoe5pj8e125gqtvrm2qzlk2t3',
                flowInterfaceNamespace: 'k8yk8djaf176w7iga81ptfqbgko050d3egv5ub59p239chrd05the1rfu4mt9uck2x6mf3vh8urm5lkh9f34d76e7c9o71y2l8e4gv7isev39xkvmrpmsvt8ntcctgavb9rlewyzvmp0zbxh4gjxy80oxg6w6b97',
                version: 'gwj9h7f3ps4kzwme557yr',
                parameterGroup: 'nw7g4pox5ysfgss5ir6nstrs0ldnjs2tm1hp7ht4vz83r55gzaxe0wwe0pbz33rv49c2k08eq6swcns90fcemxb3dl3vjsxwt2fllaq2auu3h9m0gecd63n6odpv8d0jizf3s1g7o1w3prozlmiazspdnspujupofe2va6f4eurjakqot25rit74dkuoseorx13mmbxxf4fcljyrzdfjneag6qcsoxp1r63lbris41np987ew79952g8fp3d8oi',
                name: 'savq7cgapywhcz3vvwxr6ps4ntwkhl2pcyjvfd7pdfyvrkmgv4yhqydwd24u58mxfranddjmuq4xgflqb87noyzur1tw65jpv2x0clshv3wewcpvqv29kya8uifyhvnj2m19a7nrx4l0ortk6o9ui0pwyxkz4c84x3tdcbqddwrbmcvdppxhwft17yy2xns9vfqft3fd8cz1umjbiwahvpan8l6pwxx1itp804rxcw7knqf9drj64ttd48w10z1r56hykgqll69ai3flot9utwkbmme1cgm6ui6h5cf752389mtps2jyju8pm442juxi',
                parameterName: '14utfbq7ia3mdkz32m5ujb23iykb57ho7gxm9i646emxyqmls0tlwc6fdcdmy394viuix4s25gszj15oksqwgxg7e1sbgkw68sg2valo34h8eisdn8r98asy36y8r5zzr7zf9626g69cuekx5m8wl9af5v6uh02erlazngi3gfreovb5ixdls3svdfnvvu5pbowfam40ygxwr54sch0q6hjha9e70mu08otuze4e56nm1m03hz3rnprpr1d85u8k4wn0ztlhhrkfbosb1ya3qhksi5vo37jxwl4nuojfsr7vdillxn2jughg6wzvjfv7',
                parameterValue: 'aa7ucpixq2yj9yj9nfp82t6lp80mr4aigydluo7oaewcwvwfxzyxy48ux9y95uqbzemcn82v7n7okhu8z9l7t8jea1l576lf3qahal4v74xqn1t0jzgf718lbrbgr10toyjatjv6pyioxdmq9anltaeoxncyjxfkgbcxp555v501nnv76si9ot3mkya4yq7o59p5d4qytflfcgr8iiggxlw7i1wp3vwc0nalxm2o8me9d3cq6mkqjw7fpddnkpupwwan8hbwdvldmse3cjipxupuudd0j3zajr5ye0rg27h0yk7e6ewxldnf2d1rwvrdomyx94g3i5elhch8j4eo5nytsom9q7yorglatc3o0cqhn98sb7x4bq2huwl6cjsyaqt5ibwf23zq9ptkg69qvqk3mjk2algnfahjmyeg0mqcgnyovm322rzrgnt8rqv198pbwa0mgo4b73yzp26s26ta8yvp483rbqcc0m4261t9267jj58db3pvwbh8x2h0sqy5mvkqje1uy8bvksfl9fzv0kaoaze73mfpcoe0zo23mhbbu2hbekxi1fnukpmvii1720ixe8nzcaemi88al4ywfr84y775e3dctd8wwmg0qb3s5nu2hlpuqkcdm5a6in141qi87hkmoij6cq8jjf1jc9n99jzefp38hyjtizhed5ah8q0loku7b6vkar19z77tf2dxr1eo4m0mdmss8thl3uvncbertbjbnv1odlqnvso9t9etepqeqjrqyfzcfu7ig3rhd1yxw61pkgzynyz0yqrrvqi5o25gtkk6jgqp5hdi3384ylv3bnz45iceo6ijua6vaptf7l3qgyaiot6fwmv6eb05i6bkiek7pnpeosjeenv13cq3k8k59ljg08ww4indc6s1yff9ytgh1r7s06w5zobcuht6pokhrffz2ibi45aq2pqf9m79d60tkco09o1ck4n3h965g3qig86208f9t64uhjz4xlkw8b6klt4dwrvvxarq5785ahggt5vgzdn0wkevzq3pptheibpqrujjp3gct99j7ap845c7epubxbuzr0tmxs2xx6lbg2aanm7n943sqpx46fajok436vveme8j22lpyap77fgqc84y44bhcrla9448ahsub2dchqm5atsnygzor4vvth4rnfq39qcvf507k4tcd2o8kze78koecsv0vhl02dsx286af52t1kf6dwcualflojifg85m0ua2x5v4pt6uwrxrbg74tv5op4vr06qzs1aebk5ci99v7fcm7pcr8iqee0k7bv7vu1tc3yuv1m4hevkr0jpmthumeck3fudval6b4khigj60wapthj1vl5217yv9doklo7aw640tqcahuf20cnxncj23vfubjv0zr2nw9lzo6nb24oz9kzc8nu5zieecswib45zs3ub5asbiwqz4bridi0pfpv7j0mavoxo79akjcta99llhd25ujlu0440tttmui60hh63g90ayl3pe2wyz0ipfl8uubxrer5210zhijur8ifc6el07ot38l029fbklxkal2qgyv0v6375vj3wywsjcdk94bfu54g3wkp13ezow6n95b8q10to44akp28s1vj30a182mwpfp8vc3djkqkjffku8xh2n22r2lf5cetwm4uu1iz88wxflwu53evufn7xyfqgjhye4o8fuccys0mjstme4867bibasv2ajyzsfk6f6kvho3h68ws9flo0b9rmnl1gadcclolq2ufxj4na5tvcp9nsqhfnr1eqiui9fmg7pxty5fiy4o4syrdwze2v7zdori00o6mak8unlzkf5r7sasrnd5etut2freqwlevl7ia2zi4j2yz8wy11tigxqq6wc10lw9ywn84c11xfnglnq6p1w7n2hwf6g0qw9m5c2bz91dwoz436tlp2ybj1099yadtv7wgh18rnawvma8tpt46ame3y5l80k7ts79b824latoj5b7ke87obpkou2ybg893odniusfuxiollce91xwinclz0v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'np3vuzv1fnf46p2avr61oe4wg954547jxemukh0icze1pirnao',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'b7fw5lvq5efn2z84x0lf',
                channelHash: 'bzc2pn9294vidccoi8dje7hxgew0l6ovfxkcute1',
                channelParty: '48zhgy4cevpn2uhsphtx1dqsku65tjuzk765x1tpdv9z9w53vw5k7l8fxtppoy7sb77l0c3dnb68r1u5tqp9r2lbkie34td0yps12mktce47mslpa9kk6tgn5giog42fesntl69rjkojd8pkjcoaf942oywvtedq',
                channelComponent: 'nr89g6jnh1a142r21jg0ebvxx2og99bo7lofcgvfp5wjx4us6yt65zlbuyphk44gb2pav1mudylobgn0kpjfcu7po6aoclh106dqqc6mmoxmh70531ramec9dmi6yrfack4ioqw012ib9w317r2lvlm9kaly8bku',
                channelName: 'otdar4bxa6h4d4mza3ozdwn4fh28qkp6df7ypbpp44mrknx7gwry0d5tayglbzoqd7f75l23mu6yr6elikx4byai7k7jwk9r377iqz47d3del1o3n7ysvqzdrp0w4pbtt362m4f32aams0w1vqkiviixa2a6vly1',
                flowHash: 'p4bl6lohi879eirc1ml9debxxe3zv1cida819rui',
                flowParty: '6tm1b4317davswuuod1j5kq6boxm1rqpti7z2nopupw8aqizakrivakrrayu17qfkaynz41fo3dojg8w9veqhlfn8j18oa2ijmnda3r3zk03wevjwefkszjz74k5jyn6xze7b8t0qxgk8yjg3v1qtwy3dykkc8tb',
                flowReceiverParty: 'p9v2595m6e2f8dwygo6byg235683awvid3fqi989a9ygyzeuxis6b7m8n0syj6jj8fymwfx5hlzbdi7wp9irugor9fo1w29u4iqyfb8goqcnkyub89oy3fh68nd5gb9pgjmbkpal2fk90k5yku5txu875jnv1y88',
                flowComponent: 'w6ouey1cfusw817tc2cwxr1di2896qi3gg4te6l5h4iupo3i9vy5nht0atx5t97k4pi45p8ezj8ezlslw2nhnf7z5ajxyp7xrw0mcejvqx7lcfos73zr8laga87c6fpa61uwh1exc26a4yowk5rfs5n6y5ugyky8',
                flowReceiverComponent: '400n0zqhaus30vyvjy158fbefo4jsrjlw4lnb108ypd8xnwqofndh6unb75j8warkqdkj3kmr1rn0b9vfnh5nmzyj4ipoqvmc10gzv3c8cvx13qqwbubksf2w9vk7khxjvid6uw56hyhpnl78n449jg7gqe4rd54',
                flowInterfaceName: 'gq9gbhjto10zkio0rw6uu9vlwwpnzadr6stiil2ztmam98nf722d5kltz5bwzswbi7pat8dou2ueg119l203mi87q8l81cyek9hmy610wsopxj5dpskws6uilvfxe0h1dwovxxba4017d7u1ustmewwrmwbkmuc1',
                flowInterfaceNamespace: '2ftpphw5xahyiwm8lmj8x3jh9l5ny5o5j9sw2p3kn0nf1bgvq4x7t44d5ix9e37mwzfg3hmuqdbpri24tkqe3i2f6sut7chzaqqgj8kwbsxu82oaucopq24e9mv8vhmmg01nddx6rbkt2tsf8ux2i60sh2wlekeh',
                version: 's126de0dm2y0d0z1y6wn',
                parameterGroup: '0j76a4ogh12ywjwi011d2ojdwpjrae5eenita9mk571djj067fg2q7imjuykh5rlmju04lmwq75tlybio5f4q0rgpzmi8qdc2zrtkq5dk6vyv0d465rmvfu6cds4pn24dxu8ux8g6cstsagbg4d6m4a9xq9s6oy7edwiqv641nexh3d5uvt10y3thewli4vo785cqjmfn7jo5a16bnt4npwlyu403sm6w2pwt8z5yy9lrg53h12ne3ou361un3kv',
                name: '9sfpcy5azynza8810tshgmztv2ufcpq0yz9vstrj9mc0p4en0fl3epmp3pmad8kpfm03vvqfr86l0a2whfdcho2f3kizbm4n004ir1noywrfgmmsq6a7i5zzmlx0syyw412bcz9jn9j5teslm7edgloypceglavti7ni0aebbv7dccj57gvo958al38q741h5op9dwsi0q3r6mhuuvruexjjwkqcmrotl8zw0h5ek5o70b8gpmmkqs52p51aksx44ioguahea8v7ybawsdk0ksyaj066ulxxgnbtroacadsu8ey7k0riz57hh91pfum2',
                parameterName: 'kvc3cxeq8pi4t6xtlkds2b3bsvlbreh8dc0xuv7nieosihvtgcr7cgkisxd7z0n7tvtps0prjrjrhygcawyzsuwdchpu3h6pjqkvysapgigyat5i7ilm42i9g2zgmybf3q889oi7i2kcdnb2p0ypiy08w7qlt7rs1lxkeqcx8lnqoiyjrlf8ak27gx36kvr38zaknwo2a8hv66gx724ayo1868oggoyyu6zf6d437mi966z6itisp03bfoykp9lfjrnjdfcw8r6q130irh0z3g594z7phnop8d1x8j7df93a0orpd0yk9bdnsywk846d',
                parameterValue: 'shvyzvv9hgrhj3qfdaefnmc2u0u9gc0bgvraictwe47lf9ruovo7o5pytw97olyizeiamfqqc6a1dgpusp3f4czlote6kbk9ga3c5rg0jsqp7pqv8qa5zel1ipuvbyvcnyzrq7qh4c6lm01rucase6mk3z34n9j5jxpj35hiniq7n9yhqfld4vop0u87v2n0z3v1cjh6dt84hhdeb15fkx35e1soumfuuhpkhi1ybourtr5tt335qc8kbx67xz6fbaifbsv0ws9ov0jucgwykf8nyjdz1meolaevg7e0kwugyed7ojwxg9u7qn9pm2ppp00b920gawxzv5rhxxld917574jamltsb6katejfnkbkhp24g75rbkql7kwgf25ym02zhznxj9cbrqwzo4rergc4dr0ighyijo2u40qa4r62tsrfpbi11xtoklypwcyv78ty49r79yglq47wwzjvydj2vkxg2sw6j93aifejll96ck3g0jq2zlf6igo1d35sz7vkj7487dzeb4yksxfv97lwdwqofqu385bp5krayjvvt05b8aacmyc0ahgen3tquq6hw777rud5ugnuyso3z4vz9234p1t228juv0aq2wqjztcd174hn5l2egj4u0ubz7sfwaxk05ndfoxp59dfbm273rghfzuxy1f31gvoq0q02buypfpcercqodk7bfsw2ke6rumojwi3rv2gll2hzxfmz2bj8jl60hmeqlf9m3avn64n3u437ccod5npzoipea18l45s6ygy6rlaqrs3fgp7hcff58oapq9bpybfvtq6opkbpb3wwh6ivrd6cqh184han2or1uhtr6bzwuzvu901dwtipt49npn7l47te81rnm9swjzii1yz2tq3zghpi6p8dl8lrw45ic5zzeze4ibe168fyf9kbzsyzhp6wycz5248fp4wgsv71dga5gc4jgcetornp156i0b0sdkp58z0d34ayrwv34t2oilljttvp9za1szrxgll2pvcfv46duxgxvi3bzk5up305k2weoe5vd50i61ch9bo1lubshx4mt6di37g9fzinm8lj1woct2tw714p3kqovxzw20qg6l4jkyrshrk9yylfdtapxi7b3zer7wkmyseqtkoz4guz5gdnijlmi65luldp5fpvnz50jagxpytz6i3iqmm3afku4t470mp2t77ab8x9rrjbhuyd1ei5eobbxg156hsdf51o89k55530eu16zjzo744dggy1e1ir33gu8ns1i15humy19781wyk86ev7o7r991y396tho0cy73p12waxw2b6speunt3uqwheai65uzgyn9xuxlzgxwv3gax5lj82he38zfu3ik1vzvvqb6719snlahcctgtt9bv1n8u9488169j3tlo6jhh4r9005gsrmkvpinm15s9frpofjqamz01wsu0ru3dddttydxtptab985act5e90w90wwr0rxn2yl3dqsynzptkpb58lhaxf599h2nqnydh42934loa89g4zvsg6tcaccw53xbqkt6pey3kf776phl6xnsstbs7vwu6wuzu39igvnqw2lf3g0vsxlr4qtn3qwtxwym47f1ahbfxvnk0s1sy8o7mwrj7htd0weabg1ns67orllo2roekokg2qhaecmgw5lrm6mec3jsw8owcj9uelxh4dy7zjb5ql6j2vu40q9gpyafl0saw811gk8ja0c3k4ubh619hsxirkw3e5zzqvjf8wfnfho9bw6gxfffwjm00kr4def0z9o9b7qhupfb35hly6vgdhzw0m7bez4gchwvfiw4jjy0p1jbetp2kc8bf8yu1b3612vc7kier0vdaoc96r7rny255eb2lvrznta6r9no070m8ztylr6r25mvphzvzwo7njva7e4xc9xy91r4h5vesf9j740dlp0exvv4myzs75zxsj6h4x32c5rglewjf00ztgo6hmusgcdfo46xsgi93jgskwsqjdkc00syealrrfxd55e0ecs4zparzx49ip08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'vl79jxs8dz7iosqzonfsy2n6ecdwfblfmi0a5x2oc4o96yhnpu',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: '8ah1toiw5rc5m0a61xeb',
                channelHash: 'e6m62f2doq81zrz0idk5ne4xw16m13ebyz99dsic',
                channelParty: 'j1mjx3r4vgw6fxmsvswvlqec4k6co7fvwjhm04iq2brs9mx0duxni1opoci129lktn83sej2ihklyhbf7hwakbwvqyl3izqxibe3eby59o95mjg8m5bj7bpdjo1edb2qt01og9q65zpw0164udfdq0e02a63ln5b',
                channelComponent: 'vpxrr9crgm5gp4yn2pbem7ffth1253iv4b0hq09qtkuxgs6hhisvpe4c5sjydov5weg5wmdj0sg8fugbe2h8j3vj65gm7f1kcwtntenxppucfd9uersswr9tvw6h6j2nfx19unz13x723etedoxhp1f3se4lqtzr',
                channelName: '3pzgyneo04lxiw0untuyyvrgs057pu7oo7ibywsu6hl7aupurk2ebxxpjmwi2qbs7bp2v6emzq5qp3m0eixknfklis9c67j0pny1lvgs6gtqjjj9bd1njiswfht9druo1h9ifehvn30646qry5dqu1u62s0oq8oj',
                flowHash: 'hdz3wgg8fbg7c4j55z6n9ebceg9yrl5s6ae4fbdn',
                flowParty: 'nbcewwjwa4bi6se6py6aewuifva7pxizz1c07qbeayhcs4xbarolbrnuvlg9q0191trga6qf2wkjtdfazr8y5d7og4bp0p9elg3a32io7lr19ix4p6ihkfd03fky8g3ilq8ijqcq58k48ttu2sl2r3h01hj5ji9s',
                flowReceiverParty: 'u3jlncsew011pmckg8yud4n9kzvnifecpxjz35g6vozm4jxqpeh9f2v8857bqpmxeewh8bqckm3urta68dqwpoh7hh2saxk51rcbsu4sbi3gt2zdajdwmkdsjaey1lgxk1pw84p72mjvooy64m6j0x4f57bzgpqu',
                flowComponent: 'xtif7il25vm5rtbq4lg680a1fijzzl1td9k2lqq1c338xwzoofk5lzyj7l9qjqga6ynx1fkho8qxknkm928cgqyw3qs0ln19cufkasvqackqf0dm2rfyuh278nkq4mbfljinspqdnz0l1y7qk3t1c468vxzbep5y',
                flowReceiverComponent: 'sfcy78w1iu9umy9sld8o2pf53l2lexlthnfy8kt4v10xpu4net5lf59v8cmxpxvb90zxt291z7ftn5m3b2yvxo10xjbqahysi13z7jpir9e5ju83h1ql4n9m5uvfiqfxs7udmegn7b6xi3yogprp777kgypioseb',
                flowInterfaceName: '7xe9radxsebvjk2vw14o9gk63vvbw5q089d8la8qpg5rjptaxem8a3w0oq4y1dldm0ht2og0z33jb61bbtw2n8ln65jhb21ufq0ch9enngf17inoqt5r93ebrtw79yidp98myfun6j33t2oghmwjk2j0mnuylee1',
                flowInterfaceNamespace: 'begdd22vs21rkrz6o89v2z9hhe2976fep7nj7munzca7l9pr4alko3lkac37dfbgh5qgb1nomogsj770uhtye7an6iixn2cd3ndygyzyd3oeoirqz77wpqvgc66435cxa68b1vlv92pxq2itvg30elps306ft5g3',
                version: '35k4uzhnew8p7r9zn90q',
                parameterGroup: 'ntf1zzic2511j87tmqr0wekhuh53sgn7oof4jl00blo5rea2fdlr1z9hsx38g1ju155ebe75qvqtkl4xbhgoxc4i2q12xzflauyrfaai0zb19746pn2gv3b431561dps821c1xqh4xnn30qih5gn5wpu2itprax24xwupvx1gndvz6x717hthd9mqx5h37wfgxsve8isa5f06kmojyv9mpe16z83jt8yse8di3nuvrp7xsoupzffx45o5bejiif',
                name: 'kvp7yfsht2rx9tft9jrth8bbhje2u9ftxiy42yzxna1vxrx08p1j1j0yczo2di7lkxe6lrsn0mrggvfo7ish8dioe1beumma1v5mlks0xhnhea5qm9a0fra3nkwxhudtl0l9ei0zc1j8h3egnacoe6jpuc0oubbawoklsdedar0emw2g7uysk89h8019b4fetutcrnkflitfre7zd7crmf8elerq57tayqeg9y1m10i4z3kkqq5j6qmjazy4000f8ibp1mzqbohoclsmb6j5vc4wf420p306wjvo6einze7su1j5cqj387bz5010xzd5w',
                parameterName: 'lcd97pxqa5gf55h5tj8y5exbd95x9ut5p5ffmk4ulnd7gzybgdqmr2mm0slb6gkpgcx0b8zvwrjoxnbynlokqemhbw0unat846ej0etk308ne1jszpfjsgyu4nb3rsoj3aj2mep1cs04eyd32o9zmth1gtmk2hpggp85p1d1sswssv6adr1ta96ufnjeybez74xi0xyizowqoe1geovzpqjgoml6iz5vid6gy77ky2kixf5qw9fiom2ftdxvxw7tq7ihn4m2p7zz44qpp9ohg26ve1g8j3lw61k378igl78q0q6wf63w4inufb44bsbd',
                parameterValue: 'n1f5bnwwmhczdvrdu0cxwx50tzyj56w2gmmklzut5nqeg64skwtnm69z00f3k33zca2gbewdt9e8w414uoujz8x0jllm39tqulr2eli6wy5bgnj9e63ur4mqt2n1r448qh99alrr6v9ao53ey3c6n9pisgibri6u06t9dsmauk82kdnd2mbqub60hqm5ll4ne86v7a78tk4r8znlutdg61k8nqd6e8of0eg0gf73ih3shudvdrqdpwwhwloa40j621u5dd0p3ps3z2rz8ye51o2dnh78j5q1zhz1yyuro8l5dvi9dx04z2hdjd65aibixh1gt5j5pmekk45iao9qcf8orm9c218g7ym8tfbhb1ez03andggblcn2wnpb2n5wlqd6qpplyhiyetmcwa47kwfshkf530ziafxmucobtq52na96l05e19jkxai263hrxyg51nm5mc9aly4iwkwehfgmlbn4u0f3z5g3nish98aky7l81le54065dv03fb4ntp87ve1wn6wgc5xb50cfinf6e5vqzsploj43239o2ivp02ecoqgbizhacjsfs8j9fpmuikpmffyk57hau0qacr760eix7chxpd54ed6n3fgadw84p0wrsq9kathhn76qmzw94fsby014f47ua4uxav7ow5t84mtic0vb6ibkmf7zf04d99n6iixsat121kdhi2w4n81d8oq56qch3y33xmzct0fb9fx4ahih23cibtu2ft0yy560z198rtz29yosx6vjmh1re1rmciwy6u32pvi7u8hk10qwm0cffil9rkrlequt860zn2kbjdb1ird8knr63om2dnqfddfz09igz6o0ac6pwt2w55ycyc5hcnocz6nuci37jdb2h4nf9399ly6vzg0qhprsswrjwt1zj9mrjounkopsllfnirre87y672atx459jyrk9fg7z188kck5rnl2cnpp18t5kmshaklfceska7zbqmjp75yj9vhn7v1ikgl6khm4z1uzwylyjltkn5pr8fdsrbxayddn6hz7alt6enheekbffd0upumxdep3jv795odx6p49dvm2uah37ctwrxp4e0s7v17xaw3cbpg9omoqcgxw12nm1vak24dkqornb10p87aqr0f74g4nno27zld3zvts3ys68q0gx9uy0b1u70hs1vv3r9fr2ab066v6ppl9yao9gsgr6fkrqbxowfh6i47xjqttphj8r5w89zqkqor41zxcgjv57ys3qnko1atfki00brk2g15jr14m5lvby4sas43rlnhsyicb19dmlk3dirzfwoh62l5qk15r67mm45vvcvomy80u20pcfki38xm1hrvvgehqn61fwr7mqm57ry089o1ian7vou5od6edt6c7mqu1ppflsudh6g4pbqhr747yy7ukc5y0dze916eruonu6pvg18g4r7xlnvzdp4bb86t5ud9tvq29wlpiyr2z4s3xez2svczjh8mdhfvdbo3bfra6merdho5hdbvbmydzogna46yoo4i89lhjfhc4214hpf5fssb6hq3nbj49wf26glba8xkitovpghtmtqps1mt7ywqjm7sax7p4mqfhuvwwzk1t103sxwr6yuatidboy4e3ipv7zg7h6zy025znj5mspeazzxiqe0u5lsj71d8107qezqvs7kh9g0mkjd2aappqewpgbezov7zduk216mh1a53f3fcghn8xm7bpiip48xq7dko4dj549yheiq8py6h34pe65cgb1m1y7eeo08tw4fs9nwl9l67nys917ix33q64qzc1mm2teydlc2oowzhn021twyixdlr6kb147lo947nelmnwiswk67camnrvw8w9nbr552me2j7w81xgcd1eyko6fjpifws2stvnz4wwydeujdas9macao76ymzis8fu862vsjsnbs6bt3ii6ud1ab4dl7s8vzisiiq6facr7s578u0mrr6ebqc78tvds7gf9ih0fd7wb1ecx11ck166qnqq32qryuc1n79o8pii',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '10atfghjkl1gygia2cer45x79n0fwcu24xnrzazsphp8q8l8qs',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'wgeikc0f70a1egrg520h',
                channelHash: 'bw5ckrtelrg36fohlocjlb9z4vq0nep4xx5daaj9',
                channelParty: 'r7ryx6s8kw1hzimq3lwmxhg85c362y396mcegw4pvplkctl9v1dl4gq8clbw9urohktd06slou4eh702wy57jhr17oxd5h9gea10p7vaf3j7g9jvx7mfvgh1tgt395v1xhdocv7iapyqsi9erjf37apzea1iiwrj',
                channelComponent: '9n74k5yvot2wgv10m45ptsqcqbiqi911zziu8p9umja8zelzwi7ryr2a2kb9evuvxfytjhcm927pnu5272yrc3tcvp5qi8j6norrz2v4spl3vh91bde8bzvt3dppy589w59ktfq9m8mmwniajh2urrbyhr7mej25',
                channelName: '0lyba5lsbfyk0r2rh9pe9nujmrew6fp0t6kfs7vkrrg7yfko89km6tqu0m3tnqt3hb6uaxsegjj2vie748lk23zvnk5t5um1jmx8wgpup0vhxde64aom4v5qx7jlnrxr9iu70et2584wt9dok1ajuugbz1bjdplp',
                flowHash: 'bpz7p62hz35e2sw81r42cryh5pyyjlipb9i68p06',
                flowParty: 'tfotzp5fsko4ymowb7apqovh93dqldxbyzhyr19nidosujsh41jn2fetlvl97hqbk3xv3h8hsnclacpyyww06gifjk6j1j346ca9s6j6bojp3pxxxv4oat4ue0gqkjj5d8edy0mdbf1oww4xyq5dov9f536d63l0',
                flowReceiverParty: '38pr517zvpvnvth8j7l3cn6k1tovz3a0gzo275vwhpnuk0agchwszhdqvp0e7r8qjvgakweugfi0dn9wh9tzv60wvg836imzo0edtbom4286os7anl21ugsht3cgaun9ytyxust5utlhqtbbkrlpc1zfvln5rat7',
                flowComponent: 'o8m6p8dkrq5ufyucu2qi8gyrmb3vx68a3ok6l8gvh78qm7v6oy03sml89n7y4pofgg7xit3zm6q4s9grlp34503hxtr2f8ci9x3u11y0ajlwao83dwx8i6mk7rc8gnpc5oeqwyo63d5u4o70btgq9o0fkvfcln5p',
                flowReceiverComponent: 'p7hgjy9j0kywae5j5r6wqmo0k7t1mycb9qn7yv66vyudijpkgp452cyzputvkbp323zag4d09hr753v3w0di7z2ustsf0y3lczq65la26g7zffhq4cus0f45itccbhc5damz1lmj0ry9k74s6gz9ysru0nm6f5de',
                flowInterfaceName: 'act6liui1bdgnyei1c2db3cnhpmo6o3lshws43rxb9iyofu0nka8emce7j2x2u55iffriga0ocxa9n3ydruxn8fcz686hosm6vovrb7dhk72uuhphq8lieunr8q52g102mk7w4lwxzercr1fu4yla3j3gzqypxhr',
                flowInterfaceNamespace: 'nqnzqqv3vn1gcjccm3gpl1d8mxuuf8s4oj178w6fgn16gzs0sd2jq5e4ft2mv653si15m3yzcwupeum0iy1t7u1ii2umpkzeyuviw02cz97uoqouiswxevw6y8qyi6qi3iqd7g7e0wgu4uu6wpy50z5jf53y84yi',
                version: 'uph7p5p8s1bh52snx6m5',
                parameterGroup: '67690svxyocjpfcnl1mpkmgezxkakdivz8kre3uua4tcg03rn2sn5cn6my6ji51whom6uwwg6o0g2qwhzaqidcs0owscko32yn26v0k1j2abqyyfz6742bb1flwcctoeoo81wiryb1dp9pbxf9i0ggonkxg5njs4u7vpikc7xwwxx7emzfutt1kgxvpd0vywl5jenrv5j2amgr9sxc8mm70helmidgj76354tqjd8oga35hg0stg95w3puul6f6',
                name: 'abmfemp4qsp2eaglxvz41oam1grc4lxgp6kryg42wy1bvf1pip94a4x5z2g3etikpsoaxbsj4g7qsqk0py9r09tiv8tyi1t33p0eyzi8byl75udduun5h2lixpxomusz1uhfo1hjldusiux4d5zt8loiplricw08docbm2xwdnckpw886epa5356tm4gtkhlv58o6xh0dw6w8k1p4cfyxjfqkaf17wi1t6ig1w4xgvoyldybckrkv9ehxlqpkcxqlqur8v6eyvvu2jydink6o85vorkyr4lgdzezwzij156zuwv23dfivwfnf11i32g8',
                parameterName: 'l7aucmi42wdkocg0rlogqqo8p3itay5ha6ou461cexjhqjejawqy0uu2fis425qhn3u8a91mu6gqz1tdrcwh9z23sx847bhyvq4db0h0stf22fzsyufwklwkz0u10dpklg278onyqzglz3c9wbd479bwakkc6sd6o7hjjg9jes3l8gr636sjj4u5fh5cplcn4wthct8qpttej27wydn9tjd6g92g7ixwd733j4usw7phzz7iyl7awiv204cxg0ip3qs9m8x35oqs1v5ayzozwdv89l1j3re1krbmmg8y1vc4mxk55dwwuxfb76zto5f50',
                parameterValue: 'nrjnzv6fua7e7ggbs7drqe17np4s0sh1y2jaxsj417l10ho6cpiooi41q7305rq1w9p9mijwua3y888tgvbzmsk73mutcq56hx3jtzwt3n6p1fi7w7oxfoq0gvye0ibi7ui58j901k3z3qpjbpp1pn3bxzj9jz18gd00v6xv1ozsbdwdaj617hgjnb5d2am5u3j5xftnvhsmj5f62cbvmyjgi3rjm7nbf9q6b4hmxueyjupxf48f5f01b6d55colcn687m0xk8jpsanhqt3capqn66y5qz2geq40l8q8x9iuuajjtu0s9ox0rtwlqyhnkcm21tn59mbfq8w4sr7j7jz7y04anhf7bdeu6baofbh5k5wcsezsyk1l88os2q5o4rq42yhd32p3w6h1b0e8x1umrdwvoc90n4gfffwa09f61o5410hdgb688tlbtt4amx44iefwwfmowi5n34po7lzpf825xbesl5i8i5crkpdg2mzapzphl1nfhdgocpl04yf7pfozgxoxgothj7q6d538f734vx3pbb3q4z6jtvyre9qsy0yukpkcfke6bana9v7qr3kkci0xtagsuzqund1pm6kp5blcoyo3nelg65z17b2s74c4kfo5kb2pi9bkq31gsk1ge83t8xl7u954h6weee8rmq71zfhue9cqlv6dgarv42fvj66vuj4lep6r5up6ybddwrs4ew5ljumtkc9i71nroy6lkimzcjpsy9cd7bqtwfen37q5qoymefw4eqzhy6jj9lehebol4hmvphty1qxyb04oycy8st54wjn5i8qmsev4mmzb0gp0v7lheo1uzd8pw7o46n332ifuqn6trzy6ayi81saf3i956o2zw4f6lp4l8e7otef99xoxdq18x99yjlb2zhq5dz4g4xn962xmlht3lvyp053mf1gctuc4bbej3aes786x9q1kr2wu277z20tz31ij656fhac1zrjd9lanm3iiizijrc9gwbs34ucaza9mjaguf2dm3wwjcegze8xdos6it9jsy96a2gx5tns5pez50h27bcdpr7zvoz4z4zpei9j6qqp31kalsnjbig8eprk3ouo5pyr7ca62hsw92ujh9n3iae5kl4ct3bhb9gszm4p3rjmsjev22twmol8q51thznj4avkqho65ouaephy6ohlrftk38nop2jhx793egt0fq9198s2bd3rtmee4hnyhjmmmzxfvphxsk5laxltiqzz7dmf3f1nyarw037r3x9tgl2fem72ffpv8b9ecf44t57t1690z8wadgdbx63s48mlopdd15vwbv087y0luewwjy5df7psv4yk8kavldiao0l14g0b8nousgnrx7b1d3gm6se5fcct87977uh390j7z83tczhx8henpid8fv28a9d6ldz2aok9evxytxug20aua59pkw8krba3mftev5jvqin7xjpbf5hjbxsmz44felet08jg83jlrkly16o2t1g15d7dfw0pckwayiwykfx7bi5a2mthi7wfh4mrpr3n94d4jv7eoaw6lh7z93icyoezn4livwsh7yspsmzx7fdhhynu4so2lo78t7seavmmuw8xf2juqlj3gs9dnwa6gpq3bmp71eyk3aikcr9qq71fqccptb6irf6oejln4k02ttxakduv870bep6onf8sw76lxezz2c992f9uxzxgc2ggpn078nem1q97qz6mp4twhtvpylqctxeuop4pp6o13xk2dm08fhjjlmc9tsv23cm70saxw695tzmjhep7w8d1q6kv5lyhu71e30jc13usy6lnn289r7xkkdqzqz0xv5qmpsd9vqj1bwog83papah5qkkcgqdivojpi2gixfmz50vwo0meo2uxnza3srwxye2anb5c9qnwkd8jrlg9oqfxyng9mockm9k92sq23a26uo6r2heilr05om7vf2a1gkxbjt75pl6kapz9a8on395m6yunahz0o5z1hmbhe60458axly4kmo3mnygxtql6b4yoqmmw5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'vjg04ak744m5zcfg3zqivcjl6ulvx115s6g2rsq2l782diznpt',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'anack1ky83rbn5ejfr6i',
                channelHash: '5a2vcbouf5sfuzzcx4i8kwxd3y8ura5s2g0d0jjb',
                channelParty: 'v9s99ltdqh7aoj8w5ggk6f276pruud5fzmu20ll2bg7ado8r99s4lwnxotlquev8tmw5ep8etuo77pciyu2w00e4pguek34xqicpuadx8t8t2xu0iarlocb2d7dk37yibn2rgnypx5jorn6km8zlf7dsffb06jko',
                channelComponent: 'dkzdemvcnpkqj2ty3my3wn9a4nllhd39wjyi0791hlihd1vweu68q4k5m241j8qqdc94v7y60e0x8auau359i2eygbb9upabpcnh0vybdmmi8mu5s07cl6exztjyooj85ap05o9dggsvpsnyywxqq2zexdluvs4i',
                channelName: 'g09ykjbak6hgxcxvzhq163nocefdcauwq93uo6fmwlcxa7ks3szyl49dmfd8ejr6nv04vwlohtcpiecdc6fcrxydp1kiiaw0zfp9ytq0i4dl76u3dnl74i36oui34yzs7v63syb8d0oq4132gtl3tuth2jie03v5',
                flowHash: 't588sdo0c9ammwfsrgiz37dmcdqe3c0a8e1ivg58',
                flowParty: 'g0bjj4z19vbqacuh3fnd0g7sr9o6hafmytm30qisngql6a2aywfyirt4j7a3m57theb0dz07507ceux5s9nrorwex1ezj63wok9acgu2yikkuivzq2gjbo7bq45u7dv6p85r7wimo9mpe5nkothf4ot7q6owpkd4',
                flowReceiverParty: '0mhp3uxu5eicxv6696dw1qw5cu9ix6o4xpndomcbly995i2kbziygch3fnygu0stgkl3ebcocfmbyjwxwlby2zt5k1hakrvt6zyt6et45nm4nu2cbcz0iv1ru7ls2t24huafgwvq44iaf28i9kxwabt3i1z75rji',
                flowComponent: 'tnayrkkngtv74sc5c8f84g1ddt7jqx2p3brnebk5go3d29n9z9jdkomm4pvgnrjhzog0q7ebbt07i7nikmm2gad5q73x1pnsejzklvu9mk43vk3j0eomcq99pahmbthfhlnmb1d2jmkgc9pu7coku4cyrzokxn2l',
                flowReceiverComponent: '0bqm6oul1uuou91a0qj98wt0np2j8yq4m2sozglzfh30m1kqqyjxcw49brluaqk6zfz5upio6zv1517cwoi3zfewesb9f8txk5gm038jnp59mglq8p5a04aewtsn5hhl7i02c1q9p2xmm9pqch4tvy69s7a3rc11',
                flowInterfaceName: '5np0m6ukbdmat5lgzrefhqy1ljrajew1w3rd5ggdfqgv1hgjjobjm1xb2smcilhfv1cpzos4aqdrnzwkj1vutucexqa5dzanty59vz0lysfftothr55kd57ip09llrjmn8w4gsmngldz0mmqf4b37gsor6igs7fl',
                flowInterfaceNamespace: 'sbioczcp0uws67s7o5re12ro16h0t9b50zve2hz006q0ku89aklvtfmku9pdesn41f688yr61rcm0j6vrr9btq7zd5mo2p13a7abxuy87vtsny9wlzlyzv86mjh4j481b6k5mq52f7hlptuaa9quaf114r3881cd',
                version: '26v65d2u4zayynm1u0zf',
                parameterGroup: 'l4vxiqggdp3izgszew5qx185ltohy1f5kfvi8qgefh39jj6hf10x2n5z4ihqx8b02qj7flnk2l3o2jm8yf6q9xb20x0em57ixef4qidkl5s5qpxnpuqlu393r8b0c2ulyhm2wwf4jn8cetx9zi20ecf0exxj29m21lkzsept758ggzbiavde7zyjiuhjqdlsfb8xnycdx1tu6t848a1fc2gyzyeha291og1jn2sbk7i6mjl7qvots55dy0p5uyd',
                name: '1t0flg55gp2ci2gdq4dfe3laqayj8o7i7bffjhzb5leju82zqevy03hf9zdaj025tqtqqymadps3rw4zjrj6chwhqfjs8mpzupnhvghy1gn3usbb9gv9c9kqx6lxzoelm58efr6un97vftsmmgm2kv0slsjou22i6dsy3n2j18yzcf96uo6w17t0l3263t8ez3q8oara6n2sa7h35epfbg3ddw608nipup3eujf1v1hop3frjyz69cuxq1b67nvyx6xy2l94m5ov1qob40odsb0igrm8bx2csklv3xs7bgyri2djb8bmg23ynh6v32ph',
                parameterName: 'i3bdhddkeqg3dafkt8jivsxo59wn06f0q2guww85plqr1rt4snmh9aov8l6lzovql4p30qlqsetphcogndu8nxrasqm6t85tjfzevlitfxa7gztotfllxzjjm4bdd1fi5n978736h9g1uw58j6fsf7paht4u58so3hxk6u2y2n28d7i8ywb4kr25gmaie3g2f2iv0nhho8nvq7z93vx8kgggsj4qw38nyukrffin672mo5oro989teivtq5lg2aiot493q0ncyxu2fs3g6f6svuuk7r6c9waf27giet0aif9a9duxrvitlhlfkpoxpcq',
                parameterValue: '0i4pleuhshrow819mngn81e3yj55hk41aag16n3kh6fual1xrkc9k1x9ydwccm9jhfjzesdyuh2i8mjiaf79gq5kdxyrs2v7bta1upqaj4e0rljmsz9t5ewdtnvewhktrjpogwczjpu56m7y01c96lot1wgf0u6m9geu6dnfpnyk7kg1uu6g1gvuxw29jpdi00ac9fkzh2049ac4z4f7fq2grmha9rh7zgflba2nqt79c0lfwnlm3jy9ngk9r0l2028ow9re47edthgr7u54jbmtdnc8iqo6r3x2az79kiklcica2b3e00wr79w3s2ejt4i9ocq8huqmmozwvcswd9t487cyyiqvmkf79hcnx6q5h8orq5fky26pnfujdwll1flhjcjrb8v3e7o6m3ql6j63udy65r3nd6wbx15z5ux0jauq3uf8d7d958k0edmf0900kcpsandlyd3u65un3brb922rd8xhx6uru5iyeun55hxiarbhuhx1nebaa8c2t1tsxkhp3f7xhjmnrrd87lamg1vuaq25hgkjzmur8ytpgmq5i5nxfwxmh45u6fpxmxvh2bavjd6opl6uo2mqrpjbamrvavn50yphlkzkzr24tidwk1z4854l6vh5awll2sqwbmzjdx5gf6fmurjesch0wk3e8bh7g1avbiqi4j7k2t8szym00u29enfosvl47yrxpy458ci0an25lbs9u0aqk12v870ctk8dng0qy5xpi4iu2n39u1fxls71rmlx8ej4v1l0ushbn9jbsvzdws8m4hm16tp31lv356ytn3yicpmrwkpeanqbxopzfuaan4ly9qo8diy6mur6uepfy5ij68gs2bzs8wwpiguzz630clhj7azmic5mw9nulb38svpcvhke0z3bidagqnkndpfrwd7der37c8iu3ipjrg2osvarz1o0dgckqmusvdtfalmjxf6qhcxjexyembibwya5h6mhdve026w8v6wcft0he5mlp4lq2l107dh0q80lxswj1gre37x403jb98tawr3zj6lj8zl31f1sp7l4mj36ii1pzu3q4xqjjgcnga2n3h51c6obpht8sadm1rn3qd7l8ysg2kyuozoi0mgmpftbyrvs8le2jqs5fsqd7h52214p8cbfa22hbo4co5vtcp65og2cu06s7qk53u1wrq5b9b2kak7y1vhd8bp0wmmrm1rfalflu9gigydm6ahclk5a99oh6xph6hwx69rizm0oesvilss2zhca6pzno63r0q6lwshlmd3at0lxvk4grzfzmno2d40e5vkfgifbcgvdcev3cb6sqaxslrxs19t3mwo16e672dnjoem15owsqn2okli27tchqzl5vvv2ausjqxqgcu63qeqs7rqky9asaocu8f2umqxemuw6zcvnujjxjc29yml69wevb35de8r8g2mxg73yaqj1h3ej6oce61lf4vvfovywn4r7st8cec7bgfmfbnkhv2h5opksy04wmlf9ne8icsjofmm6sxlizmixvh5yqz3xmkl3ey5fedcqlk3r2cxrlhlco47fzcszhrz9ntx32wl1seowlmm24zt5eov73dp51gbpuvwy72anesi0pivakxg84if6fafktyqylyglsfu8xpmhngffgqwmc797pk06kwwckv4xa7pp4ep0nhbqudhn0v74gyxl86j7wn4b9udprsj1k3cxe3ro9xa0mvytr76vbfys67h37gbput87n2dx5ous0j27z97qbdgybjf6fstfg6xju37gn3zt6ezvonl3tvdpgae340w0sw6wnd8e5odktezjfeex0aozrpyvftxi87d9c9ujaek5vgrp360ua29af39qkff23t88n8amuf6xifmtquq0w5vq1zwujvgvexhjn8qvbr2glr3h0tvx0x8bxj0qgb7ntlxflubp2frym1758a0d50xzyce2qrlzyp5bz3f99t4kjxx3q5hpfwgrpi8hrd9t0budpuaqazulh516ngeszsl2to9ccbclhvifs',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 2048');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST cci/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: '9r0sixcs8sl1yc2mks9w8z3mq5v852hea5pdyf8y48u9mtpcui',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'rv1rj0q2xx6xhopfk03q',
                channelHash: 'iksqxwfqjfpvwds7xdcegke56pjqmpxaaipc3yqb',
                channelParty: '7if0nrn3h1iclsvfsbd680pr6eh7beholdvaluj5b9usd6mj56wz6fwwvny16u7yerse6798bzwuq2xnxpvmudr3v70dbf7avyzhsk13hrhpbca2xcaeczntbi0y8z0bql0n0ewp66m5ilmb6htzmhxu9du3dbkw',
                channelComponent: 'j47vruy7pa6tu07a8wzou4pmvfa81b6p3eyncb3ddd77j49va6ds66p9cs0c6ntihso9uh873umpe3f9rdp5o7o1g13devgwsaa85mainxsju5x541wbd6taht81r7o56c9epw8jd3bmgd217g9n9ye5l618egrt',
                channelName: '9gvgiah94havtovn6b2vacp3wqdjqvw2h2igicodg3y558m6m26mfwd1zh8nr6sbs3ac64zk6tfs073wqy02d6nxraqj3czm88a5pzewxzz32iuj3l1v39ypso35r18i8xm9oykgoqz9ciwrlvht4dh6qpfy8a88',
                flowHash: 'lhq9nn9knwi74gqqqcw47dct8ezdx3llmja38i26',
                flowParty: 'kggkprtqlukatnx1p3puxg76vghtaik505upelg3hpj29jeleqnpsrfzhgmqqxs1k6fsgpkj4x8f0egooqp1j81n3t59sncc54znoh21by3x0blp6i1v862tzx1eug2f9n04k2afq7iiuueeh55ku2ayxpe0g79y',
                flowReceiverParty: 'xoqqqxeejhfuijv18wczb7qyqh1psi1rd2rvi6wualfis1xfx4gjedjgnx3xpvbaed4jsmby76zqgbofaei2z8jlk56fnrfucjznwyx0lbeld5ehxiyrpnz11s8n9g3etxmjg9h6r8ojyb8jfg2068lnlmrcihnb',
                flowComponent: 'dn7bwzhn2byponyvpbmgwpmtwv27i2rfjsw3ls1bej3y2xfkk9is2dd1l91pxkxoqw11ksspprymrq95amrkt80ros85spg77e8kpq1mpno3pgrnq4ypardyykapou8g5sdfm1g4ss1eob9oxafxbnuo0v5gsfkc',
                flowReceiverComponent: 'kwbki09lw0lpz3nbndt4hzanmw514yhgt92rvi47c64vgsrlubull8xatsjlwfjq409mqcww5uikwfp0hfsfvsay6hfvsxblyibvhb4y1cjot27x3ky9fzyk2ts0rsqt99j4gvx739mytiyymooa6x5nhklg2ec3',
                flowInterfaceName: 'vrf7g56wb5888dvaf3g82vvkfrqnalg0plntdnf3r0wojnxb4de3oppxn2ov0dlr2pw2amwkvjlyh35jzvyafn0lffv0nyhco2m743g5th9tzfwwm7lodawn0fotd48dj40yxn3eis01ptrkadw8aw5ga3xg017e',
                flowInterfaceNamespace: 'puh7qpqdgp3rcfl5x0apq6dd8fwh0krc6c0bub1u4y11hhem7ohzyuno1qwmz9v1nt7t8f2bd3bfn990rdmqqfllidwy69f12vkngc62edw4be771j8mc8vj284q4dw9muc7v52dyrdzvdjxfg60eojm9xtz9c4b',
                version: 'wkjmgu2vnfsjklf0ev1f',
                parameterGroup: '6mo4b89shkpu289dk3z1pxpikkotjxtc7nxybcbkr7rx98bhagu8hv1vcxbl1b4qclbcbg8ggbxcux6do189glk4gh1te33f78gqgsnt57z0ae5q6ewvi4y0b68tae2qeij04um663l2s6qjkrcjgx0ubaao2sf6olfi5hxcmq2mjzv6rdji6h0s71k1oe7wo2kap5sk96b2vfknbglbqbc7qzisdk4t1qoty01vipu89tf6p12z7fpzuusjfoc',
                name: 'ffxre89a1h93r2shqnfmvsv6vag4a6h3n3pqmjyolo75s4wvaxogty47p410rs6qxu1l36z9uit22y5nod5jqdvwpwbbc7qlq3aocnifrhgtaffxsfcew8hh6pfju9bv8k068nhsa4cui6aw7a4zhlt5x3nehlyopxyecfd7mk7rsuesdjmc7vt59eg420f5lnqr03t7yge72metebwancu8vtfaarx3o08aa7lj8igckwlod2rie3fwgfqg6ux4rauqevwpswcawxdakhpc0bjd8yujaf84czp1el4hnqh978sdvg6r789kl31evttr',
                parameterName: 'c8zqglz82w9vael4f3rml8izhzenwye8tr2eh4xu4km3gb75f96kmjifnww3xlzd22gx741bigv2luf3u64a6m6g50bmxgmrqdtmcoch2hbd510tiu84pfnqjlpqv909eprmgh7fzct25ygt8k7qjps0o0nit4a005djafbg01n3e9q0b3wv8jall2ggsdgqgp78xg1257ic14edqet8teuyls133oz8ioyhvbgnc642liwvwi4e5c4m0glr8vkysg4emqbcsav34samvbs25ea16pj4wqeqb9g0m0vvg8iabqzgae08gsbmfxte3ihj',
                parameterValue: 'i6g87ejzrrgui8uxn1oufmvunom5rpblk0m5opb6ii0jphukdhuazy0m388j84j80p5vufxc2i65sc3a4z5aiuo1ckbmxe2pmaz4a8cp41ceaid60vaevf6g62dnwvik2534982sp80sj3z05oclz0f84zaay6g2yutt22qn17jcxk34yyhferp9g6j2kzc8flhxri2ie4k139o5utpd6q906hixn6awcs02wxcjyc87s5ahyqxmu9f3e4d1xt83y4fm6rxfuwelfzvxa1lgt9kw4qw5b45hbksmvq6w8p1rkr79904dy3abfnfd4l3qol5xwj96s0m96ueajey410sag6ajyl8w8fkhkjz5kt6at3fn3pafjb5lc9k4usbbk0hjwy5ykvutld9dj4vm18v20p1nwwqhvznyq39yiiw9z479ca4if5i03e58jqdr2da7ubmx6tzyeasoz95opxdo3sc3zuepxlsah2jogc1s2u9kvkgek79isviutu1abcwdp6g7k5cfnh4kkug20ezo6ueiohlmwdduqxvau77ahx4x9xgygs5vkqlfdnttfhqbb21byhspf4e90088qvsoi1dmgy9xjox1v5y3us306p4805w5yhf5a0z6nz08ijmeed3y8vtfmgpj62tgngt6kx9h92jb7nwwnuy4g8ra5h1db2c6wwq9sy4kqbm4q50xq7yhzk61cvkqxssl1erb3mzmyk60ny6685eu1lm29ph1tkppb8jtrvy1s7fitrs53597xliq5rov5vnd1li9gf23bownj5az2a41gbdw2dkz8y1f091z5aio2eb5pblf0rxbb4a2emdza5r8m53enf4v48l23tnfcis4oecdjbh0g76kv6xyn7y7gov80ydfwdjqmk0crpzm58mow7mw3s9c9aghhl56vh7tepn8m69cbidn9pxktq0os3isydsl3mz6itx541srh4zy0nem77iu6vi1oleh18cd7fzd4rime1vi69npoaef167pet5g16mtmbtrnwt323okj9n6atw8qhg3o90vnaapuyewwlwlt1j9ryvecuj3s4sqsym27omu99hen5m69b1fuvrtkci9kv28q5yah4kare1njlghugdrgac16xj8c5h2qcuzs969o6q94v3kakkuzb6o9o1ss8imko7ra4z9w2g9iwemy4kmf3d6ktn7amthv5rc5s7j2wamm1fc22qrc6vtfkxtolp7ar3vzsuiv76rf9cpyu7bcuqi0fdcf5emfxqubqa3dk28xm96oiipzfyb38rclwemgxjoslpi8usnpjscbjr1t13569s6qqeyxyph2s2ye37hchnqrp5if2u7xrs5rqc9uyfgs4dgf8evzs0jn0ow6iakp5f7a7b8nyu2xe27j94a3xj4r9gacoes2rmdjhfh1kdfqn96ncttb9mk45tpx2n5pcne5uj0vmiw8mpky3dka7q37umt7h4szfalthj7pkz991h3x4qdhji9s1ly3zbdrsuqhx2kcfanujge5kbcq2c1bsfb05qoovxdkj1x68fc7tjt2v741xmcm9ah711t9j2ciz87vb6c08eajjb6kn7s7ovejahy30df8o27fz9im92620pmad0fiefdtk9ca4c5ez62ldy0xt7h6prp8ttgdbqcyolj9evniffb4c8xju0e2ylm4nclgwooljzxdphpr9iay9zfyd2agvo4dy7oexkkd27e5wwnivaalsspa6z6lvu3a33ij807kwcfbi6f98ok38hsn5do6gzy8uijiql33053z1pawsbmyz96r4bw24nre2jwdvef84iditvu007kypknlo0bubliabft3fd2eh1jmhjscg9ou6tdadc8dr2q4aho64c2qj60p8t92px8qh2geq88ehig0x8ysnorvvi20ac20bgy9jsco4kpeof8vxtfthkub9rum2kb1kdv7ho2bxieefpq1fwycyvjnqn73l5ez0iu37y06y6r0d3xi8vo7eb6yhhz6sjikclx',
            })
            .expect(201);
    });

    test(`/REST:GET cci/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/modules/paginate')
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

    test(`/REST:GET cci/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '522440dd-3ecb-4fa9-b7f0-ccae825c58a4'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '58f92f1f-7b7d-4e83-8dab-f19628212a20'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '58f92f1f-7b7d-4e83-8dab-f19628212a20'));
    });

    test(`/REST:GET cci/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module/e5b4fce2-375d-4e93-96ff-b1d906d0df2e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module/58f92f1f-7b7d-4e83-8dab-f19628212a20')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '58f92f1f-7b7d-4e83-8dab-f19628212a20'));
    });

    test(`/REST:GET cci/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '27213a1d-90ab-47f6-af55-310b21e41bb2',
                tenantId: 'ad532cc5-2142-45a8-969e-b0139ff1a20b',
                tenantCode: 'x5am0cqufp2wmf66tsz92p0obfdpabd9h1bi7pofszxojv2ayn',
                systemId: 'ab23aaf9-3033-4242-be83-62cc76eb5f56',
                systemName: 'ghp1rtq3rj174xy0drzk',
                channelHash: 'h9900b56fq85ku263q3qtun4pw0pgygvpj34rrnh',
                channelParty: '7tglp2j5dm729hslwv3h87qpfnldbh4wqnlyaezynpvnrk0ngfmg9e0h96q73sfqu1kd8zu521vv0uhg62r52c76fnm0a9n847jbmnyqzvkymotjc60uvtvme5itdpyui02jnwkbhtkc0totgloi6m9okwxe4rz1',
                channelComponent: '8lryrxcm3xtsec5cg3wqw8kwqmc4bwxj1lumc9iw94uwln3rn7a7k1ea35bks6kv6a35qj5ahxmaqpsd9sbvrf51zg8303szx09bpsxj3621mgpzmnuspwakmhjs53ku0x4egk7c37inu0jy57cw7psm41o3nwkw',
                channelName: '8gmz6l2659f1xx26cgljzgwiqctn96gk0biavsuhacgdlar1hh83b1j2qxpetlt0ttkbea8fd6cyavauxxxcdcjh8lnmp29ek03anvg9o2lg2iduvr8mb4mu4ovwuy2rkxfsl4tntv4owagjeisgp8vwtcf8tajo',
                flowHash: 'lpuykzdgxtkywt0mq3vklkdzqeovxxfq2vhv4whw',
                flowParty: '4o8ox4eq78husiufpzn80ioazkppk22kxb6i87hnkl7can5s1pr5plfp95euvvzivi92h8uxu7js9olt6a3cw8dpv1rzcb4a4161rbzi02lufe4jeho2q97xrsd8s0ae88kf9nhx818fi1an0e3l564efbl9ug49',
                flowReceiverParty: 'yno9i8p3auqkxgsghjjz2x0i144ourjvvcbv6lnbhsfhy3renrfog16b857uf1dlx4zxuafxnv6f0rb3qafaeokpkmhekickhz07zc8hkjxyz2i1ljcsnt1rgrqmvrimuqo8ccd90b4fjmo8c76pj01prunsv6jf',
                flowComponent: '2knrkq0dj2b6ogt4qvd6w5mirlcmvo0pw9q9v63cs6fzp3ulprvx37ddaszsve90rqq42xl7j9m1dhy8y0t41z1gx2g98n8sqksiztf2cr5mhykfnyrspqtds2je652rbv4hklkv36av2ord2zotf1ooq21pew69',
                flowReceiverComponent: 'm6grhb026iheedvakd059ff83zyhxsutndujuf1na22vovciikdv3n3t5fyvhln69f5oh91dkr5284vxxiba3wojosx4no3fq7hxtytx805unbmatj1pmno9oj6owwtjk9yg2rivteye2bbteghdivmpxqve3nfd',
                flowInterfaceName: 'gllqldwuq06wnyuielbjwm4mhcricxs022z8lv7h26o3bwamduot8u1hclafaggoh9ycqdxf8w2h69t4z1kt6q7g663e0gihrozx37hptxmiq45ftow4637b4x94h5abbsf82cppbm2hz4h3nfojj5afju8zh73h',
                flowInterfaceNamespace: '8vx9eyly71ss9oz31wd8vhszikbuwp31ttni8yp1rfi3m4kdckasubvel1qtss6l7z4i6t12byzzs5ghsy73h65l4vqeo2tentv92t0knuthbff8igy3xjg73j6cvupvdu1zybkjo43rzvfp6zel3b0l7xhoe906',
                version: 'kmzcrmgfu53yubgtqzdb',
                parameterGroup: 'nm3y5ridul7dh4sabn701zxhov4w3kp3mwh8pjnpwv3gxkw6ct133cxzuawaqlud9393is4muhwlfu86rs27wx5hymycpjhxtyalsg257ajt1m1ld2eeeef7pe2gh9qabpizsjc467ygg1m8ut0jd8uf1i5zwiqdbdw9zsjb2plir7323dov8ksjw54h27xzcr08i4z602uh46v03ckjuzl4wegqorf1rm9y15p135dvzi9aifkvqbh450b3z3i',
                name: 'r1gtadnkerq7oybdv6oldgqx2qb4cy3e7xkoi4v1boy81wj5d0a4h6q3fjyle2juque23yx6flgbzxmdm4ojnvdofs5wef4o9ijb6fkbpac22zdymh7cg50ksqqu8ri7k8l9kiyou9n2ibcuencmxh8itxc0tb6b2nquj83dz6si4hqpteqqcg8pu3koyvpi442szexn09z1zkgzwmo0p8z0d2286pgaq53wudvacz8dz3i8f8oqityq3k0fcajqd7hxsjhmtony0pbpr1zzn5mqujcmrevp0u14nmocok9go7620mevy17yayeh7zua',
                parameterName: 'wvyg3kmqafcrre2tv3j83ntocygeyl2tlgm6txlltxrx62yav1pn378nzjt9l9gln5bixym2b6nm4wdx72nh48fkbt369s5pswycbfjz86jkiwhf2q8g7zk2qvsb52zgd6eobri7svncxh9q06mzknkn9tyowhl76bgbpow8dae1s10q06px9ewxtnnwiiqgsu64nupruu8vwjgbu4p2krfh5hh06dgx1x2v0bx9st211ohhrql944lajbvwphbxwsbsx25wxwkivzwcjkioaw8hksl0dx8o2zatxms9g8rfbbmo850pegvdiafivmu4',
                parameterValue: 'zcjx705ddjhhwzz5rc9dvxujbrj5fp7tdg8l86egll72teqjpcrsb44j3n1c2kvrm9z9idgsr32x25hw3r9obtto1sm3rzr69q7c4extgv6tn6tqymkhbig65e5axbs0rlesw4xlmroii26ua6apm5p6coo0logk3v91uob4cfdci7iwwqytgagvn5xtfsxmf4la0lrjl0793kk77h1eyasvagm87t9rzdk3mwoskl8nq5vgvus4fixrbli3lhd6isgoj0ab2jyvx7cuzlk59uugheo44so9blq4uuqn0vb4xp5f5hb1wouwck1muxun4hrra353zttqx6bpn0w7p7vcwutfvusnozypdh41ws1xsrif5x8vhe2pjwb4l03d0xlrg3b88w33n8x0ghlr5dxfrk22gdqr38h3n93x5itgelqln4t2vbm2nycfvgcin6x66h68exhs0i943nv0tmx00qsajlunc3zi3tfvaf3ps0fhof8jo2cemp458lcdwpq7lxgukjchmmqbmp4damloa345xi8ynxslrd43h903g9z1tl7ea3f944a7hkyzl9ff8si1intaooyhgdbxrpo7gsd4vgmnutjkngdpdb7jkatdk1qmtps5whhnux0ui3bgrdo3aaxrcjvczdbb3y2p6bawx6ysmok5lvwoukf0tdfm6eo3c9l2uhctkl8cd7kb9ampakx7h4ogzgb4uyl5nvwtieus65q45s73xyb9qc6ox4dnv3ourfns99oholxuw10hfg1xu2zcgqckjpptart280whhpql8ann7c69op9np7sb5p516rn1ofu8naftxmxd653pmhvqacrgn6nuy2ou463r9jy8g08omr77bfnw9a39ahzu73n30noh17cmt42nv0iby51bjiovfv86ckodzdg4ivv8qr24kfq41fla5rxlnhlvvd0domxmi4an004ozmlnhuwhdqywo9xg0z6rlfo6z4xddk8h7ui1ogs3w55nc9e4rty50z56cn6g4obfef9hvcbcu203s5w3pe904pg580q5cbl9zdxg6w02tbxx9panl87z0yyevt2lr7phw4pbkfhui6wacms5laemri0adr11orruj6d8w10zbbhmewabm080uv6q0vrf3zp3i5exatj6u1ajih61lqv9zjs8p9atf01ny4mintlx9na5eque369sz10jszhg6v7si67h76ahmt21rf5kmmzqbfqzefshpiwtxbyygkoc5ggvvhjlo6zqrv3tjddmzy3knp5xfpq36lfqsl6tymhp599d6bpc0t120ym9hjzkxzdshxfiqnhcny538vgvrzx64rjm2vlzknxbmrwgzpngewttufm9vse1sy4zrjeet1ccxyy09yi70n2wiypa4sowddhyxiledtvori7y6waodrga7xirvkcc1nyz6p984zym04k6qr23d0vruzjxsk5hxy5xc9euvycx1frv25r6wh3x5hl9wommq5dnb8s5vgclvxs4t4emefksctr8pacmhmultkohtgqkw8wt69tbtl871onobdd4bojeru71f12d9rv8qvf77arkg2aiuhwz7vk4fbxua6a1mnoibu17glmtoh7o6lnd43dz8mp16p3bugkioie73uv479nhtyrdbhmawkfb05js5p3im644jsha5gmhucm7s6xytto02mppafgzwijaum6yzt62k76w9us08ax3x3dgd4zmkzoo6kvm42las7jroaxwom8gp0qeiz6hctzbr83sc6dzbhubd6i68erxau5ebza77n56kpmo7rrj600zp4fdgwl5g6c5l0kypm37v3xtbtkfzp71uy8li68v0r8kell41u62ajhubfsx46n8d12w5pvtavogx2u9pp3oa034h1h9qkrtteyeeb4n935b5p129s1cqqdf88cmnzn3hp88deisl9emnfwzv4n08yddwoo4u695ac5gflbqu01o011bzi7apvwavfuhu5sdxpmvoqvd6fqew1a6ohwr3e8y',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                tenantCode: 'jhos8e6omeb2jc44raqg3el5qnkbpupeex9ipg8p400y4zojba',
                systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                systemName: 'emd256owbpwldw3bx8ar',
                channelHash: 'fh1x4nd2x0quh3izsjzgzh6lb6508vgzqyamhfe1',
                channelParty: 'rj7mmictn6fiqswmzdepb4u490i0ffsmio6pwzrre7wn7jh6v5dwe4myuib6tiknbcbn87b2dy8f9h4cgy5coyadgkuu1nokownpwuy6al0v4wwfdui64lex6nntkvxa726kjd94f8qljpobanh3rftxjf7o3c0n',
                channelComponent: 'vfbmpp9s7grvrh67wkhces9rhefbzij8j5wtpdrj4osljcyyx9am2b7pe5xe5l7mwrdez32gjh6ik29krkeejezn3p1fpcq7gay38hhcret0yo2tl63xs51mib4kpezoyc7ovtvft2sdlgulg35rhjz113yna8lw',
                channelName: '2qq4w86z6b90xjzaf96jaonktf6qqwd0lru2iqmyr9qu00oiulvdqq68yjh2hut0wv45qm7m27z4e4nqzirjf12mzbnn85bq2x05oe8biq4g7r0te702hn9gsbt7umzlzgfnvbbvj03pej5huoi1eyy73dywi3o5',
                flowHash: 'lj4dcemf4rsx3jqjz8y4yr050f2dfshvcm0se7qe',
                flowParty: 'zs502cnhogc5nv2mc3bmblz732nxsl70rw85v6xv1nb1m38d5jg5e2yb9l52mo8egc67biibp3s2p2yevqppub4jsdjq2pai5sq06pro64wokq2cvdubgze756bzk50811k6z84ziq3w0zis7xuxfd3u0cmam94m',
                flowReceiverParty: '52u7afrmo267w8n22dk6hs8l5zg7cjco3edi4kg197t43c0bgkjulpy7p6pq6l1qasxyrdrru2dc7l6op509lm2gsx8i0n3qjqpb1epzwleizn5beb9v54o1hwuusctl9he58nazxx8i2mnfm0o4p22a0l4i66j1',
                flowComponent: 'd6tntjoeaij67wzkpzumszxvus9df55jj7eyj0oz9rcqp1bvacqguxox3qjbchmt8hovixlvxz6ts11s3vr1icznycin830xl3mlibiunhko6wn5bjuipj9u61d3ousc3g2xelfy58myn0aevs6aduetqs2fagd5',
                flowReceiverComponent: 'cvzgo52lvjvjzl8wppsm7vf2ygbno4tcm3zo4rcbyhynoboyblqpd29grivbri0jor30ebw49su3dtzk0coh6p1w6twl5er3i96v53l6gbg6van4facq5w4vvpcbgm94j3e9eijs6yec7idylf1cw7qbew9uyoi1',
                flowInterfaceName: 'kisui2nspe54zgsj3bzzhxugs8wwelhr5w11511l60ayiphe2zlveapgni19743bzw3frdvd18ppl9jcrbiv3dpuva4u17j41bw0aoi210j7v80vlgdqbd4fcubxeygckkulud3nlbdirdurzw809ly4w5sv1yts',
                flowInterfaceNamespace: 'dsj2tqfd6inrxmo35b656cef85maozopyznvg5f4bxvqwg45zbxxmthyzlvtikkw8o5xpie51m78o4bm24vli781bcwc6fs86c99jr6lgosqui3h74kk2iyj559h9o2fgwbw1h8bwtfjzvxoqhn1ylw2j715a126',
                version: 'n06hmicoqftaycgqcwbn',
                parameterGroup: '9bjz796do2uyu1c1xdrl22ep84o5uyxi6i74np2peebo6fp5nz93o7azfji13151e39lj285umkg2b09l3d4rvfsy12xgbjsp0asvd5ehlfw03amjxlce2kvz6yj24xx1c87dav662aytjdh9nl6sufiuf8atfu288q5l3zdxqstcr7hqrhd8prbqdqefi58e1rzbqexmd5d0vi86vpqdbp77ndwc4ysuw325tpolp0872zusx409061v4mb3zg',
                name: 'id2i20u23j1jmjicqjcmtmtzpf072qw54hwqdki9zpv5b7rm6vs76shw486bg1cc3upqkl1waieinodtqojjnrzqm7f1ygljzeqcfpcmbih8ghqc7c3ucz7c9z887w81agmilgdv28j16w5voxv9fw7c2ag0mg5dri8zqtrzpkqd15srzq8wq6afqqsja7zg44blez1g4wwnfs2lndsxnxh7cim7erjc0iyp1yo4c37vonmwh1cdw1rx9avjr7z0wg85p4g4cl8pjbq70hzcn6rj9zh1ki6srpeikjvqmmd9dsl1zl78st2ao53xc1i2',
                parameterName: 'ra5s2y6oa41txgo10pquiyr5rmole93bq9t2wlozvn6tfogdcufomo0mc7odw4cc54pfxhshg8vscztp6ptd4r78alhcbrhfpq7bkhroh28c0ji0ryu8y92ddfe5ckeuet60pvhvc6w4nfcgsmqmt57niavnssglll6jnpiexd8rdjs4tehbhfl0dyzgzm9dhrz3m466cbpafxf4yct4jj11wgm0lbr4gbnodh33mt73m6ao2y4ck9x0kkdqbp9548drakqvrdfy0bqbqqe6m331hae9cm9quhjuh607gemmlcag2hjoims3zpwytahz',
                parameterValue: '5u56loa1bmh1f8806qdl99q7mv7dyunnd8vr4hfhywythve5kweot6a2qj6bx3jzxlognp8yo4rdsf08jcfn39odw8thnm3jfyh3et80wuaxda34g6o0quejn3mxenbu8npm39d6q1b8hi885k71qt49kat0ix4wwlhqc0bluc3ylxxndrsvhqnttz3vprwcpaou1uvsvlucdaiyobe580fl3i836oeoay0ff1eabxmzi4ih9qafm3fjxk06dh6twfsdnhr1zmwrc7dz0x0lf0cpo0nqyffhl9j1yho3mcs6ts2cc94jg9jzafmvz0huvljand3p2c4vz3n1y8vxddxh8u0t590i9fv38fbtdiwd2xzlfposeqi3nlef8x9nihmejjpi6h7fro5j71158gj8ud1mtpjkxdie150a2no9vyhb6ii8zh5wpxumvwmdbwscvhddsz07y7yr5nybp89tmhq8duk0nsgxwryq8o84009ms8iubqqnz2t5tchjg6d0h4slx3sjro3t9gxayw2ri265e0whx5ypt5wx3y6nk8z7r0idu4zscb97u5w15oykw3eq1kotzx98ls23xj4wq3bc4525mst3zahkh7w1yjzas9lonih6k4rxq2o4r0lvf6ox7ec1pcn94wcqjgefl4kaur4u6fl089t1612icuz5eskcpj4osnn8yz73s2pt0jnhw0e6ev9bsc9iqztq8gs22xckbea8xrkey52bzkmo3vnf93vrlm4u5eiruq0ep4ehhhtezeotje8jd01lx69fv6pgt8rwzf9xoke3y1agiittpnyn96aw03pxghmn4lzdzj00xtejcum8mok13zpx8ejn681r4ju5p981pkpatseh6yq1fiqt5gww3hdq46teqrdegijsaii02izkr35i2nrn0r3kfgt0ytjdl9ig5xwkslw70bc17hxyj0covqntnde18yfutz7zja1lvmgnrd0d5ow61ybcwko1y3urr8oavykz1y2pywzjvug0ezpdvgn74ng0m0dmdgiv71yxpiu5knex12mzkwqy9im5ir12a090o47zxncl9yf9qtzd5xif7tbm56ewrew59qwvfewi98m06tuwl5lt2sm4divf525lfkacqn80dlfmkpllb3yudbzu1u72w4u6zdaredqry7ifssyja43y043ppz6wz9ts1dcqn32kga5jsquxke6c7pxp15in48q86wjy4xo0r9uj5jlab418872pjvy25ep7788dc67rb0f64n0u4tgdyvrd6bmbfziysb9ljy694w4ii9t0524iwqruv0yggvbv7gj3btdy4uh1hk1vv88s6cr1c334lc9fzziphpd7ru5lh8l6kesdsrvmoyjqr43lnh7efh2hg1j8vsohe77cdhn3t51jg9juflxxo2jr09bemovlh2qoxfwdecptemp00dpk270q9pncmyn0yij42awedazw22cqz6hh2b4boey2wr31owv0611nydi68jtledd35835bb1oyd3vvezonq2xlt1hefra9rs3024g957oe64fru3ibfw9qazu4j4z1wv1aklfz5myfal1g6w1hp0rgqce2c7tvo48ux7kvx2kuume319zo2qgsyu3qgdbj9kx950witpoqqvts7t2nxycpm307k7xrp6k3khpd3etu8n216e23lno8wvdfy6e0hjexw7bceoahuf13pvyiuyf2534uo6idndcggz7xkep8yfsk4yr49ezb7jsfh564gdj94z8ezifj6wntsukt3khuv8ttrmvxjasae5cfvyq2563a51uuybfb762dprmxpra2h8pds2ngt2w85gws701ll39sk2q9u9jn43c2zelaftpvrpic2s8b936f3w0l6b0k2evmrud4p6hxpoukoexbn9j0j514c9cbximzi4kopn95husb3lkxmunet6d5j0nmcqpgwgv2u2xzyaxj62vhawds5eh08ndk0capkvwq4stlh7jk3j4b43o84yileqm6plw',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '58f92f1f-7b7d-4e83-8dab-f19628212a20'));
    });

    test(`/REST:DELETE cci/module/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/module/a12522fb-7d87-45e3-91cb-e08763c5aff8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/module/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/module/58f92f1f-7b7d-4e83-8dab-f19628212a20')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateModuleInput!)
                    {
                        cciCreateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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

    test(`/GraphQL cciCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateModuleInput!)
                    {
                        cciCreateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                        id: 'c73201ba-6751-4470-982f-f7d6e2bb3e63',
                        tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                        tenantCode: 'kv5ai324q9odvkhttbayly4b4c6mbpdu3v8e3w100nk31919u1',
                        systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                        systemName: 'f5a60c7z4ykeyi7ggbl2',
                        channelHash: 'r3b49j9ts9xpzvpn8eabr08prkj4ht5uthz5x15w',
                        channelParty: '0sjgnln2wafdr0vysn0ria4tf3o4kb6s8ijll0mogz4h4offtlc1vg7n55rqjwptk8x9efd8eud7je7rdbtm7jp7pq90w78savrozkdyg1d6mrwhfsoiv028vunqss98p0uoufbetkth2mh1jzq4f16cx1ib6p24',
                        channelComponent: '61rcg09qkysiwywwv9bs40iugfxovlgxpc1agkcqj9s4wc6cfabj7xeyssv8nzx96w53ey2xcwz5amnoxq9gnwuxeij2mhw5myeck2wfhdzdt6x26h5hj662hrm3s4yf30xifdsu7f7yrd5sedlubbime1224prg',
                        channelName: 'ert7jwggd5kdms70kb6m7kc7dmd4s49c39le8doet5hmbip5aikqmif4v9ch2n9o2ziac44uknclscc8fkbf10hctyosgbhiikeyhd2fybqlbh7tt8ob7zjn1qlcx1r65k0njbqd7h0s1afwhe54i82jv4ofvjwf',
                        flowHash: 'mfw6wgjxn2xegypa4soa18uunzjuc8qaycizj7nl',
                        flowParty: 'insapcxkzbhpi457ca3i3ze0gw8ombspfzkpgg28xj6bma5rvdfmgkr882n160qufpw0h242ejdgodbvwq184pzl8yc4077cvshh64a3ayuev26mbs9xzk5w1zrnvnfd72m6nk7cq839imrq5oyoto6zfov8husf',
                        flowReceiverParty: 'ko5u52dtt111wnfsjr25kvtyoip9elh77fdo5bo4qyqajqym7g02wqpf9vnel4pd1mz3o0nesigq8yprvw7ap2lthiptzslt9ubt94yvuw65fuvkge4lku4phfwe060w88voibnjcp7lv6x4btqruxvntcdlbvrr',
                        flowComponent: 'b6rl0p1nxvrt9dr7kz9xzybhz4mu8qkay2csghjexyjrar9240n6st36kv451dmy7ie7ol1nxn3i93rb9plyn98j87af4nxvrwo9a2r5awwwmem078a1luacsbt6wl4u76dcvbms4or4q1c948q5jlkmnvch1t4s',
                        flowReceiverComponent: 'dkph9x5fbgbj11iy9cdxfo5y3fsjzrf5jjmoqte9xgggr74qm3rjo0v2k5c4ly6zduak025kfzl0jzr12a0d44gkuldyb3muw9k3yf9bkfbzktysyal9pjwnq0d6pyxk2iqtb366x5jiqxntjgul0wfl1mz46jse',
                        flowInterfaceName: '1a18oszk5z04kfq9jz6w83k417z84cjrnh7zwwclv23a5dlw4qxg1s9dqxjphmcb5okmz0ticmkk40tepr1uid2zkecpf20nmpfo25u0rthlxgwvj3cclblc61qiqk5vh3go9aqfoh3jyateribfyp2hhi6ka27a',
                        flowInterfaceNamespace: '58o8kw1cktrd5n3grqz0ur9akhcpvunfyape0lrj9sryb5nf0bp5svabq6q1gvys7frthi95kil71kkbahvqloft55hnk0pn2eik2ptphx10tzxi8v6gjera6lkdfgsvvl6bsfdm9rslvi5dq7d190p9s2qow7wc',
                        version: '2h769ym5c4e1c21zcasz',
                        parameterGroup: '4bfk2ad315f53gfmwecmucm00v2mwhuoic60xp0ybj9cazdcg1vqgi0yugi5a87ui89pfhsdii6mo6lknxb9dgqboebqlmixj2ebh6zzmvpclyixv5kaetxvg8ry02k0n9onukdboxc66z6h1vkl5xq09uqnhbspqzq0wda7qg925xhr0rwx5jeo2tmz5vqm44avjjb7o5mjdxggfaeswnplhqkdrpro3lh6rkhxmse2p48a5z5ialadvxy0e3z',
                        name: 'rwjm3wu792alyc4wdwkvv2e4cfnkjinx15v3zo95kcqzp4dsrauuix16nho9npvrptyev1d1wwek9fp4fhug8p70gjxyv0j9id0cbj6wm6ppa3gz2t3pmysj54njx583qt6jempxrr4m04hq4we1risubegve0ndywcojx5wtngannogl59fnbuxz90x3674407fs7lrxg8h2lcuzd1np1rtqf0zhkfjjzgkd4ux7obckj3484rybuszmrs15a23ajwhd8u0zwhf60daljq5bqpqqn304yqu26ko7yc66k96zga8vjki5gidh8k41eap',
                        parameterName: 'qxwzykwaaxtkm5wo25mm0hxxgtrx3uvtxt6h9hy11whag6nrob1acd1dl3ky3asmx9qqtah53edmc7mqyyprtobqwrpuwr0yc6hceulf36y8bzc0hgjt0m2vtv3d18dljclmzu8gk80hxkxgit0gqg7lty319msay8bwnqwqh3cf7dliye4q0synjwiwbdge9cltn0yfkay7b34s4bgofghn01jtg95sowiyt572r0xc4ro4iyqq4w4hp1k89uev8185dxu9nn4qbp9g32tiicsuhlsgtgu47o99esdcw475pf97yqxv676p2m6l22h4',
                        parameterValue: '7p01ogzdufl1d6r3r7es3b7z9okjh2iy9pko7titaf4xkyjwgpf5p48ji5j1ccianxdk06lq3haakc8h11gf6o29upuiejugrorxuzx6nxedt05gepcu4cxv15m0ygopk53497s0gv5i0jezay11imj731i9ibwloplauwv1zof3ik96u8lbcg1oxxyqlp2behinholuyey4ws6jz5tlu9t01lmw8raka4epka6ulnsnz2hdvx6y3157dgkr54xynlvie4c7n53m65o7eejgvaudu1p8ps1y7g3y3is6t1dunbxilzwoy8u7v7z6z8ctb8ub63er0ovjxd9w9i5phpoepoty3lfoun66a4o82tzdoedsjuoccv0h3y1skndiffpehegu48ay7frzwaza9857lnjmuink2gz2rdgsq078yhx4zio3gbrkjicr5mmngot16saiihaeuab7xazo1fxksbq0ftgz2lpjfqc0ub0eamun7ak7ex8mw1409fqegkdb7kmft8ou8gvxucdbtekxl3ygh6m9xlt4labvdsbz0p4wc72hocwxvvt2zvowh6rnyy7pwhs5ik5rmffseuwbvgvz6ut9saunzyt9je30r0niupyw2gvag5esbosi1xu0ts9hvb8og2873usvm7i832h7t04l1yvnduhsj4d1gaycc6mmpyzpkolwa2k2te6t166okk79o2wfn39wl3byzsma8t16wbt8ezc0022rykt2kcw3zya2c8vbcd3wpupkgi0s3tfsuz8wajbu4jc2opu7iol9of70zmmi2r05uit4pbv1nvv3ex8ui79hryi01y6nyvbo1unxf8gdvf3kljvw5phmg8f5xijoga2s3bot1orwk54s2j2p78uur6ivw7j197lueigscq0om0bhdtfxdvhutth6ca6s0031k2g2x85oll1lpqbln4bfn8fd4zy62062cmjcazeb2xmanbsraoe2bprpyxnh6jhgl3sm5che6uei4wqtcyuuxusqf6o6l5o1338c2h9bembsd45aamtld0jsm9pteiourg1eblqfotcttkd7rsibio0eviuftdeihysk1f76skb4gb6nlg6qfesez88a9yqnjxl6whpolru28g9v2j70qn9xqrfy7can47awd64ol9hkh42csen9gkc1wsc7fo9dvvsi9qglnpzevhr5q36w94qwcd6mumk1nmqua6dqt9ccrhyd0tx93slfy85ypr2qy647pevjmar9gzj2gqayls4d79fzz2cfxe6amk6yr5ey9bhzxr8s70fc80pos97b1rpu74ff9klqpujphr7z3qth8r5huwx79eoipo7jp9l84lfs4hbt24b84uk925of9dfrmli17nki18l7bofo34xt61w5unw53vd1ktetmr58hoxqcxc98e4fv4m4n5993txnyq7ucwmsigfr1iiw3ztjszcq2tsffam3peyxamfgo0fjn9fjd4jw8m1rinphstzyzpa7i6572t141iem5le5ocd65eroah2o7c4nh3e0j3k2rkjj3lvd966ojyax4qa0b12fyvl9k7ms6ukf2w6rtnicb14f3uq2ji5lelcr7b1nobmv9twxsqml7mo7u7zjgxvpcpvfwl7s8u45o5x11f4dq0csg8t2q3ikm2y4cjzyon9j2uvpiqd2ixwkr7fnyuqly0u7wsmataf6fycadtxec31deam1buly0wmjowp5ortpqr23cp81v6tlkelndnyr0835p1zffrkd3xzr2ver00eakw114llllu559ibwldcho7md05yw8svs7lpnpk92tymsavabpjel68ibhdbifaye51df64t9gr60f29kfnl9n5ogtdp1kl5pvtuvugxys4vu07o97r8umkodq6xomkhr0bhm04csjlh8qpux2wwyuj1lellk0gzko1b6yd6g4gq1bl61tlgvtyhtw4ed1pkg898190rsnhr0ezduv9nr0dm9zcap9nzu7rkoloiz8lnav6v8xfwi',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateModule).toHaveProperty('id', 'c73201ba-6751-4470-982f-f7d6e2bb3e63');
            });
    });

    test(`/GraphQL cciPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindModule (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '9fb20812-dcc1-485d-a293-cffd6e9200c8'
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

    test(`/GraphQL cciFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindModule (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '58f92f1f-7b7d-4e83-8dab-f19628212a20'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModule.id).toStrictEqual('58f92f1f-7b7d-4e83-8dab-f19628212a20');
            });
    });

    test(`/GraphQL cciFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                    id: 'cf5787a5-4a7c-4771-b3fc-5d41134f57fe'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                    id: '58f92f1f-7b7d-4e83-8dab-f19628212a20'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModuleById.id).toStrictEqual('58f92f1f-7b7d-4e83-8dab-f19628212a20');
            });
    });

    test(`/GraphQL cciGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetModules (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateModuleInput!)
                    {
                        cciUpdateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                        
                        id: 'f3a3649f-2cbd-40b2-9b3a-f27b8da7d7f0',
                        tenantId: '9c0d9f12-f78b-4e8b-ad7e-279b1faf1447',
                        tenantCode: 'avi63538q6kabr3kx85gdjj6ytkeg8o5p6ydrextb52fixa2ky',
                        systemId: '9c4f4b11-c110-4e25-b19e-f0716763fade',
                        systemName: 'kjt7ozqbwtskr0optlfy',
                        channelHash: 'f9uuqr2j64o3ktgqgi70b6djt1bn6q9sz0o8zp72',
                        channelParty: 'i4gzh9d32uv21jhp2lb2vadsy3gnwk1il6ipa69dp0uebifn0wfptdllo4gegvfrjdpxqe8clh1symaqpthd7gp3zfhug7krqzap1u39vxpg5esgwtewgw2u56gkdnt4rzijrq8jz9cj9nssyl029kx2o6y4d0j5',
                        channelComponent: '47veb3bmf2vp4765r3pfmxnavluoq4p0yr0gf1r5uj8br9p61clkblxydgqe47vszajbbowffbahjqndrql7ko9rbyf5amsg0vndudcehxbhg0b3jpehnqrqkvfwjlt9li8fq1m2mqdxn2ftdwi3hnznfd1d37b7',
                        channelName: '84un7asvlz10lesg2t5991qttq58bs1et01jb1cirex6llusk1r1xz2aek60gkuljg00nv17c2h17am30rbdnh0jxcwu3pc3xkdd91p7eejuywfb5jftdncnk15u5bsm5djbevp1j6qe8wn1ksl7cose51n4gby7',
                        flowHash: 'cr77o08eofar7smhab3bubz7zf5rwv7f55e2gt0l',
                        flowParty: '2cn0zlnoqc2092fazeebklpxyk1i809fkh59j5hurrfs46jsquaxgfuqivw8h8lev0w0si7afcfm2q9yjjha9tev2dx4lfyekwr1nduyxxw7lritzy5czgmwlcxmq66mzoou6w61fzqdmjd1148674ekdd5jittl',
                        flowReceiverParty: 'rrwy7nfgzuh2s1qrxely121djtjvh69r8ywdez77izxfhlfflulll9p6yud72patrmrkzdp43oywppvvbuychfret0yxbicz7l8z3h352q3n5ia54wya5ovvpza6e9ozbud0giwhby9i700z83hy9vis8g9o67f2',
                        flowComponent: 'lhnmwm2biqmptw1yukx8dp800yvhqk5ubx4okvgpxy9yndh1e2j9r0i5e3i5cf4b0tia3n7v149cyuz5lh6ig3g0fxs6pu9j74bv3ayxolsw6j488uylli3z37kztrrktesj783r6jsv9rc24f2fsdbv64e56l7t',
                        flowReceiverComponent: 'tdupdrt7toi0se0ypohaom9hwkw3yat70e40ulweucro8t3b4w4bwgqwe639zbageacgqc05uv8s7drtix9qnaepvrqujlb5j5u8pi41z77e095y2hakad2ef4jji7hbezqrq1rw1yg6nxgzbmc97zjwzx5tav3t',
                        flowInterfaceName: 's8v346offmhomeic1o84exb5j5gtc66gbxvxnu7f7jcrxdq1zj5mbmhvatkzl7j9zgi7tubml1nen41o1oonzubyj7oqz8s5z3jugy34cyl7983kai8s6wur8ozl8ks2c0fd7o34v9zwq5qy8bzh9nghe21kzunb',
                        flowInterfaceNamespace: 'xrwnaxg8g7ec8jnisuo3xax5m9c13yuetnkl0hq9r5jlcish4qfk9110e3wzmo698kregsv3tw7mc6s8zckxxj7mqc9pw37360cic0blkh9ds23vt952t23nj6ew4ob8t8z7e2wcsipcotrmchcphe5nwg777lek',
                        version: 'elb42wei1ffy3jfkzx3t',
                        parameterGroup: 'q0xkyczcyw5a65pdvu3y0w9jjg9j0qyoao28ft5rnsguvubp38zdz84x6ie8meis8tww01fzstgmj34z0ib25wm061ci5yu5xer74754dsfylo61ioaoumhov8livybq2atk7fvioinfp7miuk9pfsz7dgetgww4yl4bmo832320edjg9uwq963rq38m2b7b0k9low8wzxo342w09zlrxe19q3stflfthx2i5p7gdlffhxsge8v8yiyslbpm6uz',
                        name: 'qp4tsc9x83r8cfuk0o67jbpc00fxb3h0t0hmipbkd1bmdyf1yphena0im0aldy7viejref6da1pea7aqzmotj8ww7klupi0zkezk9whbvpa5tyway8s9ztwkpjg7kjqi1i79y9l6uzv4cruw1xia53ydivnk7h36rcip4z4ejo4o01bbdhqoe4j6lic7t3klps6k8tp5w0902g7lcezwoku7no1acg2iliiqx91vib4hkqt713rhv8yf5lyv6e6q3iogx8d48asb7qbktnsp6v8fwnl4k876fhcveigjx0a4cnm256ytqjayfkbkm7e9',
                        parameterName: '1uaderv4wpxoz2b9usefur9xtqe9bij2ypn9vypev3qcs90evvqsvq5dkpl98bs8sa0g8yk15703vi0xj7telg6qa9x97r99eufetryn2wjzfh5hgww4cpuqm1d6t8zlsfj86657nnsbfin9bnzkkaz4xy7ox7oaemm44cwvsffzbz7nlvvo5ikij9f7w9dpu2r8p2a9t6mp3mx4rzdull76wd1wyox8pak9qpnpk3ptq90mb48b88eh365yvkz7rmf8std91wamg6c3cxu6b8w5lq22bohh9nffw7k0pg3zj5xxwt5wv8zenxi60r2f',
                        parameterValue: 'wgfekpfbqx90wdwkcriokumk6346n32n6l9gwnueh2plb830vsfemfmbfxru5v0gofdo8nwqswqyiwbv09xp85i5vb5e2ydah4kb26dodq9fhg6synhq4byrshbxi6t5160hwstu9e2yujjygdejo9rrjqgwwqmer0dhfyd9ol3e14ebs7tr2xjk15ced5kh2ws0d4rrt9yksfgifb3026d34tn0kbw0s7t21seiyfda4ulko4jx33grx0afgzgp0y9jpv6g7d63jdf46lc2tmjbcx5wv3jtxycwhw8kt86rydxm3w6clrki03290smdlgj5wavfnziud0b42js4hng9x2lm01yppglcbywxhxenl2714lr0swq6rbcumk7lytog21fek02vftof9z2q3d2qwe8saam6zs2dvkey8arqr8e4uefzgrj6grpe8d8122m3nrewrxghv5bbqxu89b6a43vdl8nwdnzib58yexbo2piv1g27njtx4hvwn02avbhuxgpirvgvnwnujxz0ob2r2hj3htloorats3k3xbe3mjuzw2py2z82w8xt5e04eszvjjcc0dmj8uirgugu2u0borr1j7hv2sf9htf8f95c6vrbec0stlm2u9xggis2ijs6yyzn06shbe4ykbk84oed3lbjvib2h2jnwazdph9coldvfc8cgj4nnh4xvswq537f1171atas09t6x5sxi8p7rj7esxy6r3thoskyft6fk062rbbd68po5zmde9wfqpyvxnm3bkjcyj7a98o5umccza9y7kzaoqed8w0lqrd43pik9x57ylcp1cbx6d3m2nss4n63ja3fc0akq7ej69mumqnmepqt06qoibgqayo1fhc5sbc6ui1ro57jty16bp6cqt7cjvqnsbgvcxyv6toj6wadxlqche9lif8ml1zcu7en5ivbutw0oo8rwu094n8i6dpiocuf763j1qzkhydw4h6js190alpogcyl5p6yb7wsej40v80dyyly795ct65veimszonmu1mznxn0g8phwi1y9qb6tm6ktpqbwkv4mw5ojdmro1nith6j2cc7l98wqf2dgy6trxk4ndo0q5r6w3l19f66c6mxhd312i5tqbgy04lmgshys5chavxut90q420bjlnc2wg9pomg8n2debhn7ydx62vy30bx1nrgtlheajxfyds1uld9qbcanvxqgtczxn1xwujawwase148zowdnfaglyr3uqo3iqfq64dof3pbhyw0fiovy3fpswsuzjt8snoyx6fz4px0g6exti29ppa85759bsizv2bez937bnbnohd2abcueuv7c0pkkw3s5zv2h56tg35gheraeofmg8em2ezg4lljrqbjavpl871wwoya2nk758fvijf3o0na6zo9veuk0mtblhtlz5apatsf5y4dx5qaiibxf5t512x5bk7ai7z0kia9e5iho38cb6ztedg3gi7o1dk5rxcs3jqhekv8m2051m0krg7su02fqy0jvlx0g8f8o0xsh8w1n9sd265v46howefmf8cigxs1tt4bk0rx167hmboi3tbkkyps3qfsbj5x587d9qy6b86hxcgc378gdj00q2rllmux88o0a2xs3holz5bqmcpub6sbvbkcre502mclwqqf660mbxtvaubscd4mxxvo7npjrxzmsvnbzggg0et7wjwuldt4l0q2dlkx3fn6jaasvnti8ph3wcrpolm1x7p62uv6bx9b9lyy81ofb7g5v7sgpzrf1g0inak2hvkmy2xcy8ods29gd9hkmamb9b1vcmja9qrbqvi7iz2db10ue6wubgc5s1b2xs1lkurf6zs9v0iulaqfpabkr15h2mhrnfdrksz19x1a1ut1lxydymx7z2h3rva0dzf2fklwo1dezordmcfl96aw4vanmp7ydbk7yvbbgyqr4wd2aqw1ppg871t4v71yoft9pewyxjy3j0fidzvuz9tkqetv3thabi5fe9ph5wl9xpm8u4kovao4vg31ze6thksg',
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

    test(`/GraphQL cciUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateModuleInput!)
                    {
                        cciUpdateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                        
                        id: '58f92f1f-7b7d-4e83-8dab-f19628212a20',
                        tenantId: 'ef540306-46f5-4779-807c-1dd5ce3e3afa',
                        tenantCode: '91prfyxbfh5tu72lyq2yar57mqsjqz9ak83ix4jemtrz8fijwy',
                        systemId: '7e084173-e018-4e57-937f-f3c87434686c',
                        systemName: 'g4iin34ju42qj0w1uee7',
                        channelHash: '93ggktx1xm6n99jscng6vmh9moeccckvpy2l65bg',
                        channelParty: 'nl0iz6ati1ram539i92gd667wbju9u1kfyip1bp96tjhmpwc6fm7vdvtzj005pxx8vxup1mi5rsfjw4qmyo8lnp5xheu2amwgtquz5cqujbcwb8dpclmmeu1r1f81h8fpg32a5umilzhdx3g1t3sy9nru91imvsy',
                        channelComponent: 'mzg8lqyv19ij6j0nsv2ef2vxws89ff4ppwfwre9pti3fz9s68n6tbkuj1yyhtds5r0w012chlod38p9v2rf5v46f5wm6tnevqq2jo3mj7ldhtv2nse7sp3pt5ux6aslcbwnszh9hmd3zlah6zfrmk2nawmycu90n',
                        channelName: '9yodkl12vvuf03z2xfp1jnwb15q9vcpumphcrlujs15jajfqte1u0n1eldpzefwk20zbwrcjivxms3llsqzpsqw5armb0fnmc6qgt86dpud5i4yc8ev6i9gq981l01o5zfqs38klr5uqnjrqu14db1ne3qvvzthw',
                        flowHash: '05fe0edav4r8xvo7w0thjlo37veq9pau6u6kmbvw',
                        flowParty: 'no4eukngg086oezce0f5dmpiy0lxfyxq9eulwhvtbv784jn6xipkoi0ptqdkseavm0kpi12bzo1oddgol4w2ndj74ibuw3h76ko8gu6rnbhd2g71nireetv6g0i3zu5naglr3kjxdaex82fof56vw6ejptgtg7dl',
                        flowReceiverParty: 'h2jvuwervk79qvivtdfbwy2olxu1xt2jernp5uqit6d56e2f9rbv0oar4c6r3t9oj9uwti08mx21xltbn1su7p1cp3s05h8k6hrdkeyqo8br8kajm1ro77lywlousvrre6ko8i2xp4l5936s1ilzwyh3feb2luow',
                        flowComponent: '16tgddsovr0tctuz7afyfccaardmij3f4vt65mvt1gqxxu2fvxq79e32xjmm712jxy0jgg6h7ht4m0ddg5o2avu4evyvaq8uj26kkqvoka7tj80cn5i9zfs8yg1hjtbup1w3a9qaxetzmo8d4wlmqdmgbtcwyweq',
                        flowReceiverComponent: 'szqewcaeo9690pltbyaqi2hv5nc6ou3ylmtmrhgeh3v699lbc12jaln7v57kmju3mgc949sq1bgn6v6pf49lvmfk249jtkq5a37qofn13lnrk0n508yy0gblm95evt7giz6xusejc0rdgyqduibowxzaui36hery',
                        flowInterfaceName: 'jrxa0wew3l9aho6qqxk1jiuk625k9o011p08kpf8u41z4lq3c1isuebby66tgdwg2szhwsxs9xthkficcuqeqc75vxxwrwcin7juo0ix5stzjsfaz9buvgs2vkkh1e5wy26kcylpsnw6txjegd53d9q4kj7epfhb',
                        flowInterfaceNamespace: 'vbfaau7rh77rpy2xngxok5euoh8mgfqi6tdg48c6o0nnw50thpuvt0kw4jz3vwkit5re4690tyz3oz0yjtl4p700cy9gecbu9kcyoivpi6cv60zwn9xtpsj9kk4d52t3uzbzayasgqjmeutgsmpfe6uytbaidanb',
                        version: 'aq2pycmxx9u79avfemfm',
                        parameterGroup: 't2f9yd5qv96ci0fb85nob4eyiy0s1szjfqcuijtn1jcfhmsfe3xjnwyqn2w9weusneckvoh4f0mocc1rfyknjixevsmhnj6sffbugkbnnrt1bsgluan3wthcizvzq6n3nbxdh94hhzt4qh0obpejadx9ikcn8klh1ohcr57yxh1kkrn3rpdnsqeikx0ibbulmlfbhwpzxhk5yazbabi74a841rxtwhe02kjbqto43erwxb10dqlz7omujuxp8iy',
                        name: 'oh58jyrn6wxcz1zb7jozuxt6tqnrfq7rki7djxv2p3cnfql8oyhhhwosvr9p6jpc6kqljo11bl7orf1slobhirwnkx7i02qbiuc38sq2xg0mx3tqf2se92pytwtu0wopb1wfjndaixrr0694ykkcchcy03tkihvyeb9ybjeyd2eqkpe337h18qfxyonihf5ral0dm06kzx3wc9vzyc06q0304xzkavi07g4vhgjy8lfxl252liv17j7ryjz33inp6t4kr2iz6slgpehedwtx3lx202n424brnplcz7k97il16yjxse0386qodax2m2or',
                        parameterName: 'wusoczge117kb32mfy0t76kbupe9cihs4crkwwi7sas45blfev8ik6b3155tnqi015cy6teiqipbw6eer5ypmji6ijqirqvzjveaywnat4heckne7uz1h921o5gudwyf9rdas51tdn7kgrbdqtdub9fxh0wgfvk1ltr8fdve16pxpersaj0u2cwr7fl7j7jbhpv82ic510pncd1eqgf6toipx17bx94wefjxaweklycmcl93simu4w3y0m1e02pelk9v4d3xaesw0kf597av5rhbjv6vgqou6jgmht0t7txu22j38c0wmxhtsvfscvdl',
                        parameterValue: 'otvnmzl3mp87lez1txkb8uojyp76y2ncgmfjq6liedl2mym9bhkhaio5obntlchfn0ln92zm0j7lo10hc1t1623az5tbdyc8az55g9drxdzvkorkp8yfoxhf965yjs0yvqc3z8lky9aa7xdsdjyuay0jq8jwr9kpsszi5jji17ec3rzimmze05wr31cfl9amx32rivrarjv13ojc538km9aa82pdq7xkdbn4rhikui4jm8eg82mfxfoqeixc6gksulibsgyg2uwr31or933ee32x4a0sa7ba2cky5oqpz2f286zy9wldfz2zlb728gzgj8h96wsi6tqcvkl142obckj8f0ekolzwuj65c63v04vk4q8evc9vuknefptyusxn8uahqwpl4g22zqy04uj0l66b2hmt8ttfiq74vcfmt88i2srhkiouo8auwj56y3h7fzhp26p5wkaqtg3dkbp9s4udjpl8ilb4otprc3i5ap6nw0ruf7xkcm7rixo6qd4nc5zgjks6dc47a5e5ruz4gcrx5vhrs6pu4yhlferjer0ap9icbazun1nk4xwdy7ru3oj9pr8kkixtkytuefdmwirmcukisigqwesjcrus9q07dzphdd37swizjc31isvobnsyqy90dseg4j60n9huh2tzcf3w92azt5io04zz6b3nfoxut3bpysn31lss26lplzglq06e64xenpatuqiikegznv3j7f2rk2aunni0b9no0gthzxdetcxctj081epqxsn9gzfrwgega2a28pmoqgxjc4v18f0jo9mlnfsfye0nf4tdsfudcntne2ok9zjwzp0issacaab3h8p818u7obdm0vbiszyd7ze2uuzusv92qz5yssuixb9dmzcvffyn5xw2fsq2oyrv1jwsy9uo0hcjemfddhv6ux6o9gwiv57oil1ofrmolbtm1nyx9zlwkrjhm9t0hw532yt2rcc817p8tplq1psun2toyjsnys4lns4nw7fdsx1lotyoyostrh959tupl5vu1uu91fptmrmqd7u35ue3v6b1unfhwrh3lxnu09ayu8x4cwwtalypmmz4bmsjcmtl0k0f008qr6qi0nl0ku7jo3z2dvbpt1nlcucr8k5hoh80svxmp5qosgzg690p1t9rft4ikelmnk5vnd1ebzn47swwlded6m458qikrcd9a48homjskdwxv3xhht88ayf574ywnqlzmomsqgq669pusjruurvw79yes5c9blrrtnzkq43z8nrcde4ocehmcvo2r6ll81z18xhz26s63btrtih7q1k1m8n2npuc8fp48u7jgson94nru6kgeb923lvtncu5jo4tr4uph9qjjoz838lj6imojmbamghvc286y49607kjj1nzrnohh25s27qqh5bue3t9fvqrtykwkakriqfab4iyqlummrr7i7o8tqck9g6igonqo7p9srfc2wle6duoijbytkqbc7a2ww2gphl7kc897ffu66n5ehx530dh1orze6dtnstc9a30thngamffnztcg4phgfu0ztm94m56ejktlzr5xrl0a8qtf3cciik9u54gwrkkwh0q9g033tid0htenlxji42ip4h37hwtcq6w0mtjroraj6wwxmb45ux6j15jpj2wzd9uyxbhdko16h7nhwtevlevsz9kds8relhbhw0k24cuyzu4w7uf8x349nnd1wy36sf0e3k2wobqryr0ya980nohqplq2zkz0bums0m4t3udqeewazpzjqhiops2lacoy07fv0aa5moou8f7b9i22ff34pbfcbqcs3jotn7z4gdtw3r91rxeidnmkm5kccmaqrp3bp0u1ugo1e0zkqzp5fwa8j75c8irdgfyb2ds63g8tttmccpd8p4vmqqoz9mcgkebxhrxc7idnrqs5c5b7robn4zzs1xn8qdqef2up000ibno8b91xgu24r27vnjmw0o8regsooy6lenpta1slss431ex0an8pizdj6pcjwmjl5aw20iudqrdf2kw',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateModule.id).toStrictEqual('58f92f1f-7b7d-4e83-8dab-f19628212a20');
            });
    });

    test(`/GraphQL cciDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                    id: '3050f525-a536-4f1a-adf1-992172f9a241'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                    id: '58f92f1f-7b7d-4e83-8dab-f19628212a20'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteModuleById.id).toStrictEqual('58f92f1f-7b7d-4e83-8dab-f19628212a20');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});