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
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'ibd0e4qiwlwv24d57ibzgxrdzdrf4wniu73mrig8d991ox86lp',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'hfjhiu06p2r2bnecwefk',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'jasmlmztf2u4qwm5x1t7dfxhb2rrjqaeas8t1pfh6oh8j343dof292mnw150h6g3emby05lgfozya4m07moyvji0pkbwx33rdjp6cv83c6wr9nnpgrwa8fx8amef3i7ygsb1jezw0tl938retcins2rhd1o9dhxv',
                channelComponent: 'uiubtsxlpp4s7ezc9v7legf830ftd8ytzk539lfufgyxdf022296v9u8cwxralo0pr5h8f75p2ddbdcr2m4019nw64m7iosupw2kmadbutnlxgdv9j2wztq5t9xrea7s03vwwzmibl2tdktuj1xsm0rlv5t6zgti',
                channelName: 't5en2gocadatjinop81xfxb5bkq0hdkelrocksvyxd38ytd2jn9kff0yl7x328vt6gg2qf59naeelvzy6le71avlhhdq8yr35blnu4inovl039cqi06a0stddpd7b2ljyrh1pz4jjw2yy2x3uto14gqew0vrwqaz',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'rmd8a7e976neo7lo4lsi9udh6klizgh4u5dv7ib2jqao7wjcitgxxxckj8grfuvof62363zqhn5n8nkml1d649cbwcucxj3my1vpxlfy1xs0ncbpu07gn20oocg490subzd5nlmzahz69a0ibid0sabbaa5su2pn',
                flowComponent: 'rldmwh0gg9v06ui63mluv1gfrzms2tsjqghw4ghcau9zilz0wvqlfy5so70fn8k9rzz02baum9qj0dl994evcgrjibhsxg4t9crs6qodhnavfxndp9g0ybyhwamnm4ib163pio18595l7x91ohjkzqt51eij0l7c',
                flowInterfaceName: '8f15rslh3dx1ooj5kewfc1wlksis6gomepw3lnflszuovrglku5woadvb6zugf6p00r5gkg1dsdbuufon2t1na83yesz8y0pp6q2p2afnthb4qup6pimzvj8w55lrha7fbmg4xoxbacogm43h7gh94144w7bx27f',
                flowInterfaceNamespace: '6tq7hg2tonf0imbtw63otfyzi95hxlt0kqhefdnyxz6j1hc9znn24a4u1q3ln9qqc4nzzjvntqwrmqggxci2dlehq6gqr9p0wrsvz79vv71s8d908t1nbbcisgzvmrbt3mu6pcmi0ghbqoztgpnq2ziquzfkjwy0',
                version: 'stmvv6brb3vb2g8lf54y',
                parameterGroup: 'vh8znkp04t0nqdq1hraqwgv6h1ui2alu1a9qzeysizulq0rsnzbm4ybgjrjo6zmqgq5htsitfkgcoev7l7b61eo209dg64ze9ceas4nes3lrjztb5k5338k7xgkz88gxnuf4xcg2tqw0ml40uc2zmizfdkt0c955a02zk5wvi3wzmptg7uxngczgar4qtfvv13rompfybk8e1i5uuhwucsy6myes6mgzay2p1v3g3507hznqshjxwgdhgrbiorm',
                name: 'dpdhpgaa9k2pcohdsnuzndbum513tn5bfxqld5gdvu7919oxaqfp22pzipqu7p475ajbt6x43erz2s9utd9u8l2gqu93h25qypz1uids0jin6vr2wjn4xah09i3p12zx31wk1ggtjzl0avgvkzsdpuihfbc446gk3t3q83qsk32jszwocnh03oudqoeci93of7g191wlqcq0gc7e4q1ihzn9auezb6cuzili1fvejjmwm5ji0z6al3nc4fnyc2r2v25ktcqycv5hwi8r9i9aa44emn9ju8sj13ynxyd4ztb2szee8ervsj6kq059stlr',
                parameterName: 'qcid6u1yr2f8f7a0ssasccqwamusy779dngq2m10gaskcp8a4ybsz8f7tpo33shbf3lzm5io87veljuzdsumvltia0056a9n2w6cwax8k3jba1cc0wx6dd07ng0b4krcxpkzlugw3g7wf5gv3j99c0n5nlaqjxwunq150yzbexbal69iqltf6b1crdd6fcutzmbhw7efl2yh1mrmwr6nwc111qrd3t7zq13j48v5spbqhcsqx8x22i9uu5yejymw3r3r4aioj8o0ir9jq3089j7lo90vhknzy6n81gs1batv2iifs6gs7cw1fjbnwb8a',
                parameterValue: '8gm05gjqsofvyphnbdew9s6cy9gd2lsc2m1kvpf9yg0q6outh7oz4etyela18u7q9stgk646gw7e3b54q98wzmspelks73gxr15j4fcaairegsyzfte1jk03vm5mbh126ys8wbvieke0pbsl584clhs3qcybgugklou8sm1xsjl4xi2fzuiqb15tzmw2y5nh8erayac1141ukxq9h7jrntfssj7v69p9vxruwhsbvd1cn2gge134y1vg8l7z2vtv30r84x0hnn4rr6arxmovb47sfo8w1gn281ggnhyid4wx2o4l9l47y27av7aotqcgj5upp4vdebhw84stf1yqhq4v53h34gsoenp4a353i0aa8bddf9n62pnar7agm0bobm43a3u1ldzbx3khyf4j4yr1jtyulsnjxqryd0i1u588fcia1xybl1wv3a35s0ef2ockb0utdfgel5p6cbw8xq1iyo0i43hyg5dc9ltgncyn74q4blhkrhtv1tfz9fljfs8rq6d9mi0d7n42ve2x62rfyw6tjlinokrel3brr35qcnsuyqlf7cov4nsanyt33vb2yc4cpmfdopray054olvjhkwe526py59s2n810xhkf2brbfdox2yysnn18url8r5gvi706q56tiw7kwm3pkeci2nlhqgjfn7t1trxhxgvyi36w1sx5j2jql0drnri9v2kdh4gkpdsx45pjzcjy1ptrqiro6daghfop36f4eg7sxe1zgk5beg9u7acsoavrudhm8jozq9y9xpjsnbht6gt5ta0mvufxgc2nosiqja1vh3ux9m68pkyhrnvkk89r5urfvbb7ysmei71amqib05czo3dgvumuz09xp1zhla3yyl26tddc5slmvne122w75zbicn5ndfx95lchkm3nuldymisrtb7p04aukrtptj4lhbcs6b3jf6h67vkmkp7arc7okev3a5eyqj1hai2x57scmlmqa2pn2nkepu7fuolt5xcpxsu5fajxq1lwo4u',
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
                
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'rahzu00sjs52p2ft8pktnbzu5aldmzxeqpbk6rz5tmmhbaes8n',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'wgddfov5zng37ynudk4a',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '0crpzxcuaj2fpakbgserbz5wena2fnip359cmfvsh5e68rhg61w1q4kobrodnvye8rp5qmspouc3zsbtzurxpxrkpbr5nnxy6151m7co1lrvpjqu04ymfgco09xnrtsocmdvr74use4bfmlu6caidbqce0hf4kgu',
                channelComponent: 'c20h72yycwzhrysgv4s61k23hbp7fl08oyqwurq7ep3vogngvzkbk2u9c9c4owcogkvxv2s0qhfwmakyhaai1h1xg6dst5436cxqcvrh3flc0d4efnn1h22murezgdcorygmwyaqf7o4caopiv7qs6k9lfyj0yql',
                channelName: '5d6r1tqjv8z1z0cqxe1waqje7q2zv6g7xmgmxu6oa841y9zt24eu2f82syfs4r5g5solliwhv9jo3fpi5d71yqk48buhnig9vhmxzbmwy63rt90ilgjem57kjl6mz6amzivii8zgmr9kjt33nj7238w0p58s08by',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'p2i7dp9pznbqkbg3xdkpfom4tuv0itk0rdu0nv9k2q42k8f45i7heu8pq3s2uenk306dxxp59avkmsm162kq5a1mphsl7hrnz9f9ea8k0k1souvlddxv59dnz2acwf6o35kdnmtoth1o9uakegd6sc2xna6x7uc9',
                flowComponent: 'f7w4ule62oo2d6qj9t2zwlrxbbry4236byv5fgx92te3ahpnmb3m0wwqos578f5ke5gpdikdu596ohjzl8kxfo2p444ui5pm3ipoixifnxmvigwrpp5bc62hzsjbhf8yidzq4jljxxuh5hkckm02v8nqv7cvx2dx',
                flowInterfaceName: 'mok406ukwn6mlm16i4q1q12jcxspsqne35eea2jt356l1qk0j8uoyjh0tcybbayc6of79ondl9qjb2p6fspzyv6d584nj60v28epst0vad3s296xu7q02jd0dxq3ncf6c3je7a7244jte6i1bqj6zi2tt8otdxu8',
                flowInterfaceNamespace: 'letuzgi7yw10hm665w9ntg3asafvfykrsbeuq2qdntcffzp33ef5l4bjnieygdfn58bzh7ip0munznq7l85q9flda0wydalbjnu5igt9xeuvwz987p85i5w0hsdhnf5f4vj5rs8gzpd0bhwvhychl0b0kgwpyd0c',
                version: 'j43gvt4zayqhx31ksgc3',
                parameterGroup: 'v55t2parotvfi52osv0bd330r8j9kck4wsb0inex1tuen2djptrl5y1sv3oe0gknsjj3js15xkpj76phqmslzhqopje2oz0wjjjvm5usj0au1jnqa8wkocdaau6yupfr8tn1qijepen3jwn9ez8o04bey1xldw4bfl4nus9efa8tx402xz1ohhm990udai7o4d4uz34sqqt35j2lm5o0y4g4ie5bogj24mtv5d3ud1knw9bjjacdhfkshw0xb6h',
                name: 'xbmaebou8v5rjmp6bih3avla8njwet748o6ztvskd4j6s1rd4nvvhtlhnou3fd1fj82fnmxqwa4ks6d4hhujtz5n9oh5je90b4zwf2riy13qgf08e038gw97i99hhwkxvik1rmjqekb6zl1x7fsemrx8eoj6y47ghviodnrjutfb00g4qu14dcec8vy7mhp9rj5noce2iqfv7b94z3fn6apqaje79ms199c3g9nwl1tdmx6bxrxlow4o0wb5xwo3yxztfemqh74b95u79b5l4wmrdn1cqjnpp9uu9qbdykw3rzlxjqt3bhdeemj15lqm',
                parameterName: 'kjjgixp1ba6i9qzgqaza3w6ethoa5rnui8wgdxyi2pzzf90zrkl43umfp8l9qt4ov5jrv4f1bz2pgunx3ulsy5aw8q6ult8z9krc8si1yj9z5ws0if9ajor4kh2ok6f8zi1aqavuryznjenqzcfc6ncoonf4g1lyp6l9wjz08i6tsnfph3i9t9iudtytn71416v834gdxxkpcdrah5l6qvf8tlyyzxvkl3llz0wajwk9r68wn8vq5c8lcanzgr96ablz8vd4ga1hu3kleuwr1t9bii39atagxta1x9e1zfulgj12ybpzydzzrfosqc84',
                parameterValue: 'oie23kjubg1jz8j1nowlao662uhpuy4j5qkvdau0nbg7pf7fjkky0fw98mnr3oa16cpzzdx78vfs2w6f19fd7lneozf8l8u1nc1wj52slieeyzgjq6ilymbo1hct8f03cpz8hej4g6pcs00a3l5a64axsh12rzi3uv4ldvx2drim9ghudc1lr9wsv61k5n3yx9bhb2dhug88lj5tlvu19gladdugpyd1datd7lwrukpqeo0mtlzt9ib8fox3hqxhxngl2bzn3gkn8ps96cktu9es97yrsh1nriyevqckwp0fa4h5nlzglgo7yrjvff5jhr9myk9p1zkuq5ggh2vlrgx16ks0mru27hmly4d5pv1rpn62vhykuy1jx2l5ol4mjb0r64eeh1y1g4bx0wbwhruckmxh8vjcrwbc8gy4h6hpl1aopwwrn7vmjteoo5j95qasb4hezj9g2k1cdar3gmqwgbio5399cx38rjylcsw3oa4oo9gdkhn06wiu9i1ufft7uq8rtnuo2pg95xfzlluw19uiqpib71gawohbw576chlfy0dgxvl4fgab1338iyf0pfz9vgv1jjyfnlmdrg9v44cjogzyxjfapn4zkprnzecqtapvhco9yzezcynl4h9lwtywzi7twjgjloddaeczxd817utdhqkxjs7nhand5i42czw56h0b7f5wwg0bk7n6qd13qkmnpz9h98mrte8fo3chmryghvypcjqvot1s3urm9rd0t0r0kmab07q72fslemnlsovdx0fth41yws9ii0d0jpnlgrcnfsy0hmadmcf9tgk84g1cus67ac5swq2b025lm79wt0dpcxzep3ptot3mdys8tyu4fe40voorvf64q1p8oro73zr1rndd54226c2revemhbwe7kg2efd0x6kmy0k9sbguxmu5fsaqk6m5369ipvmgo3jvz8cqzh26zr5sg5b8zyv2gragrbdmz9slx9ko4r4dgl2s1vz6tehokjdr09wci6ss8p0q',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: null,
                tenantCode: '38tzij44nyczla9am4bqoup43i4930l7isbueu1r4h3bf6jmah',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'y289l1b4xnf2ripl9bi3',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '4ozsg8mwqo4kna04yekhrm5267x2ubgt97w7f4jnkxtyujblay4hwigs7y19fm7o5uhi9or6wsu0zwpbodknkluzd4uqy41641m8qk25wjn2wfrsg1iqngw4ix83lcf7j8w9b3c8ws22j3o30o9eg2xzgdnhn851',
                channelComponent: 'snf8kzo8hp82q5s339upxqhl98j7azooml0hj9uv9qun472abta8lc8f5owsqm5tiblqhlg25yva1qilbthvc2wk63dte1is2oqwur0vkac3ntyzi7fjyl2gkjdx484z5okyeam3nu1a95bk2k2t5wfcamhgmobg',
                channelName: '5yr1j2umnadchfn1i03o89fu4j5opmsqtl243kbpxf1xsiw5jzgncgzxb5hwjhesnpw6tiquan7vuuxuuvpyw7uquziko3fu6fxs69t601ml8d0pzp0u8zc8ns9gw2zvbw9q1qq74ye8nwk35hdoyp8bb6nwl0uj',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'tdtrxb1qu719ha3lkuwmqiukrndmg0w96wqdy5wx5l4alk89w8e6wcx0q4misfiigjyboxvyf5pjtj0qjwfst0migg5y8qco5peh2nj1w99sqexene7pbj31ipksjec2l192jdk4bst85zf3k4km4iyuf19w3x0f',
                flowComponent: 'a1c142m7fxq41eugttaeja1ao107dhoof3jm6csesj0xdjc5tuoeklgmlyg4si54ahcrd7q0zr623r0qg09a2qc4jil5smiy8tootjufb2w27fihsl2pqqazus10sjp7td96cabd8iprbnik5jp1zet75ssuplqv',
                flowInterfaceName: 'wutjbgnfnivb9bk5xyg691ozp9zx83xb0pni0kcn7tntzm5ly0kepg76e78usma5fqciorgctmde8q6lm8hg8q80yfcihf3bwf3d040txqw7kawk448nudvge9e5dqzc2tkjkz876b19y1qimwznvwj6pr5ua28y',
                flowInterfaceNamespace: 'c9oz0mfrroz0lz22o9zrb1jcsu2bz5hltccj6mh44yi31l1nk7q3pw7t0n6mola2qqmo31r7ljij0jxbli4ry3rhmqj58kboxtf7in4n2824cp6if1eg0in40vko1s9vxva6ylzleqgjk3p9b20nlkczf2ho1iwz',
                version: 'w07gs9e7tvy17r7hfzpp',
                parameterGroup: '3b2rmpd8wqiji8felt2c0gvx8tevxej4dpzdhiiei5e4x3hyoc7arn6qraiscdqiko59muy5mibz9t7pdgt9v6dk38u2kkl9cu87anrdzs8waw7oq0zucynaaj23c05tfl3lbnkb8q43l0pwqdp3qjb0iondtilujwuv2ohlvnwg97c79vcfwkl6dfrv35vmchgzb8n64osizdtweftrppxjwjaniybaqh0wzo9x22qdkcbmpnv0673os6dpp55',
                name: '77mh0gwlui5rptmiz1r9rup0xs16f7erehovz08e3wfofzv22sg452l9le045hpatzav1241mpe8hwi416xp30y7t2pf81cdqmc8vpflmjjlco42zb3ed1bilt7a81n6gs0ownxakxcthhqlnhsa07chokvubva3usryomqr9y2etkd66wxsj515p3i4f0itty1u85649erjbhb5105exvb5keq0g8j351gojwxv3k949gu9wae63wzabs119i1epengmlvihma6be9n2y2ef2fyjgzrcca34f9vl0l0yuu3hzk0whikij3xik70smww',
                parameterName: 'r1knp716bjfqdba8bdogzdmu29n2y6xvo79v3v33ohvwb6v8f3eluz058gtjfh3tr7ex5fhqrblqslckx6fdtgzdumg12dyd47rz7qvd88j7up6t59k6i0azbvm97vc9yuboxt6x8tzghsfkd2c3hts3gvy2j6g3qp1yt70pz77j54397hgl1vegmrqe74r53lpfxo541bxm4hhagm4fb7303jxobzqfe9pkm4p4e06bungi23cv6x0t66ozt7apshxdybo3fkkbeaxv0rc2ubnhn2szl24jzwfm1d7cl9hconnevm2utqx4uda8lom7',
                parameterValue: '8z0brs0trfywv7aj2jxl8i1m2shcf16qhz0pbyl991ytou7fzm9stwyun5mnv5a7y11s79ikvjx8i7cwiurh2ysc9hfzu0bwnnxmuxaus5cybtq49cqcavv0kjvojdxuo1z9c3iatkbbrmv5lxpeta6xedsqotjjemt3yb8e3si1jxjf8dxy3erwl65wgt3u5vf5ws2jbf9qvyllx9oed91tyd9xutlgedtblw67fieunoim50uu7asyzv2sw7fthgziaco61175r4jp6m9yjvf0chaa0ykv8wc3gv4zj0kq58r28m1h2kw8lmjl421xcaz3hxluhqdg13rh77jlgenoaigbwdog0nvou74ltxyv7fu8jh1c397sspi5etuf50thayuvyauonjqo7pov7jciydgrotb0hqgbvcf5m0xizvtd9s89fqtowrnyn5b2574s0do2gy7tb0jfl8xknuffw0br7lx2ivs7pwi5nja45vzenfvh9gxy6tdtfojdx7h1gghmvn5mfh912ji9srqgpbc72tjar4io9gnss7pnat8jhf8c235drchu2hxujqufn89ovrp8n9dbr27oehgsfmllltljjjkdcq027ebi2bkeiptnmx51vt16hz789m11cxjv797jx28r0nf642l23gqq69t3i9m9ebdwile8xiiu9yphj2fe89m9r0qq49r7o78uqoercuw6ifrr4fc25ezb45b85rxte8fx50yoooan959rg0rhb3qq7hdunpubvyegmqjz9q9jad3uq2k3ee06og66wix62hmhmm8t8ccsj0qn90crn3upd1r1xbbn4n1mcr1tz3mudkt057f0qcc0nhg8ycq0nbwulefe5c438116k7k5rbq6d940grzjyhx05qv13hgmw1tvjyjckg62252y52f5k8s7k6cy0tkpdrj90ch8ogr1xbqwa7kgqwhbs2ez6j54bp790wp9awdy6rncfmodicwres0hxi2sbivhbhqj92nw1ll8',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                
                tenantCode: 'e2c3c5gnfhz24zrwqbfxhoim6uhcx40aghlzjbwvvc5vqjcc4w',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'pd5wt1y8z5itr6nbvezo',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'ffemigwh8xj2svopqr530yqlzmpd38wkc45zgqhbphqfy3k8tofgitunzon483llwwe3dhqkeki10frpu9cc03otz1uj0gd95wvf9jcye4zpxtxmnce3o7u2pmhmlap7pw2xdd6lxozqi5i9qned4ar4kkk9etkf',
                channelComponent: 'thy1xsa7vhqo8lnhunx225uazcqupngllumtj37m7thlqek7hcusulwlvraxcihbx7jyc927bwc9yfwzknmtnd0ux226t871s6odiuwbwyzidxzb3pdfx6ta2zb8aqrggxcef7yo6cj6spg1fcyfu7334dca7wfk',
                channelName: '44xb9reprbazum0andojd5q3cqlx3smneultuy88r15uu1r67elt78a6v7wkyhxrg1wudz7wu38nt6e1553e872bxuep9yxt5polsdo7cbtoipflsvwt86t6o5sow9lsn1l0j6adlgzpwrrgloyiob6rkzpqtv8y',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'kl8q1zimxxvm68e501qhvapvh5lgdobkylh1qzau2ypk2x3wqr6nu8060c62jebgx71episjy64cykg52glqocbi0r1aath482fdt6wx7lfewe4elio3diqjvdq9humax2r0grvg17cpydjhu8uu3iyencwj72p1',
                flowComponent: '50oivd682wubant0sghz82e8m8mu3ek29m78r52x9bmk845n3oua1ycq5xnkrlqdwbtj29ek5h0mpd1si93vqta3np20337kqgwzbhfwaj5llpracrb7m2ztl9domlm271mmi7n14bh6xn286yomnu4jazly91gs',
                flowInterfaceName: 'jlsbv1lrpvrtn5y64lnih6oyledxva7zs6m1aj4r7mzhhm0lq0ca2quwj0dhh2em2k9lz5rldz0j8a5gud0pzg59iyoph7tkz7oor7hy0dzgonaky0zmc5esonjkgc92malz3mjlct2iog4vzwctt1vkc9czlwdh',
                flowInterfaceNamespace: '90i2m72heust9hodamkahym2fqh776rcvajpv4313mdlj7sswsbh9hns9sur2ubv65he1sg2xprbggmhv2bjd8h3szfd9jocc6g3j42tgrnjwefppx1hv8wz1bfv80bss43snbe6j58uiw00nrjid134p4auucpb',
                version: 'l5b3859smdgjpug9jt84',
                parameterGroup: 'qantf4nmk9qwzo4olpqn2obtkom6hwl8qog2wrwbw85jrgjjy1zctgwnp781vpuj5e0nn96tveh2ejf8zwf17qnfo84kokb2z1qkr7dlvf2gucj7b7lz6kmu26cb1myivusmpvdi3xmaf08yuri8ncf2rln5h0zrhkm8abb6wyti4sxtd5jdg93swjjj8ke0mffd9t3stwlmq9mlv5nwrnqvro5c9h31izh6enzxznl5fjtk1qq0ad0ol2o8unt',
                name: '9ny36qjl5gkqi3p8fq8o4q94u30c1yz73utyev9vbus0blp36bkxbxaxi25no0xiudf3inzl76a11ciz3v3pa0dhervv7kh4af0jsq52orp6rev0c7kajhb26zml2qa1plg9mum5p6u2hxemviv0rf5tlim1m1vl5nkf417kq8nvgdfqruqu2fw4ju24z1xoyc63rgv3jvtjs1j1wl5ycjibf3d8uz7m8gh6fqbtzj37cfvwubw64q364urbz1fvp9vtsy5nws124ei6mi249q0oyu8fogtdqo6cyoh7tcb3skwlxmzor6whcf73pzfh',
                parameterName: '2zskk9dkb4muk9ut1g7kqpjw50rmjc55rk5rs5m9srah1qixd9rtnsjpwfxrta9k2fpcgdnllj982tz4frdw6ren8y10akiteofrbwt6rase0258ao7k0z40tcj6swgh8lk43katalldi5vuvah6aj68jgu5itwmdhg1j7adqnfldavk9gulqfdj6vws7q63a4493d7drtgio7728gtr7xw1ff2mjl7hfkvaxz6iyrv3s3hvs7d1b54of8i5eqvq5zsbzkfqaptaqs2sh3bd1eo6tfmmz89igw4rvs0ow2sgpn9ictibmkgtt4osdyt0',
                parameterValue: 'tj96uwhdca60t8ijukxgd8nhf6nqjg5cfbuwkn2g31zwaguenzsefrx3kqfpte03myd4pll6ttd5m5poial82wqw07jutcnheacrrd2zhke0dswb97kvkx29lrbory615caqonlqhf04i0sw5d0fks0m5pczrwnanllo4v4i9e5kqfpn4fjhlhdk1oprc0e4qhznq0pavay1im51t328bo56ntsj7aoafi8smzrj1z94lpf0h68ctrr5ygfvw2wts0fvo0wo3c6ow07veif5bequx3pkv1oxxw266npvbgi1wi9pmqckce5x8od48h5z3uqg9atdpamq01hkd6rva3fh7gkupvgxuend9g63dx6u0uecabwr21ujdciqih0lfz9m83clhfd5a8yrd4dd5vorc9k349gi4kt9ny1rm4lqyqepr40azftl9ni3rly5xizrgm8fs0kxmncqa4wygw9honz47d05vk8vwmpwrmsm5vgq6pz9mpjwooxa57y74pq9d8c9sjh000nwr0jbjuqtpcpoge13hc5q6jua4rrb2zfhu5qkr5z89dryuhsz7vrz46v4ohpz71kzq97limh6s8zhujc4tz5o3gpptspd6kt0btiie99aaicch0wspehi9t6ip5ycxdksggo7idoz7sgact201t79g1a8srdw6g817ccjimet9xz5o9b7z42wqzjn0f375bj1hp3ylrf5qkepluuzwbkbztbszc4jbm74jiamo6jygir7ai9imbk62s4qc3z4sqwyymcdk6bz7lu76pin58r2qk5laudoenilea7wbrvpzlfowq08xwe79pi8l0w7yp42rfgehzfkq91zqe5f7vks4c4kllcc8nsvu2cpappzliea9x49ljeshj7v5ux3ki8t4y3kkorwu4mghrijg7t1dvyvcknekwcgem9xuwk3oanbnng7x7d98yofs5a9eepnm5kztuvxqt101kiuqzz035t0xc0sa78ebobnua4hfx664kdl',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: null,
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'khyi5jc6gujxij39brl7',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'ggpnyuqk9yh3ky77wabv1mq76sfejrfsbhqhxz3f9mutyyb4yygm3lplkp0my5vfvtu4h3hx7o8jirbv0u9c0odkhkn00rto283m299ig23pwcv74lkms8cxcd2ipufvy2idtk60p9iha8lhpv6340hhumz16kzr',
                channelComponent: 'wnlmqqft476ewl5396c5ig38gv6rjmuhwmtk02krge128a18z6fkpai7c03rqznt2nq6n9d77lp8ngi11ivcrmoduc2i3fwuwldn60d7oazedk08irbk7pheihd6xws6zm09n6mf6lrhnwk18xdgn0tkyva1ssty',
                channelName: 'j8yo6djjar3zahpe854am771zy5g5ei8qwvrqjoeu8znb8tkzccp1t42qwockij3a4gl0s3bib3cmzjldd9d5intwzuls5m3pb2x48qvkfh08tq5ww4qmmhwlhqsdr99rbmtvvevfbekhfzp3auvjtvp25o8zsg2',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: '8t42xodi9txdxh07rw9844udrjr1qiy1ltc8joqm7iqcswkdexptgalnghjw5bas4bsvvmx0hff8syexxg0jqxr2hzmehliycznrwxwdgshiao28nnkkocww4aiiob8y0pcm1uc5uzaya11da0hecalfz1jkmnlf',
                flowComponent: 'nzdup9opydty2lp6wqn59b1olctzwnfoa833us40qyfm535vtfkep2amk5hidvisl5jswt0rqcj0eeyz3i97juh0vfnn258blne0ctvwhzvds9yz9bm9ajxyjmnowatozcs5rv2rnoedmww04do4f2towjrlcywi',
                flowInterfaceName: 'nmjm9ucn1tsf80p75uohrpgyfxvagdp5unszbflwcvlldjrdfl4o4mosssd8imon6slfqy9930jk8ncw15jnkm9hgtipdl7ryjtbmn5b6ka2iurvq338uq4idhdc3gvi25v8ifi23e8ejdkx5owcmfaq7kz4jm9s',
                flowInterfaceNamespace: '9bel0mex3guuqasuskskzy21lzvp23918675tlmkrefpzy96bq349te1rtr49p4ejmzcdbnk6z75sfr2r3z89on5isxw2g4lm6mt8nfrfxdldv8y6h4morjezgtuzlhly8fwmer52u0ipwzc5gtuv7s1zydumyyv',
                version: 'dgrrnsl8fqdzrlv0t2ba',
                parameterGroup: 'gmb38eq8s33v5gh7pcdrnwg390l577thlpxac9s6na2ecktt6bq3m5pziuxurrqpyd1mcxfh7nzctxtenaz6swbf1q5rzqd2zofciqsy35liolh7mge97iv6yx91c4mk4z0lrrp16yevka124luldnob3yay9v91l8i9a9v9lv2pcxpeb0mcwhxi566ih0k0bnvlno70jamwzbv5saphzvv0qti2cdp76u1ghdrtnw075tidiab49vr7wvwhikg',
                name: 'qvwt8ofhqenyzqz6846085uetbhgvua4201d8503e85tlkvx03mg0ol08xp7d4l8ep2d4c6rn5w8fh9a7yov8xdq2se909a3nbv592wwx7ndr5riqr8czalt96ljtc88259jbp9idqio6kt12hy8kcat7hvouojvt4cfnr37v01lk4vin6neezr3jt71lb1h3o1z3wrqixiu2t4prp8ytbc2scwufza497r35oughct7hpor7z3wtna2zfwoy99l919wykafb5o682owaj2wvejw7xlx3bwt10do4nvcybjp0i2fsml1ugtqzu8r5qxs',
                parameterName: 'vsb5nib6dxsapvpqrc9nqkahts1wgm3m1xnfvt2i38dpv4wndncvw20gmhil785obah0oizhnfkvdtpwo4z36wnt0r1tq78pv0augpusq0kusxmvv4pabrbmcmevki0yvcywpfi00ou3bmp7cs6pywjaf5to9prdiy76x1rghnxi4zbc9hafse6v3x54636mqlsl6hezjb52k4nf6mzmniwyyzz5yf6wv08oo5bfnlxtt6k8c8em2szaw3aftzzqoo0br593igj1skv83cb45pz6d9nu4u0d4xg3wjwq0kyj5z8znemb7m5ltolec2l6',
                parameterValue: 's4lhgtm2o02lwq6g1tway25gc7opih26gqgwtlpge887u1kevfjguj19rjxi2in9i19lp5g6vvouzc4nt1dgofkccmhnb9u8rvixb4c3wnocccf6g7qfger3otwr4gef8vlwr46npmw19ui0hyvsdn868saubw97mn76ere2rko4r9t3gi0lfo5x0prs6uq7m19szrqc82eoqwczlhncp57jc0unzgc24pkd0ed3pmvviykgtak5f4b06pnla3ksik8zvf073rajupox1664dvx1iib9vfak2xkty737azq9apye4l2pc92hh8no7u2ewdypjxkqbjdryi3o7c300becod6rbyg9dhehz3nkx9860ft248g3705osynhga16gbnsaui8zoa2qnxj4ijjbh1sq8e2zv3pixr4fr2gge3shf7x5olgzke9voc98czvu1jh8ma120opa58spybsccn6pyuckpfdaifs3tt1s3nqqgh1urn8gmu48nosz0dpeb9crip3mnnvmym8eub6btrnfna1a1ichhfkh4kxgmqkwkjmeads4vr06j4r4wqrgc3i2mzjyhlto28cjcgjubdek5j4sq9uq9l0qvz6quaqagtp55p9bwsg5b5v26ga93b5pqooo3fx4bw48lrhhvw7b3vq724kcdmwekqjmwl5iycbk7f5s6mi8443lm16gf2g7b5g2shaefak3vopu47epyyue3p8djmzwge3221ll9w2npfab6jwdqew5vmm3255jooj8ipb7xfso7p18iylc0eh3z3nrgh2y6il1wut50kffhhcwodx88qczx4q2w32ia3xsppuuramzc090y0s1us87417c4dpplloaktcjca9yxzegtlk3xruq6m3z4x11trcocnbo1tpryx0omif3jyf51cu72107t75eq2pdrwdb4o87s11d8jqv9p9tvw5y3ksdxjzx0c9zzy23bmwc3me5ceqnk48mnxn988i5fid3n5jkiv08xuumjst',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'g70bb80n37mee75kf292',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'knmycnco5pj0dqw650htbdakox5txiv20wgt8cyy3w8o5fye558i62prqy5pewaniudxbqpi240c90q1mlogcmeas9ayswqgv381js848vavpbg8796534ar0gr42ooohftv7xjpljlmgrn50kegyijjslt4j0w8',
                channelComponent: 'w3mkqbtocm5dgmx1y1y07q06b4sg3kdnki650fh4oegg2nkqxh2upz8ttun038q4dyd80qyxcsi69zgnrhvihivz901uf78x18el5jwhcz2kf3f618yos19ahkm2147dowlnfbunrkgt2ohz4wmmgb4vqs70l6ar',
                channelName: 'vsbv4fjqtjrt8aepfenjuouu2a23fus4vfr4xouk4r0j3bxxnyhl7gmepqmh8c6q4t0iflkw063aw4et9z9iwmfd8f8gt2hq32glvh3op01wlvwobyzeskk2lklxbj32lyqc635ggcy8to0qjue951melnfnb5j5',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'yxlgh7q1gzpz9fu7ih2efsjrlnirna2mq1uej8wndzoa7wddf8rcro8udh03o5n2x88u88grc9jn1rajvfnugq8p3me1or8m6flum5nrq4d6r2glz8sgoe57hut8vrwbn9khl6r6dgfzrybnqa38tsyia58c2tkg',
                flowComponent: '15lathg2a4xofud6r4i1gzzsm14jp16qw7609krmpg3ixu4sdpa4o37xp7efvfotqm0gme3zptyp95vamb99sbsxiibhd57ygf8s2jy7sxo31tv2htbmxyk55zqpov5yrml1hxpyeeflh4qwqddlwt7vl3qb6jc0',
                flowInterfaceName: 'uh42dsiicer1w1dxqltyejb52vg330re1baz7vucbdeu9nd53yakunks1n14v8nfu22d0a10mto4qb3jm0tvb3rxcnrqxb93hqi56wrgxdqnkqraqga93db6ihaj6e5gcfw8nw7fy7p6i0wq1tsgxgyrzccren6g',
                flowInterfaceNamespace: 'q14b7j5f6r4godoc0gk6iy45ddfpzauhd0g59m9pzhih2fjmr9q26aqt5ca3v2fewwpa8lcegg0xusoev3f55w8wgvqgv32k1k3ho46wc8s1hdzgyjx5oyd02q2a3i3a6iub867kj9ngxtia7ypx2w5l6e5a0gc9',
                version: '5eh0l0x15icu8i61pvo6',
                parameterGroup: 'oo2wfndci0sezjey7z5ng109ozsjanhzseqolqs6v47fbqi6ildbwcl9z2bacarevi4h981xxx899rw5hq80c52nbhpb7weq5gvyjt6ou2zoy297wau87hj5fgl3c4h1zc5xyj2fvyfqwawyndcl8j6ia3u4h9pg93xti4fku7fzxy2zhlcuqlgjfcshfk94y2p9c1jmjzj09p3ouwas2muhqhfri85oy1g5ovxd0zjf5tmi6mngq8e1m37i0ei',
                name: 'nbjsqew1gayny5ln08rh9pajkfkpenpeptgoz3jjb9gb26cqyre3x88f2bw4sbu9p4yix3d5c79882us9vnvaviwfdir3f5n3eygnvx8uu5fmjj6llfqdf5bcso9c83j5ko7a71dahy203hjhism75cme4f7i2lire2mrs24w47gva91g14czo691q5etlbgy03xfbwyv0qdo4r3iwclb1lkrz8fawynag6ik53znev9bvn9bbg5p9ochla86tjpdqd7w2i7jrb4hq88qnqw5xajk7retkwnacds9nppe7hana8vremjdx39hq25g3rm',
                parameterName: '1joyerkp5zs7avzpubmlcqzjky358oirc1c334h6zn15hq36wn1ajd3amomfp3bf1xi74ygqqqgmy8rzr5cit6vbh5anxe83irpya26ffhsy8wwczirzd8bfxzjt2o30w8twpv8pajy328nn61pj7po979u7si9df9rnape6r76fcmcy3pd75gpi3jyzjt8n7j5e6e76a7498733m9upayd01glrcw6wzsq6jyks9ddf55cc23jic75a9yaxtixqu6g7u0ioo9mu8rogr20q3hakqeusuilx6uzhl127i0f3z7s5suc3pt0tb59hg3pa',
                parameterValue: 'af4uzj3a4257qqmqcvcl4hrzwobw7i3ztc8k4vog1u5nd6sa7z47vq81e84appjk7o9xq9e8x3sqorc90g5bakfqzvcl9ng2s81u0ly5vfvrkrigdd6ghfs37pgw3k6fmwd2ash4gjhklm73af72caxmjxk1ygzcuhv3x38qib39mpc4amwjdqmiguzy3tvib3zzx1q0dygrvbwhec4pjbah8f4is0hlxkbzjdvi62p260babyfg3wxh94t64f4v9ngkxp0slc2xwyjmboqrsnpzjq4nh1v0g1qmrizfvd7eplmnirl73hwgo6u106az491jc3an9wjernsidqrhgwrr0ao0xu75165pezmq7rtgwsjztktr7bzb03odh2r6avq2m8l7iea5dkqel60p1p3o7tkjh2ju0vdm6y43brj69xa0rwpnac3u660xdrojzape6517x9z6a7kpreh8od17oo3amfxefvruzfsati3dc8pxvvpnyaj1r51xe1je9rgfiy6hk6kdj8whrpoovnukycqujclw6keu2qmpdpmqdcegvl4ztyaphg3wsbs6ryow02fkpi8j1g933r3vvexvif3a25qsq8oizq40fstsgitfxqe819ysfzbvhko8knor819zrx7dm08o4ehfad79i5nhtcmiv6xuhz65duzl3i47qg6r5d6ij4rfepokb4o9href2lxi15rtyfswpvz9x7rrn7eujkcd7qixmvbd2zzubiuvirfhtbq82hmqipmxpdy2tdfz4wddlrwn5j0nuqwo9xcz422uiqkqh93mtw3fygx84y3iqyp4hr0d0zvkoibvy9dwi4mr7bs9oc05ht5w97pgvh4n2f8tzo85neoilsc6xinqwzjebrc1u2sxbt6451qp5hg5ljkvh13lc5mxz6toukboxsgr872igap1gacco6dokq6c3pk2arleuucgzuv0zrgk1b73xhqv09i3fyswzxfx3oiuq1ktbkndvcr49m7x68rck6a0',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'a25gp01c9w8kjm23t19mbrpx2clh065klfpgjvucstcqllojtm',
                systemId: null,
                systemName: 'vsmv2e0fo061kc0peog0',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'tm1hp86dkd82v6ei84757ra3yvoyyn42t94n4tisfgagjx25lsbtk5y53j5o0ztxp8hd5vjrqvwh6m1992pnky6hf59ya4nf0njbte2ocs3h6mhkeukbvdq08u6efuv59rpinfspgx0si8p60472plk1yzjm1gob',
                channelComponent: 'g1f3tjtvx80l8sm6jbahsktnfyj8fbpmdmpzysv42m9vmtj1rg7ap5ck5jyf0jmna3lw33bujsys4zeqtrhiwgd09qx2mzxhqn5m0t6wtwai4u2t4t7ytk33zn4gsuvhbp2qpl4jf9ih4gz7in0p3ew2rflgztiy',
                channelName: 'h9u1dqav39tmmtcfcbmn6bgtkbvg76r1xdwa53i1fiyxk7mzvjpy99a7d07uw75yw1u1vthea9w3jpn41eigxa8anprfqtypwf3ph363b0cg2zvven0oeyduqcc8abdlrpcudr0ew3e90nzw452kolofhoihr9z1',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'n6ounmft9vtrazb3emkx5f1er2av8uhhq8qqghmxx1hnoy8jhlggl6lyy5mma1euq5g9bsi7487je8f4sevl82fy0bgjcl3xe1sjia3p9a78yqggrv8gf0xfshc1baotv0kcdbgrbnidsxvna7w4hyb99flazjfg',
                flowComponent: 'mg0kpreq69ogezctny2hyd7euqiq120i5bkjm94gznaksni8zogr042dr7xboj764iv3tgu0s4vbcovtggttu30ieo7hi8uzrxlvx5aytqpp1vqjq16zmf9f2ud3mrm8vl9vs1dp3t6cwe0y6rhzmgk73tvlrns4',
                flowInterfaceName: 'mmcme0nzu11r0mwmfm46jl7b8t2vykv98kjles4z5we93l3vrzsgttse2na4s3v8cmjehethcewsiexkl7fhe2qq0mygquj7x6cude9f0v9et3fucqvlkcpt90amld496rsuihl5m28kipbval28oohtr4o0d6z6',
                flowInterfaceNamespace: 'qbs30nzb24t5eu7io2xvtr503wynwy00t0qlrrram2tickhp3dpaq14no7m08kihk1blc6uy6m7qexo1bkp408ohs6lwj0ygxfdbefduysgymbem6zkn2h94mfai1yx9b3uck5c2wqblbxilm86k9womb1b8hdtn',
                version: 'xxuydvl3ypc7vte87m9y',
                parameterGroup: 'lrz7hkw1k2y5jmczo10ddra8ud3owkcjvwa18o20xv38d8wh6jkpyu5p4yvhnq7mmdqgy9v31k1ve97jovnmxs75dbbgc7bnlachj72v6375dtppet5z54o7f6dfrajc9wrr6zua2i3hdw5ciyhb6ms08rp61c35nftkbv1v9t825as19hwszq4pvfsdxezyoes8pheug8x1wokk29tkkvc7cfw8vek8g1s6xg9rpyi9u2wf9rb2lni0obcbflo',
                name: 'jetb06lphzlkb0ir7w5sstv7nxv9y0diaf66z0d770p92tzv7fhn9a4ab5fu1tebn7wkh87pk3gp7j3pvmfocjec0j8135qggz7c07y66ntbpe5iiy1lsc6djy2pqozl5x7wrwfg8o4vfffd1owoex3hn51h5xr5x0h0nam8dm2m1xh3351qg7pz5afb77ierdzr2jhygm4pcoay1y1bs98rwkn9uuq64nff5jwyiptx063nmk7waybyvjxaw3yds2t20ojsvsw5mlze2sa44t9maafaodox7r2nkwfkmhm2mu0m9vgfv20iknumvasj',
                parameterName: 'feu092d0kfyadye3ex6qog0rbkcg4u1q70ok8fhs3wwkdt4y8yp8d1l16bln9b642oxpb3q8hcxtqo1zes3aseqf5d2e07adb18awrlq29kuh3pis40b8q1jsn125cd6jm1p2igc9hhekhmezk9mgwmdsghjg58g28bepp0ncc3j5vkcodj383lk4w0c4kuz88zd8zhft5hot8onlj3s83nwqk2v0tp85qzktojbr8mpoeqngol5xw30p58voye0xfiokudpear98jb7d6ffau8syvb5hnkvqcjz7kbuqmayrjcqp7yheyuyo7ge4j0w',
                parameterValue: '6u3hmr0zh7ymi1dzhmfr361zzbrgwygwunp7gvmp7kuby3v4l4gnxwl1cmlfswlyl3a7p59xcogofiy9tasx7fjq3uynw5hqp8ex78nahffu4n1os5nawv9zjjeec8eup5r9hyy2k64nmdo4opf6x9si8zu4fvxersyfjbrc86qper3w1c5s0qcrlk4xbyjm1jbn7pghdiqabv1q5scf598tknhul3dy1si1to74x18fe7kg7kc8a9oucma3urenfxd3cef3p5r7rioldpx1e3p3zj2g3ksfel5b3noydjcaajwgvrwk7jay3rthbwfy0994f0679neb69dki5gti80rmqmtf2sshiiidea2djcvf5grexdzp669trkr5bqpsd7q9ic8k0uxsaggqpt8nv21oeeq2vc1c2u8jhj8gp9ced1o6cdx68zag4nx9rgozdge49rt1oridkulst0wap2esgqk75xougavhrd8dibmkxk9oqhn9n82ce5y0692wkccwrt6dj7uy7nn6fwb8l2xw5t3t6x1pf2qe70b5m4iesuqcoa9wfwvct0pwqpmnuiwh4ntpyccgoslafsr1ppw1ibdgrp859drto8masn12rsxdzxtrvjhm1ng05xf5mq9td821y4kdrbokzvaq5fkom2iig3pjzf2dxzcxbibcatelj07j518i2851qwe831da1336efijfq9r69bjy5dv87jzxhb7sy0m71zib5ore230evlgq6sd8utp4ymf6wxwqbqonmr1ony9h6ymgwnxasntfgaezoqvnoejx20vqx1mq3s5ij61i6pm95jl2w3aeanhit80k8uxwhif47zqa56pa0ijgr59tex2zczly3oow9q8vxf3id3e3tcud55yqklpk49ezo77nilt0b0hftgea7qu70epilrltec7bj8w8hpudb1l03eeyack4eebox06b433swoow8d0ppq02kg0bpp72muzlpft8d1r4kj7brizoo0eyw9wyds',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'ty7ib69mai1eulecjftvgc2x7jqhnulm6eish3w71x55543bi1',
                
                systemName: '0p6f50kxlncnxiqm73yq',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'fo4uowydl9d26p7cgaplmso0dwxu2xpafkdsfhon8r4aenffm42xdwenbuugzsn6fu2lnc4cb3cu8uy5w37pnp63p6asrq8byew6kk0vmd77yqt12aj8ux1dboc6x9p8c0drbwzq78fqxopu2sehx1fhyjfe9mpy',
                channelComponent: 'f4ncpgx188hgb5ks6t4g91swa7vljhfm8imri7fac8101kxjjmvvfekyq1ajd0qtgh4wzvoesk3n0zkg2fkbjd7fglf3jdyi56p882e2fk216z6gudavpj9civ8a6tysh90dbux40hha3v4ecdn0en29wz8xbjt1',
                channelName: 'd6me7e8e9dnjvfr56c6wmijoxi4gvea1zabnjiupa4aktmp3vmtvtmbnuowyt2gcanz0ucfab5ww8skxap4rv9um10f1uwdz84m0neq5msp18j35yvapay0ukjkt2el8z5ey6619lv7ndth8jqkp4b8ajfozoc9n',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'ntgul7mv6sionelb5vdqmv06jcm4o06trepibg7mfpyu07cualv6o5rqf4t6hyhrgci2001txr5ya8egzv6zltdipwc6euy6gpkbyao2vinf0hbk3ygycz0x16xmh45r4jp44k1pb8j0j5bv68hrm1wjea4payeo',
                flowComponent: 'dsari9lmawctg6mb9gqe3607kw5vgft9x8hi402vj5cxptzwg7c1hm06ndefgh81x0dnpyyxwtyrvzdcye20eha2gxsuls9ywpqm797ej8rwqs4r58el80bo23zcgh0rgu55vh1odkylky31enaisbtfw5rv53p7',
                flowInterfaceName: 'leojg1pryqqhtw11dkkx7qwismqj1tt71tfw55grxq0sqe6s7osq23lwstdnsdd5hu0a8td8y24e5ug0icgdl0oj6skye4j1mx2x3z3o75v5reij2fmqoqkw4y5539kfbu6e5dt7g57c5dnp1mffwzid5yk3sypj',
                flowInterfaceNamespace: 'jl0kjx2yyrqxpy6nrnuftr2hzwdxn1lz045h2886rj789x1tsbpuwycrm5ddjgt7rqu8ivly86k6xuhcmuu5qkghil295r7nubmyxyobqu3wxayz9eibudr7164ethn4si2eufsg1ouiqicxje0ip68vfa0b0xda',
                version: 'mz90q8hi3ze25cexelv6',
                parameterGroup: '839a9lv1ybhk3svdq2bivrmhoc2pry04ogiujoql2iuo95nsfifhupk6ullk8vqnvxk57s2cht2zmcjv38yygblnd20rldlbtcgj78p09duset9y888i4s96f8toh5yqp69lamxsve0jz93fr3itnlmb4hz47pv7z2xcz1tnpumd7nhdh8frrhcffld2mif8ypl2yrsclzqifpnntd053x446qvwifm9vtubjmjka6j49x7g9qhtptz8ivhgcyd',
                name: 'nzpe2yt7h1t5tbnucojxi4l65cfrsv1evo84ux32ko09lpwoff5q2my1hdod6n7vrqezg3wd7nvlos6hicl4ozc8nnlrm3fnvpkobdcw9jw95l3nhz6w7i9rz9wre654bi7eqlv5mcvgetpkcibekzv53rezrliq404ux6jzeqj37owyljr8hsjcsvvzh9ejr6z49ijqmhllfvk8vp6lasi1tmt0pd650q1ekmhkd5fr4ev6maxvxawd33ihy7bks2h48kh991vhhx40b85otu28pkes8mzc9ksxk62occcmoj9jwvbms42251vylpe8',
                parameterName: 'ugc7itc41zsrjvnzvmrkgyshrd1kfh169gv24ufef3919ly7utmzeiihlefsrunwbpjggfqncd6fcanhku0apcbmlx56fj8f8j65bnm97az41oa3laekroegr1vxphsneyyrmc1ma5pzqe4kqmlb80p22fwi24whxtwc76m2ujm4rcau0zrx1nxa14mmm0olhnihem75l0984zu1m01k85agrnpbwgeyffv5vhdigg4ylqqfzp18slveol9vdeb6k1rar7ulp0gxy9iy2klnjq1gj4xv9buzfdbtojg3n2wyaug76dmhkam4r1p8j7md',
                parameterValue: 'z42ijc7g2un4wbvik1p5kxesvptxw5zp3815dqe4tegym545clutthavxyk0u14u0o2shx8sszxm8krb21g3kra9ycgqegdr5cx5b5vztfb4ch4cs8c5fwetyiomgn3rq7p5ho2436hrtsmk3eh03ij2al8fbhjdjm53rm3gde17d4kx85ogtv6hwr50nariuxqiuz3elk6mz6pup1s00fewt0kp5xh977lek78vra2n2tr1phnyfxfa5sokrknz6hh771okl0e06qtu7pwzbfxnyl65k7m3erffp5v39pda5lbq1aaqr0uuo96f2lvrn1vdtq00mvw26wb64o1yvgjk8hapqy1qa0cq8sqarh6zvyyudk6nawezajh0yjg5j8pk15qu06ipviwlvfvudy624jdatnbmnpvq2tr1udlifgofv7no38zh4frpkpr8j40ce8y6823bgzmerb9r4qkzffsxmnu44nb9jyh2fuvkwf2g4ff1nuik4t7tytfdoim0lv4mfsehr23os1fvi1n7pl6msecek95bv8767ttp03jnztc7ol0oc1uzaxth5w15ohycf8jp7xycc3sk9ezcg203luz0j357p2dyr6rf8c5ol9nxflow981a7cx9ydb0337w5g8jz92ge9be9nsk690ym7yc2zk0ccljina4ty7fw5cwn3x0h94t02idz7w3sie7vzyo4hjuywuxcz1r9tayz73ao2a1km1kltssdj8xcd6ra6mse7jcvxs3iv6gszbg40tcgot72v1wc8o05w4w0boqcl6egm3hr9n4lkl1jp1pc9qv30ee9qbniwo1aq8dddt3lr623qub2jd0b8phg89ob02s9tyng9wklifvi4btysqdmglt417a4kvenbl4d0rxcv2rm9uj7vbpyf1ntxxq5qumsttw2i561o0ro9o5tlfwd18503mydw95i14is5u80f3hmbjh573h91jlz2imxnr3rc8h8srupucj3nd721iwgocipiys',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'tqqbgf57m2bsmf8gqo60b2u513au1rvr3qdpsglqhpcjos6479',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: null,
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'lmdh53f3iiij35iv23w9rq9vw15n5olw2rflxvptaq2m5suyjqy7ur8wbh6yv9n61k05m1072767c8u51kjy0fl3ju93lllw0ywp3sj7x0ojrqh84hnt55uei8hsou4yus9i3k8zdhitydvn2gnar4cjt9417b2o',
                channelComponent: 'fenlk3dlisfqbj24rv9kuhxom5thk7g9hsesvnq9mdc7yy5ya9iz4gesoptqou3urmv1j9h8nyz2k61wma6y6j6d14ewq44o2jxqyt1cbsxu3vfe4v3uybh0h9yqb7npkz5sihxun1b6iuvyouygnberclikqc9e',
                channelName: 'zivmsnpvevcepcpruqvp1yi7yh2au5een4bhg208c96lwdtu84m98ut9fo9pbhq2l1otlns8p4le65onf7x4pxcxr7kddma2xq8oxwmk2yr8txd0ii3tpbq80vel9zqwxxcipk1val1c526fie6jtq6tzwxo8o8r',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'pb2z0wv9mr9q6prlqd7clz279ikc9swghdp72f68lof2n0gm98y515ggn3qa98e5v3xiolgfkj7vzqyps8r7mrxul1fgtn73gz8t11ytho2gmudfbuksrs729t3kr9h16diynjmxn56lk61be13i8hdpiqs7xp42',
                flowComponent: '7b62gel4chg004vb33x0y62ticwvjtbaxnsav05odw3liawv6yemx33vvz7jtkw1x2p2ynzawbmrmuboqvw1k4xwzz8mkefwu0d7dpb8ohzamipmlppd78w1l0mpfo82rb3f035eg2yaazq5nn84n0knn1j3h7ed',
                flowInterfaceName: '9q2kkbzchh93bh3jxmlnoaa23sjfljty0au4ahq43dshwu4x8mm48vpomco6gfv5onxcqy9s7zfhj1qrf2m8t7puevlg5kf7evbidh9vtgakvj85kw9b6iy4pjgebas7xa9nw25rcknleufdv2vpfgk8i91a38yc',
                flowInterfaceNamespace: '9e1pp4irb0kwd9dpxii27305gygy72cyphb1s1jnjgo37r97mtjsp0nh3cdkskrbco6d3y7linktw49be2dm3ydbcoc2xnwbk296nd1d0flv4weswiw9xqi7vy2m2isuqh8ctadusobdtyqpngkcl2ew8mh7pq7q',
                version: '402yclce5y5o1q7xj2iw',
                parameterGroup: 'ns0oucuwuet3s4npbfm48sd0ryhp5ywqvrxg9llai890yb8mfcyie3vbv9atfh7vtmqns3jsa9gllfrutb3um2b1c45dd6l1gkemk87irh9810dm8ruzfmaxsxmk29yv7si2653v6bjkheuem290ce3j2rs2p2to810r2no7vog2jozkt8tqj0j1184kat4vfzctrde666502o0oyeb6op10dex823fagryfp54qokwd85j5rowbri1a9535d99',
                name: 'hh4q0ee6z19zam6agooipyehxgxtbwtxah96rf0u06srnaqb0e1ymy366mc182vaxxt7chbchkdfghruz0cov8ah9hhv9ggyc4j8g0lmig7o71fw446y7p57m9fdiw66kn1ionvqzk4jyur94hj6n3aia6r2gqqy47khnb04owhxtqq24mhljz2cobldmhxiqrsrk30xv42ndpypv9oqkro5xwgn3evfdc81be4a1wicz7a0if1nui3wy7t6f98hnvtex8ktjyn4y2z3qe5adqp4dh06uhv3532emws2mlxecfw4ex8hb4c7vi33u1c1',
                parameterName: 'ot4skw252l1m5kfau1c3pvl29bd86gajfo14j696oge39u0g1y5g9ly0ll30z7qfu39pyghtcvq27jqo5whuqkzt9e742s90d4ooccncv8a64fw7d4rl8qiosjr8wm5z0ao36km886kbjolw1t2jh8d19r9fl8c1904hfpiug6j49gipwm8e2a3sgzppkla6f7ifah3hpwe4e5j6i9s2bfo45rwaqbag14r2et1dm0z90atxzmmuigrevid5b4nm00moym6kq5bfldkhzepzb1gkh0j1thr5vu3cb77irdh1fma062gvpl4yw9rnczqm',
                parameterValue: 'unpl2ato3r15tmbw9jd0ibkirq8b1vcbjhd1n98f48xztgv2iix4brcuy0wgga11vkljml90d5z0wgi0qelxqgcnud4tpqpczidp5nxznox1r34oyzke2k67laqnsyhkb7n45f2shxzxm74j9543ors9xx4j4jboknp003celran37ouofhfh9m7ipjk4s4nng21gbkwx7yr15u0rej6r3qvi9hn845vtamu0djku8lsmv9x5r9ns2jw6dhsbfuyq5ovr29ga12p8oa80ayra4uhsw1r1qochavtax3phqeiw1akqtdavfwln5vaq9rmbjb1yhejuktkgkcqygh4xxtbvmpyewx5u4d7xjksy8tx553y3qg3zjqguc7dtw9lsmyz6l3a1kh07bmax55oec5yhr4bryvfu3r3f5obtzyfp4qzztiq1q3obzls1vhm2qxt4tn0ac7sa5ngvq4wotjqqfbzt3tzf43dob7foknpe1xpbra6ybcr8tbvbreya8ntk2cdsz2vqhte3waje5v9danw9arh4kp26yjqrsuwnj4utd77e9dlcwlwmdfhmdhxn3qdpxcazkge6m4ccluq7l71v7h7acq4vjjk2mbecqxo10bl5owqjmgnrjq368aswgwzoq1fwtoyyisdaegkxly3mfujsnmghklsscomho62yioxcf4ot8pv6bz4y1eu0bqikn36m2o1jvaqih0oy7oqj2c66fhm0jilt5pmy5wj2ydfxxn99ur9yii9wxxl90444m85046jt6dfoeahqaewaydpjrsemykhji96042rnop33zpefrxlb9qy57gqdnjsg81og102fxdrzva58qdw0q63w2faraow5jyi92md8u0o56gydgv6x85fz8i781liv7to34yhfxf0t6og4zov44ji0wrtwsucqf0ipj492cyc126298vp26h6kvc4z2awwrtovl02u6ckj3snrqtvgtd0xfw3v6gx1g43iqqjzze8olzs8edkspwt',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '2c7ejwaddk2hwe1s3dnslp83u70tqi80jn0bepetn4nokbhesz',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'fh4g7wlhlna3ru5liyy2reultev1mcgejenl43hhs46qlv65bkuqs9d619xb8qjn3lbfo62x1njtiz46mnqq9bwanjkvp4j10r7nsulep0iw07tod79b97j9xylqf0t4rydmm7175ln3nykkxoeor8rouekiz5xa',
                channelComponent: 'w1k5xf3i7rrusnap5n3is5sis05023ba1e9mi14b8lgfp7g8672s94qg398vyb68vc2w7npakkakeogwldnfy606oayqha10c3e2r8c6ycu5wr3adl7psybqwro1fnd5qome3j1znsfjozb8rj0pxns9313rz7su',
                channelName: '5ghd75uhy0rwnsh182mqcyup9as98s98vp9ybl1scpijg63bnjaqx3qsh6emd9yytw1x7q1mhxgsuyfrcubwd6m6fuqcsl20y1z8nw8uu29rxn5c58bng0s7ephy0e18e2flcpu8y192zt953ixrteizw7rbdq84',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: '9up94x98jycjh4n650iygbr8snwkgi52x5wchvimgt512sk30uvx273kmexr93rm74jew6lxh7kaxwazuzxi83c54h72g5mcwnz9lhjedkpz6lsdnr7r4ljkpsuv25ap4eerxl8ya1da8365tzpgat6h2zpb543i',
                flowComponent: 'ewp97ou1rwxrahnvt9opnjhm5sz9l7r0xqwc409w22b281ovk36714j1scboqxk38hl5jyzp76cf9cwlkgd420rxg5e0vlvhareugyq15b1zn3h6g59043a1x2ghy6t1nybdepahrg9if4v2sksqcui865wyvtzb',
                flowInterfaceName: '0hhjn0gg88tc429z6tzoeftt8qaqnp8iwgzmdcws1gml4oxkblis2nw8i5jhxb1jetgtnt058nzqzuk027ond9z01v5a04n8h9g4rbbihvhgrmjwest3huexkp0pz12poc29efzs9cf9jv3mvquewscfx366w5hv',
                flowInterfaceNamespace: 'i1b4pbyxsztz0947jvurrchss6xj2las4zsqevt36k4u4mfoeb7zte5iy1c633ycbke51idh3vdhexzksi473ooceechuzypdv5uwbdy7qcc5698pg2qmqew2fqb6ymktxbw2gc4dyxnd1mg40lvgl2w1pl1aggu',
                version: 'j267805igguht28stdso',
                parameterGroup: 'k791smwvpd8vyzsglrcdez4odg0xilvdmjd4pmjgu1qzsjb274wws617hesvidvk43unoixlcj5gc8idmq824oesvowefp9fc7f785qjkfqq1l5k2bpriupovvo9gw0lvvfgxln1c9yx1iy240ohrksea30vj4kmu5qi9mcr1eoz6sidwlgkfhpow7gn5s7mkfrek3ad41nou30o022l6t0bndrxliqoq2mb8bpe03pd3jvdk9lvlzrrad038b9',
                name: 'tntoyntmjb6xhxh2w7dfah3e5960p2my27iapk771k8pjdt6b4fjtoev586pql8klejwknqb4ykf7ufzgniuhc13135zt515t229al0gva3bz5428mwbe8yzd1hq41idvr094jjdkm4roh5ttcolpqpzib5p6o676ouwie7q6fjzglm52rebgzk65781rkxb2s8nhq7ds82by4rryy2189dsx40mdqrgv834iu1sex2axrcg6j3i1nbxevt4tyomytkexovy60d3g1iopiimxh5aqribevd01jmzvzkn4yma5szpng2fpeazf0u3jowo',
                parameterName: 'w0pwp5kvlowvkukwy6kapm3h61r3cwdqkvm2a70stwhllstqa6sldgdl78bozp51y8bsj4t23xievy74dkruvbswqioq8elbmry8284qsdgatyn1wyaoegp8wswrmcxb9ng5ulqeu3u5dbfiwukmyidsvpiogmdx8gbblf4efegcmj47tlrhqn1zu8ekhrjpo0wk77p8sbdkrnn45fyyl5f439vi74nyhza27e4qfu3o6xu0x036gmqavw7k763qnuvs1cbajq9r2x808jhdr50lnsi8upr47q2bgffyyrf90bjiuoi3tcrdrese185b',
                parameterValue: 'dlkg4ltk38uil1r1ton8rpslm994hiyyvklz5e2i9roer4y7eb372t3m48xj09cl08rfpj4pmjf43la6eup2odp2n0vko7qtwmcmex06rf0pmvtl3ofqbr1fxdc1li6tl9e6pr6wllkxcm5ryxeanh3sa43khlln6qn43nplahl4cy15nmyg7ifhnj6h18qst9r27vts0omtwqbpr0hkvwd3cxq6epsvq4wjzvu7q09qbs3vwn4iyz1w1p6n1gkhos3sucyp3ptrmc7z5xz7putts17u8f9x491r6dpuy5is1qy3sqqlzfmaq1crrqf61hcufq8pshvok17f2qztjfhun6e3xyibya6dwr4x0gr66rbmd09rgxcrdwp2i0rqo6l62jtnmdcsnhffkin30q60lvdni4d0zuin662q66rmvtgxptvd022ujlb6mfpzwwyk0qwtt1s5vozi4yy369hq5es3zsthle3rraekeqwl40rts8nrba30ujsujl931erazcknzj2ohkof5dylkk8vlcu56jjii7a5g4u2v6ijbw9rk2frjdbyg5kjvfoa0jou1jctoux9701fbxae0ide6vhbctwppwaxj7xkstur04gyl3axt3g1jkdi08h6bvksfoyh1u24b2zg44r48kusivnav8dik8u8ow4nvrpfuihtdpo42vux44ofdq5igjz8pwvg5tmq48e1ppa7pixe2eg55zl2f7uvf7qeh77hao3sqxjs8gbbgo43ajrscr490a0xepxjibs8mt8n4j1rp37j1pwb27k8bxp05sxqe3i32gpxx7nwxe1o0rnu9ummvz9ovu5im4w2aadmgxj2scr569ms5y9iqokakhwke2b06lyt24131phdroefm6n6ymyod3mxl5978esimd62r8yvz8ltf3tyhlyf9nvmjoczju7gahi65mc0wfi2o2j2ij3sr3lcvkhip25j443uy4owbzatovhzd3exim6r6r77hsf202asbvxh77vc',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '8eo8njmb2aoabc55fjijljw930lgye56pl461svdf2ywx1dy90',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'xsyny2umkfycb7w31q7m',
                channelId: null,
                channelParty: 'rfhsi7l6p13eqzwdz8nfr5rf9403f9gt7i4rwo4dcg5veloramon7w5o2kedsowaa3wspurh14orou3mzs8zmjsiwlquyhd0psmbbneg21vc4nq10923wzshb84bf778eg6m5ctatach45xy7m1c2i3s48e7nd1w',
                channelComponent: '3gice1r6w6jh6vi3hqmfn8cdaozyfug8nwi694p7hpc6k1fwsw18vfgxzspuqetu04hq8jnuvsq5lgf9pgqauecmx552y6fik3yrkzvfewyz5nu29o3ijam7wsvn2dj4mp9lfsvnr399jlde83ripcbx626xznxg',
                channelName: 'kvqzv7l6b3hhh713pt5jrk66atcbw9adk9szg01d80moa25nmectm76487hfuvgjrd6i1d5ubsyj82953mrqe3q0ejr8gvbwhfe3sqp977gaeutlxnk1r5b34z7by3pm1bcd1ucgejk6broabush2fzwyrbhcizy',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'sc38e7b5tgle059jzlr8v1575k9qcaclvhz27x49k4er91ayl9duy5bxhtf5rbr8aebrxew4m7qc2mhohfqef5c48yhk0lwd7hu65y5vw9tzfoppd3g1hue04wg7x0d3vpsnm9kfkpb95d9jbzeke51f6mnq8k0p',
                flowComponent: '3099cmleu1q7qryn3pybmfurpa8bom1ixq4qfhag8dric856bzj7iad2qdnxz3o0vxojf1emx4yxmeiomi9z4h8lizcpwj3voljrko153jlxubhkvatwvb2k2l0rsg0raffl5q4hmmpjankc8rw7yznim1aft0rl',
                flowInterfaceName: '8oo5x9r8t9gb5a6ejasjo3a152v0fitqs6xchiyiv8l6femdejblj0t8yjkrapftl4ficomga0pru9iy068hdzxdyppbbxuqcds1sqr6mtuj5wgn9riuz17fd1mqoo7oj7mtkx6b5imwb0871n4jtd5lqkwlm722',
                flowInterfaceNamespace: 'vom9hb9181ot2ka7ykkw5ke70mpm5lws551ve6uce5ay9lm5lw6thqb9clkq0ey6b4r564uinsye5q5v2e5hvp2v5p9rszsqoletpvxpl7af3djc8qziul1c5xbpfic8uvm4vdufxiolrdbdbd17haqc1ah68oix',
                version: '8u3bftyw5ybxybsqzbu0',
                parameterGroup: 'iu0418kwyesw1dqn3dn22eptpvnl6vkgd6j5ivlarvmyy2h83sfxhhqy01nrl7ayofunmcdaajkz5bsy9fsy5tiuaay2w8nb1imov6nwm54z3n50zmbescxhrftb77izznjbnp90utudfhg51xt6tn13icwi3a3g3mzntzljwme1d6ryt0a2ppr4xjsjtdftraw4pbwori1q3ypm789mch2efgpwgzwva9mnn8gc91bbgvquoaa398rze6qteyh',
                name: '6l69ynx03nwvqo6l9uwbbiagly8kltoowicjp7j2k4mj6tj8dlnc4h13g2k6urem8xxb2beaywrxueqmjta1cogkz6ghrj0twl8tfz7ichlbb1jmhvxj33msjtt9jb4gze18uqfckzh8zvj4bagy0ehuwi8qaj0rjkt7olmbejkbvwa1typnf8e5dwjj650ewd4ftc8fyjovovzqrmg10wzie8c7jatvt1j1whcketz6o1hpfh7atma587v84oxkeyxftiqze3fbxnailxeww8exnqdjky6sep1wq4wwty6hizhaevr1z9njef0d8phz',
                parameterName: '7snm53qnzmp86njmxgpd9ezsfpzru64swffg7j6eeao3lrhfntdiepcgqh5hrc6ga41al275g328m28mp3mby3d1xlemgsizho2kazmhm2ij08wegpxes4tsgb5uoqee1n58qjs3lrihzms900evam5it65k5l69akfenq0wv1ihnt0pufpqcxowl1qfkgj30sco8ave0us6kudm5783mti7lujor44ybr7k98yrzo7w6if8x5dbldqnlx6j1gxn88b3fh8ndv7haato6oydl9hbbwvlqcu9iykiispylsu9i9waow2fnveta5884p1w',
                parameterValue: 'mwzwvozxmm8ej71dajypy3t6glurlpo7suu59t2h6xvr0ot0rhntoq7kjrzus23q4hjxan2664o5ibns9qkdsn2egrwsbnivnrehzh361m2dt80ewepeo7tnpz8oc5p2txxcn3bur583w8fj0ufulpyef2cv3vnxg5vcfbe9hah4ne3c2my58cvmsnjnrkt0ux9pn7vzaug9c3d5epfpx0bwcc41l1qn3ybvaf86dicfrqqecim3y4wizt6x4a75l5qinsuof0rzka821p1tbenwpkccnmwv2xjfgn6xwsa0xddh4ruy3vrky6ywt6r2e30h6jhd8fnke9kjcnfjrx43fxnhuq7wfavsgi3dbg6rni1ojqr83icvs2m2pyj5ul974p9ot3oe1zpcehloibxfjnyxjn8knb5w8082znhu5ra7g5nknp5prbsdkvph3ttjgjz1q8i1k2fendv1xirqwyo60cgb0c2gcwy8n9ihlt1ovorjcgxdbomspe6no1j5sxig0rjof09dxm9e6ct4cyfujno0cqo8gkrlpceunmkhfcdv0njvg715aic5mnvhbecq5ocwmf76rn79rzp27zcp0ef7e3vvneq7epe7e6gmuysf6i6czrbynmfthsha455yugi52vodpgw1i8sobgmxeifdlhf145nn2upyvtp978d3fd0wn2r6mbay2t95qktx3toamln7balvovv88n2gwjgvenh1977svj3tokzqo1jomjd7h6t0b3vgl0rmcz0na7n43xxqgoxjbd120sjigx4t80wl4dsf5v6xb6ewevhatmke9fvksojnloicvyi4gtitzph4qv8bofyk7itmaadvdeunfg7mgev6pbqzj37yk70u64o5mr1rwk6qx2c69j9hnymu0hlzm62tk4dos5qe63aczs3l83o6k9dynzfrjnt8i4p7vit9kdwdtfijcttozkyh1fo32ft3odow3vpybh3nbdsugaexvx62c7u53xl7lb765sn4',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'kfuscn9xd6chj3zba2ccuy9o8mhlfx6smfpd0ovl0pa3it06ne',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: '7nnkwb11eafl0hyj1lwr',
                
                channelParty: 'h05m3smlnd5o0vovlqybvcehyh3i9ds3ij0tqs2z4s6ndmr1xzu3aclkbgj5s019qqr1ou1a0s2ypng6wcfx9iqf31s08p98kb2z1wlwmztmotow7hu4gcb8k2xhbq33fmxa6p7l7d95ebwf5at1bqcp01d0ypr7',
                channelComponent: 'utq6742gi0jkfamyiho84lsmoh2l6ghdhnnuyg4yn4izn88316p3b57vpn4hy3ig37u7x0gdwxjhvnx7slxnqpmx2d65980uma54g9gwrhrgd2tuk2xwrq1p5ezyalxmc8is7bfv0es7v07ydim7u8li43lt54g6',
                channelName: '1zmh3ng58zty7nr1tv1xkuq5h368fikfeaqdzeywww64b9ag03i2takkoqlw0mn76x5p0mdibro1fts64ry0praive60xc61ousxmly0gsjmt1qf35qprx5fcc9gaowa99kdzaonwja665kt5m31gdmp6m43ahre',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'dz4v92lusdwglw5881h2jm7ro8y4dft5tzae8zwdmn2k7v2b891vlemg7p2s9vyov52hfz1d2nlen8du79766pg8o7g5uib0me9nrtjc5po3qo7o3j8btfevbuvose1lmmva96jb61o0l1a86f74c754ci30dhs7',
                flowComponent: 'el9c0ywqt75bcnvrmw4so2pcb7zlpg78ijp2tjzwhj3ykwbkrz8v6ysskrlqyi261alu64xb4vh14n4385g2uogzcex8smufg89ztyd3u31us4koiabp01ms2iwfca92kt5k6ymqlcx7146i0xumagfdwl23henb',
                flowInterfaceName: 'jacnx7hfn324pcg01yuocu8x2pxtlqu2u4ifvk3ooaqxbct739xzs370tm8dnxtcbez1bw1auk6onusr5dfzqet5oyi2ud06l0uv8i4639buje11mj2bu7c04e94ua1eir89e1mgfzf2x3xxx8tzd8xu6fe4mj2q',
                flowInterfaceNamespace: '9wmhaobcqx2zxsjy4i7fzzj2cxavr11gfipeq18wzmdivakwxo2b55aks3l21yue1fz4vplcq4th681uv4y4xy17ax5vbc2gdxq0q9yrj7qtqvoq7rfgtv6m3ztwkala4qmd37efzm6xlhya9ywcxp2eipder25k',
                version: 'udu4fum3cn5zhvz7x6x5',
                parameterGroup: '3lzuauhk7wesibu5w0cdkocsn2zufjp5uou6euamnb3xd3jktvcyh7rdhkwjcdzsp53tgd57y6agh1ypn8s68m3qhijcg93grwh1ig16xk082c48a7q8wjlco89fc3yj9tysrd8kaaax5vn21h9ziefj2wup34tktxxi6iioeqtyx5ecl62q8xm1dvrj5vjuw4jrdltplqnysn1ytmo5wcfkuq8imz24ucq5ydzree7bjzzn89hxlkexbl4qf88',
                name: '9bk3l2xjucg54dy4bz6unrun8y8qmb0s4ybsrcoy4gsftje1sft4niboej3sdwng54z080huo2iajbkjygr7uquu0uytfvt7aido5ohgme1jwcpbzdlpaqhuj1ifbz9k36wdijz93i8u76dzwhbuzcxyk07abxdttqvqky6i6z22l7q99ibh3518kp1xfj3miepk94bvlcq7k7p5arbmbsn1f23gyxhcee2vmokxh9eci27cyi4zhu81sslx96r4urhlr8wrsm1pb4r4gh396bv2yewy7ebqr3l5u661om46lxta8dbagqiwvyfrcbr6',
                parameterName: 'yyzf25mrz6m0pj4txtidt0rx5ei66pabzmwga6lfnxrk52jej8b3abesu53r1dncdi1x5pw7u3vndg1zx6v59vm1f5bdqf9n48og1s4z1bv05ts2xxmwekeia2u9hqb2my7akz5exbxvfsxe13u6o0ujaug7a71x6zayhxnugju45f7f31kkmem791wwsdm50cq9rcp6pj72v1v8gbfm9robxahi6b0yp030nd70zdcfhewbamo5hoospxy2x70i6g0dnn06yu4ab5y5juzw1t45t9fheqpwi2wwn21uztc8qaegkmfry4tmzjmfyllp',
                parameterValue: '430dbon0p7i5xq1fpqvwjackgamrh4w869huzgrs4glwrhnfrrmqsz6mzdyp7gfujrcceo52u3u33ua3fq158fc300zeyhsz1kloa5yxuwxywsccm44m2ft706qon7vsvz7k0konbouylmsewfgqgnv12ota2hh7tcmhyzzhp0qqaivyucfgupdvpd3emph61p457kmmgarslb2y4viirvsqoqyozw5yl0brigauwtr0sdjj46a5g3t1t7nsqe5s38oxr8tdr5sox9mokyzvsxl88haobareq5kqunk76nkrbr8r5dlaoulu7nte7md0efzn0mflc3n9rrcie51d1q5cspa69p521l38ljzfv7p301bf43fphq2qagey6mdm65hrf5nttzue4xsmd9ilstg20icum1b2r4bofj723g0hd6w7ooj0ibrako5c90wjed0vn71ika4mnjhluz6mj1el4sxs9r5ir2fkkuagc9pwt59hg7yuh3tv8jechmhot9ykmrvfht3iq72anwty8y0ajm79zekizc6lbflbeb9pjzbd6567wj1bgir8ar5pb2ffp8fh1wqb2f5aig2ou2mbux0y9wruq14r0uy5g5ne7gje0tp9h12bhyxp63buxsjdl61osqoe7vspl3a0fv4sydh2p61ece0rlsdy0knklrk7t703rol8hgmn4048hcwgjo8w95a7fpr128r3lpmy7uylp08kgjfea6n5fzr1dmmeou4m47m3a9hvlvfv0i1y4ghr0jchs1dw2qbgcx4jhrunigr5iroqyzioaeie9w2mud9sy2z2lj2zqn0xsctgjf64ehwpv4zxxg5ht1oyra5kg2azmlo7hyuw2ctceu4kuqcfyi7jazxbmsalqvjux9v9lyr85qbz4gzv35ahe9ffjv83k45igbuababvtcures1n8unrltc31rpi97vufuldq4r35u4266hglcgibbe1nmpi8y9w0sp10ecyjog8aqh6lsfo2sx16l71',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'djb0nezu9wskryux8a5vhgxjlvhj8ff1ea2vmo6cv95c7yubqp',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'x5whw3kgmom53nbscbwv',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'rz3jqqhv00uh6gv5gminoc2jo8koevinzbwod9a914bolrphzt3tex2xuk6t88hmxub2q1n1yf5o8zya89pbjqgdgvrno27yjg20d9a0gt4oqzd4324tpdobkfcfb9xk5eytf082shku7xxy4tlnoz83h6lrfxp8',
                channelComponent: null,
                channelName: 'bx13qu2i7r17w1d3sb600f59de51szl8ahr862j69ae9ufogbn09qenulxsvnumqrrbbssygoy30wl24re1867swtgpuncprjlz5b6f3ahbyh3rolci43mbpb5uv1owj8ibu9hzzg8o7svh3na35rbej4rx50nqr',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'phx1rujpqwu2zn1fs8vq2bkialccr5v5jt3pzgzawx71eapmtbls9mgvgn48hhfp2duiywo140h42jp9eymhiaugv7gl50ul2xnr0xcz6r7yyl59eo8ib1akwmiy4593i70krka2ti1h3pz7vo2swq1h0bhjvvp2',
                flowComponent: '984ki1q91sc9zitxpbncll5bbxxscs7rgwcjyqqr0y32j9e0kmzrhplfc165akynrfnvurasfpjse4649lwaxuj2nod91ct5nptq4um3uqx5xd4l26qqpss6nrhnvkhcqyv4tnzlgs4f0zah08b4qua09dgdfuox',
                flowInterfaceName: 'wxou9qjrjca7qaie1u81codw1ohcul3qv9p6re1xvfmrzy50gphlqy0pmohkpd4we90h1u262ludy0b9y9m8te3ocadf0vcjbxd884hrie3pgovbmszom7vo4eozfgy9vg7cosnwt4fjcp1il43scyuxkgixei2j',
                flowInterfaceNamespace: 'jqnzkhbm11wi0i8vk4nkzrui4be0o47j56hlxxtczxrtw2l7r4jg0kw77kqlz3dd3lk4jtkc7xf1gz0ndzejmbg51410ckbxsk6gw4aj1li6h9topy4992n0b401aasxnnj0sb3f9j32iel7ot64ukdxx725x9st',
                version: 'ctrhcyulqfdq9ena0gpy',
                parameterGroup: 'zb158ayxd0iae99p0t47rx2odg3v2ghiidx7hwf6t1n5q876735ya7fivhv3sox94hlajlcivwff1mh7020wdhs9y97wx5wcn8paew36gi5xnyn1jcd0yfdzcudejwxlyoaj9r663iwcu022t5mwbzqwwb362o7eovjf6jey2uuknqh3l9z29riufwagahmb5cdbr0h3yf7rg9ftfwscwk4yc2fuifwb53u01y9pnkq3g7flgvzpedgnwn700ls',
                name: 'li4ukwl7wuynsgblaug407wxisaoa08xjncnlee3l21af8e0j80a2hxoyuxypakdpbtimmsdncrmgwyg2ftlobwc1lbwaginphnirfnusbhitt9j7phvytnkbjesn6l0exbsalo67ee3or5hno519bv0wkgjtmhssk5fpygn9qv43jsmev7ewkg6z2ll6djahqrxnzj9up90ecfwfikhwt508regt9o0sbh8geuc787862q1j47k2kp4fgg62epntqirjsbrws3tlzmeaub0u2ccd8u0vq9edjltn0oi05915jkrdtayqhkmhtbv32oh',
                parameterName: 'qye5rgo9dgpahjx75kusypfza215ryrton75y07u1wi5ihnjrq6pi30bq919ea4zeq5x437227civy6u8275f91k4xw9m70rkeckw3aw2sdzbb8802k7axqvo5whvv3owns4kcw6u3uz9q5xa1k4yw755nw4vin27qnsb3xmrzjj79u2qqotxwthbmfe8edg686uinan0j600pkygzjg9uzwprqtmkc4k8inpr3h3g04vo0hfhwk8jncol7cy1evofat8448vmu2nu49qagezfcjs81mc9xnxpslr5r0gkv3lbc5n31ymrrzuxpis047',
                parameterValue: 'fufwuuglhd61w72raog2wutdb2hfula9dlyhoqvw0rrmcjv8f9kqjoguiljezvl1n8yeowzfqdf2lcj9fzewakl9eqpvp1t1t29nlwfavk5i9iw3a4xqnwu2m1ot99qra7btn3wwi0pu77wr6beshuggkqxpvoav64a50hx0skh81ijy1j22z69za74uxqgmq81z1um6gliow8gxm7wy7myg3c0p10oma5z65p7d27kvixlq5yduset6rqts3x6clxk5hdntbnc8e6hyfl5jghma5mtmjufcrsgbn69zm3ek1h170wv5x6ol44agaxkkvc7hhqm0q2lsjhbhy99e49eh224upg1z16gnor4yt63ad1m5ulahwjbg6fwlfi636j8uosi8iaz5kblnrwu9cqhvbnb30x0ikw1j1i4zp65iu1xv4x37g2zer08tevt0a3l5ktx3bq48qb0019moz9jorevenb61m66ynqsizwm8kw3mgyh8venxt0tiiryg275mqyof61mhxcv2wqtmce377onjhntth5bffkiy86f5g99ld7u4hdf8ry65rzn73tb9su505lqk8ugy711o7rt4ku81qvm6dkt220bp0xopzb758a16itqiuvne31eqxg7m3xucprsa1ourluzy9vvc7qdbztgdlzbn83icprjn9ss02nfa4idi3xxjb14sov46mwqioaz4eo40w7h13lrf92kjm720j3ptxe6xd0gi4w8xlozwrsh834ov8864gh66uy81qo30z7chew6n23xn8wmh9xxhnq4zoe5w1lwg7wleaez3ueqnkeqw9scvufo9wy2kvjst90jggsii1z0mzsk6xlppt4ml76bnc699gp9j6mmka95qi580gsgrcpvp50a3cqoz87wy9mexkuvpulbt29lggknzremaik9tcbzs9zjsk26zumh5c7x8gbqzvja9mqsrc2x1yc3l9dtgcmocuprxpskl52c81svaewi3w1jdnxwi0hqks81u',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '748fjnehzfjobja7vocttysuboey3z0slg1g5ce779veg08cfi',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'bytafyx9rt58ygoi5rqx',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '9imqwby3kq385dcyysb72yiy7jnareot1uxa0o04i434fi8g1ehd1rt45tz8mm0bkgc9jmg8klzpvgznopzkzk52uju4vgf2advttcvzeg50fhdih32s8cvpvmwp0bqn4v9e1kble4jb6vgn1z2nuocb18i9op9u',
                
                channelName: 'qxwt91p7uiffwkhx2yyboa4u4gl30i71bubbw3bc9n5hz8wb3pws436qydwsxnkzjavqyt5cnoadnvsyqi74x9enwjyo023wtq6ybpj6hngfdrj3glpkgpxoulm1lvizu5hv9q12lxxeo4cqny45wr7sefp3q3t4',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'chco1i11ymc5dd53lwcd93ilz4p0qpr04roj204mu22mha0izj3sdfrc2uohq4jusqvzckmobp3dk0q6osch1ou7q02ryjls68dir49zj1lueicpvg9ea1l35tmcvtw71fq8oil2wjh9x306gvk4f6zfa1xbzcu9',
                flowComponent: 'pmqto96uqgzqrgyiziefqplmcbkl3cvo4rdxd5thr0ijsppqt0dsa2qjaur2t4mim8ndlm1rxm0nawvp9spppjdkzuevm4qr733l7y9fr9r3fczwy0ip9yxp8q3eq73j06hbo9frqxtn9uf0jmhqxps1a1363z7s',
                flowInterfaceName: 'gtjnrzr8g03guyuig0rfuikogcbhxp9oftz65an5b3cwcv8vwi7ok8l410h7jww945228u2ckqrjd8cuvsmtz1pt807ms1v6hk01xpwaepr6oqo8ljn2scf6ie3arifzn21066j1u8y6ctr6p3v0bu30haisg4t4',
                flowInterfaceNamespace: '9eu53w6iqtsdilv07qs1t5gygx5v8cuyjxyetj7qi3pib4wc55xmipib5mdunwjzzbpl2ys5n6xx07on5p52wpzzierb1edmet09dvyfakyi3gwhmjnllv8cva151i5cbabq2ejttvlny017e84quawpdmkdeql9',
                version: 'qyqxrpey7k6yec4jzz8p',
                parameterGroup: '5vrqv9lshxpsippne9cr1w8lg5wnrlnnn5tx0uboyf8izspncoonbldh5jxbsgplf1yssxp8pmc6bwv33iamu11jw7j8p7xs56d0ju2dctnrtlp6n9rsvkvfkbp2gdmgw8m1qbsdrx20x546np306fy1q10zie79n8qo34hcgfluo8hp72eyh7b79jxdn9y3f6oi0q308e0h6l4uzgdbmhhuau9dovcu5ehnw3ateepwn5cxe002phycu066xoy',
                name: 'r3p5s47lp1h2orvg1cjgy1dini2gsy7apdg92rnhtiz0x2m2l2mqqahcmt2k5pf830vq6tlf61nwlypchpiy1fyfd76npts8sh8r5vci6237jplb27i9m49211gu5p813589z2ql5e9iv3oj2xqroovwz1v3zdu4fek47cfgrf4h07t1h9cu4nr4udtfr7l1zycxzkhabmdkusm2v0sqpko1ub5ksu3r2yx2kqqtf23n8izgjvzf4ym6rcctx79x65lo1ezhtk6vokdfny2ni9acffqzfa24pinmzizkxra2ado3fj3mgdtpnf0gqrv8',
                parameterName: '08z8xqhtyjb2f9xp5frcwvgh3mj6t0tptyr7owj5zz37gychjh3jv1z8vbcy5nnoul3la0hvipfah2y757r20f0g8t7fq9w3zthlpb47xhfstasnnrtgwxkhlzxibs2jzyjdxvm5vfj1gqz0fvahcw7hs8r1c8slfq1tvvq7n78eu25demovk33z4zpcwiev3u01byn1llsqlgmjz98p6ht24030bt7lizqjl5dny4r1ovcwfq17orac8tme33kuwn521rx6biibg86ct4s3tdefs6i0w8e75xqmg85yhtzg1frvh0795cib0qp4fmqv',
                parameterValue: '0g22iero2a0vosfb4ipc98ky8tf56b209mz9d84538lv6oys1deol4idaeirqbn1hzkb4gge0h9c3yoxeofynxrob2pwkl9o59uyo5fkw0x7nokul63otn3m01kvjds8iw7jmu50zv3g30hdprlg6ipj6b7ky3kzpvyyx1uepmpjia5n83y2hvk40w6z0nogg3shup9xq2c0f0nhhz3p5w3t53fb2pv40snfbnw8tcjxwoq0y81xmvzk88xbkiux1qtls46swmxlxkz1y4n3l5ccvrl5k4hve0ntmz05rmzlpagqbo50kw72hukvbnshqgnhaeb0201kej9doakyvvep684nre5fn6n3v3b6ma3eq05licbiwx6njvwhcrptg25an9g2a0xree60962pcw1cr6zn4cqklb0mgvskqphfsbhu6j5jc7s2bdvkrpolor9wqjp50mxxsb2cplesii38ys4h5hegmcfk0tdxx420xj2mnl5b1tq0jw0d59oo1j9ayn8zusngor55iw7147vujxs4zirz2mis2aa4zdo6xx7nvsgy6h5ubb1copzvo36zrba5psirhrzrygz92aqks9ybrrkejh8ki2dyjbdvhmqz46xuwf7u13lb7hau19hmgb4fxf5mwpu7pzmt9ulszwzaqd0pkcxp623u00azadqijhg2ktpfeu57g2l5jn3vlo9ba2lp25wmcmel8n5owlc13fp1kwda740zgy5bnr4co9a84mbqdc65avvkt4ui4j6utymuwd3q5np2yswwm5avixlub437vp1vabz8v4aasd5khdwe63fi20e6ivuy62x2it4s4b4ri4m0e4z4issdjhkrdjz9fvjubroucv9rddgl5qvfcl9md8oe8nea2hg0wsxrw5ez5aitocskoz9w6u62ienwi53cmd9brwe6eyyednhem1zt3c83tvcvsg6aslgfo5o3ibjyzvce9sfyd79i5z3cnok2jfk1a85dml50vr4snq33u5oc',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'alg799xbxq8bn4ngzx9fwcyvjbg4fv7qvvu01jbkoaotle0vvy',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: '3vk6li2d6q532knmwqla',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'x56387d2p1xooaouk9sx4ralgiz9myoqg9d7881tgkxnbiu7gjvta7encscfq1efgjurt4m2v8r6nypcganciqhvg1npc2dup4lcxey4kut197t9ipvdbt8d96es4ojhhwf4prnm2c67e6tslm8hokgqdclqmuoe',
                channelComponent: 'w6y89aeakc95vvpcxvt4rprvyvoq5966abzhhgxefeb73tji1on1fcphoknl5bct7rhus9v03scnnfv28lzn4hxiec7nww95jpjpflcnypcpu1yattk67f4w2uigscfel6814db5uzke8nnmlrao82mhkgmmsqdw',
                channelName: null,
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'etytsh1ggot2i7llu5nofyq81264znroh26bkh3xf6mrdszgth0861b3edrnrzgv3ia3a0g2hk66xpvybp1zrntp8zm02x6him6rm1b1cz0eaz7cffa1owqfvaszrhu1plnqv5tl86wd9gkccjk9ybqfc5gi5agp',
                flowComponent: 'bpa65nnwje2zd93fjvuc80gukmvjwm8ivujfnzl6u3o26y7tg3k3f0687hoattqv6rwne18i0dgk69zlyrvkqctacvm23687p7y2zrq1tgwgsy94103dnn41ysd273i34qxt9ebsok76iaesmydd4enki93qv730',
                flowInterfaceName: 'pgexyubzabllytojerl3d1yy9vkyes6nvrv0ceoscrebjg8fvkpc8xid97lbj4kct4vwpd70ubzeozjaixjzpunndeps0k5f4wg5rw9tnmgsgbt0x030jptv78f1c0ee3n5tvlofne448u6oosh1zh1h6voair2e',
                flowInterfaceNamespace: 'wnfzwrbtr4nzgy2znipym3d96iw5cdvm3vvtkphn8tm5dpaoflgo51810y3ujeo7y1omc0ol0lcepe2dsxzhiz09nv7uu5tfhsuq40m96z5jt3vr1gky8gpet3ld6u3clxuue1tuhixrwanc6611j077wdvh0wlr',
                version: '38pv7zrpe3ywqwfbs8bm',
                parameterGroup: 'in47sik58ubk0rjazt4648yyjrd3jv6nsko5e65jengkuitanwhbvhr4ayal5ibmtrig0ckcql8ur08tkxvcfpxgqswscgy4424epk1x6fpxlyoez1ctumaonrx6g7q49qldejrxbbgxjfw9o9xe9znal0goiyavtzq0efisr1ow90xyavt5p3hdym9c1qhr9iocmdh0kog00deleyrmyoza4d8esx3wbgi7dr4fp091xenpomu630v4t0tuaxr',
                name: '8zk2azw5hvhds6jmyopg2ak1czbqbne4579um750qe7rdmqiophsakzmc0p55290kc76hb7qg3bmoajo0lhi8xnl90cnbnqsxkr255epmv82wz5ofln0e6cpkdkdf5lkikmg0l660roqdrjmtfx4a5j6lwowk5uulbws2ahzdgsop6eqwlyxrxy279ui0gpud22gdwnkv2vuydya0z3p0zoconi46eoveg8pawqd44lrzavhzwl5vwgsq1ueia959beem1ya1kn6u17ko1fzvqmqtz3pwbpiv4li6ylosxnxjonhr3qb16jaxkvpk367',
                parameterName: 'nmmlft7g2t30t8ty0k116650zlbgwoo3ycuv05htepd5nshcfss2rv5oo3vsves1v72jc4nkq3uv9qvlvx6wbv3qcuup89t8y47dgt2fhaxb1avb3e30bfz7urbmicr8rndo1kgzae3gi4zumbpy59b321a6bo9cmckhxrjo651d17rbnvu71k3h9ws7noksw5tm7n7b0m0lv3x8qucoq7psyao5jcbivd9lwtcx5mcpu9rt34ccl4uwv7xowhqri0d7ylft8jal1zc27i1rn9ftglxzjcy5vvzuezfyvgh2n2c6klwpvasgdeizps5a',
                parameterValue: 'obgpuz7umocc6bn8y84uw37f111k5a6visy6fr8w9v9qbkdq5v0kdqgj7h099z878r88vz6053owmu3kgtaohzqf3bar6trg1g3syzj88nrq63r27cxd1vqqrr4smtfqoceq3gq5cwgjgr1fp08ubz5erp5t1yeystzcfwah2in4w3r9s37vpgulboq67n3u0pfujqfe6474vdr7uj5032v01pdn5whxtjykuurx2r81oa4ve2w75wf0xuoyeow5bjernk5ja15kbwwsd3roy1q42zs8u0e5p2nkwkuhappuwvq0flb518ap1gmm9n2242n9mcyqiebc825ec22o8yubt01hhvsurd4bnccev3dgz66l4rsu3ylb20ug9igzilmh58irjtx447w0x3vay40s2hshau042q9niytnqqpdt7qdv7vffh5ntkxvu3206cyfihifiudws87u5ljai7lsncrixt41w20l275nm0xe6002rj0bq6558q6djetsldzf285rsv63xbk46p9vvadkr2faq6gvumz7nijja1mn33hytq1rvynsam7brbek2j64upkd7m90fyjbeb851tdzdhnh0fdawf979y9upf3q3vhttgfeaxf8u4g0ce4d5926jjix0ia7hexj59vb3scr5kiim4bj15ft7y879sywgimi8wu9fj3kluiyh3bbep9c3jvsj7uqt2n94e13n6nhxhc5xnpr8vjukkoogipw57yw052i4wn80w094twhvh3gjl2ihcqn0kmqgin8igikvnal6axilq99rss53zjg06rtkxq7d4p1lik4mnj09zg5pit67an8bwoa9whadche4fp6fwxb3x5jzy0sjugjsw9eqqafnr20qnodesaj4vckx7w19aalr6rouzy553aady99my84q7eyqj3rlivdk3zblf644j337fh0ptvko2yvzg8ajngrpbhss530qzgq5xngxa0603bmjl8ea6m3g9pdqi2231aghhnhov01',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'ui1cncr5meati3ko083atz6wqhzz40bwuebglhshayrjjkwpji',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: '27lovhecsv3zn9g27rrp',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '2i2d5no7l2jz30xzs9bxsoaty5gu7jh0vfhriqm9ncvxtn7cdoraq3g9igpx9zdfqt9arwnq8drez6hbbpz99oluvs8y06l6rx8opk8sfrfzix9vcwck2qm80uyuqyyjtqst25fq7wkul8tyzsm8cxdmqj8rdn8d',
                channelComponent: '4glzu2e9fu3z0r13j88lnf6v0ytu93mkx7pptlrhvluxxj9nzadb78sdq61likkkt9ixoeahgkb112n5h20c46y6x2fo6o8bb8dm055t8j8ej4tsvtdl0m4qlnn7qsxxqy7ydjvzzasnj5756usefsfh3u825wbj',
                
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'h6jm2duoadk7e5hq56c4jx4xxybrucpmltak67ho1qdw646qdmqrewuniszdwoo9q8745mtcs2hrttwf1vcr7ko59y3i6hkzy16zti59a3f9kf0z05ush1rmm0cjwzeekxsbuxv8a3u9z54kkb985jlojmty2oba',
                flowComponent: 'eb4tewd67qv8sx7z850nx1saab3ih9qgecl91gw4gcwgpwj8m2ww8ffai7los1k7dsg3k8moj8e962yi6knbfrrvaur0hes9femt3p83awq2uwqxensq1yuoz4elamnt8hh54qz1haykkw4d0r119zn07fiyti3e',
                flowInterfaceName: 'ovcpylgk490mic7mbd6ju8zwhiyswf7n2wnbi6lr3wfnainz2eonqxhy3fkzl34o6eysuh6ycq5dnzy3vmu3a654fsiff944vh9mzjq9qsml3ex8rxuvy2d6a8pijvfj6e3cyp3ydnjevz80qoprufn8i4g6b4lj',
                flowInterfaceNamespace: '19tcjcyhzy3nts3xt5k6pg0h5k0abqqkb16brsy3dhbdcs01arfcrlydg7xfku1mrkxnz0g1y2bycuuwcpsoaohuxae1vwk4mjbet51wb2ctohvm9b09qzfn51sxag6ndjcefbakthu877r7bwobv2dp9v961lgz',
                version: 'g6dtv075twv1jg79tpd7',
                parameterGroup: 'pf3wjw0825rnshxy3dlfs1o7oqsjmq7d8ip9q1dp7ptvxuynu6xwd1u0qrunsqlvpuwtm3a1txfi8giwphaaimkhib3lo30lpf1mme10tahe5v7xdb6hnbzouuiam7h9w81c2u8he9bbrux8tc3mdjwxj1xtit6s70jhk9boajl61cc638057c0lp9pc7k3082s84u6pdf2cbkoog70801u9m3ohpflis6fm3y7h91deqjd76of6g8xyzduadmv',
                name: 'hayvdtjsvqsavh5tx7nj4sw4l5a44646plqf30p2ildf1s99decrtj7hh4yzx0lomz3x0x9t7i9mkr4ijrlijxcx78pq5ow3wo6ofmpn2rp1evnihzwoh57sg9jdwenvunyxmqh6ncpvoww6hp8ncc2aayj97wewshnnuana6mq39ram3x6ry8girzx2n0hlomm81bzzaav49uofuhcjo4ut71uz440e37y4s19tu3rxmz1uyxf8yf85i85vu7rq6plhl50txncia5pl4sshepq4k9tydgyce9y3v3wjbojwkttwxkqcn60590zrfxz1',
                parameterName: 'katw5smhdeiokmoysdg8epst1vb7d9u92j3i1bs08w89d4slsazgcd3d7elwxehtj04rhzmxu879jef8x4cncrtib03io5ku8my5v0kpduq5zgbu1mwog2gqj4gknlg9oqsttcc0x7kj440341z35ddrm2s0sovr9gyz9r2pao3wn4earmm5utjk4nu4vqbw2yjh11d4jxdj77mm1ugmn14sw0t8nnnfacr9xdbcrm3jl4lucxx6ws4cw3hwvrmhtskvfk6pbraqmjeb0z8br0lqao9j2voos00o4ts6yfr1zmsedt37tl8pssmjwxgx',
                parameterValue: '7z0ojyrfi4tpzsrvq1vfki9gjbytyl5w7ojfdl668qvrrd5dxd00nogj45zbqrvu6zjxibm834av3gd2a5lg21vntsm975dkl0utqjeeop0ftnhuugniw2a74pyamtmxcchshp0qr1nrulzjd3ohzpoy1v3na2lkvohenb4nhr4xqy1167huoykfja604xvxokk75vhnr2ysfysrojlvhn2rct93pj3yhop6hmq4s0p6yr6yxglb04md3d9mdlzifyyaxhw5bcbdxtixjm8lcssnops7zk63rd1m564a9soo9e19lc7bt8qq8izangnpvgcgyq9axctbm7pki069785axp324rst6q28wpdh9srtizfq7j7jyj8uhs51t0eg1g0wdlyks18h8vfknslu1k15l26jcr2n80u61j6qge8hi6ddzodxqxp391jlj9pqiftw986hczma45bqywxjtqu7o7a86lcgdmfbend77z8vtonykpp0giunma4pfxfh9lmouctyuk2rz04q488pgml312mugvxg6lu3mv22lmnxs1mf7ch5lg59xsci70enbt7xlonuanxb5simlgzqx19uigqfhw3s3172jvb9iqkefueppzu9coonep2m6ii2jffe4czh9gv6pfiwg7f745d3kk3ycwbblpehtzmjif3d5x0cbi9wtvy1tof88yyj497melmetbi7s55qprp17qnq4fef4sawt8qp5rghplse8pf5kli8lbi7sr0nn6ycpx0f4ge5misfb7ughxid9pl33u9cinwl111w7h33wtqkfk3l4ipv2zgtzjvas4bln7u0exwsxl0s5acr1omg0qe5b2xa1gvyak2etmxh84ldk9d42u2qicyh6jas59fp61h8m0buvrf479n1rvto4g4puz2mravvtpr8sreyx665tgqrjyml12mhnsk5v7jb2rx8acaqztimua9kat7h8su4dffhmi3lvn7415ybtdt3nilsiy2da376bxn4cikf',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '5k2bl2i2igxcuux0xqerrn1g4lwvx3ttbgiyixkpei7xxke9f3',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'aygeg9mk1qj0xzw6hita',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '5a5b4zfj9f2ybta94axy7rr2i7a7dycqwu5uuk6x52idv3hkoqeooaao9g5csayqeru6t0i416xbxvkmjibgcq5krt4pbc1aj3owf5894srt2x9yv857fi0s3b02fk07aip70z7qiw1iljti7yjrxy23ss64kc97',
                channelComponent: 'st5166gf8loh2put5ngwebf2pj1luhkmh95s7k562inxzx4nb02gv8jorzw2cmhxsaxefew66bn2mlzantew2o0hkt49ttxx5wo3ag41vtwnmb1dpl0wdhvme8tjtk3clscw175e8jti09z625al6jv4cyni98kq',
                channelName: 'wcnj8f4mdtsqo9j0r5d7a9qmf7f7qdkxiz4ncxzjy6gmix7kfk78jeyewkgjyao2se9fpvih6w0ksb4ay9tdq0svx6ubuic3baocnw7ifs9uge8jarccta2mpj3srgavq3l1j1yw0k5ifxmagby7ctjwz4tdjsey',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'ucqt0ezsuhzq5aarywfgbtowtfifiyupbxtq8iyim0yjx7qvmmgzmk36no2r158ijm4bkl7l5gkx9i6wtnx4s6gh0iroxvfqjxi131z7wodn3x6jmji3buag3gqc8ptvas0ner21f5d69vqy5et4muk195vgybqb',
                flowComponent: null,
                flowInterfaceName: '66gs8kh5fhasdct6iy7xeltyknegl03rpxfyp62o54raqhnc7nd44hffnce4imj3uggfb9e8b2yg0fbaqswto82gri2ds3tziole2xk0112k5qxr05cz7rc6oo3ybtbn487fd503k1291944uh2qak5kgeebawwl',
                flowInterfaceNamespace: 'd576pfe65ntiez6xsib2oflj8hep6wm9mo689zbvwsgsbryczlujn2xdsnsnce3khlgkc4eks8fuf52cal09z2fxfp6mmcbdah6hn2g07cfqszw9ilhyv0ostjwbiutyct7s5jyybt3a324b10zl7hahfna9b268',
                version: 'lekuufwl4z7g3tw8v59t',
                parameterGroup: 'i8efipp6z89ix5xxm59t7rq0kwirm7mx0ul715w3ob1wcuy2stns1v2j7bteui3i5908s6wd32e8kgtybt9yvmaqn8vg4wl7k4uct5csbx2xkkyc751iwr6jibqy767y1nhf4sot4cigcod2lxep43rovzzae3y1vcfn75pcxxjm26fvszkhd9plv7dq3wgfx67z0afcus8pnrg6fg8ho0qiayhr4bgx44gcmfn98729bl7e58w3ogqndxbsg7p',
                name: 'mydnvykmz9n9p4p9o90rvq4mh03ljupg2yqhtvcx2j315fy51w13uklrk0dtz1ww7hejbj7ixzlmfaqrgnqurru6ru4pskxc6ui05oe3j65skrrlmtm3ognqamxe7zve8g1u9o3v7w5q59q826zo29723xb2jf8fnngra4rikh9c30p91nx4c9gr50glejc5xp10g48gy78y7qcx2o0b6r7atiivi8tcl5ns42g99rfkjhtaz9rprhk973ttqcmucya9deysy1vjbgkewmpy690n921idaltnthw38kiad8bazd3ps6ijw2lt9d8xt2p',
                parameterName: 'it8hljw9mbla3z8g22syc4ovzwjxu2ak5baem68hrblh50jn44siw7azdcfwimubi8g7drdn59x79l17kqscv44n77sx0mih2ry39p1a33foztq4ksit462ynpucmf3r4sujjz4bqdpbgg3paba9y5pg1d8in2x0an7rrenqnc8d2gaxrdx1982mm8mgm62ng8g31h2yj3b3akbyakvgfj65t2t1iqxl0qnn3mqbrbaorj0ekbt2giyxfj7zp7wrerbsckvck0w1mab18m51qd1gixe3q4yseiymyxxpb0xk7su8s35hv3czicf7e4bq',
                parameterValue: 'jd87w55x8gope9mckq85c44s43ysxz87r2pv32nfge0q071v0nd7cpwlvhhrgd7btn78oluy0g9qnxxqni6wfpfyolabggtb8kha8jfk2uuu2o0dtqjx168k9dt9v03mke84lz4nythgqd14z06c2zg95mbzxmr3d2tifubie1a3kqpvuku33z8vie3d0qgvp96ff3ujbbz7746p51wutjxcbwz6kt0gabpbtky3a05nrmifne4lojt8ep04qocd0065991wrf300x1p5od76wkfs5xw1etlz48a5alf3wgrvwdz3jx8oadqz3ym793vjh4am8c8oj9x4hlsizwfopceyup948qwhjas9xkjwf4xnuc8fosh5w1n1y1jmn8hiel0094ot2jral3z6u7tl7yew3xe5wuri786pu3anhjmt81t6n9y8tf5frcwya02hbph6xcruuyc5epputb72m5hji7wbfr6hzxv4lzaxmzxhy4mxc0ws53mqcrxveb40ak1irzmnz7f94ifulrxyniv2trbza6z54phas52wguij75zc4bxfekz3i7kb0f0x58gg1lyjqhl5joj1zklj4fyw4edx4l29l6thlk0yr6q8sgwoeyfucbjpuwm6a2k9xtswnusqu2nqzs4aurj2x82zg5z11rq6wlepso78939vuj9432jl77znne5lrrgedmktx9c51zahj8rbama6o9hozono0608934q1b1jfhtg6ahnv1jcab9wzhqchgojmcfs8ckw7no8uxoqi0975pogkkjvxd4wzsphmdvwsdpyvuyx2w9d97l5kmcxbqs2ca5pl9mn6ic2olp0v9ihd1uwnxo2t4q1rfws5sw41p1oges719yt0vkrqhfjkdye3xif6rdrpah4nq7doqxvcn8jghpylimgo8m8s4z5yox2pjvybyc52wl11lbfv76nb5f224z7v1t4waxtql04l230cvm4a5167s0orpujz5rw21raz43j3lxnc1jkx0v',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'rv208cwojjeffi50dvuv7gnotmaa4rosnxqdd5d6h9qpv8hxip',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'gbwjkd4acqzn991s40dr',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'ls0ieoogyd5kwr550qcgayzihwxpaybe878v2jbky59cp1zsbuqv42ucrwdb56oqqddo2ok462uv86t1v78ikxkmffxn20ca228bgdvfilp8fi8uha6mxbmduvap51cd1hh05hrw3zjwlspnshjmsdln0or7j0dg',
                channelComponent: '3b6ep7ttuzsw8kfpshap2u6b4namd175bjr2owb9pzbkzjj6ydx4a3mi0bdi3rkmkzg9h73e5tonoqvf22rojrgw0x1rduhp5goq2g1ric3mmtb7e0wu6f93jsg1aqbehnifdj8k8uethsjwa3gm97tt8opi0vub',
                channelName: '44mvhf2306piu8wuu9otxdrwef65gil2q0jsotrx2mid777sc94gh74m9skho3kws6uclfiqoiblr6wfrtdlyss4edyor7qq6h01ier2iaufeqc696n18457k8zlzzuqswtrbwigb1rmpnyzdabxyituwp12c354',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 't8vhtt4ff2pvc8tv165dnp393ljvs01nsjok7ujeluf8grauuj95rj53ecclpff0rb6l3uz0a9kadtf4szxeyqdpsabgpu1kjdnqv62g42pieq0j2nn4eajx8rlutodxw6x3nqymtorj77qlit34jarxh8x4vtdi',
                
                flowInterfaceName: 'chb7h36btmg6ty2du5ircy6nmi0ru6lgmlu6199a45uyxgknwf6ryw2cdjetp86kqnx8i7xdogu4paoe62yijjdjvum8zcjz3lcl4ui5wqk2p3vk5960wptfg64epolqoxk2wzv6xd0msc9o5m2mt8bnukjudqnl',
                flowInterfaceNamespace: 'ahodj3zs5cofutaudex4nxx31nfzrspkdt4pwynsbm88pn7t0b9rtto1ouph4ab5tkxvtwp7m1d0t45oc631sgcu3cggt13zcrac3nr1ipouxm1tj4qxokhjcoc3y7q50aqb0wkhw24tavxbwlvrmydva5sr2kiq',
                version: 'iqng4ewz112c4xudu6fu',
                parameterGroup: 'vzhlcv1yabdx015auhoctleiatezljns71rbkuihr9k4gutlu4oulwuyetvojzn4kvzgyrxwprl9p9m89nep84tdbhx0m7f7airm9u98tw04fa7miwqzhwuvcg0ugmf4qe9tyh7lpezb9xst7j4rm2qp3diczbj1zkfh57rjmkt8bjnwge9cf3ajocrdnfx07svsu5p89tnat1bblp78kx8qza9bc4fuxfooqq6qnksabekgf6z86fe9fs9pcut',
                name: 'vrykr3atuicblr3kijdcmjbdymqrz7nudo43kvfoomz8dwa47j2wxcboxz0ekov2grqm2visg3nhqjn5ublftss9aofnwmoyajc298x7rrwe7zllubpjcfha3zhh9923yrs0w14c79ltpz0q3bdxjqkqq54ghzew641xhoz6241cmey18xp2qeiwuwpuls2zw2w922m3htxbikh0bhuccp7o0un98q8glmcho3dg626a41wo98x9eehookjcqnopgvysx2q5a12k4z21r7os6lpu6nh2v4zaso0hyyer3waet90rrpbicncznhwhbwp4',
                parameterName: 'nit9wju2sm6p8fxxphf1v5sdanwmex8v88mbnn8pz6o0hqvztipea7u9b4mcje4s9rnb13e7toizjdjuanalxw0ffsomguiw02qld3d2tug41w0i4tkumacgwsv94pe5oa4bnwkji21fodkdnwgulxuojvk23o5kuibouvxslkge400tn464aqwdpoamtcjmb97lu3oltvpesaqoiuhd9x524dtl09jbep3ijam7iojv1lhpi000o8jx5k5rfnm5ziqexu5rckome89ho13ed4umni79h5ge0w582vk3uh6hj2r946fiy0gqna9xhrdl',
                parameterValue: 'qeay5w5u66vii0t2uyk99beqmt7xw8ht2cq6euuxe0d04pg7jqlec954ahaqy12hb2cwslvovhtbrz8ri4munajvqjcftyeu680bw1ghjpal3013vg12y6ss5hzgo2bqxt3yn14ju7jaqtbhfdlxyi0jm0vjnprsbliuo7rgkakno8qe5qhfghp2icwkacdja07mjkj1c0puplyxjiqs9w7l0v8ql1hlaun95b4wotd1jdx7fol79iq23wr8m2e1ygsavbcnia0353q1hqjzai8rk51bjyko0r9n2lczdqa5qovaxlibdnz9rutwih11p2gh7urusuu66pbu0ts9q2buao7kbwgvf3goyvx15qv7nvnpx21e05jjrwfw2thcscin479uba8gaskxnzfyhwi82f674cuzgfir3c3sxsaomwhavecsmf15bzlfmgtswmb4ygbh1pat2kb7ou26fb4d248bwgzqnwpv7qpypemq361ucosumfewwqdtqgus825ai2t941a9guv2djcbgl1sna5r2nd5wblkmd7kyau33p5dcz7ur4bzjkioftk1elem70nq1vvj3afq6m1sh0zgrb1pa707efkkdf7gozw6hxhywy2reh8bcqi269wnv3tjzqbcewxroy83zirvyyudnj39gmxzgp71vd6mhnjtgzuftlurytaatavyop7ud0qin3y6h2rgdi2mcer0zm0p091oimo7nrmxzvwrbkgqr72476v9x38gltf7wdgtvdcpywq21iam8iqdbzfwloelt4ct9258oa4p9qnvrlxnpckr9bfvl7yj9ddn6wxvcb2eoq3brb7dq34ax0ne4e4enm22rnkuxtq5tu77k0b73elv4ikdr0r6jo5jdsem0tbb4s58sqbn0xag45mjkupvhzf5bdemrtmmk2kkbvlhxkjzuho8mk6ddvoe83fgb67t61g43e9hewt5qvwr9sxlqfolynw0m7w6garg5a99z8l1f5vz8hx0nfxl9tzy',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'j4qt2cbnqc0fbmm5jfq8s7asz56khkcuu0tjduurao0w1b6mhf',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'ui5zovykp450p09rltl5',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'g2kxagcdqrx5vga59f1ixhb5lln1nr3y54l6vmjby0tf1zo9n4mgsh08hn8kvy5o3429cju4otap6h3g8lfk1y21fvs251bjiqodo5vd9dwu7ngjc33xxikhlfts8j7b0fmds9ngnqakijms2p4cq6gzub1k21pd',
                channelComponent: 'llvox8w2gtxo3vctbsad1tsq0t129ejtnamxiw0cos0mve7xwv2mjyg2k8ocq58oqt1dtxmj0xbswbdq1hbdf39n1r2qsl8ys5f4jotavnaroji01yudd5ea6x24dx1zb3o9k3lufhorostqyqwuex69xp74xtpp',
                channelName: 'qf6li704s7d3x5gp1tqjnidt7a6j0ww6k7aq6mtufhxikrs65y8w18oem4vq9fcwy46qri3519hlbjf4xyeti6hubim6rp147sca1qpeumb3j7sqc4ahjutxvuwu574xadp35975gdjd734s9pjvt7c8bpvdatix',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'mm1j74v7po2848fe4uh3y8pvmmd3scgijqsz01q5kr2stfm9xtnewlm5rrjypuc88w67hivy334864whymfn1he63b9sujcfrg1kzxuisr0b2fhrax5qcngmwkx4mzj0jpdblacf4tz6vvw0anftx8odar7dv9ac',
                flowComponent: 'ko3aekdnfiy7wtcfczyzkyykkplbql84lm1rjwwaa9q5yuteljo0votoabdejmwyamakpetvvvkak7i7d90ild26uf1mh49fdwaxtkgdlrdns12feruonzknbtfynrft1ee3pq0n8juvr6txnlz3n90hnv49cj27',
                flowInterfaceName: null,
                flowInterfaceNamespace: '96gbv9tfv2674nnrqxeibs459e7myj7e8w6t1mmoqbf9xsibh2s29chwcug0cd0xxghck959n69h79lnyx5i5af5zqn5r21tvjyigui6btyx5yysizoijcg1at1sqry7nyiuea009c9lbk7xoj71a385y4k4jgig',
                version: 'c5eowsy8szaygml831py',
                parameterGroup: 'gd8q760i09k6n7vb1rspwlmv9fezv8eh3mmdhvclmv7rju463ydjrxh14ey1cx2opkup95c92w68us2803cuj3h03aml1gl33h6ijrgsne1yuug16ugx4ogffd6980szq1j9ssqroggofshvbj6mdjted0ax8dus2rvwwr4yq5gh6onxob4k50sipimk4mhs1kbi2nnyhjpjlur6cfs86w3f7j8omjtz5g39d773tsffdj2qr1uzy6c286zqwnv',
                name: 'kszcmcpueblk10sh6nif7dgqgncgfgawhw7nu0xb5742yzrzhrydid6y7xam7xl84112g44w8296vl9a1259c9ciy3f2n3jzpqxhdt7p1zhsqj20tx70ks6qnpye0fdj6vu7lbrojent1j9xotwg3rej9t0vaf9pxeik9ro0ogj1m7a2gp4a8sy71orja6xvoovh2ezf28fqzmw7y0lzcx3drt0f3jyp9u3zdws68xitsxxn1tpmifuk81w5dw0koi499e9saj2c60wz4ezcbe4jc1q9c6rc1ebtam27n3z71pgshp5ezbjn8f88smhw',
                parameterName: '251et7pnwex4wvb0s3viavqyt4qhfhcvm4g4shxlmalqs10b9j4etxp4t49uxiq0bo7e7h5juhtrsiwbwxs3kmjzvgcqern6vwf1fowga0wkoilrt7fjow6517i08i5ok97hmv351h54gon1g7r4f6fyp9xt1yldi9p5l26rwgl7nybj5lj9s4jh2wi7x91nxel8s4we1yvh1acxf607h6k6rdcakm3gi5tzobh6l9ij56a11en7f9advtcgr683uq1xs9u73jm0acnu4u1as71fg0r8im0q5kljeobuajnyc75wovpy9dvu7zovher0',
                parameterValue: 'zwrntqcnab7fmbh0hvrfxcgesf8xejq8vqcgyvldda9c5jfoo6bb60t22rhwaiaz2vr4lvfppaoulbv79mj5yp9f64b8ezdsjg4v6afywbm8glf3mug7170kgq3qlv53i3u5qti2kvegauq1e342hshjifkxvj0n7foaoro2ultw0v0q6odqi003239ecdcpo42ngexpsjct5xsniil48xdndygilo449aph43gb6vcad0okvuraz5g3b01rknb2lu70dmwb0m73w5cjun04vg7kxketlq6v0s4wmvhs75xsdxbdjpj4od0ozuituktej67dhxvuzq9kudeio1habkuvybnqmkeuk31079dfa2l8pvkh4yobalsxpe4p74x2bhumeghvho0102c41w5skrbqzlzj380bie22n3bph7xd7sf5ts9b1kwtojtjpzxt6oa4xm154uc9fx0ao2gz4x3ccx620ydf9bzhmhsjku8m2nggy4b603nhc73vk4dc7k4inlyjcin5o8y2ogm38qbtk0ixk1ef4kpcvo8j59c50ldorh8bhln2cts8j9ihdzo2kajtfdcal3xtsxmavjmcho1d0107emtq8207plnrfki5p7715xpt2yk009dbcahd9q2yxs2v5ihvgatxw8y0rk9s6x3gweagj2447pscd1n6605om6epfudqvtm9i5cfm3405dknp4uipzk0wco2594os358l0jy03lmz0no0drgmobzo5t6odq2ial19mlc50gpcthvye5ehw8s3auvd5ii039x92r9dbjxn10gueea9btu6b4o38fki60fgtz1r2ereituy44waplrkr6661nrru75d5lft94sogiikj2mu528bow77l4lq5j9ijyzmw2dlxdc01iw2os8qke7moqracy52ua8l9rp0uayxnik2fcuzwd6ly6oro9home8kmz1pcvvd2fo8xzsf6i031vwk1p7bxzhlnc2eu9hgcvel7kdjdabq7sc5ttw',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '4njj90ib9dvr568hdmke20fp78anm6mhi4vnfa443lnlzu4o5m',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'l75kp9d765xgdu66mzda',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'u8rdojew9rxunb5vhqmsvp75k6elhkk2fth4tza8hfgv5a7adb00tzvi2y2wpy9p5f0mgwpzopfui6q84xwbnfttfa1vk9286e5bwlnd4ox9nw2jvbw7p9pg0kgtesj5kc0srx3uu1b5c337rlm3kx3p1tnl74cp',
                channelComponent: 'xtlidedjdy97vb4ctwwpzlz43ftypd12nrr0qhls7w1yvxjfbtxqreos4r42hk82b8bzpyftkqk5hf4uko51wmlast0t4riunogkvly1kta9gfjbv1zlx9csj8g5y32rpugm4ykr4y58kl9wf3kixne8xkxvd12i',
                channelName: '0nnu6202fp05h5crnzanprens0qjy16evgho2qamzj9tpvyy2x01060uutuiwqnea4vwm653o3eij6loh1dvxwlthaazsrtaag06044g893tnkcfeijqa30me5zcp6tjq8dw5sn4odmr0dns3ihtaf4b72o2xcvn',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'ikgacf6i5v9dzb9l9m5t387c9ptjcow3qqnbkm1gt75tw7eiq90ahqcwaohoimzwss9e0qumf1ujy1mq427ude8hdx1xnqpr0hnj2vy8kocbjpgesvbf120jgzdtv8k3xdmpqy7qxvcit3eio31b76pa4ayhorvw',
                flowComponent: '37938xn9bkjz5r1sgk9ydwt003w2fyxi2lbb4r0mgqk2mvlf5s61mkuag1aliriri17qszp7uoy5rbq7r8k83p9juaeut12aamcjofmva8jxyjhgaxveeh3wd4q1kp9tqh8nm7g1lwifqfi1qocvo1roq7ih4ws8',
                
                flowInterfaceNamespace: 'mr5s5snv9on4ndh8qin4232mwizbeqjo16wgk66w8eaxutvj2y9theiwz78ul9f7g4vkyg21btdivb0o5sqjse843r9oxwk5xcbelsehtt0b0aybf40t22wd5sm0qtb1afvql74j1ubbv0itd4iylbp3pdeoifoc',
                version: '4pactf55nq170kw8t78w',
                parameterGroup: '1xgdr4dl05embfafetirf5hto0jznd0ywi838j753xyxpvmcnrmm1bc2g81ikhzgsv7jg5bppr4xho2ef7a99tmrflmpqfji9tvfpeorybntcswsyukbgnzd0gjkqvct46kykkjusjxe10vyp4nk133u5wfmdvpg0wjaqcf6dzb7tqoeiic44vl2u59aq2g2i3oxe0kyecri656gxi2e666nqdpmhx7g11b3pctzft4n3app2dm4ad2mibmdxzr',
                name: '47ggzc9wvwl12b4q5mr8ayv0saas9bttzpnw5btpw6wdyo76qgdwww2lb66z6h6jku2kfeobs93hwn9iatl27evgtd98vy52ka64ihap0iktrypc2ihfq9j8q4kftaqazqhmc9eznjgw976ghrzaocnni2fb0z1v2hefdpgblzstdhoww616e3ahwkubi03fgvgyqijwxk1fztm0jsss9o1wjk1asf2sj8f5wwjdndar7x2fyd16zhq6xmkjwf3719knampw65emay1gukmcejaeor64604j0x83biz83r432ybo0nlx2lanrk3ujyvz',
                parameterName: '79bjhg40txrteoz2bomxzgr7x9ntzzz4xn7rth9z8vhkcm13btnbzo8zoh2wlkox6pb90je3vlr1xpim5275v9u94bcfan3lnjkug3emfnzztum42g8m35pnjcceckmcpqdhcwk0p2xfb3bu74l5e3krgcuzf57wk87t4scwgapy96v6xoyq8aj91teg1p4agvg0ymsxbnfogfgc0a045sb6h8hgof8v1wcnbwwaxpo3f84thd1dsfpygtd4cjewl5zndkgesdtxxvacq4g6u6mg92fuvud8sa1pyg1ywp11hidpolrm6xvz9juwag6m',
                parameterValue: 'sx3y1zrme5mvkrh7yhsm6k91mf0fmvsc617c2bo2em3fkr8oqjhn85hu6n6yj1ku0edv2d7kv0kyj2lq34belqq9mtdpwsx5ts5j8wav74y4u2lfpf1gext0ogiytjwvapm2ype8b4qoehneal3rpxbrd7dfps7rcjrdmj6onb473skkb5e8qp3nmdt1oxqujiqf0wqxzjfjkdftkc6oua85qxfjlf76aygtjx874s1whhj0czk1zhzqhndi7gpjzua3tpxqfgm2pgrx4qesx9ewwgh2u1hjxe64o3tjg3n5uoyxxkskop8b45vfcss82fr2dwwdp2xnb3jpowkssvyssh23he9r34ypye4ygw7aru2r9o7vhrn9bp01vpu48yhyztg1b6pkeei90gkvpf11vgquxuhi0f89w9hsebpmqyaouggqom3sen09kfomaahl0sz33ahsclcqe7udnp63lsz3uvrd1203r54p98bu6wpqe17pcs61f16dxeoz9ntvfh2qrxy4drig01znefssok5lpin6g3z59sj8uc5vsn2ivdtgv02sej65c3r5vbjzsylpqj97ron5edzy69fiablmykov65rmeptoaavwzgtywtli7yqwl35pgm4fujzdzjo0e4akxtt56hxkxzm14fj8f5daw35gwntmx80jq93xgbsrh30cf9qxjr9lf09bi18v5iulzmd14if6bqf7zgd74mjmwnwfprgcc1d18eg5z412oue7qf2o8upas9n9wyw8yln9hgwxp9bcwxnphwonljfsdlahivxuv9mg9z7q2qitbe12pshbt006gq576cudb5oqrp6z9v9rh1uxi6fhuhreogg1esogyuwsr6469mrojp2hi6wdid23tr6y3upgp0pvq31enzs1swbst6q2ld9juvmusg8v5c9fqjsiqyhu92ibxrv9jllab93k3kaas7eaehl5c1nhj83d684be0ibzd8x11oz28ibcdelp9rl46v1t3rjjm5h',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'qddujsgawvkvkz9ptizz6pprnpp608b4eq36o3kugrf8yavrn0',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 's52ewb87q0krtsy9svsc',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'hpav0trot91yhbozp1yjxpw83k634k1x6w05ti2jzuhlpsvztcxwtuuyxbp10y2pwq32o8cvmvbjv24aflxikmr0ocayqhc6ijt1nlr2e0pjsg7btqjdxcequvmdbre1ps0m0ruqns9wn0dabnmx46gpfcuvdp6c',
                channelComponent: '1nvfbe64q6hjtowpzgo13s6agnvsapl5sahizzxctf8fjjyzrvddeb8ntqjhw7v2wj8qd4r4vp1hmn894tfvpwdloz7kkgqdebylhp4tskybmm80weomtmb5w53hhuaym3g78i49dso5jvg3z4rwqsu8n1y54ba4',
                channelName: 'aj1qeouv68edv6ifivznlogg0slink4ir9a8wfdyetyttryctw3fqdaqbwgp13gsh9y8csa77vlu8q640xvgs1ieaoik0dlyjr6hlp81vmdh43e1mlvsrlr8za8v4uo3ci3accytgldmitbfm7paec7vk2j5txe7',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'vmh3ii7noksdjjl6tt48mh62zzs6h07t6uowwft95f2sj1gajfeopwy1x5wu0pjmy38clu5tdyii5fq54uiqgl6f47gfdx2z60hw8ezlkeqp6ljur6k6gifazutda7yoc32fxm7xibj04gskfqb9ny9zj2g7bphy',
                flowComponent: 'd6oj93b8agoslboxugrqxiexyy57b0qi4n43h45dzqoqwq116y9f7rb9elh2s5k1esfmll1mo2250fhaj9kyd153zjbiniov6r0yd12w40pfmrpy29610xqfb5ph3lz8sdtzuac4rfyfkwmc3ipffnkirzbhtn5i',
                flowInterfaceName: 'wm0520l9payirbagt5ywn9wxotj5ebjfnvvx090hmqzspp8qyxdsvii4sa7c7dj3uyuj4gp26jnl27pt72a2e5w7d9bee9o7y79x4k09zmebn39qqg7rs9fvmv1ll7xu9ehdyucguqidxnok763lgo2rcpwqs7kb',
                flowInterfaceNamespace: null,
                version: 'u1d9cohm3rn5i9y2avfw',
                parameterGroup: 'bhrkfq4ob530c9a5gook9xvu8v882qfvps4ondpqgfrj5ofsiy492eqeqwg4v76o5rpda8t5wpvcpiwxgqm97lzsafzdgr7lb2yjg65ry04iydl0estw8y9z4opfvrsv4fjvnq6wbmm3oakgn1uj5ltv25vp9fqhz8uolqnsj8twye8y149l8ba18vkcww1td8s26n5lp4pjm16g6q7ripkpkkjp8gx1hp0hxzuba1snziffa22cbfzsfhe50hs',
                name: 'tv622r2g21c0gfe59dvaxaz8e1vvivqlmtz0e96n6kvig6iv0gl5xadq34hysel18gtbf97ghfj47ktbhjg0cwibf4nbwnb6i6xi5e3issfc46ns1qiwlyae67tvrbrrga6ngyrw7rnzr7ycehtwbu0bvi77d0cghi36rupach38vg7mn3osxbxsedifxu8uswx73ko00stojhy415atzk6clb0q6pyb2zp7ltchrhnnkkxcfcouvkap3mu6ppbd22nu5lgsr4d71ltohgnq7o099rsnqms03wr9vk6plhn7wrzvcr7k7sj4zli9a7rh',
                parameterName: 'jqhvp58fzqbwudx2gr91lexlaxn2cjq9pha3nqs0dszjeh3o7jn1ik7iht553qkajfbe51azk1hvrr5djzgcjciblrbsoivm3czz7f71w1wgcjn5xbu09wl6jw4vbjynpncxcip872vsc2pmgjjg0j7qlqejvc6n0a5h619ooydrdztw7l12yhmpnxv6l5bdplmyzydjzmtjckdd0oikaraoetgqauf537vd6xoms045152ljafur4py1068h2jcyoy9yhbve4kbs4gv9qqjjio1k9fll3pmidp2qrth1g0yok8y26aq5fqwcey4bpo7',
                parameterValue: 'vdq6c1hr80o5ifja0af3uf1nscmurvvfhkhsb53zduxwr6amdkt76qwlsimx0dxxhaxo0zwp5hrsmqq2fo3d5048q8yzeanulh6d528rezdj6nvrjhxa4f3ibb4utds1w0tc3pm1y3s776j1r62jrlp3ez9e8cjgy85w1p53o2jbw23px2rnrtdnuvnky4sazkfpwmww57eu5noruvxgzy2xs2o5yk5mnh3ydd22x3cy67vocavxns2jtygy48mn5pgai8xgkshvblllyv0llltojr89e7mk3b0ra8ot3d5puaqx3yda4uazf0t0xbgfjf0mqimljzkbs7j0h2709sv0lcme0jmgbz2ipcsrnlp08j9grqx7qoz93heazk5ws3xbql14zfd8bub4a8qs8rrd8x9vlzqpdhjy40adb1iu4q941tbgdecyaln9qovk2wm15qp5f9akyfsmk67483tqe9p5aknh0rxk9npwuiwkgq3xam95426cqeybi4xtkz8vasktd4ygtglvrjgxqzqhf2w3wzs7fy03y418axvfvoycwv2tkvxg4c5zlfbvvrpghqrmog77r1guthzqa3ae59y5kh6x3ic95es7uni8xmqt9c1s2aaghoy6w2mnr987jgi8d1wy98wbzm1jy08i0u66h9wqrukgpl7o080kvhs90w46uduatfbcg2kj76b4682wbepnyylwm5fn6y1tdo0v80g3oqr2oy0zu66gjkghwwaz99q7zsob34ddabne2rdkgtnr39e2mc5taqocohsr5m73xuya01xzjzqhd367vp1jny13buvcbtyijf6yepl8fead2nni8qhlf52k87qf6gymt0aqrnrea410t3h4ymkgdqmxf1tqbxwnd8evts278ep0rev9qsxste0fvn6f1jx1m0vbivlbbel646noamoz66nqsn6rwlbxhlvx1tunujtrvh6t2nxzxmktn3xml7l7037mgye04b3ns0h2gu3y65xuy5b2i1gf',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '935drkhml7inanfmyuu8iqvzsd317ogswk630mxi73v8mgrvti',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'f714ntoxqwnu6g7xtxwx',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'k9mmqe53l65ct7id44pf5y5c45493ud7mveewlv0rhfmlwjc7hktbfx2xvwwrw6nw0ze90sahuq30g58436eiyxo1gvsymrylrhfg8ngesry12xmwbo4qj8t1x1tr4bl5cp1wsoqe2ue0llrut8ftbi34rpos9jn',
                channelComponent: 'w5g2ti6b5uuxt4f5mk2c7k1y7d7zpwnfbpg4tusw5p41zxj3pppyowvbmoo0gfb6nfm107n7f34gcynums70cclsh6s98ma34nx4vusxy7p584oyyvq982f29ra2fs50p7otl3lojcxxf19run4yljoom2zsm5zw',
                channelName: '88nxz8sjh6wk5r4dz5s6v2wwhk3ph59fkje4kz2kgqi28owjpszxopzujfji3kfz5ylybtkin6lnfa77hpv0uapsw7fi4i6ut9ju877k1kiavnyem6spwkqozhqvttd8qrqhpul8wcmc8efyepcnf8tgvgiafadu',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'ynkf6pht1iwdkekvghf73fklvntvlv7kxn5u4qhe1hul5qmee9hjkwsxc3gvmtm2y53tss75ggk6sgvl7n807z2pecuk03s48s3vpi3lau3n676p0ghjsx33juy866zu0svojf5697a1qmgdpx4rb0erdg0a0c8m',
                flowComponent: 'uvaq34h5x0metnulsep8ovbgilxmm1q9nmf50kovizqauovlygrgblg6g9ssf2h4ho2qxrktd5igcb1ebbu317ae09xrrrjhx5vv6adnxcw4dowu37733dv7kivwetia1y72qf42x4o5hvm1cz1krwh1gdfwj1vs',
                flowInterfaceName: 'rz2jrbmmmuac7einqi75sh4ylyerw8zoltl2acoovzcitucs0f0754yxjnjhhxjm9i8ybimt6re1dzp5pi8fe4b64tykswcjsa5rbf5r8l65e29jai3321811r3kmrp7l91t2pzjrsr559po1pleyzfhynenq3b0',
                
                version: '64jihq7mlp9uznxyxcct',
                parameterGroup: '5pnhcjsc23s65nz0qgxe38nru3ddi8kr7y6vjzovsheoxoyevc77axrh9170tj9lcvki18i48n35zfwnabfc8xxfoqjmkpsc1uk1me1h2ewlm6xkjani9xwjev6rb2n2bukn1nd5uqyehjqoaafd2xdrq1k2f88vq9b81c3aiwl0kdx4p46uwd3ltfdcxfs3lptgt9v0wpvelk4dh0shpsjsmv5oex80hg1t2vf7rq1r05yqljemr6amplkgrha',
                name: 'dk9jz529bd01mcg6v0oi8662pk1lnc01p4prdsjnrge9lkmtc4wwlidskeqhiw5nbwosv18z75zo1hhw65db6marvtcyejxkampj6zgicxyp1c98m7g7mye1kpuvcggjj31v31wlrvsh0obq3ap3iordguu2736e50n1syxsppzfihu5jq4k8ewzvn5yixhe6kn8i09iohdwvixoz5wsy0lh8rauthwh770d7obha3ns4yaqv724t3dsu7mtv7sb24280tj5jw8rct44aokbyjfm8ra5mzqvcfglyxhzaltggyh8p3f1h7ckagd24e0h',
                parameterName: 'vowwxoi0cm0hlrnxg15bxwkprytagf3sempm7aplo4cj72hh8c9wlwtavd0jhp4l4v3xlyphgatrw98p6iv38l4mohtbzqmk5yse7gqdkpq9ohek8hymsoh4m7zz61jwudrlcqhl3cp0bdq41x954x8ujom2v8tluemuvfuazc6846i26omg3mpeeud600rqzpv0uugqk9i3wzav2leo84y0hkasy66j3567a61j9b8bwjoyc3xjcx8a0jh8u1wj3ai0a01anyx97yo6h65kgekr0yjl7u4ou34f8uh650slx2jpfycnr5cl3wwa6e3x',
                parameterValue: 'df7uxysptew035ndzjbx7g50vlx97htzzt0u990fj9vvyubz7ugki6ejkxaj06oyzci66c7nppmo6fx1obdc6iyu9ykze6se57qdwidt54er5nhcrd0ar050djmlg9e1a04rtzpeogdgowh3l4j7j8e0y71nbul0go60wnb8t8l1f52saoiqpse0uphc99mw75x0cj4evbr9tcebqs4r79qlph7ht19dz6st3486pi4drkxyjdfzgueioylaqxs27v0hosv1ewwhmzmcvhcb58cdttfcavvhiebs60myemzutb8aetew3lhvpzbiiajdq0g8cnvjkr8fe2oh2muztvc62wpukipm3wfd98swm1jm8ztr5dmsxp8k2nta474yoj3u9iy97uzk0j5int7vvcyxb7p131et9zwi6x4p2j5x1h8lazhml1qhd9b44anf604aki6h5ujn0w45cptbl5i1uea6nngbhvt1nvd1k6q4qxfmdpyqymqlcna8d7hy2jqzuo3xci0jyeih5q0t42n0xgp1yztnkw1egd7zs1j4h2u81t8a9b1788g1qgk3dr3ge14esg082wol796hnmxa1ksjlxwjh13spnrfh597l8h48n2noezoio2daatvyyzz6msy6l88np4pa8mmtky6f0n3ycyuas4aowh9qv79qb6sgmvgp0zxfeect86pf9k1b479mqq2qfa4kkw71uzcrwacgrhl2r1b9ktrm4boospf5i8v8ws7im6aq2j4q6k44slda868eqbk8aq0h2gdeyfwq2yyrisk9jxytepsdz26v7b12uh9n2iiwadvsdi7pdo8f22n7gvnwe4jnpiypcsz81a4imh8vl6jnlkdj3oaye83yfplt59eevg3dfrdn1i2qgxk4bpwoknr4dqo04r8mdwp1h3lgeok4moyimjqtb109prbguw04vlmg3xad6iv8py4oxruod5gerobxckgv6jsrjv8e2x08dz0sn35fprjx94x6sr2jday',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'beknaeo6wkex0g6ndr1b3dberw5uvvly1u0fmxga4tosuifugx',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'p93pzbhg8fx4nz14xinr',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '1kdqjvcwi4qzj9p9qg2oobfrbm0dv92kr37opu17s7m0b7zp9kuxigpjo0kwo5f654q23nqqnzoo2l9y14j68jp5tn8jh48fdnvqv01520wfpb28v0qae42o5qeukue36jizhi0sfm808ddoeu8ruxjqa6ml9prr',
                channelComponent: 'vve6rfdmsas48z1k40oo6eixv4j9evq8424drtazix5g04qc5ijs2zjuh8ouvlf1pomgwzcph75aqtco98dzs6oly97v2fj7u2th9fzduqukthlr6zqfswr2pcqzen0mcnjtfybmpedxkezfyg9r2c74swf39fw3',
                channelName: 'o6gfkqiiolncwnmjqyfuhuoebef51lcjv44vr2cjaaahwqkztbjlv3qvoy89qp3rh053jszwb9d4gamb6za12mguiexj8i2jby7bfx6k1pb8fnw5bv94zpb7wa0nalcn26omab09erdh4fssn2kv4tzuy4rsv0vx',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'yvknk5b4cktywwqivc0gq4hpptpt7ixnan8o351zwdgecrs77b5wm64hpndvtgia58nazonqdwughl3lfc402cdnq80bgshjq10ddhwwrhus3ec9oqr8otua0otkc4fxb7cxwy7watgt5b0sv8zxz9uwbdj3npp2',
                flowComponent: '82m9qdli1qjzttkuot3n8zg34ae7vq6hd86vtjnil017sosffgiqrpy95vfws1w2mfykaunwnkgjo246j1f2xjwbsl8xkuo7q2mrpr4dss2nj5xxaixrywx1zsz82ul6m7d2g1zbee7ls2gxpgnicktwugnnbemv',
                flowInterfaceName: '0mwe6lpgkqxhu5xdwukpcghufnfgsqmpszipjl8hml5ruh5v93d9dmr2w08rcz9x8lww91cg29oo971ndslt8xy5uxbct2vndei7mhj35ehlq9jmvu98bonja9ij0xc91rwa08banmq43hx2k8408q5mnvlgourw',
                flowInterfaceNamespace: '90ab526mxw44t9v53enxn9zthosctas5b6vzhj6xefjmjh8nmzj3sqanxile9tnb6986ezhb0m4uka7sxwuit5vbizjr4g4tbfozl92ug26132uouf87g17kpdw4k0nmckv7n2wv7gz25wged9jv9u2sp0ja45os',
                version: null,
                parameterGroup: 'peplu66iboxapto97t59x8qr7r1vl7rzl7f0tslnpkzmafm87kvv3o5n06o1jeyil6079hqn4oh42bfuc3hvlqgkpjlx83fgbfwdvfzpfy4d1j7zfen8yj912mmcgi44hlhrtsn0gmh2er1grr3ilmwn4mxl6ira20l7xt1b1y5qdq0nv5gx4adz1jevnn2c4cg26zjm90cmgfy5m44i5f1g3v5otdwb1e7et7tpbs1q236idely3dz989qsx16',
                name: 'djulrq2gxq013czbhcai4o69ha6h4gt1owaqaf9jvyyy09rhupz2s2frev5xebdegjoffuvwbzpkr0o26jeodduklqu8kpfpnlu8u0tkkp3w26u9tpqngij09tg6zp56c6a0s2vt74w8polvaeft793qhhws5n2zbi2btgxebj7v0apfv70ff7ms2yptlvmdbm4criin3c6tjz2fpktuug8tl4d8fcqo6ysfg8qjzg7uwx0dhle6do39eg6m3aw80x29hqtf63qerwp5sgrkdtbcsurkfze30qq8aqkvvp71l0ydp5tcutu75ueskp9v',
                parameterName: 'zmmvisamppvrqwsfy28qnvqz84veb9dngbw246mvh0ftunhprgd864g7yovenksn42c1c8sz816pn0tig7wf6qlep1efyy2cj545tgidy2thp9j726elm2y7as58336lim0q5rnjqpfdhnkv54k74qt1935a8t8fkiskj2opqms0lefq8c7uxj3qf2nu753hq6bs1ryp5531i2tosasw4dzkj7946cgw3v078865bqmqj3u3c5434u4pz5xf01gwfeqxo5luj05fn0jqh1h50os47tot174sr6h5f8lk336m27dkillsbzz3xxu02xa2',
                parameterValue: '87nasdvjwxhb6o3th6r5qjen06nvrukttwb2ov1upiufc70p77y0pz5cvfn87m8c3fd11ry9oy3gn2cozp1gy5m6jwtb1a1fsnzbzitl2cx6o2kp8md78yfjfhnilp7d2ysapuf3qbjog2jd0ix5w2qu4ossnbti2mxa7ppv4wasrgx969h0gr5hr1j4qu65buw92dyp6vl74fus20jv2bjlikoo43xzug20pwu798pksjrxuofk9xtewg93fmsntgzl0urgrjcj8ktasqagl8exonxxow3mzaqnb6h37495x08uw9thbvt38ffob7ep89x431kg8p3m2idv8ylbaucgqdy9yyvoudiv2ns4thtetdb7e6t92cjylpbxqr9i31ndzzm3dh20n5y6dr25fnmj0xx1fvcyvb5lb84d3aw4cbef2ykp6lo11hl2iby32f9dp1k4lfiw5thrw68ugnbzav3h1nj0randonki6eo0ph1aqsl7kcqcekbcjym4x3bpajthacyfnj0u35rm057n49orxbk53gatikl9muqzaf2gr1f8x07j1cg3euikfc3ctdy2by6ief8xci629twz70lcqhlxnz3elcudmy5i1drt26955yzwtqnc7998r8325a23cykk58gk6lk1hoxka4kv39pvn7iv4vdhefcsg2h727ltzyr6v5dnme2y3x10t5tb348ji6xrhj8ewatcjqa4z4mx2xxqwkboq816mk010bsws5nl2hk5yri091ncli5zdwwwwu1a8zwmybnzlj2pb9t43eano8wsp2faytdubm1kwgx7gyu3rl5taozboyeqa9i0dmwx6vab2mbe5563rf8kdz3o1sxnddr2vtyub54sikfyogxn1l4593vohjr66nvjazmlt4rjbvn9c3sqix2wbqmb77iq8dqphji15jyztdegubil15802fnkza2k29qr38tf2xk4cn9yf97aoo7cp42forygsm98hi9o50z3gkk55qxjhl3q',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'd9ehhgate9gs9k7m0hnr87w2mus9qj1zbrze28lx4wktagp8f3',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'ck9i18e6ln1lnz9qsr9m',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '39mgu13xxjy4w7234tmkbtv46usjjnw7po8c1e2wdgqtru2yloei2ixnl3aptras6y0vesf7p2ksbsxhm9rbqnqnait5ad089k2uwlzw1dnni490s6wi1mynsd2nawisp9p30iwmuqsh7vftkktcn3nkzfkcpfhe',
                channelComponent: 'vmp2q5ntpezd6oku5rgu2krajkxzjaysd4o9zppjbc4cq8iuu798qxy7htryotyrpjraednppikyq9sakg2235p3lt6qlqhx2ybsc1211vy1dj33e60y69t1i5vk5rq58z2l5mlrii5okplrzi8e65g290u6m7f4',
                channelName: 'kxax0dmvs37t1xspppalenzf6jy6ljkyadl0socw9k77vfuplikvzfbgcqcr893r2pw9ff4m8azonii43exkzolrh3lark6zbszrx7oipn2tuqt2v9f64dpcfa5x37l54x92325ywynpnit9yduc8qexbb9go3l6',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'qz7lbq8m1y997ln1h856ccl3mavdr13le3wl3p3255vqt2fyzofp7wiuqzvpkuzh70aieor8wq5fnhjzzvm2n04go5jqa067eit8adtl53v552x3vtx5mc565lo13uflm82toq423qjncreghnjbtcqt5gdfx9uo',
                flowComponent: 'aic6qm9773rrs3q5tb86syvrvyzf9ac1qtf6bvadqbu04fc21ezkjbezbybiyz05gagtfa45p29fw71zzq97u3h5dl8qmss0gfeha4beuqc0zifxh1mqzw15l1fp7rqul3qaugcxt0qiks0amx1mx7f7e2a9rdk3',
                flowInterfaceName: '3zid6d44vlyw4jvfktrs22kjx6ro1h6pi3l01w8u9tliajschu8v2shsr13zk59zas8e4clw04q0tha7v6p7anzcn54vorxxniap5dx5hpgcnq13u5hvcl84qnq44ol8bat8jnftvpjt3bo2oe6wnbb16ankcpf3',
                flowInterfaceNamespace: 'zcx5nhlaz5lbo3h18wxeu72hrm32humvuvqugl454e905qupsty3zsniugbef2gzoqvta6znyung6t1n5kcmjh18mpdii6dltg8ulvw8bx6ga4hc12e49eart4pqdjkazlkh38d4afv9yxnm21nqfy10im7rzggx',
                
                parameterGroup: 'c3k02wopxj7h1zx5sgsj24dhzfvcrllwocnp1b6bfncqt9kk4gnxzwr38vve3wdmr7vcomu5myhpdyml8dbm7mnegpfpzcfnad0sgpsyl612rd9pb4d81o34daci6ppzpv5t4iodglufdnxpgy932048hde118uhjbtplbee71nc4zvfe4gnofnw7rsptf33zpzsxj3drbbwjc3smrmm11o7azoo4r0fkvblym2em7eanxtx19n7vtfgg6c53ta',
                name: 'phj0uw8k67rkmfsu8ur0bsb6rng70smnym3xrco49wygr3flzenhk099ylpe54g32y2p44xqt0eyb14pzsfsldref5dlc5ven0bnc3jq8xodtaxm83x8br6pc4rdh51t25zmrvxtj503uv9gk262az8nnb7b1dcm67gcta0k5bmbor0vs9j2r8yo65v5pbd9obv7tnycjkbhpbrcd3fl6jletbtes0mv7s7q62ow3ypd25i0co66bgkresimjq4cthxt3z62k0hvbf49u9klxh77ws88rqwlj07yjk6tkb2axgfd0byyvjuq8buavpsr',
                parameterName: '6ibr7quk866ghtl1jldhgo0x2uiolcmecsncb6knu2qpl4zcudnymyqbm0lescaymhgb5rfyf63srr489limpxiu5f5lyjcyqom6j6ll4i2r4irugnt0f8fn3nsqfytrttd1wdinsg3froh0xkbsi4pin0rnxbp1cy4fd737szwbok31jt7gowmz8xd1tk0wy1sdk7sfw6g3rff3os7b33vq2lbnn3quzbdazp78mi4rfjjkzxrhv7zsv35mx2ydoeu72mvv8um9a9aivcu3rhj9estpzmyj0rvtz2h759v9qgz2fdnpgz4y47a2eg4a',
                parameterValue: 'qdbs6swq4nfqo39exq036yo1qr5molc8677c9hmceaifdm1dwer1bwyo5lz2637ns6h0fex613r52pybrw06d58k7y7xgmuvszvrf0j40zzb4os2po0pcms32zppo6knec1qspnw80mbr4o9r1ielth2wv8ieaccfc9ufezqgt8jo5mqifsric9liibh7tedo3ssd3zlfns8ypv2t225jilp8zt3r502ul4exdy0ji5cewrd9lbin1pg97tv3b0vc8sied357x8oormpqyp59sqbs3rrrwp3k2cp8h05jn2o5wsq1oif0zxqy2t4foflssuaek8l2dib33ew1bnysoei70vys747ve0j316mjk9uvtbjd3qeqxra8oqrgwtbogiz71c3091ok1qndefjg5qqw5s97lx5t56owpurx9mymhj1noz0g46cwz3rup4anang44jsuuvp67myijmx44jexscbz1k4bng3omeo8sm5cx0g48jqs1hx535q3r2qbkg0j53rdmk1ttv7yp4th3sz4x6ufbmmwtmb8th704k8d7y206hk2146j2asdcr7rpap8j89hqowvs63ig2bewodwhrc3jjbbzxpk393v2w2tfa8iyot2yxtrxcz978b334kzhoijzvcle3zx1uyl8d27cdqd1kz8wulayrf3fiwsq7ezb9g2xqvmx5e30i6khzfo33x3xg3vdvzm2kepdgjmpz7g8wr4a7rvv1a6e15l12ohnkzm7u2q0o81viba1ziqfcj0sjxapbe6fjxsnpgzo0sl2ztahdc1jm51ioa9na9s69xinwv4xazqls6fhhuh1g6m8059sap3k88an0946eu61j8qct55dell0vmaucaev884a7ykdb792yyjk27u3jz5tu2e8q799unj7t3b8tsn3dy2qqso7kaay94tr9ebpuhb8tei95lieaq3hsspyqxiwwilnldsx9umotuz018ddu68y0watbn5njyo7oo8a19g99iw2gwu9on',
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
                id: '83oxldbzez6n460bp7jym00vi6kk2a2kf9k9l',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'rzd6d8ami60320jvbv63a3pr7st4dzk2uf99ljkdt3dm74p7d8',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'znac57svxa8qv62b8412',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'f60votuphp2xrgkqhrt1w1r4doi5rz9aqowf4c98f7l6c0z77px9r8x9ur9zt1cl4aacqs4ehvpkk95ryqxj2t5p00n7hwsx6mr3s6r7kwm1zgloin02qyllw5lt4atmv3qmrmx3eoob0x2pj3fh6riram7pvs4y',
                channelComponent: 'jdr1gbigf9vg3tdufsplbukqvsmhjd2da3ywfk0i1bfpqrvuamvcw18tjre6kcc1pv6lo1ewio7zjjd5ehx62fjcdlebqovixtwczyq401479apjuwaiopwd4ckmbusg1p0vexwqvh0i56gcvjej19kp4k03wmct',
                channelName: '85ywjhjt5br7ee4tri7yskv5c45xj0gisjxrac1pael43ta4glispt24504qqtxzfjpowytwy5a529l684ffozhj0qhhqcazqo04gh1c8bbdmo895u86j9rk2y9iwe5cd8t6eqy3jy7xt420rk9m09i8k7i2wcel',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'u3j5z4rvaatnri2cunuedl493y07xpas0qg07k59096vuv2jdw7by5w1hunk7isly53jc3m4857f4yh51cw1tt6ohpaj04qp8h4uz2vc29tp5xd8r8usx8qmp9gscgpnaonnhsn65u737jvuppvm7nsssqi56xvx',
                flowComponent: '4guaaxe9x9h0dfkkb72qktwkqw9t785xwnlaoblf181lc9in5s5ag7n2iyssx3bj9qac3flbd9kcpkr77kxn47ldqrd6vk4sbq280resqlyo2b21oop293q1jgi1zd8qcczqtv8ysbraxc97j25jzct9gr3bavod',
                flowInterfaceName: 'yzhnlcuycutyi3ah30uw3vjkprwpe9i7aq633a4ujbwqrm0o21chnvae3pu1ammfyoetbpgriwrvg9fqs8gq50i22rxbuz8ra3a0dx6b1ynknfr479or9fz2mhl6ez7p6x3dkawno2hm0z45jaeddumm4v11q3l8',
                flowInterfaceNamespace: 'v1aevvb4ajdxwedlcqe59kiv7emoofsumdf20inmxv09qdv50b6scacpgsn1m7njk0lbqj30vftz10ptdqllvucmnqtjtry54mqka4dpgcegl98fir763zb9061x0gw2rrmy49ev7z4evvhfq89fh73b2pttaiar',
                version: 'r7v4lwbfpffs4mgzfpi9',
                parameterGroup: '6ot1e41wxjetzxreyb99bbnz8ye4mx0s9eaoldeocs5vufyq22d7gph2eju57lecixdnkljf908wf78yuhwkvkaar4f2of7fw20m8z568w94l6bwt30vvfzq0hv2jc4tw2mmw6gqspgp63xr0nqn26iepqg8d4w26nnsjglmtp3byuvo7f0mp69s20kv8qhprt93bwt7pudai1rsc6nqgaqlwukyxpde3x65fq5lixwtnj8r16u7ou8vvrhdvww',
                name: 'zcqmey4362h0oq88grg3bl861rfavt23jzzma5p5e10e3cceck9z25ezx0m1irguqgcj56edyzk2see8lwq2go4d53fdzs4gjgqnlypz9qecd5d9fntqjajwwmfyiynxs8yixmys3380kemetvjcn1ogp2pbosoe2qf25mg3vv63lak2xn932schs2da4g29i92ru112f7grvddvjmtrjigb9fa6xalbag1srv31tli84d7sgivj0o2st0jn9u7lr7oxh2m1mhlx5zc1itjgp0n94vp5jybh2y8dts04ukpyou64ahwrusrlivk5btrv',
                parameterName: 'luyxs7ulxzufduv2fntoco8jv42yb0ypxfn35d21lqkurxdqxci24x0jga3wi28b0srb06jyx2lh219jevau3i196lgkl7h89ydlvaybawchhspv2b2xpihp2b27dj1f039rqlxu2ntgjwgnp6shgnaxq4j235l76r7jbhxdtcalf7axv8m862ulw2rz116yotvzm1834alh6820lnkzzpzczqa1sj8nnzblwn08unyyeicvj2vvicnoukf611q7glkzqn8ujsauwf4yef6algor81ldnbtgv1k1oai50lnqm8g9tptq6tt90agq36sl',
                parameterValue: 'q5uwdymitq1bbg3h2qmdk4dwus1srdkbiwm4l6xze1ipez1uvfqt8pqvitmxhowcf6cwryg46to8x5ale9kcf3wmhtzdoa7bakooa4ijdkle472w7hmx7oqhpixuif6fxe6vhv6w96putu6dv8ij9d0nljwq5b3wg4aejjovwy4gjzj9530g0rby0ujito6wt4u9m3gvtvf3h77xilsnmf1m2rqqcl8gq0jtnqpx7swfhnvjn3rbjxm8ai8mdvtz55ouryovwjjwgpm2p9197ikpnycptwyiqxefx9uf4pji88ov46vm77zkpacezze3uumybt1d6oq56pcasymlx0iuftfnsohnfvvaocgpf64lbpg3wnrzbi7kuo8l1pfxbead7hszt2kvorxvhxozgap8dstonw0hd2bj6n6gfdl2teji3t9nhvl9xkvgivpi7rhyqp3gvg9fkwzdqncsclqw95a5le77nxo0si1m2aepac0ecomeys7psoysehddon5lna7nea3douiianhae6c7l2qxdwlpyuhg8kbsginry2vw43obk89vno7r8y5iyfum5d3uxyidrlsqmt0ysj8ie1vo17tud47gph27imoc9i22gbr1pydllriz2bxmf1fq1aas0en5d2lw5ijcnsai2ibsfva0yqg1escc4j4p8dxlqi0p4fcj2edv4ziv70wbqggiyopx3m6rlewmf3dsye2gthokybss1023esg3ku8viojdpiodj9lrriy51hltqcm260e9xe8m0vxxh83yo19ycx2zx7vio6jptrcp0aakky6zqajqe58voqr1cc6glzudp1pmpj1qn9rd5mgwzn1wqb5emcmyf39g6r0wkp6dhtxtpjydy2r5qc9r9x4bl80kv450l0vpp2qyi8w37jdmm3xrdv37uqmbt39jk64fr53rvjjayxdu9yx2baep01pjdg9aymh6q8i93rvk2p0jjqjj5ypfd8kxnjnik8a5axhc40jo3odhkyfu',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'iobncsqm8xxp8bfdwfq0a5zj7j3v5epqzxryl',
                tenantCode: '719rhkhpjjqksqrzo2aoafhjo2qntnpteixecpdis4z39o6lug',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'qh3txn9kfso0aqmys75n',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '0rmvq3wi0vrdgr4do13ow10nrh54cqhh7viuvc7silc1yy5h0f8b988oolgb50ptlq5xqj9lgsfr5yhu7gz5h1jiy1tit75zoj7m8l2tynklwvepy9qdu5yf8sy5qmppr5ghp9rbn0yrwcarme54eyxwgpl3cbzz',
                channelComponent: 'cjz4uo2pyfqw52u15li74piz400l937hnh6svsoyeskiipwx72ttltncpk75ki9bsvznagfzyzoe5irr52hrli54mf1diew63gravjz10jxr4znd74cwtlu187c1wsc44f63xu14eq2ldw499ydo4x63ykzfrn7b',
                channelName: 'v426jyazzo70kwo1n4k5jvpne9m2jbcl94ixl9d9oedmhnm2gfsaxvrzdjo1pdhgui4o03a91tznjej88phreeo331js6g7a5jxko000e50ob63wvfn1vgpi1xovowvl5kcid18pqe7ddty6e3fiugtl2lcp2qhm',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'hqep6d157ju0qvepep3zxoj830cxq6nd102y0j0llni1y7tsm0x69nsid0338nk3ynnu19gaao21gglcu8q85mmcp96ejspntpyby82aj4i8o6e4oyoo7offvw7qbly8r5n2566e792wy92j73n5vzql0fvtjtw6',
                flowComponent: 'ukmn4ztrqh195cnipfu7vl1s5r8dbjl15la9yctzmf5qj33onbtnhsifcg7urc771nphchqvq7wsonl6c3d7ypqhm01gj4polpggmpv1rpkrxcyjpsht35n2sxm40mktb5jlqaen365w10odmn1u2jn4yjwkie1p',
                flowInterfaceName: 'futp7p290c3sk0r3lma7y5ufnp2wk6a5r7g2m6ddgo2qiv67vya18ur9ubw7k1uygtf1hgh43mn2tsxcjyzn6lh2jwdum4se920b7z8ovpe2qdgzbzlfd3w2btgjuwvcrcueel30tteysnl11liryfdyobf96czz',
                flowInterfaceNamespace: '6icepol89unbqqvf9zq9tnki3559kfp6axp37a4i8o9zyohmsb5k564x3gna2b8nt68d1520qu9iizn8sxxooapeisfcot69674nvvujw8qyou3dmqmhtrxgzkkbms750lvi9t4n72fflw90wwgvmrj1y3erf1i3',
                version: 'l0eevqsqk83bmr4yirfr',
                parameterGroup: 'sw0d4e3mb09ms5ec1nv8gu4s233xv5hx3979xvjkstsy1ehd8hy1t5krfw9atkqbg2ju3wzynd6gv0nflezi00w78yjbbygar1laibx8a1tisyren0gcczx6keh2um32w7ru4ho2ajdlcctflllcln1p4z10zj6nvq8f7karyxgvjh9qde2ovygeqhxddeauvpvyb9a1y9orwmafc049vyp32b9diy7b0y0pi20i8jox7c5ovyfm637ptfa9lfa',
                name: 'cn1bry6rfve219rdjy8eahf2iouzn79jazc7fuyrb73hf358k81dwrnuesqh8prkx3f6tqnk51gn9ojv9g30emgcsh1mo7x5bzldl8tnpvamymewz8yq4r4b61yumylqmeillzrwgetfd3otevw93lu91bqjl4ldlg28xyb15twdhu3ay6502m8ngsjrodzi68vqua93tjbykxphps5ke0mmhcga9hjhcrnhm8q37b4xkd1075irzbisq34fqrhnr8v4sku7auj25mkbojxi1m4y97yaggp973t4iykm2atp4aqohc8rsiy6lsgt958p',
                parameterName: '98dqfvm543247a1o875cgxaifbyko39zqg7v60iuvhbvah1v5suzbyos7z057k727my4uiirp3vdexa1ypvodobep4p1u68clfww8vagiuo4d84on1h0fh4k3yywr8vfy26c2wegftqi9fpc807mq7sj9f5cawafe960c1w0gidjdzp18z5kxvl7ypkyeqmqossrq24h4bpyr8o36mjqm5r1w5eisz0vgylu6f031dmhsw85jamkh9w9g2gs3m8mk99iudr5sg4g5wtgni6e2sv6gvqbc8ab5iegrjowbzaf5deeaa4471v3ple4ys9z',
                parameterValue: '9pbh7jxvbryttlgsqlbknz9e3f6mi3b51rcf7a8i3n6zxsnylmfiufozrkjb1dn90pm8yivf0zm51vcoriavwtu306b5f7ozi6kkuh960si0oq4wdtfowordlh9saweot34coepzpenhzqixmja47nk92e4vx4gfep4yj8hnwujtye75e6pu7bmg5ntga7jja2ivfz1nbafc3atlb2n42hswoqeg09j7nfmy7q3e9h64h0cs0puryityvg2f5djvf9395nt3v6zc8kqdzzpy1wshtmlu9b98hed2owds4dy6cm022t32l0k8lnktiem762weygem6u69ebr7uy5n9eis55ivh2jwi88ch11iq4td8nqvbbx96myfzuhqv5h7ttobopcgrk5n1wgho35esj688z2vzfgooqk1joq5m159xgy2rb5n0ede0ctu1yao5dd9fncs27f08reqfbcpksitsrch9h3n0qvlrdux1oeopiqlynm59l5fjdcudgjsaxix2pl7v17klg4n29p2gt4umm1wi6iq8z7e4bprv9fgmicgnl9ioa7n8rpi6z6s23f8qel8zt1j4y62r3hsfivn8tjkb9r2roxcyyc7qeq4syo8u6hn1kyplz49kvzatr23z70nidzdcxx18sg242evy0zx77z3oagjqu7n90r11a1jrb9x067e7vspf04f0c2rs84od26fy0g7xlttd0l05l2v24h8xa6um2skmmqbco0ykm7hajsskn96103bbk849wgbh0cs0mw42cmm8zja6alh7b66swqvl0k2s0f4gf5jax014qxb72foik9c2b8dkyobm276uq7of1qr4rayvze27sxxol96m95uc43yndzuvjllfmoqzmk0ozx16n18yevrjjo64jng602mdq2z3twqchdu3x8e4vjqulof9id0o9z5n5rqdaw56tjuz0tsqh1yz1do08ar13egphw0mhwghhcy3g32r5ej7cu1uio4wak4n8cs526lkmny',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'cq1baxoxlhghjt14l4er4spgdug21ixtlc9h9w7fz1ltk9yuwv',
                systemId: 'liw9935jz1dtsrq9p661qrxv18b9jnbrey1sz',
                systemName: 'a1lnt4767uptjn33cqkc',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '6qocxda3kaknrvm5kzxy1h0gsq0m13qqenf1cdcbri4ivl5k01fkssv3jye37uk4vv6ut5boyxsseevhw0qba352q01zs7ak5wxtop9s4vuubhuxl77b8dbz097kly07fi1t9v71aa0l9uhwjp0a6ca2cpbjkv87',
                channelComponent: '449khfu489o7uglu89v6kfeozrur8n924bynme1yl5jmqzo3artdwnm1regxehg2oj09hg0o8vygmdaj3k1sddygzo7mdvnbofkxzi51n8oz4q1lhv9iq4nl3wl90qkidii7fzidh8n022gobv4zouy5s2qwbz0r',
                channelName: 'iwld54btcgyc8yddgmwiqh3i0vfe63hvnp18znwslkjvj83840tng87p9xsm8dkil07ed1stb99ot6yq1umuvgs1ggacu5ivaugphkzv2z7ok8a4bstxg0r00dwrjzebzgik71jnqh7ecbe4lo9pky1757lvbk2v',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'xqls02ss7h3epgk3t4jf9o3wb6jstxjwu55jpl1yh21smsqjl0ccr7533shagq3ggv3uu0wltpujdmw4ywl54ucadvwoo24mhwg3g91iw3k8j9imuoimo5xjy7qgb2xt5vb31i7s4lq91erpf1pxuems3v5j30q2',
                flowComponent: '3pw96tqj1hl787vjc0c5yegn4hprzwyavkb7483uybnat0ffc1yyx2g2dc438l26quayswkc2f83khb9ejg880qa1zp4rkx1uwp1o91w3o8of70lijwu7t4lw7eejb8u9bnzhgx8arcyx7dzqlyt5nbbmr99fbr3',
                flowInterfaceName: 'hnc3ojf03y66xyxijrs18tg372uhx1tz5hkby9mojerzyki8v08ss2ll4w7omm4p33z27nzhvlpll6q5no0k1l4j29g72v42pk7iz3l2bb6ifwdtlyge19ehr9uplyep8iaoqu4rc28h1wvnns2fkjn5r5eilwv2',
                flowInterfaceNamespace: '8z24ayencgzr4i1o1lr95awj0lkpegdrnw8j4m2e0fn0xt4n7ffc6e36mu1xr924q6cjfn1h8q583rccnklwe04155hd375l0il55p00s01eqgdy7m3ccmasejn0lc92f0mbzjlycm3wm1y884l8zgxxpsfwr053',
                version: 'v4agemaqtwtp58m6mps3',
                parameterGroup: 'x2vd3oq9x3zj6t39zvl3cm9zsvc8468zqhory2vjlmpfydqxgunm8362rmmwncn1nbkj0f6zsakmdb78cdaq2jbsi00bkz8uxq7v25ga02q28daihsw20ui1zm5280iwx6hmh87xs60m07er52lpg1ullakdqybemoh6wpxftz8dobewqiypv3lkyxes1eeyjwlcky2yneu3gzif4kr0lsszhvg0uq8w81uhl4kfyahp3j3uxps2x6v3cpeyyc4',
                name: 'uthuj0fbpg9ap33tjc5of19pj4sttlvb53szeo3hwgv27217u19zvptumhic3ilax19oi8vm5r4iq1tp8yrcvweabnr09eub283h21fgvhm8qqepmu7dxvmsj1ztcip4f9srnrb3gqpxrs6mbvktfyrkai6thgzvvzjwy1106n4htz4hl469ffncknrvdrcttaohxn88og4nabla7f8t3jbvvkgh3eqwttp72lnt0jqhq8musu2q00ul7qhegt47z2ex7gfct11hytqo7gc7h26sempljylqwremvm5jgm96vff1sfvxbt2912vxbvjv',
                parameterName: 'gwe1matgh2e138pekl01838c48ze6e3045aduwc3w4wcgfwd2m7vp9wf3vwaa7bgzpx2gyxjakw29i3bdzltav4n6rs02uru2xpqxeh9mxidli5v05ncslpsq0r35eg4p87xuh5ira6bakgf7nf91s2kuec4umotz2573bozsbdsxtsz4b0jkpviy11by63jepcop3xk02troga0i1a0hxv3nmqdvihyeicl6n5ylo20x4zqik9aoun8vnza2m5mlqe2wzejac7ebuhdhoudrestgmivmlmz6u4xdrags9yzdcbhf8va9i73fmz4aniw',
                parameterValue: 'bjzz8327br6nh1xv84tcrkes1ico9sh9m5kzqhpchtq50axpsa7h0hf6u44sb0g89ezar0ta8hujs5huywfta3iivv91g55jjwq4zqfvi93zakvzcynsjpvztxh92lnlhy9sk7letmrzz6wnpy5sl7gpzqm4g9p5ioh8ppnxjzkpu7icxrolovjntrlxbocu7yih2cdsm1n1umvgr0r9mlbtdbv81f5sf9xg2mpwnkmtkjokbbb3bpq1b1urgt06me2ffbczlwattzcin58146fkjy0e1ix7dbeixuaodprj2lhabpfe523pft0jo35dj22mos844z65n4ksfpp431l5yxaztejt39wurw30uxrlubhrgbwsewelkj2b7nt4yt6kc793wrbn6jvfkrrualp73l6itw53epei23jdsv0yuovq9rtsbj6ftffzkukmv8x1y6hcqw32iluptyjmp84qevvv15v8whb6jc4apt6mu7wo266n4remtfwjb2wtvaxse59rmcb7zx0r4rcj4tx2kozw7v9s6radt1mxc4tcdc3r05n4s9ykbhp9wapw47xiasobf9hyp2421absyr5uhzazk6eri1qlkynv2mi7l3nyqztvcjacoq0tuq9nnyby4lm0jcaafzjjc3g7p24pi3m00abfwqjlwr46iikgcfvnhebdeun01svkmsqp6pa6j28jil1t46fo78qz4pv9t9qqrtljl6w6rsmeibyzaeyislvy3mp7kpyus0n3w41oh28jl71trst207k0z5atg60oq9r9h3pjcvzifjg9ckx3fe7lmfrillejpet2gfrvjffqorg3p06t7dzb0oicguysqu5aq5lrlh8ezhtsv9ihaky5sren0fmjkdj4sfsf8zv3613ffr5ki5l2efoqs753gio0o3du5l9x99eqxq6izxfnrg6ke5vri4omlh5hubbfirf4fby2oifwoi3elyxcopt4aoic02klozo0240gd0bbv85qz4vwmz9f',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'qqz6s9mlymdz0z6gtn3b1t3qdcpp204is1vola3xhi6yutagw6',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: '0jhcov6n76xnoqi5wi8p',
                channelId: 'hh13j9p0dp8rj4md94k4377gpdxrngfpsohi9',
                channelParty: 'bpqg96cvftaeblqyvdo315pu1jt6lur1efchmlj871ilc4boncqlq7cw3k1fm77vxpfzgavbalrfqqt8tri2nn5bxz8555fvh18nnoyc3ifn8dihi2a8odiqqbmi2yicrm5h4yqfa2avcvp0pf2a9wz4sl5xy19p',
                channelComponent: 'h77x5fy9k0v3o0xyd6xcuzo1rfshoin013j7qwk8zjwfm5goz28zkympc54jseih3r3i4bkgfhh62k1axxwc0pidbjh5xmq6d7fa9m5mxvkirnacvx1o469xme97gtdy8dhar7moutax4iwjynslcmaz29ifrkdw',
                channelName: '36ske6ac2vtnszratjw9wtq9uduurpu1yyzvtlekrzldvnflxkhs4w6h3lom36zm71ms60kno8mkujvnexv9agygu2uyt8zn3d3fyfokjnacs74reeceth32fr7lujo90bton16c4vq7nnm12gznwzb4gun9yy8b',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'gks5e7wlq0kop6glgj8zy5v1tj47atvf690yg3hm6gy87myh1zwyzewh9vtlkq8f9lbhyvdpxt70z09bmexmvwoe3q9gboqelvmw400s8k0dnhxnise737ec6xu4gx80dylzn2tbqt0qbz5nds4gjvhdjgn6p3rt',
                flowComponent: '8rdia7du4ztx6bnd60qnxuj0tzd6szgug2z65pv4fdw82aphku2sfdv4eeic7ym4az04n4j5qbrgttqarsb3h6fu4lmavdn1bajy8sulslkepmxs93kdntqkl36u8eblwjlbm4bvy17xtw4f83i9t0ylo9dd60g4',
                flowInterfaceName: '1gd2k11yms2c91fc1qxbc6xotjw2l8m1ytlcgnfc97tsvcuuiq9c7afctsp8ww37vc4cyfwvenbnn0i60pqtl3hh9p2g3e7vwx69mt3r8u6h86hh8qhili70w5jxzubotu86ybxzealt04bc4xbh1xngzt63nn9s',
                flowInterfaceNamespace: '5kxgqc9urw3ingzhzy9p2z2cprwea6ys6mph6sn9xdfk33ev7ox3hfnoqchzkiqrec418xfw6e17wk4u05jbrerx2ofr53466skpsculvc302mmtup9b8y25zgoxbc8j32y2fp48bkgfktlnnxjr0jl2w22v27y8',
                version: 'egw32ld84ikpvk4uanlv',
                parameterGroup: '3kymbrf7zba4a18tivymqlkvdngc945eujjj7ig1kjj8yh52q92whiirx7my7dehwq1cl8qiwe9uvr7dqligg9fiuhj4nd6j3s35r9afcpfd721rhryolq4ren0jdsg6p7nrfy1d65r8elo9amh4m1ordxhpzq56846c4tso9jmh8cyktpez3zyg2nchvqhg9xdt6vulxtpqele4yd5yqd4sp5qdcnys9s6vnp9l012ex5ukkg0k325lyqwggg0',
                name: 'ni2711b46h2x2w90v5j31eennrufvai7jcskhpqnhpdrhry9qg8rnzqvwt2pdapirrp3oydacer7lve4a8vvw4pql2ecrhri0z8mxk3w6c3htacop7sfml3lkfrfycaz5itpm5c8ed40i0wp7ljc1dk2907rri6wzubjf475n85tj1sb7916eane96tj4oo2yzuqaj48q9ouejwectagh02jwhf3zn7unsy1w67afuccv2mwtbnzelnyxbawj7iqn4sn99crc4xehmb1jxytgrlin5zhmry8ezt3pd0z9f6ouc6bpfii74bdfvywd9vo',
                parameterName: '0v7vzko88clf5siokchc5qbrzqfrr15wkly0u4q29x4ai9om7i9re8ojmwbu19e07v1au5fedx6nm35qh8y7tgggpzz07wkpxvjvaftfc2tdss34jgarkpcjzqzuefqs4wqb5opfcohurhf5nzjjozpni9fuvcmgyzqrczsnsb82w3es79twlqyn41b45rb2yohruiuil47qk5yo1gmjtex35nfe9m6uuabtgh4234auqxmc8pb4nou252imh2dx8qv43q11sbxinwfeuu8zrttbpqt4mprj3polvucq7489h3qlfwn4tp7ps8vnbkw8',
                parameterValue: 'vw9rrs000jexpvp0q8gqm85xurk0l2lgx5ifr684c5zn3ohpzeaijsaryexut640r10ixly30ull4q1vtcmkzi0npyj1djt7ygij0fcv25a1r692tf29u67hirqiv3jnyyhb8u90nw0glk6zq673oelbd2dp4qcfrl0f8pg6qxm2uk9t0rhhea9d8ubu77zy7qw6opng4orzs3sa457irbe3pijfjvnqr78amo00v2mqu28lx0rfo8w8moobpcaqrqwlm5zt2o6ec72ws4ft904zhauphpnow5qgparauewzc1olgevm0ruqo54297e3f5em0sffyzj8m44yz3nqy8qja616qd98c921b0xrufkd3bidf6zxuox44svhe8jzmcjgmo84u85ahs59ql9v3vndqzur656fy85iab69lwhnrehevidumv1m8h4zgknye2fzjkie0upybutdrclthjqphblayytfq6bm4l8g9afhr1tyubacbj589cg5zfn0t1zcuvtvsxyu3i7fpybd6xyfkhoregwyrqddb4isy6pe084h2netr74stekl0xzcf2mctcusxprwrf72vjzkkcwgxdl44j8zlquh9bvo68e5z1oca1v1xzgfd3f2jm1zh9ch2cyz3hx5uxypjlid5zziy1355njbsui9f9gn4z3ba0vryowwz5sydv6qg4c92yhuk9n2mzvih33nq1767ux3m7bt08lru6h0asr16poaqmkyy0xqsnttw03fqqbxvrjigy9z8deqg8sp3mkejgppnpx7hlehuk11q4bgnb65c4xp0aaflu05ajuxwj1b6r3wqa1rsloh7l10mdbb4od3bjbq0m95pfmwb1z24v6360ws1q40uvtz8x64z21tu25auie7nldq76aj6auu37si059d3suo7sn7k9tqbi2v21qkvxk8h88w28gt8twou39f81tr7jmckp995fxx837qnf7qlwrit18hqtz0y2os7q1ps6hrd1n6ilu2zkz9',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '8vejrbjblwupsdq51oo5gsatbqs33gjonuuchj2j79qyl53fbz',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'j1hja1o16rjj7icqdw80',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '7i0axi0ttmbgfi4r3r7qiu8i616ehykghyh283l29hjgy6b0kg5w2d6wdshqheh50zjgcdha0sqhucflahxz6uisio0hgmr48ci22f8o1bisdwe0f4ssqgp96gkhvdlogwkdh0vnlkxlsdgo8n21s5zj15wfu3su',
                channelComponent: 'bmxhmpom02h0ma1bd1uontrmo7ixinfn6p1f0a5aswlpuqvbxs86y9dhqv86fq0mmcnox31pzm0izec7q7o2rmzyochbym9d6vvgjzgoq9t90l136pu818f0lscxrstolqbxk9zejpma8xaiv6xs26rno64a254a',
                channelName: '4m6st35ztvrs91pvm3f5ccyfo49hx4kwlkiout2z6hfj0m4xk421b2zy3tl4ylk0kkrbebh70f49zpofkr8h3mtrr1e1aaann7dgraodo3l4eengnurxougbh1flg4r9cdg2nma4moareht0fnsemzkuisy72t9d',
                flowId: 'pnldbuotfilxs6u5ofihd0vq7riop47e4mefo',
                flowParty: 'yqv0njltg7jtkg5hipt3pbp47uic0zj3v1cuvc30zu7e2nflhmqateo7e9adz1htt0ce8wnjorftzji5evdnha13vasf0nt3bdkzvq2c3wi6hgyoa9ty5jdu82zcfittcifelobh0dwvrhp29fj26ad2fak42jc6',
                flowComponent: 'twovgahj3vf2heo5spmzp6ov07o37lzoym41y8dbktj8lmfwd0idj51t8ftlj1v4xckfl7whnevl3k408ug8njqzi3zh8yggqezh4p20qvw5wfro8blhy25970nv3sa39yb1jejzg7doeibaqbzf81eit46ysuzi',
                flowInterfaceName: '886hyfo5o1amnzzr7dxbjqdp1okaieaur2frkg97hdb6dl5zw9ttivl5yrqj7j9vueh7caj7q02e2oxz7senvhvr1vkthnrpbfi7ykmochbqkez7vvllae9jyjjivrcan5xnqz1xrk729crl67324kgr3wz0y0rb',
                flowInterfaceNamespace: 'enjd2mwe3kdlbei5ly4sstxbkix5oj86gnuru939568ft0qasgtsa5wvaswne3s1rj2wrv5pa47u0vam58nm4f9wvqkxfhvxsu5a0fwg5j0rsddcksmjfhtyf6gddrm1cqziwt9xl5trwdg34ry71iy9l6ykxj3e',
                version: '9fl1u9ee3zf8ifed7rfd',
                parameterGroup: 'rrukqc5ag3xl0szyx3l6ct7rbm6ad34s00p8dzrfysd2o92i3srmv2h9f3efmqxi4yw1qzhqrt8a5rcvqwkwnjdmf4i3v8laei9awv4boixj2xs6dl7v0330mc3yti0xx53cd4lkoieqjeajshbk9d8woyuqdz6bdksw1noodilglchitrr3obpq9wtpz6m0uc0zvcb1nltnrg0v4imks3e1djehc7j9lwqeilzihmcrlmokdj44r0rs7d8luaj',
                name: 'ig8rbk625sk0sqgesjcs37obnh8jq5au6m6fqfv0o5r74fiqtoj2oda7zcglprrdi4tzujy1tkimjq4at0zz2hmbz9fa5wzwlxd4ytpdlahc3p9c1eij3ef9rz1yslc3gbidpw73kdby1ahx6pymyby7ecu3oi3ulz2uokfrso27omvbhar44beznhbnnwajg5vj5c8jvpua4qhnyjatn6or8kba4qpd0yvkh8owi1v0inskzyllq7ershxekqinlowfit1h6xrp2l57neptdkwrtx9ljc3t2heyvse66fn1y4ja5qd9l4whnk7xpcvh',
                parameterName: '9nzseyk6vmlde01nn1ftz4emge9voblrfnx8g0ufhdqsgxhqol8mvd5cuyzn3mukssik5i47j7zxe8hnapt895ktsf7lyw4enmphlt8uedh5eq7avq9n5e06s1znglv7hky02gxbkzcitzgpaff3pje9xv905a69gp80wmtdynxamod0zx7l51ar17vblz55exk7s3e782i6gp40niwo61c39c0bi379sl6ly0v4g8e4vzqpminluxkyl942pfav13cgmr7q1428hmcv7sl9rrbzadk8v68tbvifker1a6cpprfs390xup6n018r3f5w',
                parameterValue: 'g4pzwkndcjtfp2k63cjw9ao6iuv4l86l5cpzajhj7c88c8oblckhz3j7nlk48z9yxqb0qh3p3zt2ljl8bmw1m29k6wzt1fdzm6mkgc688a0aj28yhti5kcfuccrthtxu8wxrpsobs5q5gukm7ztnaptltp43qsrrezdo6njm43jdkv877uufn84anb5382x392l6fhsdkcbn44zlj9gtzy281ctevmp3104idez2if8asksmvm6h8ijydgbkatwl26zluxuypy81fs3tw66p8lteb1mybfd3wcjytn1lj0aq5lblg7bgr55kmqc74aii5qpfbzo78d350ulgb7v0eg9o6t0i8orzo41z1tifzcr7citp1x5g7rp39xgjycyfqmjwsotaladjutyv52rk5nmj89l2hw3f2yuefhjgqvxi1uqlfn0evksrxovcbekiiqtiqlx9k1tc684cmf7o8n726ku8kiplg8sinsc1ob8vaarfb0h4qrryd0nmoa29fqvksvmc3ygvp7q11172ecihwxmptmzyag70wp25rkkwuhd2jjt4swvfvcu3h4egodqbvt4nn9vm8s6d16sk1g2oc3y3rs278jxlpw3ua0q98vcieklod7j87l6hgo4iv2dooomvv2wb1uvms54njrmbsjms30bdymhkomqbybs16535blzjhxkvurd7wyz7a3iyom51rnolgz5d0pbxoda2r7khaf96cnmuis2323du3oma1rzyqp8y0beh0qx8cxj5nzyp0brphzvmitglg2v9h218ub72s6rxqe352mxzq5z8st811ugmftujw9op79p3thwgn4xvr1o8j4xwmmsz193dsdeehdhy3k67hr2eqohznqmic2lhfpdtkyqodirkqsq7az05td3r63785mokqpe0fo5rvdrsnz2nexcefyves5i9y7wbg603b38j51rbz1g63is7saye5f5n6k5couyt0ovag7fhuzga4e3ee55nw0r7dsin5laozbnb',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'at18nnscgkgap7f2zqd6iisecalq5e4cgzsudzps42lrrb4vyst',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'clqm2hv0rcieer4upaen',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'k6a6j5r7x3lxz3vns02ivkq8kccd86gmt03iepzbgfbhtat33utk3arqcx1pz887l7fgy2mbzcgj70d8cat4ib7m5z61t4vr7lgx0ecoqfgv01km2d060r2my428drr9wf4ce16cebt2zj7oe5uf75u8rp94ijiu',
                channelComponent: '9qivyq8fcmukvydgigdxradf9gpjqxpv0rb65bxgon25p04wduwbr9c97161dyemewxl2isn44t1hkm6noqdjvim69secfbfve5l2yh76letu8lurof7tpgwecnpre1bc8gnctild0wn0uat5y5mz0ftrq877sqs',
                channelName: 'vh46or1eq3z0ykrnasbs07m0ueyecr9cq2aabh9xn5bcrngeigo7bxpiqfoa3bjya4th000xgd5dl4wr6nvjjhgxrh4kkavj4qv2ub66ysa6vf1uvidnp9scyun9z194zyfxm8d0wb9spke4h7e69qgpj3urj47d',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'dtr9v9kjkgk6gl1v8w7dvf6yst1990h63ycgaaubozw3xxfcbsy96b60188xllbt51slnn2e49cybp0hy8m0pen8ofvoh247o90n5tlis33l0v22bybspri99l34kark9r84wyccxtl00p425oecgbuvixnln5f9',
                flowComponent: 'ckm3ysrloh1nq4de9slmrknfp5yk53r5s2q9qp8d4zvbl69h4x4gl6hr3gne2bgu3qk00z3p1a8gxw7xqfqk1pjs7c3qjcfrqkg0ukhqf4l3dgqq0fbu8hy660m2ic5x75munuzbm7hd0k1mr1y09fp72nd9vxms',
                flowInterfaceName: '84nygmg6u5sxuabwe7l7lokzd1hu8nivi081j814dporbuccd2fh43oxu30fb10ijvafvyt49m5znb8e9z359wjiu2j9rfox19vsbz3991fol1vc7ybsdymm8zrx1ueujgto5bqtyzhugdiyldu1p011n5d5y93x',
                flowInterfaceNamespace: 'cjzcvtk67n1xc4hhh1qb6pboad5tjkykbcd82ip96v6sd5d6sgkfzx4h9hbe2n01q1ur87n27gcr13r89upaigmz5i4d6tnwv19muxf81n9dy27kt1n8h9h2vfq710rzp4szxws5fxxzp733jtzr56n6qsqt5abk',
                version: 'kktv4aspoxgeluqzfykl',
                parameterGroup: 'gyozmafgst8cts1avviblbtvb7psqh02ov4jev2dxe1qk3h3e0gad0qmbfrz47c5w7ihmjhc2ohb5d5eccnhmec0gwvkb553ibdo8pnn0e5zgnb64xm650pc09owo4jyqeicrl8cwker62ncqysu4utard1ay57pz88l539lzmlntth5b4korxe54ev8ua7sv6oxj4ieq3mfedlqn2v11vybjbh69hlla37sstip0zriucz3eg9u4e4m3s0yuyk',
                name: 'im8l4wm0ijgm4c8my81jbpdu2ijjxda5snpa2i2kwi5mo5axcb7nchayudmzh65j0vze46fbevwf3u8m9lp4q2dn62yzakv7pa0qxg3655dy8jf7gc51td1trvbzt7fgwymnad66rvoxbzvajnhwlgjl0uopkw3h3hpy2qq2w7y3kg1b94n4k8ca7ph1dqc34jrxyuxr1od9yyqv5ofav9vo5ymqao2sifjyv75hxwvitf1hymp2o070ejhm72chp8suvdr5knj32rta53da0tu64lm8y46ezjyy0mf8u46wut5a3u5lcsjvomhdo8n7',
                parameterName: '22oc3p48gbrkzr1fyn5ftq8n3p8r5vsrxywuugbu9hrdmjeczfoy2gylvbmj0lvb137z1qn1izumoefjbe15z1la6e8aolvfedzhln98vut4gv0xyw2scqsz8ifqozxu1gavs1zowe5yjdm5xqhpumwt7db4tg5dzffhklv08v6rqpatazmqxulv557zjm4rwdxxct7l7n6li9g42ftcb2jiv4ydea2bkcas63f3v7fkk23688opqi8t5972p0htks957cijdg85cofdjtumuj9py7fsszkgkjj2bnz8gk0vxqyd5d40cks11y7s7l8f',
                parameterValue: 'f8n5u1vdd9yfmyu3281olcncgfjlec2diq3c7zpml5lfsu78947e8sq07js7bqv1tvws7lwrgdejmll11btdijejraj3g00go4440e36hxuny2ba2rufq6eoylr9ts34khkzta9bgao6em5m31guvk2icc4gdbg8ff0f4333iwmcvdqz9xy29tv790kqh1lrgngmr6evzdmzkdkc1ibmmu96kmlouiqxjb2zlmcwjcx9f2awze5pq99rlewite22ap1wdq543kp0b43bbymw1odo3mrukxzavtw6fsf083zz30lzvwe0wnips59qexstoh1vyzswijdzfxip8xwrfiydiktadj9iskm4g8m9sy7zxrpsxeje1evs3momeuzef3u4trzcak98h9g176b0z1v344cmnb9nzm6vqajk4iwdza69z0tf7e3w74fbwe5y6edz1c7co2y7ps9a0hqzmtx0hnymgblptsviz3dpmqz8g6qtswxdw5hdbpkk39c83qhyknok86g6f7mfhwfcfg8wjyav2lx1tvathaj1seaczw0snyjr04dpxo6drp7fh4ynpmlwbeonb7uo7wwfattr349rvqo2ggd24etekxqvb869d1myhhgp1pskfujldfwmj9alhpbmlxt3gt8oqg2taprmg0m7mg84524b25oi9z6ps9moaudii7l4nkutof0nxhnwh7j4fl0r485dzxsp31or3gz8neowlcae7rvybl6rrwzdh5mjvvpr7gocfy8aakvuqbup9uirlvtcjviuqwm90d4t1v25ruoxt80x8ye5mm54dn6egdojeeduwx8stc77y8wkx8tjhzq2jmh8yzowf3cyy5957y3pukkprtineoytfrxyid81qrvhksbxq0lxqc16787q0qd1nlqgs3iucooz3slbpzis1wm78t74vwpksrrg6czu425cweey1o7y3rgdf9f319u43ca586dsfce7po0sgix2c7zpn8fh7svcmryfaua98jmk',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'dmeln8ipnssksolbhf011m91dbs3zx044969fqfo4a1ccrsgwy',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: '2s85yk3njpqjlzhadd2k4',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'baev8oavw6knnc95s7339dhnpnga4bpuhz9wvhfiisoapsma04frzmk72g1twj1nvfitfbgpnoywieg8sj7uufikcl0qqkpc1l6hk7t5s02pcf7u56olpmx4hurhads6gqe6q16m2v3z42ksvwdxfxhq25xov9y4',
                channelComponent: '4y2vh1c5qbtvc82l5blzcnzcsv507kudxdlt48ioxk1bx1mhtkne8rta2zy0n3a73itev6xrarqm969lgn7iy2o1z40oerqcn49vxaur26y5mb6ev7nf2gorqswha6680ik5o4mycng1v4fq44e9rj10zasqtbtq',
                channelName: 'erh9en8i7i03svr8oihjda4da0hv9v4tp4lbzxyrku4czmzqxd746dasahptqafe4ipcblitpqt5smmeceo3modnup1cvvcov63mtq9zj7nyvmnu3sfwfn5sm13avgr0hz0yb9llie3u78mgq9ldnpu3jkv4a6hq',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'v4cnrsgj8fylfyopq6ghrad65zp5lgh8vd0x080avh5fc0n4wl6bt6cb1ss0uv3ki4kyjbvfu8cza4y3t84tbqr8nczp3a31emsumtv1dasfy07slnjgjqtbdqva9nqpml7t2oyznhgx2ecrgzi2zgze76yx534i',
                flowComponent: 'wciwg07sn8ppcczqdiak7a4pt3npsun0swqy7af4i3lwktcdjg7om8xhkdf39sr3zaxhikm6qmgt7x9adsfxgjrq38qe4wimd1vfsau4f2tuwb2kvi414nxsqto922fwi7rj9uzr192w6qnlboyjmu7w8vvmxlvu',
                flowInterfaceName: 'vnjm1tuheefxl37gmyhm7gx9fvphl1j9dutqezr6a9pe11d0ryvrxnkenrj55gw67ysolygd0nqwmrrf1zmp7erat7sf87lv91gso19kqw30uhu7rlp4hqgjlv8ofniswwf5ywj62xsks7ka3arxh30mgfih2inq',
                flowInterfaceNamespace: '73aspszjs58fbotub34i8e0ni49bckc0f6vw1d4zqoh6ywk1now28fu3x4jy79dez0u1n3cbuie5vkk7kghlg9ccki711lxd1041yp9c5szxwy15nex1jxy62036wj3lqvpdpdv7pwyiwzwmzye4cgecsqvnkzn7',
                version: 'dp5gte5fvd9a25idyan1',
                parameterGroup: '96cgqs1ghij3a0tm265j4i9uzzqw21kkjrz0wiw96radken77eikc9xmfv4j6krvhxx32ijm1of11soxpbi09y9k5u4818xe308w23mu54s6z42q3hqo7zmrkbltef2cmmsohgoib989fnt9709viaj0z325x09pgiitolo8elblqiwglwsal7nmbfxie0mler4d051voc8ne5ugyg2fzw3aolvh9aodjpuj9cwqqfa6x5b2wdgmk8zbw2f9wgb',
                name: 'xgfku35gjwlw7osf8cntez3lbvk0b1m46k99huvuu7v2vfgfkinq6q0gomn53rypnsfmvorbmdy6hsexezmjyzz8j8m1li6vq72nd984d6c0yalrzigg1s52bs1wo0waxo2opu46m0j2wmaahkma6ttxyoitv3p9hxpfdpqo2v3vycmh02mtfudnx6fqyrixe0re5891b2krwvq3tneqseyuwrk0gtzev78ox2skgvz4nyn1b3ihiepni1dyk63aycns3b0wbew8h6q677pfe3j64eg44s5ghd266eespc7fwb7kz4n3e9w5kf9vq6m0',
                parameterName: 'zxnarfes2s4zk8fpdx127tfw2t0zvdlioidrid8rl641jweatqjk14tz29b2cohh4bklzq4tic27ca7qkgkxfkeqfcgpw70uoq8cumhc2mmgto8vq3893lozbmhneq25rl6pu2g4nuoynwmilr3ptiz22j1xbdlpk7abfxeqitghjnzo114lz3sv4v7shs6nri4bbg04hnmce09vmkcscnnc68kgkt2aun1cjpc4h3syoxogstw31jnnwozck9mu5d9y9k7a714lxxtwfxd5j98yg0rhux2qt5uofj59vus0xbrkfaony0fiudvk3vvl',
                parameterValue: '0so69cztbo4ibcm07yq84tu59ltnobq3jpwxl1znllk70640v2guvg865e65vzdmrvx3awb1vxr77ovs1usecg8rvodz5oj1dbyje06cpt7kximw5rlej94tvmhlxpnzznh3leygyemu4nzfgu7menhp4q1xrg6s7b579opydi21rei98h0z7w1mzmnf8bj4qqnonfegwa1fx8uy9k5dislrwh6lagky0215s3my8jodcxs73nvmbez1m33ckgwlg0lvm4614ch6d81dgpt2js5ttcyp25fg7yx1ba21pfmr0qwfqnnyh5tqbjj8oblwwrau93h9q7zv8lcq322n5b4vl8g3ksn77vxsgry25m2yf6kr7ituz3q77brq4sdtcj1rzo9p1cm2evydw4i5nj9ocky7thj60ifj7mbvtv8r8z3jyixuc6gzvsr5hj04wu4mezjg2owlqy1gau1figv62bctviw53smnktf9z84d2xst9ct49dzkkwupfmito79l1dou2961onfdlkjtr7r5kfpgxip7b7j643x8tbcesdydt65nkazoy2a7rfpj84fvmg2ng3vuwehq0wtalm8g54fthj9msmga3sd2aqxsyun6nx6tjl0omizd9hbvb59to94m6vsvhpf8lv4pxdq3057abyzj6jkfu65l6rzjl1xdjffrvflmxtha57t8dodd80u4tn73wgdayygy8skhjq02m39wkrkcrgwjjf930gapx1bgpnm1qyn4c7nuto5cqhhtulbpo1q7hqazg9kl0r5fbdpluoz37rsk2p8xy2a1d759jzi9id7xj0nff0jjiol1y331d9zcbeuo77zt1mxqd15co8abbmx5nt5fbotw5zv33h24c00u5430z6wuzo4yd0lk4rxbtb9hcbsvr5sjl73wlpsk9ykwy5kpdbm5ip69n0a2x42izna5wvnl9cpndl4n3627qzgyd18w1817fqw342j3yhr3rbjtmjlwmh87ph29khxzw8ai',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'lwrp6atad8ig9wrrxeh799zm8z5kxn3xc5ew2l72nt5bbajqb6',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: '1k1mmrjq8d8arggqxv86',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'd79bpqpggb0vs6zup9z3fpvqvqv9d3mg96mftlsk2o8hapr9b4jkfx3quuqeyfgr0vuer6syt226oy21os93hgje61adoeua14g4jtfs4o5q1v46dwhfdvx7rr3j5mtprhsdzw9ivduhd67dtfdtb4zoxykqrlxwb',
                channelComponent: 'ef8oe878vbhscpeed6n3iyib76q07f903tp958qrkkurpymd1n737lvniyqwyuvvzbjl2q4jypnhl01cp6eg9wf3u2dvpgi11u3p8eewbqwcoj2uobv8ca8vtyg52e6y4wfo04xgetxhjwixzfliotviz93doefo',
                channelName: '8i4d322o7qro13zisgi49idi8gnn4uy6mwmrnvef2mf8kgamfsej8iof7chvgrx0cteu6u8v97gwuavlrnevrufrsq43dc6mo0qmu8dgx5n95zlbg57lpfztw4t4rz4g2jwnjxxiikdq056c4hagqqfaex5dskiz',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 's6uxds8hg8a8kixyc4tyeu52vt2m9uv4ps3e8feb6apb8odkqjfyon8793yofq02460citwyho19exi7r8t10ogq0w8seow8dju5cbb0t1vix5j6vpj94alehl0kn7sle0u6k8epb4pxw9qz5ru0h0oy06grscxd',
                flowComponent: 'fjw5yp5l1jefc2435p2sdg9bijn7dmia2agpwoa7v5br9b3kwezy02a225gk6a3lj3v3wazpe61h3otpquajvx0tkejrlt1q8qmppgaj1gqbs12wez3o6ub5iyqbw9dei22y1s3o8i84ojpelimy9v0eekls1gg1',
                flowInterfaceName: 'r47dqgmn4f8d2734m535en9twbwfz7ub3fdty13lsvng7itxtm78pxbkyddqket68umqk0pqnorw0qo52trg5tzwie88rczb6swohzors6ntmdabyl1f5iez9sfl4bsey8kw7juc6g2d7hsm1o3hj81szwadakwb',
                flowInterfaceNamespace: 'ff71tc5usngvsoytdy54w54xpzuwjrv6wo4oo2qqjlkp0spkqnge7zg1iv8r1j2rgkdfyjdevwphk8622xv220yuakist71330wjna8bbpc7tirdqmvbu33zibb75pu1lf8ue46b4zgzjz0gyneqdd4zw306swes',
                version: 'eud7n50ub12dwp2qxwgm',
                parameterGroup: 'h6eytuexam3wlltu60q4cexhfjlehax3cfe7gtjjn1to8sfzqv4tw8gfhe8xt1ody56q2e9d6vs2ebz6ciail7e57k5a7l8zaw0cm45v1md67xpe9fqozjacjjqabhz98vb4ckzozbzr1hpd8de9nir67mfxftf2cxwj228z6jrarek0b2a1jcj75evoe4pbhsx04u06mhp5jmpttcoegl4f4gw0rbx09spm6wco98dsiwyyvgs50418ykgyyp8',
                name: '97v6pxxu72rg3n4bobhksd4tn32su8q3rahknziiz5us89sma7kpvq9ubercbk6vumc9eanv7vlt7miy8kssyqg0y1iqrt948dphy2ffxmhnq6hf0k5aw1wponij3y4omps4i0uicvgkbdbox4jnh7wff67bj3f9o9dibrh9nr6ffdx1snqlwfulvxkf5fdt0vzpb3z23x90d2s02d0csw4ifovc9lowsr96fya0s058tdw0d891axx6ctv9vzlutq95op0uptu0cy5wz0x5ddwho40syakewy4mkcj4879flnn6pw9q66hhxh7m6xsq',
                parameterName: 'hae73qeodt65rkf0mucptyw6hkmcf51kjrndbzwft73jqh6j4tu891gimrcx9sywaonlc09wyxi0161j7uhyygoszcqetajlh98759quj9ph7oqpp75viydf3yulq1pmpz9a4yhsklmuo5nualgnzxu0d0xobudlogtsmgk4s30uo6ji6zh9uhf9lvp1fn8cq5zsgo0fc2y07233bbm2oqigwcd9e2uj0cvpp50rb5ob7dng9cr76ybu4dyonpnbalct0zituvbu6qdc4ie706oixlvc6oe1r51ihn1fmgzw7zvzlz8tvc9tfj7e2m6n',
                parameterValue: '76uodl24itqehr0o0qhhdr7ibq41eiwayiqe23vi7xp10ienqw8e65qdqtnjivfgqq232beu9t2n5n2zuovdaeyela2qh0snod8b5sa29wlk9b3rahqnm5jdyl4nx787lv3jizfmfwtuzy4volh687euz3wi18lxz0ut9r5yw9qmla7fk4u2c2eqegf8h7fqwh1su9u0fq0fdaneuofbpo3xmrq4wwtewd19fzg5cl4iugkid6z7utt6yqh2cox0jgh3bprsw21jrlacstck0h4uwcsotafy23ab0iy6dsdby1vjwk3t2pbxtwxy1y4pnw1b7m0hrrvk4l8uz8g36263rn5ozvfmdppr0lzkx7hhkvpajr50icnw033mh5jrayarpex8op9ktat0pyrkwx0jxmqomlafqiuiwr3p17kxglt6ql2qrfkfuo85r6t11uyizv9htrzt5qp1q2nklxqcyd7y4omewkethrsp9dvu8xwr7lppgpp5dvl6tq6ltfjx98i4magfi5cdr73u9een03rj6niph6wglzgybv3nddbka1m3thk92ovjakyjkttv1n7h0oy643eyzb9befr3ab8s3qvc38t90w68xuga3p1p36q5aktqhqoxw7el2wsru772hy7gg3c8kzbxikl7u3mq7guep3b5henazcprtdwgcymj3rpqm5176ym0bbikukfg187rbtby3o3ydegnjvdka4o13cd8kucadei5tv0lkyw6kmo1qace14kc6cqbcv9n9tp6f2vsvfdfgipipi6otepvxmtr9kqicte234273zsfnbh6asjy4e328r0p15qwwgft40oqi9v67rjxoagq1ff099gjqoy4pulrgrx8hgvqgsz2g5bi8b699enkkfspeocznv2ftnkic3nqqdw65yizhujhnag3bwhmx1mgbmbl0manmmtz3yx1b8q9bpo0xynkjjrsvyyo0q64k4z3v4l82k635tuya9gva2q7cx57p7g862xrecn2',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '1mg60ta3tatlcrzkt7o29f5y4w1akt6byusgw22h0clgvweedk',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'gvumzs08ngghvn39ypyb',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'yvx0abuknfqvlqdmq27s8gegqtcj1aqw1racjiknbqxasw6xo40qgk1l15ijho979qgw73cxoomgo85wagvn24fqmu74isuldgoqkoe5a62w90syr9eoddil9mblyqrn229lgpv3q4d2yswldlla0tdeeplfwdnz',
                channelComponent: 'hou7dye771uxvpiixxa8bwhttc0kxxilhc1e9gvl231bpyj1ukohrll5125fg6rlegom9uk72bqpmlt1rznhezizvdvcrm38n09sv4dmvjra7942bdtr6hl8h2k7az7qs3tw4tgzncn7f344pjmdi7fvomdze4hae',
                channelName: 'iebqen0ggkarud0incdy5v71wtdih2w4b8k9bklk1dxa5x7q2qupnlzdf2ghigwpmehfvfjprybci67ha77kbp30vzk8mwdq78u7rteqaipubst4lvbezqtkzfumda79df257gl78i8vk9jocquu8ccvfz261zxo',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'mkyvpo5aa02n3kl9gcpom6etixc5f55zf0fb5p3839t77yg0d855hjum8xiaw1epl7tp7qnmmiikknjvcb1s25lc2ywqaglca9w27ecl5icyen1ayppr6qy4zgs9ui0ixl37xl279q60s89ayvsdd2thgxidax5l',
                flowComponent: 't56ph6iqb8pehw65txyz9yz3h685d74ufqxtjdt8xdbfw69o6wet1vwqa2ofrl29zgavb98bz5kp78xa1pmviekk8uk9u6bnt87gfdjkih1j3e4hb4nxjy2a1qhq2udnbthddhdaph0vizc6eqe7a80v9zo8rtlb',
                flowInterfaceName: 'x87uih2j224ycxlmuxxs44jaf65s0lppkfoxyjly82iz3ex9bp8r866r5ugla3p68u3urwpb34g8setzw1ip12w44p3d5qn18f30qunj01sfcclyfxs8tap9922qosixy9e9jwpoprs3782vm6thtwpaok1ifda7',
                flowInterfaceNamespace: 'v3cya7dhm8knpm2dr3hzeapnynfsjqugv82828hwrc6tdbahoakz49hkllc1thbghe31zvfkv9y6wg1hp1ypespp4vaei7aa1elnp8gbwizqhkjv9zpjquny22x2ddaqbgrkxfccvbxlrsr6svurl9cjlfmfeozr',
                version: 'wu6xjwkqxbu63erp68g9',
                parameterGroup: 'mo0xhdbk3dfs8vi1mspxq13f80u7hsmaonekv2fhjvurfy9k2pqzextgfklen8556sh4tz8bdsr9izz3crmje5wn85o7y5mwo0iv6zh0du2n912cswkpg7z1i2vtn1xf14twhpxrs5hz6qtz8owqu4fq4y2icfgyspr50byn05loqlahir6jf5b972x17vv0jobjm9bf4j8jgds93bhun7hb1omy6joooirx833ta0topfgzzn79uogo368bgoi',
                name: '8mo72b8os9ox9m5k2wqtybvnro233fr8bglfriqmoxcaaw92j81va6xm59r34ay0t9d05ghaak9cr3hla4ty0doa4ut6e125p26f6wtfxbl6m4p06vlybgn1qz1gqia38xa9ygjkj07fclplqj8inm7tpaca0j08p1ap8gcki3migqz30t8eeilr442507duz0a30lyfr84uwjq6fdk7tm1a1vm969sl0c6n06x3qt4wiv7h8nbaeymnz00u01jzyvqgkkkgv5cpogrcgm99uwl25m36c4ho5oawdxf1423zeem922h8ycsqt9kwkmcr',
                parameterName: 'k23q997fbq2bkmclqu1p0exviake87s0unubz97cbz38a8mbxze2a2x62v28stonztwmoac83n8l0wr0p40q13jbnt72e1xpvzx5vmoe4fkff1ki2260rzc11g09ik0fnidk7u4q19mptwjkib6xuqbi5cpmqkh1ejn19htk74puv913ap7vmjpassyw3xgnswgims9g3ci4pqiq1urnjj0horfjazha85lupusdekqmny35gag975uxrd8g2nju4ujvtoa6ow5wgqgaob2nv2x9e0v7uburvwlc9dibiji4bpof49p8wm4cqruf67c2',
                parameterValue: 'p2oygqzqw4rk5r22qyzwe91hos9d6tvhg3aali8ar3uymqckm9cfiddue0jvltyuas5wz3gouy758dqik1gu4iele4m050h0wq4mcjnzp4vf0sbhl65nwyznqvu8cjalee7trqkxcyercjbe481pszuv23aksqsi9aiuz0tzr5qptljd6my3gvu8hqgv1o16z9hokpetevch20ed0udojtvso5v07i0g3e3y1orkzou9qr7mzfmvkv94buasjvp2rx76ei64jubflv07zclmpugk1nhipgukrkq7nk4i091n5iocs7hhaerrhif8yi064jztkebi7utmgw6s32e12qnodjvbjh8j8l3w1fjkqoeanoy05asksv2nqv38p5ohwcfas6b7bf10oqmr9dodzmwoz3lez2sy48vj9rvh45n119v11o1f8yfstkg0nr74fm8tnr42tc0o3cqze8rtn0c0kbl5tcc7a6acyrvazty66alci0z3w2jxlwniyyms9xg6fcsot4yn0ha1mm1cbkfm2iyeca9bz4ge44b6di1ljrphqe2urcx4t1et68giwbl2f48vdj4f2cxzrkqg4gz9q3pnanef7pcdw7fgw42ub4mdhlrs2uebwadevejmzd1yc0sbow2xwdiv1l3to0krlk88g2jz7go8kk8kfs3bs2oesu9v6zeihdehjka2i9dxe6q6iabr4em6dyvdwylvw431v440s7u79r2mpn1u3mijmjl9yrk5dydhj8auhrq5dhvfgag2lpr8gsya4ocp2uwqep02rz1z714nb9jjwj00ehsh2fmh7h9iw81gpxccymj34lsmgsfzzvtc7d9ye98ebpnhxg6zci9b9wpnpxvavjn2526mi0646684b5ccavbf60v2ew27oyl1pzza3m16s5bdvjshjauefbn5shyh2t50svx2so7ymset5spjw1s0b1ywbcjceyi9orn05p31plsonzcftz5y1n4lc8129od22wsjdap2h4xe',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '4n7d8ut86iu7pmhl6438awbvmgjwazi7uxuvb9iwful9sgs47w',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'ky6wl8m0w41svnwymjnh',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'gt8767ogsilh7bv3owo1bj2cc01mv2mdbwot33me6kckaihnft21wdi5k038398dttd4xdbkui6f7422htyndipygb2q5au7dwcfohxn3qszedimyjkol7xr2dfoq9r4pwvekxk6sqp92hijn23lwaip2ksv6gro',
                channelComponent: 'xlyw83n3raprqhb7t4q6ado0tphkgnq41qsypsmxsezmtvcf2151pynoe10k2apntlqr3xng6kglg8ofod99a8jw825qryp5bf79jf6r3d8tib6khvm9wo3gb6l876ufuzlaztx9hsk5zknbr76jgypw07zswc1g',
                channelName: 'ylunt75uqgahl430kzps8lzawq66f27gvykepeccp2p0p1bi0v0im9zwmta21cjflm08yoq3htkjwtb9rdk2wh9cy90at5wdjm3ophepy6k7o3dqba5i15u9k8eakwjj323gmj155ednloff67120lzism9ysicwz',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: '31vkzuuf6d81m6wbqujvtge7fgy24x8widk53mynkoprt6g9y77ozowdgdbzia8i93ltcp4zavncqor5b962x2a4bp5hlz1mzz54qyf5ec713k1vxha6dwm01sbsg7uua64rmmby3x8hw1b67e721nwtntsioq4s',
                flowComponent: 'p4cl9zxavbu3i0gga4wt6zudfvnf02qt8icgboj1uvzvlqmfplfqcz7aox03p4aurjxotzsmiqpbvcagj76f00zxnjlibf8r7jkmyk3rbepnr9762c01pu1mzp24vxsgxjvw54gk0vnsudtcim1jgdmfwq8j66le',
                flowInterfaceName: '7bg68rt78vaycmwyw6k7rq6dlyl4urzqm0dihgvhkw8zeole1wk245ovljh5yaynef566h0jqsj7bj0ewht7sk3bfxccg8603ulm7gzes5pu94oi6egz711gbqphaps8d651z9dsshunxacssru7zvhf6uldd8un',
                flowInterfaceNamespace: '8owic5anx1t493ifb9jj1t0j5h3607471kzow58amwkee0vqcvuicsi6pqa6vmycl15q08ervuh1ylxgqr8ly4nlk0975s50hn0v2h341simty2hco57843k5fxr7728mk9t2aupyebehulvq2zrayjya0v7qbx9',
                version: 'mqwgtfea1s65t9vjwgbj',
                parameterGroup: 'qzmp3c6gestpwuzaybeseicra0gmektk9n16ybp8p0v7tq9fj8h12wrr36yp4l3mgppcapo5rdl6u6v2nbitfqupf6awrm18qq4qpqob038u00gxsvyny8bhciaeu3uhwn0hseclfhcol356u4r6uyhszws2pumgvcecj81fwd26gx4udp730l9ueoeap1v8r8fpb2qeycwyi8x7hbpajkip1cwycb42yor7g2lv1cszayq49e27r1dsnsujsla',
                name: 'by3yrmrarbjt4nagzrrb1inulfogamlg3wbwbv4h7aj8qnzul0772n15yopdsyrsx8tk8ch2kgjlx1hn5kqz0u2ocxymvwk9dwcmoh74726z2e6drqtl2um7wwyjt75rn4sb1kdx1rtwm2cb48wfrele19xaepghtj192owssj97tl37cl7srygvs1kbmffomptlccx73omt9uxbas1yzg0cmm0006vuhj6a4uicgrk0dubcu8dgig2dbr5scy716ys1b4jt9v02n53avsrps0yryh2qbn9ti6j5ckw6sdbd19sp34rzkp9yxt7cty1p',
                parameterName: 'jifwishlj8r87ts0jn0o4om7c3whv1tgttw8fe9lircbzf45a8bq63681h9qmxkxti5nxz57bgi9hjkplyymi0c137rls3ut9lalmvtbi90pa3lzfuh4u3fgniw6szbdq18dki5lv6oqyhc7eexg2cg9gzjo575rdnnk0mn7c7e2ciyt9ajnp5n1z9pnl1cypihz0wlpemjil9lim716u1i0jh53io4yt54o9080s3dcb3i9k0n6wrrnrttnhry46th544m7ysf3a84r3oi3yort3s2hhmce9ush8mqzwg7xx20r2tb69nydv1zdde3c',
                parameterValue: 'whqtc6phncz826hg65r8z4ch9wxn919u8souu0ch5axpia2zbd8luu0d3fshc4920mu858n9eeajmldudeoy7hv4v92vy4u3itk6rse0kvsp2sw5qzjr2he04e8kxm6mv34t2a8kyiheaxxvft7os7s1gpj9jnr03vf2bkkwz9nzuqb4ekrxkuse7zb2z75xkj5o069bc65s64i0q225dbb9xauenc5eowm6vgzdbx0o370emhobqogc95g473s9m7yeaib9ej8t3kvryncw0qs0h7whvtohokonry0jgb0ve3ak9zl1k7qctr7a4j1zbq9jdgsjbeshleiz4pwdzix46p7u9is3zaolw4vkkt3aryjawcr67rbl1hk8qc45ewyv3h8tpkl1r31c2qi85ywfxdfdc9k81e8cc8u9d2j0czts4uua35ksiwbalrya17kwvny8y2edfz5g4lpdh3dibtxx8aoi00jl6iv9opbj7gxks2q0255ffuht2j7cn47n408v6z43fgc9xzn3znzcnll7j2ck1q0bpacj4l2atc0ja76gzv60g0xenz18pl3g67s42lmd5j2x9gaw0997yp9ep1o0zntp15j0et80j873io1ul21cf8p1os9mayf2km4de7tcyz8rittvrh9azlvuppyijnmtojf3e1djngtr6fni3654r6tcuhvn9pyehc0udr9orp4itlq1q4kvhpng89wpw8wmjj9htj7wffmxmpkdbf26muhjqmtqf5sdxym2f1t5c4uffavy1t1cekx0lqyzefg8c15be3d6ustpmqu7yg557yf5ktwdclq6g477e12sfqm0nubdfvuuqkpkah668ikcxmorlf21s08z5hhl2wsvseirjtlojjrbz948uf1tdl3vepybor8454cub181so48xy7jgflpgftm88dvo4unyn082zmaucgydrsotipzp88s0c450stab8gl9o0wyjcheeyxre36a0bufvbb1m1lafjrrobp',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'i07zzdtpq4l132txgwtxrjnwpg9862r7xzrzp5og0f1683xq4o',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'l6qauw4gg0jbd4sse4j8',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'kli8gs9wrjnohyu9sp1x9zu986ko0osna6ixkv2kz4z9rw086mrgzs97quqjlsx0fmqys2pmd28qyye5an7m8stkej2uape16a3h5sbph98dftms7d64cdg5kua43nwarn0zbveql4ksgfz62gw3htjuwjzc76mw',
                channelComponent: '4izp733k10i4bkg8lvnt8sbi3uc6zwsoomnasp9xjpkw5x9b55kdv0e866g868n2ibe4ng1d1mf8dar6xjxtur9fd3kecovjbchraizulhq3rabj9hh24xkxtwnwspj3hibmwth2tljxbqm23w7otnb6qihk82wd',
                channelName: 'xiwx7fidlsj7bq8jkfvyd9errtzdoyh0fdba23auzwaavuyd1nl6r7pihv2qmxk2zq7lwjbqqrhzww63ncz6040ri3ndultun2v2tcwqvmy33dxx2r6ukia2qqgbbet29jv85i6b9670pr6q6wemtlwfw8x0xtaw',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'lf6sue8ush1xtjh8lh83i2dpphvjzha53n61pwb8wqwyik528zktxxxd3kw6i6qu3s39duq4v5nsnu1bc931ie02x4ooympin5lzsw2j1vanmjpmwxxjqwin83au0sb9qk6uy4n5z1xql83cy65cslr1j6vojum5g',
                flowComponent: '4vcqnhmwjb21jnnypa3q3hsrc41onnectgfgelzfmffanjjaihyi91nlchaov8g57o0ioendcmxb1gpf3lqayezj7lhym0s8r2me5hjj88nyqt7b23hs65nq76q4yylqarfxkopxgxr7g2ikh4ayuzx86j4fftm6',
                flowInterfaceName: 'm6mvzege2jo9molujzhi6xnsup7nh3hm5nzb0s0gz435vik9eiuria3uf3cysc8a4ujp9hbmwdr9nqcuzwr5z5m35vsnpirmvjitdzr3qzb29j9wbuv8jufk0r17gf3gn94kn78q92hlv68ynj5wjoulatd2fg9h',
                flowInterfaceNamespace: 'mjz2tstlkxma8exmpza647ic4anhfhf60kipux62nwg80qascgr2zjw7rex0amh3l3c9e0qmf0dke5ibrgyljut49syhyoj7rl9l9tcgfx6e1e9sndtx1symbolz9rie1nxkz5m1ocejkua5lup2g634j0kpk980',
                version: 'oajxhd4oe73x7uuw0let',
                parameterGroup: '57lun0cdokuyi3jb16tb73yr3pela5eephha94fdtzfepkba7ls4t5nylwk7xh22q3e4cien3n9710od5umpsckn8afv7e59fmia5hrsz6ygrrab4zqeg8qnfiz27s10cbdf6l9hotvn21fhezori8m5blxuthmes8qirqk8lfnzrluj1mmv9bribaxnv1ghrwwchvgm4633qv5xgn81l20dl3kd0vw72hn959kwutl0daycjlivqjg67dov5xm',
                name: 'prsdnic9vdumcht9uj2sdi2jymrcwyhjhqqsted143w0k0xbmxnyfgc8hstqbs0jqtei201c29txrmrynsuikuafweaca8q2mdcbkln0r27wjgds0efnie690izpixwbujrvlkwwyuwx9lzxle7ebpsp9tznjxml92s2myt1kp5tfvvw5lb31xtoi7tn2dxy1ru2d2v7k5prso57ae4p1858ubfo79xewipx35l568lkl3q85rxi0mbgeytcpdd9kfb1k43qjzgwrwrs3ymkqg8kpgf0q1ip4rev1rehfkmusdpt1przxspbukr79eo6',
                parameterName: 'q45wtk0mt2k3m1tml2x995b18sp80r0wq88nvijz3arqmw3uhzwbxxogtzohnradw0tzh0rt9lg8i3vpxc7v5bb1oqi2i4zitfnqd30by7wyjy1wclm6s4omxkv3ikkjuzunpz5v4nnsokf7x1hjqewqi1lrvmhcpbg452hqjadoz1smrtdq61ta2h4o6bbijnygvygv5s081797kajibqrb71m7zw9g1healgtuxjildhjbxo28krj2m0xaqbxzfotdb8cbcl5rwke9ldkgg1aimencldfl9omdftxxhik0d4oslr9d0vmsp9i2ivi9',
                parameterValue: 'cugegy2qa4lkz41knqwbejh3hh0xe6u11d4ozqx5kn31223gj9xuq9enqpoedxgc6gswljcqb1gzptl0eux53rmv5c9dkcog5vstivlvd43qmdsw1lizskqj1oqaexz22gu9om0si9svij2926arg4bbs6cnn49zghkafabgjf4g0aolxwvc2opj4hrmasnh3t6n4ef8oppi1m1ald61bqqssiomz5igkoqku9mlkpl6vselag2xekusp79le4c9enxeu3hr4ld7h3oy9rd68g8eqmqd00e0lo3uki69oqn1iqa7vum3gov98o5x61yw6betxnz020ypkq5zpg82ued1rk9m2pq6y98m9siim7t2ciiin34qpif0yfzfato7zl2bi6qgiugopbe23hlq5byrc0lb5tdpcis9fyi4uz98kfltfxapocrzc6xvbqp3r2k9nua86ycofafqnzcxnavkzx8fepsi36ripvog6y0jnq6ntrrf17hmbk2j25dnpiugbejufoqo5wfmbxq6r9b78n1v5kg8k20byw7w9br93hnbbl68xx4o9okk6pcg0sqd72kmow04e1nr7q9pz4hanm4lw3pwoqu68a34tfcp3qri3spuwjsutpuhhl61jrerw3q8j6gaa0fuwbd734a0fqo2cuv77hyv4gpq25lbqchnvn1mqxb7wge8o7cko9f9mwiis0s1lgfe3kosb5geibym6akx7db0rivpg30ntn0mdq2r8kcuo1tyiu1eub3lxsacfrff3tv23ix31rx2javgifcds5zqynoexlz4pltg1te33s554xzuxt6crcng77vl9x74glp5s9u6tcsucnupw57sj8f4h063pu6lxwirxf9iroxxsdtwpfahmmjt65hfin58dh6a6pwyln2u9vwgx6vmm7rsiv4z6cwmoazfkj2wp5dg7wes1eso1rrw5ue8thwu1lkzne922t089m6dndzomeb8mwf55yc98d6w84ww7lo8skp1nac6',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'la4wv6u689c5hssxuf6wwckdwc6gllm75v1s1v2nvtrw5xo04h',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'r5ugtmwzv1b0vrun7j1y',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '2khcd3bbxe0kob0nn22v931n8m5gakke3ni2w3cj85i7jjztavj3s9d7bfaj6rb1osh2bpi6je3su5z327moe0simbjypwqom6mapx9g70ik1vy7ub98i4pbdyut8kvayu34uy3k3jdtm7ebdwnf7uphjjocvowz',
                channelComponent: 'nfmyrzptgoosy9zosirvq3e13xr6oux92pua1h756u7uq31cqcjvl5zmenl8embe7wzyfe7f8jnf7hjcpqcwgny7jfz3149y4w4op4e6wu2k0o6fuhzpzhfpef7f8qfxx4a75lrygsiojo90fpdzldjoemnih0kb',
                channelName: '1qxp3491isxtgf2578es99v49b7fl3u4fuhge26rff52pu63qvt95501ctwo6p71jxz0s0xsgetnlzhbh6knuoqmmbsmlj6ykiaog65mptwqsgueuk3vqexh0tuz6wprbq7hwbumxmfzd0pdbey3ds7cb4mkexgd',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'afhrkqvih4h0pvdn974a6z0xq5dujwq26sh69rwfxcgx75w2u6pwuxs901udiiqw34mihy5m9t7knarjpubfva2dq3waqisehqxaxmcaktlh2ec8e5ou2pxg3q2mgs89bjo39mecpuped7eldh3dxwgjcja8ajzz',
                flowComponent: 'hbf7amrvw510ei81q0r7mzsgpgk3kc5i4rkowo2h7ddthenw6jw625apn5qtsawbrzfz7fapphu8m8ogi0o4ug1w7gh9zv390d4w9913ln9qmxlhtrwvu9ybrs30fhpu816zoe2qfzk1uhxur227vh53ozzu719sn',
                flowInterfaceName: 'tfity9g71oko6j6023myqknnvpyh54i9ziw89yrpcqmxqrv51uw36olpgm27lifpvv2zl4ywzu7x2rc7j9gkf4quqh66irfeglx7w2cdcs1kom5vrk2cu7smwecryi9zcyrvg6i8wk3ifecfuee5atlt3buqxqzr',
                flowInterfaceNamespace: 'hdl6xqye5lspgy6vl4ix022fylett708y29s27avxybiszn9rfk09c3yqf8ge7xn7d639w4ebr4dh9gzij35b6v4upwkd3em939t51x4typkug6adifturw0h3v6ddvstczn4c77zpp0cmxy2xuwxo0ge0d4yp4x',
                version: '5rsxfh43zstvv7o5tmrt',
                parameterGroup: '4w6v89q6tfj0pcapjjb6dv6hui1aox8lfgrn0ub9pdm1hzltlg3v5skbiigs9jqup3fwx1lj6ivk9vyo0ln4g5my09pupl1kdycsrrqrpea00c4h4bxgb1gaobzqye5oy3240ghyvex51iykp3z171th6h44rtk6h5e1tnzs8mf1jrdxmsmnoqgzqdih19oxbgmnb1g7qrk0tfkf3r3ire1d12126qlc3txi91ijxc5ya6o4coza94t72z7cuhk',
                name: 'ydoynt1ksau6odyyysuqt1vl97vadzv4v0sswoxuzmg5seirvtc17f37jl6j3h70t6kpy38k808ark1nb40fookjp3wlo4ajg3lo6wlqk9khwy02debzrbi9m9q3a5bx7p7tn9hwzit7flb1dsif4ndintwc6ooglqozaz48jjarndwopkrswxaan8iq9dt0qqyoxu07su3c8z45xvgiwzv2k4e0xkavxftm9au7wpwuejqbqjnv40av47625xiskwy95mlgiv1uy9mg6a4xz8yx1guslumufe6znlz1rvl0sz437wri6o7s2cyfpj5u',
                parameterName: 'o7cr39srypo2kbdvdj0u0ot9o55e8j6tfspzukqptqgrybg0tgfxtfwf1e4imbx4gxc9r8v4eg8cmzo0jkwnmmi53uytfs4ameb7ggyh95i2rp8eixhyk8hzzzado97smweydqxe9p5kotozx874huusmmonanyab44ieju222lboms0vijg923qj7wpvp9emj6hag0wnarz9ztk7w6e08ak2g90jjkw12a9lobmdmjuq4xy8v4vm9s907pyn00v4kkjj4dphchhce6lwlp6iscclttc4qah3lf7b4opujcrkthykvgabx4sc83s8ok3',
                parameterValue: 'rez39lk5wzgmfn4cq2a6he9gwqpfk74231bbusjtjisiepm4h36oiufqegqsbarvqlbiouvrcq5dx1afcogfj6xa7h4iv5scn8p9jtnywlx65nks2f4mtm65nomn5f28mscy3cbeik9yh73vr3v4pea7yg7vlxzm1cix8c8aelmuwta99zohmjqcxxtgd5u5z79zwi6uq66fopp8060r3o5wld7l9on6ma9i3sfsbk4grc03tyj47psm5paq3odd5flbrmp89japm49wvjcw17txmd4m8mxm98c5m8zkao8kl1d1fcbb5pl4gvvf5do6gzgz0a6kdsfk5qepl0p10i51d2rklpudxr1c4ym0l16a4o288u7wqnvgb13ta7f0kttq737bi7pfrhmj9v6sdpntqs093i4rc7826ae947ydu7ct43xxjs4ymidxqi54pqj3nb3hogo248xaej7yf3i55uahi2ohiowuanigsh6szhcoz00nejci3h7z065w165lefelbil02dj9yvcw39kv16pg1e3a1nqfi0v2nggxoc9gqm1od8wrlu1ey2j54twbnf0b6xswf72w352vewgnm875wtbfchadmidot96ul8z4yglolmh5xtupmb28rqaph8c4uekrs6ohe0a7p9u7b9qv94sn8ztn6fwvu8nypszpqg72d5bpv6ksugp5197qx50vw5a7hiz7xq3xxn91rhmgva4vc2xp3cf3eahgfztoh2x3tozuodcgkehoa3wl62kz5ustfp953iyawigzpuxuawyrdt51bapvjoi5r3evzdptti35k8r57ki0bar9kf0k6yau41e56rltnlxrfokgi0zs29bx45d2lazpe4fvxxx5rahkvpfapkk0q4q2abn13pb6ycx2g1z4mbuyigbpoyflv3npdrjrf25ifseoji24bacyaqt9fom7inafeconmcvt1wk9d2lpoufsbflma4hcl1f376jiys0rjmi5jk5bii7n0g2lksqi',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '8hxfavkjtkupxp2aar6c7pdgyi8uk6ntsp8c5i73j517qhd0im',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'vavx3417c8cwlsbkwpl4',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'prbfywfjio9xuwarkkkjib1tclgifbw23xluizpr52kbnkvlluvz10np85e0lbyqt4gulqeldfr5cwi2mw6q3p31isc28gor3cq01tfasstzk38vylqae7h7ojadqsxo1f94o2sq3vrzwsb0vev57rauqko6sg34',
                channelComponent: 'fs59onzk030sjkzrrt5o6a7708cp89gjcdzdkb906bzyovmmlwcm0pf4rko5dg9uhgntwp7w7e8est2gk7kp8wwv0ht1uf9n8z1hhfsy7vcze4ppe7m68r7b4i26h5pts9wlf4qpl1ier41iux33zvqetk5zoptc',
                channelName: 'zot11voss6fo54m3b66xtytp8iv98xivqpru06hmstojlzlyuqpuitp3enemq7neo54pkx0i0amw4iwdf5bi6xlb6c5d5nprlnj0ne7ktiezo1zzz23wxrqvjtsoxwd0zn0z97d6lsh5vhgy65qsdd0a3r9vld68',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'wcukc4a04q97tninkmorjh7bz8v0k8q80jo4sqiv43xjxrbuccyq6ekm6riphqp2471ckvrggm4y539739v0wmqwd0dxatoi0yq6wd8t4ptffuuonrh0b77noli8m9sk4unap4sw6nbk3p5ypa01c24eie023c6o',
                flowComponent: '53l3h3f4as0a0nxib5tjrfxv765d6uvqv8i8h041qchncdrrisb4mloqb7qkm5hcko1k7xq2hz0eavsu0g8pea5u87zgl2ok8pcorhhydloxsb5613boteoxyrezhbfwivrw1oeuwucn2916q0a2b6xewzw5kxrl',
                flowInterfaceName: 'kf498r53td05o53yv5kab3jt5ikqdixub8xn741656rgrryg6k7ijs1cc0dianuxzbd9ocd27y3oqqp764vzcobeayhckt4ezez9dfqv8ne1m5fz4ila3q7unb3nnet973wlhnha02zk2chz39dlb0fce6swhrmtm',
                flowInterfaceNamespace: 'r1hkykuycusg0ukjfgd17p2ce6tn8i1nvupm9c8hjoj0jirha3xomaeod5k7qx3zoldi0d8g9qorqs6qv6uy83clpg81x9xaokpb7v4rbk4dugacmb4gtr1g7dyrosqs0tbunp80e8t59tggmqo50uhsaornp3ac',
                version: '51o915wt4ob6t93ztr01',
                parameterGroup: 's9so2ve2r7pe99l8yroo5hb72exnsigaaz4bwrsv7q5s3128lox09tugpn0typgut3vyua01e0rgwxnfi11fjoyjmh81socwt9mnmmc3rxvkhj5ww8gqdi0h8z7fw6asee6j9vdrintfax0pr9us85w6a48t2h3mtlaf6ma40xohthzp84upjlmuyyqvc6cq6xqp0rtljc8a5l93gdfhclk3qas4fwtj2c134ywr9nc247wbwsjeuz7zjbvg8k4',
                name: 'f1nd8vvzbgl6694iem4ame80wpuye40f00ji28lnv2qhf6bjm0f2bfqtlvcusail9odt4xe96i198cdpj62xud9oc7uuul9sk1f61r9slpp5f6h4tkycqb0xnr8kkfc70wug8huiibuc5jpczy2on3lxtg1fop4ei2lp8wt10w8pdgtzwqsquthdxt90gjvlrtntflt6pkh5dy7ctwnn1e1oliv1o4pc5haxbphkggyi960ijzbvs0n4r2gsgu928zsejj4hioiwh067j87cuy68tdd37eqr6g0jvjz8q15jnvvif7nhx53wgp4auls7',
                parameterName: 'ryzhreipabag4h9e9t9cv3u0v6pktajjvcwusllibs8824s4vgvrkqqawim649eyxuf2meu74jbhti085seprpysxqthheyqtcoe3ctifx0sxskrq6q49b5fij5hqpkurg8gj0wvzgemd5f4kgkth7a7y08jxoglwz1crvcgyqpj2nrlzi9on05npnazc8bibtozssn612ub3bi4zdab9dc10rfpd9qf0nlbc6fnhadjvbefot5cbp1c0g97ctnksjofjvo8dq74rmhlob0h9t1nlykygi9wzwn9rmokm9qkj0k8nqxft09ztd77y2yq',
                parameterValue: 'usnk6pddutaxctjx0rpgtnq4la1wiipfru4mo5w7xza31rts7lv9e7t41s9lp86ayhbo1gxxr79y367ubm8ff4umrddthlql3hs1sq3tx7jnjjhkrwjt3yprvpqcsgmfw4iigp962cjnphtpxy290fh3zlvnxp07t4dgz7jecefdkm8oqng1wd8hlg6z29eb8wjv7oi9kdgi8d06issf30i22p542kd124kgfj2p163t4pd8mo9680fbebee4p5oz0jpfznm8td7jzs7fw0giffb10o9w5g4hpv6t44yfow3ztcrt6gkz8enfzqyxlma0yuhdqb0r49v87u2hp2q7u2kohlmk8okhx2lvq859tsdtnfwrew0mgeeh57shy25xuhjs6n4vaxkt9h4gb4pyuf5nyp1u6tdihdr20b5bvdj993sstooec8ft5m1w0hbvoegxl97u5u5mxk6k4f876g7wq8tdjh3y1h4m3l1xvklzsvjzwfxh5n9s4tymkmbzcqaene903w8uhgm1bk6sy3vfsyb9j7efjiqtf3ux9fsj5l8pujkawfefwvv3fhs3aib9sctqzadmmlkjbmd6mfo6atxzdmvahvr2xk66yysyc807qq7r5bkc2a8e4cgw9k4r7lalj3kht9mwlaw7h3cmy124oz6ysuahkrte6corfb705hngencflm0co9vupvx8uqu9oc93djf3a6zjqi7uie1nlwsm5haw45cvuvto0ce0gkpeqlvn75z07mxg8xko56a05xw9uqrhf0fjebl6o6mzo7qzfpq060w8xlzvtkqzodc4pem8yp71sap53uoej088gsx3iob7mmn4p1jfxbik73rr8nackxeo9thk9bis22ue170kcxwjoqk8vqkdjut03bfzl8n3s4e3bhguxo0pslgw5j9c632oje1uvpzqv27gw45ktfnm33yq1un3k0b3kjnj3q5amgj605cgp8k2n7fo0ywd973n6engcn80s3u3pxs3qjn6mxw',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'hurunc1868tmqh0yje87aq04nbb79mk0lzkrro0s98uppk4qjo',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'itefhn4kk8wccaf00o7p',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'c3ucu9o6dpejdizn7j7py85tm4xw7igsr78binxa958pcpcfi51vahpg2p8h0awd81gdaevdmeygrmmcvmks297whrbtfr3veo6y7uiluiacr4k92jn9qfi44vev6eo8f7ntklgk9jrts0ogesqzulvq218jw8hc',
                channelComponent: 'o11dmaptk44jo8jbuz75irvzl9mr446d5r4exvkvet79mv72iqvgbhbd9le82m8awuwaitpa7d4zcxqjwl13ab0toj86mo3n76vkaxuqftaudf8hfqa58k8wfhif850217mrqpqv42lt36h1rjsgqhpscz929ya1',
                channelName: 'knzjewacvj8jbc8krb728vjgmglszujait2gixgyibhsonuu5vh6srx1aj1fucdli8y6m7ov5mfu7kd2qanwx5t2rl2jlpbryxjoo9u0drofy8lsk6muwqlwo4d05l2azfzdjke2adlkj29dput676uyvnqau920',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'q7w8m2y41aavksvyd1bsx3bnjrjyvljo83f1serky305tqpfmcpysu4e23m521wk30xlplxi7k0sm5s5k90e7llepyrt0rzk1ps0sqyv9hzqe5tv8bf7iu6wki0hqzukw6z6aakzjnf3pz2zevhmicaztnmqphv5',
                flowComponent: 't0cclxu5j06wmaqahevvvfqppmj62p95zxjfe1wjredzjp8mls33fslu7zf13887stis0ocw1rem1ixgu6ao9vv2jmf00ebmj5tyqvzcsjdnohihoqdan3oxwg4daf5se1sktp38ic7dvlj33yelohbf5krf9cqb',
                flowInterfaceName: '4luaded4chvqrs1pol8hp6q3t22ivlf66fyd05te04h2tbm16j28oey3f6njp30sdfhhpjrxvm53xypx8oximali4o69z5n99fqcao4rg3r2yws4pzjeewz128egvmlg43dufcbn40p1vkxq164jhj1098uoz9au',
                flowInterfaceNamespace: 'ld9vbi7gybl6ywj17jal8fod2he8emxepk2jcxby7ln4sagwyuxlxngliid1ev6g6iyuv6o61x5qi37t00phiglvss8peh4cj0hwmbje9iy7oxd9cue7gr9yopddieee8diyjx9abzm3ge8xdk9tvi9rx8kafi58v',
                version: 'ttutlk0up3692mm9ozi8',
                parameterGroup: 'fekqbytw6wckvf2gru1sfb6p9h407uhywl6pub59srshucih0yitljetp5kinvlslxq38v301kdpf3w8rraebmi3ptxtnvsj4hvfnkvmi431rual3zs9x932s8y3h4nk0dcfc0rqqu1hclyfe9iozb2bljvkinlhtsmpn38vrvxjhll6ov7rwnxtesinofl2f0toakuewudxd2tjegmbyuvfdunac8b59s7wswnk1gqy5ooe0l95qeealfewyut',
                name: 'cv0dp8ljf7ssma0atiqvk61kgt4dwy0n2uokcgl62h4uf7lmldw1jqa36jch4gjfg8sh5f0hjlg099vk14nm5fa84zuk5rmsqvuoadteydn382f0evfhhwwxgelqucqlw0ygz3kua8eqltwngaw0syg0y1ymkzfqlp8xdsfdv9fq49oi4v3evic9mh7owk5d78bxuerhysyvdfqr3usouoe2hdk3pjm5ebcjujpxosr3qguhl0qsrdaw4zc78cg2mj5h3teqc42d5b7kxvqim8zo3kau8j81fkcpxat91lthxqtn0fnqdava4op9gq4g',
                parameterName: 'nrz5kv4kkq8w23m7e435c3k4kvozv645f7xsrbscr8mvergufrb7lyvi2lcqx1kywht4kfukzc05qo75o7rva8x1ko6tga4fvwbc260lmg9le0gmy6p7sfulwlr0mcwxkmnr5w3f5jeh6lq8flsl5xa4yd7u9zmeyj6iw1z2i422s13mpj60e3b8imzttnoh2yygi0fikuv9g2g4hphv6e3csgdnu8e7eufbm2lnputgvk6qdgbghxq6ll6bhukgrfa9cga7erx5ak0nd0tbfk0bqrnrtvy0bafr54918vhavxmkaw74xvhrv81ta1qj',
                parameterValue: 'mv7v1oy4knsr9epqjq8z2q4px2jh2cm6ht2lg3i572jvm1r1svqgk7pxmg3ynfki8hai6whcc0mtwb02o2k624tsnyjd2deboog3h3boccxcg9faqy96xzvzfcagr28mh1boi915raygo3dmg7cww69z15qwtzia82jr7n3ccactbt8xx2wluv77n2vhroth7iugrbwuxx2h60vq0ssyoch4huvu60tvrp7lgpp3i1uog9x5qk27l047b2z9rb2y0971zdfnhl3og3rdx1n6kfbb8iarxgmq2h65b9ht66jezgdq3nx5su58dwgsotgmfk0x0xc7f6zfhfb7pucyxde202l6s32pbguu10vvaf20uky7636jbycdqiz9ai85haw6xufgt9212cycbp7xdsnlak3awd2392by40fmnnkmkykpnsok184curgmfmvq981t06ck8o0sovd44qnof7syyalvrevbynybt85v53z6powjny4nzmjt8lq3vcqpaf0wje0fc7qws16kiijplkl91lkfjqtsi5cv48ibakdls2qpqpnj6v4jf6qmuorzoac8hja5oa26uocflcclk0xt5nfrg8d096ticlabamffh3th0z5zxpy0ol8ih4r2cyluntaxulj4jb13gj7jsk4rxoxxg97bvcdyzg0fmmz3szo2b6l0offcltph3p8hm2mtn7jf0676329bkdnregcms5491cpyafeq4zkw2jm3xi0u61au2lu7glqq9fmyxjraq45d51z5lzzlbnr62d9x8z57kqonzrisfoy2ad5qgvd2cdf4ixanlu2kj59ty5u4w9f30mkazxrfh9jsle2pxxxlo9axnukecohds30yit6ne3lxg9v0vjqf6et8rbc0g1e77xm3ncvcatq6ydmb1lstjztuhewzd63uo6euhhyvowqzw93ofaiwwwts6kkbnd6eq11n04ji62se948cz500pm4kwg1p2n4y2h0gps9n2mkdv8anl5dvgryu',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'py9pwzoxiy83fgtig098hj4ye7ghzdide338cbm0tg2qlb0sp7',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'pvwbsx00wyaeh083i7ok',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'vakg03i6p8e1jkbk2gv8naokrcqlzh6wxcpzj8v0pjcfyururuoiwtwz6ayc2i5h6l71fktsexyu0blwgyaaz1kmxqs6fbyg3m8wa6dzb8944f13jbvlxb09v4qyg0cpmihkfj7qq7jmknm5uy06qi1t052t0lde',
                channelComponent: 'h38s59yoxb54es5ui2k6sepznd2xh6rgdu1qphu6diq4oftqjr2yf3rvdi9syhkuou39xgtdifq4exkypcgwv4t93fcg7u1jm6i60agq1zq21vvxl4ui198b9pq6w7y6rckj3pt4lt8h3rqc1ktasdy8hxwd9mis',
                channelName: 'nbj06xpmfdsq04o08o21t1pb0uwzbdgc9cpakcj8t55ueenraozvggxnzulxf86qhpj4zvks4qpaaux1sebb18k5gvrier5oiwo4tnjafy5vgp6b20kcpr7i12mzep1xpo8tx8rxrlo5q10pnrdlg43wcv8exocw',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'taea7hruk2ntpmug6n2sso2ok189tj8v6glzoe9wqtcmm0ts2ttae0zkfrg8yraof7bwi1m3m7j7ctysth3z8i3l9mwy9n9mdhe3x951q3j1nrz052w616w9fcs0riftakrr1vm5cvpjx50a6z6bvam8nukhy2v2',
                flowComponent: '93vpmlpd7t08od55ybbq6kce1czdcyu0uuqt0am7j0flz2s6omjavm145zy55qz7tjopw8ynwo7d8tjhl1dwt94ytfo0i5xzisbepyji64l03cz5ktlrwvei3yq4yqgzc5dnitbzayb73dlc4pezzqi5jen0494d',
                flowInterfaceName: 'v884jw839imll23rb3cw6kmte5k5hnt4f8928wofjgvjipi38zlv4msnln8jv97pl0gm9ig952p4no3dxk5vs78hqnyue5awdeglejfbu79qkt55m7t7hs5yj5sdyktlaid24nhiygsihsnlikj5iurzi8ypij9e',
                flowInterfaceNamespace: 'x5ilf8a7o09abyt3y52qxh92ino14xbp3phzofous7iyvrt654fzzvmuwcphrnyc7zp78uzh5xhuxyce4vouc2d7b6ubv97uqaywrjcwvkhl0vjgbs7333xou3pio96tuw9u8hn123tj94vbz2iak49yrx5segho',
                version: 'l2um5pwoen7vje97ih6k3',
                parameterGroup: '3ouzwdegtuogpw2cf2vegi6fitv571m7b5799pxih7doszmnt1siowj5ynm2bpzqt7spmg7lir5zy75za50feighq2hfx6q2uwffdjmnih2g6rxtf51gzqu2u2rsg3d334zfqj5sox08o57nynwrk0mwkm8jmhvgcs6jhdpwkdnz7ccc5z3ivlr2p3imql0u00bdl1npm6buw868j63uouzyrbk3zz6v0uq3uxtfb9b151twaf8tz1u6xiukzou',
                name: 'qvpn1at7bamf92zuvg8x9tr95lkv6hdth4ezhzmc4ecbicvpg9atix8fdnj962zuccjatufapk5d69ic0kcwalgh8ym1ipwg2kgwnbwtgql7l5x2ckt66l91ulqpbchc2kgktja5dgkue2581t1dcfiyo783f99pl88ion8uinffbenwpzk5zvht0kud6z3x8wc2y9b2l61xzwb81rzl8li3211vjaw6xsr83ej2vxs6ybsi53cyr647eub88q5rxruokag2zfxibdr5g1wemsyn3rqsgjtp0b5c1gg2prp91dcb8pdeyfn9y49pebny',
                parameterName: 'udw1trnznwq5yeamwszlxjon6ypo8qq9l46feahty93g75mnvvsvumph52ntgl13zgsjwoeymgnnh3b88bump5d6reb9emjg9exazwb3uipcn891bmr3zmdotd3yzj2u5gjgpv46hiphl2zgachb0iz1ffflkkl6e9gjsmpkn614b6x8512qwn7e15dg7tuat9lqn29vwh5r4xnntoeupofrhc346tvfby724qy8a6mfqixvvq2fppw0gvvermrgwq0npfp775vwjaq22k5xkgz3oqh443u8ane1t9b9ntaa8aut1gx80xacswt3ls95',
                parameterValue: '5aqgee8nfn0yzt6yxuqxc8wvduscef6tzqutaz64v3yzwfhnm33wj9bbm6zw5za7l9kkl0n88vzr919cfj1ulqgrji8yz094wo8n0wmcmn9hcxp75frmkwzhnx5o93wa3fl44womrpmk858cg82ig8dss0leker7rz6mvmc73k1oozwimdi84y66uoyu6qu4gnd8g6uywhu5ly5fzxn9b4iywuj2fhfhw08jv7bx7p9as1slkgs1499eola799uoothle8m8u87ggctxbish40vj1fmv5ntnrdlbynr1nd5ykpfazyxrsz696e823rpebb3smq3zd2nhm1radnmbo3xaoa4sx4xcqscptk3wje50a1v7hq3b41gw03ttzipt5i6ymkwok6irva5b769kfrm11ao205rb0g75xmpmgjnhoh0b10wcl5jutavamhbyd52jblppm1o9b77z4voqzm3w73x3re9kve08cn2ksrlnuphv53kg834r6jsrmwa656c2nv5qh0l8fj995d0vamomin0ovt99d8me0c01j5fl176unuw2l7m7on72c5nq6xi24arj2xfrr4s4qxbcyfyffkauv4la4nauwt8maotu8vzawr7tsnvrogaxq2rmz5xa1kv3gvf0azpmqjjoxy10d6ychk47zw8ggdhtmqq22vi7hbhgjd2q30avww1b5ori4y9smvha8qv34pvz3kiocvgt29hrjpp789h8wbbs8ggxbdyophu4jowqhwlcty0lh36tsgdv1n5581ei560wk61jj9xra1cxjbgcr9jg4pwfkagswvpdvm4xl3hnfxhp9so8t43eenx7k1cill9rt3y30z34dav5w9p80ujqg58vageme3656l7h64q55t04whpx1cfgsj1d032metigi0zkyfybl2rghlgri2k7fisul27vd86899d3shn75l67mug5nfo6vu0msapqzjuewxo4uif16cfnfoalwm5xjq1r29unsixwygy60nsy',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: '5d5r9plg5k337ph9um8bi79r3sdvl2de45e0r7k9nmdmo8d66v',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: '41jbe1r5jhkfl8il3qxk',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'gqr6b0gjl67e1bvl8df3viaq72d7sqhbo6y92djkjcy3bhf6hcgdvrvr7qhg0717964hl7we8c6liy0lek91q61nxo7vgn3ghpwvq042pe6v91r1moqp1dcakehv7np4sqlalz33mn1adguvc6e5ewbvrr1yqhul',
                channelComponent: 'wodg2vlvxmf7vhjmxyjmgxva8gc8crkf7hqzaw8p6y7hywjcfzmriyxxz5hea77ag849tujrikm724kpt7icd055ygdr8yqmrgmul1mzdob1gk72bfk7ru0tdmgyczkihket5ic4g9wcoz2nqg3uogyetisj8twg',
                channelName: 'ms4cgq75gptl6ndmi7enck6nvbjtxcx59ub52a2e9jvq4crparms5n2pzegz1cq8tigmczb9cg1lnqhy9hrgyxkr8q2lc2h6ia2jjnvsl14q10xab9kxv1mpey3nwh7aab0cc9mbdoid4n0gfy76shsx05yqrmtm',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'b39p7h4ec2mv28w7ix9s1qqd1ispvx3d0w5hm7wrs2zy5idxh1btn0cbqbdcym5gd9dwjomloud6am66otidtfp6avdng02tr6186mgkjb3ysgajhbfw8zvcu6z147t0qcpety3r1t54yy4i7eb8hy8lqtmh9aoj',
                flowComponent: 'p5bnhe1qoy1t3ft3v8rywmsuz4jn020k4cezw92ihm5bm0zmxmmolmte056c3ff3kt0ffxnq2tnb04uzz2s2u2k376tqv4x3vwqp3jaklf2prxo6uv77yh6bv6pyokhfyyn11favbw866ndo2hmuorkmznich6n6',
                flowInterfaceName: 'vbu98b7amqnu8arx45lhjq4bow4svi1n4o9ku5alqr5xogh7faesedi5ro0thmgrvf5whuztf7b39abqn9m8lu1pdzzr4tc27183lr6vn7ouskbd9ndgzrvomw0id55iiqk4rcozbyw40oz3l3bjbgl1zzhv69r5',
                flowInterfaceNamespace: '95uly9wo1i30sntognwp8ol4ff2kn6snrpt3s5lydo0hxwb3ucqwxsytvbynrtp43q7x38xutrscppxz1pwl1w7cd30pomb1z1wf1rzlav64t2zxrrpm4e9bq806jfuoc1zuaky8olc06pwh9b8xda27ss9lvpib',
                version: 'jvbxzo5ipc4vjvypk1ud',
                parameterGroup: '49tl9oplbqwhn6amwudhrb3us8ao773norrsh2zj8id8n25956fs0k9jzv2jkgagz2gpe8evvquvc8wgeu5tfmqv076unti9yjgr6fjixgs15239w4x986l883u1094lsa4vqlg7ojnfldhakv2hqcqziqfvqlsiymmbmbvwicwz61fxyq5gadevtxpwq286uopqdxeyfnh8tvltr5fe7nhwzyzidpnr8ro0s3t453j7174326xme254pvzmzlek',
                name: '5luiu852sf9753kne9b1ys4x6r44r4ue5ziw5slrw2iz1i341n33n9idptojt868sl8c7a248ho49a3qdvz7beqen1nxtk5qjnnvfc3z067l2royf042wwfqehcxgytf5kk5vszzmxctneyiemlvwmha07mpcets4ebv28jl4hyq5v5hh4cy5rhm2oc9ditaglr8zu39vrq3avcrfkmiwdvu4474zw051dl9sidahtod19kaieqfj9bk3iao27iufk6mrw3pmfk3sv06llqv3vjsfz3d0e7uxfa0gibrylewiftqta8jdb7gg1ywg5zy',
                parameterName: 'aw4aulec32d7uw6b4c6o6n621xu8ea15vcv3tb7aq4d8i1s4hhky4rqwaguf7uq9o7g8nl7lema5pe9kolzoaoif72g0ws3745jigfsq4hw8gsee0xsmt4z8ggbm90eqscu3b0afzwp9mymj9d2nnw6wcwcyzxhvyyckx0jj1fbgekwq83ols3nv71wpibzzrw6s1brluklklflt27zg8lrc663kte41f9lup28qkzgp58j5ngmz41zeo99vmjrk607v8pzg8qzigcb9hkj845o4g0nnj4kdl98my570fn5lecr2w4l16knh629shl46',
                parameterValue: '1fnmrm3upurdkgtv5qxxm7cq0vtouvmfksiy8ryncbsuuifrztz5hp1wik9ssshlyu3gp6qiq7pfh23f92qi5ezs3ukju0b5969kquk103skv634e677sfji5d1ajdxcp7945fhdttxigy4pxvmi04doqvyv1f7v43pfosjb7r69zldbvkkjp4q5ke3xx56nfoqcsk96zuqiesfyvl4rqnx2o3chwxxopzg34a1vdkn8iqccojb2fmggvr8ob1vy9ydm7e79pup26edavna0jpfzuq2q3da5nchcszf7681e7sijvk6zft72l4o3qrofbq5dlxbbtrdhdgnlp645j60jqmx72lg0mgiyu2qmys4xyrcx0jt1fnvqubck798oumunlu480wgc9ucl1gk6flodlyoqwwifsg3qweeso9lgi7drkksyb2lbrnb011hshsyxro5xzov90k23rku4zlx4jpw5b8e79odf3devobn0klow27enj08dvfdkg5j6hvylmwchmp767c529ltn0i6e9eo3581y3osrne9mguddg57g564crxu1ew7p8esc6k9ai6a7or4a0grbvc6nbzzq25drgrbzxjtg1cjt6b5se25xyfiu4wg8au3m0reogj98qxj8canew3f6ieq45a7cwuyqw0hr30sjh4igbvap6g9qgn5sorx0s0zu07kr32tqxzmy4mgjl6vcyga3ctnnrrpurf2dnapv443ja0t0yxszb7kq0l0z98yiva25imog6yvj1jzv8q7r7u190va4430i38vnf4kk8l15y4bl1jy377o0h68r463ynh1d00x7qdvn1bgii3xrdqfwyaodnxwz6ryxhe9khf7xc9j7wbrnweci2bllup9le0bxt61i6u9lthv3d0pwyk7bmtik4vs0h5vpkvd1ami9vvkk4sby9ce980ipax46bfj9ucdshff2pbgt1el129u4o9rgduobh05nr2kf1ubm0w2klyf7w4jpiy8j7i6zgj7y',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'q17uhqhyiywfzvp6l1dpwet57pnjjvl0lwempf3gf6n28h7b2w',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'ifr5jefrhqmlwwvfo0x8',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '67g5m6mvdzozjeuenn7ojza91smi8iry7dkawct749ejk9m66n4z0o2asfi9orog69wkinde0uejjlbj26ddh0jmx67jbzf4tojuc8rqm2fd2s4clvuw1th75bjxnhll412sckg8lij3paoh7ceb35ubemd32ywt',
                channelComponent: '6ywzbhyzcegf1xt6gz8b56qq1wobuzua2w5ah514yzwep3kubx8q3nid6c5pnqwjjk3xzrrqhqdgwvpjplev5bnmiyfz4hbn0e0rfc93ymjq6v2txxssig1dfu21js4b9di5391526b7mr34ya06mf1tbg4kc0cq',
                channelName: 'zvenzo46syoxygh02v67540rihiw81qga1gr0e5xkdhse28mk2l7nqu89zqf501qw3gxkqp9hgggomdkmbvnmsf4bln5uycuy24kt9s4pmn9pvpl8uua9pteb3ky6eb5jg2dudwnr5d9l69nxmrlhky3zdogmdrs',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'vhi7jgjx6hpips8hyn47ns0s2o0z8mmougnih90vjuo76tj6tbydb17fb9asdm523boi10ii5hbswr1w04knsz47oc7extqpfas1n7659x02cyww4b94skyjz2ns7ejju6vzuhchw1dtf9cjn2rq3dr6bwjn2bns',
                flowComponent: 'qs2wk267uq5w11s5p1gdtr8dxhp1708anet2va886rjh1etdj4sczalqy4xlgpqdovfjt1r7fyhzy6y64u0bo0ghgpgcc3q55duez0hskscohbp5hj6dmitwo804iobokmyj4frmic4umrvejoi0f2j3yg0l2n2p',
                flowInterfaceName: '7idmf3jqil0cweuwaslcmprxusvbcwkzk7970wx3b2h12k9whbmd8k78kkkjssxj1pva7noufrnkwjzzy527fdp3x56zz08za649el7j6py5pj9adjhc2ewrk9sy2ovghzde9gkhvlbaolnu9rj9vu39u208gcev',
                flowInterfaceNamespace: '657ts1j9wwgt7x3oxtzklubmfxt7vrego43vv09akdjl6xiewe6hjy519gnvk7iyob4y89y5r03p5d5x1kdbkeba0a1e8z9kpyosnm3ifcaxy7ols6urk5sydqigrir6bloty2l1jh79sp14h3zvj84hp30k44u4',
                version: 'kuzc7fs115elqzs65siw',
                parameterGroup: 'toheaadhtfjetne1xxejxtr595awevwqz8u4lzehj9f816emaxr39ef6df1ew5wrmss4yjl1udenejc3g4c461ev1oomovfuqn934ctv3otpv4syw80xq7mf63f8uefxwvm9h6v4qri8j8r7q9vyosha7pip8k7pxu85s01ic6i2qr49nwdnev3n1myhgh1lql7kp4ehae01v2wm275ontjrrtmpoy0nihssrvjtqg5j9a5dkjo5s88gg1s2ctw',
                name: 'w7ds5hcnwgqi6wirfu2ncufou49yesryptvhciotahja6acxsxryxf91aza9od5rahwb0cjpqvftwtzh1qcz2z43vgs6sa44zgdjwc8qc8wh6eiuiy3nc91v1xw4osgjas16gwcrc26nrf5gxm55s3xb1oqzg30pp4e9xos67rurh8ylaoptq4cba51qp7ugmpsandsx4qmmxxo1yru4m6sfm7q52j4o0wkdhfnr4nl3o21kt0aql9qq09mfrdbba4oyh93g6g8oet946fiilzqwekksxwzalwala62zj0lc7297cx6hsb9kkqq0rqatt',
                parameterName: 'ym523yr900reja5ivbcs4ev36n4glmmrwyhzi0bgoqpxvpywja244599qymi3x1o5wnlj161yh4519sar8aao6uujqoxnrlnpg4mgmyxd48t2bopx9rfm81l2llnyel7guoqq7jb1jr6ycha4me5zmk6rmummm3rmmjcz8gnkkrhpionpyylcarnchieib8urt35nod0h2j1h44wamn4dbt01xiivbbbc2caeolzxjwpp91g76m2l4qie3cwiue9bxv7zo44wouw7zqwqfe1u5frd9i2gj3ahc882hierxrgk56056p90wcffxtnrhgl',
                parameterValue: '5ze7y9vj3r16rnnrtouzj6xehbxbyuseg0xyr9vs2i0cjrfhvn1461zxbnn467849wnflgqaad1rotrhx5dwfp73u9dkzt97xex50d9l95ugd9jt48cxm1zl20dhcnvrod4578eevdftt5qilpvdiu35cmvah8dnqt3rfrk8b3ztdkvlgsy9cmy8nmx44si0k0y27kjjovfle7nfib43ja6jm6hubmacmoil2jvukxdkcvfeb0by58r5rsl6fdqluhjjim5pejgyi0rk5lg9sldgrxc74dx6okylv6c9p8y0ay3ls2m9sutip41wfwzo72m2smeey4ls7tmt1ovhyrlz4s5tl31gwu1q9mot7p4x41bh3hjnv40nah3zxidvklfv2v571ul46os9zhbjw55cbvybk1sf6h6kzg2ar6bthdjgt28npbr7ca1vgmf9hniw89z5b3943js9jvrn6gmhvayegmfdtryslt5ndaqudfemx84syyycb8ovmhzkmj2k8cgg8arxuqiy2v0h6u8f0rh09akgx1xta9ep10h0c4gs80oenveheh5hla4m1yq0d6b6h9fqo6ls7uvvii03q3j45j39kol4lfrt45hr4rllm20umootav6tqrafusme65oeyomg1r7jml2t9ncgkadx535hv0q8ct8emf5wzpknw31ecdnir8todwvixg6u3qny00jutggs0uicjcdm7cf1xyrpjtdnpn6rj5waokx1d06baedr616d8qy7tl47dwcw8xggmrslz85wgbe1l40nd1k5a7srxs5a8xkps3a0rq4so7gyetgssf4joqjkqa2wctx66xvlzh0asrdjgw5so0mdzcm9hbksy09xn3km6f7tmbjivsy9952wmumonppwpbrt0c3wseo30jv5wlzsnc1oys4uj179wbgjm2ns8c5ogv9ghrbgxmgo7309etvg5017gyhlcvt45ib1j25ywlnv3q127igt28nansrgafgozxyzf3if07iz',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'awly7tikppiklbbfq9t8s0wdje4j6ot5v8i4oskvgvz81jnp7d',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'et4ojk59djersfaxduu1',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '0jytoq6df9kr7auopy0jr6u5egk7chjvst708h54ke9z76lf3fh15pm7pel6tuum8pjjlt4ppjslytoxk58qsqh9b1ryox4lhpbfwr5sg4a7okgb35xasa66rlsyjam59w2p5fzz5gl1sel40r0bjsa3lcv1xw6n',
                channelComponent: 'uh45j09luw4gwwcll3plb28495wlm8cu4he9nqa9l6nuyy5st5ssdg0asfl1f7rfshuulcp8bzncfzazqpg1megwde9ngteqx4e2jydg8wcd2636onu49v6gdrkqnhy3giu9rxz3nzzq6bb450hkyh9fxetv9560',
                channelName: 'jdq963y6zplmi7l7g85sz8w37ojilnm1o46ovcvb4uj9bdh7ufv3kymdnuliu84flevdr8qtqkfvzhclyw63gyl5zvzg4at5y4n0w1xtzkvr1f7isdwiuxnh7ru9lv9aweaspgsmej9flyuknwk1y0ii6sncjgtd',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'q9owgk495lf7s1tkgti7ur5n3e3ja6ywrf4jbckc9vet6ph471n89694hvrpxgrerydbuiihlye6sfif46fimd7syvqsq56doi6kcvspazrqzyw9yjka55vmzacq3nprtcr44gtr66arp629kfokn0tuj4bfpfw4',
                flowComponent: 'duaz6cfs626dbk1rbr1qph7qmx67eak82wxu0ha9h56x3nvt2aemc9fjllnrob9gfh4v06as4rpcl21p38bfzyhrx2qcs7805exrampncyv3w1ko0a2iedk0n96vevfud7n1a4k3vqx3xcdto7k85x7ka93awvxp',
                flowInterfaceName: 'puifwdsga7zijj5xfmd2jmhoikzogbqt401sf4z6jhsvr1ful5236ph3sxshx1mdn55i1f9jub7rkw5rkp1qkkj9etsf3zn4x44qzfaqzqm8ru63jovj582035e09fw140c2trync8rk2u5ogvip97uvfamsb8l9',
                flowInterfaceNamespace: '0hyeq8x5a0m56uostf9uy9eaoc4615gioas5lpwz9m1pycmmguknosusq6zz69hgfpllur1rycx7pi56y8j0mdraf6mlg7qq3le8v5mri8mwy2b6ly2njaec6km57ezr0loy6djrwh186mwsgwduptimltnyelmf',
                version: 'arsrzofjhhdmfrh5930f',
                parameterGroup: 'qhvb89f086rkkpuh2alygvgpo21hj2qup1yxalo2o6zd9ybajsmige6idcqbss84mvxnreg793ugaw1egex61nopimy9x2bjm6nu1yuj6oowyxot4bus8deuygqwoa0w58q23smvnusmdy7jvj49fu001wle4d7qp9tb098xcxgslrh51fapjztdbf34mnkvax0gvsih4dlvr85vuekpbscoopf07jnw7ocxftvjpqt8qwlzhhbfam7m34pchn3',
                name: 'o9f28hi5kw1ymnky8l10t4t2hnck297rb0p4mo1s3iww28z9rtnhxnnp06ihw43k0i2yc0z4uxkvcxlxz5hu2verbn8yu1nybljlatj5hjo19rghy0unck7gv6mddcpo6iorrwlitnp2vcax8kaxcsrfepcw147me83pjw8z5jjr2dblsqp8lr3zbg62d4dm2gftskdc6j7j5083e3r2z37k730w6zhrbjuigcf1hds72z1yzd8mfbra5p39fzowolalgwajefn094gk9v0e7x8461nfqgzk2qyyy0dfo6gazlx1a4mor9ydb4cx4ypw',
                parameterName: '42sy5mbm4030d2qbms3hk6dsmmkdb0f9iho5zjodk6fjiqk9wk7hni5cwmuilv1ei401n3y2m5hhf5r2egko1xsgehxwzrotgyxcjquh10kt7luhil3sp8ah5l6ifdi4n63gdag8olu4kdwsxluz77bpnfj9dd3od0nckfe5dydtm21flgfatbuthd4yofw4tmhdygqde4resc76kc02ed13n5wvo17edifaip4frbqf3pceak8fjdwkz1yqj7rjf82pa1p6c08mth7dl6rv6o91u6shuw6pxxa93pl41kxhxux3rtcw74n7t02s8yy9q',
                parameterValue: 'ovo3mahtq5ho9yncrej4ht30ih30fo8pj8yrwilzg53jj0cumjnrnfykeaj8y3jz23lbljrvyhtb0dy4mvn03mwm98kk6utzq555tjxcsp131ibgofs75aazkcnvqms0xh53rva67uot1jcrqwbj1b1dp3lyy9uddevuwxdkofki3gluy6m1eyj9tlikiayjsw4hpt89cn7o8yuykq7cdauv4kcrjh3nv71d55pm90bvekhcxoxwtg6e69egrsj1g1yy4yn8u7wdlzr21oqe9eh1b3tgdon9a0kqq6hyg2oy4d5ajlf6o2sehf3jdxa280nkm3g6gsksr98nl964j8qelocn2vib704ywntubxmcge6teq8sp941gfxhgxzvdq147px6g5h9btk1mh8khtp0666h4905v76kt5qkdpxbvca4xuzzsaqril5pn13skea09ezcpb4j5du1sxa8r9ki8xxlgcqnftm5zh4zy9iv6ss3yisnlmuu0l8peoj2b7f0kis46uath7qkxxke7wiue7rfrsmpw1yw0b5kw7k17jxeeiafmsfjw1bhc1n4xkfachnccsm3s9u2emaq9xbvl27lnsfz5014fqh1lj8d866sc1668xwvtuhfcxvwrj3dopruftbcvf6en29hiun0r3l8b4sc7kiq1fvjyj0afoynqbocle3l1eag4qlal3big1l42feeszd5y84gkpaz89vmcxtrpyqdblobv0wlduaksjlz9wwoeqrlg1yskxgaco2t6kyl9n5uuylzpzy6o24qhmefp5f6u61tdp3ygf2j4n6usyw1jtimw4ym220pc53r1jz93kogujllpdio4uacr4l7noc0d5d3r68ktami6lwqygv13of5tknfrg480do4px2t6idq2p4bti2m5alvgfeni7feebs8adu8mykm9lomvrf7d3jbmr4762lm2pve2yg6g3vs9zji27mbrrnwmwfs0mgq2ueffp1364wrkbk6r32k1tlp8mp0',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'alw2gcf0zkicnqjjpqp2fp2hl2scxos0v7zf27eg8ga3w72gw1',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'g6sn6svl2bkxq1ro07zk',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'h9rej446doyxx8te3t2yy91kpag0hzn6p3hlfucc3dkr9lzsd5ewqv3erdawkw8ltwugjjtohds14ivrxngzfs8p10r50msaxasp9zou0uoa8g7a92eml8fjvdf9w161g40jshtqhx98aaftbuc5c7xdkos040f6',
                channelComponent: 'hbdnjihfzzbk94c2x2d8sgen7gyruztodf1q2dih24r4ydyxjf4rii3r75vc50ybm910x9vnb6yzwlzjpuxgkvmt11iuhcq6bjyqcr3xduyl4frb5y5rz8p1vjzpm3mwn7uj0qzzx6jku5i9ho6y5nbggb3sad3l',
                channelName: '3f5cbntn6kentwkgk9ggwjyns60dmco2c6pnd6tehku6i06e043jgh0hccbuc1u5e0516drse5wohgp6igexhtlnamx3c0slffwywa2nhzus1mf2ye4a7zbgtolc7an9u616tuva50oqlac7tqjinib9m5smyqch',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'psev931531cv1zd8gfgc0zoqpp4v8wivpeq4z5ug9pmhdh9z7uiebkkw7runysw8targw8tn9b196xw4a02ckphcaf5ns31qhscu631jqx521ir6e84v9rsjnno8k7h0pfmsiqb7dofrw2jwhz19opwznj9fmlhp',
                flowComponent: 'szc7dxsrmszax6nyzuxhoyf9exlcvp29va66yup8or7kjuct7vchefsvxn2a4j8f8u5vknsf8vg4j96xma5449p19h26cjutclvv92bvknhsgzsh76tfx60dd2c802e2n0rac1aqufwy663lnu9mzv9hewq1c8ce',
                flowInterfaceName: 'biddlw6ke5dpj0uqc7vw1qre4ft4qp43y54qo91otmo7h1fysaohg5nt0dmh95ub8f7lqwuqc9imiy6lqtgupr8j4snr7u23shutmcsndmi27oycib6j1irpauhhaamfief5w08j4pe5hefxq8ibmm3yz8g9s4zz',
                flowInterfaceNamespace: 'pjlysmv8x5shl2yo7hm1lslidkuu0z09j37j35yxy6qgf038oaqxf32fy42i7b1vgyf0sahy8jzb759m526vozcdbyhqplbis4b39rsl4s96cra3ghhhk9ghdyzkwqxs7unlwejmlh7tnhpwtxas55jppadyljso',
                version: 'cts98866zvqg3dr3t4u9',
                parameterGroup: 'soun7ubexyrgi4pn56sbi92ds316bx6mls6n138xsqh2mcuc11oirimn9si1y989ioif8ekjs9n0mm46zdsnwizri47cti9ptj48p73o70cl1rcu9c0abncvmgv84g5qnqjq4hdiz48bscom5up4wcm89w6zdzdiih9dm30sapaeu17gwc1asaoxvj0tz7s9lo7yas72n5xp7ar2pbz1rk6tvbvvol2xd8o9cdxxp8zie2zly3q398zivnvfghn',
                name: 'ycii99w6y1bv64iomlru0156wlgcsbs6w6gbat81rw4mih4d3z7zhnyq2p5466khro64u5rsie4rokockdq10d05m0ryt6kg2z48ljbfb0xdikv8boxnb6op0e9i611wwxhnyz9doxrk852p71copmu5k4c61c0tdvdl35wcm6sy20ey6yp9t1wyjjy5idqhi7kztgmvsxv9eshzax98ksjqs2hqj6dgctb5cdep1k424n4s6ckj4en8gi8ye4lz5uu2swu2xx421wb3hnhq1l59zspe8dgkt7xvnof3zxedxhaznk9oxkqn6jxa87m0',
                parameterName: 'cugc6ztd1suxrz5w81yej6nwa01qiyy6sajrukejovbdpjjd3man4l9i0zcgcew5gwm3jpu4wwtqs5l681i43ikjhb775qemnjxj6i0w9fpjmiu7jqygj4e2qi2ct575pq80oobvz711ffmc413u7ds7xui3xqzzg2r5epo64xfuyd75z47j74iiio0rsly69ip38lzzkqgeuiwkqivv7bhony1m8odkr5v0dvu2ew0mc0dph23yzyfu2iyiabs7zkzn9s7pcyp3cgf5fvb1n23nntg0vt4j45ijytt8o0kqu788jesn1dne5chvcysz',
                parameterValue: '09whgsyo7cfzmhmmb2182e9f6nbkxljs06omh1boy6etmnzh6qu205h9n7xp2gcdm0ty0a2f9x966zflbe4vwszzplmgcyknae87nj5vx2k40obryceo3tl2v2pcuzeb4nvs53jxcg1kl9x188jjl0jbie0rhe5ubohb0o5nwonto6ebysl9lv9uoatuvwtlpvk1o7zmxhsly9diai70g12n22x1vudou6eoshut7j70mx036jx7n400etnxwpavsa8vcbusd0uyay4au8qnqftbxfsz0hwkad1ezrp485efsrhgiab7bvh36s265fet3b3z0ru6mhuv5iao1feaknq317wj4sy9eevu0llycea5uk2agliqz3ora4lesy113i7vwnwft9t4j822bq45a8x7kj5fpreyn22u6optqzd574uxrt0xoopb7fa2wv16suq7h22qbxgtreitnoct60sz84d88ytdg6fadvq7etmse8icd72v4mm1yg6yic2frp27tmoq2uldcqyyj28ywoo7oxryv3cwdfki06g589i0mp3sgrxxlsl23yn7thpcuokrq16oe35pp47fa2jfv8w6qow8xib4vkcan3nppzf07vf3baz9p1bcb900tqbxp8lom4go6qjfbcuz44rcz8is82np86hu345ag3thbqh67f00jxmj12fzpgg2pr9hh6w4cpr7r870fq6toobwm11w00jhvnk405houkll740qxo1icrneqlsok3ldd5aj5z90icvhkzqoi6aiomc1wxgl9lbxiaz815gs2gm6b6bmqdcmd5hc2dh1k4uuvfcwsr83buo5dav4nazfmyot3v8e0c9fpd4mccleo1pm4u0r71pcydyi8esb5v36romp4td6s3lgfwep85hbhhly65enw9a5sadsq91xy5q0fjlusyq90o5htp7xu0iktad1m2jzv36n14pibq7uzt731u84i3sbn6g8bowcbsijkmbycdxei8s0nb5a1bdmr3gog',
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
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'jjaif11blu57o1zerviusiloixf5q0v099oxcu6ztiyh0cftii',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'fjslbvrng6dm7fhfiz6n',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: '3e60wjjja1f5yg8df0pp9iwmp01v4t81avj4zo3fdkmn9qhr7w17m7419kr0c5d2ko2v2err2mih3l6vdxn8m76pp2zsiqkq52nkrx6n2j53uduh7rn5a17hdxjyrsuhj97dpb28jozb1yx0m22fei5kdn4lfq1d',
                channelComponent: 'ds9bqruth12d9mjt5kji3estk7cxhnec9r2rmc3k3k89r9nexsr6j9oyx7m9zfrah4qe6y42l0yh0nvsj2waqby0bj1m0mg6v8adv4oban0y2lakt7vi78apx7882zefec0ff394tiuirbl3c8ot9ptbkgo81umo',
                channelName: 'ddko6goas4dnszedri09po5akswdrk3x1f2pvixed7c236x3gdipysa4zzlq2t3zroz5uhwmuus7flu9sq70969grifwyvlhwc03hv8te4sy5p3lzx56ac70qjwelzp55agqty1rigxhuuorf38ux3x6isuy212k',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'gs7wq5licuxe5rynzsk23u9wez2617s8ejayb9ehyiajw03j6307wnh8y96q9xxg46rjx65qjvx2p5py16vdduk32ulb96lc0izkvwtvcjdj48z8gwx62g3x4buyjkgim8kvtkz5v0lwe2kskulavofdytzppkid',
                flowComponent: 'r0phan91pdd0am3qlcjdzwuh5051h8rdloj7ck0g2n6xyn07y73mbqa39otquobt1a3tw4brzjplnsqqletjfdpp6c0lpz6kaw4p9yo5sgq9qio1y7jx8reyhpa21j5p3s0c79lj41bat09dcl8geibqwwfd7v43',
                flowInterfaceName: 'divt5zmwx2uq7ytu9f6bboy1cdiwfjt16179wlkckowps9vtic7q61x3g742z1rpdck9coxmr5cza2fpic7ehyzuaftr4njht83t11kownfm2r08hc2t50gid54i6go5ux5f99hx5xlztcksyn8t8s5t1hsqw8rf',
                flowInterfaceNamespace: '7c3udpza08konzx6o3g2vi70sxcci6jaweo779yrm37vp7hrocu11racb65y91xlgp51w0u99bu1kfky5ua6ojsokgkgcv00ldujz7mgoxnh8c4446gx4mggjawpk0kpi4dp4f6fpyyyy7pu7dz16rnszg7xgmz2',
                version: '1kmr41fpx47jcp5d37f6',
                parameterGroup: 'uujctv8cs2xix3bqhwfgnvrj4zwfjz498xedyr4bt8hh3gkgne0mlan65jppvvly898wnt5dnkcgvabscnal35sa6goncmk3rgctnfpxn2my38fruoudrplbxetig6v1f7vfk7och8tm4rid67e4d7xk8tm05c6huo6bomh8pcgoa0b2j6ujdfbt3wykxnuu071ng5bti6pxi24i2we46v4d0fbyo6seroebxjavrfaat7p2ws8fiikwanokw1e',
                name: '986tyyvt2vu06vytgmhs4iq8tdcyxylp8r0p6cjvoel1fkzk2dqr7wk15kkm0vixcty1z9f3amf7v194rqrlyiqfsxvzwnu9mstn1h92bnwvtwp8axy9lbtq6iadbn7xw8t5u5cinuiukm10okdpu1y6wgiyvur3blh635siffytho8m6mge06vl9igfnpjovz23f447trd2gefspdgyjz55krbcp2u7ryinqj47it8mvdgii0501wyk0hm825rvse3tqbex7kgzc01btg4s15a195gi6h6bykf8h0hpokdrtj433oibwsgjpy51h7mg',
                parameterName: '3c1obj1fg58sfkv4g6gpo9pma779w2gxewlllo3swkjuimniuxu3x7a49cz3tvr5znbkt8al67p272vts8mhgoq6o4ggvnrpw70u2k6pissgbskpfz8keoocdzzeorom24tqrmh5m3k2gilpgdd2wf5l1rjvcflhc4pet0ghuowzvcdyjkljmk0d8f4ie8df8t90gr19k891r16brkph064hxfru49k2ycagqhxcntylfpezhvqbba13n91mildgw762pi89j0o3vvpx6gb8kjgj454zupy5v36dzj46h8vn513i2mo3o3gu14c05ehx',
                parameterValue: 'h77xkdeful7h6jzhui410kyuuoayrvkpznzqac3es3g2fetxl01no96uzhz9euyhrmzm9d1h388vuwt3l6jddmwc0zh05q9etuo2at954qzj60uzpc4em9ydhvme9cfpgpar1gm0kdkceh7bb4bq4ut25v8cibclxwxc0tplo2748luex65iwfufnxnxjj4lw8jxe4lu5by65psgs5s8pniljzvzz3czdotyvdjs85ysbxg47pv7v3aqscj42mumangq4jf7eeafk0ymx0i5st6hmskjxufi8amvy10uijmyxs9r4xcppd2s9t2c5du3i8srfg9i8i5jff2iezn08tzla3gs1z2hug026xmeaq9a2rt9tbsk6p822rfua3bvtt4lj8bphn3gen16xj2nt8go1cc2dc6qsci9t30t9z7bi9jds9dxh9j9s665dq7alr5xz00yy6vhscul7b4tjar3rigiz1lp03bikicbcbug2h8iodmxepesonnabgq4c0uap2gzpotwuh1xx780nbabls58y7euwpc5th7kk2bf774gn071lwf4q4zn039t1h0anocbvqox3we9rdsvl7gzylgm1qcz7pm6psuruicx3idg8ue1b4887ldiaaj167608e36dfrlhn0xpjexys3zf8r3huqlflvy7bfgwiyhbsl108hkip5nagu2y0s2zavbcop96w1v0ed7h86a5pdy2ic9c2p2i6osozt1v36cknrulv7va6fgw63gtccya8nwafsbxnz27g0aqqauy1w1xfxnuurvk798anckbonbnr5wyey9qbwflgh205wc4cxk7iv7oleh7onnrhgpi524y12mrahodv4tar6nu37r5opf1khypr62pzgq57cv8chqsy8luuq8avepfp8nuqdjpr3fxge2e34iocodolco12ff8tiexl3ik6e863p2cuf342m1ixw7o2wkpr518tflz0gtsszpuexmapjegid6fq0vz2ze0ttddjutvjzb',
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
                        value   : '5ae73a8a-3de2-40e0-ab2d-8356c9845b13'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5ae73a8a-3de2-40e0-ab2d-8356c9845b13'));
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
            .get('/bplus-it-sappi/module/5ae73a8a-3de2-40e0-ab2d-8356c9845b13')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5ae73a8a-3de2-40e0-ab2d-8356c9845b13'));
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
                
                id: '0126427a-9934-42c2-89bb-8b9585956987',
                tenantId: '4c3da016-ed72-4259-a68f-d895fd5cc7ec',
                tenantCode: 'd9804dh1b7nmclqpsjuw1bpp51xlrq6t8n2tlzb0v7pkuqcsi5',
                systemId: 'aedb40ed-3a48-4e47-b8d9-72bd8ca55843',
                systemName: '6qfl1jk6yitqrlpvfuh9',
                channelId: '33bd0edc-66a9-452c-859b-c5f3db818b50',
                channelParty: '1fpc5uh26hoynpkbba0p7xy2hapqjc2tzydost808xrtcouzoidnrbpk38tr29rxiki6ukbkb5g8zatg6qrqge95m3k2c7fuj9p2k5oxxpyng46fdizcovbzf59u7580r73q2dpo9u26ggth0ber0eef7m6m70gd',
                channelComponent: 'z8vfht6llcxaze4unaftx0tlajht8aq4futms75yt7cp4yykfm7l9oz13sm8fygaokidn0hh6hnug155mq7xh1gfqiv3nl6nx4eyp1yre2wh692u2tj7ismrx0166h9l1yqmbu2fmemisdczfzz7gqcgzocsfz35',
                channelName: 'pr2u09g4idx8aujv2a8agesvn5izw0lgxt756j23wocm01eeq3onrekqw76dx8crictub34d9ks2gbkzb5a12d7ufrzitxx55vq2grllwckqmrxal1hju3m9mu1u1ix5fhv0gaip2hy1t35s193cu4tpqlzmewz7',
                flowId: '92bd2f69-1547-4552-9d04-9bee1c83d061',
                flowParty: 'c70so46fr7qprpdz14i823v5qfw9dgwh6lx3se61d60l8tq9z3m5kyhblltsolf4xbfbnqm5ojcseqmpgtfbyoo1l1s29oznekplmzev9zterku92t6qce79kb77x5j4js3rt85y2n4an0swctcnk2jaj7pxs9gr',
                flowComponent: '8b9t8pq843niss1rblr0rk2p0pzhvye3oho32j5gp5ggg953m6ipy2h6gntigzvh88e9ea37a8ms00ez4ligg43fvtwe8h0c3ht7jbkcun4lphztn3i6pxz75kqfuis0j9hxn5566waw8xc7pfzx5zr6lvuxvjy3',
                flowInterfaceName: 'qdmcu1ncwcxbbaq5mmewl57mu0ys1zysvrj0zsqhekpixoqat1i3vd1r65q0bt39lbxhpjd0rmh9hog0y7jf2s23yuoyysd5vrnpd0huwianffj4c34kztjgnpgmk1ecyz1a3bpl2iiwbn8e8w377kkaj0qn0f5k',
                flowInterfaceNamespace: 's7k2j29dbisa0yj361heyhzuccoazgkoywz4qveno3c0pvgl33o9il94jz8s8n2ktiy6lq2pckxtmwi4skw84zinl0ljhahrbxlul5gi6xricxb5c8c0ru4d1tnp2gzekb80nytrewoqwf4eu6uwf3je79fhoz1p',
                version: 'c3sg8rh019rptjonb6dh',
                parameterGroup: 'slksf19d2qm0y1n8tng50tb8xenwnqvy62g1qnd3ybjnwp0xoz9ayfks5j7hhui86zk9bazvv6l976iinxqr2qrzyc4drwyosfzp6ma838uykss0cvqtnbyp2n4afnhvktj31f9kwk2hmuxcgbnzlq5owfq03le044rxlj0mx7tfjnk1fn8o86ehjskgaj2u2kcifbfara3m0x67is0aomki3qgtgpo6c94qfm9ohntjplof4oga0b6ktdwxy2e',
                name: 'l0xojbmyfaznmyjen6pe7cvpcw0ph9xkvn0qy10w63b2frv153wocxo6eglu00ue2ldj37a8lu55vwixkilv9isdctflu86ra18bun05fggrsdo7yz3you5t3gtxz9zi7sgnvcw86xe1jvpf5paduefx6it1lc33gn2yqik1akfyiy60f97phg3zyzz99jz3js73wtqob2ycvcg3jak7oo9d8xbd7smbk160ccjajfh2vk8d6mslhwtua5qwxp6f6agp98m2csujhn7udgwci4gg1ml1bjd59rafwgp0j4ng9wdb0b68zxte1hpt061f',
                parameterName: 's1w7qkprius77ev8oqiqiuvujdqi8qdgvmddvfw0rmsa8erg11yl8alpj44b47usgylvaatpr3irkvke1rdb8um9nmqhs2l0jnslx8keu6zfcn3mjwoco6vubjwmxq6a8fd3mbqeo4kpo1r7shzrt2v9kw3vl2w8hxzrnraxt0a9ccwyi98z6qdnroxtq55kxdmzm9pb1bf5abojt0afr9drmjf4r5o0siadnzgb9hhz7yitehbygzf682q3pbsu0g4gbvg4jyk86p1umjgu8e9jw1owmwyii6uxdtk9ynuzzbg4y2po4s1q9t4nxs0g',
                parameterValue: '26o11vxjv3yrcxiaw95a6te5qmgezuuzczwi39506qgmjmn9w41xhp1z70biic5yfe77a68jr25pcaqq2858dv80wqen5nh04igr5v6yxdc3gchdxq5zra1dx69jq7k4kdy6vr9zm1v2lil2u06eit692sg62h8nf22m32ukapfta4bg2aaimlpg1s6dhl9j5qp22yfxuh6p6cwtxfrogol2nqa2ymhdf50ckzcttzm5piwfab99ef0qafvenlesidesin64syh6ve6n0b64eafvsyc2cbh9cjx9is35xz1kl2vpenvzk0r13acrtokglevr0khy74xzsrrwfupgckrofdlgrj1d1d7veb44o7y8jxkimceq6bgou2n2ebtuadx3cwa5rxuglkhmh44t3t6v0anbe7q82lnwlzxqhwks8d672t74nv0534og9t72x7mmrya9axvc1xqjhl04kh7ohkv992om8e5iuzlzs78khnayk3votywikbnh4dsw69z4qtk0gfgv3zhd4mosqly7r44n8o2wdvvypgh8jv7f8psb31g1vlss7ute4k2zsytplyzpbx1y7f4wykcvhjr3adjoy0yo9kx3dtaq2up9hn2ilpsp0xatdymq6e2raqnykw75ygu1j9llrtqvn7q6u4o7mrpd8o04ukxz1xlbh5kmtsmrz70wb5hc53awmbh92nrzukcwppwcmwgvxew66p3yvx8w51yl7bzt9itjyym63x49p6picruya92rr6ow4d0f2xr9t0mcs8bndrxpv83q47whh4w4nl6io0e8b4hffe6gexjtcldni53oeg0plf5d0hk7vnfaqf74d0qppjqtyksvow59qoq5mk14by9e4u2uga7jgvr35gifm7yhl7siw56tah0uruf1o73daf4w88agol78me36z4wq0zn3zlsuqjppw185s2ab78to3umxuziocjnt9xnn384fwol9rljh3uad4dl0dguv5glvjlmsjfhy4asajlk8',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                tenantCode: 'nkr6bal6u3od1n8byuy122bovrlk11hjkqiafjzx2nnur1zu7i',
                systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                systemName: 'keszfrroco82fhank185',
                channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                channelParty: 'scyai263l0jrswghgukckyfh7kp9h367xjf29r2hinrff3487qd4lw8xs9dhhxdqtkgx9t2sm80azb06lgsf8mlkrx96axi2u5php36t67puo4dxdke6eie5kkym2nf5y7kxsrn5kj0a317e9mh8av4uwqips222',
                channelComponent: 'vgk17ta7mw1w9crro7nmefj9aki0rm7rq9ojz7tspv6zrb0czj1v0pjzceljjbcz9xm4b136l7csm7rmhj9mtx5g76gm20umnw329azfe1nwfan6mnbl8184yww07ojfvo93y29f6hdu8po76bjoxzai2wt3nl35',
                channelName: 'xsl2qu55lwied5ww95jwwlbbyhwnvnatbsubuctfn3ty0mmzjyqiyhanyeu1nf7caxy5wygukbbnth62c4w5uzbejy0gvi2ymwsy4peyl9vf2ag24p8c2zgugqt1c1uah0pom05tm2hltixgskiqjrlsbtbragn5',
                flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                flowParty: 'bqj6j5yxnt02purcgqmm9foenvqjepe27uutc7u8e35fmkxkdiqx9o4050vpmzqk1aq4m4jwsgynsle3lnizcwbnl7x269q0m72hdbradak0ew6uj4du97yodxspxfyiqok8vi27gjekkxovs8jj8v10rkuchy70',
                flowComponent: 'khwekscnb70nsz19uo2t9vqvt7iqisvp9dr49f1cis43z43upzihm4puzz58gw40a7d68xknyla5jepi81lp5tz91bmen5zgh2wqmj6rcnb1imj7cx1136cap2y9r1fu0159adp0der37xc5xc1umxgaqkr9xfno',
                flowInterfaceName: 'iacvqdhe1tg4c64ctj5rfwc16xvuxtf9wb8blg4ahss5iqfd97jbjcspfgizwtpk4zprsirqdlaprwndurir5nelbrldfawj8pk855556b27f5yvtlgtdp6ffrfc5gqqn64l74wobhayfid9h61hwaieibp7jdma',
                flowInterfaceNamespace: 'lep9esesomfm6ocm2eielyhkbj7p0rtau5q3p7qnm0ezijk6chilhpdwew4866np858kvjcf0ltwkbbd6ivyqkd44xn573sr00luxj50nxf8jwcvqvi68wy5ajxv7t4o15mhx35449gsgo2qphrq4h0uth2tp56a',
                version: 'ks0h3y862cacgh21biqh',
                parameterGroup: 'z4n48kkd86q3ybq9nghxvuw8o0e98zwh5hmsbhao0753gg8ii93agqgpb920dsk59ak4fx5qhg0yqjb6vz6yfddjxmt5ynixgugo26b974igjzjiunztv4ogns0c4oaf3vf7rbrso10eohnj12mwg717cawmh8f2gbwfkwff9nhy8zlpf8epyb6fxotnviaelt7jbq8h9uykouh42267nkc9ryp299d7w6j99cwlfbcqnyb6ma1kwxbjia9crrd',
                name: '64zx4r62s2mx6lbjw8f0rtneqi8diup4bsdqoh15cpihrc4w67zl90z4a85jzt1izbe0ax0qsnhbflp8mr4wpz7cv6nv83u6g57y6khcd9574bwaxo77f2b5csozt4nosgruhp3cyz3uklhxd6morxxrmdz7evju4a9dt8bgmgmy2uykcdnru2qmvrpos1mrt7hrafcpqvhpg1vyvstqm7pm7w9xbakroinqhsjsdpaa8kboeptpx24x61vlj2fsoolk700v129kin8pg7qptn92xgy7v6sa035lx2vml1yi7cuvisj7kacuickdbg78',
                parameterName: '4qf0ksr2828lm705bz5f0wtey7gx23kss1f5yboho8ql6mjnqmvqys3wr9k6609diocldfqv5owpvn4hk3tb5f7i4g92aphmxsmqudd1efsz8kfobxw2iwbcyyp3wpq1tcbbwqsuajcjsm1zvuo6ljbhrobsd1upc0sjcgqauy0kcedjaeytxkuwtqfwvyr1nhtv1abaj8sfatgmrbg1in5j4vn1wjbf1eoihyk11m5uq31uqc3zi8p2syt1qyow9j9xrf5h4e3h8miw13t4l2onissa49grkrz9e6z0ahcwhy762x8vpipfjq8egn4v',
                parameterValue: 'jmsj1e5y1cj94767qucaup63vrz4qi6g5721pzkku0lyia9livjbdohjz05vtt8iloaoyp5djdr4fkzfidlpsqdg22ayma720pphc9qej9kzbljkj99yhgtfi81tmwm9izydkh4s8zh0ka4g0vfuvfe7xp5w2tazd8mrs1f4md9f80elkej846kjpq0fl1ftj5surgrxnceemr2mf0zmwez8l0j8jhbad7p7477nj79wp3ha86pjxmnctt06u3fpdw6ecepw2yqlh7klouk65vhuffdhwknniazpk32h9aiqs7tvbyqjjutyz0u5n7jwksiumnet6u2i4y7r5127pxpnefvlo69x3ilwmcrxu3222es2vvgh6lm450hz610cb744wxs8mw8d2yufbi89yrnc0pqoj6eknxy4rpmnndl821mtkrlevl2pu742agmgmigc1t1vy34ofm1354kacu2xbhk8avccsgw0xbdd9einxlnq9k3hvjelf1uc2w1b6s649ml800p0heh5ddeuo0uwxu8lk6i2wm3ep0sw6xrhjx9ug447p6nqtvljkfxzg59nnaz5dto7dspw1dx07dmmb2uomh4n6zvkdc4flb2cjtcpc6ciff74q602ygz58jgwy6sdiycd72ldv2goggn934kxghq4m61y3p6zjta0v9kwfqwy786o57gfpayq9f8d03klvy9mzzka7o72ctnx1mpc44y6322nvohqppa2pd8tjgnxijcof8lnjw62noooyuy6njheuvnrxxdtrnjg6agl9x2ocmxv7jofsr069n9r7b3or8ghbdpx1irg3xnwho2xf517kueqex78n7u9ew804cefwvgn5rec7go83r0n99zn6rprawmcr86m1zuq6sgteasvaxsfmu7usoy3oa8nvcblvnn0rk9i9hc8cw52kb8031dw8iq5qw6phtz0n9qa42d7ryhv06bfxsiach4ko9cey88ncxl09wzvdp1cwwb8q05min2wh78f',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5ae73a8a-3de2-40e0-ab2d-8356c9845b13'));
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
            .delete('/bplus-it-sappi/module/5ae73a8a-3de2-40e0-ab2d-8356c9845b13')
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
                        id: '3dd43d40-7732-4fd9-beb2-4ff599daab32',
                        tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                        tenantCode: '0oh0ieht2i3zj1phiouiliq199s3bp9j0hrlra7dtf0g7qwab6',
                        systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                        systemName: '0iu2nokwroz82q7zrblf',
                        channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                        channelParty: 'lrtlogn9zeie6gy4joptylr9fji6ji1xrtavytd5yiefv250z64o0zpvg8kmcsfvdzgwhrmsr75gvibigbjx7v9nrt6zpsahbit1hh3zcwrlveb7jg3fmexvwq7xncqd4r6g22pvax9c1nddxmcwrzn7m6jmv814',
                        channelComponent: '6var0ejf3oreq20kmblfk156adn5q4q4jr441y9qq3ui9x7r1sw4ry5v970gxcdrshcn4emduu93ew7up9oni5ty2xn0wsc70fgb6fgwvpmtt0ma4goufa05kpqsydjzqzolnafbd38r8lshqjav0ahoj83u4ils',
                        channelName: 'zxsxl0na5d52eocknqimysrb07ojyaptn6706xq4v78kxoi6gun3as5c0lf05o8q72bbmu0d0n98gcz8ilschdvb3srzspli0d922jyl7tis2rn9ny9v1jinqkuo48mz4k36brt8zwi3amsvchxg41qo4srz2qmk',
                        flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                        flowParty: 'lu0r6cuqn6lwbeacbk6xy6un2wcetfyemuonsj2fl271fyc466k1je35ygmnhq16ay80a8hipvnxtzriy183hj864q6ct0n24yi5ukqh3u7yz6yhrjs233zpl8f7gigiuw0o0bwmip8f5vfaqkodbrjjh0eprwsp',
                        flowComponent: 'vpj6ui7im1gzmx2yk35d051zroi180wevos423l7m4lgyjp7apc7bnbrpu9u2rrxjifny86hukavg0isq6m1tm89p5wtda3p2x1hdnctjrw4sqcup6lhvhypwnf81n2fzoubv8gsadfkj07chn6desumfkwsx84c',
                        flowInterfaceName: 'ot3m4yzssot6s3ftjbtnln8k2dh4g6bwhd7atbo2lxlv90l3ov9y0pfijlu0dufudilmepdbggkw8khw4isyn6rm1immr71ososbzxuzjcrrto8a6tu2cj4n3vrzx5kl6zwdxatt3abolbg18w317mucvbzw6vt0',
                        flowInterfaceNamespace: 'w99gxh6n6vnlrcjgvpycpia7ustjs597cj51xhaxbtn3u44shuj8hvplvb1cu6af3nmf32ldmaxjvn5g7qcd6jw0bz8mlvbgwh0lu5jmcf4vmuuh0mxvou8lflpeklhz79lzpv9z96295sdlp6wixe32hgd6kaev',
                        version: 'x37pympbocyaup90oyio',
                        parameterGroup: 'mgb8vmnocmn5dwwpvzj3322t9xgmncnldxmlmu1n19w4ibqynmlcj4p9lljkk1232x7ad9c6zp8bp5ztoc3e0qp8k5iksevtmm4egsyczrigv6xnccn594vixw7b3ztbgr8cqk7jp7tmwue0rfb0wcmelo61n1slzujly02m2frv45nxhz8pedut3s6xxg8t48n30cqhkxlflmd7znt6594ap4k1y3xsuhuar9pfu4bnzn837qof1rfom3zzz02',
                        name: 'syvn3nphanwv1r5f8outi6gbj4in86s10y7siygm919dmznxr33fhumkfs7st45wvsu9e9zaae7ihgxgyxa9z7yzedzwgyg0zr5omaw794gf8p1xi0uwollzm55wdl7bmo0aom7ubtzvbz9xliunq47sdyubk241gtmbjvvcuqbrvlckc06x04t7k3gcmt8j0dw1b3il79uzf2llxktxjisct053mlryjax5rbmdvbdg48q6t7zfa0hs8lz84e336jbzh5aptkz8k1n1r9ve4idxyr3ybnk94q3k5x4ndrdi6i2h23033se8blenwlcv',
                        parameterName: 'xea2ohb2hbcnmrbmkp7bw76mmmg1asj9x3q7p5jffibpxiza0kjzmt37mo0v6970og4c23vb4ee2dpj8jawafkpjf0lswwd5rbbxr8bjy025o1dq2ukgu886e7v79bw5berdnardd3rdkz86i7zol17plhhsq4qxyy762shkvuv1kosan5a3cgzewwhj0t9zz3a3gsgnv3nb4yy5egv6htq7xbg4ts6mq9zlap2gcxzgf275ioip1xfofglw5mjoj1lqyesejews838a6mn565n1hekbkncduyms5nxvczfdwb35loaci7qomw8pxres',
                        parameterValue: 'krs9z949853p4fx3mtoaxtt8fm1fcctx5r8k7t3hehfoqi37yerfzoimze73536haxukrcfx5lxn45cwyu6utkz7ndqg4bj8q9m71679gr32cnvxf8oiwy7ibwrys2ikxryqhh5oqirq449065t01nkl7voqegv9tw53s49m4r6nkk85m347rm3az0t2mjhtgsjxda6cxs1lyqt8lxwmkajxby193wxw0ugfvvevkzw9fqjxqitpvt3hj70w1zi52mcvr21wwmkxgm5li98huz7p6v4y0bsyblwfhobd2qevghrii9ozbgvy06wv2xg6ofgw2f00o10kdvxy7sc1ybefulwt8r0gbs552cx1wr7vbaahjci8uplx0dib05n27w3mam424cquhf883tloftbju8dazttq2tapkl76mhoz7bhyjqq67wcl8i3y6a6roi75eqe0hz1s1s9gs1gyvrb2tm09opq4blnqtra1dv0kp2xy8zngohubepaqxkrhz96u480m10ml6dv39io9xsbm3fgs3sicu1s114g96en3zyb88znuemhnhklefk01vuzgpc3cljzqpbvimrct7j2bexbwmynnzi6bcw0ri77fk39m1abbo36t799zg3sqz3coamlb9x7ic7urdp88j4j42catbxjh6qa4yn40q9nucjraj340lr94pyzrfvkw0xtcu50yiubye3f6k14l7jy9la8rue13rdrvlvshj9v6xdzkcsaatxai5hatq385cf4exrubeqnhvyyrm8xdvlleejipvw49yt33k5ftuxxaer23qq87g0rnw51yni3uzeaw6dnee7n1dxmkc5ao1lodpp7y8qggl9ugbno8ypnsjtlbb2nvb7ydv1hsx6tu0mxuyjbozzfi1l9l9ydkaf1igelung21jjzkl68xy291s1i6weapqsop45axu189gai4wgt9dscmwr3ho8zs70bp97c6xds8qxsesn7yq8obbibu2na9muzkvffjupil',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '3dd43d40-7732-4fd9-beb2-4ff599daab32');
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
                            value   : '5ae73a8a-3de2-40e0-ab2d-8356c9845b13'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('5ae73a8a-3de2-40e0-ab2d-8356c9845b13');
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
                    id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('5ae73a8a-3de2-40e0-ab2d-8356c9845b13');
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
                        
                        id: '0533cc3b-083c-4528-8727-09fc9f4f27a5',
                        tenantId: '49a5ce06-1404-4183-9ff5-f4a29114752f',
                        tenantCode: 'yxxtncg9rzrujrhv2ney5h8vzo0xuub1afvp2ueapm6kbp7gc5',
                        systemId: 'f5765334-1fcd-4117-8c8e-dad3d4c6dd81',
                        systemName: 'l1uygsqtd5iwyi6qft8s',
                        channelId: 'db00e0ae-abfe-49b9-b83a-61be02483de7',
                        channelParty: 'alpvkxv7br1j5e4ox12s57msjfr0q5psl0oei38ycvn94uj840t513wpnd4wugl0keo7qiivunqtcywguiosf46i55nmu2kyfuaia0e1lhegak4j9xftwx8cdfzwthdvko2k34sqn4u7pq8aqyuk22tl7ait7ouw',
                        channelComponent: 'anpx6fb3rat59beycnnf2uo11b793xsvhf306tc8llijvum7mx919x8lcm58asrpq9uqb38w2nnn53gwp457ce6kg9sxkzaxny6a4nnrnxfp2rc4r57mr5ex8ma656knk5jcjrzfh920witmhubt43hppafm64w3',
                        channelName: 'p8ixxmf8voaez08dkcp337tmqq63l88ju22xafzv4kkxc2bsro9w9kfzdb01ijbrtpwymyvhv150xu900gkuz8n04ufm1qyyk7ilmjemoa2y9gq6f79o3qnqxykobjwdu5zalx86124gnefy8rp4b7b0nsy0w79w',
                        flowId: '238850c8-f9b5-49f8-a006-7f01ef4b474e',
                        flowParty: '44ncqhrqm5vwu4oqje3s6hjop0fpj4q43p4j2nqnoerl4oog2letl3v44bmksloo69jr5qu3s4mmalpx4pfgg8gxd88okibu4hnills88qsyemhr4ktqgxc8cvvi7cv8yagpvuy2vre7s4oa2osu8k2caslzcnlb',
                        flowComponent: '7ndq5cvskcxbq0ha5kpu3ut93rp4w0qh4wrdpjm4ahrb8cb0u9sm4ccuwmrbc2sqkua9dffzgbo4vuewp4mme984w3pktpen2vuj4kr9xcr8pe9y8bwg3hpqucih3m5sdqbx00vt2s4ydjxdybax9w4sef4cfxi0',
                        flowInterfaceName: 'fnodl7scyvssxcazwkh6k4oqg31viknnzv1cy3e2lcbqnflxhtwntunlr4pqycvgtw35t0kq7zf8cf1xefrjvz2465twakhjjuj9ynoqnloskxbpa4dfv8m1eienqr0lww3vl5oylr2853b5uuvn77hsasepvc29',
                        flowInterfaceNamespace: 'vmbsnabo8ddne33u02cs0nyzaeeyd1h1s50bwfew2rfp55bmsfnaowkvloy63v858ceosic45uo4o7cn7ynkza4t2iikfja4fzrc5p7fwd2sm3ao8fbh83xa56w8outgcxtjw5lganne3htbrrwl0dzg3ebkkayx',
                        version: 'fs87d8sp3mra2s9hxg01',
                        parameterGroup: '3il5zt541wunl8wzpoh32ai0m15egnsvxtfywdqzil0xq3qibbvtpakn79wwrirattqvplulwcwn0ft3ay3tv62kvw4rawvisfv665bn2wcsrzmttaflg86e83gqlngo0denxxuflqyx66ltsgbkkbg6a4082l3r10gl3qxip6kywi1qxlkccmf46vw367m69jtdyxmiwn2607k6203lgb4mc107aez6r7kvv28qge9a5bdtfc80lmx7tw52xt6',
                        name: 'tqwmylnoi0ajqzq7t4z96csiuk9s43s0h2xr4x880i1yudj7ih74jbe2sss3gqyxt5yoi1ljj94mm7axwun1tp0tzftasskonvaxko15poz4re9jvir7fz32yx27kd8lrqohyj7l6jqm32q6r14x25jo7ig29wuzijhqusskf17v4ym8cz6mipku2g51pv59u8nak49y2zrp9ayhqrwbzovlfhegyw3pvqbg1mfzf4xg4bna1s80vy8loiv3ml0iy0zmqemvx0sgumte9rpwxjmpity5uxvbvyzr78mi6jy9wvg8qut113mg1xnr60oh',
                        parameterName: 'azedkiq7tg1xgd0l6k9o39ms940n88tw5njrtkzfsloy1xdoyvrmnk788n0c8t33bxdro79b3h6agjim7fbld98l46ciafz05fe10feyo4x23nbsvb4z6ofdq6b6j6h5ofsmfvemo8pumtoyo69fuc28zppkj5s7gdqdeak32aairfjt9gekdyvfke6zv5jpufbz2sguqr2p19c5f2je3ixlonyyyb7etphp7ufmn0rixlavn7up71osmn3yblqmgu5whkem0pi38naz4oh9hcglryx6za4ibbygwaed12zbwvts5xvjo1yv453ypd10',
                        parameterValue: 'vn0iqz6tffki6il8dj6e3v1wkouu72dv2l7ejctnlqzdyfhyg5jt4156le2630vjd9u9dtz32look8e5rsbopxxr8mxsdv1c2be1yj87xbho29ayc0tm8tsvozeba29skrc74q0yubzkfbyv9jgi0aq38ufnjsaqxdmtoefdira1mcpvfupdjrr19979tec9ehp987x58qh7qi8qsj5sve2nokujhce2vvrt2m9kvnevzkbzum4xqepbz15w3yua0wg51cns5ter5guybc1m8o86srqkh2q510vadsael9c3ipa1ev445yurop59bcm2jrt2fd7r5n66lbbts88b8sql5xgsh5y0hd0569zo66megfr82qmiw8htbaajsnvwrml367qy2fq5jyohup62h0rflcivytq34vquqzh0dt62hurwrwvc6a873cmx1zz7e4cui1grloei20iiczzgh63njjp229r7sccmporl8l0a5aasormya19k5stwimqvnyzgygc5d7xojgf9yxmxmd85k2kmxn8jg9dqngbdm02yi9gilmj76z9zcb2ql4fmmtm5shfyabjhkzgst2os6h4glm1hygqqedei0rx6l4nvotlfaho1oktg85rl5t3yjo8kvl0y4tb4yqckqrtbjv6zi67v96fm5n8h3z9xp10ukv2f3wubp0g24qwfs5c6yqnu317ao386049nvv0fwtuexv3tw3ahs54p8jis3ty2hruq7adx114xtmls7bfnx19sxc6b6q7sfq0uyn9pj9xec2pdiuee9r4j5z0txk1c3ritd2d14gt1tkoq3l6q2qfejialh644mpapih0ab3ckkcnlgxpij96eqxky91ge5j2525h17bfyt9damdej8qycpwze31d68vnmk02i5rin60gqhb9daelnh626bk7bjcptq7lrvti28s55fugvako6v9nusmi8sgoz2ovemfx3knpcj8q9pyl4gud81uacjhh2ig11fafxad7ah4yn',
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
                        
                        id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13',
                        tenantId: 'f9eac505-2b8e-436c-bde6-362579397dee',
                        tenantCode: 'njv075k68e1qq5dg5qbmn37xaoa1yvub4jrct56sdlb99m51bq',
                        systemId: '3fca352e-b2c9-420b-ae28-cc3b0180d0e9',
                        systemName: 'nqqkwqu97h3q3w1wc3v1',
                        channelId: '89d14c19-c13f-428a-ad32-e192517b264a',
                        channelParty: 'oa5ftrhav9t72zuuwoxtewov267201itutkob3zx6vnzakhjkacaqstp117y56reh8g4eiasy0p2mkne3mx7ymadomogmb9idf69fwyidkn556oumi6uv6nc8xr7eelvrtf4ha5c9kqfnx4mnb8rmldwf49s7icb',
                        channelComponent: 'sfau2o5e1veearv19hu37deetium68sne2n2fsl6wwufw5g8m9ef2lii0jfhrl2d1vs5kmuamx329ufst8atuxqp2pudr20dtq60tmdr7lad2s5txbd2xognoikdpmct2bmpbw6wcedlwl8g2mg5z026ilq2em9f',
                        channelName: 'hau2maeot34ex3eqozhz86mlufy6iia7owvcm423o5x3ju9vt9aopgi5scm27lygnmnptb1l0khz6r5oemix5wzp61v3icgyk2bgav5zyc853o3dqxtcqfwats5e96msuxcrpeprdk64qut8gfln5f2g8b8l24wn',
                        flowId: '5723aaae-200d-4be1-9590-951f2728fbae',
                        flowParty: '2nmsmoe2w8f4579oans9iqeitxsvf1jobt3pn60rseeqep6sau3v1i1jueg7st6qkz07y0bqeap10r2ywh1uef1el4ck1yoecor5ww5zv3vi7ojnzc4az5u5hxz01oypktefldkrs4qb5dmhuc6u8ljm54uo5me5',
                        flowComponent: '2hwmh0chcw3dshgcbxhaemqacvhicg5dh0s7gfjykdhphhlreipstddaztb0f5w0rsijcs6uocbmad5tukq1cyjmnz397hy742bwpi06ubd1yykq2mogqhgk7fd6jcbpx4ovoxotosl8zb2cjb76h50ww89ew0yp',
                        flowInterfaceName: 'zgagmxx0ksya09uc1ydm25fry3vi3ivtz77xdrbybjpig8x861tx7e834vgcjsl3hz77j4btgh1pk4tniyo0mrzeptjeqat7iol7nv6kfdi2xjstmc6hl74wgp6lucbxkpyyvui7f4yfjdks5tc1uek2ffmiprr3',
                        flowInterfaceNamespace: 'cet7h18arkvsxpd6t6r4ofg7410dl35m65iw06weaju49j6369k4zctw5rfu9iuz22gm2szf1s30b74mmu2o9xg61wcr9akbfk3xlgx1je1q7luo07sbw7qjsv9u0zeqc13suoof2xh6pd6fni7mr3097a9pr209',
                        version: 'ckj3jml5y87vwv8ocejv',
                        parameterGroup: 'h9xa8w6nne3r2azonk685pa5evkrgjp32jcyh36o8i3lxrk2r717gs5jtxq5enzupbvdag2gpeoj8ounyvll1ydega5inrnon6qnj3s05f5mjw0lgfadzr454ak9m9h0mngfzivutd2sczijrf0lppxs8zv43ow6tm96k4bb6gy40dep2kdp0gpvtzwcfaxs63zx7vcg8icda863tiv9hn3hh7268nbfnyxr46f5v5iozouwt2dfdmu2zy5xciy',
                        name: 'qhdhdom3oofbwctl2y0gyk1gzr6nc00p651sm5xu6a9m1onqq4oxm8uc0llr2lm1xyoma5y8wshjy185njpqwc4q5eqklsh2qsgkc8fw9ui2pmkmod9hcdrz56fkkh7ecsh5kcyf3cjlvoncvsu5qs846wmjlbulf1hceoqjx62hm3lhmxoztnqi6fj7geuav1wubccqt2d4jd3w4g07k2lbbpe840mh3fqu8esxxengs17pqj52z5yg56p8boq2jvvq56wzhq1d2xti74lkq3sijll48upge9xr9xbvh6u8ef24v87ozirj69948b02',
                        parameterName: '349efxv91qv8h8dl9jq0ntvuy17qapy0f3id005x5au68xhawx4dxdnc52mnp1ytvjiebviy7fdaznr2rtp0lwr7yfnvmvbuzfzsn857lsc4l3f8n70666n0hj0msmmspaiidfyw8oot127uii97cax3fet8r45130pou4ktd84fifp3apnj4c5vuxqnf6y02hhxyjx0296ycrze6hmc684c87v9an7a1m8d3fh7hkas7nn7ls09zmmozq9gwofep4ku8m2vz9gtmtg35q1onjqwkv4jiiv8eli030dvf7nqlvix8twjl1mkx046w4s2',
                        parameterValue: 'jmtdzejug9w6s8hxcste53octcwpg7ju8w6e1q8ix64at7f2aguokhubuv51fqxqwtdaxr7i35eca0ozcx4r4v24f1msi3be6pyoh33bvra8nucgzqkpg74icd9grkcseb6h32tnmb1zoszk6bljbs39le2sh8nsykqt580d6f8vxrlmycfb0jowl3x6hd4fldm53cnqddgsy2p9559rtvdewuq0776popstork02nc7y7c44wtmfr4qurfdzgblhaj15o622n2a5szz91vuj11oqhdarl2ztyhun3fx9smd1okeq98esykff816qnsfyml8huxgt32c95h6ioiw45yk7kazgxf1f6818icll7dmvv81i62yohm7jujomwzr5eccqkzzy5zy9ck6g345xxri7mw7kr860m4vth05i7b3nfmwar5kch2yj4j2esl7jy44txmc6rktbvl5btfq9za3jfarm8a7dst2hrd0uhjy20pxmjgkpelq7m1vekuml9uqe6sw8j7e05v0flynbj8sp14118rbeyibmw2gxfk410mxkdlyp96vbm6wtb6emxnu5rqvi9s1oetec6e4o94qec5hrp36hdbmr0gajmtoj1nhby0aq67117dr3nfc4tuhcsg1qkqh2gwu650ehk0lt5yj5mkpyvrfgzhtw5ewnp3tgo08rufjyir6wvvghv6xj9ttofhnvjlisipncu1bq10lm5yqryplk8yxccyxpwielspsrhfrfxwy4ja4hrsadqpi5jlni99k1s0j14kvbw8n6b3yx0nji09n98cdu3exoz434zu05jr264b87thol9trbyao2bnpwaopn0gjbdji7pv2j66i16lxmg258fcfeymifyc7nkjch8znhhh8rlti4nzcz82staskqvsu7lqmgdt7x2eohnk19paajlddtcauhx66orhxiwtr49e7mtv3tz7pcz38956ijlf84kdpudkqraonza7zd3mgo2p5q70bc17gg0txi2vc',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('5ae73a8a-3de2-40e0-ab2d-8356c9845b13');
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
                    id: '5ae73a8a-3de2-40e0-ab2d-8356c9845b13'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('5ae73a8a-3de2-40e0-ab2d-8356c9845b13');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});