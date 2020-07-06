import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AdminModule,
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

    it(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'hhwldbleji0hryt3x4nj',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'cjbjjtxoin1acjyf5oicoyvfpaicrngq1c1pggje6zyhi84kavqvhfjgvbgpgtdpb7vju7neoxbdtdow0po28x3kp13ur8dovgfe0sy84g298r8hvigf1welv2ybghnw6k0m63qqxigqm5ivkv99skjkaynp1yta',
                channelComponent: 'nge5smwhlxb1tjpsps0loqimx3t2qlqmtmglarlk9a7v93julyn4c273gzbr0slbfpsgi6t4nmbe044mni32qbynti1je1lpgslxpreyk9snr4e7we7mebbwig90bmpcnbebyp4hrp0b5kdsenh3fyb9ga3kop50',
                channelName: '1vnfjwwrq2x8dusf8mgovhkm6i2ao0r4v0f3xlxvcpezpvf089cova1o62m1oiicefob4rq7zjiokhcvtdn1c04z9vhsetzikn3owaeku3oqxjqsvyszrb9vw9i6o3je7p170bc8tn37wq328wom7hwqhp547j1j',
                flowParty: 'ym37ee6s0zqtyjm3j5jp8fv9cffav7q2zwfipnwjvz09xg8fq7f2ymh8cor7qi48iz1kkfefcd9cn6lx5z0g4izn4cylnvb28i99rh42u7vze47alq84o3025l34356mdj4uc8337380mvg7v35wb4trw1a1b4zl',
                flowComponent: 'j51a8hz8itzlpxapu20lk1b72eqrpdjkn6aqu4xlchizc46s2147nkkgpian7jk4ypg1r65o3y0zp09xg7v4qp7uqztltt8815cp3r7fnnorwc77zd63cvoi7at9q7zctlfjxvve7pcr1aj03q2w5ontf3tjmwyo',
                flowInterfaceName: '0hz8yjx567xk839kp561tp2jd11id8og5zeid5sz90s5xti058s9535tdub53pz9e80ij4fgv4giq5k7e1sxgfplyzxi6fkpw7o373277djuh1ih11ye82skg2gtppdv0x35rhzfhb7xwj9b8ydmjhxczg5cfui2',
                flowInterfaceNamespace: 'dxnaegkxwk1aq6fhypu7h0bluitrlpvbvy12k1a8so3tdnymk5j0zrpbguv75hn1735hojhmv9rlipze28mq5hww45m95112vb5g1pf81pv6b5jdgpi1rb0ezlw0xqap8co9umfvw00yc81bwk408r0shqcuvcb2',
                parameterGroup: 'ys05du78bytnvzvuz2hrk19xwwlr4vpsox8gwxtw84afq3rbeh409ncpz6jvdy7i77b5gm2dmfycgvctc5hulbiqp5wvucb3u6bhep2x65sjbvj4hfvo118g2d41h19c99fg03g3lo083s7p1y3rpn9zc82xgohv3tp99tv0tp5vd1z940j0vxefja6yuzd7qms7n9grpmq29kbuoo64oa3zf1jzbpn6m4m0bxg58pur7kjmr76jii9y4n2gi2v',
                name: '1ylxxmu01o3dweuw7jfs2j9fpmmmkdzm8cfec73s29slwz6crj5icxjgilwhr5y6t8g742dh372utl5vow3smiqnok1y5782f7xdc7coq78gbyeksyl04ojrhqewwkaarbfxuxaeox5qmyt2um6mxm0pbyhou1b7is4gd9isgge8lanibdi25japple81z0mc6k5wjrrlalco8brszj6jsfrarkuuze80l7v4fy48sdvry6ok057ydz2uwom9voatrj73kzm1rzngsv47woyhknujv4wwwyt7ocdmn05t5flx560al2vcjjtgaj545we',
                parameterName: 'bwliii9u970zw97iw5pyckfrb3f88x4wni5ndmc76rqe96v0xkw9tu5cpjzhb09vxlncrq5yf1bs7axutr1t3ypaem3ub71950k7i4dbl5togkc2zj02tmnx1a3f8togtc7ksrn01g7xu3bp2kvlj35jbvoicry3xgoi4hqwy99jyw7j0fshr5a0ijwlje73fhgdyoj4r4n2akvdhe8b59z94ln37li3s6n2oo5jundncqbvlpju0pnicnffcuvssa9bkx6ge8dln7i52avw5fdal6r3j0tz7crpf83r4kax9rw5e58ivnngumcenvjb',
                parameterValue: 'r4ubcvhennybghfg0xz8v51jsoau166e0bikjj64dsxk3n1svddqnegtjf5ydfdgwolsr2kr8a2nfiaou78s43w5v418fmwnrq7qgneic5x2a32wzbd15xzxae0caq4fm6ul4cmktts4jjn0bebsahg95f1va5l491lblywc5tqnbjnb052o1gfnngys4jywdi8gj1fgze2kr697jk4vnic5h34jrm9r7szvatet1wvdww49m8s4u43268nns1g3jhjk67a2dz7smxgyw5mq2abdlogpjwtgmgf2577z6u5vg16e03rmobjn9o8j7admwurz5vkwxm0sap4wyl5blccnqela6qfntcfqur4qr25cdu0p99xg09zgw00baxpxja1vedjmde485wj6dibue39i0lzkhxjqgdztzxn757gklgpt66eup2qcin9xjriqdjcqobavdyw0uh76e06rrldkj3q7l8toctgyuoyo8s2wuhaxg4ep5j44bl14ty2x58eju8ygzmf5gqqh92r8505coowbgd70kg7v4bg6ivwiu7ah1g5ida5wbjim7buuz6z6zxc8kt7y3lw1ukwq2zrt35epc1sfx9p118b9l6wr7gyunc1yjfd59qymf5gy3h41x3dty76jl7rbcbfh46m6c60viis3uxoxq16teibxbl1dinucwnk9u5b84ubskfujmhqjq9de7r46lfxmf58n05osmx8g8h72j1jjv7c1bs6s381yfgriqmw3t2ugfunrtwc9cqhyxqgdcs68heu75scm58nr03cd1mm5w7rb4bngiyk0r4lkgc7hkyijn7wlgt1re6qunsu3e4ag9wkilauq1j30q3uphuc518nkbavuzbk5gc26w9483g38dezosawsporft7l72vx7cp45dsm24ziqvc9okib8nrvqrmhewuy9h0vpjuvyzbu63m7w0nwcg1e797xr80p18ipfm98l8ikkp5h8ol4d8sjtasvor14fdhfjdzfvz69',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'nmmipj4p2iffidn15e2f',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'u4fgukqhogpbgp5k61vpndlffeye47mou21qrn73ngxavemm6ey2um70i6sj1nh7g6n04tajvo24v9cd95wb4q6qi0g78gdeggws9n2vm9pllo6sp2qp96rjft2qwa3v11zrlgtbdskwvcxt5xm1rlkdx00vxjl3',
                channelComponent: 'hss1yhckbsyctb9qydostlp099qv0xhiz7cvz9jfi089p2xdgmkhmxl9cronmnhx19xt4frvsogtiowteuk7xkyw8zmvjzt768v2qi338rqf0i6hpyy1mg8qmf8v780xmg4oi0h62flynggtsgbb43xftcpxnckw',
                channelName: 'hv4726xkt6da3n7zsf6pmb49uthkuxfqi2jty92j2vg87mpwezxu6kap9s5hljy0869reur79iwj8kv5ltg0ghmegy1g5gy0a6g1gt885es8qcvq9kfq5pz6i37d99t6d8mqfy134i0s346mbbsboorunl970t1r',
                flowParty: 'kk1y164r6gqhf1vu87aay16utopnxfxlrb1syo3un5fnnq6vgcr3f93sbfkkcz5e74rz04wuap69bmcsqxpq2ocut9gdjqyyf1200ag1crcz316z2q77zd82spxpxrdde7imk27v999ikukkp7z6mxvrauoa82fi',
                flowComponent: '1p88cb1w89c3ja5w8g2czw4csejvthyrr88q1r873omktf6i28n0cbo3s1jgoci700v85su0glksgjufi6qc7ygo3unc9husfy2d7b9kwp6r0b2ef69dr631h3lrtfnup2bpjtmibfj5ash3edujmajh8yye2nvh',
                flowInterfaceName: 'gncqhjwlfnz5rpmwkdemjv1ybvxb69e560zazv4xjzyyv2106hpm0myec5re53s3u4l4bq5euq60eiva6tf6b5ixyss0ccv91hym9rk2jf4b5o2wp04knai7q8thy656oalpur9kh3h5d3xhw7wtyq4b6p1zao1g',
                flowInterfaceNamespace: '1ksx4ylj0t72nn6z3n8ktmm8rshokg6d9fqmfcu2utdty7zsnvh7hpxssuk0utwp3rqbhn07407w82j3f3s9g92kmewzu82tfn2m1wr0ebuyv6zfubcqrpg6q9phec302la25bu3ibd1yybso3j1nnlor34lkt06',
                parameterGroup: 'wjjwhfgx1cmz2icay2e2mtake6ff8qi0vu9r4sjiq07uk7s20x6exhljvn9j22zc6iy5tto1c3kardzk34crvt6dpj0mpio5hl2ckxg6f62k7neyq1oxnuwd9gzkvunkt35o0tsahf25d1zxmt0l52j6kghehvszinov28r0d16k86kpp5xl20fhd1omtvkqzyqup9kvzya7tsipz7cghfz55bqp3h1prgb273tsctkd4zg3sk38oordjemh2eq',
                name: 'kqcpat41ms1yjgfke1yfhwnivdswaudi9op8gh4aek05uhucmr7fj5cb668dhjfriixlytwdkbzhtujflgk829ej776w76m5k35tjnvshvb5hgoeg8jo7swmp6q0jerr1zfq12yl08muugpfb4b4egxgl91ccxs4mwx7ez8odz3b23aq7azrdwt90zc7spf67rp4slyjl10lzc67y3lueg8v8zwsqt73z7nfflaa0am9yza605isy64rqn9p1ujpq21c539y3m6noizov4yyuidkwfmghi2dexgs13ieg5jzx4ax8fpwj3rgwbgv87sx',
                parameterName: 'jq8gtzfc1zjvpwdrh4jdgggdtoz31rg63e7e6rn3gb3hj03bvfmyzqux714z8gq74wzvf5n42coxw4w1jzpnofon5bf0eo145clsf62fil4as5y6mpy6tkc4ysei03cwx99to3c3kddawk1ddnis6vle61ri0xmarrjqdgzpw7e3edwba6x86bhl1hmpa1klxbarn1hpg5ktv5xvmmv33ybtbs4hb1rzyh4lkq2scp48agzxwgu66hwszoxcs1su48xkxehzuig4jkrt8kkusca7t0b78a1jl39rxbbpzllzuk6kc0jbymftezsto3wk',
                parameterValue: 'bjk6y7xebp0zryizpn4mu6jjgjtfcdasx4syysutadmo9t7h8zekmialcv2ey1kbnes7uvfq9gchsrwp9wboz2fpww7h28dlgcyyxhw1nbaxpi6dtyd9nqxzwjv2x6wm3il7quaaimffxpy7wki4qo1nywuuakhcqq63r9xdqn1tq87etw4j83j240brnmz4l3idxmu57z4af6i5dkziuy43e74jju3ysb0nvyl4qof0ge9n32ai9awn8xub9l4ei3ggj8khgxpl1sqlgqduc2tpm7ultm059ok6x15q0w8qqj0188mpw5orms3y9hs3bsyc879f6pdttvpsqsz8k7rgcck5asn4w8b7oa12uf003hu71wntv99ygrfcamz5j123rx7n71pad91b771pwph05icuieit1z6bdkmqfq2do08d2hofazftn13q1inzmy57864gtkic7wgv6zohlm0tvfhaavh7hntet3j1e6e1x9ptmhd1k24s5x79ru8vjkas5yvx3n9thapfrxn9mhx4zk993pskl40qaj89xjbyek97cfhob0gqdpsgf5eerfjm14mxehbvup1818w0v3wacbadr0s990p9w3w8k5seco63rlzix6l6ececaqi85rqzfbtbg0y9htsolk0t2vdhfn0fu868q6fueyt2de4n7393g2i3g3v6cfp083f1uuyia5mud4l1dydc2i9xyv6uiy4pji6pfyvqoncp471r7pbweuaqxit4gxngq8oanns6b8rh8jqadhm4s1pdq316mybu47sksjtfma9pmqsvd3ujal91kb2kgpdgh3gxfqozl141jp90mqg630b3t98aqx4ngl5j2svc39a3psb4ljghufd9ovekp0iktu4o5iu5twbeytjmtqmx7kbbzgvuz80ba8dyxztw0nz3qus2v3b6sh2lk32j1mlu72recehda1nvy8iby8ibfv6v8m649ujn1am5xrbr81orghsodpvsvngjqpassqyvmn1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: null,
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'yptaqevn18dq9z7hbrog',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'vs2hzhobqrt3yhpmkb2tqiibau8kjv0kort9329btmhq9onpfnk85x8wwch9lkp463qvpbelerr3efz2zr9rqedx5x8e0a7x48uw9yr9xieig76lxmixi3b04kz843k53zubo4ray558ce1w4ajwn7p0wmay7djz',
                channelComponent: 'r5ycsej3678i95y0f54t84usozw7uwkjtjq7quu1e45zpsvdgqi138tyj71lqenp226xak7o47g5l652e9oryp3wo1phmy4ppuzjnks08mlcxqpbvrrocxo458pezn96f940cpuspfakmcbwa75447w7gq5fve1v',
                channelName: 'moqlgpyd49zsaz2hozyvgey8t6k89u3oq0o939h78qwm07bsbknvbofjhp3ek8405n6cxbcy50bb4stns8nlsafkqqll2oaos0fsvzimgfy6uu05uj85s95v5djgnuyd9w3s4tqamepnkf1y9dp5lgdyl9s0dmd5',
                flowParty: 'iprvp57b0jgojtm6j0d361ym66l1x9qfzfi4w7qb6vy3jl2nafwcduolh6e2d0b92sp72aivriv744rx02dkgi0ivz9p7unbq1y3b5e6nto24bsqwz6fcx6pfquvlm0fz880jatu5e7lr8oopbndocnu5dfl5usv',
                flowComponent: 'eyswkf19ddhbhw3r8b1v68dvqtv001dzhvg7mudlk9w6nzh6g7ktrn4cnedioxoem6lr4w796knggjciam9b88xs5aily9uzkr30ivuyvw9jeshpaob3bb8tnvcgg3xcahh6f565m5abdz46wo52hyg2p6xc1ymr',
                flowInterfaceName: 'm8jz8tm2ab3w922u6sfn5ix3pb3v6yfdy0geuefkwo08g13c67mjtof5pt25o87xsd4oy2cu12jo56pq2ox0ehcs3hriinqdlnlsuv82numjw425m4g9vtod6q37tlnnr3f2upeuwml91mxf1bkj8vhx6ldwmiq3',
                flowInterfaceNamespace: 't9k0w7l7iwcc5ehg9odnjneo01mfp5qmxeqzn40wa9thsre06rd9za80e2pg04fxei74to96cqmbenoukdmd4lejoohsdinz5uky2dfrtnfwsdm0wod1440ypqy3or12vxvimjq9vjknef0vvqiwnxwcttk1i5z1',
                parameterGroup: 'a3kobarqjet8itux7glazlioooih15nl4idhe02awd3i7piwhiho0jrlv35origuanwp6fajpqioi166yvw2j714och7l9lcv9st9j4hi74dpyxiwlvanftj17xw35r2krhm10b42uafwj02tlpcnb07g04barroldefn8vsruoccqsgf0gpuw91j99jfuuhksu216tvpqc8070c3h6ujdesrhtx0nmzpifbfpvz693mno5zlk0p1zb6cpznyyg',
                name: 'ofbuf3yv9vrxt0xdpiei6xxxb738oww9mc9652ucxnlsahkpbna105jyms3x42fl9va0pft61f00pzubevp8ji1u4u5ybpu1gda5198178cq4qlerjn5mtrepyqw89prnotdygaihoxh6t0po3pn316br844wnwi91j5m9935rloj35ftwu2cyfn828yl6i7fs6lgmjrn67hfjtwa1uj836ow6uoxypx7kpb259m5ma2yhdq0npwfbzk7kh2zok59bijz9fgltc5jjr4eqrkcil9ldgw6xwkcrbckjjv6mimvvn8x1lpmxe1fq0jxs5q',
                parameterName: 'rzvjs6qd4jbkrd2b5vcrtlqqblw4zcxpq34iermm8p13iwbrqk6ni9s8sm7pwnzjdw1tp4j0e92yahqx7ayyataor650mcfqcnw02y9euyeeobc95gxweqr2wy16rmuv9tc03yzm9iho9pvyz5gu6bvytuz9js1xsg34qaeou2jo42cbp8ee3r57emtqzal5ic5skwakjmq97wffpim73xmzoicyq1if0psbhs7l9yger0wgf8ldnvs7g5nvabcsk4hxcknmbtseykpq3igiprm0vbm4t05r8zkhctuu6zh6jgd2j0dtsr1jj02vcl8p',
                parameterValue: 'cqtjq87ejl7k2cs7h9bhogofj3bmbn0ctcqmebui7gevvlzz47016u2e2txq9kfag4qnf6zg8jb2we26y6sovxqb0tv8s08q3l37u6llmwhx0bbanyudsck8vbouy0dw8yck2d22thoohlgtvm1lg2ob4hjdggkli4mgjhyj7x6146smj7e7dmbvkeqrk08588cd1kwbbfr0g4vp0y3jtzpcwj121w8m7z3xg8docxnxwm56aru58q1y8vsxem7790aeh4tm1vlkt8hgn6nsb6ex1cyl2h5y4fw1go23wi437bwjnmzvswhe1gklkt40awwqwh4qvq67e8n4gvhmqm8e9j6fcxa9zlfvuiv7cb5ho8nklhqhdpso2a48dgyt6herde4r6qbd71latjvzkdmyzhjjshjozg7t427i2v6v07xusxz57rmojsly82lm7nfuj0fib3c40gk0gk9s556gwdvzi5y4g49mdjmyfxci0g2dygkhoddjswzua62m8pppi0anug7mkv95upnan5fd0f2v9u91uljk70f8jnijyynjiwafg1qgre6zhahjv1igp4dirkag752urv96surpb1gfu34lgn9ujxbo8yx7a5ne2qzuvvbm2g5gi9xjs39j59foknyihmf3trt16nk6t7nxghm2stlx0aujbw6y09x5sxail0bt8zct8jhpovn3x8vtn8i1sczw9ewqa17p2b7ljpweyi8xh0qtt3s6n987sji5n0zy5yarn5ybfrygmug5e48rdfriodwxwqsdy4kuwqcyyd5lnxvvttfez3tk95p4yzjr657uq5ng5gmpvyud1pzog617t7dsl8f68iyo1vyibnotpe97488iy2n6b7rarh7eybeni9tsz3glwnt8ir8y3ax4j4gea1qdp6h2f1wf677zxt9gvr548b86ij36gtm0y35qa008ze6w1xhdfo1kmcdq9uhszwwarv3294cecie873atjee15b9typystcm3p22gx3g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: '08tih85dlwsrmkpkgwqx',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'vty6xgbstorc0ssfb3o7tstgyr7lts6zjs9xrr13qmdq78ql9fgudvmvle1fyl3mghwgqmoevbcuoqke6zd8bsnfhoqhmwulxwz6byi1ocwzqc7xt7vvty80j3ve01pggdvohivt2ens1j9bag09cc3nmtgig6tf',
                channelComponent: 's2gtsttj85wunxgd0v3w6ljx5gaghe9i4qpnbjrq4vpkrlw69r0mfh70msdukc882e9stwnd1sxhowxgeo4izl287vlece4qci6ju26c3lzy4etyhz2rs078zkofcuhnx3efa2krty2l11piea1osm0ycgyf2jag',
                channelName: 'htgn13cci44g586csb42khenz7mrfz8nb2adhl3hwg3nlpgrk5m74y6kar30rtur6zxkawffbdf0gzdicczoek8r6mewb8hve83a5uy4cfg3d16to69ac48x37q00lcv16jrveonb5c70m0bjy7n7grcbhet8eqo',
                flowParty: '24li3d0c70bhy7szffauveuuugdkwkx8i8i9ovw590gk3umppzwkh0otntxhwrecx4e9naenh7ittlwea7qldfmwxjypeio23wbbq7uj6iwb3yl054a0d6g217w44jyqsxsoqsxotyoie7gcnvgdb7aexqysv9pp',
                flowComponent: 'd5n8retnjdrvrmbuavi1w04pzz1uktcl2qauzyhu0enn29qsow5vug1bxodn4yplkxg3k9fxo6mpubv7l0s8qus2en88hc1iu05w0k143orsnqeinetpcucld125cplouhttrlswrq4sreprz505tyn58ny63pet',
                flowInterfaceName: 'ow4v6bcki38dv9fgs8suy88jlr29hvl0pydqcsyt8r71p05ftzce5m55epfdrpdjyzikofclc6xddigi81p6b0pxge1uyk9l56f23dkl3afra0ndrbzb3ptuaij7thqu874471m0s35t92m76dlcwarysq5gjw00',
                flowInterfaceNamespace: '5sz5bufeqzidiwvfjgrlhyuvorqcrbwpkxqgpz5ed4tltjk5o08bhccsd9ovrfhq5lqyuumomxd5d2sqpl4cdjv67z56dcq4nhv1fnilia59uhph7e3khuzupssr5zz3dx0y2rhxsfryplqotbqqiounonz0vp53',
                parameterGroup: '57ojzsjnb0o33wo06t34d0lxvgltyidvadtrjk76pu5tpas285sl8jb2u4cyaop3wrdn9jc1k9whs534gs85685civpdm4umhziyadcwazgagr148vb0ztfd69cafgnc4qc70z1c8b6bclc80j6vn9sv1k242x0imjdmnfucz2xkv1eg0341kfmmopmaltkj86e897nziuec175qdrnq5tpyxdstjlirrgf9enf8090kn4o65d4c0i391s3t749',
                name: '8j18v7iu573uqfjnaw53c06gjhyqy3oxfuvmikj9o3jvc9ohjt45hdbd7tnscxoc826wznjc3tk816b3e71ggpdh5pu7ulunf0mhk97cvvbl4klpc7ynjwh04joh65w9iyp5kaliglfcchm43fsjmu9cvbk6wpjypwsp4d7a3tjryeb1ix1wvt7o5wn5a2w3sm2qv3cz0qlrx2cvecvhjcm1rrei70flf3wd12v95ynwi7hjueiglwa5x6tduxasqo6q25t9n9kxnub4an9ztr6t3b9x3vkwdw1v6qjsfrs69a55qtt1wogmt5zgi35h',
                parameterName: 'xuha8zz727uwa609nsoh827verhqdu3syexsh1yjup15qbku7x0bnywbcvo7ffl4od9wbx8e1a5rgikbj55dofcf13y8l0vpas5fq76cs17nt4gpi6n477lz4l2x6r1d7kgtwanrqg8f3sofrpbfruiac79yy25943gqpzy9z9xioeq8kpbimw6mx980s1vq0c15x62zbv91td4jubpuvj3dlos2suyjyyf3564888tm0fux1juneheem9bgcu8glnh7458lf3xvusm1mgj6ij1gxt1di030pbs266vjf7rz4oo4k8bs72v6kyrcxu4p',
                parameterValue: 'vgabbntxqrobg8nrauztamgghkbwbwne94gl03jlxj7sj98w1ugzprw90d0nrto8mczx8oj7uv42jt5dz0t61ik9cjq2gt7151q8ivpfiyzfiwthb48kbgjtlxxkbczmo5qdd02ggtjf8ejllqrz8y5ur1qpthtkvakpqgffhlzcwxuwbhazg5m3qzb5svvqnr923w89okc1jv3285go1vfwucljivnm8yi5h6b7rbeytwh74pjgqv4qbbxcmwrlm0c87a7e5vibbj7oh7zh7580bxnvdh9jzqkij9zxgl9y1j36521sdmsob12vkm1msbcou369ufp85s2rpuufc7kv52ridechd9qvu0jin0kt6svhxaevisfu8mqqfprhi6bvvkbsalvh94fx5olimu2w7plut078tt8tzik7dnyx7rjumo8grop89bq5os2vzel1eoqzhtnmeyamhcyahnxjixoulvfa31mspazrqat8of4a2kfa0umhm1jfq4fo2rtbnd3y1mput4nhfn4lsl0e7qiaj6qr4ukm5q82nsom25uhk6z0wfc909it3ol15nbbxwsdr2d37exisx4yb5npmzjjcdj91dh2txza9w62cq30vi1jvov23vfl3tdo71k39mfrf9argq3e88y3fing6grp3u1qdaarrybdq2d4ppe7dt4bh6nuxg8ine2h59q7p5nfq4ugoyjp58ujfw5811olx19h0qa6xruncewa6pryuvl618q3avhmuznwx80ojowbjzjuoorcc081mvj2rccj5rfcs61axsxh9gx0taoycn8zpjtlfyzbxcmysyircjjsednof1lb5fp3ru86jadzs4e2b5dazo7oztm4dsmv5249uc7795xlrcs98a3pxqn7ylsqjunwgoaif1x4ccpv6x4lkbdwkriadni4781qvj0962onijegzvx2utpus70efruyhw7q4q9sivj34mjnr0e6csm6y3s51tqz879vxzj9m1z4fkcnlpm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: null,
                systemName: 'vrqba2by7sl2moxb18gm',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '8f4aeec7tr38yubc2qhx06v68h26dnf4gng4muwhy8156yy32ectq0r8zsob9t8cilf1gsxdaahiwueh17czypnzq9yg28raz0qg95vedm51fggfl6pe7tbu6h424g7ihz2b20fj6lk0h1yjs7d7u00vu27mmbwu',
                channelComponent: 'xdf6eirrckfxjndnj4x7tzr8y3mjfxf5rwjndganu3c6s6n7zqyo1uhfnp5ocq1aq4idy97hfjft805clkrf2d5rxh85mk9z8igphjqyxjvnxe2ix0b5on70gza1j07060aqfsstgky34i45jqcih3l7ks7yak1o',
                channelName: 'sz3aec0fjgazr03h9cdy9agd2f7rt5mt1r15v427m7wdog5x5bwt4b4812t5bj7lagsts42gkfstwd2u19ap7oysx67pqhgo4pcjuobw724fjds1okva9w6mtfasdgqw2pve64vuj4jgx9o5phcch12gosyyu6sa',
                flowParty: 'lqgotsapy861ucoxkc95suyxztfmyv5u8xektzwhsdfim7zro26g2wo6mcfsrp0gbubrvyq1y785a90gr9toehnejczn4fc03r1mrfu6noqevn056v8y9kokv1kwqplo5ryo9bux12vqptpvt1wyztfvhisf5uwm',
                flowComponent: 'q5fxiff1liknv4i6p59d2i367nf6xpm3yydqg19w2x99pv4e43oiknw6dxjdec7axhp0g89l9x5wn3rtqe64zop7ztuk8faapvn7czcuhlivczbi3hre8d2i45pq0rjnfhjh6ew9f8hai7y2egbiw0zbxaw6q29k',
                flowInterfaceName: '5lm62b4qmza2fdoqltivktcah8kfohwgsbblus8qaplocjhmcqapn5m6qk97yx1hh14pxwi6l2v6e1vee0f2l19hrjoj2psg6q5oqfbrlibhydcuqxq5hgg8857skdx8tf80ildj6s076yyyvbsk3tkni2980qlm',
                flowInterfaceNamespace: 'he3criukeefol2cm71vogrmrn7fl9pq4zui6mqi705qja1r2xbxzmtjfului07m0wo8t2eq0pcnlgdivslmj7bmxzbpybq2tabplfxk0tf02hmfraimewntjfr0j17mentnndw0vihhyx2zz2o1mtn7ejxdonm7a',
                parameterGroup: '2nrk1gm9eo7y461f58a4cwl3viyg84inufed265ulznia4ufzk8vhvs2rs3mmiet3yp8r12rk6e5y2mjxqebchi3vz11cmjhx8hgxdoj336o3m8whr26uszmvew2tovbe25147qu97r0th71mnru03rt75vesaxx5f0ibjudwqbzaqn1vi1ay326vwrzi43np2alnm1rk99e03bvfowjh9lbozknnv8dosdm63tnyna6wahpdchbjz5c1goymlj',
                name: 'po5zofyrk2hdqaxmgveklx0t30hr080vxuzel7ilzjt7fyeb6qf0rofmuc62n3cuqgp9sqfuoe2r1qx7nnz1o8k8ovnhrs7aolfw8gsu708o77rlwrihw7viqs362ui5tev85y3mzlm41aobjm1s6uc0ha0p40xf80wx63mk68w3oqr60ubacd61byc225748nqrl92gp9gpfjypswd1iusy9ji0pbr2ajdxi7ewl88te9pa6ur49ikysd46xyk6nxxtbxhge7w18zey8ge60l245i3nsu151gzw7uycymjrcxsc2lgkpgnuf2jksm86',
                parameterName: 'g4p9zpcacgktxnlcty3n5c0m1eem25rm62mrp1u8os3hosxx7fj3ms8pomrtplrksn6v5j8nadou2s8t2oal135lr1hc14vt0334q7yva02makgns4valfcny6axbgjy1ctdz5foynymafs6i3xvsc3nrwq741da244wvlasnd5yh1az84gccl17trj8bn78ub61qzqb38o7tdtqd84gknuc1pw0rgthqan53gj9z5kndv91aivrblsgglft3xixfuhxcx5xigszeiftd3iyw64gjotv2zneri71s5nzdjorzcoj22klndp6rikjd4zw',
                parameterValue: 'bj1k1f0c21abmjfnasajhmx72oaa6s9xz6q992j5sg385p0z7xj7qtvz6u47x8zqsf208aqugmkgddsajy7vquvqynueb2szzqd15mh78kw002hgq7an5unvmt99dbsz80yyu41fuln9i2uvgc6aprfcmwbytcdjponysu0qxd0h7418j26a9pk807oncefzuauadhmrula6esnjh1b0vuxpzb8qvutw4glgjnttzmr4jkfhnz07m7ho9ntnxpwgcegjrrxskog5b36tc5farowb4eqp36dxkgpp3gppvad619tf2jx9axbirofg7n4wmu3bk3chf2kz4eks75atti33p9e3altws877wkj9i8l51vpccys89w99q3cj78pl7ocpehbk2pbz9dziiy27nvfcuw1nf8xpf5usmr6hgyho3wup1qd1bnrryvhxeru6ljglqbrj5n1bu2n3i8r31e2vcyfx86tch5x3ibr3m2i1nvue0aehck79blpf6wkfvav26uuhsrjkisge9fm61zr8seehr1vvedqh5dfj0ij8u7hncbwszf39qg6f7ybmhetkionhbb2qqw0onnwo90ggzrc1fdi64r3i9kvrftdle7uaody01929ae72dxd1pqs1xl6tqmj6taoc8ooshbilfun7jay3tjwutcqbo8i0y9cuwo4mkt18afmxsww1ea5magm01y8bbs7766ut96zuu3askw30q07pkoqpkiiy2wgh9636rtutxivlv2hmo7yksu2vbz5ikh3j01wlve2bndrtg52sa2lqlb0rg2bsjcinsf8k2g5buqxa9ixlvg19i21udt8dfpyroy5z5vmmop3yvhnt5oxhhokuy1c6deue33ha8huvqyej97q4nf8toklulshs2f4prwf95g12pwxro7abdyw0n4son4fujdpe7899rvgyswzsusf68opvlo45qlux5s937v9d0x6vlc2nsduw8grn3jzw8vt1771a8eehdp77r3t5zog',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                
                systemName: '8pmle8ce0fo5bxaodlqe',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'nhbv75ghtzb073d1z7ms867qwp0wmje008uzip6h91fxzi0vdzclinn2abjzbd4cj64vjvke1drndr7k0g14a0t2qf1hk8k75e6eh1vw0n8ai4j8i36l85rxqwxhcj2yk77lonjybvlbn4ob52gfwhjsk2oveb3b',
                channelComponent: '7mfrkc170ffxakx7rjvjkngpspkhbwwxv74slj2gyadmwonhlouua584j07fmw6ynq39r8ep5bteef8p70vuw2ge1xu93h8uhpv3gbqmg6s0dsqx63sbzdkqsocqz4633l5lx9b3lzl4goxcj7vjij9alopdbh7x',
                channelName: 'v5n22ijwtzx7nmqslv896ag7ut3kwmrmllppxz0loh3451endqq98t7tncwx7jdlm5rc1eo2lafa8cifvk3a0szrnh07kr87xzqdg2na2jw5n7uwke4v6bgbzr081hzd58t49dy822wuhbpusp9otuk52t9var77',
                flowParty: 'b0nz4o51152t8duy6pmpvigykvwr4ekms2vklxr3kxhx3d9d20xusfmel4jzsq3ztt9olgffw3cqt9d2rlxd531mp5q7r7p4dof2y33ymb1f9k1xl9x3ii4zuvhfdcnmwcu67ys5hwi5mo1zgeoddmv34xboegky',
                flowComponent: 'thwx2xhjw6h3y3jz3owyh9x3kfutmmfgwy6gjbyle6kmdazmymxvq04wc114zl6wun5o8mg8w2fjchssei70ctnvk988glq48x37v3cy9lc2m8c56004noomx9gwa9mb3taceddaqdqa25c3dk1lfxjjabvi34gp',
                flowInterfaceName: 'u8o9qzs5kra8fgydku3u8l7bqpsmc4j0ib9qbb7c3oiruivmyfxwab8iivn6fu3h0x7y4yxiqdaf6ybh18ymwyy2j9v602begvj7i0spye2qdxc9146zhrwhvpjazz18x80m2fnubhc307q65i10xl9cdjq3m4p2',
                flowInterfaceNamespace: 'aixzj1zw2kcj7the4ygn3and1l6lagpzf3n10y32cfcm8nshd2e3cnmwdpw0e5v09ypanv0sy6bh49bq8b4x579ahymp016buikopm0pju9icamyuvc2w6vmg593zu5m2kax5ovlr64vqpx5mbtqnruum7964dy7',
                parameterGroup: 'zdayr1gum7nek19l7bxzwxv0hw1b0xqmc4pgwvyxmsbbi55wd1yhgba2xyhkjqn1akg8hasx9x3mtax60kwvuvm8zlwpht4bw1d8h4lix4zvz9egzj37b355hqh5n0qmlcag06ox7p1c6of03hcog6stx9vushbf7zp1r0n3jxgr1pb3g4ngqrzxnwcrjy3rm68fuagqu3pjbnx2rq0wjfifhojgcf2e12kjq193q6lkn5kxvxzwgv63pex5jsr',
                name: '1z1c1awfegzawgqzz1qumihcuzz55e9l907zbf53h19anw8hcql31rzvbfjn0vz2kkpqfzfv0a79kcqik4aa067foca29j7piract95b75z3p8h6g8z8nc9yxzpgnvubmgcqfcilqvtdl2a8bb9i4kwiep6symi62ag4k3d1rycmjl2bmwek9t8g2e1o2il1sdvdl8aj3alr4a27cd7saelfbdrdc825ti22do5h3veuex81gj5p43zmxavjlzdtcbufi0tnsm0dfok10iwmbate2vohll4vikqisvj0cuhbzfdsjgboabaa3hqd1fdx',
                parameterName: 'mryglhupyxmgoxdz53d1cts1b12nkbufyzcvaptc4ivu5n77oi08c1uhhr8ocvwtoijgahlyzubetr60b60ffeso704px0bjr0426tvbq2a1f4lm3x8g3zd605mkte5jzzy65xmn51ftnv72mkx85p3jhyaflxsbpnlauegx5qv9otrpuxpb4z1u7tqafhvgwqnfz9rvlq8h79ubezzo9hc4y2ynexo56iiw6qi1s2d8e0vkzpq0d2y482nt2sxyr3xcdxbhjl0lumaxjt9tu4hp4922bx3hv48gquf284f3lz5yz7i87uklgtpqxu21',
                parameterValue: 'qmb9lxtu6vwb1wke0thph3cjslb9udr00m3eqfn5pqps3eq4jame7tnqwshoafji3pl9x6b1keex7b9888rmhqdbwf5ih5vgk305jsbicxrhdgm6z6zmtatzciwijwindwauuxexxjzwoev9gyz9f6a7h65us9dgsr9e6np6hcm43d7lpl1g4pd20gmsbrcskihz25myoaxfj7glz6evttq9qd090041jxym2o8vgtbvfifqzahtsazwbi0jx00fh8jf3qew2hifvlby0b2wlueb5asygldxl4g93d5aqb6aqnv414mf578w2hi9jusjdmbid1yxr16bwai3x10nuxna2kczpr6wzc5aoadcgclq2mctdgvinyqnibx1t2hthode58jkl17x8txniduduz9bd9zpvu7pdi2hggepik1t3vt0d95pl0aco55hwe4bnl90p1d02vnfeg1qoz0cpzixcqt5kw4qaa1cxddxw1w9t5tjt0x46nb1muu2grk36yb1x0v9yphlvb2a89fjt70uswufwqpkb4ytmsaxnhv4jkzye3obaaafgdnt1sww1bn4fiauf1cbeybaerim0v67q1np43hk8vnhhk86srhzc3bhinqr8uiwfshzr6nouvv7e7dbf823wxsypi7zi93qppicoujnv7h8tzwo08kxwwnocjpk8f4lv3k3lcxb64wu9cj5u2ccii1b09qjy8j3f47h8ty6yotl5kxzdxrkmg8uoj2nloj45rdr2l0ap1lxmwtjrk068y5tx7lp7e6peve0h7b5stqoi42d0ua26bcqoc7mfalybrel98hjf6m5e00a8iss1egfw4k19n01ge3jsrvs1apd6hyyj2mo5qzkvvwlnsr84j9f8a80r9a39vf73a6shxcrrb66q01zcph5z0aif37m34ln4ob0llqtr5p5p9mbg0x2i5uminx10sc0fri21thioeytro61lp6fzzj0o8owv0fik46cfmjbrw28f1ac3akaawe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: null,
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'xsuk95vmmivk7frt1840exo7ow784m90s68yezy09fpcfkyfawsy049g4zgnjumxt3v0inp2bka1h4oufelspn5jkmsclftrcosxdjreg58bww4mnfxf4eidhbhmnxiowuvfqt0jehs86gpqjmmp6c3eunb7eg2c',
                channelComponent: 'okfnjkv2kkxomvi7uwc6id6qc1re6tq8ub2px9ua6g3su8hiytl7kogw7wx7l4us3qnfsse36f5icz7cqhrkzealhwlg8w5dlrtvhvlqm69w8p9tyfywn76e6xa2iqxt2qtwqr4hlxzz1yozf8dy8m8suu3flroz',
                channelName: '89tgsysh3ghs8iuplq5mayzziunzbm8irzh1rlmqow4rr05k6r3ggqtx23quxc5muuaalgs1q6vrgqez4xu1pziunc2bt58170b10fdnj0yrqvwa9in9blhg3x8mig1o09y34psxkih5n2fjuwmxb7ehcykyf7nq',
                flowParty: 'cjef7zz7sl66mllhu31dxxtglqp9lj47d208qisxyzh4dc00zpa84tfgd5q6tp0sq0436hvtvya7tafhlrj02j5maixyuwnsefane5depbbnofw2kbgwvliqk45imbih70a6a41pta63q1dao0mlurm2f5c01mt1',
                flowComponent: 'qyjqy5z3jz3rsc714zquh265hkt9bz4vuaiamcsizg6qrhi43gyuv31htekmip4x74mmcxh0uof9sapp4yd8iwym2uyalproj76c3q6lg3oatcb2zfm8u5wdbe5x1m4btnsxmp6029rf7zb5wix6ry9re4ir6j0f',
                flowInterfaceName: 'ktymap2j4cua2p7g50topcpezq0kutyhf3ausxmw10elf85l8gc9bna0fq9gis8lm6x3zowo0jp1f5p5uu6am2d6i6636n3257e6gn9fn3q4d7buqkmq62nsuflh7cmg2blpgn5vqitf26zdrb53dnodaynd141g',
                flowInterfaceNamespace: 'z8bd18xns1qnj7n239fnmt9wywchd4d8h8m4851jvpcg2f6dfi6psn6qxvga5dy4z42cm5io20mwsz8ns9w2hue8yy7th07uu7rwbhr6ynxkx5gyj9oxsthr3dj3or0eslbj9mc6e1mip0kglfqigy2j8wnzfovg',
                parameterGroup: 'i4yuayn1w3xg5umqd1na8lxd014bxo814w0lmo06npmo0b90coe40l4ahq8k16nx3036tjo6634h2otp62k8rt63km6yy0zmzmt5xnrit4ib3l40pmin2ojwma7un15bcpqoj5x90b8exye1v16um224o4j7i63nrez03x691p271z1b307rmqjz4z9zmfv21jcbzu5vhfydr5otkyp4iepk4c6r7lsg3oaufribahzw4s4v49i5co2fbmckn3r',
                name: 'otab7cctv41q7mfwpbd8yk3fmyhsi7iatejrwp0dr2j7wu1wj9v2d3ut5er7ajlj4mlglmatnmpcz8su2ndkbhvbiwx23srxbb1ykmvjuw55tpcqmrr0q1zxv42cuq0yb3yikquux5c9shouo95jz2ctm5b9xoy6tlrbls6qkfl1lzwhbxmo09adnp0erh99la47h75g8pzbtgi446vo1u09xdei6pjiul8gab3dtkx56bcswvghyyr3s9ujk1reuwm9qyb9042rxejd0n08mwup9kwhsgig0n5foqtlrjc5393iknwdzk7m1xxo5jrn',
                parameterName: 'exw4ww2ghi745q426s5ez4nqmrnhubea22eb9934omycl8fgntxxeq3bu7m40kanwu3ymj7bncul6ezyk53qaom4rmiixhmwnb5ttoowd0up4i6md2eruvy2m8m7783cff18fe1d9u96fbgnbruvekegevu8kvsihu4g5vu06bhhaekv8ci0ij21r5936jfnsr2mknaprt22fcllw5km8l9220c54isny0ms5ls4ynpurds85ztptgp5oju3jyg8l2l7r02oc3qq4nwrneldr9hbvyd74gglglm5wsa64zsglxc6ymn5hptlbhlmay2a',
                parameterValue: 'wm4yob8fzl54ze1scao6b7zg0jcmfnemqq7ytxrnfodsmpgbov1k7lpxwqqr3m3rbki4vfdxcpwrn1sq77xba5oqizdihsndmlzer9a6b60eeb03g79s8lbwtkb4zblr1xdtkpt91ggw9wq5fqee0cn9yc6d815i92j8d7kqav1bhwlq31h40272k5wp57vc2i5guh6umqqm43a0uuz2i8fb5zh12ipqzqf2vhf5gfvioqrrasuzz173880josssybim35dunfmbmwtyp2lx7042rqf8pizva4aalwpx387llv044h07x9mhs155y3n1k4d05mum2kr832c98mnsivxvgeweobw806580u0lqc8ctzt7p0iv25za28imy84syg7uj3hrwz2km65dwerslpfis4dcrahvnn7gf2ki8qj0rcd86e67cjjiq336yn5l8oowpma3dotbvl5bukkl9cpirrvj9ea1izm01ui29yyet4szz5th73p4tp48c6lo60yr0suyuzltiumomhvxz3iv7lzr7kj0jp1asztpw6il7eznowflg4qwhs68ja71imf9fonx7jtyjy5dgt7c7pgayn0y9xpbx9u2t06dwbquhqvv9iw5wk9prft7qe5c7vctpg38je00dpdvgo40nhy88pskxopv0sahcekqyobrv4rzs2bacdocxic2o4v9t5e8pksjbgf0dudyz8on19vggfo36t1hauuyh8n3zampai2bjy8st9hep22k2tzt41gu4basycd83q5002sxczxldgt2gpgjwbyiwwtp9khy63xautt6u3z4975pvqisdulmsdpxen1l8qydg90q6sxb7btjh7zm1vpqi9qk5y11k14mzldjqrx6i8f55jhbxm8r8yorzi8v0gdqv4bih9xvzlf4jizado59fa2lgdo99bqfska70c50b4thjlcrj76ie1jom52brgqk27dspmfxyceo6jum13nqhpl4yd6oykvpa7alzkwx2oj94ft',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'oxqi9l499vy1qp191v3erpj8rhlyylg4h5yzx4fk7h394ewg9hr5c84dm2s9kux4a5uw2fobem5yg2yyb5wg7nyog21vdjtvl1pziyve5l2hbp1tcd60sw2sb0846jkw4i0esvtyiws32pzptmecxpgjd89jpnmt',
                channelComponent: 'd6goezgb2z37qkwsizsug12sw8wz53cbw665dxjqoinpsrr83pvkbjfilf0ifdq7uf9cx7p2wxpqouyr6hd0r69lm1s2uz29nqnbubpibjvgfffdii4x8utbql31iewwcrbvr8qoftplhoaol91oxqyn3x1qmclk',
                channelName: 'v7a73iwiubp6h9halsf235fz2m4wn49ona6gif3czl29yb2k3qo483drighbeiaub90iywrg0zkx21a3h17fbar8ohb8bq6c8j4q87kziy03djw55ny076vd56p2267ix77d79zmkntgftvb78mt8m75cw0qults',
                flowParty: '3de3jxrk6785q1qtnrfzzj0ixxn76nt2t9maqhuuo83r8yrjl7it2bskv1ic8bgo4ohtid4bfiutf4zmc1xozzen4e4y0rnv2lavsxrrpgq9n3yiuw9q029ufdehwgzj9e46ki09ltkakyii1wvl8qcsdcdhzfn4',
                flowComponent: 'dsl68f0eh2lvi2sn4jl5gsu11xo4ol2plv04f6g3dcgbp9h0thrw50fkreh4a3koow5r2vwtae2klt0zsgmclz4lr4fwgztswog3lofhqbbg5h0ma3et3o00xvhrdkv6j6d13i8e0wy6df6w0erbip40m43ngbn0',
                flowInterfaceName: 'i638spxuelsegyd2jnxkk51vgf8nx9y9vyo0orpcstn8rkuvs7iverq4m4lnteg5nkorg95w000yoveb99yn8i2d0m0mmw4fsxaizpjwqqiqrqye06srmdzsgtrngaieqqzqwkv0rtefvc8dj4t9lypoh5s2c9zk',
                flowInterfaceNamespace: 'kfmrsf5edm6hq3pvlsmicgtymi7lkc8ijrpjvnpxat1znb0jwoiadcibv7pw0vs5127to1lc5vmmpqtj332q0k2fm2s2xf6al5earfg0lqhwvzc4b0dp3uk0bror2vjs67hq9mm1m5lgnet045v3kfr9ym0g6v8c',
                parameterGroup: 'az0bwn7dcupaibpk4451gd2f72dfljby309gmrrprxpwxfn1bjkaejy575kib2k2m3s3ftvhapcriy68jeq93bx1nqljxu25kpcyhbiqt2cx2x1x6v807udyc7mtol4u7xtfdkint7jsi86f565pvf62b4c4vvp3fi0vupmfiwntto9h17bx5wgnm0y7y3uoerwzzpo00xte3dy0svtoptjd8be5z8s9owwlphn3w1mg51fgildxvbm92hvbbih',
                name: 'a9fo4fia78gi3hbtml0qfckxwdy1npr0v8kiuikqlo3ahpnq6l1x19i4szohuczh3smrdgcree6u078w010jm38vz4t7439o9tjfi1c7coy24mb2j09gpitwrh9dyml8t9ybuvdjz06izn6wnbfsorxjujf1mnpgpcm7zp4r2mo4nydve63z7k237aensqq1axtbbhlj5u6jukdwaainh7x62ej8ms30db2hlck8yekdzji4yp9m3g5u1d64rgyrgazvdcu47397s6avbox5eiobx2p5j87epjphmunyct4g53wy2y06hbv8p5o6hn4t',
                parameterName: '7aorfm0mbuwzwft2u02tdb3jusaq1tcqrs46wvx7l0bca5yaj3as9gu4vaotqzr5mmdh9hyyw7esx88d5akxnedk0xnqamfefst93wn6mrf8zqfi5uekwq20z98ejj0tnlcednypek0do9c7dvytqxmn8nlrt1w2jkpo20lguqlwpxjg34idvyd3llgivl77ag33t6yi9gabqo626dcnwf10i0sdtft22qx9ikc2pev6az6m16oop650rhosjecuvbe0yqiv1sre4lwj06c2q6j4mf3gxzqlzrbhzx6ij9l1uta5dsps2rpy4pviyrx5',
                parameterValue: 'vcbq2rs5c389230ck019zqcgukdw9jpmrgge9c8skl9ogg5qod09h3e90x0p3onmaq8f3fmd29fjm4klvdd9rfba0vqpe450r55kgy23ih5q3vshtdipf3yy3hv0gegnqo0wsr6jddyo6adf6v4h33gc6t4nfmhxa67fibuatytq3u88k6d4q24inlzb3ni8lqstvlqwixijc29zszz34mhnetfqpz3mydh6seztxr0iujf22n3zyponn5v0kmjow4rgkzy1auacgb4qwnv9hk4mq2xtxffo0cyt3u2tbbgqh2c5rudck4urtbx069vne9c4nnaojwkrq98i91lr95ps4nc7ejswumllciooslz8lsa758pdfgp80opkppvf4y9u59hdhqhs22l3l8yaxiv85ccliu9af082s8ftj4bas70jmdekw8rljpcxiss5r5njzxzljwuwqnrbyugshi8ley6ztrgc8ryg0laigw7bozc0uwgdfznfgwnlluto3zrm9ty1236o9dxr8dgx4dvzfda8o607gqm4ayh84d120rkuf51cvccwsfa3mf72s4t9d95lhksamp243a1ol03gpesje774l67uqjmarvyjxvous8tgksk0x5mhhe9ipbop6d4gv25aj97qik2d7d05bxj0hi6o2525k5yagt6vkuug4bby1oqxch9z3wrcosj2dopqr6963uk28no9fdh362umlxbhpfjgkpab7irsfdy3gbpfq7a1dix6e7zvz1kyvryt2htzbufpn7ku4assur483flxppi27u11g418y670sfat1mnxc59i9j4sm1lynhjbjew57d454dyyskpcnm4knj37dyxuz9jlp117jfehwbwxjrk3gu23op65gym3gu717krtkai77m7zlwjqrclhskutoj4v8jzno5htzzpgh2dzzxcratt74ghdxrybw4e229hc9uw0wg49ikyiq3enotvnjhrba989bs6qjt2hsg81rbzc7az7g65',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: '22ztgxq35zc0inac7she',
                channelId: null,
                channelParty: 'xcfd7pf46151trp3rm0zovw34l0mftl3wphl7ocmla3a03bojet7c3s2zfd5klgch5hkm4uvxf5gk9mx4pdkqwh5egrnxzahd9p8ao5xmj4byh02qiqtm66j5lsecickigzmweqjw7lnnyg6wpjaxzyx1ydjkezt',
                channelComponent: '0ifwkuji92w8f9t05h3feijlf0511ss02efgo0sra221xnocks79d61mbfvgacs7p330kumfusbe7mzfwif50q57r2l1r0ag1rimz6samfvnq3fwn9qcccgwb4e4u5sybgcyc5gmf8rnlquurg8cmpsawr8hqhc6',
                channelName: 't7mxzar04da3darth8r404jm6qgxzosyw4ko3gl13ob3ly2mfxso6b8ni5le6712zsda0cq7jqg5es7zi8sowor9yxdaurgxp81q019o3myxxql1tpgtx37wartt2mxoj4wbbwxxo62a71ztn7pu2phoqzbt46a7',
                flowParty: '7sv1i6t3e79wzv2462picbse0hir7ciyv706q542sxsiwf84zyupjpf75qk8s1d5lnyx40v2wucwnyf4y9z23kkl2foh23irytugdxwcrq56546vf8l6588swudmy1s1hx1yzdph1cwywpfz7630ubxbaali6cdc',
                flowComponent: 'y4h1utrzml4ce8qk4qdmvdstcctb62lies9dn4t0qz75xy620k9j2m9s3nzwibxp0zw6nbmyolp1yceb03a2n2o24lw9mmmnh4ev7gvvfykwhbfrh95o4ge96970jv72oq8hkblsxrb1qp6q3gc0pkirytcmkz6t',
                flowInterfaceName: 'zgeyf7cdlqcbawecxozgeqxrwu2635yv2tnm2a5ytmj9e1mp6v1337qxbmpphzp6xm0d16qf09k1hxbxnv400mltfbzvz0p04lssnllregce7te8h930rrm8jawnqqdd3xpy0k5nmv3def4nmn0hecjco5q1vqgr',
                flowInterfaceNamespace: 'ey7hksv6vkwj6hl0383jhwr0rzzfg68h3svvxs5n2dqzysddujpeezvvvrxyuio79ppchvq45blauu1tq74x6e0r9ho5h4rktevvittcx0z29eiiice92rp8mh3xsa4dimpavl9zj0p48lc5k74dzoym0c7c72e4',
                parameterGroup: 'j81z8kss3fwh1fm48ab0wizo1prhnsdm765phewi297u71fvc8jzy4y90fdt00sdmvqzzdqografibul78vv26h15atwaud8c1df964zr70krt8cdt8p28ycjwjx3mwzky03yaulczid2ki503uibohx8ko99zqfv34gspj16g3hffk4peutroefsgft49qjd3yzsm7kdonexbgvg68p194cnszcx73akjc1o23hguckjceuyw3k1jw9w3lzkin',
                name: 'ceu2vf8veh63k74ejykg6egx59gg9vbah015tvjgsm8zyq8qldtc5c6b97afsyd5ho5ju90noadkx14wsiqsks4vu5jbcip43aw9kqhj1yyrbtqlhrx4h56v7uipdh7o8irif2kmz1vfashs5nd6ne144xksp1g8qv1va8bd4edocpoxdkbwjrixu90wa38ndd3dpcihltw8wez1k0qcod0vx0kwxrf4srw5kn5i62a2fznbqhgqfokpf56x0s566b4w9yf3jkly71xtwgekp9gq266s79xw67tdju1ikgqdiiqnvgazpv57lxjlb3v0',
                parameterName: 'taspb8pnh5l2qjpufjvoafkfznpar41a5qesnrxm4itqkawdhre3knyfqzfh5ews5ol2t2hjca2zoporq7xout6uebwocndr31r2ftttgyiw3t3oa7gf5z8eb1mrge92buc26zydcwhgv9jm0mn9hyojw79vhikn40my9e3r27tbdkciy1zjdsdu8mjqeb8ztn8seja82fynwacmwcmk1b0vsr7zwteonteobs537t1eo63aqi5gr72012lx0w5a78h7l98m1ax6086jnwi1ydmmulcdklp79lkkf1ai2f1ra07tj28u8d2v894eqxe2',
                parameterValue: 'n8r1rndqg473lzad6mfqce7m077m6y1himnkn9wua8tzqiznzw2e76eawwl6j9rds61chr8bcfou2zg9sedizbqo0cg14j1yedmhpofydegvwwasipjvdctq9tbjw38hsqlleji3z4d2fxly4j2dsm787eg40beliohvnpma2yusyizhbzjms3rl060e1kvigbs5vqif5s37d2ja72d6wutq4qty505rvrg9ue7qhdyukd82diqzr6v0q11urgxvu13xr5d1mzqwu01m6kyh155dnheb2spyd11iscvbxyiqf0l4o1xqt31f6ndluqv4chx3b0nc7yac8d0r3yslgit4p2qivtmqq8x2luuuxee9smsk6k3nyb2z7xdllhq5y52mf5016r5j2rcn7or5gd0kc9ps8390jzhqao410wymyk9wcxlwmlmf5tftld5stz00l7uvah6bkegwoxtze8c4hrhr0d98z7h9x9c58dnuviwed3akn1jwn0b8x8pt87ef3wl1u4y3yosdy4jc80d134jfoq8p33e9pbifqowmay66hbm3792cdc2hvvzr0l9stcam1uitx72c6m2o496pfrlp13kdoxxnvdsmyxwhu1imfkzpp8it3ljt6sfek390ya0p31wnsla8iu6lvtw0odgfplwtvimulk2ntzucr5mc14e69pwyowtarzqy6t3wqqqt7o7twbc9ae6wdxqhpmtvwalken0knbhmk1yepeuk7xdn25khcztxksf3b9hhy0b294idssal6djlmb94y7p5t2dtw0lhj7oy5xnr3dff481rvz640z4z6jc3b3nqijs0j32dkhybgrmk0pp5u6nvj9txa4yo2v5ixr7nexedpacj1h4thx8v2m3vl6g7254kcjoeug2q0dh3t4mhzt9k0qy6reos3jdcarj3wpfr7sfbp6f36qr39aoddnl2dbxp89w2dgtgfraehkyl82z14foxo6957ewkmjt01blfaqg3zcqr8lkvbo6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'j8rpvmq81ygr4q50pf4k',
                
                channelParty: '1rx6w6ltugmhp2m031ol79dnb03fl55lt7ad33u6dkjyczp29zursw02ebrhfte7gmm2u60ab24y5wx2xpwmvnn4cnf6fpe0x0wn0ev7chg5ji2hr801cc58y5xo0xxro1igkyvnwhw1fjqgpz3mq84mwiaxpmhm',
                channelComponent: '3btoxndwnlg21yt6n6fsuq9x22mintjtvwa3sb87kwzwqd3zvnurf0kyg3oion7qlo9i794xa3l4at994wrbd0jy3k8s5zo4fh7pms00x22icegeqveu2ng7wwwemcv837tm63xwd87zhem6m2bhzm4o2q7o2ly1',
                channelName: '0biajepm0i4deviw1bzuct71lxt6jhjjtptijzui51jq3e45meduqp9ok0djy33xcsxx2o2lwkzkk4hffcwk5u2kf3bnb0wge35bwy2kohq2t5rhw0wj8mue5eo7ujieiu9frrwmeg94vm3o8xm0hmcbuu4b7byb',
                flowParty: 'bs1e7zypi7i7emdue9o7be1612lky6lsnya308cbw3tlejb3przcue7fn08tjlkzmrx8bqord6iyxux10tpjny6vw6o4a86mz3oratnprc460aom3lset3p4qn94tzzkolx306ndfw4ng1x1ec7hjvyr24zdblt0',
                flowComponent: 'ifj2ner2bt97hdxfgitw8li53gblamrswxx68a77nr0ebpl8u7n1vfd5nlr2gj4wjdh036266g0mh7vblhxblwrrycogb2otmsqidnux8u52k34f02hnpn9b0mal6e2icrbirfe7rifkg534owxw4d8tg33wcpt5',
                flowInterfaceName: '5hkbnmq3up3etae9baip9y4t6fo3493n4ax1o28oobvo0rf04my9jej5rkjpqypy9c6jq37120zutrjdjddmpsqiny3x80sggn139iufoh3bhy01anlaa0p86p1z8nm86tsqqu9aspksw16wekod3zlu7jbx7m2n',
                flowInterfaceNamespace: 'l055i9d9wf9cvpcrbjzc0787f4cajrtx49ilw3orr6sd6je7rxz9n6gqwrglxopo8vy04pss90n1ai1if6az3omvcko1b6f9evcd87xuf4zes43v5it4j727z13ab0rlbc5po8d8j5hfcpy1jj6vptvxb1yug0h1',
                parameterGroup: 'jyodv5ou6a7nki999i9mg42qehq6nw77smzegdxzsv0dmgd54mc8rcqp8v7gt3a1b8q1fu929qaky0mmbdo6ob49efqw1bdy37cuoneq3nbbnhxdnygvwf9rgxpumyf4ld12axf2awq1xkyo3rsi73hr2til5uft7tez2889grvkl7tp2iu0xja1ts6vjil1xebj2jpg0izty9kds3pmtmcnvu50ylagwazyt3p5gw444l4pawomirrangxspnu',
                name: 'zyc8q62dazsdcj4wqcpq7pwytqdqd09e71z3kmbt186pydgdn7oljgdtl2qvoe7d1rfrhl8v49tpyww3qnvmf1h9khr3p7tuv1buhbd2z1lu566pa8lndrscmtzcyc0w0np74rjm5kewsj8x01iv9x991a3lm3x5nkhzwfaxejyflne4yrir7yqi8tv2w104uxmbdeub6iik2kyep5uvzluqd8sn75f5ucqrl3b2krfqq0sfzygifpz4zaohgmpta3bqn29bn7f9l4smhtup1udxoa96n248zo3ngqe5l74b5969kj075a6gavy8d13u',
                parameterName: 'inkpgm70framarjq9s2l1wpke639sdjackgshl5wbc9hoid6bsl09iryn9zpdvnnwi9vlpelnatf3j0u8o3bw0te4rfjrwihvtywmwkwe8fivu7p7dcco2zc7gl9xwfar8f7bd9si7kkscudky50bde0ps43msj8vnv4bhce58js694tq2m4f9f81or28uw6mmvtxmzbwq8pwkhlsa7067fjs7bsv7hkvtmjz4ja66m3stdv94jihufwlnkost11zch6yxme22aliema58f76y7osvzmemh4tclfqeo8hvaojw51oltcr59rxhh59k1l',
                parameterValue: 'jsv85g66iste2gv9flaqdwzh6bho41p6jna2t9t68d32cz6u48wcenw4wlij3yhw047n9wbj52pch9yigno08ujpr2vamdqo4sy5esdnqbshk9oqd4z70h84zml7hwj1dqdwebjpivjklx51dq3azd3ouyh7jr44689ggndt49bhsutfxmx4gvzeoqs1h2c90jab1qapxkiglmadb92w93o5ydjzz0ixv3a7vvxtu0hoytbksamzvm2555iduahmnzvoogdcoqvlo7gxez0rzuenpl8k1b6dktt7465ma5wpvp8p9cb1p70ibty97an9p8ojshaf8tzas1zql9lam40imga2zhfavlujby9z6o2v34lsfwtegm33l5x2847vm310kj6fsnz4nbnctx27hsatm7cjjssnhzc08upefbkppu1l2eqqdm0l8u4u987kyp2pinr97uehbl0mdhynlqnrznecg98j7lp6qyhqw2a2clodvilvfd8u5ompdnemxkhsis8qjv9e1esos179kzwvt3m7f3p143apy8oz1e8ibj5rw0rsq9iyugnpmdmbovjey48hmuvcs9oq8wk89paopddr0z9c562h17wkw7q1bxxstomju5iul4334c77k8vhmrauayt0oqtoh0e3ajmaqw8al1nwqg71j1jjxxn446dalhoa1xsgoftdpahcmm6gi4uol0mn4ycuqpvrbb6dtsuwbfbucmjxva22xw47qh07rvrrm04zttu26tpzkl3prmw5ujc3gwbai90d94xnikxvtdsws0a3qdxk36tva4sizco5iq6fyglq0dwjrr0wk30erbttgd5ome37ghy4ybjly969oapmwbut8muj28oeklcl7w0pob8xspmxgx2f665o3pqsmm5akp7xsjsyazua6g11i0i83wzfd4h7e7eywki0zatxqjdq3s2qn0819puxnqixorszvxkh1xilfgwgecgq77kof7nqgxava38rk36fexshd9hkxy2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'cwr0alvy36f7c9lf5v51',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'dsv08ccofcet757y332s5mvqwofhtrldd4457lzx5pos5vmq3d76lm10siymgxrxsbshogryjzveji95b4ll8jx7l5wqp2tg5l1mfbv25hxz4stkgz0hlh473vji0u5v70ocgs09qn31f9q4hhee5w9o13glf5gk',
                channelComponent: null,
                channelName: 'sj7q1ycyurjsgn5v30qsra5y6d54g9at5o9urh8uddntk66pzzxjmya3sla0mbfe0djikugd6po8goa4h2ulg1uflgn6is364wt54tzb6b5s85vtz8lj4nr1nwgprgttsobjzcncbqlyxf2m1fkbm44jh44umfd4',
                flowParty: 'rg9j3ibfl4qub1whopr4ac5pi9mgj1xznnoimlr687tubiqq8c10vjny4dit4yn481d0808d0q8a7x0xr9lrnu2tyr6f1zjbqpajfidb1d6m2rsvemeh361zoq85t3jb294b1a2ovcz08jrkfnpo07l2sb5uaovv',
                flowComponent: 'ynxr49e1dty1w9cqpyqhfqoz2xgnkiptug057pumvyzl4ziyw2oebbcc6n8roxuk8kgm29td5ms96twbr6tz72z20xnininz08zhedp2v2uzjdwz1itwxql6xau0g6ned4on5dmxjlulljpalsyotcdghms4yiqj',
                flowInterfaceName: '4dr3hbkm04ms0682anyvdugybc3vpxhviwhxwj835xax3j8zf4r8s07a1jdyyzl7yh3kum6qt8h3bz6a51glv3xvfvpfvisr9io9dv0hn4t35dfpulil0ilp6b3bvp5z13btsst2zvll15rnun1215s31oggfudb',
                flowInterfaceNamespace: 'ok6p1erp74mratwgvea4ob3m56r61b63ouo7isbnrbpj2vsadhaol1u34sli6l5tl0pv0y147q1u8k65fe1tlqrwngp38cgwhadpc3usqyfuvnblqyv3n59n6csasrcppit7l3mi1im121i4p14qbayzdn1n7tw5',
                parameterGroup: 'llu7bgbh4j31cc8w1f75nq6af55uh2ub9os2dgx3t6fte1k09imemdn78uzy4ds9kxsh6w5kxu6ftnwjktt4k7clys775mlbqgt4wzvn4mb2u1la5o03mrcfz8ind15him7yvytm3omjwztico1671e2ung13u9xonz5c9cbrac9xh7xxeyaby01selgn5y5uthmzj2g34up93dxysiyws30ybjt0lo9h7ni8rhvd96965q5el9gvoyvs7aukwh',
                name: 'ijpa475rh25x01rpmgo1qu6enmx4b40swhqgxcy07conbwpxvx9r2h07d6ngfdf877o2f8c33728aa5otl2wmkj8jjsgun1it4mhbkfiy5unmfs85dnxvabs83v7dhpybovob3ovi13f6jlfdyv66vpd2mnkba20znpr101epylz39z0oejgridxaxhvkjjp3s9n935ptkwj26hqit2wqw2ftqkm09kqk8zyhvf76283j94tba21mgqv1ej7f5z6erdax97qovf023dkhjnl678nofsau80jr1tln4yqtd0sejqx32eh6zclmqfupugj',
                parameterName: '9l4cwvfuxtiav71md39pgaolh3bp461ik71mgs0anrbjkjk69s5wozkicqae798is1c028yc23ix9g112e3n3ct9pjz7bb288g1bwlvq5og03w51r6rts56df739vwhftoqdmdmcz40jgcrzuss3etpn8qnwb9opxl5z9kv1l1ygxoqnwi8581e7khtbpdwl8e27m3c5nyb3jzgekxwe7o97upmvyrjv3juga8vwu1jnt02iykk6qkp2th8zp9p5dhl6i9ea20ulpdurmds6z4nd6iiy74gwhyd6cqgxhjudd3bhy4xr0q5q64beoidp',
                parameterValue: 'j2k4watt6utk8q0j2melyoaz4xxebmraed7rgeq9fc1f54i5fiq8wtx9n9p68tuew3cmhxjbrtmps2qg34976ta67fb5ouq9wzbtk4ntl4zrg6k2gj86ulk11l443m6wlou1qvi1462we2i8sz567p9xx62wyj6yx02h37uhm7f8gj9au7yydz3dxv550h912t0cqn18jatpic4q7khcj8fbarzx8epy1csgcnopwh7fvy54o0jlok7ksg89uhnn6pnxtzqw5mvfi915xpvyhtfu71iohj6n2mnwjmqiar2ha76bbp0k5l4cu22tgm44jtho7yvbcsonlr0z1mufo7yckklr26z0gzd7pueio1yp7wve2akyllmzlf33iwit4bc5vc1p9io80arccipqjatf52ay5nanuq03pqmocr4h345focmescy3yu9vegozrewjieqzpyr30f23wbgqgcl7hnvi4n8usezs42r09iuu6oi27k372r5gthfqli18axt007fvqp8z2mi2y07ynl12c7u6l7661sjuym4e0kmq30mr1aqlsl1i5ltngxmo4c7abda5xecq1oe253dosj7lthc4s279ztp5soqg62nfexzussqls14sepkrygjmph01goylct51xxjzmm3xkdo3f0re6tuuo2wlhnt4t27qnsq6x2ziigjwnzk18jn4f0qqknlf7v1p0hy8m2hr1b70te85rjb12z3ejzox2tx1nc2pd5afmo7vqwss4ihuxnhe38ieo2ncjqmhcrg92sfrj86uuh2u4pm9dg61zigdf7592mdym5w2dgamhvsvlsgyw0dev98sxw75umryigb83nc47u86i7o38w6hr748kdzuha2jmpow0e5dlihzegilsnncc53qgyo68lg6a61zyf2thbwl5rsl1m3kwgqcah2ckewvkjrc9koro8b9pwljorv48ph2x8zndjfipnbqx69a8om7rwaej7l8zp6c695nx0ng5gb3kd0pnb6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'eaob5oupfipp99vsz29o',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '4s6i4axn0u2gncotm5pvu8egbohdxw071meokzr1fvs6h5x8a1hw775n9moyt6tnre21bghso7du2krxqo2lqukno3d7zyq71g9i1qk4idsy7amnx874v0tf2b8dry0i6gq5hv312chqvtg4goxhqno1eptn3t45',
                
                channelName: 'ar3rgvrh10m0zyveq7rpzy307b9rrsgj3njc70dhanxn2eak0levzghw7t7yzc7pacyc503n2lwzasaf6yu7g8xrg3i7fipk4dmgbusjc7czs0b21t3amf0keubb9c7fs8uem6jh39vawk1xhq9p4565h67n1wfj',
                flowParty: 'wl8szhmywq6corairqsd59ezyntstkyjpivng3ogrjzkiooyk7boqpy2u3thq9crxfx2tsrbtuig6p0skex91z7dbix6tak9scrac3kv0gs2ib7ptcrg3o45uvl43973ts1sdvemjx2vf4upe76wvkx4bdinya9m',
                flowComponent: 'mgsy9mxdyos1lyd1icx3czlewykg6btoszle4249uh1xg2ttyiiwr34n38z92z6h5jq7mac1irmtrke27r68lwmwb776q7ncuuim7kc30b5201u03ttcir1fh0cxa04ari62ytgpic6yqh6mq6ifoo08i7a9k6jg',
                flowInterfaceName: 'e22meutjfnxwh4ytu2gq7jnjzcyhfg3t36y8er2aximv8fgrmpck4n3m1sxkxw1cny5gan8nfc80o7sfo40kcmu8g8nyf6k2y2mv99rdxi83kloqv0hjywctd5ee0wftex5ex44e55y5typtdjxg45jxfvg234zc',
                flowInterfaceNamespace: 'x758k5ws05gm2jnjh4wyyd97laqyuuwthuszfnbukuysvs8ddhsh0y3vsmrreyy5ypmpwufu6d6tqol4qw1qpkhnugred5ih12hp49tupl1mdw5a1nv01h3ppnxuuffb730h58db8ph96yck4d00osnm6u0motzp',
                parameterGroup: '9hudf1he2cue0wnfj20u3vfsxfsw47e3ij5tdimli2t01plxes12t15g8h1k4hh2dbaqpetr62dj4mhy2xxltrlaarklkuvqrc2kymavendvndk0xixsdeosixgg3sv0bqpf1kcbulp7ah2zyhkn82l64jas08pvi4ahig93sjiuiu2b5fs09mbbm0qxau16qhg8b3dr9av855hti64agpy6j6thjcns2us49yt045bues64sa7lgr5txe3eagb',
                name: '8nv4oqzh25qxjqf879nin11758wkrueh8be9ygeasb5eoh1lmasmfzlwk1knoscjoqk0a0es3eu931mdsypzxmofoy8ncn4cnveu11h3pq5kzw5bfwg68fz90on3e1zk5nwxzjd8td0x3ufhhdoywsftyv2vmsx831ojmtds35belpd9e19y23qmaghsh60xgm06eukfe6s4a6zh274ep0fl4e0oxut6i8rxcly2hchlhx22acspmh3vu9hnk8ebzu1x1p4fp2ary8ea3qt73btg2cnd9185bv6vf9tk4obma82p8gwbuapd6fxg8lv3',
                parameterName: 'u33t4vtt2a299xd6r0ml3hmbqst9j5py93hitwsu84eg33cl09lx898h8iln7tavd5ee70zskegwfj8yqcddp6hwacv9m6ca55fa1qspmsgwb4pqpwuf43la5xc8qzwcm0ropf6fvpabh14pvmtnx16n6ktawaiathfijm4toe4dy0hpnwyr50sufny3spasa32kfgfiqckpc0aqnqlpvtx9w5yfemm4bb0wow52rfj73mhdmk56xhhsyal1875k4psiaujf4ooaw7liuujfrtltleujudsx5d0awynowwa8d8kd8nbx96rmyr8hzoy2',
                parameterValue: 'torbnuwcxets3j6lzs2v92zrshahg98b2lz8f8fv6k7baqzec6dsvp9nex6ne7cczw8p0lpv0ch9ylsbrp1yets0t5kwbwvn0lvxqa8hbqurphumt2vjz7nsreidp1sz6e0x39hrnroeqnmnhauyp2tg67yak7lzsrn7xox0rcqx2xbhjmoed84v4rmp3kx9kwnf2a3dojcx7uysu3xv5yqdyvx9bdxc8idqxsimk4j7pa4rngwqtl9sm3iqn3syzuh96b007mp62gef0bz5hfy6tr2cjbl601mrzns8k4i2k8zeok69gbzc9f8ix8nomyfr8957blnf1f527unbnnarfj1nwff5bj5l3bpcsqrei9gdg2psvvsxqjb0gcrkpx8wuw5m0h2hgms66nbmnsjs80eap2bngv4xto8q487uu85rejmoe0smw43k7o9yxme7ahkkisiqqnjyfmoziihdh2vz73ykjvtsjd9balwknenhvp3qjnbk189tcwlmj7yyrqiwmifky9ydt5b4wz8aucu1013lyuwyabwobtvt4izkkzeq21jwgn97a5wgfqfp1qobcaj79lqr1mvivg9mscg4j2tuyppptgr74lv6b0hm329x4lt82bk4c5ypuacz59qo06wlrju3pjp0bvx97gfdsw1nyo2te3xmxmwbuhv9782ipimhgxro5ejs2zbjc7hknsfkk72z3e0zddk4pg87939bw4u7o73a4bxapoixhr7e1jjtjdu0ndd80zshbg7tux5nbkvi6xxek3xpuqr3g6c4g8oyu42dh0ic9jz8e2k4dr8svbac8pdxrjoa8rlo4u9fs6gl07cbyqrdcmp5nw3mjkcuh9526pu27sexu9bem69a98jrf9njc4enru4vr5ao2t6hhzt3mxdvjvakqzdr1iaoxvyhad7ll0wb6wyj8ji26r69pj66k0mn59rhl8x7dzejst3mds0b1g15zh5c4bv1203j3v8wxub15r589lhb002q3qx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'sp3nycij9pxolfqramba',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'fzcbdwoepz8wsvjfk51324g8gcymh94h3f255nvhvfi7ran1oco3slfpnl7it4r7s3eycvw46yoyz65igz7kkuhpw905cvp3m864eapdem1603bh6l1trynaldrkuty4noaml98y3em7jk8gzrtpkt9d7vwcy88a',
                channelComponent: '09wx47770pw82k4r5pvmnbwpfswwjg0em4zuwf0rdc3lz2h8xkdaqi823lzoglprbd909uxagauwgbhu9alkfqixp5dlcw4dqh17uoppuops0uutov5etizswzbcc4xagfzp5cujr40cpfz7yu822eutftek1os0',
                channelName: null,
                flowParty: 'fjzuyjapv6j16vt2jmbykozlareetny1gqnlzkh4fztoj8vbany5266cxoyo4c3fv6id4nryl6q7xh9b3u1ribfnwl38m1r3awfo3c36z1rcecbyypwf17dlgdwjzcztjvk89q5kq80pz1qi6zschwbvhqa73ydy',
                flowComponent: '6dakdvkx40ygib6v3ghxrm836d48rqf431df54l6b4vf2gi3eryhyd4rim5o8rn7w6qdtgi7twku5z322blhrpprxkvq51o06d1fb6wb0ze6s496gba12owtg2e5fxgxp2sv18vpoz5009lhbekmzazipq50nn3i',
                flowInterfaceName: 'r95hs5h0bb0ozvxap8icrx6xdwa4uo9v0vadbc4o1ai575f2nsdit184fz7nf5j0rqf8mj5zzquwkx9gkt2de9mi7gsmeb0agavozempm4790ie1m80agh4dbwr3oc642s9w1pm9mhlw587f3fgs4lm87dtckh7q',
                flowInterfaceNamespace: 'rx3f7mhub8j73f9a5fwgkzdzis0ymy15pbivhhnr37kitj3x52bc0jsru36o4pigmzwlxgb9xssponj0cqd1rg1idtyxdcpnv6s4glzr1aohqgf6pz8w972lk3v2v49fnwj0f4l4gtoyjvov74qpvm7il2d8p8xx',
                parameterGroup: 'mjiayiv5x7vim8zvzmzd8zpfwwajcw4w4eksmce8b6o93jxect41j5ajnew2j13rxv9nflcia3m1v6d10lv0t2wjmkncijybl3syy8ozxoorhpxs563hwuwco16bhbu1fimgwj4gn5klb0sdn55d8lgjubof90muxdgwidrv21lefugzq1b2pwj2a52loizejt6wi0quj7l8419kwed18tbwewycfg6drlg4c6rzy3e134gco85pwxanydh2gic',
                name: 'jib1w6er9z7oms0iadyak65z576sif22xlh0sjs2t6exy69tgt8at9dwhngq65uq4venx72m32bandpdjjpcv02cieb0wk6mkljay9qlpq6adculxsn5a1uhtgmsr2wzact65o4g1ywo7pwjsoi0cn8tts89psfmdi770yoy249gibhsigl8hs9fvpakip3m5qxq6sii0qy5iz5ltvy8mwabi158xnixtcz3o7a9ziukcchxzjhe3gkp0ttx1dbtoslqwdu7i33evd6kxfn46poa89vasnbfvjts977lzmu52clm7h65g59xe17s6l3a',
                parameterName: 'pvpdj13c9otv7k2i3asww2zemug5co1gg9uykuwfihu0ky0g53ntc81fz3wdsciw0770k3uhmycuaxnknrthgqs3g6uo2da0u3pt8exqcpmpg2uhtg036yh9ofkocsnvqy4oco6l9jccphryrmg3orr5zd4mv76d9kt3118q2a3f4had2lavw4d99fcnfv8a628war6vx79tkzlxec46b3y4441ec968ggsnqd8iyvxzx08thd814d12n4l2a7k0bj34yfinnikawd9jnohfhw2pq8vg1km9x4y5q13m6byc82zf4qa0qqfge2ftbzso',
                parameterValue: 'l7179y2ouaw3563yt58qk9akrxw0240du7dm38kqqbcqcgu84400fs9kgse4pyyft5morq65d0mtbnsmfm5vkm3zcmmo48z3b0zkjv5ciss0ocbjh780ezigt8nx6qizjnu1s6n37q17aabal4y49gjun8w2prctfjrgo9u22dl10r59fkir46e7poc0kcdon30zrow4u5pta8aj2n00g6y9wz1xt28o3mmxmpsmf39a1g1nxloe2g84f4nz4irmetj9hd5p2vvtgsgzgs6oecpy8alknndqeqmlzqa47g8w0e2ed1b4bf8isz3eze0jktvssczkj3zwd57xz16skrydp56gwula6tglng67xuecd861avnrbcxkccqv2zydq5pel9zwej34616sb1ozyzb1dt2y9p5srd7nqvd89r6ejglo6pb6a1scg2biuapcief1eisdxipekr13fi515ntw9hefu86m3cknh69svpfsq3vh089hijhy7zmubt0thzqylabppg3wtz2wtmn3r9j07pxb7to81xzc8qf253rhp9hnbwrltmefs6s0ji2qd2caerrunnl43gbcweybfdg7ajbohdmvgxim9hzyjs564ayshpjnkv9o4jzs7svbuvglahlz3hxf1fobpysd3bm8yms1c4w5izx5qctj75nj6zf9qs077xn4b1iusii5v4cwwch5j12wkjazynb0o9erkb4n3rw7wyw7q5hgq709jz67ud7e4w4peylymylr9mcbalm4j9hxwlpzsq70valq22hs49teer8vod1f3yx4yuyzccitm808s3jbqyo00om7vis8s2mq3utdc3qje7muj9cpf8hi1x3cuvk04zlelsvcvq56nv4b0nkdu2ovszi08icm9q7dy8dhotz8cziadn9a7ya6rgh7dt1x3p7sptvyui2om5ba7kn3nmyenictxdq0v331xarvnlysw7xdvgqjufylgtm23i4cz7elf2pxxhax2zbdt6xs1ft',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'k1723ddaehgnjeg8u0mv',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'ipajq9lpn5girsbn8oav9gydr7hchchprkdqajzl0ecgiaq0yifnh4kn70cl6l5j4wc25kb36x72kfrijf8b3uloxlv252kjz02oufdmmfbjv8rjsef5me79qgvxqghv8qpfcsfr3rpkppwvhfy9k1dkztn5ouup',
                channelComponent: '2ikdzb9puvtoxaakpo2t84rpez8gkhg2o0ag1doq2p8ikpeffsmmx1ikklgcaen1ctc17172jtwnck8dntn3ws4tg0cr6bxax1vmnjqez1ml6uyck706ifb0x2xr7xn2lmlxdas6hwpmxzrh547bl4un1f4pq1fc',
                
                flowParty: 'koqjaeo52hri621chela0m5ll71kd7oa3qqjmq4b9o2awb1scv8mmrfiw9gkth1b8v2w61tcbtynrl36rgu4vsrdxudjl0bkz4hfpfk9zdvk5krw2qwu3wpcw3auoyclm9rg0vmz0u3u3ipg1kwb3f5ewz74gvee',
                flowComponent: 'p3320ofqjwjg91psrdnlv7qr664uls3nt1mpemi4rx5rkmci8nz4yck0h7sxhpf80gc4zgb9wobv3cmt1ogajf3jjgpo65f2rj7sds65gsyk5ob35ut8btgmdd8ju6tkcn8krnxytyq3dliz9zmg15bun1m7vdtu',
                flowInterfaceName: 'q04283oo60aeqqqljf7yqtke62brea7b3tpq5m6ahyq31oqpbv0u9t3bt32k6veto36of6h3su2oemom5syh46vaiex7aejp7wgao8awt2du7wjkfi5xq4nn3tgcvloxd5ftb1evrdgrs6cy00g5xgrkwnf7qdrf',
                flowInterfaceNamespace: 'z4trvaigln6m7xouz2v5o7cgbby1bu2whn1fspjwkpfyvhh323jq6a8dzhxq0yoyy055ddxz4w4pxdjo0q62xmecybxmshoxjlgdgqnizqputoe95iv2w9fw4wwyvutyrgtyv4uxf7kuta2x3kdsnryty6gd3p5b',
                parameterGroup: 'rmrtnfzr5tzmyo94s4hl7a6ivepwhnxashbqm5u1qdqlxtvelduhjtah71b4r1nio3eu42ncs0k1rgft3k3p8h69dnkwbpzfyw4ysm2udnyff00dcle4wc76spqcsz0it7wpzllvmshmaqaqbm0nfttebolyaeh3vwvxjf2fdee9jukzupwbfdziduozipn4ewbs1bd3mjhn68trg7izrzp7yw0dw8stqxz7k5ngir5kn3iwqgcykeqyuhu2dlm',
                name: '011c2zv6nwybp01d3ha10cb149vz15e47gw8fjd42cp7icpph4rslge16956omqolojwpcvsxzw96ryn6zsfrku3rpdp4ur825craatpdk259lvyclyqabz9ib9zicphcqoxg3df5w9s5ceh96482125els5ix75by31u50p3tsdhpi8eff2y6r6umu5g7r1vgpau52jul67ksijeklztjtny49z3vww7zlkb8yl7rcrzuiaz4ue5w3dxd0wuhklf0s47cjhg766duc8tv5o679lcfe9r76qa9xhmgohbodqsdadh0zukxfh0yterkfx',
                parameterName: 'jbrp86fckiyulzr0n6ynrl0xy9s6do9d7c2k425xbm5r4lhuwf90wggncgwv822a9jxfkstzoj1p6xyrff98zml6ejlo9n3axjgml4ddlzkpcd02a3jerd1mkyp8odezde71gtmleug5iawjwkgrwkiumxs9rqbq9vdbjxplpyax8ulmmtnsm49ah7lnphkb44re0zjg7l1yj4hzf1pr5rtk6xc6r0wa8nyi0t9i7utiv7at47p7hxiymsxnra4y0ljq245anw4pq0m0wz1kek1b2tgltc5hcqxhpzumq5rhytdnu3gq7hjq2pubj5vy',
                parameterValue: 'nz2f01nup50lqjpeplrlrx3xtl5i0hf2k488s7of3cgraewj1pom5jiga2w8hcxvvoa419i34pt1bmaogtp92ugypvfly2gx1571anjbnx0xrgv0r9j938ymtn6w8dvc4edngyxhm55qtxw3oemyot9hy872jjlu78fpfbqkbupudbofgbnjy82dse7kibtqirju8bw2snn90sesgvqz3a3twxrreqvhlq26kjpk3mowpxbg4mfsqs4xnjaqg04a3bn64jpzl8ddb55tamigq9xnh5dow4km13uzqfnrxn37t9o6n7zho6m0h2jwob2j9e53n7f3x1kfgfnvkt20j15sjmlqwzf0ps5x7qiu5ipr706xjt5jehit5xeh48h7j5w4pzvkygl9ckhh4bk5y01a2z0b6opbeyxhdbyaicpl33dhzz1y55znzcxjyigcjghetdva758ckvmnka8e6q5b69mfto948w4ccgale488lnpffhrgn3pm7w5kxs1fsmdv4n1r2zicfioqfn4ou3gdyxz1sfzlhknem89fbnj40wl16f9ovrs4mtsrofw137y4pnxrf29fctqkfsszwg3kp0gju7qtzzmvcu6e6pbnyucf6769uw4ydudz2cor0ke0g9a887vq214fim7cflmb8jvrhpxlk7b920il6hm179bz3fubz9py4ctizcpevjkscwuptn0ffj8snhjjdkgr48vm3eckpmj3usaip25ix9oe3exaw9jtet4yhqkmb6lx81uk0mx4r2msbr4w4a53noxeymaurpxnvs2181egh1tafz0io4l78n4lj6xx15lk41f3l25xfz8x8umv6bj7zzdthqxdmtwc5yis19l2tcxj8sxea0j1tak5he1am8v5h6pyxd943gib6t62xf2z694qwkwej93k6wok73jwfzwbb4hk1rbqkmdwsngjp90kc1f5a2lapfd8yisnq8hdezotw47swbycjl8w59uqo95vwnsjsat8mw4cws9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'qx7pjn7f877db5wl0u7s',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'wlds5qo3vq58wnqtxpyustqvgu2n1tgyhjm463coji64enfi857kuqwdo4d8vesshkqvuqke5flzs2cpz4xql0d487zmsromcih34iw23lp75cu8uhlxkvpdndhkf7by2ejz2b2f1z4z9bf1hi9805ee6ub5u2j9',
                channelComponent: 'abir74kki00m5rgwdlgnsmh5lmtyqs3tm9ispro3thsab1k2o2thx2zls8x8t530w4lumzbzbv0nrmnogguhsnh25lewwl9j5zrci1hgqf2d5tap32nmdfq430n7ibdftzxye9qwwdfjk801rd0mtptswryvh08q',
                channelName: 'vtjs6gc9heojql8l7c0m2bx6tzhndwxssifb8kaxpudr03wssqbmbo57vlpyhzewek8y9h0fcvrvo3wy0zfxm17p0dulci8dj9x0ml6xcpbatjhz10hzkggqb2akjy2elroodh7ob5lalqhr4ra2hcq4x5wixrnf',
                flowParty: 'ex0mxvz0a5gn1zxytqj67pxp0g3z8dih8g6v3sbqhb5le77e7cx5g8irxkok2ybuz2qyrcqgphpuc8xq6a3j67ukldao4jdlvwr7culflzy62n3k8kdjdy6ki3akrxzg5c3p3khizy71op61qcrymof1eqropnho',
                flowComponent: null,
                flowInterfaceName: 'oma6f7ctqrl9vosg4hta0hq2qesf7x45od4lfmlvz75txkns06wxzjr0mpcfcu0gvkytjtmnl2kb91d6iw76wxm0tmw4ibnqtx59merlc7vhv7u9xlfv79q1phfxalnmhmva8f0eavndzj6duz2za1v1mfiq07ms',
                flowInterfaceNamespace: 'jjwqjsjz2pfa6utymmug68ln5lq9y64jac2cb60tq0fr86lhr1lyjpg1syawetqzzzirycoqwt79y6zszifpm69gzl3qlois7xbchfwb7r7lyjkdj99ud4aqv0l8c80fz7br7iicqeq7p0d1t2bk6g46mfj9adrv',
                parameterGroup: '1jykezj2ounpxhn8lx8xhowfwt8fxxt5d43nagdtiol5ngmozlitym4ulq69vdj8a87klrhoykxbgve3hscrv8ym82iovpxogqegihmr9uimveome4mon7xsp5qjysa706rd36gswad1rvwopbjgjiwg9yejqmcoq2fvspqkl659tbrx41qffgxev20r6pdonhr52bld0uh7srusoep2wk20kblb8y138rha0z7khr0fq6yuar2spmn1oauct3c',
                name: 'vy1ep8m3otnhzov7876zr3brmoyr5f6zdj6j1y8w9x8y7wd0inr3hfmzigwnn9u8kz749c6tg7fssoeqogbnonj12u82l6nsvrmx0115uyjg8p2l4i04zc8za2le80pnby3147mm0lqbponp3jiegr86t2otdf4pdqe3gt6p5plsn3schptnesrb5akgi45toax0jblw0t7ghazg6bkurq9gxuadzupfle371c6m22vpgzz2me8bola6gizsm40x2vpa3hqag86oj9h8o3np5bctez5ejg6b9ht4natbdk0a8qaymhdypv5mbi3qj5wi',
                parameterName: 'mnknoro5olf95w6wil8ybwex5ktcvfqm2hf1hx2jpwyw7fqa8y8xe9dh0403a438vm84q3x63xptrxadhpl37fiwpn7puz9ct5awbwxl3xr09zf5j84ss8ncr2rdfmj2ew7fu5b1m6i22mgxgizcecypd2na3zhsn39972mw96labpkiey8kxbov930flnfysfzvyn0cjmtczaklt5p5u4lmb4msv0saps4qju7n4iax8hqu5ii4tdjytf0iop3b4rfka7yr0tw8aqtxhvekvix2e6aygd9osf6hsbmid5x55g7b6hccply6tf29or3r',
                parameterValue: 'qs1qjxbb2a4rn6wqqndd0rqsmfnqem1zstjm6f49kaiqm8z7dy6ffclo08bq6s9z5eg3kppmuetad60ynbk56r8g0im46pm5pscwhjq9harv521tfqfk7ipeemc50ohuuzpmqdwittiu6sc8ktzr52h7ofscqk3h5zdwgw4inn1l1s04lxlkwgchknal4yhglcf5x4ktuwxhjhiyu2e8v3ess4oaaa1m7ttba5swfjrjhnddkthflsz7ziai1lh9mzfw6xg8qjm1p14gbng2r4maughfomfg2r3aw45iua0ejg11tzysj7t4f8n1nivt0wr1ytyg2mhf3rydsh65662qjg3nzrsg262udhpv29w7og0vqjtt31z4s57iocomrfee0pwj9ivj0fsgm2h9z420zcw0pxhl8o0vfp7oay8a8cze05wgu9yr0s0izqeyaf3k7eyft48drf8xpom7pxugsscga1t0c7adtk25rhjxthi9p89tbnbhdxnkhd5564x0kl4ctvh2jratjzoxs0xmb3g5s1ap4u10crxuypanvsmiivzxae3fn20iiuvwap2p1le7u9fk0ta4nl3ghqb2zai1238uoam0ixu28vbwwbofud5h8z6ra8nnxli5r7qdnuvzag4zpbu1et9405guafi411rzexv88n2vdmkh4w0otohu92797v3n2k629hj8lszqmysth5mn19wzxnri0l44dwzvqk0ltf29pvzqd29sc7fu2yxzaj04g0muh5htiqh3spu7f3oswh36u3wim1gl4clrrkfomzdh9v7hdotszcw3z34vobw2o9crfebn41l5qp8afcrko531n9pwq8fcwxpqvhdzji4xzcgi9p8j5ziymmsdsxvctpqa5wcx2ayousorb6r3eg74dct0kg9s39gn231iufgqrfko6d32wsvepsaucm060vcu34xzv7azh7sosutc6ld0ug14tk6o9jfa4h6rhph1j89lqlbs5nco3iweisis66w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: '1v4ejj66j26kntncaii2',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'wg1rqidnz0lpwe72tz56rbl15soguny2wnr4xiunij4aio55pd8bsm2e1g1dknpve8n12ljx40ykvkptho4gu276uwrqtg785eayyg0cn5di5ckdijatmgauxrxlxxlosum6bbqm3may9kgak204fs174hl2ry2l',
                channelComponent: 'h3aet4qbny44j43ecwsfa2ad8vzs08g6z82x0fxnoul87fqcthw23v0kxd4jguko0a8vu3xgcusc0f190hi7a6kayp7fkli3pvwbxq8okom1dg981vaeaz6trw4awhkxfua7ox7wu77bxxxmt6aa12jgyq0t4fuu',
                channelName: 'fiv0idt9adg8xxc0lx5biymyh01vkkt7e9xocgtzyeghza06lrjs4y52labwbsqr2ttofs18y8qqi1yoxxkzs0w4f5pgw8gj7s5hqdrbs2v2tvy5sxkaqv4jqklpevhtghejr9gqwj5u4goynhnzlpvlolx1ueay',
                flowParty: '1xll28axnp683h13rodh87gj1chkrqpuuu2zem4om3qdzzbaxfsqlc3kg9emzqldgh3am1kogdnozxzohzoof4stiiuzxpg7l77beyrm7qqhxmady09sck14xbr8bwsi9uz7uavxpzo9e1faqiu1nkjw0d4f3jno',
                
                flowInterfaceName: 'ky48bssdg0se00kl0hnhlwghn4apmjot6u2ooui7q0azxw8dfgyrfbsbp4a3qgxzgicviykts3wztd5zjl0wncigo49jenkl4gfp6fabd31ys3jjksp2rsbzpagusp4ss2btnmwswtkpmywc7xj7aoji09iwaj6f',
                flowInterfaceNamespace: 'b886xiiuniwk0qqkebta32olavarlndn0xmqjjxecaukiaragz31vupaemhpuyq90ey5u2eowuv9pqwc9op298i6uz3dfyu7lh7g9xtv50imqe4c9503nqbd1fjk1yu0m513mtailm1xwmy2mz1748v8o0usw3gb',
                parameterGroup: 'l5i8b5456wr09br6mkrupk82rzuw2xobid87xnsxqt5l6fz047qzn5dgfq0n7kakofm55rvsj35b93egcmhvx4pzhkxeitjsfqu3ax8xoq5ylqgesg13yb7oro88nlpm00w0gmoi8k8590vsy0w9qpwpgz0z51osnmc2xik43ro7freinrqtd8h2meibguumlu5ljh2tyh1l7ms1c2aekx04hx6kwcdocoh7fjchimldgkml3tteoebe41a39mn',
                name: '90ghslmmsjey62ma7d921j2wbosa32duenmeptoz5hpvsg2cda0jzk892m2z5qvbpln9mbdychlxmzbn4co3zmeqmcojzrmltl71pus5viuxvnpvt9r8cxq7ui33gn0hvowsr3vb5luonpyij7jqcomu40j2mfp60yu92rutzsz95pc7envwpigicfwmnzdied3z9ravr6q1iy1mcztss0yjncf9knufsvfryeoz7djpkv0f1ws4d6mfh7wqc223d8cajnyghuguyd7g94rk83j16300nq6bkgwhv01cai0zwigzmfc3rtc5w1amg68t',
                parameterName: '57ylqpdkcscn7k9bg7u1uzhdz1mjn3sq6mk6jitbzxb26gh8kfq2efjt5y8u72c58m4xhqq897kie0v8b4krb4rqwfvxnr3ka1dam438rr2jvvckcs8bt53nib9t1zpkkj5vijkh0udgmst23hgrnniypx15jfxj1531khqvd7a9m6fcxbuvzkw9sjlmydm0u6xhjhgvrpfzmrnedw4m94spnm5tgziopndq1fvadfoqbz7yi5cfh0gelqx70b8pfnn576amuaghmp7ygdrw4fg2ih4hhel7gtn3bskp222pwu72hu4nl39823oxxha5',
                parameterValue: 'fiiik19n7vr1u3arnume9pzszafoycrtw343h4h1c1yrv4rxkrfd5cc11r0rt5ys88tnlw6yw1bf3idhnbx7cbodn86c55sqd4laop19wttqkm8louboi9qfz5jquy7c9z369cxmqttw01lt12vt43jafvbzmox9q3w7h9dpq98g7ykalkwq62okoeomiq9t6kayj6gjylkt27ykccgk5zphfr1fj78ngxew47gx49unv7ddrhror9z6sqkc6bn4qo8x66ai0vbdqyhexei940fqajc3ssjyl86rz6ufpeh3wsm84ay2hzl0wju5q3wkugkejlhhnljvm4iygw0xgoqyts147xmxah8b5brrr961vhgwhxcd5eareym32bxfw9hq14hrzsz8ehjmc243qf4z1xum21kk1bj8a0qnwba7zm2ou5gitswjjaatmw2ue0ki8gy1lt1ojd8z7ik5o09z441kks9fhggy20f3z60aezbqfjfib2eu925u0usnay9s9g6hxjogexd9hxko4v9c8pzxnapzlxtzlvszk1f6n6g6dd0qtkhge9u584ewbeo86kzywo5ov134ud82oqupgkwrgahx98cerx70mfeubts12nykkd4tbmhmvt5tjc78asaciw7qmwjrpbnp4tm26gbhquw926jovgrsfn78kcuarupc0ve9jbzckuzxpp2eh77a8j0toktnj3pe6yafooy5j6bzsp92t9i4ein2l3oozogzj9hxxndbt1mhrimyc6eoc8z79zv0ypnbb74vfprezjkm4w7vnyo4j9146644fyfgjob8jwscjag1pd317g60zv371twvfsl4qsyf0vi25xgtzbl5zyif7udqd78k07nanyplgn3evhqiq6lem0wow9nvzvg1fwfwdn84gzzsmqoe3l2p36gqko7h6opb6nzvfl1qnjmdvkpx08h9hiikfg1pauh2cpfxa275uurh8fmajlezs8ossgj65pzeu8kzp3rlcsd0d2w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'jxxw22fshcame35zhe1u',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '850y2pnm7fxz5uw4vwce45glawdjgeilz7fe47pteuf77di7ioc23iyw2fsvg98zvptvnoi3svasgqw9dx6pmwmfp8g3r5x8w3lb8jdtlody0ckzivuz4et7zy3x5k2zc18ug9z32sib3bo4uti7089l33wj3g99',
                channelComponent: 'apv0tzlce4hpxoy4r61mov1xlasd2z2wt4ou4wuz4yui8h382fz8suzbc2qi6zhaoars9uhpcuv91pyhn0wpi71nv7jl18l40997n9w00a0awejdz09o22qijum3rj5yff5gcddplhg6cflpe5f82nz2x60tiui6',
                channelName: 'ea43jt9ve6vxb47zotq8fjixv60s71ye6ujotfkcgi1ukkmudsivvkbc532yzrq0i21362fifw8jp4hk9k6rrw4dhzz0dxu1d8x2586d5h1vl8vezdalijsx6x6bxocl73hexm126x6cpfwdvdenx7e2pbzq7uxp',
                flowParty: 'kz09du4weydpczurzana76w9vq55o5plqn06wm3egipzv20217qvvkbp1po845w3akeglo5m5ro9xthex6aidgmii8geqiom4xyj5a2trx0jo5s044m7vz3ek8vusdxdn0f8974dteds0a2xleedrs40pbi87mu8',
                flowComponent: '8ldingzlarkzywl7mufu6kouybl374vh4rfow1w1191jczedwn2cks4v9asd73jms49re91i9knnlgexskthdkk2175qwvufjfutebxlrkg36a28ex54tihm14thuahk6jsvmcv093dp2rs80gc0aku7irytcmxt',
                flowInterfaceName: null,
                flowInterfaceNamespace: '3f63dcx31doizoukg4jxogkvc9jql6rkby7x6xau1q5im2ryv51k4oq4duo8cds10f2wpnhc3riki99cr8tbmryuoe59uy5yjvxl1lhowmn85v9yix9is7025aj60essqf8slnfvpe7f8b5do1xhokl5vpub2yml',
                parameterGroup: 'z060m1b8kw4cvzgccuuqgsma0brabh1a191tg6bcvc52jaajbch3e1814xlsu3yvqph7wn02qfurf6n9r65mlg7nngtg82ozc2zjxaf4fdpr9jb98n463tuefce8zrieidxs96rq3rjux1grcmjc2zs3mxb6hjo6p3ycjdmx8fn7mdk0i16h79uhnyh48d2qvydssgjjtzl7oxi0p1w3h9kl2nv2o81s7yhucoseq9cufeolinjcfnegxet3kg2',
                name: 'yj5h314thb5k5p9aqwl1ijwn174wl4uzvrg01qs66ixstkkmtb3wkfr06l051alfd8qw0lo2j0h0kh52a71admw33rljru9tar7lpmi7f3cyxvj6dr479vssmzhmymvnoqpqkli7832i0dghdk40xtb38d1m744e7ybb4oaz2150kbbo8bpa84u07bkana7nkux8uralyetg7ddk3vyqjb8xqppdexrz7jf0ojed55hpbxj18xay52afi88mu9y2bwzyobi0pogp7g8ig8pokomlu3iazl9lixx9ko2c9q7g8ifqi3k6vpp25z0b3jsr',
                parameterName: 'kbo21noe11euxg3c9z1tcqhd22n7fdbefhmahwwwggq0n5x0vafcbl3wyy4uuhxazzg5rk2yi74s2zu6jcc4ryb63cuhfuth5720yhnqniuua3j98jclzl10pkw6bsust0rnvqhg120hg23rz06o50me788cyzrthagivy227l5ioslsil362dzipjdtwcuz5m9f9hokj8cdlpj3fm563kxc7yqimptfrqnfvtawga4mrhhyxziv2drjb9dsb1wy7p72jo84d8begv38qtuqtx2220wsl0ru3k9ypu3yvf22ctg17copojo3hd5201k1',
                parameterValue: '5p74ib1quoa395j9f9uir5139j4mb291ddzu5i3hhkp38ak7i4z09n5gfqfm0nrf8vzeytkcsvg7lr7ibjshcj7jv22gz4aylapvivt04ndrkov6fbcakvnmyz8sh3xkxqwaq18wjxorss9bskwks7kgfbm478vc5kle8lu8shxmywon1xhab1i1ec3pbjzlux60ni2w5rtnhdg94kzcmmhpszspxtggbxsorro7cu0iqhsa3kzqdp5fhbu0wwkbektsh0pa2lhfqlw6aaempl36k3874xu2dztdzf1qezzb6qx4ndzqfgn57fxpf2tqejcqkjk9f76we15n4kdkzgwvsp7kyxhdy031gg0lcixu766dqlgz1glh1bdwrhe5exk1jwcaezmlcmfio4lxl9ulh49t3ziy1ba84enalcty34uhslkampi5jv0y5yshwk6x8d3bw32pepkdd30wu1w6yid84tr84p9mx3j624t4nr1r7o6bhz40oszvww44ggnyhf6nkv54n3h6fzc1gt3o8tdomhgtiajfs4c2732j0m93s2whff6j37oqt8hke3u0c4abao6feqxp582cvwzqx864b5iqk4co3jalvgntnlt7jsz1mm69lc71skc35dwtr49tg5gqmktmkd1nat2g7fgeujatlg7k0zsoatcudxk8l4xbpj7s78f00rrt64qb7mr4fwwu0s7n6qgxh2p38tcipdrcehbm05pvvu2dv926fg7z8j0t7uh2q6triadd9j9rqp5nf25zoi9b02gnu4o1xb7ppuy4b9raw6xclr7fyvj039au8pmgscejem5jv255p09yk01e91jokvswd13fmxr3pc4kfoa5kw7du5f1ng1h9gilndrfso5ny2d1jor7auabu23ku8mx7j3bjo6msozu7jqe2ne2liuzv9dlg4f230xwxr3wyhgnhb1ihl8m9772hngzfby3i3w5umyzqlts4lq4ty8tm44alvi1osgmg0b3wdls13x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'cmqf8vf18ybxcw4tng1f',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'r5gtiqx8vi5yt6lcmg2q7prcfnit78gd22y3cch1wadbfj9dy4hsenecvj6u0ihodvvk09ic880sex73v59om247nde2cg6arly0kfljab57196qc37x3xr3sy7r5hj9dr0wnc2udqy55qx81b8rubi59x4i2i8f',
                channelComponent: 'i4yx5ekfvle8eb2gw2kvyte6yfyjz1qt7g67ge29pqxkdpr5585n8421ue1fiha1m89217qi4330lv96t94nrzr8rhb1dtdvlxk5r0sbo1fcrz9ra6zpiwferhtjuibnu9fh28ds4jeons41016238irj6uwkfqk',
                channelName: '6dy8zccorwtwin8t4lzide8rwqv8ogtizqyhgierjiu2juzxhy9f2a0q1dbo9d1rydel4052fnrqyjkh2ml6a5im4ejs1i75r6q7xotrnb9nuazu4v4mgu7flsf90sysp5pqsz8mlkarlaksh2tz5ix9i090yc0z',
                flowParty: '7gswsurwar558qr6ftw5u9vl1bv55yluw3puryo5mrsch2w23v7ow3xylbykwq3c3qbz132kx93ulcep9y1r4iqu97t6jbofiz49nkqbvfcl01vttitrywydetir6vzoes57w3cigretssq37xooxkaz4jyg96yb',
                flowComponent: 'zyptbn01zwrysuuftkk6xxclghhp6xgwwodbcdpwzn6cruyxwk8ndm59815dx85tpxhlzmrjdrwuv5lmexzznij8whhjq4uuo9855fsz6uwxa0dbu8cyz89w8dxdt0ru92s2j1nlfuth6vaeztekb9s06rewt449',
                
                flowInterfaceNamespace: 'nk5wsz39plleomdqb37o7brhgxsp49nfso0iobdvzmbyzhl1jun0zqgkulcn1dyrxt9ciffrvv9d5zii6a896dq22jv6ka00zwxllotn1a2l0venbc5g79wny1gg6ru2up24eb0u590erfomlj7kxykb3u94uo3g',
                parameterGroup: 'nngmzeeoiwrvnz2phgqf6v1ujbeen4vrbuu2n2zl8c55ktqmqgjo571bc8hszdggq0lvert831u5zlqsf3e7sxh636lum7sgy2bi4jl451f99m7pbt8ksa3r1ldmuy17k7hbg203fozt1kupysocm86dibm6wz5opik1urlb9ucy4hoxanzvwsonpqr5tji7vxhz7pivssaapialmubh6h7y7vzr8nib3qcjzgfh9ojb3zlnadtgm2i8jxkwrt5',
                name: '95rss1gq3znbem498tj2zd47k4kxr2z0wb3gtavuihhfgg770gw3vrs1gno6l0pybolm6vbve2l1gfwrhdkd5wsdc23r23htqi3wong50uquyaalpvhz18d6echmi7un2mezfuk29usyuggixehl33gkx2pcp0xrg0jdc9stm9b27xaxa4pw7sz20qhnrkpalsvs1ai41750mpjs155rvmrizd8v1s12kfnys39c3dk1z6qcjrtavmnxei79nbmjtkdoxknvai2mviunwbmjig2cw5smfncc7qv1am1uu5jivv8qs37ol9yeausz0mft',
                parameterName: 'ps5kae7b4awpd33r65l1qca7z0qqxcj1lizc4f01w7d9pwevxsn7m2go72nymg3nt4ufj3adahfuacs4kwcmxtladbpa3lcmx6abrtlacgzdnhofotjv1778pp26cjcxkwldi4d9nafajwudjsxy22zsr2ppv1jxlosf9nk7q91thyre9xt9agmz9qeuyng45gnl3fzjrivuhoukm3x0dfp2shad4nlmiwfxnpr1fegzaqnlwfbxee10uj1ib4q7oicby3iauhy9heb0an3b1wtwqqhf47dn6l1k150f2yvwl9xwu8ouunyc91oho6k6',
                parameterValue: '97el7r78ckmfe2gsj4r3bstszmqfb0szjg9mqavqkl81fbh8fpwcqucefafpp1fzvcs463ic40nyez5vu15zhh9zvlmornkqbqrafehc6ydk1zelv7wcf14xda1svu7xy2hkq4kgwc282fgck9rnt193qwbdw2frzbri0gq22frrd4gwniwk5n1kbnjbidn9olbduli2f69zeyfr78e7lsd9g8qz9mswpqstzd7ejt8lvyqg72ceml9s6xb3a19bmo352n3kbn0vdr80f23zxbai1z4e1kdaxwmyuyv4c6difqgvk2ru7vcquypewqqi8wmqf1tnhaqt8l255sd5tu3ts4qswaysotxbq7nf2m2jnpkhmmhytg5xphmd3bzx5opqvhzu0z9dtfs6pzf7kimc98gclglx7hqph2epaqna0377n57b91qitz7g4qm26gog72hdwfn306b7yrini64elwp0206mhaix755a15p6cct6y2ypphwlm58sjhk1ved259deracce6kjnigt28wtcpgkno0mbdb9ei70zrrv67tt8vm4ywpef8hhcpunsmqesj3q8o69sfx7gs2zkobb6xibcbf8rn4ylgmw6ce0dpdi57adzfhs6q1gjb927ummergva0ebu5ebxvw29y9hqs7gjlb7x24tt6ab9bnmhj0e5u54qd2gq1f40ti0d7tt3h12vxftamox23hmzfl6dwinupwpvog19rtlpfgifujmafa0o8gfcfqjfskmd8qcid95kp133o80lwiqv33noprvt54h3h052942m8x5gbpb9g4njc056v477pxf9rey36b1wvj0guviomos9j3o1ogkuq2vi85znhjrq7i3lq6bx0bswj1k0njm5dp4u9xjhsv5o5hban8h2xnkjwjug9mt8co70u2il4eqx01usr7g0s9pekci3rlvsrcuq0s1npostk0yze6df8ig5d8ftum3fbe2zzxf0choj1exs1ib7e4xsz9ixh2s2f4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'ecaojob5y151obsrkpnx',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'ffl4r0icp6keesf3es47kalhj8j1yoem6kaaq3hreajfynrbb44xvi11umof0vjrimc1bciqramk7q59ghn41raowd4n6ogf8fokua19h7fr7pp9dpfycx0kws6z3w93eiu3q304v5qqi1xzmfxgm6bhsmiwk96x',
                channelComponent: 'hv2g3zox1md1p6smxnprzm30m0x1vv57s6p0m7z76jg3lp2r2v3zn2a6i4om6jjzfj0alzgaxu7xfsk5unk8w76dd8rfz98450ccw72gobjombnteuf2ae1mm7k5e9sbdrpll8b9yw0ppzmhdy06uufmy6i36zl7',
                channelName: '4131kgk7n00s54ul2uq0dt3gtypbftplohb1g1kdnqtz4qatabd859jcfu30gz7ljocughow384zmqxs9os1shawk8va5crzr76r6ktfg55jcijhorm0e6q89pgziokl6ldjd0w5j4bydv9uq4h5lv0ezaro1kla',
                flowParty: 'ig53buufzk2qyhgahjho2vbg9fkfqh4w7l7mr5ey180cp7gy8qcyf5dp4uvpzwth9watshkyfbzxuf9lx9g8x228o0otf440fvg1bzsfe6jtmalvyau97ml58nqfyi6i48omjptvxr509ghyeh9uhi18a04x0ge2',
                flowComponent: 't3esc70r7hh1sdscuk3kjb4kdmg2sy5j4qjr2o0pvbrbmm30oklr0nx6fwcp0brfthz2mdehrdvljkpz7705xw3fvtkb5454owzkyrg0q1cvak8ctenfyfk5v7e7x1b5349dulujn2eyalt90vnj7gyi3ewqx0lq',
                flowInterfaceName: 'enx16tssm05r8to7q73cw4e920x1sphoph1mxnxx8mmudnfbb3y32vg7h3skd39650coo2smvhzdxa99gg8ut0yzh9kskp57dipbnzrqcjnyf6hz06yl1pf3bf7z5f42z0nr3et5onq24xdvkxdbygcp9onyxypg',
                flowInterfaceNamespace: null,
                parameterGroup: 't418ezzveneylduw7rn6g1a4ygr0kh5dp0pjmqbbve886l2k401hqkrnvlgi5ffqmxfp4vbhj0w53xkxuv08h68tvjnuac63e4fg1ox6sej8piay9y0vmq7ikzqm95xrb39zy77g4udqhbvz611952et791pxel9t8dgaqzo15ns7zaynda1w13qd1jckjp2km63yq4xcpaomrb0c6lr1d68pp7e6qopejsexfkulxpeoa3rerk9nt2m76g2h2i',
                name: 'ukkgowzlsine9brji6srxwyse8pnh8hmvpopmfznmthuu9xddevb22539mncqs2pl3atv01dsgw10myiokqy55smwyei2lwf8sckyrvxxmktxtkrcuofrmmigorgffl7p2n2vho2un0ihr22jqoa58hoy9ztor18n7t394g3ckhhu3tg06mmz9w48nxhmigx34azzdr54to7nequx62u8e855wrj0ywgu87ys1x5exu9hx6o12wesbsrhmkyrxa0ojek8dxg3fp8ovq0k3n2m17dp70eemutaxf9ugx6udlst9p01ncldyzvthwp93mx',
                parameterName: 'gqcdbyfq0tfvdko8nqk11lw2dawjii857afnh5igriuix9dh6l7ursjo5dh09wrmi6hpofj5h089ol17idsxc26a485z388b57msfetfe4c9vti152hhxpa3rhsey8q09wxvabv1nygp4m6yh1cmr10t6zi9pcu8xfgricr28tkouedo6n46w2okf70d099efmchkfex57fr7dkv1uny1ubxf7bbqnssighna2ampm18qpwjb7e7hh8mb5x7v2e5tc7vzlgzrtlynv9wuxy3xbpeb4f9epxrw8efza3362czuitvigcbpc2pwyernoqu',
                parameterValue: '70r3q1dcsf0i3silu1ayqclf60wj1pnh6yo6zh4vwkjfbhdhl5hrfr7hv66rfh25n4jay1jwotxarvwh3qwshbck2a24rslcmw4jyrxld72murygwozln7dlmd4o8foqtl31mj10gmbxwbh1uzf1cmthk5xqyqya1opt76x7e8r505z58uuqrvckli2h6f1yzta646wyim2gy768ogmxnsnaa8gwq1903fnrf25ci7nu4w62hj9euuzdom2ggzfku9xn84iatw7yqhnbdzye7ejsmowx4oeru29v4hfly5mfukq99ac1xnqnjyv72zfv88ymtim8vvvy7si9towvgop27ypw2etrzyj61lajg5kw77c5gojot4fwzoue0rkb1bopqvmeu7pmgnloobcwnaz95t7gealfz3djihwibm1d5d1ju6rzxy83is83wp1ujgu7fk41zxl5uhiotd7k6z048ixphyzki3qill2sui2wwzfwhl6luum1u99usqt9jp6jxnj2ho1krhrcj579jbm6q9n52kde95vu6i2qwznq9glal6a72nq33sv7kxmoki62p0a8d215letwt6srya29pz8ht6dvfy6d8n8noxt6anc3v20acgd1au9giaqgl4fjpk0cgst5nousnk4dzxpal9crycdkorp6s9eqplzl038lzqxjnukqioa091stxk2224eeczdt9s3qaoggupsicf6uu5n2n1hrop7c7rh29bs44oap0bs59588u0vqva2n7iodmfk7qmj0j8mbmqmybgjmupgflvwhod10ctubp7f2u5vjpcv0oyy6458p7adlnd3unhzmnewr65tq2lvpls9lvtmgr2108tg02663muqiu1o45gwn1lsn1kii2997sw1rjnvs6ov4flqe7nh2znkese9n2r58wfw0ntwwijmzaie42kd8tfxm0mccvok8bxymlfhmieorhq8f5at6o6dex6eimicbhm2yyu9waggnibolqgad99y3yy2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'mmbkbg621pwxugo08wqu',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'y63chgjtzuvc2p6dwu7p91525a0m1k8y2pqzp906myrg913apv58vzzpiae2t1lz3ugzh50hb0terssl9xf10hqmqs0w5qvjujvftl89v44hzhy9p99f65qrpwl517sk60v1vjs6ju9v9muh0q0zb73nxmtvs9or',
                channelComponent: 'kxq48pkahyc7t3j8qd6ltj2bfkgrir77eacg5k9rsl7yvllf1xh6o9pnldbwrzw84kzv3lubkr9ky4e1h1pqatd5yyalivqxdyh0eq2ydxw3hp1nw8chy5g9weytlkc6dst77mp7js1hldtr7b96m4237pc28gbt',
                channelName: 'kyx57yn6vawdweqfs17x4obtwnyg4714lqazoc7pg399z7vg9z3ev52aktyi1tqi6ertupc0ylgis3ouppuangb7vtrzcyb7yyph0vscm8gmyaqyvf0nx2djk23jnvsfyoldewwjhpbbgs1ndutgj17aqk9t9u5o',
                flowParty: 'v56lo6d87cds57edidtuvkre8snhl25l1v05t25oundmjbllybay6xa9w823aa44ay21c3ssn1614dme0jrv5kt2z7oblv7ojlmy0ibi3n52xt78jd6gbguonlcdj4auta3aol7s6w39o177jnttzfswcfqfz2ao',
                flowComponent: '0qkm9szs2f0glpsi0a6l5dqzcb0w41044by8outcw40c9vxzlh25ltq7nj7x5qwimp3ya0x6b72nm7cjkuh9i2s645wvmg3rfzdd7civdl00uy288h9igd9z57mtu83w9c7mn5wyaxl5ue69opj4o8ijydevzcwc',
                flowInterfaceName: 'x0fc8dha1f29ewm9l5asmzajsbh3ff2z3rpy8b9in58tg0gf40x6j60fyc0seyvesvl3esa3xlqer6kckzyuy6z15x34uub8ub04v4tc421xdmn5utyjn9kpoi6h3f4795o7u2sdhpr2brpmullka5ev4dbk7c93',
                
                parameterGroup: 'gk0fbito1neoaxwjt26a1ig4vmfd9rojlhw3bx1xsftc3aq2icmx2gyd72xwlk43nbzsdz71hpaovfbkygswgnwyl7ff5cu6r415rkf92llzabcdogi5lhnof5ei1cqhygo9ws0q7ge5lr6goad939pqwbcegk8iqhku52zmq6ixqzc95w3docqvtsvgoeu2uvypp6lolhs5jfqwng2o8ligo2f9tfkmdolpz6pt2dogpperfamtbccdoahz90u',
                name: 'qudrtnyvhyp9un4b5ecw7om5fucqqk05iv7ypp6vj78do4mj3p9sd43ydogqwsdjueanggcxyb34lp35viic8g9rlp9hut37t356fn10vzxysn48l3v7awwvse72hjr5gp8vthe6cialdhqy1fxo385uepv1uywbqcesmy0486ocsiep0yrz65avlj8eb43x7ef1x5l6t33ahds5y1hgwpzkeldymhpuyucromn0m2pf0bvklmovvxj2ud43080yo79zewbwfbm7ql3pw0o19csu9eep7o5mwmg2xg4lelwcw7xp73b4bby13niom8wl',
                parameterName: 'eei6d4vcsfyqvqqr4kko5aircl7hac84cio1uuzpdtqa9y5tj0jg8h9twvitp9b6x9l1za4uiaw5060egldx8kb0a160jlguccwfh78ifo0o2y66cvke4z4ril4h6s68vs1t5kb174h931a54cpzdqn8zwod69x14pg3rtzhnitlbzse548z6u4anlqn0pmicjtaz9ah4mhbrnbi9ubic4ehmwwyw15g0ijg9x9f9sqcozh6et4q3a9yfuxduuhz6b6cwjiyr19iot96o90e3xhwo9xyu6atz8j1socigdcna4jecky2tghoilwxy8qr',
                parameterValue: '7h7oipnrpiwxvooz1xubm1jbomxhb9yvj0xjw9wkxf1spfse5mtrb8bpg4y79qiycikmcgb778yygj2e8wvjy2nzhwq77g9hvebi13yxui03m40gaaafxkcp7etl7q94zebd7jj07nfmhr6kv5imbs5whevyj5o99wf1gpaalsa9f8y1k7f0pl9p4car8y11npgl74fwhvhf4ae7c6jdnm1c9dvc7bk0ms8hfxbzg7eknndxnwsfjzqe18365sivyl9yrnw7lzc68t17ogpg7j6jwxyzj559uc0fokvjklam1hmo8uo3c3n6986m9unpdxmwlxv4bzxhl8ifk3edrao6lvqlj759y0ds1xg80v694cnfahfzih0d4a5vrxedegxo8tbw0aijacikjgg9t9z6cd6slaw8z409edlqtigvna2pn9es1uoowbvy8geegvkgw9dxqhb9itvxhwzxue5nn8zd5g0nmqmoim7flxun5g8onzi8w2xw8h0f3ecwruo5k5ainoq24hehb98v1rgmbn5lnr1ql8kinetkb2pko5hv7dwbg1sbu8bw1e8emxxpi0dagnc62g7f9c0ag8lp9dq5jmb1dffpppqifox37bfq8gl0owr13hn2lp09dor5s7inipkqr37fs435t0jzqokvltw6mne30nzftip06446g5s6atjd50x8xu33ipv0sbmb7qo0bhmepr9hh2b00usz68qa1ywjuztnuprm1a292c3kmf55ws26hn17dbiwujfsbl23tc2wshjt65wbcybulxxc0lanv1s9bni6bue9fmiozt4f04i45muheo8a8ghg2g4khvszydpzm8jmda6vpnnhd4u9lax97u430x1fl8ncz1p8lkmuk1ftgr2z0u3wxuevsh3d17t6ry6sktshinsgjq66qq977fhjh65ontasainonqom1c129rwghsuoiokv225w1dxiw09cpx3lmphad03uc7cbyxxozd2uhsk6zd03an1u45q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c96lb2o2107eji7k1fdcy58rlaghqzi70xww9',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'qcx1l8kygpw02zupkj2o',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '2asugtsm11e0e69b30dw0jdbrut7nwramuesx4s6amdv07kpzof8ztp6licr4v2g9z3jpmmm1udm9yqqs85tlirw84ycrp87ju75w79s2nx1szieo87pf76qe1fmbsqwumgerjjodete24j2jpgfxsq8nz5ckprw',
                channelComponent: 'cqj1plybl06yos3f6uwva0iq0v71t8oerhuu3mfg4bglfenx9rqnc78ysaec7niday6j0120l3ru8amd5yzq38srb9o2rnh703i5izfbqlz400tvcczhjhrgi1fzw0en3j9ehp3jqqcef68zzwg7auily5i5qfi7',
                channelName: 'sgx3hmug9u7p6q6i6lwr1vhh5e809kk1189bq15k9aw6uhal5evyld8ehg8v5qhxoa9oyepnzpobp8dprzuc128dcvmddohzcefpvcb158jbcasbzmkxeox4lkjr2ycf21muxk7dbj25hvyq88g9u45h14f75nn7',
                flowParty: 'szjxmp67fvk1h5n8mptdj1zk4dghcntxmq6xr7rgwandfhfwlufy5lp6kibr6yno0t97o21uykoh4070duq17gahsz89yinp1r8oz39lwfjmomy8nrgux8op44ad3qjdkel8q8cr9g6927lcd0doigiplvlhwptc',
                flowComponent: 'i9tzck2n2k7ypofczca8zcws93hajnj88fl7u7m1d0krulazab52t67xd4y05dm490q4tjb83hmes5cfo1hwdfk2648f0iulv0anaefr51rsxkd660dk853s01dw7dsvbl11fk1863amdtp54xkr96nclzj05ccm',
                flowInterfaceName: '751safq0if9apgg5nneebq4xvxo06v6yk4rvyiu6dzad3eh5l6h21o11z1f6z8bwuxbhelehnoh5uhuqhuo68octwtunspgbuhxkwqkheuxjfnwi7epxaejjlews044gjpag2ab1ep9vubxochold1ef936r3zuf',
                flowInterfaceNamespace: 'yhs7uqkz621nl8pwz3ghkyyttqainowaiyxwvsa9bamu6agecdor3x1asjx6hb1xps1sqdteojfi98a86g59ue7pf0b99x75y42x9rkc9b1q4jwxxwxd4kxd3x1w0v8g3wizr1clwycklk0iaan9e2cxp8jaed1v',
                parameterGroup: '2ocly5m1v2riktw76vtsi0y3sz3db4t4r198oyt1oybl88vy9fnkr5tm9hmieskhbeamfv1ky8wrpe08odemcuwkv7rhxf16h6z3vhj4xguv02moiubrjcueacc53u0mg2lhrngu83z3y9b4814lgv5lw56try010xzkx7sqehj3o6yxvqyeczuhvo479ivchh9o2k2v9umu9bsy6m61yhorlyti8c8dvb1i2mbqng37y58e0v5idc8l6p3onab',
                name: 'udr9ymdybrpovzt68g5ee6hkyd2uig9nxwy4rxt0vuyil9pbx8iyfbkqxl0o71aeomqg5w56kwmcoz3wxv5fmkzxi4w85ow1evur78f7h9ustakpwnmunxjxztyhjxf7kgeds0qmcpy1rube47q1ufo8gshj9fgpujbpew6jkf7sy80y2rcdpf8uz5vyi9tg2tcncrv8kxffsgg7a24tvzl0n70nl06lytqhhqqcdcs34m1ezcfx60py9ppkewg406kcc74c9tv46w9uc3iklb1lxqqtwv4nlr73i3xf1xytt88vmag9a3sre24d4rgl',
                parameterName: '359xhl1ejqpegmyvoqg3f0s9akidhv9ze4q4z390cnor7e29yn51j11lx2jbkdesl9eze8izm71786ms35yepd6qedk5zteokau6zdpdsx572xkkevh4bacfschlnlrigv7pcrdxvnzvzjx2j438uvqkaenzg3an9d1ytizgluy98dd7sb7je36gu0v29udvjbl413d8saj4ihzaxadwixvzriq3a7ry8xd9sy9qrn1cirtymmbisijn9jfrg9ky8bhaauqi13d5lrz5yvl23ij3b3oi0vhhnct84hetxhb6xxou89197pbp908fguwz',
                parameterValue: 'fddi28skp4uvhczweumbrmpvytkil721p756myvlq536j3po5jm78svil8mkuv9h2tvcx9pqxh64s2obizdofo04kvpeegmzjmr53k3les3goyqabk6n5o6up2vu4b6higwe67e2zuey39ve748gxnvd4auid5l68mer1436t8lqiqycb40irdg5p9p9zfl2boopme6m0jivh72iy17vjkie1eew0u98cn7tyix57jypftd9r4ar5m4qtpmnr3ltqdwjkjo3bh978rngfdicjhule3mybqf5odwhei4bfg8pgg47kb0pj6otg4cji8812aqdcn9rkyhumtqk0v6slag23fflj4njmxq0c0xe1368dn58msdsv8m835vus9zgbr5804h2brq9ya16yskhht2toub089n2n3srstzc01rkfiaaubckg9xmnkty9wuzcaa4k9v0o3xv83wucwsr72unmr9yen9proc1lpgka350jz8e79jbsh9cdwnxzn9mx5ozbhvovfdskfezk41n8apango5t5ydefn8ii069qs1bc38exyr6yvp8hid5m5xeojontbmjc4ftjztz266zn29nresrgidpdl2vji37voatmagh73d7fcowo31i8d3qsb37eu35qeoneb2972i2z43tgttgmzyby2awg09fsu334bmncjwa214ovulint1068ps8k8wcmxbx3ty7aryiyhhpmfxpz3ud21zvk3najkodigqbg8g0cukyoo5ta79u1xa59hqnasc2klpuva18z8d2f897m5fa3inn33kicgedpdyuvw59u4ojdxy4kscv05kn1j2u76jjpk6cvcmzv5q6se6kojc6g4dmfqvmgj117yecwy9n5dhxswg6x6eoqjdsi3lxa5jzj53akh85s6sw8rilyx2f9gdeawfs5dazejhlzd7y770my165jd18rzjixk7ktfacv7yotom4ugqvsnj0o0czls2t0a6w5imc6drw2fb28m7iez4y4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'kyxnxjz94qk3po3xgbwtzkzidim8vgllcurs0',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: '2s78wytalxc4yh9plvnm',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '5hy4ur1o40cx6qknsfmlqc0zbgvikweepe2c3dv2wmr9rot9oooqmmk2x7wegzzucou9sxtoout19vlhn44p1dhl50fyjjvbho5gl7lbkluapdw2efvde2ngug16ujx7zcxdvh1u8im0c04f0d2z4ehi8mm1lv6h',
                channelComponent: 'gqhdbbk54geedp7i6kr92kqahhud93qak4n53l48c9o1kzoihsu7rche5z4ncf9q7ttwfxxt5bjd8jctdyk4bd1fsrzh077luauq82psxvwjsxu1lwwnnjn3qt9xx54pn3fdim9k8ufk76ktn1iijrk8hkwe9lwe',
                channelName: 'ao2mwnmjul45iz4oerh10qv80lg35fmcy17nbbuv7c8iowxkmzf3ux32ec5i00o8x4q3gmaogk4wo1lhv7oygxyfi8sv5lwownpg3qdrc1onlhdkg6vosq5nmqya4wmu9p4dmv89f3hujyj60dosee8ch1kcbfjf',
                flowParty: 'nqa3xnw05uthaw2j5opd3a85ben85q4z2zinmsflk7k1a3izu6aexkt5e7lc65tsbxd474camtqnhj3ac8uiads7ghim9a1wibwneu02q6mokacucgz53r3idcprqlw2f1xxljkvrwwlv595k0mkn2rdxs395vbj',
                flowComponent: 'fluptjy585z7owbaba8zham4754csliqlo0yobfwre0vkilvuo70h0psluqzmfr03wlji2hj5mbi3rgjwrbhcpqpvwveke4vivekwcwu0xr52ue7wuogcvbanifwo02l8kvy7e6sf1ivclsar00ngmlcmsmdivjq',
                flowInterfaceName: 'unmkiu065o41t94fve3p1lc3eyftoe57w9on6xtgrsruk01zl36n9nmn26a14vv2wsv5ljhost4mqakdt6f0ng0k330tf4kpob1xl8x9wdueydvwdfpxfcfs5com2u3rah0ak88di4mctihqqgpp8ewkkox7zy7i',
                flowInterfaceNamespace: 'iiqlknihv9rbp76rc5i6j80n65rpxqnlp56a3b39oor07qff8joww57s82wf2tzi29bo6em0pu2x43qbx75iwwf540g9k8w4qmslsrz6jg03htp2cofe3pvkdvmaajx1jcf32x5hcnfhz5dx6cjds5cianzn7w10',
                parameterGroup: 'vt2atxozlpj84euc22lsda2gane23jwz0s0ubun40gr5llwi38vdrj3n3hfskpwxmvhlauqfq10tt3yheuangs6gnkb5q1v2s45dwof9c9mc0d2jqnjhkm47f0pxln1i8d2wafqbcpn1imo0egk9wt4h1ats4g60bzza4nripw2nqm2wwyg4ijtf5ztouv6gxyqucx0rzpvoc8pdjf662qhh8g8i52dqmb0b6kj08lg3qja7st3nfcdqdd7ufv1',
                name: 'xloepx2x8eof5avf6q3uo0j6q5snulbt9qpdku74xzhjvj8jrapwrzfl2y47xwjm2ud0qet9hkpuljlc33zu9mdxhczq3chq26g232yyzh4dsk787zxxjqjorw0uoup52nl2rp4mhw1eoub3smf9r5eisns89st0426zhiutipsl7vnjdp3w0avukdryapi4zb79twns482c34un02sbn2ib6kkbiddltg9qy80jrd7akrdksqyuyuu3fpn2na6urrwrd159cgx9omvoo3z8vbhnn2fmuo55dxf8803ez6do45q5qb6gh7ju04rkuqd5',
                parameterName: '89v11qajkveq68mgqeuet6whc3fen2khbimidgzbmae8v7pgf2qfq2fdypg3edb9xys0oy1a0q2rcwxr42uuftu0asn4qlbrdflp2tmb8vq9aq3p068t5qbvvdoima82nkbyenlldurria9tv1k552fut47adr323jh9mz9943ttdma4wls5cxofjicuupl6cnb272b7msol1b9hqgzws7pm3s1y4yffkb9zvtrc9wi3r9g6f5g9htrawptwndm3uwpyldsu2z5ej5iqovrs2b5b9d76sqy4beach6vqy3utt5u28atj8fn9yml81dju',
                parameterValue: '9unixtkiellri6kwy1b2rk913mjafiyawu04smfybm1txe46ib8uhipey5f3hkylaprkny0ctipkv5jhf4xvf41g79iref4cl2norvkybtdylbjr0tcn050unws0a0cui14u02txu5qbi6h5gcil4vdi4ek6sn23xay6q90w0cs86vwgfvksbw1706shntj045o7brezp46s2vjqbd1msuc4apoa9c0j610p1cpg6bl90kh0a76oxeroe3p9m1cewi3goas9vxmyyqz9nkh76djulv0yz3luf6ayijmc0updkbw2d63g5199ga9p8a5b7ah7as5hgyd5q11ryjotcio4ekbzwmax5iahvndynszedqdo5xnzw6emn1j6rt1q00npr9firjdsdo9zla4sozepg6em3be50y5jagr49h698307vqglgd68n733npj979pmcgnd3az4r86y03nip9g22bmt4455tyv1oiqjxigo6tgctux9bnbww35u50fme0jtko7py5neqbsr652ab3loy0cila6qcztni7lkbhecepxh2zl7tto0pmwnpam5zljqwyjxynqgtlz7v0j3327d0qnuvo8ekkhxwqbw3z9m9dfts2uiwii45ge2w5dcbrcscgi75q0xl3xb75340wmnbi0bww3f3lsgvfa8dyi7fxqzzs17fjaul1qz5fdoedsv4fpso4g3dp2bqe70htm30jcpuiig7qspfle0sptnya9wahnri2ei9zpdjatvgcvajbessjqtppoh3c1g766yqifjvwaa46d444lpbms8ftr429lbdo8i9ltsn4j56vol196h37f3fl0h8qlxyolf41mmfbio8q4hlw5c96yzuip4vsmnbvk4tvpf2qk42nhps44e0iog895skm1j5smgpvkyca0hky096d0jorqq8wefy58vhwiwm0mblx5g4bqyc4f4i0a1smub2uk07hpm05r9b6xjiatqhts98j3x45bc6xnsvwmdhwl8jqm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '6gfzwxy31xnq12sne3pjyxhsgq9h7ymksdw2j',
                systemName: '551m1xx8qr3wgeit673g',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '2fml1f35akjkhh8udvxig444tqd0biegljgpc9d9eeyaztfvlct0uatlwesolgjlznp8j6irmodxhpng3xn5911ewtc6whkai4hfbbutbpticccb00db091a6ec91snf75danmv5lrvdum32fvgpmwmhu5xdb52l',
                channelComponent: 'xhzj3mtwxbqzfq3pktjf7sffnivsh32uw8c164tgp395noxqufkvaysnyzke9vjcgcwj6fwdhzosozdgtl21xgnfgobsk6al0abjetibrf81e9efjrippf2hu12ykiq4ki79gy28wjytqh35meqti39ptlx0d0w2',
                channelName: '43ipapjyzpsv5os3vxj9uw8caiibwf7gvddg79y4xarm4pir94jzgc2k7c311curp75f6xgg791wglijg2o73wpfiriyox0ufjkuuckxmhziz4ubl1ertussz6i0uqvm98qtk1p6dylnoqg6r0bqb82uek9nr8bn',
                flowParty: 'lapj06c0gvnjmg6h62ywsl6w9z9kmaeoyw2vdonq6dqa2ztnh3mw36m8oer19frnxg9b0s9irez1jh07qvpm6v56s0nxfixef1aq21nn6rso7t2lu4y1dx65nlyei10md9x09qhvufidtznpathlkpekx189j7eo',
                flowComponent: 'y96lsakh6pongoa3xs89t8ytlsgriml1nhnf0z2hj9lhqwkycmaxyhc2wfyscs2j1l7fwevh75dfnxb83qnhget20syjwojlea2j82tntejhrcre7eiuqtiz96q65k976q8emdmkccdfbajbixicfgvbnljwcqrp',
                flowInterfaceName: '06pyudt1431nrs6irpkfl9f3ehiuhtg5lhl75scf4ik1h3lfe1108jrdqd9awtpkvx27kuabdd79ologijliruahq4sy4ktkkqkbfczk8jukdc5w0jw99uvqqhs67ku7lp6ghylbnqhilcfuylblr1799xk1s2st',
                flowInterfaceNamespace: 'p7g68emylplrd2pomdsudblmippy0whgr07g2ojqfcuhexc7ykmxrfya4928qd8ik34w0703c1oet5t1ee1pr0rvdnp3g652k8zrd4ebo08m3j57dvt72ncjikvaw6rsordg3rldwo4le2xdjnalaekr5o5shnyq',
                parameterGroup: 'f2la6n82661soygidkrcip3k3ktb4i49dhe6lincgtc8m6ji8bg8btrvlzolnmng6m5uxy3wl2nfrrusdfuoyjbtwpte5wlfrgtu8kblzle5404tbf0fy8ul5fjksreg4c7vy7396vyuj6i5ncsj2j97mffija20nj81ktvtt7pplyk91qe0ubw4nws6cgz4x3ex821fdrhyuzau2ioyttu2b8diwedzlyfwlvwm9ch8ipdf9ds7v1xt3k8575o',
                name: 'noo831r950ebyyn9bzwptuc6lq2u7gvtcq0s8x9v5cpxuzeffp932sysumqaquogto0o5743zee6gt69zv727oq8o5cflhvj8i33s6na9h1lu3at5njy470aau9hiutnlirdbjrlz4vjvkxxwb2cw5ouctapb1iug4mtlpie5clywkvs01ickwr1xdk0fkz9ix1griwv9ww28ku9h6c97cu0i4tlpbvgt4fhkou8u4cxikslm0me9gi3x9a8he11s7z4tl9qfvjsnp4u69nmqt2br428qxjw7cqohotsyjfva6h3q9s4lyzo1ogx12lv',
                parameterName: '23r7fag5zwkq3hrcxtmqj031uailqjnrr1jadj1v7gs3l07q0zaqjv57lfc4dhn4475g62wmdl3b0jmbk50gbm725xnki0impaa82350j0ge59vksdyokb2i47nanr1jyj68n1a6u33zfmfz2tgkr1xf2wueb9g4f2f2wjkm7xcd0vgcep9a0fh1uyfm5kwmjsed75xlrhzknqyeyzxmvsmu660vy51kxaw2rc51zs2aogp2ay06x6nd2n9fvfyvb5ucq5xehsluok8dfsnjqku357ejohak18yhj66qv0q6a9s87o88c8mtwel4tg11',
                parameterValue: '7cbsr24o5inm8qcfu7mfcbrtafeseg9bfet2er81l4td7cp0m43rtp6vdor1gex6j5hfrpxz1vxxnjzu6kejkrq3jydpyws0itjhwfxf3226jbxvulowps9qr9pj3izh0thxdw2urrv39epd8fzj1jgu3lws7h1j8uckm1r9r62mhce8ad7fnxebdqvj3k6j5h5velm7upya2rawveg916a838lqt2msfqokzflvtwijbskuebmhtqpy30nyoan0tbek0np4m3sx69s6c964tansean9ypk8d1gvapmlh789wp0l5qo4cqs2m942dtc4a668idu6d6r9w2hpwmq5n60zzfakdq9v7o2kfs7r5sf2uji5sxplq17t8nx2dshl00nabchsm4voy3av16b9904juhf66d644ljk5n6wfdz1ocd88zkwypqwb7rpy2hs8bqxelp3fq8l91ajwoisk2d0s6fe3pjh99kd1ab5jv9j1bxx4rixt0dm9bctm5lo25zspmk34w93zqmpzd9y2f1oonyqgrfctqviaaqlm26p2yi90fhcg03x6p9q1wljpie9vudscjwmhw563o1wsqvyp0qx8zxqgd55bm9pcth9vxulr0hc24lhq2yk3uhtc7adn5byvxynlwkraubbqeg047la12ovg06grk0bbrd1tsiihmyy4ass0keex2ikeas2pj0g620o47h31jd42voi0ro09hq1enjk4uhq61e7rzlr5gjr9td1x7v41159546viesctzcbzit8jr2l4w17f8v60hfu5se26u2odsf5ibf65me08g0yvgb5k7oydch5a7g161snq58n5xy2ntwp5207isi12xrurau92tb94im4xfkrxy9z0prwrzwd9j4z5znezay76szt38pev8ztfz44jj6sy4h6hr03a86lsmes893ptu8dz7kcsf0hqr06yzl1e4qmlk0100f60n1jka74dn4vo19c28r12gmfvmfnb0es2uaxu5msbbm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'frusj5l4hl1g88jd4uku',
                channelId: 'gssdgsgcwvvo65k52ssu9fyy9z07xlgdofkf1',
                channelParty: '8bwaxxhudc5243x9unvx2z7q64vy7m1crd5ex5hmns15ptmaprwz3cs07gx2xsyzvhzylecjqfvqjoaeapdt9k4sr2qk8qyfvii4pm1qx5u4lyweq10f9t0rib6y0e7aen9we2rq2bo16ezgqw80u30nu10zgxd4',
                channelComponent: '9edkwh85wawkyqzrxo1dpqy9ymueqrslwg3k4hkshvdpct6h2mwfet4hsnajim87xgza0i9lm9fdo24ym4dpvf8p3cn62j4tmxbmuxl2n4faqx94qs9cc3rpaxa7lhtxfb2h358rjqz4cu1kzi9f12h3pqe1bd8i',
                channelName: 'mjg1hhkjywgeay9uow3om0mt49lqc8wuut04h2j80hum0dqe3wb3q5y1hgwax2i2cqqng020s8uq7t62i8re9wiqyub82ubaew6oo6jewvl3koiv02bglznj89h4ud4zo7m8q4sfbkuhekpt6cowrzh58brshyvq',
                flowParty: '90obwy0cu8gtj2ffg77nj1jrgotedaskziuti5oxv5pknk0xx2ixo1qovm7wvliyhq46xct5mdiyp69wujhfhyzq7r4loo638eftdvh6xm7g4jpzylmiwwo6qib0pirsfefkc0bztnwrv6wk0xuhgrrozin7uuat',
                flowComponent: 'bbmalyxhwx987so4hf3kkznjiiyyunvuro5wproratxnid9epkjer470qv2dj725e9ecbgsbrisn2lug9uqpxaz3lx9aep7mw9ynwqwzepju3kkh3woico7ntgkk75r7g5ezkc8ndd6lao9aa4zjm6ly3w7z5brz',
                flowInterfaceName: 'oj9fyw459zfh5wwhep9841l6hwwesiezjewjdyji8db0mkfrz6qw9u22nt9jjensgwln1ua655psnzhmeixp7zpmp8eqi4ngv3m60jmxqu0ik0jhit4sszh0pztshfj4x8w48ylugr7il44dpg4qikce29xaeenz',
                flowInterfaceNamespace: 'omszys3r15ipirtrhv85ydd3nlp2pfdo0lllzbd4h2gjceamib18vzb8xx88nravg4uj9is5ou2kzj07kppwwnsyp5ew1apk7au7l5yt1kz3mzvsw2oiqi6246xj2ya0zokjyy2jteipabbdhdb7sl37daovd8vu',
                parameterGroup: '572pas2zj031uqfpl66xqxhjerxy05ghtt445r5ns07i9phzw1v5o31h3upvetpjt15lr5p92ldzr90rvczoixuqypg06dfs7d4imq7mcmf5xmux9p75r3kjn5424emt96mkr4vj6bl0h7nl9a2lensehrens2p7m9o4ls7bhjavlizbgrp6mvcwff3976hcung3khwau2u4k3xakrtys2rpgdn7zhjpf4xyyvrxqkrli9lsmh5tfnwugnebv55',
                name: 'mpxdinmz6j6qtozy8y59y8jdcfre8aslv2lmrg6jj5bubqy1q0kjj0jtnunf5vznqknnqi0f4z41mtae0d0qgcna9s0vx15ufbe06uimbcfvgka5dgvqp1ofb6ojt62xbwq4oy4fxjomtj6fahmzz17ub4l785rapyu2mp4b72pkdk6ag4t23264z4bazvhxaxq1j46yynuzlmin38jlqm716ugvnv5dno10fx18xfba3hd3fx91smw00emxwi6r70mmg4dmk5fdzw2uxepbx7gyak2nx8s87i0ordtqw43f6bgshpmt6atknuh71ci6',
                parameterName: 'f2jvnzq9ysv2hjbpekjihqsg99lmnv3x6cp6ow3u9ha7danooar6ib38pbbc55b07s9og5ic63kb8rp5ku9lssge2j6lxwxyxlr9kchlqsum85stv4gfcixyq6kswitj9633etcmbyrnbf564pcutoce7ktd65p8eb0kpu97lwym3eup7nwiq0f1ofbhtu85x0h4efkkinmnjafzsx2n4iodvl7kobrroqpzj0hx0426jhsjl4jko5vpq08r74cd243ojki6fnk5o5bo5j3frc1i25602667pshioqj3i2culgcixinzjbw3ku5tn5n5',
                parameterValue: 'ywcy4cg8krup9ftx0bx3c39az3c7pfuty8oqp0a0zx25u82qoclglbh1cuw323kqk3pnjrlujqewpeaad43o9xm1ecv6vexrytfup7hdb02caivp9bwz2rpo4iek2g1i7htezl218e2unueqlwiee9howd5unock7pupqbuofioehcoeglfcxm9355uqifxu12gt5cefj6n0l5qk6hlxq6p09vw5kdb2nhmy4wddva1zc7hlnzu4s9iksnmb429s0q6j67trbhl6521ev0zyzi32j27rr6a0r9qkoha83rblw398okzh50ijjcs55xnsjsgdwrsg4zeq3ahstrulnq3w38r3ixsgbpl6dq0jzg2cz6zgpsmh8s54gb3uxsfum2rts8mshhyjmdspghstr33js89do2q80findzclyi311cnfb0z964n7l1zasgzr2nmp0i8vzuzmhwg4nx96h8r0prfs5s2u8sk3ozcdvsgxo0wev2mgvxa80ku441b059e1ympxsd12up50j2d6k376kx6ncnigppk5xjoxjlhgpwjw11cxgv7e00r2c68a2f55ui3w9k9b7rbkgzt1z2xrf50ylo62ui65vivopxwbpykf6k667oyrtvvqzlv5o2so01925rgmpxggst845k7kxu0ks7zo3ee1fgtvqr6u5dr12r67qo9f1ylrnbqesoh0xzzqjzyzeac7lqgux85dzpvl288140ssilfz69k9zc6elmr0zsq22xarrg2xanl3q5ebv9g5esim3esfg92vptacdt1uhwjz90jwzeirle8jzpryrgoh3fnlpbp07o4w64m4ygg8p6unvtgj00arlx2db67k8zv72k59mlwtdohx0xqkzztpsf1iphrlz4msjou8ndb0txygrtyxul0c0unai1z0858flsduugo7vfzvhcs97x9ms6imigcwxvu0nge3vsuvgoww8tqn3z628ctvow0ydi3luqwzkr0dqk00b2jsda54lb03bhe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: '3gjkqoeeh9red1oj79smi',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'gl0jgp69zqslywvvoiz87whce63cgza892atfn3rkef8ltemyhbivti7y8neebwb1udxic3aisq9z2qc9pod72k2i9vpbi6fswelk80e82obmhmk6ae96c3bd724dr2r00k33tqvhtub13xfmlvyohgbn1ii3kn9',
                channelComponent: 'u50bxd5fwc64bvcxz6au8fx6w79tas8qeiovm5tdbxdikkztmw9s4k5fn709t2vqfr2fa3l54f5acsis1z5loylaqeb8pk11ieq31cjtc64yjdxkah2c6czpxz9zmjpwr8wwylpx6f201uy72jwp6eerk61g9i8i',
                channelName: '3e0pm6d3at1krz0y6hpij5rnyf1lwp7lwfneutygb2xguw0vfn65tjzieih8oe99o9e8462o6ychcu0581eyyhluvpetcrsedce1pb03q07ig70o3zv7glfxsyn5q2kdzhsasksef6m60mr2ect9wpuefoukypmj',
                flowParty: 'whxdbu551mm93s2xq06nh7ut0a8ly0v18ezmy6cfs7tj3s43dtkbr3bwl5ddtixp2w9scy7oo7e541fpcju1q0akwq22z8bdhmrg05u6cl66j1md9xii56rqlr2xsgjc7yzj9096bmn0s0lckfyngg7bw6jz419q',
                flowComponent: '6ncswsfvj7pe7xiurxsiqr4kl42w9s8y6myihinje5262w8vltmqrachkkjsb4chufkokjhfgptxb3bvd94576ti8rfmfmlbxexu4cqzs50jmjsgjdiox5jqc8hdm1mp8egv37ye5ro1cpfuuhod6qxzkvxp0afv',
                flowInterfaceName: 'weg715cc1sz40anwndbomfkhfqq23lirza9nk2icjlkkj3cnfqzhdieondi9o4p48dgpfxdjiyi36rttd2lv8flxl6w69enhf5e0rmnbc360ucm833dqckp7rr7fh7972zfgjkkni2ssbdsmayy57ax5mcty43bd',
                flowInterfaceNamespace: 'l6qup9yxuftr1evcb4fhvzwq3tv16hwmyix3del903nujondiju9dl5evof31j0z9fvluflur18gter6te6hvewqh4u595k29h5i1kfdohcsasjxay943vgqoeh1k07v3xxdmpovtmppzkhi0uydafcackpd1klg',
                parameterGroup: 'ip3qeycwjizgwwd1nedgciqepgpxrwp255u1ornr55byo8epp9aa23ma07olh2hu04n56sbhryfal526mjf99009kkdgqhkzaid45wfxpycqtwxj8a1egucj9ffe3p4bizugn468t3hzqzs6hl9n45z3nsu146lkl5ox9brfjezdh4uburtid045g3hy09knuae2y8skmdsd2lm9qep4phr0bgpwo9g0e6zfz8di6vl8dqiy47fl5o9f6tkxvnz',
                name: 'kndfw206940idovqsde3uvp0lqb6v1ppaeh8arjild9qbp80bdsx7v6epd8loy57vzbffu89kcd9x9jt2u8u608k92xolmvplvkoh5xspvlhvy3msta3s9ma0l5smwv084f4485uutw3lc3cllyjchwv50v3q6hvgjsldbf852lin9a77qq8nj8sau7nuuivmim5ff188vujrpbzgjvys71iff0nhl6vihu9w7ksiidign5ydw698f919d581kvgy7a4ysd7e2wad6sgqjdmyq4kvkor41eodnfdycdrubqbiwdgnxi8glmh9tcx2m18',
                parameterName: 'n018bcfiglct91o36rmy77o252gw3zhllwe28jxay6oo8n9gf804ciwnd56go7gwv7vgehm1k1qh8e3md7bzj2q84oudj558hbv5yps0xlyy99h6b6h8wt476fvchic6n33mwms1zvu7fhbww9tge6j1xcnye97iszf7t3x0fn5131qedkd2rfyhqn499zmneolymcjn6y9uav1wbikbnbs3wnak57kiyz2jk81nkik6nn3x2zzbjv7qthipzxm7ce392y6u1w2nyke6aa6whi3yzi37kqk5fie8p2itkxzjzli9uqmjdbzapi8ue3xx',
                parameterValue: 'xej7b8hn5mgtpyfi00avjzstpepstptc4acq6924ttvz8e3ru7twhlqmcevnoluejndcli60bel9gutmp6jkoqfgawbyzqjb63kkrdb6fuuzmbuinv3goc21ckfbg3b1qqrj19cd50zmrwmtqt8duhqtwp3zdo291o09civv35zgdj0gxu99f5tasg7kdnn040oez6s7x7k1cj0evs0f07o1eji2uzki0suzbmenkmohltnjfi4y44ibi069w34std5j84j2irw5ih44mzcalczcxndboqjix8obb8wbuhnawqeajfqhb8jsk4dj1vf3hjcean5l0qyr7ip1zhxc76js2b5zyfu1kpfbhuzp1trxtleorf9obqosv0tqyi08ckm0pe5t6r5ictkxw9xw3fiykkk1y3agmeb6ji5lgmrw8l20om8hc4lagzg99e9mc6n3q2rk5xfxuuy1i25baii93dx7rgx5f0t68cu17t6lfx649burv2xfgff6i6w9aio6klk5y2j79kxkxs6rw18gpzm8oyta3wij5nt4e69nfz2u5afnovws2brhih65s36z664zq5qnldnm6gwxk4lcnvxp4okphs5rn44nk7sr0p4ihcpyx19p5bd181dj52b6tv3gnjdt0vk8bkl6ndy4jhq03zp491e0n2sqsm7o866ogqq59tuifvhnwwgoykosr1epngnof39tn86rsv30ra7u3b9lr9dk5yzcs5igoey81hluryftxzmwzp3nbr9ukhb991xm75b41js3h8osivcq4vjxfvnzrqseizut578b642zq7z5b5591kvhu6mysf8uoszv13274gjx23jjkpj45oamlfzh2w5hx46xolw0jzzj0yxgo4xlwda2kpjgn6haiqqgr5lbkfga43i03uw38vp1ddhcmm1c6fcxvycnlj905kwribixk9jwq8of91cqsh8c87qgu1nd1m5s5at7y26zpj5hlgsaejw48emp9ieuhokb6es18az',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'grs8ty8ju3v2apoatbvd',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'r8vs4q6x65uqyyq2xrf0n5iz6t4r3rvyw8r1vwbyyviyo74hhp1abdsi4x76sg28bdcxlmx4hqizj2oul0fg3rpwerxlhbljryrdpeqw7epchwded9mrsm6dtmqfy8wapum1bgw7j6zjnrqo4lxqxwyr0zy7n6gbf',
                channelComponent: 'ivjpuq8udmeszd4okfw37pki4hc13tiu67i75d1c50jgns5cg47mx6hz0wj4nn2pd8mzre7b04attniatzyws1wd8fxjcdceieckqoreoy7fapnl087ei3z7pae26tshvrazxz7tgenddbv7i432958uu2kaoswb',
                channelName: 'jlc1e3843xizx4oork04p5xcknd0c9l1qj1dqr1n8vq0rfqhbxbxz3ifov97hwvjxob95vfqi5vul5npyon1ejgr8wozalirj8c7ah8zfjb6ftq3n1m8om4augukoihhz0sed9h81s0xasthygfacvu9zb53snex',
                flowParty: '2dfpwzmoqtck30c0ana8bufzfaqpzs7o4tncos3jmzjno1u0o9zw4jlbud32rrvx1c9xtfy2oz1nausbtiqzsis608jvpz0l2v15wlxsgukz67gdwu4ns3lbpxs07t37bhmr3e9v8ggu5kzhexlrkuwg6q9upmpr',
                flowComponent: 'uqapwju1xmz40492gfchh8nunhovpetdvvf33dry9f95zwi52o28tjibl4a5c5vfwdwppbpnkry19m3n6095jhqzcb7rwsrkvgi6myoqkz6ivd779fl5aoxsafxc39aw6isd7s8cbw791wdwane6p8crh2cnzloh',
                flowInterfaceName: 'dy0irjpqvt075t7knmz2i0n0bfkpq705gj67tizxmt78lw2alcz1f22jj1nm8rlyqebnnnqhqwzzrmpk7eerkll1z3pqrcnm7wolsv22pk33mzctuj9gumftqc6vkf1q9c21j9hb58wwqi7vsbsahj288z6thpjw',
                flowInterfaceNamespace: 'ek019c9aq6wl3ie0u81ah94so21t3rfksvooa83d8u5lh5u52therdjnpxa9012aus9b8gaj1kqfinkj0lyuv5qjjj2ppx7zc9lh8dzbb1b8qppl6o7dte5nbpu9dcwasal6l5nqshbqqtdrzjk97lz04011toyk',
                parameterGroup: 'lm7nvxfvjc0kc4ervwcu3ji6xr1ztah1cti3kfuqhndtc9tk7uhc5sxjx2m50q1r80krf6dw91abqyo7whx3fecvxjcemqjv75wv332ryvjlzffexbfhvxh1hvy0spimi8177paxm156ki6fgfxaz27mj9rnwlv50in0ykf3qspkfzms6te1ft405h2aup68t7w7k7odp4nv02dcpn94ucyf4sn6x98zvgalwslwfh2tm4wdnbmxxzukmnaa9le',
                name: 'wyr1yfc241yjye16auvp1cyizsc2tff0bofss3id20btn5xthxuehljbrik1a9vr39m64hqip69z7jghm2z10cr4cxdusbjh09e37142mytqel92hvodlka103cinqfg7b1a8sa7cnhicq2vs94ixowd6gs0wywq3ywp38apvrd0z81mhdumqg67k6tacbn8707s41asf8wd2darrxwjxodm9i1zmipfpj6tsf2b237ql6ixovm8jpvv9shcj5hay0aufiie5n0bjy91kn00n8ggk4eptmuvx8m1n5m7akql84z98kac1s26fzuzbk3r',
                parameterName: 'y6s3nl91to8doo0b3a7gc0th5ox4udh4r0ik3sgc5au3p7ktcrl5mkjd4xsa19tjxtahiv7ff2vjxrviobvapqr97zwrihourey35yun5goqplvmwo07vperdydxo9hqfzh7iz2r0r3crbaw53nd02mbcff1zczeto94e9o0zphrjg7sp5s4twsdc9zjdatrfbjxupdh7mhdfv9gu8u0lp696dr8iu2la7kfq5wxny4d5bdvdm7zs4jzxa34eszdww22aj650r6j95blzo9yp5rkocsm0ira7240c8q5n4avthlqoet6m6o643biul4g',
                parameterValue: 'i4a1tb2kwc8vgfgfrb7lzkr2k3fo2o1dqoaa0b29mqtlh74odscyemob74degkeh2ha6306g2wyw3abh61xoxfphpy9y6yk2rdus8wkp8vk6naajtqcfrl5oufg509zahuqbxxg7owvdngsp14dz7xrn9dew4arjs2dsa6mpn0g9r3pffxvwjnguqm2zcsq3u5tjrk3k4htwjv5ck89ahp4hylufa3kv3tgirs07jsgk56tl0pk6kxnyneza6ndqofify7pjmbz2b7juwx47mic2z6xdvis6ycgg62naon9fw0oh78fw3w4zdd9lmfdzhrb0gcnoqft722t5mcybiq5o3szym64notxf5iiw69uzl7qob5kn9yccrc1zefnt7cnvd458cc9xpekrvaorct2m6p9j2t880sz6rww6ejur0qb0kxen0ne8jqxdtzf16umvc02bc6iszdysfjv22bzuc9q49b2ho1bq0m64gcpqto8ovlfug2b40awszwgxfnk93smj0cc32qqgru78ckd7r425lna7g3vh8r9spsxl1g4lysmn8kka6byr61huzns2bpp0vz9o2g1qceahkybwp30dp1njbxycb3i2fgfid9gedjb6mc0m2vftp224hyiy5quzixhv35k19vw9bkchfmn521e24k3wh16jwxi3ggj1igbo801sf163xife1plexywnlbf01xkxb22r1koghtqre50iiwlltplu6gv4rg8bkl1tuoo5o1q8k78w8xtan0dhzvpqdbri2fmyfk80em3zckmlh3arye7kk8zyeyviiigk9zg8fgmmihp3khxeqiw6xfvyiyinp3pbb39l4tvd59m7el5xspdmxs3fbyysk6ut35jabrihe7xkofh7ppcmb86aa4bsswqcyksmui96l6rdic80zmqggaxqfqxeim1oosgkhs6yq9o2wuw084jhnk6403gld0dnwijoablw135for3fx2h06phpvstnkrzl6jwokxcjig1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: '2hays8430dry44lu7yit',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'qidlokl3pr9tc9dgjqc8x0qqhqd6vjdfspla5hishnf41qhcaavt1v3rzd6jnqikysa0mnfaghtgygrcwdvqmk9u83no7mzovm7mmqi4p5tmh6muh85djuc8cn9jqtpp6s2kp4x1eq17ppga817gxayf2dak92nj',
                channelComponent: 'l4aoosu05hzg5a8i35jgdib78tv75suvzfhs4nqam8ll2sdlddep93od500ikw9w3m0sw6lc8p1fyv753qrv2gcglq1fgrrc6c7qwyrhexy4voifcmerqgmm2i25ngymuuv9xabgql9ze9r1bdq6fpg86qbhfi4qp',
                channelName: 'yal2mteat18o75ny1ztz8obyclrn6x9trq47seolpk1c5h86kl9c7kc9pcc2dmdxb4pfjtfo1ykuz2ty4vspae9oyae2uiqke8occy9qcvgb9693m67d6l8gwjbro85t222yxplafr1r2a94gx7nqmqok89ef4s0',
                flowParty: 'dwdjfyzeh9o31zco6u8w3rwlfr8xvwpjupslaroh87i2uqh7gyj26e3gjfa3qf6dtbj9rfhptt8847b407njtdey5jfcbbqz4zxovz06g991dknxyiprpdrob8kro59y1qr8sc9ihs7smeofovcd6gy2on2u4e36',
                flowComponent: '67x15f5ymiyy73qalqq3pldj5yqwfswgib849nqm0u6xuf9uq2famdsf6our20opl1a0euhlspunc9gwima8o1f0aa65jxpdi679g00jg74lmqu7ceiax2sfmdkjdnk885x54bxhdklfxsuyk6jwadrjvoowkf7m',
                flowInterfaceName: 'shmyfyexl5w3o298z5vdsz9gf1imafc2hxb6csadhzxlhfm4pjgdihz1nralcfeopkq3rq1d2o8ujqfo428za2qnsyk2ga3vahv4e26ynhh91gw4ult6txhua6pr7ccsj721falqt8lqmn2gc4rix8hchgr7rnr5',
                flowInterfaceNamespace: 'cxfpjcs3jwvsky6smzknffcsgu6u674q8qmuiqiq54dt5ke952txb26hkqqxden2x1803ulx1g0m3smut93kf6bckbgzzlaoiqnmgrvxb07slijme0jhme0mu379oq7c18pi3msfd3f3qavwrdi1vda6ckw3od1k',
                parameterGroup: 'mstkg13ugucrqunnwfs68aaok1cfg7pr5q18ku53cj1zhqoaf0w1krpm396k1hlxdny6nkr8vk4k7cvsvxlxd4w2ibrg6a2fbatmh4m8tss1tdc9k2a12xnoe02s3decp8w1p38xvzx31wut8x5o57k57xvxs6yx9ak59k91hxi3wylyp4zvff4vop2y2mkd2note2yfjdvqzj4qfjz74y7meo2ykr0px5a8sz45fix57yvjxkm70ygpnn7toav',
                name: 'os0b6s6lqbw4nshgw0mho0exjvahu466pr0b6wji7p2qew11wm6rfu23iljpkzvkijwd4h6y45xv1cmib2qw2199z8bg7djfut6ycokhoc3vfebb2x0bit6paldkue3lr7fnjhn1aam59hz9a28q43p9aa8fq63xgem03zoq2znk3oz3fu5n2al4isb6l7lhihy76ffoi4uzi6e4x6waqc086vj9bh0pzqri7nneus7246wha8m64pg19jkhx2mem7wv56tikvqjbbin08ogs17g1nf14vgiobkqtrve6bc1jzuyvw6a3pouvh6pj9p8',
                parameterName: 'x5zoww0a6aa6ecm29mpbuvr6abrsvcxgvbthrqy5669rntisj0wgp8haxhksm5eyzh9emu40b4527u9zcjhkmg80h554p56l4f46slkglp94te0p26s109p6yvsyrphbegtd1xtfvxjkidt67r3y8fzlzpt2eg2xpyoqsecgc12sduo87kg80aqkma86fixn8uijaugljdypwciryk03dduiam3fv0br05g3599b9sl07ms6rjfyihzl5n2k0yr573beh10l98gm6n1x885i3pd68mop18n3bzebyrkp85kkrqaqdfoi06j83ipu0wnc',
                parameterValue: '2mgs1wzp5sacjob2dqv6qz132oj01p6xsgd42t7uc9kazkoqi38hz0mgtskrqtl0oy0y53tg1y6v6ydbuvnig58f8hjqfz6yw0e4cj5757gmrqyji8a0l739zgwtartwkv1zzabhsvtzzmhwpsxii8vp1az6n89aun4sfi0slu64vq3iymtq8fqc034gar0o4o8zgb9tdxp1lpgbqsmm666ts56bjl629y03ezcc8n3ns2ydf4ywtcef1azl1syaznkorpe8u81emcmx5aoe4xpnq6q5vtzsizusuzrlxhblku9ljoclkimhibjimvjyr39zb8jtoq8e7nto4nlvjm26hjvqd2kgku1yu8olwh17b4awr7mkidwlahk7ihf7chlawrnjj2i6mxq7cudaw9d331xyr6pwvcyc86z8hqnxoadl7c31wzqy68t9kiyekle8jvbc99t885bihd8mzcefkzeympkeechpd5r4wixd04gaqmbkxce2jdn0pgpv6fme495i86hnllrdtv5s0jsodiiavdpy3cwjlmhw0191w9ovogd0o2j73dy92vq3uxxiuea45olng50ezy73ckblck4iks6lzd6vbkhdoccpybyzgcxrbl8rphucqx4j7b0c3mzzr6crzdlcorpaqds42gle6zqhtfc7s47755vpnlmiawrqt5mdssu2xs537xkk0tiftsvjq2rxlbb4rib7h8vnuevwo7hkucmj80c3myl0r5pa25oov32shd6puv1sryyere313okqfgaj8j0hc8oe6x384m34vk8o42uzdcz2jlarn87lgrhrpurvskt4wwh08esa8vdyyqrwaz8e6tm3k5x0kzymyod0mrbkk8bqj1il9srdom714fokbeg9wx7l7ms7q4qf4rqij4bdowho907bxu8hmjtf8x3kxg5z6unoovms3zxs2ncw0y64jyq556qha4kmpi98iqs17pzfaoueuq7uqk2065m1l7zm563iazp1o9eao6z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'tno1zeslfxc8hhn3uwuo',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '011ptwbb6y8ugx9hfgqveaww8oh9km449m9z6uc3oytbjc40o5to0g4w9rrpgpr7lz52po3m290ul5pzt7gce24oei61khgxm24q62mh2e8uh3x6q9ap7ebcjorqnhoseefxtylcho2bzq50iiinsyr6zdo49rg3',
                channelComponent: 'scjpi1iw6dsxoq2k5cnut3cj7wu0qu64rlx0zha249le4tfywj71hf6ljap3pmzjrwio6je36km8r3sn6wmy9d7fpy25aoqmqekvv09hj2otzvxszm3xw2cmqoio5c0verzkn0jajxx7c2ou2c9cyyk3f8urw956',
                channelName: 'ndy1ha9d7gy36nw6db658btgtkhv1oytx9wls8ydth2imf4agmodee3ffzh5lrla0kca1xgg354nj5lw1ci36rbxmbwohz7odiqo7yi0m64tzhllmedis9zg7pbx4318i6uwwklpd2j767cerl5dkm1vtw7ogjeff',
                flowParty: 'sjw16v0kji7mgdr8611gvzjn52rj8cc9xndndk0f84vncokddk11y8xg004oopf684wruefrlym5794tzu4oowt73cmjvh1hrz938m6y2b164t6r533fdq1uvjik6bqc8c1k4wte0n2cy6a0uqpg4af6b2da1hsv',
                flowComponent: 'adjfqdtt5mlyvjzsvdamm97t9xffun3r2vutwlfqux3a1lh92jr4nan1oq417avifktv52e8shi6ot7mnmkqpkysptchbhtsqcu6h037c3ofngor1enx6g6yyqwu3xnjo5zldllu3m3y5m5dt8fte7ka4ok277ru',
                flowInterfaceName: '6w4vxewvn9163fchrbfy9wroweddxyey6jfj7t746lw4zwutwla6ciujere3hv3j25eeqonriyefiubyjbii89ayrg7mowi9lqy64qcorymjpwnjw9i3b3hu722thz73tczhtf0hacc8mg74cd2cc0d97yo1ufxy',
                flowInterfaceNamespace: '3oprogeuilte84w1o0f9pd0envsp515bbfh79jpmvu4t11qlpltnc0qp0vult90sezk9fwjoy4i0kfjn10yjmuthpjdju46xbl85bnhi50xmzahkdiee9tzokxy8l1hplxyouv4nhc8xfhjd6ukgvyluh893ev45',
                parameterGroup: 'ai8n57ucokxbmqjt8j1cakypx3kwvbee82i2ztfvjuyhyiaycqo8c702gylxcdrudtyrbrewr3srbl6yngyg2o0yzaz0woobvi2pswehxq7crwfaj1vnkf1ohrkv17vqt12bcptxi7ufb3sdseqljq2r7p9j4bxp6hd68f9btfhzugr8ffvdl4m27i8bp9v3jglgza97ilxrfinub6full57ounoxf10bfvwjcv1tav729jj0e201ulbj3qo2lh',
                name: 'fwtg0embob21693cgbtiirw85whtdsn05yf1l2bdv1rat8iwoz1vt9vpsankc4ah6uowvj3an51oyztyhj4upk9df53n1ydvagmk44q0fpt1furb7nxi96slnw7fhxo19fn2agwpwu5527anlzsx9mcq43m4owdthvmy2qbycdck3k01w5k55ft1bsqhrlpgs83iqbrdibbimvwe4a9i7shkslcvtzfgmwb7sodiepmrko0na3cxl4pwqtedvcctejxwswvtnoczcorhwl51fowdhjks7bchudw0v22d4q6gzhtosov7nrhhz0nwo3f3',
                parameterName: 'rg4dvem8u1kyf9wnqhjwulbksgbngxlpqj2yk1ressehgwys0jyga1vr0bxr3nhi7gcv3j67hwx4hqmzcaqzr1vnfs2pgeyaryiyg6qna7s7bdi4qqx32fkhhklg4n33ldhyigbeqayzi1to8by4zsi32p7mhzd2hmmc8npbq1ootd3vcctc1yj69hu20msxvp9ber3z9r3vp8h63i3tfcsfj8preidd5ux20rvorqi6rcp0rmg2aunr11wy8kfgh5y7sxmsdba22577espepi08vlx4ithp470wyjig8ihs8yaeneanpnpmk8hh9gxz',
                parameterValue: 'cdddo26zfc1w7grt9f419gejirn3xyf7voncz3hujobum5sca65lypcvnj7fvcn4gcft0ibsdrrqe5rdar7b59i2f917ll7mlys2017meciz9ryzjxr44411yviukz8olsavdrqk32s7p5nbfdjf7t0im8dqw905rp0ucc2uh8vax5fiiyebl04i1g4d2tgaql8rqns7ahznvt98xizmix9s9qznd96d64kobq8mhc55z6tq7ckcnwb0ljruf3dj4i3dfv2vde8mi9lrv4i6690gjjfvoapplhidjr5cxkke4ssokg0g8ou6hmtu48nof8l0b284cee6dp9nosctp0v5exlsd7tz6exy7g39rom6691ytj7ukyfhvbnb21z8jrqvxh5u0jqbzatb3sq8aq6np908vg7masw2vuhmb9cziu4gz9ysfnnyhhiimkjelyzrzgq31aufgztpi4yic3hxgzc7hag3uvjsqvlkb0tt09wk82eu6kmd2yk800ive76vrpwstspv2j98ulgkvlqga4ym1gz3ip8s1ni62hu7wwkmdax1wyaol34i876grbaij9ol5mqv39kx0ru1a69lz0lip3bvfonib8kryjgelnyyoxnuq2csxt41mktkkyoq32dvugpwfl79lt9wdnotkig8biuhn5gx7yt5kwfdmhnz4c6m0og9pzwlvsmub0ko75jk9jiwxidkuydf6u2amok32fx7o0mhnw27hba43fkukgbh5ifmxiqqzsobb9uwva7vrv3wms0wm3v477tfxe2vz4t5p63duuh5ly00jp0wmt7w53ca23ighgvffnrh373wwprktqs8f5ueci9zhia6qndlxrbb5oxn4jhcsa5gbsm4ya9grc4z8zhxdakenepu49ub1feulbv1ugs2vj4ybsvaig2l52lyaq0utci7zdaz20wpu5z5ptyawytw0129ua1haty85thwouy0lghd33gmds1jq51hyzs841qukkeegv489dbkvyx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'lgqopqpo5vx5p7njpqfl',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '7suijyqp3u4pstgigw88g07ax8mbz423fc60ceg7r21rx9edp4nqd8nu8kmuuudquaxfr9i63pjxht2ceguxrn9ue6shuzu853ybikojthjqo554t7ak55p5auz9n7cqsi0agqqdhjw21u0k19ba95gpvg1qs45c',
                channelComponent: 'daikcdcy8dkjkburpzqsqyc0c49g1hi6hol5jlial74tgzt54zsu10axrlc3hr1ywfz09hzeiwdesfee523ka8im3fxg6q1s45qe5zlg2keag3o6lbm7fccz4tpephri646v64idr62hosft8ifdnf5kunf0zrab',
                channelName: '2erp0hpxox4xpp9ggdbaou6uapiax1bygbg1h58ugqdffyqixemj5rttsi1znouq9kjj7uuzpq82oyegqh3t9z8uuzw13sdg6997yewsh3vn6xxxhmv6zpje4vgsp51uxwqr5a8qjop8j7omg7hf3ylycy8ia9es',
                flowParty: '4odrc3s1b0025bdz17ubhlks1cmaalgoqm2qqmesb14zxwldozo40kiv32ewgcf1azs8o4lti9njj2649hv2g46kr9723i7r0jh1pqom8z9rzxxx7l40dp0t1utzcq2ilhsm1pycoofzxpa1se66dl3t7m5v2k4wu',
                flowComponent: 'n33wlbqg7k4td5ap6wypa86k2sah1pxtmgi23mt3b7a897bt7ak55ag4zf6qu8ura1uhelwpvkm9kjw33hoqmtwp5qwop7x2b48izdm5nwpsjv65bz8lypzp9a6jnd93rwjt8pw8zadplqk75bnsvuavd1miz5qu',
                flowInterfaceName: 'wmoqps2nzv0p798hg46g1ct6fbnrd9kgiwnyl48h1hgve7sf2qqickgpj16kw119lev93b4d86tw7gki3fk3j1tf6qq5x7ven34johy6rtpg5lq2zw9ssgigdsar2b3j27oqg8wx7g935beqiks4cs18cgr5ok4c',
                flowInterfaceNamespace: 'fykbt5iztml27ie3j4oko1kbg05lzfc2bm2cry9qelih2qwnzt8739chbbgka7uqfuvek4dnwxle373su4svax9h5o1dopq186lcpsi8fu41ao6z3iy4y7flgpf1kzpht4awe2u47enzuqvphomc91o3c53zrwyt',
                parameterGroup: '4bqhylp6fv4g1id6ne03u1cbtep6gfu3e376m17fd6pflk0u0050yxuh5b3yoqea9c18a7wdbjxytkj93ay9xnxcitghnlc6mk9t1sfsfrzaqmiwfzyklg4cmfrnxx2ymuf37a6mjw4ivvvejzm73l45v31p7p9gatl2unxreja30lto2toicae2kvqluvuc6p0p6t7xsd9wfx7x6505c0lmsuoxmi95e9tx9sn0uuvajmpp9j34ok3xx9jtnpj',
                name: 'ffjbbejdi9demv0xa13hc2za0vn7kyf5olkxdlikxdcdrydwy5l40xw1m44a9gbnax1giyjp1ob57wqacb7t8qcscbjks194qt76ll31dc36nl1ut5pj33oxq62uurpb7i7qgc75kym8jpyewdlkjzlfyw2rxckigmxgq4v44s5nully81fiz07dx70b8ym1ahl669f5nx4a2zco3cvuay26vzvxtp4ax1rkz1dakx17passbj58q54arglltocqdmanct1s09oyg214ejhie2pmri6vkefvh5kq5x1os1yk1i9yn2p2ffw692qhxexe',
                parameterName: 'l05zbp4gnqn8dz7dyz2bsk8qd70pmafeelv358zxkw01jbpsmr57r1jya20ptop9menv4b6mhp24vbfgcrswcd0u49lds7cqmsy6t54z446ihgzwuy2o02kiwsw26m95grsrmnmzfom6kl44j19oktdgvsbgb82wh6mdkjljh3dgofse696vcc5sva2i0n5vijy9v4e5xkhfvcfagha33oiwkgbz17mqnpoes2f0x7p89fa0n8y3evqtosnuk814kyr7mbzi425k1rm4ejym4vrq7iafhlns9oqv5u22qef49r6tocp2hec5va0985zp',
                parameterValue: '9x4189vtj7z9u6oeak8psrhuf54u7pp4bwzbg5uic2ffqx7hjbtlrpiwv9m2h5uhsf5pey92g7jcvv74v8hhlih8qdij26nm8lz64t78q2u00uttwlbenh1r9g944sjxc14sjigntb7k868ir2lhsxouzpcbqrojsh200j94xirxp69aema7ko5jfyntfvvligrfev04m31sznwx6w8b0q8jkwg6vs3qf3m7rp0af960w3tywndyj760db0w8an4d5om7l8n50kp2m05yo1gr4f27w6q7kd4q0w9ofl5ctegmnges7erdh9ol1foegmidadjv1tjtqhcq7v85ff91c498c1fa7m5qk2116by71lshd61sjwl5fznj9enar9f9rp5nhtpcs6oetxn9kw39yby6hb8xon4mvrzb2nwa00oqscrunpot36axuc8e0g2rib8oa3618cdkck42pb1ou9u1pjj6o1t3rvbvkawfwh2xkrly1r5t1472xosju8kgse94vz52806c5xqha789wn87drsgkt70br2839n99qawxco55bwz18lk708ee15cw2lpgk7gngameikwlkemrq8d66pz4ugsrspuz78jfh1aigglt49s5c624hgd5cqsducfzf44r5i0mahr8tz6px10xmyebfnt61o6smfjabiwaq0bidz8urufh8rrd02umv3vaz0eidvxamw2lia3g4njh9aexf7b3zuj0vc1da6ijiqyppga5ba8njjlpkz0jz3y0rmykl6rq1gqak0x01wqdfsmqu1yjrkq45vmfzksmmuxcz5lfpl53n9hw4kjmbf96714ubyqb8d08db97fv2cht0t5tz5pgxys6b7ijhcywfwdwu19mcq5vnnu9hspwnij72v1ul9tcxi0f4vur61ay85jx5lidejkpxxhsn0o1t3bneq9o9v2y5m2o3hhbuw8sozkx4x9f3razu0e032l12x8yg0r1y7j07no7787v2o4aqfdfmxg4e3i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'jr8vxs2al3yrx62xa7vs',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'v0g49t6z4ds3z56ahylgi8csp4cf9ti50brd32qga31k5azftayj29334n9tlbe73ixo7j19ykk121npamu51kiadoo8eugn5lylp1fx05krvcbp8upu97uew0fgb4vs6j4gwzorqqqxghtarkx5oddxglnjd96f',
                channelComponent: 'n4g6ov88em5hg65g3ai45ueoix6fk475vo7y2apokrrdwiqa6abbhtwaba0y330q2qfhit6sk3z61fer4fug9f9zammg9plv8k9pwnrs8ilsht5bi1m5sfi1t1ken6nlmg07yozldnsuc1qkqp3dad8etlzo2lf3',
                channelName: 'hnix9bxnm9g2nqglhyradmerfj712h78u96ayh15pvnn006eicrlv9ygg8k0gk2uynqt6cgfymm9td84ednxby8uaqlj5xcqu1mbdv6qk88i9u0irxq39pqag2fqonjjl4ha4p8tdu50jg2mluy6jjce9hk46e73',
                flowParty: 'jwxoxpctzrh9apjf9qbmne1hjqvdbkfumx75y1kfjz917cxigoo4zeybrk400180l8ohe3xsuzjnyc0kzvn0br2as60uufczztcpzdqwbupmja3efor7o0vg9vykfdtofody5t3qc3l6ts3jpm4unt7pqy4fm65f',
                flowComponent: 'vukc0lvqae383nho8tp6lnhxfcoi7fbf3o1yxeo2qyjami6i01kgnwo4khoyrfj4fdg08wzvrliqwo5x8vlrcn993nw55s5gnxwx4dxif783l9bulncsx080pw74zmxpg9pozo9e7ng71g41lfhl3qfdulpnx46e9',
                flowInterfaceName: '92k2ds7xnski9t0q8g5ug1jbscjvxwfw51wff5ycueh8m834q86uzpxjpr1egfgpa5liyiqgghih152uv7yfgobd6k1rfr9rqnckut5bossscpfk04m857y7fojeu1imha2as6tjq4vvsw0svzwrnps146f8fvb3',
                flowInterfaceNamespace: 'am7t5ggp4rfg2v5rp827uyb41gvt83csm5re6waclxwd4mnuy293qc6yhe7229qpuqk54fg4cah948fe2d6xxycnu49bdubw1vgqb0tl2ixoapf3iuh5ai14nxrkxic4kbs5bra8wwn5nf2syb0lvlfwgoezysnu',
                parameterGroup: 'hj3sswdh3nvtchioprh0aebc9xb52wkfn1kn8kaysluv0awmfyfuhz0we0f64lsiz7izgod4aclo910g87nccktsog0s32vkvoc64zqbyknvfcxtjjvkwzqsyegvynrag96utol3eie3v1kyzuk7qgqyl4qutwqv3l8prj1l7wi8dn6k8sicwwgmrshmun65rzslsbvb23amamr4ey3o5xln5m3fo3g2evh390ns95y8s8h54po2qibv683wgp2',
                name: 'pk8hfg8hp3bgrk1xasp1ltb3jb7621yvks44n14zoomronz1zbdvpm8qtej2jqjs1zmdcz5z9lp0jg9x9yjeotvwktkdajaj00orcmtkycnnn10ociruq7zsmeryh01op74zd5bw0mbj9haczcjrl4ewu75cjal7txplwfs3xc5khmy100p8ex6hss7h8x2hv3gsk9txg4uzjhjst258km968a4othbc5tm74oz700ln3v3lvtqybbi3ief74382b80umou3uob0eklimcxt6dctums7vxv1cd2t5t5phnsse1xgf1015ax2sbkrsybo',
                parameterName: '8wb6z4j96vfx1o48gmqmqr1obzkopi5h6gmyst4q4nkrx78zsffs09kn6230hc5thilzkhqrrzrhfqcwbo38x6u2iaex5yjt0c1jxqd6lksav1d7mnc1rws1t1llqih9gfiyvj1l975sq0k9z8y5t6fvrfd4i2rc2q0xtd5kqsqs6haveqwkvwffszz13o6ohhfuhfgd694rk12x12o2d28y2g7po2d8b7qcbwya3hhouqx7fy0kg2djblymfou4gjaj6d6eqi8ah72huwy4g2enp8kbx1wm84wl88flkszh5to1kouj4gk53kqrbe9o',
                parameterValue: 'kknibjtvtx43ao192k7h3cv8aa34tavu1jxs6lplu1lregauw3t07qlc23zye99tjkojj9razayx4klzu8lntd7lvde0hmm68q4ik6xutzf988l1s03rwd1y78wnuimojd04bx8bllajljz1mpzruhu1jdwj8ee2wosv8tfo3301mrgweknojhljshgvvw6f7qgj527uv2zv6ek7kloa7y2j5pndv66jes6qsk7abesz5m9tqojtnza7qpsqvzaqoo41fuh10byo3jfkv5y1sdghwbuk5hi11dbst4onaszfbyees6vknmv11scbywszuqkwaq3asmdd2xp0kgthixjd1s388lp8g7s4gyzjhbwaf7xyjanhuyy3vbnw8l0e5ek3bzinkb1ugscmsongrse4qo2hhz30nsbzlf04qpm3k5kmlv50805y5bd0e9s366cq2dj4k41mryje9peiha8zrau0yafr3q00pf92f59d58p2s24tbwgt2a4dt20u3lv1rmsl2pz7zigc64d573oy2b3hh30npy9bmx9m7hg17l56yb1zbvdnibxmg8if4imf25zkgeekl7ckn7idzan2vj3ffwbqj1xdpt3txzaeg40z605jz2erpw1k3bjxtfv2qrsl2f50o7sax0jyyj729oe49w40odjlbkif1m5ox9gx0m4cn1a47s89qgzc4yxwuoguwo67spzr41srhdp4smz23thh3vkk9p4qbbe6ozn4wrvun6u9gllixx4fgbcbun0ywp3ggcf0v4rm3db16trgw19ilnjodc8o0380vns5gdprwdywwr0hlroi0a8mkdvzf9he9kuee4q6ix4e7d6tq2e2yr6ahfp48wowycl2lffc7sa1vhwm0dfuynxvpu6kbm3om9w4d191mkxqnfw4mfi6tambiaoltqekyw34iue99510amtvrh01qhb7zomqbnzk6k867c9jegjd6ekjaw65hadeezs0ltf9hdwa0e4ylywrh8d5uc3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'g0rvzrbtjxqwif2pfq98',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '9ihnut36ne05iu8ylfc0uvk9nv7g1xtqk7d99zhk871rp2c1a6z2a7yuznbz24km37pjd3b8vvgyiz7gy16hp5wfldmylyrwzywp4iudd4hbwxttl00ysd1xcunpul3l5tcmhf4t93w8kok4b04dim92o09ukle7',
                channelComponent: 'z35jwy7uk1l3s73g9o16ocdva5njg4z152vw66qjzsn8ff1axh313zixfe6rl0l9pqgloxqtm0rqdxoub3t1pz9u6k5wwzzb8y1p9fm46f9zf1b06dars5gpfukqdbf7r8zu71xx4hj0qz9adqxal3ujfij8n0d8',
                channelName: '41ukpx5gu7fl8geqzwpt41xl8imb9q3zj3wvvgunjn4dsq8la1ktuh1zvytyxckrrq99qqs3l7gnm8p6sft332bhqwuflx925sb10ydsmgpk797w63l5r8p86lewcjfk470c21koaxmids072u3hv1rvmm5yh51r',
                flowParty: 'f7l3y590a2b6v1nc03lczzk56305vu2eept70ohxdb2u96xq8b62lai1w0crha9swqpzzcdwfx5w8kql7nmi48gelssnmxy35q3umu1sgexdqjbjwsqzjv74rjeqnlmxy6449lknv6z9zv970qa7gkzdhfqml5kj',
                flowComponent: '1y6o8kcgap40al00zthk1y6epi228vnjdw3pttyqmb2blnt335v0boyhk4whlttwyged0bmt1zvb40kp2so9d92ujbhnpy7d4m2zaxhy77fftu66obae11dle6efyda3wegml3w4othfeq8b6ju7563b07c0673b',
                flowInterfaceName: '6mx4mhd4xiga2cspcrcqwal3x7pe4j3qa1hv094gutarziswp583m6pq9xexkdxa8sx4q21wxidf6m325rzkq713nwyk3b4e0ac4pmhg5d2p3wthnot3jmqjbn773co24j5hrxmcia8kt6zshouvacd0nytan0f73',
                flowInterfaceNamespace: 'gvrx8dop267381nlz4yvbq0qnwdty4s0iaygxkfjiu9xl70c3n4tfvq6fgczkd3ix4ldd2jqs3rq4nhe4fmhtx0j1bfxtbvw9crjr9p152m1op17zt46pg0eopyifi74ejn835a99rhas7hzbfruox4efb9c7iwm',
                parameterGroup: '8o0cpnlvh9fotk3kfh59o970r6ba6smt27v3cr3xlp33236iboo1jaduwdvfo8fz05kosm3wclh0hexwk1jwnm09mlqd51x1f6509vqjqpuvtgn6ipy44vmxlenjjzvphb4gq33lvjzsp3qetnniagxykturih6jyi0gnf112e1qcubmymjn8ie5pt0cv4mbr3talzgkoo05wj2r6dwwcdmo9q8pd8bm50tbwrmeb8hvhn1x966dgg1vtlnztqn',
                name: '2ojgonh7ouxuazli21e550bzhser3s94uztrpltqbdfbdc5qo9opso1uzwgc9tl2hrhfsvevtolkwys541zx3tpca53k0vt1no3of7n9bv1muq7g5ddjzeel1y1k6pwxyr77v31cg2xc1h2g0um3goevbkwwr0zlszi7uc4khiwyr7t54x92t3z4pr24h9c2qbxa06n024le7lq25kvp343w3b46uaze36cn00bznu0tg6ddax5032p3bzprviuzvefxoq5r5a20p3yhzj3fmn4mvv639h4cvzzwyuocjy3f60urm6tzo3i6q41besuk',
                parameterName: 'k130lh5v97i2fstns1pgbxyekpi8usm1el743f9ypyxwzyr57lo5nl70npyxwiqw4gq0augbtlyr94z2qwwdu52sc8ebpdv5ui72004lpurgth4py3p68t0qks25yxsfbbxs781luc4y49e24dngmtpkk8wtx97fc3j30j5xk11y6tnnpjkb025rrsns4ihpnbm61wrm2ptdewyo97u6yknkti7r2zysbmybr2rh4onbk39tqqp0xqemv1e8af56svd89907ssmazdplcpmt4q0xw82reshjjmawro5ts7vgsum8ln7z9lbdl5unuujo',
                parameterValue: '5nmqn6ztz9c3gev0iuppc6ydyx4w8jos2jgcfjjq79dqf4o7anlx1d1tby9k37vx2kq5kay6i2abnz7g9v0rn5b5nx1esan39t2lujxqauvg7bjawxj15etguwsymdeeur50jg9pc1pcpz3sus2z5pym1qifqk4jg7xr8jfo1p64uyelnz5mjqkkrbignb91id2sy1t9ydh8sekefko3mhe55au2cn3bj4nvs9g09jd4i3pvy5hdnx205ssu7n9qdzunxfjlt909sniegl7qzwsv2min5ax7uedb1ycwx3cqmzdgycz46dtxcc8i14rlf6idzgm3lljzqqr0nbc18l94dzpzturerrvvosqy0jul9amdt7837jscefpbwnb3zdl877qoyj16vxe3nkayj38lv81k7b87rn7bama2y7hgzo480c2p4xi8zhhk2uq92n1xfhqh6yb8u7f1klh4kzw710s7p32ypdmbbkxizf028wwmxhrrpbryswqtzfyyzv5vydrzpnndpras2jymg8hruzyajqdikdk2pm2r9csytotxol2rwht9fdzio79zv97o452lavj5zjge251gols1el38dyhim06mkagdvvgb9670ywf1f5sqjweg8mc6s016qfa6nm3wrqzmbhhdi2db32stwngr0qtbvgi9irztfi87ybqmjirq9w3zi6nz0qlvpj0yp57qpt66ssjsktogdxk049cjni4nt8k1l6scgv5q5k5kmcowp7mgx9c1g28ocxj7eoox3l8o97u47najxjt3z13fg41jyuo9vt4rdlbsrtcdiim468p1wfzjynpr99mry1jvexvycyval7tqxfg2auglqmr3doej5tjxs8je9vgaanaaefhi7xfhab14re7tebkuw2busshzduzig5c6e7hon5uhniotz7s6b6d0rmy6viwv785z2sy0psprkxahcw2xahbbv6u851h1gv8eqbvvkwkby0g7nf962943db7y9ca9gvnj4o0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: '7whof89mndprzx2orz42',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '2r0lcztr8rk7nhwwv6hw7dnb9phday1uq50cm6gz7txkdvxaxukkk77kuv21gz8izmqaz8udvtzbmxtozbc23a6m3f942tvzy7j4hoiqe133mnomowvwjj1p4yuxili31cykk8uduih5px6dof30907iba6ng7ja',
                channelComponent: '9zux8q601vwi86eyn52vekghk23koatbuzjx0r38xyv8apazejgmoifrun81iiqwl0pw1wzjd05gw4pg168ms3ei2o4ioeocm8fzcktmrkuk8n0768vtdnmphptpu5gwnwj4g8giwf0k8wk3h5w15iw64chywllr',
                channelName: 'mgrgwj8yakn6h51ihr9st452b70qjdcsxne6ej475wzi1f6x76a6y190220723ecdzxwkgh4dg6z5wev8splgvr66zhv6udd3rxq627jgaez16pbib277l1nrx2wzuj6l1vfr63qmi7vpolt9jql07c7p4f6c9nz',
                flowParty: 'fclzhf1nturf5nf1469tr308c3cr10uhq0cdjyy2z9og5aj1ur03eyd8uhjh926v8e36r2nfmsp1md3j4vdz3vqf35oik03sch30tsbrfwi9sh5tg0f3jknqtdfc8rd07kwujcmjsybz1ftsu72m02vfzyh9ds6x',
                flowComponent: '8xy0au3wss699813zabts1e076v1j76yk5e0ssgu0zhpnrn52wv8mm9ui9rl3hpzl669aldjrlmqkn1hf0a83zxi4r0prxd0w96263yfl8qa6kdcjfsbatfpmd4t6v7rpjk6k15ufdwjvhx3tk87hzt1bt36i3q2',
                flowInterfaceName: '434i31vscgv8so62hbx9bfdmdrt9fj12iudisdekdnlsyd31sjrwx54oo4mbqmxqby16divdmvt7qovcrtdh6fzgxhgqbq3bmvbu0bjh1gh9k9j1zeyffk3l60ik84e1ooou4p6wva66byj9e10g0jfyhn7gzz47',
                flowInterfaceNamespace: 'xen2bqxjkm8d8brqloyqqtjsozvcgdpvtpfeen7t28mxt1a0wmw7bi5icndua6qeks0ltrq8l2989grqg4y6g47qg1byffvt8096ek9lk5qgfr7arsvstymujioxkn4g41olfm03n65h1t2rhcj5o3hrfai4943ru',
                parameterGroup: 'to1xgcambpcn8x5hh6mp4qwr8m3qwt0rv1zjb9c0lbur2jlslxh2mac3w0ywbsok59uooa8gn4nun762lvvfi73gqr1i2rkpp3l6oirbynx2gbxgs9vradgkrpxdy509gw2r54rny9l0eu46cnaucloq1tkuk88sx75oeu2tta0ao0twtvres7m5kzetk0t1naan48nagvtxvi5jlzoj7fcgvjy4tc1lbvlsfbkxfecxgohgpwuovgm7tat51d1',
                name: '0bfdbziw1tf67vwwg52bn7dm20yhtp9g1p7fvor1qbwnozif9kk4dd54l8xmft8e0mn837ghvevjsbew7vc7up63f9hvaoop5gli5s9dq5ix8rbzkkej0kki99mnrzxmw4smo9cuv7ql6rhovegvybd8dkxkctu9sof5u6yomt4lc3ea1fgkg2pj5f596qkp3jshq3wiqpfwh3l88hpwnasjrkxd3dygn0f1ai4drs2crk5x7j6b7wn0k3ycw7f5i13fiaviynwacyko15s8ziasis9eourjabasulxi9ycyivflsips89c7agp9skzh',
                parameterName: 'be1kw6lumdi3ss9g4wkmlg7ct93z4bgpe5q4nfoo9qo0cab1g2f9tjvhvhpnalthebcxzabsv842snjgx8qxnv9y52wl7qxzq2ohrg34xi8yan1rrpv9c2856g0qs9rsjw67b2wn87oicdvcoi29krqpdk45tpecnjud6l73fo6ai11zhkur65v5ia3oq8f06n6zglvd5b7011izw93ryrgy05su4774t29a2xo93d626gbi3jhdc670dlg0uk7gpalgrwbrc6mkqhcnpuikqec7647rkhr9hve0ku2lsw3n6vluv1uz609wjyry9dek',
                parameterValue: 'cqcg2apzlkktx69mxzp48vdswxl5srvathie5a8gousfhad62i0rxkqssz5obs48elmmbxnuuk0g8dma8253aawg8w7hvvn50sry94jfhs0b71i1kxxe4gzrqy3iyy07u4axf517czlde5sii2qxlvqrn1sufyp2tx91c77pcrfm8cy3rsil3665yd6pip83qkfgisgz9vittv7zee6dn3csnzrden2nsauyrlqknyzd7qaqqgq0eqiyaialnji5bia3dfa24gy5jy3r4pxkzwabbqdizm8u2snng6k8o4jixxfgbtligqytiu2vy4teu92ysy5xhad3lp9q2209quig1ebd3is2wo1mdqdj049vxm0rnzcyynu7taspwi0lmac7gnljrcmmiz30qbt57nmmsw7zxtz5i9rcxouomztuosciqqkf10qznh4yfr7u6jhcx382j6y10d930snuuf1bl647qqjhg89hmsj8ec3q0jbpoj9a9ucxhrwb5mtszi9m7t9gqafatdnhxkk1cddmwsai0kg7b9rivn3azojwjk7jsjzjtd3qewbjttziflzuhskznbdgafo4bg2rf136och3unrjtgtovfxwjhckfmqopzi6f53mwklfol8j5fizee3lzf1yxxralpuzrrrjih2tul7v6mkui543f3z0ndyhw554n3mh2f3vc38n67lbq9a1f0ufnmmrypg1ru8p1dpw1ehkwgno5zjpnnfi841r6p2i6npvccqdcktsq7hqiy6tw9z1yhrgx39v54qxh67w2v8ailes9ztuwf0kanwkvcp9ul6hxg3qhr4pc6zdyuu8r8gq3l12rtoe75ux4vvavmsrjn9lc27jn7y4a0j4o97sbak19mb1wr60zn05s35nztrfdr6js6icuk19whqbiick5bjzbt9992wicn5l2jykbe9g0lnsrgpz83ouwq6xlzw8zua12zt8gkpdag84ygyoariino15oxmjzjln8v89boermdjl864',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'l568tadduf8cranys23u',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '01bsp4cmswdi0nodz5qlep1c1tl158mwfvf9k706m6dhqbiu9p1iuyf7un5vd11v4mwxdtphgiyddsihm6p3kwzrr7hhjrd893njy9co9u7q7v6koqfmmn7r7gylx9z6fsa7cpkn1y70ivoujy7xc4b7zvmwi6qq',
                channelComponent: '74cs6wwkugxr8dn6esqadg8tagvg48bxp8jrxdj8lz6snd8403qshuwfpzquf8hqdc91khurnb3mam16vy6gwtrc9t9vn68ju5f9mdjw4sdqnz5wm13u8yqrxzrzsrjesdumaks96ec0mmx7r45urn8cige1po4l',
                channelName: 'icfceh4akr3i7lbiqbg9231pvpo96o20de394u58xr0az8cerrxu0ehgojgjald6p0yxp1hb1y1jy8rjc2ytgcitk2j6ok2u26prhp4t3o3s95m1jaaa18dq0ofyp247hsrh3vwm49qrncbsg1685qfh2y0jbu88',
                flowParty: 'vabpvcfb1ov7n1bpfmrzm062b3jsj1ydpwsupocpnyin2dgwrgbqxwfn39bou4i2tqowxhr28p9f94t0be00p1eztiaohm1ivi8xqrtnbszcbswf8v3q4woh0jlvfb1co9i6jsa78dt6ejztsgnmw8u05726iquq',
                flowComponent: 'mx5tb7ns94gill2egn801fzmrk33urkrj1p24097iutk4u62nasjxqf1oi2ah0e2yg245ef1w3uqj4008hvtux7mxkmd45qimz3sive1xmkzk67c5qu0jh85lz6zir5jrm5pmmbx27ean8dje1hgnocm3eudh14a',
                flowInterfaceName: 'z5v8bi7izrkm8sbiqq1j6hd41ez7eniy7y2qb6m1igcgzoh3xmw2dpiu59qauebt9g29a29qp0y893ia9np1oeq31ru0kxrc0c354n1xsa3tyvoo24jsrl48hznpjqxsrzpnn5eni9aivldpzrvwnx4dic9u6fgx',
                flowInterfaceNamespace: 'yiwv4fx1qi9z5s4i9m8dqn6mbv4l8weao1tklys33ptf76assa0p8my81ftpf5zktqg8191l5egrq616lr0decytecnhq4bto9c3tu2o0pthhmy48qow6sakq9pslyguuhxg9aogcz9ygfvm72pzpnpdvr9oe77t',
                parameterGroup: '4j85i7lt5in9pud3sd2sssrpafoh7lhddniq6ctj3hoixc9mmjq0o57425fihvu9syr4lq3bynlcd1cbb3nk5robmpu2g4u1sbcnxgxsalo49wbnxi6x6py5h9orv9g6w82of5u9nc6e8kvnkkm8b9qw95ujpma73v2zwhxnrhwhgbm2bg933muur3edfx37rnss2vmywarlhhwegmbsdfo5bdf212w2frgmy4kfsxqt0vkiekr97t82kcvxs0f9',
                name: 'fu1wvh9is6g7kjscmlaszuhsruebz41cllcz2z6lzhpjr6ldhl4hlycx24lvkc2mf6thlx0oa1nxjmkaj09pb8emdxlysv0fswj3sd2cpifyhz56rjvfafkgh2letxlyrlwmndnryhthvzo6l7sg2al05yvc6qwefw8dx72drq6duxmnsnpuj1ia1nk5ipk681n3ixtopo4sl23p89wrzbjl60zaoy9mhgdnuvry2fg016vsq8jp4pagjb0f058zmdwv1uamx2gtba51vpmrlwuk4yn9mwhpwdmanklvx701v7hrymyaa41z98yi6eit',
                parameterName: 'quje2xy5jrxhllr69cs6jq7sapt3li9gxthsh7jic0ke1tr3icwafg55lcousjr1ynt8z1kdl27dv8tofpauk7wiyalbkbgezxymhnh3329zjxuyqeihmdsm06zky87k34xn4abkb77jot0j5hz0iiv11a0hoj4c0hj2c9pg43usi5bdizcc3vt3m0h7vn7jdczvokz7gq76lz79u1k574dty73914dj3u5zmttw73qyf3z54prv4gry5g7llpptf85z4ll4t6see8omt9phrx88ozw5ellv28j97wz0xzyduqaxig5p4ezihvh5ttf8',
                parameterValue: 'i37tdxl9uu0x0u0fefqyn0k4oyet9sjvkc1vnbuswulsuorbswep7ud1qb1j1e93lcn3zh208ddhl3sq8i6c0lwgwg0o78c2i0781r4lth1o8joyct5ffpizv4osv1eis2cpkhnat6bqnuvaaref2f85xobbqifc8wk3ofmummhemw9gz6lzux8tyrrizstitzepr4718rsbeawimagt640k0s1r6nfzwcbjrnyerxguvnikx4jfg1814tytqfujgg3p5h64k5qb5fqjrl5bv68kn26m0tlz61y0k8pmo6podn98ir9o6a2wtlrztjlfr1n8dxxqun06npebgohlugdlojvfmrffberlgcr7p65ho017a39k3rwog40zftfpx6e7fo89z1tqykuz6z0ei0mb695z50hkrxrd1k0f41oywq1megvu191r81atx7zzm1f48be75dbanagd3371cyl6cnkjyo8t0hxko6bln6dvqrxchw3uglgr7hic4kexfx7p118pi3gepy7sa352cg50qffzpahj5rin4x6i0pqthli4zmdvuelr1lziopozvk44v69vh1jo4mcrt2czdaz98okvr4t4zy5wfaeaitnb5lrxqttni38nfbbo3tdqxwxruxdafd6jstd2v27h1w3mlrkzapj8f59yhw268u621aqf9a015b7fe8yu6ri09s9bu6l680muisp62hqialin2h0swkpdhyx2w6vlx8yhu93mvk62bq4di115p2rawwund5oo58ngmw5bhcx0ajddj5zdeta3pnn4yz2pboqpyft3nxd98up26x5occke0lxtoitu2ax0h57t1szuvix9f1uij0o1vcbqo6zryjduvfibrj3qbmrgyjy5w6q1lk9wwud2pou309pqimxcqowfrsyvnb70zgph58kwkyt9a3sa7gtgmi0l5izoqxjp9s4fwxvyz3yp795biszb0kpb0dujwqpvwyp2pcl9yhi50rnuwqr4r4frnqwqoky',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'w63qmcuik71fujq5chay',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '578h1nx71vbei2c1hbvae29wh7tftee9mnq8qdfpkywo4ughlkvmnlocitlke3p9okizbedme3nv2nnjyttkpqad3zvwhirugb015hhg5r84yfbz43ury2vlmfnyp011bd6u4p2jl1zuj9z2w7s8byh3efta3eyv',
                channelComponent: '437d0jdtie4zhxtqti7yzpfvrcqcxbryvaepa215qip4x3paok4o2ne6odcr48vrdc301kwtopuh0t1db54zf2i2ihicizl2y8tyxiesyxv0lyufplfebd0mvlmgjgvdprdxbsjctcc6wuzqwo32m7y9y9qvq142',
                channelName: 'w7spigw1ut0ih3toin78fq08zoet7haa71rlnowact0ayw7rsfxbma9dix24t0e5egx2qc9wjsivlh2e6gtmeyj1vfdf7zf5598ihlckq8yhw7omwwtf9a5og7tld3yvkxxpnfounrbu3c2yesp1ok3li1az05ic',
                flowParty: 'rew6seu21xn6tnhrig2uhv8ocr1jy1s5scn4wl6eccscv3j0zrgh9mm8j5yxklq9k5gfocq2dbx8y9qr9gxk0sb4uxkgolnb3l98is9u4lwn8bbynhyhekea8y1wpejgfbj3gf9u6nbodq7sw6ybepxr563hpjla',
                flowComponent: 'qyk9iaouanj7tpnpczolnvxw6xammzd2d2y7wm7u5tvsrim3pwzrsmgsenl4kqtvupabbohq012a4keja6ulerdcnsy1majojlp1wlsw7y3bkdidx90u7gz1dd125vyqkokxidyspnit1tftb5to12hrzkaxux6d',
                flowInterfaceName: '7yqotylnt84ibi4v2sxv7x8c1e1otnbga8ihqueu1d5and8k8cl70e5ob455u174skw7eiw36e84uh1shxv5v33s2uxr31l8x9958rfx3h87ocbgwmndnfkehrf5p65lfvryriy4ild2c8504iiigvrhzdilli2s',
                flowInterfaceNamespace: 'w8my4cu6m5g4tqpb561wkqy2030otjum5bg0iuci5cori21milq603wxt2ltoqrnm95k1bmvf87ctc5fx7e227pjq889gtfemxveo91k9pwn8dc4xuamuvopbt12cuaxoiddv33jmz31bh36ecgprd57wpissi70',
                parameterGroup: 'bchawu0lgcjdnq9rt8fe2er9wijg2iygw8m12zhhlnxhorncnup8g69wguqqi6a6eqb9bnyyzgv8tpxo0s9zxoxuq7udqb7mzmtyiknlzky12yj714833k7nnmoj1x4ufdf6q9aq6h1hfs5f8jye6ueghj66z3e8a9u1lii5btuoz76odqfblwzydw5zwmvfmbdq8hm2tbwkg5t36ah48vlytai3qux19o329q5ymz2xx9efz5tn6zsujlfowar',
                name: 'mn97f9ynugfm79g12lpw64imcuopf4tt4uvjjfw846s1x5tr62i16mgqz8wymsdqz2lgbto6htdklpofwu78qsxkshb0vu0gp0zvlqakp80qc5lsmboocnk3y9dumsuf4jiztgvjt2cpxb9va8bqyt7jyphvlyf6s94l7cjpryt8fqt7wpmyjr0dcehrzzn3h5k0ufn4ambnlz0m4a66sb7tdbi0vn37apw0r8onlrm73ye36zpjn3qud87d9o1lkda27v1svc79xw9hjqcgi9oe9jvejhprvk6lgp5ayhr3kp8b2o5wek0qd1d71f29o',
                parameterName: 'swlqzpjo8zewwufkx5fdwevywenz33gxev3cxr0pverqw6w5zmjodf6xks5axs8gcs2y0nr3sw4cb6etzwzevsotsj3oefo9oaw4k0pup05leob20ueycz6saixvu0ygz36kma64w1jgp3k8uu0piu9mi1ljiuu30l95is5xumhribbe8w480wgbx06rmvjua5zlrumx1necg2zfa87z0tftrycoqymsmx9o7au72y8cmj16i02931wjvfnlaba5ef6h4wcpislmhzz011yh9yg1th0nhcgd9iszsstnvkiozj0wal0034wpbovdc68j',
                parameterValue: 'w1vv3g86rn94jbx9morpuwzw7z4crv3lb5w5znntwscy0n8653rf283lndu8tmc21dqv84pvr4rcz5wj8r2c1nt3z1ta3yrkg0dvq3tymp9luqtewkqnk7lg01bsrbbr7vcccb44k7rmi58iijm5k7s87913vy072zu2f7pkk071639dmgud3il3qbt8awp9qxjn2kz7slydizbxcj2celda9edp1ulf0uehj3z9s9nr3l1ladiccxfdqe3v6ctzw5z9b1mr5qrkxhvl7hvfc3nx62sw1jctcz42pwn74qprcdqfftq5ff6fbg95958z9y0homz9oazxe7lucsxhfjkks4dm0cqv47g9k9o4k0q4li48mxjxfy8uomsjid0acg3lo88sm2joon0vta7yxzkmqu9ehsvn9kxd5xxaghwhzn8kptzod2s1jh7cre1itscd6nb0ge92vces13xf9u17z6ebwm9i7bidabcrjev8yvp8nu9t9884n88zs7r1oni0gjdzkvqu7x0ht0wl829e2gz11estpbueor7me64wm72jdekowsdhw7ajpqecy679r6zgau816u4coy6hd07m02sd21ylawzr1ito6yr262wnimuztb46zcs5ay9kpc7bnqu8qkb2to50ckao1tvrbpi3zrcwxt3fsc4wokauos6lz1cqdfclkuenecsw9ic2dawp4dzqmljyrhha8vscppcdwk3k7rgupbpelvdpqebr8cmgc8vq1mq3z0oj92m2vlwtp6z1418p2f89xyqvup9qa6bh9a97t9v75uznviol4wom0j563dda9lfqanfg2l4a9r9pknuhtobr3aqg8tvmj0wsjoell48ozce1qzudmoi1r4lv33pz6kiii6rxl81jzz04siphuayf48eq64q1ys83yvao3h2grdikfoh5cwybi3htygns79yuv02svfhkxbbk6tv93dmhhwjl60m1vhhkz09p1wdgmn9xosi3cbtitrisrwnmsqc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: '46rz3mbc30qn336agprz',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '00sydit2txbhaqds6sfu9ckyg78sys2a10yrn5rgu6nsum7c4gv9clhbhule3tr9pak4tu5m4kg8zilo0cv2kxxipwzgzwyyobwq71fnrus92lxojpomloieq2a7u75y47e18kh6yuppbru8r9k6w1vhst9gpwh6',
                channelComponent: 'gcunbaygra0qjjrp78ell7dukmi6ldqccma4u9hpp8mj136ehh7umxbv6972u9h2xmi54o3r79g5vw1h1ch4fku4ouhpx26tivo2j960dcwhkyvlnr84pk8uxsax41i1gv88jyihwh0az6cww4st0t630nrsto0s',
                channelName: 'xxp1rt19ha6ubrhdrbcj348ljrkk41zjb6a8nq159cpgnkaj7kfx58fzoo8tuar1yknq07565cjbpzmk1tpwqrc5dks9yeq2io5rotsstg2o8htnxxkc5bj3zs9rz9sh5nqfze2fkmzh85ctz3nrs08c1lger7uk',
                flowParty: 'k3dbeuuka8yo7lauydak5nx0vl5efyujxg0lmguwol10lkc08a9ocqkudqp8g0wsjgw4oy1zcxhx4qyv6q3vgslslwrpjdhs72trqs79y53r9qy5ced148njvpdqaq8mfvhnkfrcxqsu2kv3bhsapxhz74yclerq',
                flowComponent: 'y7xll5u7rgw3yhco88h670u8fitbe8c41f6nvqfwfsjr0t6o7mgti9gbs8k86i5ms38ztlyoxay0f4c0o65b7ruvu1gpsk0fqm0yidyginu6uusjmp2q6180nlczcah387k9sprr3mkmsg73gu6lunu772n8w2sz',
                flowInterfaceName: 'k1khu1rfejjhga3fo3kbehxk1a11rdlbmrazb17hy8klydrj5kaokfzvag8ed4b952iz8vlyeqm575atiscwhz9vl61hgn5mc2buug6h3717y9oeebsecqe25cgcd531wxi5lgjxmmhalnoyjcqnmzma4xtf4ny3',
                flowInterfaceNamespace: 'n4dz4lnfor4ug734nlx5wxqj9ptrfck3drkhgw8u68a7xtokjh05qk8miyatesp5auarrv6oboxhox9s5yn8j0e6e3oha0ad79lds1ed46jhxvd5u7kywdi7an4g9w9ac93t6jc2pnosm82b4wk7owqh88y9r4eu',
                parameterGroup: 'b9a3slfuf0du8s3luikp4vgpylhe60mnrvj8dytako3kx92ma1sd6uaa1o27pekxqm4wjljzf0gsvv0m2uijm4mxgsbjnbujlvummm2dilfje54xl92mgurhf7j209vnl805nm089yshl66bbidvvwnjfrobbnjxkrtlvgpao23yag6pzqn8axl9f669k2evjuilqjs2rulti7be7sl9ybpikil3sk3hkwf93p0umdnv5yf4ped2qgnqk6s2stm',
                name: '2zyloltk5z31lcxhw0778js5t5hhg39qzc8pyw4ebcd0a1g7ghrp5dwgl7qppwvp6t273ludc3adc84272cj1vx1hy5tqbrbm7iltotrdbxkpuvpbk4nqb2sj1wgq8umgi4910eedg6gpmxxdpezfr09yamokox8p516bheclyg6o58dgshh22gg41i1osd2mxs0vesr91t7s4s5p4i0291ee5w5ggt5eppludcvjrugmyxsmt8ltf7kdkgdcmkwt0kmlblco5meizi12qqaoenwlbgfvnnzq0sk8g7vsopm9brx8ox5bnttxifhoxy4',
                parameterName: 'kcvvqpd43h5v0037vcd52unf9u9el5mlk527i9bzokmzi9eq8c9mlxgot4wg0acgx38gm4j9wf6emr74e9tg4qhbd0ubpydms1g9996zrsxfd6v77zu8xsocw3poua1scwxy4slwsk3pbp4u9czq60tntpt50hzlm6hsoehr8tglbtwlz8i6g0by8nmf8ah23399xppk733j27sjdud8565o9ixl3288n0s01vqq2zhpchl6jne1yydw1rap54gpoefafemvh4aa5rt16yafnm4hemf789f6y35yeo2nwtxkhyofv4bjje6bgl5s5aax3',
                parameterValue: '67tzhbj2g6019jghiwys2c22gyky6c9nzyrul0wcbyscsshvl43zevzrhflpgjzmlr0oyqo8xdq7peyllmh29yn8i898bz8vd9kj9n5nw5thr88q35fw2z7legrhdtuwn31rnclwex7za3m6wvubfjwc4vljsv3kszib61u6cvsaqvywv86jzjl81pqozbqpt4htah8xd94bfm9zddejfoh7y8yfiqxxm8bmvdigpho2lda8df0bwjjbvxfwi4wvccbh06kneyyx0p4l2ae35jc18rcsif86ki87rpjrjpfuu5azzrgir1rzykzv71vwmoa1y3fsxryt5bkwgmheam3kpuoir0dwsetj0uv9thgh1e73etn3qazs0jqa2m0u1e67nt7sg7na3g4pre6e4614qig5pk6fkdk4y6ed1em2tjtm8g6kweiur8gzf9i8fh5zekkl23406pi0yho5gjxdn09el0x9swparwh18usw2tdhibctudedp64h84yigyy2axsdf6v5mxw0ze7p2u3j9kwr42hm7j2qn4oiw10q9vdfjqws8h9rs2hjkblvlrigwhguaiwqnwch0cfi0kmv33brtwv7uftwaw9w8i825m3b5b5ec1pej1ycytdoj67z5gh41pnb7no1jglpun6eoioww9e8wk51kc7n5r0oob3hzqzqyrvf2cu8qtf4rn2c6gf57tky657oh8izk77gsv29x6l4cyecfqkjjeoz7oa0vghlf081pg9knj7yyi9c5ohv173vl7ux1jlh6qk23y331w2dvjkdgu7kzzfxf1dsrmeqjclne5rpu0g70puqcv5pbw5rs2pe14lt6slft8qexf6yn720w5ag47p9dfool1wh1776moi35p347hvfrx7kl381plv2jgmpb9ijgdztjm1erdosqvwja6bwmgayzyj4uurjknatgetkqxtol9wade829rnt621iw8ja2x0s3jrhor9m2u840t165187ajkoj4ginhaw98m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1023`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'g3j37cdj2isfdnz7jpyo',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'pdaxwjabxq2yb96az3zdd9tp5ar1rv1qy20vyfypwushuyp8c6qcgh3wackrhro46v655seslf3xumjiv9tdum2er3sya0uumkjowo3cpc67l0kkax2g04zr1lxc2p458t2agq3dzonpi9xjkua4gmbrn4mi2epl',
                channelComponent: 'p6996b4ygjrsn5mfgg5jcl36ex8zlmkkli15n0xfukgql4cjhb1wynfoqviaim7qdlcj1ed131xhavhe2efjnthoxu5lryq6r25n1h54n09fgrhvj3b6b5p6kobbsx8py73i38miv7a95mg9pxu9vgga2eb5ovat',
                channelName: 'lli3oxf8yicrqt7idem95i0cg2qzh9k6bbhho55imi8b8yegbtf9wh9myewr3yvzqfn47ps5uawslygghsw2b8dljk00v5nh90yfkbnk9bffgmettq83rn1dc3y34p9k8lfm5qh9ycil2lu3z3h2vsumhxpmtv7n',
                flowParty: 'ktvx7a48glguba9rb8rsm8supy4f4gf776c3z23twkd4cw55tx9gl2vuytvlzlyyjgrw9ve0v9ofo8i4xjb7u5l07eofz3o0d07rk3djfvtfdt9kotusnxn4t3e1muur5u1lit7m60swdy716ncnuoqgj1iuh3a4',
                flowComponent: 'jjdx9hbio19x40xog3g0oh13s1wjmssx2ybk0uxdznzcmumawq3pn5decd0g95bwubi5x9olmkxg6tr33s0wlz5zjsvjd8whm2s0si9iqra5hktsjx6t04od8tl0fcuhfj7ue4cznb5occy2d1km75tpa3at80u6',
                flowInterfaceName: '604eqd5ck7om51wa85djoo7nlmkp7902iysp61efe7ra6vqrm8ds9fkr3x8s7xkfzpeghjyomxrf25xjbr5noocg33iq8dup1jn1ej266jdeiyv5169r64yco5er7berxu7atep87fxm4m9lejydpg0dns6bkqvp',
                flowInterfaceNamespace: 'iyqja7xn9o4rlowbth0u82kcoqfzj5v1hk4ryrj5o95v3cjn4n4u0a24j70bfyj0bqg55d7nm3da2x2bwwcp6528iwbhr1wgym8rjdcucxbkcvr9taqs5xm53730f689hu667e3condvf1c98x0220aop39vcmrm',
                parameterGroup: '6i40vpcbawool92qoq6u48mize4q9bigy6tsjvjsunio5hp7w219xtj5hb8t34tdzj62mzxxzxsc23k3v5z9z729vu63llt46hck6f1ikt5dkqxvl719vyxl89cbou3uzbb8pmze7mwq60686jwprep8bn2wsfiqw11k6hy7i89y0yk40yb8a5ecfqozzo4w85tpgatim591gc68yb2qzs7lc8ea44n8ykubsbrtntnn3e84zmgn2v5u3nan8s8',
                name: 'b2380sw1tcu9c0lzg1uy8covn443nvd5brjiapfsaa9xwh3qq5ad7uc9yocqi52kw2qgze4msznit8bwoh8v7tkwq8i0nrzr1ye4bbm042rd9js2i7j4xoh0oaa75ibmdobzzkzdyc5xgucew8v1im4p73h9ljonsdwyhc4cp984czbs11cql9c83fyclc9g66pk6sw8e3v1yemqt8zollkuyz08n7ns09xnfcc0wiua17puhb67dl8ca0zv4ezvs77cz9tuhgdfh3u50wahsjd79x30ul4wz4c6ymt316zljiddj1k6nlsjp9ibwqwm',
                parameterName: 'mcemvzm8x2hao3vubo6hfndei8mpxjwo6haielnzsttbrk5cboosz5tzsi57n4onn34r0zstmu7mrlywuctui1y6ve1dg0cmwox0zyss9wfz1z792b1sfeaz5awiy3lwabm6f7u6bviv0hxn2yry9w6h7ifjashqx5gpcqihyo2oz8p8kaw9y4gvfq2au6plyfs4ltyiosg9srpwxbnhp9tyczvhk3xvwwux5ted8jhvylk8gr9vllwo4huqbp6t2kuxoh31tbj2mcr20rd5qu43kgbpanks381m6kp5qdhbjubbvvrhch9tf171mzvm',
                parameterValue: 'hjdc5c3y410hsmuv5rxhnjlog5vs6sa044bavlack9xoqwswvnevx1py9uqi6h875s4x9psf506l5gaw1ohw4mo4oyygi4nv12h89t7y6t1cquqt7upc0357t65wq75vhau1imja7cvyxk7255defmf1stvr5w49j9cezkea89yo7ry2vd3yad1hia7xr6tynhzhqfbjvf7wad9qwj8t97wc235mpjt6mrelieobl942o5ikkg114vv49igygfudn2czayawp8lvbj4uduesp6cz6sza882wct5b9ts5u3tjrioaws6oh9tdx103xl2h2jgox7yvhcuubx6yeh4ff7ycy7gnv7czamukuto1r6kiqdqtagloh56oseedads6qpe67il551enzz32oxojy8pc8k4pu9pfbbbagkxl00fmtgh8fbiyafrap04f9l2zj8zfitmlt2lfl4j8b8a7jo7xvm9zqk5v4i7o7u9halpeea284w6xpitio3c78s41p2av2uwz30ml8fq22gvhbjnadg53cwbgofmklv8o1tzx6fbbvzvhaanc57kxm0lza6eg9g88ibyh4p3qqjgtevfjy5lhaadrhodc4n2dmjlxjclspld1q39cdcdgf99fn02xatfszhq7he8ocu848sdqeg77vhe2lkbirfb6i8mwtki5uh9de163txaqi5qfcpewrcykhyhbx7u0kf3vf0hk7g17kse0mvrpu2ou47mlqryvunahka9y4hdd08lynmkz7ispdx5a4q1uu5neklujv9fqpnflax8qqycssbse3ay0g8pl0w0jet48pjiwtebuc1u2nrkmlczr59f9lxtyhj212fjwlpkgklw4tno9nkhc1u3fczbvif1lwfrv64cy490l5w9vhmb9k5ct3ogdk8ct0ayhh0n69cd8dkasesyjn6mi1gfhpg9jz5kzkr061itsp3yc13e7bixu6ofi6ulwxnemjhlaxmrg3y2t3u82ifh4p30e7em9x3qq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1023');
            });
    });
    

    

    

    

    

    

    it(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'b7ghfzimr1qdhbtb52st',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: '4pda79ouqg5p7qci3s3lfhjwanph9zxdvdqs5csjncouxra7u5wafu4ansnzrij8jgh498rj202caor4xjwgc6pywz3el15koyaexupjq79qdvsr514txfvepqx4703xeqf8v9mby2yz1w65nq25hq06mhy23cm8',
                channelComponent: 'r8ky360vdjzm1uzrz6lolwdd0q0d6xal78bex9snd6gdluonl0j3t85n8kbp7x8tkf6oz6t08hnzvo2tn5mkvw72p325z7upl4u7l9wywfke6s2x98vm7myk4pgvlpl12zgjvk2savlw0qxu38mra6ytng7er2rh',
                channelName: 'or9isxawz2kuwkf7mkmiperczmfwi8h545eyqw1aa3d0fxn3p2e2184q7wtiyyonmnevxigcvqjov8vpfwipye7nvupbjs7ty6glfdjzbuhi4cboa97ps7t017vopkxihav75wghlng5zcxn1zyyjwdk0gv9q8u5',
                flowParty: 'pwq5n45bl56a5lzlbkxyte080vr0rtmx0elju46wxff13b4bbryjaqrhixugckiwkh77tlxat8pimqehr7l8x2a3dc5ws5s7hymvvq11f6fyxhunul1qnv9h8kon4z6f0sqlfg164jxj515xnfhxwwtid1uot73z',
                flowComponent: 'rpxalw3gmhrmxa7qqrv8fbx5ejjegw11g8vrzlq12ioqu7gfbl1yp92rrdr5c5v928l2sq0otyfkd7979lvcij3yweo9mrhcl94yhb2c005b5k9nqtj9kyvvhhxkov4liqq4k964r89oworseh5qm9sbkfmpjloj',
                flowInterfaceName: 'xz58g8ibt9in3fz150d25u53cnkuped3j5c1vj93wafnyk4e2bu3zbfsdtcfbixlkfey33lfahajzekqvzw7o5xrdqi1966qihyqkpar0t3fwwzg2t6e799cjdk6pukoilas4du0omiuvzykhwysogruk75ucul1',
                flowInterfaceNamespace: 'bhb5k2cjcsdv3xcmlalybg03uxso3cd2bxdu1aezpoggmadm5k5rfh7ju8480f7rjo05exoc3x8ekwdx4h9rwxdz8kx569bvih7t90fef1iy3p643lrp3twt0o9fsfunozl951fpq2o6t4r5grorxvervua6amtm',
                parameterGroup: '2fub63hvfvk7upmapwwu7vqt0vd3rxz9r04urptsj4oq72igfszx5999ve4stxyu4u6cjaqnj9m475bn5frsatvetjw1swy4pzjagj8elvbms3s2mh8ksw28b39lojp6qhv33avb63cxulzt6tydog5flxf76uxarzfvqe9r63ozd2upqgu8g8siu7tcwhrl2ejoc7lr6l9c5zjwqo00gy6l1z108luum148zhk7l30ikwv7wicx62550btds73',
                name: 'zd23yteh0ig2o8q35w8ajhvaqe33gjmqdqf19dxd13xl4ke9va2jz4n4tbja5bqny3aush082vq8rk92idz4f3stwv2zxvxrfweqocby4ee60nvdvg7ecmhuj7vpxycjfntvcnsm181wz5ywe69tjf2mldtftbfsyoxyb0khrh55c5t8kaylxble17zw21s7a82koj5q6i5crk208t9tb1kv3j4jqq4o8o2bszqin1x1fxod4tk95bn51g3lqhqw5t4ffzfrmevdz525x2z0almf2oyywpiqmrkltcr3eya97nklunp6e8oadcvv0bjx',
                parameterName: 'hjkyqwhvgrgge4jmlhc39dn5to5gv32ptq0sb532ydutftv7bby7f9t9etn23n09gmtkayti66dtnkzqvd08fgar5ssi34ksfmv8hyem0nw9xihpry2ja4v1mvatdleo52uo8820tyevwqjba5gle6te2jrgrloq0rlnvro3mtd9bt7wzfy910jfgla5sgax3pudlp7rm77jev9dqogxa71myeki0hv1vujqecxz248t45hmu07q4wm42unm7n3x781bwmjrv62jhm9pwawj028nt3dqg83c1hxqqe1cj37e52jxv8bt1eckahr4w9ri',
                parameterValue: '9t0k391g8zgadnvh332c9ggxqaioqd0hkgcm3jyac848yxviv206cw391ykjyvcglwb14u1rbodndosw2tii9jxo6n2z96nthwc2o2zuqlkddghpct0nhed8zs733707195nbd3yf8jipn1sl3lj471q957agqyswx1i7n5alf6p2e9vui7mnhmgy123d5uezkuz2mqne1s4p4xjnuh8jgm7mm3s110pej2qj6yo0tmx0f4r10nh0d41ydfy678c3xqloksoeecq6mh2ll3j0sqh85rhzdipked84xoystvy09kpuqvwejb4mi8266iqvwqa9sx7hwnzenv5q316yf3qx6z1gotq3fnly41vdvme409cobkkl6mxzfef1z9a053kxgavewtqf1kmjf4vf0eo720jmly5y5sn52ucbp52fl9huggisu4v7siqtguty2l9ye2xy7s0ilh5ssijfpvfrsvgl3s0g7h9t6rl6of6442932e12b0bt79flsma0mbgfedykunmm442j6lpa7c9gux2wvj38rk0618d4ty5gmnwyyjbqxl9n3s0kcm5xq5tg0omyszx59cfan84jsqpzeixuig1udve5rx953u59s9gb20d7ztder5kpc49uc0tmi4d53bw2nmrp90nvnjf8r26u6kjlu5jf9u3cythri1vpwy96s47plziorwk3nm71wvup82iwixjw1j69iq01ir6xq4eney6e99fovrp9mfm0qsrpj79z9qvvox3yvh6xgx227hkpwtl1fbba0au3yswlphlhbqznpytkseoqojy6lx5fvxu7gcrtwhspav10rvqfet1ye7cvxuvcgglbi0pk5r32xpb12xpowjljyxr8hbezkin31n50k77ag4qgzx8shnaevau30g23zmalwqe297vp5ezio0wlria9r8y4wi1b5ytlrhkwnrq2aqhqdojzugoqkbm3pkklllt23p2oe9wp7blgfqae8g02twf35aq6y7bpg8n2si',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/module`, () => 
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
                        value   : '38bc8e47-c671-4c77-8325-263f03539693'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '38bc8e47-c671-4c77-8325-263f03539693'));
    });

    it(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/38bc8e47-c671-4c77-8325-263f03539693')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '38bc8e47-c671-4c77-8325-263f03539693'));
    });

    it(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ce2b045d-ad7f-4255-85cf-62a16e0b1414',
                tenantId: '0c683eca-dacb-4f7b-8fe6-2f7b2de81a18',
                systemId: 'e2e7a3b2-bff2-46ed-8676-e0b8c64d2ee2',
                systemName: 'pc4effchv8f6d170h2ww',
                channelId: '81cbd3eb-be4c-42f5-9e23-956e2f46a351',
                channelParty: 'mvw83d70kf0xqx4yrxb4uyq5thpvxok5m84ttlqszm5d96f0x3hvds6aldyayuxvdcmahy7ljrwinowh21mzxtjh6m57552b9i7afvm5r1h9f1q0wg3j7ki87gh3ff1j6jjzaypj5z4h6jlk4qff9emc0108l6i0',
                channelComponent: '10g7gnjl6dm88qc97f2m3v9ehacnzchxykd0g6ajfejachcgmad8raw7j5ho0m7q9attd41f6dxgr7c99mlxvxdfmr4fitl2sktpbs8bxl5hestkyyeth38zbzrjvrgmnbro7n48vkvt0pulgjyztc95rr6g8wbi',
                channelName: 'mq5flvuf7du62aoo35kkzfygpxjdgxs3a657vaf951u8pc9zfxmsave53z9kl8qui2hsocs799r2eh8f9z1fcqb9my3a8kvssg2l25kehe0d6sdhwwbh7thtjxwv4adgvrmfesbxlg2bbk27w9t4jngwxmix56ew',
                flowParty: 'erp8xbgwy6fdrm5xqdq19ehylzykty6vgccw9vdag57blzg7iz9499006g43ztxf9ue1inf1f1d1u936q0lpltsnicji8c4lg9kpi2h1r33ciicnsl78b1bbn7p2o738p6deobcfx0wspuvoz6f9lx60gyswu0ru',
                flowComponent: '23tvh1fo5f6emlj0b8o1c7tcr4u686jxdwsn9x8oe17a9qjrp9re8pdfbodqef2z2fyjx0i3lf61mu85gj65nw1vyu4bh72htd8749z6srmm522kwlfetmafe44lj541uzrlemeggai4clrae2v2rcjmup9wpbni',
                flowInterfaceName: '0mmyjsu8eoir7z2uofe8ni57iloqdf3r5dmeswv4zn91fjd4bp0h83vze8c19pmnioin0y3ydnc2q53abrxige1dy34p9a4chnvl9l0yi6s8289olz2k5b9daeyvouu2s9n9kbhua83xfuabuvcwmdotdrl1h8dh',
                flowInterfaceNamespace: 'dqu02btuz535cd98rctk6ykg1r4jtexmox1jf08dphfiv227nj8f2rhck9jihom34ee85e9i6zd6hthfu8col7sja1lgoodzuwgcrojeg67n24fs9ty9qq3ev68hi8sd8zkorydzdyjwg8lfrp5skhxxrc4zqlre',
                parameterGroup: 'uo50fqeiceptadxgb8f2orqhe1birqufkaxa1bbahlyj0xz5ur3b2efckl0zpj86eu6w9ovf86k136fjyffz9wsbqlfzy0r3pchp53up7oy3inq2srv8kah1z2o9g2eken94enhtxizself2f4x0b3penmdla1rc4010s28w3so7y7iafru25h3ub9f6iumia5m4f9ywc80hf05tqvfpdlpaxhqvsns3xtarswlnb38q4um1vg6n9cq0lxe8ky2',
                name: 'qgp6sda86r8uzn4j284re44avyd98hsmpb1m92bombchz4suoz2nww4wklp3k6lr5y42f30ng8jyx7ton5c7k9gejh7ufoqo5iwxis47bcxk30osmxo1wg8yq2oh7d44dbv32qqg3s9k3ts8ibc3o761tegwevotsp1h0i08doiksbwj0ak0pl20ch74c32gegy5rwsvfd4lra4x1s6kybxdae4deix90j7xmil7dh1m3byz3r82mhau2rm2boz9lgw5knq4n3unu09ixvtnd61sx3ycd6xigtflytz3svi55l7par69lvgw6x2nm3ml',
                parameterName: 'rfssnppan6hn4lnct9lih0o7zznwzx0icrbezfhvdt8ue83dmxlldxmyybgulfdg4hqxe8j3posg78maplc5qfxg7crqzmelnlylmbcsuf0c2l811qlesjkxw3k0t9n1i561hsfjrelydif85r8b0ckqns5u441x9uahha44rpmvfrwu65u1q8hzoxbswef1q5d74tcrrlehtn71us0t6184iiot76jjq0a6dgudj4wni4najdqn4jxqt72395zpdwniiypdifx3gbu7fgbb2xq1bmgxq492ynm01c60xm5t5trk83tlesa7s9lbw32g',
                parameterValue: 't80raelnlfbyfavrb4fjlvqa5vkwrfmfam8s0c3fgnqxmc7ojxwnrohhri2021ue3j8dmd8yxt8fzv3jbwm1c8bgt3nxvcyosf61zgaaprf6rqwaukhthdbjkg1kjyzwpzacg42xwjo0y3lt194xl2x6iywsyl18n5lgh9u9sw7yrofsm11u80skjxh8e86q465tq0xw7w76r4m1mo27onmvhb81qtlejdahvun1mjhwyd7c89nxl3xkpc9hpbzmzwenw44zrp35gvr1dftr8wy27na4e1ib239zqj7nm548e16rdlfffxcrkulxtosbxdvewqlkyis9q6966ftr2d4qtfw6ilxt1yfzp5dn1n42040ylnphro5xcwuvspq9igryrlxzf7fecyn20o720w6yhzepo3e6i9e1nmxv3opoizw60uud5vr1lqxjpm07w3sjvw043qqrh75v5iqn2xnh5b8q22vg5r1btpt0yv8nyxpae6vepnuc849yg366vtf30woxop4emde2et2ejvysapf20eaeb3zrklmc521d6gs0vox3zhv2ohsihykek5slq9s1ehkgftasrdh990zct3ogllbjosu7wdcyo3wwkp1zllteu4abm5ohyq5a53is4aqnfcuro0rrcdprxbwxk4ms6ct5n5q3bdtfefbm8wed3nt37705gtaco9i5veax0yy73r5gylt0a3mlj2wfd6fsb230ffhhrjwsvmyi2v82d6u56zfkukl5hrxilchimvyjcymsitb30j4g1clt80e5vv7zlhhoioipsc8xirw9fzgcj7puv81oa6bvhc917s5x9c9x4gcjk2kvu058dtwqdut3puonrnj08d8a2mui3b30hdkcougqrufek3vs8l7xfvtrctxjzmgbtpgwshoukss2c15jeicap1jrw0kqq1vybouj4y3u0uk26g4y075b1g3hjg7guawyno9u4wrlncm4yb5de2wn9u97vuixc95asjkkcm3xrkt',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '38bc8e47-c671-4c77-8325-263f03539693',
                tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                systemName: 'r0xmt6o90c072bc4plpk',
                channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                channelParty: 'jlun3nboixajg0rv7ggsrbumy8t0dc9a6mg0tu1qq9sm6lwqxcf0ji1sk4hror2ia6d0v9nb4oxlmkhsbcvybbh8zu9uff0z9uuy1e8mqzwhtzswef1urwojka37w1hb6rpn5nhggehyhlx252its9iipg23u2ro',
                channelComponent: 'xg057hsjcoiqm94d3j3kpuet7t21jrwe12mf715oq3doedneievis3nm5bbf0glax8ju34wr795nodrtr3v7e6inbwz8o557qkngrj09w6lk8av6f5na2k2f8onxfp5iv8vqx8jiftijpym8nk6vdfok1t4gsbjq',
                channelName: 'b67ohpplj2zy57pqqqrpjezfmhliu2cuogsjnprjlszsx6jqwpmknwnvcaayrgb0yqy5bdnubne60cvmf5vp74jdj41rmhkwstmrvu172q7r3220qgi4thzoaxzu8e4u072b4rsnu1n8acs8vbq6vxy48ng8zwu8',
                flowParty: 'b7rtxxpjp2140b3ncn4ok5ciy2rut8szu7y4tg015lk1toxli08p9cs9sfxfhic2gscc3npeyp42wxpsggonrdnx162jr9qdbp236crccc8pan090ue2hdw2yqaoot3pgoxi2b2vlpbq75irh3wornculxfwmgcx',
                flowComponent: 'by0zem9jqe7qkjvr3xt39snfwpjue46m9i0v0cy7ml5s6m0hxinfta4ddjfr8tof7998nixsopsbpgwnf7djd9hd26sfe8du36y7ehf8hbx0h5wpx2pzap0utl7axxisvg4a7zmfn60xa5abnsisobdf1r7r7rde',
                flowInterfaceName: 'g8fvwujru83ks3hx348b3qnnvyom6up1lgx76ge21p6mif65m6r8f7druti68idn1lws5crnl0l5m2advxebfzovqxyhkmsdqdivemmjv6min8givxh0bldd04cqu8dkg3n6gq29k18ga9ias2o95fsveybo482x',
                flowInterfaceNamespace: 'qnjlksrv9n57rnl8czmxzl0ydxsqtyyrrc7oej5mg7wx62mhj8ptintph3fys1ti898gcs96qwa5d229afx5pmq29h1gown1kjva0sfbyt4cuakrclir1n6ibifm3g613zxgvkan9lq6niwfomqz5ihn5d5eacnm',
                parameterGroup: 'ow1yggki5jrgdeczkvinhapt3kdnnc71p1miwlnr17zhv6wnxr1a87edkwrxs0unu6p7eolo7pj3ryd98a8s737c45bn5cdsl122u64ug4jol5qhvy7glggebqd1ih2zoiasq236ikofjcam6qho8lv6kolemos840131zdbte1m1o10aj393ml9w6t9ak64i08we7oz1phwfuzmyym3x04jqs2jtqa6wfyzy5yn644ggbve6rqrgpb40l4ym02',
                name: 'lztka4o8d2ti63czz8gs0r8icg3e2doctrf7fgpbn7j82zp4g64gzlga9ni3dbxe7zlkc4o8qtpe0raj9lpo45unqhy2po6sbwxqzq9kot4a2bzp0tnuvrs3iu3ymzxd352e34qxvugd4kreb6hxguvv24o1ordhnudi7aajmbway8r0mywcswdk4fp1dd61n7rb7smxav0ivud83usw55x1t23bj606neg4ka9tnrloq4uy7taxokluhmh5advgzy7pps6627gnl5ush7xvlpe6v8xiidyyy5v8yew9oxjcqxyxvc9kimedmpxmd02r',
                parameterName: '91e7px7xgp514fywd2wffsqqyybauvdpbb8sc32ym9jlhx78hrzf0j4hwwjr5w8nq1eezt8ivkbqlqf5f06otm2a4gvzv8se7xgmjqs7fhiw5ge417b61ukwv0qf4c4grdtdnw0wezchwvcoekhufs16mus28cqpmqds8nmi7n7ba2ifjk3l285w7d1gfaypwkoea8ce67lq71co0843spt0l210o2x78ed38y6lnuj681s9irv0n4ksjxgcfl4nreljaw9vk2320or340yxo87krk8v7gfvajunn9phrwacc2zl237ekmblkauimsic',
                parameterValue: 'aah2nbat0pgmm11gqlayiciaqhm0z1nauql15sbcgsf8u00w8teqgev23840uyofy3gux6vxsx97zf2g6lbwlbm6sxqvlhw3nz1z8vtwvn482s8s3ixuwioe6uvlvvmv3rbq3sglx3v80tm4cvhoxkbu1wbvb7p8mlc7ejx5lwyfmqeya56rk3klg4buo84r0e8jnub38fq2m9xlusirb24wlbm3qxwk3f93l7jjxb2gizgnmqxub1hk5z80m1yxrpxho5cw80ojns60bkga7uo7jtg3pgc7qn3u02rrgxh4083yqzula8g83p66lkgmw734907t2maj065o8i63zzx7w4ask71lyynst5mtd7byr5h85lvfojj5fivu8iq6ojkz2j9vrxedoxcr7j9zjwr5am1e95shek232sunhq7577p4224ge5aljq9y5yblnz8vxe6t1aq1lug8r72ix4vv6fu21015a91yxz150kx81kcebi9bf7eluspq5vfaiiwsln7x46ljxt9w49olmj2mlj8ai722vveir87u01jmxtb12o22uznu8lxs7vu80ckq1htkvne0ybfm1hhzqxrwlx5uev4ns4qqemx9ezpaugc9i62gndua8jyiw1hdimvmpk3tgnf8izandc5fu3dmv2yspxis5sk75xtkgtv7u85yuulrg6x9w9tesc1laceouzb3kpbv9nqahjvyl3ftjkxaf3zactkahizqo17lyjtl77rxmb3opzwb65osqzpi333nl7f7ts1dqs9rth8nh56xglj21vhwwjivlgk8fe6ivsw4wy1md63syr6ianm1rzxn8rbsmob7c9hrx6mtt4y245djefx61xybb01j8m1e9qfl51r1p2bq70kmhlamq123es1aotp1kanw6jkeq2ndsskkm3mi06gm8b084iiflee0dyv0bhqp1hk2m1mb2sldsnkm1qlkbjwqpuvloruu0arxange30utqj3rgiowi78hwdaqlqdoar0',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '38bc8e47-c671-4c77-8325-263f03539693'));
    });

    it(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/38bc8e47-c671-4c77-8325-263f03539693')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateModule`, () => 
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
                        id: 'c03c02c1-e937-4153-afd7-a5753f9835c4',
                        tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                        systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                        systemName: 'qx6wp1a6oyoj59784xy9',
                        channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                        channelParty: 'gwjjf9n6gxl4m95jpxwmyvov4qwtpl5q0m20cawfgzito2v9dvzhiut9uzj3ok3r5q2l2j6cqf6pph610sidii218nmg2huipp6frf1myqd9rkjpnoel36yfz92q9z6ni36jkx7qrn6pxke1wcbquw70a3456kdk',
                        channelComponent: 'fyetbdwtgf2lt88pxjdji105zjov3r3x9twd2jhfjo7hp24awcm5cfh5u8zf085jeh9brmz9ahzvmn0zhrf6vvz60r8u3pd4ie5hcixnchc2232dsnc80hlzwal3vu0m009io40ymztvlpktoa97obu09pcqhumu',
                        channelName: 'cl8rzjirngl0yv5vc5h2ja6eebzyodcnlrxv75yv1bxej16z3wq14k83q5pqocbkq5l77pke2ayy01daw551fhx5m8gy7lu9hzuztij7h708sg52so3qtdsd9jfowtrsizoh8g3ffa0and9uxjr6rf6577fc39hy',
                        flowParty: '3gddxucfpbybapowjycb0vzjowa027gicoidfo239s2xc9p7etklah7uku2mvw0l2wq6mxw5bxtc8k7aonluz4nfto0o83bprm7suqxn0e34f4ysw00mw6p99cggav689kqpliqmv4ywaricmyc2rpy1r6hxutp2',
                        flowComponent: 'zfnd4m3z4w6qoqvf2ypfiz2l89mbpssvkcn5c7vbp364tl5wf674f3a333cs4hlryjc0stx24luuqul4iheuctlwmqmo1bdg6yyzylbir1c3rl9aqor0l97mpsnqn5zg2s6lgcpdfctxgz2iwdirerkkum0itt9j',
                        flowInterfaceName: 'owkyz68x1pjvpdkwuitldv822b660bs4wpznd3t2uynzc6fc06l3xd7hj05ov59tzt4ja0iuuztqyf1lfen2zqv6k6mkgnc9ztvt4nikisvdr9yxvk32ol0moz5yfmfpjozdu4uwjh6gm4q22y74kc738h1sscta',
                        flowInterfaceNamespace: 'e5y3l8rzh5c4q4ch8bjiflo4c43dmvwr2s5wqewodk0kpl1s1th6912lxfrzumldj4jr0umxjz2e0n96k86nbgbau53gxc5s8b51fmg7h525n7p76vrwicyyg8yoxdr82s031lm24ne5egx486p7i5st0io3vs9x',
                        parameterGroup: '02ka5ji0wc2at0b01l0qg78atkjue0b9brrjivvhac9ub4nprcs1dne6dt2k53w6fer1inr2celtgl9f509fdkk3o5h1e02fi2e8pnyhx5z4ij6afjggaxt0lekxdhk8ob39hacsk1tyegyjl2k9ne7shnfstgqupnh2badtg26gop4yohmclega32gbngz6kddbne0dbvjiseqky1kp4kc7yv5mdcjuijrfee1p5kdtlscagm0erngw3fdruj2',
                        name: 'n3lrhqmsia1aatmmhfmpbhnh78ffofmm2tt4jqtdo2l4kmze97h17wb1j82sa9ip8irbmjbujcsrdmzp52grkpetrkje90nrhgcyxd9ohdw3ylsponfn4lbdf76pcb73gq6woujnj3bptqm7asgi0f4s3x30036pissna623bc2jhzhld6lfkmsq960gtuhacbxqso8ad4z6dwotwyc8u7cg5m2i19xdk1qto1j5a4d02toum5cyrood3k4tjlkbkcdzss8ebulguz0814jxjlkhd4gsvjraosn5i0ut2dvng9kx3d9fyne5ixpeu4v0',
                        parameterName: 'qtdv5q58bg7eruujy8rwxacbtfsv6uqam1uj0rfm1rl51czt7k9ncsqfxa6nz9emgkfkc7a7kh6hnc0fkug91cchnsdfdvwssvj4yur2lxl0vehdhad46qz5vysoxlxiu7gjl4tmdmrk92lru52wnart3erpgw9gqoe5ss1rc7l5081viwev9fdt4r730afc0a38rkxmtllbnpn0chsae6iovfjjijhsb0083oi3y2ipk653mz3tkaqsknyz5ywiso1f2dkfhseg7qw5vy02sh7smqfpe8300wn9dux2j12k9dlrrb7qka290m0uaiu3',
                        parameterValue: 'ivo2goezegerz7hgryxlek3bqah1gbjg503z19wqgtuzmte8qrrlgzahpwcliszl7xlzhv4laagh7eypw1kvz90y4x5xm6wq5wgsheywcm3669ejfpgvweo5tllrnh5a1rh9usmunmj49usbiszssdxxsjtp7liu9r6f7woj693mymirwq992o26ufivbspn322mmbayoeyorg7kegbzbhapmqw7lnr4zjfp4v309nx3iwfxuoa34z25xmnm0ifa3la71edjquuiexvshgljxvt9ajoqn2790pk6n9h4x1k6p3dz78i6mac7pscmbeyebih1e8dvx3esk86gt50f1rknwif53ua9cld4bnrm68ddeem4tglbavc2clarji7qhvyh4tg17fm86eao553juuj2xepv028br8jjdzp9asadrrnwbqr30rkolvetuygrerht6bi6i33jr4kvpf1bwmuqlgan8k701cjws0fjc5gll7tm0vhm5g34zigypb5g6ery08wb73hh813nq3zij4q80xwwng0up6s8q58qac6jjhm378411a0rynrohpnob8bdar52nvdliwbwpf3l3caid8yv7d8jttup554blpqtbqb8qgghd3rlrvl8sj252xw3umruxf14skpuw2c4rzkjg0ubim0x5o1wyw7iyjsizvqoro8q6oiq77vm0spl6d8ub9n8uuabg74lcy2ip5b1y5mkxr1on27swsy7pvhwcq987vzclofw6gw3ftttifn2asmjq9fjdi7fx5ch59vg5tr2riyxwpmexs2t61ybeuilemhi6mrj6mhpqk0vdlkwkmc0las9bdfleijwhcbppldx6z23durx7fy1houbu8xyhxp4nw3w0xga097hkwelmitie5qzk1oh7s3sflut2gakoh48jq972aw2y9762ueymkqnlmf2dh2abraciep5w45z5c6uxme0og3pox09hak4u17qezdfk4penzqm5a9m9pkv6i5ypl1k9kl',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', 'c03c02c1-e937-4153-afd7-a5753f9835c4');
            });
    });

    it(`/GraphQL bplusItSappiPaginateModules`, () => 
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

    it(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindModule`, () => 
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
                            value   : '38bc8e47-c671-4c77-8325-263f03539693'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('38bc8e47-c671-4c77-8325-263f03539693');
            });
    });

    it(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindModuleById`, () => 
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
                    id: '38bc8e47-c671-4c77-8325-263f03539693'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('38bc8e47-c671-4c77-8325-263f03539693');
            });
    });

    it(`/GraphQL bplusItSappiGetModules`, () => 
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

    it(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
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
                        
                        id: 'd9b24cc3-b3b5-4af0-817b-28af83c77a91',
                        tenantId: '06e8f7cf-2a7f-44f4-8b80-8a07294f6869',
                        systemId: 'aaeb71d6-c8bd-4382-aaa2-348c7b2aa44d',
                        systemName: 'hemc1l14e8l6uk8lyfhk',
                        channelId: '2afba154-85bb-41c4-9c47-58659c6e8651',
                        channelParty: 'u0rr7uj3hpsqpi3jxlr5wg258mfvrzibkkduuk935z67t7p49yrqo4tbrgei3jijwbmrb9qxi3omlz0oj41pyek4jam8p5jfcv309x01ca5rmzonn43l75ja9fcvrzqt152tjhtbpm5aj4amhawx2koowep7m2lp',
                        channelComponent: 'dkiqkvevcth1gkdaiwd8s46x7yj27gj8gaxnmoo9u8zvou2h8swi2j1z4vq1m7b6f8tam5rn5fbv7c97ukxbo9azc31r40brzcg56yzizopjgzzm7vyhmwcq1nshnani9lsk3ngjuvqz2ixwcl2ncdrgds7zm188',
                        channelName: '1l6o44cvsp0muxk0is83ovs236gr1axhwqc823ujixek0145q6agk6q0o520zr2siq9p4lorl4n5c9giuuh8n806s8otf3q4zaowcqbkhe0kc1gmwndjts4vumsf2avxpcmoqrym31cty5mb2sm8ruwyftg745hl',
                        flowParty: 'po9cel51ijnh9kz948kld5yxzj6ykkfuoewfcw1re1p6ywqlkvm7rajmgi1kts9f540l087otmffbglefskstmlbbdzvl43ky4rrxr5xgs7j64lvy7py8bcoe851btka7yqyfbghxyvdrbp4mbqispbywjv5tgcr',
                        flowComponent: 's13ue61aq0w3wap24ncmv9y8nzleqwg4i7hhth8lo8ypm550pqgtxi7dvwhiotwnogt466bzr468g0ac5y934s6203hwsio0kdub1kknqwvggatjhysmmzh98g1hf9hc5x41n96dlsvqnfud4ujs7ef50tc8qqfu',
                        flowInterfaceName: 'd45xrg9t69ncwexyhvjsjscsbftdcu2lxflmm8m6jt6zogt9jmuuai92u0gs83753ukxfchd73nz33i9j4593evjm9scm3hxp3qp0mk7yoct6zniwjs6tzhaw1n6te94bhvb2sr7jhokbgkdp54y66t6o40uhae0',
                        flowInterfaceNamespace: '7wvo6arjuqhxtxw9a0qftv2k7sf02a80hycopkv1fifvmv4o93ubspi3lhz0vb6pccb5b89j4ri086wgoef82n9ah762pmhjefus4dfbnq5s57grv0suv3r0v0luy56kij5yaie6al8ggq8fmnupsxtplsbsw4gh',
                        parameterGroup: 'h54yzxw19rr9f3cuik713nlkn8xm73kldwdg3llf1ra8l3t63oakis49ioa8v172t54udo4ghcd132wvpqyzl5u3hxi6qnenelk5mvw8gtyma846j3i1vpiup0eov6gnbecdkwkla79gxtboghvmma9o7rdnpgwbq6ovwcqmtr941exws2qalpwlaluyws14aaim3pqqj6c3gozc96a7pvkkbv47poao54robjxovuzw66zfmjcx495rkj2s9nx',
                        name: 'i1hn9j25vn873rpdhhudjksct7git8zshhr4doaasn2x2h63a3lhnq9alp61pkfm5yqnjghsxrnamtzk1uq7uajw3h645tilcsq7u86umgl7g3qmvcxvjcsm30uoa2c6rfmr4v2bp6psgzw2swof6uoc5rys0vvklzcgthgoiigq6mp7u8a2gwto19ncyzg8a663udm94tdas24zpythbah63pxgnheq5n8avmow1sqhwiusvlevtr8o8op3dupv0pgh1c70i6glpx9low6y4h59z1u99xw4mdez8gcpzwkuwl339tkuymj78mqhgo9x',
                        parameterName: 'r4nccmwk69jtp0xlqjn5vsss02sjnuvkvsag06qh3vkjpvm4gt28ydrr9ff5ansq550gr6e86ik7hosn07vdzwt1wcvld5j81lmfiw7jpdds3sumqyhafhlq3ghhc9vfcqb0e1ahw0hnfsc7m95x1w5d30csutl2z32dls5arjvz8j6gym6q5sm8kqpmxrblax41etou6aw3tp2xa6k52hiqy7wymta9r32k0a52f9y4lgrss7d8a0jeu41zpjee33l5teplutio0q4jx6fn67c0x4wrzfckbfyybqnw9ojg6wzkbasswecdupxwngcz',
                        parameterValue: '7d28toom5bittlnsg82xe2b0ktqunfuw61gnnfypqs01c83eitaqi0mk9b2ypabz9fd7v3avt17ydexalnhscbx5nwgwt7f0w4yd3g9kq9sl0u29yr2vljr9l1lcq5koh3gv5ot840qk9cbfzpjrrw18r18oo12q9nlrl7n3bmhgkmz2bwjrvpxuj4zy63x49v4d4j16wabwbqiccoakwdm4evjhcs6arps6aw4yos7hxxvcif5697uhkojwirly9xdqr1rv2tdm1kh8gm66a6on08pvma10qlptxvupc67ah9gskkgy09q8d9ymegs5uuek4so7zl5r79axk6o9q57fyetq6sts77v9r3vz1c8n3uv5worso3ygdzr5yvll16llevagembwkvgnlmv2p1vkcsek2qf20icz6xhezvqww0wb512t5otiyjctljlyl6j7xka8lydsg6js9d5hilzdxnf4kslu5jw3kilrplgdicvm769445o8y9gtccmisr2iz3uhp9pa1ywubpatkwfn49lqvg7ulo49jr07rq1md1u44ivwk76yvaozzl2ulp0pebn7wwg0x5urpuk61k0yjgqva3b3mfb90l61i6d7nxk41631lcoxj7pk5vqv0hsxqxigfh823zeav9gx3raqtm6m61jz1ohns6fw00ybll7b0lo6mbtzsjltj8i7fv2wvjwi3kiztc790qhuoetkuwrownfjjfq52r4o47v96zfu879ubyraywvi3ivcersnmy7tyils9rj244mak85s0xdg42zkudk1kcu6eq4forn8ixv4hfhl74htc7krho2zxjyq6punvncuo3y5xnvy86umy2c8gjy9wemmshe0wjj1ll8vz7vo140sbccw4lij2e96wvki0qqb8p67y2p4wurxo66670xikr64i462j78r47l34d4j8fntotfzch8j7zqmjficba441x823qf3n8s7ddoz79luedy4vyjt6zltjt02tj3fbqckve9',
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

    it(`/GraphQL bplusItSappiUpdateModule`, () => 
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
                        
                        id: '38bc8e47-c671-4c77-8325-263f03539693',
                        tenantId: 'c8a7df3b-0b16-46ee-8cab-050e956872dd',
                        systemId: '805a24f5-0985-473e-87f7-e3a1514d95d7',
                        systemName: 'f24q947htcoksuziepks',
                        channelId: '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba',
                        channelParty: 'pa26owd4q1yp8irbljnysuiud6ugc326eu7ztvi4m6p6ohppnjtzkx9b7bj5bzb2h1w065h1vwjw5c2n3uuudl580lr00qab5lndd7rf84hly12o35raip0lp5i1k24xea6amfrva4iwkjklv0k5qkpmc1rfivrs',
                        channelComponent: 'xr6goch0i6toz3bv090dpve01kjuk30gp2iij7lous9coj8v42xqus4l4u7q9khg6hug7dhmiq3d7by908h9v4mxrj03ckmxecxmend478l8pyxirj28gpf9z1s8glwg7e2y0reenmh33c9iw2qebsfms96ednbh',
                        channelName: 'o0vqm20ca1u1u30kiy1yxdy2hsdjxoaop43havtx4x8j8qqwdekxzywsu1wce7gtdntnukne5vihhizmqxsw29131d28uwggwh9bmmjkji4euv2s02an14m8cgtq7t2q0bw1wih1y190gk67llh9r5lknhp14usl',
                        flowParty: 'ncfv5dq8b1u5jf4mgpr1dxz7uoe7qorhpknasycxcodlef2jjtzuuygv9vuy36yes1dsiopvcoq3597u613ci2gmzvr8tf8zi215km1y7hr8lfqqjmrf1n2ll3qkdn5zgqzv6z4y87l3go5exczh6hygc1qu00ik',
                        flowComponent: 'ysk1lxln942pqkfracp0qgwav4wil2hknldk70kmcsx414uk9carja6rhygjcdbz27unu0rv0ido8mp3iwigaoe1c1gnnpoern320dgyhpgr3hcr5q408zs83li4zwac9l9qimspzdkv4dpwumkb9dmw0bniayzl',
                        flowInterfaceName: '52020xxhz36zf7r5xdja5wxdjawj993gz5brwmnljif6pdwa10jww6u6hxq2hz4p9a4h6smyrzkmeb6k20m7qhidxo9swrjvlogha173d8rsr1x5t5f94zzhjc233cs2ipm5gp0tvzruqqbuoszxxbsk1gqcf6b0',
                        flowInterfaceNamespace: 's8gvze3933aad8tbox1r5pf1ubxb2728x602c0z5cpo8vkmyk9k4racv20phoybsrmzlsbnzrl03187dgcqg9uamfcemoykxerc4vh6qfavz93y8rsvavviwlwt6ravbdt98k544qjj7l31d6ccnkurerb5gah5n',
                        parameterGroup: 'sck3kqtta90zdmzjy2i25s3rvqwie3xptpb92d4k20koljfx0cvgffo0413gfl2gtdvd2birohbblvx9xqdrgem8lujo19vrojm988jwfy6crknctakgzypzvnvrkg9qki7hd7zp3u68qlc0xes0xs0q7i3u8klt6nvznnbru80nudol078kc9r3w6j1rsypxr8y1e153a1ztm7j8zillqy4zyzsa1w15qcx8wasc0fnd6sw2ctduca9ebaj1n3',
                        name: 'k5pw10a19vtknnms27nig3itfdvyg3mnoga0za5h7orej0rxq2id5ttfe0opk8w0ogws9ifo9uybgwy0nj8c7poj2o6yr3s0trveww4sb5pzuru2n9f0h83ivj1grrpr3quoqsjrq39zu7xjtpp42lnidf3xj2rj9l7ja2ab4y2cvw9onstuntw0xvupabj72dfptdqw8yxnjx0krhq697p3ab6pu0m3h34uzpdgdr96pzl0wunrymdwrihzng7eq59jc6182hp1pg6lei6dsdw32fkw3smfktc11r2pwyxyuob57jmny291oxqatehw',
                        parameterName: 'p89gef10gnyq01tzfksffi40mmyc4isyem22y3z2r0lb94m48tmqna8jpmn2kaq40k7h6elogknppqgsua089g3ojelh2y32s9n3dzmbl70lujj7yl173j3nvin2ohd74dvjzbokhii035m41byvk1kb5bzelkrzokhazpqsp0uxq59alnyfa7keocy2if3oyrsdmw4ros2osq2t827p5h1mnumbnoj8983beiqapcou6v62vyfdylml6w8e7nar9ce6qf85a67z89y9gdhbw9fs8wnfyod0sop5ezw4ofnph4xt19do2rpcupmadu2k',
                        parameterValue: 'c9067l6a5cc6k38q4zfsx1ttyxiygp289xmjnjwyu01ohvdxbh6bl9vamjxvawz3qoomcy9pa7czf16yxf1lstqt6dkvb33y6yqowdt3ge3vn985t8jd3npj49e8quyl7pynhd2h0f7ol3dmhuhoxa5xxl5a90qrhpmqf5x0wtnjmjubj9u7255gndbldpwopkdmkvyocvpiggt3ufc7hwoyr6kz854ep4owojgyfq53hc6osbq3icqok1dx65i49ee7dlevcmg963d6l89bn09aarhddnkendva21diuv1bxceov4m6lsb2bvtl58qtvm08hz0clu7m9jw2e32pkmaa2owdergz5vwexjcw0937novguibduxl3h28h29xgm0uge1nuyxxy0jweg04z7gk83zxpli7reflk79ej9chitcpxluo5q2pofqgu3pcj545plk4mzlt04yf76sozftl1i6d0uxs6jaz0wbflqfhqpuwbaoha152bhzq0d5v98x0crkp68bs0kwymftotjsrhosblkvmo7tzuz6olhm0d9ap5urxa0s7e8aduirwhj4lgg3c2iin70letojvimh0h8m4uy39awna0517icoje9wlavshke0xfaso6935vk47sebd7u3bj6cdtzq76snlq772oyggt8nvypd8x62jwfb6ilal5rm4jpb0vmoiky7kbwdba2atkf04ux9zn23e91fxrthuam02f9syjvp2bccg4g0yj5hjllrqpgma6cgr2y2qym5ynfrnv4dkdrolnbrt79g1g1t5rrhib6pd9nmpe6afr2qtlnyfea0fzjz79v46qnl1pslb9k7vvmdj57k7kgp6cpcdvdp8rrl2cnb1qp6gisj3v3mwmsptdeu1mqs96lk4j2flos8wmql0eo8yzj2je7a0sxu9td4s83978btw8wg7xbp3vgxip3utm5k3jns1ly20asxxamq8buka4uzuueulvqb97dm82c30jexmjht8sozfptuv',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('38bc8e47-c671-4c77-8325-263f03539693');
            });
    });

    it(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteModuleById`, () => 
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
                    id: '38bc8e47-c671-4c77-8325-263f03539693'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('38bc8e47-c671-4c77-8325-263f03539693');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});