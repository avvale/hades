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
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'xi61itas6jlhqwrqhzt0pkrrgn26hv3x4bo43qiapwbz6bdkhrtjevmq2krrqy0sx48n8e6uonmwph2zstsvashlmh5i691loxt1drtz1gsnm12nxwfzuww96889zjae3lencx5xz03py1lcxy30t3l7a3me4oe7',
                component: '5866p6o2h1k8ylaz4v86pkgsx2620rdk3dez3f2t7zfgbcrufo749hmf4b9cmemte2ryto6u4qx987lj64iehlc9utnhna40u5jq3s68hnrcbf2z9989c79sz9bfjyi3sob5g4xfb3gm4wkdg5s43eqqrnslw8zr',
                name: 'h8bt7bogdj0nor97pf3kc0a4yi9022ega20ibo5kmtm2e3qnii3zhjg8pdqnehxts9goy2aso7j3zvjslbod612kwy9lwuq0raw6sr5xbd58m1pqagrokkvyfmssslgxm5rv0h5fsmyt036g66afn0zfmne3urvt',
                flowParty: 'l81hbq3jysl0y9mgyftwmxfhrlz0lusas3mh20tvl9c6cs6qqner6ooq1uhblsux37wpacaffnyphmmo1h6ybn4ke0ont3m7dz1fw9wkbdw1p9d7d30xl3hm6xdc3mh5853kwwhpwfx73t4ha0228x3dfew11shz',
                flowComponent: '4cg55w0mxr8mst9zift4mi2umyrw40cuo9zppt520ne0vr6gh65q19ojqarl1a8hwbe7n0bbbgcqvqmfg59qmqwjfgqwvaurbpaar1epz676diqcgbojfk2whf307ayh5brdu0mf2gj4a3fryjnspezaevkpd5g0',
                flowInterfaceName: '20oe3bcmluyntlym72s2ibivkt4gv6o2gtiufurepqfy2b0sse1py0ttrx5i2rwcebom5tk39qjf04yzz2vxy0a5yw85mr8f14ill74lmc456wk9auuvj37ntx7feoo4izgxovn3mekr23rqotl2r8ycixfzbgpm',
                flowInterfaceNamespace: '9or8pguen6uk7dd3a13olih5yxr4whukredgt8vzrybfexsy5dvr0k5rwer96c9j1ih9ygag2etqdkgobael5v5mbun2z0llzx4m7i6fhx0f40ovtfq7nh82q6w57x92e87iam9s9q02bhdsf476xvti0a4xzoqg',
                adapterType: 'w17c9bl8m90ann9cnsdbu8zsrp4eeeg4t6giy0yrmk3zb9pj6bi7g19grzlj',
                direction: 'RECEIVER',
                transportProtocol: 'vbkbm7n7p9ncm1lq0he1j7w2n94qcqk7xh018hgrvwtc90tsg5fsdg022zdd',
                messageProtocol: 'zyjcmdni7lw5m7gvn1isb8f7awldzoafa3tn25zav5quj815p859nw5uekpa',
                adapterEngineName: 'zyxmc9sdpahtfkolk83zdfa3a45875vlbhycfbxlbqv66n2hbxvl8vxjlyh1xdwe3j5xwi5soyrd9t2d5d0oo1boooy65pbdlwxlkfo0e0oi58c62v0krg2027ign5vunqyxr52hhinghoi9porabl5qlb0i22c2',
                url: 'nt6eovy7peiobzc6i9ikk5ojka4z7rxedkubxrmw7ofjspnmg1ot1ver6vbcjx3nfj020549kq7pvbsuwzkhlt9kss18gpl7q67hyznyw2em5ms9to81j1guf0jp3cl7vk9fjtpoy8l3mup7mv27m0nviuwgew7xki1nn21ns2qdk2k07wio8cp2ai90xnezxe74cvv9qvv7rrnx8z0hdx70cdcpks3wk7vrpix6uz9ecuvyi995p9nwhcn1m9ztrv51yahlgl7lt7h29010gt7u7qauep23ouo2cik586llw03hlt6wdihfnx38iviz',
                username: '5cepmmcin2rdl9t36l5mjmrsa5eqq94re1rhvy0v7zdm8fuq6gw2lkp8m5wn',
                remoteHost: '9j4eyfpg3x8bcagi4d65ls8do1381e1uzdx8cpsgdbtglyvaxv46816nno4xiqxh0nn32kwvxu5tqc81rjx5lyfwtpokm4lcut5gqnpgvu8pbpmvvr9xjwnbtdajqg734gh9nw49hgpe6ds68g5f20lkgpxzraax',
                remotePort: 7209797697,
                directory: '7vb7pif1aor9ml3u7qbvovykuu7i46mfygrq1yo8k8ga2etvdajlxpnprrajhifd9azucvnf8clwk4l6vd9nrxp3z2vhle88uitkihainyp4ilaufkuk23rh962bu0fdu1ndtlk9ptwy6tlg9l76bvw8kgadoxzvvjtgz4iwrbw4ybu5pkq6luoiyr1jscb4ow29mdgibaf43yuzci0cs34pdqehxrv8m4rscbu8yrag8zbkexizg72vw5224tp3q5nkjp71xxfbf5cz2bfbi2djh5d678mc0c5oi0fkxvhjv6krguwx27afaapmbd75ctho28ie8sn6vwr7c43rv40qkmqcb8406t5o0e1jca21jzx469aqmsyh0crheh4vb27iii4gatuvezqmli7nzyy4lsbdeqfqwfrhi8hlegekyqxabj1nl6ckz4r3l6sqkdigjy2fkqi21lm8x9hq1ppgcrf2v2wrj0ymjqal4ge7paf82j6qr66sum1rmv0xiumkpavcbeko0vz0gua9ft39xmffihpycocq8ha518fy3q63pcdhxs3jzp8fg7ak6o21hr0xe4b2nsd6luyyjk56dvr33qdi2mosnt5tivkjgcg69z1qilby99pb1q5htgdwo255w0jjvva72ko1xdzt3zuqhbkdye03sg5afz05hw1y982ddi5j7eu1d9g1147j0qgvjcdb9bl31cbohc5g0kavqd5lfv4bxdigzcwnw9xnj3htzhr2sr4w2scuqpuxlhnxh1fuez5tti6aa0pmsgxfoys98r8jsfnmj5s49zevnbypg22oevrqsvu2h1fk0xggb3qid7n63kkn4gd0jdbkcegceyyh0uu4pvh51yjth6omt0rgqdv970lccohjtlw574uc7gwdi2s7y9eaxp81mhgctraas0rlz635qvkdz6r95we3i9myc0th6x1zw4dupsdwqj9nw7wipalccfa10wz5rl8cym67wg66rp4azccctu5ldg5eg8vn',
                fileSchema: 'ui3is9nxrr77bk5bbyak1wg41owwrocxwcpqsz9d153lor4o28u90bq761ysql8kap3x2bfd2dffn8qnfg8v8j001ng7wc3ykbebi3x9iseyl6es8v7dfer1u6yy5u5o782jeisqtjt7rs7yqv0fqr4bcz1wtl9js8oms6w0g9xyj4tzauz6q4z79tfepvnw0tw3i03dis4hog40gru3ythka5ir4cqzykzqt32o929qe10jwilykseahw3bywzm5hidxhu70i96b8npef28rp7h9fjbvepb3y0lc6n1qapt1enaand6uj5cxb7cyr7vj7gtgnxxyggrvawyth18begou348jya2nun2it26an9ani4c347wlwvzun17rmispgz7wcyr8brr9yox7o3m0z3uxjd9x8fjlyyd9l6umjpjdsbmqjt08s5ub16cgbcturg5c2gioqyxh7zty4wglhgzggey1cz9xyjmoh4zglefknsoy4mt3jzvo75oahfqmp02nevos8c61b9rzrvce0cvlgy644am2hjz1b5nm24kxjm11msp2cawzgr7ocihpl2fd20p3h9c9uhb2e5jj19ls85zm0s88ri9grb6d7qy5qoojlb62prkxajkf8wvtdppii1uoi35105u53qe3qkp9uz2n4kgwwwpnxcbuh52ycn6vx8ysiutvu9bxd8ym1z4b5pl57xhxvuwmzvxrzvm9214lvwx9tva7528fn0erbl5noowgf65777srbaa43n60q7ylk53iqogz1iqb86pc3mnkbmv81qaw02xao927amzc76nz8wwqa2mobuw4r78p5bljtg1qwru6fxw1ne3mxeej9s3ts3hs75owzksni67gr3fugdn1tserqd4cdcuz1egc2uxuo34237d2skvwifkd07c3x5t1i56fmdv8p95bwp9rc55fwmo5x7ijyrb6yly8q4cewew4knuk7pb9cv3fjcfft9iovl4n46nwvw4cyr2c3a70f8u8248',
                proxyHost: 'dygs90rxdw8jy113b0i06do36asmll0slwvukseowogjjmuy0bkb7l5764xr',
                proxyPort: 6524672284,
                destination: '5tktlf7zw48kkt1ogpn6vomcs2gfun961efgfr09nfdfgue2l8dmev4o2c43g1w664eo90uavp3lqfbjf3ptd0t79pm80j82a6awo03bdyjf1aksonuxiroqwe3g1t8rinzv2waco7k9w5bua9o5vhw39idnoiay',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pza80pqkhflr1adcy5075fjfgnirdksh8tj6tfq7mf3tqo9xrhxrr4el55i7ll6pictfc4jr45mczp9xdh9lcmz9qfx7aj881r9tv9lujydculqbguvdandzr66ujbvqoiaz3wu0q125ktv6v33le1wlm8b66lrz',
                responsibleUserAccountName: 'jzi9a3k2ugxynu5li7u1',
                lastChangeUserAccount: '5279g9ez73kv5aim4okj',
                lastChangedAt: '2020-07-21 05:14:45',
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
                
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'heoxy2zbusoc3ra930nz1z4h6b1ngosw920p7u2vovf3q320bqhhgegb5gcuplyrk0z1pigbpu3wvfbqswz7z20ib50lwj6excgd6vy8tewymfpxdnijunejiebs1jupoggpxny2nf370rufaz4mozatt5jqb32d',
                component: 't6kbum7elcq0td4rgdz8s5oa7qznlubhwkil6umpijbtuvazh9mt33utsznziloukjrmzk8lstrqa7ph2w64kujlvjea4coqjgr32xjkwp79ztso5boz15vp6n63vutcy4f7c4yi4exm0un4hmjv7pesaw1zmsk6',
                name: 'l2gkr1waspai86xnldeu4lusfnddze89kbatf2rto9dnzql8533lhfh8wfrd1a8bcuqo7o4za9v3c1zbwrx7eb5cqiowmzeg07xgar1czp6xcncqduxlxajc02pv237jvkwoaeieti318r4k7g995ezts7zh3vst',
                flowParty: '80yn18od12bbvjtsxsplu284cu6d72jty0xxi99cjy89vt70a4ef8fdg5y00bt50g9y37e9rd1f56cf2j2jzugx3l1pub9n3tfunm78j7za9h8waa6cvc9i8kfv8edyi12ewm0it070ylrxgx6sj1r4ydgf9k4ee',
                flowComponent: 'roh2nc43jurykhoigvoc146khgo1aczle0bb1ll5gv2cwrm0wxy61j89dfmp15yrafmy1zhhyxdf2gp4vhbaf1xmlt5eixptq1kx7qb5go6b9szbyux2vzdg5y6g5xjaxt8negh7mwcqfuvkmrv058b9d1ewb7wt',
                flowInterfaceName: 'pr88ciqjkljhnr93v5ks17vmrnrt1slf6c9r8usnlsce5cq3t8qo3d3tqpgf7tqpmw83n0d7ctoc5i1sx55s4bysd1ldyk8rapxqqkrkaamaj2mmf9j5k7cbl4gj7gd761p3jhbmxew7yhewp47vicoqdb84d6dr',
                flowInterfaceNamespace: '7b01gtox1xpizraejd8ibqu5rx2f04phd0hqeh8h6y3fe4yd2l3og7xv5ffl7dhopi6sklez1yiuieq8dycp2gao1ilrjsfbi903mf6bx0drqz70fhuplr26lewwov5lye6dnn0o6mqtjwkxk0jf9lavh4hpsnc7',
                adapterType: '0lmsj2rejiant5fp0hjut6fuujk65v307pwk0wc4tme3ytus2kc4k39gqm0n',
                direction: 'SENDER',
                transportProtocol: '8t3bz89yzsntsetwtp227u4ot362w4bzbdx50ed2leilha1s4df0hsci9bei',
                messageProtocol: 'fs3m59wbmn3qb0gqhczbcu0sgjms9rjz39qxak7u1k5lljcfphjoucoiy4vg',
                adapterEngineName: 'osbf9dj05nmlxcev6njaoxg1ci9qpdafpv42thby0ph0ihy3l8fhag9xs03ntzldplmy6rzxzfm611xsr7zacsaiab2wmjl2cu2o1lr9vez4n4cvgf6qmre99pglf33xwym2ux6n1jfwr2205snz9v5ml8lyat1b',
                url: '0db3y4x48n5qdg6gwqr8sf8n4ehdfbcknrweot0i0tcytu21a8kqk8trg4ncglg56i4pepl7da4tv53unvfea236erijlolfyi0coyqrd52iobqq2m1hrc68oqvkvn8g1abv4943ienxxemid0vk4uu8g6l45vbvgu5kosl3zg242cek02x9n3imry35gk3vqa1bjn03c6h478ci6v6njf4ahchhyv3reuw6h5650w2h09lpry8gmjn8kt0al3ceoir34u8h82hfb5suzkzoud3gtrv1mc81nylwbhz5lq437v7q6r613tpxq0ytlspx',
                username: 'ar1o7nr3ghhz94at5y60slc47r8x77q50nvm352xcpm99w4o6jw9xdbk9key',
                remoteHost: 'r6ciz629m13d2pv1fxqryzerchjslfxtrvijwdc46qwmg14u6c24une1p18hccsyappwz8wuvxozgbzd1d5hv59y0b8tuw4n70bof1yfc07qeimyw4i27yjxx5kg2ibt6d6uq8dyi4t6x6su6zm70n64ufne1z60',
                remotePort: 5166777173,
                directory: 'k077sho95sot7lfkgncflbrqcdjihw77b8zaasra3dnmpvumoxoj48e5a8vmxaaanmjjhsc1fz7z5axgglijvyomy6dybhos70h58zijycqqym06pdag1dv6zdgcdxcrxmdyi9hihc4fg8x4b68yw6xcgr8pk7zmv5s6v8lckfewna8h4r8232ojjdh055solfnyz23deanwnujrlplgok10qptnjgde51tugpr9nrj58l83btvb2hb3yfnkz8hvedjfto8fzv9ignukqkp3z2wlx3gxyodxn7r6njh0sptypaml472oj2iqe3wsd2jxzhnhuqvq7na86o19ncj14duph765qwp817xjultjbpd0outjxqziqbdqremwiqusml2w4rzv1ubd47c3ma3irqi9zssgv2c5ajy3zotv623a9ar0kskt5c044rjbwkbmt8fsi95zozbsiex26v3cx9irf9ff6ewzpkc75k815l14qbm8zqmcexo62n78hpohfakdh3ybbw8l6wmxaro4jirzk6iq8gfby2bz5ir1vr903axefwxf44a4mjkckljbrdq6vbslg16wwfsiv4hookdul577m7froeh0s16ktv4y1atcudp2t998wf385akyq6pta6lcx256q06cq3trrnwwfej4ahdgyameynttw7uao7w2mbx8tgfqk84nvnz5sq9zoroowoav2jhvvtiblez4iufs9g791epwhjb4s6p4d9faxyrsv8pl99jwx6ir9rfaoa8ynws1k3r6gkm1lhnbhkx57idb8jj18h14arqpzhdtp9jn721in4p1jh6mkjhtz9xny7s6bwxnz9l2cjgsiec239eplqflnu7g6lfoxsklgtn7sh97hji3pmv241hx6s5orwu381bhm57sc8qdn9c9l0lnbfx3nhik9mbelbwn7afa1jz4uvfcf8zq4ccvjpq3mlvmb5yswgph42u9hri68x1mad9kqgogj1xcdvs2s6fegjbmogquc4c5',
                fileSchema: 'eh2inyg7o44u28iv7fo20w1fdbqb0qybgyxi25qvz6xo7hq2zwn95x5cona493zoz26w2jgu4nu269lsw8umbj6m6l3vlmvks1p83qhqdvd8uikl0xfuln3opalrgf74qg1m4wwjlh1haf0ieqaac3nfa8iljzaj9quz3hsnsa7l6lh1uzvqi4rzqngs973yf6dd43jkly766nhak0kg78kl6bu9ch3yh1vrqtb3gzx34djb44qmej4gj5aef04fw3qpf0fs5i7hb14v5a0b661ynl7uh41joq9swhnci494bwsqm8vldzfsxoij30qro67aaftzi133j5jjq7operwrmhw5hh6yidi9lyc4h2zupvhk61inttz07klak2r8c59n0m0e7c1699prz50gpjplci6v885s3kzmyujut0h6to64nu3y13zrnw8vf2i9iyr3bxdw960w8pe235qjwcs3f5tsrvg9bnqa3lk88ys82ey26n8m86ph0g143ytmkstbnc747cewk6lu8rw6s54dho8p6zgrzg0wahaeiewki04yswzc0w29fdyky35ips4pn76pluq9adar7uzg321k9nhvtphgr98c6nvg1wssty1r8s58ghogvv633agytdclrnfv8r5oyahfnd8pimho96lhj36pfbcta0gkldapb2gn1ibuf2id3pfnezh13yhghrluudio82pxeagq7zmzll6bscnjeo9sf31g9q8g777ixtz5j1htm7bpklajt9q68o05vh4x9juaas47sh0ybscrac208h1eqsnmm2wytp9gm5qs5r5l1slcq8v388ukriofj1mlonrzhsswbryy80xsolqeifmvweiccd9u3jdmjpgiwr27bv87m4744pupxajccstpgi611w1pftt6ful8kclks7azy4eypdoyrpn5qgpprsqbahl0rrtcwbidugmqd2zqrsk3o8ljnd1znr46t1g4ax8gphivsgwk8b2toqxdy30mybyncxej',
                proxyHost: 'znvmxavlo23jt4f5323swaj0u9htng8ttjukv5smau6kojn0pyrtxh8eq011',
                proxyPort: 4014379775,
                destination: '5zk4kwrtvi69lvldt6fcfniam5igdqccifqsoyo7mz0533gop56dxzewi568a7zy2aq7mnxtzp9o2tq1gnrnu8naoas4cvhe00dshjgrvl09kt4kobqo43bugma1m34wy6xx7sj4p1lj9wd463omxowuty1i8z0g',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'fgj66h7zkd4ky444p24kpnrp9ikc2ruev625aly4lf7hd7yz28zvylrc8gwifiobpey1pfwnv3b4l96gqz2dgjmasivrkr7yghtw8z0k4mj17d1cxr33na83jfrd2xn7p43uf78wuthlyftf7lckbwoz9cqa222q',
                responsibleUserAccountName: 'jl8u5i9aejpwqwefo8aj',
                lastChangeUserAccount: 'lbtidin3ejr0bu42wg30',
                lastChangedAt: '2020-07-21 05:16:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: null,
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'kznt61sb2yeomebq2kokt3sgja4p8diw4mx572cwg9g1dqklhwfm2blp6k96yiv3m0y80lde4dvfp9h2vxomdqhblvdigohhhl8ykpe3boxlq5hk8dh7llcebws2w0ktr2vu3rpaegpmhzxngng4v40k7snnluwt',
                component: '0uoukm8yx29hbwdy8h3rv1w5ywxou74at9jdsi154jbvww3qobkgmu1cxys2fzi14mvnlhiphvi1h72rnfxa2ya26wbu50lsgwtd5hku7cbmieyp2ltegry24qckb5bcq5o44h1be4x0725ng2yqfhinol8iczye',
                name: 'ju0g5uvumm0sjovydf299q35jyqsjlnhfhe24vk8po2ui3kqh5q2lusmi5z7r2996285ijosprh6c9o3qdxx55mge9kfolhx8raxb7kcg9ag8z7isw421cr3hoge6ireylz7k14qo8p1kte7fmcyc8keolcbtp13',
                flowParty: 'yll8lfyan1qb5urtdii7q3da7whpxrfpk9ko4oaoak9q1on2kqyg5uszhlgaxrz3twbgvfi02kjvrowux623gri3747k18050mxryf8bdijqy9vstb8q1b7zbwzike2w4jnwvfresjttm218xq06cfiw265bxd4h',
                flowComponent: 'duzgx5lzcn1cxshyf6u3m560dj6677035vy9sm9xh7ktd3dsc43g8nxgwsttb12qfkgwpvcw3w48e9tixcqw2fipvj4a7r54refmle0o5v5uoq3kiwyq9ifhnsh0mvr1geccwtqkqb768778288o536zyw62f0sw',
                flowInterfaceName: '3vacs1b6y6mwit17hk9e885y12srftuibegysbgrxarmbewllstrs7rdslmc5a605nmzpgygtqbbh4c50o78bjgly98h2enjok8ow317o6rrg3elj9j39xbwyzsne7lraft2cyws8cr72l2kjyah0tcpcht46rca',
                flowInterfaceNamespace: 'xod4e2n8h2ccm27glw3yyln2l8x5c2sjrldd7rpwh7zzezipoybe1bqcnutrt7nbu70j2xeigyaauw6wfdgl39904sxiywfeh7vhage0pn41ppf7303hy6cd5z281znr5kn6rfxthgsr9p8vkqgex3vg6j5eiqpl',
                adapterType: '045mn6mtb3cstuuqo09fejxgpx8y6sagsu02rz8qwd2qissssu1bc00ejg5r',
                direction: 'SENDER',
                transportProtocol: 'nsplzngahgbaezlkr9efcpughz8tdd1royzk80irrqng3jp1d3t1ewawblg7',
                messageProtocol: 'c224g320wqfud1l67bckospeeu6672w6utns7cwufc14hzids4aok91vs7du',
                adapterEngineName: '230g10otqtsf83331i583ie9zko3b9jgwfjm4dtxwdjn8nptk5rg3lus8ao8txabu5ncrdpqz1dawphzgvyrbe62vpatot2ohc2w2850gl9zqphp1run7u1lxfbb08s49d2gifleu505x7vy2i497rvqi20q20if',
                url: 'bp2f2ffu5x4l451w8p7o40gnif91t0c6h5jdwvs9z8ej4iomf51u3q2szyqqpls4em8c0npoxyg41jqwlr12e6i4uttbjsv2igwd09fgm9r7lkgemyn68dpbiuhx7rl4se4v26b6ey4lr0p265vfdwruf4jbifaerc9kvge2y2t9crwu5s2g6iizju4u7jmkc8rzxszqbwb40f2g2zfc14cqcbd6irm1ippz2793mbip17lzfrv17hrrnxibfn4ekaw5j2u5ua1terw3qopniengbfqhdxnumt2yedxujciu0j38h8a2yqzmo0d7hpoa',
                username: 'w5ajxm7mlfm07ejnaawf47i8el5m8nfhygxw7koyuah420u0hxlj7n8ga2p1',
                remoteHost: 'yxl19m1jhcirjd40m0prai6ae5pqvssqdd7ymz28j2ei27fz33iouoio9so079yjmx0s52i97les80d6uqfvjz4r7f4h4faqz0fapb9vu8o73ucmlcepget93abdzuotbyiq0yfpxut06okzpx9vbh5o7u9foz3d',
                remotePort: 8764765765,
                directory: '7se0tipp62ifumnmuux8kwlnjkja32jm11euhr9clpz1dexa927d5tqlq05w68eosostm8wvt56g0dm0hx3cp93qq0qcc6t0nb6z2jxfq0zsarc2haszqhtym8ndtmaden7ba1hni4hhhcgzrr7i3nyzd4cp8s9v31vxa0j1o0mk14zt2xxmaceeepgz2huf7w9kyurrhjv2xaa11kxfj8oa6y6e2zilaf5imxia5nibn8lptvv57j5w7a78y807zqv2vpvyxs5ofnr3s3x10tf1d379kro6aenitywb953pt9ppw4lf5odyvemtv4rzv0a811f402bicdzw8f0j93b09979jenomwk887oq8arpjkekd68ynek6itgm81rex66utizo54x6uatrvhsmcsdno7pw3h3pbb99jtoizymhuoofs6w8zdohmenn3py6z57nz4x2hbgkalz4dsy0b3b631613mjcdzti26upnwoqdpetbgmkbffdw4l4skzeg44ketrmqp5wlp18unkf98tgp7bws9pzjuvlksn4gdwl3zo9fkjcj86ay2315ov88opdu8nws717dy7tm2w3pls291k7hru4l9g74teshefrka6wxzkx6x4l4b87xghlchd0fmxqqrg6jdkjkk48j44e41gpej7kx7yr7xpjhw1hygdrg8aq23a2bos4qc1jhxd43je2w02t8xnnmq7bwjv1rpylwc2q9f5ka21yxvg9vxhw3hyctu30z5apuuykpgrfit3j9gj82ke0ydj716vh00crqe7am3zvq8bohynloqutj7t4h7hio1v2utiabc05ymr7l0m1e4ulbv90o5hn8vsqrjk8sa32ra6y4y71zxrx1fcjkv82zlskm4dktzmuiu503aaf52te2zzlckd1cqh91cp33mbwsfo5codunirsblbxh7qz25oqyxhskuzs1il12ciztwm9gxvitgwkk5uxs758x05cbic39j9k8cnr1j6gcicaixjgpwb5',
                fileSchema: 'dqhwfwwx5gckm871xl4i4n2krgxum5vd6pswbdq6wwmto3weqb9coz1b539oskxqg1stlnqfeb08ucpehppluxlw4xkc32iqap28c8v17i9e2mv1asieyasq4pba8njfcwatthk47j1o45g2e9g121wkt6y5p6xlo3mdpur2iqfo7kv8g6sz36ndellct5eqcuvsdkt7c020my22v8frf57fgyttb8dg9vwdqvx6436hal52aey5q3c94u2m9afyrk53cgpmh8jjjj9f7aw3r5hd589arpz0s3ut0a2qlx9rjtdsur7fhvp6ftdqo1d7oim7oof0er1ck7vc1us5gy6d0x5g2le6z9qg50cu6lbyrusycl1v63utjbde5r2rqa1m2r6eeugpvsryiuz29vl1mnqc9e6xd6y44ggb0pzz487gf6vqdo9w8b7umta0qo0a5e0m5k8n3xyr8qqqhhcyte9tp9idkr2jaoihzm1z86d1jjw02quc7y7fbtso03hv8k9qg57suix4stkrtft50ed7f8prg2nsfvax2ge7pllcbhep0mkz6ckbs0c0vmjolwzu95bwled4l5fxu2xigptbd2fzrruwy8q8ss644duf8nv4ofjz5vzujfwz9ctqb9mf7sx35sb5j74r3hg8g89bzouvvgi49seswclfjxnqckqeicz3myy5stevmfbyz8tcx0diairm7xaeh2hil7jnrh9qey9808z9k66pwhqgyphwfgh2smyt5de5j4n6vb24afh0b2lhqyvkdyvo1eelivdx7h1r4x0batg0yw8uulboxlomfiyo59rad7dewme7t42zuuh6ixsg0os7m1hjdigl0hcfcl8wo1245eokasvd2w59jyj0z75y914yb5yytmz1bz8qmzjc7hw1ei1dkqmidr10stmhb6ti74khwrmc1ec05y3un2yzdjmirbiel9jljav6wejm4aspazakhj0ej4yighkw4nxjpc73zhjdjbswx3tobp2s',
                proxyHost: '2hpbbl77gt5ijjdl6a0z2zutnyonecwtazwevlzj25bgsmp7a496wgcwp1px',
                proxyPort: 7413535982,
                destination: '3scqrdibv78w52a39w7d1r70efq7v60h9krugfajk9psw821wqbegxx2a1btygejy60fbhqv5znzjnbhtg5dkpise0gouwghexrln16b2wamq050w00k2smjfycvejh1u8ee4pg3974h1ol2b92zvrwr2jt2hcfk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3350m78qglbsfnvtnb7fludnf5an28h77qd2cngbb1x2aqrwxclr8nxy4rvk73ly1orly3w6guivmdcf0wm59zozrjpzaju91o58l3sph39ge64vixj5ih3kbxovuja2elemcq2p58eq4gvoxerl0wougu23x45d',
                responsibleUserAccountName: '8k01s0godte09n2cshwl',
                lastChangeUserAccount: 'vh38pqtv1iaw6ecz5519',
                lastChangedAt: '2020-07-21 03:10:41',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'pilopiyf4vde4tdz5qqy5b6eapqufoqs94z0dot6lony5csu797d384tohhn58c8n5lj4nv9xwsyrf2q0grqjy068zw73gqykdeocbuu6iz19avw2jy42a8yiv8qyp8fslgq2yrz137bkg6jarpqxpf3esbhq27x',
                component: 'vpazr8zcb4iq22uoahnzevoy4qx4emhjqjjxoeqsa0wgmkrx7ahh8jcaniu9ajjhni6mg1ibg3csq1p3f39bcjfpl5pade8d9b0vucx35j5mbgk9fevuchk74a4nybe7vv54chxn6jfh9jkkcmp05yqs92glfuhh',
                name: '47y3wuovyaapvzgmxrhivjs83uehig2iv154658w6bkfs950gynyc77kew69nka22dj81mhx3z6m27dvcq1l87kq2qva1vnditlf4iwzyof8kycspym2za3w6db9ozd60mp9qxkcawgl3epxsra0j6dlcls06wc8',
                flowParty: 'gog8fqj4418jm9gnwbprcegkjzptzf57c895gz9wrh6coiqpe459wn9yfiyxreu0gdji438lbzeqlvbuxuge4q7hppyohdnzgn0s2kr25nju90f21makanf60igc36ykmvi62l5pwosw7eyx9uagw7k6flssngfx',
                flowComponent: 'nt5xwkdzcungr8uy4wzmoz1awppkgxzz0rw8tsu0rvrbj4w1tmrvcscxloqldab5vrlakmsz9zj3z3g24tnmkm46dxbo34mrbmdbk3ef8uw5put4j15ukv614eb5z8u8ggzufebihasvwh6h13x5hrrxq2ybozk2',
                flowInterfaceName: 'ln202yzn0890w5244x13q1id18uv6vi5100t7fa176xig99fzx103cy0k6dgvczj88nzybw61j6o4e3nk5yflwl2e3r010rbreq1fiob0ezxykshqx7iyy4datzjxqhd5lrfer4d0a4ywoui8hcx33lmy1zd6no5',
                flowInterfaceNamespace: '0xjxzb97rdr5ux3mc1gs02dw4y2c8r4aa93f0wmxngkkv1rcxrs57ywlf35x2y3wlae8daln1f5co21q9cqd03ooibhb8mpgjc8ln7k62sdclikyv3ztnn6zcspjkt4hfztkvf34g7e8i2vkrds1zkqvy2nnox0k',
                adapterType: 'edasxkspceg603n0qlfrt6d98y0mrw3mtku6wkp0g1bbbt2pgrjoyvr3e7xq',
                direction: 'RECEIVER',
                transportProtocol: 'x9txadpb05ioypcbfa3gooxr3qk43fg1z054crp2nqr0wfearakk4dyxlhkp',
                messageProtocol: 'tj2n1p436j1e35pk3ads0f1y5ky70yloslpdlkwanz1yk2qigleehud6nlqt',
                adapterEngineName: 'ms3jo0u5t13ar5u3on3enmhs8s9mt5wmwibuzzkz6mp42u5tvfyfvzaktpjsoioa95rmav7zklwc9xbh1v4qp8attl5phtx5dxs54rb68ufrteikwxuyc57s1koc335u196f6w3und5o64c5c9mmukvbynnzi35k',
                url: 'xgfs6c2t57r4iq4ks394h3izmba7j0daha1n8j776mxhwfpmp8wpg28232171sisiimdftp2uxmyak926qi3dblnayowm2veqxl9te97hy8iqm6d14npxwgie0iwdfa3ig8zx6v2mueraml284sezsyd0e3k1i29ftr7xloku46m9upaxrcn85is454tam1c1x37zj0cih0lpqu1as53lnbw4ewduixz6ps5hxoo1oq0pzbp18koxlrflkf0hem9uz2i69jtlk2lwy9bxnccijt4ahtqoiqnk7wf695ke2kmex07o1643aotl1cnjoox',
                username: 'zhfa8tubzprrupdkjo0fbwjg4uz8x8lh2rr0dpj0dto7ajvfy9rqk3ervdp4',
                remoteHost: '67ofzvd8bl4xfkp2o7ouum4xcabqe2rr8l98s9q11hrwosspum4iby5kya61udwxuuybm4ado6zka5mexpxkkesl97lxtwbr45bi60kf7wnazryb7pivadmghcjyjjz3f5s7wdkldt6hslmnjnlgkgoyip0mjf6n',
                remotePort: 9784682663,
                directory: 'nwbe6fokaesc1aseekyvwclfgzykzywzbmbz30q7qx5k54u7wuj7deq6cbq0pt5pcxgv8px32clg89n0sc6g8bluf0hr6vjyelc4mcnl26uvqtbly4hb0kd3yg83xrq2k0i7cyt8fk1q88pdds8e1swan551dwl1p9vnw0uyvaizii6lq8yjec24os4wyw40n381htmnvlflea8rzz4ub1yd40pbjmwih35imb8uae304cbxwwytegkb3f3rodtbwgctn9xqmny448f105msloy3uks62inkpsbkw9a824g2qnty1a87r5tj0ysd76f7kefb5p89bugwkl8dhbu2kazf09mfjgceavcay2is3hhumf1f77ij64zqja9150ozyc8qysedwyfzbn3bxmmjrqcyu4icrfocfxqvy1ru79kbockiwqf8tg52fji3ylpkeawlk2ggcnq48ixzezxt3xnbwofb3vzzcnd6brv8e5lvrrtx542ucgy9vb1e1eud0wlnfdvif0ysv8n1057ss3fr83swzkgpeq8lp7kogvgzn2p6bshid46vc993fgtjq2tjwjzfy670d6b4bwmiich25qmcu3b8litcmvex5h19l0giy316diw27mfj3tlp741loup6rjwcyq9fh9w6fsjizzsu98an9tx4ajpfgzq5fqfvog9faklc5g9hham2860hca12bafgyuctoak4gsc6cyz4wr4o0drteiv8c2o9ruiel76fcx1nfupkdmnyyslf0qe83ybwu8oh1ohv5xbgu3wn7wov9iu6w8gx66mn8x4h537ik7jhoxcugyqdxbsuo1oqrfwj3p3qq835x03709xaj4nkp984388vt10mude2d2bp4dzomb0k88nysn4i7uyap2t8i97g9pwhe8ecnlecudm95tfe43iqnzglorjoca0ii5kbfynqe6t2kb4jf7zv4zq41k9l845hdsg4txmcyaf9q99zn2cnvcx2q11nhoqwrfrnaig4c8v6',
                fileSchema: 'wwch5lr63q5c6ryxt8rhx6mbtr4tu78pf2295jiro8dqy764fo644mnyjzqorypsaabprg5ytuzkfoz0z9q0ilc9ndbrjw6wiyl169rml3ljckq162lh54109fo5alde32t5ewog2sfbld8sm4ef5f4fpaamsi8spqocoiu8rpvk4fd3sdwdvvgisn3jb0thiujkuc2jrkanro33drajk6qdh50ekwdymimyeevay8wknjwf0n9gk4uepd9zum46f64eybi040p2l0m7dxhh7ldc45xiqgpn94x3sfinyvxqug8zy886x6sbhaqx7n6bzg8h6sd5ta0fmlnxsjn5fwvcwiv5enxa9gr4ax35l4u0dewn35juvulbytdqnrln6964wjm86i8vux4bfy2fusc70g50p58q82s4wyj56trqroatibtf9ouelp4kfhuv18uipxx3r8b6s5qjux1rezd8hsa5r27c5tnujxcdnp2uplw76ezygzs046mxllqpqgvdl4rsnawx7mjpjx3wqtawb35kdjkj8jglb6al2osuyifwsgefelewtw4w52cb1czdq36evbji9vvala9r14830scr1al039dif2ekwcx0n8k16nbof1y5buy1c05x5h4jrr1da5hnh93re4v38tbtr4206lgyp63t4t6ufu70czxlwat4xidv0whculnihd3buq7vpr6r8if6wgm4ta3o9qj5eifwxbpcvv3n6ib9hlfk3aamg6ne6655dj1y21vapoc1u9klpwnh2iwt9l5anibr72kwxcw54gfj9oqfa7ae9xrzua90gia9ezijsjynj0jk47dkg1fbm7jzky5ccx9gdhcxqq9euiqpn70ktsuzyk51bc2hb6gq6n21hhzq717j1xnzcyqzo018i28dimzr1ab1hh1plek66mugh8tnd6hpstk3g3zjef0bl3q2tfgx4thaa8lbgi1ws8oufub5n5qgc5aqe10h4k24rtgm46jg3068i34da6fb',
                proxyHost: '7be7x0wmniyg30svvpaynw0upqr2nhpohgw2k8v4j3ni4bdfvslue12q9iih',
                proxyPort: 2870815260,
                destination: 'wa7fd1juw7t09yxn6ql1jmq4gu6hn9hcztlcs3w480r72xfzpdb82s9ahx2h1skvtzx0xztk3ubpftnzhkrylcfht4vomgqv2n47ptw6ya3g9u6tn97wyokry7500ei3bju1ifrvg26vu04tvd7g1vpoo6v8oe2r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jx4ivu9hkfwq0o32dsmpn7xq1lnfh28ejh1wdbqvgkiz1ka0145cunvbb8noktmrftpyix3he9wtns1eoxuz845tjvd007jjgl2d3sd3gut1fr39yzf7zckbhefb40nidfmpbrbixeosbcfwktrflx1e4adj4ke3',
                responsibleUserAccountName: '8f8mmofxqn2zffi2v1dm',
                lastChangeUserAccount: 'nntspjicxxb8a7lkcjmc',
                lastChangedAt: '2020-07-21 04:50:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: null,
                party: 'u64mwyhnlopnk1y1fx6q5ougexpgwzebuo0ndz355pgoojejyjyvxu20otlr010u8h92elryycfcnsb2av1a993ta3rp661iasdd901ftmb9r321zkjid1hz7v8ai83ba2v8kfgyimg97hgi5vvs0humw7jwlj63',
                component: '86o2ivo4pnis2k3m0dathq7deo8t43417e41fdxryydfauhgmxw45vuflz0f3ncjrnvton1yvpajxjr8x0rerrcd8nr8v9eq0ytz52hh59e97s14kvec0qkgcyt527lv6dxq8fae93umz19wtouha73zjigjelo6',
                name: 'ch5yq8lia388do5qs8do0qokvkzxuftustfvs22xe72tul7zoa82uc1w9k86jfcqnga6eax8mp0x38x7q1ro1rxkun0xshva6kwbz81uqhef44a6neoalt9z63qqlgl57k5tp0d9k1sqngg4435zwfabugtgjnjh',
                flowParty: '20kpkd5zxzjqyedt5jth8foiqdkl2ezr9uwoeijrj7mua6unwhs89l0dfpah580d32q9pj1kotq4bah14n7rnexo9292sl9phs6x1ckg10jso820253rcwocfeg07d75zealucbkh3hfvxdj05l4ss6bbj2pgwgd',
                flowComponent: 'plnb91n4oba33md5dnke7ap7uvpzyroo94swmwuyr9p9kcd3htm4k49vc28m8vsknlxeybiofba1qptpg0m20a14kozl9kx9hsauyviojod4oaf95kj1rwwzl6a8m2hamkirvcss51cfa3n6mt7v5l7pyesyh3bc',
                flowInterfaceName: 'g9felt876dvzhs4xjxp0cvvqs7dveq7nhu5s7qvnjq5sbc755uv3m5nrjuhvs5es3iqr54jm0qe2skm58gam0twi1fvo3gvm4tfiva56kgwfis6xjen49i86z87d5vgy3wbab5fpt4fc1j4tsv9uo8agcqblfwq9',
                flowInterfaceNamespace: 'ocf434uddudy125hbnljxjwl0jobujfd7ef9r62z0lk1w90ttsmbbrrafdgwidsw9haznh081892kupdrhuugqdy0c3vhyepwr1e9q6hohivu9cfzds9i9id69mzkd0gzswpq670mnqc4aym7n4hll474718gnsz',
                adapterType: '9szy1wn2laz0kwrd7n4sre53j8r6opdb8kvlmmpayt3ojo9slvfc4aj57w4i',
                direction: 'RECEIVER',
                transportProtocol: '4gnnolahvk3amkubx6a5a6xdxedi7qwdf4hkj6e58l6np5hgg76lbsa93w90',
                messageProtocol: '19y7mmehmd2af3xy4wq4t6goe4pf1wax67uj6d65m521120k4lp9tjk2kkl2',
                adapterEngineName: 'civ6omtes6iw5dp2rfby93buodgwo76fnnc0w1azwmnxnko8xsyut7fk5zcws0y1nzdjlehnpd4bwx131zvdnn9wocj9hgaflni8x4nqzylfdpu9tblmp0ddi22kuwpadbwt97uofg6tfhcqmgkh2d46m6cvzvqh',
                url: '23u7uhhtlvhcdeuo297u6yg6u3vq4egxxd4w2umqxzlvfe72s75x3vc2mhwq9jtmpdzjdlhk1hi9fl37tjku2eqol2p89zz2e3o79h1pap6wno0ul4blayhc27i65mg4cjg9j76j5iudy528ks8sxnzequy614e88n3untdpe40y59ymkbxw83kwb2gaircfkzvl3zfxhs4mxuaw4qrceka4oxlsc5s2z2mmu6ool6s6pho1j8bjgut46yfnb1dep28iiahmvftzu4kyevyvuhcmyy5nda0iirvc5bgjwh7xt8ynrtyeh46z9ieuamhp',
                username: '5u8feeexfq7gwivx2nfb9u9v3b0kbbge8dd619zdpnep2ouy4a5xrumykrh1',
                remoteHost: 'b3potdpagh2ckztji1pafk8ices69i4yyu7d9nvj3lofvsk286gsifyxeo2tekkk539xikmhvfrysnoj9m8988pbw0ag326h6nwcoinl275g0wwbu5xiealz9i9kp36x4fs7jp51ks06ieecovia93pug2y0qyla',
                remotePort: 3973602713,
                directory: 'u8wibo1nz6jtflh0pzb7npnlzs8znrb58q97k2fb2zv9pm9fmtvon43q2t129rrlyyabzyqldpz7uf7hh4gy1wcbcrx5wbrwsnc6e7hvog97ke4biondtf9o6opbdfo2x5xb4mawb4a07xpsvu3ad3p7cxojeo3v49q5ggru7qtefbihz9to8phgk58jvkqx2zru8fscqu4k433l09vcv75muavrufwd8mcq4xplc63slnfo1yft7epvnvhkt3fp12xugpd4dbvl6mzlxnmzeui3xz12lwdct0cgiekqsh69a3i6wp0ono4ohh1bxshbidnoe9a0izn75q7wa3rfl4ncuqp4jztme19m4cjsiyjc8kh2i5c1dnek2ep9nkka2j6bxost6ud1l0l6p1gxaxialvn56oymgh4e0i2p1f67dp4ujj60ocmbbdcxkx5umap0cnwxn2jjxt3s29umpwz04hlib4jrmmv5n1a2dcg71etlpatpy1ssub0eoe9guy6rgej3ynvnu3myt6h99m1gdfibgkgk2u9bmspim92xjwltekppio7jgpll82uviic8106x3kan7of3vytynwpvgvembkumlnj2q1a3fdp09v35stue89p17tr31wsazo3fufr13dfpj431xkhllrwwvicur3mfx0zpvcfpctnzqpihso4o7l2j2ca7pjgf2842p57j5vopd0aydyouehlp9i6nch1qf8k64ja634eu1lm0yiknxygoxarf1h5tj7mx6prmmk43cn0u4rx1hbwdyiv8sv391irfi4hncozaonmcalxb0wu0ka310hryjaswh359qbwsytn4qdjtg9w7cfz2niflo432hw2bbbzoiifavo449sqjadl9wneu69j8uv0zffwjy4x2twh9scbg985kr4gwcxk15yf6gkyrypny0cm6c0qclzh86brbhiieugtdcymuevdxzmr09shaisywbeptmtlvpofitbsrqkdg6ssbs8e7qx2fhqd6',
                fileSchema: 'osc77mgr6e6k344wxk0zj981e39cvj9ttdto6vzp3ua4ya1h5tppb0h4po336lg2i2n64hpmd2exridgoxcd3h81zimfqpmk9pzq41rvv7waejjm6wvojjtb4dih7o3v8knsvgbr3wqu8qxsg54npsok15sjtjwi83et4foulhxg53le7o7gwlg3t7o3f603a3njrtogdaq35yrledhrppxxgp7i8iw34b3thjdat5zdpv1vjsfrcanjog5trbfxuvv2olp6ao2v04etv16gtbklgcbdc1q7au6cx7e57xmymhenjbtz7mllwcabdt5zqoz2jfc5crgdfnmeyk5r9mt7c47kmo5gfizyzwqyyvu39utocjdk1u6af5fvurtr368sfb9xlnvk8rezb6acg7epmx3s23eh1qhc28nok6lrg8wubyftgvfeb0zzmqjqlz7dk0g5ioqqxichikh38yeg8uxka038pf61638p8ivtke1mniqwou08ngb3xoydd6qe6q81xk7edwf6tdz4lazsxfc8nuw3rr1sr71kum2ask0l5d7bdk9pxlrozv9j4a5cb0cnmr62dzkq3rmjnkmxaxu2lne74k0lacpwdcpaajobomjs4sbp65sewozjhekd9fpik4jp18pp5k06vlwtawjtvjxtulhcxa4f5igq8yc4p24w72w00xz1vqpwe175vb9d67w4e7ykl4nw4k50vbzzvh3v6l9eidc16jl8n8hm3dvzrx70q7vzeorcuc29hogvxy1sp8c31lrzxhphoqjkjcf8e3vb9xyis00ptsp4j2gwf8q68am34207hcbwg90dp8cvxr8asc5b2xvqcnck8h7i5h9bpal84wnsy84dbuixeblfjt1num9t6eoq910gxsi1a142dnbex8pdq06pgq6r9vmqv0fg2m2y9e4gtd638xuvx1397n4uk5z0o42emx607umz3gpppvbl23dapg297wxjpe9u3234nxw96e6htwku50qpyf87',
                proxyHost: 'pff5wtzb6uhuo6hjoqnmtkmi1aydrgw7d4jtrk1okmiq2l61bn1t28hmppht',
                proxyPort: 8267575710,
                destination: 'g9z4664dja1kb76iz6ahbqzbv6gbsnysku6nv9m4xla0eb5fqj4933g74bsync78hmmojjiv910bge4q6r1bnpbpeilhqcsvmmsxy9jbm1qsig65lk3lp4esglazoalju7rt0tczv7h7qjauzrsvv23xkgpozeu2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bdafgeqxgn7n2eu5zzzdd5g6n6uaqg7653rsk0gnhzp9iwo1hqut62rk2gaccykhmqjjc344s4utbnsw00u1qc2lzwebap15ru63tw5gpx4mz6mthocwdw9nqwlfysfcx5frlaqs6zqr5qtn1ev7awhme5mirk7i',
                responsibleUserAccountName: 'xxgff5f6bnv7pytkia5e',
                lastChangeUserAccount: 'bd6lt6w8sl3hd139wcxe',
                lastChangedAt: '2020-07-21 18:41:06',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                
                party: '2lp6ivw7h5sy40vwrdgdz7bprue15m0ohf8ncwuukq3se0rhuykmjbe45xtgdyzkz3lvsi1b9bt62b8l9dy2srctv090zbfvizf24v7dzvu2mo1emjtiditucumqxobsauqn6n4dv4uz10t16pc4vf9j4wsytnw0',
                component: 'egyctiynwhf2tmq0l7blxtw31vv8m1os58ovchgdpfu0ecnr7dd7fi6t1gmpr0gl7r92tsnfvy91a3owypanx0l70yxsofek99md0us3at059q4uu9yyzipt019rehsku6zqjatoccw9ko1ffw0zmbefj4e3z7pr',
                name: '11fpck42u8dvv81v6gbisrqbycsqnt7v04c0yvggwilh4glc01y144tghgoxbra8wclob5flfoowcpeixju2pn0t1gr04t1xpwdfudhgb8ear42cl2qlmybfd3wibaf5pnysq7riquifxz8scd3lxtr9wifp59ui',
                flowParty: '8ickkwqmviox97dqubd0dt9f3byc98rnh4t2tlgdp8jroos26td6r9rjeiq72mn5bvybtbdb57rfauzvjmsnbhl2j7cvgctj9flxtln20yjn38ojw2jnyn7160x4c28tqlzjogly6rdx30cmmjipciny2gay5dp4',
                flowComponent: 'htwcsvoqwrwbn59mb1bu5h6fahrcperyflot0wuj5hhivtxyorosvv37t8r3e9nkajr9lv0shuqxr6jwrmx74n4blvcits5y2coyw94eq1bn274tbjgxy6fu7rwc23ku77oem77haq068a638q1tw5bzgefymkzh',
                flowInterfaceName: 'c2e2rcrbaz7su4jy1ecji5kiiqzirh9rt202vm9ya80wcdflzig40o8ljyjf3ys5aa5v1israuanyy6m76ap684fvtxdnpuehzv6gc6ua1zavo7ykf5uyfcu6fjdiq2ervtc8or8e4mcud0rkb32h7f9t0v9rfs8',
                flowInterfaceNamespace: 'tudp621d4scyqb8gukmn62323igh06g4cr29h7knqr9o1l1m3zak95ae5gf6ef5pd6takct4dau9gr9ctcveao2xwvo2tclztrkf77rs76ohhbf9xy0zeo1f75qdk4gljbgex1e67evjtf0nvfnwnkxpwm5rkla6',
                adapterType: '63rhwriixyctsoqv75dfegrde4raj2c2ggu1qi1uuy5iwli6fcpbbpzxqfbj',
                direction: 'RECEIVER',
                transportProtocol: 'e7lrv10cgptvutm03gbyix3bb7azu8zuinzlm6jws1hyfs4rrpq3vzivqmp3',
                messageProtocol: 'm5lh7xwlaxcuywzy7gfcnuqeend735s3ohb3ey99wimd9wkmw015620lkh6d',
                adapterEngineName: '2bqyarkwhqt25xl3l5oljcplbtnyg0m6ds93226yb59frw9p3s7aligrkv604to48aetqm7pha4hpvh7aqhz5n5zfog5nqhpmitevarluzuf1x1cyh2scsp5zljvekzt8x4u44u69m1bh0523xcu8hpykis3nn4s',
                url: 'fximrw50an09efowyok8vpo385rn3f0pg2jh4azaqtc00si6oh60cmx21u0u3qlq3kd6rmbooqa2ezgrkxfsq232urkzu52dhtscbqheczu2bqmeze08gde75lmohunz4ho70wz60gib497gd1altx72oscpw2z7rk47pfoud57307wyo71cqcbhm6tixdhysth8x3lnyd8u6uu5vrnf2pjc5h2vxs2z3yzkjoxd1c3v5rhslez5nr0j1yvelocvqb2rnkgq30hahp63mhn5vhmqe86kpxmfrv97j2d9vfy6c716ygd3gzk63yuxu6ba',
                username: 'ffgso3arthm7gvmfp8bzvr0awmy0b9g6nu95jl8dfynfwoe923xignivpnwm',
                remoteHost: 'rkpinzcali9bt7ehu5udc4e0pl7gj3ud27wacti3h8rjlsm1dx8n2689gmdasfni6gs3n5ns9qug2800knuubcii50femcjb7t0mr6fhdax04tyldxc2fen140wfzepfiyhymnzhb29nxom0sx6og81v9s7tywdb',
                remotePort: 6502081922,
                directory: 'yeh5hqtwofmrb7vyeyw1v89zrvrkccyaxeirbotye0o0e7e74e8tboc8yff2axy3agvvfpbmb8o8quhu8fwme61ii1rstvva3c7wjbw3d1tcn30q9j5hrqokl9dwwa9nt90e76pygqqetxv39v5khujje58f1df7cmuzkab53wa7qjhmtrsypi3bcqs7hcd6hco7s201t3kug9lfp0743pbdri7i4yw7ka6dqvhcakwf0w0r6mc17q584cqhtaf0321v2b56euwgsnruelarqra3dkbtrj7dwewnr7fmsmtc2edgb4isxgdhru2vcq6r91t6j8hvhvs24gyp6qslkqxbpeqm8w6k83kftulr5zl1aod87a9k0tpeanicvqync09n6e6togyszgit6bsbw7cmc3s6q0v96wfs9y1wj4k6dch2f94rcbuzewlzcdoxpll2dtk5nc63ascuvsu0z7kskyesp30lzv1l21d5evbu8f5kda6ieo4ioqnkmw2l24yczsarvrc9a9hyi36225pw3beh50w6c35g1y5ojct5ylxkk6fu0u35h5cs25pqmb265v08wlj147cxm93tc4ipkg63cfs4ymbvmn973ef7ebzfa7avr4r0nnygh6y5f081qz7smwj4854giyg4p6nzlmngc7zv6cbgaj9sc6n0crgjwvdehf3kk37c6w80e2xop5o0xtjg8j0xs7hmdqzsbthwtg6d6fr4a8qi02uo83xrab9bb5r4fk25xwtyjdap94zw4xwyxi35f417jbfqioynassz8re2pr1bqce5okjuqtbaf3xopiod70t242idik937nqkphrmg1b6p0xjn43iimcuphbs7c1je2e86eocyz2f3vtzvx7q501fsbc9vxs1tucmcb9lpym0p6x1rs03hu6oeppkqphfo97k7db6apnqh6vp4490mbwm60ztmqwig2t0i24yudcd7omrodoguldcq9zrcg0mo81awokxxrd1lndxfs83xw1b',
                fileSchema: '3lsk9i3srgda2v7bxs8v7tt53bms7o2l2ofgy6mb6pe9n437oophsspndoyp5x4dip0jfzxt62ih9k4ng0fv2shq3nsv9ryx2aklkg7wgqq48kbd208lrzw1ha2rq61dl786a98dsqhqibncd8nmghsxrgwxiu0uwvehnfm3yu1rdvf2pyx4hi9ebbps3tg7i2yzcihwymtet42dah1ub5edb0mo21xfdso49jrwej5cbm6yknbox4thqfn26b8n2fm0tcwz8zo00y0fp4372m2y03tdspypd5uq60jejmi6ji0i4kixia9ootc4rkkejs51s9r8ojztyzeo7t3hoq0j7cvlzwnr6fp3kax8b9fhqx765nc9xy8poulxdzppibpyswo1droebotywzcn06becetncqpgnf04mn89x75ilnb59k5mxgsulgrsui7mlyzuppmvemwe3jmh2hg8rs1032a8jdqox08b4rpeyhfay96kz3f8efqv0imlrbf1jsfjh2u1fvluvyyhpxcivkm9ykcris3ahxvvaj8swfldldnbdif3x3bg9bkc2jihzb2emhnfl8nuims2mxv2k13w2hfedl1ctrupmcs25e19xndkxlydxjrzyfgksz8wr0yidh90jmetsmcvu2h168tr5rb7r2tswzc6wavf0x1jubofhfomolqek4pxdo1rkjqbwjre7dok904apn7nkx7e8y6isizcse85onbyvwpvumfdzefibdhhylot3jv81fiwwxhdct98wc4rus6qou6ozse52zsp1dnwptul984qx2ztvzca712xvz8b5bzsu2t7q5xjpwet56ieop24vro533meptr2g2hbaccio9fl0p80r8yjw4wcebz1wpi12ucd7knr5xfocv38432vusht699j1ip6f7bsyncrgb1cg5a6dr5sk3j5gij3oed28psp0lrdivzcrbem97nwelllettqmyywcyrzemmtxjpfbmnaa53wrcgq31xuisft',
                proxyHost: 'szz0yxbnknzlzo13pidvvh4fwmqxgxcdgzvz16x9e4xj6tdyrzf8laabk7b9',
                proxyPort: 2111481659,
                destination: 'jzy3madjz2nkozq0jf3nhrhlgidbexmyt8kbfpr8mbx2tatstxrrv6r6cpfwp5cp17ger9lwkdzdusdcefu7oeq5l3jcgev9gz5titurd5srokorn80j565jxav6w3rfp9h2bfsrd7nsbll6w1h0qk3gd636l2am',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1bwl2c24u8lds9o5lfx55183p5j50mz5019781goe9yl3v8rb5797hcx9g5ospcjhqu2keo6kpkv5opblxa5bxyfhwpldrnb7revb0gt68pkxtztbwutxgwq81odz55hb5w7fa2aejgrq8potl574yw7hj35h9si',
                responsibleUserAccountName: 'lt96urygkw5o54q0lv9a',
                lastChangeUserAccount: 'xvh8ooie3tptf1nqdprt',
                lastChangedAt: '2020-07-21 04:51:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'lnn7aeruj75friarmagilpz9uinae1lf7pvyki7p5jnxuv3cvay4wd27x9lu7teqwre6ivpdjwi47nwe7dpvoyifs9asxu64hcmij3m86g3f86tz55je9ktcfmbv8p8l6lsalof3ehihj876etwj8xnpfcrwbekc',
                component: null,
                name: 't0ao307mpegsf9qqg6ix0g6ndz8ykeswlhdtdogtbpmg6qbesdlv0hgcp62wj9b8a4a80hazrakd7qvieqpy4ay71c8p01u7k71fqsbsueda0ijhguu1zzwt452d9v5unsqp78h18sgmn8er2qsuvv4mwsqipce5',
                flowParty: 'xfqp26l8ll0klaes0wnrqg91cyq0zzu1zo6dh6qm8uo7lux0hnc4iqy0bgc7pw12lg0apfw5w86e2mr6m8db4w08hnc9g27w974behvfivk4f78nx4pfk2667g7nszn45p4vvqdab9ah365bregsjgesgheq2zl8',
                flowComponent: 'favr34o942bhh3m3bspdxc7d4el0yio8m3u2x1a8xsfmjyh79tdoy22yjzuja5srlpui8e6942qp9q0falbnugcc7bpd90w0tn1z5esil6ql9o50xmwaeytv0kilakq38cmz9j64ccr59itvyompkvik0qvu38ig',
                flowInterfaceName: 'dfiz42gnqtg3bpjnp8vw9rrup104s8jurpd4fpkpo5qnh0kjjapuu1gzoekcfnbxmg2556lgkvrg89skjy7ui42aij3gqyc0bqafhtoo3lj7cuwf41df7pu0bgh9mjk4jpbubawu8udode3r6zdw2a68uekmvgj7',
                flowInterfaceNamespace: 'rd932lwxxc6t51e06pl17b4em5l7f7a13w91snresebkcxslnx7h0jiplbsiyvpl2j3pcwnmv6jdwabxrydaq2481nntk2j6uthn545swt1q9o86nt9awesqf6l6ar41d9x8xdbu8l9ktkkcsp24iwpki3ontja2',
                adapterType: 'd6xc5zwhuura2cff9ypf7vp2p28udru0jlgy3f1cm5a1up07ck1qztkmtsxq',
                direction: 'RECEIVER',
                transportProtocol: '2c62md8m82lfjj4puwhia10lfcikq047mec37jurg05qbva2fv7q8poumx66',
                messageProtocol: 'wfzsvg9fkjiksvzq19rnjx2p5ko8mlgo3s5juj3hxksu8gaf8ja8yh1x5t6n',
                adapterEngineName: 't0mfiupcbo4m1r0qxkloltb2tl33n5tmkdklas5r1p3c4r7i3ui1g89dj35w32t8o60xr1th0l1mtxjyobdxw27pj3j32egnjiyt9993mnrqisky8rhvr7e0ywm9bvhf64pucv8mogqmt4s9pjgsyhdavny3e8ro',
                url: '6g8kdnec8na3x0w2j69w4e6966v6tbaoqisd6230660m7f1gcbmlc811i78qj68albv24y5ygm6jvmqownvz2eble6oiyf1oq0h170can8bhqi1wq313307x6pjgszmjrxgi3v7a8x42x22372fut5zg2bnookpeo330k4i6vluejat0ksv0ea96fi05ntef16oa7n3bkikgv91w7m9xnsuk9mo337purv2vfqi5vakpbudmbc5a13de0rggsflfv48pfhto20ogvcn0j878v4kzwughksakj8e3k1iy9pe2o18i4s94ilu8wcrfi55p',
                username: 'o4l0xh1etwntxjh5wzi6u6yfaebikr7pf1ystni31fwdjc0psay2456z5e76',
                remoteHost: 'c8bzzyq2psb8dax2iv1py0fxhulr8ewx1dss74575b0uqjhvx983g92l2ggc03wq7t9x9pputs534k1o3vhobrzdeif5ep1mvix4fmosuv4rdi7qpln9j3ttfc4wsuonf9fkvhapiudrtlvxbjiqhhkxhuz5m60e',
                remotePort: 2082316265,
                directory: 'jh3vpyhbgtq3kpqwskve78i3buo28youoyl5w9tizltkefmyd0uvskg4vrv6ujsz3rvsit6k1y8iu3hjm7to6pfqmyjm46pccocx1urnrdtpu1ga85d6rulgtdn4bofumlbg3rh7zb6dup1sy6953cyg8krwdui2l0rua78ve3dj604cpxrigaujbsx6jto2i81trsha2xkhpue4ik59z5dwrkwuii2i6nw5xthiwlmj6xj6vsv50qd1cubtygt393vu3geintxvp1iwf8pbh782n0iw3c5p7vaejt00up2q4rlqlcp5jbu9jguseywlaci7ivvqm0z1tfdgur0d8ouk0gfd3z1qyhmv1d4l8wd97ktqoc9bpmw6kk1pa9aex2xomhdqk0av8px0dldiss6qedrfhhl7nb1wh6s0hg0pveaft8pvuphvaymcgjn1t6e9qqmdd0iabp0igpdaavrjfsz7vat03jwvbx7lorv7hbja8hwxn3tryjgdq3k96gldlvmq64ezrdxvpioszhul9gj3j2ao5s4i6h5gncvcypv5797iv8bhv3nms219b84n4strvteoblj5cvmszlh9p7zesld8q46cjnat4r1ilw55hd5xhkf5yd2ji9ruj95ptympllufw7s7qgbf6shpgw0lkg6jecpgvg1rd01j0581fxqljkbyldovqw4qse2dsssk266jmrz26u40ktocwk1fn0aeq4i88c6nb2kgsitgofi19r97khh759kqhc1fmy9d1qntg5vip55g1amvjxf397hdd2d58htcorfqhtisy7veap29lpkuiuk1zkk5vq2l3qiymj27vlzx7m85rv07l45h2deaotcqsmljwndubmh7mqui7rzgexkn80df3uthxyvf9h2r9tgduzy0n6qshm97gqszt47cs5mbf1awsfm9o4ptrtvao6pzxl26xubetity39aj5byv4esv1lr6raqqyxnu0nqu2wsmpmy54ffa15znsqpco4ui',
                fileSchema: '3bymaka45xhtych9m7353sj56eptncfuc0rl9j3j98eyr8aqqgmgont4dj3vajpi4bg1wg1uaw0oqvnu3eops1s4kq9ke5qbrlcm4k0rnbb0e6n6jn8b4cpl8qsk2nxfc48mcd5xnnmfat9g1wax0hdy2v1csm98q8iqgsl2ocqbe0jazbxnv365k7exzrwsvujmcjesygpbzckt5wuezogxgag9mc2ty5iwq4w5cssjyepboknqtnsin3eksxkr1g74s9eeeut67ceko7yfmuph3ntmxwwtxmat1n2p5mffp7r0kefqvi9kt0loraijor1l377s22jr89as31oqjzhm85bxcaw7ae3v1k5r7nc5jf0x14o6gnrltst8d5lis2198cid1pkw3ok1ix5qg01vag2quygf09015hj815f04gk4i92j1u33326c6jb71gn5gacgzlo46il6pti5ik64a70jjkedtox140022xb8fhyovu2t6pfgm0b8pcpcu3qakd139b29gqanp6u4mptuc366j1ap65zc9xrh5bex99khtr9kytugan7y4s9hi9x09dqjt6itxmvxg2v79y6hzg6wtmaj47mqhyxhl6l5cdvzsrif8gyri7jozzf0kbnpi94q4ctgyq7b4quv4hnf7k4r49l7qwr5s51jnomvdbv8csu7nrkr64i8zuo49n2jjvzxhmkae14alland16po32v4u162f05wlkre9e4att10rdbdnfav88ts6h0zxkfsqvgo3yfrlrd9jcvgifm6gpe4nv167un8xw1taijz5pbiqoe447azfh943v5apclunhh8l2j9pplgccml47c57e8elf63vgs2ewzx2qgxrutluq9w5l4m970rzwsw0l4enfsaqe7yzkx1ccdbm2bkq2eplipbkqdv2tw71pxvanftevajjt4a1zsc9m0upyu2zvw5rsyipwlumxden5zngkk8rv1q0z95kwpe8dbv1zjcoa1ymbixj5hg6qq',
                proxyHost: 'zfeizovhzz5ozfo9as3j53m2t1qm200nlnd2v0pyqfvifeuyh0jonsojncpr',
                proxyPort: 5695947994,
                destination: 'b80dbpdjs036cv866gw1ub8w635rwiut7onh6eh8sr2xmcjvwo28p4ujooojdzlg9wxb2cxt16b8q35qnltq6ytmushd6qjzw5lwxef1qjodzdz90hato2pk7pv4s73cqbafbaz7jygqdpsgau1b6t53vpsp2xge',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xcjo4bq4g0b2c2wde6yitjc9up5xli8hg63y9mbgfk6i7bqqnjly404mscckps4r5nx3kqp2iqqxwzeyrpxtvubkpfn48m4orq254778bh5vp5vgaf3jpv66r4qrclz46sphywrokr66fp4grtg4b01awr69zwed',
                responsibleUserAccountName: '0vb2moshl63ynkklmgqy',
                lastChangeUserAccount: 'phsc2451excv1mvgxkj9',
                lastChangedAt: '2020-07-21 05:37:31',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'vgnmvcnf70yd1xwr8atysd4uohrwryanbana6jkrpnr4aol4rtx41blo96ujtzt1ad4x1zr8mbb0fc2ufsqqxjth9l4so40otm0f6zsxzc3rmvzhcwqbr7moktog6q7b4ag1uq3f7ssbip8ouerzigtnuzvr160d',
                
                name: 'aqu9v7gzqod92qgxghac35sanp2tkfgy44i0h9jc4sj2im22nirwelprihth7mr91ltp7pdgxshctbn6rvx0ob65db6rz8tws7h88955qvulslpxn6epvyv2ikz5fqxuhkoaa493lc93uj6cpqoju1e6yn56si7p',
                flowParty: 'sb1fjkhrfgqcp5hlmeto9de3w0dn51ek9xdwzljtvu8udcdsalofvf104t543t53fie3gxe65oj9biwsyi7ck9jlildxcdpl9o511hg9b87ajb4gyab83ij73vndtjf7gy2p0cyc6aq5l90j98swut3c63eewbg7',
                flowComponent: 'yj7s5gzhq1bgdc9c330ibs0ijg2ujcrig4vf1pbakdh9ssb8oeb89rg533pdmdea0yi0vq4oxqmr6hu7vwmyhh5pft82d7r0x16p529zezam3f90wkdxr4bx6ac5qpgzembjzsek1ws0zwk7h38q9n0mnbanix6y',
                flowInterfaceName: '25s72pbsdo2zl2h5iifektg26xa02wdqqnvdnvkp1w713gipuyh1n58nayegq9gaxxpnv1gfro6g6ajbwq78xcxsnycg06n16r3bocht83kz5ic1fy5qfjl58lr5v4egcc7cv3hqff1t2yzxw7krjw3kt05cg0ok',
                flowInterfaceNamespace: 'hwar9qz4h4m2azo5fydig1ghvgdg8xafntxxxiof3ry1s52drfehvuarhln8ihf615vttbrxxxqa83qjzwckgb3xizercuntij8jz0h3adc1i29r47tq9j75lsi8f70y41uyjc0gikvae69800e9ehnm7jdlh6en',
                adapterType: 'z15jg2xjklhj6wfj6lirkw0a4ebn827auo7jlfw5p08s8l1lylyj8e3jrcvy',
                direction: 'RECEIVER',
                transportProtocol: 's2jdfobcubzyis1sai95fpms1qv4ywycxku3i353nokl8tod9784ro4xcfqt',
                messageProtocol: 'xf91ahbz975hncrtyyjbb3whmd8vcdytmfawlit09c9n3z9mxw3dzwoz5fmd',
                adapterEngineName: 'operdpkvpoi33byfrl0ou214vuomxnx252vdz5iiaumk8zyi36m2qghp29slpo1lwayp8fcyivzbpqaqabswrfecuz14iwavfhdcpvhi4yvj2n6x1yp20s7q5vlsyysmh8fugy873k7tog74tr55xtk0uavs46dx',
                url: 'zcuks2zzmigqzs0bypt87ozlatm3rhoyi6gq14xdrvfx2ow1a64cgh1gc8yr8drx50sw2unywprxwssbtox9se33k6mon0r6kzefpav30po96dacjbi9qrbwlxveeom08uqfolkijjc8kzpf79q9cs2oex6euly82febers5tqwaytvgraq6k4pc3m0xkabq9xwxwjl27h9g7xr7dq7ekc40u4yz1l6p5yp7zr4n3uxa25ks8vp9omkhfk1ligiugmnazjk732ph1fotm4n85jz3a1dozy14if9m272lrdzw8omn46p8ydvrx0k1g5ns',
                username: '4hwzegmr6p92gma23omgfh8es4p3r6zsly7zz5h6kkhz52ci3u08wr1fvuyv',
                remoteHost: 'ka5rz4fu6d2sa9ybl79zm4snsmzk81orquk9yutihjr4d3f6ru7gez5p4n1mymmb1k20tcetvlvpu9ddn64ykojujxn6gjp3tqrhfaeh22e0i27w7779tk6q4oaxdoj5hl4yuwn96zachhdlr3omw6paky5c4sna',
                remotePort: 6997219846,
                directory: '7bsf6bawxf54yxux8tchbap0ggyamqoydbqx23shwslpy24qog6e3lz60mri8ev6fqr45o5jt6vqsu8iiay5io7kkrbs131fnm0za50djdy1zs19r0bgozfskr0ylwhcl4wgpy3berjyfrebtlu2p8058fylt066rhp1n56n9tj1gycjfmb7qm6d51hjvf7outyxhf6jfml2dmnnobqu6cbx7bnyq9enra619tsyv4mc3dor81ghfsem0kz8uyfxy2sa9db2hgqkdw2vzzd85eebu6dsw6ya53hbeol56v994mw06pdn78uu2xfe78icwakg3lrp73t5g4pjkmmrp5h3fgqy7qkhuqbkej7p2lzg5e3xmwllwolv2lvjyfd51wpu7gfz0p6sea986yl42mlxhjxewzz67c6sz3gqw0jb2pzsbbrxitpg1v2q3rxthk1ql6owsdlq5303h11cd83v0fpaj6vr10tm8njianiexbaq5e6wij6qcpze3sfmlxbmge126l8etmbspcehjrd6n5tst51cc3p8omao8a89aztpo69hz7wv77yqhrvl8iswzshjrf9z45mt5b665e4cptsq9keixk7wkjrxf6xcqbmr0g1pudig3b0h5j7v2hnp8jv19bvg1c4l2q48xfmsb8hdj2xiqgu1xajoye4jpi6ygcvpc8nhjrdgnxe4dfzg9snl637d3fo8pb8otw9cz3pxyjhl0q6vipx12f5flptwkmggd4i147vmj5eyiullh1ks5snkuzshfbw10vcqrkk4b0a0ft4yahr81bklzdu7welg1dc3rxy57xe49gd7wa8crr0iov2n2t72ccmjjbx9d2je87egtr7ro4rnn09o85brcol8690h5fykdlcy6h6v9mczlg4xwe5etp5wmjbjwu9luljgkmxdsw14wxru25ds7ltmnzmcqbkwstpyfy0ixz4x00eg6g58geep90jxln6o277jny8c1tvgu9yisj7u8ncuj7h9uw8r',
                fileSchema: '66wpum2wbhvrdwwvxgo2wz6inqfac8p4442u3e6byi6z395593vjs822o9za7z2e9ht5odw9t50qmuga3ewveq9fhmg2h4yfs63hrvt2zaf3l38iob12cuupoowrefjnwfj8hc6vislpgryqi09sxb7u8jla9y85enbqre7xwhx4usc69wz9i4fqy4m9dqigqr1l45npxl0k2l3dd0u2j1x1rtmpohntwhdf2itzb2oaai2n7tosn4v5j1dip7ea95cqczimai20iukk1vpvec38743ghga361tg2bip8bgls718saafkirdzcetvz44qih4lrjz9mm6e9y8lkzzlkiz63qturx9svfracgs3pc4vx56h36woi08cuphjppfrulxu63yolvr2fsmdcpuylofsw3uuhwq668dgceik0w2vuwa3uujcfo8nakwz9d8dee79rriqtqziafytqlorv2xqj9np7nu0ombre6iagcf2tb62t7ywz766z0vou6bn0t4u0zbb7h1xg9vjg6kw0jq5pyiaybkb2etrlrs2rh8dfkcn2g01o14veag7xqwz2m6cqoavcz9yuamjmbo8hpnhtiai4szur9ye6356njtz4yjc3b4kl6oqc1vwdisd276bj9hn74vmwu4vdth42avjer1r6orqqv0f9jeadi10ydbjg2n8ws3packyjfjztqoazk619pbf6z169uxzvwoxsaswcgws8c8znkcfl55651d8ydii3750nu6e4q91aqx67tgu2q7go80sur6akl7wx4myep9jo1j5827ilkmai3377ri4j685fbwg2tdv8s153m9ep5781bnj6yupz2cywi0faxhon1y9imbt4yg47j7ymojiuirqjrdb4a7inbc345ckc70oo3b3cldhhaauedzapcrtw29pn3zahcqmck7ck4xu7bu2kjz9bqi1rxu3a0tjbpekmgnkt26jit9wjnbxfoyauhsi8uc7xwrav55rg8njnt9jukz9imv',
                proxyHost: 'v4yf2snr2be0jxcf9ftqchz9axe6ytm5n90x0fjueb719gu6p5spsaqkmidn',
                proxyPort: 8422792687,
                destination: '89jo05fx7yfqsy9gb7iuphkrlzyhcwvou6fagv8sgykzg9759vbro15wl9b3nditcjtibsglgcan5jy3miqsxvj7bg5cah17npoe58z4eefg7pasionxp239ef773xt70whx25dghvrdfduelp6vdt376wmmp9ub',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1zqotlaw1g2ktal4o0otu6y11hhegxxe0lmk87aob7pfk356pwsdn098fxv0ifhho4hq91p61bql030oe51w20emzjfpl9byntr40akw7zj2t1twcutajb89ogchcs80t3u1n9d9ezmom7oxr1zejmau2rctwxb2',
                responsibleUserAccountName: '796ktdkazdzncaselpsx',
                lastChangeUserAccount: '8ixrfo6zm7i2hinbvryy',
                lastChangedAt: '2020-07-21 22:44:10',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'zrqbiy3terjh821wgxolxikfn5slp965cdutki70mi0nl8ce1ebdyc2qbbraryy33ogrquge6c5g0z22uwbaq7pumb42p2y5adirfn0ibu01ri95auhkmeykb528ksu25y9jn2asm0aovyld221v1vc3bbbpb95v',
                component: 'ueazvuaxmri41bmokdreqh1jxkhtuzmw2r5sjr506r65l1x9nxzcydw6543sk4bhpbfhf50ar3ozs149yjfblpls2u41lfhcz0p20aen7bc3p60k2ryv7rahaavq21yt76fjdo9mvikotgmcu2wm41s3sg7wbevt',
                name: null,
                flowParty: '0ubucd8cdgpmmuqnabqkvuqlx0v25s6t00opko001ct2uwoxhrx7f5gd1xy2bd5kq0bqyzy6yyss7sanrtlb7ay61fegxobpnwxe696c4cc393u29kwueuq4qa06omr9uj2s4ee03w5u5e8cgvo3f9x8k35l3i8v',
                flowComponent: 'l0vm69ykpow0mgj9oeov405e9a5uxlnz715izzfdcgvybtp3qr57wltxf8j0retfr1vdlzu3nlg3md5ckd0rtfrlvwq9c1zgz0up2ni5zem1sbqqh9taurfgreun60bm4dt9yavejr8qbwfylet3n4nx05gd59wf',
                flowInterfaceName: 'v5423b2pymdywu8ksbcgd5yc621x702ul9xiv5ja7l73rdn71eykfoit8po3fj2ordcm29bwnd4hyssg7gbnnvy5mfion3f0jb4dwz414zz01pne2u5gg7gwr8jz7smvx0b454s4e8036y7q02ov06tspml976c5',
                flowInterfaceNamespace: 'y1em78jz28sa7ow89wkj7un6soy1r78ohrkjj6map8wj72mr2d9dsrggkimanxmmqqsuqmg0fphuf9pnfluxnbonfuxnrbgrknemcznvwq7tgcmdc9vqozr9aixyh2jdqmpc4tdx8agrflhkup7hstz8j7y9evtw',
                adapterType: 'qea96hqq0a32sa9ubrprog5t5sqh6ag4iotkpi9n6l6d40l5eonc771uxhxq',
                direction: 'RECEIVER',
                transportProtocol: 'wzyw55xj9t04ml3c997vgym3gfe8fhio573zedg20rc92n5euozp3eni5y3c',
                messageProtocol: 'mjb8lh73obzx9u2kqfe2f5cdyglevsln8bgb6qmnj2622kxifhexuz8aj9yf',
                adapterEngineName: '7lpiaqoio48wb5n1nkkztdhvx2v5ncqrsd6y8juruzzuh3dc32od7xqfy4fyiyw9rn0cgci7ekw91ntxx41pr6v2ktmodwcxaovel1jm6vr23k2tt8g8eugu27u39f0sp63f01eyoz4nf28p22oxq2eor6sqd7nz',
                url: '93bvgr8haqdfd0bcghuk37sc4pfj9np7ga4u0yk5cvvp54266x35i325yro9bsh0z30gwc1zaoylidherobqd6vhifutnhzhep5y7uq34bc0ahvrykt9k8c2xfcmprhshx1vwid40w6d241he3zvrmev5y25drtj6uhjzgwq406wupdydngs91uxlyqpbp6oy3junkkxtwg078le3hwsu702c7oozhhjg80a8dcpuo2qyxzbv2ofyef9n4njenqrj9gkxsm0sm1pg4lw23hzrjt73erpkpwi8kbejgoey9o6ubskfk5zb8ghqoj0u4nu',
                username: 'jy7umx48mln3adjqxlkr9dwimv94aetsd62olmvdo34r29k0cb7vvmbci04b',
                remoteHost: 'vc8jsmr6j80wyz15kg4zsqpnxda6jyupymtmrz283vgssjlndqy4m1nocpuvpjbxr7gn73bpm3m1wzvhuzu8ljiqb6usjwwmqn27jtxnuetsgd38fs1zuj7lcc4stbajyylyrudxu9epoi3tkk8gebbacyznenek',
                remotePort: 6425632317,
                directory: 'c98yhdzpyp0w6hp8sha43qmf2jthchs112v89rsba886hhuel8ca5szcofqfbzt604e80iqbfy14s27q78p4irhfnvn9gdboinmvg6bzt05mx98shl5kcdqml0gmdyus166zr5o6vl34nstvdcerce6sp6vu37qh524syvkdrjhjmqvdaryaqvyxfc7772ipyn9mafc8f8r91psxroycahqz3kw0rvu2tg96q4dcwjx4krrh0nas62n9nd2j6b253ol0rv800a5j02fsbmjbtjg27gd6tjq4wim6hdlmnwyvydj92b62p97iph719o50eyl19lezmmzcyn47zwgxvyugga1gydcjuwoj8so73f4z3tmgjbp5xo7ffdml89zf0it3y9m2wozzftxiuiyek7xc6aa15i4iw6dr7zl6tone3yfx4ggmtnxvotb0b2a5ql5b78g5novxnzcypa362669mpe976hm6ba85rhblnvj9bknoqw9pmz2pmnt4igh742v4n4q8glm4fylwq4akjj42td6xr372xsiagul7x2ynvhgp1800b0dm239r32ae2ivxz89ek1vhql7uk88n5qqgcvosfnmsms1nx2s41zqijwigkfy0g0z5818ffw9tqli2mh2hdpivufjpw816ctfg4g7bv7vne0h1ot1cnklabcy3i280ltg97q0fofiwyekztdsru5g04o1ykf3o9htcydx753xmhqvmalvwxntp2vl35oeo0z7j23szeabnk81d8r1yppw1w44rhxlfqo9o84kjw5ms6k1917dnhmlctnkml2f7zyu3amt37ihtf5u2lkvldkqsvi21ib7wkzdw3lo661tfd3tgyl21hf00zkdaf6mqrr7w7cgjrqoos7gxy3i89sqm9lp908hkmtr4skwe2gr3ltz9645ce1l38hgovliyns498kqh2piu95j79sydymjqjnrim3253fdgsljev5ve84pd5anxt81gk5wj91a8yhdtu1y07ls',
                fileSchema: '62r3hofp4vw891dkkpvsg8xxluxlrlrk9wp7u7j3kshfmeszfux4kfl3cdk280573jgug2up4xl28rvfq7k3xkmk2g0yfrj7k28vx307zvfh0ktwb0qc69i9r785j0d2wr5y9lnsxj17jlyxiojzr80c14lxrfq8gltzyxojful5nypzjt7dr1syqbuquv7f1t079oqbhv5r704ochevtqnxhajgln3d9d2dqf45cjiy0nkid2zxow3tlbuj5afdkjbm2colk2jn71cu9gk7aiqbz8s03r6agxpu7wxzvkeix5gnz4235nu3ts7a7ytp0or16jdpaqo5m4dhyutrxxysfuq56lcbqgj6kmqdovddb4kmb8n8t5o1arudntdja0jgok4ox347pqy7as9b0qb4oa0306a9j3dhxdjujuo25h2atzja9ug3u7upzg567gcg6ei69ey5zfrva0r0wxk224upyahn0huy8fnlvfh6rddwxh3qoiva22vtau3wsnfs7ll7i9d4rmlke1rhjngz1qliuwmelfsqmiq0nycmj2h5eq41n7iq1wzqo3rumffqn0m1445v4korc53pmghnl1najxawmhcn57ow1jm2kei16bh62z68kmy7e7u0aswnz4srzmgp7tex3lhfabm1zex95b5ahl6v0u7atezndl8uj1w1smqdzic88wors8icuxj0ei6c1vi3xf07zisonxssqlw6mjh27zfn0o8udyh4st7akncaoyij2edp7k9nmlyggcfpexnkr82xnq2y5mwml8xyvp6c7ghldstzgkew2qyldqs3tgtbr23j2b874j42b7xks6arg76t1f5r7befox0rf4ugygyd381nokttk6p4kaj2v36aojhkhfpba7wxllisqby2dcn7zivndxaxh9a2bhb60l047noqyp8l8qmeuhc572230b3sixf647q7edcvjvbyzu021co0340ybq7eh0jv9ca74y2ln7ge5r8bwkvpovwfot0g',
                proxyHost: 'ge3soob3p7y3kvnq59cfev6b50e3mld8llnf2wyvy0hafss44b5wtqvs7zrf',
                proxyPort: 8662301767,
                destination: '8dfcnoi0v110w0hl5e8kolbm6raa1rv1lhy32axtk8sr2n45wmdy0ueysxout9gyc1dx0e7ydi7isgsmnas7uyr8niqzu3xvybouoykflyl6xpntfdukvmlspxiqn37dvy1y59ks0mepyvu81v08xtso0x4k9ngy',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4debamoq58oyc28wgffbo6zq5v0bycptbmsiupc8c6kxa6v5vqe66rx0w9wyw87m0uta09kicf2ya7y7wrnfc4fktu89bam431qlazfre9mxrxeplfc4qkbd6q1g5v9mqhgaoyn5k2bwnxaywnbz5jhxe9alc4ai',
                responsibleUserAccountName: '1weyq1c5yrqj193se3ho',
                lastChangeUserAccount: 'vqfir00swmzx9a6o2yzu',
                lastChangedAt: '2020-07-21 03:40:14',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '1cvmt8tehs82kq6h5qm5sp4qzpk2lwihms7jyrkbz8tf8kvojo4sil453ai57ov1u36y63g5hawi7oias9sc5akyb74punqoj0h9j3dd2r5xuguuep4l616utwfkeh8v20qtyqq5kw0p5h6gkxn8nzahmbtvgov4',
                component: '3h0r3ol5tgw9dbi2t73ccgl0gu3ezilw7ng9ldecc75r5ntdirb0lu7eg4xge80eazrs5vmizlzyjnrp08r7v96rzkmfsfb15bsuy8mdugofoqntejtmdnhpt12idlbpyggnk61bmm9sqxvpxseorj17sz3o25tl',
                
                flowParty: '5kygy3d5oyu68n5gzc0azuxeiqiiszsyso0pvzzx1jn3e6nt1yiw2dvvtlk8eag4jmtgtelbkn5mcafq6rpyu9oki7vm1f20uxnssf0i4ln0ooicwx2fh0xqwl93fwg3yqijd968649bkuogxvmj92oah9go4q5m',
                flowComponent: 'b0zscjulrk35ux5e12gyn0d9oldohs62pvmoievuclgeosce0aqxuq17qetxmcb60gln8k8j0shjksyp5dsp0wqnqus0fya5zguh4wxucyhffj6a6pup4dml9olphdq8t8n7m75mod0xlc0vq6m5c9vz52ng1a79',
                flowInterfaceName: 'bo36ni101d38xiknic3membialec71wsfohqu46trjs802xqy8rsdizoldrr84jso1ipmk5sij4dwj2usir6uoitz7ut5hpgzschcrxwtre5wa29mxctcq2e49y1j1izec7rd3jp39ajueuhvc1bduh2nziyzygt',
                flowInterfaceNamespace: 'nrzfei6ens1efolzfnn1x534qofcr6o7adt6lmfbkkkr8uj71qfcsm37chi6xak9p3iwf8tjeh6p3m2vq5hd6t5sfvm74uwjfvsnhabii8zd66e8qyiz1z1luiy2250547t8qmqflyy0txbaekh6t1v911dzd66k',
                adapterType: 'kx13zo02iba7ekoesjm0n46cn3yipw8rmecf9g7ysqwctc4vaouzsi29xjq4',
                direction: 'SENDER',
                transportProtocol: 'w294rz1rhw712ba06t6roc99uutkph3fewg2po2q4ydk4l9qy7vkegpmiri8',
                messageProtocol: 'eddkfpki8uwn3lrcq47m3e7wce2g8gomku8oljhah7no0bpyhxp0155haz2z',
                adapterEngineName: '8mophtzqw7g5qnwsp2ez9116d01vfzykqgz0itkkjm94nohn99bbef4qutwnu05ox2lqkbopsz7h1oqn1comphv3acjpruzsn0o2vcl1c3ce61wrups2xicnlr0icvv2buuiiwnrqaj2q27lyix6jq1fcjvcs5ky',
                url: '4xnaz3demezts759xhuj07hpzrd79vsub5pi7chyq96zqj5a4v8sze0w4lh9q9x0h0v94cfjalhkfd0un53gzeimyo730ohtdsw7nog8u6xiyxcg23u2aapdajg5vl39fhehq7d3nr9xlsdo18iuvohs4laghl6ho41yg53k5x2rnasnw7ukvhlhy8k61on0t7o01zdabh5e0d10zedlnq114460aiwlnfd4nj0hzx03y8o32eez0pc8yf42e0cutl21j173o31vo6kgajbvpme9piiaunn8vmskygp2516izzv2gc5akix8i6b84vtx',
                username: '1u84j6ug3x5ylnylyaog01n17loasldhqq04wp65y07akvppsphg8p41kkhj',
                remoteHost: '7r09uaz8m11eqgioy9vb71fkazrlf16ul43t56spm1cfrh3gyfkck8csqwgsz6nve93un01dkwkegoxlq54e76af7phj2uj1gz9emj3x4kxxke45me0b01dlnrfrbdt95crw2t60xg7idzm3ukdadw0mhbm2y33n',
                remotePort: 7139367747,
                directory: 'ew1ssxuibf47oz8z4x3dysjop7xo0hisoal9j67e1jmdim1nsitd4dq31rgof5gak7f0j9vtxvab53hffkm036es6kimo3j72nxfg9q3340f9nkpe5a09cdqmxbq020wv4kkdnvqrm4996xybzz6zh43cp2qb67nrxq801u67x7ypv5uw3gy2s75fugm1ckwdt2oh4s6qjg6kn7d7ejovib93x0nfd3jylisizac0gqodkdadwnzl77p8zpwfi8c947zvf5ccqgx3526elht2h4cqze1b7ssjarnoq9q7owa1kq360hi9jdpgq6rc5wbt1bgn21w84arzrqgf49n4q5ko7y8p5mxhn25qjmhj2ksp1giuuhv98c81d1sj13wryyxor8vg8xgdq138920xzfsmdoi8alc5qgldnft5nbqheg29v1391jhklgo9ezwe59jj3sj5epclp7lijegsjwdqf2tf8l9fumpn3c9g9wczym2k3kzvikvsclxwug2mu7p1rqkw2zxn2de4yi28z94rcit5a8mfoss7p2e6v3m519zcil9h6r04ejzl6qflqvxts4dj5y01yq4gn7lvtxg62nthxmhwsby6gwlxu1wmhp6uqm5bsv2pr6l3idrsxuks5litusv32l0tmuz63c7ntpcifpzgay6kpcux0jyim349v7i41mv5pftako1n4hi31zdsbxv43j1w5l7o7ugq8q1xvidzxi7xxnliw2wnmyf8bafhj3w13kqlvv3u49briq3vtoa28rgs3de0glgkdzmnbxu3a5mrk2wn91oaevhapbh5npj67av7znq02ja0u0bmutbcl55mtngslw46v9ym59ykitpwem8zd684y7sv0fq55tyjrrjyd6qnvlvnij1aff1qiyx0k1b1e95f5ffb1wkcptpdqxpac9szd9gp677b5h84qbksx5p3dm4746obe27pt62o52p3at9hws3820pxxi136q0tz95rrgy2u10gxtiwzfcu9md',
                fileSchema: 'j0v0vxg6z4f1mtog5gwb559fmyk8i37kep3yn7zbgudv5t9lwyvgyww36nln4fovapwbwfu0i4rvexst8ir11eqwqekf45dovuw8okn8up9v9bxj5moru6cyu5jr13knk8m99x2e8v2t37rrlabv20s9fqqld54et1owd9h1v5lqkd84bwnyrxbbhdm3luj9xi4hf655m5mv01767pab7j786zw3kyquvdtojt4y3e1374d81p3hxpi2910rtqashggco5vmtxfkc3ekqz996x4kypiim4nmtq9t91qv2f12vfjvm9n9q80j22zvxy0vpwcrhv1ox1x6fy1lguvtyvjre754yxlm1ukicwza2pefn30luee29evnq3qshzhg0lwyaknkmn6j89kaemc2v1607bdettgmxi2m10mkst7z899iquuxf5zdfxt0sjj9cqdi1ab17p2bxj6wrbbru3jy7cg3xp6bpy3j5158hcqnnnd3qm36i8cb7m45ap4qoo03m3lbxs2bri8hoyy9fdk09h4jwubhn3bx47lnh7wv30pwudx92cul6ia4396rde96qy5d8d0ed41z82odaz1fmxfnym6sqp9z1mwc7xokapx1l76iozmadsks2913x6od26p4878qddk4bk0wyakyjxwyhhdlksct2ogb909egyhknqxt89xgo0s0pe4g2htop09wvhfcjtqv6wua36i5k1lqg4d4sw8csfyp2vtswuzeax6aebngq6iui6gh6h8zj72tqm6cae9nboa4d6ty3a31x96v98eckn20vqitq3qitwicyy930hex7w6nty17clhnb9zp4dgc6h3rlg4rd8ddr0quwbt0hyccbpv948jojiuwb5wjubv4a71k72etjcj74plrfhnodewbcplkxgxob75wac17covo58ozg4l9w4z6ek6ai91obu7t0shclydk4i16sgvqydx00b7et84pbeza50vqxgxq5jmux78hhjmvza7ebfsfppte',
                proxyHost: 't2knmop085cmlwc33wktqy3jdfr3dgnrrtyzktowbciffqetlx8ym6adbd2u',
                proxyPort: 5282369171,
                destination: 'fgwu5ezby38k4lsdgld6zb8l7j5qwsdy6oa8fk2s558kgu3gv50abxctyf9fos22rpmzgnv5dnvrp582rwj0nmtbfhe80ed7mkqj0q8xy1474egx9jm3rf93v3a6eq8szrcvkxgf0x2p1xckspc31u61pf8bjyz2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '04w27lcu0674q8ol1cr2wx7yk60trcego3ky1dec1n8ucnovh5ypkyi7r7vqh55kdkvv9ii00sitkbzs8y5rvxsx71ie60xfz3twghkn5oumuy2sxhrfst6rrui0zysiloc3zpin5bi7id3pqkxb8x4d09d9ri6s',
                responsibleUserAccountName: 'e5yuvcpm7mrp8uqvvj8k',
                lastChangeUserAccount: 'invdawxdydhg4egn7jg6',
                lastChangedAt: '2020-07-21 21:14:59',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '3m9rpn4n23rxa9oo4cxo2rflxa97gs7jobr4bmpeue5kxtl7njvszjhzj3g4wc11etahpnsp727g1d789ewe0904v348l3s0icjy879r4t4yjzg5wecfbzz4dgmcmuegvexbgevuxsx465gfe176od7pquwo535l',
                component: '9rusqofogf767d424frb2a0l0lyx5e95ldb4oalzfdzdsf8b94m8vx5426nu0rwoblh0dppdbpcb75t9t5wyiufi8hvswvbzk5zkv9atntbwnekaba78f96ooz2r2ni0ngsaxdw9vxhtdbuqork9hq9lsuy9c66x',
                name: 'lf3kf20209yzf49fhubj0ckxc3hc1q579new0g11nikhzn135rjno0w38p6nfz4i2l4wgdptvl1g6q0tz1csjl75ib5cpq65dty7msmw38cwqwdion9hs9buryp51kzblfbrvuk3u9y7lq6swaegeogxkk3kntv3',
                flowParty: null,
                flowComponent: '1jco3egfq262kz2j67qt78yr9muus7hrhawblnpy2bao6beiw8gitprmhneyad480dou5cwkv1vcy5y3pvk445lsmpdfmdr20dcny04cubx9kxa2jjyze3kshfcjgaoc3h6khzmr0ck0n3kud23d5uj7hn16m6g2',
                flowInterfaceName: '4uenotnaa53ywiek1s9n6jc4w3o38ifpi2or1uolqbe3qbjt1y8oc9t58nl4hs8vgjgqhy4yzv8e9v63fato5mgb4kxnq1yl6ze8lpr45hf6xtvghuqjauq70qetd6d402yus6szuwxecnlesav6rp9o69l4ap15',
                flowInterfaceNamespace: 'hx9xpxh4uvrf12emytl5wkk5vbvk6n3epsusqmyd0aywcqkibequgjp28wm5j4dk1e2nvkh2fuagwxepungrrlc3pl12f6pmmbdtfmzcugyrhrj6itufqpfqrmmmjmmjp94tceui4y0f45m87lymxijpb6me2j3t',
                adapterType: 'v8h3lsa16dvr7wlm2empu2uwfqnbor4u095faat7kwg10qromqcujvc20fmr',
                direction: 'RECEIVER',
                transportProtocol: 'llsevnlippwp6x08tjz4yaxga5rb0pshegrgoft79ptzaiidohmbhtp1zttu',
                messageProtocol: 'z58mlj9y67osiyrna2eo3eqxjnlm1om29gzuvlsscbsfpeetxtva7qs3acet',
                adapterEngineName: 'r2zxvtbby948u52khruokfql4aj5f3f3ab39uib88w42cckhxt9n7k9593mhjof87da6uz74im9qva6b2kvhjf0vqz6oqf08i7e0bmvfd8ca7463tn2xdqz1grwt8pmsy8b52xy3z7hbxtmhcko3qnkm536vezor',
                url: 'dd53gycpuluc8t3pi66k3s6xzd4p9dod45veqfcz7t2wpgn50wf9xt4lwqka3622571jb2pdqie9a1sokp47g7p9hjiehdrjtbdf0awj4e8frhxszkofu3u8x7d7de9037zwmzo0ll84maqt3fgtd3qu4u4uktxv0nqvjesrc66w4leqwriceclmzph18zcyu27i3lbtx39unk0k7help5g7p3jvnshz3dcmzy179b59pziki0dz0sv6p43wuny4yiqwo45svk6yrldazlgmezskf6lb1qql0j2sim5excfpod5108v8p52ib1j4efvg',
                username: 'qlvcx3cjp67grkvaeskmmnfc5fmt39m6iuuckv1ejnelxczrv9a4wwdfgm2t',
                remoteHost: 'xc0oh8ir481bv23kd5rgggyjcrr7o2l8sm5acvou0900j8m95wsn2u9mb97uyc9ej1f121fgfk49sirjnffmbakcmg3drbloxthxdabiqpa4ergwdksq2itulno6m1oxnkmjae2l8gau73en3asg022ji7vvvowe',
                remotePort: 5251216721,
                directory: '6tt24s0h2taeglhi44xkv1zr4wvqqda94hznbsneer2540ugfj3a1q06p865u85ytt28byz2x7z0lmogi3z7bfjpu7y5zrmhqylvk11279hmwx3vtmmrqklabfx7ddbcc407jvnmxk7opx5qjkyaknm2p3b5047xndqn6fh7h7juqwjlrp70kcq61ow0zzjezy2sjok0x71ixgfkt2zea0gmgrbogf1ekyg09zj0v3be9khujqzy4fxdzw7274fzbqzysphgj23bzvftb9vpkzg3cluakamuss3qlgzcv1lq57pbtr54blk8a7cgi2u78syz5f51xbr2h1ger3yut1ndz0jz1anfre9xkg891f1qbmxojpdrhuldty5x558vjrgp5dbnmuyjy0ui1n9ac6p8ipo9yp9j5zh3riqe66lf03ovh13qkz5cjua8bx8h704q3gc1fioim9tzwa1qcypmb3rw09ft2vqymifpoy7m6e0dk9dwrxnse47n02ntja64868jlct832f7h76k2dmy6dno8humvbd8skl6shv20i159kq7l94mpjc9qlek1l3b12d2bccnz16773uom4p9fmlol8uuxndcbhju1s3509n7sl6ozdndu2g80nxiettioqtfsm50fu64hqil4l9w7qamflg18r0k7pccz8ni7ybp077agn01qe4bf17b5nwsl11s248dsf5ad5rtfp95abhrrth0junt6yv1l3hpclfo7b7h7gfqe7x21dmebgvacjgrpn3diajy7p3xn2nk7wljtl3tf7xwot7ppfvnvgz6ibh4gd0lon4lc9p2kx7121i48fabr17pbmtmhatnzcrbdle45quq60gwy8bg8oimu66csl8xa25jv6zn7252a3vi7lduammcl3vlrzi7rr4epzqhyz81njfv4j8q70zl341mc8129pb9w28abb47jj2xat5oblat6ta2bsdto5alrelf2wen0vz1sew22oj1ypikia0ikfcu0wlv',
                fileSchema: 's2qrxrn56c4u4j8wwpfzubz8xzu4jluhphcqkc2nruikid7eang7gvtigym6ekltf0jy26gmi4jr7ncpy6mzo8l0mw9keubgt2p7ql04hwfej7qiws4kc49f91oi5s63zvyp3li73n0vpp27s8l28rfqr7918qo8urrqk2wkxm3i67i6xu8sic3lpaoakcvfi0hxzmin8txw15zcq34uy9iyv2jrekijx4b9qcda5oenvptghwxov05g1khldag092re9dq69tva5ilofxrsll62p2ufe39zs7c8dt19vqmcsw2iu8h14flrsdp2vesk2wv5f8e33vjni2194y47uzqwi90a3vwxrok9tlk0ekfyxw9mzv06n9ozn0aa2yp33do17e0vt7964dtdqk86oykonlssco5s7zcpj1stg3fzfb8ph0c795ts3739tpd0bxtdq33b0g9mp03y9rpjckht9gmqk277l2oh61symdy1oz4k5uie2ooqz6g6wqen2tluh6oo5eztzxrtj3te8cs9zlryknyjjfwtrybsomwon0cj3xbmfpvrb9yyggwyd651uufvos15t4mrnnv5v3sx3uqcr8wymjsyce58kukk1j0xv2zaqu8uk99ihtmspjv5pgimx15nfk3vpx57sjwl1ur9ykdai3txrk74xplduvf004tq7weviznbeze7jqip0w46vhactbavht4x274v1j3qy1add8ptaaxef4erge017j8unwbn0jkbwvhi5sfmntjq52lyt7ija04bviwdgdnefwhf3wlz14fsw9ttl6aqaduco5ik7misv5vqrpv9cfpesixji469t5854aq4iwjcl4hy7lm5s8p8dwyko04lfdrhgdtfr683e1gyyah8p2kkozg6fy28kzysgurb4zkhxnzcaehw33bfe43auzs9uc0ltykg3qz90x3lgswtrn1uslin82tsc1vvedb2tos5okz9xwsx69oaemxr2d50yd62nlmhyvnq2ah8',
                proxyHost: 'da56xyebb3b8ix2t5qpkcbw2i267x71yau5do2r9rxbr5rbfgonw4rcxn8cn',
                proxyPort: 3570754568,
                destination: 'g5n3qfzdk0qf4snkuhlpp9fj4viu8bmif2y6yuqy2vinocr5c7jcx0henrh2bqorjycokq207d1hje35j50vbhi1xk5y9xis1yuiki1nmkrwtxc2rg1zk36gh64kvaow6y6s3swi2tmcdqujo37gm1vkaipisu38',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tnfmui3n5nw6ekmh3e06l7lminv56ksak1wpsru11m6lwcyifmuau0apqh8pp45v8w3d0t5txkcwa2ah7soiqlwbxhh6ni4ke433gsg3zejv5rw9vli2knjs5s4751wtsned6npwc28ljwqbkcirbfbcufyxg0x9',
                responsibleUserAccountName: 'i4mgrk5zce27sgq1bj0d',
                lastChangeUserAccount: 'fwfsi5fdphh4qupq6zmd',
                lastChangedAt: '2020-07-21 09:47:43',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '6javy9twssay321yvlp49chakuea93lfch6l7mkt3my15cts9nnx8y7hnp7bkhixu8iqskkiz8g9gygwnhaweo2s2faxo8zrmwre94n6szkckye31t5e5hs219t3m1ow6um1ojfp9ecj0geq62cdrl8sj96qqj23',
                component: 'xa0790wy2t69dfwg6k8h6iixv9e8018lov963zc7bv6vxplcdcuu6spb43yhxrjvym6hbalkfs0toae733w6kug0js8kodjknzlhujhznwwoe1lv7y7xzcmih6krcyvevqgn4xfuajh2zq9cfs9p3xz3z2uh6b56',
                name: 'ej54296ybdpk2702hg9h9nupa0urm2lrkusmy6bniygfqbfauu7epopw8rsqgq155vb036vo8h69gdeksq09xw2j3pb0usjdwsfcngwqdib8q3gxuiwpms0nco7lhx5kvg6tm58w5mrmv2pm72ti4byvqk2crs1v',
                
                flowComponent: 'ceaq124ua4qv35exvgcpxx6kjrbgmv9nhacgwtm9yr0s9i87h23sfhst58oid74q3wr1yy5wdsjhm3yjci48mdttf2wpp7fdga2p586c0d1owuft9wons6kjh1wnzi0abazjgfts17c5ub4s9sj3fc34k702itc7',
                flowInterfaceName: 'vfdiu9odob9dp0tdr1cxg9rkxu1dxhd6fc9touc7cw0qs0hiiqeknwlbihr0mbzxrlaujccae4qj07jc9af0ks64b0q5l0ooi8bq7yth280vse2ppo4vcpldhskku0sjshe71uhdymq1net7nmwggddd1r382w6p',
                flowInterfaceNamespace: '4ccyrn7z12oz3rgi12e18aoxsbtn6tyiuiestjygoozg0kemor13o6twaegnkkhl0cl4eyuba6ifqas0sfewukzzjqd2qjpysnsqrb2zewl24xd1n8i2iqhf8edsi1d0vehb7m6pu841evuuidoynqyof4jx8bxg',
                adapterType: '0n3piwiq4a6r29e15kwdt4nxl9qt3bze21mp85tljib4crrjo79izrxekvjp',
                direction: 'SENDER',
                transportProtocol: 'za0emth29028wo9bl65cfw6hypujme894bvfqb3oh5ngbltqv2j9iebfclqf',
                messageProtocol: 'psc2td543e3t4nhjniqvw82j0ctncayl2c6cxfvxrb69i54vb8ueo8jy3c0n',
                adapterEngineName: 'dp3dxlsq3ze5ofau3uht4osjq5w08ixx92ji5xrfcx74hzdwxhzltd5t6b2r1k4lqacignkut0vhph7pga2p0z6s6ql1rrnngj9ujkusrdhq83fbl8anfkr9yd0k1j4wy61icswyl2bw4s81wggmt11ed8dydxea',
                url: 'xj9aq1csx1kml4uqgb63d2440q3ce6sxf2pvx1qa73zz2jwu3adoj953lr8593nfashtd6fc95dfu5xkwo0ed8kjesiewnmywykdmr2b76bynkr1rykyzl6etvm14cmjwogkpuwhwmwxxs4lbxru6jo3vx4g1jri8xt6xnnd2ovd45ox4brmuc1io2ekysjen940kk4pltmprhj78c0wfg02w1wpbcptjt883h5ahm6scetfzfhhkoy5lz3l6yocpw6vb8r5fzyntvlawisjfe0szni2kq323midlk5p2dqcpuwytvwmiqlare4nl5be',
                username: 'pqvp05lcuce4qgwb07k3m6wpf0erswmnou7noad22nrotgjpo0v93zgcs4zk',
                remoteHost: 'fxioyxemvil8awu0qxydekoc5d0fw41aajsg8stdl9vupcmg2q81oh7eko4ua8t032p61d6gtw0yjagptvnahlf6dsdz1dt31bj3c3jgffr64xdabg7bb2s2dblnngnuvzutz794kmof3xj1rf70m371x4dphby8',
                remotePort: 6045133821,
                directory: '4d7ksmlzh8jx4a2k0tm3p2vxxbw118w0kl3qtipb99vev0gchvj3a8sckrqyvearl95u9tjr2ua936x4cbnp59xocnjhuyf8vx3b6cv5x1w2fzhqf20n2k7nfxv1w0sitymyqvmeqyi4y4ly70f0yb5g7mdgzq12635ailxnw79nhwk6futgjlk6m7gw76ot8hhyin9gk6hpaf6hq5uom0g9xa8k1cn2xszd3rrftbo44omaqvbt7i1umg936xd1wa9t4zaoeja452492dxrqmzqc3tz5i6fanigk5p4sgksh2ma651je7rff7vsrttwgoyy8cq99h8c22uut10zkwkqdkh9kx1ubopunxr8uqkx51eadfl59q5s7i5iuignv1r4z173ep5tld7u9m5r8g2yejyc07kpe85pwbrqhpv5pcbgkoydvr9vzavwshzm93pfb0jc5vc3pyvej0aqkw5ur2zi9ykngbl2nof82t6ma7trt7kbofq6cw3y4whj9ixcpfqf28m0ppvziwvsb1cz8b110e598s6n5kcymgivjzd72ojm9i3hmqdtke571zb6ncegouzhi9jcjxcis6pqu8g3eqafce64dkechfcf6z5hzxv9two39iia1pg2miaoy1gsgxpyja3ymblgrn7z5malo2n7a8hcihwe3cfy60rfmuz91j2hpqvkz0yqtk7ar9devwn75rs9qz2ppe42ny3jttwb8855v2ob31qdii9g4wk5v7ph0zri46hlklmd98wje31sfaocb1mnjdf047vk0swy6ep1if65m3m6fvoo6x3cpvztzjc166n8qt07c6h5cmn6bpcijn1ouof0fmot4ggm49xwxn9yvlqr9alrmk1eerswada0naoqmchxfpzpgqm328j2l03r78u5j3bbfb10hd29hv4olxve2hi0i0npcyk8g3e43v0r30y1vw3k7c1hkmrz1yzodd1aim2e33p0m60snztkt53g6j80dnbfyd8aas9c90eq',
                fileSchema: 'el12o6wnzbw0bbmxcwe5dc24e1le5p3gsfqstnggi56s5qtjnew6g3wl3tvhij52cp0ji4b2v985nonehe4q561bq0ik8ad5qpc4q64zvk8q3845xmj63yad6bgyjt9lw2ad2bhanrhpp4z2to4v0iwhxvl7jqrqw78poatvei13f0vpfgx92n64sph92ue7o4jfen5pmvoh0fr7mw953hv5vigblkrqfo2jy980hod6tyn10fkgg4vclup9u9ys3g1otng5o44nf4ovtdh3t7aynvairx8llbtdz359f5e5z88wofhx20ssojshpsie2xrcqleld3f1suflz8jcc5vl3t9oht33dzi0lubcex20skur9wlrng6ylk7qvc1hk3cilxnamwwrfg1z7h2y0xgiuvtcx3jvn4pdkrj3v8ociwj97tcyaet5znsw40isavyo49g7pgi7sdmppt0qhi5xias6ao6y9iwasnghgbrv1tk70mluonq8ylncr9usoxv9ypgt9sd0l8rj5hcxl8djb0xete675jt9d0my8v6ibonkpn287bzhcryetj6v47xnw2ohdjubq7blzpvx1am6sm17rjgrngg0mb6vej9jz9wsddd3y5zjhr42n76qkrl4u6x289rfxgey9i9wybbe3ele4pfpau16rftx7j92hjodiyisv8fiel72ex6po4kx0vnoeq1extjvv23mb6nzffjidhhniqci95hhsk1z6mzwepwf8knswwprku5y930ivilfeyxmhn5sh6a8eutwxr0lfx48fsth8cutb05asnia4qm2t2f9qs7ld7bhv4nibxj7b56k2grq1qj4y6hl3fzhy67n43hle5ielryglpx8grdqypr8wbc3wvpg71xh8mzryphxans317fzidn67xc4xicyb0wh8zrg8vckcz9y6ruzrjl85isk27lyjsac110lzd5lo1qibn8aj8frgdgzlg8275x0vfchvbcfwt57lawzqameq1deeop2',
                proxyHost: 'vs2zn01rkuniaj29dgs3yftvkpe35kfozgwfrd3mmikxyqsz5vribajag4p2',
                proxyPort: 2584537479,
                destination: 'meq3crhg6xvfxvcpe960bjyunjrg2lyzg3p7gvbn2v8nagee7eprgiyw5kni77o7ou68huoexjxsw0cz7ptsxgoq7c4a17hytrsot6x63f5wtb6bcj3zba7oxui81ycajvrnc02l79a1sm8fuz0csy9mn1jv0939',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'noxq1dlufhdjzmx933u8h47aruht893677sobwqf20xa2kumn4l7lud1km8em9ncbevrzl7yzjmxzrel7nuxfkug1n6jh50026r8tkp70xsn3qc33q9wlp78ewrpk7wha03a01s6wcu2d9hvmws2uqcs4jqzvct6',
                responsibleUserAccountName: '0uyfgabhbirdw1kqzgmr',
                lastChangeUserAccount: 'lv7sesu9s9107a2u463e',
                lastChangedAt: '2020-07-21 06:39:30',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'id8j9v0me1brig4pflumnk220sqxyjookr0hs6493y27lyv2lw6b87vdwt97fhyumxpcljdipoh5cnaopljsmbd6mmsecz0gourae0hrp4riqtchz005uo6dbd3wnqzj5mjtcj0dj2r3uw8vf5rpb1r9m2g93zd8',
                component: '5dj5arkroiwl94dp9frap7kewx32g9q9ct3jv3hgcebfc65r69zn326mmiy4uk615z17ho8qhczjvn31m8csokqw0l9mibhtxn9m8xjl0tpcl8k5cfr6aiqro7jesiv8jyxqfjjxa0jy65fm6gig8yj494nnj2e1',
                name: 'm658mbq2pq9si5z69mc4augvnwxdtqkml01iu790ycj08u6sc1sdod702unlp3bk3x3q5c7fgdkfb78ee80uzqxygkflg70pby07d7q7mfl9ipsvdx4tt7vb2ciyuwdnczzckhnsq5g79v07kv3ckurlbgcwsz2x',
                flowParty: 't29biv8gmucra9c17aqc3wrsrorfbt224158l4erdn3utytzsio5u54kjxrnir54sla6cgsnmcg1i2wnkgqk2qsyvfb91qs7e26uu82q4rzb8sv8zg30ujh2fk00j53obvxn8c52qdg13q16foaydv9dkrjfdel0',
                flowComponent: null,
                flowInterfaceName: 'o48hwf7n30oarl5oo803p8qx73hl5tlpywwqpl3yc2sd39qa4tv5f64v2di0fv8b5xaqwzgzfgn8u5qfamwn7mpqsgje46vpez96wltneviix4l61vg5pylangifzewjib0ialsavhz64ocikktxdw5izes1aeps',
                flowInterfaceNamespace: 'pdnyc9hox81jwsdkjgzrmcmvzycf79jhvbuezgb51b51x5pohj36tyywyd0bxbf9bpr5g976wrc56wg4wivo7mvz3fastz3szz9un8yvgx2xlmzn28igxjydu00zqntdjnnivxc224akok6pd0lcr718v2tnmfc7',
                adapterType: 'xs13q9etr2b64a4zowjyna7dwks0nuqrefm2igms5g3m7jv1548tas4nn43l',
                direction: 'RECEIVER',
                transportProtocol: 'gtu5sjvir2mxkypo5axxzoncad6062eeitlugs7jd83qj6ep70wu7wxofk09',
                messageProtocol: 'grx28oh3t5b1kc5sbe6f0f1n78ok49y7798u8gbfzf89y2rk8q3hg2a6kgox',
                adapterEngineName: 'nd3lbdeif1yu4czf0k0qmte7bzqkfmj1a3zn9piu8bw0yr2qdnaseb7lvvxudyfwoihuxlv00tiyy8m0ita6tikop229gu72r86kt6debaofcajzzns8w799ct6yyihdk50yuxng8ivctzwixezpr4m330kb3fn6',
                url: 'jb2a5r6sv9xa1qncoc4gz50gtqfks1w5a1prm0ckc14bklg3bmat7sr8r56kx2b0td4n5bk58lkx2pmi8oyml47qdkhcutd4khiqm0cn7k2whre3xvixkxwv5rzf6i78s1h53a7iazus0hvero4z2ssug2r6jxyqj148ox4u42rgfmja3achtfyqfo4xono8fwe7zkg62wy3gb7h56sgqbykf3nv21w7m93xg5jjfm9ksxahzooq03xav1et0kj7ar5uxpokwexku11kttliw3u20dzwx5jejzfkhwa3gfojgt5kxhj9x1c1opgyh3ce',
                username: 'oeuefnxbst68jtdsi9zatfsjy3n59518vhxcbpreych490hdtp4iw9crfgbc',
                remoteHost: 'w0y044kdnscdent6qt5dwem2sjwz59hncwq74l5fd3jsaws3rjap8nmf3nzgez3ub2vw1eng2x0rwax6fngt6565brbbf1tlmzj5x096w9nwxvwdptii0z4726f900a8aa8stb6l64h5jetuntg4dpoeue536q5f',
                remotePort: 9539093526,
                directory: 'criv4je8cajelf4zp4cot0jfpuvqom2g9liq984b9ixefv9n1chwzkvappfsdja63iszn1vk5exi2yfqrotl25x1mnusn8dxd660vldarljed5kdelr3dvoo4wpnwov10gfswt9b1s26pvhjlvmv6ysc47nnp6bm7u21lsecs6a0ryxrurqakij7nd6n0vr8rdhv3uahm8ggtfy9sqdyz4xhy3twypwx5m2zteu9v75coa511golpvtoac96sf30rwb0fez7uhbq7titg8p3bmzg2zcubl4c05f0okfo84nm26dgpv7tf4hs4izffxtkkgwgnengz9z7xw5irx5dswr1svp074a897xmvnnutzdylgo26de1qhec833y37k60hfkofdewd2f8i5wcqw6bf4tehe4elezgfqelw8q14sa66k8leodh8njqluu5q71oifv1pnj3blsew2kzvnxylkg2wkf3u5c4ss9ns4hvtm1wh0znlfs6i7otlbcwzrx1zm7b21qtbn0434vgqoiuqdgbk9232h8j7pz8i9srk320fjct5qt333t4gcn3bs58jnc8isu642cw6b33yhlxn9itvtljvmpzxo72llgw4e5mrwo3tssimhr8o4uw348kovff40rwtpiqwjvt8w5v20uybddwa5pbxhts4hmr8jqaior7jwpy9vm3gglfqocz7qpuycjo8vsifz8zmz2p1dfxxn4i3llnrf8nxwmu28lx795mgzt5kvzqv0v4fbva3lly3rm7b0epw6o0i88b9ya259w9rtq2w1p1hdxc48mf8sf54qbqxkwxfni777lo5qrdkk0zjtedm5e5u1igmeol88yye35bokz74axwqnvc9ly8jehvwa2fathr4x08ae0q45bc3seo38kurazjibyzo32j4demx4yw5o0v5yln74j89fqos2dapwlrhxil2nfwys5iocwo6mtkyfgj6zt7rahplk5gevanurp27hvzhk9m69abikyxls0w971',
                fileSchema: '6anknm7re3f6j0yqq8yc9fi1b8e1v9yk99fgocqzl2pg5491dh55n7p085s7lna6ibf1hy0786fs325p4sp1u5y4zvfjy97g61bpi6i1dogmc1sh5vhatgmk9aepdsmsc6fiiystnisjppdp68env8edlsuyxsfi5fxzhv7gy1c7958ck1y8f6ky7mc89d76xyslal4dw3k1o24co3uaeokz4eng6z8i47r3k6mhqdc8uziiwtj47m3yui7tvtkfe4tuabvwwqs315sw5z3deoca3x7b3no3tz4jfdzbrt9ppqqeou9lputoojrbdgvtmdmojiz9aiwz2iansq8pxdihknzx7ryn2nftsqlyuvauzkl5tmvkrqs9qm9qv3avjapbq7tws8oj44pamjrtw2yf0pxed5jh3l4pejwv9g31zo7folt582a1ztvncb0gv134lcb5l442i8fxxf5765gqu8kgimg1kjsg2ifc46c1wqp6drh9qqu5izz1lybrwqasscezb685fqwafimdak4laowqlm9tnnlheeehabvy7v5avl04m9jrxcixkdpbmn67favj68v69w4obf3jwq3llms49z1w0zli301z1ko7534093fc6i3mqz1yxphvdbmnnnvq4odlb7yia08bsesxjdl5fwlekgmv6859ysknsj69u5z1ka88zzolr0fxginyqfik7h1s0633z5uys6myjmnivwt30xut5fp2bkilyr89vl3fkue7fky8bw9us76e6nuxs5baucum0u5my3j7r92eobjocxjs4xx05o789zv1shhx0sbbqgt4ld48r82tis1hmpeaqv69e53m4t6kg049hs6vrp6czom4s0sehxv13eqy9bv65mshkixwyfj0eftryimoxqp8o8d5j5aprmxj6ll9oce0rtnw9jkqjbudzd28r4lrdyl5ubtmzpb0y2na9m0hgepux4so4v44cd4ft8ogr2b8j67v0a3n7mlg7bopsj7ce7li666p',
                proxyHost: 'c0b4eyvhapt3gzssx8adllshv0c3lsr3k7yjvppd56lw39d9izxh6521d3hc',
                proxyPort: 5985830923,
                destination: 'k91cf60j6hqhkngy19i7wboj64lemgtv6igch9d554prei1b5k0vs1w2e3b9i4voo407b3y37wqy60ialb9dppjbn39pidbgbip0hcffany2orvq9c94b1megi5dng8t3nbo0idpk85r1coyefozpma9k3km1in8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'elfs34zqoaika0gypn02f9dwaf52yo3hihi5qmq5q1bemmo6pjef996c1wct85p0s7zivms8reejlkhiwciti3slubdwubcge85l5jkg3j485f7wj87135b9mwdbjmiqtcdp4lxn2xstbiy168lamvcmtxzute0r',
                responsibleUserAccountName: 'n8bjspuxhv5xd3c1dr7t',
                lastChangeUserAccount: '45yj1s8dch1pevtzb3cj',
                lastChangedAt: '2020-07-21 12:23:37',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'ip6502d3xvenrcc6u335tllclusaraqbacmrvg5klq3j6fab2bar3d1qjuggce3lcamj80q5ny0mb8shat2r5a2xtd8ue3twejwfhl9tf9gj5ud6e9x48havjqbzisr81d1w6jmhw42n7sverfldc6pl15g3wpq4',
                component: 'uri2fir4tirn7wmrxhym3rrnmao588rqa23q99vw6x3stsl46ud82g6gmdly9m6erao6qjxawa27h5zfa8zoszle2k6t2odbil5ee3mzh67wbckirgq2a51rv4qou4e0qjkvxilgm4se86289tojayjkaowf6ecg',
                name: '4lzgrpnb6yiylvhg1kbrx9py6kmncnplozypgnuc5xn64xg8futuc8ozlbc5az155gwfijhjhq9fvr3ccok6tvercbovws0l8nf4h8iq1c3061bfcbcf5b604hgln8kslqvmjulix7kggz3bjf4tckqyn30947d6',
                flowParty: '9d5qyt8wz67amh3ym9ta7aq4reelcx2470ibnjvgyizjlmd30izskubnppeuc54cumd8gfzabjws7ndfb6ajn7mrsy3k25d4hmu6cyju9ehre9l8ae2dk04mp1q2ycwk53uw640h66urh3czzjeia6t3a7do06q2',
                
                flowInterfaceName: 'eugmloa3ncjsd6f3k0z9la9n0tclqlhj7ctjn7k4o5dri2jk0ro0pjb13fv2m8m82lcb5e3l17f52i631pmye7qmkq58sz99i2wcaud1wlugukkezjar20g1a1hv5g5j2w3wf921zb67hiluvgjbg5a3n301rxnt',
                flowInterfaceNamespace: '8h6ap3p4wnuxjatxdnlghvy2wizcawvdouipmgh3yiy3rryqu7o9y7r3h4yl0yv3u6cg18ajdq8xbrt9wdw59xsp6kz24emm19cod3gn6c14fk6c6kqseq0l94alaz1ojgqzz9on891zr8gouq04gmorsiyzbz9e',
                adapterType: '8w3fpnw4r0re87ebf0mq7ouc99oew0lpdfp0ogfnqilbfa9mdn4rev51j1l9',
                direction: 'SENDER',
                transportProtocol: 'yibu8wut1p4ejumisoax4yxhce2dheri8dkz3wdxi6eazgqcwptj05eiivoj',
                messageProtocol: '2pwm6s7chtimnngbi4rvcwl5aquhu8zpjpkg4srsoirrdutgg665k8g0yml5',
                adapterEngineName: 'aynbj64d9lziup7n758hxl45znbgz7d7v3r3k51kxmpsa3c4x5r8j9i89c3xn4h19g8j6ja1k9swhvafvhvq6gi31r8jtebhsu9n399mb6be6ku24w9syp6y3yzrd5vfmb57x6swx5529bbc5nxlbfndkyjo13ag',
                url: 'jwxksu4hwup5jrveyjbxcg3jdqpiht3ke0wjgz30kyth140qfhjga2h1xj375bz3gi25nvk4xygp682khma3n7s0e0mmi58figija1m7t5o5qjc935ggwcr4cg2p8r7pvc39oxernh889kio12ri9101u4ii5c95p31h5pq2szcwbabul5swithnqti0k8jqs4vg7ck60u0b121xt741tlak3y74azjbfglz2hyf1f9tjf1w6sjanddg2se6rq8i7bnn6b6hkafa29kget6qt7kwhx8j0j4b9mhqdogh9vccpuqqbi8a08es3tjycwmb',
                username: 'ybnijkmxrqafrzpj74o5nf4j6bn31fdizrzfh9qg0ladphuvx2jkj6wb8u4y',
                remoteHost: 'dtfrqspkfgfptiwo368d1x6g8uo8sifhb96ps1mdxfbvj8bh1476urxhg79fl6ymdtq1zl7b3m3xiei24tixx1yux9r74arumlb4c9pn0cooyljocbbr2a1vf17jpucdkzisf6pagtlnyb5hubl4f0f8m84fvvgb',
                remotePort: 2296729196,
                directory: '845xnlkl1x6yz3wl0so9utb04qh9dav3rcgei6t159pkea4crbl3z34zbbnh49pwmt1nge676y4vq9thclbdxbmsjyhtuec6b1m54i4mlsazynjyo28tkqisdssrso9vqjqh94cwc6532ln97b80t77923105fbr3f9yrknbc12dv4pnq413r3md0yko0tcggq5stg4cb1uk52gbgt7ittea39bjtos3sqeeph3pjkiiyl8jl3bq98xhbov8jx9t7wh0t5z41nt6x50olvdzsw8qchleu21q8mqovpley45d459zndhmpytxeke64lgpoti9c0wxgqke7iqkcxv3yo9fpkeewqt0uu49gm9geitah4tmt81kn5jmg6bm08yyq22jyh0qlsuv5yqqic1lp9nlmw71fb2jzaukv31pszitzjlte65u80bxl5tvdc0jwjvpakwpu9uu4ysykceqkxaqezt75ar5jqkhcn953xkxlj2j67qcduy0ec4boeyuyw00n1r11ihbrtodzmro326z1mbfd03no5n03bvue02sakdwvowymbauxzd5m4z402sv7rr0ivc1zjfeu46mbn3gbnninuc7z0t275twfpn5g7bfdrox52nwhkm5uj8gmq7di24sm0hvr3sa5tcwy8zq5c89384bbdodruie07bep7emcgjckev47f7oz1eh1tc1fmsic52x4bjjlvex83h5k0t14ywr5pkyqaxmwx1mpva89v281bxanmex8t4vjp8ls69925w8l3usj2m1r5cdhpu8evqjbhvmam30kwh1bsfyag25yexck4n3geh0r9vjb4gu2bo0ls5plsqzkpqa9zg65gu99mblgunb5tdrqhhqvnxklgalx69hgpjk34b9jr5jg7qrftldr1wfk1unmn9nhr7flsxtdesc64v6liog22ln6ho8f5jpy6aoxkcm9vg3jo1kx9mzmoo26kolwvidjbc7cstje03uhl0ixk03nc52mxebxakwgw2g',
                fileSchema: 'u9wbhh7s2vl70iga1nd4togj2q0940zv9ansohuclw5kx3fff83hvjcclwm2b8gpm9qw99w6sbtwk948ewoc702qw4vzt1p7io2d2ieb3lzdgurdli0vw93kfjtod1x3cej8ksrqods11hm93uap16tb3ykox4lnftxm50al2tqa91kel9vzknsjbio82z8a8jktvzppvdaojp00k6yeem1hprvbas0bikruojwde6p2go38fc26yjxjx210pyx70lncatek9n0ix8kopnisv4xdsl3wo5zxauyxu9tjtyc5qi7739fsiokvb69t9ywqr2iavoxmkihfupzsz67lhpcfe1xngf7r7izwpp9abvbyz93xsvlezk5sa90n8ks8essyuqy9d4ttwtqfxhedk26ovkd9t7p8gfgeng9ybmz0xp9g616xbpbofqai9jhgs5mupws48g1l9aphr9ldo3xp0r9q7vpgtohysd6vk86vea8u62ohz8cqdw52a2tdlxqxow1r69yezi1m5gz58yu6q05lpa29er2t60sqtkht8gvo101hcbzgio54o73t8h662lx0ohqce9h5v9h77qugjb92tgx50f587o79sf2iqi0z9zt2ptdqtvebnp8mkblsrhssv5p1jh9krlcwa82ifa6cya24t8uxaowbwlveth13yqj94u9k3g5qceuhr7qjmk2f4kmo1z4v6v0qd7a1j3nemsggxnu44cj4tr2auwv358u0g5u6e8u5lwl906camsnw718gytig3zn6u3he1hfa9jxccof2c8qrd5e7nehghbxgap2syc20a77befzbuz9rslrvxu3q5dikeo3ozcunrtfvy6lp2w7nwhenge2s6916kge2e1d99uodu51lwjilwzam9lp41z93xqd8qtmqs2yj4qi7nse0vyb83bf5m5axj7cu2by7wugur07ycicqyeigtqp84g374wrr0x2dkrtk3d0bp7l27vc1pxoi26q05wyu52u5nfgz',
                proxyHost: 'e1q7o1lfmjs6k530hov32plnkj9ajidtbouyzy8ydqkj8e7kgkz7u6o0v8ns',
                proxyPort: 7370050937,
                destination: 'zejgpy6f6m1xdbin3srtmapakgyzo7u5bbdzdgsi3mzi1p414jm5t9v33mln1uu1g4mzoly6ga71zq6wpe72oa0yx8lsq2k5cu1nwdxu6vtfqkem1d1uf5y66rgmd71ono7e09ixrkl88l1vvr96rmc5jppauz7m',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'btygg1irkrlylr1gmqzij1z2v62d33j6f61q6fzeehkmai3x8xgd9rz2n3vppk934ze5t4y8ve72trbpqkw3n0nuttewxi1tqqar2ln1v8gjk2cxcid5wmtfa2xkaw9ra2i3xfzaujmp189vivftmfghwr2030f5',
                responsibleUserAccountName: 'rkey38gf6ary8dcig92t',
                lastChangeUserAccount: '34q2f82wq99brcwu06c3',
                lastChangedAt: '2020-07-22 01:02:22',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '8p5ckic5idvun256kukqkpyw9ea4u1ki49ep7t1msecs5jk1x3kkbktssl3727ociy1h8ttbml4tok3eagn7lrlzgcifdu7u7lquw14s9zy2ddujrj3isijrfoqr0xsp1okkf79uvn8evcsk7frbvvbcdv77ny3x',
                component: '03l0lv59gr12s86cr7k56y8c102dszhow05l7hidsmivf3a3pipiozen3yhg76fq0gcnly74kleut4aelg9qsvg5i70grq7w572q4yiundsbi2rx132sz28wbl5s4hmstv7m35jm9ztxnnfpfilkzwu65ueqd35t',
                name: '6sgozfrlu06bod9p7g10poqtyczceznnc35vx3c4eivplglw31uih74drbtmtyv9pc7mqy3ag448gdd91efwnu8qsexdhqyeuk6lgxitl2u8vdhf6q9l7sq46yh5gdbtuvx96zjwxm7lku2bfa43u01q2i62sne3',
                flowParty: 'ud9ws8cs6uev249usyms17v5vt11s7kaae8pt1917ed9nhbspuu1c1xewd120f8jv7d6r5dqm14nii87wmktedunwxg6u4yhtm926x40cx198auhvjgomieaggvytxzbx6yrv7rsjeyifbhll1t836prd8uwew19',
                flowComponent: '05orun4159a20n544a20qwl93kjp1b8qv050afmu9ylmv7k9zu6enz3v9i5xxinzyy1nluykbseohh35ulxqwkp8gmwe4lnz02few27wtr8gkcgq5110pbc8932a1942x188pj2j0u9i4ng1d1wndnaxefiizj0c',
                flowInterfaceName: null,
                flowInterfaceNamespace: '6j7puos46q5sfcqnoerwj5cdxysiof97ptc23m8hj5o4orf649uqwb5qajpi94s6nopi9dpu6hr6k2vazfg71kmieb3uxkne368nbqjab9amu2rmdk03vos2uvo84ka4nx4pmwuy1mepk6tdu0s8ju9xq9ssat4b',
                adapterType: 'mvs5p60hywkuiogtrzrzdfxdy4at290nlr68m460bouqx45vyw0haqgocr5l',
                direction: 'RECEIVER',
                transportProtocol: 'hlupop1jzewdhdon3cpssouj1b7ofdow44t10k8xn7vvbrvimcsi89ls9ijm',
                messageProtocol: 'file1vcjdwtq9jrgqm3crn5l7owq4w1e1o63whwrtvbuung71v3ru57cvzjw',
                adapterEngineName: '7p6jzfakxgxpu5now03cr8f6pcpaownaitj68w7yft4703rp02exsnlvk4itn2nx81wzj2rvguoxtbys2dydb5s90880unx4mi3g8yf92ta8iufpap9axbrf8zbphkp3rw1ebpubi2hjk8y63knqpvqeipiumymq',
                url: 'i399v5lm7bt3dzzzdikaoot355tl0a7n4seoi4esbc3hr5oos7vxwlz2u8sf4stj8b736482xnudgk8jcvucsojbx3qc0njuybr3bc5zgfgfyi0xxcevzd5hpz0wq3k5wn63gb1hm22qu9l24iwjdech58t6pw7sgnrnq8ipve67y203st38kkyspa4a5w9r5e5t9o5p1b8yastvjfczbbbojh0u5t3lgckl0htlx2w73bvyi70ze8m8eip0y80fnhcb0pd86sjg8z60vhdd2hodm32krtqp6c45xe274f6y4ioabxl8iburrtt45z50',
                username: 'ea4y2qewe1w94hbn6t3s39gohzw5ufck3nhrtsg90rgug8gtnroxppn0ifp2',
                remoteHost: '8b5a370l4q54ot3ur89vyydl4loi1oidi1edstdgq3vna1bjsv2ojmz1g6qtghtgzu8yauxlqls8mdsn31so6pb9o6fn7919gaopq0fjdeawqrqnk1nme7dyw3kdn4n8qy4mmn33t1khhhfdn2utr25bwvkv711z',
                remotePort: 3004711472,
                directory: 'ksz6ycykd6z7dkchehk46ww4wguyt5idt0eu4vsrcsu25kwh7hi5o7uh7j95240bz8h8t6l1m4fgt1j0ft7u3gln766zuqr4riztm18kr0mfdna572qz242nq5vg7c2t7u3f9al5bspypdexr795aovongfh9kltk7yfg3950lpt7h7dsskhcer5nofy8cps6x1pjnpll2jn17xh1ygohi7dw4fraj725yyq3i5xs52hja1yw54cr36kbzcjnhjwqjchsa9j4jiwldeb850talot0wvzjohcwoiv13ofamnhlshuopvoxy3xollkwrhh5dmkl8napgf05zmb2lzatp9bbc2ohoa7lfvhxy7hi3cn237ly2qd64fcb6pzo64kp7emllolv7n38w4bm0uky8s4qq4xlg3fi5c8ukrhxjqpm5fa44jl5gkekelbxgmcbm3rql06j9tf3m951ex3urh22h6iz924shyjz79mf24dcottj247lnal4hfy0buii3uuwaj8twbpo1nsshiojynxmlr6sir2tpdlzusm90aculqgjbhgnjzzd4bwisf9pq6ohb4mvdp9zj3737hipakkgemuayvazt8yuwq6nn0iumjjtgovtlqfpmdkx4hxcl1fd8t7i0iikq4gl1dp8prjmcjpwitp4ljiq057xpqxhcew4v34ag0k7hqfjqyhgztg0p9abdhva727kxryz45r6wnt4sl1uzuzbjkmlyunym6cnlge70vc53xbtz0ssg2oomgcwiwmqdgcv50x874c3yx62mttpesvq0b1u8e5gde9fpffqpvuw7tkq9xdzjdvfojljs22bmhu3sh84u78dw673mwc75vm4dciwkuehdpls68b69bg6oxtbcw6xj7yneeg00nc1lli9g00bqsrg22ufpnwx2e3jn6j87d45l448tks1d3nvtsu0ikct2d3up0nquhaec32bd8ahpaf4dog3ntp5xa6qmocirmm9retpkx831n7172nq26e',
                fileSchema: '79gi4wnmm8kmgdtfxi3omqyjej0boyykv4sm5dout5i625nhusmdurrdnxe41s1ca5t9yn7z3duspmb5tbe6sy5v7t5fi7atapt6g3uicn067q6cuzd57pibjhewtp67mt6w5c2g9xsq43faozw4s7v7p5wnp4bi2ms22qys0vtfynnj4lgvgjd9pcfrfvk725e3v5aoizpoqhw6a1iyg0b0u7pxf72wffr7t9j2gixdg8cyiczdpoz1xumhu66jnme2sv8ssy8g6mxfx7ldcrfcww8tn0w7u442o983qreajmx4u346ijvhthg5i4kjd61jij8bja9k4ta6b8shq6mszyms1h92hfnolbemeps1dbmj6azn8ll0a5qjja81jcertbsh4tom5224n7xpw7gs3khm04mt9cwiow2hcghwsqnbkv6xap45zt50puhxd6nw7p4jj199vv5yo1xp00cktc0bdq4jx5bxqeai8tq4ldzj0zfkdokzsoo22e0tmoofsynqdlf4oo64w1fhur8q5ngivism4f43e9p98rmwa8jlx0j15z7s2w9bhfnva97fzcz85dm0f9mdw2tl7umgph3do4sqqdynwsnvl6hm28sgx9fb5hmh2kieakxj272yeut824wjt4cwhubugr62n4jgqzyy5hcgbd64fb6byj7vco3jl999dg7hbmadb3msmf5blqtw2fmaydt9rs97ixhhv8f5v7twlfzli351ikohnmqpeekvtt2uetrchk35ugxapa0ykgoi8e3rlw9f1hg0af0yce7zem1857sowz644772zxr42l8pul8eslrtww6pbi1tfqk1rdk5oqllbd8i5i845nrmxas92yzobvd3te2am0kr2iro3qwn7l59l5tcgvbjsiatfj2k775e3bdr1z0r321gppz2zhuzm68f1u3jzc6mb776jgj1firht2mjy4ivcv32e3xsmiknfbylea7cn4ug1p1ktda1hzhbuscl3s1k53xuecvv',
                proxyHost: 'c1hx1hb1iq5i1nnxy8eppymn5293h5i346iqya5igr7d9i2yayd7gki0hrjg',
                proxyPort: 7065312491,
                destination: 'bczzu2tsc1cwgwbpauiyq8ue0307p7seqyucukujub1hdltiko9hb4iq7snme97khl0nwfotgosqxqcl5w4y7jif0ficxt9v5ltczu8ya7g1vto9u72q3kge1msvkyaz8iwdwt9062n25fba4c3aj4y7swkruxfm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tc5bjsyrekticia0ft8366hyt1roe70bu3xkp3nbryyov5p97x5zeig1cb9i8mj4ryr8qk754qlcw32mujsm4rcdz4i2kgn41ypar3fj1i6gi4regcnjj0y454ifbq7iwaxpqlzh3b236ioul6ywd8llrtoo1tx0',
                responsibleUserAccountName: 'jox1kctshatf6zitj4q3',
                lastChangeUserAccount: 'dyukypp73sza151tnarr',
                lastChangedAt: '2020-07-21 07:59:56',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'gwsl1xnsubx3mrkp5jf1xlvzw3y04naf9xx7wpwvpvsm82ctccqik9jcieyw8x5jc2fugrxbqwbve2eopmgbn2acxkwtkqftas6lxlvmmf8p5vc9tx2waufmbfuovpztykm4opn6wa22ymi71dr0x6y0zwa6tr9h',
                component: '4nmjoxrnybp32bsuilkbbxno74hsjjdw9g3m7yo1icmh52gtv0w0enwu6xkukef0i6yzdf6wahmvyad6v81799t5ukhb2trw0dt8pua7bo3lgsdfi7smr0iqo7dnip7f18qfxq9ng3bkjctlgngm4k8fn080u6aa',
                name: 'xqdbu1isrxnmmiki9a9cjev8vjwncw20wma94mk9qjcczja441b04vozlsfz5axl3cei44pf63x9ytj5ajt4bh6ivdp2p49ylcuh2f7m6tuzluynt4bhli5eeo02hqghgx70fc9uu3spz6km73r7jd6gfbn13r8r',
                flowParty: '7oewkh7f3e6zm80d2ghbcdvho9e59mh9ad7wkfor2mr0jd85hoy6s3vum65u31qe2u855t6a1bttkafbk55yrffr1rc0ggr9qxtovbtkh7tpo6jijufkf3xtwkoh1o8a0jwcpanhfcvuj8hxq96hoe4vexmcqwzp',
                flowComponent: 'zqdqu0pcemawoevgb9xuefxc1sqy7ysltzvv1sy78ev13io303imkogytwjzs2osf2ln6w9e19jmw0dzuva8ev9vrzku0stc2dnzgcjpi64ahakn9ciu0wsnemludirxvulnpfv6vs18fllcren27ahbo4igq4y3',
                
                flowInterfaceNamespace: 'w80nqpo1uuq3vn9h727x5tehospbjhu5jatbyf9gyocfr1ead7ena32zd3ijvq3vw8lw540b496uixxfzhf5ele50y2ws8p4q603fuxxtjicm4hswmogyet3r47reujmzjda1crgathgrz46ffzgi9xmf2ifpo23',
                adapterType: 'y7d8lnwciamjz2djjfzkm53nbq9rn5qy9b0ucj5ncs41h9636san709jerkf',
                direction: 'SENDER',
                transportProtocol: 'krvxnqd03f0itsp5vlq4s90hi20dv74ugjcg6qti94psljik10ofvhgx451l',
                messageProtocol: 'gbn6h9vp04mfgttgrt11co9cbot587iotk4q5uivn7jvf5ig2peqi5j9mfbw',
                adapterEngineName: 'xtgjlkdok8h1i85kwtpyxcnjs4ro8sg2q8e9xdfo1fxsszjxccwh3zkpss71avh04mx1mr8ubnh4wwqpupl28nm6y1pll381jxqa146il5h6k2lw198af6mzqg0ma4k6g3rd4mrq49i19n4mir6fa1tiphfdk5dd',
                url: 'f0bwsblo5pptnmclbiikyamya5c29jesotftjy71h8dw0hlf5kf631hqg0c5jpf96tgl7cwo0c9nz0x6n3z0nkz8kgalenkasl5fg37zgivq0jkbsn0xu97ic973eso2i40gphipzdzp33u5pe88ehuq4bunuua5nf98ckfbip5t53hsk8bijtw3ls9ix6po9swoblr5d9vagxvftbq0nzy70i2sxrlqri5d2x43ic0cznmuq7myifqqojrh5s7m6gm6vqzw7xgz9uk4b4tywsl96yzo0bwa3jnkk9bd23a90zupe3xpb0g33n62tisl',
                username: 'dxvs6ooo93k8bufx8vfqma9h3jmps89s9s7cgao706ww7hwo6ik83wotfvxl',
                remoteHost: 'heoy8cgktg17mrlvwirw4vjim8tlgczfl4b2xz5al91zkfnkhg55chr5kd3bt7u1aw5i3xqgyuss094pj78wct044t8cyrpsu2jj32rr9iio47rfjadgfm23cxkezoutpsahb4n6hh7q09yf1h3o0ifozqon3wlf',
                remotePort: 2160271182,
                directory: 'hb750nzk66d3lufrj7s8q7utdpc0prnqsnawizykhvlx95fr024fmzqm3gdvfyqkw9m2z6mltbm1o8xy9g3jbbdnldlt8y2byikfmvn2bt71f4aufarjtemcqjrqbmu1drxaghfxvu09cl5kwhps45u1l42p28nuh3eht6epmfoxgv54iiwoqbmfy32m79s9k82mtm6p8jm5k4oxg085rjifsn3oee73j1g1t5lbaoj41gkrh7zr4g1czdteu0qbb3aw9pymg0zlqnnjkvnn0xgeo56erowz9mlcbnoykhyaj3tad3plz3u1z5qe8pwzib8w1r7e49sovwr9ly5y8vx9w4585t61x6igagv7rfzv8taolv7x47vchiisrl3n6t8n1kfv74np97bzm9bfld5f3ga1c3r62n7y4iygezoodhi1plnmywncliayut3ce7c5lhh7zh4jyhu6qea8yusq8ih0yujaatlmw451sre7o61nindk97hfel1xoufpj9qx2f88xsqy0zgeh9ve69zckmkl08tbnr3bkwsqwzgtozrgoz7wlsinr1jvkgtcjmxxm0wsq1w4nlkrc5n0oeb5535xvlexv3pkh3roh9jult1d29yy9ypfwq9el9mkda4v5sr9jwsd7tht2jlddzmerrshc0vxcmw8qknpcgwylsdlyfxoorcspik0de4h4g30oawece4bxydsr1xgb2m8zu0gms2qypjgfircskg2dg7jv5zy8fmoo1urqktnpmkikpnb2l2qakqwxyblsutr3t6wugsnhq1ffd7rve8tz7a6xxfr5apqjldhrlitggvl33wzozb9p6pndwa8k8516ncas9vn7u46lrk3rb3dit22dszry52byckhp87545gfoui9g2m5ks0zv4dalia90rzraz087v8562lyqip52bowsb7cmkq3hfdmw4km0rbkuzwhzz3xi0ebl20oj8nvvrb0wq6wl61we91y6m9xoi90e6se4gpq2q5h9c8m',
                fileSchema: 'ex8s4w9z9q2lcjzq8dddc338h40qsq3eghg8uvkookj32orbp6hpeolkq06f9to3zpsthqclrygimo1flbqnt6z6gkdz98syfilb2vlx8jswyvyoklux4wwm0rfeop5lg5xluy2hgqscv4hzu1ejekez2gmws2gylcyy39h7g9b9vnav2sxoobyw7jgxpleadd6fuwi5my6dcihwoku2kby39x3acv1l6s9zd65whl2u7n7059m548fc0uvxzv7bl6bmrtxjy3la2mqrnyqwoakrl4rh9qm6l11rsgmprcyvz76nbcjgv4gbw1joyw16wpqy5ki8v5dqlr6kllmk8sidl7j3lq8uevbcqt5238tq5q7v6cvdgfm9d9r97x71qkx87ut2l310yaf0ksbxy8119oe5i8elrna5souki7e09uj6yq8hr5x9m5g3ae9tdv5sq3ee5jxv74psslsstllccwi8ee8tsiuzzvlxk1k82m1w11292tdsm97l5mazdxzydhrptyf2jcmpsnfrzztzfeui8aojp3vzbr9uxc8ptfm4484e5q136v39qn5j1w65h6nf7pvsd50l1leho02s1874bp2s1iwr5c5vb7ves4kfea7ak2h7o5zcl928f9j2zv721fjobtyyswbvgelkyag24azplem0qpp9gmsnyrc1iitv2kwmseay9fh9i5ia24z607ff98uol9xplz3uu772kvdmesa13wafp0y6adpq930q3rxba5hmdwxqcdc1dzolt9hg9xlf9v3q3gl3fu4v6z217h2000kr0i6vys0nwm6u2ypot2eqd9x90uv6k8ck1yv9yqqg21i7z1uc2d2ojj4fpkpt4c47o4wjf5ob896mdd8ncvx2kkzlg1ihl5ioj7yh3sft65vsudq6sm8iz6w6663zbzhky5xb7uwcefbs19oqb6my1qgkpq0kc503xaqesafx3pwxgfuefen905sxuiolvjp5qndrm9nt4urr36ccxeh9uk45',
                proxyHost: 'rqpp2bv8q8yq3ktq8d2a7kb6npbyeg9l6o6rgt5wzwu58qt4jscjrejeag9p',
                proxyPort: 7338735742,
                destination: '77bsadchc398y2nghwleiy2fd7en4nmw2dtiaupwxnk6rvho25eai9ecrs5ivtjebxvhkwcjwp31dzfxkam04bug29o04xl39uv3vh65espr29fqylkx9qm0bkjriic8krfj9xdhrhd480wpyuxh7wcefh54q4r6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1jsf7obtuda21711pj9steavvclii10hs6d5svy5y00gx6mtx4oqdbg5jve0jsbjzmm4d9tz97st5wooe6ry278ertan68c4y3dqkm1wlbv5knuergmuqrhln6a9frwbiwbq76i9igfmoj3hi08lofai42a1p2aa',
                responsibleUserAccountName: 'zdc0287tfesfydwl2v44',
                lastChangeUserAccount: 'y69to5deuo0aqu7vecwv',
                lastChangedAt: '2020-07-22 00:51:20',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '6a40apzy3fyzp5707mwlv63b2gmc9jjjol1ef1qlt764x4yj0wgdamz4enc8f3m6zgvg6jln4j7sr8fik5g1mqgwxxdwm3sc204qg7pf13gh6bin1tljjbj10v21gxbjde9t3alcirp8xgy66wa2mt10f8wwrjxb',
                component: 'eg2wd9x4ikpr5enshlx6rb8z86ggbb5l86q1qniy1dmxdowyttqgskv5swwp9j82tlyp1yg8dr1yauby6v52b0ytr7zuj12thleb0abtmfbtgagghf50g10k5cz8ni8i9fegwjtu09macocbefdlschyoo5twqa1',
                name: 'ls2qcy7iak8tbxo5z0xx7uvn7zfoi0oh11vxuifjx2tfoq3r74921hqphlvhripp2vtwrcaq8fz0iqq55ncu0jabun1fsbbv0xoerx8m6b4mgjpjdwoqzeb04j55e4xvnjoynl75hq5rcvkxbvd6ygcwe0r10yyp',
                flowParty: 'pdm5k3iktwusn8m6500gxua7jq0i8jgst034c7dks822ftldomtath9200gcoyrn8igrmysxncgmxhbq03pkc97u4k0b1x3vcssdc633ihd8jxdbq2ff5edyxfc0uww2my1qefbu5o3otp5mokxly362o63c9jqy',
                flowComponent: 'buxkg5knyahkprbi9yckyb8oerzz2nqo9hdl4qx7v91psb2olqrb0nlreflp37s6zoqynsiv3lo6t6gu3pxnuxg196ioi1lzy577krqapndu3azu1dr3lvkklyp9wosa8qlyuksi5ekjs6yylndwoupmdh7zktad',
                flowInterfaceName: '8p53tadszcmcplgtronz6gbgy2fph6gt62w5xstsm72urtpownm2r0dnpghx10j2pchbsk57tb2t55vmgdxaym5b3w8ubh1kmrij4xgvqz2h35s1u4g47m94j2x9p2wvyua0mmp9gmjo9rmjnahzm4rue1f1k2uy',
                flowInterfaceNamespace: null,
                adapterType: 'ch084yfi1i5f2w0c2yn6xzy7b8pk2hbpbvjzwycqevc9owbwe57nsyh062n3',
                direction: 'RECEIVER',
                transportProtocol: 'jkj180z4038xk55uhi3y0v9wwpp4cyutt0p3e84gn0dsx5tp5hzithyfbnzm',
                messageProtocol: 'vkonu3amd7bjyyb3172hxsnyme0pt0nv1h14ce7y8ihzttztp3y18k5xqi5m',
                adapterEngineName: 'ajpnng3hvsy9xlxtyil6kz2js082wcgrmegpaz45xw497emec83n6ib5vtwcuxims6n9ix67wgpzgsbvrtz915oweszwkk7sgqwkx1974y3bjecvvrfmvqcw1tneg85th59oggu1dufe1tmulmzi7vfza8wdakcg',
                url: '89b2586axjdiqe1w21aclw6y661utqy5wypqknfrqk58wjs99h80cgvmz87oefte8ulecnmocv4pk26k6ixvlqwq76dcjqbp72x8zmn6xko4g19z4cv6yeu3das54ste4i4nuwar8lbasv12vr6nq4zdjy5hrpp6fze16ykfxmlnwh1183bv7mel35613czqo85d6y8wwke62zgwjeph76tj8dv3q7dr5ytwcg8ep6mmn0d83feynnwc1sqadasz4n3u3gsih2x2rabe7xjj9tgax5au2o9nsaedsq67xnigk99v82mtt2dli189mgus',
                username: '504xaon443ye19mki7lxojb3am74f53sgdb4gqxnz6rcirotehq1eb85lj3p',
                remoteHost: 'ebn9rmdjgpyreup7b01pmypyh44krbhehehwdtjkl66molhdmqieyxtb7zkxroig1y1zflw1kb0l89itslfkg2jvanx1dt3ckx48e51xq2py2sj74kb0otjz8v8v9c0mm0gk1lkffrqy1c53txrnosal9k6s78fb',
                remotePort: 1971520308,
                directory: 'u97984vmfd9s6erx0s5763msh5in2ipql88bhbyow1d36mrd5vxhzm0otmfz7o45037fsliqqft12b7ujt8tvxp64sakm7zvfnw7crk4vew4oxjhu6oz6ccu3ax8meorpbvjx5e3hqzt8z2fzx7p04062f5yo1sbtcegqyp8945t2brdgubpyaho15a89hranasy6zwxvbcx987uox58et83p45tjr2s56j8l9wogp1883aqguo1pp5cs59ocge1o4xhvhdliy3fcxgll03qivxxu2dm6ybnnp6116i08wj8c702yyaad2l12klqy4d4u8xk4z2mzqey71kjiifhci972wyx3z2eusgdwx5zjv792iq2m7ojbhetb6nbyeh2sm1835e1pk1ejlzlo1tf59zmdy7b81jsvsdkmh4ihos1mr46984s092gtf4bhf6qgc7ryv5mp5yka2adp0zth9osf9m6h1jvhiuxve6z0j78wu99euysllz58bc1575nexy2h189hn1wilm0fyry00n0rrw8skk99c3cmsplxu1buo9u7xl1xdgm4u9b1v20wckl60n6s4ro65sw4vtzafclpln534278mehl7qa8qn3htz253ssdhjswjstuftd4pbr5yk0d8q90tq4qhvmv752t07mg8bdb5cw44psfxuuprh56k4k9hhvdlnewvirj8t0s1zfcswbm6zg60gipkjm3fkyv7ahlom0kse6h7t5g22j26coveasheoxw5j3f6tg9ijpwouqd2smiil82snksn1xrh7l8ajiz6thj615tgrszfhbmzmq5qo4gfbcr40buk199eeqk849tnty7yr3uk629uwdyg0o881ghslbbrb5ca7ku70umqbn6rr3sv0pe3p014uhkrbpgd2jahfjn2fvrhj7vx6ciin2c2zb456mo5tn7dc6ea5mltsb6fudknfltwosto820a128g20gu61kof1aqy628a01n3g1i3aet146kq7mhl36evj',
                fileSchema: 'q3k5e271pzo0okdolhfgahltc4plgm1gky0yc4o9y1j1wcisdz1k0icztk2o444er6h7ni8v46ai6cec2l6nby4mlckli1zyf7mfq5ljwctiv7vz0io36o4o7fxnqb3yotji10fsjmwhzlymptti6240bwpftgbbitl0zsr6zgvfec66qrelitbb2wrrqjv04q9li4buqcckffpge4ssae05al1o408bzolnflqhwvxkccbuvsr7icc96vdt07mu6ax3be589urkkgkbvthsmilmeuf88mdthge1sx9co24vfdnh6wvjih365beza9qadzrrwqs5ymcx144pek2shj119rf0g4e8x7yqx5ghtraijglvlnava5p6mxt6nhznpqf5s7azl765ze82wrfk5cfssiuff9hgxt559ba7dbv5ay6086ip41g3tkl9598lfmkaayilv4msnkika65kaizbi59wocbtup8rguq6xgui41dkqii4819qu8bnqtoxkco4vaoj5xgcpv13fsytkdgh1prczprn8tiqo6y26av2q2bprw34xuynwts94qwxn6h2ossj188tm051pmoel3jfz3im9s1jc8q1h65idtge3rrm2oarfisuh7ips5cyfmwlpw3rawfypy14n2fwe1tsea7uoe1nv7ilqp4tl8808pvfz25nu4rjixho5bz84tq279z4jh9sm20od5nl7wb49jifjf3acd0tpxtioly8jxe7h9kupr9kdsfbpuaa1pyzqbvkl81b9qj7c48x5hbrog1dutnsuihx3xrfmgrma0y3op38hf3fsk7b2t3wh9t8k39c6knphv05vfjsiyz8p4gxdcmvqcjp4um4fe17ys0ym2a3cvstktnapbiwh6ro73j3m58ia0t0ej2ic85s8f4j5fu4e7bu8bo7ol82omtqvbfv3szqdsfbtlgsnx1sncqdofp5h4ouflep2m0befgm1iq6f1xhvs5cqb5687tbm2ei8hut4yi52en5',
                proxyHost: '9ls7m5vxxw13liurubpqrfe8r1cergls7voy9o0wcbaixhjkkyuh63j1ba8x',
                proxyPort: 7538256613,
                destination: 'rlh7vpq0nlx55nis24s5xhtmhij9gmnan0ua9ef5hd07pbry2ekjjx9yymouo69cyn4lrut9o15a5n1vfau1j928vzvesiooomij4c42ef1pcvlcan988696j8xzgbooke7d2cclglwhdp4qlwa6264dq995sbfg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0rlfj6d7trx67b8gepr3e89tvigm3furh6bc24d83igazxzxa8694x7tl579iiwxoyza72bzsgx7j7toiskxlnend071fttbrkd89szev3dwm5t9x8bep4qku0d2kx03jf27vyxx3xmcqda7k5omb20sggcakno4',
                responsibleUserAccountName: '3e706s4t4qty52cgrvba',
                lastChangeUserAccount: 'c7exb5pcx0uh6kbgst6t',
                lastChangedAt: '2020-07-21 16:19:10',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'psul190sx9qcg0ajzn1sn0rdlxi0kqveoeydu8npykg1bhudt7kz7idz7fxf1ehv09zicvn7g9w4yvdbr5xvj9qx7ru49j5k7h1kn3acv5ny3elpwyrq8ltmfrsj7iwkzrdk35dcc53b7bhvccuttb8fle7v9i09',
                component: 'ehntgdxk7qac7yfwnac4xv2kt8i4mtlz0l9i82n430vpcsu67qjgwkjokdadr68elda7cmdmn37098pilbwcopbawrj8g8smz71ky4m7cs1fkor6ix9k3x2aq257poihegcrkua9y77v6wudupl13herxclvf06e',
                name: 'li7t7mxkwcdk8tc0lusr3ffdqqo08c9kdpi83xrg0g5jwwpqqse7sh5nz7go8822wkpbcxgwyc0san863mjurj3wh6pgg5fiq7my7q8lujh8nkx0ssv6xde2dnfn19cpu4sv9kkl6co8qs2qoos9tcu0q64gmjn4',
                flowParty: 't5ym80u6rgo1krrgeoy6p2y7bu9scfciurj7jfs0bgkve5ps1haaxc8vkcllms2vl388ohnwio5hyviycnzv2airjrsdptcrw6u5cp28z8qzd9przwsgrd5ywldenqs6ley976hueg89dc399mny66dmivl7ahf4',
                flowComponent: '8f9swpcjodh9rcg439df7wvu091hyymh6sfulgkp43hvaxsta1uhudv1hix86ndcpphfto30ypar5kswqr64rbqphnieshga1ccx23f16ttfdc9x392joowywoaicsv07wvncd90040knrnk2lraqcyokqa4soxb',
                flowInterfaceName: 'mhv3i4bhxblrtvjhtin8gwu7uon3273724rmhbr1dnp2cicpx8krrz84m7pnx38px7w89q5917dc8lcalwjjv3dlcrod1xj3ory8rn04kisr8aorby0l5tip94dhc3vmy3tuszmtkd9vu6o954h07s1j4p07mzew',
                
                adapterType: '02juokt4g32gisy5mu4o0w8chxcgji4mdh29tdvuvyjoaf5v1m3xie1kv7oe',
                direction: 'RECEIVER',
                transportProtocol: 'bjnv57pc2e0qbfocqbgt6ju0x1ydnbr3ixr4uah1ervnprfxiqv5wp3jughg',
                messageProtocol: '4qcbm1r9jbehe6aoru01qumgrs17ocbp8zppqoks59m39oij51fr4ffez5s3',
                adapterEngineName: 'mhh0fmkd6fjbmhkastl4ngdtur6xa4x3wcjskxyzj4eiujuh7fiubx9hd4u5s7aidtqejczg4fijc5g9nv9t0ezc3lgtcqrtmlv08vieh31vyvsgabd1t0yr17snsdtypqs0w3cbhxytl4bxe110v1wa6u1hcawx',
                url: 'gyv5o55hnhvzybxih3dkgs6mv140pa95mhuyl8fap47jjinn7s8a004nf52do9nrwln1b38mrjpvinrzc941ecrue6mqpd7wpltf1njyink4yn6qxem9bblzie91ywpwvly0bu6f7asaoetwrdxluzoeod8vcy91z7puc0az1vsbx1gszku7xtl7lsg2bowv9b9tx5rofsxrsf6q5mj4mwtbbsux7fkqdxnlrius9rhl8ylqcg0g9cauf183bf4hs552axieydni5uhyzcyqt3pykq2i6x1xs1jtncjomofqxmmk6q9ulw4sg5e4g424',
                username: 'xzu0ewko1evw0cnl79lvrr9sy6paiqellqz05e4sfokh8gtsuuc7i51jhfg3',
                remoteHost: 'e4iivem7bc1h3l6ar3adcth8rszw54gydtykly8o5cujx1mt8a4ci3tj32yr7185emp9ysz1j6b0j05ziky0dhxnputb356y4dyi3ws8eqjccntu1so11n3c9krhsa5pk31euyj7zknwthdugdypj1058clvd8aq',
                remotePort: 5661085884,
                directory: 'd2d6biaovxa3ax01d1ua50ljyvmde7ny1e197namh1tyndkdvxdp44oaryobi3hrt6umt1rdzqrrn8bl5r3npljv66be5g7vy7eesf57z9ynmfh4h8jxdpfmel3sjhochvf4bm7esqe7vbrxvskdfp249jc71hacag2j0p9qdfjhdbldue61klvf6c4h73eefelo5c5t52hkge2qrk0rcqseyc600d29ox0y8fkgm60yx6b3ptayezwob3uy4m5s5wgr2h7hyoetcm1gihmfwkl4iklosz98q164upe0g3ngayadinudh895sjqv1uppvqgylczwwl6o0iu68cze5n5bixmyb7hbmruapyr7uhkm8tygcwkfqbh2lvaqa6k5w4luqiu837ga9nt4btamvpxf1rm26hgx1uef66a22ozd032bo1dnqykaczy7kxi3vnlnt35s6pvpf8qf9wwre0ulca6u3b40tq9bata01o3eefu5jgf71x2iot5dvusxdww6a24oljma1l5g1b3r3853czoeyjk9eyx51if1jyppfp7x5vgfwuxjp0p9jyojsb53j79oybxb3rdj29fiiblmdf9w347o1v8yxvryfax8kizq2rn4k94wmojxh9qqibb6n17fzcb2tkyprjxfex7wmd3zb9wlk3rtv1elqxio3gy2355e4fc2f2xtusdpfi44w2gquc2ghixad9kavh19keyzqpxybyl09yicnh0afmls4q44w29glst21belatag3qsuae7nilt8pdm3deaxhdekweqrrif1ynohi68edepkzjijui9075ixa6hbk5undw259x4fsox9493a762uim0s3pybykb0p3dh2cemaq79emyb6v3y72y446n9g76w71kslaslb9ol0vun9rizpbva7pvo7o63trv5uymjyyap0cmp5mfjlbvr7tjxjbzn5i1i2mznqhscr06bmnfd7gus80d9pcmx7week96znzlzs3364kxpye3mpl6j',
                fileSchema: 't3j6psgw8csodqokbjv473ibmgphy8oiwaabzfg000va0crmbdlkbw5ttohv97ifj2vuum5jnu9c2akbsc9w3z5g912osiatmykuu5kgt6ydpvjzgfiu9pwje3i8bffmvtkujsi274ux539j7fzuxwuy5ca54pri861mdkfh1hgco1itiooj5dm9xusmes8kl1hp1m6w8vhtm3mspxa8uul8hlidbg6tciuxp76kuhr3cq3qefacl9xnl05d1g3hlijgs1dlhoir5y4s30d614x5ndn2x71yepvdgfjes5e2zov7jptg96e93o480fjtarvgzzq5nf1ry8pzyile4a5jggouf0p4643r6s8i45d2474me757vfifoo2y1yod1d9fhsmr4agr9abni3r5q56n3lbbfd197k4i8rybx8nje4uyouagvvt7v7xgpd1ycaj026pixq0mdwx9iadppmoank92q5uxg5jy7pbqsy2d3ecvwod4ubs7f3m3i8rzbzzhaili1lpqhtphptb59d4fimoq69wcgoh1weaufi3s689wisb7cjspelmbkma4knj7yge2vxew2esra5unpguv2yrecmavfbr8aggo6q97wnmkpqh3yal3x5a6mb7w4wi0wxa5se8rfkbl05t67idz3wlhwtn7wkzugzg2q6oxmwuw4plug9p9rmggg6588j972t8k4b6500rftcf9hhb5wbzp58dimzxl2y2dbce07ow3vf102im31gbx92nkivsioikhrv3kim0908x6zirwh10x9i5fbkkqhrtmf3ezkj531tel62xxisup45et63rax94qlrb07rzdz4zt4htvd54c81mns1tj2ozjg9so3bmpcijsm0jpip8w5ce5yuntach0ssx1641ef3u9m3ulf4zkttwk8agpcsj4mr4syq5gvteztwq40fda0m2inhh7d3t7wfav6aer82kcpm4xovcldnvhi7kanl4iop5dek8y2w4cfd0erx1npt3t',
                proxyHost: 'hf2im73lvts49hvf1lotdlvhw41s10za2e66yfunulwbe2oa6b7ml81wu0y5',
                proxyPort: 2629038660,
                destination: 'yo5ghrnu82i4vimunuxzmbsusk41nn0wnvtsnclu4db52ebykzgwu7922c4bljslkpfxjx3ezll9z86cztukcdookyzag7plpxqyal4s5qrtmkufbeuit7kx4cvfs5o8zkf7x1qcmodlwhesjmi3yv31on1ve8tu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '334vz6yzfvb1t28r4xcop32171n4wt9qilaa0ayaxlaxt5rvndgj39uj797s6mgd2gp08erbsaow4gmh674lhuyediar7w2dbaci2ot0v0xk6x6pde36ymczmwouzb03k3npbxqqlcc68niijv18vvtdlwv8r1b0',
                responsibleUserAccountName: 'qabm7wglxpfnk9ycpd57',
                lastChangeUserAccount: '5g0rlrxwatlvhstlhd1m',
                lastChangedAt: '2020-07-21 21:01:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'nwf54zebsakq0unb05r95lll3wb55pbzs3jg6qp82nvdm79o2vt3dnzmfithp2urpnp72njm6ugro2zl4md703l94e9ypwzrsu1pk31edquya5o8qwgs3looo3srb5avp0tvusg4mobxnr6wiy26neigrby8cbi9',
                component: 'hed6g7vhuo7th1ps6vsm7fc1uc496v1jag8sa8hp7dmhgz6ntzgf56a4ka8ypesuo30oxkdts5u1izudphdp0g7fflj3rrx66colardiri6y06zpkxvkk512drpjm4iy9st35ojb0sbl6g1nn1kykobndrvmzo9s',
                name: 'kedi3fg8mpwt7402hwyehuobyush7c1il4udlzkz3j0274515hmzo08s4fg048j5cgd8doglbd23fmmonqth8ucnkgvnj9cs4sg2axq12v65dghj9tdprx0cqwtzsew1e0jaexgrs75ot1hiddk6lrqd04oowndn',
                flowParty: '5uglfxh1msk066fcs5i982wn72t96vq308jgz8i1ichizqyoq3083mvlxmozeymwdo6ifwz22uyqiscfendr7ygpxex6oja9wk5l7v8wlxeqebuc4mtw0448qw2ny7u9o1dccbptrfc30z0k3k6awa8v6j8426i6',
                flowComponent: '1ve93bo5w822ovpyore80o4ihwr098iftrxcucugth9l16z9qduujwl48zglpnhee0t5cyzyazlozkwkfx4f0nmsd17uc0dowphca1docfkztttdxclwm2pukiklgmaz0owaemugoz9p6v5a44skrsn53iib1o14',
                flowInterfaceName: 't653p8qxi43d2wpxulv1vnwfq5h5tgdc1ck7ao2uot8m1k55ghe7jqsjc11encez226dun7330pdlx8veuwwp61401y64fc3qsakpoz0i6w5xwlrlvdc5l7x8d81fa67cg8dl7mdle9j2pw9nwudg4it1u0dvy0a',
                flowInterfaceNamespace: 'jr9gymioenpz535r5wdodw34mrpzxh28ur4m15btr75iv8vag6lnytq28zehl9pbsq3uiv6lxbyv6wzyf2gvyt288oln1co39alh43ue1fyqn7bfz6bqdoantvd4mialy4u73pkjusrfd34w2u2edahyk0ed2wlm',
                adapterType: 'l0tgkxc4bnbee0j8ph89h6gs8kb417kxkgqpbsaoeuckljfifzqamc0f0tmr',
                direction: null,
                transportProtocol: 'i7uz0cvyws0dlieeowvqa0zsqolgfutzwjlpfjsxa3pw5l4g1yjggrytfev6',
                messageProtocol: 'y0uxqw1jrz6m4vjx05fzoavspyk33gkh7krie3mu4tjtszvay6f0cfh83stf',
                adapterEngineName: '2qu54lai9zvlrk5e5da6mnppzy6fcqglpte8x8mvbduwr0mwmjoy9u5m11vpu4fs6tm7alb9mzmshrjpo9bafu8cmdu03obnv5qx7iout9ywmdrr4foms28nzfzii0w54id8co3hpnh0zf2gwr1f4mua3u6nlsuv',
                url: 'uukgnqk8k5sl4yarsecdjfmh62b5skm7odpuca8rjo4ns3vfv24u0ah6szripow6gvw443vh67lnw6po43i39ds9rogm58mrbwj3sxeicfjgo3807yjtko20j2at185i0ko186s6b9crr48o6qd4xbdktw6xd9vfsm7066uwd4yet79myvmldvu7jh4zd18d5a6qx2wga4532rnhbudrentc1ffybuosfkngc18b1cwauhbpyi3z6z5h0ykp0v2jjzg6ra4nj1x93sjrn9nt5vt065gyfbraw3orzqp9o0t15dwzrtzvicskewz7nowm',
                username: '9yp4e3ysvcs3fyjuc4pjtj8wz7o9v6proewn6f98pc1vufsh34ou5kg6h2wr',
                remoteHost: '17edp2bs2mk8s4e6bcrdafpintu9vkuoqobnz20x0qefq52ojy3567p115wop40c8oadxzh57gqhiiwmifqyfiosbek6cucrjunzmn35sfk5f7glnbnszckh2iluqpno36p8xjltptyjd0wyg0aloafxo4q3x50k',
                remotePort: 4917974730,
                directory: '6op0mf1u757o6qia88ve8xbucst6cwjb3v3ypu54u14hwukq0boopxb29n193lcz32txgwf5hospaw857jds6jzwjhxrdwzdy1l9ydeyv4q0mgtt4i1lnrk1k8oqm5o2s8ferd4552evsowt4ukeb0z1intapsy8lq5s2c4313q1qhitj07u5roq8zll824sgfw5nto1qa67e6rgkblwdpmh8lrz9dzujonaf0jlvv7mcka2flkdm66229epd2v4ahd3lurkfrt2k28iuc82jotk3xq35mnyx1hgs4lhpgej1n7h9ehwujmx0qrhe6ow8w4qsle77kg0w511vgg66oon2i8v5fl7n4nmrpvm8c1po2eany7hgqeqphud2g6bq5zlvuvmj0go840k1w6royrrt1rh45k4u07klk1iek5nq9oim4jm7hygu3vszk5kwektc6r2rep1vu2be3mlary5oiktlx3ur6jmjwi8pli42cglajow5aecfvdg3pl005qco7tcmpsm1aidh3g64q6z2n7ieip7xh37r08yxvi6dcbb0695ld79upvh8uhhc4imt1ibx0n1pkhzt0c77q81xmwjdo1b1v225aa39lfn6rs9qsm3zm6t2f0totvhm2m17rffd64j9m9ysbx90sg867z34im01w9kgudb53wnsivox788v5b39rl8kh4syxpvp3n8s8iowplhai6xpvjtn4y8wxyqy1dvmzl0xihhb386s8oe80kxl45zr4tj363ccummk4snt4bd1uql1zv0npfiyrrdmwbjtlalz85cypgxhduocy32pi2ho82dwzi4p9grbi9pbfcvcsm1tdduxuod60jq55eq8w3y6pbdfjc4wbpzanchwpc9mi4cuor903p8uebcn10lm57nxf25yfqy142rip32pbbsrz6rpuzei4ubdg9pb8uyvw9z7wxe7d6rai9axfjt4g2iwlq2a12czos9bmqpvzfbunbukzok01tayb5meba4926k',
                fileSchema: 'jvez62715ng5z3l7lljd0v2vt1wqw63jc2tyzxomeqlfrtvygaitgdnqd8o8p77rcme97tuxkx0z58l9wcxkgaghlcjesjy3h3yx90w5m7ray2gcj0ahv6w6y1sew8x93a83r2z7b9um34ovhiuq7gsh7gz27mwtu40fjwwz4mzjim1f3xsroef9cgz7eq74mgpher8hmdu3xm7jk2s71w4cy5eaeo3uz0n218nftrqkocbpjqcw6bfmvvni81ypw2m16xarb1arvt1q0kfyg47hwlwrfujlj8xqoqa3bx70dg7es355jts7wk1t2dtfr6gmazttkug5i36h10i4z3jvz27zguumybjisu000n8k5bjpkfoxp9ztw6kestly7cojc5f9omrplt6i1qraveuljagmr18ko0b0no64kixae5bv6739pw9ydgw8u4rs8x22ucep3h6mcprt9gtvqyso11egxhwxp14a5ps1dbd6vnx6wlb7jwb5uoqck6vexdympliksr9bquo0nlha7wvmtesqhagtrdccf2nlu58htpfyx6ee8z5w8uusukfi5rb89bch2mrivk5k7ig3m48bp51xukmrnw8bdabo9y42d1i0tbmahy9rahat5gjpvhjrhlegfygkjceyj1jwxxtejy3rog1fuhui3j34ugsqhra49jn5q1t93i3g1z5ivl41h6w1efmaimy83g0da6ux3j72mqv003dx7dubnbm0kxtgkgrlu32blmn64fcagmpu3rllyjz5k9d3tu11gic1w1hwlomsqghaof15mz36l2yftzn8ar5rhj2aomwh3neatsb3l39estrea9k700pqlnydbo91ecoaw7naar3xou7l3l1pxekkky92phbu87zen2s9i8sbttkong02ud8a3tu7qr9o6l8xlmfkcoxbplp0c7wioge87qr80tk85jwc4u65wqs4axcup987skmu62xv8y599v8m82gk18z76xmtu04l4ad1bulgothz',
                proxyHost: '4yr5ojjylwqlk3h0dmuq0lux77fmov7luppodmdo9znwow4fdja0355nzy8x',
                proxyPort: 3943737998,
                destination: 'fnh8uxs5cfq3nw9ob5p7n01ji8jg3mzpopq1ybddmg9j90yguc0tyl9hb7rzv0ddf5wmcf9qpewbrpjfzgjg7vay0wwl7j6ujmoj3vqh8tlbenxakoyjvae5fddg2mnepzvqd8c6n9kgy4wleeeb1wsqlrqld8l4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xvmmelu3h6scgq76m95a399bj3g0u3u7odtxpr7y81jc6fm39ypdvf686yh9zjvtbgwe55hnyd9zw31i7yzwdf61wo9lt3dbd4xkx9m8r71ewujwfvnbl57ysltwilzi8s5vi9g06ico3q9dro12vhmvjzx5v4rz',
                responsibleUserAccountName: 'lvlqk099yrbvrjwk57fx',
                lastChangeUserAccount: '8ic3e6yyw4c4azb8gc8v',
                lastChangedAt: '2020-07-21 06:09:23',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'ds2mpotj97uwcuc71ts5mpdobbp326y4p34yueqe485cskofk4j47ap2sw6npx8k4fhgualqrgrjcwlvf2dod9a7dhtiwbgn3qaueohc66xu7wl1gkvq9y040anap5yaup637jloghgv8wcs9l558xo9sibnakl6',
                component: 'o6qcntlcqq3rdf9p32i8uqk4f0rsdjmap2rdg1bcz2hxw3sgphidrnj9dlmgnhs3q7fkyzls2v7arkq3yl7yoyctic8xyyeiq5k29gz20qw589lrxi5g5z8ia1w26jm6akoubtnw3wcjt3czu7y69ks6cmo38au7',
                name: '4ydwgo01ju2amsybppqvsfdu6ymyc33dystee12u9avctdns55t92l5ed8eg9dtdp4pt18xim1utehonfq4t730j2zi0pwgk0dms0tc5ylpmsf4wgxhb99gt0m7z3vesldd6lk3wrh9lyn4rrd5yhyl1teykx0h6',
                flowParty: '5shc86ki04izh7i2vvph57xxz8p367w0oo31xfp1xfah6c6gzudf4l0xrshtl960hucmaqcm5z1tvilgw4tknunycmdbtrcg0v8f73edhqrj4qh2m3ieo16aj6hczl052og4mwamolngbiohoon0eu7gp7lyiba1',
                flowComponent: '75v5nrotka3h50znyuvndjt96o2bcsnubum7c9t17fs40rfrxt4mtu3tq0ihf282z2japrw5cuiq3h7x3mgbqlq8ju3ed4q9m3uwx1z005w5hnqnoxnnzm0d123thzon5xq0sjc0dvuxk5bd7cnplrisoehw9xak',
                flowInterfaceName: 'kzu904jt0be73v0jvfcq4whruc4e68bmqka0pm2ol14ft7sde5qoi0cnjk0gk4puaug4icyllgmy7705kziehlsklrg5ne7hlzzlvllcu23zvqg00kgan5jpfnr0zqopvtdjgryi5iolgnekqhzh4p1vddzuh0lg',
                flowInterfaceNamespace: 'ibk5gklhc4p8cxn9ikss29cy0cimu28d957qskmoaar427umtyksp6l3sr7g1jam39bgky1kouka1lch2p5c9fiobleotsgkkvnypf4rj56gtkhqyacg7kuzmrli6ihbpx4mhr1hn4csl0yjxmhnh00a5x5dmeu6',
                adapterType: 'hbjrm1j9ffwy8uqzc1dalw8vb2o86bapyi1vn7vunnw9csimsrd6dzluq7cs',
                
                transportProtocol: 'pc76x847l3gdhawfcmog5widfdyvoxp9ojindi737t2d419bn72ca9q9adkz',
                messageProtocol: 'yz3oae1hz5vze24ercfp4r5a0ssnztbqprmm4kj40d0d8l8fbzc57hivdhpy',
                adapterEngineName: '6joh5q5nr8y43iu4v75x4nq7xefu2j5dfbb8bnu89byl88y6hng2c5xmd17mh51mwyqjqd0wja20dpvv6qzf5ns41hq2acftr0w8qdmpr1rcp37f8gdnwocr1djvydhzw6eg9hagasvl2oietnt3gyppie5up27f',
                url: 's8vy2qbvgcsbu1tdfpd7kvcq283ot5v9v52gsyummy0j3xe1dazkzhvn3utnine4hmk90xltxey19mo4rxh6k423lz4j1g4yrye0ejbgiy9mlr2d20jcqgcj5mnxmp3y4l0rflom09khcocp14dt8tzdgdi2mudms0crrt8o8o2yi8g36j17wm0vqgmyvzbs729rr4tzst1hi1vt1kh2s6gktj3agiwecdrnsahxa27lyk4awm6oefrybsxgcchcxbzulvvx9pjykwvw8k6qcpyc2onarmgxpblbybn40fujma55aqwmiihfavsfczj9',
                username: '3pws4uo1van2zxp4ggzgncjwlw1nllc9i5vzl8psy1wzyciaprj7sgprr2i2',
                remoteHost: 'zf7eynsdzwll7j0mncen07thfw4h3h7l1gl07iuvoht2he469v5mqq32nnsifrihtc226bnuc9klxspcxkm2vk35sk7wg11iewf9f6xk52bhtko4cb6x1j9zd2h6qlhskxy467fmwecnsaayl1nacu6wr54b5h4o',
                remotePort: 8223623952,
                directory: 'qus2o6so9uvm2wdfytq3bb71ly1zj9nqkpew375y13nphmpur4ixjrbmcyl2y3vtsllargoeu7lnx8f76ikhantu1b6hq0fxp19jmz0ohw46wanj0pxh49gd9404qk6f6d92bt634y77gz7pjxbze4jcfxuotjses9cym1axkidkndkmo0iwpmyuhyo4elqkbbh3kdla5eanffbh9ouy9v1q37zvddamye6qe5rer9c6eubriiepy2mxps6y1hml3lawcy1y03qfzlmmf5zzrbhp6n0yu5sv9vv56a3ky08hz6mcl8263c8b4s7q8u3n1bcj4vdkefrdblvh7l4971b9k98pepahg871hsagm0jf3hlnvksnw7t1rsrv0k6u90afyh9o4m1nhyxnoh8wso13tdre6cdrslmhjljcxzyyxh9wq66c0wecl5rw547hdoaxnskmkckw2euqeaysdchhhvkcrx2m6luhwmtc7333buspa4ihijlrasivplc3thek36hdm1uoct5lndlt3tkrapky3818hm6ebt4k7sliovrf2iiwchfyg6x854dfod4e1l6hfuvmd7ty23i4i6srulp1dzbcy85cpwb10ny1jp0ub924mxaycut0648kh1gljcc3e0740qam7s15ku70e4iv37a5h8gvva7smoltty7675k2tpp7nrv9pg4n645sxmq5kcqschp94cdqie6hragq4lozoiwy5qk2f6hvzh6ruh8u5svwmb7842neolioopjzmv9f78tm6vnt4bxi1mgb1mub4zo741r0mswdnimr98r0sd1tn02lgykh0p958ofpqmab0xbk7k7tn5b9qxilshc0p69eugnuvh4i45vi4ukp1m6wsyjiofbl5atnqdi3n40amk2cjpah3hxdqx9jkfj5d82rwry86hiisgk1c12p3y8ww3w0b93lwzf5gnfvav6tzjgzge4kym1m6re2cdv3svyham7javv8tqioqk6wmmc4ip6dxpet',
                fileSchema: 'vrw993sowyfmz06ig43e1pka83fvzl9b7z2iafyq2dwlnmtr7eedegf67mjs7vur6a66c0bzt5ytaau4ehzgwv19osabzei55o8gmsxepxw11cg2vp0nz9cxfxifzn6e1drk8gg0t12jbvzdmof8ox34l1j8t3uoaicdacnvd9skrzgyy2wgoyw34shi92ougop1kn01hirbfy56oavqgvig8z9ed7q29rsimie5fhyxnkkhz29vplhmfgk5dvmwzmol8ukp2ejw47dnafvsw0xmp17k1044spsjjo337i35qoapk4j8v8fqk1jkt4qo521hew7za2upjtlpz8on042jevvg7sak6ter1g4lvlm9x2gmh8jlgcdontu6rj61bhur5n0au5y1fdywnvybrrp8flt2mumufkucwe5wnmor5eq8rxx56kkyqmnut6vjdez87zpextaqr2purujwp68vqg68buhs11z0efl4ow811deub8mq84ww62mcfw756iabymkclnshayy9bgxlbgm1cdkrd178jzx5kiim7mmsewyoo159s39fslflq5ysi1bwtj55fpl9891wlrwfd3p2um500y8d6dita8kazf3td1zdto4vzzaiy9ojvthhcbm8fzk4oh692tq8v5ba6wcyjjumatvis0v0g11vwnca1zwj4lyoi0guhk8v7tblr1dlya8zaee43pi9xemrbqa2905l39yujxhewofwjk8k5y7h6wyq0bb5upm2padvsl5dfawgs1gqbtj0iepz24e4mxkxbo9sl9dav5b269168f07x0kb7ngrtpaoglvci7a9pkpjug9gbao6xje24xvdgi2vpr67dznabpumu9wrjmcr9q0tzowjat0na9i84hqrl0xh47mnqxdm7t18hxzipxc9cspfqtg0nmk83tz3yf0bo873nwrbwq6w0iioaw83e1gj8w5yqhd5wcbhp7wyx2hc3fe15roo9ajpa2d335occ0h2m14kqs98193h',
                proxyHost: 'c4iru9wzhxr5j39xr4scvkf4mtl4rxarnd4f5yqw7waz052hqfnoep0e2dio',
                proxyPort: 8096214568,
                destination: 'ow0fnspmh4jnfqv7e6x4i0wtn9pmhskhsw73uarkeixa8njylobugjang9h14p3i233rssb0omkzuemley5cjw5ga1xlaowcht13mmjfu2e08fokhthal09fqyeo8b6t199mwcsafg1bbdgqp25jwiv2idid3nk9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7oi1zanwj5zjqls1csu2x6e64tqi5rygssr1ld8hhovwbkvhvh6yilrnvi0h24ydodkd6s961frrv56cetysl3zrmbf19jgogwmfpeitc7v37ak6x4623sd809hca4pvjcae9bir55pzg1azre94zvwpoicqhptu',
                responsibleUserAccountName: 'jjy9ewois64k1h2viz0c',
                lastChangeUserAccount: 'nxjn81gntklyvc7kme71',
                lastChangedAt: '2020-07-21 01:13:34',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '65dipxmjcyx5486pa0caldq6ds9a5nfo8dzdcrh6m1xp6ou0x19jyg9zoo7zdin4rewmx6t4xrl4u7zf5debmxj2wsps6obdzha7n7ok04ypbwl5cvm47yuzin4hbak40qcyuqetfn9foxjskgscb9d6fm2cvuj5',
                component: 'mnuiejf65jtwhxm1q1ii5h3fsno96ekjcejuvm122n1vmdvfokrkvi9oh0vdqiynyk3lr5fbb9sg1wrc1zlhz4yl063baj5axc397ana2fuchmd6hhflm0juf8a2m5n6yz79xe23w28poadf56cw93yso700kznk',
                name: 'fydwcxza8ttwpb9qdyldzbsoruoh3may8t1nozddfvt52k5qhq39581pb3in0xgdkvzhwbzk52bt23agkv3vh34yr3r9ymg63w4u9b2h459f0ejhouobr8f6g8lnnhc16ug3vzpb2fv3pcd9hw8h93qlbs8dpf8v',
                flowParty: 'orjug4xq6nzef3zgd24576nqqse0oopyl9s597zfyrlkxbaqa30g9l1d1lzzdjertoeo41wwbx0c1o7yjyxsz29irzooye4wmy27hbru5dwng5rimiqtgpwzmc07t1ovfkfzqtrkrq8goqjeg3b9ad6tn4egsipj',
                flowComponent: 'eijsmnfxmqo2ra1pit92udv5wjpwcjzj5igtn8kbn0on6r94f9lkpv01ofrwcasfy2cs16mjonmrwzucyeeorrd42rtlegfnxcw2etdf0pnhgotb4g1phjwfxvzrlhofgyp0dkjn7mh21ysy3jyg3o1r4m9016bd',
                flowInterfaceName: 'myg68u1k7u88v3vns79shy4ju2t1zbpnun6jvthlv7ytcmwt2173k8si40m8dzlzvhaeht9yionv8bo5p50uewbenq60d765o09ihh9lzcq8zdlbupn5o0sw6x043h3v2dofc399ur2tnafe4f9u1q80s2d32tc3',
                flowInterfaceNamespace: 'r330unnlx4zd1u4txpwrk00qaa1yywlsqhdtiyprmg56aamrrl1b8vrrgetn97ay8n4ws1cbagahpjncd40q51d9bhv4e0v86cmwu67iboggo4hh3tya8v95v891b0ow69e1899drgotm7qv5f38632k5biknuk6',
                adapterType: 'q07v284d3avdirao75nf6hd30t9wmpyqeo6zw5z18j5ruc7e35ce8wqjot8j',
                direction: 'RECEIVER',
                transportProtocol: '1te8jg7j38lu4lm5emv3kou07pibz0c9c7nbyjrv8qwjhtv3cnoxysucd9by',
                messageProtocol: 'd2yns4ze0je8nrqi2pyz5bm3j6pt40a8fvenwbdssv3ddze24eywg4ej0id0',
                adapterEngineName: 'qj4vch6jt8k19k54qhcfc88zsa0ieczvmiox8ltrdhj4et1gvmam86pqhyea2zgpeaarcojc86s284a53a2flexicunp0cjcdxdgqkt7cmgjuurwycf9bxhry3frx7gx55bxva4ak2zsy3hi8i0npnkimgcrlt5j',
                url: '6fcjfebwizhcvy18b6nzhmlsotjo61d0bv38oq5l9bkgmwgkd6zl0k3ae8olpvri3fx8lz4a9htzwxkgbl0zpo8uoi7ixx3mshfzaa54tqdeq59os8ue6hrevord2623ndnwk5tg3tjc8vpynz8r1isbnlh6msn1lponpxit5rl2fzvf91pd1lu9yolttap2f28r726e3n09a707u8do5wk8jhu7ag3g8w1u2a3cskn92h9ii7gjck6saq7uc4yrqzg8x73ytju7vq0fpbe10r1kg7d2ubr4owpzciwmpcozghbvda9dqdpf2rdq1nmd',
                username: '8np304l515ly7lnq0enxcblck0xd13ctm2sk83h8kj3wv3z0ocog08t4xcr5',
                remoteHost: '71i6pn3tby0ntja3uxsq5ptcaupjyrxlsabi95al13cy6hnch59hz394yxhglvdae0u5xgtcut8qrp3buiwrwlsw45qt6tgf8ree9kswmg7b37gxi2v5wnuwsv4vtj9l52cerad6wf7wgmi8ygo2gx4ihvjyiw67',
                remotePort: 9471618341,
                directory: 'frnsxot2my1ipz1mmbivmhy39p1vvajz22i422oc3fpjcw2yxs17hkka4zaaeyt6kwz1sj6w2uqmouvvy64i3ebm5cptc6zq9dl2dkl3rem31x0w5v54gceqey56vtbzzkjyimpwvc8to3nkjinxx0lhke3bhv6788m61mofk9v6w6z0an6kcrt1y37xdi759jt0jfcpgm0aywj6cgllj08tg08j9jl8eqiplljrz463vasvb8yz1kzusz5vg655vj86kol7dqwj7c15my1kn91ijwmmxcsa5purhhiw42dwhl8fa8iuaqszw8ipl9yav0j3lz278fnav68aagby128kfdk3m0o5zblx6s664vw5ow0doitc6bu7g7qnb7hdf6y6c865tknzm1xpsftdczpccjubogxvxl31v4cmtbm8r2uwk2nkh05h89okr8nqlsucibj1nj0gxpbdd94do6g6cobplqxoo3an0zlqdus36usp409dqjgdavpcy1sx3k1ehy0c4yyc6d88pny039q8fizpcs687gsrdd2616omua0solatf739gb85sdhbpsuzf5b3z4x35hxv3re3nf0ect36d7zdxqe38kceqczskqckrmhmv7eesz9hnsj85e6tgyajzuzv6yb7avl718m8rtg9h3076bkwvriz9divr3ri461wffu19wk5okzrzejmkxd8s3a0lnrkamyyk50sznxtjmrd8sw42mx1j82f5lahzodhj56qjhrqhs6o30nkp9vqhaozh9tvpdsz2zzh1b3l9la8v24fzaq0trulw6nku5ddghhblmputackz8yg2ksobt5v5z0i5i5bckwpcj67m2f2ks4kualyq3wh85h3v4wxx8dgvfgig8eld5v383o9ltblaqiud7z7cihjqav2qyynduz9zpurb57ubrva1r5iakmeghlzlh2hwe523u9am1tilkq7k5fxe75yaqci5i0dq6fs8v9s4lxsnjr9dg1f1nfejfbyg7fb',
                fileSchema: 'til6wm1b686tbr4edwbpuswmiz5y5ikkebfhdfr0snu3oxerj1bq7ejfd265xujufg8z3z8uw59kgiatej44wyei4gjft8vtiyyozmi9v55h166bk5pdl4qlrgs9rdi6d88j1ujug46bpy5v1tkfstu93vtbst68debu2pqyohltuwfnvqxg5zkuxylnhdukhqho8ztvxlkqp4gepeszxudrlc05z76pnyr3mowquebftoiis734aeuq2z68clwg95dclyl0qpjboqgv8wbru8kh1izkuj2uqhjm2fc6oviw4xzcl8ky5hxeyr5hfufgnwsbixb75ujtcm5cng3smejrb7snvkdtn1x3qqc17ue0jz6hvi3ffhnlxu60ogko4wht9pl7pv12nm6xav3d6ias0yq8dnqgpq7q5cpv2wx8rheayi2auf6z5lg38cifgp6b4m6le8quj8lcy8qfoqbhegfly34dh3dkfk2vpo58mcbx3mtmo1g3u1z6vpt87bs51frj13i1u6tbi9mju4sygam60trlspa33lwwjgep2fdg8g2qdxul4dapmv5v2hk24j5zzsohwax5hidv8kebdarfsg94po6wb6hmcrga0on7b6ros341ly079p60w7n4yigb3t079bs46f0ubczasroqc0bu2mvq67nvqx7d4hqvdiapk13t6ef7t9hhuh8sqycon84er6knga5wuy2nnzrysirvy9ccak60s1x7csi7euozopniiihm23m17z4bvtt2onlmge3s0te4x98wbr8xx1j8p2c92rwyinu7ev9at49v9vutq0pq2gsrlcgi6lf1cdhuobo1hzysrvpc10oa0790vycm4dhotlstpo8tlv9i0usp517ioqaogj035mfneabw8lkhwpi0v3zdvi8r3fqmm5xtu3eupzdnnl83ljrptoz9j2gr35o3scfgu4lfc8xaua6erekho33zej4773fs76e0jk0gbnyc4aqgg9ioxtqpi45koi1v',
                proxyHost: 'wqkz2wxzwrcrefoqzogvhvopyi1kl7n790lfwm2pvzr3ua1rqgec8752mtv9',
                proxyPort: 2559650152,
                destination: 'ngujonl7axz81f871ltcikg0p27uob3xfoyww2pdrzm066lrc2z38mxpak5ogiq8xz7rwnial8yw4k0h42wga8cvxr6mqkw53y20l4yg3h5x7bfnwkwcbxtvnpnidkknenddlpk0amf5y4j5fakgfelp2e9hj97e',
                adapterStatus: null,
                softwareComponentName: '22wqxhx0hkmfjvvo84p153a2bse80bcrnxc5y0dnytj561lx6hh9g18cjdc52dox9650g4rf5moe5bss0c69s7mfyi9e4jzkmjkjvs6f18f8n1vh34yxyfbhbblytf9u0qf44xy2l2hcwf54yomzbp2n8q297v4v',
                responsibleUserAccountName: '29himwa8l2pce5y6ots3',
                lastChangeUserAccount: '1hbhs52jxb8sglxduu7s',
                lastChangedAt: '2020-07-21 03:07:56',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'wdktfz9lf4t29vwlhkotw94gjobumc56ppl0a0s2zb31bgtvtq1vu2p4d8jk9qy98outtfk580xi8z8l5v0xx859q19r634zurdxa2dzn7hdkbmyxd5j55qw081lf615ussu834vuc83tb2piju1udaq41faf9pa',
                component: 'h5zbdb8gn9fncgnuene11l481pejtwmdkelc04jm9pc518kfgzrfb86t0nn5t2rofgsd5q42oe0pq8fxblnui3dmdzo6s6uljxrtm7uk4kg602exqo6a09vtos1j3hvb810kwwupcb15uq34ifcvr2751niv9gcw',
                name: 'i8nnfz1khuuv2crbbmw8291dgx6v1ju49f5qc56fvzn8t6dkedisfg27wxeqqi7tv0xxdzzn5r3vyo08rck651s2esgaesq4mtisbycxgi1c35bp8b1l0x7mswuw20f0ney5ym3x9v9h5or3xkxzj3jiue9ulc10',
                flowParty: 'pxjyq5p5u1qwplle28c11nh3e2pufz6vrd72w1fnzmza5w2ck6ustberj0gq8s6yjzse387z6ilnqot76x7wj539n7f1fu36hyw4efbcr3agkitrfefoupqx6ce9hxs74jcpgxh9x1k5c5k6mtub2wslfebghpbg',
                flowComponent: 'wmh8v353hahsrn9oigxnhlz0fc25p145cgjph2sxde4vsy2lsn5toqjx2q9kh9e4jy9nrzzpp8pig26xetgfzuz0vkxqf3qzk927nttj4x711bheu6fux2pz7kwlzt0y742grb7wednvkqxg2hhu27usc74ndf6u',
                flowInterfaceName: 'cxfc9wcxtp7qfnb4ol86wmf3lazbxu2mauxconn1fxa9mdlg5ivlxr2gamdfffr08ida0237kqe0qzipi328gmgun3b9lg6ciqzoi90a6u9hjstoysmwblpmi8ftc6bt1r2y2q3ugdlk8qjwz6w95qh2kbi5znnt',
                flowInterfaceNamespace: 'g1qr898h859us2djfupecy0ua1ls1z67ly9fe2rd1csezd9sg8sv9dtxiflk51jts6ykpuihg0qsb00l76m0bglvmaplrr9voibr69nce5m50mj7461d6s9pvm7x3quqy0egbvu7ovnoao3473j53lwugf6uwr3v',
                adapterType: '9l8m4hcjaodve4t9xu433kass1gfm33l3qx7r85k6pck9vmar9zilyssngn1',
                direction: 'RECEIVER',
                transportProtocol: '5d3w2tmtb5fpznbopmcedl8576r8h42kotxfg0xbcik44ez635xa8ussuhw4',
                messageProtocol: 'xfuoph8303s2h1z2uq49med2z2g5y7vk0ca8fqk78hc510tv6saw24z70nip',
                adapterEngineName: 'm31lmfouadfybx35353eihukal7dvv4q2y7xwcmy173ep3sgvs0xruj2bx3pttp419838egdzvcx2m4eq9w78xlyuji13jdd1qlcwlo4q4zkhct8rd9qku10rkrzk0uuvvde8xe778eot2o4oe7qp35j2c41e6h9',
                url: 'mh89dn6uokxidgtw5rm6g335kpjuu170wu24tr4ohqatxhvp63ni7naxfdkwb51vfz8a869f076gsc9scukdd7n8zymk0v73203bsuzzd0v0tlgzt7d9ehl3cohkptsribs6b4hpbvq4h6p63dgts2nyekmsrwbjgv16becgngskg7xekj3fxj94mcg3j88qdjizvsbg5e0wdt1itxbctzsyyo9y4b0d6vl4utxq38grnuyawo5zw77tmn7kbs116u0186rcmkojjkekj1w6xygwk1tbj0xdxgqjtwiag6zhi0016fsfvh6l222z9g58',
                username: 'g7iphxra5m9x4uyuu3we6b0a99ov1pubramwzf81brozp98pn5busfwljbvk',
                remoteHost: 'eof45wvt0pjw9gq04hwa2z4ifwbym3olj8yfu9rsf6zx9cx3ysmfptvwadj07g1e07kxdm88tfa6rea64a38f0nx654y2wujmr1kzthrf7y4vsf8uxgpnfat9ig1jshtg5k2qvqhndzd79t8qei8svjvr4r673xj',
                remotePort: 4050508296,
                directory: '2wcxcxlkyixi8fi4xn9427dh6not8x0bkghqwrba3lbbj0q29oiosb1fxphsu7iemf5tgi71gqpmyyq6q7gbmsilyp0cv43j0lqhw21kegd14rcjn20oexli18xhv5mhfw05vklgxidh1lnwrh39d0nvwfnorgqgj0x3ydod9irp6zgvwtx5h05yxmk0wy43nkifu1di1jkcm666ixyu1nn8vfcvbtce5w3h6tsble8a17gdi8evbt4iwv1sec686uhtc843ij7trkw961xcztl2gz5wuxhly4bvr0un0v98onj5qib3ay9ed0k16545y41kdv79r81s0y2efzvu5gv3238rdozpyxsb7mcsky2s0xcbit17xrdaxpf75gu6j7h8o2eb8e0cpvvt3gl7ftgettsgxe14jl6gozby611s1is5qonw52cgx4itumddb8eboje0sdwxdulcvvgk95bkmbbtyd3jkgva4v7xfvvoe5b23nitf1i4onjp1wqplpwwkc47z26ugo2035e4xw6wvh6p1269d02evssgc4ee5bg02zqvwmingzd8wb1zoivhljrf6c9tegkfik2vo0xxpnvr09e3lblh387am0uatgtiu30chh81sdknfoi95cdts1hiepssgai6zpea59soqjocwwkuofte6vw7fewx7ii9b6tx08o3f7e2omp2327054w6n7zizxyqmqcjq5wi3xn8fg3co0pbcd4jcsurg8i4qhww2r3pg9g053prmq1665n63s6ih2kz8hu3vwen6b4osdrn21cczpxwpb40xcl2cd4g5uuht6ufvk4huaqnvfdspz2uck32kqqjzyyyfewazcehsu0vkjp9j6yf9ffp4ipi4i6487yjgruhn1nmnq8yk5r2jhcsji0ye9g3zgfyyamul8spw5r1ymrv91wcqdrw8aqtu8mm9h0unrf62ohw2m0nuzyw3xkc079rtm5dh103njaf9sr7jf2xgn1nq7dqzverhvkebdu1',
                fileSchema: '5sl7cb2svsg6dg8obyzvcrs0zqsp92d5zvj1iivzt17rda46vyl46grk8h5bxc4xqdly76t7cty3rao54ln3wopwqnqpk09i8bbijfr1i0wzmz9fq876034prfvxyff8ute7wu5wbyikxf1tu72jcohydylnxfsqutz3lfmpyy8amjn3rcpu77jycu6msu2od11oydce07qv1ujqoxtbc8e2wtqkv66bvqa1zcbtj42vxo7frxouiwzb9vro05aev0fqusj4305t7bsiyd0vfwdhfgoh0pp5f7n71wywhp5sfy88hqz4wxsjquccbpimps7k0rn7ni61g7xciq2ykn4ds7l8902bif1gsoy511t3097fhh7xgl6wmgvz6i0ti4gnkl3zh221am4pm0o1urasjx0j078uksv34kyoewdbyiw22z42wtl2888lgb3ptn1u9co2em7o6jfuek39k7vocftub4v0r483w5arxubf7qnd9hqhf0r5szx4f6o45s244tit393aa4jnzff0zy258rf4puqo5zs9huiaykpmwwj8tfdwisbntwls8enokbt3ijb8ldonq819ka56ts2dbwe0bf04fd0lvgszkdyqbylyr1uowbtlwivgblx6u3szcf2w6a1t76g4ilnlw5rqn7gyb7psape7wjdf31fxwqu493ffewxh4kd99g1ao6j7evxstxir54plz6srkffvtqwu6wkuofue7qjhn24y7g3udie1sv4yr120wjgjwbim6up5ayxavasrpidn8bh6e4jy0p44mftmkvigdv9ctiyc5m69uvrmpwsvstrb58ot1clmdphysvre0p39xovabstsy17hkirg82detbh5csghfbn2l8bo3j5dsz8qd0r078sivfvipjc4vj0maxmk5p6rhlw44yhg184ika9l8iafgmys6icryldzbbquw7pazutcamre3d1t6syryyj9i5yjmrqukplubf0wg1pawgaxosi94n28do88yvn0',
                proxyHost: 'npol5qg9p3qjpymoib3wecerfa7tg433e32biawx74pv9xdgdwytup3y2gq9',
                proxyPort: 2632247766,
                destination: '2mi253estu3hsscljrf41rgbv05i4czc3dcl857aa3yg2qtwbxgmxur7hbvc5arfen7bqjt1oidy11iji77f9i0255msr9o057xnwr8kmlxtu61pq33i7xo9oa403cafd1xm8sa07h9k9l6vq2lv3x5vzcdkuiwn',
                
                softwareComponentName: 'nqevjnb6a5mv5owqvf2434o8gls863oyhk0i6o9vz93qqrwo2bvodt6z6k84af7bz6yvxul0sszmok91tf7t7nuhi2cpmzf8yxlhqadhobw3xf3z1lstus49i7tum4fsu7f55h1ol7ge5cmhzkhiy7zgywsfnbzj',
                responsibleUserAccountName: 'kcns344plb15618z9jgg',
                lastChangeUserAccount: 'ob9fr85603y8if100qtg',
                lastChangedAt: '2020-07-21 09:21:57',
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
                id: 'hkv8chc7yo0lgsuxx6lwk648il8cnmkh77b26',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '3xlptstazdqypfhf5p6mzwd13abexl1pga6hoz3nesaans67licz5xzuvimfa23gy47lrfb33q8gek62zmud2qpcyd7ogt4y5sxnu6nrhrv8tfkv9ys5t077porw02ic2947c6padzew7eacwejakk4tvotxq6kb',
                component: 'aedh98vlqn9a1doaw8zgyqtasqwyulsjoh7w57bjhp9dlpr1u2x4m0scyl86z3b5wgg8hdilahvihofdu70ve5kigoh3f330vt9qp3m40ydp4ctpa4yzu7ibd2u8je9mzeme20udqhic9itirx5d0qf6zdyqez3k',
                name: 'kqb3w1otgzto2h9enbyum00sw0xb4yy12ujy4xsvsahrku2f7dsn0jkjjn5esupu4cq5i7h1f0hq8bdzqhqvtqordjhv63k19r82nvqmq0wle6hjjxub9ajua21p8vzv40k6gtnizef0tsfv23msb5m50jqaxc9g',
                flowParty: '6k0vgjwfautv9j061s2v3y8ptausiwa5e4t3889eywqd7105hdsa5dtqplxqgmrm7q97fmtaqdkpd81ifgqjzoglfef6nft19tzz5q9y5oznt5qxhnawtq56o0vze5np08g8eu67oa895xu8j48qq5k0t39ttx6d',
                flowComponent: '9snkq8xumbmdqhj47k81g75wrt0h92ssv5w3wx31don7jzzm7xo6xq29j99illa04ws02gbwr3cu1q5hu4zgtbmsxkpb489r6roror0fk23y0r67uia2b8wqcgg6daevaakbk23ch46mhux2h2p5oe6d947dhfol',
                flowInterfaceName: 'm7n29520rlfd99suw6nq4jwgedfht9iegpwwl0iaiko7ecz1kzuyhi2bun2rjw01ps26wphg1zpjwzvv4qi9tfg0c7hnlh9xyr8eru078ycxsu1prkfcu1l6chs6y0xk3n16hix98xiqt29z8jpd8tcgkfekbgl5',
                flowInterfaceNamespace: 'r0vngst6ash05xhzf8ibig1kaj5bsry22wwus5m9ua450vux9ihdopwtq87duzes6mhy7r50v1x6hsfqvbukkmln2dzxbsdgvoz83oh4qp7a7wqk05nfccdqrapynbzfdgsav0lhjthkca7srgk0y9wp38iwlrt1',
                adapterType: '6go2ot5q4zac5tpudsrw0ejx0nw14nwn498a94ei4vuqby6lz349ao3f8qlr',
                direction: 'RECEIVER',
                transportProtocol: 'rgd2r6swxo9fljdu4ln9avkmg78ctgvbk9r6ft0jdvu3it3lecwybfk03hze',
                messageProtocol: 'uq2w6z1nh0khzyoxnr4t8zz6qqjauwbf5z1nolo56ddylnizmp31glcttcys',
                adapterEngineName: '5aaeponfeq5wzneh7t7zsy2anishzl3riwott0tkboalg5pbugn3nib27zc93l0tvoieit613tvb6z29set4t5xodk6l6k4hexol1yfvhevgj1kuw65gs720jpxu3gspr3n94od5bpl8gzjurw12100o55gurkxd',
                url: '4kfh03ifog3ekticfarakzrbc8g96cunvkytht8stno8ydmiycy3fx7vep9xqon33fwbegoymu4bvloj48byz9dcxsolpf5gssobbta2hgkajsy4kiv6v7i3ld2g25ei3lub8v7dxd0aikz7z6ejdvfe7k0i3tieoya3sfceqz4i4bajl9em0gf54srn1z4nhi0k3fzfrvhgufou6vrnsw588ii70uyc7ad92zv7oz3r1s6t27wv830wuas73fqz8vpvteq0jcaxfm6r6g5dsxav428b0dnt8gg0rhrslh8s2dqlje4sy7gyfcol43ek',
                username: 'oiaahbjgfpk85wqipxo7aon9809xhzswcltpyfgqq31u5th22wtkd6riuacm',
                remoteHost: '0z34n2c8la33wmo1e8ddzlcqfnv7w8yvh38i0nklvougcnvalfxfa9qqbyzqiy7zn8d8wm20dljtby5y7lx9nfl6ouz5y9jhytlfhej6dqf694ar6yuuimvshccb3mdrwx00bwofpmg5dhk6zz9700qubloh6pbp',
                remotePort: 8397212808,
                directory: 'vbku2xnd6h52f576qialuieh6e5ewi9lhb0agfb4gnar4fslt5z2g7ua149aqu7eominxij9ef25qbw5eecza98iwix2um0hketuc2duc5d0n6v8uwsfex7c14kavap2qlb5b4r6qvyvto9ft3nh3cxl2g9j94mzpdh754ut6b4fnnxnf0oe1h9wfnqugnqyviyvhcu4mpaxl8qtu9zwspycvjjtqou2k6jlg1sxbwsofpbzut2gzj9g12q75zgjybpz6qpdxg33veyp9qb9ilyeduzvuxnui8s2elnajf4tzd7xpfzw5h57lr72z7ewcllu15abkgwu7e5opzp8znqghl7cnc23k6ny3levrstbmb4k3u4kxvfrnpb0fqcqmf5h0lrliwelihtnpm6v8aoqkb6c73w60gmkqrojih84khabjavtbva61v4fzjbyq1nzev6s4wrv6k9twq8mfqlhzon4yubyxvp6ojco06vl80sqxuupcys7zfxwki1aw4ktcqwy681pl55n26hukqtiriq46uxggpa4ubxvfy38tof0cwh48jebqf4gppga1yawrdls5wcman0rugchxli8riyt4i82x4w5kwo6ygqo6cd5j434tfvzxmlc4iguu7cnu6e0bteptwvpm5y0ye0fnk8rswpzo9san3j62ak8csh8i149up0dkoyi4fx6achzei51an4dbd7x4w5zg6zalf3noprfe9dx7ilwd7luuj09q7hvbsixzq89xaqi8kx7q7tup9h3mqcemuuohn4kkt3k5fc0yyc22dyb09ffok21bp4k9jfsq07q9hr57w3zhpvvfl2qikhxjhuqafe4ccn90o3xfkqrmqb31g5w0ivgvuz91s33t4lf7irfjflz9ac1gw1542v5214kmqz0p7yoezcxys8vubfhikghg6x13lt5wgrbous60m7gv9mha4bq9zup7hetkazpbu5yluhjou2ckuzsw889cpy4hccb2bzjz6q78nlknkg7',
                fileSchema: 'gfl7ipz8m8mpp5azwf904tyu4c5xnibdzdaew81rllse7moc4kuk7r4fbrkwhoxkd1uqp83cprot50adrfo00ui4w5lz4vzmsjesruz5omyn1pvd10iaspmz05f2ypznm2p4bpn5d6547j81qvcc37gkbkdqazoj8fa1uoxr7cat93jzuignckyar2fttojarlin4i23ig1gofadshdagcdfnkxw9qx0brywnid0k4irzgtx5bm0h5gaej6gbizren0ow7jw6662qgr4bo35klog2iman51txp5cvepnlpk7gimb8cl4g5gm539wocq5ga6cyf5es98nbhfv31apa0kf1l3dv3kt2atc2ctgbisnxcn0ign283859qhpvbeawq30c7l7tzl7cbp6ppup4i32n0c1zabki0wssoz6j73wf6bnio0uks0ajwsn7t0funq3wcbvk6d0f40zg8rkqc7yk64l5x2g5aluaaaw3smambhwvtd64gfmz6hfissy7qbz0dbth2w5d970je98kj78nkvdygjpspd7j29ahrcpg6ggja1xfrrll2nkyxfgizlv5fa7s9lpnsqcmdhsj84nzqpra7k88eb5gfxcxzpknroieea2h71rutmtjf1l2v11ytfm3xuaehaiv2jdhe76cb7ks8zqe7lf57l46aj8xogr511g7khjaimh77vmstwi4y277sfkdfiulssuyxtxyq1x1vc3q6zy0ft19brd5xy6om2gw6gdtnv5mwbmm2cvifmmj8wjswirmjkkou3z5n35qzi0xj8zuiq4wn0gr9zg2cw6m86px4ofnfto852mt118kxlezis8vwgpmzaa8yr2iq1ra6pz69jx5jxjeg12ugh4ja2nk89rohiw4wff6luunzxlngue5fugaal24x37d3xpr5xcuovjl7yjxhcpbp1893rbkks6j8n17nvzce5999gchowzq22jzzfjicmkxih7sn75cld9z362sgalm9fam2dgn1t7j704',
                proxyHost: 'run08iho42gcc0qzs1fq4f0a7ypd0tneiu9o45adpk8pn1i4vg0bx17jubmr',
                proxyPort: 2474575354,
                destination: 'muvvxutr62oyom0zfhl1ytat8lv7qgjhuro10stgp8y598oz3o6tq94vqu1q3qjqg5frax8m85aoupknjc6yid8miafxwqi5tjs0fr98qiv7p19my760980vwcwrqjbb85e1lvnrtm1l187xs3b6vbjyaxmkubx5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7q5mc6ug2xkfnj7zg3dwheu1oexhft9rq8abx7rei1mkb4xaoruq5grlt6vheqe69hbxaou9q9tijg9ijm8u1vhpomaz4jgh96p7cba5nxnf8au7qasw712146yondm6jf4bwfk5rmpplu2f1cbdjftwg0inzi1q',
                responsibleUserAccountName: 'pv07hlehalabeg9xx2ji',
                lastChangeUserAccount: '7oq4nest7q52z56i9jn2',
                lastChangedAt: '2020-07-21 12:24:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: 'ybol4pgtotdmjq46gxd8pi5mxp57komtro4ty',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'uq2xwplumhy05vxsba9hqjdflqret9djpz5l3v3emsjazhezwsqancl2euszihgz3kvnia13xuwaz066wrvchyi24anmequx37hhmwaikkymo2rp66ztmund772gamrfzyate6duxazv62i6n4yckqvu4n96mjb4',
                component: '0z5rednwuxkfaykb69qthudfxmzhrof6abtr58s39eaqbq325kajuf4h85wgndjj3whpca08pd797j4u914sm3ba515ymev00mf80f067nl3oieaoro3nu9gywpk4vhv9ihsea0ih1p6k7fx7zjp9fdz4qhcveme',
                name: '35plwy35t3vvswmfayg9y29h0rpn6v4cv5s2r26nywmmyma3ovqffr3dwi77br3mi0n35p9h923z7wezb4nvvy22yh4s5yl0uxijxnufoa514840uxuk5d4wh60brr5xxnvas1zw4ss6twafo1tg0qd8st4p2p85',
                flowParty: '5ef4gmf86wmdsxvs16caitma7o95wm65dp8h02ksy3trliy90wopwms9cht01j2iscefx4ndqoq5nzshiuq4os3ckudz9ytnmu6u6bgw92ve1io7ipqrcaytocxw7b4iqefku6m3po66gssawocq31mkc0ytzj70',
                flowComponent: 'klrmr0hmfiajjoeavbzrlmvu2kfi9b45mz9h043blhsp51z5a7azb7wwy03fr7symldoy7686u2kk3y4d8car1npj4ni7sdvxsbqhbh5wh5uqxcz2fhyg73gcq2myeqj0iu93xr1hofex4qokz67tkh756s5yls0',
                flowInterfaceName: 'ks9spn2h2inw93x40l8z09nezkyj9d3istjmhan8eunhfal4ocfzn0gzs2wisa241nh8h2l2i1xcd60eajityasp1pz75rxdlamrw8slt9l27m5gasiloaohz2q50oloyp6kukpw6mdb4ulo0luk8zh5628s4esp',
                flowInterfaceNamespace: 'j8yx5kvj4129mchl215tr0hkesqjnr1j597t1brw1coqmimahp3tima8d81pjiapjq12nwfowpfvsbpdzzme08ou0rbk2wnwtqydscwfjrdjmrfivjnt90cmq4g6f4od9h5iy83jq55kkm6h49rxtdv6bs0o19hm',
                adapterType: 'yiyul86k48yka4jp959kztjoq33qgppkvla76u4fnktw2r2bop2wnz6f1bn3',
                direction: 'RECEIVER',
                transportProtocol: '69qi2m01ysr2v8mv6e0avcp8qzdwrr4do6hwwmy618hfi7li3s81eoo2sjlk',
                messageProtocol: 'pdxmkpmqqh41n0ykj22q26e4yvlakm0kidzw5odzkd7ve5xst6wypx9trfhr',
                adapterEngineName: '6ohlvyr6ekkrh06zv58p2f7k74nhty6v7c1k5uhtpccm1bti8cbrovsk4jxq3id7d7i9oh8h7aoihx2c4ov8zmdu9fy29tqzvpih6mg6gypj387sjj0s6jjtw4vgy3r8d8m8qn951d0ulnz1ste6xqx2v134tw1t',
                url: 'sbbsvvuh3xkq9rvroxp50g7f0f0ym4l1q90r3idnsih1seyvhgg62g00lnvyy3tnfv1uwg676fw0aommiozqpc4qywkxvfdxcwkiycki96p00llqlbzy506fmqragf5sgfaftvkkteiyr69q2l1v1bkd1tsf89yk7zbax7ml5nub74mh25t3ne8z6057ihhmzv1ebbh48596clb1vp6v7x0ftysqxtr02q7hfs1o9ozbt0iau1kui9ei7kziwefwo2t2banuq781193s2pg09tj48nq1xqzlm8qw4fd6ztk2mna2d7mbzyals81ziatj',
                username: 'fyoi5wg127n9f0669ow7c3h3v6vmdcohhu0v8pyzw8v46n77cvd14eu7cvx6',
                remoteHost: 'qwrbl6ihkp3dev8n6x22ezxu83ed89l3b03umiyi5cxqkj1wdzw5ju9kj3f6blj5eo78lpqayo582ypeiupgohvrykdabzfdvmmzh5zz6b7t2jcq6znoldip656xyxhmi1fx5gj6txbk9u33auxtg3scoxusiavx',
                remotePort: 5578329970,
                directory: 'lflyn5lzfobn8oxneoeodgxpx6kgne1i5icb60ir5wgtha2p4x2pv2bj69j5yjce692vdmi6on6eubrr45dywcc23l3p6v85f54hf7dven6dqt4y8zuzqr6nzcr5a05zegck0mvexa11784623itt6947ycooeaf4jb32hw4bvc36asvwcmvj5d4qdrm51jggddajzyp2h5d2q8b0hc76f8r4e55ddsrhl358wd6ijehf95p02k6q7h99ifs28ws3erkady8swsdrze2c2hi34cbrj4hl8uh073jataybnmwquv12a90g8m58nslt58nj7mcp36kkcl50f2t4daovd72zxbmg13j5brstxxtobpvufq03e4hm9mfu1jixc6algvdjufsx280xb8uu77ixq0rpsj6qwo9vl3losuv4djgp15w3m4nzomw1o455txu9t24jce6z0i2p5wbs0d0su1gboby4hs2g0xmvrq38zq0sfck9r6m6qgz9bm23p8npj6oaezjax0ja6pectd0if6ullhh4gkchho9g6pajqcq2f0zj384eqyp4laf8up7iq4yctd400ab1wr0wf5txgd08svxfbyevo6f21qho76af3kgnf128tftcm6z8adkw6g0rw4zahyiyhd3rikgkkdnh8g43ephhnx1w6y91h57h591jgpm82upas4oj56eqvf2povp1om7ic65fig9kqzu0alydszyyo9r6y0uo7cn0papxd6di7xknkhr4rrk4ilr7vnjy5pmzng5pi95f6w4jnmsr96kpgkpy233u35dhsyzasnm85gfibl5n8mxqc39p5k0shibqj2o40u76m3lh1k5y8s7ikxpst5rj7ku14h1jlxnh94teornftt9h3pvkulpdsd4tnwf4b529mo4elpekol0kpnsv4bhbyjbvnqd5x8bozdruxiaehsypnkc7epauqeg8j90k25tui8poyxow1ovjdfteqp1coh5yes3b60omng70p8q2t88',
                fileSchema: '3s8m4jy551na6iz88qpvg6az8errsn0ywqsrr2zjsqm3mg1aldezhnuqn4juxisilw5veiuf0kpt9xvyogr4y24me76kihl86kt14xdf4333oe2zo46o5gwtkqxpyl16u9l4ayaeo0y4ozdvpedp1paz0jc21elst6i9hf0dysdr2n7sefy9be20a6w6j9p164ue5816awkmehiclpzlyfq6rzl1lg92bwqw9h5d3ujbc3l1crx78hwfgdf0tkxgxn5ht7ri94xplgiogln9lhkkfruzicm5rmcoanleq9fi8c6wbng0skbiwy71wfeb579jve7y4aobjwolw9ix2hrd0ox8a92l44c9obw6t94jok8nq7gc4z7reyd6sf6hccu3has3lilt44kfodoxfxz99ff8pgnnacglc3pnx2gs9v1wllo2idl31m0jyre1j7ql7xwicm125zdw1vnzv4it6wpvyde0qumyw1heoy51yr1jy7nglo70yttrgpbqrp81bv2hyc5r97plpv03x1lv9gyknmby8kgwym7yo1wwmofjjf2e9r1755y4euzpaj0ji9rsxxqcfiik67p0lte15pugbbbhkgjz2chudiuvzaqn5iv5zbqig3adg0qjsnkdjh9nkg4z99tahzcaobnkl5ih4tltb6t09os0ibjx8im28kr95z3dc6qa12t8moqhhs9fakke3ywk9ghw2bvtmklneplgma03dsf006iwh46lwodq7hce5v25poxoc02x7gkbh17vev88ppxoeg9nm5tt3q9nhspk143kp6qoqm0jhvjyo3nx1hx51vwilr48b46y8c60swodxk5irnoja4d0pwk6mx7e7qvq33dnjmnog9jtdrqaxeu614o4axn94nd4q0ron571q4fdnvcjkovu7e1wo0nd595bttgzp0i2g91n1b4iqqek54tl3gbre95uk40d50rdyq0xyqzt9nh5v7vbfyycfps7yf9cl85r9fu7daqbmxoey27e',
                proxyHost: 'vgpdk2028rf5mrg82yv9i4k6okpj17eotnz5psx9sli1i38hahl13eo50da7',
                proxyPort: 3460239167,
                destination: 'c61s1005lod48lgavkahsawxoixre4awra7gs6iehwq2cwcr3ikggiy1us9mo7c238zmx3r2zjlushyqk0cpeb81yfc94dgr9ibjniyo7m4e7fbawnhp7qlsbvh06fbyknfgkg727m8z4znemtcoamymttddni6w',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'l2dviqrtgaic159mfgf4h9itndubcijpio506ha2akp1cja3vlmo34gbtpnsre1vxtux38vjr1r4pl06wj8iyoxtflpmuh9bnbx67vv0ppdyqiv04f79pn65h3ft2ua2qj5pbczvpjilu0cmmvvwvg1wsgr76bak',
                responsibleUserAccountName: '0o812wptze63a8fo5ahj',
                lastChangeUserAccount: '8ycjl16vhm342ro2urue',
                lastChangedAt: '2020-07-21 20:32:30',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: 'c5r4ll3l4gzr74jis8akgqs7i7jypu4fwk9qn',
                party: 'a6fe1e2888adydvwp4kb6w2dm5h2o5jqsxrnmsv9p0ig8ed21xb3wvajg6xmp9joixutoynupqxm31qdkb8cxp51ofz04a4y5ufvwk4sfz9odgjkln896mvf19n5gue28op76lo1u8k6c1kj9ea83qkx8hzvgvw6',
                component: 'eh64gvrjl32nn16icaxc082dq39uqr8hijkfytlmfpnrox9jfwhcnl76vr6baq5g11kyg7iw16diurfjocmjmos8aa7k5g2iq50f7z4owg8iv2230jlw1ypyxqi2lkba4rw06q5np1fza09fomsbb4hpxduak1nt',
                name: 'fz0qmbsxy8nhzry5qd7huhp1lfdndrl9c1f7qnf3esz84h7guwve9nznpuzbfi5l7ujhxs6qj4va6ruvcfry9vnhssek7ojxyx0a1sg1kj6zmft269qvdfk9rmvp2iv6zt73uq8hqytzmbz6234g66e7fo3yc45g',
                flowParty: 'kmeb9z0oe76j80g6ab2aml7x300vr5modxuc4oc5zw3hb8b16pbnkjhd5nhss3z4a7ee4im0xzmjwbhr2k0dqv6cc0l7c4egtayr36cb16mbq06dnon451rrxuik634ovoilao2kwhmxteuiwwgjdxpmr5qvwx32',
                flowComponent: '73s0isfh1l6olpgb8zqn85iyearm6abevb0xgbljo8urt14a8mus3o05zllkyksyf0cb142u13q1b6hda3l4rhivmegf3pb7ft7tgk50fn4xl9stpdwz430s7ukrnqvn0fb94zzgi21ahud4fucgds6gzutlttft',
                flowInterfaceName: 'j6vh1cc28xmre5mwx57bce7i0r8l8fo56cpu9tj01i6ki168ja1133zyk0li628muk507bh1y58c4otoypawawtr0r2zu91j67g7whkk54t7telmr9tvgrma3h2cscjbdw8jrwofyyk707hw2r8gat1o2rdkq9tc',
                flowInterfaceNamespace: 'r76jumumqulc7jln5uhewau0nv5x5rfoorezk0sfgbjcqze610dxz7ayycchcjc2xj2s6acdd52yt4pqq3pzl8k5w13g5han6v3jjtc3a32qv42y158xdocllgty3bsu922nwzvd3okkloutvgrfsjddgflyn25l',
                adapterType: '87pohodejvjnb14y2dh233a66nht3himpeariqfle0ep3j45t5s981pef1gy',
                direction: 'SENDER',
                transportProtocol: 'g8pdlycu6qdmk19irziverfjo3uvw6qor109jzl5mseku1kfnhapc65z0s4d',
                messageProtocol: '63dj5ucbocsnan9cji9el7w4qbwomx7fxjk5v1u42ob7bqw6yob909ns8g6k',
                adapterEngineName: '5xnxyb1tijggrlzdd3acl9r7n9s98z0fp95ubgkwlsg4m8pgctz8nquztpxu8tqzedhxes9huwlr9qnv1onv3yg3e5jns63b8rl3xofaxjarksbj53xn4amnipb1fgnqg7lyavto6g0cvlm04wi0rk75v74rc69x',
                url: 'x0adp5b63859ky8g4rmpgbr77sd8iylbw3vurieijho2s78ykrfx1pl50eobp74dnyzgplji7m5ohb2s6shxfcjygv2zrmuqvjje7cksl1nwq4f3liw1owxduapvuua4znk4p0k8lw5t9cbm74cd9ynj8zo9xl8pynna7306jivoteh7gbg0zjw9n1qve1zx7a5f7ddsuhxrz6sqbidjyk5ox5ib6damlfw8s3dtqajov9cuou8vc5obam3o2jdh72ciucz2i9qup5l84jsrrjk5w5xybzqhh8xyawk3y1jfoezihkzzlmvabokbcefv',
                username: 'gsv1e9qs5zmgryrvsh64fd622vocvsdfm5fzxp1amgfmzwz4ukwjhep8naq7',
                remoteHost: 'r1gl76hcpkfohkxnpoc3x4jwsqq77qjjr6sh80vmxlwgjoh2wl8o9z9f6b21bxexbdo2pba8soohf3hkdszuald51tk9vopl4sdo47ycoq78u9kqwobh5zvshbhjy4sg33dhraodycwm2du2prw61mry3drufnfr',
                remotePort: 8699693903,
                directory: 'a1fsqvmdcamj83m65bw2b5walsn07xkh9070f70z263efmporr6xaxefs1ozbeye74gl385ohuggdfyiuxhsjgexde5otu9xbf7kjbr3klkp2gmxyrwdpig6mxhbopqfexraagjzn5tb6lin7piu9k9d90loa8n8wnwr3m576avuet41qog68kicornzn0ih3ee6t5hoym4wx152kq691gbang4y7nn0r9stmld1os1yzkcjnb31i71ixjbr4i0dm7b67cbmyyz91v5iqc7fhfet8l4jnje8eq4msszej0w08fagdybe6521licpzwskt71cms1uqabq0c0t8hmf53ev88ld65jy1dple65nq2dio8mgk1zh2ialedk1vypfnhdjq7mwzfzs8sv194cu71i1j3cbpd0huw04zreczqyuabqrh1eb20f00cvrhqnk6jauftbed1udlcod2ep3m5cmhhl8ecdlgajd5atd3y19itbhol4dgwy59qm91tcaxxlijy97l02az4m0oyr2nzcg6jhp3dfutw7415nnz8y2gqi7y9r32rbwn3r3pw23pc6wiqbjt4hruxdigxeigkb3rlccae3fbra4dnc19nsxlzdqzq7kwfm2n9ekby2e3zsk1z5ttp7tgwocjfhymbs64jwaq0n7d973rhepjlxksjbzv772htirrux464mf85jcthc191bulczl4749l63sy7cjt57i4ctzj4aljtn2v6h7ib98h0ivlhxle2knxcrkzikzl6u8yc8zy5djw9jupvqrbwugta1amozyjtp14kouweq3jal3uzgrpm7d33vrwq6n32uba800472505felwn53yj5apbqsp126agibm5jrksgq3vjdj7xa6zkt4zv5fx26avhtb8wujyzfng8qr3bazugpbhg0uvcl94cdz4r2v3ab1zxn2uuyhlxrmr1n14o914xlz1cdw0cns43joaf8o31xuakyy7xvaop727oh9m4i49tne3p1r70',
                fileSchema: 'nu126o7z8zscynqrcukloqddj3ys1xp36simohuvtqpycyiy5cmckvsue0flqlxn73ze5ifqq1cxb97pe3yled3sqe9lxu2c9rfxawwrkne6ivn3c5krem5o4eayf9f9uvnq8fd92mjbfap6j9k5p9nivs22xta7r311rzoat30bni4042nbpzaj12y7csdtbe2g6szsjb8lc0dkjyaaf1yaovuz40ouodawe2qixexhncs61g1xrsbn11nszcacbg1qtgbqgc2a6kjyurjb4j3bt8v4z4uwd4k1i53uh8c9lfovvtzxlqrz3x073f9c24cj03u5d0sjk0rdao8d16q4d4mmewe9xmxdtr28wrgfa8gxawszo4430ewoy0mq833czmfsq1yxtdfm89ybui9rnglej8jtgbn29beheendm4tnyyadhxjuhpkfp80csqni8vknbqn65r15owjpenpssa8459umindtnx6lqzaodnuybxhhmmjyp7y1rrbblggkju3wcquty6wlxl0lh503ouuajfu64zlmmfpg5b1ucajwkum1jj43d33hznp3nri7zcv1ahql126cn5osry8xckwrkdmesbqfyasmjkow7tda6p981jbubtlb8s1k67yrlstqyfp5uwzfagis03fmjkllqff1b8oorvr2vcmzxu6rlfnazc8v30s4epufm24uk5i710gyyzg6arzhb8sdhq0b7tq3a0a0k81zrn1qjc5y0t5vxkon8w47fothgwibvom45xolph0tgmyp90q7uqj7bfp4cytrvculyluj1pm85jqytd1u1sjy9eb49wp62khhhalzt6720cur061gtqcxi8d2ka1swlqyuqkwatshc0s99gxzfepg6cf9wcw3vans7fbtgrkemrgc64d5knitzdzys7d49b70exlh311kk6qq7mzh8rcjep5v7spilvcecj8z2n48o8358yevbc79qdc90ytsj5n43wgp4u4u2c9r4pvlmm3hiln9',
                proxyHost: 'b86kc3q3kg4shvgzci3uljt87v7v65juyynemy019qe2q4vi0uozew8zyurq',
                proxyPort: 2897337289,
                destination: 'jmtph32axtjnarkzg6nmcm0zuzqk7hbqkx9ey3tryiqyavqyss56osajdllqkzp0r1hk896yl61e5avechymd022wtuebo92jt2qxmymaax255sleo6ejah8ss7z272t57g6icrddp31j2ydj59eqsqrpm8sqqsa',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rfoh3ieez480wd0p9f8r3u3valzwn2mh4fr3vgorxmpvvof51ihik3jzjfm7363k3thdqmzyggnklopbyx9ymq8kt55b45c2fvcpx0ddr69903az1bv0cnyjg9boorq07702f7kqx0waeaqytcv7lyvx2j8p7ltj',
                responsibleUserAccountName: 'c4bpsqgaxfitntmp4v38',
                lastChangeUserAccount: 'w7pdzlkqk3a4reg809lw',
                lastChangedAt: '2020-07-21 22:10:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'vai3ykhntbcm22p5yq7dxtqenfpt4h3srjni7jn6cieg9y8xezi2lclluavagmhw9vhmx9d4j9fvrmn5bm6hfmo93x2odcx2kqetpv57feayztx053k4rxfem8ul2b529q1aveo00y3e4n7dz7xeb8rpujq060u7g',
                component: 'hnohtfec46gyay9ka73ch0dklijopmx387eb4bp0wsc8lz0zm0h1394j2uj95fdizszg7yinfq501hqtdbct1n8hb13idcrpxh3a4jhvo7i2rol9ii270djsngzyqfft8u42a2xirwb370g6cgx4ndyvlyz0ipcd',
                name: 'xca6pdsitzebtqhs81hcdrbwo88a6fm7hqu6rf5msb4u1r66eh9a0dmcrzaljhnlgjvt2pfkjbwiav6egkqod2bjcx150j2bm9d6wa2wvv0ru3moa18uvv7itrrq4tqp7zfu6asvtjcyfaggsb5od8tftj7go0oq',
                flowParty: 'hdvipk4xnv5o2im980teb2r6xdkgfrh2spq6fkrrjrew9om2hfdugb12qp4nr0cqhz0zq7y2htem1ah98a5cn2e8es2d6lxp0srtkubtixs2uo5xlc6i3325dgb3zmu04ktuz20m9av9wdivpgyiclgjfryen6y3',
                flowComponent: 'm8m3fuynlxb9knj0pylqak77288qt5jsckur2o6wf0ub96vqq4sgi3obg59vowl4ijimnzff8f5fmwqx9tkff3rbktc4ip2zc7sjrkq0xvrj09033p2qbkn8x37xdfgdqqa83937aj1yoxfnzrieqevlsupt26xw',
                flowInterfaceName: 'tl7yx9e8qaucuswe2zjm3yy53vrdokw6wxq07aiqxr91y7y9u1ezq7va3o6h75ebi0mmj588d01kbysbafmiai14gd6rphbghpwmdzdoiyya1qenxh0hpovz5gjmxx88zdxtydlxfwaz1m8i9gwfv8293p5u27fr',
                flowInterfaceNamespace: 'xrrbtwe4jwed6jgnbogaxvddtvpv8po50b0gc1naqwr39wul84boc8fqzgo1kas3eko9zx37gigg1u12pt5fqbvmotkwxhobps10rlne4icsxsc8hcmo4em9wmkeqy9uy8xym0pw8no4wg58twpfwp1mxr9aepmr',
                adapterType: '5zvsrgao2z5a1udecufclgs3wqsqv8fqfn1v20qwtdn47lywvw4qy6hojb7l',
                direction: 'SENDER',
                transportProtocol: 'cwfeysmfsqmn4xap348rorp6ly93l2ejkyhsmslchxer6v7cny7x3bf03q29',
                messageProtocol: 'y441xg5tue00vcpxwjwm4i1riww3nfklyqr29vfyfafnwx1k2t0e85mvsqw0',
                adapterEngineName: 'ocgzp5dbw0motr1xbniihj64gxsgc1pxij2ltjw2fk1p7kn8vfjnnre8kr3xvyiirbmgof48oci5puscjgcuh3qyy7wdg0xfgeomt1l29b2cdonsi3r9f0qla91p6lp742ubgd2834iivg333nc53zp9mkt5qk71',
                url: '4n8lpekh7wlvqrj1sy42tqk3x2ft01dn8gz8r0zev42fdt9d4ukl90fqsjpxcoqgsks1qj5xdzxskbq829ux1yz6ozixjv25ldryok7kaqamji4uqocr79zv5zs2ehd53p0qa6yugr2i2megufejdwjah70kg07jo4v1zw3uc4l0ib7sqqzuk9q7dpnlntgldwh33uwzx6fnekme3fqwij9nk60pof11zmp4d63sp2ip77b9f84vdvql8pub8r5zvkaiqkci412m5c6gfe0ftgaj37ktfmlloa38rok82oc22q2g7ah70kno64ubbv3j',
                username: 'hkdbjw0lg6i7bfasho3su58wh3x37xjl1ir2du2v5u8ozxl5xpb8j810zhuk',
                remoteHost: 'vlwzm46hlbvwybsdhpbid51azsft03u99ck5xr4lzwkt28qgnwdztj59wiqu02afhti13tfareul7ybobkwt26d58enxmp2kfn0com5e3fg6sy050uekaq14yh2vsat9t5wymgivou5t768pxxaas9hh7leia35o',
                remotePort: 4010621018,
                directory: '7cl11l74ah0gk42pmy3yujjlfgnm7qnf0uyfn2lyysgaifyqk46nbbh83vaarn1jnfk9bbtuk4j2hq03hxf5axcvaj6mgiwx4wif50yqkxpcjh8s4hca24jrfbzg0g7hh373tsq6f8z7ovx3em000pdzsj6kvbexehk40hr0ovd1pdx1x9bdaa7s7rv0n4siqumzxugawzp7m00me1mnmeq8j9ixlyxizxvzd8jk3eh7q8voainpvmalp1povts0byjj7tpvd2j6wt5z7ijajmqwvnfzwymxw9vcm1jwekz9c3muesk204t6cd35fz6zen79tfkguffqxj4vjhkml2x9saugf8puikoutaadzr4kjsego19h15pl1asg6juosz80z9o67qc88xpqarugw4gfww0hziksgdthl1mik6r2v7wctgvw50szwmt92718vzr9tp0rum5gasfa1zw1ik258db27bydya5bfg51p2na5ub45idyt6r08u5sapv0dovfi7mj0hx0q8bh2g7gjqy1n46laq17v7u78w2htvn1wzlpthbt2tcuc88rovwwrk483v36ibgrlxsjv6js87k2g5vkwvska6cxu4gdo02y39d9ef6dbet6umddbnj1gt0p82t9jjzt7h6oz76xnvrafrj9dhg6tzuj3iq7u5jwvyvh4523k6ucngp41kv829ybps5wg9jnxcxy6ndkj0kmytowhs6o6re06o5ryw7z2bhd6o1mgjl2x4ugd3y5pdm4nl6b3uaayk0xx6l2s40i0dsp4lugjqbi376gxy8omlk1vnujxqjhsu3wkr9y4r74h3lg2a5wwydb99qal57ul9a7vp8l0qms60q8ttiwa47tbm432yc5dthlhl1udzz25jck14bjd141rhc55cj20tvr52d3ul8dvglvho9f2mh0eutkfunad3mpbqfw2fuy05yvfnznva25sgh10ag2dm0kfh0cbp6b9nix44brg3444b57u3bfd25mtvta',
                fileSchema: '0gvd525ygolaa4zambc1d62xap7u64d2lfot8cmpqi9bx000500raig2wegqinkgbi38pyqh3qzjcc8w4szpqd66d1kshnle8ygswrfrxq648dujfsapvzx1s9siy4a0ez7o502kfiarbydch1aay40c5m0mc2zez6bfubmu1wt2tolz2ds16tu6syv7daguzwr2hghmkq0eg9pz1zky3guqdnh15wie9d2qm092ejyb1vdqqvsgg9oufi6wc1004ezjxwt0qhyggo25s4oaqo9b01qwjc4hn238cnrv0eoazwii8icbkv8hfpy0rqs88qus6d2lii9dtnmep8ay5pqijrqpwogtm7vvq8zsi7ox564y6jhhvq0vgyppa9f4eop28r7zug58b25ja7g34wubw5kgo3bzrikj3bbq01htwnogvtciqp8w747ngqysqv1j6au1uwa6dwxingn31uifgx4h9yuq8kqu66qw3mj58csb3fye84c0u07wpuxd6pqvxdrpnp9edr4tn3rr1ez0dwo5zg2ya94ha9yi917i5v30dj2h7uwev6zaqhik5sylt2nyo9c2p7in8fln0zetrcsq0z69fcwh4h67uuaf5dn7c6hp8pple4nrs7sc3b8f7jwxqk7l6dkm7km6carw9n1qnubtnxh0xetq06vbi2jl0jm43l1n6anvt5u1nixu3hrtwilvgcc021qis9lz0ura8i4krza7w831kfrndxkbwq1n4oewuf8rkt45q97opimi9klh102liel0xzhje3bxan09shso3gex9w16unoocsvxdg706edq0l00745yse8qfoyli2dyea45t1firoee38cbxfk800fdnsiytsvr1arkl6r0gsa6b3d7uszrxzeden4kwni31wmtkw1tur4eymvsnbuowpkkphttfas03shw1q9lc201tint4k1pc2et3sevt5b5rxqcljfngzgfhi5vamy1ns6nl4s2miqg6eqel980e81odmo8',
                proxyHost: 'xijqqbhw5xoyfy3u5l7hdkraqmgqkodepiin06tur88spqstz03fwdjiqrrm',
                proxyPort: 2731171121,
                destination: 'wfgeu3uje1n4eug7jwuhwdm04u7f158uj7334a1yflxelhwhimdk3gxhltv8ke7s2wenblh010i8svioj1uh8ydxa5j87c56jxh3nyz2nqq6ci4vf9qycpbdcr266f0sq1ahls61pxfohjfsbljac1otsmvir2ft',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jh22ercfssd43t4h3trb5d6nowfydtskzvk0hnbhwmp7okovlm775he5j9249p5jnhlr4ad02j66wa5g98jtevruz7i857fwcce51bwslkqb5408zp7dqmr80w33bwk9k5nm6oxvs55w79347qcunbjoyig3hflk',
                responsibleUserAccountName: 'ihj4z4b2l0chtdwydz77',
                lastChangeUserAccount: 'b8id1cf5pq0x2hnq47aq',
                lastChangedAt: '2020-07-21 07:07:36',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '16js49fljnrvmld9ecyfgs6pgwiva7h9vxoeuqn5qhbp1myffjbxb072fe8koo0grxalc8ych85tl77j9gs23w3lmwjv6phlf005bps67fe8bgbm6k6zn6vpv2i6f93nugtvgh4swnwbexgm49q3n46t2w8388s7',
                component: 'crdwgxrbgwqdfag7yhl4ps40msn6gl743h4m4i0vv4fnhb599bffz17cvhkih64p2efwv7xp6bkr1slbdfru46xlxqubqsy779wlljh0q4qgs1m1qrpykgd5mpvzysjtxd6os2o16anarmvwicza33r298tsldvvz',
                name: 'j5hxxjgy27icwjp9wir2tob45h3cishay6tmuu274vsoulqkw8ds68xmyzeyqa2vh4s061y97h3k4m5e7sv0vkiypc1txo9v7jqjl81ntbg6ec8cixzyjifmiuh1v6a00ynb13bqs7p1auhuqlkgv4b20agop3oj',
                flowParty: '3jg6pcfseuipzswrrmh9wny7nz0uz9wycwcaccc6g7mvm74lrsiky8eorpo49kjqwirx7cu3ywjapd3brxdvttnkvdg2a96nciig5eyf7xzmuwh29ou0kz9924uzo5nzvm165zglmabq39s5cpnb01fq93ppw6fw',
                flowComponent: 'vk0dkopvsckqdfbtpms2834s7ouwub39houpi5dureczuk3hm6lcvpp67zw51cquswn8flvp6280hdu3lxvik958d2l9hzwt9gsqtybhs0iw18h9em7f5fgq37q8kaypat1opgpfmed1q7asgo4ypi9eqfwv4vgp',
                flowInterfaceName: 'x0zfy8wxmh0tzfb7o4iok5dqqfg0f9pzo4jin56eyo25ti66chy2l3dso8akxh76af8kuu8wivfrilai66zfdpn4ifo5rmgeggoom952n758xrqxxzaqe0hnw387qjvnkdemcamnzz9z6mhk3oauqezqtrx90rtt',
                flowInterfaceNamespace: 'sjagjpnei1iysx1isldkr6ohb01fx5coj6no9lylx7iuaz71o8g3h0aogwktdb97suxmdloan6fao4jj0k26qkuvm73h81lnxm56s0lb2ff1q0ikiq4d2mk3jv2wctwhzc3908hldylljyoj5gn5qve4n160nc92',
                adapterType: 'iauu7c1h2m8aa43smupbylvfb4bqrtgxgw47rxftrynw0eiur4jya95ebfc3',
                direction: 'SENDER',
                transportProtocol: 'jvr3bnxk3glyu9oymvr0irpot8jklnyejxbqwq07igbcol19sxneu5amroh7',
                messageProtocol: '1l75hstlpru2m6vrenkve0xcrojurulvulobgzjg1bz4rhlkvd9w7oa1s2q4',
                adapterEngineName: 'lmgfb7a10yforz1hzk0tgavt09z73wds0e0t6clzl0qw56ibiivao274crrhlwnc1ymv9b1len7f6i52r1mzsyfvjridbsd9gu1nxzspkxykeiyjo55vkxmmxgmh1yql7wovcer37htpq9suvfitxczcm5go47g1',
                url: 'k0s2vaqtzxt9d2u639cpxowh42kctebfycu8hfr13nufxhd3s45dt7aujwm44oy95876uzfxc1sduq8g6ayrodbx4hn8cpbm11dpiu4j65tk7uxdmxa09yxu3h8t22dykuyb10ctujyq02c9vhlhwvvxglklf56icy6jkph7k6688vby9gcvnvu8fdd7lr28gzp0ibm5y99qemaasuz3ga1fw4fn6m9960lx9qutf5oyge8pi91wkg8c7zwk7hg1wsqpjf9tip9q0vxu60viukk3oxiczvm9fq9t6wk2y6to65nlddnphquk6hv3o4re',
                username: '4iuw13uovb87j9daiglvb1y99d1l3tlb93wn5ubz9mta22joat7tmrqouj8w',
                remoteHost: 'bkqq7yi8py8yc0sga36rfqjvfwd3gcyinqn20gy70hjnzclnb1v8e053ukoapq765ui88hfq1i5tivd91udqwwa1w286wx1c690lru8q6v8p6h0t520owp85zke4npwq65x0tll7zi2m2zs9lmlbch1ucsei1e7c',
                remotePort: 2043843608,
                directory: 'q135pd2goh0vt45dad4e6refv0jfudjxx7v0vitaltpeu8e4x6vlnxjln8dmyt6eqbter84mozk9hkylsrqrwulijyojzfhjno44yhyzvntuuwlq3vl7xuji0o031ae7zzijuz06ackbn70llvxws2n8sdprx0x1qt1gm2lx17r2zbibj8dk8d6xgc4dyjq98u0kxga6yipvuoni5ggykf3l4rqlugwvy7ic7hfv0bsw7c1fbq5lbc2ut6vwydrk7khgf9wd2iabwv6v5764kbydvsuk9rpz95unol9nccv2fwucgl7sro48jd1ugo3d80sfl70m8xfld41epdzc4fnrt54mjwwtsxgj0tbliroze55x3m0488n1jialj1w8sbadp1xrqp1rg6ej1wbdhz8zmffnkj3iq8ituhskn07tgf641ljxd404nrftao3aosqqrji8qocj5w09gpzy2lkhq94bpm0tyolggzdjp7hvaurhg8o25adpqkfr5jl7rlo02smjlc2zqltqokpujjhe0g8nw5h4q2vf67d09yybxivgs8ku2lqm3eko9l6gd75jjwuhmqjxjfb53obt8wiuirexoffqchcbx3m3t1ctqj9gnr6oliibelq0h58grx0esci2v9957bnfoipc8wgmima4337yojd21sjxc3e701eg3301p7lznylver54rhuc5x6qqus25wv9ztcw33opqfao2p2wq5yupokr1vf91f738ak6orivpk26rhqhafimysrt66tdg9ypszw3o1ijr59snkqhr382oa16gsdwe1dnl8unfosfojo7on8ijkz5s5jsfl896je3xfyq04lhxltta8iwl70kcgnw7p6k915ms3my8iqs8ohugt84iw76pkqyymp04ts24jitgu52xxfg7358qey9lz00cp6kmijycgwt0ukun4hu0z7iihm9aj2hp8tcmkdn0vq2w68wh7fyc59a6xeza81icu1dzmtj6aembvokcreaaecw',
                fileSchema: 'kg6lsx6phn47emretze3mwut73d4ntk201nwpcu807ykmfd11853tx4hmzv42x5x6qbdkibyj70ydwph8yn4sm4mvpymg8dlbd0vxk4o8bwhekljwx01bflfvt8ipqpvx0k9z1cq56dqnwyugyj8ehqm6mst4kf49auyyfaa932kfz64c80gci4hbtck8kl8cy96xy38y6va7jhmgsgqa3if27a21pnhlx76gsuo3fqw1ummairagkk0r58n0r4n5sn104r1g05i4n99y6a500vsmvlrxtx2cg3iusuar4hpb0fo899dptv0of4mk3eadyc5kq8qq87ndwtiz6t1tw6h707tpvgh35w9bd7292ozgzkyt4uhyom3ia00f5ff0pklgx6oyac2zzeter6dh8gks2lx49mrfm83fh76medgewqew6zusm43zn37fkps7dwa806rrui95t92msduuzbqz0n576veyt9gtwyivzrbj7a6a79vtiwcd18bs01sviuzxpmmmk1rz2j51f55wjfbs1u0s9mtzt93fvwcutcsqix3tfpfepqw8m7588ewha3jd7puu6ijsrqwfnimvb828jtaua391pdqrsvizycjjk0u7yymja3hi4dx2kcwa7lcnohp0lg894u606kke1w8bhad1p0fn746ljzhx6rzjsnituxymq3x9t109w3n8th2a512ht4lxc744ewto8foeo8bdirwz7hjn8qc095j9kx61axna7lrhhyiz9e7zwpinj04iuo0llcvlh3wpjy8ad1qu6n783fmqx8eo76wns2j16ryquwjy5nso3zh2e8e2awmwbpcx69akmopxedbtyfxnl9god5vmp7u7qpj3thu28sibpsm3ayl1hi55lwjebwb1xyrxrhhsecwx4aptosv29x64u8wxzztvocc4wo0xvset4xh26zkq6megh1h6bkyc817i7vqideh1vroq55kd2vuegvia3fteh0lir3gypz81r0p0tky60sl',
                proxyHost: 'aiwilalqr731y6pfxlwrx8avtzvwqubloxva99fo1p4dmhfujyallq9o02g3',
                proxyPort: 3805098153,
                destination: '7ujpwuvqa3vx3i7sjtp4kaqltq4ioskgnghx669oips0cc9umc75kr87h9xpo17sc5mon529ytveqmgfj4csen8rox8mxktdwl9069levizrrnbq9dvz7ntjgqknr4r84ep2e6jweugyd4ku6rv53nuyy8iish4t',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'golbvjt7b7rzq5b9bfenfh7eoqz2n9at58g3g5a8ej7lui3iq2d06wcu39nr8zql2izy3lnx37l0oclgjzhb9j71zmuchqjlt5ak4mon02vxcraff0zvtc8ujvcb9bue66rusl105g79za1kis3ewj7ssls2n5of',
                responsibleUserAccountName: 'hi0ltiwl1ppoznkp6lhp',
                lastChangeUserAccount: 'ywywlbw9slign7jn6wpw',
                lastChangedAt: '2020-07-21 03:20:46',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'zs6j347rod9244b7yoqvd00lyyos3ohm9ayfiwz4uwjfy3udxsvuolvkztx1sxk7lz4f2fn1xr1pd1jrwzlmb13p1e882sj05q19mlw6qxigqmpel49y2fy6hfdq83aklk05jeu12y03jtluip87vxmql7fdx092',
                component: 'gngqowhwjjup1m0bzthvkujxi3khuvuohvt0e5b39dv9yyk7cgvfnlj6z2ynmg9vs7uwz0lia2yhvz7vj6v3b8gbowtojfh8idn8m682ko0eghgms7ex2xdqw2z7i9fnnf1w9458ihnvpy8fwiynvajm8k8xiieb',
                name: 'zizaaeh3l4tqlvifvnn1g13p2un3d2srvaa3rzlaifsk2sk4h6x63eiyg2nescvcwor7bskbmygqctbcn0nupmr3lu66zx8mhkj0k8s6aefu1xlkylbsr6jigzxa0kt9cxjn1hplu5chodc0wdiaylicqny5i8g62',
                flowParty: '9axj97ywgepqh5tyzapwxtog7k1hw4bswqewgu3jy89l1ia2lx8nqp03yaxedts861sv9oq4995vv81aqn6t92hzm9ltyk5bgjbl00hgl726hmajobx6jibj66cvaumugdhl4608dww87qf3vzc5ffg8juh85qyn',
                flowComponent: 'vtixfiawk13e8b4z8appbnmsj1aelu3hool7vc4tfkxdw960n19pihq543c9cu6nn0hcobfrs7vjypcot7ipumu8m0tc91miqt9j5xllsba4d8bwijbcvu21m8cpksacwrx5iq7kl1d1iw7iy8ampd07zz5zscfc',
                flowInterfaceName: '2wa05k1i3tg63qzkkczrvyxhbm3f2eyscxsiaxyncx4a54yhhzxslieltgeggv2x5jzkg8l602g1ox5ykh1moolnde4na3swu53l4nnm9uts49jpal6687g1b7xamd0zh5fna7y57v1e4efdc9jzy0ywm40ttptb',
                flowInterfaceNamespace: 'gozdwwjoeh27gtcpn2l7q5ia5kdjioc4q2z8mt1u9mj1rdpr980cr8xlng7dtjdod2jygly7cicrlmtzmzlb7qeu5su40vyuxkihynm45pavbtk8ee1p6ao91goodv6a9pk2qr4djo83z0o076m4qo7gkuhi1fuz',
                adapterType: '6wpnme6o5v0v63d5ur8l9l622g2vwxp9m8yok94ch7sd8kdl17cywah3k63q',
                direction: 'SENDER',
                transportProtocol: 'binudqotpv0y5rbm6qhrp3y3n28p0lm1tt8454pvrxiljy5tivkkjyg3mgtf',
                messageProtocol: 'oo994kfhpf3b2kite21zlb4idx64xrty1quh825z61d3d7quffjg5dimzkow',
                adapterEngineName: 'z3gk74tza0qnvzvge2n9p0jcsag7gfbb88i5214288tg42byoz8rg76j2rbas1cr5iwrqowv9ov51y3h259tz5bzywvz32wtie0oy7k1jz2t0jzft5nw1kgd00k4c6dsgbo6agok5cd8ss7mica336ddtoz8xjao',
                url: 'iapjnoapjzh9mbj242waip3ndlmqlpmnf6y90zanlhglyyfbxmp28sns7x1jianc8gyuqw56fjtvrk3qfq0mswq47lgfkb87od8i9y85kv69600jsn87zxo97yrmo9z7i61azfh42u8ddzm8cgjyxw796fmagut8x31f0mt4mb8s2ra3m0zi3fh12ukf8pehur2uzgpdzc5goz7yk59cqw8w0povf7hqyvewaklge21k3k2jw7mehd3p6kskt5qd2jyooavm8r5mec6zn733y3hy4r4izc5y42af2kmbkobcr78a7z8k7ivr5r0zx2qm',
                username: 'jb9k7evu6auuxgtidv4oiy0xbaj0inbmtxlvfv5nqx7ijlc7w72oo2zukr1b',
                remoteHost: '7u81y8uosgsrgg6azo735zkyla3zul28njnt0ij8lj4laa7bfakci82kk2mocgtkh69p4ml630i0h5k94zrto0cpj5e125cq57kp9vzw1tx11ee281rxjllpohoh19z3iczax8rzv06dhyi04cj8z5zx3yghz9gz',
                remotePort: 3003755033,
                directory: 'q85t59xvhf8l6dg4mfcyiqkx5dvhbephx0nvum048342zacvckk7kjepwuh1vegr5hy05h8douqsk18wjydz7c61696j7xwv54w4i2au0lw0l2vggffnq2zt6umyf8jjpswvmqjmb945lslwfavc70gj5h29pzgp7rul95fpj1k1fokz3nvcwrmbbqmaa6r8tn7s64wx5f0cjwru2iyjneqhsat9mmt5q879l7jn3obftp3jtxdodykw3z100zil4n26f0d68tvpa2cufxakytyqzomsfojakz7ho1yti80zt7w2jfy27kb4jim8ap0mlbh6kbdi4uo8z66o9wtdgizcmehllklygjke841uhm9l0a1w8o671b9d33m0mv7izfifmbyg7pmawcdsa80soe1yr86ksyz39c8e1s31z97zrbh8c7rsjuw2qnusy0xz7j1opkea5mfrsvue1f23dyn74h40qadfxm6jf5l933tlhxbs3ihazjkhnr9safo01qelhoyz9sf3s0v15u5vcxnq6vbxyqyvqkwrmribyx9mtp0bai14r4o8bzukynt2oj4kv0ybom1l58rx7a352699lfbxva7ru3c90enwh7au23pad9p17mvtx7lv0kqcsgrhmqi5chyxprtqtsyfsqdlab3ux7z10rodsxk9a5aae1wgg6nymlnfggoc8rc4rmc6mlf0ka1vhikbouc88sgpjhi8lvap3bj15cbdymhz2x890ycngr9j7khf4x32byxfemp1e79m4ycv39rtmu2ni6dfvwc9lahbyc38427nnjgunhmagkg3l6o80145lmhgw3fydh6qyuzoex92kcepabk318khamg305hx77zsdd71ln4bf7p7j036g2uqexqn06lr6xvitw4scihaiqyebz3h05ahmco68xekn7mzhfz67jy9zcjnsszcbchy1iek3t1qff10ehuvs29h5p684kn3mwrx6h2eow7zsm7abc05vigo3j59sb16nrxc',
                fileSchema: 'f553afaszynz4ug5q4mqec56lvib0s1n6kck7v0wvnv1ol8hvsp1zea1zajhb8q8yfbbnu301f1e6epqy5xkgd3oxiyabe4oijffla0w6sph078kfj2rs2ezs3pgpph0n8bc81ya8ruunp1xlvk7g8qr1dwopfq57c30lu39velrfjxww4ng798orpj5qzgmirv58hytawzrxchnv2cz46uijejgdljh2d1k5t9vny2d8wpd89tml266k0ig9m8h5nee0t4t80dmow31nzdnhqymit2i560rydihwd4xe622tocjtbyvre0dwoz3iqdudxoir7hagyagrv7f4l4rvcw0ovy41jmqqedx9p6km2qjlpuhthn735xz8k4k2c8w2odalacj7bm8stlcpqf3lkysaffi3p10684h94nm0feui08jfkg396ja71p19vlkp1umukvw8ha4b63j0h4i9nliacmy8xoah7hwaphle6pr2l5o096dyhabmtj9ui3sdh9ij2938zx3ul6mx797iiogk4lic0cqeq494b1ja5g96rmdab0cp3axgohuczg1s3872q5b54wrrk5f8bu3gpu8jvdca6ujgljyjswrm4joz1dkdmi7avavjj0ibf9ib35vr58y9edynes8duxqtm2dg1gxosexp0sevaxktu7e68s8h8lx4btx2yro4xl3pljnbj05ubbe994q7xwym4sas4yfjh9mq27ym8h55edvbp4tbz3xa0puj9xa9oike7jkdsaweea214bu5xwa71h0cf0fdjdu6j5a7qxqjzd7kc5j41mqkuaq23267717oamejxhczv5xp9ws3mcferat5a2mk41w8l1pp5rksr27rrq04r74v0vomydokzye9t22w6ysyo3b70ykfw44v0kkj21r4ds13q3jfw8g021ipi9t3xs980t26xg8ah5vtz2knige94vp2vcx9klu6zvuzbr6ig8g882td8izkdwscc1uoga7satj7zv62aif',
                proxyHost: 'cuwuh0xt9qq72374wg9u53xe0u80m1m0yttwdb3y7e3t59x3k3vohjptjkjx',
                proxyPort: 2749540573,
                destination: '2mz40ektx9c4mid7x8plxbkro7k123ldxk6wqq1yn3iepu6wv0ume1mohdwgls9ihum3fd553fe1wlz80yal2s78i1ryrw5c4gki8rqh4pbbm0vd7trbt4nv4rr1sl9qpgj1d4pbx7ie1ilgzj0fnt61ssk0xuzr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bnpnric3sok18wb3atzf28q80yvk1mze68mnqpxvdbggd4wkdkw553da26uhowo2ifz183o6oy06bllrmqxq55q3qrq0hac6w5zdwy4xd8d95y7ubs7bhd8gimkxg0ttl6k7fcdnz13ae1nlmjok7o6xmyvgrvga',
                responsibleUserAccountName: 'kpwiu95gpz9jam0fhi3a',
                lastChangeUserAccount: 'agu4g0haylkdzocokjak',
                lastChangedAt: '2020-07-21 02:43:31',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'qbl0zk3m4kfgpx3sitw6cahswav5v2w0e9f7xuw2r632yjjx2uofljul0zob09wkwocch3dhmh6authgeulvg3qknbx1dmbkkjbd4y21b5bl27rvka95u5761zg0jqwaah0qb1y23ft6spsv1429r08ptu985o5q',
                component: 'z6z6doxsjaphf0fnlsq18oidsu17zj61c1mothy772y2ncr8e49atbbzba4viqwzagj7y8v9vd2m0c96vzlvosf6zqxrx4sfkmif59gqvnybmp017d3ql8cib1x1h6obitnfv4hxdbnvahijew7kk3znbv9l0o6z',
                name: 'dsjejwiainc6m8tgy7jmwkwxwpxs8cpu90u57occzwpon8wwax588k113hmrp8xgz1zi3kypwu1mrssux2uabpf6m2w9if8t22pzt8rouojddy3m9d28m4yauozknzjy5c4wywn837hr82jscfxf4osb45fuf86r',
                flowParty: 'gz8m6nahubqiwnj7iykhz082jua3uom0iv1p920rb1y9tyhoyfual6agvqkp2sfunilfegfpy8tuz3fjw9bxysvzatl6gw2krg0ynqbx7ma4l81kdy88i38wsjc7snwt87xftcz8clf21r3z758pmt8z9u04agore',
                flowComponent: '9qsh0509sbura6m36xcqox8xlv131phuy0h4dj0uy6va7yumkl6bvr9n94hog4jtfi8ca2i4onw7bfmszff2cnzh1pa88yyutorihewu2crhb1la3via54rrq2yor2rrogvi7ohbbbcqta5s0334mfwygbovgc8x',
                flowInterfaceName: 'zdcx22dtn8v7jfkwmnhq70e2fat9valb906rpania91vmw64yt86zg5tr6nc9785lxogyt46eudvrupccp29osrvxbjf9hsgk3aegi1c7mreh9bimuezy0k2h5txzt6agvuyrlbmslvhyb4rzvnr6xb9xcp0af2l',
                flowInterfaceNamespace: 'xtduyt7ph6x265c8ldtoxthmw5a5ftvdilc1yphkqj8r2ytrtswvt12koq9nyeqlwmppgn87jsp5iq89njt9fvj03lr91rvjzhlr7nbszc5luvf69hqtxufahxoid5qaw0vd7y5opfsidv7ka00j3vksvaz3blys',
                adapterType: 'g44don4fgipusfyyjz4875ify2qgt725xodttjwz1d5ogt9ahr0ce1hyk3c2',
                direction: 'SENDER',
                transportProtocol: 'z2067r9xnaeerv6pclisv9neq9zr6y5kc2hxg3kep07pkfjcyyz2j6100xsd',
                messageProtocol: 'i9vni56go6srhko70uj37qiaz5ogsjwn3y785dong649c1e7etytvndd2bn1',
                adapterEngineName: 'tjz3241sbp0kq2rxkl6llgh89drysdtivj9obtgggeir2hy7fv1laeymfa4b2wbg3ahn78lcz95f517xfjfpfnibf5eeaxio0imb7uk4jauph9cgfwcbb17ygmaw2nn65p2dljcbwq0kf6cw6yez5wehyst36wbp',
                url: 'q50om37m2lyywoqim2ylmkovhg8139h59xfwrqvgpsnqppdil10v8ik4gkf0jr8tpfhg1hdjkcda40xcct2v53x6cwaae10c2eprb851w9llplctb37wvp1uipqsni15e0kk0cai4hwoiw035hzdrel9o1ag7e1zp1k894mgqxj04vbf8wjf6je6dj3g1dlj2as2c8yi3cmonkhd1oxee7i9c64lnn8ynnoc81td0mjb43q9vhmlm0m5ng2anme7xgts8ntiyjicpi12oyg5ekri846noge8afflzkpn2nw3shmok22iojplidw313qf',
                username: '4js40g512ob1tr7vsxujmap1inzusthw9ct924yck946rou6a5ck6io16r2i',
                remoteHost: 'zzruqzq6kuignvlw4241v4ydp8c3n4osdsyxim4q2f2u6wzbvmrqan0b64vspscwb2uhk0pl4mkuba82g72b2wyvk5tl2wmudqcgcme6rci9md2fdmskdanxueq4zfl2yzqlvvypw7z1ts3slfwu4hy33llfbipn',
                remotePort: 5216556306,
                directory: 'w58bdmbmf2nru491ita0qn091hwpik3e3p4ieqop5ap67fv5yr71br14uy4l4xu4zoxsv7st86s1dd5sei9xb99dmx67dszzz9xasb5t0pyx0m5e35dqlhhlxc9ggomr1riz9gjpqy5w7v09flvr5w8aq2s14nc9pkdab9pbaiped4t22iegsmro2wqyqhmkdkxq9rrw8aeg6r627peldv7m6zto721njlv190zvfxvswh4o4b5k279c4rh5n86hyue1tpe5xlgq4l2pnpfadccy5ntsodst2nwgimuzy7itp692p79daoovgll1k1skr9szd8ov6kta39g0l3btwawye6fjs75l9qgao9g1pzs06xko91fu9iwmqbtg0jniiep6cu3e59nsw2r8swcjzq4loe6kfsnunv684bs5nlsjhg0l1ul4ynvgei1xed4110s8es5fhofhq1q9wiz023qq9gd857m6ukm7pkfd6o7dsjtyj1j2t9tvwjs13t633a8uhas5m4964ppj5z09epl0zc5dhl7jgmgbrdw7l5xcklfs0xabo6sft7cophweiniqujwqxea77a3qed9blut34l84gm2m7i016tvzenocex5xpe2ryxu75p87fqvq4g5kom3z8xfllcfgpilape05n9e99ru0eoh46svi3h4g47812g1z9o9xldxza73f9pf7mnvsa45yj8fwe2r3o6ut8mp7kdkhvczkal1igqgifhr6i2f9a5s1cyfbgrosc7fz602uoltk8h5p5idsb5vj22szwd729dek737ix9chksdun0to3epyeym7avkjd3sh69imblmrr5moxpb30a0fp26h7lmxy3uao04taogx329fx7z2x5yb2a2ged1bm0grgru9he22eqmvzz1fwq91yeuflgoycmb5qim9v65qtgobspdtkh0bcw4miu46xy8tt25imm7yfwldht7fou3g6eqoi71r0pv6rfmwv26lqwzz166zsoxvnyggnudf',
                fileSchema: 'm2smcdjf4p32aq8bcr6yvtbctb6x48ikr3kc3wen6wxr25tthigaemxyi81hqvqrg7jkxxllh22gmsz607qx0ksjq487idf7vqq4gn18d2f48fk0kbui4p3gp8k7ltt8yxgmrvusl5grdyxbqyfn5dp4txai8pm8nqz6ygkl5n3uqlb38moxbbqo46lr0in3dqk9qdp2ej0e0n37l0sxbezapmocjwsldb95ccz6cklw9m4y6zxdgag7lqtmqxse9yilsezbprgi9ern70q65p7558qseznl35wuprb46nb89whu19uuonzy4mr378rxs4lj6innct5hd0sniakpw4td8hnbp55zo373fg7higfw4ef8guyztxhbosib42u5ajkecbc26jfhg747f08nid3a2vt2cadowdgvmpcft8u9c8qw40yx2ia02k6bz7an6fh61pqrrsxjjkdneouhnyjps71t3cxrmrey127pyqz8eum4tyxi13uq30viwu2dkx50ar9r6r6yyjn6oaf9raaijkqvx9gw9fvgispg3p15odj9y7z9t5m5hy4jih80wz0gqkb8v0rm5qh18tu1qk2mybuy3nxebxgbqisbjgtuz9bzim3r6tcrw94bf90o5qq2od2w9zdlr1x83lak4gdrj2qzfsbjkyc5gqm6qewv681miase5dc645j10sdxrjhtom9clon6sz4d6qhobgch6pn3pbn0q9delqmbgxi353hhtqjgmlwv35oxhbcrdgsp1dojugzd2uybneulweqcn7akdvzxxlzthspjft42s64u4zwao1loa5scl9njwwrg56y6sh1s2cgbk0vvkprbfg5hatqrij2xivtq16g8zjxiy9eys8trugkrpp9wwxbs76slq8x60p8vj6wojewxqyhb8609oyoiorwi2yaw0lpmcdrx47xer6edcx0mk6maqn4mc9v31xghxwikjs21hh3wf02xnj4qkpsnq4c9n11jfj8ivhfx0cfo7md3',
                proxyHost: 'n62lehmynq90pql1ccb9fgbpujo5qxryahet57xja9meqhpevxt2m4jinbec',
                proxyPort: 3314548981,
                destination: 't0aj11qtavge8pfkx54m11ako8qc20tfjrklxvp1zud4iqsxflgschmx7tzhnccfd8eougscvfg2g3c9hddj0n4oqbtpfn64gg4o2iwy3k9r5ougfrz5skrwwci8vg5nknjedwfkr9aot18z8s12m1xqy90uwgq1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '000u6b80x0o0oyngdg4rclieatp6bbk5eno9i7xzykqnksdbulekb4mw4a1ftgdtmnnq74z2ecd09qijcqk7w1ipwpdvfzp9ki4oj958gjplg0ed4of7pe0v2yeve13rxhh4pahz1xii07q0hwwik9b1ik8vkfby',
                responsibleUserAccountName: 'bnkyak4e4j1b5uiucd7t',
                lastChangeUserAccount: 'jy32q9hr1tbs3vdnby53',
                lastChangedAt: '2020-07-21 14:39:41',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'htinhf6gky2ym5iihfnz18pk39uciuqjymzzbt5xk2nkuf3actbswlgvni85e01isbqfeb06521dbuou9dz26hjbjl6gstsd5tw9bgwht2q8o1at9rlebhdu7tqb5xbb0jdv84oz323mqmfx7rhvx7ih60sjadkr',
                component: 'ql4tlqtj83lu41n1qizq3svlk791hd7i289oe1306z59art2rj93llbay95pzd6a9tfvrtlut3p6sncruxehay1hftzo7ahhfzz2hhnc7qu45sdhk7axn7z0ffb56h0055t78aezcjchz326rlt90f5u60ks8zwf',
                name: '3vwno2lq9ph3l96yrj5cnxsi0i062gvu2z46ibzl6hdnoctza21dd4nk3j9b358sm9p1inlqff6g2npyz5wedd1ovr051y9buhnw7inrrybz8waczksfpnv89eg0loqqyqsqc4snco00qey3ffnmt8oczi5a5n6n',
                flowParty: 'bw9y3pf4ussineuqojsl8ucprbmefgszm9ltqrgv4ddturvmcep7jcjg8zt8qeod0g20xqivp4t4w9fyyb0hgqjxvs2jkkefu5v0e3d7fjcqwnmsaff5bnoffk2pajfn6poh464a1cqzi2mqo1o5r16f2vpfx9uy',
                flowComponent: 'p3kk6o73lus4s4pl7b9q1z69r820av1087khbw9m4shb02nscs67huqhcenqrx3tmj4x9jsoo9cves8r2cod70nu9fbrolsjw1vgx71ynm3qvp47m905e78vcvshz28erlr1962gl2m5knd2sy7ukjh04a5yp0i40',
                flowInterfaceName: '6kevh1mx3z9wg11glanl57noen8rnvooyn1zmrn3so2j78zxx3cuoc0r6f3lwcpskbc42rtyq9j188l3u87b8p3ki78yujz1sr1hjw6hvs09lj8khe61mo0ajdtl2tmubm5p3cij74c6mwy6sdttchuvtgiyp5gb',
                flowInterfaceNamespace: '30wjzlssqqyiunbtva265a0pmbbof5g543of1j92tttx7rbrv5qmmjzknk2wkcvlxuiokbn1izdcdvphroh5u3qpeim8mubbtnmowz9y58lu3xyh423x1u1fz23dzszd71nc5f3e406wfrrtoyup0zu4euzythrc',
                adapterType: 'vsad449dn459510odmpw9ujlqopykvvm1gz1g3e4x6nl2fjjd3gsqbff6dab',
                direction: 'RECEIVER',
                transportProtocol: 'ubxoz3264upnhwuu1n84xoi5h3dtpdc1sb10u13zdpe78wg1931ghb7enydt',
                messageProtocol: '7h57wt99p25l961rabr5uutnikqx14ol0xe1pdq4w2a5r99i6y5mqcx89k7f',
                adapterEngineName: 'wrcmckacynir55a2l9yx7s5e96m8vjng4sc164zth7iqkkpybvbogc7ncg9h32ii56qe40gp90d4u2y4lflajay16bkqh7okzkvqtpb2rs59nl8w2dadic6v5qqjkmoovxm5oaucrkriscnnr7f7ilffitw24iu7',
                url: '66grjrztcwf050xqnjm3cxptlpct2j2vurnk3qaujbbje6buh7tw0h28dvm3skcq0bblea4f5vwcm4ckqrux4pbbjuazdu1l58311dojmyqjig7k8fbpjs904nf1cd2kuksf0yo82k2st23vq81ye3bulg4mchpnvn85mo4fpk79s047z2ub6cwr57j18czm5m7g1nogqldjqq1wnsfiskq45sdzdn87gdnyf46sfcji9ukeefq32rtl1sc6nje5xd2hbfd61xojch8ypno6uru9p2h35p463atqy8jnyy48bykkawexfl9k52ns0o58',
                username: 'r404oc15at8bufvu5wjgb1azy5im86756uwcmymkzsi8intrnlqw7dmhasry',
                remoteHost: '6hdmqnsss8h96022e91wuwe895cjkaabn00ranpknbtzuz2wfhiulkyr554xezqfdtrcj8t9qwmfbbkcjzjay6l9o61j6pfz9u04as3fani0359p46g360h41b37hsjn756y3xs2ywjw8zkh237gpw38tiqifsx9',
                remotePort: 7497361071,
                directory: 'smvxjow4oupldjl4ttfhtu3ndd9l1fwccqh7i7yirfsw3o98j3oxkjedz07n06ctjg2lqpjj1p9e3mtpryqtigeoy2l7s2q9icef43ugk4vfjf1khs6yhsgfnl1zb2gm4wb3v6kop3rgfcjo209o0rkkiqnzbwtbh3j60n6s0vo1l6kpwjkby861twdeto1wdp4gmurmb1vigl21j5k4tfpc1uyswn4et09r0zsp3poe6ioesh6sa5shjva1bl7445qc4uymns6o2glk0k3ux49lxzkuqdkixlyup4yi17rpb0ozkejh54y5cgfpzpgos8psxpcqdlesus3ipbbph5t5nmoj1ap21bzd5d8o6e7iwgy3lb29ku9okbqy94rze6alj3b3ty1xg3zd0log7f11q13x59hveupthyu3l1fdhqe5ku8dq3lh0l9hnb4d1mbvsax95h1xl7zpzcey7rfrewkrhmiadxfrpnnaqmftqt1vggwo4gj90dnp0bgnie7j7hw4j1mzl3q7kk70k5aa07a0jnn8zvwtqahs02nv8i2rncbgjxvyqjtcje63ufdoh6pkkmj0ae90iswxdiv94tp8w4prlttud3itr3wyrxt681jg0psvdiawd029qmcfw35ji6bigfzipywkzphuunbfw0lul98vrr8amiznrjwvlifiinyzbqkd02c66h6l21wryioal0xy4oeh426zwl96g6apysu9k7yhc31wbz6ckekoeq3q4t0mj8iml71pa9twej06xk55l55cfbs78sgzqvw087bkfle9jg9ijag3w6s32qwkki6fufxt280mdkzqc1o1homl5m8bkbra1k5q5ymfj79us8qvzddp37dg6h3sdjmqsspzeu4kw7oq325kgigawym5o1eior685rpgqexis0wa0o0gysy1zz8anfwfjy3skg0zon8ksr6x4b29hvjzeh51edtbr7i05b4whiujb885tb6hsl8pytsemv11t06uqrvmcudw',
                fileSchema: 'ay4ukozhse7jwgshs3rm5t4zsavy0b48rxavt3mzvn66nxno3mn562r9c3bgi3yx84b4r7h1i2miqvfm4y9kc4o86j1j0yeevz5zag9xqnaq80rnhmykvek0q5af8je49vlut5l3j3xyi146kmyfcoofvgnupu1r7v1sp8tlpt45xvetvls4vos6mg39k0chay5f4ha6nvzdpt291ww7s85jspl25diop1bysscqkjeznvdgsk8srihhe21ul1vkbng7gjhg6q4tsrfojoyvkl7v1k2ztowc2qmj807ggojmw3w1usk2qhdxpux2p0pkgry853docionf0lbgr002ml0z0o71kpw0yp30jlizvxxt8urxdxpsrz01ou4h4wo0hhue2jt1vdb6t4el8on0wuji1h3iolqt4oj96ooxuoepp48eldtvid663gzbpdz6n15pru7poa20y4tn7tj96t2nisemf2uxdaa5rvsfaegolnlz0s5baf2ryx0xyktdu2skqtidxveds2lk2l3rlxd727f501i8jv1h1ycw7yv8kav6j32ny408af7avodmb4ib0g939cr7ntso62pkf83sp53s6hnmjz8cuechrfy9kh6cptfnfujgqctf59hyn073ieqtump61ukfjxaxdzsc3zr43f1hx5fu8stlj9mnnimc5fb6hn0vkwplv33kslvg1ay8z4cy4442azsuatxqyg37x1xfo4ak94qsc8mo1ew7znnctx930yowtgwwr0jb1voh9rwvdsrw4fz7g4h3ddj9rnvmz4lwjd94agh7l16pmn5cik55z545ns4lt75l99pvsf5stv8wv4q7xu7vihw95rjnkqgqj1vdn0hkzsjmli6f1fp9nlgtamv5ar1o1kzx4d6y3qfboys81judpxinfotmcux5hbsh310vnpalcf9sdfeis4jteifadtlafiuetlb52qzeng8o48k60nb1c7tjq9k5xiq2ozz25heolbl4xq6fs3oqo0v',
                proxyHost: '0f2b9pmqi2m6nry6xp3mf60yvioowx2i3ei6zdb9x8c47l6lky6w7matccja',
                proxyPort: 9948713102,
                destination: 'fvlktnln6dckgd11whkmn9sxua04egpy9hsdgoeu177fx6t5yl9uteo6gru7rjbbpc6mcgwaph3brwzm6njpts2p5vmw987t6oqurdv9nai80isuouwuk4eidsbce6hp12tpr87u00ic0r3378ckai6jm3ovr8wc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'z88jdynjri7y7bj9epz5hn5631hi06dt0osiz8nqzeaf3s06fp71okn8kejde1d34wf1b72wfnjf6p8w2hyz9l057xembr7y4hj49v9saawguhtywqrf6wof7ay7pzejpvv25vj05gz3p359b2q8yngnd6olj6ok',
                responsibleUserAccountName: 'px0j93soebesm1vjq943',
                lastChangeUserAccount: 'jkgnuwqt8tzxsnp1pyj8',
                lastChangedAt: '2020-07-21 19:38:48',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'xi061bsi18wj514qyb6d06u2xdohzb03kqcn3cwz7bkyvreqyqua070fsrucm5yxs19iy7r2un348lcd6zlw27s9lbptgn84ewuiv5m6j00w3hlls8y200onxq8lu3mgfejy8z561m0cm8h71j000zlcbauix4hm',
                component: 'zd4sdnoqilr0sjuve9ws6gy6jl97us7rw03h8gi0gnrtehdb84bnt4gihcrslpjfj260ou5t5koqi4sysfnk0qvfmrw8feq4l55knid2yw2f8gq5r5pgd20vvcz9bhu08luskzadi4fwkvwo9ssv0lr1tcx1cwp4',
                name: 'bu5uod6a3n8qkdygl1mzj8m4dll4gk35lglz2dlrifmcplhztehygzcgtzpwq1w7iy2otvvv9xl14bucpioaqqjiomnipdaq23tv0u7mggm98jfalnmq1794dz9hmo7chihmaxobb5mcdhhrpgpqeo4vgz3u7xqt',
                flowParty: 'e0ix6891qhcdf296fng76c0zqa05z7pmvgejv7adejf5riett9i1u07ndebe3rigzb2rbqweb7trif8ozfmba5yd0uwgwn8qwremtujwnruci8wxqpocqjw0jvzp5720bdorujt5myj58dp0xjjf9uvug8ih6ln3',
                flowComponent: 'cffem2po6bxsj5b439l3p5yjqprtlobhy8h8sp3akhvff67c8pe22wb1dpr3iaaobmml30ozk1o1bagnaoq7c9fvxqw5wa9djij1i5fui01hwl3fu30m7ck2firrw9dr4b7vu3ake8fq9lmzorwi9p5j9lzsrp22',
                flowInterfaceName: 'j9p99372nxusw92mjvchl2caqisoslxsx0rgthdo53nvsw8s92addbswdxngfjzrmurglaa2hliycs3rpdwc3vy48tkcys7vft4wc4vc3n757czviha72q6u7yhux8xjjyh35jvc16g0jpd2svwpz91q9rq8mij1y',
                flowInterfaceNamespace: '8vpoxnzapus1i0k946lwun4a2gav6mff5u5huy1jyq0u3jwh8n4lu3xy12a946x0edw2rmml8t1jih30k2xad9ru1muet0hyvqpwmtd0yvep75ea2g1akt62s7xp6mq5q27w0q929kf49xjpesskvn6ii01sgorb',
                adapterType: 'sifrz1pjomld2vsa8vlmscezxsi7dexom6jm6uyfjayxs9l7d2ala7s8t0ii',
                direction: 'RECEIVER',
                transportProtocol: '3bvgdy4bbono20ldmdpjavelbsvol0a8q3ea75dos5cvm7ximb5eszv2siqi',
                messageProtocol: 'oq5y7wv3iq3voeibkjgpgvzqhnxs2ewa1haa07za7qppxgcr4kkie323yy3n',
                adapterEngineName: 'ysexqgkyiwq5yd1w8mwiki54lb6qcqvp879u52by4e45rh7dyf9egl72zefrw36xm89rt7uelstix88gnwl6z9g2h4pt6k2bu8fhwel49vaiw0abtuocdkoj5oohc5ooxbxi8aovu5w6rawyj1ac30lqj85n7e8k',
                url: 'joei8qjlk8zdx146r80lgx9sq8rjh1geguyn1lbc11t4brjm5hshrh799xrsthxukz8muvi9xx9w70wminl8fadmosd9l1cha0rpcet2pw3jl0m80ajdy27hb80udmbl0ejxg5jioz6ievibkm3ik9wwk36ic523hk7pzw2s2wrd52806pxswt4oz05372ik97bpmq410imbbjqnvvb5ptes3y6s5e0cqt15wqac4fon2nsslnilsgb97nxfbopf398jxpo5ale4k66vfvfefmw88qbzrs9oiuj1jx7n01hh4o5b4cbwenfrewo6golw',
                username: 'v29rgkbibohls7nx35fh08dgxylta99urwbw2vcnzx55t02glprf4u9t3jih',
                remoteHost: 'pa2ymuwy3fi60gf71kgpwcr3c0y60powe5scnw71e7b0ikypllje8x1fknfktow4tddmxlj1vayvzgjtgiwv92ziy5xbws2154ersnh16oih63omad0lwy4frbgf39scyzwueroejzwfci0tg0s2iryk5vncxzlz',
                remotePort: 4921016825,
                directory: 'lvo7np5qkpeti67mwujdj0ac5cfoddjrp5u3uq4qcwcuoefynuewcc0ringi21tv7fzublkq1sikmcv51w3rakaom6w3fg03gwwcb7n4cf36dtauo6f1t2aqgqfjl2ifjvb8tv0efwd53nz2zmfrydtxgg67atg6tpl5e8n0sejuwqnfoeh7iu1foegrweuncedk6u1am1w4ztizg35t3t69vycli0i9jycsnx2pisz1iozxzchtkbjis0ua558eiprr0uohe12is1sfg6s0xlzf4zaw98u7jd25j2ev3muret2jndbzrid4qsorplo8viqwes1a722rfb9u5lp6njdjj65hdv4ufd9nf3rcx53xbdluw14wgrigyjxei46lnjntyaflcr83wnk8z0rovoqfj63yti05s73by3kz2atam2xkoh2fv0g5puqmq639k0ccjbsl56qzauezz73843i9x2tpiwnuuwwlnztbi13u33193inzw8q8efiwxhjhbj71k0lia9zdcmt8k4smziok0h68ymq852fs4bmwkv3abvx3d0zoq9whamr9gtkcyzmo0v5m84bhzqwvnu1raqa706s5mctlolc1q7f6dr3kvytuuxcyc3tf6fbclpxp3rgkdpjxt8htviaiwu9let1prdy0swsf60d95z2d4hkm2sgxwz1326uupu3m5kl6qtyxmlh5k5gmya824zer94mpq2t6t9cltu61kecn5hjoxfmpr3pysbkap07ihmpcldijjn0izxvhcpoybksql3gsau061eyxjrduw855iyy05hg95vui8z8ykuntitoaeldwik9tub9x15nt31xomsntvwtjlq2gu7w6sg1fascn0so8yul6u1ss1vpmqp631l77w33tx32uwnbmax01ynj1q9ss48njhf4w7x1f79klriycl3keu8dz5uetulbthmykrcs8rwvjvz19c2lpvwxspjhl72xxbc4t56mjdw5pey5phaezhdkre6o5i202',
                fileSchema: 'kec8kd6ly7h2twu9emm6ojsehw74b9s4mq2ub7yx3v5tsyt615vrza1d2fnapfpfo8ar6xh8wsd6rgctzu2k478szb26za1m8qeliacfz9viggvmzxf4eraac5k944ily7j2mk9b0daw7iaiizcryw3ijcr7meofwb3mgrknkipetdp2pi0sy83la05rvkwdzndjmroxtyc6zfcnjfha9op1ejem4nf4di2plglega3tz8ruanga5ke91v9m692769himvil5q8277i3m8y5s71rke18t1xj2la534ucf8mfckzsresngayfxbkuj2bvao5w8yrtlcwztdd1yax2og6ni0696neitd109gr5xo0u7nbhj322dzxyvj2y1dvp5qvxbad2qem9qw8d5egof5kjf1t49uwkqv0yybm8pyqp6sbige741n521ahii3rdvblxd9vamh1it12feduamn8am0ki1n4ivow1fnr28770bn1ggwbibeyklp1uzmh5g7t8mk8wvbhsb1os6aa7bc3b1jnyqobavcagf384tntti3ap9lxnnxqkeojq5n0hdkei6sisxxpncqm1yop8brzu8kf6dhgrxtljdvh2inehzq5fnwaniaqivxwopklwlv1ruujklzbno9p9s1pvr57kdyg160qc59pazfqvx1x3z8zykiqjl7wknxu9ymsqkh83ftb70au0pal2ylbek3l6v3xq1wi5tx7339zstxkld55gdoupha5uurkk1z9i75xwxo6rw2cx6zkp8ja40x3798rj0nobtrugj0tm4j9wcd94cl40nhvth6ure4wfdxvyuehxx22rwh3ub25hhzqrfjnbtn9frik8fhm96ghwvzaxa8fr8nnh1q9gtzp1r63p8vu476qy0zb2sd5zyip3jlqy2u8i8iy7e7t0s2fcu9fed9rdsz7hj6wq6apfr2e4rq7ywohu845xoytzv0i34dq82jp4xjqhy2k0umu70x09270vwf2uyn9fbadb',
                proxyHost: 'rc10zrsc76n646s9n5wbx74anl9cmgumm63mu41j9a1b2y1dcacj2przhq3d',
                proxyPort: 3054369808,
                destination: '36crh1o2kh5k1ik7r2k0clujzei7mzozviekw9n0mhtvaz99b7bxhybqcw3ukbnfnk5v2upbfs6duj6vu0gk994eqe2kk5q170essiwbxdocqmva4w0mx1zv1ii6wiolev4a3ogh2k1pk94fqq9lyn8l6arse2cy',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '42vaf1uzk8glx76iizlh56abiv2mpnr76yn1btip2n19yth0hwzjozdaw17ojfnsdcccwp0n843rm0s3ahizc7j6zu8kz5yhg0f07xi5ew4owe4c8bcirojifuird9amozhbf7htydv92i03dy9ngiz2vv7zhph5',
                responsibleUserAccountName: 'cnnt9az5wa9jcuqmzrkb',
                lastChangeUserAccount: 'yz67qdzc9xh4fbqia785',
                lastChangedAt: '2020-07-21 12:50:45',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'yxcw0vuxgh8ohxeh3jjrr48wcq0mib9mwofxiw5sk4ai9dgk64p2l7gjvd1uwv2ktwvk9ffsp7v3zkgmi5g2qr27s6cpzseaj1j165br01z0y0pz11edab5yscbzkaf2mb2ulekhqy9l8hz33ced1asyp1fqssuv',
                component: '5dvqoz4ehm8rw7lngluafazx37dilliv30sru7lt1pqusmfwbna0xst1vmnlrmlp76cj5ahu82y6rg917s0gldur1uz8s4mbkdh9ixfalb47su737t7ycy66pvnc3h8mxu2u7lxe1olzfh0kz7savl1eqm2ktn0r',
                name: '3izcv94ziji6uw228exov1rr45lroyweudt1voow8i8hbmv8mlx9ffldhnz5msmfg1k5pwwd42ngkjoeodkxed9z7taoucekqp74xverw07q67dopzska88cvdnao5qfrt1u98awezugbwv2i0dnx62odxnta6rc',
                flowParty: 'pa10d9qjwrw26difbqdebw5fkygsw1riy92uhodcxfmg23v1urbcltf0l5o2nlmbt16eyy8vak3d9rjurd9bnbvmcqnbym6imdo0y89nupn9ob7eax61mp3bqzqnah59his4awgpo7haiygiqtp0h1b4qlcn9wca',
                flowComponent: '2k5izng2qkjy5r2vkxwpmm34vcnm1bsfks8ojacy5y62mi3lb61j5t63ma6rjbpj4nwxdeda4dmlbvinnwjoasb7htpq1c98q683yo7pbz4l3s8t9iu6q4xdg1g7t8o16w8xn1uyjkgap0myqqsqhbqhbww5utbh',
                flowInterfaceName: 'x1qgkpqxm2k0sz9coyx1uge464nrwcmibdg2mztkp0woxjos4nrbw0qaw3ud6x1943pwp4tfmg414tvzn12ee3o3yel9xrilzwyp4bw1dnyq4udqqsgyoo6ntgsjhqxesc25s9wfn8sefb0pfmj6x68cdiy7wail',
                flowInterfaceNamespace: '25ujtrgvp14n2cezfck43hubz0c7gm4rggljx0yp6tdttt5udq0dh9mh9agfjnpqxat756yba438ifilql2c0menjztnr422ndcmrwor6q79pmpc1pr896r86gvq9o2dlbqc5vb0cak82s331nnh77osho2akvpw8',
                adapterType: 'kn3k7l4erjmnxebb71mmszs4ec8ttdo9xmdp88eq5hn0qkzqrng2knqnnbhv',
                direction: 'SENDER',
                transportProtocol: 'q78991y48n9h3cirats8ph3oi741bdi6913pr1h1x3bmzzmoxg8eyyneckg3',
                messageProtocol: 'gbk4s04ng13kc36rulwdu076wtxa7xx7p2uacb24z0szw5w9a9imbajq9qfe',
                adapterEngineName: '6rxqnl8vh5ah2x0r91bbw3n8qfarnhetsnlnl0scpzevj0pi66q5voq98zzac18pdxe6uye13mjoeygehqj2y30s0eoy4n08aoklrgdn3szenqse0sbmqndr2a0ib5f4jx423p0r1ixnrzk2mw398mgd6ea12mpp',
                url: 'cesg8q52w912lnbrt0paydyccuuy1ntcopt4bomzo8zte265p3avhw3rdpq0fixlws7wpkgrik1e0kwjqzkugt6y5yiz1qq8otad7784e5qpkciqurlu068zd3hmhb04iopo9r70dt6rycfo5mqnd31l3hbssc80jrpn1th7mvwfq5x0nzwwyc7niyeon9tkfxdtvzv5280elcwr1ggqtnfuwgxjvb3lrdft8fqry0ojm74kttugserv7614pzdzpzdxfy0gbb3lijm6lprkquivk51r9tpbwte23n8a6dlrh95jqi8j0twovf1mfgj3',
                username: '62p1h11t90fiulcyrvz3hy4ega4f3vi9xbo2faom9ppihbbuwm6osy7zhkxt',
                remoteHost: 'mi5y35ykj5i7vfzs14467cs91sdspbi196ua1w6q3h52sg1qsd6816euc5wp9lizuglz0ndjj9xpfrht9zmogtqe6ar1wmn29lcj04j0kj91u1mrq4hwyzgkq5rzcdm03ec9ebt4yhd4kes8fe27xc6qnqoumpyj',
                remotePort: 3539768144,
                directory: 'eqxytud68p3apahg8bgp3kpkivsytkboln88b1zcvlt6337onssa69ryi77436xnev1zc26k1icphl858dawf3bakmzwv11lbaz8v14o2wix0u19ezehyniiorox9zil7pmv4xky3byb22lf82l9gwyk6lo6qtxw7f2ucmdoasxwgs2y6ks3w88pv3yugek2kr0m5zf86cnec4l61bnjccmswyqvltz0f0xcpvwps5b3dj9wofxx4r9zw73lmbe5i4b47edivoa3w6ar4j0s7egm6hskg3q8zszshacn8lkxsga0bhaxt3rcmvcyhy3q694e03ds4l61bm65txgrpx59nssef1xbzx62pzdvmm9nyuimvdjb63rdf2tcyil2o860zjwqw99cwb7pm95q8wph3vpy36vch5iyak1p04jf5y2kysl5ct8mg3r7hmilqb4ethiup7xitrrw9xw74zbq39ulrnsy3aamh1a0shitkwjlpcady98b9gn8smdoga1kbjj4lba2whne4ukvzcahotgcj2yor17ssxwqd3uapdsxk9zct8a1a39ei84c803pwjo30ocokksy0yutt4t7m5326o739pwu5d1pzkmuenfngba6cdiqn9opyyk375jwo1w96864j4g0gcbntl2p80mb8zasronsmzd81cga9cz97la3kmw98anq0tib96zsc2bqw2jir0wut823dj6rx28jzv5hfkpbtlgdlgzutsqbht5me2kix9e0hmk7db3t0j76cjapa509f7girbqybridmhlfo53hzglr9hsqtcbz95rtdhecyzw00cq3xjjvk7jumkqhi9dl7kwthpbp9rmcajb2t8tjlx0e7acpu1du6txmkz5vuw15e9icede9ngl2fwr6gdyi4vkvwed6ry3xofcnga1dfctckbf14bhe22ngzfj957sjl4sdqh135gklb92dk2ge9y4xlzmjia8xzsvdx2l6628nit2fbver0l54i7tqvnsqxpb7',
                fileSchema: 'tae920zm9jm74mwxtxd4oi8sr51qdwzcd2unf7ued4ruzxlxrffskmw4a9dsc1uiwafj173gyg3npfq4kojfiyct3j5oekvvtkrlf3fg4pgn05f17pq7m8ibnmn52wsk1m3zgfjoxxmval3hnfr98ffycubqw08zfgrggf5pr7vdij8k927yc6ky41yndj2r6xsu078h3dz2skgsa504iskk1o0r2t4bv0widlwi6wssxglxpaum6kk8n1nnalpdskeqmyc857s46tiksor0mljd3ntdppou7l7er4wb9mquj4s6hg28jx5ohw7xf35e7nbvaz7a9g85vyi47hja9cgu9j7lzqam3tv3d8j3wtssflpqs0dy31ld0z2sxgspk3uu86qsrj86otrj8icwg8hix9x0qmwgko1w94iqcaknypsvrigooxe387q36337p0o2jndmmwzjxzohvyyrygwwbn4bkwwxglg29tkiwwxnno1xil1m5yywkubsdb92ymhnt7x7ucm0p33rdhf9s6m8jhp8eqywky7qpn7d0cf48dacoyaxfjijzt4ta1hafxd1jum1npak054l052aawn9sf0bz8ivz6yq3nhqqv0aaubpsqu7wfxpio0jafhb9xsjdg3wnetlbl5av7y2sx193uz4y3u80wgwfq4wex9swhv0ynjol0n6ksdscv7w0t5ztim9j68rcbnp3ld0l2e9kth65x040gw0g71cslwcv2hqcq00zk8dcwbwwfc4f7pifnsn97sc8gld1rmziyqy8cvbmchp8kck9cw0w1lmymtxm0rjk59ua41bvx2qcya812hh1am8mol0duu4pi4bzeun9ogavqy09i02dd1zcwhtwmfjw9ckzsqa70sf56xj7wnxt6egg9mq0p0ixocznkmsevb0876uaxcd3jvr8ni099a88yhd3uzgy0hi66uioodfjzau48gvcx1suxoeb84i9q1aba0lyg7u8gjqdu8fplf0hrbkutwdpcqj',
                proxyHost: 'slt6mbs9sc8wz9ys3wf930gwrwwpafotwvzn2455w61m1asx7u4caqss2n23',
                proxyPort: 2131923354,
                destination: 'isjtyxc798j0oxl0fak8u9ku0h2ip4yoebit8p5iu1k9hl4z6pn80wergbbsmdl4hbu49yjs6cobvqkgvfhqiy038p2h8733x6xzz106c25u8181zxca486xdg7guivpao3w5ovat7iiraltv8eoh5dfwm53v5tu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6vm8fibqloyowrqankx5kod7fssg44bo6l7vacw6g1uvx1zlblnzq92j655yojoww73xyvp21k1vreqxfv4o9moqo0siubli3az7c5ii6ui4rmwew1sl7a6glk1taowrzpt2pzsaypqbv8o0ivm54zglb0cv7lxv',
                responsibleUserAccountName: 'recdk3jlt78bn20x81pw',
                lastChangeUserAccount: 'p5409jo2j151fnlnouom',
                lastChangedAt: '2020-07-21 07:22:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'exuhcgov7k8a122ok3ro2zmoorr4odqnobc56anjs2owip578ftlarww3jz8xley9d3h82r0ybzpi8fxmyj3wq4mlsanq2k17fxprix4xbswm48wv22whsdl2tpzzp3alf928dme7vk1n5w7h90pek1dq03md9ys',
                component: 'h15hphqknienkcirax2m7gzemaf7r5i4ajf4houov62btf75pg7cvkk8bpbk8ton3b8go3vwh44esdi9gjx4cxbc7n8zt1ja4tvz2vccw9w155p1ejxb3bsqpbkej5677jz393patblnr70kykzykvlyt3d0nn4s',
                name: 'm1hx015bvl0f256nvezrea03cr299o4rjtjhf6ozl71u417zclwgqou5j4rrn2g6jh24g841z1q8tl2d1q9dh6wa6haq3u075mve39m9c52a8nvsvnx4oflz39zshz66ky061dng18yll2t34seu4c8vxl868uyb',
                flowParty: 'w3n49xv788kqctmct9h8recff3ckvlfrr5eo5z5ij7huqn137f4y0asvhlrgh9gqiibe20ihpe6qe9dxws9rbz8wb2u9imqzpvo97px9ibesmsbaf8w9pgrkp6n9dfj1tydb5s62cc04kpp6yvsu44twg8ocwsfn',
                flowComponent: 'vxzcka5rym9nz81bgm0ungh4xrkc2ypj9pazxkzlf8g4v8msre2pjzj4vl46jy3r1fpf0324g6qfxn6959a43hq6g1znz5iffzbiydsuldm67kptwpbwqguwtgb8pyqfreqx20d6fzv5w7ahunsetzikcqpvu5z9',
                flowInterfaceName: '08tbh6mzkfw6imb4qybwij5yw9e0p6ad08b7em05vh25zq7qs4zsbe6j6eenpon3u56i2mytw0lk6ists53flwdutte7rn4x9tcpcl3b4p1vezvdgin01m33cedji5d3j1ch95yps74nihi4vv4m85py1nbux6ga',
                flowInterfaceNamespace: 'haxfbki48afdv1hufnwzj8h5dm3na67igbhqx336d5514cmt9ysxcykyr70fwyy1xdfo8oqxpqwasfi4dzhorp7mxp8q0bkndn528ss2vvno714pxi9hno1urhctrrkld2bkq06s0t8u4of89feouoj4vwqzoe2n',
                adapterType: 'izuhudf7j24iokbtmhvydyighzf9c65qtvd4uu4t72l5pwveta9wfc8kz3avh',
                direction: 'SENDER',
                transportProtocol: 'qldh4xl1fw5abs895i05hlvnczuec7omkmymsuto5wfe2pmd2nw9b9uhb2e5',
                messageProtocol: 'cxbr11z1ilxenzn5jpwazuc0xipyhen25if5p2neknr7qdkuq51ryolg4b8a',
                adapterEngineName: 'g43a0bds9q88b9z0i2fmli9sjbx0n4sdh8z4bju485kwlrmehgpfrfx9cp06grole74vibbgqw87y0z3emsb4vzr2pkinqwawghh65ckbgrz6idm9l5yqgmtq9ttv4zuua6f5g24cdj877dk3xi7846tm5k1taim',
                url: 'gaqp9xt6wl0vs0ohxo4sviwkrfcsvp22h8qhcw2kndpjzo23fsu7nlz2skkj2rcjivsuajq6euf8u522o02uzfmyeihklisumypoup64lzowkpn7ngr2n8bautbm067q4yx1iufcrnbb6igbgqcg1u1gc8ga15c8f8oyi2k8c669w6pt4mwbbogcng1h5ig515jfy0ei4g2jlc41djqrgqmkz877x2njgg82t235z726h4e21epmuu13om6bra71xp6dmjdcgr082d8ijepw3s033qfdcqc3x86e073z7368ffckclna6xqfu1irxaax',
                username: 'b3t80jrn1uusu7jaw02lqrgskud9yhwnuplb0i4w72vec96uy9brvf5ab4sv',
                remoteHost: 'ka3hen05rfojqtpf68id63dniu96i5q4xg42eszjhanuuwquv6p5ij9cf1g62mt7wo7ucjgnrnjbmt1m2uovhvfykk9cw9t79tthkku6cuharogfdrfdpszf8ul5xhvwo7qle46ahv8fw5ngisadzx8dex7pvsqn',
                remotePort: 6087574084,
                directory: '9kezgpecjyco3m81k4uk80pnsavodqdabga4lqngh9tzo58nprt9xtxjgjpgkvb7x6thamz1rznywn41weyzn7argxian534dj0ab8f9frnr2olhtt1777ppj0jac4xce3bc8hw34g5farbnwpp6mq2u6nop76meu6neq8enumnbm7fan8ak5gx9p40roi9rgmiutuibbqhzhb3k6cpnfa9rqf7ciw346d3kohlvm6twtrw01ex3q7zjrtosqtp97ke5c3w2m0h8gxanw8wumbhnst154f6mw1xko1qph677wlu4wnsnfmfi35cw3a7lgww7ongr13orq9q1rgs1ktqu5qv3yt3nao7bd3rj1ek4r1xx891g3qyi6n930silhh0aabdax551c0sin94pw4c094e774ebduy3yxxuek34zy1mt4ojzhfze18bttuydvavu30jhjh64d5j0jje6vwn5zkomlwq5fu4ewa22yf42dq1tlye56hqhjqshvkecqqxn09aappex53av90gts0x1grjkxckn9b3u5n4ijr8kfre8qopk15opjseqlprf9wsk3o18nv7f0c2fu1w4f1r2e3ycbe3dtx2bjw2ra85j015rvhxoa8zqew2htwlb1esq4scbb27bdscoq3hit5vmfg6n2fqq96nqf2o1sisx4ogwpb92vbyjvwntadyf0ouckrlyc1xqy6b4z1e4r35dm6mv1qeruuxth3vc73mqckykrbtr4vpozq0657sqlvwq1h4sotw475yhd2qt4uqwu774rgaq7v0xuzw9ft66irt63lyqm1t75dk71ow5d8q7b2ewfpjxvzklqxeoyyqqwixak799jpshmk5owc6rdbbc2dl06nbrvpauwu7qpl81k7iwm5ozrxy5qcjrgm0wl7rty7y3ybjphu1tcxec0m46qgra37a1ou4zkvsgdu9guuljudeng7mcuskvw3ua1nl55oq0j4k9dfuub0uwbqjy9lwpc6n6q3h7ye5',
                fileSchema: '9t4bdffwjt9kofn3g9dfr0yhm9bqe1jjvk5mvk2j0attjsxbjkl4po0vu08wy78x2yaf0346o10kxsd97yps18wjynpd8zpltg8qerazd50qiptx9m8mn1hcv495vdaxuxfmgxrsvy0pbd0m2icjw50rh0uzkq6ifkmq9z39soebkuvcbf7jzscww15w74qzwucgikqdk0gqeobpm32kk70ovtkp96bpybnpxfmdbn08bjeanix8f07sx6k3a6q5w81udm8i96ppryx4kbzsbyixfo71uqx7xjzvd16nvjm3ls41r10i5ckwoof7qsfkk8om0z5npc5fhiqdfs5jcnlagzrox5kzgzo4gfst8nvg6br3pbnmmo1pqkjuuv253x0yeovm8hsupnngtn0hksoi0wchfqzts4t2iici8txgl4do4v98sxinu4uwsga99ojtctoe8fwvnvie00ct5os68i5x0rd2le3cd6klske3re4uu6wb8tddxs8ym1siw9q00p0isiu7grz4zc6ptvis34n2fckji3xyvhsoqsqrb2eft7i84a5bns34h6qd8qi6gwav26172h0gyfsnx4efvkpizqhifhpanqz17t10ne0k4xy78szatuznh1wyuuub06u56gjt6tl6fw3xq4w7uzvdkbokh4dtzcnd279qswgeqk53wwbt02cnliejb4fe5iiqjde4btfg5dw1qm1ubht6rfh4f28qm6x9js7oifg3q9m95w9b2vjyrcmw17hp8fc3nkmucm4v4kovxbrl85ucff7x4pwyecmxyhf8i8jdhwck2s5tkroqqlo3g4kvmtmba7cf4c1ctwv503e6tqa58t6lbnhbl2lb6w9dpdhmzqt7rzbmtofya7hwztyjhhwt5h8e57lxgle3u1c9hblm1fbma1t5urknmdehrv1odww1cx3xmgvvf63ggwk7jxx52qmyd5yhiermt6u5zwhdywfflide24jmc2y889h88jdyi3uyip6tluys',
                proxyHost: 'ryutwo7bxbzfwykq69h4aajkxloox8hve1llrbsv9bfw3jol8nk72vwklfpc',
                proxyPort: 9261883285,
                destination: 'khnd9zguaxjmfvwjto8dfqvl8lex20lrzvpyui06fibhkczmeq31tyavxb18b3v64huiosnj14aozwpfho6m00knwfu879dyjsjmtslcp0d0i65xweo4m54l3jfpj8faqp0ru5fkaxjg0q2hy2vcq4zu1jlq977y',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'a6dgfswbgucpdr0w3x1z0o9nkpe8i3ugpfx7umup5lpf3ay25bnpo6t81s5ve12d9bjzc9clftq6ruyi0symrlgu8mlc1vqp2w57vof79vu1xpd4mbiohx47rc7jf61dcbu109pw3dsm1jr91ip5lz2ozv6ru4hy',
                responsibleUserAccountName: 'xfzol7y88ecmglcj4t0r',
                lastChangeUserAccount: '0m2sps512blv7y3eoobr',
                lastChangedAt: '2020-07-21 07:40:40',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'w1kwkvmo03j1x4mq1q07u4nsvc1ctaiz2kswiz1rb43laqhmgeizevtf2g1kmjbtjzyo4zgk4w95u1ii8b1fd1iq1oo1iflbflxaidvpa3ibda0du5bm6ymuv622ade50cwk44fzwr1g4z50ux7ltec6gyty535z',
                component: '5ey1455xktayg20sg6bf75c9axx2ouguba9a5izxx2ods4nio4wiaaw9p8y9qj7td5v6d8y2iusmudbutybo5g2lz2qyjf5y4ht9vllegun7ayab3o58g35qp6ny026g3fexwthbmwpjjw8bhncxg6c1e6jgvs5u',
                name: '4m33al2w1cgh3b1ccdxrrpuyn6paawfswcu26ffvhuls28sg2vkcqc801252mlqb3j30tgwgvoy2haeqgwtu2hg8299szwn0z2aszpcbiyj72tfmtd3j8f9bma76hiqyxhwkh5b70oknpcgje4wl0tr56vz4rocn',
                flowParty: 'ejpto1h1p3tsb8p22w00l3j841kcjwbscihuc4l2djofowzecucja2svp05h3eohkg2ejmgxtsvl4adhv4hhvdzbooc0o88rxb2gvwvyz074x7roeq45gx5y53o437l7fbeljn0l6p8ko14cv9j1l2l9rngi6lc7',
                flowComponent: 'd8jywvzb8uul23vgaxbyxfcxgm5lzi94frbra61o6h7rwrbni9v4i8e7e0kdo723gl3muqbkbwjnp016fxf7emb2afjebg5ffxfai02ry3h5qrlbn2972b6fctrl78bvs38mnnkf2uqbh988plp3cwjzv7b0cyul',
                flowInterfaceName: '2yqzus54nm1c765ljp5kui2hdp7aqubui9t4n70i01p10qwne8hezgvgwr8324ugj8e8yp95u0fbtlnjhpa6js3sk39kkkjkvjt1vnp3op89smoukydz2el78f28wpqpfpklgqgm85dmdx06x2x5eksr6nuv7n74',
                flowInterfaceNamespace: '2s2dqv8vl0etsbhf443ueh6wd7ffsr0q67romjajbi81twdkw4sired26sf83gdvfulp1nnu5vqanj8ek1x2hc7vj4eotue6dm8r3eor6fnjsg5uv7gb4oxkoqiwanx1424ek7ri6xfqj89irzktilyrz8yg6frw',
                adapterType: 'l8m9ofk2lqlko4ix7b1nqv97pw5m7or4tp6tye38mtes2pauzyiplst531r6',
                direction: 'SENDER',
                transportProtocol: 'i6fqbroywyx862qilmo7de6ocjlp3nzxidt7dbzd19yyhhqtoco90z0iujala',
                messageProtocol: '29dnfyllsma1telfuum1zv9vztcds58riav9gx0m5krt0twxnia9r1dur61u',
                adapterEngineName: 'lgydbryiwkvhfxf5hatcn4l8qoy5roxs6yd50j2ue0fxye87ro863fovem0giq7b117xovvp1xp62q8j02212sb2nxprjmtqxix4h6pkjos8b8p750eetcdo2lhksg4e4ousqr7rluwaewgo2j0490if0fad3p5m',
                url: '38nynere2536hrnsklf8j00br5rox9v82n5sv5seal336o8uexpayht1bawatp12tzfz0x1xppst1x2s60qw9s1a64mafzlc2ygmuir6mwuh3j3wbs75cakua19mxtyeshwh62dgf46acpwws8yuf5mcefdh2cdaye9z1dlbdxdi1hnhll7bo65bfnnleyvzkeuzxquspchowi4gg2r9kmkd4zz4gl1wkqddm7q78mkzhsn9tew9n9fv9tdz6f2lk0fxp7bu8mgcvjd44yv3qmd7atg259z6c17uyelrqkux2icb00rsq67wmvnwzxzu',
                username: '6zy4y8uxgbirjqlz5sbghvv5t3mhj82gkgswci63fwxl1vg9dxl3qja2dc8d',
                remoteHost: 'hhgwuwce0242e28lks1g266uh4cjtv0d97tik5ialc39dpmkfparv91eyb89rhu86zf2p1482taj2879w1gcdfdg4mhuja2ma5py9rto50bvx28l3cug97m624rg9ocja1pebgubmd0dfqgt1nlgxwpsn0iqs8q8',
                remotePort: 1774240521,
                directory: 'v8d65rrj6983zmk426poen7hkwvz5b7s0nyrmxkwuilf6c87uudvie2jpt5tpam0anqikznrrf8az3o8r5pyqsqg9dd34aeepvv03nugq0oov3kjde7y8jbtkt3x6rf8v0k0u9h74jg8n55jb4g8h3q5cuj54mf8c2fxhhfsc1yl0k3xu0ude0083rqoi2akuqakfw2xpwv3jcvj7snwmkm40ucyzini12iwf2c1bw89fnjpyttydtw76avzglo5n409y334tnre6rk5hjcomk0xq8ef1bsz4dzungoqhoby4449rmr5bf5wqq8qdzgaazyw9wofgl5rguv6cbrgqq7wv5fnyh2nyl149skq5xzyyrzma77q7uuz4pjeueuq7bnp4svclphiu68jf4e4rg7m7gcd4gqv641r25n0qq05enjhzaf6if1gx6jt71uvahuxt35cb4d0urpofnf95vyh9eqbdn9voji8ul8ipqe0pv6pgx2hebmc2x6hnzrh331zy83g6bh0970t58181oyoawyqh11rd0j8dq718bnx8jo3zoveiokqox9wz7gf2nqc4xu3qdcwm7du4s19c5do9yt7f7ad2zch8k3hasevkz98kyo6cef7ibhwvez50gx6s7xdk21mm1pror44v7l1o5vruusgxjk22ytq8mah663tm9wii39nc2vf78lea0ahco4k566zbi30v0uas69r9dmpwiiozhzuv9bxjozik9zcyy111bk46d6ewnqvnfgk065lj7y07h12i4seibsicjik7s2e0br0jlafqa1u3k4eaua9wsnvnfg8ydma3xz0ci38qpgoiehkl9y5zeh0tpqw7os9ef71mae9lb9kle8pa94jtpe6cx0j8kutllm6h92wf6txsomkjtzfuetjxvhtr0ygioo5ph5ivdmybltv1bmun0atymnvlmjht7qqe8qd30ewokgcc512xr9bz51uysntk1vhev4u2au6e2jhyf4t4ciscomu6qxk',
                fileSchema: '8jx7zhsj8grvbga6fss71rsehucjszdqv4c99kldag8qx6mpfywggl5j51inxxqpdjxk0errzwcou9v9ylm8dkwfab4ijlzwidjxt4j8vib04338fjpmsg11h73x20rr0mdacknbn33crlqi13r80dj2xjaxt3aw12e10lfh1htkoln0iels01df2kchwqjv42oi4r6ninvdplt8xu00xk6l3hm0t802rh7dq93c748d93iw3x5b962jbnngn3wj66mo0selyv2vjfb0fz7tj01bymgxm2rj8s1ejbzeqfhzzx3stfyvdpzslg2en83wvkf6ae1xuuu9fwy2gvasfi6ihnj809e82fsvhp43ff41p0yl8josdetxlju2qo1mg552nkg8wvoklc1yz6h03h46oqjmi9y53nm10xgyu0m13f3f5bs2wgz3t4x707ebqvirxh4csgj1yyf6ncqucom1wnr9fz1ibmepo8zrrl46w5z0a3wsya3yeiqld2s4y8xxd7akles34qzd0a2p7wo9wyky95ppgohesdyzw901vcz2d6zsodfpqs8gbdl48yz076ezjacq3swzjtoy4agrz2yz2vvfswu5gozcftj57dl1pv298pdtywl3799dyphi1zzxx1mnzmk3whx5si73kydc2rwre5f3mx37ufwhnhxi2cwbjv02mzkoc42deupwoq1lx0gfmt76l2d9h0k73zn54l5ol676r9c2p390kwirajimbpx7tzpjkwwbcyref5xiv52f1krrsob0zlmybkpo2xf3z4t8hmv6mjntzv3rrdnd60c7tlgtrvsjet6lh5pm5pom4xhc7nvknvmg71d9advgi2ji430htgk7wjnn4paq3bl022bkvb0b02hf46nd9fv71q0d566d3kgkevn1b4jyavwvpbysm15b5t9g7x3kk8wvt75u3i4yiez7lk9b8ah9f562o46tby9ajiw9fp49xe7wl9j77ii0p7fciyfqpsp8i2pv74yd',
                proxyHost: 'arfvwklm99dlcw2cokepccl6d2oxydcl9no34p8j56ih4k9nf1lsnsm3y6y0',
                proxyPort: 7843991920,
                destination: '6ys08peqsvd9iumkbf0ctp75bqxdzhcqajmyhj7z6lb1k0zykldpcph188vzqd703yuriz86ub0vxx2wl94kzfv6fhsvdzydpftm08lcxpddb9s1ainrwy15p0wrqz4ayfygilb6ayvoqx9hr2zr24q7jxd3yxv5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7qjoqec3c1oag8b17sotfma5pkw9rjzzu5savxhuu2hmp21v3l53znqx0joe0twr3lcfs131oy9ek0omqwo0qehdxi26kl9layezkgy4d757xmw57n9osrfoq9pqocnrfaphxrstx31gmpy6olwr8974d36pskkn',
                responsibleUserAccountName: 'oy0wx3rgs3xtr32wd4a1',
                lastChangeUserAccount: '4sah9zybxna4vydpn79w',
                lastChangedAt: '2020-07-21 03:56:51',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'j8vniotrteza579erfdahic8fk3279w8uqew0r1zmy5ntknii6a6z21dqozxeyqfd5vlwwugxfk4k52co6i5k2buu9sgaixfk0p1h0voh3x51ofgywpmo8lgcwwe4cwg8ywouwjmq0255r2ktshhawmmtedovn89',
                component: '4555a310gkp6cm5wmxa3qilbfllaeph4lmox1p2ra6nbxva2500do3dee8xy47kor4cvunjy99mzdx5hzu85yc2v0lb3uep4pldub0n2vo8b4tcbsr2ym2kil8hdfemma0vnrqx8oyauhcwdxbwyx3biubkztmpx',
                name: 'fvtz1c3vwju3jfa2550p4fvmwo9votmzy2t7zg580gf6r7ac4is8vzjatyu867ouki3496v06325tdfghhusy9qlzgoypcglcxx6zm9898usdn7hzajh8pj8y2frfw4kovs8pu8pxi0fjphtmh9z9q6qqk20ontw',
                flowParty: '8xe3hn1ps26xqqpjysl05oe6uaxg2ybx58boqqo1mczxqxzhh2rgpb046rxu2k2nq8altgwojwpberihf0oa1kddkttnfmn35wvu4l75sv060ffyjucavvtr1dzy14smw3re247o85ydixy92zm050t15m1q83m7',
                flowComponent: 'tw8ju6j29tfhc448bs6dx6e8rl6qxs7zowgfyzxmoofuz8u0zljeea6q9cuwckb030rw0trxbt5z94fqh9mbez6npibxw2oe0kj94ypo1r3ea1ckyv692134hr6srrp7n3x6rg6bkl00k16p1uhkv7p0o9ud7l8f',
                flowInterfaceName: '9gvk1dpfspss5l00uov8zvd1827j4a8gsvfgde9daksphzuakane5bigq4ytmzeof5blx8gqhf1ll30i3ugz9wyh5ky57ytzzc4zc8lzcljzbw7ztfma83uj9616mmmlzvky25bbb4gqiutovk7awk5f1i0qyu34',
                flowInterfaceNamespace: 'dzh7re0kgjv0qrid3l95vyvf8j5t1ey0ccm3gvk2j4zkyvvt5u0z0fks74ka5kzkfu2y2qu3ia701bw1x4tjdqa9hg5cmit1rp6s92foyucuwfcpn3o0koywkwev803a6fqx3m52e30avykodfnqa3ph68t7t181',
                adapterType: 'whglh4u6k8frkohgrw4d9aumybbdnez8i1xnk4jrc05x0ljkhxp7e0ncer0q',
                direction: 'SENDER',
                transportProtocol: 'f7tu6yzem7gxh29sils59cq4a8qhmle1slwppgk8u3adttffaffevqhc676p',
                messageProtocol: 'gxbe67g2d9zpiwmd9tnrrsqpkwn5jiuhvo1v50x34bz678oe1yq219s2lh1ft',
                adapterEngineName: 'dj2g5139mfqhbl6q1e2uap9brxnt2nrzj3vxkv4o30qyzl8rha97hcnh654o3klfhayoj5cxngtaelep7kw3potsynzclnme1zaagalrb9r0u5l6b6ucisz6fo9k5i84lpvhpiu4lu0w9z2vyroez055ltr1dgyo',
                url: 'mdfpy6u8h8gsxedqb6w7qr3yg59y436oi8q4l47qpeeu15ce9hgkdvjezgkh0dkc7dc40cbp4as90bgkg9sv26ha3ll1kqbxgfm8h0no2amqnwh6tza414e54lfh2g5ky4ovxbuwo46wmawwgo9zh860goeqhxbzwcof531w275c51xe5zkernsqew5cjsxcq1og4w22h1jk01ldihr7un0lv4l2g8t5qcw2aoqwubnh0lmb0xhx8j0xfugf6lxhp3ao7mc0dyhx81lpioti1980433otllfi8kth8bevt7cr5v73ofbbq3vincd8wlt',
                username: 'ggdvd11gtl7frfmvifkdoc7pu4w1bgxwmeanw6qq7gqvbns0i5gmx216gaoy',
                remoteHost: 'qj2dvdqh6ti77pecxezsyx77qw2dp5zyce5smrgq1v9iauj6fk2mips3ktavr95q5cdz29k39t5nosbzl4w5ceuzh1amwj1k0iq7db1m4hbl0bifyz4df1pkn22n3lue9sr8q05yfhfab1go7jbivv3rf3c4eef8',
                remotePort: 4553349220,
                directory: '4f17ua3isrgqfzmb5c2rvc40msnh4l3hmxk4p8huwslgucbvjdis4u1z14z2qk79zmclhac9ifjgjidiapc0psm05s4bl8f40r3c73v682rtsf477t3w3vtjj0kr1z0ox32gb8n1wuaqh9bsraht4ul686t7pyto7mzl445ct25eg0q2ssjbw6izpmzacsatfzkrgg4j3fdvzcswf9e4i5en5oa2n7aiuzv8l9ccvamyqm3ew9m92ps1o6ch10be75f4dnf1jswseuy9xx6j1zeyofgcwo4hfp3oq4wnpluxr6miti4tbhxc0uyo0ab581rbtusgdnm8cp1cfgrpahene5x4mntk5nrqveczuwa058gegx9255vey2km8jultqqjg3syahbbk9x20xk9r21ewi7tynzgr3ey13pb240a3zupils0v62omvedhiad7lep21bo9dtxbk81ktksf43z9hgs39npzm0jo0b201vixuvp2eu1amn8yjnjj4ctimcu94wqk4ue1ifheffu4fx03x3m1i55ul3vozyur9dyeopnkw1z7jb2lcifhn5y4n8leb10ecy1ubm7rhx09yjlo9612vanmu6zizlzm83ki0imm029dli1jyq3vczsiqqqe4htjh8rwlizh74uvzbv7mjvpberpgodfw3etn8e8b8mctxdobv5qtwjo6go9qfc6q9qzmtgdgogj5761wpwx22arjqihfu4hpa6l7czr5azy8ltxt94riu71zdgchjeg10o0ebe8he6o9etvrjgaoxhrsc17vgj7lyvsaf4ujyobh1vdeojfafppolctd9lojkiibqtwjg1ka4sa79xc3sgrnswzn00cn3ab6wjgnvmcle7fj94l74zu5r1q0hdjao0f1kmjiqpcd1nemq9jqpqwfw208nnbkgbr3010snkdkiaomej1ij315x0uogrnjumszmbg1blc8on194wknmmv0g3ufnj2fjmald3gsx4ekq6exi81o3zx3ul',
                fileSchema: 'u8hp4thnyxefuzzv7fn4sv8q778kjkru7pldg1p9qtkdmf2ycm907pupfc9o8w6qcuipgzu6pudro4742oskn6hcyu7m8rvs8zo6rkd27mnozv95nvtyrpbgf1rgj8zqlp9o0d2iaxesq0eier62k8i2qyxg0yq55f6utsg3ak3aljfcsv2laf7mbged9agaauvfgskguwziwjwh647zopkykfvkf1g6r2c15j1jbyvkkzs3rgq99jvcdx4wf71nkz97snsc04asuczxefuf3mptj31ww4mi8falrd07qtpo2ps32tccrje5igeodyb12td3jj6uy1yac1txhpo5t0bm0m8kav0f9z5f64m00e7m0kx2mx53zcush5blyuu3ibtlfvn9mr1xdj7upkl0p3hrp1l1wibunnyw8b412pzlkz6i1kcpy3db9va7arfved808are33tqbfh3x3y0gs2usr8p2a0qv17trkreuvq6upvp7wjc278aa1bewe9pczhom5p7djudg1ur6iadem8ki1i443pa7mqov1elbghh5nz4fqqkx8lbosv55u9yr6593tor1v0r7j56yrpkow0etmxjvz0l0y0lcicq0qpuepgo3u7k811vckssvqho6t0xzngagf076mwszrjbg1pvp1n3i5a6esk9mxpq400g3zrkipsnyvozzw1lf3kazxklhnt7oclnbuvv5tizpsuj6g7tfn78cpmmlvbt5lthefcsffinghc462jzvq79fwe0ihixzikzq6rr6noqkittrdkpxohm71dfoor0h7d7ysaywu1l55p98fww2g1z1mhd7bmi6h16fzhrvrwe8fekzywek6au9pqt9kyha209sci2j5vbdz9ytgn4u9eucs29kz33479v5ymdxx560pto4x3n4an3xnachtkajdxskgumidmnusc1wphn0b3ox3uxjv30ubkfylmwbyyhvegeaf3craruxxh5zd7i31biegfxpqvs4h21dkk9dika',
                proxyHost: 'hrcsd2bcrjnablfzf6s3x9fj3hatv8d7jc3eohdl4dwjvlxpudeidxorp7he',
                proxyPort: 3559343203,
                destination: 'pn787uycy0olt67txxgn1usyiupb9o9n04raa446puxbvkpb86nd74p755eg6zpq6ku91zl6rrozbq2y9mxbey9waiu2ym8lqdvpcym6fo2x0yvk85py6u1j8tt31rfk0brjxszfm2jr2ud05s2fpjesjxojmy6n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ma1e6vzkz1wvhpkklcv0thjqquppvam4vnplnriuj25feyxbs2zduy26ejh01m3mg907lsdwqo61ydm6fbpsv40cy8mcd5mo0pwy61ig4hn04ovsqmitflfe4v8lop5dm6n77mzceazyxh35p64585yhzlsscc5p',
                responsibleUserAccountName: 'q6mjs0b613lxrb23vjg7',
                lastChangeUserAccount: '5ri97p6t8e7vggkvg2fo',
                lastChangedAt: '2020-07-21 13:55:48',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'kiurhyfsza1pzjzpqh1p18620fgss1lh56p63e3k7kt910oxb4p6gmkqlufa56ai0mtmdn755fwx5ha6h0713de76kcrxlgyipxkk7sq9dv08s0nfl73iapd8222408oy8fgj6sze0ntqzz5xqqocm7xu69i7e7a',
                component: 'l26jsdwck290m007zn4uz5jhw45nvs77bzdbab8vufqmd9la0qet3xcmrhwrurxlde7z9c2wmcbjnn6bx38y62jdx47bny5dol385pbkhjnfuunwrgy77f9aeg5pxksgww5sydxbfl2zdw7hjuvz6rvwrgvxwx98',
                name: 'mw2x7nhqhpdenzhj3nkrb96qj2p3yef4580goiotar26d72b3njctav229t0v69jxg29vc2ikz1go9c5g6dbxxf9hm97atuu03t435gome8euz3diwg6efuvnbgs4orjv0qzfxwjnga92ygkuu5ab1227jjfgugp',
                flowParty: '8kl9i7r854bzyrnhldlr6twytsgc97agsb5iqrueg28xwn6lt3gyi60h7dmiylxi7ce47zjjr40831pksax2q3stvhvf3d1iphywlim3poovn8vzynhxvzgw4c411c5rr34geejnbsxfepyyem86q6vj8k4c98n2',
                flowComponent: 'd7trvyf71k2alsn6o3r5b2cuua7wnb4ccrmzzxdj2gdpbyc60z08rvq06rc1buuqpxz2tc9qv8fij9wscbm9hyew9x7q6f3kbzgj0ijk55jq582w1q1v4wmw5wcj0ecej941mvx7xsw8qilto3edmzborsp6nfa5',
                flowInterfaceName: '8kkxh7gx1590nuem54l8cqdsp1jsjjizahlhvtlsbjt4q1y4xnyqxl05e7nupj0cnw0t4buds1vb6o5zy8wd27ktdcbq2n20brw17xseq4tq1yp3xt3d8bzh36kadzm69c89y94ah7hv8aqacdoibgn9v7gsa54g',
                flowInterfaceNamespace: '81l8k0t9nddvfcu41qcfqhkq68zphn010yz19f5fx5rh3imsgxxinun4fwbt7qji6oarj5q17ru7nrarq79sysxwkyfinfx8mhmx3u87lzew1ffb53giw54zgzyk20a6atgdniicecfakrsing246lnayon1ha7t',
                adapterType: 'ms7xhy62v9c31x5a8qc95yx1b9fimo6zm7uizj6h6vx56szg84rmpjgq29c3',
                direction: 'RECEIVER',
                transportProtocol: '09zo0cpb2x1cyicadn3glpd4hb2aq3a1yp1zidbe5b5gvo9o0303p2xuxa3r',
                messageProtocol: 'zvkxqrpkcrb9cepkbit7o5bt0358zpiu3vwal1ec6jokc6tn1hykv3822eq4',
                adapterEngineName: 'u9dljmcuiyoz3oj4uvcjuu9072kpkc1dnuzsysp31q8bs16m54daluqamwaa3g84hxnfp5py7o51nuxbx3o4zuyz8155m6ftmx3b95e4aiukinijugsp7j3b4qppwn02z0yzwnu4k33qo87ns2n911ttuwu0bf7qc',
                url: 'qam3r8ue04sk1ueh439fk5f5ezjl9b3muf7oj50nxlqv14gceeelj3h6aewmaec9zgawof2haol20n6uvdckl6gfn3orp0dke4n3fzkd0bmdn5101kpvwmnt49wl5jylv8eodt03o93ld7d47w4ulvlet69s115bv6jeienbazhjilmryoppmry0gj9i05yx8inj33rl0n43h04ttsbfzxwj5n0ar41nhwc2qi2o1o39tr7v9ncm16uzw7lr69dtn1jm40nuervts6i6yjbsmvdp8i8dakfythcfdyfg1ftvzl9xhk02xiqir8ks3srf',
                username: 'd833erbh39hg60h921p01c2zblpgjwe4o68dg5bdcc5tp4y9ch6qgo2vwv7a',
                remoteHost: 'u2qzzh311jl3379i848wpcbhtrfr9kbnyv38yhvnce0ccg38srd7ndz4ze9ab5r9d43bubp0zvjgptpiewf0ylkvla4syh3ad5x5mnf7yws7aofur4i9af70y3sxe3ktk67xx6kpekshodzih5v8lipb470n1pze',
                remotePort: 9160717605,
                directory: 'qpjnu73lq2tb4w8eprjt5o89h4cfq6nlg40qwndm5r50ms3kzd37pb54wa9y5xhvh7e0u8o0q8o1bsgqs2x843pax8obr0su4kflwtf5tbcgwm87kt03ndyr7i03b3tkw2r40dpdz0wbfawbnc0h9ng8w97bz2q270v3czrfhiz2cc99o169dynjwjmspuxnlyl90wmzzy1eenfh44bcbwkpw4amau832xx6i7om2wj812iwr0fj7v62of47y83spzsak9evb72wi6bs3f8clvujapwxs9dblbdp87pkd12v2q2bnq3eoo86so5oyp7k2yyvx7k4wvk47opa3dhbgicqp5wbs9kvi09fxuz5wky36xogk644osr5qjgm2ofor2tlb3skpgikt8rvkrq4frpf3zj8bitkan6ht18ktek0myz01losn6c4a769rtuchlew3zkrhmdi9j9i0tuk6sploowvp1necm2knv5kg7d2709v5xhc9onadnuqayzbtv9796gvn8s05n45p3jd3cwlzhyr9e42a8xk9ebot15qzihaca46j49dzkrk3zzg4zhytp21cphl0wzooqpwo787p3vpiuuyibfii6hrpcq2qmmnk80b21cd3qm2k5g6d3wcu4jcz01e4vrcwxxbejzrg9u5o7bvtu07y7miypegvfy90i73eknn27leqj9ox88o7sr3ojsyv4h82hjbdzxzuviwrsr6v5k9p3wasvdgf93ydres3a4rtwrwifnar2k8dgj0b99wdwvbybnjf1u1a8ot25jqbewyhthza5a3eflqdoy9ozyg5psyvfmojtzo29o1kf5oqicdow936a870zec7fa4omytkokewkk1aoay1xfdv1iiwz5x1pwf5tmy4s159cenzzmyi7kht35jgsgdlvwhzqgi2yr7pqmg0afwbae1s8owix5qzy6bxyms1goh4qvscfu0k5zjdamg4m6kif0isz7s03u23jselfw2mmfw5sezmtpzj6ys',
                fileSchema: '9gzr573tnckmcj4sex0fc2tb7oc6pee3ftnr4zrj34gf32fsncyjzw4e00277ux19ua6ih3mxg1i9vvry6b1jbs0e0my74lgtkzhixrktiag61p4o9xwk10dayc93bzlg06fet6tnwy1989zd2zbzbdm6zcyobyefv055ls1w7wer6xfbh254mn61lfr7az9lj0jt61z5lttih5ysl617kks58rgv5hdw1nxcs9jwm7emc4c87d3do18bbrounrv1l3dped7pchzmbupqzhcnw9f7jaovym2ewwk77uglab5xlw3ifm8f6woelyzkzvmve8xtw1ema4ewe4a94hygifr03dl0rxlrhomd6z3z274bxpjgmi8eeplsvpt7ujc4xc4oagrrnmc4ldjrlmcvuc62mk8ei42xmqmkni3jd4xtmpnbpegb0p7fne61t2e1li9jw6s1ezoacy2zwfzhbrpltezj6523gfaizdmi7scuwf1j4ci71hahiqoc7b2rma2r3zmn1crrueg4sx9kozvda79f1hv4m3jdvhgy77xkwzbwxeuqw485cjbocrt7iqiqnmnw256299c5x1k3gbsibrnd8htrkix7rff5w7rmma7r1qtsfiqq037afk5yrnfr8e6dj3jyu5qhy7i9xk3l18oky4x773zw45rq4e83gm2ly8ny0v9bzi198tst0fj6dt3jz1pnp6tpjxsdg39tcl3brkcqd6ig52dbcstxpw9gw5vimm680mlb05cbajgdptzaodqrplhad45dlb0hntoqvdcgkzysdad5xjqk4zg87epd5160c1yvww9zv8htw80811wsfyb41bv1mystn7wpk0gcyqbd3gg8hmkn976rheybuiy590mxik8s1nanc40nrkuxi8fen994n3l31vs4poc3i40nw91cqvcqfumvnwgav9rtx2t7aqt7fkvc63dk42irhgp5rrznxwetxqd6ikocwk0c60xb5dy243dh7ot9u5s5x9lwdkl',
                proxyHost: 'v2i8yzxvh4pj46qr296gs729rpv7h7unudfolwxqovmwilvjd5foi6y510ig',
                proxyPort: 6170019265,
                destination: 'tioyjyx9gzdcusaatt8ypja4ju69hvpoakk9bzywfnak64opgzpf8jtvd9p40p7iem5yd8dmc23shja6ffjfi4jai2mhpq27nrb48qw76gme7p578jkgn6n9z0716bx7dkrotdlzb25tkhlghxpud7uzq58eom1x',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cy1tfqjfe08d41del4g4q2wkkmq579i2xz1jaeo9hp34sxujoi2sbdrcoa5pcrypsw4puttk8zce6ti12rl2d7mhabwv7ydu5gzw5kzac383p261257a9dptmf5osxp4c7wyopwwqow1ma4zef37mcpzin4flptt',
                responsibleUserAccountName: 'keapi7pfjslf6kdt05p5',
                lastChangeUserAccount: '8tbwi0jlyllsiln10h7a',
                lastChangedAt: '2020-07-21 21:27:12',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '25ns6luawvcmdq98qbnjch917j1b9f3ymnd9adlz8d22wbr2okkdwt76o157pwcn8kmkxqsd7yv3gnmhty8u5jh9gkm3rnoih4ekiwfj80vdzld6pkyohbrdoaou1vkyttdsyylmmb5ifwnbscbf2096aqdzsezt',
                component: '8rvsy9j91q6m2xqu1rzul1ljw0hz49ijeya4tupezre11u89hf2otp7rbtp9zpjhsymyll5jkq8q6s6ymwfxavyujt5dvbzqbx427oidi1wlx05kmzkz5c35t9kunf3s25zrg4gpkjg00jyx7zg9xn64r561u32l',
                name: 't0fhidcseofssb9e56cytpq0nf4j4h56dqnqj9zqnfl3lhjm8mycic7l3kl7ffyq53kkud7mqgi1kx1bkin4o6kxxqaevetrb2vuhf0ncd47tqwnxqnm7xkctt3c3rusw9zui9yts2dnj1c8w6pl04p9xv963guz',
                flowParty: 'klea8pvarfhwdynmuj2jtgmg2rcijkc7lev1xp82a0n2wu5z2n5b1lw93bpb5hu1o6dxakkfnqw8td3whs20dm9qsxv82u9gnsz4okcsmgunckbhagmqbff8bsaowg9fcm33flctxi0g1cnwi69wsq6du2inbdki',
                flowComponent: '069epnme60ora60gkcxtwhntx8sx7herjmxs9sqy15fs5wz283wt8zkdo0hg0pnhw7waokewyecg15rahussu95sb1joxkjkekror4smy0ytbsrs5mq8da054noeglkypq6ez8kggqioimbmvoobea8n65okwuc7',
                flowInterfaceName: 'xzbisvua03oeagcez815olsxjmtingvyx7adxaezn68htwqyds6g7xk14n2mygw1xvs4xjet1fwp74u6nte8cdbjz260o3i2tzjpty5t1h2wunnhqbiot2nuyo600dtgg6adfn2f0x94g7cf1go8x2irpdnc1o7j',
                flowInterfaceNamespace: '1v4seexu5hbaa0ylvu4oju2lubdasejpzvm41fxiw0hqtzhp74bk18x58jtrsd3m1m7p0il0wi85bqc5ok3sk30x5upqkihg5fp0y313bivtl9zocb9ixhio5t75lzgwzk09ixn6431vnsuw57z6tidu16i2xeo1',
                adapterType: 'hqegnu1mny41011q7hjzlig5wq3vqfgv4y5xw6lk6yh6asx86p3ngtz9ab6c',
                direction: 'SENDER',
                transportProtocol: '2lqfraz0anqssrxza9thma7wgg4adhn6f9z890fic4qgnxk8iy79u054ayez',
                messageProtocol: 'pnslbga6akxpdduy9xzh7c18rnu5cfjcp8f1r2soiz25vwijwr9pb62yirxf',
                adapterEngineName: 'zmu1ii8740o1uerbq77u9pzx2nayycfb0icigty5cyfnjc6xvokqjsix7qtkyskuufxq4sp67uk7u0concsmfgochuymyibhm5m7zx1rmcvfwvb7u1c68rj1mjok06hpphapzqeasvovnmkhoyltvvzr3rh4o47p',
                url: 'z0f4gclvbgpp5zq4btlx6lzau3wqmn1khq76cwr0n1wkf6xdgs5lod2fcug3ryqwoa9gfuvcus21k5ti21o7prf7ly6pzkqdaflenqdgcyodyflm2urlo4ssi7pkriojip8qqoo8s67burh6emuigjzg1cbmu8namz09qrnmwadsrm2dg58lytth447kywkg4twa6omyz56fp0zfjq6c99zh8i0gjkpsp47atlr648rmkk8ikh9rzjg9lyj5u2f3glakoxtwxvkuyqtxlqyt1iiuqp3z216hm0rwck5pmu485ua8i2tsg9zfzi8yiliwg',
                username: 'o5w3ylh8rsaxmdtludpzyjg791svvhd4ylhmsyoj7l9dpfp6prtng77i5aji',
                remoteHost: 'calb7eio3leqdmmp1djhs5ogai389fw2ldj2j5ewowcxrpqnol4onnsyqsyo4e0ygjy6qumc79jv84dz6xd0xlzyd68hje3idmyxy6tl13cqfe29you7zceywb8eoumnppn2g6n2sn42qi465vbblamar0h0u49y',
                remotePort: 8278530225,
                directory: 'ykdv2y7hokhmgy0e75siu0q5gpj7f3rsq5wr9lqgklml1zq61noi0orzbe2m3qfzkl9k6l6tarym10hy2wrb6n32bbf8z6kt9gvh0h9drtp7w1hud4s49bdghi2bpq4z0ke46kee9ha4crfkceq2k8lysdywtlvl9venilag2p3ewpj8lr5wlnsanqrsbyfdlieuc5139hih3kl1dwg3la472xttw24ji21kkjl7xjadu3ga48a67fyjemmtpxt8b10r1lt4rocct4wekji3q6uz4j7vqixpcdb3w0boaezh5x6mqdp6pwh1xu809v195ti10glaqb7jsl67y4if51w37p4uhtkonxq5ys0vy0ewbqwh4c8o7gtpdj4qjbjgt453axym4dgifgaipqoyukgquaka318wl8ir48it35w8t758mq0p6g1qevbcntssixd9u8krn19nilj0ndnb6h8ws4wefy7jelkgmqnh863yfzke3pxytfqsm26stkqld31o7g7trc22pkp7bdk7hman14ndych4gnegy672xn1xjqstmc73cp5zs1jg4x6ufk56gc4dqmc7q663nw1zy2r679foprajy38rp22e79nls4hiywwgo0m2opj4b7j24rzn2es63xsttpa3n4mf1pxom4pyt33360hvgdk3kvmj07kajq3mue9uxc1igugn2qa6vjwbl72px2v96sawuek6hvlnw43ds3eh5t3kvvqy82cgt1vxs5ad21h37l6wyyitct7zlfe3tgdi3yooi0jxraz427t89h7brfmvyqvo6o6mvz70brrk5gfztcdnrok8bbgr45u7358hv3untni2t5gnhsq2yfh7ryrcvxu8k7e3x1wj5bfaoqrzyocqomhcsekvicuxpsqy4dvalb39x5nc5ikn3xf7e0yhh42v1jw4lh96wcm3xp8lht8e8gxty62tz5lxoxan2tfzbdxl0f1q0p3cyrwo9tiomaazkxtknlw0z0r5zjh6ztfv',
                fileSchema: 'algbaobmsxrom62xvcx4uqh4md9979bwyi44dq9x2wxa9tw1z2asfwdfutbk4wcdj8j2yj4ohpxcrgc6tid2dezqp4omkcz2dewya1jk9p3z2isujw7ypr3d99yrlwr9lpvqecjpe1ng26o5gn9cshsqpwqy3ntq8abeg6djp4wy58y0iaq50eh9haf4lhdir2q2chsd7byujx8e326hx7owg2lp0tbg8mgl1yhzmy2q3qiyz3vdxsgczmz648gqy6bpplm9o9umvb1x2r0vememz6izopte5fjhpuynmomp878kcfaus2n88ne84ezvmucv36nz0qmz813m6t71p1rvw92ic1xk37d8cfqfuhetbmodyj5as06c18nojw8jyvht5ff1posu9q48w627jopaafymkttymdpgz5xvbwzicbnfua6fppeqx62d0bgophskz9elzn0qa3x4ofqzi9b2zlcjketjwhph6y059mt4oosomanq96a8as3q6tq0s0cwz71j04uxf61jr7k25hlkj6sn1h33vgd8wzj9vdo7vsgzmjr8q0ccjlklv4al6gyhe8dqhyx2yljnwmbru5nvvgwlspwxzk0xxpnw2nikea7sptkved7bfftiyat6qbvnptlyj09uwa792cji8frarzqg5be8r9i54qtzx4glyyqjjzd3dlz3yr0r0azp61rbsj9wkphir629nj7g5b6r8sl05sjlmhj2jrinwh3wlj039pxeyp9nxolpzyyg9j0b8fz4ff6y79l7nv39ofctodn3c9rdgeqa79anqi7ip0ozvqg849oit5uqa3vbv35yya4j154uakijyjxkaozc8a8mwzkixh7dtqobh043fzv67ehtmi5aljfi5cct7oqt2tm9bfkd6bhzltx8gxwm2tyj5ykro4cw5n3wm5ciykmk51aovk4jrf3iw4rw38r1nt7zrwun7wtt27bqp9iupbq0b0s5huxjw30wm32y459clu0m2evscxmuf7yb',
                proxyHost: 'qdq1sm3bxk6v7jy6ox4jo6dhb92b5bn95ddogwm5i81q492ehyzk6r846xcb',
                proxyPort: 9551084554,
                destination: 'wbccz3f0emzv0mrg1jmsxe8novjxsxo5xxzqavr3pamq7xp35r395xlwpxnxrflck8ori802khe3uilzwk2khdwm56o36ywxifs2h3zlnlgdo2hskd59xb0nsvq8scdcoqs3objl0x1etboytrf4lflyc4oumaz1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wqw1cp015qzqvxyxvo4ai73vul4grjgh7vdwx84gxzv2q4hln9q7r3krfpkhn2h6pnybahn7cua63922zqftuvbmsjoffo1hps9zte0bptzstg2fnztx82yv4hmz963l4a6cxjqwngkh30hop19200kh2jnqkda9',
                responsibleUserAccountName: 'aai4fuyhaszybjxmfdhe',
                lastChangeUserAccount: 'dkawux6deu3ykfbfp295',
                lastChangedAt: '2020-07-21 16:31:54',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'gn8dcbp9smnmzad6lmynee1pys3dph4bvudv5rvad7x8e2nwudaeum306cdn4ac90plyfy003qt8fyvcdiph0q5x254f16omds96t9nbxp4kf15jcb5vn0jbkc61qlz22wd69bq1zhcngei1vwi3926fmp4gtt9d',
                component: 'z3bo919v0hvnfdk6i33667jearx1jr3gxtsws3tjv8rp0out3tkqvgyn8gx9ny5saytwyab3kpwn2wqyacd2udavl4gky72qttd0rt65z05uby7n5yi0qy7bk4puddq87tr7t65vuvyot83nx32y50wmkqyqq8qt',
                name: '7006xkl2fvo7tot8s0dmv4ta6ys2cmrsb6u8fehci4i0mqaslponirf2lwmwkmpe3cdhyrwdcslfxk10fikgo7xwzsf4z8wnhzivs05l0matgt1njcvsdcx3pqb6juw1bn899coa8casozbdjptlimhslt7202e7',
                flowParty: 'i7vgbmwqsxwyjysvi9u3lh77iwaqt3kpjg2ft7591u2m9yh2vkxdf976fz0ldsu1sbo06qivpyanzz27ug7kbqzsnuh5bzivuvz8czoh84cgcwzda2dwkg7c3b4kmvw1hmszb8earwj56jmnnvd7tqpbxmv7cije',
                flowComponent: '46a1y1jekp8wrepzeqopgwsc9a52rcnkjavnzthluh0njmcsa7zc5jphsehfkqtlzvzyg3l5vti2z60oqw5z12e923c5uuvzpwxcdybg6voi3rxuzs2vzprp3d8ftub5l0kkn96g8nn05yxn34d0tkukrtvbjwnb',
                flowInterfaceName: '0yofom4je8wnii2vns7ayevp3ap5ykk8gmv27w29p1kic0cbpuq4cvefi25b065vvu48jukebvjizwz8qp8tfxm14wu1i0q8khe4nt0t26f1ecol5kkn78kpw37yhr4we6e20w7v1a5a676l5dmcc27qlnls03mk',
                flowInterfaceNamespace: 'ifnly5hzk0dpsjiwhuyzaf5wobdxjifyxvf3ohqf3u02rblijf17gayn0nv5cbgqy92xg0wd45mkt8246r23mmp4y6anrnanpiswv1wkvjiyxg9k4iko1sdrpszcj6gmlye09ug98kivii4vw0sccfsj9fjf2vuw',
                adapterType: 'vntoqabixil9ctli5zpawwv3fmjbci286chkntf8v7zg6vits1utzy18ldtw',
                direction: 'RECEIVER',
                transportProtocol: 'gvceeoeqm9gwpfws8ols2tu3zo8ff4o1tlecv0wg3xq5ul4zv2bzp1wopyes',
                messageProtocol: 'w2eguk2h837mf8x9khqzqyj0ft8u95q44gq9pnpmr1px180y0vig6cjn6ayd',
                adapterEngineName: 'wbk43n089wt9v32w11joxgqnnsoxlrzf1vafntulhq1yrd1oqyzjjfuyxm4f9ad19y6l13idjwtugu24p5b6ihwrpy19f6cmexb874uicwjeiotegx2rxbo5z66drrsjrdldddnztlcvvd0z4u64ehqo91n0xetx',
                url: 'sawn7k86lad9hwnlbl72x1zp78iz1gi90nxczfbfe4df1nyvfcd4czkgbcqnucsy9j0qus6gm9tv8gp8whaiq4qddeslyrkvn8jhata6156mjr65ba04q5uf21rl9o88p5hnu4fcrziwuipdvj5277y8dg7enq0rcbrczmilgalwwqtib61lmxk1kij9j3kq2dw1zpdw3c51vfvwub1wh6lw2nxphqr7v9s6jdfnuj2kxlgt08dfcvwwiqciifvfssurggr80nep0ptg9xdkxhkuks0qzmaw1cllq45t39b4kcec0bgpzmhk3m16snwn',
                username: 'bvhheyx5wxvgnhwenhcll4xdlw99s1aukulcy70162tl4w854d5r5584ha59b',
                remoteHost: 'z3cr7xn8a4gy827ohv6w3gb8yi1absnx2wjh0qk06nmnjdsjjxft657pfehyv9kuakmtddur7268ykedtfqp2cqwbl7h2w7qg52gpd7e8ukwzj63lyg49o4ry8p850c71ori8qlr2d8hfqxdtta92vn59tyrjxwd',
                remotePort: 3993803771,
                directory: 'mbssdqfjgijr1d50bvzx2b5b416tgp4oey1wz6orm4u5yxmi62t06wj0rfw7k2xixv9txo64n2g92li2sj668gf79i7rsxb7hul7f3o5b0dckoa0wa61wyo2ea6zlqxwmocotenr724u35f1epyr7r3d5miia6bwsn8fzgwqd3lxjzswul8xd8xhja6xwr3r6u5twh9p6t8u9ee4ad0lfix8oc2pb5tw3hpfxidmcu1u2q5rdkcs4rblxjkfnl1edbo8ln4squ3yk86kbx4f9bc9tm9ikn65kyni6ahzl9np84w7giompr99xm3o14m1yxiwltveg49i0hu3qlbunn1a5d0cdav19l65740o831lqy0i10h3sqa81sja9ejjqnsda0iv0oo4xf4ge83dtv7n23e967qdexen27f8xr1rnhuvio3jd51b0tsh5a1lm1f25wk7dki1o6i4simlydgxfbeoat0jjymu6h7uqssi500lgjocqedfs0whx1w3hwpm1xpyc7yp1njxbnfvcrhxeoccmnht8r1iqr7f92j3yh6771x6djwt45gveeku655b1t6yi2379wts3vi8tv86x4it51zlhuvj22emmxo4o2tiydzqlxtn3k9ysmyobqo9qdid5ujy7bxbpqb2ekzaxoc5909nuxuhpig4ywawu7okcra05vfkduomxk5552kqaf7930l0nz4jiyczegrjc11ncwapz40nrb0gbbszsrlz38k7iu4yybxmlput1vhyd5wqqcfka95a1sw7yyrzljvoxmiflgnf0tz09ix02aotthl063f3oekdp98x1nohx0c24azh52jpu7pdy1zkn3heg9341ezaozu9cg2w8v4ujtv6p6wscgb2yl9ji2355t3vwogslnmeocnkr6io4t4a8f7omxv235ql3av1nk4o3sjnwia5gznbf68z37ehzh9qh7qf4oxq0kyzrwof9m4hkilsma1fcjk3blxmvdvz7uqlaru3tvl3eh17',
                fileSchema: 'wt54yyp6cngzcgda7d06eqbbrcyktj9cwc1u0s10ztfr08l5k1pttmw1lfevcnh17msk9cqo7ngjqfan51hav177yfuhz3q59f1viz8pct65nx7v4o5izsn0xcc0pm3mdpcf4kejum7owt7r8njweousxkmkbksl6m66qpsj7v9dhy8vgbfxiva0qo9wyif2sxgyf2ji9kpahy721beq1kc96gdw4go9drxrfmaos6zmpb93x7rysannoz7rqqtbipk5aiorr1grmvb4e1yb4rn7mh96em6yml3q1rdg9b04y5wszdkojciftvq9qya9cinsim7wkhq0zvnhfzogjnwmytlrrml28qxnfbwpkaf8wf3px6lxmxgqy4itknztv9zshspmnj3sfdtb3xx3c05zj9btpowuvacduiw0y77z2ogswjhzva7xivfmyr5ctgez87xnces0g0qfeh9vdj9p82tvgfmj2s470xdok219683gujub8i7qzllw19jwsvfi66cpzq2hcn7ez970xwvdh6yo1en3h9juxuu7ec5be67r260soyqneyn9tnmrmviqpd5qge82lozuzu8id606rsk5v1d23jp85q5ejuh58i7b911bezsrbclsszv54osficdslknt5rv847hzkuxt1a2xpfanssb5y6ubo39nv4rwuiv8obwacs6w11hrpw37fglhwyj6llp7a6bjyyq8slek17hl9fq92re34411yeqlxhhat2qgmxt330r15by6rn1haxoeg9i86p2y7my2ae3fu6yql6hcgyb8bsbz1kfhxtq1z2v0lew9cna5t6cs81j5i2e62ele8ead78kfykdpngnq2hk8pj8e16g4v0xdt3cyclbyclmo61bcafvwe60bxrjz8m4fysheqigs8o07f6aqkb5r40ajm5ix9zsfnbkngzdcrn5wa5c7nwyx76ouyq7u5ho7gcnlaqn002rycv38glq6qj89im210r3fnj76aae7i2cab958',
                proxyHost: 'd29hbivx5pgpzmygjm76j8o2gwfoc5ds6n92kxhihwasvfsev15pd93pkegc',
                proxyPort: 1443532940,
                destination: 'nr1nxp6wzcswmampwfdo1gnp00ke508bfmth9dg2uupe32opsr9x7642e8witkmk8mgt64etafoswen0lqtstlx3am2wrrjqkld2yzo1ffav262xcjcrl2uwsmahacpdc6kjzwfrnqpdv4mslp65j8orbfuakh7l',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ji0gdeb67lrh446le1kt3rosi806pj7w1guf5zhpggn11sy0mf2p60zgdqu8o6e01agbxmn561d2yk14dn00rz9zpj57h9n12a155lec2yp8ejg5ffe54gsere1bt7jvr5x994xkkvnwe4x0od6iv1w6k8g18a20',
                responsibleUserAccountName: '9ou8zi9ubg1hciioblrx',
                lastChangeUserAccount: 'ehazh0yqj6rw9ab89xwr',
                lastChangedAt: '2020-07-21 11:42:38',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'gh236z9ogwgshl1d1hv7sbzhy3mkopycvqncweq4ynfvdkbarqizhsqqkn1l7cqz757h95aakdh11nilsc78f6d4is70xw9pwj04ete2u6kuxurquo6qna61apt4xwjv95zd9mv7aasslnnclfszzotkxdifvdn8',
                component: 'zbn7od9zu9gknqbsww0jrksuwv86hq1aoqr8j67du73t8je8q5j52lt4zp14kedrh572brn39qvmp2vlbkjxdb28zzioks6uykpzn2615t3dc2ggbwpa3ym5jldmfi7s1j102w10474tdqvwuz017p2rnnc0ge68',
                name: 'cdbnynod7nyglfc4q0j63v9oppbo447fjsy0o37hjorzkae4qsi9uilmnpu15wk1to0i78tn9tep0shiu966yho63p19n1gagw3gsiwhnqoh9siea5ud0idy929mh22wflopgzlazxbbt57lc71wijcokkxlul9q',
                flowParty: 'bb6kabts92vfe0n3djcliwc9vjt83f5fmqe0oufdac0yv63uvg08i243f7v9kscshk1sux7qxscjzz5ral7ohum5pmfotu0gr8c57e74wye8jitb64qub5msrmfmtfismdiyx5jqtqbbsc28atdtk2v1wovi3jn7',
                flowComponent: '84pkjzdop6ehdpi9twpbtfk4xyiki19aks3obviv00z1abxdog7edlzww8gbyicd8ekto8ur11c29utj6v1qrjlgtn8rudxluq9bu4o9it6bjp0b4aoeu1bwj25p7729agm4cv4w5v22qwcpos513drc7efwgbvn',
                flowInterfaceName: 'xxlen0g1gwnk8t6n9i40f1mu93hsh9vaqh4x9oo7woxcxur974ry832djkega6qfeqmtthak8go6elrbjkcsq683gos3orf5xa32tdzemodn3frlwhmrsqyjpfig89j5w2lbessh1tvg2k48mj43fnvwd8o0k4lu',
                flowInterfaceNamespace: 'w9jgtqsgy5toj45l5269f0sjbmrpry444kif10w8y0n98xaeg8for8s6kls3rl4fzmtypsts0go8a05hsonrwmk0d7qfdj5i6zw9f5xi10umz8bvtywjbo4p079lrrhmmr7utrbyb6ozw6elfa48q6w47fijd29c',
                adapterType: '5f28sqgzgdzsbake6uplwmj96iunbha7bdvkfzt3dhac8909ooxvdr0ie50s',
                direction: 'RECEIVER',
                transportProtocol: 'tpdrf2gvmylv03v8tb9ci2abw4yodal13rnnzcmcrx7m8u7n678m60155rri',
                messageProtocol: '9b9nrab0cnra8huqgynrpxo0pps3kul8lfobbaeqch008j5ardm8eary76ee',
                adapterEngineName: 'rwfnax08y1tnb72jnz88cd5kb3l8uxzsesm9tne0t69y5qcp5n2xp2yp9h3vgvs0t1hz0lak6n4nvt5tpn2k03isuq30stdf0k65y5ynfkru772cvkmy715vdbsbfwrsvs9pxid8xr2ooz8e6fq55nh47761y6cx',
                url: 'zw5aiw3f5u7mz5miiv8nxvn9mdpumxh7sdq9xcppg8iz6y4g8whwcnf27utichf6thz0skfl2jw0e7jbtzjay7uilcorr1rx7ov2w8vjo6lwl8cfblm2t89ork69p9az8ooob2dtv9vkw6mr95vh6oycrbho2ggjj8fooxad7vrjwej77cj8q4a2plznnh1eygbh0fw8vf7cnz3h6vji0l907vdzdgqrncyaj8kzzuw3mj17nw06u7trog287gpt0prr07olixuj4jcsq8bsb1c2awsl22e24b2lcubhtb43ypxdlajasl6gekjt6ans',
                username: 'vaw012qypgp8r1thou626x5yalog4r8wqkqa458i1ysieqxuker7bf2pv5u0',
                remoteHost: '33k6wnl643zhekxd68vuifoibs1lpbxevh69kbaixhjdqoyrfritnykjr06zah2uaa3y42k365dw4e0uesa5jz9985y4ui7j33vax5fvwa3b8rgeg5okfcufxsid1w293l71e3sg3gz6onamcl78sh8ubzsvsyzje',
                remotePort: 7400090930,
                directory: 'bdc8quax6gztg4o4o8izlpsfpefpbxumqf4329fjc2weluibvdb16p2s5bfwok4b30zxaxs5p8gq6a0xr1kphmj2v2hgesnn83w0yx4e7b5ho6sz3soquk9e1ujedr3sm7vmx1yf6bmzufngbdu1rr8qh0qwamejzepl3xv8mqxsi8t8c9khgf8wt6btwnx5fwnnx7ydkfyd2j737c4xuvml8b56jwc051a2hrlxq4hoyoceirlld3zg86kje7xt1eulutycgf24s13rkupg7e0qaa88ozcwj4bem84zhvqxzo6u69a3w7leffr9zad1zfueg5hunzen3emvcrcqov4grl9558p30yy4fd6424y0egu9bjqfpzj4g314bew3zndcfxgl2f3tdtv5gsbaurh621b860od9lmcqdm7i4d53ie3l0szet7fi6dov5ls8r2to9ra0xwu2m2iqaed7u9pr0lian65izijpjf7traihg92stbd9o5r65o1gfn3kqxn2sl0m9dwgj6iqsckip7slue8v04vidvj2cteopdt08z1ltb3d8keu263ni13efisoh2qbi4m0g3mxxlluba3gdcz3ixsccqh5kk7jk8h0516tjpzhcqj80qp2zsp4sm01z6jz375hw2akr1e27v3jcxlndaon4b5prdfa4fajwdhco5bkty2ijnbstt0izxhv2i87dot8t0g0cb4ykq835ttuy26ydbwcoso6hs46u7p8j0x1g63fwz95zdua15qifpo9li1o0gsxq2u64dzrdm7jydlm5oda8i5u17mmqwuet69w80own6adabxezjx9gg2e3wirk5bv4cllcm7suj2u8patwr4vcnpo4qboyqbm3v2g3hnd37qc8d1z5g6dbzbfskyc8f8q6ich48oi3cmg1xlxca4gpporodoow5szoi44tikiowbzhu2iv48nagzxpnmzvfvzhbnaoyep28nb25sd15d5v8gjkz7ojojwv7s3mctr37yu5ad',
                fileSchema: 'ghgw9jh7n80dl50ta8gh8v8rq24ssw5kwz3izy7xzf6ddi12vbhyozwsd2iym8p965ux37dqw7aht82b7io7xlnx8s4d9m5ie9ahfe6ueqwqiurihvf57dada2k9xtssxayzv3wdgyikm47nnn8yfe9a2vul01wjqasf6df09awa7c3myi7ooum3yi6d7tk2gt3a8nqaa9unq8vj2grsig27rh53sluaj39oxo4xxpvy29ik954p6o1hnk2gt0xlcmuxqjiq725103ajin080kpnzbftqejyhpwmhh1znyfx3pbosg8nt1zn9yohsn1z2zr52n738ziydzgynahaeld1zi53yb3hsz9hso9ywj21iik1ugm351n4hmf4tat0wz1d09r35diasvq3ikv1ltozmjrmrifaandws23ex6v1w881ej0bhqs90o0ycvqpql5nb97ouzhqxy1bwmltam0fo2xua0iru5ca63vkp0ghpy4vo5wzppths98lqi2syuub1a2gs71e12eldretgs8z6s1cwu44q11de9cahgohsrne0ijeyc83wxcewdosj3ftb6j8yd43im3s1fmq9b4gpt2b2bujt1g6a98hrm735zr368ve2xqtb124ahj94vmtwat749prdal9k8hvyc8odkldwquv7j02k4g0l2z5zsy5eslu7vkols23tc4jw2r3isjswypuktadi0ni31rixq5cy2hz83b6kpmsz20zhnyvbb1u1g7siv1pr62xe9yn5nc0wdiifij5xcaimex96ih4w3rva5riobl8zaj4g5vr0cv99fv4lfqvlv4oqqz3ye3jh42dvmi96oghpdbqpvx02hf9m37caniz8m02lpsbflfig2p4xl025r0eh88bq8l4hnmmhf8zuoayzyc33oca9slftdqjao908iilqmjyo6rgsy3obywgn0i988w7yvmhlrbo7s17frmrh6gw1huwtc73jb00625px7p9pxyy0u4f73zl19oss6m3',
                proxyHost: '02jk3i5nz1dnxt8zojh1k0smpgwzu6682a602qezuysk1pkp7bu6pmgaa064',
                proxyPort: 1067576332,
                destination: 'zikbsy8m3pxhdh9n5oz4egr6g3084rggkwvc54nyeema3xgknl9kqflbqlqnekyc0dogv7aecosh0z0wi01ag1j0q6opbrmnu9dy51yju57x0qyx1gj61c111ym5ac23vxgoizi7bf1ubgos39ezc96gwwhkfa2e',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8kw2gunr6k4p4bkwjt6mdlfx4rf1a3xzcoavulnnycn0x4jyovgin5ced0302yj6tx839j9xa4w2ei70c6i9meejpn7pthgw1340jdy14qfjgpnc40izystimpeqrqfutoafr2aj73avly1so7m2lcazcsn70rqh',
                responsibleUserAccountName: 'f51y1wi6k4orrso2tab1',
                lastChangeUserAccount: 'oknprezwzlv2of5go727',
                lastChangedAt: '2020-07-21 19:18:13',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'nioa4uqsbkj700qx10qjb5m5zj4rsl1wjzt52v6ksrr3eeirvuqvfeoyeb6cy6upgt8dxk8s42la741i0zec538dbzlsy2c8n6k2igimvk1lufhsqzf12e0u51qqx7cqs9uwc98jj6s31mt8ymqxqumiochxhai8',
                component: 'o48ptgtyvl89lxbk4at8nhetp2i4olotlykqt4wfgwq70s3dltg5wwfpjcl3j7pafx9i3vzmzf8chi2zbmkiryq7uftqba1wvu3el0im5cm8uhgtlof3dy5fuk5zn8h3kesjfrsw5r7vnamv3mzmk55jzove82ql',
                name: 't8dpbmlyk1uvw7yt6qnre7h2tybd348rgv6fdo4r5lsw5z783mdz7zwquqf5thi4ll3gtbb1cnhiqhjmetkrp6q9ev3mvbpms363s4ifvny88to1xsrtkgudgp4ec7m9ob2qjpt4n51t4c064zrol6bydhmw2nf6',
                flowParty: 'ohd4y1zm3aasfzc74116mtedy21tsd9a4onm69ewn42f8fe5t38kv8a22icenytmwxsxus1e451wawmlsdt0vg4ij34auuovz39mwqxqder1qtz0ukqqvvj050zk8hurmmb6ctz0ylmqm9h3c3vxbtlwkqytud5w',
                flowComponent: 'j7zf7hh2otnze774bcs7p7jtx1sw2qk75owq9x9nv32oe7cmijcvsxb78qasuu4ir6rm9tz4mgt5rlfs4dmgumkfszzmw280hgmy0fuwelgayax64j0ow4blmv8zqjj81xga59eil362qscnxusb4y8eblp8jmir',
                flowInterfaceName: 'fqq1j47gvk5js5sx7btkat3t53q4gm55baxcqx671m4wb5ol75w1xerhkkl9weejbf290tc2dkt0nrh4djqhj0fj6ykofvzfbtbx0kbtyrhwkv6nn2bphv22gm7fluk3txpx52rllk1fibctw59c1d1gmilkap8b',
                flowInterfaceNamespace: 'rhki8h9wqmfvi8bcopicb2pruogxiw0ixvylntjpg3auyj46zjnmzh3m7i6apnn3zd5w4zuonua6p9x5i0r02wtm1k4jaql6qobnt3sabtt9hvsdkh88nj1qag3v3zerbhjl9s8d395koduq81t8twk3f6bzvcfk',
                adapterType: 'nm4s5fbbwte82zt8ys6x3alggtzo45ln6zqg8euczt00b1k3a9xnevcuijl1',
                direction: 'RECEIVER',
                transportProtocol: 'nngedzrq8qsn2r4xybb5530n1ly5bj2dpqlu57w4hxaka9t8e3d1m3gf3vec',
                messageProtocol: '2ftrxd48df22orilxe90f7fgx2lh2iw4b1q1hkd7v4679rrhwxi69iu470lf',
                adapterEngineName: 'pbugs0zlxqcazpq4gwiuz50p2bmvk3kgt2qy9ngo64my1x4woz5wx10jc3ovjeefteeeelv0e8tkkrrjjopcj1nepm1dabj2tzscgbyfwmmyfowfyym0bi361pxtcrrlso01aufh2rrqtzn9ww2qvwa338wzdzx8',
                url: 'zppze8ogibwd92g1snu7pswanpza0cet284kdifvquljb3p27z01nojgpc90dhdqjjny16myg5jx4k8lxgsvh163n5mfzlbo95oje8iy81rghtrt9kn9mv409gq1wxjyjeb77bk5fbfh2hznr4ymh4wj8u5h766vtm2uyq9zxn5phej47irvx0nul95bq1zxrcn7kugs1rcemrzo01i8s5zeznav2xf70ttmh74968mzgjq6dzmpbeo98rmzlzymdczkfhaswkuu9ejgzjps9axx6cbn348aumh5gz8teqhjkw6i8d9x0qg0e5kgifst',
                username: '002hq09bizd5vf9yg3kqsf0i2n7hfw8mlkoiew95sujltezave8cczouovc3',
                remoteHost: 'jbj4d45lj9fw0ebx82auxvqu776vc35dyz8mp505jqcx1c4x1p6t0piufpn4fo7anx4qyzmv8declrqxf5s1pyb6c4yt07zgn3wibnhp26wnazyme1vqav68tin31n5yvua9btrmv4cqwoagjun53usklrwct3fx',
                remotePort: 98815539194,
                directory: 'lh7jj61dwcr748fhlfqxq3nl4hs7ihrm0vo6yhhwwnh6ds32u8se3wcjw2ht4wq430tgcqzdh1vmcbx21sc65lmqt4oje0ndrbkwby31oeymm3vuxegtmwfupz7k60y7zvivmycgcdvgfzmrodw4ikw7lyhkql8wauufumuo0cwgudf3vjocs878jw0whlqwswb5jl1kuzf8ikki57xitvzjnqo4j4240y3zvl42a6bkamgi8hn3j1evq5z2mrnmt4qq2yyv4hzhgnohy38lxumxirkkmdnrdort0paw3tontens75lteslnh0sgvna57jwudyliot3wgm1yzlyubz3be5gzqydzeuzoodc1g2ynh1b72qlv7872a3fma44yjwitn0ijjxa1wsckv6pnjmouhcl2j4j6h8gfm7tqpm4h9iy9qqifip52it17qae7ju80r64qnti24dptjvptc4b5x1adw8rjjb080oos87fc916vc21k6yjis7fk4ac0q3ixxoivvt1eybgveb7j0tji9ajat791x8ikgygxyp4zhlge4q8f7a1phkrxxf5atxmlt0lchidr3rurktny70sxds5uv3nvmtll2njk1dcvzzb94wp9pmmql46clr97m2hc7kw6rhv099rjl6ghhofe6tam5699lgxra5oibueo593947jqw5r19x5q557aaxwqydjmzifhofjt2a2tsyilemx4e11t7wfn2f21o17zrnbfm93ij8eaf5ox2mvx4q73d33ads2052qmpxclpu0e6xb5an84myvb2xjz7biojc8vqt5pqtxjta3ymxhdc80ehkkk4ktel6hsgt86tzwauzabcb0ru4bh6rqqtsw61adtdx13t0wutmmkpswpmlmgwur01oj7pzj0tbixqkrhkedv1zkowphrhnmr9x6uwm47577q440ox2vlo3xxsywv2x2qo47vp1pxb8j3i3ggduojzra3rvj84h5hapq03e4dzzbtn1klgsla0xmq',
                fileSchema: 'gd0payyi9zkz12tagdo5qh6bmqkj9xwkx8184jkkr1meggqswfwjw188dub8yi937xku3m48vftjger5u6btw5m713g0j3yvc5n1quyjz7z0k308fgj4dp0li01i23pcx9cu74im4d3gjzjn560vjclj5auenqssuu5r3dowufz3137uu53d4f7v5obvr0p3hbs8d1q6de79f98o2wf57gmd6hivh4ckqaih74b91q6y4h976t4ljamhy4r7qrg2gs1ofmxwv36r266c0s9fpppk99c9z0fonlckh3flx3tilqq83aaos3305u0uzkgilfkz62xo88qk6ku8anakwefmf28fl5fbnv8t38pwipuuntx248neackltfao51i5pwq3ap32y5y8w809qnw2mhswc0b1i4q57sxea157jvt33qf2r66s43ro6ofyocywi7ag9cwgy32ovw728fyiodti4z0p7ioesdlrnxwvq7i6khupcwoye6kt3fpli6yrtwg3z0ia61rkfev3786lxyaguk5pmqotp2i3ms55h79nnuraeosdbuqrdd4gmy1nuixq3rv8qmfinsrv2qmpqjezqnxtnrulj9l80jm6i7bg97q0ou71fcctodw7m07zks7riub0tu9p85xr7v369ljjqd7zedpenfpiumwb3uv6esc3sqxjyxcobteynvrjpw6bv4rargvpmj87lukt1cwpm8tmhcl83c6jkfqyewjv7p6p76p86gi64bndqxtdma08ti1ltgtp401663yiqwt6w1bwwf14o5b6j7fxvfrhhkcqrrsuzvuqbcch1r6hwegnp3gglo2bbdyzt1aqntdibjink11ukgnkx5oph83ezi6xivvj2l9d1posg28b0lqh78egg2hl1gty8cs4a0gbfk0mc2558c20b15wunyjps7d3h6xuxl771ehp1mh75ei87lez3uf8hircbuvl7azofmdwbdefm0mao53s2u1pl0wlihdwwkj8jmfx1qg',
                proxyHost: '0l0n2ryuy3jjrtkviw7ev464rcxdrjgxknauvqy4qmehl1z2h15uygbl6aqz',
                proxyPort: 5971875705,
                destination: 'e73e5z0nhmjqeqtmb6vjm5oxcly3386v9yocfpn9zj172ehw9iqa639ynmp99cxo54uylr4vyj1l3miu045z0nfqtji77kgy7svn2kpm06p2d35iljy1y4uvo2hzgwywwef9god4rjdp36q1tddqqebehzqyxkq4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'w2g3tk4792y1xxbp8y4ya8pabs6dmuppjtqcwsfxzmqc6cbhuky3vs7w9f6ygdy8lf09cdq0db27puqrohhrxej9xqn1rj6l0gdxuc9qm96ylqzk23pf7m9lqaczv12w4rqbeoc0ac6qtqn5nq0bd97sic41a7vt',
                responsibleUserAccountName: 'jsjdceg92nadk881xwvp',
                lastChangeUserAccount: '9rqqq3q48y12m2bvwc39',
                lastChangedAt: '2020-07-21 23:41:06',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'johfn91pfaszgsa1iudd62v5puah36di805enfet9brgnr66ouwm4bydwdcx3j9cilkya3tdvq8dj7xx7u1e6pd5eka2dj2pi6qar12wtrdw3luwznwhq9glx0cqw5yuv74rnymio94cf2ub38r9p9okx81s15zy',
                component: 'khd7ny49mp09v8mh5f1iuj47pc95o4igtuzcqcbs8qt45cf6whwukbb5yyqvnqnqnn9mo4u3dl8k7c648i3704nn04fos8ruo4i1g7fcgzbkw9kn0oi3rxd4wbkaggt9srubs4mr1fg8y6fskj42yz6b1aml80kt',
                name: 'qgn23b07yl48kezw5cgeqght16hqneplm692wxb3hzzw10xa84rq07bkzasy7sw1tmpv492luk6wrtlyfmw5pa1zxvrn07ct5cfuhdfc4q5f5jtfnu408s5oycp2ot6buqwuxd4avscicl0809n979pzlh2dc03d',
                flowParty: '9yzvkvi424ajtbvneclvia5gm4itrq04zm2izixh0yi50zbjuyrid7qlco5n2qvgklexwzmhzb2lfdrhcfjwt1uu79qtez1md9jynbnj5vqfct38qfulbm454a2hjg6fv0pq6f4p6eiinxvt0iyqofpy4sf7696t',
                flowComponent: 'chd7neff985s4p6jo2xwgzd0j9a3oqxomgnh0u8e1qr3j4j7zut3lu2wmua9gxkb5m1jbmllwx6st8xjecubpjwqu2y0svdqg7gevllr2zab8t1uw6zmkfpxzxl28tomla6vrtpntkhlwxlqsktc056erve367fj',
                flowInterfaceName: 'n0u2by5e2fha8iulk4vbvh6jifeeyusai3n1a4dp6zzutcbgvsbh0zqfswi5621oahbrld3jandbpuisr4f9dt64wziw1jxhyh7p4k0lch25y3jh8l75tcth4q7bpr7vcj6ongvsws7fun8y06w185aayl2dynfw',
                flowInterfaceNamespace: 'e1navs8nlevscu5vxhdmyvg7vw1g4qyrsl9hgr0cx263t235zge5ee5q9uizclvzdiisvg1iakqqabt6f6015tcl1reuh81uu9neurxag7nm7syxx5s0hkert73cgafiwf4j4ouuopomhuob7yl5ji99unru5hf6',
                adapterType: 'uo6yk5aap5ewo7ekb5h1s3e7s8zpat8umsql9kj18yrjbyactb5xmfj8y40f',
                direction: 'SENDER',
                transportProtocol: '806atj1gahcp91surp4w06n14lltis8melmnyo8vvudw56n0a67v0szl2sfh',
                messageProtocol: 'fq5a8lfmtg8qpoaonal6y5u2erygrnwidcetz8hofrfsk769yeq8ifm2lee2',
                adapterEngineName: 'eepjj2u1i3nnqe6683agp7t90bgyk88t960xiw4r8gkhqwsy5qns9ymeeges8ob4xkzzw1juqswah9szru6a9qn1b0h8qzv7l2sb5xx8f4crn53w8m2f83bwjtrgubtv9awou5b37p4g4h909nbjegj43eftt8e0',
                url: 'bfycthcjg29gxsmnwkdenahoa7706usprzujz4swujruh73kfj9l48oh4tppi6bn7uio8h5pi6pak1ktdc81bqa9gl2j9zwm9o3yy2vxwn5m2lsbtf2vwpxotrdjs0ukvyolk147x7hld8614oqe9qnq8bqrk7ed3bdsjfgs8sxy9v61b014v12xb6sme2jof1n3kdbos3r6567rh6imvk52y9aa9gle8yfl9idy77qe6jgfgcfcmhrk9mdqar16274r94myyd59501oc3jnsj2wwkm2ssaq8u5dtwcvpadjvsttrlwivw3j5uc48799',
                username: 'k5c2s4hb0nsmefkjikjys7rq1p1xevcvqz3n6863gxlivub5gq6ueunuc5l5',
                remoteHost: 'zaipus6mu7t0a7q7sfjgktwk3lsmsgotbbdbirskoofggs9cv5d8mbeo4a1hlffohego9u3qxb6tt962ffg3idhfcmh3c0bxmphskw5gqsaz9jgfwxi3qxjnucggtf77ojvx9s0h1bkb772zr5mzza50tfxlnjan',
                remotePort: 6186403613,
                directory: 'qh86mck4jn7450nrad3jcllihv9oekvc7qgee1xuof92y2lepra7xnsb4rsx8jsbpgxfpntyrhzv959j0237ituqfzme2p3nxrgz6klfummyha3fbvrc8vu4nx85uqea7v345f0t7m0avhizuvgfwi8lll6dhk9yf55zs98fy34jkduxl37uq03ydrportcjsk2bbztp5a469wz15b6dcgax1f1ghtd7nif8pthufmpvo9qxagz97u4mmfp94fzf00qkmsnsavw4kdbdmgjmnpf51zn8zsnddtcdjba4fmcvm07fzr8o7ajshz88qnlod20wpg6zlm9c6ckewgzrwt9up3coki00wuv13m04l5rxfa6v8po8l96wsm4418io97gxmgeg2a1silncv0rqpyjl24c9d5iwdeyiatfc2oicm6jya82ibcc1d7d3eanw0w83rqxc4e3fyj0siq103u0zfm20236hs3t4dnzeuwyeouo3nevkcjbyos6fbf7iugo5r5bnkcq8trx1atyefb9b1vranix97gitwjg07m4894q0p2yyx04vw9ilzxvtgwh4pqaiukaxuj64ro3hc106l22namgnzuwieuckfdn12wyte9izlmq8qga7j57ipou7yakqmfvhsemialfv0qcbmq0lnj8u5x498t4fvnogsc8lget42ion9on07pelg7dauranzunyxbpfpu5rj8j3qzhyzkexi2y5mn42pza7swe83v977ljgb77trmipxpuoh4by4us9i5zdzgnq544qxdc1ndqnq86awkzek47oa55edfcu8ouvvdpr9w84rs33361or3v6feuo5a5my4r2x3og22h6bk93tfvs60bomcsb4jj644rwtagbz9ee9q2imtgfgf6xyf93iei3f0ba9fk9pcf4qa2ldhxm5lvkbsx3lubdfd8ilm18haknpzydr03pbxpxcfpuvdbztebrc01oj4nvluzaso09y9bmk86bgyy17qh18ugrudans',
                fileSchema: '4rgyc2yzuigcln5yli0grxy7x57tmpgdj1b48tih2dz5uag5wc0bn0bu8yf7s0zq0pbkuuy28w65u7op9xsrvgu9m9fwfd2m2uplz9d8k8f8xz6e0uqzezikkkeil5y1cacxcc66c5wygzjbaaxt0xtyeniktx3zpa0uweida6ea115mrpkr0u4pu909q4mrlyikrvyil72gr8482udvl0vhx8hih0zdril9ce48u7huvq0curblvwz8zlrxucfd6rropsdugkb80oxuegwo1qxk8diun33su2476uc5qvx20bb00dvf2ja4q6l15rnjc06o87a2gvxsvyusv34agxf1m43pzfzi3k7inzdm3wme8nnwcyou1zi7cs56qbr369g5co9p7au9dzsx2mceweg9xqag2hg7ltlr5v6t8eba5lmlytqbmdivj53y1spzf499b8w61d1kudjp7nhbng19i581xrw7blxl1qqt5fujilfd5ngjzayexpti7ijctzt0xyq1tvirfpunulrrip057et4q9vnf59fb0yo8t3sq6bngfa4lqts3pzfnp7f2j2rgrlyvdllrrlhkvvhacst0v1q9cpfku8drxfps8wnhh67tw805uyjlu7787w4wl4ijtnl7uyw3uzxyr6xwex3sgd45i0zacxy0g0h094h53qwczxppbqp2xwfonuq1ycbb2d9fxx8luq8et93hyocvvnmotki2salcqln9obity7g58x9n6eedsfhuiuz62ik95k00oip5vbgajhynggamybhcntq0mt6jne5ayzeintdecvaowbmb7lz4yt281wzqcl3732tg6j5k8aagdq6opaws2vrt62gcpazzhw4xghbi6pbb4m8qdxq1ypbcofxlmufmefx5rh5m8roq3iap4gx2loapwmp16wb61ri84x2itq2s514prsfogk33nmv4ksuvfn9vtf8zicf1i80gfc4fr6zvnyi362gabzay9dnqqqrmn9qmd7265wa',
                proxyHost: 'gsrafwk9smcb3cl5ys047h4ojb03r9so7p06ugbwq3oje62309qh7z4fc92s',
                proxyPort: 2568364371,
                destination: 'vggstcw4fyhmsx6cekpunqm7fot4u3jvkz2o8g4m29515iobrjzeehvbiarce4mlw0h3tztcdiwdzo2krr5bsnqf4ejz5soxu6p4scvb6fygj11s2yuqbbf0gqg0ecbayrff5e32arq297fkqfy26ug0tku5qnfv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vsdc0z8y81svhob97brkokfb0fyl0dkklo0mg3owckj5rs5frdjo1e8uh89jytgcy3afaoblslofo71padaqx0m23brtlqkh4y4m2jaqmcmvsgshi4v0f1w6x0tycsidupr91qwp0ioab5fw0k7ou1bpbo2p2inn',
                responsibleUserAccountName: '710ehzh2xj6ljxpb9lqc',
                lastChangeUserAccount: '32iomhc49jj6vcodrugn',
                lastChangedAt: '2020-07-21 19:38:46',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'u322ug33ui0iubwxv7sbhlzbj53y55io32ujhzwcyzv7ya8vwil37etxdsrzl0vfgacjrfwzfsk7qehll28rie6872fkgcjzwv8rze7dv0p6a3z93357bwjgqi62r5ljcjl83uzgruy0tld8829zuy6z1qeqamtu',
                component: 't21pb66ofbeevyhl8hdvmfwbuh90cv9t0uedjr9vzbauqytq3zalno5ws342o6acisl65y7qcm0yxyj467qqapdzkk72rkxf2l4p5cn8l2y6vduketvfsmhtju6day1rw6q94022b9x7h08eqpzupb3rziozxk64',
                name: '3rjmumd0ddsyiv81ur98ynffcnzo1odeu0g97pnjt8rzqbo6km6j2qp843qi63lfwcb577pqhoabcu67yecuftm65ts1mm8w6g8jzd2u1geva3kt65fcxbeuxde9yz31t09s0o5c5abnze0ryfh4wp0nf3d6h2au',
                flowParty: '2xi7zo8owe5u4xpwtvmpntcwng829x20h7x8ypg4ejvhp9djiow2x8s7en2h4a2mfnl17swof0yy3r8dcll36h51pgiqhp0k8fixwxm5j1nm92onrrp7j7z7pfn5dil9d8lvo9wm5xul1l4eulgvboekhnf89ycr',
                flowComponent: '9clhhv4ai7h7mxho9x0y1guiq8vlzflmde6ptmj9ksw1qq4lmhwv42fhbjfzm2u7kvi2ivuuqezkfhbezugd19ptp4q0bc5kaonfnxdk4vbil6azapjedj24npqong1m99jka88y62g9ga2qbmaymhrpy66tkkge',
                flowInterfaceName: '8o58mm5fn5v4r248k5ihlkiqjvqyhvof3yoyws9rpz6gkw8a7roifm8hyd8mylzxzkmdzsog7f8xlbm9ptdajv3g4uqod51mr7rrkgo2tf8ditp03omhah60d7tqjogz8lrskg4ptz7s3v1ql3ld9k1r8rc10gpn',
                flowInterfaceNamespace: '21fbkz5wtk0ql4ty698y85rvmzc6pvn3grzz875lqu8fs0w7mpk6xiw21gkdwkpjk58nc2pj5ofoig5vfu9jfjddsa6xf29drp0etmsk4u7g10jtasrrjllq5nff64yr1zblw07lxjn044xlbu2otri88m8suf1o',
                adapterType: 'quctf250v55zj75s19gu9z0pjoqwjjaxj8ffhrcxrf4bljzk90ynnd40mxa2',
                direction: 'RECEIVER',
                transportProtocol: '69bv56ipc1kzccruqtwzm4u7vplcnudqqnusake80wutz0x4wxnmrijbxnl5',
                messageProtocol: '12efkqskq42drulf1xeeo03a2ruhr8dfjfbmxp37gxw8byl3ds677fqel0zq',
                adapterEngineName: 'ph6htdt0rotha1gvx95z4f1tng6hwls6i4m5iadh3ftrvi551ovhxtacec640ci3gwl1z76v8da24tmjzoffr8fopmxmg15gzce23p3swwaqytxcw5wi894zvkf71a889fmsmz3lie9ldcskpd9juf5vcmdqpgxf',
                url: 'wwzsd8hvotsgj815cp70ptiv2x0gwrsgiesf3uyioequb9vgs56filylwtgyezhy29wx40f00xf95gdm0jeaeg9xf4486pne49rz3gqpatd933il2slbjil8q21dxy9aaefex5v9289n0vo98kyn3kdmkmzv449vouthsszpl4lln2q29pwvtshh05lw826aya76u0zgulmkaxw5bi7r0aa9wbivgpss0zbp830gzokz6waisgxinfgfcp7o0vhzikk07qnfkqbt6hxdjsvitp70irr0h09o1n4jny3q1eio892x9jqvkck5o6kxcgu8',
                username: '9eddzoybgrj3ovf5zasok5e8n8p9cektgrcmxlpbmxom3vafgeqda2z7sjzw',
                remoteHost: 'ff52u0uhaltp7t9abhozsf759feeg8ja3tzk93enoqtwrimxc9cxvhnbdt6cngb46iyz095uiupui1gp2zxqg3p7pabawh0gfybi2xn37ejxkpaxjkgwi31dqywef61hvqearqd313b563fnshuk8uciko98gjla',
                remotePort: 1951449720,
                directory: '2pvd1yo0vrhiaf28b39xkamnkqgn7b31r6oqkdgh0whxl4vw16istgo9wlbfvphvcmq1wqzghbhzwznl95m9fbmfhyqdhxa4gez1uqpr1mjuku0v3c3uvxsilfur2gbxl55emmvfzyurtay2t561aem23fuydtftp1bi0q2eeh3x9jtcs8fg5i4gym6za5ubysr16sp7nxqmdsb1eh0a8wm7bbh2a10sq4y5tveah31z6hrm5ybfmf8q4azdhjmgi3u9ejbk7v2idtnrqk24a8azs23vpog0upy4d3uaw4h3lai0deewb00qxw6swrjmazia835tm11g3zhinc9md5cbfnd15hi8umztnswctgnej64b0nymd7mp1dw4jpgc5cteho8js0g1637r0l7kdba7plan3272jtd6jdnql77jxcp8n6xrgomcwilbwrvoptm0olfp58xwjttow1fbgqmal38ay8iayu5pg40y7gcfmbw718lgisg38w4amll883a3gubqwf1l9lxsfxotfah6zdhy3cgkym4twdwxldtx4dimezm28n5840vi13cvv191r8bbyavhv40r9l3z6rq56hgevbkazzyduclwivg9wsp0iy6c3wmd84gordodzmmjvt3d32fixauvfm3klh4ogzvcbbrbha4njptsdqwtx3woyc6oumecw55a9egwzsb3mc0ofr119k8lxnl8p21op7lxqn2j6rp2urr6coupadx8cp8h64aiouw3eoxsfktpy5ouxv7zmlshpqm7n9fuv5w9gcnvnlgc6pujvz7rhz9ppzpmc9amn31gfsky6pviexp0ucxdd7bro9pdnwkr74nxzysncvkbfi9lukc91oi48dby1higdc97k2zh4q54ewaouhp65fvw6w702clmugpodjqng8bhafj7wvkexzpyxmlf0w4m20d2xv7n8hzdumm95ly6e2guicuu0aanw3s3rbxdab7er1bk5kgpu8wchu8ofre6tx177r6k',
                fileSchema: 'o8oroj2jdkwfqga7kqplyc8topwy9nw74vahkzif300b8svwvs3r83g5t3icpawvp682bepvfnumdjbu9aovkqli874skr56vjdqilyychlpf17zyemxoy384omfxoyk38jkwgoc994ia6oifs9vjc7rvbse5m37axwbej0vys0o5ilf3h13zq1y1k5u11xjt7h07aepg6kbo0tby5fasbisqjb3bk2ewxnjlv91s0mwwbhub4vvhxzjlp1c6pe40paidslr8at049x9dptypr7cjw1xrwvq0yfb37q799abfd3da0g1ph61q8toy4y7ajvy783m4jmov8nzz21xoy5ysdq6ev0nak8ns1tsqx1ekzu9de6ru24rosxg202jabe3v1h5tnlg1u34uhhxiposq166xpea5gmvk4netqo79hzn3b5u7ovncbq6p9pkmawt3mhv3n09pn90ryc5mdu62kx4wap4w3es7p2jb0ypbtp6i9o1rttqynq6is8b8dywwyukg7bli81a2h217gtkcrxs8bzwp0wf5rdd9kh4lntksjr946t3z56jdehyvqyiroh7hc77rmmk4ncrmv17jxva6y4suscw33pmb7lagetinv3cnl2je4hcrv5kneuxho80ao106f5oxxk92xs0khkn4zty685u5e9i7tut0gcqiv8atpd2o6o48tlw7t5wara1g2r2bn6z06w8s56beaemoeb67s5sphjg4qhyg984h8zonwdclmnr5zs1b47arassb3xb7o1bph7j7j3b6o4iwuh0fmpcgp05nczbfj5x4ms6bzveydycvf56nxvoh04s1kdi6x0ygxruk7s9rzjc9nrjlewjxrtwv59fymwe3gh9tc8l6q5c4td65z7xpj2kblhz6w4y89cybl3n0od992ncvf3tjgkha87cysbw9wgi8zr4jq2gs1ph7y837skbwhdsf2fiii5v1nire8oydbno69mlzzznm9728yj8tqb4b5btlgkwehx3o',
                proxyHost: 'kndjb1aems9ttjw810lxrodivie57jhvb6injrf1cwfnje63rqkggrn90ad3',
                proxyPort: 3262245741,
                destination: 'irvwcv1gg5nkp7n4cor7ekb33le6w8nme15bktol0rypopa20ygx1l0uauchfbh49mfy8i2jtmmdxza7mvgiibdbrydm8xpidhretvbyh9220yfrww5ur3b5fc29ayi2qz9jlyh985yootsmyee7oda0mlg9l5yq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'r7dyxduhul4ygdphgjy7hcrv0yu8ejekobpmulmogal9junhqw8ln8gez56s5kgzxi1vta2kvfbajnsztqabdmuzwj5lltzar4de4zqkjy8gsmt4zufgh14i4yvap656ppntota9b69cs13rmr194smnav8qgd4r',
                responsibleUserAccountName: '3958ds5yn7e03gbvnpe6',
                lastChangeUserAccount: 'ccm4c4zdkkys2osjdu0f',
                lastChangedAt: '2020-07-21 13:28:51',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '76hx5v5f8yelv18aylhb54mehf0byvb161z3oito2fmybz60vr8rovzdtxups62itemh1jdx14gup32wxxime67a4g1tvk922qtd0t1f99gzgrrzbyc3fvis19ghsjzuaubgyfuzpudycmtibqf2jr2v00na84ig',
                component: '0hz5dsac6hr9bhpmlphj7m39tti10pxcc6496838d720app16t9v2tw8yj0k4iu8a44d5dwryq0kzdsjke4bmpx96vvwqkltmfdcpfffz2trmf1qdhar3ygz33ulkuufn0puwlvu4fnoacvaq1wrcu7zfk8sexwh',
                name: '1ivjdkxxe27cmegjrfvhfqkfmkm7c5dmpd1uzp2he8npik84k0jfjdu8ml2ay8wfm4ua8mh1tf71p9uymmiugqlixizmfo3eu5zk3wwa4j9dox6on9d3a4u3982ivtz8awi9l9ce1mjo90y2lsmvc0ezzbewnw50',
                flowParty: '7p81xmvsdqse5btrufdlond4iy22r32hh7rjf78lc4zft6fnmadp82oj8kx63uxel837mu7965qwqywf2rrh09fj084daowzex9j5u71sjcnj44n5pk11osg69srpjy8oa9d1h34m5m0uzafv19zlkp8bacy0q6c',
                flowComponent: 'oq355s8gfr73uw5ln9tj15i55zena2gy2nrje5ryv31gyshiytzvyjcjg8j6rl2mxqeaea5cj1unqfpxwjoncij063kfpa3io0jccjbhjxmwelakbg5wm18xrc5u81288fn89h8ibf2vjnu726vf5cfsuhfw6t93',
                flowInterfaceName: 'p6ptr6fipdq6qyqlsl1vlnsajh3noppthfb9bb26671qiyzjq77whtw5km7h95zg8g3k7t9mz395zl6nomg4v1q9khw0vfe19ajje710m8djtyh4fw2lmu9l87izb5flh9g0q3218d6iptrklr7tr49i4er6y1bn',
                flowInterfaceNamespace: 'om2dj3b85p1q4hxjja0ti8rhwmp4c6u2azi507qlpnkmuu9c6v0g76xkxuwfpah2ybinm6s2wh7f2bs23n6czmlq1r9wfwt08s97t1ld83nva4gah31rtenw3klytmcg8z6tf7n9388kjwxcy5p6mfu2leh6d9xa',
                adapterType: 'o3froom7c7otjjhk0kp8ektrcd419bpfq76ohim1ypnzfnftlrmmprs3bj4e',
                direction: 'RECEIVER',
                transportProtocol: 'sgwmelmtt1xfussrvn86kl0625maahfx85ucrit6s3rv7jmkw5k7osk8jlgr',
                messageProtocol: '5v8btb5r09zj7aql0hehg37erzy57lgs55hc5sd76q5zcgsk6p72k5ekelm9',
                adapterEngineName: '21an397he0l0vwwmfcbdczvts5xcp2mj6y8p8y4fob468jfeg2xc8ejuybqgipqfk2dvw8l4opzrktz8l496ll65dlo88vzqg689m8ijj0tpm3p6u2thxq2uti1xggejh6ckgub78xwv2oc7bhabld3w3jw5a2yn',
                url: 'nuum6o609s9l9uaee9ohuw6b5bzieplyvuet7psuwplzewmrw5em5xxwnb5oa0tm7kobo5ovlzlijvh0mjs15ky7hewho0rureds1k4kvyigyrurac6h1uvtlaczwla72vvxppeaemtxs4drmg6kwm4j9kgweszxqofjghbry9fy2asy2kkld3dwxdvduve7exq4s735rih7cd5h4nhvr5wf5ev2al13zqvcjj7r0levbpsbxbki7mgnnup5040tqfk89vph6s5e5tqoec7l5btf0qnlenhbugm2vvexfhznv3m1yfksgxh0q23936uu',
                username: 'i5du0wqds5phvjd7839zt40norumyb3hfzjlar2n9odemirw0wuhvdkf1l60',
                remoteHost: 'agdyugnt2puq98bhrw3s0khe703q4cjtyqgiwqub3ge6t6zkrukgpfdbpf7lvydp1jn5sshzh0hsx5k74cg8x3loxn0popiaewqdz54av27g2marcbx5rkmztaj3dvyijqe334wzfiyi8cthzzs0jmftmargj2kc',
                remotePort: 1872703436,
                directory: 'ofwzac4w668w3a4t5q02wix8yz2e0p435uve4rgacmla3eblwzp4oq94btp1r6tqjftawmzcgor63wlkxot9b2co5wjkteyf2golr090fq9d433pmlch1w7rcak7dwsmv590vqrrnovsamuo63lssdzv6e812ilzgn1uykckgim3xlitv56qseo3s0l314s9bzjiss6jacp09fya4zr280s3nuf0jxl6dlo08yx11k03s8focisdjedhvg3yr474ltltjkejl43j2pyjfly7mekzymixux89nhpbiy0b25q7pucymmdmox5lz51llrader7ns2jenw12znkdxw392hhaaxyhfu2bcbdwax6debs1b2e46webdfbt9alijpbv2k32nbijcsrye13wes7czkcstbq66jxscaxo4s29pc86ujck952mdmtnrcamfyh43cmhlg0dz4a65kwwfx7y21qbfpbxeuzfgirfl1hoonu2hgr2j3syoqbycc338vy65nmgl1zm2h2r9bd1m9i1w1reha33gafxuq604xe6ez87sauvtq57boqnn55axlhdnjb6lbbqrsop2eagmlij4xzhgpr4tha8m7qy9keog7aurex9o0ab5x4yek7vrdiulr8u717g5duu9zhqh4qb492wnkon83aiqdrnd1iduufwok6jzzhw7kas1x69p0k35jq4749rp96sj5bewms5m5xqre12m3a6ds04xwx2rzmpac3y0ngnc3bc9s8e4o8acgzz9dppxho0ng0cz0roh8si6kdrgucxvd59xiehgifendcv8qm6c6hud19qtwpox2mq4tlk7kl58j13injak7qiyxl962e6owkkoss9dl6leqb0gdavw2csqyz4279przeaa4abx5t9a30qb6ipt3hfat4lxcabk57bxiaag85xyc4ijsi2o0iki5pbfi8byi129sarmuiwhv7mr4uut2hpad9hs9o9ovn9sydlmiygs20sff3yjye6wh96pwvf',
                fileSchema: 'olksxzr9f5jiq6yes469jc7yr3lkixmnzqaw6zipvx5paxtkmpzykohsrwgcs5hfb600p5etnnizh2qixpyyzp1jhxdlbj4vt2urbvllasb5rfbzlw0x3dgje0abd3ytaq2fysp7faebt4wtj80re29o46bfluvyhawxagg8jznga8a1l70t8zkipvpza9inrw208lt492hk3118cnpcsdbfgurly7juqz44jx485l1mxr4u6j8v1ru0imsa44ghy83op9mwxbiqvjxtzi3d8gty5dphcasw7aq5mcd9dosr2wsfviaho4rqkkylaozltx55b9lzbuawdbwtxuyiefehge0cq4bptvg45kc3ywrqwwiunmlzcevesgk8vocf6r7gfvz6eu7tl3i0gkv75kvtqrcbmr3d2s3v8v58hxebdt5gyrybx1c5n5h5jrf1ao6gxc0fhw89ijtq3jniz9jduier3ac71x1rx0vg0h8w1wdkqdm8icon0gxwcmbwrn084akdbp67kzbhm8qd3abhpulq9zx9j2q2yc3x8203b1c8nxikmyyx355f5aawgyaygrj8agqr5ukd4b80hr7kkcrpmgytg3md964by2p6hwmqnuabm5n2y74iv23jexpfh7tkd3logtbxs2kkf23bx4116bhtn2cl1pke7i6jl1wmrt8f8lxffjc71p95h0hhgp48h605myeivl7vw436qqgnx5oyonrfmwngo5toqr1nt5y8vq7fz1vqdzj0lnolybybm0wie69e7g3yz6gcqimgemtk2caik9a0p4ol8d9castkl2o0kjsybynmbh8w1daeuiyfkyhyvn17j1r9ce6cr82ubj3z6n3x52w2eap1yfhjgommpcvlej8ld3qfvknf7nx9kgftv4rffy5n1q4e25pdivgivhn7tsud65e3buav60v2t6gyep04cklluihvlxvgj2y1z1hdux9v7ny1pk2x11k2tcs2a8ki42llsp03ymmq49m0fz9w',
                proxyHost: 's3q59og9r7q51prjv4i66311iefxcbfsxtz7m3m3ljj510sw2g6vdr7ox9l5h',
                proxyPort: 3843959506,
                destination: '4urz8ou6x5912mo7ha4tp563lgggu1u8klrsezsa45tn9c1g9it471py1td5nme83vd9xeux9w1vqh7rlkd3muyzq4w13i5emii1z11g6aao0t7lussbx1v3ue3qb6q9of2s05ynax6qlxof0w9mndnpsahs4flr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'oe1qod823472yucdjt5o0f3zzvx7ho59b2ju32tkh62j5htevtmafyubw2slapyamvenb0rbmts04utkll2vnfomj6fsvwl4wdd7cr6xu3tos499uit5ta8ioul3ivz5j0zgz8ak4xl8lrqn47yduja7gmvknmjz',
                responsibleUserAccountName: 'dhjaczvobu67ui83tbg2',
                lastChangeUserAccount: 'x3rryh8wt0y2gem0jkht',
                lastChangedAt: '2020-07-21 11:10:46',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'rnp51t0arlkpggguri209aa6evpd9scyh1bz64rind12ulicqmrkhzffrhofao1i0dfhr58sn3p7zt3vuxstir4iw4hnzng8hh4uf2zc8qu3w2rtm5inuhc2wktl10r6txn07428us5uxbrovo3gqamzg52ujlzu',
                component: 'upown8pn378y14a6a5ir3iixan4zsj5jn1dh4ebyzqhh2jxhedj8yl4mbb72dydw7ufd0mt8usrwaj9umf2pi24zat5otp5or51mkvizz164bmjiogbvngbbhzf9wxlwz2zcbpog9re5e4oqp8z7f0gva55a8825',
                name: 'btvgerb2dzqy4zpyf51vrxlpvzdkihvfck490dm9x06oxrkqfmdljohujyc94eg3tg48x2gvc2nd61kklt8xzwmtg6r64e4xk1ul33q45zul35p3b7w3y1u97m1zkmcx52trh1ifeeyixp6gesyubawrkvagup3x',
                flowParty: 'gwlj8eo8l3idzzr4ll6m2sht9gvu4shqbr1rmxqw99xygkgcabyrrm41rrnsdpal178zuzrdii4nee79mo584no2xbxvmg46svwsldz67whmipv28tiwkjpwb8ol7i1v56ph578ds3duh0rrt4bsb86efpe5okav',
                flowComponent: 'gz1vi23kuvnswgkuxewzk1j2g65voya86deohsja8215utj8h0cz8zkxv9c47xjhpvjkgjobixm4ycmiuo4vlo5dkmodazwlsjpalmlz0pvxyp1qo0qplwv4ml1yo4cb9rnlv5t9din27sj3pjyfzfnhs751uuoj',
                flowInterfaceName: '2q8wz3ekqcfkej7o44t88o3pc98ftsa5jd2pzsl5w1168yysfsqbz2jk6cc9me1m0q7q002tmrk45dpj1qoidn1jaxa1u3chlzd8uwwd8nnkqe8hx4vhjj631k2zbdsocihiryqv5gbfi9irfg2vtox9epil75ql',
                flowInterfaceNamespace: 'c8ukbzmgjlcw34m5chpn5ntqpnm12vksqp3o3fdjhij7bcja8hapece11pnehlg73elv5p2vjz08i2yi8mj57kd828mcsb8nvsctlff61f7gmwku3k11kadxiwkd5gf8vpbzwxr2gf0sg6uv8z8xprvpxg9f35zc',
                adapterType: 'eveug7kkgtnhbq00x1wfpheku1nuljr5l0aikykwngest7lkpptrb2ocuy68',
                direction: 'RECEIVER',
                transportProtocol: 'fo1k5rb66oq2kv77dyu9chw7cqkc8hpxblie61oar21zpyk40mpe1hkpb2qh',
                messageProtocol: '6sdydki0fss24na1adym848d5x2y1rrfox9wjc7jqpiss3wye6hf6e2243zs',
                adapterEngineName: 'ogkk718404gp2viatp9waik8sc92tn6o2ki1elvmandyei33lik9z7z3xgc32er6hizgkxitd60cl5wqc1p4getj5ney44c9yuyq08fq0mz5wzx4z0euotkv3uzj6xxignb5x3othvjuhhisau2w1f4jbo9rk1lv',
                url: '3jngeo9o05jiexw2wyeqz47xv3i5yqeh0dql7h3e05wv430w48bhtxnt6lt7j9ej5ieaoxlfa3lza62w6xvlmo0cc1pec2gbvk9cdn14e5l5rti8smf3yas1gdz4ezhkwtguvc1x90mh5oi1qp745du6f5sp6o5gs3goqakoayjqmrxa3a1yvv9dylqh1flj0t9mxg7zwaqk14hednls4hgzfsdyoatqbn0qvmgso6wz2dcsgr76sjd57zez76y2pzbn53ygd9h227fex35lddyw8uhmdinip5niy8dpvaibjb7bumo7goyqj8er4lur',
                username: '34jn62f3roetdvn60hs7qhgmaenb107npmsltfki8dxaxhoh6er9gixqdlvp',
                remoteHost: 'nwbibyos5ti23rgdnaimjlyewulos2gfvd80gkyqll6fq4hgrpoxk39scel84nxon8jk48mgooh50wingd58y33bf2euko8alvpfwsrd5jynfm1ce7xg5cyrw3nuuscxczw15nuja8emgt8iw365vhk6ykhw8pms',
                remotePort: 4635593774,
                directory: 'vwhe8h0w3ahr4gr7btll2iws5wjq5p87o8ik4qffxaia3mnnhc7whmiw76xnl6014bl4ofqjr1v2oqafbvmsf3ci8xj7tvr2cwvnnexpy1cm3fzd1kyubj2whvaksgv6sen324gwzrfykk99wgf0juwe55ti9c9tzsb8ofrbtwfau9lwj0t0q1gbss93j5qn4kkayucti2e8cwt580604m5dp38f232tyw311dty1r7cz39nctvaajsl9dz95z3g8l43uhqg0udaj4tll9hqaoi207vnfblrebb8rt4xwjqv9yi5i18qtd7qrdrgafjwkrhsc4mywpepfgduv5xw7a8pr3bb4b1qrfq9o2cek69d1jt8kd29rak7xo7x8x7bysfwynnu45jsick1rzple61fani2ni9908jz1jwj5nnnemqn29ms1wv42ze86h2a4mco0mtee819xs3sdcn11abwjfs4zkttnz4d5b68n24c39xk3jyk9mu2o89eqh2s5yub6zcnhxl0us8yynstm0kfgemwmun0kb969e099355monwdkayp0jp9ohrz1mq8msxzbfrea0sfsajo0vgyldqzqvhkeukbnc4kezb67a14hjmndte4cgi3je0fmh7zu89jnyqcmnu7bcggzj0bw62zgicf455fgwr7qp9d4i4lv9urjej22y5oxsbkr1lp5vkhp0gnheh2b5zs7o9w14xawj0akyf8b5l9j74t5gfjfjknjp5n27l5gktwff9ftfugrrkg260biwhufo4mtf08r1x6p42r3eiikio8cpv7ppz760zsg32oxkp2eicdh8l5yze79nwcpwpa8n3g8hza2u3wazdcd962v597us9wdbxuys1ijxfl27nfqy1aqeouex3bwctanxl1qvox297ywf5sdh3t88ekq7mt0ssvr8yr1v1hrlvjiz0yah490hmemzw3jvdxovipiu6px9ji8niojfmwgwuheimcwjd0v7g7kwot7hbjdkuu8m0',
                fileSchema: 'mrvetjdq020drliqd2u3kpx3x8rv4lvvd49ziyp0burlhi1cgiyefy7115fbs9e3f8b3uohvwq8izkkwszh253ivfqfkeu7jklp2l7t0kja6xhbypfrgslmd8j58au8xpmd6g4x24obmj61s8muy1eqil646fg0wjy6b2txuikaye544ikchoddyu0ngvn20m589kr45ekilkzgiap353cibbgkgtw23g5yiop7yjwjikx0ovz2q1iw47bqbieedav26ll3i7arxzkizkh6urfgbt400p305hbctw3pjdecemt6cusftn0kgpb07f3al5fofddpn7bh63nrfop9qu7mruaqm7zwcow7yqtyalqoz427sdibmrudr42jieuw91tchilrgxdqiydylf6bgavhy1liekkm7po2agqu8746hieceddkgolq27zfhnkkaxlfpgjkm9qaigd32rl7ry2xhnk3z6zsi4fyay9kfors7iry55bh2vbcdbjw5qf7214j391wrb86ioosub401vp93moclh76ffq72gwejd9hveftrsqha98yzszeanfkcd35spcyb44nlfbq47wb8223vucyl5d1zow8m936i2h6k4twntrqn6m6qmsi2xyhrvivqs6hwijhsw2s1lze701q1pbv807yrftl0bg1jitf88061d97yae43l8z0vsw49x83wuxal026or1fp5iz17tch3cpyr6dwox0ranupcp5zwx6ofx52keul0td358anuaomft8cy5ttompb3x9mci8lstcuzeh5s9xino84xa0269z5l7lfzl3b7kfyyqx762ni2cmod6cabynfj292dki1kpdpwf7r4bpr9vflm6gmlc0fb25k1lagfd84kipbx2f7mc9ntx12hlmsf85osfmxjs86spikinvcvywogkdty4iad8oih16ooplq9hneg6701ccj46unn0eeux9scp1vnq6bnybdqct8hn4eqenw5iutppjx1gbl9m5raq2',
                proxyHost: 'nb7g4lx3ewaht5jliwwc3q3wml3htcyjlxcwrku2jas1mcr8ydulb68hsuw4',
                proxyPort: 26553561711,
                destination: '07ifvg9ltsemselpptagquiimzjy4dediuqs6yrwfavp14tifsnmpd2fuwjvk2pboitycinctxjd1byeu8f2qtrlik79nrd2z13p5tvr002ep9lo8kz2vsidimk5zzaor99xpno16priw7udawyuqwvfh3oovrjh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c2zxceaboeg3teqx6ib7c76xmuusze0mlwlwhiprv9qyvz7f1dmlu5opq7r6ev02ig5jr2oc95aj0ovgslfw9g84xinqbm5m9g0z94c2z7s8nhzyea898esz4shaypwsskduq0nznnooxpmri2x9zlyj4goafnjn',
                responsibleUserAccountName: 'kvfvdsn4584zcq0g7jqv',
                lastChangeUserAccount: 'gb569olv8wak1w2gkkji',
                lastChangedAt: '2020-07-21 14:05:15',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'g8p2dkgro6yz15kdgl25wdnx2zh6zvyafvqe3dlu1od9bvryoss9y5k6mygqjjlo83wp3631jz40pizriu1wlv9me6dad8lbur8x3pl8h54bsdd08r3wz9zrzv0fs7gkz6qvwcf1pcr2dxz6u1y2vqjhvggbz6yv',
                component: 'yame34rxxavo30iow5lky0n2k9p8jg9a01f6s3rsljzfztkwt1mn2je6lf68ioaivy4oeotxgxvvnrenejr1dkz6q2qdlx7tkd1x5gs0xcv1m3m74zcgo4xtfyjjnfqm4s86ozqlv8c4g4a6vn9p18vba2c6r1mm',
                name: 'dt9t89yi26lrlwzsrouy1lza1k6ghract8qrlxuwqkgxoc6o3z0cond0y6z5lz8qyj0hqyg0pxa0rcrw1yn3xsbm6g0xmcl790zz8dl11wbcf4pq2gfmqlzr2ye5vfz0jv8wbmsf48eh11p0iivrsi2rbp5u7ku9',
                flowParty: 'b6y1lqa7ibyraspuupve9sgysq6w7z95bqkwgdqbhcgqdvtn8pd9c25b8byxcg89g6hagx61k3qt9clmirw1bs9whc3tvxnsgjfs3mq2t6gpep0d67r9o7co3rzfkilr0e5ff4vqmx0pezwusbaiz8nrbnnmruw7',
                flowComponent: 'yoy8zcgrtzj2h1ov8ehzurz60tualb4ebuhg9ab8xpowiosh1q8ite5flfbcucnxgfq79o0yu4nn6ewigyoqo0qvztcv4uthpih1o2q16vt2cgwcptqkqe5a2ollzsc869i8617j6oxpnzdd5o6ndchq9bqr0nq9',
                flowInterfaceName: 'auagcgenx1e0ti2n2f1l5suloa54k62i54y7fgkoibcf3u9pyur9ivpkjwq5rq7aqm6n6tmeg6m1qji5rhjf5z14te34o3rlq0xlvjffxy3tl6k35sldr4esymtyijns42yryf4wb8lfl8tleuan469vhcqc2p9k',
                flowInterfaceNamespace: 'gsufw1b7la9tx7hdt96j4vhuwudpvoyji8oh2d77hat95bopjvh5t6brua77rxk5sle6ri5csgtfjtl35i32jh9spft9zihb3wznz88g81mlvkvlskl0r3qizr08nqjxj111k41rfo7wshxr05047e49na2nyixc',
                adapterType: 'i2o3khjfopcwkr9t0z2vqgvtf6jv0k0a0racl09qy5nzxlfsjkswvv0ia5lc',
                direction: 'RECEIVER',
                transportProtocol: 'daqmlj8n4m6nr6hxh3a0x8ixl6wodls1jo7gh3ymvri8m5f0zkbu5l99lx2m',
                messageProtocol: 'nwq77y2yda0wdtswu40ap0jsxxi1dpb62ym4ytnuql0uyqt55xi7iqg8pk4k',
                adapterEngineName: 'bnkbjhxkg42e2wvp925cuwvzpj30yco5ybfbzd2ff00erj4v6fri0mtnqdn06pp941k02t62mgokd61xg75o0wepatogqfyicpt696lcd44r6kfvm6x3ci10zyug4q089c0x3g62yz2ll3to662gdli49w9x397x',
                url: 'o70kqx1iffw29u091mv72a87xz3ledv0n20monk57teanl5hg2ypawj33qujiop83lt4ykqt9lvwiohcs0u8z0jfiubha3kr8x3t3nni9ywssanlqrl7zyzdkhtf263b0lhprx65uyovvwfr60e9e916d3dvz0zlvcpacijq9u9uogh2idb9sa7xobwrk7uov3n7byz06nllfcqgohgy3ajep4x55x6vvlw0p6to3wchyg88g3zi1caxidvhnotixwxfhwn8k94mceuy917yzdeylksl3d95xj94bnvxo1o7qfq88ctbf41gvytryn70',
                username: 'g1qbbf642hnv4mwmopqotmy2lmfk3jfg73py6uqjezbhvn18cxo6g8j7v4gh',
                remoteHost: '00mnxxznszn1k3hdyc7hw3m2svxapiiuebqijblv9rdl0iqhn3okqe2cd2dwtr1smmy31xvw1ax9w53cl26pgzwv7796cibjqpsxw4s79oei9xezoypvu42kjxs5fzm4pkc635yawzhj1xbsvrjxsgw5ms4cmghi',
                remotePort: 8170252563,
                directory: 'krujavzl2e3ewqvbe4cffzo018im0jtao2o21oc1z1e518eheo3ynr160sm1l89o9rh3civltrk3l1ekwuayz06s6wnr9bpojh747qlbdh8ywm2h12znm6mmpzw6foj9cug5yydfybh83sj8f7v73jwewjupog9deyxbkifp461exlbllehlyfni9xxjpy4t75o6fpwmytzdf29d9m12pnwuppokrw97vgd54cdlz8zv5rco58edkl9k67uo2ork71msh0u8x6b29p5l91sjkoa9yxgrf1ohpbmpx66u2dmlx8zx8pdjuhbqt7nd431a5mi5wg5qp1z4sb3khloezwobe2d3g7mgpc78qqjufcqrcz171jdexjgicnvhxfre6oaizl8fvdj1d0dpaolqesjpruyya289gefp1gi522g918c0f1hqputoxx7ii0c4e0zcx8ccw45x3o9hpouwlnninntzxn7yk2pyr88hz32n85hlvpgv4np0r0pj1lvmkg4bndzeuocyq73sb73lfni9fqf5nklcbpm31z9qv39hi4jjcm9v4r5ekhksp440kg6as99dycbxqi8vuuixdvwy4wcrt437aesi5u7yhi6aut8ny8lrpki9v91vmk3t7pwdq5e2fmltcz144k6h4uesa5o3s2a1ul64ogxum84cf6bu887ny3d18adxx08kmofv8x5lzc8ggjiv2lfnpwnmwrhcvey9me9kuzoogwx580i0zn7yrv83wba07z71p7qxegttj84ydg0ckgut1wbyis6v07jstv2xmiqpu1aazk0n3uiafeiwq2tpnk69bnfeycdzxtitxo1xgfi9upqybzk25crlvvgyg82a8rh5zzyizxvd8xtbvabl9fews9mmgsnbh2tpzf9fr41ll61b7t8mbjbgyjutgbwc5j4aom6taxb650waqzzbpyc6xxhi2rubcdx14ki7oxpqyl78x5qwsrtkwcztkffylbk10pma3fs3dksjyzb6fecc',
                fileSchema: 'h7bq4bzzzzbzakd6x1pj19jootrlakjq1q3wce9dxqkq5gwkty8e20exjpkzfzxgusueez5tqv3qr00gdaqxpz7splwta9vx5baffwq0ohfkusbbztyoo7uok1flr3dz8e2ksxdpn3jqm76hvv9422ge5wk5vz90rhjpynpqc2a0e3678i3twdbhw20t10mazdwlrfgia73r5rempjjcocgtlzlf0koj69rohyc2gvmhwx8lk5s4i3x6jn3wxhb7583oad26jkm3b1z4n8t9qlqruyj9kq23uttuz9e8z0vr01dulsf61amywtdardlnx7j4dz7uqfun5ub7n443xojn2xedpbk8844v9988k2wwg3q7qygvssid9n236l44xigs6v4pisekssunkqg8ddk1ttxupamclvz3ycy03pbmvb8o3axybcuyc88eq3vxqn4jg7d2r2wotljuvqrh7q1uhhud3ame3185gknvmf7l1d9ofhmiiv0733wutm7hlm9ddsscl218uchxrnxz8xza0194yjk2pe87b8pa8gvbh0hhybyv5apwqbwzos6muqo2bjrybgs9g675eu95ftsl4kw6h0ur8aex8hl7l78n7w4wrbrcai42f1abh7rnoo34tx8ionmp98blwdi0i4t5vf552okh2q9he5hax6nrs8ya18x8ckiehl3binw9esifrjvt1w1k6gigxnxp7n3el7b6sm91950rbp7s47eplkl4zd6h8jplrwkvuvk79atdjfnod6ykaeeacuhya4pgtd36248pw4j65f07smy77p1imxsq2en7rr8l60hikisw4o01kq4gtpo4fh4hjyxffj7zvkd3y7y3k7zxjvk7xwijvmozss6bjwpmwhthmc4ilaj68ilzsczimg9e9ozk5486jrexpcf5sgmuziljmwnm9v36s57l2uo5wwb70lt9sdeqo2x5limrlcsw7gc5oxqkf15f5wa2ixcch0y07bxsmqmodcn9aq0yjwvf',
                proxyHost: 'p2jaf8itwl0mvv98o87dgyb2luj4c3dzgt5l3awx619t70p82nqdw1g50r93',
                proxyPort: 4523825132,
                destination: 'qgqumpxxtlhuynaz72b5kyqfgzuku6gk1ykzgcq2xrpu52a3qu98y65pxermwgxo1qqkigqwwxe7zoiuaso2i55f5wzt6ltapn01gijimd0zkt3ng0wmqhhjeb1uvg5fro50y9z6iuomxvsclzpcbtg8b2sngqlt7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '562n6euyiw21u3lpgxs5bujgfkzcko0gv8ivjlmcargdh6dl7d491j55zwr89w0geziffn3ku0jo7tjr9zosbqvdr1hfclqq2cw3jptpqdr7fxccm7d17sfi16r5ryz1wecg2s3pcbh4myxwfwzr1m0om6ymw108',
                responsibleUserAccountName: '72c5nu3jaldi5boicqau',
                lastChangeUserAccount: '0d92fta9t0j1rg3252k8',
                lastChangedAt: '2020-07-21 21:21:02',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '8jl125jqdb5kjj1me7og44rf48vfs0i5skrf2ept7b6zqdlkt0oda6fyk4e5201diavzh13qtcxbs9zn89rzqv7spwahjmq3x5xssdf9pmld2129uoxq0p77kv4f0k5zx6xhimz0ryt0lxpfthgypp8hmf8inv8n',
                component: 'fo8yhd2d6p8imojvaqmvwv1j86kc41uwranwdiphs38jejxobsb3jdmirc1fivm1kg4hmm9g99n11hk14fctzl9kzw1bsn9cbeobhqqpqhgl2364a81olzasvu3udt1zeqhzhozg936k4507gbohtub7xuz8o1q5',
                name: 'y9fmu7acw16oabh7y8qxim3ags2ufpvk9ubxmjbi39d3foof89iknmc9nphbiraxk9o9s485t9vlk0ffxt9faxpbafgaht0zrzy5iv14x14vbx4w7qmrlys31hlqco7tk57oq51c3b4rugf94vm15v4cegjpdhgc',
                flowParty: 'zrej8zy9s93dwm0wdfeii171lvwjy7gvn1v3qxo25zeirl58j375muqualh122sxo446wo7dbtypndjzh4tu7drzv6vxcr12fns7uzqkozdoq4bcijnqwnzmbp8ogmiscyu43ba85c4ajjn5ach7tf2uzt6vwlpj',
                flowComponent: 'hi8om9pm54yvp8th9wgf7dpo4qwe7a9suw47ccpk13sy9ixkoftabjw63mm99xra7w0g71qp53uz39mhw1ersbfskhorobzy172o0uj130fekmgq74wb5qfh4bxsijqsrsj0qom5fwxpp5xdvvk473q3r6uoucs4',
                flowInterfaceName: 's1ygnosb46xl171sty6kz23jj017zz0og7torfsm8kcghvip2wfn87v36u1th20zxdykcee2sumoxarcku3wau59vhgugbl4np89rqq1vi5zriqvt5zq35ezkq78uwta806cygy6pwswpj6ijjt10qmbyhhhkzsl',
                flowInterfaceNamespace: 'bjdi0xjyet6hpkc1lx6ahv9h49041subbtaagps1rsekycsx9vxediah281o3hzrspxefft6ydaj751fbsivirszust26py9uphk7j2s068jsb9as5qd75t29evcdqtilgrbje3z7h17shxx44u73pya3ztourxr',
                adapterType: 'vfv91eo4kgvvfqi13g6ywnrlve178lipsi5vd2brqixslcz888o9lpujcgms',
                direction: 'SENDER',
                transportProtocol: 'xvguny2esdrljffeksuqzu11ss3436ml1mslnhnxpi1gj1587ycxiacg68t3',
                messageProtocol: 'bcnaunpreot9il5dtxr414ruogxty2szhhfuk4v0zmj70zvyk0nezuj9t96q',
                adapterEngineName: 'j3vb31ujpbnzxyyi5ts4wmeqxvdjqhp9mivl0udvx8u6xvqexj4y7kzi2oscgtgqh92zl2va2goa5k2bnyartjavdykx2y5r5rh2piq1oj358vq6ln4dcv64qrdayqdwqxn06964u3dm8mcg6njj18g07set85uu',
                url: 'ri1kznni10jjf9aczr4mye45zlk8saiirxnx8gtzy7gpjaq42xodem8fz07wcz0acuw6mela49pft0izp3b40wx3oh8kupgn22xp7ghqsxhqftfvrzw7czuqlzdo70g6ygci6l7ommdqb7dscgy4sbxxhybbgy90sbtkfx52f2ku547067i4xmiqh48kvqveme2lttlpt9cojo9a6q60zo43u6z3cp7a7lt4lga1qfdr2yigxmyi5geohqwaauf8b6pwboho4dthvk850odkhlyhco947gr52ngbf7zg5ez92ki3l1au8t4kk0yrvkvl',
                username: '2luiiouz66efe69tnqv4u2qn3wf6zfbbhhgz2rhdv2ljs4tb1sik79yi1i4e',
                remoteHost: 'j0x0mai9wmno7ngwh7rzz0rimwjoh8c49sc08ar79l5aw9tiptvs6sev6p2amu43a053xxzvcz1otx9cw7a9zsa6hob4k2axb7py3whakenjig5nkt2jm5wlofsjac1t69sv136fmkn157kk95zjbf8qcic5zedd',
                remotePort: 5807563552,
                directory: 'of1cbkfprsv42uueackyhxvjivb5f4qruq6hzkwtzpmphed84ubp296jxhz1uxzmkz3cvizg7g9jeom1poenfubgwtos4q387kz57c2mown05ly5a4t6tt407e8qoejodag33e7wg8c6t8hxr7oq9ojujro9mosvz5ht0qjsqqwcnocu8qcznvphfq97ornxjqy9j12wbimv1f5oiw3em2jzhyet5ai08uclj07cdw331dp849g01ba7ozx6mrjqsju89s972syj5dlwm96dboc8cyjzmwi9igmx2r4pri4hnbumk8btvrbnsxd4bmpi87q3s703plwxnmut9eb41dhe6t9qx2qvt8g27zgjidus3dy2ulw1qckwvn3ejb6hgwsh1uav9ky7rhv5hj45a5iafc0jf8cw8n371t74lqbx9sc2gy8at8dvxbzopv5k2tncedmt7jpscavci51s81b4eaqscl07mpf4ecz1pr89wlttgrj1twgiddq9aeo0som3i4rmcp7drmedu7z5igtkyb8wsej1vm7v0fsd7jp50hct4l07b6er5gay1kdc6uoh83vua2a86yaxrwkuchrvosycfnxgkixxqlpe4boh8f9io56d5cvgqgzc0zof5cs959hvvieup7a4eoe8ciw0bd1bz40gf2af3o9wlbaus4y6qclm7qyssh21ugdnzteipi1n2apihtytlj51jeqltms9abhfwyqt2kr18d91tsnib4uftux8yncyyjz97gg6gk15qhul8q6vqeo8ric6uusyrmz4o7vw7k75b56mcow3xyup11pa17vfc77dkpe8aaw6kc3l7adnr02lpmus0j74fvh97kjt6ogto5wpeamp1thk12u0rqiu35iqb9s4imy565wj4gksd96bbyzraupvrzomtpwkv1elvzf2lse3e21424rquyot6bz9kqs0cbqokxjac8egezj3r7avhdc1q6tt2guv2sq0x6otqll8eqydhjvzexrmltwd',
                fileSchema: 'wrdnyierb68f6n00ucoph1q2am4s1kvk6le5x4r5tyoy36cubg4gqajsfghc5om9u5ul3sj65kl4mcfpbcnik9fb0aosktff3ozq9x9d2utoaoyq7wvbn11wgb9xj9trfbbsk9l2vy7311uipx9tcnllep9h85x95bydw68ih1q82ztat9i7x1m151rcq4o3v7su2ng7chv5pqe008uf0ak2o7dc189rxots8hufvlitu49wlu69qezw3ldd51qprjzrxciasrw7j8bq9dkowavznz2ss4ny0xm8exfwjn8uorwg9v7o4pr9vijm183wiaeotxbxssfdjqgmxd7fdzsjanayj0r5toryzyfyiscii6mnn1o82n96wy32nymmbj31ih3peoactytj4vugx1q25dpt69pu667zycfflwp7feqibm2q4en8w0tu4jru9jy77hh4ae662hh8444z1q5lwiqy9tg6io4olikuy6dkjlcctd374lqely39lgvl1twv5dukxu4fa6d8mt3xk6p0mnsm36n8qfxfdz0utjxtpjtn4oyrfzhxnuxmepg2p4vzq7q2lacrvg7ps48b24vjy4asj7a1xdtl261ekzom31rlgrqq3hau7n8t2k640io10e774ao573cpj1g1kpz72oenvyokthsy14rp6yzi0yr42xu3l1kvs0pfr55mrxqomnxwp1c1zp11tgnd72zl9l70ddcbjyvw9zimwulcxm6sp9gv4fju7e1ze7ji4wzuu2zs6lrksxh6w744ocxk6dsp2ukkdp53t2ta7ek5e8j42rv6qo8pudkos4eqyawdw7sgmmfspz877vgt2iosug2x6q57ecy9fwovgdr0cod1bevftpnndj76rzphtzom9gg7on2zs79unvpeeuf8q2sd00jbg1z16gv49mqjpcchbafqfbxil70x8d3spu47bj92tkwclk887p2zxybwlwyyftg05tqhmzrnafrxd67au43h0rpmwv5z3k6j',
                proxyHost: 'd2xgke6iy9g7kngrzpmr1jqoeetc40zuv4ffq9m1yfevxdt31315hkcu7plp',
                proxyPort: 9888811193,
                destination: 'r7bfo6nsvg3ic35yma6ywrplkappttn8xohcajfl1e8sed28xncw3fdbnlxeygd0p6ykxdj0uc1lf98g8klximdzilrzpuxpk1o51dsqzxvps1ii8kkoedzlxsspcw2xjv71o5nsc0123lf68hwmkxs7chd4pl3a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5um3ctlrl61k25ik10cwkqkex7luelmwxgyk38ptl45fdlapm9gj1zuuf2c2jcifsmnswmfkt94xnirjhwcpuy8iawz7hxoa5irzxvwv6uvbggdqyjoi88vtxlm5l5hz6sxzm2uuacsww77tx7xk8nn25gt6bk1he',
                responsibleUserAccountName: 'coscmjbwf7u7nd065nxf',
                lastChangeUserAccount: 'l6u777zpwx65g37neexp',
                lastChangedAt: '2020-07-21 19:50:01',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'jv0igxti22qs0y5u1kbytk8djoq7hr6rjbsh4u2tx0uj6osvspntsruot8g4y3m0g06dgyo9nqn6xkd4lb6ezwglcuag69hytmx9vrzlvlid2pqv2vkfxgr6j32simkqkopf3kg1gjai7r1s9d35dllifm61eao7',
                component: 'sq09ri2rx5nscu1qpq6pdi9sq4hkb9cb9jz1y15n8aw0uma88rhn1y39wbcv3u3phfjgotns8b7p9i2l8dwhaj75fqoy3o0p1nw7zmxiryiy3buvax9bbpolq4y5402w0m35lbcp41vizz0dj089juq3fz1pssip',
                name: 'zaupl24u9ppq1o24xnxffe7bk3kw4oh6mbgaf9ekbblrp1qssng0r14se5wewzql4jaqrm195oxw0ar7oa0eweww6zrvemscss22oc5morgcuixnoc3ftsgzq7pdwogcqsnzb4v3370ngkwukfpbzydfph8ooz8o',
                flowParty: 'pp47f40zayuz6qx6t7ezxlj9jh4cxwwjfaycw2nvaqshh7ce05dzqsu7jd4vs2z5nmfoqo8qalirqryg0a61wea4szvaougr1du71ncxb30iq4x78raw0ue5bbsztunp68p9yvobw0jusezngxdh8v6xjilo39kc',
                flowComponent: 'aii5m5v8zloqje7lhofhj3rat7yfxufilqc3kci1gfrw9o1zc8jf4ol7cn97h986280s3z4xvgwx3c4g44fjeuue6xfxswfiaxkj7vfp5b7mnjdhwxzwszg47i6nnlj8dtnrpavpi26jj9ie4pfsl2vv9vp3mskh',
                flowInterfaceName: 'qwuiwtzhj0p2uxxxlpncgmy9f3yyry5t0zejtvw1dcelqadkstrsdt6dlf3t5k749x9yw1v43apxtgoy0heu87uijppgt4vlq2vt4ds15orbtda65iyrmpzujcycl679rk5fnepqjjggi4vrslompwof6013cum0',
                flowInterfaceNamespace: 'ccsx8p7357evdtuott5mi98jcn0ooa5jsz08va731k1vr64lqw4e5ormr9g7r8vcmh19azacpj4a4ksigzd1foxgjc98hkapojr7cwllyz4hlf48lszbr4d0b3rg7ax57cmcisrn2aotzcua5fvv1d6qn89h0nf8',
                adapterType: 'st7k7z2an2u5wde2elh3l52ge0gs70woshb8ki7mdggxvz39fucoksnen9xi',
                direction: 'SENDER',
                transportProtocol: 'tpm8nobdppzyqfi1nosw90bqg4i1e1hza4sk76nkfjs711xyvo63dttp019u',
                messageProtocol: 'oql7d74dw0hp34b43jwro4enlfmr9r8wu40790pltmkk94at3bsrg4ser1bt',
                adapterEngineName: '4w08o1ba0k8iis2hu3j3ppt9hxu5q0gnxpehl3gh1l5ty6l2cmwna352rybxkgzku3f1myvonk81a3coz4er9oiiveps2cqaffks6ucb93qk61ygr2tm47hhs5l34j2k6rnv4o13s5q2zszxfksa1yd2y42qnv5g',
                url: 'b7e7qifl0j682rfjzx6itwngmw68rliyfglwqivybfenwax0qnurinb8x6avkmfzcwjza0u4j3iwc8x9pc9ewo87iw0sw1ywnx5s66qwajqwxj0m4e8mfmko89chc6k3y24sj0ht8axl1j7t5t6jc4x4xrb0jzkree4833p3er3zfg7fbij0palsr93zpzrt8siw3n8ey7qfp5d927z4owomcp37h1did1v9raejw5wnf13in62ro4in8cvlhw0uxyp4auuiaezjgvkkmd63abedpebb3qmuu5vsxqus6jpda2jtdr11qdxa7pg3v3vh',
                username: '431cirqhs01b00pwvdi979egaw23k8gi8eypo4j1rvsixkwuthv39277ermh',
                remoteHost: '42yp7f7nledd2j012uwjbnr3q7riq9urnoo1ylxkxvxkqjaay20qau1rwjxlxhnex3dffprr053sljlj3b4kjsanq6li6usaccmahxz4xc91gps8lewtbkxkmwkfxwklznm11ff46qthmdx11j8jtk10gdcol9ji',
                remotePort: 2835600999,
                directory: 'moc5aycp5xpkt9sqb0no3qjagm7n7jol9h5r2gonkvi21jagbxq7fnyargdd48mum25a0n86egqdb48vt60pbzb4mo634jo0jatvkw2xn0schy0yw2yn7pxjxi90eodpgfy9hjozq61800xe548u5niq8egttv332zyifc292dwkkplib459i588lfv3gzheses9fj7i50wavw444qypgt9nv3zhuyixipw3na82zx87sb56jpnickaac7tl30hxgp0spaicm2a97wdcky7ny1hewi5ag3a2egy26k2kkga9fz6fwkfvhu5mlro1pg3888fqbyt0mjncz4x0fo8zjrvutwbvks59229d9z61ky4xciku41f6eu78s2zsujvinhcsg376fz5xjsrf2gryyshblen83tdk87t0yjtaevp4pzn5sqmqx4vx1y8rjo5azvd1uba2yv9us5nt0p4yipf19egfnq89o6wob0h6zvg70hp1ntosvo6zwdi4wi71kzxrjfqs0tf0w5f9k21erga8z5pcuz14dso2jakssj7p7npkpmpmsl4nr0zzfyyw33001bcg1n4t57k458e86cp8ssrjkvropv5gb7kcczwhuhwzlcmnbwa2aybb9umd6hlxiwt2eovfuwz70a7ifn5u7lpl4fyqf2zttskdhyo94pwbikclk79q8enavzj3la96zexfle496z9r0gez52fwhf3abf0qwg0vapyp9qgtp4042ifdacd7nzjyoyjk1nycsztecntnnr6cwc10yu0i4iv4twjxqs87ia3dwyfd0kr2fpc3wgoykvbmhua7au6h76op5smal1n1bei4eg70n9rna4b36zja70766ykfv07idm13mqyxnv3mpezfxltez0j09itywtzhqi7dt2mt4g0syqkltt6kdxkod1vimfqofo2xxj6yvqv02yr0ldlnewxufuxtbzpby62zdpbqvlla75jiyov4rgt15nz9jrbri2rav3iyaf1p0po9',
                fileSchema: 'pa2xdtqgxvo1qz90oa6vik9ul8zdhvx0lvzs3h2h0141lnwth0w7vp0rjbfwe8y3zc41x9tecu3twig79haugwi8lnrv8qux20j7byigc6mvwe9fypeq0ghbcgy63dzig1ox6bvu3cdrnupp47bzxf4tzdfwrxjshggm49dtp8g2ffhqdkv0wzakjyob0kh9qcpa1b9901bi1n16mmgxwf1xw5ymbhsa4h2znbvntypyyubthlj3u5bvyxhdm71b7rzglubwjm9fbtawkb7cskiurbe1ptysohh3ik81c7cop97rppn1ckgrogf4xveqmgm320v9acean6vdf8qkl4stnfhpghss3mu30g58hdk2x1oq68l34g362maroor7cbb05sfajo01lhxnelf4gewx5iv2x8wpwqsnj80bbclhvx33owbba3kpl2nk6v9wuduc7ur0j71yd95k5j1pmwzkwflhcykbi2wqmdag7m6g918bteke0sjer7aj1xq4o73z5hfo1nfjzo5i4v34nwxpdh60vzh8vlpthkbyop9vtv2n03wbiob08799eqi0zkpt8r4lk7o91zfycpac82b8t3vwm9fcz7o8e72wrp5og84v38esc4wqkco4o876fed0sero0wdherfnk9lejykuo9fm3ptamddz2km5fle3rgsnfnvajppiuc1i2cgs7xojr0q98085zutolhl12fh5xzk05cemxxaqpqme892l4pphpkvdjawx6sdficma1tpv5jytqntg4v68dzzezhpo5f59w3wfrkdooiumjbjz2wnjgjvocak456i3c94n75ktrz5ht2rvh3ojmqpouw14cvvaijoq513ejqqgrcanz0merepdxvzth6r7msjubg61j6ai8qn1ewsmkmly00jbofifsx0jaecqewys74v1uqtlvhxuerwvr2ea97r3v8oqj3z0tbcpx2snkesprjcdmovtccgbjn4lken3w0g912p9loua0hwkdrvnh9bx',
                proxyHost: 'jhgspwwh7srxe04qce8zfy18shajti8bua7zt9t2h3995xxci6lk6c189n0v',
                proxyPort: 1360640696,
                destination: 'bckle97i0ewdtvn8pjexv5apxszscqktiyvv9fjwy2rpvdff971q1lgjfvztf7ja5b83yc0c72wwoa60ciq0sbrlhrfknsezd9tze4pu1hh3eo2s82hilze8h8ugyi25cf0qvxw084ajow17616az5ywga9ncegr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dqrwl2dlrn9504x03ekhbcykidlg30z003g9n32nxom4kfkq9qmraleuxapzm98nlb0v38vu2aswq7d3tcy63hu665jh817q04s7jjvdkp49ocd84qg9r0t91nkurjdm3sfwqjnswxp1e7tf7bhyk3ssho2kcwyj',
                responsibleUserAccountName: '0avfbt0vp70lh86rvmbbn',
                lastChangeUserAccount: 'ctn13768ev3ppxt8actj',
                lastChangedAt: '2020-07-21 14:05:22',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'qmai4a2c8frfun5qrgt4hbem6oyerbiilndq1ft2lkf2p0vdjasl1luqiuskn8y6t3n7welrbdxjx0sheinfh8ntohnd7lyba4nux817m0m58n4eq0dqwpnidwbrnfpq24jbwr4fux5x8ehn50znk2fzhyih452t',
                component: '5c7x21cpg3cwjonthfl75x3y7d35y4spmih73ji7v2ybktjv0pj2hw98tkhy35ro3wh7vnbgohv92rbwggjq8id2egmbt50lob3ds7ywr8ygunafreujs254uj8lmviumetwwwq7id3i6a6lwyzbvieo9cjtp6fd',
                name: 'jef3bl4dukkhvsx4izu1armrqsxcob4foomudwjbfbysbcqjxv7p1dndfaxni42wndsafry8w6cuq1pen07b3fbj5w0yk68glrqamslfhj89d75002m3doabwqsat9cwneynzo5q5ctn3pf78pjh2b4oex026t2x',
                flowParty: 'kuyna3g79zvyfdbqs4wvwgwo02yb93dbi96zb0gev0ghcyl8cdddt1shq1a03fpyot5jkancricjt81ht5iw3nwu4b1zn7kdhtxi97xn2cmfgathb2n8ja32itj06oh227zv6cqv4ay8tx9h49188zp47w5g7ffr',
                flowComponent: 'rsakennhfilllsxr26m5cmyoloi7xl84bb1zw5ny594tkf1uwwbfh2j65rgrmw56j30ooxek3fi3jke9i0gdz7idimkuvi7zd1sfccimru1aconeuygwi1rihwr2radbi7v3ujimo38gldm2hg4xz0ktr1lzxftc',
                flowInterfaceName: 'p4y5xavg6j720if1j5npiu9lf01xjlgz9ym1r41mrh5qbhsyplh4xp628iu3bhuhwmg67c2lj7p9rr3b1i0n18azux6zwdpcz5dj3n0mun2yvghsg8s1wam4tx55etmatt9axwk1pk4hx9xchbm3q0asuyea6pih',
                flowInterfaceNamespace: 'nr1jsa90vuewbur39th4ndbu2igqhaobeetlsnflcb4vrplf8rn0xgks9v2o2usjpcis95dtv4t844ocigu2j0f9za6gdlsuxecsyvjs9u856pactk9i4nbl00ohg77qvz4bhtjyfpr68w7nctwuz3lm6ocidx3g',
                adapterType: 'rft9k9d55shk3cppxlgaz48swfeyo8eu871bpji3nmnqjh1y08qawrxbl8yt',
                direction: 'SENDER',
                transportProtocol: 'vg2xg9hwypblrj0zh7plyi498fb7zcqpwhuoedvpieemlfbpm74oyz4s5bz0',
                messageProtocol: '4lw9xrovz9o04sa8c7zpwif7m90gfmd9frxwavdj9dp07xyghaayfvq8ilv4',
                adapterEngineName: 'jf957mo4wwljrwq3kpmjbgb2z7ctb1l2peemlnmntjj71odtsajg4263yxt47cvgxd31gyzxbcgk2rnn2vx1cwf842j5548fjl0uz96pcb5p2lc8ndvaptweuwhu6msuv64qff3o8v98z0yxfqjoar1vdlmot906',
                url: 'ytlzrnloq91phqt4kjndrzmkwwa0g7l8hbouc8t24f9orgyf6qlfrulqwhzjbj5foe6wwxvqjzmh3tw6yxw1exk6sj8gbaidvgwsu0p0vl7ezeenxzf7ivj7jnazegyd65y3hpj52j889tkfnm2in9fvq54fxiabcrbkfm0jme1adipwpofkn849v3ewt5c96dx3r2szof9ji4x0kjbp6fkiaug9w2pcho7caldeon7898krjjwdaknniq9fj11l44ybv1kayhashmg43pi68t3s2a8u5jriejefb545jel5wzj0o79qg3nn1gj1udk4',
                username: 'c6eftuhybwg3prv3er1jujl3cade5xwjvxk7yqa47ftt013helpp1i9fo7pq',
                remoteHost: '4evxr4p276arpvwpdf2ljmj38ga9umzrfa0rf7k4fcx5k81vjq3jci5q9wam3am9lyzuhne3ecg78l3k9zn5dlm04zqjam25ar9pn4l582jgexf7dgrc4tess2uanq1tqt0ai7tx8se85gbphcayowguc2i0zhl4',
                remotePort: 4599706884,
                directory: 'tfqpestzf37595siog09bpdny67w0q42bjtjjdzs21qp5re5hgsupvhtdjvu1uhacbd86th0d65xisg15h6pofa1b5e1oorreu7o5acu1v6gauhehj7cz6160nvvyxd5d51ts12ia7ko96j6avnmaomkmt9nve1igyub037p9ezr2l2sshqlok85ybgq8rmwps741b2ik82z6v01rq044693lp04z6lkf6oympkxykm75elh0wgxeuic7gk4941td42ezxgjakooz2w7gz0tytp8ze8qby7jdq885nm71mqdr5nagouhg3p620lgstf4a56lk8j91ez2aj1qzx19y1am74n8bdv980trx8pnndmqhb2y125qwgx92yrigr0kuhjajo6liad2plfyag8gn42arxc1ad9a9likn5y0cyk9qodmmoy7chf9vpm7ne4tdv8hth4buz63es80gdv6me9thanjgqyjqbkmvze2jnqgayy84awfxa9fwqbxh9zkmi76ytomsos50gk4j8crtgo9xxe24kajp3msdioua6f0pj51mpofrmq0nkvz21i9n2oh0i1li2zn2tb4kmkvlwf8jc1zhkvnwc9msazc9rjxq9ce9a85n4oae6bszity4a93r1ofi9enwt1nqjncj7nx69js5fp1kd4c19duzdjs0mp0ox9zihvh2u33jcj1imbhbt32xo1wrjy7owpf0ltffvte4oy5y6wj3ebjadhhzlfn4z7wconemqx3qxy5tx20720f3x9mpjqn3e4atb1kp3d9e1cwn7gqy5qim0xgrtf0hbuvubqhf24u2793yng2umgafnruxu28dyl79stlqau9ksxi4as96izhj7zcc9tehn7gpyum3fysh7i9zo85xy7ihokc2padlfra8s11b4yn9xqbd55e4rbcdeq93ilbn9leszy6m9uac2omatftlx2pkhdjb894sc907suktj8m7bzbm68gz1v4e6423kh6xuxge6n564i4jbdt',
                fileSchema: 'mzptpggkecuvkmgxinxiv42q6lzac79y4jwhqcnmwaq2k01mbo5es3h6fg7wvg4msywxjwwo3o7jdomsydmg5ercwat65xv87x09xzdtogcnqlqo6thtl3wwgsivwyryetre9pcf04v6n49tl2mfiqtzb99u5xno5ky0bidnd7qi3df9oatz1hqj2ej7jqr7jps7cl0qefyjhy08omz2dd8rfna0ipaz92o90uscne228244y8ivgvccyfykjhwq7ayzwa14p1rqlbnypgo8imx0xv8rvsi4ywcwjjzigd9a0k86nc4kfrreuaxo2o5f56zeblwxtjkjl20whfrmxh9smjplg3nu2kevf86v1fnl6q8oxrw0ps6t0bf1pew8geu9rge7a8i2u2jsj7omb70z110frxeotr4l3nce9fk5inx2qxjhz4fbeqdu6mhyrpvhc08yww62fpscpr6q08z5ueszo225c1j4bexkw7c1igxh4wlu1af1av5591ts8jx2g040ucvre6480pdb3qq288g2du3tdbsqpko2duz4465ae8sy97swi5n9i9rv197oa21xvd7gv4wp7ocpfxyztz0l613ws0kwsojscies617enntacuuti50qez8zo4d3h0xtmnd6s4zpcwyiftwc8vw7zepv876ujxzlr72ifr9wtxdrwdu75hd64g0dt8mda4c4s8mzsiaix610pvsktzgq5dgk3882gc4cvky3k9e2ei8zvqqoxkwa8a5jo4lqcvzge6w13tynqv4ic1c5m3e6rzhhcau4nr3se3wdbpjdxi81ht6d4e2j98aekhc6fsqmtfp4db1de89j9x9ty9lc7no9h1ftzpqhg3ke9517x008snhmt30twe6np7zw4ufdwekz3lns88xmd3auf94ztq0akyi9ewv6sfl0d9purmfw1edo8djgzj14ng9vdnzc4kzy124pbilzdk0c71zuv7oqguep0ssjyqxcle6yitegdyrykfvrlzgr',
                proxyHost: '6g49vyaq82ttc5m6ecl3dveuluzvwekmbgcf2nayl5mm4o3jd1c8ea9fhezj',
                proxyPort: 5604368331,
                destination: '6e327qev65ajr6z76edhx1u3ix4oico2f97flkeedva5ts0szgw91cna14fkovzpx7h0pbju5jq65l2398lv8ndy6fkfwso7sqjlokna2p8cti7sl5sip7x9qv5wezraif6624v28jzcp4m79wsapod5cqjfv9kr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'woaf78h9rkq98x1ij9ypo3wg335dcevd86u9b720525g8dowaw39sqyzkn7mzkismob4bhygck89hu9dgaeghk3y5u3mdm855amud40t0nl76tsni7a2os61gsfdqkm7r6an3h6vvf1c0e4tpu9gacru9149yojk',
                responsibleUserAccountName: 'dkcbiv8b79z2tudcyvis',
                lastChangeUserAccount: 'mi8tf4wqimyu9unap9mj7',
                lastChangedAt: '2020-07-21 03:22:16',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '5uyosy6vl63ecotv5x7s3yiv5zsxrcs9wkrm7pyiu2o6h4okpzf46scxo8ose8838igy83yl67bhl8csifo9f80d9g9h7dmbh77yvu8warqnwcpntauk5vyqjvb62hlo62wn6dzul5iikh3r78acv6mpx0maf4bf',
                component: '9n9ikamwnd2p5yccpks3o80d4918303ujq72x3x7atdzrrsacvp1ppkqmfxx8mjezbpw0rm2h5lc4dig0jgl0m6da643pn54u7cu20kp7n1wl3omw563ffbpyj1ygxm37rw3i1zlm7f54b7dk7c4femqs3c5rf2b',
                name: 't330thvcnzli7np6i2t9q237yk50g9r3tywtwhguhq7ztauwbxqd724hn6hwxppwxyldb4oq5gx0kcep8neky9buxw5nnfaixh1uejvnkqsqus9f7nz9ti0osuuoavazx2kghwpwdqd038rwsuamcij3ba8uk3ss',
                flowParty: 'vsd1r91zbf2x26lhk2cr85o6xffhhoztwrgk3xtqjah2vlqpcr4gklrf33a8xxvpihwvzw97tlk85ykiqtv22d17aro096eavoko7ulp7ghnc3h06gvech7v8qeensclfhwoxmk21l4xkq03bhdjk1e3ju9wp4x2',
                flowComponent: 'jbwcu66ggrwf1ktfc4o0a1ybm0v0y974ky4k733c5ft8565gclqw113bpa52ini6gu3trphug3v0tisikv0jnkfrqmx9ean2l762r9fogepyvf2ocj9itjtsppltn476d9rfblkb27hrmglh4gpe7oyejar8mzfl',
                flowInterfaceName: 'qphgj61zjtilzwjzy9adp6u1f53oifx7lkt73hzwemtojac3ogplrfnjt3n48fv9u00y5891hplh4dw0bayfboucpuy3uw3c2dcmdbw1zciyktqsj9b430iwx11n9oxdrawcx72o5fczpvt5maaw2cyctrs3q7v8',
                flowInterfaceNamespace: 'lqwdbk3gvx9nv0y5ii1vvb0xqir3cyg52wipy3ss4805zgdm57122ajkc713a38fh7b1m67is4p5nu5xhb2cgs6i4b1gxoqz7wdrhkyxz56vca6hww97l9f9w1s6ypcyy0te64j786ywwho2ohpssccam7l7yx15',
                adapterType: 'fm6e34k0gwuzzyw0l523jyakoyzlebgsheksr6ld17t90vunqa1ds7i6s8cn',
                direction: 'RECEIVER',
                transportProtocol: 'fquoqugxt9dzfri65tsyar47c86g3ltnf4isv7vtolf0mq3u01jpexkzx0vq',
                messageProtocol: '4bd420zxa6fg1cgpruxe4vcyrfvsz3ub47gue6mdjg3nrfq3ebnyxo1edqf2',
                adapterEngineName: 'zmehow80ct7h87oinifph0k3q9lyjybg3bvttjssbhkd3w7b8ljaqv6tgm2dvoqinr31o81xu8szy77qxj0rue0jixuo6qkvsiupu0lyliled1uzg3qyu0mtjr76ybdagajjbbxc2hbkbbok4wm999rzzahy2pcs',
                url: 'dvrnwt7lmn2s3zwkcc7iubt1sn2rfvzxo8fbohjfvn9uaw58ateqaez44jd5jup4kx0v0trw9edzsg0c3pqrqkwv3d2b4mh2at946u1uokcgjp1it9a1wd2ofjz41p59vnv4jstp7gh8rk42g0h3bue6s829fznv6m7s8y08ubyuvj9nx9e6juauhlfz2amdv5258y0xtykml632irvx752gbyn3a61aufz2c37vdn0gdnwum8z5xjdislnfrv580tvorksba8923cdyh2pa12xdny3d1g6vz8oswttqesiupzy8ejw0zcfuyezne8rj',
                username: 'ysomlg1cwo9nxgp9nkymbtc9d6b3hys2e71fg7wwdy66awu8cnx72x3cr7z6',
                remoteHost: 'a2akfs20ay4v7g2qqq8o5c5us9xaq7yzakpphrtqe73h7nnr6uxpk0ekiklrbm19tyhybhgjms1my7adbcmaa6lcjxcr0yhgmot5m4r8e0vo4l5ics3e3d4tnkgwe5ae8zjlbswajad1lnnfstm1so2bem7ivtsf',
                remotePort: -9,
                directory: 'ij7y2hllgj6bown3phd3nqr5uqebium19zrr4ag9b79dq1rcj6fqb6o5gg6wgmkh7dpncyzbtkrvuxt5h4z6j53z80fjxyqi6pm9pa5p8hbayz72od6kg7dcm67pxr427nuc7h9ijcjlewt9fcjfal7e8s0gqaqpzoe4zil3wn1nilb0aqpwiq48xr0lcsmp0ibp2cs9mn6splm4roi41s938eqr4tyvfhnvfr2934ofwyak4cq3yqhpdl6fbnwt8pr30dy3lzhd3nhku3hi9h1b0k2y5pdwqo23akwx3ffmlsfrrpvat5oldwnd6173o1swbzlx5s2mjd476kgip30bgbxwhmrvl44tr5wm3r6cblsoub82oosyeh7zea64g2etxwp2cgfomh0kiw1ps156juul5ofidtjnkbjup0ohbxotqfttporwyz9sx6hm264o8cja1xoj18mln72h5fu5gme8v5lkcyf8pcme8ofckpfgmhf3qzifdons0nqdfxse7k5b15igdrgpvc4q0m9ocijx5cuxcgy49wh9uam5h859t58rzout1vj9899fi0v45fq3qupdstjxupvockakfa5c3jp3t8o8xr96hbjccwzcq94uuwr2o76iqnymml118r8ntqsiu0mr3r54drxl73c2n2hryo9w5ybd1d5yj9uckrr1e8hniron2dad4xptxmcs29wcm1yc861e9uwmfdhkw2lq8tf82fak706cpmgn8xla5p1v886x5llrvr3vgrbghqsq9bkhvqwpq5ykhqmymyo2xy7508w7a4rzilagx5fitp0chf4rjkxktcwy3an6zxy48m2p0kpx7hu66zr3gmrm3jm859zg07yuj8ej2jn5ldxvbufouabpgsip9u4xdlsptgcho8clijw0hgu7twmtpj1ccydk0ptlkbph7smvu959iov5bclqhqezku2x7ketrznjs6pq2yhh1kblm2t1g9s9vdg3fo0djaxqoh7hn0d3dlobmlxl',
                fileSchema: 'nc1p56xlxkbe1n5wu6wtb9rjuqi8yni8xgesijx8ipyyzbpkxq70wm1p2os7cggvuv4905fi02aurtl3ic7jyy7vmt75lesuh6k7xk2jvwb6bbuu0c2t4dhuk5x402fg9fwg014ci97seqrdrdyuq03b8c9uzl8ts05r3wtn26nuen1c8p1vlp2zda5uusjhm9tycwui8ayzc598f200bzk09bh83wjod9xmzii5e2a4dr8wjb1v36bfm0xbwfrwv6o4479rtspjt3d2htzs02gb0m8ootma0jrf3fdit3olknglhcw4qjft00igstni0tadeufmmncqnobhnukzjonmngne78rzh6c8nsp8vhnz681vkmltel7it9fevm8vshb0ohh0hempkpizr4iig6uxix2b5y4gn7zlec7lfe4tqdl5w9jiwvw4o5nf4rguehv9bjsr7i08yqewbch4lfeqguwt7wcy03vh2pdvqqb6rg2w9i7rng0q1fxeydt86ztp56auca0par0ttoebh231tdfzcn0hzrrptlm7qwsph3ib0uyh3mhh2ctov398pri119vbmx3klovtz3so2uvm5fy6fd6aim5uls2jq79u8y5882spk9us6je5rl6rz5g3q8nqb89avf0dam0wywh8rgyau4plhfi36rpwtbt39hznmbr4rdvkxksrn9o87vub93pantwyzm00phrt5hin2vfhj19f0bz8a18f3bvtbz665bt4ky10yyiynajqz81uv1ml2kfj2oy58av38zotwjn9ufw7nnvzi6dn6grptckysx5fj0hwkprpq3c7piuyxv71imr0ey8c0rbe483of46yxhtms9fdd8ldcqzg2xh4wu9irdvlr2u6zdpeoxb9xs6by1yrf84fx3ui4umw0g1768b8vo8y33x45flrwuc4pv1wid0eh816h437ddphaalgjc13ze7m4efnh44iqyhzmmx5rgzd6z5dmwtbyp60xzlxsr77l8ewb7g1',
                proxyHost: 'wlnzm33f9l8ulqwnn00k3k838xyvon38yh76qomlm7kzq0731tfjgglq12vr',
                proxyPort: 7287346526,
                destination: '5mdnbtduke6i4rjjx966wp8n9vl3lmue3bhd3xfrv78444izlxjdgvkjxaad198w0lz5jc3uuoz063uda40ww9xrtllh567vw4wpflabc92o3ep9lg21126ctmauhsteebnyv0pv8rjutlcmijhsmp8w9z1eqvtn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1u7iwcsio10mkk5r9ws5tvznl9kaxeo1c2xc6yvskj6iz5z0wl8bbzb93ajhh3y226phpipabigg34h21xxdd35ftez3c7uv8kd6l33bcu2z4o0k0srjma4utfybt8kwyulx8fosdmlmwsyrnkdoombyxeb83ov0',
                responsibleUserAccountName: '2q9ib9t9uoiroelfueg0',
                lastChangeUserAccount: 'c8hslt1vmz87xicbbgcv',
                lastChangedAt: '2020-07-21 02:35:21',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '75ckzgm1uffk9v1x1vjf068lav5rga8vme7cq4k5dqg0r9r1b8tnqypr7ninyjy09h0t58fkfpy36osxil6sdjtpie1xf12fb5n6848cs6gtx5bfmes2el43lg97q0lgo6pg3wzpn2dp5salyatxt6dcobf44lyu',
                component: 'zupp93yst9fwe52hcjnnz1etwlwuxh805ybjyi14iatn682hww5xk2dq0nnn4i3wn2h8hvtxdo1amz9am1f9qxcoqz2ezvfs91t9j0q0ax198832znoxqcjhbs01238zuwo9emo0f0sq0rt2gf19wz0kt7bj6uu9',
                name: 'n74azrtaqpj32n81vc2l71daunjzixtor242dkat0ghv2ww3xwb9t2ghbxu6vf1qek1nf119pvnzpkm4gysvb8dfymy15e4r82w8rdkjb3smojmevchxfn7t8gukjauwk1qrp8dchww7glsrov0a2x3m2u297mad',
                flowParty: '2sx7xa7847uzoxyzz7fxhhit1nvflpkij7e8no8892g67kn7i9q4v0jja2n9rr2th8ovuzm8b6a2rl00w6sq0jpz7xviegfcze4lrqdzpqlytx57ja1p68qlazb0zeigy42ucv4zvr3l8vasd7xwgdysm5po3qs4',
                flowComponent: 'n1hcg2moy0t55wzqk4hxh2dcae06t7nr4f7679nk8s9ih4dim64waft4p12rtdfx7s3n0ge2d96del38m08fwdnw27z9jkx9w4cfdhr5056ymrdyrukq36jcfwn69lh65nfbx5scz34c105tuvma1ba8n05zf0ag',
                flowInterfaceName: 'h340527bpcx6pv7rzt3o71zl6uu7v2rbo9nw0ddiogx27mvf05c589k0kbptysgzvx8q4jocjsh64kzkyvp8dzyoqgys5e9l3j6828kq50uidjga3rf8qudamx8prurdr2503b51wxifpj407xrb7t0oabt3vn8a',
                flowInterfaceNamespace: 'oml1p5k9fvchm42p85mhav2zdormaa76c87dnyvx0y881zx40bi3yevofa9lr08azmixdbs4s7q8amgvyfq49f28mlp50i0wg4t72gbmardu4szzg0h8ej9h6hskikvm2o6geywu0j66izymau74qqmicwgikr86',
                adapterType: 'h1wgq6n08ce620fyowotutqut39n2ul1jh7ovw767qv0uqsgc4okxxpcnemd',
                direction: 'RECEIVER',
                transportProtocol: '662t7kr5wg5znkjuxm8s25r4c9rjtsqztkqz45kus26y85qesd76attsfpvf',
                messageProtocol: 'slwwj57yncazz8s45e488zgp7jbzpcci5shklx1bllp4ecd45rjqq0b5xmy4',
                adapterEngineName: '6hrshnr89u7txuk7mq7osy5ypul777x2c2c5wemdlu3oi5kddioqoddq5m46ane0p8r3qzdl94lt6d2gvnkvq562fdzlz7lsth7nwoy52e0gx1abqwkhv3h6avdehcwdxbwijvcczw3ncbpxztzyl6lor9h145rp',
                url: '53lrwh8von4koltssxy0wkfwu2dz45w7ik6f5xlle7cc0r3ym2er3ygsntg99w8kml0ee0cqv9g7cg35zc20blm8c99fylcpq6p9ils6j4bm65sbr9mg934z5bha6dft0ndenjerfkkw4tzzhedmnpfy2i674ohhiekpc926lu70oijr9ljx3m7u0on9iof0qhcul3q6je68i0lh987tvuseawbzowsriwep0rw5ow3sg20kia23zcll4mq1oeflfaqt2yt4nm2c8f15navrf7xje23lcbs1c88oa2yokvswvdzmd5l7n4w85sbx3007',
                username: 'v92fcdujiykyuh12s203esl0oqq07i0v2cc32vc48ipb0bhe26vjwqvog96d',
                remoteHost: 's487czzi7e3cybl3hwhp1q2n6zugqvoqho2bmoku6mv3zm8g32k6eo9jo1xgplvj21vrhkq9e73lunk42i96k82qypknufioe4shid1wogzjdasa5lwyxa9sye01fkd4ovw7p30bxklw7yv9x9doz895wtmlgg1r',
                remotePort: 4809090707,
                directory: 'yegdnyrc7zpn7uypbz96sbv4ko2883u9s30q8xfss7tgjcnpv1gu3w3a9zr4k5mz67vik468qvzemos5owui02ujgyn55sdbhxg4gzm71bjbq17dmgd978x476udg5yrx6femn0nglr0qastwr7mlwksqu339cc35ohjuqg85hwovunc2clr6u5rxt2nbkri6and50e0iwotdq1eqdkout8pi88fbhvntmsaz107cz03eox1tphpo71futuajimedrxaothd1jceyh6qd5qynchhqegjm3ue8piy7xtnmyzw5in1t218ok1d6sw7xzryy5i54gbgbv1z2lqx488d15gmagcx3m4iasmshb622p0omec8k751ze0bczw77ad68ihkyi496sifphyd72xzo0s86fskb3zxzffv6kzyqliko8txrl7z0jk7gs863ckmyirmcl0j0hpkhey3mbecufmhbo5r4b9z91yemlcoeadzd42008d8wnyev3045j5ajljlqoneieps3ma6xpuadkvhp81xx92bmjz2mue5v88swpzbuaclsyl6xz86fnbzda5o1j6rf4fiovc3u1a1pty6qrk6ew6cxsao2f8j3hcpemntdkagctbi9qbfmqffaph8u5np2tjbtgfo8wdzanjhuxbly3t7znmj80sq4ae5e69jkyrjw9m5doutewlngo9lx0w2y62l5eypr4hhu8hwlnzov0hwe8e53rquvhuwd7koi42131vhq081r4c9vcok39smf38yzai1ecp51803jcjbva546h5eohay7tst9me88soizs56zgjfv2s22i9uolmfguqsn776shib4bal4njwcgow09gqezdll24ufjf5u4urgdpfmur791o21cwlok1p6aau1anocaw9fuwiehxdi88jnc48hhz1mdc9ygudkuc3kt979bu0h1tab48vg2awv8yxlxm1dnr3x88h4i23fz8g7rpu6v8sumg7xvc2u9fxapw3y20108n8',
                fileSchema: '41lrgl4xs431lkxlp8cxmpxjtxqpcx54sebeaxrywgtmezfbvz1ejv4oy0gz2ma7747vwklqyqun7bo4cgbhtrkskp93m9mmiufnbstbnxs3b928o4dyatux3d4j4id1iwc3m4cecdmh62yqp2ps90gzfai60k1funnl328ppxpp5lb32u1a41c61l0ischtvlh7mlilx5u4yrq2m48o7rcm2vtn3bssa868saofzmkynbk6io0veqs6z0exbo40ehktkqkbxe6cegdteuapb88r8cjw5y1s7tc3zozdqylnduph9gpxi3xkg978bz6uc0nkru9hk70qweu06m3p2m00v5f66omsytsuvipu85u371qt5bcvn8qqs9btzd00g31z2cl7zegn7imicgcm4z8e4f2gy5n2lh6e6b5n3gkz098d98aqyjbb4qs2md5avshbqhlrfex8ynk7i8idfj0uiffhkqrgwxccnldtd65247lxk3rn1i2vh2bkcy0i9d3p0mawo1jwbs2j8ffi4y447bp3t4mmcpo31h8p0e7qws3nyuiit333vi9ayivv70657gztq5qphn3h2s29i58pce035l50338w9totss9ipukibg9r4gx7altffc7rvw4ekugoqr8s3cavpi9li4g9kejearsgjugxkv5z7y5b0a1v9sq832o61vkd07nuqldukgc2y24cu5b8dya13vho6d1ybkq5yim17uty45b9zzk7s3f10pbwfwdrdfwg6x6m9qrxlt1dhcg86j6cv5r2pj4kkpzqis2saq0g7tb5plrmq7grq21zyfj3jetlpf1zk8t1mkl1ire4y8jxj0v8q6ti056kqcrdod73lweb3mwntresyuhhxpvdaldm7rkj2i6li4m79lupgmxa5dg2mbi2wad3d49nsj00s2w060do4ky1rwibeypn5b0a7kr40reqx8qzjm2da55zvv0rl1gxtdl1b1ws8a31br8ycyjh370joasqidkssjxe',
                proxyHost: 'qdi5slq490sbicrf8xi0nplz1pqwmct51059ik8qmfi94j1k1490j5nyfnio',
                proxyPort: -9,
                destination: 'wp2vsy2kyxvapmnng9t824xx4hivz3vzljaflji3l3c1ykuu8puo791sjvbnacrtjgaezftfw54j2qbf2yl749lx6hvx2d739z9gjbabjf47pkdixdjkqi698wm1ye3z5osn5l3gx0h2cms9wde2duh8204tjj9u',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xxbt7cuxkox1td1o8ogengl4yxiz6wtk0ms7nmjmiigrd7pomltyvxr8wxux2p0uhq1kmi1fep2tx5cejiv2ihka6i6mz3gfqb6iq02eobh6xwr5t5fvnorxz1alyxnln9kq6vzqwj7wneogrfe4djv94ep4s35p',
                responsibleUserAccountName: 'ap43t1n4y0t5k4kh6sjg',
                lastChangeUserAccount: 'zom1gtr5aamu0w56kpz8',
                lastChangedAt: '2020-07-21 07:23:46',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'naw90ryty4rh0p5crgcwlab2efaa5ixdtbml7m1c3vpv84sqhzk2525t6kxbe99fyqm654h5iy03wqtnes75yagihue0scaxptl7ogr3cy6kvju3yhdwdxtjf6amj34bnyr8yrpjjgpooul6ulwv610dz5uilk3o',
                component: '8az0az5wrrlib82xa0c5zgrzr0i63fijrss3gcuxlwuhces18tvhrajtuy2ms7vy5qvibnndzngmykp3vzlmxknzvqlscqndgc2xghglna6alj7cgl12mpid7ymv0e43rzjm1d6izvc2wvrmfvct6mgznksgvhbu',
                name: 'gcn2bnas4f73eeav4cpau4lrfff2ijaxs39rhqzwdwbk28bumtqd9ugj4b8ja814l1nmsdz0l56dr9rov8vueavwm5kpiq162ykcpyej1p129u7yr6vnc3n1whqdvorh99emzw2zm7zcvl78ibd4tunc1ru7shor',
                flowParty: 'hw9ghp5g0u6jexa48g6xm2e0ozp7d5i50vv2lakylu77hqf37mz5j8i2i4zy8dhh34cyq6s0r54y1tgae75l7d2ek92p4y3dhose7dzw21v13owbloaugsysnhh8bvpw0rmbhi5hymb7e2zj27du6w7kcl5pab03',
                flowComponent: 'lami0tzt4rz9d2q688wjjo2j5ozqr88j8wiq9xrqklhjnsbh9tl253tv3rpmquyhz7tawysbhpaq872whbwbkltavz07ro932r5mecv9uei172p7wbstnkvj92ok0heovkne34jlohr3ba3fhbaca1j8igq59v50',
                flowInterfaceName: 'o9smmq2r3yevqfius9lgmeyfzmpticfuf1yd4t5t4rb0cttkjup14r1nerrjdyj7mbsvm1gaonpy5egi7nchmt6nc1fc6b4qpaz1s41kbafmx3pibp0g27j591nk76ulbt3mx486sakz48diono1slgwz46613z4',
                flowInterfaceNamespace: '28ahg8t3rfxt0fy49koemz7x7z557ba178sgax1uowiru627l5w0u33apyzpt5jqy3k2t18twenxb9n227kdyh8mcji1cgr0c3zxwm74haopj6zjrxx1gud2nfh26ari08zij5ctzamrl4gbqqnrokov4kh4omdt',
                adapterType: 'jn5mpyphxnj86r2viy3r7yv330rbyokdpxyyvopqxslqy4airdyoxhujt3u2',
                direction: 'XXXX',
                transportProtocol: '2t5tjnta6p13s6ssnxvou5fpixvj7v764vn08y76zx8gcn0gtjw777wm057u',
                messageProtocol: 'uk7e4hn6iqqb4gswuq57iu3f2l1n3mamwzztcgzr2js6hhwajngeust1pdsf',
                adapterEngineName: 'guv8u3kbo05gzc9gk9k3ljv2nnj8ye1w5zv2hxx7bxcxnjj88aa8qckdxvnl7hsq92qxlbsl7wcs6fncaad6zmlrd25ocevq43o6pm040zzrr6wx0whfgeekfdusy0vqdktrpyjfolvs7wo67yipi446vs6vme8e',
                url: 't79ahy4o03rmpu8oej0bnz9pmlhzpl37bplw69vs8fqaw72o56clzwiu23jsfxd0zfhoumcdb5k7zceqwgha01pqhvq1y0344vurvztzkzozcdk50uvoillaeh4pn175chd3k7swbkpf63fbwabl6nhu1k7tzz5rnxnk5ysvhi78cvilji0jndsx4z9ua3r40irqdwuey4mv9hq294lja9qqvylfkvs065tbt2di4jn726zz3r3j16wfii0rgudkhfef4n17b7stqg3vq7x7lmg8kxaggfk48krrdbs7ql1dn6hqrfmimxfmo7u042qu',
                username: 'trhrg4vomwpackzxbrqkpup0umpryagfrb0hempi85dmuyrx47f9h714wef4',
                remoteHost: 'bgtqyvithgufvxcexs6694mblwtno5a0qxrozs7h2ez8yz1wld2ktjrerpqrtyuaj2wg61eo1vpp5btep9ej52t95wd5tij0xecmvnymm86twv065jsdwz6qieyo847ybxw3ruefr7bqxpqblcd34svd4ofk5sh8',
                remotePort: 3779129039,
                directory: 'nyhgshuzr8qt1jtkq76s4ug4rr5ivmds5vgo7hz56a4h870xl17hf8sorg44yx5va3h2dusxiqlcopgga4nlqgxrf8lpypdoxm8vsm80d3agjanums8lcbqptaic5n9gwtme5fwljb7hcw1048gs2x347he92n0rjh8mh5tmsupn254x4zo5n8uh1785yp888ahhb844wi0yss31t38m2x40a4o54a9m1851dnt7bk5yrrs77wrtn5rngo8l7cpfxvanh79ylgl5npkazchtnhbeum1h30zfvq3c88r03u370ixl3w6eo2qp098ni08scf3r3o8q8niv5qm7m9eboutqcwqd12ehjkpwv1n3qktf0r9skrjn694kui7moe9w6tmjss3fzzrqevopcosjb1jsemnllw3erm7khvwujb7iialxnm06nqo81rg77r9kktrx8ancrmtrgev5jctnipjwhk3w9dolcns5xkq2k0hpsfduasp6ujhpup54wjmn0bn1rrf7an03i4mbgq8wga4o5i0opitm645olbmwkuk8dzzgur5wd3vox3b0wkr37olms6mzhlrhwafgj5vzweuos3xrxjj1rjfssvxnw89isy8meontlpzs7cnfvq0w3wecx51ggwsesztlj7amkkj7vo4e1hyfbvncu2hqn0vkjuxhx8itp3aqd4z4ix65isohvywn6e80xkjvkpmnp4sjdylmufn7idorm2gj3gas3bvdz0f3mw01jbzwriis0miq43yvlss3z2bgqf0fro6d4g7vy92vqvmojxol9hw9yo1p279shrxc84eiglqrouhu3e2bikovrz3of39zuoahnm9dpfebvxt9iru8pgx572551gc6kdf5izkmnijhtrazgwm72iky8rtj1aubixoxuanttwsguwbtm09f35fo9hzuxh54tsgqjpqd4cax5x3xynxomdsmv333rtdewcv9138tkvsbq2qj3mgzi34rs4vcdxuofhrfkj502a4j',
                fileSchema: '1x5jf95xu2md90uctp2y9bm6e48nqceuh6ort48s2f2kvazdban6ho5tm5kcd9ab9n6ac7kbt32pbqncm6jtb6rrb7toth1luf1wpurj5hbget3qk10e6z6r5howyz621pxmrkqg6iazjtkx25ck56u7z9us7qm0nyo7rmums6q7a7xkn8ciijvs1a682x3n920aslplwm9622gj0gbpjznbmqjlqwby8wmfvzwyn5f33cx23k1qold1qtmf07hnzccul9rqci8ecvkugmk14zr66w5vcuiqjwccmpiwe8xwx6eco7iprgysf8vxtl4g9ksmgesom74fcqo53ejprxz2dha5q4g3o1sl546nzwuuiwt8ugr4peti73fcsuyt2j6uwbr7lbi68lxq8ka3zth92d0ytrau1wt2yxfa91qt4oryfuw8tehyn4doyynd5vs7j21q7kq1je0lbsgdw0p36awhde174uqgulyvi39g33bztzliloilwn84n7dty447ck91b3fv3n3rlptv8yw0oppjic7lckj7w9aoa979mj0b7xvdixekfpwy9likjbl0uw3hsy6nrhn64erb85dxsk4v44q0fq4ky7y512xbtx7etrmh46qhtabzddp3770fbuoz0x2zcgirpr32rqu17ejfii6rthw27adlzxr9ocr958s3z9hw68a55ivffz7zo0tsxsr7wz61ny3vqr4u36ebjhzlze9v4w3z4vx67yfsxdbnoosb11g3ix0muf9ivxaddh7631w2mzb80v7wmaqgpmrgz49rco8400nrj1ktrvgga2drnasc0sxt10zzlwgiotywk43u32ardb06x0m8s0kfbs0h1megq7usn8xkymtrjfw5v9680x4iumxe30u14onva2tmj3ffytz0h0h8s0m3ob07i2ahucnvrpj8jmpbtyy1ah8wgtry8u74y7fqguvcpak1tahqra35cxvx2yyi01narkwm3fqnf6j6hs46iwsdveqsyz1f',
                proxyHost: 'jrxnkgteft0hy8fx3g0upvy04qe6uhdf127ngh6wwwp1jbzjyhb7ml5o2x2l',
                proxyPort: 2006425619,
                destination: 'i9kr89xjpd0bnpcco61rxo6e82x5amynwllo120zy2zy7x3hn7wyeypge4ycga6hyyn6kaq993dwma5b6mkgvaqf3jv5hplvaqp96htlq6qrpl3sa0hb8rsvgtwp9v28pqyl3h7re01n83h8ivkqzw3j6h1kdexy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7eaw4ekf10ai1s61vnudxsenndye7wuoqkcjmwy8y7cmy0f5lny29mf8ge8bygxnmwi4srlziy66lscg6bn82qlqfo9rszmvyhybbkdx31y1f3yzyxipz4j8bp2ddd4u9epgnpgzgeskfogzm59jw2ox3y4ztswa',
                responsibleUserAccountName: 'j1dgrmlr54qreoshspkv',
                lastChangeUserAccount: '68ck1if9ryr2vu7g61d2',
                lastChangedAt: '2020-07-21 01:10:46',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'odedyey2r1kmi6s6djvacnlr5iv3cerhbge4o63g3pb3kzfy6e61vy17zs0ds89ocg6vn0l573lgti5qmq0mrx8y1v3yvvsxwvuxzb3zi9tkg5grxj7afzulxvx4n6n5sho7hkcciaros1vaceuuk1ut2h56z5qg',
                component: 'ghcl3jsux9yskem233fodxxcsi9kgtsnmz2vpf93pl3esfhdw9g6xk7egmlk9xnhj48cyitxip3q58x0tt1yuan8u2jyqh15o513bmibej0x6n9vus5k8qspvz7jr08z5nyssablnbvcynnhy21xbbqa3fqmtpsu',
                name: 'x2ensldy7pww9ll49bhtldvei5cz0oxdxw71z3yd7myc6yz318yyv0qplav4xkr6mw2jom10ppt83821t1qga4pmqspyflkjbi90pgeiehv6lkyfovtve1x93z5r6nefxa0jql4g4jwuimsb2e0ionnw1arqjmua',
                flowParty: 'pfclnazmwtnw7gl3772ghivg6u0340711ppawm4lk3rn22qhdgtso0o333m677zj739nwnb4jzcz9kx0mt9lra1tji3jtgyt07wwwfbxjzez4o11nocdjjp19m911dtrwfan93ni1rcpqdwhdgliw0fdta3ie0cv',
                flowComponent: 'xlhc4hg08n2dggbf9bvoekg1saygat0b16aosvuim218uhn17y39y94h5ik31njb6iwlepsew5m55ytxy7uqdp3iqmf7du6ke5mid29bozdec9q70qr5q7qpb3i7kgnhluhd1efuru00dv16ynfp1irnt0kh61ki',
                flowInterfaceName: 'pv22n63q986furwon9y2uuh7u0apel8d0pjlfvblnrhtlx2kpwia5ilndca7m9q7dh1b24xu2cr2iipyswzytt8zzsavqpbzqugsn0u1ux1nzltaa9adq4m2jqwaa3f9pnzj3uujekimqb4j1yxvl764zhqs1xp4',
                flowInterfaceNamespace: '08auagjcnnvk2i8uk5rdl1no94en3pxxfs9gro3np5d2nyyyzc6ruxfemlnbrzqpud4eed3z029yo4xb09jj00d9ffdyccw0bgn9h7emxbzi5rcnku084vewk4r84e3m9g3fasc8oj48tajhm24lizur6twyhqvz',
                adapterType: 'wmav6nrj8kqar8rg2irmk7mz6a6mfht1f78ej7r6lgfvc5e71b26jt7mw7kb',
                direction: 'RECEIVER',
                transportProtocol: 'qcwifrw6dnv8ox80oy4e1gx3l03btm43nchp4c0f617zmtn9cet5vxx38vs2',
                messageProtocol: 'ujcfncy98xbak158azh5s8edj8drh3f9v8ipicydgproui5u4dgjyuvf34og',
                adapterEngineName: 'ja1q4y2slb76mjvnwpxk6eqkgezkveihlplyc30flflsvyd9p0gc7gngt40crlskz2wajttt2yqltc155uuq7rkhqcayz84wprz3rj4ebbo5imefbba2ktaivtstqneex9x2rbwm6vu5tw5t2pynxbp70fd7s09b',
                url: 'fbtn7oz07rfu2rapujrehq0rdvi8asusj7xl6jeds8366db4vprtafdv6volqvcbbc7p2mqmitszehietu2t9kxw5fma9ytykyn4gjj6pwcxfm49bte63aghxnkhjb14mutxszkfor54in4np619eh0igsczack8x2qb9857tia47mkg0q169tpgqmyk3kkawgz5957luu0n0e55ivukr8a5ird2kfszdeau9mo3z7eiv3rgwwnptgjqhl567246hth98hgh8ita7lrpqr6v8sd9wx7mklv90dktwazdgcx72g780zeh0iw89ib30xtq',
                username: '9unl3pwmlw0ztii5wnupns3fzwdc7cvfbsppzq07dm1k4utgl9isk6y1205d',
                remoteHost: 'dtrfwsnbqa0qudz1850pnowza8ijbnciidjjzr93bbmiydj82cyyx17xx0l46b17856wohlf5xpi8x7906fp0zggius9fzchtwmgmmhdt6wlov43nbmzgl58ysc3a5244bnlrhglfp5kni543daxue2px0ion14u',
                remotePort: 8653765835,
                directory: 'bzzlcb20jx6eg7f7avyfmuhhshlr1aoma2ip7sx78mxxon29uc0z13yxjalizwyylytsdjjb0ga70d8kfwroe5t1ovtrzy0g8p37c0uwbebddln5as4w6h2z1ddpx8b8rrfhrwq4zf4dim5zfabhdqhr2hwofxu2ntnq6u60yg6jg6oprzseyn3tspe7v5mjjahak5h3ogg7ora627zbnlr9d25kel5gn5pc3w7w7f3tajhxdz2e0jk30zkvw0mqmhy267fkeoauf8zad6vyeivqivalm1aeg67v0vx2mrkopi60bec9sjgxh6y2ievdk4zlux2h3a7y4cg0xz71wawu3t8dxfnm0d3nzjkigwvuzksxx05cibdml1dacmmob4gzfletnlyj8mrnoe0ue4evw2thp4x0s5lxpckt5sx1p999tbjp7xzxioio4hpsvu2c4dyvrztest3ib9tkjft7k80aa73rdmw8v0oy15bo219qxgam3wxfg9af6zg8stpign5hr94nf07v677ili38mcx1hzf8e64vtp3we7scfq03arqhwhxyu6kw55cx7fbui3ne9xlq7zvneeftfjzioog0mmxyj1pzkuhc7myymmmpsrxnihxoxlbwgphr6sxkktyjvpzki6w41lcc00cbm2ta206im4xgtgu7mlw333x5m823a8io1w1l95alitxcbfs8xlnhdcvky6yn5yp42tvpl1ptg64mk6hs5juqky2fbrodbf2zjotxgwcrdftsrhegor9bb7bqhyr63p7ksm7erlzd8ik4heui42iis782zk8ld6p031e7ausjnnkbyhiq2gkrnx6wv3jh0mm40ioqkjvaa4g9reqykjf39xen2klt428ckn07qys4fspkgrxrg6ka802yrxlttd3b0rvftzy3b98ejjix2tcplvhdlxt5eyb8b95bm4m15d4bsfcbsbaj2vp1014d674givto8mv2cw2q8en5lsesl2insswf7mibq1qin29f',
                fileSchema: '02bywqtt0kckzfz24goanoyot5mpud80bbu2v8h4i0lsix7ad9k7zcu2br76qltzbcyv8k4a16k6u02tm027fwzp1gdhwyoem8jmssri5jlqlel9uzcr9z4mhtjid3i7g6muoa5fqt7v5g51zhctk4h7xfr1e6djmz7butqqm0v2bxzquueiso6bdwmce2hvtyueehb6e5fu4g4ut5t0xivrqz0j9nprftt5pqgzbq28588p9ix4impmjvtqoegdlkg6onygn25h8sv7xn4d72a028yuzx9607d8wduempwupp1rxear280lwm6ntdcqd24nzyyd7obyttcp64cb1eyk7f679j2h6jnx6e1yggasjjufpqtxuuae8v8yty04m1uv0bbft38auyqhfqpq68hy3jgmy6v84554x9rmisdynfjmbkr824x8tkxeygdeg2e8recbrdi7bh8f7ke3jjz19bn39nbyphng7jzak5osm1gu6tmk46m2i9v38z0mq86dmzlg0gbk3fo36wyw3kfl51thfdrt7wjp81nvgyvzzn87ms5q2iuoqvdjg7nnihyt0yxngz9e19wi73yem2hzkqb54i2gevxbnnofdu4y9swfipwgz2613lgobk8a8u514okl0jcgdflirjq6htpskzt7ffmhlv5dlfb085bqaiir7f86tt9117xwrzixcq2abilb0os9kcy22tncpzlrlg7icv9nukgaec7q49552f6jk3t4xe64mqjw6s8xju54q25xacbsgbodh6wlshkwzas7wwax1xb2tktmnc84rwec58p2byhe78mz601a4y00vt5np7gazzi83b2rnw35aaqjdk290yilgezwx0mrzxwql4oeiol8vf2rqrv2wbkuwrqktpxdu7tqo0ixv1emy31irkewams3yn4jbw8p3zlf9470y4kdvvtqbess45c6g6c80jo45hyifh4qeew4sbyqg10upl1yg2dsx6h694rmmycqz7qsnm21flxb',
                proxyHost: 'pwihy5quhcpan8xcv9kmya0oq4uo79hholf8fwnk9gk5nub8e1k93y7s7vty',
                proxyPort: 3984137911,
                destination: 'rm87zcr6pc8y2821xd3b8lsju9vy80zd8yybnbuf8tmfi7bnw4kj381dk1c9a9xq3beoegyobxd9jtacsc4k7x3n3qg3k4941yfk85xx968gihyofwaydp8kuipo0k6hyznpj111iendsixxa3gr9chb51rsp7yg',
                adapterStatus: 'XXXX',
                softwareComponentName: 'r86fqwj8ql4sbrc3bdv4reptlej68424kqz90tep4poapvzy96vdd4lo59gcdt29yt4l89qwcqd0r39v1yqitpttrfdfyx8mn704tgocmmb1smxwva0fw912u1lxsqim89gjnzom9x5seuukb8gt914kks6daog9',
                responsibleUserAccountName: 'nisty6m15rehk9epkq72',
                lastChangeUserAccount: 'fkl4uoqupx76l5tlcm5k',
                lastChangedAt: '2020-07-21 05:42:22',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: '5bvz7fqtx9rg52bsruizrozqrbjqxqhg80wwy9m616ueqw8agzb5u4wydiq8c0yedxptl98fyfurj2370m5clay7vcc0ivum9jorktgmfcifv3pp22ms9pm8a8cr609jpjh4geuxo9i8w50ietnxucluwrao47wd',
                component: '1sys1gfrt1ctkucw96weq1sxi8qkf2vxzq502h9ti3yb3c0dobyoaobtwepmofc54nns8p01p6ewtr5x8yes5q69ozotqpbs6pmbpw80jr88sboi1k8k72pzyvc800lsd7apq92c5u6vdmkrh4op1alzhe7wohbm',
                name: 'sl6ghrqw5q6r4d7l8oqxzvu7glc33st449ocqnyeuv1sccxtnccwivwmuc7jfpex4wmgxfnj318su9exr0823osz0z1c4bsms4481tyymnm1zm5pbpdypvy2mn9dwt4ygyvmphm4hxrhv0yorzof6pvw1qhr1fs8',
                flowParty: 'hs7piytj4cc02k7kaqpe0ra9ah3d6q9puozv91r64o1bgw9mg3bp7myof8zs47rignqs49cidj561j11ly46k2ujy40tq23s19xi359kuyhos48m1qo7xziuc04flgfc6374ma0usfif6vhbajvo5wr15tuh0uae',
                flowComponent: 'a6jx7z0wya0e0wbvvt0vhr1fk4jtq89a9k3tlmyv8tv89yt5ei0npfqduob3kx4yel5ubqidzrl3lroqqmfbnky71i6o6l517rw3akkicnjxs1imdc8ppojyree14pgkltxtxls8c5uf7x3r7iteq2nwo0jz3cqf',
                flowInterfaceName: '9qjahrx5l1wdshu7ww19jtmb2e8yvioewkosrranx05nym1c6e3lhs4aq3w1rp6zgfey57sftcng6kaixs9xqlugp52992mnabqsek1otc4g7bf82xr3gmifankws5o8pyudi76u9sz01g2ershhslqvvrpxyamz',
                flowInterfaceNamespace: 'jx8tzwu2x0zadqx9e6374tktsj5f3qcdi3g4ctbyb1m6hc3eywvyczlv7vk9kx6cc3fqpomb7bx2acjejim912rjam2uwv9qy48jxi017b1vywesyt9g6v63us0eruqo3otnmzkkdezvbftxcnliu9mdrt1z4tl8',
                adapterType: '56llnmqjw43qi6sairz6qpr5p5vbylmwx9kj317h1y2d1inwdvfy6tkp3a28',
                direction: 'RECEIVER',
                transportProtocol: 'mv430le1wx9r0unhysmfxrf32phw3ok73t0g44jvhh8gsqj18i2ifxjkicls',
                messageProtocol: 'oimy933nb5fkyz2kj4p1kja7coxnc8i5qcr1e7twoed5chh28apmkst2qmkk',
                adapterEngineName: 'f44enwupt94evxeu0jomvww1tx0nq45fqur6aopj3ilok4uof3iggbccpimj5uf068tb1mo3bq3duxpzx5a9nzuobioxrgawzhs8q6b0k4ulgkdpntandkp6mt8kveyue6ebjiciw5f3bh1ow10fbk28qzb94h50',
                url: 'sd3qt8rimmie0xvb2g7xp5002u3sciqlyq8v09pn9vkzx097mevpppu5z884723dr5c6t0tuhe78hyeuatkdypoybk31m5gl2zd3a8bc1srixmeuujhpsbh7givl2czhz26b336awr7ig3slijehqopumrsbaad7ipedua4pmq10js7pd6tymj0hn1dplqevi1t1pl45pebaogb7w8nors8igknh9gi7rhkg7093gsg6gxnl2u8mdxd530vp2n3514jeb7zut4tngvm8cx0miescs2841q6jfl12ub3ucmwa7ef9hk81fp2tz414ny9j',
                username: '5jfq0bybi6vuj9kjjl2djrn4yiddyjuivv3rkinuxtpehoe3x8mi579fvibi',
                remoteHost: 'gyec1ujmgne82rk8d25rt6kr4bk5mwu4jnw0jywqoe1dnkd6bc0vbekm3sxenv0fxz3q84dqjse4je28bmcm337fs2epdudi9gmhhfnx05yqgs27pjxix6tq1sjdobj0sb86sofs7ooy5cm9v3icwm1766zkzzai',
                remotePort: 8787040791,
                directory: 'bi3j2732sk2xkzrs5eiquecaul9o8ddrwbezoq9ga5eqogv5gmvbtmqpxf79g6oml29q0jo65388n0l0r783ebahvinvryuqtxtete4m71liwlzrx046gwzxfwdsl0dznumxt5zr8l6uj3ihbpfw5xznyfkkvea7qkthtrlatagd99dnd1mumpee8e87edp4vxdwwq9ovgxubmmt9zgm3nq33fc9bq2ksp0y4xyk0id3ontwikvaguezbjrbpwb7e7ij82q9abij177pg8g30qeepi72vkivo6ljyyfdnoul6nuid78kscyouxu6yqo8r6lpqa7ltip8um6uux7hkzze5k8k3cja3jekpd45b8k700icafjv8mwgrtrufvqd0p4brw81apxb0dmp3wy9examfj80gj4cfh61pv83lci858s82d7efn4avnotsrye8fbdil3x5sh5pu12q4fxqyxaz4r8772sjhipljstpewx4tsgd606q73r7icskdmjjix70jd6vpq5qp9t4duh0h9cjxfe70xghxaovhl3i75xidbfhshlclu86xdioe58z6zwtnpasi6itvjizwsl1nb99183z4tzg584dq3vghlj5xtwth8x6wpyt3xntcu2c87a6g5mckkqwxy0e1v87lgmgzdas5qyhf7iu30l54qkkigk5orngqzqh6nes1wlhdm1z9uhejyznqlhpmbrrlvfc0m3euv5qlt9ppgfohnpq7o3lgje548lzek2hacjoapgf805abnihq0mq1l6tg2v67fyj2gr8fpy5lfq07w3qa8g963gw5y0h0qwv1jrq5q35r4mdciaq2o59lhxzxzbjafty4u6javbckyyim3ibes9tgradj9eze892vku9t8pra4znzpa5a5n10fsl2trzg2re3ua48h2ebm6is228yujmyfcq1mw6uvid0tihie8rfrqc9zqlk9qh89pt4diawnhhn5cupn5ljd31e0pjrugc0fc8pltoksx1c52',
                fileSchema: 'dyl4i98vto3pnentvapcwr16tltrh5val86b8cq42b038o289vg2xd34i31sohbu0qfdtlu2elq1hbs8phzn5fzy6cq9c9brv65zhkczw0lp5jq63yj48opynmhdzg4gqkb7svzpr4bcxhu782xgmkkc2l8l7k1qyl5ug3rercrp7jt072wxv5scms3eord10uvtoedg2311zlubacnafcmil5kbfov24lsbmlqju9jqpwf2m9mfvh0me0kcwq7i1lwsnnucvxpcg7odkx862cnacs4zeneywysnun9i5w9ckiwc92ou741upxkd14js5oflq1cf0psxucgmp3fxzsm6wnhh7x114a8uemhkl2pya3cxo45ov8o4cmu1eesx66d312mjamwx6h8uehvgxerhloosoveendrnpbuovadvugsmcxgb142jvd6xxemxb7pcrn0wmo90s22dvrrfpogdbgync4kjynoc4coo250lcbagadkyl6y3g8yug476n5uxyfsadwk715sn4m5z33ld4bwmui6oe4y8amdkwnq8q5ifjfuw2cfao5l55n357xradkhjtsh9nk28ilslpwzchsb19myoj1u4tj4sq6ptx3y7fmqq7hjea3u7wc7ty8pe7lmz6zue9iczchqb7mh6n9ykffx2buz1xacl43narqqaqlugcmvj91sejiymbe6vij9juyga4y9okauls852kce5b7hgfsamac7fa6ajse2k0fkgt333faybbowx34wok8l9uccfvwbkr0bae65iu4e5vr0heqhxbwq8xf8j70iquk3i116sf6px4v994dyizlkxthn1r817zdcqq9ax3pfod2n7q1af96xhdyerfrr0lq87t4qc2pzhvsfqps6ba92j4kcrxohjal2d1tkatmrnt7v5ivod7ttue0zh0ul9bls7ui5fg450uybq8p5jtpxspgy7hao0hh8dso4woful02maodiymz8xae68adr68jdj6qmm16fqwptz',
                proxyHost: 'zgzcyc3pfk8df6k2uhxud3w1md6235gutzdqed0leolobn487d2icxygvbgb',
                proxyPort: 5524991803,
                destination: 'os2z1fcz266zcj7zl78bs0f8q05sf2l6ys7rgpn7i5np0lfd7kn00djldw8uxzj4ojy0vkdml6ugqenimzelg3x4zmnmkmr7r9xx49p41nip53kwwid5tq8ztom6hlni6jchjib90yu7j73755mvuexfsrnnetbv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '26qi0duwnz2lx23t6y9ic87xdtx9mg2rpcimilkbnv8qhzknw27a30f8le5aqwlvq06vc20ssyeo5yxjx7ik8tjttx6y1nkn0c0957ad4et6aebi9nym0scjmf3ok1caa5fjl5x0c03d8ebeqxe0jdth5mwy1vrg',
                responsibleUserAccountName: '0bkeethuno88rc8t9eb2',
                lastChangeUserAccount: 'uwze7l0uyafx1qd1j66s',
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
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'dezgc3xepuv0lu9oswxj44bguqc98wxeubh9wtk1yj78895lpprhvvj1vymiov2xrdxl8weeugqkambeoeqvbvew8d6b1n9rzeevjo4jyl6pt2wutasp0sdc4c6o2e4tr4w75u535xhulurobkyr90q38z8ofbvh',
                component: '515uwu9z770vomv90uz6iw8viyshpd0qtxg0z2thmr38e8cwkomnt7lfvtot5ujn8pa2fcv7s9obwx9bvza324465f2vlmm9ktctz3egubiatauajjwa6fmsf5jidl9gelprx5g8m7np8qbeyla3riw00syprk2q',
                name: 'yj7srf3mfys09n02kb6pzx4ygplmo73du0n3p8pq2kpwpv1ajn5quobqof3bxzuavkdqo2o4zoayagcbp6qh7vz43w0hu85qqc4h9ql5f2s44bkvk9v2sna50wmwlih4t9staqzwy2d6y9bxhsng13n8f7hmds5b',
                flowParty: 'rt2jtvwmqlhk5gfr1iz2kb4ndvd9p3712ojjk7qqdj7hcvx4r1t6zyunh0gqmgtyryb8x5pjxhtn6kjy5sskqgyv69wihh2g172rzypt81hinoh3bi2tulnh68braihbui9ioigbozz7i7ifdbpmd0k3v55a4lxm',
                flowComponent: '8dpctb2sp8mkeuv66kmyg5tz08kz7uwy4wix3xwe8iyuusy97nnzzjv7a2n7ktofg2hppfqq2rlejnwuuln3n3o5biwcmgur6f7o0b9eoyibcluuyjik5pweb0xvv7e7exwice15qhe6undtr3whsr5m10s6f3g4',
                flowInterfaceName: '5g2m6oxz51rk23l46hqp4jvc91sb9kreonfpggfve5aas7jrfi0a1btqtzmeoba0c44jowv42sgnw9d4eavtq0hfxsxdpe42b5kk14w7ulowmno3tan9lvxncyj5gzmwpul12yejstdy1kxss694bhttc927ajxt',
                flowInterfaceNamespace: '0utf9wy9s9offp88wklj4jc7fy0aux2j3rkiajp4jxhsdwqby9gyrrc8pjgbq3qmc4fj3hc6r5v1xrual1e87wr9jsbrndxdle83df22kwdsxyod9mdxphgx5x15kgn0m9qeg9gydetxwblqn9zvd1kym0mtyg2y',
                adapterType: 'ddil32hx9uyw8ursrblslmeqlmta8dw5r3yuhdci9b3m3d9vmlmtlc4qgfff',
                direction: 'SENDER',
                transportProtocol: 'pydf0uurtdoj5h1d2ees6nc9ojgkm6rewjdjmbpjt4es7h61h7muea3ucicr',
                messageProtocol: '56m98vkjkotv05b31uds4fvyy1ldywix3t9xny1s10mfwa16mdvs97t102cu',
                adapterEngineName: '9pvase0ljpqstwi1b7wtfpr61oqhz0klqnqx4dt1j8jwrlx1ixnw2w5k78ra3vwxn5pefxrtcvxkg7k7y4xcpd3xpwl2987qks1uotqi1q88e81szidlderbermfwfuqsaxufudmvn92pne9lt28p4l4q91kgyou',
                url: 'q3ykioh1gvk7xi1hvzm0o0eyt9vb21vd44xqrf05udn47cbr1khqh4zo0w8khpa3aheqhlwgpfyyf5irsmejonli6n8fjl2sfdlytdyak9ruhpc44ad5bezs5a2n2ufw8kjwh4o2poh3r71ohqh3gzamiael1xwxb4z1l6w4o1u1ixhuvjtg25nzminkoro6e1otbcmehvtn0d29flewanyufqgs4hdv0xwsokyf4n45nxdd4zqor32o1l497j9d6plp6eyq9ljds0khje7ovbykk3rv52qgkfo9cuxlkk5xm7ejfamhu153voz8c5wj',
                username: '6vqo5xbvi33a29smlo55hg0q8ri8ew8s2m927ppfaj9sd03shrm5pur4j8r7',
                remoteHost: '7a9x4evgtas7tyzy30ku0ff4vqwio6pzscaxqsrvbsyd83e7vhley7pw0b8re428tes9bp2bshptszldiyc774llr90wlljalckshsnoqau7112237blie7h57am5imge39ipjv39s24vawz0l67qpp77aryi7j8',
                remotePort: 6122612121,
                directory: '3geda26f43gsikh1y0cchqgaahfydimqnfcnuar8m4n5ku4156ngf0w7duhvbpy95nmnmzmwqg9h1exzp19u4vi52sw1xths07qpvedhdcg18sm15dirsmso1hoj3v7dh4on07npq4byixpydxlqi7v464kn1c7rde45hhyg6w3ggpmw99f9zb8rq20ka3lxtzi4zwjx057g7xirbvviox50l6v03oo1ssrfj9kyh32ku5zbw4pvmijd9jui06idprygw96vt1zsplcj0k2vx05u5o8f9qrbs8tw57weon561wutvwni4luxz4ae6jfbxpif0tdyjqdhvr6gr73m3dlple3lburmluubf9b0rfnqgp0hsgyr9h0kuuzo9ducwlrfifs5urdn394m9oumtmj263s5wny5whsxazm2l1ayzk9uel60myig8ad3abyvvihmocshy4v812gprzv1bfazyrj5giv440780e0nkq9pjrt2w8fndajfwgqrreiej7ju34n360xl7vjrtqars7zi6tbg6icbb8bxkgjrl09ehwoh5havfp9bj19bnbq5ihvvk3pdnqxijt2qqsvwvk1b03lj8iskgdqbfu52byzdsm8p6fpry7dwaa80nwg1ulw0gnwngiqxs4b3noki28cubbhwaeqrm0mgvzg980llff0de7hbq3ben4xamvlatsme77lo9plszf0qngt1r6d17fj2ljr66fzfjlae3itmufzkqfi03ecjsa7he00jaezc9x25ngwqiz60f3yk5ysgxirtnksmni4kkopouc8p5bycnr7lvwwi0g1jdn1b266ze5wtpuxl2fvbofholr90v9jub7ra6tf8nmh52lw1799xtzd1jsfm1li1xwd1xgx76xvqivenytvfe49ciw9bsfltdv77k6l5xxhix19teyty6xu6hak0vdubcrq5hnk0bko12c2ozmsd174cf793r5nkd2tjyuk1c2risp61r1kikyq61ha9y7xj4ss9',
                fileSchema: 'pag7xwk1kqqjwezh7hisrieby80wmpsaye1npey3ng8ksaoofpe7bxwewo194q8n9xfkj0or6k0763ar1zjia1i8lcq7j5t5ldcdvjwgzdrcrx97x0k8qi9su14izf048vb3jjterzgc6fzyutrae6pqr71bf5cnb59ytetr4d3goal7vy5frbvicx20zqh9es4v7533p8ticfkmkcg2x28fkmey09cd5xq7kbmo6v5y3p8kry67c91iza7y65dnyatelqb62bhbyhh7ccxt0tf591yvz9lbujffx0wo73r7cwqj6ddduhssdax4fkwf43astowqt7fewfkp53pucweda4mgg28iun7u9bg92hz3jedpz4xml5nsif2e7dx42px4z5k011mqe3gbk5mjb246gt6fhpknfmtp750cz5ooravle5cufesczx1y51me4kns5bg3p4e6h0wrd5b6pchn3dvxv23vvxmc5mx984fye7jndppb5m0r2jvcgzgn2o1bsbrbuph6hjmhi8agya2zj1kdx1101rt4ty81ssm4967sz2j95goev3utt5zeuna6fx49og5pyojzk4wodzwxxord1q91q63e9ezqsp60xz99ccop3z4d6y9znjelsnm7t0xhyucg6cs4ayqgf4grls9wdfdcnfjimdcllgjayy3pjyid3dzafznaab54nbmutnswjcra901rqwytx3kqba5blmydk9oco6eo80ce6f4ig8obrtfh3ukj8jdtrerwsau591relr8f4r5x3t49oro2k3v4f8wivoe53825i7j68svy5i8999pc10veaos6yb96mzqqmsohenakxtpc8pizz30a228zggl0zcx31t2lu7covh89wrzxbstpvshfbmdy9krvek8ddzg7c7y231p4n1r64z1eugje8thy2er3d6ylf5fmhqqb0ymviqzmz8aqlk4h2591r9eyje5xllxmd5qfwnf2kqzmudpyvt0an9l2qh6tgwonzma2',
                proxyHost: 'nkhju8y3fwqewe22hweoe612fch11825nk5pehdvwpxxdo7cis0679pbttfl',
                proxyPort: 2906265123,
                destination: 'lef7i70wn7xsccr8cf4bhhhiv7fh5a8dkxc8fdqz85ofz6n59dolabbsq3xt0o5tplshzm1h40vysm4o1tajmmemgj4edt399ua9dv9f058k9nwg0cr7puhx4gjyl1gk38qyqa8tcdhd3t6vpkpt86t5cy00r2j1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6g0hq34f04lgv2cgd1y3ryf9mk7yb87l4plmlrs4uk2sty16anuhpji2ljtxfbsnso8h3a4moikn0lolt6bdqottnefbrsx12irgja03ldz9ty8hb1dg1vqj97iw92orshrttlq88u73cs0x4c5bmf85nehpc91t',
                responsibleUserAccountName: 'irzv42hg5thsc9bz9d32',
                lastChangeUserAccount: 'l1aqyquzscfafg0ij7tn',
                lastChangedAt: '2020-07-21 13:53:40',
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
                        value   : '2028247a-900e-49c3-a24e-9796ebc79504'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2028247a-900e-49c3-a24e-9796ebc79504'));
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
            .get('/bplus-it-sappi/channel/2028247a-900e-49c3-a24e-9796ebc79504')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2028247a-900e-49c3-a24e-9796ebc79504'));
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
                
                id: 'ca6f00e8-f912-4d99-8802-b5fc389fbe40',
                tenantId: 'ee5b5870-3720-4d02-9bc5-e2cecfb6a8d5',
                systemId: '159336fb-989f-4471-b558-1b25c1f867a8',
                party: 'pny43i0jskrlle8290hpfl6r9ic2wwjzqat2z0wvfylycpzt67rhiczt2ez9d6435ajx475s9u9lr26ismy666nrs2sn3qo30nwy9tl3tjt0x68y41so4ikdswt3f6s670j7h7y8s9g0x9ihrhi90zgho1abyp28',
                component: '61jnax16b50jy48z27hvlu5xil6h5todnlwb6d9rxidddo1rrku2wkivwa7vtotv9tpoyog5bxrsxvbpfa665rmehkt64tpq0ucoxtiy3m5is69f2fgxq70p1c6kvnmt32fi1yecffehdt6nlfl5p617q5qosluk',
                name: 'y2pks8ozk1j750knsh7093w4suvielt8pa0u66d6jniaw7571mqgh3i4ux1t5bjtcuwsm6zxwhxnzjyq21ylbmx259x772kx1qjzyiwfwayvz6npy14c740i5i6m1mgi2840dz6cfqgx1wa6etnd377fjd5m0yyr',
                flowParty: 'nd3qm7nkh344zwqqbv3gt3iywslvzra291cpf7pnogae22rmx1inh6a1uzagzysq5mpe3fziwp07zi4poci1lh6mkzkxbbpl59q1sk6zrk50h3wp7wefwqiyoufko2mgm0kweujgnfp484y251b1ndk4a0hljgpp',
                flowComponent: 'n09p0sb0fuktfo7vf3nhvutafp0x3ezob6jlfz4eesmivguskdbt2w48ho4wj7r8x374twhirovt2h645ct3fj8fnf1f8v9uhvlghxathblr0p5zxcsd04onmmxhphn7puvx7itbs2jrxc7wckp3i1c3ix3ucokq',
                flowInterfaceName: 'romui04j6brivq1baegcovzoo12g4fmudpnctao9wd0916x8kcc8fk3xkgyu4oti33ixs0uhfsknvfpflbr4e6gtocxhwepx3her1yfdtu1cc1jnbt5jbabdih4ojp8btb9br1hoeawcpbqf8ffvch5b594vzdxk',
                flowInterfaceNamespace: 'ajxfkyqmi827cunimok4sgf6g2zev9ypjuqhgfubfsrtsemsehmfiduds2x4862syfiuqkntc64gce2c4wsk7c373slkmsijtbojy3vbzzmp16wasusbfx8337wf6y7dogqiyjgnz7zrbvkn252ndvtwqr5aby65',
                adapterType: 'sca83h9h1wn02tfar25cw2at9drfro4zc0yrsm1dkrpqfdzd7gwq95xsz31h',
                direction: 'SENDER',
                transportProtocol: '0i302uebtknjfrg88zhiayibz3jo602fgkcdimx7t79ufiuh2rgnnr93mm7s',
                messageProtocol: 'j0ho5rdki276plg7haptco5hn6k42gpnmz2j76qnhru0bc5c42cdkn3wr34x',
                adapterEngineName: 'ampthxdytc4nxzh45zjpdypuxx28r91plxqzezcxwojz2vlxr8ckrf2c7rzvz4dbd9g3xgmlqt4lk3mzgx8kvmuhqdpst19w8qn6gn8oo2qx910vadf7rbsti1vznu8rnxs4b12640gk6cbhcgnfqc45ubqzbsu6',
                url: '4dfslwbrcjx639pampqnu3zh6ojawg7ijas6p3xvfeuqv96ttchbwbzu3l132x94uz13zsgkpgobz2zqmqybb1c3msanlaws12vrwoqhl07obi2hk2sxdui8k7osq407gbeb0mox1nuvc77t9wjfv46j5yt55t8yk2l8qb3fpoprx94y6hndrdxri7h2f1d0epj82et9re5238u1c14psdn6doot62bo4shi101amtvw1nxp6yq91ue657s4c6mgb3nvjfidb1km5hr1k159nkap1zumaufiqpb3f3yn7erxnc4xzwrlc1d1ogo250e2',
                username: 'vec9jwveurnwhl61vphu3ccposc6fbcljnqjq5sz08z888u6mvubukmk9iqv',
                remoteHost: '26m2nf25vkyqhsutbfcla65zha7xdzf9vbns25n9pzmn8o3d3552y0bfdy1c9ddtxhki78dzm5fypu0qw4wpnyng0c8276aqhuo5oruss1x19kjb3av6qtf6tih0ep47a6b632osijwso6y5ye2krt8eekoqqnq2',
                remotePort: 5032108695,
                directory: 'ojno936r91fhaf3e2zpho70kqjo1jvolokcjiqlmwfrn0eyqvrxcms2qstl37qrg8kwegnmib4c59p59hop86oe9la55qgcypxecnjq9n2xkra4fr7n6venzlhcmvbtz4td8jlp7lhovqefwwuw12tj5sb6a312hh6ywqhcwji0ymsutzwkrr9lszmwzogbn0d16taupxvwwo4x1ggu27dzk0105ampukittmssy0dnxvqh7u5ze2n1gyf9lotm8emb6scyb11euwx427f7uh200l57b7l8ojpnlgfb08wcaotcipd4trvl8iemadycimd61ttvq5hjtrx8c62cgj8ec1xwlkav946jfnrjaxow2cujhvevrwa7a6eih33k7cjulxgd074346yp33978plexxaz81zbdefi0n0nnblki81jrpiuchqwphgsm7gtwtc8y3avqyc9z9s448971iusplqb0mxv8rzz4kfhjnd80ftrwdfkzgonbk21ola04znng2btq5ywhwb0rgu9m1c9uzdep67sdwuej0n4fccdtopski8uiqpetabdwim5vmc0oyaii944hhu22hrm4skihez7e2s79wqnbljoiwpa6jcjfhwqdc3srrf96x9a60ohyuw16rw07tg6m9ut5ncmm4axjj3mirh18s5dv96gbwa1kul7rbmbz005rkbf5t71p1fl4ew666igpd4rzjkshvyyyf761dykswwks2jjs4bay39og64t79llaqo6n5stznve2xylafcm3zk1b3yvtmdulsy2hv28t1tbfzizga9srwb0zl737g0ixa18i0hp4ki3p1lseecqepwr3sl208ra86c3qi9u03nu9lb2jk2rfqsk6enpgtou13g9zd9ehwq36wzg6li054he6jst72fzay51svplgp3c4ndxl4zsopr4h49a34kqw7o9oevrgs3vidkg0weloxypp3shkjvqactm8xsvvbx1xys7hayniu4j2kbyyfzvy9jsk',
                fileSchema: 'uy7cwaaxav7yh0zrylgg0w6mumjdbqvivefviiiqdxka6e8pyxp169th3tyu2qhckkto38i4c1fi3gh0rjbtwk8a8yakke6t6kpn2duxhti3kk7g6a3le68qhvs64eynz2s9cccfx3dh210vu1pf8b91yj6vq7h0h0uhy1fo8o3ymcvrjy6k9zu5n5odml5l99q3jnwkgy4wgplnfope9l15xkoie13elx4adjoda9ep6mn02jo2is0r8j0am0yeepq4c594ivu1r1m4m59n7umtcf5uyi5ai3x7r26psev0dnurgseabkphb5qk63x5r9azwakwqfxxqn1nhmvvvtxd2i7ec014f8czbq7cpkufl2u5ohhu5heusbwsvacr8qrann92lj62ti0jngm38mcuvdyqkk26zbv8489w7v8t7xjpcd3ee5gamyrxyv8e2q8pfojnp5i69zu0ofv34fsik1vhj12a5lyvfa1bhmzbunwsbqgm403yn76wl91amxl94h2liqzrwq8psc9ffxxtn3ttuewqxc5hjxkzct2z51il1tixedqb9w6y6s5yy2t6zie1wq5ehpck7h0u5a1o22ciysbn99p31w6455pcoii8xrkwfmp4n3eo7i6jl6s3shdxvms5w94ial2n03rwbozjlovbep3d2ofiuvkehlaphzrg6tbif2ye5zx8hpfocw20x66nhvpdpy9mecavhkoe7p0lkwm9u2atyufpjojaesfr86j02qb1zwnk5gfrlkl1ehm2lt70tpqyyrkogdcrjczfpe5v1wwe0qlvdbiql2kjfniwmmvj56jns5cd3rctsv4szj3vknj7u01ktywsk0w88sgtbz0cw8kjwf7ovee1x1s1lg6pj11mepm10bk3wsnuj6bz4dbclqnr7pa9f2y2welrc6wwjzoboqrmrz2umf1tqbrch0za0krl2ly69n3ply5p1rluuc7wmysi9brc9pndtldexx9e0xn3llbs3u0sdgdbnsqq',
                proxyHost: '0xyidb2kmxex771jqlce3ubvgmay8q82x1oy6cajx9dvevqatr2er5ah4a4d',
                proxyPort: 8932865169,
                destination: '6bg2mqlknevgre1iahzld2iu645c21x76mdnv9tzvihbpjhy9hhnq8ik8b75ro7836qvra2ivavdm1gkoyf18vd1i27qsqmpt22ntwkzy4ciwb0a6kelip60qkjef8j0vlcsn0xh8nc8zigexc0lxboyvivlm5n5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pl4614ddqpga54e872mjhakrfm7fuv1152l6fd9curphsasqy9ki1smw1j60v3zegwntld7u9u2zxmdk7bwu4yq35rzxi3zrengkql7dzazkkli1w339pg3ex7pppq52k60xwit1umq1xs69jq65tgh0brb2k878',
                responsibleUserAccountName: 'rovpkyca3pwe42y1a7rq',
                lastChangeUserAccount: 'g3hhzflzhml27ll3cuhg',
                lastChangedAt: '2020-07-21 22:58:51',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '2028247a-900e-49c3-a24e-9796ebc79504',
                tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                party: 'vbkrji58aqpqtkaehcxt636ms750swext36bux81kkia7p19evfzv83urak4d1o55o4j3zlhvjxelsqzkl2nr3kuar2up47no0ncg761dlk0lz7tsy0m2o44vb2171139bw8dap8p456vbkgi03u0n4s4puntz91',
                component: 'gziwylduwm4yh4114vdbjlltfqz1m2gy5fol36bkl94fn0fz9bue33apyasnl2j1qd6fr2vofdohqaamjvt39pcw0updnv6025nbutamr2b1z3p5gqosijw1xmd8i6yhp2p2jh7emm2p1tn0khe1ajh948pc954z',
                name: 'uj6gej2d4w60ug7f6oi3n4z0l4p95dnqlhyz579wstrqew2ieavf2bqbz0u3x9xp8jorn15grij6of4advxdnei8m2zep7rzuxiujb73ocl6mfokub8k2dc6eb9175fbw4pekwa9v517zpnypmxaa8mkfl5tdfxc',
                flowParty: '32fiofsq4xrlzua2bhhimu79exm55w0i2l1llbdj60pa5aoeoulknmdw4mt7ql7pnziudv7mwotuexj7y1omhp5exnzdx89wd8h9z1ihovdy73j0jpz9bulffje15r4egexhfq4llp09d6bjvvy2l3hvnlkhvt7c',
                flowComponent: 'o0ufk7wqg147a7kq2e174i00v353wh679xculbijov8fg966tt0or84iyew8tp3ou22yo6zwk79bjj4try5zxn91rr34l5oqjo72wuy34vzf9j58ov00iihcma98z1ermktdr505ezd0bkdiasrjyk52333fusyv',
                flowInterfaceName: '3x671akgq5du5f1qgop0n2jhdpqmrk40dtcud2fejee6d1dv0xabety2ms1hlb8rcvdai0myzkouxnahk5d6n1z65ci5k7k1u60ik9v9e2o68zvn74k9w59hfn7vjwwaolnqkjzbo7orh0df0qlmlil96wov89rt',
                flowInterfaceNamespace: '6bq7826na24mhft52vl1gkays1nx4954lgcp0b02jgw0alswtkgczfbtuf16zjtk854eefzryjvmnhg8kl22p01ckill9e9spf9byytfd1omju98t3vlk5zq91id3hv1hhpx2c38untdb0fznafgjql6iflhvawg',
                adapterType: 'p77rr5y91xqirxdl3n7h2tdavr17owo0ty8dkvm33sqbb84cnj1abue6sa2f',
                direction: 'RECEIVER',
                transportProtocol: 'rv0yyvijbk6181kr35q35om7od8vmye8vev1wbt4kjhfk0ew1gq1ks2ppdma',
                messageProtocol: '3jcjp7dlv6dc6a9kdfo0l85ymdriqv0ag5qdgze83j4in1grs33gk7vbyhzw',
                adapterEngineName: '4yfvpawvybypumbu0jxabkw0gtvp7bgunuf5vv65q3d5cjsbbik4okkzhd15vi4n6kx1gnvmqwu6s8wizcmdn0o37fhzylkvdsz8ev6uzayew97anchpgmm5czqu99r89l6ar3o1pnq27tdz7xha48ihsk3th66k',
                url: 'rtsb70ml85an2n10n816h726ak4lxpce8zij0googbi3x0q85dn8kb0vmxzky6q1ls86k4dhnqk6ibq53ieetdsbnn36n2n6do949wichqylwgxjvn7t7c683n35t383urw87r8zoxdj9dvyfp5n19jday0lsoez7yoh3grj03a5ory8ngujfgshtj8a7x6sgj999rqinp55x7atvhqxd4g1yxbth0xp8ea4wsgtc6rpfm60pd6strqbhy71lmi3dmeyv4lrcu01txt873954ckd2dyp2bjb4y44j42ru198jnarpvrhfaip20s4cvni',
                username: '6bjn7cz1msl2znql6m3k46tjilp7okkm9wumdnqol50oh3bsmcn0n8dlzfjk',
                remoteHost: 'dh6vpptjppp833zt7zdq5m942pyuqtgauyzstpjadavp6wgnolvh203i2ohbdv2ox3n2z0yaxi3v7weff4u7oav4fvipj1c7n9ia6wbof00j7hnkmez2eqo1rs7dc2wuaxnt8f64gued02b9tnnk1trbzsebfwc7',
                remotePort: 8702087046,
                directory: 'ehiszq52wijcqyfm27gnn2170zbwacn5cssdq3e79cel3bxkr72dxp6myxamf3gmheqyyv90dlzdtc0ud0qrzcsliy79j0cney4b6aqm3a12ca7xkyprm2auxy1b8amswil5h92cnj440mdy5xllgawb2lqjux1fni92sjhx4mfs5kbzzohq2gaxcnlbc14yh1saadkbpsqiihakhsbuh4ddlqfdxkexa3yv4k769wesyrzyqbqdii9m0fl9vgnxq4guy7030tsvt9a8swskawrdxivqm5tolit0ytozyi5wxjztynsekjq6fonxcit7r9fszb5pljabzi7rmsp70v6s2qavz2lt079la88qmdrsah1soottc7jl3w3t35hio76taxo865q2ivm0ghz85na3aa3mbnic9wob9m0fajmf5xraddjvt9czpk122xpcaasqixb0k23cmcmq0gzabcjo4w1jdmuuyuv80a85a0fmw7a73a4cmhgrjc93ke38woz0q8fc1ozh7slb7m9zk8sds5n61m4y0qx98q948s90wjf2n6nem9xe5q0xbko3unom6bayzsbfevrbba83m7efdx7ep2cqsen6jmudk9nc7l9eb1t7a4okanrxe87v60zd0lubvcyhy1bmwgd654lye5vyvmbmaocc4vywlf5wsg86lsy442xowl9s03qf9ac67y00labt6cul4jcpuidf8u5bftkpxul68khgotz6wjpn3dpkw2hmeincs8qhhefzeia9v2mnz9jpaeb9hd1pxtmbluji1m4biihsugq775mqg73k8o9hywzqyelxpxv36h635a8e02szfxduezxn4d7btz67pewa2j4zrrwd30y6w62qaents0cq2aurmmad7xjincdermzksmdukj8rmwu8m29qqn2nc0gaiirr7qqvlo7ci9ad2n7wbpr5jojn2i0rp5hs9cmtlyi615yk5xnzcg05sr92sb4jgg4t85eqxcsv1ude0imolm7b',
                fileSchema: '6662dicv6mjne3ixkqpkr77udpt42izjvinh8h4w3i0bvjavvm282hq020dvahpes3t8vqbsy6ij157521v57a9rmx5dr03wl6ov3j2eyb6bdommi2zpygyxnihuvhbyrsqx8vo9298jssawop4c2kxgucjvla6d6vbkyzqkcwp3dy8zefo1vvxk0dv1k2gduikrp5hrjuukub9zq46mqu1xdib46tpbpf2tt6o3gqsfr0s9ufsk0a1qmx1t37lj1ofp6p5ekcl3uz2vvzhhqqxx2hdcjb75gsoj1vj62kaqx7vjubvoytbs6z9xo3mssc08xve972kg6k4rqirxwvqd2butxg5ahav6nlrwmtusqxgscgpyruil6e367gnipivcq6dyc36rdbta7eqev8xvvak0qrtvkfqbuz2idyof8r94cytlhq5lmzfh024kaj2pzesjp7iq4ll3ab79suwgue6g66kesn6lxj5du87wokrh54m73in3d9ey765p9dhg1aqho6w23jgoxzh51g2wbitbxh6g4gslpleis27bilxkhbqz3vg197zg6gryx1srglgw16usjh54rp4nsytcv755v6aqzf42yvnzjj1j0wl9yubny21vkcw8m064orgwdoa6sczuf47a48s6w6ls49061loff9r63c9eqa4bk81ddd5233sggnmegoe744uqr3bm8kcm856u5njw4mccc51mxmiytn6p611nykm6089oqf2kpk8azz4vf8hdoc46bjczdda0wne6mkrf0wytdg0i4n0sgwnsr1k6voxcl74niyoxiwrpspxuf9w2sulgchoplh6zy5sa1kffflqx3cb7rfaac1nbfvebd00i6h6i5zbcgse9lxqe73ef9ziams05cug5vex9uby2ob3h6mdtp8holbjq8o58a4p1t6t5re8ma0bssm72ry2p6nbf0i8qz1mn87zmfn3skr8xzjhuclpwcqxhs7y7nybrixoz6cpm7a2v119hjyvh',
                proxyHost: 'u09xbl4n54dvwcdly9ie237ef9bo3v9inudj3y39luugn6tt8ovjtzjyg6m9',
                proxyPort: 6542657470,
                destination: 'f2np6fwmtz3uuz2xocry4t3vq7l7i45trn7h0ln788qlt7zel1wy4tsklomqdatei4aj7zp0klkfbg5ezgk3l63k4o2bkfasg1e8l1ftmue3te2fz57qmnwkkkh8g8inn3yyeip4bg33p3qtcr9gqjpnkgr8vepx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ixz1ac3y1arkea4rf8b4ql3p1ihvxkmc8lkzsrrdsqanzqvcghz8emo7idj8isqqgefyd78y1uyi0cp0g2lqouvu5hpijctnj04ugr1ngfuxnkt28w08eje6bq8lqgsphb1l6ep9g91qaya2q4xql6ho2jst1nob',
                responsibleUserAccountName: 'dkxmy5ryl4khkuw1lwsm',
                lastChangeUserAccount: '85itb33jbjt6e6egbcj5',
                lastChangedAt: '2020-07-21 13:43:53',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2028247a-900e-49c3-a24e-9796ebc79504'));
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
            .delete('/bplus-it-sappi/channel/2028247a-900e-49c3-a24e-9796ebc79504')
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
                        id: '9805c6f9-bd17-42f8-8a67-212625c42092',
                        tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                        systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                        party: 'ozdmv4fri8htzfa6mfj7pajvd2ko5pluqyc7iuwj9wfeoirxz72mp0l15oacofshc76p6ysojzqt09uj02mr3vd9h1k226w1abjrgmdta5vepr1gpr2mx1k20qx8fec5lv5i3ermcg4brxnitwqa7n2oi9oa2zu8',
                        component: 'b4slypk0kn62wxshn5vh6ibcgmdbzsq9rrz3ibik5oywf8ul0qtjnjzgo8wkgdtp0455y5o1khqyrj8vhep941089o1oideyc8x29bq7gjdfh4c0g9fwzyk4jpryiwhd5bvljehyj72zldzvfsa3kc4epapqwcze',
                        name: '0etwxx6tsk3rq204iqupwo7y13yz0tiny1aaynuxts55q3zxv6jb2aczte6o5dyjsajgnkl71cvzpqswo37zdum475lb8jfp79msjlm6z1ocjqr964vm0n4olepo0ib9io3ykh4pb0zvke2paqr7hewcl9e44dx1',
                        flowParty: 'ypq36cgjsgy6c2qowh5blhz1ml94cxy54n53hedo1s3y6phitnmticyq9mrshe1vaybf00vj4lxige83ea6v00vu2ca90sx7jjam2p6izmpifw266eld4udfb3dxl2kki7s9771ctqd8bxwnx8pk4a16qwjoyp92',
                        flowComponent: 'lj6v84icm3lz1qvoeacx5uvclduo06aha00tq98qyimlyw2hf981pwfad4zn5mbca8u0nolmmhsxzswyuf0cwn6xa3xanno9kexrtp26i8c3tc6g3tziyhmig0c335wur7oe5ybzl6jtuw1x4cw3f2mffoau6xvu',
                        flowInterfaceName: '2olhnvffyx8300mphmqq9hc1h6yxnr9bsb3qsh1laiosi5ok1e8nq73lfkr1zy0o7occysk93biijhwaius1rqy9jynw6d79mz675t2kz7phe7e2890o5njqi329bc7al3fgbpy6yw3jcjb3gd0dr0hv087n696i',
                        flowInterfaceNamespace: 'uqujyqz18obg6efwbq1kb8aljnsyiwespf53s3oz89jzr1bpnib4rmytub6oj62dl5jqx8mrjct0u8elydcn3c3f2al06o7eaf5b5ddutdq1n2ao4b1m4uctlhfybym6s1qgdls1u51qmisdtcuc7h3t6po6qzz3',
                        adapterType: 'zhl8aoi3wyx4wquyu26tivzpl7heg5a9lu021glg9q6ck6ow4szjv9jvg8qz',
                        direction: 'RECEIVER',
                        transportProtocol: '696z4v9icg4k8t74phvlrn47iqgv0olpkg7izmw5zrm065rfgt1hepftg1mu',
                        messageProtocol: '41juywo0iyllyn2catmqh9qnpo42n4m6gv0xa5hg42wjn2uoro3ge62uhtqq',
                        adapterEngineName: 'xxd030fe96datxr1eedzfbfqgiwpbas1tcbzq778fco0vbf529j68bo4310mxu60gy7sgfxmd5ccqe648xfg2mfqp8k4x2awmrd521i5j8y6k0hvqgz97c86d3g4l3xx0ll61wy6im0pwvfnqncl1xaixyxk1y0w',
                        url: 'pyjt5exnrf1t9qscofecdhruuoxx3bm1qtk6md77xjzp3wwzueck9y9ajm3nzpfpk064brtbxsm5t8zq5ii9exveiafg6javzpvvqpr8hjiu18irdmeoixzwtjs644ip0x2viy1fx157rimzwt4w496n63h9t94wevgojr7ruqbunj9utl5onlx26b2mpb3hoaehk8z4gng705bt6kciw2e44zf181t55soh4tv0tfcf5to8ekhz54k7iovdtjsh8gnqwmt1vzc7wy5ps00ijy79wluxdlu79ueug6buayv0z9cutm1y1sx8eebi7scs',
                        username: 'u3bqhwc0aq6g0n9p22xng6mr5c939jq16eaarf3u60ehhwyx4dfvmf6xrpmb',
                        remoteHost: '4lkw3mdcg0441dnhqco4sbb34m0funsl1txm0goqembpqwi57lgt8md8tmjg06f6l2qvibkgxscnyk7hqm70rzas90gg29mpwb7nfgkbkmtvcaiiaqkmviva2c3gzx3km24e8cg03hgfdxqn6xdbm8xbe9ib1f1r',
                        remotePort: 8653274874,
                        directory: 'af31dt87hgir6hyntx0s6ziqvtvpqxaey647z4fmxi0u3e5tqv9tyb4c0us9a7sypt83kpz43hpl2uoinwxac3atanvjhg7wimih5v3n9hq5q7upxpfcb7d10em59aatx59ijln1gsppu6v3jyfm9ur55e3ocurkfpd0cjq819fu9af4hz7nzr4woiyqvpkl4fj80yjoxvvwgnr4ha7m209jwqaot1gkd5d3u4ib67szbhko9n5886zvjz04iyfv65y4cym32exobq07fq3098at96arxaioypw6kzjfip0y78r5bm6ehad6wjm3zj2maz0j276bbfik6ikxyx9koyyt0xc95vznn1coda5g0tevgicuclhvky62htvoniuzx5e4x9i3fc850mbottlkpmezqaqs4sku0897w7yt2r5ly5p0oikipqyo4lq7g0x9cvv2b2d7gt3k0drt1dsugiywyjjklb7pbs5nzl4yurwmgfe9c7vzqpl6af7fklsnp8qv4jtohg5mb27xi64p8d28tfxq54mc0d0pwe4z4de8ppff22sa8a5k2igodx2zd7p3d877rp88soawv9r5luqddpvs6d1ob08otrnid4lxj372xztr30z91jywwf9itinfl9c0k62vi9doiyz60cnhzet3qksmwxbsiz1rgu42h816ftue9mju11le96dqdzic4x4mkhglvy0q5keo9q72y6wrsnthiwuq5om1zfhv0sx55lpciy0cehyw0i5i8xhmtntadryvgw8gfdeftxoje6fzdezx1r8iifx6pojon6424vd83h1z0458bwrpapnmv8owsmb6dk93vgm9rvra7psx2ws9sanpz1zq74mavif6w4xvocnawjw1l27lvlplp52unlh072w7vquq7oh6pf8ygmv25z39j8pdo82ubn2hr4y10y9w1plhp7f02wua9m0xqprbva5e76ntzc1ppw94iy85mnfbw4gax8ob0j97d938x1ug53vmo5z1',
                        fileSchema: '8503slzom3zl5gyfymmdb8q88rsp2qaqac2igb219h6f4i7c5nwzhu5wb9rz7e4h9boiv29p3rj5t85lq5lwk56wo5dgt6o9nglu479ii1j0257o77l0wu0ivtpi00bt3z2ly3gkdfiww8tlatbyhzspj4whr5pqxx5drdbwhisecu2u0mi1e9p6xo6q5epb03klajvpowrr374lxgt4s009tdf4b5biynl2s3x0l40l4fh3kgyxzbvp2gwzjz7fqnfux7l9u5a0pu9v3utrvz84r5z7f4gs2xz6t42writd7wydn1ghtkoetzchy7bre2alkuf2dieqggikeam833krwj0hl34jx9m0afxe21e3hxsbyw3kni8en1vlinmfvbox5uq2s460ib8eike7krk2zkqx8m91v5rz8ay97wyq0n1kbl3ffu3azlz8j3mbt8j3pv0nco77brk8rybzovzvt5u6j7aoafwk1byyzu1welbzhfgxwryp54cg3tqv1ngy2pxxys0vs3m1caguwc80dgv7d3mx79kg2w38gp9epgovtr65ydqo4f1fpib63nza8mq8esmtw2pfc4eboqxfve4rwe7q21i6nzuqustcup2xryq72d3hoebedqziteat0v0lkly9qaadci2fg6nkuphqccugd717r0jx4hy5tgan0kcaynfu4zzdn4gu6lu9f4aklw630of0dy4uy55ldvu21jx8wczpujdf1a3hc4qqraqk6mrrflja4plan3of8lurj88o3ff7fhk0q6b5xuykxz93int5tbl9lxgm09sg3w3l0qvni45polz7um7c43vs06bjcmbsmch6f1pg7xsjg2bwkwc9ummjg7dioawfkezxjhtsc8wodkvfjca2ki6zq8pm15us5znu24z0sruxkftwdyc8ve8fl745zqxm0jzigr8juyfmdpkfmgo8kx341ssx6hw9rukyuf24ra68jnpnq7f4lek7ebqf5ub9fnitz3tfrj5okofv',
                        proxyHost: 'tfsj1o12o73pys3ovx58w398nalohq6d5jw6xd0pjfva5h89l7jpfonuu8dr',
                        proxyPort: 7193722930,
                        destination: 'j2hyoimpe2o8axdz1h9gm818v9kdkzco0dkpj9afywg1pw29531o7er1otgttbjl96avcodq2uo6aqw6dlu6rbp4d8chuaed7ky8rq1ms5xreusr80unvg4wfbg5n3ng66801wdlwryzyymr4gnel42aiy694v8x',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'g3znic0n3kxrj51tcv31oa2e6i0ebv2tf6c6urclrc2kjjo9np352dh8pxek4qoktkxd2kb2en623bx4o3jjgnjkfnx7v774rhcp2xk5899p295gnlk4lh4c99k2ndninadz78f4w4y6v95q4ridpgkuug32hd4v',
                        responsibleUserAccountName: '00a0smewiufccuetftby',
                        lastChangeUserAccount: 'y4kj14jf57jw12c7mrei',
                        lastChangedAt: '2020-07-21 12:13:58',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '9805c6f9-bd17-42f8-8a67-212625c42092');
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
                            value   : '2028247a-900e-49c3-a24e-9796ebc79504'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('2028247a-900e-49c3-a24e-9796ebc79504');
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
                    id: '2028247a-900e-49c3-a24e-9796ebc79504'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('2028247a-900e-49c3-a24e-9796ebc79504');
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
                        
                        id: '2652d41b-caf3-4ec6-b343-1e1b4425a469',
                        tenantId: '0bf3babf-94f4-4212-ae5c-10ac5264d437',
                        systemId: '7f2c8d84-44e8-4b56-8bf3-92d891033db2',
                        party: '6w0n4p1lwbe40rqe4l86fexrm7xp71tlprkn4dtqeuck95d2j4hsf8u4atv6m3qm2vnee4rdja7t63wxupmylkrlzi1dsr7pxjmoxy3taoxmar2sqtxpm6rrvpeguqzx5g6mfu185rsxlcbho5gpmmju3bciikan',
                        component: 'h4koqqt1nwbe25u4af2zzplrhovqv4yeum6rm2mv5uq0r6s9c9ki3snf4ud4fd05tr2l8qvkbfh4s0lcvnb643eex4ul5td39icfb9p4sqk5s6qbdkw3u6fu6yoil09mlgv2i1y9e5bcojqrjylf0l4vppqzhhcg',
                        name: 'dbnt80unqbs261a7mrdpv78i95blpnmmxxbgbc6cnw55d35m6ej7xzz8ok151vf7s5hixctwd4bjjmjdhukw9z8trn5bqniicg4x6kalus6jk51jrhat3w6ahsqvc1nkn54rja7h2f8iqvl01ilarr9ma5g0pb8x',
                        flowParty: 'musviwwfbws5e80vv6avywmhwu9u3j12depsexcapqgmgaehfei1i1oaezel79cntmwawt39o3w11cyaeccwcz4bjoj7zcjlhug42horg8jv2wv9yjcb7f6p74ra830ffrbvlilotrxfzvr3baqol334yqflpyz9',
                        flowComponent: 'mvrmkhh3b0iq6jvi5fv2zywxld3uk7jnwcl9murtx4wstf6cbvnddjfn410fuctfd5cb6y3moo4tpxfsskmcwlu81nhgm1zhw800vlpo2jogab9la24vn9150d0k7ppvwu7sbyh4lpvw7w7ijj877lo2mxd3830f',
                        flowInterfaceName: 'n80v07ffsdw4j76dqrayztxtwwr66m89ltkm8tlqr8vdx84xyy40d1j7ewmb5sw40dam1zztvn7chabdhvgq85xno49upg7i8e4hin54jqec24x6837eu3lct3chexkg4adgu7tdy8k4rilrmsxnvetas1vd9wy2',
                        flowInterfaceNamespace: '43eawqkh2j5c9icg9r5whprqrbkj0wg0gdg338ivyka3h1hqs8p2h2xhjhilij78gzedyqez0i1deymi1xy7uaa84w4iug0un3vt8wicf591d5kml7ih3lw8w8myu8ogp75vi9ufq2bivk11t64f3fr6fs4o2esk',
                        adapterType: '02tokcv04dc3mz0xv4um42ikmxiinzhmhqims87rfv7asw62b8drwaf5xowu',
                        direction: 'RECEIVER',
                        transportProtocol: 'qenh3n4digf0cltwwkkb39406y926a8eitqo3gdhbxure2so4l7jx7zyvk3b',
                        messageProtocol: 'y9zmc8k9s4czq2svwvrdstmo9t61f87uy23sd4zkc3ekas65td7vbfstinye',
                        adapterEngineName: 'zzg9gcjzarmdijn5ykuffm528vslks66p9feq1a4ea9m7lhbqbeup9xwhwlen15ts35094szgwbpzz71grkcmp8izq7tsl9z8o5yv5zi9lfdmat3wkt8gsfug2c67iy7e6g3dbnxez6k5sm4eud093y4d4m4wa3b',
                        url: '5glrip7834becwe8h6q9eyacrezdw8r00so0zvsj6540v3h2mm48bpnthdo9bhe8dy28w4cdqruzpjtiomr1ea09qfa2y2iim4iu8j2ty4utdapoc9pt84ji3tmt84dvptfco2i6pvpjo80qot2azn7w1q84z0ovjxbw64khyvyli61epcsxgpqjdjynrhi0n1tua8kbol947lm2427p77ce6t4qb01m6a0zgsktq9squ2yuleegr5czz1ef5pvx2w623ccsmglynswz3fhdea5b5hujek3saia7ydehk3hg8cf79qylg1ob3y9cx7xy',
                        username: '3zv54512sv7rjxh9sahgv5vjzcdee3u5esubwap9cu0pvggcat4bzkwcv0a6',
                        remoteHost: 'elll00ooyfrina1r0hr12uh2u2ef4n1bn0wimwvmawjiuaqnzvtl8bioj2iufu6mr9ld12c52lp7n8jx4c656rndxivymjdh947imo2lki4i1xkvmj2re10bnc3tdpkc6y5hj24akm4gdiy624xomkcx664g0v8t',
                        remotePort: 1296459708,
                        directory: 'vrb2iwp58gctkcwkm7dgtt4uxn69dus6afhc748brcac3x9xabufshk4ab3k27e6dez50w3cotza46il68ajy86euvp51df8mkjf1do1329gvxxz15eezudwxd29gtolxneaqrd3wu67zt7ew0o3yfwox06xxcg4eqc49dpdn01e7fhm095dx6eau1nfzfejvpsl1nle7edg1p7ffc2tx8p2dwjbztkeydxfrpi52rxfxqghjo7k0369rqgdlif50pqeq92f2bkfior7oc5k04g057l9g95jwecpm1xb531oqiywavna7ol6fi5u8e98npan9yhb82jclgjoplppfj3ntd5kwug0dkr39um88ueoat85x50zjbx1lmu4zgdl5rbct1nj9fhs7fjdsxqbf1ghqolzf145zz2e3fnbkkxcogbsauelf8xxr3lmdiihvu6spyx49jxqmnj3k4w0a5nw1jy6dutu37wkf2cwagndjnmf2lgff5z5ufa9ykd6alhpveuq0adavu0ywb661spfyd5u3tgm0mryl5tj22pjhrt2khzor9obierimag6ex4j15dp09tgdvbh5qfoq7yutgnbmev01b3xv2cpqr6s2vsa8ro4nwu4revck0xh35xypl33yz0s5iqmi5ricah4o0u07dcinpeupsb6rf7z7tcktcmk291x203fwashtvh76epq9f3tfiqzh9qsl4texwg10jziytiojlu3r3tg3kvsujrwhtmujoi4awnfetnx39sf1hnf6lrqihpnxxptuhbs9o5455u0p445ewgtyuvz7jtp1g9kkqmnisn0mig2wd57w02lbka52osoe667xcarqkmeauxfts3wycgrtkghdaylm7lbq0fnulalig1qiydhq5j7ey1bi39g2npfc81amxt6itwtdptsvzzg23tj80wt8w797wn7azksbsmldzcxpfbux6jm8ubo2xrquvk5892kqc9yc6zmm4r8zqm4aaptwb97rb4yfzdt',
                        fileSchema: 'tq5fdsrdvqabswqvkxrm0xjtsnfuh9pk06h0laddd49npatoqat33ezirfo64bclvxake26r3k9lspw8rjrlebtutf736i2zoe90seaugpxi35r1sl4mhjfdh1a44m4yibaa5a9zbrutfpenikdg9y50q2j7clqavj8pi8fesof2kp0qdz2gfikkp028r5rrp6ej37fh7kbuogszbr8onyz740z8g27d9krjq8iqpl62qzyn8qq0tspxjqncitq556fhd55hy0e968eh9uzpt9ssjx923h33r405mpqt6diz40m3up9svvqfc68eakv0mokptjsje9ghkuvhcpbk6psxu6bdn3jjtcqvqv6o14k5h8m3j8h33929893fjuw1ay4o12s0wm5fctzw0z9dqxklebmiuxl0znd9q7ocuonkhf47w5mfaqngpmvhgyv6j38ba6ph00gpex2jhx72bw2i0q70ys9w96za5w0nzgbbvn0tt5054mn6vbk2gql7dwswtj0xzdd6bdv9b712ikxt8xi5v4w687ifd93g7wrxb4jnhgs8zep6zc4aoduir0qlgntmx7s0wwprutvb2dbh90jqis7pi73pxk917kstzmay8zqo0m31i2p4fzvh2pl9l071y4u8fitxd6gfksbny8z00393rz8y8mmdoeikqftkw4dcugwk1ncsjtna4fx8c9swsrkapgdd4yw4c04ecsyzs2t78f5qpq398dpt17k3iri2r8hepvdt8yt8mk6t04ee9ngmffuc2soq3ay36vrywwc8vwp5srja1wrjnozvszo9a8sj44t28yw883jgy1utsxmq1nw76d4gb3djk107xmggmt63qa2vx5irkk0bylg932f0inxdh99olmsp0552xd67lol9di6nglx25wlvnbp3ivuvryjwmefmz33catwhahvl9g8ng23ic8idf6yeuxgun53cwv0t7o9k5cs2i4cyxk9jeraeeqrb7ua3nmkg9ij6ux8t0skc',
                        proxyHost: 'k4wcacz3hoypsk2imbbhzqz74kf12lsk1969209vabmni5hbmgj96t76dmfa',
                        proxyPort: 7887158951,
                        destination: 'htfu46slmxbgyf56wj99kiqtne77fmrco1evgvxj0uw1o6dkw9uxatlvstc8klt4hgwand2y0p1bxnwisg3tno6mea1h8wglkvnr8tqdsftv2yaf5tt5mirx5pm21ui9jyp0ok5jsgs2rd65y7iw8mvwjzsc6irw',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'yh9p2ld6zaxxarqdwttnevsl8s19m36rnuutrsyz1v7edt4k47xmdbvmokayiiabq7b3sq5zoljn5tn8rjs2obabno85lww4u2vmg3dqwwk1m7p8vosr40kow31obzoxttbwk5g0w6ywapyfcgr56m26nixb1pcm',
                        responsibleUserAccountName: 'm8sc302mj910dj34pqjj',
                        lastChangeUserAccount: '32v4a3jzzceth4a682cy',
                        lastChangedAt: '2020-07-21 08:38:51',
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
                        
                        id: '2028247a-900e-49c3-a24e-9796ebc79504',
                        tenantId: '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a',
                        systemId: '0c46e65e-ca64-4dd3-8089-74d299456790',
                        party: '2kp7t3b88w941bg2jx11a0ojf8u8y738pv7q7jsoskunzyuq7k3v6a7jsgamr60bvykfjd11hedicsjacqa4fcgvvq2kj548p9ullrpphmg15poo6qlzsy3680yq831h74paoobax592pauo6c2zdj92ct2hj1dy',
                        component: '6uh9npxaoak9wt053rz3js041lllce5ow8mlngk3brd62o9o3gnyvhd2f1mnkbbd8bhi2hy8z6a0z95udpzaup1m81wtw6l62xe76sw8eh7r7k55o8lr00dnts0197mh0z62adlkcnuyevvcx5n1t4r8ddr2iw0h',
                        name: 'mbw0janfogk6d5ir3t9mcsv62pfw1ra28kxsfh55b4g350i54x7kinqqrk7yufojizhhckchmdk3zx78aawkqfut31g4xyr6rw3b6r9k6917ekiczubtenmqjqbtxznt493tvyvu0njsdunxf9i726qb1ucxy487',
                        flowParty: 'lw6xjytt6rqrlsz8b4czu2gzeo646bb5ubw5cbccea16dm7id7sftu3u9ebo0dnoa35btdnkz1auuv2vczc6kdt76j7n0aluin0pnyjvewisplz6458772sq0enfybpswi42s07txme44w5baun05vc2ocrzupfp',
                        flowComponent: 'vas3lf0jmsy550lgntxh41no99ggjdej3y8nojqjukzbczn5dexzo9nx7aubc65vrua7q9g0jtev9qpwrj66hcafna2ra34b5mlag6vt7zjr581vs3dgbsb6h4j7y85qwcapjfb4uhx2qbvptibhr3d5yccqgj2n',
                        flowInterfaceName: 'g95akkw47xbqaacmizvvz0q0pgqm8bplahgc90o2vtz1k6q66mk78j2q3fqty28q456stfhcheg208xxrsv7blehjqvj6yy2ktccc22yx5g7yyt7jq0gqjpsc16wsntz6rwzqb04qodwfpphxkrbqu3142tp4muv',
                        flowInterfaceNamespace: 'l1oczzs7semjd04cv9em8jtix4re28qwf8kdj8xzgfvhxt2522jxrx59sk9l6r63rpnyhpe5ui0gixw5i4k2js1yubkfuu5jtpiqovsuv1m1qk1e7xkbwdeoqm1yaczbdn8bmu76zio5msrer64nvs14f9po50fz',
                        adapterType: 'jnptw29g8rszddfkkadembulkwkui5jjxlmpk8uc5wro66d1x94hr4aj4ifv',
                        direction: 'RECEIVER',
                        transportProtocol: 'gflfjbtcdily44dwto7xtqdzgs77d53mif5jadk5ga2v657qf58lsvyc26b6',
                        messageProtocol: 'jrqd46aidegse6lgxlzrfvp7uuwfeif7gs18su2wrx21r58ih7rmlk8r9szr',
                        adapterEngineName: 'h6j5nc165uuu9air0svbp7894xw6xismhteb3w9j0opfx41c9es89ejcdm5w7wq02n0mcmewzxloo4yevbiorqp2yfvi1ytw64fy1drfnqa2682yv37rubjud688tbv9olye7ufvidlfp5n16h3xv1183ulldi77',
                        url: '7cnqe5izb93e2v8cvngoq6a1hji6wtum3r89atapmw9j0e2jl1tsdd94ldkxezdu4vx3hw2w8giztnaky3zhdnts36mxqkhuxgm9v0fxhjf9n9zevgbkgre5xpp41pirr3cvev087wudirr42356pouh2zkm44jihrd2fz0fbx0wn7063hc3s2c65gqvpbqbvlapbzkn4ccjel7j75jcuqe32nvpkvejuz969a98mwx4kbuylgha53ye5r2wwur1uxv8rtgxi3s1uk92sonqvk2r5av2xu50x18qm3tj3iu5p9g02z2mye4gxi9ho3e0',
                        username: 'dxxvvat7b0olahwkg01xhn6g6dkgmzhgh7t9xwl56bbr0qr09nfq9ojqvdne',
                        remoteHost: '5wl5mis2606xmf594jm2lfpox627s32xyseafhlck0saacnxandgpo1avttch05oigbojtf3sh4jfxzvk3bzrm4q9qrnz3zo097vywiehdu8illl1gtmff0zds31akpxltskxf808l627qazepewu8yc1ga4y6bh',
                        remotePort: 4974106941,
                        directory: 'pyv6bvc89mbsapd3bn15hy15sge225ilrgo5zt8p3vld0toorlotb8u1h2c38jn3usogzsaug22m2yebst3bfy3zewrge8otah2wlfue6xjxk9zrpx9d9mb7povhoe7khm3ovjhj4gkjp3a1odrwgf4zqo5086tf1p1d372b7vzi3pfpa7ddqekub7a40z8yh99fg3q7vxkc9rnxg2njlwka0xfb499ivhpbbrrjrpjtym89jlwygl9mmkk99xfc2674y4xbllx9buqgzxey14svd3af24rtjjesebxerui5stlco9cfb4iqchv9szro76ax71e060s9ul8w1vsbr835x0awiqos1tc1rtajd8gy7id3jqlgrv8qrs58in8wxas2d3leywdv1bzdtw71n0a2zh54kosjqgf3spxjiv492nbtlbapxzm2lsilv5cobn2pp4xbdltersyrk1391ne3zk23y9ezo5bpxcza7mjw81qnwwt956zjzw8rs3vg249ujbh0huz3owcgmu7mdjibwlufyuioariojzk73r3k1qy1rm5d0nz3e9u6kdr5gog3780e55vyhlur06egu2m7znddm51mdd13xc1t3ive942dectaqlbofnf741obf82jbxqmjh254m41fqdrfz94bglo0icj9n0mlh1qk56q3bflrgdls14czm9y8ge6ibibatt1ew8yrw8wljy80e6qx3381fgywilu8gfkuc0vwqsxrlgo5lou64xvm8ypb9o5f4bpywgeh5mp7ahvvwvqt7v1djoj5drq6onsw0u4si6yhw3299zgswnikltkwzxbk90vzupllav7frhawioafz0uenope3d20ggrn1nqorj5qj148na4zy5cvh10td2gixzl43xi9ea2m8jurcr8n15v5buvkawi0b8unrfdseknvxjriw7l0fx4n9t1hf2zk7hx2k4ek30gha3t5i8xgs45ws752h9q3trkxtzft5a6nfwz18eup2wk759r',
                        fileSchema: 'rkhe3k2a408q78nghq4fo09aiaveutvns3i1kir3t70b8ei4vd2dgb7qdzw60cdakt8wm2hoceutalj60xl6wzgdc5n1g07dr0fekupra2kzqpilhu7ld65sajd7xadiw9htujffibbmb5uceadpxukj40r3zt05j9emlbqk9qax5a3vta5g99hia9wdjg03uu74t04mifxhd7vhxlptvnq3zsvp16fh87pnx6x7und8njk2yt029mbau4iainw052ebkl9m32tax4c92pcjbzwari5si45goy92iw2hcrmv6sv1js8fx443s6u5c5uztfp8n6zdelmhbwgui86irgjyzf3ii4xqod6t02kwt26vdslko3d5ewv2ok2j18al9ts88expr86lth9ztjvvwgjsfkj1jef1c425d05srmusuf9aqf7ld8kqhvztwlso87wrepjkot3giz7cjjp8f1bx8yusjij8609tz35jw830njpnco562rz7f9fcz6xbnaum3jnzhdvxlwcf82fv94degqqs62skatuq5rl9p0vk0c7n69lycuegjyu4zwq5udjp5gd9sgpbmkpfc8h53qlwtv8u10qyvboqyjcj841quo4j896nt5dx7c2v9a0gpa035326lzznq58fmnlm8ynxh6yo6w9gbi1axctj8i456b8499nym8vbwa3i95mnx0b8141isvgaq5hplgl784qrs9tgwxcp2xk011crofmll1abu1zryoplfjn5b7lh9jemngi8u1psjlurapchilp4wm5rta0jpn496ifg7tzq58pis0d6jfxxh7p3s89eakcpm0eu34d971froumspqr7m3bs57b36uupmbnvmvao9e1b70pdgb9ib5polzjqo8yldd7q5h6nwwthx9jx7zbynzdz85ymaa2ho1qjlbd8gq3q96czf4904o3gygx7q33srntwin2ldhto41sh6egiiz6766slw7mmarllne20onj4zrfp0shrgbmk2sll',
                        proxyHost: 'ylvvnk0k1pz6d8q0zbvpay6xknt0h5rylkndo7x8acaqkmpwe5jj25lcsnze',
                        proxyPort: 3726622844,
                        destination: 'rtgmqecz2j9hv9aktg8utnyuciihww7tbnm1cxp5xi95b1rcgggu9qply0us05wu5emqn31mdt75cp8s6dscnhed8mj46jt3xaksorjig9g4xzk7tplegjby908nixc2swwbv6xllj8epiay3u1sngmam2fpjbc7',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'ls1yokb3yfq1lfc5l9z3q23odlwdd25i5rbkx5i64um6n4s18tl2stsjo03nub1ygryzeweuph508ui589n32m7x101yjdh6p4vmlw8pm04srp2z5hjfdwjv9gb1nobasjphdck9ycy32slgs94vbknwty1doafs',
                        responsibleUserAccountName: '7fw09kjhwsd3li75hb8r',
                        lastChangeUserAccount: 'pmlzwwo1o8j4tli4gh2v',
                        lastChangedAt: '2020-07-21 01:34:57',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('2028247a-900e-49c3-a24e-9796ebc79504');
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
                    id: '2028247a-900e-49c3-a24e-9796ebc79504'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('2028247a-900e-49c3-a24e-9796ebc79504');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});