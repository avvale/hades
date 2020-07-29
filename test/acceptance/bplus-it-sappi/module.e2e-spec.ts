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
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '42h4t1dmd4uxud2uyjo2k32pvsmntjs5dk7pmpok4im1r0uzd6',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'mdtlg9kfifdvo9j6m1qt',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'kl7o02v8u1vh6ogtjson26vuxlkwjtjcjgjd63kqyg2ymazzsayhxbgfly078i3pb6rb99793bzk8vo0yj1lexy5m0qxpxeliw80l6slva1w1p4uypkw9ujlv00wx36kawzhixth4wk63qzpdxfjil92mctklvzb',
                channelComponent: 'j9n1om1xzrfih0swnnq0qa70zgdz25ki2jf5m4qbv9bfzd34dvtagvuvb8hmhxnqwsbylipnzwq4holcfd2iescp4s86905yvoysu8qt6ym55gibdskxcd6q6h5c9qxb6qhdw3h9yw0dff91smhav9i3lvujcgfb',
                channelName: 'cy2zarizxczndcnl4cqavnlgh7ubiexesjfrlxomk8rrd2fsmxcq52x0lou91rvmriw95munfxnckgny0bya5nlqq2fh1pp5r8dvsib04xhpj8mfq9fzg8azfhs4erjgm320kwssf684cwnvuuii9beat0yql9by',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'o24xycvxvdoe8f5hhz08f5rg4pbukdo6y3a8mc178af97rs8z3xw3ra4v9ju1imlur53g7ilte1lusivqf7z75vrm6oi8hcvlrpuj7gxvun602zp0ht6z1l2mymnp1g7g83221m11udbwwzv84udvi0tcgmvpln2',
                flowComponent: 'vqpjrrj39r0m387rtfvfo5am62l4k48yg2yr7m50m9ibdi1jufi5oi32oyrcj3xwziuxgyyrba6w96hos5kh7j5418d42ql20ypjldvfi6fli6pjgz8g8nabvfqnru7wx9jn4xqarwf5ibxbe9t217um84k0y3lx',
                flowInterfaceName: 'toy8k5apm2tfbdmhk8lipa37r4bpb0t1p7lsesn53kb6bf2ra3ea6pl4nbkr74f7po9oncuyw57wm5jznn8uluu3t2ls7ft8za0vpq2sjm3plf1kk6qn5uatbk8v70tmrgsleu5l3krlkxww3h9vk1flaw81gkaw',
                flowInterfaceNamespace: 'jzgfqz9rqlzc25qdyft6mep380nbdsjdm0myuc9lihadphcngb5hlh12qxvwj05xl7zydopjzuwezzstyzlrmubshd0nlksgj65jojal2h7gqyh3e31q20kygovfne8111ux7wyidzrrvkb3bbmvqhuvzjv7br1u',
                version: '0f9sr09u58wkusufxyq5',
                parameterGroup: 'mzkhamkun26lzjc3yrg49z4gbrdwr8tgna990rdfbn1yvwdt3bsx0c1mfpfd9yhwusifzivv84x2wgj0wcsodcgugls7y1fflxmde9656r02yi19s5j51dwod561larek86bdiug85sw86k17lfbhbrx3lrvfxmqrzt43onitdjix9tcucgw5eegnng77nmgtnq0jiuz792qzbl9zrotjwv2piorft6ya4ksl88afkno55wuo79ie2jkg5fgrxk',
                name: 'eg32v6n9vyzqq9n2borz703geegi7baqr61lpmroq9ifrpvjbmb1pmf57czaux7xrolclnp1pdjiblwzbi2xusl23vpuraa5o5d6q1dbn3adzd11tdtnl99luu1swlta1cp4rohv1ebhtxbqotbfy5lyeyig8yzqcairo48i3dw43sv0i9bgbedbkrc7amf568r8fmvwrgz3775pj6962bmqwmmzj7fcmbk3fsh2cmnm1lx3syieq8u04yyzb6j818no2hpumxyowvtyr7h65c89jfvvn341lm7fyk3khgie3y2z0209gdurc74c71lv',
                parameterName: 'ourna4o2v7u1xcy6o2glbt8gtktkf52twwdujl9fbfemhbo1oi31qevjconccg02hkmaz8vzu27wqspg8mhw8y4hfgc1llf966zw3pt5a2ei4c9mvq49c2yuqazx7kk8zwkydtq6iav4jj55zk6khx5yxfyuo6yf08fbwm7m0w90oh4e9m6i1imz5ahgke376apn7my90rdiolmypniub6iwu49mfuhzfpn8eywqhk0r8smxcse8gxmq2sg5fm62b0waip002ljc45teek5r4yiaj6v23y2de3b7mh1ho0lotiyd6khvyw5d7h5jwdxb',
                parameterValue: '5set4l5effcfggozk4wvu8n4n3p7fx947aepj7brft3k95tbvtp4k53fw5lvfjkkzvdxwzy7ny79864mm2xnyt3jbj1eqae7id0x6khg0eqghrt841oklsbnmmdciobhoiki7bsonfy8btolfjfi683zcaq1ggc0m7gwu9sqyxema1fnvaavty4s14poxh2qx8ewen2mlsr5k07jd9hghqg4xc9g1801zxd2d1eqyvm23rd0m4u45uivoz00ayzpcnkajhao9w096wqbew6xtanw2w85zwbyv2t7b03f2x016vsfmet1153fqlixhytgssvl6a3wpst5kui8eecd59nmkr66lu3gof0r5iwjv4p5e35dnoaxbua56pu82e0euw8t8wckowbmcl623kpsp6wtzoehjffvwsr7ifhiap6zn4hw5l30efgs9bvg2z9cullj1tkoa5jrcgysmog63bd27hlc5xwkudgazgnys112jsozfxxvpyhlytqg877iztx2jiyu2y6g6w7apxxaufcr78xoo5jeuzkmtykxg5d2f8nds2vdcsdlzy1b4d25lhzwapp6ai0jor08ajwd03fkb2ilho1ys8qo2hjv1690233kkfdcl54438u41xbnu83dulphtxi061yz3s1nmjj7gwrbdxu9zi6ad6hsyp0hwsu1hh6i1r397pgsfow4gqrfxesiiab7ak2ddti4mcqt9j6urmz960j796zvszsybz3d6mpwwc58x5o6ywgzm1i2cssll4m98rqfna4i0d5ds8zrd9hwfit7i8vqkcipigjapdfjnqljglv3w8pcor2e2znus099f56d6wn48000i78plmvgljumymyufzo8dfoj2phr0lyajt9azx3zv3t4a3bez1q0z1xx5wcnhfudwozt9a89udgfhcjz6xo75dvtwgjdszjimvw2zke5vvlj2taw6pt0dng7qwvjesbdzea33lnvfiohurdqjrfm0xxrzpjk1z7v22dtdp0f',
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
                
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '2byn7s68ex1o4enceuk9305f06m0ycgbnv2f8pfs8gl84mp4e1',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'k3d4i9vqpfe1acui6w6w',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'rxytsu85dk41moa0qj64y1dnkyembncfqsd44016fultd7upk3qx7rsibmfpuw3lpbhr0hbbm4pw4upohotq2ukqrrpo8vkblja9hi38u4wa9v1459npwrucytulqu9ifl2f25831z5oy10psc29iyis7sz3fs1z',
                channelComponent: 't7njybmpxqsvsxq8grxsg2dyhq5yqts1ulrdosus9cibkzxbcnrkdfhpzkomh1e4ccvnokc0b09qai17hdm05mda2024xv6yzcw6wk7j2et13nemulav0y3tbota7obyqol2dpjxumx2ph1y8o2dj1g76m41l1dz',
                channelName: 'u2xilqxy7q7tbtizwmsgo23cfasgo4119r8d7vzqujjv0p5dmbdbpjul9jfw0un1y1kkhi3h7wehubpd7giitnecwg21bdmd5r1fqhluyhvbp32zt9xxr98eel9zrmudhrynooteziuwd9ymlqhsktuhjyszhg1w',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'pjydztenocjt1vwebh5rkpdhcfgxekxd55tk6jpki908p54m456j0xo8ltbw86nitnc8jaj1i8ah9myhl74vgsmazdjignu9t5nc1g3byjsf93kdzl8kp53peerac8g8d42yc315lh0h0zd7tto6wmrovopmvsx2',
                flowComponent: 'vh88hcpgpcvwig43ob6jjrxckeoo1dsqj7z73see9kdzf1r2gfa0e7jv08ra5ygil3w25g2lj11ia68l7eufi2ovuq18qfzxjj3ahvxo6pbuiigkf4md721b7bt3fphy46zkbzmz5vezno52ogh21m9wi5fy3agp',
                flowInterfaceName: 'ezk0swqnike0yq0f8h473yszyidwl50b79taqm16o29hm13mfnboeedxvo9gerk65p6joit45nllzn7wlagsgahzp553yx2fn58eiz931ahq520ncowugxjgef1kcd5xx3ye5r5zpt1u80nt5llnq7jv9oel4gjv',
                flowInterfaceNamespace: 'fi9eu7zvp6i9e1z8zdghcgwf9gn59a279p2wsgu1r3ocqstdii29rduclsabsv9xtlm1bd21eajsqhkqakau0ymk0coo7ony7e6xta72rx9wec35brzmkakhwqst8y0w1wbx4ohsvknj4bydpc26h1j261bvux1v',
                version: 'y6dd74far4wltz175i13',
                parameterGroup: '5ngxp54n3h99msbj5zgq7ijcz01m7lmy0i9dve4k8s8ba66n0tfxqhaz20gj9pagxoz80cs96hvlu3u4uiuhoyzznxv86n3hro3nj5g76alb5d538ru5iqa1suw4icx930f83bugqmuwmzygypac71l8z116uy925tc9c4dlwvl40xpgi3dyw2ychtmlmwf357oeu5f9knlbvsvp2inethhele9xwuhsi03bzvvvg9h1u3upqxffaxjgai6hwbm',
                name: 'cmc3ttfm38frsyxazbkiebl9mpbchgzhql5dbywn55zgfusdc2uhgmwwqcsqltesgy4ispa9nuehq30d5ckvzsptuf8e24kypd25ur9mi9cfy0rbi6o0jxiu7hxgqwjjodyqtk4ncvtxhhakzj8d4587plifmc6msoo9tynho704xi4sa3to23pp5ru2vdwu3rmuwlvobmt6zdzu32wlmr7cppvhmdnupoipy7c1vszrjk0g5ehj16bl7wo18r1yssey02llxwijm4hzcwodep9mldimj7es0zp0wfhw32997cb2531v8g13pos49q67',
                parameterName: 'vatvpk3lvy53jirilc95643f7mq3lhmn3w0b7666ubwgq41oya9yr88psnwctar2rhmwrdli8i7mldp2x70av2iwmid4qcbujivs7sn7tnq7sxt0c9hxwf8udapyg90la8ibkhtmf90ug6dlsss17y1q3ahbq92fu31xi8bhmrr548ff4jmbehj18zu220kytdmzux3cda2xy2u4rgmvi3xx8jp5e3656dynh3bamm17d62h24kl52gr0chhl8tmk2rpzs7rfkfoo64ge0l8c6z6jpqcev7yry9x461xkb8sacnxtvcbj81xc1zs1hfc',
                parameterValue: 'b318vl5lxvfni4b5oy57antepd4hwbq7t8vut3pltmk39ehnrkdjwyv6f6jnu43wgjhbtd1wkjq6inucq6v5ky8fuy5tlqurt6xm12nkhnu7ao2j9nrp5zd6qgjpp3svz5uubq0ljni7lv7yr557raios2937lx6iuoz24uruzj3eha6mdrfgkor0gzlmw60jdwqs1x4629gcoqrrvgcphuq3e4nbpfll483zc4kmy6ehxwitih614znst701828arbxakngbgr6q3p6vfgwwvyz6ia3zp4t0433y6p2w0pu7b9yyjirs10bnoeqz3zenhcwdofugfjgnmyf32lkb8y3ug3y6ut7bb0rjf8zwgibra6zz51ux9mst76rsq8zlp6x6eocc8comyaz7z0xyu1nuozopan1wkugg449nz8o4w1n8fjbl9zc6ag3kx8ji6uru8jjq78pmkel490mvvsnf92ftsuwo96xemwkoh15mc12e0lhyiye4u1ej14v81fix8tq09hrnosump5bv9dbgwfy87i881tt4k1y9xo73ucrfrz2ky2ym7g36yjrkek17908t8eqaf8lnjhagjt45ru13qr4w5wbeopmpaowvmrkfs9aqgmg69qix9dquzs1k835qtb1uiftch56zmphd0qq5mnqfzqkcj2g7r6ock4r3xnpva5gl1l4lqm0zl4czt0pdcgfxefngjzfhm67ieskoyyx48lsnqa24n5n5o9y2w4pd33d4ylc1i7oil9pgzkks7aiva3s6n37dt6bltfrc5a6kjig3n1y1dadxgldbofn1r49sur5ymh0yvhq8sct4i0y5flwolzo92orrawxkknro6id8qwjyz6w41ytb79fjzidypmzpu8fsxi7dt8qphg1pn20i20s9n3oqruy4m7o8twe1w60k469fzi6jbtd59x1sng29dq9mztkiuhpzopyvbgr5d029uq4ont79pu4xr757rqkwll5ncmzyrcvoz54nv1ylaxc',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: null,
                tenantCode: 'ir0lsdfcy4zwk2cn2mp5igg6341jlns3xlhde4zf2h099zra39',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: '30asgssjfdvskxmsl5oq',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'z7imd8tffbuq95alh13xnelbumyfnlj57ykhgrf48wrdumdfoi5mr9td2153o2q1r29ff0x0ip5ewduki1rgkadyx5uaj0mf70lmrncuvenhenfrbb1bpa53bczd55cd1ki0bdrelifbkcpsr3y7tto7josbeumd',
                channelComponent: 'bkvf0ndam6lkgxk7s280cxgtmju2ihkhm575xzsw9urnpb819vyalzzszrtpgrs7wn1bzxj8gr4eyjatzrdytvoqt8ooix4ca0v7whqggaag5t536p3e59m9omiar4axgswczhiv7frhapqxqr1b714zckmt7kf2',
                channelName: 't6mesoqlg0reazcg8tqqd38eimakxrf6mv5jriek6k5r43yxlu9mu3wborq1ycglkas1shazzo9vj95gzrwnf52a44v1clsax0h43pipqwvyl78e72wggx2b98m2j86fhdn0l9ffhrh4igbtdyfplu8cg4f7on29',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: '6w8my6svvfy198kw9rn1s1a3y441sukt3gpw3k29v9gmn9xj5j9cigppaqklia4idks3hdepx9quh2b6gd5725wt22j4ivvvena82z78pgdidkbw78r1tqkq9f8uosj3l2g5kqgc7d3iwaf8chiw78k9xpdw05dh',
                flowComponent: 'eg6utmynqja4o77qesc3oooxcj49l9kye98vsinkadmze8pzv82tpjxpg3ou2rr6httyvefxfnu5i9tbbyrrpqenfogt82icjerfwb6lbog705d8olmpo4enbpmacnwcgedsbf55f5sk3zlnyd3cv6slg55bbrmq',
                flowInterfaceName: 'y2f9gaflru8yvy92o6lo10fzhboua6dpn3y07zm2wmsk26p726syxaffspui0hyo4ba6wnuyla7ldiqapir1s4ohy2okaqtcsfdozt5uhvfjdbi8i13swacrqt63xt0m2ns445gvbljmbyw3i4uyrm9td6zrazl2',
                flowInterfaceNamespace: 'yxzhadgoih5y5sg9ev4l0yy3md57ltt1nmroxmi73ng79niamqknvab9kavygeq00p75grafb32eivf5zq06b7rtbyn6v430ubtbye026lk21dg7g9j2gqjy5odd7y3y7rs5l8xx2i27p1nmk1e31uf7gyqslv2f',
                version: '6vrin6odyof7vk2ml04n',
                parameterGroup: 'yka3yc882admthdq3te1rii471bngux858hf43t9z55x20tet3h6uvg1x6irq7ylkwkuvcg5jb0akhj3z9y4csltzdo68xr6o2dqe90kzhhqef4cphlibd1npjjl1c8utejo2hxxd6dpilw73xgk4yl3h0t9w7wmf605ptgfv0oub2yjnuh3c3jbu4dicc1h20ocwa4rja9f3s1627koiv1ati17phyneyoif53hpjvko8mm9gsorzf3ph3oems',
                name: 'ys267nertmcrf9a0nulrqynep1ro4yx8gc7stum5m4onydvzq6l1mi8owgjhx51l0cexp0lchjo52ipnyckjh6wtfkgvkngxxxil7nnmrlwzf54mtg43nsx5rl0c9yhx01aczuctq60uota004sokap3bgg109x5elbfm0wtet910fsu3lyn7aur97ycokes02xnpbq9uqi4ju6mwx50g3ygqjydafxnxv6m2wafo1d727ulr3nayssctmhejiifrezfhoozmzvayfw01mjrryqooljzlg46l0mdvmlr85v4l78odwkb2mqxn2yt4wmf',
                parameterName: 'rsz69syyv3cox7gqwsh3ashrjd21gvwoqqnuy56nwppxejomqik8r77bwzvb6li0j6vwcibq90w5n2h9brvbwiusjdk2gknb3b2nxl0gofigqlahlieorfnrvlqllbfasp6vracli9847qt30lw0z8gtc1bsyg2mi5e9c2zhna2n87bbo0g91lqax51e37v2jd8kyf6tl45h6vfywgxz4zzhpc05ia6lu6pmjai5tfesegvsmb5rczg50y4h4hpwzuzf8ojjmely9oy7r2g7wzdoyk39t4ah16hoifhqj6vmf18zz7j44upxme25s7pi',
                parameterValue: 'm9i6sk3u0el3u4uqb9zmd0b4mlt5vnu060kpuba5fnlot3acsxsd8ppthgfrbvmaunngwsz186rtsw5qq8sw4dw57fawg7gf2gu49cow3r51kfcxaddlh1jxsdctm6nywvvm00idl2x7ge76fusm2kr6yg617jgkl72mtqw4h6rnprcm4o4jtfyo2kv3cquqiu4gppalnba4do5gpg72nd7c3shnseeku13lwku3l2gg5ta33lxdkt4whw4wdb15o7nptp0qkqph8olucehvp84zlb1u743gatldnldoxuyx2k22xtebp4jf16l48iju2hmv3i3a56pty8g7ce04z5gacao5g9d2ykcothxo6e7o11g9ww1t8a304ad1g9p18657zwvg2nhskxcjgtkrpcxt8mlxmix29yz3f9y61o3fkupdohmpytb4tyiarfefb8h8veo20djavgltck65ne91tcjgmupmzzdx5iz99qtoa97elwthpuwcch7lh2c548e11z1xie35p6oe5kdrd87idbqocsrsdls7bfwpqk74hjabl84hpoklaydlwm6ufg4l7pdnoavxbsi7ll3kqppghtixyl36bew5fbsdj0kbalkx8uk1y7c96f4yq5j1zkb5j5n7ow03vc7igte8f9gwg0mlzijccdno0elucl2y06wu8tw6cpm4ktsxznyne0auba8f3v0ii9romi8w75661mhk3lao24cdb24e1x9sfe7cdktyj3edzccg6fn5tv6rqze0dy5973o3942mppknfgs7dk8gtmxiimg77377ufw8pn9f1lwty6ivmr0jazm243fe2qiviw9wgf895zplwu1ex7f6tjaozberkmwv97snjepedsa6pa6p65uzgatwfelf0r9omtrx1va3ea8vi29tv5ecor155ta42ykuywub36roa2jd5n1m1a0g1ooz0a1lpvvorjd5cegk297lwm7a9ne1at2n9r74f7fl2t6u7u8hyn3p180d26ub',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                
                tenantCode: 'zb82adi0ngm4xfzyqv1mph6s17yis55laydr11xml8mcyhyth2',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'u2g0o612iwaa2t01dhmd',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '1w32x9iiffschv2dw38cu1x5ry60idwuuvkaid8j3viuy9x2uelsbk1i9vhte7t9m6j9iub7rju7a62meiq5ajc53qa9s2rfrfaheskc866o98gu7v89ic9hbler9rzk33gkipqcc8daexx1q7tuzfofrv9vjqiu',
                channelComponent: 'ck45nsttcqets8jo8ad5s47nh4ejiakj687gwe30x6dwo0eavlb4rad7fh2yzen4a2sgqkwni816ot07a5w40wjugouhua7r79vyij3w2s6f5nap5bht895cw583ivs3gez2a6qk7gbz70h1qndk75m8svowvh1v',
                channelName: 'snjrnkxufw34dhpopbhugzsu8k1tv4rm37b2zyvtev52tp0yihmzimxii2gsfca8ex1rpa2p42qve32xgpazcboqz7bmhb7q2936bdvhofmmdvc6lfksayail8oaqkwdavv9yx64y8tf09lbdi25xhd29ez3b7xi',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'u6unwb4ngtu7wz8803yc44rm4lur1797v91qpee8xjedztrkbkzzgeryuxbizqtazrtssp8p5ro45px0yoy0kc231zxzyzkpifu8jw0tedv94s3do6ehd2qtvttl5xslt2pcf8n3jqmfasvwy7w9ges1yr2qmdda',
                flowComponent: 'ydah8n7lig1jkgq8c8dlvd8cm23vfq8ijq30jb9suoqe0cin6u7nygstefi3hbf31wximt1x02vojlr9wigszshykoae5crztnzsfa7m7lmco49wnakpwmd9swfnz2ucj22vlo7jynaamsz1uq1o213dwnnle0l6',
                flowInterfaceName: 'mntf5ivcv17kak9h4j1z3jpw88pm53dvbdusyda4fhl2yvusevjejvhaqjbv4z6lkh6q9qe25sp49fimad3hnoskftti7ojudddmusachm9u9w9i7ucmh3dhatg62k0t4w2qi3hv3ddcrs8tbbe9216pnon684ag',
                flowInterfaceNamespace: '8o4csyyzdczc7oyfsoy1q11ptgdb0iknqgdo7qdau5l15ks41usl8t6hj4tv6y3l5wn3md80swdeayxz0uk6i4upu6nsokyxxaex6lrjj75k5bnrxx23pame4ketvw89wtrwmv1i2mbni52c3dm4e5wyhc6uh93d',
                version: '1wm5uef4ofwxf51y4vxq',
                parameterGroup: '1nzrp0l0k4o9mrr7eko10jnm62ufsvx3ylp8nyc6oazr7q0g45hkmpfws4a1l1xcwl7je3mqtb8ztaurwcxmb99xrautz61gupvzbvef9wiaprhvch6nfhks7klt9w8gkd6g8k3zh5dfu7dwqgo3ldegvuerpp7623ksyhfh7d6go3h8nx7zk81qdwbacob52iredhqt0b0bdjwylc024dpe6hs8y5mhafm4az1m401row7iblzmfyybp2sbx22',
                name: 'gtfadganueyo0ebq64dxxhycgfqfqfdaicos6ez0jhn9euhsez4ovu3nqz8bryj7kv9wmdttq4vzq5y6ay4g0hsgc1p2wbs8yinhd7c9bwv5xyr99o6xalip1zduqlbkqteqrtvm8nifgcu3y5uj0f2ftezc6ia1bym9dnruhwy2u3ezpifwv2x72vftkm14cvin36kym2b71nmqkjamuwcttfcb72in3geketj3dt7ly5d18yndjqdscb9e0535ic7q1s1c8okffxfed4rz51w012jwo35xlavipth1wxbx78sybn061c3ff1gadujb',
                parameterName: 'mcmnh4e32g411daci5993c7jcmrrgvjzh3mrueg1gswocyar3zy9n1a2g22agcr48ezj99gawutrlcc9tvc466qimisiibh3c1ku3paf495tbiibuu5pjw4vs2offbxzu49rqbly9u14l5qmd8irrxsjbkkl8a5o8llsxj5ydlzd4rfybok3c2aum1zqjehzm0e23po7ewdm2t83144rs7dcn1976p2nbvo4fbawy041pzgjdqcm3kd77zqncczefz5sg9cqdu6h4gby573yfguezyh8cogb9h9oo3z86clsrekss88togfl6w5vw9z5',
                parameterValue: 'ltkd2vk1v2ieefjod5s6lgw48atl7hbwa2si9k0slfszn3ju2atpvdwrbi6ch1d3wyi18x2xi6mpxpqs0yxytr03jrua517mu9ybeaq2tnf16k4rpn7xi6r9gsu2semi0j82yqtl21ho2h51aj3ipp3ajsix5ee62a1zyjlsn0vwx5klbujcr0yunu9wwg9hjm0na6ou4vse4qowygak9k7i9syywz77qeboucgo14pdsmqau7tvemqlauvh1ll732yvzqdjfprkdy7sfq7t6vc5dtbwv9mvuy71iyz2ayy2cyw0ddiyjlqimi3culydfu6v4kozxszsfct7vwgbiyqnf7p6hr34v0ajtiyxdjhu5u52dsgxbn8mo39qf5ob39pa1xjep2weocki5z3imb1skossf4jqw51cvnqv0zvzgulyy9n21mrzljhvfcwpdzn8i6tvoom72zc71u7fygohcozbk2aq8vm57ogwgjstcu5bxn6h5ozescss7y039zakj48spcbgf9c3istg245selkt6rwoz1g1br4uw07mgw4o50d30pi4uyif1s47wbbzhpcqp2rofb9fc38mgzx08asn1v0xqge6o8we0ftt4p499j5jranzf2lmjuwwx7bkdr3nf0vm8rcptn2ifhq3tmz0plq0ruvdxeh1bf4hkurdyqeefuqne6pbwociedfy81kfya4der55fcn4rrbjll7hid8g60pw0im7xzjas6s340w58agwzccvwpstmq5k1f1hu8ud0cpbam9qccn0lfgs72t2xd63pncuc79xdtvkmqkw5qk9k5tgkhjcf6hg36dcr8fmireum8t54iwxje5u5ek03qfk421ebjyeklxq7k62y8j36ytz6e00olzwltdj5uxe0v90cod88fx8r542r0dsg0iaumzdyell69j1lec76lm33dryhh5sm7i3a4jg2s58g49whclral2tem4x35yjoh0q7hz858s4si8tq5gepirebmejwf2y',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: null,
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'ao24ovahsq13zt24062l',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'pcnj91uybhhbgbkuzu6r1x9i3o6aemfygj67tarl9dt8ah2ycdhcepg8pqx8do31bcqwtbvg1abt3hm5zqnhxkp9a4e6xnx6zh5f67qcgwzmok8r4c9y0mzmjvhdjc9vr5t53m0ankyrpthpf0ullfs3kzepprs4',
                channelComponent: 'spfns5czk2po26ozd03jlmdoxdilmphpgur9w0ucksbz4n6lz214zuvf4ghrtyscx6qzc2qehvjy9tqslz96rc2qklsq6e8vlf4rm2sx95ay008vktuuj10lziy9hlr3q5da8axvbuulb87x6qf89y807z2lq9mt',
                channelName: 'sqsc95b2379gmedievlbn4ni6pldg13f3usbky8h0tdaptmc22xdbgzchd9pzx041qsvrvydvfm74gztiq0zeeumt7olci4r3uua914njv1x2ywz90mzct1dgibcywel75afzw2dgz7x6poelsh2s16fsbcz0pa6',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'ebqrbzi4mqcof9bc39e1ouo9hvsc25ktz762q2y1fsf4pwe4dp1fnv35eeuklqm5jzsugo7rgy0qoa3stxy0yfo49imp9gts6xlxklnvi0bd700c53vl9z5opinrootxf1s5cbvagbrqdfhrlgtl0t5o11a7zk87',
                flowComponent: 'g66760n8e29vpl079lnxbds1vgtismbdcv478jox9agr7kdtz52fz0glbu5nxlbgogtps6uoc1cbqlgjt7b5muqjur70rvj1zqb1mfcx9ehb1328qcbi2yd7y99kwu6p31yxbw22nt1tofz3fl4u0nhg6jinka3l',
                flowInterfaceName: 'r9d5jue1wfqr44pr4pdvxmqm2omwmzq3g76dh61j62el0uc05typ9i13ycdwymb2iwvj40fjufs5tjs9b7uia94mif5wotqp7t1mlmicbhdkpo7u07a3m7msz9frgwy417g15t4uhyo2m572iyt9tfrkw9vsubhm',
                flowInterfaceNamespace: 'cgn6t0ny1wg1ohf8j17xf2pxrd28zix6u8iea3n4vs26q4dqwcrmo2zfudx6gnsoe4swjn6p8ykhbddsg1b7z0vx2pwpllvw0zeukuwz1nbup4e9zzk9hpr3so27q6nu0isn6ivlj3454v9r1rwkptt96j9mtm8k',
                version: 'u069d5t99uo7aln92i6t',
                parameterGroup: 'vevjqi52vhbal1m94co2zoawumy1f0c0or73jgvavn66gq0u15rex8sjpaivv65218h4aoabfgfg6zbpg8sh9eo6jyvka2c2q6buc1yc0kvpi3fhc6wwxq8qxoxoxxjo4rhv98acrd50gqehswudds365wlmmo2d11wd2etjtsshwv6xdvqhm8nsrql5h9xqzjwobtmqrg4jcb7z2rg1mxb3dundah6q4fopwboo8zk526j1a18yip5vuaw57cr',
                name: 'wbn72qyguennto46kvl5wj9i9di8mvafkior77kqlhi6x1r7eszcq8hpwgm67e6wq4a01rrke3hl2eynft11fmtgr60kj10imnd39bhvqpnkt84jabsd95mh3mx2a16h0hqrquco7mi9ha6ivu6ioo8tv2a8i678hzg4xtej28lhv2jw1l7z0q1vv2y8sn8vcq3cdu32gzqlroj1r4dbq7z8y5x7opiblzpf6fb8qk65qgw6v3cn52q26kop68ezokwcez6i82mh84em4tw90rx7pc36qqx7x9koztg7qdy63eiayj8aec9t5zigz4do',
                parameterName: 'rd445ajbqw4o36k216vub4t837qkeizpz3gp2vctz90vwc7rknv00u9c7bk6q1az0xy2m201ht31sw36v9akazun41jk11p6vqwm76rewiuywnyhluegza92lwywi6hfe60dr4as3usfzchx3njpyyo7o6017j0nzh5vlccdci1kg6nqeq6fu5bec34j22rxpklo2rps7bufcghxzysd44sowz90kj4ratw3m152zbw880dzrxnag595i1azheouhxuh5s0dai3hetmzzqi5jwg6bieilearzk2sh6fpzv48aimxhxjj5u4pmg8g6uhr',
                parameterValue: 'yd63lpvt73qj6j6tkh1hz23y4e7wi9egqux1hzhzzh8lpaism29y1hvvado9tqntsjg7r98nonqglx57pbxrn2s9ef38fcitbd5vprvushphjsq3vbja8n203bybgdipe53m151zq76kj3ekxnouv3lvoyper95ig0ocpjuptv6yzta4naipmdruou6oxug6uw9ht8wiyvo19ygucmedg4gqqfryl6mk8d0z90qnrfzhj2feisufvabdmhj561v4av3m50zi864yn4k8w0iz5inno747txbz31mg5m7sjt9hpa0osdnvya79dqp07q74vma0vl4jygfn8ko68ayewz31wxfp7h3jd9jjwjqvpwq265r2rbqtcqtilal9suuao92yd4rozrpwmvrbjwoa38wpx2t1as4uj3spw25yy51i3yhd2m2p28nh86cuxcl6rzkhb7eh6m0mxnljkukntt9kt4pggwth3an68cpf54823tia6ly6i520766sjiwpkzvm5f31ixuamxgkvvkzqbrvrz9wqk7j7zye71qk02g45rgh7rqrifnbvjlooav7xwnfenx5jqpnlnewmalodjjmi39vt3579ml6z5igfe7o2o9pd5fn5sn1baitz3clelf2p8bi9etg8zpuoezpxfvh4n4gyhsws0rosexyi8td9ur91ob7qlprn1ddqysmkgqsaa1ynnoaxy2341pzfqwf99swfl61fbfc3x04o3bgj93r98y08j4iifllfaash4ka2zpyja8znq27agc5wm3nrf30xewucr2gdiuvdpf7bi8wt7998r9qrhim2ud5se9615xrxs1q0auhjvgxs8ba0arezx070wiwsh2cozvyrpo3kyrb0u4ml20gtute5njvlx4u3fes5rth9vwip1ddb0vvfyicgkbptgu08funndbhaewr2nd1cerjld4nyuuvwwx85boy69fim58epd2truqdk0ypei96fzyf3jwmv654un5ed8dqeq0jyu02',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'sw0es82s3fh5lwku3skb',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'u5rtxyd2zuu1grpss44510npexw0ahevayx9aair3t16ynto2w0u1nn5a9rkw7giw13jm1kdoyg9z5n57q4m555nfjypeqnhpcsj2gejyftfj0p6f5rc37wuahwmupc4foec5vrm2oomcxpqxkl6714la3g721fc',
                channelComponent: 'tz8rod1xkz6y7r1o15ci15p3cdamqumx7bjjub91uscabgc6xbwxnjkdspze3idvfgr5n0o455y5ctzprzucoqvd4fprkrj4rlhbbnw6nm1zen190wot6iau62oizzi07rd742tl7105n0mo73njo3r2mnxxaev4',
                channelName: 'm24ceqlpno6neygiqw6169yi2u9rlbvy8dtsyyf2nw5l20f9d8wbqjccuwpj6fchdckbl0jlzlevi48nli5rajtm1ef3mt8mzfi7eaoy2zgma484v8kfk0ev2e3ek692cmxo8eb5m3867jdw2sf0lz7heauc1xvx',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: '600goj7rbphzd60eqvcovpxe2abweqrzd9wu7i1zykf6w155tvwwds8q6gk14lf1v79hhuzd8otx2br7nck8e67ly3gl5jqn0prfaowgq4x83veubofwun1lcj6civwp4xokfz5lydi35podzengzwfay7ljuzr3',
                flowComponent: 'box5xrn7trbkz5dg77l1ft87u6jd8s36m51bs3qwjnli8hd8ac0eawj8rk4rvjtbxsoq09jwox51l5z4wc5be8ej4a0j73jhi7wgeyea0fwsg3g7i75ywvacpj7xfk7ezv3wz55drdvdads1n2eo82lylj9ro25a',
                flowInterfaceName: 'z9e91o8ysz53ert0swo58ry3lymaqqcuu86ekokosr95ghxzbc1bl5oowryyg9b9j56a0hztpra0zutkh6x3mmj179atoi5tp549n76gdbmjbcjhr25kacxflu8pyx41mqygto3kw8pyjfthctxnxmcr4okgi1ld',
                flowInterfaceNamespace: 'rft4u2dgw5s3hm8ekhds90xcbhhm04fnp07tzhn6tizleqxcua44h2bq5pw0hmvul6a6dw406kac2id6rdmepr6xxq0d60ddcpbv837z606z7374shf76w873i9s1d1pbai23lvcyum33t4ai15oecceqoubw92e',
                version: 'dih2j61m0hi1ekf9i2s9',
                parameterGroup: 'b6pdityukr0031seza6i3t00h0zqjn77g1hgo6q4va9o86w4e3ke2pihi8wle6a4rhettebvqxqhw384nusmpad7066t79r4kttb34dh7ek64mpe99nono0e4k5tw8q9jwvmc2gm18n9temacd3bx9rwo7yx9zu3upld8n32shdna7l61dh30pat02xlqarhp64xhwraqn99uv0aiyjyz9jc6g4wwd86huhfdj2nkysonqqgiyqkj8y70efa3tq',
                name: 'iqwjh5sg5x3qrl23yj02wgd3wc4omc1mvzmdcsia64j280nf1scbh2lktdswv4lucp4hhyob6su7j1hcdk7ywfdgeh7cowech12nfoqs9gjtnc2j7wq1a49akwo5l1p70pjtq447mm17av98jgzfxtoen13zmosm5wxr9g1cv4dfjcia93irrb3c9vhr2oq0qehvfotx0vcfpn6gkuo2zjqe6suwkwixh7s30dqoty7dgc3z43lkn8xi0c8dgwtmq8y0iqpuav5orw7moa5cnmouq2oy1j05mlk9n8zr0ofgdtkajm19rygdw1d277ft',
                parameterName: 'tfcin7ei7xvkz09r764f8p7u7neytodn7vxv2lxh8h9ofp3dw3oglpdb84dkdtoidiigc5ya8cpqmmtu2vdwlou57jz94x090affca9nsq6u955fqsrugylo2we84f31dn5vvwvngj9bwhquaestqotabkt2n81724h3ew65zfxf85em15lez6ehzbetlxtko9u71tutglbwmt8865z44dcay1fw8usdgjt5eyxffvbrr2bmr2in2x8l8xfyjkk769n483p0hs222rzh2qjm9qlrnwvav086r4qil5jdq4oqd6zfmc8smez1i3ayxgb2',
                parameterValue: '71dhwv0tdid4j458qcm1o5pt1c34fq4gxbz203hpd6co8u772ohtfyklealjfuf83h5fr9ug7bopleopzt5i9nvk9n6fhs6s2mrbevmr37lz2iqivzi4eclmxxx6a5wwhpkcb6410v24h2b6b5yl6c03mmgvbdl7jzetf65yih4r9yjfd8vyp5keh381r3e92edcpctafwzwt3l29m8dalk0in07jczhav33rijnv0a3z5hn23hl6rw4ux5vw4z6jjkuia8hqw8i96ozwfdyzyd0hmdk5vc25d98bexudy09bwp3e1ypa995dvebouysvsimnnlgpgt0vjfhmn3wmh4hdij9jux4q9blzfe4orkoihfybrkfahh6y5nyww9wfd72oy7be1dmjvhlpuv904fhh0sichhupgmue2fj904z33aj2588c3680q6xfpzqo48smxpn0detie19hun06jy0t97o485z1a6swxtci55iiq4vxjlip8fm7bbwg0578f52kb8q9okhslk96omo0g2jcgdqmwc029s2nimenz2htkpj0nlvsakt5wutzpud3b7zymv97gtxle7jya1berpzu56rkany3qcir9p9dnj0ralro5mv4nmybyckypsohygm036xtmkkkpa7kpuw5qvxooo1171krqj7v5i5t2uqsc8m4uv56895td557qnigamy1z2vybos2g8tk427z4e61hloffh4dzlt5nthhyhwx694s19mggfbhxlj1lbjcq5qns2pylclzbbz6awx6uzespotvsjflhegkbee4exgh4b57znahy3m3v3njorkvif3dqf2imx2f74b4gmv1u8gw8tb48ofja3d3ghewd7oylypjeylfbcn7xcsdsm791ptp54n14t1pjn2xuis6elulr1bznjc7m1s61zq2c7uq33frq402humowyvt1lq9tj0sacmxiq2e8tnq9kbwa7x2jliadyqnr57o0aek2u809b6kwdfbkwufg5mr7rr',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '8m6w611xe4cin7uhk9or1eny6fxmzrpr1rnk81t0vd5qaoetl3',
                systemId: null,
                systemName: '1e7r1mju0pa2493oupr0',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'ybxeo50abvmmgvdk5iqgva73h5cfebmyzsdhm63uizhgqypm8wopbjrrzbedz69fwg4i83p78qxsuht0i1chhkf21cfprff2iukkziyim5832psg8zklc2mjsr84rzu7kog7lfpht60ntq4q1vxc0pyfxju9y3e3',
                channelComponent: 'lqmn2zlu9f2r5lgkfgpjkot6y0dlmlx76stggws5ac1tddjqb2qmh1sw5hn3go3i2klhudsod6ptwqev9kvmdf68ngteo2r6fkyyvb3t4zl5ieba30gc6hkkv2wmswq40j486au1osqzbeeb5e907w49rwbzbr3i',
                channelName: '1udualknckt8qmjw1j9skrl0il8ulwrdvb3gx6ubty01oukr5mwf238oahf8wtcow27pu5273sqswu9uqlrfxmve3leki60si62encvznqsywxpzhn4p9koauk6duneiiikqh099yat9kalg9uotwkzgwbgebwng',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'rort9fqujtk2w1re0c9gtisrjkbgszlay0up4dsoh3uswu86nrmer7mxm3qphztghbnjdlxad9pp04bfkikhpo5nhhb1c31a4j02ryzn7dnh7jynvcj56qio8r06eg6dsz87g5pxims8xzn73lqfyqwfgx49nb6c',
                flowComponent: '6xrtr0ba15tg5p0b2ch2mlih9y9datqyzd5jggy9f3oyhp85kx0pno144kvhjs9pfqhbeteh0k9dqjmbc80g87p6vmrj8sknsan99n86epia2o68txrb0ag3tctlz5b8b7ymycoj6wvj0e04vuu8o0zde2nibmeu',
                flowInterfaceName: 'xmq1gvxnfwjj1fxfxe0agudty479varmen740ds65zm4iy1rzrhs12zn431gltaio2kge5wjj4irx6h4yub2nxjcsl1sjawgh81p1uhhdgwpq68torioulvxyceau9xwrj4573q90h2wloblbf8usw18ztt9bwmi',
                flowInterfaceNamespace: 'sxp7twbbun4fk4n8s6ipipmanksza7ablca3n148j05posqdr647sl0lshi2uyueetistq0ku8oj29zsqi1m5d8pkcupgaclltsw3f06mohm261kf43hwc153q7vd2kh21akl18nd8ndj005p0w8h75r1ui42jw9',
                version: 'c9hrbbvp0ldxzf5fpt70',
                parameterGroup: 'o6s5d6mv82y9ov4r5jxhq6tyyup5t15plq3sqa4riggkcoeppo4cpobsunhbcrp4ehfxh03b2i13yl8n5wu5gw8qsjubcxfyri9lauars46ijr9l2sjx7h70s5ld59mmmd2cjkl21e0itjk4oq1z6srjothdbw4hinlsb0qjw2413grs5ivx4lb1lq1yjzuanif5girstha006txzep8piqkv5k2m7uk9vrg61u935rgeoinwabdyspisifoq0c',
                name: 'fep6b8gaoet8djsebb1lo08jqusyu4qjn4zygh1d18rybx4h40cb8djiahqv1re1h3y5fxf5vcnq8zeqkuv7rzj9toy9nsrljesc53l3ak7c4dx39q7njelcrk1e0njqhvvuawpezmn9rqrccjl4yl6y0fmnd3nkfxa4n1h4tef2wcgxaelu2bkl6fbw1grgpxl5bvtgvnpckvyjv5yu4yme6sntonpeklywhgyhr9f8nzhirsz99i43rricsv6c7l5etk9ua8l08ouq917nuz6qkmm9lpff9kieuh83zw90064sfxvm0zjfu3zgsqb2',
                parameterName: 'g75lz9pd506zz9mfwthyqc6f712u03ec9y0f7p3km3wh4x7ybjk2at5nkm84bryvk29anxa5ult3s1a1acztys2cakx2dirm1p3tcqrl1sy4kbc2mftbd0sb16fnxldsmx9jtetgbbheyoy23d1n28xln39f7tteakffhl80fms0tlfynzmq6e069tcydn5bw5f7n2xacndoaletf1mif5v949f8o71rs0pz37pyge2wmw2h31v242h0czadzqdwj8n56sjeu3slc4g0esla31ns2utfkdq3brvibd31791cyn2zyq4v2d3oneh4uhtq',
                parameterValue: '8gwlt6j0byr8jzri9si9h9fyvtkmkqfr14j4px6j5rdu5reuqym086rvv4748to2v662rz37tqzitvmk02mt0m3o673c0xwrapwhs2saeo130p9fdh8tomee90zjrfgzgknh83v04s97twkwl59mz3uxex64v2q39p909a5fewqsevagjfqbk8cpckts4g1rhsp2xivhtjyid3v3zn9t4f2pvrl3dvjj0wp9oterd8vkk9qywrbqc0mj061db5vzb98agfk0h3657w9afas9k6ch2sx4kj8l8hec0tewvdks1oq6699yyfxv8yednf90jj8uln72kjgcxo49g9vh4dqoqikoj53s20ixezgm0hsb2y39e2nr6bgk9b6wep3tp6ppbip037xpcnpfm0m9pelnsg4jivhxbgecpk8rkmd11frlszt66hq91obu5t17cqc5oiv2mhfny3fynz48z9bwp7cento3iixxb4yx29whovbpq070k19fnhc0baq8mkzir2eu9ihpoomlcbktxvkikv94iyoql20zs9pmdcrru9dtykopu6x6hxzydo427ss4ugg0cuhab45ccxnqv8nxbbtawqiaynlcv2zhw9s4xtgj2ifur8g874zx1mr8mt8jhby3ogme6gfp4t03m3ddoe6mcm8g5357cdpixcb6fq9pi1cqhkpdu4pkcvenxk8mj0h1lfa8b72vwx75bcsbb8j8k6nqsjdrsm8118t7aqaowjppxfc1i97cdoz813jmy8u14d2vg6ru9h9do4m4cbwh7nnm9pxck0dya8llihweir49b2ll2q7fji0mj8gwtlz8xvf22baceomsxo12n8gstc636ofmdq7p0a2n6kh5o6ocv9olh34krdgppzkblh9vmhzyuqyifmbkjmsphe0hwo8dcsu4tnhtdjvy6hob76fjhzj4g440e7txxdj2apbg71p04hdgq44pzew5nm7v4pd4608pdgotv4zxwm85bhyivkj2v18cimos',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '6rsebm5ktqx3m4qbyug3f7mgoxzjsq1ii5uwhz8k6ldhnlvrb5',
                
                systemName: 'j7cu8lnaoh426nnyi6yn',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'brkgy70r545r5swb4cajndkrkqvuo3xokbbjhrg7w14v5efj64odpuk1siz65nb2je44qoqngzerxk2ijmw18coxx0zpdm00hsu1sfq6qq4enjswwkldb642dpq91b9y4k51mnfwx8xj6u2pnlf1uuggnhnrfhls',
                channelComponent: 'n6qnu8ji2js09jvsqboonkp80awc7xzv85iur35qo2aco8plev6g06l81jfwmgi2twgtreafm398hsaq2yzspvcr0a4dxvt8z9cev0yw7wo5qfomb4uayec6eqffwcqglchy4xzpqrguk4owtdrswtd8w1wkq4sf',
                channelName: 'frg2v1o3gn3g264ox9whya1378ihq4pwk6rwyedo7bmo8bek4lqy14nxmsivthr6yrj7semsvko7aqe0y8ltw370mxr3w89uj4gce5lirb2fx5y4gsmqexugpad4f6s1v4byaoifwsrtkpajqr36dt8rh2zb6dyy',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: '1oi66f9a5lizc524uj00donnm2eshc2ryksq5omkj3qyiyh3no36v7bztag4ylyp4lca93kjsvcqbap2rv11mkbzsm4afmtmeq54hg67xcmdlrf4rw40m4emcxctzph0f77b6sx072753760t1tirrcz5u6srqkf',
                flowComponent: 't0dj2ndsfeqr5dct82lxyrx7hohs9h25v4pxxftxzqws3h10spdtho3u2niix3qjduss5omb7t2seiazj7372z3gwpqzvciyojy6hfcj2iv7i0wcak2b8syrvjb0flfpxmbkdcxdgainkbnt5wf95ajo1dlbcyxd',
                flowInterfaceName: 'wfulyxa42ym6lyrs5wa62t0foz7p5iaw5mkyvu9k56f3lb14x1xvrqcjpt3ska2ryrkuvz2hmwtamb2bl72p6ik823sqku39k9rmy6urvcmlbto13kiunpahyedda8tbk3jzw5ddjf95la1t0cg2enhfr6rbh7no',
                flowInterfaceNamespace: 'xhj1jvharxmx5smp50lez5bctfkbl3mc89c6hezuhmy3glyilqewtedzkgxlvio2j9z2w1eew11elhi4rh3bbfjnsyu6tnkcd8oxheajqtv5v9m84dysmzl8fk4vt7o948r4iw4270qtjx0cjdi9htb3u2vve4lk',
                version: '31r5tgod1ytse1ks0gbu',
                parameterGroup: 'kljobhz7g3stdaqjg6qzotyacg7xjxwqwcxix69x301v92jdfdswqiu07h52grxy2ej33wucsd0043swj1tk5j10q28p5f2dfdt6oiavipuvoxyg9mxj7owmkerz4s3nni9ir28vik3g9vxylreaqqmeg5cqw74838t67pde66w8r1m7n01loljnzwr1f1lytex7ou29wrz5e4tghn7fdnesnyvhj191uqe72u64r3vdws5za80gxa4nqsiinvk',
                name: '21hfj158a91wunux5t7lg59qrh132q4mq2cfu2qbcijzzasl39a025t7kp8l81etn5s3k0evkgh09rwlmcvwtjfb9u6yyxvyv0ej2yo10lc1rc8lmtkrn6ac8qdav8wsuhuj5ug8n04x37zc1zbq6kt4idx2pbbtrp8hev4acj7hdew8nch9hzmi9i02nxkd8clwjaumdszhs8mmzx7184lm8mz0xur3mjavg31mjo6z9u60oee0ozbfzm0dz9bca3gielfiydzrpby7fmzjgtfp0wgmi8twj0z523yx6vju4w7k62m5dt5zxwt39176',
                parameterName: 'dbzy00s6ru4989unoa4g2zsef6m60sbw6uxg7378209q1fugrapmpfqhzkxuspiu4b2msa1cygd10ofdvaonz1hdhv8hrg93xqhf6a7vfp024gojt1o65gzpoc1ule5jknw5dzvr3a0vc3nis6s43v7afsq7l16eu2udm7ueg3arm0jtn7ay5fsaes3aii0vxw877kf6n4qvr2qnw6s6kwod8inwhbj64xxnga3kzr0chvg4oyhiqa6wzu8lcbcwnra5vyo75aqfyrq15ygxbolvp5dvr5qvk93rz0is9unbvaxtzwfbuy0k09oc0wnj',
                parameterValue: 'ne429eh53jctpl3s3vgocv104fo1vedzsh0fodcyfimwx7yz12l9jjydopx6x9wsz8kpp4h7fxzbi52thafktd7qtr2oefkg7uwjmrpwm3qf1c1ywwnhxv5k1cewasi6xf85fp821xq98zfd7lv2gcr3vrqpkhl9y0fdpsu8o75hr51n2dbk29o62pwaj4uctvqddcgja1wp5xjn5wzgxdn5btt683aun6299uz1dm3429gsyf1yvsx6kjoxvyylp1pnl6c6bo9d9fgji8kp02yonwyg33tnrqj8vq4kl6ahqnmjmp8quzkhu4t9cjpi1qic46678e39642ck5nvzi82mfjb1pewd7gd5zqlufyqfwwsxo1px2382opgexdp79b91lfiwukam5rfeuq66c2z20zffobdqvay9xezw4omts6277i27wy223rqkomectorxtoxkr3qe5t8e4nwgpmxpkaqp033d7khnrps2xf5pksi1b2fekme6vo4xhnl0893gz8nh92s78smrz18p56ifk0t1bqx1wsj28i99os8h1esw06mwqodvyg1y88oaf1tcrponpapw6ezn36gbyjov1hxnfgh8a38u4sje3rtva00d2efbrdx4gob9bvdo4bxsae10ug06jju1etnbceugrdxesoyxwc0570jgw1gfpx2tzxm9jvc3t3noxgoq4w4mozvn38emuy20xjkgsal78gu9le8f1w6xfedg1x3yn165ux59f7ekuv6s9g1p3qy9smbee2rjeq8jyk4iw9cqh979k5yxgaddfvcdlhel4kicbzfhcyugvajno1wg6wq6cf5mgp984drm3pj2jg4ffxzjke9oem85ajsiamifdzgh6jqgf8qvqsmxqrrful40yebqfb46dwtq0ph72w7lt5avpt285555xpaig0nphepilrgzrnvq72e74tl6o6e479mz8nk8c8o9sxzcbdk0mmyp0983vw88pzille83i1g69pzaex7h4c4o89u',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '8z6ub7fc5crjc728pa0svcn3xv6nh33lcokuv9sat763rqj6f0',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: null,
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'xfuzb8fajqkgqc0vi492fksn3y21ld4sg9r7zo6ggbyhqt9fkg0yko5dxpqkh2emy5jt1ghmq0l2ghmj5gqv6ubdoqvfufmprk85heel19g7oylfk7uy4oqm930relwi6vdnnqiiyfjn79tyc88xjcckxvjmp633',
                channelComponent: '7juds0nu8qt08txqac0z4qi8s3bil7q6czzv69ygcbmv9m4j6m9kdrmfq2ik6oj52617r5stoqdzonlvxncdysdtgufkc8r36ssho80voyb7gcxybk6sbkexekv9g43094yst96wmk45ykv378sxmu2ag0s1ct44',
                channelName: '3cqu29e9vgxhsj9gwkfmgtnfj7ido6hn2rcf9xq84hyemgofhepjty7kbnofq1nzuqe6m75xpofebf3m33igyv5bfehy46u56nr64qtzq8kk407d22ykj9rimf77gnht02q9n1410nxdiyry2b63mptd14dg8fy8',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'yikagh2ioemvcp8u5ln8blplz2j3umtljd8iyg7i9a0whfbgbo2ehy9znwaygr8rf4udvnkwdkeulwq959yfrwuystlke6bqirwlvwgs1ig334lj7dgab9g9qozx2dnxila8mj0ztfa14okmljlfhqakfmvq4q5d',
                flowComponent: 'ulc9e6a4o65mlpys3bf88sy3i4l0zuxzp69kmni2qya3wzifm7su2f0djjc40zqdfarwowkci41ls8rwyy26csw570q4nvdtcadvt5sa7kjtddau5qwbqz7eppsdpjljqpwctcd2rxxjo7cebugj4worhh6q8136',
                flowInterfaceName: '1tbrjky1cgpi6eosyvdavtx8t53r9a2bnni2p3xf5rx1cy8tsiy5wxona3ozor6ouinvfed5865vm3wee56sp2jsy8qnhb3mw4c8og280rteqgw1tuwah92pt6d205o4lq7r1qstwp7wq6ik4tgod2s7b5vf3xmu',
                flowInterfaceNamespace: 'gczzxgfto7cswxqwzeuu94eofd21nq8702sgm936hj6re1az3m3b75ixv8ncxbhrvhz1ilu2djk34g3fxfa1qibyuhx3gau3ed33qwterzeoesa67cmshimix0lttgf0ekxqwlkcw20u83e1xmj5lcjvtqudheog',
                version: '3748jo6ltkeh5lu5qhm8',
                parameterGroup: '17akl5bau14ohgsccdllqwhzfjvomjhw26kfvmidyn4ddfy0kcxbcjudldghkmnk12gxtonh0v3tmcftboerxwxf3xbn1araljrtrtqrkvau3tatvhmhukzml1lj27z2k9x80kywi3c0gw22rljdh13a30znugmys40ct0f9fm61p11rlqzjmtflk68f0kqz5usr9xjv9hej2ftu19q6joqej6svuhpfq6idq96ql8jo5lx960fs07ffoby35vr',
                name: 'p1gcv8fg8hw5vtehif7w6xh192kqw8aovrrfz8ze83ol85d62o5wbqe5hgcyjddnswnltwop0g0mn3kw09k260m4x0y9cabbiuboy8wcw19iavq4u3g9irw6z2mnwv3vkqqxhlf9tnwfbbi13zlebyee78rm076ljxbfiojkzke5wismr883ll1dr93zmf9pasaeslt6j223oh77cx29vs8an2fhu3cmrei6da8li77u92ilmjhz6fmr8mnmgwdqg2lk0nosbwfseropuca054ilg4w68pb6ga0ok8zsapybzybm8w89g8g60aq9wahv',
                parameterName: '451iarkv2xuzyurrk3ux0srbeqzfbmckfp2u200i07amvjism31dym39cijmrelqh6qvx5bzikn9sxbenqkz2jr25x9pp24oeradza04pwbrr6pdi0hh8mc2bi7j7sueai3tf22v1zr9h85huujctnwfb6mc5g2byci8hk9u09bvxpdd5pt69m48dk8nhthrzu251vc300z3gtf68obqnmdkalj6u9miir7w3hzgj4rhopq45tsndfn262kqzymg7bmbjlf36up5i8r13tu9nh0uf9y2c8suum3hzuodw1cmssv4q9zmj4stmgdlhfb8',
                parameterValue: 'hbsn6u6ehduecgqz79esacmi519mdsjq71ov9kfc0lq5gvxe2rchtv1ehbxqgvnz6sg0fp1ijhe7hg6hlxclmvv5jefrkwh5otx4lvvkeviymyibm5nvuw9mimeb52t48m4c3rrv49aoxul8wf1u7f0vse7ui78txm4dyqxttgr3cjibtq6rzxq93los1ce7bzca68xxx5dku3vp2m0xmd0p90a2i2vwcpf6uiktqgjrk49t9bpsty21lvej7vmkhk6e93ahemmhqziyoewer3lpt29k0d3a0lonhkd4dfstqyjv9okihizntde9dpoaumr5humfostc62k4uu43nt0275czrdxwgzckxzetncr3wee92oiu48w01t5sqcn4n29pn4z9yxel1l4v7rkmmq6d4zhn77s9vt2ty3s1c12zgorno4pn9q4zsu15q86y8xiui7nwxo7vsrois0tazmu970vb08346s7dt150hrzs19usp4if5tbe5h0cedn6gpmb68mwqccpd8jecgs3cjiuaj78136kx8icjqodd82brse0c33eifvab906i1lrmlh3u885xw2icgh8iiisddm5xrjzu8ukk0ti3cerdpz8y1m7dv0se34yncpy2ku5b7zjhqbnch3m0z6n49nd7f7o5q9xr0yu1tsmbj6gpbdw9e59qkl2vurm0wfrhl2r4cq08ul50xagr3zva2qwde869p31mrii52jooey6un89c5p5nxexp4pdj96rthbinxzcumusbr4l3wvbdljjgwfdqea1e8tstcga06lu5fhfaqvh0c006povxbofwtlasorzsst1sclpzz8uhczmrg4v77c0ihsktinlmt2h6a5d4kjcj3rz52ijycp4wnsndyiekh157k41w0cezbaeg38hbeqahurphd5szbwuombhv7xnfunhiz8cc7uqpcs6mf91qwqrxpln44ebktnka4zxrvhvecnkira9kfk2a3a38tsilcy6z66buvqdf79q',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'oxsth59x0z04lr8py4ljbs7e0kh49y3k3wrnrchs5qhd27gji0',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'rbu606kznvsrboojgrhefi55nyzbtomts1y4fkgdxrh715giboezxcxh3k24vigt0cqu4wa04n84ul1iczmthxdn8m3csq8g5vrah19l7i8c92orxa1oh2fnatvgyrslvlc3537rptk7zo0ol4pizdvnu41n6a2m',
                channelComponent: '0ai06awvxhebimscbownk89ln27529ir60ru1laca3ii43yil1jm1lc0m2dqhhajs90hkpnzd7g65p8nshum83p72iod31bwy1ix3jdwtoky7zj70iplvplwqk0p1zuh9t91ndgxtc8adqahmj3q8t4v3i8gh11v',
                channelName: 'xl055ukxop9z8aba7vs5bdy5qwalipvfmzy2rkdr45p6q376dr4zvohq18ojzw2uumtibmlbp78lz4ml3xod5rox2mx9t9al84uwh1ialn2krx4tqf9bp7b624es5nqemhtbgmov96y245tbs9zep6yk4ifctzeq',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'vmgoq0ac84if3coaea1dtg8qahr2a3we0s388oegk0xo25a36knnekyeszc863uhpkzlw5ox1cg3vyfwc6vu5nd0mxalzkcnf0y3cuy83ut22iooev8qsh9tg7x8g1bvl032gqiji30mo29na1mb48jk03pqjlib',
                flowComponent: 'x20i66djlqtoi2jqn8wfcut6rvzdnwwh3s96wm1f46cpgi3m4erh2rxlg9hfopvq5w18zwlqvy7w9car8pph6jnd2km5gbpue40jud8zy62zc1nrnt5z4azgkayr6231t08neupt2wn2nkkqk6rllqqfdgr74x6f',
                flowInterfaceName: '6xfg9psauh5njeiuj6t8da4pyaz0dnzcvnu9w394ww2shspxir4ms6vrcwuawcik9r0cwqd959xgxfvfc5e02502r0khwniipni0zonr3rvhtn6ktlk7pec667mjcw6tah4999r1h71uq6pnnnntnsn9sebh4old',
                flowInterfaceNamespace: 'e2erptjn78e8aucl5ybszvq249cvt2bsckyc755itjd6udo0blouhoqem9bd0les8zwzhhvns9yfoshpzxod0t1rld3i1nw7v2vczuty6ts258ngqtizf9oowhhnndyy54pja7g88tvmdjck9qmypehtoanxzk5n',
                version: 'qsmfzgwwzni9qp5w4tmj',
                parameterGroup: 'oamknycq0kyl9j3yihghf9bf8r6shbqrulsb732ig3zoiqnyj322vyxhimbaqmsfkdbcy7am9e24unq6zagpq1odeocgx2ge0px22b0s3ufefr6t17ylxhmybh0ii4d1ducmi3bgj2bmtll1uejg5uy9w36rrcrt5n8pcfoducbrog88w3ogtu0w4o3d49sjba3dgecxxdkux5nq52qsg1mm3g57v197wgjshh3pomv78pkmk9ertwouw4vwqiy',
                name: 'r5xp7j5dsj2p28d4n1zl29k9vdokiwdl9jxrjh1bvh7f8rvxy5gf19bnm0cd1fx0acjhgzib8wgsagtytybnp65ad6pgckm9ugb8bjbz434qifa02o3ucudv7l3ft578815jphbetycpaxwukgrr52wtxxbudasauc55qzgtsffirkt8sjz2q3d5mbdbnhqlrp3zs8e2m13ov8qrefxsvv40r37xaix9tndhhjst65rv6md6isu98wlj13r8sysqxqw44kocqv5bs9wcml0czsqihz6vv813uidfat270huksc02p8k7ac9ei1o7t4kf',
                parameterName: '16788ayf342azwskn35i591ldcjrnxn7pm9tfjak45zhc7lbq5qss9inzwjtgoeb1yd9d9ykta817y26wyuijvnaoigripbai8tyfphfkkm28gvcco4ywuesopn4nathphruiw25ipq8b2fafd7gak74qjx00rxsq9hsc8qgtfvshbhzkeopy9yigl3xi8zz8hof0jw5q6iwggctls258el9402vd5bcxi5n4163d3eu007ow37cxxdi8qf0x0oche6c52o5et85644sck4eb0xrfb7fuwdl0k2tq3vjf607f0booyr1xbtpjyvhwrff',
                parameterValue: 'xy6hz81jbtktr7ka713g7y2r4kab9v2fxfvfvpkh5swmg1rjipzwouxvkkrfrfhsxsqwejgr16u3w3o7hqlc84kbjqqe6opjynefic5bu90a2qwptk77bm2j6c5ykxhk4cilamu80lydqmmy1u59bxqzyl3z1dkup3sr5xvqhs64wv6q7vu3qz0g0hzstuanstjpaz04y3gqo2o5k85gec2j67rgdma2czyijrzixfx8op1jjeemc0jeupi6gz2zrjufs0cmqip65ercmrgz11fayuh0mqguagrtfexxqnptxmjz47zwp1yd8axuerk6i5lfwapjiue0zqo6rdss091vgtyydxskz5tedgbz0c7c7shkhk09ovtb556bkyprd2b0dx2im7ndnme94id6g53dieao3oynxfp5qipx9j0mmycjjhpa6dlw55y4cw6ospoy2h2tkzov6v35q78mihdieeq9d3wiyj3zt3shytz3kplrif4o7tn8iqqt1n5w2udqwep98wcq2ls5uvq7yjw9o6byg149hkl0mtf5nezlzxmqczhwudx2o3i9zv3cuvf83575m627c2vkr5fp4wiydall5exd0k1zy0gs7iq50fwktg9ow5w9hgcn0dzmh1wenttgxrod7191wqnbexsgznfqbx8jpsa1pbqt75k9r12dkoid2z7e1pgh2fo8lb01fkejcbeyl1ka4psqy2fmdoitv2uviimxkwdxzwgk68ba37m5u3txkb3ykqe2pcimfjtr2snxefbtkyexvu97t1ty1cefxiamtwkiikoduokoso6ximmc35fmtdi16i12ywe1l974tmv60wkwsgfwxxag4ug1l0oifcskskg6o1h2t1uqkhiff73m1bhpnqlu4w7snfps6njkvrcyt36h5yzzr4ymw8a2jy8l0g6fgnrpoaysgpfx0nd85200jqmq1b4uvrzfocx8l0ihpn70m9c2nh87hzyem9agt6364bky8xtuc6efdovtg9vv',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '8fi6x9j9ul0krbpgh7mrd9h3tsiqoxg2hpnmjl35ad11fd0n81',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'fralacche5umzinvbqhm',
                channelId: null,
                channelParty: 'nszbpebypu89d6iyce3acjcxktvytwldvi8pbofvzrjs645z86l1ahryjvsd0ofkodbmwededzy5taks4okp9995uqenwo6s8thozjvnmgps1bi9ty5pphxlbz9fpvan00af7k5fiupz8opa237plwoc9dd0agzi',
                channelComponent: '7f7y5gi4vpnu09d5385vxad9ynngfjm89evzff3u72m189ufpk3pjxk59nxrqqeeqtv79houcrbzy8o2vtv6y8yu1glh8a4t2387ypyq00mtd78l0y69crxkjoei000z5b06v6exgeifqyeahuidh65tbjh5tyt2',
                channelName: '1qld9s6j6rzie5lil336klhqzwevthpcaci1neq7rk80z9sns7cxktyn5pxdl873eqtbrelxiq93f5ff776ifyj5mtukgo22dr5m4q6g7cnnylvbr0p51vxbxsuymwkpyrt1gpu2g0036bls0us2ui8v6kgvkrw4',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'qydjmezwk042zud7t8dwfa5lc4ki5q41ss79d5ktcv0fakxrkff82ikpiza93lb5rlez9ztz1toi254yeowpl71d9uv8km50rzdtq61uu6hwbbpebjui5yfv0kz7mpued7b9fmmtjtkh3jj0zmxkadpyivi04dj5',
                flowComponent: 'qswvjmj2h0qtnz8q32x660096yv3agsbxg2ubo9ge4wc8plqejhi69qjeslcggyvhs86zigq8gkt5d0yaor1lqpyr3b0rl3lpmk9mnxumop3rhhaxgq889sttdev9olypgbq2m8xq53uirqoojvkix4s63f5huas',
                flowInterfaceName: 'n6bk1gmfjmwgamzzxk3x41pf9e74xgv542fiad7vawguxp9onkobb63zfootohmy5czyeisoh9koxv9fgobtu5hyxj7k58p6076kbv4lobqnt2hr6dg8r2dbniwx41iv99k1rinobm7mjt29yb6c1ivju8lkdhia',
                flowInterfaceNamespace: 'uyrcl17ivmbx838zm3o5wzrkwywxfwesjhdg07wnerrahryr1a2rgql4rcca4f7qskmd61l87t4xab814v44gh38mjk4soit2zo0266678tbt4jq03zbep0jl4tuhb77ugj3pk4w9mufor3y2t3xkb6x5vzwy565',
                version: 'w3whizwozlponurzbvon',
                parameterGroup: 'b3pjdz9chxkvhqj9r68n28myn50w6qkfx9t6j31fmydre5kdyer95idtq7ewydbq3ev44nvo3fr68ck5jeb00ki67hj41e1x4touiasg88dt4wyxh4gemq9idwwwtjyy7kxd0yexnrzsnh0nu2qqttuhs0oaccfcx3onngda1nolhgztykuwerpr0wqmfkkheu528mene5l6zigeoza2q109rlod27m4afq2cgsbwcwf9ivsdxlrx44aivg9abc',
                name: 'w6u47jbq87dgftoc56xwrklass4w9tedle0ved76rau76r3e6pfpw9slqb1ktmldebpaj5mngj0yptmbc611oyy6cnr3rt9biwu36qhxn5grbhwi70c3awjeppgxnvlwepmacvvwhy7wdhas73p00v4v1bdk8wakq5pim1x6bhb30mopi6v7qwbnwfm0eqiejadqri0nj64sj6vv8pn3ngqjhujj9pf1kxpo5yleg2davn68y06vxrrp2c8q9ieyh10tmyrxd1r89t049mkagr8jm0bm0ymrz1xtlat9xsxfid9hpmgafd6ni0r5i172',
                parameterName: 'iu69lfsypuuhra6td04qhuv8exx2a6s3qok9dvdau68plepemt7n5sjqt7420jkdxo8gb49zci30yuo4ahcyhqjvx2nwdb0ounjcqc7brrcq1x5z06n9jzdt431cfbz7jdvg310jgdbjbb0myt7zy70mg4whh9vst64w19xu9qavhacjb4h10g6d2reb3cp90kihv792plhxcpdxvo6bc5u1dskitzzbrx9ckmmv227ir0edbcprvxpo90c5ahbdfo7nr1clfedjz9zq12av1c96quhzvg3uo4fk2s0frfhm1jdrehguv4g3olpu523o',
                parameterValue: 'ur76yc5yzpwds9hsvrdojvsrrct7abal2ivxtjnafv0pysa71v1miy4nkxtd7l9xexjs20mv4l28clakqchv1nya0fm4bank29dmuxkwoaten6ttupk1a4t3afaz4r8w34dig792rzko720ih4taziqetqca316936igxqbbh2ag7vupm3fyqnn7wwzzrxfjlmphn9akledt1tqam1spbf0u84cp9h3x6n6c82436yrlzgs4lirgp9kze4q5vx0wzcqsezmryvphbqduw07xppbukpdggrwmid8ead15oic1foqlh2ll5y8dl6apvezh2cxcwof3f0mzzpe1h0i4pucdu2nl2ypr8njeog5378651hw42tb93ngmom2d13wayldgy1xlp24x2uaw1rifzz4hk909d06ic1lak8mc8tpke11yf68q82fmj7qlcme9jw1o9264uy7u2oe5fqa5agz9q2t6x71xni29g8x9gt4aftb0dz318oyjvqo6ycixhqtp3ktwb37tr9s4tfhy95onx26hnljjxntd0qm0awjlrsjt6r2sfxmjw15vpiwnzc3pzmiobz9q12td6aq8atqk0y231uqo66idv9qr4xuxppg89ky26q8mqseqvi30ifum3mqpfzfy1ysvlglrvygw0w6j2ordugltlnr477rxlk27tp637qdtn13f8bffegwrctyg10oylzrkfg0pbh5syyrho4xo9vxu28i3uf8ksu40yeq2ybgb91bmuk5b1pc9k3il6qmyk4qxzsapuy3z9gm4v80sasbkgc4rnb3ir6hnkbebsgjetpoqblncz8cqpcbjkabsm4mb2b7frjf0ce0l6hxggnw9vihh25i8cioq7rh0idcxv583twyhmh40bwtm103r0wx39dlnukptp5izabarmdqdxjck0wfnp8nt1jqtsdmjodz4tc57x8k64h6c7n7vbs5e0px8xb0hs71fblldmslumrzocjooarcbkmv812bevtlle7ou',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'cmqulk1ohykejv72h4ixyjvo0at580u3xye28e3ixw1i302dbp',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'uozxx1td8gyd9wiyye23',
                
                channelParty: 'fo36604yqsgyhpqz5zw07kibslkba5nhl08ssdj79ypn8a1m98zxvw3uqitnbwxb0vdh69603qs0y1w0za17diif2qshuy5qquuo495sfcfry29x0auj0qms6qzxfwreuer7aohy3r1kss9bu5vfn8iwvb1z9z97',
                channelComponent: 'q1imtzdro0w1cpwafc7zu7xf89y8q82le0ooq5w41x37cajt18r4agvyosfsrwbsbb5ekpwn1s5j39338cj6dy4ggv9ogbbiyx349ykhs4lpwropaisslscz0iy3pa5soup6p6lfs0sg0oz27eqsxmqmlwe9dhm4',
                channelName: 'z84w2xtuwb8jdhsgmvkp6wqomzc517x8p3edpcirn13wh3cv785ct21qqbx1ep8pf9yw5c0lkzalj2veu7srhmlz3d7u4jl8lqzvlplnrv0qzt2ua631lq7fcb09c6kl0nnn9mlszpmcetp6muwuclikbbxsodck',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'va9sj5jf0norwig2l2hpcsmamn99dalgxb4t07x0umrx4d23frbbjhejj1ly13iduggg5hhcyr7fwnguxqj8dzqsswa57woqcuwxnji8wrd8f9lli05rnczue9syd2uu75a9sxvd5o2ilfoiaps3yo2dzixehktj',
                flowComponent: 'y8a7rzrcnfumqmvbcj2to7x1atbztf7iqdo97zjl35dtlkfcnwnf7xgyzcirpo5ve9hej3cvuvwc4dneuma1nuk8mt3xyj415fdmmcxca97yges4s9t17wm4v7yqegiqji6a8ybs9jr79ukca2dszx66mza672jy',
                flowInterfaceName: '9qnwddv5wwoxgwo1k0mxvv7cewfb1g8tolylxpr6lk2ag7kmho2hf1e4f2wfib6o93audncdh8d28nlr1ylbu56gxepdhx6fk01jsurymxca8im396plpxmo3jh2isqtb5ja1ak63mfzeq7mqkkvqrzscvgkoxnx',
                flowInterfaceNamespace: 'h5i103b2pdiclmd7nw2z5e1lm2ow8ap1lxxszjbm8qqotthj3856vgtxtr8s6s94evrdotbemgkgazub1ddrommk6dmtt4l7cl407c5e8karsfc6fnq196bafifh4hiir5m7s3rc68jnhvpvxuyij2sxeasy3ksr',
                version: 'w1mpmhsm7gfqhxern9ip',
                parameterGroup: '4df2aacwviy522zjqorbaccqmf4eea9cfdcu08tmf672nr581jg5ljbnxdyznz7zpizuwgthgagkdo7gv1k9hghq3i6xn4eol1lpb8ufd6hrw4ce2l0uwzs7cjjvd9qb4xzzw2ah6gj91tun3h220t0741zta7e7s29t4gmmzj372vd8bxacy0sszoiz0ljkqnhvu4kutmr4vmh7q5w4s13dv2dtm0ve4wq5f4fsp5u7knjk9avs7n25l1kl1ms',
                name: '7ykeow0autg1mv36dc4vk9tf58n2cocru6m817k3s6i4er92al1zcqf6sj6qloxaj3ilwt79ytos2hxx26alg0ow9seai661wx8w76giwq8q3b39lwtmemoutdbi4tp2h9bvdlybftrbraeinnm08hnc6a7v7hdl1dkpdbqsh4043mxsicky5u5isjt3gph83j8mc1pdtoe3rc5zoqwxq1wkp3xfckj3uvougtxwliyclcck9gn4yo5nllmy4bkatncq5naxeyvfzoqqmpw9s1bm69j63zql5yb4yqm1s3yeeibhb242ykib5h2zahca',
                parameterName: 'cio9v3rfbnz085u6f48lnmf2fnv769pt3rp9dk6zbf24rcyni5v4vv4te42nhrdmd21i4qf9dw2pd50o5qcfxn35ul4714p0zyq7qwt6piz43j0160178nmlse6oyxu4kx2pqc9zdz67lxha955599mtqdei8tiy39k3tlj8syk0uw7xp8sho2g2r8d7uymeacob6kap7mr5csk3tp238wlu0lw4elor6yf0aujgciv0sirtxd7ikyik3316g7r7ekhe6mzy2426gq3w5hodlgs4k34n4zy3jtggkjjxsfbhxgz3n3i78gbq9jrks6ac',
                parameterValue: '3ganjfpml10uvntfqp1jueka4gzlpz74wes4rzklwburzj0r0cw2t5zzse1ja3ngbtedqi27v1a4m1jpex5vmqgya9113077el7003452ut2doz1wcjhja92covb8gb76ggb0dckplp00qcnu50zlhoom2fdoeovnebpqbhg7a3s9qfb7p4rmfawlc591qu5aear08deoxqdsmezicrvexusryotolqqqay1hzr9e8bc27enullyefd0xsylqnu0ycnwdq68yx0gljorbopixpdj7lp5wkav5xbhlnnogesiqwbstgoigm1tsrwwwoat0dhbhdtpc43htvf6pp5qexl4t56lg1mvk0z9smbfyszch69lngxc1bnxs23qpjicbqo9iv555dhpqw7158ax0ody9z07zpbxhf10y9ec7mfz39s4yy7tjwqvqbqo44iw8gbh45yufm41tmaxv5czpa27twg3niibb9vq0wfucat7mi7vyfg7ofmxs1euguekbb9g7ezadgly8zbykvli7bgvuyqbv3qurhnlcnrgbcz0bfs8nc54a8p9y4rd8e9svzaqc7sy27ecoih256bddgf7muwmu2twm653d6dstkfvxlftbtvdx4jmva7g4rfscr3vwoc5cxtfzgi68zww86qrlxrq5zyols1p4dw3t83zuqokw1lc0ujdqwpejb5c0fkgajvxxm7q9rxnvt1qt1bs1nm8v0hyq66xegm511qs39ptiav6zy3amm56irwkm2k7m65yodxnm9458wwgb0ux444onmzbvye4pxeryp84reoaspn61m2kzedsqb40ek5ofymv0vov71jbe06wrvoi1lrp5hb64spfr1hk09negdks6gtgbeuqwc7cjckpxbatpqnvhnh3xba5t29lyfpag6l1n38hf1ji8aka1jrtj0keb57nu0z9anv0ww4yryyn0chd8ia1fnbhx0vir2rin2zrq81dmag4ups5l1yv9l39bqnsk3akl9jsb0jo',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '4uj80fgeb3iusavap9o45ijfwkhnioie56fq1rcetu2ar4wjjc',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: '58p0nyp8f90upgq1ps8a',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'bgi0bzbykgieaqk7e1th1zamq1ytwhkdokptttnxj48u1r8tvlq9q5ojqq0lt0t82qvekyz88uipgw3gb60dpvq2e9lijk3xrpqlfkqxp0cw4deol9kzb7mv7e9vunwjtsrq9ddb28k2i7i3w9vaszb5j3ctkpzp',
                channelComponent: null,
                channelName: 'pq93p6a4qlwd3j84edg7wfma19dlsx6y192ebxxd00cx3be0biaj61m5yv6th6d8ezgt2od5gtpbljcnzuk8x9vcjk2gbjcbxebzxu2ryf3vyy3qf2gdsv9pv0t49nlf9213k6w9ie60lk3x0rahf7etdqklzawj',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: '4v0jwosimuxdvjt4zreohwb4mjkilb2vmgucd5u1hg8ogaw0bbvllw297rh6jlz7l3ae772x3fuey735rat8zdas1r6m58402cpkywm45dhjwz9vh1o81509m4xq30ldw534xmtg4djq9nxkxssk7288cs4whmqv',
                flowComponent: '2jbql5y3d6wfd4a1tziakbxs6seblnijsm0qhvxdeqqnyfeb8m4qxj529xoi66i6y7yc5z06utohvajbqhsb1gs8dxasvyednrx1fksl3ji1549uwgpe2p417z0i288t5obutzr1o72zxgaljgkbvljh7i3wt7hw',
                flowInterfaceName: 'l29jacnjsbwxz67gqdrtkqko8onoc7aqum5hazu261g6odc2e5a4vjrakemdiyiugj0lm0um71bnfsb3becgv08zfv8mas57kboidgle8mr7z4e8rx8o70fyqnllriyk0anpqz1la2y6buerjetkkplnoimgy3fb',
                flowInterfaceNamespace: 'bg5rw3epwcal0g4th6v464hoqudqwosnh1zm010fwvqo8afodad711152wbmr287nxfw3cgfcw885glysa8s8lqxba0rakkuyswbdd5nbb6r1v15deqktbmd1ugj14odqinnfdpwbr4diwqmjgg1u3sx4y8rt3tt',
                version: 'wkg2uj7cswkp002mp1dl',
                parameterGroup: 'gew5fsd7qksvs4zisq2smd1ogcmxs4xapu24visor68agowthjcme4524z5oh5wwkxiw95mqko7h45di7nlpz2xa1dr9ib11jev7wqc2tfuxjt85srftdhrd48to4nln0nqkgorxem534kgisfx3vsomtecmg5d4cjsb7vtpwj2cjk7x6g3n0fhhgxopp68wcspnk5w5r0z7y1iqshxlraiv5tq2oboz1diiqgegirorcz1auysjmovca3iham2',
                name: '5ku7gpe1q3qth5mec0l4svgh3j618xxfwf2pbompfejtmnh3006nvnnjqr2473sj6s471md5z0x8h6jstds9j33eyej8bxqbd0lb3dmpssp6y21leqpuyt9u6yklo4et5ls8vw7zq553y6oq5u5zktless0fdwyldv7yrx026yufmffma6orrwwaxjj3wifv9ai7hr0d95o8g2ay464p7ddk412l6zmxu5hod8n1beyp0n1dtnmpinai0vubur2059dt72hfjm6uzjdzh3zsrq9zpv5pq0wh8v9qlqv6ns9f5dujbq6xckqv45zfjzz2',
                parameterName: 'vj6t0493eem6wq8qll8w5bb2xmrjdv10t8zf69cg5u1yxyij0qz3r8u4iics7ci352dfr42s2qga0iv3wp5ous6ycuo7x1072xeouqogoviggmscmo1g0jfyoegk5bswwo53y3mwguavswi5849stipr8kld5ceagexpdxn3rdz0d1imlr5d9of8wk0ldlqfyb4rj9txqi16lammcg6sr6m2byzk8mbkpfzzytzxzqj3t8muz6e32nel8jmxj3lct9dcylq641y6uekt3ssofuylyjmidtc2rci80052br00luc8sk8dwiul4mmteao9',
                parameterValue: 'hmzebenql5m09vrnxqcyrzlc48za5jn3yi31lya55pvgi0g4ugf8ce1olv4sn2il8tlmzwtxt8vr4ek1bze35ohx8mwlfgc81a4oyd19sdlap131vbcop2ijh7bhsg6o703otvabjx5z1pxix0o4dxv4q7vf6darjhvy3mg4pa9u4o4izldkuc7vw13uu6io7h849ckwltpjx0this08l5nvphduok5d1657x4vm0ikm6s5r1vlif1du722g671qrizww9pyvdegrq5nzn8pd3sw557ljaq923ibottykbfebpkahjtrg7u5gce90hzk4hf2qwzwzfqxhocxkwmuger4xt5iiciruqd9ynv8due4dh9b5c8uenra2q8zds843q1w34e0womx3krm2sj80e89xlqfdkse4nwjg0mi1ilvnu8saapm933wa46j2nf7nt0cdzitny9gveqtays65wg9g6oqsdqmoffeeh7xjsfsfcsrivzqpe190h6a38zlblaogg3cia36q5o4w6rhpugcr7pyykv0gxn3ryvyppjllxe87xiecfys5a9pe4606hs7adhiy8e9mzoa4f24t4eu7c0wylej75299ssarcpjzy9k5g4rvny27webyr76muadkpydefpck6sc7q3ittir5vuuxavimyv9hy1k2w3ta268unzz64pe8kph6i3d06rhhxuoos3ow6i9hvg4k6033doulr9zbbkcqgfsldz0a3fsehe9f3bes2j72th9grkog0tjae3jhtbgnzsug0u7h33qi7wdmicomo8jmqj3d5b0dejn257eo7b1rppf6b6hws1zznfyobr30jtw9a4rjpe3fb3hryeeh8n35i72mucas132in6w5rdl060zsbrye86prfv8nhc80c2njwgje3rp8j5attgzf7ek864uxdx3i3q216gjob69k2400xt44669v2xn343bxhw93o4z91n1j4eidtjzusyaxcn4888gk2p20cblpslxz8o5',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '9m152eg3powpuiui5t1kmggwzjf83qh1tr311by3cxo0wvbff9',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: '4jhu383pon31leme0g0x',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'g1jvtwhm9i99seywn9puama699mud9fbbgqssgagjhyn1ih5jalzsod17thjx5hdyjkeg8e487i53bp6tx1rko3hf1stflq6okp3xpwrmm90w6xkey3fe0mb4w81yl5w99jxjvbmid6q20nqp0wh2ocbmg0d4h0l',
                
                channelName: 'lglu1kgqk8cew8gs40mw091jfh9jvt6ewkj3fv9558v638m4knoo7ybv01fxpwo2jx5f25p3506g61r8vu84vw4ofai2o4jd84in2r8ct02gog83557wkt59nclp7ej50h2zsazl2sdp0vrm2tho0rk8nqytq4md',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: '8ey69eovdiebrh6gt68ca4zdu6595jy3tt5ac0bktlsbhy3fq2i10k6qx6mtfdn4d8pzsw04id8ji2y50iis1xnpqxs9m7vqxjd3ugn1eqykpulkkwwx0dypjosqf1yyf02v8ijij51u1bsv933b1x6wj2cg5i9b',
                flowComponent: 'aqw41ff8pyfbuomgw69wihv5ugy1u5hmkxobayrqf8ri79x5tnsy3o3l6icufhjk1j9c4idcmoxrq0mo1rdltut65wrb72xktnjr17l2nljmmx0cce4bafgc31lu9bzkr93ggpxuk0p698vna7thne5oj39twqdi',
                flowInterfaceName: 'e4cgr2opppma7cxrieisbsey8cyu0l6nj86qwh83e7414fm7rrn0l7l3650thcbxtajxvde9rktw63n9blkcbtg7wvb5f9y3nshvxbquivkr1vxyvficcxlt0ke779das498nkn1r55wq2ihkg89hu5vryozzm85',
                flowInterfaceNamespace: '98plk1etq5ywy9peoqda7wgi1qgqidg16asqpw16kn3zvv06tvzdxzb4x26bphp7bxs9in5so117nep5h9su5rg7yuagggokdy229oa64uks1supggp9frbml88yl6367bsu674ikspicahlbwf5rdfsw0uj7ijq',
                version: '0z1z87i4dvofk9jgl2g7',
                parameterGroup: 'i9hfzymbly800vfl8dacleol5n54ptpe8f4s2xy6xp0253yk7e8e7qinrv2hkrmxd3zwdluncydicq4ir8bv2acmayqqin80fxdepctg2q8yvbq5ecbn1niy2cdo56fyzobzs397g5c8qrc3vzejrdba77w24k6fam5gzpec49kaaz8r4zopsot186ut4yngh6qgkivwwfqii2tym2f3w4gmehyeytpj6wlxei8g2cboubumyt73z1dyx3wjnin',
                name: 'e75vf243vlbatiuf5nr3x3sfvqysi506gsoqfi6i7obmz3lz5m20koxixx9cuboj1hc1anj4kmmf3u7dwcr5zn87lkz3fh35dduomqvalz1i724c3v92h5n0rmqwnjy6e3mqd82hhz8cjdethvq0d5rvf7efdxjxg162uo6zdel0zvhyeblbnb8w2ki6smf1xa77jzzfd967i7pqhe2sgys8t7wjn5r8s7utgr9n3f9kaqv7pgozcqh5erevi9v382mzt4lcfeyy5tmt4pbh9o1s0w9a34e375shz31rkh8ya6wxvu9k4aoc6z8f0eao',
                parameterName: '1ji28o68phk27bppw0rf80roisdx15ocf38te9cxzj8mxi0opfssne2htug7vbjq66vyh6dopzlfuvuxyu15z7u0ummnlnrdrrdl3tsygzqk74lqo8ras3zhyw0yujxbkakj0ubrak3xv0kjr4ke57jvipon15vlyrb1vo97qrgyr1xpg68x608mzs6stwvzabseyzgm1697ix1mjjffnwhs5huerdvqvc7bvmyd786tbt78qs3upfny90vlsdqbqt6jqtn3ri1mihyjcs1cv8s4t3s7n4j24z0ax54w9lmtsyvilaextqq6j32fyzxe',
                parameterValue: '1mk0syrhhpmxy3y47686d9xl0ed9ubyru1z957ll3g2flauyy9syz12qduxhu4b00snknmpshe91bdf5kelw1ue2stw2jq8odkq3yqf7gwxy116lx59ecysbb3108n43ewoyxa37vbh769wcwcwkuv2ii07roaftogco08v6kekmmu04elqr6fp76e8lnwuogeiyo46dmxjyskji6udwomvt4ad2w2ixhrd0o1ao4qpwqz5l9fmbj7pmmuqhyald3qj0rxtp8m9rs48hzedwc6hvxgj3pqivyskphfjd0lpsff120t84ch8a4pt2trf1qr6qhufjptgojmsxk4gexnouyc5f86phjwy754xyo9hsduulzra739s2s6ybq6ufwn1n6hmz1t4wgufcbcv3ilkkwk3x0rq4rw1t2d7bjxa0gheomgfz55un505thfep52imwrldglwvm9j1tgy5cm7jieflnehd9jw3ntvobxe9fjwg98tm9obka3ng3vkw3twf2jb6juq352oz4xwxo3alzce1r8q2rbej9e4we0dlkiqlirvd95vsvihpux2jbx54sspnum93i55ppfz3img6ist78aarvhlpkr2p3ua8mfrhzgq315wz8214uou60qu6s73mb3on2eklip8zf5wqefh66l8x3dx6bjz3im4drmd2l1y8bw0gcdaln898w6ozgiprj6zlsg0ms0kfaeemqe9murqlj7t98w9slstnvs13x9a502r8ueqv7crn1i2mhax1hrj0047jbw4rcu6i2ad2sm5nx2mvyq6lzuzh5flskuymgimoupsvyml0b35krfitjqwrz136rxrxhs5yuoc0sfyisgqxlkbtgfdx5q85vafhydwugwmf3oc5r9jxqv315vq1ghy6cid7u6ruky03v77vbtjf7tmkh74g6bt6n2291iyf1sehgsrobqeb3h8tswor6aqgk9s7b5fdj6rzoimt8tikr8n2u4efuaw715amwweqrxtw1d2b',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'k6zydyufax4nwskgdgvt75hqojj43ij8vkav0ygfapm8lnod7b',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'jkqfgcnizzjyz11j73oo',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'nx4u194lxr5v2a0xl6qjwsx20qaqk1iss4w5nolwmq3v2l6208kxjgjfvdt4mbpmfomd7gfyvc4sczejvq6cin695q3f20j7m0bqxnf1s3kogd4v7ro8qjxauj7qgffone0trs92lrmmjkds03d98ohgwrbw1t9v',
                channelComponent: '8f0j9dgg3v0b17nurv6kv2i3owbe23eit2xif2lw9kmc2syjpksys6gxa9wk86bsthxwolkw1amnydym44ayjiz1qiix2be73xk2jelbq9ao1slinuh5091jwcpmhm73agh3m3mk7abqpi9f0ddss5mlid887jkw',
                channelName: null,
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'pwkss5nlyeo29nt4d0wggfk0cc0lwzzxh53o3ytcxer9zrf9nbjkga4t1kj3nrpqd9k5qvffzk5pa7fti6oe9fx626u5dqvxbnlsffngm1tbvqpnmqsqhhhv84mmyvmfrvr5amym2byeodme8nk9l1p1otqckpcz',
                flowComponent: 'vj6yeha58q2n4oc6kvca1bgdm22j2w9olf5mi93pl22llv3wscn9lt9flhpfd8vbplapqo4wvprnr4r334plbl6h8cwhp3bd32e38koll8teji26a5fw57aavlzw6ci26uewixtxs0i2ro1ui9emd157nkgme4em',
                flowInterfaceName: '4847e8shamgw38gxa3mj2nk4mnqtrbb3603w5cwqyui5qprcak9j7u50naaifezgwewq6tf12isbvfl2y9pd4zwixxa8pavo4f7tu4qi8x7gnadbe37xl6768wrzdnfj9cdbrq4wt1ek6dxzbgjmcslijfcw2bqg',
                flowInterfaceNamespace: 'gwclg76pi1t2dto9wd0elj1jnuepr304vuullzv13tvq2tbm0aflhp4tor8lwf0c3gvip256suml4wanqg450g9zu8eynp2z0fk6370jh2f0ia40gkq7gfn1mu6h88fgyzod7e5zh1d6hclz7bgoi7vei5ws10nl',
                version: 'o2klam4fuhmoidp39tti',
                parameterGroup: 'rlb9hm2zdasgp8w82oiqhvyvh1x59iq4ou2yav7h7ttydwc6ben0kplrgahvqqaypunpv8voz995b99cta19sb08r7xw8sqlqq1aaqci8dg6ecplaa6a7wrnno97lq7h0hxwnwcfeqgq7y6zn3f79vy1ys57cimpnfe5g67ucz2ok3qmmmotc1eb7j97pd5v1tmcv7bydthjjauwb49whao2awwtvjlmn25sqghvkhnwyiuz4f64owzj231gmuk',
                name: 'r6ybkr4n88zntjoouimef3q3dd3ge3i7ernr52r9qmvnsbucx0puuk2j95653jna9sf2okslasfeku369vacl5ehozweqhbgn236ahup719crdxanjz7vixbm693d7fq2upfgwnfom4o8coqaboz6koe3yrlg8ketdi5dcx38gbvsgege4l0ipyzobrpituyrkakdg96d82oupy4tjqwigcidegs22uz9850y7gnvypgnrfr2wecy0xtyvs9ttevy2at7f8e97b8jboa9r80ttg8kdyc9q403fsdt3wgsgtt94045kjotf5b1cgyd3mc',
                parameterName: 'hvve91qjgjmu7tzdel3z2st4xltz23669swii05zvsg1ii0c7u882me4dxv3gsfla4oif5hcx0gzdwjhnx5x8gtaw61a9qc2xj1w5qohhup3rzxz62646nuplssl7pmxf4lfk654ekzfbh69tunlw01dvs4l0ilrmfobk4hl6sv1lulyn2yfe3i8ja22y4f1x0tdf259n5elger2o290a32fk27mdw4w5cvdrg3rtdzhosey8pju9z1lk12kfbgjl3nqq4elzb0mmabs65juipxrujpwcs1bww52vxsyiw2oqyo2fnd7g1l87wb8vglc',
                parameterValue: 'p0ewwz8ceyx1r5ncsufnfddubzhbh6l6ka2va8770gu5aq3sj4n46zwmd583fqq5nwb9v4flhfzpt766uwwlenmzv0nr5hrmvgc4puoiv08k96jmzt7uausc5lk4yabrtwjzm2ug3qzgvrz8ilabfxcx1lxya255doknxvuxpjiy5ps43fwnyallno9pvkitl8j06o26y9v4ebnglv4lbsc2ct81wb86r0c3u8mc16xoe0l4bkzc8gksjsj52v7hbkbw5cbl41okoweka8qs5yavcx1ydtir3dyeusdm30khoadclb8n7jfksyxi84jcn4x5wdtxtlwxq4352f8embkogk3xlzvhbg92g9ebt7q6pa1gs04qwkolcjc1dowd5go4b1bl6mco3l1rtj9ps9abi6digdy4760a5h06xjpn4x7el58ponhv2ohnvk656r1kwfccm52le74oqx795o190zjrtvivdo2wz8ovvpl3j2m6vmhjxi531tkk65zy6mye5h34njt55i74t587ix4ews0qvwa7bafwn0u0kszyky5tfvlt0us821bmvlqwqjdbq9k5dzuef48cf67devmcmyt09tl9bvykojvbxqvsgx2nhgjd781bj3qev4ilr3fca77ca0a915ubm6j485qqv0jcefq4jvrxgx1115juv6iu9adwam6kfu3cimaazwk1qv5yt8d2ahn37s21mfw0kf2u4zqzv0cvz16vjmy4s1ycw4wkeowdyydfermt86rdtcgqwtlva6qvotkp8ljqbg9d0s3zr5jb5nvxtp5huxbelwzezml6ku5i1fhu2wvp0c3xjalg8zyi7jcnjk87l1udh3fp9lxconuatil1kcmjlop4fvvin6mdd9592yjcf2m7quqawykirfkqshrlostsxjigleurapnyzq18dwbx1j6lzb1fptinwxmjhcm1396rgjzfmz40y30tbk8le1a3h8s0ekz3s0om7o5lh8mcqrxeq5new5zo9ojo',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '8z3wd5y2zjrm9y6rzp6cfjyg40x776cme0jhdrcr0c0opa1a8o',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'jib6n9uqc1s98rj3e145',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '3dp0pewua94k5mxwq4fn9q0lj35vry0g76x32kr9zbn451zk1gmgt0cfk80r4nwbgn2kp770ozv3peeh0j3qpna4nng61p6ssyoabtrrtqggv61ou5nqjqd5vh7v8i5v9t087c12wlgum0tylm3scrhpq6tnpm2k',
                channelComponent: '8cqb9awcmbq0bxk26bko8kzixbmmdc7gtytqgyjyj77jnioeyj9daqa7zhlqyx3qqcddsrmnkoja4s1wf3cr6vjocpbwh2ia3iyf2tnbbqth33dor2v4lzmh0pak9hj0ezpsbkwzhpoo1ehesco15qv1eu0or7kv',
                
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: '52hy71pf9sd3jss7rcc736g4rfsnb41ti87xo4v189076hg3u4xf55dnohyvka9i8hypwa8np3z9kcru4yztepwejm4j31gk0ypidba895gm1zomm6f4tmqn8rrgfqkhajdnynaqv042qvooyciibbhi9x3jv32f',
                flowComponent: 'fghw2ne1cep93o4i1d3o602vqqebzwtszv5a398hydn4s9i3zxjjvlpftmh1qtvfx27y8a693u5o7db5hcrv3ajmc4b19cfioeyzgqes11wxiobjhscxhu7owsuffqdmliuy0mctvp39ump5tpxpr0irx2m0dlku',
                flowInterfaceName: '80k37sjj43ackjd9nhq3zo2vz9wa9sf1hzphw3j5awx8zvuzfvdbsg6uhzhzmwjv9ftx7lghunzz3ldr9hq7rhdtk8mqwzt2x0d9mkoydg0pn6rhotji71am4mbxrtnk3l37nutiwaf97g6h4m7ok8lrng420lru',
                flowInterfaceNamespace: 'hfaz3si4bnqcs7gxrjhc2il2keabi1xlg7t36z08audlgrguvng73v84pd92t77ra2n21cqwiljrp9edlyk0ko2q04hi489b9mud82ob2tsdl5k92pbtv4orv17x1jr14biidg1w8k2m5jt23b0dfx3jqp4qgfvn',
                version: 'gysbnyzk2y7yskcsjp97',
                parameterGroup: 'lbiu6zdtwzeel8154pvxl31g2frcckauzgjd0uptkhhm2kjb410lqky3hibbcmqr2wjudbicc5ljdeg7rfdwsugr4k3noqosru4pptnnaj1s6surwhdwepn4g5x97ujuvqn5a8sw6izi4jprjx4b9rtrnilill3fgg6abvgpg2kqy44ttkigbvn9an30xj76l0e5d0zjgdblyu2je5xa6bs7i8qrpojn2qz5to0gcazb5l3tbh0cpy4zxto1d4e',
                name: 'vzzr43gw5q1vjlywsd3qakhr2y8kkyxwewqofojot1hwudgop82s5422414a4felfmats6yymtdvmj8is6gt43n7scvmzjxfuvebwsfxjjsa9i8pmewltplndc2kjiyw7upgskayq1swkw6r9dlcocihj2t7tvys04s8xnnblcnscoohtsten27aakf85jav1o2dvuni3pcjlud5tet0931ft05mmxc1ug19q2rwyyye3cwhz8idzpa6f4oj5loagcvs89b410cnxhjr1v8i4yki3wzfjab3ylezlxjtoihzyfuo5pz5dmupz1o642kq',
                parameterName: 'lf8vnmfqpp196jdr0wqu0jnlef2l6ri1ozlnqagvztuq00ghpcl4vkpcwkh7of2yhedde0dmqz9aj1yrujchq5w76q5i9arrirpvqfv9x7vnwa1o2fp1kkdutgj3x705qfqfmpy2mbt76fn27utkr65ya9fdijvakahqx9jpwk33akju5q35cyozcpvm2b81xirmqi0ho2pksr1ttm2ftl1ku00yqgb0oshvku3jtayzks4l9czhaturhv0fedzhoug90jgdpkwpg0yyhn0pmuh4guokrpbltmsses7e1x2ubjptybky1titdf1yyr1z',
                parameterValue: 'gd5am2petzc9c9tsst3wg13tukvspnm8jsmvokcbufvt4bd996u1khp62d2m8zo0u65xbk1w7n4qqomasvzvrxmr00783smmaarka3twid1s9naiv4eosk3028w0gg4vm5s5wr4zsux57q78swbn69tfvdhwh8jipzb3bmz15tw0zlxgho1o45tzn0kwbxpm7vrvgwzxjizgud5nmkm13vvod1icy960sus9p14qsv1g29ubgxxea39egt58q4ln6t0wbrnixyxz73pwzhx34yay0b7qydwiy3l0ia9glmocpq2ezfquudbknooko0u4ob8mtmdoctkjuamzpjvvyfovqircfc6rlz9yweqo1cl22op1bh77ctnqrcv8z4f2klrd3pvkdpvzn1r29b9jzl04r5rok2xeimgnorbu3iikszg1ide3u6jypx5kuweyqoc6dhkr22caqztorqd36i0nd6hlo3ms4ku1fwvedhr6feljm0dv0r5cnx6ehyg7c3n7t3gte9c2wrb4l3exmzl3hks2rhtkri2l0a1u8k6c9p5r44iva9j6va3e7l0fziwycncjud08tmf121lqj7pikyh3b3phvq97u70q0rcof68y34dq0mqfh0y82jk2cxf3ktefxjrk9vlzjbh9cf9ibrslwonq8j5279t2nceroc9v1smtcnht156qntxf48ge7j0r726ux66xuipgr2gbsf90x5tzb71wsfi791dd9j54xqo0bf311dn5fuirw1dqxxpebw079t7zkg9jmv6sva7c0pdfe39rfvs17u3s3y57xauh0s1lucasv5hzjlvignac5bbyxleuae0cztfdf8bhzth01x1nq96kqgiwh6w7qnih315sre80praio4p19hotu4fa22wn7vzsjs2hwaym0upr8u9ske3b2uzsflqh20j94i3fgqegoaii4h5cuq3tcmgy6u11rw6jhnvmggtgaj5t2zbbnn9qzsj1ppzlt5vrg91gjemj0m5x',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '1oqpxrzc4kadwvrj1jdfv9adftj584klkdei0iaiog6j1sr17a',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'osaytghyag0xmu56zd57',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'ckmkkdnlv1gaxughzv99vrgpy2l8hlmc0kg7ectfncmc6s45jgpuxttugs7wrnrafyvlh8wwuoekmaseuu2hajcz8dde7v797y3ardeoe8z7yhyqp0j0n63k3q18vyip09qed2752ihw7jt1znjvhrrgnnnavwal',
                channelComponent: 'ygb4o4dh3g0ll1nfidb03tjwc8x1ubiy89t043frgg5wgztals7qlooow8zpllbvobpxljdo883mcf855w5lcarvjs36hpo6yy6gtesiqs1t14gc8bzbx1yelm0tozp1ypgohy55smpyx1q9lzeckd7j8sqtebif',
                channelName: 'sps7ssliv3cxi523u17wjtvr76ynxizxpsd49vcbxm7brccqn6zu3k9f0d8oxl5w58gsxhvspurhs105xshf4j62iqc0xbvq4kt53ri04whtm2htzlny1c5ketf0gii2xxrjdqygvr05nbqhn69j35no7u2ox3uu',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'mlds6ozyio3iku19ma9qki96sobcrbfg1ockyi25ahrejcwvoeut39e9ew1pegdoi632ythd6pc86hz7l9m7qhtntkte55s1cfzf7e7h2icpw100fnuki59r45vpyadg5ubbjgt741tw8rya5c9lcdwrdc2dvcj2',
                flowComponent: null,
                flowInterfaceName: '5iyq5l5pgu8ug0484eod8y8u6lkt0tx8c8d52wvrvvatfhkgevmywvt9pbqyt0hjk64tpi26f9ygk6gafwo9e16tqvekq7ezimajsuaawbhv1g8wko8kzx0wyrrv359ba8ti7vw5642429ykx6g3n2a4u6ywo94b',
                flowInterfaceNamespace: 'frh0srq6lcn8e1lejs4sw8hc5z46ut36beafwgp25qu0ubseawxagfzbycxh08am2w4zb67n1l9u0evld1x28y8hq6k9w44h8s3sz4jz55l2pjicxcwrfm5qr0im384t2qjzui1yor6biezye5gc7etlboj2azt1',
                version: '0d7avvouc9b186ng8mp9',
                parameterGroup: '64q3cyplwo5krkmort7n8lfezy4l5jtuqno50wkbwk5j9ou5wj0t1jxax458hriko4qmyuz0kc2onx81uq5r19808foz3mhmwfnuhalqbg8txbpy1pzvrjuunu1ihn4d3cu4iiubj8cdj59n0lcbwxwqxyy1oa0q8rbhid8b76o05n0x25lllub46o9bjgnpkjrekls7xrur6gwtek61vc8sybtfsg1ca3qk9izory1z3u3ql7804xfnmsjmoxx',
                name: 'hf3lx1gsfouctqveb2ubii2ypmnx0rl8x9dl20ggi1yz5j73mlq81lcr8bnma8tqm87lo3epjmhrlvawmyn6537a3i5hdc1av16epe0gx0ji83hwujn8ksiqt46xby3tsg69qucbl4rhzwp79qytzmt9d6foamgk37u9ikckp0bl8hskzdksjj3bcp9qnji0vo33vfghyrb07ncu0bd8kp4urc8v4zuoxidv0jd3pdmlk0dng0j5hmytz5oh0seafse151t1f5gh2obfan19egohx5bqvctamzy51uyhawwxf7vomflxdmzydwmmunxo',
                parameterName: 'fc166j0b803zhcbqysfu5tahkhkctyqk8bj72z79kyeip5v913a364d01nhidpyoay3h1czczg0rex1sr2zqzmfs3omfhb3uu16ox0n100gh1t6zdnnvw00z8lz7zazc34npiom0xbn11w90kn1qnt5peu2dnwf1hy3vukggi0wsnq066hin2thz605gqslr0iylp6u323dy2rxnuqj360pycgx3knsogyck70fystujvpnh29z3fsxgkhjxhsahfvjolsjvqss49ld2im2xey3bbi3ei0avjtt7n96v0u7ge1l4vyilvzynjoma6gha',
                parameterValue: 'pij5vtpipiqyagi9f50pqpoinmzt96si78jfugwsug0qr5oaarvvcvh6noy8rwf52g0c6b3fk9cs4nfzfwru41es5i4vo789eu10s4ewuvo6t30spxo9jam09ysr50jwjwbb1yq52ibr9aak7qeu89yginvw4ixl6w7dxg5dc1mbaimvmo60f75sbo5arlf656awd9pt556d1wjkh6ar1s09g93kpe68t2q3ih8vztm5pm71ob3nmmaphzet2omr9ogmmr3lvylzl4m7xntzxw9gttxbkz4axnsq1aq1v3p8dgp7p8b1zlfmp551dsnl9tq937o15vd3tp08r0ozdc42p9okphcc5pz0rtlzmj5rggkxm4q7fbws1fibaa8oxtgthybzg43tx96ti0xqdv5g75dlikgyjxoygm41j03tyafdzpbxtudc6tq5uzdb7yudyt5opinsnjl659bjcdv3pmzgqr2hakv08h2yitvke3fjh8h0q74gba231h4nulsrn3zrh6m95ewuaq8fyvjrmbdwpo1jutim3l7j0stlo9alozpeuzwtnxilmiz85lh1mcepioq085lumu1d9w1tbropi5icdkzr62ll1w4smohjpy7fnbszs8mphv6nzo8k1i6a5pbt3n7d0p9xi5ka5hwha4tbnigpphcsupxmwk6s2e5xoqmoo3wsethxjfm3fwvafuvqc0i53076e2xsq0aos9wfwcnsc4e9h3jfooj37ymye7nlz8s4e4ur0l8yjvwi3wya6rocz6p6b1h6854pvl791qc0cke5ss11g1u0axoq45d87mlmgk2wqmycgtvnk69mz39roc5br6ixoiu4p8uv9x29xnpzbjlyvmbjhuran26aqv7xhvvkg7jfra0rmg42pcvtr2elbemqj6gkjclk36god1sb76o46k3pb4h1gdzrgakyp95y40oyq5xbycyz8461eie5c2vx50milnlazltemqcdz547g8n6gp4eyqbxrmf4sfem',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '32e9am9amrg50rvqc5j86sw1bontp6xcqx9kahcxqf8xz7brwz',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: '7k099zw36agvgzyub1d4',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'jbyzlfwkq908zwjnp46mfcvmikaucrofyl1t2o6ndoxw8qs8zta90a0v5p32z8q19fycun7rr5yf6wq91h7q9pqrkdd5mkk8ncr1q2l7mm6h0wgtxxzx0ucd27xn6uehht56a3sk77y5ei46lnu7z2t7bnjdt85u',
                channelComponent: 'itkbsf43lri1bbyqb6bqs6dqv2avavyp8ybivsiujqptngvkt5wcs3g97hwq9leeetlryjyfvxubpb8l5oljkatlkqpuf4gvbbjndsmw0f1jtfe0boh6s49fdv82ow71u35rvavklcqgx7yu9psna3yscmdw0akw',
                channelName: 'x5gzx73rf64bvca8m7rxrngfccl9v4sg50msl1nst1bwkez8h0spciq11ds57ix0sogftcxcaqmmqzfowpsidipx3a9jqls03za8j2bgby6wqwjcvjbxr5omr1p1it7i3t5q49m4yqb204qkvs7mcxbr176p6dgd',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'q3z0ga3yzobhned3ygai3dq9uixn5dh3u0l9zkbxqm8hgblq6o316ycvmelivw3xzwngjgw1356ie4m9wo9jb1qj9jimnea4qjmttwypybbbkain7tgsjaahfdu3squauvv37zi9dyh0bfkal7dfhm1gued91xzn',
                
                flowInterfaceName: 'qoz82u8yk7bg98ngglanmeaopc7neo4xnbxfd9lmmsnmokdegojjquup5qef2rzv5ijg6oxuc1nwn43slo6oagvqmbuf3n9o10s21q1f3bb2fbrs9cmi22i6ec6q962mdadc7nb8zfu92huubytzhsl1dq9ebdkw',
                flowInterfaceNamespace: 'lehjy64p6h5zoc1pde5ddvrq3e708tj498qyjvq8hcyl0omhu63hayfmjed7ftp7zngqvf2zx397ybafwsobf5oo4kdcgm3ukl0eiffj0r2tqbebv8dz75ynxy0trtucuxcc7b0vbnkz7n7nk6v9s8jh4rfizyc6',
                version: '8q66dhaesn3hoagddb16',
                parameterGroup: 'bgbee93vetgflz1c1i8lc2qggd7cbg923waa3uq3kxruunqm74mktgf4pibvq5pf9bi2la2f95igppqr4dsmrnuj7zd3tkdv6ixcvwskljl1ylaexgeumjmmcnxp1jgfrjdwtotovh012c1g6tgo4xddwi1h7jzobwhk6y3cspddmxrz0ys23uau66wt9k3dkpl8zapemtvtic9vgybdrrplfjui5duh811oxxlf0a8q802nzxu5opbfjd5n5oq',
                name: 'vu3gpagu9o0mi97xrhqhpflgirk53jb2qxakqouirf8h9cwecl0aa7npdnckld8r3inbnq45b7ctr1nfui05cqjdxhs35aa65ga7zikdetukthdxs70q6vdx3i0w825129pywf4f00u1f041s4arp6uwy7wr4bbzz9zk1rqh977o91sfo5ysehcecgindxuyy3o07bqc6wiwc59zouyruorqep5gj9hw2p14ikzhfv90i4gopa4wwxqld45c70pv7a1ws9ayd33vmrxqq30dyfhlrykia6bmolohvpsgnmoyyxvy7p6xoxed2i5idasp',
                parameterName: 'lso33kbnq15wn9j2nvjqbynggermmhac7qqemw2rzh6tghjiw7m82i2wm3swg4c3qredlyjyxceb1egsf7qnqpvsc5i2dtjt9p23dotf8s1yu30uqlr33hpjlm9wck76g62u0abp3eluyq1p30d5g45sc8bdh3w2f48e0e9r33ttqz1okor4gdbad413hjpmm5xhp7fd52c51aec1l2bwvl6kk9kwz4dpyk9z7shw1tub6vbk8mco7yesdqf9kz1nz6nv896sfvvxgdtvsr54f64zoenfn62z5ai2en8coipl4mzjgrs2tw39zbin2pt',
                parameterValue: 'b301qdhjlz6ypfw7iwt7bmc5r991ejfdwngrhcaqdl53fjo8znhu9v5ds3534h1xdwtbh5duki1svtbn98hf75fd1kim323zxi2sr3vvmjdl9twpqp45ezsqsy428gg3qoexjfvivzuvjqyswspxj45clftbklw0u4jnnjlpb0r4fs0rbvbiik7xzc4akaeuf0tz40rblzdm3ug6xo4o7zgbf4mwwb75bj1hvt5yaqe9f91kji9xg20znka50yqj052hijw6bpkei58jeqblagk1wguy2v41nx6hb8xuc0s5xp4b2pss3xp62zuvrukn8nxb4zxzefvx3drbtflr933jloo8ippxbca2x3n72bj4kawp58y14zatuwqt8utn5paxspz51ad82d3ttioqx0hh3jp259subx7uxb0ehz8a8bqot2piuvynchzmwknfbrxrx1h2cdbqeva3qeyx8b4ooaqemthoybwhptibouz92j23slnizjn517rms55le56vlgn9ui0lov731wop736ptmla9oon8fq1ypxd4n1j2sjj3qofmm477dlzq6ksv00du2l14az7p8vqw3mlg8euvpkobwz16dp9am340rtspxws52fj8j4he0lmzqbwlwqlid6m9ysutm0u230704d2ajakfxmcn63wuo742p9xakf2dfoi1h1d8y81vgabfrfswhqwsw5jwrnolzp3ynajbteivw8tbb77t8q2he31717lv7hdudokplts2spv3i5zt4qi1nnu42y02976u6hi0y8r40ggvl3gftlhp1g0ee4cue4y1oqsda2e0usty4vsl1m542xy3jmv86xbaq1qk3ldwhtrhqzvgz4qsl18ci8h601iai6u40hr3ikvywvyvp6nqj30lc6hyg0ngoq4pima3mepo8s4emcaiqiiuvi1we094dzyl88ir3mc5n90sz6hdp1qml7xuhq3l177tdkfbk0whajce6lxdeajlm73m8uof63s7w918clz',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'c9y0l8xmja5z6kpa0kwo48cj5h6yzrrotu6rhxhma4akjc32ag',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'usd8n4wjhe4n5xvgo8h0',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '0ajbck3u8xuzbui5t2r37rcm058xjr4pdt7d9369rmiq83zvr7oztzipskn565te2yy3ziohdl9kf6ezyae3edkyfqyci3tqvjlzg4civ35prsn92kbus7rmg05tie2w6vjh9jxbpd0h5n8zs6kvsh61qwsf9p7o',
                channelComponent: '2r4w2pd7bikjmzct0021tox8vct1ksn0bob3bgqcgfp6va4awfih5sn0ak22rneybdg1j7vxw7bqy1gw7c5tzgmae8if471ve1hmrqgarrdthjsfhbzzjzw5atzaqcqb651dzafxpkvs213qwv6u0hutqf2na04a',
                channelName: 'b7ehblfwnufm790obvs6yqpgh5nki3g6pecrhj6baw286rprelti45ow7d4oioh5ggjngbs9yewg29f69w3mqa6rokf31jbndmvpqmw0lmidabwonajggdxqi0bthalujroerdjy9g4hr87obeh1rho4af8ekaw1',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'rvb2epvh91nrqppakxw3z3r51u8bf4muwot3m6lto9et995dmd800srv7nvlns3jb782gw3rjh21yehccrc9k0q9gkjpg97azoqpuvzuh22mk6r09qgpgtw1j95mpqq1boe765ei1wihqnpx1lct1lymt9myur4o',
                flowComponent: '2q8hr67mjj7yipld5ri8cc7fmhlnwzhgf4n8kcajpuepjwyrwtf03mecggtmjgw8sef3qzua71m8o53hy1g2jqfr795s8r0s931x0ntruxlcvwnn11t7hd0jae8yhatxzyt30nlwtwhcpkr3d6paei6qyq6xonz7',
                flowInterfaceName: null,
                flowInterfaceNamespace: '8zdn5htjebqtzto8yu5vlk5svgf4ehhyhww888sdz051317njsuxcv1ca2tpi1ttiiqewhzmldeinvq4hlpozcw24qzdvsacgtiqdgxmdkeme4x90lj5thjjzu6r1xj4oklos7glwmueg10bgnsa3iyxt0cjvfl2',
                version: 'jtwxhek0kr6fjstwebz3',
                parameterGroup: 'thrruz2c599sp6kxo4s3wvz5gbiali1xcvb99q3p09el6p17vdojzb0ppqygmkbdfvyixi0si0v2lgjudi0ayqnd1m12csid30cppoq35jerv9n56znf8z5pu0lki0y5skru9rde4fhpx5dfqx7wx7n93jcr1cfdz0xz7grzqqarfuc9c456pulttzhwwarb3awphp5p09jwndctdhufp7ywfnam3huwbtuegkpnss1f3cg5htnjqyxazz3dh50',
                name: 'tfxxbqeg7aec7xrq6595dzos0yli6v50w5zu90thuxetm1sb84ms53i0ldp54njjg9ga5o0lb1dpom4xbtap78xn6yimipsgaviu1dciypgq1nxxqwwpsmv4syugguilvxt88neuro9c2yeipdm6ev40gqnald07e2gcwb6jyzpvcqztylo669u6urhnogl41x58xcv3m22r5gwm7kawz62n3vc5iszlmxafvtshwtdl0lc41jznxt232zjvalf4bqxhrtvug6wyatc226j0l5bys2c6gvjzheo6fict5zn7zzaf05dss87ztu0d2kwp',
                parameterName: 'uk5vnt7r590rcwbmobdz3oozy0thmdiz3esdefcbns78krwhwm4mr2h8oejjk7t3szeo9mhtqbx6ddaqrmxptnfaylxuilfycrlvgup0111pzok5xnp0jn5ydkfptnlmbxfel3762ey23sngo6aycvxneud13xcayo44v0btqpe3s4ocwr0hdzxkcfhh6y7v8durqbck897vz8cit6vc6gs1f7ptzmldhh5d43kkt6ujwfjn82axfmmy94tcirtcgjxg8imqa2awx6drwoxakurwg7hwrkuiibottvi3j0clurvqfcb1qyvw37ypvqp4',
                parameterValue: 'il6wgxii6zq5jg95qccb05axoigzl79oc0ekjkpy9rlmr289ac814qmqj9429v6vysidft9qn1bbwnfwf4cf7fhtrz6cdo6ryd70ptd318zst8xv6t7ljic4n98wed0hddneg9nk4b8g1oggxqmybswg81tnaynmdoagupdziw5hxzomls25khe66w0ii3xia1woz8zyw182kkboa9gi5vj17bruh2cfa5zy21xlhxzvqsjvyex2f1nomkc8be0h9tuuf5r2yqojo81g41mccndty0ex2k1pwifj1nr1jgyubfp0fngbhlpggltid6a71tqfuj6ouxz0hjh1yg5j3nhcyvk34g4i7bnymizmoz9w4f0rc764roqqe6rol7f2b1jux6nsvxvrd2h08xy9u5xcffs3fxl9p9669hs34jy04cjjtsfb1wrph2w2e0r0bd1k4bp3sbwer3eb7oepzborio2c2hwo2ujbnv0hmdukfban2ybn5gbgjiviqgi6xd0scxi2fdhrm002qpst4vy97x9rgwin2i01yfid9fmzscp6avj8360n2ddk4j568h9vnt3mn1xi9tcmczvqi5nu18fa4zd05ejwo88hwq2iua7kc0hpruey5695o3qdo6wp5o9qtorenwrcuch4yydjq6qclunw7wm8qzsgod41k2ydoi5xlbr2wnjwtzhf5pqyeax2zt4jpoysw202z8o4pz7c8bgtiam3i35mpckp3mrpv2d5agg4399zfd6utbwu5c05ah3mwavyknnel2qsyjksi7zfc9jyjs3mpg4io10v4f37mv17e2zfypiyscf8rw18fjawsoyl4ln3p6nh74rufeczwqt3scfifp17k8x0zj3l2o1oz0r4mvj6b62initvsslu74yoqtwx7hhpw81t8gxm8uth1s5466qcz2tk3glj13df8tpwfxy9x0ktygpnhhmpt6u1nhi9dhx9gjs7hvp8ixhon4zv375jtyca6q3eocp23mh9x5h6',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'poa6im3dw3tfrkl8yqfuquo2dmls6is6tjhs9jj20u43e7ylej',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'uepmjyuicglz3ncck9li',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'no33pd563txoqmi8955w5y2wr87btsracbxgi2sa9zeepqzay0gxrl3o0n3eycezu31nm3gxilh4ehp5mkdubnla6kk767y33rner6ujrrxlw6ur9liyji3h1ob1esobd610welaan2p2i8gixmuaynyx1zsxn3q',
                channelComponent: '6qizsi2tgy6449klnwapnvv1nucm16o4nqvix5n6mywbrwxa183qg4rnv7qitsgcwmr8ny0yu1ld1d55mf8iq8eidujofs2oduycx826sdu7gpnycoan53phrkfswdyd3n3jmkwzkenovmghh4iv0xl8qn786git',
                channelName: 'w4wmdofs3gj5tkbo473cm6gmwrinrd093h27xeasnurklcwpyj7vulwoa5rfv8vk2s5yh6zjo4iq3kntyloyzuqyo91xjgqm6my7luifw5evvrv7ec7rwn95emb7erslayr42oek1s6ma7o3tmvkxcwab44r76tt',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'ddhsj07a0ie2uijs3j7q2ljqkknbdvzq3lt71bdji3ppul0zjry2anlc1chlimxu95y84zovms24e3uidofwbt6uw94z8yhfk2eteqmh56vn3sjqxjnzy5m26trdbhkf1wp6xayct1p82zvo7hw0m2far53n2s1y',
                flowComponent: 'ii47nbbh78w75n0q5e1qw6chddaor42kbedlcpdyejhjflnr9xsrs8v4bqron67h5z8lq2v19gha4lzf9bz33i2lj0agkzg5uyf5i6wo7vq197zg11z4eujkis9tyancf8d7728gt2fa4bvki6lw0nezumhh47sx',
                
                flowInterfaceNamespace: '1b3hmeuhq31vmjwx4j5ela5osawdtgu3psj0z73a4ns0k2369ef78r72a8u1ju4zx29f9zgtes35x396oh6fb3quuf4xprfn4qiqo8x0wfsmd5oqm6g4h01akcd3vu3ez82rjzdye3shchj80t677076ovky2z4w',
                version: 'krb988xpb1z9z5jyhayd',
                parameterGroup: 'dqdxcutrzn7nnbxk0b6zynfnd2femai0o2hr627yfuze5lan1mqnsc3n363y865g78p4p133fb12zpju73j1l5tj2adag0kxs9jj1auouq9jzt37dnf1j417jchb9ljnh81ss0wlnffse2466b665k16zy1xfy711ipghxsz7s7mhx65qg49wa37vb70ifqzay3k20iv2ovviqbem0vooz7o7fkymg9ycdoqettsd8jvsegbp4z1ow6yfp8mtah',
                name: 'i4ecuh2gfc9pzoth6j43i19ofpp8hemsnajf3pv6i2grz991asxnwbkqpyf330c38oqtwfybry7tjdf8o4x31phygxowe3xtu1z9k3rq97qpqk5ybwat1kxddzisf5kufu2jkw5dnpza59uchy0tzfud2g6di4vqg0qfc8z9lva1blgh8dem8gzvcqkmkhwht0ho5uk0fv5m3jg9lwbws50651pxxjs9smg8c0tt90d3p4b55o43iy07y75fj6gub7afq02coyk5alzytffp7kspojbp8lhqdxebc9x4x6mlp8789mmqyq8keucur6ug',
                parameterName: '9ubwudpqcj5hdlwwcqzchhs6ooiazei8cu3mvg3i10lhagfnfdkbu5wyy04mi9t93elo08zyug3ywqhykh1n4n3ne7xqb8mo52k1uq40dzrrydxfb4jvxler6xrdva0fzewzmt5uxc5wi5kl3a1dfexildtk3q25lvl5n1exy2k8qs98eiflpovj34lvutvgzkka8q7ci1oyklduaip9oex1qd9he2ya05b3av2r4ir9gyzkmhjgekee3uqrhwqathh0ri7kmjh13dqavjjk0uymliqt8tjvnaew9gd1g78viho3y8rs5wuclk2tgwbp',
                parameterValue: '508eguc7vm7pzv1aijlwwrcsb7sssnsx8zi6mvlmsndjcukur1cfo0n1smjtesxnjxyrwr4iurw0lqp5vgipcurdea9n81up1az8avjdxzayheosm8r3qnbsivm6ylhfh56k9m7zia48pnw1xqqwvel5d0iu47hc9dsw3xx3e56ryb3ntobrt2d2o4sfra774aqsqtz6qmxx813rh6lldhj1tdzwoht583c1cw3qytcmsglk3cpaweefyv3qkm53fw1dyufnsxr33dwmb4wfpsfzfrng7op5umniaizwff3tj0a2317or3t58tdovdqn3wyiaofiagz04jfwo0dag0ct58tn3n4j8s700safze23v24ok92yg3y7h3x9kh2bbi5hkyq1t6xygoafjsmjzlinbn44h94320yhymqaej4e4ilibidavduhtb98zab6w79nfg7rp84xz6fd9ezsoblf2sx03162zh9r225qhltxyfxvo9fpkgwa4rxji6e7z6u533dkacbi818yq10br7f1amc0lfos7opwny94szw4c6k6n4mfok2mp4lun8tuz809yvzd6xsb4er4dz2jk6vh7rd3j2nd7np2ayufvf41winzt8wego5ecyoulk321naxgi4itv01x144gwhf7vqf2iaup1g8wviametxkb5m6293tql5wcim5j7bdsyievz1n7enfr5ru4l4i7x8h4rwe1l8gha2eerzi98dyq2ukqg3gahuwg8tp09zwaduf3h3062u5qm1ht7ix8zmew5mb392ac1niq4tevrhwtvbmld8o4u54uoggqnts90pn8kq8m2estovj8aahstm1img5ssnurx1cahh1p7ixoiwrcavzz6wyfp3fw1tz8j1iqvnaum9bs27fjnnvefrg7u126j3bcisjfgp5w1m2g5rg682d12l5p5vr8fvcq2jgahe3t4ewkqt62bl8r4llprv5xn44pxxvzqc97jte7yck37bxb7p8hfyhtat5hsd',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '98gx9zjn78wt1nxc457gvg8rxp5szj9fvl9trix20hx7sjgkwa',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'jkx3s8ezkc2awy3xs7l8',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '403ohil2v7l6fih2ibrgce4ahkigq07kg6sy82l296bq6ugiuqbocsi8rj90mj6bgxlp8v7mbg3b9fwwph7rpvm32xr948ju5msagmlv7kry0revrhxi4jwkefsep028itup7mspilh32bvprzk3xkxokl4csm2w',
                channelComponent: 'ixy8i8bo5yll3x1lt0526sdh6z6bx22k8e6swq4cb0lawplfs7rkj238ojtbc99p8m7u3hbmgm87ff2ewzh8ihyud5hn0l9nby3euhdehh1pyshqyhjzd8mnmsfbpnsb2r8d0xr2b632elutdmtgdrl13zw7p2t8',
                channelName: 'xs1uctnv9n1jy15ebs2iti9vxeyog084i3k71r4q0f6i7m2ds4537pto15mu6mb0ey720jwdxl1nm9dovl7owyv7daefcejpmmv5nqg3qnepu32xfhgkactygunxkjt2tkqbf0dpjyyrc2tbi0iw7atg9h0yys6r',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'rwkz067gbxxyj0311igxp4e09jz3iajs1svpkk855d4yjz15zpqa7lbmam08gtsv1f75cvi6315ffijj9e2elrjm27h5af8znhgu85prmfs0a7kokc4hjesjpwebsyr64uns4a0qfxr7dk9d4b0164p1q5drt9jn',
                flowComponent: 'zqrte6fegmr5f8v44z2yr6y2ycmykvuzejnys2ti39olzeuyd68pakbfqkarwqi8mutfsj3sagwyye94o2vbn9lo9nye45ogcjjsqpwh2wnwr3mjkrjon6f8arevtgrafpjerbwq5v1uq3qgnr8bsexuqtiza0lf',
                flowInterfaceName: 'oxmfb738rznonhvekp9zvcxdv4tqx2azlrqxvv4y5nbfkl9cubsayd2nextl7uic51co9qnu45v6vnbpe42h0gx3y0d9ym64jmhjoi34mux2351pfy4gfgufwbasitbnyj1xl5nrbe7h67ka4999ee8fx018sxsg',
                flowInterfaceNamespace: null,
                version: 'bnn6e9dbkxuzdxq2ns3e',
                parameterGroup: 'w1kj3y1gg0nzugkllnipfdj31o5xqn0z4mxxjo42w9sf4exj6x57d5hfvavma5d0dikoyljadbxvqyzt6lqufqqqguny00nhkj606n3socexr9myi68rhtzb53v56tlj5fomv52xl56ddd5bmj9kipx8anph04ze4dfuqicznt8hrk8xanyxn8rwgc6wegocuaeh3j0tpst5teu4u0nrib2e9yaq7vnpjyaydux4mpq5uttp29ybfga9ay8gyq3',
                name: '2vsovaik5lbrln3s26me4w2yxvrs9g1yg0c5sv62se77929iet7637jr1o0d7yfosh2pw55db6i59etv4ob9zzd3fsnvwtqlh3agaak0y9hhasjiuq58qhykeo6hgtth3oxl9ed29ct5ilyjs1q6htdi9iwwn7ltg07r8kdtzzqmnn6le6yzb0bt235t5tpdfovoq34f2n3bdaksuucos27ivqexswp7c3xk1yp6osotqhpinho93o4199di6ejdbad7vmaelr2loebfiau87v2stmjm5j1ufjq7y63cf4cw6v0kpui817o0rznv0msm',
                parameterName: 'yea4sjlh7fo68f969ux9q5dyvl1fhyuwui03pq3wpnejp52g0l7n06l6fnrp4pyy2v1stsyy782pbdfwyv415zmapiqdhcxvitfhjcv0jqf3mq3z1ipv9sx25ftocbqxfkkruaqjheisbuzxpzdhwjca5hhw16mncu98t0duuy30tn63f8h6huv3b8xy9a8h1cfewdk3nbvjs4suwojp9hojfx05pctt8pfgnoo5yz36c3yqxl7bhbv6ctbuihjjjzuyag5p7tnpabxaalaznqave5wbeh4eciyymnmolbjyl7dms0p9sgzt5i9dd0x0',
                parameterValue: 'qjujxj0rc2stu65xhcrqx4050yhe405csktiet1bh13novnrg3ayazgryde38uxikeknnnn6g49g2mqa6n1eidp7krunccddt58mtaoku2t4r130jltldzc1glb58reyy3zbrednd158e39u64m3iew752orqh40g5vwo1bwka0vqcebzpdwdhftgn1vdegyd7aj05bpoaaxdn8satavy2i8lihrxie9ug9uxyy2jnf55skjkjpwld4ed8a1y8lu2cbidooooz5416ye81mp1q5l5007v5dp14ig80ybebtqdu4znkc88vtosep88toxl992dv9n1o3jyo9cwz87229f9jk6ev6ngcx1a0514b8om23cp9docvhljg3xu6h18hbfqydhvk2g6b0ir5mitxniby851gpleskt4r8q2e9jpqh6swf4e1iv7ygajezgvtvtnfh30a2250jebzzh9zn6kb09sk4m249nt5rr9yixwpibdrglxhw80zwwwldmxhi9qtr7wxo4rbv9tk18yyg0e1886gj15okwgogky6th29trqsnnzwdlu74khjtkaj4h9x84kepe7l9wd2h3fz6nv8v36v5at3gdyp8ddkray0i6g2f7u689c727t6qzwvq83rtk4ca05x5ndzge502ekrg0ncbu7lrglmd5g09zxzmq60ndj35iew44j66c31d61qahfwd4vmcz0juh0abhnfu9mruu4aiszgxpdn8xh7uwi3l9ykj7v6url4wn2icstxd46gk46tknyocvnzju569el1rnvvazq80qek41z5z6yq32xqoe0vwccq3bsa5c50yvaxftjdab0obn0g3o0cmie9fnyvv74zr3j3etpr5ai4uimjwy8yo9nhj2rikevtb31w94fqs0h5siyszs676t7c1bb6bf797nj5qt4w8hlwnv6y7acukba5nd81t69gs4zikxofr8j3gw8b1sgk9axccevx9zzwfcpddramvhbzx15o9zm5rd3ucd',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'c9dezg4bdm07pmka082m9qkh6c8rrn0sn1ewnp4dnrlq1kvb3z',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'xcmsbset4mzwnljjcmbi',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'yv6nrst91kwocwycwh0rvhu0vunwon5xaq4cvk8nifuhp6qcl2x7ohuyft7eekphufkqzlgu3r3k45x1h5b6gfm4alujfap5narqfgb9f9z8cy41hhr3sqbf2taezpjt768u4s1rhusr06epfjg3o4iiu3vrr4zx',
                channelComponent: '4fqot2tfyppxwg3cpk4euw6dnz64avfuebmltdou5rclzt0symka16yei3g6kh1e2j3lmo2ebgfth8meej132722fskjqmegndq3uz50x4i0dxgoczpf6gexy6tc50cyvryl3tdv7o4vf4r0ihmxlrd79k99x324',
                channelName: 'gubnudmqrufl1crc1nvvvfdnjaup22htakq01ffamea9fjxjwhnm3nogyf34xke1812g3ug5vk1goi2exshxpc855lfop7pva3874pk7hqjuapv21cedlsogpu6lc158kcmm2ro5pul3ctzh2dcu7yevyqt98lig',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'txa2ynh496bdri6zwt3b71vx22rcnqavivhx5jl863i9nix0vqc7n5pfpuch2gwiq09vfgt0wd9br5yd8iigh83e8qt0en1lh3suq2sogduachrwn1ioexnzfrsfllp4ldtrgt7lh7xrn63ejob3j8r6jzpqs488',
                flowComponent: 'j31l5ngtlrhzxodl9hbhofa31vuzyxcszdsfinmty5sphrilgzp36z6tt8ua7vqgucgc0iofywfnvxhnu8237ve5fdq06lem8v23cam7dg4tipbbjtylao81ioi3qm6rtspuc761yjlweell9kyryvdhx6o857ft',
                flowInterfaceName: 'm5kfe727ryf9csxssewa96lxhv1ypba5hrkh87hzo1qmp95vrrt7cc0msbmkgk6bznvlrn2uyla5h637u5tcssxiojchrirn9sg4lly2rk88npcz4ck6osnzlblzj9msp48jucslvwomqm3tqv9v0lex0wk9myjr',
                
                version: '7ktxbrdbsgayzuu005p7',
                parameterGroup: 'xmzfwi241if2q3oa8850gi3sxxcxvd2bgu8duy00f4rt97auazshedqdsvndhxe27h4gbbw0n4ywe7pa4d5j3g4cd41f0iuxkng359photmq7zrn91lctv8o715m9cany71psy6uxgt1clx4uj2h5sl881ity9ercwaujuxgu45aiwxj7lfe07rhn5zfs4v7ig6th1soaldqvye5azt00rlgz454n5v88cwe57v3jsjd7bfd4onixhj6dbgjljh',
                name: 'j87nxc6m3i4utfpmcn4g87lmsqx1pxjfy6732ge4o7n9d9tvv6j2gaj447vwnnzqbf74gr8ejspuj0xju9congdqwakttjsug8v07uwyg9tm38hwu9q2hypo8qch8mj973p2psrek1iaelbcj99jihp45w37qke5x7lc2fjnrdjvti55w1r7x4ypmtft5gfbjhwh1uyc1nt97fwjw3x8b2dutoqaguo5mq1959lxosvbfo9wzk26ia7b4l4q7wdqvo9ggr5v2gsuxezzt2eay6vkyf7kid8imt1r6kngfwdldov6ff1gyg8dofh7k7ii',
                parameterName: '6l5lg03uapgoulw9xolead36rbqm1sxeft83not7i1ja1la5ioav5qt7eg1giw0drifzim054f6ht1e127ry54m88zo1z7045fy010fi762zyfsx6o7iq0dpag8vt5uu7fs4boiz05n1at5b99rbp1jl4iox6pf41722ffyp8ay28wcvg7rkubvj3516b1jdrs0eaxo3cqg60f67lot42n3da85zgo3bxrvnayvv94nolwwf8mzgqlf9g444ieqv2jsyrjexm4asfvjfhgdl5aclei8vzqqd2f0i8p82uxtsugqntwvj4x4uedtxl08o',
                parameterValue: '83ojl4en1obah34wrl0hxpabvzxfs99o3xsyb7akyjkaq64qcg6zng4ubdw5uve93x0ibpom4mxad695qpq8hcq1ota8arunq9hpx6zxd6khpikev7zenurufszzgvyokfirfm63nwnadu0mz6a3kfvnxhgln6aa4ouw3vhnjd2hmtk13m0me0vre9b6khe6tlwwymeozvxjrhelxt62scvdxlfzx0b8v7cqlndpxzfh8m0edpk5t1qe6b4heqqmxs2duc42kmev87xi3vymp95avlkfyefngb6kwaoronkz399xsu5fj8gyaooljdn9l6c3u7n0sfbh9lkfxrrmzjgyjr74ou55oqnxhu9xdmjzo42m7qnhw12uwvxae98dpp9ags2hg06shz8ynh5i7tl3ievmn52xvd1w56nuvodfy4k5osg9zpdeswdgnqhc7x8zbzfl1oewhgs31ynlzw4fgifoebtbn1yomenjarx9nf5h4med0qoxn1qd6jz9bg9d84p5u0fkwdt33s0l07jqeftaegh1d3obzsj4ddcddi6dc85j2pgu1m4rvbnrgb7sg0kmwhki5ih0jwavc6anblk715d8incvwtgk031t3xgbl0n1watd4a0jk1ycy06jk2t5bhyixaiml7ublnue7frknvl5xj5ndktzn1wyuq8jde03kcsv4532gl5o3eo51pgs64gfyfruzioqv0x5uo11b90onstqzn9gwbr27arfv6plrog9ogg8a6hfral0qe5k98nk7esioq0hbjmw2ej45mv2e1olmat80mq23ahstwd88wzszkvrl073kvwka3smedmnhnzy1arvpwtfdfjjzj2kl939gdqrb0v2k3zjlwozta6aoibi78nxf3bmthd1a8x10wcimad5xz4a6vsy4koufiu7792tq3uvdync4pi8sq2pxgepv5tlv3y3jdta47el1f4toe9odsv611mso1bw8ghjfrl1mezqf6qm80vgolwtezok5ckf',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'xz3fhh4msshgdenv73qd7uykl98tnqn39hw3t0lkqpdfre0qoy',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'td2pymm89vzjhwoco584',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'b1s6qyjcok2849zkymk3dzpjld58r6sz9p1gz2qbkbde23avle4vmchflxpd6wbvn7wtlu8ghzedajnxvgmzm9omp7q7d20yl5nk5xz7wgmusl7tums2cf68rd8ivirh5v5vxom1k95fycns4w0heajhwijssobt',
                channelComponent: 'vt7fagy4jygzs4r1w0pxw3wvl0oha41sh70bfh9cuhwz7eqk1ja9zimq7gtrfk64tfw7luc15yzf9ysk749b99x7thojfc1isdae1cfhir93g1gw2zg9oktgway5e4tyy0t27ymgp7wotwxhupu8by66sesdbgwh',
                channelName: 'luykzh8tleeb4slnhy3lf9mfv7o0ihvlb2rf8s5crm1rplojt5mpq619k5djzg5m2a3sf3hlnqa8kzcpnce6ubxqmggw187f1sm25navf2d86ktxf4ox8bymhxardjnutxoqyhnjfuu5cfymfun91rmsvvk8j6fw',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: '74o8tlv1voql22wsenp76obu6zk446minb8ycypiz3ck2whvtauhp40tldyl0gui2nuxefglvfnzjgxgd8oiy3zmgsm5hgt88g0mqi49df4wkea94yfz210t1mqwkiespdxwi5a1ivqg2a1aycat1rh94ykp3r27',
                flowComponent: 'cqvp8lwoqh0vgomv5ikop3ax5uwtjox59tv7skb3oq0s1sj9a5fds425d6iqnszishd8u9piby41xknsee1o8vfv3hqcfsvbsnh3wiwjmuuzl69zo3ssbbkbio9po0po7b3oi6ytq7iari6emhr5gb1wx0j9p03h',
                flowInterfaceName: '00cyr64hd7tkqzp055qwcect8pmsmhollidu6cpyqksqcc27fcgdbc5libary71iqcym7h60a05g62mpllw9x119fkodqtyuzs4fksmnazpuczru50nl3qw804u62y9uts2ind1cpl1r319uqrxxfrgwcd0gf626',
                flowInterfaceNamespace: '9w76hn8lgke2xhhnc22dd0n7gvj6n4chc8hkr8cpiqawi943y400oxyfiuxkzs46aokkew2fkor5dv5d0m9wo2pbcapc420qcv1i7w74d2m83b0csnr8xe973w2tvf3k43mvw3ex54x8nf4ed6qouwjlpsof2111',
                version: null,
                parameterGroup: 'ud25hwc5hkl4dsc8eif6muhb44dnq3g0xsjly4l18rohx87q7zq0zrgo2he7tqhkifnjigihb8egou2mfsgyykjxu74qe1zlwjaawkdtbl50uciook80m6eiltb5t6pa65r7hn1ix2ummdpvn6r8v2ejwp0qe8o89jjc2mdfkywsvo2b9tk641xxvnifebwz9effzr26txpwh1jae08lzfaii3cbqq1e0o36m02avgxnpdlza46oz6oh2nwfz4i',
                name: 'wu880ham52cjikxdgknniph2g4zf191gsk86yed57y05z112a1sujbbd0dlaz8y04sdeab1qyr1ae3qsbt0m8h498aauchru6rstvmil56s1au8f43sa37leoxkrz83t52jdn8jkszcmyw4pnvtvgvv6w75jywaap9i5edqz8xyntpwfn534xslx8mbol5hctturqadpgynl46hv5ifzn1t1002wzg0gyp91q7wdv4g7zb3u3b5zg6zkz363prqtkgnkmxg6zaoz0vs4x1dlf83vf3ailx6cen8emwstknxp501esx5zomi9iuiz1qgq',
                parameterName: 'wxjg72yuexm2r4oshxya383kpv17lsdpqlojqz683w8vy08tn4igzj2vb6kucotuake9j8762j9x1vjr7rnw5ejb1jzc29wzy731krevor28ton4ocn4givumepvxllp0gn21o816q0a810xcdyszyire75jeu5nqk4da56pxc24i1qaguf7el9a8zwvelxjtotziozoxljsse04r6e4iepr9cveyn12olo6suoszqqh7p6hge8hrrnixzbug21syx6sya1gwk80qqtie7joq4yvk0uvqsiag4mtnb2sy5fsahs5wb5lbl16wqnyecgc',
                parameterValue: 'd75j5xedroyime6smdg8xluc4wepcdn6yf2nahn03iozd3sg1g8kbs8oj5dvf6tbokj6fg24ir0lbz2qm5qttn4ngm5v2ntrimjyboxc71cxg0ncb5hm6ddjyurfu64qzc1o6hi247gszqr83krki1orfhwtm7m4pegn6wqgy4bgtruv2odgmomi8r1x5lj3ghvszixxvz36rduqtu16byxfgiqy81mft8m4c7nrcit9wj1m9h1xxob7er6ry6k1qjft54ueo0gd1tsaazku18y8e0q3tv2in6tbfsu898wtu1jndwsxz53wmlhcck2nccyvdbbeqs86kntjt1ibb51be6oem2r2io6p3pn1rd5v1xp3qq97bz1yu2lixf91puvug0lmvn6c7e82oex5tfmjnpos6brka0b4n47p2oq3r540x4oon6nz7319bdy77w2ed8m2pbfuo2azgw8nvbac5q7l8s06iq7jm80khhagcf5ovj564c4zq9l2c032c4ht47id9rtxra5a8msyyi8fjdbvy2bxzl3rtyp0oryvtdrlcttvnt0cv15c4mnsj6o7ijgq75wvjgfgeofs6ww76krk2ebmha4ymggof6burcsa1xr4cnc1sxdrfvozasqxn56kiugqiqnj94rmbwzdctswrm1evfv24dwbxzm8ow2sswc5f3d9jx1xxizrr9md2og55uj6hdb14i0kqthbhiu0cbytdi2gsl1o4iq2md4yehi32tpykxvlc2tbs5u5tpovgk2vaytkyxmre79uh80c1v9io3qyci127lfms7cdlao89mm937qdscpo05uj181zl79tf88cc5lch9xt8z9vrkaiyrfyvp1zojauqr1u3zy1nmrvkwn377ximcuvq85gu7vz074qpu3or9hgqagx1j5ryvyfa7lkrpshpgmg5axgsfnp5t3aqt0zadqcb1gvbtc9gfvskr0vp9h6zmc416akq1v38y5ls6vsipw4beeq8qjmmmaxdqmz',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'kyuuww0zdejkzivtw0klis7985tbzc7i8j3ftifnhbao9dl0nk',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: '23plutj2mz518n3blkk5',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'gbvrh3so46m5z5tlvtg9wshtno77u2a1q452mvwffg3tum7nk0nh1icc5zvv88fn8cx8chx2daetsdfbriayz7zgc721kst5q6nzgzcgb2yrp1uhwzpgvugycz3hncryatqrn9c5alj6ept189rc6fzmj44jt6cz',
                channelComponent: 'k6mwnuwexm8unltachobb69bhje6v82aerl2xpdxxjirlbo2ul27bamfdqaj9tpq5h6xdoey07ld9uj6uegpk4bhwtax7npif2n6cvw6vfwd4n3zugyvr6v16ru7gqsijjohfb4d7t1sd6427dlf93adkxj10wge',
                channelName: 'ftastuhobkfpg15atsy8xi84l0czt53mbm3wzumnptkeqt7fwg5qti2tssa4pkv7o9gkte2s884ruy0erwa4aig9cr07d5oe490gn3jclfzo3ethab1q8lewzednafdb9l1vh3nmk03m0o6jw2frhhctvne8ckzv',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'exkqerj8c13o7bq3n9mggnz12uao2w7exkzpfp8f8b9t68iou0ny70wrl0yaq63lctlaykgra14ia0ygyfep9dbgxyue5c4pcvurlpdn5rzu9huc7dxhefn0965qj7t9lmfdaz2f1og6nszqgna71ou6s1vs8b5u',
                flowComponent: '9tfrevskbqjeikuwc7tvew5qirl43sp5z7xum6cj43ectnd72mpfedjzfy4qkk4rt2ytzdcby8ac90244d1d70cpz8ru2uhk77fsjkuqa9enkyetegbrn8c2kpw4b8qxvrfmolm1faioteek6739t8c4tx2v9rgk',
                flowInterfaceName: 'em68krdlpgunyaljjcvvb7jkyoklziviplyqul1b052j0xlmg5femlrdmxopqvkk8xtn4zrm1tj7xsd1kd6kiq92m6wwgv8bkjybd3ge44j6pz7w7eil3pm8rk8bn9p603o8fddv4i7agie807euk481onuz49g3',
                flowInterfaceNamespace: '6cx7a5yefu3dpq2f42g2u9otzldqblo8ettpnpkmpf6jrxv3vqelnh8lzj9dsofo6korot25t75o3j8zek7tp3s8q407s6umr8pi7z4s9mk94icds97lgzrhkq0bvuk4nu5thd59t0og79iprdnyxkettdiuqc7a',
                
                parameterGroup: 'lqtc0ybkwaulkbl3c4j32ylz1ka8r66laxsw5pe1x66cofsc40qjir3hegcm1z5gfgkio7u5v3590rv2oyvvlum6aaf5ktd6pm1hw8xylpcts2ja8n3s1jxzq9flcmh2n7l9gi312heav1zecr5wmhnv36wl0yatzt36ba9uvinv81wc3v41fvh6tjfq2az3vjyinazljwwbxclxfmcwqeh8o2glc21qsbwpgqpy4yp44gxfhnbdbgm5xaqykcn',
                name: 'vcjvfm61btjdx82qqq59xr1ovm8bzbie0zjtgdtvb00tq4a7d26j3hncbzjl36o5yhv4lyho30iz2x823u2agk0hkblh07q1iiyhmehp67vyo73h86lwrtphkwiu6eei7n9q5855ju45x66f4vpoicuws903whxlsqtylqi3to3fr9rilwabb57mt8husyvv4w2i21cyt3gu2ucphhyqs5dlo92xqdvvil50qdv4oe20txc3xp8l2mbwfk2zuh2jl6cqoxb4w222d2cbuc9ra187qa1coxpp3280zovofr4nfpxtssanjabvrbh2w52h',
                parameterName: '86h0dfxmhokdamwnuwarjnr3adtxjuigrkp3iuw3z4486muw1im2dz2izxgc1j97wa2i5zkgnrjiyc1mgy5vss3ahrtj3227wqxc2ablw9qa1rfvm2mugkgv0rey8b1ltz6t37e2i937f84hdn6nkaqebk9morzsw3obni0xi86mih11wclizkktji3i420mt8j5gh33v8u97swk6x759qy5pag46d89fampjxsh04afrs7xno130p739hqlgabgl9jgfreg9esl46rcruu7vxh8lir0wc9wacxec34trd6d6bj3o7a2yqv3dboz5979',
                parameterValue: 'wq58aou9d53buapv8en2dpv2o6fc4levwbe0b5yykgx3p8b4i2lt4vx0rzh1ar2r1yabtpcyjddbdrkw4sn7ky0dqhm0223oxsbno6kqigm1zsus6enyo4bl724os2mo8a17r879l18pd3zhynstifcyc2xlp0ffy87lmqgg12tvbebocddhk6u02r14uin0aj47xkxxi3qmmw8kzhnlxai4e5qhz8qgo750f59uukloxb1k4cgmfaqt510p6308w87jjdup35qgcai4u784g5c9zavuzlm9gl0hc0pkn3mpfnqzx499cjjrj8t4ymsebu58m0ba2b3f877nn3imln4kgyvli12w231go3vz00xb7iwka8iri3rouvpw9e1nisy8xgca6g51cxawltwjjhjygd27wyv2057o9kbku21qjvizn6d8k0gjv8ehg06e74yg45e6dgn9b7pcb1ojbpwggqyx06yczheikbs6z7uk3xu5pu8d6boh2vmllth4kqdvrh0f4pf5csqx5g7f53dhtcm71xk6fvz5p9bdugev88dp5ayrk5lqz9pfdn2qoflxqrr59x8764nvy552hmr857kvzb12klnhl9g5k1f1hhs8zuyk9na5g22ph9zylirn4eawpb5v7hn0yoffelbsy9foz5gyeeg776r0rlwvw5qcukadpjf800e8htkrmforhw8alw4msfm1461rh17006hcw4hz4aoysype2ciheygzp8s8fenlr5bhuw9k7dpg7ukvicq1ad8i6amdns6qzvzm4y407qh760razs1cbszgf79z1revx2sknno5tgzi1gi8jvtmxf6r5e3b8ag4s4hou8ac0xn3op8hodhwkm9jybfzpd4xoc1h4dr7676yjpyuxqm5xqee4sh0x087g2lkh7swnyljdifnlarm4oem7ivpevi1l5yf185cp3smonn351pxbcvtunislki16qy3dpcdawxls70m8ab34onpm0am64ilg8oy3h7u',
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
                id: 'b5jo4lf1dbfk8zbdnqq2jy4jc8dqaofn74hgl',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '09i73ugycouq4n0queq3jhlkxxx65m5hiehhmuv8t35zsfzawq',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'knu31por3j1948mtbl96',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'cgm3u6irky0b8k2jnpczzsy7a087g3qwqts8pkvm3bxapwfadjna1pr2qsdpm4ydyc57lqqlq3o6etpktgllgdglnq9b6nkpjooufap7vum9vnxt5lgl15gvlm3cmxa8ox3ejk6luls889evz5mc3n5e1f7g0lxb',
                channelComponent: 'eay2wdnz6rf6qkjfb5rj1wxshthgimd390ywox9psnfz8p84nrshvcabf44mhu0ifsjiw4sf5n3r2x7tr02mbipyqhno4mb03kph8mlm3lvhtcn7ib40btm98nmc537rdf3uk3bmpnk7r1iurbocru14s1m300xa',
                channelName: 'ewo4x36d1qyf5iovffpmk3h3nxwdf64l8wom3l8iqgp8brsmr94xgxdo97kduoxdvopmpqcsp8u8lzzbb7m01ckx0g9d1m4idouujosuwd1f5hfygh60ihmbf8698sgoxadmujgi0ssg9hx7i0ikusrv18c8rwcj',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'm6o74j40y7gp7lflzv49cq15mzxyphd31f9oxyxnhsyd40j60ukc2do0fmpjp2jnv4ytup8ikq3tu62kxdmbnxow0t54ic01pifenprp970j1p47f4qizsyx4ogitfwd2of07w03rac58yvsks8qu4cv0idquhls',
                flowComponent: 'fxn23q6xmm83osfqoq310o4kl8px3j4son3m9xasbqishka1vk3q2kdfmx85cv2wgflqg0ph0kbbu6dc986kz7zmqt4mkimkdfo4s0155qwh0n9ixejnrttg0iumw2bb4pchpz0p1an8iwv52mx8sjwwqqg7nc56',
                flowInterfaceName: 'nphymdd3cls9cxi511cvz8cr0na1do88tg2zmduwovorwpky17qmb1h04vugwi78ev3azsckjw6ryb6mw9c5937uzds36ukkgbs420skkakclpo6l86xz8vlbnolz3mjndfbswirbkoz00g87mz8wqmevq31cj3t',
                flowInterfaceNamespace: 'kjt0ot1lhstzkbj2lhd86h142yg801ardwfqfvqhqrce1hw0xdxtdgr9y5e5qcsckeaq4rr5r0e3jks9zc0jzwh2r64rzbp343z6nss5pjb5x345bsnqsvnwqimtje6ieu7soweh1qhnbsrximpj7282lvkdqs21',
                version: 'wl2u3mj5nw8rw4vtkaw5',
                parameterGroup: 'fc7p6ssgp4lp4xhn7j4gduwsutt9eqqo8iifjjitzix9nbjdylzswe15kfqy9qca1fmiigfbhs1512elmtmlwsoko6py9navdhobse3jls2w1fb4s5q8zrr8k2lv35oor5itqp9mwcotw2sdpjgh7bsspgjr7far9fntzmtmeyt8897mxzdr4nfpvh3wyygeq6wnzozzdymqbo6gla21tvfjb3e05rfdkvzmx4ge1dv78c435pz0axx756fcw40',
                name: 'c6cnouoa7bwcjo17bvgmpzpjcjvgvinnh4sqcqzi3uca1qkptg0v0gn2d6h6upcvvcdyvtp6bnlq6msbpjbgcbiy4l363o2u4aak6jy9ykcwqko0pspgves4k1yju6wz8x4qmmqp5wmu8skuachaeayre02cn5xbq6syrxd3048iane9iqh1sa01xqetqdou2zsmw8la0hxc4nfe1b27oje6ebdjpf5tneq610f0oij6qaifpmvzj2edob9rr9hoicjq97i5bqq0zxd1weij9w8d61rpnk1gw61a90s3nee1n0lbx0tq09ce4ci6bhd0',
                parameterName: 'hzg6k7ub4lw1mr77w5rzdgkud8xp50errvxeqmzqqsd4obnbx82b3j7eki3mrl57mw9l96et597ck4w8oiy9l5xpqhvdeduoitsfv737rb1svid9zn8ltg72vgi1ex4g9nrkvhv5crl3nayaq59jryem5n90e87ildn7a9r9zl1pv0b2kjzho0ljw1thdfeln4mpi8acgyy34o3l8c1yp47qq2mfgpiuehn347vvrgl60ew97is2yugetyk2vic9pu3ecwichi0pklevdvi1vyj4pvnr4k61w02reinctjcv8zmvrt9q5ico49u8esy8',
                parameterValue: 'yin8reouwo28vjic4ytdknywfif6t5v9yq1xdw5u5z99r0cg4ut2g91uvuf7tc11vshqnla5zfyaq6g5xlh0yrqbj1nixoe4wsn2wy0war81mxkk790ipkml84c3feo1mzwws67hzy1jz5lnqjm0a4ky9wa7fjxgcw7v9j2oteev6mu29wrtya7ppdfjx45beay9dpfemfnhhohh1oveml7dxzq8gupkncfhujqojyb91oei5lo7p1vuaz5ybj3y7xvle9peg051nslgmd88umz1jvgxqt85dlxwiwyy84no3akfixlffs85zpiuryyzdudh46rft0xnhkfk4orstvti5xizstq7w2sdydlyw473jxydzqoyojvshwv2j8lpgx80ihusnkka41a9emkrycb18cnjnb44bv1qftpmslv9mqm709w81qtq2i0eb9f35c0ekxjui34fruwr48q3ddp89zckott2p2z1p01ai4lzc5xcmztlz3a0uq5rpbg7inhb5db3qnfp9rufsz7jky7ivpxumactiotwlwhh3gkvtg4lpa95shcybprigu75sdnywfu2mwps5oixrpyaxtt0hxxmx15786pul22sshlguk5w8vvfft8erwnf3gzj8z9860yw4hebisox5tahr66o389b83qdibjd2611kwv30u5mjkkl0ojn0aak9vrq8vwvsoue5mvqpg59drm1wc14c15nm6bdfnjovx5brui6wgznv2vfzbggmh76w1cbqaf2qm3zkbipnt77cdrllmt1xpzgbcmvjdvh5c06ctsft6yz4rq985muijbwm13qv82n6o0l4w7xpevpmffhkbyfr1vz6aurodp1po1p1kbeqbzd7igx3cxfqofi094j5os7m4qnsrrilio6gz1rpv4mbruxkugzfjht40tq36yl9c3ge50zq1iezf2yv5h7bxuv5ko5ry2zip0tgajyvqk54sqnectky1kjmagz0f9r7bc5hq16jhxhcr8bgjwk',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: 'e199japv3bxcway8l9o7p5hiu25lrk3p2rhhg',
                tenantCode: 'ti0owvqhjgkdrx82f0jz59s97ngodjmejukulgung7jbw6ozwr',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 't1s1x1aez0bgfwqce0k9',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'l33mkez6rt92iwx4bfbd5e6exwol28yew7chi0ijo1hrqjl9l6kaavx87en4h0pnw1fd9imlwwejb5jsifrgx6n626hjq6mi426ddoxrk7gydrf0elcb7fnr3wq6rs7lzstfla6rw2y000llbpfaiih3fr6h4urf',
                channelComponent: '2jrohl92d4ks1pczuqpns29fhxxwy23yahewp6ww7r9k0j19xv6145jb0alshbqp90ffov9af4fph52yrcdipnh89e7h6n9cpgvvtbsogo7o8prs8gd62y937w6f712igb9jpzm7gejkh7arn6px0iv1v11urxif',
                channelName: 'gljyg95hcz7cvdmwevdbz86vko20baem88zzplrcfrlaq30r3dv73veadzdykd026w9a4ewo6b22487q60ojgp11iwpddwqw2xgmvckrl9qgd6aobxe5ysh6b6ev3otgb4y1d0ysz1a5hc1ko7bo650ddlvhmpp2',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'mbqku9x3u3spy98thioy8j68nugrqvi3nm90unp0kbgkq3dc398s4jhv4q4eohcghrjg6hjw8p1ank4uso7nhvj3cohcv6zkfj1ywo3l8s0q22jlfovx04vytbito2e6nxy91kpkilplvfy7ro5hpwi0qpvighue',
                flowComponent: 'zl8laatv94x158uzh3lbbi5mqfkhaxzqjf67ur8zgi4ajn5gwp7zyhgc4t9m3j9z77gmqe0d4jj4kdqwsgrdn458pgdagkhirlawrk5k31d7l2t8x3ansrorlwjzrqufeqyduf974dn3qki4zo0aovotu52oit7k',
                flowInterfaceName: 't7arg9vsjzk6pqt6x3rhy9n40hdrp9tckjo8xbi07apvrz0l6mvtio6cozwncsyumlcajl1nelqrecykmz7wma2fg5kmtydvlfzqijy62qebna6zuds0df2le02821vjzewubceqioj46naevbredy38xvjw5loi',
                flowInterfaceNamespace: 'kpftl82vinp2fa654k1chrawxcszz3k9axvextb3yitwm3yc0qpe22udgjl12x3730wt5tekbbxmrlwtp9z9ug7eud5tx3d2nqbab245ao0syzrox3uz7rs50c1dnq2gqxaocxone29gzmxe9h4sr7gu0efessiy',
                version: 'qvfrgexobpn2mg7ijomb',
                parameterGroup: 'loh0uc9rmetpd3hfn9y69qp0zv564am1o012c4p6j1mfis7ioq9d9jf2juvyjvlc5n1xqgonddbx19xctcfs6fdea3iunkmaku0t5as44z5xdvkzc9p4drsd3vnu8c8mrsfiwkmjmnz3my7xta72mam1mm0z6nhwj86la8s4ftwj79eo8ujvs06jhcxn6k1z8iux4ywfyhb3jl7rsohe2maq26wi5bia3hnic520e5eoswlbgf7dntrveykupfa',
                name: 'eoqwoxomlfs70viwe2di0mau5ephdyarndg078sta736jhisl9n4z4n3gfodz3fbu95f0xa6822n3v6ncqju1n37qiqggsys4trngu3bsgj448ejtjk33nb680p1qp9ik64cva6p4xjlw3yihse0i7jus4q69h8u8bsb19rhtqxwgio0204p4wfsxmrlrxvi4yfgtq4w421kajth6ka71iztbmicu9uv4o5vhku4g2q5s51qxh7ku46tbhdd97hys0wtleh7282y5ygjod8rtyxva267tlzcjlbqj6zun93wihbk2huqolsehts1dspo',
                parameterName: 'pb4zb6xm3gehwdf6cdgbs2yhe1s7ecffz1vcxvkpljgmdgh81ga2jgjytrl58ltngx6pzxjjcxuley8ojtjgein3mi0fmka8o60a9e42cl4yl4uvyq6wjixoiy8n8h0jf4puvgq19330s793ibzyer0is7phlixm6kgjk69ac7277onipukd7gceie0lcat1fejhm5er00ad86gmn09oloidknpauztd4vpj838oawlrak9h4jk0d6yffg2kv6oypz7xp3i42rd8jlm22p1v93jngzg3ce7cpjpncxg2gaetu6hkkpcv94ld256ixh93',
                parameterValue: 'wl280ml1devz9zc5heriv7fdq4yb3gvwth2an7rcbok40jj580n2tbemqte66847itea7tcbqrijclgjo3f8gu62xqg7ncjwcs79bv9sfehdnfux01463f5vcvcsetasrvfmym8cvijbvwk9y1qwoq7cw7m539ng09ewxzhmkknpi5zlbhef66zq344j9x4fctsyzij4ihccbiit08vhi30r72phavohy34dclww1nnbtolzbr8f4x1g5lzdp3o5u3ve368wgvgx74bkk3yyumozickeu6ez1c7mzx0yhb4xrqwhy0lgu65hhv7gfcvcra5qjoge4lpbtfu09chffdhkgk049n0ujhzwun63jxn03hwe0rfy81cgtfujgg5qo32yb0nggwngxvwnp7g6dbp6rpe3ar15lokqjm1if78wp5jqlplqxuddn6mqq7w030pv1zgilquf3lm5gbr6h9ak39usculhgw2g4ngwpy6eqdsiv0aj10zjiy3q2cx8xc891xk71eo5bmywx5pd2tbsnj6ne8fw6xkuikzcet2d62h6656tbn8kkatkyitmkukxc1v8w4peb5thsopfacd1x1em4w32uvxnndwrojcegk2myhu8ewn3ar8mkzivah8k0rrbuz8sv2eyhempzqfuxu7paobcqqyulmq3tl9j15flv1ypuo9wbm9vlsutkadoz3kaqr36r581g1dwz0tinus292hk8b4uyra084n6kg9jwrpezglje9brdrdvj22np17ad47lkvtufocw9x2f21f6yg54ifc8uvqjyd7cnyd3nblbztz4l2zmbwm0ls31ar1do92v6705x3ibguuzt701g8g4v7v60jakem0909melg7ra64gf744mzg5k1wzsmppn9w46a26qfdqempw2io2qcjvatr54shemqzh2bshabairs06gykgyk973bohq69zt6dk5rgmjr7k5ocv6gs7t19l6k7ob8nqwuak1lk0izlw6ip01bayc6u9',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'admhkx9yxscf9y84x8iemsm2w5j1q3e6c5r05a72qr5wwrbosc',
                systemId: 'lkih2cpc28n2itvnw36sm0hmdq6nw9vsglfbc',
                systemName: 'lv06l3eimcqt2m70e0y1',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'ft1m6xfcfqvvz1nhs2a8033i1od7m29shxj6h032xo6twy1oqwtgkaqx326ykt28rjcpu6qxl963rw1kbv97wg75ykmdlyvthsr0hnzo0gjqi3b101yi1qe7xucvgvu8j63nziat2942m0o4ctlxekgsjblci7u9',
                channelComponent: 'c0ffkobox2kpxilko5p6zvpiuf491p35ioqbzbj686zwek87tmne6v0hx11b3w088feqatq5lnpef88sqsbxocseedzjjcrqy4p0ewhgoy2fsfxnfg85ocoshzjktf53r8n37c736phx4n3s5o09i6z7yow6d8k0',
                channelName: 'u67bh81j8yykecprongju2ofrlz7unpg5ckuqfe5ijvwraw8t6it5o0kojfk98j0q9yijuliavtxgiw8a0szk7groo8r813eppw8mpjkacpdgtghw4s4gwcskb6vcigwvv8czmvsrpdc029lnzkv0lraa6ouubmg',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'xhf2ji9jugtg7za2k7jmupp5owfm71v61cphf2ed86psceyp3sx0njsx9z9b8kdbrl9ldqo6qkmtzybtdy4j1i5byb5ggpp8ygpm5ajkqdo2l3uagek949yq7t6k3bazmhefh4nlbp0j6bslebuvut39s60acroo',
                flowComponent: 'pzkm868csy8vff1sj17bumsi49oxhh3nck7h3se49vn5ttyxoblacx46hy0i89ot32acxc6hvbvjuxv2ztjfjwqwrmj037zloyqz2kwwghshlp3xti3nr1u32nzgt1u97xfof6we3ylzx8fwmd249gxbby4hutjl',
                flowInterfaceName: 'a69zmk6gyeee2vqedxhjq2bu5d8faxrfryobuv22h8dz0ce7rsxeojptqeocpa0nrj5vib3j5ugeosgtmy11t5x71qrjixpa3l2tdkrs3z1dehagvht17utkzpod0xd385fcm1h1vguuzf5hoo97a278h6yimxda',
                flowInterfaceNamespace: 'gz0vzcw8zze28haaa03eoa8byns25m15f0wq206q72vv1mzl76ptkwp0j8qu7ktmxh14jmcs91spvidh7956phzd7ouwaa640ajd75uczu707wqmpnx09ptfxtd9t06upbirnxgz1v4rsvv637x3inplz8jvdogc',
                version: '21zszvhe1wtqbfbbx5ia',
                parameterGroup: 'e8ka8korsf45k5jp8yykvbs2ippkphnwrqagwgv5q5bpq4h3gdmd3b6eohs4fbdts938ipxpvw8wf3dsawxvh7m8dyxvdh5dmu7dtcud3mzkfcxvky6ikybrqdfa9bs8qiassxgi7cdoeid559tg1ib75d29esbnqt1mbnoy7t3pblipsozkqg8sjcv105zdwn6auq8t58f2e6e8r0g5ou2at5bnzjlw2x5npp4aix0y9dj9tzhb614y55cznxj',
                name: 'wqsltff9n7qibkefcf38bxljdy557bda3v951lmgppai76v239z8bx2pnnw4segthjlqwn47gkhdgi09enc3ole6q9tlqjri39nfe7ubdbhpx3hq1md1shnrl2alf5lbppmvfp0wj3jiyixdga8k6j3drdj88b9hiwg3j3z3b5qwa4c0wb126s46pb7irgmzog921iap9muvznmuzwmc37ez0vumfaakh8g8c8m9o2kiv01gfdejglfsudf8vfnzfx2dpdg8v5kt66xx2u1pp9cjhfocuzy2ak2kyfwmx7quvmug9mukodmls0j2pbbg',
                parameterName: 'ubk398a69iz2d43umuwb6tibuci593zkibpaq086t1o8j6l7si0p682h8y9l6pxs8pmejpgcerpgdn8wkx8ouo4be5l48pxgk3unqx1ej7vvopbec26qvwjjx6pjf01ggcrs755g0sdvoc2j6fna4cv1aapylwjylpotl2mzvf35tdvkg08pgnuz6kahck35ffqdy1t8gx2d4wf056j6lhbn1t2put4wxrx8zh5155zz594hglhuzcappnluzadsk1xg6583qbpyrmy23adep3qe6tx87w3z1iro72efiseln2pp687dqyefm8sasv9e',
                parameterValue: '7ctljcdzgtd7dx894fnz5y4nd1lolzgg35xg9930woappoj9bw4qse1jeewa2otolbfl5zq9vohn0p7q2bkxehqtg2re8wdiqqtwwvaoyo44ugl3i523ynr7f0v40fedgdq7rap737lz5gnw8efoz8izy4bzz1l8xs4o8wzzgo7y0zb2p5wobgtabeke7k66k8a26av9qvqhqnw83asq2kxetihvzqepnhvy552xy7jtsfxtf60us1mnct6w0lq14is78qy6ybjgdv9tk5841yjbmmeuy78vfo78kjbdbyznyzfuwjtj3ru37dc031wg4dszm10hwx3ub8injylt1v5xget3nnix48s77nqy4velmhtm5xiuqqk923hyq3maslubgrtbryxiwgydevo1m8100yaivqhwuqwybypf3juci9z1cjyqtxjnup17qcud0svorzawxm0tddoe2lu7vpqcrmuaf1gscm4wfuwt652utii6ilfyek6w1p0r9bzakfko8cs4owsuzkovm8e8fmx7c5evo1dbo6k89pp4z8tz4e9jpfkfr9co9so4pj24e5ruizim6k364gwy03et5x14jcin9w1u6yh6ej3l8qoharcvrv1f1ds7xs0ho8ovbgwfbivjym3hzsu4zxlstr9mos5ufo384kw8tjjbt21ge70e3g8uogdwofhwqwrwbuk3ux2ecszhnh7vqwf4hsnxcnx6s5ul4dzdke69u2x5qffhnqa1qikk1bz0q0wivu89neba1r70zfrcpz38zhfas7tmago881z2wcy3w9evmurhlt621f69yvz4zvi0wg79pnzrsvw8mme1g203sh9zhhkcyhmw75enlwstmi7wfmn22705kyy4ar9b1itumvg5d9nvm8p5yhukjcjfxk6coyn88v299q0g4dzuiwt23dr7b5upalulhx24pferwkyfcdoz944hscki023kwunrps9y8yay6vf2i5cwu27x08mq4kuhrqwhkjxumri5',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'fr09xt78vyahiw65iuizlxn9487y05f8cmy2gm1ubj7fehwtc0',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'g9d3mpu9i8leu9l4rd7r',
                channelId: 'u3fdhm9cjv6q2kr74ksbokcuj5gbuog8rdmyd',
                channelParty: 'i25v5u6xbpcxpejm7ua4pf2cae21o7khcuoxw6232lx0uwfjwj47c344ud2jqk5tqs5y8thbh2kbd94uyhu3t54z2xn7p6necr3yfjhbspkvhzzhlfinyehthlkrqsviefndzktbz3l9r5xkxrag3ayqd70bgz5c',
                channelComponent: 'zmpdfb9sifemmhwbs0n20huzljsachgguuxb4nf755tszi0jjotoj1cwldyadl4jqkpxa8545gel20qnr902do4lhz2x755n9clhl606n9gz5c889dke0x17re9mjplipgb4m65xuop5sk6qzx03ctrv2tss5d95',
                channelName: 'epcuuhu6itl7dl4zr8mhzwobzt1cdt9hz6bw6kr6moklfk5miiggdcpzxkw5f24zmlg81xkxzqwc2k9xgjufaeun93t2maxdyv7d041tcuuti18zy17d0esx8q8c1qpndgoqczuv7x1ot725thkbnb1pqzaij97i',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'yyw6pdiwnwazu7vqyjubf5awankgvczd9pmgj049l3k2hm8vk2grj3z2pe7cgj5r21hbgfful3iz1ez4f1h2vhkmxzxtto1zgie2han5o4qqpfnhilixagokzz8f7smdavs9u2ftg65xaj1bqnamgxnmkfl17eco',
                flowComponent: 'pwklnls25wkrthck4qe9ahigh4fz7w50ej9q2ytslkfdpx8njgn6c781x9ti42jdsqr9j7kuump5v6tt5s18lh5s8jiyjvuksiha67fui1risjdusb57vk64qo64itis5m28petvd9u9drifxhlpjz95lrq84a0q',
                flowInterfaceName: '2d2kd7qhi2ik42tnqs34h8lqrp7hc30mixnv69kcmq9jm99i23x1gloxwyqokpozdqzkx0t5cl196d58i4sf887edkj8ey87o51l1b1j8ye29mope2ofi5helgyfpoyhc39tzu5kinmn1f2j1hs32x2yx9q77tk0',
                flowInterfaceNamespace: 'sv8ibm79jixzbwvq139gbr7fpjerwddanlgj3zp3aapz1d1zbapcjd0g57o5zotw5pywqoq1j64rjg2dl17j793zlyevipcmgnn6qvmoqqkm6b844kubeg2gze5wm8upl9pzs7o4kuvh1z0inzefz6120wcowhnp',
                version: '2cwgynqe8354cffxq13p',
                parameterGroup: 'qvwsi2bqhlq1f6wguqk0b589w1iz6nfjl7dlcirub1vsk52dytjlupwm0lumru570iwlqv70o77co0qqvb8t7rnj179l3mv3b1i6nro1eu9jzry8ti86ict8nscs0p6jqka05110rct47kucxnbcamyjwq9wykoz0czuwjnsrktqc5auwyz6d5hdh4hag8682cw8prbc28ghpgzyb4j9av5qmjb10jsszi92ro6z5a8ryht5196djjf9aam3tgs',
                name: '0aub4z14lpo2fnmbx3uhfxx2yy2lo4dqrszqh6v2x8h0smn8rylyr1n7gfi7vlz41eq5golp599pyehu8c9vfve9txl02bbtye7pxfggiljh3y1t8t95xd9ioiy98h1kj95gooozc14662d1srah9myvttzk906s1c0q3d0xnovj5d4w3dc0h787w22pwguor29r3bztjtvnctsax7x4el17dkbhqy6hm037rk435cnzgogylbmgh4f3ez7k0kro27guvuibdge57fce7iq5tagp7f7aoeca8yqgszn2s1764uvmchtev7iwjljk9qot',
                parameterName: 'x7mx572q9ktcybrsbidojqsyy287hrb0g5hgxw7g45ps2j0w64qe7cznn408gr2dxdtlfbc0uh4ffvsg7jr9uuhet36ogudz22lmuvoo40kfeylkplvd22tkeez3i7vy7slrls7bpo2dv9oxtyge0j5a7hnwh8pioi4y101b8oldfn4lp71tdxjc22yzblo4ps8ux7txws36j9by7ep1196koz5lz1yjgmm2b1091p79n4fl1x1au0rg0k2h9ab2v79a43xy47fu8jkhlug764hvbu1c9c5xlwv15878bd839qu8px71oa8sumprsa1i',
                parameterValue: 's9cel81hgbbgcl3hrwo1560p7cpi45jx3me2gfbs4excfjg3et62ksr1xfj2p6z77f9rpnc7q12mcvey0qpk6qfn3bnlwpbrf9afy5r7ev91rq89lnuawbf2e58tbm94cs8ub9b65yd8wz9gmn9eu9jx4appetcbpd0ri74bwhw4l2t84hx34cbk9enjd7g48ftedk8h6b6lngjgicghj0myjx2htbtls8ime3t862dztwz31d2cx45q796ehr5saaf5hhiv6q9xrkrlchhh2novz8ras3ywuwzozn0wl9qlyq3fkb8q5psz0qlcdxvv1mhph3cbj1cihwx16q3d4urvbi617nutvlqzshbyu6nwnc6qyig4j7afar941gek5rp39wh8pet2tfmy0mkrq71pfia7xiwaug3ayt663w3qn2bkfzq4o7iett6txxm9cz1w1x9xpf0hynqk2z26f5h6z2l01r55v3nnagcna1sn6ayt2b34ktodw6kstdty7r9zmv71tymfzryi793g85kiwrg6litcyukmdfoenq2qyx6zbwojw2i2oqsttwe0hjpe0uls17ktuhorc66g2gi9vjnrweiuhycw5m0non7sg0aydphcq5f84ifwpw8ai5u6i9ff8hhuui28hau2b0u8q3zobg2towxbn12og7ml4mudddrtv85o04ad65ium3u6qhgx2n8fo6a8x3t5a6gml4adt94wp774e2vfhnzafoscc2gskw98t2h65vg74ebnmmbgzira3g1v3yoac6tvdi483ao60xs8n9aa4rtgmz4tdrcfr6r4jrkznl726roobsoxv57i168u8idi6lcatq3al1q1a6hsdff6ubxl6s5g4t9n05gx7nv7gtlnv12n4t34qwm7bk4rpzx9kacxcbrtwkmxk187zvhfir9qr8gzr7ykqf6hzxnzrwr0abepg72sps32ercl1h2kr71owak0gztbbeiiwjne146bovigfqt57qmtzyh1xiq1',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '6zkzepeew0z1m70lpeec8zolectx8hjrunqw2wzcuweepsvd6p',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'tyfsb58jteq7q3i50duo',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'muwv8dghfcvuigb5g1lfzialsppyw4p9azoxmoedabb43e3iz60tm84b0xfio4564c4pg9ibp6nm5lhet7iovbvb8is3n8l4uswv54ohxfj69vo3zh6zv16q5b3je7zbxl7p0xizluqayhkfkcbhlhs38g2iwbah',
                channelComponent: '5c8ju6bmf9dxg7thmthqvueqmzc61e1vcsh3ayrlhqr6vaidtb6rx60gvj0q2h4ewt09r7hxsyhc3va3j3y7ga415dqff6ninx5h8srfmc7l6xf89hikon7wvf3dylbfze8jrqsb1krfoh1kexo1nbi3758dfezf',
                channelName: 'gsa585f0yuwlccmq01bkhxpdzv34543n3qg4wiuajh11w89fgny89y3joj1ev6m58lixc5a6wiasb6mkdbxcvte1w0fsq7x1p1lzp9lsayrc9pjz36ji8aj91l73yiaavra8zfvo9kzvuhyxy5xaumxr777wb448',
                flowId: 'g8y0ypd76fzl5ju75fs0qky2mwxmswhjkaj2i',
                flowParty: '4zcqv1ddds4mr071zd7ljtjkw6srmr4r54b5ltkld5sv35h1xad78n2dyogcead2aq7ybli25rxdd85ogbg94e9ira7z6xrsmfxy18nobhem0g7efkzib10xxdop1emdvwesjyeib5vroo19po93c74ygbklh1lr',
                flowComponent: 'h93kqmb0hp7bhowa4001g90f1ya1mx0e6fpmd9d5e2savny7c4d9pfzrjlo55bipjv3hn7ujfv5zvaa8540ulq5fuvjpqwpd24lq9qf8v1cqdj9xhe1vugl52rqzjqjguk0g6izfxdh10n4utyj20q1wujymcihe',
                flowInterfaceName: '0twtq504ftfxgy0njbz95ei6yw1k8e33o2bmrqfqi5mhs0778oagwu33fg6nmdunci6evhmh88ddtzgxn59jzx717t55i87abr7kzp69rp87wpvv98xtnx9kqb0bomhg55rqwwaaycmlurjtt0sgh7jwxnw5nfxm',
                flowInterfaceNamespace: '8yotfw2z5yudggxpcva7t6fap5hptv4iw0r0q6zp1615prrfku4k9vv3dn8n668puz0o1470zkrg7z3tj6lgwiiqvf1bwcuwp5wby23plhu6saxz6ztug4mesgirckxnvvy8u5wm4ktmgo16uoyk2yw4anwqkh2p',
                version: 'kdq596ld33de0k9kcm63',
                parameterGroup: 'vy6zt0f78y2f8v9espaus9k7it2hrzbpzu2iy5i1jomi1lnczscwjbu0uq8vxgtn8cequ504hesqpddnmlah7w93mhl1jeszpvzh816n70y9uhpdn5pcv6xf4f17udrofmpubxw5o4r0m64embyydif78oxrgall25wtb48fbm9kts2k3h7qgqo9zgkjlozeyipvfs5g9xnp61umhbepvmefettxo7iz6vtf6wgdeetjfym2ug2z97emetiol7u',
                name: 'n93z554of4k5l29mm1tc7fkmfc8ca51u1w2v4vf66hm2gwnv4wjg07b39gvdztnl8oddx4ecdj05vlcx1pui6muvt8voktudqgz5pq7nsof4e8glxaqyh2xkzh2oe2g89qxzhc8uddhfbtqodv646l3l6lw4k9o1auxa43l2nwy8dokvzl3jdn4ji5dzsv067az5k6m4jsxosm2z4lfpu0e6jv63hdibatgsuy2qzyzaxvfabhoo3b9jnz2e83jib2a3x89equ5y1u6p0z45gmxp0l95wnhk2fa60mnpiri3emf9tfp17v6er179dzfn',
                parameterName: 'drnogw72b0bm1wcq5xpuuw1225xpuvu3zpjkbi3u75d73s726ksl0fp32xxd6z7b45hppakjiurlbyjl8b0lomvcvkbs7kn136127n637t26e6yqsyahw582uuptd0wn3b6ldbuj99pu7ci3ivva1p8f9p5grrrom487p8vj7qnmpdwosffuxawsar8x8mmja1y0v4vy35dckbn00dzizdqid849cv0bqwjiausuhyflsikny3xh8s91lf14b856yjiyvnr1e8o9polfbwkjqg49n4ce7yngdqqw8u7oqx6tlt2ibvj6h9azbj56zi23',
                parameterValue: 'e0ih1qs6dij69ylew1luqs98ib0s7gjcpi3vsrpensswwuu9thsdta0uzlsohflr6mxsw3xs3yats9i2vunqc7kn4e4g6yucmjelma436p6h9pzmp54qfhmfikwn4ukgxao1xazoeh51k5wklzi4b2itx3mamc9m1ni37fjqnzwhdnokxp90watovojpctf2n68680kxp71z1nxmdq8jr5syw8ddulm9vt235lzxdnpzghg16ug1gjvi1vjyw465crs46lndm12en0g2z50td1ncwcf2ug1j2ndw569wmznitshns9f187z1lekz7xg0mnb5b7x23xnqx6d0g84q4lktrc1chsdbtbkkpkv2ti292r6i1kxfxgsvvwrjvd2jsyxcslrk0lgpd47kjhydt8696foz8gntm62dcqe77pgk0hni4o5y2sqyawpjoddutlc5ouu7dfeurr1zvozfewgad4n8gr50kf5ldcu7mc1txmaz01m6expiqfatrlruhxhwpuqdw5t3dm4rz214c3apx1ntspur53rt0w7tyxum1yhj02glhurl0ft6gz6xuyw9ll4mgazkz51mdn66xn0qj2vxvjb37vugnyz1l8vd99y1osw9j1bpoqfkfxglihm1xvw24xqvob1n3gig8rhaouu4lgy2k72c6z660ci9jpiyi7102b2rl0oyt2rqmzet1dbyu62bqhwab3wa4kjnooxkih83jiaiqddifpjhpg46owijefgh76hyud94bood8g8lrv36hv57cfqrlqwal2skaaasbf6ygb5ppej2un57oepyi46r4h0zzudtgoaab2blkms130cpkkt4r03qy2646zlpql094pmkpyywwhpe2bbj3376ue1rqxxahvsrr24sy19gtqpzkw0bcqaa4aqglb7n2w31o44i8fbawk707kkqferiwz5dcm6dyzwuqu2m6q8zpqbec0alkhc3wjadddpiiw749gnikvmtmngmuj3ns0uvkdy5m9we',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'jkw24n7jbk7abih828d0d3kazy78ut1srty9fw0d3hie3zit2g6',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: '3eehixxbhoze1564k1vu',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 's9ex3i99z68lh038xb48ozswlomxhg8krq762nq36zlhd1b6xif61144jhs5etmp2wg9k5wzh00pw4sowcpzqdpp8222fxfwjgujdk4k5cr3vz89pbv9eyz0i5akoyp64ccad9hyotrvicud37qhzn6mlyo8fe50',
                channelComponent: 'xgdgqckmlsgsfoksaahq9pb4jvrl9d9srgcbkk6ena22canfaefookkqafvy5c3iircikqhcgbol3g3fafylc8rkfkhj6f9xzr9230bb6cod7wf1irft3hx4r72dlbqycqoxwg8ytkbdcdvhdcefq82gpay33got',
                channelName: 'lxdn4i650gslt5vbxeganbpklolamb595glg69oiduvy1321l0dqa55qxx2rf6e2s8m6umxkzddnrcoo8bhc3qedspn8ve855hsggndilvqqeborupvta81sdun14mrao6j8c5kdbxwd3tegfc0mnrob94y34stq',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'xn0fl9hig8k06kdfb5ccbfmx9gvf7t51iqkjz61br2ak7243pa0zxd2ti5p1nclwvcs1p60tt7okyu3jy3geg2pci7mqro10i7gt87mr3sbyrks5monlrw2qa00t8zzxwcoybxyl2gcszqaq5p3d2z721sg37d0u',
                flowComponent: 'r83qhxypsq14ul0qs7tuc3r9gw3ukpb93de2uv5h5e5syqyj3edbacgdi4w479ieg65ycfhdfw86439vflljxvls3se6ue7e0kt3pxv3sbgkkozh8ol8b2q6oscal32kfndeov74ali02000xgdf098wua3qwbb9',
                flowInterfaceName: 'zbi2pfyg74wqa0xnjvsg6bx37p919h6qdjed9764h9bob32zsh97juzb5uyfq8gy7s1tv27ehms68j1e91q3474hgqfi55q8u2ancyug408yq1en9onfcmt9e8ffa11ypydmzdaqf4bmyv54i41wnycg0djekfdc',
                flowInterfaceNamespace: 'bsb4axas9bpl0c843u6vs0nedu3yqt8z2o0vh1yumr0eaxuz1ku4cikofooe39rgl32d35wyxz0gfyywn9drd25fywf6m5dyyczmbvj1hipbaosambsiz1qsrbsga4ly5clrtlnw7v8hhyuxqhbaled71fjgcx3d',
                version: 'h86qtjeqjctqc0e0ub6d',
                parameterGroup: '8gxw9dzwioowity2jmvf65cudzvim8o6mbuuirifo38rr8nnp6hn16g4vifm9qqt6nux6e91706zi7yim64xg60e0us92yx1ji8oj8j5sq0dci80jjxruhyv3lz1013olaxu3aacomzhu6hg5hs79plrxhs3hfbh0pa3oc6s9aaxx5jfqd1ujbzzic4nn3r35zl5chwvga95hfziqwfiwmxw4pqtjtq8cu9ai9rw9u3sutvqmmn9wqofoz942zm',
                name: 'dppom5bti4mo346hrbbrk0w38aze0dp4y0eodhkwqzpf1f0rzlgqms9y2rpchsebzwqpwmo0709pzkqe4iokt8go9ut4t7s913vuqtplk2f310wwjj1hir8ic1x2xni2yprxwk6j48bpip9ceqbf2jzfj4l33b1yhljyky3pafjzepjoe2dypaxdr0rmt9704m2u7wpsv3otqfqpqf07rudwjk3jqopwioborqddz10i5ky5l7thmdq9lrdnmt6w2io42o9vmffwav52kocm1f6ffdwfxd18ql7kuxb28172n976f0o0ppnqvntfa6df',
                parameterName: 'refvdimn3rafngwjd6nmt4hpbjn2supckwpti1dkhtum9k72gcvf96zk4fs02gjswp0vkn089zi49yv4hss3oa4t4smk8ochq6eoiad2st46jukgljtlb2ke8xccmwrnmpq4cygfgwugo0ts46vnht92c7qh7sviurlf3sl5k4w8xgwy7lumshjhk1smd0irkni4588cehffm0pvudqwvs9zb3pheddjgs6u80kl9t3ici1fonteglgmodsgifsfkdqbkn4r7drpbjbpz4m6llew0z74riwonefdtkgffwg4ng9tm0fkmn1u1u9fcf78',
                parameterValue: 'j5jafh4i29d5069pl1byvp8y9w5drrwm2wz0e7x6m2puvs19jyt0h0beh7u6yjbdz944xsfscn7cp7rq6wbl7z4poo938y1f62n1fqqohsjalh8kgzmd0btnsrdn7ta3l89efz4zl2eygk340cn9br76y6wugvuauk6do1v35d8g66ei16tpxglwi1jhvwpqex8hhus5hyq8sma7nvq4hfcvtevrk25of7utv55dv0jajkw4opx9pr5f7imawoivoe52jrm0vvh4zu5xbiya9yiurrrqs3mo13d2z3qr6k0h7ynmk1rmu1g55h7oymlhcpkzglagr7ufb7ua1ncql3658os4zh3mqkkzbffnubxogar7m428ns7osu9h31ph3zlbfmmys8r8yko4cxlk5tz6wbj67v5atmi52nyjt3idow77puoe48jem0mxgii2av4i0ec28diz5lgylro6btcposnyq01byjr7u3pqyo25o9hroypon48md243ivv9l4s5r627c2kr4yg4iehk28d8dxy59bjy2f9hskqfoklqvho4hbiygvlhwvsx8typsljf7sc3tsadudk7je46fjfwvqlbmc15zh9v0jocgp44p0o05l6itqsjafspyyyx4mqzvssaooxekkgsbf7ou7h2km72tqcrmupc5lhpixldlz1uk1semc72jpe03zpgicdyjybgdjr76th1jkq6jnq4zmmlyvmtuay9jqk5453un8vp8vfjzzz3zugma22bdwmvjcw8xsrm1fs0423xcl7brsyd085tt1qqr17c1uxuc38e5f1a8lx2ynuuur7t9sqn6f5p97hi6yxrtzfcdeuvklbnwgrt6cg63i10w993d13ukqm0s9cws28xi10ef05s51z0s15zi7m2zzl3yrck8p36u0pbkjlcvqh8359ldg0sj0ah4jipx4bouyaeol3dt1rvq3sqpih1dpd7ipnkihn0n66zipuqfot1fvd6o8wje199m1vg6k7pprpy',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'mmf9ajccuscqhqud4r00rjerltv6hp7fhnux5fnd129e1qow6d',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'i1be2dwxnxjxdh5s6z5zo',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'j4sn5qqmfi46h7gwy9dxhij750akc0aaii8plh3eb0592savx4r0ephtlc33rlpjtmx7ydjw3k7p75xzfwitvfus1c3qghxi3q449m33hs0ymyacrgsrd14t53uu67oayxuh10cfspkzlrcbf6hjcb20q1u57l2d',
                channelComponent: '9aktn7d4w36etfox7kytvn8f6fcg3fl0j0zmzbkh4sd43itup8upaf1vtfqsfbx3w6f0jh2gat1kkwnt2ngkfu52u8nmcpighqmse8byksonua0c1dzlhhj5gpsih8468syk75hvpuyurcsgdzl6issw5xjzicdf',
                channelName: 'tqig3ndvzzacqm3ch2797q2rltcoqvifnle1657lmjya1a2mzy23yy3hvbez8p2whfrcm9zp8qiuip9o6wlc9uxcqh85iqhxu6s5cy46arbdxqv817cv7m86mxh7922g259orgurb3bdzn6dzgbn3a3hcyd0rq81',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'ubtj2hhg17p1ih3q3miba4yxdy00q0o26w6csk1tf4qqjpf9idr79a2mt2vzwieqok9po9tlb4joktbzsm81ca0bg0rzckbfs2i3qi487eehh9ywy42jaamjklkx6iyoeekafs5v8zm7ku8imfao6bilp8k0nu5e',
                flowComponent: 'pu8envystdlw9uleulyo63ibw4iunres39bkcqcaokdke94pt717atc5pa2c2x5ubb5ftnkpel6f13vus9mxdjyn3kjup6ie3ixkftpupst42a298orsgb5yzc4kwo5m0vn7faf4a1tanpcs3bpxayc8jaz38zzs',
                flowInterfaceName: 'je02vx1kkbceq9dab237pgxdbzg11018kwvm92d929p2zkb8gk0vfrz8hlozy0uy1crbit79zg6jvf6csggvjuaoy3vt6h71x3z9zda2y4jzglm56mtgx0fic38ii4d7xs9rpjg2sppubli6hs92xuh5aronzrdi',
                flowInterfaceNamespace: 'qyiz79aqgp4ihp4r2iszxx1kg5mt0g7kxfppfbijssf80zcotpy163vmr4b8efjswz8510odere3njmh1ycezcjn0nwbx2in0b8dzxlij5vf9yyqlhmcmkplgnul11pjmntb7ghfnolle0jyo0rdbpog48i6ovuz',
                version: 'ob4zek2e1ozbvp2a564o',
                parameterGroup: '7jei9ewa953l9jyo1dmn3a1ff584ahth8e4ohq9diroqq94b6t3aubbsqssmh3p8zl4idogm23g914ogykggepse7mw8e37d1kuci1ygp6w2a25ed3mhohrplwvmm60uznfggbslgj62oxtgfyh0tyobo1kr29an8dxhw79qn4r3vmhoxhsdw3wht0q4mcsyprvkhpo68z1tm0w2j5fqvb8rkhwsd9zebww62at1v6l96wxvofn0ut2zdfty6at',
                name: 'v9ppon7skcza5rtd6xcrztz4jfn194rw9h5u4492wzzcecjkhs190cviqysfksjgw0wbc0i1exwksep3xwguejlxfckdd02j244igir3n9ulpkygsfl3429ouqkf5zipyt507uw5in5ors9pbjjgtevmw4ey1l2rs2ky8c0pgfjxe1gs4xkancdawbcbj37rk44b9771riahux7044dbiqq6792ilz811y7fi9sa98afqbmrrjt5xgrf4qrgerfdys1a6krboj077u555xpo45hp3v8pkbnu6h5khaqs1qjjajkq7c7n60o0oovv675t',
                parameterName: 'sk9rvidep4i2zl34fimrec22w6qg9qy8bwy1lbfqgkcl9n0kt1zqnekxgtrxa1ainxdl6j8qac6deyhthkelfd05cxhlzcvnfydiwhfw9bpz7sneaduwvj5lgdzjqhrqd2effge2dfiz27exyd43n73xh82vkbqux4wryuiod6f6nbfbhr0aebmf1zpz4ka11ng8jvrn369839l6kobyw0bxoohnx1ow696sd0mq64x4cswvzij0tz8b3v45q1bc1w4zqebqmn1cc1w203rblqxwv0c0n3r498sjmuss0syw3up7xsdjj0g6lzz7c0pb',
                parameterValue: 'lo93d6uhvzmnfe92rfpaow20c9m2m22ndiacad5lm3mxjlif2tna4yb9oi1j5x4eiw8leh4gb2r0tzzplh4bdgwtmrfq04g0qkd5j908plr19t7vzinyg2812fyssrrl23l5qxrc7orgp8ux8k0m0qm10agjzfvs7z9n69k059xw7748epbn8pyfv4sy4j6icapp41wiymg1mszqgkarcz3auom2f6dfqye2hvmm7cxz36cs0n1bmkujjjjxrqhpa00838olpvnw6sb8kk7cmpkyo4zn70r6jeg03vyqh53s9mxe9cs3caeiflcc9x4pk96g70aenawm50q71mhf85a0tq5wi93ulspak7n2kmhwd2x39e7ywif7evvf1859f9o4p5c40hodkk9c45o7cz3ft7hyvrh3m1f4xo2tr695jtetp2l18wfv9ork1oia6sqwzdtzh49x7hnxrhvcqcsu8et4owsg7wu54e1jg5grrnf394y0lrw1ymguatwumyhbsg7gaut0j9rxe9hpm6lsmvdq84at35qyyljw5cdbnyy7mjr826n7h9k75sjtr52fiuuqfkv91ynzfp2l6nvjhwin2si9uq0v9cgo1yyrpjuwo2qy3tbhk74g6mhzcarmy3dl2f0ewxmrq0so31bxw5xmlnou9wqjsao76josrwu49r341pfbg8xtuzy0t60y4b1qviu54u9ji956khvzxv9sdo571x3u7uqxg77cghe2611a9pwgfkfvm81us8beprzdalppq6zqgik4n8mfipywt0feziimfyqlbgs32saiu2a6dqu0ry2tz6sml82ilpsz909xwe1knyip6bnbqa9pc1ktykb875piypynwalvpxrc91qo6cvzagourmqoovb66l1uogjsuj6r7o2uwlzeknhk1gpm8szzdb287jxpwofj2i44y1zagerap0lkodhcm1qeng179c478dji20kj09z3g09euvuc1xl3ghslwfgl5utj8dr6f99i',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '29hgkbsqset5fok4qjh46udzease9ohbj12q3jx5g6kfqv9mo3',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'rihin56etbrf2pi3rwkd',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'ik7c6cyn5p5zquwl8s5vkqr2gaebxgp2huksd5x7w8v7jplyjxhnlpaz6erwclkzpz3s8peskf455rdq4v6zddfd54onkxzqg16v968r01sqs7yoo7nkrwdwtf2fpgtt9u1wr9yblkdt1xulkrqzvgrdu765x1sty',
                channelComponent: 'g47jymnbwocudtbplpj6l3djodrcvhq261c5t6rmzeb648mwtn6dffg1kougbiq67tob8912fbhjeuuhm28518ihjeiq7f2jjbi4yyyg9d19mukd6yfsefa4e1i9cq6mkki23mih45kmvqbmwf5dcjcuirjrc49j',
                channelName: 'wi0aazofeomitwzum2xt1j9up7q88bd812tsazc8als0g48i34trpc290mqqpemm3qeegzemc5byq5a3emww7ue6210czb11mzaempg3xfoyipgz21pxwy1jqvv67nb53lz11aep6awxon8xjsp59xsfvtgv42z1',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'r6z05ya0gg0pj5wmc7vv3xtf9d1g6ov1dttab37z2tzni59mxeu0dlzw6c4ohqg7nwi145wuiuqyjlzcdo42v8rkdhwxqa3f6y7dqz93le3ou3gdn7m0nkuhq06eunfd2zg3hrudwtcsbr1bwrj923d3usvwivu6',
                flowComponent: 'db6w3btwv70oy4x25ssff7nh4d9ypgthj9ouftlh7q78l2cmqrdtof8r4hryz091w1kgm1sb953l0tbadggijlub69ayfkztdi7sxag3in0nsqotbqjjv6hstc2oglaxficfvs77hf5jeizy31pmephcm1z3ra80',
                flowInterfaceName: 'jwyuktfkxp8y7etcyjy4rm5onywt9wsb5pnxsxkvyne1w7wevkojbz909fzvfvmtoxgf3o2qj057y2c9x56vf50qanealbz57qc1t2c0afzlipa56hvktwhv1bsftx7hj8dm8t55be7yz147mtt2uooeo3xigbkt',
                flowInterfaceNamespace: 'tq8hx1lpfzrc29rs6iyac1br8oaqqhkbjymg8u7wm8yao47rh4tr10183pmujxgeqrrgudv4eszxw2mfpb3dqex7is93mgfanq514gnved5mxu8mpuilu6ypauqlvuyujmh4vbba6u6xeo4q4r5l8x8ekn5xbhci',
                version: 'vte5o27zhs2yop6hzg1h',
                parameterGroup: 'h56p99jynrbg6789tshwf7g7mwv9qy6csmkl8el0bhfn2n6lf94u7d5crvryd3vc38c9mumlh5loul75v1vvo0pebu05wj5jwwr17qwv3wv87x946dfdphpzru4olcsgb53vxo6nanb7x7xxubqk53ht0ykpafoa6km0sz9b7ywj1lb2lx98deswyyko5f79eqjys6sebh44s3ho4ylah612doqrughy1aca82365wpagnq504dabkr9r0wz1r4',
                name: 'ox6ek84a0b728h8wnigsupuvq34gmqxcgxqtm6rsbp2fuj2z3p1nxxs5pmwrmd9uf0bvlr9n9r0nqi61epxu04yqwgjdlx81mq0yriaeazfurx2mjzfbpxuhn3mx89ggxec1euudgntmwvy3zeui4ik7hqneg4tjqftdrkue0f56yxxna1fl2l8ybbjrzxivr0pzkr71pyq036xo1py6pzqwylofw37wy5ej8k12rd2qhpgd69v20nr7jsud72wg8vw0q34mojvkop1xb6uhiuo799bx0bpmtxt2m8cq65qxki8jlnfpiz6dju7fbewc',
                parameterName: '17agqdn6jwf1o2tgr175c04gmjfq0jmntmhsh1jyha6wr55rhbjjie60qmft1kxpjzueklo6jlp09jb3hyo0eak5zbajgwcydiuiec19v1odyvo3472pb7uh5qpfxz4kveuhv53hcqxtb96t2vhd48zbv0d7lf5qfvyqv3kduc4zo1f6m4arzuwk1n0aywuciy35szmuqf63i544j43lbuqa0kyejya695s5uz5r8h303bx65xbktgcr166dxpr3u0yy4u91uowg0qjpdkps6cqg7kd6plhx2ifva6akhqafadfmgzonwjc83m1wu1bx',
                parameterValue: 'tbyunqtdqjaqe4d6sjjpoo5o318n7ww54jl7ubmhtsynltca2zar8d3p3unar4ftra8cdrgtask1y0e87v7d30q0m72ck7reefhpviaszn5nknfjdrqpo2a7gbm4irwpepueei1yzuj2rqlzfqhlbbm73p9ukxb96wg95eeiamjd2qqnaq2yil3o9don04zagt3ylje7e7ueg1qjgrxddy4ad2qa1g4igeudf3282zcbxxnbff7xiq0ak6vrqg3w5c6sg7i9ccljavme5o4sxc022md5bi8swbx18db38gc51qb445mfxfn5yi68nuncqljixuf6yvsd2vml9qltyruvonqadt98mzjyb027pyw183fq4llk6b3nmhy5yrsyvfj96khllyvcql620eo1yd2lxsl1vs4j0su0nqliqvcj9pk8g1m9sitfjzs8ul9knm3wwt2cdwlk0qns63t37v3vhcoah8wnx351cj8y7hvtunixnf654v3j6lfqubvuthmavzzi1q0av37ic04ydwq5se06tjlwjwweizlo9t1iq6xo70y8kn7ls0l14c4we8b62u4n3d2yz088aerxk2yfdpd5u5z7jc0nx0u5aupestgleddjb6v1d64t1ycl0tt52koon7r4ah5n44uiaka5mdi1e9c6r2uxrq0ucjt7ppzcqk2wgd2sckdjckz78bnf7w0lv5exyl3uc67y94ywyn9s5jmd3pl97hprej3g570cuc67ygfiwvb7dn0hc4cyaazp17sit5v7u8hfigkgw4hgkb2v1x2t92k89v1j10rh8qq8921zhzeitwaylgpzm0grmg9j37uv7ioxp28tbqtvjr0avzknpxfo74zbfh2nzmvpom2x41x3qy1pb4m75dyym9gd6soc4my38q6limw56wyn4vz8um4v0qf9wcauiimlgrtvn5wtgrgstnc3m1fe68p2hhcdnbpo5c3zwwatpy8pbkfboeidbe5bvmaf7i1un8as19p48tvw',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'y5966y12mma4lf78mzziduc48bod59ok5yc8h5u3zey33p8rte',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: '7vfk72fylpfgikrflped',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '07cahv982hm2gcernwrdcnnaqgli7n52kwzttdw9b2z0qtj686b29lfi54cr1nbamfqmbddazotzv94hvl1j7swr7zdcwgt9kope4v67fvpwl2ac90usgqt4m1xumbqqoxmddhxe7z9wnjga2132dvfd30ot23qb',
                channelComponent: 'h8l4epxtv2d8jpcu666igqmof01zvlyhvd1q55lguyfl5xyqftbifk0g172irlfg4o4icolza9j7xzm2j3el6f3oad53y16vkxiq3oyrett9qxra700rd5yeks6b0c1xhzjeipc8jhirso2kmgwn4nbyulzb4xniq',
                channelName: '9m0fmiavtdpuwooj9z99ht47f1i6xx19hmlnhod7cd7y7mdvo9ih0ly1fxvilsg42h7nivbdtzf3ajjfquksfs2kgjtssvmtzdb5dq76dnj76zi52m2tg7qm39tthhas74q3ob8f1yx5ntbtemsblwgukuv3hdau',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'w2kwao4owuvss8cnn26q6au3yn19bysz69jamivngai9j4k84j74g5c8gsx8ocpf24qdogfgolktq3ebhe0oxvxntri5rt77qyeaqwnhy35fahn7fcnobrt07qk8okli5npfodwist2ddjzqdcpezqs0amzt2may',
                flowComponent: 'cij9gj67f0mzlyygvz2n820r73ec4zfleruf9nyyxtd5n9fycm498rwpmb0dvhg76c2fe84mv50g1z3qdcn2dp0c1qc0twnurvucv6kmvp9kex1oo6bkvn267fln9qx361x74jc9scynmivqg6k6gad9qcftgb5z',
                flowInterfaceName: 'ufpo1528qr9j6vznmbokaq9m591j2ec7hnfp90i7opzmqhyuh9x8zwqzb6jvrf446dbfbnd2fecaxvq767c5yrlvg62fv7uwja2fcy2qpiiw20wzb38ynzv7g1271eixm3fmy4i5o3k14de136wwfk352jsfa8v7',
                flowInterfaceNamespace: '4tyt1er985769tgmcmlwr31pd89ebazeig5d2glrzxtmpuskynuxdwhpm50advvofr653of6drlzcnc6ifznqqstyjhetoyuge6surxwokf46muooeujbhsy607uglkcs9lulqhb08c53n2m0xv38wvhmsnffgxt',
                version: 'a9yy3x580lla7t4fs3fm',
                parameterGroup: 'vui1l4uymhd4va42li4ni6a6fdve4350aiy9rfo00nmh5hsme9c7hkmfvocp4fr5g1d2grd9d7vjax3b7p6qxc5qovsqt5diqtq9o5yekeqaenp5pumumh8jspciwem4hwuuh3x5te4z01mj770yzd69apr74sqomq5y2ywsrmqzqex8kkirjyq5cjmryjirf3h79f5o2ejiqse7i86061ukgpvvvvpf7taqd0y4uwuz4bv48q7qrtiwqr823yv',
                name: '3zd0o0fvtixqfwt6kjpsi5a4xt963w5hb51c6du41yx8nmv54wzz7fjosjgpffrw5ztagqh9zpk12jnltrfsmerjcqng67dfybipnl0hw8puix04db80n6qddekfd19jwoczcfmsvr13r7i4brz0qe7estwdofrx8ydv3hki03x2j5hllqldb1lmsv3eeaodogpuumg27qmjsdxy1dwxb72vq4l6ndcv2vvp4l70k7mu979k6rzgjrshkx7oiwdaxg3spf9g54p5hun44yr55s3ua7tlfp63exbz6hbacd765insubp7vc14westh5yg',
                parameterName: '8yidsyums1f5q7qm0vft4ayp5wjn7qrlz9zvdbew06v5r9v1mdooxa3zsn45pdgbyayayflh5zyys26g2jqalfv3wfejeqio01ftzbt2gtnlleb3lvhbzcnliso59ggbz38bh2kvsy5roxxfgz07loigy1vfrqrv3j5a4o91mmfubkk26ts98al2c1poy8af1focqlo70gpinqxwqssotmk1zdw138taqyxafzsmyn9e6dy58iqwvlf9nbotet1cd3wfidzc5wi1l9qeu7ieqbxrwnbyrgtr3hllugh82047fkvyipxpwm6c0h4lfqvf',
                parameterValue: 'crh3wcqmgybexgwk2mts85y3tpus8808zwd9x0d7v6bo9w40iohf5zlkrucrlfwgqyn28ut561gt0t922mht2bs64tdvxpocx45heobaccmhq7apgvftjfdurkkksr3qbq7hujeylfmudlnh75ox41cl6d97978aqc7j99kilqz4uporou9iwqae9qd4tgeqzkd1616zyvnio9xbz8h88uk528j6lylagcbal0os6bfy01uatdruiz1g90d3mcd3wfj8772mlmbd17mt3o6tbky96ezfn8v1m2kwqhv80wgpbfz5ts23fl6dsrk68hziozceydpcufo7xfa13y0ttsqjp2v8ph56tuob385r01m6xf4ag2ye33kgsjr94ba42ycvtaplbbmgm6xwpxyxt4ea0omtwepa6rgdz4xxk0m84bsg931k5qgtpjyruxvh5d15124sk4ms99wckhp2wcu9dccoaa71u86dzmi2ynl268veiiheec379psnkugvoace24qzpb1iuyzvplerur871uc1cvnbsn7tf74a9lpewvs7x79avheif97tut7ashtsn4i539cpehy6ckmicviwttm80vimpsp3ia314527hxy0zbspkyicypj2o2ipjxtgzmg8gogsiv609kow1899rz67i2z1bqxf4356iuk51l7h76pgfxd1zrevnpekp4yrn9jtahblqbpjtv4ifux8h79dbon6attjqe60q0qko51n8u29c5gktm1qauyt8v7x53qy7lmrqqs7bsqhkrf8vyh7aa2fxk0jvc7zc4llobkgkms0utzuk55hyde0h3ls8015wtldem4dh4nz2o92kjj0za4f57ldoqexdft48ic48a031q8uiuwuhjbv9825l21bxo7rd3cga5giajwgs4mxfmflz5r55bxs1q2wuxvqmnmeftyt64fejk1pkbduujfdmsgt7aokxs16cymaf7eufnxpuedwb1582fboy6k9m2i476m93yozvgly',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '46zmg08jauns8wlb068lqpfujtubspl6esblwujklsmvmklukd',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'rosm6wu5ulytkxi6nhg9',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '7543sjmafbxw9z7se0riva39mkf3r4bu3081gofwqji8diwg9djoj25ye3433u6rv3gpmcuovc575u8rr62vpi1c9tp6fpxfyoaw6x894cb6zu7qsjdglrgpxuoqyyu49puf92w9cx189wcb9mo1ko0nkpwhdc55',
                channelComponent: 'kc2bs3gu79lmt6tsn2thgnd01xsla6hwdfbmya57va1qlyanrjkux4u58j8b7vigcmyqepb4su367z75r2oadrwkaa2qpsy00e4w862724aw0s8oqr1jekiayvegtm22eh3lqc2pirabcuw9xknpfr9up4gmeeto',
                channelName: 'g3n08trrgp59mjr5imph1znbzolvd0otbakt96bk4p5serl4swfldkwi599794bcfxqabrygoi8kf5h8jbjduup11impz2ep1gsgqfatzk6vh2ph7hwlixcjydqtg0up0e7myg5hpsz8aki8x0jfhwqaj3nf8caq3',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'i5nytmkpjwa5memg0cfsy28i3f2iilwdrk1mi6sbwu5gf430nb2fqwigwvmnx8oiyyvfegmk5q6sqb2dnto9p96hk5anywaw5e7brvy1vsx0ro2wjurpp7zh46bg732kdjeilnxj6hwoh2f5ukmxv8ij8b02nell',
                flowComponent: 'rr1flwveuadb3hv138gwjh8mda8tcafnzeijc602g8zd6g0sq0ubc7qgyjoazc0h8p3881yvb5s7ap9bre4ymy04zycjgig1y6zwvi9yen7jqtou4uqflwrfsbla4o4lcj3jnlr8fncmo6f0g1rr207aed59k4kq',
                flowInterfaceName: 'mw3tl6zok77lonawhd512o21ts59c5khh08n6xozwxms8g3sjajejwt127x18oy56j3ag0r15ulotsyntqhohocl0wxpzkx0wkw8f3sddmqcabt84zs1el7p3eq2dtyez7ju5xm32h66v3uq4dkux539lzofnqyg',
                flowInterfaceNamespace: 'epzgbhgynt2xgfwqjfdaj7dbdj3x00fxldy1pozhihyuym3rx1y5tov4lfusy4wnfcqzy3jylanvwlvycd5bqqtjez8d4k4aj919yppp26xtik6i1h4qu4yt9pbol9ht61nylfqg6uxy88i0g3uv70xlc5rs7iy7',
                version: 'qxpnvnoy4ajd01rtofo6',
                parameterGroup: '5xq7pvaqnvcsyk29xoobruzrldkwobfygbdimgoh59lg21ctkapymq5kc4hqa1ec3q3cnx3ntrvs8qoi82q9r431skmbsav4mk7sew7moftbd07o6i9p3gk30960s0d5inf5co1575fz39s32jru0eu2ozotf93r0h7dfvx1vpo1w2yk2jexs2kfa812u7zl896q2rjvuxo1wo2vzu0inrfnugr9jc9rty1msr0iw7rl9kkr74yenhr929bok2r',
                name: 'as8fc4dkow9i35v0w209zbl804e491utwiyu48uhppnqkpa66leoqwgokmsh1z19vd40gpbo3u9f01vyviwj7p90e77f04we189dhguumkpxg5c8628j6vhtp1ie4mmiuq1csuumfijyevey018v32xatsderfotk89xj4a8opi27jmrm8i0t2lrsjscitkdy6yp9auzy8bq31rgwdcvugom6t7cq7906o8xtevoefzlhz5cim00rzzguqa0612qppfzl7liey9foz0kb7etuf4hnr6q5vadwj9nbf1jiifj9hbs0gnbv0hwwu9ftnje',
                parameterName: 'pmbv8l57c03jvffpy0au1sypclsv4ovkzz7ddfhfyovnu3k3je0vdkf6hrn1y3ihobpbrfxr2a62r0n0e54598y5ovkf0tndz2ts6i2kyv7835wtahef7sp0ekfpc467tvvb3uoz56q85oxj52bfs13sinp79y005oozmy7eloc1gssw3magql2yfxl3tt0j4m0ndip70rze7vr6sbj6nhiswazsahqhjsrw12zw1pat33mjriv6jqegnw8tunwhuvccrdnehtnc7gzkcf46qrhkr8r00bsp111bjc8s43mde3d7q3x745b8af3cyf43',
                parameterValue: 'eniptq7lj0fsufqpvgxwonf4n35kxk7rlvxc4ppfvcbg77iwa436ixb50135nwwkct3r6hx96bb0npscj81ls088b4uraelppidv060q6vkc84j94ggdhwr4df2enooq9ujklbgxw880pvp8d4jdyvk7bv5hcb3f5ro3gurg0vp4mp9whx7bozoajfbzhouka01g1e55ydd8i2h1oxpcjy8bgxemz8xtj79xbd6e2eb9uxu7o35au6k89y8cyrycjp3ywj5vy6q2phads3qfghqi8aoekawkgtkomr01q1uu1ig8cvyuw1mo23jtyl6wes84zgb7xto69ily00bqkqt01nrmmdqji7ccd0zjxx41uncix1jwid7n6hxjad6z65ifhpt9ukvik7jtnukj9civto97g54ksfnytig4w6e66zuqny144ytbbudxl4hv2ebs7yainpm9avxl6tqowxk0jevtv3x61gkcphl69gpnzsgtwk7cyayqfvyzpkgr0r3atvbphdvuoc8w13vctb6kbbyb19138gc2132pjuycp48fripvmfb9geb0sd61mxgayc86vi9djw9ua8rymmp14bgcq4pmor865il5jnjehus49836egc5gyztdcbnkbdca00yike2dw25170dfd4rqtm4vtui52xlm6jixcs6fy9fo683a3m163j3z3cfuzrov9ikuubwjc1z7m1lcwsk5cymth1mqnm9pdt6hf7whlp7vjn035y99psk3x5yfk23rewbu1ox7vu34recja5j7bqsgysuiq5pw3d0g1zq6b5cysda7bw9m1wepy3eisooz791gog6b84vhjd2bi9nt10o4jy403mot9c2pmbse6l6ozg3g48b3c4kwqlxpupd1sns9hrp8uxcmfc2et9hwj0l58ipuc7wjs5okevkari5d1ui6t03g384gs9k3zrhfwlp6v9iop42du4tzy0562n1d5sgj6ckvxueus9l1th60w91maja6hjwwqg6',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'pufbwe1a7pzv6ruzeybzvfw8fvjo4io63dex3c7zpfp89hbiaq',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'ktwlolpxyffi8szchdb0',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'mq4fg5vn9bauaywwc5cmr4nma8m222bvpi9v4xoq2hf18p00v4s4nrff3u73yqp8xa3bdt566xvz5d3r4hca3mlk8r6juyz4gnh3n22rbmgq8orazv9d2ejodbdrqils5ffzp4n90q1xm7x861bkajkyzcw0yujb',
                channelComponent: 'ik8hc46ov9icrv8ooys0qzvcm7gsnwivgjadxqa6pfekehsgh50rvw3ipasorkrqss7ts6kcpjut9v68f77nmxl1vxre5aly8tgylamk8daejfphl7ypw8hucjak8gh1wbj3nfisgby4p67xpy83ffy9q8b0jv1n',
                channelName: 'etxv4ljzpy53uuyliy6lweb1zer5neq6sfkjhdu4hvc6vuu56n1tbckx4pyiv48ljf1egtbwwh49l3g1xun4xrsd9fiw7et1dcjxwqthpkx38891ynfbdgrk7d32ikrqucnn9trnxg9o2uxbw7r9fj8kpu4a0t4z',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'irel4jxi8fbrjjwnf0dixcnfpjruszahaz10g9hvxja8xtm0a8y8gx4g0cz8ku2ikr8g0rrem8apw1wmvlgbptqxtqoxquf75plddxjeijuunxcidpbmzdjvakoadzogi11nk50d87cxigfmzia9fgdvwqjg8qt6f',
                flowComponent: 'ondyf8ddcpqbdlsyxb5wk5115epr4y2yi34s9li0ydejd6jani54ydydclaxttbk5bcw7xqweb1prfxsjj59yrd66wvrxl15dv8y75o8iwtcme9h5jvsryuv8vmx519qcxgj529ap05ewp23f74wmyaw4h06xa73',
                flowInterfaceName: 'ybux095zxirusippti733oi4fyv2m8p4b0ej3tg2pkljy3fcchyg8x9sbgpyx4ilcam6esm84tasidbhathg273vn9xxd9pi8r24edi7vp20ua8e32j7sijor8dprl8gj3lv2mla3r3ap7wz1kn7lmuen9754ptr',
                flowInterfaceNamespace: 'v5azhn8v61d6y1kg835surg8u9ogj3svjzgras0v4y3ohb8hkrsjlydw90qxzvdqtguw7lrzl4l5wxjh17ieqi65wgnxec2qtdt27olzqnbrtmryehb63q4ajh0jna11lt7ltwl6d1yxqp12zmpqhfkcvxo6hpv5',
                version: '40sc8o4uqbeeokiwelt6',
                parameterGroup: 'obxhwhffq9tgms7h55nknd25hl7v9pyis4ioqr1bxely02c7vht9u2uo2k5puahs08pg4tej2xylbbvzw0klg8v5w8pae3fb4j8s5bsvmn0keqgnl0tvdrqbg2979uev7v2e8m29fctx5v6vmabhu1i04vjsdr093selzhraq88x72qya00429kw8vcrbdx7jeti5qbqb31i7hvlfa10k15fayuip83uqodnlvgk3jwkuks2v6899s94pr81w7g',
                name: '1fxdkb5z44ylr78k4fo8e1ba8pkoliotkoreln2f8sgicjmohnuvg36fowuhty3m6bt5p3smkt12xx445h4b4f11roxua7i76ijkd3gx03mhly8tp33eoomf9l5aacdaky9ayiq1h5bpfg9njb4hwavs0khl1i7fgw1zdznyuf5ks301spy6eub22o32gnqfw3be99c849vprddsd0f55h8j5o3jp1q5mdvgxe3zecm1mxv4cl3f3xbeibdh469d6nnnkyqdnjl6m93k2v237547dgrgrunupq5q8v7cmqvxzu32pihohuuglfxmis7d',
                parameterName: '11le1nbob0dsm600fi1bzp67mnybaufgea4iygg8940nmpxblnebd7qt2801f6s2de8o10drfavw3xupm8qksiysbf9pc0wd2it77fhmnkdxpmxuzan33d1hdqlf4qyk1o9lqsvadxuj6gnwx9mnu2e9tv64sowu98plngr692tfhewvi1fcgzm4nb0ko5r0ttt9cfx8bbzoe0fhcwvs9wxp39birtfbe9vmcplpv483xsssalx38t1h97zdfqx68v46rr6ek1mjo0i1fx9i4hlh7kidn8m4fbexyjfbzllnhpopwlokk6kqos7izwkp',
                parameterValue: 'bkmuvlut5gd2w0jzf18c8ihmm915tyssvgunpikeizqynuotac3imz0gwp4ngwr5sc73hzdmlmlpg1g5o8u3j8v5pk8kqaps3r9yrr23xfafk8g7w7gigti5fceyqilqqgb8lvve4nau8htmdsrx1cm6ux250prz0ssuijj4oggcdu4pyckbv3kx3g6h7jx1mc5ii8jqhnhjh3rcra8fxq4768689e50ttulz78abxiz96h6qqb7qjm1p3rdu320o66fpb0z4r5yo3bt8b1vm3qo06n5zds2osscn1uexps38kvr4q1uh3xb7uswrfv6w39fuo0enxo7a2refnfhkan8jbs2vm5sx3f3fpqg3xzh9a9ybw8bu4bh607a0m2couj1nkzrpdlgz0h1guizcrxtspzlpzt5cxs5k66aqf8mg1i8dqd7xm8zces1ruc901i00uqp9s32mvj9zt7qafab89c4bur68x27v99l6ne3mz333wapon6ck4vwyn0z5qmvkfodhq68a7y11hffkggiietzralv1pbg5jfyrxuilrlvuetkk4wezf0xt5tmziaz5zo4ale8m2cqj0x4xo1f4qgl8p50xhuaz3a50rrk476kndhm26v7qjjfqoxymh0bpy0i0cnhy87k7fjg6np19g36u6femv386hmgpm3tvx157825e2e03p4dtzpe7i05xfgfi97ua2vgpj5blx3gf48qvtwvovidnvcpl0b01qxln0hh21nwf701qsk08baig2z82pppdqlghlyw7w3qaorq49uamy4v3p2zgdmg08qsd2zkf7131rammwxpagb1ok1k6n1a1t4pl8ta6ddzdx04ogcv140uldf5ufiucox01ef1estm7ky2y3tp7243210xbydyz91kpnn1qx1k2oif03v52vqdoei8dqbopz96bhe7zx58o5j7jki1yn74490qw80ba1h6xvitvm0oq9f4lik06c411tdug4ni3qjqymqoxiort142apo7',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'z6ftmt66u4zgxa4v772c66le6vc80xnvbe5l8w53bnymb19l27',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'clvamesjrwscnx1rvtv2',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'q01lzdem1warnn2zt9776hqqfhv1b5cnl6rlanlz3n2i5l137z0nqh2fkeb7cnkov6pm7rf977hpc5n34qmfo9ufalpo8vdhq0cs2tvt61oeibxyxy9gz8ujnenkx2syai4r6p262j6pxxman9p9s9mi51adl55m',
                channelComponent: 'lr8vkuuhm6oxtwrdhdwuppntkcgeovybbfd5cm9gtxh00ee5wf48tie87dop1g6bl42w7l134ntdh6v03dbneqypv9cpq5p9xois18kiw7vq60egsa70mqizbqbuuw9mq2nmn54n9clq164eo8kf19km3m8a9rpw',
                channelName: 'iw2kp6qv8lb2hxjigm67ddqi9njkkegta8nkyq4ivx7ci9tl3ip9kyyzyiidp7fn44wnb4ifswyxpllh06v1eralhxowud15hnut30u40g8emv31n3112xr40p4c0q5n4srz7zt1wunpwufzez7u0hepuyxltfw7',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: '56la7zzn5nb3ir5dcrpq97tuu6lwqedlse61w5e1q8yj89s80jjg9kxw09xg57zhfiikzinv2ve7hagxu3ck67350hnursa2p8uzctdtrpxyzauok1serxe6nb86rkzgz07nltd0tt86fck27lu42ztfafm0hzol',
                flowComponent: 'ae21n3wmdzpdx1hwo7o32284bdkgy308vfcurvf14sbdei6pc4szp1ok2trgny0o6rbysmrwt5fzh2ttd0rv6nskvwhm5hn3yi6q0d3789b4393n4urkfcw3s4ph2nshih899tkx2rv2zs7ueywfnmsohm2cvmrsa',
                flowInterfaceName: 'kwj3ph671qy14peh4wd2b4f3nb2fmdhn945k7ipmbvxi57farzgxt7uj9rg91sv7ntkw9uzqrpmtfildtsnnqy0ipxrohouc8n7vx6eaq1dzphofzhhj0xhh1ixybjsm3yxgha71b5yzh478dhpru0bg9rqsnz0v',
                flowInterfaceNamespace: 'dgsquoxg7t990tyclzo6dg3kiovnsmrdvp43ka5v9esroy9cqs5zrrmy62ph4djo9rqd36ws7pl5n0o7w5p90feqofpf01mkme3vuas9sj68p2962zlaa76rutvmgzi2smsocafzdvdf4kkns63c44n85qom5qzy',
                version: 'i4huhf10qti8wzdpcwjm',
                parameterGroup: 'ylfgc5zkiaerx8f3y29ugqylx3s869oadfwz0235o26y6nfywwbz5w6c1xcf719gimx1s5lniqi3bhn0vreznfk9h2vqoitygty89v3onirx8lirk096hipjz0g1nsjjj5exq2u6bvq50ok8ahxu6f3vds6frkybdxhe622uag2091idiq814qzpl0af3r02vs1b0dpdpkwxsh3desztycn93dazkt82yhll2uf7ael3hyyekzjrvygnsioz0sy',
                name: '3gntlyk1rpycnwc05uc281qpmdnyy7x3c0atc0q93qzpw91otise485hwhb0a6yb9wbpo885ui5b787oyvjrz3cxd915x93yq5cvyl8sgh1j6nevdt8dh8mjywh4n64xwze3czdubjpluo5qwdrc5sa3ukv6fq7rzuysdmm7fcx69ddwzpyan43zaz27xvg9ov0a49u6ydt2004pcc12bfn85uvrhyjulzpankyolhhbdffbdyx9mx52dv6sk1liio0uf34gs1cz2j778vo62fwdnm4jijqrnnhdcsz57v7y9h9plgu6m54abxip396w',
                parameterName: 'sazddmlt9ud1l8x2nljn5iosckvf9m7xkhcjmldthb7kd1z45or2b7susfrd26vc9d04sdf19lunedkpeprc5ax12oerv04e6poe20dwwhtod5vsghwgyeqpey0icj5c3fshxgaqp802tll9rderbfoz71eomnzrm6rp1hdydlbluqatr5zyefaj2ll42ml73c5le3vlu5uocpxjqesxh2imo0uevil6ikau6e9qq5enom6eauc7jlwdzogxvafuck358zxth59f8thfayxnzy1x2h5mbt00s41g1wrzinvhpbfgh40pecrawn60rp6d',
                parameterValue: 'nhd4igsjeojuokpkc68khrtoirje338vtyzn7gnm1bwxve8u4izcjewunrgggakuo8ojsgvmgu6xk9bsm6dt6zfv70imjxes4axyb6cdnth94x9xl6x6we4jr1zajlsomejrya99d8m3vf0whii9k7rv2zmpu97w9jo0o5as11w7x1y12je69cdsq2ihsprm4m4wmus85udyuqqikfscun5qrty24yxsgbhjewcuewt9g5v5v7434xllmrgc0wh9gzu3ggwoy6d32umyawezyd11ensj1qegk1sgqlaf2ty6wx5cf5fy2eppxsii56fnhbcthta0677li36dx1nrsfrmluorir5do187lnxj4o2494s8f0zd7lucczrfmcgldips7e988cgh7e4x0pxm2u0azi27kn16yj7r6k40rts83rb467arfxisirnsetdz0bnoragkmds9jhoqgs2kr7ufcwhhsjp0zmytx5vjl0exmliawofqx3i7xx7yjwum7ptyea8hui65h4f5vo213m6xnvzikjgqt89kqko4cp3j5benfmvv59hvc7479qzoyx2y15xnbv8j4k0uy05t1zeoage3z4ernxyqra7r6k6ao0plrwov35cn1a2ngfcpg6t9z6jzjtalup8er1wectrjzxq0ugomw3u88t9onomaz5ty6eyaieud8whla6vwoabxwpsjy0krbn72qlv1a5pf0fkm82luaau8pbw8nfmcyf0bx9fsiyk5w0h54mdk50h6ms4lxgmrhqreeeisr5h1ncr62kbpt25qe0niraiohl7omngvdm6dicfh9606mavve3vdl5dgqmcv16pl51ofshte05j57sjyt0k309mw5gx5cc8zfeijinjolpxsjg9nfkblew332u00lbfvryblplucaoro4kiwhd7uqo3eobyn16jbcrdfjzq0yz88anohcswybu9uoog844am68f6irbuc28kssx67ofd9jyhq1qh3ri07vfkesjr3mbf',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'bw5fr11hghh5eaa3jg9k91irko9eia7awr1cukqlpldgyz0m67',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'gyjksgn2eqdrmyaeaghj',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '1ic9w2xt8wxwq0a08w4dl1l7sh8v0whdnvbxqbmd3h5cuh6w9zwkt9tzqfsp9qofzclq335o1re93o42prbskurj2g0kxyer1m1yqlqf1m4n69tp6esk7zl09a4x9qm8lwe886klsnfeya1r16b6kdcv25grsyyx',
                channelComponent: 'kcz9sahqyaq6v8t3j0alqyh0i3zk217jltj98rxds9alfn9l23flzqhqp9tmbonw8cvsol7xey5kydl2570tadbl9eqc1dm3jl3rm64txm3gr19y30t0751k98j90s5sk029oogp1kh21jlayfbth7pikgh6ti0g',
                channelName: 'pl0xzo9yqr6he8tmn7a0znhh4qr7hmex6lvbk9obijw9hufdryt953wic2vpaqhjymp2p3c6t829hqomkmd00lawk2z6lfs0pyolvd1twg932yue3esx7y4utl2m6u817hqy2026w9w7gw44hnq04mfdjaay8rnz',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'bllo1ucmu8ythrbl60c8vtdmc0x5diqwtm774f8fttph28f349fylmq5vadbmrsxuv0k4ptxzfzf5kwllp1a0x7881o0wvx476kwcifhl995w7qucf5dotnkk21jf71ze40o5jiiltvbxerryf0uzmw396zjaxy2',
                flowComponent: 'rowf7txanovxx7wroq86ze5171ck4w1qdk6h3ygu20273drcf71kmewrf5r50itlysu6zcyhxdt0ttlv48avlu49t19zt1genvpkeij6jva0u139gc9hcddrbc4bfjg0p4xebmnw6ik88ggab6uxrmcwtwb23hbj',
                flowInterfaceName: 'bzuqklfoybew6dxqp1dkfdb5agjut0zfbddeayhswib1m0k96fpx2coqrxbpb4ey5amdzh4r0amlr33s3ibr7iotxxf39y62q38upblkaaqco2eo2lq154vzriddscoe80hbob2xl2ds6i6m30gqghytpqf8uvfj1',
                flowInterfaceNamespace: 'gj9vpsfjppaomu9skzqmuqhep3a0n896kqrxw3vgbl7evr83a7jss83ye9cjd11xp7qi40msm8enkagxpaybg2ts3qn6qaa0uff3deuiiwricpaw4dlv78evljhf8mtmyzqshamv8fd5l3lx25lbhxs0ub9bhdxa',
                version: 'h79dqs257t1pm7scww7u',
                parameterGroup: '61d1v5weovv2xmwjv7bp1fh2qdgwti88hcs5c8pkbjr6ana8z2gnr9ik1dnawzpaesd1tulx6zl2y8vjg5h5ujsjv9au5rd4lugt9rvgckjr0j5flmidmnhucnfowwntfr83tu4vzay57glec6o5x43fv8etlq0d7osy35g0buiybbxo6yuf76qaw5293vjvbmuja0z0nu3vtk60wakc3mu47t0qi09bt4x7esa9e0dkon6gq09sgrv7vberonl',
                name: 'rc0y8tcr9nhff7eikheby2n6qpk3nsmhuyake782ytqjb175ql19beh52ju3qerm5cvcc5erd6ufk9dvmir5gzgyazno727use3gb5dvcq8264yssqvi9s8qgg6guyt4icv9rh2nx7boge1b0r7m0yejsntgbedrojd7x3azn4njv658uv1dib7wrrc2wxqw4euupkd5dqnz0hwf83dyl4hjis9jouf6v0za20ztkjy7linxfnadqadkvneuwby8lbz5yhgq1r3mkx6cag5fv1vtilb534s9idnj7jjfdozjosxzvg8lgcur28v1n5to',
                parameterName: 'la2cks7djshxig46z6v2fiq4cwmaic2wbu5ibpxbmwhavkk1zbwwer2ioh67150al5a8u4ql9bjja4cys73vv6s872yle9y2gz8sfxzdqew5vlep812ncu3t8t7fj5hupcshkihv4ldai0gddwwm2sl3bnehw6kk9daq0gwag8mvh4rnub4c2fhbax6k0cnc2t9b5smfvgju29xk4p0jh8sve46rdxwdlpk49jnw6jqbic92z2340lmgiv2sidfbpyw372zugir1sj8gwrsrdoev7lnxliifkcqw0zuowspq8b3puhk6l9et350ptz1w',
                parameterValue: 'z5ss41tw77kmciq92tjib3yu7vw8vtkt7reeck7bg7wtwz4r8ra8dpwb6o9rsay22s4w3211yamfhhsfpjithwlayex1z67roizaal1itfqnlw7374g3i0rww95nn909d5gbm02vx7ix4l0mhb245706iynxxsg2aflnq36870f4jh6bg72mptixo21au81qgax0hs6j62dbqmcxkwohjkxpnjsh0gzcthezwyh3gnjxt6b7k1yg8xrsrl0fexi7l3fb2477y4446ooj1m3ydmz57zzpvjnxv4ad97umw6kyu82zyfsnn1pa5jz052kry1jamxwm5ip8qyhdmle2giie91bbrhhn8pmsr7nndaj9vfdq5osj6lauftwhi8pbzv1l2qdbaripiw83ieu9k9zw5sumficejkf9q4gtf30uoi27fgujshoa6kebx5sd9liqy6tddcib8yxr6v8m5qiwfdm38eqsurihgjuhn04ma6v7bwyxfcccafiykj2cp3xrc2o3ya59a7ftok0a9oee3ne433g93ur1ai3qdmgzqjfk9phllcc6nmkmp5d1zmqix9s2opuwibm8rk4rbfqobh11fu7wv3kyd35jd2fcb3u88ulbsaljsojiyoq2y52wdqcdus0mlf7osolz5gnwfibed22n61ecel2741w1k552wuwwzeec909hqj6ci63y68tpgd1njhxseprfgkrvukb19yqttm6x8qxqrezhxjfalocrb6qo82jm5ggq4lxtmaofuoqok8adjmxzz4dcrcistthk9q6db8vp6s6z2l09oblgf4kl310lfxx33gfm17z0uoy2llo2kzzudainne6d90izckl8n37hw2w2t0fa9djexlvy1vbahywa63okm3d9sqz7im0ldc558e7ijb67lfv940j3u0dvi5gohdjzd6bz3hdh9wg6ylc7xdohz7rzp36napeae4ec9mzfxmcegdlpgrvwryaxa7rm7odz5dx96x5zh7wvbtov',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '2khx8igjjb1edwt1r35rq3pthwroj82555zj41loeeco5zwcb3',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: '7ujv53bgh38ojw8l8pbi',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '2759ygirckik8ydzuty326qow0vknmbczo5rt6vkqyhfv9v0s5bvgz8rtgigdq87iisqnd0i4tsba4j52gxyy73h2gi1d2r7n53ifyi7vdoo722e5e9f04ofm0eot0d3ah2al9eyh6wdwia015pn3u7od1gvped2',
                channelComponent: 'teq6mrkm1isijlfpt626cm4vw9aci3r6zk600awz1apckonbl41n0jzm2gmdicikhv80u38anmvzqvc0svh6sp0rx6xpiftlo7yuasl8sm96vxpujhtkuacrpx8q9gah1nh2ch2wsw28xbkgybitdjttjm1kf4di',
                channelName: '1cmod8l79g2m79lq3ubwwal6bwyb3nebyusnxtqb9cod8pcyd1n3b6d388d5h1ogsspk2nfi0rb823l0ebzm0mk57zdg763puzyj26ac4ve4r261syhjxcqj4pes3dolufl2ajap475iv4w9s0g71egijjzzr31s',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'rt21gysj086urz50halfjeygrhstnz1hl5cs975gxbr67pxvevnfapc3f21n1dxxfp88ccvicerdvkuf0tzceq84kqh5tilbpa0lqgkfvsdf9njtnhfy8zbc5uw75y3iqhaj6h3j7ud1a26pm26o4y7zmvszfxlx',
                flowComponent: '75g9nr0ia02wdvhtyomc331lgg3fh9ebb0n2qdgtmweqdnk5jrwxq50xofit9mzsvl9ba60cwawgi6113uqhvzd2vtaz5vqmzzhrg4u0vnkpbajidgrfc01hsc4eibz2y8vql0rz7iy187fjnv771d2dk8wrnjoa',
                flowInterfaceName: 'hexgfo8nooplgmii4vhubffxqwjxaaphj6gbtcbvuqqz9aaanhjs1f8k1aigbf76ff9p2kbhkno5kw788xe5wtatzt6qfihpw0k8z6gtd06yy17rntabkvm0863rr8buv6bmy4b1k4vya70i2l2gporl1jo5ypi9',
                flowInterfaceNamespace: 'd5orag4ge0zpeua3pbgxjzsnrssanhtmhmi7x9a03pfzbibxoj2m9nwbxyzht0muohnmm3kw6xyqsdxcrbgv61rihqqps2ge0vddsm7ey0juzz1bcw9ghksb1beqgqei7oa3eccqofcoqqeol004p9csm4tqvl71e',
                version: 'epdecb6i3kg7mos06hwv',
                parameterGroup: 'ximt5azs0ctxjjnkzav0i9s1aug1jgjz0mlaezdkt64hrbh4agoc11ofuccp7c4o8xdzx4bzuyfahecyaz9tu2hzzdful5zye7b1q9uzb785btar6l2mdkec5xt4oilytn9yw0lbpr9uvi2qfrwaev7dlnt743y7gm2mcb37189erggy42pjw37h6k5skm1a1fyhq7sj8e0wx0ypy364sbxspo6225jhcwpbcpv2wmwfbnc4mluwrfrufq2bv1e',
                name: '249ee4l5x6bmzdwifasq0ut4yygu5yr1nvon2bdkfj13imzcuq4g7hzw3lnj3zyli8d2c7kpz01jrkjljo2p7ue9xj9d7nkvte7fb8a68g1z5zbfi0a8lh2j8m5bnrx0nintqcj8g4o6e5ilo4u8wzmc8x2t5fzkz9x5grc8lrvesgz9rn3hiqczv48x90m8p58l18uzors24yd66wp4uhcdr0bpzprt3mhhybdzsglpggb28q2cs48aqiis3lltufamcojolkgse3fmrmvw7liqz4ln11w337zj5ofs6jc7zov2zdt7itzuu7mqpq7d',
                parameterName: 'cllr4ai6wwit1s6i1t2gmmob6n87p507br5o1tbqlxlqkezb8f6xdwq5txkr37dy12u0m4pk35ufe7m1h4du4oixpor4ro8qz45paul4c9mxzl8smbukhve5svvrmuilcm9r3pn1y8n2das8xn2r0bsp9yki37mkirxnr9eeihculplvjpmxsqis5w3fy4bgsci0x9b993xikhh1zso0lyw6s7e4skv8owm1a26qhkzzy3mw01bfj9ybovrsz4eiypmtwqn9ejofhbtdy6cur71yxw26fjzl3wlarf0zs3ulfgmctf6cv98m077fdowp',
                parameterValue: '0vgok462g0oa1dn5dr6i6xi52zn00kr1upp0kgmkopm1004ho96mtwv35g60jghb3k3frmpcwpa5xqxdz6avves3cecx76vvmu07r7da03g857up7msgmndvyigkc4i40c4rlk6fbpy6yltbl7xhtdpzv6czpk2mwcuzwpedinksywmghykqgo8q18a5zi1mo98ii7ohjk9ro3espvoxx5sr7g12t6jrfxrn0tnqdsng17l8ph7r7o541wn12zml6m7vxgu9ymp0g0a5bg6wtpxt8sknuu5axekom3zkhdqxvvqthogdsbvakpwbfgbifjw0mveq5h4nvwmtcfat1x3ljflg5yibiqj18nymr0tuhlqfsveu7g90o1vmn6bpymi1wmj8wrlpyf83cn2d7xctmre9wrfbso3v4g1eomdqjsq6le1yvbc2o3uk94uuyw0f8b4sz4f4u2h5c0gc3ay8vnih31p8ugcbj55e982wozbcw2dxs6h7mpz83l7wmdc0w8ht66gvtvxthptyg6pxzmed0eaqy2pcpcsk77k20obmbgxk2ioj4ha3fxhogdebzrk9t26807r6mbi68y5vxeesrcuevoro1ztyd4dywpzqu7jftwiupj75acwyj5mat4vmjgrk0k6dyhayhwf23lnoynunvr87za4kjbrtk5ttmsxl8mhloef6rsboq52ivyvwbv6mrd2t9dd89kn3n4bam9ms600ycqsuyx40zpmku9ng4r03xst81szl1n6zaf555nqlluhl3c2m9njy4okp2enlmqk96dt87b3seo011zdbjrpzb85zzxz04v5542gd56q2m52mcexiow9f5yf5nbl9oh13ui18b86p93dgc84q99kcm9mb5hcq401ohqxbjv25br3uuvlgm6fk9ksqgh3vgwzca8qqxze734sgh2f8l7ipmlhrgt2qdu7pl7ph2i93a2int0u40nbyprrzd2v73a0jfef6cw9w17osjewb6fxrabtu1dkh',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '6klnx88mwfi63yp035s390rohdfafh9983p01maoxcqpuiso7s',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'qsu8yj7oars0zaa6a1c1',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '0t9r4i1ph5xorpdsv0dho70cy0kd4i0kzclz0w733q9ix0i8lz05l01xft68nc9b7hjh8qkufqgk97e5qc0c9yh82m6x3c08i6wvm9c1h47apiy1b157uvyw2mepi9p3uwixojccyjd186gowa72u3z5s7hhrir2',
                channelComponent: '040qyjmrhn9rzpf78sv16af9jx01c6ewg7jtpdvhi3ognecmnpuptdjbdxltlmab8fdkjah5dhu6rc7gtjaflvii9rkhf36bc1laisovoi6lkuyhr8iyyuo6ig8ythyhtixzvc23w5uc1mfvw4txrc4yqg12vhj7',
                channelName: '1d5xjq4vn9rhrck8kolrqne28lah4nsfefwgfvzpov8qn8i24hc55s7lqe5iget1gv92grg794qc0lfynce3mo1bei4smen6inrtdbaw035mdgi6wv1wweyk62yryoibmkuif8uingcgnnf9gcpz3g6tifzvafen',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'gaianqpuayhstija9tv1dvy8jjelqwfpw05vn17jv95xk2h8vml8r69lejs7y8cdmp3uvo0wzeic9dn5mdih90hlxaf9xhztusv9ni8d5rk7u60oi68x6d361su4kmmbta5jpn31iqrr8lcqoj6glkb0nx5k1jx8',
                flowComponent: 'qyrm79a4esw8zhgj8xeh37mc1bgdgun09o7fs95gmzpz81c4ksqtrwf2hn41efl2djohukdxarumxf5f6dfiac4gd0sqrbp63lcqnxu15eimb0mlraiku3cfk1irw4pu63v7qmpewzp830g09ehoa2pa1vf9y36a',
                flowInterfaceName: 'ud5nxz7tr6a2rs98yd16yq8fn8ycn2waz5peavb5gm2b281bq101gao6o0cmkvw6e91byncu81kyfrgqj3ysyehi0zeovz1c0xk8hd3tm3bvl2itb6n12snp5gh6v4gzp8xe4g8gs8vtfk0xj2rsrxdf93fix2g2',
                flowInterfaceNamespace: 'xzbkqzx4hgl166kdgbaosb2isllwh7ofzg5krlywow4gwkpitoz66dbndsyzkuj8yjo2v7lb16tjctl6n7xzwix78n3tzw80fjuokfhpbrt1tsf7iwir1xgbrvb1kxqyerff8slrjxqwulphlhnglwf1epdhghl1',
                version: '4306vxh95czqexxr4ml61',
                parameterGroup: 'ihl8el127ysm7wqpsw7uvhu426fkdfqc6fjec1uvj485jkrt99qxk5pj9c2bnjsksvt26nql9ecwfeqgewp02axfsbl8f9vvo4w83dismqrm9qnvje3wb675hoz149hcsw7j3q930au346ahmjwtqxff7yyzae6kvs8tw7fxz3yxxa5lrqevpdglhsphvcvlw7098cib2ghjyukhtnb2097tfztvq85t2eu47h9ltwmn1qmmta7yyvn5zb1udqt',
                name: 'dcm5b2r8mpz4ycuvqwq6r0w51dhw3zp5tyq14wmwzhip2nztpw6sk38gbnhxxfujd01beokc3gwmkul9mimo2iu2faeh6t76wd8k1tdbygcajeskpy33sr2mpx4c9zyy7ab8qq3fy0cis5muhrsu9op7c1wjqksu2o4v9zb4cmfxo9p744k795wzkz85yoisy0s3yq8sbzbhmho33fg7bb3z66kwwwnpi5u96q55tt2twae60bs8hqk3y1v7ivs0eqw3d22sf50l5onyok3oera5uaz8u9cdkmfmolwlkqcfuqg2yy8x9ar60w867yky',
                parameterName: 'gpcuazklisnw7np0bkbyrgu9hlzcmtkkmeyxuzs9vuspj9gyyhh2s167f2x3r3gp4vcm9rbx8jkp9m7e6450p18amqes8rjx9t6z3jk3561gjc1uq9m6mah2dm2b9a6s8hp6f0p1k7zd4399tr3x5fyq8k6anp7y4w61j5zsze8wmsn8gpxcnwkzrvuf6v9soqjf1ie6hdf43beuy416g5oeeoubvziizjtgvple805inp4zc9iq059690l5dtpg73bci5tgmq94hxw6cvtn0lra3gd52xhngexfcjkvcc8vluoj3wzgz4ttroxgc36u',
                parameterValue: 'mwxrh3jekxanz3e29ofv70cm2cuiz423kzeagw0j6vwxjwlc33f9le2m1y6nr8ivag7i39by4ytv4pva5o9em2hhubhrt3rveswpolgg5fyluc325px9r3gziwk7guavze1lw7v4tipjc0xd27x561sxr22pmm2ebhq5r3v4wy8z6aesxt9slz18fljw33z9nk5a380sp6ofyhpe1r8n9y3ldf9pqnclhnvoq08qe5ckf7uppceqmbb4galmu2x5uo89v6szqern9r5e6tcvmgimq5hhxnoxedrtmq102ypi12yh8ncarpjrqjgxow09i88nynv3mh8pnt7cnf04c6s4iga81ioou5pvh148bcx8h48gfolmgm6jy72v89rj1vy09wk87fpmt6k846bagda6khxwci0gjuviyuhtpebksq7yo6ongc6oo5425iheb56cudjyaar1irnlhp80z5emljulra1b8epxjneqhmy0rtq9wgrd6wdgd1i5y39p8lrj7j09ud3h44cal2r42va2w2n11abphyb8yobtywkm8s94rwqso9d0hhamm0nmsf2ruvihvp53f4p1w0uvu98ngaj1krgc9ehalyjwkuykk6uxe9723jq63w1z52jpsu7y5i9ravfdxcp49n0oj4ydr3zmtj5grg4cgmwu9kbwifcyk3vavjdw6wwqx8cckpwdhqz26e4w9y7sp1354748lf2vc3scs5jx9o8obpirx0bs6vnc1ivcg3dsytdyn2f5u0gqgxf0bylf8q8vvr0ci71anu71jkbwn6av8bgq0ri0cfq39rgu7k7juwe1e1j7u0hj7wobxqgtu48zdybtg874y9h37pc57lxjsom4w1d5zx7yid5xqnxp1pv09lmu0nx6d00sxulodcksbho556gdmvuziokbgbk3bki2j536intuo2be4xuwr3br4jgymwqec63ii5gg2i5brf9jhv42o886q8ft6zmdgc7oo1gztpsuveqnwls210jn',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'xnlrjt46tsvqr6plt16lr744ccxa4zcuqhaa4pvpcan0qny89r',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'mv640zm1i4v6365o8u8d',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '37cee74925dollp05fsio0bv86c1008sf9928a5mdt3brppu1e7uz8cc9av3whoep2bmiyyh3iz3nn8kq92vvm0jz4bs0s12x9czxfbvpt257y97mtc7zzx5xa5m2nxyvzna9s1ku7qtrs536613jqaqbe3i5n7k',
                channelComponent: '7y0s670r3hqc5p2nq5d8vhx558jl372tf2t9j8guk2wk1hjkhngqezh9tmxxl9cgedel727bmshn4wd8bbrr0yg63lec1ef5t63qhde2relx1b5szo03c5i8q6a0w3koirh24l9z98ki3g6rpew2t2zjb6h0dh4e',
                channelName: 'wuuhlw1gx4b8silaa7ic4jrruqqj0cv3fa2ncce4te6dqmbe92rtoi8rl78tffef23qyefu4ljqwafkxho80z43fizoc8t31g3qn8xw36uuiagv3kpqi2crseba75at5fljlutlty90moe4q73sx1i2fx93vqrov',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: '0xepg36sjh8vnycenawm7czqo21yfbdr1oweoiddz0s65lqivqspkxyldiohwn7tzbqrlgmvbjp9y4tunh8pqf8wyftpyll9b0jmcmz8k241m5i0necwkz5sci5et7hsdlfqcoufhlnzfmbogsef7a53zt72z6nm',
                flowComponent: 'n9tkdkhu3xd114npnrcjj1e6p3w6tcmpldf079kv06rc8dcmpmy2fpfrvyd1p97z305t3ycqibtosaj68ys1we12giuwlng6eharxn39r9ojyzgo6curwfofud0rrtemfi5hyye32iu74brznfrhxp56jk5s8tsk',
                flowInterfaceName: 'kvv80nrt5h5ay2d73k8jc5smvs5qkrbbg6tr2crjnijfuyv1qe44dk787mmnebhdb29mkkwc1ttgwoyizf887athn2l9jc72z75g92zin1vf9t3v52zx7x1rzo90n05zzykma2ffk8wb80k9eg00lgc74igqqxqx',
                flowInterfaceNamespace: 'b0u8f7sg7achcgnyu7errlh2dpq0754hb4g0lqscnwzp11uisl136nntifl3oi3gvimsrelf5m0gmd2ie9sc9u9539mop6cpkobf78rfac8s3yuint4q5af7nd7dzm80e54a16i9zx01r5ztl0bnzrafltiykw61',
                version: 't9p06detonqv2p21encz',
                parameterGroup: '9ikicvqyy94h4uj4ccc3dz86kv25on2nor7na6u3w7upo0ploa341rft4w9fp31zeayxdmxh53qwp6rwiwj9bxwo448n8o87rrxuc2fi4xmx0u9l91dmsqz43bzhgy5gosbwirn1p2mbumns09jdsd50qdeyzgfc8sl5dvxlmkjixjo6yg32b2p5nqghhxp2g2oxtokpc7a12b7geyrrjtyt7dc0srdecbarorqaxiirg7xgwkobard9305tzcfe',
                name: 'uhevggo1tipsgztkztfn8hcsfgxoy05zh0wye0c2vom6wx8udrfm75vca7646t83hh26zs76ip8iwvb9na9ujwal6d2beyw57y12a1n3yp4fcmfntx6lybn7pwo40en3s1b41ijlw17lvysif543ofkmjycinz8irhm23ycv3bkulpowjmkf9ajr2zgvmbiim0eqd1b57ex844w5krlx9tdze2qmp4qvslqgg1gyuzwc9l52i16sv58e2i50lq0eqp803gld5gfp1zix4f3p8fcicirhmxtixma5b9l63jrhvxti76wvkxz4qnubdof3',
                parameterName: '9dbov0a86yebilncoo2os1q6fe30vfri35ejdjee7h4x5cg12yg0o1xvt0qwsui6tpyb01qhkvz453e0842lbkolh2eoo26snbge8nrg2fs9mnazqd7q32gcstea92vc1a5ccb8q73b061g4ekv76ekr4qlzuf030nb6ig9fbtbsb8si83ck6y9lfsggoospz5v0ooya7zsrdqwq1ni1civfy1v40xqky2k2uerum1ccyl1r3g7v90z8b4r8aagzfgvu20pr9x4xyyrjs91xfpbnlzt97jpmenijw2ckedqaufvqrdpw5o2f8wdxtmm4',
                parameterValue: 'k6dyoj5lhdvvqgifk0oa99l4a52na2piw7mslvv28gi8qo3p5z0de1d4wnvg6m5ax1e1b1stagawh0m6sjz5mjrs1r4s6rghx3h9euatd42p86g7wl6dralkolsw6t1iqhey4ss6l6cdofb5s2pt4c3vd9v8fejwz5hray5r0wgev9p87jkqgw90aowowrdjj65wcx1q42cvscz8qitmj12088uldgk9fag60feyvz127p5tjo76lyizqqo5y9ijbok9mtz85bwqb40c17a6pomedfov6ai0qi889rzbvcl88wayjtux161imtsx5h0tk9tkclcduf3f6wh8lbx7fquvpjyhvn5aq0zoxvf8ogjuh328qzmb4ojmky2jne59k7a2gk4xypi0u5gfxlk4tixian59me7pe1oezbnubxk1v8rw484qf11ou8pco6z5xcfbpu3a858en6akfp6iwoanzidicift6e660bszx106e8o0v52l3rl1dhlsh8jy8mt4svcsmeuhldly564hr6y49z17b174niq4kbwtnq23qxhc1ix0hldj5d5bfxo71m1n6572mj24z8th3zso5no8fiktswbj3gp0tcjhu3170vptgvbkp13p6aukpl0i18ix6irzhrpjbchpmnnopj710n10nz0kgb8hwyhchigu0jmu9bjztw818ud5jaf6at9xeqbskub2tw46l9uddkcqyt5nn62a45eq5zlk92qygq92xfp6vrcp73zv1vx8zh80cz8nqckxxci64zjafu9ftlncs0lwpnkzbtf9fu2bwfou9g6zdww822g5efwccsghy95lh2y822qpj0bxyg6vtz0fm2isnfospo0e2gytrdwew0aao4k5k7hml18dt6tjngrws5nk857r4fot1s9twkogo1qgzdiwtycxstu4hd7bmrgw6ti06gv23hl7645fyeeivatw03z1lh8pe8xz9wopclcy4lx21igvy7lehru9rqsgbklgbx0hi5po',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'eaa9p3vt9iu5v8h6f8nad6bxebi3nvu0xlhjf7tztnyqlxjaaa',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'i0bmqzkte3ds4v40pi8s',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '7ydnp0wgvtcuabjsbfjddt8jqlc8bum54ez37p4d99kkcuum5yx41k5w84q7xnp9kjpf71bo2xmbgkf7179nv1vz5z3bokqlz1maxujpmggb70c664a4y3lhv7379jn1d3racre0iwu8j3zz0gspxklfn91p4a7x',
                channelComponent: 'hlbfdbf9t03kqy186hkf2uv81nzt4r0lklvqn3pexqskpg48jc108w6eyyeuiu8r4bz8g5b3ks14eukqx9ddh5fapynu7iyjnttlme1zhm77s29g61606yb8coc9do3jyuz9ptax1fp4yck1cjtdwdkv1lottent',
                channelName: 'b2vg70qqwxan72wv2001s4thwlglsz8h6xmylj8qt2w3klm3em1no6qugrxwawdm9dt2k22c22l0m9tjc76cq1gl3k5zbzrxq95ar1cd7kaztwn2g8igtesca0vgc8ockelfes60n6foeredz2si3onspswr5a39',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'n2e4c46hxcbvdpdjyyhanvuiob1tnjp93a6ww4udpb2i77pk3bwf87ceeqf6np2pnen5kbaemagkckmta2ixpx090f3goynchmr133c211ljnodkebdo9xix10810ceetvm5h1vv51ot8sf80qa67ltn66z899ag',
                flowComponent: 'qz0jyo6jnj52x3x1qpntqich7msd70mw9kpcga547tff5791rlzdsdcim1y5ybwums5p9bcrx4r5gclc2lu4k8ac14u2tyve7yjdgx4q6ms9g43bsbrf80hjn2aqt5cuf3yxsvf23tn7hcxz4ew4f4xv9msf8okn',
                flowInterfaceName: '6aqi157mkcbpu0rmg50o3nd6ba3gko8crdii1lnd2zus5lg3foo9hvi5he5e78y2u6xndi9ignfq8i640l1n06jgwa1mdi0vy9b8qs06ln0frzu0b5xr0re0p18skls8bny5v1wyn3y3cvkpregkupws83ntuvn1',
                flowInterfaceNamespace: 'uurp3ybemyn0z8yv0a2corkz48tdxc3kxxyvjx6fo8ihuuqjswjmr1gyhn4mzb163zyd9jfm2yi2j93wcttuwrzr65ezt47zehv3ayj0ocw1wrvgbxzpxqbkxsltgtq39y94g9plm9en8brkqikp4hsn9ko8sxoo',
                version: 'us0okgo6zhdoyzgrw8yt',
                parameterGroup: 'v0bdhq3mg3r9rxnvubvp40qw9xkcwu4frp4xytkujo80gh7pnibsd4220tlrfzr6uam3ssgrt0na93olvf078xfpag470sgdes18z0iane2ud1s3enc75dlxapuc3xpm9vco8ibrk90kd4vh4srqxhdrim0411kbolx2ewids2b0g01qzrxgw5gd3wsdnuvcjuxaxic3upphsqegxeiksb703yckep6z2sbog9zv7d9dz76inj772jf3vuq0kdv',
                name: 'x65ut7tmmyp6eetagn7c39vhnopqavz2qbjjyfbhb26670uocgegnhn4freqqddjdf1ghh8o3vjgq2ffy1xugtxpexmrurtn0c503er1dona9f9urk4o72wtgxzb4jrj0x7dcej0b594nnian6d6yuz3nkf974jcqp2e4hzynwrodvxqo1n6gf1ss9vl8isk02noawixp7y7bp85n93gxvqq42odqeexdcn1i12puvjjbjb8hbxkh2g7woq7qf4klafshogdkmgnhr2a9zusdhhaxyucptwfbpudvq6i67my6eybjrza1srs1s8m9ub10',
                parameterName: 'dfsp08yu4o697hhffstk43tx3id27avckbsh8ev0exchfv5xzi5b83k9hq30rvvm5ufluroxt0fv86tp44ogfti988qar3ot5f15wouqwu6tg57fob44vls5zb7k0yhz23wyoyfyeo7339fufj82x9ukcg2db4rjcqrtw0mt5zilcj39v2h165ncr9b4lx67taxfd7h42cr19lj0bur8tadngz9208jxa968pv4nm9uwc4m2vqzf9xmwh2zf94y5krcbtuqoote1jk1mjbt2bd6k0svaedf0wptqhzdv2trx1xnfey106e2kmkzmuocs',
                parameterValue: '531lpvouk3vgqm2rdugdy334n9eouc4ynypelb65vxfrjli4bm1feu9kdv12qdhzn7gdmveq8i5j7uvn3eo33ro2orw0ynb5iovad9wda5am5j142975kzfiatfjjws7o2mlgp9a49l3xdnyzyd5a56mpltbjxrxuqd872xzf2jthfecvxjnp4jlyiih6i373rep2zh660zeczy8e46o6ly6dgkwqu6rivisuurj820sdkyhl9fu8xr0xbmwlxn9csiqyd78lq7qzndpguxmqel26br53db6gqbq4bayvyvnwoggn1v6qtaucgh76m6vaneudjoaszdkhqg9cxvoepsrrybhtlxgxbrancj4t1wt7z1slsa9tsab907dl8adqbago85empt05yt4i2ibkk9tjkogi0yysicls1i5gbew4fzqasqbkzuhztmly8j0q2suep132yq1et8a97wuetiv2rppa50ztj5hfrn0n0eo0gjyirhfs90bvkey0jtsw6zs8c32kjxp2tse14c1stkdsg78dshghzrh5k2tb4qsbah6vrpam38e6jb87pw51bqc1bcr4pq96swblo1ihkzpl9cpajj2xdtys74kggbfoveg9v6u2ak6uwhcxd8vqagpwjwvh7na081yehi5jj6pe1044jcxhfzbophzfzif7p7oxgte4pxi4sf6q2z85v2v1rmy78kb6on12u2l3yj43knvzttdqucib2c9si88p65ucymgspljk1ai14mpyntxzyrj1uudyari2dxu67m8cvoj1aii2t780yww763c52m5j08fiik6m7h5tifofy3zjg02uql3uxaxmotfbpp4b7f57uttdmrarygh4m1mpy0jelkbuknngukmkydda2m0e7feo3k10spxc7ws6xkd40o8w5ocfkfbov9d8d1q3mbs2yhr37j4skftbj6jwnuaqvp1dm4o88u3f6fbba1s4z6ra4puomtkrjzn8kum5g8ijn1kv3m62qxwoqwx',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'hsjt31tu7np926rwpi5103ho093mmjti73l57ql7rs8uk2qj67',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'yw7q74chz7pv4hl1eny8',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'o0lugua0ci7hkz6o1u0ckpcoj4z3zts54vo6lln81k0unx6v7qq8om7rb4cjlshuiqx5b2sg8ehukhjus2u1uyl40y2trlx811zhl2lrfr6lholo14g3zwzlw30b75ud7sz3ftpauuq9bao18du67qfkwa5k9y5u',
                channelComponent: 'pcb4y4ps9dxczvfoj3xzz8v28fdj5wwz82ge7nxfdx6tyl4yrxcicfvmqgmgb1srxwrmkxr1qq850osjxvqve7v6066fjx7x5om9t4epu71k7s2gnaobci7haorfolbnecy8gq8r9onrefars0hmbtebk71f7vr8',
                channelName: '7lwswro95qi73dm8sdl17kkx6rh3xq090tp9lf015xuggl69u1m598gb5z3jaon4pyhgj57icl0abzhe1b3e1eu06awvj48ze24su1hj9i28fp8w5iwl45by050h09yjejjr8szt2zbp4fb0asgc9oinlv1wc4qs',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: '7v3d4sambjbv7htplc02hyz5i0a3v71fc5iv59s90vp7yipspb05qao1hflhpf7ugaimgybgqkja3qms090zxoaqfvxxgp4cesao0gkaw0k1ns65hu3ypz4by8xpfz53h1hsdlj7dyiwc5798njyq2j7q0ftg3oy',
                flowComponent: 'hzwi084c6m8z77bz2vbyljioynors1lu3gb5v71todz4mlap0m3jhzu4vd0njp2faxhby2h7x2zm52mzlh1stf2fkn04d6b85ri1wkatbsgy0j9xdv5eycrrcg6158vu8cn37jhi95mmwybq0rogu5tkufezg2ds',
                flowInterfaceName: 'n0p2uve824xuj0nj03lvu3c7khw8g4ln1f7mjcbxv2etqs81i6lllun3g63bx693drsq0p4ujauemx0swqbogtpuwa1h16d8105uc8mc7vlaajawjfu6k4lkc50dhw003fw71ach7rf2z921kmi3xmntuxar8ec7',
                flowInterfaceNamespace: 'd74q1tttbpnnkuu811kk6c00jo2ilel5j6mr84fc9bcsm2oigv7kb181fw3j9npkgz52zwxgq33n4e2c65r8b11tklop40ndoj2qedj0yphahpd2rzba8qgyi78pksdhb0hlq2c361x88gul6vtldd38g8l6ax42',
                version: 'a9mjysh3sxiwaq4moor1',
                parameterGroup: 'd2z71jsmv9x9ta12f8xep2xhlay6bywpqquxs5orz698uuhy4p8vghswkvi2o1bul80p95kw93t8gga99wa6vu4qq3pkbowai9384kh9yw86kxl914msnj095fjja8h7ropymax5ehh6fk4b4wzg6dxiu7n2f86uzaxho41qruuevzrmi6579sggf9art6w1scobgfhp5hsqvqq2p9fxda8pbt1iji8n4pcp0ybks3i6gocuv08iwy41p3gj7e4',
                name: '4a9iw91prgya5y8bh90r2xlh16z70wu245onnqa3pqdmn5plal4bnmao21isu5ju5km7ronov96mubjjonjusckf1uxcuitax5om13w2lr7tj8wwxf1lgkenuafffibebelc13288ju6q8ady3k0ojc459by9y0b006j4w4ur21yf7kz79nxnya3cp77pfaexb7dl3q3wt8tbfqm15wjy72mx8kfe5dw5kka550kr0g1y675365nbinw4njnygqyuguq0usoe4mi1tbw6o0ucgtgtzr6pzz65jn3s3ws9p2aw9amkmrffucvij792eoa',
                parameterName: '4k7c0ynziyt3n7qlv27qptrcs68zxcfoig636i6v8tfalji7brfydj1bnh4grpfzu57rv2dha6ui7po0hdmlk50ct2vpytbptyidobcb3ru9ew2s6c111rc2ut1m4nji7kg14jbjwrsz0u9qda2bymcu9arjxjg6vkps5v7dyhma8gpac6o578ctyfcj114jz6615t96ji3ncdpozkn9v9b983i3odpjwvy7hua784q4p006sst3dy57haygz6zakb15nk4hfwp5jomcvrw7z48msg7mvmxm85in21u9zolfett4yio8b3zanfik6staz',
                parameterValue: '33ns3cokb9ra2dssrmw50me7uen8o13lovn4pknq7yeavdkvsfyng1x966pnsnkco7gem0ed32pzai39dbt7rh47mqf8e295380wwu1p7l2q68qqsmxycn5kj1typ56o045xj9t9h9mv06ovjorzocts7wpv0r2o0gxqqq9b7s255s7zcl0o3lkory7gf8b0nlnv0afn7s1tbbelr10xnckw9mo02pk83oyhqdpqkydzff4kdgdflcpij7n6aisyinfmhi08m9yfgeytxlvofhnlf6exf025lwlznmw9sxbqytg8y2f0ieuap4wdht5xsslibhq6942sns78q7nvekm3ol6uagtjzay71n5rh4nejaapj4j3owdlwanhzy7be90z8twfua4tgs1y21m69suxdbwfpk9qvz7o6oo7f7s6zphejhm8riq54eygoz3nro53hkcy7poykgaq97wtpqt437fhmtbu3sbk2sqmjd5dorh54ycp41mqeoo3l32gua5hpxf551bp7dugca476b1u55lii6zgxps19nvd838asc9m6s6yjenlnzq5m1ldwjg7xy5i7uvwoipmkt2y1sb8hweph8ovlofpapp7zg3m4gbqydeyb5apf9jk61jp9a7uh575sp90yf4yg4e5z46lxrubmxamqb666z535dzavb34k0qp0yl3v1njxsg6q6yluiuggvgcshl26flvtt5idsdy5fjvmo6u5u1qzonvykcc1gami3aw1t7foj9qduxddd9cwndqt1dmujyuvoe9zaj1fmnck9zuk8kuqifytfvh42p01v7jqu8w3xh5rn4ioqg4crpvp6b8qcjhjtxfke9fkzrq79owrgi3ft9n5p0dwlokqmzfrcymcqvzygvrfpysjzy3cai4d4l702ufafwyry5wkxyfb916lxs2tfb2boxunhpq2rmp2skbu369qsl4k7ys417yfa5utochj1nx9kjip22k3cslautrold3f2c5xhtgn1jc24mq',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'hzxbjth6bwy17966p8odxhyr6waungtjbemgix2mgt16duwprf',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: '4jmwji27unonnx628b2s',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'cd4e015596prpcjr8kxltzkug4vbgyx8ued9opsj5h1c0qungowmk8183vv1ogexno4cxrf7pak8ke79lk39xjmq0z02d0tqy3dueja5bsqkmz4v53vht0tfll8trauxxdatn65gfhjthfnsh0yrg59nc8ykwl90',
                channelComponent: 'noad62ybmssyou5wv642qgq0etyfs9th8acmhvaigxjdus1rzw8lnq74ij4t789rrkk489aj9qhyioj1cpbgt2b2jktpx7amzkc3hldqndi57ew59jkuz64hu3cormtyqw81q0pl5wj8zpisrrb4c9f5p0bbp5qm',
                channelName: 'w7hgtj2o1npm6lyp5vyzjqb4didmtzqttyr3e0giadp3d87vpzikkt8wsmqvq3ge9o31q9enxou6l3n0tknz3iy26nwm05rgjhcizk0bcghzdvmdgs8e3l8cca7uto94gmr0emnke9pysbx9pd4hcx5w07qt96zq',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'hu8rs62p667k987hbcni6yn6j255o14bm6z7gm4rq9ht83fh2vxk6elth2spwp5b52ehoiiqvutiv97zp4bf46m4h2dthvzf6n11eb6v14kljhjhsu93h4b3c0433xkwlkdfdrpxfh8d92p4l04nowhe82npjx1j',
                flowComponent: 'i58gmhx8w55tlgwqg1x30hmlbvopck5t73c6r7xsi0v1023kuio823ejw2zlz7v64z2z65lusnpmdcadtyio7vq0hbop8fstxjehv1h4yb5tajch8ow0lyaybh907xovheq4pprizb3vm78dma9zg6i1bprz3vk9',
                flowInterfaceName: '37b13gjch2uypd7x6e992ts0alyxm99vl44p8wvjb0vvhhg44tuc0mqf4efjw8pj6q1uydwt0gth7m4ha5msz8ye5chmepah1xgd44741hmw6fajxdcywfl9wad7ym3qe5hc0k2297ne0hpkjvjob7t2882aesag',
                flowInterfaceNamespace: 'runoun6lel983kkv2wvig05arzqdbqrl2491wd0iugm3fc6zjkzfeq6h5aea7pncqgcjrgu7o6zd1x9oip1f96fswxcjkghgo8n6wjsy9n0k7rv7tly3mqx0woa81wl4vfelarc2lzlrom233bq1cngxcm8qhkyf',
                version: 'ix8b3bv7frgnq4jr9x56',
                parameterGroup: 'lpsh34a6a64ogcvnnigcxmkbckoio65e4660vu0lxgxmxka22cii8hsmtfm07uev5du5e8udu7iz2xlsx4uh7yefktj1n0d4ugylw0ad3iazivli3qi345agd9f4r9v9a3cwlebca14nj3ks35ah9v0mx4ueafs99x9b1ym63ykqdb1d57l05yhm46jniy0rzabqz8dx60rsf2mhuylyig6qk3roxrdan0cfuvn7iidcycw7926h1cvx4mz3ohl',
                name: '1tc1podm626qtx7ol1oj3m5nykj5s0z5p02e739c7ljz919hlga0r018zcvczv182wkt145ktitn7lqv6cf1gz7joepr135auzmsce3zlfhqc4shx4tudm52lc3xquzgbazp5snhcrx4jdxezz774ujtix7ksss5iix0ebrhv1gxua1lat3ewpvgj8u5bsm5uh3ifz2q6y4mghrmcdh7w38x4427g738jdgmjtshl6dlf4g1192aqtell5d1yia70eie5ihacmd0tmzuctavss2ljzzi5n7rmn7m2i9rvgog204jtc0ayxy478rqqubg',
                parameterName: 'kxtsppwd1qt8q8ll1137ajv1kt3dpszs8g9gh0x4u1g8d10d5afuznlquqdbco35i71whq87tt6bf1af188fm2fg97zrgncksomgi7rdvqfgvz4vyhtct571nrfjeoztwws4x3i20csfxlfy1fzo3a4z8nufioipdi9nn3oeopm5jcu0aiixjceutlutz9kxpgx8izoux8jsbch8pugi1nfzap762oseeq1isvxo612448gopoictmvkjowl4047du24h2iq8grozh1wg80pxyipkrm0f1ecgz6shhd1oysdex54yv3ta8q0i9mxzx4r',
                parameterValue: 'fd4wiowhwl63umzh0gup7eiqhyzu12vfhks6511ulrbdpqin3w48qyngj48tuw3n5b7epxfrn6fnx28gfle68eim2guto7qvg087i9iob6ixkwj5acdyrit1ql4vi1onumu1k6rh61fyntoxq1rj7xg3f2ihginxtr494lukcgb736oazzxtbsq2x8ldh5ym9ocq8b888b13kur0jd0sct0n648gpvw8l319e36cuzl1u2g1y3o8imvix03yp3drso159ocf4sv7nfpomjk14x5lrzt4q42mrfs73eop95gwh4p0d5n7nyf7m2j62424724nz6v581y9xirccri08zwgyz8isxtn5d0ayep5j38rlu7g689ldf5rnlt788gy04ch9raovsuhlaaz97nhnn3meawkx4b08qth36oktikfwfsq9uif3j9mq6p6neu22mqt7zogqh7nkaerzporqcxx0wkg05gi4bcl7wr2oj6kdojwghn27lcxrf5wxzn4prbpibcwecjtoefb293mzdy9ueeyfzd5rbwmgs7xj7hv9s6nps9k5u1swg8ickq8ly4cx47egwi0r1df7namkooz3h6vou2g65i185t87fsjk2dzzr6dja60eii6zeiethvxzv1wa0yxcml2su3oyf3u6bxjr6hq9h5tvj20miub44qr22x7hrym42vukg8c4q4oa16liwdafmloudzlyx5jq4ll83kt5ule1ovijdac9trco2cgqd4qdtws1pkjhipl3e10xq39j02iwskfh0x9nitzivgxhyb0acbx9dmqww6t7ty45jbrw90yv07flf26g8bmi1crqxql7ssu3bfx7n9r9lb7ers0xrenjfkf62ca53m46knlk3sbc7c3zuhpqel5ad0zmov34yx95pwk9gy7tpfeo12v5cuk4qs51elc4a0az6jszqyh80ea05jb1tsgnlttvlrfinny5fzxfwq3wdii7qqnlsnobm9zacgyllm6dt56qv3g45yxc',
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
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: '7q3c4acbp2x1nx6mhbrggj1nn77dwmsg2dcfk4u6uaz9z1iovr',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'r2pfol3o6g5n3pidlwgt',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: 'vm5gi98zdidtz3yjc2kpr4qo5t8zdukn8h2kvctgjt7578zp9nftgbgb5g7m87h6xep114mmsgyovaou8xz6znqivoawyq9qnmd44zckemkyl7cnplpsfs4kmzmm4l0k9u7llpnfh1iwj4on6qh1hhag3drufv27',
                channelComponent: '23tqv6yf2zz8qrsudyerzoe9mmrdyh4gk7zlqhnxg1zrf7vo96yp3ekssg4agapdl88sd8nxrymva1ik36dv32flyskb3fgdwy4dwzojrjj8bqkoblp9ycy27mrmrn021el5phqg2u54pkiwa14m6g3ongx00uuk',
                channelName: 'z8pcmhdl52hb9ottc9dp1moo0gznpt34mr7hfslnbepiog8tdtqiy9t3u80qqmpwc03ftl1yt5c1v8lsdwto8n1x61qej9292qyxpa36qakkikqlcrzy5z0n2qmtljtu2bztpv3ps9omfohhk2gx5xoxojin1oxc',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'd6li6c2muumkbgwao7ieflbbd6id571n7ll4hp4vf507vwaa8j0uxqeyhaw8dq7gi1etxvb8m7x15rmy5fuhts3gd1lebr2alun4ons9pjis5e86t56uld24i8dmkrasna9u7ht39hsw02q921vukas3qu771kpc',
                flowComponent: 'k4l0dz1284jw65wrehwx3zflyq90mw58y4q4ct8x47wla1iqr83vultxdgd0lt9t36xwu4twdoojemomz7e6hx7d3d2czvr9qwe079vgitbtl8vz7xk8gvhihk8hu43f09kyedc5qadthusfajtdeszsqh654wu9',
                flowInterfaceName: 'jktoyiufqi6rr4ammehgci0w3z5aac2xbn2wwm9bsq24t5bjbthtyf0cec7md7jovwpbtnu064weuscaes7r4lwsxpqltzry5oc4qqld5vqz8wudnrnut31ghteyvc5orznj1txgrf5knheavkwz06w3zd778g99',
                flowInterfaceNamespace: '337e0irwr87fy5tbe1i67rugoghk74yxrojn58p0mflv1djldz4zdpv5nhn5an9g8h98gcvyysskofqw9g0tyw4f6vjnjqqjmq4hadg51exu11czd65xzvpt3r1lcx0tm6ls9ajv4gw4369w40os7qgqtoyhqhgp',
                version: 'h1zdf1p60d6a8k3stmdm',
                parameterGroup: 'td6eskjb5bezdkhc8zjfo886kvrq5o806o8n3dspgcooqfefcox2vc7km6zc7jyzy5ooxx96k4ihum9u29gz9ubdd2f9884ph22nm6gbz9szsfl24vqcga36uwk8f1yeoq46esjomqmx7x3f3b4evw57bj4wwni1mumioqswk8qy1dvjht7nt254bp6mjwrsy7djcc79tforpi00rkztzc66oux6oauxm4pldbcl4th2cly1w91ei0qe1i6h8yp',
                name: 'nmpq73q2hjbk807e5lgq9qzcfindynzpxespgm31wsrl03nineeo8r8mluj8vepy3p48qbfdggyujy8qwtr9yrtrex633oi8b186b7kchqe4muh3a40dabf01cq1b8xixr9ok5lyvgqc7npo93hp2k6y4zqlf3reawp0fsrm1c92cj7i4k1e65xtxwrfah4ics0vfx32lktdcucqbdefhotqdtdk7uubjookmc0u4ur5dliovif022obdk17denjl8t4mm7nvnyuq773riedx7ozfxuoc83bk2s3iclky82zdy8md9hzd5g4g0cdwqsh',
                parameterName: 'immuwyrsbof15dj6duobx8ut3qeaxvfsk75tff1f0n5mspudetqzredkmno0bbkd0jq5blkl1n3aeyjchw130jft09m9uxm2ajzao49y3hdutpvad3bxdevzybhi7z0gi6wtrsgo2llqdby2aeyef4351r1c0p66ucg9ka2jdm15gax0u83kj94josgwpb7iamly5zu399t8w7gbve13fl6akrc0izdaii3z14igau7xhj0rugafyj98rgmj5pv9ges5yikgcsg6mw2vy09khtmfii5bes0gele9qps0i9fp7h18o8grbmmj5ox4z0cr',
                parameterValue: 'z2a89y0nut8pg32vapyo0p28jv0h986hd60gj1gxx6ynfivswcq7j1s19jclxamwyajmrpcw3h6s5dw4gm0mqvvg30260i6cnar1esfub34j5edqg06nhy3hr665b821vilg76ulrrgib2oe0qfhqyvjmeuh7cclaj07r4a96a2efzipe0c8nijydhmy3ptzsleslw6cy760ty6k8g5e5cam78h31euaii5dbqs628bfunfejf0apzyhlb91k8nuni2j5u3e5rfvqlltl58o8xqmgm2ikawiwuhxtvlj9yqjug1sp396xsnz29l4qthv3zj3i5etacvz2a7xebqsmn5ehyj16nk3vnt4mzya7s0j25wjjfxdttzv5khrvxvqmoey4hyx5q8hof6813wfihipo75t8g9qrmdm17e2odtix7f4dzaagkru5a85cvzvgapucqpzc5h5d84y902jjabapmvo2zhxg77qdjf56j2qmjie8qrymw78h4s2gfbblvnxb7groagc1r2ipzdfpxy2oybf6m9md0f2z8vdwe9n9cso4q7d1zx5orjxxwjwd2s5s21uadmzj07u4czljn1tbda76n8so65zkx4kiw9a3i93boz1o2m3y6m6xd5w7y7t2xsk28xl4jd6gcp6iz2rqbjheej8ksf5nqsfa18x49op70sj7ho5u58lh6k0y1qdhe7224hufioq8fezsjjtlooc7jua0rzy4xy6gzmh635mh3ktqeclzmljt3bz6lb3bobzd39twshlecx34a8g3plczpe23v4py8hoini2co45auxxjm8rqdswg6ry1e19spxtaf0abrjayxdz2658t7u88bslhv5li134x1jxbyryp3tcfs3e5xi42imctfvamr4my2vhpwt1cn5oygxee8ail3qbo6v8885z4tgfi2gavavxgwm4inxtgcvfrb9p96j0lj18w0uag0xdkrnh40ewpqn2i7xtss16txgbeevgdbl74bqty5ft69fd',
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
                        value   : '886640b0-cb76-4cdf-a92b-9037840f28cb'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '886640b0-cb76-4cdf-a92b-9037840f28cb'));
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
            .get('/bplus-it-sappi/module/886640b0-cb76-4cdf-a92b-9037840f28cb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '886640b0-cb76-4cdf-a92b-9037840f28cb'));
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
                
                id: '183189f4-c3d7-4235-8fd5-1ae6b6b863bf',
                tenantId: '32ffe06f-7bb5-4212-b7ee-cbe2c54973ab',
                tenantCode: 'xqqm5sa91sl7ued83rhq05cyuw85txcelf6l7ngw5o0nx08uza',
                systemId: 'eb379195-9adc-4531-93f6-d3073b28f50f',
                systemName: 'nk4yvry6aorr8dd71w79',
                channelId: '9607b86e-7176-4d7b-bb5d-32964d73e1e2',
                channelParty: '5nbomexpcdknwqsjme4ojq7kcyxw1tt6vw7lwigtchlayqmktyxlu30x91vjddqb6g1d8oumkcqu611kmjjmdlohf68zz3e4ojwe5np2alza8bmsetvlwdb20pht7pqafrg8bgibjox39x0673w0c400k2pnaa1l',
                channelComponent: '0jv6gpmweb2x1zhts5n3x9qbfhi3u4x345dgr12sk7v3mckb1ynyqcbgp5syuzrksa3cteun0dfgfmm12dc9v09vt0elwm7srdpxys2zrk41rsmnfo82y1sy69c42bngvt923aby73maaogvbcp8im65h7269etl',
                channelName: 'y4r1vsbo4ik73hymyetje288hgl4t0un4zdglpq5ysfvrrrc0b2ob878ew7jrqjcfvvq5xae9pj3kw4m133lihb2wokea3zj8px7hdcy9wtvpfpeoasm8eni19cgyk3hws4cqwkofpf9yz02454resccr0rwnben',
                flowId: '1f94d43c-1e7a-435a-b6eb-c0cda6b9e84e',
                flowParty: '6d842b6ck1tpf7wzof7fghmpdni7l0nq08juuvxd3qunowgyay6eu8x8vmjl2hbluyabebmfbleim57degtrs7uredpi1lwi50nw4bss7rcovb1ky5d08ojakrx26eqk1bv1y8o37g38nyz0eofpr72i1r7xjyv3',
                flowComponent: 'z0hrcas52tl9viahmup9yv08tzsrge3w0p9g9lbcih610xkvsmz0y45n4o3kdnfsjpbw58trc13txeh796gabjpzjmlxqwwgd5x7rur3xu9srouhyzkeitdarw8nwv0j0admwk9zsdeczxsjgx37ovp7f2be71i8',
                flowInterfaceName: '1vr6jeua24gxxkirkzb82hszf7c7rn8l9bsnsf1u0ja55ehnqgsf7umn7mqm0xtlllafamrdsdtqhb20j77i3q6foshsc721exuay5urvuxmzmi4kgmag6j7pu8tb6iwkvwv24xnwxerqtc1gpgj7wzv2rf7ehl6',
                flowInterfaceNamespace: 'ycw96wk5901l91dxevs9jbmn4nq8furupsd6s9i3n02pkyr60lvjmn2qt2xhfpsmgzbcc5ncfpis1dgz68nlnc634hf1b0ea0bxr50ww9wtpzydfekza14w9s7214z3ads3g81l32ke3b7txafcw99chfbl7qz61',
                version: 'pz2soeiqgaa8x66803fk',
                parameterGroup: 'bj4wje60bbc8e7ezxbyqgiedhr4sdoau1a4tfxyjiftjvu0tzlor2d9yiyeywufzzr7wb0zt6ap3mwh5d3tnml09ztq8vmoxdg4ppkyhfoqaylm37kotwn2obv2fb1xx8i51xcjtaipde2kw93bpk4undwpjcq5nztusm8tnpmd6gfbinvzbq67pia46qsduy32tz4bgza2figq02equxalhcidukmm78ihdko4lfoxt34c4tq2h2gr1s52yfuy',
                name: '512mjj3wibf3vs0tn1jl3plyrkxx3kwecqg2sw4msm2w0n82n62bj4mf09h11eg5qvsti2dl0aioldb5ko5a8aj1p9pnhq11bhtn85vfnszse6qydxtg23pjzxn4i4cca4v9927f62ots12k8tqeslnh2jogpm09rwjp53mz5p5rdwge5fcizmljhro9w9mleisury9gfhpk9rl60aw37gf6i6wqhx82xs61aqsj0lj662d03u4c3wxiczq3udbtdxwewuauelvokyashoa5ucdpjxy9rxwxaedev06tdr6341nv5pp0arrcj8arl2x3',
                parameterName: 'th8b2tcyjgxmtvc0oa796wh172jj4cf8au713vwuj4p8sbg3x7tlb2857s2c6e3dnbang0c1ycbv1m0ttol65ydrhknvxzczdfk0sim7k1a6kgyd0excnzrplvlzcaz0s9y05nb0m9519ebxhn4rmkowxreivsa8gfva943r4xq3ggxkak39w290eplpyd16ilmcyzq5umbxozg9u0fhccapitvoqnvzwludo3oz9oodttfju6141mje54q7yllk96xjp7wsqw8evl8fxdhvs62gwmmzbnu6sjqehnog0fdkuqqpsqkfwtnmaaq8uvaw',
                parameterValue: 'z3pe2bbnn5q79u0z58mlut2g0of9kdrpym36aa414f19u03464rn64v2t05njgced0puwymm2drdp6pfq56l5s3cqqw75muchcu5zqugqz3qed30d6w10f1cz148d9fyohqc9z426nkpgiiesdxips6o87o6rjldpu1a7vtm7wqnn29q5x96gskpqeth0ssa5aw8ao8t6gy3nf8z26yg9hya3q4xv2w3tw8a6vsf6bl07o3009le0fqyluw0xizwlrkwx6lyneer0bds33cnr2hhx9dome227x5s8uc22hvy6xpbaalmbs0wbti2zrff46unsslvpb1yagb02wo88c1m1zvg40skzhh5g3x2d2828loijueca982h2w451k49zg2ck0i6qpoe2bkh9nmuuvwivjg0m9ox1il86olrqw9cphd8wgm2hbpzrkevn6v6jwojmmgk0wvfiymoq9iqaqlgq178dt5hiz60w5wxl3ihfkvrkurr32o6lqnks0drubgyqxc3bkniyxz5sr5srpqd5y7smm6wugxgirbh54b0xmlsu4cmseg94q6mn5cvplccvsoajxny6n1bpjcebrtv2abeftqg269o9xstamxzyrqnq1i3i4j4lmxntd7anh73mbs96rktktejkxsdfrxy4wshzjkneb83ktplk9tobr77j4lfo6z6lgpeix9uc49vxd6glzdhqtoyv94hdm2465higgkpjc1p788v6h2rrrs9wht0gnra32ivf75rezevrh83uob34h7ywabuzgettbrbtm0o3lzuf93wfsbxzmswf5xcmd7ga2vfutvkmoa8qdsu2xaids5c4onmtei4r4zmrc97du8sqpr4j0b6hg3j2t7e6li7hkltd1urqyb85zj3c9lbi32ev9hkku6bg35vsuwvitqdyahp3uj4dyjw5esuj5nckbooxtikqyg55mrt1eq9mgik8e0psg1l7y5c6gvhle4xg5b5a1wsepqc3bup6s7n5gtgau6',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                tenantCode: 'fe9kx6pkk0i47uyd1rvhm667lr5q97f0azbz7eirmqawo2hs6k',
                systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                systemName: 'e3m5m3h5m9z46f9jabc3',
                channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                channelParty: '9neogo2ggrmetucbbvoqaw1lhw7yu0l1wnftchbph51nk6xckjby6josvr2c7ttjad75rmf1hea7myg9uddbrteuslvymj7tim6x79mrod9gdh64qczy3shdmga8psplgd6oba5xga9mucugn0ykmgekv4w4qmy3',
                channelComponent: 'qchq2ai7dzm02y3kt36p5620vgcunnyl7nphmu4asifh948eyav3u73eonsqrjvsllw3gm00vmcv19ovfclq62l9qzhfzqxlikv9ruytqstj5n015qlkpvwb9yiajtt3mxuqcxvcfao5rvudtecsb4aiynb5wz5k',
                channelName: 'xrc618862lky3zz1q5gi29ic2r0c9qdyq8c94gkp3q3fjq1edu78c14y6ucbzzl29nu2ovoke5f82aen42veuwp0ank3w0mvxth6630smj78chl6jh4ozonekivk05i8zwtcni0vode2vdnmt8c76uoeqqw0fqyh',
                flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                flowParty: 'w2eov66p21fmm6tjy9x8qh9y26058n66rvoknxzlvn4hm24diggy2j6wkmu3srl0oz5etmoysrz3693cz7e971cmd7enj2wt8c8jixcfz6sufdhtw38gcifsxz1pmemr8b47h7grb3sciva1s2oggppkb0xkfvnz',
                flowComponent: 'sqxg74erk830umicb3j7lvuelnxf8eyne2m2pb9qd6nxxy4pn1q0b011v0fp0wu2n4sdodqqfpcj5mclhu1dw2d4pvmb4zlsjfn74yzkqjxq7nl90o1s7mz9psytcrtp9vw9s7l339c4qlydmo8mfh2vqhct75ck',
                flowInterfaceName: 'iv24kz3lbl8jqhgpanmkwygag2fvb4f0lw3qunaz5g3btornqn7i1dhpvce8ie9qptxix0fuoj1ionopbg3s6zxkmkpxozvfvatafua12390n9tlvwpyrpz0ltdk2zqxn343yxgptsa6bso4hkaahjii4sqkhret',
                flowInterfaceNamespace: 'a5rpuwbwlwz80ehnxak1ty1yipxvh4dzvsz7l1x2wr9d7h8mvrud5df36ub3gw4jtjjnzotayu5ynczyk3ay1ohhbaimuxnvaanoeewqtqinv6op8os5ap0subjvu8nlzbyl1eu4i57be8r8r0splujstw69ixwx',
                version: 'wsqwn5as30oh0e43evvn',
                parameterGroup: 'ot160tu1qb1gxsdmx3k9l40zz8rdcc7unzom7rqs4k6e3ablpgkwxsz8n2dtgnafsi4k8hx4ntc7k4cqfq2c832490m6td53auig63hb0d17w8k1q6n8d7873e9e356497698uya407ojc47l1rmc194h7jrq5dj69h46co70dwr6xip7f8rawo4cqtnlbuk1dl9kjcujk3afniam0r069om76dgayc8w52dbj65e0019dus8n8zbojcjplk23m',
                name: '127qqx2jzsjvql7f1ufmwobe431db76ilb6yp7zpxmztgt00dl80jy68uejhkkkket5k6o55vt87letucl8e96j9eprm2dz6p9y26ltmh6762u28c42ybo25hrpbs9xg1u5r2k4poto2pz7zqucdeeufjt1iewfq8glnaztec6e1z39eil6av90fn4wnalqkbpdy2yzfn79ufvj4rer8rbvrazyxd8k7erd061vh4pbab54uis1ekxp3z3416bwn9hyk6dgl0yljvfi4y2yqtgt6w2eqwm6mk6zlm48whpcj075jz7bnv93vxzwzph8b',
                parameterName: 't1oqr29s8f9tm6nhcqnlozvvjj7ea8vgivzwcqdvdfesxkgfbvk3cof5hq9xm8j35lbn9igsrqe6vpv94hywhsnzsuwl5flfn3yozt8uwgtz24v0elj2ihapmzaxlkb6xdpe7ehvqthxsq05qknr75gg7yq03pj0l1ebhzt3j3b0am0h7v6sa7k6mzeuxa253bnpiu46oyg33fx7gu3uexouts59zjopiqrcnk7ywy3r30y3w1k7zs2t3122uhw6eshujxcoviave4irrtz0txlmmi2feh9agi1ei1zmv1eofypc0rc0yfc1iofdej5w',
                parameterValue: 'qk862aquiy24qoe7msc51pcp7q2ehw0mob07r5xk153ltfrouru89hk1j3x9sqoux0zp7feie8tmiqz4zlw1sjae2m00nm1vyln2fumbkm09bf3nexey5wryxo127d5njr5sjcvobklykrz14excmeg2mcybdglivw843pzczgcssa9otcl0dy51b6y8s32j2c96ey0ofc4uzgwdd4smfd9rap6v97ru6z79p50cu47886gkcbbjwftiaulnktk546w3zb4vnn6hzgyb2p08knifxloqw5tz3kds6qmizur1ompnw632xpwybddgx88jldnjelrz6w5vjdpnmil8nx1e6flglc2tc4csdm233e2kg71sy7snfkub90ly6q7tx2eclmagu14bc4310fomwd15egi5w2h8t80iyow6ykpi669aqp9t5qbux3rsqr4nniphgyhh3piamvjp578v5dlkq1bo261g12p35xnu5exssdonwriyuy9c845e3g8gqu4ttbt4juh2s6ohoyw7aknbdk8vambng48feo7x78b1d4tr6ud83pux3yzoo7ptcy383nktm3p77am35w0ecj3u1jrd6uw92d6zx57gp2zq6cpdeunfoi41v4v05nk2t6zoeh8tr6s143hj0h9s4jun6egstsijf9pq56hhygq47papr26jk37s8vyismxrtz6n5xtlgvaws94tcpo1bup81grcraibupxs4xdvf01vfhna3xb5wv5hp8iwd14643ahudzue4vhnl1etfp1ijec4itoalscyuta5as24t6lztj0vzzx2k4k3c399gky11lx3w8gbyozft5i8lgvrql5dmtnhk1ps01v8e9gq2b980r5fszt4yzyrl2pmjjjh3d0elp6v0yepcfthc2k5kvi0uxessrm66jjxjpyy20veuuq67e4zzxlbaud22wrxw22hxvan2rb480yipxuz0raoyht0vnzy6u2giajltaw5xtr2dqn1bih6sto5byf',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '886640b0-cb76-4cdf-a92b-9037840f28cb'));
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
            .delete('/bplus-it-sappi/module/886640b0-cb76-4cdf-a92b-9037840f28cb')
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
                        id: '60344ffc-1547-4be7-a749-a5c87f2e1258',
                        tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                        tenantCode: '7adlr4g9yepywv5sw8a4a3wk42qe8qkv6108nei5lxz45o9msj',
                        systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                        systemName: '3qfxv1am8jkivgof33lq',
                        channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                        channelParty: 'dz9c8yok8fd3jcqtg7tepgr6a0lhcx7qhwjjxk0l25uxkanpq6mhwmgvky6ok4vji71rdqit7u7om41l78eg6voq08dtzr09ylpbjllngcsaevz8nv3h5dqitykucsu4ysnb7r0euztrw4vboal6ko6123cwjc6d',
                        channelComponent: 'flgw87xb6cvt0rt3tlnee1dthbee4idxhytqs058pvj40gc66jvgtwv83unutdgwjip6htitxd1l9f3vga3ndar2x8c5goyywr4ux4jjiq2apqlktt0cebamtwrjosy2yh54e27zqgdmdddi4w52eqbe4mr1lcqe',
                        channelName: 'lqzoy95tivh2vizh2i0b4n1bpk185e3stjaplrvj4m4rqtjdi9v25tb8ywqqvur9be4m7ny61p0zi8shp232qwrx99uweyjqa3pbc0cfzxwfw7nk3669a2zp1e9dfswm889w65vxss67gufgsxas7rvp18o05m00',
                        flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                        flowParty: 'm4fp0o93plm6teiic6jn051gn0j2sjodn6mdy7qtodxjpk19n2jkaqrdiwntglo2uvj846peqv85n7s5odl83v3bz3ft95es169g4j00jdkq8zq8pacuz81vb1yntfjckyqq98ifn44wxtvyl9z6vxvhuvteglhk',
                        flowComponent: '380ptdoe70ju6lj8wbc5i3o3pgbwntjforufbbikeu2khkpo3zf2exdo4q09rh2djxh5bwkgckiintrowx783u8oumaymicaq7bcsvjdtloi8k61npq6o5n6m71glcpckpsf715idwiib686pbsyeajrgf875evy',
                        flowInterfaceName: '8wthhmo2jq18voqgecn90myjt9mksskqqxh3tf0h3k0ct6wy119e4slzosl2ejb8ow3ldamkwnwtuqy61xdvmdzw8ydcjuxbyhjzn30p3dqn0y8nhhco43hcftczwbzt72f64bf6ft1gp6zkxiwyhxbdyzq13pf6',
                        flowInterfaceNamespace: 'u2f2ov5q7usomqsgo4qwsfuuwxp05dj9r6cge1abeffscqxvj02vpx69kwlklukqtvi729x7w0kivskxm6ggup95xysg3lwiw4ve5ogqk47ypid97bveolt6n9os55zoganr2p27nmk8ffdf1s4t7tpubfq9ogqh',
                        version: 'or8tecg2v5axyv0w4q93',
                        parameterGroup: 'ssngmiuwf2zb18mavxtedmq5cg9p9hw3ig6e1me5oq4eu5il1ru93wvj23tqegih7y2t5m7r0ghqbefynq96g048t3bohuii35enc8h9u64tmq4kggs3pocwt8sxl6afgvxd4fy1m74smpwogyui2ubxwnn470nqr9sepdot2odkqib96ze52jdp4p3b7yfba9fqnfmqp9w0focb84f3if6wzyw28u6fn1x9ijig9c9o75qp7bx44ffb43jjtd9',
                        name: '93u8bcz5g45fpzreymqzif5nahg8n8jbh71srb5hpckmldba1w7p63tj84d5d8ditth2q3ay7co8r605cf9j6qxi8l6v5zp05thh6ntuyljofvus6i2jnkml6vfrkfivrukywm1ds0m75y4i9kauj51muvjqmmi3q3630zcqg7lhu3njl9k09bklcmh88xm8zkgoxq7fwdnq2l8zkkgbn1n47ajftw8kgxtzl6zwcgcevrfucqtmafr1z8ox2wkb0vpte5lqv9q4xidr7jrg3z1aff0yf02pj9cputugjez3rkkge0g8axosrmdexxt6',
                        parameterName: 'jxzeb55fbnr0ou2spt8a8whzdb4h6oanbd6mky7zqbmm5jje6btvy763std9g8iwax5hwvd3ljquhg16exlu139i72z600sv6sw8ux5g8u534cfb29ywhz2vuwatyzl0w20r8ckpkgdhswfnetyknu0i2g6l3sxe2kzrw4gtuuuuyrtm301g9hdk1nhizpyj51x908yrrub7c4a7jybn8usj9k1cepf6rh1ti76fxyt1rlnk37yapn6ocdw7h707hf1b398g5te7drmv4zcufnnn5lxltbux6fxtrch34wbdm68luicbfmprb993jcsl',
                        parameterValue: 't0je37c6j7kq9b2ald0d75d0gq22n6xxlo3tjjk5ugde8te1tbvemg9soieh34h67ltb5ojjrc9mfxjxyaegpa8rxpb56lkbcfbbla7ekccdede46dyklo1oqxtyd922xnmdmik5fjgbej7vost04lj3iijtjs41ser4f8gj2lss198ovb34mfiwmfwkimn636w60w933da4huxqnfvt8dbkvo9vw8hnghktzdvpmjak3x4xo5a66iub0zdvy5w8wisj4t19hec4k22lo4849ume67jnnaa69zsk8v4gmd9k2i62ahuk8q8n084gyo7z3n3tlj4vqgbkzq9v8aiy0fc5pras5gy53f2nrv9z72htqlcvoahejxv1v0yf964edmozirwbo2e4c83moio6a0g6mikcw4x0irnghhxmxt70iddb1swfkukxjiiq5vb0mq4sqfbwbiwwkcade27gg09oqcqh6nbcy5sbrodp1jl6ujs69q1y11kcj4w3j5whpk9k9xpkz42wktttfja5jt2mshi2jlbjrkmyespojw9vz72y5mflr09v25dwvx33815n7pnt9rde8c91dq3nch5qfeartsx4289ismmpf8muu8c45r5ikpsz91f2nwoy7gbaz0qao3kat6tnkykwohhakh0r7qo383ejd3i2d7vjj5svkzxoy34j6ut8qz2syp2fmn6ecbvd07qzfclmb066z8n7mn0sofrbre5x0bbjrh1y9kjchwnlxnyfmf6kztmeezwtvde1u0cbyr9j8g0wxldyzxmkcyb1fb3vjwlzwffy45jrwkjicre1en2ksby4tdkxbyoak0lg9m7igpvn0i9rdt4641nfk0w6j15ka4nvqfxbxoygm6no2o1iibx6eyw9dxxqodsydwhcyyn131r2wg5m7t7e2gmv9in2oxe394utm5mi9tszobg2lz2uf79id8rzsh6mjhsisd1nhxeisrmmyxifl9hnh8v58btq99ldlzncrn3vfyxy',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '60344ffc-1547-4be7-a749-a5c87f2e1258');
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
                            value   : '886640b0-cb76-4cdf-a92b-9037840f28cb'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('886640b0-cb76-4cdf-a92b-9037840f28cb');
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
                    id: '886640b0-cb76-4cdf-a92b-9037840f28cb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('886640b0-cb76-4cdf-a92b-9037840f28cb');
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
                        
                        id: '2a68ee1d-49dd-4687-b892-938aaaf36ab8',
                        tenantId: '91f00518-a0ee-406b-8e87-2bad6ca5eed0',
                        tenantCode: 'kq5qvmhclp6j55r4l7xrhnlftcfw3qimi37cxiec9wm772zi43',
                        systemId: '28af1f2d-185b-4240-86f9-7da8f56893a6',
                        systemName: '2a81sf1gj3lzgp8c8ljd',
                        channelId: '74dd5e6e-04bc-4043-93f9-fd0dedaa784b',
                        channelParty: '63hjutv7zfkoedw4yc01p4pz2j2e4bezssfhj4u1p4gr3ntf7hothkr408kgz5h1az0hadmyhnq4odmwboerroyoim4e6nkcqgbb5jgjnkfatihq9eoaaih90m5vp6zhkbxfgxemo802z7h497goof1idr0lbmd6',
                        channelComponent: 'ojmk1o0upz91k0zzicg2c5uh6n2umlm7fb5zm1jc5yho4mf78ss8foxl06bifrl9ggxvsucsq56je2pxj9zor3hsvrbrtb0w6u9ssk98wn5dlznb87vcu0w3xgu5z2gnprasiscn03cntn74v5fimg0c8ixp5xa0',
                        channelName: 'rs99qwqmd5krj08gs6csgxg3hhea128vnajn2jzhf3yij69tx6dmk7q5kk5q9hyp8zedxs6h7xth3l9ur7gme4md9jrapi59wvr8ffqtmvaihxoczjwbrdbo6zlochxl4o2rn3kpyh7sjcjk2x8ofv9ze3wre4t5',
                        flowId: '95349c81-98e6-4f81-aed6-86985ef7bd3e',
                        flowParty: 'vyby20h6m5hicrzfwfytnw3ba8p6zevvlz8ntj0nd7bx27w0ukorfbmn703hi5dd03z12odzcmfl5hh1a7yns6yqz64i5pknhigoznna1xydcel42ih90jb8joi15700yvcuks1vj25mz0lyiny42oq0rhjm8swp',
                        flowComponent: 'tszw206h8ujvpjdue0f4pf9x88u6j8ybkb7wapc2bc3nyutftiobv1cko2tw8smwb2uc4hg7hsyem181jioyg5nm1w2ihrt5jkaktofqss0notrahsbyvg2lu2ehcqyv9lmdatcmv19z59tas586uaiixaq323j7',
                        flowInterfaceName: '6lcd6hs584lttorjvbqmfx7hd0hv6976uoffj37rqhw3phix4axvvgn9kbi5tpsi6u3d55vdskes06kud9fbt68tupcaqnmoyr3ib7ct1hrsdk1dmwxg541ltl001ljsh5atj8h60yudyzscbcocnsgvhkbpmxdb',
                        flowInterfaceNamespace: '8qnkbh1yokna9lqajv4mzf68170zseom31bvzpctufpy470g3sd6kknrs3din54aumcml6ilisfnr9szsz2erjuoxapv73k5bdk2fa3ogxe9z2g55vt33th51h00wdztj9uml6egwx4xuzt60yuktiiu6c61ioqv',
                        version: 'pfthelxkgy0kgl22yrxt',
                        parameterGroup: 'z4gxqottpvseha470nm9174e9glb3pxcpr6x7i5l7dm2qxsxz4i9g9za1sii4qz81ntvtlwr5t06c5jop9ozr5rr952wjsygmrcm9pkkke5n24hlzjua89ggbpq1ateyqazeuu3ypmsy0q0f6nnhm5xdala8dxz2g06ce4ce9ta9tem82r03ts7zjkngj94skvqsl7ow7mu15shjcnbus8hwoslbpa4j5edryiunwwulqh9kqx43qm6hwwnoa2q',
                        name: 'puubddt19isjkn3lej7gqwiiyyxyn0uhp9ifivzd8g46rabl7reshzt1jebsrcf17h435k5ln034iqzv9c8q4l0wicalnnxrhmz7kh4ngvgvopa8ob5amp1zm1wsf2jmrn04wfd15mpozkg9aqw2zxbsonl7zxfr9wokhwadx6910o56yhyiw7zfixwrfvel0wsen0hv1698a4zb99cqy466acylgzp9avbhqgtu65ymcql2fqo6qfvsoijpzhatgr805jkpoym1vvth5diubjvvchuniufyny74087mkgyirtovt3yklwkudjq7dpu1',
                        parameterName: 'rr6a1rfavsjqiei7xa5fwobklvivkli449qh8p3yni60vnt0szd3hgrh4cmk5i3lv75kju7658suzmafa22o48fnl1y8ied9fene74p321edx70j8tyjn8y30l1g71cws915t1yp2ktkf85kioek4axyx58crhs1yjlkmf0dkfustwtvcgx2mzxi9ts0clqon774vvntc3uu0nik1ly7al0t81ghnk98wi4rcm3bqqe1mrx9t0ifqrizpk1hee3mweksx385uf4z3jtnpypo0e6knpzw8zbcdl7v28uq1222zwa4keu557yf7suukqqj',
                        parameterValue: 'po0rjslswm6hcts78nku60nwrz70sgtdemmffeda33n3w83tea85kvo1b6xucy0iuwu6htabgfs62bg8l8ms10usizuqq27fd3b14x18e172kigfhcjm8ezqgx0uorbq3lors69hoxdcwqx6cbeq6xosu0a36zz2upm7w8c5fk7t6skuhba8alw31upp7lbgi8f4n6nwhsnhir7xts1p2ua4dw4k2nvm29twd2dlvzdmzwcc64d7v31phgh7p3vdo6uw9dwm8bfks1z9azgbkktkekogrkvf6gv6ozyojvg4pef6w6jriq7ecxis6ofnq8z0a8sjp5fppwkh59xk2jhl6tv2s13l5u6o988vmjwss6sqdaw1px4refgtvbxezeyykl26d4651g7lhrtj334l8nkifmj2iory1cw7agk9hucthujw3g1r4lmd8i7onpu7m4yobapqpfsalkvj1yb6omobxg9hsgr601iy64zeqlmzmzdw0ccgykgmy1xksnx0iygxp3wgs3lt0b64jm7m9pw35bgmhezomxw96md9blpjwjt15frc38tvutla147263plp26ei7ec4wjzn6ssq2v7eeu989te86jq8zzqj2zmxhx6uw3jdo9bw4zycat4dr3gheclo0l9hedkgwt3jmd12xtiig9onleota52hdvst34rxzhrw62yo2m5zfcr33q5g89od14ioekxk5tt0pwahs75de15fp426clgzbbyh4139win0q06mx8vyvqb9gphi2ugsedupivqulgefydc4sv5ojjl8kctic71ssf93io4bqp8wfudv5linad8ck2b9hkekwen0r4g7j72imf5ow45qe523prlx2ny07z93krl3rouz9j192pw60bsdwfs4fbifneg63z9adf1x3p26w3002sknmc0nk1jd5fywqrazqvhvd6pph7sdbtk6vjhrpufgdhwd70ef2zlyqsahelkhyfcwadnfur8sz9c7q86ea2guoohy7zt',
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
                        
                        id: '886640b0-cb76-4cdf-a92b-9037840f28cb',
                        tenantId: '40c0f04a-c005-4825-b83a-ce7b7138b826',
                        tenantCode: 'vjjls8m9r11nd0whbjyctmmwbdlr92ui8csa1q1lggzhvsdqdm',
                        systemId: '4fcafefd-49f0-469f-91e9-9caf55ffeecc',
                        systemName: 'z94fp1ufv4hl7xdlm2ep',
                        channelId: '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a',
                        channelParty: 'r159mmrktlkdvtkqtczkjat02d7aickk4bqm2bf1bzjw77ulzp5aq2s0yxula99vvaktujfuej9f5n8y7cr11icee9p6hei05l9wyi4pnf28ycyvtlp550qxnlfc9xrcfkyzsu62sp6hilqsd3syjwpiml3s2nvn',
                        channelComponent: '4ygg6kt0pzghvt5k54y2qluq2jaopjjyysnxd75925bfk6w7qbf4c9l6um9nk3cxjyig1mq9phl210erlp9we31k3fvvjfx3rh0s6ab9bguu5mxnfkcpz7x9xzhubgv0bq4popiqmdj2w7mc909crj6olliapucs',
                        channelName: 'u58z369k0qpxnx3hd3463z4kxzs85zorry0hflqw26ws0vzh6fr95wth7qym41en3ydsnff2hg12fkn0sa502veob33yseoa7gep92v8ole78pdaibhq5zrv2mvip1tn7ggnnfi3m34th95o2r5116mm8whqkaob',
                        flowId: '8428b521-e3cb-43dd-9aae-df4c68b9de73',
                        flowParty: 'js5nsldhx4w8cbm6jlpwyi8a6hfxbqfhcw8g2k46zgh54niwxf6trw159iggczx3m5ee0gqwwzger09cu9xv7kuzy1c5vixe4jb1o9f3wcpp13bzeiomze3ejazfyydfh7a8rzg61m9gmz3xts4t3gyueoxs94wn',
                        flowComponent: 'z33fcjywimcqwjgbrm4cm2a8xe3gd8kz21jfxcqt21m4apeg65cx5szpa42c1jdnnamakpo6xbhpyuj76zvz4poftdpqwtzg0akrpcg2sgi22snkkxras3wyvsqjkm7hd9wy0ki57yqqk7bbjy90wpv60qmu3pzm',
                        flowInterfaceName: '3mha3kcg3wnnhu4b9d3h872kz4ogdbbhhmcuo5nblqyr5yheu4rmcgllv46qf0i8afhkcd7drniruz3miw5yps0ybqw7fclxdyqabmyt31kg1rkj59b10yuyxjmdsv8xz1g02kmcetajmccsctg47glz1n8e0bcj',
                        flowInterfaceNamespace: 'gae0higifgoufyobwyukfo6kaxa5xpdm1f02r16k4sphxr21qs0jtosq5lqu1qepipbuqohrx0eem2os5k8kp4d68w3wk3vdh1pmfr5pl4xrwsnkuhpqsqb5tqe3dwzet4uqc64hegop6z3ewoehsln8mu1rs0is',
                        version: 'worptzdr1gnrnfa0umku',
                        parameterGroup: '5domvphf3azflbger3f2nbt1947bojq1o2mfiltsyizu96t0h2fjdf764bss9r5m30jjaqo0shuccwyo8volx24meh1241boks7dn0h3udfljkktgkt27eojgmpepaaatbowccjadt63nfozxbqelqjt23r7bjb0s0k2dwhqcp4u1nh1pt55mv3zz4nw9mr7gyz6ehueoe2fo1ala1ojvrfalit73yz8brnbf2n52awz8bh3hqas73r5ltgug5k',
                        name: 'ha4s3al7e8jb2svfj1shg3v01fmn6gxk6b0d3ff7gri34v55zwqzl7p4hnzcdz73wf9glsfkskbdhc2hdyxpo1g1za48tkw2b8eeyev4h3buj5abnmkdmzna2f1qubkhqijpz002tzs2fcfhnwg4pap6joklj8e39k5lag1kpozfg33xtfscr0agve4dswnm666m5zvcxuki3rk2xngbiv4iq3rnvz281yvkungc6hcg4r1w4sz53o1i63okde1juhqjev48ep61tigrb99r3whuu4f6zm9lic4m7hcu5pkl69vp3v43jjq9dmp3n5uu',
                        parameterName: 'eskiit401t1rstwpjss7x945luws9mo23r56n8qj5rn1tx0wibawuboj5mgu6ucz7qj4vjadjq15kq0lcmumktkc2nep6omrc7a5cd8bj5ukcnes5z4limx6s1x6brzou0zwgwyxb5ij1j7l83funiy4a3sptz0hjktke2edw27kb2ndyd82oosqy8vlvqtmuewhm6p82jkuav9rkzct5s9bm88ywa39rgxcnsz2hmw3r7vnnmttguvwid1bfoz0a1kpaoezuhxaj94baismt3no9izd53q1ybxxkdv82zaoqytwe7eaxpjfqwaplx38',
                        parameterValue: '1zjt0pe6cmqx8yt2xh1k02lpbn4u0jnjkt8itamllcwzbf66w70ge00xrxpgjdbbmbplbzj9m0b3of7d8i5k8bs4thq9mb1nkgc8o5ko5ulcrw9zinrosp0y6zp5241svudhju5z1ulhqb2kysbktf085h4j3ijpfzqjdo51wqgamjrqu3ii2adyuxipmn1658bxphctgu3wtq6o8xhryx0m55agcrnbx7iegcu859bx3x2omosrpmumka7u8j2umxjwxj7nny1j7l916439r4r4yxkopuc6ta32gpfiiets5be6ex5q4hss32e29xzsl55f8ed00cqn52mkxqda8kj1okz2hjrd6w0kqnd6rw40xpfirmcgbz4jtjq9kpy3k3lervkckhuoe69nnszb3ohg7y4iekfq0wdkmnqjjutd496wm2t3mw3bilmr127pgfbir5s5dzanwrmqr8iz11tox5putemg80ll0amx024ncoz464y7uvgha57u6auoxy1uugfwgxdtw66bckkvjfamx7t9oakg8qog844zhl10ojnm4kcdg8lf53h8c4y3jcw2861av750vq0dgxjr8ajaro688pu69j5ng530102augofqleh198kn9wy2dbgggico1nhhmz2kd5rxn3w7r39un6ka3dghz0fcok04x5bw1ibwxzftg7w9zuxtwtdrdzvdfmnrpiaqzui7w4dgdn8fnhc5k2lfmlzugsd9edz0c4dki3tjyt4viicdedb3n2wt87yalvx24e5dys9xlqopfm65bn7tn06rsicp91t1kjf4ndlp5q8kc15g1y9tdl8dechfs0zl5iepcca7eeu6wrps5i8y69xnm3ws6bhjfadu3y1aglxkjmznl20gsr2cc6m5cd6xx3zfiqsprfxezxmguft3if4chkw2fyx88smhp0vve3tedhm5mb2t8x7fils9bq0cvpimkr88fqnnzzdqyl91bfw0po3meofcifnafcivj4b18kh1xmt',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('886640b0-cb76-4cdf-a92b-9037840f28cb');
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
                    id: '886640b0-cb76-4cdf-a92b-9037840f28cb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('886640b0-cb76-4cdf-a92b-9037840f28cb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});