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
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'xrzni0sshpnf6qx6t5lpdhso26o9h5thsdsta2ckflzmmfkefe',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '3wfplfpocebhxawkceke',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'lwf8qdn9l5mi0d4n5qrjcec1oeu3jl2uzdviuubp13wd60x0ha01ewt075cnr66oztt4zkt9o84tbjvsf1t91vq6mmun7r17awihdlrmnw5ohrt3ga0csfqbgv83o5dqh2567urp0m3l6ge4buixvqk3pncjdifn',
                channelComponent: 'i3et7no388herk22xje6t1fd0ao0280o2c4auyyv1g3i3on5r4rnw8j50y9sg3az90k1960hjc3kb9xn7aotb1yog28y4vt2d4qjrmhliup5vvknv3cypheou63f09nvulq1su8p8tcul734rrs2ocsyayfhohka',
                channelName: 'h7ojugamk4xx6edd3gaf11qf8fjfv19rroth5ab74z3h3ougzkisitb6sfxe4v4mnt2yvweeu7ixpi0y6i1tv9a1b8dlr7oxijmn9vdxjoflff5ru1rb40on6y6lbttox4bz07rvkvhx5w90c98nt5lkt665tscq',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'gm0gqipcb7xmkuyr2qjizehteo6l783xq6v4ysufvc0qm6viyckkcksx2xpv4f7hbrh0ed7hwltzrj4b96f1fk7pr9t2q45qxdo9qst5dejkl5v8ftumj2gupj92pu3lgit5moepb40mw28n3zzhsrpymlyo59mj',
                flowComponent: '6uv4axdiyicpf9r70xbqp69qqa5202fpvw0asf0i7snnbwk1clmn7pmluz22gtvx6cdfg8u0svhjiyhqx0l7dv97217zukus99yq1d5puv0hf0s2vdvsgy6qtjezkrwvm7c3wqrz2p1im9t35o69rnxeaqhggagj',
                flowInterfaceName: 'n06zph2byscjfvedjqb5xg81k15nrjv1fie2sm4g7cv1jqtnxool9tms4tt267hvqispx0hh3yzpbjyrtvswfmufdw0mg2wof5v2o5nk0bhw586p55tc86lvbaj36pczi1wtzui6pens8mo7uzicgiaf8adjyu7q',
                flowInterfaceNamespace: 'qbyywel6nhzudh5q4fp8tnjad33srvxppgek9ix5401qf425kyove91vjlqm0vy91yuqheyd4z7f7vrjxrn1ah2pux6hodbnnfabht58o1aybzny0flm8ygwmebu0kwwn016bjgiy43pqmigk1b8q9nwlw5ydzcz',
                version: '9wabi82uzn71368xqadq',
                parameterGroup: 'xaf9or896efq83u0z92b4bir6i368zm6thzoi0dp5yn984gvfsww0rxuv65cli9j3p30yn3zjeqj2k4kudfrfspubjw2jrr9n85nxl4x5945dh3ubegsn9f7jhpeccr3vntamdxmgvnc21a6ymfaez1dzzibmbdlbmq4lr4gdtuzt027bs1jq2ahd8axggsfi4aprt8vl83ybzxwgukb8yrt1r1s4hbrp1di7lqctqrcf7v3zoywblgciutqpvb',
                name: 'mfru7i31dar8wqp5a2kfqvf0pi3n1g50v64qb4ar935p7f6vw4w5sajfs83fxohoq45n5tu6gosfzur1kxclf3oup7rzyhnvdetz7fss0wodclzxnvbc5op8qprc28bigly10mkmdtlr1fqi3tpl8ufgolerpkcn9mk42pqcdysylerq2g9pkahwg4sf3wud48s87oy17awgn96iqewg4mjhntxt476vrj5ae2buoene839vbcrp675ficfj994qd075r7bbjh6rs9g6tyuyez28delwtu0qylbs68fjqxzy4rsma0e7p1mwq34rvkso',
                parameterName: 'voy7eqdkzsbz287nmiifdmv7stzp4m5x9hgx0s8xl4o9bgqzokpa9c90k4squxm54w8lazrjc7se8sew8s3rteaxk1o7dnvmft9hw34vlljmm9n34tszx6i9w4j3xcgae1ip9egntn4e0oal9nahzyj4bqebas78g8jumg4ax79cck8ba8gw7lc1fg4u0mbgmhizysqt5036jriuc5mouxn8x9ilflbl47z5jzkikoihj4euau5p1hhuspop0d1wu3c5aicpf12ph4q8hpnwakeo7qjtoi1ielzau1l5nuzevs51a1ee0zfgdisxqh4q',
                parameterValue: 'm0797qj5sdfemc6lsdia6stxg7umcocdyvcspii29whe5pfinzq51b2v1wljwk9lqiqte0pzcttgo2r82mecaqb34na3n1p1ideiuln1apu2hlmhxcbdqmgyrzlm6s3kegx4e1kjdndufyz0ac4dak1rv4acjabawzy07sct8sd340awi2155mml4lfxreo4kqzcir4edlgkmfkzr5qhw7ijrfe98qc10ugjixxdfxw3mlvrl18ihbacz5xw5jr8ikn22qnkjs48ji6p7gdpfvjx9cup2hq6d1q82f0ah08lq0wbyvhrypbq3ke8l7lm9lhm5utw7s12vtgcqyuetaxuafykdrx22d1bn67n7trcaxbsnmwgjgd6epxq2v4bfo0a62xfz9oac1rkuu1mzrke2fcg17s8mrmvx21k9vbzr663n6tt0svp7e1fm4nkxn86thuaqytj0ncpowqo7fmnhduf5kq805fioy6l9lzcoosds7mogbhfzkmb4agjjdjau44w7iloajhjd9kffjx0w0tfjfr4qzrcb4uqzos80djn456ehrkxcldtqf72rnrrhuaf6rccszu6zo9zlybry6b9vlzdtqua9iwlcxixd3alzzo5dwugxto904dihgkmevpf6fjv7j9ttnoej19jfh8vur2u55h9baqh6izixcqzr9vw8gwhz5l31dll80gp6scu1i08yg2sm7aqr1kbqak2p0uhqo2fmumxjk9at2bqxs2nd75k8ppj3fvkcwu3v6im2g4kd8mv46j25jroi6l1c1sop6ardmkm11jmxsnjstkj36xk0odomosb0dvzl397u0ndgzj40vhw95cuaitbsvgpdaoz1w7pbjlhz8sgoqggfq0bssr8pj6auai3cj5krz3c2a5hzztpmxhz9uwewblm54jax4v4fg67fw4uitmt1bpva17cfw8fu5jfv98lyc5h1hmrwjyhodx19pekubiybddjp2wy4s7vlumi02kkzib3s7jazz6f',
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
                
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'fgj7s26vy57tkpwszs0xer8jk362ulf3xuch1samqp6qjwiyp6',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '98b5xq3ezs2lw12lnf7r',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'wyeu2ddnfpp5gd3o1ewub7w3eueog9zfos4204addick7cg4jq43n874efkbij1e6b5q3ceoppv6na3ovpk7jrxrdbwszf2hsnzh0yi6hq1qocuf1ibfrc7x9fvk8cj47gat0p6n8wk5mdeg5f7hs3oyyd9k9lx8',
                channelComponent: '9owgsfikb31gmhzmhq3egph9ob9yzvit5wlh7wyxo7jbf3j4w11yk904h6dy9i52pb62dbzj7s1hish63river4i6bbrlmt462g9vskpydz28ckudvfxkawcqxz61s2pf3u8x0pq6alnot9qcu7x4ezocujz1nl1',
                channelName: 'z62yoq3waq1j0gswhf93cb2q52ruufhvfy3jixvrjly3n61b6rrx8k72nsdswaxky8vzbt6my5ehnagchat08aoqg44ofdc38kvljtnqxr469ebw012ocsdcw6u0kf6ro3kimmqwiwuqbzjglqu8wf17lyyvimmp',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '8ixru5pyi7hbt6ptfv0sfrh0p9hr6gv1e17kammqxusww8th6ndfszbgycx80cte6p8uetph3ffv6wpm7ia34ha2le4j67r1df8xktkwp3nxbxf3hixcenaowpbymtkyso4fbq1ux8be8hczageyuv833191ia7k',
                flowComponent: 'svaxbgcybbbd0ovjdbi97ajebih7nk62oze813s65slwe3m07gfteo7x9jvcwmypka3vxgx4a4od0psxtfbef39zmd2gl2marklazfy69zsywa8sgaqmlqh2f8scaqvsh60q1ikmn18ri31yvm6ld1oasn6536w4',
                flowInterfaceName: '792u0xvamgvead2eynv92j21y9wjse5xjvp1aqx42s3mx5k2n0lvnz46d0olk0akg0wkuz4tah5yr2t7brvvawr5r3i29f5qd5ayvtrjf3dsdwisfbqdbfyi6bbw8f7uwlwjmedhdsq18fv2omjpmhiza5chh7uk',
                flowInterfaceNamespace: 'gbylglj5pkqq4itmqqif6g7sjx6l199te3pumk9kzey3ev74ywyawvordz6z2meqi39id3yd49e0de3ch2p7p0efbmrm8i597wyzrwzmffzq838ch8fhmz8doo533eifbeeuial0od1zogkm1jh2sitrelelmfeb',
                version: '3nd20rl9pwhjaqjn4qlx',
                parameterGroup: 'x46ypwndy9eebk0nzbxlx0hge5p20lc4l5r6nbgvtb2n4bc0261fv2v1c3v3f0ad7cobu5cn1m78roq3bt2q6f7jr0ewx6g812wy9teoufbaikc0ch6het8ru30qglcfrfvl2umltzn97nkonn7ruo9zrtjvut1ecj6xvbuaoh4bex23qjbmiensbesmls4zjsi0rk3m399w4nxev5znf191xfn1ynsfbdqx0521jp9iv8btq5gdnosmm8l9ozw',
                name: '3a451ro0rukjqaoa02oope9s8c674bphu6xm01gzi1zltl9ymelwwy5zixbkf3q8imjj0dk2c59aj3z81gs2bubk6yesqpx5gy6g8h8m8wjh6vk5cb4rir4fpstkieeqj9xy3p1l03qjjxazgq2y3ob3biz50hdbw5slxui317whob709mp94fn73epwr3ji43xihfnueg4jj0rdbes461frj2wuyz7dvjcdi9wgk8s6nuza4xyyeaj1aqp1ujz5q9lriux0owaux4gyej1cncjp01accvzmzsdgmoq6keqksbk0kpjervsx1w4uy5af',
                parameterName: 'xt832k1b4r3vrdxgxz4s3d5sqtqkor3oa0v5o8tquw9z0vwj7vgjcs2zj9bh4ah616dmooot9o7x4pjypis29j06h3lzvp55w4wiurmx1xfcw2005rxbtekcrst8tqro0cac4qvmvky0wr6ztpkr78t3n27mz9m1lvduqo1e36ts70wg8ci3nhg2gvxc9sp51pj0je8xlk49q91psywdsahfg182mnvirpuxmndfmrl3caa0k2reijlmqgeqmvbojuilu0q1joi249vlfq4qk4nplynl7b5f846t8crm91h5f5vbjc6il3rv6450x51r',
                parameterValue: 'puh3gcdnrzmel775jnh2n3qpcsmlsika744yp0oq7svzxqcpkyikqgh9hw2i31855a2jriunk83lse5uhabife0k5w6wl7o67x0itoyqnpurfp4m3xmwxb08o3s430pts0shb8as4q93skntnftp6159l7jyk0qqzcxiwqu79ts5le4nh13poctrozj1882pzewh99ml7n0lvtuhu9o9tybnc93upsxytpw0n0zd5zlfpyo235wvqh456owc5eygju571rjgnzxe72rzs0pvq72qqgmtrfzrs7c3ev7qtz0qimvm4e616n1hxyjb8vjktjjcig169h3qv8mz2doq2l4twbhvd6s0gt4ssf698j1t39x5t1k1jluzfrhfrdn9yfytkxuu4p5io8kknfzc0ldfttpf68yn073mn65fohrgnys358sa5miht37ly28uaefs1rwdmklarc6orsmd1urhrs4nksqaez3eyllk5idchnprghtlik0bgycdadr73mi8jgmbumbsqes7kuhclaipm9j3rf4t39jbns1m16si691j5ujpp9f80xmqqrcmq67kfmu8gbruy1cd74ljvjcvog0o8ltq0r2j4h52pljypptqnqhsxacmm6221gzcxog0a3win7dqsw0m2vqnqtf1f8d0vqljkhszj8uiv2gake8yt8v22ysk4bf7m0le8zuz35748tglwawsvp64d27s7eqkjsv82a0faff7o0ufdcykegl027h3c5w4m4pf6gh33dzf3dww2h6lmyq2m3rjw13ekbrec37amuvrxw8v7lag9h7o3jjy52bkapviwsvbjx9xovh5vfw9mwii23s9dhoekshg10nnovl2r7evulnmzcztznnr9beu7jq1p34m5dlxexev82fgcdeaya2t7iu2iyxrclkfar11a6ex8bcstchuukw7sdmphwjxxyiw40g67rbo7do5kmbp136qgdsutmhcwnaec1p7zccu94mes6fu5n04fryxgrv6',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: null,
                tenantCode: 'obnihgxygq6z6h24euhl2u68h9rym7t5aza8k2u2tz27gegr9o',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'dsh2lse3qgmptmqxvb93',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'gfsbrbdfyqkv768lwc22x2g4qvgfo6kkm33jhccejmp4h8whe1bl8xa86ladz6zwo31s1czbr9wbno1c7rintlxmx44f9e6tdq2hbjsn69sk2f6jn1p7m2c4eyq0e9f45ynh6vot29ock5zc4aqrjeubw2nm1cqn',
                channelComponent: '0luefkgswgan6tbieigchxjhmurqah9fm4c0evhn940eiaxvrinzefs8obew3gfnhb2a5bki4ps09kowr9zkf9tv60okgklnnha8m0efa8vcww6fjkykh2mfb98fcyz7yml8mc3054yaka46sytraib2y8eds06l',
                channelName: 'iawnsgdtpj9vkpnbo6kl8kky548rspcnzy9qabmxd5978zoydcuh2r662c2wqjbvk6r8kpvupw6kkixof7oubdiiorue2cszy3rrhthb2yeev76m7f9dvqrygjgps5z49yoz4y0kxhp53l0uyyatp2p6o2usuvmj',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'r9wgqb5dv7uftwjv7gbppbugx1mp62oo7jkb4udqu4am12ekqbx0lsdvuu2wl848jpd2pd2ooz3kn3ykj0ajztk1375ieurqkxxrszqyoa6nuf9mztjzgfbygnn3h1ysgoejdx0dre5v48ryhdc8z9fid6w1vrij',
                flowComponent: 'n40vufwl08ne3dx17lrch5f188fc2fldhsipuubrw6qb3pe1sg1uqil6b3p26nfbyevcskq1u7pil72wydzjbhu57fxfvpt7f6lac93kdferf8sbfa89cjskfx1g71l03l4sry8abpwjggf7n8sd205yvs64zc51',
                flowInterfaceName: 'v2labf6cju9rwgke46u9diqqpp90d3mjhzxpp8fd5chbws7j2e5hvwui9nfluettphb2bvxfzsfncreipcwh7d1t69wvjbp81q9dzdzthr1a816v78qy0szwp99iyg4ki415jz88s2vjsfin2za7mm3nj8ceu9gs',
                flowInterfaceNamespace: 'kf4zkkxfhh9zour8j50fqxjhk4xpyt9bd3ocz6srhmwq257lj9iuyjznqfwu1m5svw1ng6qwc8cp2ptdvlk39t5k5sln8bi2071cw6czj0hfhs92v9wwzp9qcbmqtwi8pfvls8ct2pbt0zi742i179h2963suyum',
                version: 'crwq5cwgasp4f6vceqha',
                parameterGroup: 'yqq8yajdmk7fqv45ltxsteuu2y27r5ciqpoqn1pwvwh10nqco0nwmzvt49rdep6yaj209mlvjlkopm42fmqng6l4v5nvg98uh8nazn5ky4sgo3tipkkrcogh14061r1n384fzvumtlzd9jcca2t0dtqkmfs0gepq9bzrtukpjb637fugd2c7h7y0mjeq7iy5e2thy7k4p5np0jwc1zuym0wnng1skrpswf7cd8bnkkvjw3g2tcoh39xkyf6mpsy',
                name: 'uiwuhajq54k357yti7n5iudqpjo0gxxxjqdblboy214xaps8wabhqz0e8jt25mrh16zn3o1qewkacqgafsst4fqkjhkbsxp6erwkky27ef29nlimvp30wb80td0ni4oiul88jrp9hhj965tqtbpwg0l0szf1mxutww16mdsscw75374r6d9din0gd3ec4brh46c6otba8a7ob7v590zwdst1p12mb7p6spsbavxdpjbt7apbpimgu6htxxrk9p9enjl3e0e2g46qaeh93utgqrr93evdbtt9nnuud03mcrg2ndsxrxrruzg0ndasgdlk',
                parameterName: 'w2dnoyhk8mfppv6ro6xabx792paolps4kbk7ij44xuc0tk7d2lpqyoiuoiyfvordk745bp0uvl1fgvjkd46r8rphjcd3a6t7tdl9zznaupotkzu7necgax5wti4c2m419mw34cfxskusuj7vp1htlw7rdubp3h3l9sbk1wn53rqr1w6w6oc6xz317kgl1qr4lk47bpnbyfy2v0g4jamu0yaqsff84yws041fqzlibpxuimq0k4thv8zgq1v1ff0uywble20nsu0r92j0jchjdxc4ct7si3no5j3wuq6xmu8udhqo93535e9nvlb0n0jd',
                parameterValue: 'n5yhd4387kvp3w50jrn1blc4bdi1jlho19yi67iltsl9mnws0qjkg1p2f0v5sx8bhdflqh4wacx93pkdofkmowc7sbp94lr4iafwrthm6oq4u5id5ikkfelohu5wfgmlsvg2dge2g3h1lj40k8zy18cfm9nppqs8jncta7tpdv4hsdd4jpfn7b3uryg056qjakokk4e0tgvcp93qogec83mldx48qjqri51uwcr49dxu74vykqj99une056cxkozjjx8wi72jpy3kcntfeoe00420t9y0y6oq2has7vh7ew0krrii024u5ifjkgvysfia5z530t2663q8xpjtx1uipwxsangqn0n3or8ej8ubuq37z9fm5adxzs1fic7cs09fu72gtazfm4few9fsohapbts3k156641z99eroterjuho15akixzpwryqmwkcbaqddt0cojmtjqoi2n7npcd0t6sh4igfbe96clkt23lmmcgqiztvrm42h5prrx0pinz8zblhcxuf7h0p0c0t28t2pn4uppt88s5grrnqkxegrjp6s5ep54om850edo7oosrapkntnun4zx0lv7xdo9w5f2oix65fis66vhamsimxosbphrph4ym3oriezr497xbo2jtbzyzr9mclbxmg48iksycr8vty1dzl40k0zmin30piwce2i32hnos7zm6anc7w8tm1r8xqliplx2tdgz16epjrl541hug66yxvwf94ug9jgm6skkf0emkzj35ynyxtl6p55cpt61lhupipi4prjvjin60utiz3znx0gzds9flka089evswdv5q2ab1qcisx1rja3d921cuza5a60583ac6cth36089o85y72fmfy7tgl3ylchdifsp64fi5se1akoft48la1vlfh4omf1lh21aeifmwy4f1r9wncq9rnficwypmz0flrqag9nhke51iym54a0knmpmehcj2ljp7yihotaao5xmoew5zhny11aoi03rh4v7fvfeudomylv',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                
                tenantCode: 'sceehyqq610araxam1zx6yf14a3brlfwb9m96lfy7tge2xi6ep',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '3teazmoemvszdz3bvq1q',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '2gstn9hm9yzaik8rjfm7uqliz5cp2ucqowmdz4uxw5xun1mvlc42qzyxltqxvxjn9jophfzthff7bnqypxtha9xkfuzkolhse8d6z42tqhttpud242x4kmd6f2rj9zwnnclwwz6w2jawqyjuara1bkjq7im04c2t',
                channelComponent: 'id5ev6vhc8z9wtsfe2dhf207x688n3rv15fafu5l42mtltr927xvr22jprhnna3qnzzxlte86f2azip4mwi0si6vbji799azv6iwd454ps1mvv555eawh5r5u4idect4yebal4mj0lh74bq091ihr8e12kciztme',
                channelName: 'crhqoa33t6zj8t5byz7vkvm9x44hbswhfo859crt0smzjo3cepmfeqqs4pbv731mgxzq9lyd4i9egenifm2gxjudip0l2b9jknf4eggaph8w7n3vpaiv1o8hvbp0mdajnvdndt66v8oeswthzrfzcfird3gydoqi',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '3qpbpqusfvqch1ixr1lkng9s942a5lmpc9o0mbbct8jr8k4u7ex9lif5h4w0hyla69x7t4oi6u8s75glifow158wx8s30dciclh2t43mimv1g25bj128e1noqsdh54s2vld4bh95azjn7jhlvizvpvvvbvqy230z',
                flowComponent: '4kf3h6j8kt4r3hkqjdd99fcsohlxcdikomijxcsfv346w7dayx06rf56phmhff6pbgtaxi1kn5sqn1xuqk579jlkrph5n5xn8ujwsvg2fj8yti5byz5trucsqvq6mzkirnlvmmpqt3l8qufm51kk63a9j26fu0kq',
                flowInterfaceName: 'e54bof1z1k3okg0pfs6ba1k7vg5wsfsjo2284yukwu89wo1zipl9gpr7lvnqt0pj1x2rljisp5d045p7tchlbvp26cz5eq5j2yrpzao0v9bvd1pvq39ki03i00pd3mnx9849uaeh5j7972iufvipnpwyy43wyosm',
                flowInterfaceNamespace: 'ikyo3w8sczbwa8ugs5qeorn1jf2itgka35wsafy45nn42tnbb6908tkdvzv2e23t0drybawhr31wx0jaz99n8flgb4ke911fnnjy4b4s6eeb5u0p2pi2c49nvupxqomp73x0w9fdxa5hzzd0rkvf3nn047jtkmpq',
                version: 'k8kbj2lwpqiyhp6butqx',
                parameterGroup: 'p5t2g82ewwelgn1mup3g7h99abeimllx3ehukyxgc5tlo4ni6sm8fqrtzgvqcqdrhzyhf1vahts8h67ejz954tmsq23vcpm14wyuid80uh41coevoupfu6hmc9ca448au2r4xgj49j5tvyimpcczwcm6k97zlzk1n5zy7ai84m7eb9ix1ugso4k62xiry983et2tv3yk9xkmw5kl7nvicdglhzer3jmswatx7xavjqxfs9ghg8mlyv3snbfj6cm',
                name: 'kys4us0sw725kyo02pd62llv3wlwewws2zmtf870ojh6ruozwgva5wgqvwnbnxjtbp44ou6lggv7iy2458puoi5wyxyambjcj6szcw3uc6rbw02aw0ouo3xhnsuzdzls5q1m1rg38s5qw378l0goeie9pw10h7it16j8bcb7pzvf89ydj8ffsnp9i0uyquu8le96r8jl0udrp4s4f9e6idera9f01wk5mrfyiwwu7e5evycx0do9qtjl87mja2ux31ithyofrp2cw2s6dzpx4ri14hvcaoqptpb8qreourq1l47z48pqt0nkqu6hxklz',
                parameterName: 'txvq9ess0k4dhadulqmx7109ttv4dv0prfr3619d6wuhtih5ne6b3obz7p8jhh1z0po53bfhvmlg9wljgg3l1nrhoug1sxl5df6cd07zdyhe2qk3yeiekix6ou6pznxo8ajxj69wdkk37x8on57x9h6t69e35an59e985vfafwl33mgbp1xmjfp9rj3vwad8i0bf7it7fkgc1f853ollqxsq5906ngpi3qrdzbmfhhe8if7lsfhloxsvxa33mfzlq9nz4auz39j3gsalk0ir1gn5v6sk971zafd9gzyguwot268zvvvpi420yxb4ty9l',
                parameterValue: 'jsllfxz4ckfgwzc7xsl5inaw6b5u92ky1yujaea4zzz4eywyzkq57mfgjhhoig0wqfr7i8j337xdihhbtufy8pybxbyis22f3xoqotghugmp7rhzzii2zigov57xvwu3mkjn3jqqb3luxgxn255tzcz06pug17mv6a32owjjh99n2q8xzw1ecdg1x4wi224ar8k6ls01hokgxukx7l9t046o6i3vangp431b9n4cg3njza368o2gb2ttaqpn2nrh1ugh6ja32ewp2itl0adw6sk5ts07k93f23tybknlg6mhtcl71x4x9u3gzy2wdlkcjpjefgmt6a410kldovbmbxbrt32d5741e0zf5bmo9xh8r02u5lp8ingu5e9a94vtzm8kme6x3nx3bp03s4n75re10hqcj6futu1r8b4b3z5d4rsb1v783nt28qdasae75nzcbgnxds0q56nan0kan9fp7ej2l7h3wxbwfo1qjnh1z9qbytlqmdkubrfhtnl6vqlthx8e4u25h2pt08mgllc4rhtj8kv9l88j9waz0n0k44o2yswodbwrubbfc0w4mxmjec7ui5je82kitbj1s8eg9xhrkl0uz3sno9xkrszla436wte2jdxrb7j9v7c8dm1690n9aj1owdr4vot3e24ks3s2d46itvzf8phdqdwmyqv5r54h1dzzkn2vl4smzwxital8xst7gihvudmrv9kf5i1nupf1jj6ono9kfnldkr81ev2lz6oq7aysr95eh12dspdnb9523epuscjvm5n4wgx7jdhl77wqmtmalo1w1l2bn13az0ebiz94oqgcdoupuow02i65y66khlxm5oj5avm7uj2jfw3rhwpfo49oqzupfi9q5998pk7oujebl3f2qfudb5vz9j15cv4i1rru5b9ry0y0ecx199a79nrjrzs3wt96j4gcdhmyg8dth8f7p4y0jb1c3cx7w8ed6vgqty0d33otvz5oohfwje373lgxkpg8uau95c3fivaa',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: null,
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'mjc8eqzlbk3pvhwvk1d3',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'cw4k5ko4hpb56hm7b89mfxo5gre4alrz2793e7y0sy0np9ni1v7uuul7dzboatgmldv780vt772awufbe652mis3dp060fcyf6uve5lcjs1ycvfsgfcy220u2qumscqh5nf072a2dgrb3fxhawrf50wgr850c219',
                channelComponent: '48abwkj1hdj7yyfmsc4td8oc2wyo41l2hvt0agvvfpqv2mhdxvl4i9om4u2on480qttr8yqdtoj6mqxfv5jx32rt9xtjzpm2lk9bebavjqljr51gxgdan3v7ancc4uqwcjalv432uvothuntlnbd4qfsoeqqv3ql',
                channelName: 'oww27bywycj6a2n340nx3mex8ab6bgkat1t5v0l33de2s5ivhgl6j3bk3zg4og2y6fbeva4s8zjlvh2u8mj7vt5j3rmqbrqsrbct7iedy5iskrcuk6ydjfxybnae8pshi0n1n5n31wckj28msoz93p9snu17syqh',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '56d9rq62tcozs5gld04c6qd0zuuy24047dphypgy7czx93e0g52e6rht1zernu7glflm9h0kpi5ct3vu880dgrlj2b9u7e2jjo8517dwnaxye6n4qoxgavuxv5sjmkca3cjrrv9qudvowz0bawufg7i0sqp24b1j',
                flowComponent: 'l3nsefgn06uzj5aqxbzwph79wozoglsyjgxo93xl9x829xw7ddul0kx5g0q3t0x6gb88agazbxcd73x2ycqsi0xqhpzdobszv3ef14wupj245idtoedswb79ltwxw6sbc6flbhn5dhaibbyhkocrcsg4bx8hwaf7',
                flowInterfaceName: '0d0fn52i6yi6eel9s767t7rpvjcy2pcb56yf41li7k7apxsg4r8rhmphequogqbgpyac0w4z82dnqupv8ljxohs6oix4ue0ta11qxu07jx9iowzqp4nvmaxjisob42mw5ecb0gj36uia326l18l4tvtcawtfi9qf',
                flowInterfaceNamespace: 'vsbk4ewwyq93tn7s95xc3sbcgbfskvjc689h5k8dr6zp63ypwblpg0gyo4gpi3npec2rrd95d6uom3nomjq4jqxtgp3vruabhv4302rq1lgf5vwpkgdijoa6l7q3epibvp1o24mbakpw4x6pr3wtjyca8muwozi2',
                version: 'qug2egcdbi2xf70j5fdm',
                parameterGroup: '9mqz1yn8irpm40qjr7tp1tnemnw6s6wbtyzntoh40v9kvz3wjwb7cc9lczmew3dts9ypiesu1jtkb3kb2ncv51hqbndehscmnofj66imh0bfbkej4kn5m38c4vpmets1obzltqswxafe027jtkwtplrmwvjjiya5vlj5tj2s2rgz95nyc4rkqt1oc8j11g7kfbp6rgl0zqobsy97t1eox5n6jyhhcst3b5u6zg74k3xdjli20uwuhi3hj5060i8',
                name: 'yzwrl3qa77g37xc2knmgsikcdq1s6nuenec7xv0qqt2lvr9uop5ijmb1d2s7kyheyzze92sem66skl665hcgwmk0vrwnz23hasjb5xe6yquyzangyohnf9c1cndvbnd1evi92jktqldrh2y9g7520utdbh07inhy6gzdymh3hi09m9jvtu17vcsgzhdfz6xfrjgkjc7f2a8cd7k7kdhz3lo3m6zfdjbmpuycx4nlbpdsxth3wp89nx61uh3y8dre0hvlqb6qbcdbhlruouk35y1mkjxdth096lhfwi2afk6rm86zkkvyjugkwo8l0lo6',
                parameterName: 'lfrzandxig8r9bbguka9pvsk8oz44eef9h2v1vktfron43984udn6qryc7igbpl1ewu88wimh6l8wck4w1yo7ip0kamqf2a48d7toyzzwkdn0gq6s4f32knddtz4tuvgyhl5qvnnmwtj9o97cwepxwi2ypo9tpdrnun5dlsej4ew08xsrz4uqqrqqiumr2vbsutrjq3d7zq6hp5zxxayxkogjz7jo401fe9qsud0d591chndciszno88nrk8gcoa5fzc435tbsr0f83p67e4mgyegzofwmz4g3is08mhaf0urvnwg5yzrlto75xxtqfn',
                parameterValue: 'ghcmoqtocnvd3vh0hfbf7gjarectvodrzt2t39w1zphsxupucurg2ixg8lmus70soahjqidflwzpesw7wu2ygppdyv1uasli5qw4y4u82hs6fdveyj0dcjpxzjkgbl6lkex0urszbahfvj9qfmjkbptbx7zkjeg0pfd4d9kxmq615qr9o5evke4sgoy2pk4m5g4wqvb66br8z6zqyvjbdm5chle57ni8usfmftyoho9fcoita65201fyup8q8psf4226x1yq0t7nyltfv1itxj7d9xbi6kbbuhf8rbmtkdnl7j0sgphc7t7pkqp2t8j50lj80uqhwif4xkcacvzrlsiq3br9ojlh58nf2krcyuxyxhnv41zoupu4w1d6grzu80ov8glyndhrqldsedrrojaqhvyqvc5di0bzqjy8j6d4j9g61wgp6mvmr3dgr55l16hgr7e88efsg8ergfk02tddhahj8mb0k9d5vj6gkb7izg77k6l25i7xug4xp897rdc1fevwiq26j83rav8scu0cswt9f7u5ufds2vdr3s17sgrunowrxz687pa1lj1t7ymo06gzak8t18av6xuzt1kgfn5dstdd43jzdu58eojr9jta3rn5j2npu2jcrnlgv5rt8jg8fmrf0b6yny3nnyb8b4m7a62ono49sw9xcho2xdj0gaw3dk5o12vh7ce0j73fw7dhrogq8r2sp6n4swi9gisvzpig26kfug3exexx8015pq94rj3zozzn70ng7kdqrpanbi4vvk4swl7vfe6bwz5rit6qd4s2s6tk0tkdth2pxkvzo48ox9chxsfg4mlpk9xjtpnnsxgenz7xmxjm5wxd4vc3fkpbv2qlv92e876rhb7dqo03clakl47rfjfsrtnalxq2zekrtf6idyarug7lkl2o36bsyu21kg0jdi4peqg56cxsrjqp2q88v5ddljw0a90wt21rctfzketqetmnxz5k0jkuompfju7gi3sx5qo9urfcff9o7pjm',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'fbeuc0guli7b6moh6hn2',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'w5qo4qr5ywh73g5hehwlsp8y7dkfo78xkhiwdlakj0jlp5ogr1tsi24sqv4gb69186k9izigjhd6918mwjz7f46wpcyw2affwk17atsrv22yhvd51uwmjdt3en353i85zqmqm47brd2g6epu5djul9pxfe4yjely',
                channelComponent: '12fmydyb5cl67mk5939ae7dqgz5qtu0m4ejobhorrcwfz5lx8bgb6eo1y1ut51s0ytk634f8xf0lx2cuq0kjt33ga7rpehh2h635ia9zp0oionytecqg4fa0u4yy6rjcgwnvxm2wwqznvkivm9ql5diyi2talkko',
                channelName: 'iwhsvxgvt8eckk2oe8vs2ovujs9w74abq4sx5oh7gp6ixk2x3ozxl2wq4omish9e2ic2ze6rqpgdgbnu70pmk5zf6p0b9mjn9nkz0ikh4qvpq1igr0l0jg5xeqaykxfd3dncm5caa0y6eq47z537bfqjoc9dts4o',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'qc6wv47xlmlyaz8xxsmedye7xroh8wsaoein9hild28inrju0rjm2g5f5rr4wrgby7aheyqzkimsnv79eqst5gp343jbgn59f3fpd982udk4p793mseir9temd9yx4zwn7nwd7jcpdfv21w7o9glrrqwvyc033wc',
                flowComponent: 'hvatkqqnllk8ewebxprowt0aambbfa80mkv4l9w5wrpuyunopvlphdntp703175tatgvg6zbv6k75bp6s37e8kf96rwc5ccs55zllf7k6f5193sye9np3xtfe7cczdlf81isol38epnlaacqe184q5ay45v52kfk',
                flowInterfaceName: 'cdfr78gefpprwiyqmow53pu4v0pnnnyg79dqm712m4vb1qem8ri8bx3ashgtbx6lgoep3op99ivivn9iav195ibmsous9a7m8qko8x3l8z99ifk7i0h5qek30a88duvsk7no5jpzwxembm5ddlkwimjm3igpgkla',
                flowInterfaceNamespace: 'kvvjdlgrnorr56se30k1gcrul4xxf7jq2m76u1jz3r7kkivdhpeiycgasds2l0n08vwc9fkoblvh2u2rb52904j27iy86iomn9in9ho6mrbwwfw0t851q9fi7jff7ntbdwh563035gdmk2jqjhvye9twsorx3bn0',
                version: 'ji0j27bungzhh3jep89x',
                parameterGroup: 'o038m86d5g70dtepyzccwdl9zqj6hh5uvio6xtw9gm3gpokar5fj4mm4heyc94xveec2ttyu4g6u3s197i2opx4690tr2avc3lq8tgsqr2aqjg5lwbers03exbpr2pjrarjksml975fjvvnsr8l307wp76m0udwdzgkq4qa3ckds7p9ismkxvgfrooli6j4c1xzf6pllwg9hzyiwph9v8so43a2fc1uudu0fmgzegqkcp9ctnps4nqe4h8vsgfp',
                name: '73ooechga6dbpudrqq2xwxfm5ihoakcwmcz2t144kg3ze1n41rl2598adjd5k7ncc8e2mq5r9rsdzamb0yndxdow794zbybmd4m4pc9dxpd0aau9c08a7l6beuw4ln48f4z850lq8ef5gzk91mz5tdinwr6bjma1c4u1d4oo3oic3su2m108oz7ui1e7mjm7sspflhabq8j35q6iyjj7divprwnm6covjnmuq766v8cr3zhxy3pw945jjxo17bqvrnz7zb761u3li8kaouyadbc2w5goaogv9l31f873407n5cruv36ooufifn04992p',
                parameterName: '2i8fmxrui2igj0o2qyeifp4m2aiql5vn7ikczneksq9o10x7xmkx6dyay8rlyk520ja486qy4wbikdwwd1ulax67238785oq1l17jkdmsdtddlsyj7ye419tlanjmp0ti8m35fq3hjy9fkwpc7rdricqlamwb3xsmf622v2ayzkzclws26giiu3toh5y2o4vv8vovvoijp2p0qmfefrz4rcwnwtdbwfbtjg4lbh5x3itrzls5mjvdlnid8b5nw6y2ot84eg9myhwmctcat5ukxv0lcbyzy0br8ip2tdsci2nlulh199lg4j933a7y7m9',
                parameterValue: '848xr8atteyvqxribs5jgvbdnrk5cld1yyb2nr2s6rha83ap9taehuf9euc34b7bcm6qd60djthjx0tdgf8celboxkfqvbemfdcr9n8bbh7vvxwgk6h1tgf7qs8wskvy5qey1dgzts3ti1ogyq16x5bplepudwxut5jwax45zpp90xc1fqjbgy95ukezq9ogl87ee2qyswak5rbvh4vq7q6loq94l7ropaqdqm1iv81ulq7nq5apa41ovt829pwv1n11u4bzfoyu2twvswuyfjwtj3oey6fdrs4y3kugm1mq7brsulfl0ilukfgc1dwsxy5qlqg5kn8hmynmz6s9t8n1g7qewnieiwtkev2mlln9ar1wnhcrkr84gev4nurk77kn825uhzrmk9cfs5anigaaetbhcb97j4ihvlxu6738uhnzceypq2gxscozhq1imjerqglin5ggo8xwjw3ywveuevuwa2mmc7sawdvtru97uqjnw7fnt6jdwfex760oi07vg8x97isalm424g3o0n6aflm9zfctbscfgt71kciyqc8dw2lv0zvi2rd8j5dw8tgtfyfl81nzo00ugr1jm3c23oajj4tkfdex16pvh38c7k8szzcqn7lrssrfhwls2fmxazf0fr72kfmeenu7ptqchkaaqqbaoai6k5tv6hslipe2zt9p15n017esqrt4wv6xzaomoos7dmb08p1a1isth5giyl3rnje3280zu05djky6i2on5uwl7he11fw17zzsa0d10015rj9h5jg2moorb7cthol0r2smhy1c7s4d4tjnoh4963qjr0vxvm1lz9x5j1cqy5ptwcrkvu5ro7ef5clbuhfx55rtz5px9b2sbuorgrqiz9raqywbyzytbt7k83styl2blnxcpgjs09rkvoq6uf95bpu88y85sz6bqzzgqntzyup8tmjswg9kz7nt1hjv900ds5h8q4yppnwzhnwhlvhgkrfd65or2e648pmy51fhr8li5716t8sk',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'm8ylaltz5pka107ytwy4o3lv331hmra2kpm3yu8per4cuc2gam',
                systemId: null,
                systemName: 'ypaiuwutkwfnp0288vi3',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'nmfhkzsf2xhxbntbrrai8zx1zobpt9t7ddvsarozeumbqflnadiozjnehkogqt7z7fnxe0nyjj8oey42x0fl8ak4i2yxbrhsscmelttvrlc79o3nwcays0l4g2xyfbsq2rehd9yggcjaevfghl94bnjfdsvfer50',
                channelComponent: 'wwyte1xhnnxzddj5omcagbozkcabu9zpbv6bmrt384vzm6xpx12nuxmyozgcm5rumi6lumdy3m2p33cfp26ifr9tdsw3tpkbyel8vmrmgi6bfkkyogxts3tjnkxwzmyn0ku65j961n74nap9pt6hqr21d0a1sfat',
                channelName: 't6qtohxbti6zpfdx96aen173a5t1d2ivwebxe5o3do3ebxq33d826tr2prpau3ep7id5q7l7w81jqt0nco9n8i5s979cr528qlqs3m5xb4a2uic9nrwjmc4myyxj89ioz2lq7rs7bnfn9ddo9hktgo3ad1qepbf7',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'agkmmuivo40g6jl4xof8oe0jzucf5ruppuzgbm4h1wph5nzpkr84lqg1h2bcft82y4mlsf4kvzlb99c64fql8vw6mih3gnpsae96wd3h6qotjx86ovt27vgmqg0op918tk58ppu6j70y3omikv1pyrhoaytmbu5h',
                flowComponent: 'nkkj0aer5dtclunteoiaojwcy7921f0onrx5ri3haed7dxj9du8dcpzm03eqar1hptsa63rahlwuc1dpb99yui7yppdp1p58zovr1v63fzwihoerdjizc5mqfh7yo82k2yyqhoqnikuetr4tsjplx66ha64vwzrp',
                flowInterfaceName: 'us8j56plwbyoiy1n0s23656xz703zdgpjwhck9fnw3ee0iy9qm0n8uwbw9w3b50kdmdjfb6p5d519tnbavbltcfmur2mvsz4yq864ve5smzkftm845y6fphia0dq51qm5racg2a401lzl75vqvckirqjo0t6sm9r',
                flowInterfaceNamespace: 'rkf1g56i9it2bheekq4o2ckkxzwe3je7atb7t8zp1p4rqka7nnh1jzq177e7ho4ypuqb4lki9892sa70h61noxkepjeu7lblorl4yi4bu7b2z0wrwi090yzn98rhm7dphfcw4g9aem3kx48jn9narozy834o5j9j',
                version: 'ewa5a77g3sta1c6ba48u',
                parameterGroup: 'c29ormd5ldmadpxo5vwpi88380tvgfryl8iy0dl4qasjusjw90dj9iph7f6hsq8g57ixwml2b06zadfi3pl0dkgrt3o5nsussawcbq9scyffvux3kb6bg8rzpkne2hf4hfpcl1144u87dyh70joiyapxoi9ure9eldv1jmmu2vgwx1f3jn6w8ugh0tw2nwrvgzryook6cwwuulmzya363u1h4qrfoxyxc0po6zrm7rsfi0l9085tdn3o75s4e5w',
                name: 'e1dmiyg004er1af1i26sheqru14tiar4flputqiv0dkv16afd2g35kqew0dlrjerkwi2v4l46faeuqndu39eqbjcvrrj4tueggo7naioug70olnz1jnljax7unf0v1vklsrgc3xohm3qkxi6xof5gdbungbrnr4imk3c8kmcaqd3c43nhvoj0q94wiv7ubit8hw9jhqnm4lkukuybtssoe2xmcd4np37osvkod9ollumltesu4zcsfdpudfwvhbmkufdvp7hjrplhltpy2dlkt8q1fhs6resd50ox0qak84787h4uve59ouor1d1y1n5',
                parameterName: '90g0w26jhftl2d9yx7hfpfxoq67gv122obuat4yp36va0jluu9bwga9lwhhzyxgzwihf6ieqpl4n33y58mmdoy57n6qym9icgepuslnd2zuixpx9bkl59laq3o3mrt22rgibhip35kut7ludfhlav6mo54fwozj7sjy7b2bw217zvtd8k34v11p6ulvjnl7iitpa04mq7rvqnd7j8l2ctjlkqndu92p62ueihstz8ac06hw1rivyyzj8tgto7qaadmr3oeh2sjenas7tcv7vznfkk1ci9sjuqcy4a4bvms9url8tzygil1whsyx1xu86',
                parameterValue: 'e9as61392lnqbpxwmfcczafcuqaa8zpp87jm5kjkvzqgg8iwskd9dazyk1guq7wst0kubxy2c1djn0l5bb5q1cuowquymjg6x2lxi0vv7odugfgktx11dc6zf0z80iyrbsk2xix07mx1wsh3l75v07udj6l67tqxqhp595jdiy059lv9dqhm1agiyh6soincngxlpq4qet6ivteu02250mz18afz5u1mij607wz6d22i7q1mrfxxe3ya47mlqmq1vy22krqizwmp7hrgd19qzn9fiqylgdqeyiv7gzgtxlobrjnj912asv6u7h6lgecelwbwseckz3i5xul64iq2emjmzkaiqtwopq2oyyvzcvdttsty5ovgo2477hw5ol8s8ehzdgh51x043cw3xbrwbhhjxolenmd1ha68rurm6vfs4nw7dd2xbr64g0a2xf19fw6h7f8ltguc3vee5qsm2l6n3yukkf7dvgm9nxvlyk5h3p0glvdhhqqe2mspbinavnfvuobwaj210q7w61uhpej1zh6sbxxsc63hlndebyayxb3sb78hszkfjim4g7p8q4ok27969g3ooqpv39xamur7j27dnuo1psxsndbxfmuysfugtha5l5nirw7hb70r96a3z8syzr3vlzbmxefkj0l96wp55zxh22b504940po09apu5e6xbxtrxlwcso11tgo7a5ed1v3pjazbvzab5lzn1m93f3fw4xofyy0kq0cbhxog9fwehlthn51eelhihmo40194zcen0nnlxsud3sp2swkh6orp9zqefxlannpif9z7ttz9plkm99szt3y62r53ynr0wtx6u6y9z0i1np9kyl92613aazcqxuc60f989sdv56b8gpnqb3d38w917xapt162g59hah7hah8k1zrf7v99hfazje77xi7k98b9iyjbqxhy3biul6ut9xdkwd9wlptaj8yws1p74i12np9zzdv9pdgoins9yy89gdlt4sywfwz6zoo2169jj2yi',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'fed0ygzqaggq7ll78cl2nzrpgjgwgdpo578urrnx0pt2x78e34',
                
                systemName: 'xit95roedwoc8mjtu07p',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'nrd6qm9ga8vosccunc885qq2y3o1t76fa37emkaqxn8bgaj40uyaf6om6pr9qowmda9doca4awbn7unszw0gmdlymzkjfknz96j1kp881lvjpzfizyr8r22wg8mp7kc8fxaoblzhejrexf7e14tf13sdz3629rm1',
                channelComponent: '5x66h4zvwsahew4bmsvqqo5t2kg7nq76v5lngbl5qdtj5dyfyp0wvdc5v507zonysxeux4lkopd8uunpcq1sm7zfscaj2du2ng9xteswttvntrugupq6hy6pu51oohnb7u1ljaog9rksyyap8ngnct8l5mg5xvd3',
                channelName: 'pbo3pco7xqpaww7vtwm5mwbkzd5qshddiovhv1ihxilzj1mv3o6rh2tx9k0yccu5ymfhs15sydxny2emyjnlr79m4614xvcoq444hrzzp7cvsdft12gjbwgf6ybv5q3sq9wqpxfoax4pkqu3kk80fcghlh2lczi0',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '8pfqs1i5i9rku75lzuyrffkk2aywwtuh4qer839hnd6jyknut5bp5zz3cayxchvty8vt4dn9z8nkj1czjl75hutz5adskmxsf9jncv5iksy0ftgiweoq30c495urn3mw15nkdeq06qwkbw4sfpycj3ez1vnnijwc',
                flowComponent: 'br08ed73014ak98ylivne15rnsk260gtfimb96bensi6fuev7gu40zm4rebwas8egjh7is7hrq6ggqkmwrljptxumn7a2qi3fxyss9i95tnja5llo2fgrmh5gdw80ktbf7sqcbcctcimm6txz4l4c42trbah3cw2',
                flowInterfaceName: 'rrtflv2acrjps16ir7vxky0pwpuldivnzp8fqijkvopstjc2695g9sbktcd5v1cstntkxnbrdi7jdbvlvu91lxj69r3fzm2b3r23lxyn9htzl5y6b9b6sq9glz6r5o3ftje12i7lhsrk5ttwljwbnidu5a545n90',
                flowInterfaceNamespace: '5jfv5mwhaf73gopnu7x9y7w4rxysr79bu1peo4q7ol5g92az8sx3lhaw71yuvu2pt7u0ltias98rd6wsk9ozeyxbgky7tzfuull2igs8ijze8zu1dh3r3c26fc8pkrf8g0lzd7nmn99fkm0zzpiel7a7na1qnom9',
                version: 'tnbnbewmfddtxj5xizbi',
                parameterGroup: 'jdrgqbmep29lrdstjgnqqh61yplsur66muvj0gt4cctcc5ji4de77mk9vsv7uhihuispq7cbhvvnsyiia8bhyqe0mk1jkmz0vjha7mv1g8ua3jqr6i9ikw2op7qmpjlxsoepwf8794hfn3sirmvq89rcmzsftbiqia2udak84i37i576ur4nueq2n4on9ooqphyj0n3ydvxnl0p4n2d052qyiif2wh9v615t6wgvleiq6ggzoyddmfyegyj1fr3',
                name: 'bbv9k8yqbk2vjdula10tia6xtyft5qom9bjvho7kk4zypxinxh12cx08l7pxgn6s03iemjdvfzchtbrz3n7s2h8httfqthg6nvh9hjcut2pm97wxgxevv5tcb6hg763h3iv681h5lxs4qm312rtqpbln8fp2s9fldjpd2m8rlan2z9r4zu04o0v61xua3n3lxfnet1fhs6vvbj7dbp0vi55s8t5vxbmb6f2asr8vpzfv17efahfn054llzvzr8qcts2w665f5xhcq4i1djoyke8y30akfoep1qo53d0kuw3xom84et6xbt62oi16r417',
                parameterName: 'm6q1unp33hrm9ompigh4cir0wgbcp0h5epnqwt9u3ft2sk8d9h00ri8w282z623h0354z8ymyltf1fq0dmacdtvs0mu0hk963vlnumdhr22llydlfilm9hw5ux7g72oimi54ofjnhuu5wuc2koljp5cw2udstfj3uy27dxf55flwp0gzu5zidqxasr1swq6ezj7r6om7hns4fvrxblx3pli0ksi7td7hhrjq2twkagqsbjsraaywlxe1n38kbcztoo87adbxtlrt2377h7o822ubmmdjnxqazbk1txk0qyuij55z3gbz2tjx15uv0xom',
                parameterValue: 'rjqbk4aihul2n8qs1jovj904ja9rsllsg9kxvdmj0p2koeva1ve6hz6q07drqkwye9myl5tdpuluaw4lsy4tnsyx1vi3fnzyrpnhdquc136ujj974owvb7n2dbi4r41yqm5yvzqwefva2wlwxgo33qvpgkkynkardosi6plkishzpvrbhmfh8zyljk4ctwz1pgkumof5o4n2h4w8tlbx1h1vd2fflceys5kffqzd6f0j1lsftlobgxcq7qrjglringev7bqhduwsa54993pdh8iii3ji9u7d9o2nnv9ygdtrnc7pflat82iogp2wc3jvzsvmm6sen7i67cx4ypsxqrpqcwcjqpltetjmuetqadlqa0rt4s3v9zg49i0dr6jlmjvww1he4theqr8uzkldtcnx5xkv99n8mcogqr542po9xcu8v8e051a29laq8pxq5x4p30ahehdc4i2x6kq0vgk9spqiylac73ab0659ecohvujgzuv46iy8ejxvj1ruu1pzksg10fohxpfkso5l9jrrcyuz8tarhy58qm6ih0rokdo3wrkx1ospkmn8o1tklymn7988t6go8ndnvd7fe8jtf8ulcyhghxuuog7vy2ojmbrc5ywctepd71i23uzvp2q024o4w1yhk1rdduacdsfrjh2xmzbsjb4ppm02gkxpvasj1p7yy03g9dl84hz3mlodca4uo0yficm29t23b4k5twbybzxitkq6dszu19lr98x2h7x4hjzpw1kar6bo68p6snzzhjax675pcd642s1d2nvbc8vs69902qpmmrozsfsgk7j064iniff75rrspdusgt9ffn3drpt3hp1cfi7ud8jm45nrxhd1hcm2kgrtjxbdxwsdzr5y59sy7tz4in3eorde1ta6c91si23a41tsquna21h583npjnkjlow2baqi3rh4ekm9b66m8y1f40nw0xrvze6d32z13ij68e75xgbqd66zgllc5wlm65118nuh6ezv9jvj3cec7b7a',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'nwo62f5203y9fax2prwzmortrr54hk7o7dn7ep6r04d3vgu9ls',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: null,
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '1zzrab8uiu5cikoqfwlq014l34o32l2y6fwqg0gfuqj5c4g4084t9as8kehp2jabut1y1eqygl7om46m2hgd5850128qsdhr9fuf9bhi5s1sskwywadh2iudzee5vdij9cifyouuybt92ww2dkx8n24o79d8dmm3',
                channelComponent: 'l49ckeeq3cul7gld5thfx53gzsl7ltlb3wa576qxmd9cltrntkzwfd1owpue1zmlfymscutmof3dh3judw41m23ma10gd2ktuzuok7tdciak1d99y5llkovfasexjk8r22mqvb54lk4nv7sl7phfu8r258rmxbrj',
                channelName: 'xef3m492b5rj1n87fv17eqxcin1q0b2215fkcimcr18h8aocz0y6ws0qovd4t4grgt5agqt036o5b0trxxv548fsg2m05kks4qx4lya21hzenc1rjd767p7vwak1hgbrnlte85pl1xyrs50skg64pm8esof2obss',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '0qlkn83po73c72hgch9yeocq2qgczub389454pp6l4u7d3n75c6lrrb7s2c1upiwyom3cly1owlyfmwdm4cqz95qhnlu9an54in5rfiy8pxs0j82j4xfksxpih5007sks1a5xxd5ap2hiyx2q6beeq909by2qw42',
                flowComponent: 'cd38p1rpybxeij178qh60a6qu36j1z98gxt8h6tz0kjhghymycp1zsunzoqwkmjbzod7scavnh43paa442nj964n7zrqxijpcct9q88qwi3fmlu9hfah3f08ey8sjnaiuhr3y4ajoneau2ur78byzuk1qlsp4wtu',
                flowInterfaceName: 'tm3n7wihz74t2l3t32x5oi95hykakg5vw34j5bdkc5wafbpaz4feksmrfvxzzcrodt63wjhds9aol682a1jz6d64yfrbgkc5tkpytiwhvmbo3rwrb9s0hh4318qcz1arh7ftp04yn9qpe8fe6lw8ra5n2yaq6ua3',
                flowInterfaceNamespace: '15ypj6fj5jikf0y4gllwcei7vgxee0df7uaqhwufpds7rp4ph62bz4x228i7s00bbytvdg0monxwdq1bn9m41vsuymut3nuq7427s98lkjnlcqmh6kpablz82v0gqulvmcm7klzjrr2dny41aczn6zn1a390pafl',
                version: '9d4sodbrsu115kjsu1fs',
                parameterGroup: 'cq5akkiv8q2oin8r78udmlx9sq8n25u0c13o5b1rt47o7zhp7z988sr5thyvr2hxaz1eoqjcut2i8qhr1a5b90qxm2lxjfv9pg4uyn76fi9tunjackb7412glfe56ioqnowk2yr0h6wz7ggpx5en2wm9hvpjfgsdwotemjdvlbyki8q37qvsriu9aaxlqqhw3jp8ogzaa4fh35z1elsjsisey1bu66g4muftzk67f08jkp8xaqcyf22gqsawwm6',
                name: 'vwuqpaf6sg5wy83lgf2pdezkj5eueidwikiw1ibw8xxowej0jaui8rs4bs9njlkha05tnducumgjrjxrb02c7znd1kti9rruoj2kwg4p15rpxx7nkvfcylrqh98ixw881sk612np4eubq5lcg2m55rg3l1a8yaf1obh9m1m2m99zubepa4pbmta0lbgpezw1yj67jwmyuuuqdjnoc0wx103d53qzjqxn5q08qmyzsl7p1oy8cuzvlz3eanqbk21rutzyxoai2tqrynh4rezpgszeeb66m5hij1qmd8xgy65k4blgxpebpu1gq2zamubb',
                parameterName: '01xf4ykc0raj1hf1bxbdlhhfx7qxphntiyxjxz60bkgmqzns3w0h4wkm5s0i22eoi4azyv822nbhi3vgji5sqmjsreqhabca1opf0r6j3pfxlx8o7hsn5cm14pmtb52bjufe1mj6fb31j60wc5pgu334i0w781kclt6djglcebavwi3y84hu46ezb7fps9ohvel0g17nnf9gxxbj8lopalrkm85jubobhubx6n7t868daztas60uixbx24qg0pjquf62v56tcyvp8xmhf727vyxqn28zlr6bkpn8fnbmc7bbjlnp372ztjcqns793syn',
                parameterValue: 'z8s1t9ksjnnwcxfciecvmh0mouwyah5o9hk3tlmilh6g1l4alndb23eriefmlg6v58p2rvpzv6jqh3d4m2td71jcssxuras28xsh7sa99y6lbhvhyksfuhch7de7mo7qav5k4bxgo7o0xwk8o0hbhq5mlscv2r0idlbkpuub5fwsn83autmyq4pykd4k4g8nh9ywcj5kg1eqd6obht6akog5h4xnwwdylkk8nwka4jhtvik4hvvz76iuzp5gqwh1eml0lcwfworg4rbsjmc0i3uyorfxvq5epablj5v95ox39bjsmefsn6mb0amfawzhjgh4yiu8um4lkd5nh7mbtur6r9syrok9w4enne3zpq6an5v2vbrx202trbepqxq806lud8mtzfbbd8o2ahonoqg73aa5cwovu26qpvxs09pzqr4jmprh44lmbpm3ed971lri9jlqfbkr67dzpjqo12hhc7k9e0ddf0dh7vfxl861c8czqtyipq7hyvb2icpu2i6d45muz7np2j0up375o8ih6l48cokfrjfef0nmkhtyh8xawq7mnsy0xm7o4pom2x2hftaf6c8kw1tqam6ld0fnlr5xp8fxv72u7w2t6egywtpqpacbo822apg4flfyrfirdq0qqa6knhpadx3fn5xy8gqe0ttmcutqkpkyato0udoyxur5towqew04r1s4ufkpoeq85uvk3fg8jahx8wfrk2cxv5vsvi1u3dm6gtnd7rzbgoz2hdtrrdrekn49c1cr2zwg8j092cv07ilaoyi67ss9ehemulunqd3s603592xb1e6pp65ge36fr7ferndgaxpv48v2v766blyprd27vbw5p0pg2o5ayd83tl7qpnhhko5cilgv48s2r2bzb3br52675lzui30q0uxpcks9za5s29m8l49q741jgxrfx54tsv26gtoljmwd32cb7npp2zdw569ju8py0b6u3wta1pt4g05kvociix33ar7ya5q75vgzl1wpriq4om5x',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'kzswyrspveg1mglgomqi8o931nytqmll4uexwiuvqtdd98k9pl',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'ryh8a40oe1xkhcf1b143s4hhwpv5twcm2vr50cq2til9vsvb9ja8go3fa9fcjr7cusq2dfvt64lp2p1etzs7ijrwq8l8ssqameordjopnvty9t255pg2ep5tsiu1dsvmcwot2smyznpgjjj304s7ump1bv3yic8v',
                channelComponent: 'nooatlc742es61dmndxo9r2ajywkucofwgyh7avndt0y82ln4e9vhkkae5ropp0rxs02yx9dv1dn0hg75vr6a3cwgw8xhhfjhukgrzhgby8zaomlnwsts4z7jb5v62oyepn4i3e0c1pkwf9quh85dizcbe8dwtcx',
                channelName: '8jw8itlxd30hfx0ggi0skx5zwvnoz0hcjen21e631d5lgljixr36e8wp6zzqdmzt13yjlxcdkdfelqs76h9tfp7gjt1yjayfjp62qo29t1mdoquxpz97tzwil6hs8daclbhxw3c6c778f7qedq8csp5xy1m8wiyn',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'unui5emv3vb4y4cegflqp8kut8jeicjew9479iwf85nrwuarejr9u0vzogx5zigw6xtnnk3k7puj27zolb3qy7h8833d3lz5xlsk0u7yx5kperir0y2hjbavxgvan8un1725yhqqunae99ycksa3g1w1g2w9rm5z',
                flowComponent: 'eq6zg3nczfvuq4bf2fr7t5efkeee7btvm1yq49442bat85ha7m67ffw3mdowqts9pw4bhozanvwlaua19v1t513sjpv14zs9mb44rwsl3yqxh01ubqtrxd1qdbn88b9wyne4g9sjbyt1ipmfllzwterwau1c6wen',
                flowInterfaceName: 'jar5p6420ff8273pfew3hzr2vmmf59mvkoc7fh1zeh8j5za41f6qvch7uemrnoxl1bmyvw4dbi7yamo32zp3uv7uwy4grx2ra0y3eeedmxandkmc0r85l48ec8z0h6r9k4icgw55zh19embim701u7a15wuinyju',
                flowInterfaceNamespace: '5amm7jyicfk0zdi1x3j0yj818v6sdasrmbbsgqqam144x672zt584o4byhg8iwwbpkzpsvsu7rlctw4uuy4zrnmk7jtndwbd5fdmffgw3ligdxepnaf6wrlsmm15n70eyjt43qadog7m1367l1ev98b60lixc417',
                version: 'm71z5w1bbj1s6xrccjuq',
                parameterGroup: '10ac4mkf8d17t9779gbcu02lula6d11b1xtwrmvoql7yahn2zkxk1vwv6nb9ca5310kan5juzycj5m7fxkzuars2pd7uly29y9l4olkwdq6gp99xusew94h80ud3u9quta9q9y42b8qq0y9fzj2lms95ubpt1nt1d7k8gej5au4eeu8o7f06vlpbbvxyqnc0iw205v2bsx1ahrxdfpkysye6aypkx0ys6vv1s2hyd7uvyaqzr2pxvjb11sodmo3',
                name: 'vs5wtjukbo7u5h0mcyo8ckjkng1hizjaiuk12jbw71x7e0ld63gpz4xwljoyg2f08yth47ekvs2gkwiarr1ili85wq534ula7dzbey06950jk44u79lfafxglw6vqp973mkwgulnnuggy3oubw14n2d9un2zmr8ef5l077pm7ys7dzqvivqje6n55fbmgx9yojq16teyedbajiywdocymxgsmomhtxzyq9ccch4xuwkgzeacn2vwz11w39jk2p1sftg964cn80qjkiimy3mqucod304me03z75c2sc7wep2xfd7s8uh5i6polpoxetl3',
                parameterName: 'pyfq4c2jstt0wub3d0stbhdqymiuxu4p9ko8zakttk1gk647k5ph4bbab3otcw25b22od3if54whoqlxkc1bb0gn0w3waslj6mkxqspba36occ3utndjkvjduzqbn1l64ffvyd78lu4d49qk00fr4l7he8l8q39hm9wt8ghl147ou65qakqnojehi9xeq96vjs5fb8g12is0a72rl34lr5wrij1ct62hujyl88q9gbqo3on5qykznc9h7veczb4wwdrgae67ynymm1arwqkogmiy71o9ly0bilw1hnvb6asosaaswe0hpchud0w7k9rn',
                parameterValue: 'f7qwbnw45nogwyfs324eejc5k3z22vf3saz5f2ayt3hq5ezvc36llaozp7h2abh27lvrs7nawudb042uvisf5z8ow6ye2c06j0u0l0isxzc4fkitoqcq6m8d4lm0sfcsrnz4scj6vqbxjgcsjbc1jlffcl8nvif7zsgn6cd9x5y7gmc6vsqcvx2i0vogn0i6ro2z8kwyrknc6bjxlyvuvyb96qjsh6g7f8t1tkinbmwypdr3evdydqkkeh293qebij0xejsn50zvke6lqu34l7t3kxoaecqeujcu1ajp346tq91ce1ovxgerydxp23ip2q7m46ksii608ll862pjzi9rh1juzg5nipqw9l2i2akdd5zn8pyjcybbnk12on9esse0przoo84837wjuy7ezu79vnplhn6zq3my7hjegr1kbfgup7s08jetr3tmv0dm29ni8asxnwba8fsixpjbg3hczxrqlhoxoshjj0nq3guc2tshhwfbo1xw9nn3q8iix22ueshfuwolaxmxplczvx28fi1aajrsn2718mjo4izf0l7913eqx5ro70w5cejcy6h5bh3bksdok394oja8lw2k7ew5sdbzmu7e5u07fx2ppl6zjbmgepp5yllixc6pr0eumlxmsi045m688lyanvcly8qgfzswmlk3p5i8732qo0h4j3dgcg3o01atlvclxswmh8u5u4h1m35z5t0q0gjsekdaxnl6b9h3lclf7ime02ll743rzcxpuektkkarddwffyjytz0pkqn91s8gamz85rpks5npfjy7u8cwymqama5px10gzltyp1h4olemlq7ds80s5ehd062ltuq6q5w0bdlholdmz6n1xx1ha6ctxkvia4jo2qsvsownbgeov76ple9liunbh54v38bwg9fye2dex9iij06heq9iktw95ah6col659mrez3ldh9bszv3mul0610d62ulghcq7auroo7vp0x8uoo4lji390yui7bgdbrplhdovcfwnkvi',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'm94a1p7t5oa3z6qmgxh84fdd8oy4lpkq72di04433qd18g33ka',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'qde98dpabhr4bf7qah4r',
                channelId: null,
                channelParty: 'mokc0m3jzpfttdskny9ykdfb6aopusy51jyemhkyv17pxbazx9k9phlk3z9zi248ghuw3mxuvv9i9gb2s4j4fvddauf6bjwp2fewqzd6c0rsws0t4va3i0z53wx0a2pr0za9ugm6lsinzoytofolukuwaei13oux',
                channelComponent: 'im6vjjfrx252qs5yvon0vpxx1min3vaknql6y2nr9uaazqge98s7ri027hzyst4m2uqy8ins2biyhumccwl2id0qfs5bvlc5g3w2k6ohguci57u6k7pw5za5aolzeg0jb4dusmuebw8chw6yfhwobr31wecmlr0m',
                channelName: 'ncoe24lqdv98ujzl857p97ufgy3k2jjqancwi8nh7jdz4b0gs6jz3g0v24botrsq4su2mykeojkl0nmqaudcmx99igx90l9ymxbdxco36goiuryxwtk1mic49bkl0ugah2wferopnkxvq4cztrbkd2cs29bbkh01',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'dl1lzaj7cl6ih116orntkatfs7rkck3adaukoicpn26lnzktejbubf70uw58q338r0uru7f7tlfl3ycfjzpdnyhtwa2td26s1wknise9c8lupxmbqxtueoadz7u7fsi3a2yu56ssf460kfffiuit1pl2zk7thvru',
                flowComponent: 'wkqsu9z44pdq41lppsjmmjqkxav9u6ccnji8gd4k0jzhe3ll1069k1na0avuxx9bd6b336xtndfvnux0zi61iu87ejiejiuyeipvpizulqx2f6rrxh2dtxb0w88lj3hhnj2mr269kebeukxzqb93jrk9ymno71y6',
                flowInterfaceName: '9x4zb4odcnsk2bqx4j4ucdznkls8nxzb9jhl56obsckoekvgt1wyp0t4kch723x2q339pshblmvrh79kig3hx0d67na660lofxain09hg07tj3izpv2v3671vv9yulvkt0o9j5cdn4l9i6a2yeig1obly71asc9o',
                flowInterfaceNamespace: '4ni043vvbqjwl38jj5x6b7s1j8yvf2ey9ouz7c9xhibrawwqru9lft1fnfboz8id5d3gngalvfn6xjojuzg74dugt1zi4l02czwkgeg7wvn3o2dhlunme1be3dku0f71jxch0bsemz2lxdta0brl57fo0xd45smv',
                version: 'ucp7pw7joew4q48ryd4c',
                parameterGroup: 'qhfe89uhqlt3rrm13492q19ofcl2rujfeybldtam60c6kcpocrhhstla7gm2gdv8j9wi2hz5uihfad9yn05f7h2b6lqef1bsi3oje0dyatb86o2qcesyyh1a0q33x03pekpe7fv66mf7tmhi77ivd78f1ipenaxqspew6597zray9tqgm1uycj4yq6sa0uuq4hbz4wznorj5sr2clakdxvzoev9ru74sirytxoy1s1v3em8sqx438yk3p0fbwl5',
                name: 'h8z0t07s8lzuc6z6u2h8jhjau2i3tgsqhmisk352x21zvrewdle5uy60e4tw80x52nw5gnq94zgdf4am7vaoajck87zd1qpyusfirvjv2mzvccormbgabd3locfvxrju5tnnj9wezf35mgc99bmks0vip70uzfitcr9dbs2510r6bltx3xcxngu772wmg848saw6oa914ilgd8svv9n3426rdk5ueb7f0vpi1t3h9qee9983ke8yid1vvu6h74he54zkcos16sz5ug3yiehw24llogjlnules5wmyetl7b8ww8o9ssnfflc7az47d0zk',
                parameterName: 'r5yaer4upfsc85uqx3hgh0ifswp3r8z03baoda1f3ntvfugvr1q473q2mx7b26oobgsq6xkq3myw6ilq1qbq46qc37i5jtrokozm95ugdmjee5kmul6n7opuklwoskpc3dymy9ncm0kq8xocqaltupebxtrs0wlqqn82vn2bdg6bf4bak1co3r9ll26389foxy4w09pxpcuwn9a5ctbcvi3spikmm0u671ti2hfehinj735my95q9kaz3d310gvp8l2h9s2lerxv5aoijmhl9top0qsq6r8xlxtp40e6k5v1nzmc2vrxuadf8ao6ot6f',
                parameterValue: 'dda197veui48nyen0bdbofshlda9hf670tmtzpl1lm72d2g9vegmsrsn1ipc57bsu6vfu7bfi4tcjxzgcoxjo4ahdjleakrpi2xdjpztxnft4z8hiqok7v6n6mudtg2w1pec2jbrzcieecknus3osrtadbmf1u52vatsenr9irnk3nevl0wl7q05z4xvh1t8owxc7we38594sj11w3o914ix93k604i081rw95zmzb03wyn5bcrpiuul5ob71wjxffqqwr6jqomc1k8ahw0ghu25q6az0zc11pvzaazjg5g5xtfo6p4yuk25ogwzp9odezpwzxbg05cf6e5jhjrj0k208k7h4s91maahctluym7mprja1aj7xj2z80pcu1cet7r54igjwmk5cu5tcw2kb28c752bmy0w3th42n3p0l3hcc6rkcw2s6t3uggbqupjg5fy6uraxw2ui3j7gnc4fl94eujxmapryfnj4fdhey7kcsc5js1yybhaao9wf7wn6z1r3evpse6yv8qc3lkb5y95wncdyzhuirwyq55i1i5hvw0dlt22mu1ti9ni746t8lx9qry3vzocgsza97p5khltzh41kqb1hnsc4vbgcj65xed4up66tinu5gzy6gf6ixh4t4xz2qsy2zildihebny6x3llarvbu8qv8soon8ynzbuyrkh3ptl45omj0slz1690rrww1eh39uvaxowy9wgjodmuvtggwc74rvtc5s1ngu7kmrbdywwivkdd0e5kbmbm8qixs6uiu9qtjqjuy0djxrmzlxwk0y9pws3bvusbfxk6tl0fo4hb7txgvaroh2yj4ycquh30pow6cgu1omgqtijydbelzynbgfj06zwm0j0mhof3qkg5f70nzittuzrrgrhvrj3o5lcfa0ox7i7zpthgzyrrxwvj8qez3r4ks7yigm2x5yzpu3b5b8r7ia7id49fgboe0kphdgtq7uyl9opfkgq2qktpm00ge2r7hhv3x7m9f5zaj7isx6ib',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'mao9fkcsriuow62kzb5ml8mt5q3hskjbtl4u3ehfx9z7f700fw',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'dxk77q2qpnsj7wfuf07p',
                
                channelParty: 'it4qr1noks5ajl7464uewohotvj113np6pd57jqy3syrunhx8tyaodrfpcb39maz3jgy65yh1bomj3lwq0uxcm5h64z4e2zrpo1a23u4a94z93csqpopqrjd31zzzjy0beo6udu871hzi5qcq254qofstwatys4u',
                channelComponent: 'ratfcdkv50rb9sz290s5o3ol8r1gt7l104e1jhmlf4w7fep6noi3lmjyg9na5t6jv6eymyufezp9fzv2wzi0rn1dwdtoci1fm05bywejpq00moqfg9nfftoasezgwgzuhuubva7lqhx1pnka12u879x4lopxlbsp',
                channelName: 'tvil8uz84xwsxq17k1ecyu03zmc187ibkk46nf01z37vdr5db5a953k56u8webtw55fzv37x9y5axbo3dsf4tt4plzntcmmrr6l4bcgv2962vbqmad529rd6229c2xjkvazb6h7dslhrzdbb34rpqpxu4b0wi6hy',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '766nuqkf7hby2i0c5asrh2poeiqh0su0go4q5euxxkb7x5amz0e19psswmxibrruzgtxi980uyl3uiydmcii5m4md6lu8vfqvi79ekacg9mk24i53rtlbdgdxw90sji0zqlp2fxtcxh0t969agu3wgy9hrh8x1cy',
                flowComponent: 'eeybdjxdv9cj7bf63knu29xs73r1xbf9wcwphi9j82yuehns0t3etp5pv57jnks4in3ot1mz35azbdili7st80cqm92aloxzxk5aqyvkmi7p62i4o7lwkma3u97zl2nkhjx3a9xd85xf3x6ig0emac7neofqoo2g',
                flowInterfaceName: 'akdjei3a9dxlcg2i8tr8djto6g3xlox9897duxtfniohvf2nznwmc6ju2qmququc1d7mdduqa81386x3owgty23veoj80pqhoaq5blea4yvpjpn9hso3f4x5pmm6clim1m9tbzr5whr8q16iq52l4cmyxp75unic',
                flowInterfaceNamespace: '9cynt1p3u0k7mgdva4d65qymn2xp4g4ghb0e0rpajmpes1a56oa2jzi38ybd6j144kynl1d2apps9j3tdobxuvd2gidgjjwri3h5d4ab7u3t0st5a4ole5o9lnuf6wcgak24uzlbxr0rbfwpiqc5ka818xnrn4es',
                version: '2hpvmhuiizx704lms9t2',
                parameterGroup: 'nr4bq4ska62nml7v44hbhw5rz5jbhgmhojfnkkqigvr362kabazcb5czw3blbo98n0f71lzcorw4f0vbmpghefllhgbeyvqrjxtux8f3vseepy8kpz3nw0jsyuntoi6f6m2bqlo88uxxn3gey7k1al8qx8wc9f1fdcfs4ruqfq57h22wbobsllgtp7wb5wct3oj9vmldh1y7sjmaium3jg5svyvnl8gxwrr6mmieums4cs3sx15fgtq8pdnsrjk',
                name: 'zpju9bhnqnhilngsbnnui7b7dymjeoriai9f8d0bao1d8ef1qglh8qne1345l1p4ju1xbruqmk618r34vph155o4u9gdw9fq2jfhkime8j3zp1mh3xlcdtc1i81lggbt5bqapibp7v9d47k4m4hlotunj18mkxmilk8bdm8lh69qkpsbla3fyy2kbfnjroimx54jbuvo377hot40xxjjt8kd5wskjxx0tgn8ni6v78zpjqwptpnkgn5ac9kfojcld4yajj12y8laj7fej8e2460587t4yst27s76f4jb7dgtz0lbu6roa8u00pj30cgy',
                parameterName: 'vpa4w5rv649gw7avodhvs2mvgdzsx3vik1fjoavdvfecacw30voc6upc915ypvzou1194sly50hmt75wjs86vvoos7m4c3k0hzvqy34o1aogh227ipx4z9e148heaivbqx2xc4pj0w53ppttmrf5u7s9ga6ljb0xymbrxv4shgq66prmybbl1v0slxdnjsi6v7nseaorzphqrxyngoq201ed554d1gveogvt611vuyfil3umpw8a7g25yvjrqaf5h8es35mrw2manmyudjzex2vqdg1nlviwfqgx882e8zvs7q6c4grvabrbob2xrmzt',
                parameterValue: 'ry0gtjpt5ko5unxhqpzlthqdc2tg7bc9ff0jb0z0oz6bssqrrit2v4481kupdrip24ahkt28vklt0narj18pk6pnwb776kighzqtbt647rhg164nysjri06w94x71cniwfmkarhrh3dkxahwmwt73qrzs3hpbt5u5xpyh503xdvowgut2e7n7hmjl1koggwe89m5zrf8p3gnhjfq078ozw231ydnk4pfq2onwmwhwyox679hoait96hn0upu4ev87u9ipjqiiitvfig44irgwv1mabslzrga4ilmwmzablidqgk3bnl0qho6qt3alsdiq0gkp37g9fnjtwbzbujsrn00bv7npgk00zqiu1ihz5w4uh1bpqaa52a7rr5haqaiss06zga2qukg11w3t3vl2go4u9ipv4mhuplatyro7fnq1df6wdfln7itmwb6flcf6ulfu493qp99u4o63thunbd71zwig4ghewr9mvrf2wa0ybwssvosdyw1yi44mibjtx79v4hrozupdvxpyzw5hio085jzuguzgyp016rmikorw36ygwfhoumwqxd65r75qe8jwxsiurx0btrc26wgbub4mleng8kf3ppf75uqqtn4c290fxkyb1zd66u44x6088eaplmaw3drsjyr5q1pj6885vewt815putv5nwxv0cgu1wr3p01nxhcf6c4elx0gj4efn61mpjm0w8qo2zixnn0ubmcckh1eathb13lumtpf20uqh9o3wgffl6ziknxu4hwfgrrbgx2f4etl7k3xxaiwtjn4aqlxfdh41wd4wz2x5lk2x20mcx7adg38vuuj9o08lgmmfd2lgxj6q5p4hg7g6svj26i2wv2zanli39hr4qbepo20j0twj6vdrlbab8tt6bonizj0c8vr3bq0303p4bn9aw6ran5h5mu3xjpfydyuk5389vypyqukuikf2dggxhgv3y79bxzx2iup8r5ajem8k415xm903xhsjnyov8v3nt7tptd508gr5ud',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '2g5cd90wu5lol156rbzw6rn3o3kdnhv9iz99xm8jzoh6g6npo0',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '446ou8ifsc41iccgs246',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '4m1360bnlq2aecsd91pj7cbgkt605ew8oy87n99wj4nrjtnol9cfb5tycrb315y6rx9ikd7xe5j52wm9crlsma0gt6uyt2dfv7053smcbkmfj63ywetx2h25tsqzie3xnt290w6j5xntb39kv8msjcgqdnmdstbt',
                channelComponent: null,
                channelName: '6nmd8bgkvsu8x731p55qb9f6gwom06f1ztd2t16nu1mezvbag6921wwwdqmoegme3njnr4u35ueavmt5qqwaypk6e542vhsp71l86u8eomdm4cj05ipvu8st6xk3s0b2a0ro36yz8rmybt8b5hmuijy5t5eiqspb',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'sh3nvr2wun0ybb3zbf7mkl1tm63eqvvbp3khrjsw0aazqwcjfvv6dlqa2p2rqeiqq1x7q3rno5o2utqr79vz0ah3ydxwxgvcmknme3zv74ua77uvqy91ngo6qeejnosz27jyrrszksx7h9ocpxjb95yxoz4ddz4x',
                flowComponent: 'som0szwm94f91kqezudgclbgobl7hxpldjiadeg2eal6duoza8fsvy8ggbrj7n6zou6rv86whksj5ijbs6gpxt0lbxe5bjdodscbrqlhph62v4zuy7637u5fkhkt72jcjf0jhbmii7onws8ejncknioaiikzx0ou',
                flowInterfaceName: 'nwsbidjlux56c3dudklanhaw9bnob1x3nuy4otkzqfyruy4c5tmn9nl4fe4mn2pqc9lbdvax0k8syvcsqyrjfvqcy1ctih25bqbqynebydxcbsqhzaejixiqyz8esuuv009849b438mmoqdon6wp1jn4pj6wicut',
                flowInterfaceNamespace: '1fy0l2vw46g4wi8powgqfrwaqjha66wtn3tv92ynun2vojpamf8insk9l05ax3pb50sxkyzjqkonfpi55r88e79uilbtq6htg1k6mk9teplfq3ftiq5waq73if9hkvr78kfftvdaqe8e92zr8ucq62hlxbhf7dj3',
                version: 'tomzfqjwl0zfis2wsp0j',
                parameterGroup: 'a96m0dzxqvc4u5haizirh2zwksfo9qv0bfv41zrhquw88q24dvf8gzjgd251dw33hfcan21231ykkqcdwfxk237gaw72oxdwgtyveki2hrmwyigk3sl4qzr174djn7nw5cgmbn6qlrwvyz4y694mdyi7j2glyxgj3lhd5a7v40g0yyo0i43i09iduf8ck6u6j6oij0xf49d393diczlmaev9w701qx41w63kvaro2llzqm17e6cdjq0ntimi59v',
                name: 'yfswvi4ngapwcizclyy5wqzpcdtpjzisuog0jrm9svaw21a62lp8c7pna258wyx2o92xgh7l370xvy1v3hhm1hfqt5v753aq7qvs4w6m95pfhmsufvnaufbh39pmucv7sfe31ps91nwgtqctkdkukenal07clpaw2rwe5e0kcnvireuyl93x3aninqt3rbua0ma7o8eoj69crca53v5r0zkfrxi6nwe1evw22vpasag41wreb275m4macuivhwvs9rwnoow3lmhql3sor0wwlliixedlbts8l2564c2wcvlud5kv0jis6ggvriegp4ax',
                parameterName: 'd1y8fnn53lgpq4h0h8q4c6v4vld5z5lt6jrzgsd0wmdt5okra0wmrdg18utncmicfhl3qpfy4rjlr60b7wl657z7e61k5ezogc9afv7llfdztpkshble6t1eletnrwn8r1fcegd0ypmhkbp3gdegd3sky48ql3ojdtdcjr2sge3fczpsblmz9yfz7xu4fof9zuh57zb1yuzv8j080oukhx9oqyl2nm7u6xxflczo6drne9d32horkz8gllfwaff5dvl6bk0zh89tzyiyh4vsdwhj7qd17wsnfq2fcabd95ezgzalxihdn5qpixnxj8el',
                parameterValue: 'lhpxkynw0ecn5hzatuf74laoeflnwbmy92urypywxcvda8uvzy5tnnoso9nxt613iq3m558me3xwhfrl42x4apeycdzrrosqjw0luvbcgy0unida9fs33z3hq1kr4b70t3gyt0tf7nyx5rubia9fkdoqavv0lmix8k2ric82aauu2lumm1kpn3uux7iqgmvyz6ryi6o2q3vquzpn9icgsw2mxufatefheo5413wvugrj8z9jn0iiqpps6jx75s8oz6go906aoazowqs9vk1oeneq5fy7d1caxh17kq77m4p7hy0onwo91acdvxj4krt0oy98vmng72v22etzabuxbhu8uiflpsdloi2r71uwtpnqhxdki1onjgeoe5umwdcq308p2zlq3pw0gcpeqs74f8ct8ygq27r83vrpjw33aeg2pnxhpt1plevs2ps5bmd1x1zcg8pn0vhkgy8z68ali9l0lrdrkjj4ecmac4wxoz5zif60a96ywbk3bs6ypupjyaui65mm0ylrs58jymsd25xsjbvcbetepgswns2j2fzmrdtzmxbin4o3zoyf1s7ly1r6s6y7hh0trvm429zqvr63nd1365nju4xkp7bvepfaumc2ridhvxuhpz6n537zesl4f3s59mj55g98wm6o07eelxwo7x1qcjl6lhvb41js3dpvx5mfl75jyuranfg060fp6pems8ujz6q8cblatjpuacrt1xpdcmco3r7716tipgndt1ez0xcbf26jxt46tv1wq07lpxj6rbqm9hzvyns4n2i7hqkivq9uvwu73gwy7k5v46p0tree6iklwwsbg47o2s320jpzfaawtku1at3p7duh7wp6wqtxlnu6t424c0fk9pw0lfvqgmvx7e6scptw99wqxcp082f1081g967oa4sf760sve6vzcfmr3szxk5pu8una7r91frixnepkrpjowgyijutpzuw9hgfqpi12t1zv3ealloq3nnfx247qgvgic0r568gg6t3vrey',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'anbxg4p0kzged20h00tdcoaw7k4zukx57jsjjjgl4b8ui2zp57',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'tnrzo4828dkktgkrn77h',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '8j4pmhpew8ahcrqqpzu7yni01awczyownv9xqawtko2lnioewhi8h3quk30hshqy1hn1o6szafkf9vktlp8suuyj71h1c8cdorpsj4fnktdlwahw8wzv8gojol4303n1f44zyhsvbnauk6d774t50qm79nptnzey',
                
                channelName: 'yn7w30p12xm81tnwvrta95vyo2w9ljih8auesnwaz1gvv91broldkep0m8cpkweqps9wt4fzs341t5kljs5ntrg5an682geggqbhdw8wyogtskrbo11g422t88jixjmwmghc3ru8xzcilmg9mbk9x404dc62fhm5',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'evbfs9d663g99nh2rqvxn2kb251ufsrrw6mhwkyfcnsa9hc97o4jjoqjspkgcqncxom4v39jte76y9eb0ka57cigfigswq9vvt38md621u0yddmma7krqlprhp4ly6ve8xrxsy34ze5wi8e5z8jafl6xout7ti5w',
                flowComponent: 'ykjonqyw7bnntrkp5u820pljt8s4h4ut42izz26hsubq38h8dza5dtp9r0hvsubm2sruilmyne27ym3lcdtffzrd5ihjczo92vj3x0t5xaysrzugoqzad0r4eg3hp62t4sihwacbs3vuthn422lemwy59dv3ohy3',
                flowInterfaceName: 'a1c7z9gn92hzauxch9s93qmdgw3nsvuq7showyqfdon8z5bn3nxijdn8mr57gk3l1a0vb65f33f5pwpovxnlgjbnkjaqsydpye5hxmk4dxet0kqu1tyxrstdhh7vzt1yg40vzeuvrhnpz6oevlkko3kyecbljhg5',
                flowInterfaceNamespace: 'vm7oge5wz0yy2go96dvrwnopts6061u2n70fivnrq2bl2ple6h2ghu4v1o27r52imgo8tkjhf7ajozr0m933hb5sgj9lcuzvypeoo8pldy3mjj5dshgi2604e3skh47wrnyd0jlbpp8t7sognx78dp8spgk57d4u',
                version: '46ntaql4lk7tnnnojnn8',
                parameterGroup: '3w4t0d7s58rsvde6tibn79w9lt5r9se1vjwblgqdgf5i2kknf45d2ac6q2hdhcj0cr7uctyvbpgbhr1elyl7p6z29t4l2pr5wfvr9fghn6nrmbeunka1lqq42n0zc8pjgys9q3ubn0d4yeqiz3sp1po2edhm28agixmk4icowtjje1t52b2041qc8dahb6wxb6833rnlthkhdawpzozuk4pf5n56xd9urrlyl0exs5pinmxzzhqk29aafynboam',
                name: 'fi3iqsiq0obkj98s5z3c8fdumr854jpldetuebqr9p74kkex32zeheiaqvue6rwlew8hdohoxbhd25sq1r4y1lvezp1nqajp6bvgjv3a05syzymsaroiq7mg9uiixt7q57fztrgoahty5phnvywfg5s2dfcasdt8ltjt4raxsq153rdfql94910p0wgjf85kn1ezr9i6d77gh4z3atay54icq6i4p1nep4powyvupercvum298dg8mgk8au17n04ai5pxfrj89tn5pxukmk4honot35y1w3hmi3yxwj3ac643ks89au1iqwnmdrxl2up',
                parameterName: '5s9eoyuzrzx3cs8qwhxb2tyd2prpfiqycl2bxqk1gv39yq8qt8s6xhu5rivvi6kkcje3oe736d7idbkd8se2fs6jndalfxd5av3q69zmjhmc417x05ukvn9owvrme3zgsl6td8m23qp8a48gvcdx4ngh6ym1ezaqhg5vlhl671yi1wzyw61uag90rh5q7776ebnnhvzlblxnseaqahkkcgbwqzhp8v43py3wbf6h4uzf4eh6xm2kkl71krsm12yay1vz6iwij2ig1cqiuyc2e1s44jbod76d8hqu6tho2nq2nmbm7qicyn8vzxckcj88',
                parameterValue: 't4p50vch4idrrco2zd1qmbswm0f95kxpb505jjscjh37aq9p029ialouxo3yfyamyv51na30r3ucb60xty2bcu1al8njlokeix69t7hbdw3oo9knfa1ia8qz152dxp6u2029jnxadmtensw539rqohx45xwmv3r74do6qrc4be85tv98rlr40rhy8c687zal6evkdr5medde1k5l2yodyrs10dd8ygz84dc664i4ut0mgo19b1cv9oecue8qlo6pi9l0vbgd2jjb81cb12qp07il682f2h14clhkokl6om3i8j59212kj06vo9hl9ujm2p5lcn8v67nkqbebgvvsyt6wd2evbarf65n5gyfqtl1wequlleb8d02yr3awax14r95gvrmn7bgnovdrvbxnxnjcjq0v2xzya0e24prh0xta8wfh8g8ndxr2lsjoyte8was9k1vfg0ig674l9jcct2qwnvtwvabkv49rz7u93ufgpta9ecaqcmda8rugk7ya3vqtt7v9q8sqxpc3u0o4pi2ajlcbay10oiduq5qty3gtecec2rzcwbk0tzf7iqssk98xhlclcowow11rfz98zw50lhg74f2z49ux1iyavqj88hnmbiy3grsk2luosf4r8qx65wwvvyilhm2s8bc4v6acvu7wnncvczgbz5te5rca2njo7ropj92vdhwy96dv2l87mjt1khc7cutqzkilvw095ae5ofz18inujfmo2tmci4tpoe0hvupsyj2j5ll09ldhikfzejy02zest3t87fo17m4hjxuoiruqns9cy00v4zt69a8thfm0u90lbv6ny8hjbrz00x8q1klp6d7l493z36ohnn9dewbzfbi3r8tftjvh2ozhgt8ez563iwhhm741yptkb8bai1qvgw2wb2tdkma5bawd7r3ht1neeqn5xvkfwea10hm2b6o8nb47ik5soppv84ha4kjo3fuaxaqwjgnounsjhcgbstczhtxsdzaq8buqkm4d5lewc0wr',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '6lzf9wq5xnknhagk2ej2euhtdws9y9ieu1rgnfw3nbkg5h409a',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'k2tit7mxjv9ostcb8cq4',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '7qgiwhbs4he8wgsl9nls5fn558zwcejc2aemne0uu11d5vxd5jn9cuzbtk7mik95mh8sywcz1ex1m5euayqumrnbwgonkb85314t5d21rqc04d2l39wux1y9dp4piefqo5bw6zkqz0x2pygpop19lw1tkt7x7qx6',
                channelComponent: 'yob7mflhz8pa0uoybvqsiyc99plbev1iq3nku07te5v923ki08lbasvcbhs7q2eopsfgxcxflj63b88001nli3z4k3134u8hu56pfb4227nwpu3jjliay2p9dsrb9isticrza013htdrk6g0vk6n0jhwweyh1kgo',
                channelName: null,
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'azhsv8da5w4894wjqwuvf7pqfhmrxqijx1h2hg5pt2szs4ku8xb67t0wms0c14c1ba7elhncwxe5kb8sd7fthks7x40jcn9glehw111tarhsk9kvxsbpfowi0it2f9y3eb7g68dg0zvntxtd5atv1jk9n05xiuz0',
                flowComponent: 'sn4ceygv30vi5flq8ilgudlglz72qu1bouudfhjgafouyw4vxjrha96stnsizmd5if7uv2r7038vjjy0xxr16if6txg0ckqpbg1edfqzh5yesouc2w1xrerqfogn8brxowf6swt6c9ap0ppwgk6nxukps7jlkiyd',
                flowInterfaceName: 'pdztwbue9bjc5nex4en40juetg7crbw5iuxkkrvil244gl35zgh8jtpcap3ttu3naspr65zm6p9e8qxgzbxf3dm6h7jmu0w5mtg91ao357z03uhsiz8c0sunwxv4bhmgoffcpjiwhx4uwiee7olzuktfsc6bxwwc',
                flowInterfaceNamespace: '47omxx3jbyhck1w2kikx0o2xwn10ju208enhj60zkh6zkm4yu7rajpohmwsowbqbv9vyryn68qghsj45aqxcxu2fumavo4ry345b5hsfcxl76t025j5e77909ujrza5u1lvxxuknkukxg9qe67yzrgv3gevygu0x',
                version: 'yitnvg81pj7o5ilwedi2',
                parameterGroup: 'vnroetjsaowqvmvz554xv4v8yow9ez8cjv4a8ckhxvw4fns47vpkjsiazg27fyxam67h6aewe3o420w1j7hw0eip7gvks8tawxrxiole99u3kid9f2ft221nqyqqbhzbk18bje2uyy6gbsfa26l6rgz2nmt4sg1r94tp2r5r3ob94jeks2o0c6sb0e52ro8dbcurcmfve8hd2p8ynwi62ph8l7va3cdzso35ebar6oi3uaiensajgako0t12bgv',
                name: 'nrfkeg3ydra6fowxzj2f1ff22l08357i8o3li358hv7dqwavhgw8qywfys3aggn4zb0116rtakta4zipq5gavvqkr8pzh695q9pt2v136ol30y67263qelzobqodo3y00pa52w21c6cjv71m3qp8vyjs0737db6mum9e14voy9l34g8vxygebgqz2c1uzuqbl8ffhlmcv453aq4w0wvxahjflvmtjma9b1ho1g2ybuqv89pujnkh7wsrllksu0y0gs6gflynzih3sci65mjm3oihrhyg2zvb4unnlci62jen997mv7zetjymi2p1j9nc',
                parameterName: 'jxncrihb4bejo4hlu3ah5uujrmmxbkrf5uq9ocif93jv8j4rzqvoccsxlfmhmjpmeeducquoj73pic9izcy1f0gy7aixo4gnvjn1bis1ib6b2zbmkzxhdye1yfue2trc157zkmt4db6lqsrwj4c4cddry77opb0aetxtkwrlr10j9uqbb29spaz2eosid8y5iu57xed414xn3x44t0j9xpzwq3kk5362ub2xsmtlbeqpz08qxtyz5d8mwbwrvbeed7qn7mu147igi8c2wpmp4ua14y5xjusmdm2y8cjsx3ckv0ki976fi08ds2yyvtcp',
                parameterValue: 'w453ns4ez0nwuzi2skab9bldpg4tvfmz54asrjor3aoru6d6l5pninown8srmi6fdxycoie6tzhkm6qv640at179cag1ibor859f4m6ge14ixtuton9d13sdylsvbh7mbl21c7z2kkkfal0er3fzd437jpaxa7zc5uag614lzcgb9tgwjs9mmze6vfnkaxadasnk0zk3va97dpy33zu26thteafko3qgg8xa6txkvxsaayez42cncs2rge0il4x44nsr6wagezo9hnjw8lilla7arfqnrrr9980bcv0ghskv3cn69vwqo1i4hvozvgeqf66jral8r2yi6ycj9c2cmit318bdf0h4f1botix2yr7q7tolmuq83nu5l67rg8pa4mh21p60151en3b53ppa0sgbz3nv5zn9c7p34bvx0xzswkohmqyv8b47ia32y4sljxtb5ocnyu4bb8b6hr1nu8kq4dssnni54ouyiqk63xevw4jar57kc7pyflhotsemlusk6xah5r6xbqkw8q6zeidbbrz4nqjn17n2jjlhembgwx23lq1rh77yq077ja98bex4l0su21s9it939pfmiawewuecqtcjo8ubnyqc0zxg13pu2r8662o8tw6efn3dqwcy6bw45vnpsaqrbvm3j2wx38brgxsrw1z2p0oljgq8pgnwksent2v9szd63f6tuz75j21uyn6740wcssfgvdxbh0gz4drog6x2390vbjo52jgiqymenku8i7b6lqglrrmt1svd1i0s7bpy0deydcengpm0wakm6ow4vreawbr0llxtxylxkib3tarrbjt24ir2o1jzkjh0qwom3vq0w1iekn7xlvu6vf62mt2q4k29bycxqrxjez3ppfsep6x8fuvhanaoewvtjuutg7mdmy0ujg4aogz1p9isgqi9ubhicv3c23po04znnsnost52u79hu3joh7qzaitbzpucnyvvcobucxt4hbq0e2bwb8sqhswuzuw4afbkq4or3l62',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'jzt86k78r94th7y9saxm5b6rxs8bniel8si4hvm9c1vkvlejx7',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '5mhe0zs192m9w4zfqv95',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'vzrgoa8uojyp1jxvmcf0k661aftf4vykvjfw0zyh1ubtg05i5io0jwrw0mlr2cqp9zpzovgecr4q7vx8qtlnaqtdw7th73b5sbxuixftwmbiw83t1bsszz3iz7isyu0idr7yduzzvdwgkkwlresthfw7xap74xql',
                channelComponent: '53gs512ijdh1ipegb8dklzf5wg0pso4nyhxqn4qgzjfxdmu1jtbicsq4oyc1r7vtsziwlbj25lsb770w1jmi1lsezvvy90otvdd6rnu89u4cyigsgd4f094nrc8wjvax38y70epp67wwts7dokwvzp18df9fl3te',
                
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'dhl5pe25i4hbmc7d967ndx9eh2ork2bfw057lo37x2r45ammc01puxo9kxrsdd1y8pw8bijw6gucd666ycpi3le5vd74khx5qyk6nzjz9av1ygaa0pus8sbhy0xhbdvs21jgemkynpmgb5au0t8rkwsxlba1ynor',
                flowComponent: 'eg1c2ys8xvghg8zxw90eoib9o4sgzci310hijqxs03286jxj51fwxh5w95dblypyd3fx5vae3m2hc2t2em7h3arg7hfd7ehqwvzp0esigrr1atn4sg3fjaowa0idejhwbkfza0tsp6kgu4awrvymbajdknq1iqeu',
                flowInterfaceName: 'cpbry3cpf7s6twa68blhqqv9sr75qafqrx8ilgjszl4bt7naryvt14567ts2g7b29iomv149zj8vv5lsdhlfo4cmk68qhg6kq2p7hrjekwyp3zixw1noffss1hllp6eeccpnz6sf550nqcrstk779w8qznpgg8pf',
                flowInterfaceNamespace: 'dx87k7f1ka66buwvfft1vs8ld4wt647er3xwe198s2a3ksu814tq4lgbn8u74ph0y0q4g55rspdkz9fm2w8wt2tyjikgpd7vm0wqwd3an61b23k9fm6x2qq8sp5hh1w5pkv52inxax0awp2gw8qx7zfw7jwyp6n8',
                version: 'l0vndnjxph9im0w9nycy',
                parameterGroup: 'lz64n4ta6bj055oi2tyo73xhwmxem7e2np9gu1dho7ym14j9baqwude753yyyh9jgtm4l1unqr74aiiaq9q7d7sgo9pj4ib2hehcu0ntqd2s0eex8krqyq61esu66n1sl9x88xyjy51un30a6zk6inyuccfr8oev6ymatxlv69pseh3euwsqz6amxv8o8qht327mtak4hsqaa3y2su225zoweuha5nyvu6an9fv3zhb15rli5z5ob3yiqgmf4hb',
                name: '3mwt5hfvruu23a90q2yt12ue3k8t1jqvsuxg8zq6l6gvr4pbt2gl9gdco6xa7j54kda4je35zdirfxn6lzkznxzt3hied6zc6sd7r94b608malc1fcwygltv4vjure1jkqjxw41lbum4xmerri9d5rsmix9uw6nirvc5290f84w2zqj1bafykybgwzgvsbjutrnpdqux5q0qvb420v9ndeujhppuy0n4roeo6td923qa2a5rr0zjakj6u861xve5wndc5b90mx5abjmpqtriwgupp3iecvjte7ebrhxmmxpwxptsvjx2v50svrzzchzn',
                parameterName: 'f6i5ej7avj0zcd9jyyf4lbc9zanoujwaexxuq1o5zd4045c8jafga02uzgds40dfyuqk98x30ggoz2g0mk6pkpw48wnr3wyn13l1hetu6hyxcrviyl8oo8me2fqlmt5jdp810ovukhm8r26uw8r86itdb437dl2vd12y4y976t7u8y6a9rheukah7s7gmblzavwo8ntruq9fgp1d4faa0vs1zo4kxdmwfn4c9x2te92pzflqybkawcap8rlj92v7ddfxp16hgwsed4drcxstk7t1cd9f8qz19mdkatjruvkfr5efemtfiyixsv2zbyet',
                parameterValue: 'gvz2bvy62dxbolg5d6604vj1g34500e5y7bco1cszwaccjfslanqwewim0ifsndvsqhyfu7t94i2dassebma21mc1pzlyx2djtx9n37s5tlpiohju0t57b6m1hz9c9x5jgifw1j57etv75t0fzs6bjfazzpwe7v9vu8wry00771aydho6etk7d9sr7zgz3ahzfznkvpdw05t4g0dih74o2h1b91vzg1glldj3xs1phks3ll8qcux3w9z8lhpmsl18kqou21ckfonbjzb7xy6tyvcmw93bpe251uv8begsa8pv4dnnvcifiljwjq1ao90ciaje7qfg9x08e3nv8chlj87qfhpuavzp5dj4n0mo6z498g9xq9jvtya4niv0hl7p8tm8pftxk4awho2945r6psv5de0b029msrtdrdhpzm6y42gi6v91y8y1a6aw4vbd5xd9dyxc33gfkci7kjxq92whz48k0nui9p5h1dp93cu32vqzazwifph9lsl30npkrk3euuy8r9b59g8mug7c18hryeqjq5nbwgqbjem90i6f89ia1aiiix1e989r0ml7ypyk1wu9ikvh3a7ukk9p34gcrd6h2jsn99gzcnvki7oh2yyebld80nd93nrpgkfzhvs4161nvc3riijaa7cnoj7mqquftuvflf7xkyw0kyxd99ym8cjjj2ip2zkgqzoeuwuqf72e74r1hudixjmd6zipxd2v6naer9d724j74fo92hc6po48if0rxxl73i7w3j3yimxk0fod6c3czpswcxblr4mz26v132eksuzbkik1dc8ldzr28zjeix0vrjyhb4osidq84vb39wfv4p31ku6s85cqxl5eqvl12wqa2hlpf9vc22zydunu81a5yx6nej2udgvhxbs7qtmwldb216bnqbxhhhpgd64jv17othylbur6nonavfgq3ktp8gefpevvs8w8cdiqpydk8ttukopa42000ytgztwnwafhuz0mcoah6508le980j4hnpg',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'yngh8puzmeetaisgaldio65mwwkdsnswoni62n1k68uqkao1xp',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'gddebc3r1ospindkeu20',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'p2exq4w3u3y67tvk03hayb4zt2gox77fuzog8fmhkjhfc5c5r7syxevapstuj5c0d4n9fil3cikcw8cu4lo21dpugom39kkdemv0oaolxqmgaha8nv3zvdpfnoxo5kqk3jjt042urwaonytis9eunle26fqqoixk',
                channelComponent: 'pndfot6ps9zg05rla6tazqlgktgc8j42bovmggl1uchi7ggbbufkdw23r25cfu12eynlzne8pn3c9lw5jw8bowim1mcevddifax785m9hibfvwqr58wd2ud2a5zivn4ladolimykm3tz538njzv17px5p9wyq0gb',
                channelName: 'evo1ynbnqpo3hzdgcg0io21itul1poxwqoojadsa8xel3rbd41iyluzq5hbc4ybu2dciuvzpqpovv5t8jegs2gcg9mbm1rns4h3k02tpyx47og134btcutk4m9uapnfwjlapho80d77gr3p4j0002j725flvn14n',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '8yzni3hra1dsdfxx9fuywo1v95lqkmpzxg82ak3bimnrxph79p6ndm4xtsdkvk748ftlpb8swivkeuqnk7f9ptz6wjy74j7ndkxjj24qsrgmur1zb0nlqm0ol0oxeqljbsbo74x3j881svn499ywbbbt338otyjv',
                flowComponent: null,
                flowInterfaceName: '9bavsco0vz5r7fxuou4cqzmgl5ada7m3lah8a9cm6qls6uv58uh4fza26rqnm500ftf8k7kfhren53vrhy89680brotnccj3n8g9bi5f9rzaqli0ollu4p5pulpegbn8oceh79cw8av09f38pnj6xsgjqiwn0pnr',
                flowInterfaceNamespace: 'c9ga1mqw61myhv9csqcx0xd4htzhiu71n8qv3ucnpzzcmf1esy8zrn8wzgx6ebp09862yxe2reu9obigpntqyoyeopoi7h3x7ip5do7joadhf6y18bbr1dqbg9p41bi2tf3b7cpvamamhad6vn4t0x4v1xdq8ovm',
                version: 'i1xmm93j5v5ha0udfwzf',
                parameterGroup: '3xku54ke5g1j8mbi6j9y29talh4yibi0qppmn7kosuso9gr7czpn22lzsinwrobpqn88ariybcosugrpquf12gejynow0txr498a46gzj8b79ovtrbbk6qzpxnmw3dt4vh5mha544kuojcx3rvotkp4vbly1edaftq2f1rnp54rmsajr2wib4b67e7q844dozewcuv63w8vpmmbswz3n3s04m9yvnq6n3xhemiybojyg2eex8xvxbsbuloxc59e',
                name: 'l88omoy1e01mpzgsluabrawbtf5h4knfb7dh8fnphocx5n0aklguaj6lwwv5vn7om99z9w4xj8602oaq9lflbseoi2lo84i0wrwazofr5fp2w6oker87znlnlr1h5r8cq2qe78thly9mxqp2nomv0zzjsmc0f82vy6nxx9l5kz071qdpvpa63msaoyy1d9gjrvsj6o1o9xzbl9pyjlf58f2zl8m5sp2gajwsrvn02ljrk5h4lop48ohfxhdfsrakzctvorj91fxqf3af7rbz6c49nb459ik11ypchanzl6oyrz5dgrb92x2lxss7coc2',
                parameterName: 'q50dpb5jkznn5sqlwmihnjhnc7ful5qqb3c549zf5p7hivfsv5fezolvag2dzd4b8gr5758bl4efviwmspr2vfgavp9azxq1ylh4etwkcp0482jvinhlqidpdtz6kkeixyt6gvcn7o89zi0knzrb6dia2t238807ktxmldwits621vww5ccdw8bugsxdkhdwsyx28z7hvupm4696g80x4uahlz4rbd857mgrj9ty13g7g81e7y88qqpt3i16on01q781ppz7zfvykof924cmxkxu684thaeh09a07cjq8ibvgzilton257o3rc2uhrpi',
                parameterValue: 'usrg9w0881skugncxoosxa7tdddd8bjv2u5lywcllg0yz8w23ah2aizy131ycey9sfz7xvxrf42yctj8rppr254w87bp8l21hk0ik75ticdo7o43pct9yuk6lrv3gvirdws7iqy5011a1q0u42dyrsx0o4p2f65f8oco7o4ws25pgdy54zl78buzrls55yxjn0tie365s5xm7acqmzou1eiu5x2tpvaph46hdliksmuqoskkfmrsyx8abbym9zs8k852b5lx6l69uefpy9w5e9xyus4rdlv0jokh29dw5dw3g8hjjud60euldoxaleolrdtdod7gw6s4g5i32r4ny4ob38zx0tzkbxga1f5mjknnl8zcdzudvdjil8mnddtvbhmd3lf08vtpv9yfidodigkqg4zkfjes6b0foqnand6s1cfxh757nw6jfkgtpidzzeqpj4oph7bsqj9ihdcx1kvcr6yv8wxmny3by0mvitj5kq0mczby7uaq2yy8nus6vl3f2k25tl1iz7xm38dck31egvjmy8ph15ca4i81sxm5r1pcmyscpq8cbnbettais8rhpozno1zoehiabzns6trz0wf2ytwdvyojo63ccvvz20pide0qo5efo12cuor1d1tm4q8al3yc0fly7ya99dudtl0dii51n54im3p4qm93irrvag7o9i0udw0lqzmz1lf6pv89cxd2nuja8b5pzts5w94qk3ckx3mbfn7cxy79lmy0tuhzgf8icfmiu7e8ldrazbv90wloub84976jp4j2di0mei5m79f2m5lwlpkyphhhdy09duoj45kwo0thh54613fnh6p7kqbsh2llewqsmdkj10mbgg30giaqnoluuqsinv3qmv22rsbm9x53dyi3dma4cfjn5orr83e8f4040se7cecw393fd9bshvw74dnbzm7qadjh0uk73ez8ttp99hznqxp4qaksfua4xrdoq8yz8wqk5d75xtifypzo5k7i355aoi6k4rlnxwzp',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'afgfnq4v6796fzfg0dnlxft1bb6p5qd7r4sal8eqsgzopk4sir',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'ry73sdfj3cgvs1m8c4ig',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'lo79tbn4wwlpeppwqy3ptbev3fih4ah1f3beefitlnpyucfm5h6qxx5fqj397myb6gsa3wwlrb078qf4f6x0qtjdwud6os4ckanmwh6u8sqk2enfwstv4wgiqrgjwcjmikjzvmhqjp0gam565yynqb8cl5kvqn7m',
                channelComponent: '4duqkhm85x4dx7rv35fgbubvct3opj0d2elezbiqzvcl9o7tmiqemhoxisy7lx8i3vfawk4o32clwfw4edupb3i00drbuvpaojt8c2qzdrezplyj4guxq1o5zrnftfby7hxh7dnel3hadpa7jqycmwpgi2sc06bu',
                channelName: 'cv8gijwqpxcigo8p2czzoexe9nlciuia240kr0ekxwh7og0vrd3l2il1764b93mon3geaxg595aqsdi2w7b44wpnakep9mionwkd3lxqotqxj5z1d2cvxfbnarvlh3g2wosp15wtaql73kcsqnwrojfge1leqstr',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'vtm9dhbrtwei9u561lsm2yb8u2t6e4kb6rfl158kp67zyadhv2m7xy7fiqsx2dovqgrt645932oxdj83h5gy0jsd2sule1ilsnyldx7i3mb11md2zqyyhxxkxql4pjlqhtxqahc8biqh55kpisxv2vkgczf0cveg',
                
                flowInterfaceName: 'h9w9bk0j55dhhgvdad67wb1e0hha2f3779rtay9ih7bk61wcxq4wookh3g022hjg5t9m76f6itbtgbww8j4m20zolk6d6fdt9hrah9shzjicjt8y03y6prrlrnp0f3l23bi1entnvcj5m92hce8ylzlnrfrxjoqv',
                flowInterfaceNamespace: 'vd5sg5jrqwapctl49zgisct6ylllpmbh08p66j2xf7ua3thnsmw7qwakcy962k2q25jptmvvc1yyv5hxgi84h7ahjpv2kxta2llsghuynxq0qtqj04fatew9jioknsiw3780lgodtjzmd917ju2wnbfxxcwosssq',
                version: 'fbkj74m7j5hf2vimhhbw',
                parameterGroup: '3uod19d8u657xwz958ek8ib28fql3910oy7lox9pw8wdinm5ge6fdqvyadrh1ftrmnj6kuwlgt1qxfla195d2s50fdf8ta1qqzx2rxit2l0el2wsb18ftjbs2s31lsuj774op8owgon73avbpfcqy0tp7i3idxi0r2bykkvhnj0dy3sz0lq4v7cshzubrqarxlv31a8bu7woj8s2lm1gv1vzfr16k2hucjc07nfculokha06fdonkhm543jxh68',
                name: 'l0mlpskn43n92cem3r8wt4epgtm8ppw9ks8dsd6x2uzk4ww8uunhaojzo4zap0idif6qata196nln51pmtx4myu8iw1mnvklhplyknl4rhwfrr899sbti9938tclmfu92lft4smwbjdb3tesoq6enf879nly2vo3ehw17euj00ilrvnkp5p9x344rkhzl3z88o7fpubev0iweaif50x1wk4415clbpl7grjieonybbwllpg2wyip6oiwmtdgnvz3p78ysfuxn98c3s4cgbyjcnw39vynrew0ekkuj1lgbeden0p6ngnlmhgui6gxvd23',
                parameterName: 'n9mzmp71tux3p7bu1fep5s83pzk0ffa7n3x8uy1m06ouvepnum9z8k8s2hs68s1t0vyij5t9tnpfbnasswji7xe8v5el7bemoa8bxlpq0jjp54a9uwmook6v4fcv5pkev34rvktqbwrfplb96vl76596zapamsg34z16tskccocy0ldvi1x7xrre6yl7ow0qdcb76cnwftvdu0lu4a8k66a5kfbpe8nqfnbhao5q7ym02sx1rh57rukche2w3w4fdyhf9mesc5c0w6a6iufqwszius0kptkgh1zszmyrltjd7bs0gtqil4wz2juvrvux',
                parameterValue: '9vzl98z3a7pwo1pjecor9moi9xhhsjfibi8p1onj85us0b3mwif7fyuq9y3pvqwsglzu4331an6a0a8j4zlw3h2xqoz1jok2ummeg2h9gphxax2oy4pn64uohvbhj4zf68e42jg1as9tidzmx56s7xgimt663qyuh4bpcybzn4xv8orocnmyvbf72q180d42nelxqf2j9phrmhs3egtehuhfly8ka2uaphw709gior2gojs8bxbdtm05b0cete9tnj3kcz8ggpa9j3fih18cjuopgj7et0bg85qcrnwrqqz9a8kntin7kr63s3vslxkvd4xgezdukyielhmz6u9aght9sapftdsjpceam8ayema0i5nny4wsf8grwc6nn068p1uadz8gxisydlh83zi9ovnrysp9h6et9hnh1bo9tiu20ffpn3ckczfug6cqabqfnxtzotw0b5kba2hq4x609lb4039cor13ohbtcbppq2ni8zca7c1ggem97p4vgrv3voypbxnudio8kvgkq5yjkscy35ewyxvjixrsieiwzf9zo3swyo8rbt6geib5romxtx954yy24tj6miixyasmjlce52gw5dc3xu14fn67ih7xntcocv3ens8vnlw4zhuz9chbsep3zp4avbv6pnmkwv2tcp2umxxa217j2500casl7jjlogb79rdevnrgpakofbzr0h1r970bsij7z3hq2xxnpp2pag5f1ioo8coqiufstpnhfpzre383acrm7xinvaanibkzxgqv77boctnzicyter59hgkd4nmn5wz30lk1m52pqoumnfurbcke98qqu4lqavudhvz2z19nuqkseyyvescxsmqexhsvl9pc6corqjwx4piva6w00dmggpb4mqwf28ufxbjg52k5wvaw7ed75gvxo33z6pm4iuduknkxh54trfol8ztrx5uv504jkmlax13lwhl0lbhlzaj7ngwp2vzpukvl4kfwq5qj29iro03l7qgd01g1034ku21d',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'mplr7egqfoluatt0sup46fflp6o7jo05op6p2hgudvql6q0z31',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'kvq7a53tum3qz0mn74yu',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '314bjebg2xfdrykxqd9ccl3qg1a8ir19yr6224w7ah4htpgzk6c8tbq3cvuo9duyko506odn7thx0gjtujib25hjf6tuzvw33f5fgljbkvc0gcwm3ert24u0youl38xjqrvu718409aj3gmnn3xpwplgod6xnesa',
                channelComponent: '6frzyc4trbujpe5mozd2xfaprdwh2yrdk0y94udsufmrs30ffcyt3rft32sxm1xct3avg3vc8c8h1u05jn9pza7ai722u8fvuo4xht69vzpoxo5ygcu3ugduyyoh4k0xhl21fu2mw2ma365cdv2go1moywyku0lu',
                channelName: 'awak6uklxtdxppdhztd4kf2fklqzzie1svgm80d0uhzv37u83rrf7du0x7cts25pdzqdodu6ueb99lxis96nj73lzietky34o1rgqbrm9lsrtp52qgwldw2nobw8medawm43m85p77ns8515s2ag4a3v1fb9waaw',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '0uskalefn48e6emxv0vod81yo1k9p1qtm24ndkkbhiqnllhohbg84d69nu1cklue5w5tmcuyz7jpwmvw6otvgx44y3qt7ag4150fb3t0hhwfj70xzb9ie14kna6r0b6ck64fcna6aforsyirm4qc8wlzqsql7jey',
                flowComponent: '1d9ip7poelktmp7iit9b23858lrte8fpf49v2ealfz74fxajd7ie5w1ab97jjtxx8usj0dcjlauxm06atlbvfinxjw21xjkn1yz0kgvzgci3wsdpt1ckz13c7m3gmxvw7jjw9ziu1bo7u7406tbdhxvcoduhlgm4',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'sorpjoqg7el459m1l753fr0uy8jpz4tyyee1zmu7p3ws504wz8yjsh752ymhxyw9sdkitj7gxu673n7lj87gith3ues5637r7xafb2lxervi6ak44n2ntiv4kyuabfqn4kkgiy2mbwi6ozpjop3a52p7ukhhqwvq',
                version: 'gy8n18shmjayklp5inle',
                parameterGroup: 'ufqh5dx9ssecyvf580e6erfhrskjo8dd47ubyd9vum82e1cj940b42vdrnz62g7vqjs2hk78hdxypkwjxuo7d06s67j0wezx1liy33cemiwnbfhjc7doyhoij39hyhat81ttcvmz1ziwrbtslotrfq958vxkt93wvt95wfhpzgh0hjvg4jplc7bascxhabnyxcpch2vn78wjtrwn31ww8h3ltssi24icjbsoqolicqg1cjcna5y570hkcgqpqmj',
                name: 'vuiaw85kk1ad01kjocddmunyw9ucy4tbgt27w1rqna0bfjpjgw2nvxspj64wl2s1sme8ux8nul9zlq3oh4zaiw6qqaqs7fgbrangfobutpbl0x7ilclswe2m6rebz0f3l9ordgnlwia2yfnvm5imd3fcrkatr2yjkvj1sl56h60xd5l889vsxg1guloqpj87mazplzrf9tayym7gtuedsn032oaq2ou267w5bkenh1ngjjckvrarr2m4e4e1ron4nyozqjqwm3sr57fea94m4rxwn8kxzq8c68tbh09fl0gfzy47ff5fm4b7oq0il0u9',
                parameterName: 'lhmo1z3zue2uwxxy4f52ikmz3uwdcrapz6soq5xa596vy8z1e6jt748r9ftm2jskd9ljvtxeh4rkfmqtsd8vq8pmcrv84lgk6kl0pl0wv9wuikec95i72s3hwlzts8t2z7y9bru8k5jfws2sy9yeh6kh6erq1v6bqxcl6pv0k7ih5ydhxvkek6jmuqj870yod8jaqrtjv6owk6gd7xdveb3hegxbry5f8thchmxgad6mop8nna844gwy5m03ic2il27n3j6f6e80pe88ps3209uqyv40b2e3kkrpa50wnclgglfnshftecih2ecvvrfw',
                parameterValue: '6gvohvis0hqedkyfit73yzn2ilobu3lx92kwy8l0399nofjhvhqall6lont0o0b7u16zzamviowys6gshwsod1u9fvgjfql6z5jy9i8mpa2hut3jqgsbzuc8c9h2vl3uz5eaegi0ztfegikafnxctrmpjsdetz1jb1e627koz1fktsy73zh9hpl40m8d84z06pwe1xqhbgj5itef5llkrwsmyznoyj62shqtodwipqhza0v21qrvmejpfpykmbbh87q0nk9o9ii1bs88yo8cr5oojcjetgr3ho2me6yaxwplw3bxhlwuchy0ustcrw58imz3zmdjkxaezj9kvx8n14w0m0jal21ounlcq81vxnm9dknmwz0vf7a63pek6ljusa69k4j0htt87ofzppn0iqaisvllqb6l1x3i8118h189b4m51xrnx5r68p07jan8bilzsocvqg6b98iouvtuuc5pg3j600ofuokfka5ynqmjdwz5n58rcbdz4gmfcgzzzdk4ga6cmv9mq1y03zx5wultvwsl965rf7gs4icojvv29wngx2a0319krjg9wcmdb68t8w9vvw1c4e4auzgqm5g5c5zh8a4pirwjmll509w3jv4jd1omt9gvt5jrx0bd9w8g9typp38w86qx4c949hms76zjycsprtvjivj653qa8pqpr5a4igu2fheyohrz7veczchf3gplri7blnxdg48m3jwo0eaehig9oajesfk5a4w88gtr536wc5wlby0lyn7nnqeq3tctxk2k50uvhxxj1uurjez7zoppt1gkotlt8pb0qt77fa8kk2ugsc5d2kty8ax43gkbgdsx5gd6mgius6jyacyovvi3xvgbb848m2ykmfpgsud3l67ig1tf236c3flp0mci1g0h30990gsyib9fuo95v5h16vo0f823pokjhpl0swlo12lvl1fs1o6nalm6psluxlg4bkccpcjmfz8w7wxkiixnf5wc9bmvvbs29jx4vmwgd5ao82bo',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'n40tg3b0ylx21hodcq1t3wa10izi2g15hz2ahglet30r384jpr',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'zddix9t91xrn7xv4iu77',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '0venl0n31i1hhst37ab4jf28pthe2xiyjrymqzfhwri8p4gej3yhtbm61btw2nhwnua1t2t48ktmbmsgj84hd2ydjxfp19cxhkjwcwqiojf9e1ikdkyeoqy35kpm3eje1skstg4z0ffwvief1xowa7e23bg5ocz0',
                channelComponent: 'a7m3d0yfskxs43kazkpg42llvgjuswl5zhjlewf7mt68wdl1iqn19zrsc5v9wb95qbsu0j2935usiwi7n19g7b34inltvbkbnu364yxsgtxqum5gepmljwybg5xij1m7k4n90t3tz1i1hr9ht3kygv9xlnduujdd',
                channelName: 'k667fna2pkflbsukyl2n93n4kvznpc5vy8dtiwozrqul01498500oaghxwobnhohnza42h7rrgw9ua37onosjikhq3e1dmnpsxjtw0twq37esq4ey0yb0vqsfq5rux2ugxjub7rgz4abe3i5mlkjc6ku1084jtze',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'mbcbwzrdbtgsy97z6vx5fhlz6n6a4amfxmfyooai2bg998irn8klxwfccv3zvtb6ep199f36manjk2198tvvjuzpl48n6sfbxtx6tj40b5axwzy292vxdkaayhumme9fl584nm7yvz4oeenq3chwpzh35pd88rkp',
                flowComponent: '763v7qdl0v7kor2vrkul5izwxcj8ahuwkelbzvald1t4sl61vlm16f7i2tlucb2128a2xz9g5vijozk3z4y0430qsupt9e6ssdup1nhccc31lgvd69di1iysm18ape5llxaoe64m9t6rfklc5e7i9njtjcihhobc',
                
                flowInterfaceNamespace: 'kk0gfyib0qcjggmtkr2jvetb9hj130p1o1xw2p7aw3vctzjblv823n1phg7q2bla14n4csyfax4v343qu772rentyah46407nuazy1qpwor9gnc0c3p1ez8llnfki1q4gprzzfdba42w0xjdwucf9nvunhlo491d',
                version: 'aeg550kfzixt6oyey3vt',
                parameterGroup: 'lbxv5cguqytnpd4iufuabiqy13eqkoib85lwbz6zjxhwqg9x8mf9zrpf5eha06h75e8sqr6dajnxy9uonwpa6ejsyl6en6ovfii04gljq4r069rbyzlsr9hbqqoyk6mvanaaiysjj4lav05qf7rglf72rqukkuilts0c4h42gl9yxz20o9eyj4evb0qowj9665823f8yfnc61agcwrua0ont6g5l1t3iv806f0dtu3540ik01std1hk7kpeguwr',
                name: '2i40h7gi8ypexpljwdrl4npearib82gwkvdf6uroajbqorunw00i4ifpu951t4dt297y39l9isgaee2w8i51q8tvdh35v00locr2484cnsg9vxu4dvtv4d6plw0c1zqv013m30qdid98naw6am3tz80kubhhmfcwvl63wv7v4vvh9ve8o495xibjtvwvbo99kzj7aaltq1ji1ltmhqluvvlqknal2v27mo3o3d99j1gao71qrjo0ww1fpqmribn0taima4zo7pqqtaeksdyn3e666o9r2bygyij0yx4i2jrqrxh2n5slaan327bba7kk',
                parameterName: '2j1h5ioh3qtm4w1qifhupyt3n7txna2n8mjsqrnwx4xs1ld2h43ddoep5l49hq1fcgtefbf52zi62z6e9qs7elxvz0f5uzi77f4lwc7g4vmg2nmbp7j7gnj367bphccbhbcw5j6av7gm6g97b1p0mtl2ieo1q4nyfa6zhy5oi3qlc4okbelmj0bnjzntbplojnhc8som859wf5to3zdr2k6uaiov0vvqrmcof1d31jxt5ogftnksna4joyy4wamqbfagyaqhb4hqxh8aq2w06fm0stuh9v9oijiz4m92ri019h28udte5dqce61wc2rr',
                parameterValue: '21sn75flkjawc8baq0keslrxigcdksytvobbzl6y5ee90np3i0mgyd1wnwwwxia96ck4lsilxlif3iuys1k15hv2j7bxu1yqe9vzza0tppjer1r7aeedobsdapb8j3gjxqdv5jegz0gb7fovy9d2yy9jtjulolz12r3cs2t3kh3u7ytehk4qdhpixzo5g1oijehrexcjuwjdde5arwzpnfbc14jykc5asuqoquq54bvx5abf2mlid9o8v41ss7cb6tcsymz5dhojroarjhqyg42yjvdpu1myyd2a8xhid190m5c4oqqtekei15mqkk448hrd7p7takt5gx637x2zhv1y0rvfebk9zoj3ck894aty1mzfv4wvpfyufpput501ddr8oj5bok88z3ovhq65h0nh71jk50cggmxweuj3itlafa33ne6assnjobjmj5gkuvwz74wwpwkn3uhss7p4rpdeydx6zfc7ldtmt4xo1tezpu4fozr977o25l4or8jguuz6s2mvhuxt1daxns46yoi1lh3h174oqfg6t5m83j9kmoacx8t6isvbtjtckxszlz8d0scvxp9eez0wsyvi02gb6s5klnan2bqz4lxsx7va2jwp62nklpj61h5so7j1396075dw0pml267fcny5n5n6sy2r71i6vcdnshb5fmkh7rwir5h6fafh1o5x165k8n6vyuhm0iy2815hmahvchcwdq27i5poxnggu17pdiumpau343y5zweuoayx6dvqbrnvztvltmlj7rox5n340x6paly7oxnaxoeypt59kairymqdmzt194j3bp1n6ubh1lge56aqs89zzf22xkxclmkietr0brwhl8by2fbro8oso09c13kpuc2492peyjpjjg88pmipmjry1u0gfkee9u7apoelw6eelymlm4j93d0zt9c2i0zsc2ab3mjixbnpgmsz9qarpvwl66qqcrtoxkhk6ophvol0lzby6bmpksv5fbe6okp04dvzr65ltnqi',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'wxst3xbkhmpicb8kx5o5clbsejibc0zfg7jjzq9yf2jpc1j3t4',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'sls618gkp9uqo8x0579i',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'e6c6rpd6t3u3mu5m45yy0mor5nbzhir6d3zdnydv5gsyriu1fl2wk6jzsu8vvqjmfxmweszpvtxg3dt53ztayninrvjq7fvyynxjaa6imlql69jgqec7mty0opelzmggmho0l0gc04whvh7o1bzwbcdmf42ilvgt',
                channelComponent: '7u0otduhha6c9yyfwh9lhn1m2o8uow2aqq5hflen3nhvqo7pztykubb7ev3hf7gecazpl0y9cwnpq5427cldszhc10qvd6bofwtzn50uuizbu7w7am5iywghn7288ko884uvw25gsw01pzueplzaqzdhvmx7phup',
                channelName: '87qu5wutu306kqiv1lw1yeyflpxprw2y692nrvm76hv3bgpaawlzp1q2xkmdy1lpekywnnnugvp9m39mya5onig3gcn4drsh5iaohl37fcb5537wsn0i79dujrlfuylj62kpwhunk0b1cioxr5piowh5p3xb8lpy',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'rz18w06hb83hr7dzgviku60zu04e41qyl0sa9h703lyusne3p5trqx5gfvxu0676fkt46squ7n7aifp15oumm9frn0146sawffb7skoze62upuvsvhvgyxarowhinfxz30sv7ecu4cfpokspl6jmm2828bkre5uf',
                flowComponent: 'zfssoq0cqtzxkwrs1w4dlptn98ksfvfly8dqsxi4kbsliiudv10encesunw1c6qr9jt96k5r415naiyd294qo39mok4oyrgluu88w80qpg8o4aqnbti711zk4tqiyp2j9saqgs8uw2vyqdvbywt6q87fwjqurnuv',
                flowInterfaceName: 'wlj0qpnv9429z95m4oxdrj43coc60f73n5zu5u286kv4drcveq4hzq4bpgkopo5nhee6melumhwazq0zu7p26s0w8ppytrth2sejc9jglja8jl2eu1dv9tjrz7i2096jxc2isj3awtpcaa5ud1q4kbwnsv8lvsl7',
                flowInterfaceNamespace: null,
                version: 'q7h6bsxtle2gwy62uzga',
                parameterGroup: '0u3z8grmknm9ntzn4j0z14744w3q1xtgywkk8kjxd4gf3rhbbhmbkpkksrhugzv6q00hsf2rwp3tqd223izosrih5pznlxtqmhpcjn6e2io5vzvclxbv1ryld056es1quesrru25xmytjqxy8tkxzzd61rgcyz2qk7dfhloew8vhr0buj7cwrem1tszxlo9vw4ay2ki4hhywossdfgigz8ishfobxnb0jo6lzinvc8joas2acw7al2bi7snq83a',
                name: 'tggtfp8w1rkc5xv2n8iap79sqrdehy673copkqjepo98uty0p0s8smqapvq00lrga5ptnfparyv1u9s5swpyxhim0vnhust9wyf37xuet3jt1kfh2hfeke950k42559agajbqgzn9tjvxctpp57wn7h689qcy43q2n3lc09g1wl869rl12rjwkfb4bnh6lindjtz6sw9ayjmyhwi78ky6u2txr24p99c80xg88gb0nlqjpr1jctc1f7p8agg1evbsi312nzfp5osb4qub7depohfsbxyrevq0egk694amocxt6fsljp0x1qhtef2chis',
                parameterName: 'kr1mql2db382y2hrbp2l0ff3hhm2kooaodhnr28itiusc5w2b7fxu1ylha6cqks6w7pmtopuvphmqhlic2zcic5zoocqiiircuz6epl90x50hlr2n3tcyka0tfdu9du8i1ilf5w09dxs8xztrcsuv40y6odydo3j6ha35fpxyz8ptjyqv5vygiwjuisd4fw96in9z15mobz272xkelxfgbvt6hrsza4r5n9q6cx3s35ymfbydkprpjfw6xxx56vnizua1baxlkz4z2wer0figyl3sjt77n9zqrfrgfxjs3tqviaukmn5vcnp2th1nvws',
                parameterValue: '7tndt96ox0kfv41qpll19ikh1anjf8e9fta7xl45mxaiuxwh1c082ln6hg3f1icil1splv9awcnr33kiyd3p5a7yxz9yg3xpeoqz5jb6dwbq6t17neg6c148y9mzucum1ddowok8f89ql8b9gw65igt49wkbwdemmdat1zpz6ebiio1h8aup9yggq6c40p8x24142664lqor0c5a6i721o1k88lgk830w88ebuhu2a3i1iyzilcd22h4enxk2md5ibrk0b16sizlumm943jizjyewy01nio8q0y3pv8p1zth7lqsuppk2ey8jom9tligncmhsb3ni03l77adtw7xn0mlkknwzddh3rnc55ywqm1yerkw2tmsuvj7tzn0aicazjwy9cq39df8z0ryfz4tpgumer7vvlrni9hgkei1nv3go7tbbfbk7h9zybcdah0ve71sd30etc974juwdf99qbqcwl1dia6lv52rps9q522mgt4f68dbb5htz62nhj3dkvxfs78g1gc4r5ud0b0sswkm4uhsfncpqd3014jghnq3xq9za0l18cp2chmqp2fg9p7vl07xdhcroo5yvqz9oyftciku9194fox51h33g4au0vs9akr2us26vgb5xxtjr888fqcdmjewzu2u1jlf149rveocxi7d3tgrkbjj0589k30ovlyp85v9lhd1hisi8l13oqaxh92iztmvj75b1ymt76ldza1iuh70gmt59tb6q6faxprf7xhxbjkgrfd27wsnd24a81u7qcecahui6ky0b2fwswzor729rn7mqrzq190af5msic21c25s84e6bp5o5g9ukx91hvde9ptvckoyt6k9ifhw04ua33kf6wcyp11ytsf6iyc6emo4bi1sgboxjdeo1i4pfolpg19680qdftxtlzk9o5st6jyedtfr2mccmf9rja12s880d9r6n4q6tjyycdbs4mziv5v3nijga6iazxboezaj2sji5vokxii9r0r1yapugi114rnz',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '0hwaz9uwp29f5wafcxdwrscsdray8l07onbouo54ws3d4ubi23',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '5blsqp6f5k8t73ss445z',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '2vkf6g7cmf6bbtg5k59kckbgiv09eio843aofclxrpn7m94elvv249qzhh75gznk6ekemnfvg09f5ehb0smzb4qgt7t5gi3016o0ywlh2c9ladnjdk8xg8agrrg1ukkx42g8w6xtq3kgxhdtv7sxe3r25rk7g1sc',
                channelComponent: 'puxk7roh9uvw8cullz06lxoixr52djborvfflzvuk4ak5xqh8m0u3soc7ntuxy4p6deu9m0py6aqulzspgdgf7v0c3k5l0ww9wik54mdhbzyi2fh6qd9csof0tiy8a6pdf4t1ssbifhw0ycsl5j1b38jq0m2jf00',
                channelName: 'v24e87haw5rxp98ymw5q4g8fco128okshpvhgbnw3qtyjgrsb65l240cbympxfowm6n0vzxueww3k2kma95m1zli2gcm404o1dm1gasvnabn0jubsvp0uyq4py8dsgp63vpx3umk4sm6w4hqtamm5nf9qwmqc6sr',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '80l1wot80bkllhb1uamnt7fx8l51ei8ld23jwl65jtiqm33o1yin7zzj05ux5820qy2m5lb7y3suurjukvetetp7a8e5s7ean7phqvatrsum5re3l7xeunj3hmuna0dbzdm1bbl4l4l2w42n0iwtyli8v7x4k0c1',
                flowComponent: 'h6dt2pzk6t1m9e5bkn9ed4vp6kuv2y5c2kkjq57ilvfr6ei30x0c722addjmnxo2soeayltdltpi8pzksy9g2xkmgebola7elepp7l8mwzn886qpio464ajt43l07yhiwv34a3vey0wnq6gd38x11by9ql8krmqh',
                flowInterfaceName: 'ot1tkzs138uwlmprs92vjl6ue7ktj1i416gmb4w9tuqwkvhw7vaqqh77l866akjv14npsitw42r6elqhx4zqb3sw3i726ynd1xawf2klewm9k1urmpa8qugf2uqfu8ejl74kivh2b04egvu3vrp58nxyl1j465bi',
                
                version: 'o2orf87txbdmf3kl10ht',
                parameterGroup: 'nxcxycnypiflxvc6qa6ukxntykysn52xoqqsdxxz3j200r0nexhgeee1rw5nilhaj75er7kw26hwnwil7ixdjd34zmi7nwiascvka2hizfb86h00jkaeawxs0ua2hg48pf8cyelpt3r6j5crvgp5lx51txonnwpvljrttwl89ogsgqsvkci5q3pkrvwj0h07lgd0hhbt644fl76lzd9db1aq76cjfsf44q2kryl067z850eciy2mf7hgiv4flab',
                name: 'pcdaeob1nlvg1zcyti2k3e1nhzn71c83k67ysnwtvw76awvdkxyufnvgxqzft3wl57p9qhshs0jpi2qwjjdue6nxx983z38dxt9ejnz9rkjh4n9on0hbz9sin63ybk9ijqqpjkr12pukm9guehrpkqqiw7335gfemwlls27awf3r624w75y1b1v5ynhrstbog0e657ol9vyztydzzijyiwhrixysu1lj27krb0jfty3phsh31qz1z9xwhpiuugjdcajhw3x1ibpxrpzv3n0xg7rfec0ddzlmcb50wv9pgz5alpjgl2gjz68a3o2h7yz9',
                parameterName: 'w05yqdx737ua2o7hhavpf13ndk79tushwx7rz3bjssitrn74rzlhe8tign31h1wjk382pf7r7x3i96qnz91s60ouitg9y1mxy0x6ttyqscno7wez7hrxot8w6z63k5uf0sxljdwlc33mmml4k0muu5mr488l07gk1r79jhgyk9v1cw00is86h0at4bignag8f7r0s09r95k5fewvank3xmkdl2p0wnkvaziensmf39rvrabierxtmjcf6boqpfje2haw4d26bvpsc7px2qgcrkixiorik95d4lxzvd1e1g9wdgzjltycsvdhit17zdlr',
                parameterValue: 'f2hnwidaizv3143tzkgmf4nfw706oxfnm73fuyzgqgvfiwonysu5drnb2e9plb584j7kusjh5zmlitq0q81slgo46j4rsjz95r0zb0rgu648jco1evd11sqylyxr79g07eh06oacjxwgb4nt9sgmu1kd42qytdvelo2yie5phm5v8ocjgmaab4iag5f8vkjgk8hrnlg15jatkuzcj34btpdl5q1x4icg43h00az77ct01s7qziudf8b16nveq6482cz8eyhrya08ftekxi6cibhdk1v674eviaxaldwo6890zkm0nbcpa3an9e25pm1mejkmz1ihwtyf4uy0fx925ylqbezdysbn3jgfaegx6mpm6mvdth28c20qqevtxkb34lengwbnph7vif6vonkh69uxcnn6g4znlm3ks4sgex26kwowls621n1gqbmyt4lb4716hw7rs23nie8we8xeidg3fl1q7dtmjya0trqn77ppz9s11thzybz5a29cw5wnqpvfooto8vitd6b37mvnyagnhsrvla6bcjd7t2l74cinjnspcgahlanwl7rzog1lhtywaq64132hbm2pt84vggur5ctyzwnh3erulpq1ifrvcqtscwvnfn72bfznovbi9mil4x4jlhtti5cboiyon0zsl3d1uf5rt49adckd6vm50fge2zab2j3pd5g3qejwnq0kwlsvqix4gpren2dplgsowvnch41tzjbanalxhkeulc1fhsswlmbmnops8h2pd2yz9ws6f4704grwjcxzx8u5rv809ly75u3c5z5ixomm3822mfqasfl6ku9jfygxy2rqwtk2e3nb4vbd68sqh8gyvkmhnraueozu1bx4yjyzs2n8jttj8j5zlkco9a0nucph4m2dg7bj86bojexoikukqkc4ho7cr4oxeqnxqwyhyze654biqe3pz95e7ysste15f3e7gp6rymrt1id7gfd548iz17fkmyxl1aijp2f8fitjqkuojgsp5bu5y9ph',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '8g8tzwbgbt72k7got240s0ogtx11yafd8sovtdc40afwac1ph4',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'zww3a996h02v5cz0lo8i',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'mxxdajeer6vmklyjjisah70h42plavbs1qmztjt80t32pp8rczlmhr3doya26lu221c644f6vrmxq31ljnhxfywic2up6c0m14hpaazvyxiqh4zx1t3r8sst7iaiag811cvpspw5dtuhk8uflhv1ebw4ynzz2zrg',
                channelComponent: '8xh8z5mt6qdw3lskeleihmqph8znvdps11be7r4dlde56wp8ko12keiyz6spk4ebfoumrbpi3uskmk74ebc0jcjzp91w9068zdblnkxdcjwiem4aut22iw4pogz81fq9mj3ne0yrdcdjbnrwvv4n5tydmcsuknjc',
                channelName: 'cd0uoyk1dodwcdokcuh3vkcx58qpjqql6gfvkztr5czq8tft1atslubr39l2c4n7unwii7pcxb7dsyydrif26wd6jo516sji8bbr25dd913jmcvjvc6pvmvrdgtynsuesjfm5rzkylmkbh1q7kfb5phac3tfldiu',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '9xlgg7i9uzjppjb1do14x2xi74qzom5cxtdeytqy0ppctd8sfwbjiqbaj91vf2eoy956aqiew6vavib0siv7zfgludr9qr67fyqnm81q835a2x0q2pgdlul8lq13ycsbmejzac6h0dzotm14bf33atfhfc2ka1kk',
                flowComponent: 'rn4sdmjdadbeiq3ch4moi1d5tdfa232ylkuzn0n8mqxe4wkvohuczo4g064l8hze6dv2nh0ny4eio7l1wae2ko3ilr7p1m53vi2ubxtfoff3bphoq7jxlzz4z5537a0syfx4luihqt2llyoakvrr615g4p8vygll',
                flowInterfaceName: 'swjgiju6g5k7lnjgfx4o6so35xambjbi4130zem3irnayb4turk9bb2qo2562oco2n9pads1kdme8ny1cek6gswne1kq7fi27amejtyvzr2devc6c2pf5ft3fbcddm75o64ux9dbrfg35cvnrceld29kcgkjklox',
                flowInterfaceNamespace: '3eg46oq7rflims1x6s3ele4p2x4haghslbxx3svsfvot1p8whc4xfkr3vgmb1yomd6jrp2psdcf40j299cnqb88nzi79sgyizms6mw01kybtq88eqj97khmedzk922xknkn02up3gkjkx9vhifks3n18xehxlt7y',
                version: null,
                parameterGroup: '6iopio0mdb6psjzh6h1k2hiao9wg01ixbg4h7liesprctwz8izgun5yvfsndlg1w8nfm54nh361xory62v48yo1o9pyeye6sfpmqqpij8ynd1daa6zaaermy91lv67whlcm1jyvssnaitbsc80wbtek6878iqz2o0qpcmxu1mgprux6aumqn4jhugdtqiwkc6nxrsrg348bg82tszz5gfbx5b6hnnr3cvnyb39e1281z4tjut3qlu0l0f97lruz',
                name: '9grj5ygp9ufh8j2oclqzkfnven61pfumhuj520gyav69i35aa5ojzyi0ehynxev1u2aahsmlpgb5m3l1ut3pq09myjnxk91jah9ryu6i1g3xtmqxf7jielu96w3neyc2go3jpjqwp22x7e84ghyjwxno3oyvcit7wx6tjim6rk8853iifji0no8kkv0c9wunoa984850ofuphgfpuyllxph56gnt9tpzxyn053w0efs7qzfkvga9s49a86983ukifsx21dwyyhoh6aas0884l0mitro8jvem0hl1gufswzcfspv7xqzi4fsouwvzr8f8',
                parameterName: '0abq92f8y9dpz1pu3geixovrfqukcyg6dwf25d2s69qyrsqgqgtokg3gjkw2l4a7hah6aiqm7n7ywz52cmipido4zqkfpcv86yu5v520umgpmnz9svlsp9l0jfhvy38mtvigntgelucz0zvqfcqn3v9r8ub6a0szdz5r0uyjbf337lp9urc8n76e57xqwrcldyyqzkh9f0mttg41tua915dy5706xyhh95w8a6xrnsq7ne4uopenl4geob1o7vhgvg8cmxv9e8wie08e497axfzjppahicbji1468r751mk9kgxyim8m08y49ezp8dj7',
                parameterValue: 'h6yz1q67omwn8mnwm2c6ztyhrmpx813qjq0t8lcwbhxk0lrtc8x9ndn8yxqllp37fnxf2ralqbl1ywm7vgk5szcz1bilwittrl1kde9j8pjrha33o8mo0hm9zz8vqroy4nosiz5472bxj4lxuozc9e3c7qa4km6pxv36dfec3ixd88keg23rxvp7ihwqskapnf2szv3ho4gndfunb0sc2sv0bsnozmtue1lneqsvwy7oq6ey7e8avqj5caqkfg3uriw2ji8mr3jfj24ejadgje6j8estyv81d0ascs7wqotqits3zj3j9nakck1qcv165hzfbcje3x53zwm6agxaf5vdb5xdlvt7g6a2b60b09yy1ys49mh6ebisj6pfxtr5nuqovu94sdaqu8rdgfphajdijvse121rirmjkmnjqr7bepcp7715yubeii6x3h7mocqhpisjbqpgncr6fz91dgkyuy14a1yna79q8gm566e1g6pyd2s2l8cfxh2fv8eb12qvuz35kkuw4ml6l9cymk27x0qmo21235n2b0xb7807ta33q9vw9pbr2oxk035brb8ykgwt2sta2thusxbdfhc7ksni4xgw34wk9y0lknmnng7por2abcopmoo7wdkwdymjicmflcsix4u1mkb1htodzjsumh58mkxlpu3w8s5dtlcpq9gzxd8d3013ezxf78qubbobduf108funpuomedspyfq0a7ojpvz5dtcwwt90qj2h4j3tgrdpbqxjeg7j8gu69x90zx51h0vi2jzi7brhwnvav98buqf2kgwgpsh9bofh5172ry1ng6vpfkgzol3zg53tc943sz8u3det0cz8rgn46qvonox4gn71cuowt08iohavx3yr4uk1zd4x9ppl9qwrnc0287lbmjs5s2j6dhcyawaln44spvr9x21ti4vjbl69hnhm4wvnbhl746i11shnm6psmefd5f0uww81tqpf37s58vl2ggi5cubexx8254i5rp6yxpdom2l',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'j6njr03ok4itqbuaywi23t44a7bcbm486lz5rtcl7tqlz51f6h',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'nb8xbc0dj1jqo0sbiym4',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'zor9yn50iffuptlwxn8bd54i04tzmjs0w1lw94ytnkmmis0y2zgxaqo16vi0jazqduvjbuqm0giqvak8cj8zjpzj4zes201kp4odos74ep1elre4jby26w21whhvzm7go2mwcszo3qe3in95xkaxcsi3ca693z0s',
                channelComponent: '62d108vdnz55y46hou0k90e6tebet7cdtcxzdx7ih581asq9b3m6kxx0p85vpnrpf05vmzqsiek6lzfk7exdjldo2w4c0i8yv4m3yf68yz067xol25wakhdsigoy7v5sqk63rt8ddes271a1odda4yfbf904r6b5',
                channelName: '2kc9ycfdtpvrxssb8vs68xudlpghyibyocgru0dounlgumsr6sanq6mcv0rpow496xaume3f2rdocshhe1oiwom890oece98wo96nojhrmftq5d9drnv783cgkjamdclt9l2ld5oz0eqmbgrtkdnsvwavcm3n4el',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'y3eb0wjbzgyp66p08vr3ja5rhsyxfgf41jraarm7b5uxs3a5r7ix7d7lq6ihzeiz2dtv9tmu7fct82ep57vm9a71k7kn2i383xhmfwy7gf4tgi8azyfthxlzpbffmo3vylwf6zrgqcizgepxt4f6oboxnquxah5z',
                flowComponent: 'm3fp9xype8282mw6s13160ffcnqi4vcodb3xb8ytwb5rv2wrolk56o2mkvnakua6a0lf3md3hzz8k5lu5yangbzm7yvf2tdkgjleuzt16egln1ojwx6ah2idkt3myne2zrxv5j1b572etc0sb7qiqnnp2a2rf3ws',
                flowInterfaceName: 'kwwgu0cfo5eu0ovm0eisnujlo86llegjw6e7iftgmu302k8pab9kdo5lbvfbqnl4gub85oyqxngpqdn7ed31o5p3gdsnaiqugnwco7zg3d2k86h8y6w4fyrlgotrviar8bdkdufm20losyysv2dxuqogl5qch28o',
                flowInterfaceNamespace: 'umrlm4k6ace6i6tlmnia4wfj35fth1yklnrv0u26z42z2mb73bfr9wbvctvhou69d2ammr0i92j4u1s9r37yzx8aoxzvymuffah7dzwntedkv1rcdnmenz8vtblt6jsrnrqmvt42t0ws4rub26w05wtht0y6lec1',
                
                parameterGroup: 'i4w2rccyghnv4k7gq8td39fykgipsfdrbyxb4scd2e1hkm82u5hds4l85u36a5rag7rknawhgp3rypzn7p34rt35q08kxsqh3823w0a1djlim2e8c9dli9dma3wpldk703akjok1hj5gdc05a6gywyyfy663ohjbls59eyqozjzkxwysry7bqy64sia5t7pmyidv8cxgi1afgw7e2sqz8b38h43wjah2bosboe469n92u1sj9cvyc9lcsdbemrl',
                name: 'yzbm4z0bp2h7n96lq3u7tiu2yxdb2o6srvzvfe4j9hmluxn7obm2539u12zkbo1wrgcfls39lqu2eon2mvvwxe3gucgn8jjhn1hbhaczs431655sxqblxk3qjtw10qmd7z2evz5v2cjeerzi1j2uf8vafzf7d773wx3kjaf0rpfp80i6tkaxxl4ej8lwg5up5ocqdztpy6hpitwbxjfs5w5lxugdagyrrryi4vm68zm8lariq6p38ll58jc2j76qr8j2ambsc6d9ixsk3wf3jj479q7u207gwa5cg8acynqg2cmxzq5pup5imutdlxl3',
                parameterName: 'e49zmrcc6ttkj0th6byyuz6hywuwn1yf9eupm364e5cjr7uyd2qafn3vbrux81jlkwak3d3nh6zjvdklkfbnmob5yy7y5pyqfchojv90doneoh4zwas7r8uofulbhf0ojevlpzfdy9kqb3r333rtv557owrex5hagq399ahrs40vriimorf3jx9gjoiam7vcr4tpnwhuhaicnafri200lx1a2haguwpj4bpmnrh477yemy2nllzywihtcgci77n9ab5f9m6c5ye1k7o8kami6gxfmmog554lqslr0j1wjp580qrbxmd995z5soc4zpv0',
                parameterValue: 'cavovyqkdw0eldm0ldvpipqtlk7rkd3ekwhjb5huh1kj2b7cq7y2qiz30ee5n088p1svzd0oluzmo3lnrpnncliat4odq7mnivyv2iwiuyjo7nqc0jwnz1qwctinojp9mqpg3tkcu5ya74wnrgq8mnx8qr7kks3z1fgqbl3aw1socr6p395g17fhu3qvgy8juzt4of9a2zfyd0os2j2l34dm3z52mfbdgfsvoio63ir3frdf9kscso1t1x3ovf2d2qnwrv6hz15qq4premwugy81hkuiryaydcjavnnw7pmyaivc379y9u8v5zav46ptdmz0g2yk7a293tfmt6g8vltf73rq3szk0fm1iv04wsdbx8slbqyq5rommkam8wnkjpvv6kn4b61kfuabqot21azmx0w8ibaq19nfp84weiv78wunbv81quwe4mu51ta9860ilp4ttlv58ckjdejmr35htbq5b5h0munger70s9sb59dwi6xxat2fpxrcy7sje84avhedf0eu2z3zrfklukkelbiq5e5l417gnzc042033i0wmlzjy93hewmvr985gtvf4x67x0y2r8d85m1hm4gw70c6onfnj0k0vy2hwycl425dq9piwf0oh62vudd1e5l7bi3it4qy5eko2ci6ijo0y23ldia36b99nq02eqn8s55bnjj6ymvv7aco9elgdmx6azu2rw7jyz7qbhv2lfftaqe7986cs29sa2u9sc6fd5hj5kicx7pnn44iilt04bc1qwr8ewyf90frrx909vx1fvwb7ysvwf1c20ix2hk0egzrcirrz23xp5j8pnajzyln37zlkic9d5mgdg5kacgd7tr2b5uttnq5rbqw3c76xu7y9ow8r3hoej9qypcu4s77dlb5flzu6j5flovigm2xnzcg5we60gi5qnuu877uk3fuaaz64gpbl4ztg31n46ag9uboujf0o3y7aq3w58nmu1ukqoiv7do3mgushyfosil9uqrezr1o2ajo9riw',
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
                id: '97envzma24h94so7owzt9mc5esscdeuf3v5sm',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '1h1yi8aqkkc22n8d3l3dbv1tuoh6zsrff0yqlg8yqnbg9ple8b',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '6da1pph6jxi62i4selne',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'ucnummh2am0i2o0r8w2qvc4z2qi674340nhzme18wac8qky7v65uodf2uelmktdp16rbb1eio19nngtm8jwet6jf4skeo1tkh62umvdmixiqab4kjoi03or8dmpqsuogpuuqoqas9ojmgb04m2cch889v7uzeu0r',
                channelComponent: 'lb9pmyl5jys4xsfwzavhix6zp19k3ikagrscnxad5gigp7yjtisifyp7bb6vm75xo0g8u21yg8s3n18s0hmkq0ne7hkvbhwhbgty8vzld3b17i486fmxjeom22qlf3p6t41su56me75cqdh3z3ur8385r992azks',
                channelName: 'ghjdjl434j7fy5n20t7cwta6ovl7zl3mz2xwoglm2q3xiem2xgcpy7clwph08671zlg3xqy0tfyyqn9q7d01m9vap4ck3oyrp528w7xyn5896sf84iu226qjiya7h3rwa6zs2ip8k741s8iobiqibo2yurw8lc5l',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'a3gj7w73kgxr0up45pp9b5tg4nq5odbubb96ubgklzc4oekhqdcmkobo8h4kt45yl74vwxb28glzopd4x9i7rsq7uw36cgij4mr5ied1iv54mo2y9p6yoanxm4743uxzhxctcmvnk2d83k2mda7z32kdzdk8dr07',
                flowComponent: 'xbn3ugxb2bo05xuho2ymnkb6da18f3csczqyep8eeplhe6hvcebhjh9fs6eoaijcr1z66tv2qy829jkva3nxq0vzif2d3g6q7kwso22qmt4h3s9rgkg7ti29zwh3zeth7jq5id4192a4n3nz45dx2w0r50546pbq',
                flowInterfaceName: 'rd0r9ncnspepc6q882quz8uz187leab9e8b4pjtyscphnptfwd0ixg9vz98kowdqnuoyvqqr3h5kc3wueu3r6ym1toeujp3guisusslu4qq9qfq1n4cf70e8ot5fn5yfm3bzgmczjs4jf8za8hl2jrvyuzutlg4u',
                flowInterfaceNamespace: 'pog653qsgn86wucm74xalau0e1r1cdhlx9wcjf44akt43ccsvqeh7ccll0owut9ra0x2ctqd1t5lryuffkyp1ym88rb5wneu7nu9fi2xfug3hck10k5r91brsvr7qucqy0z346d3228ll9k6lzgakfrbcohhghnf',
                version: 'jvgyvfr3o46wd89fqgbe',
                parameterGroup: 'v97uuosrwrkgqeet43acovk9bzlj710m4rd1ovy3ck9i4bk7crxwmbwa5souk6rsqrionekg6se827jqi7nxks0dmoidesxxpprr2ytq57t9mfmi55ljeteg8biwgae14k3qzb7xsu19igq8m5i6buks6ej8ng2kcxcvvs9ii2qsjex6cjoobp6vre5jtedlwmnyiksjl9f4h0pml7k043h445bi58sujsfqrbuejzn4y8xkytv1bnu6w1s6cle',
                name: 'cbzjd8j9n3d3x0rrbetxg5s0v5224kk8fm70mwbbygmn1hxcd7m87spkwt9ay4qke225s1mpq1avs3nldxp199snjyumas2pz78pygro1kdlipfqftpx0arswjr549y4l16cjr5dqd77z5mpekewh3x86hk7kkm0tg30c8mexzzf7ki5ec4k8dfitfgq4abti1iag8q3qh4k5by0dr7jw40gho74x1yachrjt1bu1608uiv4dvpt31uojxl5gkqenn6hdii3avmzttkic2al1lma2q3dwp8nt6btpbms7s1udhii4fty9slcvpyd2wpu',
                parameterName: 'wapkh76621yeorv69f9wesa97g0hzvc5ydh34pyp8k2rhxwe9cehu04ggvr8oz99nttpwtird9wfx3804lcb1nohc2cgc8xw5nep6e9ot9lv2pdgvvadk5bf3z9u6qvsfwgev8tkloqn1z6x6iu9pdnkt6qsj16e2v8sdsocr7ffylaclk6uevwi5368u9o4d9vhule99441yn6sh9zvnivodjhsxoaowcq8cy4euedeo826m5ehhxvfinathk02dfoe4l612gzpdn7s07wf6r3txidqwnpkyc6fay52ddz02a1yk5l8rz04taoyf9z4',
                parameterValue: 'b4hsxni1l3svzvz92hwkw1otyl9cr2bo6orubrf5fnb3woy109l3p8er8plgwzwfsdjtnmara9zhfbfx2uhcbrvbyhmwbwe0w5ygdj1av83k001btw7pc4i2cmy9z8iwi3mgskmrcowikhyyarp3quall7aqwd63rna6g96d11my6e6967c22bz83w117a65pnprqmhhzcpyip9t5mvzeqao1aphcsjjuuq276b97fp0o50vo60l8bocjnzqsx047cg007u6a27531u3exi62999r6wu5vpdfml8rc3ux3n9wn0mn71al5k8j8zqyso4g2w69ixxzy5vzls92q8h8lhh7ezcqybhxr8t8q9xlwl2qjhxrrnt4xysl49emxwgi1llz40nrn1gbuxn6jmtjrrqn7kl5etgrjx0fjtq5l3xkcv044jvmvn56nx1cwp4tftsfvuuha5qnos4vfarod166n9d7arnk7gscl6g2dahiv857w5n5s1uaskoobi1ibaozh36xqfhejorqcrctrkixydfi1a5jfu28tgigv57ace0t14z4prbqrw2a931mptq8phtry3nig3p6y2wsrq1aiprv6pwm6e3xusgklgccrek695dcimwonqbqd5jnirtxu9qlopocpi3onp452zgrt35o90ap75c6btpinw0neb1v38ub91pe2sya6ury61kdf0q951lpvxbh5evd7vf3gvv8s7ii9p71h4ah30nmll2talx07nb2hkudobopia0yam4si7s3imj4p06bpy6xzhqi7gugx80dqponwnhfpu3nwaodid0v27dtitcjmhfrlh0lq7sb6h9h7gif2vwx9cf804ewy9otu1oxevktejavg93cbd8f5pd5hxmhvd3p3ylusyzow515xn4w8m8r1ttpwot6x2h33mcnju42atynxfyg5bbxft1tptjmgcqp2rorb2jhdqb3xi98bhaullu6u0rczc5iysimgu11se3vgw003gb132aivum',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'sv34ajeusotby6a93bz6ey4xdfg2cepogdrfm',
                tenantCode: 'vutfutw5victwvdo49vk2j7nk81rezpgludgf85l9cezzawqm7',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'uiy049gjrvdg9lcuma28',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '5x43hlnr6u3w1ciy4rnzxdr9fcgk6hn02c2umcoe2gvvpcjd41u4w7l9fe2hpyu7ke3r7b6mw6mxpavtr4qlqxj2i3icswez9k4tvdz8lxvxygzp4ew9h4sr8q0j8o5bh35tvye6k5fsbsv9qzgnt8v6jje87snx',
                channelComponent: 'wnshgmvizo3dclrnlroah2xnnxdq44b5d8jo8jirsk8n42h021maazsn18o1qtcj041rdf5mfyhqx1hmjq4nbgf1ahntqzp1hjuj0rkbzv47hlvey8r5je1p1nwrg9uo8v4w31erp19v3xdxv3ww9gy49rhvynmy',
                channelName: 'py5ipzrhj5gnzynid4e5t2ebvjsgfvijlpmcg1ixkwyt26j68yqe4zxyi0kawflgiwrstfv58sl7uj2ng3cbbixdm81exdxicitg3bo2gtt9vguqamiz06mqf5stxfc0fop1z84zzc3r3yigsnvbvbunbzzv6jdh',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'hfnt7k2tn3a97l3m77ai622wfuus9q0vll1oxsj2oc8v5mmbzsxdr73g1siwaaxj6k0e1whg3kdmch6e5tbr2m4pnpz8g1xmnfw4iciaxpoc8uafoafgzmhvem6polrk1engyuk63fhy2p6xoih42u3r7zh4597o',
                flowComponent: '4ph6hlmskxtf50f23f65hbqs4y8nmgx1vaa2jpd9cym42agwz41d4qoy83kfwneuqonylerrwet8938dege9g28wdmg0tc1atuun7u7nt3wzosmcqlfwu02jl5p856o6dtjr0bmr6k2l2tvr4q6yewg1g9zeoru4',
                flowInterfaceName: '5bgharq93vnxkold34iu1p97palku35hw2qwa8h293w78qyj044i43xlydow0rmqadxhrfkbxr8irm73x2r7v5tjilxr55pyiv5fhyv6d8zi0z5ltr3zjomqxvj9hfkv0y6w46839bkxntbmjdywpeec3ip2ru5a',
                flowInterfaceNamespace: 'a9vjf7yyzeadd5b58dgek9anxnffk5rbi1q4iuowenkurzacl545j2lfdezkmtlfav1dd1tciecb5rgjar7hpiiqs81evzafx14r9i79dgtu74opfegyfi5jfr6lwodgizspcoqouqxb8bkxgc5n7wtife809uen',
                version: '3mm3p2458t5sqb7buay3',
                parameterGroup: 'h1dwmc7pfnx6jsg0tz9mpbihul9ea7q8hvc50motg2rapy2vsha2tl6ayj26w6g6oezr9x4extnevd57v1uobnweikm6ddkd1dv4j1l4i93hcvr6cfdagnvxfgw4plu6igeuiezttycp5nriku04kycp9dbekymrz6j84pn786i67570zzmn9kijdktjj828o4ltzsx2dneg6f6ykke89hgl3h9bhjs9b5uuqncrupis9tzm8rkc3xafozqqhi7',
                name: 'a7z6w85z0pt00inbcaqsi3hif6wypiakvx3vdo8sy38bwfx0uyocg7qby3aizocmmrsu99uvwu84wwkr2uz4kd0erzbbfir7advqpjyjfwlr5we1j3ovdg5zuqn52o9x2tqyl9yeay6hoi82g3rbsr8gjl2qygoz3g0kn53uc6lnkyoi6ye7p4eht98zuwpw6b73ppuq27ymyuc5aq327wga7io03ne4b18qp3s2hbni2qy5htuop2h3prt5b4mhkes7yfpzh0xsipkj23c7f1dz99v4rlyz6f69ixr057tkynj8edek0qbtlpjfy353',
                parameterName: 'bfikv6d3gta195hkb3gp8b0tfc8qx7iekv2uhhmhdwp3j935h8t6vcl2pfhcq500wm1nvwbm2jpsdrwdmqoaw0ipwkkkg8lkqdwd1l1kgcg3pvin73bvvoiuyicp2zsrzme0f7fkn4os6rweoh8mokog2jbiejzwr6rfbrtsmfcrzj8vdymzimksx8hdeqi7dfy0wqsbjp66dxmc6tgxdmt3hosox19ulrqs8d2xia4x3ro4ais25x1rn999a4u8g5eml57r9ch4mmzdhamvnmnybksth12zkidwhweijtbs2hscvzess1ii07zl5vx1',
                parameterValue: 'nznhoshy2ossc8uqtx8txg8q7smuiwzvi38t13bxza5fdmgvetw2ronkk29dprrdawm0b2v5pw5yrjq9umdnq1h4wezi8sinef45hccitpotdy8gxh9yhxmsrcrf78k124ca395ooq39y7n3hftco8xeo11hoxdl3b8zfybwau6m4q5etunjf48beszk2tnx8dhzhrjr1t4z7arm4tq2t3foo6n86ozt8nmio50az6cbl5reghlazj1pj2pz9u14aebzv5pb93mv55sw4iq7g32auxgjhdw1pjtoy0fexsz18t0x2tda4apgq7iv3iwrcl04xrii5pfp6hfxlbwoanqbualyukzcsw8g77bil3y0hq0fc09t4qdqj61gpdkwnw7ig2q57ea234rd6ofpq5rj3l7fum17ky6g0l2uves23p5vxac0m51vxoxun6ap408qgq672yzvgpnl1w1yje45t4tixlc1pre8liyqo32letculkbuqqv32rh5x6pw0mfpu7ii7t2uqeoku388yslo1ibuepm3hn4fk6te84ogiu5qpwpkwugo2m6xys1begdpukiwcil7mfsmb93gkn6etc4ljojzd4mvdajbqi16qlpntulr87146x5jbm281vu7oxbmj3laf69slewr33yd4sk6673dxqrirog3n4ejsqhe6rh8egwvjnvvfrojxbl73e1ihmrqbtk6gpkbf4dcqi6gyzsv7j9w1rbikaj0hw2zsu5jzlan0lgxwt5dctwet1zf4d4cskar1yjhobrr8n5lyizvgppwsndjjzcti6bpzxvo90kz5h8q81rgn2t1hr4f7k3yk40hgq5mcyt9c96p6hj7diz4qq1n3ohnmp227mzuu3w0w3uolr6qc8tvmxuv6wrdxgb9g0s98j5rtsppdkhfgy06413fpraedorvi015ix3zz95d2b6wngz6vx3o1yjvpla99xo30ehoim620m5uk4wgzg0ehuekpi1k9iylzc4d9jccudca',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'k5okmtbsskgpqn4x9u529tby6ezx2br80972enz29z5wq1k6we',
                systemId: 'djwtuuk227vmm9oglt1ksw27q8whokk4mn4am',
                systemName: 'wqgq5l462x8gzbjvxrjx',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'hexw7b9ds13yi6ox1lm0lisrglmws6vog44c9z4nkjdeksebvicgkjudmts8nbxurfb34spbwjo5qrgny6250mhz3n8jdbe2roy459lrkloltg6l9edfsb80pbpcxpdkh1cqszy11axaw53z7vpzdei881le3fa4',
                channelComponent: '6750gnincaotdbigobsf8f0jayss2wv3jdsu08vnqg2mduca2elzi2z15gtrx9k40ygap0ve0jb8ciyl2q7uzsjprikj67oe85n0k3cvoaplp5uyo6sztakafz1mgmm65n5fauznpstxx9t4bd4mhla9m5bzempx',
                channelName: 'r2nfeiboeotqcstmfe63ztsmrueeojg37baitllcij4a13dyo3qjijwub0x3bzh26zzb6c76d8riy09gxkwwr8duvm2coh75teo7rdq3vp68adwnz0qd9wo8x9tuvdu7dt9xtuxrwvxeyvd8gsv06fcfjvpyxs70',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'ytpa87oj7t52a905d88i02zg97pp0zvk85hscmmmoak9wubahi3m1380p9zhm9vb94zxya2yxpstue3kdc10pv6zeggoguonmnzc9o0yfbmqe8mtforcacsm3rw1af0dbbydzscr25pohi63v2nx18mqrm11acbp',
                flowComponent: 'k1es6pto17czvoph3sy967yd8drffm42qbgh0y1ilnampz6unhmkyw4olbtttzw6ew9nn24qtbqydr9313nvksvl6xippeqg9i7v59udx2kj6o8qtf0htzxfgj6q37yt2wvrnihma4mgfjg4q876cgcykh8n1t16',
                flowInterfaceName: 'i1qbj6nkkzjp08qi81jnggdg8kqx6fedwyo254mjbvvgkql1964766gqp1lobknhqkomk26p2tln8lmp9g8qts262t9y58c7qvk67ueylpkd0vl9ohv0zsu7viel0nht0di64o82zsmdnq7r2167zxcjlk0nnpqt',
                flowInterfaceNamespace: 'z773j1prmckg8jroaxhvd0qdykr9y6iwxawavqzfw8xlge8hyd07jok73xshm5uvnzp0dp5hdvfiofmdxyyg6bufrup8w2e3u9f9vqadshhw0tkbaxuu90p1dhqsje3g5fxa8axvpojade0z7kihdtgk2ihi0xuy',
                version: '9aj98r5vwp4zq6ls9xs9',
                parameterGroup: 'm9pwn2yh7xviq7iyyhi8xceiytlr2qdbq9t492tgvmejrgftycy813nqy817epw3kjdz4fjymeh29rhgmxaig1or61qrdjhkyxjjhep0h5czgc4b969ysriw6exsxcy25ki7ylz53ug58o9gjzwqir9mtgu1o748v16wh7gypr92dw6od6yy7otchkqd1bjtdq8ykwp3sxnm5zsf2oymwssiwjtu66cwtcttcqqknzvj0ljs9swqfshd30cvfv2',
                name: '1w4fygltcy59xaww13enl1ma4ab1r9p1l4hn59ff7n0sbu98eopfpc9cpjz6b75sytb8gf02jxy3znl3xahfr26683ufj7sm66bi2bj672o5dudpex1ae25bbpc5qd467jneuiob1edgsxmivub5whghfiq8rlirf54kx4sjd1xa3qvxboq1avb44cydz5r4ga35btciywva8sjepmpkkuwug7o3mrfouptauhi2hy0einj0u62gk0vs84k990vbx1va46w0orii26jpsks9x0pt83ubxfmedht6z0ob0636hz88cxxs4sja5xww03i8',
                parameterName: 'j7govxl0dozll1v0siaavf5jw6p0h2l97lpn33bhyynlo5pavxhu5aym2wug44mspmfjl4d6c8cj5wv7hqgu0a5pn5nk2uqdkzg51lue94qg10toayt6ryn0e0nb1tev7qyozbeeubaujuz1umpalr6jupumbbi8oncxwuzm9wqm7fxlyhqs49nh0gmp8lyqdddiak42m7ma3dv64jg4glkjb6lj5lm3d0v121326tx7vz2tfdlwrqfb7xre0d1vvmqbeu22cuoymxplug4adfpzhdq88inj7dy786jsegui6yw96wyufu1fqpelp232',
                parameterValue: 'b98z3st76jcvwnxlz482d5s42i3idci3cyxlc2ehu66ydxa04uxfh1s17p0in9gfdyyw5lfpeyczey63v7gnig9c7rrmeg3ioyzidc9me2r09av66la8rb45yamfoaw19hs92n70ty60582fh0yhjmd0jbej44abfsb0n8bhsspz0ds9metccn6exz8ivl116lnn3hislrs3q1e9421b7m2r3bfqc2v003xk1cirzs8o42e68av4vnsqir3nhstkf6stgz9g38esrb6y9bac049xp0wh4mvofrc5kzzekccraprdtubt6a87ws7o0pczb8oct9mumor15su0n3iaox4ad9hptusfhygcm4ynacsrj4acf1ofzk2dsiei1febvfcsa7kw0x4n0pkobty6rmsbildxn9259hnn55pvmh1eocmhy3zx1bqqhh3vjmxyb88kn1vgqvpf6vnz7whp7rhlzov9obgje4akxzja6jswbasna8txnnolkv50x4vu68qx7cvy6dr7eun473lsf0mx3v97fkqdburzuulcoyn0awb5afdosxjv9hezzp7fsbj50n4cncux1ictw7ht5t5se63bp2nl9d1ckunuebd3t4gv6yq4w2rtjgpr921ac1o7wmrvgqm6gt951id97p1ntm0osic33rkg1u7uk84785x8dib9pfo8sm973pejddyy4cggbxdw00p5em8ml8w2rhi2avkg64ip326cwx36gyp4duuxpvwle1i3pff3ig7azrnae4e4r8t1pkzlv0z3pof1xjdnronoddqado5rubng33asgv8ebv28f2ctdrnpat7vrswse8ky3kkfq3puwjyiov09wsaux762kgevj8lat1kmi0rr71xai23ksll3nvhn0spcz0q535eign8h124gf8gn1q6tldvh2ignkn5ze2zdvspixndtw22gco2qloyrv1kebrwm4rf22k3i11k634jymyu08ta6l66e09bx5fsb5wb0bti5rr2p',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '66749qaoutetv79pluz9suolnenw8ucqbthj9iokd23aiqdlx9',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '3j974wmpr780p0whs3b8',
                channelId: 'n5qfh5ioqxz03m35e9pluf2j6zmyi3adlzuiw',
                channelParty: 'zys93zudfnxstxo2tqnqkljtex2cbtfzpq84y1r18h67ac01ij3ephqkoigznosgd6kimkydyibg2yncfw3849q00qiw0s2rkun6w3kpqhtwz5o9ohypei2gqucutld27x4xkklrr6b1nk5z3xld05v9s0u5p3xy',
                channelComponent: 'rccergp53uvppc6e5glndgdjrgjz0n39capteyfkcbx5dhvys2nuik1qe1j5j465zvrvhs152lhdfmel65q72h8a4fu05kkqujkpka72pe4arg0klmkbv4jvfk0h6dmn1g0fuquezdcxsd3y76buf6y6kmbfrlha',
                channelName: 'sc7bk4kda185oqhwoupply0qmtvu8g3zup2d9qysp6cipyl4tm856n9unnlhjh8vd3pb0n631rt73j4re1rc2m8prqne00el1qpywc20s1ttf0eedljdsfq91v53vi6ecpwup3fos3rd87vk6fhmtg1rz2lik193',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'g5k9l5814c8zszeweond1ylyvz2g8smlpmvmusq3kvwkrl3h37amp3evetrbj9hkugv7vfxsebhr1rzzz8wahxlt43tutxh3meyzswqnndpaed8mfzwcqy63wmkab245cj23mj49rf5t2lc339l1lk38p0k00yl5',
                flowComponent: 'pmt0ie6pbnum58m935q9jr5rnljyqzdv2besiddghqwun3uiapvgt3bknk6vky8xr7wx9vikqht198qn6w5gr9f43opn5qkkwewzc9xiktrwagtt02l9g0rmqqjs421s7t0v2vre5n8ro1dxbo5t7r7n3z5cgphu',
                flowInterfaceName: 'gw8t6le1xquz3xe1dqtgzhix9sxoi6mxs0o9gnrom100w7755smwt5uo0pgpj1qf1ianne2nv9raci3blf8x19yvfqdgqgwl5u6nkbycfkwgdhetjnorbf9lrxzkmmvgsywdghwderlvgvkh79updeb1t526o0af',
                flowInterfaceNamespace: 'eecc7rgxmdi6ljawvq8pnuy2cy1b5cgkx6ljdqdd2s01c5iagrabe37wba0n1nvfs6ylagl66dmpzwer7yzdk7m1qtrj3i1i4bx120k5dw26de7m82y1yd9thhxyztyil8wu6b5n1l9np04tunzr97gajdf4pnel',
                version: 'b41xpwl0jv1tyztbpkoy',
                parameterGroup: 'lcywlwepmgz6hzu0ht38tkn14raus8gac6c9rxuwif1e0t3hz70uc654sgjilmw7wo6w8haj6jaac30wjrqtev57mwqvlmc3q40vg1d869osyid08uvaf25zh2of19zgecnp6jhpcd3tiuxcdmv2fdbdcef03lcmd21viqxfh6mc52f3zvpnz8px4pa9bwlhplm8ku32fbpqwswxq90519vmlbqnklby5nmqpl8si80ck15juohqprcldtyjbd1',
                name: 'oipn3lr3tgstb4eix4lwytjlt0aknr58bdkcrq3g4d8av6r4illc09eyie2mg0amitl1bru9nv98su2djvzu44b4hp7nnc70opn55ow3u2tgti5j8wjyuccvtra3ymfeyuuotf4fq3jbcsvhwr7vjgftctkl5gyjmx8939ma86373qgltntolh6urm1at9bwdfa04ph27z71yvxs172q1rwaznzhe00ofobvnl2u9cox0t139g1hol17usvo9roifmq4ca33lnp713nen9no7iqzipz2cl3q0k99jgw9mhqu2znd1grw3ec0yfsg42r2',
                parameterName: 'l2bndfho68qlw24lnk5fhk6y2o769y2saf7wbad2529uh0y3o5prl1e03tdoygkdwd10zbayzpwdjd51tdna9uyfshuyc1xhd6sd7gyrf7vnxcc3xy4xa81tlfau2hmi368tf8pzv9pze77bu4sszmxlzjgjzpl94wbxgi0d6380urjlmvtewjt1k0q7k2ew94f5s4t5rxxaowl6gz9jt2lgm6xk6aess5bkatbxffikwmgzndwsv3vgwfpz6ibmq1cb3yw1mjt84u9fa4eh336r602frt66h60njcdzqlhilmnytl7mzo9ocm09f8k0',
                parameterValue: 'kq3hbe0fo15qiyp8z076g3gn2ol8f0d9ny051uqb86nsspdfmhirg2pzmciuhtds67avottc6ki5f5g3ct15z0sriisa7zp6txtqr8sje02p4nqeiezphs4h1gmowwv8eykbrlw7gexy2i5fvpg0y96kolei8uxjsq8ptryt7ry18nhxspyj6jeepuljndfo82lin0ekexq8wrt8ebxs1ui1lvo2ujhirnilmoibv6764m51ll3n2hbjzn4nzhktgrq80jvfs9tnbnblanjrq3dgbgv13rzplvdn87oe8znfozep7k8d8mo1uhxdjmlgnmbz0sjjwy7dypopd3xz941we692gcomrr0u6wwrq6wmxa5l65bhqd88ql5qisb0w3mnxt5kt52jrys56ekptxh9shhcxyx6td5br8j6pfm1s5gip9dqlssiv4juscdrdcyh5ab6f5k1nhc5uajd776dmqlj9iae0m55q8v0g1f1qb1ltx8qssmiy793owitliitx3lw258egy326cpsf469z0w2i4r3rk7e6nsxbi2pugas607k156r4jcc7xflgjpmijjiagfxp3nmtq00e8h4zvhv0g5voj2kud4t3dmkzy0b6dsusrr44zrg58f8sb3tpnu4zj13dbu816y1bf3dcxmige223h4q23ifaouyzo1ai3ojb86nkv1iievz7ekbxyy1ajulqfqop7kq5li35ow53hc3ophwe4rc90gjva6anmifcswvkfx6efnypsjfwns2xrfac9776nsyaxvyklyz8ek7gnb2b8yrkq6zzl15safymkrgseprp0cwwa31qt9lid21tbwczi6no0mun7evm79jmluq0yoxbkyjtbul3xufju36st2pi3y17bzkdrfmjcfebznrgair80azlyor240cxo40fkejyzvggtj4762hig9el21f7xa1ldlud8zhn5l68bp1ik14gavtwtij82unv91egt9fi7cg72jno6968yj982zr3x6d',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'l78k6apxn9fxqd7sx9r5schx4x5toi6bnmvi2y48r76jlel09a',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '1q09pnu2omexxpviki5w',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'n4yna8ygwzjoa2fkyyz2nycym8e61acgstotmrnc50pbllwswjh7xhpcytd2hwb5918ax1o9xmpm8o6mldrfnloazep84626gmua2hf0a9c4xjs802asxhqrp48vud68psnhrtjl8i8hicj05csdspal1awjpp6a',
                channelComponent: 'k0yyz2b84qg4bn5wo074kv2d7rb27tl6bpvgjyb7ngp4pubyoc5h8b5fk999waalhnu8axi6vdadhzf4y63usba2e6dc0k8x5x0gtl1odzbud1yl4f4sh9fu2nzn16l5u8nj76fc3u0odm9wovtsoi2366b1c051',
                channelName: '8xflaj47jkm0pga69tlow9syrluvy5u640mxrz1nshe528imgi8hb2uca03ise0cpic7bxghm0r6c2y64bq7zta9dzbpmjc4nhamz2hen3gyixot65l4t1jpaqhved1ozlonmv1iy2dhfd424ufej2qzh6ney515',
                flowId: 'idnx79aennz3n5i441rq5hml6n0a05jogalp5',
                flowParty: 'm8jyjcw0mh5i16k3yi4o6qx7216uvzepka8f9aal4dkezi7tv1g6wltgz2c095jhvbw07hgfxpbi9t5ws5p94lvvvpcx038yegvxt7bmswy6ek3qtx5973g0nvr66kfuk8ltp0cept4epu2zt192rdowjv7cop1p',
                flowComponent: 'enpd26h54al179w9jfi30v873b5nb3lhpr7b5kim2zej8su80waj1gisx8g89oxthvafn0get11upy75p6wyffkwt2vrcxbi5ue1ef4i00m2yu1pk55b76vhitsdwxr988lz8i8lrda2gvy3uoiyb2tnr5cfbx0o',
                flowInterfaceName: 'oib766kq2rv69qomz2xibeiz878tlhtj6of0qwwv5k85fihtp785vpkr853zhlixp6inuy3fmd3l7i02f5swmmizc9ou8m27smv0au5jzcadeou0522kj30zxmmlbh0xnsgp3c85ekaii4ycqtn7ucvquldapvez',
                flowInterfaceNamespace: 'grl9obbyyu2akd3sbujy2u8avdimftt67dmqf9q33w6ix3lzekpme70y8zar4mq86vcoddef8bvn5qldes53klr6dbvnjowl96t92mvs1gr5b2pogp5rn7pf4pb1x0s6vqna7r8c705495eepdb3gmemq63006ck',
                version: 'mntyu90ph8ieq5lscfsb',
                parameterGroup: '0vb6vpx2cns79zn64laeg05631j5a9fn0eah82ulc7gatc70qgbxqc7bjqcq6tetwiyqjwqygrczm1lpmwwazyjhk6kxi2c412b64uzk7nes61ehj6n4v22aldje8lvfvd0mwixtyj5zqvgtcx9lw2q8d5kgub37j29rzdmsrg95f06eduv7jcjotttvge68drqh84v12jvrc9rq0cakqxp9ckwwv63xb9kzas82a8snmyu6k66mx9g5zaglra5',
                name: 'a41htmp3ffcqn09f14btxphtiovrcza6v9suw8shscsm60p6xtgd5zjcq7zi41ejjudjosss84rf6vcm1tyw8rc4chip5gmmx7ob4l6rr23p5b6ucctvh2d981uhnb9wo6dbf9sm3jpb3xm1f6a8xlkb9ill3aub6yx7qlwhta8xvg6t9sjck9mc5ady47luv3ss3ur98ua59qrqjghhvavk4nio4m50mnak24lxsqi09wpy4tl4hmx93wc9xyvyq29x1rrw96e82f56h7t10jhz82zryrwaxyby4y0c6auruq2kbkzsz90vaaka8yaj',
                parameterName: 'k9vr0trmfk3qlr8hv9le9nj5v4k1eln7cezl5pc1smbq73gmomgpmknsvv3qhfyz46qpn0fr2zeonmzthcny5zokey61o8bup3ueoefkhyzjtyi13dpvotjmi56r8nxhdnl6v233csl8h0anqd4g07gjnbfv1ltvuugf5zl3o9716qvpnyauk54rk1x3jp83866h22rbaioo2uwhf3214au4b2ao9hbynpjkyttghyyncvvktkgt982ugwk7ltgiv9gdq8bhixkb58feryqy6pyzricp63sdcs2ztug92nt7xjg5yrmel0dgmkwfbukd',
                parameterValue: 'o6g1uwkewveoj536gozikwzs94r15jj5jrm9en78hw2bubu0ooikx01ge0i99y200n1h439z75zwhapfbir6v463fi993ndt1ag4p19jni6rs9dz4a2jus316seiojqwkia1rg0fqovszjysrei73yzl68cqk3a5dqai0tn7xit5ngen4yahbmc1rikkpu6g7vz42x82l5qnv2ds5y0n0qzx3hpajonw2ra96l89pa2c12fx5aa6zkqbc31uco3j02z3c6pzjs5tfxp8q6wg4tnpnht4jv786upy3ywzcax5akzc0ihxp6hntgx2rdczggqwdabku548vqesjjzw9nq7x6luc7b9j6unslg00wrxq9fkr1d2y29c70b8l8ptt531j0kgi5h5fwc22qiw0qbiozxjydm9cq4qvhpybvfoirqh6zj7ubq9pxdu20h4ybx281eg63kdvbal61nepaz3168uxw7rkq09knd1rwn5m5kiw9bkngzm5rtkeg3xvxx5wxxyr6draxlnvleibonsl5jieuwtzy1w1udlhgcap4pmbojjtco02f8mxmhzcjg6qkgnsrch66xxsyy05n7ohl8d9bfceei223usk1t5qaofocmzkx4vfs17lts0dhx4rtvivlqmc3zbgk920dsbza9lw8q8lzl2418lx3tfebm1h7q4mskrewo2jd1lfc7iiflauasn5y51zkmzwinb3urk7cqkirqaij7c7rnj3zfqfx5zmufn8jbr02ge2ez8tr8fcrjcuzvj7v8oxn29f8g9phjxzsv2nezsdl5kl76kw7fc38y6v75kamozjbk3961pnupl0rv0m8dluznmeib6ao9kf5zs3sydvkbxms7zyy6qeq4p7jfcaifxvydiqaa6ledrxosnsl9s0kx5hgtix9hkovl4v806dkp2a9382zsn206l14377bika3og3jvq48qgijfbbe820jylgano9hp8eh0gdt0wfx308mfwo6xf8n3ij1bb085j',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'nrmvjydoqa0xqnyia191982n3e6w5gl9lr77c9li9vh54ofb1sp',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'b3qznf9wklxs8ubolp71',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'dskigub31rei2t7px6dgj2ote7emoj7go7lwglrknphyzazi65inm7b7koi2mhb9pm53yjvzjyepb15ep8v1vu9u58qeh7s25qta70j4mgs0hv36585medmudcw38gw5b0ymvfoztqtww3mj2sg4d0w8aqpn3f7a',
                channelComponent: '0d0hu48q7iad6a30kh6bgtr6h91onzb6c71r9k03ea5v5of5hn6gpo0qbqnb7p2fb7fxanv77qwaoo8rzho9zs6wrkyhtaqx5d4ay5nboyl123lw84kzdmjxwsdkiws0oiectlfuz2f7o0dh9d18dar3rbsp108y',
                channelName: 'n8abl32qbg54t473sz4fe9xag70xvstpvfuuouhn7z2rd4xtu8p88olqawevae0sqfnzhl9yfqrmxjrlflm0xmm7ywvh679sq23trej4akw8avqj1cig4swgckunoesuut40rh1lhik0t3xul7guyk8itb12xcii',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '41fk50ja4ua09czxuvwbqm1s7tcim5pw32qy8eexpqciq4qdl96d6c8hos0cupsw0kkaduw8neflw5tbnvcu7erpslnkzdbcy6mr8hx38kjmj1ip21oe0h25zbgh17fa7bn1tlw85kqlnve7kia6djrxgu7qoo5c',
                flowComponent: 'al60q0euxbh6zg1cia5gduyfbiejwhmzipd5ustaig11ofjucmimbs3e40gf3um2p6g7z01nqmyftfxh0kmil09wtfvtt55ketplgk5ryz6i61r4onittr2yt0yh2oxh08hx8o7m3p0yciftm2ub96xph50c9h7o',
                flowInterfaceName: '3ysg78iitjxkije3v4g8yv05zlge7c4bczk75cwnhk8g629ql173v9mqgy1pr871i5ytqn7thk9affqsjgn2390kjtzjt5z2b32j7lczlbrqf1c7n49o270ktzq5xj9fu5t2jkpppe04xdr2hh6x81ticaj4j8oy',
                flowInterfaceNamespace: 'lktx1idzedh8s5vq6qfv5zuygho7f369dka4ekfzzkuvg8x3qwcxhsc28d47jw45lcyillt0dl8u3ad78i8igujtcu82v9zwf9eypzr5ixfs3gynp62hau4gabco7p1f6h1bb8a2gb5fpqghxmmc663tctxx2i92',
                version: 'a4x38yemtmf1ad2keesk',
                parameterGroup: '6dtfksmemos8cqczis85q8fex9qp0763w381e11kix0qq8eh365vxtr59bl8p2tgt76n87pmg7q08xm6migyy0nv4h02gswsjupkoun6cpczkuvwqnugkfyzsr0xzht3m0s5czlb053lqtfb8k83dmywetr70qcw4yfkcf9653h6r1p5401nsszz33w0asb7miz9811g5sbbmcvqc8iut3m01socg02h2cliyvlp6utwfw6bvlwndga0e3n13zf',
                name: 'q825q7ala0701c34jl5t5lyqqdw455btgyylke3ofc4mfn4osols2avn8ycqpp4vt6wybeacpnsdzngvbxmioo0w2oad4ekxo8spmem0eyqhont8aadon8fgvi6wudhumupyk1bi0a53nga2vdwy3wlyoccah0xlu7lbn7tmfgroh0c80k0lqofemv9e48dgyik5cnvxdldl1710wvw8vkeejkpswg8k9u1tyy6336r972ipd3wcytw2c4t4dsn2694cb1vwqmtsuzxdhjltz03r2rngqx0yhdbllaw1hrc6ogtcculhrweg1urdrhg9',
                parameterName: '1mawqrl439vokztp2v3s20viui42be596kpz2lnimb4mbmphlfhrvdjcatrhambnihk8h6b92rz3xhmozysfrvqvq376czeifdlegs7v7isxh4vwv7wkt1iyd2d5topt7h52m2ieqp68av8j5ii17m3ln20wfiuh5t03pv2sedahm6onniej1zs8g0kb3uwvvuq1yevuzuqmuoajdjn9bodlfeq6nfdrxf5c0qt9n7hg865b1xiik4a56yh2qr8q9uuo42pi77z0962jruillhzvb89tn2j3e2c4m9a5yfoful2wmo5y66nozf51l8yc',
                parameterValue: 'fglgz63fyk6drjxprr40xk8xr082qzf2xhi8ehx15pw1nfsndoiqc6ssoa7j6qtyuk9hhb3qnwksvdo2v9rh9hx0dcts5ystplufs7k1i2redr4p5afs3nbtgouk8q2857otdn24mfmimhgjeol0ysez37bdaih100ozjm4zvodnw1se4t3h4pggmsh6su0ljxu7jq980v0sixbt0601xk3xe5evnq2v8r6drqww431jgqo58uij7vxkeffmp33c46br2t7curox6ath28xz9cfn42g05e219qcwjy6i9pcw122yn6mw8umtraze65szx0zrulek8tbhm5zz91pgw38fjo5lb13o8tt6pf8zi90ok0d6r1xus4mnziqr6pbemg2l2as32b8864utjz370h69hbdeu9x1fll3o455qa4q0xvyb6uuoa91sawb4ec4t0g9h3k2yvxia6i0god4yeada44270vdttc70547dl7a15i1iq1c0dki9aut49636tao22s27npov2uow4zxf5cq8yo5eihx1a30taxcapmocezxgcrpl72g2dehak6rvcxva6dtn48416j5l7crftw7zhb6tosalor9gw12826g2hvus3ptbawhv1q4o9tpegbvdozejey57boikhn0o9ozenr7hqcf7b4shat9pnaauobq28x1m2j2z9d88hdp5lc6xqgcmco0vd6ocygpsi5co88jmdy0ihe4shvhuncrjg1h0zj0ot9ij1rqotze1jzrwixtvuvbt4sawei9vs0qya97mlmhx9z57v9yxfwmazzhfwp3q48rntxkl6sz02tetif7760v66art9hc06x75einq6rh5xvyc3ybg63v3as9edmqpzuqpyp5ih9z0br6lu47f25ifpyh8svi4e14cbww4ndthnwj8jcm1asixoyzzy3n5qck0teh8csqtgvv4rjxqpanxxstudndvkj29aafgxcqpw4keyncor981mzach392fnconmbs6ma',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '5vmmiv55865x0edndvqkh937g8nzlaov5s4uuy17y71fp050b4',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '6latrtcejznlsdc18bey6',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'e500haaggbh3mx3wd5owj0mc8bbk2j5i6rszznadcutyx5wlqa0a08trg0uygflrkfm5fco89tzestrrlhoy6gq0aksvw4pyowafi26j2s8n3qua6oq0exhw0sgpl13ouysiobf83vzqnxv343qcc0vi6f69xqp1',
                channelComponent: '8798l7db8pc8k372l327xtedvgb9uf5zx8omig5vouyp15x58k4o83jctxb3qm74fqnygnlc9y04as1s75ygp6bvokrpisxm64xvpi0ubqksbwr7dz3uvy26roan8rwrrxlcm3avk3ljanjtx42c80xp7gvf4fea',
                channelName: '3z1zs2vobebuwkmm24evzx9t7sdd5b4ik8j6tq6ty7g263ltwed4l0atp0li9bq21d6r5d4oddewb14nxbfiwm4dm504fyanlnyit6zlbucgrs1n2anhxkz3wk1qut9dg423lynxl5siea8itbos94ae8lownvnj',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'knixaz8b5pqoc2hue22jyde4bohw1gab8tymur03pr7cqbn40iqyb1r8g34942f5cm52cbwqzs0pljdkjge7e4fp0u9pxm64tzj35nf754gfx6n87i1fe6j9pitcv2jzhvwru3ri1m6fi6nzbdro3c7rl1sgaz69',
                flowComponent: 'xcuehi7ijmhp3t0262oi4yb3utgvyclx2lmezm342hq68lmqawbo3tz8agssqeoa1n02rf38kc6xk0nx3tuabx7b1pgjdap5pb7kjydmqs77sq6gwumh3j0iw13uow8d1ck2oipsbbfpxqkewcc3vv7kin6ynohh',
                flowInterfaceName: '6j3g2f0jsfly5l6r8cietwa9cu3hwazqe9cne57w5v4hp3bnq5f6y3v61rb6z9rrzdoia9xevie1s62tj9my69t63jlo38qb8xtzu81sumldu6wm9zcbxlxbe36txne4a77ytfuy5u5denkmgwclbefotbz7149d',
                flowInterfaceNamespace: 'faxetmnvm9oixeq2jdmxi7ud4f13ns1prvnm9a8mtbiwqurcj3ug2djjhq9iqhokhguymh8je7w9h07rhuexpp5ijm8re7w78k8rz7f46vkgwigg2d5eg9s7189peg5jm6dktx3hc9xjd72domighosr8krwil7n',
                version: '0ptt7ezejscyhi708cr2',
                parameterGroup: 'f2e3mlxxpw55bcvxlqbggdka2ju6eebhxehlrpzo9jloo9lhfk0ejs7ljdt1l8gi8yikibf3d7q5t0zmm0lv1fzhdm3dgz6h9a53svnv2zeqp4rn3p6ob47dcyj6j11xi4x81y7qk3r79os99koa9q2r7idaz6r3d7hp88bto1yhnondfmuztl68j3nifoktk2iniu7gxx55a488y92ju8yfp8v4f9rjmb4j6ap5yosxrc8bzq3g1hv3jxfgeyb',
                name: 'lc14zj6blsy9va9jilqulbxono984y0lx3tdg0m676sc7igx7aeysy6tymbbz0c9h9qm5u86bnr9oohenkzjj2svk9yhcpf23fr7xyjz6ebbj5ts17vz2x95h25jd91uryp21s0vgek7epxgv515us5aafqrc4wi7mnpjulld9y0q8qi1xw9cot3vcspu7jdvs8c43zf5cxhzqsecz14svombqcylvb87tm9x5s8qayzmom8gtcqh168c6w7870dc6np1uaxvuvzx0ps8d72gcssmyqswsoqf0feu4pukxw85ek6rh1lmqyx558f0hiu',
                parameterName: 'um4z1bmo5d0mocwzmze6ijig775exitxx4qgzyrkdjicj6b3kevyhjuhu6k1tvv7oyrkj3qc5auwibbj6e6gupysbwc8aqiufzh5jqs857ay915cey2raywfm5uoc1wxyan8zkf85gx4kkgu0nbv4rbr0lrn9qp5oppcbe74onkst9cha9eht1fcsj719p9gwhn81lial947kyhciu8p9vrc8pjw2wkdxeg2fevuj4ns7enhd0gdv3ddsig6lfc6gmbwhllgr52kabrpoblql9qk3i2bwpzqcxhl0efp4kb52i1ex72r2p1xx3uifzv9',
                parameterValue: 'nyudk7c70yf413bqfmuq7j7uqcv9l1qavm7vapaa8ezbqizwqarn4ff94e0b3rbvsk7jplz4luz3onq71b550bwe9njfxuiefil39zjzcnjsxzfewvidl7n0blv20ymr6o5dpqghvlkmxpjkh6vek5vdjgcm509ohch1ikoarjii653iqjamtmz3267u0x0f23e9twq3ld2ytm86i6g632a7y5etl4lwtipxkv34rw0n1m1vgk9t9rf1jy6i4a3iqxgaot91j43h0dixmp4v7jpkdwwdzpcuvknu5qvhdnrghqmi64l2ln7ur9e4rmmgf46078oy4i1zji0qt3e3873glfqhttzuea6evfl4vmr9jz3cvew5we4xdanb3jh291tyqyijniaeignjpnzu3v48qwe4lpbfxsarziw586mkvyo59mdw0gtxn2fmstwfhz0zkk21s2ppbyhkpn5dqbjwzlbiobs1xxcsqe2v0kcyjf8lbipqxzl9ebjmkavix23jvpc59yl5qfs2fue9mr42rnay9dkfap4nycwsdm530qmhag0ctzb52f1wtdlvpbjrqcqe3o4th2q95xloa5atz50awi0xhxlvhx3rwp54kltfefap1fgmkg31p4dfmgc0rqxf37esmfi2h8pa0drkp83vslcer4ciwn8frjxmuin093k922i94yyfa65rbi3k0gprppefluooiibuisvmzmgis5t4k9v2etkvdwhobuqqri812dl3tvrp3f64o0ucfc5qfmbht3yqdpuucbn9xuucjr1yfgbqjblyo7m0j0t194yhfpoau7tkc9c4j3iuifro80gl19fsbq7tdmnhksar39zy9ht2v53nu5fdsq70t9qf5xnfdou22iroqxe7n6m494p8963xrhxnt1ajfo85hhuwbmz7dy7rg9muea645wz801gy342xj59ak9whnmcr4rxgo067v30btagjp33mbdl8fn1v4rowfl615r2a8rtepedvu4sydp5v',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'xhxz0zh0dc60ufymb6jd8u84lo69ap3wopedom3f0pi9rfrm3p',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'ws19u354isou95hgck72',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '27jg16ib2r0n8iczkga6xagx2jggw7pa1d46r0j3bv2rap2f4iqxd4x9cxa8inolbsm402s4n1s8yeguzj0jq8y0wu653qt0ir5nv0zw7070de17wfwt8owrjz3ag64i17dn4mlr6kma4vux8wywk1qug71wc8qjs',
                channelComponent: '9jcyevz9ikw8fsd4891cg7ziilyldkkcu22x05fl6mf8x714kl8ku05hqmu2jg3903pwoqrrfdcwmh9kcjtjal9yfpud5rutpdqe8z9rxry85rfbppf7ejakcsyxu7u5j6rivsuem3h02nfvbx28kw1hut7g6oq6',
                channelName: '8frse704ie99fjs1aiw2q6nu66qkuaw2tqv707mlajwbcihnoapxyg0c3kpmfrh6xqgg2ulwkdlfag5zoogkodu0pmw6e2hme45ryrdd11dax24by7ooglb3nwamehpqjqwdvruow8a1cq4mwwjck9aqfkoox4pf',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'jksvnuhzl3kmcu0e98fo5o9c9avm64wd8cwkana4wepmk7w6dd2oglajdmey2g5gvozh83bz7vtem88wktf4emhragk4hsmwoklkqf6x9xudb851svgx52wi5xelg0eebcstgdj48697ztptsi155fv9bpz9z7oi',
                flowComponent: '0j8l6lg0gia1iw94dauhf1qtrcxl235wtlzy8ie2iyvwcasowxgy5i753qlgdjpkyc6z8xwao6mybcw9emrxvqorocrqbx9aow9w526cwfwzcw189ms4x4w0ii8g4oo0ez376fgosux5vyc499cf1j1lg7y67jzb',
                flowInterfaceName: '97q4me1rc6blendf28nwj6n481r3i7of061zsanb8gtmkzbm4t4s9mrahj2oaylgoi191ocg77x2hdgdcaujr5k6nvjgb67r5p70w9hyajf46bb0div2sn35eunikhmkgh61hdoao5fzn0rr23g0jzgjv9yrd3jl',
                flowInterfaceNamespace: 't0yfhoyrn38esc8ilbbtz6eeob3zij5m82o04t5s0rx1bwmd7ngjvc819g0w2asg3zjrmd3qt83krilmdx1c6mfacvpaeak1j33h53zoyjo51u6iqr4sopqfbymqa4kfar3nqeau3fw421k79wwr6z1xpriut5jr',
                version: '1lnlu9dv4mkh0od47gs4',
                parameterGroup: 'm1o3klfxp2szu54roii3jxwy9jqym33ed0dzgq73p5o397r43qyufb8zv212cdmhxu2gcekpabphnm5tdkzubu0refglm10jdamdf2hzakoitraed0c4i9dq2bz5ilbqh70v2q1fb1r7neuuut840vvc99w0ene8zbdw2o2fvtn2upeecwr74ofzqkapiodiznshofdbppik807nlm26f89kh16ow10j8ooqdl2ryrxbtbtn3e8tp26jib2f5lv',
                name: 'yo9tbhghe8s069xmqaz757whq04nxmcujjfqqzn933jqtavtw31tay60pl9mwtds8xr5e85klhh80miay7kgpz3rns6b71m55m0muv5nxlhcig4zt6a54488jh8l6te1rp6lk5mtalz4vuhukd77tu06uz37s4srtf87v7ic0y8w2q1l5glb7gegobcbstwbtc57nrh1i82rhhm75hu3jfpb6scy9m7n41g0frdixs3zgkwv253g6x9l4fwkoqwvp8tli10ipn0wzazi4g7mfy5h19z9xs593sxdlpsyfr5midewrlwefgvysbesl2l4',
                parameterName: '168n1elg6pzup99kpn4c0yhgo9jjiqel13pq84vgai2puw2alg0x1a380q4ohpea67awkss9utsablr21e2uqxhmamizfjz4g2a0yrb0b901a3dtwty27lrj80yoh41q0t0ed7b61jm04swc6mbcy25u8akldqhn4iipgsbx6sq3jez0wzgh2ul549ifk834t13lnoa7aika8lzrjk83nv8s5vlfxu88j2kzi4xt8o6jcuz6hbpxyoz5dn14gfp9f6o9d9c8kmnpwojecv2ippss27yasrpddmm6uh95w01m7xpuu40xciw9zwiustsw',
                parameterValue: 'l1davvbvl6i52tg5bcywkom1j7wb47m4f09pgonm95c1hiaa1jq944fqhef193jqrqa41j6jspn3mi2xwkzahlhktap02s7ncibnigiet4tzv30a5htz4mu7ck15aq44xxg4xurwat8qnar3je8v2o4s9eh36sv69e4c1ntv31xgo4ni0v7wdp05mr175rdmahv5f7awqet0gbfnu1fmgv6deo7kfqkltz796omfaznvky0ook16ih7wb0q33yldbmohj54tenyuxfwaa4nl3bqeww6q11zreoerj006pc0owp0kpv2ptje2jhfjssit1hdq7dcfmqlq3n4ynr8wayau1tjugp4nm2wicbeitukm6mq8qd5aywvvb4yqwjwo1def4r59pviyueje8ylxfwlnzmiu7o78ip8i51fmob0goxqfd9xcudm56hc6481zgrj4cuy6okcawelda1l2yo8wn5ua4dn210r5zby3qe909vhds29li28bgvtdbj54fmhhva3imyk9mlcygfpu9nkzhg5sxl6l8gfvxb0oojczewlqjry43s5brrnrb26gdzfuofbya9lk7rs9jmrumujghffckzere6m2t8p4nagfu8eqpnyb6s7dbab3mk367zbxiwo0j0t6g0vy1foz3cxj581o4wfekreigb8urxcy7na570h6r35hfd6b9fzfmaexsbgi5t3hb8kh73gphaz1nfjjr8objyox06xqz1c6z9w7ksampms4cqxgunvgrku70ld8cth0av9413sa98tdyq8ff4kdw1d5siw9r3yqf57jtyaocucozhyl0ddqzhyscw4yn262s4175dnsh5aewd2xx880l6ffu9wu4pyeb3hsvfnr6ukw0pboujzpwvasutn16r70wbal3kikdejigq7agpwrp6c8xq76aa9zxp1ciahbt10d9f3pawsihq9duskxiws7bwuuil42aw10sf1pcp82d8lfpikp5qgm4o5nvbsqwvm7tef9ryff',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'zdd3cfqqmow45ft0cs9zktyy0ir08a235pq7e3wpismye0to1r',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'kx0r9dqrkst7jd4uxdvv',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '1xp8wrffebjz5u4r158dj1gmn9m4b86uweo9ovsxhb8bebdxove9es4opvehvr8115yo621xwb2trb2wf3fk2u4qq0oxh26t0jq0sr69by2tpekew5jw3mxgp7p1a7ksru1sqr2m5t9nafj214ss6l7jojj1ihj2',
                channelComponent: '4s23vwrz3xk0l7ddf37bi90z07mcr6oywybfysg8uae6tzchb7329jpwnw0gdhtf8rzfilxr556zg5qrv3v3qhinl1q4q9yvtc8jtqh56ativojy5ro3wjxjj5uq2cbj04gk0ftkpx2zhxao1svhgausnj1uazmfq',
                channelName: 'zod58aamvhlwv0kpfjw5fldh8qcafyqbucpd1eg2hzb8u221wu1mo9cwau9rl1029rzmkbjkv5r83s3o2l2nyqfhmxaf5upbwef1wi7h0f5k49a8f8d1l83klhuw8hobdb5p6b59qkxqvwx4dibm4279z21gst33',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'i8dl65dhtum2vi8ckuj9fo3j50o4rmnzs6nhbdya3yaucdltw81mkippihtxgqlu3vz2zioe5fih2h7gdksvu5n0azm2x6hmzicakltruuv9ua5r1506wkzse06iv8h83ey4bwv7mhozd8hmcyhwm8t7ehijilrk',
                flowComponent: 'yxquc4b8r59vummpicgc4t1ew6i439jh8eexzusbcg62kq1b7mfiqdzj8lhtk8z3s9jxoiij29x61p8tsejo5grp149ww7he53mftbqyxkdls7wf2jai39okprw1t1btb6f75ly0jmjquak1iq971pdzczu80o2l',
                flowInterfaceName: 'w0gc37aycb1ymiq94nmpi4iyemsp1ykz4l9h00sp7r63093pg01382zf5vdfhoobo5fdalt36l19w72u4yn561wkpwunie5ngr6zn86laew47uydcpalwepu0nx2hmjxd8aq4hss9fip2mlps7y6lpkkbh00j3fw',
                flowInterfaceNamespace: '87e4kbrgkbb8s8zx2mylxs3cjdlbzmhvu301c56hkupegvzggwqhi8iytwxk63xq4fu1ukh6mjr27zwsv6cf2k4s7aq0caatypz6r6d6upmixs44lgf2mrgnndxw0cvooee6ga2apgakzn3ob43k4zf7doqrdxdj',
                version: 'slx62z6bqok0j5btsx1q',
                parameterGroup: 'rlzx6ckmjhu79lah589lkkz2w3vlbggcu8ff5gjb4d6347zka6dkjvaoqgpogj3j3rw30fw5hdca873h68zpzqmrmavf89a7x6bwzxiomnt34el16vywcm5rtufapbkrau0x3zbjdxy4pmj5diuww3nepkxwh02a9r78x7kw8ygyr3g8o4yaexu6y82z7uf9t2nvindzu8gv3wn3sf9v2symsgpnt2zuz1tphzff0iukj3177ll4o3rvnbowgki',
                name: '0vs8740b4p47wacg0rdj1vp1vpymjuyeeoevlab5q24auiarqxq9q8fu5agt46l0pjjms2m5glnie2fle3wtm5xwbniw5qcwjl3lb916s9ifzsri6md2usudk501qcyf1fq7sfe5vnkq9g4klhx0cthguvl0msvloxawqtzm15hj0rul7yp40npyb4yjl9tpo0x4pjmuctzqhqxg93ape5l2bqsrrvu90piffb9af3zqsq83b65b1tyk7znsl4duc1x2cg5h09m0c8j0jkpnfsypyp9w8wky7wnt17v210ll01rcg40ss1w1a9cg6p42',
                parameterName: '9jee7gggppmgp3cqogt5uh82m2n9mp1kf5kmp5zxumjos53y6gzcb8b22h6r7efgacxagdvurxo5mpwrwpagraw70p84s330e0xn8jmpv4xzhv3s1d54401i5fnfjcc5zokdn57gpi3b7nijo0iou1xzhum7x2v7qejeg69lof1m8a02gs9ljv1r8jox23g2zy91jfc98ojy6gjexnewjp1vjmgxagz5ouor3hzx4el9wm2z443wl8wen7t6mwajd23hkpcr2u4nlcp3j5ql3tt26ske4ac7cz3atv55edtj4dzy1dp9m6s4eg1puhop',
                parameterValue: 'tz6p2gnx95jyb908k7m83vjs5j1ed8fahxnuitxzh9l1vmpfrdhttfmbolvfvbqsc1hg7o3uktfimkagc19ksgkhjj199nccvas6uw6d7gwr6nn7bqy2xd2rg2gc8grz6xcr7ecy59ov1bg5us8066zxotm2kdv3x6myp7qp5m0t7dgoiarh3ezfvoiazztoj9qd9yklrkgetyot0p7hiltfgy6nsspj20nnbskw67bsjc17odz607b1q028gdbbkxr063cwwd1exeaz5ddyujhdbo2e63iyomp0xx301ju3iihgg2y2am06ocm3js8saw3czp06cnw8xy4klj040hj9qxznpj9vrd17p1hfsy7sxxpsjcivtkp0jvsln8va5z3yxgjahiw4n6t02ajh32i9cq639a536dkkbf7ijpr8mu0tkl1dihf5xe1shnxd2unug6or1rcowl5m6s33g1lf35zbzkcda4z99k0oq6jpdaemxnw31g2vcowsselhzvyeuygh9xb5of2jnexyj6ucoum55qcev9zrzzycbs8jsqq4rzbaa6oczrxiv6oamwt1ufzp37amfeldjep3z7f529dt47onl5ptq89bdantmw7of5hr7prt0ili0s48fx894p6fchuicv820sv05d24iei1qtco4o29r0yentmotnhn4psrewx9wa4i1u53a4yr3vpbej4rr7pbpagcfqnuu4en7o3wf7ir6juxj8w8alifcxmfxgj6y40n9kzt4m4qu6f97s46xr9g0fyd9g3rrkhfit4g0z4ex2ag8te82ghuznfnhkxvztjfnetgg7lf7mm0b7lt53icug7cyj2kh39t810myythi07ggkwd9ulgh8p6m08otxvqxst0me1lb2f4rd4sh31g1i1mg8ob5iup1rtzl14t1e999tf21xcmuasw59ivt6yuok34h94ykhn7lr7alkmb4zwbu8t59ws8dkp7xo89jg3f5tujx0fp0c33hl7it97fsyee',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '347c19bjqolausgd3s6l22er2cgqzog5zzh2airnt4x3mv4gv8',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'najio406e7kfzybiuiv4',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'u36ci6bm53juwl6no3tt1v97bib1n4fsou65lt9ncsy5mml37z3l26h55sugm2kcihbqaxwvgwhm5lryfre79d3ysakpv8agqnykquo7rzxaome6zso4pktgx6u8pprk8k0pl2q4oc9whgc6cdm6sdkp489h788l',
                channelComponent: '1lki5u1r6elnpz3rx7buemikv2bfgiawkv5irjai26c9xudxqnnkzpwfz33b3n9jlc2m8xh46yy4x61tdt5qmxijfy3vek30qhwhe9ddj0tjaza2hxresv8rt93l7j6tdqoeguhqpgcm0bunje3nrjxr9fluj9mk',
                channelName: 'vsxanxqq2bvxnidntir4ofa941qv7aidlxjscdc74obxxinstkx08mjk7ey42omnc7izopnbbglb2npmgtgx8k12ryl436auv35riz622yoolh57nipw4lka0qmrg441itg53sk6sinlmypzpj2mtjak7y7d2eufx',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '7gu1nuz02vs7x00wukr3rcuqjueayuu3gd2f7ogalu83yuyfpsbjzcennekn6r1qolb5f03ychhd30f8no9hm7tclbpe0cnfaqaepq7sy4olv9hz4gyj7idsxnsea4f605xujehrtk8hy86rfmnjqujrcsh6844q',
                flowComponent: 'x6rt01c00b8onrwnljvtvrdvytelsqmzhkyrawm8hrdtnog16okmyy0ydb9noogy6ijt74wt2zay74ikokituntry4e0ij1jqcw8n0y934puf6uej4nj8ayhbm2lzt2w3p736ax22sovy4jlb6nwtp2870t5j2xm',
                flowInterfaceName: '72vbgszridjnc7b0603n4bbl3vlscvgo939xsvwzbrlbqd75bhwzb7o0p93upg2evfgwwreypannl5gb8y6xlj5jf9mwfkgwc6icd0qaz85l4woc2g23e4q54hjftnu76mioya40o48u7byqk4gymdjmwih2ic74',
                flowInterfaceNamespace: 'gc9cpzo86mu1o4l5drn7s16s84qium5b6809kalh4uxta0z3i1jowmcdyq653yng18kecdl97bmj35zxshebnbheism8kms65zpjtwwexpzkdryp7spdx7empwu00x13vkscqd04u5zlpg5k4f83q4k5hbv7s6gw',
                version: 'otujns8bbopbi0t56esi',
                parameterGroup: 'ybne7qw9s40xq4ke01bbvant9tz11wsr5ehw6hrs3l4m0rcv4o82zt4px715i39ubvqbc52nbk5svvyrvnh07htvwn81dn8pm6ci8i862b9asuarenjhsvoi3thop8xmq1i8tu66dh82hl4clxk6wkp4l4ao6r57ekf9xc7l1a2r3qobhgnljlm5crs5ntc2r4hki6fbyayjsnvtrmykm45ylfdi0j0y5fdrpdbljeir2jfvi6b9c39f2wzexzs',
                name: 'l6xl1knt4hcunyymjamq2vadtj0iz4my2vsc99i25k40pvvb5av9z42jh68ccc57y8i70rmb8t1eqgvesbsnht6ldjo6vgx9all6yib4hx6nxwszndnonu6ddg3t4fp11mkucq32nkytfrd6zcykiv5roa2kuagip7mgmnio4n6qg4nh0kzbnuncey0fkp1c7kluctgqv9m32b39xqak69xz66o3lw670wbfgzrtqjxu260wwd28iomga6tsiwifrp116ukzibzjxh0qpymsdlktwonwewd15f77wr9er1u7wk03sbvp3sccesepx7qk',
                parameterName: 'ltsnu7jsmhfopf79ihqjts33qvtug5e5vzy140qvkh4umiry59ktc55e8b7hhmg5j86d9aksuhr8enugwxc5mnjdb78gd2fdu8w3kebjyfo7kv0tu4j8jw4t6a2ixo0cg1dsi8d5kyw4y5pj8roh5qm21wmo1tpfu9hvfgzwf09qf23hzyujvx50exozbq4z96jrx5rjucoxnr57aple97hvx76qxv235oj7q9sr9m0pnf47cn4g6a9wht56eoicqtzdv9v7im0hx6b2wnlx19lflvvere03q324cfbqj4cxa5zawznaj06lbrtbjf1s',
                parameterValue: 'd4w4o6p0qogbve97ybkn81mje93oak07iv5h4o3l40rp6ydr7j0x0vhxtocnf583fu6z9848n8fu0v9kys1a4lwoq9h8dpneyb3andxd2nfr34b4oseq8jjxpf4vu1ltgs4yvxbb2n4425a9qio45m79uhfy8vm66m0ny8j95qy4fdoojtxxzyy343focmnkjpkugb90j282wl9p7gf1sqglm6z3qi5zqbnpmpet5nz3ei1a4ivpuezu9fzo6yzqzyg7fsgaklwqdveupslkvsutupsrnens1b330hwdrnyo6je3lekobb61sxz9dygto55xftqbdxmr45adg8b492lt50hlkn961nte5xwksxdvxf5g9mlgq7n0irzslwdbwu7wcpmw5q5vznd2difiimhzdc24tco4guskwsb91tvd1f6mjti97vhazqpjg9yhi2ihwmeka4eo1i8zyboljsfsgv75xvzlkdz0pt3kvfzmnb4l3yqf3c1hqq8h7e5sjnd79bx65n9i6pm7w86yie9w3bi35rlm1pbs46zylguu7rik4pv8irw8utrkssdz2eshazfeyowgukmldnqjro8to50iteks7tb34m26yx1p4x2yi55nevjr88tr0zbhfkfr0mrhjhdgosqaz4wivtdpf2ywdq3mimr8tyqvrtg0cvma2fu2a94lmnsp398a85fmvzhoty7hjq3577zujcbf7bod7mznpla0l38cuu5lne3xe30bg6imqkc6le1dxkwqkxy74gnrpt7uljse81960v744uqsymmn8qssgzyfbz5grt05qoy6qvnwvg2vff5y1duak7nrmvinxe3sxe5mttzgycubp1ki4hmichc7iq6jlwfyh1xx0n2c5afx1uxv1exmqs88oigp25q9zqagxlt9auubpn1k4lo8f0t7cam14puau4phz8ci2d8hojqruz7ilt18pjnyppiju6tnuvzhr1m9o5v8hcao9445rpuqh1mljdt8uugwat6m',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'h2if2cjxxtenbnebd9suc22281jo1e8qkjcyiaj1b47bhv8djc',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'wlvxju1znlpt3e6xe3ec',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'uos5etzip3dt0owssa0c9bc2bou5xfvv54afn46rc4flxdtp32is5adx212w7j6gsvepwx576o2oauao9vtjvipxvldym1m3gu26oajor1b4txxutch0c56qn6py33dgqnbt38f66jxgfpbsbbg2lxjs876wu4lm',
                channelComponent: 'vn1pj5o3qfoiqzpt46eab91m27cfzz1xeq0bx6qfosv2hdabjnhavgc8zgrakjeg7za9cljotk1jgja731jhwwmy1zmhoperw9mdvnhfl84gwmu7pbrz2z0r7lgqt5v9cccgg2nmy90zfrt90yekrjsy1kjuzp4g',
                channelName: '47pq1d5tb3g306raij0wdmzsw41btrov4ddeay8xltipnw4k7ooessn9llr6lwui2p1t9u2xyirq6oqelohdowymwls0np6mxteij2gcpg5efo8uospvmmzs1yg54xzqymec10hruop8r4j1c9y51tmarrh155yh',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'e3yj8cyh2cfm86yjt8qtuug7itv8mtbhq8uk4sod4xz5z91bhu22cq1bpxikbjpzsc3mkvn48wtyrgte1yf1kz8xb113iogq9z6dvbzsh1xbx1dybf6rnhaqck9hlnyltd2yxi43dzoeuxv6p9mn51eyzwop12ka0',
                flowComponent: 'e1zgp5waegkzianekanw0lj26ld0h9d40od6eqmuwd59jpq2793397vj9owdsr9oap2z7hl6rldn02cknmshgsz2qinfptae5x5naxxrz9359aauipxpm1r203n449o6lyug314u3ok3u21eaiiia3v237pibqg8',
                flowInterfaceName: '3gxes2smg0j9b3kgf93grnp08n31yfjzd0qjkwnv7fvt659x2cdys0ajil5dl8u2vgdv710jqtdbdyu1p2l4x38n0ewreovmux1zyzho2gt8uyut1b7hv11c2c9sz6b2e4nq85sjctlow07k2sxy7y7t6lfe7r40',
                flowInterfaceNamespace: 'ifuy5elo75q79yyrvii0zc5mpse58qv6voe8qkzzv5wfuy3mdg1vu6h87tqv7pzomln2jwxnzq2mwhkene7h0jdidulidj4is7yvexzgzriveyyia4daoj2zfn8vz9k6gi8r82ltd4t2b7e5h2xerzvpjiawj1mr',
                version: 't25rsmfjnek60tx9m3ep',
                parameterGroup: 'qk2dcohy90y0ghwk06bsa44egya2jcyg5p6ts0pbrvl06sxy6ldb0ctuv8l8n0v4ra8zes8n0pmt7ii57hppe0y308ki8t20u2l7ggh80fnm3rpn2s6obkztsenlnojsqwq07r7ksucrs4qydwiydzbks4kg0kxdw7u3p4r1pnsoucyqyrcguc6v05w2uqil80x6oxiwad49uicabbcux3of4yrxd89lgdgxgwojtowh0hop1lkqdzpzn9nv5eo',
                name: 'r041zemcoswa61c4fj4pkof36eo710y4l9hdw9w5zfxsl1xt2h73m4w5gehn2ajcn7f22en8fww99spp2n4n5ly9m93sac6wwkgtra79wu6da3lgjcd8od93aiemvqz6i60z54r8ganbwtgw23s3itozbl2q1pv9jc8pqle0mgpcuasflwbukb4kh7o13oofehx8m6upisv15o1fn5ff5wdmbj9z4iigoitgzvvmd8jpdafk81h9qe8xtskyblfajtf896huo8kcyr92qc4vtgmsdu92o99haozsgflfpw3to9bxl378o94avvdzsxir',
                parameterName: '836uu8dsym2rj2dntbkedson624sgz5ik93ny1hfh1pyrw4bwt0trz5owmg35an9mh696e0tnotsf0wi22bhrutiqxz20z0kuqmomry1wm832qes16h8wfrebi77ux8ykawpx1zu6owk4bfp13in8s418d1j56gx0rwnv0q2j12649nasue0v552dthw8mgshs35lf6mbmz1qb4ixbuvc93kt16hqmof5a46y1e1idxlbte0sucl5kzuni3a72ckeeyeoxzjrs6dgjzhwqr1tkto3yuv2yffzwaa6d5pgcylazfcsyirfxgl0e65io2g',
                parameterValue: 'duqsbwo51ksnjth5dc3bci3yrhhqrszqp4kf60ywq1f6xjzrer6uaom7dczzq4nf4j7wq6knvlgtbs627pnig82frh3k5mgw0htz4ho2ljhz20qiv5jdj5aik8txfzl10js83mmwbq5etk9rznu2yi9mb855g3zs6cd8vkwtoxbpr7svldwhd8k9icjec21mx9tno0cmrv2v1n6i9niouebud4erfy9b39yo8hezpkz5oapmc8nn4hu4x5m19g6n52d9k421wthvbj210qz3m49w1oh12vdhwnsvxm6lyq19ejpxg9vjtzn99c90hwtlglzyjfow51tpq25e9qv8j6gj6ozy94pd835o3u1cdxv9n6fkpofllqll4nla0181nf55segeu93ejnh4b69kutbqu53m7bbk6me7s813xc2lgvgt3z0naxc47grd7845b4y2837i7ysoq207wkmy2g24n5ff8l0r30jr8xm2u09nr59g2u85k7nh10tyjvv50akof4cdzgcu9nj7kcn67vimqn2on14g9992anuwicl62ijpur0a6ltk7wq0gkvqdw17yc46lfderqsvvh2b2t2rbj6oclrqggcvyz7b9t0oaakwh3a4lqwxv5p2hn953dhck5t85oygo9ei8qgyeglgdmas010w857ubj4iul9ig2qdfu60gc5k1taex6it325jzkm1kf404hhgk36557slawtoumfp19k8w9rvoqznwhg9kktmbrng980j9drj7fjcf572aqjyhgr70dx1klkati8dyfmgfdunqm6pfdf9dhkhkfvco53og5pgrjdoifq13lncheg5zwx8g413c6ur7cztfrj532ejrdlm9ygde371t9xwfhd8izszotf8f3eprpx5zy4i1bvu2879ab01ksc4dyeyr9m1522ed3960ejhwgwcjgfy3cavb9k0k8drdbiqjnuqalx6yxkvvg9xupullp2hp9ndhixaykql3d0wx2n2skaob4uji2pz',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '5e7ck4y3jdpr8rmfir2g9r56eobc2178odjlxd1x3tsf13nusi',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'quzf2oslgfki0buifcvs',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'j63u8wk0tdsth25raqwmfxjv7m5phfb8zd71huqb9n9d3iztuyzv68z3dsq9cfti8zi28dlwb15elu8qfbd0xynmgk3girwebx65vej90b3moc4uhgj85brq61rwss5qbmuzmcocr18363hresiwcrf3evkcicoy',
                channelComponent: 'gbnnnye9diotfs5fvuub9fi3kl8u4htnatx4p4l6aiptxz3ixfj0kssnbi8za63fmmiojkmr2yrkth7ng0j1rg9yd16tet0q8zpi3czjnob8qrc49qsbpz7dkbm7m2bnv5cjyszop0xg8gktowcp9cxmwcvidgeh',
                channelName: 'wioowbyxc0gmzgkhxr2qiike90b63mjbn9fe4xkbje6z75m5arho2l46zvc2e5xn3cvyqdpph9ajkkj89vfjhbipsuzvqt29ai1s1qeg7cc5xnyg8yb6z1h0oaj7z3oyw39b9gu87by4g97io93hecicckwnidmv',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'wn9rt9qxkno2pnkntg5btaon4wuyyhnkina88a13z9snu6n2odf5y43c2st0gr5g3whmlcj4or23jgtk9isuilsal8g63nticfp3gi23h2w1yl36bj47ob1tx809bfppaxaxncix6j1kzwmk0iozpoxogayo9gjm',
                flowComponent: 'zyblex3vuf5pahlz83sbg6w9ufbpqnyzyexf1ks4eurwx5m09bmh6c70cnm08qcpv6lh85dveswx04o5fj7951yg1rj2xm9csvcga1b3urusvni9vtuweo8y8oxchvy445i1mwq2jtq0hxy3vcra4erz8p1izc0ki',
                flowInterfaceName: 'l0q2oaplbu87hk1pc54y3jctqmmc80kh4jrr3q4grqtma714h47o4gosoboqrddrxyh68hc1k7t524gumnwer7xo98hy1loperzt670puwhse9zkcmoxvi5ymitdlxg0heb3d1i3lxtzrm2qf5n0tkjlzx39uq4t',
                flowInterfaceNamespace: 'e1ekszqt0b3cuh57wslzay25jdn9poq9rz2xs8uwn9tvcx5i3izav236k44ayixt0z2lz553dnkcxy30n7y5hfxln41i3w6yq75g7ygylfnn3kjxvb9349gwqhxzzhrrhl26ovglor7x6opqf0mzv92avu97tim8',
                version: 'aqidu00nbcvktsp0zv6o',
                parameterGroup: '9jkx0ozu87bcs1wnl5vic5h2cpjkbk9e83kivw9jvo1d12u9be8pn2vna7x5tf22socqa95jfr9zdk3w4354p2izjsb64lkz3nss9u5hnok0sjhggq0c7y6u17cfdou05js0wp15dcns7yyga8eqc9gxfkbzqmlnz97b7v3h0kc5wls0mqfrizyhom9wbifzxyf2fo57t66tf6q5z8rdg5q4uoxo0qg8hxx0702214qktg8gvsbw68ci7mks9vp',
                name: 's0wb3wr6gx9gib7ojzvn3127j0t8sgvxo0zwt1fs2c46wgwuatyc76ym9luvpscvjf2w1k92yml3bm60b4laodzmuc1pd098jmtp2cjr7663l5p4ugmhuwiczshxglf2u0mgv7bjqcwnqyfowawx6lwc2g6f9cbqrb18f8pcghnbiur5mwmnpzw364mxaknovm0y33zxw3jakhg55x9weaeu70d11t8n2b2jx3qdw54lvic6cqkz7syq9zch3hby38p3dp9sq8rt8pip9l7lmyq7j1hvslo1ytjv657vmmrlcftdhjr3ux5fyd2skvj6',
                parameterName: '3deo910hgzuep2ekzfm2rt4bbyjg9d354eokdvf3lpnxzgwfp9dohf6yhz0m5s5mlutvm1yangibbvo4z49awg7qmsa3dedtlisn03rflskkv9lsnzepg6cc0ydzc15y8h0djcfzpkxzr0sg6pvu3s9d2r87d8d4f5pww2k2r4unaecbe19x31ofl64ke1c40m4qfx61f5o6ybo05ohs0uavy8rg737md4it64nmmderjv0z2ky4cey0xbuo84anw87ois4mw63gwc99qhgysg9dy3gaf7wketlak7e07jeelumfq74t7gjolqa59tk3',
                parameterValue: 'qcjhjnw41mu6kdyj6tsvkv3t8pn4g3hqmor8xldjomt0fny2cpyk9fh3rungjypgnbjzf10947wmwb4r80baqn3h5yhr0faq7osvdeg1myse0pi1zhujbj9smiyoqkapl2rectg4uuiowk6pzoarsv9gno6eix6mgy77hjuq8h1is0lo36yjjxe9m7ohxqqbxpvm4ykm8kiun38w9qc19oriiykxv7i4iacacie5ig2l0v5ccmow4u0dtspl0uxamzi625xzr3aqv9jzvimj4kdulvpifqbspcryyqyxx7hjipilhxgzmlsyft529y2khky0fmbtd72zg3an6778nhmolz2ic5w9l0cxhotpu3lfk04yt483gtqu958j3m2j4lzi7iargwmsehsyfedd7drfwqzzflt3eaw8lkgqt6ri9sc9d7s4foc6267us84qpp6zukpnzlzcbxmof61lfplhytslyzpvb0mlkd7r9b8xp969ibptujqymvozsdkpdx92qe8n5wm9nv3ws1fakoon65rfgv2v96kp2udsjnn5gyko23qo4zu4drpz6ypprrzecjl8pwd47j7p5k906ev86motoe1sud86napwp6j5stmbhyhsnmgkgxmaxfvle9ib2l9y9hme6o7r9lf0glhs524hxk7iqjlpr5gxemuqztl0irjtdl1pqjelp4hp3f3gzj3n7uhy51a5iokp0q09uhxbxw3vm5y81ogbt5vfp5cyjc7591nmr2i5kw96ezf48wdqox5yvnrp622aqy9xugsbms5kx0h2bzp2c78zqaorv6q0hfm9uv482aoqi9x63tffgh2nf1rtdzwqgtg8qyz15636du533oar8cjghon05wy4i1ehm8ehnx2hhvrhdqqotlvyb89f8fxxh9swd915vqjtow28jreh2ajtg2ylrdam75a6hgcoq90bn0s6542vqam8ny6jq2h9g16n02rpakgova4ybwymkfaef60ox35grsdr9wiy9gwx',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'm1fryr34xog65meggfae8159godlq4kua1zdlavzctpzqopz9r',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'unoh9xolk0r257577225',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '6bf9htypy790s4syx9fcjpjx6ts9i75rp9vzvcwn7tnsxhugc4u25c568qijkaq4e9hzg3wkrc5qkdu75lbebqaqtzznbjnx6iponr01gqtdu189bpp7cwrhdh6j7vlt2yl2zbh37p4m8589xxcu7k1ar9hk5mgv',
                channelComponent: 'ck0m632g5xc5uxpewkcp3uqz10bwx0fpcfciy7inbxhzim6aaw6feu3tty4l5t7jfvy399o8cpwjraimcatzi8lxpgs4od85qier5bgo6loi7wrgcljpj80t3yglode386kkycyykvf3ugv3s1w0g8zzpc60mr8t',
                channelName: 'ur8xxyutq2vdcok5n06j9t95qoi187mag059f223pd0m3l8m1bcgdad20vc8cdocmthyhfbeongxqcmbrfgpky9l2whayjx213t77v37xn0jbfc86p9mnuwfiwqj2cwjhd5jn92lwrekxc2m3b4itj3wdh8f08fw',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'sn37tot8kgp5kq6e3al2qe9cpnvysbwgi5235qhqz8t53mf27jbgl5vr02dkuqyhqe8jn5lnu594f4w6mdu8lbehv62gkdvcav3wwppprck09g3m6rxeqza5xxeq5c996cgkcxmjkk3zd5stye83fifttum2naro',
                flowComponent: '5qx33anikm5sb0g238m88wc62tv03lzgirq5t8gqvrsjxsaxv18d17v8pq5zyp6i2jj4dbv8oh7k3i68a2dxp2qowlo502g5doa627fmrsvxecxi9k29y33riy27rp3oxq9chksn2a9kbj6jx1kujgx78esi6sd2',
                flowInterfaceName: 'wd37yrxx8dczcyfdr76i8ioihvcsxgw3he3mqv2a4o6sk6qtn43k8ko4l3qxh5mknwa58jkprk96r3s1quztcmd1aw4kff7q7pf4c28e8o8609gwxr0px5034b1x4lpguu8ql38wh482hg3q1fssaqncrpoojzltm',
                flowInterfaceNamespace: 'thx1frzcppqajm4pwv0exfqsc5gl1o8mmn0mf001ynj5suxi77zez35nhrcy8xx0vc7dn7l2o0526enf6vl971v3rmgdusmn7t02y3cu6aji4gs858vn3tbkikdmnm4tmkjwmdkg54krvdqi6zohvwdmbqzocy0r',
                version: 'xntn2h246r9jv7oeae8p',
                parameterGroup: 'bams9v7h9rncor6svmsicvd611z3mnp3o0gmh7ycd778xacdkdlneb17cqfb7vcrk0skjhz97715u9d3pspmspjeehl54umhiqwyigh5j57i8m35gag5dsiborp4o7hbrt96yc2qj0tpqfoheapv0f0d6gs31qvk971eyit8ue6tsgknd0iadfw8djo076qa5jjufj3nttm1uic81kd89leziutyfocmpjynmj4954hqgyhtahajxvtl90vni80',
                name: '9xw9e2rtrbi3vhte5zp3snc2tkggq85o0cc82136oy8aglvxycy4wzxirpsqpcimjyj9obhm0kz3634pza0ypsxnhsfy5499xnlxefgz3fjsv92q5mleqaparfsv79g5b9jngw9lk4i3kh93hcwyezttl21pqdjhtjm7whr3rsmoeyjh6iivkdglidz4oh0ki2brxsn75b44vl45d3v5u62xil8f5davbykxlh4ezvv90eq2cw2iqo6hoeptvhnz6qo5jl7x7ext0x1k3e1agkzg0y6n9c9l5edto10i1uqdt2l5k2ao3ml47syveazs',
                parameterName: '7gmba3in1ktm2ty8zs6590uzusvagr3mxan12fkxxm0z6u1sdk0azipl3zss7qeq3z01xihyzbreznqjiu814tq7yzjruym50od24bg94kro6jhq56nilmnwa9ddcj1aarrpd7chrx03yzrbbbvgzj0grbt781hkhcu7aqy7k25imqls7ox6sib4j5omray77wbkp8i509rwsi0h3igzdjhopritd87vuvgme5ctwsoejlr3pcye2kzr7x6ijugml5mw84cc7v13kdpy9dxhz0yczr6l1f0ch4aiqg4donellt2t6e2ob2x6y4dbq8ww',
                parameterValue: '5iyxn7tvdrid7vu0mb24fvrds053vho22mfh45nfqwr5ok1p57cn3g9zbdrzirhyq9jrr4y6wpltm6n5b75bv0sbta4a2sbv12ytdwenzq63pgfr2er8wn7gdlgjzvc3ipl8ylnifd52pfoc4ag3nkjpattmiedqa7eltfq8ti7clyqsh8h1x2tv3sg5w5bo42qxfh5kb1b0kqwzcxqpo3dqa0pwfoptlruau5yl3klh1pbtqn5eyvyu2rhu4dbuafi6oem0sw6igz881pd3k5u3jon44corzvk47t5uth34blfx3087czv15ikqv2yertmrncy8e7r11gbjutm34mogx883mahxdzybfz33xkcaxfje3lds0rergh4i9wtnqgim33qgcporl5ik1js33imw3of3hhn6v52vj0ik056yqswnroaw4b9k25jux445qeed6kq6rpoc9vsqxwfdah12gfghs34mabs1o7r6f5slmg4l5zl78laeslislwt05h32i4ak5h3fevrlcqvv0znqc77i9lvbh9oj8qlcs0ubdbohxnz9e4k36dkoqeonjki7nkecre5v6bfcslg8njzhvqjslczrbvpfquir8hdkifmthay1gf77kbhs2tg2sb92j6zpp11pljnudd05a4emdplcwpt1p66mx79lnaufmbozt10gyumkxgvhwucfn7nzizuyzwvc3e82g168ylir8buxiudw9ozwzmtvjx7i1oz9mdfmroj75gjf6yu25ua6sv2aui0sr7r7pwti0ie8hgcvqheg2mvgbmsrv2b7wclpsi53086pq0scxon9g9jnqregufucoz2uog6w7u6p6int48ar9ikz5nfu48dx9corpve3sb45ho1h0sh1gydvu4yuzmr5yh3blvkf6763qd1xg0q44z73zsc5sc88hkvj2bxl6y598n18egt73fky1ptk89nc07i0pkac05ww27ivkq72twm12fdwfoqlf25b2zxyyxvtspzf5o93',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '53bhtdhaft4ep2nrj8v6xtkt7ily06qwez8z2loo0wizajby6g',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'ole0edtubih89ewwendd',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '9lgc1zso489ucf2jxte3hs8rwg8d4dnslqlbc5h6e5883ozmmam4u15uhijic3v77lt4ngj02u8w07a2sdqitwyqp4qniaihrts8phv11dwypqs5nwntihu4e10f9rd3xszulkxrp1qv12vndah7msss7rr926w8',
                channelComponent: 'xfjl0l000wkqcllbgtf0abb9uvgv6k739idkmppenkl8b6e7yuog5eemfzo4ccj4ukqs1ada7adi9mm8bv7tocdq75j2ewlbeiggtlffac5y2um5v1xe6npkzl1pywe3sq9dt0trn08g9zv75soxorh4nmry4ilt',
                channelName: 'djd9m01bki1amrojl5i0497jt60tjp758xsdfd95lzgf0vf1vjo5zd5j1esq04b0omt7a2rhey3x2b81n6vdtmy9xp4auyqz6exl6ifq463kw237d2rdd8q1rheho79oqmpj86zb3c13luuu8cw16wvhw7nui175',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '7bmsv0wxr9hy0tqqa6u0fk2fus6rsr0ts9rh0asopv51rfdfvx9cpeah28l6vypnenwohm2vakrq42jb7xwm4376kd6jsq4jq3cs6htr0r6x46zpt9akqqsjiasshztszkywpqzjob6en5n2zk4hf7td6m7ffolt',
                flowComponent: 'lgxx2alrkzgumh4qyf77y7eon6j4u4botaj0zan95pp2i9y5dvaz3vy9z8lc89muewdqlxezdmfer9shc4s0xw9hyjql7lxo5xogyhrcg4xwdigrfl0iz1eskew9k2i1o06dn88n5parokqiw3ig0kfy81g00rmx',
                flowInterfaceName: '8wa442ultzbyg5kfhd2kt0urbl75lob8ljy7zx5tpclfq8jwjv315lcnarz2o0oe180by6l7m2qqjzonsjwhfjpphqmihbcd4dcj7j6p0xjfeiyuy1r4jqf87dxf4j73kiys0gzp5673tby4mss5trre5ulgtz2n',
                flowInterfaceNamespace: 'jylvcv718a4k2szyu2o99i7zzquuqsk0f04q41irdpz674mobc6cb1d2i46wm7hh80909tz76m5du2lql9k096zig6k7gearfnz205qihvt40c07oqoe77issu9gfn17jzlreo8vvvw3pumfriwtildheklha5qrh',
                version: 'g4yecir8rpc4lkza9v87',
                parameterGroup: 'i85zfkfd0jiv0ry2y23x0ei21rprgaz0jfwjbtmpw9puom2b66es97owyl4zc7baiocnec4tcd3z6pcdxza70r1fww0wpqimqgdn5w6einzu7cymtsl156qbszq2ilupc9vrldihrqtwaphdiptp4buniab0g1ud6pp189i5kwonmr543j9qpump1wd6tbys1o1vdpx7123ciwtrssnoa67tqpkqblhzkh9u5vgwdt6gnc1e8nop4nvvh43uruk',
                name: '1iob1e87sgic2e245cc420tpt2axtfyf2etobytib3awo4u85ce6lgfrvypsgjldh1ldkrnhv8ug3hmw87cwyahhotilbszgy6fa4r481rfd4bz79sz9hhfdwoh1a0wxqomqv2fotbvc5gt3y9mqy2cqn2kcds1rg7d1h9u519ygijiuxr2b806jznq6raa3ljjwm5d3yf2sockezkznkd6a36slq1eew1fguclxdy4z0ylxty8zg5hn08yvsamnxrdjuqcc5spbawbt0gkh8w89nsht3gt5chxjnmlryxh71u0i3taqgwuhs03qcuvi',
                parameterName: 'mhyzu7l5ygzyfb0alqg4ao5g0803ed4h0xswh3azsbjys5wiehmerod1ysfl1xix6wohhqvygc03zx4kn2it0507ivx4rhgsvm51a5kpa8zb3qh847ura6kucr256kwnzy882hqln7jpi927db4m8i41dlgsxjgdci0nfkf81ucr8n4w14rc8elhxme938r5lma7qx5eh2qe62i9uyfr7344mub0u71ulx2nrpdjf17ohf7dfokn3i8swo6khsxyesdrbn463gx5o7mu5wf2czjgbwo5t3qko98i2rjdfcp5q3dzzw4m6c6mexyu1a7b',
                parameterValue: 'l9aouuwn4sqfb5enf8rz0qa78mat8ffz5yc40ag9imppmwgfl9y02t78y7rbc7eyz4dsupmzo0ylwozbpm35ybfai78vah096iwvkag4862boywp0tbp2am2woi3djh3n1xoemd82knzh2vinfztralq48ydp95mund7yekejvo7g1pgcff9d0gikfmzli2r4eenzw758ecpcsbukbcy22vaa1l3nvmr7u9m24ggfsivs4umz9kvp9d3kizduvcy118f608lm776pffto2334aik6pjg975bbmhenitihxhxlr3x2gazxdqxha42hjssldsab6tixi45ve5hkd0zewxs6o36666m2wjwlyb4v7oop3bb82z8rdgn4id5dvznpj6qacdztrrrh0clrggd8gyks6st16cc0owvbiq0s6h8obndnd15abp4w8vujrbmboml71dk48wvrgtzdisfrd49fuwdkc1wbzl943cikepsok9xkhkn2ndt7sm39noy2zemp7hd5fvaho1hdjesu50w7aeou4rfnt8x2mkc6g5dwcv6io6jcq6dpt3nr4fftrvs4n3jzbe05e1k3ut106lc20y4jcujc65abdfqb1zbq7st498b8xi6dhiedswzzxgjnton1133r1dejyoie21tssv2p2dd2m5d9qevrelcftuczpmihhud1z6q7ds29k6nucnjeajo4ya6idxyi2geb1mn3odm9qnufxy10qi1fckp718ja6fvpfufumy0d6fsntc9xpvagod0celulj5ck042vytj6yncpzsbya8r1j4ywxnm1fl89nwvokovr2pchdi3add7yaxzdlp3h6g9dr4wds3exbpsycmhu9t76tvbenf6lcz4sfwykhjoh8pfh4kjh7l6n8qkmw5dmnl3fytq5vwtlt5134ajttndggr8vj80srnvedobpmknbsyspbl31klkscspknj4fc8e41tbjmxh7nm5lr4hweal1b7fzeuffi8mr40e4fkm',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: '9w4zatkkxz9z1u8kci7l2fbdo1skc2dunz3fqgjjn2d23c72xl',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'osn2z6sg5dli2j2knbqz',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'st8c9e1uphs4cjlxt3oy1knclakbil0ebh4951uk3zw2uaghu3zvmdrulv1t9j6u9ksy6kl6mfd9lzeey2ywqeurp5imxp8wber8z9lxe64pmjmusiizq4avx4mhuej58fm6quq1zb7hi6tkrxm8x0smk8qbbfk5',
                channelComponent: 'hpwtqyc7bsfp793pci7owrm1v18umn8f97r6izxzgztr286ak79r0gk34yvmpeuk46u4lgknf6eo7luoauv8pbv7y34lh80gi13rln8r34xc84ygvpto703xwj6m2vopcwiz6bctk5yqvfztjgyzy99nmp94qr6l',
                channelName: 'x4jw99re3d230i989guqlcmiivj43a71w91mbvdoill87vfzwa19gfz2w8a2v1uuoipet4oup916devi95ekqldsby4b2othzayl86tutwpjwwc2ua1gqjoo82bgjpafbusj0qj6trtovfnijuvgwr2osvvjceu6',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'lefikrvhf4zuhgnxf5d9h6x8y5nu01f30xnxx4ylqfe1geauwqlrr48zbbwylh68sh1vfkswme6feb3d9sdvowftbz1dnmfg9kjoxh4b4vvgbt0j42wasy33eq6vav5uz2huuienrt7oqhkzcvfexvg7rb3ebob2',
                flowComponent: 'dj2h5rvsso0ow6fz09py3urlg6xbuxs01i4kh8jlqiyrx0tv1zwaktskboe8cs1ma119ctrmko2j0kan4z7b7w848gffe7ytheg2j7gmsugkbdckeun7ldn3o7vn4kc2h7zuij6ouub79oekbzp5w9kry1pt5gub',
                flowInterfaceName: 'dpvz2cajw3a48rarb0ri0btjc5v7y3cvrbbcf4tfxvpblmfdvoyoxcnjuu56o90hbxky2jdv68ar5k0ysqeq9y7u7bfggojxswkcur0mc6cw58dakoedfb25gxp30ihbhy4xb4wpyggtbmy0nn9e47e0b3g8ijoa',
                flowInterfaceNamespace: 'ftdi59xhf2dfyshbq4okiyrva3y6k56jwakouixmta9odr7s1d6ildrwgu1rwrxl3izhuluw25bzgrf6k9vprejod7lp28n6mjujbq49zh1a49ox71jksj9pftkr3p3gdwkxv8wwbmxukcxcenmrkrmpgb5gjk5f',
                version: 'gg2zmn074o9v79jri71k9',
                parameterGroup: 'o1tzflbeqden2irh697l0c6v6g9w01li31zh5340rwzini35zdb7d2ml3gzz4kdqywcu0964w637vtspskxny42mbfch5cr6084q8utagi03746al6iihvsb56puuzv8zo79x1g2xip2hys6k9gapiatumjl7igia516orqh8semvs1sf2p42qevkz59yliz97nbucwwh35xso44fextxln0qmajz8b2cuo3wafpmbcx2v2x8yp5bivkfmnjg61',
                name: '3rtd6h5sygyra4a418pro334rawpbl3s5v1m2aje2sz07tjelu0lrftarjunxp938mrd58340me3ppysb231d7ujriule0495nudc4mieodd9btkzju3w0h6clkzck9k3oqv9j0o52yf1vhc6dhlk49ba6qxlxl8uvjy9de96uvz7y11uh2hvqg0pjs9h6nyvuqzn7mbgwy011e6a9cdeejmb0dqsffzlk9k69y2po7mdteic7ke3x866ntyvp7u527gvayx3eaxz72j5llb15awlwh67lyyk70fioy67zxqhmigf1lgsujjs79hkz4c',
                parameterName: 'opww0ek36lrcztoqgbhg01ic5tial8t40yz2j5ym30fd4umxh00yak07zoqlvzxhyx8g4kv923te522sbfjlaozeow6hzriapzb8qvul9aws2ip2g0oewz515y6liwo1omyk9h7vaodxfh0ffxg5qt4ljveemsr74vyq58wrhg2adstnjy1l4sfw2plir68b9ihytx3bp32585b7ys70027x8rb2n5ffcow87ehnndkj85azn5kmsxcgzdoxo1rpawvd253z304mzbwv25uhvglh7iy102j8l763hl4iizo5qi1mnozc4u92sc9afc3f',
                parameterValue: 'yhb2bq102fb4cxhnlwjf3hg6a2s0gxuyd4ukb1bx44uj9iuy84e4h2o3h4fncoqaq613phdrm22dwpkxts58ida1wyg3l3rz6wh4ekg9bf6ujqptb8eaenhhwyw6tm26teokkwqu82slx6ayejpwspwm3wkx2ilmb55uk3gv9orioiibjkd5y7rxd06lxi8gb3781iu2ns7zxjb1p54nwakyi6ozxsolp9ueuu2ravv3b11n5mr2vuaklddbxvolwp1250uhjgry4qhde44eqiygtxhvsij6pygzr2dg9v82cuq0f34eulg4ac2zrp3wk2ky74h5oxwensy9b2s81ulwlgbzn323rvcfhx43vsspc4fncydqkzd9ic96rmobinnd68ah160i6mdmjodkdqwj695f0gxf3ulp7czpqh6e56r9tignoqt4wv47h0j3tewhpfj6tva6md1fz3iidbvhc96lk5vctxs6nr2bki4fdos3mysmvtvmdajo47hcg5zrfjvilntru5set4yccicwivo2ydqerk5nkza2ai2uujfntcfcis31zeizp87ytlaxhcs2ohvp82u44scfec8r0vjtubkd7rz44zhr3iv9liue2s2b86gi2iz6ey180hm3gfhubgzvquoun0ic2p7ycs8vnyfn74pytzzj1yum20h400iuwi6952780fbnznuid3t91606g0lyczhu1v1c10kpt15nafupzd54hba19fe34e3rrgn4jpaozi8iu1e9eqbrvv5xs2wsveqqguaifzl0apnddhyoinzn33051vzrbppixvixevzlvyueiv9010del8aumm8dbb6sr7cq14z7vuc8u15o6klu4isv6h44ylbxdhar35hdy5enrap417tnfayn3qrd6oh2x2vrwmf6qfx7wce8xhrph109hh3wk7iuxeql59m5bw9ei9rw5tyvbjuy2pdcjw4tmor60msuyej1si764gjh8axslg6561coke0ae80paqv2',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'narjfbez6lxjtkypgvb56hx957sfkif6uai61gmnib1c4q3do3',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'i93zc5f4bgfph0dm7y4v',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'htj8cag83wksuh8tp1uckmvu72h1fecp51b37btxfkh00m9afmeb3c71thzvnbjbf6xwy0fmggq7yrgj6qgqw5q2lcq48hgmmvr998ohu51hu0jf5da7k49j84qhay9wehfs02xivv7b9fzuxseqhfajw9y6s6so',
                channelComponent: 's7bt6fbiopssu225w746rh5zyth7jxbqvopqdk78rtvr5qhm0q1u47sw8g272jwwb7sq6q150d4hutyfqlnu5jwv0q02jqaqjw5h9atkkz2p90zlzpo0b28701otfd9er1tg9x4n6rvj9gxp2mjpb7c8kecn4kr8',
                channelName: 'm8niwzsqg5qel54dy9acetwwzdlpueq7d0sg1o922lksff1r04yvcde7ldalg9pbxh0m4lnps66m7iqwqufin6hvtt98lp9abkmg5o5jlqmam1hmjgodnfjryirfrmplwo3wl6kwivpdkdindgk4fvtjtmjj7y4o',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'ft0v71gkiz5fb0owtjhwr65ebv902nfei1zytbnoasfavsnnlzjy73l0hgjdhhlaf773ewitxu9400dblgw8mj1wtdaulmqnayiouh3l9m3sow06qzreogzzseo3mwqqlu7h68xyrlvmjwashpsnd398apij6eay',
                flowComponent: '9knsu1guzv1mj7ua7vlfxsmhvcj5yxk11i0gzxteakcjzuufrb7p3i9hhcz9rp4z8pwicqrykg4aowg1scuov26ka162mp3nsre9qfokbvktrporevi9blrrkblmre2aqdqj1q3545s4beoimf5d0b9ojf55wfmp',
                flowInterfaceName: '2vddw23nt7c0vxfs0rahg6crwauqwx789k300rakz74yoiglqnpotgnhclgpiw621k94swr8yp90zdu8f0huz4den0rb9fx6lyc402j6gfjluahuypdl3f3gamjxen64m5rl0ljpvjq954qtfe5xwkklom7sjfex',
                flowInterfaceNamespace: 'a8ulst5jd9qurgkj3sqgskv0beh7oonprv5r0tyu47hxtyel7sp2lqzs9xyq0ahqqgrwxm9rtc3hx091toabq0on6bwqqf6vl836e18ry7kroc5kzd1urlj057aeasxhqplczdi9xcymy3ph49yk2hnp6xisci4r',
                version: 'byrwi7laoem5vegq4u5d',
                parameterGroup: 'ubqkv5dfa0ijo7kdmbi5pib1vnpjumvljvntchkdloke4lf13ja3da4ndmjyify66144a41ce3pucmcuf2pfsy6jt14t0qcu4x5655tzsgp9j97sqzmel08dr5u3zkgzinm6by757kwwkcbbluuslf4cyjyc9npcnrix9qxnr4w9c2ik9ul75m2tq51bgqer4pmjnkdcoqrnjdly9dbuq0vycm46s9magnuol90tulp0fd34ux6l8qh0857cx0xf',
                name: 'rgwwad8kc4n0dqseoac987hvxnygc7xu94tvv96tzfhgknyntrje0d42xxz63lkyvzg2m1kix4xbuh2phgpvnzzq5b7n84mfmtzlg7y9rb756qvzjqgu7z2kk0wcbsqgr10ybdzade0n90k64izv59qqj9fdbjqa7t8rww7g596cb4n075ttml1wokm77be4k1az860ccezoptpm631yxid0h51mg1fwoae9k00b0xf1f1chijzbroreiwikyirsgvexhh2k4oolc3doy1xw8pwhsmcjbgfan781tdjdtxsrol0wd6p10iwuywntadpt',
                parameterName: 'vhrhmn64s5j6gd4585pekozujoul8wa4z3povuxytwlslwsw8s38m7jkzfot9iauznkirb036crzk0bka68j4q5msrftbfhwd4pq93tdw7ttisg9fvapeydcnj987s0dj7ublk36g1rta6epwxdfvz4accmi9y3hz2n6r9cunyjhqisz2sg2b1s142ncqwwestd82x6ygpiz5zcm23ido2nnwh9kbsxecgcj7nwe9fomciylyl708egecfhctx8pe15m54163mocxef7g5eda0k2rs03yc86xo8ruxa5iwto3ypmrx84381riaoklpf7',
                parameterValue: 'v3ty6fml4d7p6xe2lgj4yk4ijjbdr470p7jjqj2hre72rvxn400cz60mmqbx4fvoelt0uf9rqu549gvde1gm45q546p4g4iu1mzjc9jp655jq19lfhzhrgz7npxmtwb9jqsw5uyvoiniqbizlz2lbb6pqbtr8za0jqugc1ucho1xeynit3xci91cnf2hjkuzsj8e2rzcizh9hihekchyppp85ppqao8bj0tgfibo1mgfll0qk6svra5l0x9cmmq9zzp4unh6vnft58yi0k5pkoqfo7xbwcakbdx9z2tzj90vgonhydl0yw2eh5asex5xke8uf4cia1dvruuomnwzy5lls47tshzwmbqj4ijn41c4vknyxd0oy020a720tyzyc95hqj5mzx212eyuzdzedkyu9wlslx831nt84nwnwq6qq3ay42fgvr1rlggsq3z8fm3n6owv1pfj9fm93ibojyx86crpkbk523h6qh54ajrgaawxis1llnnrtshhqcabulmyu6dw932mcxgk6ds7mooy4qvb3570pgzmn7qe0i6qpiu2gtlqtioijrenssbshr1adaqdf947ahc4j4h478lwwkejwp4tacs203fmbg0yul6drl0uaoiii93x6i3pho2dyt6i2y2ler8fferhdf0edfzm838u9pqmiwox118mcze3zvtvud45ixm9qtw9zstrr42b7b00i4vgqdn2v7k3qdevvnn7wsigoboduxorwra3m0xvi6x10ouhpsttwojnl8osxovkenp5v30550638bkdb3gniohxh39kdgfb9vqxfwdv2gma9gzri8ufo7vv9p8v7gksa50etq3dnzlipf08q4ur4sb1goae3emfcq0edcmrvcku5r31j42wnxv6f6utr7jxps0ymatqt76cbbvng3yvyhe0p95xfvq21zgx68mc6k7cbf6fstlpckpost91079qwhwccbwdtaawviowb03zkvfn7gc2s7642udo67ssmj5ko49kh5pt',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'cnkpl1sj7fhyfvzgau4p8j4a426x0htoe59j7z3a6e11owapxz',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '5nh96rzt4hjrofw6n8e5',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'px6kihgf29ejuc1u64efa8xgdyyxqqmzz9wct0x4gtqwxlax4foisqjj167msqabi5litsufbb7i652olpnnju6xh1g3b6h32lulvrthybtums5or12fq8i620h5b0pzaj9e2zj2no8hda6y4o94l3fyvmvn54pp',
                channelComponent: '7uim03w86itmcigcxl92h944expzh5jnrv0c2u54gg0kbfe7w1ewwmfbz7uf74yllozsfbbhs47tciruuz2g5k7dfi4jdz4wrte4xgt7nphv9n06xr5j1bt9zlux6e0m8flmkcrvyyb4d7ryl6fnomo9e6yhtw9w',
                channelName: 'mq50y7pjpskwu32ojsdc835thnsu2rxenj7s353mmq309f869k3tp22oc27zfpg1tirh91kw8dmbpkxmvruvdzbwcfs2yb8u1tfz0nu6zmqkjipsecv74nyufpj7b5m44xrxtw6e5ngpp5nxsvfoa0ttbidj2nrt',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '13cnzyjjzuh9s37suiv6q9gprtrv6sorjg75r2o2bdxehl7ikz1i6tb97dx3sx5500g6hnpnymh38n0wpcq7u9wvf9c1ulz76ylb6ap7ch7nvc8qp4okuvkpic5srpmgr63drhw17px7wxao5rvbmjfx8nawhg9l',
                flowComponent: 'vp6f52i8phuz2mzkfku6phwn52dofl06k79c8a79bncayfwkz2euw4q488bl7aczxoiwxokhr5la52jed0shsfykcf9ou2mqt7k4n4m5l1xmu1lijygbmlp296hea8pkgutmpsmhpy7bcgpfawpvkqx9acbbkbc7',
                flowInterfaceName: '0fhtaf39gmw8wmtaavf76ux89k7rqxgygoni56nawwui56qbxm4bhgcokgshidqfev3q8j8zs05ixavcldx2ka1s5d9b0lvixgrebecstx307afqyt0kxtkllw15mu5hhgdjg4kxbw5fjtm5jr41mxa62p61buws',
                flowInterfaceNamespace: '5lqzmxjyzh1luj3338q88c7bdwb7lrv6rtupymia19huth9hi07a18f4hi4oiee9ork1xltx74dmtwwxo6df7b3m4uuyrb8xtyikf9f8f8do4b8vu82ire23glvtumuui5kell626oys0p1fjcl90khnt4qu1hm4',
                version: 'o12iqk9mm8sgsmcvgpfw',
                parameterGroup: 'fkra4ltqbtql6wyd8bu34qdx4y4vmtru3hrxg2co4tcz8zdjab5ytzatntkha8mzdnzcmn3gbkigdxn5wmeyy3a7pacbnsr07fkluoc621bojcvwvz9tkqpl37776iwr52xe6dxlwtkllidlng2qc2wibrgqpnh5m9fwix5r84rz53x7xk3thbf0w49rrsngtnqzltqj6dwanjr6che1lfdyxxybrpceulanlb56dgsanafpqdne3n6uzjckg47',
                name: '8vmfdeu593j49h0y4xirot0a9kbpxo8ybopnvocqxt5qfh78fpj8lmdw2xvonvd8ajoe3tcjps6h4tf2cdlgqruq5a9i3qtk5xsr3yje7ta7gq7tulg4t1pn29tgpa2w5rowgxml6uukywv3xfx3106q35f643aaxikrrboy99vwarnk36wg6bbv5r26dnqkw8ip5101qd0waxpxk2ojytp2fewco49e4flc6qkvbtz1oaxu68p93vubyzd6hb34c6valu9yiqkhw6jcrda78819mz2k0jju3wa58diufty7c9q7275kbabtfxsww1x8l',
                parameterName: 'ibg6iyyz7opsvkwplprj5wdn66f4lyvrxo3m3wsfsn03veyaqyqzu13l0rceluo2p7o99vadlg4ivnvcavege16tkjrsbtjdhz9cl88vubr8q35vaeo6f5rt76vawodtawejcs084vbcgfxi88wwzpg81k8tocl1z5u27ahrnihdna4hvo3aau8kfqc4nj51szsrwte4kl6id4he5stjeilgqmjcueiyyiv32seitnqn1huqgkcg31wc6o92vc982621bijxmddhpesg50c0of0wanbh0uaxi2oar1wldtw5ssa71jbtfcie1bp2wyox',
                parameterValue: '31l7nfzyp8wdnfw5rpsd77tagxoivgz7dhv0yfhfwqi2qk9nisoowxjz2s015ihpgfv6yslwy0i87x10ucgmb65qqk582flevezc55bder64t356va70cwqu8d0iq1am2k1w7y565y2y2ff90ql20jexjicarr7thu5e8rdvf0ab55r4ikpfmnh8hvj61dnok5xlr8zfvudu9ay24o40sdf6d9l01ftoh91q4qn4jpurozmsawhjdwy0r0c9r0t1yww9tkl9v29asfzr8g2qhmkqy07xogj7wtp81bzvfwjhq100vkfg88fpa4ecvnq1jchnrd9hlfejw54ogz20g63vd0n7pk93bukn9ylmmv7cnlbcmmi2inqwpdynkkpua96iw2ge1tdjqbq7q9njimxq8wdmvqbp2lkmb8t1o6z7ofl5ovb45fnowi2m0ux5vzbq2dsqq6sz07qo7nyao96s0uybv7d451d8qg1jsmv9030j1966z9rrivbi52zysclsnfvqj8sg8yihjgsu8o9b4xxpxvsdlyn51j8iku9oqwz9ctxi593crz429mvfmjlf421faqg45iq6hbvkdr6yewsabx5txwgbhwbrdip2pebvn3njn9vu8gi0g5ofnags59lieuzpr8x4e9v567g35nxqyawq2jsmh9jiy2trylnl6l4k6mr7u6g4wnfs1mw6rnercrx5mn6205jamc0etqlmj9uny4k0k4cwgkx121ygseokfc7upvs70czfghwye5p65pbi28id6khmlm4pyzy886dma9gk9sbuqo71hab2ppxiivmaia7tp0km2yo7a54dsv8sax6tun6j49rppveq2d22cz76p5mgpubeecjg46e43o32moh0n94txyycrdhogy73gnp7kp34lsc41kdqq9cs5gm560mwhzxf821mx984j5kiof9dgqyshuk3h4qsueisplxkf2yik6yvu3y8wqju82r72ugqvwixht588khpmva4utfy9rm2',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'tli2gadan5e1au3fn9y4h7kmg0eh5hbjk1a856jpnakte56g0q',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'jxf31a718hg6d70j5jrx',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'njme0f0am6n713m6g9oooakdklbz06za5ame2xc0ryd9t2f76ddi4sp3zi8q41t2e5ibe5v6o0glz0sd7b0jb6ak59orbrub7hpq58bs11v2vd19t4dnfbdw2gasuzb2xwozfevfoax9q2u4m8piclhjj9j2fmjq',
                channelComponent: 'm45rqflnmpz4o1x8639v3w5xz919hj86rtktbgj8cgicm4y7dhalb7wltu0539qox6kii4vq6grwyx1x023rn194b2wes4eu9fzvgth0q57dhonwwnydiayl90muv7wmqpjmk74izmgt3jhuxba2k4v38ukdbzhj',
                channelName: 'aes1aacmzx3eq4ox2fwfg0h0jlcgngy3fwtsu8bg6bs6adqexfjpndgrsw4vjhebnlxe2rzhh2wu7nxd29bsir4qogu6g04vnbicc4ms8q70xjee3shmk1rpvnizgn32u2ae3pup81tgd1pdfdl4otctn4l0rjys',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'ji03ftlwry4ggqwlthlfk7flak0wu2obubrx42rj6jexbjt7b4dgfu98l3u4rh5n2ik9g8uhlnq074dxr785tme8s2jgnhngpsfvffskbu2z1rqdcmjb8drn69u4vuz4ffjzfv0vmldbbxri5jhwdy2d2mkk9p4s',
                flowComponent: '1fbgyn484r7el85ibr4ywq4nhuunhwuemkr4sfkfmdkibklfhndiyb0zpeiequeilifgd8ug28ootn7i5foqhhes2hf4fpcug2iyque8px89k99bni8es051arizwbybwhvgiqx55c33xd3l0hbi6l88j8es4107',
                flowInterfaceName: 'wgag70uq4citk8zm8915l66ulmcigpenx27a5eqa6wmgeskp8ojmdgh1m51xofq1w3o6foou2t85yzyxh88rftzv605ea5a7sls9eqczz7z6oa5qezovpzoch9emiulakrnj8fifl0qfu5phisuwdou7glr53si6',
                flowInterfaceNamespace: 'pwe8y3v4wjtojzhh8ir6ut061xs1fyelo4ixpmxawn21v8wrk4p91mpb49nyk148q3q752haw1sbkceo8sp017iiunnqdqsx6owtxfku906eekgsj9v04rpbei27p0icjg1qx0figexx1bhhy7rimqzq8do3abxf',
                version: 'rwx7efmytz3aujumznom',
                parameterGroup: '55f6itzfympzdweo33zikl6iy32fa9aqmyrafxsu4493ohr2ncgkzvql9xpolzdsbt1s7ja6gw0g1uz49abgl7tc9jjmnamj4fxd3uyd8u3lr32enga4vexbe7pxzy0aqcpbu78oqpiexdtl4oafepot4w81y05bkw22bsjljbw14b8onidarjjymeestg2l1f1gh96i7f5c7qa4vmz8ctz7zyyeqpk0hctmz53ot0y8k5hwnpt4b9k54kbfcf4',
                name: '6lpd7mp0rzuuxgdj07z05b365h81whbhjoj1z7ingjk78dtsaqktuyjczoebx1hsl9escktsgkv0r3zg78zqs02j5aiadd0ntqw5ty8b5n2080vbwjbwiiglmocwbv0ib0acoh2pw7bhmzguysaxs79gpw6gjtvt84g4gdfpcfmla1i1erknles2depfrhdiktramqjffyuoyhz2o705n6l4v3ijiqldzbug71w5ng1x27zjzzbvqdwop1dajrrb4k7ae00ro1huqw1vkzpaaov11u6wt8v2rfixkkpnezju71672d66ccbprxtdfrtg',
                parameterName: '4c11nwr56dw0spc6h7nw7rwvwlnc00tprk6kaxcrksj9esvqn60lakt9e1iug2ip5a6q8qplot6h1bt36ouf9bu5gw8htui9qzyfzswh2j9j1dgou7lvo61qmael6yoi8nvmuk3zyq5irlhpmmjeb6815sefh6umwluwoxn9p5h0knce8w0nfocda5xj1119x5xtwh1z2vsarddj15zcc3f9oqt3j9hl70ebbe0j0kgyc096d0r2cm6aspdxv1lgbd3hgjott37y4bdkr3ghsoh3y9yixqla1gl31j6rwhrpylx9b7zmshwp1u3kiuiuk',
                parameterValue: 'mccnnfo5spp8xq53kkp5huxpf3xmqu0ukru8h2k0oq80w5j5k4lqnkihdiq558cb631plvlloklwgwnbco3i9v2hoi0bhnf5zykqdsuf9p7pn43cpanuza3f5e228rb8xezbpa1n5cl3yyw1j08n2j238mjbbgrgi07gkgtvclklt4d53r8zf1cylvmxybspepxypyjl1o5ad8qe02m9i8ofd9plkhuw1febomoq1lqy3r73allijff3pkjnlru8ahmyllw5zl09kt523qrri5r2e9jaeefcj48th4dedsmdcncp5cn5khtr95h38mzzo12lwa7cyxhpsszvyr1pilq7dl20a25iha2wdfsjk4839shly6hgix5mbn0lvtg6mgyiq62s2p74v0p6su944z0wi25zbxqs3z57v35r6uamny7rqde8i2ha547kh6svvzkkxqd91j397185h3bedyxnfnla4yvolkuq2hopa7621xv7muhtxdn0mwn29cdzj1v2iqdqo2b9nfj6u477jpybgz9kn566h24i3mtg0skawfk8v0yxxlphd53n15ibmkxxpgbz1lznuqd1h0iby6vx9qs3gjzltq4tbv4r23ceahn46h8pyhlw277ko02n4ldzyy7nnq38hkxvwfcp1qjs3sv4f1ecdbirzqzf36lyprtsobuq7504kbwtsrjk69i0mf6engid7p2sv0mahry1fyrp023vi4pqwk66wd2m7dj8q8d7iazgnjme1hqkrfexjite0bai3ys82wllpy3lgs01n2j7cgca5d7gmqan7n1c73hacvup8p4q382ta0459ntcddk0imz10krqfs4zkkqw0txsz3xxor2cf8rj19scuj6izm2imdzeinr57y9t0p95ugh7vpry18khb1b5ajyyfmwi93348d456eb68zfxinqp8b39ev2jos7o9ud7chsrjkmy4wfx5caw72f9sx7l5gbaawg6aofxrz67frg0wwruh7llw6kati9f',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'ky1qsk7sozacfsiokbbvb33ktxbggzn56h6fii0rzezg3j9nnm',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: 'qf02dzcd2mp72cha5va8',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: '35xqquup8l4ijc0zsnstimxpy56sbz9qxak9dzyhidjx4lvc8yhs220evoxprb24utak1027uuswsbg0ddwqq19k59sqywgvvo3ds0e0iu1s4inz09qp25i6i8khpwv16nbapfaqbcf0jcmvwnmloopo9lt87kic',
                channelComponent: 'z1yh8a3ga17kb6miii7q17rw52pvvc120d8zfbbnbw7di89neeocxug3ybt6w3xqiqdx4glc25rvdy9wuk5iiztl99btm753i5fxzs1e8d2g06svjzm2b8jhaylohb82tkmvrnz4kr4pf6jpsp4m9pkif1b9b0ju',
                channelName: 'tk5aoynhp2w0zx3fobmm8gj8cqgwuljl17w7j7ehuuj2gwd4oahnub1qu6dz0zgcgtb5q6e80eq7hjdznfwucskkrisucihviyzb4zb554cz103v2my4nqrcz0hdh0tw8fqy9y72rn3mw8hntdflun0n1pxochs7',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: '1oeqndyt5b0db2f9qmi9d4u9yiqtltbxik9fptdkze6py98zv53eb6erpogz7bzxiu4eqtw0losiqxrl9388ltqwu5dfwnsah70u31r1wntki62f2w0kct2ac5haz8wcu0wd2zxncaz1rlyc334wjzlddmyo2wqg',
                flowComponent: 'njq5zfhe944l239ly1kfl0gvioj6c2ub2fcg8o4jjaaui5l5xn97i58c7etcl9zfzdyabax93gc69vmg0hai3dpo7izaq92ns1ntuc8ed6xwvfqbjd7ji2gifkkqknceuzi8ls0gz48v7iqr35ojpr2izsn0qzwc',
                flowInterfaceName: 'uhthwgkc2hfnvtpsm3vxr3lu89mu63ns32hspbby1g4ey8weul9qe5ihlt0i00e09sfsen4uepnezzdkyobv7yxesz8lz6a83nn5pzdomlkyunf1kxzb8rip3qegshomw35btdqbzukvrr0yiqpsrn68ccjyhex1',
                flowInterfaceNamespace: 'fe9tr2yyl1tizgy6vy4dw9d784rn83dbnsijgkugtqsvbhod5srqtknnitrwy0tncta9l0fo375apkixlguso8jqjg0p3610m0t4hjfq5u9equx8hh56lpz6phrk5moge49k7mjzyn1qi7ygpaaau2ixxvgy5hnt',
                version: '9sbqwubhmkm11irmxm12',
                parameterGroup: 'tz8u02dmg2rzh79t0nnyps5yz7wsch3bs2n4y5cub6tr6vv8u36n0vfhiv38sh7rjoqsxgrfodf7u1qwmzijoa8jucciw3lw49rn6sp3y2500t8nu5bg6doufvsgw882q3pg9lmmqnxuud52c1vkwua85q7u90lpxbji95p9gnqdamcf4icb6jrc3wgxmuifnccsjmfeyi3k0we2xw00o79gu1rbxmz6ewdjutsjvu5ggn7x0tv1q3opo2lgsgh',
                name: '2rvadxvvpsuauuqg4feykt07slxggrqufm1n4a1ssl5mhj4p8tqthf5ps4ij9t1rx2380b5s8bj1j1qgwmewk2s3l3jk5go8bm97zt4aib27tu4ugy2v04v54d9uop7ejovq3450zidakwvvs5v8eqkodbnaz30b2sydx5ss3oanjdkktcs6tx6jeeews6k92j76emmqvwx7im0wetsdpfhxwolwtrmhi07jeedkiynesrrid4u4ackz3u6esagt4b3f4auufqqchuvatbkqvnckliljowrd929k4kagcn875ufuze2mmsw1dff1zot2',
                parameterName: 'g1yw6ng1zb7l0v7vofobi8csg13hovs33748l00lebxkusv8qfsjt7izzthsjhcr77xt2g38ckdk14mgs7dpxx6ek1wkf1idserxo8fs3s5ldxwv8qno72qd2baoue1es6xypp7b38xy46f8b5tgytaxwmdr2rumv4sxdryzlnc83etyg9r7o6ovcfb3kuoayoutiap2g8xevmfm9yn32b45q4g8b7pslooyiwfniq6gsm3elpsa9wmvownvva5kebymrm1bxg9sdpkpjzpfv6mcsk6p377rxwrpiqciy735l9xpcv99sw795lr7j7on',
                parameterValue: 'hrl4475xiydhobd3zwfih88dhw60up0xwxzpjshro5wugo126i750dd6bojxenqoef5kan7sraqidedj29moz8tndwl2wy2az0ttqtzapcoqv49dl5skz4izvklgk2jvg1mogtud6kuqx362vagxh6ao1xd03ari6q7y0v7586zr9wasvfl9tdzqjvx4k4hokm5an4v9f2lcso8ktaq8r8t41m728rnpr44fwp96jelc84ljdxt6wma1g3ah97p2bwigub07spemagjmg3te8ufnzm7oxlwr4yl1n34pakndoj1yuvfh00zypozlrvb861h5pw0xd3wp9s9ah4em32ev9ccxnier2dxtprsyjnoagi6ds2jfvjjkecs95f7h5r6cuwjhydqbgnemz243jbs4kl2h5juqgzzo1o50efzm2wep80y5tqy496xr59m26465qmqne7l98tm43vnwfbi0b3i2qsgbgcivytwebljz8is2bll7vz0fp4u012dwdznggqos0vbtgbip23wp6wor12pj5rf5l4uf14ro7u7qzmi0bktogmdeftgmnte3ianglmcwbxjokvpifow4z2dlyjkn4p9avlt996iujmanq3rcqng8rel8m7xvc1czy6cai3e1o4ff20mvdmsy5e5ykrwvxbm2g5q3nbk1g1zwvx1zr9t8qchwsi5n7c2qhc4gkx96szyan5lv4dq1qe79w239z699x5z6o38k4nmk6ee42sxtsnso02m36wowg9nvyrnbho51cbgyrwe5u1ttl5wxg6ge7elm99thytbk5vwdm15al64l8tg0elj2vs5patmiur0a2idteks0zkxnicnvs7tx4nc2myw9rv6n2h699vhedtjkawvlz5tr9mgbe5k07h7k2g3m8x2hwzw339yvuum8ldi1qmlx5v52sc6c9f5bpj587qm7bl5vnmlr3ni52p2xiva6cnclowne300aqefoh59o8znqb8xtbzdub0apktah0h8o5hi09',
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
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'y417xjdacol291vl77mj6bn19tmmjtnq8apf21jcihnrxtowud',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '1wueyzd6iq3931mnnmxf',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'd6wqlnv6z4xfg6f07zwpj0nascdfhwn9nfoou4nqfl0te1fmfkasopewgcmekhrgt3ggd0kis1s8m79prlesunn9cxz6xoblmlelh8xg0ler3bs9n5ulv5r9650bj1bbxuhuojdrgt7anx1yoxn6ccefo7c770hv',
                channelComponent: 'h1ewnbbxqjtehl063w2znub57stvca1zlxzctzr5qyfpyonu709ho4do3ea734rclu84gz80irb6282ycpoajbav43ldp3haenfwoespvh0xu9v92enlqcav9x838vjhpb1dsxcy4fk11tl10osvo8ydqhgqgdub',
                channelName: 'v2fveci6cuinb7gigaf6cyn567up3jis89kd5lgjscs8g85cabuviixtz0xiz0fot1mop5l9eiseis6tpq2j95whtz5z9ohx47vcuvgimazm8td9l7rqmng682r0r5fp6dsvn38znkz0pj7cnkys9ww62l7t6dw4',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'zagex6b2peouonaw3l1lz8pyvr84pn01vl3jjt30c7xvndzdupl7if22reqfoi5a8r6wmqifq845jgiioucartbvcf58ykc68xx6l55cw4p6ih9mnjwl1ruijp7x1tug44ksqhc4nmlxo54nvbzlr9pct9ph1vlu',
                flowComponent: 'xznef15e5oyxx59ahedb41v4o00evidahlnramkns6879fogm9xc8vdad5cw0das90b2r5rke2jm6ouh5d9lrbkl64t9aknk1nigiqgufmpvni4px44ozoi9dax6immc2frs7utktwqi0umn5fooyhiuek3cq6lj',
                flowInterfaceName: '9m3t40ue1o34ca936qul5yke6han6ig066sr8mv3n5cuvihsttxshg4rxxxn6i4c3olnuwcoabkiv286aghhvu8u3ftnfxekciazu265gi1jcmpjd3kp8sicospj32clqdjsl016ahdqlefe37o81ju7l5904y8u',
                flowInterfaceNamespace: '1lxionzmlee0384stiayol3sswuhwb8gnfuzxxvbujcrepw6fqpa2g6atj62z3tk8pdpux040k8v61c1g60s3mro8qikna79xw1gxn5lh9yscodeup6xequb0ll2wshsfp9f79byrrs7lia3n4bc84xd4zrbv7eh',
                version: '1zyctvyt9ajsjdzu37aw',
                parameterGroup: 'xq3aj4g639gugrdgllzbx6izeqfvz8x2d46u1pfjsmzw6qmfyxiyal8n5pysbx3hzl6oqsdps9t655glpuefbka2hh80z6bej8d3a60bg8mzik308mtb0injpysh6y16zyryrlbl036q1ykrt2zn96xvi6mmkvyr27w5anv4j4joeekkb3sn8g3l6wj3g8d75v4dumamu9ypfvw0uaqwf8e3uhsstkredyhuwk3dh4hi1ob3gklfjsryf2b6rq0',
                name: 'su8gxr2zob9fv8ywxxdy326jtg4f3bpgshkruot4odpemm10xvmq79a2hd4f2xhz5bz75jnun6ltg6tgqueon9h2ex7fu44s5suqqeykyk1g5k7xtfelppjcwobvy2nywrdlajgecfg2xeovt8o9o6hx6b4hkzxsptj049jdo0tlj7egispa9wos3rlf930rm4g6xxxd61ktq1x91dmz99x83epms68s6b7w22cdrkzfgfil48o6myik9jofvgn7bthkie4lhdxyjsuyfbc5o10o5jr3sijbg7ix8jex2fj6ilkg46yezcwo89zlor5i',
                parameterName: '1nh8n8du560pmi4j4wvycrhnv51vxm8dj88utitgk8rp8ofjirhv8v79z517n05gu49x2804g41wpmqklzg7hopaoysdc2hwa899jz74cda0r4s0e4g9bu7l10zp0e9yx5yna8s5v9m7iae6fjsjz5uae51ua59ogy6mkb6fynz33rrx483jfeo883upppmji4nh7c9uewllmzmwnrr069iw7jtxnqqdu4f7kaeawwy9zeb8z5k1axuqu3c7vni5qzpmf3uxew8a42o8gatnmy7b6iurvmvnkvq2dkosgm8ebp2kki5a5rz34v20smex',
                parameterValue: 'kedyl44eiztmhv1wek44zuz338brr3qqcb01ekzwgzei3y90dtqak66j8wldpw7jgofmxpi7vpboxsysdy2bv6q9b0gvwcrnt5sov63qlacbq5j9b18tqv9mkuko88rit0f8rp62fc5bmddiybe1nchr2ns7hos0dx5lwn2pimfykg2ko3eulydmp1nyobwvwm852xd7rw3oz3tuyo4obmqzxiw5bk2c20nk6xzhb1152f0nc85zl9w42efrwjnugm6k2rgelzbu2h1bujgrtxn2nz9l7td02zb4ypujwoz89zci8vpbfb0sjrzyxvo115tgm5s9fs4bh7gyrk6o9ep2jke2mug2nanmjca4kzchozhgdutyiri5np93wvs9rjqy4c6g5p5pdt4p7iqgp2qdgo9j7ilwbxhohw7ct1hqn5kchwy5kz359ylt5tpfnz08uzs1q20wmxqwfqt80x58t3xmznqlfag18u69sqm0p318uuaedhzn4kfqxqp5lyikppvnafpn5x5vtxt2v58eh079sv3pvchrqeaqdf9nd7ijf5wzzyw9lj7fi71u5jtbie5tj7r06qk8s8t3vnjtjo2pfif6796s2mqxhsjb9s75nsxnpegqj23kavkvrcs430if8dxisbec1fk81zf0b1myt1wqnr362n9cpa83dajpfbkd9lq6pt3xmts37yxhjozzo77pr266fxdhfy49ikfekuoza13r4dsjzsz7fxnrzxfpwmkt6unud3ntnszmvus0pwqxotisigit7oalrf9xdb2dkwfcvsy8gdpik6oxv0hsq0rb8fh4f3qwyqlmj1smfqim1bu6pvqw7liuitpxxetpi88jrxsmzgqp3nuzog5fvvwn8k2mk5llp4gvja3olfz6tq41z9sr0byxo0i8t7rttk8kbb3jh70dg5niu0kts04r411nzth02f59so6wvr7ri11s1jee3slygzese0ifpgcqtn4tghkj2g9qzbd0wb6t6g2me5w4',
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
                        value   : 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92'));
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
            .get('/bplus-it-sappi/module/d2767e8b-a3de-4774-8788-ccc0a2a9ad92')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92'));
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
                
                id: '948b6492-d312-44fb-8c8d-a899b4d637f6',
                tenantId: 'a506c2e7-33f7-4539-9b2e-43465ae863c8',
                tenantCode: 'l38cqbphvwyp0vj38o0khaq1dc48xg0e7mjl1pwsfcl02yjoea',
                systemId: 'b6e98fe9-d598-4444-8717-38acb14a4ead',
                systemName: 'ztc12wzc4f1ocyr9anf1',
                channelId: '71263b8b-fa24-4e77-bf1f-f24e8087462d',
                channelParty: 'bsstpd1o86tthuuy1008rg2obimvuv2hi222v37s485ttps91kb3l0ll6xjz007ap36l6nodzbrh17tg4scgn7e1uo4ohv4guk9wtesjn5m2oum5jy10c51rp51x2l29p6pgx8n8t7n7jhoqjt3v2mf35tivj74m',
                channelComponent: 'jtd4bzureil6gqmmrnauwfyybaxay4l6qwl57n4y5q97wtafh40pdej5nfdvcv15es0bc59uyqthniikdg65jdp5fdqg9wrr89yvpfw0dcnytecghwi924b1kbrdi1y4gq5wqyh6fiohy97idafwq8es2wdfq6nd',
                channelName: 'xl7t02dkkr8bxbksyyxlq9jt7yu7mdswbxhuyaia37qk9n4fn3srtfrmqnvkx8fmlxikingu5w8axnk6elivrac4876clay67r6f32tblnip11qgpzlh0tcraitz1wtjlrh7b95r7hcvle7hh5pipszszktf9w0a',
                flowId: '34241bb4-2b06-42d1-9609-1173bba82c59',
                flowParty: '5ld5f2o7mogzscme9ym7k22w5b6wytypt6ev7xpsi81hxlua16neuo5sqdycsznc3kkliux8zi9ck1ghnaoiofag3kqigxl4cr8ykrxn629c4rbycodid2df51s33s7b2lg0mhrc3cd0qubmzrj4ytd3wfwodw3g',
                flowComponent: '9g14karfpdhgf3wjtf7jqfma6t375gx6g4ei2g3l9etokb7w36iakzdjexdifcbir90fjj7ajxafs0ouggt80oo0a1jk7ei39zvmv8n9aurlwsesvjffvaisd03q96jrinm8ztyzj414yxck6esa6apim4gjaxy7',
                flowInterfaceName: 't2dgbep7uyggw960lts4i1h7kojyboudo969fgktiuw4mfwgel50pkvt5skvj4b8dfdnamx0r9v0x6z33hk5mmt23m4vegxswlrldjk1l8r5tvu77gpld3n28nt383tvt76buumyx8uc19ubtmchm9izit4x84qv',
                flowInterfaceNamespace: '7otv24xnbmqpdxrb8rjd3ooaoj1cndr6vwoqtr1ogkojnp49vw49iej5u4u7p8lbg8x6zvirdyjj4r5akl52wgey558171qud4gwx0o5vcz345o57f6s9jput6y7r5mmlciv64olb1urw3lujfx0i27zmgokf586',
                version: 'q1j4lxmwgovacgbig7ib',
                parameterGroup: '76xbtmgyaw3x9zb8m35stwuxcf89w8ivfzjrx7gtjqb6qneoau5drkm0p87gf8sczk8vwtsiu89te7cbp9bbacq7t24x69k4d95qn6curuug4rmdap0uxop4fpxxli34kg4vdru8pk1bgptaeoqbi91b1veuq2ilrtcazwbf335cxlu8mvykb44vo165395su7qq71yknjdjd5kjw64w9g818k87tm562qgp8mgrwad70jqd5jwx1sipqx37jkq',
                name: '2viv7lmqjk4korgqk7ugix06u2vume7flfzvdhccsoxlfregv259cs359uz2yy0zbv9u3ccifgksv2ujfrekwxk6vh9ktmygxyfogst2ntqf6f55zibxey8m3potzxqb1egqci7od7zep1zn4aeifgrqazlvov8pp2mb5cirqncd18tlc22teo9zx0j3tsvn8om3bjy64wll6ouamnazfgtulu55moorni69vhdczd8anuppdwjfk2gnn98nb2oie05e7fqncnke9ojupjvsau4p4f9w7o08d0ojpnsec748lzwcz98isfha6uxdfa44',
                parameterName: 'w6854wh9ea49lkmmm09h98zu5g93qtvg5ofa7hdjzsq4ocd7iqdew2njkvu0hziw31egb09jz8fhkcat7fzalldkjbkbfgfxwhklxrzenyb7wnc448x07dmgec1094i3ovizw3cfj6socdhcef1yjm1t3e71ymgon2r6s98qtse0acczdntydrx4lzizkwgakj1r9xlnc29dnjlvo7p03szji98h792riijqyl945m5m6sd6p0vmvsc4r9fwt5dnimjo93s534llj54orultjou6sfwdro2z57i7yrtvupavpychktwxehzqedayqdtg',
                parameterValue: 'paopidvmuqgs8j49lr9whdso8skctmwfekntf1gy2zdzcmm4u19ac4fa2pbib9sjctorrzxd3xebcrlkcinn6o2nvmly8saetemvx1fc0x80coxhiukz00yu6w23eoee9w63uuxo12sjgq8icp47fymushd6mowmiqhgl1mjy3fjt7cfs4cpawfhkq0q2ehsgtfrvn7thkspksrr49cskaqzt38j6zc5eq4he1k4mcwo6qyoypyc8lvjm5d29roxuyprutqfyg26o63wdfscli0kvr0l3ykfqhp0wycbcimwzsf1i4ahsdz29lbzd85x8ypiimmzzr44x187ou1isq38i6dv63562z50y94r68ffrccqdwj3cmipl4ad7kz8uac3uicz02xue69lo98ki7fmg44ejz1519lu7il8voq5kfnjuy98n6h8gskxpqauf2utntfekalz0eynrw36q4e6rxnph4rzhll7kjql0qckgre2iti2d0me0osz5jjb7j7g4x6r7i6mpyy7ufe7zsy94qfqyyy7em7imes5ru7gus0a04prhegd4pnd6fdotu8eobgb081w3jlirkah5sjdapl266h9r3j4nwpfs71i1zz5e1wkjgsla5cxyt05h6vpewkcqushpryox3ccar5llpua2z8ibaj3g8rfakn8e6w52ghg61sq7gnytnk9w8tnx109u3k3i7e6xnzi442lyo9etuh6wz569kjxhn3sveqklqa5lr12rm39xauybmsi1nqcwyb5gy0x2rs8ng7ag0whq9sgfgznrobenws2tdiruyb1wo3gs2na746g5g95yb2trc5hrm19hcyctbp31cnf1nfs13gepqqpwwujvnyjwfj317nsi3ru2n0vdacakqhtq3r4ay5de8vmckzbepztwkrfwmi67eoq8uwp7dz06sdr9trd40n06kxiuzsjbo7fb296jorw25gg3k6kfuycq7thv7x5r85l0iuda83j3wk04haqotiuf1js',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                tenantCode: 'imutcr0xl8ts2vhvwx2fufu7g9c1vm8waw7q39qc0n54sggf0y',
                systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                systemName: '4ay27apsqh7hgnd0f7op',
                channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                channelParty: 'ves0yqkplfn19265me81p2yam63ov17hebhumhqpi20fy5vwihrml33qy1k68h6sada56ap4b2jjsak1532cbphb30gxbjddqp32w3c1vdbtbj1h0i0bqcodjc1fivtqt555832201vkq2tu4qkt3rcxzacdrp06',
                channelComponent: 'ly9mkvmi5i38ctf4y5feg433f7szpcw0h2wsh2hc89i2rlz8pb8yz32decr6i9h1ioo03jagvje0nmxudmwdo8hd4ilqt4kcwcp7iipg96swur8gwe3tqgkv80ey9f2dahvl5uu4uut3fqsvkft19o2ic5seh1o5',
                channelName: 'fyt35jx6x73exjmianx2sz3ff2e1z5rkwy9gzmariwa77bq9949zatayvhzo7c0uvmrg4we2til29wnuu2uvmkmn2ndydxkz0znwll7pi2qsdvlboknr8d9zx9tv8ebg3yx5ddo5qppkxm850noarb9ydukwl9zo',
                flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                flowParty: 'svnrrdhr9uuyg672axnfsaybq28ig3m5x9g9icb44hyanjef590myxe44f7j9vvflsrkx29ffizcqgcudbmbujraxx7bipxxvudlcdvq7rvn8oosp3rg4n9dpbuop746bv6uzmtko2e4bkbzlg3vbzuas5aklbs7',
                flowComponent: 'fper55u14pw06d88joqqeszk92873zxy1prs17s2ugec81d08858c654a6lhc91m4zbfgjskw5shx5d5615q8wlg3wu1gdgdfs8avtuxuy6xkuc7u3qszb2bundvkq90g8hcoyspqtesbwwp5bhkoyl2e20qg5ph',
                flowInterfaceName: 'o6hm24zofctnd4mjsw44uiiuvx7pn1a954m5o86z9q9k1rw0vqucg8hyuiqcoq1e2lg91oz4xfiz838kmea1q50s935mqi07q3t0p8funl0px0jj78j5pg3ccno80v8it2tc4116b1zr5n64a81cwjihiuqpxay1',
                flowInterfaceNamespace: 'vsv3r4j0xzrmst1eg90u0w4o1xu825uldlawbbb81jr97cq4g725ntwqsz6xtsawo29q47ppuoc3xxzc78g75ejpotzizkvmx6gouc296yefezxmnso48ggt8rq5813cmj47s4mkk0dg75lzzat3e05j34ln0frs',
                version: 'gy1f408frgstqx1mfeik',
                parameterGroup: 'mfbgvqmiyknx1zfjymb28wabrcxxi8uh9ml2zm4wro66cjbfdnxgxk6q9ciuhap4emet636ov2ukz5g0szrcfqdtp8uq9qhja4fvdfi9w53j00vje3qvjlpx77x1zyqqg23cjc52i92gxlnp8mcrtwm0b19b5xpe4k4nkdvs8z75uwyucw50quduh4twkyiijlo73pgqxsh6pfblfih8qwv0ldwuyajumxnekoatc5r3xzkifg1c6vebhp0wg2e',
                name: 't38bp5bjnlqnju7yycpubnhki34xcebfcc6s3y5pkga55x9on2yegfeyioj5c6c9rfzqplpwswf54r0jpxpzb6d0dkgxxxwn5x8qqjt876gbraxi80l8ycsk7bnxm5b8lze3kw9rol4ltl2yiebzevzivi0fibi8j018grdhjtfs6lyuyy0a8kl2lmohcsvty4pcrlsx11n2hv9e71sesu9w1bo9q15a4cde3gblnk7il5c26oi7i4vxf01dr0oxilx2b5q22erazd1fa1s7w7gcuadj2ssazvloukjzhvt73zqe6e95jxuz3i0ndcfm',
                parameterName: '20yf7l0hutnr9eogay3fe8bhmdw8bn1h99zdwvisczznk29ankp9wjjhnjlalrq2igwppu8bsnsezd01bvuaktzeopelgnx7gxkfkjfusk8tgd27w6fjb8nq1h1z30tvjxqu7qfd9jzxii71zttphu5rnos7pw98l19iafjtirsnibezcmfvilfr3ak8xcu86d5wc33l2yok00vogce2az11apd7ioufh2zntqjysytrml7sxt76ndkgv1weoxeouvf18gagq2givpno3n7o5gqiyh69vvskp1wgu2bh0d96rkibhmn9jko63bf38ps7',
                parameterValue: 'tphqalmvpiifi59amrgyna6s13tucj285d1hhsgfrj1oq5a3ef0ibq3shuac12w820lovcnfi4f1kzx6wz0qfdohit9z7gotwae3i136jfjrz3diaimowj3zv7nnck0fyjs66udpzsjmzaju3v4kpuwaugt9lovr6pgrhc0w9l2ljhd3hooe88jlzruo2oqd81eljc00fqxpyo3dkm3c9zqpmnan1yxphtjkjb86ueat4ey20x7xhkr0ygmhlrwufhy7zs5g154g5i2c5mj3r9lhajayll444tfug4n2mofxxl9z9rpdzzz7pwyoldjb154fp4pjpocjkpzak9g6ldahlpdtrtjr8mlkmz6ef4jf2m6zinqz7my6k6bavqhx3la9psx2vbo0tigqrlaa44evzc3tuwie9opz6ao6flt9kcl9qdbv1x9l6flscjdpmdjr0er0cy1kjvmoz8vzr8nxghlesm1lr1plwxtm4h00ztpodf9qr2mxeml348xopuo1xax3yur126kdxuv93x5gwkevauuazjv7tl7hut2kq7du0r5cn7jtm6revcmswjnoylfp1fjaclznl220zwdj12rqrreoko4dfzt44jhzey9nv4mb1mn4p9uxouz3n4r73p3bjdz54d3wioq79fkjd5kbft96m3gvyo04e6ac8l9ki6471ah0q9rp8j4ilndktgus3krazc8xglevg404z6n67txjx1wokeogo2v43q73942bkh6qtycf4bo2jpmh7iqzuhubf0kh76c58r1ghcg6pil6zull58n39p7rbyds590ruijsi8d3uhm3rp2ejrbac88tsdbg9iv2qkdfszj11aacs3u3vlyihyuikhe0x2dnizkvqhwrvs62yftq6i14tdyhc61bnxeclrukk30ljyv7jwkudl82b4drmxq3hxvglp8oz9xriez89s87gop8f7ocve2cd50of572phkhwpuab24cfvbaqaxg5rm1npf3t54szjz7za6s',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92'));
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
            .delete('/bplus-it-sappi/module/d2767e8b-a3de-4774-8788-ccc0a2a9ad92')
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
                        id: '406a1a44-ebc6-4e17-b98b-45bc59db547b',
                        tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                        tenantCode: '1pz4vab7b084t1uzzsv6gbx7r8mszb191c3rdji63v6ylg3ogd',
                        systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                        systemName: 'nkczbp9sdacy2zn0rhce',
                        channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                        channelParty: 'fpyrctkmv6bnpcjz5q625b8oipgxaqtz00peiue7sadcc5p0ju0y9jalxsz1ckzx0i2hu03xt6xv3t9yqffi4avj37m8ig96n0gd0q6pu4lh957e3icuz5968h2obkd3y4vshoh7g0pylegu9l38s7gkzmah6pia',
                        channelComponent: 'gyn3hy7ges41dxpey7j3pnph8cpb2qpm4uc250now6te00lra0a686271wribuwfy55ktcvwhaxqcbwmjnza07kpn0x4ewhkk0lvqkx7syiqkdkx7oermakzff6wo3cvp9j3j814dllu15bqtzp5djfl60zdi0dz',
                        channelName: 'bkfva8ic1clfesep7rkbi2bktovbyxl39a5x1gwp0b9uhpj4hy4k1dl0zi5inrfdt3zq5hceq8zngfql022gyj94bu5tvxwkjkaww5slwnefby95fw4aehazha1ovjqc1qk2q4qf860rhl8qzdh9o4xe884dae8x',
                        flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                        flowParty: 'h4z4lp79bzm736ynffbe7zs1rgkqjtarz3qtw7wkoihnvhtt5ynfbl1yg0g156hhk0t34b1nwpkofmdxke94oq693khipgke1q3d20yw0j73bs3bx2n73uxa0vbgnxp9dczl7mnfvb042qpjfownw64xt9tw1ry5',
                        flowComponent: '4iy3qyjjdzkzvqi9nfbuvw8lrsrb2j3fscxcc6bhjf3eyoa6d37sd5d2gb6m8yj6tp0bkvg5ot82t81g2etx02pq92cvkoik6cru96lqms99dnebnqo9unvbaicqmbpt45e770o4rlrvf1nl84yjw7u7znyf2lfg',
                        flowInterfaceName: 'kso9vwkq6n7lrldncfqj9dek7duybh0t5hmmi5wdi4ugb9zdczvmj98ag2ml4a509s6b9fmvyunyy6ujfm6evtojk1qhpil0a1xdrw4u31b7t32ec9fyvbz5ilosedr7yw7b97bg6gshkoga08x9kxe36e1gh3l5',
                        flowInterfaceNamespace: 'm6ry55zzzd9krvr9cbhj3hixg4syae2u5qltbg77j4q33w10dm32tfqci494sy54eryi8ong3iunk14566r4iufwf1efj1lde46ajbq8xu3tvbmh13g1ruio3od5trh15vvz7yix8q8t7iwfb5tupk933c5lwl9u',
                        version: '1ahx7za3zdfa9ec95szu',
                        parameterGroup: 'z0cryb57z8nn1c0i9v4ghgsqxu9d1wuhq97cp3ky7ajwk8tgn86rm1p1d925zx7ifxq7pgafib44xggblkm45vf509sprnokjvavss9qx6qy6qs1dok4aa4avgv04mah58sgnrpbhyry6wn484q1cqhxhiswm91btwggf32yg63pg8pqcvxq5qiijkk3p44i8h6346u7z0ie7kjyiio6n4v4nrdpup6hf0o5n4pjnijuevelgrrbktev2p6i5y6',
                        name: 'bx43r96vknimpf9g3lb80dg2mvczeb8reow05cf4iq1m4ygp5s5l8hg7dubldw0hp1lahjxq9ocklcjceefykca0pf4wax94xho706bfw2p0litri4qbhs64nufxo8reyrsxgkxbmdhruqq0j9olqwq9oramdimme1ndi0slidhujm7eq51qsodddgvegkxf3xm81eh6ek713z8qfq45ek3ipt54qc9nokl1hqu0qgpbqqhar1c9e43rxxk4s6ct238eue32wwk2ke6m2c2axlj91m03x1h9xty7vamdbs24lsyco097qnu31ks4wwfe',
                        parameterName: 'tw89caiioalutyd1wltcoc9krrl30z98len5ip0s3o32ftrl41j9b4fwbpjiku0q4oqgva8777tkf85dehyg97uhs515lgxrku9pd88kqi0dey0hhk0aori5lolnkw5zzf7zyazmo11vwo76h11d8la02f2na2qnf5l8pdar3cspehq361cwq16ecl825ye80uiultm33yk1zlrbdovtcpzvnwjh2l147pu7dt165utle4emta0idhdr2vblemehddwt3qrsb9sphcsen0mbocml9yuwec3pobfcjx6hwozn09uua7atetwpw8yv1z28',
                        parameterValue: '5y1cktj01blq9xrdx8ob8nog9i8xjb2s2prhxir4k9cdnewctfagcsc9jfz8fizcwe7yzxerp3j6csnrcvzuazh3dbjtwyi4rpytnj1u4d9n5mcevp4obmm9vfcunr0ikubsql6fibr09jdj8q6zyhp8nims1z7ezqlxpee8b8jv1vccuf4r2a3h0h7616da49nb1vagin6skpj1qjc614lm35pc7s0xdx8p1g1iel9fmhrzx5y9mw3t29z9catfc72ag9s99x2i8poqoi3d5fa167w6w6r3l4t9t019d0wwmo3fn73mvzbbti6uzuf20mlabynjk45s8e57r6d0cuxt8v13itm108gznqlbg82dh08ac8p3ob95wjggugb9i3lu6yqdwr3jjkw17cu4uwimk9cb9ssgi0o2l628j9g64j2h4qyzmsypol4jqw2z3q5s72x6lf6353oojjii0f24rnj9w3rfa9ni8r1zqpqpoqhyrncigqt3nc33irqurdz3t8ut46s2j06hdfnens69hi1329twornci925fsvhldmk4wgx6qoqn0sb78wioc0sgy7dnex0fqb33ocubobkomub3jzbtknpag86obnyh3d4fkhids1xupse3z2r8ews8ley55lskrfjhnq5fanthsso7sy90h198nw4h8rw4xcza7u2604w3y3peeb1u04oz8uys93pqbhhtpllg5f6wqnb6mbmnc10vtp8wbn2vsc2sn7wkhlk6o8vwt361uhpzh4diy2kej3bjbrxjqgel4eapcs2fpgbl19nn2w0cptfvxxzee00fsj6iggawgewodikfqyc68oz6pi4u96e6vc16gnklzaa9iz3rrzu489xk65on3lox27jzu2u7hyo23xuci0yb31yj129cviqhlaya653vlq2ervn726wr3fb0fuuho5o3040g34i9hpsxcqbjqrmlnrbbt80ykt12xnuxaaveym9fdabr8sy3b77uwagr4ra1p852ch8',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '406a1a44-ebc6-4e17-b98b-45bc59db547b');
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
                            value   : 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('d2767e8b-a3de-4774-8788-ccc0a2a9ad92');
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
                    id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('d2767e8b-a3de-4774-8788-ccc0a2a9ad92');
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
                        
                        id: '13669874-70da-4417-a882-49612019be4b',
                        tenantId: '74078548-0277-44f6-aaae-26e520738197',
                        tenantCode: '0y1vkytmmbeekv5kofzgtsl11r83axs110vn3xl0tg32khcj6p',
                        systemId: '6a5ce493-6d19-47c3-b7f2-4f0421640934',
                        systemName: 'qrpdiwnql76bk8ti3yxz',
                        channelId: '68d996c6-7890-46b5-86b9-00ff9cf0eda5',
                        channelParty: '4g3z4ul7pimown09mli55lmm5t00f8o57uxylz1mwe9p95wzdc8w88ikqwl80v9s0ynjy2vlw5z1dmuw5pnkbsxia4bfcjaxcx4wznkwryuyibmh68dqub6jqigos2n8mdslwovy5og09nksj9vu3dej95qufbhs',
                        channelComponent: 'ljlksmlvsuqbxlu74spzj9sbbjfmdts93zi17demn7nuz62cwpca37ewqun657wht7dpmxhsz0woa7e6591g9y2k2n5n6bze93lwtmaad7w9hkze5xddqym3xhpj920bngjgnuknzzzq2a6g2hshvwy2on94sr21',
                        channelName: '6rtbyfao1upzt907vko1at1iclyj3zbcplvl937cbzdjnfbb3y33udhrrnp06j8t1ap2mc1p57fkicxil0bzpqbnt4vypg0o7nb8nvwtol47sd6nybyyfh1uvamm02s258e4n9jr4458dchmvw1owzb1ivjuk136',
                        flowId: '695f7970-774e-46c4-9c1d-68d36fb16502',
                        flowParty: 'o6qjf22uiuzq7r1z5kykopyhhyjc40kwez7058fvp0kes6xc87tlygh5jkn676hh7lsejm5lz7kx386re5wfxgb6d8wfp7dzuzhj14vgcy1zzdpukwe3uagyx0tiiou9l5kvhbbdct6iji3vfh0xlb23jni1myvu',
                        flowComponent: '0q8zymiz2oiyqg4zf8aqb4kymv7ut9gzm18bwbyvleqqfal06p9vb2s086sxq3v2bnqvju1ho774zv2l03a6hync0w254rvo3majqefzqwjlccepwf03cs7ilf7nbhjtt9fofqsbpyqe030nsxdhwji957hpqh5n',
                        flowInterfaceName: 's6gn30v9odea27w9krorlr6bxyu7egy3psjhyfdp6yjpni0dr35gflnstx0usv58vtthr0hzeln62315d2l4didl1iroty40dpv7tpqxdvhczje7cew2cskr6ycq4vvd4yvsg04yg4x6ctjsprhft2j7tk8fmv1n',
                        flowInterfaceNamespace: '2n8dvt9xo39uxhsz4e94fbljmunarz3afcvfat8wezct48ynoc7agdef2lfysgp231v5q6q98ng8b8lhpeb3m9rbdau8mafgtn5g293i1halkqargnk188zr3qd8wizljc59c61f2qdhrd5iepd645vw8fgo9s6y',
                        version: 'i3t0sve8r2kpzhsiryje',
                        parameterGroup: 'rlac6dkl2bbzuk5d85nln8h8ev8qx8mw45q75sdrbt4ao0i1mvaunbwsod4emrj788oadltogozbf2d6fpffp12xmhjr5t9bx53xlc80rlcjd0ka97lu0ysl3z6invsqv0m0n9hj1051lho97sntlrzs4uh9se6z6xgthd5iwjzvlgqhce41inqwsm5rgso8hssddqbw5rwbi245zesjnmzgohpcylqao6zxk2xatlql975vz2ovksmu5ay7r6b',
                        name: 'zgvoduvu4xynvgfcxavcf9uhzx23ijpsykb1o9iqekyz4wwu0euvq6pf1bulaepoh0iv9gfwcb46stumqtmxp0kgi7okegxzfdh45m1qzz9d7qit2m5mwalbbtf7t785fftcnogr9khz1j18zgep1q5mqqj6hp3gzncexuqum9tv9vbh01bqhaky1wsuma3khb9c69he0aqtd6vu5xo8cxjfmp2qlr0c1qmsg3t5bnkugokwlla7j846wclvwltlr23pgntjflaru04o58d2z66pt55s0sc974hnet9iwyii5ofopw8rr2agpmk4x8rz',
                        parameterName: 'ltfc6cp01nwko3qah6qh87fram22xh7ha6a9jqqt6ckoif0xutejnvhjb60blzssuqdl34d6167g0ctzi72erfwhe2n24v90amg3en83zjz19zkhl5dw45zxr160pg5bt7zybp2cd0zdw61l5ljfk7ph2vs70awuv545gnknuknll8ayenk8yfdrshsmub5mlielqctrawbdjbsr8yb6v11fbjyrdk3brt01dmzc01tgm9eekauat3rxfixaqss30gzbuc98ogwjwpxw4k7qjrzbol17z1uv2iu302n88z7ca1xmqcu7ch3qb022hh7k',
                        parameterValue: 'see4t2y8tt7homq1khibuug1l7gxaeig9kewb5zg5p385qsseqcj7u4s73alz5q8pesi16hbnyf2ze86kzzm1y3gdithgpalol5udmnvgn98czj0yo7zewm54hv0pj6l5xgtt6kbzxnh3hn94rjlg3l90wxa9afbebgthgvq4snhyqsdi2wdihtuvu6qz9l60rqs81zrgfpyffnej0kmwopnwoco7n7rn5njzn682w277pwaz9w378r4szk42xli315om1mpu57yxpqzms3hyhfzf9bxdbect6v2g9ha69fsgic390kpcrdg00xrshluv7f2jc59hnlye9ijltuujyjvf36wpmn089zx8ibywzyabjw8u83c2qlzyvxmllaos0ghuwesi8plbxt6ub838l7d5yct4xdfk8mh0yn9j78uudt1p2o6gxaoiflop9prgpsfe2sa6k3jb0nvvpsywmrrj9j8ge29lp5cum11n05w9cizsb8z575mrpe6rlt0gpafg47i50w0rdsmxsc70rrq1351epg9jx02f3hqclvzlyl251wni8et7f6eghhojhoclzxseyd3jdwuyzibfiffznj0qx1r64b6e5eceacdy9j610fbsrjauykr003knfcrn6cd4xuhq73wms62wjskdj9q0r2y3rm7izzbxm8jdhby4pwde08oro12h5u9kcasn2vnk4yiyokv6j2kbtayfrwzfkje8x0ticckyuahn4yjbp2aw2zi12kzo5l5wrz7fzdgk2v8a8c556e1yjqdoq3yz2t5g6n71jyklhjot32o84e2xy1keh83whssdvz02x0obutl9mc74kymkcb8kzmdeaa6124vzq6x04eekd6jylbzrlzs12ch71mydp437tpp26u0lo6pmhi4i824q7nhdyu46n700raiihd5xmgam54v04qj86vhf2y4w7dx57tznyzuscxyp1d09h6ibi4cu0mwjlxorfgf602n1csg50tiu3noa3focz5k',
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
                        
                        id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92',
                        tenantId: 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc',
                        tenantCode: 'kr017ef7bpibx4digtz8gpzxzefp6hpvrnmbogriovd8vre5f0',
                        systemId: '50db5d90-c493-4048-b1fd-b1bde7661c2a',
                        systemName: 'y2ocl6y77aqq55p7pb5x',
                        channelId: '59b725bd-7211-4e2d-a647-4124093e3fa7',
                        channelParty: 'fy9c3ywraz96fgy89kmkl5hfymhklzl2khfrxtzaoevvuezc2lob0wquusyk8g2tb6vu4xrzu0laxu5424ahpd042dhc9plfrqeqpa1wc9j784hwku56ub0kzrn8cx05d7k672i8i5clbvy7ton7tdiqsnuxeahb',
                        channelComponent: '225eqbgz494wizu9gnbq1lo0j2nice5gylxbav3cf24sig60z4lbx65484f61yfogf4j495c0isi6hkt2ny2ivbguzcrjlz2lrdf9t9wqomfsw0b8iyz41h2ydo4cjnubc0s6il2hu22z1e2gly7h8mp3jxsz2ih',
                        channelName: 'fmzj7lpdj27ic8a6yv95jkaaqxrqhucbxzt1pxh1zsrmtgrhctfafo7dvaq4njk6uqblry6s5ja6nh1goxy46jqcot42voslw6qxkjcpwewe2m7jajmybzmdsscejywqxthvqfpnk61x6i5lyvd80tuw93mul6tb',
                        flowId: '3c16aeb8-a80b-4ed3-83d0-898972931676',
                        flowParty: '2fjcpv4dd42yud2qu6kv7f4gi0vnaw6zsdf3ekenbw4gfgw5uqie1tjjd45a2l4j1mwbub04ijeph21siusgt6s2bc1pznghjxlqrp295hgdbteboorrpvylfcyavcz98vzfa0zg0run4oywczer49imhb2about',
                        flowComponent: 'v017gl8feb0hjrfp1n0aawlghd8tfdita9f1a0uf1988ptvprvb6zcznb59i06uwtgt2xbmasyxr32oqeo27hmqzlfsb2zuw59m8twyvf9oosde2bawp0ll7grtemfvwd1wep15salshwncahnvufyf6lo86egda',
                        flowInterfaceName: '1a4d0s1rcm290pyouazyba0xynawkptw0kguv7ke44nytg9ogvi8vr3goltw6ibzcucx86njgscb4gay3s11xgkede2imsx0hvxu8mcgc4wiz6userw356pu6fry7v9ucxp5u9f076ue0x0ux595sxucna61zyph',
                        flowInterfaceNamespace: 'ovobh1s8dlzarwar909zfh3qwwtjiytfrlwm7dfq2xffwmm49vlr8vvdxzi7qfas56pq0kewnl4m0tqm7iudcafftzp6q0il6zqs8vlurtgs270rd4io8upmyo9hps9y9e4pl29gzjp0m34ye361tvwkft9unex4',
                        version: '5h2a44tvuvi2xjfm2iz1',
                        parameterGroup: 'snnxh68s41jnho0tprzy3qeu11mmbjdmy8ucfvpgqkmz3nh7abeokmjx45u6jwg76hi6ylk11rxpesque8y3wmxe97wzyq1mqwsnnu6zjt09lw377whnwucfo8adq5tlxp3p9zkh67dfnchtymoeaan0gtktiscvcfa4j4caj12f02owz4i33c3g2gsf2qlql5ds6i1ho0t2worrj2l8yifzfba4yqnzr2nlzsvk1ub5ygxyxf7wm6o9nsccvo7',
                        name: 'jnm7zj0jop1sq5bzegumo457zedza7cwd6dfyq4d4w5rexuxkhnk1atwpofqkv75im12nblxa6wbhqmgrmtjxul9c9fadbzfw19te0fnugef2igj5oj06ygmph5ijx0s8iaq17y45q1p9g4zc0zxzitewdqxmxfveex1fd9hfclp4b4ejcowp9dhmr1d8ec1yww8q4x70n98owwttt4behuxzlyfdlg7hze6hei3k9ozcvulj2thyjx1nwrntp95ro5ehhpxhvlj9czqtopjjrszq80fs72nkfflpsqpnopzql8x7br0tpyepoktux69',
                        parameterName: 'f2t4mo4zxaya1xonzywa58o4asqi1r44cqk4n6gcobjtrv81ia1pzz6nk3jjdvo41y7rkild23jk2hz4etvotdx5vhxvoc0w0yjfnyoeb41xzeg2iu3y13givrn1bsmdxsbpo98o7upw2aqvunnp1r7zy9wsttzf86vvsfnzt2h05flpu8ffnuzh4feuqyloa1wzntndb1x64lwsr3t0hm2mcepe3ywiepdd4iih0nqk46n7zanta6eul1wjd5fddranz24kv74eav09jtlnecv562y3txxejgs25g4uhn76b50wlkvk9ib6st6jst3w',
                        parameterValue: 'baovdzgxg2fjrklliwznxddl5muhykjdhskrzps1boumptkeg7rodp8w5larnze5li6iizcntdeid064lan1y1i5ovy8qhbamxctr8a7g2lerw2evevcgnns91xg0fc7mvtywoinelf41ne1gm9e3rdkz36u9a20z3rf4pdbbo60x9abzsb6aauhhq5v86c4a57fl73iy8mk1ndx2ie1mo4nqly71v3rksenhabf6i1bax83fcqciy5mswblbv2zgq93o5c8w9esh3gzt3jumhevx6p1zwzcelrz31yw3wrho862rcg0lg3w8ld8sqieofr2lwt1cehdyz0uuu7wdhakwrf2oa5dhu6mw59l1r7khdtd97kgd7bxaqb2babhsa119nsw7c8ojsvz81qzwwn37ek3o0qfl0uqgup40wwv8fdf1h8tkhs91bbqttvx5int03lgll2dbtl9roeeasoyeg9b2ejt27euk0pyst7bg7jvqpxb356159cgyhs4a9hiixaoml9aekft9yglgx2x1ono76q4g6wqe3w6eb2dyt5u1mex1o5q1u9tvf05yw1s931cf23ty0fkpf11siuugd7nn3n85f5cvvgclx0bhyt1l0i6dqm9we8x5lkcy81iotqfhzikfegz3h72qlqhw1x45kok0z7cyxy2449gzy819zcgqu099ubw1raegpjwly3k1hlhzt4fpk1f1ycgy1ejcxx331fuk39wp1fpjmjjyi9yahoznei2kzbhwyq9rqshkkzizo8ql6m2osn1ftdggzunwc0j3f120l1xx0i6x224ntwfut32xsvne74l8ia18vv8t6ndrljz4ge29txa2at5389vgroixs96vl4cvgg9a8tweapxx08q2mwob31ohd3jor79c4gayvmm0qegypilnzud5a6dndq87g4gezcqj121sybivelgcmu2c78nsbmzyn79up7003onaaplhy2c7nrt6szhld8is133vauiswztt2igv5rk',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('d2767e8b-a3de-4774-8788-ccc0a2a9ad92');
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
                    id: 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('d2767e8b-a3de-4774-8788-ccc0a2a9ad92');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});