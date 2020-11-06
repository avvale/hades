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
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'gvqb22ehk7qfmqmgln6mssgqgwulct0si6z8017uwadaef8kl1',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'zsovzo19m84v8hdbz0cx',
                channelHash: 'aeru0xzs03of9mhyilb059z6h0emcjzj3el6gjz3',
                channelParty: 'eo7cf3p69cs58y6ahai0g5zk93s3yih7rhsse3p4vd4pwzteihsygbiahx1szq4930wxr3fwe888iz28pxjqlmffrsg5ziizoklz06sn06hjoycbs32nbe4ivuf8egx9gbosk7n3ufbfc6ka1ujuxqhbqeuouu2i',
                channelComponent: 'ttd78jya8klfyx6zxofygmimlma379q80yroezhgu5n0w990a9enmt7nh14c9miuaditmbzssvkhv3xsr5cf7s7dv1wim0nzqmdyblmo29q85pudrgpv5hhye6djjfxpyo7jnbjoop64959vf9rcgtv1qt4pxn9a',
                channelName: 'j2czofx2lh49wz0sria7sa42j66mcxhk6lqn9tthfz6gvl6lrsw52meiy8fkjajwiejpms49p9zin2wrv31v3h0rk7kapuksyjh2rsfj51ybu77iqk8hz55vtjpvc9kw58aivawb1k02gm6cz1kw5ga9aw5bemgy',
                flowHash: 'uqw4mbuxtg2nhj23jmcfcgfu463vfpjigup5lfzk',
                flowParty: 'zmyb74jbh7x4b1n79djo2svrck6g1w5vx7objwa7iqoz1nw5dz0sy253gp4hpo1x7nn8u7jgbfkhrz8vtcv9fryxa556ze8a8j7r20max6duityqblhlvxkadqbsvgsftt61sfboric6j80dx8lgqljd7b8bgcfz',
                flowReceiverParty: 'mecaq9yf16d2hyv5q7kl11v1q4oygqdi8c0glxu3bwgm0csx8atx2fsuth0t6uu3833mczg7te5rqp8i8781grnay5j4bnuq3lobj76rphtu55v30pa65ue0mb5iefei82ft85cjov2m8zf5bjbfwu1toc5rphau',
                flowComponent: '68epqc09p5c0o9rw9vjddjjihsxotd1qg2gml43qgniigrpegt6tlzn0pi9uw476ajx2ye7vtpuqc4utbhd5f8k0q0eglwb9qa8pmtmg0s3p2281r2cp2sw5q003pz7yt0gfnjg1fl09s3k2si8m49zelo1r8qdo',
                flowReceiverComponent: 'wiiin5bqnvwcfnkbxed77encmxo6bb4pdk6u1ckrsg0o1wez1vkoz5tnv6fhthzx4gb8ombmfg7w7zbyigb81mv4u6p83fmt8ckpori6eedtak2j4edcmxradoyfvksukw2q11v7mn8ckz37vho05w1e5pfrgcfe',
                flowInterfaceName: 'zm5dvfhsmpiioz5hmqjs8ar6y08lfh2a3li059tntwvcwr8elu8wu6wmf8egw11hzlchk064wges7p341rh30ahukf23nuqxxeagv1jlfk6ze64xna8mupi5buoh09zojlfnaf5sqs97gb92om9d3q1ewftz4vf7',
                flowInterfaceNamespace: 'ospgkj7cdvjsaaf8xn5fopg4km6tc79jb729blxyipepdhcu66qra4emaqg2an8um8683tlc5w439ois24dgorjo2i6qcw8kcow6m7gr8leitilnzdcsp8ra8onoribak7dddf3zkjyct55g5tmj3u05wo6wb8x6',
                version: 'wk5a29734fdo8g6di0c7',
                parameterGroup: '41yzrivhnfoxv6i1w5ysilpmebq8i6hdr735jazvo11eaf6ttw1no6ouy6jdz30k3qxvy6nqocynmk2fq5sre9314s3rqtt5ktj4qnblnl9ycvok0911zge4o2qdse1ta4m4xwsotfx5i6mfx12ud8exjtqitmgn8zarpqt7gh8d8wkzd9a33w510wjw7ioqxoqofus29653aktrmda56ip23w40vczs3z62vze7v0wcklix84tkl6y9jrdwm5a',
                name: 't4alsjndl11xl72dp81w6d5tubfvn7ozrqsh1ajs5yvagf0d4q4qsi7ore8bwhvs4qf2rftarhvop34dg4av4qup1ow2bj89t41mbaxbadcb46043cj3s8t6skrkojdo139ngljhxmdko0f4z56zs41f3hcf7yc8je58qjuhzumkkku2whoiied9j04t90hgmmiveb4b312aohaexty2eqzxp5o5fy4cr4muh6rd8vanl9wp97qfglgfvcfppxrwwyv51b2iclntr8t4porp8803zpgqwunj4b3q3wv8epdwxzdcyi9fprg0adlcutz2',
                parameterName: 'uafz44uix3s6jj76c7ae3ymxgiilboyy7x3rsbpn0gtduxnaq5y0x04lglk92c398gc0zi84wukij9xgaq69pwhhm64fr2fkrqscspq3vvbbvtgrwbma7mg7fl6fj66z77afhk9kqk1p12yhq38trkbww7pic5g0kegk0zzz0vhawmkqh7sz7zkeugfoixfybdpvcsawr0fagwjhgd7vb84vus29oepxdfw82azv2gd6t484aucb4b3baqx5c0j71cut44lk10m0cs9krbacabd9bybvcv2i675j0yblpz4jwjdf0llwytomn7meqcq5',
                parameterValue: '0bhhra2r335kk8ektql2k302nnsntgo698cdk228hpxqqljnsq3b1nfm2099hm9kz1x6a06vq31hk5ruscmvst296yavz8p5odvsaiwlov6w1of32oqeo4tflzyrwud7n8rk0gxzuq116vxydp5htqa5wnyfti3yd71bmg242u11nrgs9jzb29w4m9cvyu4kiwiqpmfpf4efl7j33k2vbl865s1r17ppf4zyrte632oieitpdq3dpsa47rriga9pbh0zpeyiv1ndntd0pirczn79wqk6hqxfe76a5mfbnm7ttpgubeskal8upaetre24yqsk9jiwg0u4jr69ze3saggapr1y6aozkjr0i0ybic3huimd361ox07a2l8fo9eobqly5nhbrx17rbonscpurcneavniicto1fyimsomscm4nygpqbg6apumtxhzrmyan99nkng2ynz693n69b2pos3afek7cgdtxgwjh1ao14o6lkwi5gpcst78emnm2sptkrecog17a862ul5s8urxs6icqzv21mlhc5mcllw270fvzeo4p3x2yaip99kck0udw8hw6nn5ljwe6h3tr2p6x384dxs34pc63zetxke44ku68ydlbd9wf2g8zf57hzvfjj3e4ylme29zkib6wfe2ggo7aeh88fi5sbozn79r62075n7y7r3mg9405dfi7g0q3c75132x019ks1angppeq029z45to72uxyc0g49l7kea1ogjfhjqzwnbgmmjmlj8hzq1r3hhwg54853x4j2r8r4lwqz32tcz732a6dfybrjaw4n1lq9nmud0dqxoa0obhblzuocwolagjkbpjsihrxm41nsl6n5hg3v4wwi7ib5bh7jenirc9s1ve9e0xnxovnm3itl67ixkm9aidtohca6hprmm2dwjmap7l9wp2mrtczf740b1k5grlxgvk9nzdxnt6lk2xvpf3mailwii4z2zdtvaq2a6iiv1pdpm0v01dwo2ba7crahl99efei3yfm0r3s4jly9au0fhzg7yhad3osypfnhg5e6i73ab3i4aeufewnvxvhro8afvkyrgucdje35c347mg4737ab3x1txc4y25xuhl9cuvepz0s4abtqwd6gln4x4v31u3bsqk01qj8w59rdfcevqrtbgsrlcho4hpq87el727kmsvvorwhhmq1jzgymww0rovcvp0an6i34tdk86gwbcwfwvw2iot4daqmpnt69ykcnhndbde7rm1iyentr3vh9c6xbefwh1eksnmhwqxyx4kav7avvldw80jv0hipnqcopqwywo30i743c6zvh8gd0n9nnio61mvc69g2liz68piy3yz44c4cbg7kudgla69018u48fygo9gtvatnstz9xpiv96prrlnbm9i45qsn4465ditkdzx911na4f7iuzjsnogr5snvoyvdr04g0m0jgw0wmcl5y0yn5qexae7v7g33h26ak7zxw3yr708y8nrh93ed00ow5bmjufpkjhr4o8sdf7u7oqn9y82wnw3qvkezt7nbxx7pvlbvn9rv6tqlwi6bq7dr95m7qwbtopys57wz5dnfil7nffl9jd5ktf7ejvzib6kscl18vrfimo0lne07og79ubkwyz7e7jdbbbhdbiad1mq13tw7noo3nc86x9sjl0qighmumt4wqim9zf8zmezvxmm4sdjm894xn982tyxqowk5wb5s0kuo2uz1tr4esvhxuxirsa0w61ee4egoadgo0eb8i08ctyn5mp03uhlcblv7nsy4c17wkty9a24cjzestdudennqy7jilqe8q2b1yj0jjk8jekoiw54vgfr96hd1ad76hhv6fgbvhgdfgh807o700qgbxnz33bg8hjyxjvny749os1xubyy6yg5x2e7i3k3vsklmqsyzlqnuqa2recflqqo6fjmiq0p6kgv0e1gvk2a5kzjy8lvv9h0zc3h2wxm1ynaxzrz7k8e915q2gc5pxtfgcdgzr9y74l1cxombywpsq9vw4spafj',
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
                
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'eony0r8rixnwnojtpercxmowui7negy0nc9dz3p3bldfw3vrrb',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '0lm047hq4txx7uus6wys',
                channelHash: '019acaj06hdw4zkvf6q909btpfgthaf8n2c6ywvs',
                channelParty: 'iuozw5ha6tv88x6wfhd2qq1ayxs3rlvf2ghuac9hh3v6yzn2tfjbbv4pnajeu10q6l5wrrcrwod3934omrf5iazt2hbpodsivc3cjec4le0r4g31z5dl6iupkxe6wlwxz6p8ugn9i2tbifepoloemqn6ao5r3wvq',
                channelComponent: 'q6o5kq93vbijlbwv9ejdnaojbw3jcnagpr7cte7j2ou30u3xljqihnbigq83hzgbpqw59okb5jy2etj9tl73l99r4e22yqtfq4cus9jj2r165datr8jhf16vwb1rocj6uv9x38kl8s5v4yvn0naiw4qmzlutibyu',
                channelName: 'cnk7xsjovzoutsfwx6nv57dt9o5cw1s2rpvfczwoxujht5tloj34o1ak98zezx7yq9horoujjqpkkhzowh4baf30f6iueufmogrmt0veoyaoo2exyjmr0s93vdviq8n55em7vwm3rxp904ykj0973mg24w85ekq5',
                flowHash: 'q77ljn8bt5xkt7zdihce0dsl3knk8il203vvlkke',
                flowParty: 'apzl6qtteghgewlxbopnj29x3nj8talhi526zstjcp4nekr463g9802l3iy34rdz6p0pvwa5hkq3h0aoni0bfv47g96d8or9rqt9tiwwoui2263ikupin8dgihdtjndp5qx3vzt496ec3b8yfblgsmxple7abuc1',
                flowReceiverParty: 'eeh52e6k6gj5usw7ab8xk0uyza7ajx26hubkuip4wb9qdphhh9fnr4ib6xub8lhzxzwaulprtoc95zna7cwve6cj0u9sir83194nu9l1989vwqf8xdx564s4ccr9w4dlarzob7xid5wwqlwqidvhroqsziixi7tx',
                flowComponent: 'd002vpso2r3f4e7yo4dpf256o6tfwleh6g4ualcrkmu213wct5mrttt7a8sb1g1rcmzum4uyqqz4wzevq7s3rafm0etcnzvoxw1qrvl1vojk0tcdqke2auf94e25lg034win7jdm0zdwuyl0zk98czl2ixbhp68y',
                flowReceiverComponent: 'n4tucl845jgmcbwnzzu3knhzm9jc1hfpmaundzv1nq87jqbqiwrq11qqj4mb1913b6wrqrumiyo0ch6s79kuh3z7moye9h0yv50zjk0u8ty6g8knpw3ds1g3eyuu3f9f84mz0f1wgjb0ei1y1sduik8v7dryjdwx',
                flowInterfaceName: '2bjg5a8dnhlji0t0qgc1p3xmh11knuyp54w9hfiip0ni37sr533r5eu94ggdvrwilvdeexwkx059zt28svi4mr1ulvadwzili9cp633lc1hqqtj19da7aerotayqixnacqkm4ce2xa92b1l5sgdeiaqb3kgc6fqu',
                flowInterfaceNamespace: '5h5mgde460t3w0lvfzabgwpt1se3oymwsbv0uap9a6ztf5ey650ue30452mvm6fskhy9rl4lvmzamfp5awft0tk18he1x78bbvrwwij8ix40h9qr6qqsrpzk2ziixykghu7ovhd8d8iu2ix4yqdakskgk0eht862',
                version: 'pl89yxgj1c93vksw2yvt',
                parameterGroup: '2dmqgll89llsuh6o77nlqs0cv9q3rfs9audpyv24yt7qmisc3zodxfcdbmda0g4hvi98ac85c7upqqqlj9vtg8ccdn6ww7byz55sbgjffv25321aegeje5mc5p9baik3tbvamz61hnzd52juhi8jwhcq1squjt2f0zsbg1waredut88zbo8x6s59u8a86m1dv67585lkf0bzapozen5xykl62l0mzhw6vuwuabonekpgqwot7u8xfqwy4wj3g88',
                name: 'tlzcmf4k80bkai8ck275ypv8nvkru6vl09x6ydypf6dscbr6ybskq9x7bhqhlmi2v0lihpmyedkfa6487iaz2qup57ubbkc5vfjfc6thgex4foqheas0mivmxejb7xxzpbu7y0ltr5oq8buba3epc09sx3hqcn01o3t1hirp91swo6t3346klo8ji38w94l5ccxcpp8zlm3d07olesoitu8l6h94a226ws4fm2c5b2j7gxmglnrrn4qkmmf8ud46wbgf0rxzo1kjcrwr38w9adbcfui6q662x870gesvbg6fgw3dfztf2dw5ms8a0buy',
                parameterName: 'vazwl0zeqny0yg46gvety6mxo1hes080u4j0bygig8qvs68eigxfx1suut21vk0sdzspvs8k5sti2r4npaprgdrqrznpui55w3ka3k5o6rg5lywxne4l67zzkvy1gwfeprjbqlyfjkne1hf84vh49tludqf18ca212vsvl06fhpou7rzthkoq2lndm9sl3rgfxn1vukmp3t49feaznznn9nm86zjyz1s86betupacba51sthtghn3t45luebmfqpzv4f5xjqopst4f60wtyx9swms4737jsr3ro4r6mu72h20p4kc8vo6vhlnh9r3b4z',
                parameterValue: 'mq03j0nvqh03v27ywhc8e0jcnpy0su75otsc2c6jhlsi6r4hwc9xy5hmas743qax0mypsoosrrsiacnqbkboklccwc08zvpulb161xqkbgieh3r83cg33jvzadj3dj2o28bm4fd95vzgpdt20jtsr26l65kvl3c5jr9ir0rs53ptpbxxflvlxtmdfa0ess3epzc5r8s64egi0y5azi32nw3znfwvgdiwfqc5s1xgl1eut2yuvbi7p98ejvson9mus93psl06fj6b9s888kn12sjhyklou9nb5n0pgjgls2qutu6l04sdm641ul98raanp0etyczgrcishkfqrrplg7mul1zyefcx2231i5ar0nqt6cqrqdzdq98jryrjld98r8ssejvjihxnzvytjckqsh1l5whkiotsa2bn9gox45x6ucd48rquq3hhahdmfrgcyn1frg33mnrif40fn0gkc7bcabkwd69me6x2hwerk0kkttr5i9z7lhl6jm60bhfy1o38mizuf51p5y435eoknbyrx0h2rzmdx4977hlcjus0j207ba26wwxx36338x7txzqj5yjrkeeiz8d0ia8ro6skvoj26d45vft6deped1tygmk63zn9zlm2dpsd1e46v4czqmtho3atlyc75tfsrckf1tb3lnctq985618dqd7110qfy76ps6e4icakbo96ntoxpq2o95r8x8fh5tcdzljzij7helcu7biji52atmb7pvvdtn6h72kv0pa9mgoyqzc4u6gvwqckh7cap5v6lhf60pbpzkksqg3dnpi6dnmdk6hwvcbmxj1vytpjhymrapxa4f6umma03i7fwck8p8vxrie0nhw0g3oic4v72k4k5nzyctm6crentvr57uzd110g6pewivvhp2bsnxsnsukrga7vyymjqkysc88eyb4m3k28baihgiqd7o43mim75q3fpnrl84oo7iak2oh7fbyxf93bsimlfcwbn15rt4dive3uckgvd8jeu1jo8uqhsdkxgpej092gegue2tdnig7uu1pciy75eur25yomq2qf094htx40tyznou18wx3z2czvbi9vcg8xmbge6wbx3f0unli8zm85s1y9u8w3va2m0dbwu7vl9cr3z3b7kp54ta69igdn9gecyavdz0xnemfvzlp1a1n8scx2up8g5cv6ai84dzef60gk8s7bcbnyx7mz7czyq0v9enhubhnc04ar06egcxbg4pkj67cagya8qyz7l23os7em8zd3lguei5q41zlqp28w2eke37y2wptvzpkfpt58h1jjtbhkp0mkfhl3gnd7olctu8fiq2dpcv8slfuth43w9fnp3uueb6p4zhftvp0xmhzw8mq87gcrtae1vdqkgj1kx39kdml7hsg9hhm859d9aex2b0n9zpznilqdp64i1riz4dmyf6u3suy88qahd859ec0zpa9cacd52ubbdlmmmnlbybfv22sc0x1dse0q1uwx1x334ujmf8bcyxtrm9e1xu36qj2g67ql5pr7ec3mgk12cqntmho1n0x8udl6qnvm1bi0s0s555c7m9xb4orpiukwjvr37p36ncrc8q79t91runqes0vy0z4nr5dbaqpnrbwt0kvbev3nmdtsh8hjzpmvbjo40m2p79q8moiirn4k7mxjpmv8x978azbietxu2k4rt85a8xusreqo03qh27jifxag3rcjgtjg57dt65kfcdrbieaby8d96mbh766mw39exjp6ift7dhgxuu8f50z5qhnu9ry634q8sqoyxn8ewgvn77g3tgnh3vuhpwyz4jbbgfedtbmpqku4lbzpb7j9x1drc68e0zqzwmt5y2crvjs4m4xx1dh0rx6vc60ejy2rk1beioepbsygjwqg18pyyzfvd7jgj9rjcj66u3h4cmojiwe58tv1l2th3hyqwdddzoxg1u9rlmhen9jvuus9v6ywn9j4te0r26dnz85uqssjkvo7cwaltekbgdi9enri8vykp2uuy9kiyxznar9088l6',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: null,
                tenantCode: 'ue2qvmvuvpt5snwf85n1gp5vlw44sf6jk30okc909o46e6fm5t',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'fvdo7cmzozvhefmcohs2',
                channelHash: 'c9k1xphnulmzxf8mfqg7tbzl5qugamwrajaygkwo',
                channelParty: 'w45vsksu07bujvol3ttc6shdsikwpwrdk5njtyd3xlujjx51g298yf72pcn5oci6tpn58mba68qzoc8hzzin18js7ewrjxfi2f773vnqyjhnn7biegdmvuzb0s7znky35302beafohp3lfsl2g18mf560a6y9p3w',
                channelComponent: 'q3388x7slopa4fjjpnwehvlvhqpus2b6yasjh57w7so6avrsnbeymprfvw0c8p1xe2a5sxyckadfu3yhe2ziq8otdq2gqj2om41amfo969upe33ktwfbbmrror4hd7vy33k0bczx955c6bvl9odzqhdvxb25vgvf',
                channelName: 'ze96qexolyx16gnsilhio24fnns3qnvgno4digmynitanwaotkh2peb3bmh5mxta561o8ow8f6ee776wz0hemoqqswv9zp24qp53osizsy09ewsx6zdejq61lr3biqvfvvm0ptduz74qh6qywmgvdu822kvxy8s2',
                flowHash: 'atjuxa9ars5lyolfvr7w4ga45sx4z0o1mhp3rirq',
                flowParty: 'rnj97o0fcxowwg2na9zfn0dx8t2idta35u6klcnhfavkr42yszi707sak6hw1di96nvbuje87r4m5k2fxwhnd01lny9u2l58mmfvowgqkmo6hw999kswhxw5opvngtoelj3vp2hp7up5gsb2i2t0s0zfeo1l1lyp',
                flowReceiverParty: 'dwabbcct2lwhb2j8stlgvz15y67yu8wlssee9whwmqv6gy69t9zezck9dgy7jpkb3ywf2jkug9pa5kzz8xkvxkqxik0iexv0kpwg496qouuih2jqentspmbm1mh7m0il7twiiz9g77soi889mxpunmwxii8i4x16',
                flowComponent: '2ajk7yn4vm02f1fzu4fqeexywj8xwm1weuatr8mevrv6c2ph7m2lezo8870tso30kugda5ktk2e727ryiufoyowkn2laxgrt5x3cm5wbxlua5kccqnv999e7rpsce5zyb4n7fz6fvg57osc9y5rdod1txctdsinr',
                flowReceiverComponent: '0hvrhsqbnscnmxa3e4rz24vjes6tyvq4tv8hom3pdb5oczahvpvanb2kxzu0ka48lxig6u0ft51n6p6n3a9c3lhfxpnctf8jl2g0o4tyuxu7ffqmww794lcgjdgiz6j2rjclr94919ogtmv70dtc1lu10tx4dvq9',
                flowInterfaceName: 'czcqrjsuzqo1sxrftj74out8ij150sjqtniyekn3l08l42lduge5envr5stbqwp8egg1sewjf3e7xqrg3c1eyiump845vm4rnf80lisro8uty4uqhd0gehrdpnvybh3zlhi3nsz9hus01tr8cjwm2mrx1faq1eaq',
                flowInterfaceNamespace: 'm2dvbhc4zqbzpunuhcllokq25znqnl76z7wckdnptrfc85yt8lo5jj3vj4a2vjik3rfg7t4eu7tbxup3nvvsmgei7vjb43guvyvmto22lomh5ghqweqvfdqhc6nim42wteyowpg6ixqi0oj0uz1zmcamztkd5d5h',
                version: 'wyyibhmsu7frvo1v0pv4',
                parameterGroup: '67vufi0se8tvdpykivokqcx1oz2exzhw8rfwdwa897lnre43755pg53g50vqs55i2miuzzoqat67xueslcsv7yahpix3zd8vt3f0b7soznt9d2mt1m5wijehe6er60nb0uzyb2jut3u9mqc4q98kwxmp50hsfi7pmykv9pabzcjk83mgsb96epha8fdmy9z7r58wr7d4hfxzgyzsbylahkcytwlfb30abtpjkj805jg3sulop9cf4tbb84ljr59',
                name: 'ks0wb3qe0mcgvxdjwhdi7ziw30tmkuh899xo5sxfxmmz8uj51cmxtaqf6uqkxeodzlrkpit8wkw2jgmmqjk47l3z76d28co2x5b2nfr5xvvi7y943r29ld4eww26drk26upvxfkd6xey6jvl7q71jh9obr0qhf8acb45c39io06osm07sa5yf346ssbpgsaas4kqm30rne3k9sv6gweahk0mp2r4xl0nyt4183x6fdzx7g3q0wm8pugu94e7oals56meetgnt4urfwnfqw64ymgh0hmqs514cqqhqmwxahlerkvzvy8hcbzkqkwhays6',
                parameterName: 'zxla8e8118who73qu5tz0qdctislkcmji3rc6bsvpjbxe43a8u5wynvihpfafyl32nfh2tg7ggdm204nkxvmfq2so07pnwrjqmptcghrd3jafnyqsiiz36xm2zmp15jh8vnilcr7zpntd2pln0rrlagttne77l1hv10j5prwhvp3ym4ihelg1c8yvf7j3l2f9jh903k3s0ylgy0u5628uxfnea95wkjezwnbnnpzw4z2f6jr6mqhzzgpj065thvji2g59sp1sf4m4rpff059ii7bnrz6flot9g2ib3x0576w0cvb0ma5vx2qyvdggpve',
                parameterValue: 'qsy4paoh0jjz81t8zj9dc1o3lfupim8onr2emi9ybbfsfcjf4tgltcawacklzcl7k1xmyab6qbz2yvz0thwci8u8tydenavkcfrju7fk8bcl7k59tmvf01uo3k6ag32zplfj2iyml39wykcog5qkgj17krbgvdb79hzas9ptjg2j0z9jnw22c04z9lgmu2w87hcoenronnzm2ol7jt6i0qtq8xrfoe90myljdce1eyq05qoiy4og7tkakjdek1r1zftpc0egwexgy0d2su48gu3poe34kmtayy6gk9rnii10x9vwwjrwwc9586v33d0o7fhcxovksvc6dktan7l91mtl7qlj26v5liawetgo1fqat9ulyqttqvbm319383yav1o707b8ym3s1zg52kio94v038czof5b97nlpshw2c5aclbwrv63251mmpd4ioydktrum30ry0ej9uuqfgx7fmi0r1nzibacfnwixcbz1klvnzopxv2m0kd8cv9elvrhtrkgm5882j1qejw6duj9skilav33udlbjwe9i6wbmrem4ay3udxniq7b4lcgbu8yh1kcde9v3u36wh2vs76srw1h20jph7w0pgh1xb05665j3zd99btuhz10uy237f9jpdxg435vzdz1iug69y4xzyvi7uver3p5cxkxp1sftclqseen41nvrr7bbpqtojzpq7xt185xar4sfoo3o6boreesc6v5mcmqsgufdkhaflqbxbh41s212ywnyvyjm8fm2y1nkf1hohotbj6ls0d62606cyuw3f397f18y9yqjqgfd0ttihfpucs3hse473fb5og6dp62icfpi5ygtbqblc3mjcbijo4qj9b94k0l2khkxzsg6fk0s5vtzwo52qkvsbymhlkcpsvl0uz15rc9rgah8tg1izd6ar8t6wajboxr5gydipwicqmx6j3co9pakxvf6wc04ljji4iivm9uu59l5k2shm1720wu0uxzzhlbmyr2w4k33h7ki5wyh3qrehlzdv1avxy8y83kcok4mqysqgdvqgg8uk87isess2cnfjk8446t2j8th5nr722v5eckl5j5jc35xs1tz73bi3fc6fr26judr8ustinnlfnsy4jjbtlik1kqln2mzu9hb0fma2jkdb0e68635s8tyng2yl38w9abwycb5hr8vv2e0nrrynpiom9phsvap2b6cbvr0vpjz9b41n1vtzawegjzm228ta2lu1wikm8mrx06a1hoqpythe8boqetqmtpb2kbsuyoyt9cjav4bzj4gy25o4ev2m5dh82n2avnmg20u90nx4vwbnc98rj0pj8ysu8f09fcevf7wnut1nh5rgqlqc2vmp4o8bdb1id8l6tgpg5872515e8k0vekour9hwqh23ovx1dlk4nrx3dk0nfa28j0gd158rhvh9hrmw5emxb5fydzth00wv6ot1fim2ki9ymiwsa6r566umjst3naeq28cgcp61mbngknypy355293zv7lsjt5e39tkfdk5n9aq98xabko2zw7qkg1n56pmam7gdnyltc3o481ok21mcqnwu0n9tsrk9et1d30xjc4dcd9ud0g3mimb0fkzsgw0e0edwppukfy1eyakiozt779qo9imeus0s82x4fgo5qlt22xomg28ah4o9cind44xgthw0jqgbidaxvm22piypz9gf7ldk5cgtuehi4yrjwdv4uohygaqyiisvnyj5m1orec4jezmuybm9hmf35twm237z6azw0wwcrhbvv21vw1fhyw5oeanghb30qbry1nrp0wmlcau75tk8wz4p0xwyug627y2xa930mv7glbujl12vuvm87vnfh61ikqhct99l9fsekmtsbyl10rnpsnybbgmll9q2pwikuax8ss5m3suwhzbch7ef6bkgxlppw38mogttb2hkh6j7vut34ftb8xdyewk7i46emcqyrqyaj7ri6anbqg75pjorzanwn2m3dhe7wlryqz6hova9bsvoyut8kc2c5ktzx7fmn',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                
                tenantCode: 'o2yg786xjuqfo8rdwu86dae07ll19bcodkn6vkwav1tvls3qgr',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'y5x2kkrd8iokrbtu4bqf',
                channelHash: 'huwkv11hxjbofr8ia7oqiyuywyka931epysqw2yw',
                channelParty: '0qp46hqn0ilnqovb55jo8m3pfow5xs43z9ynpbrg2vcfbvgx5yx8xmws1q2xd7vwpuj80akiyzu7to7umnlhyqryhtikt4afigd2dfi8w7qph11f2tpzwgef34vix8tbm9x47rr2cs3tma8i7jbwslb635h9clu8',
                channelComponent: '32dt688n4ashpxqh5ghm6d9wp7jxw1eb2l32e6cwzlz8008am4ytshv0bmgvaq4v471suxxe89ymglrfgoko4ffkooxvxd2d2zj8xdoyak73cdznb4wzaqd6t36e3j0g9qym2s8qbv00c37u4buuzqmc6ujnhimm',
                channelName: 'pa0bv39on2vvgwhpyt1pzt41sopowb2aq79n9czq15sztmio90e2536665tavemsjl18jz8enj7kbc657ekdyblqb9ah3y4adkrn5r5wga0jkt9lmxolegw2k1on8tlwi808g3gv4w75rctgy24yqbn9rpm0m9tv',
                flowHash: 'eiixp08f47y3j7nfoudzua1rjpzo8mpnxzieuyin',
                flowParty: 'a8teyz0mybphk558yd4rdsawfhqq75z1j3za3gselw2oa7zria37ys020rbmdxf03c13r6b6m2hrn3y1t6j7fzve9bgi4oma3jfuumjxy8fxy343y98t3u1urew5x8jdvuaz30cjgc18ofyvloeuep0vi18hg8nv',
                flowReceiverParty: 'l4xlmdmkhzh6cxtsdufyhakvzi9hppa298pyfx0t7hvgdihvmcbuutf5qml8giacvkhhvbeawwha8irx0i17tt1vdywgbyivnq6pv7yc7ucjr5on3nb5e6mszs6ie77jxb9plt2olvli8opgbhav2jc4gyc8fchf',
                flowComponent: 'y3zxpusk0svhceaeguvy22up64d00d988soicd17oyqx1uhbwgqks16trwytvzsjwsekla012fj1h8zl61pcjjqvpzrv0w7p38soff6yk0g8jd7l45mzwr2w6gqsd1rrk7kml7v32yllflqh40k3jit5gro3u5ct',
                flowReceiverComponent: 'wf2s3fqx1vm49ecp9c9ojw3n1kwaeannm7itzwswfat8iuf7zzmb2amzrql8h10xhuh6uuczavpyt8ncftxr3xhimb2u5ln9d6cygpxmb174r30xi3t6ht65cvb6ay9e2cwxquvak699z3alkcdsssqwwiypzcnj',
                flowInterfaceName: 'bksa4goll2dwnv52rxj69q8ggyzguhjrzp0ucvmzwcnfinj9xbcrb9wn7axsbv73uooxsn3p8axgo8qi9e3hj4rzxgw28q169isslnf1rn50gjwzv380zd3cfeom0965scvxk56e6s32nti6jr76na9u04eevxqf',
                flowInterfaceNamespace: 'ttnld11y1r9p63nfdur1q9hlar40b2igdy4eceyc0nbsi35lpsku0sioxgma7ci7ivapunkyjmn5gkgj7eilicsnc12424q0n7k628w3eplwy89g1xoyyzbdhmm0t32n6phpijbo415wbe3pvxtir09s0gaifz1r',
                version: 'nc3irki0dc46wjqh2ijo',
                parameterGroup: 'eh9ex3ztqha8nme9f1yyfsi0x1a8gwrrxq4x1tlowjh8mgblf9l58bxi3aapoe3si22kmgiovs11or02bqgltfous2f1m9qy7ei3u48ksgmltktrbcoprkjqcyvpjhcfhf6268vfjze4wyfd9uq4q7nmylj29gdko61elfj140z9zk53ozkab3389f7jbu2uk3xaqyg4n64hmkjkk5x8vierecvzudaoacbbrp1kswxbvvm11id5zexbuwq1ru5',
                name: 'yd2xpkje2e9vcmfcq4qqw3w0p5svljaqbycdsd98p3beqnhft1do5xeck7tsjfbhyrj0pmzc5m020ivb5x0c1k6gun90qyyajctxu6jqc7pjg6662b88s43i377wlbmppiq28a938so6t2skls41urb6j4ncvp8a6dd5t0dghnikfgyv7v3867j4ub20c6sba9lh55ygphne2acbil57v7ytqzmdb7qvt68vfe97hefe19pp8hpb6bxtyb1rarnzqsoh3v4t2yov9eqng6lepoyh3oy65axj40mjy32cx1ihggahc4ali7cnq03e1cj5',
                parameterName: 'yj2zxf2sojf51dxkz07y9zfmupzwrgq7q106skcn9rgx0hvq8i4ekjvis2avjk9xuk5uxoxuxzke8vy4jorhy3q7tkxvq9p5nujpybdb188ry45p63j0prktg4hdvup5vit4rifwmfd8scg2vyrhhong23r8wbqwl62piyrwzqneh15buli2yn46zdyj402zqi06jft12cnba680oe3jv09djz5693nf6x8gzrcr6i1a86e21sqlxpnmfb5im5mcnw20n50fkrmt98wi5bqtm7vsp9715fayo58mwmdgm5m2ly8v3ydo9zdxt1oresdg',
                parameterValue: '1xy1pe059z8to6nkki4pvz8gx3q5nb0mw8frvwrszdchqkpenawk32ic0hacvs4u9zratzddmnsnz7jq9ez3pisvl8zr27xam7vwhpno6zpdh84kf940yws3qmb7mc0w4gjhh0k0dlap8hk87sa7jn9gb6kxqu0ldp25v23raov021yxhgg4k82fs1r2v7pl2gxbt65tn3nmdgn5sk0424x0ov8fhvuiafygwbs8td7quqabp9xjys3s8bnjs0ioaplbzsoah35lrvmc4w4wpazxn7tsygikwzw15kzbo1ed5sbrwcpystg3qy5180hljoacl4skipzs1t6qmldfpzq1vy86gbeclb7z02jtfvdu1p4jq6xqmbs9xfjf5c5fdrk1c1kc0lalsw6510ewt73p74yjmhb0h7hhqejjy9kqg5htsk91oh0017ta1go1w1rqznmnxbayv1ip363c73pn8ddxilhh448ob8u0v729c5ukvbzw5hxkmqensdfzm630t9hmn0u9esjwkba2jmk5fn8eqgr1b1ol93e655i0iuj9u97k6u29q0cnqj6z9mj5gdrrr0ux9gvx8yhlt0k86onvcpunqcfi0eqrqy9b872wkya61ylcn5atlajq2cl1apfhltvusq6ubrfk817b6iwbvd03h5qo8lmihof0esi1yw3y440snxe6lpo74i2594q3ckgg0ca7bk7w7vh7r1634st30crsfej4m7l3ztzgjqdxjs6cm8q07tt6uelnup79kof2v6vzjm6o89ew396n2nyh6fjfnu8rdd2moxv1fle10ivnp41n0py3pa1pbiz51jb6zlwt2hfzd9rb9thklmg7ksk10g9nwlihj59j6narxynqo4e6t8csnm4exh5h7gtt105qpopm5c7pwmhlb85fendr7w4z56itkxtlqim8dihcq4ua89i122uf43asmzcy33jfmpunu04i8738l2jcjd2r9929vjfa3qw1rnm8vvn6ivzucyr3qd28qchigtb40q2cc5473w6gcmq19bj32fvty6r2e3b9qpli9mlirmcv1tp0nrinqeakdwzyxxbfonw71sx9zydead40ux0jgwls2a9ilqdqr00h0degd0ysdusr2acmzokc2zvcv4q434io1t9lxt082b4pg85m9ox586m65r90hy1g6xryem7eek818ewqsv7zu6yp1q464entdytvtwqa6w7rlfr22xq41hy4vgyo1lt99boglxu6zeid110y2dcuxzb219j4dyysgq9tmlqnga4f7g7gcbj7bztw1psx6cjaaxvwik7nmu5qep67leojdqx31bpdc18658ot8kbfbopgeydyjbqq76u64p9jujadgvcxm7n6hr66jbhmh0r937mbj4y0h4fru5ykmwuaskwhxzxbb73dje7z1slnl4q17j96eloagmxt83tu06xu8een91zsilorlxa2d7s0zxtpxmmu3jxl8w76jatqnbtg25yv2krf4usllbax7rg4wc807jp4lm5wbcc8t3oiqehe5x9rwdrajf0ofwma1m00ooyknw1s3qir5mvw60y49cldlq8r5z7nrfib12gmdjv1dk1yglmc302he7q1kyjg62dfgslxtxo48iyu9ubfo9w8artsureq49q5a670q8cwqn84ll2eq9x0g2d95ynni8egg5lzr6mrkp0oxm8hdnm0k0xeda9ggxqc4h9upbp9tcxg6rozdvcp9bb4g3wu7hwbh982wiivtiuxgwbeap9i5znyv2w8nk9u8drml9tj4p7yvslmyevsqekbnnlubdy4vr8393evkol9pvwomkko1n51gmgh4k5k3r0edajm43hjpuflad2we460k2vqt81p00wzxomt888g2m8u610jjrte23sntggcmicxdw66j0d5z4b8l0eq0cbfceaoh88uhj7gkbmqvf0yo1efqmxmbk3q5zoyupgmdn496pphqgn3x6t86v7hmzg6xgljx4cr8zyl8ensrcia',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: null,
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'rxlma8eytp6eeqh0byl2',
                channelHash: 'i5ia7qdlk5kjqrbyb5f5ndrzs932uwr3eckcorgg',
                channelParty: 'vu9odegz6ylwz7cde2mkhl0gp45psnqw7h5t5l3tjhnrqis4q83fxaytm9li653w2r3hn7owe53rmbf81bazz7oq8guvvhcellhc2pk8cjq128t3yfn7uoxj6vb8tomrlxd7bdek25c1s8himok4uu3y0ow01zi2',
                channelComponent: 'l39iwm7anf2ucf6dt13s4dhh0bb0o7qniblwux7h9du0l373vuiyn6g28fizlokw0uj34gdt9cu26t8eed9xo0wiphz2uqks34kqvmeh211qqjkquezccovi7awsfyu3642uwckek3fsqvq30yjg9pjrbp41ayos',
                channelName: '2lqsgmeb7yrr2ma15xes6273r1qree9fx1igp2zrgnpjx7h3lz22rpnykod1o2cnbhw0ppgsrubimtrtpnoklc2el7r0chf1t4hrs6tpxwggrm1lbkesbavd5rw14kewm70arc3c9c5eaes0x9rvkung6nt2ekfb',
                flowHash: 'wawht5n3ihmukjnvnkrqp2hjyr6h2bpx1epdefeq',
                flowParty: 'ff1j59u2kbtk0pe3ripqbwdc5ff742sok7nv7bu1tkfd0ufsrj1zdyzkp6bhodsz9yyjw95b6zse688y5vioptn43aaye9lg39cvwftu0yfljv2p9rg9mcxf4mv1x4j5f3noxoa73tt47ulqa8giwtucdpvng0qb',
                flowReceiverParty: 'njbwi0p5tpda21l4yhj2td248a26yrp8qiz0lv4xlgzgokowjxne0bxpgk74thkr1fo3lg2rdy69j4eysbiytyv7ujwjjaz55tw3zvf9s47uw09va5laicwydrpfsbfuppd6prfmrzpne9xescmors2lmbqbrdmm',
                flowComponent: 'klze3doh1ddwrx8zb1yrmf0sixefyur4vrxhc63cnkmuxwcd7j2ehwe5g3q1cghox9xpafxmdl4vhzdc5uzlf0joe5h01hvf0oe36vf8gjsqkux9ckkieof6e5o4w2fdxluf1fr6tdvmpaknoxq6u0w33w57plbv',
                flowReceiverComponent: 'v4r52cg1m4nkqgc2tke7n47gtjops7rivhsyq750he66jw5c51ybnago6zvwg3s4uk9gqlyc0fd3c14o207lcxeno8onitbtvr7xzaflz1fn0u6yj058vv6guvvpisff5r0gk9yrhi8hcvm8og01pq1i1hlsjq30',
                flowInterfaceName: 'nvsiyrcxuohvpclqfr72z7xhe274bz2mekpv18uzmo01h4f1ygnrgmae6kdvs8fztfsv73y4guhyeboib6qcxcqo5bozhihu45ls58tqvnj0sia8onuqqx5pgdu2ndt3sxp3phym7g6b9aetdi7ak99ee1uom8c8',
                flowInterfaceNamespace: 'gmrvw5jz0t1fxhq5gm3x1edpr07cuj3gl0atntptq9h9xtnqw5gur7lq1dvrlju4c7dsh2x5mb3hcb7nzt8x9tk5gcq0j3scq7grorm3eudtxzwxjizuaef8gzlut3sun226lu5vw10p8d9olr9bdbbeqt9ppb5v',
                version: 'cjdf9a0kjnj24e99byvb',
                parameterGroup: 'd2y22qh6d1nmwuz6r9y6h1vqhd7611exwhacc1fipufsze8qbdidjpyu99rs8cba7ha0t7hpr02ib77pirjjmscxfp52qdxggm8kyoiyrtg1bxbx0zp6p4lsxzho2pbzkkq0gu2go2ic14x3b02al3zxxwj1c89ly58kgoaxgluiwyel5uhw16ie7qxnbrmuk2pflarqsoozsrlqs4cf3sddsd1xpe2t37zptzxt0ccjpavp44kvj08snudsacu',
                name: 'uvovd0fz0s2t9zkc687rb01cdi84aauo6tq9unvrdo4j3x0uchvgo1we9rmafww76eeumst2n8xvbc7wmcqk40t30ire65llrohv5xammbh3s6wux2di43g68stfdfy34b7h3wdjm325xn4a1zywnc59rq07l0f117clv71iabqhy7g3owjdcqqdtg2npfkiyzvy8s2imtqj1w5qsjtylto6otp6wtlduso7mzeusrzgftug3q2te65170z282ublucu7u5wdyf2ca8pfm62umz4xd629j5fuqr18d3p2irv6f6ahl8o0jllisuastj5',
                parameterName: 'bw25pjum6atbx3jzmbyiffwdrj6ynlekmb3fjllhr2lkpr6ylg55e09bk94ujcgbut06rleuur15my744u42t8arvrgrswd11s48w0oyrd0zsrhyky8su2237fde6t1jt3jbp8l9ou8om2onle1r6hwvi1mrzayjl6w3i5org5co981wdrmrg5nys7xwb0nbxob9odnbpetadhtqnir46v82wq0wyfa64xhvtnndjqmgfidzndv15l3p7div045xua6abhxv14zno31ctd0hbu1bt90riw767ew0itqw8kzmnsledmdi566dwe1u6oxq',
                parameterValue: 'd97u1ld5mshmccwxfer5sx04qzx5i0i4zgnnivww471tmzlmbs2zjnmxgy523vwj0xepvtt6ko0fv0pvqtx12lj4jv8b6wvg1t75lbedope5d64lq1080fwyrgpg24mfza0wdttvl5g608d8ojyvw027frcimi7ixky3uqzqg1rgj4cmepam6ia2xbkf00q0djw5pwh5aypww5qeyhot9rd8np13rse3dha1encraho8awal9xvjgyk31lppzdzv5julkmx63m001g6ov62zzm1efemftbj4t61gybjb243nlopeh6umcu1riwgsqxurp6cw9oqbz86vkntratm8zk201bto31rgcfzkambqjm9ko7wzg8bk62w3oed459j7ib5u9rwcum0bwfkiitxtl1j9l6zge1mkzqo0yuxjftbsub3at1t0t9h5u4wt9jwhuj8vqhi57sn8gkhxpbswiyydxrb2iuiquqi28yibn1ds9ha2yr6kff9ics2ehxdzt9afa0nowj1cxo85aplj42miy30y6ihexe45ynnm1y8fqinehr7fq4to59xom5he1zy1y1iqsw9v9v7e91baoq5j8693kz2a73kq5fb8aq9thy2jzmpqwmr9j3kdaz8a62lmpg1ep9wt6377gp6bb1rv68zafui3vbl0su58ap1n7fsf2shyweep7jm5v82rf3clfjs0ao3qgmw2lbtjzcjeay7f10drv3od2k43r0q4xuzxb08lfuhrydvkc2cjuxqciqqojn2w1ai0dpg8ixr7aufozfmgiektxecskj09ndgfpp5zd4p6tsqcpfvpep7b0ifg2da0lstfgmxn3uo1femhmu9c19plbcha16v2w1v10g7qgyu1eo5c3iixfl580345qlyysu3a06ejrb8pc1iddh44efldjcn1wiq51080p8hitoutxk2ef56pjqjmd8yhu9ret8qg8t50812ltmrb3hbrct7m2h1finczxt8as3k2ecdmzqx3xbn6l7w7f0ieoggqbve2t6ic8rd6xh197an55lcbz7g7r6n2pyr55556j8wi9tr9ue83z1iif7nww0svhbq78lr801ncfubeqik9fmapzwfwdemzezmli72k2lzftnkskhe21bz8qfe1jh3baapmcmtvzr9j7x9od1ttyiiu0jkdsnff4uqifg5hctffg31h3xecp4d4oih7m0n43obu38l7qwniax2ea36onfyvg215bqc1h9ebxqemhf0fo1is7yuwptm3j412jdmxv7hvg5vw5sxlrijbxpmpt9ld10o24ar0v76asant298urtic6uyvvdvk7ppv7rxfky5eqodepko86jw300fscrl6tqqmi3v15ftfuqiwg61gy66as5gjrr1zzgvu9lbdx615wgdal9mdgpr7t32seckkojnm0ttzg946sj9rs2iic7ztsy4t3ukojjcrshqqwsihrm5uzhpt6t1bgbf086r0eb7xf9tqdwkzeqfmbijj52anfuo9v6rtuqg04t9cbvk7ihsuk6exvc20p72n071a2sbspz98qitlmbyy0h45lhh6k5n914ukscc35aefrwb4dg96rqksxnx0svj66juxdfcjkzmqrtlu3se38afv31ojuxkllwsh9m7n8eg9o9bp0962q3wqf7line3e81vln9qcb4k85ytyy9kngmeitrdm1cbdpy9f66r5kkqm58og4t6a1izydsq7z1bmu318r895hanyiohx75sjuyfnmom7irfiykwti9ttel83gc1gvr75htl4q2bxq98chywbjca282d3wrakggyxdg73epgqjgh1xq6trbwh1y80t0ihg886a5d61muyb2xpjhg2yg5qcg75nfj0p7nhw8985cccdz5ly5pyv7wc91gu72ulyn0omilunyeaabpuugxzj9bkh3jyww8dqckiwnb4wxri50oamm4v6h6bohw55ycnouckj8y373r53l9w7z89zq4zohzuidrq21fb91blhlhg9lg3',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '9fpv8rbj6c223mt7r5r0',
                channelHash: '8c3af0z7gf2cfojcfeokgs3xatyhqh4qgn9upluw',
                channelParty: 'i7y1w7vbqkuq8n88vc0tr6esjsveot081akyg2b0ypms2mpaiympq22lobgkae9ij86ypnhtk7w7ktl87czg4rec6dv6a9gla5uab6tagrhty445npd8coel9h15gloos4zpkqsdypsxscwivmqdstjq988fqncj',
                channelComponent: 'gen6o0wdgfx98o0im8gyk6xah24ql37pcdvk68cvzy5ky6kk9hntk8vrs7tgyfzlq38hsr1ju3r8frncrskbcvcdhdh2mx5qpv44m0fu2nh8in4zd7h24l448oh5iz52dvvrvdlkwhzjb586ww8f08dzwgz43wgg',
                channelName: '5e7echvo0uxl3xi1jh091dil865mnjcw4ysnuuna6f4625xbu5gyzlsl14zd6k1l1029jzr8x7jahs3bi9s5xoep8b2l4bg7js4851bac3m1aay4qe8507p0qw2wx6alfxvqhp95wbr0iypeshrhptv6dj82a70q',
                flowHash: 'h90o30hfysv336r7cys4lgocnji14l2vpul6ihaj',
                flowParty: '6qivu4a1bj2zmuzeiqbxfnohpajfyqxyhzdl4z4jleh0t7zlkx2lu7qddahre32i3qcjxmhrb4vjill0htt3yu68dm8z5kjhv7ix78g81gvze0pdr9m8vlxratosucyfss96cnhl6gk22nptpefcqv57pkissdpp',
                flowReceiverParty: '6l62wrnly9j10nnboyai4fga7022rnlddxx43rebjt22rhtdscolrf8rissx11bt29xad0dgtjmxm72v54n38155cntaoo2y7361x93uxejsi45s7u3ergly8hiyn3fxmgcfrrzfkep1aqxb9xabx5yfu75jkwrn',
                flowComponent: 'i2tqhz4dc0qdeoy41byhslcjv4r8nlhdj084z5f8smkjk54ig7hjtdfkmd4ucgki4csb29v7lmwyaitjsz3hirdjjrrsmb3u1c158wmzkkrczeop9igazpkedu4w6jr5pcced9ntzb2wfbfpiwe3bb3azqnsqi13',
                flowReceiverComponent: 'f2v5xqyz4qckwfkljgov1btud3sws8x2avhful1v3dko9o3ogg7nd0rd1k4l3mvno665el3luwzil0mawcrf5ky9trd1kji1o0a9qsjbjki74u7coa469j6a4b7kfjzlx1yjcq4c8jlkn37n3eqwoyesweorhuqy',
                flowInterfaceName: 'j17mqn6m4z8m73rimk5fyh985dwuhnxa46rg1b93walid0ginejmwkkx55g1szu5xsm4uo8tltcowfev9h4toi12yz4rcwyrk3bgki1kifs0wwo5hhmw4qm79amkpkykrdgdrksoir3kfxrxuyvsfoul4excaol3',
                flowInterfaceNamespace: 'ljsjxhz8wkuya2bvtgc98tazmuvnc7e40hw4p460m29lyy2wjwrhl6p83lk09ueswxod01j14023154r2u8q6vwqi8jchmwp4d1a1jomyoamdw3d7usz76g1cw045rdnmvfx1r4ze0tsng2xpwpuy00vjujfbx4p',
                version: '168t0jquro4pc4y3fyqt',
                parameterGroup: 'sc2xf0d357g5fdx0srorzuhcwic3xolbvva8jz7fldvwvan6sw3ltok5uonu45k8vs8frnp4auuab788if2s1ivgtw3hafc8zqvlfxzijix6971xe6n6i4ynd8na5junaeylnio242z6vitkwla0g22ckmrqcpjrmppyt3eiy7t4uif0lk1uy2m21q2taz079jgdq2irybxv6tl2ze50b2s2zyxewap9v9r1712gw8k91bru7zjxg44qffsspta',
                name: '64k748swe2zw6d2qpgc60p24buk3e2eurrlfe67t9nzj4dyeue3xy1ctpby7dzpvh3jw1q30n0b9hepowxzek7kfe6hymw7zjo6dqww78vj5yklalqg9cljum9pqu97s7bwldd8l5czx7e250pbdbfecmdada02ndzs3uuiasxtkb42asf271iuktkglc24oadpf4vgazf753p1ky8u594p9pka22y0epuzbgq8cuirsj4rexswt0zxgtofj4syd6jue0an25prms0nsosjw18fjiby0yy5auxuu77qm5esfznfhweplhxpmpawdi8uc',
                parameterName: 'o6fz8x6wwpomvvc7wjf244tbo2l1nzkdrlxcj1hckg5koh1evnwpcfwdfe3v3ycowo4b0sthur91h2t1ctqcegqpujvkuyiyn48exuwn59qahwbjhsa7mhs0dqfhjhxsw6njomjggn35u1l8r3hni5w7oz6upvo50un4wy1b4e2341g0zp4yamgsir3zosqnz7geyxis8q5qlw5ntujpqv2zh7cu2e833ex4rvrn9tavlq2173md0ha0ka9a5d6q7oi9uec1bvj5q61kj084wi45wem88jtomjhjr5stpzea8obte7wdz2ahmaza3sjp',
                parameterValue: 'adcwdo8hz0pcu12z1xjbtmzqwfdylypya3varhxfl5js2l3q3hu2kjfwv59ltx5eh72nj6fpev8ayninvhr3a8bng9enrm3wv5jk3bqjcyq08f6bajndu235eedfw0we8f75aa5x7pazrvorur52c9x5e60ezxevb8hlibfc7p372mo5nyjqx051i594qb2wsbm95a01un8g5rii2af7xcgxs7nyyqsatvzhp9gk6pc5iw417y2zcd70lg677js6ym6du85mqnsk2vhzbkm089dudt02831y682fybuggo8xxcgghx9n2k94tzb938kuu1krxfq5etwqo72cdjqshf4983do7i6pxq3xmtr1ql5u8nep5ka040mbn13evrtmw1wsdyip1ft8mmqp51199arz8rfldy900dpnftsbxkrbd8qkg2l6uyjna0canbxly818nh4jijhsz62uphezdrvf5tn6a6cgt6vfzwk2z3l2dy3giuq6u0de6bnq7rp0rw3svm4rnthpluio6o5au3sh2di51d2530psmp4ynegkndxefr505hida03y8mz9wzpp80kpfjfkvs8qr1cadlqk5otx2gg0a32xmspa3qpyepj5mmif0ukzfruptiqicppf6bfzzuqkiq885qv8gpyf7ikqk85c27yv52xadw7mdnqpm3bwp7k2g4b1vhz3g81z2aqm5dsxenel0vqhcinretjq4sl41bua4nuc3l6ac5aal7wngqv4a40otrn7iryxii4g25y1u89bz0hn38mqecbfm7pklzks8o1vq1r92rr7gr7s5w4n0i09zs8kjy76gtxgoxr4o5fl8nrf27tkgqcl2oq4w87mgyivrxvw8t8ps611dg5wr5b40z83a3qldlfi88tzz8wny5c0exfvl7ryny2rmcg4ixik5a7cfls8uieobbxs83uha7d7wgg2qtugivc97xa6oszjko1gncj1kv7dmkost2iu1i2hzbmabogii9rdtbblz2xe7r3qdwfexs6i2jtcr85i7zf1nimov82cg93rgcrk8gop3lgnp7ba8xkd0ftt194nv92009d97r77d2xcj0f2ot5iedrfaueqoirotw3kso1igmvnmcg9bl35lwovmobrv0jdt8kc46qcefpf8p30j5ykrnytves6u2n4svdjq9oef1aw01j4m5s1mwwe24lziy9p8g38wkfmfkacrtbgig4yav60kt10yabmrb7q6jzm8qeb6g5bp193k3k9rrvr92qpy2buaktpe0js2sk1l0cjw8e9ts7qq3x5lg34pc0yiwk5p54qabfit81320s9aw5ja4ba7jwazafzdk7i32fu4po9xokg155u7iivyyoi1up1kujtbvfh7xygef25akf405kdglpo9itbolnkmqz6zjoq09boq3v4somvtf9f2kg6twqb8ebmcih611aramonk5mokzml056apxg9rdt14jp5kpn1hen5u84byo850lvu5hsume5a67lymtl17xet9nhoowndxszjn87ltvvie0mkdmxe679syu84r0zx58fg3syqto90a7avaqx215j23yyzc5bz7ounxjt4pfa7vhxov2e5k4avxannvwysayoh4trnb49x7jkf033hfbfozh0dk82hvnj3xa1tffrbvz8kjlwt51582wa21ptc3czahevyp0okgy646qsfw7okhg8tfsg3hgyqza1nemutmik7vu7r4ocztfcxhy362l1oaiu62l9k1b93s1hqnmsq4ifqsyr3k7pzc8wuihh9t6x2iuxr3wdqu7wl0wpghoqwqxz234dutg8mnswe1faxrqtyn971b0lu8qxb6t4zuz1qe8ryygvyitqlqa6xftif9cebtv35vbf71ywjlrr2h2z80wp80u4ad9rofi78mhhnyuzg2kylrbdnymxkupejjpr32l38omum0g5rdcc00620136tii5arcunny99j5nk297dzj5vmoc9xyrqzt0agwc3ep13tvuc8yik',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '32wabjh3egd12fcsd75jdxivbnieoohr2pokkodok6xgmxtkog',
                systemId: null,
                systemName: 'wy9fbt3ni0k157yksckl',
                channelHash: 'o58o7er7po80nxfn8iij36fga5q7y2dprwcntekq',
                channelParty: '00yjkq2v2mchw5f63ma2kpij8y0fx2oeoy35vtay2x941r83eqqh3mz6na0qmlujng490ul1tf10invs29gsp8o9wfho8sgga237j0b1mjdmanybgsmej6a3fqlarray4onz8ho2jts2mgcpzmwn2uwdpz2l95ci',
                channelComponent: 'ztvlyso19etcgguomlxbhq0hkfsj5lbzyhhgq9dq1ihoz3xqcmsyg98at5jcxiaqrvawq0ucimvilvny79vxn3rfc6w8f8n6mgwgg90ikhkkwza7yvgptx60oh120xrygfja4f2hnj9kfbpfcxhvc2xotuiv4hoy',
                channelName: 'kkv0s0due8ach3x9mabydvk09d8hb3ew3mrsqvwy8iy9i46omccrycawqvujzyl2j9615zg7r6xqyoidkvdpqnqgs3p8sgujgr8qe3zc46uqjl77hna3e0kmsiqa9k7291a7el0pon1c7yotcmfvxfetu4c6et62',
                flowHash: 'il0a4brkx3aluruvul2r6eov94nlvwulz2vnu6ck',
                flowParty: 'wfk0dmfn2919slr3w2k9t0pqzhf3zawbsxj4zfu4zmhlkjljpn94gk9glmj1hhy6s4f9lehe48ukp4zktnf73yf15oihijemg3m9mr034g43slftng1hxbelfevycqo0upkcyxus140o5i3xvecg7ubt3jycmjx6',
                flowReceiverParty: '32k8s96bgsje0mlsi5smljgotub8po4rqlqpnq3970gpbojg5vwxgewlc0lt6wwacr6onim1jtwkrtexw0pf9rab1ymxl1whqvsldrvvix5y9e5666ce2wyw6lbcee4zr8jadnwm5gafsfwkhr3carf2vwbq4jkr',
                flowComponent: 'dvw7byxqu2ipxwajitsb10g4sh4e2zueyelnovnc15i8bom1iofjly0k5f30kmsckk4166i8x5c35sd4ct1hf2ufusjz6ce679x27hrmwn2h72z2bn5szevw230i6uzrxnwf9m5r3t56ma1ns2tew78kfvsb2e8b',
                flowReceiverComponent: 'mo6n0nlfjtdp4juxcvje1frhumlh7r7o2k962bl33pkddn6m0nb3errn7pkv6cbln5ohcd6jntfdok31yk45l0sjj7zedd8jfbyco7yfx666peub35cmt2mpywfvnkg5ymzgsaq2bbc790gqf8glm9ycd6supeco',
                flowInterfaceName: 'm34cjt1qtlbp2v7np4prvynn83wc2ktcj575lzo8r41myv0uaxzltgfj0rxpbxvaaj1sfhugq5zsh0ps2ogc9oln888p50ds0tcaz9b4fv75e2ar8mnndu5ejqapnysxsdizjkyqgyrdgclwky767f8s4eb9ylnt',
                flowInterfaceNamespace: 'lxek832fjsjoexofeognggzmvmqn8nbuhad9xgq05fhnwxe02wynssd32ymjdl1zkg3i0r6iksducusrc5kp0zsi0cfo95mocy5z6uj5j58v3sz3o5asymouhckju0ct9g9bnn44hf93isyzudt8xj0n304lp7w6',
                version: '2o0r1ybh1pl2ti5ifpoc',
                parameterGroup: 'iebxr1a3ifxl7y1inkwh28m1x2lg3zba2adxyif5zpnncl38exdbpqjghajte5k5i1rf09a49dwxoyx7ca5yh6efzb0igxmeuiwf3tdzc2cu9izidaeze7mt64lpfcxzmkzw2h0grfdwg49ec7ono4uywosp25auq5qxa2fjeieim04kk51rtlfeckdputav5ler82xd5zw8hepxxm38usxk9jspah8h7s64hvqkrngsduculf25v68sq18hm91',
                name: 'p42ae9pf46uo1tu6h43ggnlfz770wmx4u8mqs412cp8bmh7ielbfo8gcvs26849otwi27ecum2cs1gft3fshr0irztg64rgwxkj0wx1wb10fugp4vfku6opdf7bdyscf3eo55gwh3ljnitlyekwzqbp46r1kt3boev3tlzt8lmh4kon6b868ugsyobxgfq6h34aph39twd3y2dzoqhmxcem3zj2b94nbml4ksar1yn79mls4tr444rnj4pgo5uoskvy80bgq102w8wm5hlozhf4usy2z3yeuo92o1rrlo79qmxlq115g7ir7qgj2jh10',
                parameterName: 's15bbmdmc0f7ycjygiohlql7a4nw2nt48bd09csbeso34majwh56mrnbhlyugn786hq4aw05vw0vp9zpwjyrl69qt3v3gtce4j0r7tooyddizbb1v9dtyicthnt37kin5tdvacrs59248o9w0bpvy893qelncm90fuors8aqeymtv4pedep1zxy8nwnrzrcs8kq9iijkyiv2ixf2ypw8wde5su04xx8tvz6z1zpcicu18rp5vk3fpewpc9y4zq3ks5ib70gqbzkasq8h2qa3kjctkbhgnq1iu76zfg6ehrfnkjrcv9be3vj68vk9404m',
                parameterValue: 'kkfd066c7vru22esngjkielph279026bd04yrcmbe970x8afaz7794zixs9cd3od4gtorhww6tyswt5wo2de88f5spvhp951qsw9ihvj11v07i585h0lrrtjklm0bm0htpmhc0eenmhgs7si49yurea76tncwqcyf7iph18bculg49tvu6k7byzcioal1i1tr4ujaez8mvxp5lt63i68nhz3gki7k2l53gipe9y58de8vxvt2x7l264fz2ka49zy3j283q1mgpggs3b3fpq8dfta53lh2ws9kednwoxk0rbacy54dzq2q0rmvit8yx9m1awxpblyz63229frrmkt7bybw8ja9r5iee25gqfrde698fw2lhqxxdt0d2wuufxcveox07meetneszp85c372uq36b3mlmvnnxd3r5e4zijbzbn6y0lm7ku1vecxvtf21l4d4yxawbly2qzhh809dxvldgb3s1iwh4rzjifas0m4fvzk7fg6fl1dnvi0m9otdgju3rhd1jelv16lxp8wuox442rx2fzoetr8v97dmcj7h9co4q8bcqr48dsr646ptna2jy0fuwfup5f7m16gbkw0pwm5h13a4rwwe3lov2gpjluwg9q325a6g3dupa708x9u3cwv4s9zzhsatkeuh1xhbh4xxbk5usarb6p7zp4dkck97kxjju3zbdgtnw4u6izipshiws03mhjfeglqkrtoikxnqriscyte87onrqpci6ecezufskvafpdktpr2bstzw9x9h3cd5vl9qmhzvdq9753o89klt3tfq3h4zoqlqdnlrhwme5255a3nc1x6cu80ax7zdzn0mou4h80qo7rmegtx2hb08mtatdytpxzprcfkxwimmvyytbin5rb1cqpfb2yh2x981yo88xw70uvrm6uc2sdfh73v2i1dhx4ey1omcwv6zvfbxlyh39deite5h7wjk2bsub38d0fkqrdsltzwnv06r6n73elcmsf5r9dxh2gmcs8qgj5uy8m9ivafinqcst8cmyuyq5ngrq9mgctrsycd9yw8zz61c8da510fyc3oh98qv3vns3sf8jooixs9u0a135twey5du5shdi6ftbm3obu9hxkv25s18eedfjqr3qoz9uenxprh9faeo69feogtrsuhj9mdg8km9zz7qcma3vkuobjn2mwbblnh0rvzbnv1q6e2h5zxp4c83x8o8aymzybmsfh9bb1ktc5ks6jsn93c68blo3wvmr80u4yz8i9m6whs77saxo4se20aj7gq7jjpa94uw0qyl9ozb4lsesf6sxmzriyymdr3uuf1oo8kmh3h7nqixvecez7ge0kdbp2966d2v6ob842lijbpzbkhcs0z3ldgtvij30zsnlaxp7dk22tq99908btueze2op1ug0q6cmnfeev0cmj2rzz8vihyu7eow5rm4ketxye3dh2sozwmg67wnqzad9renygvfbjh5ijy9b6vladkui3t7t3jfvxts3y4sn6500fdxdtdhr4t7d5tpo8wvw9dr1lyat9h1n0xphxb1v90s57o08d8xih6lwt3mkwn378o27i1fkc7j62r0h4547t1hpufoai32frpqrxe4j89lcgw6b87ay57maw65jgrr95mdgfcbn2tu8n8s9dyw1imotcq7sk66m74h81wvuozqchqutnjfjnyun6kmlvy6xow9zyinym078eu4po4opj29v2msbufh382hujij3j3yzqv84666durekxu24pk5vw7n1gjvn6mrkmupvl054f1xwzqn1pyw12kteohw214gxnaq2ov4pom39w3lq8a57t4dkgotpdbyvq79d7nlrg9vwj0g0zosk0nbjr6bi4en8xch2v5023102e6po4un1h9m1htmuqm0lruufo1y6wrba6haronal6ox0fnre4n6uubw33s4uifq4h88tc5phzm55dsaphd5ic4gjrfaig41qsj2k7himgfk2a3dyra4lrb5haowm9oq6m9rsllz4m2n930pbye',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'saprdirrkzprohion33bc16f5iope9t2x7iy1w99c7zuff3ree',
                
                systemName: 'vl6ezq0nyoaypr1wliy0',
                channelHash: '6g4ck65pdfjgzo9c8lyzo1h57xt9coma50wilvjd',
                channelParty: 'zbcthk6lqsqfxjfy9gyn3iukmzym2pkf1z5j1x8nig1s9fbzei5r0plhp0oy5qn5wurd5sqf7zi4agyc28hbjulwxlshtw31a9ddv66qrlbj3k75o74tq65eacfyjsbdgnfieehc9k3euyi5j3jkazt960d737yz',
                channelComponent: 'g5goeqhyi4o2hnl1sjxtlo9rupt7pg6ls8gkunb8l17ljb02pp31my8rml86u5o8sotp7jseyo5wt2gi90llg8zxy7t0gkjoj210g2l9870kx9emusfsg5mz0hnux617l9vw3w6cdm2hugu30m92cdyt07vneg4g',
                channelName: '0c3hvt3bu3rbf1ujwrlknlbrqu6x7jcn3bkij0ffrgisb2ywt6f4wm8i9stcth3qvkg55wutb3m0sxzh47lwu2hp4eq4ked8fptqkbrzlc3df9di17evl5miw4zmxzzi61cf02r6amo5woic2yhbl6vh8a0yqnab',
                flowHash: 's7yvztnhzz9ikek7bb7cn0vs6krae8l1vlpgseve',
                flowParty: '6u7t923z0ivz6hb89uqkfo6pv3609114bo0axi7593hwz8qjw860qmmpfdksfdt8ff1z34xchm8torgt7fy55rutoto6gvdd1dgfx9c802dg4t1iwl6duj0hgxn988dc447h8rzbf667n86ik3j6dktfz8dzvwce',
                flowReceiverParty: 'bndxv0muyr71o088o4obmr5lnjmxni8fntsbmtkupdybpjm98mmjntxmv2m431kop0xdibft1f3q37bne0ydxcxizycf8a46n3g2jm63i2k6or2o3pg68xclqexnsymfehc0w6otk9wojnxt4o077lhxg8l1w3d0',
                flowComponent: 'pwpuizbcn6lezyksavg1k4q8wnktee7sxn06bqh0icgs9ynxk0gyssghx1w4nhybqgeflsxc5kk9mmgv25pzc5fu8d46e0h8cy5mqu6g5v8ob30uz9y0jx3dkwfhjc2yv2hrxtsex8gcr4sio36mavg68e0aunei',
                flowReceiverComponent: 'sgftfr6lnwzy3rzdlqocbcwer3t2snr4n97ekoymst705axkikogaurbds2s8wphxqqudkphq1ot1uboesauhmcy6hzbr6r7dyui7x7z2avs6z62lgde4gajb6uswo31uq7d038zs1lp8ohmae4raytpk8uo1klu',
                flowInterfaceName: 'tapasevvskpez3fp5pmiaxb6mspzjjbh9l3m8nu78xz1f6i3kaqhrsuh38sbratnmnc0ynzwdt4oua2ry4ioti44hp231ao69hf41mucgeu7wf7z3s73qbn925i8mqsj685amjmwq3921xic0xn6s78mqev6hrae',
                flowInterfaceNamespace: '4dp6dk02zqijnn478feapautctt50maucokbfoln6gv4y8p6chmbsk8rdwisa4x5pbgsu9ybed08g47ex1puzw357f9uvew297bpjugcpgrxkpqv8j2xz8hb2k7fxb9d2ept27dtuaxihl9m800ab445jem0hojt',
                version: 'y1tu6xydn7w3fjhm69n4',
                parameterGroup: 'oxteypuef04n61x8bc0pzollstmhjphcss46xumqjcci2fzohufnol2g4fwgrzw923z0nvlo3zi5bgpukg0on5nbjaohz7t8iqtbqtvax5l6w5u05a8b89geqxckpkmeetq7pfpmj4xphtwvyylh1e8rb06mxlfeiqn65phwjgblwdthwv3mgutvyq6rx8vfmkn4a7oqgvs2rhaincnftekvom0093g7lm5mf7sep6a9sn9qy3xep12wr6h7ei6',
                name: 'ogemve034a3j74i4fb7zujnod4ccsduk70x4wmni6xfsgbd5zhgeg5dlmvvoc9r137y46d8tf6ttyp8eqfskrfc8ozougkajq5cir1wgiwprqkjsyhjx7pjubipjffintgml2o4ze4wt5am8zdjac1vwrpvg1a4bolnh3zribw5yj7ogoauq3qvgjbmfcp5yne3qa0kz9wfg118n7bhjqo25ho1e7yzg42p4al7nn5yratuhbnp95unl2vs5yybybqivz8yule907hz6qlzhdyuwd8604dpvp8d1nnljdfxor0fj7jpzui2s3e5pswl4',
                parameterName: 't41c985kgnw3vkbvok2za244hde7lytbb1a5en8mbqviwv8gfm4va99eyka69ywl49x32uc6u9eohkyfq7fu2lyd2nplcjd16wnl465f69ciask5qs52b3x1p2trgqcbiot8llqcfu36cailnf5kxu6noz13o5xv4ylc94vsb9m0hepgy9qtbila1ky469jxlnd9oapgcasa03xczpaa2hj41cnz4sr6x1ux2vbguyia0mlvtz4k3wmroqinrqmuobxtqt28514vxvlpb56vz4amcflqdj68i51bbakl6qjuz54vo3dw3avrwpagl80h',
                parameterValue: 'w3ydyoevcomwnteoe9o8y65vde69lakdodnkktvywdvmpakb1s7yj8hk92nl8tddxswuvyq43j1leko3s21fuxf28snbi4eu2qtdi698majwwx7non6j7atxrefns9l7695im11n37oljws08mqh2eyxv355sl1is41up9u95luz7f85o6q7iq7h0tw9bs4b8jrmchlaqhudclsjmi9tir0onikgyai5ifbfyfupbyuacrb0ng2dcbos0tvjtk7p6dpoknhboo57x4fuk0ia09yhd96uorfy8oeqwo0v1ffes4requ0dmgj4ok3q9guyhq3uvn38to9nbp2z5a9vb99ea9jcy5yp7fmtxzbx3k7vhks8wxpnix1chvp51f6p350fp6evtkl83m0se542v0x4qnj3gd3nd3xz6rpj8w76v7qh0b8k69i9225nobpvhna9k8y0ja13kvkmb503e0b5wkapa8ulgrubsm5prt2s7zw3v3461qmdjkwju1bc7kgw2jq9htm67adch2oqim7b01h9am73dlhlql45vf6ky3mu9nxs8t8yoa93fmkk9fibwfwdcbt90ruoijiumomxkt3b1om66pg4lm110rjcwbefsehriiip99i1460i6qpsrc3rvikg5lanbqhgbhidkctx6992vklgon64ycrnh148802wd3mnoykmxrtfsygsofga4zcritda3huvtm98ftmldjxxpv45p4464krei25xsda4nyseqyz2kv8cddmene3pxs66dqegervxai12loeq8p8rh149yezq5etoqfcbq5tcx55so71do9nfu28gl6smx5lin8vn86xzmdjyjv464pu0khjegao9m2fcs0vy5titkqpod5f0wumaa1ymi57xrfpzrmll5tpmju4paheja5edvh5alv558qi1w084fzcxhg2ngxai7pmc5ve0o65p6q9u1hn67zgmlyml3r0pboadectfvvk1ycx0aivrcfr00wjhcm4eygrg4nepdgi8d5ujt89h6vrpma0pmf2k03fv7lrdim5gh5j0007gexuu081szhbq1psfoe2frwd95hb9wgzaiu5fy7syrqe5a6xs7wd0lzdlndzjg2fyqz9ha3cz2vdt0lnf71dktj4023g5l10l0vkwqkjcr2ngc81h5rr190gsfz1yr77jy0dbkklzf9uxqh4866y34a60rwwrr610wsadz1azxtjtsh91k0y8j2xahvn374dy3p18fq1q2skv31wm9sq3z7kvf6ovfjprt5jf9ivc065rbpi9ypzazdach2xwhj1sg2g5ih1rlznm2hnb5t04ms8g34msjcwu1shsojy7cgc0r5olacjo157siqaslft747eyrysib1rbyogrlm8aab5cwxz0yf4g3w3j0b3yie26nrgxihbrpyo4aux64ioprlh6lctf4cedkpu61pqp7lo4e915a3kpdbow4xxg73rezorm6oc9dzyzun8qgizj2a8us9vehhw3hwvefauwbd32crm02qurf01i0n0bz8737145urf7foifw67hwvfd3kd30tsai3avvhsvl1pwd7muwpz5yjrpf6oqt1ncntxw51s7g0hh6h7po1hpy49w4asza5q9uil4t1sqp0nludrpn4x2n0xhe6x88g90zckgsogdzs0i6wxquu78gi7zcdrq2jcnett6wgqc2krf6s5lltxkqm4b21vq03imtbf3b2lkkdx9yn7o4gu0vjpmu5gswncdom4art4zdqa4c1w54ucizeay56v0bq8a0hozksos7v8oiin527r15dl30j5262wjhwh0xies51hyb6428wzh5xzktwq0vew5daaw8sx52n5fues9pp3ndytunowe68g1fz1hdn41t4oz1p0s7rixf9twd7vv1fj76n3kupl31u1cjbk2r72311l66cue7enybkggwby55netpyvoj2el624nnx7ql5mxp06o08mhsy5ray91g8szkuum5zr1hlaqmnrt5tm1',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'r0ko9bbnoc2k3gu77ojgm8xfusyovuwacg9i0p63pnogx7vwy6',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: null,
                channelHash: 'fjgi95iumvoixpt2b1syppvuwzecthovfv4galxn',
                channelParty: '5ljmm8g5vqkvha0x8w4yp1atk8p5x39y8ruqmpmw4x4y96ezwtnu2lq08j6bmt97fsfhd4w1gt128g38tuxglbq5tq7cix9a6p3iagvl1vmckfcuqz556l0jiv0oz18hi390nji1vqq2pu4qz9ipqjppghj5frjx',
                channelComponent: 'iwhwl0cegax3u53dsbdxcwmp9jkvix3inkzy8qd9qi1g4qwdxivvqz7gtj87g1du0qeymedr4rs87zrpc26gpcy19qh9z9ykzn3pfhysp11by2vth3t2w9tkjjlu6febs40qazys8e1qwurlphzawlhurihriden',
                channelName: 'p9gfsvwz3qqs8gl8jpkxp4o8c5imopi6pnh6vcl31izj3214bs51zr5cspytzxijb0a8xfmb05cruxkng4oe5n5yctg0p6bi39zcgziwbkixa3whwbs611m66mrikp8lxfmflbhsfjy0v6j67n992d9pcc84atzd',
                flowHash: 'f900ku57jyt6nlofkpt71ezrnkans432mltt9wb5',
                flowParty: '8poblpc2w9mperl6q9clytseyvv0ymudfnqsf0fils4700rtfkiw4sxzhbnsw5a53umfqalzsnvryupogwpc0hf2h9cma30x76lkgvgqqp8kf3pimbp2u9s4lx2dput6eb8zuu7rb7f2x04adyaubn4bzogucc07',
                flowReceiverParty: 'm2f98drooqa8zq57apaq01lwg25hwrq8knj6lc0p9h6nwjtcxjyxoevwa5gjs9yl4656ulznnzzjlq65lpv9gua376grhvhbzawfvrzh5uf1vc99xmi95uvdovopjojgj7iv3au5gzbibwn4uzrz4g3emxtudkbk',
                flowComponent: '5s587u0g0ebo6mjxpujq31b7qecor80bm4r8i398oqo5cfzdmd0tdo9hojrd5hkcnr0xvqfug1vdmtoujiriqwqj6nsctswpm42vf6jghkhmozx354sd7ufv7zj194t7gm1bx5xf2i6sxl4x38jt7fcsogxwxlrg',
                flowReceiverComponent: 'pzukurj4d4fptsuk0pu0a3sqdbml3t5vg2win87n7btq4au0x1fndgv9sfp2aajumkpq7985mtrzwqhm2uxs0pl5iy1pz9rnfmv0yj7hwiuzsrwue4cw4e8r31h5me2htlz4k919wtztg220ypgcr1bcoyect8v0',
                flowInterfaceName: 'ikvo3lz2ato136rfx97ntwsuq80zsnw01uidv8eqgr0bth6zn2ut5rnt3y3n2fi4ue3eaw6qc1vdm7lgfakrqky7e1erfjrclnixxt80auy6irgu0oggm9arfn3emm688pqciavsxslrqukpr4xj92ijhwu29ci0',
                flowInterfaceNamespace: 'ooiu8hqz0nzos8zt00hye8tdrdazyxcmqnri5oxjej01xzv47sfdsxt1y09ame9k9d127zzecjrlnweg5epshrz7ph7vg8x4fs1zpbvnzjvqt0l8ccfy9pethnwv0tzfr2i7jljzwta6bfuezwneuuvw04tgr9d1',
                version: 'r7bizh6rfa8fa648883h',
                parameterGroup: '6mhnsafwwg0297rxi2a1ccqqdztlv0pzj78l5koosnz2fozbzr4e2wouftp89vqrvhr2ppoa3bzvssf5uabfkxh017iohdub5367060o5t6x23lzhlz2fkqew8xc4kd7c7ne4ovcw2kxvss4d54ph8wo3o4muxumt0svipl3nk78d6b2a5mad8nfu7ut64i4zsrx4rgagrxv58vxw8t4gtmm5qqayd2hnvmcekjp3gb9eiq647d5estmth693ww',
                name: 'r9ws3cp540xs5so7efhry4nnxfzu8p73qxj4lib3sc1yv5o3pfycudodtglt8nb7hb4zjyyx2l77uko2daur71iywk0js5ux9ayoy0xqkoehdrsu6qy8dzbqtxehw7timpver4ngwljijz6886gcx7lyicyejnrqeavsmv3vt132tezp0xqczcw0qbs80qxbhrsgmhhr1eevxyej9te9xqe6zsk5y9rdyjh80h8qdaz85e5tchupj03ewuda35xzb2r2xij7impo2i3r1swcfoc6sq03222zwgv0vtz0hyplnd8ki1ru4fvag7nd8qp3',
                parameterName: 'e1u43f6d6fhxid03xf2n4x4kn29364uh42u4oexyozjt3iiiyiaw7s7icswvgkxqhcr2cyfhs8nrtn4z6j4ejno332ztu775esk4se23ke4dxgm7by1islh5ffmdw3bsj34u073rd3deyjv4t30kf7mv72w55wipt0tau6vrts89f0wdrnshcz7ynkhxelhqoewnivqvs4uz6uamz9uid9airnnxeksq4a06whtenhj07leuf1mtip4erqv808s9mdrvy319ga7rxpx5r3roshsb609xoz9mxp4b37jkzbhhfx191krl2iftykuntiox',
                parameterValue: 'm992rxcx3j511c2yxf29y6lc7cvgz9q8ci0gjo5vrzpgfca0khsvft7bu6hjdyfiy3fuyzx2d2id3n2z4u0ufe63otshbaxuagevw2wkrpsy85lk3ope130p3put3gx4cpbh63esny94oinwhfs1j7e62sx2r1xppl3ddy1ffm0lbsj7ugjb639o95alzrx59l0f9d285xhvnqieiy4e34nu5fxxhny0cf4x923zj0cdwon26aa5ue7l69fx1zp115eo5c8etnyg5p0j4gd6uvm7wzly407fx8bt7ji1nvjg9jnat0ovvwemr6nxuksrtg08iha9b4fgqhzwojovqdawdalryp39fz5t752a2y9nefccy04ehkh0et6tk9gd5rdf5be9z843ovzobjinwzjpsxsr14k1fekenqdublzw3ung9fwk2fk9savv345chwkhdl3bwlzl0t3dyirbeyv7ypf3xw9acw8j0fqmm3hc1u71l483tzy50vzc18i5h71t4v843ftihhvfmmesd3wx1q57z220eeiosocs4x7kg7h7dtk5gqvj18fyqtdykx1t3vty0s2kj2fj0q4o6hff49h1gdsb64ixxn0u7crbmmis1qr3xwk89mdqoco2w91h1xo1dmxvlk3c8ju03t57jk5i8otaypmlfzwyck44r1kgz4hjk2egxzccxchphju4nukeo3i404uqmowx9azdiza9g16c41lfy18rqysiavfqtm1xbc7jv67t40vpmgu36ape7841fvosusodg6sl2qllezy1ao2mm5jcjyl4n2zn34v28cdxp2vw2jvhcglubmzdjqhrvy51d92vv3vcavdx9b6o6s3k4nmuaf74so6ypfyoithnsj7mdoiws7aq28leu3onlaz51xcnudy5zzqtkjy92qdlxu0b1hw2mlatd701wv7vo8cdwvrn9cf84p4alq0y0cldgwo0fllr65xha356oyedzt988bagnym8mvtg6wtkpis0j9es9silpz5dnyw28wllflfcup5p5zrhdy9hjajtmftsi9v26odlmxdti5ugtu2ejpz1cp9tmtmk7pzp21af5apo3z2usfrp708uhrjmv06zlk61m017imx0rxl1jsfmwpw0u5cank1kqi0yz2f2isjlxd1ob35bupzpa5t0pmgfcft9sgjjjolubpb2j3jfzclvt2lvmjxtdh8t7jahef3j33w47l5v1yfrlzoj98ljd4fvjd7f7bl982jacc8hla0hqiptnfqdh7tjmmb8e14medps7zsfqs7ejqxn2xenwj2ul8xcn95bpoc95x63tkfsbs5fth96tybjk4xe4zjz7r2a8x2iw16lc74hcswgy1kyb1518ib38057n474aeg4fb7ugan3gdymcu182hs2xxkx16rr8kete8xzrqfkrpjy580gxw74r8rmveppk3xv157eczla8nar7l0sy8au0i3smd91urpwhmw5zi3bui73u9zuik9rxzsor2egeu3is6sx05jdwyht3dkhqjn2i2ywr0qmpmtbq6jp7l28nb5a7nz6sbgqn4nmz25u0h24jqz5ocnc5zf43s8hfa6h46ylx4k7ow1pvdkgxn1zz8z411xii7f2asxaex384yl0fd3qw0hqb7pe8xdhdakyzn50eac8wqnwrvbrlj8cgegx46xghyus4vjeov56056cytznkcp3bb10e90w7hj4mfomtzim5eazzcrig1hdhlybiwak0m7zrlaz6v7cd4zpmxbuzxcwpb80itn8rczx7wuvt53st7m8856dvmmdt1g208t55j4boc6a5csjrs1sjl3xi1iritcc2j8isgkdrdjfvaaol5twr6f2xstaxeg5ihvxr11p1kct75i0r1sdne4a3qlvqtaxqy2vadwqkrte04akc2dbz2xjmhpgekbuyq8u3p79xk2v2alnyioo62mizgt90a10xm9pang4ptnsqr73fstivf34n87yrk833v0hhdr8esvt25kmgf9r',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '73uecmyx5a4kvfol7ju7v5jc2f2sk3pv134qjkbyiv1dsnb0y6',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                
                channelHash: 'hy8t5xmk4uu6q4ksz4i6gb3uyx73j5g66xrcdvav',
                channelParty: 'cc4aqcox7ihn6s7ya1ts4nwhhit6kdcht3vj0kpsto3iuxjt4xk18fc9sf0ff0hsded3nuvjkkjb0ujj1gxoa8457asoo8yvvdqshncbzb39ugjx1r3xl8bky7rb46a10jdouee1l6sy3up5bvbeqgup6r6w79c5',
                channelComponent: '7ame9sqpuxpt2gunkw59r5cupbidpsyzb7bx5lo6kefw1662ijzr32zfkfpdqpo0ss22kftm4jsr8v25f89wr5653j97svz9mk8dg5ta48qtay1zqkn5jbccg1xgn5fsep2470x8lhgfgzj8n9v8ylvqw9nvt5cy',
                channelName: 'wnge2j5r0vr4jehrby1l1owp9qhvc108jydj6x6zctctwt0ymwxlec4qhh99w7f35tnxz9tmtohlkntw7fecb0ofll1fk2ia7tgdbuqpqeoq588xxqkni8aa3yes7cb9ihvmq2vqrkz8pbvvanexj7osi6y0ys1c',
                flowHash: 'hinpx6l0l738hikfaq3vdeiwq3rvhfdlqyiwz9e3',
                flowParty: 'nao9sidx0s1p5nk9ft04z0k1rvho13vevaz1lpjuirl6eko1a73tzt6at3g6d44m5fezz7po2jei4gf1651tgfixzpt40cqxm3k8bjp0t8r0g2nzcoyheixe7amw0wowgszmsg0bh9zshzjrqnse9ahats384iiu',
                flowReceiverParty: 'cr7qe9k5oyart6ng2sju40boxwk7lxxvfq4o81fo73juosmgj02ts6v3p35ubb0xf7wc3e3g9i1f02e6vz80ngjbnkq8zml1w4rty9ea6jgh68yq5143nf1ceijyxdb2tymz27bu22dx666o2e7rno084hzyrkyq',
                flowComponent: 'qkt9luku8rpsviapzu867l5sp1jf9d3dhtdkiy68oj1zel8h2kr1kf7cu4r23gqi64xzpkv6rxy2fmmondsoufcm2nbidvan1ypzg6g0b505xgpxtrqfsvxitctup9zjb4olge6wlup5nmosinmk5no6xy29c6nb',
                flowReceiverComponent: '2dkc6a2gd860mmv0bq63jq1risxez1qedwwsuon045lsy2w5zv9efrz5t8wzpx4nnnfrw1x1kpp3wpj83e5fho4oauermv7emg9lrugiqdy24wx36fjnmbjvexjush3j8luo1eq8ztbmfx4883sllvfwj0okdki6',
                flowInterfaceName: 'ddbjn33jq2ge85l5w0wve153da1fl20g6ik71z4rqfgtpir2jlyz4xcvfyy5a8pz97z447nhjf60x9haic1gy9usgg64xgdcoo81l6vobrp260xuydh6wfixekghv7t813dhbhjm2u26d0f30lzm73ey7r3qu3a1',
                flowInterfaceNamespace: 'pwdblxy0qe29voz0w5nr87l479epzplqu6t20xmr61tu93oooucmcmzuf4wya0hi04xm6j09uo5lllexf6j1wbjuzbiubifjve0rai2synbhkujvly1zrkixue09lyxepir8qbcpbbvh381zppx6bm0zvggkk3tv',
                version: 'ki7nhg08bkfw7iyv3ru4',
                parameterGroup: 'xbqrwkv8zgmpn0ksv0dntbgfyyqptul6h3uffd8jk4v66gdaivhha0fwz8qtfgscr20w9b7sam60tf55x7inaqve9tarx4up1uofc0n8t0zgzhykf3pno9tq102nnckiaiqci9qzzwc8zac2yif2f4h98uj0tvmtaytpdb4iwi62cflu7bkgtggjj6thgg3otz76fusrrg7xj54mzovfu0w2k7287oi65067zvol4dp85zmku0y1wsypkbtdlmk',
                name: 'z94n4wnid1lbjrxcrx7tjlhg5ks9iiz17i8es3szbe001y6bsq8o925pc3zk38zkil6rp50t13rfcetft8oab3aollb9nrqkvg9bucniwsckpt7py0nm9n2swcl4m6lvfoge55nxz5oak0bev2r7m2gcwdgt18zuohyju0vy944dlj1c4oc25x6fnrddd6jmrpqjqjngymsbqu7r81xqhyyulqk1lprw3d8fz4xg2oqm5c8asrcmueu419cvvgo5dj80ro8jyiaaupx3uulp03125ibsrgzcooua0in22qwn8bv0uk4bl8yxavm1duqu',
                parameterName: 'pz67ym4sleqj4f5cbg18wvt7xp72yibfbkgv3g0xmjuug0hcg1xu5biyqg8iivdhl2susyvzxrwc8cwx50rybaitapp920mumdlbo6qeqiz6wklws6w0apg9scmucskd4p6u3znrg5tb124fqps9gqnm4r0yoy1rgtwt0yh3ul0wbg7rct5u588q49qq3o3nvedw9osk9jgrj8zicdg4doluq9gr5osaj8u6ycgoa167i26yb3tywgy6zc4krfvf2egqgcbwkz8ri8qmoosdwtowyfphh9xqw186h8sa6ev1s039fm4n5wzmks3xtc3o',
                parameterValue: 'xh70besdouwramx3hib4i3nr131ifcdl8ne3r0kystcqmfdm6q6sf0ybdv5qpezxkmy6y3b6vn9f2llrc3hczj71ay20qhvzukkmiq9qymuhvgmtb5exw4c9ii96gkq44r4nnopmv8i0nbh8iqrd39ndsfcpbeep7hv9jkpg1pzu9v3t52ewfn0h62fw94jy23pjs32to5otxm57kewslypuf4b4e4pcuqe14fvz9q9rsnylz2ucpzlf8inj917ys41ueeq5hdovm8qe9xattj9lj3a2gaksqz7851kbofku0ou01qv83mqttndf70nkzngkfk9imb4zz3jpg545gb6ugfosqnpwmyuzr4csojlpkbb09kkqpedsj30sr4b31jadl2n3ppv47frnwbpshgdcjcgszzyugz5kvpqsdqpv8rngjfexfs4nwwh93ji3u65eq5wjbgk6zpph9tfm9q2320pyvzyp0fcgu6taqbcnodsts13aelmx3z3pus1mvodukuc7dm37z7goi7zn8l8zsl24aljepauii870wv6eqdsalh3x27sw8dzb64kes1mf1govsltsyp26djc7dtmw7s14o44e0z7umhf9xz6cqy406ga0qkqenmw1tgk7xyfxw6qmyifl5v4lkqswsutfrsk5ex1tq69w3fm8knf7wu2ijf7uqturjdf88d24ead94666g87k6wtljm8ywz25alyzbspxohmnr1t37dfraf8dyjmyk1pt5fqyhhr90jpuyget38a6rs0fd886b8lmctckzw9dxmtc6nn3kbnntxqq8ydyuzlvb9ochwi5mgp9wwjgolvh3w48x2lc8fsoxo1s3buzafnaqoapxxg5026y21p62qilxuaq1dq0t6g5aw6vuxak8xe855sfo4cp30n25xygmzfwcixsbk3waybzy4unwxbubuexz7kd5wy6aegu5cb41jrsxk1lag2zyzg0bg75r9bo7m5cq2amwej89l0v10giw87apm44zscy5n44htarabf50s3y7732j4cdm40m2g9il7rq80u8o4gvldhpwno7bywsvlmayycdpkk75oorlpcs4yujo1atedmyqjpag06y8unl3m96jsj8insk6j5q4194e9ij30wh3ez7ysgc95jbgpwn352ld7dgtewje8o75tmqhwzo6yqkwy2uc39wvgyxl7n3h8y54pi97yz65xnzqjtej44n8mj43j7a3ego95s51bzzs4cvy9lo3q85r5ts1z72gldh6c2vcrgl5pl7m8bx4oc4ll3e53s2x5e057wnkw2vyg682sp5knvl8bxni1wsgthl6i86d34lb2imj12tcuq9fb6rdsgy0hzvhz2wnctl14tnxpjlohc9xc7waf7co6qckecddp2ut6ajfniu9u4vsxceoorqzldhnpuaysh7uqzb3tc0y1eld9n6sn7no0rknv11rj7h4bl8c7mg1li7fz4pqvajz7tmgs37y8cbicv6hqca6oxi8yerkd5bep4evbr4fzlmtu3fjtdb6itc0ay6oq5nhax1c9j8jfg5yhefbokmn5qd0mdb23rxc0mvjdg20ux1d8h669ywv1bch4dwihepzbcwk5o3g4ab68ftxzu5ato7wzx5v0hfufzp832zd5mi5y379uh05p5zmxrl4yrdyfm5ysyosxo3bc3lnw4ke245krwa0bqowas7dvkhlo2158yo0peccn5xfd84xi6r7via37j4n57jjv2fve0h8gmjvoeudwsvdbr4n3w7h8wvh8kq0q1fy3zbeebivdlhd0p6piwac43u2ensxfixfey8axj1qf87eovqg4704aveqay54pel3ap23ywj86xeqp1fky5eldiyhtbtaghdezksqc26l7q62m2ol0peld63owrq86tvqy2gfi6afxdtwg0trmhz0ufopw289ugtjopl5wr2ujfazl13avu1jqea09i9lrhuy7x28svvtspltqaus46ez43adldwdiva1mhf15106r7u',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'fns46f8x1cqszu8ec7ma6kdpyqy6war0r3zrzx8xqwusbqv7te',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '6aqruv080ddfthyhbqgy',
                channelHash: null,
                channelParty: '5c3nrl0yo7ncyfbwwpfgbrxvzmqd2ynb1zwg4f0t35k9ligdhrkpgoa8p49g1ifiwb08sem5h4oiaxl4hrdi76lt336zwzpxn11eskfepe1g71a5hias9zshdu69ykw4l2bkr8jmp50bed4lkdsx8mw5tccs9wsw',
                channelComponent: '475wrh5jgyn8sdlxq8b0iznzc5xiim31p0cusoigsp73cgqo30ru9yzbt9kp2lo3urpm0wu4o7u4n81m5juhchcamyjdpcf8koywa2d410avm07fphvblz47s66o58ummvjo6nl0iy8lj08bxobvczv7pysz72wq',
                channelName: 'icy2e21aybaxt23rlk2yx1slvkehz52edw9cn4x98nt30vdgkrcz84x5z31ffmndbxsiuhvx1wqmxpr3rzt2osarr6bby9wcah3q3be65ljwfyt27ar3l5chq9nhsbbinp2hal1wh4m45kwnx7ndrtwfdfpnb7cf',
                flowHash: 'm2wuqu8zux7ke4gm3x86xzt4z4djmkpiatw3zt28',
                flowParty: 'et9t0fllmtkbu4ny88ck5ntqkjwcmmn42snakdxmlqovbq66mwecv56scx59l0olthxxy11lzxlklyizg0yeu3ewv4a32bwj95kdt3irmynvfd80j7bn9umk0z89xj0z0gwvvago8il0eqm9tb7wm2sh3l9m3ucc',
                flowReceiverParty: 'ntyefu20ew5x7gtuq2ji4fknoe4jweifb61pokiw7dvgt5eqjekh2zcr4aeab6l7lq0sfnkzwlv4kgfqhwfbfrlz9osnyytliksdr5dxg3o83u7pwqpk6o61f5b6qzvzmjku70mr82n3uxsobkzw9hatgnvbfxtg',
                flowComponent: 'k0a59tek0eqzrjaxkqgjq4cspz4ntt53d3znvt803s4ntw6kts5n40a04wa7w2iv3o1a941q97jkrj2sqcpzvow4d1cs6kud7aprxhmbnqbv3h39dszpj3o0xdtxtjeyb6uxi63z1e0j35vovzs9gi7fq5tyrntr',
                flowReceiverComponent: 'oj9ijzckyjtlfulck6wmr3akj49znegolk76rjn7ovaupunbjxqv3mtjcl5q2u9l2sylarcugwfq0osgmwvbhdb77lghy5n2303qhgdjuohdaqvaie8o36uwy9stjd2j0boqb31ebrnlag6blx6zkcz0w1l46r8w',
                flowInterfaceName: 'ibixngyj40n46u2p42u9zoski4d6x1dzwicvwxfdq7umh97v5soms5kzucpljtmqcugmbda4eoe69x53fwqwfl492bwgq5vq8k7ewvb6x2isb2eflymw57zfqf51dzzm4oclffuirtjj55svh6ixz3dmvrt92ur0',
                flowInterfaceNamespace: 'wm5k8gpm5580kfpesh31y7yjwj8qkq6nkfrhk6p9czqaax0ltleh2w33dgpgd7cnb00zsvw71c4unfs4kbogd7gsjmchnjbywpue107ra9jjg9w903mw7hbtpgoppgxetlou7die8temxr5u49ph8gue69bciepn',
                version: '0lalr1z8s74vbzrmw64y',
                parameterGroup: 'h7oxjgarjqas8qpvzz2ykl2g22cvguuwqgij93js5btaz8dznzl1073nwuugwq1cvttoo3thmgwzy6qndhfpghay17whr08dx0u7dicc06rx0iyu88v05coar7dtm5nv8ai1g4mjcedbazis9betnsmuy42hjncb9jf7ga2mtg4vdmtk40sr8if4lsw7ulcvjucq904o8a0u0o8xn0c7xliq3s44uhfarghrb6sac1d76v51pqlhgviiwohr0zd',
                name: 'l7q3hkhidipbedl5mi8wp3hynddgthodcezm83s3ngac60w7xi9tomfjhitpxjfmwpfutilifodmoe9tpbbaww70n2r4i8tb42xdbfx8yuezwiku9uabj9k87hozscbwa5ri6e3bdofv0y2gt2dlpjs15xf7ccc2v6lol1gqlbd5piqtxx70mnur0kpvzviekkckyihx3mlkkpzdrt94j8xkdtb12jbcmj7na1mqhgmhatzjqzgt7zpe2t71keepgg7d8e1p6mexu5zlr0581jo94tws69gv06spnyy2u9z1kkyrxzj0x07goclc5ono',
                parameterName: 'hg9q66t4ku1z64ul2mwzlfonp2gl2lhdgwkdpyd3xcieqz0iff9dsqo4kw8we366rvbblsm9iq1l2mnxa805trlf16byg4iqmy6prq25291m3zv2cnx6bcbcows4jp2ykrap4uee2iuizcfpc5jyprh37pl00e9ucnljvpahknznedm0wuxwsg4n68j6ezaetp95l53xqhsbhuqqu99umydbk63f4rswlrwp37gu2psliwz30n87nw5h9svdefk2h0fzch6z2cyvnbuqvimhd5zt6mcdygo7rrpydmr1frwkl3dha9hpaavk8zxjz5ex',
                parameterValue: '9z8yahdr1va139iljkh0mysyd2dqifxucww1gwj5wiwbb4kytonggvvanzp6dqbj8ku50gfbt70a9fnh6lg6yd7v0gd627fjq7fd0co8po13konxxc83nulfhbinyauwwxjd6ulye4tnsb8g4iu86cwfvzi2lvxecfaxnfmvtwlf0mwwvet1w7vxseooujyjbvlrqu90xfquajud7c95ylacetxjlivs3jn2z36dcjh64lqqrghx04km5am0xmyjaflyqsyz0t6qr4x8l3x9l7xtrkxutakk3eumbh7u3lwl4oojy7k0kez0cqqu1mr8ymbt5br4j7c5mq1zobgry53tjulrhmud1ewawlcriouudw73qdqvv9hn7ta3w36lgi3wqy4vs52ch25zs4cc6aig3vc7yiz0vmcrvweu2nxs27iwoo8t7181tpmaot6xs3myo07up03spfwe53jt5euzvp847xujir4fb33nxqljv1s99qxb2jddxr26vprysk91xi9hbwnr04vi9vqmue6vuxv0ooc7z6jd7fnxn3bhm0ovgrhpluxvy3mnuzo0a127ovy30u6ovs8tcflsvrbgrogj8bcpc7szur9eb68hqtflm2k3f7uhvjzwlc4e4dk7g7v98n7citb9g1p7soshkdfm0naa29nnfabzeumo5qhwnjpy64vr69vk5008o8war2b7v3mpqikw88jnzqayqlpl617esyvyufr5bqu3o21k6kmfgj60f3jec7vmi6xytq3gapxt2u8txasnyth9cwx6wbk71957epo8i58yjpo41kurfxrxn3omicytpmbws232v8i46e4ow7qufqxlrul3vrvulksijndtdw7kfgzlo5kqk444d1vxxooqwxw12fivwxjbqmpnpruw61sv7205bh4sklacg34i46nsg5tcg6av08ht9v8oz1cct02mk2grkhlqv8p05xe6q32b65r02fv5k9mq31370kadeqxbzv6basyv54m3wc4062mc46i9m7m806hrnhd34454gohkxtomho8gi6ljc4bsz14kk1g6j586fuofhskd4bz9hm5ocydwvyz06p3n22bfi92sqq55ej1u0bdoeua9ouzpv7u1vb9ar811312hpr6pgm1a3exprs2ieuya8mc18kckj6zezt7hpm6xz8b6rms2conjyepv3ehs702f83cc7h5ksupw8xhx1sisrscl9y31betv598e856z5a7ph3dhylwqs1dya8zufn68p5zpy98ajedwtn7gk97js1lbc2s4us4iyx3zjoefbvcyx6zobscbz3t7hjk0e5hi8jpvtkvmle9gzq7gaxpsplrwm13lovf9c5ipuwlz3ncrp1tpxro7aw17m8pzuvor5aog9v7t1a3b45ssupps2knk33uf8mc6chpy2d08pz7v7p7ie5sbginlj6ic1mz0pdy6zvrbjfkveh6pv25zuzyxrjnq1oo1l6zytyo8h8t0o4m27ng8952ogsy9qhc1njvo8usnx098mhbvss4k6btx11ll124bi5bnghwm1a3rkhx5btacqtqb5ewq5t7vkzveg47f55xupscfmbmj31wtavpmfpgvq33p7i1eb817lp4zll1wnzi82k17hyt6m19hnoppwjhi7zi4gxplbd8gfuitgfwv6htl1emz1ri8l8m0n6vvtag0gopua1z6zoyofpalyh0gtt47w7hmwru92hzpsbv8yklrfyw9mery1c8486gbj1t1cd40atibhavjdfg7gw6kyga5o2vjvg9bpyfdohzowd81fnyig0unspyle2kjbnodle1lwdtnxfw8qbda654hluqps5sz98tephzw9om99mkef6tjbt6iehiucqekuyot8o3y6e1tcnfbu526zhe5ug9boch8tbhzzrl7j5vrn166caxa6cdtjql8y8dn8qccmf5sh30azf2fqftxjzznl18dkgcr5jtyv6iw0j5tojtl2e23t27t0o3utxex8jzs8whzzbhz',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 't2g5282oe5nw2ojnxbczuswgxhlhyjpacq66s5okyylrbmr4sw',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '6d7q6ldb51w93z7cp4cc',
                
                channelParty: 'rrmapeugcf8gvrl9ijz2hc77y85kkt1wxedoxnpuz43xd67zc4l0ah2iteh57ayhlss4eynhp8vq3zys9j1hojjg2sx1glmmx3zf3wvo6r6v33v13u8aiqqiqmbcyyullsu9w37s7ajjkwvxyqaynqdrs31bkibh',
                channelComponent: 'yo0x890018gt36hhadw0pg39xl6efwkmijcf4zqxqpyfwtj5u0lujjn32y3zs44ud48f9750oinxzav0978yymq0hv0m5vbcso99yf6z21oap5erzcekv6vsswxzfxycwa0h75jqzxioa226a2rsziq6tb9epfkb',
                channelName: 'djn3fxi4u4paakv3vitqsrkndm4ngru5fijyckzkov5f1pff1wvjd4lmhmb6xulc4ey1linupf0nwfsp87wgsbznd7xxavn1s7doj1rt9vn080a352lie9pxol15d0fmx41re6hbkop5pkvsa6cy6gb9vtpzuirc',
                flowHash: 'bha8is4ihjx9019ekuofksmdzhmehu5fkffh793c',
                flowParty: 'vk7evp1x0fqxdpmlado133lur41lxtas5yga23hcuevva2z9zshi7b4kruzfcwds2fziq666bh89trhgoywuodcoc9h5iea7cga29q4mxbpvp4u4qof9op5audzndhpsxblzvn4ga4g2kkkueds4040tfx6k6osh',
                flowReceiverParty: 'jv1gjapdvlx7vij9r4te7ha0n19nm2v9it2lfxx9305a4t9opqf7ia3mkzb0sjfcjrxel0zfdoxl6u2uvd0efuo85p8bguvar6f4zna5ek7h9e492r8l2e99310c1v9o7d5jsjmm55y7x2xsahmza1zx7oddbfj3',
                flowComponent: '11lct1b8jxong6tskto2triywvqqwv5chprkoeuixpimrzwjoaoj231pr1iq3fg5ohg41vm2k2vpoguzxcxcuup87bs4gntansw8u7cq35kdvtrg1rb49wdj3agnh1kyq5oiyu3ola21ec13xqlrm79u8zpo3qzc',
                flowReceiverComponent: '2sudyx6jiz1wpgmrefu08h4jwz7yjll3mke1e41me42ud8i4dia6kaq6o16lefp9ab7vsy7z3j50mxvsymyn3kald4lw916ml58jcmjdz80wlb3gw4o44tgno84jj6cuc2ufp1j8fhpcn7tm7ht6psrrq2krngjr',
                flowInterfaceName: '082yoap8ikf10vo135ra96lysyei598p67o3hnyegc5oem9qr1nc18rnwf7nmeoi1l3brz994bj3mzf47kezpg7sb4q441cxewjj6s3oitae2qwi1wuy2bxqtm4zbbvxhxrq93d7eztco2j8p8pwrig1fos0vjxm',
                flowInterfaceNamespace: 'v9gjdrf3338x1ua9hs3edikb57ji7ez3yvhq172kv4de66lp75u2vp4vlleagkwsr2p2a60i8z8ib9gd8wxqcf6s1lxd0c90cmot73m4vhh7jx5y6f9pujc54l97vtjnmqj96tnkexk78c0n7jjbzfzsj1xo9cyz',
                version: 'd6449g5rb61i1zjjbfz6',
                parameterGroup: 'ffz9vhlclaae2969230qm0dx43fb3iu8jk6zxc2ivy31ber2ml6qmkie9zcz2gwai7q1scjplf9jhb4rpbvx8amgxl7u4iznhj9oam83qsuzk1wkeqr70oco0iv8objn5q02ffbpnuixjuekun28nzxgmnrkryzm63vu7pxhfzqz4s4r6ikrkz7rbu33e2qu9i3gx1wif9da1t4v1l67dz71qln3tdwgpk537hign09a2rjgi8u5jm7ughtwn9a',
                name: 'jmqi9681jmgg4npoj4z8caqvd2wd2589bd5390h1xi3qfvto6x540wzj92stx7nu099plf24c6dwzr6mj1b699vrrs2jt92pw75kb70f54o1oif23k0mg3oq121euh26h4xtsgv9omv1svk0m3hzgkp6ia4oh6f2awwd0lpgp7x2izj4yqnigais4e3eet88oy6fzg4n9ga64m39n1fp1e08rloz4utqa1qb61zxb4m1ku19go0p45iusc3u1rrrby5r412uo1wijxkgoy9rr142gvvx92ut7st7jc7jr6avy60ftlvbbvpf29rfhwr9',
                parameterName: '7lbg5voe2utxhvibe4lqpa8qmlbefinkh0i5vtxbivto7lgxepmfmj8kebbtm4l1gxbuihlx8euu99zsdvce723q6hcpt4l08wnq3ucpgq5chlfuzvdlux2gatv4jnbonbw1csbqtzgd9ff47r1efgaykdwsgaxxab7q5gspflentsqfmcsbn3ayyipbolnt0ll2cf8k294v2hqnpdcn6oxhvfzjehzf3vxq83nausfvffggthef8ola870mfhdfnhs2exs9p7vwwoilq3l3sbimh4mg1qtemk9du24ayvc5ksgqk964e0qjvxsphwk6',
                parameterValue: '3jp6kccv7mt5dk7pcs4x72lti6v6gzhe5juouz2ft6rpo4acw1mdoytwyv0u9f0ousou3j7dm9zb6dqct5ktmdheor3md45ltdf9gvn9jlobpzh1mf2iv3m25sa8f8979sxfkpx5ruuyo3vmegzcv02rzq7am9s9xzqfn1lfwr1vbxaue7ub9m75pj4gp5aevfj6zv7z0icq9ypsgyi9qx1196erx3l4yhmz13clyc1bdhx42429ic332fcn875wqg5nd7lvfbvyhf3cbcz73fz3ga3j72pjdapoja1s3q411tgadxtgpmo73yvs8t8pftx7gfvrytakneg6s7o21zm8t0jn42mt9i73nbcamdpx843go5zbkjaik4ofs50l1bjrnlc10vkyv8dllowik3z5axm1ini3m9yjxkgc9c2f5m9zd2iieihtp97ib0d3s9ay2x6db9ryg3eg0a65n4ep4ear3lxodtznwc4m2xoxcd9xpqphkwupfulldqo5bvn3odr2bjtaj400nczhir6x6ppeysgegjpmnfq3goefzbfmpzado2mkj8qionbmh8v8t7hilveg3j5iopahooef2tpspbqzq1yl9869ja14j5u6tspzhdi99erre7m4z1h3nxwhm0ltydto6uwzz6auggbo7aq6n237r53vqj4v1ln2s4oxglt352vjyymkecncojcg40zgpefx5zatqyxtmhc02kygxphdt6sz60384fq4fl9jfcdc41s27xxruey7cp6ay0q936xmqdy7v2zse093xb7pwghd3zpjbi9qirui01zayl12e86kswq374sjn6bh6q1s5xfjex23u4xqrybjtubwd8n9isddtd0akrqko8xkz19435kc1olq3mk5k1wuz2zy727vx2q3zm136wz4ymcmd4ow0zo1x4s7u8dveux0h4xw9rmyx56skf6yd1tuac38cr430124vdpn8f0jkx7muv3yeknc5o5ut9sxo2qfea6ojmzcns3mge0590izzwexu1j4hymwqta7t5avmf4kbkihl3fjwi1lchvz42sbump6rt17a4ckpco5khtktjlrc09zxa4kb4iudwoampcmab09hvba5aussm4gesz843rf0gac9d5wdzcl3fa9t7dgqcbhnj2q8ac99q9bi5hwweoqz1zk9a3zlxrghv5q5xugstgqckfffqv6iso3hey4nzjrwh7y2xguhrp180opcgsequed4c7xsvto5fk2nreofy50q01mulbhrfol5gu64qo5b1zu2x9m3mwteqxltknnzo4dipcvzux6rbwivczp48mdz8nki6hhbtdphygiy6ai5fcq1ythdc5uu0w0o5xucls2shy5bpl4frhdh3rjtpzypbfe0qudbva1zw7pezl4h8lor3orenporqfm9enezrap68o31l6w5fcdtxxkhly5bop9j7u485f0hyxxhssiryy44ux4dzey1nb6lvi81j0i72ace2my1rg93s7qi9gz0o5jo8vefrob5jf6mgcitrthgwq4jxfr69svacw887lm9q5dvake8zrv1vq8xwni6j1dt8vjbgub23qzo7d3p1osuoil9zcvb23t4v3cvusbyta27vtjnfrjk3h7lg495uh6yklj4ninnpgvfdadbhbi1e9k85f7etbi4wlfaljf8q5cr9tjiy11jst5j26ow3qh2o9899qhlc748h50951p5diwayrsbezr635p2wg9r0jc3l98arfd7aaz2q0f4kpvbu49plip00pukly2q1h5htfierm24d1fcstkthwubw8jujd9rhbs038j7jg3w5e42uip6d2z8b7v8xek3twrkdcvxvjdusai90kspgxy6xi1memca314asb2n748lkfcczwzvwmkmu6jerkuvehf05rzsv1uyrs87kmof1c90fi0ug67a1drej9argv8fpx631pf8caakcxulcgqn7m569pg45nbcgd3gx7caxjwfli38lw9zgv4xcd9f9xzh37k',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'q6666jz72rfzfp28p14fqm30uwdt3sxp9vvlhvemdwx38x9a7j',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'xezeah508o7v6lmb7unw',
                channelHash: 'knw74ac2niu5d99oi9m9piappbzb7nox5ndqb013',
                channelParty: 'll42ivlk5dmpnwjimzap0b8apwzksiyf1xim08ohi0dv4po5peqveypwjne3etimg9zyktdefhog4rypbzjlczf5ajwmj2ubq1t12nskr2lidp675nbit1q1rto4rhygl2ayk6mtml9kmot9n4xz4liljj0dcl6n',
                channelComponent: null,
                channelName: '35h524t5c0fin7d4c7n8n6ib8acw6h3pl5czy6abf34pgcg5joxk2xdd1jieuqz8sui2dpth0k0gq2tru4neajt8rr2upppmiv7b2ln5fm4kzx8ru256dwkt049at29y78tsuquccyyu045p2zd1plp30vptsam7',
                flowHash: 'eamstnvu2uka6izapldbub7p1noojkpjn8fa6dci',
                flowParty: 'behbku8p4m8j7uszx2ofmws8mx3nx2tv817ac1utoe34uxzowq48h1rjx2jjsoo47jfgj38pq8reokv043oedpqb1tjqo3b1f80sq0jfgjv192cv95bgcegmwwrvkpu478yvlpg0y9ewao8ju6bihn2ol2q5v5id',
                flowReceiverParty: 'fe92cznb5jhguhiawuyzuawmeu97sbzagbyr3ri64nggu1of0b0bkxb96ucrq7ylzmuwrqchbmdkimt75lyax3zf26mcfr0xzwei8wpmxi3282ukjgqknc5ly3uh484qkvjzjsz1mn8jn3y6p09loxj9c7ybyy0e',
                flowComponent: 'mo5hyz2xykkz8joaexei1nghjeg6jowfo9frqg4jfz7hf720xg35354vngk4gdbbrrysfuego4tp5a7v3ournfgctyf2lsvwo6dcw26byow515935t3w4dg9489s4xgkdrb6clwt18e1h2msuryxij6nwewhftl3',
                flowReceiverComponent: 'b8p6osa750o36m3pern8ycowwjt0n7umq10deias9kxc51qs1bice17eh87w0pz76scr22fv12mhe8jyrhckjodverjsuhwo1xwpcrff4rm0jzn780yfpa6fxt9jjiqacr9mr4h5a5wukzy6m7k2qzsl8aa6vwr5',
                flowInterfaceName: '01wt3t9kaltspj0ztxo6qcok8v714hoi93n415gvv8bkvit17v62qzby37h17do5cpmwpllcobhgdssm3phd86mfwiy476p85q5b4079xfdito2wyr0f786th1n568smuwbepgihmm6shav64o2k68fxnvsts7aq',
                flowInterfaceNamespace: 'z66e5q1w7sc762ikm5mc3acgbdhyb6lsi72s4ekq20ns3tq6fv4qp9re0jal7c7o88gelsb8jlhrq3vfi6z6jqf0ctzkal8mo87pehs9s9ssje5c0yed76dovpt3lm6r9hcwrxdqdna9d834cxcgmeyu6qtplrop',
                version: '8euv3kf0qf4iuvso2qxr',
                parameterGroup: 'z5mhd2o3vtrubp1elyesqsv60vos8hkfam7wxjcl26g5yhzecurb5wngbruhn6bj5q8lco3pufxkf3e1bn6mlkeit6og9xqgqextwqwnkbptp74v0z29xm3v55x7lmwduzr4lmcgpawsp3n7lg62irwcww1q2sr6muqbwj2zqsld2p4rozbgvs4ws936binasam5lv8zjikad9pukamoytbv4l6a3mi73774hi51l4wojsnburm33e5yndv1a1e',
                name: 'd4mex0p8u4dpeux5407fefbbwga1zkkywtvwzg0jz42h9qegzpnpl9yhkyw8qi9k6kmtgmw76shr873kn14b9z60romjagzhtqab6rqjrkq04h28ut14yy5pxlp0b22lz4ubgj4qywpp3batfxgkb8ddjb418r91ed5ppgfehbtmqspm16holobgmscuxe82j3fxmrz0o1lgtbkwj1x0t5wmp74h95mx2pze3hdr57sgevvectdu9hgjb2tipbfywdcap0zhgvbfqt4zanyf8k5rtbaecvnabi4006dtp5fv7tj2v1ox9cisfmi7xf4c',
                parameterName: 'u2bu39yjrm58ja2ty8up9oeero03tsobkphy25m8p1cl1y4umryswil0v5gh3brjz384khb8a4bns2qnv4zi3v3aodwnrf8f09uzyvrihkb13ijow9h8h47zcz7frbugx9jmymjszxqq56i8xtz8e7rixt5ncq9cr49fhnlwt0fjmwz9o4nsniltnyiz2z0hszaasyu5rfp9f2wimia837jhxsrrfzrc2cq7t9y308rwyw5rwi1azbmg4or5vntb6qkvco90rh1ogmnkcsge2thyqar05nkyc7xe7qdfddh5iyujdk404shhuu765o1h',
                parameterValue: '06k6j4mun90bfkgy5ixnvyy5w9er7h3z34qvdcxc6wbyrbgjdnwgy97hu2bm1ilcfvy8q4v880yr9e6iqmba8ol13i0kjix8utib5njtt2tsrzyw0arnmszz8j9hts29ctprw9ovohk7kspverpdafjje0xujw9e7ch1qz9x5lzc4k1i2uxwj0gz70yryo2e82wm5e9hxfbbmvtnzzg06vcrpd9ybb3arz9yi45q68cnc90kzmwy60qf9qup4sr7ejmz41gpyyfjmk6xtur4czvh3k1afiwjx2r7xp1t82ito60b7bh9daszxgsq7flxijgjsm41bb418ktyq1x59qp77e5fwcbqrmhytjypl95ov0ez50pf67yksr9k7zqapvsen1ewkd1i1l9ku8z7fwamiwynl94g4zzgeiobypkawrfty1q1om1pbq5fjxfdjzrodgcmhx9h5tgb22sse0aiiyrmpmpqu6b4syvhno97o6kqgqc4qxq6zgosewoqviuv674ke3qdzfrntlag4hdss2wpum698chvzkbvem6p9aun8hu5dydne50aj0sav36lh8u3w8rfhxk6i0u6mtx1odsh1lf4cdilchdw8tgh6sj1cn3921thkor85u6o4bmkofh2b3d4tpm21d7e75k3074y6uzfnq91vm5e17blgy5p0n0gcybktd5cufiyky9ph36swr01vf8wcufmczj7v69v7hxda0k79sr7ma2m8gnksxvveoe8e9agi4ztw1ytlf6r5cn798ybhpcnuopt15gvnalm74n4hxghw3gcxalu1oievmvfe4csv34s0sscuueb1ub0m5qx2g4afaq4vawhgp2f3j040lj7tpe5x3ezexwnsvgd8d9ezggrk8wxd1iwfcjhsc39vmdyh16y5bmmg2t2f59gsgs4rfb0fssc0bz3okz9eshur1z5pvumb5ic4nvqocwngimngseuajx4jin7gf8l0g0cwrftflbtkvhnd5ye9xv8whe6zgkq7z8b4ylckgni1foda725kg6hjy1206hnk31a1cbl1j17h1xmeh1bv7462uubb0cwh25xi08qyh6osptewsha55xsentv5zmzalz46r07xqaaykkndq4683ifmohkuugg9grbq5bbyy3ysyu1z6i7aun7znxuyeqohs500588qu6ehrrv4pbmy7ouec9jp2cjg8kacf9vio12p17ij2ekwahaqkcqok36qijpv68ky44ke9znazib4vtiz9c0gy1sgrnhd9qbxjcdz1k9r42wqxqkzfryow5ev3zziwrtf7ee13qty1hqbjjgl5tiyamdda2daupqnq5t2pf218uv2ssng17f7muj5ll2dqid7daxnf1ivmuqxu0vblms8zmm1hveil4zmou1e2h2bktptfqjkyab1l1skn7d30kggf9j2wuyd5eakxyupm35c6006xbwanefysrv43lnyiq1lim6hu9nglg99ohkuun6ec6dtbr5khjgd4aasous3yd2dqrda5w6ytve0fvnakavr384o81dt3ranm69cpgqg3amkef1cpi6uqdczky37voy3k83228dxz2tqs2x15g2qhc7hedlnpsp18iu6h75f5451s68ijkx9iezm9en1jelirol1w4sci89x5c0pkrzsy114jfw0blf87d9rpnwlxss9uiy7rlswl75gs1inc2yvziyq5zm3jww68lvofjhaxqqjujeaukpa4tr8ij0zgfwv2luji3wgwa2bch1ucb0k7f8phwjwvwxtzzf7cqgwkbxuai8uj1tvzdfdrbmvxj04cpovxk3udzhfs8rz5adj4mmbbe8x70pte183d3p3x76adyevafv8e3pnyv3i4vcnia9eoyxzz0j4e6gywuc2x4v5odbheq9mxag4wjt0cxrn22biybhadpoixiq0fnch1794qvd4o1ym1ykgd4de01bn7q4k5gn6js9zlyvp19m0pifgj6sxn57833y1bhujmr247rdmvk52t3z',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'e5uw493ie69f5ht2417fh3a0lssof9blaanniutr59yt90wjig',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'ox7635wt88uw0xbxl0k4',
                channelHash: '7ozvmi5vcabdpld4ln8n6x6z3wmg7ro28nylg3b7',
                channelParty: 'urqd4aaej5jnvp1pf9y7mofqiumets18hxpx5ulfvl7hagqsdzfal8yvfum4nv71lkdrk778yweb2u7z25h4ykpgcroina8q15dd0lizqql2ybdhct2ej07r3bmvppuyoh97kzjrbpm9d71rixzv0so3anbr6jl6',
                
                channelName: 'gy3yjuwuj6w20mchh4k3aud3agj5vy6qft8ldbatkk38kzd9ag1vbllikkchvdzkzjw9pbt6cttf7fospq7rhy5v8ydh57ebj328dfz4lt2e20m02sldycetb5vacsp10xmgmc52h9d0vjuwowcb9samux64ldtx',
                flowHash: 'iocg89mll758ee6vbplbsdg6q5kchd52mk4xgaw5',
                flowParty: '7u7etsu2gbish6byucisqapw0k3qzd4werb34yojelmgfvyxnwym0etn3jkuxi2ey8sgzz05dp5xwgx1a9y1ft18j2ikkbcazpf4a3f5k8rmsd1z5y60utabbc7y70ohkb0u111kil7o6u1gatcfpm34hcdim8by',
                flowReceiverParty: 'b9876z6sxkn0owst7g5kaodrwmgievjv6r5tzag3xw8kp1numfjaty02gd5tg5bp37vy3s8rzm5vhchclob2xd3zrjknkbf0cktsitxbnd037id3tqvsvl7by6qvwcwb3msblewa3d1e25lyzor42a5bsse79j9m',
                flowComponent: '3cvmezr4ezzij4h5wa73wyhuz2jojft6t8dklm42a8gad1kha87m3o4odwurj1fqpzrk41v5p61vkkop8uzxplb3rx2zgdaklyp0zyxvo3pagrsagg6cwqr9w2t52lle8vykhqqckms881bcp5icx2hwwr0smiwi',
                flowReceiverComponent: 'nop6dg7gk1zzuy8nef4glihihthaue5q7iqquel4ez7q5r6bzglgqattfjp0sm8hm7j7ikgq1es87fb67gj8qy6vii5dyt18gwqcpp9qjv4yeycncqu9n2ykpf2bj89fslb30agneb3vwlx9vt3e0zu39prj16m1',
                flowInterfaceName: 'qy71gzrya2755pokmizgf14d6oyhbyr069rynyes3inbzgca1vccz5r6yqbdthopa25wjdwpknf0j3zqnxvwj2udadt3ypy2412332exbmdtu9ae8k1q9kd2ungtqpm7nerchqx8uq6cr9u16c9jrmp6k3i7o7bh',
                flowInterfaceNamespace: 'tutgmt92n7687d9m279qbb7jrcxovckqvwpjq2pqrhhmxs66postj2481uambsggozdkseq4gumjvmwlanrswhyj4txbuesu0w83ke74wzg4ek2cybmu5a4idb5cux0eduxqmki1vm76unqzjurr3rf1gcp5xexw',
                version: 'hyjccp400k04xf287dxg',
                parameterGroup: 'ipnnhvvy3o8jqkbl0kyp6tv6mwhdhfo8ynzerrv643k255l0r78vgal9ydr8nm64r9cm9zrbvuzoyfgt5tp72flxyi1f1k8tq8o5619xrtmqtx3m652mmakoy0vka99s3c7qoanqbvjcgje6pqjl1s9na109ivo3qfy5k7ii0l32x6bj5boeyt6u0d08oxmw0utxfy6yshkd10qy02vw6gv2ij9hj9vho9wdwch9vkhddma3o6bcitwa2vp134q',
                name: 'rrdxik664aef0b8lzhqszzx9ba4uui5n9yuv8ucmkfwjbtfzwv3saij3xqllq7b026ugxzp9ympwzyxc6nooazosq0d531k1lfe3vtm3zru096vg4dm83aq0inla5ymd8tqqpdjve5tiu0zp060lsia7sv9bd0aa9xtvhcxbcx4ccytk1e291mnx0nu9l17ec3994bm7d329n6y20gv5cu7199xc1vrurwj6ihv173cw5e5gzfpaeciqay8xso38pmmxtrvfk3z3pwlmz6p70l3kh6si0y4pw0d5rfktnezumgkj5p1ukk3a6lh6ux2l',
                parameterName: 'ypmav96coai6ma9c3pnwj13oag9s58zk2ru6486le9v7jjfjog29n1ad9pzsexji8iif9yld6x0dwp6j1dnpotnp4us117ybkrlvkpnuoqtxjw9fvtc0xtszaye1wwc6b5cbybl5x1ms8y2fyozbsd9ta1z1ows3xu2m79uhf3v8a4j8yw39hr79ecm8r169bc04n3g2injxg71ncmev5ceoxqxek30hrbcyrm7hlodbo861j7vj37rlx590n6w9tlo5nxokgv9ts0g1ypw4umwig8btkpilfaf7u7rlete59c73u79cd9zzni1e7vmx',
                parameterValue: '8gs1ey9qz0nspo7ffu1w5fzvf5bk4dlijdylgxx2c7dygd7usmuoemo0rt6ndwxybmzf5onmhrkfjakg0199e1wmaequmu3cvcfy8bum6aqtsp6af7pa1aer8i8sn3daxz1a6n00o9vzf7f9w5klwvrr2r65gnl8lj09f8h0uyysk71bbs3636smd54b5jvcxc5pa1bzq79joed8fbb95qg9xq0xp74azymjtbe6yh2ihr35yomjkogjtiopimnherm7reepfqky3u2o8x5izmhjc7yzt9sibjnkidjjxtn8ggt0lnr3ne6a92ela43n0r2cyly5dfgdllocr26knmfi9961qhwcll6lwytvgro2pzolyj4k7ztyf10st7ezgrylttst0mbx24ts0831w2xk37a7voh3k9j6wkzf66hyhxzdm4i5m5r1eh86sbpup1sn3sxcdy4j0lf5eqezt706y07hyzccbv072eryd8ua0mbhfn2gri5t928yu47mhll0tckc2ohil196mi6vm4foot5fbs2jrq9kekus6efgl72sns07oefj8vt5vl9siqmlpu5w0jbl8uzpzf2um81k83reorls6bk136a90sc6jyh7txs896wpsih6sesep2n84jlooby1uthb4feupjqe67sjy8epzwx9yhvnqtbwx74ndosfickq6jyo35t9cstqb3fzp8xegxt38e6wk5lvqq3mrkud8ql0lh5jzteezoqua111l0mjjqjprar57gtkjeejz1mkbu8ez2hr8xodzntdfs19n16orjgydj8zaamr5ktcod33x977zcl6fslf0d9bev4hkq3z1g037mpphsd3ylx2lhdeie3ebyttgxv2zkt4lt3cdzo068jckz0uzt0x0bzg58v8gbouebs7xivwk1n5u92tfj5a2lmq9a7q332rj9if97ek681o6xzyqbrtfp08gywn5aegcnljg43d1i0rz4315c0s3sotpvs9oqg02ubjtcdnbyw54oorwfzl1hup1xy5dbtkan9jwcvdsu2yfpimgfopnzk14oz95hva3vx7wj6hyqrsz0bd2k2hux3xwj1csmg1ljq7r9zadysw18czj9rlz9tpi53hkmkydntmsa3rpqbxn5nxjnh4xzav2g4dopuqr4kffcprv25i7wms2fgedgt3p0cs7of9gdxxf3q9n8q0fvkqo8bzcp7s7fnwt8wm0ex6to3ms1rr5jst7k0a5zgoobc2um4hkqt2scxhrw83f4lkov4sfp1px3j9oczivngajg0w7lzioj6bdr5abgzz3pn25jryvn9ctx4jhgidnlbspi5f61tjby0y6k2vaex6lgzlffe949zxgl27e6vuyyrx9mf6j4vqh4bloc276h782y5yxpz7fh50l5jp3hpa6pfxyxu7fn8llpban03akp35zdsfu8ocaesdt7s2mstthups2byl4bgqx0kosvjej81p047qvfbzijav4tqkqluhgephw878idhdi18oqvddl07uwi9912ivw1bve6714dbdj1ar6uwqzvwfd9akf2fwrooy70lpkos0emuaj3z68pe7ws2iazyjskjv4pvzzms7s6873zqgtrbkmgnkms2gwl56hpoauwyh6h31c15ctxjtvm8cyo0bmw6dhdsow1wnjwosskff9dk7dv2i23q2c5j1z1jfb995a62s4znkfxx0b4q0hfbqeqigistrufzx2ns0e6boz2nxz6e4jse53udgwz1o2i18vs5itf1b90y6nen0cdvupecbufrfj0neu7stqf26zc1jo1ugg0zt3h22bd2wrsosfe5ag8ps4ed1p9jwn999n1rvy3hlfgs4up81q2o154z5gbbgxwyozjsdgdal1p8ki2wjje3yzftozuq9l4vo84vq5c9fxumkoyghz41n7suir1r4y2nw0ihyh5m69qmgoi81a1qwuez6j6grtlmwkzo0jpcia38pdjxx89ptlp3hzxp78qznmjg0i6w7gvc8dq9q',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '895z4a2ue8zkov87j6lm4u5drtmyed980y5jckf62quxyiwa86',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'fapn8q1mujxjfpcbu26y',
                channelHash: 'kng48vu8x58arhyb43bhunisa5ytkb8t8wapg7ns',
                channelParty: '5r21pdfk599j0dzj9cjb0icrmfkaipb1nj19sgl6c7j1mvssk0pebw75jjfs5lv9geb2l55ps5r9qpazwkyleqatgzj9e3r2beueq9lvfn6kf4r2orjv69twkpjpqjqmz3cz3or61vx9k35dc9893sr5zc1c0q6f',
                channelComponent: '5a63ckhw04x0y4dhyfslcytn03lhgwpm256w49a2oay4etqyxwug0z8ypoykiuw1ytlylotmfkgy5mnrd43t8boanksdwqrfqhw08jjkg7iryaekww5fhq05ml253f7dq3onelzooet8p4pgbunze4xqhqz5k9sx',
                channelName: null,
                flowHash: '3svd3c8kq4qfg4pz0mol3pzunwxcuavo2y9pca9q',
                flowParty: 'rx2y04cr1kqqgolbr1jyqioe9z61lpzknvjr8fsdc8c8d9mpny4d3kkltuxns4hnd856ecvleo4v1y7vtdz2eyu3x03c49jl6s6rk0fttwdgbyigpupxvgogncqzyw659qwz9yiprxnj3zvetizv4kyaaw5wndsn',
                flowReceiverParty: 's6kc132olyrtyq4ii53vyjgrb4awqulg9a02rw4icozqwqg4zzx4z5lkaysi68pmjqwff6y3ckgt7esbzb423wyckry9d4gf3mnaeyehpux8lqoxaxubveayeiw44a2rahp01ssy9sym5c0vyh6n2p6591mu98py',
                flowComponent: '5knrhoyhllxmcttpcie9yc6r4hjz4uom5dk15rrsu5rcnlmnnazopsy6mw1fks74c9dvemn73527rvjtnzp0u9jbmoxhqtz2kq7u5ofxc8wq3x3ec3v92sc2vc9236ar6drt0a7lqmar4agysp6687w3fulcqsy7',
                flowReceiverComponent: '9hdgkotwomxaw28a9tjez8xzdxemyfdwgb3cxg4w0lpqfkxssuzrrvztfy1zofx4zdewxy5l8glz9wt0pmykfui8ayv60ibs4zz3jbpkeqko7neuvkt6hwhb2mgdio5i0643mms510cj165kowcc0wmcwvb3icn6',
                flowInterfaceName: '9gl4y6gfdw8v7iblhwjo2tpt5ezm4bnixsl3rk6p5ff0om1nk5ubnxibdqwxsk8brqsw4enbtsxsmq6p91hbp8tfjy8lf7qkwodrwex3o00o4e2xy3vx0pbmt2vb0bou5r973hmer6k7fpumvvkj3nhik6ucfq4b',
                flowInterfaceNamespace: '3nimitj5zvxz9tcciq3405skgibq0rq9w4s8oc57jwrqgnoo2e0abwekdktzd7g6yfbe7x0l309co89iwki680yi3eewqexe5535s63tzb12vp0ndk5h62f5eyrazu3d2qzhgn1etfa1uzfb0his2fr1r1mqelbb',
                version: 'z55eg3glho696ouzc5lk',
                parameterGroup: 'x257w5wod9rzuni9uc4joz7h1s82pbyytyikl9b72wjl6pcmqes91p0m3q3vd7p2h6xbl9f3b7acjtpezgtznpsf6ww0jooffymhk3p1cmn3tk2l1mcichbagk6n02jjw4hbbpoj3zvoqb8gg5b62vvo7ls6u5dcz0r4cvu7iaa7lw8wsne56dd4r9boehhd9fm3lan3a76dtekdjgiqwwyb8ljme0xw3jwtgulhv8rzro4ybqmkcvakgerxpkj',
                name: 'ynfgyx3879p6e5hu3en1k3lpzxcdko9zpypnvpga7q4tww0cjzuo0cjyqj8lcptvvq64lkx4zntvehdr6kz0p9tzjmxxvq7mvsp4lue3de51k7xvlz4swccpmfiae8yrtuebq7mykpqkjgfj4xbeh53eif9sd3d876t1qmkq7pestxk3xcln9wvhh5x9h2j10j0wieb7kftpsgswil7rgvvkxpkfpog4ampk7iw1pwl24k350xw1ufvfo3yp3noxld90uf6lst1cg3z5ew9ft3hdn5ttx838c6fcvl4y1kxyc3tquab6wwiyb5ktql7u',
                parameterName: '79h1ejs7d8erhl77mhiv0pybci8ynr7aacmy7dl9e8wvmm2htz5tmvj25qchql5mlzdnm3xbglmy71r4vg5nrmeh7f5jto9ah1islvzkf6d2gq88nuluf939kl4ylv9v1ayfpiqphb40xehupvoqna5040ny7j9dopmcj26w0apg3xkmohzh40h6xxa8xt70h8ga5x0f66lx1cxydw4qezt09otxl7x3e1exzgmnvohbwtz7wi2o8bvah8yk633an5dqqgel20o0l4p0y2l7qyih3gzgsre9el74u46zhia0h7auvhbkbzj77xjbjn2y',
                parameterValue: '0fldi37jisz9dlncpgnd9mavq2r4qvjyy3c2a0cjob23rl55819b93j9uydli928gzc0ofsxgr1ofue54hgkcu6tvwkqhoaalsow017l0dl5ip77e2cusw99oph2x2xfrmkocieczjrwyjl2igsg3gc4oxl64dpx9tfz0zk94e6lwbbuqgvmk5ngu5tu4fthsewoc1s63nc9zl02x0plvwb2gehblxx012bjd54oseywu7wow1at04jykxsm61gi62qwe279qi3zewafwlt7sc9dphjdt0emjmb6blyp4x8si2lkmbdebcdm5m4ts0g95huffa3rxj70yw2s6471dkbh8o5ogzssnayti59ww2vwqrltlml297mvt2j31k5gvtjh56eq72a3n7kjxnridkm06waqu6cn0e1ers8w3f7bt2xzye5qxdcyffp5nl84fxaxnqpxgvlc1xp2z4fewfzn3rx6iz7yb0y3j3mgg08b3m3luf3xf3v3c3pt54nw2zpnhqr2cr5unbgm40uce7zh2lk8hz5gkud3e30bqtg52un6wv3awgatunub1znt357kyi55wuz3ohuvbpf7a47b5s9czb95tiv71t6aoiw3ifzcc968sp4r5mdf36ecdld8p441um5w8jmhthzy5ep4txw8j0fyunq37u3ublkn3ddft373i5p40de1finztiep989rsmjjh5vf0hbrubjqrnxtk1pvw1wz1e4q8fzbcrm9m0po4wfmiubj48ji3mees67na2e0ctaomnuuvh6yk8qlbelxrpy74hbup17kufmqgerxgqwryjf602345qv7mr5kdw4c591nflbcktgw9o8z2m36a268liiuatqx0xke9f2yrfllllcgx0yd5txuu9lvcazhomf1yrtftdrxqg0ozbcdw1abidbckdng5kl4lzmo7owsfl3tsnwdufnlg9mwx6j15nyplx9762s2md3gbizkgpoh4ejnywovz5yhe4fsxmxwbl2xmddv89m41zxztrjxl6ciz9hv30ih5bqdbvn7yw8ancvaiqcqoo7sejs5chktrrjaldr88wyscv93tk3hk8kfnsv2j1709n5wfbsq3w3ycvvdp9mo6nrdde8fherfxos26ng27zpreygpfvl6gztwnyb2ba4f9081vkniszz4b39vs0asghv70o7s34x03r751iy2anppb7v0j9yhef5iwmdypexymvotpet1u6holn6iz15amkfc4p5trfdlr6mo5rgmpfu0aqmnd7lii4meouxgbhd38yzqv8yeu7301wluv4x4lo76w3lf5lk02gnf6pb0om7vfkm3yt2u1fgbv6fwvwn1n8dh8h9zk1xkgxv9xgko0c5mpgtk9cwbvrloxbce62e0iuom13fpm70cnwaobkyy0t3qd39ekcpdktjceoudr2g90r5aeu08r8xfnkag6709v3jh9mrd97ovecaft9ogw5dbgwculqoqaubefkhjv01f30uft1vi0zlougv60rnjid5nq8yuuitq158m9pj7n5uud43gih5h03igu2osewt9b0fo5fjhhf6su7htine95midtz054fr57y30fqs71q7mvnkr41wd9hl0zluaf223cijc4jpv2hvvv29ujlvmqi2ezs8r8xl9lkz470r37cglbjjw14woo5oylpla3zaba1i8a5soqlm2amakvjosdk85m98g699zwxekra2gii3l79a4xpvk5a1vsoxw4n4dtnglolb3fire86uofq3bap4xrtrp93ve1keuklmx5lsh2613g45hlv1bqogvh3pshsycb5faxqufgpj0rvlznhhfdafcpn4mxiectsueqh8g5fkba8jh9qarn0457ezn49hxfl1tdoruaf4lls712x0lxidbli00efjiaq1e07zna4pjxiydmn288zrv0rnkctq7u4938gs9je22xogusmj1f36b5n7w7is5iku0e3ag5vkb6n1ha83i1qgn60ja8zgmz3uiroxu82ks',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '0ma57ah9n6pd0w26t6a7w0gqhxng49t3mjb3hg1vyv5gntvmq3',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'kbi1koh57yevxpid3yuz',
                channelHash: '18er9qszrny8irasctdyrnyybl6exofn204vz15y',
                channelParty: 'qldqtdrc3k5h2re4r544xbr98mea7k0hp6e77u6ecxicbsm343jh6heyfehz7ktnlb29rag2zon6bvcqfhvdb4xs7esumpykk2hys2bgtkzi4v2o758r7vppssu6cvci6ikb802mx1516psq84vcga7z3yffk45m',
                channelComponent: 'vy07jy4bbfsf150dt6i1h12t6p5zbflht9wd17kdq9op947d4tdukaavdakt7g1fax3l3zk4rudgojsoaneyygr4dnpbezywcaln08n3pqwmoqa2vz9tm8gos85ivp37akrwfggo10ygyszzryqdauq16e2fg0ry',
                
                flowHash: 'u8jtycsbdcohbt3n20m24oy74kxj1tvz2e2dodu1',
                flowParty: 'dcrfk6vao2zk4phknk1fbp1raqx0pktxadakfxe2d5q77pn0sqw4pk65ljyqm5oua89w7t87uco41j17lk88gupd7yptib09zo1n5rfwdcnmg2r2bijqynwakzu9gzgeoenkqjf5t8chjbxf4elsrg6h005rmusw',
                flowReceiverParty: 'ik725hbog1941n1ppgep2iud4ex2azwbr72fqh4b75ulfjbrcquemn2kml3cm1ytltjpw1etdduju5kgb5tl2vuihi6a2brve7fqmg22n73eatnbjlp5zremkwqv4etue838jwobyzklxuyy1hrgn4dfhjtf74u7',
                flowComponent: 'b3cdyc3tfrtrkv4b999acnr6x4hhb7jmvr5j9fo0m7ju6p1lar1r000plaj22mgbn5ft3eg2vjisz0mmo2devvykypfamrlra7bcucyfgcscrj9sz6o8nkehl7gmxidgvu9qv7givj34ve4cvjcuhp8ar9b8zhjx',
                flowReceiverComponent: 'pcpoy3tgeq0bkxcz5lxdpkfkwov9ws7oa7ztx37en75zka3g1fwvev0ng53ut1ycd75cqzz6ip9rtc1iqh5dd5usry574ldu46xkfcm19sd3p3xtd0m19tpayug7di3qrtcd6okbjur2ytkou27b44e5lzmtkzg9',
                flowInterfaceName: 'g5i8hzocp6ow0cz0xq484fdvsgey8lr0pvoxnjswwgpcgz5rxi05ff1vakqxyvqg3v1xlu7kyh7wqilvxjbmernrztgj7wvq1isqrpzd4q0ft1u1cx4ykpdmnrip14uwucn85fxi0qn9dqnkgzlrfzilfxdy5km0',
                flowInterfaceNamespace: 'svqbs4dqpypzl6uq9gnzbj9i8wleemnezg4dbowx7b6g1pn8frurr6cvrnas79to1lz8edz4qsyqd15i3ezdz4wm59h5jmcz67ds7jlr3dexoqqzq5ro3cfrj79eehkvtfkj8c4pbx7a82n3el73lpy4q6hcr1z5',
                version: 'vol448x0ygqwypavaymm',
                parameterGroup: 'ylwg9esnxt2hi87jh6rmotr0vjteoha471qzw75f0rfy2t8kw11dxsaftgnc2wug80ytca0pv4n2qhyejbwr4jl6d9kbsln7emirx9n04xnf870oj8xc7uihn1ibx5mq26i9s6kgrdqpt8yi45466jnsw25akkcekuhy6wlry2efs82h5t9jll2c69mtst5owfbb1r880r00nir8gu6ph5qbrstnme6m7vgh6ogonl35gvm6kck7thlo1t911zh',
                name: '2lazzei62w33j77cjis1vp46q7d6rjgxwsy1x12cx5dd6ekjjg23aapbz2ejvh1471mvw3rlb2fik0m89cu0sltl4qo8m6m38f7rq7u066jkt7ryoyfpfsbtw3plalskv6k4yoo0y017xljf8yg0h5cirkhcx646ildztmb2c731yaew921thrjx5mmslnt7sociow9hwni5vz6wqb6ajwcaphg5g26hivz0mhzozfauokaqsulig994v4i0i33htpmubhv0z3mx599ri31pqny82b8b8b45x4qjw7g4r5xpkc16uqzwmgh886nrabmd',
                parameterName: 'c9df9riyy9pjdf4qjqfzfb3psuiuct06lpdp1ldts1tinzhyqmbi53xgaemthd918ll4hy48s8iqnlkpggdlqtprh1b0l6oyn46qweh2dp5oiv2s5cr683rrs1x2x6i1rc14oaa5xcffafap54j539asloiudxxkctmjf3nzpqdk22bhd0keuiuzot5fon6p99s1g7ao8xznm7crgam62uqeoiki6jvau4gsx0xikh8a08u0o47clutfrca5sehaxffeg4zintb8u5dphrkdpf8smxsu2pz9hy2jvly6vncljg2hjlsw207xcl9m6r5o',
                parameterValue: 'wi05krg3dre4k8h7wfy1uodlwf1bayglwqmeh8csqhiyadd0vuz2pai07tns8yicttv144gffadk303cqjuei50e00zvdlv2q6w738gmxw5d0kn2u435fp6e18y3oki369o9u27oho1i8o3ggvtk9bk2t89h3s2nuvdc5jl0yzjxjick6jpgck58u8kjeory6ngt7c0yq5grzq2tnooknyp07e78gs951yza7v4s0mu0vblv1mwfqfj8kz8x8w7my8bwlhenz0ygjbv6wgkt0ffkones6aoz7myc8bpi4kupt44rsqi2mp1fbwcroscjwv7fsut6cpvloth3wzkw7bfaa4f4cof400zzb0zg4npbh97ovygnsdbk9fdsdp1dd05lcp9hlhg0shnwuqo0ezpvg0mj654uylp4pnaoxe69lsktluvnatnprxeecsbmq7e481tal4jsnkusdicqxv385kjrx9ncxdg4mbeyq9k9p4nn53s3743shz5v1wz0rlpr4n8jmhh55vyn31wlt9hefqlgvejxyqrglyqtyoapzyymmne2za2shanou4s6k7kgkxwrnz3nlqkpnyjothl2lpg2uwdvg2yc1gi15kdqno7cgoa7uh7rampengau9ad3l4ulaclb9k5res5r4n0cg3dvpacshoimnywat0gp9kkj1aq0p0nojxtw6mw63k6kamy4uokmrl8baa3t3s0pch04vdy18ltw3e8dtr79p4xfxccim53gbo32li9fjrvpx3pg1ilgkbo1r830rb260qjac6m6y66cfe0h8y7xc2j6uywfkqoh1krjqb4mlhd8vm7t9d4ypohtkqr3fpfjhvesfc5fk8pu70mzfaddcvzp7sothhwxecach9jrvoijw9ainapqfqxieem4nrjhxdufriy2auxgy7wjhcmdxezufn1lk919ore7wpnmojqj2knx9dkl5mfixak6yi7obb3uqpdkr9g2k39ggazsa19b8y7fv4odgod0pr025p1nvae6w70b1goxwsrjct6bsc6tm6krne7c0nlsh4cf43aomir0c7n0lgmfgz2kxo8jqu2hwl6fwapcwq0zp4i27tggkxx9vzo3xe0vvpyatjucujo2okzyscpntg3wfcmeyle0c9pp5ruq9eqq0t2likarmxf0jqcwbao6vq9fataf7d7meyr01rs8w1yqegud5ux6s7taiffvlbv5ebev9xdu4rpf6xyxsh3jknalzmc3uoi3570xavb3t8pyzuisi8cbpefnw3jyoiu1rg1fzpzexxfpfomsedtwycc2yo6dkoh2zeb06cad2qyviofaxdj2gwdomkrut5jnf26o6guenejofzg0u2v6i7m1a6hisuv0r7zq0jl6pvbmp09n9tueo7fs0pxn3bhx6ciq7ixr04he17tutk6fkxtto82fcd0utu565lviyxpv000544l5j1126uvi21tvz77xqdsf74jk9qrhcebxroycegzhaukbvhlo9e5ykbusl9dmm1oicqh9h8t8ugqbotq8b6cjqx1ju2zb5if90p3qnl5gz8gmdqbhkqeoiygsgwfkcl9hqgiob5bj1o99k7t50xoahwzc73n1wygzsj1uny3xwpn12rd90rt1d3egx4km31zcqdsb9xewzs7a90owiwxw1mvs33qyo90v6xo1fg34wz41r45smrktu6hwms6lf6jc2qas65vscj4j6tbqxx9nle65cxq1nqtfeyfdfj8keyd3ql2mwev9mp4026gkhn0t960nwuc6zod9hqh9xesv9mgibgdxsqvnf1yuqp0druoiycoq7mwunzzm2gkl0slmcpdrw48l7urizzv4fp9x2k7r096smt84wxlm3hi9w8oiec4uy7mv0edvvw01083rk0ghwtxqc173i3e86s0imezabb7sm88wf4c319prjwlonpaj0uc13s4j1ay6yck3n8v3mmksn3jyiegnrx4rac3chhqkgvi3ej1cl37va7jh85ablcarjj6d',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'zsh9b1y8l6cpihlzselv0zoyxdtczeg79weqhvhamzuve7khue',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'dhamlyt9r7b4vy3fbd4q',
                channelHash: 'l1so41nqo7lh4gr0wvgbqyrad86x3lze5n7uvxxj',
                channelParty: '8uame1zdx4sjvcaukjwtpqob3s9fhtkzac1dz0q0li0w8vcnmewnq6m5o70idlsy3qkawa4i2ke24apjaqaz3te1dp2rtvje94yayi0dcti0butgysxz9pv7kzthsa84dvtymh08p8959lbmrkhjead8a31291pc',
                channelComponent: 'cpo4anm1812iur2m0wrd6kw72vwq9mfcqihyjifqn3umbts8ml4uqjhxu8dreq45gwrk4x2ocvfd0px8xaoigvj138yvjteqrjbnaec24faa0zaiiaa6893tf6bxuzm14r5x6x1jq1myyuih923s7bta7j0x8znc',
                channelName: 'mpaf235p5pkdg97dvwdx6kykmvpv7p9ld49rj7eq6y02r51ichju1q0386ffuvqovvsck3wc0qggcy1tuj1qx4k6a7giq4lme8vjsyg2h79wtheef4j35q29pasrnchmvq09dxhmfvwoy2hdw8wvxxoklcgirsf2',
                flowHash: 'efztkudbicucmwo3t0pp8qlkrphf2ppa2zqkks7q',
                flowParty: 'fvqw73hpndqakkcpxxh5vdi0yj8yg5u7yxno412xyydnmjsltrsyvwwkxgzwnmd1vzbnr3or382ephi2vuflmu4nbtu2xna8m8z3xoqondgocqqhlqvp4qck7q98zxdr9kjugl25oh2viw93wqcb81ysprsm1b5q',
                flowReceiverParty: 'ludig1yrqheojm68yubq6idajj551yhvrlwad0stiwtl29c19afn4cfkckmnhf44a6w4ptbdehjzfn6sto39xawp3staice3aet270t9oasmc2d2vnp446n1qp0ctsp77vkbzer81bq3wqmkbvpo2fpolztd5d02',
                flowComponent: 'gipr8nmyqq1i052npv3ycifmaifhwleg3zxz6wlionj0mg3e7bgkx887puufib6wyjjit5w0tt4hwy02yklo8w81x672l5f8hgzsbgugalnn3uk5ofdsiwe5l8cb240wacpt4imwwnoej4klhtxwefs5kd7q0g53',
                flowReceiverComponent: '0h3dv7gy58xegbawm4cv38yfetdxej0jk28zja0wtdcgyqvx4prcqlyj5cu0jaxjs5qzjhdb5lliecmvzo4e269lkw3fxghv20vodiu80pu57phcaiheba7xisa6q3yky5fo6do196xprtxtd6fi777rgkmjbxp2',
                flowInterfaceName: '4iww90kx12sqifrrq8f2mbmhteyq03stwgkcxz1knndvebophq6fzpwowllh5dhtl9gl1tn61s41zdkaun78nuo1ft1x0cc72hocrypevk8469devtoalko0dfm9kughpjuuwktih357d5hzyxsx0y9b752ohamt',
                flowInterfaceNamespace: '1zqez3ei4enq6wlvv476xfqpqh7vijiftaungiw2is1gvcyz7f08g9e1ioohoqsqvo33qdr4jpkpgp1cvv03fhqewub0vx7ceg8l4ih4myhwqgonxfwq5fmannets0kpq2uicxrxukv6ia0ikjog23vlxsxh6zsc',
                version: null,
                parameterGroup: '8o06r13feymq0l2kgbumocf9fd82nb4d83quzuen70wc2hxhx8muebd48l52st0mqmuifxz6xf9bm8benkerf43o9alrtevpya2iojr5kn5cchh13wreqq1jhsrstfvsjmjs4rm3sx72wh6962epd2ekd0xxoxerk711res6wen1kq90bzfpyg0155vfe9ynnsa65ggpp2wk03ujwysezx2m10hbc03p860fy4lh8ndy68lu7me2n7w15z23qdo',
                name: 'aep982jc12rdq99oxgy3udxwyh15mq84c9h69w1frnlhmj0ka1jszvuo129g607d0730t10y0xjbfej4t9ehd6ninufmvzcowszif1rj8e22p10pbjo3rdkm8t5wm7f4fqfar5tjcuvarpsuqmkg9xfuwyo8tnbn6x872fmwbod5tjlogion43wlc5umfn0u8k5rt2z8b5avy542vqp08vyhzps5dif6xibc5xk4ko0lfrer4thc0bukbbfr9jz7hctc5nphwrrx72042r2h4qs1g7xnhh0qq1zes8djm19n4mfqh9r0q6xjoyr21yyo',
                parameterName: 'sf1y1gidp2l8r0znmlqycncpo16naha8z1wm3x7l76ke4epx1t4fhqknq9hvsaoqzu7ppus82jqihwz5d665lg5jwxy048btviv7xmy5w2e6bg99e5300123dhxno5o59qpzsxzjvqrgottb8vbhqx2l34bt0cioj61p4vw5w18g9no9qaljatw4s30k31w6izlggo8raspk07l9h9ds7f0cxmn5c16uy4zjql06qr72lpqbms78pmmetl7iuqm1dpd4uhy8yyqoj23ns7o217bxd0siufdf4g9cnw7e95va3gfh1umpj0fb7ohrw80u',
                parameterValue: '0a5mnukwoc1c1qkwodx7ctstgy4yp2ak9zj7rxxw56scclsspn9a0poyfurjqexlldp40qj7g471xtxw1e33wev5b1o830ta0h2b14s5927ruyyw3z5rxfcfaoqhk7uqnz2vr2xa7jiwxckguafztriq34nyjrbpleg70h56w7do5q5h1qcqd7dt43wvixlhh9l6yranhrnnzhal7vp5tv9xsdkkgpx7w49mmuabdhpmpw08txz3no64xhbt74cwhet17r1ljpv2aq5nzuefg019r67ps0wqigk87qhoeva9no9drhs346kra1ox845kpi4xobv6ht0hdkm6x2ht5q4sh84fkjnok6l9x8k5kr9l1mc2nt5cljr2luio2sysnz6r9n1z8nfia6fvgbeyb99oowlslce9otr8t51ooly6pqwk5yjr5g6sswhq56w8zy82hru0sczipgp47iiw6arubpbhuv5f6z3lu7wy9thrd0v79v5go9a3ztau27xc8j3kj3gcd954lgsble84r6f0lqrl1mrss9yne4itmzieg9r15l1x69jlju5f6mer2oc0vpmlehn2kadwgnxz7l723ndab6a0o1f4qnscgcz295netx4p9ju7omdq6nhetms5d74tvboatcq94b1m4qp360c4c9m19ggzsfn6eapl0lo2iryuq1jh9fohto9qx2kji0v3vgt3t72pwpoqsvddsgyeq3pvbcyzkftinovtbub3k2js5v4i9wm8yddmbca57h6c30bqfq70t9l5ny4ifcgq5jvbwzy7l0506fl7tk5xvutxripbkjgqjbkpzbrxyvmr3a485tb4ipyjnsfayrcekrwvyealvzcx2yy1csjtesnxvk3bdvizqm3w0185bwwtj7rgoja916tz5noa1k6zalvejosn1n29ptwfb18skuo85so5yiafa2xnhd27v3hb1ege74kvf9fe8cj7etin04pf68b6x03k1k2at5qkcefd8emr6ac1ye5gi6oo72k0ozmuat8k1lrb43x62kx3i9r2hwzzo9fd2x13np760i5b20skl6zrmobt0ogz9bkfhltuheicxwaqc169axw0r4yse4ckax5ka4x23phdd99qhbbmgo963luxuzxhttk097n1vq2ke12vcu9a0gzyp4r4aqarfv3lhyt4t047osxsulsmaxpxldlpgu83dq7ci781hof49ckxrkwamm7b2rwyx9pnx74ym5ky478a4h7epak1gls4tsn29raiq9d0om0hqdlc2u2fcvigb7acugzxzjoc291ycvmgxwuqwhbb0hocj02jxjk5grn1xjicp3tdtdlzl4lxjpsmfqlcn9e2yu3n1cqone3hpwceulmblog3048daf02cslrzmwvd7dfmpy2tc5oxt6e405neib1rgotyqn3l1dupqaxhnom4x90dktkuk9whym727px4dzepyn1uvxn03pk4vcn6xj3stgxqfb0kb087zfboghxpg4hha3s7x0qw40cj8xjwja9mfdn8ew8ihesa5l4ndkx2bt0hl886v1mkmw5f5vuf1c6tu6sbm7mf2beqpuzrjsbsuvo2rrk3ot6dke6q3xa95heevmyd8f107udb89cjzfyo5z71pwj71bqdyyjl3eeyao0emoga79zcbytnva9juwnw3oxa88hwzaxwwl63ycccxi5nieh7onsnqqce1awammxcvmi11chmisvfpt28iqje7ioty8vjcexbiykp6zkyt780k8gc86q1zzgf5cu4zjnbeg94jeg7hbqjxb6rb1p86nlqx7bazgm20xs9pmqbvvndbd94138b52ll90o26du5i9ttihanwxqxsegj2h9akok1c1vi8kp7kg7li3hr21x5ljfyoa3mrf6zin89a3kxc10ur1e5gofcyzd1vl08y15g599hxk9dhb1rluqbe8ep14igjj1c6e05ds0g6rgrow2bsvfnt3qwpzwlcjs4f2mzn40h3mtgvpn2ttud5rs06yz',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'zyb5fd8o161xmzn4z2ejncn03tdpy3u7lrg4kqjqxwjpci0n6q',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'ru5xhs5vybzxexm0yn9i',
                channelHash: 'weyhbs5yiqp071xa147z631rqj7ws4fuwyxiimmt',
                channelParty: '9aeac3gc1m4sxl8t78rmdvq2q6s8mnvprfwblbpy63rwkinj2ewve1wnk6bxrmgzhebvpfebaz0lqiuf80idkpxd882db0w6n129bvgi9881e4db06894uo19bmkxiyb3a7i5uyjiy1v1zypq9s8k108379feh8d',
                channelComponent: 'cqausix956fb6zes7lzcsoinjt9pv2ft6wt3b98x6m5mp2pt32sknnqvqa5euamorh5ctuc8ofvaj1y1f1t604wpd0jqtyixnm1l4wgve8cbvdmbx40lcosqk39u92n0adshcs53sz8d0hox18u0dtsxl1x12bst',
                channelName: 'otxdvwx1e0vffs79874s1775o6sm1gaqpa6mwzmc5njohc6zjyf4vu3kx2pnlj8npx1mgl1ph2bhiltw5j94u6hn0vpm225rldxp5sbc989k4yuu67ef91octi0mser8lneki2ck4qwd5h4q4z3nvov0id753wuv',
                flowHash: 'k1n2vcff0fpjld8fjd2519ovsbp53fwkqi9yjgqq',
                flowParty: 'v5xyci0m95sk2t0woijc9awdhh25j9bhh3s2rvupcjmfji4jtp4qz522o6xe3ulxi02zniy2rc9k40f391xqi188q04603dz6awcwh64x4lds3c8nw4n4ymt0huml0vnpixh3ls9xzaua1cmrbi2g8xkpabys4rx',
                flowReceiverParty: 'yo7d67czjtcqif5hsc47o8nny2b7o617u26xncbcp9z3rct544nvk5ar9hsp5iqu70yya2gg8h6sz4yk34kt1zywafd45ss0hszi49yoretubcjffjm1yyccik6zaq9jkq17s6pf5yke650gbdwvyxyifrabo5hg',
                flowComponent: 'v6kl0i42ojuobivjcrby2ww2137uk3zmnd1v8w5ivi3yxjc7fcq7wqozoco75fqap9q7m6g9oi75hd0muje5dcs5whpbktmdivk4chrasdxt5xnzoc6eoiuuy7hfq49e2w3tvuid0o2j6w3ay0pg9dj239ceqxyu',
                flowReceiverComponent: 'eb16gdhuwmwdioge2bjo2ba2ojai1qz0nfch9qz869ccy1623b8kj9u1hkvhfotnxi13sc8cs15awxgpuesg68s4sm5cc74dhykvupeqohr1nkoz7kuru2ol7dpus8ij36lggtwrbc0mdaa3prw2kczdj03xzvus',
                flowInterfaceName: 'a41y3v4467ct6taa7why94af8uys3guuta4ykkgt5ye87qi0z4c5zujfbzuynprh4x58lqac24k0uk7p85fyvcd508tz5e7zk2r5b2l61i2au84mtmy2ic3h88btz6ur1a2kek522f3kzoy4z6sksftdpl05s0px',
                flowInterfaceNamespace: 'yuwrb0fd4tmfc4heqnyreierslyy9pjbdqnna92yb8tkioytme8ao3w9uiuh9p84v0ta2xkpbe4v99dv3ahghy4zlqy53l0t3t5u6xnwfrgrwj0o2aqtgmpsop4ecghltki9rxg4o7rwykiwvnxr6q6igwp3u0uy',
                
                parameterGroup: '8mjl4jkrwph3qm3rf2gglt9dg11huowxjkrwot92klc8igywyyo3v6vcmhcsgmfb790klto9qi3kt8joj1pdckvo16o8akuxwino6j1yovjjqyxe48wy4f630n8mmpgi9n4udebg3dapiilxsacwtazbmr9ctun5fj5v5erx436x4k43d2bsvk43bo6iun88s4t8577erud32uotd53mwglhtgtddlp897mg38rolyxdbm5w6zlxwtqypz8td41',
                name: 'dkcucjfswehlzfl86mvq0zkra0zrtwsktdt4bf0wdkzv980ijumjagttunwmvyokwf3vtk72wf764svn31j8elp1ajbet10uzff19aocb6hxzo2eof1dvrpynwjbnn9nv5m0osdrb7o33n2m0ybgdp4p5us9sakbnh5s1vqqfxv8hk8yqw5b76m24zbr2mvtrox89qzj8cf6mb2s6clsnwveu51tvzvx9zp1jlz0jyksfbbaqwsgaxg140w44rtsqp60baqq19t8nlofa4v8y2x4beyi1cpf0iira565vazip6nkyasncs4nd4fp2m8v',
                parameterName: 'c3sxyln1ee6t4mhzpikvit4ugq36mi7jp1pbahg2d8x5di4go7f9w2krsx2ohrra8muzvq96ahp8ijcqz5o22vh5iq1yves8rwkwbs3jbtbm6rsbhfdl2ri3xjinnwgmcua9ozovjvjzoq33jtd6534ttw9k3p6roltxowdz1rxosy6gj7a5ixpvvizunf7abhg9a8xx8rsrb2ugwn3g7onwgflko5304w389twaouvpxosd36ntnqm45oideop26v4i7bm98pm5cdqxgba4jzi4j6jr56ddrz6jpv9tmguj0hxklbqy00uas4ns51cd',
                parameterValue: 'l7bboqwdwz4ll504tvey09zp1qzw4prw5j57o9qpz4kdaauh04ow779qwg2imw92n4g33uvtimd4b75fu3kntfok296adxz7vigq4tzclmbinpfk61cdhdb91ur681offot3z5uh5jcxmryahx8bc3rh9fhxqnhy44vuk9w7ktt6d3k087utjsa983vmfnxk2mprogwzsimbo6jrqtzwpsah243op7h9mmujvnnj2ai0ybe4axe0kfh31jbm61e3fhfmx01z08k99fe1cf593srz1aq6iq6m4k2b1bois8afjok2w8k4ctuxzya247stnt5pbnnaa5ddvxm4uef6cmbslhm3u9xpikhelz2if1tj5ekne3qogyeva3i3dxl22hybj9l5t4yynw75tsac9idtjax9cgeii1129rcgbyzhfvviwuthuote38zcmzs80s6afhp9pwb0xitkxwqnu79bttrp3q0peii794q8c4htpuueyx121d9msgflhm0n6zb750mv9x5ztck23kv2bw0fiyq1wikpbpbsaiq1v83klf40ibf5ggpt5fm9v6oc1wa2syx9aupb6dnl3wr06kqilpgranrzejt7d0h7tawkmc3jhi07zsaqkjg66dgxeopfn444dbyh56wt9u9puh93els1qvqkflbxc0nzsm6gzoc0pf9hwnpb5tp0k700do564rp38jf2s8soe7002nz8xkdzqt9ddgxrh8j33bn0b6lc3uunn1g8a33a7ibldycanq9cyntzs6opqp72b4hyla1zxwyj3spxngyzq32gpp6koo41488759vgbtittvmr5o7jl0nsfwqg1wydf8tuxblhn98mfq50j7oqiegutkvktgbojsczmlduohxlwqyyamheewiymk5ltoj0nl5jiid9ook8ypebvvkk3gopka7gb7udm2tu4933htk7wwqwubmqyyhe160pjvx0ql208phcizgmab1hvu13o5mq7c4qfuoenrssqf0en44o6fajufuecdfn3pwkpjjtd85hqg6sjletvgzvinl21m3f2f488it2slxz0oqtje432tfnjgapfdk8bircl7dgyag3dqh3k0450zta2u28zygtvsgalqspul2f9c4nqtlo6itaz25skmcswowv91a30iwcosf611mxpqhflzq1nhpmqxp5bn49kxo2bk6vbwmugpwkfn36kq081r7m9xmzoedoc880heu7owpg0bsuipkx15on9q8pytqn89nbm7pdbs4lca85yn0zv3zjeez23lgr8e968p7kk8mxnq6v8n96heohdbnr8hzsztxrwidr2yf4s5l7cuq9g0uv8d3kxqctw8fyu70rlr4df8psj4hb2v28l1lfcbfy633uyf98ajnuvgemvnhuck38j53qhih08wvm82rw6gc1afyh04bczapxf52qb4h3a22kzyze5fo1zu2w3krttmq0nyc23c1uvuizmztf2yupgblfhxr1tlvd0gpb00dmxlut9rrewjblhjkpgxusk2tsjhvya6iuszkb29kel7ts4imc8r0d7w8a5ext6brfajkd5oclatabs52kmqoqxws67p81r573jg764t41eecp4ggt00j0tn6012swuqb84zd0zxi2nwrq3bncikcanvixppw0dd9pqb2q3690jopohhksxzuo3yn4dbb28v4omuvz4aoxnwex8nvma57z4vfhgudsn541zhvx4i5mz2pl37xonnch4mgx8t864j9q3xj59kbp4pd3coauip8gfaw15o8doe5uuuxu4h45wompki8rc9igozissbgjtr2jyacft2dtijnvyn5sbuqnaqohfddaosfzdxu1f2xrj0ndtcmzb96x3fiou7021l0ysdxier6fkra80qtgx5bwwn244ux01lbqk3ft9stxdwriws51mcyiu3flhsw1mo7xeq6zref01skq4rhls7xn2ctu0gbdw2kdifxznv3fo29cnp0r4epamg6c05hbl0ygd3fmuvvz',
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
                id: 'ugqls2e0lx9mkitebg66b3qlvhrrgrd2kborg',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'wakta6arn3h4gmtwtz3r5kc53quwhdzu4j2d8b1mjmu95qb5r7',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '6f1bjlnz6wx71f9c1wa2',
                channelHash: '8034dxv1pa85uiug5fjchb41d3qwlndplcbtlid6',
                channelParty: '12shgdfr2c1hpi89txqg4txa2g1kejawtzbo0ozexyx1kfleaolvvbrc8diunlv02q289fxhgtdwre6ndkhg7j37mbs28rsyhb00o9yxhtzlgkyuemwz6qyir6yi7uxl4ixqil1j4nwkweqip43stautftya9uka',
                channelComponent: 'uvlu4uc1tv3lbyclebcjc6fh541tfk6zr0p7cm3q6k17o782t5acx98lzgnobr0hjldqf4lw1ysy1bsaqt12gbi7810d2j4bzobaknv3hw2h4texnfcu6am0kjxenm0ght9zmrolbgpcck4ic0ixr6mdc6anfw1m',
                channelName: '2uzder4luuszkdfju7912fd8yxiq7w7us134po19j92uxm1ebqsv2x9fol5jui6bl7ch7k0h7sm3kjea48fu6gdhofgnpdsunjitjxhfnhgw7p4c9cydq7rlvtjlaxh2gud9otbthpu0fop1p8sl9af090dgcksz',
                flowHash: '9r1u1jqrho74yvvbjfwn2f92bserevmagolrsaud',
                flowParty: '1f16n13q3e5uez41nyj3wyxwwjdsryz8197w9ti6wojjrm6kdgxmjyw9w3yooqgi0cjh4z58cfr9bmzgac1by08os6ocudg2pkmd8v21ini291qftj3ym7g2r26cd7t8m0hdkzzy021s546y7g1s68bsw8uoua9b',
                flowReceiverParty: 'nw84t90kgq87ga5rqjricow7f4ymj21hi2r1k7046mlv4v31qxxskxquywvcufyjpe204vk3wlooaz0bibj74492klqozh038sovsg4fg32zlnwgsfyuhbku22kmhzjqte6605e7u7qgdfycdfwn18ba85aa3wus',
                flowComponent: 'jp4scegwc9d7daipfplexv8yhybeur6olpjsmfp106bw3011ajiseio7rpas9pspp8xzz5en247twq8iotpgq1c5cqchgak1wlsg004wczbefbosfpnbxvd58a4q1evggzkdvr86v5r6eho14cp1vfa2loq12o0o',
                flowReceiverComponent: 'jjrw69omurgj7xu29enx2z8gs0c8lid2hobig6e7dxfw9l1j7mpx7wg2z9zqfhl6noef4a2lcslz6pekv4ri4d5wau65rjoob9czq6lbsz0ifnv2xz4oepfrohtms3yfcim4vd193soyrvxi3uc8f88mmfx80990',
                flowInterfaceName: 'vr8v2uuj893sdaq5yybs2bs4xxd4993oo68d0xfb1wgq7d403oses8o9d6xjdwg9pp83uezcnnv87cxkrsl8mfasj13xnvuglmvmfj4kr4kibuh9fd1eyzsaoqsvpqy8vd6ufps1xoxztw5d2fqzr4fg64t6i20a',
                flowInterfaceNamespace: '80bktnqgha3e16e73xijz9nne8i32dlofmp0jblwxqya9cauhoupvyb2noqb181vhla5xupr3wjk0gk72wviagw16tmxpf4otfq4spam66kxknnyag3v0nekboegkh216if4fwc6chnspv7fmc8885zj5vcttw7s',
                version: '3sado0tfr9idgrg1sypk',
                parameterGroup: 'z27hk5ll90dcaqk8mkfaqpysij4pulfbdn9y5jztzigpfgz77is0kbz13dyjsggmn2z3c1a9f3yqyfu0hp3gjnj95vz61fxiuo6c37dxzk0ymsm3qc6vfksa9fd0r52v14xl479qcq3n27xqxd0fe4f8plmr9itqc5xwggwg4i8lyi8v96mukh8cdoki2flukxf8corl62g79azb5ntewte7990ifyn8a4zgmciae95zkda1vn3tnjr0yb2inab',
                name: '5feb43gmcx5cafhu7hjwqe5z75oqccukgmy54u1gov2wpkkqe4n288p3dqgkdlvx4h4tzf7r8lv49oozqf4ow3oh835s621uq0fdqh1iwadnlyp2xcmb3m51guv0oxpu8c1dgos02gzvpue2nwvoh02dprm37z61xt4fudcmdrl12qh7vjn9goueukq3a3xw7evujdvjjdsi85x85n9qseqa7r5mb2q4mrdzsd67dftubsaagymxap2sqwsbcqfnu6czli58o5twzlu9ygm61alxrdzuapd2ybu93988odafl70jgp9wz48ra112m7o9',
                parameterName: 'hd9vl9e1pr0hnne47um3qxxg7ls03l2mzhudft5tdryd1rahhrufzzkp4w4kt8ts0hfsljmksdx838p9l3pwf9tjsj0jmreqbs6s7sxuzkiezj05yeitcfwi9uzirwkomvs35di1h8mr15qvq7bbjzf0ydgmiml9pswge6admdz44tmhagm9o8fpuzte74oawlj7mgro438pc3gem99gcz2qydwrtu95ha5p2wnbe6clxmwv8rpyi5wcaa92kjxveazswgilr1xbezawfixr34c44olnr6od5sle5inw3xfmi5x6esurnh7whzp1l1a3',
                parameterValue: 'hrtm4w56iqr52paxyxe3rw8bpue7b4in15l837mz11ap6q2h9adm5auce8vik6j8xhtunlozsalrtmr4q0hjrfmp0wt4lwi5tk9d3rbkykpl0s9ejrtigxkiqd9v6skbjirn9v7xrmmbkne349cqpbfseocd8xfpezvwwdgzn3garcgeou1uqrqekwro5p581757flchym5fgbdo2lc5rktmvvrf99r9xu2jp62k77pzlyy1rx5f1m533muewfstvqj4r85uz17oia8v6oerwdjii9brerfa4nws40dtll86x99wor6sqhtes2nvjwg530urn5n7tvsig9as1dgx38csij24ujghvzpfl7uwyenby5g682lwce9kau9zr6vvjvi2wxo9rcmf44i8qfb1kva8m8ydic71oe46r1u2rjzqj1wsagfhrv2gnsoyruswotzaydfnr0n5n4d076t1ueam8rv91qgf5pzi45da9dnc7uyjdhnsaokvijrfko04qvx9dmfa61t5c6hkduxnyuybd13wk5a80i4nb0ljrh3mxmz2qgkq8ejw2rviqdjz0n8u2q9bwsl10qg0jl44dws2dd15imwh3oa6hji74t2k89ntjtsw2rr1y1dqg9ronz5kxnf0rh51kcwnbxflzakl55xas3g6kcc5hi63ag7izvveqxzl1bzs8exidv2v6neybluhgr36oc943chav9qimgo8up9kxzwfatomknik00q43gc3gl1f83i2jyx1f841yvqc94vn0al2r4r7k91yarcqhljw1w5mmkvy0w2d2whg22eeo6koy350670xnce9xzyd70wyaujqlib70edvb68xe5xlgxgpa8a6jfrfgpaqmffemt9oiqlco0x0l4lo6gng6vkc5rebig0f7bh7eyd2vp3tyanizr3taxt9psr7iocglpsnpvv2214tq7dcu4142finlng2b1verl1ro7us2ob20xvsa07u57804lywkoy7m1inuk4fs0kl41isk1h76gbz0r96r0wqld5piip4yrpdgub4lt3lyxc7ucaf115ik6zvbvcgdqion5o2w2dlvkhsuh946pfgvekj31gohnt1q7j2u15wf55qspesyho1fysvztje1g8x1jnsq5qo63a40egbnpkrag1n7tw3cjluoglvmgj822gzene33otonsfb3xmfd4xu4qye1zkyv516rkl67j18dp5h3vudagz6muo8mkhwvtn74op6j7hew0a161h4tp4qnouza2itobu3mvluzx2qy7p017q1c0a9zg22deibixt2pkqoh37klf57ksd3ew1yjobjpsmn78o0wr4ek7t8blx5iojj6pso57g02g9bebic0kpv75oo82vj8aw2nk5he7jx09uzv8pit0t0jg8cclq1rkpvtholc881prcw5xy8ig96qsy6xt0dk65rky1jjbygt136wgvv33o7bq6a6zdq68fdi6gmv5blqknhbu7w8gi3xiz2rnz4aym1hb14xv2leex9na0vec74udf2rtq21i5ll804cyqaxec3gafho4aev8s6jl0y2x0fr8xifju2ong7f08o3ve4bycxno9qsul0bm2oqmceyj61ys8illq0hfzbg1iddvivw0ysv7hmbghxy753uwlibqwf74lxxi8imldgrrm20xjgb5weky5m3g95v0l3ebd2v7jy0nrddawc0g2mugg8e0dms9p8wccuovkd1ltaw69un0df633c97y34lppg2b6nqxty7m7p6qph35o3j0l4h528d1b9cwlcvnrieul6xh5mksr1hj8hufwh5w6ter5snse03t8oe0eku1etwz63bxffmuymj313c2r4tbs914z6qtwm36e8sps90e3ocmh9ub7w3pwp106s5zwrgmivpunvc2rykn1u0aiyilp5i2lil65czgjphina67xwcim8x02zvjcwjxn3mo55z28i8p9oxzggw74r09pomk4atwpl7cnztvnwf08pj3j8jyy4qav',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'uv9w6m3bya392571brg9yy8f3wlu4ppovjmkx',
                tenantCode: 'of01he83ms5q01qehubsnf0bkifnb8xhdk3vez6p0x6aiu6s9h',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '6mb2n3rwkwdzb2pknxgm',
                channelHash: 'os6lkdutj0s74yhncgn293vldg3hjnof4l8yf2mq',
                channelParty: 'w9llazjr183gjs8yrall3qrteevvwge96jbj3qr780b4n99emqmfacz0e9ywh3unucg64yqhxo3i8zgflyzzwlpal2s557i3yen8km3cb0c32ut5hi0ajl5rn5uwyqghlsbrrh9q0p4lmuyylzs3trmetd0f7953',
                channelComponent: '7y4nmaibhenpkr0z4eh9mqcbaddrjfq1i904bylhy0qjatejfw95bavta9piqlq18rs7zj79gfa1ncd30tv4pwn6dfhgyuhqipycps2pd5sra7j8sui3h3r8xsyocr0ak4j43604pafw46bhee5sidipgbn1hoqf',
                channelName: 'ex6n1byuuyfdyct027m1as40i6mn3g3bcuqsgvosvitdd4fz7v220wl04atd36pp54176qzmlqt0k0k3gfv9z1mobekcv2mjghg74rr5v7l2zk9s1suyz52469xvxw110m9cptximlwx18zf9us1llrd0tk8qr10',
                flowHash: 'm91cpgxxp25gn8xpqf1kj7cr23pr78mvrx3nujft',
                flowParty: '6dqrz816hvoms5dhvj3rrywqot0tvrmf7m2oampi03dojcr90mj6bs9w083decyu2gjq62cwffckhn30415e4t0mpkfje06ehtgmt9vj1ajktvkjlew8smdfuikz2hmb9vgg5rdi0l8whztmeqsjxprmml6u446h',
                flowReceiverParty: 'c4gtp2lp4iy1htavjy3ifc198q0gt3l0i8a6kl6pa6s2ntl45wj89kpolrd0kj9uhxv5tdf4cbr17a9opyjxr58bq6j4bvhqlnyl0jwj8cvhodgbtm0xnq3jv4qzgxhh7mzgia04nzuhjjb3lxa8bdae9toe00ge',
                flowComponent: '3q86fzh93222id5vg9z6exkct5lvresuvqmuujk20tfk72q5fcz4sqr7q5a4ucp88lppw5d0v32ox830dbrl8gk06x5hyg908r9vzmtghcrqgg5f670mz6xh5ry74v4jv1s1pel0cdfeb935q5fns0ba0oq9gqw6',
                flowReceiverComponent: '11oelh5zrmqxynzm2c31d8t9po68t4ycq3un804h4mj7l94xz32cfabj13yjy7ktcelgpi6t1823scgraqvq36b9h3z0c36d310mz58phusjzh70dz8xjjxy0w5sd8l5u40mye4592ovaxxdm3h2ojssgkeec2ii',
                flowInterfaceName: 'qj3ae6cl46gnr25e4kwbm56u8n4alfv83gkukgcdrcnwzh7erh4fqqcwq5zu708buly2u8fzaahx5xtppwny99omfqwpgw6wi5t4k5n5uwfvccf47w49ldcbj44gooidtmybeqpgihlt9i9qcwwuoy923d64n01f',
                flowInterfaceNamespace: '6l2a6lunb0uu4y6oeww5v63ac7ljdgg5x42upov02aq9n1a9obn6s52rde78ns7oi6mpnujgj1ggbrp50ua7i88blv52xpu7pmtechz3qnydtp7dt4ek2z4ahiwvz3plzl5wsgsattwv8nyb5kjot3kfsg8g78f4',
                version: '1chnw98g0bk0aguuapgg',
                parameterGroup: '3bvxrwttx2eq2ixc96mrasfkmgwih1qzk0rmnlbjvfbm1aqsrjgjh68uib8rq2iihkka9224jk431vb8or7brwekvfwiaz7c043h34powlmnvh20cfegh1s0t4jwy1e0i5qkcy90tiroae399351y71ldh682beanxhljy18lros8lixxxjvl2c4li3oyzcc3hk3cijk1ccgb9ed3hicdu6gjbcnjbh9mwqvcp82gao18saa4o7p96drr3r9blm',
                name: '4wibpbly99ca7sk1tzbf0rpyszmyszkjtr538ecld3y43g5kcuq867p59d7cvqc0qpzqupxuaxwn18t8fizuzwv9bnjg34ad7yokrcsbz3q62ijcl3u2nzbvp530893rny1m2yhkak117iqypzv20itwpyo5gyf9yrri8wvr56ubft35zgxm96cmrb77iazztfhufgaxe39127tt4539ldofx8g0456c2h5bbjaqim9cdyadsfxkhu7y3eyddrs80az4352g0n2bewoq76i6ie69hjfyzhrq9t6nwzbkaa86ybqvkjnmt5l2vbc44kv7',
                parameterName: 'i54zcfga9qdy35liooutk2pmdo3pyjmgsg9xpjciijlb5ir8ih6302bbs35ra8qfm1arip8w34viwp9uq5cog97ld885vi534vzmzw9nn4q5m1yl8zcktnf2r08uvia20gpd3ooazid8nuutlbtrb4dm8ho1uscd9exo5c73cq1jnhs3j6khqz36lyh2ijcjo3yhcvsd1acif1kly8xachmgbbjs6czovdlm04qtoq2dfdy9bzt434ckagc3swwnh49m0kefht25hmnb5r053cfz7abuhv23in7v5kqo7lxoaxckzmmlk78y0pkd1dk1',
                parameterValue: '3bxsohnuotak0rg22m697zw5av8lr2twsxlbmff33s553xqo0072ph3md0spddoqc2pw82fzla4bjjrzn9czu40aexpbcl6x8cp5i3x7vz2jujy3800f9w4btpx525af2qqh9jc7qsu8irahzs2sdw0itaf2r82ggoflm2swstaazsq5rc3h0hzyasu229xynpqkns4p1tntsu02gohn66viqv54wr8g48r7pxm5n397ipq0ss11zito410umhhvn3vp0oxdgvl5g2zt2zs67rtwp43pwwzkdhyr4gvngfofj201vcvwi9djfv0u6ztp46vfrbq390n4h4bckop5b65n7w4a6gisk57a4wz5g5aa0l9m8369y0qi9lk5xjr3pyxe7j0fgn55o3sb03i59osy7390ozmbji8cxbzvwjwjkym6e21osbrw2zhrr1gdvprnyvlo06arwc3ud88e8lyhxqj3eghjwh0mg4dj9hjitjf6fdtaee5wuic8i5fxoviusu8wcwvkcjgcvfcz6dx1dzu2q4jqpo5fi3ksdo7l1ombvjtizyjmletxk1vpf9kzfsob8q0v5qe9crpc517lh59sz1ladyjobqzlk0brmpzip6ct4x37nh45703ctdz1bumary0xjc5ztjbotc1tsd1yo9a62idnkra5uglml79kr9e49djklz64qylei3prk45li5hfxsi32ut4bzxg0641y5aimeejq80kshkox26aj0cupr3ei2s128euhuapoce8j3f4t0funbkwrtc6onvvkfgrd1c5wjs2fbzkgijo1o48ofhymsaxvjegfdxjvoplvtwd25398ledqnt5t605los22in5vttoyn9v5ovdbkllw18wkj65nl1y8h81bdsomxwwxqdy7ajkoondb5nr1qyga9ibq677f7a8soavq18lz0oetelrkmvb3xwuf5ux4neznrbog7ucie5avpswd4jzdy4dc8fct4rcfk9zvtqyv4dmlp5wlg31jkwj8fgy4km364p3zftda4sqkhp3zd3mqx5x3lqaz93pmms615bnbyyo8c6t8rrwd40yj3o8id7t98c9veud3n7lcfq9p4ebxknx5rphmlk9e64l7bhsuwxgx6sav7vuozexl76xnjnzohzfiekoocxxqkmvupq9ukuilklzbpuft2sys36qxdhjwg9gt2rqowfejrk6g7qck2bff9e11offq4z9n9c2k5ygw88m2u56r3x44p3gtarxt7jbb1b5stru35cq5b1sw2rzn4hndsmjoe8tr5sdnjn4ei6669igplzfa97wg0zobla8lvzt8n4ys6fa32dw8xjbell6rwvy6r47y9o2o2ibno36h2hl19m7548fiwzel5dft8648nwz8dqc0ikiuzkzcjpc7ashmyvubn7zdd4cb3hfs2ejeh26c50vmcx9s0ccfsuugf0w6hcb9ppttwx5glks1qwi5q3jlcwld25w0tfigb1611ylwlf9jrt2xyg3pvm8dks6tb57hodyn3l51hydse58b93e2kke5pvl6iokm4fpz4ifs38sfv72wepq4ajiv8tup2wmq2rou9s111rkxxorcrrzkqoe89eqqq8fab5wqyxyv5oe7pcra9dwopomubifgw4hkkuact1j5gzo922rravnubab1ca9ro5q2g6iptzc5lm55y3yf0um4j1jhvcaj46kc8tgki0xshs4l5qv1ml3l3rzhki3ebtdkrb5seg70wjbwg26nvs6x2v3dtiwgoo1opt43dw65qeew5ml6hdgm0yrjcpuy2t2047dqtq5fc78td18aimhm5aqibxhh2vzibz6icw9d2me2lquh8dmtys9n5sdo29e720r0x4am5utu68zscjfmqv7yldbr6mp5t26xu6ibdcnwsu3svpnoicsbe38a1z1tyd5lims9bgwb62rxiiznzqqhcug34tyn2hr5vweq9d1dnk7t7oqivl792eyy71uw9vo3p7lplflpv8uzsisxhgf',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '7yu2ldskpiz7n19vpx8piilr6tqfdoluwu920tfg4yhlpni908',
                systemId: '1wlb6ivgkdask37no7552i5hd6w3n1bemlueh',
                systemName: 'g9y7106mbi2il1996q4o',
                channelHash: 'zhy3l5dy2ycyxm4gpc0tdofcet1hkwnxtauq3ud1',
                channelParty: 'tc9u1jxfmikile78kc935qbsurlgsr9g2phk3v4o0k4wvg37x4ewd1ukr2xemdhhre0fixn5zabsajt3pstq77va4a9vu0v8x2l8r329d67tsd80ffu0nhjalqx260fqdj6ldbj1z4u1imt61qxpz5vewta3d4oz',
                channelComponent: 'txm14vx22pr5kww1qrx7qmxtamdq56vsv4xx1xc89o5qum2kyfpoyp4t1ddls29c851uup6r9t0g815d5pmqxhcg92n93t4ksh96d0bsg0ohm74wz56rb6lp71bhtm6l0rnb4ii30cwybguapjnyv5ib13dpzlwq',
                channelName: 's31ahue0ykkkf9efhy75jmd2wav6i37upa0x3qtw9shrflbr5m9f459y3dkymmkbhaypiyff31y5tdvkft61kxilr81fc0gbm3x5ji0kfs9zc0sxoffn2bxjkbg7f1mxoq24jg28n5x9kuzj38ru18exgpbc3d09',
                flowHash: 'd01ctxudyhuvdkhke5086n5ygslv4snq1pv715bo',
                flowParty: 'ez45ucgzedst2kcjjcff7qmgbsev4l7f3mykp93v0g4wamner6q0abxzk19dckr54muv8zy4ms4dxiprz3312775v1fzrigl9fucsltu4xwrajkihiyy1soy4rzwylu7dloq4vy3wqb9a415ptuc2jc8le4gvlp6',
                flowReceiverParty: 'f96bn6dprdmgn549hebffxg6kojwpb7vu84mcqm9t2q4y8gsh5pm9bycyjo35k70svzn0yjhqwcy32vzilry8x8hhdg3yb7cw4mjbhd6lbn3aj5fpl0m7mym6piqgkbkfp3kyu7z914pp4t2964n6n0uvbj7zn3p',
                flowComponent: 'w9qdate931sbinqm164ej9my5d41cg7h2t1n1likjr64t1cka8rds71cc3u0fk13w76vi2ai9ce2iwehnj4m129kn51820o3hyig0du0dw9r1ga8j1shiv3p5vwegixmswy1vtkscitu8m0u3pgla4c3p0ev5p65',
                flowReceiverComponent: 's57wwz3dy7cbhkr1e6076dppl53tnkz63gegsfk7gro9dxcdeaifre65bd9y2enl00od4mn2deteazvd37gw02on7vg0z3jy26zumdojha8jm6khv8f54cidlrkksvpd97hp2v2ak2srul8og2mg3lji8dpwuurx',
                flowInterfaceName: '206cubrmtp5xf9xl8xz8huxtg86xfl4jitetirwnkkipz48zty6eipnd10gvtpf5d4yzft3c1pf5uanu2s71dwnienhdxu4yleq15ftjgct67vgjpsnav9qsi98u4bgzhy2yxwxyo8xv5l92seqb32c0hbzimdv7',
                flowInterfaceNamespace: '8qmw06fqs70bqkklll41edjmlxhpiu8i0lznjln89azmitx9lw4p6n867aat87uh1q6gja4avid4rlkzfg4gnzi3htaxhbrb7t9tn2an1oojle901etfbdd3mtkk3357awrkshqp5nv65nyp400l2231qqmgxrkb',
                version: 'ovds6paahj4wnb02upjt',
                parameterGroup: 'pv53xau6eqd58prfz7qplnp180o2xfuoogf4nzs2wdzjpwyfmf3zy055zjbvhcp7kun4thwtlqajn0u2fhcjfgxp6dn2jf2doeltr85wse20o7crsprdl1so9nee4rbp26hemh8zxc0o2tsrikp1umxpd1hcqohbjt84xvwfyptm4yo3szb1v3lz62gygazczsfsih93dta1xoz38uxplrbdbbdo5c6lm6mc67gn4leiwpjzbciih95yomlkvhh',
                name: 'c7gt31s92vl6rli4v8vh83yp76jggrr8764tr1asgdrnh78elzh4yzflfid81ru9yk1tknsljdg1thnyr66k0yv42gl9b6q8i8pn7cssl4u1u7r8dc13wgy0zu1gv4jn8s1i8ec1w7j3bbk4jglie9bhhcxa5pzficbade0to2xjmrbhwa10prkhimrf3ydbkc4vgor5rzgjhbfv8oygudolq1pkf1travspxk85qc7l2s0a6nh8zzx1l1tbe9iuma8qgq47yc1m1xcc5lg9xkgvsou1ichv5sfazv28cgsck9l4kn90n2ym94xec559',
                parameterName: 'sxn4m2x4de8bjyvxo6yyd0aalzr09wuifpxlblnysmiznghipb82qhp74nj4bx4uhgz4c4x01q0e9mhqzxlff7fna2div23dlr98frlj5te8yvzh7q0xwzndj9r6e6qda76quf55jgp53u1vu5z1o472ej1knyunf4355xo19q8n2586shq2j0b3m59cpdzvrf65r9dd7hu49l5r72ebtnkre8ox2jh5qam5wvikrhefe7ynu6smgv9yw5rc93a5td6uc591hlxcqyfjd0f35xn6dvwtepqbzncjn75cvrg6jn3bwi851j9xdzd5hs0g',
                parameterValue: 'b8qfabnjhs168k7ufcw1tm5f6u3yj3nr5abpbvvaswlt7xwfhk07l370f1mrbm9gpo3xel3rdvqu8j0reqbko1y1h9tkwtah69gcyddsyfxhzzoatmyttub0jkcksq3497qiyr6btp5fqyt7mpkde8iuyi876uvtwuw81dqtap90r9ek6wi7r559yycyrvvbms75xeue6oulu26s5zvvluxqh8ivlzrzv5bvx7m1mj35wi2yrdpkc14h5zx0jufia0ssektvgmmy7zvnr8a65n8ea0794hjrucx66l10octfu37rf2nbg3azv7fj4k4szks6id2x6p44if29j0veajpfecpz9gtbxrznl2jh4wsmax13wvnx3ysyqoh0trzpfyln80xfin23u0lw0lz6lcegxnvfr5m94ci97udqjfjavb4ki01ulcnub6cxtxi5ot1bn1qf00ift6csfzpourtbwh3t1654fz8lst2vr0w2k9s8kds5yue7pir68frcl7moc27f960u9nzt3xqixj4dsc68lbjqutgawtanp3ofagb6gdol4fktxv4nifxb5to0dx6ktjfwz7jnr153ke8i743vkp5rx8wkbssxp1ygq3b8qqv1q9n3umdxxajqfnlic2pc7ywrbxkv4wrw2uz27hmfw9bx1xjrj2e76dughoou20hc6m97dat7qrz1okylm1he10j4343kbsomigcm3a6spgbf6yh1ate38j5z9wef14761ar46be9qt6hu908zujtx7qkuqmwuff3cc8jp3dosou1zpnovdhjzmvvjwywzd2nrjmgb52xyt1es176rm479ho34l1h4q8437gphkbbbgtrau97ww80m7a41ubhudqqlx22tdh5wkprocrqijpyka3drrmgm6hvft273uox33zl05lowjemzx8nhtmuxeoi21t1dxza24vc006zxvn93gziou3drv8seboheonbdao5hdh7jdj22cgy09prawxekm5w1za673d07z5ci1xq5tfg992er42tmg9pgkfq31tqsz8nwqrztluuej8n42ql8otw0erwon8r18e4kd6lqfm8pez647ptpo5yejegbm4dpwhdw1egs6b0ukc8d954gl165xfniaxyagnj9idhuuba6mdfr9529q0ffmecgfz1xwsma9ps0ktph5rk4os78ndyzo81ottdivy5mst4d1kktw5jiwgm9b8vi1gu8hsq99zvha00mulmv7kzn1uqvgphw22lo18m5sdxgg9042jsphl8coya3h8ejik3p74beo2pfu0zkzpc6qr23imxete794rpprc5uhe5mhkqlgxgkk2a5b3ysyurcqhjub3i2gwza5wjp2yqj0x0016c3e5ywhs3hikfz5x8sep3g0o6m5bzvan2m4772zzxdfuhbxgbaoqtrc607m2n6lx7044bj2zm192iwqqb63zjhpxbxismwuqf1omvk70h1xy5jregsriphk0ob3roa652mm5jtr577u4ptyv6hcy4h377cce2axvb38h5fsx8t73k54su5gpz7445oyfpij0cydyvjrq2zqs91ucubcd3mivue19ywfobahh3lzb0e4pb19cd4gbku33gnjtcnljjqsd0o057futmq1dq5fb60m3wuia3oaz3tvx26fa8nfcwvukmpnf9xxt90fcbullhvh6m156k50o13hvo4g8yxxxaoto2eb2zx6t8l3igxzmf03mdtob4j4nd4qs2snfdsr5a3bkxagw9i544xcksc2dr66cc6kxgittaoybymh1iox02aix6tawa7pibar7ilru63tenna4sddv7el9mt0dt6yvrai2npfaqeqt4o0ssuadi0biep581jlc6wnlsazob6epw65nzn4vtaod9frt9dh8a7qelpu75tdkxag5p9aubgr141o2ranbzbjf8235749oxzfq6grvtwxk4b0f2ul1hk95pprwhhzjz0xtnwu2o4h6p1oy6ukcex9v5pipsi5r6c35u',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'cnh6bwcf68wemy76oest2sd46z4qqn4wzyojlzmrlpk00ontob',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'xo42z5k4ofdwpkoqazyx',
                channelHash: 'i63jpko0mo1jtubxt2jaja4enpqu7e9g76jhxth2g',
                channelParty: 'lmilkze75gueej01xgxgdbpl83vl4icxj3fz0dxpa2bieh7117wwp6kzokbu7hvfcelt3l6fsdqftnzcv2q32078x1c554dhd7quhxouah275xk74v38ai6y2erjjz7m1axfjokybel1n4qc8z0umuqr3vqz29w1',
                channelComponent: 'no899vppe7xdiu5rp9ohvdfkbl9q99ddppy7nv1fmn07720qv8z9hnak37916uz87o4ea1pbggvpvcoe5xs666i2b7mbdhub9uza3qojecx7jnmppoiiikujd2g8usw60hib3u3g4rl7skn49ijhrb77en31pctc',
                channelName: 'cytau9yo4v9kc3m5gfwgqggy3hkq0b1swrwvyg3v89gfry0l00cn5r5weuxckki1y87miry1699cgbg1qim0oxg5faqz6q0bl8pl65nxdglwm3ickz0eccqjakxqp1q9n1wox9b5uf9e47l722xai14krcuo8fk9',
                flowHash: '8g5drmz61uzw5w8pf9hfin6uocvdssvqubbp3n8p',
                flowParty: 'yzhuji1sgde53kcu9yht9fx71zktrpuy00p3k18gz5zkah075gj45iiault4qhfxfgkhfoq7kv140wbh9f0vfplegko81ffb13adtkksow7ts4obaqplsjp9we8p6n47f3h21wcgpapnzmjn2r7zb8jw6z3z0n4r',
                flowReceiverParty: 'uv3x0qrkpd27hux4f4z8hbul6xokqi4qgec3gbj25q6weob3qs0984p3f03evqqefkorrcc9xbdl2ed813h0r4qyj4kr5c6dj4ns5d09o7wqw96vo9gq31n0o9asd3pyg9sr4umk0yh9rhepdcin5gcft2cl1ds7',
                flowComponent: 'zirfzbmyxzl8o70qeew5jkcf7u4802788l3tqaxtku3hdb8pimpmulkj08cm2cvuzmpom6b9whn0cf9dryepq3wet00pv77mpjjkk99xkps06gsf0sofxht13hsgvj3l7difs067kkyov3y23d0dc9ykzu5i8wo6',
                flowReceiverComponent: 'nddsbnwfzbnr5e0x81lwltltsqy9nslwkutronezc3auvdseufbcox1brtmaiwc2mlc01p0uv988uql0d8hu179mrbr6sv1bz56j8ppz900qw7x9ffcw2m0j7y0o7cl0rr9ut5prtcygyq1ivxd4ku77trj4laug',
                flowInterfaceName: 'nvhxn6bgph5291amj650njsqv3tl04taxdayha4bh7cm7gd18rtgcw4vbkb01qzqowjswokl99re7bh9pt57nf6bleys6rh57pxzp89f0zbp3bo93sk7rdx18f28w5op7v2j3h4wlwdu1zzwxqpah50r2etwbjfl',
                flowInterfaceNamespace: 'o897oiekf2x8us6tsac3ecrv4su8f9926wh1scsj3tdd48qgigh8l5ytml0k81vqpkm6u34iaakivycf0yllr3r7683qvjl128ksznt2yl3ka96of1n39p6hi3q9bzank4de0i2uyrlfaz1wu2ef2o1e847oxb8n',
                version: 'sce9yx0d283db0cl9fcb',
                parameterGroup: 'evdi9qsqxqbx1e412cc3298ztml5m1srgyfryararwtnlxc0bp9dj20lmt15ss8eypvikq2t40rh92nswuzwnhjp03vgmrxjsclb5wlgnycs9y0804qkucm07hfw3wlzmrxihlh5kvras3efjiw71q4njqhnivyv3ku6bjs85a07d3lwha061z22f1q4b0vk5octfoihimg2w9jbszpuigpoxc3sktik6ecjuvfv6prcuna0mdlaxxfwdnkgt8x',
                name: '0nkpj395zgh7pk6grr6lvy3o4xh9esndn5cut0461thtkb3xirskhqr1cjn0zun7t4oo3pyk0eh16bvse0j7rjz5zllehn5mz8as5apajj4gcu99jmzrn3nelapvtj1axrycyk4xdvyaar89jgx4g954pjc38mmj55vhkqvcs4kvkj895dt81l7z0ujqes15n96mrf7c8nhw5cxkyu47c75x12ldovwpa6y7bs75ebdel5zodxhdam6k8mnaobjrqm7j1fwqctm757y9suclu1af09eztncycx5loxqypaek8e3xx3jsyezmhteg0dot',
                parameterName: 'udth1v0omqgqj812zw95o125vq06kivoanf58moxtpmjfxo39kkaj3j03epc6yvfx40lx5c2do9xigpmmdacgft11oappnfm1n3hidbuytsbydp4vh8t5vam6n7u6eajij1aa3528zdhyd26r1ke6y3rzfg43nluzkrnawzpa3eg9hiw3c8afodt3315qtu2bdsj5u6eax8ag2cr6v8sc2cqm04m9211wv3b965eisffvwuim6ud7gahap0ilgt5qf20svbzxru090aur5wcl4duld6rb84qs7jk2r5as3esc4dvitj6lk5ohd84x93t',
                parameterValue: 'livf5wt1gkj7u9xai0i7w8an6yud31lmoiqcjjlr9xbu50ujsr6eymsrtzfitcxpq122mziuqvy6yf384bdvzbpn58av1xhx3qzfa55wg1ni2ic9q0ekfxddap4rre1makkapugyxhrg50il9q8fg2qlewjzhep1ji0y15cx7ertktwsdebz04beu27v2v7wd1vfg2w4d62zt4mfxgk07s516zgotacwu1w3hra6j0qor0x34y7w3t6cpo0m0bohcf09kfk5sb0vgg573c9q4kd3keuzrxfazyuov61oa2dknmgk7qg97y3y0g9kmo5wd9fetwscdxl81m7n59zvr68v6veyt1u0mccva38t5ryl3rnod9dfuqqn6f2861wyvdoeucaqdjxlp5h9vf2g2m67qcdyd85uyk9a6v0zpbyeil5yp3i9objbvez6c4dhs4o82unchvvhujecfo0rys7rwmnt3gfm2ul5e5eurm5wg26m9a1p91moxmy3rbh4klfwkb6v6fhebye3l44bo0enlvr1sc6etgy3z54dci7gdsyyfobs4vsbbewbepgj8t59ixfugsvw6bcgfexpc9mje93uuulhua4nv32hwykm2xw3epr96n06kkpinpasmrmspdmahyb40b1nfxa0kuk0u7xqrzpy0837mi451v0w6ss9px9x6hqrzfln23nij5ll6cfkfy0b0d7hlms6t4g329vs9x2sv6qz5skrycz0xjm9q37zg2udxzgm03wfrovu522nzh9h5mmmhm9orwiyoip6ugqfrf9nnz16wu7efatjfr4i0vws2ibkp6grctbmvtbfc9rbaz0msz2svno2qr8nywmmemgvtsmccdmmujjtkammgkabweamry20qo0j9jnkdcofum67cm8792oflamb91x5fmskeaxkrn227le2tatr88r9k0r1hcaiuo328dwi1g3us9poid5z2y6pxzsj5lxdn2b4lxthhryc10rntac5vddbigxr18ko221jaedfj0ggrem2qdmke2rsq8bvtugt81njeje500onr2airvqsrbvim5l3sov1gk3csf7k2wnocmirdjn3pxosyqexhtyiml5lsrt9z7ghyy8xnkos30b3po4jwrquo2udn6fnbaasskfec48n688ggyfv1vddz3qugtimdvfy5zwn5jv2rn2qz566fb8h7bngzji03wlojiwg70f22tmwy53dc5tw0d9nbgk4oe2dihpmyk88incg81p32fpi7zfcgmtnjw33ehfy9o3o6yiv91eekc0ipr73ioxs2djq9no5cm07x2lpby6j5t405b999muisqnvhynb54n2ypyorz6hdk9jyhre5f9g36igxt9br5rms6jopzy0a19geioqqsu3vfrj0mdzr5f6oerivru5ktixd55285av60ik2s4rpjb8tupzzdydzn5sjojvkup7yhslkhrdlya7rgk2tk55gaeqd1rc4iak0868ilx2gvo1rja32pg61vh4eit6nz31nvn035nqcljuf382apd6wohz6nfkktb5q7koplspgc3qjcv524kmdtx1em4b94um8t98bpjgx0dsf55djssqhba6mwpcqm2ubcraxs8vi3umc45d1cz4cy7jrmrboz5inatnoa3lz4bwysde3b3i9ec3c4mekzhhdx5xgl4ldt4qwwujopxujrsyw6yd748un6lp3na8zsqbgpetvhn1e1x8vct30wc0iwf3hhvlq8668c0tyi385nxe7wvo7fq60v3ne4rxknjgs8y0qsnpvdaitzzapclcv9r717cjehvbjf1qvpj80zftcyzfa5yzrz07h46n5el1bgz3iwxm1d648a291kfzqksheoy8voxjxa8wxfuzp1gmbp5x9hdc6n5kvhmfhuonkjewqxx9et9g4rcxweqwm3n34tuj32knpfh2hh8n8ratgas2ylkyphesqks9ieswzwzwd1ui54p5b1imrp4fhf5slgm62s7xmx4uvuyzgy04',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'jgcxhl7clozbvis3wme0kipl8xjq3luinktf2vb8mtuxvznsr9',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '1iimiujald14fmqrgpzt',
                channelHash: 'vvuxj2r2hr83kbzakc2za7qc86qfa3lohqvtmqnb',
                channelParty: '5nysijl3536jgv648h8klvlln0dlp1i1wharformquctktvweypcpiwkhgbqtgattqbjyihvlst79ykrkp9e3ligandpov4hvurhjuawfbgjjah3zfdj1ynjsze9dem7r4wq3ousice2b17w8u7n0cnv3rv6pvh5',
                channelComponent: 'jrrireb6k2e5kh8xttbrgh0ubv5vuj0mywdgcvhv2hz9kt8gty5r3twsqfka6cm1sjvpdycr3k59uft1nytm7pdn4o9dsmdafp43pxqyfk5fa4jhsbqr33axxp1bounrivqm1e5lvuwtdbfutuz7bjqtxmd0hqgm',
                channelName: 'ly0tvtmngre380altvz2xjqi56ugityvempa74wi29gh6pk7hqeb3bv8c6pkv82bivyq6qfw6ptrwu73fqjgfsdwtitigoeluuztabepm5x2kv0o8b64oyt965813fr2cl798hsrhjsyu0650v75go5f20iy32su',
                flowHash: 'qbnhl79rt6xt8bd3ji1c5t1mqdq0lxk0gvsp1uqie',
                flowParty: 'ikj1re788nnq44iwm8ux4hdewxd6wsj36co83v3muwaz6k1272u0ian4bznfq4toh6b09y1omxhmoeujqaef8aea92ekt6q7lprl4g2tglnch35uf0b1uguguf9m9ep8xh1otomblpr3tj5uaiu2fuzlyupfbd9z',
                flowReceiverParty: '9mkg8piggv28m16g933pv2a6mxcrcgrz57bwp0wmjtcmlptymw6e2fdvh0mv399uemv737zjza6yh8y6b3keprqg46ey31yigy6fzmeghmlc3hf2suh1hverc1xef5fiobgoi5gxmonefz1qv0fbwrolbonb5q74',
                flowComponent: '5q85d03glrr2sjjcu231j7xokdkd8ds8363nwfg2934adgx1egwgnadxe1hbjzwvpnxgijeg1cd1ml99ha0lvm0tp78xnnsyrinwvuokuqy0wgql6pscji3cf3lq42lq1jild6trmznzqe1pzu5hrr47raqxpaq5',
                flowReceiverComponent: '86z5ff7p9dnpp53agbwbqasueh0opu1qcr8l5ukhre65s24zpq7btwqlpbs6tf0ov22fr2ulq8q881gv898q1hwb29usq4npzec7ykz9nqo24tu9p0x63q1yukox10qy5tzrojca2lx4avue5h1e6zfae2wlckwj',
                flowInterfaceName: 'ep0jmrxjj6v46x7ojegtekxeljtoqohc2rchilrnnnzk0j0is4sx58j71oqthb28ztigpu4bv31msls3swgpek4vhxvxlfuqemdv9im2h2fn52pyiuryf61z5p9sdfydx6tu0p9fu33wzz2l5z1s0pu65oyij0cr',
                flowInterfaceNamespace: 'xtbhwtm82okkby9x2vljnbqnewdct5hyn8g5u1gjesn41oqvdna0genpo895tp67btmbnwyjk1qg6cagcxiflye2xv4qiuxnmh1xitgi8axser20n3cwcpd64ek081wtxko1164kw19x7eed7ync7eajqzd3oqcy',
                version: 'ocp6lod7ysmmffb8yblm',
                parameterGroup: '4jb1ug55jtqakdtid121pcy69e002aj4i81170p15v2tj5dbd8hdpxkh2z8etfu8opu18ugx6wpzmbl0tvkhnv6rsz6jcp74iplmdjgmfsio7zcxis7yv1k2u75lq8iuwh59qry90b9d9n64mjgvlolihux8zn8mamdr4wkqgxw1ceo3fu5c52hqkiu5058lksnlpma4y0eva1yo2zdpjygxwkh41c32qyu3iw9txr7elzsbzwx4bzjg9d15r1i',
                name: '5fjurnh1h312q4dvyamwko61vxjunepod15zzuf88ujrqq9vq1gpzxlyjl66h54mj4ap2bagdgrriyn7fubr2lwx2h3owy9e1sxzei5rl93l9qwv8o8m7f8m86l5bdm90nv0atxbm1zrbg0kdzkvuogiy06dbb3quu2lq39i4almclusfczj7xu4ymikutryplaicbhl3txr8q8uzlja7rm7i87vegccpuaglxp6kf2mno52kgbw118xgxdj5rs6ge2raj19m3siy795wl587s3pyd2vsn3g0rzj08n9dbh4se1214wfws5nhmdngmmn',
                parameterName: 'cxww6pg7dikzxg5vilac9bkg9fm7k39s02kgm7xg0ayt1k7ukci9z26jl2tpewcy6ov290rlmh4u5xhv6c4knd20p4eje4k34kxcj9wfo5eo5kjh0m39y0s9iwfkz2xmzscws0phawfxqzummdmjzbcx6h1imucpxcil45az8c1mi5gqjbetpz9gd2wiwaqkggvn54ucm7gknk0kbq48ghai2p3gewe61x2tozeyzg3yl8w9tttpibhw1xij6oys18mab8vro7jgosfp65j538gs6bge92xloct3kof1elj2hvl7qouiokbhml68n18i',
                parameterValue: '6iiubl5n2cvldy8mpfbuhyv3q3s0xky4x2fzvqt8j6o8wxruy4t8ad45xwc3838o9xapadm77mug7tt7dpdju29wfrjickl8kdj2r1vyn2tjeqjnjq7z4plye4npcn2saytqelt9e50bv8urow717dwxk0r2wwf7m76drekpy8wsldez8u4and5gy3flv2k46lpq66hafrwgh9915122mw6s2yrlwq6s3fgw25c8ilpxu7zgw524zr445iayteyexawvjclik9ipoyet2d8i45a3bbq5vhldpybxl5i0k914va38uueyeenm1ubjyd73hzd6t53kq8wo2zscvhsbsy2qpk6tqjj9lni77r6ggyleua1d5lb354xslby1wxl3w3q585ppjr8471271tximlxbhadlpm2tv0cdm6ijbbuxi7z14ll1l2x6mlykokxkndga0t23bk89gfbnndpgv8ky307lagn8xb0fi54io3kzpx8c8jf7d7x7vbsbm27o5ecr83fwb5uhrtzos6g7jjt2w9is8z3ahiaomhufplb5q3bpqp9lf9z19hxjzmsez50q9f9ekmq1t19agn864lwi50tdtobbrai3ks58m1ejw4rt6d0sb9vsl72eg6wnxwyeh3t3lijhhlsq0l0sdv8mm3rj0jr5ee8lpm6na0emn5wnfe261ufwazkayoiehw4o53la5efhcnql5syf0bii3hurp4oliuza9crixpy9v3ntdadetn65542pofhijbk3akx4g1si4yu5mwipluyuni3c04b2b1eywjky4449r7b1eoaerdf3jqgie5cefiev2r27jt7wed7dy3z9qyi7ikw6h2zg8xxvfqvybktsq9o8a2gnv9bn3c26unv5s95st2m4g5jj22lq45g9iq17kl3kdeqhg7odpt3dw24gg5wlam2uyd0no0zyf9divwdztmy1d1llxz6cda020jy96kpkk8bunmirhsvbgd13aph1d44v3dffml0813g6p28bg6mu63xaarzd5homas7hmsvzknhryahstizl35oxapntt5loq5ylarx2nb7ddmcbhz6a2m2lbcwsm2cnc7509xkzlzw19o869qkohjri7zbsbb8ygl9ei6iyypg4bap015zr90igr5c4alqskn0x0gvvreaaivisf473hcjdlupjy6l29qzr8cao4cj53e76hvvds6z2rbhxy536tikblsbwjjzlcxk5smxrqxg3c4z2wq0k08mc3c5bscpumt3esst4juzig04xxyfvckfngstbf67hgkhom1wpe1wo6agcimf2uzex63ggifxgs2mo9lxnlpxtvom3tcr52umlpyo0wpuugz9l152qbqzx02e71xylslamkjhnoqzh4zq8i5qoa0a89ikljirg1g19h3swhfes8nagnpp3ipzb1uqcqc0mk75t3o3ko5f7otpqbp9q9w48m4mlslbdzdz2h5cyga53j4h97kwwcgmwz6qjsdj5th6qw653dn3sewxzkql9hsmbfir94m2jghzb5wyoq7xd45i7w1zl7vagd7hxzx907b2f4ono2vhhpw0mjpm1fyp44uksv4oxchi5k38rpxpft0cywzkfynr0rzhikkffse2s3p9o2t78fig5k98krzzsvk88m1ci5449ng3gusvaw0ohwne7temykihpq5og6gzwjmrscjn30trx9wdw5ulg8l0vnisgyp9q100a3eh8r452r5b10fkope9rrha6br6efcmkoujvhjzgo7xqt7x63y8qf8nfesqnnvkvmkcohfvj7o1rx63wxdczkevvfph0nyh88bwfp5v5ff0kqgl0b1bf2i0i32eahykqqpfskwkp7mm0a8tmuxt8nk2u9femag6xe54ggr2i7668tpp1dso5p3usxjv0mob7q8ud6dhox2undarmm6i8wzuv4h6dgb51pqru9iltgn905f3n801ln6ybqqzn3mscmhpos57utw2rkd62zxwwokjv13y4lk6fwznt',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'qry6n615ifus3fxu5lud7nq2sktekdr2lgkyjf7n9g2gm29gq2p',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'kb4n58vbmyu5akffsykd',
                channelHash: 'f9ht062iz8tp9uofje19004rrcpmxdmplimduxuw',
                channelParty: 'zt1m8d1j80du6z4456d9p4ow4vd30xs06sy961ihvuexrhk1okeio7cbk2q41ca8gesj7v8j7qd6717jfxhnz7bzd7f5qrt64ozgxjpscfocvmoptvh7ey4kiwpy2ngk8ughiq6sr2jbmzyb7hh4izf349p3fz5v',
                channelComponent: 'ldc0znb7l7luwodo8o68ozdf8e31gs3cyn89wzmnr1q6a3f5pyj9kmako7f66o0tiuze2tfyp2jdahixc2muev413tq3kbokys20i8opx3l8uctzu28gioebxlwnb1l6yyjyx60c2gx31puyn36awb1hbf02zawe',
                channelName: 'sd340d6hi28fmdjewwrysj6c1qv6y3dk0fontlofw670jme2hujd54hx8vjr4l0dwkngj0gyzrzp951um124dcsjs600z15kzxpj254ydsn345svcpm17cwwspy5czgouexxvhvgxfvmwi77unqcst6hwpwzqwtx',
                flowHash: 'yop4uzzlveecon4rhfp5pn65gox46d1mcqi94n7l',
                flowParty: 'baprdj2iru81w2am3hlnwbnu0prnxq9uy47kat592itf8tndlvqkkai7tyw5xgfi59yumwxwr7cmnrdkzc37lcgzc2hm2cpxq6dvyhesqfdmrknikfqpawxrjd2a3sljidphtauozjirkuvk5m4o0c8mr5spwi6o',
                flowReceiverParty: 'sjn2v5jxddvmqf8azyivjaiesucpjcosdtetk570iin8wtu1k9ddturdaal9ejv8uz717e7iww5lh62pvnsysit206oz0x5hy5gfeg4tyjtey9d0n09dkpw91eecbii3clb51i324s6qshm5fhu1uhjg5wph24yi',
                flowComponent: 'cw0yi096w0hjfaq8vrk9b2z2y4odlxc28fz44usoou97msa4brfbdq8qriuyh68fmvaemoqx4uxqkkc9e8imw417x6e8o8voaj30siwfajkkl3zvfeotct50m3kl3lf9foqlg4wtlti27ze6kqvukgm4zmk930dw',
                flowReceiverComponent: 'c73m7xvs4wzazfnhogmjsbn5gy4z9odn81b4bfmcfq5kspaz8xim3i1z4myapq9949dd2xr9hp2ow8syq1eue6fz3qrr9s3i27jwhkcpu451dnvucm5h6cztltl3b9mvtfe9dlitizihzmwbtr4gvlpsrb1flxi3',
                flowInterfaceName: 'c62jbdrlg3awd4qx3r2qh9zwg8roubvs10w3j0y6a6q2g46e06erclqmoxgfj2ft8nu5axbdf9fw68iyxy90woxzaae3hhmotb4m9e2q88se8jeserdkbvgpr1ye5tp6b3o5xuh1zud6fz513e9fjvunb00ixk6l',
                flowInterfaceNamespace: '0q3fybeb294wm0rd2xh79r9e77qwiz11iq0vv6qhtpp4431jqsx6r1rew4pt3fowb28e6u3h86tcjn171ujslp7gi4rzu3avote53trzepyn34kfh1y4kpp18dsxhaeb03htgdkfq8ce19fzasiiwx3bo2fp9u0s',
                version: '3ixbl8x8ifnra2sjnk1f',
                parameterGroup: 'xe6z7ge0ommt30mbt4ai1dj3cg01ltoxzcbuonkxc4i7askbu2evaf8ogr6toc1cs0rqdrqvsft9msc4rwkxjfghkbo2a3fde1ro6k4duaasqk23gp90atjoatqfn0xbcuqg3yg2r7av1ohy0lq7adu55z1a208oz3qlu63dd0jrkt9yg665ojx6pq7rvlmkxsptgec9alvaiwy8crse6q7zvjpkf5s7fxe70n0e4ibzpdtqn5byh81rkxr9laf',
                name: 'a13rl4zcw1nhmct6l11qb8ueuk9aqtknqh1qpukjpyv9szbw8q9qasi68iga0ivdf7cjg5p6qkn5iwrzkxqf2gvbe6h8c1vpylxl4hi10x77snzgqfq9yqwrv1onmqjohfj4736jenl53bu8zbw7m8dhe33pwh2livz9botdvrij43am1oyuxecwej4noreu80dg4pwvmvvp1e55d1nbvejyp4h7u30qza621xbowt230w5p6ksv4whh291i81ffnuvqdar8s7ro8uu4ujrugmxgo35idfer6mssu6dp2eomnc4u6bi5f9y2pqqy2g1j',
                parameterName: 'cjsjwxzi4qv4v711phidd5osgng3475cwarch2ei1mxdw1mu0lckvz96jnhjf6p5marhmw26kv0n04ozdw8596fbhtkygoexjb8biyxazzcifsz2scq1wmb0xe79r709ccx14aqyc3anixx6bpiuudslbsyre4so4vzvk030p0en1wvamii42lo4c8joa9piojnq4s54c6wwr8yycyv6h6144b4n628ka0hmrq9nhn7c99rm3le881iboivv21ipdpcpylk1ecfal8f5r7sq1kxt8i7kayza7ocgw6v8dt62n15v1kq6waqrfxg36lsf',
                parameterValue: '7wmvxha6lw2w48nadlzf2qa1z5fcnsf0y15dpfdyw3ieucxelbtfpz7pzascs065yekpn378zeqpv16hduk4sp59bl025uixv6fjj1b6fbqy4drjxjdtu5htc22qjkhv3wdupewivwenw3xf8d09w9d44zhufm9gawemtltmochls7kwx25loyweqy193xuuih3hgel3d1myddna778l8th83awj02tq4mvrvw7lho4cwq2l4zujmc65vuzg5guq3pcf1bgo7pflyj5zkt1sirg2fii1rwvkrjw8pubpslbn7u05i674jxrnjvtlwcq5d5hszqovff907oyd1fb0cuxyzv7f8f1v9j7obcs7yse3cs0qyh925bad8todvm67oawpqgf49jcrbwzc6jxd6pc96jtbkcsrp6efw4zmxpr62n7v65sfisdbpwzc8o6wfolp84htpiq7ekxq141f9vdq46v5wkyn9vlypql0bwl9ghfgssyc28n52kuet2r79iprstw7xpbaropm67ol5wgsvn1jxnk71sglewph31oiz1eh2eqmw9heall3f1ez5045836omjabqryjzjp1bkvf4gskzeapa1gu7fgwie6c4lzjs5lzlbd62zr4lowffybso3wf2x6n0t9cpuaylkenow365vf1lrgatiosoc9ybhwqpnedgqx0jxhlr069gdapzbm5ppgm1a6wbkwxzup42h2ml07hkdcqrjs9mndnmzgb5joxzoo1yfxu6dyhie28u5h8w8sm6wb0gdkwluqbrl14l11bt4a2z7t61r15sqbed34771llesud71wlpewlya6jqmfurxcwug9iizmn3fyxpoc71oenai4s1vpnp17s41vfa8je3nrnqjwrac0gxrf7fqkfucj601hlryluhikgtc43o9l0bkgmzq2jm3uncwas72z23571nu3a28jx8w98hshao17gzixhxi39ervbe093ic4k9dy40ma0u2y92g0mzqgznkpjzt93pd7o04mfjawgyf5fjgu8wgqy1tm8ly0zso46c7ksmbg2z46ji2brpae4dstlg9itnw0ezez8ffh9rgelvfcdxk9ll4l8vvwwb2m411pexms2nwyj147lpjidsu6xyc56ct3acjxmlq7klx90h2iutm1wzf9qg4p9tqxpjhfe5sq5zswgl1fikoz102gq8ljv0tf2ggyso1wg3wc7g3kkp96hazaaxasdp35svx4ca69l0v08k2tmyqcvqx205royhbjkjzytq3b6z5fb3oqyf52thhqmgtsyovr9ibdjw849pb5s74lbyof0cu1z5f7lkkk47yd7kizwuyqgdid9t0v2nrkxhjnzjwaj4vu13hl7wca3wfclp1jm1m8s07jny6m5mytubbqv3qmm7kbj2fuprg76wpa34rjloadt42f0ge8db23l8iy8xru2swduzjlg4lir97quovzqroqv2laspu5hz4wfi1l7avfb4a73rk6bxpvso9h1qpnyxme7rdu874g4kxfdmyp6rz5egyys28e7ig7upsixxcf1ggs2fc9wjicsfp959ctm503hijire0j1mkf2422ffr86alai3fxialh05juzp6iutfakfmp15hid9svkksicsdv5ermcbnitbcl9pn7n4hvyhxv9tqnsniew5hrm89rka398g0987e9w2e73xczrrjyjxdkjd0g6bhdnoszjdbd18zsj6dns6apths90fnh8yvi04hppnt3vf626uek6vuh098garuyapmt97vnb0160mz3r21n1a5ywyxjxevy3ll9qa35btwr42gxie76ujykjyykop5ny73ezwuturq0gf4mmkh0rvlycriwz5t959rfprrchmzxgu64qub6ymrrqcbuqfxm87gvnidknvipavooc2ubylxlfv8uv8b44vfx46n66jspo0q1osyfx5oi0ukaarus8gzkgx6rx5986b260lt2udzyhd6f925dow108mpd6r58p7q9vtyvjt68d',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '9h5gjso8976jp5qerd36mdnzvjalolmudtrlje202ccud72jhv',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'x25pnhp472btexgwotq1y',
                channelHash: '21mx2w1m5myyim62zedmp0vqmk1g6lmolar7xjc2',
                channelParty: 'i0yzzu1lpiweou8g2nb6dh9c1xsetx0v4vufdv3c6t5boq52vrcegg8oz44nhbq83dad21addpttn4l8jg6p8cwatgal0e3gavctc3hgrrwlukm1y3wth6pdv3lqqfusizlgbk9d9c5tuwo3jg899f521yx2vxam',
                channelComponent: '20m4d5jun5a7yt685a3envyr11zxbr3ajf4vybls6qmdpmpgdakq9su6qntasp4t636vnzw2rmalc86ytkxn9sdogaywrzmd40dh8h5g2fxcm8ytublc6qjcpi16te14p7vpf1mww9dphoqj8a31hqi5evd9zb4d',
                channelName: '24pno2d8occrg7y690ktao8xk57yxbqswqcvjurzejl94tz5ygf21xzebqacxwo94yrs0kmmdqnb6eikf87f8nf1q7ya4ucjzce7qju7odrpdeol0lx61d7q2008ajcwy3pp2bxhh5xgs3e7lb2861z02u4kqz2c',
                flowHash: 'xcui2lvk8gkohc3ih9abscqma6vt0enxnl6kmly7',
                flowParty: '9onjgd28nbv3gjk7rv0rpsscx7zem51fvqo764agz0vco8a5gnnqdzdb6criiilc4e4osyz6hs1rfitbxbw6l6bw2brcd1cjysf4c8uo6om7t28z7xvorns6evckg8d0j59g3tnentdp4pavj55t56e2kqmr8xli',
                flowReceiverParty: 'msbakltsr2ufhoa96e4hzu594n0x3czg6v4hx10dwqf7d3xk3jioht689n99wgfszfwfz2dog5ax304ms958lvcbblm3ipgdgzcw3p6i2jr03acgpzo0t2kbora2s5xf95zpj6y21oqu68o2ijinesvyn2js1p7p',
                flowComponent: 'yq0ltnq70vk2q3dkks85rh2670rxnyq649cfycw3pe6wz7erlwl03nyidbcypwzk8x4ib5axb89ltuo4u54fbk9g5f67vaep4119d1eauxiwymaq0lmj97k68cfuc8o7xlxc692j9753yejc3u7erw4y3111tdcn',
                flowReceiverComponent: 'nmy6xmw14soxzqmu27l5knh5o9spk03z5ayqmceh4eiflc7u7fbluned3wga50rkqrau2i9sdjq82pbp22fls4skzmszylzdp101i57dd63rpyyub8ay2anpfqg2q65z498hhjs1coosj23orkhwh69mkc71hnel',
                flowInterfaceName: 'n7cwk86oedxwup14lk12vv66rtulzx1jm9zsvpd2lfi6sk3dh1qfxlrd49a4a2ojyibjolcq26d2e5krhvc1gai4lololn5ct19r0z7eslicxorobu1ermhg8vla4tbac896aygebipc9r55krfent7uq42q5ma8',
                flowInterfaceNamespace: 'g5hmd00tl8c9c5d5x52a096zgudq9vtx01o5cosmwngu22fq0pm0ystg7m8d1y51kb0vvsrpa3veeszpede6xocr71tsfhzsmfx2lepqrzcz2s273vp5z3vy0j9jvzlq2k6aiypw9gan7lglgoy19733enlokp90',
                version: '05jucfbvmjh4ftyvbbme',
                parameterGroup: 'grvt32ei8z0b3j2k6nbbp83l2rv7qi8wxq20lhqyhq3nv0b1r2qrnt09pkngxt7m91ej4glya5yh6ewgf6hqdcea4glb77e726jsog760q99wlcu0rd1gv4qcwa32bbjx5av18m6zv6bgig7kuucthqcgkskagnu6aykmwogooxewsjwvjxypl4wr8beopf4y2x18puog8ysv2okxoiwf0qz59bpar1ckdktsrvruu5qiuf1x5u1lt12k4901pp',
                name: 'sfxm7kmd4d1cy9h317rq2c4z4trdi7p3q6pkhon4tc12n5lklcjnw6lnpawxfr49kbbub1l97ibadntpfnxohh0vjgw9covidcr6x0c5mb12o9g55i8mf0ucuxnwd0au4too8owtvi1ieythvnba5kmgi3la54c8meskhflv5cyh304fbvgse46ggip9d7w7k5x830yd3xe3i9lh6v3t9ya1s5yjczor3meceoukc2z436h1qb0nnqznnb706nojjnw72mlo8rsnb8gl4c7gqcjh5itx08dc7mrf0ftpphpgltc4i2lk7f4iy9m0l1to',
                parameterName: '6uy0s5hhhd79ddye0ggwo92obq6tqi02ev3mwf5meyjsasbm35ilr2o8l4shsqj7xweuhszsa3dky3gl1044ayo56y6ewg6ccajou8ty6hxgfoj6tb5ghkf61qc9op7bb3tdqp7d49arbt2uf5x8fddkn2nldrwgtajchj4dqikxwavbydx1b53unkkvgx8d2vvkuyu1lynh999daoctul25j326eatl367xhtcfgvp8zxr0x48jnb8qqalses2m3mvs6fdfe0vb7as88y8yslinl7nog2i75pz7rv8alsvwp7lfnebxoitcbgw1sh6f',
                parameterValue: '9ramj9cttc68e8nhjcrf5nsq5feqvuurgnpyek15egmo4xnou31c7um3lguil376p5i62qfcckdy3hpiq97rncujjmdhmto3megaf8ojj5emiks0clqd772ynm1cs1g5qvdc1ghqk8i7wamvh1z9rrehxabgmmubmuahg2opzc336oo0ys48nqohw8hwxho6v2m8x1dhuu0ev9xam4uvlj1avwdo3g1ckc62lta6s2fg7n2kboiohl37xz8mebxggdt1kftxxgosmpd84tpvdceqyt33baa1ul4x4s88mfk2ps9hcp8nobewswxsmkahfqaxm54xfu0e7mdj7yigtjcelbmhc0yoeg78h8s9b0lcg1e6ef79paa4lg3dpnc68c4g38auw5vwemftu4strclnwe6f3v1bbr4y5amjozdw145bhc7wq8ry2tbaq01oznsqch3iwwj1pbzob1xws785ib75mnqn3kgnzq46mlpe25ytny40mzfota2nh52aifnrnvfrtklh9txsc454q69dqhdk9c9cpqr7xa2qos5z41cfg5wcanx0uvlskz8is3tia3xpbjth1ayozj6j7asc4hshd1b6l794chp1oorlvnlb9ey711zb9t3ayscm9gv2w8tbdle2jarkvwovpf4civ03tbaz7tzyk39rmozf5zuj74ogtwhw7xelyqr2y9ci8ac5wl7iof024y3rb6luy0943c6qucd4p5lvst2ub1wa24dvsquf12r1pwccv0gbzffa79esw66lfxi1g3fossw4wme3b25fsqguqzalnq2x4bgsjxbidx7aghk7c57sjeatu0a7mjb6n713q47gkiwamivzfdauf63od3t6c7jnbvulwoqam73pmv9wxdczsm7dhhefccir8need1k6j4g2bf46lx91j9wyj09mb3cmo38pqaeewoqsidzbbqc03icbp7b1ki5y6lxr6622u49h30ls1gef9r1vfv53ad0ifu9ppqyehsx6y8jxeng1lftz3k0j6qqf996tampg38kqwdn1s21rv63ztskjqpd4xtx4lzj0g59z3qx7bnb2iktgbja7c233j42d4dsg9plquxrnyoosnbmlzbrac1uvcboduttrwl1ksrotu3b0jbj7q735lhq3nji8dzhsbk8m43mkhlhw629emvtldezxpsxbq29z3i7omb56oshzd4aom7b5zpfukp3hl0u0etkqgtglns6bji80it1qlcdkcsx4h0p2laxow0n351zsof8tn9sgnb1i56161bow4a8l2fy7nayj15yo6joi7xg3ep0miq7qwaquog1wr791h923hzbpi21s0ty2z9jzh3j2m43hbbz1rocc1ejfftmbpqh1xoh6bqqv7ibio4ha6o5qhktcuz9wto0y56wjpmimcjr3mz50m6n25o8nnbc5er6fxtqpeqmaqrfzaiu9a6faiit4kpk1h9qmxebecdrvzxn3x4m236czvaasfx67htgeyur4pu6asa17cg7byzufpzxdrfdgkg1ntf60hzz4v8c5xvxuapt752f9vcphn0l78qcohob5eb87u0mmf055g6coe1mo6nebdevt4hu8e2qqsi9am7w0a54o7y4vnqenjh4ett4two52kez7x7to9awyy2p9fz9bthqdqsahs3iixyeput91hn3tr3jkjj9yjcoo3wurxfppnfhj9ya2z8pf881kmdr34hmz2bedmagks29ppbjmpqv6ydfeqzi1sqv1yynhvuaigodaz4drkzjeygv7n7bs1lwqgfxn78exy6dqbpn7muxzeivnjfmih0kyv6hg32eazvp1gxc9efziwlfk63n6hcxbsj8j6cfu4kex7rht8s1unyca81zf2jb6nrmgcrsxdgnjpgm1gvld6p9htu7bl0v2wkenind6mb6ay4kig0v4sdmrzrl4l1erugv2kqvff5amr2kkwwntm850m8qm2ukyggx2zvwear0m78z3zuxr44cac3zmo01hymcce0wh',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '3noudzkugctv712vedzpyymusjp90jvw7r2efk1kifu3xnft4c',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'm25z54pnj8haq59i4djq',
                channelHash: 'izljcw5dw27ag9o7ckbvekx9620liw0138ai8njl',
                channelParty: 'o2qp4v97432xtwrim3ri6rkfoggpnwbdkj40rl2z2xjz52la348vxvstv1amrih8kpiy3y51c98bsglvk0iogq1pdz31ov0wxasqwws5tz3wyawlgg2z3f8eoo2vwaj1e5w817lbmc8jyht2pp8fifn2nnih5uqsc',
                channelComponent: 'hsqhz1z9ya2jjsidfdxhekas2azouam0712jqs7yv5cpokq5b9eurg7l7b8lgmbhg7zglnso3qvhfxbzfmiwgud7krsuz11bxkmy3xub7snxz03jdrghtxosqfd425zq7lc909tw0wq7ljs60vpz5r27ez7ujtgv',
                channelName: 'iq5dxluqzmh5b2vrxmnntyae7ch8hkelp6fxexns6pv4trcv153jftzirtgaxnqu00enhfin9g38skb2fd3tlg9bclyaqzk1q1a7dhzepyero9fvudnrxyzjd3876fn4jgzoyjrpm67eda7ny85t1zusg9v0ixmv',
                flowHash: 'mudopfykmmnyj0wbzu54a3771je0kfuh1s7xiune',
                flowParty: '2si6iu8kklnprdgwrttqxgz9lwc2a277b8ppjq7hb6kh2v5qwu357b5bdl99k67by0p5mvtu7x48ma795n8skz9g9kda5gqjc3cuwelz4yysi0op7krchmg4ye6hthgcjh0w1272chzer9yvqq6do0hnvay6tcph',
                flowReceiverParty: '5gfzemddzgj2iz1nsma9nk3p6ez262xx0yvf2yb5kffzckgpumz988bpk2qe2ml91f1qclkcrsi1qj8tez3f73ucgh1jutqmjxyxuyeh9x1b53bnwg8f8cpefnb1t3nndka0hnhw54ltmggd1t3amp6abtmh2juy',
                flowComponent: '3zw6tnen9amwjxpspi66zyi9qac9k7z7pjirod5nbn8i3mlj5fwcmn2g7s6mn74zd76diu37q1ilg5d9av6wjmh9f34js32829d81vvb5n7e68vtzkvfeb3aun0mi8pixongsm7jj9g6mfbosd3166hfstx9zfzf',
                flowReceiverComponent: 'id8q9jnzz9ss4qhfwjt0vgooxov3m8vhsbsbzcbn19840htutscxtwx42xdqbhjxdhmhjynz55czk4rpliwazgsvcdkxmivl9urcvx1av7567rgdoc2eirvff7s4mnqmknyvl1iv957kmrahef2t9bpt7p6m2jhx',
                flowInterfaceName: 'ktl1xnujc13r4y08y18uxyn2ox3wz1uivviheua4xva2558mmglgu540ru2lqpewk5o3vnenrh4b3m89psx44sbiglni2nux3fc704869ibnfebl416tfkhfh1cxw8951ds33in0pp9dpbnlacpdfqu6w5m8drwh',
                flowInterfaceNamespace: 'rjphmigstvmjmwknrhop89i523zt82tozk4c864ogfvtq9bkngtbcdb26iwgjyfvtn1ldy2tpkef1ajs9nxdqhmwdo29gzsdstf6j4dd3nb0ygcaiu7ry308ckkzez9n27gckiway5rlj3miaamfx6nke0rke2cp',
                version: '86juz7lcygg5rlxp563c',
                parameterGroup: 'c3aw33dfi1765xgf9dbh9j45yunn0xnbqw1gsock6lsrf6bdy4pfotgmnbyxunc7dqyt8tq63gr7whi3pkmvmrxh46ty53xsbpc5z6jp46prh8ireyt5azs4k2nejsv397qo4dx37idg8g4747doe1r6waj02ejinbuq8bv7wfsgi2q2hpydwersdl0ws0gz3vvopmp1ztagxzixo0jh6ytjilk5knz3nxdos53uqgub1fwwiybiwt2nvgf67j2',
                name: '4f77akhv62wuegiqs5jdpb1lqn4ye6tvepsed5avg15x2bk5clzwg6zqur87805xa12ouuezbv6vycmat86cy5gy9bxtwmbhx7jrsrbpjr2hwfdjzk6mrmyrcpxhzkizvv6brfrpl2mat2o1zu8govc270c4wvkesjcfno4abnpokdln1rcu12zvci01utrrmxuk8r8kcc6b0p4yel01cbonn293yg4c86yxaqdhikinil9l7qs6iomtps4plo89vjgmb8f30iz3j0lzho1a0tocud1yt8so4nq838pjy91u9qvm6v5fjyzk7o65nvgm',
                parameterName: '3m9l8z3ejq4xpdpocc9dqqnu4k84mnvleh3xvci0uybl3cyb92lwce91kpduspze2wkmsd6l12fpkatz4y8nkhx3nzisc9mw50rraumv48lb815k7mt8ct6yq6390s02rq9ouk69gmqv9y1lz9ufrh0rdzzqiashdwzwf8a7yvlyffmcfqjxgwxqspw4qlsz8vjiopsu19kwruo6v3cf3n38e4iiblk8spfksvsyr4g30ao8eweasdlyexrfm4samjeu3h21l3aca686512oi5yjnbczodluo67g3airtoqtt7r7z48pjieimptcgd4q',
                parameterValue: 'ewiyuiwbrx5zrpo4fmy5onbxynry5hehi8690cppdr5l1d6rewe4p1hi2qms21aonwpdai9uwiz418p5psl13igsug9zpbft113j19pkek97mcr2hsewh3old4n5ksyx3cq8jucyrfvjb0101j0s2fp18ibxqf38qghf8ro0g52hxahd2mr2qd09k0fhtcw8aa4w1ipl5xnvrh31tr3z3otcssxog1itbwg1do6dqne6zjlxfvz4j9pau714gvcpnln09gigusomjd5zi86liujbhpuzirtk5dk31bidvpdbk4hf37gm5zqo63rv8huvim9c4tscyblaqnjuebf5648j7xadrlskqlklvxcvrf62e4bgxdyozwall138vh3cwm1aec7yvfp8uy51injwu3en0605muwegjhhbll75nc6ry511eaw98qh197ma360rshyzmk3vion1rhdchr1x37jy4xywxeaamgm8l6gmsx87z5vg8sh5cobko7svx3qkh4l7yhinyop62gb01ym6ayul8r8xqj4r0mg5363s5f6vohhmm62am6zvvdz9tembdwkn7a5mmts3j7rgw7ib1uegj8k4k3r7lg4ofrll1nltjaucnc2joqsz6ilix8d7d11s0udw53k043xfpvkei19xwsc7t4pgca2al5yorcipti3zzbafq8a8rg6sv664kqe97yxiqcnpbh8n7jn0hnr2ygxjxg2kxcptefihci3zg3m6ic5ghayfg8bswhv3grtl8fo811dc36ije1hols9551uj8x2dke9niuqnwfkh3h5zo48lltmlik4u207yqdwxcpvbu7ti62krkliu28tg8ioz9zvb1hxkzd74u6328melszmkvueevfhz3jezhx73vk1dzisre1johz781dx0qn8drezb78srtr293ab04aqgqnlcvynjz48cn5crim3ce4hh864ybe9bzcfs2cjdnoj1e6s81k81s1vb4367fr673qjac3bk2qiuxnqs2zzwpxp8pfumwzhh0e982ykkw9qtl9071exddwr33j1mvld45sv3duw0b6o8f8hnygjhr5hor27n11xz0vw2h4f3n34ew5vijtun63uj64y154mqalkti956s9sycidrosev85budup2na5xoxjlj1g3i8kjaj4bf7xl72rizrxbeabveaez40ypxfrfgbapc23q28ty68cbevzi8kdgtw7ncmy03af6ptc695wavabzmtnw7nibhz4s3iasflainxsnqpsiov6yk9ug997obiq9rfv4kbnbfgqcq3mjgsepyf22za4n66fbnx1diaqf3e1d1q7nnrzgv580lb43ua955ujzf2l70xiihcw0c65m7qadn0wm56btxutdskwf8eweizrq0xmc33c1jo4z1gzujeuk07su684zl0wskp56eaq7jf9jhcgwiqesp3sxoicmhh7xoarrhwkein8wogtba56b6rx4imw1385vi0sh9vlqe8669ofxrcgxwqz8lc5h7wbysrlztmyj9heziztzsgybap8ddlj0q0xablovc9um51g0l4rkq151e70rinsstiyrygodzqznxghyng6yhns2wnbnctkvtttrln8xatcynwegcxec7cecp33qyvdsi5fiy97nqbrnnpvegei2gjg995r37o55a5ksvqu4zmvzf0vptaotssgihtiidozy9898yah6pu1ubd01z1qxxmjn9fppobdrjq6bc6eymbjphm96t23443c0x1ouvkbd9crb0p0460zlsjvuaeqss0w6uvadd2oeivwfe7hyqpy8hd3b9c4yufaokybz5e2xnzz4s8ib4fhdvcxix5qgavv0pbv9yqvmxu5ywxqhpr77y76no0rnomsjnbg1lckxf9fe0p2mzm8ept0npv4gnxwce26sy5b0s38gkipeqvvz4oiqxlutk2ot2s4vowzmc72c5mgoal0pd4zmixom5emmxx8q25hunyailpbo9yv1m6lnekk2arn3ocb',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '35bbd0xeqimepgjp6zh9dzbdvrza5pvnhc28ecxxnespdqrd4f',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '5ggwseumn7vxae7n0ws4',
                channelHash: 'nemsm23nh8ufiulxe6cvq54ped1z6fmpxxyas003',
                channelParty: 'fgzb8bdhjcwm59b8p7hfpnads4z92h9kclubfhyyx72pfufzsgqafgc7u945xmp4me1qkc75nhm8lam33lwrb2bqmn6ixaotff4amaulm84trmrtsevaseki84r3lsoup2dmbrwuw8ig546fr0deriv8gio11qpj',
                channelComponent: 'ne0gire1sq3jiehf7qz69s59fvkt6avjl5s59f8646rgyodzwqxy9xtvfga6ny0wjvqca1nvwqx7sofn3cnp8adkjsvyytinqfbo0gmatotcbflbflrtb63evoe3vy7niqx1qkmqa2xpdo7jlhhbyrn68odtqcf2f',
                channelName: '40rsekjt6wzscse2ejt5m1e7y8mmav7gchucps2k7stkeapi7isrgmhj19ks42o8o6rkgqycx7oko629rqe1nuwozrj1sfunh3lnv1tlwq0qmzyu23oarjdmtl1clljlvha611n1jhj9qg5ik8emo0bsnuy6y244',
                flowHash: 'jof4clnfi18utxp0sq6qb4hrh7rw9vyvgcbsq41u',
                flowParty: '4be4vmgfiwzbb0c62q7m89vdfrlquyyfjf8zusxrbs0lcm43rne3t9vsvhw5jx7q6wm8erarbi6xdtul93u83g5j2mhm34dp0g4l5741lowc7pw469qlfoi8ppkkipfbnm1l7f9bwj5v0y7z50dncgk9tw8gycio',
                flowReceiverParty: 'crv3kq210xwz6olixp28fcf64axh40lur5vlmtgcesyvvsqt6reivnuou9nv9iagtnsm1wqwapgghyuz6fo02i7ot0e3t94kebufs996mow6r84mvjxy6irixsn4q35ksbirzx69bil990nrofxysco40iuqaekv',
                flowComponent: 'nv9869xq3k1kxny9ovtliwxz5w5t3imyrihugamg4npu8jlgs4gawty8n77d9eon79h8eh1krrwql4724qylc38c359my1v64d3g02lk5ajyhmsitv0thynq3g7fahq0mxl2pa63p6fxnx5onhr4m12kkxa3rd5p',
                flowReceiverComponent: 'hvmc1dkejmwcdgdhtbpjstqmh9khlacgsfa5ck5ipryyaxa4u6tqknn4khwp50fkqowvft410y2i5ir56b075xm7hezu71gvzjqhchj4z3lbk2v66cn58ql7t08ypir7xoaun7d2p3732bwitzeg19pcq3chamub',
                flowInterfaceName: 'otmuovmvq8wwmgp102v2dduxcwr8kdxg6a51sb17iu1puro7p4pzgqro0upp4cw3ndqzmno4h69hfrntjki2u3lr6v3ntilvi7zujphr8jqlm0aekn00lb8x19qf77kjhbxpqu4s47pt3mu8e2vkyy1yf3of7lq5',
                flowInterfaceNamespace: 'xslvps7q66ltb2nbmpu7t0r3cawy4udpul1chntcje9s6mdwwz58l4msuncmcm21logsxh1ztsjw0eqm1t7ewcpssi712jsodn8ioy78uzpjtdl7kewswl77o3nhlekgkguu4jek9i898snfjzxu65k9g7knpryv',
                version: 'ggkgjtunk1vec9esmxxc',
                parameterGroup: 'ivfnqpuvu859a4lhz131py3qxclzpx618kwsp8s5lq0s7aqty7868qakeknpuu9xb5gp59ckwq6meoj79nvzoj498wxeppz15eaealntc5tmywjo2h0aijpoucn7lu20j2qjn5t5xisok1zn6rhw8p9xqxhca9zg26zl2mhqfsfxnnhmbqoxb7sy909jmlny3hefxj08mcdhqvmx4y9etosxt440cgfjpgwikrp7o63as5yis1ufpxj6upgcvtf',
                name: '3y9qlp6m5vyevc0trnhy6rdilsc4nzo1a12etc7e3r3dhrfvfmibn9pt0d1k3b9xb16tbs2awbqh7ld35i7d60fgwe86wx253c8mriftsiapyon483jl3kszcdrwt8p8zvw29i32mpmfh59xncoobvkscirdhzv006pjyfx9er1mm28u8l4iobnudr63ydpg7r1oc0q0iy2efa5pcp017a61woparhfpxj39z6h42or5w08m4814wtp93uorlfh9b6z13dk9ozs9qowu87a0z2wmv7aoh3sa5mqhjec0is8le5eoeemy2hprx71weuuy',
                parameterName: '07f7vx92pjqduu7ihg543x9y8oqaw1hm4w93pipotkbzg7sblxu1jbwdnmph9n9ki6l6p4ta56amid1t63z1mprhu6itrxwudx16oov600uhqtz3p58i5f4i0k3plep9obwl2gsh4nux1y24erspvfafy3e46q02e7891j88w3owz661t31uo2z1mnfnjpnnf1nfpm69lqut4t9z8cf0zl86uvuqrd9m5fd2lurpw5dns123vjxl2pbcv2lpk8ps5wnq6triozwmmq12xorqbhm31fit925kkctfqhsjybhyrzvld9re3c664wgvioqu',
                parameterValue: 'jby3ewzip1kgtkx7cmkdz9dce8zm15w0s9w02lgqsppv9sohu863674egngr08wjcocjv9khrpccxkbdywhscy7jdusr4bekkayjl2sp1ejs5hdvg3i8d34rsx3iq4lw9vy7vp2hwobv1v6j716cn3ibn67d0mk50dfc13kcvm37lueu6q5kmajpzfabk1bxwtbnk4m7iebcd6mrdk18lgho00n4vixrnwjqcypthcwea85qhexcf3w2t1kiz1g3gsh0vrqpy69cz9hcenn6zx0l68c7vygvuy3e1x594xtxum48dpimm8encoeopnrxr3fkwzdc8070ceq648u68vhjla6d58nxq68pdzw79qgev1npq9meeoqdzeb3xoenjqm046osnn04r62j23t0fzz8d2cjz2rdb490rr7pmxx1rlh5gf3nrq5xrtjfk7d5gfhsz9zwj3c8spxu9tddix4pzvskupobh4stie9254j9apafs29p2d6f3nvlhmlczr5ws5b1q20k08qj56teq2ou3ibq0gosntphi6xgpty10x7z2he7zjw4jfa1dakaka1n8dqbz68i1i9th95xvinwc6kkcz460skanfsbs0s24pvfa8js34p14199dy0jgcpi2d33f3zgalh9ycd0hxfmxkop7yrs3nafl8bm1qta2ru033s7a4w8465abu7g7bkxdrtyk6gptmwnfcaxrx4ifpynywk00epjv8qoqhenn1m2t5zoim0q1hh7dasqbb9fk7i3ve24tn4iolt7ynpsp2p6xyncnxbhi56zlti8ryvh3fdpbrypzy1nlavau5f9chsd2p6zoiz8khg8mrbsqvaqjr7lklolcesludn30k9sktn35dfw0hnbnw41tgtyj0wui9qznt2i5gctsrpnezizr8isr5sygpxav7bnrv230esf5cdez1gbuuu7eqazd7k5tovrnx34nv0ovm9ejrpnwxskhnack13lbjvt0cpiucubsrv9n3iy89djq2wymxztay4wf7ctcqn3j7r51odtcnjoosy93dls03rgopawjjlq6if0xwmwz8a9nkuzp644w3dracg0562gxqxevni1kfndx67uqit2xv0dqxcli3q0wwleba3cocnr1clw3dog928o7h7sbe1ms11s4muo6t031a4ni9v8y0wlx8tghgckk0ye7hpoqbieard40mp1pdw8i2hkjp7m0eqr87azz5dtm88q85b73hrnuys6gp3w09xt26olrhje62nzkhylwzz2fqb21j8magfqzq81d36qt83i2013hx82aqzsqh7txc552w87gko54uko4ejo6l0ubcn2kimuci3idzu322wp8m73dcn5ed9t5761vi77e8z6q1z29jlq06quu6o4uyxmp0k409vl8726bp9pothdgkt1b2q23lz80ghnx7p90n5gvvh1crzmoa3rs02nfut8dyx0lda45xs09qwiyr5cfp3xxkylmhz0zqpv58nnoi5xvso9nxecbcbu2h2oms6ow9ltezkkm0hlhcfx72jms0jboxgdvnxexx3sw0cxev3xht1jt7s2a8x9sbc60u4vf4450yo97fzw8fnifpms7z3dd462279ks0di7inda4c1onzybxgxjgt0mcf4rkmb1v7c5sjn5dk1jqm7bw5hgnpn0bigwv6jiuc0o60o93xt2wfbangr35vw1urws8u9peull9zbcx7lprtbnl87v4trzrkqr7g3djgfzhop4f08b0yzny9mf565z448ys3ho8l5807xt21rrd3k76plzbr2lda2abmtk4eewtzlprpqahtiryy3awl9ew9dz1uflonpiavgl0c2mschixvkx7v85fmmtkab90essjruczs8g4jjjuum0yj178glgq9l59kzy3snwcwh1cesojjshpr0ev51kqyfe70j67bc0s2ednjudhl10nc1x91dfzd2gcxe2c5vavp14scvshequ2pre5pr7xa3qqzee7mt4skair7pqoeg',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '4z5xjwg2kl0mp112eucem1p5ymgpjy1d6p2mnbux3zav1h9sw4',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'gbq0qy82er6d7ou7atrd',
                channelHash: 'hwg0xen8ylblchiqumicw2mzhx3k9zpzkg3yccaa',
                channelParty: 'ap8yh8fpv05ijeuza1248si26et4tobig5qzf7ztgs3cv0wsrncan1u9ku234s8hm7p5ylwgnkxui99ghtkmszlxkwn6jf3gf4acqy64j5s4yk6ayk6oxrbgse6s3eqnkytvw4j01c3p23j7ka1z2ay6foqsuis0',
                channelComponent: 'i20fpa5ri5wql6jpw3wi7gbkpyci75j1sf3f254torf9gkpo9b04k46bmkwbzsasu3puoj49jz45lrdoz50iz6xrnt9dsku3xqv992frcbtki1zpr1tohlp8cdxrcmbe1w2k24qosz2gpp3fkpwotltaw1mjf426',
                channelName: 'xh9djgmepgquybotibjhkkeopl8hzufrwk049g8bpnafyngsyaeajv0q6kgr9lgm57hl4anxsqm7ewkrc20z00q5ikcp2o6sbvyigdymwfug9ku6wx6rjo7rcpskv5w85nwy335rywj10uqzbn9uxlj0yxe8lvn25',
                flowHash: 'fkdmw69qmgshyo5kv5856fzgfwn3v5qarzrc0l1p',
                flowParty: 'wnd8zdtcva5dehcj4jye00nmx2ztqvy5ww6hfondn3w5jcky4y0gewxsah57fvygyolqx3kqb8jmv56v2a8vv5xkfid989a4vajw1yanqurqw2nlcrspvvng9zrrzjzm4nzz3xuc4oodvx75g1cdziovfbj8sqtn',
                flowReceiverParty: '75tlk0eq1yvi575z04b7y48wdhk1gazc5adu2q6xck4k5cymx9wju75b1emccj270dv6h8y367ogx1zm4c9xmku3h2jojnkd7513vmzdskpsrsd4idsemfy0m2798amyjg8pntnj5a105timksr70tgx5tcoe0vt',
                flowComponent: 'm2z6ird8ml3m7o0q3zu5pkfpjhj80411pmopocjml412dkkh0utm8nb04m8i7kzokkoz5kccpm98i2duakzv9vaxu00849yc9bibopow67x2hp1spufa3bhle0rbwiwde75e0mf0ex9u4rn3jf3tqdkn5a3makp4',
                flowReceiverComponent: 'f7m641ftwbq6egkye2x3y22tflf67gl540ue76mzqou5if5ca58lycuxwtz98dk3is1phsegy14q1bselcd91115o1vb42p953xmk7wo1sj6ybddyyuxdtfrhwiftry6attimqacscm85rprzu2scdddqqwcr16x',
                flowInterfaceName: 'rd557cuockwwxfyem9fbac93it32rkmdfhcws4v0zgr4kngvrqeljewzfa2t3652i8y7mgllw18gxrxzrsj1ae6odsr1421nlh292wut27lxah2mmgazaccqcfgv727t0cgrwtxfdjki112ub08ng5xpbs2i6bhu',
                flowInterfaceNamespace: '274j0fa82ysv0quxkllhlqsmgdf6228jdc7b1wgwfz703lipgt5mnjcater5p7sxw68hmgjxfpsnpz9crs5l7yr8xh88z3hipuad3et42uhem6754tnm09e8mwmmj59f1smi4v6tsdhwemhnyokopzqjsj00qzf3',
                version: '99nlc0i64hovftqm472q',
                parameterGroup: '2qx5amt2ixu78kxjnqzjew5ivl3uccxjmziuv8ec5mxjy1azouxaxuk0e6d0iiu6o8keg6radr0i8mlzpd32eb6766pwp467d0rzyvkumw2mwqagpypinzix87u9nv34tk7fozzyo19pzdxka45hwh73ql216zqmubhh3ypg9e8e8jzttn8v8mjk1wlf2fa1ab037stmii15p65cfv62rcrtbhjvustdlf89ix3lq9tsa2pxyi3zcgatku172fe',
                name: 'dgk5s13is8slyq4eh5m6kngp2tj4cfk3sg0ndz34wrrm0sd64qzqt506rb9ykfxiocrv9okwmgz8pj9br47d1xqwr8bj9uz49z3ut8ixhyiohdv9b5y2l2iz0pe49c9gzpqwhf77cl6xan4hu1eiu8jel9r1awt9e8ujmot9rrh55lk9uqoooy1aqgtuyxe8mrtq4ujnk6vqziymvb7q0e0eqhk4dba1jkswqzexjfpvu3f7ko6a6sjl6lu0mufkpdqj0fkg78oxuk4xxxn34odueyfb1amnasi8ckydognc8e28sd50ie8ouywjfmg8',
                parameterName: '67i3bk3nezaarrsnn96pp383mocfo3z0snrhn1frdrv4td1tubki7t0dtq7tkownngrgjgov3cypaf92yoh1eonch7tus59bi18s0iwix78xve57whkdt0x009gpapbq9qrrnj4e1dfmoasl39y08ehp12vcqibo1vigogk8xkk8lerscf3ein0grsu6rklysvmyvf8o9f180sr0lmhahurm860crmm406jz2wbafa2v1n6bv71a2penwrblx448kn3coh957pfbw6iffnsvb8ayht69oykn3fpy2qr0a7l1do8514oep2vzg563w9d3',
                parameterValue: 'tvra7aqlbcmx48mxgrgs6n8wn5x2cxvq4rstav0wqvyhrwthqybtntk8webn66g1n6fshrv8gsfm6lnudysd4ygvdpy1zwtiepoqcogjlyjr5e4allh4a4kqwemkba4hc4z61kqevnf6yfg64as8802pzgzfpchjcdm7epq6y70amx9frlzbwftk65p5c5y5ze54avdjwp1apvm3jbcjiqnwvlbewzsslfdmgecsox2hdssri3sdekrvplszfs047zwprmscz2k2trerrcqrjtotl1fvw1jpdcout4jum37jiof5xgiucshh7xrx4ba592nqveb046xb4bqe0gm1vttf0ib5lius6gap4xajohsu2jer879mqf7m5katb80tmbwlvns04xh1qs1zue529a151xn4jxi281e0pwwa9ucv2awmhwvd7dg71ceemmdku5xnxtdz39uzvu4q9vzppam91v3e9pkoxok6teyu59bmugalu1dopiz4v7vaouy4t132r6o145tf39vlrc2of7gm0iarlxnymlopud5d689pw62oqxl96f511wv81adr7gzz0xdnkhk0gekpt61rccmng2i5vnfkf5j6mxlt4qdak02smhdyy11z1vmae2zc9h3g465p6cn27qqov7v4nuexth9ro05ijx2iyr7fsk4catw6417wqxtskohniy6kqw8s41grc43ol3qdkb1ydbjehyqdm7rsd347j3233gmn6p03wpg9eovqaen0nwwsircdut2njzcm28coys3ovoz4wnlpyhf07w0coj4d1oyyv5o9yu9n0ywx1mevvyu7rxa1wdethr47jdqcdjuwkgrkctxbs7m34xru7ywq1jgprf734rp42m8v77stfiha7ghnyzbpbjluyr0tjdal9pech7im57d3zz9pwff0xo8fthhha4328zjohchhzpplkmo97qj54ss7ndg699r40lsuhhm4ffv74h5pb4a9n2xpjovgi3si2o15a0iyilczd0k310i2ip9pry5g3fy01tafi03y36ce2s8r37lg4saa48lzzk31qbutste2betazrv6ppkkfslh8i0ttzh9boe2nfpgw6zv0b5yx5dy5vfomka41kkxwc6fhxs50zbprffhze73xwdqul5ugjcrrnzdxljug35trrwfmziu9akz1r6fzmnm0126qynas5ztdgnllkozy87qeqa9tjqkl6kdtxl8zwtd5fc56a2f6o7qzix3wwt8jdb6n0p9qp9p3lc2zc44h7q6a540z1ryf93imhs4rhijtnfimuu4624q8tsj1xw8bj88h4k3nzdoo82y2slxae7ojhkr925y7ei7fhoqum2n93zut3gzmxe53254rvxqe7ckso3xut6qz06hukdzbb1cg078d7mwf3365elxvh07kx8s231psk4wnllfhgjl6jjcug6iua0z2fhnco9oumm9vbshiwagsfbmuqvxqhfzqd64nxn9jhsuhbi13og4n59xqcbkowrgh34uu40wv0bs80kjaglq356bz0l9ho4u9ouu9c9a6qkkhzpcwt9vfiwzw6rfupocj4yyvn4ea51hbxwuo4lx912ktxr10ko8fq17axjayzd6v2qz4zey47mghopmuhllvu4zostr6z0xv47r670wiwtaerscas4j8xkbbt964oqb10021ym0tpp1xbwckcziaqb573subz9eel4sf7uuzzio88hvbcf31rxvkqsvinyp8eqx8wt7vopmvviqgmsck0lzkhd9ggzvit1ohbbiokida25depk8ei3sb0byh507ysriz9dimog47734i94g4i73v8spc3k7tgl2e8jbx2zs7noteksklpag48mtvgwkli5ijmlpvbxl51jfylqpnpfbdu0ari1nhxd6ystekbuip9j25i0ykfl8jhx61atc706n4jcu0eq6pbn29mdahhuumbs3eaz7g2oit70ulypud3fsj9svrep8gbpdi1nokxav9n746gydf8s49eqm',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'yc0i6tycxc1fw1o51rb65a7dabqj722hb2h5ke7oe064cqe4ei',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'afjcu2amimahuio26vb0',
                channelHash: 'rcn7l7fq3ohpflnad962h7la7hajhtsv2p3rmz97',
                channelParty: '80dl1o5qpi9z44w926p3nedvav82lstbvsojc7w1s28qo93l4iitqrrtc6550lgmn1txifec8d6nt5hnrt77n8twne9zyrkon5ugkp2b7kl9ys7wefrr3c3gh44y5rosntbjip6zy19si6lntcayn4wzd2gmwkrv',
                channelComponent: 'x4uco9xqlbwo9wr1dgstxaeem2lindmoz895z4wvmrgyb4ebkrfw1smfw08r6c7g1tc8pu96hh1z2a8vnrwmvpfxfdy1mr3a4ia3oczw2f7rlp6r82v4a0erflrxacpnl34nvpdo4i33oyv6qcvg7ysh0tbtyu4m',
                channelName: '7d5sxs7tjgoqb8pp8rkitog07lpqy87qriwkqks3lx73vohpr7zejklvss9wnjan6ss5fackmm9ew8cqdp0vu9psn3soevp5mq5bkzdta6rbv3st5z5o2wh1rctwew9cufh9z63n3m9vdv9avolzeqhcdmag69g8',
                flowHash: 'z3urne7rtbmn8k35zz02dsifj2bqif74xekcs6s0',
                flowParty: 'xysq3arymqvyjhgtbmd5yqh6enryssnw053uq14e3b8k79hyy3uie6d0pni9zqft2gt2527jt5kengqirw38l4rhqk99rfbns8cv6bgnt3berpeoj1ovsloqglo1v01ev9tal1c38spsl2ylsxjy5pma4r9xtnt6l',
                flowReceiverParty: 'pq3319o1fag91j9au5rpnu9v2tf9sp0963f691l1ly9fnd3s9yv17895d37mekkfsp5fzb968kcyocl1jk6tbbe1o7a34mb5ty8pr2ttehfm7gylzvyqe0x6kbc0ksy5wlg7ldmcjgal9wxskl4n0k638xaosqgt',
                flowComponent: 'v09txeljvj3scum1zw4j0l7ky1smjvjw6g9vhxscv7mibpa03vq691rgt0w6p4xaia4pdzu4s4v5bcdpnpunvpx72zm7j7rrc3bzlzbqxgxpbhesyfvggvt1j1un82zjditpum1jxfqng8ust7wlc8sn0n1jiwyx',
                flowReceiverComponent: 'yhwd13mv6qj2ozg9l5rhiad26x99o2110y9id3f84k80o4copbq3p2e4yikn6p47wle3js6n6m03hzfcpjjp7wk98sxqdwjpqwhzmy0lre7oa2j9iogijvcppv61xsdgf4m0yaffevz0iugoud7blm640gbxzkvz',
                flowInterfaceName: 'cu0lawcatwh8w5cwfdge8039bpigcj4elj9gsf98qa22j952lhvuq9lxqbsurk1dawyukx2jajir1eya61vxs545fk9h1wf8ipn2ujvdirpvv67i0ewzwtx3g9m3lvot0bpmgpufej7hyf0alaxt6lnw2i1k5e9p',
                flowInterfaceNamespace: 'v6dgxryy3abjzvb5xozkzvq1y4v2ztycxflh8h19loaqctodjypwambcra89zhi1a0f65hoj53auxhqywm7jsyk2pzx4mj6k0wdqsrjy0ilzxlev5c5xaikfp3icf1e76t0ufp36j5gsmll6bljtstjzblsvla6m',
                version: 'qkopn52ttnhd6ok8qtru',
                parameterGroup: 'je615d5nws9kzbjwj9hjg94fxgja24bkg5zd51cmv3vfdwjpefn895020vr1ki1l6sp18yrpud30dqxr26ndfpou7ybjm1glh8n322eijio6m2izsnyed3sfpaqikm64vkr0ptb7jsdbi8vq3u9v5f4bwt6jsr6cai8d7o8ip8g0cxekcb0ma5lcxd01lcichohetv7mk934nv1eezaajgzc8ml74xk6vw82vt4fu452hka1cm7bl671o9380xy',
                name: '0aqnq1oxugwn3kzripg9njqu6wly7xurx3r8tyjdj2rvc6mkd4rv83ep7omtr38r8ia297uiumjsjph77sysn6wo25p1ah19zi79okwhighrn91hpq7nnm9ft3jrkg99no4cdv841qgjgogaflh4n44zxbae6llrhmlk0577uwdegsxvtm38n354oct6rgn15e99x2kcyhhj9yfo3ynf6uez277bvfhk11ta76z2o04o98zckydc9ssmpq65h065wj5c1ruy8stbdzgmue5edltprpjdop1heqj7ief2mj4swx3916dvdw59fb48n2fy',
                parameterName: '7vh43y8r0fk70i893gvjesk60gbi1ayszr2kug7a7woab49wi4i9pb54u4zghdddbeie95gvsn2oeo8do1u7enm0agb2oe5blrgfkauuxsjpjit667g12obhcw0bvbykndnlj1xoqbjg02wy5tbvzht59jll5hc0syt4iz9h8gp6ihq2214jxbdb2d69fy7m99ws1l0ngesvur1uh0ho38dbbr34ibyihy0j9dexbtmohc79dnphzt6la8rm3ysx1yjle6bnmi04z9zx41ul5uh73i79hpxmm1fwb2ikq8gc03mrv4lv11uqp846a2c4',
                parameterValue: 'akrx8bho9vdav0gnwe09ws7hkrbt5rz3zfxwuqgoe0ztlob8sxcyqsp64hvfflmwqwt6ns8nhrdmpyngzy44kddzcovp988px34emo3g0jlzjso7784fn1nehfceq6vcurkpvtcrwxsn8jbl30t5skcatz10jo22wwv71jjqzx81bqm9mz1bdq0y905zigrm71d2s7bsi8alz1aa66el6s5cohf5mxnoodvzbqyj0rt65z4c5yirjpa4nr18021ns3rah9v47iq3htvfajcqmjybq1imk62349wfyxfljvg57tjvxqqz0kn2hx0c91dftupdpfdehkl5ds9lm9vvbgnea5rokovnz805h98vrxxqpxp72z46xt5nzkwvmla2k6ttx0szyl8cipcqnvw5thjsg2yqrvhnt9slvhvvy0gh99079mscufe9ofime2bbqsqqytgtq0ugodwxwvgcpmycqwqqqs1smr2g9lzqjic91xj2sdt59v96wi8twtqz26n9d8g62wzlz9tnh5y9trvzvlf1w5qbb3c7lmvg3py5lb4nqcr9a9id0yfi6fe1z0urcx9pithnc00ujcnaozp52uczwg94yog7e6c74nqdhsndx1rw3l7ueuo86hcxdbd6dsnnlp9itkxqhbt2ny6azhtdn0fc53ufgm7evoogx708x2i85xrlshj5vhe16sigm6ocytvehzezlmwb4l0n2w5u9wygydcw6tkjlyh8pkyo276mn26tp1hw4v1c7bc96kq33n6dy73gmvi5uczkndrrcohjkqpu0lk02qbs5t1aqjgsuqt9eagjngi77c6o7gbsn4cnu2utnff2ybtpowpe721brprg346pzv4y6x9yfoseq10xtbh77jxc7hjijxqn3kifk5kjhsdiapezep0ajz0c739t4b32c1gjocddg3vtl3ybyn99f5ria62rmkmog8lsugczkc29psixzj8sbnm88n2trnifwsy5axn1yey1pqvl63zqgqqub6sumdwyks4stt6cq4htvitm4m56xb3tp6ppag3l46ew6cke0maunzqsvvpj153nnl1b4g7vcg11n56prdob4qo0jlb9j5s37krgvvd7eetwjauk88r0yrz9lgn3x7a0ql8prugllkb33jv96ng8ztl327hq1brhojoyxmc5dqk62rcanb2p19okzajk270uknlgihcajtlzo3m0wujxmouxuzb2h3c00jdxij48abswol9tdfn1szke6o36xg6qe6dcfm0q4b14b9we9b5sj9tm3kkwyn7iyjpfdljsh0v4m1jgzgfg1v1oc8ffcdye1om931bbim3vfpwalakzt3y3v2ehllvlqtrou9tqj9fifgrta1c2dv1s8cf873vsw0sf8p632lnmhi4x3i1q87ps59bfszhcz5gqlbaasmvdk1si0v97qrgg80i7hjiv83x07cnp8l8815ehgc44orlv03xlbvmjzmqy7ofv28nw5qdehu1b41v4p99ihp3v0p38pzdj02y6rmdrojtgadlybdp8kmdxzxf3ljftcm2qq8hyc69oyb6b0965uidnvaf50c71h6rcj9d9rzpqx2drq0z0s7m4waubqo3w29l9a3rbpw2dyk832da5gpwm20su0g32z8xs427utdbb6x0l6a41smnrxfknnq7ulgck8g8xp6bwlyodvmxo3omeqf9f5rf3oa2q7357d2fg45ldbr8doimbszjcclm5hzuh0k6da8k57x291ckhpn19pm04eiduh7168nm078cmopxdkigb13lk6u1rco89bqrnlsmhaz5pet0723cuq1s95lmj7tr4t2s6oirnhkmvtpnulej6e4q7aol68iw2iz5tyonyx2ixw9gvak4jxxz4aelahwrbyslkpqn5ee2i558zxcpzluglmgxikj84wjoq5t4x74z05b3yvu9vm2t3ew1cjtgq849b1ljauuj2x1zua88ho97zz0lp6il50dmqqj7h502t6mtbo86017gf',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '3mqllstxx7kocizra1hdut5mv9prdypc17v7inf297t6vu5tvo',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '0oqbyegbflkpogtd4o5t',
                channelHash: 'kqss4wmgoz12bn1h5qbz8oux43d2y7b7ad6gcqky',
                channelParty: 'gt6fywbsnv4h4sd17ac3gjxab312ltuzjxnwmm14e1db113f58kp2frs66k4fyrfccgiyt40b26ox3hs9u8ig06w91ys6so8v82gtqi0zgi4kn0jjszlaavbat2evfsrbpweo64fif4hnuskkizu0nsvvhk164ij',
                channelComponent: 'e2kl506nx33cjpodgn1bznnq1bziukt19fhq7vc4zpr5ngv088vbockkrd2fbatd2fs5bpmco6ndi00gpq3dqro2ygc75log8xztf0pe8r9lmuaji4a2pp1ci858o5dv5edymvgce64175yvu3isa2socabn9zcw',
                channelName: 'oxpk1dpob4eh733n7386uk1uneeo39e11qe27nc69n6h7wsn2iuliroh6m0egz6ar2vne1lse0bp7xaq7qiyda65w4hcmygyyfjrej1mkncl9zohan31qjxaz95l87or71li3ri5bzsgrvam4zkexmp94h7pps3s',
                flowHash: '0qo0komafxhm417o0vwzzo29m6p59z8ihkvaaw9w',
                flowParty: 'xtclq0sea96wri4z9mfn3k64wvwre0ee18ljvwz1qg8kq8llh82cwcytxb44ve00aoaqo9ds5a7httrohgvij8zzvun65q7fhe5zjs8nwmmib0123jn8c98rc62g9encry79l2bn9to9h33nf6vde5np2alaglap',
                flowReceiverParty: 'qwrtmr5kslppcz21ha0mvox62daau739mmmm5sy2297xj6gj4otg2hcsadwi0fnxepgveo8ioufpq5fhphrgvfgpwwzhdehvf8u6sslxg7nc0ixwr02msbifcv1rihnyg1pryvwa418glld9sawbyokx4wclkzqyx',
                flowComponent: '4jr84x2lisu5pzmr7fra4mc309zgebczgoqltpq8bmhlnytt7h63hyccg4bzmip8223ccqtfql39ic0pfheivt9j5v0fandbhnc9ok43605swacyz41pvd9o9i71kzfbwkjh0jonbgst0gvqogppognmrepwe9fi',
                flowReceiverComponent: 'xio5sd1g64ewlws44kfpv6tqqt67zuzgg27xkg6m99j4x5y4txpra3c3gt3s7npi7xdx4cl756vvmahlxgzp2j20f5lsxnu4ldm8vcu1jpxd37s4x76npb80mwj37z24f7e1v9z8j3qczzz5d6vliowi00f7x2bk',
                flowInterfaceName: 'wmhzse3df04l156kugwl8notrxkhqshd1a33dyoa5pb1so3k8mg7ptz7e86kz77bfhm8rw10qz9mwchli9ym654dq17lfrfq9im2mzx6fu44850l8sg9e1lsg26kcn0voppcfzgpe9woj4lhtmvweyrkxhq2ltqg',
                flowInterfaceNamespace: 'kztsn8bpbb6r10pqu4coeyjasdfdfv4tfnkmk15ha8un556w86cbv5tsedc54gjyf7onjr7rwix5ar368xf1lk7vto76corceixamox60engqhr23iiqsfvsgejg9c0up819ezcain3xkeu2jit7zhhjlo12l78g',
                version: '41y2738xw8h13lrdg07s',
                parameterGroup: '90y0c4mpuqu4e11nnxmisjgm807axm3a17sn7qclky72g75w0m519f80ypxxfqx8vo3z5hnff9vrw2o089gayheh4pe6wlmztd31qbcnh572m61gdilcsgffg7wmfgyjewypknc1uii8t561yo7j8abb4sfdlsyjmoinf8uokr4aqb7zdo3eq14mretu4wi83hrg34csy18ih0l4h2ki3uykwicy1c4avnldm6my5cs8c2ajunoe3x73dnz9dbb',
                name: '2zgqf18qxladp8pziais3lji1f8m3px4sia6pqtbs19wchog4tflk8qblvuvi3ntrpvui83xig22mj01prd1sbe6s1y0zwmemkgju5q5h4r6sowpy7irn7ksm9jdvipz8ab9mu383es6wcnctcnlwkpcl8vn9dhuleg8cnhlilvkwxvvafk2o6oaqopra5whca9xqgh7hops2g9k5g1qbn931t22z5qlh2iwi75erwn0fo77k7x16upabt569htufwkrbapvwbhhmpf1cq49skwn3gymdjhh34ytu953vuyl6px3o1autky66pbbrca3',
                parameterName: '69nsgskiyyumg4tg1h281vnrp9b4hb3lgi2d26hi6j4f2axcsaaliqhgk1uf5ufp9gbk7v0prfyknvkz2jxjy3abhydaus2iuqzzwjoc80cxuay2sc1fkazzxc118op269ffpzmr9t43aqsjpdcaxdzb7zmfkcpdkbuldxnhhqmbpzt2hwz5cogz2etsa9y80qdjecwnyc0zj4c9hvxv9e7rc3t1tmawldxer0sjnzeg5qi3y6so09jbtv7gskhogwxxed523kyg3p9rgjc2ci5j8cwn0lb6dixzp0ti08y8tigxtyoygtkbtjga3f6j',
                parameterValue: 'bcem7pj74ve9pp5c5jntlypabls1gfn960tdu3ooe4zggdsff8a4xhocxefvgm7z0ht238rwrtxze0cy6f7iv8yo0q3o68jnk1cvuqmm8v595un2gsv8wub68ot3ity1zd7inzjo8j3ae45n2a2uigtbmccmrncecm6po10wkpxotpwbkvmaecwaqvio97qvqo7mgztitxtoe80jvcp7acwwahrvlyvq2cn0gmyhs76daydstlm6a8io4uhe8iu4uzv7n49fl43ooviqn6c893o9qqk337u1cb1kjfr02rei6z1mwov3g1nni0qp0v5ck6sunvs98188p92wl2tzermksr2e8yolth7vx3iwoe7nmvlsz1kkmaxulkx47la9knsxawrdlyuefz8f71z0zx1sdh4ztsgs95525ks4o0lgqzoi5jt5ja8hiqcjzmlr3b51rzuwsrlrrtj02atvi4t3wudcnuc1tyad61w7im89wz5ixik6cm7m2922670ban37f5nfqogle6z63qwhco9sd72w5uoytafr15gmcy4qo22zfh3wru9xhdkthbln3521ghrhfhy08he9avyvesm7oo272hr9sx6peeen1617zpzhl15svpgj6ro7aswhtt7osqpgdsb1bbqba9wqxqys0qkl7muu7qbcb10mxap4zyw81ee61h0abti6errtravczwwo8pyvtu8o7583bo85hl8f9gk3rzd59m85rdn224813cla3c777s0nponpxf1zyk0hk70nnf4jwzcebppyt6tjn28f8iuvajdgsy3hufxaycunyz7qrgnaf5c9ru93refwhot1dytxkynlisi1mjf4l10d4iu9n6quwlfd3qabkcrbeuyaktdf0dtztzkwskodziu8dar0ec9mne080s6p8nzmblz88n8r2effbzzmn12f3tbv0uidk4uk0tb1yxjz06ufwkor2ybdnkaetsp6rzoc5w0rn0cx0yiwytn04ggw9e3dejamf17g4xw7m1ifh50rtjbdu8k4u6wxn6kdkdj9mqu9mdxyub57i9u2qxo35eotf27jhbxkrzq2176lu1oe0ryop4m5enqtrl7w32ginu2qvrafnp51yyxh6vnnwdxj68104o1fp7ssxnxquw7fyr4kbdhbapi0khqz6lykfb5bipqy72f9pq20tbm3r3x2iecggl3m58gytfx4yc931pnq0cj3keab3n6i4ca5p7imndtbckaaypmt1ddgudep712o06lqubz68mti15hkuekag9f02tzb3nwocaafovidhc9ybulnwd9by93eom3l15q9os27xfymoddkbl1ihwje97sc7t8wkirwpvxekphrxh96ltzi26oe1n68526bx4t22tlc2lbpxedm9yqw1g5j84ow43lctcdnkivf76cq22jj3d2d9chlbwdv40dwdhta53xvlc2b2cbk43wyhhd3p00b48n9lv1igsatnstnj4gmmb27d3emt50tajjoigwge7k16m7qcncvjtuyv15y7g08vhsqpz1w0ddn32qwdnyt1ptfllfpshf8zrag4t6w8x4lhhvnyrr3ox51jkhsz3lvi67uk7lss6etlolc3u4b2ilazc28xdi255qcn7is1xtepp1mbo9g4b07wel2q4fz3ag91w9p6i3uihr94dwecu2lute5h16bvgtl805tung9utb0uns258fktmcftwyprio3x1a646993kd27cl5tb8wi8m9nv38mx4y1hzncp2rnuhdcd6wiox2jxu4rm95kvxsd2t2ropuksm9ti5ubwb1ohin4ow8c5in1rigbwdytjuw8cmdjovck0da2jbd5lid1s7iix47ccqd1bzx5fk4nprznhmmixickjbdevglz7iftk1v2admhqywqx1dxybqit6n5tqj0v93letq5k0rb2s15vlffn40cuut2p6rz84q52dfbiwkx93tni632liiczxu4mfa6v8gdgadrrqdyw6u26m9qlt9bsakvooh',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '9laryqszmd46wh0dhmoo4wtlcm3u096uwnxr5v71osy0k5k9j4',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'ct8ohwhedsj5vkcyi9cq',
                channelHash: '84ie6tz2fdfd0et4ny5nn49fxav4abvn7xv17wr8',
                channelParty: 'rudzyme6jpchn5xeq77ts8ync2cd6y1a84ghhj9lnsbaw5dz40uefaza9q9aoxnnhw4f50u7di1kq41wz5b5qmqf331qp41nxm9jfhbagn0kj6tn0glgfe9ve85hwts9fpaitrjc3pektdjfr2c3qalyz00n36hr',
                channelComponent: 'xk8s6sd7r91fco05nsnsvzh582jwrsm6y5dc4t6yyrr5ie63n8rp8rin6oafbo5b1jcefy5tsodfo5zvsx4u3ww591vdaihzx5dqcn5avlvql8q663j2csret75ipje5pqgw04t217xqpta0ph3u00kxojax6b5d',
                channelName: '7jzri9n2q0rultab8g8dmbze80az6g2ze54ormar840bndm2ff60jtm86oeetpxnzvw5u5t8cv5nfyejb39y8spp2kk10joa17dkbqqyxbt0ka44ilg6sh5ztllsn5npfjfsyf4s7sa8homfml73i82gq9nfg9go',
                flowHash: '4a9orhcnddjt398mxtfy8jdam4gwo5nid3xyb7nz',
                flowParty: 'tfkfjhg7a055w2yxrpf5ceys2jtm3sz04k7rt5dfww2wow3s84c7l70jls0jd2mg1d1xd29kx5436twzpafuyh1cwt40vqhhu774wob9xr70axtnu2fkgcpt22bwu1ncpvy7pv2bm5g6uya7cgwf477hs7xh5jt3',
                flowReceiverParty: 'o3wtl7hzb5mfjjgm3quf2t8sgm5wvs4oqsnxp1ejjsvu4zi5pfhj0z7aapgoobcfws7zyur7kpgknap923uw6o1xa6y5nrs0haekt282ayoxef4oe86hmbf69nwu7q35ynrws6u4x9o750s52hp5d0kfl4bnpbtn',
                flowComponent: 'znyvj3cosn9iim068r1yk7h93486hhuesenbua1e45jcypudtpsdqw75vlvhat8gjlvlsl4u8y57cieyuqjh1lbdv5aa0hnv9ge6wdpyb93j6w1qumjmvbfbncmxsze9kb0az8piy19z826sb98wz7hoazywr4job',
                flowReceiverComponent: 'dfxys57kgps5o6sib60oqqivapq0kmanlisru5jnwxyoz39sdpog5bfpu40rl3de9sbcifi0m8g0m27gpkn5ewjvosqo4x135t7ergx8w52302ldyop249hpgxcwrdgr68g8ft1ovt9gzl64yurmvailp9veavpx',
                flowInterfaceName: 'zo0rph7f6kv9mdr5tfe4zsewbegb5g9bg2nbi9du7qrfnq60n2qszbj0m1jedhpursj544p942kzrfzk3ybyp6y9lvoik8rpi2aa2f90v2wmvq354rtnoq6pt30q0bga2s8czzhphmndmwyu4mkbgmxvs5lcs5gq',
                flowInterfaceNamespace: 'uezb9fit021dkkzbqk12aei2b0wakilzx1y57yhvxaqix8m85dtiqedev13s8jy115t20p0y1sklavpd18080ry4jizpeu8u20qjivf5xrgmxkb6oufanzljq5szv56esq4zxmhaf99tdq3zardnrxuvlcsoq90w',
                version: 'zhmz0n7m7t72j7u803nr',
                parameterGroup: '706ao8x1bqg22m5kypcde1hpb5noaeslvpxp3f440zj2wrzynp0a5smgqr07ctjuo0lsshktd9a6ukrjijsgxhw78qdrj525kdpsxwfbmubd4aed47ueqa67uxnlt5xmry3n7fk72hnwpr8bb014d39mf1i2ypgm6hu37d66rcjao7a5xlz8xz2wgr4lpjztsv3i66klyma8jj3fxrcvc7iz1o4peeo75tf1zkvmv0im0xz1igei21y3kd95yug',
                name: 'v19clyvsezrgasyu5vzzdub0ld0bfg42esyxgp4pjrpt2jcxb9pf3e76mswy8mb5jjs7qyqikkocz0kybfifwyoc54l4u9xtwsrwefh4zthsqjfi7kwjmjkhpq0xupnpo72y15hmajmv4lsxczbykaihfz1ys77xj0dff7xqoyhjn2kv9on0uily8ma0t1x8uf2aj7r95cmnyv7no1xo1gowu6h3lc62pgejqwh6p1tuljw7o0ngdwmxpenxehtd4mgbjzeeqlajeabho8gqj3dg9jo82bs1j386lliqp3qap6lnyr2dsk96d1b8ewuh',
                parameterName: 'r8uqmi04yko05bc6ewzm3b57uwsi8jg90uhad2qqtpyauhrc6uedtu4x7o17hir0004dr0j9607xtx10aj5hk77akeijgf7u5z1tnn2ggumhinfncouzbqkgxf8te66i5cmpj5lp7bua8nulp4nik6vave3cyiukui8upvt5eyfk2zm4ugf3mzgstwlem22z0yjofejr5117apxve24b1y7u0skcyaknjgyd0xaqpq67i6jwduawzajx0dsq7rshsouvnf0xxj36t82ukfqo2ho7fnzpbnmfxcknipxqzn3bky52ek8qb6u3vgxwheem',
                parameterValue: 't9s582e6qi0izsh9fvrw9oj7zlyj5go5mcjw8tk9soomy9vwxtwpo1tt2mzyuh2dg7ut4dk8zi9bfc0ub5s3iwdszkkgvvb0s0a439hdwjixic3erggnv84xr1zyj5jbo2ew0dh33yjylfd0m4cocncwhca826jaqlrgez71lwhadtu3cr1gahb3pxgnc8z8u2hew9es0idtiq8oeushey2aw1ai0opetiyelv1n2t44ybjb1ok5avz74g3vc0gftocxey7ktqb65bvuki2wsi3j121phu78ribjvgccqnbm7h67lau98n7pjlghooxlc7xtnn30qfap3snjarslcxxcje0aw1isdchq96nrqvlz84iack3p10kgazocdgdovmijfxdr6gong3iamwmkdczjhihdbdhfx7k7skx91o28rot6t9kexmn229ftq18y7de45qmjtkia5ztdmu8k3n66tynuka85gr1lx070q2u5tts3sl2hyk76g1yb59bnzz7m568uameqa1shw89t0vlai666qg51iid3nuqi5bj0bk6t3hpgy0yuoxl0wyjqu7akruaqbuyxee92sv3utt5v9ptnzkahwuwa15vp3c0ftd3sult5wo57velvwh6yvombn0agnubtn2kpkzbf9l35z5mzygjh33xuvyzgxponp17eiz40rwb4n5cswqffc4f4jbztgwir7srpowf1e08o9bcxkvunkrxrbfk5h73isxl3hq37aiwgqrgbjrorgvhxj1gftza0jzuta8mmizsb96q2596cymgvc1dffjds2zdtgw8r2vmpchq29skl7zwzs85hczb5t6e9qwzazbdwele5jbxeaoq2z0gato61hz4szgr9mp3mbb3k7m4z9504wkxk2zlngrtxiznpayt2ygwrxd8ahascs9dj2lna2n4kpqm8ooi0euj9l7owes98ppe7arvscyjlidilohwgd14k5tclv1lb9022fa1ep7m4ekq0ycpe46dh2co6rh96jg5boffdc4au02cmjxil6a3txcp2giup79qxl3gfpfojppm6aqa54fxx36fxz0uhw1gsdp2ounwzp0vs4e01s4wlsbqpgb6q10np1shqmb4qw3olr3xhwvyzp5m84bokut0f4du5ywbgrd4dqjqvfnhfastfwtyrob9hzg3dpxjphklj077rvvanf1pi66ex0v6fqegzpcgynrcqcpr66b1yxdzivfq6qskawg0djqfqaa1ss8w102hcnx22b3e9s0cmmc6kw9iuvpiyx4l2mmsvo5igtuk95h8zkl1douyir69r2vh5sj5w271t8odmoomd9v6ypv5n9qu94jae9sp4vl6hxepdfkmyhhfzmzvyly6sdg164n0b26cmujzcgma21iacj03ufjjwarxffl1rgypgcl3gzk4kusaaab0l8umlpe1921swgh1hcz9r8o41af1xqd9naa06jiyoq157hj6dzgdm3252dqmx4bz9ylw9f3e04dfpfqrf0mdr08ojowoeufn7cc24swhrsr0xitodm7qoxpiucc6sl3d1d5n41jc6j0r03vjb3avdje2lwqwp257wqfc7gngo09g0p8i531t2189lo6ebgeghxf5ojfqhkar3fjdv7zs1t02xiaaexy6iursdxe34wqmnn580ltuy99ksbx4jymv8j29g79mnk15epej3g6elrkxbfys9asmqcpkazkxym4007j8apdruv7jvo371ed3eav8z0zzdqywe50klmibqftrgtawed5n7x3omo0f1g2vbq5rih07octv4tv3o327j9hja3x06l12mhs2e9ws26j8k6ye2liffrqe6gmq72diwf6moqop5bpd5auu63y50camzrpanf5zb2tfbivpdrnkegj9h421bmgply4ala8y0mu30o84983bvho3jrl26cea8yno5hu7jquzvynazqgah68vwg3aiqu13po2k4ryxhhafanmegm0fzxc5o7kl3j9gwj86owsr01bt',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'cdqgmujv1krvq92ehq5gvqih79owsemql2u62hvyjkqdpexkll',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'akt85ev0nnrf5lj3199y',
                channelHash: '7vk74vdf0vl38wus6oydy5rtbt7b1dh2fylntqv0',
                channelParty: '6fk2ydvqweeyk1lod2dnsgr29jfgtvqiezfv9ocu7xfqt8txcjvxmyaecg9h36kqy0abrt39bzu0anqfw9nyxisstpbxatwvh0pqh78j83qje6r3l3a8cla5oa3ai50q754mx1f6agkulgy5g35hjkiic0l6mjlj',
                channelComponent: 'gl7gci2yjr6080lzvumeyvcm45eqxl18x07feyjpbwi7crud4hw72ehbwxekucuy3oeps8j84yo986z0gml5m5u02sv6qyjoydjew0xv95ojth0v2sc02pd991tlze9p4dsi0z1mu37v6ls9ml0ft0g22sbpc49c',
                channelName: 'oain2j23uuxan8opu9jfuzp0sr56axozu4hkn3xnfodyenl5c315y3m9hox9xcff11e8tefet8gwnureuwspkmrhm82za71r5bma51wegnzl7fvuvar53h26a1tpjza0v7yb9pj1jmuxv86l14ck79s9s71bku6o',
                flowHash: 'ue9tgzirogw0nyf68ad266bl0tphsx4wp0rp7185',
                flowParty: 'n575b2iqy57jw518p0wd3g20yohrynk0c2472f03871h38y411x77ervmfy6j7v39u8b3i8ldes1xseokoywo98ibnj9m45gw4xrkiip9yvjak7s9mo546q7yqjrkua6ti2wehyzp8wjxeu0fjjdt40mbklrd6um',
                flowReceiverParty: 'r7lzad4np73aajr12a54rvk3ji0tcs81ww5h0j3clqf87zorxfuwe5r0f9z7gaxlgs2jday7493dcvyi9wu8j1itkvsxw1knfgnww8tca54f6tewhnyhjy0fjh0yimaf0is5qzugr0maehkok85fiu1kqqqq1acu',
                flowComponent: 'paglactg8gj7o8oysd5nz9hiknkdo9rpurtxjew3e36b98e1a7jjq7g31odw1spqfs6x16kfdbvn6xa012kry5sxe1bvgc5f25q0arx9oa6xednvsf0ug1niv1duxuyvt8tymgi4dklvq4ztrvbtawxtzovvjit6',
                flowReceiverComponent: 'd7v0qlqaefat6sahz5o5huplqxy0aadndzkmcrg7xyugc3dor7on72rzi53qp2ynx8z146z9wrjvo1qwo0tliu473drv3iqjz6qovkt4dldw73dy1u219b1zoc4mha0btwnsrynb26yxbymc7ghnne45ulf2w6die',
                flowInterfaceName: 'heshhlji8ylzz34770vxsqec7tn6vkh4d8uzezut7ap44cpquih8sc4t1myxts4a0x4xa1ql3nhwksn9cn9kabdisxzmez3lvubtzhvln2qxqsksvmyyxyv7g54dkl37alfpgf38b8mb2fs6ejzc4z0le6ts89lh',
                flowInterfaceNamespace: 'b0bilbml3u7mt9bauwy28gq02vro8ek2g7g61aswgqzvc36l4cendjc40z8u3aelh4dsiyx7o3bbls6whkogqdo67palr6lrqsytdwnbq4hojhfim894g4q7xiummnu58zoc7kwj1wx4plcvo5lejm9h33fvipie',
                version: 'pqb2k4fx799j2rftrhsh',
                parameterGroup: '3aonunbne12zqld1osy2zh9386mtmc9shovc01ygtw1yy4eslro3o2poj8nagzyezzrj67ryei6vhkyqq8pdu0nvgmma3zfvd4f0v9m1z9vhb92ypij3c2xkhtfw1za3apskoxx689dwl9jwlsmcqd9qgh3oj4jbn1ioz6z1uvc4i9qh0zlvx6hjzwz94cmuqgw7zdyos1erbt2v19bzv5ap51pcp5g5b882t51qg0zj2mhid5x5cve4n49z0qp',
                name: '8dhbuurge2t3qvgfgofg3fgxossu1loawm69f7jxqdpg5rk3vcft84vvwbwzmvrdwhj3gqzmkyzynadkimayjys9xg3swyduvsxsnccz46497a5w016g56xdtqrqho8jbt99orvwja7t9f3mqs6nsapp3oaxo6aog31nzhzs67vn9e9fgjqowjpeeqzw71pibe7wox92jqtzyh6hhyikrwvvz6bxoivkz7ppgpie10lnciuuevtsdb5c0yx4mld9xw25hrshjtk4yexqmn2eamcwfikd8pozb49dhi9gxy9yawrjthedc4iulmbcbj0e',
                parameterName: 'ufisahkfv3bcbovy6p3ipp5lbyldp1iw15zquukxsnix0l3208sv688aen7j5yqznr2nbm6wwjoppy0zgmu7j0t56lqdpuseeo3jg8c9a17037b8u5lnmdnqgwy1nqvs6xmpxeoq2ocmjjasowz4nhr0696kekdz95frte3wodh8haphtom3n1ukv4y5mqkvvzzp0fl1uqsudx66zvaoafyvj1lisqbsaoc6yino4mkywreqm35oa5nm6mvdaax5z1bnoquse5tx26o8ngdbd83ra8pjkrwsfa6o5j910ldfogdkl81j85lwgkh44ti7',
                parameterValue: 'dv9tr8r9gqq1lghxy5hjfetqiwjp56ie3qsmheo5brn8tvyrcs5wps85vlugh7bltnzog452x5lxaf7na8z7e136fw0d4fhazaw23covtk6mm3juhxojr7dkc4z5cpjjuf9j2taaswjnqtclslz45nfcsd8hnvv9cic0axz37fw2crnfwel47lr4iwyovruy3ijbeyzavo09g5nqsrvsr20b0e5yj8160qxzv0d8gaj6thyn1uv0xyd8zwexz7w72msz8b26583p6oq5m1dgl4poc0dry1mhiojcyspgzw9wi45no2u659k839gvx2vlg6zk3o9dpcnjlcq2sfe0bi9pdkdo4wtw0d5774he281wlxsmc35u8ji60ubarx30x8xv6qemqmqt2bu3bw65ishexrw0s7bqq4ijdljvyopbz9uo2ly8s846isj51fko8fqul29m1eb9cdgwjvp4w3x14jd8cnzub90wbvxhtx9dibnbxx21ut0t5dit4n1bged1jyi6xv5i1yi71ctls6k2by1u7zk1176k1kljg0xgebsdbo97jm18japy79co0yloo5jbds3wjgfkqjzlfbmjxwfa6bckmcjl0ddjr1tey1l0f4s1hbn3kyxe2msbt6wgby2penx74g53ojd6xx28pvebw11c2w1s5fnzqm02wuj9x0umoyyikineca04w5dz3wef9l0wm0j4q5hrjostke2fxhczlpr3qu1q8y3dx74dn3jzrf11vpvgby0g330yub5gdsppwmay6e1fzovgdyrjcmar26hb0hd0xfh2uf1ztmbyb325pp9rg0udtc7z76jj89jw3cy0a6k7nrjwg5ysfev0uj91cehfe1047yhpkofsk7gk1v58ks35pu1u6u54xcej0fv4l4xjsedogeigioyeypkul6j85ka3msogjwuuv8h2acll08g9kk3pn533rqwxpyr0dnzmpnuvpg1riei968z2eqrdbw8icgt153ypl37nffuvni9l7412560c08qp3pre5n9zt1eb5zhq7k7ku3bqx44owb7zrjgijcxcw9itsli6lqrrsw7uuwjglynd0t0dx1uxe7d8u4rs8b2iqxc3bo7dgvtamhayuw4uofeeyutvvwucsxuvyhx2cmq0rboe1gog006qsl7mfya04j2yt4h27dmglkqupxg6t2p1yw933vz9yj85g8pu8exz4yrwl2leoiq33mf89ac5r3nj5hrxayxe68xmpe72gzq1n78zdvdzh1yvqo9xg5yndvfyu4119v7xbsk6gkzexeefnc9qqhnsft544mxjlk9k16d521sfk2w40ofwwkiqxhs53p1p1lo3owhq26nw67fq8k9t8a97zfma0nu07fv4fqcjeu6oji2824ihpoq1mjobq0sqp6zhctsk1b86xynsxugs9an8rxobkunl0m9dikuk4hfcr06xhkg2zf1io4a3k7bu6bmf9vixraalpwjdmljp09vttorkiw778t0fyffzr856s2mjr5o70793rrxq1d6vsm3fjpsl1uc5o4fkx75cycv5k7pwrcomw4bntnnvym0ouqx41r2oz7plhfsgih9n7vxf9ep1383iv89428c9hhz4957lg14xmihzasar2424g5g5fd4we97esc5ht3hiulharcm4h830vdpizsx6feepvp3zjl65c8g58tntbaspcletnk66t6asbfty0j8fii9je0kfk4xi711ay42lxd2edegclcaraxblastevdkjs0t5wo664rdwmn1btcxqb1jn4n910aqttr4gdlyqambkxcgs14sxz2yzr1e6dryg1arnvy8twn5j2j7oym7aaig5cmlt4zufwkf31b7by77rto2z886fvkh95kaynym4so78u20kpoie0250ullqiud5pppjiw3pkn6fsfld1n9fiqthm7ftc5cx5hbf62lxj1attnblb02hobfx4hfa9xvcc13obsdv8h1wvup282enadr7i0vkasyqr8ig2hj1',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'ikljgmbb9fw8wbe9l4wre6tpy7nagaqa2ibfmv2r8gsyxeifpz',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'mxie2fyhppfkunptap6p',
                channelHash: '2he9tlvwnf21y100h1u9y1l9fq188g0hw2x4kcoh',
                channelParty: 'ekkyr58r0gc5kehyuwrzkcov47svpl6clqpa0fykjoe5i641ake8oitpvc03v6zy1z9uw7l18fado7ba0ou72jboxlffz86e81svy4pevqcjsl57t4877byyyw5r1i1osphf4jkd9jfcg9u33xzd3i4q1qo27nxo',
                channelComponent: '12o2tfzds5rgg1dpblazqg9jsv04ker8nogwqd0za5hsu0m6ksxybvw5mbtelciv7f2p3y3pox9brhjxdmohb0259lvehtxmp3oebzivuhbob0y45uzv4araru11lifsmmj8bki5gty57efix2etjz5vud2vv62l',
                channelName: '1igv96kqb7nnjsx51vtj7royh78z3sdw5zgv27yubwubl4o6p372u7q46hqvhqdfw0b9cn2thouctcge2rpxao2v69urbn3gqd4m6ebt935tpg893p2btzy63z2qglq6wqu1fflm5aqidz8cawoxgl2z8c7s08nj',
                flowHash: 'sb4vl8w65hx589idwh2mensfkjzx9ecxxx694j4b',
                flowParty: 'x5xmri9bwzqc0vekbt2opyfofiybd2xxxyj6z93c5t19lpk29ww2ptwjc4vwhmdyqa94kli6eqsv1dhq45x1g65wz5jwq24bxvptaf4ui637xf8ataxio5qtdos44sxo8w176nbw2g8w1x3fd9ckswxkk1zbhgmm',
                flowReceiverParty: 'z0dy3b889ljc6tc32ak04bv121z7z3sk8x9eio3y59bzdvmecact708x5pxw0cccr231owjbrirxyjedvk6rae4ii5mzuvvr2e59uk6l4lwc79xmfckg0txk8oa71dcqq4sfgm9fd5ggyn1drh9b4d5riyq2vib2',
                flowComponent: 'g2da4sx8sp4uk4p1c6x7lp7z3cn4qyrqej309g1cfivrowxovud29s5jzerqz188cqkjwyjj4umkhsulz9rfy9kp1kck0df7oyej5ja7wixqqdk59m2345emfn4xxrtwuscy8zbyjfn77oimb0nhqish72wivbp9',
                flowReceiverComponent: 'yljq5ixlnrt52vso50sukdy2bauh320pnxby49gpfgz7vjjbv441l9wx5i5tct3wqwvkz6vgxjaejmqb40ld1v2c1rlxhi2mtoszjb8wh0by97q9cat6lv9v82s6jshgpso3c1dwga11td7wkjhb1u6owtyhr3tx',
                flowInterfaceName: 'rtbu0895v4n1ni519s583mj7t7iksnyujx6tsmxsr4mk1bo6ozpt0prkpuzb87y5rxmtnt499pk9asv8cer35sfnbabi6hbfgwzd1er5z0p4ivxxchuxqsy1tiy8edhxmfizngv8afhtnm77td5c3dggoxa6yx4bd',
                flowInterfaceNamespace: '157ixl7xowpwggjo0xnrzq83bwbek0wgl3g8ax6zeyd5li0z9dxqejevux7tjevb7hytb460x031loj7ah41rrpx879b3no8cwpj4vr07e77x8a6j6eifj6v1k68sdr766tm71mmne67z3xo8was75q2w6awhsqn',
                version: '8cfr2tugryi7htoh5j87',
                parameterGroup: 'f4upj4gzjn9pp2hdz3j2luen8g6olilfjajmp9iiccwstzibkgmhf5gwjwrlggak8mt59abiacvn4tm2h3wosbzwyga7xctmwftr0s8jk9issh7p67epev8xpo5ihbfr41ggxt16bubozxfsgo7jkrwaa2i78vrj3xxbzfw2apc7yt8jx8188byb5h4ri9p56a4e8xz6yc4ilqedr8719rratgfm6ypfo58evwiyxxtnz0mersux1ffs7v8c20o',
                name: '030z0cgkstyq2m5kuugf8i8931n5bidhff4ktyav4fbiqge7hg4xyhiwvrdgd01irql6fyxdx2y7c3mxz33g9vqdaqanxjzxmoklo87zr7x3k3x39r8t0ndldmr4l1hjsz1zemxrd75yj86is2evszs5q1nimmdw7luh094yw4qt7q420ai7p0oigrj8wal0r0nx4udl0c8h7ufvy92hukourwut3xqqv19eumeawdqcabym5w1r1p0qjbpprwryciwl90irg5zjhvtif6ffb2kxk6j601tm6fat63yxpwjr6s557vwcp3k4defbukr2',
                parameterName: 'nm01v571wpi29evakjxdx3ux67ar1v4v4gjjsr8s7i3cntmoyx23sqvoiod3sux2npz2ca6oozecfncagujem0mqnj2h5taqcawynkjbf2ncjshweqenuagctn0v2y6o7ak1jvn4z7dboa8vvu0bppci22b7qla72l3oq5qdhs51mgb18fou5wriafyw2z12o06lvhfv6usnkgcgx2w6dl60qbwijwslczb7v3yj8zmv5nvod72l441mexvjg337s11l4d6grco2n3is4o14fhlmbab5stkrzsa8tjadsyxn62019vt4iizurvolhlkd',
                parameterValue: 'ig89qqisjb6rvmd8r3ii9y10i3wzikh9jarm2iiysgb0y65g74w6p347iqv3d9d1yp3qmi12rlz40ch5r54sl9mfrq27vhvzby4qwqdicrfo2n3z0aywsj77biyp097kduqw4swpv0rouwfsifbqhuvpauyrafwreo13ye72mo2g9r5umj87twn4diwipkw8sghxuvgcqe46yzg3sbnowy8sx1jhrr9jink6f2sb589y9562j0umxgmjmsa541wq6r8npd9hopxxt4su2jmues2yoq0gplxfmhh3h7uvc7gtjzqj1m0lgmjqk9t0zyexv8abjwwgcua9ng78lvsdcwf9uwa0csjsmqqvl6vitiwa8yf2amm3czvf4ju5sapu5l95zdbr4x8dl1uplq92uba2ki847u5pibgk43t07byt29r9og3m1gwzdnd0sl0si31bacdlk0hzbg2dibmro2scq4u3yfo8wvg4x2h1pssoyitzd4u62nmqthruts47irfitxogh4h3zjzjxhl8i55oojwvzbtukqppphx38553dzc94oz7mgnmr10jbwj81ebyj5cdti7oddnwwu4d4oea19i7fc49xj0j2el7kr71kyma0c8rafvyxb1t2nziulu0ufgzrzmjkpy7ofrf1fg0j3ty0aixjem590hzgnl2x8336cuj56ainmwdwcwl15acl2ndlik23qgqv9e9itjweypwmt7e3ijwofkvac29te07ccgknq3qwkrvr6u2cfppysmz5e4xqeczed2oo2qrm0xni0i5yetii63ilg4nn4z08brz07rvowu0yg2qcevleisatrf0ci5wk4zjkpo0kimtgkzag5pbdq3tdr84rtdw7s05rgiyph70bkaqjrx3705j1f5j2cg84rls0sdxwfcc18twxvpggz1d0rsqe0apfux7m3elblshkdsoauxmitgfp2gp2uneo9cyahrlpkbqorcki7wgjeqce8egr4j4yc2zky3fena0dhbjg62fqz45n81d2xu1pcknnwpwj0ya44jqviysi382bgduu9ynr53bmvrh30b1slkdb04q8xfbu10j0a9ex5vg6fyby9qna95xms1zx8rr63cjqr82exuyasqmgqscz5u6fqvmo81jrr3kklwjl6wwppgd53b52qbh3thmuu0gdonfsey81peg1gxmt7kjmyaclirjbruauftld5908igjmklpbzoob878rkdrc7a2lkalflul9gqfcbfeqhy6eq9wazjlbej1x5mibjtuqxleqfmitbtqqf2qxy83jb32kfj11yqbx1vhu8xwpvjdmqyamp5i5v30hf4wemaph8pjyqlv0xanazynxnpaqp7xaotjb6rccpr2g3bhsp7r836w5rtxf7xkjvtzybmnexwmu7shztdjzwk4nge92oz7jz73skbv5nj5dmdgydj6rs6wtbxwktkhjfk8wjcj59ixc5cpcutl6d5h0hmlkknuryxgp5cqa15xew5vdkvx8rrr6wf0yu0lxfs56kwox3lwbe3xjaehj5istr59ncj1lh0caxs291alq4adoarmmr5ycdn06i97kowrku58su8um6g5shwin5sb0hferjaebas840ujsqg1cn7zdl84vqenu9leunjfd0ixmdell4yn9x73yv0biqx9us9i33uxmsujvhwzow2fdtan64u95ruhubekfz21rrk26vc3o26bhzs3wjrsqvz1ho21sn0cvoxsn01k5fykskd98f1cezbxegb2fvxu3z9pmv5xxnw8q0xcoeliejl60q8v0wb9c29o0v4kn6kgaye9nir6bhvsijy9u1nvd78dlb7pgh8qim8hoqj5h006t84u47znpss8ab6nlrfq0n4bg26inp12gjgwgc4pxp2li8ekx6tzx2h9x3niyvm6mg78tzwhc8idiogffabxdf3t5b8iwuhxgyxqmqjpl1entmpm03pi389u0qfa9yekdp11iwimi5vki50fui1pvmwcyhcdhylg',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '1szmqr45km4prlz9n6rhsujrv5mrlcmmpnc856tbi408w5d6ln',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'rufs9e5r8wuv22sgc5ff',
                channelHash: 'a2ywegsyo94oaf2i7zfjr6xueqrmnkb55sdzuqfl',
                channelParty: 'lgm0j2r1snisralmxye3g63cawg6lc6s4ogvktgpttgizvd32xnkqd1o4woyzdbekalmblu05a9b1891sx3gxm3w3g0zkib6b1ur86j83hwvlur8ncegcfaxc74gc5v5mz0g4c7ov4jh8wqqkror4ydruequxpek',
                channelComponent: 'dx0zcf26qarii5vp5he9w8t7dhymzz2frcad8xgtdb6cjtcj5u3box6bhl8si5l4wwq83btb00j6vd6cbv141tsg8783g95zns1wxp1kmod9y4ivd7saf4xgz2u89gm2tg7fitfvos8vjyt9ojmzssq0e6fams3n',
                channelName: '2fqrgklsg1vn0vasw2ol1wb19uydkp1xognusnxbiydihheufoqi9pmboryau42ft6j8de8epntg50t6ujivv4ucup6p1necfp3buzdfh8a6smc84cko06yzk41mflzym4ntkb9m66meft95x7dbs8u4wzi3k91x',
                flowHash: 'g4udihvyckyli8kuzvhstfonbm1mv7qmrudh23vj',
                flowParty: 'x507jbzk0lv9qa2eblusctrgbuhpxxk6q2df5bmg0lzeuxd2wsud1yhaxoh547iyxwfpfd813mn4q2dfzlwgbez5tqlst1sud7r41ci2agrxpgg9yg3c50vei4ea9j5b38tcb0rjtqffp52ztcyz6ezgeeu0gd1x',
                flowReceiverParty: 's5ikdwbzkka0qy6iaa64ml7krg832t2fgx3csupnatz16tvzstdhriexvyuwy8c894w4hp90azg3dqrrxhquqnxh53c3piu362ynbnsckrcgnd8sz68lglr7lxl055kd1v1vxx7oc2wvaje3mwg4cqop4webcrq8',
                flowComponent: 'z3d2ta8evhnhtwvwsi2acp4hvjt10z0mga1qqaa4lg4silcuvonq6znoxlz8hcusuwecyfzz9os1vkgkf7vu6zezksl2sxsjdsjlt3qzueksixvfkk7ej6u4q0btin0k4lxtbtbc0rzzxgnshgo0fjj9bq4z2ln9',
                flowReceiverComponent: 'cm5zuq89si0s961vr07suh5ngup5iw4jknu465u41dnrlszk5j69wydgj9x7e52zjsrtfuwyovyjwuepaw57d6g1l3jqb17cixop6p94dakluag8nisgbbcnnwpuylwcylur5s9z6rpr59nyk0mvgxd2k62dhxjj',
                flowInterfaceName: 'ionlt3do0p94p88uos17g48ir0jugws9v3blxocizmx4qqnz0ax1jzzta94b0b1oz7n6d63rxjyaqwhj6f3pw4hy2n3q6sed5thorj35qm3mvseowqmazw3w1oqtntq0jil10wfokgzwno9id309e6z1csad73cl',
                flowInterfaceNamespace: 'iwp79h31l63641riirudss7xkzyqnrv9whynylgwgkwtisasi8064gurr9gu8j33cc62z3vbc5jiyb3lw8etdtnq7otzgzern33a3fyc299j193x2r7tcmx7w2ttmmj6b2mfe35w1vb2qs201d9on2zqry5asqhhk',
                version: 'u6zufhxe51mul51n4gm8',
                parameterGroup: 'uof5bttemmgcv2pv80kyxux09j93ozr44bem9lafmuib5sy6wicmhslba6zp54j7n466007g21unzp3e2812n672cypyietsa8j7l42xy5js2sfzx0hhnrg6h8efglsk1uckzbam1tumtlf22bdiiiy3xl8wg6zylvwwd15j2v8qftrajnsl80kc0hjtetpnv07xq8dosywmtdt64j90liqooj4evyr5g1356tc9tpnjuv3sh58x26xsfkxb5b6',
                name: '1kedyrnyijlhhydlg08huma1mpiy43tzdbewg7u16us8459ehttub2qin8u6gof74j14kx8xa1ioh9fu5v5dlonoz153a6kb6s6r1275gcusaauh6kjd729lpg8wfid2akaj98tfly5f8xu26l5k0p9bt8p2ps2u2mnh8c7a64xtll4lr87u8y5exgxuk035fku3dz1uhr7czauhuaigy64iau6qrz2iot8ten4kjr5p0heb0850amxdf9he9s4bl5iz8brom3k9j4gi2ozda5xffzs7qymug38zy0qrw8ygue9705lbsca5x5xhjado',
                parameterName: 'njeuajg8usl37nltqzauzaiay6vp85vpcywdpjzf65tlpr00uzsgzlz59rmtm382sqjxrinogvevaus5y6j7aw01l3nqqlz07vgrn05jsg5k3bzgvghphgslotz47v3ym6z71b6zlp2kekteaicb2j7s861c3wf46of07cuww4lbw5p5z4y5b2gf68lxoz7ro15kgd13oe65ya4uuuwfn5k80ud63essgdla0p2b74sld2j6yrral5iz208zt3u7cauaagcryfyg5emorrswnbu4wevg55fqgllab8w12jm9y3vog2i26revjnksgmgf',
                parameterValue: 'yo8kco8fqv6bfntezol2iz6tlceg8w3n4rv4xunetvdmzmoeijqex4gwftrshas852h0mzb7u74zteup3m1qta0hkywookwhx960q3nt6ywvcugsxfwvy187m5blorfhvgg7mrxqdh5kcsdl4miqjq69rmm8m5y9txc03uvx9dlpt4w9mp4p7j0ixt98d9nwtyslsinuk8gje3n5wo3j0hv3o8skq9n2hmtmz796e7g3es3yhb6bgufxc2hna2uh8jz3s4g5wwne51xgosvr9ng74c05p93o56dco6fgdoc91vbsllj1n3ad72tss5ewgqizzmu6074syhyp3kfa0qayqz6lgq1df5f6xyeyt0cwqbg5e2gdg3lakkv8awl50bxafbcnszcv2g4ytj4nxy9xylh8vzhqgacpo04gk8ozjbpo12a8w647t875a0p9th99raazz74fclz9wdy5jao3nmy2ct0qpvyur1l9hixhtchzb15xtt1ei92y39dlxy3rdndlg6cttpwffmpvhoa1an6lumcd5c6qvpwlpsjtlt5yonhb4hnw8squjtpzzpxdb3xo4t14x9ex0ufy851twy70zpqu0xoixv18ioiz5eldjvp0yjayyqhhq3ph5wgbw5rqw2zwclsc7jdmtqg8acvrunabs5n1l6zucx3dinmw0ax7rkhdzomizwewjydz75349odmcxx2u8id59j0hn8yk0h3argw8lwmerbhp3s7xvy6eldhfuppxrb7wsbpfz674fkbk682y8kql5oloidc91lska9ig0kgl50zgdd6rlc9amt88mbyt7kpjhayp0twgtwxcogyo78hg6k57wsyszi6gwx151gefalyjwrqmm4m76ciq0odkehg41ll5qcsf5rgdmqgwyaln2tsna6mj9vhfa1ma0w6oc3fm6on3lfp0y9ftnyb56pjibo8sp68j9dqwe2l4b4anr57yw0su688shbrd6jfkyz13upkkjqkvmrkxszb98xvcrqvy7639okaij6tcmxkrs6iye2d9zc21siii6kmbc9mn1s0galgqlh1sakmarcae529fuq94jhf804um5tz40dzs0uzns0leqatf2pob5bqz4sq017imw6kcpe6ay0853tvzo91y06i9es506po0422nwjoqn6uaogr6gpwjkuraiuhxj8aeutkbudkqqq7zkq6q86si2rmzdp8nr94g8bt6857bnzg9hufmafo1oa74sgkxp2htxy0vq7462gal8z38typorga5yzle7u6euc6t30f1zf5puy5xgyfczcz84vs56j1q69idaa9jpr364nz0yl5f5wqkiqwy8rati6l3sur799kj4eqh5j3vefdanb4c3uza8mu63b3xhp2bw1yqjy3v33p33kna9gd6ac4m3mwi96wrafte7gv14rqjz77y4ybl6pri4g49vzc3qp6nftlko23u2jfzq56hmntm7beh1ymf6duds2kykgqu1mjpn4acpc4y4w59ixy2amjsbuen9bk46jr6vf9dko0qkbix75luxcfhd795egfphfzfrmqhp2kof3341a4o0s7jg9pyew7uqxio7xp5hhpgktrb17hr4t2ne2h09wif2jnezwmuen21zaxwmpgkb7xmb1br0pe5qi8dbk0wzgvjbwlwwomzgma7ssq8wnnnfki5v6f9qyt8zsh53pi5u991mc4hfc7a27aleekrhcnidcxmxts6xv4do74gv4tkdngssvlb1pihp97b4motvnievvz47xsqsqnhb030nedbs101vaa8j4kwxz9mik1hxkvy93a4tlsrtux2oksxd5fdvcr6q9nxxb8f8koeq91ug2jb6107av1maapkrynjccjwxwukpw34ssu8gvzrzio6cqapyb0pz7nmoyjqo2cu4cm1df2po31a902xd48xc412gib4rumd14v7t6kfmj1glvvepb2z0xw7o35lwsmzr3eel2qs6f6pnsmv64mb9a4udqmkuc1fvikvo6v',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'nc72k1uolerin2j1pnr9086dzve3xz0160lqznkbqx51oe63mw',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'crejibeonidk32k9mkqo',
                channelHash: 'mve2m4hz7hc2edpol2r163xof3wgamg09bz1r16j',
                channelParty: 'e5lki4e1ze5vnx0o0yo39gkeai5auz7zt7q9si8c2t9kcptcw5kpwl7j8sceanyh4mxu3e8nvwpm1tuj6l8cxl31ak0xub9ltslcnqgaiz6c9djvn7cilu87bvco0iy36d92ebfl83qn5vx9vy06rmuw2rpq7vmf',
                channelComponent: 'gw4ilt3zq8vvsc7y98rc9cdl2nrltqy89r7cn1z6cxwa0idm7xc9dpji3a81b2lkyob5tj2mnhtkimllho11p5975yyjm7zo57z498nkgog7lvmn3528jpue3tjijze3o3u2j73kxki41v5320b6mudp19o28l5l',
                channelName: '8dwk2bf7gcmxss91nob15ter05dngse7b30kqgbkj4zipnchaxphawimwfj6rjbdcrand72vv4o06twceehh0wjaeuaw5zwqtnhx6dkfpag77b0bm54e48obwz2j6avvxpggwskfv7d7xdz9nadpa8ipowyq58uf',
                flowHash: 'c4jl85tqjswwvb6r2oxez3rdmppqqw59t8qjzmn4',
                flowParty: '22szwdh59p8bzj41fz5hx00smwkanbw948q623mowafugkyulca5jp4546ud5tu46poodjuu83siodngpt4io8unv0y3obihlc8ssc5e7k55xxyzajh08emmtijn26e8ugws1ymevrnjpzvkgqlh3oal4mef1ta4',
                flowReceiverParty: 'aes1vwcjen71yrlcgzefbuk11b469xi9an2ay5a3lf6zynf9uwc4buiyrel82361si1dcccc60zu3b8k6tx0dcfztc3s5xf9o117d6o2rt0jz3qgsifp3f28te0zjr2pgxeq0if8hev241869jzts6fjcazwm18k',
                flowComponent: '63nzgvd4ojy5v7hkrhw6bjl42t4iacotr0moeasa1amu4qtd5mtv9bkd7oq9fvn9mffblkf3uaz1smgkusdm1trtzcsvwqhtlpp89u1m237mxmxw85l3xuhii46dhycg9xvjud7mhkl88kt0hpqylst6bwlsmp8a',
                flowReceiverComponent: 'n8rbo0p0o40w8clmh2theu25ohtduhjloskmky01260cvkhupj07oy63c2yitw3enkxiyjostbrw8bb5mmsg21wvksfgajp88pretar2ye2rwvrkv5tytl7ij7rfcrezgk3xsuajrqkcq4rcdr9r92j8fxzvfv0p',
                flowInterfaceName: 'yrppw6q2ozs8ids4ug9fxidk0tazgq6yo44vm62d4hbrzak9xj9gax7m4nvux29eie5gyni0y0mr77p3032n4njxma4tflva2qyczqlkmde4kxi90pe9a67wlj4jao85tux2c8mxx2jsd1lohts4g89ctwod31oh',
                flowInterfaceNamespace: 'akgylmwf2zmxaztqbr2i70ee2o1ixgffrw41z2fen2svqcdv71b8p0ot8dsyvz3idzdtuhh8m16beqowlbndink6pal676ifq8j2w6qb0c0hlny884kbf2379l5n2va2h334bjehrh9bsn4ewzkfqc01gj7nt00h',
                version: 'al6ck9thn65en7v8qz24h',
                parameterGroup: '9nm54jek1yy8zg24apegslpdhbnw2kw5tp7qhswh2qw6i230nhxajsasgpf44o5qylnwpubmziv07io3jut344i824ulw21s94dbcd73b3m8d0bvmyqxt5500ohhrc8ngbxn7subsk0qdy2stpd2yoak6b1i4f3fevrw58zy2nsedtwlxnoxeyt0npl98y78zyd6wqyrbx9qih0edqk4i4x91c3tosyblyv44qfjrfpky1inbqtfrsggws9hvkx',
                name: 'reoyn5qf3q6zy85svq5hqg8y5nwfem5va1av6ntae2b6h7c2stasj9uvocf44ma5aza0zh5pfnfu8rn7huxa1lrflj1oef8vau4m11vhbwckyd1rtyhys4sbcjnsn24yn52lg3jecyawqtxj565qccnvue7cr0t28a8ispqj8v07t63pb2w7w6tjm3jey2696dv7hbh9wocvbw0h1htee321p8djh70w9sdw40p8obbcusmrrvnzt5urtf8k1m8v69y0n2fjzvozufihe5b8ajq4gn1hd6m57xbv3xm15uqwwd1uskuzf352d0eujg3h',
                parameterName: 'xped66eon33kyxui82e4i4tftotno9af8kj6ay6kjkewr80ujmgkzjbbrw3symajr4yl963pv7d8d9vnd2t8dcmmwqx7x5lj1rw53denoam1ddktbatcdag4hmcec9lu8qgkyfyg0hhf64lepby67f3lchmtjk82fx6bvj07wiea97yvur1icwxzbyb020y85yuedxjhosuktdiifrtx6oe5yj5inctqp2sdyyqiqs9pl0dv64k8odfosnfbx7o3moycxylp3r45pkes5v74rnumu0m3fypni08opy5ye508naxmqmfjtoqyxgf02iic',
                parameterValue: 'vw0w84bq3ysr1r25tabfkwnms80vq71j8m27hbfilcycm52thzit536eoreg12hjpkz5850jvcsml0zgk7nx48h1qavj2i25w2jrlvuo8zqdekgkwoxzft2jnv4a6m5p95uppu9031x7fttrttkql0hxr7up9y58shj1ajttl0b9gkeazr4kq3oexo5dfr8kcadzy67osnw30qxdtabbjpg9fjhgiq8ee9x07mjukdfhnrf91f9nkmnjfoaky24yp4elxjilyt91rll7c0l32fdgnflu4wtegwhkkwmuc4z3pzojibx7alma9f4ij4tlwshz40osm8huqw4bf49m33gqk3863slf4agu53ti7a4s3n7elt1g4us7x1ynea2a2zrqtfnpodc1yeo16y6i2sw6or5ty83wyzudl6fazlqbrmvkwpbm0rxv971ha96rfmnqkk3ot0r5vkmkw5oby8lgy1nozmm9vi0mti3pwtad713lejvvkn1z3394bm11jsi9s29si6cn88kijixfcz1rata7kzb78y6noktgt3a67beeyfb7h55dhbhl991lcyr3sak95g8dhdxaz9pr0ykrexlyjqmnsxks7vbdsuydco9cnx3evtqjcur4iadwufoaajbryd4ch1rkpyz1ulogt8thlf1vcrgyel713cfjtwhg5y3aneny2po6poj4wf6wgmqay4v6qo11rg89019g2qvwfli8g2l09t4w4br1pc17cne058mjjcl3d5hu2d5cvm96xd2f205qs8fvv2bht2vn5mjzckbzuqeel9j06333fekm32t86z8j5fuf16xwbuyvfwplykkpftli4l3gfb4q32mvqf6qv205na8qh7s8fdh9vxjz52zrm506cnmo38q966elz8hi6a1gfcciplwhi1g7i4akre0d8n3yi4o4p2yhgqocsj0a5qwrwb6sguwfy59ogams6313vw712z8uwp6kbks1w67zra0ckgf2rtxc7xr7p891b981ucti44ymf6xx2qlee7aiw19sjrfa3u2wxup34nil1jtev4jwaezw36eige7ko3xnvdcvnhoaa3h19q67w64va5fa33mdwe7t2inffvf7i86na5ye81b1cih018o7qbxllasluqgb68jq7guhzx0ljkao5pp7l6y4po1u964w0qk6bzes4wttvx1886dzdk1x3yu98xr0kjy2wwugz7nn5hlqvbsl8be1yfo2ajkputvv9c5c56sk1zx5tpu7u0a5glvozl0aemvrbjy98587xxisxf0mqihpcw99r9ksvtnv8pfy89x562pi4wsvg23zuyeucareqoyxre09xbsfn8es0mw3d6ny2ibzjo8tii8che6mzfy5gnz50ennfrfz4l1odh0gvbumbkccesbs4dw8flm9fp9qze9j17bc6h1i0378z85ss1cf0hz8xs0no4zss7tzhnwlshzqfpjmkw8eoikuxviwjgylivtgzwuzcmnax8tpprrx0lswk5jspahu9ntj9elukb0u035twuu6o3dsuigmg2x26lyzihgngctfm008l5wf3viycld6tem0m9ob5lx09eueqexyslr0tmk44qw4k7ltkwlvf7in19xum5ztarlb8zefp6sl2329mn6gf5yanic5zw2mz3fgz853dvajmubwqqvl3iu6d7hgtf9cea6i3q664ak0axsbhtw3u8lomgrjj0mlloudelszqvwrdnu674gx56fd7vuhlju9lb742di694pq8j9080uk7w0vfkb6zmywntqcarliazcu63q7j5h851ot8pfk8uh5tzi8b6hwcgnqssq9735nb5kq7k093ydijaqtar613nny6567o19b42bgtta9krrxyrg1caos2tzrhbvy1v7ih7kxsvoyhgiw4wx7j4svjwrttprmix5o2obgcx5tvxd2ta7w9dsyttgwh09nuvndurm4lqlkbgc6ansd97eqdgsqlrd8lccq7e7k4zi045o2otngxfxose1a',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'hd843uziw88ymu3087pnpfdj4q0ijks9jvuf7fhukgu54dfeto',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '8zg608kcjqxzbetcgwhi',
                channelHash: 'qdw5oqvwlrk467wgakiln8egaryqm61okqheknpp',
                channelParty: 'ugvrp26hra2hqzidddz2c0p6vk8g8d51jmekb56glazcg495gj2iwtbzzdn0f2okegxfu0tl5qz8pednwf8hwkuopf8vc4et8bey06apnbc7hgcztlfbyf2s4rmp0ybu7l39qjvf1125uz0fodeeyaygircc7086',
                channelComponent: 'o0d1p9g8yshyxhild43zxteky9a9vrng2y7stpfroakd6z110i9o7j9rscfmgsv3ymlyb6qqhbugo8pr8d21d92sz3ap4yysoryxfcfg0dajph34r33nvjou4nozo7i8ul4u22nanm8knuu9hd9hf77fk661sfsb',
                channelName: '689x61qo1tk6w7kbi7pzfa9thfy6jla60nip046uglrix0vgkdlnt9vmjrbqr7k89dnj08d0jx57gosgp8z2g1fpdou1ewzak6hfux9p7pwfavr9pd3zoc7oh3e0idj9fmc54qha39kzrccy7u6tefdx6grfgsep',
                flowHash: 'xjlxit3tb0tteuipjzdz6huhdn7r4vq1anfu4kds',
                flowParty: '77khocv1smronitbx6r5tbyd1nqbf7gi0ek39nwml5fcyn1datyyhwjzg2yu4eprsxjare115uzh78z3clmmaszerx4ro4wjwpdkvfykt1wzysg2fx6bes43xx6fqsesrz8ibsjfk8s6bkuz3q3waj52f7mmtqdw',
                flowReceiverParty: 'ye0uprp0urgzryiscdbcrn87hjoj2nnxfrzylqs7v9avuiifs6jq6mndsjmqgquiw2avrwmbvc466uqeuclop1uishya3xrhd3amyg90vdlwflwhc84ea1r6shaifnpdw6l7h2wj59rtp40qxaad2tc280t1csmx',
                flowComponent: '6ny2rbu2dfsrxsl7uuja8ynpr1dikac37outp66kgok1o7ljl3kodqe9l1wkg7mgopgry58uzf35bs8yfbvswurvjs7bggf5dp12py9ewm13dspv913uvu62cdsmcgfvqz2tgupmm3cifu9cr98tjran089cvz23',
                flowReceiverComponent: 'blzda6hkevo40seqhwd3jumz6ddl4kiauyekr8d74knfgftekrrdty0v7trly6s161obeumcjs41mafr2qchtmr1xrxxpf0z4de6vrlumq7gzfi9jx20tt27ziyxg2yruk4u5zk3vaf0w4z91slmzsks3kheoz5z',
                flowInterfaceName: 'mausjslfw2c60yh46dw5cvlyugq346f75zo0l72jeffgk12umezgvvxsn16z6tdrpdrdeath8384i9u19epl3gv182i5xf8udpyehtu2elipc8njaud7fzn5w8bayd86efjv5p93xjwzkix6e91ext5tcnwi9hem',
                flowInterfaceNamespace: 'ubzipinw263g8sgh11hxp6akmvi1wq9vo1580jjpk1q62eus8dz9zkp0mkg7sq9khcsc0el1g29t3dw0rg987dmmwpitzd8wzyi230peu3c8g6yxb7yq7no3cw76ig9lmmdbdtfu28v35io932p47p4gw7o5f8ti',
                version: '2rcbxo20zd2iortoqsvi',
                parameterGroup: '1op0zawqzn4tevqoutde5bchxz9lh7mdl6hcbnoswqx8yvzz1w0z20js4jkv1qo0dl6ovn3jv5scjc0mx4s2x0xfnn8c6v0oz1594kvus5xxwadojwwk78zncunzh8zi0aoy1km0qgk24yc1mhhq7kvntynzugomkx3s3n1pw8qjmy2y11y9xjbqh0xhq63wi74vtkosrvhcjokm01w72yst8r3y1je12trc63ilfeww9txjaqo6dnq86l2xwz3h',
                name: '8vbpb3rj68m90vs9qd4b45e8l4vqo6i92jceccspp5ostexgfptesx8v1vhhvncneodd6qt26dtraa2xo1gw5dthec4uqtgx2nlkwo1zglq6slwqbfiqljsupeckffl2p3cpmo8mtdsjeh8mmsio4r7ohr1kb46a0ox5tbxvz8g5w7lr3jjs7zcvso9liya7yd0rcxdoqujcaymli89gimtu3en5ksei0cny90ty8aunggybv42oss0d1l7q0sy66p9o8lga2k4ch24o9nrksbgcrpiv31xzmjz4nysi6hq40ch2s99gtkq7k2gbcdaj',
                parameterName: 'n9og54quiuv48tos7cssb9m09mayzzspjvcmma0t3m4okwoouxv3304z4s9hhrzp1mrl222ihik6k9s0fuouw9rfdckrtnbxwhi7vh59d4rjzrxsbft6dweq407r9qvgxd5levxlxt8h3a6obqvz4nclafe7vpmbmeq5j9otfjhm1pznxh67dvo6bt3fgh696qchaorbbjngoa77591rxvcz2oozhmzy6vyg0gjkljej42sxt5iv2rmqtwryt0f1xrlp5pr0actbklah1pdgz8ju6qj3ofix7tkb7b9igvtj2u1k38yyfbaqdks70nt1',
                parameterValue: 'vrttghz7ub63h0wl4caelbkwxuxyep4kicl8iv695vht35fwxjxt50z6ls57renjakk5tji0ufgpaz48o5pcd4qg28rxtt54oj1kljp4pfpici25bklhzu3m4x4ihrp0183rp41t064tnh3fsj3xp6hupmysbng0wga1e5tnmslc4caq45axck2wxjsumq1f3m2qszer8wktl3utptoweeefwv9599lddvwg42kkh6tl5i6pzpzkokbco8jcp3yon76f93sjqnclsk5e27x5anllpieuvz7jkbezl0ozdyxrxz1vbgnzxxymfhxtzx2mkqrlywiv8rr44eudcunhn4m6a1boyhbe05kupcewqhasajfzwjafjt6doul8n0dhda2h7t22vzgtke8w163t4y19aomvs00a4aagsisihj8t0y45j6pdp2qi5n6mz5mp6jccmulxras3dx6as6vzfily87blk4egvwxxwojxm4v9tgw3dekon5t0g0mrq6ka9c728okygkxj022y61uhoect1bmb3zkx8nvacv73g832yfz5dkj9te3kdxduhuao65oot82d770r119lna1nmqht33wzy6cduhoapoqrqhfgjjdlyxu1reahs3ozrqyvbth6si22hlu4s0a21324zaeblal7c0ukgbzj9q5mbgva55sdeuip6e6qeq6rznr6u7leylmlmvzfdj1trxlit33ku4ex1m8qpzki9pvktjwdxj62mqq82oxktgpfgxrogs5d2gwuj9xu9u29te44g6pu79f6w0uc0j8fpf1osj8j2lucu3ch2z4rwjjrc86a9iognd1e6sc4rlqea1s4v19zi7wru4gyn5wkj2gqz9fx9y2pms2my05evfxuaenrfq4fo8l6p8sdvb6gelvny74vydncc4epqwpwv8jppf9itlklxtle9i4mi4pqlllkrdz2xcn3mmshnfhla4gkr5ico77yaoc6t6uapc6nf7nu4g94ov5apmqjgxxlosyc4ioogh2qwc2gn81qcwgqiplaaopq23llxfcwkkjbglmt6yw5vdbqiydet0fd1dw1zoneg0cdos5cfe3tvyv6h65anudbudhftmcvibvxz3pl8c3qte9etqvv7x486zf2lvxdyzbkpdidm223xahaairck6exr2xizezqgecv95o692r3qxucro0vype910a9uxoqjtl42gzdcj4x756clakwti99j4s62epfs03pxpc5kbazk9pgcda3updj2uv1l72ssb2emymwv2wpxb2rno0pn6xi7jasz9ldruwz0ki4wzvep81e8whui31xd22f9pmpvww82978m11aa6kpi6etllj6kv5aanb8ljry7lghdzvdl7iuavpl5lhll9dqmamy8jubpa5gs3i53kudacvyn4nc6hjvmy2fgzoxhic0tjrwfin3cl0q6d1vsphpov40tl965wzs3r2gseahf6rtf2dfiw5xwwqk3m0ua70rcvyki95r9vhbapx8g6t38th7aiecds7wt05w42w0ypnsvzo1o9zk3bbsa0xa8lx6t1cbone1928c4t775p5gpj58421sjz4ww7oo1uq1ybbma73mrf7qaqezhoy4hj4zxepsefzfggg7iopmvp2w5pw1yg4s8bzr2v6cmf5bp6venfyckwtarnxtg5dfq19qw4hdts35ifpdqa6ildzdepq48o7kmvzf4kjmlpviyg2bbytacs91nkmuxjgobvgikcb1m98jn5t5jbpy4dh8q3thtokqdds7gydhubszna4jxqs33u86j38nccc5lijgzwfkjdb3jybs0r2f1cmnocx2m7ihpabhlzlp8xvscj39ebtu3gxue2o8x0jnd0eagsmq1oizs7xuuqlkch3p1imtvbhtk1mdoxj6pm9td5upfaw5l8wn1nlwzz5sj3lydqw57j4qwkxryjenrtmbq8t36kewhasz4zq2wmvlih6ltqu94wmhil2j445kcvsdpmpnmnqgqzrza9zkzulo',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'yctyqpu9tmpkzwu023d7zo22ou58n0aap430nguwqiu21ky7nu',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '0arcz6iiy0kdjihe4sfx',
                channelHash: 'x489n9sdtdmhpx0z3cag0hmuxnjvffbw7wpj71m7',
                channelParty: 'bq9u0vxtah38d1czybru47vr72zncb3clxfkdva0aqrj4iu0ldjmquw6u29yqasxvgiucecxwwr0vxlr3me8ojowr2d5i7t8zcbc7pac22r6v9713en7ofwthbs4a87657cg8qcj2ptln9yueamejg391staqcd9',
                channelComponent: 'x5ronu4gh6r1b1ldk0tdf4uijb35yuxmtqoowcjdw067dcirbk59plxmzi3ifmu6quq4g7b2tuit2ne8bw09mw45sel95lcpbq8pemdq6i9t1u73iuhq5nrdtnxrq3awf0xdsi4tb16yl5nbkp5p3noxjaiszz5i',
                channelName: 'x4x96q7fll50gib36biwambp2t473ol3ml67tlu8osoz2qyznx6g37rp78mth0auqxzusqz4z730p8bw82c1q47o88vx2wzs2k4me87z0wocgs6lravykmx8cp8cwkfm5ngax7bpic01g2w6vag87c7ml7oorw63',
                flowHash: '27mfyeutcsfkj5cozrluinnz5j1bkh6g3xw5eca5',
                flowParty: 'iafoagssv68e67p9mrqxgvpkpc9ph9c9xvhjzhg4jzv1cqfyzslrkbwg1vo12i9szf1ar2zc2pe43soedvgvh114ha2240fxnag7wltsttqsaefnrqf9rwls7iv0vprzbbla13adrht4ivj59093ynyb75vq6tum',
                flowReceiverParty: '4fbcfnocihpz6s6gk2tmvhi4gqy3y5y4t0rfqa2lvu9uvqm1xr6wq6niw1k844xw1u7mm7curzrasdrd31bujmoiaip25z1crfpvozyg5wyt5ugsi92z12l28xg388x12alqlzz3vipqqq4vhhtci3izzv8mjl5u',
                flowComponent: 'p4r70pwjerhj6vh7rphxz8u4gd2ouj5gm78zh0wlip8vzqy9eh9ebf550pkmyri77ccy0r38hdp1ucmc7c5po034fblqfgaido6ilctukyxf65o3c0jjefhx007wvjcmutocwd9wwpoz6y5d5nykl37nie78rfo4',
                flowReceiverComponent: 'y8z3lipet3kmm1lalif68mli08qqkv9oik0gmfp0bgb6qztg2qs5hgj4jjnfjiubw03d8b7yoat8u7pfw7bcrnycx3r2casfv8ln8r0dk4c44t7ssc8um5e19y7wp0nmvyem25nxrjd62sd0cqv8twaczccbcdp4',
                flowInterfaceName: 'g9oy4u2wk9awsu026bnkkcy1lxrk8qkoyagyzn41yzg7o54k5t2jpc8z0woby9qb7qckmrusnmrpt8xoey4bcphghw09e1qodux4kz4v12ea59z8p0acyqem31d5vw4jem74oc75chrrv95f21q81kcwfvj0r5mu',
                flowInterfaceNamespace: '346o1irpzwn8rjmrhiui8xfjsr7c6dezm36nwud48buncmeqqhui4aowu4xtodbzjjd1i4dsvc364vin6g0eni0aff179lhtlyogu37k19lkmbshwrd343h1iwzquzdxc2ksp061du17gw0pxd5w4tbxcgfgj0fo',
                version: 'wfrk0s113c69yb12c7jp',
                parameterGroup: 'bt2fq3q3rtlh31572kn8kd9ucld383cvhdobjmu7pc1lro3wo1hv9i2mkjc4rgjtaenlsre8mfv0u4p5yltph6tntorgavnqc3gfl8522hlk8pjqu3nf2go4vi9tkzkbw65f4dxkkhkxk4n3qvgarah4by0kpgnhkr45zp7e24a96gxz88q7u8vyizh7f21jz9qn5sec9h6vwnlvyix997kk9b6gx7k4g1gm9nlqeubl293mlc0vt8drse0oijt',
                name: 'tnckg6rm3pygpq9k9zvwk8rrsdvmpy57tedu5avvsqbab9k0a3961ljomfg487mgwput278k9kzfbuwctqgbhds32jt2jmbxqdgn4vh9f84h5ijb4h46w9p7cg1fg2hxgt5s10cegu95d2fbavn9okrvu3n6ewok1odhbzikk22xl6g2ehnv57cyxdkj9nrnr7a1wzd6wg188ay2ej0e4cu0oec2gx6iop2g5j2sjkvi99hsasnrizaioogji410bt9yn40rwdhzp46l77wq2wr3tpfmvhvrsom6zfh4n7yst524dgq3awp0ldyakg9k4',
                parameterName: 'tl4nd26n71j7zfqrf8kf7g0n9vsrhsjje4lplf2628ghfj20tosahd9ckq4det2o9wqn98ey5h3bp9socl13bvkpz0afokh0rechkngz069o3q7xa8c5q5dwgrmi8866r0xjhxflcwtl2iqicqbi1wcuy9gtz3fxx223utehatnjhr8whj0y2qhh1e4te44zl943vb7wwvwp4uqkf2iy8qgiqtckzkes0c7qglla67w1gtc5i7j7myx4d97q7eglbyuh2j50ixjkm19dcdhyit4ojet1wlc9n8mdw050cve3f7wge97px655h4uz4nmv',
                parameterValue: 'b1padfaddfhrhgmzr0xe5qyhcvbzhkmseh5tyts33ukwwnx0ufu2h93b5pubhywqb5ciuhjbef4khepke6acqun33wz4292bq96kvil5kysm1eqhmoulqkxrrlqe9c8s3serotz4ltfkmi62q710ktrmsztmgr8b7ice3t3dh6o8rld589ddfm7golj0ozww11z7q3x9dycs3i1ykap3vzz9uzcnna3rcqfb0xrenqzrnzl2uwto0hxkx0aucdfu01dblpkix26kgkvlns7243myv13176nvvxynv8jh39vphvzt2kkfz1njskeyvl5salarnsa4ckrhr6mgsoimc4rncwj95cg2m7aakuj4kqrzl6cnf078yencjaji9ihf4316e0k1jl8o997e8vpo9sb2qrmqg8k8grum66wkjd433f7baw586i7oye9nilixiasoibjm1sjn8wgupk7th8rlebxpr0qbzoc40qq5hersi6qr09wbhhmlpqk22xd4v88r156e371xez13xyou9pleu2nkyjs4p420lphw9wj322k3d14bwez9uhphx0s2857zwiebn4x9gndonknviaxlrmt8bbtrn5u2yhua7gsqfianfi0i7g9d2cm797z9pbk6nwk2u0o88v86phxspeuhqt67dhxwpj4yptjstyx8l9b44ch0t3mn543hil3bd090offimuvf3d0ihpyzjf60i9gki94hwx3rf833njjrl1gpb6u6wx63vhqm1kmfs1g2tfqpy6w6wzb9yt0xoh8jtfe4efuzhy0on1eyj39fl94camtklxx2b7kq1b8c3sgiji5bzqj63s5oqulgjxxj9zv8i6xmui6uf2tbzc5m9oc6fxsntijg6igngp670gp2wt9lf8aq91p35ssl05ukdg9nrcwha7otd9geprgrjc27izki5tudrk8lih07q8h6p3buuz7fmbyebasshtc0kunvn595gh2hs3db0ve5z9zazxenct318fhbo8zs40tdr5ewj28ji4sznyiz4rcjelhbioxyrwpxpkhmejq4eg7v42bnpln24dab5sb65kazdg6ntkq0bar0yilar71unyejroaubeiz5v47d0k8ou8gvdxzeyfjdswl9km0xc8q1i0kus0ibeq5r1domorbknkc652ai267ip9ixc58lox4l2ii5vq89yvb95rsf7qhdt63th8rltp2lhiopteanm8fu5294try18l9cpcr3px5mhmkyn66y237ivk0mqwo3mbssm8d8lx0b1on0aiuq0vgqzn4muayhn1lgi7s3qrbrr1lw7dece4q0k52skqol0xatpehpauje1eyvrgqeaminhbydnxbxqoak5qzut1xvxv1rww6jvbn6uyoujlhik7juhxay1d64rowyvly90fvqnay4r6afwv6oo1ocdkfdcwdbwsomzvinyvf2em6d79tdhuw35wswhklkv8m0l1nz0ciin3l8lq2pyk9s9qmr70u4igvr1mu311vi8qgfoifcl7miyslw3fr8o7jinj1j1ptezws0lrhavidph9w3wbs95b6h47ex9zzvrkbjkottdvi6l4ha51pv6cfrwr8pjoakofc6ga5hwxwvazhpy7c8li42mrfq3g0wz6oo7tgecamr7o4fb8d5xryamjrnmgdis3m4kov2zhnytoe7ruueyrlq67abyiyexuzle1dwmle7mjlf8vht37ep72mpjua6kv0m9b1ergpolr2bt9s2497lm76idkk1ea3rvhbu9kuxmy9ia123wba06zary7wpp5jlb3jtk2euw3mkcqiaah8vsjwbj8xuza87x6nw6k0xc3ta5kt41fef0sb4rugetic7ft74rtypmdgp9q63ckocwbqho0i8h6g6kqclk7k90qeejv1pkr9fau7lf2xz84ortv7ujq6yuuc78ie5e5sficp4tit1cfmuwqzwrgalabs2dcyki3jxiq816jhi7vt867eoa683utbo2mqsqtgd68d6vcn',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'n81bm9n29s3rs1glg8j8vkgurkz2u64611fsn0oucj1yl38ck5',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '4x43pa3eznufarx4ndle',
                channelHash: 'jpm6356x9z0wl189p1hl6p4xghhftrxsfqxi4wr1',
                channelParty: 'bfhpff9zd1vsgchp5mhha6a3zp2nm3llntxpt2006tcj3ww2h8zpilt6je9j6jgpersszwkt9pd9xgp5i55bnzv8508fkxbfqyuusjcbpuoti335kz3h44aapeipeujl68t66p2x4826osqvvfnll888fry2y4lm',
                channelComponent: 'virn3lwwnjy0dbdjyig0thcxmp9s8ieaqyf53mcjmcla707afmejmnlvdfioa0bjufg5de9z1c9qnv80h6ibzqb0u6vkkkwsivfjnzvp0opmp4urfagvwg1zqr01pb2z86ksi1rg6lmmu6xu2vm314xt5sejl0jx',
                channelName: '7mcjkt3tws474z8iuajbin7fiz8xky3m09tqxcfcb4ghcnffwllbvv9fa5hn2cxh4b2bzvk2mng0dpv0bbtnrpq34phsqnxvye7z0di2ptgu8mb1w0hqwzaj4ysmh3doevi15zcbgf1kuq4u3myfjs968vpg7yqo',
                flowHash: '5kdo1lzxudhb6yuw90aodza8wv986cjzy7nj4ql9',
                flowParty: 'rxq36jloysss2uugor91s3r9f9z1tb6a5txcfw6p2xy6ixlt2hgyfiyywvg74nuj5lcy09t2azgsmlq9dksmvy0686oztbzbifgud66xvlv9p9u9x5j01sy3j4bslg0qpopvp9hmvqdx0h68khr17g9oakc4mpv4',
                flowReceiverParty: '224etbtz9k71yt8573e8o0tzanhl44ux30khcpmrnuvnaycls9il3uvgz9qp878urhydv5j03msnu2sb40hgses0hu7p5s2p6r9r8xu1c1hhmhe31dnxqhwwj9gax627l941ud7pp42j6jrju7ez7u31dj28b0s6',
                flowComponent: 'j8a645knuqycriaymmrnhl4ju5v1gih8kz9qiywszz453i4xyiofy3gv6h1elvoivwj0mlf8igu10vaq0ig566bm9qucig0949wdo3nixz6p8keyxvomdh94r8sivmve62alb92dmgreduxy4f42eyovrow1mwqh',
                flowReceiverComponent: '96q2fqd4z679cauw6he9ddxqdhpfobzww9h4kjr6z8iqj19pvdwb9o1hu238ev25j0xm332ocf8pkextovgiqh00peippt5r52q8vyxs7giof21vr4pz4i17utf2r8oswk714chemas1627794o9hlhyk2ybx3l9',
                flowInterfaceName: '9qnuo66tiint7u61lb3qm7lpfxxufxor4ai0szjxltv11w2jjwexuc0lgklb12rbd3tzcrk1bz6ujrh4qkkxjjbtlq1y34u056mtoz4846v19va9sc0w80oprwsfpupvhaf74vjhpfvx2a9ejym987yn7tho1wqv',
                flowInterfaceNamespace: '37s7q1f6knqjhfnw4xoah9tan6h2qgnghnq4sme75dl91ejnruue9r1a4lpmosrass0hxsn5p5bqdzf15uowbuz8fjwhxayppqzm2r2g89mcyniki68a1e7ja3o3m9sqigc862sy30ro5alf48lvzn0r9kpu39ev',
                version: 'ihu4202m246nj5e1nw11',
                parameterGroup: 'offvtoywbkzvtbpr4ukrmhzsdtgmnhy7vj6ydrj8g6j78m2fyl9147cjrgw93ec6umjkfycwobdejkvxll2qf28cgs42a5jvq1ub96egmx3cpatof6s4p5cdr9otuncc6a0cl5rk0yvw50y4fih5dhsbo31qwg9mwcdhtdxoe22skte1tr8l4hm7rx3fx4zs79m6e396cntpjmxcywp8f4p9x9n994l1itqocd4cwjz0oe8heya6nb57aac3q7a',
                name: 'x2cil7zic6r4w5z2iru10kbl2ls1ngxhi6cyb0ebofy2g5f7cj557u1nd1cgq8ebe31x7zyyxhqnqx9qrsqryiozolq2njhp4ph14xwqwxacwo85w0xn7lbdwfvq1l5eidt2kgp6ov8zd3z7z9u0ncsgtt9p8y5twoocawnj3bie7cr6w5lgs5cvvujmwdymst2pl4h3f482ehbf1x8vrtls40k1ab1z3iazar8fjlr7hmwtspk0ol5wnl87p2mkjzpiurtqvpqonzcmeg6p6uro0v5agm8069jspocitaga7konqxmnqmarc4crb152',
                parameterName: 'dnrp2gyu54glbotd3i635qsvzhesl63v3bwlxy59l5xtmo8czxiys3utpqac7kbnzgu8hqabchb8jpi1zvnbsujzj417ev97t9dvodny0ex2bhri48j3gio4rxdyvz6bq7axpdoxbppnnoca5eycgkkqskm385o3rlb8gkphh3zicnudxxhaggkj8n4wvozrve07gyz2ea1r7x25xh8o29ogwyzpxzzdlj44gl7akxx5b4wn9fiyhjy8b7geuwrczhunzywy6z215k9e82025engntvd5w61l1arjaf69ocn88km9gc2sv5112y8egqcf',
                parameterValue: '9d75rsg6cogvsnyf9qiikdkjjv2i01hjf90njetbsanh7suqo0ig72wbjiknq2orwbbuzg2xjlo79axzdn043evvfnx3yub0fhkhtiadywseml6lp7h5du43q2d5apz3zhp31xu4y3xp2pe0zjr7lgng40btdf7varb2uglmjv3tp88tr1c5vcip6vfl6k2jr4hm5frwewqthxd7xivf1hs7sro3ft3qotpvxgj3byfsbjpfl8xw0w1gm7hpgwl8etamv98nstppmreheb36ufsyc29n05yqe5r6lvzjwspq164xiohobiecdqro61g1f4mta27t1kofhj5wit762q2hm82ui751sgzsaa7ubu9m96n3vqcr9374l518tdueyny3740nl16ll140kqymt96dte8bb05ct1tcx4n21up3pgoyceayr1r61t3l0r3ovpi99fj4vb8lh0jvqnsdqouhu30j7v5aye84qh3lxsff4z7ms3gjxqzlopv2zbnq625jfj0ca1059jv8rpvj0l4vrdrvah5hqj8wqwjgffmswfrmr7hnmwktcnmrrtb3rihgk5ml4eel2rkj3m92z72v8lmrca718uzey1poby6cw6azcwibjz7n722mqqwdvepyc921j91zhiqfgb54hzzlk4z60xpv61f1nqf49vhdboo9s1s9nototoqx8rt1x7ydgkim2f8drolrk8z7jretp52cpyf6556ud7imoingy2o01hy4nwlty0l0gj7svkuvt1xs2mwinmfielmwlmsghwxrovsnvjmpiy8qzja5amdtwn38dowdlk2iccuugni2hfks105fd29ppb09o6cwz62eyz5xh5dgzun31mexan11r3qevlcetu887x2vqigvzin4lmbg5ubo2u1mc0jldl5rl5fa2ekxa5ja31wrce1vlyze1xg83e3z5dny5ezgpaf7giqmgri15bf5zanu1xs386elsgv522xzvtr2q3roo5bnzis2fsv7sov525ra0z2t5srqwjeuqz93zsv1p11qbnp6l8fps2frtoyf4sdzfts0hdp2b7a6vookgcqk7sy11ku8coi2q3rqd7jz9kdmhtm6m7ieemmi3tbbjtq08mcp39bfkloncxl6l2u03mrv98v6kbpu72sno3vohvlf1jwt4d2dlq1aw07uk7bdh6g1z4jxc7zmkafx1pfvns7661stlxe5ypqjrdmug1xeabqsoq1qjebge5qb6nl2a8hq8c273drk3nieayzxdlrg9dzaifl52v378m4io8n0izy15ph4z98lfiemskhlxds8rjnqjbg4pi524pu2oe5fyxxeahw0apcrvlbim9d3r55e2hrt9u5luujcglmjjfi5uhjkosp0dzim8k5wm3jyqiyapc6zb2l955fafr8qxmqxtvqabfralsigxyvi8p9h24ohx3qpv1hdjh5vchtwl8zkvv7cyqpddnix38lb33pyidh1siu1alc3e7dwajhqlwf1oti32o8ao78iwpw507mckjzqks23mpp0so7nc933kmomnnkyyi9yro9vikaua7frc4jlmgap8kigjxwxxpq4yzg6telfde5f9z30pee40yljavck89ytt4cnmv2gwww6y7jy5dmvh21kdbv3v4js65w524kcwotyyg021tvsmopxwddi1rz57rgeswejd5zvwexe766958wiqmtr909agwwkbl7kxi7uhmszhcji0gsu82ihphuodxnfvlwqsa8xln8lnv291h3u6t97j96hajwd2ihjcqqtq8g99ck3ri346843xp3uli6gjx7qkkzh3wz8ocnb8ju79qjjcbcnb5upagoh8eylgesq0o4l8iw3lnxg2nhk8na3v49zyi3duno56zb5qosr8nths9ppzn8755uizxkqj9snlgy91nb2sukjf43ulifqqw5v8eixjt9y0tpvqctmv79p2usvf62nkmyn795wjcznnjdu4vhwf5d539rbo4rm130vu5ownc0590x6',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: '1mkbwl958kc2wv7eg7or3zeywnndju2omdfee1b695xvtenu22',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'xuzc08moxr4nokldiltg',
                channelHash: 'sq1nnuhnmczv08b63xfjkr95zfewepqpp9rxrlvt',
                channelParty: 'lmkbbwg31krsjvn6jw9ntlbs1ho7dndaro5dsy13b9wox9cdenvg8wxuustwa6v7xd85losim6nocirgtrwspe1xg4f4gjaoio8bmyq7q8k51uau4a7xst2aadev7p404m8z9dtw7u3qa2srq0oqmc1k6hgji190',
                channelComponent: 'ndeg4g7ygmxhrp6hn6htcax8dgligpa6dbbl8a2dgy7nmnfuprfnob1t8tsjwt2wns1ba3sfblb7larla6o4xu3ll48q31wzah4uerd84u1vctr2g1nnvnfmt869mkybd3dvvkvndrfwl315gf9n617s6iwttt3i',
                channelName: 'avdzhbewdr9076n6jnuhithm93oyat08qig0pmd8pndb9bm9truifc2lrd0km2dki672b7z6shgu2gkb9bvzuydl4q0dyzy0b7ih5ekzyu3emix9s7iubwvp9z44ydwnx1tsv5h4tbzc6eg00sxycwcmqbgvt6o8',
                flowHash: '847egmxoo0yrt7k9tsql3gfph198x55ei9cskcwf',
                flowParty: 't30doo6uq2t6iwwjxd3ocovb2nl8l47saiwcqp6z9473av3y7spvh1gtb6fa0h5j52iymf9kxdmeu89639oej3fxnxsy97mx1rjs0t6baqkdacr7oywfw3nor646bhrbc241lfn4cuyln596k978ju9dl2ugrxuy',
                flowReceiverParty: 'hd6gmo9nohtiegcuzklb4nw2ov9d1rh8x09hrl5p7ni9r9q5yt0p67261x8t4xju5m1648escoyqgvylzeu6ohrqqexwb70t9f2gzb1uoql7q8raup20bca4m8qthoqexe68c3puaes4swg9kst78r9z7d80xii8',
                flowComponent: '6ybliqa6dbdk8s72cm98dozg03wt03lufi48v0hwnb2gwhlrcgm9osrre0pf2xxs270x5fy1i8iykh1rinkvpk0koeenqscso9yasekpnc9iysfex4wyydukv2znqg28olz0jjkrjh5juzwry6pn6qlnvm70rmwu',
                flowReceiverComponent: 'my92i1hjaolj97p5f51mpq0l86xgyxvdvgu3lm2tow57xvo59kjjywtovtexnddrt7jr1yhbv0jmoplai6gq9urox4p2zmgb1p7yblqnzjxrjf2ot8p7tgtke3huzgs5e3gxek643zh8emn09w4h1jfq3d7nze7e',
                flowInterfaceName: 'z1ywhhoqb137x2mv04cfodizqq30s1ydeg6c9ke8i5ujfvjzak9jw9rrm11xxxdj8syb0v9dfhxy5dm2gqx5w9ecryqfscy37fcjjf1eeuskojc3jv27z44duhwa9auoevxqn3zenl4fljjhew7jgg0x4i0cmwxu',
                flowInterfaceNamespace: '6ca9zscbnva99dw64bpmfwuagv6p5cjnt8k7hl5pt3rh4vswi7jgrm0wrhtx67fuw2axwykdtzzydq93axihjz95xkp05t5nw2k205bj6qgeinuoarjbzkr6d5fljioyzsdh2d0rnp9ec7u80e98vjhrgkap7a3l',
                version: 'h95vn0s2cc5ble65wpol',
                parameterGroup: '1zeqe34ylcky6a9cp1vjnnnxt3r2hltmdqn24p1r3tck22hdzgm6nfxjux94idlo9281vgi6vv34w9vcvem8bxecdk57rfqf0a2gmknwnxzf3l90xxxjjrnwre31nsy8bsiwb24nmommtkx8buusioe9h36u2cvt4bek9nyg02y7c5zkri49qfy1s6vsqslew9xo69kedabd6x0f8l66ob8qs8z6yrjewne8s4b15xddb4wknrc1obzj6kzegcq',
                name: 'mbto05e1yx01azs221pe7u5dnnacodrtypki0pfjah3r1xe4u4msjudos8jn24rm3vad1wcn8of34dmvk2u3m718quk4s7y6w6szro1ymixq6rc9tg469gly4c5zbqqas6w43yoffm165f3j3ridnx31agi46ine4y1v19xb14pzv13l0522asflxf9wdj73axe0xcuc7ju3hznl1myh5d9ti1akkn3we4n2ljngu3chf9fjtug9sb9u1txhac2jumecisilfbzmzg1qb24d4vuyfipcfisldi0x9xfderb2cm1pg3ejujbnr5y3k40i',
                parameterName: 'yytby0p5pljya99lfz5zqlkyu83jbqy6p8kyobw6hhho14ynstngwl3l6120uf4esu1ls3x39h1w14rthzi4xxvrly7j890xv0maqic4ersrniiov1fqb07t6cdppjsbsi3srbtphrwyfwft7ub4s5926i6wao91ba9j8yhe4iv0eubphg4bep4d7q9jwmypiifpq5t7by50ra95b4mfqosmt70q6oor2g9rvw4l0exexeokin6lbmcivv69rqjp90eexgmzuoytctl7rethrxd5vl5plfpbzi1v2d64rryp2usrgwx9kroincekmc2c',
                parameterValue: 't7o2kyih8iiecpzs2883ql0hzbz30jgp8vkitw7ai9yqdjgtdat9mxox6pj8fh0z8v5jc6yq0e5agnsfbbxko3wnn588sv4q7r8ear7buw9a3ery713h2il0257esephea2doi4yaa41t9pcvuujx0zyvu9libqqyuzdtws8lf57udnedciongxkmmtzk6gmwahxk0ao5obrcd4ov7y4ml1xbd8t83bqcqpbh0sbj7h4zt174rox37jsjdafhgte2irjfcf5ixfwg7cmut16k62ldx27llx3n0xfbinmcqxfxgs7omgv9qz3ewv1nfbwghlpq5bhhhkvfc45hm83h0lecgk3ggwe6gjbnicazzdl7wzbjbmyr7wy6r41qafi776jjld199dp1w6eiwn4ag3vpndalfnbp5rgxqzckmoih9c54kv4d1c1eeyk4lzzj4fksh0io7da2240sv81oktpo8y3v4mo8yjx00uz3ln56veuw4uydtqyirw5z8j51hk2t8fkhpibhtvsb1nuy96ezsyjcdhgkg5e75313jobs0whwyrb2hua9cigmpnrx729blovzth4y8vvwj8kb5fdz5m8j69ua92p8j5cikin634yzju20dsdfm5o21bg5vu0gyf4wlb9dqnh6uvzzja4sigurc7vx9id7x622adw1izs127pqkplazu9l74ye1pguhgurana238jes8qpeq5by7cwkc61blm55a7gazzkdguf8puogral02376pq6yw9j6ehc0ssr0e91e36izc2xg39c1u1k7ndxtl64xabv2f4l7w10knolbvtmikx67kgc24p2mm7fx6a4tje4vesqdri68kzfjp5i4e7r6p7ltg6qabqq39zuddm6o3t43awg9d870pgrg3yddjkk54lel4o3wtnotlgqkpb0gp0nxxucauckhow0k2hto40yeikc5qaboicxfqlr20otmnlek1ex9cgibg3o1mjc07vm7ejw0190wrswvy2e73zb1s4jxkfghlcz855qf5q0p040v8sqgelz6lu98xt2blfov0f8k8ux9cyt87q5qlip6tw672irbvqz8mqv1w9eyickn876erqtar5bn7mxkotgemkahrgldde3gdwwku4ml2t94l3yndmx8kt990i7iksn0umj2sfflkoqos4ukvx4f8rvicqfkpg937qqb90gmvuggtxjq5q8n6zlske1cntbkr5g0tsufu8m8j81z8q1i1itl3f1twhnmaao8fd4bl897qrvd1o1azofloebcxe4hhta0owakockef1850y6inxes2p4541mk9zmpdgky5jjnzntymn2juh4hjah80ilo0y377hi3qwppds72geps89ea71tkpsbbxbw6av9xtdevgj4722ys7iryysydalqdr4j0bjroy4xca91q4lv6r1k00g4aiq2dun5p5cq5geoklrc344cuwdl77s9uhhtgpeqcisz27q5ztibbl8sl1s08naf1rd54gmhxm2rjqyl7rrs3prsbpqvv17t1gms9mi7f5unhueqgqfq2nylrhkh2i83r5ypre5rlbig68fadatucyummf2gedtcn2waalftmliwql1xyftkngoj8o18htkru5zcyzpulsx6cb6if9q705jcupj6rd4abw23aq1zdd1y8ndfwrh14jw5ddyn0zxza6g01mmsqio9kqufy27o7z2kf0syqugg7pfg37recm95fkksoom7k28u0t41c9ebbyrnxdzmzfhti8ch0dogz9axdto7nw00845ye671l99q6gj02b6qcgai0ogumq2pby7ta76cw5k79s1q3vhsirs3onxo1o6fm0e4e7r7ditfoeh6i9n5vym3yrh4w3amw83pwe8ix1bspwoxnyt66ktc8evh80ysdp78wdig5n9ytl8fin6mo8a7z708lvu6ukl4jh95qfwohxga5ehes8rj55dvkujopgxv0vacvfeoktt0ia9eoij56u1643x86b4ftetmyxpy',
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
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'ssr6ipqa84h7jrebcib8je6hrdmo1u4wr8mono1b741jgbfr3o',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: '066pgv7028rlji8h55i0',
                channelHash: 'yayqjy6n8mc23zi89i5sipvvyt1kyeh7tbakc77y',
                channelParty: 'hno0i22h9yf0qc302iwlntxk6rx78cqs4ydebphxbydfgoap80u9kll3vv3l6wo7amuh1d12zw1ag52fmcw9of9cqzmbbje2suo30fei6y7twqvq2fatbpe45c59i6zobc71sl47qj3tzrrg481b4alkhsdjhp5d',
                channelComponent: 'nmsmc81cc51eempyl6gvro9hjvgsfs2m1h0zjh3el291yl5bzk0wsqrz7dsfnjsihbgga3vmhd8p79jlner5wywh7xmrgisx4p282xfilgih6rp79h6g1g2qniegc9psxrwbfp1zyil0cehwc0w3x6kvxx6aqky5',
                channelName: 'qy46b24gu0iww2iprqbu14ibnwg5w0ul8nlbp1ea27t0an0ib2vzv55xwcb8lg19lkg24c311iitcwr6103tli2xvvzm7ee95unswgh6rw7i8h27xy3b20x4c71yy5eaj5hjxevv1ovls1stcjslu3vanoe7288d',
                flowHash: 'rc3plw9ibokx1qzb84n0pf47z528wf7q7eaqpqsi',
                flowParty: 'sikcfojubdls9o2t686hvnncic24am3c315ec0v4iivzzhozu61gbjq9fjo5leq3310d3q6m11eaq9mq3fwnhm5q9r0pzbi6iqluyozpzhe43f7c4fctht2pklj9icp4xs9jrd0obxskd8nrvo3fz5wl4e2cb5i7',
                flowReceiverParty: 'xu6lnk6axnm2b092dz94js2q76extlccn06uvuz4e12hmymuvp55uuw11dadrotwjb6cgeq5xir1leqzzianvg7ab39ttn8x12tkg1r7gp9i4kc2j5erj2svmiyb9pvvmhk7c4upz0n1bhe974dwialtqk3nuoo3',
                flowComponent: 'oyko0waymnwyo2niiyb0rgwwwtkjbwsusuaq7g6hpsiojbyz68ugr2f29len3a7qa3ubpn2rur3fj2vzydgoc8zbv70p0ad2gy6nwtoi4efiug7kyr46805grvka7om3lgskj8kwciz4ghz27duj1q9705sayb5v',
                flowReceiverComponent: 'gn9q93hc9vhdjv0bo59ahvd6cwx9y6kbt0863x7oc84lsrcejc9ok1z8tvbu4n7bhyzd52p9j7ip03dqyhd5mcfjz09majqs9vhlt94z17smqidix8eg9gha0ail5b7gya34v7kr9zmys85q7s9j6tzb3d0gh7s2',
                flowInterfaceName: 't7hwmcbindhbia24zlqs81nnanmuaz8aojqevm6o6334mvr9pvqst6knb80kekc8fncku3mzgzu85yg29zvzfxyweotfkouly1piko8l3ek1h2ebg0a2xs9cz8i1mp4o6yi9dvgaqdu64xmw5yzmyz8lory0vk1h',
                flowInterfaceNamespace: 'n4if41fe57fpfcelkpdlgvq0khe8qjxzuivyi37vw9sgf42xzcm9nxxoymv39l0lss0yyujm97aazzrfcd59dokjsvc7cynrzw0g04lr6xn3j6zxk2pdy77j92gzak9zqs18374btsyye4c5di7mc29ull7xzc4n',
                version: 'phnhs4t4f5hitg0j7tw5',
                parameterGroup: '6atesj3qy498ms4rzhot9768wdp97uejsa2ps40e8makktpflr6a3mndgqntolb87c5jdjw5ozrknka080yctl59dssc42eioxl47pccpjc1rrr7z0agdn2eg37nxqj8rr18wjvi66adh5k2dd81lbpnshcxat0roivw372z12p1ssma5xj67g0w8q6qzrrr3y145agxq5ql0ztga9fa74umso3kriqmkelxtz1qdmyv9afuns8cly37lq0uybf',
                name: '317elm7io9bd1nf6cjmf7vbt6kun65tmyd990km3oyre1m2d1v1mbg2yth86ca7048j0uzziqo65p7fs12qwa4f1espplpoeop6vlxyl2nr0ol1r9q1i0qgy094zeag1ihw90wgo5vkqfluz7ns4bvp5hv6cxue2mbyqki5j3hhh44olfn72qyc8w3udy08v2u514dt0erystk7dp7kwcc90sfbvlx4sj074qtel1km8bgfl87andpzwx0fv43xsvza4vewfw8kzt1gdpzjegstbhydi1pnwi2qy0dd1rduepdzjv25a3tkh3g748866',
                parameterName: 'aziokujyc5ot8hqg01y3pjd867rudvyrm54ejpcfd2ohdiy86g3uwyrbbh757fq7s5gl70rom4pmu33ladxiytoynnrg31llcoohbugmmvxhskwosyx63skf3rmpt8icihl6sg0y8ruzdhttqpm0qkb3v014iaecyx77qbuumjai20yhv23ikp8roxilw1cy6ns9urcj06jfa5b26329w9odr2hsap3pv0psixoxaah032megsw255b53jttoa2lox9np8ldz8ofsbxipg0bckj7ehoiu22pefusvww5mngb8qy9oue149ajarkwsfp7',
                parameterValue: 'bx2ckaeieick3li5cugo5w9u0rj935pmu0caj0obyphrkqf3azi6h02hwejmvqd0efc2ptr9va1rvqgq7sln8gx5qiukbew3kiaa47ov0cxg6cskprao7iwz2nbz3bn4dkfz2jd375ke2g65fxpvbn3tze1yyt1xmfsomqbe2w2a8hztz4c3mp5yrhmgnlegg0sbw39xfyc0ru9ogqhdqcawjzed403js4aq3iulfx1m05dgjthy7xsnd1an7eo401hj12kc1lt7dzska44pkbzolobvsyx0h5pl9hngbiddvst3fp5ii17b7nxgbqbyxe3f9c0wc0mym5bn3ux8ujcwkyxpu6ps3nt0ahapduqfjw2iu6aqo14f9r0soejlyip24l78brmo4ustue3eb3lkfuyts3jzho4i851p2syggk7yhejwu6ru8514a10l1ct1giri440ovgcdqwkspkx7l8rv99y8mbxhtsqywm3xh2nos7itoqldg8mf32vt4l4zz8awe652myc04zvalfzghookkgxzqj31l4rn0tq27mll96bluwmd8n34r8zxi2q4agr3ivv9nz1cgihulsxa7l3t774lp9km0zeq24mnl3tdscs1xvwv0kk6u1tkcc0fypfdejevx90dv87pategp3722yw720k1otzwx8erc1jcjg4ipj0skctjdfku7vjwjhr22hy82jvd8xdztaxfd6wdrfe5kk6q577lpsy98j4j9ozyl8b2xqeh0610jop33w3yiimxe932gzy3rdwuf3qyogg8w5fd0wrdon0li23eama0ilajywyuaibwu0s405cli85i24df5ohetk567dluf4k2umi40h4qqq1scalg7smjgxftyuts1rfqw0ih575rkrpwplmqouruevux4w6sit4rmq3tyww4sp4x9h65r4ksy0cg15mqp9kh9b3yiztl7xjsibqq7wfaxuf9ofgiwcxexbzmxxvwoidtwo9hvw6wesa4nntgw3psfp373pmu0e4rjl9rirosea29cbsus32uz2c8djle37q1y4ewfmnc46y4nhdl4wous3eibqckbzqqdto9urkh8z8x1g7lq79db0125k3fh7rfmy72ypdicdfd4u423ilicym0s2e2aaocfit6cd9f5nk2981mx82mki0zsmpvi95v5vchlzwtc9579k8tix97t2jp4jqgamfop00nkvflmqy73sxgeuhe2nbe40qxtb22n7sim2byf7ra3exa905opj1gefsdy8mqh6pvzm4t5g3wauu8foob9bcd3oa1wue6l08pelaxylvhv9vr7qu34s1p54j94fhxg69y6rty6necujsdk8xi0wd5cvabmh8c2rqnhgk11m9dojzu0xapdxrx1j99eualyhv44vnu6z1d84zrh5x1jgxdnn69dy0rpqf7veruk1ux693cbjy1hdp17gt4goc603jpw8bo00mk5m2reysqgnlxdwsrfm2mhes914ccw2r2moecor2uk0knihhn6ssph5xqpc4drtrtcno8p7ro5vt2wj9r61kpdkhqmz61ou4epg9sp23quwzcu4chabwpbmtguttakzfoczbsjhneaouqv39zcbidwo5vxntbccjs25hg8sareyp04ttzrls8f77u3ofkwtb68cs003c9ln7cv0axu8jcmldtf9brv7ksqrh06q0hi5t6mn0cbf1xkzoub5nbd13mutvsdpeyfzx657zqvfzqs8f3a4v91q1zlh2jl9qiwvfbjhr7oskmxpfuwxr2auh1rei22v10gp1410r6f1zawjtrjucvx01wob6ago5jzelpl2a8qqvbhcq6wj1yw6ck73dxqm11bpme7phn6ok38s33n4ef5hsmu63vevzwmgjo60foa29wdryjajlae4uk4v8png3qddn4dl1enb66gvcyysxh1hqz4jtygvcn6e54iogsvadtc1day5x0ryr8as8a40qs12z2g948j6nrzkwdbcpyiavte9b55kmq',
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
                        id: '0d1b2704-1fd3-4128-b400-bf68a9d8ace6'
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
                        id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59'));
    });

    test(`/REST:GET cci/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module/9d56fcd0-1f68-444b-82f7-c85205da1cf6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module/b00d592f-7ab1-4fbc-b25c-731dfed3dd59')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59'));
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
                
                id: 'ed39f487-4e90-4267-8997-3af7accb2d1a',
                tenantId: '1a2c173c-1f27-4742-899a-9ff5517d01c9',
                tenantCode: 'ktx0jygd01r1ki0te80iu6zch1oidkuhatqn4mmhj3do1bojsn',
                systemId: 'e7b9f05c-593a-4f82-80b2-9b62d61b4671',
                systemName: 'wplvyj38ubsh7mp406ab',
                channelHash: '9bxayj991m08edn75nz8ojbi0aybacn0vi2bgxdf',
                channelParty: '1hfsnuv4j6v2v0d8l1zcifqkroy7by4tl0i3uq0nen5dhropta4jeltmt0u1qody5dzckq599t6etjv690uezvol823k432kex58n7r5towmpsd0b0jfhw13tl3mhy3tt1js4rb3rbyos8x70zcqbmm3kokk2and',
                channelComponent: 'sojwujerw27kb3ihl842hk5bp12xkc2w44jzl8ky24mkxidrkd0xzkkjxra9stxje766d3fa5cgiylnrhxxniq978wymhiiyt1x3f4g7fzjnwfh58up5b4hz8danpv0ojf503movyi2tritbs8hxrinpg48qjgnb',
                channelName: 'e0zn1x24uoklhhfc1qyr8fo7kb9umabdknckh6gg7hxjpwncqle54b5buyev4ioop2fxp2t38zbf8i15k2w8sa4wsdeefjeiiwg0bph6wkz1ab0qyih26qnhx6c7uon6fsoijohibdf5zont4km6dnttc4ms51kt',
                flowHash: 'eve0et113b0lesheb6ao6jhknd6v6i5cnxlds863',
                flowParty: 'vqi4si4ud4n8bkt2wt0m4wtqbumefcffavalmqox734z104icsjpmk4s51mii8osyj3ojpz1xbx4j56zmcg0uxstogy1zq90qzjryk71l9ti6z2lpxwnocm4pqa5hcpxta1he7maqlmhrer3abmyzb9e0d6lnegs',
                flowReceiverParty: 'lza01j2b2goqr6nuy3olcoj2vyeuqcthvgmin62lc4clgyf831avm5yllarvsmg61jinj9f412bgsvsgbjm024a9ggfxtluk6hzg6bpvjfkezvptoysaoarkzan8et4c24etuehogj3d1sqawlwmobehakwy5s5j',
                flowComponent: 'xurplkuxbkk1xfd4qqech84w6l10mt03qcl0igem34mwsvcz4ay9bd1iglaj1rpqf1g8nrd53nc6us1tthtqb9mej2pwfum940iqjff1ni7xy9gdseobtl8p7zjgrlhq9gne8kdkyyyg7802yq0h8pu2k5f10r5p',
                flowReceiverComponent: 'f28f2r01vosmk11759e7fdpkjpaik14lsq02631wswvixascjhadvc6wdet9x04yn8bcrka2x2ts578qizdgtznh3ejs0urs3ssajw3oic4egrwxgnkdh03m6k327ry3j1javs93v5kjns5vf7b9jyb1u01luisq',
                flowInterfaceName: '9wyecdnvgzpg767mz164j87x2s4apfhf7oleljeqsgj5z1lxlfvh2tfzlvvzipkt1n2if6b9cv0aul4nhmf6ez2d537o1qnqr1y21o7dlbpen2tvngj1fdtmztxs2lygia2equq9ew2ky5lu6i55l4f2ykfp5h6h',
                flowInterfaceNamespace: 'x9ij4ivcllj5ktiq8073gl2uhdojpq8652sm1xc3ft7395vst8du16tvt5495jqy4gu5rp7lf3aqgqmfl5prrr8dwq37otohnvwojm00cl6656x3f62ap3vjdda74j8urggyu330ijk2gbupwoahjqons291bp7y',
                version: '4jfh5gcxe3bj9mabp1ak',
                parameterGroup: '527dty5su7y09o4alg7qiot4znprui3cn5hwvx0bf8pqiszr7ootwg8pembgzm4nyam89pnjsvj311sbq652vwwmvnbgi39fnke8xs5ch4c1b6ldvslx74m67ydbuoois6jscvqbs78n9veb4vxene93ckwqadiozyvoqnje9h6vz6glu198ludabw7759hzf9x4htcbtim3dbkl8z6g3qb4dok2rv6pyx1vwpc2jqmtov8ozipxgt7fxybkcpj',
                name: 'vizxaccrievf9ezkjokow2tbc9i0a68c4u6dxow2k26z9s0wyjdocw4qjb8tuhyapa3jcni3kkp9akb5e7l73urifx2jadu7tnwkcl70kt3f67xknjznm0ocaxr6ui9ig21p1gi4kd36yrefr3l1ki4x0p60e4nuu6v3qe6nvpe66uecur3libygk16oz951gsb5w1fziogeqihpcon6o2mbtc7qsxm3z6azt3z267h8uua8vdq5zs6ic09qiqwtrrg7ccpmp63lt0uitg3puovrqwt8rw96ubx340oqj4bzp72tk8363r5c020n6rhg',
                parameterName: 'nl2chpz2rcviq5afifhxlpquwill5k8or6cwukhikjgrcmgcltdifc0hfebpmuus1jvsv53g0rgcexk1p5qdfvhlsil1h5qmcblfvzackgfwn7brllc95tzz4ubd4r1sn8csueqa3t7mqu7tdsa3w7bd5s9902lrlmoa0ui1gy43n2gddi4y5vbu73df89pyp5k7x2yv4h9wxtjz1fcymnsxw4q6n27k94uf32mim8nfa03pxkwtw44ml9zzvyfc8lq9t3sr1l3tb5fx0mq3zalxp58t4p3eu7p3f55ww6e417aquk6lhkhajt48b7lq',
                parameterValue: 'gmev0c3clniej0k620u9chp43l1bmkd9n0ylcx8r2iif86ea969web3esgdap8icdxofsx4yuleu2uf5jo8i74sj173do78vc8bp74g0x67xpquy5u8ebfck4ncyafnp69cpf5z6k7khi9uyn1bl8e733xedbw9mw4pf1qimipiw5vjxq0kbmqp0u8vb4rwb98j2ymrfydewzsbbsmibei8yiiw2sv0balbj8pf37p8cvdtdlk9v5ha9hvanug6i1ff19mx3cp4eg134uled0lnm0h059dlzwnwxbpvgl9m1cn0ey1mwtohy3cppdunovup90bsl2s0wfupr9tl7odlooskldo3hsrsgq5pl7p1uqixshtuwbfwz3burzehu5r1w83whsiad1hd5rs4dbelwlud165ygyzy5f133m69sv5vtoeui4eyzi49fckqdxkyrjuwjwrj8yjgkt8ji8v1q4a91og7u25oaex77jhbrtao01h18q8rp3qpvvmq2d28xch5sarxsdh23m9ulvxg1i62yn8sn6kb15do4n8w6pi6zxlj68xghtvbuhgo1la71xf1beyxw3e85m1zedm84brp3ead4jxio4au6w3uefa44z91gt0ebhf64r0tb2p7u0nwl56vqbimh9vegeifb3rpbc4g4irrvesdcievaqty7on286u58395vmq1o3op2hy86w3ashc4xx57t1ef15xjhghz1uatzwu1h2aahep3qhh1dsylyuk8o9u3xlgm5uedkpat4m34rxi77yjh6d8ivcbwo7k1ts7ed8ywd0519klm8zzhc030bpw3ylu9x17pdch3kzeiu219atizk14d42hhjfrhzo55wkd1xd5csr168zrrb26mgpkh9w3a6kupwiv66vrs3z76lpbx3w5p06rizg1n0ltuo5dzbwxeyex9ssh16ndv9rgjelz4cj33qcb8fktxeim0khwf9e615lrjs3dudqku4rbqcq5547lfr94lrm6eezccjz681ypdxzw7lj9v6esgecjss5o1a1x91lnc8iti9x4otptrkmzpz720npvi4l5e52t8g87h9ubw9v9n32xyts1ndpa8mwcvdud0mqwmqznndvpthmhsvz3zxx08o20bz1erhaz9b1jlm0yq69kgyfjplx7qivco8qd7bx2is4zagq6kjjjgx9xmua8ojcfeat44rnzj7sqy8cd7si26uubx3ccpeip1z7oiyv2yw041r8jmb08oukzignsgtsmd6g2gf8si9qxby9mnm6ypel5vhy7m9p54tcaoo4gt683ylvqjlunw6oh4e33zyfj0quosree3ipc6j5q12kfu3e2xc7s8n7dmsaaweyqsqvqzm3c184pxxg4n0abzyudnzx9mhue5zg99o1onf1buwvbvogntqx0pjsxwskawx7c2stiuzehaqk54zzcooueb609il0y9pjnbgbu3mx68xfssqhsj3jkmxuj0e9vd2pwg7329gp12jrs2ye5ptnj9ja38ud1cgt7tnhdb3iuirwq7kz2aagpb5a9i1ht1blghglwyhr5zk95e0ul1dix28qfttcokh4abzagbnhf5zbtprkfia8oisllwfd66hn71zwr755ri1erjmli3vis97jxnj0eyxvkf3q2qcawgrl5d71jamisjbkb93fxgpwglqokmqrp87stibs3rexb2to8z9jjus9w2lqc6wflurje9o5qovp280pr81nopdp7y4oclxlqb06qn5cfwp3l0ash3lg7t4yyxb17z4ier1keppso2avgwzaysgmd3go2nmfnp0wkqc9zim0usu2a4dgxplu3plx1zevrixnrpb8h29torv2fplruxmyjj1653m4ebrhtg0cy2vcuznahfk1c6ppccyt71kkv7f1uzp7stu1xfuj6pkngrwuf1dizs1zdgzk7ugllbs0stfcw9nwxc8f7qt78f6zq1pcm30s4aykvbfqn1r5qna8w9gs5j5utpabqece97rksfu4422',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                tenantCode: 'vdazmnys1azdcqudiytae30szyoh44bxzabwawixjgvo0czpkg',
                systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                systemName: 'zzogergtyd5wacl62tz2',
                channelHash: 'm3dugh1vsxxwei4s06m754fcjxfijg3hmf6nfkjc',
                channelParty: 'hb24mo0419zwqituevaudcwd4zaf4am3aac904einwe8rt4e7hbtxa28q8ot19tc27yt2tx2q2gfp7ub5ufnaf15nboxqykseo9nm72nu3ayqsh8jnr5x3j9daanst3th7ycjv0bk7wuujrc6qojat6970rv675q',
                channelComponent: 'nnilob370qqr8eb9pxhtpiqxfgjpihhv3qfdi2sp6j5iysj3m5yku7d9hf4pu9xk1fd19j71dpr5rdtoz0j00nkf8awrazdsqrlhujx145q4wl9aqc1e0ldrgqjcwqp6dnwe6py4i0f6ar1vfooeeqahilh6t3sn',
                channelName: '1y6bx2ov3q5tbt9zx4ji9hl89rvdw8l0ymrr66ospv3s3b087v3o691dxvtufij4g3en1by5jg9guweenco87od0vkzepbkta2kzhihjiaxsdjorvw6efb0k5ouoyou454pdnrrcgrbkg38cdtz95cdwrcyw3896',
                flowHash: 'r79ewf0defmrex087jeaw7f1d9x6l0egdws8x0ri',
                flowParty: '0mzny6a1bb0uoqd8ietaemhip7yu8u5neq3lrxv1ries62uwoio2yzwqpqjs3gdmrticzf2alxy7ioorsx496e3m7ov6qjhp47q1ct9eoj4g6pv5i90wo3fitv8piodc226jfwtoh2ovbi2z6sm0trcfttaunarq',
                flowReceiverParty: 'z93za9sdxqcoh8s9kznlbvzdiy725amkuhghqqyxvuqn3r4xpjv5w9t2xbtoa63gssltusbg3d4prgk547xrbthn7595rl476f1b5x0j5vxxu44le40t2no2leu6weibndv2mlnv07gozwtdfdja6nl16csd7lir',
                flowComponent: 'fuawrb18cr70e9vwvcocchborvg7prwbvu7ofh1b3e7pwmunnsuehkp3p5g9v8yakg3bax0r8uus5olcre1tcacaog5ap7mtnwr6b9hj6renpla2l1a1pg3qbpw1b1r7qatpvq2xjb2aakfsrnn3rg70dyycml40',
                flowReceiverComponent: 'i4as47ey4bn2rrvm3kqndd8zokptcump80iykn44srglcld64q4712aot1m0r6bn0u9psbmo9tyupfqbrpaw6wbufkatkw2mq79a743udwkvuuou4t4usquib4ynpmvw6qnm4i1ou0qqf3n0m7mjbah0b70kz4wg',
                flowInterfaceName: 'ccr7uted3ngxzqsldtptd0alh348yaabsz4fqw9e86u21no2tgwnj9lpu4o7vm22v1e914x7a0zwfm1k2qsa3fs1mmgude57in0ylcq0sy0mfc6zfhgny470s7hrx02egozoq4kya05cawzik49ed42nbj8msgxp',
                flowInterfaceNamespace: 'q9nl24bp4toleuixpdgxa2qrd5jdi5jw2kjfccpbzv6rbu3o5qn9p3t7dqy4ty5vr86rbagqddqvpfsasfmsphvtu532v0em2mzjo970i17l94jbwkbnmv35g2gz54cfjxnorfibo1if7adly3gbu67o4ny697qa',
                version: 'p770pb4mqo9ejpl8ttx3',
                parameterGroup: '0dlzf6lm6mk7b1gkza89va0jhm4hfb7yctbd0g24dqc750uvdz27qyore9nn4a7s0y3bqdk8ncztr0q6pa1mc71sjfkvtq8li3r2mg5shk3iwi7n0kswougmp4pkyovl4viyfvl6oeclpkcocopzl2vvbv81hetabmizroc85v5sr0dw4o13e1smna6izr7l0y7qlbm9rtlmrhhpzn4979gzvy5bx980v3b0wwfc3avglj6ccc7s3m1xpqiaa50',
                name: 'l1hguai07hqgeal0cwqucpayu6dz0pr6zw1gps22uuaij7wmo6bb8cfdm12zu335ta5o4l6p61p4n96smg9zyiq0pjs7hxuom4iw7cpfjk04jotrpyd14azcgolcvutjdttpszh4lrwz4wltidlgpd2llhjtpma0ns1rrvnz5hb1vlcnnl6oejmr0gksw5t6qh8hk6jdbn4ebxshdzcqb1is6dnxwsk76time5nh8qm7i7urwm5um6ztynhe8yoapbue3xk49go2fmw0ppo8ndwpxhttnqwewoe5suif2w1nwcoiplbm4ieze94egenq',
                parameterName: 'ssskc42xdid308n0bfgbmwe5cc6q6q9xjo2lo8l9u8cc4b6mnj7sbn5ksex02v3vvxgmd0dbqk4ft8qzebt7n5zg0118te30oberbthdp4whyt4tj8o8sejj0u8gszefmvspd78xvf6uvo7pv7kr46yh870nsrxm0k7xju6otwtkxh9n4hucvbuft7qesvqnc4kcfetkzoa7zbkw23nub05u879u8oinirrbcn83gtv0dfnr88252n5fbkup286ak7thhsy5u05wlfbuh8a8ivye2csxstfwxfdqr1y2ujzekng6a4v5s6h4hwvud14h',
                parameterValue: 'of0jc5egkkvuam34s295xyqx3pdwa2nc9mxyeu5jkzn6tirwskuhmj8sqizfauf7njxakt3s61vf1n5sgnqzmdm1liv82k9q6pw7nqsxqmxdtnr64ls7dm468q9d3x2n6bwsjhv2l0zsntpwx5l2t87lywpvd8ogh6o6fhs3lk2nnhy7nou8siaqwl2vhr0vtiw5gcg7pfowwgtvp6snxrkf3pinrm8ueio8pv90ahzgdeakyo672q05gtx36kcd4l0amwyhw5zgf4e1pop5kzf4t86pl4s4vu4nkds2pg6ol9qsml6q0eivrixvqwlg1p1bu986cz7sc4lowpyduhcuz6tniu7m9hf8l9l7aqldj9gj24c3jckr5bwi86jzllqn51a4iqux5vmzfoif0mrkzvd9q7p30d1qtbr2y5dieh5reoadyb4k1stuarudfmuzyfb72dsw7myka3e5oswnq29i5klcy8cavkrgtno80avd0yxew2q5eybebuo3knbjqbj8bugcu19t306zw9xq9asujs7kltgugxqzvj7d8toyap1gvtff54e1ftm2rf841ij2n2beusv83bsve83sjzxo7x6t6ge0ejsbf5lb2jl016g6verhvorx8aohbs8vdl8u9k5882fdz4mt07vc8efvmsnt08uhms7ab5dsqul8fuv27ln32bcm0b2wkqmj8tcefbj1wq3avr8sj83nuvfjqy9cxk7fse6yzovc1o18b88du9mvt20ap1yh9tats16j7kow1l2i7b78z9gfsjtlq3cy58aw0c9hl2m7y63ijbehxw620cyqdl8rt8f2cptr9ci59sam3dejoclz02fevkh7s8wnf8czuj2hurv7p6yawkctngr5fcvv24caa484l8nou0wj8q89rtdife1kjqvp0ynzpyflgu97fe45i5gi10qqe13vy8sutiqaj82zpa3w71c3lam8g27dxkwk8omt1z0i54o5e57bgds5ohpovctkj69jhoq0tevvq155kv0i7p3r71ez1xwszfdrx84yb5i6y4hl3flcvu9ohy1pq8rwvo5du1sdu2rdod0sllgdlik8hfvtr7e77ejfpcus8k37qb3abr7qx2okzfkppbt9ngy565yw2akx2gb67ys6079yhxfjj4ue3dtvgir6n9fo61kib176umnvcmdupsb7s772tiz1yb0whm3cerfj2b9mtbtavig3l4s4uxqy7o05z7elp9l2vxh8fu8yex21zlhdv4ycgy9uzh7x4kq17uwthuesbtxc1yyh83o5kjou25z5xy03rwu5dib5ucjjhac4ui9ocyn5b5aj18v6ruioxkoc5pv32eirk7l71a8zk14mfmwer4rpmyyztzvh93loxlwd3p43ai7ghr1bey38gau3br3e2n4ql847vknsfmk1ukqum4azjnbts1ljkmhyficlx6sn8y20pxclc3pmqzavo7stv8hq9o6n4tmxng3hi8wwabr3n5sviiouenwv6mcs9kjlcmns7t26bb67npd440zjvezjq23vycg4prczfewzrdvopcvbwhxeodp70l5p84aaaekqrh7rgi3ggdedhff9gh2ncm6i35u9wytuj7w9wz976tobhb7k6ityyfv6uk225wb83dinsxxxde8og403g2wgfwdrmecgsmbyuhda3tbuaukte8y9yh6vkfymxmbp779fl7zxrrfzjxv87m7hfkfo9i3xi6nrxw0brcgau6yd0d6ic2tcpqovxip43jgk1xej5ojodgn7lzputmz62hgusb7rmwf4njol47e3ji083w0o75gh3q85ezvi52gdas2rekpc5zdpbz97cmwrn9xl8d3cvyq1iawscf5gog0xybp5e9b3bdb9y07wgg16mu4g6i646gg3s6udyilvr9oog3p76yn8izujjk5rsxpozgzbkhommx7fhr42x4di8avcywwbe0f26d12h4qpc8n2r2ujncf8gm5kro4irenuf5kwiffbd4xsz75h',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59'));
    });

    test(`/REST:DELETE cci/module/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/module/9524db8d-c3d8-4d7a-a847-7e27211a11ac')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/module/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/module/b00d592f-7ab1-4fbc-b25c-731dfed3dd59')
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
                        id: '0c5a0e1d-f52f-4bdb-94ca-76c13297f800',
                        tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                        tenantCode: 'yeiwe9z8my0e5j4eljisqbritqb6ah7clqxhddeayakxtx8dgn',
                        systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                        systemName: 'fn2ewewrsh2l1lstuduk',
                        channelHash: 'hggahy19q5gndvtusrna5ou60vztm776x2gz5mev',
                        channelParty: '1dct4z2cit2o2tfj8umsinq92hvyg14g374kglf53niq5bax5rzk8mdn247u67mwz9ceh3zyy5z9eesle21j209fxesdwaq8zx3bb13ccvqn3lnzdtotfr4n4q7p7ln0ewrl75zi72ou0e71wbohthm3c1n9w978',
                        channelComponent: 'heh7zipw0t3oitaryiitis92fjuaxukg1ayk6vek1f58paaumd4f48unris2x0ib92yew4h2c0vc32g5n4mhinlim89tvdrve0yukanf40hejhh6jteolrhk3kf6jk6ra7fn41catvye3g4s5wvqb0xu1ih1rbbz',
                        channelName: 'ctrqxvbgyzd6tpnhczzixn7ox2d1mpshprc75zb70diulzwrw3edpwxl3a2h5txnottc82wbv5hp4yju0pm8365eqrbsudbosikijp30mdt9xqg1rv64l1855wpb281h7nx1ji0rz56b7agi7wfc7efw9ue80g9v',
                        flowHash: 'epnke7vrt7qsuati0ctm5ewacz1bb3b05s28wylc',
                        flowParty: '153h4k3gw31dv4s230oxri9ko0yo16t1kkevmro0y1g7h25ji73yc5ppx5dvpt3rp8oc8l8po9o6c53ysfrftmkk17fi2hr5r5rzfjsrs4z3acz2uijsgnb7v16pjeoaq4dxdrp2uw4tn7550rm182ye5pexfzzr',
                        flowReceiverParty: 'x9id6jguu2wxwm4w9o3wwambf60b2cjdcsquws2sw0sa30b50y4xv41edptsp5tdw3p0bb9t56gtub52a3yegj26a7bma5huor8exb1xz6i910p5i0md1342nk2br9lueoou4o4ccu5j0bqfnl2915e0pt252cs4',
                        flowComponent: 'vfzf0xp09xe9871jv9kj5hfe8k1nbbdi5o0vyxyseqeucxocuxt0qrkoxdxy0hhql82scfp9kzs92yq178kdtp547cr8s0nun1fd9m2z2j9vb9l6c3hw2i5h1xsyvh690erhq45nj3vmw2u85tl150wkl65p649l',
                        flowReceiverComponent: 'qo97wqvt4ssmx6pc8ik3nw5m7rwf5et33qjvr1d7vyo2goelinxdotzhooxt6cro7cgpqxuewuz6taovyi38cq0n1xrkijc07i3pd5qlcxxfatgikw0kwj0vpe6zyk8c1e8em8jefx9pcill8i9xanyf38g5r6su',
                        flowInterfaceName: 'dfqqxy3s39olbyj4agfvpj2ud55qauu3m4r7a8w2979982wf2gclsz6ckt6i3iiiz5rjpymgs1ol5wnhqzje3lik6uereimlugefzk0p9a7y97oypovlg07rpks1vy0em2ade5iq7pav9obhrl2lnx4mai840s6v',
                        flowInterfaceNamespace: '13ogakzcef2ogr2b6t1m4u0qn0a5fhdr98kbg0ak3jwzuvwhaq4o96yuqh1e12283c7eosgf8f9kuzm03g2kxvo8hwb6pjb045lhi1n716ehua80r2tz0m9uy821wg4cslnpw3nsaa8gmagyzzdorjrl6vwoy6ed',
                        version: '4mts8ffjze0nd46upx4b',
                        parameterGroup: 'bw38aa4tnqghsp3v5j1s3eboek7hykr968nnmfxsbpxlg3684pekq0i5v5mgsfw1tmp5rj9mmfgbk4mgys29uk687cywbws215ufubwmxz9xgcm6c1vkb9tammhvedxj8b5r0v97okjo02xes52scgyj7x4pxxcqivzjucwjy367a7jwgtaalhdzr0ipphg3jofdo5u3g0lu35o9gtwh50av017jhjjpxedqo9afi41ku2kibo3jcrjf4igun3v',
                        name: 'meipr8pzddmpvvd036g6nsmo1w3l5g46l1diw3p3dbuf20syzutvjskw2ez7pp0dert3o7kj86kxv7ivktpjyfugrg2aoq3zw394wmo0pika9oskhokniksmusq9nfunoo2z39sby38tek5ykjswf9kcbwgoo8okhxoclhe1lg1wmdvil9pgqye29bpwh8u1xyedem7rt59q835aob9pcddrb9w7dop4f86ss752r26ogdewrk0iljv0bqwiwq0347zlg2abqakk0ijc0lhb6cjhijlzg7ge3v528s6rypyw7m8rf9gpjdselnrk2blt',
                        parameterName: 'u22ed921kuksgvj8u8669p0c6f5lpy4cx6ksxcluqpb34xziefrmhyzz6obwaxv2lcoulhb99ze473pvcaexm1cwpps99tbzt2oy8dnyg1f47o2a6owdebdi43pcvlhj64gg53neev3aur76xgsukd2e22xotldf6q3cylgdo9bwagmno6gstxj7du0mnw51bnhu3kcssrf2cwez6pvutvfutzh8gkt93q08srewpv9agsm55rir9q0n8hng0buels4gwmagqykp4z8i978x57kzxcc3shijcugds7utguqy0swr28127xl0rdoojq87',
                        parameterValue: '12jylk96ygv75wfthswyzw2e4y9g7iai244sqnlma1jzk7dnfq8x9v8rrawx73iunq6rk9leexrmmzp9fd9mea1ym65bn8azpxb38tf1z5z1uohmnpvtwbzqk14evxcmewqtgkb0uixfsllr5txeyhgjts22ic0cf2cvr6w4e5k56o2ygx7vbdhx3b79frhgm1jdk5cwpu94sggojj9j7z7glnqhrck76uqv5wlmf7ezauhwdhfhkthn1hhqz9ac2cz0ac7ny2eloag5n7hhxg3ynf94a3fq43ythni5uvb1o6bfoq6yfm1f0a43tt0b3rijt42lqje2g5wqcuwdw0qm4vzdaez6178q74u1j4bx5gz41yvowub3sqqg5l2ciz96o7neivppjvn2i78ug54rkr6yuvxrueok50q9dsxsh0ye5mt5tm4rmf5nnmzmxs7ap46bm1vrmvdkat667ycldn29cqhb25rsdon74qdny8go2vr0s35zn7qrsb7150xqph4pv7jsyum6xmhuoqz0fn1qbzt9ndjfqd1pgxpttlzipcbqzc35cu4s9d9a57c0e4s21rlsxgji3wmg4pbjwn0gkn1fkc4c9cjf2sx9vmco22d93grwe2epf767jyffvag4d02pbslorwp6vf79d948urlk93dicyvzxaadumxlzqe2v9t6ibj4pmwvi5icrt0lc1bvyv9sgzk0e5fcuwkcud8dc4and3o4ebrtrlt1d5qiafpkfl73kbk0zxfz7j1wikt8yftwpi4293lqwy1wyiyeirhy4stuqlhxgyttq1pdlsd5nl6yqkvco8wkiiimo72qllimi0uf0ftb9i2518kpl3bjpyiqiuvz4tlk3q0kwat7z55g71vempuypwy0lwufayr0eu1v1iam5wahdthkutm1rx15j69aab2tfr1iidn3whnvlr4ybsfsvung3rexpk4xmw0nnhjtyr0zyk5ogv4lv950q9grrbqwphfkmxos2n82yg1udigzmkwnkhi59vd2gazk2sizrteitscx1gis1254903rzkdlg78h1b9dyz52d4ihtdpft774ukiv9ak1gb4f83gp0c4o07ek7l3wmcconoe3upcn3ultxfndmbz556sv16xpv3nncgmksd5gdtj2nkzfu2d4zmxkr313loixkras8lnhm01r6u5tfy0j6j8os26nrukqx1bbgfypmimiosl123fhdl0k2kylx32heln8d26f53irspc3pmg8olm269yeu8en6oevso9b3afi4qvemzmp9g1neof4aqtve0atnpk1c60jbqnulu0z0zfmd0rkkvk68v22vlqdtvvixlksozhbkvhcio9ud3ln1bu1ordhwon6om6zbrjxghzqdbw735smbnr8ie4p7w7b17meoadgcfhyz6s9xc3oomi0y4mnb2401ulh6lvrhu87m0ppqvfo58g44u9x8atoyy1ask8qqm66hwnze0s7q73yml1o24ar058tnqsbfxcxauyqw3kql9is4qek7qrkirrtkg4we1ydkpo02nexthv4ssfc48i98y5dg20s3x618yy9y0v0l8x0c6e3o20jgy37wh1c6nhvbd6bx4oc1qllovqrr4jf62bwyygm84u8dyvfdv34vd0i6za6hsn0zn41yi0nogs4sovl8rsuht2qjbrvgvviyku1f5j5gw2jge6jt8m107uckhvt8wuxjalgg41fq21m6k9lqb4gbppn1vu4wf7rxiiy6s6jzy3w2bn3im5ng3452awtm2fmqpjpr310yx57omz1lk6l7266t66gd9xchszmo9t7jvstoghtp2sn9yfwggk0av2regrhecy2g3ad9wgxy42l89vaef2a2vovqppzatqx5yj5xj89h64e3nwvxqyn23ekejzz0lacc1tlqjpit5ihqsi4ewz70iq2ei9j1e1cbhzsywmrac86qadn755kim10ytts7l8b2848fm9woj9nfsct92py8dk3rob2neuhhvla',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateModule).toHaveProperty('id', '0c5a0e1d-f52f-4bdb-94ca-76c13297f800');
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
                            id: 'ad6b1ea2-eaff-4b12-9476-8cb1b24149d9'
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
                            id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModule.id).toStrictEqual('b00d592f-7ab1-4fbc-b25c-731dfed3dd59');
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
                    id: 'd7ce13f1-277a-41f6-b263-47265f0c9a7e'
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
                    id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModuleById.id).toStrictEqual('b00d592f-7ab1-4fbc-b25c-731dfed3dd59');
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
                        
                        id: '53e176b0-0809-417d-a89d-78cae10dd5fd',
                        tenantId: '086fd461-394d-4750-ad89-f9b4257fe514',
                        tenantCode: 'uejk7eu4x2z2nhmqwyhdsn1s7mmhwjeoe8zgzsjho6q1p2y7xw',
                        systemId: '82e3b79e-e853-4825-8f1a-197918d85377',
                        systemName: 'oeyx1h2by19rhypb3zhh',
                        channelHash: 'lixjux9rp6w0wsh4cyid5stj0li8mn2agzi8y8ls',
                        channelParty: 'aa99a5brdyi5e92cmqoot8z3itkxfit9ux4r3hdbrio4xue4hlvpo7mb9pbdo0rkubbceyhz4qh0buyme8l8ske9dcu7pjsn0itsflso66392q418wu8e11vjdi07pokpem6yefcf4t9jqtao66loczl9lhawrnk',
                        channelComponent: '5mptp6jm87ku40c6ijrfdkwzs3r1ylgqayc2s9dbyl8oay2iwipbblsqip3pxs088xxb07j3gvckvz7vgbhfvv5fqxeqvivd0bshvbf21vvf9aqvr0b1kblg67dojfopbdratoviv7bk6gj2dhzzylvvcpxvy4s8',
                        channelName: 'duv57ihxkhqe25idn6ep9r6rqoaut0ddea57boqs4vp5kg0eggxvsfwpt3yrulpgu5k2mvh8y4hwscbk1ftzeh5gsugeebzvhlsevc53q7x8doljzqelju3ai8f1fioirv5zpdj2xgoir3jzr3xn5lqik5xauqb9',
                        flowHash: 'mi5y54ocd0yyzt67kbh8zvvy4aapfynoxr40uwf9',
                        flowParty: 'pza8gtifm22ls9a3hy2cz3l26x9somvo6knby0q94eufxi9p8iu70fulcn6tl1t4dtb6cb8dk3xzbdaaxegdunvxnnazl0kincaxqpqbaq6lya0rbyn8nnn3jdjrvcfhn3ktnekffa52vge7049bhxkjukl8jk9e',
                        flowReceiverParty: '7j7unkzknees6m6u9ff1mmpylnlv4n5w1u5uwo000zs23sughljbzd98ji7bi43peve5tg5il07yrd7coqyw7txrexlgz020w17bddmjfkz69gkm0wsr1lavl5ac9s1vhg666vb6ys9q8zokjde7i2cs6qufl17j',
                        flowComponent: 'xwrrf0tvie43l3heoro6eug1zp6va09svftqmoiozgw8qrtlrclwjeufy43rsbj41dk7xk3a38t95vnuscx49n4yiigxlkp6wnxj6km49rkt5e1svdx0tcrr4gynfv5prlrlof2ig49xwd3nberaax4a3r29wfbk',
                        flowReceiverComponent: 'mg52bjdwo0dwiqdwdbwc3ykz2zfi3ka2q8z7i52q84dw4qwvkqhatiyv05msxwzalwvqm6cf4vbqid58jbb8fdo4gtl4pw4xxbl38ldy4punq0bvpsx9x4g4fnjhrvsmnrbrhhaav6w1yhns7qukrf658as5lcun',
                        flowInterfaceName: 'mrtac7p9th193fyzds4sckmvwe7674eobxkq1z50hlmw8si1id7nujyorwhu34m0euza68fj1ynx4elljqs6zu4z3qe4ld9c7tlg7azpgxe4ajhehfw2wjxdaxiamx8qws4ygt8ecsg3955erammqhw4roduy98n',
                        flowInterfaceNamespace: '4b00b56u1enkksz6ygfc6qiyu1hx0vnrrf5omo1l2wc6q5skztdrk8i8y78616mex3x1szyv24u45fq45875ek45qqba0hr6prfnuw8bh6uy7w3egtzvcvnt65lujgc9nqykzlfqp2hjfb97kd6pqdv20unvkmzd',
                        version: 'r44cblz9ehyw7nbyikgz',
                        parameterGroup: 'g0a4fhasuqr5q4llz0wxkjca7w57fgmus7sq50qg5l9rianxykm08z6pr99pa2p0tsk431b0voipdfm1sxfrpqbiam7yp7g0quob2bgllxp9i4lr6jfb3o3qg5w5wz7a94xgpdmm48wvy0f6ubjxvbodieghpoaq798aotef91hpt836e0jn253ltkixvvey2bwa74rr4q6g31cr5gdk6lxd39ao47afatdbs8meujek1g7zwxww99tg7v3to3f',
                        name: 'phab9mz99n7gdda5ayj5ufbiw5fl585osjzzjo7b5k7wgudzxfnsxf96p8tudn3qjibc3j44cyts4pf4vam9g9dn5yyxs2z6ckpacsb67yu39n6cpv3s3wcbs847g2r8fhbxg1hotiz1vdy4t56826oqyjdzyy01fu2ptki3g8ibd24piuv4uskd82xlqv5fnycjc7otclx66jv0mwof8c53fl2m5dwqzq4au22vr0k7rezf2yy6lj7c5hak2d3cj407rlnbp9957y26svubai78wtkn3dsifxwsurs9uofs3f2k3l5lp84sfcvo7wp7',
                        parameterName: 'h9zgzdpebtqxrkz6cccu06kxh6tw9qeggu28uxagzozle4o95ezalpr2og8xqfqkufvhwv1lrlrov47v5x3u42z1znpxycvui85u0m9qlnvh1b76xmvyh6z1a81laueezj8yl6knemdka5gxq976o6iotosykw3wperwvp1ymqt1bdlrbrbmn9jx220ruos8kyycix0qptzw3bh5hu1ozda5tq4tpfidoou8sm0pnd2aari18v3dy3tbeizr3x5pg42jdvn2q5ovb1k3muipgqzuzd7smyqcai1j6vywtc5o2y6hoerqe56tyhghd8tt',
                        parameterValue: '9rml2gffn4u8e9zh8yyfeodpuqpdv061j6s1g1338rlku40eyu2poxmwwjzw5yvfshw5pg24ankvg9j7ftzp2kkzkvnwxtzoq4n03uq3b28wu5dyqx8su4pdirggskggurx6fi17nb89lys7mgckv1raf6fttc9nt3uego5qr9tb0mzowwj9lppx42ja3jk04v1kkcbkz7sf6ee1c4scuausqw6s6dirqtid5cqmll0rgm54h2xi3l69ndr76idm3ru5l8281gs5uaik3foymmgrc2lq8xmiwipv08fb56huwi2os8hoq9cb0yykjvutxvgi3ujwo47v8rqu9gii54yhbgdhaulxmov785538s8zxupnva1ks9f4mudckv6h98jrllt4398u0ap2lopf2koo1um9sybop6128uc7myv4gdw05v8pf52u47cokhej3xi09il22tsu9r5jdaheeepcqg7qg1w3hrx42viavqpzfe7qc3q3vwflrb21mo41fbjqqfibddz660hooais9gtto2o4asq6p97cdmjw1sw2tj1032hdgro6rwlkitl010gr7yhmmwnd0tkbyxl6dqeieu3bkn6i8iozx6ielr8wasx9ps82djgoeuwvaaxyvri0kzh119dz85kytpj1rdwwjqk2obqc2y83phgltrn74yl86smiv4b9v233ylkoqojuki5y09xq17v715nvaqcs53hhk68hakly2aq8wyzdelbwswsylheg6e8dj04vguqub35zwny0phqxrvfzqjs11xfpm9s95kw3y0zgydwntevqkg95nj2w3obx78hounr8wlga5n7uxdhxiiq9jql0vf915kcuamnqznutgqehpusm25jzdifx2ht0nvtyfzi30ua9sx3ejccds4zyrphtsiu9bo5m07n1o7f56ub1d6v0xnsbbya4mttqjpra1zqlvfi60jpluzw49dss97gja1znuqqpa71bokve7c3e7ig6nqoamhh8fdyek67vqaf1pq38qo9pxkm10qcszfzq418ops298g1qc8osd0kb4tw1d1q88u30n957ca325y98btr4ejurc178bkfmzhalryu18auvu9uihdj4cc3nh31hfc0ea910e337qpjeym1g5kq7ja2xgih6lunnl35k82cnqicf989rr9ku05lw8ofw290ro4gfticbzbt4czjloh8ojb3x72n98bsx7vba4h5zjes9uxvmpklvu3pfk49vtov80h35xd059k328819n25805up72r7o8562hb2wvrv849s9244av8c1ezbapykpzs6uh05l1mrplrlbd39se0z15k3p0zbdi6e40v7ongarqnv27qk2zdtmbwhzkchv2yl8h9su5nl5m6wmy0f6af4rol676ddx3k8yi324nublx3oke604mzgzkoj7s8x4a70hssd6psmr0nucy3cl175n4aa2dtcokaro1o87wzrinmude5l0nut8mdb8dpps9vsfk69u657ystv5qg1x77qmds7t0eakarwk7outbobyzyaec2kumwilq4r4cn8xouwn578i7a9jtfiz4vqukbl5mycl9g3pcxc5yyvk9p58qjdhtzrwa5qmu7iqb307ziif1jmhjqgzjm19m4x1ul0mpf3hvatc0gjc6ifn022ni3g876ge730rd9oxsuv936mg1e94lkquo5m9t7mklrl6xncj09p6h6lamz2vthygl267rt4ud1pufreduozthy0z2evq9h3xuq4d5596vtq3nmmd6z9lffsdjckmq1q6vtusj0flrxi50bls7gpn1wddb1lsnbmqrkvyn9i7ylc7ce4l3vwmhwu20vb2q5imny0oo7a6gyj1oh9flh3ktf46gn4i1vurh0famz5ouhwcp7hg1jx7p7gvcmwfsnqs3q5uzn62brbwd01iipma4ejkxrvvpllqaa5s39heqbj1z36bmz48yqvfvsw7adlc92dc0mvrluwcotwcfpiu21y8ly2jcqd1k95',
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
                        
                        id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59',
                        tenantId: 'f402de18-a559-4dcd-aa7c-dcbdd7fc4e16',
                        tenantCode: '41tmsgcisa7ot3im9ddgapqxxqp92lubr8dwg59lsxu4rtylxj',
                        systemId: 'af7efbd8-1ebf-4914-8f3f-13ee24acbd20',
                        systemName: 'n9a673epn2vojjks5y8n',
                        channelHash: 'c897agro6kephzvhl3y22qx19f7vymg0wh1h2ic4',
                        channelParty: 's9hzb958lwrqouzavaj29s0bv8eyby3fd6onxxcsytc8lepnm0bhnymougqqar9tap6dh5a3k2c36aqi2m1hoyrzv849wjkg6i2eumgy5fdvyms3a2bltesb0ugmzgznptyzhrq8ykhmp9p0mnvw2940f68yvy2o',
                        channelComponent: 'p7l5vddwoaehylqu4m47v406x4sgh178v4hbxa3fv85z1ciqpx9b3kfu4q0bl9fwj339m7bpdpuyv0bqu2rf9ld7d4i1zhaek4ldc80cj8kwdx3c05nqc33uhp1qstop643kg7pewseolsrooxfg1wx871f5hah8',
                        channelName: '9nxlbm9b82w097xey4k1k526jsm2ytjraf29tmxge9u3vle5s3ycoa8reyc1x7nv6maw23a9igla76mw7h4ze5wocro0ldi1xnm5p9ulel2colc1duu37tsczjdvk6ud839o2vruc226th7iwvz4vww200ijwa91',
                        flowHash: 'c0qosec212c3kra3ci3ht7q8bkcp9lcrhuysljnm',
                        flowParty: 'manmis8p5rnn0agbx49fhqu0gxh540tz3w5yvhp9jn4tadf8flzudi1oh84gu85yx8vo8we8ejoffgu37a4wl6w9mifjctijbk8yae77atp6agsns20aiukfy531ft3ws79bf2whnneq3j203ec8p9r9jcg95pn2',
                        flowReceiverParty: 'gcjnitttlvpih1r06gwjvu6nwmkbvmngs4jk1vuo3ivnyge9ocqogugurzfi7bfop7vqnlchhenic9p6w4mpu840bekz87fu4ezzga9ru8yvqscvgv9s7tnza4ykd93rlao3vcza6svafvckm0eqcnmre4n1m3xn',
                        flowComponent: 'kxxgoyed7uudtxhaeyayv54gyixlczx7635bxn119bhomwoatch9vcexvilaxw3qsgtyey29c5t0l6m47c9b0273pq0e5es7zdotxykrhqyttx2h2qxnoyegr62lfcncnzvgeck62jng751p7rcrg39k4t8lx6ut',
                        flowReceiverComponent: 'ptjob80vy7nscvbzd4fn5rt14gll0edrxnlxr3qriwfvg53uac1w95lp13zu9iv95t26mnnp3udnxz0cplv3ntgivna2j09y1ab74c8ywzm839qqzdefi2mwblksfykmtqcq9qdxlz8vbddoigjol8yk19xh0gol',
                        flowInterfaceName: 'cn4xze1lgoyrd3dqb07sxwqjfl9bl93gua2tzxgi2ucr56l3zembgaifapxzp7lrgvtk55rqedqze7hodduo7v708afrod5r89nvwxs41l94hpc07st2s8hc16jd8y09vilgrcy1nxqncb9gjzstbvxsrcfizmb7',
                        flowInterfaceNamespace: '6n7nojtf3teu6o1pgws1yy6h6tg2ivom92o8of6957gh7xbmh4qecjcswvyxgcvr75dvjfdcxyp22mv2h9rejaiiddho8la0cmpetmy0341cfhcibgxvnfhg9dgwp759tizrj9bkktg3mb9y1so3xyszy45mi1kr',
                        version: 'jrax8bwvuobre1qx4spu',
                        parameterGroup: 'synobzmi54ijubrrbkfrl3tljxzknudfirmyqtoh5f4l10v3yli8gqc91mavgezyq486eouu105qgm7set9p8xfkbkkp35ixjrtp6fr0djoeqo8mtr96pez0nl7f43xaqv35tgxgohp5gvk8fnh0fr00teyvk4182w6z585zzleep8gfmmkd2156es4ff8r11c1z3laelm4ta1307gvlhaptelacfikd6z6x63uc878dx09zc11hx5iici3em84',
                        name: 'fgxugvaatbb9hooj5n5fn50ka8a2afbkfnr6wshka47o733fw4z1wj8a6rabds4tuhbcszhvf4qheemivnlecgoktrkepsyfft2rh9hryhxwyu1aseq1ro33d7lwfbgai1tqhbnajfsjrdavf0plyztswmo58hh1o417hw2hn6f7ijjxjtenti3fim1oao9dw04zxsnye361ha4xwyq8qyli8wqetsynid52oox3uooc6tf6h3wx5chufbvdezbz0uarrd256e3mtqtdwwtvodmobev22tmzq2m5sgt7lvjkesv59pyamve8atngut6k',
                        parameterName: 'ryuogr903buztgrmf92hx2nkhoam30oa5gwd85z59kx1nosfu942g47tw5y94w9orytfxzkzbw9fe8rg9ojp9jyaim2oxdicaj4uv8pce2binb3dm5p3v6m3xhaht73d3xpn33w4vnfgu84kxxfzvl5v2qiwqg7gdu7pj06hderx619v11rkdo16h73lzjz0v0y6krv7old98mvfvo7yrdw7splx6vyxezx15v0kjdj7cunmx9nlo3v52ii8df0khmiox7ao2i4n3c59qzd3n66qonwqzr19j1k137uk1extl0v4w2z69ug046llaur2',
                        parameterValue: 'kxuyqdhimyollf55omn2n8jr66xqa6aub0d54s8oi802385g4dqbpq9jb9z2e5mqdudcw1kyp6jdgp25mz96rrpxdhkmiovf5q90o5xtt5f565mm7ll7s4yhrcx99bnh5ksi908j0cpobkz87f2mnl2u4glknwyit5i1nlk4yjd4109797kmj2gxwn9jk6jygjocia7g93kdf7iedz16pe6tyf9djgsuwhcg2djh4n0dwtv6ooi7w9lqwhsuhpzmm3xtect2lsvhe704ho9fk7fh6ufvshqhopj5z84let8k8fzv61lol9vzphw8m3dgrwzx56bvpiy5u5jfrxrsfoh7wq0luu10l453vad2z5f6o9uinbaxjip767doeralxq4qycxtrsjtq46g3ocf601hxom45va53yq7kuwkzfbpaf9npmuuw8q9t6kzfwvziiiw9aydby8qvo83e9uyml5psubq0fjnll5eavb9mhclrrw7uybv8w7y5yshari2b2plf2k7iks8gkyqpyc07vloutg3kyfuyrccem1bx8xt4tn63k88yzduielhxxdklsvvqvvkl015fmyasdy6022w8e8bmlno4a1kfhmkr61hzfofhl00zlll2ogodjeehks57edm4w1o53fg474nr02hzr9ep9eb7a7dvklz3tkkjyv2wk4qm3q4az59151z3jwsdfl5d4axnlyw2yvf0kphe8ag9rwc27yoe1n2iyc8n5l5whc912idvlru9s6041m5st1gjprlxtczotlwupkwn83b3kq41xp416oc5ysi0nmd35ltfi3o046sm746s0udbct5y2nnreydcn8d2ziuv22bv81v5o4cxcxg0ct3qimkgg1peie4uepfkbpaxmkrchz1semw0odfsc67vib9mrxvi4x6vpwedzmy1opeq2p4hiygmoljxglw5ret7lfus4a03ax3eltt0pt6n62uo53lkxm4aputoja7uggxz6773axv71u4ny4cnq80gn5v6ji2uwnzgpqbmh01mfmla459k9pv21c0o1j4cizbufmhho3fqmrlx1zbxx67my9bmyhw2jh1fsknrtf2f7js9wzjtoqk26yrs89iv8dlvydqup6l9syfc975pg694derdos43a1gisbuxz25mr16g3ie0qc28c27o9lqttok65ua3a24utnzhbrysmjf6xge8mi6upjcdf5albky3x6ckfy5p9agca1885nilsajgb13src72aecbxeagt7mlo9ibf56ibnggxtq2bxikda3zjdigy1i0qixnjy7f463eq7b3iotuqog19og7uyfgofbvy0eovcxg2j5rw2khtu6iln9h1c4fdbn10z8yagco6mqozsh6y5ifrmogbspxe7t5g256443cxfoc9hnnuqgmfik8phj4c1ik05h9tljsi9f8v2rvwc3sc73ja1ycgthwbg1qok0fggpq56efumijw2qz5qgw69j88swc2t16tapf2z1ld6ap5uyxwhf7bm8xxrcbb3vvxc5v625lol0teylg7icgz7tvhzt3pbashzxz5sdf9epqt2i09adumillr482znnbwi4f1zsxdmzh548a43zmzw6cn6rtiuvxwraxjs2gm3g9syegpzt0vxkbmii5bth8t1jnksvsqfx40n2c54p88lmps58b1xae8r0g8mzl6yk6klyefsdc8idgwfmpr1ykt7i5p6pxrvu18fo2pebevnh3agoxehmktn5m3ei5zllkdgcum3vvzj0c1v8merl6jxmqkf9w0uuc5n26ecn9t8ak4lbiy6kul32hi0t9cskioiicn7oiir34mhutykj6jjc3tuacvr3h3baed5l5g9krs1nte2csiyc2eqthd0ob1y3imhkmlye8urnaszfe3v2y6ubr1mlk9v0h8znf1s9aape90xll1yrh7rqinwdbqtdag18mkfg1x1z3nu5m7osxkjer97fnfkdq7wit8ca9krmueivgv18hgr51xn5eelx0yq2',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateModule.id).toStrictEqual('b00d592f-7ab1-4fbc-b25c-731dfed3dd59');
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
                    id: '94451b17-7b3c-4ebf-bde8-2419dfb99b7d'
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
                    id: 'b00d592f-7ab1-4fbc-b25c-731dfed3dd59'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteModuleById.id).toStrictEqual('b00d592f-7ab1-4fbc-b25c-731dfed3dd59');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});