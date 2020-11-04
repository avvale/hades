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
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '5hzzo75i44ipj8tzqn30d00bj8nidyptgxesdvi4fs46qzoq1s',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: '3ft75xsss60k24yea4dg',
                channelHash: 'wh4g26vfhylht4aiezon0oy43sn6gqmxcrotvvn3',
                channelParty: 'jr1bc8ffoycuplql8xvuq8k2it9fsnhs3tbu0ev6j3dji3fx0qtdncjirrdhq4p2dx5ixqby4vxzx18waqwhwpusy79ew2ru4se21vh99ygdi5yezz2nsko9qt49qbzmuiruwhuft6efhumsqa1zhls2t6bm8xuk',
                channelComponent: 'tae12yxq81ziy6sc6qzkdyr3b2h3h25oe1ugb58okua2egqnd6uldwz6lxlyd1v3fewpc1cpr4fi5w1shotma3yd3qlyv8sl43cxfba498yjawxj4aaiinij9g10bg3s4ue2smou6l4z041s9500mwxn18m6en0r',
                channelName: '0lspyalv6w1wgyedzhrjgle8ufidlve6mhhjhkvyscndymf0p6c5dc0xv6xkc4k030rrvgr7j74bmvqx608ue4xcgi674mwvk894qm1o2kmqh4ngsjb6m3l1qsz4t3tsaa1iotmt7vhdm4v4s4uu4d0izxa0dgkf',
                flowHash: 'siorxghwtc9o7ru6p2i8e4kz2uhm51whu5s4wpl9',
                flowParty: 'cftrpaxaqccxk381glf3776ca6fdf9cch3dg10f592dbs3uwg233mp8c5ctyiy4l12s0zzuwxcnby8to3peyum49la5x469dsxqfk95wldw7kh9wrolxpd3rxye83ojqar1t45enosstz5zyqxgbiyt0756mkra3',
                flowReceiverParty: '2stxnz6g31a6pk23jrlfdp50y2ad67szyz4nnh84v2a8g4ip1zenvtof8ytrqiu1hxxp10kcjeub34jh0c0uaaankseuhxeemcqnrlrs29ash745ggnqr4zrwz5ej0yor7mt3xd76ftlnt0ty235wkq9mtzo9958',
                flowComponent: 'jdkncdy4nl43le2f9teyt9iogxjkfjpdtzozotjz82key89iej3nmmoc3gn17nez0cxdhvxkbt5eljxbkq9hjg3vwr8tdkpt1lj9tt1u8mt35732f3iw0huhdv0jor5f56ec73j8pdm6nhg5xr3c6dbpq2zbbzve',
                flowReceiverComponent: 'gea2mgj34e03e61b80pydkufe0wmrv7j3xyruxgfxhh4on6ibkhww9y4eiz5vxezfemkuj6j37s8fm4x0s63xm9wsiswf67n6mzyvrysibubtrfabqip1w4yb4ul1d0tvdxdxziv2om94ljv6sm6ujw30fkvbb9v',
                flowInterfaceName: 't5ec41k1jtfh1w2sk85owzoitwtbvoqgohhq5km2lamjp6yfuyeeapty7vw986qe3nsd15csxa7y33uzxr4wd5k7amzm5xbc0hh2wbr91voudsv3l0sifwu0o5lyub4oozlts7a408y4dqb7qgg72b868ls5yz14',
                flowInterfaceNamespace: 'uekrxt8x6ahts512a9zwurm1azbq10e3lsnzdj28vkv5jnsg1e27bbrcbnnm75kcr0vmkv47nx8mplemr1mba3qj842ngo1e3v8flskfvwi7r213jd4ru4khzyzgutlpwds28htqoklkld2v8z07iqe7qv1xtxei',
                version: 'e3p0w4jqdezrxgasnbek',
                parameterGroup: '7z7z0r9l8xxrmqrbduo0gzacnrhwxglrf3k15gfqo9rhkt3f19sa3pa24zn94l081fom61303viroemuk6v2eklxvexi0mc4iys1ohopwuxu8kemr8tnr1mf3iph1ih3f6xy68g2zov499icgitfjbnxlfuohq2ehywrfryk0y6ui9eadkjkig98u5z6ummsm1vbzn7ahv71crii7djnaydgx9lfq85723k61i9cqoj1f4yplcicvgzu25xi0yf',
                name: '3adr3d3a0u45w0yhtj9a85arfdf61scctx9nk6h5v3zlxf2sc7hklof4i0rjl3km5idchh243lo116r28s9sptqe8tr825cls2svbugjgzg3lmgb93u1zp37rqg2y5iy5ezib7jfg9wiwxgo8uotuf6lsxvpeefpkjibs618hunj2c0raob49snemkb7x55b9rgicn8ghqdsj07m3udt22d769ofavnj1pcvzbc833unjr12iy4kljo55nus8w010ar09licq65dt5anvb25r8dhnhnxkyl1pt1hf3d44qf3obgi1a52nr8vm0dvxkym',
                parameterName: 'iczmp2dpgz2ogcjl9v2i83pzfpg7if6r1eanksgxuu6s3or68ghhw0pslt943xwf2xckg148gte6sv7i93eec7t6ey72n7m8borte2z9rnguq0pt0yvt607azrnl4ecq2grwq5qn9js4v9cx2ohmla6t4yxf2455eum6se89kvrb8bvupr4j84qfwfavp1p8g9961wic8ikit8qs5vy86s52sunxn05n7lhgu1rgoltr3bcotu6cnzm2gc90wdm1v4jk12ztncf3o3glfu5azg4pn9myxbmghzikys0tce99u34v4epsxj8fxrvgr6nr',
                parameterValue: 'c3o529mn7e0m8d6fc2nwns7ednqbwbh6xi4e8spom8hiuhe0vtc7u3hej7iwcxozbuujxmzzqmpihpgpv6r6f6wu44tygdvszsiuk6576aweuj2o4crmev9tvemnoch5acvgl9i0k3zaaq5czyd5stnuz7ayydgj3ze7nbar5pni7y6ra1g5j3frhvpvjm6wdjomfz1ofufmdwcbf4vjamrdidp625r1qpjywp9nqzd7u6jhz8m81q9ppjnn03uxtfbyzlgzqrxnzd92ufvmt4ntosz2e1bza47u85ogxwkpjt5dkm83jtk047iurc6m7nrbdd4bfxwblwcv4z3v59f2cb4riq7nyt2q2s2ofa5vukc4iytbb5qo2dv4nlh1ezseh1brbkc6l831by93lg0p2lwaze7ge06ml1ybim8fasr0wsy499szn9bg3d3z4rzs6aehxid5a4m8btqjhqy6giw5m0uns1vhb295iooi5mkq0kzkw1qgzcnygq1l65vnhk567u8461mb14ck64lsck1d65w2ob3ob5sj5ufw2i2dd2dtbng73hmyjgp9xf1dylbupywamrvog8f8s8nao50oubjyung0ludwh94730ztq6lo5171x2x5x8z329a213kixcslcc8t9ulmjjvkxs8hva0e5ko9k19puti3xxijrddcuzrt6nidyyersygdivhc7ymjhndqq9cuexykcx6nvy44yh7awytgsj45hn5uemit00tkvdei4odv5bkvsfqo9obkndg5kxx93z94ovh3fa5rx4j368u8ear2gxybpi85wgy5569xgb0xhxj7rqeag185fp67cfn8n9wcrrv7cizx6k9c4qichaj5ay98h4rzfthg360yfnfe8vi5nq8s4azfr5k7bjircd2s66vgrecj5czwob7in6cyj84erkr2qiwts6xjo43va3v4xbcv5t4vwxmm34wx0jmbkut7xsr373zzcijfez8gyon6e2lml3zfy06o1tdk9bzmh0znimryuhdl51qkoy54jeffhpu0dvb3y22gj41eo65mktoxzmd24b1hbsjq442z5migy8luofuplrkslez2ucrw9jl3dnstf0fb6vt7d2owebeugbkdimvlthb4lkzorihq0quxp39sc6li8flz8tcbzwz1mmq4ka92sqen7wh3yifnp98l718loscyacdig3hwdh8ixkp32u71pwozz4aky5cxpcrprift1agn63yej5f3s5k7sabjqknmfinowbywsivvre892iwsibgvgetn0xgdw20hgbrwsdj0jsgerqvk9nm6gcxy5s9n190xral4cv306yach5jjdw3qozsxefo2pu77hij3aj7oxatwse2egg7wdkrckdoxhfop87d8wj9hwe9yu5pnpzmh8ivni2b2wdndfjfglv773yyym2uzbw3y8tpawqai53wga2v3qg84qnztlbb65ufbpkwlh1uycchmqdfc2kp0be631llcx7r4as62lsivmbqbv0bw5rzjjuo6r7iw94bb7a3h1p9qfygzfxnc615o80bdiu3oyltr9kby8p865lj66gu66mmme4pqt2o9wbhk7wdzzahq7t36n9wdl11dekkctpfj0dnrw14vck96egjqmk0hhz38p5topkhexdto53oy8pyat62lajw8bol05gxg6ayun6lnyihu0774ytj4monyx0giwci0un1bmzukvdxp1l6mw6o0uuv5shuad2fx6nidk8gaoiug9coxjz7jywywl2nhqhi6kujo6nome6jqgrdoofliadjrn1u8rdk5dlx6qe40mbhtj80s1tcbc5bbbpic8lnb0l7s0h3uyqxrp0ce96jgxrgqyc1y3uowj9dkolxrkob9lgovd866im1hy82thqpone496uviyb17f4tdn6ugtn51n957r7p9g4t6tnuxahliamhrgonh7v5hsmnv1cszzqs6ssezv52qu114zngpvx7x5cxavhtok4sedmv3uswe1btb',
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
                
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'ig8skqlsngdn1q0tmra91z0evhaularehjw0n52xtuiznxm6q9',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: '87l8axxetr86950nhuqh',
                channelHash: 'siwjxsjsxiqzibyvv8i5udj9ahcasy1lmemrz9jd',
                channelParty: 'ac4jxhm5fh6g8sj30mcke86ipt8gypu0dofu07hu7towj3wdfxaz66hep2buydyhva3fylsedzy8crd9sfwvnm4c77p0eau1a06ewggvyt04dq3gztuclsky3grbe3d596tfkpftzz0xdg4qaokocta8ksbkn064',
                channelComponent: '98znn63fs9iviiq6mwss60bvspdze5yew5ae625dkszjo81fa4qmk0u2zto0twmnet424xfdy489608eem2wfogjj6uxp9jscfch586xnqcgrkw33n35wrqlx3008nhkohlhyxda0lc0ympl2w74nfaif2z7wuyk',
                channelName: 'oxsl4ojbtsjv1vfyz1f0jq4gcm2c02faf5yu3exi1zi8mnyl690qmii7xfuduq93s64l52ndb748aiblbtq1gptglzzvfbk406p4bokj13ynszi4u33lxdin1iuc3bnpfzyerr4jj7gbcrcgrcm3ihbtsxhhrtoa',
                flowHash: 'tn2f3dmb27sa9rk25dza3p27p0a82zy8klf464zz',
                flowParty: '8j3kth535xiw65jkv1boet3ryaulamg8usedqqyqlfk33q4m1ywhqns5x92xvdn3janr1o38h37v2i4nqc3zx9urfdymeygrfkeitva6nv9wgkylvw9sk94snbddjaijrrsmybyg30c1p3nb37dq0mf7ze9ca76e',
                flowReceiverParty: '6snm3k6fhpjsogxtycgvypxqlxel8dyysp3xtt2qrzauoglmqah7pzyp7pdsh5kx7vp4ojf7j7ovq2tna5y2dgy380lblseclrsgi8z3znpjcdubq8uluo1ffvhl83k0jv86vtby1ras1rx1bojc06aqmk712uw5',
                flowComponent: 'x2zv4ptj53fkbohz9onycro3cf5ke49wmhjeta4p4q5ax6x8rgspv3n133uwui68fqu6g61fvv1yzllrqrn1ccy24wodr25ebsgpdphzzi07bqs46iw198mzx93gc5dxebrln9uhgw88eaxt47b515wwyx97o5pu',
                flowReceiverComponent: 'krpja0gqb1uy63zx27uxhtpqsnulc7ghx1uizanham3g3a60iegydtcn82ojujcbbiw36ph67px3le82tyykfnofanu10efu50wiw14cyjt6804z99xp4kv39p26e2mwxtstj1vikf894kqbqgoehzswopdt1qjp',
                flowInterfaceName: 'my4l614bg89sb6fwlybc5cb1xke6bdr81o1871imkbqb5m0pxxygtdry7x0eollqocr8d1o2da0gi7jm9cmwu2zg4oc327d6js3gdjtjueudnwlht7kfg1a1kzcx7qgyhs48hwrp4pdq5xwau140mmm2kfym6k30',
                flowInterfaceNamespace: 'g4mu02xze7c9c9u1ebt8frw8kh7jzlk1tfeyv7kak7mo1eynv5jspg10p7bctv3zve7yun4rg75bcuonsx0l51g7d68i0eca09t443tn28grn59f5tyfcf0o0gjgemsy2jbfc71zghmlf1oriqrusale53jhkbzv',
                version: 'x364pcwidiz822rhkmtn',
                parameterGroup: 'wfc20hwxfniu4bwpiy8rxotgcrtmyh05doe446ikozuknslfi4571l310ej3acrfqpto96mvuiraxu50hirrzkxh528ze65a0s18ib0v9273ds0igx9nlqani5syyvy29zdcwvfdyz8ak4xmhuqv3i12h5jwey6bek5h64u0x32gm6nv1j6jrmft7x6rqztpy2m7kuvs8v3yz4bqyzwohl8ttp1x4vgylemsb4dht2zs61dlrzlytng6bly857j',
                name: 'bb7mtss42fbumhp11i1vop0axgh1dcvhyzv3jiy2e5bfg1zqu0zqgq2p8jeja5b8wbpr782k7oyyavrumlt8u83e6z5xaw6zhtmzun4cvmsmvg7o3a8x54xyfy8zzw1s7ednz79jpeat1xjvh7bieirltcni1wcg569ejgji8zvuxj0xblysenh8xkyrhz9uqv3po7fa2a9ymleu8ur781teg22swt8cqjh5dv54ebo27oppuwryll2z2ukc5kw99bswthnqosqr8wsa9rjc9kqo068hjysnpxinqm31bnjm0jmlj7soqfkys9wgrzrw',
                parameterName: 'vn6qc88p2p7ydphor5r2tlih2grwltc80beog4g4nt29z8esfc7mlis2096abkyi37cddh73ugaidx5fvsiach3swqc1o79rqp7wewp1tvjn040x664jcjv81dg2kcsatk5m53bp900tuqvimime5hp0n2fsw3pfx8bptgbtv3u9pmxnypjpwtuthswqibxwo8gefi84pogyod0nxwsv3aauf7wa1qzdjwf2v8wa2qsf6ga9h618a5t7kl6sbs9tmxsoq0suvgx51ig481u5uh7h30ijrow3s8387z4st9q1e6fzbv0vgtkql3dfa6td',
                parameterValue: 'mv39qbfp8m08hatvyu7rrgtl34a01t87j80oq8x831dw2rr66d4oq7d5easz1luh2j7hu26rc008155ebcu0cuqn79u93xucbzkauusx7ue3j97qy82v4213ltr1kouqt015s0312z1z9g3ztj8rzksehuewb9mqpogk17vzpig77b48e0myon416o59gukqaez9748jmgzaapite10uypqje8jt257l6to1xelh0uv2t6969huqfg7gb65idtv64k33rbhx5adhhepvrccz9u9emoymba865xohd90pd0adzz10i0eyjwu9v01nkmsdem3ksxwbav4jrfd3t3i5xj3ugx8sawmkvgova8i724joacjuwx8ecjwff87tc1mjyk3msf7zssnhba81wslyk5a2p7g9v4eqmgyu9kbybj66kgqp25ubf85ork1x8qw0t8hunosn41rb7nr5lyq14g8gnrhzmqez07gx6efaoyyouhxym5602xpbw9iryce38ahe38m5ltyu6f0o1paxwvmg473iz82m9diy306ft7pay9up1qz5w4c10sn665ggwy9jxccwspl85hsetbosdrk1dm0abytdj9sytzuxp42937wt8l5247xlgovxg4r3yc2bwp4j2tuig9rpmytq5yclct0end7oq64s2xox633wwx6olqawnw1k55x4eyhgll1wdbu7te5nepebmuz523x1qux6wfse7ezyn05v1ysv7p8n1g206t5caxkn68rveob3m8bt95tnto93koaungcsnbra1g9t06frgg5hx0og0n6vn2t43nf3wpff082gpmma2da3r0ssbhevar8vs2fuyghjscz53cgxb036lvcrurxf0mpg655euqtgrmhbdm4ke0sie29sohsh1hord14blf2hbj1n04zvr417m4d7vmpbal7nx99h6bccibentrgxggbtjkjoiidys84yx6jw4ww5wmgsaanlubud3o39kb88kad5c7mi0zubhrcpfbap16cc5x4nxja50339x27aa6wubvcjdgyk12gkmof7m41g3zp4kvbaz5enu2yz1f5b8f89u6iatibze3fiyukjllhn77o8vitd36cqezdzy5cmxmetqtroauqh6bxoynhquj2r00eyobruqdj74eso9513zcpp69vyl7nzqrhqle89luy3179b39n3ox958vt5gedpms5ftd1iggr34jvw6khdpiq72fzt1y7ous9ic2k1ldpdvd5ditcw5z396y0qwd1mlivdzsuiqe3ho6ftokzoff8z1ih5exyz3jvlglzwdqngfelhpeir86pthmdzx88rs5p2hsytbt958etw6t0p6bah6kkhk5iz2vp3nybe4x70pewckuti4zv2v39b53ltubdykzwl3a0kbvmqomiieidd9kqwh8zp7qmmv995uptnnc1sijno4299fw6uwi4bcrmxbdeh2ndbrcujhwwdnmarwqbww9kfcftdt1jog76ssmyxmxmts4q2azx005j2oxiww94rzlk6fby3lme8cnydbt4hy7bhiohvpe6gg3cl2nsmhhkbba02pp4e8epzx34i7pvpu4tul4zck9hx53l8r6khwjgw1h2nxbyponsz3f9310nogrpslq3q88n4pydprugzax9b6khqk37ls4tnx22ha0te4x61zl52tfkzqa9n0qmkwsfeh3v8z6e75o510gzz2j85y2sd1njw27vt326t6dvf2kj43sjkr3rojpu7t3tiafcyjbus4ck1hz66shtw2eixpfr4wfguc159lpqb5dh2t6m7yrjxn7x6bl31872fnr7lqax63xl6riqeabh513pt4f3buqh09ywl6uoa8k06sklhu6i3vwqw73a2mkphpe7x4dwa1lmlgceuyivykrao9hbru0m3tc2o0v0f7sc2utl6mot0zrx4rqzzngfukjfnh6su7k3jnxxudqnkjfqbs25ladqfqnbksrd4qkdjzd6pnjh841jwd0s08p82r2am',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: null,
                tenantCode: '9qlsj53ixmna8bkuz6evc9ib2oqcedkrmateyyncu5fqcaekjw',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'hoa2o5glptjpu14hz7ig',
                channelHash: 'b4gsdm4hnx8cea3wlm6fpzw9bvd0flwhqvxep5am',
                channelParty: '9jp0mnrp76ujzm83eu678bkrnv4whevangmewp4fgq1h0yg2qnqywh0vyvaee0909yh39eix62kpj5ws5sdceyj3t43tm7v7lid11ibpn5xni7ju2skwgxfdxcsigqb86nna2rcqavi91b0uyvl2jyzz8zsjpw94',
                channelComponent: 'c1384drnco4rqauexjgezhss3f4y21av54pugo15jzor0v01f7t8bblazujebfswsbj2pez2sovdqti9buif9f4z3k8x2yq5nuhro8q8fk02bxjr3r4yyiylcrct2vzn0p451b99u12u5tikt3r11h4q67bbjmie',
                channelName: 'ejyyfsehoj886aljikb36hz0evzk2pn7yck0whiov172ij8dtj6u69aqiiv8ijx9kz1uic1a7pup92vtwctino1865zactfpnmdbiqlofq0mghikhfvhpbil5bf1avzxixhaq8uonbskmexblr69nsyd1pvu4hmu',
                flowHash: '7k9q2wyx30lnlnlqgx2pl11vq60gv0lnn1jxm35a',
                flowParty: 'umkz9kfeq10nv7n5hrbtldsxplo5jxqd29z80jd0ejqyejlynk5iaqdcy3oy6o65uukd4wpu6gseijdd3depspepqacsy7x4fe9rw11zcz6aaea7zj67t2cxsnr0kfuaso0fq7jr3uiyymgc6c73sfytu3k8amio',
                flowReceiverParty: 'hll7emuw0ekrt1tc8rm9s18aa3esykwwawf6g68ysn967wr95j5v2hqgabpca5uwhssyrth0pt5fl6f3ie97s6yzzn8u82u94ssmmij49xpffvxkv3musqw0pn45e7w9vagqo87furemxhsi19zgjf0ucpyu7825',
                flowComponent: 'fn8vdysqn2jlxcoah1hg9s3dd0vq37hbslsuz509kp8lori21j56kl2u0lc7db3f209bszifqa6nzzsonf7zdfb54e6jmorwy2acl7rga7pugmag6d2qxhttzrmz7tgvqoiax36w5sqsonscgis4dn9jmpz8l91k',
                flowReceiverComponent: 'durtzxu2ad0bwp6bsd08hfu81jce0z3cbffbg946bxzzf8iv06ma1bvjdlapdrh3g1n6awlwzisueh6rcstt7qf404iu2c4ponevh1811zo74vw3rakhbj096e4mjra9msnm1nt4z0gvztbllysg54wdy3bdoaxk',
                flowInterfaceName: 'wopk4matoqzjpshmv3cc2hju9kxe75f42ymb7u965k3p7yodhe6k4esn9qc7egv3yh8z12w6dym9lxjf4wj67zxaklmfodzcvrih6zkv2xurttucmx2x1bdmdfo0uxzyn9i0lraxlb9zzcav0vhysnkkaiuyd1o8',
                flowInterfaceNamespace: 'm8m6hnl4dx5k2ef43j1cn2g76c9c5fan7xy9cq884oa1q0izj36tt7yp8wyx7lpzly9b7rxvsgxjh3lfs37ej5r5tdo10dzfwb604383qtky4g1j4da33jxbvsehjnt5ywc1rtea89e1pdbbd8k8tmiu75wglxwt',
                version: 'kluxnc3n911ge3src8ry',
                parameterGroup: 'axxx1gxmjscbz9xr9u7fc8e3dsr895r5plbheewv4k1l5u99wcyklxgpoeqiqg0pbkmpe2pheabbo4yoglgx6ez8fnns42oz9r3j4ay4yr195zn4faiqvk1w0t6a5y5cxshr2jslertcchvkwhg2ctoa567dixdrky996me1rly9pyb6lvjmyutt2vteoyg37qkvc8y4ix0wimtgoy9rm8j2oep6jm3l1w5zb2yyevvt4c0hx50jv6ll1n6r7sn',
                name: '35kkm32iwrc2psw7nnbwbjjpo3vwugr8jxtn62ultonmsuxli4r8qedmrv6a22kw7j3hcbvpqd57qovt37di9gkw2syn6n4qx5eq9ve7jex3vn65lwkw2eq3ywp5oeyp08c9ru3t6zakygyfqhfc8l7r4m053lirgwxlp15jjjq9ns4quy91gu90tlljhts7db4zrpi345st8dr7emv116rfg21nucdx15vip1xexooy2fvds3wnp2a9tm9hkbnzfu9y9qngq22cxr7zvmybayzy9xj9ywihu944n6luwhzrgbml4a38v2wdy8g4q929',
                parameterName: '16cu9go2thri3ib1ywdnbcl8ee0zv2ms5avu1xg2n3dogclazdamnzllo2l1konetnvn2xx43m4no90erfetebd5kbs0kev2qtet5h9w8sqw6vskd82711wqcvv28db6x6a4gm64buhpjq76xhlw50p6ug61u6cg5mvl04y7scuh0hd7qj86d7i2r1t8thqpkmtmbknhnt81y8isuiawuwe93nw74pa0zpb74a02qnzam250vwanqxw8ffq3n7wd9t2n7jouskit6k3caw51utm9di3y0fbxck7wdfqx10b5irz73f2nfdyoassoaqvz',
                parameterValue: 'a8vypvv6ohpukyofn468muq4giyd4086p2cvxg116jn8xltr0wjzll0dvgyw3gbdwduwdzer798lt7p93pldv49ayrfbhs8b8jcjx2law8vfoxhgk4nyc60rg0mz6okkscv3tx4gn2xz5pwvkccjpbvmrayx1k9qqvqv8zk8s99i0h1jffhpwonvwgw5uq3x7ylyqm0o7yzp0xmlfznrg77vaf7qq11g4xmmduzvoo9433t2yao8ro1llltlcq9egjz31myky167w8x7mwb9d3mfjf61jwwjr58nx34pnpyf4o9vm8zdz4qqt715s401gzoq1kyj2qqt9ecu0wvz0v6i715rk5guxif8vz7g80z2ohll7cj7938jofz2mnuxoebpjvg4z2hqcuor7r7k87fmlmbo79sypd75mo50r8n1pux4wtmslv5uxrwjd2b9c8y0oqqr7w238rrehiwnzojg8iipgs5atd89c6kcttv0wtuxfwqzsuo28r82we02uhpdhvm6jebnjookvwx8h190t6eujaf6ke63qyxdtorujfaedrlhqorguz9km1kmkmgft4p752855mzg4a3suewym27lre86ae0dz896g065bc6rqqoc6hjhphxfhjib63bvzm7mrkc7vetig97d0n5bnmhq3dizcw8pxp4w2ghp2v80mvp5i8f6exjgs0xzbp2fou1dvfnl88shrf95jc0fu8qem7kuzc4mci14759diexqg5wtot0yebouhhlnsmg0uw8yvlbdu5u1xq5l2sil3a9m2rqoc5qltu4vjzw3qjutbroyjc40k0q0jcublwph6ze900uror7uyubl1nexpqm3iuxymh9ffhk087c55ojopwaudud5ojos2u6xtyb46jacuissxjl2aixqp4ptokiv2c6ppkjqk8t4dg6yf7uzyjz6s1okgivm8sjebt9g5hxt1nu51kqtl39cv5zs22gdzzzl9ry0awycl6qoa15cl90x152ggwaxlq69y3fq8y0uxp6om253oicyv1vlhoprfvo7uuuuji7e4qvy8yt20qdgevqqkeobzqxjo82g8v7vf6s0hxy89373vnnbgw66ci2qr6705da221z851ojalw9r0ne2bqs8jce9rs956e93bfsd51bhyoq9qsrdv2z3ix4fd2pguurzc3gjglt7g01d9sme55u9qmq893b944cnewvps3n97hz62uk6mxm15eekib30a2f1iovjbgzifb4pfenbiz8t51ag8y5w54156jk0eo94fl6nzraoqd13qaj8c2nbb5c0r1w8csgf3dcnsjixncpn4wybtytbh3m5g6oqa2sz46neqz4f9qqyslzpuq3vqhibkxmyxr70lsejjgh0czvrhtpwxpym69kbw259d5nso47vtsu9jle3w5ahpr7bp6r4vrg8g93w494s7wn5hvmfv4k3rb6xqy0vj43w8c8crc0vsv103w78i0huza63a9v67b2vw93xsel26vp0khcxu405mephb8r8afpn7zb13oykvnxxpaxqiysm1siuzttl2r60tws7iwfqxq9s5ap25189kmpdouyrt6xlkw6w3csm0tscmst2ezc5t97xmhciyiumzqy71qw0pcrff3zxnzyywsxewvvrj8flcmsed7bwb8lor077in2i59tj17x9vvhuqd89bc19u6bk5l7bvpvk652dodga52d42ojnnsaek3dvhxowe7ab25iolmw523nq2uy1iifbyhq587lo685kmk70u86lg4ejw6iqd4b1eo8izkmkfouuoqtfmra1z8kvptx3pctgk9ndce0fzn4pfq7xc94piutgfmeszamzegs4tg56szncykakvsljvc2y702smytvn4j0nkibwcgh5kd62yuhhvlyeiqt3nf75ui6uhkbyvu6hr1c80jncjxux40s5tvy8bihvdyyub013a8jscbqr2sl11ei161t7bdqgogh2krzyg8d20ozl45p6iejk7cjhw5o2qgauc9',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                
                tenantCode: 'ohtfckby22bzj3sdxg5eefkzlyur6teutzb6sodqmh4kcf6kfr',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'xp6l3s8msr71ne5rwe6y',
                channelHash: '81z46bqqgv9s873uwvg9m0d38d0p6w8taxc570yp',
                channelParty: 'e86ti7h6ka11tntiprbbn3vvuzovb93huqpciy1j14br39g7id5od9uewexhwjwattbybcotgss3j4tun0c3ykqhorybb59zpr7r80qdof83xxeu2nj6doefemqg96yuaczf4k3tszdn528si97nnvjytgrq0v6b',
                channelComponent: 'f11vbkym4izghnqe5rugk6la6c1swxo5sf1mi0vndleeflv3krbumcpjo2jm5imv1c6dlr5k549un8lzjhhenpu4qc56gcb5p5e5osjwbblb7ruzd93tc3v0vwgjdrl4tmh41cl7ao4o0jlj0mezva3tstm2xx8e',
                channelName: 'qrnghw3pbd4yrkzxo51ixmitco6o4uzmfjcuvt9bragh4ub7z3r7lvc5hcs5ry06xl21mwda5pegc881lghcl9uvs1mkv3cqr56mfb5o6fckv7ddesdqv0lqpck35xscypxl76o79aa5satsbcwl1ynk7i3z6vdo',
                flowHash: 'csyaaoqito0w7qyitatciwa9apihqwgs4q6g1srs',
                flowParty: 't3owo3vyjymeitffjh10y9zm064bk3ppwq6voj37q2hww73vlcsuj8pjkihp3dif1hglzjsbhkqkrwu0qstzqmpoujby2uf8vhbhv5wjciuftx2cmmls5l8w7wbnogdx33qnwgogv71uhwu3s8nc276jhbyv47po',
                flowReceiverParty: 'j4zi744c9mad1zv1tgznd12f2ix7sts3srhhgobnsfmgk2id88jrfc4rwz2st9srh15w5o8r3g6pjwathdy8h5ybbvqurdzdqz0zrgek8mg5jd5yubma3ywi26hbij7j2urbeeqbujh70y2zq6clody8belkwwcu',
                flowComponent: '14qq1pnewita23smxlpcrh63ga8u9wjqo9ye8de1j97b8l9j6lqoyy138pyxriwlselkbb99w6e9rzptp75b3uc3yz14ufcgdzvnixggj73y0nrg193ktudwfg2hhw76oejg3n3mftgc74eaytqnzwt4be69ub9q',
                flowReceiverComponent: 'b2e556d2ucbkz3yw3b5f45sagx327c7te6mk9ya9ec19bpwvph5rmvg63a2vw45xhoa3yljpkcd23hj09lqakmbchnddfsfjsweqxytlwqigdswhtt9fnc9twdym54avevxptw57jngf8vju9kq2cumvbh9y2g97',
                flowInterfaceName: 'rqe9nkpuesjejkhnlory87iqy478yyobagyafighoxdxebsby8w9ada7an9zfexjz8gdxzt5hcsfox0hmuz1lemjexcypan455xti00vym8n1hw7vofj09254kpy0rqbcq2cmcoqmvj2lfppe0r74jck79vomwgm',
                flowInterfaceNamespace: 'uyu42e6czxtr5fx5x3l0rk9ki4qk1k783uutul7h6gfw6fk2t3g2cv1p2vud06ozgwqf5fgkwuiwvmjljskrflzqotthmaixjiqnwx0i48nw9aazhs6npegrxv6pnvgp56dpftyuv8nqunqv8me0y43zlilhyzil',
                version: 'r2n799t7w4p0nfxtpo4y',
                parameterGroup: 'hi0qkyaiy5znz0hfenhv38x1f3tnq3m76kwy4bg6vr3qvyd3eexej6b58ttzmdyh1j1ig5oxv53hoos4ifnuahu1gwwc7qltii8yvzhob1ufpdoutga2ra7h6s8v2biij4wzplwsjjevims3l8k1kkgv1hug2jpl416flx3vumvf6b8vcm2h0lqx1qef4pca7x7ltu75indvda7xj62vxqd5xzfgasvowe5i3h1dhhw8c565k2slpu3oml97s9e',
                name: '5xs4nxsip2d19k4ug6tbvj8cel8t4q851bikz7gsx3i7qy20cipnw8nvgqrppdjviwuczm2h7hioumprtikrugcmmr3b1sff2kshehdlgiw9tarxni0lo536ibng938jm3i3wa2jw9fmfkrz0qoamp1akz5o71y1kbcv3628g7yb5j7rkg7vdx0co7tbr3avps9srxh4xedx95s91ru0cw4umketw3ovzvy4c4dh86u5v1lsitjaekowarnkmty8gl4dbn088bfx9rir0zeeqfn8m32etd27nrfvzpnjw7oix69ay1sc5ypvdntmu0mg',
                parameterName: 'vquy19u7lw44tbzuf0a5vqi61wiz8plwcrsghiiqdl8l2z1y4rx0tye0wu3m331v8m4f3bd4d26b3t93b7qgeg6ylyx5t04hdlcyntj84gjnxxspikvcwlh2wicxgmf5z6o50mbij21b9fb4rmvbzb70bdylhmj3tyd5w227pi65ouq06sjemzs99hrjlhylmfp7oxoenidq1xumcm0ozu3admyk11on66sjkmjejc2jc44cke9j1zyfc6tshxplcsisb185q1mfupkfi1afdnog7aum4ojux3ihy9x70sctghyfmknahvtpltwywuqa',
                parameterValue: '69x5u8ggig5x5ts5ly4v4pwoqceziweywkxu4e0a0bmwsowcin3799b6cp9s6zp2a78mkderfqq7cjwe81su1q514rslr8nlmxur5kcx9vqqtdt1lapk71mv3c0gmpcygon8l8thp5sjr1z2mwx9t8yegr9vdsrxp54ojqqobdgsr7mmvt2ytfc1gvxmskqnhntyzf54xe2j5a7y71o4jnaqt6tvmp4rcbt5yzhym2ffsbx5wjv54qaluwc79l7tawfx3oodjg5mn90i5zdvsw5v88a38zk7cggi0bz0c4kgwvncckxwlts0dc92a4158n4vlyl1mapdxncd6ufjf3hwyq4c1b9bjb5x37ui4r4j97arsymysw1xoj2d76k3h7b7i3315rc5m1enu4hrk3awpwodzgz6aca2v3imahxr77a92soguovrxago8jql0ihpl1gmotyyozk1yy9me7s4lneqcg8yxu4ro9cx0v32loq29nyxfifxzjrsfedn1u565xbbnirmk7qkuojdti0ii19gzqprsxt1m2ts7utrbfxm1rlp5wfkxc8zi02jfkkhwnmgq6qtjsi8xwd30im0mzifnll0rmpspie6bv6gc3xsl59hs95l4x0dk5ogf2xhbasqv5i68v4lavfrs8194usms4bne542utvrs2d7cvyuaiqgsnxfz398bsz7fcudkyjpe9soldbpvaq8tau819z3fjjhrvdq42o0f80c4b2m6ly7ilscpjq7pjxd34ynt1dotwemcuy8db80ves2yjg9mg4vo214na41kb1l0l5wy736cfavvjb3e7bnc2tzhk92hnw8c4iajr3fdc1xh7vbhdu8jxvdnicsc9bdiywr4uexe7psz2527hnc2ohepn8ov65hs9v89uquz7dnbx21xznh3gij2bfqi0lek8b819im6oapz2d5foczdri7llvmy22yughymjob9dcys4stey7rv37ti37nxfu4489xa5we7x8271e2xk4x8mbkl0wg7mx8svw0z967vjnboe5cijr5rwls2284gzz4bvqc65smpdgfbqaciphwatvmdds60eqyqaobb4tgzzlgufzn80ee7fti6fhsh9w7t49r796z9hv827ep1zbelz9cepdxr3j1q8sdef2kysvp2jcvn25qt6t5q6alvvf1adp4auskkjgtq8skxxuqw4snj7fdvqxki8c5ostvgse7nz5iawuiwq77m9f415l7u39zz6cv8zxz577fcp8nzksmebv06fnfuvwfkobfmjgtmsvoq457f41xxxmdhdp6kc4p44d3wbh7xft2uxinwthcjfjf6eqcfemen7iii9jjt835172zzr3s0df99srzv9w5pgczmb8tf698taannact0th4eu4hefh3udmn9hvpyc9q41bbq2i07gjn523dooszij0n5nv35az81e1ezjsmmirm39av1cyqlek2osyd6vrly1ed90j3bgux7pkdd3v1dpwslrpbd6b8q1sn6hw940z9x3mjxfvdtf2xukxvzndv8cjse07pjl334y4dfanpn23v6i1hlqxkuxrjneatw2tw9k9ay2oh5hwh6592f86frpum9ynkuwrb3vfx74s968ey7tsy5yhs4m3xjjltshaw14pptclxzluxhuqv233vkwh1wv2r4m3dxtskvwgvowqbrdso7ctsazyt5vvr6xlew6q2q13i5wix18mrksc8w09pnlyhzxz6r5vvd5wv35kftvwagver5eqi9da4l6swsicaswjtyiamkw1kp6uzinf43uziogaekdb67lxjnoystjo9bx3hiyyupdy2twfkmevyfro4xyv4b6uc6uh2fr6y526g2lehduw9d6thctidujrxofdiq0prbahd8axq9nj6qnrahnl0gbmqxk2sxjuo8bz7ntsheen7duo8hawedcxn5vn1u0jpcfuuo28u0zrjg53wmg31qnwd7ma0u6wqzef0e5rx1xifjkhzyxoip8ahqvafdj8m',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: null,
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'amfzp6zb7gp6x2avn0km',
                channelHash: 'h05864m7awxhdjhuf6qo5t73ofced6s0o3v4duxh',
                channelParty: 'kjs52d9yiqyo0xjcbug71fny7s4z9iua79bjzo4jfu8ay2y4vidis1busf0uha8diqk28f9w5t4dptnci8x6i7o20qondxre3a2nn7661nvwb4u3p28wngzb6pyeaw3cbh7afh5j2ihxc7envxwwriw9vaglviex',
                channelComponent: '7c2k31yqk4oknjobh0fgcalu79xadjeb833qywgyi350acc9pxs8yjfvqy73kn6driif6ocjp0vz0ek57g5zrmq29wxsxfis72leubnblzooa36cw8k5fbupauk178xl2jfpgqdmlnjp1q4cyufh5zbh1w8fqx5j',
                channelName: 'gr8itvh2uy9uhp4turl3wxja6ojmtakvxu7ger6oh3v7nh0asznvf7xaj34onghxnjgeu5lyaxzq1tuo0gjrb3pktq54i2t3znq37uhjc17cilvdzx1kn6vkw2eplv01s8arnbwr13a0d8b154o9ih1ohqej5xrp',
                flowHash: 'y975x47cy77jc4eh89f1yqdlxb8rae1ny3jg1r7n',
                flowParty: '1hbu49c7uht95eebqjql3v14q5vs0va9zl7yud534mypft4h1b33lv88byujuc2oj2rcjz5f4eqy71v9hs4hpudxlqgg6crh4q9qwjps6qmowqpwedqccylhmq9f2wf1p2dkxke9fittw65w5th9bq7lyxjwr3uw',
                flowReceiverParty: 'co8cl4e22ej9ne935tu69xxf6vnuwl0e976hdru89vvhp999bivsbhuqvo347xqufotvelnyfc2aohvqyrzogllmbz3br2rfxfus9zes9t72mi2gzxuarx9jofyzwd74hr11luu01ewrsm0kut110qeekl1ol3q9',
                flowComponent: 'yrhfl48k2tpv9ml1yp6ylafqfqr60hgf9et9q0e0ypzlqfqkfeuoig72u3t60pmxuumkg4y2auzvriaus9rk4obeevuvx0tdohb7g4ricbr950xlhb4wpxdto65fyxrxaryxpg12aouf7jcvgq29odhqhdipttf6',
                flowReceiverComponent: '0jo1q2f3xwjigqfx1pfqgce0sy5fj15f8dswdh3acvhpqa43983or8qi2ezwhp55e36xccybt5e0ks5nn8nk3jttw3lc96i10v9t1gv9ynpxjhq43j8yrgppq3dl3lcd393s6hxmmcjuzbi13z0tqts2agfufba6',
                flowInterfaceName: 'cpthkdb2ptabv75r4agyc8ksl0p3zim5vxck4qltuhc19mnh5eky1phstsd05cuacey34cxyaboiace12ywo44c82oyadt9cra55220mvq0exfh6246k6fubzlub6v0fanw3qse1hg1guj3ng0rn47r98h6ouvk1',
                flowInterfaceNamespace: 'ye5kfbeijxurr9ov03f9znbux0buxybc66zy17tantji4aboe59nck5kpd0fykwiohmfol1xrno4bziu3mwvvv5rux9gb6lkxuatvczx0onj9yty2wwcwnuail88ra3iu3n7voo3c588yhmmnw0s19dk7wdssy8e',
                version: '5h8k77fudmt5qxyh2lid',
                parameterGroup: '3lli99nub7f0eoycjzy0y0o2n9wm29c9y0fc0r5z5pin5bh304fb04u4tgpnzt3wfqt54pqhu8wc8k8vn3jllmjg6rkxbil4brhx346rywl10b719qj8qpo7m1hmkhuopvr5kikwgjs5smfggjgiou61854ej0v8lzgfejs0zu9p9bzjzvpnyylicusyfn2ui3r5s4ba98a583wg6thqqtrectnpdv0vplwfjacfwh5jgnv7sfpk0xr80k30xjy',
                name: 'mfbuhrnmpndsu1wpekmfqvxn30yrct0aryd6scn9pqs6mu7z1259udeemzvy16ozmgtv8auty4uk6z2iuuut4heqqjtdlxw435tas4qbfxhdm16z22v7cgkyp8udu7ns16nodqcsx3lk16h8k3mw9m3fqkncqne7g5kzfvhcmzg1htav6c48qjrsigby96v0tr583invs5ep8v7hszx1rfd4o1cmqwuk335xpoo8cseemb5mas6y61y36wwx6wnpcwdaykkzq2k78a1qs1ip9g26m0hs1w61f1fin1w7ebor6amm1kb9gkvvmfilq8e1',
                parameterName: 'eh5u444wcj9mlry5toqet3thfmthyv834zfwhomty5gwgh9u7pkaum8iqk8sa00sih5nxes2pggx23xz5yt9ew0u3g7fo4pqehy8h4808emah5sg3opkfaeg6xzqy2e82pn1lw2ipgrbawlo16pu79joxgidjvgkf9gcfn1eb6oamdjrpcfpg8jqkqtrz39zdsfscel3v6erd0emv2wag3lbtxzsim7wdnpbsugvjrwqd0xo0vy74vj0buyjc87c82kik6r2c1tkgbepk7w4p7soa9j5wepnyr3mswte36vaimzz3ibcj4q6pray6t77',
                parameterValue: 'aop8ezxsageku7gj7bor2ptl0zdkz46aql9fefpie6o3gr6rpin9uom4wqoydrn77y4s8s222ncgin48udipfa2gmxbq335g1ve6u327nsclklm8odw9k1jgqaz5rj9zm9npve3q416kzjo82s5m40wo45112xvs714szylemye0n4cfve6rlkaw45dvzf6sot9hlzfhr5dc3hen3a2zymwt4wnmh2a36fkszz8zsfdqi9901x1wbhossj6upklhbied1zuar5xptqite1q1rhlhce2uv3jpkn6wm2u2w2mz181zrr2vgsyc300mp68sg0wd24m1zc7nw2kf2gfv2ixf1xtww6hn6gau5dnwt5gghl7xkih3mbsk4wvjwrdsceca6q4chkz4y2lcayzslg0n8dqdui85oic6smc23amxsayufjt43swlxsnsnq5whhdbzw2adpaotlvs8ktzbgjl2ry7tf967n0megozbjcpxiocr46fwori4w41gdlclyhcdd17rn2vuauh6kb786e6j266v1e376qwkpp4tjywirdh6lvb9adjdmuat54er3iejj9czsz399tme4c5pqoonpmevjjb1vmqgsz25u3qb4tce81hcq4hv2bok2pzn8re2ihe4x74zfzcxqdp8llnbo749kori1swixsu383cypcxt8nmxnyb8ntn61nfkrqslp9h0bg8718mybq1da1jhvxk8e3n7q9pcvbwvhflnexxrj3yfea9tkb7mtegu594kdyrot5b3gurvaqwk61pxlxo6ce75nswobi20wvf3562mmjmzc84p361vm4tmyszeilalwclze14js360mta9e1oditucs64lf5t775vwlk83xlawsy2ymdeke83fktxgjfn66ftcpl76o1a1gmvtdlzpijmfdo413w0r1j43lo7zy4gsymfekevrlkng3t01lg1qdj4di0pd7s0y504ccq5ssqare9jxg63vcar2loknwc5urdps4ffq5gngnfgx92qy6l35kyv3p2wxo9px6n2fgr4irtqaleqik2a8kgmkf8rni5bbc6ptrvyba509xf04fy1t39qlvzw4e1ggp1t12bunshkrg6pjzym6a6qao6rk9cemhu6y8qajiuxpxbfmm96kihqgnk1tpl9lo2oqkujp2pcdhtzg3gv7wjwl4axpdg8u4pstnrajjqrm88zh42rgdusx1dqmunavi1u5ke5hktextk2x18fsxqj4hs2v1zx1wwbv2g0u9jp0nmwsd8imf14rgjxbk7uc8ceyo5onumvwfgmhnsb9ai2z6s9ziojrk6iek7tejiva3a2o5lstbi301gmcgyxbsatoiw055zete6exwvwmbhawzx3veothwmbuin3xz9pef8az5r6ho2pf0jlx1xk5rbhyoofhucvzjyqil9akt7vhfzz3lir0e4a2arcne300hoihc9n3lwoyc9dudhfb78rvfubsvkdjof48405iwij29excr8cmzn16s95gjy039829w2lcoyv535b4l9jyvuafkuica0w8y3fefqabeombjbxof1zcemra76bs2bm4t3ehemgbd4wkfgbpfr8528i6p2kj34gf9qhi3uwmyrou6qq82xzuop9l1htcm9gy6vgeajflykuwf6jjxjzd1ssq5qhy7n1cfcvgotvvoqdegyfkly1skl8uxnnx6dq5ba5ujhiftp6o4yciavsqoxrpnspfuyc6tivlqtdglwpzf0sjd596mz21r2ihb7t151f1alnstae9zb4uz7l3lobrhqezu20jy2il9hdff3cl5zzkazi27t55das99gx1qivlg2auq76m4mf6q0pxmlq5zc97s5l7cnnlc6jy4x25aruxzzhxl9z62fe0qoke6lcqtd1p3sq0twu1lt7h1xozx679ompq9nmqwum0sjwud6rgj4bvc2wz3wg95b9ww3bf8yt1ixwba16kk5y58utbc3xixxcgrrlto8vxswe1m11ic6jrwqh1r0c',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'hk95ozgcjnlxjzjwb7ry',
                channelHash: 'w3rt7xduaj544ws1qk3axgck1oxsvjhwnh32cc88',
                channelParty: 'i78ws0fcpsxe164lyyn1cuf2c4nfge4j67z9k075jm3n450wqqwdtsfhro4q77u0iqln346qne3p5vr3jee1y9jlfi2fqr4asw7ghaet4ikq1oa7h0c28b94sksilfse87giwdaw3sx445lltb5blh7vzzulzbod',
                channelComponent: 'vsxnsudefqqyyineiwhfvwooezpskshukolvpe3ev0hkkntsh0nomwgjn112lmp4nu74jxdpm86a1cplnvxvfz9haqlw29dgbw84qgx5sejozi9f4p3z5omtdpi70zjcrft4kfabhh68k4ojb0x2wltqktc86wod',
                channelName: 'xqxi2nn0eufyr1356aceimsct7hxrzd7frjr31to3i286uklva2go9lma0vkqgqcq05ws5zjhc7qm8owjkqqr9jwo8qqrmpz3yzppfut4dx37vzpk43afpvkgzl120zkwmf9bvaa9ihbn437d5mo43m44draqody',
                flowHash: 'qsfochprgvjpbx6jlbsxb0495qfi23yo4g5dwe68',
                flowParty: '43qxebqokufqxmdwiuolx0z10xuo5b95csw6pq2ejx2dc0mtigek8djv4en3ovube5y0fju5hupiqiahjt225ayctrcwjyqxcnau4shwrnd2ztz6dz43ddwt7f2lnyn3srm9ad4xpjkhkxctqixb2fqpj1q4kig6',
                flowReceiverParty: '2hmpmnbh7il5penky9ij4znxnpiw117f9lrffkxjll4vn29emrf9d4p93drcwsbl0gz87xf6odcp2ytqkclft88ldq51xdjdska54gl4njqlr978ptxwsqfjja6bf2teqfbyet9dml24w6jaj7b1skp45hz4v71u',
                flowComponent: 'parh0xcfi94r8dt1jwn43i4iew7pal1ua0ac3vl7a44h7befu8kbu5m4ilntfhfufsn0nuxfo1p8568ros8kiigmo3xcbhb0oiblpfzs7lef0hyy8b34gz5ica1fjx0ii0nyemlc4e927xc5mo508ae1a1b590gv',
                flowReceiverComponent: '2dyqdtxsa1zlt7hc2wb2e2fuvh1he7pqcafeu0jj02jkxg3nedo76my8pukvw7y2aj6cjwd33l15q96ygb75k48yzzgcuoa0ojxw51qoubn5878vztouvwntzbogaru1c7nlaym0c0q2vikknyme612aslqc7m7k',
                flowInterfaceName: '02qf1fu1lausm7k54ro9ixjt8595ie2eq00crvsv1qlskqucs448i4yqvilo6nv1lexqshcf8hckkqzrja2oejneh8keats503vv58ut33k2ap2bb7017336b2niiy5ldaolqicw1unwg4kt4ppoyucqjwa3hhlk',
                flowInterfaceNamespace: 'mfhp11bhoanhk4btyxgx6eop61thqvsp3h6nki9tnge2odukq2uvc5nckf5t5zsixn3p88w891aorj13p0j8v6yd5q16jmx8u4iq0g7o6pyaerwreky2j4fbxmyj25m4wm430xxy7kbf5e79s89awwshram4p2m9',
                version: '9ci6tw7byv20l83uer2w',
                parameterGroup: 'kjfxgtklq2qrpmjomp39a10jgy69xt1h1obcx7z4w0udbbdp7zlcecp8hmnxgk1w0e5gukthign96pvwtlo5pe37kn7ujy5amnxmk3oh9trdh1z1ojodn4k5mthx2llw9oiwigywio173ry34oc2w9iyfydofu2c0wszhhrw3s7d0dldyaw52yzomoi8fdtxtotgdp9ixpjka9xscax4mt7kymvwb7n8jt1070oyagu2kklhoue4z5bnv27dxcm',
                name: '73sr0s5ove33fgki17e4f72rhb359l6ojzpxqfhpmkut35ravx5c7ems31wxnzzibxa9mfty14vdh1ih0a985rscagv52vx3hwiyirk6paz3ms4dkvbb283u2dqpwc0ohn4bqy0b41fsqhijzz6yxfu4x3s6q0m5l2gi3nq9ja10n0bs19sftlht9w8fs1nh3a2zttdx7atnc1w44gn4x5l7p9jdiakad41blt7pej1usi1yv13jrmcbewuhzbikh1dpslumelano573nxem4u9e6olhc1sabo0rhhypqp9aj8cbvz679nj4muczria9',
                parameterName: 't5kcsn5ba9cv8g4a3idi913bcr652n78cj8nt9zmxknc78f9hur96msoxah3fb4xved7ea8w9z45kwtaxu6nm3qhh672kde3vh0pgmyjwzfkque5bw7skcl0va3yfkgz41c35cobnoinwc3uk1thpske2pl4ysxeonbztvznp7hluvvjfj6pbqbouub05fdjyp3throwoum1ap7ti7myezpadu0lntvg4vne6t640a2i7qow3qs14zjtyocvkilugonm5pm5633n7hpjhl6y9iwr2tcbsydy42fkpx454053g9hmqj0yel2haafnhz6u',
                parameterValue: '66ui8jyyvlfxxsaut9gmpek0l3obitpbkrgka1ayq7rv3uqr72uqsmpkz1cgt8kztsi1601r38uq7kh9bqycntvd55twkk3n3yemdz3eeu1ye5qui2n0o5ep9r972ohejq14f5qlq9b95r0jglw24q5rkuzuysbrtk4mnnhvamde48l0tbuuh4z5z5mh21nleg6q149wf76s4tytfwg9olwi4myh1tqixj9vp4rgyilm724f8o9sgri8wdpetf2ffegl707n17pwku2za6go2xtsxts6xrb07zyqerdlmxpze9icp2ys5j0q7uyz6plorpgbnzqn2ak11hl40t4r6ejee1t9xdax9pycgcidh1i39ysey5lnri4e8v2mpwojlsrnjhg7snmpa1w5xwdq6evfgqe7zxn4qt1unj4fykzcaxp5lxadd86e5tgx24vl9rckf1n1vwnifujy4o1or53oslp2u6xsrlkbu6l1qp1w9p7qlx1oobz0tlokvw50fabgaabg03s1dal5l2v6v3oki0941w42r0hqeljsopdkde024w0hpwe902r7l8sinzltlr0c5c9mk0vokqvbxk676nb67hbxa00crkom64qu9yybemcrthlr9421820lm3n2z9ev6qdbuulfe63y48qpq2fru5tg7rewjvyg9bnxuqf599444d6wssbrkb65jopa5mde8htseqokusr03jk12g3p4fs3bnoqxfirakhhxiomb5whwwb8l7mm2pp5s6uxancpo2g7ps2tmes0uzz2dwbbhwnel3zlaawmiz1g4coak94f0670cgjewp84dpg9embpx1198w784sgtbvnghbrjmynk5bcf39cuudwkl2kpatkr9caygvx6eby4pgodvu8nwp0hk588sm2rf9n080m44m0h6puus4w3mhf4kqyunj8kwc9y0fp277pxlbj86fdhzqtywhkccg5mtaqo3m9v4cdk3cumzc8w4lfkzcvklyf9rgex0wnqeib310yvmpcybcf91hcaxvsscq6nt51tgxyuwfhqdaajckq6m8obtq719s49d07q5tutm8wfczh888jc22w66ayxpmd790el2zgd9owxgnikd3d5l7w18rjyvi89mu8tqv0u9t93cqg4rzhwxnw0f8krg0nl8euggz884aa3v6krkbov7p29r41fdx34q87fdekp4x9jhr52p3624cx1hxxuva4lig41gj7mckcq40xau8dbtkgtrh6epu04zba4prz4z2tft8f6q9f8vl74cpz9guooh6ha5ojbf8z863ijlujlnw50ewmclnhux9s6vq5a46kn653ebssongs1cqlhzqxynj0cwzrhc7l0b16rb85ko3emu6jd2rp9daercu41u02ljvw50upmaki5exxe8w7161kxn459xpkgndqk3wd0ndzfjdm0zd2q1vg9szh9wu1bziaj8ul5qmvuy9w4inxadqqe8nfevas65xn0dhluooohg6fj8t6la2fs1lp50n4k0dn6jnl01y3s6oo1s9xeolgfejuvqsv6totmlltn2q1ccvsh790yzteiyrhpq2io7zz86elq1f8fisigzcseb95cpfhpgrgtlab4byrwj030ntmrh9cyb347byds0fpse0ievpfyh9cb0l5mve7gdp3f9z1i4deg2xentu3q5yhsy2n4jvhvl7tccdenwfpt63a2p7dzej6flzp39zxzpv5biib2qcc59qlma9253n92n5ph7rpqs6xqys0wcawp4r0kuf1vsv2vzyn9yzgo4l0bsn5qjibenujqdmddv6l0v9w9zqxc7xr3xakyxxii2r4zafvsm38kqdfy8v7e52qkiiey7006a6mine16flnf2sixchzoccjqebi6fs6sjlclwszpg63c2nx9arm2awvp8qls31kf5u2cjom80e8dptsj8nikqm1ih7fk1hg7x8sjh9lab29epro2h56ueow71z56k1xsqrux5hqsss4ss4chu3johhb1gvxp',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '491gt9rywpjy1palz73g6o2h71kai917tjkp8dgqx9u3vhtw6a',
                systemId: null,
                systemName: 'sqncapfnmansxauqc6g8',
                channelHash: '47cvi3kww8qbefflgbvaj37ssr1dulpdzjdfoj2p',
                channelParty: 'lln6dorn6lcdjfkwj3dov9mv3tx5vb1mupxyl1j8gdkfv8zgvc14ljawtputlr5fdtm9lhlc4b1pzlq6s96jya0vh06oyaybq1u2ujegeclzazp40ju0jgwxtkibc3h3bj8ip66p3n3ssni6bv8jjykbgnml33fa',
                channelComponent: '5wjhbhvqfdze5a6wrqo57r0e5rpqdtqfljmm9z0keaqaax26jg03y74gd40w835401f2af9qkhej01djvsvi0m7gtpfj0xfx1256q1jswq7i57cdbwgg25lr9zwi10xwnbekkd2ejrhl10if9iyai2nhsol58q6k',
                channelName: 'lwofppaj8tc181t39y0woc41o7ar0jvdycn9emgqfamftxb5zrbnlurrmwceq24olhn4lnzack38m0q0s1nwq340tvnzutg17u754u6kzwk84icliucsa8z40h2iiingvajjpp4oqory624zstio1uohsbuu3k4j',
                flowHash: 'ter0229zsfpodd2zsymp5n54mpv3l9jhq9y4to78',
                flowParty: '1cnucfcfxvxcbq65kcz4i206gsmgq0wmt1pqgdcj4ogrhehto8vvgoxxnj3c2vfbdd1xpa16o6w4lv4sbwtwoqsg6datq38xsthjhsclqnuq48txxvau2uzqx3fzegounyt3f1q8r2xisbsk3clfzfx362haffaa',
                flowReceiverParty: '7agne1ju855xdzxygh4mcxamndcckj2h16ysw1hlc9mbov6k722l6donkfhual6gfjaelackq7fqgvmj1y4xz1axge04a35mzub8ckkt690ktc9y19fx8tmsn2uacbboz8vsr31pisnsq9fn796us9xyqt0lkjwa',
                flowComponent: 'n9bipq41dn92afr69w4b4pjdhz29qoh3jv7pftdsy1krns8cbqzttwo515xxcp067guspssisrizdbcalnuf28ibmtz5aep2u8oqzux1lr8fow32vy6w0hvey6ujh319vr1ooj9k2ln2fzwsvff5hgefwe6kkv0f',
                flowReceiverComponent: '0efqdiydss1jwwwirh3pm8k7uggywdf3etanmxnnnxm33cms03rhf143hbu5z3thatnwlzl652tqpzm623494gh3o088tdur36zjttbcjs2m9ift0c180kjkbsxo7buvlfe748umzutnsl622855gruck3um3fiq',
                flowInterfaceName: 'ajkhb5jrajrccmajm0fifjnjvk837exgbgxztnmih6wz02t74n9d0xu6mjl3fzhgh0umizlk2av0p8xhgxxmj2mhnhzsm24k3q4jukyw78qtij9lit70ts6n6id437kjb7dsl8wmvuv0agqhpgoabta19fikj3vq',
                flowInterfaceNamespace: 'and4dt6uf1jisd62kqxgm4716shg9noziyitq7e71e9vdkzotilqlkcdmedqv3ohh91nip1et3nl39mgfelz8wfgfn9zge0yspw7kc8pbwkqeaqfal4we1k427hxhtl8c0y2eyii9fbco3d5j9fprtcvzdc8fe5c',
                version: 'tx7s72virdr4q2g7vlxa',
                parameterGroup: 'lpnhr09fqcawpniup4nuaemsdwtevs7sa4piuzxuos5phecfonku4gae3lg8yeiy0lyvk1g4s16bdxg8nzme9fx6hlj6eanbwizg37swdczpnsii0b5pg7slkawvk1myewddzlb05s470941joxcvhp71qaqjsrbutwg4nmkjk8sozoaz1u197g6d0pmcc1wkd5mzee5man1signn3ivdiq5nyhjh8oud1kxevs53z78n4p37zjt2xrmxj1ogsz',
                name: 'v8b0q4ark6o0t1no8yx9kdrv9wli858nr2oc5ko5kn54yvs92fsowy4wdsptyy7ogsys6ivao72ob4lyp5fstb6goym6zysn6gkl7249z11zt5dfqfnsv68q5fo2ic6a93u75o1nw60flh1ghtne8lh9liv40x47em7s5swaif0r15yu7e3ns44drstxv76ieomm9944ymk7whfvrjesfhun9ptug76l70xa6snek0phitvx0wjrnmlmog7w8f5tpboatbu8k3qnd3q6ak8imy47ev0b5loptnh9b0wteubpjp83nl094rmex7qnswjp',
                parameterName: '0fpk30sd7y8y76sg9zg7f5xcc6tr3zt3xu90h52uat38aj7rosez9k4xkp1rp6avdm5gkmgdqoly1sihgf3h9cnprklglxa61104d50bm0vu7d7dznc4zocg1fkx2082ujlzjaym3s0hpabfbzvsp0uw5qjk98xu9o6rkmshm9m2ko6di4yazsl8yahcnq2liiu8eue858qu8l8azni7o5yzdc0n2mrg92jbgwu3ldbd5r5pd5zl6wa0mbm3lhui2vdj7zge7iisc5htnp9bofg5bgtrxfg11cmlw9tw0bbupuv45tma0ks1xvwrln9e',
                parameterValue: 'zevgslgcp82g9mb693ddzlpq9itsv1ygnqewahea6ycc79rguy01cyqadybo60ohxllgrbgte1wcswgkvj7t2ao4ufxfa1291ir7wt0d24coe7592anxhwe09khj5whairazhadafwgqbxzbzuxr2nmwsq3w0t6g46crdi6talr9wcobcni3ebaqcsd2pycdk8mhog791775a04bqbjwbg1thn42lzzfsezxjrk8fn2zkgu7xp4d0ovawk0047b052rs9kbdpf8ytf1j2a9fsk94oldot9lur1tfh01qt8cpaoft8k9tz70fyuzobr8mc9dkev9cov29owlrs7mwx0gr6zvetqqpwhfaiodex6v6rk6mx4qur314v72jk94ghoz1wapfaxg0mn8de68vgmw1e8q6fv5evlhvppvuxbe3uqa401ndr8rgnw2isbaz3eruwa3uo2dkg96jvwyt5aimbpvaubmn9ctdjzkb0vut8cgdp443kphhs5kvx4bsqjwwyab96errrlj4byrpwem273jbj8iqrgctvdzoevky8o7i9hap4e5iyi49jpjmbhynhux67tc9k0zxeunygbk6dvsug7517a0qys14ope33ols4die30hbaszoxpprhbny7i3u0d9j3hjoym1t5tltddhmn0do23o5k0k8aw30cmvy3oso2khr9e14b37y5e8kt32c7j9hhzdjnc882dlpawr2wc7zu15ll9iearaus7fecw5qb4fqsx8vdkd7w6gtcue2cmh1gzo7s2nvve28lq0spa0nnhnbu8k4tiaqmn26zsk7x00ie6wbvzi8ctce0xjrkkm0hdqr3vjrkekl656z8ha04ic9o55p4r0ixq2l2uibbap5l1oaruxqd4zohenpiszpbrk2m1fsu7idtqn41fw38xeb1515olyewzrzvjvrioiqbz24sipomowglzc5wd3fpccevn8r8k78pcupx9t3pga89kjpnr6vblskpmdwj2mx5xip7kcnuvden52ozf1c8jff78yh7s495zcr775qr2nfoh5irgy1k7d58xldweqpbcahqp2s0a1wi5tyz813cvj5qhu1z2irxsboq31quqvkk9s3jjhwqgukh8kntdqpbcytpp8kifc8rm5qat4wxcpbx40yx0hb4rlmtktggjt44s8jsb355hl98yuqbrl8edfde9qjyqic6qyoj5s00samx4y7kxk178fcu028nf7y221wsk3a49w1gjenp4g2cxrev7qaov6n6xmrbg7ppmnitazdichpgy8lsiby6r37ux08xo8oljtomzmkj5iqqxh5z9hicg2f6f6lzs7mexutuxl9p1uhogdqnfy6evc12cponvfkt7moxpgdwwcl0isqhtwzdjokz4d9e5vex16sn9fqng3rijpkxr6kh0zt55h7i42mc2irq07y4crk603dohvyqri1eqdcz4rzyx0sfqit886m6nb118wf4e2abu12i8615mji0pdrjca72ldk1mn5quucp45a1l7wruh7ku3y5vefo9afsrrycebjuw66298ozmqs73kxm0myjyifi69qfp9ya6q6c6wzb1eh44y4vkalz81c2fhdn55cesd0iubsd1wiqoc25nynf0bplyfm79bn3hxveyleajk43st9byizeqve32dxiqbxplm6kj9gqjkvyojqkvv9yaza2vslimcsys3nh75ofz6lbb5gpkpx8d6l253uaooucq7utjhkxte2cq6ubker5d24o085dyqx6w0728bhc160d3lcadrq2o0pxl65z455vhdczfm3q81yyfgw0i85jks494smu7xwkiitjvw0tq5mzb2kv1v8jflrj7b36do6omjwid3t6lx575y80kd0ug1t9ugxjlniuvj6lxwsppedpm0capf1e0d0rlkgvttq1koa9v5q2orfc16kav72y89vdkdkd35nvgxd5nb8agct7r1iua4csf8rwbvpf9rvcprq07rgx3x9jkf35to7bjfhke7i',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'gc9b8y0d3u5lyhxw5ux3tl8hg008wa49k826xqwekmq6oro2eh',
                
                systemName: 'xrvf5qh398tcxe88pjtc',
                channelHash: 'nv2py3gnzoyip797nhjvply6llast3ilizilm0w8',
                channelParty: 'nkmhg7siaq9id0ocjg9gmmj53g11i6e24f69ym3zjt40vo1d25ac9lgldt9deh798wamgvydycrfvhabsjzqcanbec0rcvi3rcuo6qjgbij1e97gtbxielc98yg8sdf0tdyfc3u8xp21v6azuuwj28je9cc7eedn',
                channelComponent: 'zg2msd0os6v2gbvye0gwtcq0tmj35u5hd0nco5luwgntqhncm35ttpigxqf5ixafv96zrjtfdj72ph3p9msbxhwyognuxz7s08tgwe5ucjg9twx4z8c9oxv28nqykratiimo72w19l8vlrjkfxiyngg8zt08f68a',
                channelName: 'rvl5ubvrnrki2owjvf3r0224jnxv7gh3qwmsnwi4wxov82ptjyr5yti5bmowuqv7guan66hz8sl1uguda8d7d7ndqe8nmjknpkbn01013w3le98x0q67pkm3j3bbf6gqbbofkh969kamefbb0rerk2ucdfnttce5',
                flowHash: 'b179lb0ye7z1ct4hxvl80thlg1lalvcnoauk8vjj',
                flowParty: 'uru52jrbopna4k057fi3qxm19d4im9iivsu1nas6jmbwhnb40276zx1fle1colsdz0jsi5c0h5zgbdo0gzhnj360z3lcpnsxzro90772ohirj9759tgdp74j2szujtlb9q162n819v1fl2rdnfv9irq1jghwwk7n',
                flowReceiverParty: 'veimy497spmo58u8gauf6q6xcetwerbxmxbt2ttmgs4b4a7u43zd2j7nunj5p9zmftd7s4v4us6kxdxvzzj81hvska78uldhxnx08mzrgix8cb9sv30nmm4lyjgwynj87z09kzb3xx0acfqu8tqj8uup6ogwhvg4',
                flowComponent: 'r1jv260cgfffwz6ceoz26npaavoomvuwbuu5wb0pyuwyzs2x8fsn5m0902a11n00eumv7h2tcze2j0jic6doypbcpuw60r1ur2d0utbdhf5io0e3v4uw44r4c8ue6bskofzimacjjf3maisymvo0s3z1k7qricir',
                flowReceiverComponent: 'g3uxsojziikqmdb4gugjk53eiirtu8eu5emmpo8u2r0wlgiawa8qz6j986f8uotuts8c0ugpcvfvjw70ap7jiznkey0nt77xx76715qnulb3xui6eosyd0n7dcuwwoqgtwyoauxf0u6edq23t6bze8ia96m8kr8a',
                flowInterfaceName: 'or9j7gb78ww2b1bd2zu8ijrhephm79m5meidd9efgk73j0c2apc3jxj7bieejs95otea8up92tpy3eh0yps8c4s1hkia0xd5vcrwfnqewhdbvbu57d2wy4qr2k67ezyofv4o4bht3m3rkhi7wxpes367vgy22joz',
                flowInterfaceNamespace: 'h33wri1gl1s2v6y3m15x8dhl1qbk7sywsyxqdc8e0h9qx2w8hjk5w5zqz0dyyqdw3c9ceh294l52atn1vlsxnn7gw9d5yeu1syoi2p5rz5ugkgm5om4cwf6rwvwcv1thwp4rjda5joo5d4y7t3wfwg7cc0llfnm1',
                version: '9ny1uhmbb64h7i1flzup',
                parameterGroup: '49w5lbnf0h4eeyb4spksaw9wj502q6z8rnb5pdbserqqzigu4rns23calm2oe9gnxrjgcshd2vc4wj2o5hf9l3blaoac7x8h5u4ws0ap46jhpnp8xaj7xv4kgu85oeal19xhz2rfuo09jmp728akwrsx4ug46kkz9sda6ni81kjebn8bizciizuohtjc7tz9kop5wkxea8p2zzcrpsynv8qkhzjuh0bfwsm7pmueurjsacxyed31rk96hxvowqc',
                name: 'wptwdqzdrgq8keuzleyamtbeynbxshv4s2mvdokl1cpwm5ky9bsc90zxx1tmxj1f9co70jjej3995j33l8iarw43n5g7fjborm3njgdo3iq3kyrlqlyx2m7juys3757prh1madrcdq2v2xaaa6anvztnsor3vvqdua648ej9365ql540tjpumo02ph4sdq5r5q69lbu61acg0mi31xtdq28rxfvg6it4rzsez3fu2grmptfdw6mues9cpo0u8ue044df12midg624k6k3finxtk0l3b7a9kdcfj5d83fwbwiu0kgvxjl2s1gs09dqab3',
                parameterName: 'o6i9yzz9e6khrhh2rmygky64xcq7qk025ht4vnz77janmbyhoi0oka20g8noq5xqfau5rrfcu5xhplp7aocsoym143bjfh4gncbvt12rcpjp77iyvptlmdy4p5013b4dlnwte827fl4pxhqkhp1qcds9mt7a4sthrdphsnvig8u8uzruxf7znrhafaps4xac7i7s6p0jybre778ccpww0ycdule3kdpiqz69wv01osh0conij1gqzq75mtktluxsh57kjn1o0jowkyq1y7bvnp85cax9x6s84kigyrbhsfy3z2tzifc7qqz0kpy7q2bn',
                parameterValue: 'ccpv5hqrohn84ofl6hvaak6xk3hrb0hep66k4ne02up31964z0hqazbfq9mtrdinbjox99t9gvqbjvog7t69racvbvnfiptfkj3o73aaxciz8g1o5dy8cq7b65lua3cavzr69edr74xh0vzhygbv3ygax8k4lh7kjjrcy0yv8u3tquo36k9ruonsrph9l0qv4x3ghlfb5v3mid1c15y6qfgqyhf2sisi7i9i4clcvkl4rqhrl40rifq0os8n1dadspd7c968scd39t4sebf21wf2yq05pfyb53jddghn4x6gzicku8pzwdfkp6me3ibv707szbs6uvk6vz341r8a53l1pimjcax8gppu42na65hs6faf96pdbxfwn8l5653al2f33hdwujoe9vhjzeamdn4v2mxwps6x9brhoax0nzotukeukj3bxj4ur8bqkbgh52w9ycsfy2g9j9mpf2coeio0q5f77cewll3n4wfvb9xi5x7s5g85qr62lvbcxw3gxqbafg0zzjmg57g64b8a91jnzn5nwqf7gdhz7xqc3iuhui2s9lo13y6vya7lmliudxqus0hnl9x3z78qllfidu2oygxkr5ssbtmqt1zlco0c1w7mes73qagm2h2jbg01o1ycb2r1igyh7d883ekvgs9lrt8yh0ytxdznapzi2n5muxlbaf93o81if31udfdbwezlbj91iuaergbcrq7bhe39x19q2n1isvl6bynxjpktrhx9s2dsz2r3e94iy34d2kavmnscm1rmi98ny3fclgxmux5elkpxumuykxpnt5a7bp1hsjgqx6ubmrjiu1r2azlmchcc3839cwppr5kf5a7tvztkzoou1yit7r20vf57plvhb5tme486y2vd14zx991b384yo4u96uzhmd0f7cfioquz28zybbhl48epsdtlbz24ymsx9rlzlun5moj2ap327jxxpvxyizzzkws7yu42exhr97fauqjalg0suk9d71npalsf2txzx66jw2rg8nm5hpkamnije62n601m105qs08kmaa3x5hqbipw9eu8yt2kx7p651dzgpjzyywpw51yw5gvvpr2n0hdci31iz04sj403p90n9jfbdeoowf3egvxbwnd9wpbq2fh5ww8jz7kc2s0hbc7gzix6xpzf79mdfey1j7ruamdsqj7flhtbt48n543m8wpqvf32dcrq6pfz69jl85un8npg8f12m5r5fwij74v5yuuxbcj5sn8wjs4fjtfslrcbanarmhip5tt5lwsgpnmscjhmj59hmmmfx8ycc8e4cdf7epgxiklybhpvghx0nmldyefbfce6qwbfjsdfz6iz6g7ppp9xqq0rawgfu352jm88tzor6pqnrqbdom9dtwx4stcj12jdl8dsludumrzsrkd4jst0hk33jdde3y3nc58jdcnzlacm4qp2u3dz17qa0ovnvuhoierrbzqljn0jes6nrgrkslg8lt1d7eytx1vzebcsx8o1vzbed71t48zu7fs9j0fe69fi76sx8pn61p5k8wk3dtn873euvht0np17zsowt7ue2okeeezo2pmfmlk3wh7zdy0qmwmoma9geoix6plnhmoh0jf5u8xj9tfzzbt7xg0kpcqmqcagdg2jdda8iyrnykvi18zc9th4pm8dhfhrywnhj8afa265h5875wyul9qgjpvlu21bejhk6l16ou26ay4u58tvlgycj67mtp7xcj6e1xpdrjuxztlghnncuntql20f4zjb5t754pdnz20yysswr9zkqk9zpx0e9eg7g4r9k3vuw150g9uqm2xi4rrug4ek1idzxaa1ugy65252wutsf5p26jwsz63jvz5ssn7iv0t163o77l5vo5mmw4d9chiihjnon360iwux2k3hky9w7ixwraoh0rhyioslmbz6hd0p9v9hqgb20ownydidxg774188flnj5kxc4wdmkb4o04g5r2vt65bb25w2lzdfb26yud29l693foqx39ydee4pr0fnnxef4o4tbsm',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'g3n34q64xncnyqirx1onhdm2pggvs9cnnx7127wiz654ght0ej',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: null,
                channelHash: 'd6quac26dpbvd8tiziilgln6f5nm4tb0ady91khf',
                channelParty: 'h1p2x5tegdpbymgti07kt4fs9cvnlgj0ck0ssc0467dmqn80psginqfsi9cw25qo9rss5ps8q7ocqdv5m3kqk6bnwudr01w8n7n1vv4xyn757x748tkn9qqdrr5nh4n41ttsotpa4wjn5rgyogpu7p1tk86we37k',
                channelComponent: 'fpvoftmd98xrebx0nsdx1hw6my6nmnfp5w6x0v3svabkmw7cwx3j8i6hb7mhppj8xx6qjontpp6uwipp8bts3qd05f1wx1pi84p77ib42o2dc193g5rud7ualousa7j15fa7bc8ymmhubw0g4w86vphx8iafszzh',
                channelName: 'wz4uahguxsvoyialvzr56c92uyhfrvl0p6sggyng6drpuv795n68x0ytta5biwusbp49g8c45hn4lfxmd72pevcikit5qi8vba6wydq9grvw2hgdjaormekp487bkingofc2vg4n4kgvbd5ezgdzatquadbjv3qo',
                flowHash: 'pa454fxtt9oc1ouf2ucwqhnc8wx8z79uy5p4q1xt',
                flowParty: 'k5se4fd8xnvw99uhpvyd0msrj9i81ug0wlajqnlfb9v0rrucdk8q1jl6zqrjs3edgtk6e2xf5423qq8a4ch7aay5m49is785bleokx302of7pcs6jox79gf8n0y6xav67zridshd3im1qgxq6zwv95gk7xhxyspm',
                flowReceiverParty: '6l9bolti6e93i9bc1mf9gx8g7nuz2vlhxb74wlmk79klruqoy0x3di58a45phbtfrxazso8q6ol74tyj2e1efgxllz42mjcmbn7on2grfrb86dt5nd6tj6sa5iw8vpcaxe6x03zp6u8sw06e5cinv0rdh5t25sgc',
                flowComponent: 'pmzgvjq90eslrs3nmp0ibsv4h1sgde0ed32tqfy7k7cag78scu0mjzmgxicso1b69z6x1a6b4s11q7dlpir3jimyan45086hia37ennzcxzerqghnwi7gma1vwjyzr4u0dau2fv0qyfdau9ut0z3eo9xrih6911o',
                flowReceiverComponent: 'mfw9g72hunu7hkcwjub49qn2cwewiomrgilgluuu8i4d3cv5867j9h6sdomtuwplnhjaum8zy2ptohnw9mxb2i8h52s686q0fcotb6294kwm0skq483i2mmdzyfj6w4pl8nhz9n3kop29062b08ixply6i19co30',
                flowInterfaceName: 'yvomkiv0vtd3b79r5jdwef45wqpwa70ivztglr6q8wc9gve2wa8vea71o6ee9tt3bqhn101ti33q5evp6izg88d3mgfxp5evs4d1lr8uf3awgjzqpo6ij99l0ta6pjwrv7sqqot0vq8ile90vbs69vovbmmque6b',
                flowInterfaceNamespace: 'q8r5glgkub9gr5ttn2qbyv6d1461afsiyud89pn8s1byomwxz20uatl9s8dh79yohsiwdz9odnrgl4b8f21ld4x4xr3w9xkf2b815zyowoc840cvv841vxrr3j9hquh6e8k5av28btjycwjsb0ef22s3gtg7dgvl',
                version: 'tyxvfusuf42pyrp7a7pr',
                parameterGroup: 'szntln5d5ee1dw6xh2id4wjosfvx5uol8nzo3qr1dh2tzrsnbeqy7v9k2ixsn426ofnr695xw6gqvx3382v8bn6eaqubhwhm21x96xbc2fz1z4ypskkgoqs9lnjabo92kg703j9kz7ef19u7onst3iln427fxslbfw60hfloi8gt63mxrwsktepb1d05j9ulf9h77r5z37o5l1trriwa579ymfnfx2vavfiica9a7czmovb7hfuybo9nr3j39rm',
                name: 'oinnirhcv8nyaqbprf8btp9rxstmc5icm06nt4nnssc20t8r75zr1dfkdivpxifeal1nju972a2hgddfvd4ar9w1e0fy6kmuv893uq77431qkrcee2eecw7fqt63j2wh5d4cmpvq8wgma85037j2t4e1hdjh2ixq074kzs3zgo399dpooma3yzqx1ot9bo6qsy16fh8xslw8gxby43m60u6702pszlvilinikmnwgh8ap30i0yh6zr8cfhiws7wq8bhl3ik0cx5gaiuwixx74l5faghxikk15t58x8zrn8f30nkshco519ecq6potjgi',
                parameterName: '2dl1tv154zmhen5ux202zp36uzvn79i71a3362njgelflm1d472ukfo620x5n327mgajg8lh0aqbhja6meiu1lzvply5cmuuvuukytq1hm07vv3esn4qaakah5ln5dt1923pgscapn4rvlg6v9f4ctxlu5zfxfku0zeiatpkv5zb61ererwvusrmcteiohza3okf2zbty30gcy8no0b7lchvueue6wvkm505b4uwfnwt5id8ls601w3d0gpj77rpl82ua49hbhozy48zeiqz5xgjys62erf5233k5v5qmzpogg1vqmfgh7se7p69axcl',
                parameterValue: 'bwtm1csx2itfetxe5c58h4njmukmuv6wuruudwg7wkpvt30j71vqw0qis1ynkkalp0p8t215d2idc9x7ccatniplddqzciu2ecpfwy0jl77av6ewnp1k0zomukngu2xemu42j7cehs9p6gj3tmrt74o3wy280430q02r08kq8tc3kybqr1myt32e78mjvno1bldvdko5xzj54wtrupddnf2r828nn2x5mflau39oxoimjsr4m3tb9p0q9ynsaxxba3gvo8wtbsf7gu8g7ah8ogp1pt9fws9prmluil8r0wh966ubhxz7h2ap22f3gct4gxip31kzivcerr1hemdqnim0q63ftzlznje7lncemet0rtfbt8wsg53iccdv14nygqrqyykcvn3mm1xd955b2vv1w6wms3cda0oa9vs20lng5ikxkvbv8m0981wsm6sdw6icr20i7e1mxbuwibpqba3uxferdm6a4oyyctl2botacj8xlw35t4qk9lcaihc8mug5q9k50gru6gsnc4wyq943fkoup6u34hvjeq1ab82igbyuel6e19r4pdieqfugtf077jit3m19s4v101bkl53ntub053cw8x16htjdfrg2nsf535n0od8lqv338dxdtdlp2yyej4y97mrgq5fqne0mam47x6ohvjvw1ptlo4urso9epzgz6dzbetiaegj1vvdchfby91vf2f8xfuc6f2eav4ampx0unp5jrkqv5nnocr15sn91qsvo4z8wu4bgjr1nf3rl3w62tvz06eu0hn85rcgy73e1y6blgsnnxq96nefs23uxjmak8nrnwdhb1shz409e01u5pber1f4pgdfs3t77xxdisfd6i2uxzqgj80hp4vlasu7t5arlxxedqf6x2p75ssihylugj5ze562bybp67jpvwb7dp68jt05ulu3zih994pv4oayy4z97dahq3nx8znw1ye8craqt4erlfd2o74lw17loc56kxp2kqhp9k4ogvywdwrisrdudphlmg2y1u3e1fw47g3wgomdnm4qhbgh21dd45o4forr03lqtkw8bhrk5x98dxhwhhsa5s4iscaoq7swiuo0d8x0yk3ma49vw2fq0j0z66lu2euyq5u3cfk02cczrp56siccf385d78p84n3isqabtl271ga4ahpl8ir29yv6gvzyp1l390q4g8crt92jjg6005rswzldan2za60hdh4308a2ib50ne8qglzlx8cg2ckx9eqgyc0s8rgm39zd6z77ctars1v7m85ewjva1qk4yivtgsdb049wdtr32pex85jt9q22zrs7h0u3he2nh5z5uaonzx4h0r0hnbxgwz5koap3gictxm0dtdddwsgpvfjp5bf6pws6dbt5tp14ladolywp9za1uw8hbr83hswshz20wtsqcq1p715qm3u4ra910rqh8e8cvlfy6lux8oj6xl3fdyxxx7ehdowznz1fyxvudi3htti6q58b3w4iywk7pjxt7u46tkhh7ta4o0pi94o4zxq9f0gwcgzop46p1slr5q9hz8ipxl8wk2t18x734mp6qs0szxp73bu7xmv43kqacrpldnuzcate3izi9873qc37f6or97anasq2scfsv5vm029arwcglm6umwu08ap6axjroty11jn3iu0svg1y07f3wesvoa22gcs17q2digtgbibpfrz93ytzenmhrh5d0f79z2vy82yy9edpnbz6h6k3kxt37eje2s0wrhpu6hunsm4zwbtoqop6ynb7jrzuqtxjw2out87je0gukmhphijwcgg3sl2dr8fx9qqbfn50wacl25hcazpc29gwjzxx48xc6oxzzvylcnbi2rp4a2yjaks9zeswpbnozt342uh3u6n1jrir5scgkzjf53nxmmp88lqf7w9dudv4bnr7g8xq3i01bj2yu1qny98wlb0rayeyeqkd3ecerylwi4t3eiipbp9j1i8b1ns8atgabt1cy8mx93jgmdmtrp7vney3xy07g2n22ffk1rxu',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'g8x3e3f0a1htto9hvp36gkajrmyk7f2rpbobav8ks9txt0ypz7',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                
                channelHash: 'q499kit4kfenilv7rg2sqen3cy3tda5yrgkivxi4',
                channelParty: '9b762s2fbdpzjcygxteig4m2jxm66ljrt9nm4y1hg6dz369trj8gl25x5ytet5p7syavcs9y26bbovln4pf4lb8f5t81m117l4saik0eb52yqtnqx4e2xj20l85oql5c4825wfjkldm5vz52l2ko548ttlfpyicn',
                channelComponent: '7f690p3kobsk0qbqxwoqne1k1nyi5ran30xs7m1t96sgixpmd328b9bbeh9j6yo2hpszki8rt1ufm66l415fqwjpqldgve32qqq74vnksnxbkfb2jma7fc1k6fmk94xj04s4ssqq958x40tf850fx70esbxzlmr0',
                channelName: 'vncwod8530a6zsw0gmdb5jbul4zao5tnv3gv5swgbzsbalthurwn4is60gw4gczxh7nrrmu2wcwy1aal0dlw2xb0q4a6xsjlzcwb8hg7ik6nuegbeef5lq6x30u8zezor9cxx6izvid9r2wbmwc4sqzv8vhwv7ic',
                flowHash: 'wvvle0k7rb3uzttcoytof8svc7ui0ijy7tmqkp8i',
                flowParty: '9ntknm14rgztn6aqj5p15k1csvpl1mb9yub9sw7rdjudjxkomxopkou1hxmw8sdbl6195pj50c2wchq9t5d0igdivq8w45n2wreoxlayw40ef1ikws81em47vnkhiowt0y8c9dh1lmuqtbp5oprkqlmop0drxsnm',
                flowReceiverParty: 'm2020fwvxrsz5n2x495ec7extlpt0fvrm8li5j3ttelgem5vlb53umpch01x8sik7rnuauk7g54c34b4ty8itx657hsosbskim41z4b0c9ihnlf8t2hwbj9bvoa5fg36t58phslosziljm2xtpklo9rupze8damz',
                flowComponent: 'ugtub38ghvdyfi8hxkqa4nbyorttmtys0mxunw2muy0qz60eflnd9yjr23frrt1ygyx4ccmsj1w5wog7kpvmdgp0d1lnhepdimftkddnpfgmsu5wup1klhxcylk6j8umbc0iwt5j30ctk1p781i2go2p8jf7tnmi',
                flowReceiverComponent: 'ax6jmo0xk4sffqsz2b7xpmewvlq6bd9f4ek37rowopkne0v1hetbkvxrudbqca2gy6jbnywnkmunppdiuw55ipepulffojjz7g5rm6w5ponlot6glwok0rb08k11gxpr47lyqo9iwisylhg3l1upcr5u7wn4iiq2',
                flowInterfaceName: '3oq8n6truxeqb0m8g47woqrdd2b0ilzlqma0af0ixuyycwou59722dxndwllvnhbni14stt2emil93c745p8mqfs4np3pvd0bud14kmpfk1xkjn3jy3kxqg8b2rc6ind2rgcyecs3jc23du4bidln8mhkvokmpo2',
                flowInterfaceNamespace: '3akawqjy3dy62x5lwo0kbam6aozc4oavf0oy15ryvj1vroyfwo9c9fygayyngmhe9ka9dc8iz8zbw19e8k318sronu6xhoa5jj2r1qvixdkk8vhcjzkvnmcoavk84h8vgfmmkh4m073pa5y34blcm2is35wtlah5',
                version: 'qln0l6tnzngz7xwt3c5e',
                parameterGroup: '1ytew1gfh57t3q1fghtxwrbw8tyskvy3jf4y43jss9r58idsmfy7jg1gdngfdpw0fc8z18axp2y88np5gzt12q52rj9znawhil9uwa3gb0lj1xi5bk0dsc1w3kqmeqxxg8megdh57kczk7fbh7d7bmgyv0qwvx3zm9dzd89slxcm09jmtwpxz2acnuji9tbccuwu87x202rf5eys64wmg72nj5ciwl16ku3ysq3twjvnvt2j5wt0ivl6sn2s0jc',
                name: 'nekr3c8oobcm13rqdz8lo6ok2flvo01qx3uznwgjo356ucudz4ngpf2tlu5m6hk3mx85l9yvhp236lvgjmtjch7ip7792aqh9ajwzhgnuh00d23tp7culusshrdogevsz3tw0ojzdlmca3fsrjop8p2schpoe40i9kmel6drqzyzhmfze7wc4g8rdjoktgctq0lj24ewn8kmso2e3483n0svtsifvuk54z5sfhzpct0cqjm9mpoc39rc0u726um0yoz5hcqhvsjgv4meb58bucgebmfgh7yjpuydx5n7hft0mopg6z0vafsgum9u19ac',
                parameterName: '0ml3v183fcm1i36s4maamerq84jyy0imkfi89u7vb0wcd6qjpycpjiime7bjujoy20otxzd1wrz0ocxggiic62zq003xutk27yy5izdkuoyr0tbmwi57oa9oc84zc25wv99b1duo82aqvohkfozux8co1w32jvgu61the6it8605b15lxmzwv3z7p0p6q0ftrqd10hyitad4ykeziczakeqec8474r43ffep5it13neg2k1st2tvu812v1jt129srhqp630azfl19fsfplgbwrz4bxlmr8sgrrbuc69p63c77vmybphtd45j9k9cz1ky',
                parameterValue: '2m6h7vh0bo6vdh0uuvwl24jgmx4j71ydvz9bx4bo3gfn4dca9z3pmm31hvkhg1o4bha2s30vbqjidumlh7myvi6jxjji3tpyw5brsmisrq84rvd5uswkfs8xbbjk7vxxmvskvqpmpgwfeoewkvecsjn49pcso4umpkmw3mcvx79ewfoaafjz9crozqnlhq08h9kwcompncpqctmyas2l3xt7y97d29dgfyvg2gcxo7rmy0dz96lr96uxjuwh42jwbl2few1zvpa29ooyl8gn2vll3nzmrbsn2l2meauzrk0ffw2si6oxnhmxp3qqblo283dz50pv09mokt873j6pemw7o47tumrw4hub8pz8k4o8d44v316z6fmivlk49hc9awt0q827b48qzw9djdpch1mqy7e7lal5vuqgnswcane5h9c3cmkwc465u5uepy5whk02tzbdhr0o1d46ecqdadrxbf32g64a48c7l1rebnjon8easji4eltsiibk2h05uz70fr9c8uwicaw1eh7nbmiw0k9if0eb206wspv1i12qsjhasi9el0ahemhi5003hdmi5j0jxvu0lsscmxegswbdz4n6vlxq26cw7ccswm8udxhhehm5bm3pohr8c4q946e4iqfkqu4scw8yk2l3a7x59xbhgipp8g022d7x7vbqazed7jrwf9rfr2aoki8cmtew5nsdag0u0583ngqa8h48491974pspsdhclyxc0yjsuukkkb6jtjka5agwilsv9sabua5iwkbd372esmdqvm1ggk6zkldpdn5kolndn7a7v7udcvg4ma0xz3q1zmg0sbpeif8q9h6do1omh0h8pwzzknh5owcteamm4vp4v6t7fh73zeifhahs4yxrmp7dcao47bpplbpkq12dnyytj42rf0of3vf0f8t9qjcxjzovy0pf3yi0gterswslec877cnn0rvfn0ql5vq597vdhayu2ezbjzght2qa8ro54bf29ewy4293i3c1am968cxtnqzy6dywy39mdzu1aq9qand1vjktduy39g51x2ukwbhup1ij68k31ck5uri08c907hglpdmly8yuk58u1p8dx70e3hw3x29n33lacalm09hug33u71jnwiz2amma4pdbgvm8lt5cct22whsnaxugcyiisprfn51nqgir2ts9e68kxtkv8u4lms0agjn3i1f7197de2kvcoahjlt06fnuozy833ut0j7qhimh3mf30bioyqbwa2s1tuk9y0brlhofxrsnum520u1j1wziw23qe7gdnk6qp92skc9llg97z4k1axox2244rx84o62c3j8e80fzlxuel80clet71y61ctdzcb9nyuy5yozhnuvgihszzp658m1in0cvb14q4jkeyxff4pyt6e7maxv7a46hhhf6uoqkzfn1ogbfn9p6hel3bklhm9hf634g4dobyht0zysu6vn3j9aqq9x1bsj771gl8lb76jd0pod9na6n9bn32vetr01mxeg4h0qqmnwluyzao78qpen3iuu5wwgpbnjyydl1bdavug5ooefpo0q4zi2pcvhcqxn059y1oxxo8p276ou12d678oc16ui31ptx16w94vxkh1zaylcp9g4pv7p30kxpguewbm13gwo2fjuznjvksxux2wiqfhf5ztube3bhis2q99mczc9p3q6ieck7ioz3c77709b2vdv60haw4e6vngreqxcru1c13s8wtimwdij3d6auphgfdv5wrknvey1k2dgojx733cnjw70ccvalk2yy2fiddpbcx8u7arm6x3q11xh7qxpxsggtc87oy9n6svw0fdmu8uzfnhbisz68a70hferjg3cusrv649quyyx3bj1mosddpu05p5zvp5gub5imljgjuqqguwv57nfl7kn0g6vn6watw7my39dn9ln0jk2mfnk7r4ghjfnvi73g59p0sjd450v5o8wn8ir1zgjp9y3tfhrwmn9l1c74zumx1iwatt2l95g439dkrcbosb4bge45vgm',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'dvumf893amojog0exeywnf1c2o7lqixf4ey34akf60w2ltj1tj',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'zw2bkwteblfti8nf7557',
                channelHash: null,
                channelParty: 'yzzqnmx4xat9n100m6xaw4307gc6aomkb27pwpc1gxbstql2ltqjwtxry9pjh9wzgdx3cohb2jb5swo0m0fedc3sn3m3h2lq216v9hmthjmafmyfut0xmagfoe38aoqlgwv4kgfpedgi6bp4rm4r7qygf9bzze3w',
                channelComponent: 'm724rim3oldh24pr6h7c9792wadday3nfecsnkzokpbctzscndidd94o3ka5ch34tcfn6vn41gotjwbv5aj90sya23br48ji8xqsz2ymyb2dsbf6kgn972k6t79oztsqbpqan3s2hxl1ty0d5u3dascu1qjgrbgy',
                channelName: 'b3t4afpx9yn7usngxmw0wtbba90r7bbryjmqld9ropa39t6g3pmf3s3yn7aczvdvpbho5jwx4y7hva8hs3omv9ltcuocfgydlh2x971or1vmcwks694ihnoqft8ozvnukabp0do36fmc0tsh9menhk41tas121bo',
                flowHash: '6l1y1y1ptclfbvbsmd4c5u67uxp2f54ym6ol4e30',
                flowParty: '1ffo0yxuospt2faeafo5kdeacq8e39jwblgsko8uncgqy12kd3rp8bujfaebzb7kb3xxzyiv9i565cuvwmivak4nygujw4djdfxzbbngrxinu6b7jevctf5y22l7hlzw0fclxzuzjvnyo6l8ntzfza897s43h15b',
                flowReceiverParty: 'uvtkj58m893z0x88kx1nirej3npyqj1eya1iwfanwgj3gyljymvd88deo53eakww15luv190x849tt4uz7ier3f58jwjyvxvtystj2oont5dt75t23kgslc6ulob6h7mmvkbwcajl4zckb3j4pd8i6o6z81ppusk',
                flowComponent: '3c9foquq0e9beqlsyfzmvut0wwkls2l3huo31jl4ywy0czvukcv0p9to7af1npw61bk7h00hthg9zfdve62jm85pj5qzz2cpmnp2c4psvb9osk60jrblbmcnv5fa5r2weujrd4nn9m8mkueau97lemgqq4r5t9gv',
                flowReceiverComponent: 'h3t0cnau4e39prxn42s77vp6ymmjvf8z4vvawoln8juefi4jha6dokzz7uhs4wymjzmos22175pgcxu9462b3q9qubz8lh0uq7qjdtwmzraehmxkyvsr6cq1wop6071wubq6upn07shq9rn9zobwt3bvflqeeeqb',
                flowInterfaceName: 'uw03cfxw16e2wu52xkxvfu7aqp52tzar6hr4joat8ep4z7cykoe9q1cd0lcy77s42ukixhwqj9s37ghi2a245o0wuqo616j1cgmya1xrgdxrmb3793hebqbzp980cb222tgrzzlit06i6emmvj4kp8259l7bzo1g',
                flowInterfaceNamespace: 'n05zh2uyo0qc983vk86830cp5e3xruihvrmcww5wym4m7gsimz6sx3ut94mnqts3nqwwcklf0olsbmd5239fs4omiurd2bnwn87iia69o76jxy9hvyl1c2af421npzzg2r0fsxv6qu6p7viz1gx8sajlx1b5m927',
                version: '3tfhhr5yzxhghi0hwrbt',
                parameterGroup: 'rjkmjp597cqvm7zoioya9i79dn7nyg2mvrn7xwbh4t6iv2ak5mp018dm0b5t9dcs6bqyzauadm8k9dqhb17kvxjyc16oyek7n4w21vk5nf7d0my503wwy2w1j1tli31r0kzxxlvwv9nqvsy60a86h9gycar7xjrnd5ngau75lfh3ehqrsubmrq4mm2qdv7j4bd2rml04lerb9xnqk1s6w9v2kdc20birlqn6x5n2lurk18y8pxcvadfj9gtd3a7',
                name: 'ryif5x6b2pj0ryl2wr9e59ros193ygy1sbxp4srr4lj2p6o6ynfzvrs5qh2ro1nf6sdwlm9auncpkzwwa8pkzboeigfxgoko5iyryo8dtpaqguscjz95amzj02pribz22cm7qvjmyfo3u1upjlcma4vxqe2y2raf8zmnuvd6xjf5nbqa9mwyfem901qpnveleyvmlxe2lmsy1k6lsps2mxjdfdwjpw1arra3bs3hnidwrut4ohuj0bqtg02u3u33rq2h15n9xyblo7ib0zxxlgzzdzv6gh1vygrr9gnnrbsmoyt3ynaetd8x1ehrflo7',
                parameterName: 'lrbq9xet1k6pwyfjhbw01o6w8npa1tn3fkphdey98d56gia83rx0zydi9zskptq5wu08v9ps3ru7pexas3l2cl5b2srlaykzookjrdn31b46dm6ha0iphp9x1elt8mr5gwzai7ga2jdbbcpw3jy8s6ydsx6c7dx16klses79vgy9hkque30tv57h0yy7f8lyj49fxgtir6mczh2z631439ob0dfl82t0tk5kjlpf14lxe6urjfn2g8x0ntoardtwcdyz4arn1rksyh1jnw10syv6k5nln6tf5vbyh6l4xb48wq3vbb3erjff6f90f2i5',
                parameterValue: 'oq503etouma1o3aiibwl7cvxq8tdglhvmtmu31i4dqqyccopnidqwd1y6d9wxlzuqddvlt3uxq458zv8239e0tuf6lz6rjwu3l0k17cdib8l78py8zkl29rp8l3mqafiafjgnqwlgqp0wl41zkvfrqw76e0f585m2mxwdgqq3e6s81geu6rsb1vsqlmsgt4u6qh5llw25cj054lek70iscw3pgnhjsijfl935iztjw7brr3d9sxannmk6dfivpiesqf3v1ms0qf4hq6zdky3d0qdtbbe210ay2wiz6mkqivw83l2zudx87i177h6u4xijb822uzn99y922xxyfu9l3wlvt918vhjmn565cqxaxj7b961eut9ydudwkc1wcan8uyxowkl5gycdvbrc8d2g17ykpd1pty3uzlcj04dpb8905mqoja019tcd3nkrfs6yrhkx4cbyxaenzovyx8p3qnmsir3o5ovw4ejc0bo8oxmgedfu9r6tzsct2vcjz99qgxlm1gqh6eiujg6r9qzm17pal3dh5zckrkem4rgc1p610ux7up7imvq6t5gb6dtkugd0rivvprodzqz3rm27m1usoph083nmw82uh2v0bqemrjj21pc40ecz9e77m3136agvufoetzoek3vu763z2ma8cz6btza6k1hfweodl0ipia6qe985y64zwr5bll31avr7rn833r4o67y0qfa2s5mm9i621sqjjdy0kqy4bm12egqqci7tjkhzkc4u9auvwnwax5cihlxqizp48ncfkq9eevjjlbbx5m37se9g7vqfc7jdrs4mamvmtieg536zyxx5rd8dv55ifz28vebmvbh80yn2wsw5gzj6c4t00b6xmkcw3th3geiqnyto44tsgymx7pf4cmg2n5qgm6t7oq64c1zdz2ejf694jk8jplppb2ofpy0rdlv3h47814w443xmcmtp68ozh0jh9584q3a0m1utsd91660rxs6wceaty5tniixuef6xpjj0zrl6y7myy63gk182k7x2vqxasg6unmey8sqte8m39jcp4z0gmga8sl36axbyx523hyc8tx0yt59i7vgoahzed3c5cif2yh1zxow4rdbb7kh76dh5wv5ruy444vlghg2405ndbg92vryfd0wp1tl2dui0nqg806wsfat6mvw6a7y24gkvja3ayxw1dnuhn9e5z87v6u1xsb1bkeibz62s9zb58j4cg6zmaj96pfuzkb3y7vxaz97f3vmex5d61n44ovgfao0brai43zt2c1m7jr0yylv8235jutkdxsh4njex00vit06ibzqfwissvvn7lco9vqh83ay138secra89jqzjqrzoqy0bmmqb60vx5255d8s6ghj4bxq4cfuxzddhrz4ec2ps1kecffozkucuvkw0vgdtyd71w70ec7979ieife9ow32xndmxgap9w93rd1jqad6081wdp4aqlkz2wvtutrkal6r71655iaybqbubv1ueblaf48iealgtwqll4loyp2sbfag23fzjvhlrv1s8zvepna0j64z76fuzgg6e4wi9wytqb3bt33s4r83zn0hop5ym77maaqvy894r5zsi0nxfsubn2vv2dt2emmwhlqb7gqb1953ptf8brw82q018zktp1y3me5fmen1q0xjn6ev4i8pworjslzmsiwmhydw9wp2oxbkpumisuz1efjv010fhznv5n6bhmnnx076jx1eedei5swa2vx00lh95v1l2zq9da01nbchh02mdiijlp7cxxgl2tp0up4dg8ib7se2ri64xtctovg5i01mi4jkudcg3rgy8pkifrmslo1zzyj6sohenf8jhj0q98c3s6ucfcqzz4pfq9xjurwqbsb1mamnn13iq08mlgparhoysvj7psi9tfmjlzmv7313fywfc58848et5118o0tnybq2xqqdppy9l66te2if412tubhhej0uzs2ks8vrt2cuafooo78hug564i7shval6rd7zalxjwq9h4jmfzw5nuu',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'gxw0s8xeoakv7nsd8ksk9pt6718drnecfcyts5yq6vvdsdo8y1',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: '3gdjfg6wf3noiodadnfi',
                
                channelParty: 'et5u57zb1n0cv0sj5j6mbzhnau195clemkgetb7tcwdwh1issbrwbrfqqpudd5rkjec96b8tpc76hg4mxs2apwj8ey2r9un0j56irp4qfzd4rnhh43h6auk8pb5g9f5l8p38oj3ckobhcbfl6fwxtheoze7u5s97',
                channelComponent: 'ob3inp5d2umu9x0zxlddhon4628xz9av95j9nk4rvilyse5p4fl9kqlleyisldw72k8786v57sb10p8l66d1dknvmqzrrpypo7t30x2xicc1o0qblqwjzxl0azwfpr6vgw60bhz2mv34fu710xi89s9qywsps8fv',
                channelName: 'zo1fuew6gkv43pn8hncpqrx8feznvb28np9jk2mzvtsbi72s17rfd4qyufni76vyqueri1uq13hqegv1f4je5cibiietqw9g79e2aqakf8r3okm3zjf7d7cc949kzjfi32pt50sm7i2a0kw7afa3o8tk5d81q9ln',
                flowHash: 'q73bbf1hqmccgumf86rk5fjmiaweoap1068mc4qp',
                flowParty: '965ln8jfin3yyslzxp4v7z98aokk2u0c5x4jh4y1we94cjhds2l9xh44fzp2hlsb8t7cjtu651u6rketx7i24qqjydtcei3sz0lqg72p3pczs11eqa3jzxke9wu2z4mxqivvbd5sj9rrhqlvezo9y6bmzy421w5v',
                flowReceiverParty: 'wqd7pu54s56fgnt6qkzyqykr99lvhirsoiwuq1bgg9mtkvozo7sko9oup83u2qr7lhcek6wn0gp698q03eteqmx276n9hw3cntjoxmw07vk1jyttt71t4qug8qmrsttj1a70qu3k8bmkykotwvsxpojts1xbu0gv',
                flowComponent: 'e1bpgdcptqxtyhle6wu6t0kb5ac8dr8r3lbicio4thhilzwy0jafteaj3yay8m3fed60yoh0s3nacfr802sfh0geeg43qdxhtka4bmgjsxplbety3t5hy5kjzvv6mk08onnauy87wgnlfabc1kyu1xrhgzs4a1py',
                flowReceiverComponent: 'qhgy9bgjf11hsntdrfzb6ors6xjy8n6sseqd90uc8bfwrjqlyoyz3esmzxqiyqru7mmjyws3vazgfo5mrddj1t17lx9p5ug4bs62wtt385qra3msa14o7dnhtmsoc4fkblkc3ag5m0on6wxnclszups09u8gdk4r',
                flowInterfaceName: 'qky9n6h4n3vi3woj80t3wt447vhn6v4qewt0dp45ja5fp4sl51oe1lzw80xzrohont0q3h94qnohydhclvibv8o8xal5td2u39oov2vls4jqasf8r09ido1inydnvjz2usbmgcwv9zp2pkagau1qs3mr0megocxl',
                flowInterfaceNamespace: '17ozktu48c1j3cymba3xtlk832iqq5l00il66pswrebm0f89hdvfgyyv4uw2xqqcj2tuiojmabn0cygw6zrp7zpf90exaprec5mu9hvnmwrf28ajvtb8epq8yon7kddue3euc6acqk5roupgd9mm4l6v5wce3s17',
                version: 'yddmqwxk8ylvn1tuu0vm',
                parameterGroup: 'kxj9gdvgl14jk4ux4b0erf5ybxx97860uotp4ocv31e5f07oli0r593fx2ucd1f6j36tbd4l9lzr4vawsxy4fjlincx7epcsz2v500bqsi4d6gbfe0amz3jnhdo4yh9w7dz35zqhkqso08t601xjfv8ichv19zbng9ulj4if7j5v2xgtdi5uoi5pu7g46kwtw4krvblkh289rlbwzsm1xxlvd9vx9b5svegoy0568gp3zgtrzuc6a960s6ihspq',
                name: '2nmf8w7lt5k94abzs3q5gfqrfsg80o5suxe08xdvfj1tk35vlrr3ayeact8ejo3j1fbq0581ko3s3hj41zvz5kl0ds48lb10o2qll5gpghpak1he8ot15t6fqir9wjmg4t4c18ojqpj6fbll4d1cag4df2thtk7obzwpui7xp647qatqc9yhxr8b5nu49auxiif1p5j36bdck6pm05glo5du0rcma4wqut8a5pshxp2cl3gqt71ppkxcdtd2xyn9sjy80dpqeha4xxe9aoyknujecp8xqhm2v91nyli4b8ls59ow17gpq4ftgxlmmxgq',
                parameterName: 'd9cd0q90fwd3fk70jw7d66p5c46icvtqrhpmghioxexxb0k8w8su4x5pvy226o8oe0qu9tqiqilo22lprdzdjipzbtyot5mruhmvxaggnblnj2lug0k6vttyfsx7vhocq17s93wfmlc50e6jbfsj3dsduc8xtdoidh03pn41irjgpph5sa1d1lkid2doe7xjqpesimn55zcnd160s7lyavmno0lct5zg1b5yfnqtkm62294v0ixuswsmofzh185ivv5p7gjb87prjkxudde9pnx0kdpzdobnqba1lj8s5j8tq2a1qwtsczaahek3gbir',
                parameterValue: 'vlpudpbiackrlz4m9mtf18kxa4rdbikg16loq3tmw47vepn0d3m2jpjsjr3trcuw7hj5sodmyhmw0k4ahvvh4ev9hbf15ksolao2sb7tk4lxguuiwaug96nbb5m7p5i8aozy6sqbse9v22tg9wctr4c2kzfjcdgq6eow13g7cxd2qp99nszzjasiyn9ohotvf9bo9afrz57eaoqxao437e0vo80akwuhhlmrb2npvv5yd6t6g6avsn0nb0jizfau3fpivy7s8xf6o1ddnjcilgrqfkga1x9xuko9esbiit0y15n4hggv8m03o187zhhooj0edci6isi4umg2tr603k9p1rjbxsil7kn03muxi67r4h0hg2vwwi2yd9wtv47nprffv6k98cucd3ygcgpr6f5mvrhc6n43v1ivf092njgq1un3axlh6kahw4fcaojynfkpro2yaumrsl8yi6aejyk1k020lg3onv09z0cwlq5o42oafsrazey7fn0xi9hr09qi5ewhbdo5l2tv2ihwwdo8hipq5gvsn6coaud10cx1m8jgybfgu1k5g7j47y9jn2as2jctbtc2fyw3iy4haudidywzxbr0x9tno7sk4ifbzb5c8fasnircnuhm5omriz0ybfww1mx95d2obacoitjaq1p09q627ff8j1y0vwpzfq7en3pga6r54lzf4miri96jckzvvv9bewjar4djq8jln5ozqlhpihjw3j86px9jj4297io1nqtvgfbueels86az36wgahbfi38q5otvw1671ttxclonln0fphny9z39d3x3p8gggboceulw3p3lb3kjn7pgpnulld38fi2motissoyb6rh2hey686cofmzazp69d6i5xtw5k1i11aocjv68iichb6vn92zpjlnfjfctamuozw7i04gvwvvkmrw1i8zejok1xs3hbef5bgqeqgtzvp03mxmgz78r1rbq9gpuxjx1g37x7fw2894zzpuz4bpbcnpbwie7m4cz31i25cifq6b9gscdhy3zi6sh62lpg1swppt5cyku54tekxv24avdtsdkpnw20byp7scq9g55u8pq8og756bvpz39u5a12821ai0i3eo7r99eoyj5hu5q7jd9exv1vg46f4siq5xeiqdbde0l6jkxdwjsa1p1o7n7zcr6pyikcq49ncsl8ou1a40jtfyvo5bvd0io4wemj7bnhhycxu5yk6v01mr7k6ea7lmym58rb3ws32rxmoe3qdvpckmww1ochqd9bwiydw2wwh8bvon1kcc39e3ufo6xmb6wufs9pb2vwy9sbh8lms7i1kl9asic8w4cqao2pr1eq9ca6n3fn2yxj508d3zqpzp3ucfngtebwrngsot8sojuilzqj95ouxv4o9ql8fj4xbh7773wkg966etbrma6p6m3z7zbnv3rzkau3pshl8udlfguak3rcv5velbrupcdog2hpfq30tfx8vgxtt3jdk0y2imr5wjxu2j6e1dsqt7da9qcsmxv196n1s16f4phiqz7dzqu61ykxjpdr354rojwxzf9pshej6y7gdx07nsozwiz68zw2094j2wqstpvx6nlaomrzd4mqk1jfpc51axp2npqubjpk4pi79om7nd93ohr5l1m75woejt5mzdbd3krwogl5j53bf3lvvrt79mwjg9nyquix81ksicc86pf8n70a82kdy8fu1d567d9zd1jf78edizptar0eqz3kigwr43pnzlchsyu8tl7ma57pzjcap3otp3pzji0j7j7huqhql8z4xlw5mgqnz3nkel333nlx280yu17wnv9nw0bdr9mu1v7s5wqg9d6ynuf9qhrap0n4tbvh9pw4wcrkncvspnry25pa358rjeybzgnbbimy57xdh6pat2lcrg12mzz23pafg3f3a3f57to89avpj367ns1vo598pzhp45y8o1ue4izfxck5hymmo1rjzw4zg0ssp57xt7slqv9b5rdfxwfsnp4e93ok0uy47nly4sfx5f58o81',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '5sag884by8ab8cfyrb3afehw1lbb7vuuii2yyn0ipfy0op834b',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: '86r923wo4ebwo6scd414',
                channelHash: '4mcz2nwnymm0uw8gsxyj83dvf8clq4c1qjk3ijya',
                channelParty: '1gxfs4o5r5enz07edtzozvqn059qsjt3y7rzkujuc5j86rqlnh78cnd10o17bhfa40hcw6m0kcuoyzm1n5p3ze2i322ck7xqqg2jwkjvod4i5sj195bra6den0ukc5o2u1x3m2ct7pys8ior34xz6c39vj2exyrl',
                channelComponent: null,
                channelName: 'fa6fhdmxlouuore4i3i06ble1ihybcloa9iqqxprwa6s1yye2c2bl8qzc393f34j8rzsd569pvdc43ypeermlxl9id9sdhmm11yqyv1gflg8ykz7td2xhmk2j64icoctczprnd2xafi8zopepk7ir9h1fpq94qqp',
                flowHash: 'k9konszd3t4hedd7edz6xtd35fm5l0wr84k1qcvy',
                flowParty: 's9o0y0c3nbjlcv379c6mnrfh9xubaogba8m0adrn5iwkzuanyov19c2socvqr0a5dubov4r3zqt7iy4lbn4eobc6pb7a3ap3wjjt8wogkabkbuc7b8d14hg3wtbch14urzitdz8t5m2mteos6cytqohk8are103r',
                flowReceiverParty: 'ij6rto0g0bbvhmx84510s6smio0biuuxyvmr6ak3e01jan1lykk8s17nj95ix6xeet18dji5z0styommadmfg3pbdhhumsf4vgcuqbirvvquh5867o5ytv2hmli4g3dezoal211pw0ylvekmxjb1g397mj069awl',
                flowComponent: '54dgn2vkd1387c50pblnd9maz04re95r6tk22ey6kd4ag67j30m770c89c7ucvxztjcq88buz29a84kzyuullbwibr32gunq9oemu3w41ogda9ryl0mwe2snp3fudnx8jv4st6zxg6dx9xcjelvtwj51q9ef85c9',
                flowReceiverComponent: '0wlgwrx2qphj461glx3iylcyjbenft8vm5anoxkbjq429vxn3uuwx6s293q76mey65rc1bg5fvg2urxo0iqzb7hjet181n7p0zdpgzukwu18g3427zingkdtnjedu0vlqqi5yjkgijom3xoxyxskaxe042wsc888',
                flowInterfaceName: 'e7blt1a104c1us76s5p7py9fr7lv1i0kyuugiqazd15le4ef3gt3r2a7suydfxji8oa1oosqqfpf8en4mjahwmdtxyoi12k2iahsgktwg9yrmqnxedrxj40sopsr52af3znvyrws6pjm25capgffkocsqde4opvw',
                flowInterfaceNamespace: 'pd4znhxcsi77solevwnypoqo8rxfe3k5f0eqva7vxg3s4ihqcw8my1gvflonvqrenoefkfe036vnif8g3kz4vxm3i1g4gffyo3wdg5iw7q4omnei06lte6fbbo7nottpnlat45bd7jezp68woqoc4wvthwx9b4oh',
                version: 'fkfy21ngp9tlrtyvsq8f',
                parameterGroup: 'lnlzufhatoo0bycaladekh3v0t5iqodr2tb3vaug8tramk51y54505rllgghwsh3t2sldb8m4ejrofn71l7jr71w1e90k7rga27wjix1tbtxp2zvoz38ytomtxfyt0qfph1e1bhreigl35zodwa4iao92ph678a4sfe4ps1klswelfvdbl4ppdk6ost73asx456sl4k86ugoxfxbkqnkei8e10yz0v6yijpkxf5ykn6e4isyzhhjfxw31b8by2g',
                name: 'szeh7tiulu3mj8qxcdspor0jizdn6u2y6x4o5chmfmbjib1nz2xnug39t2pak2lqow78bj7nd3u8r1wjgm54claaobbrr0gi0cmdyllq5hmoyydywit27f9adwx9qie8l96g02a1o6rrxcqj0extx8pk4fhpapflmxp2co52wmz2wqkl1a1tusr7a6txjemx90ya0zs6y6qni3zmihfrga7p9a9jhphmg6wagmhdyt391x37cv6a1mniybf6eos2mzpdyd2uo77tm7h9nbq3ivb3od1914opchnaur38t7ky2wypqf0wff2hgpspbzgn',
                parameterName: 'mzcqvz0lb9rpo8ybbvqbnte9q0pfz8ncps8v8hjete6mhvjz5t2buedmwqfliw1qk9moxl3szojt2b86cvmp08imqnli4cky3zelxwuv1bd5tnrj3a7115gzbsvocqo72bjbxs7zq2akzqkjq3lsy2zp5ra279f7oywj4aoii9yx7ir6b4zpvktvsc85sorob2lxwb580xfxx4wpdcqwrsjx5cqpnbiiojulqxl3zm5pwpcm12a6vgyk6zdv9a8e2kzq606fiuccpva8hhp37pd1j9mtj8lf09isdxyxkmz4rpncdlez12gxajc95wm0',
                parameterValue: 'jkteq21jcnseqx9gnl9km0cwlnvdyvuduah79czqsnv5n5hv6sb1ol6rqciukluxjbjf086fba6pvz80k70xu2a06p9app1xg7sg8n0mya7z3xfwf20eh6qs9azxiszl4577njq2cshd28jez771n2ljld3t5hst9btea1cuqum71exke5pga4ukjmmlzzkjshbqbraz58axt8dyjjlox2ciqhndy5dgajwhkzqzekhxwp43uwneav2r6n5lyljdnh4wvnekpog6ibntcejz2epjitu5uq3k4c5va95q1ektfdw22lsf159fe1inhrjl6za1i42wkgy56vc8u57fve3t47u745g2vvktkxenyuon390mbb2bj8vfvdv55w31fqqpxcvfthmowg43jxx7jdta8xrt9qrmoxgjc82w8geetwl448w4apqlnx5j09jb3p4sfd96bfbb5ynvswy2me0vf8l03y9ws6fgqnwt6nxpmfiqzsvq48o4g0lop147142x4yoj5gqnup0kkejp3x6s4km8rdpspqslmc1ozi0bkwftxw1ngfpwq67lebt8fgw4w9605xbyc1b2fbfsk165yq61vtkk74wun3mr0oh0y0hstu2crprnk2h8v16xu8ferdnvisxv50pbo2gy0mxpt951m1k9ugno1kazh6ro891p99n6l8l9qbpdz853338ly4pz0pgeg26s88f4lp69m2ikta0lj5fjtvlemmk9szm3va16p4dq3tzli6keg0ew2yc6grq2evyfwwzc9w96znkrzf47tt1wpe8f5bj3vwucpo4kb95u8vulj0b7xu5ksg0th7duuvinjuhu01yxed90yluwzsjxlbere5ij1hpcin9hk9hhvwztyqeugaxjm7p23gx4dkx4zknhv9d0qzl9wx4xzmvfp3i4z7qhbmng5mvc9aaljw9fgg9ztmstxwwz4c4h6vlmklnsnggqyztvzk56tl7wj21955vimr3w66wnvskffg7y53jwuli0a5smuffhwynlb1oxils5jqk5mt8ohwqumgype1sl68yc8q0m1yb51tkuv2p2u861ibsw0ble5ye1d2e3dpvdx3cbeazlc9113z1k9qki82sxe2tsuwoo17mf3jz9us8avp6ox0adhakqllqkfrwbt5e9394ed323yz9mia3tpfnwnaavvrsv1tc53v6vlsd332fiikgrnu6huqoqt4b4d0wsf09o9sgn5ke1ovv340ebh93gvsh6clnk6xc7dqe5gmmfcbmtcd0c3efrw6zq3irr69btoft5w1boq7wgk4iek4u1t9cyb3c4wd771h5bogjtdte7vosmd9ehjhh8649im4ho6dcjrjrb0cy1mjnos5fx2hn60gmbnnfsr7x3lvmvht7nhmoc60ddczm42no5aiorhd8wy2ym2wrxwbxm9k5cznv72t2tx4a4yss4p8fkoiq7qmoql7ao3r83ijlwvq0jyngo5kp90apk8d6kjvlgpv3vsotznhtt6gunbwbg4mxqmsp85ot4kj3vn7t3u21jt8pe4916t6o36x305xt3zr0unagf4a39qse0tbjsbk1ws842c8bejpoe9bs5fwws6fvmnkagyk0cbbt28ongyo0pdfdew70cas6larav0w0h3syo1eoqzivw6ghcym63am45f7p2qh65053r83eo45zhj7l54j2ov69n8yxgkn2l85bk7udh49z3u6xnsozz1lhzcsuhuliduym87rq6e7bjbsvkew7o7tvmo4zdr8cktasdae10cchlsybmittld8ccas1s88qaq87lrsc4b8ldhd3yfycayh2yt09xm42nw81bs92uxiop2onbejql2menk0zeun0qljbpcnslazk4q9kulkhfuab5ysebfj4jja6ufdlch5o2h7w4fb1h5s83eo64ykqloxerkw95xh678k08wz9rn3itmb9w962o4jphiozmbwajf6pdcou1s0lm0bp1cekhh2r1dphw7qhs5as78tja',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'hq2kvy593cractnlhkz7xgc0wqez3e1up2f1hzw7lotvnqooh7',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'ukvtg6aumvo10eqc43xy',
                channelHash: 'jvw7580zuu72xtrehuwbhwgpq4jk7jd7nl2xbbl5',
                channelParty: '1utizmq0ayp96rdx20fwojszx9q03zg13hk6spggpffgpa63vo84z34whyzqojnte5uvgbzirwpmj6tm5t6rn7vl4g683tqmuzzv7en40yfhxxeuv11idi9zlas85jmotap57h98n9xbtub129ifl7hb7ndt8pbd',
                
                channelName: 'lrrqyy1ld4jwbqqzvf45zuq3xgjo76jt8egh7ekbch7eso20l1xodgpgrkuzmc4dfstsyct0jbpdpap1leads46ab2tsljgodb50a06jw28o2z75s26eeuqogek9buq911f3kzwxdzpbbk2l4wnki9i97jvk25de',
                flowHash: 'gzcue669kw7ft3ahhpdbnfsio5gkgvwcwuypn79n',
                flowParty: '98b9hta80jwgjb2m138jo38q9pxxmp19shlqgq8bg4xu3ad78epul4h1lf5wexb8g5lkth0soxme0kku0vk9hzo42q1d8dihroa0vmzinikherrelyykgsjn6d2c8yod8zffkt4333u2p0ch95v2iw11zcptxxw0',
                flowReceiverParty: '9o40fcazkdresgr77mi8cq7nod56gjva59hmq8o3jw1rz30kjqjobkl8owdl9mojl9nwcwbxk5z6r2x4n4yn61l865qv0nhosrlk6rxfsxxlhhmi58yq5ggt7eoj3szauoi08xhjgxzdf3anzydzw91qkqh867nm',
                flowComponent: 'nmuj494qgvg1x51m5qyowy48ssaoykuqt5i0233id0wtvum71bnc5cpa0zqi4a2kx31wv4w3lec5hz2q3jltfdka4wuui56579whv1a7jguczhahqxmepesp3pmh5iam2syej6exynkxgsowaamzhyb7xogl46vk',
                flowReceiverComponent: 'prdzsw3cw1hzz88o3gg8e05j89o2pd0witnticb7vk0paxnxdtwsojfge8swazbv8dcl5jkw5jdcawhyfmhffehu13uebuqlnxt53fnmb7su6reuy5c944xvedb50mwaoun28tmatqgajqn95j406bsekagfzt4n',
                flowInterfaceName: '2lbrbpr9fkh6t1c73e29lcf4ecgpndaqs140idlp9oig7ghw9nivfgu47qip5a7kq7x3q1bqw54379t94uj8jvvhydx0dufyttpbtvlk9qigwawn4okj6tujo43wqdwq8qkgsu2m7gjqophv79jy5869w4eav0vv',
                flowInterfaceNamespace: '6dvqr17wl5d3x7dfzi7t9rniqu0bya1dlv4myj71pz58zp49uiyz46oiyrnaj6lxytpnashu7iasif5n2u9t8q8ivct85hw6cogb566hzaon5sr1y83eyd87ko1aeg1pg809sz4rjs7egwbk5r9o07ilrjkm0w4r',
                version: 'pmc7bnqb3lnn55sn5q4q',
                parameterGroup: '96lup3vxaad49rhvhk2qda16afmwkdpc2rung03dbvpo2y2qg1cfmx0tugp1xwultdm59jyqbqwji9rqybw3ng7dqd1edutlnb5z881aaqra5ugns33nrhksajmqs4bpa06e8kvrb44jd9apmb3zxgpaz9zk0aj0w6iijo5rrl7m9gcrj37ww8y04k4uvnp4i28m4lcucokukw5rq9e313ra39xoakzf6pbfu7q8qhw3jdpk1guxrve1tnch8yy',
                name: 'eyi865tpgojdy7ejj4vw61mkr11rq0l41p2p9fr3tjqq6pd9a6rq7ekej89frug6ptxk4hz3qhyh071n6zmokszthf94cbjjcbv42syi0ci88cof26qibc9wiu765fihollaywrpd4z9culoysypc43bxvzt8px98d8b5pgldxy7e08hnv6z3opm3lz9zk3ww6yw6k9lb524x0wndzouftson696oefmj07nuq5pobq4rer4wzpd82clgpoe1knvqnkw86pjfjtem53i2juc41d0o7mv5kksz4hv93ewy1tuv6e09evp8hxbzb6prxx0',
                parameterName: 'crxtw7w79fx49498i1ay8twyrtn8htwmb7rwemgxuelym02od38qezs571og0qz8d3v1835ikraabn09pbeohcpl4r67wh5v09flzkishr0gk65ubsqztxxii06z199lzuyp7knoe70wyfia5d1smg6bmlgluolksst7yx6023qkzdfpmpnz1hc9876lm7jkfgf7qu7i1o10tm9dg88r2paogamj4rphi3xkxkvigtwceo8bcd4rlqn4u48ztp3txiufr835f2e0c9euwn551ql9vs5vr5xy5d1f66owwhleymmh583viku4sca6ncr9',
                parameterValue: 'x913fk6m6l9a0p5ertnl4gb5b6l91ds4lztj36se6qn4liuxrh4fsh3z09ru9qfdr2f5nhpdbusvzlsqd6o9oq0ka52hlihl23g8qg8lxharp57wtgnk2pfsn7zdicu5tp46pecfgurg5g8fk2su6la2o4ofp37p98bk9bviferude2pbue2x9fsmmiv0hm6oda5xgaaj1usjcmv54dlus311uk67bq623764nqbsx74r0ukg8k3yqg1wp6eed444c66r3sb62yp57woy1mf8bgmchkom0sp9o3bm96936ck62j4frya26l2y0xt276866pmqon1esxgme7y7t5czns61sa4f296ipg0bkpa7sglsrhe06n4vwp3n7jp1qlgt0432yr1ib3n12jinekyvpxf8aq7sl2gyhhmb831at1s2qt5yg7t7ys1gh7id7ocirpbjhar4xlhhidooxg5cx5sv526evfc8rlm2woqyzbo0lrkd9tiqg0ljqqysyszbupjv3vip4rna5it09xk63dw0s6f6fja2seeokpxvgc649grtorfb18huvhyos5akcmetln3olp0g7z38d7d1vzcawgn9edgcflsxv55sel6cmuh36hdgxmiigl5ektp4kmrzwyccnwxk64e0vie7cbc2tllt4arxt9lz43d46ulhjcb93dyo8r7i8d5a3yqm9ihm8yxb7rj6z6aer13b8xp3vdp77ty9f2n6sqdtg0lt5qlktqh166wkctlwgmj3sxmtv1ba4pxsifmhvq8fopsint0alzid8l4i9lb2awazwux683hjhkoaand5qlntr7abc7dawbwhnfjutcpnnpple5mz2kazui12enp6yb80g4bcoe88w2s7k3aax6usz6r7aabz044y1vd6kdy2p6qo3g51jed2pxxng2foop99818wygpryjy6fuhv22cdcjpj5ilmcglx0xr36bn50q4ph6cewew10rgjf8rax8y78t5cuq8iv76lqehzwctcrm13opj2bv5dp1gctwh5e52ku44kcyri1bpptc9bksj9z12ng8swbge3xjc1hs0m0sf928fh4sg9kq7fvf02viediaf7oi9lcnf1x1ltofu1fgjai3ypyuc5ckcc8b8t1on1zn6llmdi66kwuu64avuq0b47quz8mhjusvqhcge9kajwydjtj8uouh1wtqrpiy63xq7twoqixwef31xh08pk9eqivdbayzosnxpegcrv7aql3eb3f7bx10jkjdtsttnghju58t4h75ne8kil4h8vwcddu8un8wzseidnuj4dwnd955p2ickb1kwgujm5ty9f4bi6xx9kcb16n69co72c9izod1p2rsrhhtb3hek3glcwzcp13cv3dv9geqy7eg9b1cy6plpdk4go3g1wgsuhid9r843b0aw7wm6bor1vgpnnqoqnkaqc0fl3vixjv958dg7niqrqlhezoy0aja78hgassaia4twxgrxaojlqbf1x6mlqnxajljjb9hybcygc8y2qt8g4z276jxwqvk6ouoku6fazf0uepfyek96y9q9kmbtk1i231ecknxy3r4zawksorz2w5dy0tsqz726x0s8i5jt8df4tq4tkbk9k656wg0fpo4vf9lzmh76dzlz8o0rs35gbyvsxu2r9vxcmy5suwlh8e10t6da9hfo3olrht6vkoz11y2qdy1el0xvekyxho6rmqps64d7ayu2mzeo6858e7qn6mk45p07omu2t6xelay6k16r8zhfn40hhwm14ajobps533oqpor76wfc270azb4ofom3rxco67llp2cxuzhmqx1fmjq22uv2vyupxb2pmrxtgwjn7mfwrvvi1djl3mt1ku652u1qjgu0mczffat5t58ih2hoq3oy1w37qs5fr3cv6kdgvgx7d35ozip08yfczsct7iqi7mmrf7zxenyrk9awbge6r270tskbs81q2ub0dxcqi0tel91n28o3gqyyyxjp50uq591noagqv6pfxvto2o9o',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '9f5x47d8urdmg6tmz3iyc3foa5ysng234oom61969kymy3j741',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: '7jkb0wta4degw0ulbr8c',
                channelHash: '39cbpuygctzmurylp1uv04njgmf5lj5s1kyi2hgr',
                channelParty: 'k4k3s0ykz40cy7tl46kmegzln5j6s8nd7flxagwvswitianqrqahhf7w6fyiqc9wm86qnujdxtpul8cnwluik2c2sqa9gn5gsag52xpic5e01ouwyqevrag93itx5joaqcmzhx3lyjidit6y9ws4rks54bjrmzww',
                channelComponent: 'v2da71k6iuiws7gqi65h739ztusxeddszsxriz7gj72l3d6rbfdto4tybs1ht8onntfvg5do0xrlm8xzu9jdqc3ww6cuaoqo27tcdsst6er7wj14332r6zpssvckw8ni5pf0wslgo9vaik8hjfm0axc7yrirgj4m',
                channelName: null,
                flowHash: 'ndvbqx0ivge3wc51dgk45qcm5v14mhoz6w89yblt',
                flowParty: '05zhz4wqh3okwvxa4vdj92gzq6n93kb485wchkxza8b7mqf36ytd4il1z7r8p1gw0moesdmvr1tsls9o5aqkqgvzo89t84vdyxa9juymz7zlpcwuube0n7ei1z6p99z8kkvnj74tjbwv9hdne2iuj68d8xtgi3zd',
                flowReceiverParty: 'lpxi6g2ld7r4ewmdgjphx9p1mhl6c1xexh9qklad7y9r1isu3o3gpcfnc9q5exda0b95n2oonwwgcuou8twbeuzrp82ap5uxzn90t6qgvbki1e68inbjz89z7gjs2zmww9ugfsqkkqjg2tmkwa0o7sl1csdbk492',
                flowComponent: '57g4jwwtkhpljq6abi7vmiigcoyr85huh55f0vvpaze7opifg9nedgk1wq3oqiaoh5vipihwgk3t79nil68ugq3gubmlzlikcfuo0yzrkxu2hwvrgystyklgxt1iowovk9e0b9h99ay8z5jq1c0hyb1yr4wu16fj',
                flowReceiverComponent: 'sd8vv0v4j2fpn7ty3cz1hk0ou0v8uf7o8aonf3eki3zmpb14nalympmuwwxyxzvfalhlbsgqov05g7k39efoiqy0n1z5vmuhq5jgwm9xyo6628796zla0l5svzkg5yrf8xfvxtp8ygd230vb6wxwngd1s2cgoi0m',
                flowInterfaceName: '2rdmdrrdqnwj0ylvvdjr92we4mk8q76potqha5mpk4garbrvxkywos7voon5zvo79l3x4u88nc1guds3ic4wgkzz4ahgoxsvdps8n0gyvwu8f9mzaf0i2ihpoq9l6cemcp2vkerumy3fij1d0rgfbzkzftfzkhzz',
                flowInterfaceNamespace: '932eq2onece3yooycr0iclsbfihzr0907mnt4kct7g4f7z1hgopkepwwpiswiflmc6cobbzv1o0xp02yq23bwfzwir5s3gst89fshiil1b6iryss1pr4tdr0o2ed26rkzu7cli7xtjayjz9iewvh6nd51ilahkzo',
                version: '7ts8dxwwpx3672hrz9gg',
                parameterGroup: '0io37o9miuop5mdl7lo2s0283dnz330l67j36ak6m48jjdzlby28vf42wfoq2b7ls2wysuq2k1denf9z8sb4edan9fiax8enyxq0apltfm0n1vdna9on0e90ax2ptggtwz3spp8ca6v9pnyghlwon70abu7o4w2jg5ywymjig5rcyw7c51r553fftbfn6sw78nku8r8j0hgmwvn5af5k5ln549fntttydvag34k4egiqjepubcivpxqdg3lrmy0',
                name: '24pndzcrncaqt4zcp6pvzwglpvdtewwz79vr13462hs28mus5698na8kirxmryyl1z3yj6z3j0p3e9x4vyk8is1wc0zypjxtdjtzsyctowiawauabxj8wty7w0snr2c1475pdq58kajmh4qaui4gomdpwwys7rnh9hdibo9oww4z7tka6c78h2vnqi7s4gtvbidxubbigt0bnz9b7hhvhuo8u8odc0fiyzs8rfpv1sl6suyl17gwo9slor47or6a6uifc69tqjck9cjefpn1c2hwx3lnaedagkzk6tabfwvytisq4rv90p41uh1ts333',
                parameterName: 'eijhcaasc6z72tywrrlkf5u9a6i3ix10d5ouyiq4a40hbd8ir05rz3a5zxash1k70mftar5p83y0ak2lc359xn4dokchspvbfz41dlqz910bonc2n5cgk30bobts2zluo2q8upfbfxor94eyh8v2yf83bs6zvbekfekwuu8dq08umv3kyidfcvxbjfyjiwdsozu2klv3cabacz08kel9kqioq41tv0xg389pbh1i7ub21yyzvggbcckq3ln6d0xwu97x86124zioj6jpk8408npkp7klj9mpwsxrd4ipfipxks28h8ci230g2ss3kpg3',
                parameterValue: 'm3e4wjn4vi2b15lafmmgkpiv2dfv047pkvdqi69cilokc2hnizm0dey02hozaovccztyakrsuiozh97lrv95kti6d10vex5dzfqs36dzhnitst39onxbeppxxodo3bktt77uidae9s8bm3edge4wbaf6vh4avpnqmgvz4n82jbcdmvod7ygs706lv5h38jvjsf852xlfwie67n7dhagyfb4j9lpccsyvzpo42qpcs94s4vmcze98i851nuzmvmyxwh3uok9y5ertp037vpzggb6qgpq72xybab2icxlvs678o08e6bt0mtw1cwdjn6v3sgmosia0jwmm4w0q4mhzgk58mgfxj3pg1y1ft887pa95u2rt14wmxfo7nv7nzneoy65fn7x59cuvv5etann55gvntp8l2z9ejuzvuio5gi3gfoa8cd6hcm5jefew5mziyaoq0xd6jwtxbcuvmtvfu2e251x2n446ij7mwhi3o7y0axihxhr9yz402m6vby23etzzw9x3raj3wjb7xaxh8vmv7neaafncrvgdqsz5ehvxdn7xrdlrywnukd57hf9vqj06ojhwzjduprvi9a261fvudqufhaic45eeiciv6l29ezvwdiklygfj1533ewm46byisgjaq051chie7hqi021yykf25nxfrpasnxpn8cokhv0g9mqnzm6hxn2oljfx5m1puvcd4sq35101710bxif0gyig6bcxezwza03afgo9fx8xc7eddf4yrahnuw05x7m4m543uz7nd3e7y33zmgva6hzhk81xpviscaboupogodfyobirhse5lnvau3x3p0qpfslea4ztx7goh00blfxa9tplsc4yg5ny410n4om8b7vpm83reydvis9e49up55ul368b2sbfyxdchwm2iaecu99910s9qglf5rlokuqdleemz0jd5t89qsypegtwh5b2awlkpfhun3p1mmt9gnreicvvsa9l0qoaep5fkoyoj26kaes721t61qxhu9p06rkgsfg9uqi8vfujrefyfbvu16zb657iofsyffht6o44u0o97exssj4odm45j7rcur1u4e0bmix4e5jfyc8oa9di5ry1tyejtiwx5qf5a62jwzgxp3ee1g0qfp0xcgkc5qbw024hj59v4zdcmgdejqvfej0lfrk7iwcpj34zz5vujychsjrolo5j3tiz6izvkatiz2oppkvf0oory4mda3dbwufe17r13qkqtsvbzi982ac1z0wkkwt0ki20pmd2duzxp1odf826zzuvl9wpmncqocaw1vt8hpltuklo9r0kaoylws01g4h10eflpgm8lv1ecr8lb86a36qj7xytzgdbtqiqbxtvtvrjfntr3j8vnetxoyw04ky64qlg8uvvlbj7aggtqcp7553rhfx8mjlotshlc2cd58jamfil0hrxaiqtbutbuiko0dpi5i0qvv94mttxavli7kkjy5d01teebbxiqm7vruy023ll18z9wnciic5m872q4nopypaywuci4vwa3vdkupwssapq7emgk6dpnzos4t90933vmitzzsjfda1bnhs6p19nijpo05k9m1cpe7fjuziyf102h3mo855nttlttot3ioqx2tdenzhxtf90jcek9a0ec7kzcjto8hy1a7dda1zgiawhp2tl7dhjeg7sn1pt11ow5vgm1l2oil2xfpfl3x455dwtv6yn22pqsq7zb1nq7eq8kfzq7zxl3t1tjpd7jgpzhb00i6w1ti649fl1m4mp8entd3lw5czfrkxnhikz74f3bu42tzcqyn8d6vodh3fqn7rduledu3zmh4ygjhwmtrsidseqjg2pjp6hnvxinpkqa3ueb69ell3tnduudj7rilxo2jhewsdfkmp7e6kyzjd99kfnu1nl5kpr29h198kxm8yyebde352x9kbjnkngrf4y0s5bwut88yhcxuih5wn6v0dh1yejbtuz8b7rj9ohcyr7nqjtkjliofyz4rmcg5ac4050sbxsz70lilzyss4a',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '37z0n91mqowrv085j9pjun06mxqbw5i8wu9kc1xv604h783rgn',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'hoviu1yzq0j5uvrsstys',
                channelHash: 'kybh3wzg4y7c1hw65g1pwrajwa9mhfkpig7x3ve7',
                channelParty: 'hj6gzijregg9wfshg8fmxew5v901c0al71z756h36ym9mmxi55qsc8b6mt2kk8gzpf4ba8gbbi540rp2atak6o2hjijwvdy8f1tavyryzp1smva81f0w1qw8vql3w2yoxcn97wup7rdipzpdxhdksvjx7h0f1e94',
                channelComponent: 'zacfjr33ysc85s0kji4wx709rbwy0fmap7nnrn2fyg3aeljd1s0skulua5zs3ndklurl69i5d7pwa0m0uvk5gwfp34rp0o1hryoj1b0rfwc2v33zhtbvbrz0oup6hv2a13fxp3apneyhwxfjhe7lcl6d8490mqg3',
                
                flowHash: 'z7lmj5ra8o7kpyx5xymzqhv5f1j6kh8x2f93i4ss',
                flowParty: 'otnrmiwgjv40uqr59f4dr716acxtvawdhtmmfjuaq2guwydnlx8pjhob9pf8dj13ugd02gu24xfrpwgftjjlqvuesni68b7jmdqaiwokkxpfaeu3a4jsr0mxggv6i9g4h4fd701ojfoz8ge4l8t8yfyp1j8tsu9f',
                flowReceiverParty: 'euk7uoqdn7n8vfj22ut4lh5tejvdz27sjvqnj60ugnobnk71xh1mnqhgsml06qpmclnqlmst1t6cn5c8hup3p9bw398rp9o5c24kxd6wccx48w5n2mpztnv0p2drjztnlrdcexvuerznxhrwe7a0p27307hme1io',
                flowComponent: 'prr0gn8ybk578952bawp8dtwlhb5gpsl45wuaoqp0gf69i3rov5lni3z9ke368zd1mjjce14o83sy3ugaqdfcky1ch55jlgoq4hzv3wz17wgal4tpwrfasumij9lcq2ss0i1hknibrh2b5gnr2un4xb8b1dnsl67',
                flowReceiverComponent: 'a0ajcz7125y7h46hw879kqwt6x0y39a2c7wrkgdp4w8y0fp8ysnhfpu8r35vnoeeso0fqgn0gxcsghuyopmh4m4rwkqfqd9hi893s07bulqck5yy3pq70ayt0xcz1y3y9rcg74fty49l66qt2duhk1u3invaz9p1',
                flowInterfaceName: 'm4re5g8u0nr91qyj3ytsky0ryobczhkhthqm73b3dr7bw3gczit6i7y24n37xr150ms0grdu0ivg851out7xw2a4xw8i2dv2x5zo2f8dg8gwtyoi1q9ffqg9yata79gogf6g47tdarlio71q0gwla89kld58knx2',
                flowInterfaceNamespace: 'e6ivhj7b6l32fc3cqgqh7comgx0znixdm818ym7w4jnlwiahfuzj44pxett87t4e6g8rglp7ou8oiffpfxlyw5yc8siyz4qvsuifl64yp61oaxmm3t8tl0w5uanpjv00tfggarvil9492bu0t4nxfb0a8wz0956a',
                version: 'im6a6mk9ttt5zpaozwnq',
                parameterGroup: 'khf62j2am0nedmt201oyo3i5t6risul49hk3m9j2puiyw3nbwaw7cleia6z5iwrhoe45i52v86xml8nppx522mta77twnrlrek9vg3xsb7cjqj551onzpo9042tyd0doisw3382fog4cdwgosywu6bxnpipf9s90klgnjsxvec3tu8bm8svae4fluobthcba0btgaycwdfvb0rot7pld34y64vx1p15ihbbzct2tduzwxl11vpfy5aiby5ahcg6',
                name: '5dtczbwirp29w08iezz62vrgtk05euo38ryx51uhhz76fqcrfr0b3uyeiusiibd7w3tcxaow2z4ugke6hrttqc4m1po3bnyquvmnn59slhvi8uclcjxv8focn9dwzw6q7lxlqbkwipoq3glmgsko62514at21fq4f6jnvkwdc48bcgiq56zcwtfh36bqfdf34oi3l31a288u3ojympbmamoy3t9hcnsokbmzkw0gttt98wi4wuveey7ieje0qcgv6velofthdvsuqvkl48m8ui0a5nvfiy8dywd4z45t4eyaz0tw3yale399et2zxy36',
                parameterName: 'n4isn4fay4iusbxic4uhbqy8awpantbyuftvpm78dq3c95otd8t3x9ijuau4yxvyjj8hmy2bv5a0qwsorynrpifyyv1ub1a7u756tflszrc847ft9mlf0xfw0256ol0n0j5yzsq5f8zzjdwribsoir0l69amqhl5gsuolnyhx61w5ddo7zdq8vzmerw7ul9uvwdatdzgstwy94wo32ar06nheahtyg9wbmygreip011n0r2m8uoofd6y3pmbldlyr5e6v78pjjp1pfzgftoqguqnl2evlbyf21wqjpj1jud0q7ox3vow5277wgk441uz',
                parameterValue: '9bvuic9fsye3pbdr3reuya9793a7vo0ewivsq1q6x98kysupwotadwjr04ctrcrmqemuhzx44te13l2in44vznohcunx5hzntrzg27pcahs2jt0dapjfou664x3t0wj277wyv8jte71edqzi343ezj35pnaoiuizev0xk37dp48sm6j0eicshxm8yt6zibguucvxd756fsrqe53i03b10jc6fpjstw2v6eodqd5pwpdbokd6t0m21o05kion17t3tz8gl6dkqjnte8yalcw3cjd9zxf8rsfrezjocvcp63z8a025km7mem591qqdrvejtv8mdcyceee15nyocfg0fc78hj29r3k1xrm9g5brxm4i3jk6l0g8f9uwe60w4h2cvfrn49gkg9yxlniwr54uyp84hcdq40wnf9q1pvkgyidbanbzjt3wqeshiyypubmtx91vx4799wl5mqzurz26kgwyjwvbwyh1iiqv3sc4qkdrn0o2xl3m4ekg4fqlhpnuv4tx8xzf2vvjndr44lgv5wm9iavjqqomnbqerz80f8zhmn3irdtngocr4eb38du47qxv8uhll6qq34bj69vt9e7rr3pp19e2ejblc0ur4i1tdse4i5goiqxzfll2okn9ssry601j21yxccf1eg4epk5kyuscvw2ayt793w75dfkiod968xdlsg4stilwc4xuxmvjm4vwctqvbjfc9ro6uxjwpu5qmxx2miswqk5p42vzxkkshb5etv0yl22uzjh2upsh100n5i0ojd6he83i34f39eey6e4yqzzkqpuhzoa1wp0mxwkzwuax3ivzc6rum71na38jwlpo93mk5gqka5hfelfeegpqoq161ug8q84008jd24m1kimlvrkmapth4p5gztlaguyk0ymtui6r7846cq2jfc83eyd4t1xgadgm918fhd8qnrn8utfa397na8zv26wfu204ococd27k9on5ggi069tfsj1l3vxld7ksk59qkfheloqy6x8iv5tr6lzz4xpflpof9u4kl1i8zswxxehe01tr0477yhajr7r98223s6ud6gzclezdhvjukojvw9akzzh28xlo1bpkflwp4mxhgpkw1odxxve3q0vf4dzl8085ctsrlp11vlpnk49g3vusfqp3b9dc3ewv1pgp3o1o33k7h5ourdzco41pd3pobujpihkbm7bh3trxlscvg5ryn7b1mmq9pv1u3v1bezxqxooswizmrx2bnp9y27k7zroq8k47u6em85dg92et0l4fhbud6ifgm2ii5g0nvy9bee5koimq1ecxlx0flvmppvpqvb0fq2gwfgbjxe1u0itdlo8xl7036buaupaij4441lxiu3fgqaytz36xfy5lxrmbgcij8z5fp9g084lh7i07zxr3idtutsdyy125t3cxn9x6p0ja5spomixnyiliwf4yc4otpxfzy7c3qkpkxz3ddjcfqwxn8a1f6ne64n43n79b46uwz5i4y4aefcjpt2ke9cg50anm2f3iat6eg82pkbt0h2tmdb7if9id5b9ocywetr90x1z1ozg10114zx3waaifin5rh8z3yhbualq4glcvlxfnjvji8sshn3mhqwyu0501gd0ej1kme6b0913jv49tujwvkru37hsorvfwkk1b7bmhk8h30137ztga68me7m7ugdnfh25iqjm3cqnfb61qdj9wx1lmbgcjn0yfiejicsavtrcf3i7twai14c49mmazvwrsgunnixssgfu8yaai5bx4bp1il41xm0fuvuariyz4bq13d44i6e4u2dxqspybkvfiduaxedozu22c05eqwxlv5etmu0wefoxw481hhno6b0mwlnp29q0g0gv3pbk2b5ditf8omb529zkzsddtetemsnikc1nomirqy17sca7k8f2hlhzafzlv9e2fxf9knpowzbv6gyeznnfo86fzfb2tt8rhdwg3q63s0pz643en5pry7vwynh4xhyvaerwd9fq2md0z628q9j9jawet2b18q2ue',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'x9voz982xc09rq4oqo1m735neiei3e2ds74vqujgm737quxg3j',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'ak16q4j4mt9wu5seqbkw',
                channelHash: 'a2lwjlz13a6h9wyt2xtjvpvomz5an8p2qpit15kr',
                channelParty: 'xihn135qcjlsatk6dbrhouz33fxtz2f9qmyhpaskuwgifkorw3oi39t384yh41a4vte65wl5q91plcar627y45mud960r7cdyden5v85n67vhzlro6wvzmjikia9527sn7bg6d6u9leauw8mrc1wqtg4v9mtnf0x',
                channelComponent: '9xsf746784fk8o75g2tawdhww1imoi844ql6eowondegdewb29se0r5xgse4359fe4jrcyhwuhkvavlfsy2b9y687f96d7n6r9vtw1fynq3yoz0lvx9ph9441fwutbpmjc3kqg2k83dgu0kdseoe4ey8cesgfffe',
                channelName: 'mj9453k4ijmlgdhdsb68jtyghv0nqdqvfp2dxja0jv007vk93iu02ievubo021fmu73rhngopq4mb9yg44ihl6904re8nyqjafx341mjgph22wrnxzsc3z5vaykd1o5fxkhmefzpd247chaiouhzoz4tfee1dxr5',
                flowHash: '9lst3wbshxqqnef1v2h551tckfa4i1uj7awmfame',
                flowParty: 'j8nhdwam6jkgaoky9k7stp5udw0qdsjn26f8y7l5g8486bdkz44t9uxy401j7orrgxxx1329nx898lw5qaxjq6htgqideytd4lhtjiu20bsg4mhk7mw6rni71ej194i3clt9qt2sbkw70l5o1ealduc8yxs8kw2q',
                flowReceiverParty: '7xac56ue71b1h02ukmrhu61sa0ms9x9bxrjy7uboc9svnggbhvg7omgg9fmft4cadg491l461t2x27m9uavxviqvvirqzq2eswdqcr6gqt1iqbbkranzf3h6qp3cjqs6g6todplnk1f0a3k4zm3umxslyz6rs4y1',
                flowComponent: 'eptqfljk1r5iam7z09upq9cxj5c8zb2vpzvr792fzf0fw2u8gu5435p68n67cl4lzumkj8wcij3rz1y2pjs42o01tse852h8x7rxm2iah4rhtl7sqygkgoj5fb2fih8z1o1gmoo16oefgztbik2fk2cnk1zzvuh0',
                flowReceiverComponent: '57tmlbcatut0zo88tl7b1bj4x66ivoz79m6l27rrux0oezydxprde0btz0rspjy9j08ltdtypg6nsi3eowidxohh7pif93laut3gpm6kk7yoe4wrjh0pbhrh80er6p6dxr89cihbgbdv5s040r6pz1nhr723pcq7',
                flowInterfaceName: 'dg5h8s1jbj7sm4ot55arc2cmgkymp5b2mr2sj1t6qjcztoe37fr91rhrvdbzoetde5irr39bhihf8ivw52o278k3vqp1khfmc3ioss55m0vp855zgqith7qsprlmm15bvssi1eq2dxiyhd84uqw84mrje7r68fjg',
                flowInterfaceNamespace: 'xkwl74w0iai5jjznaf1v1s0475a6tklqi51sazupt1u8vgspbzi6hh7a8prwsktneuctnlajtbfjg29nqkdgfzd181ea9ipb85gov4mvai7455m3lzns47basfmeqef8y0axoinp18huxswgw2syg4mrz63fg8k7',
                version: null,
                parameterGroup: 'hbyszb1597dlbdwaujoyo1aql94oxy0iihwlpy8ydqq6sxynhq6z9fhb2kjhlfqroobwvzmfv2y2fimwbchm30nmyrfpwq6p911g7uqol5uyet4bsxtjfmfps7h9iuyesta31wbj3d8ha2dwhnyhspgbehcqynd76szh1tgwg2h6374z4l4zeyf1ividpfn2r66u7thltnp0ycb20xw46nsl0z7sfa9sjedsnjf5x9crdh0h26xnwgxip92lqib',
                name: '4nd73nllwp58sdbrojiuscz479hw5kpxl9ngohdk67swq2fs6m4n1xxlq7zpfjosdvq6hpk410tq3jgqd2uqvhbx2rm8rosqrcdya0g3kbuu42qkbaj4hrsbqbg9c70ugtepwur0k7sdzvtdsifa372tp4ude7189cqrphkp1nbswmscs62ekuc5ejnmvxad5rmnmnnw14f6u5ivcbpb3cm7eltmbmrq1baf4903nhgsj3715a3mwvv0jacu4ebuyxmmxha54q8fl26mou3wxrzgb7ax9elw4dy04hgerhe3wzz4bh81kffg20di6ei2',
                parameterName: 'ci6obaagnzw0nrg0nl8tp9xkj56ucsc4ldeqbm6jgkrynsbezbyivvjk6ddiqb2vtmlgxzkf1jwqu472j5vheenerde38b0mblvaf5txndjjy5gd896vt9cwjcihbpg7p9itzuhcmmsj4zxwvh7xugu1hkb3498k2xi3ceal9nfgdm6lwgqlu0xd4777nqyati2odtay8o9skl9ztvuyp9btfdhw115859quwps3470ksp2wlnsnu7lu6kat1awl2bx2q6ime7s3benoigh33ko9w9e8ppgblsxl4lvien7jkx95omcrpr19xqp4wkix',
                parameterValue: 'vl4e2rt8cbfamtx424i80lfj04qgyqb5jwoka2sh4gp29e8iufwvaipo75ohi3uuhe7wfhoqyxuaf3ro52d1c1iopr7y7fc56qifihkwc9k8bf7kc6iegvhc419sxopydkb665lncekfzk65uc65qeaduopfue625zq5dsyte7pca4ylwhcipfssvt9wdvkl29h2j56azkv8c63x47r7krkxva30ii2iuakwbvwi6lwkk8by1kxknih9mrqmd5w7g6wlwrocdvqwjmut09zjolm28xlsmxvocstrxlaj249dy8xadgzekoi9l23txct0nvzk1fkd5aa813txqw7ges96gg8b3wmy52jgoa6480lsd017elceg87aj42whbrcu6tmeh08zlr6cw81dn4yljhrqgdrf5zzlw7rprorb4bmt1opl0e10yu1qyh41aa49y793mipg53sbbnzxedm9qzmvqh4y5sksp8aqvzpm8315iu0x0yryd07y26e80nayfcf4rm7g9sj3zy05byzwhe6yz1lfh7uft3y1zh8a18y0po70c2dm7adc5elidj2txv9sdf7xpglnpbtwi5vnritpokre0xbh5d7evtoouc8kxn981dx6k5wffzi7yorw3gwyfe0s3fkal080et2yxwlwy38jpt1lfxdfbrpxzhj6ga6g4a1puieait1rw987j57j9v84za9frowdfvn6bpaqs6bp1ivn2va2tdgx65nb91fok1wke5d7v6ynmq32wl6bf1gyb3bfu8wxcxdlrb3npiu962cgofmh5gywm6js0fqinx2p1bha4q7wlt6hymlj61r5km6ozjcjjxnoklnny0ary20vm0w1qeoxvohn0a7quq44z9mds34ig7oibqcaw3mudxhehixum1e7fjrqp4v8gv3v95410d1i9i5psxjxj01izoez0klvtsklsra0q5zy8pqe8sonpnr26spgsnrbz9hri0lv3rrfd7z4qkcn1mmkidtbempzwbmsq6wt4fxx58i0u81telj4535n3vwc35smi7flrs8598y8wo4hnvs1pzzik79k68ez00yzxnpyfjd666yuw30syrq3cxp47zbyrer0mk47pl62feiulyvmk0n9e8kriz5gduq0i045m9vuyrspjjnlm1eyjh8dhg9sex3s0nzygesjx1syxbdgf0btwhby1r02gufsxbetzhbx9b8ktjccm29unjf011wiv0o48x12v59ulvw7jcntfrvry1eq9f6tqh2dejtl365w0s7hn9jaj2wgu9p4t0qgwqion8kiik40uymgyog403yfdrd6zowuu1prwk5x9qiopgdx9fn2qh7qkn82x872stjd3v3pz9k9f4zt4133limyb63debuat0ewhjapkt9it3elmzia9eu6l0zv66kiknr2xp35omj0gnbysc1arlt8r3kn2afcv5p0su43ngnl048ina32ipn0edp9mwjxcpcd1abglzawrfbo8dtcwo3vroo816ukkdg3h9qbqk1z17v8bjioqrsc123i4qk0k1vodhdcycwvge5q0v0cm1v9qe4tyksw82njkr5g667louwv1rmylddcccgddwt5k0oh0q6a5uuc1doju2gaklvkfz7o2rr1k6xn57mi2wiiory3pr5lpdsxdez0gvfov5x43gcht2tt80n1kcimrbp9ktpeohapshzxfcd2ypltj8mqn4ai8jepdc8owox957sayej1bzyam0n6eewe575m7j58n5hirjpywe3hhnqsvvykj3zso9yxb978kd9x9pi1rmfxsa2ey3s27p9r2yyh2ki17q1nuhw8x2r6c5mksv0r4zdi00tdbhctlcc4rqy8wqtoanwomt7uwn9jznkdih5a6iqvu6gmld7p4uwgqbwjboritziiwiod3vcri9ih1zp9rlew1mnfuw9i29yh6142e48xa8123t61q0xyupo3igi2ibjqltmgsis4jodcabo5q5a8oh59eyrzzok8zj6tm08',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'j77lj4sjnzdbddn8m0qf4a6qzqe8onz1bi05vhlpiyetvcgsjt',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'jmhdgsqckuu1xstttwuf',
                channelHash: 'lxqc9hpq5khplyjktb5sqnavf8hi6t7qmp6n68is',
                channelParty: 'cnwfqn2h8gka5iqy0mftvk2gusxkq3kekzzxhxntpossi27cidobv0qi9p1vf5iihprppjrtmorbi7qfozymgua25jy85pyndcefq3khqmsapq0facdufn7q3tddsm7a5l0tnis0mfuxp0doebho8wg6mhxu3nyk',
                channelComponent: 'm32a30d1a0c6dwxg8r7zv5rb2q1xis7x8x8ktjifw8i4znuqcw4zvr3cdpqz7jm1u1suuciwgw1hvxjzu1q1kjnhwnljf3b04xqq921om3pm8qi8cselzett9wclv7umgs70n52gm067mriyjikk81006tablna3',
                channelName: 'gngd6jze5u7gu8rfv5r92rmh4gk9et027cclkml724cwhlg40e5qlfuc6pi1mk39t77nxc8jbtxyxa8h88wnh7ujj0id2k9wyss4i2j7j2c2esaqutg4k0q096lrfyq5ftdf1gocj3yl790uaccovnn3a2yjzh6j',
                flowHash: '63uu4efu6f81ugr5281fqxaki053bswwon0frukz',
                flowParty: 'ynj0erqvq8114qpyphw4wstup97en28svqvx0neo4qywx6ykyt8vmg6628h6snhkwkalpwyj1slfeyto2tj6rkgepd4jh39wcfxprzunnjoqx51nigutfibeqkkrshmsw4l5b0ng38usm0tk6ra41clh8n1nidq6',
                flowReceiverParty: '0csw8lvfl3yxu89i01hrfe2n332vg9zj85rr0dsuxn7hjena5xujlq1wfs5qwtt4q795jwc60a0aojk2wndw5a915wi15jm5yq1sunjrqtzotolducqdu5b6k6m9l3gpj52asy7p7y93qreaaa0gv5p1i9zp24ou',
                flowComponent: 'm0arrda9n9j6u5jsdtjr8h1qkkea81opme3ryislz1q37hwwvvge9w1cdom4pyvws11b0mbasgjvp0revhzcjlys4d3cgkdlxwdiaie1wbwdx6gm18ek2dket2hoo7jnb1lqankg08o0o518n0fmjw1nxlpxojt0',
                flowReceiverComponent: 'max135ws7wc4eb6ntj5c9whyh52kkoewj6gyq57mic4wh2x4yulpw2c46aczb6wyzg2g7toczbn167cillm8ypcu1ed930c3k44zjupj8rohsnnqz0844lda12dfesnrn7pxjwfji2teeaj18955b5j4xpo8efy7',
                flowInterfaceName: 'c0m61yhp9xfr3q7gc6bafkivk1lp0gwetwojcg0ckipxzq7fj1ld0koda6r8rxqmtrka4mxx5a8taxe3wgigaf1c8qu2o9nnjxgiytgy83bh4x06pthfjj5wn28emafnf8s7u2urvp5pi5f1nwvk3cksfo76aaja',
                flowInterfaceNamespace: 'bf1tjteczoso5chyc6wju2npk2az41nj4c2bpnpokvafgrdrkzl4kac1djtuku5sv1jic0krny5xclmaoisgex9jei68ljy39itykdpk23kotx1wp3e4n6m6sy44wsp8y94jfwbst5ejp6247i6qs2x19zxc8fm0',
                
                parameterGroup: 'ezml7n88ythftti7bbfvuf6xdwo13vj37cr3thbl2banti0gjw83qd5xv4i8n1ox07ypyqngdbdyk6wadch1ok5nzqgiq0qxspr1z98am0k08s3n2kj3u356rsjqtrhx1p92nkvkwn0wrlsxd1r279e4w1r8vpbx2pvyz6yy22083s0jrk07fcnmgoanvck2sv0xq5s0rdfq4ubawz7mzifyyr7pj89xn37yrtmxw7vysb961e7glhdgtkfvuxd',
                name: 's5un8xns6soe0o9ss7j9a06iu8vck4p9kfyo3zgmpgy8bc69z71nrfxr4ptcdrt8gxzpfv6su6dxiz3ktd38dqyel34u050z7oh7s6ysfdh5jkkwrz426lwptonpdfkc9vehu4r9yimuwkf5cwj5djmaypoqrdym3s5v7fxqv7iel91i0adgigsu0f918idgtyvlcvu5na0jk4vrgren5iiuus0ko9r7vrr1khilttjncf26zo266bu4q23jn3vlb1q4gmwatg1j7lkrvnq4uixv0xv3xvzjfn8x5t3nfqwwnhu6muw5mt30n56bgobt',
                parameterName: 'ybcsrkhydhjufygmk5koigvass2fek7tqlkzk96gt595jmgzwsodilaaje73o1nshpcug7qwyqh4rvof566q0e45lawyvxfkgs68ofcftqwqlirdw1yk7c92qfxneyan8qgl247wzod70fqt0rkkki0j5dlnhjgu912f0k30dllw5lp62bo0t05t6sph1a7z66yva397l22gqg1i7q9qeq079z9ovdxx9xx6dzhezbr7gqxb4laolsnb2a1gimgjb9jl7llp04ezzmg0jxk18ks8p6926csc2up21ml7elalv4dd7dk2u7nvj7lmjlx6',
                parameterValue: 'y7bzi6phy8t5tr3t845pt6mn0hkitozkk93u1ds170p71fyk4kgd8trbtc89u82mjpi6nt98ug5fnal8s3nby0kd7hne6wpscnnp7jjx7fhvevstsd7tsetyl6szmbg3strl5x7ya0vynrf17po4nx80saal6smmhx0cv5swbqofk1tx1shkqw02isvjig0kfg20yqmaj5b3pty23xctyodo9el5eiqt3hixvmehb1xtar7muww5xlq7wmvnrk6l2rneild4alwbfrfxukan1iendomtltd17on2ny368i3qhac399kcxtimsy9dft5e9o87hwjfapktflvxru0gpr1infamwvhwl7l3tpq8pk0qrwh9xv23prg8556qumwdflwoajt5732063q9t9ygokudhs7upn6l8hrk72aka73jxh49hprvkgmbqiws1d9bjk5p5fuqlaukar7z4g51y5wvzevwe79j682u3mfcdy732qixudo4qg5pbv98bxmy71edzdltfz1wjbtv2zg6h94v21yx3s851n9ye9zamhfj0ii0ow20uauzmscpoajotwee6yc59ahmshgg9pj9gwuubnqf096v0sz5pen7rr1ktfb4qdvpxl3scg0fi8081r5c42d0hzoliorj2idduuu2yy645faqo131149ef2frwxjxn0hxmx8rcyd68ymb5gzat0vhz6l8wbf6xisohb2s92qwg90xawp0cdmyekeuigreu2p3cyz4elwl08w2nosmdgl5wgletwew0rp28f7f1f2w9tc50ryq6de2oyfbxjfetfnoye7vd8vzqmw87wks7tl8og1colock2tu4692itao2go81bz2t3digh8wxvuhjur500o9cfij1jcql3hdqeryh0nq63eusenb6h2cjuj30dymvis5sfy51n9pr99gybc4hi7bf47owoo599zbnargj1006xwjcxsk87crlqenn68squkfwvwwt0qyv45dklaimor0bcfea9so6opuq665lr5o58bypuei1vbm9giqiisho1coaxk4iw5aqu46d97thkurgafecan4pdfsd6exxsypbu4mxyyy1xxefuwb0mq3hogxqh185tru1c5qdsb709rtmrf6l7mifrm8b3avj54stxhwgwxab7piz803q7lrlizd7n1bu7o11x3tpzl9kmklb2nzdnvc7o228jkg6mjolzavm94c82pgc6yv53ueu9eo0ruaiaz098q8uyhk5kotu4imt3s6qqh0e2btmpy2quv0s5myxt27vz4rt2b1603vr9efbdrg78pn8ke32c0tckjtnwkywy70bvdhijizp91ckabnrow1cltajgg3930bfyrqy3yjw6wnvcska4mpnehlrgd30221rqi3x9pyrz3g4advyex6z3wk8zfh9sa3ri8pmgg6uqcxmzc07munuhplh4oquwtdkxtqiy673vvffb8nv27uowpx5uslb3dp4z4x3p1s09i7kspbi03y65p1s1wzkanwl5ouaaj3i2wgwtmzglrfcxazdqq5ku3mn3q80oy81fo2kri27n24hur2pm2jjry3qh3vfctvut8mafcycpb8jypki0ihdbhht79w1fwy1l9kj65kvj99ehim3nnnlaqmsr3lpblr3zdfowspryc6167hf8w5czsog9fxzc2073z6nc5oau2y4is12h9hj9f6mbuzcsjgiwa7qydnoqtchlp9ufwmahbfaag5r655s0qzvq6086k43mee5pje33vnzyvmbj50mf1ko26jvrmumyx2n9889vqctka9gv2iyp1vxuwymo1ool3cabfa76h6patkpvgxvoe12fh4qzkgsh5tcrohxx3plpp1gabp5hzgl4z7t52ye5rw9zi3buhcg5vciqgihgflla3ojnpqemv6mcblp5txx1kxrpvmq9zed0dovcnxgpv56x2acbnw9jwe2a9f9ggvmh38f7hjjdhq7qmuzaxv563i6c3vd4pkt07uu4cryzi9sfh6',
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
                id: 'bbui4p67zq6p25f1vf2h5tkhmkxuqm3mq7gwl',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '39z20ejmu0o8n5cu7q6v5278ed4oisa5pkh1v11tx16ny17yy4',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'vpbgx8p3v0rhf8l6gvya',
                channelHash: '2wd3twgxjxkroieetv3uujyop54a2s4egf2236i2',
                channelParty: 'ruxl7hy0oixu3syjpe8njntiokfkuzuni7h1z8ux9fu2rwj5grdkvrj3cwpqrlwzovr524e6ncqc0ckxesqz2llwh97hfdyrz1pq35160wwrwkgngtr6vb66dkh6l3ezkeo2z073kuykwmnl2wsmzpvcgyy1e5ws',
                channelComponent: 'jygdeez0rp8nz7kpi4y6cdubs7u7k0kiqzxsgvdqcom6f6wv6xboz2sd7nk8369ac3zwwy2jbseg4m6l0bysn9gf1xaakca34k269pb2rs0t5r9a9irc23eoczntu08gbln7dwu8ijz6iasrf65a4dctgq6uckzg',
                channelName: 'f5awv3d64yyj2jzvaz4cak8h72qpvvv7ptkkafmb2343nnt00jrvtsjw5zaivmq6cifulqp7gexcfv28owvanl4d72np3elv084ib8bii36cjdp75j9vm4uvnb12kwykz2gdf5higzh7vzhglha8e9990dk1pxxt',
                flowHash: 'xcivlwwztk930jl0oogzjkpi5x4eiz3fz22ad071',
                flowParty: 'qg31lg3mvbtmtloo0w3brxcgz6ng7mp94m6lnng09k3umi5zk9omaqq4xal0tccaj02art82r577pqqpcshsaerdrcfuuqpferevvcs157659d9tsaz5gu9cco0acoo2sdzdhzg7a9wg7wkv6r6m6qga376ivzzq',
                flowReceiverParty: 'mrbu88txwn8aakfnh988gdh3htx1uy7s0bopnxo6njblno0uha5rsfhwwf38kdjmx8uopxqb0uyhx5lsg2gffrigcg5fp7pp7xrgsqfvtjvpz979agcv9xmmfkzxz02y3kih2owz985cobzggkjp508p0aep2ef1',
                flowComponent: 'awms215w8ds8l8ssv8emr56el5nc7z78dhyigf9fvtjfw18uvz4uqczbbp83tvnk6744pg93sm3dgeor9qyt01g37iafo7w4okaggy9knug1wyqv525pavuuh2vknmh4fydnflfur9xm4alt9d9zcdf3rkv4wcjn',
                flowReceiverComponent: 'i3kj2dwlvlm8zk08vwv70mbn8m8kvou9tpxhv1qzrlmlsjmkj7uqlizjry7esg1p7frw10hqw1g4g2ytd2iswrajuffap7l41c3afn7cwuyyudw8hwjwdb0lc60f8yqh9a44csqzwke3uag8hrhj68xu2wxdu0a6',
                flowInterfaceName: 'a8i09os1uayrnoo75uspfzc98pfywf5817zo0auy9lc1vn38bdelos7yvla8i6ak8gvgkx4nlq36dfhm8kss7awcdmlebzggqcrg7x47dyjd8jdebwf9twgxjrit4u149mdvdxvkdyc3iiwh7ivnw7eef1qdg003',
                flowInterfaceNamespace: '7kkcelzmsc5k02gxgdasqa64b96kppv0iu5oua4egvp73kendih1aso3jvumhp62bncaupxancgpzsdwiats5688imyj26n75jby1l8fp7tf5cbpmhe32a2eb0wvw3uixjn1kg6iop3m1ddh6cin9yuj0v1jgszq',
                version: 'r7n0c3i3fotzymocu3ow',
                parameterGroup: 'o4433o4drh4qd0qjug6u3aeia22g8az40i37r5jqs9leollzoh49pd2646jooltissnh65bzkmfl6ij5uh8orft185z447688jdv8z8znwfn4ljulnfg5c4t7ckkod10ukqo0nwe5pr3tjj5x8vd7dftluxd81psqic5fjrt7wtc38d1nne8rgm4nfkzopz1b7j33qq4qilowhkmde5v80nhgy3u9oxjqjcd7dk9bxnwxg41yjl6bnsnjff2vjy',
                name: 'jie8wfp4gpn65g6q97mcxi57shstlpfklhweskdy37soxty6xx3e642fzig1850go5j9eqr49wh0jw18z0npa0zd54q8t1rjc7sfx7v7oix7cco3s9qnkhcix7tjpdyt7gupqgp390mziweicge7wkqclhpar36awjkysxzr4i40ph18zf0apofqycq0ysglqp0v7lny2ava8b3itrvcd5hczxehb370c2d6dcwe3fqrpml8x0spextkk7m1m8ellbxqf0tqbwr0sh3qk5ozy4jqmszoopa9a8pu8yqvchncrv0gq7qlsw8duojhz6qt',
                parameterName: 'xj7jojri36fn2tzq49j4gonidn3o3q0xq5ozu31c95q06eyxfomxa3yf4t7j27h40nfi8qlyo4ok7otg51op3wqhjjuqxhtdhn1rnjx8534pq4puu1sc2q1taooyef6ul152ibt6qkqpkelnh2ub5lzpsl49upyg2o23gmuzbpzijtc24f7c3ybr8h7jbpavxsawzrc8oo6xy0eplvvak27ubgkbif10u29q8aprdu45gyg81ccstnx4myrs7p1qgc1qsgk9llaa0m9jkayfnjf8qf9qvr9zcm514j0gm5gtq71negfz7yw2dny6wuic',
                parameterValue: '9gauncdb0275i3nixizq9ei3zh9wehxv057v5ibpxbiekqmc7ons0kyjg9zu0oa1i421e5ribjubpwv47d2pdzyne6x6kqoz541s9r7pczdqtdru057bd8ld7gu5cxbinuuw69h3vhmh8jg57721w7retx73t3uzwxd5iyu20uyz19kows8f9lb8e0inzj6bzqtb59we3uqjauqzwi7u3u0aq58z0kqn60sgkbsjevlawhv6g3f13jj6i3uhqmvidky6flxyq2ykg4v7tvn240cdvi7sppwzga117cmybh07w1shuyr93maikifvnlc3s9k6y5x3lz00v6n49rfc5rflnbq9z5z79a6cf01cm7otcgzqwrn9f1wzslej2378wuopkrb7xhtjvgfeyfb3hp7byadhxfggyxabkf038pwqvtwbph0fl1jwhlpek07304z88h7n2eiu9tjnj8wtk1yv9qv7hynnc4wo59g91dtqha6iv5xae6mr04lqbqek2px67q9fgeefb79yqcdgzceryxrehq33id2ueoxj68rxfyjpxv3308dy4m7tvhy34xigoahbtprfi7py2ep4rde3015u3vtmm2s83fn3td95wxpnp50y8vmog5srsj5a7ay7i4cdwd24uj5ruu3qi6ur7f4xzlhb75whx0sk7w6ke7qvna7rox1b2y0souejdcmtlmcmn4rtmm1gjidg51ev8e22gwlqeacnv6ppoozvx17pys8zzxrqdy775nm43q5tqr787w8u892ooau4c98gdziqhi1kz3l9qnfydvaeultwg4n5hj0i6j27p6xi3q3txcyjeaycu4x6a1k68mjcihmkzlcmlxguyc0gisrzc8xpt4ua0an8zk4uffk41q71i19cg4p5j1iuqay8ki4wdnfgbdoe4oxtz7k031v1ji73g58ba91qig674otdbsjzi7981b0m8a2y9jk4ubmql93tipgn0z2b5ngwdu8pqfvduhpj1vphtcxpyqzu4bqn34ydo5bsr0ow459iuhrbni01k6dxli6ru01h09pyqoneqkw78a6p6aov60k8wr7adtvjzelcr4ffmsl5cqiixzul984t63vs4pb6tw3m7wc5y7sesn15bvvfnp89g4uze2hyot4214dub0o1siqcsfnpzgpuficnzqrcoqk8t0xy1ruihkji5gcin7fnl9c3329sw1lhn846zp5tkrw6nowv9maskaio295p89u0lxpoggrkgou5y19c5w0lm67r5t7y9erb3r550tlwhdrium5ea8xqgi2gm2ovibpri4itas8j8ylcc6lghgpy22s3h8mv10j7p5x5skv26zxu0k1s665zz0q3ni2lr2m6uv54asvw6o79zu68szhq36n36kv3lwfis879tuyq0osa8qw4489cgo5a7e6ba36ebbkdc7qr3vn08d3qulfut9ex76x8uzum3x826yrt4qncny1lvql6bxshp5tfs04jfscm1j3ujha9ql36t92o0f0jvb0aiges94mr8jq6952d5ex49xc57akq1sjimciv94ztqpo7547b11kcxhsdao927uaxi6a9sozmn4whkotm5g9gs34frvcueletdw3j3sym3tew7woq9anddkw02t7vdfoqz9o5zlubo1q37qfpj8i5879zw56bjz9b2go2m87hix714dy9w7l3918ivg7uygp04etbni8jjra5j7dgwtzhs4rvxf8rao28xiznqob827wkl1yd96698oqrxtxyxql8hjhtak16obfvptpfwlbd8x0y6vb7ugq8g603bcnhoblq6l75tv0zfk5ilfqsxau08xmegbnrukp8iti21pskoers4lxb4pbb53mqrsdrth9pjuuxaujf55oonvaeligwhzpecjer1acziad666s1lv3ykdlxmglaqcip57loe5ecfznra7cp9fbr32kgu8guvplcluzlhoahfy2a7pomi79epzxjurdtmvx2c9602ex9j18c04e9coyh',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: 'wzrouwfsyomcvwvdzhmp15sgbmtzekj4cf4ec',
                tenantCode: '4suuzd1wj83rto4r0b96p7z1k4sspcg8sjsyfsyuzrnzor6n8x',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'c7hrlrrxo4hqa0v7bpzq',
                channelHash: '52j5gx04uv6ppkay9bv5hnqadlzw20vfwsso99t8',
                channelParty: 'mwtiux9nh20jv4vbnpbicn2kqh53gmygx6g9hjytroexyh2a11y6ff057i94xzf0er267mlx5i9xsywcudlnydsqyu53ftzaw314xuk9lj0dwsdvh9l1wser9v8tdm6z9wh0ngexeif7q1c27p2ngtajq25wdrx5',
                channelComponent: 'l4gz6qz3dppb1gisol7nm4k8spg9xvzy081np9iyh5qshrwa72v8cmcarhk6zl57r5xkbdltbl157fq7bpdcu6baxnk9i4m7pcdjd329yka59h8f15rufshmv75zw49q3e0omf589bqtp8id3cae54rp3ds8ycf8',
                channelName: 's5id25hcfjvnukjo5443xht4y131f25skrtplcfes6xrb11680yekqzimys5buir19yw6133rdt8t2q6kwkspa09zzvwqpg4kpztol5iusyqqm25ln4oft9pn1k14taf4cir4ftdmtx3mtpat3qxe5hjwubu5jvs',
                flowHash: 'zqlohyd7n7qn7zf3wgh5tvm9hxqxk9f6ymafw4n5',
                flowParty: '4ucyqarcbjidu34x7vbndxxjeupwrv8x8trn4ehc782d2wvemzz1k1r7ro5y3tasp41p3ec572yvnbne04p3lk61jvte5uaov0fuk894kco5uyuqk1jlc5mvuy7o7x2yh9fovj2ccrgdxhwdhnqmy4im3snmnjrf',
                flowReceiverParty: '0ra4rce58hec9yvp1frmq2j8x81z962jzadd7x2reuvzuklp9vd5oqjkfl9cndrzd88en0gc2h8mt5y8hf3fharoqh09ymgccvj3l6a0s0o483rqwltwcvf0t9ec1oelu621qj2eiuwldgvjf5divjcq72467abb',
                flowComponent: 'cme2k3lv5rk9l17rg063f49ojyh2mcrf28rb3shub2krcp3gh2vnuzl1uq38g09gr348cdq0elhhooueuy0q22abx9quhqn3qlh8v2us5l6tdd189fv4tedk6osqxtbjqsq0dztp8h1du34dvj7etogy6xee1n2e',
                flowReceiverComponent: '3xrrsk51owlesk7pn6gwdjrzfybr84hj6u59tnzzz32vyvf3jkwgl72qctw4q7rf1p5vu3djqq85ghhvm6masx0d1q83z6t9knbtaeiw704skct19e95nmxusjion7rfpmx4en6djkl5b4laj2akspwsra5j2h3d',
                flowInterfaceName: 't9fwc09yts3mjlcjs34fhiajv11ji6ei7lb243hlzc8pb5h2mnok7wxktak0j7oi89ehz9oiozzluq0zwnq4yo9hamyp3eoyviduf38h2x3htl8modsi6ixcaukije3sssed8dydm5z8heues3n8h0gb0j5noto2',
                flowInterfaceNamespace: 'pggc7y5a0i0snzhhpvkmh1q8re5xthcndarctmhze9gta98747qrlhkl97180iw3so8ffqf5mmjf9ruuar0h82un3bxsxgie6jrk3pkv9e3bqv8dsxksxd8favf5l5e1ezbpt13t4khoo3y13lb3so4jxjhpe40a',
                version: '69hs3nj3rjy85s170xwx',
                parameterGroup: 'gwxaobig2e1wc1ridfropq7ofnxeza1f8mlrjg1uhzvuq9o79dvrx8gk6pxkcx0hysd83dalbor0lvwgxy05ym1rinx18qsu1y461s707pm7xoh8bek5fv0vuedhryljkevcii4j1d7crkzrqf0dozjn2jfdtlq8lw6j98xj08soke8hmwvu7thvu9rt72kj7knbh6x0237ji0w0zwnkl11w9b6ceu63myuk5ya5p6uxs1lmlt8x16i9ehamrih',
                name: 'p4pgchwl3oknofwzx4fmei5vzhipiwremnqzrrchv7ep023bbb0lzwawaip72tl7s1c0y3o4q8ts07gfsfpw2pw8xywqbx35to5ito3fn5w9uzoy65fgjl65vdpo7wyttkbsdx7ot1a1kiq1njnj9oidlje4ry6e3scer8unevvh6qohk5oepeijccg1s6438kmw6yqbm4jr01apgdok8rsrlqo45vcmn7h2kdijpei6742pgobs5tqo91q918krt9x0o9dwwdr3xr80kgbwq15z8h181k7vsuk69lufp15lzjekjhbvqi058j8hvip0',
                parameterName: '3i9atggat923jf8jjadepty2iri76y6s4mmylkptwu00ls94ciog23wuqwygvc627gef5duck0vce3mgtfufrkmjwi8c6ltxxvytvw6yk7o73dyusdsgrwoankomo7r3y6bfh9sfo85oeoxsgfw6j8o3msgkbbkybrpu82fst6z7lxm7833vzlxkhvh3hmo8t3cl89xrb5b59rhuv5lj5ha6tptdzaps3vozomppo3dffyjiduydc8x2ubqb8azks860psjuc4ipfcehl1lkr4q66biw42gjknsnuk1ljagtlbyjlun1bfps29ayu32c',
                parameterValue: 'vbqopmsrqf7ihx0yz1dmdhf60ins6sgkjk78pxfmd8p6wnvu243r0ksd0x8wj56eqgd7jwfgi0wv8zeg23cafr1izqp66cph3brkutyzy768fbszxnb4ztz31h9zs9q7a11ai2i04o6f5ikw5j608bmqtxr5cmm0uklpkrxbiqf24wlsralqu2j25mryrrtlg2welaxf80yinqkcsruox6kfqa0ikn5ertc4uexi8sitcr1xolwcw8w4iya4n0gvcjolq9nfmaqge77526fuaaekl8slizg0l5g97chlqg0i80u4810whik1f7jf9sh0k7rb82ekn8okxn3hqds3h7437q7yxr00eb4h98sqsa7qp4auxj9skdwcob7tsymzm5acoko3nu31mpf6c2ehvhdfcrmqam8460qse27mmipp9q627f71g2x9lckdl1uyan9cmqwz0b45g4a1rvu55kq30aooeatlzkwn4bg7oq11b78plaeqfwd1qp8hg7hynyzq3dqrs719ckr1d4gfa5bly761h2fydw1hatpzznsj2l0oz6n8yl9a5rtwv516317fcdk6qtfozlw46nfa6j8xuubeknqmuzz2ou1pthf2ncmmqmtm5ue1gvn3u6z3mkg3k13nikfvbwq9yhi4dat5c1bqjnus1ffb8mebqr8f7dsw41j7aibravywffws1uq8cx7r1qc5veujpsa6dsocwoj1y3f0yvd2qifsl8r8dj0emxn868vwu6dl7e9juhwu0rd6nicw2yuxzmlr8t73t3twpvdf7b2iy5b3gg90vwy4iq39lxyvbnyg15qjpdu30cezirzjpk2xlxjgmfds6qsh0jui22xi7cxk7xoa52tqd4ipsvtp2c8p8rf3wyvsd42dh4xq19t31akaj3mhmvh9c6hzckmdx9v82xuet80pmxf0qxn101usdq1dzu2py7rd33idqbu0zcy4lzjhoi7mpbn0se2lb0yokt9w4sny1s9880sw1ydnaeh7iuob3ys3ow7t9wb2tybbw2nwepvpoeb0iur85s0hnk8xwqjl1t207u7qes8xc5uq7f3f1mew3j4sdybwsfa8fzz59yp0eaet5g1ta4sfaikntumgl4nhsux7mau4pcgu0uatnx2vucenz668idaeyr5blme80y7xb27kazb0dhw92xtivd4vpxngu88okmm55uv84bzy1nj0eg6b4nelwhtgbzfyywubwpaoognp6h6lny2f1aasy6jzck32cta3onvzjbhf330gpatnsk96yf67sz5w82u4t792nr4nopdj02a9jy8qg4mhctvhgi11tawq749ffb7o4gmc0tsdq1b76jjmi7l4mzu0e0th9mcuhtehrrz8rhp05uk6ez6tphyd508vqyk97j5rv276rhf36h52a1e9bxgvxeq1u08xatjw1obzmnyv9r087r7z5rkb06425bvuseri9d78cgs552udicmwgmntec0zfa2o1fvkmzvdjxpqj8pj9eto4r7pabkezzlcp1mjp08o3q2lx7g4uxi7p21113hca3lpw50h0uqapk5qf8fvjy4i2dnxja84mvuarkrzfbazqoh4lrtq7r9ojd6tgg305n3jrzc4v0dvftn43lil1qdkizw53heyeex687inzhrt54y53u2fjzxo64kfq4lqr380ts5tlpr4b1bdlbmcopag941gqgtpm78hk9hhc09vgipg04pk37taj3208e0p2xjt8o3c1p09vmfbdnleoe0thob509ujjhaic0x8r22llgzedq2fybju6k3ufehymnx92s36u0w464eqfoe3o6akkieb1ts57636276dunqvrs25emcmtn84xyho5c8640hcw734c1anmp9s21megoxabh07lv4f3hsyaerxuk56coz811uiiqcmunvud88q949iobel8xzijstclcxiyx357920v4tbma5uxqupvtkw61kfb2bun2nk1q73z8evfx6fczg5vx19iee1a6juyaut',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'u6hq9k8e2cndweydi60uzzc7j7c4xj6xyq8xmv1kvsnoe803el',
                systemId: 'ypqs2pem4xxt3lqmirvhvyane8rafglo8tcp6',
                systemName: 'mz28jayn8ejlsd4r7e09',
                channelHash: 'xollyxbfql2xhujy983huewyxfp5axmn25xmbqh0',
                channelParty: '83tqurzhzbv65rmq7u94nk56ch5k70aazopkq874hiq3ocysafou9suamv6rklzjfd0dja23zu2envgihukl60vxcwpk70xk7c25xn04066zcc9x4kptdyw02ncf306noekfud45vz89dsdl3f2d2tptut3lx8b0',
                channelComponent: 'oaye330uwvg710gkj2330x2a73ax8z2mj5p3pjjududpp9f4xlrwwj0zx1pxw37wi41fz4gum3qem0sovdfv2q9o6hsxlmro15a7yt5tbq0fcmpcwpdhu3i3af086penrwpwe3c9zsd1cbbw5xd7kxi5e50bomo8',
                channelName: 'gqwg0prbqrp52igq1635586twv01q0hrpdrc9nzb76asfmba58ue11wt59r5vp89dk11xv56hx2bo2ngl7s2f034sqywp9odh5geetanw86fuc9pbmy43ja7pvbwqrdh5udsenzimzahwwp17h13r5l0jwlkqta7',
                flowHash: 'w42vyk57fs8rq0cyevlque8i030sibyb357oi84o',
                flowParty: '56z3ur5dsp2hil3zos720ygofjjbm3lpitdf7jnfw1f1hlo28q3ibhtrvxd3hudzgsmjuxfimw6amd8tza9ichndtl3wfzdbhh0pffvjn5xxlvptyjmiqe444c734uyy06d73freh6wj9hifvcdyep4dmz7fwfm2',
                flowReceiverParty: 'uzcxubjb0vmjq3fwf0uurn56zs46eh4mau2gf2jx4jwqzho0cbhd6816k4r1z0ee5p5msnkqiwoubidildu53kia7qzn4g9al6npwnngziom2v7qp2fgbi6fyiczf52kyk11uwpqzd12nwfirg3omuclluyw730b',
                flowComponent: '3pnb0gnvgwbogimrnx40493ehcbzn2kiexydmmvgw0zh9xdd9cmhxvnmoc8hjst8oqvi415zr1zzuh397pou0syng307z0jqvsnb40tgb0jodxa5lqahco4b75pg4xzh6qxf8keouse45379nsqz3bt6vbgkybmy',
                flowReceiverComponent: '5e72x8u9bvvqgrdktvy31jdvfbskpm8ojywzk0w98yo4fhjuxmq78y678m1e7k6olov3oe9pabvnpcqsskosytacf3x2wfpxi9nw0z78tazjz89wle8hpl608ej9i875akoz8kafwsvudeprhf0lzgnyceobov7s',
                flowInterfaceName: 'gcqy7tmbt5yq02j29glzeumk1id731c9iuf0rismwsvn32ll96yif1lgjj586ejp37wmrzfsm7qvwouateutoapfx3dbmpwcbopnc1z1928zyupstvb47iufqbj9oxm13rqf7gb5pc1pmw5rvxxi1ht2jlyooixp',
                flowInterfaceNamespace: '2r1fr60rkgtt6nnm8qe8kgg69plpnsh5m7am2u45gezjliu55rna4i8h0dp2g8znetkyr8od44q0p0ge7busff07v7apmmcfmopzsh2l9mdsi23rmn85gyyewwqqkn2lplex1rsrcximapu70gki4s77g5dyxyvm',
                version: 'w9lcttyz3klzw1i4iz0d',
                parameterGroup: 'inve9c8x4kncest8sirm7745zkvvddggpkq2dvbjlsw71uy459pe3968hbmcdgsehrejq68hwsy6nai3fqbtoso524rsunlnrzlxclhxt9azsb5fq3iz8a7abp254rajvlrnkgddvfm3uyl3d3chodvbey2rvevrmzgd30375ovsn7mbynmgc50up9eqq7wbd4cgdti4qr9h85jz50zdqrfm182ksmf66kjh5ek47qigjm0pwfyfan4q8e0c30b',
                name: 'c7uki3nlns3don77ztizwotixyf10uhiyakfjjk9zim2qvx9w0sw5bp48d5l5rasxkwozeghw3logmzoj5tz2r10ffuj4vdh6pvrtpv58c081ehdwuskhb2urpgeu20nv86lwho7nhdoze0awr4p0s0oc4hfdues16bq8o7c1hdz2tzbhl5vx4ry9uxi69knc75h44fikzfwyl1cu6qxnc6lkdqf4bdcicstij75bgqq17apooyasw68zq4x4ac32m31rmwvxbyfunw9tagh0naoi2et69yx4rm5h4f9p9hnoaakbwhxoedp9jjrgob5',
                parameterName: '7plqnuuw9vqkwq6h5upq26302f8sd8pmbyg3bjpzip1qhjdjkmf36nfsv5cpu77jiammhgug1oe5roe8sh93yuojocj5bw3rrht7h5uv8byfihn74ehy8c59dbt6tl2g3o6b6s69dde7b4r6k34uqkug5rhg1mnn8vbq2gjjhkt9otm6sj85cnwvudtvy3f2bvcdgh6rnpevorre7vrnomyzzjnxbzpmzeld0rbea6v5ruwiri9ftcd6wum0xfrm98sor2e4a9t4ilrps5grk0g6qjdczfq7l53wh83ula3heslgk0w5612yxc0h3ztw',
                parameterValue: 'c9qe2akhq2tizdun984w9gbl46dp7ohq9qi7xb07hgo2sipzihsjy9usaq1xbb901mby4o3myfq6oeyclnj5iaolih21qe0x5f35zw3nbhmi6jdvlknsr1s9h0urc1e9gno74xya5l374qrep0rbi1yj3rrib982v1uxufx29tnfgn47ciqdvhklc5hbsf61qetkzhyj4zo4hwll4ebtkho8fn8wkhyy6ww2tv1pd2jaztz0jcpqstv1w32ed0divf439nb1ck4dq279pv5fztphd0c1owlzfkh8ytaawikxhu52g81xrzd829r7m22vw40fcok873jomedjo019n9mbzesy3zjcfmrf867rmvj0qb3rp8397i8uiwwx12b8oospq42e6m5oqw82vlmdxgdqh2hzx2wss62k6tvy9sj6y9pwy0mowdqdxq32b9pgk8hcbu602imrd53cg55zq25ruz6s2ft9eqzk6colr8qlxt3g3jeb48ntwjirg50fg0c1j81zlgodzxfb8qu0igt1kwi3plgpy9c2hybdncf27x4xyj1ugk5lyizzfnnsj6yrihp6elb36tuapvwp5mk11wkibuklfgo4vuer5sabysehp8ahg47scxkn8mapgmcbferik24v5ghksl8qnpa8ze9em5e09fi1anc50xqgcxkmorqn46so2izdy44n7h8q9jk1tt36py2ehe9xiq1jy64lbrhplxatqha1qhog4x09pi407mheyrdde67wzu6f170prbvnfm37kr0e95rm2buynob3qnacvgbh19w1j8fzhpo2lthhslc4bopbkp1rkz4edvdugscd9nsvnl68l88vdy78943d49c5hin0nh1qhd0c1apnfaae995cr1po9dczxla9zj5vzxn7bq7avkzjm6g5lcixu3cv3mhe24ygnj0opjmrxkmwol4jlmbzhzo49h1qlrabkq0dzz25hstn4dtnkyjcnwp2oc7rmp3w3d1mzidkny7fxbffi6225ourgfqhis5dvqubyxco9ydz8m6ww48w2ntugt1mcikm170wxxlm4y6pdc2wraspsjiuegczdxdrdbky4jhpr6egbqxmyssvybuhcd1zsqobt4gcywqx4e610clga79uma2ld1cyp0s97tqv7wt1hru51j7xbv3w1xljucsv65wtrz6cx7pu5gc87lw1v5vhw2lfuxianvrok6168jb9kvr2o9u8u0jo2nb9yur46aykdkbfxeck375gz3yvatq4zb5ulxlyo9ydbq1491ia74udm27544zhdf5tjorxlqrks3qh5rci3342r2ml44wfpqt05hybo7d9y6u13sd2vq89bg2398ykb0xla35o3995qhyxddoy3rnqsob4m98i0ukbust10ap56xuo9g2dv3v1ezzhix3tfiletob3adi98q7z2ala0w58565zbcvljl3w0zn6iyco79yr8pgc8q84nkexbmwv3mjc7le0pl06gmz6w78g2dsf3i5mrlz7fvezaw35079wdf5sfy2vud6eb68cyyomzpvjy7kialpod5afcui09p5bn80y5eo0jyuenur18qnl9fh1t3ntakhtkdpbvowmwd1fr4ht4v8ehvbhnyeopxipv8hod7c4xzr4isuudisuw6gr0yo57j5q1w8gtofdop3b36dn3bkq0t0ea0uh80xz2fzxdd9qx50pa712q6s40citc7hvs2q6icilrfp1t0eqrof6yy09nmu6h77l59bwbfp43j8ybn49k0osrw5rsd2ht1iidcxusqek281klxd0wpnqmj791vd7a95uaph99eigbf6ga63o432ley17et0lps05eik3nceernot48eq31lxwiioy63wuynlvo2w9hc8zaqiga37svej6qvfmudr3706s1xne4go9aqy2nqbm3yhrziqc50cp7lhsoock8ba1w2yga97fbne7qv8nok7jis1hwojx5cr6rvhkvh3cgr3bunchytadoqha6z0h83k',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '5gpke6lzxhfuyds7tv7qihkwwo4b5kqti1rs335xzmkuwgz310',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'ut24jhncie4e465ubjxu',
                channelHash: 'chl17ko3nwqx7me6yxqyh3npb33aoc856wa6ngwcg',
                channelParty: '642e1qyj6xv8ofhq8k69c2wojuk5k7sp77xrhm3axyirua0cwf3drbjnisdcl16itfsk58ojt2rxpu5m6lrhlw4crk5596drgf3mm26izsp1y04hes622astbvunz9mil8qjexe3vxda3384ttvk6gqbwhtkien6',
                channelComponent: 'szicpht8vqvd5pjy8mvjl8kscoo5122yoscsn218tvf8fqzdb7x77lkag8pm09fd7uouakavyz5smcnxb8chrft2405kcu383lbl6phi5974hxcegahhbyxldm8fap8or84p6rw3hhl0sf7xdj0s9ck23djc1yhp',
                channelName: 'snvn53rccpa5cz4lx8ircgzxbeiivbpigl5jaco0njqwgs188oe94yza3pza5r2yv9y5j1twbglf9eheol9m5hitpscs5dhbbksbuz2lx0q30tzhq5dcx9ykk7d5yqyh6a3jd1pcc93ktewh46m4p4nmapto6cw0',
                flowHash: 'snolnubb4qtkrktrrogj099r3ln8zfawi1wbbgw5',
                flowParty: '0gdyo466lxrsdt01ta30fhm574symyca6s02us17y6px9rnews6g70x0unlfdwk3es383v0u5uzqhv6zxwbbdppjoyu90rx89yus1h0owuoyvxkqb9s1h4sc98o4nhhxsdhewcorl15r43sc51sqtb0px133qf2i',
                flowReceiverParty: 'omxu6xq5pgeifv65y6uia3bpjsv2isevwdsuqach639gz0fy3vhyqepk0xmnpyq9oufe95n557y04v6xv2bcdlxkoyzm080sdl4n9e3gllk4agx1v3wwnl2t5l93aquo7777d9h5u09rqk4jvqj3t9ob4exr37ho',
                flowComponent: 'x9tjcgdvtmdzuex9nfsdcc6n32bcpvftadg0vo5aloqh6mlwr87mgidiyqw0tjs2o5wbugbm399wpdvxenjd6yqlvxzdar3xl08fg3cvz8ln2jm24b7a8ex5n6tz6hvnts1wp8ybgsr33nya6tl3b16d5h4rau9m',
                flowReceiverComponent: 'ey1zxt1fzhoqly3f90l55diaymwoidfn16ptsi0fxtk832kiaj5a4vq9nqvp0ehcf6gljmjk0l4n6jadnbix9fjml84zu4llgnwhphoydxkjat6sr2hnsrkmydf5idfvlq7x2uwo9kp9fzk45r46a9dkw05s517g',
                flowInterfaceName: 'jt4co29099h8b1tlmu9wgnnz6c0up2easy4pc0dteelmcemogyw6bfzkfyzejrgaudba5i2l025fel8pdrpf70lvgs1gp68ialynnsz5vslmifvbt4s444esm5rhtn1qv1cpy6zo9kvxufsyozqwhck29z73uw17',
                flowInterfaceNamespace: '3l0jw22konvn2ehax8lcyiae79kq0swsjl06f3f24smpskg19pznas2a7c01wg3q5hzl5oeftgteyy30h1n9gizocrouvz1ojp2t28yuoz8n0yo2i4wdw7ceksxfcnz15y9jaowzb9uvin3t9sockv5q7soc90h9',
                version: 'ke8kc3uugt2fkfoiuotv',
                parameterGroup: 'o853ldwni39q11ea0kw6c1my0bt0rd8kqfr732jiu4nvqv0i7ek04v8qb7zr9qwb9u5jxjnwlcbhwbre9ce1haygcjp5mwzracaxagk6d1askutgdugldjmhyqqrmsnhbfn45pfueswwy24we0sdrwnsnbokieuqeai0gzucoopuw08awfi3qjoj0wieqwmp87rgp7d6imfgjybrxqhugzwg44w1ccu2mzpb0k49d2cj3pc5ocnzpvrmhzw3m85',
                name: '69o6rvijpa7mcpsu30lx696m61z2hjflg3i928qc64ghi0gq9ao6jqitv559cjg44tu4y021fx5gck2pon93cb9d74kd9a6wjoh1jtvlcwsehl43buus5n4yu9ckrhymazatuxt0u0p5k0qnc2v2bz909b8mq96bo2nxuj1b59sa354e7rqs4d2kxuln3mcjvbe5ou32vaa0g9qultgib5210szzoc189pq8cu9en8spqpn0kjmf9fq9bnaeqvl6jc5m0d9i8a9bk1fsnbjkiaq8c8ci3k1ehdvyzmuyu18d3k75nzg8w4fcyy2fugs6',
                parameterName: 'xb36s66ds1qjbl5vd0yxfcr7ixbb9lehruvp9nwufrr2mtpeqlagb8jkz8ewl14x3j5yc8ng2lgurinyjgyv9rdewxiplwjj07nrw0m0ezxmu0yefv4wdjqnlgs90wednb3ud4fj8rnjf19rxnvxjud0uxcsgid5rj1hjiemxncqazawcdear8j64t32qh5tyhv64umrm5nrd4yls50c2xd48vsbdw0uqzc43igdor4cdz2y8sy127no5d7gux0g3gs4k12l9zgr8m0rgylovq5pxyb703ffhvxcdsezm4k18tt6wkg186y1jdnggbsr',
                parameterValue: '63web0ck4667x0dyutjd5d3c8pz8g3b5hccxhfi3qlgnsnplmm1ryumb7j668ou31gbapjg766m71cigq7zkj6g5t79dbozvazdty176bynyoud1szkezstvvh5om1iza87qzau635iflxhdcz72uj5kmy8rnoznanlk566ddci8goaovf39lt0j1ejhd2bqs8x1x1acwxaxn12ebl0jgaz6ct62e4a3wjbnh890ykq15g4ed1ukxtzaomi27hlp4uq997st6aip0mf1g1b9qetu9pktxi373s3rst0iqi3u2ytkudtugh4snx62epfjy1kc7o8zulep70u7ssyk8d1dihncbcrowa869l4syfozr0qk0copxq07y7hvfx3lre2ecudeteffx6kahe2bqs874dh4nde13ah1w9gefqm9dnjsv42tvjggin63uw8ej67hp41aymr3s1cq1k2hsc3sq99ufp4n8w530c0zlh0143xoodtcr55bvantm4h2yen8r5mhlk4d1mrqtqzj1nkvwzd38tk2k3j3rktny7ywnvntqb1qyglo27ddkb9rkkjj1m5hbkw1qfuz78ghbobpft0h79qj9s81mfzusiyq6os7n2kc9yr53p89jzwp9wwcxea4unrt2z0yjqv0h1pklmn8u7fxky0r8cyws52uxon3jka5r72ylp72hv8zq2z2u1uxobkrakn1x9digdgqx78es6d75jxr7wyuciewdhzjfe7pbp2k6pe4zsindoe2v6uxgx8qq8a4ar8af9obbjywkr0i2qjf01vkwqctxqs9jy9n1ex2fwjt6lm5hb6bdcwg7alvt2idvvnp1glxgrga1a65bp4otw17476tu6puu6lguji6j4gsqv6nc4cbragm5b873x06tryye6inl9wvw75qn2wjv1wmsx7skg1a6ory1cje7uc4txol9rackd0lf2dxcnx9j7mi9m8p9jsqktxm96gbf8v8vn0qyxl7cdg58obriwephsa6i2b0mrmy4syqnfjuii61h2dr2g1zutsrgc53hzvkwzj69f4mymh8vbppns255vnjl9ycn8ynr9aiivd67u85ebf31hhddnejqyfdpdrjcs2551lyt39il8joya166l6t3x7nk38g1qwy29t4yissxrssnxwfpqzhpoo8s6ha6a6gtghal71eprcqp78xvte1m66v3s78jzq18tpcd1g1cne75pltawieac48ovtdn8j59z9z3vhul0wgouo91744vl12jk8eoflvdsca1buhtm0dy3vrki7a22prf57bt4klccgc6suo1cr1x51dgqcdymplprpbbb9xsov94cjnovkgi1x5f7s40n1zr77q7h85pti9audk4kfxde3nsjghfp0uova6lyc3e035pq4v0tzouk8znfmhwnyv3zkl99rp4o9tpqy334k5ejx5jpo4mohy6jxy4qtc3900xttnfuyxbvu8rewib9zcy9etl7r2b1ublhoyvviey0l3qsgamb7tb9rve0tkqobc6rnnk3251y0eggamk771dz8zmyd2lffkb2af7bbno7s6731vmonto8bdawkeyyya6a9vtge54uwti814qd8r4aoaggjhh4ailxkuwwj3jwml8rtawoz66dqqzal31y36xrfyvai3tnb1rt9kq5dgeofidyh2dymdqa2l1xp2vp9iwfyk8kqx4kci9opj674qtdmd7csd1ga33byuvqpe1smk09qskngs6b79oqoyf159e11h5gww4w17dm9i3c8jghyzrf6f5ezxsbqfe00gxyjywfcwcdvti8vd4d9wls73uhc860z4n8zdtj0gwjebobbaaud9or1w5f0kkrt3w59mby59up6fuxjzctm9zm98vi0mf8r3be8wchtqsddf94qynuz879zseav92ws6xu3a7p6ldwarsj9zsmdshz9uf5hgflvpftlny18u3tlawke5vmizbdn8qlqlantk41rid7r22ms0chbvgeplcsoet3el',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '7oonqaidurrhxn82g9q5bb6ydeudkfi9gvqtn1a3hzl5bn87rm',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'an4msagmn2q4su0nmk4q',
                channelHash: '92zotu8qtnuhzjf00omfbgj8svotfpdicikm6vqg',
                channelParty: '5jicitcmrof7t2ebvo7t2hbvzixpq18xm4ziuk7sv828ncxd2ge7xc78z1kxr0mcwzdn0nbg10zvqrli1coea4f5g04ftuffj5ol14j3ov8scxwv307xvfvoei1cxf94v9lqec47ggp92dv4qqu4643r4e6pi966',
                channelComponent: 'klet84yb5vxwx40mhuxsk5rxfkfqnmksj2h5mryaqqb92rpu6a1u41tl26x44rhmjxmigjbka08zy4y0ddk8fmo50o6fzqw6nxvdwt8qjkzo18n5yrvy0wd3w58hjkcak4piy5hh4l3z1gs81o10hac8lamad272',
                channelName: 'tyzr0kctgq0kctw3zt1bghrn51qrcrfs5jwxi1zp682jcixg3c789z87to51vyg60ln1ojhabyi2hcdzjo7mxbtk8nazsuvbcciiywav449amvw97hfb5mrrbufkkn4hit9euxuyp9a1zeg0e9x7nw0z9c2wiv6a',
                flowHash: 'ge34jk35ccv6phyf8flbswytn3v19rv2ge05rl1o6',
                flowParty: '5bg4pn63h3mw73619za4dqzwsq5onis998xzb5u00ts271pc7yadgpnr854g0nqoa451lbc91rz4kdd8f1zogiopl01qx80hoj9ju31u4evkqtdbgg0s63j7vkrh52omhyuxb32jur2g4nah9fw0aguiaac9njyi',
                flowReceiverParty: 'ihe34atc0b0thii51m38rzqics322962qyuppknvy28lor2623odmgb0c61hkq3eabsrs6ufl6tm12ac0o5ok3yiqf62x6koxwj0sf05h3h7so8230z7zcwcf1u0kd82xqhxb68za0l9qwwjjhh0r8f4jvl9ig3a',
                flowComponent: 'aac1tba8urruk4sg34p2ummk3lbra1mup8tqlrrkhcaax69pql9r0khx7moex7alnm9e48nb9n29bypic460k27nlz6pxc3us1wr4sra8xy992dvwttpjk3rfb9p3qdnm4jxjrtmbmd5wjz2s8f444n4tsn427zb',
                flowReceiverComponent: 'lgkx4c1jz04e803clkp69ubvo2jblmzuox59tbui7qvojt7o1kybu1grw5fdj8a0yfim3rhy1m47xe1ri66d31dm5lpmcaylf5syx15g45us7g8y9ttm4tkx2lt41wuxiantqnpg0ppg723729r3h3tf25dtw6ps',
                flowInterfaceName: '0lxmkhxgc0oz5uu18vg04zyfg43jkm6ryubdbhv8g155foac8xsv16hq1i6rntckzomc0w7coi3obke60av9h8mi09e0ptvn5kgdpxstxw5q2a9u5wczz70dr4kv15d3qmrme3hmvd3ret4a4vebz4uwytljhqwb',
                flowInterfaceNamespace: 'qfy72eu35e6gi1vp5y5qr4qjoxifyea0yfrqsxlsg81s258thhxeaq51r5fbkvgmrznggpbm1ygh54f43brpjspjjowm47t7ixeo775s71xeudr1oae97nixo4gl2c9zv13s127bnf9iwkjwhrcg9p9atys9z2ta',
                version: '6v0z0jk2g2q6qjydsreq',
                parameterGroup: '0rgh290ug2czoq3lfs3zcovk2pbyj06iewlxj5kzse6rz72yq586x6gm5dpyiqint34a31kshtsl8jbbft2gnh2szg0hjylsvpv1ka7qozi7ibecby6qdmexwwehx3r288a7d0s7rqp236w84g4pi3o36tbpm3zlmjylf19ctkp4e8ccjj5zvqdq18y0zz24nhrwmmuzep1s1nncqsyxksrg4tugypf8xm1u0cwdqllwx121eylcy55zogqy1eb',
                name: 'qtr8s2yltfsolueb5cjfzfas6betmqs8wcv7ff7pp74uy2lvdter1md3m0q8a5t3h4c5y1px56olo86hizf60qht55dmarj3wyemm77vgm4z58qog49rzxhtz5q9qs9nz3whcy8fjokh9t205kzzzvr3078xbsy5voycfkuszw8p9mhuxamnz16out8vvtfhrn0d0mlm48c0v9a3y84jo2q1ert0c7022uv2zjm9bm6xw4d0jgs6jx6r1tnnnotf0jo7poh6j0w5j7jsw4rtqrzghqhlvamyntji9aae0tqygojjbk8pvjwvqt88eqnr',
                parameterName: '11y5q5iiajcb3pn0ta3qdbr3f0a68f79ta9q4w3kr6hnflntw0q76mgoztc7z44er4bz7uhzk007ywbalsjownqtjx3qykchxsmk3osksjigeedg1rcaaqlte5kytwi39az0j1341viw6xj8nl8yj64pkvrej1guwfed0u1wgmq1w83r32m6dz4xrdgb1z6we6bghuou6eqwwuvwt2vcqfr1e4b0l11mdo2opgyy3ot3etoao7g8y0oeglbf4j2k35pt4wflf5jqnf5xlc3wzg6792keq95580gf4wttf83orbpoiwza1p3bf989f8zc',
                parameterValue: 'yl9313d6k30shpx314t6wg23oyi5fr8th8u6x9m8fam04iwrvjtksdxad5m8jndadzfktkulen0cmh2m4553u3yybuq2z1ire8r9wqzqvsldwxottimg98od7w7svtcdp79vwrw1pjloh1wwmw32udns8fza224ppxnkjgdna6y74djwu5o7zhk7gipzddxw69ydnm4cd9ifkjdncrfe3dosout8t6p1sse6b7vfxukapgu3bgm3e6325ztfs8x2isvlnbhpwx7p53sdqg7f1bq7z4wwt3yn2qhnlrebct0kqfyidovezf6r3utev0ddmxfa94l6ka221whbvobirpotnuuu8lykw9jawgu988n3c7qiqzt41nvyoa0zpsnuelqpxyqyqpmqdw7fyaj7wbu1w54jz7cfwmudhqtp0ov5eydr76wiv98g1tbd9a0u4pufnrvr49uq4ukengaiux42ocbyz8m0njgt8dz5sg96xq693ubmpu8wjga9xvrl0ylq01jzkewin8n9ajaq78pl8ecavwvqfjeif4et7fyl472bai5d6qhfuuln5ghholi8j70gb2kz3ukv5fe0t4vvhqq3vocangczpgx4qt501acphgogfsvaw4d7shntic5tty4l5suj8dtpid3aomoy0teq4hxrkf93t3zfv01o7q5rtj766hprft58uke84pkaqssuq1i10xpftk3pctqxvneh0f11rdyak42t8r8a7o0itqg761etszik4c1le2h2f4rew0t9oh57iccdqtmmz3fgr1jf4cm9yj3rgy9e7cecz92s0aj3nhs63fpln9ml67aq5pvz6ijek9nvqtjg83ow6htekqz4wzhohk13pda45t9j6llku7to2d5k9mdo85j2rv47jh29y8co8xxwh44o7bo3xc7iu3ia5c638qs97ki7qkkqw8fudxolualdvkov9w6o0fiaiq16gltwtpr21sf2se5dfbi56d7v47q04291yfn76owyl92kzghpl8gvltgyzn8h8e74k0wlse16woj5aq6rbz9yg82k8ylfqf0rfu7pljl43fgkx8gu6ugsp2vm5ibmut6pm5xoht61toduyh97y5yqkqrlfhedjfv3vkzsvgv04uj9k3xz4duiuxnua6ezrj7zcpe1240wmyjp4g3pw9jb8o79w6fomtlk2gkv4byg05b4ekl53cybgo9vom72qwe7uzrf1ftxscbe935rmmrq4b09tigm571e0pbwo1gc4i1lxbprknkqd6yh4upn3i15xpsptkkcoodjj198e1dpegdlxkhkj9397404b73b52m0ulwaieqk6fuxeuhhg28lgnaupy2em2dw2fybvhzrub1sz52d362kap7yjngig6rg4p6cjt1k2dxnh1qqigr185huw9fflsay15l3c79ejb7do779jkhvqnvpfayktwx96ermly651e9ynymtwolz255wfjhinu05knmjh83swmz631859tym71ob6ff5i9fwpo6guq5rcmgn1tophotjjmvj20jhfysnz4eu8bbbw9fvx52ia880etoe0awvi3f247rauciolzrqaywd25j7tln6fhi4nvvce651xmis77ipt9z3i6o5gm69uza3h7p6fvkwqhxebbixuepmki2hjzh3liaga0ldmwwpdb9azc9303f1wl74gxwkttcy6hq6iwr98w9qud3qm9nmm9fqz52trtgjcbi56l12f7ipz566n6gvz3q6g54z6colbjkkh6dezz3mtvbthvon4fpvrpl0f1zfdc5n6wngjer1qt5w46yyyl9j3uo4hm2nj8zb0c0ipncigd70mcbk2hdyjlp3nak5l9v4272k6dbrj36yynxo30a3zt4363z54439x9t2leg1jo4074rjredr4oz8lf8fzjlx6pu6lkfi3r391ntiibvyi5q6e1skhcruxv0fe9fdbzneyhbu6y4etv2tm6h5oxljpl0g3bxry42hwp01szonti1he9u9onpb',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'xns3wq5fxfkaveug53qs0q9plfy9r5wug9j8229ilkr8yyzsewe',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'mpvuonjhp3z8snk2vu6d',
                channelHash: '1v8jgodvvld8g0j4oyr58uaekl6fefvdu3tbznf6',
                channelParty: 'ijcjv1uvhg72otjz5p6a27xh04bsgverz12wfupk1ltvdh5pjogko2isrqaxcgzm5n26x57om7xwuiytiz33iuqu1fulm66407j9r1e44lby1304q2ekf365t35tradw1okfe71m4ehybe4xdpyhelunei4pcxqt',
                channelComponent: 'crgen7ye18yp1cgcgqurmqw6c781bxmhg93nkiubp9a1yotmangbwqfh99uznkfv0zffonvw3wothl65i6w2xeir8ggp07cilbhw7ip2x0oe3qovuvlh9nkrzabpkc0fr5dk8l46lfbccd509oyef17kw3esxcgz',
                channelName: 'isif06b2fzkggxuigusbvwdkqsy474le229272xateex6w90yko5cbh7l82ykkcy5wc4aj49zfuc9vxryxeawt1t3jl1593vj2h3yi1o4q9pi4pq5ch8rir9020pkdbr0xlhz8mkdb91l6513em1fwbohv2ibn5w',
                flowHash: '76no5h87blyhiymcw28r0ij8cp614ttf7avsxper',
                flowParty: 'hfym93jhuoqw2dkvex5703vc5bnpmw21hisnzemm9whxscn75ns2xenqzu2pefd5d0c3fjzk3qnocfwj0iue2txilf5peluqy5tn3bla2rdbtcxdqfkv4eoq6wup5jyfecxrb9z2cx7x5o4ve0zjpnqmoyhnhcpl',
                flowReceiverParty: 'v34zspm0meqeb7xju2m42hk800o9yfv94tic6ec7nm04eyyk905oetvj5ke3ntz9gx5901kpd3od9t34j58boyki8lev4n7au4k1cdn4rxii9b3u5qyuvwadfofomy38rjfe3tepd2l301jgmh75es4yc4s5fm96',
                flowComponent: 'wt4lijdus624w335y0f3lhuc7dgg7xjagfz9qrh090stfff9pomuwokh8ztqwofw28l304wam02bjymycgc68bikj1ra6yqhhh6p7clr0c9p9ftwxgeo2ak311n1wlxtlk1421pbwbogmnofx2jri59fcd8491uf',
                flowReceiverComponent: 'm5v2pzwx0zgdy3erki6aswupl2z0ozhfhw62dv63nsyoyy7z06z8wlzrtc6zyd9qxprbyil2pvv8qkp862jc6unv8bpwip0d9omqer1l0h4p5xu76rdjvb3ahq5q91qvc54myh58uhlbkwgsxrtpwj22phuorlo0',
                flowInterfaceName: 'ejyh2ge342rc6cw30idbqn5pmatzidve3z1jfi20ahzizt00474sk4u38o6qvduy3lb50dpp89752fwkqn2p01n59a1p9qmh5btgiieayxememvab4p9jluc9z3ynx9cifouwtg6aiy9zsonmh0vm5shhvwnql7x',
                flowInterfaceNamespace: '5rm8sqepw55bz1bgiq00dcp52i0rxkgbb6e7z983tw8l51qbuqko7hw0n262qkah2o5wo400cy1f3m3yh2yhdycjquy401azl9jvyatq0s7yj581z75n7b1wjj2ky0deohy7i4ogm7di6xzadwwsexzvkeug50uy',
                version: 'r2yzzey11e74twxu2w4h',
                parameterGroup: 'fjlhpf9ed2b16qa74wh13gw5q16hijj8gd3oajqpwv2vox2vibzv4ej4x529icvueqb8838y1hijlz72rs1ikyztbb8999s1vengp9cf1jdca3s7y6p0o9a0j29etwfpn4ecipj7qspb6k61h0niae6f64jfrsaeycljht693gos2nmy38jol6d38ldc4epkbxabeiebft20pl6hfrl6o3ojanq8ekx6yfulv1scf57bl2761q4rbutd3bwcjej',
                name: 'laklfxn1f8anrfrrhlvqzm62ei4e5c45fpfhig1reuqj41ylbb080vstgggspjw1zjzn1h6oclaz36eh0ra1dshv5l1cnxjl1nj7evuj6de3mlmgww3vqoa006latpom6gkm9zmxr4ht7594cjgd6h47qrb1hnqc7u6cf5481dzdvc76m97al5gj4ytm3jav6mrd30rninfks80lkunqnb15gklx28ubleoqqn7bpvaztynmyvelacney9v4s2wxo9hsykgg835asn3pwnn3kpkrjfl4hki4z2eu41dx3ioevqg6pzmcqf4sb8h8e71r',
                parameterName: 'qgq1dxdwrv948wtkhh7huedq8uphlucoql5hevxi16fz0xcfxd42jdef7kakok4h581b53wtsopvb1txh6bu8hmabpugdel8qskcrmyrhlwu2e8i1sd9qh1tg4e4npycq62fxw3b3h4qjk1fefddrc1m32v0nt7tm5fpj3d66l2ge0krkhac6xty7bq4lbxmj9gctf0e4tbeouyuhgrcye7ws1n0lf611x3lr49ov4lqfvrhbmj8w3t6p4e0y9dbc54o09kcl15ydizxz1t5w83c1lbzzheq27jh9wn5l6hdgdd0rtyqvnkuleq6s372',
                parameterValue: '1veoqkl57jqzsh0rs1uco115wxdv2lhluee03b5dnkeod3m27kikcz2p5a0q7yxfthqq0fov2aqga60sgrxmu9evefkl3s7xqfcma65nth4dnnqdbif6lsegtfaoak8l3htvd3ylbdptrpnqk0gkxn7lnspr19wh23ckyg4drd7ouh0psn8wzit776eap8l0admhpfk6emcjjr9gf1womzaddbviug2t3np3ecosxafo9vvnbjyjfhtiwle6luulb55rsfig85uzhyjs3b2cmq146myhcse163hvenglctelw4ky8xrp5h6ug9gn6ergpwkq0puqcpsz1bb6wbvrhkb4jjl840gbkeo52ef9vlul9tqd9n3frxhyzmx0mrh8f9rndi7dh0n69l16d80y00i74w6e11jyurdrdrlyrw741i7c2nwttgfrtnctzspcjc13wi3r900wyb7npfwc1wxqpxdcmpusuyz2uxh9kbl9gtnl7ks3exd514x9haqouv6c2jjnxfh7nga149dgx361ek8pgit7b50zgbdq0clxcz3x4o3umljtoglze1mj86xci05lcsji882scdnuxe5gkg8go9llxhrkjc1wvedlrqlxb7lcpn2tj2r3nea73rq7ws0kgar6rwzx2usxno8tjmsj80uds348w9i9b5au20gg3j5jzuf1i08qp5auzw0sb3pos7pqaeh15wkmk07dyuqu9vyxq8xm6hrny4auo4e5yg9imvhr9a302tx1k0bumb8kyf6eeq6mlmvs2ewcsnw08roishmcl4r63jfkdao4tez5z1didqk4ofrx3a37dk0sz5xu5qwaiz23r9osuqp6xw91ehewlej8mwzlwn6h3123wbh9eqbyvivlnkbz9kxlzgkrzcc22sndtw7vnkl3gotopz4ph66ewpkmzw5yvvvca23yuhqhxsqo04r354dfv5y7lm4xhp0fifwo7vpyrgfqhmrwiq0xuttkdrpopjzm45gn1647520bwyqkwroe9l9rmfa15xho5crjqseirsr6ws8zl7kqoc15uctb9pe5snakuuqwe7qvkbi9wnsu1gl58h56h584qqbz5yww0673480pjmbof771kodh93e5ygktrh1hd1aatqv5nfitugmj5mt0zit28guu3ey4a3dmkq1cd2ur6kzk5knfwy8da7pyeabqx9s7dszer625vtd9ivlhxj4y5axqs2glhwp1105aaziw93xxka1urppvqs46vbtmnxi2lcy43gnnpq8umkfwb2qkh2pbs4t9oh3hgdok9dzw1yk0z8027ojlsgi6gops0108y0zdmjb0bbnx47jckd5afsnr38sbs2xhjz0fcr2zone0me85ti4o1eszfsnb5lv1n89lj4wzehnyxu4k8uicfxi8mih74hvl6el28m209mscx163brz80fu3jd4lt186ucvqfzw5rapklae9vrododubxb8vvl2f0z9o5swvt00znq3c1t9z8zjyr7wygzougqb8pdpivm1jha1oejj4g4shkgns7vae853dwq0o3lsqf3qde1vnoaad7whdsorb97z2mk5vawui7ox2fzwkvhwva6npy579tngzjvlrpm59ha5cyeo7g67jgs5kphropk0ymj5qn74kedk7jv00ecvxi7xmxpl0b09uowwb4sbtzh4tidc09gv87kvw7fve4yjui5jf9rkqx7cxv01fr8v1pncacvhad6pt4386gvuih8cra5zlva8hnatoh6ocqe1rfjtsyqs6bhh7mj2ck0f6zpkbitf79jdch9ljn60loxy26cg4nmzvje750coow6l77ndf4y60hiolyjn7k19w4qwcdlfj6x04d5ofkn9pv54rp6bssr9oams86q4e6vcuek0uaeub6axtxqer8tpzk47qcmpdfqr1v9hmkmgco0q2qfjgp1jj26vzd5312cwj5ep8v48e9dcb7f9e53xnnlp4plkjgofjplypo6taswuckuqsngg5do4cdrrm',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '2wxpcty6teye7uym7y4nhxwfe7w1wer3n3mwf6qp2gcr08o5bx',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'dt9rw44ly320fhsa17jp3',
                channelHash: '3zxsfmhqaomlyewgxhs5kfnhqcy4p7qd0460fiii',
                channelParty: 'bqzit3qazquopso923roweg3ke9ecftahtiqk0hd8454ft09i4d8wy5smhfe5xmpulpgt4mwzgxks2mdqu786g5zhtto8h0hm9ohsjjvf7vkt1v5ugn19093j7bva6oo6h75xxt37e9s18ysuv28ppps4iio0ik3',
                channelComponent: 'fkbc0rqs5nixsvhew1m57pixavasvddrt3vyna36zj9tymbf9lnaxby8ubefa6lq3jevi0f8hs2r2h593neg7uq3o7y0val9wphqwozn5ufed01o2u7teumppvjkgb2anu0zbtieby2bxgww2jjcmyxq416hui1l',
                channelName: 'pjlzkdj4dpd0mqx9esyf8hf63ecjej9e9cy7w2powquf7gs6xdp0uwzg9szolylhq254p5i2j6r00voh9uz6l829rbkktemfrlqefk8mhqvuh6xgcvyoxxj0xj46a3nt0md23wyp41we184ozwe9g89lhbg9b11c',
                flowHash: '5tx5geo0u5jn8ltg6nqe2n5lxscc4nfosh7gc1ej',
                flowParty: 'fx3mhwtc848w0d6qot0wqflqdkwebtwjevnem3hv9l8wsjhi5omr475lddj70ryrdcmvspkqtyblqyhy3xgazboi6r7b43og0vk3eyb40v3n62pl8zgt2v703s5g4xb9r7nlc8paooes0i9g9kpyz8yljrxaukj7',
                flowReceiverParty: 'qfqfz9mhe3asxykn8zyxzbq58nnlh0gxvyv46fnyvbpsuazh7bpdpxyi297j4lzwc7kiqcwifek1l4v7kz8fd6cejkkxa6unvwl489ci9hp1wda9n5q88zub1q2wpdzn2s0d19gh8oxm0vporaap0k80owzronir',
                flowComponent: 'wm6p7kdittmitktfp5mq69vn1v9ekc41dykj470rtpq3fre5849hj02u97oh5re06jypr47p5nh3djqq20hlcegyqzr0etnrmvadfep3993l5lzolc89wc83gsjhnspw2zel5e9jmu4k749weh4gevldj3h75r09',
                flowReceiverComponent: '1md6q3meedp6nnlrlvwsrvvbf0k5n0u0p357vkqw3mfewu8g32ln826izptc6otb1oa997ekh1n6engkhlmu6dxczzoqlswl72cayuz4ns0cgoog57ho5epb3gzjlay5h0e1chdfbs3366k122t65orb53t9ewxl',
                flowInterfaceName: '4l8ob6ex48mlonnhezs3ab95dpvgtj3fnictck2rbfy9bdlkglotq74b6yb1qi3nb6w89rz183l4upl97je9mpisyht0scji300oid8krhf6z3xui00f918r8ajnxw4ldqihdotip6kkr3ge3cxrkxtzjpcy1cm3',
                flowInterfaceNamespace: 'uuobkyizf09n6lq4ark6z86e3qri3kp2b9gzo56g8p7j0jtjna3710xps0wy1q6f1y68nxdunshh1agcc8jzjjyec1ep0eb5xi25v9npvrppkzq28oas9ucncqodfishrsmhy80ze9uqfw4f0utj87npteyr7eka',
                version: '2io8txywkx47xz9ziqlz',
                parameterGroup: 'rem72shjxv8w0qh5ubdupv1ebsxw3c3teqkd6fvsy8vbiso3m9rk3tyzh4i77oghn38e4ob0hv7g2e75tek6jmmcqu51as804ckrv2d0hy1izmziorsbgd0cqrj26iyf2ri29cz72vshovdk20n2trllmx32d3uky6pvvzifvii6sq4170k7aindes31vempjuahmi20icxhhu5w8ocv5gpghbav37mbg62fomeicj9y50usjlgi69d9hri565i',
                name: 'y6gr4r1owz7v3wouqhddlspgswb7e4b1rth7xmwadr7jcdy8w47osflnkm1r7i9ytwv4ljxe8rsm3bbwooflgxbjak6h0xoudy5fs3h9zp4l5ptz6diqjkd7ovi0dhqpvutl7jx18uxnlbgloghfy8glkze9gwqydw8su2x9yswkmiujwq8alh2dp4lj7oeu50asusum99owqvj92sx18cmvd071eupt3xuotyrxl4s8jyzzxyhqxfl5w5a6zv58w4g2tw9986ec4nhokvpox2xkit36bdra7tziqaeidg6naljyr2w71tq039st08yr',
                parameterName: '3mplbcpbg7rr175lbq46fl39yv248ipz6gcjgeei6sy3v0xad3wviim9zlqjhhtlx8oegeyufjizt426mx7s13juw75fqjppizgvgf1ml432dmetovolwbczaigdnzleb99xuqxcreh9j4b2s2snske9o72mnyii14m8krr3b3rsv6zyhgoop4wckf5er9qf9d3nlf53xvhc3kiyno26793by3p3or9494p70yymg0fjtzj6q1ckmwkrrtm43zrb4ohrbyvzz7vzb3rb4pfjgdobcqwrggi095ihml6z5i5ckgtw14zyxw1xbcg06u04',
                parameterValue: '3bvl8x1cnlalxq9ej2z7fuya4i3qejx317hi7fv6a4519kdafpwaq0nu6uv5wn6z6gjxwsnijibvbk07gzyrn0v9imckny4onvk999zqdyl24gf5y8yxj94zt54kdfz6nv6fmt1dwp9f07lhqqzsx0y2llrj9811hqzbphdecwpn8u19dbffxzz7r5swmahhq87zhzll2sqjyq8iizpn8p39q23ja63shi2cinazcniakkyqlz2hlxyknagjrb1m1qc8xpyz650iu8ilyt2gccat1txeilrumrbz80gh6m4i4vxhvu1aiwchvaphi612p66aq9cricx3yfo3okshqsc86gq1e8vfrxa9hg25x8i7egujxpzrg5hbv1jlwmz1hf3ls6x4czykclgyt4egxebqb3rpnxbdvlfexzmequh0y99fm11ng5n1h6hs90cv3kfvai8bdrqfyljj7gz6t8gsten4njtjqemlrsezahiidleyci5vc7xaolflbgz1gn3hrww2063v73g5gmy2tyu7sysehlg2yrc9v5oonxo9biq4uiqh4a9dq3129pjh9luq2b11wv1y3clwgb4yf277ulhkgmo3qk6upv5idgox4yqslf6z8dih6ev201qqezut09bchnscqw4g0pgp8surrcozvsbepb2suk12h6rvybrya1zuvwyvyqtf8qvptw97iwnzqr1yp9pyo1nqvdvsxzvca81oz9d63u17v4t3er4wgzrp1nfb8h8ob2clvzsdgw46hla1ciorsopjkfbpcmjlqyjakc8kgkkx3kikjwmah4fu94ln4jqbeyahurvlnrjrd5t2842tsvdlvn1xqs42atcg3yx2t6h4yweyern84bphrxgel2wcvd37khpcwsqsk6sh7b8e1ogxgm33ca62i10dj3gxupxehis99saoiklgdhhqhnupifhpihwz9zwhernik21lyxt7zo5ruqkhx68zk40srjl0af3r28vjlp2l8tqe8r2hm161x84ht93vt1y4txipmpvkosnm2x5mxs4unep6dbrnrf6yyl25fdptjk27i2jkxa16enj3ows7d97rj30cc2md9bh8mc1p0xmincx044p7d9o2qunp25miso0hv4yey1rfs8gej01n55ne6iekdmbz4207b2yzc2xcfbllofls3weo4qukjdj32u680is1umvtxtrx07315dan915rzb1xjpp83c05i3wf3qq4bixa2t1sbmaultqgg3k2jaxze8dve9lr04z0u06yvgmoa6y9asddlix363v64hwpqzndikjhtl37i5tsd07paxavl0faivtts8si94aa725j8631834ztefzxt6ngxe4ud4ajr7225ieeev05zxxjse78mmrl6ui6z0nrp6lxvkwn6d9qwmxl63vo3qgu36sv8bcjcgngpt0tx5tfohu755o22bo6jt5bb40u06xge3zqi39uoe67soj1zadkak4i724x74lnt852oe75jz282hcirlwl3gvb3s0i5mlf1cvr62rqa2qatern1g95pb7ov7oujlv68fdgfcrgh8bqxpdasuvxv0q5ligec5wanhr09yh9561ag1fak3h8wlpwcmvekt92hswlqusej2374djud3vrsb8d380bxvw8bbfepfjh8ly86tdtx86vsugw6qdblt8lvby4c7yhy5a4tlges2fi7eon9a39hec4yo5rxyh2uv68kbepummmq33xh4lc9c22739p5793zy271kigjs6bapczmflkbdq15hq61row5qu5sckcbmbe4p73sz15ijuxtqx3k91map7673vd42q266578hd81izpjcaugo2h1pjersrkk2ixifb1x40c1ppj4fp962xjzkwx1lqbw9elce1el2pwuxn1372r35lpf65lvd61mq64rx79nxhcalwl6i45h4qk3k0b7o1yvp71uy7t4fesx8u2h11vgy7nwkds8cek6dskyag4hrony9th931sb68tszwc5yh4eaz',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'dwi47dzvm1owivg6vo3ost89h8juwr64b8a3wbqvx4syey3m70',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'k242zzxy39w46vdsuzbb',
                channelHash: 'd7wamdmc0glq4kjxezttdy901kr2hsa0rbxqinf6',
                channelParty: '5wc40d5jqy17agzrn7eoi7mnifmd2byyksxwt2zu7y7245du8pddqk4x8k7czunchqawbegwnu3vbj1a7be4zxz94cdar1o1py2l8lp38gne4c3wuw6llfxc2kjakeuelwprbfi9hby8nyzzyse8dqvj1jz8u0yv6',
                channelComponent: 'xow85ae6mfa6d12ixtkc71kx9lessihlca81sje13a3msptpzmeg4q1gz44t2bfydovdbno8ao51pc53qsutncqh1gk8oz1badniag8beai69l71r6xt259nh1upi8ueji88ev61bxwqze2baot6zggsxikubwbp',
                channelName: 'gduhlajoa5zbzb6e5c6m7w7pkur4hpxalmzau4apkc6lcwabf3y8ep89l6n1lm49wlu40p4mo0v7i6rkeowmo36rerr8f51xnc8py18zcc0hxaxl0ev0at08dl5xi82bohcbk132os7t4tqb0x095ugdf7g7qai5',
                flowHash: 'q8brle45oduk7glb6bwl6f1chnoeaapphqerkicx',
                flowParty: 'y0xhsd4p32nfs059fe6iggrbd1roesbha5wmmwokxbak52pfi0p2jcuxow7opu0jqjluspifdew103y6ct8n7044c7omo0ks15tzbokqiviijtl3fumge8x0bfwap5rqgaz62yh0p8051asclnhfai5ggsrhbxc9',
                flowReceiverParty: 'yezptqj9r1azp6zt5m1mb69qirn4ceu48js4jn5qyl4vmsoiiqatje7ooihk5dcibvqk2aki5tpqa8lwm9dzsa17qn7takaiimg4t2gg6su6v8ldsqu6xi9fpt3nyq5yvkzwbjgdrikhy4lgza0kzldkbhfodn67',
                flowComponent: 'mo1dcrhwx5skai2qqs341jq18zmp5sfuggaco2oae7ql6gzzvviivf7v0281mvfwdpgmja1pgkclzk8uc1xazwjiksqoskfzswr4twt6e89jjq56si8qy4tl8tou4zqa168mt03z8i2hglheetaav7xm28u0pr8h',
                flowReceiverComponent: '064kp9hbd0lmpfqltngg1unncl2pcxc21a48h5gr6lj16x6g1j0ghq8lz1mux2m2a0rgyxv9tm1zbsdlzxkgt2crjpapq3xwefh91f92bumm2u6yekht6i8i68ln89lq278pxy5s2xz0lcj28fcu1nt60kgom8ps',
                flowInterfaceName: '7xaqurkg7b3nue2zwjfiy1jl0q9nn8g8yhs73umywwizq4cbcqkn3bl4twpqkgp3j41rh7drhjzd0kwuzv3z2rlj6tjvz87knwq8tcb7e9djyvr0c4s1ka28m8tyamqoath2u7zi0fqvdav37rg1ol4l3tt3movj',
                flowInterfaceNamespace: 'eevv0kxrkkpqtj0vkmd4hvo38v4w3jbl0y2jb5fawnckvcpy9mgb1mgaiy7an9ehq4xmw434jgdypwr2vm63wbdyjvm2917h9xum9ms2vcw4gp3svifp8vn5ldumhqlqvrrpxa3vifr6sfvaqqvzrpvowq8gh340',
                version: 'xoq8szkkdqk2zq4ld0o9',
                parameterGroup: 'e8d3xk7s9x4zcfaqljpoybmhwjxx0hcgei7kc9hmbpn3i6i6ev4mirm9mgn8ortqcw2pjvg2zbcu9gqrcycjjo2exqo78usqd0ozt16ne8uwy52g133hw3bimxgdqqt14pqdhur4s36826g4np414n7nlsoq2niff7p85owcrepchgiyavdzatt0l6k3vlkhjhuuk707cmxreecvzqqsr41px4pixkdoy07147b94e1f3kiuhioqwaf92xwcfef',
                name: '1w5qa8pwjikpbo2wc7d52g90up38en3dcgt562juvee6f5ors08q7ttzzz3jldwfdjf6xx8hf5fzcmtzvk6h60ucm59pw8kt2n2a9viygx8svskplm6kfohj5gmtv41675jeefa4a6zqtawzlsy1ln1h49e9xnli6z9ojj2fdoqhanrk2k08qj9cldv89m5gqcfkb6s9i6e6amtqyqosyui54e86qu8cmjkvqjrldugbjritpzq1wkw51os1nu4tsg0a0ld1jxpr1t3ewlia02ovoo3wbkcp5qxgivjya4al7iz2ufjyk0tl0k6jq4gm',
                parameterName: 't4dp5ei13zilb0vbqf2z9lm0x15qymwwdvokezu71lfrixwbl9tod9pi2nm1l94rn60zf4ipl627rrwap38qekfjwcx5ugurxw8jqw812zff9anuyuwsacjo4zjf88pe77q5chzodw0p5y4noauxzcsva5z7l4ircbeau2g097ywomh2rdri41eq1sqpcfg9jgjt3yrbs2oyc0lwdp1aq360t0r9yd9nsutuovc6ti0gy4hbl93vje0i7ig6za4s0m0jobfhw3crvrihsx2g3ij33vj803ysrb8tuy3alo9sz6i0ujpmbxt390r8ecmp',
                parameterValue: 'dd5y8s34e4zpe3dx61ehhg09n19misd2u05m0bw5cjtft6lu2i9dhe5ju8cyg9g2deknsztikwnsjztegigl2vvlcc1be0ek4h247q2e9e1wuqul26wuilj1lw0rzmxqr89dklixmi2kr0ix1e5hw7skexhrn0bo72mldvebpltjaoctlskzifqwtpjz0luqw12zjh2bdm4eoxn494nwafjeo9h7ztoq1s8tl4pej9126ydegho1r70ehss299gmtpp2vn7ieyuno3wfx679ffxcfbmbwqyr11hos19q1ntqwefgt5pqz3dp81pqj8gs5o12gjvko8ou7nl92n0iluukg6ape6jvtftpedpjy042ftlk9g6ay8g5ir4moz48olrdmk8k35d7hik0uq3ihvwofmgmz0iyyeovxor0jb3trl5fxw08f0kz42t80t9fxgz3u63qj42cmvwvy8nbblxib1c02p4j1gf4htehhr73vzg3sk2o1k3bsw74y8z5acp46iamih7fqgh64xnew3xs52z5ql9bxhmrhv1mbv0row3sco3f88znp0dr1voe4jk23wrbdwcxq2e3y0vh98lt9h7x6deywvv6w5fog2g8i1y8q9e8t3hplj37ns9ir5vpepia64mbyd7znz0xkhsks4cl4h6g8rcal7t0fpql8mvnkhvvpdahlt2yxb2j5i5v9y65oss075e2lxs7d2gf4izuqh98gm8mqjqr5uvadh9kcug4ergd6uqr5apb2b55rru1rpteo1w508ut01zrfqbkyzqwymze9gxtr77b6z0r6rdi1qxd94o53htrxt0246zsnmoy0mjgo5pdf3flscc3tk7z0jtf5wnn5pchkj4dum4olgvvbcrk3iqoezt1py8o365z0a0jpp7yo20muak3xtm09qkzpzm84jr32d81gywat4urmml4gn73pyo4fhiri17mef1h8bwreejyo95lsxfqn3dv9iiqud0yx9cw7xlqu5mq77idp3nzsuxj6291r017d74tr2lef1ua1dp3brgbg5rhf7kifj6xrfzfcla3yrw8w8oxboqcp4tx7u1yruv7g4cbqs95xzt0t8e101cxq2kxqy6izv4dedaeqd54qgtfy2nloitarhowt61rynhwdhjrx0gdieyzyr2hmrrir14tqiz5evuev2ehyxj2b3pocxfh1hevjz9seam0t34dr5np2ucas5vx5omh7zi4ibx93hqqjz15xs3e02mdui88zvqab6vsaeqod5sh6a6pgnrsqsz422nfci8u1ece0ki9rx9p084uuog8keztlldjfoygg5pm374ofyv8njrvb9qgj9z7bxn3ntlr5o4bpkfupa5x8yy1otgjx2r687y4qmyl5hau24o24bokx7fzogif8js57iss72konsfjxnk2dgbqcob3qf0yce87on7f6r2ybq1po38peehbrgktkcgjm63362bq2ksp2v7x3szm96dpumz6rjivobaunhvb1a9kiemt74azky25ycll187lwxnfhzgrahcvh1efyznafvk8jkgwt6spmo28wbx36kprng0i776a38pf6574gct3u824lzje0hv6sqj0g6bd6q145ooi3cmonxtgj1438vguka6shxsrnk52sshghinb3km7jl531b861tqt75aagcsqfp76hl4z5a7h8rmkm6dv1tu4gl2zhffb2rqj7dfr0xemesz69gwxo4uqk2uhq8wctd84kp1t5voghi1f2uzczx6y95ys3ncbmo5bfco9pmttthfa8iakqk4ku55sk19d4rlt43plrttgn6zvx9geosummy9g8gx8w6m9an0syq2r8aaafpme0hgroganfdon3jui85wib2ideeug8a9nqzf94o81zo53mqu1h7u13s3bae5l1geld7vt344hd9jl63xguk5ghhuuglf4dldo9ne4i8tx0svg3q28fgddtyesb2hwfturi3btsjwdfxckcnlpuhribj81s4bfqhh7t2go',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'tekll5rrw794dmslwwhp8am15ul5z4z509gon980jwqsdnrl81',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: '7vdu8a4898x4jths397h',
                channelHash: 'r6m737rpn266ftkdzbsy56k8jvayc3mwegdytvba',
                channelParty: 'rrsl2i0c5nvf25gflzlxgf1llfoprgf6du10mda3qkx8rz4l8y8huuhyycz5nza362ic8k9inbohhx6u9q7ova4i4ko5mfixnrykoa1df6yff2vnttz0obiuolgueb4khyq7e3d1wnbnjba6ohzkyjv228mamjkp',
                channelComponent: 'lwktwvopobl01ojghy2dw6kixd7w8e0t4gzybh2z9qm3gs15cwc65ww5t2omsiez5xdcuvwvapeb4w7224csbd1o91u2aom1dhrx5x4g07fb43un9vmd0xecpseu63hnexcagd787ml91c14rwt8a2hrhbk1jyml7',
                channelName: 'sjy5rlbk78f9dt0ctt6iedk3ujshke23nbccoa10r8qokpv4w0btlnk501193wnk2ogfenfs55t4rstsixbpitv72mu091bjwqel0d2k2seqmvs3a0gjn9is3vpxch06jm37if0lp77uak4nmza8gn8w2g8bnp04',
                flowHash: 'wwps617tcavkav4ybm7skkw81oa7w7mlr16aff8d',
                flowParty: 'zfxq2fmbhyxueojxwiq62o74jm8scsq787t59q7xw13glz1q9nt0bgahgsuvxiy1op8ddjmwtt2x6okxg54ibp7efrzvt3tuhiqkdegsi81zdillc4w1r8ckdzezq2exu3220t9h490lr5p8emhm76gfw0z5rfr6',
                flowReceiverParty: '0nb6g9jh70376dq2s9z7fduuek1o7nij5nvodot2722yxf4j06h54l0c3b2rdh7demgn62e45j8vu1fqhatyc7dogm1gj0nvmqig7tg5i9kac9vedt5rws7x3uq97kn42tgezzib3f6gudxxjik65hzf0twgp455',
                flowComponent: 'xgh1p1u5qhd37roi3790myxlqkb4on4srkampxij26xzmk84njn561fw5aayi0p6p0emb53jofb5onx39nam5qlgstk1o3jid0rexrtkwkvd8h5g9ap7m0eyl2hd00w08eq25qfq0woox0efq75mo4fufesljdcf',
                flowReceiverComponent: 'h27ad1uynqe9862le05bvh4m5ii2gf22m8qrsplfeoqb64ilesuozg7fcs0qr84y23vclub9samxrtqriz7b30mzdxxsslrb0ajv4mbdumalndpy1hck7tv76sqvs97iizjaoq7dfqmtl0ucr5wh0k256woe51yl',
                flowInterfaceName: 'ui1f5pr26rygsutedmy42yby0fvd9q6mirhuooe2hixls3bxtl8vq67zqo225abqb86gc97fr0bh693xb1t07mhbg9amduojh0lnrlkdon4t2d0k0xbbessv2kioghy43lnnhn0ektixxeznq4doyixtivxb97ab',
                flowInterfaceNamespace: 'jgmejf2ca3u9y0x3i5gq74h76lmax3v1wbg1ah8rm0bgff2iyymkmm5h31bi7yyizia0o2x8htzt8gm2b2zzicg10pk8dryzhpd6w6wp251hjclrnxeb2qoizv1i2a08pn0pollfguzjpi7vtnzgekfurqnty8k5',
                version: 'sxbb65wetckol5xo40z5',
                parameterGroup: '768nf85y7qjei78fedwzh85pqbds3zcwiqwyez1r790vr0yee1wdbgofuzlnqb7bpnv9zcctyerogzlhujhj8pb6s76rfk837qhbrb3a00y6li905ifgy0und9l9j3r79rby7e3koc6unt96wg5m06bpi5pqm48duycbonlt16jh54aydvvu5xm9txeraf8owbxsl0w7t0y4snuv767f9kjia8zak1c55mcfwceunikbpbf7xm3zl1sqiuhzx6o',
                name: 'o12yla9h2g7eujyto8ae2w07t6wwzyjz2z473zziorxnjhpxw8h1ok4khx2ttrh3kkune5ahg43o0tyruaxo4ix4x4u1zzw80aayj1igs11a5aylp70mjh5arsos6obg86swvgqh1lyqpkzcn6ejgxwpnlw792go9awxj7mboio8kix9mb0pnr0w9iy8s08jbtmptypl2gyw66yjv3zeh70pr4iu8kdsk6whjmwvg7v9xbipewg4mklbssejoob9pvlleyg53jjplcb71eaqxqs6mopygh3w19svu3wbutv0fggjj09qqimfoo0sknb9',
                parameterName: 'm0j0sragyk0a8g74r2gacxncfds1x2ot6t03t1yjjnh5irpxb1shwoxeem9o1cm9zxbmahtfk9h939rvp89vlj1s6glidc8t1jst8jxwuu1k8rwc3wwgub57udjz8tfis2j8lnturerxhl3xdut34srjvb0krult26bptye5clcsfxayneeggadnwnetlyrw0xr1neavmy7fefsvp5dovd57w3i8ac9iuj6i8xs922cz5v2midx4cyye0cyu6a0tdhv18sezmlnn5ux3n29hab3shqo8kryq7d5fril9xrto4x6tey565s7m4jrg4dh7',
                parameterValue: 'kzhpz0su6jq1y6eemo75ltqle4igjdrf27x7izrjptsogkinuayf5s304pt73jcb4pxa8f2gorql08nhaas23ythy0k12cu0frj5jyhgrynhthiqogto7h47pqrb4nzxywxnz5yllw2jjnqzhsllgnssk5r0wrvojxkgtfxakdc18ft8gjbybx6gju9lycobg6hw0tr3ph3bolnnu6el47k4t60i6etq4e7027226v8yj0wq5paffyw7lq4038treprh9d28d3v5oy3qxl8ghffd1sidut95txkra821b6lxn391s7kffta6lzxuw8zmtc2g1or5mk3324kzz0hek25yfett32ohu95wdu26or4q4hbv2qcjt4zzf6o3kxwmfq1vce5wywzy87njqzpqdg6ab9sszkwmgor63angscu1d476uxdix7d7xxxzb4qtl9p5brw34a71d60wnnrb5i89l7omsaq1jq1xysgp6iy0vzripf9fw58jffs74ggn60zjc7kw2268w99eh8pdo2ep4bs3vscmbmqdr20s5x1p589jtuopkx60mhucxhe5o4y3z2dxrbryny7levvz1wo1ubr67772dqw9koonmg70sqccpxm3779z06udrm3ymycznm66rc5jr3fq06til5u82sjv89rodq0lvqo58tahhdt2voyuxmhhln08omwhhytbeaxnap1vfhawdjq5os2yt0qhj4v9nuy5ib4lhhf53udujxdtf5a8y15tne3o1f0ikul7dvmg67hrpyq25o3wole2fep9g14y3tm1i2t58twbwyna057dngpv3sz66driox70fcp7ljt2r46msv9nc9osfb2cp8umblu8t1wtutvsr2rrkda37fkan791b1hk5sgjltsxncmu7ksn3i93uxdiv6rzs2fx2wk0awhs7mzmmysxs57v0kk6kt2xsgnpjqjejpo5ryw6qrrdz8abtadwhz61qyfkgu9obh39vuzdzasfcjwrlbhgwpy166entr9yegzj5ue49yrsbh7bab32gomagtr0r0ir44wils5ejfrf48jlz4fkbzk8lvypqvyaonf6bbr150no49tci7guzijfax8p589sr4n1nl6uhlb01qld0o8esgb89atv7qc8ri213nhgndgm68ea07yablz4gj0m5h4hs6quwdqige6nazd8tesekjdnhjzgnhhr5hb63mpzdiy198tviuzm2h8iz7b9islsq6ros6zfl4dc9cj7wrhe32hwkxpopti4d7xf2ojlf6u2m4972v2bkhjceaugtkrf4dtcsubm2a8x5jrf19l3pxiw97dqiwbfiasolywxfxpx7xmr160h3p83bh2jhvzzoqz5yywa7futrqmar7vpx2ajp24kq5bgztj9golkthqmrc11yxdlfx4y0shz11mpz750qih03bcd9b88h9vtgp3i2o9xbketa2df97pgqlh7anvc0f2g6lzvz6jcply561eb2v2wjmeux7bq3882gl5awqdfta824ntmac6l4dqsd753dpp9757gltfaziy959jjhx9euk0p4m47gy0x3o06zz4ivne3kk2wcoo8mj52br5sgy9ax5o7xqn7z0d5t5twqlxzmvjwaep9s8pjsei2x1m7vqluor3au3up8gyddxrjpnmkkp3qvugug81p9rl95l6m656u51xv4vyq9oc55lwn6hjn6evjbq7lc4hkacek78xmf61eyf04div26o4vigz6uwjyy618wovuo7xvqpq0q3rgy1cy2t0i6mb30dppn7mxnjbt8xi2pew4wmjvyulmkrnnfaoh5ycqqygnv24fyda6rzbcaor98k2dg48t8bo7rcdx6x158hlj8r8dxhz4wrxvpgg4l1fxa05icr1b8a83bpesckeq4xtyqd05b8s20xauw2cmctrrza7upvxrls8v3an3d7kq85ly7u3ii89kw5ervq22s1arfl22tzk5vnrtqtjnnwufefeh0nmgul397xx0efro3bbq',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '7wosr9ygbggv1jnw35ukk8t6abeb6jaj2lgdb75yfx3g600lmo',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: '6s7sn33pexqfcxrtyqu3',
                channelHash: 'ajtd2j9yo33ouv30pq767vgg8uaqnzts7fpm48fh',
                channelParty: 'o0sm2bm9nl3p3d40wxqxy7lqxsyjzputqiyx4dv3v6mvkenaihhn30nyg6vsw6c8wy6uw961u7kxqov1mwb3ur8inkbi2dto1bkohx8rnt5fjlnohlcz0g131k6sdsm81sknjl0o3ut2tzbb8x1u991ptx9lttup',
                channelComponent: '1fkapyr2kem2vczwd110smfcoqmka7fu46k311t3potzg3la4tqcdrc1ogdbwdbjqlisu633hw50ioiesvbnbt4xzp762d77th1k417u9fe5umoakldxkvnl77urmqhkmftbbh1k55ugtdnszc4yvz075kv0a3u4',
                channelName: '4aw1sabbn2x7nt0ht1immfwu8hra1e3rwhqo47mc72vtlyo8hezd6m3o43an073bcmt3nss5ez88hta3tg0ir97btp4zcpx3k6dw0lritj81ops7nzll74rmr306trw802xm8rg3lxr8r8kamd5oeydepolokkwgc',
                flowHash: 'btqu468cllm337k685561pubvmwb2vtqely70q7i',
                flowParty: 'trge44tdk4hdk9mp5imy7e5stt9ph3palpgqsco6mfd6242951ufasiuopx01wh1i10h2tua3as94tbzxp0fiyw8z3f1rs1pj9mhwhrbwvhooai0tmjz3e7zgbureu2h3trvo626gbbgsp3d0uvwo2czcsv2yuz5',
                flowReceiverParty: '1f8q6eb67b2zuu54l9c1s63any11dfdbyx03t2d82mxq8erccrt91vqrcv7efym0ndar30p7siiisquv14ijh9dv6dw310656y9ql753kosqevnxm1wsxpqs6mn37hffyz00ejgdnvr786idlgpgxgha7v3omq4k',
                flowComponent: '7t9gcvae5ja9il0v482aonookpdjwijzdn569anmmbx586wwjr61onkbrld6j73v1fqzkaa91j2i13kwqynhm8htyw9rbenc8d7bkrzmugdpj76f9z6wkr1n5a98bjnvchbpvjwmrgrewva3ouj1b7v060dywf9d',
                flowReceiverComponent: '3djfk1kf9mznpz8kuvnny49ovyvurek3uz2kftu2uas1se4iyzda3t9c5v59dlbzs8vnixjxu2tppqmnqbxj0bugqhy5m93w33rwepgcglw2jtoc4iyk4ljht5kcyidocw53y3fow68im4xjbljg2q3o0lqz2yc9',
                flowInterfaceName: 'foe3r8hufx8utkkvvdmju40dhrnh7vgbxpxe9yojoglm64i2ia02f85bvirrj6ahgd72natk8izggz3pd7sdt32m0i873bql2g5rtg6kq5l52vfi4dzhelvjwosgfv03jn4oix8ibakfgbppb2lkffie5bx89ay2',
                flowInterfaceNamespace: '4uj143t0ismciajbweymnlt138y3oni14y76narsd2igrz4ivj2kgknntd7p6qq93bncf7trmutvlwavxuulz0cua08sy08uuawbhfpfxxzyudds0e7v396j3242v26teq2ztoqzy9d4vqj45tsft06j5j190p50',
                version: '2hd6uxhtps32fns4mxem',
                parameterGroup: 'o9aq7tw05vsj4bb8fz65gsihf65xdwynjeif8zy6s9owphywt2njxfjxg2qk79tptrrbgfpe3thilwmjoi1u8wr9qi8ukmoual3rtti6ch69hjxj6wackimprnpo286co85g4aa5ktfpnj7qglpnjysnb7hdu8isb0knekjmehax6nrthcwzf2tongqzz91tdbll7bi0tf9x2y8eq5fqpkffyzuq8eec6f6tslz87mkw07xd598gk06z4z5bzrh',
                name: 'suyamo49pee0ptfgdcskw526vod0ecwjmjhwgf2tjlaepgcf7nw782qlqkh3ht6z3156c0lse5rs24y8s19i94lno3tupmt3ydda9526z9czeti4fhm7k4g195asa85vuropx4ccp5qwfq8pzw5jgxlxcq403t92vo463rkj3uvy4yfo6jkd9eyw47hsvsxzfw2j3uk1zatjxhkxaennax9ns2y1mhx9kkv7pze4ls1s9gkdaztijhqkrqxpoo5hdl99gjo6fg0p6mmm3w9veasaeqxpux8v84rphi55mxag01yglwfu9g7hduxhgusl',
                parameterName: 'ohtjfecffkop39vq50xw1kwpjcjf1uj7f8tu8qg7nvgxbksbfg1tdu893b1wj9vzu06qfxtpmc360u6knn4tmllvfytsk01ob4sk4a8xtpjdbhyuv59nbalumpdp1fidw461uay2pc073ek71lv1o4ltyi84wrbv4jjqs75ex2lszk1qxsco6dnh4ni5mt3adbsgbhm9pg4u0w0zbwxgf1gnok1elmd4kv0dfk0izmxvw7d573k7hfd71nqy90fgpz1i17tq3yzxb7earcfkh1p9urkdvwwfipzjmiujnzstgetmyrui3lugez8ruprk',
                parameterValue: 'menoocjc1aaslame6uxl50yc4rxqxc06soxs7ql06zvrggzu2ds3em9t577xpvnxj2oxz6axi88x4ifxm7721iw5zhvfp35ngeue2oe2ghpa6wnqgpnekucuufowa5ruezarbjbw60sez1xgmty5vug6at5uoqqqm9z2o67wle7q607d4fe5lippf2dn71sb4q872gc1mhxphxbw2w21cdkvlp06n4bl3qn2anebfjn0rh0hmb8zmb0apc3dlyhxjhquxyhc3kwc0o7tezokafwjnx0qm340avwut58e4ufs28589d1wutiqbav1tv6g3o9hlrvsy4hfqmwaernd87t2n4qd88m8bwr4ugy64snqw15anwnso3t66y5flkwgs6s4bf65ht0r53ya1f3aocv1m1hu74e8q9js14nna8zbpsv9jig4qmehqjyhq81lnqs3zjjaiypmvtqerm5lyso7t8tzdprwvp5334jtmam6x4knrwxmcapjfvipej7e02gmsycz845xb84zrzf1hbnxm2au2kie2mdgq02npsdnfrfvedcjb7j02ctjcnobbj6fkg3d2jx5jtqx5m28fth8likacs9zpqgxe7hvrazoldbbso1ykg0x7f38p1i2h4qudxd0c1wuyrcere9hrcyj7cw349i7yepkh7b5b0rp37914xyjnmse2lpv3atv5y4o8kg37ekamhqlb9e85jzwoqgmg1klq5zthqe9gach4xs4jo9gagj98v8u2lqbrq4givtmetwnr8ka0qufcj7zfiz9d8oaz68wte8awuw5wyz20s8ui7g1uv8jwf9z1p3xir3b58ucd8ini9oajl47fwnxyjju2q6iemi97aqs1g7v7jm9m3mnt0da0s53hfy1lqmx72dyp9tosvxjg32am9dch7sawaeqod3rkjbg5rc4v86wonoivn2yt2jeiko1x2f2mb2r1w7z8jugl6ahpduk8z139ta2nn62tpylsrbariegrbdhy5o2hbm67f9jszp35whajnpl1pzjyi3lw44onll6s1waa7ems8otnotzgnd5bzfsob4oelbmotogpwi6h42syb4cnh808w2onch0ksrj1npkavqbdaph8kbvn85722x3n4e3y7mhfdrv749lnj86lt5zr4wydj39mzr3zublnw0d70p6axa30x2ibcfjhv26bj3e3pg85vrrr8inh89h1xl0m1ooaim6tw2ff8xeud230aufje8dbii4kuomhti1elspo5r2zl03c94rm4r2yt6m6ebzpz847vald72dugiq8hk75cl066qy4ntq3nn8f64sjke2jbf0z17tfe980s5aajrqhvs5jlovz5ogykkx659eepc42nvz0sw2obgf9u5odpr8mg37uy0b2n3c94xq54ab221a08h46njlpvrc64pyca5kme2qn4c3bxwws9o3mg7jq39x3edtbr2tmxgi4xujus92735itz7u2x8v9cimvdix31129dj6l0q0o5q8lwlyvc4ybyx5umqpanew6oto8n738txuek2f9vx1i2vea5dr3x3niylgokelksfg1qcvainpw6v8bxgls0xt1isyt8pnrg0mtijg1bfcas0l4oarldbr2g0n34hnf0ws151bontahptotr0eqwff4kcal6q6l8l0xtcpfe4jlrpxoj6eea2cksd6d448ad85uldw34n676l73k9f8v5skbonue9sl377t3sge7vt238godee0c5mpov35erou9rzjlfuw2laedqmi2b0yybmy7ueh5y0l20n0zc11ql1i6afyv303sovw7c8q3utp7bbjvq3rgavif82unvodsvrcv8fqn2ranx5l8f90m9691z8axho356s4ir063paf95qsz8e6hgy20wwj9lzyxv7au7o35z0j2bcxr6i3d3x4j42y3b40glaflpynyqptmvwhbkdocabmk6zh3iwm9t2u08yn8lr9hyxmuf8ozvhvm47ztbdbpn75ozceja03qpkiyc8',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'n8wrcmqtlu8hko6q4deo9txwqkkbb7jr0gd9u5o2vrzygoegzq',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'af7tm8ast9yi4h4hggsj',
                channelHash: '858fv1gz62jbg10feo9ks473h98knl8nercqhwo5',
                channelParty: '7z00ars764mhuy82vsphfs1w6yei65cism6e3oevmotl4er5nsnanwm5pwqh14u44no97zh89payfv5qbd9kr3c4zawsztvnyygtzsmrpm4d30c4fzf0fv4ci0jmwf2te8v45vnr32m30jd4807exmnyo4u7pryd',
                channelComponent: 'jhf2omvtc0cco1961cdzpvku0ta9qt8ksfybwg7ruc0kzhwha9grmr8mht1nqikn7kec99xub4xqderv5ie2g7xvh6x3ijs6vhji1h8vd03bg9scvszlvtjmj5pt9ld5yxusqnqq1mep1d5r8yneokmy7b3tvl8u',
                channelName: 'px2tub5lxbehe7klzh9pui14ciu34akhuf9trva0frc48ntrxkka0liula7xap4j2g5n2slmi496v7hh5sedb684tnx22us4r1ao52e7hxtsft8kx03lg9p1n652ayk8x97e9v10kszq5n7iuzpsgdshlbcr58k8',
                flowHash: 'v6aacidm88mn4sbobh94w56tm6w9w9znuda7yx8w',
                flowParty: 'u0z142ma3y01ngdmq1c25nu0i5eicqxev1o44r50kgztgt0edpj3y6dw2n3p2jw3u644yj6uxxt17owb5n6ht4d9mplpkxt603lu9grd92gvbig3t1xdw0pvgdz0zsswiu1k03armhfr3amll6ldtbmm02mv7j2kz',
                flowReceiverParty: 'q8d7chc5fqa2untsyhyz44aqj71ggb155vxpsm0gife631df4ou8feynv8mfttmbjxjwnfe6ad6p51314a6je3vussq157kqdn3oe5w44w7a6hvs32dpmix5t8fyqh60d01wq3d70dmkphr7f0yyze7mbeklwrm7',
                flowComponent: 'wf57nqd02dx8qkkzb60q1l0qp8xjo8cjfr3z8ki91vp00a6i01mwt464nqu7stil4ulyzcowhiasedxv3a827nk0m9xxksd0ex8wybvtxb1n9523dwtqvn7383a7wyitf0li9cojryjjgniacjg66gs9q9tykein',
                flowReceiverComponent: '16du3quomdkgaenco55fh50jaj6mwfg30gjvo0cb60et1f6kbqn1aircxeemugtvx6a5a145xf781cjdajks9agcgsz70qzevh4lhs384912ewffedioyin5rcf3qq5ika0o9kgzvp059jx1rmyfp7z7dtd9fc1u',
                flowInterfaceName: 'pxt783lzdmhjarp7uvvfkj3glypjjb0iuc2l91s6e70utbkl5v7yb0lwjin6jl9jmizhb48h3dauq4rlkqr5ek1lar9ovnn28tnysn7b7jrvfqm8y6561s68hhx50upgkaisoww1nt5fqyo9cftdjsolpf3js70g',
                flowInterfaceNamespace: 'lee8z4db7yh2xnvimvxt2hsqhgdgrslj14ajqnrp1qjpetckc90lhj9nyizrltd84wmk45xrwt0i4ergynm68wdtyt6q8miu7ngcnxb0hx8jop3cu2zwjj00eyuhuhcs83bsdcmbxz6d5ged08pwjrrkrvw0kagk',
                version: 'w3930cg8pyaic8pe40rn',
                parameterGroup: 'hgh45j7uttvruhpjn0er2z6c8e56lpa4vef7urx6ge7n8r8k9zl3ime5st1yun6faumurq8c1xcmn3sr5qylpbfh637rlcy9fap0db3p22trwlp2w4n4svawniq9vw1pzc1380wzgyji8gu1arjx9itzn2y2ocpnjhi90fh8z7n7pjkjsr2rbn00taqi9jp0nvxmvud6oszdsr6vxz2byfa4m1dae73scv1mzcxxa34tgw1kmjnncaq6wul0ldc',
                name: 'q27qxhwfjzk71e24loml3rpqxcykczlfjz0oxkul7sz78bb2h79uavzcxh6rn6s19smewymebi7e015bmf3ve8vpzjukj261tde4g73p8vcy9yivear9e83asrtz3tohzfucnvhp8e0de919kexkvqv0c6mmupn5y2p9fghfus0cax9nra67wye5b4usv4zd9lees3j0uqjcz3mf6btctrg1uwp4a5q1nhultgd4x5g5yoonu3dkkareq7msl3203gq4zjmvgyr8wu6tvdoj8tcdpjn1sms51c9cq33dsg236vdb9ckyf8ja6w50yev1',
                parameterName: 'an7ywol3og9cvp6xqamhsgt6kqfod9icqht4o8napmrq7jyw6d8d60ljtjkvdll84jnisnzoasjvwg9ddbr4qwigdbe3snrk1mx54yy3b5fbc15zbatfe8nibc32a8m9fr4v69e7oxvk95mmj9ujj04y5v24jtfzz7x5ex1e2iq8gfr6tggxuo5gpojvl8b4tapkgh78oa9v3as3jftfprpimw9qtdw72dponnx28qeuxmi7o7iustwyutg1slx7zdcoazdwbjtfz2runlab5hejgnuygjpswlajw81c05q73kibs6c44byuf0vso2m3',
                parameterValue: 'mtddwj64st4nnzqc47yhc2q0aaijidpkqrqmu6ub7f4vy42affd5ydocxzt5e56e361guyk8jl19wk013tama5yb96ajom4ju4dcztkfnwg6woj5rggsxch6kd6qln68up21pcp37ji3bp0ju6bl0h7osl8bfckqd2ng0077jn3wx2uwyn6p314bruon63w0j041e26ioahwfpxda4j7gk1yuizvyv2hlhkjnlyidmieghwuaoiohnlwidghmytjpqzlla4vdwscmqx49ncr4cr9eo5v59ph6tmkyco287qfbpo6o910tc3pe9obl4qtjuegqxmabsg6h855ruc3nrae8oj5h23ab9hkqoc4om0vhj0izapdkyrcumu650bxthx8xgi7qgww8dte4mvg8vmcq8vv11zet8dcvumzvrt74n7o96xp8qilx3fashgtrbrxjpadhz0vzhz1tcmnvge0fmvvnx4jzcz8p0ldwueb3zan4max2k6tl1qtmayfex3sq940xj87qt6vhw2s82bn0esp1tpo2gblvhxlm6g66d17tnpnhboie73w4k50dujhaysit6cegr5vrxtegkrnki1k5lk8juf1ub0wf17hi2cl56crsgalli47ol5xrhorhiqzwcv2lbhjfztj1v1tp760u4mjvwe4jx7lgg2tw4495v0wkui4ev29xu34exrwp9e5r5bp0ds14ii3ak8y36zpc9wlbz6ko8q0748mpzwhjspm5acoob67aqzh7wxhsfbnlx7ktwmq3dhprwynhtsp1fiehpbz4yarv1r6arldikjdzxc3ikxy1z25rbyyz8l2q2om37ort95ifx34iii1iv9xrboziydhh2s6mnwxfdd8ipznq46jj5qfbv0dvt1mgq3afqmi436o7pf0nxz7po2kfr5ygq5xiq53972ud402ycdggx2ahvkiy2oeaqap7l9608u2v3mvha3bqhjroysqoppxwgs2y0md5c5vdsplb5gvrns7hgtxcild8qvvufrjno5cn3y6nu4gkc6sm6fzrck12twwy4oanul7oefdbon99328oa877uo8zt3fk81krsedxmzzkalxi0uk4sbj4j08xj76jbg0k5lvyk8eisis0zomy0kaj07qe7q1s7pyiwrcpgmxy09hfd27yoolju2kx0acvwjehu6typc2wc6n2my3luwz2zv9x0dace0fd6eayh414gv8w14jwvxwi3z9md96v1ru5ypqf0l52bb0b5t0jlthn8ragwstxf3j4tp6r8zs1bualko4fds91re70dghqnwebjbw7e5hq9wi3mv397bhrwqqry8wcy9g2p707fww9el4ytbcsb4sw2jwqj6g9nbu9tbh2se1u4noareoxldetwvs70zw3ru7h7soefk5s4xnr91m0gb0kspvdhsgrur6x59p772ru5oyjppfjs8588ct24wax2b449ff35yp7ldbi2q4f1fmlg2b9x083kuctgmxe6fjr6l1zbbveoxz509275123negvmhh8q1pij8mh9ibea4rx1iaeh2oxkcq7sgeakj1piqa40amgtpqwxscbzz4t730jf4jqmors8nxv0zsu6inbrfbdrbkefbemkio6zfek02k3gpsgrdk45trk9ifbwbbokclvnruj2w993uvn1itqx1529vd8aan6p0d56l9wi34w52n3cl6tzdqf0d97kyizbrsz9lpp60r8j2mdw2u3cxp9tn1w42j7gjqxl3kkeuvd398ni7gv4vwyvlil95b7k8lo9oif1qo4kcy3uv06ftkgmrjzmatjq5gug9ugpiy7pqzpparvad4ql3sfvlxkrmz5fgfdl4tohla26ysje4x9yvu0wc8eyxzfyjm2u0kp66ulwhet8n4ovsx7ais6utjayfaggrnurkqe39n62k9a6m6mow8uniycqg1sr9d7thiumryvqh1glxca14ksmmo7qx1h01tccbcrqnnhgvhf97gp7kvh1sv21mqjbp356dadg5m',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '9tpwwr3vewxw6n3ig6x1sryjbxifk4w3jq9xal0172qn0n7839',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'gjbrthspnlpf1673ud6q',
                channelHash: 'gnejzuw9795789r37sp071cceu2vmcu8jt29467t',
                channelParty: 'dp9esybpdmi1fx34x5fxshf2fta5s5hv10gc2dsm16iu4l9n82gu44qibafuh2ome3e0sijrbrygqfu4djv98eldmghkvb35o8ix7aqes68lgtr6lnj545n5bayw4ibktvo6dhx0e2rok2x4qrnfy6fpq1rgvtuo',
                channelComponent: '7szt131o472lrspyb5cqiafyyj4tq05ksd4ws2bdy3znsfrf7ncccoqp22xkbrfkkvwgrt1dgn56lf2tkret2zzxgoctu9g9p30khzoc0hhjxteavptz3wc559b6q818nyq08vp3xbzj5t9nsj8fl9z4qvk0hkss',
                channelName: 'bnbkvl051s2q6i3ul0yxpp0jopwmq5kn2s8dxj50e5tgauppxkp3f7oyg1hkfsxr7zbs2pmb310dhj1vdebtfm5d0fu9blztp0eyd3rigve9v5d9wnm3tm2kowhsdb68satyrsg0h62gnv0veaxx6p3nov2zsru2',
                flowHash: 'n1rugjkbjcl5yn9x9playtg0xoi0g7h81wyefrpz',
                flowParty: '9vv7phavneckc028w9lef7kk1qosxzw2b5bm00ujh03hul5qkqe3p14wlh4x3c0xgcvchd88lpmzaxz4l44ankwe1fbwhypx3qf8a9njp11807ykinbwbjogko8f3zsnzus16u3y5fwei8zrsa707kvqngg4zgra',
                flowReceiverParty: 'hoayh77285vjmo0is11o9gul83j3pjrsryeaip17fxpd29chltzw0neww0aka1szydeii3armk1kd3unp7lfrzb4bejb8sud76mk57j0oxiiodltfc8y3xq9sb4nolllcl21dfcf047a9nmtk0tab3cm1zkvb5qpo',
                flowComponent: 'adg93s33unjtflfk3s3qx1cn6fjvsw3cmwopdgnebfa30nse8h8jnclm6hde8w7zh9tm0nn69hm3za4zubjw5kp021lnl9wif836rredjz9jjzl9s550y8ze1h1qmxgzc7vmnatbang2i0hc8vmyrdq4hfe13y2k',
                flowReceiverComponent: 'lw96qoqrrr92otxsa8fk7cyg9sdulb27g3yldg4p492d9pu4hf2gqvtmcviiz9cyewxdvoo20wdhroemtggr1ijwjkpbsnxusxn3xwnjmlyonw438b2h66fq6fy5vc4byt7x0l8qppjc7w8mojh11d51l5libvfo',
                flowInterfaceName: 'rd60dhlul7m3wf6bn8hku0v4aqlfc1u0g7crvumbske3mcgvqjggeeb3uwacvzy3op3gmrufcv6x6l29cuzq2fyvgaqqlygtiet1g93lpj8jlytsksd3kla315px6tdj3c1cyk1c14b26q9yzu5p5x8m6ta5q95z',
                flowInterfaceNamespace: 'c55fh190s9y8jxwrx98e683mb4g72xsgty58rtpywn73mwxa3o6gi5y99l4o05uz993m5asg4tto6jvv7vr70t86e8n2vgcy5okvm5i88ox6xvvvjo0w0g4owix73e73sbtwerno4o3nxmtfzs6d7lao4rvh2d4n',
                version: 'w1sg5oxlm6g8dv0ucw78',
                parameterGroup: '6ofz8vzvu3k4b27g5bekgib0fpwb020ef66w1sofr8amwcup7y2yq38qf71qi4qkf0kn50cutff707s9tid7k0vog8vlsmqg38ne9ty07dolhwfx8e5xy1chh8nr0ud8xrxrr98akn7ch4gl41fe4xy06zi2nen68dufdaodxfwa2njdiawzkxvlr106dso0qqru62miid8091zo8aj00ketka8xhvddl30togodhj9hm04usv3jttyhob7akka',
                name: 'k1ty7lle7z2u8e5nybwhe4r0dnwe0m9tlu5taqn1g1bq472iwvvut9bnsdzckn0uc6t8j7ufq5qtii8smyoczr8jhaed5c6kuqz9t35jxw7c7nrrujiwh4hlorp6mdr5j7m4yvfprre8n2mnjgwykc88k311ep5sd0jepzz8st9hlx4heupv0ejif7zmej6aqyteej7qhmr5in7c1gh4ta6r2ops3oiw6g71f1h6dvtgk66d7wd2663fpvxu5b84ve9r86q35mcxddha8gjfx0lwaa6karf0asuhm3k7fnjivtmdbwjr9iwv4f0gq132',
                parameterName: '7frusmrj1obn8fy0qs6krigwsevexhrue5vlq78z7ycfz7wubi17oa4ai49ysxp8dse4m6feyrf1i0e9us292lz8zyqcni4zhwzxqkjdecgwxhupxsl0v44xqj1ai734zpuemdc0w80rff4s4btwzuz1x2u6rbtx76m0g2cnaxl58j9atop1zbosee3yuiw06zarnza3w5l5q4of6926e1jdxsqv4jaxnet57vycs7c1qw74j446kg6sgcntwpu54d8wvlfdwz5lkcjkjotigbtq5jspqe8txp137eiqlwdfgei0qywd8284lnnjo5oe',
                parameterValue: '8etugn0v2y8zvxu0fgfnm88xz45v32cbwm5p5e313ke4vnphtbba9z035awfkbeip0x2tedctds5va8u1niuuniftoql5p4qgh48r9l2i4n29101qua3yphcilt8li4w9x6wu9v05mo9i6xmkpqh03lvmmuh0kzwms9vhbnt8wy74uvbbl83bluwczymqpjbgvf8439ebbqyrvowsxgnk30ldu6kju5k8i3e1mweew4xeoq5wsuz815gsh6ar9axk6o96f39gliialkpx59b8w94xci68souaqa2ndh6grcu2yye2l05j4hwyfnt8baznp6rvt1iesdbzdcfr9915pnu57t4av83ar9zcjpt2d3gtvhf3tmeaetq0epkrgvsvzkbwtet5llwbqqf7enps0yoewkr5pm9fiq4tb1uwcd9v2u0bcsqws17zdldk1xtm0w5j3ms1acv4wf9cs9y0bx6vkt653mzvhdb91t5i3ks74m787arlgiz57bjarrbjtfsc4af6yu30t5vp33goj77y4sfytm2t0jh0z7xxf8fqmjnuuzfwbaohmh6okfqacfo8xtbk1rsgpfbo3yc48oz5jkk8gll5u4jhoag5zyhz445feeh1i8gtvg6nbgaoqux3ei537zqzuymd07yymxk04qqacz6ae21palon7g0bd91069iuh6q9tf1euq9vjt3itfhh7v45fdnlg42eurxkg7hnie6nlf8xot7czyc58oziyuya8wdbwx6qni0snxsf7qpphno59wf6dqivqixviqwdrcikhpe1njezgqjqxqx0ysyflur7hyyvnonu7v518zrnxzce5xvasnp6jgu8kzsp6vkpb6kdmn2bdud3chtyncf8jl5z8oq1kmdfo3uw4emtqdufgfv30rsjzpq6zpby2d6tgtn1sr52hjinefzlhjbeb4b7gnzfcs3njvolrnv1txzh5535g6oqv29vnwd29qin09j6zfvzozb7ldaaboaw9n6rg5uu3or9leixsvkcpuxsrwkn32ziw8i24mso9r150b8jdf9m6teu4hy2gg94yq6ibfhspiaj4bvu5au9un6tinsuj37pjgmq8sjqac6wmq6mz9ek865e1fbnp4z8gjenncr415lblq91xhgf3xp8ssycp0a7xpquslv4zzbavzdkdwyhr19n73scmkgvxs6n71krsh04ugr6wguvbz1u9k2g59tvas6qisjsyils5sbnlzrue6lfb1arv4qoz4y5x4341iyigazmd5j5p2jzhx3w5njxniwxne81h8wgoms2lxrftcpuvfnfse0fsr8mlu80d53dmto2pj80wh8u06c0zle2zy18bnhzkgv1a18078kedz6hej4naq0s76gsuied465brud03g8ho4wy67mj1wx34vsapaclsb7jf26zsvepfua2h3jdl3wvdd6pbrumtmg3t1uohzaa2bt9rweo361m08sd8zgo8bqgupfd60xsgew1liapg82qd6c02i4rgwh5uwp3zvtm2b08ibmp3wambk7hn4ytdptwqglieiurk2u019zxmv7w3i30vodccu4wzen9dtg3v3xggh98qpqdtzt17tlyttec5khjmy4skya6v1waj1xp3h7ec4sixinuqps4rb1u351v2sujoydtenpmn1h4prkove7b3tf2nkf75o1crek1mvf9s8z6aw42e6tr9s4et02lmpi0jz0hc4sjtphn21a5z30mc19ftsg2klgu5psafx4fp1vkpohafp2mev4pyhprl5mm7m4yjo4cs0vudi3i179ax4e8e0emo0k6be5aj9leg4c7gt4chk85mzcvc3phrj5pditxvgt5lqbjaiumuhwza0hz427thw4v8hc666d5vik3u5p9omls57jvpuqrqu7vn2inwmkqby62lq0j9k1xdvuty8tdg733f8wo0h7xzq26xm9o2qvgthum8p7fnc7pmnfk9sson27liqso2xu7fv1ikqqprrhpyrl6hjxjzos1z0k',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'vdhtebf8wfx7j54lti4yqawu36z2u9e92uf8r8pbhdcfefhs69',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'cajj1jsmbbw4tfw6439t',
                channelHash: '9k1wx8gp4l0ta23hkq7920ybtgc9a5dv28rrfioc',
                channelParty: '1tfim6wky46vpa8b79baso6nxywb8uq6nr69t3u98z799up39eusbxsny2ed7kyc11car30xs01e6g8669ar8yaktw61it6jmcchtkvpn7dzm1hpuwz8lqpbkgcpbmrmkg0hruei20ux95fs36mis7s8bgczvvcj',
                channelComponent: 'lrstvb3djharxtb3fr8lfrgfwasmpswki1gf5fv0jq0ljbemghju2w2osbcjac2kgca409b0y2ad2of2zqw2h033qyeaefsmsg8wgltsuo4fz7vo4ubitjakie55kz0f5se40plhkegfzcpwk1ze6vihl7m3cnq4',
                channelName: 'byhk6jrono27egw6r809zhj8gdpvjta6pgab9pp3hvjfe79caf4k2bhih9xt5j5k4afd0xebt3uygksp2vkykr4xqogl6hcmpkvspbzaeyr2p8bzqk3pmi7hrt2fbn3kcc5s9a72s75r0s5a8nxgiesmpi2sy9o0',
                flowHash: 'uw6zvcpt386f9qofu5zq95c9konmdvdx8kxacs0p',
                flowParty: '08taomf9sujosfjh293gbytv6kjl9e6ec8x6xpq723mh5qia5sncijh9dtir0k9agty5pbfgwdjflvf5cizcx7ftafb3iaagl0i4abjko8oyrpyrvpqf9heb3689k5ec88b3fqfq383zun7td3yui5y7pwjmjbbq',
                flowReceiverParty: 'dexhien0ode8juykatw3czpty2iazp6wm5osdt0e82df80huk99vely7swh61u2upbopbfur9uq0nvdzvaqqe0r1nrc02zk8tnymc48orcitrm34fu8sg8zoeqzsa4rprbyams8m6fuund3wjfeguvxj360jrkr9',
                flowComponent: 't387t359f14kgqrvjbu0so3isimc8be6ey8jq1l47jx72s39exbp75wgccqroe5vrf7wo9j2286u021mvsasy8bwaxf4p0jd6pp56uzrq7iy8ekefqp491se9u33ydkqt0eq679i6hei1iau9ftxbzsv7nffpvzkc',
                flowReceiverComponent: 'ak3x2mli935fgmpru6ow8qa563c1le0ucv4vmfaxbpa22zhc5v7za1a9xpscj4wlx3b43dvqn8f8jkirg4p35st323tqebxywywi1bsekobau294idp5onbw28jxzw0kdh0ap6efanmqf9839nx7uay6zwhf6kyi',
                flowInterfaceName: '53gl1vxfoi04m2xn1um3o8nlp7z5o2sgily86jsutgi9hi3ehxodc2d0nklihf4au4v6c62lb511n5456u8bsecl29r0eg5q65odk45dldfz3z0atuige03aa9vnoi4vz3c9z0t99vaay9ukiyiuvy86umb92woh',
                flowInterfaceNamespace: 'vyq56rfizycgrjuliqi60rexgovhcu8tbp1o7wocdqg7sgd4d8e2pt3zqshcosuhibx93ii948wgqcslatr48oerymjun8e20ur2l3b79swd1bdb2i9yjml4xpkhb3uiigjcmywwjuwfmuinl5y94sa47kwcvmak',
                version: 'hodbofbeim9g9qot6g4r',
                parameterGroup: 'e3u1fa5rnui67nd1vh7av2hhdob3skm9b2kw7cwpm8dn1t02ltfwnkdomrft27dtfwp9wlolncf1byubmaoaykai79pa2wgwj2gjo9tf02dmkln21gv00eijrb0otuk08j394qafn9fggkwi3zpc5325rkq7sihms6wyvcisjzpcdnhgan5i4gfhk2sddbdm4rg1xmujavztokcs9g96noqt8p2ksal89txqh9npm48rx1o6nj01kxqbj4fmw96',
                name: 'a9nnvr9nsk8ugjnow267t2rzojjm4qa6jowb911tbta5uocxs7rsb9m7st2brs8lnozn2wxw9eq41cvg21ifch4gusjm1znio51exim4acq4m4ouvwy11ov5lkpgie1f32bftuim9v18dalh2th5aunwvx52qayvi99ryk9lpuanctk6volido2ylb8bfgk9g3o3dkog6dunsjf3t85jjfkhuvm1l9whvs8t2wxp926ilf7x9wpa8jhsmahcb76hsgsk4m3p35e9oo5vzgidrn1vt5ykgiibiutgojvqnp1aw63yb6vvmmmd4ppbnivd',
                parameterName: 'mfeehzd6v71pisd1wydiu0xg4kme8kf1bg60ak4jjynfpjqwn4qdnguvjx7ctugwwr485ger8nd7smkb20yfxeqwrmuj1if7fi7tfnsa5f5d300id3svdjcxnm7sbnz1z4kxteyefrrmfnwcmazc23oft5jmbfje40qk3fapnvyi2i19cq3zzskldclwudyjjhymu4x237aq75ci37ojyhu9kt4g9gfjn0rnvuim8wdx32ccd9c9lhcddj8cb7wfe6sanp1etbsyv9xbgclngv099935grr51yw0f9t9w4ajbfmexl53s8hjt5gg5ucc',
                parameterValue: '2o73aosupy8sb934ketejr21xy3pm4wg4pm1k9ktoiq6556al25uaocuu4hq8a98yrrj3c20ocapls2hxultkkxg9dixoite70bfvm3g9llmqecxhzkevea1rz7jir1102i57hb93u2cu2t3fc9p5kza5lw1jia1amr14yerg7wesooc1zf29aob9dttlykcig0vvr7zvcq6snbgemueg6sx194cd59qvv5h87isduj8a36eqobm0p9p4ito6s4czjb7t6f5f4jn6djsg15mn9rl41kku9ngpibbeqoak03kcf6qtbuoujqwzdgvgnrg5fib5of5btcuj6dseerb9m5ybv8rm7k76omcwsytoq7hb155xac9fo0awh9j9zz8s6glp12atq492lgnnf43m2oahtswr83ux71b6t3f3ui0e2pdcbc7cgk1fcqscax3iefclzgw9dts4nf914ei372bjg2rqhusdm59aodj92i26h33gt8o7myb2ckvsf2u99brriomgx6w0x2wcw4g1t8d17x0tgj09qb55onnqp1efsmlc1nl3esbz79zrjhqn5bw6zzkkwdngol2wd9k76tq00t5x8e6m8zsr3od89bej0ke6je6jvpfg4fo0sja3y4kihxwewykeak39qav7ukoh0a4k9kgzizeaailhathfiex6pvubl6xv03qd7drhp3gnsrc2x2zz11kqekhj8pyh79n71e7zamdmk824m7bhrymr20fyzrm8isqizimga9pauxuxs1567ib1taxocjpithzryrhb8sa48zkm9yc9hzg6579a8ur8h0a30pol8hi5248it43ammq7xgpvrx7kho6rl7tufxeqpw2o5jd6kb2awwzi3zwlxju3ze1eu58s56gwx5lwb1fouwbqz1ca4citp4c85qnjgjt3ln0ef2ahkq1f1ex37umlw9z1xb07rud2471p83tboipbspaz448zfbazp1u0qoen64fre5omkg5a45glijmi9kgb2q2w8kks500a2865wbniks55tvb5as86nngj9x47f85ct1ayjl90cp9wt99ae8pb9wbrcfb5cn6hhxsnq3woeoltrzt9mq9938ujv853i111zyilxqsehiswxenxrbp9961gam1jfdyni94ddz3gokok3ru7q68is5sf72eruv0uv1ouuf6sm7nfn8309bq0v56484vow0b4ph3pszgylfexylg1zca73c6qgr0jrn85dyf4vb6dy64wudl1u50ytyh2mfoptpvx8nzj5q8ssdf3eeluxdbwubv0jhbh4frumgr0so6tcn1o1us85rqi5xqdklg3twnda9pz11uhtr6no39enywfjlkfii83hwoavv5jvog4rqiyrpyl052zjjacvxssu1uxmj2fc019re7ttm3t8k2nwqihn46m21t2w8cn04mor873pxkig6vfbpwb62vasbpg4nc92j6r39ibsmwrek6usugv3ys4nz4gc6boc7q1lczpruhwht6luqvw3ir7b6i9f8mt0gse83wfr5shx1e3c2npdqayidxa7jm5g20qxiwyu2uq142d0gu3zdd2yb8o50ub7doaczbqj3ln1ue4x5jx0x39t3so7ea0h59xbrnpb81rq62vox2mudck31psnoi61l5f596erm65xc0vaaskyharhglkoq4xasmfmpvq5f3ynm3xv6yj2w64a8wi03bm29ya1r2p48m3zkbxdltwrw1zd7y5lgh0d487ck7z5nbvar3gd8v2kzyuvw3q69ongizb814b7hmp97n7ksnnymnq5mt6d70wjzv60symsuf52hrzfkuasf9v55t5cr79zk7zjl4x0kofchnl9hz5ihi26ew1x373z8xnuclhm8ryl216stxcik0bb5d6ezv1lrzghvfg9en3zmuzraevy9eeqzzwa2x612q2mfpmcn2arqkvns5cvwprer2s3da0vne9y7svbbo3rcv0abt7h76k09nxvxhi7hzo5v1tt53quq3',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'tt5av0z2a7i4akdlt7f0mb9sv5bfca5q8knddlb3lq7jp5zet3',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'mk2d3naz5ies6gum93dc',
                channelHash: 'ory38x8dnj6eixsl4n6lq4kuo6b8xqeqla7fv5dz',
                channelParty: '3jtoesi3pz08leigvp6ydkzht68yggs6pcfmrktim05fww65eqlbcdqhg9syk3n7o2kw2udh6h7bcrlq21c71deqrduz4o917vy2fr875n5uwukku4s36gh1rhil82qn3rgsssav80p6br1eukvtx6su9hb7ylmn',
                channelComponent: 'kc1q2hf0jrn1pyn58f40f03bbgspzi6y21x1lro5h6p4s9tff640fi2y75kfidx7yfjxidb1brnm93ck0nyshj97aykbrosxp8ibgiafyfkd8dvovvicd2bebv76nm8l58rjmjzt291b3mvlkw50qg2nrn71xs82',
                channelName: 'x6puslq9xuth277ssyc0jw5eov1wx6nrmwemzobc31jmror2zik9w2fecxme07sjd7tv1440u94su8b3252nj7dvuvrawtp40a8281hnyje51gkj0d0jni62zwqycr0aoayr2ldou25tgpyx7n6ox89hq61y460y',
                flowHash: '9u974xw8yojqudq7wu32vlr306qjntyn5mgsb9at',
                flowParty: 'f68ldl5kepre81rkrgawt26zoz6a9aclowc4vzigugk8k0zjbo4m84ts1rf88cqkg1lhx4cq05inbcf07fl3q3r9npkl38ul36ukangt5y3crgy1oqa5lz7l96iv22knimhll0edg005ko4kqrny3fssq8bspdfh',
                flowReceiverParty: 'sqkfv67k5djejmq2zzfvmt63edf380t27z9rphjb6j80m2buvmampsspn86c7hcn5nnj2bcd7epv57u8pup0j62d7j4v1ufmwnmeqoztn9d1uslhu5kgq94xm7hd48rdwzgemyw0yuqtoas7ie7j0jyqdzoc4qam',
                flowComponent: '3iqss97xlmx8fit0vqoe2j08alcv1exxto3hi05w5hfcwiln1ghkmmg87ogvi9xbvwm7mp1gc436ndkv4jp6fq94a718p2achnassaz7hex46uh1tn13b8x1fenjtz5353ewxzjffndhq260jynv6d42z2tim96k',
                flowReceiverComponent: '56esvdx55zb9g3egjs7r1s1be5wfv7l6gssbjebastkvdcg2qkk2phglvhiibcwa5j9fap6y4dtq1o5rilhlshlt8alpnlk5slfny9vkz3myo4la5y11tr2asv8q54o3haib702uyfzydegt2o19ru4xf9g8pkj1e',
                flowInterfaceName: '7iajze5oligbfc0b253gbi6b3uh1ct8ipenagqaeizk7yzqzk9xip9a7daxe7aauqxyyaw7spp3ynlunqdpscprcl8opmxnr1t19l3u12xn9weip2uu0q2wc7nh52a6nnvwrqmwky9vchtuh9pmfunf7utyiav2j',
                flowInterfaceNamespace: 'hh6cb1nbn9czj6a4cro3xe5zcrau64ex8y1yrsv7i9fuhnb7ih5hvusnmzginqup8ez2la0l7pkbju14y477zpkzptb8mkmm7t4maar7pjtn4wpy3w2ueflmthq07zqd046t34zdjfhzjssae3q6zq6ehrlusq0d',
                version: '4qt4rwgb7zm0j590d4m5',
                parameterGroup: '7nymx0n0z00z804ius6c7ryzcjpqa345f6yhg8bh6zilfdzscamlqbsagixjf1pr92iy4rm6b06560jubtg2ke5sf9145a8emitcpy2auh7au5ic76sjuqplhel1cj0l1tltlffntipn7u13x45hjirhifvaw2445hbg1wocvxx65n61s5xzwamoom5o7yjkiq3o0n97ffi7kmq1x4un29v35qrsgp6dwza4gj1tmmq3rmosmrp4ktsktmzquxk',
                name: 'zuwi3011bzi98p58tdd2wt79tw5lxlp8fhtca2qpdq65qy922z8a1cybc6odokw9a1lgdnh8r0dusoiht2d22hiwud5i7g4y6mgxbjsmlgswbj7ikop2gf7pyf49peqhhkfglxudx9thbg8n2ij5oq3vbhb0zb94l9qcmc2jll7htd3x2m1sprbi6g4iq7eretebi6k7x68y1esfgj694oh4ry7m7su7lht29y6bm9s1uemzpz8qg71257ojyoigomm2pxswhyerawpotpy2zgxif8v0sjkzs537p9zxnnrwvvu5pcl1offxqof5ches',
                parameterName: 'zirw7r8ow0qa01s54cllg1famedvy8ld8wnhumzvqbx7oaqpyohqson6vcmprhrk4po7iuzjki6t9c2dhb61skpxpeof13llwwvnx0f8fwr8ek1ixgge53my8sk17uln4upitgn6oeey1zopyh7fycwro51zvcxxpp9rj60sme1ahda9svvj79h8giithozh2hcy6gcc5hybgm2kqmzzo5e4fht58jl2lyvmsg08z7jvk2sjfphnbalbbnsfgntxoorm7ft0k8e8qlfrbk2zdcmdxzhtq8hcqb5zihrlqpry5bdjh2xp8jjqlnx9rscb',
                parameterValue: 'zp6181sjqffp157oqnndef77uehaq981dkwhqpmjttg2vlx4tarpin6twgixvwqi78a11l9xky8mb5eqatucdm9vfadpy1k0mgf6gp07dqdf3cbf8vja820p7gtxztc35lthpk1fy94f763a00lqr1a301txflfj1l5je7nfd4vhwx16d53b2ln8cy932jurrdh1fjo9s8siy43imjkme5radzf646hwqpu5jf0rafvgy1ecag2ivybb4kung88itu9fg25aohg40u8cm1cgasrs9awhgsm1qvbr6zkbg299nggozd8mv89spnawkn9pa7a7mv0sulveovk5uvshmatxkbqrdnbz45e06eozoz5lkz6cbu4ql4oz0hoizwclg6j89ol1mnp708nx7mczxkkc7tj2hadqljxq3tpt6ro4io7e6dbf7zpo4ld64l5010o6bu6y0tihyjky7dkjhk1bu7kto1l1sr1od5dnbayy2tt0jktrykjkajgayyauxs4hmiq1v5hb06kqi54jlcs3fy2sdtt7obizwv1tc9ytwsa47ikcgws7w9ejt5fb67y9v502id7ueqfghw2wd6ubei3hmtvuwrqxr704ymrubp39fi5bxip2xt2j383o5v3re6y2excpp3rssf8l9x4o8884qxilr7hnrwcpsvimebu7p3l5f28thhpfb3k5flwfm9epdglmnu7uh2vrj30camrnbx0luzpknevsux43w2apuqk16uo8c1fwcsmpnzto4grpe7yma8bqzxq442h628oe404tlqkycsylspgp3p9g5cd1b1z6v6lwdq0fnygv9cmf4f79lzubyddbbsfyx083o0akv6xftpw8mlwdme6n4fyf0lxmedcbl5lrc7sbjv0raisgxndbeoxqxdvdg12c0w70iieofg8604y0q5ltecuhcy8f634h67q897jdwc0wrec2025bop3fz8vhg6tj0lm8127riakzu4kpu5us5w411qv6f6iv7wdzyy04bxfs6mc2yzkwdy645d706fz8t0yhnd2unvbabrc5v3f3imgsep1ixnn3hr6v7nfvj0jc3s6y8smod8kavuhhej90lfe5scqeoebwirkj0u36kjj5gb8xotz0di6h39kf344u2r7wn8xnohe1184ag7iifja14buhzviclxzg6fycpdrjf90c58hi2zmoxu4t1ybfu79j9ysd8q3bge0az47ipedsokklsy9askhttiun3oz36cel2wem2zq2ni6ptg17cvan8s57xhxshdbyr8wwhmt28utn2z8jgeza4aldsvim9hn07gn5l6iylauluz8uvaw7e40428i0q9vqw6wsr2428mi61n5djt0bhjfy7fzdw123ikntbucdnl9br5urwui0ub37fslkqz3sfujsowq5uk46s22a8undcuwkugbhleq9tefifdbkelhnnuw9opvh4qtcou0tpv0lr11dlrxloe25j7b9m6di9h3teo9c93scx8rry6knfboak9qmksh8o48k1uzgf5hatvw9h6sn609lvr5tqvwa16zk9fxegoa0fbro319ave8jrv01anhcyjrc81rqhcbctj7uzhxp0pik18r5m9scqcm639tp95p8anah9u0yx7h7u9my8gfjrnj5fmltfps1tllje0xa4g51exut9qenisjymta64y9z6ce5zmfkiobjlkjilt1l32m9pcchztp8rf7lqqqqb95niwomzbjbt3bo4pe6vy9ietb7921jg6vn05y1miceabd0ab2qwuk48mo72n2u2myttltm2614ok35oeb9cqdxyfyc9v5uyu030k3h6hyaok4umlt0et0qz1ceq1rddtwu1rh43a536njpw67dij2q06yuh2ne2fi2h1rtxnncw0bi98p882729juff2bel98e232pb883fvdodcfv8no9movltjq3pd5b3t75iw34dhgn77bc0mlv2z3982qvcylv4njllyl4tci9vmg8dfp2rbf5gqy4',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'oubd57cquwp7e4yydoxgo352b5o0bkcerjekw13oebgg4o6lmg',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: '3e2u0m8ztgjv15gdfjfd',
                channelHash: '30mmx18h9q02f0du08gkdes8vunmndejx439c7x2',
                channelParty: 'su2licqr3nw3jm3b2xz7tpld7a2e36zggv846edre179v18hziw4oqpv6wmygr0wco51thrzt5k6hvlpo9fgrytgd42g64p60txzzo0rembynx6aqeq7ftfyp2u4a22408zxfwgbvz02tjoxhwds5i1jewgzmiji',
                channelComponent: '2hbkxm9qvav5kybd33a7uq666gdz20mpk0zxu93dx2wfmogyysuyz45molnrz1kpnw8zadpaffu2a3rf0gjcekalgyo5ugj5u41fhrds8t2cs2v5x5b7f2t63owg0b3uv2eead1mno9i6bj59k1vcv56gwn5xndb',
                channelName: '86dvy939x071ub0686sbio2evzvyc1b9e7bis5zfvafahoht382hool7khe1bc5g3pilcmdkl8k231eetgs347j0mx9n2yxuvzg3nkblf319629k6ss3thw9lqfh65b4jk5yy22l5cd6h6uv3a0ft8owsxu828yx',
                flowHash: 'nz10fpdcnfid56q54mp4s9ymdoihsn8dwhsxo5no',
                flowParty: 'pm44qft3kpa5cbcfn3gyb9d7gbpbjyyvzt57d196ektct0vvmk0g8x235iwrrjeabdgho1yfjetzvfukq8zck0e0ywkhpq9v8i1xht7czv9q81ccw13vfy7jbbcgs30emfl3gpr3bx636zvpck20ch3amyojmlcr',
                flowReceiverParty: 'cvom4u6mg2uwnly0kzr6u7aqxlbx8ac91fly59670is6njn8xhhavbtc4k0dqjy02zwxuhgdm3o32l3fp208khylhs2l63s4mynh272hu0v8xrx745v8lv5hmqnxhxm8rvjggswf5d8wpe1guhpctg4xjy0atei3',
                flowComponent: '3dtwympkxlowon7x30arl0ug9dht6h0bytbbsoqjv40sd0a6rn9rvq9zzuvozq8mi4xc6hf29yhh12ydfx1mu2nt8xph5nha12m0sys12strjldrvh7b4zu92f7j5fy53iwjvvo5kbzwp6e7tyxdapntp89sjop9',
                flowReceiverComponent: 'mbcje4hn8q3vy7v38im4h486su6wkuk2icspl89nbd2cjqo0tt9msqc0h0h5k2qp4wfw0fg2snibu3okz7vit7yv6p9z88beuaneo54l9t7vudu6cbfrx3nvmsd1iurw88i6db288ul1h73x3p58mjxro4lw6ahh',
                flowInterfaceName: '1uo9nwnh8g5kqv79th7bg2s61jxlx20x4z3jqrfj84gmn33lhv59xpfpfpifi4nbfh0gfeapdlwkyzcwkr94vm7ses1s1p9zbxccy9v7trsct296fa7hsu90r32wdhzeevmoej2g4x113iw8q0fyxdbej8k16q5i0',
                flowInterfaceNamespace: 'pmavyb2eelwtbh663r6evhzq00l9541i8nwoglgfwl555bdlw72ynkoy6p6al5p9cgz6m74t20ak6ogcpghcyasjjmtbxy8e6hdr59pitdgwwwm7kf4gibl9qqgdc7bk9bd9nvz4oozoz6djucb8429pk6vpirbi',
                version: 'i3r84y7nfl9bdxtcx2p0',
                parameterGroup: 'u6jvfvfzvj2mucgvo6tmirz6aozjmvd75n666t945zqj1qeqnufza17jqsyecopy8ggl6ateik9ix2iv7dogbxgweiuy4dv18frhh1rklb62zsala3w9l2myyhpprypvs1vrcehw6o3tawkmkqmcwvnkllaerbskmjk1xnthcdo9656k3ig5cd9mkqiq4tz2x1rbuvltgyy2a1fldts033iey7bg1qurg1v0jq151e4rzaz6gq8k9ttvilkwhxu',
                name: 'g5ftpudbnx999mlppx7ydvrp9k3qu1evynle4eegl53j8581mndf0gdzavtlwnc3ecbk1k0kij8kgxuqpq12c5864i92tjtz1745h2jbi5lq9v544c50smw73xz3bh4tlcboo1wu92b98s18vsaz4hrzb6txyowo1ehfxsz2d2i0fomulj3i2h328w8inyrcaxkptq6slw709xzevffg31wja3y20xrqjamxh1pnfenwspdz9oxy3qmscryvxnqymsselpa1g7fl8i5hxbb27kbi2iqx52cnq2y64iiy0uxv02mcvs85jyoukatm48b7',
                parameterName: 'ao4v26imsdveav3rmt5a3330ojwawi3i6zaxxhajjs2sbvwojr2r9hal9wnapqhqq1wkz3xatb3zodqyt25ol1kfbt5vb0mzgi8itwx53ncr8mrb2mfa3wktxamy7lupy5odoxqka9ydsgpq9g5yxzwo62a246uxrw9ou0xlzv5ggimxtydl5egr1kdm2npik9zkarpx9xycyh34q6qmr3h61eok5r2bzzojyna39d00trsb66uoppg3b633jcclhypqgmcgob62ra1hebvghm8abnkkla8hbi2h3ltsilnxyfs23g94369705qmydsf',
                parameterValue: '16kvtjkcos64nc14edpgbpowupbkcyjtzrhmj69z8ksy9k3vscbgc5wytc4h8uuycyvkytk01u9d51po5me5a1x6jj9aw2c6d4x228rzxwl46vixdh6tlqqdn460b78n4z4evilzi7fcoz8fta0jfpc765t37vvdergf01dxcpbrw25qx8xmq0h4khr7skde1m9ftcp1dghphogz7qwzwgfgsu7fhkr4as9fsvch99wqokro1ak96ktyw3m2m2x2l8z2868sf4lmb6fu8830fu8o9qft3oo86vz73ghfytzy8reyvidzrmxyvu79lcq62wmqf3bnlstx01pc1v9bmle052ph4s2wb1nfmgtbhvx360hnwiex4h0nyvadiunr3my1k00rwpp3wwa3ioj3h88ctc8hkhwuw2ln6eoflmdyr2cneq7k7gv0fan6mme5j7egrqt3ovx251l9aexd43csjpwwalziqbm0pdox3xbmeijwit6uejdet6jmnf007kru404y1rqs5x5b90hc1sc02l58ubgo4offbdyjp27xno218ej35kz4s9whb88fbpnqmkjgnfrtq4ub8dk0sdxjbt66y3s2363xx4ipd26tsxyygkx3v591ftopgij9mfvu0ferhrdla26eytmnjk6fcv4wuypr1pnsmxjgrq3pzxcdquv7ikzc3hu1t7ky1bqq6fudu5ekfagf2clf39u97q3us7sxaqzx9x7y6id30jy1wdu12liibu0trtuq35672zo54hzfn2zm96enn7hv8r3rrrbkv71ce2qgq7mq7l9zxst5p9v5s7xvd7t0on3yamic2hc9t0mss3a2zvq75htu78yzmh9t79hyiud50epgcfg2okmx21mt8whklgivvfa6t8rvqvzd5f4dh1igseryrn4lt9qrhi5vkwvtyv5dyvf8thiwp5xzamsvvup77cesucigty70bakn9bov85wz31aiqld042i3foe5sg1p2e6fvit3ej1082ycjksad3hcpiy86c6wtyde2q20tdirib5vaie1erlthn331pwzsveozekmmtoxhhmnsyqdb9o5kea7baiz4tqxoqeftwk7967npjp6czs997m4w0wtu8fn124mudyok8z5j9h6z0nupfojkvuz1s2u6czsm5202tcg6vzv671ogblv3bk36xceorlw3pecqsi3716jo7y8v0v3o41ujcwt64ghlkh9kl6p7fd6xkk6xi51sxuxsbbfweifbzbo7hqe0u78g13zfwb3pgfuuvxmjnrw0tjdyu3ghxlqbmpw62btdh7dnxwdemuqsxxekwgfcmgvc9npusalov18b6bry1mdkks0tfuyfz1gzqblrjjxezhgv3oec9edp2k6lvqykuwuw2rwc6ww3gzl9gdd4cstj8wotn5sm2cn4ixqb8asguvyjf5zaomj6ytqppy6oqwdfvnek79gnbjho3secxxxkd70k78vt7of9sdz7xh4im2pnyr1vppajrqzmpuga87gymiacnthk9v5c97j49ut1brt9mihjawivv3lbzyns8jxmq7hrryr94aisib6f6nxgtlyoowc7uxhsfpseosbihv7f3ypm7xkojn2foirvfqjkm59goubdhtfmley538yx7mqwut0mhy8lihhg74hnta6vjidheeutkwt6srtkp8lzlhhpocvm0x7qg3avgrb5ez6tn8qe4g6dsgjzvyfrmkb6uu9zr1bldakapu5eyaqk4znbo2uq32kuy1v2ccy84wijnmyz60vo7q1vekulertixrw5auvom9ay96kvy1na6p4ks9jmvrgb636h47i3t88kef7pmpf62hxn7w8n6lhznouwpkwfuhx46wn2ghgnl72wzhgpmjz42bffki4jcps9pcaht7ab0vcjvrfc1wo0nrt5uckw7bkgr2mkwc62as4hlqktt4nidqfcqgo9pbiustxfz9z8i01cl1utl7hwau59hvnd2puq01malq5f601ksh80empc17s',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'dd6n3n1qfhqwdtxs40gf8la5jse041oe4kbf1wa837a61chee9',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 't6yapirxvfkm5ugsgmx9',
                channelHash: 'dy7inmofucsfckxgbu4bxsoc285frrloj6vptmwh',
                channelParty: 'vbj7v3ee3wwzal6cgi2go9cu4quobcpbeingqtz5qf1l46u7l6doa1lsrdmtaoe0cak6opdlhjfalwbown8ejoxugo0re2rqfvv3pnk97ufya2e6909s3zk17bo5mw10cjsq0abv1xdsyref4sexwt5i7rtnmxum',
                channelComponent: '4619osfqcx4pi4zzs3qkui84g0yc9g0xsi4vk5b0tyzb1507sl9jg2qi9u33boe27v6sbvqhwb5y4jsm485juuq4papwlpli2hnt8ov24c5caa4qze4nl30a3sod7dalxcmeg5h0jz9qnn0cli6vyhpf5j9fjv39',
                channelName: 'g8jfhj0h3gfzkqbnhqjwzykck9q7kjzcoh1wd4eyc8k0oqaps36drs83vimo9y2htdf2fnc0waxurvm4eadybn9fpbk1qt6vytd0hqns02xsxk2lqkme5kgfha0nd3tvhcc2rtx1tf4h0ihpk2trouvdbshn0x5x',
                flowHash: 'nzg7zqmiq5ojts2i0mrh9whexx80x3r4mq67py6y',
                flowParty: '44nehoru3cdipi2ljfzg2hyb17nj9gf6rpuyfuouc2aqntuf8um1j22goh2ynlmdlovenpy9fbsnx75bvdm3fw2jt08ph9afy1fhijwpot4kmy3g1pcize49ztwc8i90eybkwwa1ozaq25mouhjbd8xk0pgsz5k8',
                flowReceiverParty: 'yv1e50ir4djq0ldhflijppsuuiq0lkji0q497n6ylno60269iqyplsp98mpl4g9tn41znox545o752uxdid49lt8gk753e9v6aq67rv7o38geh6g4ja6p80katbf8k98tve4r8f57c0b59pn9t2aneyo0on1pjve',
                flowComponent: 'b2tbjcibm0mgqmit9u46sl7n6zhvlxkd5sgnt3vcy76wdh4xghxnz31746ze6981xvmicwvkks42j8o371gwit86omzuv0qop8rp425p64gx6kop4f73kfc2bzr2ffx3084mejl0jh99cfkjk3hvb3jhryfm3jy0',
                flowReceiverComponent: 'pircof0dunv8yxfil014wt8v7j9zgi12wsuywt97w21crrddhrj9b63mxpxw66hrufl9xs1hiss43h4lh9gpcb4jpzkopzfi38cvd943d45qit53zgkpufru2b0b5ha0cjm7simylygzkfebbviifznev6mhois6',
                flowInterfaceName: 'z1kbv5pkma0uyq5y6peoe8q7lgbqsw5xeudhcw6hc6nsx56wp4417sf95n5xjh2akryvyqkerdz78v5gouij2w0r0mfob4h0wrp964eq560w28nxdygx1tt252m563wz3q4rcabm71c4lwzkkvo39bqqid147bvl',
                flowInterfaceNamespace: '1japqjf0vz1s1sa4qj3zthl0yrf29r6f27dgzznxjdo9xrdv2tbynebayox58hy671cj1cagmmocygtd47vkt55xkva43bz5b24xiqmofnwx39u4jlto9yzmsdq7lomp6whwmvzl6twf0zo7hdy8t1tecw1scfpag',
                version: 'o4nl9o68zwar7au4ciw0',
                parameterGroup: 'pzr51q74gv2ci391s32jtd5y1eh0dhzh8440ogk9oa47auhb0zsgk4qh3xpn9jiar7c58ah17i37455dp90jgl2s8tkxqsoiwlvi72xyjt3f0o4nn91yyg4cu1am9rhw812vgztcgqxlwqu7w2pz5qbk2ltoblj3do61816fix7xxn3fnvnxo4rc6loqgzkhvtoo3m77dz9hxw5393ih0brr19gp2wfttjk9o9a3j1q1bqacdzbmp0ujhwy9d4y',
                name: 't37s7fnic0cku8bwgif2mmzr5ehu4rbvn6c32zdqnkqggsmhz91o5gff2dy01zg2fozm1j9jj5kopx3u1nm29bcbvu3w2wfyfyqu19fvqciw4q5g6ockfkp3ibxtqijj6s3x9l036ut4h63m76h3c1hurz5jffhab24w6anu8fknjrvg9y2lm73p5f1rwsfmk4o3z4f3w4cays7ft6x4ogegcgxjw0ru55g1hihlf3js3jfo9cs7rg8tojlxwz6kz8szlo85kmj8jne0w6fe536zfjeoh6v5qmih2pmb8n6zatjw059wbjup3r9gmlnc',
                parameterName: '2a7mn7w38k3dua6myx82ulfmb0hi3zxyss722ybk5g154hq9pcizlamr2kkyjr7eonaup3hfshno87sfeydpkfvg54r6k54se2ftef7m3fasm2dp1o8ayvdz67yqze6gvti9wthzsmk23qvd64h8k2672y63jagourtnhho2q0s09lqalwu2tenrb8f6suwm6csexo88gg8prn6qlcttcbvfidrzhjgmgwq1ekbwmy0tgeq95a49w1wbmvr7mx8dauyljvaomtb8qidiyuhan8g1on7acxqa7tieqs2cf01z6n3j6m15zcl1m5xlci8d',
                parameterValue: '9ghbh8g98mxck4jw6mymp3xwtqsth6v1pkjgbgetpsdln1nu906pz0qyjmxnll1r6gzpylvb63ctzdj04yh21bbmeaog1rjd5nygc2v01n20zs4zkyledhc4x5ja0jjl9fscjpfl4vc7m8xbewliszukn8ub0ounac5qcrop883tvio8fp48yiu7sx9n1cewwoqdjkcviaripf2gncncnovvrqfk5uk3mc3soubp7q5uylpj2lli870sg85dkpiysfejjjqtrz27ok7xhy4wgmkuhaid9kfk7ptmmczmebyi9vb6yjiw11zskxlhazc5r75bz4cb209fzx22lqqfcxm4ktjgmq5yr8ld5vs0f8kcaixi71zkaofk31rrmrp8bkl1pgawe523ng842zydic5vns5ceaqyn855kgjt13fajtqlaj3x6nnh5f7iwsoi9csiu4bbb9to18o92z3dg3p1vij0nvjpwzeht49u06yanv91c76kloc4lvb6srkap67jzk3l62yf7rc2x3fcj8ef2xow3wr9wf2dturibo9dc5geebu2hns813xee8vn8l8cb0zbv04ahf886ag5mcmgr2l07d4e2cqb1g5nekbvt0fjki0zfnh1goqqvhwj4qkvm1856veg3d80v5egxjbd971xtzylup626stz157yvthhvcknguz2m3njqv16zrnhmngwbnl9t68hownr9kfggcdgti2rqxh07rnupxg2ho3ymo0o63lp1fspiepqtrvlk4bml52ujwi69j2otxmvbr7bn3icare8juy1aslvojyfxc55nl9kxyq455nx00cpf8zaxh323wmceyd33scazp3ew6swssenxz5jk0qehjcg748v88dmvpytbm0pkjlhl6jc3r4gu2n2y5fkbng2bdjmpqedoketiuktsu0tiv645h3tnu1oy1i7ayrs00hfyrsa7eb3y8tbxbq873m6tiuoe86kd4abfeydaqu52kqpvyxp44xfv1cykyy8ph3k8csb16nz7enjhdsuajo43bpxfujnqt9c6vhq75rt2oexs4y4zs93e0wupzas43bavh9lw07gdhycodzzy1648byg7q0ctoepv33w5sojndawk24wyoobgq130rgz55gtiwjjl7ijgi1cny51pn0v1glmzlu4d7pcqcms5pcslj5tjf9nd755grm8o478yd6plduv5u25275iw7y8grrvx1blz9jtcfhmpx3ko1wubqs5jillsjpd4p0emo2rautaxh4ptje8avtkmx5p5dxxmydv0wtyuyxldzdmlrfqnhg2a4pjmkaialcuhol9muiw0n6k3y8hfac5t15tn0i6hb1c2uaqa4gmweu167yid3ebjt1dnos099a1szi1vvafjnp8kf8pti8md2befwfweatdkrm2srv4wbp52n6unwobc9jgbm6zkdxnzigoe1klxqbzpklj1uqu2bw1jz8zoc2e5klp98dh6uxj1ptjrcxplh83xh18ig65laz104w1sh0pl5rctwk7t84o6eiz677eqz82m8p5xknbguathmm63rute353hg33czs1qpt3a555uk6bsaxp64yuio14e8a456lymcx7pvs5ywfvcerlecrn8jmmtivraw1gsk95scbu1xyfiuxhyzbhrnfoa90ah2qa2lzr3gg2i8m9rvgdhjvkmgsvpyi6lbmc7msade8ge2vx3t40ana2i8rxaa8vkwb03sfficdo6sfvjjvkpczilovd4wjslyawxarzgio3elko0nq8l5mhetns1318vdw76i945pqh8obay5ffib0nickcbatr4gqjnb7y437b8glqtfxfokkbm42h0zwpi7y5b3hbftae8mbni20jlttla0pjmsaejicfuinbc3kqc2c88xoj5aiqrmaluknd4utntx8ovxoarznm8rygnsbrhx3w0ws8te77wq9u3il2s2kzthxqafjucidfscpk57xruodgwdpash8tuhgvwfl0z2ww9obzql18',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'ew8trt3p32noqsrjn6lkoqybhehnz43ptgnh6coeyv9yblko66',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'a9293e6i50wzb1pq16et',
                channelHash: '6fyxdgmr3h1d2gd6ra14rw69mj7thzt6lettanac',
                channelParty: 'wd9hkad1n4nn8znpmkvrbxd0r4aa0alpbdghd7xriixht9kxgletm2zzzk4vc1s0y58qhbqb0fvzshk4oyh3v9y8z2dozliysr9skpekhq5x24kojvydw8bp1i2t83ldrhmu7g7uskvtqe9uy5k6nkdck2a6rzf4',
                channelComponent: 'kuh20pb5f73idcu3oha55myha3z6spgmxyv63t5hav3ivcckzmtxcf2vz7lmunu81q3b1q9i9e0mnds935szrk7zm8k7ahpvho9o7iooti3ppuayhxzvwwk1mu84kk929z1wq1zrkeyb7i5r6jc10w48hn6ccbv0',
                channelName: '05exc941hlsdidg3tlovmuxr4rba4zchg4duz9r27g5vs74nuob1zkj2oj56r70768i7g1flec0i1wrf8371ya22080nybdhv7ab0ffssxnheassz2jl685ni2r7cc14xx747t7dardqmpdikpfol7zyde20w6su',
                flowHash: 'jo35a1maaqvyq3mvxk6lwk9f7ccxa478k3s57esl',
                flowParty: 'e8kec2v1agm604sln3gr10h50fbbvd14m5rgg87rtosz20s5y54a0whkpxyg643aqthn4u3fp82qwf8tekc5t8l0919n06fslh7kqmv7vjriejpf78pxxi79rvdoo8at8ozpx8hl6c0iyn3wis7811e8uhqg2aak',
                flowReceiverParty: 'rtae4qirvq9pfleybri69qu9mthqmuw4tcgpc5yhmdeljzp84lrdlm465czxiwiua0rx0jyjgpexas5x7gcwbbd7faix0iz3nk8mbph6vyst615yvujo9ev4m8a9muq6a0yft24vq74nztip2cwmka93iiduosb9',
                flowComponent: 'kk7f2mvarvld0ohqtkehm2wlmmz2p9xiokbrdehso0wyyqpad0bt4n1cu3x3bdpz6m2125i41xfjkpd8czm8xbu12qnnsbn205a9fi9egzs1i1xt89eur8hh8lt1lf5ivuzt4cs996w0g3lx4zi460hnbqee8w33',
                flowReceiverComponent: 'kciwq6wll7fals41i63r8htp8svtc1llpgu2za71rb4rfaw98zwvib1zm2p5wwtm6509hzu8jwc173227qwrfkum8vjfxb88ctmvhh0phghng5hqdpgv4lz0le5glz8ry54ytpycdlcsymuzfhtrfjhho0hizcmt',
                flowInterfaceName: 'qgirzpqtfydms8lvgsdstdlsjnlvkz2ku9pa5kolvttejcwgbojfz741jfo9g5wv5l74mcje3ln85ajum3yenwtocuak3tgs2a0r142rm8glqi2zct7697wmftqpdku95g3n6rd1bpqxmz4nxkag5f0xxg87m63s',
                flowInterfaceNamespace: 'ndq1h6i7qquhndllcmc7fswpmpinlfzquw8mrrirw6cvw1yho4rs1id8mygi1z50sjf2mka83lg1a1b3d0ejajrzlqn5dqwb35vtn77t9853y717i5au9nfuqfoka5du2ukaylqyk1uqz7t13ww1o6ai2t6fkw4v',
                version: 'axm0punri2ham8jqje63y',
                parameterGroup: '8144n8nm4zputdn7v20ywqfg7nbwxjzie6qw0irdb3el7lol5wjegb7y1hnb7p38tke90q04q8mzzxgj02r26dq5j5ryjzcs3ixai78ot092ihlyfxf8003hiumakyyukdqdoxmabcob5337cqkcgocabu72ys851hccsnhosprorsyyu2kru1uejvsu2hvrlvpeqbba9jqhbfj1tmds54msya1g4scvy2jshwr757n26k0wgnll6nodehdgeey',
                name: 'ga7thr9edmymn7l61yew7718j2zgkdow2uv8r3qxtcx7tb8tw04ys325xkabq7tk34ck1zy4t78hstx0z2m26j8jgrzlzleyaazotca8ybd04wlxexxprpk0mrz5ax5hmsgnh0vope9okx78yyj5zbwnjpzx3kn9j26dr2j2jiiud4mikehcf7lnkm56k73hb4ye6ka0td3ox6smx15b5caflvjukauj8z4gg8ol4avipeb5eowpz4rza0iwpcf82kfy8g0k951toka5crd4ylt3acjlrt1v4pkjsj76o8ivyq112w2bw8x6lwjyb23k',
                parameterName: '7umv1xiini3m6z629kjpdkx5wmmxrbu34wcnyt8r0raafe3s45pkjjwbnywn6nqq5wysdtmubkfj28zg4izvo15bppci5be26ob0nlankx4tr6wcxvxuhp2rs7oz7rfsas29fv7mcnf96jnzy26r0lzlbjia8ov4ik327mcidju8xv7n9i3q2sug4epbofwhsvwapqajpnzxkmibpgdlqeqska3b6m87n79qtz5m8q6app78uj4sohorel8oa0bv6k8ghuaczcn27hhde389rfuhpomubvvumedo0k81eelx2s5ld8o5lep54jwfmh33',
                parameterValue: 'goh6wkjdvzhz821np7cu2o5tp27lp1ea9xib62p5cjywzpmag0xeo3coi7ql42eiy271e6d4v9lpgbr0lpkr810inhr2213zykhv89nzihn45zc12fpa5jfkrmql02ippkq3a8cm7ivloqc2n52umbqso82v1isxk0a8yr1nmudevqimxdv4392r9r0l6wzylo1id72vdqq5ujw485hzpo4i0wshhab0kertli6utv9obldtqu8itf9sxd3muo0ug7sa6f2kj4onh0fdrrbqhkuonpl4nrk0g6eluphn3b68rl1cvt9wi1pbnz71r3iki7av91art6gr087pk3lvar0xtmdrerv9tsp27t8itzz9gtei4vqz9xeh1q50ne9uyoqawhak2rax9kegcsbpsdx95185ghg8a328vf7xay14vr0k1r2at46cqw0s1pvm4nx4mzzhnynra7pl3fcvclnpjd4mzqxs9ucffriao6c8kefj78aa7j8jxeghgxrvoixen6vq3q1hgffawgmvrjzelslw2x9f9seadelpxl9mk6qrht556dj95gfgbamqytj292fb3gkz0mobhrq4v9ver3l5ry17m9fyfo2z3l0w2n441aknylifpvqm8akxw9kyemocsnt5kzfuzvb4is7mf08rz21shxtkutwsidrhnug332tre715ttbfkc4kxpu2xufu4vtdpxmcxq8qrm7wxzofvxfia0nk972mwcvuhr5xhnuwjjfll6aisvtijnd00nnqaqy01m1q0hddr6nqu96t0svkpag8zw6prw52qlobl2lz7qzwl0keada8gxfpq8ua60zxhc2467e0s58mkg6i4h4fk4dlhqeonwh2nnskv39xo8tihoh8z5i6f9255sufegd26u8o0d5zckz6j3x3tao72kptdih8ztgui28hukq8nr0d2l7ux1k39kaco77ov5n9qly56huac3hxbwpv22lanas5mlbrz67eepcur17q8thr8abdhd6oloy3nyh5c3v3na0p4n4ue47hi2weloqv5xbhl0abzbm0uxjmed8qdfei14q93erqyedjjof87deq9nyv3tseneh4bha3sazbuzlhm0d5zip6dvo4r97vwndlwpnq0p7f6nww1h1lc2rm55d82hr8htuq6vaq3nnm0c49qha3gl56i1m197ijhgls72kgrr8tzpbvr6vyhejdizx0ult37eciw2j5zn1qlcjjgdyc6ka8sb3hxaai3vmvjq0744o6muqn9u3r9c508ne6nvk009musffz1bt4f61e2nkw94zkqygpw9k1sjmwfqruv71m3a7b1d7690jbwgmm3qjodt28ram4xbghntp8mqlb04m5dolxnn0sfsqavlvvnr0gu12hmxulp8lci4kt3devm9xcb4st4j06x78ccf0320scl0vr6bgueqwcl9pfsfak28bs68xznfstol6heso4vnfdkqcru7461030i8fwlre51t4ke9e036xg740gj6w9e7dl0gu6ci0c8kblvdinp100b1k5zi3ckcsditbzlv6f4ye0hpvjo3pz9jqhs8qkwd8usum14pt4o8l2ksm2j3ugnklq2i8rxj0k756j3gnwinhbpyzoj6za0ykr2ucey3nkk8xo9ljl8ph4qkwvhxlraw35xk9zy0buvpwejnv2phhnia3g4ym2swsgvfpsdy34rfd38nqp83zqsqsw0ub3d8dq16m8bmoehxphg702n6meydi7d786sux94wytq9ne9nxe812zj2sd91l4b64qmw7njq6xu4hvoe6m4zbknttzqevmvyyosyn3qvsk5dgyt2kay6h3l4sfpl9nnj0xdggwet7ldl3sdhhbh55erp2lc32ch0zbu5eh88oknfduann3es2s42s5kq5vme6f3aoo6ak19aib7d8m1j1l16eoj44phmm4y0iaqodl2op9jfa54z5a19fnqqk7vmerhpxmx60pdnn00rglcc7ad01z3p2rcduvzfkvune5',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'vn8kr35dr0qbjh7vmlxphrc41ysgld6vcwxf8d2aryac5leid9',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'srhvbyx6j8kvlnjrvbyk',
                channelHash: 'jygmymdwp9hk19g1uq1y3tg2au21mhy5jegyu1hc',
                channelParty: '2dzlq44glwg3b8lh1nq733lx9w7tou8gyv1pragbhun8bs3lkye8idyvzsdsuuqw49uxemlp6bdy4f13p7sk8is2ehfc724hc4lur4mv3264r8012v4x707a4eacgc83wpgfsehjm99fpbo9qy4uoqo2slw64iwq',
                channelComponent: 'lr6xbjzjeksp1isbq67ytgkh8ev75sruxvv6lcb2mp6jy9t2poxntt6xk48td5q1hizez0hlszb1b1goaqngoet58mels1cqqy9w34e0ri466josrmz9mfmfjsgj92c5nn5i50nl05tt7acjj3u3xej656f7vk2b',
                channelName: 'izx7po317zt81x40b3dk6bncakw4ysc1jwpi2i5q55w73hvd6nnutp1f3uw2k68uhjru4aalxoe6g71fgtxryzlockalqh2fqa70cwm9f323lrgbv8biyu34a7tbmgo94za0midmrw1m3jynfjq1tur2pzfmtvja',
                flowHash: 'e66998rfwxd5fv99qemxrtjjpzo3jn0zhjaaa8o7',
                flowParty: 'qcfec119dxzvbubgtpp8yedlvda7e4ep452l79vrsa5jk9ieon08nq50p0pu25aufw1qycjqo5z3itd3wgq6iq23xmy2z61bnflicqc81ur84zlsexvqkuky2406ycpcdkm3c2cg7dynyp98jcur6ie5zaz2ei4z',
                flowReceiverParty: 'ks9b4rv01wmcudzjo87a174ixc3mrrq7vhvx41qzbe4seybysg9ssk388vsjn4chr092843vngotz73pddo600hd5z506yjfgmhz6e0ab73wl1bz8i5fh12nihpuvfmj5wrsnva80tdg7s31giiy1af5zqqvb9sn',
                flowComponent: '99tfsg9x0adpvlcc7x2kpu8u5vjxwe6floetnorzuo42g9v95xk0fr9cn7xbfi1s9fygotq12mc7xydulhd7bo93s4exuq5hy34pi2ngv3xsovfcquw8wqvhkf68433pgqnw34hkdx841e5i5r8ba18bktsesowj',
                flowReceiverComponent: 'y27pntzw0ctmtp1aykpm23j6tnjlv3qg3751p8pj1z0peeehpdo7hvcuzra1v8t2tv0hlc1hwfy2lmzt8luymd2wgdg9kjhzdnot5lvmr0vrlh5gwcfuwgv9axqd8cgurd8nbps9qojb95u3gl0q66ewfrkr68rc',
                flowInterfaceName: 'gz1pwqclrnp4ner9pafl11ryluuqwj99j74q946alcfoebdqlamya8ynxlxifuwid6fjnwiuetlu5cb0hiksdpoo2f90pfoh44bxyui0718s0dfmkg5r2us0p5nr2r5o6zgjol9fv2x9kdyny8yljx01eltfro7q',
                flowInterfaceNamespace: 'g2b5k3er6hcbevq5grh88nwfwvsbi6zmcsjqvaek0m7ko81uwjt5i4r8ysh2ioqsumlpqvo6mzl4vb3r4tosyk653r1m74e6jtz77ks1v06jzlhd8v94930iso6gmxcxu1q2seuz76mgspdq9xpi3c0pv0yf6foc',
                version: 'dugow4wds7bkevfd7qy5',
                parameterGroup: 'mahl8vziw4rbpiqhuh7sp90sy8f2k3ojx2ow8n31qzl13hjhkjmm9c6k5gxnemr2b9fagjq99fdbt9z5y5q9vq9puu8cpcx9dtina6f78ye0azrr6yq6kb1hqx8e0kdqrluk512a4bb09ge8zy636wz2am8c23cnhks10sbd3vuwrttz446j4qx54c0z69g1rky2gi0gt7kjqkefhvi9t1y6kdj80nv4j5eusnfo5plbsmqywmhj9k2pl2e34tte',
                name: 's2hwxe7w5y3n8b56mvw4jcucfyphej1kiiw37081yr0wlpyl8yosdy36pkih2losy24t2yuu0ghq36oztfwme631ydzp0986jubzadiy58qrv2k04ewxkj9pzahr1cbrrxqnrf0sehrir5b2o0f3ygcfocc857mtmw0jhf706wxmgmkiio1fm6tom97nez01i8p3tbyydftxo3kfmt36tczn55u72o5ekik9r11mbysrfno2guczfea11xgzgnqnzn8d3zs08sgdcbq8jtrvv9yxkb2l5sevzbm5y404g9y79lfw79rq0468p4r8nzfm',
                parameterName: 'wu9eqisgqkyo08za44q2jpit2928q5ngrm1hnsljsxbpigtpt5ds86osq5ylryxal1nxdddr5oe66rq1txglxe9p08ji714roijc6garxadah6bewfqhmnwyb5wr5gxq8zs0fkoosr1wiplcdokrq9achfiixe7ugqupwywzo5ckkoz00hlf741251lzb85lr90bqpyvq38xkmbgcojpu7tj7a0yilhj3cbkws8z6rhn7hu4j30v00yet7va98nwcij660oihv0f9rkgk9s91n5zdg6plvlfadfc0z9w2maq06xijt5zni2lw2v54iny',
                parameterValue: 'bpnn8qooev13vacf59ukplip0d8330kv4x4vdp35ylhnvmv40kd0q02v3jpqctxjd69lpc9m55n2hrehc580omzon3jxsihgh4e1gc57zmp391zbog5isp1h8xxsex5vyy5yqdzakh32svahq0oy2hi172cv22sdoadk341crlaj48dr5wnt1cn932swpjoux6vk8p5q508r99d5tffo94bl0790al34hg44sa9sqn0m97bv7csbkwtvytzbnbjl2mlvvhk20r1kziw24kvnii35wg109cnuqcsy54kl4p1oujz80dm43k3iy2x0w9whpugqnlp77d07zpd9ostphcn7fzspxvkr4tefwltaz12z105mpozho966qljddmh05sf12wbw3n6xne0z5nzoudajloc22y1n4ci5kpgytn8uzqvejjyy85o77a10zujlf26c210dttpwf6fsjaag9pkh6ubmjhcb08u3jixnapk9h8cgk7tdoe4tyhbtwtc2aljla0izbicszz39852uxdn9jcnbikqjjec4nj1cqa1lwwg7zatvt0uf9i9vreqp45i30gjkmncyx0yo75sevb651poqfqboeubrwjxq0y21o7wzzgr5hjsn1qkt7lmsgqgvhgupuppo56pb7eorwt0f1khbr3y5y5r3hd5n8qnfyq1xc7xtouwhsjd3uyky4d0vc4krvxn5fbnbxupzywh1e4h9o8f36vm0crymgf6qlcstw0fbupj22lg6izraj237hjjeja7m65pzi1r4lj7jiwu0hrc90zez9m1hqqyudnqp13j94j8hajnvj88anwjdmnqxnptbb0l2n41ohhkw8neba9scgmo2fufn5vkbdeg3bcvza0bedv25gjixj9yd1zxd7o5tufr1gxcc34bowdcrvpgvvpmggkh6wnzqoxv6p3wflqorehmbrf6qxi7vkdbj76tityonbawet6yfhksqfsvjpw0sgn1bplhvuo36mf81b08xnydp786f5q9z12d0nhi0zps7c6er8m65jl13gb6fss8r8hor1aqqgz6anslctnrvmszds7uvaud9kcq18lvd5qdbta7ag4qubibmcvp8xdoq1uj0ctmqmuv7lsiz7w5ztlpmlzx3r2um9ukl5t3krhazfxhrmifhx3e7fwmqys5tq53pmfwpc6yuwombdsarem1kmkayobnxyem5i24jmxe59d4pbotiqpivu7ke8xttntzq7u3639ikhtae1sqnwovwa48vufkq0r59pe9uy26y8utmvu3bxjmwhgrcs0fqfi7y5hu77xoxef2x4yl9tww1n7mkeeveaj1ojenwgldq8ukalgm9vuqz13aj108faj6nkvpnvdleqgtekk23jpyo22y5jzbg6ncr96vg94pj4197dts8m51r073vq1n1ns6lqx8nofjpi63uid9frvcxq1014t547bkb98w0adtsg6jtx6w0hob9el43x1x25vexvovcsnq6gif9jczfyw4zymacs187ncgwolxvp5gb2wk84ur6veyvaedfdk0jmedupiv90up4qpbdad0zmsxgtz94cmdl78o4phfqatqgaj4xgcsfkk3zxn9wb9pktemjo9r90rqb2as28p0bln9x56hlz160o1geudjg89p732ecgwyq0ukusrxi71li3l7pvduyxdabg4l6asltvj4vqdrt4mp4yzazeaycaaqyse1m8gftf81kli19urqsxh881awbrk9zri7yfkpuu2u4txmdp58x038zyb7n660ggchchrhvhr8eyzxzujrgp43kvu01jxq6c0v84bwm4veq1s0ncibwkaubhxqtsvbets5yhwwz6af6u56pa7jsqdq1p3vja1azte2sw5g3ktro03zd05p1ox6kjj208fw4aazncn3biqoxqhuib1dycoy3zerrvkgyvc5qizx4wvyzqyzs0ztf2c35837ou8u4ux8e134stm5y2w829y6qk8wxwjfqz0cjel28eppxeqkrcrc1',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'ptrlhrs5kpmd6hcq3j3jxjhw0vczcm48gs7k2s8bm2yjh4vidv',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'wc54wrp2ivnb0w8yvptz',
                channelHash: 'p9kuvu93zzz5c1ib1hfgoodxprk0dpp4a88viyqz',
                channelParty: 'r6v6u1i4jlexlzqbzb08gfwpanerax1nha2jhtoaltkv1p7z62o2nmg8z3bpdyipmc86iovf7k2pte9s6nqw2st243ky9ltmbpmrvlat593bmy61tpqcglwkmbw9anp4idlrq5bx9rz9rm60qy02giw82fh7ewqf',
                channelComponent: 'kef8vfeimz7ltvtn8rieh6pwk3t3ywq3lb9qcvpbmadm8z2dnh3x8akrgo7w78mbhjl3evtne49svxhyavjr2bkb12aswik6vzdsbodz5hvwct4okw1gcpaqdeg9mkc4yxnom9jladkuplssldw5nkjextffjepu',
                channelName: 'xhuhai19crvwdhiws0crdpyldmqhmfx2aml6n692kd1i1dqocr80t47zhreuz8enkka24rjteroelrj83tsfloo89jjc6fie22szeicrfx6o6t59kzp4gldqd0pg1v17gl58oazxn3v2txpehwnqval1l6duw0mx',
                flowHash: '61u22pqtdfy19op380od5ulc3ei7oh3q8ij93yxf',
                flowParty: 'f7mpdmertdkbxbfsnoxb96ndj5jq3t5ii90oue9na0x8uqo1n4w88zqg5dx4emz8xapt864lexjk6tdb4ap6cwptbyj4sx6l12ugv3wtbh90g7q9dtsngu3u1mesm0mk1kjhcz4r5yde74iww1wrvrbx62egq25d',
                flowReceiverParty: 'ue12qx41w5r2jqfucjihzzx42qgd5phjjrm3lp7bpbonx2mdysjna39r8cc4yd3p3ububuouwl1uwqcvkg9tamnuxxs53uav6kk3ciso4w9wcl80rr1uw72ozc6t24qz4s3fb3f9fh9yhi212phfmmhi3s3iuggn',
                flowComponent: 'dw1ou7tyh0k0rzzeii459ptjdgun965j52frkw1c85lujwol82vdvy8v9jxs6ioaxvydgnfnt99eote384mnrxq2pi8uuz6al9t4enjkppx53pyp4d4bs9763s51l87jaqswoxvx3mit4oru2r0570240dpradp3',
                flowReceiverComponent: '8u9ir15zdwlg62vn2au6evcky9xvxbf0m4byg9tj10yekrf089yh5x6hie0as4q8nt9zpmu4y2hay92wf7w5sgkp8580gcmn6uy9dprx7n99mc3pz7o0yidyqzg4ie8vgqw5c8i92cgsgg7ff8qe46ge35vk2tv6',
                flowInterfaceName: 'dr0a82c4lfwkdvdw9s6eumdfdauels9k8zah5krz3bff4fwbh7jn97k0wcwytfs8mvtlyczpt3ikn317y9476dhti6ik16kpob4wxorxekvxiui0lhrchiywtwy64jztp0vfnz0sb31v00dz4b5hh3wqf0sjc0pc',
                flowInterfaceNamespace: '9c7hr8dqha8d5gdtcgdbhq4ajs084drjdo9i5l6bhbkk3fpup9qjdv1p4zu8t8gcnw6dlg1r2yggfnkal13pgy6bneilikgbr0zufjj10v1xhcwva3srswgvefi6t1lj1sg5g0jznu6p0plbpy1093k3vjo8301q',
                version: 'mmmvv3d9tqz6skwhc7ld',
                parameterGroup: 'i43abs6m9wviawdrkfe7ui9ovin6uazre4q7035w5ntv46o5bt5ci0j3sct49ut349h4w1qej2kk3wd0f6jqq05ftu58joha3nu2eigd4st0adfdxwap7ck6oiugjyda2gu8mx17444ce8f9o6bvn5x0ga4354ub5l2mw25fqver85w1sq3cmcajevl6b5wfjtmxr11j1b8425r7n0stflyppmvvutec96a1wmyxmqmtt0z7vtkygrxttd0sh48',
                name: 'gkzwvcvqy18kavl3e9as49t4nmkqhaivrsxg9j1p0di30hfy23xf37z8wfzqwbs6yqdbmgdepdlrac2uilukd1kgl5nm4usrkvys4lngo4yxaynwxoh4ks9pe4eyzi81hktiprh8ff7zlqcu80eq7t9e11nxx11v89e89zc30wiwrfvjhawpsqbjkinuonvzz2v1lmypejmbrt5e5rogyr7ittwxmcitg7qsbvqtmyh0zphxiibu6ugvoak70vd1dnhfddo5ofn7i5903nmzrjrxemnt5aa7p9neckyxkr61qg7yr2kf5nha0q2mc41e9',
                parameterName: '55f6p0hzwas3xmiswy4zy5e62h52qow86bpwk54b3qdibm4nlm4d4u4sfugip14wtvahlt36gkjh30sz2pxde802lrqzcc4mdgu9z6kl6qvc8dyobayq33kr8avobte0c30otopu435pd493dq0tqxo4r96w14r3ofy41l6jdo55q1ic3x8jjwjwf9gybtk3iqbpj76rfqahe04atot5270h9yxlkjk21egzz1gp0aw0y9gbazoi5j8jb5r1r9soze0kvcgp7ynlyhiwcbizs2wrydol7us9z15391j39z7njvlxa47zzaep1fs4h7cu',
                parameterValue: 'ckqvovuhhrvf96egs35ez5cmhhm34qykiwiw4z3qxyexc3viprau7x0mmx0ahoo2h9n6ajhr8sk92lp9bmh86e45vdiaxmul8ppkhiay3h300dc0o9jbj7flaa74qp4p3pj2rw8pvvxzolueyv6ng5q88qtf95gh6546t4phlqxowkiez6qje1yhxza1fvir7voswvy8fs6i2qzjs0at02pls0ffstppmccy25sbee0gizb3h2exc58akn3fvvc84qucubvogbmtvlb67s5e8mpf978xdi3f1shhu29j83h8ykjs0y9dph3e9lpg4yf1r596l26b1jqtr9aqqrnofdo1779clbiucf7gszih9yivk7wdz0ktt968o4zeur9ygn4vjdfj9jvc2htr05ja4e43i945r8jwtvro8rxvg72qduz61ul40ouhhactu891jql0a76mkiwj9hbr07vw8hyd3yij5qbjy2pio6caglfh14dh42fhfprvhrbx2e7frs7mw4nyd82u519l4w3x66preodxou3n80dd6qaa7wy0e3nkdfy4erjv8clixjjsot7iz4r1fpk1btowzd6hfx9omuwck1wc6ng2d33q525nkkpxqmhmrzbrox66fo29uzwsfjpx76ekuxqbkf83k8s0vlcp1jsotkxjqnsrzemfwx1k3egsd10w2b44onslejvfl2ilhqzdhhk470gaqhxdgxfo3iy3pwtx2l9o1x8s7c1rtzbwyz8d9uf3o8yyrtticgr1pebx0147h6v0nakxjjg7d2ujd8kn2zji3hzij28w9bbol58x0i0xotq08k8j2jn09l9e1vi4xbvuxf926gfwvd1cf3tm8hzx7lbwuvoab0hhp0lj7bndiv98y67wcg93ik6m2s5w9s8g707ao7jkh1jjk0rw2jpdfw6gn5yrgw4a2ge7wkpy3sn8fpf52xc0s00la4hgj0mhw5lz8cxuhh0ucyggnzoceinqkntvwg9v93zvpzzn8szbkwjknosxtmj3vx39qdzvab1wu4sayw8ke9kf2tkjzxfdavjbijk4gr0u93jgzjbzip3jvx6kzan8y0j0qsa5jmy1hxm7m5elz4qv3is42rupg77lu7p3xo5svgpoyuf5acog4cjv51w498z4n6fdymwz2bzfvtk3mc9kgxv2e5kgxc073671cxpw3n3oxsqsjmftlnp1zjgcelbxchv4ksjytil1t3hdtwu4wyduoxyw0feut1efgndmr24uzkklgghdn8k3wm74gpfhajc0epyemo8hpheehvpzg5uk06ytuaarq90dpt2j0spgw1g8f661soaky7ecytcvpocqfkrnnu5yd4l2axsxyeue1xwhejdv3va907rf9xs7sjsx0xx3hlts2v77vs26qofdxmnrlpahikhw8auku2srsfkn5dzcrn7c6udvfubhn98lralj4h9n7vwiec4phqwxv88oiei6h33tu8qn5jsww3o01ez4jxt37hviepaheb5ibyw2pr990x719h2ijdla1xti3ua9m8k1vei3zcdf41v95xt9816ldiwri5g0ek1gqpw82yz8sadhd6qh5skdkcdvtnlwwvykf0dtujf5zr3lk2r5frhjvzyl73p0g3ku8rzix1ubgeotmxs5c0mquas8ipenl7kzoq488550q0vjd8kemkpzjt1q7o4clqf75ibqw9l1sues8g3qx0u90o1ssus5facrxirxj4bsxvpiu5mr57nlzlys2h3vypz72x151i9ik9itb4x3xc7gynsydypkk8jsn1kubup7gh28laoa4zjopoiigti2dmyjniy29r7nb5ln3b7ajfqi33z9t6j7mtt3usaqtdf6x931ngwld23e4srz8aev4solx99dha73kqm67bwdke549l3eyajxftg7atamekzbob8e0tkev31hp2lwkdl447p72a1q183kq0yqg1yrs6cnbfb401uealb3jq9b9kvv8zlxc0i2ue6xc9ulebabe7m0',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'wp3dvqbpafd73wg1k9dndvaq1pshott07beazvrx4iled89spc',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'zv8en208ban6ted0qzrn',
                channelHash: 'cyc2lg7jv7zshqvlhjbhzbmdifefbv71ynme0jln',
                channelParty: 'eejv66u5whu5qpenpd4jj9t6mk5i5zoth1zore9ae8mfw5fb7mv8udfaps61k3a1n8ac279q74uwyibd0t2l7w8d2r7q34ufmco52k0rw2n7uq6fxele7elxs4n226vm2op71bc53xseb0idx2vuwzju2rilwnfw',
                channelComponent: 'pdirps6eavohqneg9c8g417ntjjwqs25hx1gd0joc9s1d1jlktft6rom5nkm7l306b30evrmlu5868g8ax2m7shhahmmq1om8u8hzg12sadv23y3co9qdzzwx4q65neb2fan7cxl1429h087fnfdrf7agepp880h',
                channelName: '7xhrtarwjooxg4b586y47glcc6jndt5l4bqdmudg6brqs1h2qnm1ymyaxcfjzfd3a6d8l668yhwadu69mm3qey4o71spf8euioq3aebi0lsab7x3xq4l48histybpp4gvek2c97v41jy8xsq33e7urpacy9t9o8r',
                flowHash: 'ps3zajgolid8tr40wq0mt17yc7b5iilf06hno4g5',
                flowParty: 'priwqgebp9bedy1lcsm1ubbhe09i0lmibbz3bduvmmpdj6rdosvhef4883fkyaxf312lxy9okjb7eppfh6dsk9w5n1g3if83p043lsy6hplse2ox5ia1jw2mal2opkc1po035ria9lntnlt2vuzblzngm1w5lt74',
                flowReceiverParty: '527y5ns90s40b6cc5juc7e0a5oww5ks1vn5x3h35yxxczekh4fs6il9j29lxuh8zic92xfptga2lkun5yqzn4jk7j33rvsjkzn0rgl6u6ux8kmxjrfbad4rmi09h9ty3wq0l0szxrjtow0t0csg5eguw9hvb1xjn',
                flowComponent: '7rr5jdxgej3045wzjp6oh5tjgpjx4qe005v42eqpmw7onomjcnx0or7cc1g7uibz936r2iuyca2chwoaiobpe4iun9lecndq6l52kw6y3f3uq98yi13l3kg5owk2fq3jlcuod676e13dqh0tea18ld5q553wa8ze',
                flowReceiverComponent: 'ff20uz5w4axlzpppxavzwlynrmxq9wxrq091n2uwmawa40u3jrvslctt9f4fy7s44l2ya2ka3uyjqtjptx93piglsh7uw48k8k5j9gxkaig1uj3sthmsayq0v23761lgibutadberetalcs5w7qe4225dmbhsvrs',
                flowInterfaceName: 'rokkbi37ez4c7gsg9zcwdlogf5n9v6pdwq9p2ddbxjj4bxaq4porb7b5lb8h1ponye0nlaoh2p2njhamxpv9j15p8b82lgtys9fmdxsxfxh4edsdyebc75vubhbpgpoo9swxgmg2lcvkakhlkmiqbgky8rfwi2qu',
                flowInterfaceNamespace: 'yaz2t2xi47o37e2pn4agdwyugn6k5npxfqkl8x9qmxfq2gub3vsv1vzd2aal3twk9333erru4eybkcsckgi24ccp8q1c0lkrao2i35sa875li9w34cxm236stq2znwp7g21986bc3350l1lgp391axtleywg7s2d',
                version: '3topqtxwio1nmj9j8u8m',
                parameterGroup: 'wtvazc8ql6twnx97viv9uianb70vzv0shf7zqqvke8zw24crnixg5gv6noss9g08izy5ntdgw8mqeofqucdfwtqxv3it660r3009l7usb9nr8rocisihsbu92w58xcd98x6vear1o0qlu01y580tvjtfhv9q582f9egmt4oewd7lhxhwxzvgdkpsvt8xzffbl2f9jlhonhdiwgyy3evt44yb84i64ee0lbnk7m95cihdjor6qq3wbnubaxlq3k0',
                name: 'qyj9f6mzbjb77wz75jzavgdczus210aiprj8qzxnv6m27ec7m7yuok35xb7jm8ehk3oi76yw08mjxwqw264e5xzoq0ghhbopc576x1dxacd18pu44kjjmlf4vnj1oskhg8luauzdpzge71t0pkkfjkdccwkvbwgiltrgkrn6p48icfbzm9u29hnozldttnvx3i13i7fvydjygn1jtvxpdedkxg2nn9bhb345uzgq1ixc7sbzfm6831vx2t7f6y08kyfyii87zwtfuiqpfu7t8tjgcmjyz7ea2ru7kn3evvv80v7vpd0qnyr551qgxr30',
                parameterName: 'xlerwhkzkhdwgsdxizfc2ebp863ome7r91r2apunxh2n91b2i2j7qxii1wd04qbhqazyj7ldcvr5mom3x14pt3gx39t1bgwxwb6dlai6ugwdkibfml13q93ow7fgch42hkrihoofvhhd073jr3w0raig7prs9ct7arqowuw7g26df165yu2p8j6n7rdl744bfaomyzcyuumm568dl44cybqvq8ii5qof6qxy0bqoo6s22muaz6jyu5yo5jatjerirgcffhihefv5prec97yle2mccrmylswau5xgidhqqvw2o4w0yb3njz8d8zuqxxyz5',
                parameterValue: '4uvhbwwudl7liff62l1gbsnszw0joprvpusv3r8ahvf7316wjo8qztyvgs1mpy93m37ncwvq7n22wc12yjuv3ee9a6gwqn8l4bqnp6icplkmtutle8rh555gd5fdof3gz4w84ikv7n923e4q8dtuvarnz3ufls8x3vrfphh8hp7gg2wbzaofixhbssolpnyqaecdyn8uu8wk3mn329r8j0mzyrrlhwtypgdvxmtks07qmwzld1z81nd9yftcxbu77i5ak2dhtira79heux4bq9a0cgbm8dh5i7zd4xc0lppdoh2az3rn0mm1ca36uqg8u667o8g0p6vbzo9qe3hvi5ky8hegiirgqigwcszr11c4cs5czkcdzl0lif30njh3p1nxk9uq3c8hbcrq0pcbxisflochh17uozsapola0aaxq0yfdydi9xqze5zv7xe4aasqofstm6h7qhc4fedn7fljwb92ojt54hnjbbijfo46icvfcsvjx2ljzwp6mcvlr03pju3poqxxpslwsyvkkoamng9s35d7k6aanx08pspvxz77tg4x3w6enzkgtydh58lw4i2icr5xw3uzpij4f1sjn397w5qrm1phuamxi3m70icvju80ujcpri8niabingiu4ljqi3lp8m9kzejrk7sykzxs2tbekm800wpyn96jjxp1bhk3rjxug1vgmtij5m9edkavlwicyh9swwintwub65y7a5ldqrvokxyywsjyhm274fsy0ett7wd3jexmkalycotnmvxh3xofnrsqkntuzxsz7nyn56v0e5g0c2st9p1owtl9l9fg8qo11l7rz76tmf2lyhu92mahnhsfr62erpih4nr671vmk8a4pp0hhvy6iez2qwbgf5r1pfwqmly3t46qm7ayjb1ocoevzsk1ssvt4rmbj0ad15xpghc7ydz4uay9fl67aa07pe2fjyn31l7hzax4oenhmvj8b8815um4bvnheuzs2vlaku0gwdesk4dt7srcba49r0enrjd07o9ap6n38v6nk73gljf7pilzcyiaqatdtx821thsuyhkrabe6o9635fx931k66j7um31y5zofhlb0vh2cy4wc1aq24yiel6g4b11j4fpqskxtqck1q3r1yuhg3a1mtivnw5jlxn26chvyuj7ield7m9gtg0k7980pe5plhnyu6nk1mpoydjlubass9hi2myajnljl0qc9gm4ox2ave5ns5c68nm9rr642mootirytvxunnohzx14pg8uckx2vhi9lc0cr9506w1i5fc2dpqq5xdtf9yor6w2a809oqi6bg6j0fx9val4si2es4qf5p9abvrpc9xnvnhlgldfrax1not5bcej5l8ivyt6jy3cc66bk0fvkt743rrzvvfikiqwnivhk181btog7yfsa6bfmbv85o0zluxnyo6amzrx6d93hgg7ob59m5fsy9kf3dlqwcgrc6wqdpweqf9e0nk9n4w6jwdl3o5offxyz9rp14cdakrsg3xouhbcfr2tocv7yiywd97llwcv8li8f29oiv4tlxmq0a0padjha8qb5xq0neqat1ynd1zdmxhknukz6xumjoc28gcssrnpmiznvog841g97ttm71fam9c1ixfkns673zonq8rm2bjfbc7gy9j8struwkmfmluqzz3y9fu7z6anj2x5ewk24zjynbaw1jovc19zn03n5keubag65syi9fzyau7lcvyqr2p0mankpz0h37qrdswm2eedf8z3thsd8eumg1svo6gwqpyil70vod1lgguki5ord0rab2obo886p9r0t07bj6lr2bfunmv0m5zbyodqpyi70038ov8p0ganbcn5b4o7gttg1qm9lisuz2jha2xd3l3q5b9vinbqpd2ejus286q4e1tbbqqcu8hs9qkxaer7etegx5mhk6k8t7aeaklab5ng8nt5ci0gbpxbk4mh9ffkkmjpsitlxjrzqhx5g1rwajhpt4ao8vgjq90d7tl6d5775zgh6sherhe3in699gw8',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '1hkylasm4z99ls3662s2ugl633c0gmi8r250nxvyahozdeok0z',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'trkgxwshecxsaok8c72r',
                channelHash: '7hfvqfyv67dkd18c6p48msht1odnruztrqcvtkxo',
                channelParty: 'qfnk4vnh2r91d9hj82alnhv8fk1qvecymcytswc8znt9mfjj5fcghell0slvzqhl3qvg82ltft4wzrbouhrf36e09ae1vbl70e8ytryeiehki7w5sqnd7ma3rsragbta1rjp9wkdts3fsnpujh0pofx6wl2wz3ih',
                channelComponent: 'qkjtx11xz4j7g6uhbcslaffr75q05qo95cnemgmw2bpb80973cqzt6fg2rn8pfk9h8mxgwml3xdfbfm0qf355zmkcqm5y4itwfl4pgyictic9jknatck2s6yneirkynv61iw3u7hzqjxtr9bfw6zy91gtur60sp5',
                channelName: 'aonaelhgrbk896m3jv39yp44zdfk3159qu5lb00nbr86os25d6nzx7d35ea7pu6wvb7vl2x1sr83grxgcx50jpedvhji336qngd7aerynv7hus6sb4icycwx430wg31sbega85aa1ncbf81kb1akawyat449kr8j',
                flowHash: '9dfv0hvk2if0vpz04ep0x8t79ki5h8kt4eh37qxk',
                flowParty: 'pf1dcg9fy2gwpe7zfohm2s46vdotq6zfqqdgp0r5733yub81806yrxa2377yewb16f5yxbu59bu164p56d54lcwldgz6p4u5nwhtddov2k1tt95witx3y939g2s6xw72p8e2f49e60pszghr95dsg4azobri0brj',
                flowReceiverParty: 'wvsl8zp07ksd1c937ua29wmgp7545f2l02jlg4816gw5h8htbiyxfkoarvwtd9gfa0845bx5aa3cwz99bsjz32sixcuafpjdjc4fhprpluboqtt8hv3ydowmzx5dzov8swn2zafws0znn70k5pobz1ary2degjpx',
                flowComponent: 'bo6m623tgudkp1upiur3m0x6o0dkhhqhy5i8vh7q0elo3dadk8ky1csvpwlqc0tczig2um8xy1wwwib0lxstszdlnhwrjom2xqd9j99g4ziftut8cwzb3est1pkh41achhphmuwtvwvjjqy8zr9a1f0mucjiemb3',
                flowReceiverComponent: 'jh32qxf751dqz4cckwzjfsgbacphvrybgs54h6h0kimt22b9co3pacet8cibbvzm4ixtqyrkpanqq5wuext0awyyewwgtzqh2ykoy63i1g6b8hs8fc6r7nmdhzfz7xfqqfvccyzw5opv14ty7blhlm7rpthp914c',
                flowInterfaceName: 'xzoru38iko6hh8fd8jrhjh5sim1medchyd0slaa066d6awjwk560gy1e4hvh0v15sviaqh0kcrizdtz0nkr5so02ohth0h74i7zu2xwuboyh9ieju4alwm9zctr00i7yzp0qh804yk3rv5xoo9lqzs8w7yhwqp1m',
                flowInterfaceNamespace: 'vfvfnd430jkwo80ks6fn2oxzb060hqw0ggdwtvoq6wt2wapzlwqvf1ovwg1y8d2m08i86l5zwjdodz09l1kuw1bpay44euo9e74fkorwrai7yc0rkkswc4oos5j1z0xnl3k02fey09e5r8dzp3bvt8yncf269ucs',
                version: 'l4184o9sxju32rg9hnkw',
                parameterGroup: 'wi1b89063zr5umdwuiz9ojvb3mh3clu0p4jfpubux1yacnii5vj3obw5ik4ncjqdxyrto79cw21g1yoigw1uaicc1uu47f4snmfvy4gbkfkyy08fn72n206wi3ldx0h87cx3t431tsf5yukvhsm2t0q7pazdar04i3bolm1ealkuicpk8opsvi8unuc1o9ctuwb8mdrjqzsufs02bc11kzrb0tbuhhvbxbvc7kyl5dlbtkp8g1ctjxqvs4mzkas',
                name: 'y4d26oud8s0zya8fjy1vpb555mkwhhm66ujtzr03ij4auhnzb0iv9sbfypbe05ho8rcmh3wogwnf9d7efxxtosn25la32i79j20a5db6yyn9lbuwhuf3pjyc11dls0n70plojy7n2nky9es9l8jynjf754qidrkflkozr19wpupuvqw2ppri6ktypvkyxpr4plpn9bl2fmv5bsxzwgqrybl3u0iusi2izyar636tgk565luxxu3cu02ws938o9uxr4lnsiqqmurc8ohousq9ir5qe5qms7yb8yczhmfp4fjwq4pzu2d9xyyw4zti11rk',
                parameterName: 'zlnivuwri1k4dgspkzmbmp4h5hcrngs8vakm99lko3wdequtukgm6nm8mif9i0f4jncs52lxve4z4tgowbtxyxel4z2sru34tdplwtgl2ujryrv4ppgitivg3wcua56cuaryod34nj4t7q8je046a866fpcefli9xuks9wcyrnk41o96j5r8smndtevv9obv0wsqvs985vgug6i23afit10fojilutsynmoaducmexy9zphx1klz2xqo0ng5ndbofiq7hwn2316ow0uurajv7ywu8nll4q2n34b65ieouxz334uosxf5bgxv5xkkg69o',
                parameterValue: 'xgldzdafs3pb6dy78wzahnvmq66q61f4fo9y2w34hkwu214hvnev8i5tj8xg77pomamw7dhzsez7hkfl8tryperyrv14epsbf55dez7ao7t8k6ggodr6iu3x1pinjalf168hklc8ctkvg3b4codke5cxsaf24a4r5n0b5kqxzl4fcg5u1wrh26ut54aiztwvx6xsnbhu9weuksy61amkrvmsoyj91u9x1oz1tuu0ks1o24obq4hp2qox3zacb4674a09syfqtdkcx2a94dy7v8xnao4zkqf9vc4oipji99e7z79oodpzdy3sjofpjj0fj53dig623xtplfaf76yx57vzwh24sy7iuyg1bkhnd6t7qh8e05836x3qlbzyvc1l19ojm2cz56im6zm459knolqg7d2qgg2et3ojjek96vh424pfy7embt9x77wzpgrh10mh6y0w15jr57jlbs7fuzxe4mv32i7evvrpo9iksyj1buxrz3nv9nq629rmo9tm6y3m8oqcsrxxt7u0f7vk93hqiante04jzhhesr4zsp195i6lv2mveeruz06h2e7j41gb85h04jdnlrg86orx05rwvlc51t67a9ca9bzh99igrvm5thhowce8et5qy5j6x0jqf7tgdo2hbevbjc9xagkmw2mh0ita0wp0bw6djt1r0krbavwlm9y05ltz8x4m9lmlkebbcgj8pyauvd46wbx9byx4d0ru8fyptqhs4ce442ti6sclavzrdcqyoyqkm9ueuh7xvj83fly7ajkkwvr8062k1egz4snjjckq4t2okx6b2l3jzo5cfxwkautz3jchpjmgeytw157iaziu6ffl7artuapeu079z6eu1akx7257uv4e0b09hg984g9e1upu67t47z3aqovseiuqxx0710ci4ntb3z7g0smaipa8ypesezy0xlag62ovsubnsxrajxi8ljsu2k6kfy7mtskabqxbvgz270sgi3oqzjhvtd35y3tu0ymxpmf9qmb3t1sst3l1n4mhk67how7foztcod78yt2ml7getwpqhaae13q3v2mrzsfbvki09ncjrzrwp5w9vkod4yyteer3zjy0r7l23eo4bfwwxakxjimb1dvd4o0tw458hzrkimzzay13wy32a0267w1x9gmi4rgubflls85w6rg1gkcmf7szbl3v9ogzxrae33zr7qavk241jdt9w3e8iuzgsi7si4o9eara0bf5l8b0o3mbou2ddpj1lym2nxb2zh1gzt9qqfq5b7m9y98k55egaja4o73ct0qdtb8qadeigf56kzqjegvido1ie4a8a5e0pjubfgwielajs7h3xs1r4e9ajxolrxlanbamqcb5uocqcnhn54humxwnywtcewxr49cxrktn81l3rcz7onydzwflnom1fpyu1z1x37kamv0elv3f64wrrnae14rqva2wue9odue3isxhdj72xxgd5c61xap5fpjmaf0zdthn7kaw7femysx3486310t0vrfqdy81m91dd42ykwkpar77xvnlja23zrk7tedaqkk4b0jkqjdd83ov26v6o1u24pvc6j0qo7k5nlct2cklpnmz0s06ansxakpkdupc87lfvobcf62td9rvlhvqxn0wnb3alm7z71umfr7ec2rgxg6zwtmr72d5od29u1y9797h4hbsoagqtq2z2qvdjhqls30vqddim342sh8tas5tkwst56bzr1sqcvgb6l7cp8f687zt8l71l68n5c6mwkbtw1vwgbwl40wno4wzwwpfuztzhkyjnv26zum4kbywobj91gwmcub8h62e4r17ua58u8boyg6h2t5y0ehmhpmspuvej3pzssf9ji5cv53uduqh435g6av2ob84vlqats2louez2uqnfgheku3fyzgv4igsgcq36x60qk25jrx3wcgttoqjbhtv8waacrmvmptow3hhxgzk8jda9feehxct4d6t0ibdixskxly217jl1f5bjri0neb8dtyfz411mstcyfhrirfqf',
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
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: 'h8sx76wzmbbb7iy511mfzjj9y171h6bxuox26v50k7wt5o97vg',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: 'xy3uxjp1mtle3tr6mt8x',
                channelHash: 'qpc8pd3j1alw8iuwan0bcegqbmgfwvbbbpgebv30',
                channelParty: 'ruios2iakp2sdohutcbxciag1c662to0wxz69k311y5uce7s4t8a6l4jlpytuk3fawsugovwpcntuorn8sghgoztk9n7kxmdxtlqtxnb3h7r6403ru9v282lkgo8ytvmhgv6ap36hptg0bh92o78xtqklnkaezi8',
                channelComponent: '0xou61bypyjzcuzs4sktxccvixae9nr2g3mymd1fzxov1hdrdmjm698gd5e9zugydnbc13mh3hg69blekapgarh7whdmzdcr6qt8ki2zwkw20h9f7f14cv3z0cpk8sophsd5q21simjybxbdhi1wjpla085xoggs',
                channelName: 'ft5at5r866r0cl75d6jwwruqs19fumycdjr70gaj61olw3nh5e15ou2726ahv5ficl692m0n5y07sdw02d3qvcx6le4hx025u6l4fz1hnxm3ivxqmpr3ik6kigxrqwts4ht44llxxoc6bfmy1nn5t9orq16jgaka',
                flowHash: 'noxvc7m3akab99qryixb3hkajuvivjcuocfzhf2w',
                flowParty: '1axk0gs3g91mizuk846ox40nac9nueec7woxvgmkh4f49u65whb4gdawxvnpgoll1yl4sxy8ohj408ttqqy63801wjx6qjbkhnh0l01g4358zh035953m81opkqj2wwsfq2meogbtjn0psd9es1vnmrhvytanplq',
                flowReceiverParty: 'doyncl3z4b72cu5jy1stug9h9q0lvgvu0dfrkdl73ch9s1hi0sbhri1qbt5njh69eh4vjog94flww1j7ua501y0lq0z21jekwvoqwd1lenaiizlrlrhyvx4l8u5l9r9eatjbziuf1dymply6ivudtyn9qpp7pszl',
                flowComponent: '93jb6ncjv1kq8y6n4mb54uldotc5u28vxend9x6mwvao45aapb9wyfhhlc6zl56yfqwt2cxj2bq2plmj96gs85lpb0gormi89xxxnr23lecmomx8l8nb8cnqgf0fod3d1o0wqm6cruzif0pbt3e3utb465had9pr',
                flowReceiverComponent: 'mqjkskuck8qucruhr2p84uhip904bha4o463gr3g1ievozpaesmronzq5hwqvpfsrb92tb4rkzun6an3miag8w3usehea11jc6m42h32tsarildonk2mwmtsc8io7f91buwf1zm2502n6kuhn635h4xdghew19hp',
                flowInterfaceName: '6wvfdv27zxdb45aku4vjsbw7qi966yhwl7uccz67tej8p7duvitn2l04alchl9o7wia7tmg0mglcejp9x98ery1lkq77f1nbr0e9cutv2e9bkly8afmlbmzhc9yx1pjoge4m0fpdmrqsak1adq30481edv5wth8t',
                flowInterfaceNamespace: 'p4p36dn98zqswwkmmh1lqofspveetsqhhyc42b6qlz3lnm96ai50mmnxn41vxrbn6yncu7cucfly8iz02aqy4vcr7qj2yydrh5jh8ekf5bm5e0n986isvrguwtnycau99atu0dlkdiwnx982o5kvvq5ekeekrpit',
                version: 'ptcb80u4b1xklk7zhfqg',
                parameterGroup: 'kv7ev6n6ukenkpn9er8iknsi07a7l7ld1l2u6s6oejw59vkibybkvqercpom2m92znoslqni4mu3c6agxwej4q1mek9sw3g6lhni0z0laznf3ikc8yjaxh0cvxjjde0idzxi354krk7n1qnefmea4155xrxqfko17y6qz9y2x4i1jnuwk25taj20jfiy2ribw7ajdqaygfet681611fk250l12jtwchjp6hnhc2aexbvolaxng5q3kf9okdx4do',
                name: 'lhivd5vuo0tofspkwtxggae1bjky682oatkl1jq9hza5pr2irrc14rnsbd3f6hcwfdcdq2rmb2xf5ellbonrm5g5xlzrjjscolzuq5prsuj0wtiyuhuwcr27rbn17n9vp4aht45cjogrluwzqtx8w85lwlc6kpslc0gk62ryk1f3bvryqjjc3b0yxunwyolal83q88d3c85wy7c9oj8w8y1h10swggb1ufeqo9j02yvsao9yyma2mr2aep0wk1cdh6ou1emi1t0a30hhbf0xov8e27dxdggamygbjgsy4k05o43n5knsgx5f1hwplp8l',
                parameterName: 'v79xjamz1c455l2dt6z4xhmj9ldx2rcztchyqjx1cm8q0ik4umamvlyf5rerlru2q6uris3sgovcg2wy4h1s6l7gfjtrfmyydfy5f1pamkt2y04npybbddbsurk8cqm4bhah8b5yva19jdoieaiofojjrgkejtie9mhv81kvd0lbysizfn2s5b1ss0j2r3fkx0y87l4ua9xfg8saomijyihpbpoeojvh5ae0hjwmq28j6xtrrw9g3r1zmrcevxugw5yllqlp8a7if257xqepccqghm6vemjc221jbty0df4ys5vqhzioqxbky024nh5a',
                parameterValue: '56xqptzmlbto8hkieinvt9ww4frmbehdd8dp2lb2o8j9g4muquiaogo1fdufn9o9vwnwn8pf9a95iy8ekhny0h0omkgwwrk1t3z7kasopf74i7oic1qs5qx1gd8oyifqmwv30bv3gxw9g30c3pdbcuepmwkkdobflnjyl0wpbrwyxnhrdtbjkh5vtk1a9fsrlmcmpeabdgwr3plif8596nicilyhap716bmi31gmdy75fde7ezbhdf06vw8le3dsh1mtnqjxyi4731xiwzai6hrlah700dw8cq8k9xnyh3qyyx8o6eo1sb4p82gsw2j3q9m1gjgs1fgdsfsqaan8owb5932q7wg09roc87rw6uv2jeg3ewjfgw7hl4ulctwy3wkjowgt95wkezn108f43iw1ud9enz1q4r7hy0gvc586b7iyeyn22vhf3rjucis0yqwq9j4dox12oaarxb9rq3v93nq36ccx6urjnpb5c35t0ao2pmody6a5ouj2c9z6kajg7f3vo34etewmupubqluwh2cqdju9ucqp4ovkuseunher1u9b4ywd9a1mvgsyjw93inl0cd3jmn7rd1cobea3faqjfy1ky5n01jcix1vehmzzd9dqzocj3qod1vfzzy0p3aqhyvra2s5aoli49x11s6btn3rqci2ml353zhxbk3dezoalmeqxhkbfxtx9fusqqq3cfn45dtfsetms7oi3mlj8ujw0e4q6ygyftqncffbmn5o7dzykm2788060ms5qje97evr1u1kfychwvho1zytp38e9k1rcupcfqovb6iuzui9yo086mmhm6r6xkx1ak3sod4v7vbota96h4hu7q57gsj028nvp5rfh2g0twb210upheu6n8qkiyp8kk4485ycfbzv65km6o9zcw7mp8h4fx9ocu59gh03z6onv5p7z52kigvsw7nrc6w1eh5lq8psv8po3fszrso5kf9zwslvp9ehmipulpmpxy5w8vgr1gg9yb5eu3gi9k1dgf02u7um5ou01lv1p5yqqpv5p00qj06e7v4zmuxqs33dratgo2iadztknwb8qgzzwkthvntaeawc4kfv86kuhfjvvc5q2isr679pjexewqzdqrq51xpna51yu8m3sd17u7xj13cp982p9hwd328c913ronou7hs0y0uy8lt4gik3zydsy2qtuc5g0vzfww15264h64knh8h2fkhem1ldgli0a0jwo98uamzepp4s3ft39j7x5g0co05y4nib0yqvsjsu8yccgq4uown4ez0iwn8psp67v3495q79trvsfldrfiqog8v9dwebcy4iqbcbkncn9a2c6aebocdhlbcawa69wfabuzjm84ad2i6odenu7fuua1bne8y22a8gf1n9h4osugj5l5m40ov5ko6ox5snozhtvw318xh7gprpfobb8x78bfhgwuunb72e6ezc0ssh6aizg7h7klawj8gtk2zb6j0wjp663ecw0o1dx8870vt2mrjauppx1hr1a128iv20aa56l2b1kt5lqk91xtdrm9xmy8t21xtz2jr866iefziefzthl1a7pgnhhyvmtqz8ixtlibyzeep3x1n1s22igtczznafzb491mu2plubmh4ylq1pie756sivp6li85f08wzc9res0rttqhocs6dg79ip86rn7xiuni4lvcq3bjgj221r9x3bw1y1qhezh3eb7ygyatvt2lyhnm4gws1ukx0wfdtgfge49aiu19t9z2savkcsuy6oanfb9arsb4ocftksk7g8xtjk4ediu4992445si5jqqa6r3hhkuclnr4d9hkiyfhjgdc5quxw06k5io4k3yn7vho4wxxxuvcc31ey7fyv2zohhh97fgbaop3dpgq159u55h0ku4duw0u5yat6w6b3h0lany2lbmrygct6hp8ixga5cv8uw12ag3g1p82usodpk4h6tr4mtjglzpxt1ik639xpbtyn5ak0y5w4dyhzm2kuss3av3ni118o5kub37cnt81b16ns2',
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
                        id: '35e38356-52a0-4afb-b184-361d8f20ccd0'
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
                        id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd60cc016-82e7-43a7-955d-2c1cba1027e7'));
    });

    test(`/REST:GET cci/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module/50f26534-1f2c-4e78-a408-c69287e7a76f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module/d60cc016-82e7-43a7-955d-2c1cba1027e7')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd60cc016-82e7-43a7-955d-2c1cba1027e7'));
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
                
                id: '44ec563c-0dd7-4974-bc40-53ac4ca6d880',
                tenantId: '118175f3-cf36-4a6c-b3ea-b402a5993d24',
                tenantCode: '9h8qqlppg937wb6z1fcbxfb1h7rn0tzotu6cjhs9ubk5w5q976',
                systemId: 'b143a685-1a5c-403f-97f8-eda071cab4b2',
                systemName: '3hyzgrx8l3n42jtnfpic',
                channelHash: 'xjgcid1ggrtt7i7x6cv2wz9iflg3plq3xhfkwwrp',
                channelParty: 'katarpypw821tweklo0apskh3iiznrjczodtelp4w04fzjmaaq8803w4oz4qh5ljy63iinjgiql0i35d0rfn6j9cz3efg22jjlh9bqc4l60qnbnr3l1nabkpy962ddff5vzh42vw50yaxigns0duff2oq5dgjj9g',
                channelComponent: 'pmplqv4hi6bdshunasubio4yln5a5h5govefdxkwrdov13twhi414b1kegoosr0xwahas8dtntwuz7ysu11hnbdc0jm6x5zcw0lv81y53dl9xn5xuo7yyaa4f5vezck6kwckocxybe1xhb4qfjm61psr63gvq382',
                channelName: 'wg4jt2afv2fexp4ikjacqtqufhtp6bi5tt7cxau0cpkdursny45or6ps3r0x1ljtll9gcus8y7xdmgi1rbd5i05mbsc3du3mpch0a8ztmxv377v7l5yem9cs0m3pl5vyfek6j2fayyrb2zzth88q7jyn7qlquz31',
                flowHash: 'ipyqhk35zz6yxaya5idxj6j2qczmna4uvuimxhsl',
                flowParty: 'avzhfw6zu99weo31ao5kpw6jp2w3pea3oiflcmxd8kzr3tank0hzcscsfejwr16071px2qts9f45bh43i6kgnrteb48yoe00mw7npwmccu5lsxge22dhb9p3u1gbr9agjy709n9ht78wjzmcmw5kkvsqcxigjchq',
                flowReceiverParty: '06j0xwdzk9zq7l0txemxbcxdeedc6lqbtfrwmzkou3gtw8ii55yhnbhxoigvw4kq4tj5311m9onulaucld7z34kkqlnhmiunhosflulmcq7alceow7wq00omqecmqevvplfzlmzoe12huafmbcr316utvnps2b6z',
                flowComponent: '5czgimro31r2op4kpnkd2lfhwjdxqc17wh4qcas24st7u6915h9j21rs0frnvhmos8wxxweeylfklek6lp73z1xc98lc9w31rj46yez5vefqnds7342whv5hal154eluru41oltg04q8h91a6tm30v36oh1qhgen',
                flowReceiverComponent: '80byngc4k6r87d9vnbkz1pcu2z8i17mihwgyeg08v25nqoqqmjuo27li5ghx0hln6db94gusdsuaevwqk0iqjpgnezzgvfxsivcbdp1sy8sexseglws0uajtrc7tx4uey3xl6cvh2up2v4aqbho9sx04pfjbyk45',
                flowInterfaceName: 'zmzslrt5lgybym93qsm8lia7wuku6g561bv8z06t7tju8cojls6sy7ju7ud8e9u0rxrkznrhlah1ncgkn89ki65brtva80j55rorf7fxtl0qbutqcbrqbuwpl8qgbuifr8xervgp57drgpsc7smrdr9vizg3jjjc',
                flowInterfaceNamespace: 'mmp185a3niiyrj5dl02b7hol6fc61e920p46i09lnc3bk9q9x42xh50dbhvjuuhbjw6blphho8wpbkrqhj5gmlval7qqwuvownit8xr7nths6y8xb1md9hr5mon39nms5z2kcfbu5d6qu5ta1tekj4otta5fmmcg',
                version: '3t5zfmmn536pxby8ojis',
                parameterGroup: 'ygilcn8jucwfz0ujt1iynn9d95jnndmbhmofh9mt54xm4whx9uthj1c8bismn44sar1dq7fyzcueexeakav3vjobycwenfi2p8o3mo3s845vs4idhozrq9bk6dlbucl0urcok6t1gs8298n5uoegaa4zqddmfxh6uuq4o1mq4zzoali87vgwscujmld13xh5c0xvtt4ouv5ja3ei1btv1d2w90o7alajngzzhqgg1cd2penny215eicwxuoafxg',
                name: 'ebwtm3o50afzpxanxtuiq9zttx87hbehw31zfgc3j6t42ki3bjcbh9mbskwnse20fd8fr6gk4j8gs98wwmfn3z3rycx7u98divb89g62qesf3d0ljq7hzp5gbh06j1tjtych5vs207hv8jn8414jlyx7nv91bojpbxde0prw2v2meaxhv9rb6xozobjzin3o4xge9q517h9vqq4ueq8rpsgx22rjwfrh2n2w40h0hmb7wqeo1dvd3arvjwdwanhahroexaj7ibdhpnt8udxekuxua6j4grwgmw25v8lfkaa9yjjg2pnw1jj4tcy1e5vr',
                parameterName: 'fq4ew4pn05n1sx3ac9p8ytpynirmiexsepwlicxy5n8ou5rqztei5c9w3xnehbg8wc9j5ra5mu218z3f1zqtsnadhnj5i68ngwl8337xbl1g3f08l7rvt2y3imgwhmtrfkawybx5wym3x4www5c957343thxup0knu3uik1yd8o2uqtih546jjj964yhrbzxnjfxdee1cvwna2i2ix8s4jcdspqeat21gt0or3vmm8kd0j03zcvs26idgpax4b94v5bhxr4t846cuuf4fplrijg0l8fs6uh2pbd48ifb19txn6whnb5o151qfj7c64r9',
                parameterValue: '1cnxh1cnlnq53c5elewwo6m2hk32189g1c151rht2fmm7zyoniuamtqf1spbb5kipra95d1gc5y9ms19p2sirmkmsxi3d47ahe3hmpuxcfhhbdzgn11c7nacubtqtmizwfaz0qu90drdjcy9f32p2rta9teu17cm60tows229186zdpp0yqfqgsk5xf8yfj615ql66wo7vahqdaky23v3lrdd22epwaeco68mxog9o7g06sgu2nz5e5u2j01pd8s63cmtwv51qh3lan82yuief0ve7urreqd5f2b4uspzm6qplhlzoou2jtaxtvibis81lve4lkn1pc8rg7yc1ctmym6zd7f4tc920fiemf34gwcuza46itan04mkw82jz8z2wrx3ufe5j5wrgabdlrokbk3eau9t0gwbyhdheux45yapu2gbx6h424f9mks5vm117kr8h9p3o2tq90pjg3ekoe7w8k1pep6d9nv6q5ciqpcpkefbzzc96zwe892zakf5sqlbzc820ndqbr9eujhpl7nrw70quplsg408u1rma6xroh881t6by5cc32yba0ycd7u5vnhbdsrbdw16axclu2u1r7wzi273y9c2dspzxfwd3f9xezfuxotvaoae1n81tskrk358vd1ag434sh29vnmpylgsjac1w7uo7sww0bqem5p5bdhmtl504oq1cvs20owr6u5x2khnwooabsf3u6jn9hxxebntun4eitf4ehwpho5llnf4j6v8qmiev0oxgbrq3bdbtmuizclkt8ilpd3w4bvu7evlzx71sczu7v0awcwoepecnff7qkydqlftzubxqokm6abvadqgivock5izaoaeuckie4gpdmt1wwuokmxzlwyopt54mm9pg8m50rkc066if88xp6odyz6dwl0oidwak4tgelezwaoa2tkq58p0tsnv3helohvxbopjrg9624rn27yodet8npgaobmee3tgo2l3h3zj9lz7imiygmi8bker4ogfhh1wx76b36zgr101ves4n4e40e5l7w4gvuntho0or4r30wtwctndztrajla5onjr8r6sw6e8g4w49osdeeruv6jnekyc96ukc6436gv81pj3gtaf427qhua0tap1akslx39u66ox1nwmy9fl4zgrj5gk7q0l0su4abtmpidzszwe4kc7n2l4g7ei4nznzve08nj10ww8nigxxr5sns7bqwjupw169goeyz1q2n154tuj9axlwg80ywvwrpt1mvfd36oowjm5jarihykvpmchfobqllnn4yk83nctzp6d0elvr53svjcbczb0nefatfybjkz9xl54a3sxbu6ew7op2scqkxrh282ngc2wrcf46kwk94ai890z6aksk4kgc0d246r7ksih0gvm2ev4hm0f68n8z0bebsp7cglb88muatomlqr1t7cprd22dqvsvrphv3gy64w6wbm12qh54cxehnn3k039ouaadq9tz8uc7h6jiafypef1777dl9jquu6wi6qowvl0sxt48xncc0ezt18b8ex3b3xs55pkvwrhu7dq6ki0btdy23dfw4n998qy9811tucbcvg46rw23v45z4z1f1ztli3ebmnubojonc8xps9u1s031sqgnrylhkw2q6qp1wqx9j3dakcwtpb89qgvpsfb9t0e46pmch37do2ov7f1seumzm2r4apdl91fu5s8ty1aejhliix3tnmj91viuqrwm6s5pqwrk2yevhesnsxrgyqwptsh3oy1f4yxbxczqlk8u9extcls0cw4ei8uatal0dysroq9nt60oiohxybrl86f0m6uglndif7tez2n9w7p2vg553ou5luijqnft2zju5kxz14ll2036p7asnjj6a3l9950hvkpu3rk671iega6ngp82db74vuq7b5wk6g4lrzlc2wagy9ayscybpx363ijd11stq6ns6xdicltlv5izctqwonwiqc1du7f0wvz0zii8lpjaayxxz4m15i4ip367uxj952apvkcl2wuyj0',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                tenantCode: '5nph9yh2do678ntc3uz1rpz9q6dfrspl4pluof6a0vcd4jfdp6',
                systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                systemName: '14ov7iwmly1nomz0x1d8',
                channelHash: '3ul311rnl1is77bfy8ciqlk1g64zbt1xjblkcgxx',
                channelParty: 'jh4rvuyh53d64jknguyl27wy282889lvopbhubtuwgxv5l6z7yeb72upwobbunvx9t3y3lnpjutlp59zja0uzb6cq6p2xlqvc3rarc1efsgo6a54l93kdwtms1ru3yj2rk4i00rxwetro8ia68eoaukphlhxnicb',
                channelComponent: 'kmc4mjd8rkpgpsf05mz61fvxo9j9nlplu8iogyuyz19sk2bsocnva3phgyjvkeigv06zdoceamy1fr2f648he8ss6iehvhfwh8eom8xtev4jgvkghisezprlcxe7na6auqy6zz9mylt3gibq862q4c73u8af4rau',
                channelName: 'hcp8gq894nvnvtq0qby5ewlb4kwjujxik1eb5eywta7vtykioc2gw7c3c2jri57nhcwly4i305lsj2ufa7jevh76sk3p7y2ayuuqj36mtx7rv15pqxg60s57rix9srwk8k7ud9su70c3t9d9kw6cg1x2tpt9l41a',
                flowHash: 'ved1fglupmause7ews396dou08msq1058w5cudml',
                flowParty: 'p62h4bghpa2ua5na94vf3u6a3mbdc2cxekvfw5hgfhsyq9nzobmf4w6i58fobrfo3dxrqn5rudhp1ig4bhgh6mef93lteq6ly4eot0rzg4dcmq9bny8ua2chg6xfovqrxe9pdexeingwugucep3bgcqcoiicaawk',
                flowReceiverParty: 'zq6799j33fi8ax4792lt69r15z7yaekhzqb128h017lggakaxwkymah6jziek9jlzo672vh9ra60fk6wze15dw82xqfpigff3yblve7ut8xizye1ae9vyipd66an0bzpdmag1yaahyi1oiyukx8xbk4dv39f42bd',
                flowComponent: 'utkro9rc2tzti88rwk3sij9glskdjjbj9k7bj9669tk72qawfnfc8cck3fmuh00u9m87onjxhyqe6o0mudniz3rotrkbymuuxmwojy3lfle7khkdiwgdrozbdjdjklo7ityxm030dtfviobqo597oyb5aa04anea',
                flowReceiverComponent: 'ho1it6e5vawzo3b6mov9phi3fw6lkurb48hfup15fwv4amyp8rkql9nsn6zemqk9pddmh7683k25ihy1ih1vhwth2i1iqbbjzbvkk8g8h6p9gpxswl4n9uqgl0wb0nosd4uze5vxdtk3d1xgl25c2c91fvxikf1o',
                flowInterfaceName: '88difbnz6098lm5r3eykbxm1a3q9b66q7a8vtothxrf9gqkflgegpnc44ojkkmb9llqa9k10k9rqgmidorb5h6w6h54az7j0tlnrmjbxfze00s5hw19ercnqa1bnkbq6ma4ndl1wfzddbz78iol58aazesv12zu6',
                flowInterfaceNamespace: '5alu9ujxbs27ox1mtrlco8meudy7t5rb0um3oxvzikgiu9uv9el19kffbf60bimdihzalv36093v0oruz9fbg16b6urqaq2brw6lfypbeue1i9381fjeap8u4mqj9udgk2e53dyu5l925j4dt5u5yz4ug4nuypx5',
                version: '20lm2hj0tpdflfss6ifi',
                parameterGroup: 'h6c1hjokt8afty8g0y7i8f5sa6uc7u79492qe7e6fl396offjdwly07jki7il3rkkz8th8vnfpxg1sx2flml93yyky0svvhqsrwc1oiiyzp1tiukggdyxjsy9taipeh8hgf1o2j8ssqinrbf9qpml66pozr8qyo679a9n2qaeggdup9tj9ocg2ogo4lr2lu5iag62h4404abasvycw82b5tsnf9z75az91kielnway98b4pjdv29tzwrr5qblj2',
                name: 've79igkn8jgg1ud9k35t0kxkpwib331g3evo0vums41pdcyzz2081r97x20ql5hi2cavvczz3hb49r6sq1m52j9qpgqhlrxxkhatogwoae6evpc63w27q32r7on0oh5d4rpapx037h0wkacglk4ir6pv05okpypdcs7r21dcmgngr49u4yjsqcw2fvgj2a6vzwrh4kchvvxqetzyehyx81f9k1b4vtjopb0wkttxypzyl95f4p1opqychncnzwgq9639rifr7wjzjsn0s0svo4bj2f2x9pg3tpr3gvramg4uzu5h55h8klw984tp0ck1',
                parameterName: '7e407w2kfgyoau1wcdxcqp2ah487wdff5p25ecq1ibj0hpbwbomcz9z7at4c3ie8rqfvgzubfr3q9yxiaw52h7ifurydqvego9wp4578smvjs26j7ukwxtg1s8mau4bqguqloylo5vajfg497vr80esfwpplk0f2m6xfiiuxfaz2djwokc8hhnzjh93kfhlsu5knzbhliamr0jf8f548nsjopu8zdateb7y0cf64xh5l72kplls7949exjp6r5k2s2znienm6wnrm5bj1s14gwkih0xobk5axasl0i366kt00c9z0engf9ko737vsbp6',
                parameterValue: '0shhw33xgkgb53uptzl0xzjmzj9ystq0ahkmhp1aksqmunqaze8uxcm6sd3c8u4a8b7b7yxik3lpgh4rpj7hoio7guzzesk4v0fptd20fztbqhzf21vkb3o4rh06zky9832qnrfli1x4kunors77wqkvdlplal6qc4f3ja7cyceh65th01v8ersc8vc1tar252x98dwiv99q6p7w9mpdv2cv3lvzhw7yqz0vpsbc4rvho83lp6jbhxyf346cggt6jd61zyz1cedx1smd7i953ppqqtzhyib59zao6tgknyfzzlu21khh5584tl75j7zjv0jiw2pm9paz4fbdin7kyvpt1umeucaxv299xq7h65xzixbykdpt4q1wz4meaxxcifkie02rkvy6jsk2kit236oa5lhs562q2tv6ddlsguga0v1zi079uz0xgcsk3kq4u4jo9o1i03ns48k45v3bmgp5ino9mffyhm85vjzhlvh5fai39t8quxi16dmczdgzsgqpk7rqt4fpdiwbm23s0nzmn35hm9p2xwodc3b6h6hfjiow98lbiq6386d0nrs66f21ibmacs1ottyhwp9faves4nn4uktvd047i7asye0torqnvaej2dhur1tgb3ixy9p6xjer9xw6n42qi786m2zuac214u6yesmm083vp1tkuq0sfbjwzlpkdr3tsxd6i98a2ffwsxoshx7jzrga00wr4pwxhlugrb3anmn0sqz5s6l3fj85o34xsal6ahqz1a271zy8inlpk5n6pbw34igq9ab3ea0cq4gp0mz5vdks3x4tnu17aaz0bkgkdgh3xkh29ojdvq89mamhldxq0hvadb77341nuc144g0b4avzi469x41bo2l6fp7msn2vdps2idrzmlttpx4ktyyf0r4d4j0pvvn1u4suftsnwdc1oy4mo1apqxwfhf5kdhwpyqm5dp6uqt4euhshhqwljkh5vs9er9mce371bs7dikbaxhg13abzsfwdr8swxug97pf52c8hns0miv9u1fzbmoioxjt9bgfqfnvsin2wksjtfucclgb994uxqxhibfilpp6u1tz76tmfydddwe73qlixf4iinui8ifdcaydy4ym1s1wjdxdhvhmc7amqszod3n4nfuyzqeignriz9ab27l0cjsbdx91se0t4l791htulf50vjvb8m66cugna0nn2vcsv8i69xljlpvxrrpkbnuwe6luz3wfjqattmqqxpyrvcdtplww5fq38aynsadhpv1r5f0h6gxkgcvd139uwkcvzfyrt81tel7ktnfk14alvjldkhxbpk81ink648m16be9tzruug5w3o2p8551ona0j6t3vluzme595zd5nhzxhgtemju6o3cimvvh9q6uuziu1wzipuag3hbqh6w7w3pykj77vsq03fck65he9pu1l9i5rdoprsirsmq905uvuf591yghxxdzmb63nshvrg8lcvoh0xrudwlect63wr0bt4d729pvrgb8bhmgt2ng9x3ns6lnpa07vubsh0dt8cnw2xi40yplbq2k6kqlb9agt3nra00dqcuch30yh6gpkwsdvsmfgvlcnju8o4ax27rq6dk1y7vlbwfsr4z9rnnxj5t4g5xe8jky2vlox1wa19xtir3zztn751gbw1c6lzjyry6kwwcc85w6xe75kqse3f3tr0he6qh0nzpqjck2veha0tcffyru9pfybkeorzax7gat3hy47pbf6u73x6jecbaqepa1rtrhh9cmbes7zb3v396d0cqofxjrfxenbagu7eu3l7jf043kbjwbx90esr3bb5lmjibc51dd9y02dfwh2ksd193qvbcapb2pfeewd7g0yr1dndefsojql53rk1ttu8jqjvo10m7lvdrunudrhz641y8nqxtniudi3sctzfw7ajswsi2o8k3n1decgf5uoksogg7jg44dr10zwtflsioapcn05snoh2ju8cs2p39kf82aqo7695mdev97xc507bcsyuzwzllglhnpx',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd60cc016-82e7-43a7-955d-2c1cba1027e7'));
    });

    test(`/REST:DELETE cci/module/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/module/1a96fdf7-508e-4e68-bb47-0e234c8cafc9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/module/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/module/d60cc016-82e7-43a7-955d-2c1cba1027e7')
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
                        id: '8acd1a96-7eff-41d6-ba6c-9a2f50b1bc90',
                        tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                        tenantCode: 'c4tvfxysbd582m7mufipi853olkxhyoj0h22cmnrd612qczmth',
                        systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                        systemName: 'ii6312god90kcp0nusme',
                        channelHash: 'lp2lsmc820qu9ft5zpba6qknqa7j4kymbp9bvheo',
                        channelParty: 'g94sxvvd3pm8mrwkwyl9rgk5huhssze979ssq00ig51nbatnyvhghxhjxxjmrk1ithfjyex0b12nb6ye9cvgcn8a1mdm8w296hdgz3pqdv0jllm5r54zae98pi2wpm2ymnyh3x8y9sacbayic7yvjklz4iqxhm8f',
                        channelComponent: 'elmbq966qcj0u86v9rufb0nurziwn8ximehetauooqnibeyv2r4fvo0e26gvnslfy2m2fn7ruqlik6pq4w50xq3ibxesl5b54syl038a7kpg1eayn6fng486jxsg73abhk09fqpc7lsu1av1igtyibi2w1gcfagd',
                        channelName: '707vj8n4a0xqoxtqc0ktd6f24rsx38is544euulyerve0txcenkky4qmlv044fy4bpf1p9t7xki4k74y5mmmran0mi3hbo0b4ft54538myj471l27dxqlj8qw8eabup2pfjnn5ejyx2mwvkc0jku0b8in2msnjze',
                        flowHash: 'xrqhx81cspu9iwrguuh2lvy7yejpguei5e2rwhw8',
                        flowParty: '0vejtp0bs3tbxfxq6g6iyn3o3pxc0a1jcbhyt62h3gm3jf5xxmaqxjloyw5vtr70q4ph5niyxu8s181tmcv7umbbrkhk00nqdieeq8t5j0p6sqci0ky7621akog3d5o11ax63d79845puvkgnh7p7khxmtlrimti',
                        flowReceiverParty: 'hqcl2mzv83p2xgcibt49jbydhfevu82lx2xi73hd9i6lsi2g9z2zhnc5n8etk23yrv7np9cjuvzjrpg7e6mkpfe3xqkel80e3bc2bxit0qawvux5zbxjsaqnbhc8gwj2q8r2pzq1lepe8xec1b5tvxlven32f7vj',
                        flowComponent: 'wechsqelcge01y3hw9cg7wdb122mawkt6z5tyqlriw6kkthq75i64rfvnr1o5nm595fd3y2pf1rd3y9f9wbo9xp79jnldbzso1t5xj1sb5x6qiozj1786yyqoxbq3tg3ag9g90uhee68c7y1h543429zgo02nty5',
                        flowReceiverComponent: 'nlj6ig71e11102z0o6z5b6a5m80d1ir9wja8ehm9aovgh8z93vslsv3jr06gl340vqmapzkyd4fo1fsw56ezfcb6ex6lal8coa6tm5f6ryo6jpivyoev03zvw79ukdvumvqkb0lalw060n3ui755fewcsotgejz3',
                        flowInterfaceName: 'gof21jkvdf32mt77jhqt6tpp115rdiuj3mwm3wwmkslkn10sq0w0qmpg14lldniqgszhacf8h38vw9rcm7a16eekqswyto5z0c9kcurbd4cuiv7o8nubrth1necjuoobh0byncvarepat8trrgvdjlyhv29yrrt7',
                        flowInterfaceNamespace: 'sll1luolrlda0qgzecr9468bgug1iupp1bn79ye3vcp0y67qtvqw9ktun9acfky89n205agtll5sk2b9ng1m7ckcpfnwfnsqfqr1cr11jrmr3hj4jkwj98g591ut0sndd98liz6ukqqq8sdsjknx4ks6njwvrwiy',
                        version: '6w4bis1blyh9fvki3nbb',
                        parameterGroup: '0zr0r1d8u4hattbiry4v1gfmxaktwzij84khad5bhqumzniji1xwxe0vdoj1oo0b61ynrgsxx08gdze385jmkio5dfbskom67m4l7aest85jwvidzuzdo3jjtti4d46270ifi1y89b5yxki5pvinlc9g1pjp7nimz3u7isht5gh5beck8jyf2a9if4r6u1v18a604v7sd1wdzl85p7vglskqcl8l9fukixg7gg97hkkz3rmb3mq910jwwyf8oqt',
                        name: '4kcm9llfstifbgwbs9kqhudr4hicsuo17jcvup0p3707zh0izulwwwlbdtrjbgkg3btanfzglwlm112nhrjx9035qmcd10v33saamvans6grcbslcgtx74k2koqzksnj360wvxkh7jenaitkcxiyawtb77qq29hvjxk92da5fpiqpv7co92vjmwzntntrv3m14r3wj1iwwo7lsogg9a252ha5sv567jw6x0kw2yrqejkrbmha01b8jg378qrxi5q2ex1cnnhl9fcsafx2b90jjlky6mngy2mmugl6zj1k9epl5fut5x3o0eamx3lf6lw',
                        parameterName: 'av1uoe77qhm2x6sgvktuwghokzeh61lch4nrcu0t4e65gcs3l9ulugi3gztp3tmm3lfpgbi0d38zaape7qjdkmpofynzhc89ag4x7okh0l15ey5kr8oa0ccoqiv5hbu4vgk6tf5qh5898h7h7rs7fqywp198c88446fasnx7003p389yh83ppqyipz1w5bf2ku9jb214srs0y437fntcwb0gw2i81rrs50cx99v2kw1ndqm23p5wkyfsgcxhfngmxq1advb20zrht8vqlwdf62tjkez3h9s8dtg89ld1073o6g4l1eosyjyinthpzgz1',
                        parameterValue: 'oc6s4tcgvvyqlbb96djepctyxocn6vnda41tphozjkytt1axf27uwamb7cl3wwffngtgdvfgiajo1ynpnber9gjfza5spe30wn036mnurccqk6v7jkecvmaox9i3yr0lcc8d7z0dsh02li67hsrp16y8dxybfena5oukwi7u1qwt2kec1633h63jo3zsj3nv2xvstpgvs4k89hy87fsmaen8j0f7yjr3snx1meyeeg9pwljc8spf9uhe8v77yo6olhd5wlhf3bzic429amc9l4zlqua4ul21205jsyvvddl9go1zzrl90r1fch8c3mfd0zqm6ek0tbfu649c1j78yxf8y33oiq08cqyzfbx6nb07wowqsxrrf3c80f7hi44ajivavbh6wcz568ptsfm422bbvo9odwgvdu0uiej2q9ljxot9a77p2vvwo2murpzbjcc5ghzocimlp77v1f1ptr142vkkbplj9a2p27szpgcz3hu52pbdnmgfsljlwd1r49kjz6654uqz25c1h9t3idefq4ta0rcsiwcgmhxt9q9crvhv06xgtvhouhg0lo7tkhduengeyqcl5rg63ymbyqyqdbc1kpmdhanzemqgu4bkweqxlqzaukktpll2a4m29tae9wc7cm29j3drjd8dwprmbwmwm4vcso58rhtebonfsf2srhynk38m4eg5ves3ybgv9mgbkz1bahvmzxwzz8nn0r86lpdipakvzjcve461ga5cekf55uu00lvapf5ugk2f1io0gloegtrowcwm21s6h09xbt31j2is1ccgin6k250cj7evicdvm1adj8sw4sau1llxcrt8jr2v386mpw3n5x1d3za4n7lq9lmfiugtgfql7wpr6k3gcklq8zv2mhknrbw4hu8jlf0l65v6jxnq2vv58l5mv9rz89y0k3lcm3sxfi352s9xy23p9xxrkeiwcpzr8zt6jzq7jdp8004z9y2ltjlrty8sv9wou6jm8ax9ntv3v7e2qt2yv2w4njrv1c0c2d44xy4tpxmi8bcfi9lqs36hjq5dck0xbgnil5jh61ot0x8mx7sjnl2vwnhbl3slo43gct0g5szz8mj0871l15l2av0gnnete5z4xez6w7omy7dyr1t4nqm4j8zblzgu1yjvsbxo6po62onb3m294hhc5ge4two5xua4qg8ookwxp3rn8c9xvkuz3qptx0l2m0ogr1093eqlshrr81sklby4f82t7l3msewtddoigrkd2acvg0xeddppm6w27fw6qqojoe029etcvaomf8qk3uytko2qxyjq3hhwj2nryvp08zbz01om4o7jep9cqgdhyp09hm4vfwtetokfgb1th1q9687gcyggxwh3zakqgh7d7n3dt26otcbw9bl3awiees8dazjjn7vk267do2x4qttkstb6564jm14hb5fxfr30vywled6yhwxahb3f6onxnsje8srrh28vpj9vawvwvgitfh1jz7oj8c65ayyf06d32vjpw9xck3hydf7es0ohlz4nj355oz1yr0sgzfhi0sluc8ejp2xnx3p605nwlymxc66xog0uvkbs9j9xupflw8cdu4b0l461hdbtorjemuig8q517f519rqqn22i6846jg7e0loeys7a7q7otdfil8fy052g7sycbnfw6odxid4o5kp9h8aqne5xwoyry350a60wqd0zki9ge4fe8ijm91hixipzazuphdr0bi1s0vafd8g9cvlh3eg33oyx28wunb524ftm4xvyce33ev5etml1mzueek8a553noeg82gban8dm2bmmxw0e1vgvsb91rhlj6ymr9tr6aaypjrdf98400bm4wbkwqwojwdlux26ws0x1k076y4lgzk2dapi4zd8oms0g4t2w1fzo2qykfa9fjutflerr221wavnvejc4yp7d91582vpk8d4i18mc3zxb8irv3e3k2psmb9ay4fipukp6zwqjt6pysrz23iaqbydy0ln7aoegdrxnihux4gl8pjh1r45o',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateModule).toHaveProperty('id', '8acd1a96-7eff-41d6-ba6c-9a2f50b1bc90');
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
                            id: 'f1ed630f-4753-405e-8bda-9a15df55895c'
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
                            id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModule.id).toStrictEqual('d60cc016-82e7-43a7-955d-2c1cba1027e7');
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
                    id: '18a28e46-b940-4204-a7e4-425872f7d4ec'
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
                    id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModuleById.id).toStrictEqual('d60cc016-82e7-43a7-955d-2c1cba1027e7');
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
                        
                        id: '77db4763-b726-4805-893f-59b0db51ac1b',
                        tenantId: '63079c93-9ef7-4ac7-b800-6df893ed87fa',
                        tenantCode: 'wz905pteityz7im1f2mdafojjuo6uo5fzjc04ypw6nu61k2g86',
                        systemId: 'ffdd2fad-111a-4f2c-ae80-32ce9cbd8298',
                        systemName: 'zl2b0xo0lt2frzrzusce',
                        channelHash: 'siync1v64676uu8m4zaqkbw89dt4asi9k5e3xjoi',
                        channelParty: '3kdx2lserhtta0bg08k6ueul3ymcur7hnzqdihjqi1y78bmip924yazjh2wlvescopezjyppq1kek3yrw7u0n1qjsub9r4qh4ymvlrxzd5cyyczcbuun8etx97gkj7c3ski8hympggfus83fezg4fxkflb26d7px',
                        channelComponent: 'uw5n8g6po68ipv3iquymxqt224e1fhzx2sepyr5muwmqxpwuvzapd933dw94fl58dlut2mc2rgulh1rr790u7ot351fa8svueaqp855qptrncfngsfj4tycpl8m28y6efxp92ndn73dzvey6yo1yz79gw88jnelf',
                        channelName: '1ln32oi3dnp31y0as2dudtovmv98h28ixp3k7kw0t5bbzyrfxxj589eee3clz08np4gvnr06z6cjjalnyvzxz1wzb1surcvkcrr6v06q8f6stwv1j76uohjn511b015q2ofynvenvofrkragc7dt99rb2s6fxy7x',
                        flowHash: 'e9nnmba2woqc77sldpg3su014nf4v0kza9q33sso',
                        flowParty: 'phm9vuwudyjbtaknk4zgf7vx5t9d56frm4sop40b6x8givtv8ex2zxpipblc81pm1z00arck2pjhgatg8ijqtsfl80ld8kr0pinj18mwuan6zdecssojc1nxmcacrvctpx4zr6q3ftf6swaqg45esattfgfj2l9f',
                        flowReceiverParty: 'oja5ztq6nkd6lo3a0cyxnjpx42d5j9hyqodxyhkv3tyw4h6vivkf7d7td8ifc0ibaidn0jdvot9yws2vvfks5s6zuh13kxh2xi25dkx3v9zno7b1jbc1b699vce9uc3pcf8wjf8yqm5i9yurxb3re3mtm6c203b3',
                        flowComponent: '2utx2lgvo47onb5kg9dts20b6ji61ztei8x1s2e71hh2xeru996wba9814bmgz7itxwtszn3r3yco891hpadzviuohzveh7be0kmljkfc6wt9d36u2fjq46atu19ioxx1u6muxzzt1p4x4azv2ani4cnuu8zpvd1',
                        flowReceiverComponent: 'yryvvpzpi7kg8hiuk69v3fdjagtblilwtnuif5mhdylu1n4w8r8ggq58yuvvz94ppg3u8z4x0g1wx1fkax96q2zkz49sbmx4k54xloetvh3sztzf8peqcrurt07ld304vdpyl4bu6t6u1oecpyeo4nr97adfsw4o',
                        flowInterfaceName: 'axf4fcrnkehtshpusev090il8z6mfqogxa3j3obrq7k8xnw8pr0nlgkay8r20zq8t9wj2vtvtpnejpyn538wndreoswk2vhj1mp9eitn2o6oz1jo33xipdahbg94bxktnnp85fbf3pvwtnyp90eu6mkwdqlhnxfg',
                        flowInterfaceNamespace: 'aoxrlmswbcelnbkc9rvpbxupgquy4oe33rm4awnrl1f1ztkome5utc25q1immg91grtn5ub07xaocp1k32hi8f9js52ap3cxdos8952mlpifpdg4zovi1mkuf5c4hzdrowj3rwonnli4vjonhitljln7isjxw2oc',
                        version: 'tp63u54y57q1ht1y81lm',
                        parameterGroup: 'i6lyppr8uh6pbvlkwl5ro14wyaualyx39a81zc7oum72roibzdes0oxln23rub9sser48kdusbj6q5cglunwjob5hetai2chdt3g6skpbqr0vtiv730porycbrozt3mptpcm7sc9nasl4c4mbsp489vtaalyocnxxh47ai7wi9b5omkjb06x5vmr7ly2ll9ekyy5k68xd1gvybkbfhtjk580u88ye0xx8cb5rlunwibbnt3ffrjwlka8rne3lh7',
                        name: '6r09etunwz9sbx7tyrlz23i2oma7cu3v73x7ejt7kwg25f9sn6pz13b9ldvkm2wo2j7bud1pcf8ahcv09nah95q4b3n52btl63wpa9n88t7d9m2kx5tvq13rqq5g9ps89xd6hzvb0fa9sgjsq5cqqu3d7uzed087fzp4v2gvau7q368i4k5cu4vg6xpzlpdx5uk4z1qbiq6a77ppy1anxrbu9rlr9iaocdlo0k1dzo6q43y3alek9ld1wbebftfek3j4u38q3i2i4e5kk4szqvqqttugwgrzhth0o13rc64zyuzrwnixn8xfi4rxmfqi',
                        parameterName: 'k17bo3oxav9r21wwpbfhe34z4oq6j4c6p5xrno9zmxqdhdjj83ki3dl3b85h452nvgb97kiwt5wl0qt43kk5onyqgq95h9jbx14jadgue34o9qjfh7cfwdzyaqp57as2dnsugjv6yo0ur1t5sunspdtbdvmot6k1d2lu8rifxw9qbdz25kbafdp39q28i6s6md09f119nobl32rlps5b1k9fzxwofifvot6stjlh6uccwsfb4g8dnk45272tuh7rusjtynqpn2mti3kdualcq56s17n87repacf95sb4esmfoh7j1d9x29fmv1hx1ugv',
                        parameterValue: 'jig4od57xlwaf5gltonurvqam1g3n8oa4iz5g6ok3khoqlws55x22oe4jkg37wwngjf4ofhf3lfcvkvfe3n5tmaf46k0g2pszok2rnxd1cz3uzjdfl05iwkepnri8cl2khh6pna9si20q7m031ra82o854yt4hxa78w0v2f9xsylyrkytnxeeqz70be7gb4z2cfw892otmobulcqozkbj9zoj3bd4xblpztjmhbkbels4dkgvbd8znsxfav8krm1qx587wxtm2ossp34hqnmoufmp6pa54ank3ok907vhd0c1ter11lkwlxxk87pcr0ugfiuuuq2r0cwlkelebdt9a95zsey2lc9lnsq8ox1w2z0yfqj61q8igs9fxfgop6ibkzjpmwho2euhtje21etap1ddyzowjkv90sk2usdjsh6g12hjf2ppch3r9rgcqa4pex0vncwylt2bq3k481kssy9suu8s4sv4vrvw4t9x0i676qiy2db47vjdlkw7smqqolkqshce35a1gxiygz7dgzikf9iwjuia6cqzm9lmza2ufvcpsmm7ymsrtp5xe7huew43pff2wyqya6recproc41g52ec3mmd63ftz2mq9um3jcgb1nkxpasm099fdumc3cyuggjkp44l07pztfv65k7274e3xmshqzj0jmk3byxsl1rb0s5979d36pjhdj8cyadl9wnmzasyulveubcjphtmqhy0y5csa5s3rs1fmn689i60vtkxd6hk4ionxum6cgqw6zppvg66jwh8mn93ahb9zfbjwx12yoy8mbmhm4nhfh2yq28qai1zx2vxyijk9vq9tt16x6bc7lqnbux7gvpmwwk2emm4aq1ppmeztad0gi0j02oojw6xelgl0udkjgg4226dc34ah6h3y4hn7ish5ypu81ytxujgasklg6nk74plzy3jw7q7sknw0gdbg51b2bm54q1yoi4mrzju54qp0mag6skp4j0cizsi7syzqbai0bowthmzimivkro51qfogdyje74d0votdplvfwq59v1sqdlfjxu6z8zoo9ayt7jrg5y17q6trntjqi0my3phco27gpvke43dwtnrxzuh727c0oirxk08svj21sxaxmozzwj4lmnj02a8o4xnr8kgmalj2h0wj4b7mvg9lqrofq09bwekacrfgz6e3fc8frde39j7zczwrfkm2neaxevnkpgvvkwinl28h6jrdxfujpm6ry3b4baobdu2dkbolw9d0kv6qe3s9mxi14c14fvnl0w9htohysv4klai3tdvsze9ubaydyzh4w8oi33pa4tpf8xq7gqcurmtdun9okmrhmyfbx9nvtznrlur5b9ek9qkz794y3mylvk1mav6gtryp69py6hg516s1gqy0ed6qk9vgde3q1zk9oh4y9z7z9r63sil3b1xnh00pfban9475fi3dvc1crbtw82r28unpjizrdcr0bjg73hd3m85b0a35hok4dell0c3n72hjbjni92fy9lhynqvakfbu0r97d69c8xrqvnk2nbxmq3da8n6fjjce34xajga8bfkgd1jo2verfk62vfhslsicyu5mupwmj15zn62izjxzk8pu9on75j39ebofb1qb9qu9wkfchml540yuhng7j52p0bztewfvni3anmqat8nbzpapowuar514fr5g9jspkowgo6kyus1tnehejsrk3dc2jhgh5utx1t6hqrg99tnm83lvyhl3lu7hi9m3xyniwmsvk2jz536w2xzranguxkeodoqm4bo60wj3b3gwnpdlt7bkiuc2fl3asnln7ltx9g6x901xf8bq7y7jumkflwh8o1g4b3s193kahaqvcvpp72dvw0xktryh9uksjx0amfc0fre5ngbti7wav0rtqsfyhgq1mo7qhm8qd89veie7edkzkjyqocz4pwxahpduzn6szic0jr78ied0ptdj0zsqwi579x9due2lzi4nezrs2not3dhlhjui5w88cuy7vhp3i348v7byuemmgxreax',
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
                        
                        id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7',
                        tenantId: '5f66fd07-378a-4a02-8650-835c391a4693',
                        tenantCode: '891g6mzhzgmpics00gfb73kup87y8qsuc90a7j8xj2vgehyssf',
                        systemId: '435e8ff9-ad22-4c8e-b8f1-4b4d586014fa',
                        systemName: 'nudnrgcpvxcoceora5d7',
                        channelHash: 'goechzf2wka54gk5intddn6x96lai5jp1elua6zw',
                        channelParty: '2od6c9sopz40iqosyypy1zg1ipkwnihavh9u45lef9x82z72z8b13rhffeswyjk8a4c2q97y94inbgj97xxow13xotw20pwnryno8su9awl6ke2q0gwn599ejiy9zkpc2omdbylbohxqz3yl2quq1gdzd2xqs9bi',
                        channelComponent: 'fz0rk3vwcyraeqh7t1i4h4fzgb34zvw1irb3k3dmg694htqzpn8d65j4gypwjqq59317rnyng5zk0ommd6mp7rac4t7mk4gig59tggdjtu78ja6hmteycqoh3dr75fk0bwrbrpentgbny85swpbq1usvmrfxy529',
                        channelName: 'md362ytfl1pdv076y7flgp2eysgb3jjla9518c910g66zvsrqiohj813jqnnd9h8tqfsskv601pd5bdix857n7vhkkvdrx4kdba47ho18tg6zmat9qga71x1j88teai7i7h25r6mcn7odq0yrhh6rvuv6u9erv8x',
                        flowHash: 'sc4iin9bp6ertr0ovqtdgcpmg6yp6qb6t9fsc95c',
                        flowParty: 'x4orbqhztdv8m5twacdc7pumemxd27i9kdy9q1m7x5wuawommlsk6sdgvg2i2v5oxjqev97mlp7irx8moexll5fsx1rqogcklk6stuwxu2uvkpfo5y2rzjujzuotfw7fqsde79vzz7a8hmrqti3x6yuv6vscwk02',
                        flowReceiverParty: 't4ug0apdxcxet26qhw7nk4wfo1anr7wc1vf83bwnba8hz433kewznxx1nwlpa9nhux32i3hvwlsucx48deva8mkc34zc57zjoi0riu6rgr5fl773arm4hupcxtcq03qloz9zjivdvejhvd3jag8z5t1lch7gf3u7',
                        flowComponent: 'qrwvvjwfedk84d91vbyzttgnv9t2lp21iwo6txdj0vavk2xgrzkgxh585w0k4iqisev3899hqp9ffx5cqarivl60bjmvfv1bs6tb80oa6z5znznwpps8h41xn1uny00thojw5y7vg81i4t9tkhpp5scpg5houpcf',
                        flowReceiverComponent: 'xcav9icv28fpot1ke10ynhegfbmvmu43jbyg7s9v2uvksz4hdexef8ajhzp45j13yq4i9jupv82403imcmcn1txpgqsgxqf4oq6uyr8uv9c2qc12zwt0pbx81un1g8y1pqjlvvu1xu83esxbo3myhfr5faj07ts4',
                        flowInterfaceName: 'niy1lfo4bswlgwiy521puvd7kjyfhkepfjyxcby5m1k8lfhggcrsyw5bdrkddbv7jfd2clla3k1axmgdm7ryrc696bbqmcoelzbk4verjp6kx112li2lhbwr0e8vvcoi3k8jcxzuzmrh8p8kiw0z324oujnizyjl',
                        flowInterfaceNamespace: 'a456yvqsg2b7tk0jcliavtbeq6bawxvukaeeqzsf6do2v1z8xtez14zac33luuhopfvcwgrez4p5mzyo0d022jd2r8lvtvqymoousokrkq6zsry4lxuu0w307ozuacplj2939lw8n8ebmvbboezfkyavcjrp7npu',
                        version: 'imubfk4kae5inp8fy8x8',
                        parameterGroup: 'w8wvczimgqzzqt479kokuurzon86u1plh2y5apdqb5jxsvqwcdkjhomvgtr093erccpz1k0j8uknzo5et947cj7ip31zn02k9ij24gx88uvwgk8k333oypu3ltks7i98bh3grghdhwcgrz5ravh0cgyoxty8a88qm73w3d869ago9attqflnjis3yfjpgouz0z9qigwxf53oo3xpo25h6q5bm2yu3em4kehr6aip3gruz9728kxanxt9umuprmu',
                        name: 'vbjlc8xlkycar302xhxs45idd1c3gta10o6fkg63nckedqjefovx6ug8gh3izw2xl5798ictew6ahehnsarleu34y18ocrk0xf4lzb4xe25gcngtcletlvgtvmay1mj4232gpxxmfgu3qn3xm2o54whqc40vxnslubufpoxh462lvpr47fuy7ldpgszavl4inb5r3u6g0u0fsiyh8z6wylkw675z4q8vmwvyv976tbcd0mdba3ily4epvbrcxjkalibzz634ub9fcgnfhnh1zsfvif0bsao4p3w555wo1a2ubscqijao8dzw8nc8qafu',
                        parameterName: '2ovbzrz0sr0nj2esm2fa3991ro1wu7i9c5vikx5ujf6btkjozaeo9pzo2iyfiwz208bofh7f4ru05buna87p6pixlf5ewiqpb1gkob4bwcmlgfmje1zrt3q96hsx3463bc36u2w8bigxffcijmvy6e6rvef5hiv1jdbv6h93ovrgw9zrcaqjkw7r0npm3qc8lodujrsi8tkozsz1cyzt9j6d6uqibnwkxgqf80ukchf7b7p2xe769f017tj7i8gdohbz4k7u3n1genyta8nfr7w30s343icymepjobommqgx7zwvbrmsot61dqsw0obq',
                        parameterValue: 'v18tmimkc4ihd20l87vndxq54pwequf8gsa4rhujvasxujzccuases9oku7mq4wlo6eguop9hfqzx14dzbizjgr9m52wbgd31vuj0gk4halz0ixpyhz0p10dpkx1yoxh7fs8507u8dfgushksdsjhwhxdjzovgktvyy7xc51gthbw06m41h6qcgs4xf3o7l10yv4982sql7b67hpqssu0da0tt3znk3htn4y5h2e5udpmpszyanv70ol9k1ru72slxwvq6xm40qtcljdx5osmwkknkcqn9npkz5d7aqzkgs2ge239m64m03q8tq2c5fh43xwtbi0z62ocxdqlxwfsph5tenp1v2pv8c2wvfhz9anacfvs9f38tv50kav2eq9o3kr5q72cprw2nekwaouaf0en7j3c285puuwu5kmz3ncqjd1r731qgm0aztnyx6wdi0bd3vdzau5fxvao24es223h8ip1clfohrp66er6fsdac5ojy1ten7omd2uvh4jzc3aadzttw5ap0r3xgf0lj5hggpicen7u5eca12oe2znm5wy7j2kqne8ciztvyreh4o9esso5exdn0mjbgddacjrzciqzan7rzn99qdoc68d8nqi6hinubd83qbfp58nuirjqkapbox8mx4f0k08kj1plungo77bbf2q3n47qhwlwk6xvie17q0ak8ndub5ejonuchq0h3pba5xrnfk109uqxi44xw0j159ediyzjhs6o706fpk92l3gmvs7x3bo5g08qf2ayc5nqmezllno5j6vn2p08dwxckfoi01505utz3b8mk3hcib72ivnemqnqcru5o63sj5th4eo6rzlg6uygr7yeuzhsoi9dw5apvyt4i6rvfuvg26yoi2o920txouhps7f7uocjf5xbxbij8mpzk0d7v1gpi2wez5m6bs56gkpp1bp5w39689nylvtb39tfvcv7kd0f3fhnv2uk0bfzax37c89mk5whj2l8jaji1alxug1cu8qv47wy94cykll9a98ngkh52lzljh32go9bz4mchnms0de8huqccs8o84eqc2rugaluiejo10zzmlqjdysth68njdibaxz3dvrc4qa4z0ae56ktlo2z9s182dpev474zil0ntc0sdo3vlxtqwbmerxmcxp3ayuxv9we2jz5pi6yafgy8y7wn0uxuecpommdo2purlieov0xx3x3z2cqhv5vkrom1di2i7bi9e35fgp5ltmxl8wbpble6fniwqq9s8uxk25sisior6peklvpseytthei6bcw5gxg62e4i2zdkarjyw7lni1dca5ynundh4khtzszg19lps6b9slexbe4ia8tozkep9lsejzm8iogive8fwirt02yw64iuu7femilf4w7y8bunrq9tu21gx1mrglxszrty8axadvpy2zc1204ga4fnhmw8ceg4gvygv2qn5lepi5012hcowus1oxgqyi5xxxky09gq0l3ky1ajrbqbpu3i1xxpkxgp98b1zlfxlvqme80dbdxkty80sp60l1biglj17ehmdq3hdiibdwiu85eje2gp0bd7bjsisuu83zkhr44umr0o47xw46qftwm1w267r8nhc91cqo93fl4nqns9bnobhau1fvx2c6udefteygp9hxu5vsaqquqlshu87avc041vdvhqh51pmbrt4kd1z23hd0t5h65066gp2tjfmavn6qxuam22e0ethzvnyx4qx9bjzppj5p6fpq1h7jbmfyccnzfu31b5t3k04c0mefhggms9us5a09cac6sdlgpbegu2tq7iwn3azbpt4yf90ty5zo1ot94aicztciwvagiogrn28sbjh5md64yc3gk37zhgln4c82bqivdm1bwf02truh2cw7aaret9x8ddefl860slxdlg1zreplydbng4qmmhj83wfwej1u9f59195m1gdel4r4rkpj6skv1e984r6yj8imvei0d4szt7ddjhs7w5gm7st7cwsdk64ibo0bo4xt6rog4tl3775n2o5p',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateModule.id).toStrictEqual('d60cc016-82e7-43a7-955d-2c1cba1027e7');
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
                    id: '9a5cc613-db65-4985-b522-1a0e0c805c69'
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
                    id: 'd60cc016-82e7-43a7-955d-2c1cba1027e7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteModuleById.id).toStrictEqual('d60cc016-82e7-43a7-955d-2c1cba1027e7');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});