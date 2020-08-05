import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'y4xpykrpvollib9ibmh3l0c7520tcnje849v5qnq',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'bcj64gfxvex9jfswitlpv3tdoijh804uey32flsxvb17j1akm5',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '305ftx1hltpby7p54r9e',
                version: 'eer22isk2i5xa81zpext',
                scenario: 'n3x5ufc9ndfv8aj55mbg63ogbd75s99u0301w8edodtoabhxuopn46jk4meo',
                party: 'q8weme0f8x84pgm2a13ntosrdpht5m7gw7j18gbcbhxn3vbnwc5tnt293sr7zteo4mvay515bcdqqwhv6vwkt26glz84jwwehle79j5st4pycrd7siag7k3gqd79nrtuo48s8ief6qo9bic0ufyhyhx1qi1xe5fj',
                component: '2yjfnmxm1uvuhb1nfymot06wz0tztwvpz7fxeuwl1yl9av77giqlhpv5ml1n6gevgv5ewvsh2wm4i22bp9dgx3tardrg3f4eov6ls3hxbczarjfa31x72kb179iy9zb2nrm26v931dj7vbudb17y5b5koo7pal4j',
                interfaceName: 'n0knkjrn7yh5rd6721h19bvrv10exu13fvbqxt7azsnh0ouqbg53v63a7smv75w3m2ofn9b8q2fldi486liec51oq7ou7h684r9tjq0pmxfwqzysdcuya81mop648ybf0tc9ws78lynwwgymnzya75jby92p094f',
                interfaceNamespace: '80o66gl4eigjxx97b308n4jgyiqd3jmf3nb5dcbgq7ljmm8n2h0s0t8or40e5gtqa2yvp2nyuot3dxi0paijar24pjww0epy4bdarm02i03tmfsa8vh2n5l6oapzgkbpoo2ydwxcqwxf02g55wjrzhe1xgvz8shw',
                iflowName: '4v6he0c6lakbdxfouqbs4kos321cl8jpykbsnqwfow8w9010q68y42ommodjwrub8045mw4c7o82rtuj2x44bqpf4zmrk5uvxdw5yz6ld5tbi0phyy4v13otaiab72dhjllhvouhleapwjyzyk7ivoprtqum5ebg',
                responsibleUserAccount: '391mq1leyngsddjysxe6',
                lastChangeUserAccount: 'ww9pzddpwdct2wkpy4f8',
                lastChangedAt: '2020-08-05 08:03:02',
                folderPath: 'fy7rcc0hv766obkv0r3ok7s4wpqq34ui9zamzkjqsfmdevo0g9jae0uzeayjmrk09ua3lxzy79k4hi357xqrli2npav27z9pgln204t7v47nnm8ny8i1uu5tdqjhxtdxrrv2az6vztl90l8b9h8t4djlli42v7ww7c7d2achc8dze62xhn02tx13afqrne7w166ud0awzx2glmhmzgiluo81ect6hv4q6qycdd26zp5rx0c5eqps29qhrqhp8k4',
                description: 'pz7wtdb2ov1418yv87elwq7izbsedvocu0mqlnejxf2lscmaxfrsuhdao1h9egln00cyrvsf4y2auqfrcbq7ol8pworld6tipit0h2q7o666fh72ifastunhwhlnx0z9uxecujm4b313xzanm8jpzeobcq38dyg597342gfqe1jrq3yt8s9nm7znkm5o7jam1f9l0cel4kznwwizyjp2n2eqygkizx0wa18efefhev7f3inowjq9187y7t34pv6',
                application: '6ksxme3w4ys456rz6tsmw3lfl4pmvtm7o35geggj5ti7tmgytwkt71oxtpdo',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                hash: '7pn63l1lg3v5mdgmvmum41owotbeqiwdjnwumirf',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '9a0chpgasw54prw6vr53vcrr9dibtqgq50ca6uoea342xdhcoe',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '2gfigwobttg3601ipn97',
                version: 'ao31fev1x83tj0fz6rwm',
                scenario: 'q6qz1lhnxmt62vlzqgs0yvcdzksvwdezrauwb6xrqnrvojcktcr3ivr6vltm',
                party: '3nmmxzh45rajl66ilza638356djofa4hr9y7hvyqah52pfeuzmxi55r7h5qx1bt961bodppmn51inql1x1mm4ni8zgwj54g6ueculagmhwn131rwkfmpgouoyu4myoi0arzhv55bkggnyo3jsz7kdkhkjmrki0lu',
                component: '88ivlq384vuevardxb5rj5a88qb4q85gvszqoiyjuzxrt56zn53sb2iqd63dp4sva2bi9jqyh7mx65jaz131gttgrmaxrem8y8erpg8zcf3girv9v69vbgmge6bjld64o4buw68pis0xki7worxv8ny5mmwhkm9h',
                interfaceName: '8anktauh75nzoaqmyxgy1biy0d90kg4uvv8n9ydiwxfrohinyjm8i0m7p8zv94r3vorj4gf7gf3jg5808iy8po37p7l3sla5l9zlu7qfr6wxlzl9oapq5gpkvxwsiv1wt6oemgg83kfyrz4ak8m7xidchtbhff0s',
                interfaceNamespace: '8grzvi4uwqsry0224r0rphkis3arq74hlzytlqc80e22z1z2ekvqflh2cw8dqns3b72ncyrlesq48ybbkmtztthhf2giv65lajjhhnzx2gn0pqcoyjtiwa4gmf6l3c2k032mjidrt8zi9n3kazwyc6ntbrk2rclx',
                iflowName: 'lgyme741b2bpf63u93zbva4mhk746ivv9448tit5i6dmn1pt8ohcd48kie5m92ivm0hr91adxnij113lrhl3ppp0hfy19k0ltrsx6x1rwmcu8g6o8v4b6bfzc9pv2m4s6uinhqrcdo7on4i5mrpc28t6jk1gtck5',
                responsibleUserAccount: 'rm6oznjnzwd4zd90dfrm',
                lastChangeUserAccount: 'f9t32mlrg621it0pjw2x',
                lastChangedAt: '2020-08-04 20:34:37',
                folderPath: 'ds1iscin7k0e4hwjw36qrp9ns2j61b5gx4c7w346yir5dpwz8aexwmkpxdl90grw171iqszxlbttvqjst8el1qfpx5sbgladpmdga9py9ixxlsv4wy16d1c1k4u4io9zce9wvekqqa7vsmwm1vvwufqpvikm7oqqox5fo0qcldm3bzkyi86kpxpigcmdcp015c5fbdw88laj0sfxaltw7uqxjzvje4zc9btz778pk9z9wsjnunwz51wy47weiaa',
                description: '3pyforglwq6x206jg1gqk3dmbfe2kzzo1180xywdmo4pth4x8x1bic6pnikr17w0dmvhv6fqhaz9f5h5hl5n76zbdh3rvqqkwtlyl3mi692spa1k5ptuf726ynczf5r6ubofwgmlcxaot2sv9in8k6y3ymnvywjhlu4wuuh4luzy3kenaflk8scbrg1y7dvnojyzmxvx76rdepn50yrdaw7ddligxkpay3ootyudi5tlnn3tovjoqymxfrvcqdu',
                application: '385t0giq8lysf0otlygynvvvme4rsfxr3wwndogmaxnl3sx9bdam7k443as1',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: null,
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '5kptoa77dv0qq08rck4fy78h1l2bis22tmk64l7gvtbuxzuvi2',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'kbbb8deurbyefyl6tazp',
                version: 'zpgvm7so7foo9mtk769c',
                scenario: 'm0rkz65at17htaels63ndw9zvhkfxz633ge773w1cv5wsckmxxi56xtikg2z',
                party: 'pnggov5m84py0x0myd59urzvqjru8gew1ax3f6fdiiwvmvk24o4ftz8rta4sjuerh5b0rloodi9dlpyallp7586juva0n07ib9n7dx901jv4pu93dvnz0pgrkcnnf5v43k45r650ojf70lr99bxuqvjbyvo5emno',
                component: 'ou7puz5fhqltaavjhmy3qkf82l8osafcchshz6fczog50x1e1ceq7kptjcdpo3wpasaoguerxbfkkcnye0ktm9x0qtixeebsskvcv1vkemoy8bpx3uq66jtommxwv88z66rrfe0wytfju2k2j5m3l83hed91tr9b',
                interfaceName: 'leojxfwzveuvtevaa7be0csjwpda14souq4qbl26s0zesg6xmouqgapyawddysy8gwsbt8u0oxgeut7a8tv014yqdx22z41ruibz969f27p3ikyid7x76p8z2pyej1jjwwcyp6gzllizy5lb6xv1qvd40qf51f33',
                interfaceNamespace: '90n0g8ydifopdxe84i756tfx6kdxkw0shfjifegagwt3gep00mi3xpnrqf67ldgjlb09qokf03o7r7c4a3ubcjp5aj5m4dm2cg6nvqcal35atk085ra6yrchcmz4g6d6d1d7kevs33c5x7jc84e1tc1k6wq0jha0',
                iflowName: 't9k2xlzvb9z5iqam08dz8r3fv9a38erooptxk3vgcytm76fhdxpat4e0dtzyacynu0ivx2td43bpsghoty4m9i3w05t1du7cu335khz5nqh93nepni7ip006sbyj197218govdyfi78pw5mq4cma9yz2cutz0iky',
                responsibleUserAccount: 'v35k9w1v8uwh554c68tj',
                lastChangeUserAccount: '84ujx6vgwk8qezoz6rl9',
                lastChangedAt: '2020-08-05 04:29:14',
                folderPath: 'kb2o3bhzrflqkgpw044st9vt0a4ehn6bzu1juzd6m1kf33ieixvmf3cj9008x2gy5nowhr3nfycwi4xkefswz30c4c660spg71nt9f1623xrtrgq92a9lpvpb2d570s4p1927aiufvuwjh3otzd5ye3u6i4m1dhcs2vf6ndpgnq9p44vyknyakh0j4qyhoo5doyr3k3c55npns2prxn4r2fy0vdzc2bdcbyknbnatsvr4gukndy2izpw81oq42i',
                description: 'red1vvdlapy900ilyjznx5jwf5q42vm9jw8irc35n97ee7dn7ejge1tf4gufjclgkffg4m3wvcb9o7mwdfutzqb6rlnhskqdfnxwxdlrihox4ri250cpgxqs0k6573586zwe9vxxzx6kojpfhprmuh9vfowkbixg6w66f0tij2cfet0gm3wi84jfwefcaq9z80xntichchqo3aguangmpjl7sp841xqslwl7q9aau2mi305hccoija0xk7iqq42',
                application: 'ki6lpr0jwwodiunkv9kqlv98rq7ul5neud7vn011vu0bgkvlbkqiu3ntvd2c',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'b3wjawb0qig4dwizf8s6r5wnhl1zk7mp2pmhr64r0hkuwspgkv',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '7i21ecwrjwcm0php68ng',
                version: 'yd9o85uyuorcczjpjjt0',
                scenario: 'u0yi8f0729woh8701s5sibruzaup7o860k16vst8kcb7zmfodqp8p7ejhlih',
                party: 'xwjlwdg8eer846l9uo01dp0l8870possr61cxihnjq543sdelus6gojpglukw3s7csbbddutwo8gbib1uzsfv9d6lzr6h6pcxghg2rkmyknng5vinfhw76hk0mq0t8bp84dursdypy9vanfnfj1kiuw5n1521b8a',
                component: '29wtz27mujj1qsa915uxdc3wv6bqwxjh0rd7qt9m0c7i95tgoyxz6bypv3cl32r3mfbjhnfynfspg1efmt4f6yzvn6njunxor5xt09ygnzhlwwh80p7gyog0t2edxvgsakzewgjgkphzvnw630o36oip90vsrjip',
                interfaceName: 't5xr6q9q10fpuk3jv2w636f70e2alx4buc6pjmg2w5uekpor440rxo6t2gaspesn3rv8k5u2vrmqc0eadqkt8lrjfhzj42wyveky7p4ivcnmi48qshxiormvkyeyahqgoos1zvwh2jzo20b4mpg8mni13of6kma6',
                interfaceNamespace: '2rtrwnj8687muowfr3jc0mkp8t8m6rdsuv0mai9p53llelyiikhmm3n9y5yrmof3r2qffvcck5995q10od1qojr88uzr92ed7zi2dc941u3o56jksgcsxc2esgaxsqxe86snsmxbzv3kcpalrpt1xakso32ey82u',
                iflowName: '2z85ceyyg2f86kqsjp4xjhn0m1epd92f6pbr455ttstw40lyxyev3ufndutuocgow7tpt16u2sg1oif8wvq0l2w4p0gxenpoex0v05dq6ulrb7thpa7ppsmjhc86a3smv5fzy6900fujj1xoygoogxy458n3zidv',
                responsibleUserAccount: '2xhj2e0ckivgla6yn18e',
                lastChangeUserAccount: 'eh6f552yc5u00sxznocx',
                lastChangedAt: '2020-08-05 06:44:32',
                folderPath: '6fxzk2nle8h2i4duq4rs9yslw65izooyhx6ien073ayavalrw8e1qxw9thoqaocpdvq2v1whgf56977mb9hz5chu3cvaxpvb6hmfrn0gyhvsapg3d43q4uikxsx15zm2y7aimni8zfjfmo7e1ltagykd2vxez9tcog2pashi6zso3ip2fxvv37m8d0vu4ohgl8pvbpe8cqnr6h3zo3mniv0rrc7xtj23fk501b2biny752uvxq2i6ocepmchn48',
                description: 'tn9gyc50t3ptfv40oy0m59fuosxmeypi4232afnnoed3k4quiuf2b2q1v1gqxop56e6jnai2wanaofeyo9dnstiov0lhb5mpnu8gy56cboiunfqn1r1tr7ptrd4l4jgi9j33eq1hmh2uj79r78r704b3zmnc2f9l0axw3jmooz9zh5nlme2xc147g5cx3ajox5agq1dl9i6dj7o4a8ghd7hf9ezg24lkvi5876nsc3w82n7ysbjue9z4rhr9mrr',
                application: 'jkx0id5y3senolh047100hqt3e62ssyxsj2q0eqe56a9f694lcin4tetcvxw',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'nwkmcr1sulscihahb05v6epe9p2tpu7qpmcgtv9c',
                tenantId: null,
                tenantCode: '1qs4k9g3y4xd5njcac6vdadph4f8vs831qtoy7xhljmic74alu',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '465bplle0ilh4aiv1300',
                version: 'iqyr8m6aj77xmpiiabry',
                scenario: '772hvbmadotwxvsymnpmc2gj66yfx84juu4yhnz6cw52azaeabhvqn93r2ry',
                party: 'zv4gpu15lbjpsbxj6oymbps1nj2rx2k9lg6o9sydrov48nqjjqu898950pokb9iwj9quc5t12rn1n25wexkfiomudpr2opgrbukvaljk7v1yfnll3ycpg3t6h362dqblkdubg5ktml2v1fres1axzcu04vhqtgse',
                component: '6b1cpf2lve3qaraoqhsnsyujtb8prv63depfpd1mcjexfv60bcsshpvq97c9xqe05u5xkefwlh2p3gvbrr5zxdckbwavqh0v32iiq5dns1qqocd1xkgsgok67erq4diqt5l3kzx8iunodz0ky1bat9p9gm9d7xqf',
                interfaceName: 'bqqllgykf2qehzcyzfztcuiox5rtxcza8yxp51kmetxhf3ti23vh5o2rju0yvz13bzdc5lat2f70cwcs6wjbbk6boeh0spqqwt595q1qi8ne0w33s59icv49ji33t2l9yd0qxxiq0lbj3lm2ooksh6ffsg9f3r2r',
                interfaceNamespace: 'buip5sdfswx94j1cermadxkkm2f9x4hpqducfplnbshzibfvrmt4aucsjcx2ga08jdj3xgnmc97zhfn7pb234vb9xa5mib93vn1h4hirbyphs1xd5u5m1zc98sdci1aqj4h3taexc7c75teseqi9ov9yu2liakfq',
                iflowName: 'bme3onkhvhy29r8vsqpgrknrtfs8fikt61juit253awjiyygbbgl5av890fs0jvjlkkugu645xjx6svwdf2xjbjb7ci2445xxxvieapj34uggqi2z11unux0ko1u2qycggnqior0y8m80qtzbye6ao9vp427tksn',
                responsibleUserAccount: 'h4m5s36hkxyhbsy29970',
                lastChangeUserAccount: '878lm0yb5a4owz4r8bcc',
                lastChangedAt: '2020-08-04 20:08:18',
                folderPath: 'arc0653blomusz6ufv24jxfluyj2hruyxv8kmmg9r1dqijmpa3wkgucg0brmr694ttsni8yjc1akxedwspf6223xrg21qpftsrbaj2uce4587mrqymnmgc5mps6nsc1ug88tp1a82ezr100qe5rpb2gcc32zl1dbd63n2z5qiy0jsqzrl3cc3wluifwndu6cjnzkyptqt8bvb6ww4nld0hvtzzi62umx0uawuy98egxyrwdd0m1ka51zdffoz0r',
                description: '5acy16v3nvavnxccsuk4aol80w1fv12f6eymzw54oikl6yvj6srmtamkj2lbdynkizc8ee13wl4xcbj0q30ve6pim7hwf9ww079lzv6t30s6pjzwpofqqn1zphsuv3naubntwmnnmg2lmd737hybczhsw3mgbgbx286s1xug8aszw92o0x2dkd7kf6odm81fu6hcjoby5gzecs7zjztfzepyvzqvcismf7fjh7dei4ur6r0g9eovaxhkorb0sj3',
                application: '26op4ke9olr7u1irem8aet2fug30huujw7j652ou9dgidcuo6n2ipaqzhcd6',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'xsni3uitbfbk3i52stzjb7v3y72vpl4s0rk43246',
                
                tenantCode: 'jc0xeve4tvqsp9l3dz5etvubw92p4xbrpwwvdbwrpyktc7bet5',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'iemzr9vmi2oukcp2i5wk',
                version: 'wq7txiave95zt0f8mgw2',
                scenario: '43x52vor953du6v31iewlgba32b3iunukw9on02wu02x5bwedfboxjdq3y0z',
                party: 'fw0dhvtg78fmhthffoklwj009rexm6jmd72u4ydq9l8gazntltlqva3ga2yay87qkno46fnzen1nd48w9l8b0fd20byo719cfb6xsyvgz3mfjppk2075z5by9di5zbu56yqw0cf8f6ijby6rag9rm4bhvl7ov6i6',
                component: 'i5hk6qov4g9gkbqpnvck72g8c0g96cmod3rcvr4usqnokjrb55en6vhpr4q2t0yy0i7g3zghudinx34dh5ztzot3c164jxm8qn5gm31kmf2nxof5i2dlqiko3lldqfik29b8gsfxlk5epladrnv1b6mphmp41sof',
                interfaceName: 'i0jzukviamulozfeirtgdiqiqz74xmz1d8qbav6pt3hmcko4hdfx6fdp4z884eh5c6f2h5c9022yb8cl1c3vyg9g32shgzpl3mgult8ncd8nmtvwnndwofrm65dkolnvcybcwho3i3enmolfnk6944wkbn41qm29',
                interfaceNamespace: 'dsuktpmj2m8r2y3gwdwv1hm2drf81uqa7g8e9lvvvnp1ptuo9fio8tv5clme2bzxwxhqtzrb3v2kbzxe2qn6ii65c491ptdahd5forvg6e9tn8ty7gbxv7czrlhctshqnjd3s9l8qm5q8awtuej5hur37qrmgs0y',
                iflowName: 'cup4uiv8bdiqt9jvnjwwinf8s1a7tj3v5bamu3bckmztvzkva1ki749iibrh6ebfp0q4s4dza9cyv65tmmte1yjcpebre60g1wqkwczh4dtc45hd7cn3h1uvccr8qnmbc2vlwjrwt0zr62a82iqnr91wxzpidkvv',
                responsibleUserAccount: '1ubbe4gnllu41nazqszp',
                lastChangeUserAccount: 'buuh1on660nvtuxbqck1',
                lastChangedAt: '2020-08-05 08:26:08',
                folderPath: '9khdhq2r4ulskiqv5gussry6c3093vzjyjx99kpl7i7m58k59xnsgd2a6c1tmbbz5hsbls0qz5qs8zdxqveg6c51cfed9j03mc4ahlu7anx8ynnonf2zvasksc0uzbnegu7nipbcpwlmi7gewb3oy9cnuq3h4vp2yxdugom5owi3qucuu5xu2p026afvqqwc9laq7w437wdkb774fc0xdm726rvfmhrx5hy7btb5x904kit2w3gzdprxt19jgly',
                description: 'i9zmoy8n0t9uui2sanaaplq2hcshunw73o1hyo1od630elctflk18s3uh01mp27twnfzhv4igbjhky71nq0ll2invkx66r6fk81k8shepk8tspi19hq3oamy6mqogjyxcph0tktyijavb2bibl9ujahjabrhn9dsbamps3doyku7ycdz257kkvlkj11dvy48znpsq00jlp753nkbvvc28mtr2lqzpi4rkstt8sqzrkqlvrlpawrp36p65te83md',
                application: 'b1pjxux44rekebu67in1mnyfu99tkggyov51hmq5otbvolojknats9ja08bv',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '77i11nj6f48izapvqbkfgqs3la39drw12k1xsmwo',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: null,
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '7kyq7defvzkh2eas9p53',
                version: 'x6ojroceyvp5vrjwnxfx',
                scenario: '32rs1okv3rfjrnxuc1o6jp3hfpswygeqcvzj9vs3wpywmmpdqcd3bfhwxdrw',
                party: 'wtph9snm8uidk0m1pl9bikb1bc5z76vwtavpr9f3gxqfbm3nxwd98oo13uc7nq3pmmwr7c0z71v582nys0jg6iqu50gor7rxqyn1beomky54r640rrbowjumw9sn2nwwjmdmblfzthluxbbn5958l79266estezn',
                component: 'vvy5l89xamfys3wug4yg4v587azrhult1ygaxdxy3hdr3rx4sq8zwr6d2ng23w7ki0413eyh13l0eaqolshfoaqq9nneylw7pnpqvsaen3yax0mvy1hti9kxoi91hiv6wlkms72diwei8v8wbovi2aq6mt85bbau',
                interfaceName: 'q9n574tqp856d3h7a0pgx7pofd7qovwitdijfbb1hnj03yp87ytioa60fj2gm2uiliv23j6muw96wsbddph3jcbn15lf2du91vbe78ureh7d0gope3ym3exsxn2t6794fsiu0boqtg6xpybe0yp49jpgwg25y9u8',
                interfaceNamespace: 'ndbbglvaf1wyjgjj877ab5dfbi2f8sgnkpi5eb7vpms8bhnmrwqfyiy4k1izf2y89ykfgucbjbm8q5iyn0rxewg1jtul09wpymmpgclfaphnsetibnn104abp5m88hlunohx07gmejz2orap9yfk4aclbrtr934b',
                iflowName: '46vlholonx6ljss6h6x2pbvl5wjx1ubbk3ghwd6nd1xxk0kme34d94s9741rjlkzqtkt6iqs4bhy82y7ngox2pfz3jbxnx0u3agcokabducmkmxm5vgh5ifvt96e5c2phtgr4ppn1j7pa9jxqke3xm7evjck8sih',
                responsibleUserAccount: 'mgwdalyk4b1g3p2d6rqd',
                lastChangeUserAccount: 'qipq63jy0pmcrt35mpix',
                lastChangedAt: '2020-08-05 08:26:08',
                folderPath: '6j966aah0wlr8q6zvcbky01pf65uzymvksqihe4r78f3mjojt8kjtl4llfg8angn290xxym4wh9jzkvmv0mhfntcdmz15j50g0y633ambco1xmze5np1d8h0n97go1gjst3pdszl2udfva7um4jvv77350e0zmuass0nwhcg6vh6oo70gs87lno5ouqi590f2ctllcuwzwcjhge8oz4ynr314u378tiqgp0gjalyb0mb0mt0qvogmmfe50bbdai',
                description: '44lb38fc4hlmmsz2wb53745edb3ewwlgp6yeua925jl9spclua85yeayho6m7xgd1h0qk89i2wlcz569mjqfetvxfj5drypl3c0qq3rdjrac046p8llteur43miw08uggzb2bvb3bhv77gsl3mz5hzi4nzymj02zhgceabo2ai75hhqozd3crutfpw7o4dihpozwt5wr9u2lrshniice3k4iaa492kbtioeuwtqkcc86q17czop2pjvju0e04x1',
                application: 'xilhialvkxl70zm4gtf7ycj1j5agrts4rd3f58tw1tfug8b0wkak5t5044hg',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'u64m7tzf8tysbsojnglge3778vxft38odudte7a5',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'ze1nutzczu2oeyn9fiq9',
                version: 'gbwudtc7nrjwidakqr02',
                scenario: 'v1ryw4mj79kx5q8h4zqnamqi023eqzobiqhok0i6cszzieci9n3tbu3erv53',
                party: 'y0zh4xegoa13aj4vf1g3q4y9ieg3gddepiknb8r2vimmqh9lrmj0owh16at8n6i8b6c1f5wpiorrh53bhhuufwfy5apy4ouenz5w795vr7gqeuf38i1i7pls986ecplpn703yzjmg28ghtmxyjlqpd6h9u0v2a1e',
                component: 'zqbsmqj3ql5qse90xzqhy2s0crarmz6wy7i8ch5a3iu7tzr76o8zmma5572rl5f6sub6af9h22tgbkra8egv5gfxcxm99zih85y9fsssseistmy4gju98hana3mqc6gyxy30u8hcmf3ua65z4lug09cqnoa8l8vx',
                interfaceName: '3e2gll1w0rhbiajk43qzi6my1c1zfuuriroc6pk63au94hs9zn6x35q9nvb94vxsunjgk5c0zhb3ya63ejhlyexsn5e6w8fse8ynusm2dxqq7tx22e5b7isysnxe1gssl9ublkvqxsdco7m61ygi3n7n62imrwa9',
                interfaceNamespace: 'air8xikkq92iesrkgas6aq3ymlnzhdmwd0kgdei6igty2lp25x9b0kzmrshqmxjx8ynmgmikj2nmcmon19t4eussg2zmv929u56it1i69wep7890elocjcl0j2afy95jx5amnv8jfbj5wwsro3ns8epbv3mnza5t',
                iflowName: 'cm3v6z2hrbdb8q8uaz1m0glsn4m01g5w1fr9e65wxw513p2r6ok5idl6334xpeysjj8u3ggs7j12ymv7qfegu8hk3r48u5kl5wuwdwq7hcmdgf1gd8i5ido2e4m6zabsyiphc6wjaa366dt6kxggmx2d1yra8g0w',
                responsibleUserAccount: 'xzwzaj6no77yj4t2euwo',
                lastChangeUserAccount: '7emb9lzxxeclyr2rjdg3',
                lastChangedAt: '2020-08-04 09:49:14',
                folderPath: 'gxau7ixnswxwrjjk5zopwtx8rkoi1p99c0lp9rc9soi3bf7we1vnwbw190z0ljl5nl74lvk9ou2iyn7fwugiepla9usz9vp4p37rmh1flxkfv18km3j57lresw1he1usdeaix5b2am7kefeczge6kt9aljc8ah9xqnge528eu464b5bwav5jwe5t87htjp5rf1zkrbmhhxjg2u8pe9egi1l6djfv804sqwtshiev7mizr43op5x3f15mj2qxyr5',
                description: 'q8uytzwxnyrn01rmewutqgewf0xppmjzfketfzeoph5v394fc5o3vdjrb4kjprccyc7c8g3v0dbh2v4ngx6orhyd7905j3y66d2z836ec1061zdzbryjirf8145xrgo00vz6tru6z6a6oqkf2u7wtgkxla75kascrpb9s9lhd9li13r9dtf96ln47kt4g6syh5odagxczmrdl72ii3item6zinftxlbqilsgeutd76thb09utxkt1omzfk8o9hc',
                application: '8oxctt3dcfb1lhebz9qdekl6g1ec63e0cnndd3n0spum28kc03yhbl1wcoi8',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '50kl7dwuwof221iye9begjelpjc2yz3yof4twv2f',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '93b1pyc6fd67s43tt55s6pndvtzqc01vqhauw5jg3rzns744kn',
                systemId: null,
                systemName: 'lp0obf25hdn7xtthfwdc',
                version: 'dxlrbmw34t5jddkicygq',
                scenario: '034khtg9kou9sy8zy0wnnztjfwf4eak81zjr7ub5pkvfndfyhi3y0pkfhu7w',
                party: 'ng92mt89x64q25s73h6yyq6qb8q3k3e7x97m3rbbd7g55h6n3sfkw3fpxnyg7rnr6xbrq5vhypi5f279tx7bp90bwi5w9cfbg92ze7dz8teq843vu585zzd2c34ub9lqs40tns0t6h73bsw91zk8a2q3xki9qwod',
                component: 'gfhpvstibrpblnd6tt99xoo9jghm5zeecjdexlwpqmqehadd54yqnfxgzz1pi7n4tz087fpac8fp668mef1vzn23phld0v8f6bh6ffjonqco36somoiakfozz8lnukjm5f90w82tukj9gshptz2gemeto5ojqlh7',
                interfaceName: '6mor5xgg42mxxfeb4honlcirbmt8vznut59f4to2vo7767yt49e6xck6a1x0uvwwm6jmgdl6foms29o0mk4u5txv9txvr41vk1co58bzlqel7z9wpc446vvm9eyvtgwxyql7m8inlpcg34q1mykkcydve04oxzf1',
                interfaceNamespace: '0eo0tzbtmb9ttc1r1qf5cnm3zbysp4525oac7ycph31rwa11u9zvpjcp1gdkharh3go1rug2ozou4w5ivv9a4jua7eagzphkzb3db8bkol35i2xrk0t71y0l0zwwjyls1bjep66x9yvj9jz2vocqqc14xid83wwg',
                iflowName: 'rc72flsuyvdtd1v5x00srngg8r4lin5mjucs5yovng60ywyq1ttatb7sjydy5bt87p6the5uigh4v1tgwbnrcfeympnlhnlawuji2lfemgzce3ylcqv26vg0vkt839z4cejky6zd1ghb4m7ogymrnzb870p32akf',
                responsibleUserAccount: 'yycmxj1xrocoz501u1kg',
                lastChangeUserAccount: 'ymxuzukja4nzdr9opjhz',
                lastChangedAt: '2020-08-04 10:03:41',
                folderPath: 'wrez53lclkq0r68hesfxzjz59hniv7bkg1zlurke27ozbinwrjzn9bc7r2c9frl990g7dnexze5ditxcoxtz2s9akq1rzicztjh62na9op26ir36nl3pxp9uigyms7shuaidtt72vetsu9s7q3mgbydrcahinvr7bzv5ktnh2dthfojbfaubnfj9xvqt20mumwrjnw6wu6u4gl77vekecdbs3yh3wugl7lsm92ot5739dbk0ve9gv1rgdsxtok9',
                description: 'y7t7e0cn620hzidcy4wwmpkbk9kh578def1j6vzpbfvm8nat8up4sqznqi9jsy3lvvv3w0ly2pkmtxqxkc87dgvv28r7rtx1mbnil9ajz1cvn3y0dwobfn8g3nub0f2qj7clkmcxpo5wj317hbji05cmbf3s371062naihwq0lmh7zq9ic2ofaaa1f6pgvfqicqcw1ue86elcxg0r0qdmuqrhikvqovrg23ol91ndyobgduqtxefwq9b4iv89s7',
                application: 'jp3tmfntbebat25tetmmge5q37bortnmlct191cip1z1xpwe5ow09qjq4jh4',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'we0sxaztosl0vbbjxm7ne87z94buww59q4fb7wo4',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'jsdxqhqdvysss7xkjrwpqrsy7c0qhlcfisye6tvkhsj79poynp',
                
                systemName: '4gbbdxu595ni06qym5js',
                version: 'i24l0p1vhkvh0na70vg6',
                scenario: 'd2nuerlmhf8bq8skrj31spolwqlo16tc4b54y62t49cbymdlkvk8tngi45mi',
                party: '2m6vk73c6denfkopbfnhbu2sowntj060yj4isqt5l6rx2v4x0pimki4qehna7c6j7nl2psvrvdze3ndv2y0n1fhesqdvjbfoxlx6dpbg3p9368wc569n743r72zilsghhbt8hjnz27d12o35cjtltnyjayy1hp9a',
                component: '293yxq0yuhncfyb4huz5xd45mpd3hvv79hywsy40fg43r5tsdtkhk4u7qtsep53cimo5yqvjthnor9fwjibsrnjqekkvw9bhywx4ygy56bc64t9hbgrodzjcgz4gt0c4kd8rsspctod1d5533ksbqx4ql2bedrtn',
                interfaceName: 'dqd6o1zxmyhbac50doxw2yos0f7n9luinls94q4nbhb6aakpmmer77vzt3jgxkh9gl8pp30gl4lth0hhvv0lqhalov2oys3zx7yxst025umum8mszd7facio6ul9n03ifkfaviigb1oxac4t0rvo310jrea3k9we',
                interfaceNamespace: '1c9lbafacp34j3uj7o2jdlmy9p2apr67hhtbojdkxv2ltrc3w693qm3f7dht930bzybsqcvif81i0wnqthchfi9jm6zuhf1chh44560xpywcvitetodxx728guuq5tiwfpm6e4tl42ii1je300qqjcnqwwl6egt3',
                iflowName: 'higbwfkllfghen739kf9cp6l8x2vr8zt9rb3w489ubkaylc05pbm4qczdxu3g5lejldc2kwo5bb989e6d43byuki851cfhj7n6lz2yfaez04kgfbayv9hyuxpx4r9voiwvalhlpu3vmth0x9xf7yq9gzhjk2o10x',
                responsibleUserAccount: 'tghc7jc2d3mal632cdd7',
                lastChangeUserAccount: 'ez4hz4br0tj01m1ops8q',
                lastChangedAt: '2020-08-04 09:38:54',
                folderPath: 'fcyfox0i4xg3hrjxllu27lxpfidrreu01rihm100srw0vak18bfpye8bgomt9nzp6xwpwk02se0nrcxt4hc7953d3y680j794dmyabebsvg6wo7fc5ib4fltw6suvvteirpq0jgpe3mn03cckc1voa5zgeufy0eyy4s0wtii1vuh17nmoqeq74w9ei94syfs5lidlf1o68uwrh7k54xf7rjmhvntlsgnlwrmed45deqqn5ep78f3ykdshv5yu92',
                description: '1w0yxbqty6x54uxb1bhfvw5khz3ji6y27j27dizrd2nm7rtt2kj3hx2n1x3q4nzsphxpy292vvnzl5qxpuy2yeayrnwpexrh5fzrkyr5x85ooi3hzt47la2i88i2fq28lb3qmkrsev96ixaqoqndrzz6rfaaqgwtv0hsuac7qrplqjco6a9f4crirkma9y0l9g13cl674q1cfra8yumaho1n2o624zq89liijh7keox348x3u6vjtxhz49vgyfe',
                application: 'jxicaidvzcfye0uai0xr75dh237fm7bbgc7sdfp4hivfmz51jfodcz0f70z8',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '6lm2acnup1ayycsempuyqo48gq3utwa6d8om2c5t',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'zw1ol6sbx2uqdinya2urkfeamezd3388rcfypntuawxywl5c76',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: null,
                version: 'ttqtmit1yw386bky9ova',
                scenario: 'f1p9knfmu3hor3kajai2r69yti155pm1tqvsmuzbftkts4s8cksibkp3rws7',
                party: 'xww3s2l6h0rn1pwto11lds2lrsptdooirsmcoau7zo0lrh2rdx221hkg4zkf5sd6wm6ttkgwg3xnpa0evvpzs210n8vcmmkcmmme6frxj6mwxearclvwi3ideb790rdg8ydzfxm0r86nz1wbvkth5cwub5tsyb4s',
                component: 'hi4trbhu6swffzes4qnm0tlj8k7rxnaczf9074muyoyk8vrx76lrss6eq89xnvjaccffo2ow99htnm4d9zproh7t6tqqhcc5ndx3noxg2wmqb48lpiosij3piqrk74ma7mrylobcsso6svpfmxezrd06hkll8dmj',
                interfaceName: 'rj89o27arknqiyoyj3f66tnzlsltor0naa0flsa4klyam5tsxv3b9fi12xds9gr8k7privajai2h7h1qls8fbvaiw6cmxax6hmemvnpvylssgampubp4vbyrvgpod1wj0v2ni6us16l16fgup6t1fl5mxj93qclq',
                interfaceNamespace: '5q0z0k9fggqtz2nkl3l8o65rx8b9inzk42bsqd7p3xrkuoka85a7rumgndmit74gcogp6o1msmntgwkof7eh9nzd2zrtuetyx6ywhqmx91zyboqp18djxe36drgoe58tdbtrtaujwzt85b85ajhgz6jdv0kf1iyf',
                iflowName: 'v5u8bhnnc8870d3g77gdfgqd7g10o888ht9d2bhvit8j38fcaq4sk947smw8ipb4xzbqrvyyssn67y7ybq95gaw0paf12xxs0b5lva7s28fphkquyyiahxtnay5p3ia3jhwenfgo8qukb75tizrj1z52p97be9gp',
                responsibleUserAccount: 'rulaua8iea7e79si54gx',
                lastChangeUserAccount: '9bzgwnxwe4l3x9507hkc',
                lastChangedAt: '2020-08-04 14:56:47',
                folderPath: 'cyqd0hglk0g2l7kb1co384p8i8s6fuq1h8h80rehwy6szgh4g8ez9cstw7nvobv7h4hzif5b9vuh939v9fyxx8j6fivptvwvnhkqibfengskzf5l92htt8hho9hoqjivrctq8n9jtd5mtktf38yupalxgvbtxic4v1eypyoq85jooh9a6m05lur1pbzh51de5akfil6thg4tv7687j1n2xfjy8mtxdgaq76oztls7l8yl8d13w3ukbbi452sqjg',
                description: 'h5an2a12f09ncayb20co8s7ebd4oyiavqo7b78zxpwsi1uovukhatbwrtrmlumhpe81w3d6iw3x9zvjse41tzjguggxpd823gfq0rl9dnv89gbbx0xt5arfkhna681oyg8jgk2fdzr665jh9q5d91q5ccz9mpq0qwk9k52kx04wcvss5n2agvfefu17oar929p5ykaj0c16o4jbfgs50o3si8n0z4laj165g3cyq6fydfo1x88oc7s26fk3zngg',
                application: '1br1d4uj019y73mmh6k8w818ssm43lzgqfydb9663vc20xta7s4wkm0zt5qk',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'hwdhe0qb5cdy3dozyye0gl04pi1fdb1zmud3yrci',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '4u62b4otwpl5hov7if1qknogr02pyws7i41z3u7ypief27a2h6',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                
                version: 'atwq1cf9aach2r4m5kmz',
                scenario: 'lvmf2bc2kmsp5owmlmzc3579lofwaevky3vkuoyrfl59nvo1y885g2twn45u',
                party: 'jb1mninmjsor5oirqk8ijeary09pm9tkb5pf1d9nzj4su4vew07wb08uhnkln73r4jg06cfb9huahbsxvj7mi12br6lbpwt4qaal9y76kg22y7cekd5ev48f3f30v46sqmt0r1yas51xnkzj4tr0aex0sl3t9olv',
                component: 'brhjrb1n9t7nwurz565aer345yzul472ybmdnyu6p0pb8ye3rw9vdsuearfrovh2pcm2dng0q9wcj2c4jrpcdltjt5n6fqtgsdqylte2jh9re1sya3lt612dtu47ykaak5t9igh5rgjjlgmlydahd83by1q5o8bk',
                interfaceName: 'vd12fjgjjt9wat5v1d1gyu7tztx18m5f2pac90hnrr4ed34ck29m0kkh7punyf0p20h9c8zjtbz34fx0qperrsxsksh8uuasfcdhu0m3k71mvctl6q81lvt92on5ty4lyaomya7pzkcyawh4m0ik4qlwo8a9wchr',
                interfaceNamespace: '1c38pjjm7rewzttaz7vrnkr1zuhdgv62dpspjso4cw9ncc8je2cbvb6j0lagfbhs9vvef6kijayctba7q9jygjpaj1sv2b9tykxgt1jitwz8z8sgp2t6ib3v9v4omuwycw3yg3a2rfjyr3rwmi26rxmz4ces9bqv',
                iflowName: '2jo33lo1arfigiakkksi4wqr7pszoflijyaiytytpjzeicgqh7nm0z6x2wtx6ydrn6j7rytgp75gkx5an6b1y9d2dd6lyxz3oqyd7nvcmahui9dtdzfrfutlk5jmneszwt2c70yqpe1ix6llbimff7c5g6jqxtr0',
                responsibleUserAccount: '0d4apa7a0cywvvjwre77',
                lastChangeUserAccount: 'zvrwuhln3agpdsqf9p65',
                lastChangedAt: '2020-08-04 17:36:59',
                folderPath: 'os1dpow27cvo67pg4ki8ynfxtswoyz40t425vux37ftxgyk8sq9eg6ajcvfglvxlsyc6lqyxaj42fczzs7djjlrheo461y2bmbk74g4os9or5r8ytm8nw1bof1j7x2r2vabjdu52sx95njtfmdyqxlsckon4eujmoulydj3rdyq7ei471eyywa1okab13os49kyh0fk9afl5d5bxt2e4no0i3w0lrrzkbs6x7isnv8aeda7pfm9qwm0ml3d56vg',
                description: '2jhd18a9wikzi28b4rdkdtz8konuve4bsaxwkcea3qkvsm2tn9llnpszqs68g4vqunyf069lsm9x12l3dexjz248lf5zbmnvgp47pkm36jnk5qi4nx6oq07u8g5vooq8i0yjjj4q208a390uqftbhdaohixgtmdscqr592w7izk2t0ih51n41stfmpaq9na7aumwnt7s4vkp5dlcwibia0r7yz518clxya12bc3c55q7uboh5eiv80ugok96br4',
                application: 'paex0zs52ipa54cvwzng2nyctusn3o44kkrk2t1mcvx0te6y3lcr7o1w5bu0',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '8nyz88jdjsba3hlrq8n0u9t5mjz5ff6ntl6ghol2',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '6igl0e76v6cd76h2zgoe71n87vdorut12pli4h0lcjgnrfizaj',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'vvext63ty4eed7fnfqd4',
                version: null,
                scenario: '7elosmu2c5tj63besbmqut61lq2cyblopsyx955lv22g5kwwtjs6490qhh9s',
                party: '2jmrm6xtn8ng1iuzshmf44t3n04afekkrjjdl7jpcb6cwa489yc2st42khk1zeciz7es3ue3zckpdqzifjs3zogc4kooshtoq06eskseugqy9hvhdno8p5snt1zqxfw22fsx8m4u5j72wo32oe93jyqsjj7orim7',
                component: '3gek3ckkcglp9v41pg9iruhaokem5yj27zreonzqyaloal93k2shbmk6zygvzmknkatjah9mzl9oacegcvuk4xgvt8l6s3u2guijczbz53bi3tvv3xgjfl7vsk2drhutopa55gjt7llylpbk5f3336xup2x1dck4',
                interfaceName: 'vsoe2e6r1p2gjh5uyby2t3lfuubeieaydzd39p2e0g1175ctr8gh8j7rgyxtk4gnwyihsjdmhcf1rrk4vykzaxw1dnb3pmtzzzghjpugxmwx940f7qpu53tjo1hr264hjoiand0bzqja3x2l9xuw4jjbkp0fi4xe',
                interfaceNamespace: 'raaovvvyf4a8ijefiqvycc987hmyjmi4aocf61hpf2gss6amrfckh6phb6e0q9tz9z0i3oixfyabkifizygoq1hxasyw27x7zwxfl642bf961zjra9u43ylxiysh4h3cr0bce293nw1ogcrx1ybcphqjqnktgbgl',
                iflowName: 'nywt5l5mnm6yytryze4y2x3r9lu5u4vkmjx73mdloie2a26ofw4dqk9ljsk0d8eqayurwacx89rxt9vn4brs95vjh3ugnmvqps48ur6r94ena1ljhnf702alf3a7kojslvf05dd3k6zh8wr5lyteo9gn0rn3o8ag',
                responsibleUserAccount: 'h1m2rgus628vhggl6lc6',
                lastChangeUserAccount: 'trp1q9imlnw36tkt3k1b',
                lastChangedAt: '2020-08-05 04:32:37',
                folderPath: 'p6ge0kan7wq7kynoktyhiltr30mb9s1f0560tr0j1u9wzhpynrlpoblryqo75zt9fuaixdqoezq9pqn5wk53y58x91kqt8vbmiw63dnvnxh9nxw4vzsjzndbbhpih9kjq27apb3ox9i7gyzncac0ojwh8fvzxlqmp2f6llk6qr19vv7n34l51ypgkr165i4fd59bdimy9a9qgp44lqojbcrb3pt4f4uxueypdn55gcd7m7f4nv2sp1f0xfc2oam',
                description: 'p2escj8c5qzkjwunhvnarpvlppp84xcl6lklbiojbr2rkmak6qq8vkjameqvlo55iqukx6j7f5g6l9im90d1g4nnsf5y6jb4ijr5rqp88dj52my8yihna9odwmtawxy9pau9lrq5ip6u2xajco33sw2rdlqlya0vfwm1nzwc5qnmxb1229f61nr7e2nmkopw44w5igypx769yz6m5c8yuxzcqpa3vmsxoj20fmjfydy47dd45oswqtuqtyiu5h4',
                application: 'yfkjfr9rt8vyp5219y11400roxj29gl41bkyutd04pemxwyumy6jkay72muq',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'xi48ta7h0p875j9guziedlb4ddlth3b8hmt8dhy6',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'nr1jnuz87bhyvalit3ducw6lqq2im0jc7fihoocxu9jelbtubd',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'dro5gnf54kcn39o483nq',
                
                scenario: 'qatei7cs8kgvqwodb4aan9icyp5ecxw1l2iiwlrof5zxt41q9bxl3ik15cu0',
                party: 'uf46mzlwh730czlnjlrj3bu9wundrmi5k90vm3jxhyudb13a26j711ocwavrjc1kfjj96287gwcyg2rt1v64bjj02yvlg8p220kc4su2igplg4r2lf7ezp5bmvku25waojskr8af0ed9l5miykez0gbeqdei771u',
                component: 'buctznl9gswg0sfzfralenz19859oy8im841n5357lwtyz350me6aiieiod37yxcz3cfso06zx7sx266qa0cf95a0dtqmi7sbleoqpn3levjdhk1y1pltmgtzfy70se5wt3umrbamkjeekuuesqdejr0zwagahpr',
                interfaceName: 's8x8715xhayk7dbopw0e2fyvosex8mhfnwajesnugveeqxrh9fnfm2ah4u73jeaw5irk2mwtswiza67qn6m44l34k5rtzsu781n5h468f47tizehxcygum20yc7rttrllq2naj2ti5r3p378gdnib3mu6tgoc1c1',
                interfaceNamespace: 'trjnv5tyu5twam3gb7dpirsqzgs1608wz7s0uza79b0rze906qw058glqpttg3bcrxi12s5mzp7j4gorxc0fmt8womoopjztie60o71sp2cmkxb1ssz1dk45mem0y2l6fh6vr291gncx7zyjgfq08w2tqu7ngw3a',
                iflowName: '9ms81o45ezfad1xdwe9az89bale6tgm9qnxxl59bda5ajaidqdueuytu9xb4kkz5lz2paj0v8ag6i9ok3yba26lgvw9e314hql2opm8pc4ypovodvlixehj42db2wypbh9uazf355a1no1ool7uqiz1o7bs3fdph',
                responsibleUserAccount: 'm3nmybm0p501xxnrz944',
                lastChangeUserAccount: 'lma2rrl9rraq59xc16h5',
                lastChangedAt: '2020-08-04 12:01:15',
                folderPath: '5tdv9ih73fastai51154g5gnnsfobwd8oxic9kdsu5r0hs399xfctrgyqig1by755ozuzjx6o9wsxdz89bfak2xhufcgd0u5o1vvmdan3q4ik7d54o8ak1pkhspbjfeer5lufj459za6bpg73uguimyrethgam9hxdopy6fhm7pv1pa5yx6sm925cion63c0k73bg0h44l4wda0ksdzp9olhtypwqgasrnawonhyi6l3nos5duyvo9womysj3dc',
                description: 'ppfyeyapdskawxw8ffqubxa69g2ps9i8zeikxcrof1m0jouw37p5g4yyz97us9r9asko8fh2u2yiuk4o5ldcagn9dnhzolh655mqawnr0pihq0v5wjaau68d1s4rc1t6rlqnesfoqzo2wsxdakhqhaddarejuqpt8e7hvxufsjr9van9xuln96af36g8qjpfbtdopfw1l4osk06gp9bu66vaun8fdql4xsryx51g7ho8xmniwsopjirx1dmhlff',
                application: 'zpcnw9x887rbozeqifxh0ok7d2fu2yhc9pxnpc55d24puwuuoomsamilh7b8',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'unl6axakux0qwignmkx7omxwxut2qnf3i9ycu2v9',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'ocp794annk7qbdrqcjxt7oh30435lnv8p909w3u1idzs8g0mok',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'skpw17idgtrmchqh08ps',
                version: 'dcwanginwqmiwd80oupu',
                scenario: 'kj9sep78zl062e20dcgbexcvomv2zzyzaeohaepd4cob9jxqg31g5c0lxxsf',
                party: 'h5h3p29v5p56tuvxsih9zgve3egfguxlu7z5j36ch9t14zlvcwtopsgdsmkyhq3mtepu5oyfiwp14x2esroecxaj9u2jzjda7hchuzfvp3xlzhur5s490236xpiln3ncttyg1s6u47i2mo84x8uqz8ik36iomi8r',
                component: null,
                interfaceName: 'j2alfprbcgzt143etru4didfupb9992np9rfrb1uqe6y54gh3odm1gg9ilnc6oatwe4y9jlo0v965yd3ylvf7ljmg0sd51uqt95sjhsauz2ek95zl0tbn460zx7q3dz1gq8nlqpahe4lif6er5eurvjky66gkf9r',
                interfaceNamespace: 'w2be11o1ewv6avnuaxq35cmwq1ury5ttnwkiw35e9ysvu4w5b4z9zl3qaqbtdcb7vb6lr2lvfj72jkzwxryajgwxxjf8nhupfn25fffa1zeo8tpqw3b2czpzc6xvkm1b1bmymsleatrgcqo9of8a74fdz23bcsgt',
                iflowName: 'dyzpsfx0sb96c70wxugjhcdfz0jorg7gx7vj7w0anax31j7nyu4v0bqrcyh537k7pz3lohvdyyuprl9jukizgmuz8z1fg1e1wc3uk99csxh8gwu4gmaiudwawzc8pd3th4572xg5lbcrkmmupp9yfaunfsg7wz8w',
                responsibleUserAccount: '88wo9d6szxieq5ovyvi2',
                lastChangeUserAccount: 'xcmpnmcemqdhpsb2wgvi',
                lastChangedAt: '2020-08-04 22:02:13',
                folderPath: 'uvv1vpcj7eyz23hvhk8salxz96bhyukb6yx85tycqcv6lqz9chmxm61zkhmohmu63msjjlqa4ip69tpt5ahsslw6klm86p99soy2lwteh58jglg6x6bk6m1s4552k5et6n0jhv1dzdti8r7sr4rncwkd0dqangi7urbphe6vn6ow3oq8ht21j9aaom12d9fbd6iwgqbge5pubab3iiu0bl9s0c7ktdwu4apa8odi8sc1snmmcp4urijpqxckph3',
                description: '2kiuj930asducax1qkf24olyofpcxiytehhqsn8ezfpjx1ll44qcfpitiwxf04ar3n8uh44r240pv9844l4yufi56fojsdd6nlj4fci746xb9q8od2qntun5cwoa9b7s7cmtf8276zzfw08c5d095ubo6j0v8kk38giw46zl2a6a80k1lkhe5upui85ouz0k9smt8weuyvd9tvhumf118yybk7r1jlaatvf2aelzw0lbf0hfmqzykvi1kkjpjzj',
                application: 'yq1okjoxwrsri3ww2iluwsuekiwmmgqg25cyos53d8bo0ksf70bdt654voxn',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'nw665qdo0b4hsyp23c5gafhc591lkzgrura2jvo3',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'fkh70ut04oh2udv545iofwtcl12nmaygrkjqbsa7gwi763mebu',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'uoyh7wsqifjk1nmho80t',
                version: 'c9wv3mq9sdakdov2wp3g',
                scenario: '4c0y4uo5os984l28ou4hpj9vtq2zwma1lodn0qnbhx6xae0eyco1zuy23ma9',
                party: 'zi9wukoehaw6uoiheppv4r1x4uuvr3os4yyankrxkvqn6h1pnzawtjd0w9vumlv4qidy8yxncjhtd592ltxxg0y0th7d0jx4cire13kbh6eebi9fb5myoxzq619dyn7im6r30e94gd5xpvajgbqx139pqxnw4fg9',
                
                interfaceName: 'v0dgmoa5lzp8yw2g4pbv97ogk2pf88wl1fm34trcxgz41x4twfvylobrco51jv75g6ne9jpxlorbh11oqysoc31v4ve35o8u4gy70crp618tqrueoajp1onvglheotivajc5lfucmkir42o5psqw6b6bf5j4twu2',
                interfaceNamespace: 'ko5bvyzs8eb3yerqyfqbjsv8ucoymoej39s9v0ecoptpygmy7791tiiyzrmnwaxdb6ulja80tso6er47nesqe3j9pmyo3svumjbyu5ru8y91xq0zn9ezasvbtksdq974e96jn1lmfl4yw8p017jsxvuod7fb6i7c',
                iflowName: '5f6wceec3g2syb5smmydouzwjspf2lb67yhn4pqjx2t8iu14gh3j9w7s55g1cekkoz44uu0dnguzicm2ertbwaq6dq5yan651j1i49ph05g8iwy9lqo8lwtd1jokypbequoci5ej7hn31n1zq84cqap2bjivdmgg',
                responsibleUserAccount: '87voe01dx85omnck5fkx',
                lastChangeUserAccount: '6vx7mxji1q2bmwv0jo38',
                lastChangedAt: '2020-08-04 12:25:44',
                folderPath: 'inze9y52rgfmxbnudas6zxcjamq6swvwdp8uy0z2r532wtiqux1cfa425u3us6qbmzel6s9g3gsxqbc4g6o35airqoiy4cj1gwmepvhck397mp01ggh1i93b6ym4n4p36qkn5cb70su5rzguvbyxuc9pn1ceszpvwh04itpmenqtfo5g4avdco6a6uh3i4dxkbyf87gpgahf185yrfmaau2xgnwta3ewhv4d34qy4d3ncs744jgzejyy4kinndf',
                description: '1zvuwiw5hflhtjf3hzj1w3ljcg262gyvj3mh9a0ht1ifnmlz2w479zhi9u9ve6709bsc8v2nyftx4jhahbzx583gsods00gjt2734n64mtuszpt2di9jbfpw3m2nbi1b8e74gjvhfqi8xnrlzshwug7y3gp66l1n5o5seloift4wsw8ny7xvbzg0alqrr9xd7u20xve1vdbo0ha649ce3e5whx75rnno8ckd0qc5b9exxbckyfwrxq95y4riyz9',
                application: 'z26ipn1jbot2fasc7yp3ngty6pe9p2n1vy1yrqt508vr6wlc0zkuwam34jhd',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'pnmrs6qj6z9f4qx0emkzj3wc8fbwt9ves4zzaeyx',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'f49a6k0e4zimju1nfx1zy17c5rpakidy43vm29269pkap2katb',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 't2w9r6x9asli2i621q6g',
                version: 'mun4i082pp0q5ltw2y72',
                scenario: 'hkmhoufuj6wxz4gguarhz954aadszs6bmhl72trwn653iuf5f40aocg6zvto',
                party: 'r3p1t3hc4qkrz9ouny2we3ehhu1gy8mu99vw4uopz6ryl9ls3b6e7feee7z8s0r8yysv5v0l9k7iqsqab052ise0a6r5tzgoso39h4il3udbfc1f7kdiq876grja8gyjtj9w36ylflymhdrjz9vzjjn478qrgccs',
                component: 'dt8qnzj14iurpirvfhvhotf5nrcpdt1dnk3h6ewfkq9k0zcx48r4lglz54erqy8k9fck8px7hpeod2fq6ge9m0t0pgugtk5j8k8a0pkxkojatjr91ib6mpcrr74ietah9r02n2a3x0i6cxtjhi3yaq709e54hmwl',
                interfaceName: null,
                interfaceNamespace: 'w85wy6tanr5rnoiyffv1mdhknvi0ej7x0ayizi0szbor719pespx10daaxv3hf419gurwbanppqrhemjvibxjoytky2zg2ykdzgr5gi35l5ondc7fv0f2hx69n9z1d8bck88oagydvuugob0b2atj8dydbr8rdl3',
                iflowName: '1wcud74etbb8zt7raets5x3att0d05vjnqv4nt9uc7wr90e2tzd0fa6s51zc82w2zncsmgu1dlv7b6x6pf8tu4vovgqnkbebthkzhhzz6usgsqbmnsknpsclqov43brxblao9gwkz3lswnnyy176z0jbs5w2lwqz',
                responsibleUserAccount: '0ypcjlyyq2zqbrxyjx2q',
                lastChangeUserAccount: 'b6jodpq9cmtuc91k3l0f',
                lastChangedAt: '2020-08-05 05:28:55',
                folderPath: 'krwe6kdcw1s4o010pezi9ptqcrsestjduy3pzqx3etbsd4ygv5y11qrzh3v1gvrftqp8io9bnro1lle07ifzxf4t7bc29gcn7wfmcu6mqyofbfdpf4f4m9bopy5a71ixyi3sb0u104cimhnyb758ped8isikm2i8twvpy5i4uofonusg9fa8z426a7tqn6zb0lfq27yk95c357qvknni55kvvlhtpeqxiszr0pu53p3b1s74wwxhm638lf0tpvu',
                description: '05uhs4huerel7ow6vlgt0snuz456e37vkdwwuvuvkf69bi10ny2rr7if32u2ww493zfd3sikacxsgvos2k2k56b9568iscto9l79nu9shddz8l2e2g0y0une817ffd7vbxe3xu8xiscigfo6pne31af0wef8qkltjxcje9g3py19l0pue7uf9wu5caqk9fyf2l844jwke16wv6qronuo8ogevu27o0221wlfx5adux8hq52fjndhmy810qyu7qp',
                application: 'c6egzdhtsvwh5gb2zzmdf0qxj3aq5xajvrxnep7hghpt1xfasdtr5ex1ty7o',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '8jfe96zol1t4mmm01qwnuifd12ohrbiru4umdon8',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'aa35om9ddrdynh1wc7ikwawal3edea0aam2y61refp8t2fz92d',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'htij283f9kkwd7zfsvz0',
                version: '27cb6hyqk2n0dmedgz1b',
                scenario: 'm20km9m9zvzr90c0ezvym3ftdv6jzlx1ev1k0bh3l1invlesbwsd2knxw207',
                party: 'y7z2b4ehj1n1m9uq252n6cekhgsf4ml6i2rrl55y3grqc51m7cof7nhifjxyivytq81cx2bh4pva29e2b1axsd0cuvlja23wc4bcrgb9yuxu1386qk5wwlplafk17d90i9l07xclxnuvq0om2g2bx4ya2vir3u5k',
                component: 'pnj5hq131yw5g7dk3e8at6eats5lesmv0ccnmze1919gh2ix1jc7jeyqzd8jknah964vseujye4muyjbhd5u1c7e3jtjl2zn6wr2chfafhmjcbix2btyvlhr57i5djybc2yymzls55e5z1ujv5n2ejk9v6ojh29q',
                
                interfaceNamespace: 'fmu5jmwl9v1wdsjauxm9wwdzbmydpq89ig4dvy3zs7psogg0d8lnoi2e8u128k6mmdsz2woiifwp8toagg5obpuhyq3zpc32fqwvg69hh9f2kxdx1rhdvn92ryx45whcpkee5qq56nxbwtlf2nwqwhxdkwmlutm9',
                iflowName: 'a7jxrkcw6cwpdndzrd3d9hiwkuit28oru0ze76gm1jd2fmkuslrpsvypdelczf1w9d3a32cvqh3gic510fwu4evk6snga1qnyj02ddgh263v3cjd4izhdtun09u23jx3hhnbw7di46jig2y9rp8x5wknkc3w6blj',
                responsibleUserAccount: 'pukbrdd4656ti6bhp4lq',
                lastChangeUserAccount: 'usxq5rvckbyg4ck4ebz6',
                lastChangedAt: '2020-08-04 15:46:24',
                folderPath: '6tmao6uz4y0m603j0mtipg60c07qgcxr9vmx36emjrkhhud2jv1j8mgtc4yxzyhyvxefjuv2eaoczadnjsmy9ffifvo0xfepisxvmb2tw7s3trvxoa04qjo459wkdozo2wqiazf6tpqc4mba2g3xmh6u0t7ahspxm9yulfc8fhqlufpouj98p4fxhu07ikqdg3rmclyferbe6rbbl7x4kalilp1vba7udwcdh7z9w3ehri4uz65moitonqspza2',
                description: 'riq2dothd5e1owe2dbjn84715161b4j9bvs18a85yxy458du6qgisilaiirgdf0in18pfoqqkc5f5wpghxfnwns8h1eyfg2iuha7j1w4ns71m0rtm4qkdg1epzfyxydx2inzhq06ly3woan567aqwux1zbejudy0oeffkjy34is7fntcz6m3mi4m8i1yspnftrhrk7hpwm7pmn8199wriqf1habe3cb5uogvoczryvntnq80q2912drm4oph3em',
                application: '48y0yfoi847absnhzabil4p42jys2pcnxzwxxpf57ksf2pip4ip4r7a5dxzq',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'tbmu73xq6lp0t7kekr3gz5xbsw8wzyj2oqgyq8rp',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'krt817kk77cdeijsfmpq5x99u6dzu70c6hiia8c4j16h1r4lpj',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'vvy8xjl6dpxbnsnypxt9',
                version: 'rg3uuzh79c9mpzof2qri',
                scenario: 'fs3gxtwjn055igmtefkel21s0n5a0ptn54o0aciw5qdrs8mqw1869gpkfp2c',
                party: 'n43vqypisedwfhmmy4vfiqwsf1vb7k1mmxgu85j0gak3m0rp8zl5kp13lil9jmmc41fod7k5bdotf8f1t7q5qa1l2qyg2sqv9zh8w868z3f360a67r8fd5788pw4o9vwbqezabu0m5ks9nhaw2xfxj173pztztuw',
                component: 'pif70437dblousd455xt5w3cy6chfniobnwt92zwvg81yr3gelfm1htii91yvjj2gfvksrly7xo6zb9qbao5g5fr2fis4remo3slkzxx02sa9vi34193sxjqpnz72sfiya6iltd7n3z95o1tvbsc7xo4sax22dbt',
                interfaceName: '4kzy1bpn5ks3rnfde12d5e8ex6g283qb40245pwru634rwum3mpdp6xxc44a3usrqwjozn9tr8jpnmvx76s4nlzl52iv0vnbbqhf63125v5i0scnq8neh8ewxb7zo7lvb2mdvndgwgd7d4mefwcpgfn15wzbzgv8',
                interfaceNamespace: null,
                iflowName: 'its9lhar7dygurqabb3qwgddrz7rf6werhgtqj5d3eropqlv419v6wtcrlv3oquk9mxmb5439ptrztcp490os6k931yvfj5mycnxh3bwvyoccarylhubzzw2tn0zp7y9x4kbsjasjq813hweiu60ihdedgaja27f',
                responsibleUserAccount: 'gpoejtbvvnwabpnzyyvw',
                lastChangeUserAccount: 'o1q6yox064ueofhoaw37',
                lastChangedAt: '2020-08-04 15:25:24',
                folderPath: 'z3wh6hilfuh1dsetc7opa5mnguw10lcebw4zd5t0opxprpczooitxyfnxqxlvs88xe7vvhjfu75157y6gfyqxqyrtq4nds9w50oykoy44tkii54g8r7dvcbma3o3r8y8sx9tacath6vkskbicc02umlwn6ncyxsr23m720nluq1xxqas5esor6ce8ai3nvcgsi8yelmfs62yimfbulmwyp5vq4gl6loriuc439i3dox69i4nybr1wx3cfgyxfcn',
                description: 'hon2h3bv2wor29wi9hpzvml7v9ljqsv3ucrzntrxsjyvzdk90wsc4qs591s83bu3459ch09if8ge308wsiwkx6t1y4k20w0f6urufgdy4w29f40razkbx6ytm5c2fif7dsq8y71xq6fy1qtt11w44z4rmtknv4fbr5slr557kqsp4u3f95d9ttgjbrxsh305uh6fheiwl0nwe1i7y693b9law1d3yk15utcj340xwql66kaidupv40c1w6vnc6g',
                application: 'rjcxa3g4lc909983a9xtegowi1ouhxdu7i2xf2p4sv5ahvhnjd75nqlbp1f9',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'o84qg3vjzcv5rtmseadrch4ds78rn1w8b5f662vr',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'nkvj0bqlxmwb8wieokhp9h8u6hkrh1bx461wyh5e3jj8frwsun',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'z9ta3wi9eqyq97xdt5zg',
                version: 'g6tmedyla2vmy7tslyq6',
                scenario: 'e4761ccfkw6hy40kg092oa625gah97v1qjx6rwjjtdo53mcnbkawzgg467mw',
                party: '4v3agsnibgzanp961z786d1nlc6bxjzhudshel0clykae387khivk8kjrcoh0o2q6oa0j2h6c6bcm2zx0fz6bkzk7492l7l1z21jvaldqoiv1ngfcmls9vjzdzc4sr6y65ftrj3rkw00lgydv6fd0o1onvfdik5n',
                component: 'j9wqgtv964x90mhfd5t5hsogly1cx35pvwchuksouet5xbk86vojdhgflzl0h9vqxsr99e5tbjemkciu26mxgtfdqz5w2yhp9erkcc9sb9ql9kljtbypbwxpsxzyxz0o0afg5tqtuojpp68a255eiwsrekneiy4w',
                interfaceName: 'bbkpls985pguy3b25oxkbij5a31zu3xvxwwinmlngica25jwnkwe37untho4spl0euyzj5rhn175me6o32igctxwk5d7js1cvfctqu1dretoqne4npkyyouc7kk03db95154kn81j1qxm5u3sj81m8irvmdd4p9w',
                
                iflowName: 'ho58womrzz98tq2162smjuko052km1dvh34pn3bgtlpf6b1uh72qrduud7f5ebfhzrzpu3ofpi8udfupsgpk10cj6zv353zj4pqyu9s9aj98c82r9zurtm76ha2snw3jo0xd5mklbseict53uzicujuu21518niw',
                responsibleUserAccount: 'qsvf44ew5xoxjerl4bb7',
                lastChangeUserAccount: '11at680kju1ipclxmr82',
                lastChangedAt: '2020-08-04 09:58:16',
                folderPath: 'y2b7gtfu66dkkoit0wrg9jgbcwidb3594g2hc9sd0uv6g8tfgr1q4uh3x6m6kmjf7r1idpxywcx8q54qz395qywgl5ilh7zl7tatvl64832q8bsr7fkvpiatiwpjmrccvdpyuk58rv9cq4xv8yl9pcph0hz7bsfdg976ykj7gz9rxilv0vmp9f2tgyl5axeg00cczaqhu8oahshulj6m96b3u2odbkjg9np3brtfkns852wub61n5ihqodhao2g',
                description: '0r8fbndqighwq1bggum0nap0a6ao2rdutiaxzvv638uojx7aiuc3q7cpgt7p2wb07e6ok5gtegi4tpds1tjwvmx80uuqilxc33w86bb5l1hmdeopx1071priy59qfk6gai2hxxv85ybbc3uj9ur2ls9t13uxghfwfkwc1e9xck6oln9a720t8vst1vcsks862t3qy4f51k4zstyprawz1nm7sthr7xb741f1csa0upeoty97n25ko4b3i86j5pa',
                application: 'ufaegfhx4e1rett110tcl3meauh71wc45jybvw1mle0y331kuefpiubmbckk',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'cxtgxvj1m5imyp3mk3warf2zvx2dredbjtrky',
                hash: '64uotuej6g5z9tap3c5ye0cexmzbh5vxjntsdodd',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'coxtsm5vvm9j2muknba15hcfso9x1j8yf0ciu3a52rjr8zccgn',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'sfh86qhf39gs4jkg026x',
                version: 'ugaludzw75pqxv4brdup',
                scenario: '2nrok7mzc5swpdzhse7qjze3q535bm4fzgmw0u9wuzi0igdt8h7zbz06zck0',
                party: 'i9uhi2mfj15i5yugjz0mbid1yj6g8mp7vorm7sljkh3kj4eiy872u7lds4s0yzp9iduowtpb2uezo3n46ngptftk752okupn5a0wszk4js1lw4nh4v0lxx3yo7t2xd1ttzwbmvky4cn5lvwv28tg1qnhyt8idfbj',
                component: 'c3k6agiu6naotg6d0z7ptews4nte8lhwirgkz7wr0mwowy40dn4686yhq6y0hbw3ntfpetwlpe6ob7dhymfhjey5etpm2uh10wun3nliaf05yhp291l7np1z1fq7xzbv3ikc64squubpc79a6axjpptnb73e3w0n',
                interfaceName: 'ulug7y2tm1lxoktp475f76yi1cpqxc40a7rxpkeb8h5a2rezf1gfh4792ba816weuubgqz5pens5frifabl5xag7jwit6wt9rtzxfm7ewwy6juuzm4zrmek98ljpkesikzzh2rxcp3xvts8oiziweg0k30udpoxm',
                interfaceNamespace: 'o33qzuioamvymvccbwuinp21942m3oyhf8wfg5wqhc8kmyb5v23elwcf1i680g03m7zbwga54qfbpd81pidk8xwffpacclpazkte3vf6to8cafptfxrcmr59d7h9opg7qymni5cwb3n9o548fhr1jgsbjyz79ahs',
                iflowName: 'umqf6ma9zqf254zgvvzt88nc2tzma7n6zwllyes6bct6v3v8svki24ez0n98cetaczv9t2bg9sg4g42nyxny0q3k305zridf8e7kzdv62jnlkznhnq5wina33jnfirkjfl8n5scpdjhyrngrgoznmo3pu23gsphm',
                responsibleUserAccount: 'xapw2tsdnpxsexgwcf84',
                lastChangeUserAccount: 'qfgsknrwi5z9bpjn9gjv',
                lastChangedAt: '2020-08-05 06:25:57',
                folderPath: '461ck6lghzon8jge46r4p21jv5ay5o1tp9jw0hlvlo27k8slef67fvtb6u12iuaas5d4ncm7sd5yy7js3s11xedqd2roo8umpfk1tcu3ggqxnzcm136d3aukwosdrkrgpve1u3478dukroch1tgrl7ptk1l7c18qmaxo39dmonfal07y749sokevlqakbvr47mr78a9s80wcz7n8vepo1kxjsajxqk2obn64dxn46hkp8t04pm49u3ychz2zskd',
                description: 't327lzez2x84n5mhmhnltjao1zcdjojmrux2lcsu2yubmi2xc9nyqimy387dy5u7qjqg6n84z50wsjqwzpc825a2w4bqx59cmlva7gl4clvi6cvhbromw7r1yxygz4spzh5eqmxz9gmgk04yd7qjep1zs4iyb8p7w74k28njcqp920gs2p1g1bb1xf49k167zthfhemrqiw4ul5pi6yvwxlyscqwog0fw5a935hn03k0sfaf5obuz4yyic355oq',
                application: 'v4ftkw4hjmcv522algkh82hnil0dswy88s3sz485xrgl5we5y8k0o3tyhobd',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'e1kcvdz1orac7qed2mjbiwqgdatxaoyom65gzwzui',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'ydzbc1mq322g9n5rj9e0aiaskmemrcebec3ai3wwzce51wnh25',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '4wiv4t91ehlflt0ubnem',
                version: 'u9zbptzru3a8pdtx9csg',
                scenario: 'noatm9maraupoc0byirau19t6lsjdzy6vae80alaqg3y7rpyowc97864cgn7',
                party: 'jjqwso0vwdhlvghewgo1cppnb7xc8r5iu65chwzt6fw0a4k4nr06n8iw14mylo6xbe6psw50m8txb0oqdhwc1rhhhnfp788teayghhrhg9lldra3sqj2jbjdy1hre756b0dfvcndxvt5tv15z2l8z3qhq9q5t7a1',
                component: 'j0fs2e7whcsul55qgspnuzpor4q019a55rmxsw5nagewpdebo1ulzefxa2d0spvfcumhx8hu40yb4uthm2t2f3wf9o42936twli6djonbf02y9p5wlg39h3ol9t2v6k4zah0qcijnxelml5wkk0ejz7ctv1kurcr',
                interfaceName: 'tq99kfsfbqkbay94a6llueyhulpsnu6zsgz98fcshl67nzjfkrbpo7hot514fre38vgxzi2nmut6b5i0lyxkd9v2uvapv6f76wg2bz35y4uy1l5k9jreycg73mwoxb3s0m5oo6ohmtqtbgexkidaibd12869b3sz',
                interfaceNamespace: '2dkv8exmlak6z24nutsn5ibnqprqh26greyby82bjw7lhmu3nrv4fh7hlhig0c0j5w9zb1n8wwz3y71skrbm6osj2omu9ry9vbodtg8jioo27pjoiyiqz4pwb2vdckuntmcofhgrlpjyal5i3puiz7mpsa1gpmbf',
                iflowName: 'ojx29u7z9yja7yqhftro9vo7vu7116slxeha3d9l6ircyhm5x7wsk8utbetyzsgzr3acw8cocbelh7tdpkilz87absr4lkfick4mkt76v3bg7y0b3q2mv9jvwefq9pe80mxu0p70te2bkl7ve9lsu6r8kt1n1bee',
                responsibleUserAccount: 'olmha4m98pmy7ado1bcp',
                lastChangeUserAccount: '1wi5kkptjplir6g29jdb',
                lastChangedAt: '2020-08-05 01:04:12',
                folderPath: 'pw64b6csjaz13r32b7izhbz0lhe0kdv3kmwadwjm8cb93ixmefvl589cl0zoah1ndjw1g37wiriud81zl1hm58ca24954v8dc0pm47zrkwzoe4u65r02lstg0yghyfw0pdp2oe9yoe5g54iliw60jnspsroe3dw48i4uesrtymywo48dnwlqyvmirbzxjdyuwhdum3po8hsfgn8p4r52e9b7r8svy9umkhv16gdtuym72gdhn4rkx0i0qh8qlg2',
                description: 'yu05y8ebvu7pppvnwyvxzzgycqag1sd9cwiqqsfm4hhrsdu6h8z1iuw1iqvrgskdaubyqeg3jg5aqv7tcj0fhx8ly893qqwu9xskyjujrjggj9vrt3u02n0uyejidbec3zejlt85z9suzmupgv1bcg8om7klm4dezwzxjxzx3rlawz55tpuxm5bc5is8hbota7or8xiy1ir898v1j15nt12etvi7tw3ga7rw09gxi77db6gi5xvu34e9qjnb6i2',
                application: 'n1r4c9p1rzvtyxdm1k0qonrrlibhkl3izodm88oudvh3vyju1uq7r4l3ue9s',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'fhvszuo2b4qtq53qu7gfrp0ehgk6f1uipvu6yskp',
                tenantId: '68yxhzvpw28yozr8whxeid1nqfbjiitzvsc7y',
                tenantCode: '0gko113vn57hbrnxyrk4dr017fjmbsbn59gnqygp99vg2h3mik',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'jgc0whv5whsimf0z3j98',
                version: 's948fjs4ep5tl4s0ndzx',
                scenario: 'sa5pz78th4we28did4h85zldm2uy8zypt2nhk6tplr0wnxytye8vh5yy0y7i',
                party: 'sklgpik5lpa3mgk55n4exlrequ0dk99vg526z06nqanh38w4r62gtsm4xpj4wl86j3c72ia18ow6epfccweken47jggv915m30ygqx6p6zrso0ekc4vbxleojnfkert2cwaalv7b4r6q9eiau8hx0ci404mznquz',
                component: '0385izexvk1acovleqjyy4y8uholq4g1dvbodxb7zy0565u5xrvsd54q4odakbg7qhev7z0383n1kpfbmhqve27b8z9b68nt38kqyfa36tztwabxw8ufvssu6wzr3pjon6oe7snwiwxdyqdxt620bms45e3osi4u',
                interfaceName: 'zkipsoj12tncoqvf5m409e1571veek9xk8bccx88qjer8zn0b04x939arpfuktuh8htm2f6lsjg6y4irfflnmyeibt256nwtjjgpkqvahwurow4gw21h4sz9ev50djxyh9n4cv7umeqqy8kzq0ithufd53pcybve',
                interfaceNamespace: 'v3o6z0s6fgrqqxkb7x7ylbzd2pi9dsxsnide865s19slxh8l6vjkclmbbob9hv9p9de3ea2pplh9i4m0t1xzufhkebxpqe9hupy3mcppktizlbg76a81qi7z3uow19vycolsobi2ankyqnphxfwpdqjyp62betya',
                iflowName: 'ee7u7f21164i4zf07pmpudoi8i2gn1gmwt36687dow2ef1tzbnbjlugg6b0psm1u2evtf6li91aj4hw8fsppt8bztdxrpj4y6apyzhgph423no17m9bpupgoiv6i84ykh125ftwcx1z8pmakvcks7e797qni40kv',
                responsibleUserAccount: 'e3fljsry20l4umc4tjmf',
                lastChangeUserAccount: 'cq3n40bm9x1h9w5lvf7c',
                lastChangedAt: '2020-08-05 08:51:56',
                folderPath: 'dgcs6djnl1sj83czjw4gny5ox8p2eyx0agw6ptz2acelv3yjxsclm82dlx3vcu1kukh3z5o1a4u3tywgvk1picovuk74y4pgtsx2xgsjohgvzedzngk4kc81z7xd3e6jbdgiyr9qq8150u9guubfzq1mpj2irwghzieidor109fyvgg2y0x4kyn7szmte366lzaksdqw9csu2h4isysl3efiyv4iixjplssjogfl09u7swg323qwzpf8bqivthc',
                description: 'f9l3rhl4xl22o7qhuzu9mba96036jhrmrw33m5thy0g1pkmxf6d2nvxx0bmhduje6trxbj6vkmjbrr6r1v5j2aqdwvi4yh3gkdwzw3orj88bcg1xhlhjf3ceziz8rr0nwxsccvigm3moyiysjnifboqtntr8hxg1w230x6sfynpaahzl1md3x19864c1kz5gbvxvhv9nlq3rvw4whcexkbcmz7c6n66om1tau09tvw8wp4co2frrc6kp8jdhjk1',
                application: 'lp2vafo1c35ppzoj66ao50n7je8c912xiyux7513wv1ugznyad5g6aakszt2',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'wdogu0xv4xs01sqxwefn6uswdy6hyv2szid6qqpu',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'eikrm8roppjnv8v8uu0rz00p3019to5erl54b0ah597cfe57pc',
                systemId: 'fqmtueer8skj9idr3en78hf4y5z0ykwtwy98m',
                systemName: 'sp7ablk11jhyr4dovtej',
                version: 'bf58m1bsmyzcm6k29p9i',
                scenario: 'l4itocpww5kolqyo2ubf2mkejqf1z9setz9u9d7ipw0aczpyycnbty1qfvk7',
                party: 'd2x0e6wozizirn8c1ppod3rhoqyio7gs04jsq1vpjziz73otbmh1w4v61xq4iuhsvl60s66p0kw3uatxepl11fgw9d47o9odmm17ehp8gampc7hpqbsz1nvrkevh27vlbolxac5qi5t165hnn12h46da1o0xqx5e',
                component: 'qtvziv2bumtpu4g6b6o8isl4vjr8fvwoftghp90hwla154dfgvstt3rbjrokkg4z3lgdd7h2c4ll9ou6ngr3d8ht3mk350h4qx7kdvl4sjo7ciypkgn06so16fhf6w1g10nhv9n2bda4ywuzuws4chg8wr58qo0g',
                interfaceName: 'xsaxfen89jai4ku9h5met9s4yzz0yitvhtkj3ncja3g0ki3e1kv6k8k9c74s0h2eupw9znpohsa6ybh4bpskch5nq90ogdlay4k45lymzy8l6v38mq98skks762zghpgey3skts9chtudma689diyudydt9g0838',
                interfaceNamespace: 'lw3he68ugtxwknczzgvu7phjoeec39enea9sxn842yx7gz4xcpgdh8llvwn1cwi01pexpe6lqeyj3jwftejqazyq1by07e2kajjfbaj3gxz13txrpqoaokapyhmnmmtjjpjjjcc0xij64um7xnq9m4gimscctmcq',
                iflowName: '87q8tiumzrum271ublr857lr35kz0eg1kcbpu9uvdp20air32g7wqggu93o4zhawd7tk1nsy3dl2exyhwxnfq986mikn55y3x6cfda028kovxphablq7evsttw5t9xeoeh6f0z6nix4mekb9rb6cp55tkveskq0s',
                responsibleUserAccount: 'c8jp6psnph5b4m1w3pxt',
                lastChangeUserAccount: 'bsjbna7959qrh5kwnsid',
                lastChangedAt: '2020-08-04 09:11:03',
                folderPath: '0cg2muc9suggsxmx204x81rsl0zjesdocsx22k12v8dldv9c1ptont7mb6n55uhfez2tmfnd63dnfew51z1hagxcfltu7n94f64xkx6srmif3q43jnpjtsakpdxw1s0p7nfvqltv4h40e1p3gzha0dva3764z025fph8o3hqg1f80n1my61ttdzz3kdjdk1zoj6uadnzvoqj7mqy0yvxd0cx3mkp6y4mma0ykv3buo28nhpczgeznxlc5kekbs3',
                description: 'br7v17267mtt9azjfuetweyhp74uqvpf9mw22sf664y5tggw24mzec1jwv7mhgva9eht8kvl2on0vcfsb4nk4h48vftbeghr8wtq45aqjfeh9nbp3gmqtwrfivelajpdlsijhd0tru37ozu40syjk3igwybndwe79sc4kfd2omv24iha9izf2vl6w5e5bwryqtmjvmzl1b7u68ccwmh0ozsqsobwde03vntvejhy720zxvbo4cg67r1870rqyxt',
                application: 'bx51hocky2w0sggl39w6yf9sno1op072n8emvtnvmlmc255kpk6gkzzwe0rb',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'vca0r134o63gz05wpypvno4conv6g14emyirvrmq',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '99k4a7lrvml267pcbinjcuoqizjzdao1ujku99m7dyfxj17a6e',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'sln2agdoy61lv3zv6f67',
                version: 'jc2ambnld2zuq64uoo41',
                scenario: 'yqkms1dr7vt6xqg9dc9oc4jgpoxzzvww3ysl0hi1n4vsr8xfm4ulalw8wc1m',
                party: 'gqrysfner97yn4dkmi5a3jfbfpqifi2fue60h6iumbv1fos0dauuv1a8djxr60iq8yez06c5s32enxzla4gua6p4rvt9wcfil3iusi6l1ouc2aleh9tbhrg7v14qcm4y18etuf9euvvwiyfuwiv1obvis5kfn4kd',
                component: 'p2b5e7n66sfb7s7ksbf5x36zmih7dbtogsffh2pklvgvurt2ymp33v064h88fhxlqbs4ko0s8bzi246y41wlj9xipqtf96xw56upjj2zrher8gvxneqdz9awykmoybdgg5bijd2y7hzhoyd6t48eudgg8fpjpc75',
                interfaceName: 'nmskh5aq5bqi02iw5qff1ciub8ionyhftd6td51txebt84725cqsq5eytsdgoqdowze8e5j9x4qx1tqdowq3zkotuwbf6es6ciowehohicsa1z3ileua2e346yyuijgrkxnsutmcvr41wx4n0wzwqd2pzk327xcd',
                interfaceNamespace: '22nnytoshrgbws1k1gn2m1tp3akqi29f001qe8891zd436rcfq0c1aepjlelmzxeg6ty0xcontkya7u12vvv8xk6ji4wddtxu5nwlk34wxjxwcijj9fe42cejkah8l4m094e6s4kxkkfppmzx1wfoup1upuyq0qe',
                iflowName: 'vcphcaqvymnzh2xuteghfa1vpg11q230jy123zcab6oieeuhspg6yjhxtc5tv6ztvsab208lvu09zn2a6p7ghtdjyd23e60zpyrcs2xr90wyg18pii4p992g7ngnrig2o9gd5zzhaq45zrx0wix1hjboesu02ti6',
                responsibleUserAccount: 'm5o34gdil6dzer6a5f6u',
                lastChangeUserAccount: 'xlcm2z66sxkpkfhwy74s',
                lastChangedAt: '2020-08-04 21:22:02',
                folderPath: 'tweouiw0tf7qxfwswlt2ybwmhe90lgeym7akgb1a4jstabwxfqkx62qkovz5s8byed2n9rnenbor1s805r2wk6dd093nqb5mfw675darnwtsgr1oqj9l3k9ydao7hxs9ca17zybj7plmvrfmwmn6fk1bb719p9jl5hl8k7xb5n3q6t2zr1imklt590vwvfxa9khs93goyv2m7s1h9dulzdhcc8xbxs3r8lqzu7de4nzttacboh077hvx2a1opo4',
                description: 'c3l93qgs3xuquknw8i765081jxjf77w3r82zb6hx6duc5gsskndxwne3oiifet08jplxpc7wg31etmq1zcb21xpz3716t800ykp3vl1ke6sgvgyemazt3jnuuzfal1sxiozeqt47yrnddygiqdt56cn6aj3pz1wbhfgp08gg0eo1hozqtl4hlfo7gska4jeutgnhtaxba21cruzg85qmtayx5mfpz6ds9sphxjoygbp0k5x5ukha7km1xi9chsv',
                application: '7hgprxxp150zsp1x9drso9lhd9rvysqo488fot8hnx9pwwpc99du2oys66a3',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'z8z4ji2sqx77q6tzgw96vn6936x4mjdbv51yu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'xf5b1p94d08i6qw4qy1f9rigr418sk9ulshf0jej',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'fe3vsjeic88f5uew0ptfeas784drx2xm0rztfv4sek4u6vjrvew',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'rvu22kvr7l4xe56hl2f3',
                version: 'nl84jn5fbllbnm07zqzl',
                scenario: 'uux62f8ua0spuuckzgigzka6135vb9vmjbu8g8fe7rrl7eldgx1ykmwfdrht',
                party: 'y9kepfqo635zostzcmv50xqvq9yk0h4tzb53is31fkcwl8kguy6tdyx4c969rdf5aumiq3d5iedodvp6zcahjem4fd3cx4y86kwf1frp2b763rcmd5heikre3bhhticphz9pr42f2stfb4ww8wc54sdztpvyrpuz',
                component: '4efnnztelamnw44nz3un30iaa0ys4q3ih47j8phvboc0pv3vu3menba8ptlf10z0pko7m0asg8v85r2jqwuz5fo4uvd6hcp18oydsgpskvdf81uyfewadqqdz9yz4u3emvw6rot0j7nwc4yufa6490u4lw0zj2ci',
                interfaceName: 'hyaxwakcme0ws7vkcy3apnxqrtehdeqngldpnsyzuwlr31w3j6rc94gwp59e4ma86d23a7pd02h0znrbse30397maazlxtfidokeedlvrbfzhih789ux8kfvp185td68wli5vj2vatc6ibr46zobdb0lbse433zo',
                interfaceNamespace: '3oo8y4g3dhys6bu6hgj4liexll9r3xq3u3ivc452l9zre0gdw3wqbnnfomwgvpu3vn6m0ok64w8m1rt9mlc02wcibssjm021jq7cv9d23fq1msfuu21wxkrglk4qtjc2orxguttkh4o6zovh2vh5kj5xr2y9vpcm',
                iflowName: 'os4m8x6ef4m17izjzld6nsi0vtjbqfdli3bj6y5aott17k5kvwbv1qhjnxh8oxmn4u6knonb4jd3zmfmgzfqbctqbth31yorxpemcrbm3fy3z89nvlp0s3mqx675gk97se6pa0r7b1z7k3l9bqlb22tik09qzs0z',
                responsibleUserAccount: '7rzyokngx734cqizvo01',
                lastChangeUserAccount: 'vlp4e5ibo92i1kjwuava',
                lastChangedAt: '2020-08-04 14:04:19',
                folderPath: 'ei5n4ayfhcl90speqan8goia713dvlzu0ommijizh50oevqe4xcfiljo24pocqckrebni52r3hd35lq48vjziv3c6kve5rk1yo9hz165pxi0nq6by9fbruhpb0rw80pw7mwsijh29unz1ayo7iwoxxtbvn13rklb3i5r388p76hojd5s9fdpnrqubradm44gykc5owpheaz3xj7uxl5u5w6j5lacchuhkbs7p8p0qpq67qcwq3ixa7ve7aidrvu',
                description: 'b0a13uchz0r2el1ktfbtu6gmtbwtb8f32wfl3fpgi52eal74z7b2vxt8dw13vw3wv67w8ucgkrtu7e29j0vgc1xnpdc3zm13zjl0lhcnyjys5ritfurm1jcjob5q0dz8n8449t4m3s0upxhhcj3895rm14oaakiykwycn4mdhkdy5yab7kylmnlv09jpuqgflm6wg95kik8ztsfk80gttcrh04a4j6eypawbodsn8nvasso5cwwvhgnhfoc0uo5',
                application: '0uky2anom9gjk3rzkr89ep4bzyqxpjwdbuekyxz3x6w4cfb44he96cznxu4s',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'h1m26zmq7eibik1eje3ri1w7k9ore89jmmnqo713',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'w069je4pnd2lmkeh2sbvx2bkdb7b5fwwfu3xlcdx4fic7qpjfp',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'va2w1qjnfoyn8ula6s1zu',
                version: 'vbt1cqq214q77tlhxrgu',
                scenario: 'clcuv8lljx584m1qsqyqhmr7ze0npcd7et66wtdcb6briflveg7h3da3aojw',
                party: '298f0qpbyomer4g3rri6jsnq6205y3kk2uv52p2ixclgb0zivwclfo7712bvwvijq7mu6qb3r7e0uqrpwxa8mzkigppnjnjuftslh99kxip8039h9z8ntl6xyyke1j9clte1pj9mwnb7s92h1ft3fb4m2zqs3kk1',
                component: 'hzvbslup3trlvlvzjy1wgyf0iufbtnrnmfhczlwic5bv0k0ggnn04brta7o6wsvavhl1sfnjtrbv3ltk4qfg5gtiw6odco5h1ivese6f939kg1kr4q11p1vt250aitbma5zakou7n5mt43bwnzcwflqls4az96rc',
                interfaceName: 'y5tvdiwgcu6s5tn84rbteyn3wm2u7121rq9fdwedcx9w9hmfiadjt4axnvfvb9w909pjd6tuzuocho8fsgd7g5ppo9uyb0yuwm34davj7r6brbotbws6h61cgt0huytna8qkupr7mf1xp7ifalf4c1wd1zjplxwl',
                interfaceNamespace: 'zne4nc1kjjl3ygvoat9an3iqso7lf0kepy8uhrkhmbss6dmstuss42nbx0id44y4ae8xiavghg2684trhoztbu37r6m7uzvod3d1f6qttvd7wy42ikgp2nf0vvorrof1hpyszm4219b0vcsfbh3n2e0ddj9j3i3v',
                iflowName: '47uukas1ijl8yghrtt8yemuf6yua01uraqgujgc3xtt62t48dc7gbooo6jki9uqbuaie4dtc8r9z49mjrbe7zjlptf4f9zu3feguu76kmapdmemmcvfh2i5sppcfz1j9dqcw92n98175slk1wfbx1ha49nc39k2d',
                responsibleUserAccount: 'a0zs8v819xw96pgjgrjh',
                lastChangeUserAccount: 'rkc1emzfdvpr283kx4ra',
                lastChangedAt: '2020-08-05 01:53:43',
                folderPath: 'vlvnhqg4uf3pwwps536bpl2t4jm8zwgaoqxzusyd7ieqbejhjsous7v4yv5j6xyllluq4qhbnat5ybrpl9cgr5of1tke6xr7ftlkq1n7ywrkyemn7706iu6fsrih7xykybfhwcviwwe0qovlr2z2um171iz6yybvhc1iu0evvb0kecoke07vlhxtfapaonp2jnwe6tj7d4vamj9rs450fbxmvqjd1fosstubx54ul1wozfujfethlxh0fqyjlxd',
                description: '5tbpkzwbkilrw0025wbxzv7x52lgu8kiocn2klupq0t55r2m895vkinnj1vvh5jzbxcpbl5twd0x11fvo8svpg3ytz753szxufutnsblz2sqm5dpjgq9ycg1hgyqghx4j17xege8s80zn7t1kw1l6g5cgzv9oaugdq7evh94en9kgxhxr2e3kowxuf63k0sssi7p4x2pf3mssewqe1l5a7u0ki5pnucjnlb9wf9an5lg318z3mmar9lfo8r5z80',
                application: 'bosvq53dk7tijidng31m80lyq40fevthiuv9iglt2otvsckjyhvagbgznzv8',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'i4pdie8kojh1i78we7y3vcn0ebvs4sdg3p6nvl6a',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'vq9kxgshmnq573f8gr633ju2d0nu68fqr64a55i6kh74xrisgs',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'jk3nd5w4l6s8vcotyj6y',
                version: 'q4qug0fb4cm3b5dy0po5e',
                scenario: 'io8uj9qgjh1vyma5sbp4icx5kio85wgm3az9mi5eetq2iquk6qcwln3na2bs',
                party: 'mp6fgsvt7if8uhoclabzrb3k1z9an26cx5ekna6nwfa5jiuk8m8zgchyqur91341mwmmvrhfct90b4yc9yahh3zn36qc4wcelz39yayoa2ihq795pa8w5ysrt08nu0sxzbv19s15vsyze3lfqu9kqppj1xuwyl7c',
                component: 'ijffmecyu80y8y6osjiqbla8rgh1hesvqljbmj72dhwjdk7tfqaju25linmsjnm2gwqwvi5jxtyojwh1c3zsanxjtq8rk9jjgvwd2ccauljkm84c8mqzsmwznr9a0mkfdv66tqoi7sr4jzo3eh23fyho5ewt123l',
                interfaceName: '4xmml6kpj933sdrxs7473d1n2tftzbm1t0wt1sxuluqos30ezld0d2wu92tsqk66498f9r8wx4l5w0ju4o19bieo3rpr8yo85p504p7gmj3pc72r4thjsk2ee1ocpk85m5ghannujdt0g1ifrx13907pakqa4t5z',
                interfaceNamespace: 'obgooj2qnxg3pfvl2x7syondn9gg8f6zrkm0soemjanspa4jl0c2b3rlg1lt4oldc004h01t665p9evtzytcgwicj47odcvp06pyc9x2dhw02ddpcvwoetptckwmp2c0wultrhjobcxtzbuezh8svsvidega4qgp',
                iflowName: 'uhvqg0jq9ju010bhn8fzgjfjp5d6g6uw3lqbbttxvnhybgm7i1z3umoeubpvjpd2nz93vs9gbuo20wubw97wt214tp9miefdcevzjf362vo5zncyfcs5ziomou41vmjxrwm4de323ak5yuusgmmw1u9pu0hxsuy6',
                responsibleUserAccount: '6ypm1ssje0azoy0ih1j8',
                lastChangeUserAccount: 'ih9sae2r2vslrxhtfu91',
                lastChangedAt: '2020-08-05 02:19:11',
                folderPath: '885s2kvdldg2rhmdtctxc4li5g1rp0wv72hztzppdr4ftumxnqq31zigb9i0p1xgy28lb024bj0bv2tokue158wgzkfxqalryi1inciicf5kpoymv1oou0dcry3f6pr7k594z5ospq7s42x3s4r5gb825y5brzae021ex04gsr5fn0poqx57safqptqm0g5abwr7k6rmm7z5lm7yak2b9vqnm91niug2tkmc2h45mklliv1fpcmpb4nild164o6',
                description: 'tkrbbyyu2dqfz4rvk00frb12y6y3gn085qelc48ul30yqrhorzg93jqcr76fsnhewhjg92gj56dyo2q48jp6pi5l24ddpuuqe7iki8o41s0q1uyi2oaiifmxyjjpciups8tweub4yq8yl4qyinzp5o78ga1s0mpk0mw8r6r4bzcj0es8qkatifam8unyo5wk41dqsoaklect26obsqdl29p7t6nur1m17b177echy2ucn85fasx7qwksy68qacu',
                application: 'fudw7jqgmm23jtom8n16ib42zxte15oao9w3e1zoi7kuwah101lze1ruq5ta',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '6tr40d76ld6bxafqyq228es7o731ugwa2hg328dy',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'wr09ram43349t76ikjevtuz5vaohs5x0gd98u2omfaqgzbvrp3',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'mx61smxkf0zqeg8rufqz',
                version: '4y9vt4znedwcbat4b8ci',
                scenario: '9o49z24ciqnpm93mibjbwlzrwwl1vxkj5pemf9ktaxh4srtg4ca612e1csjrk',
                party: '9flshe3ch4bm04xsxp8mg8u00hwr0hhe97yd60h2cbexy2h4jmbuorlwuqz3q1jpktnt39s0tc46q8ixjskucoh6lcd9shasvvsseb431manby8e2ghfh5zq7hnw563fobqksn701juqyh0ib77pnhwfbiq5pp60',
                component: 'wj0l6v1lfc98byz9d86kqd6f91ftnzybbt0ybfyb65hxf521pchzfi7zwhojxuzrd0ttxa0v2tk2ve85jg05fdxyuasebsimn4p1ial6ff04omo5959dyag6tfkg9adceiovga7fl888mznmqt5f6guantdaqu52',
                interfaceName: '9xd6hmqlz4z2kg0gbr8imk51zchnfwl9qxvqeknjj5f5isxu74u21zwz5lh929u2roe5vpk7erwef0w6epaukqq1qnf2ahtmeqz273f9m4wq2houvqpkdjol1rz2lixu65yqxp51ev2v3125sr0vrr53f1hbmqen',
                interfaceNamespace: 'ge612tgludboyfv91oq2obkxfqu5q8vy5fury1h5grg1mdb3a2ksnegnxujgc0z31kj2hr224b5664wal8953y2sm7m8clin7dquc56xu1zavdqbnnog0g6uvj5f6qscshj2y9fds1sl2alnjrgbetusqt9ry8q5',
                iflowName: 'j1e0yxrxc70jknob2dmsdruuzjt74qo07m9e883iv5wiqzleczf8jmiu6uv8swffipotr3ilg0mz2jyew8e3u44dgu63a4d62jf4qpzgua3bcta3bqlqjd5bg3nbitl9jrqgupibf6itrqw9gjd8rmyq3tbjzco0',
                responsibleUserAccount: '646d5kvo1mom07e2pg39',
                lastChangeUserAccount: 'kci65j4vnrx9lhwzk1bw',
                lastChangedAt: '2020-08-04 20:10:14',
                folderPath: 'jx2z4uzfmprkzqmb3s4kre0zrrrep2hkxt3l78guuonbb2ven7gvffl9yf8ncf89nq5758tvno5ddb6ro0vdzurcbdrvq8xnoibwd55nur82vrlxmon23akv3c90r1cph3nvcokv2sfe14udglqxffvlb3xamsrmtoe304bf5kggprdx2qqzvg85bhqvkkm6tv3vp26ybn2exp7ga51evzj26u6qghucpv5sk1if6p1yb13xyfl6gf9q5ttpowr',
                description: 'b511tqtvpm7ah637x9cs9q17nj7yayvxzj9v0w80obm9otgw1cv9oej25y8ftl7a0ihbhwrvk1rgxl7pjul37ab8nfk6yd5fbi20djamgc5pw547c0jb0m85l93r6qnl4h5g73niygdayb26q01w56155tspjef2q6c9bcq09snsqxwb4x6rsenx8jhnryf6v1wvypn00yioc9k2vi4zbhbzk6h0odpp1e6vhjmlzwnpxy3z1e9ckabzmv769oh',
                application: '0166nylol2ww6whj3gmoo8is253489iemz7crtjnlccca8647imqawfclmuk',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'b7uiguq052iyb1kq8xs3sfe2j3ca3pw8rnilt11x',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '0getyjs21mafoqttgby7ncj6vpsl6155rpi4a7rn1ux1fu0w4w',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'n807ikh02kos31mmq691',
                version: 'gr6jl7tvl34djacbbfxz',
                scenario: 'l99e78mjrngqhnv4diwwcbtqcgdacerhwmkm0wzh37dsd6bso3vntq7zdbk1',
                party: '13kwol9n1mj7w44vtuqhemdf9umyotu0jidf9wbw3ck7kfpve6coak9vfocqr08w3jj08n4aziuzwjg05f136rri6lrrhd7c3w0ndh282uhrn0ntcxkzqimyarzjc31b5dr4r3kj5es5ikc7i3x27svxu9noz3fc5',
                component: 'yz5r6e46jksqjnvjjfrr3y7tivh8vvl6oroyhenjzff19ugqg6pgyj0e4am9e7ngnygibouqovemd6wnzotd2y407kx9851j6sv74l6dieeuzxjt1rgcjt2rynvqmjmn347oe04lmfws7y4mdbqyqfrcwkjkt4c9',
                interfaceName: 'mtu5j7lt5duulon9djwt0mahqevqvoebndujfzc85eqqeym6sa4fjc94yibvvuck4wmp92tkof4o6y8sqpsbk92sovt5r4askkwm1lldyksitdun2tcu07ea58eti97637vltjijbkzxnguqarxithhq7v3ug8tr',
                interfaceNamespace: '25kll1iwsdxq9bwj1aidfunvl4rfyt7qain4d1bmgwklhyui96knnk324q3vxsh74c1679b5erz5il0ftn4sb1wtarh9q4m4cdy8yda4j8vr6vyh6tj8a8htwa76hqe5lxx2goww0zs0c92y8tbhccmfjpzgcpnr',
                iflowName: '8oz3szb48id4u5cbqwv54y1yqqk7tsu9vl9pno3znyhpcfwb4uzgh9clk5i9ve73upe3e5375bcgs9h06pmu8l82c3v38svy2wp7fmrd08q5jydqnn7psxf1nvrt2n9sjcagjgef3jgqqqjdf08ciz32nvg6hcaf',
                responsibleUserAccount: 'ttfx5p6ws3d30vd6as0n',
                lastChangeUserAccount: 'rodh7zce8khp0uungyk1',
                lastChangedAt: '2020-08-04 12:01:01',
                folderPath: '78asm82qu1io7o4r53pkpdtlpiosqffbtso0od4o5x3veq4g22uddfjvfan5a5hyemhrbpjt5itawsvogxkpdh53qntlfvp40fsgb0e2vme4s82nq61wwedfs8tpeuq5r008wp8isjsmmuhcx70kp8th572om4wyf12hdic1stpg1eimo6v24cxutukhzvp4y5pin6vxitbosmpb37xr3y2611zb8n4ku4izu3i7zor43ch09b8tv3c7twl127u',
                description: 'iza45g74i40rzrju5rbwwzsrj9rxkaq2f4sctwkt4g96s806ikvwzustp8bdx50zei0a3r9ljh4gq7ylh27j74wgqwz4o0uu1k4vpjlgxrg98ixono63nxysb8z7yi3f7b09ijzfgenajkin56g0v42hy00eannv4rgmyq1o5c14igsvs8zwj1z44einw77ms8l4rsnpyi4rqiazwv33zo8kqu7gyo7qzivoz8l8w9ygp7iyhlrv4ncxhgmyt8n',
                application: 'toqfuhv4krl004tqlrl533h0ydrauw661lpjngbw7oja2ot19rpibicsers4',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '84knd7ait2xt0x82lqpwzs3x9wlcgmpj5l36c34q',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'gjz838fo9u2bif9muxtl3nf4wnqpi3b0kudcbn2rpwggdwl4yj',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'wletn7pupjhgvvw6y49h',
                version: '883u6zk47gus2qokfpk6',
                scenario: 'g5kzxo3poodji45vj8kyarevq0tyw6awepb8ppooe0sdyli09ckinqqwz3d1',
                party: '8eg7nvclpbcyinq1y1ttepipphpv7ofhb2dfx3sn0s83uwvo81xq90cwu0n1ulfuldqp78cbu0erceeacrbe5mr7qua2sh4p3sg5dk8yqzk2c341su7ei8kcqxst1b35k4p967nc4207e7luw39hgiji6ed7jpq5',
                component: 'q4fok7oek5mx9flnngfz1ysvlg4qft4cgwrfhd7nfdww08717lyr6s61v4slsdjp25aenb3bcakcd1xiiv99upc2hjkhzf6qwbtjjofyn2kaiuy4zyxg8mudfqgrcpglf0b3235pd13awulo98z6nkkrpcm3l311a',
                interfaceName: '7g98afmnn4lulv5cagkl4o304s528mufzdbt7ch6bkwqeyz5bw2l46s6v8xqa1atyn0jt9j8z8g2icikknwt176amr3l04pwmkkjsmlmmbt93uvlvw2vz8lzt32mlbfeeltbvv4l36lyrix9jcc8t6zzqqk7wlj8',
                interfaceNamespace: '22zpgkysqzedw66nk0dfs39wbc6ipkigm829pmywb1kgjhfjbsblla6msngdghlwowxvb2ee913dv1zrr5w4djnwxvk1g9x3yt3ddf8ktmjijmwuv60flbuy3llamvre5e6fz1ior1fzyczihy4tdju3q7fukqlx',
                iflowName: 'o2q8n9iwba35ud6zv0vfq7f1jt8fjc1lsu7tyygqpcnbvsxar4hhm2yk9c1jcaitnayz1j2vhcrhs6r1u892fb8qdrbzvxsgm2yk47yhm65t18k9v6gpfhkuyz7flu5gb4owdtfq1c65cvl5w0we3zvxgxthnmsc',
                responsibleUserAccount: 'e2sqdsv01io92ct5hmja',
                lastChangeUserAccount: '2lp5roe835ttnu8i6fjj',
                lastChangedAt: '2020-08-04 14:42:11',
                folderPath: 'b71pgwi9b712wcvmsqjgqf1lfrhjt676vopbsr38i9yihd4af3b94y0kqkcqhskk8gcta5l37xq3mg6vzz9akwcpnatxjwjjoh2qek3xhn1v25brmtp4ex47tn80vni1r0yenadgi7sgwfjt9spup4thj116gs005aeeu1u4zuc1g90a4f9uxmq00stjepg4w5cov2zah4a1zgf7v5alf8wr4z3rhgwzs2ooris2pbxety7yh968mzvyafm1u3t',
                description: 'iwrxzhsp1zx5pa9f4x6ih6ypd1gxzbtebd2pmixiw2ri7ei603yuuq7b4b5zqw20829r4fhdfttc5x621dgnhld2tjsttb9bw6wnjcvz1f9u0bmfnrnk43r8w7301zb8zihsv0hft7qp6v6tksr65fhepagaln34xu5zr5jvn9f6vuqgmkll53ol08b3c1aow0mtnm5q49v144sb48bszdysxqh17ddrroia5vbjkozsaface9oz4lbxj98rcom',
                application: 'ltwomn8c8sq5halr2wuukodi6okfzlbs6nq7cit2zkfznv4obk2adg33k4oh',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '9ogdjhbj9bvjg8oitqhveraxphqzhb5bp1tae4cn',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'a91v2cf3j7lq162edn7gw9heg3flkupy3ou2hh2n8gq6xx7g38',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '7i6l7hffkzff7441tpvy',
                version: 'b8g573qrdy5yrt29w61k',
                scenario: 'nmh2sjuq0ukqo251dzxsaoj5z9segmkf1dnxiake49jbinkfn03jpgxtp9m8',
                party: '0a2bxa4yrnnbzz7em9j9wcl8moecmle7kzfsfow0ltj6kxwapiq1rrdu08c2gvzrib4arudlfjknlzf8iaqm6u183hrnxytrg63lh01hsy6yxa9sr6qypuccwypftfln42x1lbo8c2fugti9kmboxaduyvttwmpx',
                component: 'uq4y5uz3bbz2k0jy5xd6ngbtmoplvem8msyrbt97x89v4u0suhi05o7ead7c2jwdxu7oek0yxcyu6xk51bdpo8g2ty0s7p71mite60vucjx36p2t6zwltjal36asm5uzp9cjoi73jx02wajlbuzbckcp49ib1xi0',
                interfaceName: 'uyjg1kjbwbc6lj7jpi8snhl04kasqapl7224talalnxbwvfnpldcybtpiob93omwth6sfx8lm7jqfwwni72ebx6vtdg11kr2y7eavt724f42nerz8tk0fp89io3o2q4f64zobtqa1l1orghi70ewurze7ihsaguhp',
                interfaceNamespace: 'avu0bmhnut571htp8xxm1gvj59m72f915nqkws7h68nhfp0gwcv7dz0eax6dw6y1w6z0u76y4rpdzivogve0cxve58geywnlef3uidru1bf9ugkohc9m9ziwys191g3kd4g43ixis156bbf0060jg7hrz092k9cx',
                iflowName: '8eb5pzza3o2zvgn5z4oarhrt77lqh6vqscta4nvzc1xe15z7whpjkwlzbemu8fuayikzmupqmwdaqnh85kuw36km3f2j0hz5q92y74c4dsrllqvirryir8ejai8qmkbdktel2gvwq8gds3hyr7k7srpsp5zr00tn',
                responsibleUserAccount: 'jq4eu2e175hfmnh9poxp',
                lastChangeUserAccount: '6ols27x7z07v7178xu4y',
                lastChangedAt: '2020-08-05 04:28:42',
                folderPath: '2h44byyxgvg4rwy7emp9lb012jw4pwbl03e9gcrmcwtcf1qrmok8cqi4u5m51rajj2srt67ach4htliiedrvxvgjaqys4gfj6sab5ymwtrq4lgoqdy0fc0k57iaup7w84qi8hrwbqem5mu4t0alnu3np7p2ku915aqugqnakl7ths7fu9a10lpbtvau13rsntwmwfwv2isdqe7hw8tdq3lirsw3jrzh612ozqrdzs7puzf1yo50gheq4iy6clbg',
                description: '9birzt0o8d3hu787qlj6d5kplyv896qrn43dr66niu0c5uhh0f2lbsxids3g9xi95b5w8pgtky3i1voluq3nao6zmudzfvw0zfht1xilcikzyfkm7iupx15r7wcoywtjw7i1v1i5xsvck49m7q2lvgl0svfit488zr02zdgk9j46s8ihow0b6ew8rju0886h4p8z33yxkhp0mof2l7kt8huue354n6lskqdahxbw2dq3kvclb42w4njtp7b4xw3',
                application: '899w5uq2rnn1fbchbcjd7fpdpkvst0hpi75dkt8xninxmzzik42pd1syb6gv',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'sttal58qd2cnh07jufq3u40xc7txplih271yv44m',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '2uvbfssmih8t9f5hpxl0hfzssxdcvob0m3lm4s2xo72onri3us',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '5kqjiidivjjnhrp7jzb1',
                version: '9ui22ecqeup2l3bpvev4',
                scenario: 'ppovsditknv8121rbon34yww9olh0anj7umxqwokgfn5gk7mjnpwobfot6aa',
                party: 'd6w5p7jiqg2cuzhaad6ap3qswdzfxl9i24m67gisyxsuu30wtxzuz6uaacsbspu4mnqrsbupotizq7hsg5yc18c3ewz9yj3i14hndl36b9jlv4ht17t48u2tw3ddaf94k0hfjq5138n9ug4iys2kx4q0m9pybrz1',
                component: 'xhcclaiwjh5smlwwyvx1jvkwk7j1vmhpya8gix1fi2cptyk3d733ne5ynb0e55rrblylzoy7g39r0f42zf1h8frny3gpib55eoga2qkk5cm13wqehvctpkr95vajlpila3tt6xopqmc20pobo6wt55q2kxtwetoq',
                interfaceName: '3l3915m6gxycf4d1fr0pp6g7qfzroae95asp0mtga4s4bp52manhlegr21dwfw7q6jmi47zanpf3fki7rsq5edg6zqo2n8axqxqki5zy5ro8fnat97b6l0s0v3hcy8aqbt0fi09ptfdduesoju9rziy4pqvqpm2f',
                interfaceNamespace: 'z2t46ks0ngrh0v9qggyuzf5q33sj8ra7g3yaxgphba6h7c9awooytodfolitzzf5yu4rq8qpls1pu7szbd9dhi0yjz93flzxog6g4qp7ao4oczo4t8djc03grrefh06t3iwkipjglavmt1edx4snfc22cgf4gbjtg',
                iflowName: '8cyltshmf4jiq3opguqm1jdh19thjcfg3qpmeu3tmect3zgw1fcz741wiynpjwz3dfbfcf6ztruehzceuky87lwrgnc71gp64mkgn9fj54akqdntqjwgg7abvdym30aqio955trwxv6cue1vko4wnnx351u420d6',
                responsibleUserAccount: 'va7midmj65pveox3pj9m',
                lastChangeUserAccount: '7dmpncfla33kbfe4aimi',
                lastChangedAt: '2020-08-04 18:20:54',
                folderPath: 'vg87ip2wyh2wow5ltlddd78m7u6lr9n85d1162841sdm6dgd8zqxfmly94shfkri8h3ddxcu29cjkjp3gxoduc1m767jnyns92dj5v1kvofsewc2v7dnutfpv11zqd2rpmaudvnl5z7ksajoub1wqftwaw7s4vhzxtbkhdbn8b5rdjmo4utdfk4x3o372495p80awmt75mcr5ag08khdnuthecn0in7h6wfww7j2wlmlsamepc7mze1vitvv2t0',
                description: 'vmgq44weeims421w59q10axa9cb28vcl31c2794j98xw4ct4sppt8t4s71hi6t0i4ypne1mf9c2dtj3ycqj9yr9h9id7ihhgq26vrc7e5mkwtefutx4agqmxxec23gkiqxk3ctwtpuhj2cs7bjlaiga897dh9if1cyn9v1qh27mbphkp38vhna7eeeq0vq96eo9w1cjxmqjt4j35gsjmwpu14a0dd31c2tc10djh1r515n9q3sw7oqf3ci4re43',
                application: '5n23ka31w4w7dzsww12vnc18i17sa3rqq8kp2h8e6mruz0tu86fg9sce310s',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'bqj5k7izipv3e8zkxjj63cardhi97y51h669q6c4',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'hwjf7b9fvc0nqm7jhxxwd1nih64v552iv37wvibg4yin9imiip',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'oqcdljzh8uk64by2gnu7',
                version: 'h86n3a1ijl2ffy353vt6',
                scenario: 'nye1mkjr8nkcie0ri6z4evczwujoypyoc0vjbiynq9cbbwrzjqgoehhgj35g',
                party: 'c3vcgrvaornsdwjk56787ljkjiuqr13vc5wkktg5w4amoatutpgm2nzkroh6641q571icq46qwq6fh66dp0h6lw7a32228gptv4wgeksmhvq7vfzxpn2wj6qxv2vhxf51ggrxl2vtfv7tcwxmkhim8jsh94xe9nl',
                component: 'qa9i42g7trts56p994532fj3th9f5sojcyhirq0vnah5elek9yshcoeqmnquy4rxs196s31pft2xx6rv75pzt2wbz809ize2tmw194f8ek6y2uayww0tqk5uq5winnw69rfkea0qvp5hm8d9uktx1j1u7wh1kyxg',
                interfaceName: 'l3iqf9ad8840p2j5boq8t9nbvs1vzr7himbhef4bl5xy4zbr1i1yn6dsc0a496hok2vgpfdwn6getab35ffl9sevwgnkbumuatzijxqtg4mx6npepzl8kckpyv0wprat5zt9r9ji8hj8g5u0uhmuasptx132hh8z',
                interfaceNamespace: 'iekcxn3sufwozyvbiyyuqh0y1sw7d2823ea7m4vb8ulf2isfjcll3mqu3rqpdm5xn0yex0fi46eehl0qnyni6c5mtmc6rlgj4tz4n4hiwmd2tb1qwt1awz8l7sjunoabgiaj8x3zi8sils4dtx9z2cotagx0kpie',
                iflowName: '90ofhnhmjsh2iar20qmyw19jqw0pykasatqkr5h9lmk3u5vn0x85vazzj9s4a522o1hjivsaq674l8lcrt5kt4shj7c6pk6vmzz5l0efvbwff5djdno4lthihr8ujnhhm0nwsdxikjwx47ks8ltozrh5qmiq8kgvf',
                responsibleUserAccount: 'zfvi3c3elkc6v56sldg5',
                lastChangeUserAccount: 'dg4utcy3jq9uplslajan',
                lastChangedAt: '2020-08-04 23:11:28',
                folderPath: 'k6cma86fyd5ua9yhj06sqvwx9iz5xpz876mbrcx52jxh9rb9iq6j6iqx5zn9utd2vtdjj797edxlk2xi1ax7rl98dvhxazs5y1op4l4tiox99yi5h1h9tkuzlotod0eqaak0wqisjunl18ceqne4w8xgbvob1bdtxhd1isnf1ubeovppps84izpocycu1ybouxnkywtf38cyekhbew1r18poepjapez4tnpxdta4ld6n80ds3shtuaemgsm8g3q',
                description: 'be56b2smezaa1478q99iuo5nxp202aexco7uul11f8fadjhnkm6ln1438bmqakldsqcw2na8qpyyk3wuo9xwdsv9wi1aa92smtnky4psfrk1f1trnpe2f9zvqoea76b7m0s4nqijxmm9j0fq1b62g93i2f8i7ggkdi9jzxky2j1kk8rko4f6wrerup905gtjz616zvhi5ify71cs1km923914jkrunp53mc43unn0q1jhpx7j9oca02j92vc56c',
                application: 'xq15hvk4lk8tb8aes7y4lfwe7gxa1p92m3ue4xprntja9fxxg2fkpk3dxwvy',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 't95esrkb8exscfxqjguikpswhvg8rr4mpfkm5ngr',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '8o4r5149xfihsglp0s0ug2mbrxkkv22k18orjiyhmg5qapqw05',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'hi6h241hc2qq8fv30rus',
                version: 'tc56pfj59k5apr2qeyc3',
                scenario: 'h8vfoze0enhhccftg2im9skkrrnm70e6odc81l145alfkg2kfbsu04tprkfr',
                party: 'b96qsyg07uwg6gr5fuuqef2isqd2nn4k55orqyonkdush5jjuhw62issac1i16rthkvd8tlu6u0l42g0n34i3h9l7rhik7ebhxndptzb044ibkriiguu3eoccs7lhylwt9v4zi4wqnw3h3kcrkxjdei66oh5pwxa',
                component: 'x0ns7640uduxmyedy7q681itkhz7aypeiafsz1dq967ndjxxlmfglyseis6e755xm8tf3aak3hew3pnenmfeeh30f30z977zfomuwno6zd0kwl9tuga8fecfva0s45alngj8jrmbm7r7ygrulzjjcy55ybx2gtgf',
                interfaceName: 'sdkfcxmc1ek68zi1krzl2cv2vi448363o5dka834794snqpa7ujxkb5ux0f5h0pkr9vsf5b3zubgh5d8emesgf42vgj5ta9det87ab3rqemlk6mapas443r3hqne3i7laoit2n1qngrmjpflfj20pu32t4drmt93',
                interfaceNamespace: 'ujsat75gnhagtvqkp4tf8sxs6h2anai6ittiqxv2o0ahe7dugchukt5ao94lollvwd20r8movo56h47vg7nlg30ut1m1tlcz34lharvi4ufk4tha1f6guwr5glnn9f0r1gpbu1od4c9tg9lruadfo6ve5uzvb829',
                iflowName: 'h3vt68e0md8rka62pttyt70k75ucvl00e5rpyiow09jxyb5odl89pllb77hya14z0xtc7u8a5deqmk189xeo534t0yy9gxqilzb5eiz4j9goigef9xnxk6zw0c8217u5rvb3qa1gj4movrfjlvc7dntblv3gogw6',
                responsibleUserAccount: '36u3obu9xitzsgjng51dg',
                lastChangeUserAccount: 'e3v93tbeqcu2019fgx1i',
                lastChangedAt: '2020-08-05 02:19:53',
                folderPath: 'khwkbp29fie738ezckis06rashbpvnbqi3vnk6fujnbq15kz0q754hzjghl8zanh0skoazkmgq74ykgl6w2n03fuua4aphlzylexr1b0k178r1xpzpnjugzbl2grcb1tbps42yc93r9f1gqgzhkg64y5tq70ecnliddghs5mswcnq0z8vicjdrj60sr4ziayt5we5jp4lspe333jt4if4wgw02t93xhorubs5qtbx0nd1qi2imp4vmliqgu7eel',
                description: 'g1j2k1li7btrw4ja6x2lz2rx7ywembqbdtz7q496wwhzge8nhoodhqpf60qx2jsyxu1nv6ukplh4qss5a5h7bsm25c7oupc1v25bbujrfzblo71lc8urfduaz2s3m4pe3jq92x6wqdju59nm1nnveh70bqnmh32fddf60l8y5agjmjfnto1omwx03xifzrgtekw1q57w5vi87nq4iut1ptak9emby1q5ef5paodfjtoiq7sm147i2m6t9d9mu2h',
                application: 'm93o8m70usm99wf0e6volk78zbjpc6itfdllo3uh7mxmhz25x3dabejrr2g7',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '27h3juig54junzbeiz0gqyfbna49bhnffnkq51u2',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '7r3d9f7i2d1jaolq7k1vvqc9net3rq2pvxjzy4ggnnrgxuvxnu',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '6co2ie1zh5jfci39zxct',
                version: 'brf3lwi29tmeb6y98cu7',
                scenario: 'j1xfify8csksaygt78yfgsymborsg12gcpfrqtt3jok9n7xfuaflfcy6kvrm',
                party: '8kod1qnwcemtqh2lr7wxvx6e3tqyk9tjx3vch8f2qreodqmw927d0dfza429ml2e7fkj42l91ehhz3rph6g5vlead88eo8zb22fmgwcfa0sgyp4yaf34rrhuyy223dyt11t19uyxhjsyv52wbypujulqvy0ggkyf',
                component: 'l8gvg1npcwdvyaixn34a06fk9tnxlpjry2kdo3xjkddzehpbmwlsx18qf60za5lo7vzd1a12283oxutmnm3fxh5qi1wdydqjc9orgndv97ym024zhxslsfj1isawk1hl6ud42cf3yfgpbloa9xn321f3esplew9s',
                interfaceName: 'wszrsnh9rvls8amd05ybymapd7o111gmz71qkiifienj3l2qxnc4xxs6y4mnihug3j8b3ozhi3llw8hw60nt0yhryrtnfb84fjjfpu0xx7q9s1myt2rkhtnkciudbohojt0nabc7i5f3edy14dpcn1jaex0cu3oo',
                interfaceNamespace: '0et1vc45hu5c0oog42fdv2jxgu2hho17vivr77pn41e8dk1egk9vgpihh0yx7aup33s2mlaf6j1coyjemrpyq7vecsz4ddavsqbk02mxr16ptuwlmp8mlbncwdqdzz7cqfxt1ut1zbpl4hn6x62yws8rlyf1muaa',
                iflowName: 'vue5yd1hcge0v52a0iftt3l0u3xhd45vbbnmym55acr4gkgpmmlxp17ot7jv1blqjn1l5zer3naapxvwptc28j8baosyvisff3lr2bgunvarp5x4ptjz2wbkd8l51eip2yj53bmierqbeiasdhgfql81ykn0ysjn',
                responsibleUserAccount: 'ppl1vqpsirkbswplnv80',
                lastChangeUserAccount: 'ealdleocibsobnkynvvwx',
                lastChangedAt: '2020-08-04 15:21:01',
                folderPath: '3v24czwwma11vwplcpfu34tw8iwyvwgs1d27urivl14y64senxuf0qy5xef3ei1dsoledbexy4ic3avsezlx0as6zivma6m6js40as5revmb3puhn6532cbhtq5b0efmpw5xsbkwim6fcrff12u9fwu8hfa2xbxif074jws4ezxh15qmbk45vjfxqb8aoymaw059jrkdz0a8ujs341nwcyrrtd6w29hqgsdaqeo4biw0o3r7jcf2vu85hwvt4zr',
                description: '49jf0jcyzxtj1dv76co5uxi0j76t72uuhq0p6922h8kodj5t04cxdyh9nut6zyihcm2x91fb0u181aeq5kfu68qnioi51pa7yq94ifqyc0zb5hxtxj072cqpb0m5dem31d69tbdg676ir65dzw31qoizpkk2rvkl3oxpap91zms228zo4ggeddr2d8d45b09jac9fibdx2m6i5fukfwxfaiy2sfft4u57jgy6tyqfmm9z3x8cp18icyittiqxfj',
                application: 'es48y03qprtd2dnh3sbxy3z55gia02a235q471okdm12qdptymwlpci9zxoi',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '7mwc3r9hrmvpmq6ocljqkwp39dz50mearqqzqri4',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'ahmbhhwqc3djnn4did0xe25toj5vbjwsciasojl9ky27uzjfjw',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'to57zuf91x8ziuhzlq2m',
                version: 'h4tv306pfzr0f7gwzw61',
                scenario: 'vwvikwwvo9umhc9izipykfaz0dm0di6giy55k3l50p0hyf950cdt2mrrzmpg',
                party: 'shlxsmydrpbmxurssztgi7sg604kxbw8kv38c3r3owho1bf8ik1baiv05m0cv1pal1rbvbqr6lt8e62k89o553psw25i4ljmezvjs1i5o5jj090ev3ucljg3bjbr05mhrz5qqyewa06aeo9cf4k2g8ipujmw21pg',
                component: 'zv9ff9xyw9qtvltdu1k16dnzfwl5nggz6thbbgno4s6zosuzt62glkxoqfzk2nj0daas5nv7l3dijs0flkobbehjgq1nr9jvkihelbpbk77rittwuzqllic3w4dl4tm1ucxh28h9xt18f2c4wihloog5dxpwdje9',
                interfaceName: 'ln8we6ztw71grxhw9iepix95xhyhq4rdjs8fjy7xkw1x794i98am3vkfhot6n8hedi822dry5pmqd88r61g50a9gtryian44foqt0b3m2v7v3zbjmtba143wpev3w11y4arf4rgbu5wsyejc9owt3cp4kze422yu',
                interfaceNamespace: 'hez46bgxketht0h59j0zkwhlh3q05np5bxo0tsgwhew2s0v9yeuvszc0i5jspxdcd55ds2n4owd4adpldavuxcj6e3o4vyxdj9zkj7oxquymwgj8m784uv0nsolwgb30c9gkkf0ygvsjwru9fbkoysilevb0z90g',
                iflowName: 'm5in7vjbctca3npvld30cu0bnv3snzu3c9nguvspa9hxfpfy17nw69f4o8b6e1w5tx9dznqrvzhrp8uo1020oe5nmg3g95tbfm1mw5mty8alek73fwjb3pttqib6sym7kqiyeiue8wwsnmc2shpwtwcbio2px3em',
                responsibleUserAccount: 'mqrxgskz1ojzamwcepqp',
                lastChangeUserAccount: 'xqvce8gytbgnbki330s4',
                lastChangedAt: '2020-08-04 18:03:19',
                folderPath: 'zpw6q29nu8za3xkawuulntfv72tv5yp6iwnnvvtk2ldvkhsi6y19a6e3zlgjwlcotdpdqdkgbxhrceby2f28k1br8ehzsejt6ywh64sgnboov0zwiik02iuxtmdpgrpk1wqttwhh7szyv3e7449b2a3tcba7ojntg0equ4rzhgdazj33vu75ynwk1zcwmw9kujoxvociofmafbvhmwbufwrbfx94qz2viymwk5yvt8p9c9bgsgjzdhlmkhrxhr7l',
                description: 'w76shiex08i19n6oup42qmrygfuon6pcn2zayp9pxljmejpu1qojnvwj54f3uwrjy422magpq0n7a65euj0nwoqiwkp6p1wjs3zli9b2li7ee4a1bc8nh30iyveooiou82u0iewe0obho18yuk1ra9wcwowk9yx82mbgeqgvov68iffm3ugyjskjo992mv6vvg0j5pv0kuh44yuji3778khw5lnc64va0fuevs35r0i5z74dksbrz8wbck1gnly',
                application: 'x69nnl51f56inlp05ynkv6tqmzsils2qjok4l3u7zl124bulrjgvb2g5gtv8',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'reisq9jn67ghyh61vc5eukt8b9sumxcp3s4z1nom',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'o4p78r8kqbrht282mvk0uuo60s8z6dirvh6jg183borzz74noh',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'hrr97djncj6x1r64hz9k',
                version: 'tr6tn3uzh44ex2hb79ef',
                scenario: 'c80ugqn4ss9c8uq5zqmn2ylckliaxwsfeikuqce9sinxm3e3e4k4xnh0uau9',
                party: 'lnsvz54ghivnqbz6ayb24ku784xxkmumyqlhh15ail2zmq759i2oh7m2eedid0a5xlwlv48izsfyxeulpg8sqv4rskl20nrco7g0e7u6lk68sa4mkapowrezs972lkltpi867q2ngmfhedf90wyqetbij67kmdz3',
                component: 'r0azjdt8f2zv4w2wazk9han67p1wxj6xro6cwnbhzz0g92zqhvt5ikcf0xnx829wxwatoe2esdhg1ul98moy0890n9sri260ojho5tqwq6dxw6hmh0miuo524wjk3z2q7btlyupavidfmrhot80y1hsnm59x7xhn',
                interfaceName: '9fs8lp7w1b32h1t2vmg6rc7j8lukz62zqdssh85wjvmc3bzzwu7xnqgln0mhhsx4tp4igzxbtru1ispy3ef0hzdcysjwk0fx2as1zv8focu1ybq17ba57ikmk500okkameg5s8q8c3l9cejewl46bvkkvpgmjza2',
                interfaceNamespace: 'qwzmn26s80rb7shz7g2dg1j9shqtynt0tocjyq99zpq77uipdg8aoaxfc73u8iyab3x0vsyfec5rumoxq2c64cv1h9bxxqgcdylnfqjb7v28ttqh92pyz124ffag0zr7dd74bt44xgb5rkxww0iifvsbf83n0j4c',
                iflowName: 'oti91kde6s2yatil59yvfmctqzqlyo2th67dpnr73paphf2ewvmzy8a9kw8ksc9chyyku2zzf9vb0xip7f5dr7u8wx51vjvgqq3x1xleqwisnuwj6pi0fob3ec5rupd9cwtwm0tay44viqtnw3bokf8pcx20ntfa',
                responsibleUserAccount: '7fd51c5xwliq6fcsd2qh',
                lastChangeUserAccount: 'wkzc472vxo4lnvsr1joq',
                lastChangedAt: '2020-08-04 21:40:48',
                folderPath: '2qnjh67jldc3ourrb736y3clutoh3eufi3e07r8ng5yxfjvikuxn1yit700d3muyygbtpw7ypf6eqacniwwik145tyuvyhp5w01jkqdt5edzs3dfftje3r5wsq9c5ovepd3vbxmbh5ep1chyitff9bya7wlg2m5nx3717a95hp597mpi1de4es4gulbaft0r6vktmh5f1m0v4wbcby62rvb2nmsij2b0a7ci4pgplr41v3r4g4gfgdsv5zbjxrx',
                description: 'lkqx8xh1xn8q1nmql1zj57rcv2rlx5wvob4kj9bur62qnn2g98fd2t5ktmhj78qwr9kx83nhb6ip03bobzrpgdwbr9a4kemii0mx7n7t2kv8mtf2tvt1tc2hyp57zwsd4a5l92areta5hcsb0tmx6zz1iijlr3czym6r6d55beji6f2i9qp79h3wxtot8ckma2h6rt4hbuut443ty9nmn1x313x1ch1uhos94l8o39g4m3c23hvehgjahi7u53fr',
                application: '77dc0lepi7fuefmbjmse20t41ox2ncayf1n8sp15t0pzg79883gslfsg0tvw',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'z5neonzupuzwwfuc71jdqio61av9fiodvxanwjmj',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '1oz56lg1ki8l098ljsv1kj3w67jblfjz5qotchmd36if67dw2m',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'u1ubwy4v1id07hliz8jq',
                version: '9szyrgyzqx0zdmtnkfny',
                scenario: 'i4bdoo88062nrhbqwg8pwf143t9t83zmpgon1nczggdtzdbe0xbfpf62uv12',
                party: 'fqe2l4kr77junqbxe3lzsujamjzstjkk87uqv3c77s1k7kef2258s9of7b3y3v684kieq95fhtfo8xrtw277kug46q452ku6i1ifenxscirvfytc5j7vh7cent6iuwmq0ruup2vs5zzfvxio00coks3zttrwbzh4',
                component: '5tip6szyn2mf8nbre5hzjixhtove59bjpin0i5hrd2wdok6i4i7qyoppn42h3ekwwv3kdy4i3exj1m211a68pw1uvjn43wieg3ui9qbafdivysg7bbvarls0hl21bqz0hwt8my81sld4hfajcbgoidmzagngfinc',
                interfaceName: 'u5q8w9llnpwb8nzsxrooqicdrm3w24a1ccgvanpjylf2g8c1jmxqe812x72qbssnmoszk1vmbpz8cn74pjxga22wuuipb7w6wiaqp6ufzicw34jcwe0z153ei26we6qr8lfnnvyduvs623zdy7iivd9h2n2sk9p4',
                interfaceNamespace: 'm0ffla4l0zgy3fiiwim5jjaevytdm1eva52cm6qzt9zti2i02xoxzzvbz4n8v58am3ufv213kmqw26e6ym9362j70vnpzbwwh6f7750066x2k6sloq5we5qbstgn3dr64copk89v5ojb0rc0v727a7y1jyepbkti',
                iflowName: 'i9rsnvc311mrw2ivvh2ba9iucunb9gvsehc7qs4alofffyow25k0mqr2g6fdgar7ivotjdivdxg2qm5jc7c0wa83keatq2nuyco7xbo0jzmheovs04rlb8yblro0705wjoeovp4crwuq2gpvuh6aqus1t8udf8dx',
                responsibleUserAccount: 'j7vs9icu3ywyjt3kws0p',
                lastChangeUserAccount: 'mw1msjh7o11t5a6krmfa',
                lastChangedAt: '2020-08-05 05:47:32',
                folderPath: '3jx98ti6awb67xjk0kth2b9im8yloqclnayvfi33w3wtlzot6huhrqa1z50ey8zwox7m7cmw2sc6t4ym0azncvok24znii7jbyeug1v9kde40m7wm3073cs1iunna63x4a64jspi865a621nz01embqmpg48gnnzy5eh4mxs8h9rj7kd8hyok9w0v098u4qvojya8qvmgt9asxxqhitd48xvi06rvu6wphahesdcvd88fclc7iq7ssxpeq20g5w',
                description: 'gwvgm5fj29bhq4hoccq8gi93o8s099mfywdhvtg67jg4xb02gp3ja8pu3ldu3oebdashse8uhfcwfpqd2kwpjf348h2vlbu51y73nml8l56m8mvsfji8ryyzhxtupcr275ts90fkujlqmerbepxjchw7jdtlzsqhywpk0cqmn9wcluyeynu4ibvtg7fmm6iexdfwehuv6vxuoeazgx6qqcdtopcwumgxbb3caolyis1kinv286le52yp925tjnx',
                application: 'dx662gpqwf6usi8nhyl1tc2k3te1w6kfi44n77v4jmn3jl5tl7nmakszyke91',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'yubiwfqmd6s38xfyux9rgfio5qn1cifjggeu13m3',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '0rwhvz9vusgneseljwe4hm8dg7ya3jakgb0oq69nl7vamjhdrn',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '16wtismrq7lye31fmmoj',
                version: 'hhil3fcv5xqck2298rqx',
                scenario: 'vhvgef45q63k9dzb110a9cfcu7tctgqs634canihf5ai98esmfctl8yob6zl',
                party: '8knr65k8a0118oxy6z5937x7m3mn04yx6kj0vvys2etf672qw9vjgkmmmevj4furx3lp0yzo4ut4ln5ujrc73ftv4mxo72w0wp6lnpvhjoq1i8shlqfdydf7l8aw9lh1zpmw09w2zf3jq3h209tybfhthq8wlrjw',
                component: '27xknc1pjfkexpvvr7ievkfx6pmo5oigy8pmpr7a8a73w6bx2eghipax7k118hx971olg0vsfrqnz6zr0qgx5r4b1uxmhz5zks7fhq1ql00vy08g3j0t3rilfs92mnsowgls5kdgyu57misbiiiqgtzg4u63tkvr',
                interfaceName: 'izs8dt2o785eh4tpmwufo4jy6ernrq62maetyy96ut5zc6kjb96863dt5l99bjb802gc8tk5v4ax8di59oilm9uq2gz37d3bcpdiwh1kxr3p27pb3pdr9k3dlpfctkqvfssne9sw335z6rj3mtni83v6in0w0hyk',
                interfaceNamespace: 'tejw35gcfoxx05kjzuex3yj2h3h5yj9gyqw129iz8217lepfzbgsejszd8sdqqemz36gol2cpow0c6xy6g7l5b6zigjpdl9rs2259048s9t8zhpmwida6ga6viiakxiv4bfnjkqtphpnypciwmbu0y9rroqefndx',
                iflowName: 't4yjwdd53njxc3vfdqs7ubtjj5qt0zf942isgfq0qx41tbh2sgun6oeud0u26tgc76d9wrgvfs7k3oqj39kjq8ynywpb7x2fnwprnrzb7efpetoeov2n3yzmi2pa9roavdy497vc7hluioaz5rzsm7ps5ae7b4ko',
                responsibleUserAccount: '7ctsken0my0h9kc1372w',
                lastChangeUserAccount: 'otbk7o2ha973rftgccjd',
                lastChangedAt: '2020-08-04 12:02:07',
                folderPath: 'uplbppr4mg0bnp3zhzqiwrkh14dzs6tu6vt2ulvfyrinru5zq0m65nj74nza8jrzlynbhm9y3p385oejrluq4m4ui2g25hyopivk8hk319kvq5tt8hpopn8mdcsm21sihaoihks8qrm4bkbbbioafkb1jk4e8x5xaw0wg2lpwjhppidfebzyse5wdw2cd2c4dc2df2p29xofhamrg1ppprsfcea9jzs9788d2bz3kb3d7pni5vitaocvwdxfi25',
                description: '9zs2ka6aac5e7c1bpwz4zzr2phnitwn9e97xx3v42supq4ruqli3o7mubistw4mlwcbv7nxi01mtrz1sec438n8hg4njh3dvpcsdrlqubnyxf5yq4vfkmrmlp2tubqlv78y3gtdcuqojxzkrcmxvt94azj811g32bcupi6ada1i7ytftu9rk7abkzt2f4poeep6vxevl436n2cwokcvppcb5l3cawcodvjarz00yazzfva0hzu1etgd9aj08adx',
                application: '7bcvsb26y0ib7z0x518xxy282jjp83aflkec5yzdf6mnypc5ydibqfb14lr9',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '92t0moyk5l1n1o0p44546utszxqz2vtd82t6s7ee',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'y6ygxph6f8f53gu1rk8e1qyuv5z0trv70ue5fzqlxo9u3j97qi',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: '9ukas80mzc9z5drvwx9n',
                version: 'c6134yvxm0auw5c30fc2',
                scenario: 'x71333zi6ham4i5h6ur76xp6e2c1m9tphsz82qdlx4mfbwouhg28y22jhubm',
                party: 'lr2o4efm7er2zj602yaj61qb7m73hgkyv5ebqlh0qshxttxya8tmuxv1ezt7ryc71iww84wd26ya49s5ph08l6d7965um7wod8o0ls0klre6sl5bx81ijaqbxdak8xj6o4f243zigydfa7t7gx61m515ms8fy34a',
                component: 'cu4hgy4z55rruuewh6onpzfzue0wka041bop7xdf2yvy0vkw4m35lcmy6dgzzzijy6nmk5pqxa2btt1i62lgy1oz51wjm09wbewu9mcon2y84q25mx42e79eld8482603ww75z8egviznkiys7tvyg1yot3le9t9',
                interfaceName: 'e3f20m8cgpeiy28tvb33kg0nrethvgk28sq5p0a5ggqprascoae84le99p1hjcbg4qlakma4iuqf6hcddo5ladacs2llk0sp94ii0s2dwnvtgs6os8blle47yom7rykeyppsvtj94dtnvphwvn4foiddp0nk4iwe',
                interfaceNamespace: 'hr615cphuoz5mpz3ws0nlww6plueujt8tgvvq99j6winlhz3bpdadou7c0d52xmf9yz9belwc30pfrswvbvon17s4otqlb40weg29bsxniut344bn5s21n2d657zaawjve0gwhqbrv1xmm997sakudr66cfm0av9',
                iflowName: 'wxkx3tkq45h54m80lrromcs4tjm9ryuejmqkrencus8pd31o5oftr0wzv5eej594oqkvng7a833u1qcruzp8ciam13zxazk7faqndrevh21dlilzq6zyxcc0diqsllixe5rex0y4cuv2xqvamfvm03tq4h4fdko3',
                responsibleUserAccount: 'muzkpe5eiwjof6o8kfqx',
                lastChangeUserAccount: 'm5z7wm1dv8kbwre0oti2',
                lastChangedAt: '2020-08-05 06:42:51',
                folderPath: '4g9u9jj83airk8ydbrcud03tfdfnaov9854mt2bb778c03lmaf7jc25aa4jp7ejjsr6ctpieqf6ry3g84jfu7u9tsd1swavby7d03lysr607oxnu06o74t0dusha59z03lm0tv3jj4ozxmkqhcb9314hjamtpd7kyq7os3zotfsf4j1clr77x4ez9blax4kprflixr3vo9zp5vipe4t6hr606lqq3neh13r21e2zooaxnjw984uge8gy8tsvc5n',
                description: 'dhzwtegn5zggjh9idplesdcvtv4hldtzj50depnz8mt8e9r4h5yplh8wqhlxbnd0vs2sbq8dl9zxyjqxjheijr8g8r50bt34le3o8mq78g1ypxy5iymun88rasblzva57iv2wcs2wq2ya7k5lvyg98tmpkko6wuhh2qja7gg7v8zh2q68rv7dswtdmh1w3x4gm8s99ffoyyn6xxk6bxs1t313nff75pvh02egdau1fr8ljrrfiw7w3isdafe0eu',
                application: 'tax0cu656p4em58tpstwp1m0pktwvqsyqu8eee2avxuvu8gzaf5nqctkw1c4',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: 'sxdsi74qsxocv3pzc4nn4bsfjfee682siyex5ls2',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'i176xuurc6gd241d64czgvrcmg9nzqtbw1uuu5apna7p65juik',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'yd9wv5xdyksrrfdibulj',
                version: 'xxqda1robmwaqtkef6wg',
                scenario: 'jqkvtklso9jqs98xjfope312bw90vn80om33sxf2yq151xbpixl9gbuzghl8',
                party: 'aou2bkgnykxi0feq6njafrhcsen2n6qzrn3134p9mlpr7usoqlny57l3f71tz87kt4t6wxe9uc5mlnfb8fg18lxc0kz4gh111050o1lar0ydwvxrr32wac4xm491l7o1gpahw6htju7ourdixh549li6b9iugxj3',
                component: '0q1rjqitnbacyh2es1lpukswnxhqgvs29e8v8pen5o5lh643kju3z02wfty7eri3kpq8667jdnt5yfera5vmjo7f7nrcxzb57o8l0y2r2e3fj9rna7xi3lk7yfyi1ndlml2hx0u5gq0twtntom0fbgkf2ihovfya',
                interfaceName: 'vyfv7tkrd1kcx7qd3eotkp5xipc1o9n09sahvggn6w14yeqa1zs0jmserdxnfcoykj919d3uhig592tjoxol57xoxnsqvt9xut15yf02k0jb80v15przx5toxa1wgign5and4d0kcekd8qjf1mxben3vmmfd5exz',
                interfaceNamespace: 'wrnr7u1z7exh4osa1s5paknshwxjer6b8t98i85opuyu4s25uialz6mk0ehgbcbef483aznkeao050armmbhx0h6o46otv8er3ufgfmbwt36cl338w3d2lxod2decvayo92z7l38dm69orwtecj1pfyz0wflcd65',
                iflowName: 't9p891ikbcfr4exsxfmdqby1vz2gcghhrgbtiqbq5rf4hdms2y19h8idholoyicg0a87kid6nrm2d1t6qnhlji2rhgubnk2ax7fqix010fbrfm848a39f9x3tjhsdfhszckyebuu0btc4mf5unklsj3jy7szu294',
                responsibleUserAccount: 'mcnfz0ozsiw895twz9yq',
                lastChangeUserAccount: 'v8gppfk7rt1lgwqzcde0',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'is3qdwfn7s3sr8p79s3oc5dsmkp9box4jk6uftaomrnso3oulwpi4snj4wvvjt1j5t40bwz4ja5uxra83exuicx6dtp8741pawm4v5g5nea1la9crmxb7acfl3vb6xqkf2ard3n6dzwp6xx9fhdwrqaoivcqz4jb3hvnjskughihpil0dpwpiz9u2p83dv1638796pddwazvb09gfqu1gu226iuk27hvh87brmfz2ltnvtwmn6sl4x0e6k67uic',
                description: 'j7ipyc61v1tgymn5u600wcl2g7a9pra6drlb3xy7ajdduzvzgjso9ajozzz1azj2nb106pp8q2cc8oo0g0n3xx6zltip2dxmhp4m8zntswql84sry3xpd47gxviqm4iazvlewfrw1i5xvtwzg83dfp0cv1fie48biyn62zsyu0cx0kea0wknmcmklw4xwhctx5z6gioq2jv6s8hihmovaharzyg6a0yte4fux0vbw7a9t5fup0sm34aix81f3tf',
                application: 'p2o5t1qtykv7icxgdi632vx0fetcvi8w2heleo845ie1x1tbu1350b8x1452',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '3mfkfphsg67wetahyfjzzeq8jzrpr3vk5gejvddx',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: '9m6mcihdlt4dbwo9r2qga9vzkg6q2wyjfqa91d3j2app941z0x',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 'suer2kkrds1r0s3vdaau',
                version: 'xefbojkl87enwg0bl1li',
                scenario: 'jtxxnhknmsnjd2i8kddbx8rumm4w4yrzdlfspprx0dwvfrhahd4ukm5tmuwj',
                party: '7a67j1f92omnqjcjqpj3zzrlvn7pyblzhlpkf2dv70wwt4g36c8881weq965i4pokunkch8mpbcysoqqw57dq6t86v0yqz7n0hzhi0ppsnvaesi3u54stputi7irlohhtbwy3motzvkevj1v6q3xfe3taq9esoue',
                component: 'ls9bsbnl7tdtsrm9j93sbewbwnuvq506m4x6l1tjap2aids7wgs0hrbh40c6r56lvqtfppom2g900ivzktwo2oh6l3b0xje1g2b0a344sd5pomv9b4xnjkhya6x9knwgj72mh5e7uz6lez6jobro1mfyiifl329u',
                interfaceName: 'ze5nstrbbc8dggzk4uvbsjzkin8732fu8smykjfz89vtim0m3jp54sm19q6yruswer82e9mmcpkw7uatvphn7c79ewjc35gv0xz8cx71bgfba2ql2j8koytjuidmdpy2haga3lc3ovjq2sazglxjuuzaz7xumt49',
                interfaceNamespace: 'hszgzitrx2q7x5xko6r6v057ahibxv1f707qhriou2lbnexsw42d1nzw4kznmyrd371qqh2te8eogx7tqurogmi9aht660617wn0dr1d9nz2f2am4r526g0y3hiy020ju2z85s38efqumrrk2kg95y1dply8s8yt',
                iflowName: 'g2zij9lsa4gg46w2jp1x63ult0ubfhuplc02bb6c97r1grynlt8q6fqvq7k6knngivc3zha1pt48ub8isfsxjiurmz05xaqffo1o6pfml5ohwbcxn3ss03s3tonkrg5qkpw8m4rx5ychei7yxco1q9vbud1pnok8',
                responsibleUserAccount: '8vauf906aww70mpwmvzo',
                lastChangeUserAccount: 'nzi2ixzlyb5noz2audqc',
                lastChangedAt: '2020-08-04 23:57:10',
                folderPath: '0gjrs1uapwedcsawhdn5hz9i0v2ex1c6hskd01gl7m4fmyd19egp1hm9odnk06f7a5bnmuw382va6jxl84aelukxdbvq32421p16plpwgm9tv403undpz4selqp6ifjq3nu2pa7nsj3130jyoe677bgd0rnrdepx4eh9v8r7t03b9kxxi8ahp3iv8gvr49qs9c35s3v72pxd0x534f0v20mv979c118jm8zaal59qf0nja59navksjhlkemhaea',
                description: 'd0cues4tatayttmrpetv3eqn2cxsslm7hmm10yygnajtwecjvmgbl7dh22uguy10xzvtydkoq237qthqg8ywl6yp39vqs745t3pp6k6eztjpts3xa0uqpvt3v4uutv5k5fkuul6iqgqnox74u61g4vmgonvdl2gw8dtnoobxcsc71f3v1t9t8dga7qanbun5trpoj0g7akdwo4zad2efwa8yuvhbgrmg3h823yt0dysa3yp8k1se81yjp8exapw',
                application: 'xo0xx6oocwdljj9x16h7bqjvrrdore3bcql54bmk8e5c4mhthyd5pu89wqat',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    test(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '01ff11e1-693f-4052-9b18-1ea56f86b920'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'de0f6cd8-466d-4003-9d01-84c94bbf9f40'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'de0f6cd8-466d-4003-9d01-84c94bbf9f40'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/2bfe33cd-67c6-4dac-abc2-5d308141e33e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/de0f6cd8-466d-4003-9d01-84c94bbf9f40')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'de0f6cd8-466d-4003-9d01-84c94bbf9f40'));
    });

    test(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a1625735-3b0b-42f6-b66e-b50abf704b7b',
                hash: 'ejsav8szfyvhf46ly29icqbxqypnsyodfk73e0cd',
                tenantId: 'b536e280-0c70-4d49-b5d8-30ba51427159',
                tenantCode: '25yemsbg001x24bzg6t95idvwl18xfg7rfcq417n9j3f1j8lf9',
                systemId: 'e3f1becf-ccdc-42fc-8045-7693a29c1f89',
                systemName: 'lixw2yy0j4i827ohk19a',
                version: 'yxzclqr14irb0m0vci9w',
                scenario: 'x6gpgv1xjrmsop13a91vwzi9sg5gj8ge5o6fkdzrpfa85d3pu9x6j9rpc3gf',
                party: 'dq9t15774uhfkj4mcnobky01mkyu9vy5g38tulgavplow47r3ie2ac0xy7ex8u6jjsf68yrvdhf36x884p54n7t6cbapk0t9z2sthqoa2a7f4kj5gji0qk94mvzdxcjwttpwhx7sdoxn8u6q48gaao0e1t4j5jzm',
                component: '4gvk6bzadbudmxa85ju8pc6syzfxyx4bfm5837pdf638qbmt8iw6y5pa13xl13b2u4vo8zybhjqi5xinf6q25qhvfx60b9mjv800qb9tfgfci8u9rlglm6ubakxhyr2nobp5fnpxkyzsz62i0f61j0q5dlvejyi3',
                interfaceName: 'j7ssw7wtp11n19agrkxxb1ungw5mm601q0wtmfljs0sbf9iwaiujvrfc8oww1c853qw88s7d870n1r5bqxmbgbsibkvt5bxlf084zxpqt72hf7qvc356xix2xs5et8xaja3ap8c43pl0h7ieqaw99oe2om3v1hfj',
                interfaceNamespace: 'hpek1cqk2nz1wnd1jmvd7r75zlmb268aankcn1kzmuna89g5z1g3lbd6xcen8pw68mwallv4v0uc93cznneu4uxu4bf45bhov3u0blyyrxoiaw7s2gba41ciubhqk5dh16bhwsed9zg3dlqzq4cr9ikev7wheg2f',
                iflowName: 'hy49oayd4a8drmy5sji0gkrm3lmu996o4sl08uu9p32wvlj98be1whf90ehgtni1rh44npbgbo3f3w5inkfatieudpg33hyeq3o44nb8i2jokk7lebv5ns8xr7896edhrpyqgfm1amx9n5h33w70uoma5lyadpgi',
                responsibleUserAccount: 'i583kzofzojphgbojbsv',
                lastChangeUserAccount: 'rmdu7t84udnh78ywsfef',
                lastChangedAt: '2020-08-05 05:38:34',
                folderPath: '8aqd0w0es0y61qv1qo59t9xqgnbpmb4j6ctjlehjdgvqk2x4xbe31qylm9j6p5ujoa9lkwvltatu0hz6gt7hz12pmddr82j6qlkuepbdha3cp37oju3t4lc35eswvoi4somr7nog8n8suymercvyj8ptrcyapipn9nge586oxq1h99eqc90098xlxgmd4cx4mrn1vsfklqy0rbwnnflqqw4rwcbzqztvfpgprz5whr24m96btz0lh2y3657co5a',
                description: 'wylrs0h1ucb801q7ksygth89xtvzxam5wqdflq3euxb72pcykzckzt70e1fs7wfdid1u23s5tqrapx7jnch1udtk81eliufgyvrleb3y3rucaahd1eth9tt6g68bn03l8812nap925gtuxl659jqipqol0rxzd7rmk349b5aiq4lunzdwwgdrda5ah0tswgu5iwdqpxb0xa4qhdy9k6ngbcwxsme7ipr6xhfq6h9uod76fs06495cbgy9pv0ose',
                application: 'knqvasvixhfdveg0erdmoipkkwnu6o0of9n4yx0qxriiab5rgt3t9sc9cegd',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'fe267c55-edcb-4afd-9e16-c884f81601a2',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                hash: '1svrygd56yjkbdgwjss020ig704f4idmmuwcuorf',
                tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                tenantCode: 'ffrpe4k8nzyxdo3er80sjfpyecrb11v8o9ns88k42uacrvvks3',
                systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                systemName: 't493gwgzh94ll0rcyuwn',
                version: 'oqxb51ql361bkgjybxcd',
                scenario: 'bztnxpwu9o4ir89akzxm2bhtdtrbo16h8lpgezxgmxaqmo8fgws1yqbpebbt',
                party: 'ws6dtrcl2jzhh1hksrnebfh6uxz6jiw00l4ecs2qh6a7ricxaggprwvppy94k1ndxqprwmom8dgv8lxbkja2d2nycg4sxtiw619z00c5fj90vmf1chenquw54caxt8l0dnfjfr5ubu3lbtra0lcugi191akneijp',
                component: 'w6jvchsavzbij3cai74mgq79179u6ruyjk9f6zgl4k4onii3jkj2966mac4okg4pbhw8e1avu6j15szi9qpgwid23letuuqz7otzoltykby5uxyeeukc5mtwn7i2zknk8sesyazt5spq7p7huwh5l8yqlj3de2lh',
                interfaceName: 'j4gq41lhevhdnl8swhank2lck8v7jdsbwqsjx5o8lt1neevxu90b307e1lbj4s4x06rhg2fo3vc9swml3biqnapdnymz6t6578mg6mxaovxmyn7d7zm6onoethrl2lq3vho9xnhojoij5r4zef2bpr6xh07vs7la',
                interfaceNamespace: 'qi65cdfi5cd7aucgshwscsevxefvqx8l5t8hl474v2o4d214sroi1q724x1dfqt4vnyhp04gtlfbyze9neaexsxkj01hnasz71qb3hkyqu668xrujmtbzt3r1lhwjc1dx5zkgi2gkjrfmfu9psd9lg1tkfc80jsd',
                iflowName: 'n0w01n9ckqzg07ql3thgo6xea07bn9kx7013xdjwavz4e1vea0447ec5hymq9s25x2ztsov6tqr0qwolhokx7jbr3e09urjodecfewtfd79ijt4kis0bxdl1p1630p92cea2eozt2nfuaxmcjrifkegwi2tey1sp',
                responsibleUserAccount: 'p3tzlvhdzowfdkqisyf7',
                lastChangeUserAccount: '0vwf66rngt2jr2vblsd1',
                lastChangedAt: '2020-08-05 03:39:21',
                folderPath: 'b5icw8ds19ab22n6kiefyz4q0sqm0errhrb0lfcg0v9xljgge5pvszvqwaew47nup7fz28wdtc41sbbgg5li9z3g6p2f73ml4o75srtnws8nkpi6mkyu10r5vl3jv9f5dj5hhz9tf623mxpr4h7cq03kr1furiv84vg1gbcqexntbbs0o1s679n7l7fpbzjs7of1ti8gdmwg51tys3i8tmhz6s8z2wtnt8a8r5pyfoqgpoc0v8xf2wazqvubxht',
                description: '9mzmjznlah5w9xx5ud4pw12vyqpfnthn9e3h9dzfmwl0w8b5pgy07a4baoz1u2q271z2zomzhwbe1xipea9umq6claxiickksl39trrauehqa0q6tnb79vg130nkgg5qpiq6une96x55kb348gjdu1nqplwjopvdq6fq5lyzvbm4kkz2q0h9ldsry1h1340l1scwm6bmeki2vmymkvplcj8hx3cqdq9wyavku8sdc1e1jhnmtsf8bm3ofm81lqf',
                application: '1id2gmplg5kvn9g2ryjxmqpqgu5kr91l9jfg5ubp05tgiyqu8pcfzbo1y7kb',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'de0f6cd8-466d-4003-9d01-84c94bbf9f40'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/4e4d09b3-00e3-4d1e-994c-b15e54659209')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/de0f6cd8-466d-4003-9d01-84c94bbf9f40')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    test(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0113b7ad-b34c-4cb4-beaa-737c9aa0f053',
                        hash: 'es2n7oc7qok83f2cx9wemmnirctucvhcqs4bt7js',
                        tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                        tenantCode: 'x40wx46798ufehrxzylyur63jv390pypms86szup9ei1xa2j6o',
                        systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                        systemName: 'bf2kn5p5ef3roobj4zaf',
                        version: 'x7r6f5qm8mmxtnhvnzr8',
                        scenario: 'c63iccw0yd9qmfhqyri0m2b8oov4q55hc2gurmw15281sisv79waevi3aump',
                        party: '4x3nzpvg10flye4jeyzjw4639u33f8uvsacp4ymvdump00180ynk1pzu0xxm9t02dmp2rb3ld0k1wz9j86gryr1p7dsu86sqv2kdnk5v0ow0ddcy7cn8ucpo80dikqw4jai176rb9724we07sxy5zezchmbb2ois',
                        component: 'uzkps3ojqjcik9qfmdbwpgq8iedfj62lkhzm5xtniff76p6ijipnoxtwq8iw817lbpl31wrezseujbllhlkaywv1sb6jhix0xvjcuww3fjpx9ebs2pkwhjq8gjqphdusvlz7veqotnc39ftlv02ugjta6yttbupc',
                        interfaceName: '4ldrs5oxbciv2omitj80m3ntz1u2eb1sgjib7rw5sq5jn97pa4mz7j4o9hzm7u5a81muhpx3c9jp94up035qsvnza7nxfc55f80eol6r9zve84jey4mrr1cqe62p6dj6kekub7o7uf33b47quv293li50amh2b26',
                        interfaceNamespace: 'g22hir4tlbgs7qqs0gmdk0ipq1qhxjoqemqz29wx31jgpdff063hffec01qsv7nzry4uc5x6yeel1ua0h3trfi6qiq5a8g96pk2knd5qwgsd4a8rpwxj6moijjanj2iaxfizknmu0taw42xbaacxnp5lau2fd3pt',
                        iflowName: 'lp9rxj6wwwkhi05fwbqp89ee2nyuo51ag5fyd43h8zpjxdhr96mdbaytqddp6f5zw28n9jq0wtqjbkv92mtk1s2pvx11ea56yh6ft1uhupcro0j5om0hu7lebm055gjo1fb44ph55i97mfuyu9e8ts9jelrqfque',
                        responsibleUserAccount: 'awp7beayou2atmt8bdgs',
                        lastChangeUserAccount: 'a2uktu6cxs12hi2yi3ti',
                        lastChangedAt: '2020-08-05 07:06:00',
                        folderPath: 'qawf6jf5gnrje2kl2frpqvk71386dxb1t463a2bvqqixnmp9b2doe4n2ze18ov95hnjk62s7ylfoduvsg63fv3nd1pj106gpm1re5rli5uh8c8pxouaki31jlugeorksr6ts0jliwg9jq2f095ycani9ed54get63exrmobmph3wgbjuw48pjz2bzswwfpjlkumictmc9wiuzbb8bcjayeo81oljebcbo9dolu55ue9y1zhj08jmwegrif320ih',
                        description: '2ktde3qmrlf6gxgy4cyvibfjfe30z5kmxfrwqi6kz2farm5jl7vafjnykqzm8drv1g0886thffh916bq5upre283wc0fz28b5mxbhjfj23doowm78gv0ahzewpa8o5c6suf0msgt54rmvaviqy8n47mardtw44oeia9d5zowkaz85ve1vcft1wv6ismc3z9it8d8he7kmoh9ivnkg7ixjmxn950z92kevub72iwwkg2y7vlgxcumk0ftkzp85vy',
                        application: 'ifitfsdggcnopfnwiob4hb4dnafmec2f03fujkuaihzilsrar490ridrkly1',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '0113b7ad-b34c-4cb4-beaa-737c9aa0f053');
            });
    });

    test(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : 'ae834650-3f2b-4e86-a0e1-f3fb4a3d05e0'
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

    test(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : 'de0f6cd8-466d-4003-9d01-84c94bbf9f40'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('de0f6cd8-466d-4003-9d01-84c94bbf9f40');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '12c2a504-35d7-4fb2-b64d-84c2b4bcb3d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('de0f6cd8-466d-4003-9d01-84c94bbf9f40');
            });
    });

    test(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e8a828bd-ef8a-489d-a14f-7e6e94fa3e78',
                        hash: 'zt3zhpetukcm30ed5ickvn8ed7jgind0qjet72qn',
                        tenantId: '6fb569bb-2a32-430a-a6da-79280f268094',
                        tenantCode: 'y6yc5m2g4epnxlu8p0kekwsvbst15mmavxxrvqusvseagfeau1',
                        systemId: '3ee07ed8-47a4-43f6-9cb9-8d4a86ba6650',
                        systemName: 'meem7b8jbh329ztkxul4',
                        version: 'q1e79c1yfq77hix3wmp1',
                        scenario: 'm2csi3dlhfge0tdh5a5unjee2hzt1d36jo9ry0fjb9psrjfedrzkof6uw8rm',
                        party: 'dwj61tv0y4z2iedcaxn7z6fif47wuc4fgitifta5sw1dc8ubectjcn3mc8wwlqlfvqwr4306j90fqhxjc2em1paigkel1c02dpc25xdjz6pe4imhaduwjzwzuyp413abot22jwgv8cs94ttg6du5dgnwbcxaaxle',
                        component: 'ktswgwsztkenq34otetnsalxst2lq6cviq6kbf5d9wtiismzwo6w78knce9t05njdoo4kwkrihdtxihrils4zv79ewvt5ozpxpcc5ddudraorbqzwc86ni2oucmw58lup14uiyst108x9wi3j8z81ydybkp479o0',
                        interfaceName: '4ioriy6q4r82b2zqhlo908fr4w9r1lndn7flulb1zaag4884fgybrww4itfymx9kvvuhxizlgkia9jzf3ytqf81odvu3k8kzerlmcchogz1oz0bx2mzscxdkb8jdvfip42dnw77bew3a8ay3p13lhtsutk8opo9h',
                        interfaceNamespace: '7is10okhhd5ie3479erlsd6dyoajfq2fi9vesbe9q9y96ghpk0m1sbbo62yygmi5uk0in3sge0wy5vt0cw6awno469s6u1esz2sjeu19y2ns1p5u5hoi8ugszbkzil4cdkpsrfktuykp4rcw7wnarb202g3qr3lh',
                        iflowName: '0vgulikso1jpyhf1ikm3hfrngjpi37nq95qwwlq5236n0x4e4ocd9gq9y1ee3xm6ektvmz9zbodxbj75knsrgnf8vycr3smrmr3y3j6b113k59slccxvpom5t52bbqfzyebie3uqapbm4rfdmp0x4e2hfkoinbys',
                        responsibleUserAccount: 'cl2dw3mgzt6aqdagv3wx',
                        lastChangeUserAccount: 'ts9dj15g1dgcxltwo1t7',
                        lastChangedAt: '2020-08-04 09:44:02',
                        folderPath: '3a568mf31pwtacex09gnd56jiy5a4th1heuv3i4cd4vrq6tntg5wk193qlku0t1sle2htyqqpun3c0faqgay0h4rs0k2b8a4wsa7ezsvtgffi5gwfm3ztk3wqggq53htlqpxa7pad0kg5vjvi7w5m7b8doy9igu95lq6j2vhys50g5m0dvqsg4cr1ibuji8exnt4v8q6jzhzjo4dgu90kqe5tgi6cq8aaikcx0fx9sces8va6bftcp5i2naxatb',
                        description: '3fz7e0soeujnxaz8bh5jnrwqdu4a02lltork7ptjzmbl97en0iemwrvbulh4flwjlksvwxey6wrdoj43sqxrquxr9ja6kpddjqirb69wg0896tq7e5evwfcp627eeiiihbz36op3tcp0yxewkaksaamc4j4jxenoc9tu3xdlm25qf8uigrvs98oob3ewygunj8xz06jo7vs37ike8ed8dgvpf1l048imy1phvklrurupppnputbjkjrl4m7fr0u',
                        application: '171och8m5sud9mqsn2v5wdko1eopxjwla8iuvwkvgtvq8l8oksff2vwklgjf',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '919fa8ce-d9f0-4735-9546-842f174d352d',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40',
                        hash: 'usy2wdttxzviczj1jk95ope0qg79jz5yxlxy2p8d',
                        tenantId: '425ddd40-ebca-4a69-a093-3a3f40233b07',
                        tenantCode: 'lcyz60yayuctge23s9f7eqsu0bwlhbezybhsgtmjcnnmxt3520',
                        systemId: 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84',
                        systemName: '9g8zu97x01kevgs17euy',
                        version: 'styz8x6jo6z233es85bi',
                        scenario: 'jmgd6gbgv091i59hl3fq53f8o1q09b0m5vqagu5msyp9oi4issjyrlsxcyjz',
                        party: '85417o7gn2mj5v0ye6nj06q6lms85ov1tho5foyr6nqw23ezrmv1253lki413p0pj6ccc8kpw0fdx2wil6kmd4h62x2rbc7djzrqgzrh1jum1h6l459ya5c3w8zdzbln1u9cai6ld3paz4f77017pa7jflgfcm72',
                        component: 'zru03pp2bu3u3t4d3r71ns58c67ukn3nh99ms7vgu0w7ozxizmifl6dpyc2raailkpq572qthtuajisy21tkfevaypei5x23hpri2nyw0wkf43lymz6sqicms6dfujuxm461ejbw222unr6di2k20djutrhbq1qy',
                        interfaceName: '7oknmgyr9yquspyixxrz9k0mfadtredqkkexyxq1tvxei9iccjzcp2a32k4qydw9jp5kbfwf5z0dwz3fcezhebhvsnin6svrszjd7sg16n3gpe2dpx1es4nmnuv7orwkkwgk6vol9aleon7msvvzoasssr5b34hk',
                        interfaceNamespace: 'oi1zry1ihznvc4g206vkwrtez66da8u4m43uhdg123rka2h3pqt16ev65jce1uxyexe7dslm0dhc1opiulpxdi8bw526ufypd4bvlc9fdjgarscsrnf8pin5njea7tlfwt7ybkoxodlf4nd9z7i6msldp6gwmfb8',
                        iflowName: 'uitniwsrjoaz06y0xd8a7rf571unznbyskd322afmoe8ve55v8vo16bzua523nk1mja4j4yzrxq1upgtm1d94rxwi6dr1vmb684dc7ncb5mhqh9wfmypunutndfutrueaqhmy23xcxgbbjuc9m5xgt4dt5vnfuqe',
                        responsibleUserAccount: 'sf6twu84lh2gfwkvjjpm',
                        lastChangeUserAccount: '5824x4n2s3gspd4bg8wm',
                        lastChangedAt: '2020-08-04 11:02:22',
                        folderPath: 's6t0wowfzipy5c5xov2godi2wjz4b4yfgzed1y77fmzqq817iu67zmglu6r5kqjoxwly5h97vd4jic7wn3afg5v4ghx2f92q0f3rzv1bbaefjblikep1tvb8s23pvwutw1kuu52splk45l289g9b5gipcktscp7pnnb3hlt9hzq3su30vmdn0dbqhmr9ev7wdsqi95445u2bfwp7jxyl0q6d8qaxanwmm6rh4g0wbth2xqvlrt85al3m39r2jd5',
                        description: 'g0fxsh2nehp86bam9afld63zgh3pixveq8wt2fkwgxill2abkyayaz16mnnwt7imtywf0bpfkvbfc2l1gkoei0ogod5imv56a3895dtnnx34mzy4nsr2icimrqx9p18mu4l3tp00626q1nlod46r581jz6ca0wpaqdevevczn8n6hgi0hz48v8kraxsf1cmaf94l8aatif3y6x98bu29pizh62vvr6jlesgdkyacrsun7ve75z6gpnlkenxxat7',
                        application: 'v0qvxj5cl6ekmql8v0af9xtfpi7x5yqrpsek9oba7sqjcy36u4qv483o59qt',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '41263fed-cc67-4ac0-a672-06fbd28045ed',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('de0f6cd8-466d-4003-9d01-84c94bbf9f40');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5ed008cb-b38a-4745-a6c5-0446db82b886'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'de0f6cd8-466d-4003-9d01-84c94bbf9f40'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('de0f6cd8-466d-4003-9d01-84c94bbf9f40');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});