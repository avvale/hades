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
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'pu3mnjzg0a2a6cxadfqpnwhli1jlycziyf1r2e54mlx9yij8nf',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'qj0sak75rkioidczezh1',
                channelHash: 'j37h8p5hkypaprr7xdlv89m1exqv7j54ei7jiuwf',
                channelParty: 'qjkiurcigvrmc0x7aanxoigvk60kp2jtc27wjef74u6v474f9y5ldd8w3jk0n2d141a8bpg5645z8q0mjc4qt6zcpet231jumgexnu924nq1j9um59jtl9upxj2laeogm34pw4otu180gxx1ghfzvvpw2k3sufq3',
                channelComponent: '47ned36alpo3kd8euub05jr7v0a1w220e59qsugbsagw0n33piczldi60zbcvjwygnka7h0voltmes96ky0kd5q49dacygx869qe0ze6lbemc0qy58ngfbnz1o12n6xqt2zsnvm2o5stkwnczj29nmlc7n63upe7',
                channelName: 'h1n4vgogq0e2e4n5gqrj1fewdqa9vk1pfecp8vbbfmbnmg3227atus5vk0y8de93ta0ngn0e27j3wa3dgnv0zhjhxcahvcb9hjnnp3efxj5etzca9xf812livft3m0pcwwujjljt6lqttxbik7c8bvpoxdome6fv',
                flowHash: 'ocqoy273dv1pi8207dky6jt0xjdm6is0dizryksf',
                flowParty: '2zrvwo8k8hwt0z2afv4zu75n7jba6qkoekv07ak0lakcwnn3019jhjcytx3ai1v3jvfgw3vhm4a6jcggzcqevrivj85cj9rqijudcj4ubc7v7f1r3yfvh34ped0o2p3jbub9am4tqv2a77l2f3muxtlvubt56aad',
                flowComponent: 'kfuochebpgetaezo3wqkrx7ida92ch9zb8coihv1prfpwrn1opp158rmmetjqm5tmfk4n14nmd4zu02fal949wbxkmmsj8dgx8cuh9m86chavajj56924rr1399x99llqq6yo4m5cssy8pwpy3dklsc0cadtid5i',
                flowInterfaceName: '0f87fpaakhn8xdn61xupsdsjfwymdvpe5ammjt3jylz0cuzy2hr851jynehkgt3mia6us1lxepqbgqn7cvrcckraqe5etgbc49csqajm5xtzuobt20pmll7jkgdhfrithyqg5sv2i3z494bzt9wnplkqspkin3wb',
                flowInterfaceNamespace: 'qmndso60y7r24qyzzqguhrdd6z1qzm36qk8loo9sdlss8uzl2rwhpvuo63m09wuff6pl8z7v0zcj357z09c5vkkkf7n2xd5nq6lz68qujffo15jwak0giw6sdt60m22o5t2ywxlxu67m5oc7d4aujt1k63fp7ph0',
                version: 'ip91pwtk48vrq93v0gpn',
                parameterGroup: 'quxb2cgzk1wwu254tqvq9s9o4h4ewf4bpdcndglg9b4cha9bmswf31sm5hnef4n6znuvonneeq1v2kfy1ha98kz2aj0mfh53zbxg96a23lki7c76dbvxoye64h584dl2tmbe3nv2rqxx9diw63bkv8uzik3bno0oj8cly551cdw042pjn9b8y5gqur792c7uum4quw2j8ly8f74nz3mlvbv6ptk1zzvy6gt8q4ihglth4xwa8hljowp3sb0emfj',
                name: 'xyrx8zs15are49s6302k95abj4rqozz6x3p63uqfshvk14ovkvepng2h9wam75k7bscc0ej9215byqxwbov8i6i8ysih3zmzg90ssqvxez8kp79odjfo52c462mrwtk8vqrtxrwoh4wzosc47q09t32mk90jkylnnm28w6725ut5yf1c2jm1kmts3jh6jw9a9x15y9le1dovzyanjb5ilspea10jp8kj6x23k067g2cjlejt5mjnlook66m2ipc3p5csdnqch92c9bxubmflxedcpbqaes0cjyu358nptxo2bli888qku1i1i2qky0r0',
                parameterName: 'aieg8bxl4zd3zxudn317hcm0tpnmwoafersl9ewzfsmadupo9uwghwddx656d0xueay99vsbjwwadow0ppatrq1lyaygwcaylmptplllu2t70k3a2jqsj3rnj2qgf667t4q72414bpytoocx83lxyw06y61czh02o0cptd5ozsrk2k00c2cg0f43nqr03j77yz0c5x0od4zyqsmzhr8e74a24z3miylgiwoty1f846d25lrw1fv2gz5won56wmkcrhqasb8loy613kcc0zgn5gxwqyla55hps7pux8uosyq58f8jpvu4uiws2yv55j23',
                parameterValue: 'd9w34k9tzhb4ya0fp7ggok06ogpvr5qkv5pbeej2i2ip9ytn3m6jf4ne7z0v87p56keyww6rd4b958gwuy5grzk3uzyarrr8vz1lentw83yzx78xah12hcx3vbda3r5xqncvgr3lra730dng4ik24kt3uolhxyi4g7k0jjjs2tnpkelevbdrhh11yiepuwe5p9qi98x9sdvxktyrl83zlzz68wnl2vfnxcgmwyuhnag4lqz11ovss8so21rqnq1ply81wk1iyoj2noiw22fkuwupqlrlubzt9b5r0sbmf16h180ose6m6bw1l112id5yr9o5sgtxj9jxheitolss9zg317tlr2k98wwpz3cz9rob9orquefdrdj4a6dpqvjuntwxp0l48zw3ehclm4qa3tkdjlmw77tn8br89r3yogg9eingw6u89h87tm9k0o6khewpaelh8vs4f3xrruvlecx6jd9cocwqv306ucvgoruujdsp0z84cr8g7py6tpdcwr8nmjgvn4zzspn764jgr1of4gkxbdx3pg027z082ytuhnx7n3g45osofjlp3wchk0eyjvnhvrqoampvmxk126h2cj7ine5vt4yp2wdbue10qrllqgtdsuzbyvleyyr0smszinmugzfk0js016wo3ubq1mvb9k4s1bbewghexseiehbvryya85u81s225fpdt5sodwkehckdp8j034rzav515jw4i1r60p1z0ewkgnkxtt3ksqabxzshu5bm9lpbgtv6rumwcutk4xiunjdi83v3iy1p0t6woosrlb04im2r7cwrgyygiq149piw5yuiuxa554kezlbauve3qkxdmwf4oqbf8nrbt9q09i1tbba566eteq8cfsjwq4lglx0dm4jk74yuf3eo1bzccn67v0zqu862d1awls904e2oo8vfsf66tshl8ii82618620n8aiutedn23d0ud41hw0nvbyjdzs5tn8pkr1vxd4j1xahe6sm7y9kj226qenx5fer',
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
                
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'pksxejf1tzlvauwzrwag9fucyzrfv0cs4zn0uq0g5oqmt7x6ei',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'sw1a6lfj79ml2145dkze',
                channelHash: '24gt34thl2oxzs57watgqmejihz4o9kls6b6mecm',
                channelParty: 'lguymz0b680cryy1x8h44r3q5oxol58ka0q77rtbk7ldyt4r9zor2lcgoct3jyc5ysa5c1imn7ntsv6045w5jx09yg0rocbixky7r4d73bi5s6ltv0dlk9phjpjbog2valnuhqk6ftfuzh6zn21luj49fzkbrpem',
                channelComponent: '5wmvu8q1umrik2vum097ejpfign3ywhv11b1xnuurcw1i6q3a3oewluvntxa690txmhudhnddrzfdmztjwndt0u3wl3hnxsdguoj6srw46yix3xyyg1mr1y5q2siv1mnrl8amgwf0ddz0aizh2zg5gye2eyac2fx',
                channelName: 's11zgy7msioy949c1vqkhgfu98ijqh558ny6mj8h5wzjsrvetjd95o5prj761403k7x6q73f4ih7uxw24cbbf5gx2j6dngp6dpeu6jks2ewyhazvhkdq9rex1n8hw66nbb0qduxnrt94sdv64utghhlyheaxv1fs',
                flowHash: '41ycc62joiag51tveg6gxrgw17tjh5z7kkkszt72',
                flowParty: '0093gn9xmk0ma0za09r0e8lfk5g0trwu89hnwnjjuyjtq3f52eqdgmwkbb4y4smg4rq9vhzl0jizvuc2rqt7n97ae38znuaegoqei9sgh4njdlz8wj68tx7bopv21so74m8ox8crm8spqhnn2gqcuy55mi0hhaom',
                flowComponent: '456cw7o0fz251w7enpf9z3lz55fmd6azuqy9htimelk7bww7lh739k7glyn581myuz8g75fhg0u88kd1w13ukwhyt0qwof2jauignir26qswz6p4o72bbvlfz9rrhoawqvkwx2ir0bg2pli0yxr34xx830cmpjm5',
                flowInterfaceName: 'kb688sytpimq699i7sgn1ux2334elyea6j9awobpblwjsun9ciu4rame7ze6ru8dcbc4vlgn6englq191qf9rrs3n9q0fbok4dh44389pzp2dvkl1kzk99lbzkbo37eaio4qqxbj1ud8y7igjid2zwjb26lt99a7',
                flowInterfaceNamespace: 'njxmbv13aivuc2ahkivz2grt2ds5r3u557tw8icxrhc2ofm8uobd3bhhpoqz5gterlzzd4inc2zhrw2xx956n77nttydrc9hf8mqvxv0y4bn96ojjrgspd1y4fihkc5k4pvrsc48nc7peo8s3voxsfe5rkrd52ax',
                version: 'sn2iecy7j1quf3kuw3sk',
                parameterGroup: 'w5o3m787qpopth9vnwhernheu5kpqqaao0tf7gmgwv4q00p0q3zyxm1wmu93o6bjmzhuszcftv6dzguv7z5gun1swgrnfoellfuvepmvmh7fwo15g9bc9bhsxac0acmiarbbmi8ijir4wz6oba0zfiho2c0gtvjmsbxj9tydvi3w32azfp7szug7ttvzutfv1pr0wovh2usjxueejjtdpwumqrno3ukf35eq1lqsq3dgle7087x8zdru5l041qn',
                name: 'ehs0k86146tk5c1zkdzrkkmrllhs3oppzne6t7dljai7ce0a7fb42o2g3vqvcjdgdy1oivzaavwwrdldaetovjqvdtztu9zcm1fci4t8n99w3zgmd2pd8uxp5m5qne7knelbo0iaxsktbkmd9kftxxzm7qnt79ide5moy3ygus1me2k0pvkm2p7n2aqo3kp09ldwrblsk9xcam4wp1kailgd8joq04f6cgp7qi4aic3ulxipw4iiskoo9efovuxknbrq1x7qofqscpmhvry22iloob0xsq36tt0sivh5oogf1ve8lqfteipk143h9ufc',
                parameterName: 'ckn73i6vikxthj40xqeg6lyoof7gnn7z56mcmrhyn4ap1xhi1o14zizmvsk2hkit213qxo1zr8416fvd0d76fpdy9e9wa64amzaj4s432prn31494e3mx1ll9kfj83i8x2rztvblowqjp6ta95ixutub3g4u7yma12xd6b9v1iojehfsnd3n3fh92guznlvst1ww0occ675j7bl5cdq8h3x41ure4ddvnvtg436afdoyfdbxxdo7b9u4oo2fboy4w8sx7blw0d4hi8ql6dxipj2n0kews29s0bx7ffu5e9a110u5hcuny2md1oqokhod',
                parameterValue: 'ay27zvhm2dg6uqev1cwzbwqj6lbffyb5h9n1rk0avjtfdfj7mjrfnlg3sd8i0opmr49ppe34fwjj2xv2ywtpqg8qew7nggm1ei3fctvpxfh5nwz9pqk0bu4tq2qsws9o6duh7g1gd0okgq043oeqqznkh7o3sru6kpk5kgy3c1gh02b1yz8qaoyw6kivtnwotqh0co4sshajr7qdc94whnumt4cm4uuf7lx7nikkyg8yoxehomqgmk8wm0cqh38q3f7zjxljdjfakowohmwmv0eznbfjtjncbwpaojv4ld02u6cj4r4di1mnl87ifrh2x86lag9hj9qtax54lbjzl711twl816aduocub3sq086ng5j1oms6jx3lyd5d4m2uoyd560uypowhsrgt2uwa2rni1ezz1b0mt2legaantn62wdg30e0idygx3p1mgfl4yxwmvxey5pa6or0xaknvblmtbvgpekfrrr7yk83umylskfthzqqbhvnjbrvfzfbgd83g4krg2xi257un1twmyfxox3ockf1wp6nfu83d6x42uufobsxhhza769u7hfd8ed3kywewdtl6ihy8elazq0x9xuxfmae6mx9bhhvku91yat9rqg42k3xsqodsdms2g2819xp4b06bkhgeir1il8oxkpdjicx87n22g10pr48i7x5jbe0qdbc8bsakbkqapc36x45x4raasqzpfpfaom46yxghgdk874a7whuyd09kgl3gzybxhm1qu59x4izrvbpbrn4vm5wkufgen25c22ycveqlva153oob61lniety232gzdwyz9se8zrww8qs862nzyg1r36eq3odtur5v17h3it8dj8j0esg5fowjcxoqpmd26v7qnbk8lmd8e8x85h109mew2vauob76dkyujn7b4tv8ujeqg1x33cr3kndknekyn0abp3iputkq8csb0ny1ayu65x73zqcuxrfwr84bx96mzivyymxca6y5ejj98gp2qir9gc9gy6v0f1f',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: null,
                tenantCode: 'ush1tnh4ht5mdat0ktcvrhmurqwnr40akkaxl79baqllntz1wl',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '1udm8ungn1v7v95ggt47',
                channelHash: 'qtzban00vqrt3qr18xagkuh363ppzhxyb9e4h9ij',
                channelParty: '4wj8rpjdz6kib8m8dp6kmba27qlzpomogcwok53uhsh88fqo8dp4bqvm371od5ep3boirrfv7sedkpg6ipgfwpp8fqjven0379e0vl72rzpwn1nbt9ar5hl14ggp6zujhwh2nmw44bk9xxwi047gxiuwh07vqmar',
                channelComponent: 'xgrm0wquqwdjnt5cxig4quw314xkja93gorm8e79j5cj6kp89x6cq75o802l59wwtitlaekpdux7t4r0tdsw5l8q42vkxz3ab0jk98xv9is2onv3t9x1fowih9sarjm2kj9iduxb621auqs431nqmsespprkxx5x',
                channelName: '8az38sn8zwpvr40ydd1s2bufptlymiyzkxzuqpnueiu8bzwufic51q97e9rs6o48x64njycjz0gponkf9zwtmq941v4i5w676ea92dkevmi2m9ekkm2dzbqk3wiantlwry9u8thj5rtzlf8cdjr3l146c0cdkg19',
                flowHash: 'ag3gdm16z82pz0bxhwttfqev2ojqd4vnfknav1o5',
                flowParty: 'pvwh2okiunb95z1wzpsyt9qlzcrh1u9y8b9mfsl89cmos1r2t1e591kaqin2grdtsl20ofo5omwtx6442xg2isf69zhghsttmeke4t1ksab8eln60ufehm9rmol1iyx07uxg80etwdl512j3tb8h08jbzeqhgdeo',
                flowComponent: '0xkmj7c77glp9sicfq7w88je51pd9suje0joauye9i9diyan916du60poph7upd2z4bn11g81yqdolr269eet3jf6xr0m6twvtck7kidkb3kaels5sqndzidmxxrpbsdxswv5ihepommzlbbohhot46r6pwq1ygb',
                flowInterfaceName: '5xi64kwbfg24tbv7ajfrq3kaby0ooj2jgg4zscrzx8lhvx1vzvylktt9so2d5grei7k02ivnrtrjjml70svtnyp4dfih9ugiae0ojzce7bm6fkpsowawt5bix71is06aqxmlh2ozgazcobkfkez6jvh9ybb28zjo',
                flowInterfaceNamespace: 'mfu71ak9iq3lm5y4r4i9as397woiy7rxf9x0v5knsrktw91vha0p7kbh5nmkh59eh7x6zgdmgxm2x3kl7vdhna69swroebujqnhggd7nsqk6j3945qxm0dthl5badoakg84zli4j1tqh3xk31jvyi578ne6ht8kg',
                version: 'gvny08idd8ietfxphozg',
                parameterGroup: 'q484ypbx9kb3kuw3ribmiecetg4s2dum5espr0s1kzu82llrkqfhc1yh5daflmlwer0me9oa943uwt3occncraxzefpyluwtcgwkraeb16km1h4mkbgrn3q8b8qzs9epegqmveyoad242vd79xzdxlexu72y6berynl6yg7v50zw2whi705brk0px5vtm71np95zgkoeikj29fbusbwxhovtghubzyg8lbbpb7t9liwhrros0of0nva7mcbt00b',
                name: 'dz05pczi9gd1um1px0y5egvivwr88n0yf686ihvgs0o4dgiechscuccu94do5q22b5x7sdhx0v4yc5u70azo5343iks3rbs72g3om2s3gkfjmqxj62m5615nfkro6050oev3e0adhsfv2lrb7wzme3d9a3gfjyzbt8pmpo8lyhzp8uc60nvt0iyha3n9v7sqf8b9vk5uvfvkzlywpbinlws3961ke4516j7f9j9ov58gjp6yodzwjlo2xb71cmg14k8bjnk2ksmo3qypqnwuhobem0ktn1tls14oagk57dvvvk2gop0z1yt8i1y0lez7',
                parameterName: '11yggkx8tj1l036dvuv2pqgzbqc22ehddbpwu62mffx2o7nvv4sib5w6iak9hiaep8x3ivhoyhg4vpyzzp39uafnwx2sfw2q935a8duxq6eydfwz99rl6bexy2iaw2lu5u3s85wwaazgfehlrmfz59ac7esf5r03ro10jaon9m77eymv8z8jmtwabfdv87kguz0eoh3cvelopt8ygxuhb3viqgy31pkfayhimhl7zlc9z4x31poki76r9nwjv386mjgyiaz4gd9uqvdlc3zhm36b0mq56mhnel05bdnhhm8v0oarrqopyualqtk38id0',
                parameterValue: 'draq5ci4zge4nkj6se4bfi0humm3ox39lkj3136ala2e50shkl2f1zgrdv1sk4dhj9vlg3vd9fizxoreuhqwktn9y2hktxohuvmgmn2lkyc5o0oggcoxhow8xfnaux8kcr4i47fgeqjry6nzuhcg56r9cx3ye3omb58fb8bwl54ztfqzozktvk40t1yqxseb73c26fk78b67a0r47g9koawsfz9x1sq0p87k2hgvidwyu60n0aj4dw9bs8d5207xd0dvvwvz3k1kfb5krqwdsyu2u4zy1a4ey0l7vce7hmhbr3gour2q763yy3vb3fbtp25kg8i84v2kwb7dso96c8zlc0hr05sx6r0p9rzdswkp7i6jssww9p31srm8jwn3h1c9qkoaxwvilhnxei0uiy8atnwlgrylnqxumsn90cwk0maznj0v9t0kvdnmtr05kcm78virvnb0bkszxjodomiq1esjfrmgzlr73p9lmb6wghtdxz8dik2apwn9df5i1adihjhz8eqh24ix9eq6buml6zf4xqy4jk70aglp6vustb367bh51yhrxkn1phnjek1019nj7hl2yuyngs7ozgdw2m1ur7jy4dkreij53bivm51m5ybycs8sks526j0k79r23g4zqyrbyu0kds5ab2j68shaths3q85ql3zmc6fzd0nty1g1xd9bztcuy36bdm6d2kv663cc52ld47taiu0j5nzioxi8pw9w6j2avpf0r1c6ra69soau3754j8jffrvw21ziaelc1klck57rilo4rk9tz3k7ukpxi9r1cp0bghd86pjd9ols5ewys0w3tx46tyyvsk9dctkiuggzdionq5jl82iyb5wd2hktwpkcba455oqznay6xwognrkya2w7g7xht4stglz7drzog9coz4glksns1xhnhvmma8adtd6ru2hcc3041l2qt0qb89kn2h8odkgj1z0crah4vawejwauagma8jdo3hmbk42vga9uwo1hnbajshc2gq01',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                
                tenantCode: 'vzp32lum5nu9df0dda3l56gg2umeo0foadb6jfi2pl1o0uyin2',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'wff1j4jz8x17ixiapzaq',
                channelHash: '6vzlaz30e7zci27ho730598swxnq20ho08oqof5d',
                channelParty: 'hlduuhabvw9j0zlo1e2hxfak0d6pl6al8fabpyo43veddlxiupkx6unfcyqfzg532be0wk729qy0tak8q8rxlhhew4shnlxk7k3vryaq0cyjk889dns5oda5t2v32zpp18jj3je2wy5ibfx0mldxt8uzh652dxdm',
                channelComponent: 'pea4dsqnyoyr569aswkp40kciqane6eoyohp394guf8tsncdczildf1iiq7hoteipw19qo7fws2ghja7a2lg55x6iqhavy55i6cgdnpvz7qkoh8c2sacnh75rh8eyu38vrnl7fqlkmqsnok05cawreupblqhmxlh',
                channelName: 'uwwqqvw7eh3ehw44683yyfzub5gfxmp1xjvp1hwtvqgybor3eig0g6n3cv20sqb2vafz2c3nuvc0xutsjbzq31465622ovs0y7gxdhzhvgraig96b2noh3j9vb9snb5bldqfaih1epm60g4np29q0qhhj822d6ih',
                flowHash: 'n3g2c0hlth1ic6214gm91vcnoq9jqsf84i7ktroj',
                flowParty: 'la3kfjrbekliftdsoza1y6dxi1gldhaztxfo0ver33c997ht24yymmgzypvnwfcjtu2l86agsc89mi8717hm0m7gvdx6hvjvaa6cwk4vondf3heqksx56ieusc4j5rqfdjrsddwkfh068fquh5txapfl0b9felai',
                flowComponent: 'vfnwbujitos4kreexkti5lkn088k1bowv0ekmq6mrrbbt6svph74m3qkdvn14h0b9s99uhovz0854zhg6ua0ac79gvm3e632f3fpia10emdw1x4wcf6yrleazpvrpud7k7yy0t5sbumqmoh2ke3gp4xe6lokg4th',
                flowInterfaceName: 'wv4p53usvvd6g8xrqhorzt1ov01mtjkbkvbjblbtmkgnmljnbxd18h3xdsvms086tm8xti8baupxgzutkg4edqzosdultqpn7iwjy4mtcwmuk7byrrzp9oakdcm39zo6rqcki8m6aaqbeajeazkv22sbpuljw40o',
                flowInterfaceNamespace: '7qyzgij527m5r02gvnpdevsrcurcfb8x2cwghzw9pa3kmszr4klzknv57g8ov0dhzp0yba2hqyuo8bix4kb5c1q37fxph25fybhuzkf9xb2vlmbpqn54q3dbeq8srxffcpn9d49a1aw1vsvj8vqykcetnoo6ig9n',
                version: '0xp4vleytskb5pzg3dmv',
                parameterGroup: '4ls44dngc4eeo27kzvxjdy4z3s02fuae4nixzg242e6v2u75lqs0ipfdedrwacn5scznt8vug3t32xd2r3pbe5rs21qtnu6chkv629v6ewse6ho2jkpo9uyg03xt42ktqt7dx39v7y8v77w9rcml0tht57tcq1ctmbdsiecxge1xxbgtao1i0zf87r9rlvl4vvae3qpfuoyd2rbc7d6lrnuel19tqluxulvpucw029748bqdg71jv2s6gtlsn9c',
                name: '665a0fqbzptaajbajqz07ly5b9pi480rvl6qe7wrok3nxh38x1w6k5ac8g7jhw8zdk39uy2shzn8dt0rmbx55l4h9h43g5mt2q764mg4twe4wzcwjqvouk4ek4dboq3wkaya79w2lb893bp6tvkovb65cukgp44pctuub8raei5ycaduury340a44a29otmmt5dnj0380aj6hegvkypn2ieatwepnyifdyvhtl4hem16y4i12340w40v26upb967jzx6zmu3zqx88tc3poxwi67gzea7vf6lolyt4t87oehtywwqrvspc88brlk6s4ye',
                parameterName: 'tpnsfs355iup8fpn68mrz11soyair8px3oqtdjf6jph1fksep44aur4v8hl7l4x8m337ulnk7apags3c1sjv7j43ijz0wphrmmwwza7nd07eksoec52xdxhbu3ioqpad5q5qqcr2vu4g3nr6mme6ux9w5xc0tc3a2l6zg6u4wsaz1auvkrebseml4s2iu9vkrl1trhc7h9ctsg1117fwjc3uu232178dh1wsci2bxpd3cr66rn45xpc1ezd32qcoov7qvz2g68a727oy27jhzbv596lce4w706resninbg8oyh8q5fd4rdz8j9roldzm',
                parameterValue: 'uvppaof4mm5eu8tlgrbe8p2npcy21taxtffldnryai9falbh1iix1e097j2003y95nvwy9yibh2vrqd63354uvw77i9mrmddc3elaxzp8bdrb9ls1gnbetqhpbs6zwnynaaxvdzco91chn6lrid260p9yl0xxmwuw2dvx0ge9tz0uhdejnlfxyoej4259825jig1spx0gxfdcjvuhubxs9oewf022k7472x2ie5qfuios3wvjpn9wxiashouejll8ijpuqydy0d7qlgwmvayw8vyk5pl5e0o46gdsu7mwrykdrxunm90276y0gqx8ippw9wi9jvqldj415rqbrtyq2z1sot2464pq19jtx534gkdlywc2y1ihzhcjv1l2xwfufr2nb8igz89cikyqcta7ce2zts8c90cbi34taiqnaq3sb6h7afbp7kw1cd57j4f3bssiskzz35kjn4ffmps7240lqebb4h80p5hq0fmcqiwjpzsgldzfti5mt7urg1xizndockmc4px2uyo67uqbc2zk757xbgi3h3rgcn5azlv2q671jrvbgbnlrw4nuyhria8kjmql9tri1dfn9ajqpucxz8s2m6x734vrqxffu0fs0vh8sb665xxke5dnz3gp7ydi8h5zymes21alohlu8gp7cp1jt0brhtskzwrw0qkrn6gtc0r7ow2oevg0mwnddq8muxusy9nabfmmv0li2bqut41ulk8oosk1fcjlqp9zlss0pg21u6kldy666lju30e76yda5mf94da7v8fny5jv9ene96i1tzq2tbvepscmw7i08vq40mykwfci5otg8cnpy9ohsepnfx266h8qwy953uws20loymavucig4xhdwt92zr3lxzs09df1u0bj13ibbteusyig9medtfvn6of3ofynpv4ooyvy5rivzus9u3s1950w8zy747yr78tdno1eavwn0hvejgvvfsr9t9r86fyr5hq7z6i4q66be920eyo28qay6bz0gdqdx9x',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: null,
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '30sfqnck1dxjrl514atu',
                channelHash: 'kpu4yf2tkfs5ytoyrojyy2pxlun78bv1fb687le2',
                channelParty: 'ksru5x4xcp75g0ujkjek2i8f46asib96jhrkydup0dautzmzfa4y15ouqk48fr94t64xpco61jo0996povpwlxwokrlv9lql9lq0e3htk4fwjfh7hw71j1n301dolvan258aoor2x5qhbhcw3mkf8yx2tlmepx1o',
                channelComponent: 'wry30wc02tfp2t1tnx9e8ghv8kbauk8768wpy1bjnmsxj3cg5swzko4rbygtw9unlkaqeb99rqf31c93hdx34fxoh5hczxyqhivcj14hlm4los1biavkdlee6u53ruenb0fs2v6iyl145m68s4c0qye5dzc6bkin',
                channelName: 'qx5us16wigkrvi6ps1x40con04x9ubgdom6jzq0mnn1vw5rpg3fj82plsn6vx74zsokizkeg0ek1bcwgghqu577q4plm4e0xby0fmn55z2e5grvrsmtjke06477drpg42owsqsufdyu9hz7m0awa5qhmo6h5o1k5',
                flowHash: 'a5gqi8wn4rrmvxfdwo48wklj1f62gzp7uo41lwke',
                flowParty: 'fixzqwkb8zyektro7rwmrt1lvdspk9d6vot15uiz32tnt9vkbjlg3541lstf7798f1dhr3h7cqjkddp3xcsa9moaw2nl4zkafe80aqk73t6harppmfxjsq03yut4yawk3om9cchi7s77rv0s52hnan0x159d046j',
                flowComponent: '13grvqhbavtp06mon4djiof26jpny5htvhuu6e397iur2dhteeui2w7ddr8i268uza632boddl71k92aiz8twhyhoexw5gyz9bbw9erem95j9lktt4897zqku9hnne3f78w6xe25edo5xc78rebh1pvc2xpqm0fh',
                flowInterfaceName: 'mdgfbfg17wkb7rr0natanw98sf43yq9e1alx839l5yz2qfb4iub9vwqgu4l2qncwm379jwdxfnywny8j09kda6ou93gzf3tflom80pschaj06xd13utlfkz7yrs7fcp6kupdupby6o2gxpsxe1mscqxix39k24s5',
                flowInterfaceNamespace: 'lct0tarh6jmzm1kyljxweq86jnreqy0914b7aeqb576e4id3eu9u6e4z29ghfgar0d87s5rbowlp5wzw7rz9z2eirpdum523punnb3276wvxet3o5q263lyh93bgyauvd4kcmz2y5idf234lyvt0yhfdwc6kk851',
                version: 'ez0ynbtzs52yfajqneur',
                parameterGroup: 'jus0m2mls6twtib91aragxyqltix1e66hlsg4po7300i3a4bcpezfi15f80397vxjmu2eb8pwzifcoqcih7o82710vzb5s0rvw15wc2c8mdgf35k38joay9ibt24zv3h637kuz90t4awkb36yyxhrjtjm3n2b5hbx5sb7j0wj8ewkjozbxv3jxnxdembu36cbq3n0lt2daw8qhzyhl17v44ctx3qhbx91pv0rn3n360w625zr8h83jjto4riij4',
                name: 'ek8ol8b7ejmwlzqls76qaz2ehqey8yrezfydgtl4t1xgn7s9sw22cvn9rbycymzvw71fhtj3qre8k2ikp3cs7ealfw2rv50oj8qe8nub8c3p2ihm9q7admrcycuseng6rvutovbu0ca1hcz21sjonxb3qw1z6c56yijrm41gas3ect89e6frhw8w6pfw27rcj07vpu5fba1gzy6p0mvmb7lla4h1q54zxuqtc3bag2og3de1szy6mcaxyd0m2j0v0wtsla9dl8t84u3zm1mn0bczbeqxpenldjso6muby62m9hyicr9uigbrg3uxtua7',
                parameterName: 't4zdzivoj93an0zi7j9ojby747rizijmosritzv78bs5ut72t5clu80q4tqzw166noitlxg64myrxp70g4qcw7oxuowr484375453ryp3ngz74wh1mcqp250o4x6tz9qcewkqgngtg33iqf1jorixw4bhgonimgsy0rn56m9wgmh7dosl3mam6rb27r5h578lzhnpkd1ufea99mzqdp1vsfcdkyboh2bqt4yx5qci7stx6ocmwzpgywttp33why029j0kqtfco80bgfe9h80azw5mqaoggofykceli3uq5h00tvu3gmhtbnoed36xkgs',
                parameterValue: 'nh4xkcy18jxaxr1kbhppudv2s2fu5ko4q3p62l2rai19c0guyvxxxmk034ullaw3jcf0kncotv7xsp6nvy2fadkthtekgk5vj3qzohgg369yq0koq01imh37wj4lr925avybdtao6adt81ylavup8mps38wngjcv88ii03rrkrxrziso1is8h9dg24xlt9c1a3yyu7agdpnp54a6uafwkrzcpgx95jjgs4s5fccnaj1ggu39t5rofb81i5mvromqk5thwretatuu6u3wivs13g6lnj57hf4ja0u7nwlatcwmkmfvsfo8gux4l9iweyqlt30xhvw648zjsagnayci0k7i2nm28hnsq1mca85e2kyn036qzyg0eocg6m163xx8jwdfdbl047nx8ps9hx2b8kwn5sylguy3ogj1id9m4553byk5ijmnpc3ja3invbgz03stjadaaa96lc4zk6f4v1tickxt85bzn05bwe2kj28vlxz79b6cpgqnoix9o9ejtovi7gw0sbobb3lygyha4t7hi98cutd6fa1hyanm7g59tp3up17yjaerm4a313r3iyy7kum2w04ouae2flb7epj87in9qnm7o3cuqmmbq3l0a1v1q5mbr7doib9920b65zg7okl8qhnsfq3f3p2gw3ntyro3vznv9cvqskhytj9xlm1y5yh0ov76bfud3glkobey2tyxdrg4wvwr1s2upo486h5494nff5x5r9lw2fd9f8b4otm5lzzhg8wxc3k4d2eofwyju7h6uxqvauld7ms4ftx2pbbp0opbn5ka39ehf9vtjmepre9ojtunh38enntbbj05n20zg1dwr5v2ni72trtyu1yey0wcyf4cj6es2iuunlfxqwyaa74jvpltsj251dk1gwrd8o4p5yrw0o89qw4dsnp2xqiqm120zu286odvbhakdkcw5o0elrizkqf41wp2pb6dbmq3y61zuybdiwz06jy7f1458vzmfv9fgorvxejoy0g5dy9e4cq8',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'hyfhlokzp5azdo0yinxm',
                channelHash: 'kp8i0rjwl7mcymmyo94m27z2jesm7xtfh1pvhc9k',
                channelParty: 'jzr37k7504o6x4i0hpun58p69ql94hujw8r5uesipc0bscg11zoobts13ndw5hp4regabj5je5yalsnv3x27vvwfs0ohyy7gt5c2ku9t2o9y2fs6an0o053oq9rfxj8hfcf5uhsyh3u1eztciz7bjyuktepczv0o',
                channelComponent: 'sinov4rcbw189se7melx403haj2k6e1n035bin0dpwmxwi8qlimouot45nhss4zxxzwx85fwtqj48sqkxaulag8yq3n7v0rida7iquh0dpiwocifw9hpr2kj8pbdd3xe1q1s102lkqywzzgv8fi5unwf75jdzwwg',
                channelName: 'glcdlyxnwj0gi3w6sk5cb46hg2hi8ryy7rekv3l2yh2pchro2uq7bj8mzg4mht4kr8fhyyoodea28mubn0cyxhxq6oapzbh71db5wr00mihzq9wycwa8o3b557qov7tfcdu1fnh22wx8il6u3q0yzw4zv38mho19',
                flowHash: 'vfucme31yd9g34inmaspf5cmmn04epegqxpk8tx0',
                flowParty: 'k9q2lqd7nmnrea3dzypo4o7m8pk501xrwwapbjc9sul87g1pfwplovnkz8yhgvesswr6eau1xx8vn4gx4zavtbqgw46cjm2uklyri3os2aarpeza25wgp0e4z3hwd8xrdt3soew0jlpe9gqb7pr6rie56x33zesw',
                flowComponent: 'h3ad1f0debshvfp3yxhbby1irlyel81bcuyiiiavnozawaoq7lfzvw7nefvb2lsambwwh3nkjy2i33hyhwv9i273lhhq0hfp2ztrst6geva3z6bypahegtgf66r5fokyqfsnpt120cu4takmzt90h69xs2k5o4hy',
                flowInterfaceName: '2xt44zo1p8qp3n4bsfpg700zj40d40rnbzclky91zvj9insg4dnuo1b5zyytkzgmpxykm7k1jeon1ifsx2r203ow6j8mlqnwv52bxpyn4ybmgjhlb7nq8u9qh81428fcdttm6o81qeyqqnlnzifzxh3lfztp7x0x',
                flowInterfaceNamespace: 'vo0ew3xmralifbyh2nrw0tvg7oc5y4nstyavp0vvgtxqow9gjmy2smujzblpkiobv4m3rky20lqptlbd2kn0dcmz97u5uaqqmnk0etvilmdyz7uzn3ujckup1x35hsd9b3vgjr1chxtkdf3xofqk4vsn2ssiadfm',
                version: 'hkga73to1ankw8goooqv',
                parameterGroup: '5evozxxc46u0a2s44iskx0oh1bb4ylqfsi53ca9e3ufsa1axs9vlm1ywor2ykqdwdzoequbf5aahy73p52jnfhnot3rxx56cq71e1zladsgquk97tx6jxsdltavlaks7nhdyc4w7wxejryglxl2gczfmyf0igq4to8ny47ioc60k114my8py78hszqqzi09jhqf7jq5z1iyqnh5pkvj6qi2hozy83hpt2dmxdol41ordr7y8cgrb84wtdpncj7r',
                name: 'orsruq6w63u95ntih64dtft17gup4mh8k2lh9u4rdhji7f5l1zcljnctohkp3z5jmjpsavop6hdcfwoxqba0mltk1ym7pbyo4469bfwl6z7aqnp7ofv9qsbh039p4jhyrregfkotz09dkxihqhzh30gp077pi7a8af0uykrlcudcqmipymbb5479fdmdpvyf07a7qsqtkn2bszy4ddklaqvf191xgqf9at2ennfmst76710286rm9rzp8lf4fdymtkh7367pa7ol8ayejr0yv1ksxwiouzb89vvyd7jbnsvu3bu40el0464ruxvde3u7',
                parameterName: 'zhmgv0d2tx5nt6tpxszsywattsf34q2slz5aqqwnf3te2ulp7bc82f2n1vzdt2ctn3j8l5qbgl4m3v1rn4ufq775zkzqfh5wv1i7iutck3y2icx5ba3vto41mknt56zhypq3lm2r24zl2i9bi203a76c3cda6x010cxgwcmou0rmwrzvck6hs8a5pro90s7mwh7mb5rxuqlgxzknczapfuxh7etc416fy36b5yp4xm1hdvdmt2w4y3fzlc0unhcxuskb2zunxc0ahp2tu2nwuqfihnk57danjrf5ybh2e6sad3qj7ptznhic4m8juv8h',
                parameterValue: 'aezaq025gc2s21tv3m8cp8j6m03csdj6e5ev4a50ssp38hs9fkfhtgnhzvicekirlocdovpmf4wrupiqlbfff5cloc6kgbwsna4lapcp1004uaytopiq0emqje4q6an8o0p7samgtm2n8ea1z2mhmluk3q466o8k448kmf0k0m55ziej6qgz8z5gtygzgykoqcgpsrv7ry3akmulgab0pgms3b5g1on80kbxpnwoyu7s24bkg6ukkewalr0zaggfpdwxgafhzj1yf8z9bcmt8j9wdaqdirfx6b5u9irb8lh7vghkrwnou9b9g866sddaoc5phsgxxooxvredx34xubu23e4e24c9fufxj5o09vv62m7jglr3wlx5rzl6wkefqrolwe2lj84nmg771y1ulqtf6ls5lwv5z1zczowpps21sn1m9mj27o7kmvghv4274m55vv9485qwuhzdtaru2hokvucbubdo684aswc0arb6p5f9q4wv1kkvprjo8cjsbqyuxfkwq7dn5ot5sh0msrs5ugc0ihky19k7h4euxxuccu6xezan06goigbn5bv6cndfaudv4oubdeuei5ut03j7wgt0jexcopunnfq6397cebh0zht98xrbdf15ast6le8k5ho2uzfo32mg0yb2b73g4bnfp7kisf6fyipbdtv5npfesdfn7sm15zx86olyialz4lxxgxyr821wyp9005d2q7b34n0nbbfu6rztz7ptoihe4d9z9mbjt5imo2cf0we2z56ydorarq8sojzr9g424rs41ne34j9bqwt31pe7a79chw1i6h6wvbvl0ym4ho0wltboegiji4x1n201miu6xt58s6epbl0pq8hmjipevtkog1q4y38d726ggpr662bk25kx4juvga5srarsr44k18z4r4llmo8tavqt5e02ru5av53mkjhh1kxqo39hkmgk1qq5ky2ut0ta80ca4zx04hvuhv3sul9g8qzfkz81o4phqhions4902w2fl0l',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'fouacp06kigarnc6n8836kihhvfi9rfpc37m8w0n7armx5nz1w',
                systemId: null,
                systemName: 'goljb9zbhh7eh5mb09y4',
                channelHash: '4eb9hkvx7i56bavd0vn50pdlvdu0ihdojpsexxjk',
                channelParty: 'wt1cn6h13gx306txu5ljkllc513ffhi3puq5l2mwu367aw3fh0m2xzn7ludzi2kjzua2eppejyds0jxnbjrapvxh764ausabdsu0mg69gpt7te0e9ych99myp5b4zmosal508retj6duybzte6l2m6i52nbhgiix',
                channelComponent: 'dkvfct55py38wj3bcix22x5txwzdnlvw4wm0dtvc69o9dm62m0zxxsu00vgslwcprnzt88l1osktlfu7ptx64h9kln86wtdgau1dckh249p2iceh5ouzn95c4pmmvd8voobt47yqek34gnhbkmsciwjg1zsb6gvw',
                channelName: '5xcutzjamoze8m7m3ni3jyju2bjw5sjpziflmeunqe7159gk2topb14z6t8s29xgz0dv7um51u00780znghcygqu3k5qfwet7owo92khtbexovmwoas0q4j6rlinj6xzethdwwkecjksj3o4bw5clilyncx9004q',
                flowHash: '3qphwdtx864kfqcpoa6t091dkhslasro139ytwow',
                flowParty: '7r8ti9cgwvzh5w9vleha0ok7ppmhdznbzu1p44mm1b7qdv7btf0t4od0vztqsgpx0esh3kurgjeretfav9ljnvhzereb9of6f371j4lrdhf8eth8wx1ouiwon0uao6oe2gm3jhkul533rpd43ksn12rcdkyuay59',
                flowComponent: 'o7m8nl1vwiblbsfmx0gufs7gsoz8kca14azrdmpm6sike15bbxt1l1dj7nkg360lrodgkr5d7gosnraoq2jaacbah6wmlqvvrmgkqxsas0qyzt1l7ix4i80lr4d0lbosrq3oxrmkvqww2efavu9yvuxgarteb2gk',
                flowInterfaceName: 'pqymdgsx8omrj5zxu7kg5eag2vxa9qcbe6n8t6uko7mrxn2pgk3vhmpuo4jh2taqaxadat7ejup5e9gdho0x9pl2y03l07zf3g1670t3893liz98o33wdfllw8pmuaibyvwgymtyp4cs49c9yccwwl1nzgpfukgt',
                flowInterfaceNamespace: 'x2tss66fglvkrf45r0w70z7938c8pdwae60bxlkp8ap67opgd3caegcetbv3rkjsfvyijrohvsax8wi6ycgbt44xgx8of0ppwpp38vd5fx8dkc1bfslhk6togh651qaewb8xzb8qzy9hxymn65ll8t98j8otcqny',
                version: '7wk3ala1whso1g26b0na',
                parameterGroup: 'gvw9mxgjs6sly3sf8prrlt32mowj9klrb968sefyy37it0ps2o6b0jr85qh5pmvgxi5f1s2ugjzr5b49ervbjj0kcz65scg1nljs96u0mqc41i0e4bdodndqzedqcox6xx7ip2hl84fhi31nh1yma2bq4ib3e9q24fipzh79as5mk8nvo0u6peab5hzeq2rhwsm2sw6qunt9ifnyxz9an1wz9gcfvoj8z89vatlsp1q9ore50qicmnfnaf7cb5b',
                name: 'yyit3c3c419n83nqx71jbzh6iw3nvb8mf39oqtmdhd9bzb8st81n0d006qhhq6nnqja8wivws0rdykkredyvzfyf88wam1apumk7c6ra27wlru1ohuk55a21viutw1zoed45dqckux0h9ekjy4jqmntkzczh3gmy0orr2ej3m535mw8nue13k20zr42pihrl5fylw2jbluhqew2yedbfs2233rd861te7tusxv25ezrz3brt7bfvpl0jtu7x3ffak395r0gzr121lod8hsyipbvbin8umqpw1a49k7kxmrfnqot968nl9fh2ma0ffbjz',
                parameterName: 'umsilqwnqfzbdn28g44fp93bllfstjf3p3zkvsca26kuhyyounpzsxzhnc0rxxlet0lxg4moztg5ra10apojac1wi0nkbzz9goap733mw6qzel6536gpirut22cex8xms6lcxoqwomu8pxqcwomi8g1x3zh8n74yx8emt9t63cxbeqt452hwbg63ezpom8cg75wkik1byixnxbv67lytth3vqwsg62tioui6mcjon073j747k9q0iwkst4hsnt4n3o1ysx600tjeib0vyf0n446tjb64dh06umy1x50mo9kpq26jxs9o5fgnrjqzc0u5',
                parameterValue: '2kzthf2tyqsqis2yplrt4qe0e0xi379mwthkmumajemujifhrbzrejusfwbz0wqkcj6kk5xy088ki31dul0nil2guykcvqlzol8x7asd7x0906arwxy472gera5ps82wcqq6sh0kjpgyyzcsl9qnv64ad42y2e3m0w01r8ivb3cbji0vbgp77nf64y1ji5m3vro8mfteimaambr8ajt8bykc4xcomphv102ql67xyhvgee5qz02qhb9vxy8anmsyv3ts301kh8cfq1lmdgmzx8jlrlf8cpr5lkcvffvnctpt8jro60l9vt2lmczeimmwpmy7tqy6pwj8goyasy87vi4d3gzakaucgspggrov7ic96423ebb4k474tbazh1r5cvajdadagxsn5wc0uhd4ozhjvsyuqmt37degx0ipa47p1lx9s0xvj9qqe69c0fjafs0d4haygs93yul5jr4chrcqlbns16j1w89jl9gcihdfyit3alp59svghvppg8mdtmjge2l5m2jtdk2f7jxyba6yseuasqr1p2wzcuo8cj47d2aeqifvi5ouv6r76k6knnqpfi0e9kmodcanxrw5me5ghbw64kyl5csu29na9zhh7ohxhdohfaoeks27qexjdtk7s3qm8h4q85qdrno6a1x16krwm30n87ivlw1bdop3jerutfbf5bkvymag2z0q1czsug9h9ttdozauqkch0ahg9r8y8jbxf6k6wm47npxu9kryak6saq52gmoxra717zbtjfiehzlaruev8mkjmoobhuy3m7miztwxjbludwh9d8y5c3kggjji5zicsxpcnm0f7onftqppj7ep3g83nw09x6tnhry5cnwhlu0dn7xc0kt3o6rxij7zdc5tsb8h03vpkzswxyd4sk70cpi49mse6pksfwc1gtz65ipfzrjnewgp6p9l0pgyq6n7y0uljfk60v5eam1saiefh7fqh9qvkz47o8qu0fdidqrtrk5p5sn3pjuj0wqwj0dn3dpb',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '4tu94o5s93ettug5wd9c8p7ncvisho9gv1bsvbq9w651ryd5f6',
                
                systemName: 'hvh7hwb3iwgrjysudgw3',
                channelHash: 'biwdmi3mz5jnwtutqjvryy84uqbb03ep3aeaapwj',
                channelParty: 'gb5qt5col7nhcpqcnsbcuvoiv2jieeip63ehqtak27jxhgn6wi1ahf66x7r131menrs2y28jt0senvivnas9dv2vohvk0mcq7eqskmkg9rr7q96o6y9n2wp3jtuu73elicg3we62mufhfyjntijr9w1lp7loufni',
                channelComponent: 'ms1o348rylyfqhu0861cxqo9suunk1yo6j4xuies891xuuozzcf53tsro22ostk9c37tyqned9uvvn51hcif5baynsvep7aeto93ls0xh38tsfmr7drktywi8k35y06qujj54jzg1yt686oz933wpnupxv9prgdw',
                channelName: '2ezm14of0mmuns9j70ozr9sly5ccw9t97n8l3iejz5pcydsp92ewdjzbx1zzaeop2fd2llr3mmz98tol96o5iqk2hcygtyjf7j0do739ycu6mdfl1mhnrmp2g1zjcgiy8g9pbu4vecs0o890271xtjsx022ivceh',
                flowHash: 'wx8d9tucqneh6tonhx464n5i03ch6bqjgsiab6ud',
                flowParty: 'toot62g9kx1ulc427n0cmbbadv629cdpke17fy1au6hevecp9buvw2pdtrqmx005x4c0osoivtjox83taffbb0ea2bhq03fvb6atnysxq9x7fvvr3pnmsyjz5zxpzykhhzykh5831g2yif5zs44fteji05vjtm02',
                flowComponent: '320fei0uu8rvkdgg5bp57r3qx8xa6zefk31f9r3e1r36219qorf29kcys9nsatp1o7w5pz1qnkvq8uypyrvoqbtt1rfl4g9twnzin6t630kbguvr10omlxgsr9gu5vrtffr93oq9u3jtodzx4i7hbnvoklxc96ch',
                flowInterfaceName: 'qq212qmpi1x2g9mezpbovg02p69w949ir9m7nqtw35avpnk9kjfa6lq2nmk5uuh9xxv48mmdimedaj082sm1zzvbt77f2ch6lc7z8z3lrva8931kfep2udswah5m7a5heb8hz73obxd7hvzq3cck7ycjym9rv6bz',
                flowInterfaceNamespace: '92c70jf9t1zsvaghe968n6pn1pbluutbrhsncbqon1ob2osx6q5355teayzx6sjdkkj8gt1qwe7oty3f1hegux36t4aexdg2barqvsf5kfsc17xbee8hjonwuo7rlslv3dfbjut001zkyzvjssqdbfbozwa322du',
                version: 'b3grt1p7c28l4uazgf47',
                parameterGroup: 'vvqizfvcrfonupw262zftvi8xqym228n8thfhyga1b3et7tuq5kjfu3ekpit0hrl96brzoelxk4kl4u6dx5b1hylmhz778a991z2wdep3mkld65ij7ycf1gli1vx6n73wqqgs7io8rv3sewtxwhyv9vn65r81r9ujejxu6xghgpdvek5zynm01dauke3j49ccqwp34byswcteuo8cq4r2d2j6w7rdxirv1d79s0ouoxpkslwx49nasnzv5fu0uk',
                name: '2046ptcv58y5sd12b09zi6188r844wobsty2qroeaqoc0iv12h7e0krwluywyoghfipjni07fwk5nobxf56uojlkcqhncs1fngps9na3sqdgb0e39zo3dqm9s83h4semj0voqgog5beohhztg6yspr88aa6p1yxma4qxkndmlyd8fi71a0xhkk9f01uezmkwbt1u80xdca72lzvmtfnv52d89sz61mfrtfgk641oospandriryq448susk84ilqq1w4bc5bh5im1t2gbssgtkzkxwam9yhg4oq13ry53rmlgnjdhf71ol40g7ewnjzym',
                parameterName: 'ilsx0r0t4eujwfu6w2j320gt3m318h90376l3lxx3eshbcj1gpi3rdd391rkg6e2kjswqexxfs0d2k2s43vqe2gm89h1kzepfvte61tz15heyt4dedvwt4gazq8vtjptbdl618mvwymhyg9x364xltol510fcf7jtcm5v5xx8v70hh5xekzje3hews771maiydfj2orx2d7wwvogy40ri8odb9ff9ebf8xpzo9xerj2sdjgj3hpfshcj7t2tsyet0a3e7ks2eryhrdje1xmwuhl7av3wyb9mdk4ikuug3nrtpdjpqn81g20ufqd1375y',
                parameterValue: 'vdr5um5hvfzu2zqhjv36de4h6ggisb3k07z57bcv5qvr552gydvpi5h58plrg7xavjp82pqvz11con4mk84wm3qpaba8bt9g31hqu806hadueyakuuy7x3x66bvxzsr9x429tgwfxqielmkxigbusi0sj2h91p2m3ya2um0c7wetl5dz5tvkhcyhqyws8m4lzrcsuz7kgh9ec3h3uvqvp8lyguhnrgqhbx56fvxdkt5vvmps5fznh0pf3nhls0xk6bdiccpeay5vawwnqst8urqvm20p179nq05irg27jom3c8i9fwuk5hh9rhgk5pt72o6v0p23s8jiais5zybbsl93c4dadtyh1zohwkbkgx0xq8yv8vb19qffa2tq1zcq9g8w71vfigs8a0xp974ms6s4olf6tbr2ut2db8j16ttkcncsq59ctwbbqyfzdy94s9otwn8abojhal1visx2ffl0iua2vas8jtae7ghfo4ym6bhh7ifm9irvxvw7ev1iqh67kxbs158xdahnp4hdk8ocqiorwx5nnja2c5t1kmjojyqk0y268l6ewd5v41pysn2j53w5f85gk0dibuqh6fmfq4amn8eew0txodvcdyudp6c7g1temi3hvbbqp840e02dmx3bfp429z4hzz8dhspoxcz9zkpymlep6kddlpazgr6mcz76kyhr5uffzx4lk32t0k9rmogf477k1wqywcrzdqqv8oqyrabn6ogkim96tz0hq0iu6jvhj6bo6y1wwz101m9trzxhf1vvh4xnmpiaev9f60dvk4qg7x8x6a9w72mk5m0zgmiy0xx0w21h0nxqdm8uwkmf1toos2trhcv7mbeer01j53pu5o9z2xniyam0p1z1dzdx44hem7zvxpwxaskusvbou8krexe6a1f4ueuvs0z9xcv2va2v303d2ounon4md3f2m5geig2oq4gbscwdkalgriry1drjxtab2mofqafpicnneni885bsf2ooopkf7pixufx6062x',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'b8z96171ufkv8r5m8d2vqkl9lnbnudfbyxwem5qxkoerkftujq',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: null,
                channelHash: 'hk9of5rvpwgia5gcs53ksjap1k1wunr1ivlgh2q6',
                channelParty: 'nuts5cybxzmya4ax5qhx3hxev5xagj96dq566kotnanbs5u76oubtf9pl1y85bv4d9ghm0bgbz37jyt8nifw98dio24if0cigfne865pvzz060dchsqzwyhbcr17nzdkee8a0nwo5qa43zi4mj6544wepfqr5zxw',
                channelComponent: 'w0taxagxp43zvxcdllgc9qp4au1lm56gvb8o6eri3rwuqgqtlds7sdfp4ckzn5xz5wnfvghjv6m578dja8fxslopmtagfr5zp7d90q5zf7ji1se5vphflshasu3mrxqijns5k79b4uyh3cqeypuhi334zk0q7v42',
                channelName: 'gf2ujnrbixq2lgeej866cn7t2tvzbc309bfwx1goodbgvkwn0e2qy6r1973gd96rsutqco6v5m3o3dvbv7c477cwlzpfiu9ej9hjrzqsxq6l8yj232xjiq0kv407v268hl960o23sppblfjfqxjsrmlq03nqbsjm',
                flowHash: 'y5yxanqywzlv9m7ggssopzbfteyedjkavz1xzv7v',
                flowParty: 'jqmzcbch3jz9cy1nqpu4jixm4gas6lgsaqjgq516ehwmr9tpbnfwmy2zp081s46oaaus77egh3g398udoxq5k6ebyci6z1no4oikp8d36q17me8el2rt5ttrrxahx9zkrxnyhg9fx4autxj4v1wmwhfkui3ifzvm',
                flowComponent: 'jjncrmmiuqjgksvsfx0yut0aowy8bgvsuidugv3iflvhenav8kdu6k21qokxr449zi822flhtgbdcl913afcf1jwwmimngkb68kki6sj9m31xhfl3at1dclrlrxsrqpgmgroct1aeruwrsbxk2apoytmhqdofpo0',
                flowInterfaceName: '8v0pdq5k5v3co7g0nanqgr3xhws8mnv9srak0mqr90mgronn9xpwphx1nud3y2wend3ny7xdike5fc346t5ypof00l7gxn3c0l9ltylmiy4z2k8k8y8df8xblit67ecroxier4d82hyjg7l5q3ocbfc6v1j69iw2',
                flowInterfaceNamespace: 'cwedwbh46hbx4iw6154gkevt9mqzw5cg73iibwbny6k3duwyq1fkbls66w97wxanm3dm84nfjgq4kky1dcce0ppzbru4ee9fok02q18ot8cwjp7d4lnkkpzga4ex9r2i2gypbzn630s0x0ag08jht94zq953688u',
                version: 'za15tctlznfc94tvfml4',
                parameterGroup: '8asu743fytqg942y9b4gqsviavtzkytdrwbvx8z7cx0zejhm6l7pz7en7bayqxl6jj9wt8xqnu8ual0ffhenzhjx9247v46tj186s8n1ii72rbfz3oidzz4ef9dj7du2qudep9zryzu79br7y788drgr9jo7fd0tplktaijtw7d4ssutf60q1cve76pd7vjapi9hpmwqkn1wu0i3f3ru13h2gec9crzerz1qy3xk9hdx9np9qvfcghby8sgbryz',
                name: 'gdp3h93a19m8wnlfnoxqxamefe9ofdxzutbmfce15ny44msw22ve7ss9uq8mwks0g6smr01k8t1sw0bztp1r6bk79vibolpnyqzcuu0uzlr9kb0x51ipljzsx5xgou5e7c6obu4y1umns75nk03spkmy7f2d7o6izcyellcm511dl2qkg1jdvt97lsccwu3ttl3d980ykjmwkefdb7j42pskjojdqm8ur79zho3b1upj7kddxxpt75blpr0i8zw73nndgb9aps7fzts5lxbbxskzyhvp4axxrr7tj3zgw1lsltn859vpv6qmfvvzl953',
                parameterName: '1viiepbwajt298qb7b9hyc3o24ebb0od48r4jxobg9n4bri0jr04pnlzebe5vpw3h7ov6ewbcfsgy3ziz7ww3lg5w6pk6y69t2wcu75j92y8b7v4iz6j8a0vmwyef67qprgy3rjqkfm5yfkgomhfobx0gb0je81t23c003rzcwndb360xkt3iyifkqixmzoz8053opjvk6vn6hfuu5eb9n68d4df3qnimdzm82bj01lqmn5xf8il2gfbx06y4flfrlrwpcrfsa4knhlak1sz4vqfcl2v0mggaymf9hgvdzqfo9vr01wtiefcft1qlefj',
                parameterValue: '98x7oxq70sz17janzgr2rmof06ldtkgc9wteto7egjeoin3btcwieq0s36n1m2bkx7jwlrd4zjd9hrud03512crgmy3vasj8opmsh6ideuonzneb0zrqo49y2e9w7y3lvsndk0gv7r5jq8e3bx3erbsijhf1ednx0pqbpzdw4xfulavjqlc7bkvazyjk7yjcbrzltg1y260np63idyntpm75w7aa0kf0vinwtmfqql8t1vymh924q080whp0tv1jwnu7ph3jn0lmqmx802avvp1txddpvf0r80z8jw35slncwukowezvnhf62eikwwt9nmt8mmbh3ug1tsngmr9m8vyckiij36xgoqehi5rieppexrvvci4vczqwjogeguun6oumvl4s8hwy5c9in995urb5bi01le36le5zwl5tyvu0dwi3utz7kwxuhxvbouvmwb3mzmbpiep8ty1vn9dvyprqdolczxhe4gdpntune87oeogjmkn9t1qba1sfqe10ke1p4gldm8vwg8z5p1ratmhzl0s58aciup7w3r0ndt6esui6mobppmopivira7ih5gile59x2uhko22087clucgnvu0e7ecjx2xqxmeqb5d83fijjm1kmmsl9foh2luu6s1ae8k53zh1zl9gjfy1pi3v47lycwta4a0a2h1fs7j8gw7tyqzv0e51ffbdfjpqp1zn9lqgnbj319sot0ns3odtxyibqmzkonp50ifuocopjql1v1yyn2ry7wrn22dzhkrjntwn6xcfjcf4yakaivqils6j0yvzpu21hd1xngsu0sctgk48kwqc8fzhucd9k9h16dey7l2tlbeovx8feseeso7xeydaqza4yztm19t17qed6uqz4qtmhf8psoe3r5tbtru741o4u2wvph6709kkmmm0e18av8ddah1cslg2s8dg6g91bf05nby5t113we0851d6vuymoxr7t1pfkmsb8qyzqwfe3gktckzwxbby7imgcequs8qs1ffyj7sj',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'uwe47l52y9r5qnrnxoporemyj1me2j0rxkbeew7werfwbtrw89',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                
                channelHash: 'e7y4sopsd6iy0ufcl19cb3wvlr46a2hflwbuhjwu',
                channelParty: 'nsuk3ozxi06iq4sjt3g8shn63pyaprfhx63ebdgyml16ox4cfmwivxd1zxbba4vyzlllt2zffuwxe6g94dpgr9qo3bkrfz8ydw8e1rd6f6uzdo257c7decswcm4fbsofyfr1njhc2yjozoy3klg0qoentok52gxm',
                channelComponent: 'bmg0vhqxzkt0uafuiduq4tv35origk0sn351e4cpz2t8ki99rvj2i9gxgyjowuhd52sasevt7m8qfzyy1bf41feccw07bpj4ut1xjix9otetidmk9cbnniy49ghq1tfpr3yc40ujy5ir72v817rnugvh7zcs18p7',
                channelName: '57z931v3r2gzn6ozax7qyjbzug7uguhyucnh19nyboenz5dr3fa8wof1m49sj98gqtk1ll7t54jn8hfxdbx3dtsnbkuaa1qfjojhqs5fk92067w57gx0nw8ejcxm19okzp4xqq2z2pfhile3h0bojv6do83nmbbv',
                flowHash: '1pctgi7fj2v9zxcx8y45sbzirqf37e5dunglcq26',
                flowParty: 'cltix28yljgbxldvqygwjqacnx980ry9oqn1x0luxre9ide2u2s3xwhsdwq8g6b07ue714u2snnr45rp6e4vizgfy4yz32c63f81uika5m8nbo3beddf5h0pyq4669qnrdssu3aot74tmdnonos6wz32f4012o7z',
                flowComponent: '5p2co2fqyolsr2aiao1cvcvi2886p5ael1m5xnqbnobnvkopkhqd98ql1j32btyrlw62fs4ca5ibjs8dcd6n057gcnndk1cpel2g7detluatvbpp92mp1q6k2ko7x5khvvwbczixfq5i3xtljiu5bqk8uxpgojaq',
                flowInterfaceName: 'u82z3qya0l4235y31j8x0w2xbcajf4z3ldg0iex8uhbc0xsuysfpa7syan3zz0kype63hz702tfs92esz2w47b3yaektd3rh12esy0heaz3cj136ezbnlwfw5p4gyd0jov4za0ivteljxr1oa55hwh7ueorfyjqy',
                flowInterfaceNamespace: '14d15hq4zb9xul32luy11iugwjj6l4pxo6lxgg42ndne64bkp72isjwd6ok6afowtil9avbeptxr7c3oh6eixt4rv80htudbfamghsgtxbsxafor7ovz410dlycfmkvwdgyqste0r890mekwmidway3g2bbkpjaj',
                version: 'e0bod7s280t7oawiuszj',
                parameterGroup: 't66q1nw78bwhuurs6slbkd3ak7k0wyfm40359u8md6vgq0b4uabigtc7j2cy3xnstkxgi5mwlbta8vi4fckecwvf81e5pa0fjp0qc12uu2abit7z44mvnlwabbzdbpiqogwwetzjc3f342odarjx948azp9mvxr2ivszh00is6c9cppie2sw9jlqgt79jkp07l3j9hond4zq3vktdqbqndv07eycouaqywh7gn3cwfu5ou717ijrg4hnko000gd',
                name: 'c2cd0cvjdki45fwockv4bzzhtchlpqu7qf6cjkmudsdcpbvky3t26gmf19a2uvkfhg75r6h9rcnzte3syc8ln470u53cdhtrz0gsmg1dpvej24c4k1tln221e9uozql27edvtyh4jwofycul27avsgokef850a2d4uk5sfmi0eystrw7x73qojmux3giszqmrusrsg0jjzv0zjlsvm2zqwsquaivb8lkl2py1m9qmniqmxhx3zx94wmow0bv84ld6cyjlvizlisy6k2iizkbovupz68xzi07qxy5f3pxmlzdssh9bzeg79t96rjrgahe',
                parameterName: 'eqoqe10vg25dhhas7k5c16j17j0nfb78lu2e3twr1texo8eqkpekmnnh0wiowcs5g8s4oh88ahkxdzgol0wtbdkrkv8pg75l4u38m52g7g960b0k6f9td9vslfjc52xxfcibsjuqo6r1hdacv7u68qd59sgi72i85o3jqr7hrqy3qtbdv29k0a5qgb7l9a7435tl3i5062amkdcwh3r5jfjnpdz75zeo0wkbgvatf90d3eacivpikqbh9mt3o7162ujgysmbc1ae1ljfm3akpfo2pvli69pmrgco8962ijiz9b27pk7as39b9u7bvtpq',
                parameterValue: 'y7v25z380o5cel8usm69kr93lh1dxo5ubp4upszqz6vqza7tquo900m0mmx6t99asa00qkvnf8y2bssxy7808x8394m7qfqx0i51gk276dfqrvdzmoxmvp6cmo8i77fdnxdiwb9rptvnzgho1rknd436mckhf1f6itcgmfjup4cuxi9vqr55dgdi0wh6kbxqadg81dhm97hvz8ldp7gn42xywgov2yxpi7of9um99g2gbafj0ucbat00ztsn134grvrwbz1fhewj51ya4gy0k261pafko7igpz01gkn5f19ja0snlcweb0v1hztu7usffwxi0k2buxhlbwxidfwks916hq6k5i9r9pv7rpj1zzdrxe6upsd186up3tlkjhzbhw7ugu6vd0g00vna8fr7711o0fnvvrq3xockgmv7xc792v4s52cxxnr4wfcjxy35s7kf2ms3o62a0x1x5u07bsob19x8n4a528yv7y1e90se6aq0no7a8cr5ksv9xzj6e70ydu0q04gpdips33q9es2u8zut10q2qmozdiafveeuerqaxwzutbud875f5zgl9zju6cfsnbnau4mfkmftbx5buux2wftemvw6q0vsay2hza0xezovo53ceffinzub1n3718z0ge7emooa85ebwcd8ynbxttpd4lk08r5tabdu5o9ifm83z9r1i2tzfb1vb7y2tp7vh4mibsdgi3ac4vsnsrnkfveqdwz5tph37wej78nh5pfxab4yd217xpuqt305zs1556aonaumvwbg2izdq8lggwtmrpd59jo436ind96s5buwj3e7u3qckfctfjajp5le7w5uk25jjeme4cundecybxfhrc4g97d1g0xcqpebjqkftec8pei4vu2e2vborlwq08vo44yntg8yysaodppaowby6a8czfqbk4npm54gpiy1vbgm38lcc0i3u7b0fe3o6xft5h87mfywsm9j8juczltbn9erojhvkfa7flqsswlr8d9irw4uozgi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'mqyltv9knpxl0m0szsjyg0zpwvt1bvpw3et6yx0pw0mynuc7uy',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'csbqqqtcl861ptcri8hs',
                channelHash: null,
                channelParty: 'p3zdasxpr0flteiv5iw1xcj5rghrqigqin6rywbf57yt7rst2ln6g0tifvryn9fzoxohbcnwflms21rcq3tc984mj3xdn6p5yg1wevxuy6yk3rr3d1u4knk56s1crzef6gwvjif2e5uvzwx9ofas0ctxeju8zhk6',
                channelComponent: 'aulj7lufih6mrczdwjtc1y2pq1dgbmeze8a7f68f4v3ijlhstzyzmom0w260xkn98rq0nwqrb5jtsy9scsgvkew2oxq4qhme9jlty1dgb7qxjsjwttt7zaodjbbuuc4pk2ple4yj8gxpl47vt6n8sofizw21c6lg',
                channelName: 'p9x0wtl7mfcv1opdr6hgxapci2muxje9ezupf3745xagunptaofu2962wauzej0zuh06b1nssea41bvajztloijqw2cvvoyd0lo33a47tymlqei9qfgxc5lrjeoz5pzt5kcxt2jb2campqy8f0kq2gs81r0ua2nn',
                flowHash: 'h1ae3af423gethdq9hpcz6ite0v7z778bwtbnsul',
                flowParty: 'mn2742caja1o5lazwjwgnb0abvh06rah2s6po437umidmme3uumrisuctbvdpm2d468l92i5uevkm1tqw0cnmuv59z7i1rqibgvdksn7kd65p13bwub369eyucn3w8qvkqhvdsfsufuju6gyo3rtgcybjjg0hedb',
                flowComponent: '0ltykhbp77x5g8ln13fg7k7l1rr5zzyw2fkgeyuje9ieli6lxahym3o3plyq38fekgidpgz7njprnjfm7v77f5vg1b1ldwbmqabtrlejsucgo9kz25zl9i8c1pnyev5gk1u8k5n254g0zo8umrajpdalbzuusnuw',
                flowInterfaceName: '29cxvuxb3dqbxpj6ejs9rbzi5rs411zzmclbfkfvazu85nwswhq3td1hnqhfq95qh9l37r85na0vqjlmvr2ymudxim91fjsu53aov8h0557h7ir3ab4z9o1f8tpsrx0f2h6vnw6sl4pz6yhvnxi8buei4d9syhie',
                flowInterfaceNamespace: 'jcsi63cvyrgfydap1nvhjur9q71kxfe7g9bdq1guxznadn72b5r2yg9p99oabo56ocfvuv2600ql4ec9rxhgvl4xx89eh4vu5ccyb7c7eevb7ccnh43112ye0ffht19zrirzyp2d1g4lnwkle158dkjme4aed1i7',
                version: 'mqm9davvllh4g3gk61az',
                parameterGroup: 'x5175o81ck861l7g5l8troxiqbm69shd76zycm01b5i4mw6bgh8lnl3c7bn3rtoh0dt44jgh8a49b25aanog63ku82p31k6yh04dv7elm6v7b940fb70bg5s8jl9ykpp6h4g6ky53fj9fesels75jz3lsojnshuxscdmzk8laefcm9amoyrfqhlnivurbfi7mxmdkco1hf0fxoshv9fe04cxsgilaz5y5e9614p1h8n6mesej5t5398hpji5gvg',
                name: 'f51whc7lxtlksn1qum56zbwljvsih8swejq33di8n9ch2jeuktcqdeex56sg4izg3jqudd9wopemfqjl6dze9lk2u8c4pjud2auahv0grn6us82iu1c8wxrlq0wyqcbwg4s3317qyjdkkq3sujhfl64r89bgapk9bkubjufnhc8u3dhmg8fu3p0bnd1vq27d8k7aoc4apcpk8rxefhb0vj7al60k7bzkq57dnnpdm5hifla7d322j8lwr9hyszwfz5ntgg8ibcms7lrezqtyszlkkb0h1g8szy2yfsn5h0ruo3udtwkxtnbdro0fryf8',
                parameterName: 'z3lmqux7n01v49pxgb1pbmwh1ta9thzptes3uq160dj6l7l8arch0b5rid4zjqmeoe4in6zxy64i8u6qg3k3y27ffx6x4jfhn3qbg61sxjmtdosh70fnyzxk7ig1ispn5p6waieti274kn838i9lqz9o2n1umndqnldgwnkh2f4u1o9y77ndltane808os7br5erfy7hnp3g0hagdlptq0cwadndikrrkzqbspr8pb5hw3g3gg7wlpllfq8ythimsfh5iyv6gpspbd1q1w642iphbpam1kgi243j4i1yi9ok1rmc8se1o8hnvri07kch',
                parameterValue: 'pxdwa6nviaeg3w20j327o6yku337s3s76lg62rfof4zqfmane059zdy5n2sqqq3r6ydf1owxyx9b8redryyt0roeu7tfkgdpu9wzwpdhrdldc9q3zb55b5e7ln58bldt0zy1imi7m5etmffxmhb74xosw2tffc3sm176r477x5gufsonr4c9jbg4t29px3wmz03sg981fbz5xgqhroo7wnv2b2sjxgidihtufalccpsoxc56ut4695dnk4awrbecxelebyur3fwl8mfa3tm57lt29d4lcdo7sqinm0lr9b109yeg6j47hihhh7hy9reqt9ooa58er6z1sn4bvvqfun8mhzu5y2pbvjt13zmzshustmbv04v3hd8twia9vnaajl22f2fulrx0apsucic6rzk521anrkay4gkcumud709phzm5ofqb9iqnmqk5sioia19ftz087ogjuvr2d21gxqsz3i2z578j3pzrpxv5u2kijpiyyczcv2mgktwhj0b57y3gulyfq1yqacak9r2bay1whss9mxvk56l63fe1od9k6zwgqlb3jojd2kevvs6r1n0nl784klt2p707z4gyq4t9zjk2oc6faayk1s884r22zkailpm6fvek3bfjj64omu4lnb110khtr5yd6kolywb7gwyd5ukx7ngsy2x94arjy073n2dcj9e65rnav9vy742d7fz55oi2akzr9eyj5d613ksvcnub5g6ezt172h2kil6icpb997dciakd25owjiemkbkioj064810te4ozm5x0eidme9qqc4hnxthva6vtaicg6sg6lnpy0bsh7v96wql5r8ybvpamt99ca6nrn10z0q60c0hwp5dbh2nhfe67wd9gcoqkevalk5vup80i8qrr6pklcv36ptqzqt97qi8k55tbe427t8guupodq9meriu5gd1w6kk74uywus9v7inuap4f6naocdi70w05hxb60dkyqenalx9ngiy1a0h1ahtyx8kf00evtmbwimc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'djmoqw3afe49qfnxqljftirx3uawttyk9tmuseff385t2wi98v',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '6bj9g97da8gn1vmhgwp5',
                
                channelParty: 'illnlfkfiit8ybcnepr7669677jh608cykl2wx775wz8bhyjno7kq2xqryotahag7yi3v22u8ejkxud66u08gjk6z7lsuqdwuk5l4pzk8rsyrnn1z8pz2zvmlb477t83n84y13j8mut7uxjvrvxgb44gcckeuty6',
                channelComponent: 's53yw0i6t1drb1zc48qquafg4i9z4ega6cfthzgvinxbdt4dsqx9n6sd80uo10rqz7lzwgahgnukzgh36z5jprqqq2299a31ymg4z2gildmhcu9fmqncalfxswt9p3ezfi5cvdtoym1jneeqyinqx8jhhkdvfazn',
                channelName: 'ckql57raj48upsim3r5qp5412hts1iwm53lcozhz9e0q6pcvfydzywvkhrzl5zufvvj78v1xtrth4udlbjxrruqg43zxxbga05s7ns5h27qxrkife3ztmm3j1j09x3p2hg88x1jwy9ws85qlghsuk9qlxedmp36x',
                flowHash: '13s70gsc0tgpazdizjo99h7v9gbrt39p34ae5k1o',
                flowParty: 'iu4x4saqkwo0szczuaozgbl1ppugdyr7x7x1omov4hyz88iwbvgoqndj1l1qz41nnugb4ptuuw5vat5o19uovs34rnfph3yvhsqgmx02uk1t7psftohifno76wxeisnrn5tz1x7dxok8blnyq9nx3qh8rx7tpccl',
                flowComponent: '6w8jkfsohukfl1w5j2zp6w2r507d27syv536ijbr6fcb1bw6as98f7zyqo09x70vasg2b5oqpywqi8ij59kmd1b2rtl21c7wfr67xkrtvyqej9zsn5p0q46ys263gj3m61s9jjfz9q3u9wmald5ukx61ubcns66c',
                flowInterfaceName: 'eqdpkya74l5bsqth7nydjpzk9uyn8yxzasqdv0wd8zlgwz559jaw055hd713r9abymwkwghlynqah2unbe9htxuuv3w1q9gnvlo66qx33omslqchxc7kn3qdzmakeyxhs6v40moais312oulllcoyb2rq2z7657k',
                flowInterfaceNamespace: 'ke4gnjd2ogodrxp3airj265mq66bjwr9ty8o7l1zpxw1hyntnj5zte7z18ofnkgpwyfnpjj99md87uf3og4qdz944mns2l1nyrhey1nc2cew13ksk6el1dku10x3cjvzxsj7wjt82g8cgtb456t8yr6nwpj8ztsx',
                version: 'ki0ibg5tnzhdjyt3p461',
                parameterGroup: '6h9uqat9iol0mrjyd3cx0y8h9sw89mbuhlj1zno167kbk9tqblgjio3wrqgekuq5xkuedb3od0ifo1rwpzyro3mj5iswpcfp543bpcju1mqtwnpba8t77gfc8ycnkw1v1mmelojma31hirkcmfrtzt4loaj6wstaluaxslpx3nzxqp9fji1rb3lkvpel7imvmjop2i7d0bmqqm86j9tt2ypzlr1pepu6nacyufrepi9kkmoomohyf6u2cra3std',
                name: '9b3z5153ed3zk95g1cdogyll2cy7okp7jys7bcevuhkzyjji8hfap5xvqkfr4ezj8tzy50c2io3p8ma0wbt1dogsf0c7z1e9b9belq4d6us12psed0yk81lgifj6gto67ao2hk8sesareo3blnqv8qwvberjyczcwh6s9dnaez6ygnfnyt4sq4qs6uaeq6ay7mgp7xtou1ayzr9nfjrpb90ssnt5l17sjnu2k168b9tihitc23ltgrnyjd60ul4v9rbwe5ebkkzfuf0i6wq6zukrctivqawocszh8clk36wr7gk6z4mzix13o5kgnz0i',
                parameterName: 'ylocoudzxh67ur1ujoli4062979brbs113i6fkd1q35ypavcd395hdrsccjgomp3ytiq57gs05h3h63yk3k9xkenn6h4hsxn1q9w98wc59tutbya9hepmh6wf4dt5n51zwzsaovxamtx8h3rlz3bdpzvgizwc1wxmnrauomxn4v2jmbba43m9deca6myhu03fl4156kpyfpsglh1yzyghuqh3l9t693kirllqwwxepnf7uyatiix6jlvtgw2bgafip0xcmufr2sn36pp3uqohdu89p30abxxh1dhbnwr7o6yqn4dkgdh7zi0g1pighft',
                parameterValue: '3k9om7uxvakxjl9jp8wxsf0rolhihg84eypkhnwzdd04mpxktu5jy9rw6a6a7y75jfa29mtc39cvf1be8w9vltfzbu0s51eqn6zcz13mns6vxjy0v5e98mapivj76fjcywaho9c9qfiv29oy27y04vwtm2wqx8jaqpcskptzyw71livbyi8myfpkieaiusoqipy9z31wbne2i1eamv7p7uujyma54oktx1hv0s3ljbi5col4pxwcfok2t84262d97ua6eure0wxi0ljy5qzuapft5bgdjoqiwzyhlkfye1b7h3etk9nbu6a9bop9e4arusqtjxkb1hv3s9xix75dukeyeaddu6ggfqzu13zns9055f3tn0lvm3iwqv5gw2os085yij8gohhkreyzg27tqujeszm6dt5g0459lz37p9hm21i5cfnopcbqgdv12w971k3mxd6i6g7tdpijr9qv6a7ib4vb7fz02kzwmlw2dxi6njqd7h2zndka8ggoe8lt26asnrr74wr78bi1kkug8rmjdkrgiwc4xvx0pwda59skqyj4qskrzfbzaz0cgs074t0qzu2awsyaj67mhsjyhzykrb41zxts4radin72z6gjhs0mggctjozrweagxy4unrowo9jyydzivj510c2bbgsavfsib10u0zbfdiqs7obg5ws7n8w2vsx7acfsmal1wrn9s9p3ny3c6n5ta00fg8k3sxt0irk49eb1fre58972pwri1nmqdiz67fpw2nuhnk6ik0jxsju8wwusstajv1uh1wygzax8ppnphgi5wij0iw4udju877db1e0f8t1eno0pn9z32y352w6kwo78lkkjz2lcwvwcgnovm90vqmb7lupobn29kz3c4g217tlsupdssdfv0e6dtizrqwgtn0zxswv2id27yhg0zcdggz2zsvgcoh3kgeqtqt324xpmd2mq55td7bxlu9qsjiqwpru06zde8j5tz53rgfzo398cfhgwp0yio3wcjuvgmjsy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'qe86j17mklwlqsne5ulhx86ca9f98927zw2y0qhihrrphpum65',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'su6pre00bich0e2d3ipj',
                channelHash: 'wuuhtxr3o72i4x9bpefg8oqp9lvkolc9vvmfcknh',
                channelParty: 'ywm9zpr2e8g76h9s1pd6xvg19bmpefly74813nwe9qbx39n74chlb25ahila40yv0kk4g7a5e0dxqlanfnqfm72r1hvqc2uuet2urwmp87c6vbjlt6vbt4tjognjlzou5xvnxuv0ctwou4i2pytcbgn64wxawn6r',
                channelComponent: null,
                channelName: 'jy4v94eoi129dcm6tf9qo2at1gzbevd1orthud0613999uvwkdvu0vjjavvo4jtxi8go6p7virs7indverteyh584q4sa6ymbsi9ukn0em079jyq27sljjl64jyzpwegibsipmew8q671hgcuqoyezdevm2jpypu',
                flowHash: 'aajdyxp6baniq7u6d0if4zopwmincpsnq8bomhxu',
                flowParty: 'hp32udmg9ah3e7f0ix9wsdg43iky8a3awwro92jju1hk8okhovx75k9voi6wy6sw1atlq58v26qw10wskwg2ufvmuwu41otvegf2jvvn14m5bkvuf4y5u55gpybk9i34ym0p3eypdc09tluf7jr4g8t5f8c8lpjm',
                flowComponent: 'v4n2f9og24o18bie1rtf21g3wm0wpxkv6qphjxgku36v1koc9d3b3u7g8euod67sy42aj1ft4rzkkkzsc7g1v2g2nn61xko8ezxwqquthseqcp1m95vt97be14bhujbe5i0yz90e1zfzlth2nyo7nm1pizddca6o',
                flowInterfaceName: 'm4ry6hha1wos9gin15ttxtehr7m02e09m7ybbu9yvw7on2nbeztoe0mi5hf2g9fith7bho5qe7igr6ipxnq75vkyrn3reooy74dqzjtqbsu4qzc912bl4h47r2u47olg58xb0ce7r63umfjdi8yjriuqnu6ihucu',
                flowInterfaceNamespace: '9wlwz0bmjf80rtuqzbhhnzzif5dxqsrcphlglbs7suf8hhebe0bff1ogdrurhb7ircpmv9w02cvqickhxpnpy5lsxre17d3d9rczjw470dx8h0u0n6glop67rvn656n1w6h2xx4ufrq5xt56wmo4hbjt98byno2b',
                version: '5f9ri0lnsvl2u151x1em',
                parameterGroup: 'dw8k1c7v5qlk3tgxlgpcewugmq21v4rf1fmupdcgbztlww1spwsp9nqot2zgsnu61bo0210eem1h8a9cohwcsfc7osusuu2zalfyffqdmq3ow4cx7eejpbudnm3a9o4xh1356ckmk9lm712ol0ks9e2p2vvr4dqjvji4clpp0rnit2d55fx2e8pr521p50jayz2f960jz0ryqxwbwizwgeb9ke0sburnzxdwxr7x1cjyip95kfzxw2hinhikakv',
                name: 'kddnrhxm64a4mnm0mloddvzmi2kqoakxi4c14wtn8uyrp6yj5qocaepzt46rx9ww02eb26yxn03uqlysxmf733rainghic052qoyzeq012xggz2tjj38l1sz15okuhbct1ntzl7ui45r455zjk1cbhrufweeogqmgssjyhlrlj415xpr5wtgkfem45wl6pxgs32tsl70x4k0nmnz16xll1mc62wagnaktedk78c8zxb0tb9czufb3y4ue126093wtyku0fclteom1r0ki9c8njtvh23bfsodyupzigypisj8tykdnp9jjt4ol90zhlp9',
                parameterName: 'n3llffu0k2g90mlqfahi56b8cvzvtqo5zhqdk9e9rpysqe11tb1sosfqprto2sktoq9q96o5spynkznx4yiie6bbqjh0lqm7rwonjqo0d0fk1slpvimok9nj2e170qpoykte7ruldjwmqwevfpydvm66ty2hjitg71ufker76nsn2uilrz7mycjoljlp36w91e52no12oqa04a8j5b0rdfmpna30hk4rpedyi52si1n7tq6hlrkq8e9na2xm1g1eqd7z740bab66vswjcbiegw3pf7u93lqr1w2i4orj4obap7orovym0lbqavcii39z',
                parameterValue: 'ijqyi3lqw98r9wil4ew69aomo03v2ixjp4qt3eyt1tihsklgcal79aeekt4c07tmgjoo59cppfnhu1o0jx3n2cnukpbncfqe4ergor79pkdgqipqry23egpl7rj1sxue5bvkh3dcgj8ngqhnbj3983f6s7crnzzrwawbgalzymgd1kvf73o0n4td29lbfj9hpnogjwz326tbqutex7nr3pfvuoqobknq4xhbhe5fj4rwsraukv73128alihanj2zeclgdd7n9m32o749cjblh5ft7tdnp9twuxbwcyjnxy0d27dq3gtjkk5160rmxaofkox8k4ex3zt7ejfub2bvhyy4jxrb7zcpyckrluvikexw20jmdgn5dj7pqgtuvffpo4hahpgow5cy88s91gr7s86g4v0dqdlyisknkgvh4i46oits8wbhzlw51k1pru6gvzf24zng1x1arwdco8tsukp8r5ezj75kj1u93zl0ivqc6pwiavj3z7mkq0nc55l2f5zn2eebh6i5zbedkl55sjjwaacqe76gpjd3h6jr2blw2h427aina2lpl32w21losou8rn0thmqml0ukvp0huyt6jwoxhy0nomrndpm3y2ltgl7slwc4kfj6ffp4hws078m8he2egyz6n7s59ndglqx7nzsxgf6y38nv720x59zztd6j56kgd4tf0ztnodphimvlsak2jlmp1wg3h8kgzjwv1u5ihqk9qbixiafvksl45gxu79ukdrje6zsg8lv2yap0mlk0avr8l9gohvhs1qosjvzyc0qq2vgm76uj3sgceqalunzzm0n9r2ojb1b5niitzz9hz81u3yrlhk14kyoifgsl9dmay8ruldnq49cba71calxi10nx1dvc3ucq33t4q39riwee60pkc1g9hapyb74dzosj9mqdlju19k8d0t0ihd3vj2eomftob3pn7qr75nzatt54xc58os6td94gb5ym3hciiri5ezc4ziqzbl59j9k4tmr8gfu4li6s',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '36714esw7j4em1lc3am50v4vf45x4twqs7yzvfu59jzzgot0ul',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'j3l5ehyubsaneef9c6g8',
                channelHash: 'wfap4d399zjg1iuhjl7nshr6kdxm0j547jyyn3pu',
                channelParty: 'w3fvccxo50zde2p93vmgyppep0pm46ou0j5018gudc7ncxhwkp0gw0hsekoqoyhlif1ndh067z7to6v1uy0qv24lbh87xsv1y6igf696kuohaqag5hqw9pi8l8l70q2dbmj0yus3u9u7ql71gb6uvo1pxyz76u64',
                
                channelName: 'ur3gnoucs19h5rshlyqk6w2gv1jvt6p1oi932t14rqutcnwenhzviern6a65bmjz3ksbwhy3ngv1dmyzayc6sfvuy9ggs3wgdt1tkdiia924p0f2m362eqy0o1je21yaydvfuz22dmx4byjtri90nk8euuuqcpb0',
                flowHash: 'w77riln4ly3t6txk4lbrgozku1anjc9fdj2h76yh',
                flowParty: '8aa4ng0gv4tn8rmv01n7j5fyk3yluyspa5ttu254foedw6npv1mpl44ai2f75jjzx0lm3nopxz8ypsugoa0483xc6cgw1on85w1076d3nf195q8zgx5vujg6brda0gpcoynv01qmoji3al922drentifrswbonyc',
                flowComponent: 'ogwbm79l0m9bt3ge4z4nxt0r31zzf1rg0hpoyud4cffhftvzoo56t5cimsw9pssyxkd2se28vwvswqn0zrxbzwailtgrdg0yqrzt8dzx18b0agemeii2o7svug4t5d9yx6ogadhah0i24xrbzlh1gdfua7yrlxtj',
                flowInterfaceName: 'm07w1wep7psq28534btbr7qyfp2ezkob5y2i77e4k6zeejuu1kdhfj1cqi1l2jcj5ua8204sptqwqel9h3svpq3z4j18k41r1loia6kq2qu2wzpfsp53lryobhuft4k3482x3d0pg8muwoj7cxufcsgs95xmo2f0',
                flowInterfaceNamespace: 'f4nc9sqp2srkmzfxjdcqgz70ugqs5u6ukkmntxwmtz9yfslsfqa4a2khbvew4tajxjbbfuy1l77ej5ghih2zr5pbm1f7y02wgd33q894jzb0zrpicpbs42x1w5hd9mps5g2c1jx2vsf7yvdno8hheqeykz0d39w5',
                version: 'e0jvnzpqwkh68enr3ma2',
                parameterGroup: 'wtzdf1j42rjihoxliwrzz32ivzf2clt39dw7sxgpj3q6m9exaiz9ycdvd9obmg64qssiees1dud4e9kudkneb3mhn1y5bgr0rfru57o9acaa51nn9k076fw3sh4ii0c1k9n6dz40bpeqf4k92e2cyb8tfp8o3dppx0i2w2wa796g1zpa37gywyfnggh49smbe0lc5opvqfp3boqsuxfxuzvd7hevbmjk5scgarvuu45dolol28h19n2fcuagv93',
                name: 'e1fmtqbtv1nydjaoo0mghq1ridodo3hncj9t5sd1zotpq90yll7oinzszhfdhdjghkzpprdz79wfxn0gnvoiu4voelgzo68s41cv76s6itzd3mqur88gorp5buph9wqix14e2u19b6iplp5ubyrz4oqqipifpw92na96moclecu59vxy8d5hh7vyqk38swmfwjjoy3obnrj78uefod5mi25mgccxjd0sool7pqqag6gw1dpgwd9tjrfjo7gpmf1aezxujw46r6x3mrp4wmm83wr5v0hwby0k0dh2c5i35eg0wn8yddw8qdarjqjckgra',
                parameterName: 'ra2ywzbekwhjdrx1qha5getrpjhrqnqv3l4av7zqbnsbeoj480c8ikmr91jtwbot7aifp3f9srz4orr15l3sxw7sshxewm5uozo5dqpw5zew6hg3vikra9uk9kzgaj5rcg7f9jmbgrr24qccy4rj5rx8t2pjh6kfd752se41faz6s5l74c4jtb6yy9gquvser0kgkqziypjqvksktmj5ms8c3kfnq1tvghywmlr8npfiovi5l99ziwt4avmaxsgzfmiismuo4uherils57mpo4saphkg27bn75rs08jkcqu0tu6oxrr6haeiux8tjepi',
                parameterValue: 'ma91w3blpls6tjnthsragecosahns8v146cf346yau35nr4llyw59hc6h4yl741pfvtpdbfw4mfi6gxq0xsqyxgjhpe6ofg14mfdlof54vx6ff20rg2i7js1xvgfq2urk7ndk8aev1afnix0rgsovhir595ofb3flbrmj7altv48m0rs3sxlykmdmcewdo8s1subl9waxudyhhgarom08jwemuktuqor2qnptcsu5bep32ey32xagduzknyoiubj7qcaio9kz7xqbnozf8ddl17yrohcmuh29mm8l3q91x16yd8a4br6339p202tpcn43asjvm1qxqzdm14v5duzk73u7hxwk0npb2xec48k9uj2ilq2vhecdaqkzpxlaa3i03wqdlheovv3m1c4w7jfzutaduidju4c40qf7a3qpprk247p017q9g379s3t2umc7ybtyktghu57hgow2efp2jg1a37powlix346nccbbn0fhkmdwnj7zr2v1gjz80rkjw5cgsocowrsx72nqgi9rvrcyms23bocta1py5qbhig5qrsyu0kstb4t4oiwna6vj7851ufbgwofqimb730fhco27jgnjprlx6tuhc2gk5b9iza6b1sfmcmwpe8g7dq5umuo3ehtmbwqrthk2kv6ayxsvynox1posixhyeoja90m96ntxntcja9eyki12hubb9960hduci5fzla84linodznijy2gwoqg1mn7pz6afmhuwvjn5bwn1dl2ixfgowdinw7w2mdfruzw4iu79padoc0d287cbz5i7d17xh5uqtootwgua6c8do2o9iitssc8pkmj6xud8z7gryc4dlzcawivsq01qlzl60b9rskefsjd8rph0tzrxn0j65cn35a93fozrjocuglt7p2jkifr3ph3fertxa8xh8vumvajg8zuy8y2e2jighcau9epv2eq5mbjv30e7djyu64a7ecaw560v7qiw6q0wsuz4dh36o7t0x3hf5blcn9mkwi125l',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'ztvppt9a3hpwigujav2vr7i8597msslb782mms8v25mj1j7sxb',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '3zxylh54kfmpefkb7w37',
                channelHash: 'ylh6q9xt3ecf46d6ppr6tm9l4f2lyzktrcw0nbf1',
                channelParty: '8vax8evinlg99etnvt8tgbycfdoyg4shurp24ahnbm3yzeun4wimdcz2b43ghwpqab3ptlbngyzhksub2a20pu9341lspl3tbch6fialfqsr1ypoo5ure11k0yflyy7h2d3zah5hpcnwzdbflegbi4eqm4koymgb',
                channelComponent: '0vpcqf1grpt3nna4htt3i8uf1s9g3n1mho7efaconngzxj3lqptwwbuwin7m8ra6ugrmmqu5foyd1o6tpeufdmt706pyivwq1zyt0rhr0b2ku404713srx53eka0t5ahv6g738urp97o0v5x7av5pect5rodbae1',
                channelName: null,
                flowHash: 'dc5lx94dw5eciiy4pkud4phkds3pmrwn6lgags2b',
                flowParty: 'lk4rhyekdh7etdwhimcysbhljire6y11ijz4vlctswok4ij5vp8srwzmv2wweafywh4l84bez39iapkjjihyuldwb0t4n1700bkdse5ngcw1bn4ppkq4shdvrji3p60n2cvh7wk2bv52q4xkftlwaod3nazj42db',
                flowComponent: 's112d0n4c9olgk6tbmbol2ml0i9n1si5ha423mt7jtlzib3tn9n1vkz3xmtgoo7m9mexy5k9dw31ly9xqwzwu03l16g49xypgknq1jnhsugj2lxs65z5hj5s09ud69h55cbkwy0iv1vjckolxx6gdyw81m7upolw',
                flowInterfaceName: 'kaxe6hmjt3cd0o48dmex4l7mlefskzw31iihn6rd6dmgm7q8fef3h6ehpfvz723lc6u6iomex8gus6dtk7u8yga0gyljt5hwx8ito8h2opsmym4aan9gugdpxr4cuvpnscsuyiw5gryuzibgypwae3ljtgwx12ze',
                flowInterfaceNamespace: 'r5jp5ekuyuo3q26vn0whrjm6os21w1t15huwe7zmpcbfpg7jpvg0jhskcetiertzahii7vtm5khfgvfdbctx9gmizark8w5m5ogj76axyyqtm64g0l7ofg2heh58ta49pdpxd8hs0detclqszxl6af6y7gdw379e',
                version: '1b2iudttu9zgv7gw0kkw',
                parameterGroup: '54iwjnptaioknfip3o5ooi98jgynorc4qzsy307kv0zd4nvtx2kfq5n57u5kqoyd6srcaobmypsclbsdvvzl6dhct9c66fk3jlyiiq3wbyrvcimjirvuon4c3vuaujhw4lwshyzi9n0uda15d5hju3pzo12xj02i2ugu7gdldeio3el273a2zawxox6r02x69l7z7xmp20bi2awx415bararzitkof8w2d1z13xbpxdt20mzgs6zwbipkg2y137',
                name: 'oc97ydp3pm7i7rmimkfidr33f5wkt37akk2cgu3d9j24m0d6i6baz5kj02g5bagvjmf6l1rs5zx12c0f0vwm1lm2hcvthtdlhucq136djanz4bj8yop5z9npvfyznzblwwvc9cp0s5hq7y7u5to7zlqwkq9nmrstybp4t8mevumeh6vc6ekb20spz739upqgga3o9tutp9td28mj8kxtvs3urqepw9dzvq1pcxgabiofrouf1wqwd8tp9c14atg2ctrgqaoweyvetwuy0ruh0q0qpnwkww7i5gktglk0rpzzoni69tim1t12csvu0uwe',
                parameterName: 'y5dz7nh2o4mok00fs95baai4pupxkwc3c6rj0tpbhfofbculime8tiqyxysgeks00dx9gehjr71vyfvs4rcv0z4rcjafl27i098pzwd5sfvs091evzun2b8d5cdnnfvm9qzd23rb8bznavhdo91zapeymtd79w899s1q8u8vakzvynk87vs8ppij5n9a1v23k19r00g3i6ppw8vpmfy2hbnxu9ajt4gzm87nm7ccuyzjathqh497f6lsrwjzt0f4wxypu6szimh5m8oh3tnnzr0ankj50f0zxldv290jm8nmy4as9i2pfmdynscrbhfe',
                parameterValue: '0vqhh96dv468he9xsqnyyza5o7vq21qu8t23wz0vr141boi6gd9d2udghvndg8m32naj0vdjjc6zwz0k682re8o68aot2g4eqkm4s7f992ktmtydjnrxb52wfkkzf22bqd8mp36gmstbt6nae1anu41mhixsqx6hbyxchsw7zi3x7am908xbf75tpff2ajn8nyzej09ukjgbfvoopbe1f1j2nzn9wv9oa9b4fy137nk27zdtteon4nnymy7o27qnxaf0tcsruxcezjgz6ll3m4n2rl6k1s09fe1sto8000qzcknaa2lyam1h1mmqcdj178ztpu1fax6bk4ryq589t689ay5p3g5prhd70uhyywhweinc2c9k2l1ge5f5w8jqd0zuus4jv6a1jlbfv6a4r19480ycdkt4mde61y4lnd539y6fg64c0bwzwrceqjifxq4og9bw2ue1vapsgcyksff1hcwjznurltex75qhlyfibrttnuqy4fars8b3hvqnoc6jplkwg779nuky5ytf9ki5iyqdge8pbu00lvkpvlyq98nr7tmejm1i5clrhhur1uavk6zajmcb9zftic6tea6ripwxuien0q4pmr1rdh4n5k069rthyzatts978ofp21hjlt8hjxgbr6w9jaeit13khxasz1veojusbnqu6v6htbr1o3bw0nz27j5uw4redxm6ea2oaz1ek1i9fimp6bx8owk4zuq3n5uujbh8z7hn7um8ua6tz5lwbjintq9ud8g8dopu3g1rnjc3kfxsa1ek8dl2xmef3rkut4k8y6uu5unfhzar05uswhsz085fqyjj9yx5ttx8kd7dergtk1lbf5zxt5fx42uuiio50vaz2fpry52unq1tujtaclm1qgc9wqos42umi6ndhml4t5tkqijs7zoiw9k1n810t9aifx6gwamf57zwhu4tulmom2gtzcjcgbl6otssbtqbhuljfmg3x3v8uyg8q25qwlxsnsgnc4n6aywn6abxcsu3',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '57el36s23t8i68fy45m0w3lottkn5s3vqs28o1jhy3sm7ej8q9',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'koi6h4zxv6k3dmh4wtp3',
                channelHash: 'j29yftw4izl9s7rgtwl1vev4u6uul9n35w8lpxa6',
                channelParty: 'v6gqe8qm7z0z9sgy1kcbh7j75grj875bw6g454o2a31q224skpali6vcayv10e81cd9sg37l84z48k0ufnlb1bab2njun66pb0y6gc7kgtxhl31klc4bpprd4jhromppwvcb6c5zy4anqkwzp4zek88nbznipjjs',
                channelComponent: 'fzmll3g9vtj9i4dnjmmcpphgl44tm9lcjeigqtj18xho0z1w63apqgsphozs9p3ek3s1523y4fkd0ktuxmgxj0f216fku1vi5pjtqdvc4o7gjowsv598pi53cln451pmxa3zpbzn3v9ywyo5smpvrh3uoep9e859',
                
                flowHash: 'jrv42tzdhh0ke07b8c5jn497bcdwpn8hgojg6svu',
                flowParty: 'ge7tldugi84xaf7g1osi23kmuv2p1pzwzte4fhh6t8rb9dx8a6p51ehx7yrgdqw5jiavn673cwle3k7f1lr5b8bmbwj3vyywazvc1c1260vrfvp9pacxisu0q4yft8515sxih0vnb4x3kswoefkwkj7lofcly4ah',
                flowComponent: '7a1gp6z9kdbwetfqi103zei1fdprngk82atw56pfnwf25mww83bv3x5z2uqw5q0ygh31lddct1fpwb4a4vd706o4fjutgadwyw356jl0mzt49pkeb8wr2m1vkpyecqypqdsd2o4wgn4civkyqwwabigenbya63rq',
                flowInterfaceName: '6fhqnhlc6zozkf6jdsx9toa6lohgrn2sed8koy8lzqsj3xdtt0e8czrsd1047hunb4xupbguam6zlscuk9b3wc13zj9biuyu7chjh7bg6kvjbyt1h8yj1xvkxjcpm68e1rya4mjdw0z3oixsynco7m7nfm0d6oqy',
                flowInterfaceNamespace: 'kdn8hs34kg1eet891hur689vazaiql9gdn0o0y81mcpqvqkdfe43qfg901vllxxaatbyvuxeapmtf4r7631mm0dy9u0n1d0h60eyadifmalc7g7uyyc4oaoogcftmrw04rf0v8ji8w062omh0p7wnuhjitqvhl5p',
                version: 'yoabfjyyt65tj7n3sc6w',
                parameterGroup: 'vsjk6b5rz4dbmdmazy229ygulm5vvehmumpn9sidox9oo2x4zmmuvstdky8xtimwl5lqhisxw7py5g57vrxkoodkak1lt1pekzq9bbotlo7deodk8mbuq1pwkhvnbktabev0deyi7vlyqizmuraoye9ynnu0ex05b3h8m1ytxdh48yiw674cqa8hdldf8vrzj6yohgujwp4rbz95jvbip4e1ibakvvsv5kciqve0j11jwniqo0vwywvz0tg7hxk',
                name: '9ceel1qp3kudrdntxsalfgagxbpxahr26a6p4pwh3xk5wrsrtifla4kkwixp5yvut6n7x13lozyzne4886hx8ynawdka5zazw5tzffnf7rxe917dhe08wgfucbznfs4fgqb94iczfolo8zcp4e5ac47va12sw54m9lwpz54jrkqxc3pcrdowip2bd4pgl8xhotiue5r55plg64pp96runn3nr9gr7h7im1bixgf6pldlmmxzeanvffqarfov3nbagjg36ksskbe1hv2itosh3sfmm0auhs40catqb5ts7sjzyh1jgf6msy7thxi2hx2g',
                parameterName: 'spwnv24huw3pvk2ll8c27sv5evykt6j5bxid6cirmiw46o65yoayjm1ltof6ajh5yj5o8boot405c75xya05u7jbs7x5iyroyo7nh3hg8dmjj7bq5oi068rh8qkxdu4z128zwy9wkbfotds3miqj0cw7ivq43cx9f4vsk3ujjeq9xe3br5n5vmqpbs6vn068lga9uel31scc4rfr4rij6u1pnxl7wxbp5fjhnsa6ta8plf02qeck6oavsnl2hcra3rep76chv2yt4y4ph6pibetilp0cydypu1642hfcfnwsxjvtwhhl8zuxp0q05dyh',
                parameterValue: '3fvzjlh9l60nngx6pn7sgg1ixjldrnjhk9pp2vs4kv7lgab2fs7s81bfj11u0tl9jgt3klua2zhu8cv1q1zchvaw2n5ugi3jw8t26gougv0gok5daiegt9ny6hf4h1lijhje2l4em9rbn6u7ezdf24xmyufsa5e3g6xuyqyv6rdhg4yzgm0hbc53f03yanbijc581ajn8um7aa1japac64x8t3n4m1dbm53q6ua8f64fyw9i6qshibf2tetlzwpc45tk13mita4aoy8qsu4odv0zhuml5mz374sm24fpa5uy5x3esk9dsz4zs37j7bp715yq1w0zaqw0fqxl87rvljv5fxltpcvzgeiia154yfbfi20pybkex0ynw6z632hwl1rnpn71xb6vd4dvq6emkczjkoh2fu30qaq8t8lnt9nzcgcta6t8hak75n8mgbrx5o750ywi5hmcsnnx467257cg0ejln9c5g26uybgogiyp7fs3n7p19qguw0p36lslrgd5levnponc2h35t9rah1a1gkvm68emp9er7xeh8v8jqgii1vhhkdhuli1yh2yx8i7bce14rxvilknlqtcycqhureqcqlq7239wq125w2wdb7u0dx29w8wm45yjg6j17x5w7504ge0jqxe0f9xgyv29w0y6m6ynbxcci552872f7d8zl2wqdxj40acdekwnctbsfvwqomneqc182bnag1t2v8n79kh84gqs1tdcgki4st6895mdf4w6b9v4af7axwtzzb9jn9xeqi8lil5nouv4qs7rm0r2q13058kzkry23lz479hc14yx8vp555fgihzl1fzh68u1lfivji1f4s8k0j5gw6z9uijon9gxd4fojhx3illtryrm584ikeaqdmiw72osbssnxajitqzh1eha3g6u1faqfjd5q5ytxl2pq73dsrnunzff58mz7cnz4vsw0nqret4vc7lyzi9k5lujjn1vfn3gjhqytzndll4kmahfbps2uqgartdk3t85',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'zn5gs5pkc7b1voccjf54ovyqwqj0ame3jm4rponv3mru7mfulj',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'wdea33zx7fbjp1e7oaq9',
                channelHash: 'f84ez1qiz8sbm19r7p3na91hyustu19yko9gs4yx',
                channelParty: 'xbnt0d3sgjcfrcajbp8cbtsydmx4l9uvkuh4t0ydkqtq22tyepn1wo575r84dcc6d55sfb0lp3cvssrg1k1c3jtbfjbfitqvt8pj2zpuqaxw14s3438khm0o7kmwjvxuab644x9nyq1xcwa77xpjjvfti1ogcvmg',
                channelComponent: '2aagvefc2d6eokkkdv4sybb5vsqneygeqm4bfnw0di7c6yzq52vhlutx7qjuzqutce18031ddr5zdcl6yuvlp22q9nt84sytg60sexsus9czjn7jpz6se719fpgudzdvcmw90tgh7iz4y4rrcdphhjguc4bnelsc',
                channelName: 'c9rc64zk3udecsv6z9jbxolyjzr56yv04w5wnxvy3v2kpgbouzhzeb3yv5uu816ejrmu9iqdx6lz1o3pfnuz9v8u6q2o13l287ek6lhhmaiwobhszx6kiz5jqky5f8hoa3kw0w1uvllmgs40ow6mn4qvekeyeqrc',
                flowHash: null,
                flowParty: 'd9a0d8o8dnlhj4oge816gsbxqdenweszod30t5tbccuumz7y8pyl08x1zu3q00sfi8h2az2kkpljs59055n7d6pnyf58imzc7m9tu6vadhn459ll1zfcvwk4811j5zefhdxm78gveyqtfk8ljti7056qd2zd1xih',
                flowComponent: 'ufxivbijkvsnbxuljp33qiy4k5tk9iolh4t5jwyd6q6dv3kqsvliaj7cxgienrnbz7iavtynbrjdoc0pz9mqrujd115bxrb17wtnqxz734zyitdtacdt90n74s1nf7qx285krbnnonf3yx7uvvrlkmx0dydoafbm',
                flowInterfaceName: '8hp3oiw8y3rpra027is1w7nk4iuh3zp83mtgcozhv7n1ryzhve3ugwddj6q5ugdvkmrnck1ceh7pb9roe9duvlp992w3pxe7av5wdy1qmnvp5ngqym68a3i56k7fqm8nb6ugkf5illrlje0xkml65tlk7r9cvv5v',
                flowInterfaceNamespace: 'jjyxuricvd43qilffk5a19s1g6m408fk71t5jiqw2hbgtjy35sar6q2e9492iqdqhrriil21zu22lxnykhti4gpbpg7tn8ynq1xlmq2kkage6b2mzqdo2labxxspa59im0u0ndd4b00moioed636dqcpaa23mt30',
                version: 'zfp87ligrfmf49x1qk73',
                parameterGroup: 'yoxawe7lmxgllhio16g3i56dxzwrocb1hc6ltfdlc07oi739bpcdb48e7z5lcmdy1luiwn5tf91whxwbbg8gugn4j9su9sxjx6oej8zhh0vwqtj94vzo3i1uc72879i60fmzykjjlfz3kb3ebk4dyg9dm20yqdrma29ao7cfvtd22309kerm03mvgk04xbcgwd8sfbk6wgtjuig0f4dkrub2gjm3wj0n9hwd7oq4xstsyo957g9t0c1yiy82vqy',
                name: '1gepgli6v293pio03hhvgdluo2tcd5pl5be9471fxykc9bkgryyvv6l1hf8ra1urogrrwvsvq2wzoazpr7y2lm5lfpc3w8vowtpkds2d5s34gdznu7yqd9jkvd0ogv6a2tzlx56iszckt686czh12b0arc1bh6x3w62ht6kscp8zvxb9i61nschedqyf2lp5c8vtvoduzpr23xczt3ualre9efbcqk6yx6hby7i6xfa9gprdyg1k8xxwe0ngoxdqz80cn3wcmf551oo76wzck1zqebfuo9501q2ny7mhkph2b7mwicy4efo0yw89qt7r',
                parameterName: 'rcn7ttafv3bk3np3ck9pthzv1zbfx5no0a1b1ky9ljp1y2c04j3j3r1d3jk88kx3qjddlj4hq4u8yobfegtsza4r5ibwtdy2sl33t5hkr1jb8ssl6qvf37iwnh0gljkfc2v85hdqh3ju7a8qrz5sfh1y30bmjtqha8gmwht66wg8hnwcb8rwb6iqvwrj7ifzzyglas1rck9q1vi0x455z1657fzax39l69ixqtum21mqy7jhnd1k0iky8szcvxav0trviqc3105oli986ja11kq6r4ve990zkqovnoferk2ytnmfj5cswb2yl41vlya2',
                parameterValue: 'o4z2vi9fsp4f5lbq519rt7a4dbjrmm9uf415llcodqx0mgz52cz73hrnubgbo7482jvv8ae66siub0xa3yrkilv8yd903vwwxhycnor7zy4nl9zp164xlkr2si90o31747a7x0jlf25s8jiwmg7ngrwa5wro7rep91uqiudwfd9rfdjqmbem307elany6gkds8z98rvqhddvil4cwqs94qkgpvfynr1mogqhovj9gwq1tlxc2rw6ipvvtva9a53cogup7wknu8t7ehdj6lb2v2lvj22h3teevxwl8ghvyfk14ucdihvi4syl8gxl7f9hap09bpm4x5tf0otb16s90hnme8yeiw3an8ak0x8mfyv2zax3z6ucvys47luc7ufxcx6km8cafryg37ahpcxhte6qkcczvt7otkuxjy4cx8thrxqqsv9rcwsvy8bk0r73th94dt2ygkyqv6ls0z7u0gn9ca0tavqnhhd4u82zzwmk9asmo4jp07ccf348m4e0p71r9ivenl7ndvt9uq6vqda740l5afsqbvi2737bfvao76j3ibbi6jitniu892y7c59a3417r6k742wg01awx7x4vcwvvkgmnrxn3y4tshhm2odaavmpctheph9tvghsjbeg29klsn9spbl23y4k71k3ppzx4g5aw8woykn15xgn7lmemlegb9s45g32718kjg8xe12py3c2n3gv3nt51qxt0caxp9hmffk9nubkru9zlut6jg099sczk6eueho51cb7aelpdwvq0eimuczwmfh036cffac6nkv4zy5jd6v8cq8e1at1qsys0k95kny6rh0nczcrizq543l0xlgs500d41p3ugfwx4tmfh9bj8dhzyenxsjv1s4j5cy516lq8kq2j1s7jz79s15h07z1xul43k8ubj483ufm1zzaxnuvdyo8yayrvz1vwtajq1yil2p0jjtolwd0wzjsf09yicdfuqv5hv75pm704vgldw1a69sdi8bnw0k3eoz98lm9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '7ffgp1n32qdwp2nftsrybhdja7s9972sn7ld5o33j9mdcn82ke',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '4eaui5cw1264iqksxrmf',
                channelHash: 'q5yy39s50gg0oa4aobrx86oepgx9x97ni9668pa0',
                channelParty: '2i3nvslebjumv54hje35tmgepn5y3sp1rry2vkut3vt0u12img790on5jqzi180pgml1xiq3aa62phdwimazsw6ymjh1ertwtpi3b7kmtbyc2ig24zgnc09n4yo6ruhu6noljsilc911t60vk6334mn9qfxeoivp',
                channelComponent: 'z9fdk7mbm4e5gudvopmp4462om6z3ycnjf3ol5vf2mh7szn3utndovptotk5doptzezjkk2ljhrzb4lad99l0vxd437m9t82ttnn803h64w0dzjsxq6za0f0ftnpxj39qjv9245bde9c2n7fvamgtrie7yohg6ec',
                channelName: 'kj5gpja4bz4xf3ngdv2gmpwbsig5yklpowjzcfjpkcvd7y5v9cut5qqlq72hslbogbf0ci0tgokat1wv1u6v7x9q0rs0ijkfsvdyjx6fqyqrwmc4golcdaqwgnl9mf7hjnuisgu9yox31a67cmh91lpuamayr7oj',
                
                flowParty: '93q6tpbfgtqv4ztyjmzg5zj076jka85bah9oau4cubhfkbtsyhcptxabsclye7kzkkoh9frbehkiyo8qnwk76owmebq5qu1ygl94u9jgqij6lk5vx0geb0pboqs7rojacuvi53w8f3okhmqz5wc3u5lo1n85on2j',
                flowComponent: 'toy4lrn0cgzd3nf1zjofxxocak61d6sscdzazvx8t6cwwaaurpww05zzv36ottuc751d7txrtiza2oy8wfq7u9xw4nqf0o5kgt74re467oh8xydpsy8tdjx2asx3p2ji73lczxftigbe1e2mr9op20rc10cqb8av',
                flowInterfaceName: 'zzcoxncspu78fof8b4oqt0c3ckv5lktyvp8hfz0knv8q0jaue0umw1zwjjvru6i6tzisw0d81jy7l05yxo6zygp5k1p4nzq5lkq86utf4hnmu0kcdjh240kdwqqml8gsl8583n1rcphwmi4ulmkxcjrjwapb2z92',
                flowInterfaceNamespace: 'l8tas5bp73mdp7rq3rti6jglmqf6x2no7jxwxwb3duw3pt5naqz73s7cli1eiswfifnbgkryjh2lxmbo0bgp4fw6jeoggn701t07mlfofnjwmas0969wya9d0wnesikgcb00ld416hf1zxoonh5hecx3npmi0gzj',
                version: '1q2okke8w1g4ugxpx97m',
                parameterGroup: 'xirnsf2wsbes9y6gfic1qpgynar0a0c9q43frnqnrocc4crr485j37hozg5ldv1t31mc71pme7t5jnwd7zso92grvlxbj5sy1ahmvc9fcpgxckmdjy4g1v759nqfnzgdygnmjev40498ia1pcx896gx961c7qt6naug72anesbp4jx681sgljydjka026cjyk072siwfbr3j5aeuvo6lf2q8ieyyqhc9bmnza7wkdg5j58hgz3sre2405k1m9gi',
                name: 'mh0bukvxb41d31dd1mn214280bvo8rzdfrux5zi5b2yd7htpvb7oe0q3y02jzfrg5iiwnvz3e16i1ogj2lzvpj6icut6jh39mmf9j8p5b5z7uspy3ze8e5jszcoxgc21ggpudnsq8awy1cfgds39q2uvgle0vhwd7yvnycvaxyqi2ikchx9ppq72ugyjgw9brr2lthmhkkmddledqz7du4qllrr9m6292d32uea92el7b3i8slgmup5z25h30pwohr1pkmq3e6b0pd6gfo095wdeu0hq155aofj7nbwfuigvwpi7gpo078ciozexemgn',
                parameterName: 'mmo71dh8a2dsc83v7jnujdleopjhz6n40d979iqaco7kkas0gflts0lziz7h82iu88xqbasbymnw8kgal40u2yzw24tnbxu633i2rxjj6674tlybphhf6ziogovbts560h8k4zajpgb11bf89wa8mzkt9tp8m9gemzedrwv4iek03ck19wc7qls2gtf8zeut50h98mll1qujmq7dnkccxx87hihj6010ada4yscwmpmuurzwif82tb8baoim71z68dbb33g5wuvc4k61dozt2dukmws9jaf83w4zgfss0js9c930np8fyqxc7172fcx9',
                parameterValue: 'v89dop4xbvnqmxhljedaay4ginn3knke4l4qk510fzpw8vgo0elzh0mjjsy950n606xlb7tmfy7slyxdyqkzv8zq3jh37wlb67yrqx7sxrsc879o85lqojd4mqsir4m5jpctlb6wqhzwd3omhijblheydgldar7kcigsq73iq269fb8jq2ali8vwgvnljb8f9arce32n957k4qoif291gchmciy681r8uombp6jq0xkyo5oszhsnt1zhbyez53c0q485n5k9pmh9dl0qmvo6l1njpjrc6z6lz5arc6bmsxhfcgzi2no0ep65t4h9o4wlqgq1sn4tt0era5j2hg7h0lz4hkz6iqikxsxb48ocorns9f13hbz48tjsxxn5cjujot8waxfogmloioady2fb7rm1oejqwd7vky6yq89jm6xm3ql89nyz548y6n87i30gy3wnqukg5et3q57ebiv143cyas3aklqu4pe2wk8n8syzjjh0l1u7dsv3nuwjhas1nioabwfk3gzbl8mmzee7ahlpxxzpuspn2ujghtd6rhvb8hjvysf4t24ksq39nmgz4of6wy42xh0186wu7uyxbzvkv2gzeyo6wdomo3t6ouaxo9hrgs6o74ptqbpv6ifb20aznutjjm1a47sb3fti19u2mb1nbhtm477umsti8u1243o8ko1pzpyop7ujl09c2g90na90td9dzr75j39cc2dksoorq6bs3vredpwvoaaesfvt756scdq2vto7mjuuyhrccrcsuo1gcz85g3z146met9d29vgblkuea9ucz0jt28kbmekjk1hi58dxmfl87lbpnpfzdahvfo8epsnsavityp3et2hu78mzofkv7hs2bhzdtuneommq4ecw5l6xz4052l39x18azsveny7lkchsvk7c2ey8up38y5099iq10qy5rei90ec9x0a2hokm5e0a0sw9z53dlqjrqkk0cd3v1iodjg0ag25dd6pwa90y1dm5q19v5cs9wzjgal94',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'jt95r1d6ls5itrmhmg86op8m1km2poljec4mejln7x27x1djdn',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'vx0a4zacn20ysuscbr9n',
                channelHash: 'pujmybo9086gbuqjlflu57w4wkqan0h3lujtrwf0',
                channelParty: 'po5q8eat7lhjsoyngp51jcwafvffzi2xikqwii20nrfaj6thza4nrbcj7f5mr2y4g0crrcdluv9ak3qwv87p5fnrc27fx411t07qog6bavcn7oblumj0wk6qccl5re28kzxxzxdcrhff6wu20ng3rix6oduomk95',
                channelComponent: 'ty02g138ju1uw32h1u12hjbhy7aearnphjzdcr6f53m0m4j2p5jm4x1uxvxvjoz8ekpsripc4jvey0t95bt1yjadlruyvwp5xc107l7v1obw2c8duhvtfyxl7zxhogtz4eag97xlmgqraid0onbtz2sgonjp99uk',
                channelName: 'melk55djqz5xg444yobitammzdovo1z1l943nu1itq012td6cufopr60c3ek2onh032jhocdrao1p11bplwgaqkyt6pm84bpzra1rov0klviryddhlno7k6yyuhgx3e6o8ptmyvsk66n064i89pk3xp8lzxvo100',
                flowHash: 'r1liksmcv5n4ab7wnckvlivs0v9oz2zwab6jeq7i',
                flowParty: '81maqhbiplv3cq5hvpx6xp0ge53xeaqukg9fcfn74eta3pp8ehr2qrj6grivd6hg4aap6v43jyoqo7c5bqoxb3wnyylnu9k20cbj9v28g51zjdye39pqf6vfyico5dv8nxo6sf0kmqjqpnaz5bendn0y5jm4u2xu',
                flowComponent: null,
                flowInterfaceName: '1sptk0e6tgst9gpy4zntw7hxcvivtal9taggj310w8dg7xdod1kzqzv8rr6l1q3sfbvn92l5gnz5jket06tjwz660tg6ys5ibv730l1qfhjbpuo5m91qp7br4al7cmgs2g98hmf9bohgyj0482ydidi81nripe4x',
                flowInterfaceNamespace: 'c7ubaw522odb3lokdgu3i1eb60887dr2hb4im9nmh9op2zpdzsbd9o7e6x7zvchsf57msneuga4i2qpy32xmxgmrcwhb18aukzzl1zcxay3lm55r5abv05bvxjro8mm4opl289izq0nru9stmplwow517vzsvb0t',
                version: '1giiyhmczr5sb3gg5xf3',
                parameterGroup: '510j9dru09ivsss67phay0e3y981mpmzmjij9graka4nfukovr9q55zkpzfiym7gl04timd792nkcfd9w07femw2xyq42suxcg6qd0y0qdcmr7qmyoyeovpy3li6nvyp1e7sz9xz8zb6at96x1om24nwjrhp5ajwmzi7s8z9cdmbcropnk9ozd39nu9dip3e9n1m4g8yelqcigsymsg9ja74lccnc1irk4ooatfg7i2qaltrxdabpnfb7ba01u7',
                name: '09vxqympcbzdc3olsteanf67tg2a900ot900uk4iwd2qpckrq3fdo3aj4goewrpgpj5zpo6arlkdum30tvcthvnmp4yrhgphmm68yx106kt3b9bkwp7qn3j4mhndu5uu5n2ogqsnvp3o0paxmhd6bvrchp21ugccuywvdpkolztn8gs5nuha8dfi3jifmyoetxydz54lgydb5achrxsz5mgenpygtekjm0ieogaqxl53jz9asgzv09kcq7bdbn0ssz1fh9awqu8ehp78vcbspyap2d3h7q2g39svtxvp3n42cad0sy69ibsmgr7mfjb7',
                parameterName: 'cjsf7rbhm0z3wzk8hbhr2jmtlfuualu1qxl84vel7jakf7l75rwx4o9gdqpmnpe35mie7avhpecbfg6mg2q89t7ef41pxok1qw27p3pkugvcsz3u37uvyctgjzel8wd44cip2r5wsobfngoyo64m64jun0t99kkbnh6ckjeraqy3468x54l5sb8xl50wpjnbnapjjsoo2qayinecgy79zay3zpchdc8c7f6kje3flns4lfzzs3ysneve4gc9g6thum53iq6wqqvtiam62rucyyo6l80s6d87km5e70e4o3asumavr8bhb9rp5l49qc1g',
                parameterValue: 't34jq0imw1894mwdz8ox00mfkpgy8shpd588i5dt2u30xv9iakrsjz34xay2r2ev24wcxqzpbj1k5gvnshtwwd861jkxh54s8ffqrh1zhp151l6fqlevnslywr10l9dn0h3l2o6m899b3h4o7afh4wzvurdk881qwkdlhzd9n09a1afnkgpplx1ssq0elot01pn5a82u8gpd24ose5u85lkfro0i5n24dyag1rfj2d9w8h1co1zqbfnp9usqfa1mvpel1a9ynbacd3s7icrtcr1fxu4amzi6xcmemgvx6hrxefq64qfghaa6ti64hgctvpogmbyo77wtbu49h9bmo7zrzzrac81zwc6oiou2989n10atdrp4flpohkwpxzghtnyq60zcossf7q9jvp7n3srryfjj9tkrpqzxs753jt3vweqm8qh8ey6gythc925gehl0v555mclcuxaw3zaozkajonazq28rd7ot5izmkpiaupjygkuldbh65arrtciir7rx9za4mojoyw22vr54dnasrs2m73j74bpodk8i3i80kczqnfguozghadmdnnvet6r4fhggmednryjw5zicjnyb62tvvknfvt7d93kj6hxglu2ws7m0bgszrmannl7mplw6xvk5drdl26hc9po8h7peqjoreka2bis6aimhvwv99upqo8big9q5uokgxvy9lwjvis75307o4zb3axfwc3v2qf58rlkgfwlmhtseay08xd06sxejqh3yji45zj82wo97ifbnusj5lsxox7asxx3gn8s6e1eqrg3fwior8v4x8mbxwi99o7qcb2eh4n9kb9qpbsujqwyv39wjgbbmjzj6elc368este3qf1ggyvuteo5byw5vzwu8k0gdxwk35gkefw8ww2a6zuur4900f9vedevv7odxt4zvlztgphjmkdkj6pmlzfiorhbr1tcmygzewr04uzc8nczx34c587d1vbjty9syqp7nkt681har18fssjim5ur1z8i4nqfz',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '4nudqhytw84jnmdp9njrvmf242vp2u966qubfcfqs1q1qzgl3l',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'itxvdvl6z1gl4oonk0nd',
                channelHash: 'n9d9iuoa9ljkyi62cbt30ik743ig9q4xc8qinm9r',
                channelParty: 'kxk6i6t776owsx774oazdiuz9r8nklc8n9lcdrry4t3g98yglqcb6cdzlli52sj3r1umbws97pnjbj5rlmu2zvj9wg9gzrtdg62drlzwqmn2oolabg9wzm9u31j48ofv5uq7nl054dxgint8ur3ume5tlcvbsl2j',
                channelComponent: 'ghwaoiqx2sj8ayw3xsbhjs7j6cwdhhzuv8xy9rznr1grcuq3ci5qxdvkm60k8bv1mgzmlzhqg0w42vpsmg4auh13pl48qpxael2r0z02fn9ouhpxrkotwuopswzpzfann1zm1ere5eojousfh1hu1k8smopkrqhe',
                channelName: '926pgtaybtqs9ox71c2hi8o63sq95bm8xjwn1t4z7ir8tz6g9u67hhl0qbjshb4s4vvr7zxglebyi5jcy4ta0y9fmf30ftkzf1i4mhh4s490jt79fb3vz3uhchv2y2por1ogysxq92vab8siiiu3c3uiovfn8ky5',
                flowHash: '3bp3180tum53vj5kh71wen21uyyji1uyye3z5pgi',
                flowParty: 'wl8j85qgdj4ex7b0znnlq3cjjcv5p5xu1bzias908c1m7oxary4niyaoqkdhoxf2ht8lmvlazxt2g6itxreu0lj708v7gbi1wehp20vrv1c2fi3mefxr5irc51q3iuk0lwd1da9klp5um2o1kn3p0bnj2zlct8c5',
                
                flowInterfaceName: 'ynvmzowsln0ukqypcvaqxy76z9eulcyl7bz3qyggaggn7y0i2fzdn5aa7cdld8o0dywkl71fbgkcan1dl1dxa6m2o7vofxmto19hofiuym4ujn73qmrbnd57mkxg64kvodbszq21h1ix37p7y0yz810bxeeyg6w7',
                flowInterfaceNamespace: 'pe1jbjilyzf9bwurb9drzai5q3j51x2na0wjkksnbkre1lt46gfluqtbedmu91ry9bf184foh509utnhko3qatn4w07jfx0s9zxfd9xhh2sgcyozdgaew3wna33xc1rb0ipb14nvbgdp1rosfum8we33ra7ni9c2',
                version: 'i960ergh35w867zl5kcf',
                parameterGroup: 'xhcbkhp7g21yjh9v7ogy25q2ju71f3lv4j7bkdpinrfe7jl9kvnh82errhomfmu3k4rlv2gpri0yela9virr0ub9eyyc1iwxarvvsx5erq907qev4tznc4zmd8355ntnjgybmqvlcn8age5bsmh6n9fztz2zqae332mdg00y6ghnixjd76316yr0ge3v0xlmcd5gkld56sn1ewore3hr6fpkgvkyjy6z3ztfgmllcy3ocg0oafcpdad1n9ohypt',
                name: 'ebyi0axjobp9vc0uru1fq1dl577dpdusxbo3ebw27lfe44clmoppt251dwr0dj0xmbz9sgkk0fd38lani4b3zc2hft3seyvmvson9x8dhvauq4ky4gdisnnoivwn9w6ajse9rywsajph3rka3qpta6zxbtl5bekbm92vyvu4cku1xkgj138tx2r9xe71atw7enf19mjeg7mxy4624w6xh9kv9t0jprrhk5mhhls66uhxn3u9rt5zb5g003fuqpmpj29fab2fzdadlcv0m63y5ji3706d8bldr3sfgyv90ys0xapfidjbxnjhamzjp0wx',
                parameterName: 'hts4gx69cpi4t3lcgqxaxcjao919is4s6q2kpjninfuu7g34mj0403f6pg0ff8b7w0xb6d8aju5b1l13vnlx53irbmpm3mfk4awt3z2nnjhiqt2f285ls4t5al46u4sycas0zyjulvapd88kpi9rm24lq3biqe3bxoeamidpd953z46pl33kp91zeq8t8agp67j86hpg525dymeyz3obmqnpbh0jivzsc88xsk7k0w2pg9jmfszqo3calzygx5v1kzdfqkpzp4yb08whi9hu5zdf3t8n62c946bfdd0k4xh0dr7ojmv8ebaj8yxzm9jt',
                parameterValue: 'lxpkqosz1zmrtqoo3tscc3vts5c4rkbjppb7y0dgll0fsxjn9k9zq2d0mxmazirwttw93degcasy2bly02x3pvd2o6be5w4tmdiwspp8xmg8mlhxxe3nc1rs02dm5wlvwumur3oyysbq61rhj4uv3ebpqidqii8yjh56idhkdqrf5m8tkei4sxocait93ibsh7tbztg2ffhnkwqfgrd0lrpaigurxfhwfgw9ghcjdlle5sdtzkqtzs08bz1wglwtwrt4as81aed5ljnkugdd25218gpc4300cwqhvnsn6xeoy310vk2hpap3doxb8urjwrh1evi9i35eo56xzia7t7twdsbe5ip0mw8b9w0uufy7iyhgwwh35ey5d6cnyi4yn44nsfvfgbyt2jhgbt63ansvm3tzqyzt5wcq80hre9hv13ahosqluyn91yw9pw187i1vjltzto0z2p4p7z6rlczm3jgp2pqzf1g1ukgdqwyggnb8gdz0zsk0ed0h28b5d9qa4kypcbkuy1cc1rnj9v2e925mqsy94yzvba2wshagsg35uwodaf44b8ws21qw6lxdwnpsl6nzv45igzrr2oab8c068l669lg43nepffw0g2zx51per5p49bk2jsckbwm7l0nvc5n058ixh6bhm5tatgshsnh8xw62042znfcde9wfpa1wztdorzxgd6rd47h2s3ssxv72h0y21aoikkmxa5ouz0utf07ej69mbjirlecrj2wm3g89evgqmbbcsksx29e9imh3unx0i22wwsmohdtqbphe5phlq356ludkowetot252szejs9baogn4g6jwunuuvwpuw5e264o9rs0m3kw0kgf1mrvt191qju6fmjawgm14aqm3z1ppdyb8myk1yls7ufohdyled2vgpf90rw13syiszg0nnkpl4slgk79396umncuqo9q6dkfbkf7s66sviawau9giwwbv5535ra67oxr2xu17x85entqvcz2vaif18yknr65okkq',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'vpndidw6aj9i3krq8cqdmx1w7gnauqrif6nf4eeoknc7uhv0ym',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'ltpdrrew9k5971f5h09v',
                channelHash: 'kz1u05foryf0rwy48bguidpwayi3d1flioqdbsgv',
                channelParty: 'lrhpzdffsseo4r53td5e9ryztlkinda7rsz29mjf0uftny2m9lz6hfhywuofdy8zt7e4q32q8j9p0tkbb31ritwmpnt58az95p5r2g05h7fxylu9ctpjqx2166lnk9chyj8gnjoz2qudq4yd1raksc1wb5tcfq8h',
                channelComponent: '10bzz1cz6ikj9l0742sp2iohrfq3zlz1s5gpl5oqfha8o1nj3jau3q5wj20wge4u474421h61xmzqxq9g9yn8w2b40i3x442cvqyyno3ymd22bvws2gybb74926i0p4mmiprz2xdf6do9mfujw2adx44hu6ybvmq',
                channelName: 'uj7s7ctnwks7dd44sc3sjyrk1iesjol09hgun1grlajyw57tv8nm0sd6md5sbhc1yerpxgnclnd7wfhyof7vyg499gx64747c7m3i85qlshywd4c7wyo3pd5lkjiii2njwy5sj578fxyjx6w77jv5rxfkb3wftf0',
                flowHash: 'm9p787olw6b2jsamzmx8fi0qe63ds11pg13rx6xu',
                flowParty: '6mmuxhenn4q98p2t6ogb8ffnal9mv7l80e29p64cns8tde81ealp6o3tk05k3hh408yf8ladv7fqi5glk6a544ivv2url6wq4ostd0lvr7fmqhd3qu8r7temlm5bc2eiwxijn13kpc67zl3owy6l1pe5sr5uehu2',
                flowComponent: 'zu4qse1abbkhz5votux8jhnveal8az08lnlq911qsqg66mslqhw9bmj709l577fp4iugl8t648lxv8pl828h994zukpndi4iv7e8134iymty7ah824stcarl8tlc8ggh3y1tans2c5973jufl6a4a551ilcl3kff',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'mdn9e2hbgmukcsegi7hn1uo8qpf6ekkmzgvrp8ujnp7hf29flzif3ixqi9dkf7ed50w82h18tf73fyfs1qucl8b7rurs0fkfa0y7068nnu2x6xf0bch8cclq0c83tfng6q8dohb1e1ps52vcjtd0w6to3ddf3nfd',
                version: 'fckw4d1deny2k032xf9p',
                parameterGroup: '93dk6uwphsbspfvjv20jqh9vt6n7h7g0yodcvzhpyxtbz34usmnwhye4y348p1yic2r408nq3ydeywcrn4qymj4frawit2rkxurh01hk74ca2bf7mkdp5vw8xtm6ukisokjn1s625w6fs8gpmm8cfcjigdalh4kqlei7bttqlahg9o14fm5dgl77scrxuiolcnrqvtxhilhjw93m2v4k4uniwizem1dbuqctw42tlm3ld6t0j6n3vbmaozqbuh0',
                name: '2l2hh1e7g929a282bs3tq9h54lcngfexfuqvhdwrzgptdb99hs77xyzj605b3lj67n6u65ljv0zoo6jw1f92agnrzcm4u4tud3itkcxkg443wfsf8f19howspzz81up6x9og8txooli0vca6q7zv6iilhxm1zbmx0oj529h5srx71itlmum3ebqiw3gyu7u4wsju7gga8xengmn1ikyi3xnj4yahl1idx1qur10k5ro133zqhpjg6k0u59kqac4jktoi3cgdwbc85qg40xa2kwf2aav5uk7xnf0w9u8w7r5ezfw6mkjiwojm6bt4r0w9',
                parameterName: '9ah1ce5h26nwwi97hgq3xkc31oj3z06exjqbuw26nkfw2uikb0zd0jc6rfs1uzi89cbtsbxa0rms4wvvsyfkhimcg80r6v5jp1bo4tryzxx4ma1nldgjandk8l022gc95s94oao9yh5dyppk4yaop7x2ljucw9e880corixj20900tujjlgpekt7pgh29jcrly9an20z4kxkso22wuuwhrir6f8trv42p34qby75g4f7tr4802kl5dgbqwjc15lfw3r1zo6t4ko01kke4pymz4mctk6k2zqymcpklv1b14hex4rfnmttajsb3d6wu0h0',
                parameterValue: '9u4nfw4jzr4nwl90f9a2xs36cwbmbjgc53ekodfefy5lf88rzccapdodjp045wyeuezee7o2suefn8femyqjfbjuaseqcwyan93nu3nczh3v80jwk13jzyn3nqrjhcg0r65jk2famq0w3wr4ft4ylo91152p3abeq27eevh9osdimr52e6lykm6an2loa4g4zge5ddl1x5bt3mqhhoqni6cc93axpc2fy44ztbd9eujvie6ulolfb4ry8bp6tts97gut475uqbng5h8ltc55v1iy3s0t4y2hwjzmyybnto947jrdhm72n011nncd7pihez3vkco57i2khld2pzg99r0m2zxaw02ab04ty49qxbv9kfytwdrei8k1dgy0e9d5yf3y9aer7s5wuanc3iugjqymfp66gt64iv5ag8kny3c303gzn8vvs6bwh11g84tadxyih1fbat1g12udjbl044tqnwwhyifop0uowv8lwa7vcyue9lgrpp2ows90stud9sg0urmwae45e394jswbd7k8cuibe61jtkm4viview6piyosgz02e2b0d8n6xbmkspay87ftsfhs25vfrwhm74f53ktxudbplm61etzh61mr52od2lbsrfai4053e4ianvfscz9pdxl9ryb2700ikz2ai3hl1bgml6mkduscgrq0euh6rx67es3d1iwra2b7nafrx74rzeqjreo4daz679c1zyinuoebne24q3vuhdp9nlm7z2q4p1bqo2itqkxx7cky2p1qjl46bcba87qq2xlp6z58xcd0ru5wt1d0mmdk60zwaa4acvu07idtp5w6uhiavx6v4nypkwfhpefnls669y5kmxmu2yyx8r32i650pmi11u8m3czbf01xxv8m2gy598hngghvp5f0xidpumwvn9io16rmi3cgngzxecxlu5nsfi1mhgxnniffwhccaxwrj8gh91b86qp29ien9orn4mlesatxi9e7t12exl53h9fcvou6cnf10nkbyxb3',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'g9xx0rt49n83u1lck895gxkgo84g8pc42fmijhwa0h8zpeqnth',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'pzix24d4iktyizk582ls',
                channelHash: 'axdir65raha4w17teyvcs0rnh69umyn73ky9xecz',
                channelParty: 'ww4wd8nio2ukxf5vl5woe84j11d3vogz8qe6e7rqgjyfd8rkylzjgs3fz9vnulk6u1g9itneiqm5nlhingcpbp7yiib6p00pwi8k9ccli2ntghcw9xg9nndwvu51r36r8tal564y8y3hq0ixkzqmnkswgo7z5r6n',
                channelComponent: '2709fcyv83maq7f1g2j9sa0mmal4whdlb0a8o344ci8j81qwjlb3z7xcp2bbp6zse6v2ekhggqs4mzgul9tu2o2n9ozmadoyoec8reqevyickaioew4ewtu98md7rqmlyw9nmg6xdktr40fe409ujshqylvzyfcc',
                channelName: 'c677kq42py1kglmzpxch8wnwv5rhs0tahhvnb73u4cg03gjk2slyvaym8332413texidyerxv4gssro2hf421vxetyxezikrkq9ht4qjdcqsewd2dbeqt7oa71s9j7pjxou9n201z44w282j0x0saym3vomwz2x0',
                flowHash: 'amv845pgoxzad112ntlphrksr0isktdnoj3qm0dc',
                flowParty: 'wch7m448n9yzss3m94df4dis74acixcp457w8gpyzcty32pys04iswxl2m7wr6vtw5208qkge0abbj4vzk5e71zajm2jbcae24uj7iurztlcpohqbax952pgh79vk028p0x2rw286xubi3snskdgaeymrf5zwu0c',
                flowComponent: 'lqborbf8olxng7f1pfhv0rso1fj3rzc6zi0351l1xmtlvm4dgm4tapipx2u1cnam6ub75c5l6emvsgqf45lxn38jndsxeot8525pzmxuy7n7ca7oz7z99s16m6fns02y5ioi12gu4s91nmzqv8soch26r3zr9nlz',
                
                flowInterfaceNamespace: '18jg5qp5fqz9jnjk5pf056rgabwkz1wchugmab9jid5gwvybfm1ntczbvyf95h4l0eotpi9y9luvvw6vngqqtyjpsc5loczybm23ij2oifyps5iv598d72m7aabb9q3y6crci8gspeb60afcvk0ik3ievnzm4dpt',
                version: 'cl1k2f1gd6o88pvr2a02',
                parameterGroup: 'uhcqyyntpqgofiar0oup8o82mv29dz611megv5yx1ra5tgvx1jpfrqnorcta6lbomz6fqsn0wctyylvi4fa7y35kwlahzn3dsa76gu7fn1is4nuhpxa6zdk1qpusmqrq65ygaz1tty1v7wjpcsr32mb38cpcbjpk08wom48vvexfoxx7s0x6s714opnkx5vavms0sihrsl5k1lph0hf795727gzvxul9jf4hcbjvtkv1et8yba1b1ip3h4ksho0',
                name: 'ag4wjsjk0zgcjwkxn72t0rbcuhe18jyfb9okddfhfsbpgo80z0bxfzbinxueqavoocyy86bx3ulijlebbbszqbg003ph8y5io67qpu5s8hhyuf30npggnmn8s2466mhw9pp1k1nvqx9pskahzlwmg7hr4pmjcj8uxtyy8ycs05cldq1vtfhm0t1ia9514mbi33rqj7v3klpk7mbexkyids1kgqey21hsmaihoij2if73963gio9yjavby97dr30rk057vzqgk49ourcgj4ba7n85huwjf92wr82katafg7ynfubh7t7yo81zv809wz5u',
                parameterName: 'knd8kdeknexpq5pjg9vpewz62vgwuwpi7pawxffjtfdd85j9fbikqfnf4sdfziq4nhe793mn730xnyabk1h84ibn9khzhrivrtrguvtnjb1p0ku7ldxo77m1odpswmo8ylsh8qlysvgbgya5rw8p1ppympm4slcfck47dthecaerwvce1i9lkotbb6py1ptfsb6qeq0sgv423x1jtzaof8djjnm2tnd4ed04dyi20a8j33ji9302rr7zk5tactfqd6vwr0egw7d3d4b2rwn65fzewteyl643r1te2atqzeqvl3gkvkmrzuzfnp15ezae',
                parameterValue: 'gmz6g8655msd2sic8xd3d1vn7kxpsgt9jmui29jabk14a7r1faqfe5echrxige45jofv7s6g3p9toxwxu7mrevvd2tu8q7mry4100n7jmbh3le0kuwkmkq28op3z4h2vit1fwcw57lfc164mhisetigp93jh4njvwxzsaxuc00iq63f6zchgezbtujxqlttd6qu2ioitg6m300xqijbgws5r8200aqb85beuxn3gw0fvt7vu01wvvy3rl6ncco806dcwfdipk2693xs67sj994od6ubf3hz3r2vgq792dqh08szh8h4mqlp1vcraklhz01e8t71h9xowl8rir2y3tc7upk3ee3frc0nhpkba12ym7e7csnpz901pzj3e1vraenczcaw8x1f8lswlyv9e8b2fcb08tgwd6zs2izo8l1ez0a288etohkl7tv6sl39v4gj42sqvaa61n3xhmskg0cmlrvjtfoxvolco37wuaq7w8aust6t7rhxrsuo2svhd2ynsp77cd62sbagzbebujex4xsgmrbldvicws91vm7t2eqbkeid0jczw9gv8u12juqunu5m9mla4vx6wdmt2wv7m89m5i3w6raot0nfpm7r151s0rrv2ajh50lue5fs3vdgsc2pvtgs93svg8g5rbsjjow447oyfth1hliy1s6pe8zn75mprpvcxarv3baeel46n4wd9ii8rsrybylxw2pf3y8b15omdf9tc7aco3tzsb8raurzprhjs2kuo1pvinws96jaccce1vibwv4qaqgw6zskirkhc15pmnqqddh1m7w15a1u6su6pcwhtl014bvlhyg776aaakpuv7tcn4vz0b652ltc6mvmr3figo0x6f0ddqmgcwwlyykw4w2z5yrtezdmcxkl8dihaqe3gwrfxmux9ji9fzgf0onzramhcu7v56lgtck51glb1f1ltjrij5e4v5d9qblgq6iye9h623xzx86b2fw0pg9og4g955xlhgyoc3gxkx2mdu488',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '368dzesvlc6zso7qobu4gszon1gbvmix36qqy5xik9ddu2p0zy',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'u657ytta0ioeizulijnv',
                channelHash: 'wbs43jhkpp4215rjns0ngu51dhhqpxsythxsmz74',
                channelParty: 'u39r2hsui8baxl9lg82ucfrq36jh78o80feafm7b5ql3uqcspd8bgzjuewfxvjrwhfonrct0sk7o9zztr15w5ggmwgw5foz85qite9bdq8513bgkffsgsqof4lycvqmiv0f0dm7ru6ufdj9uqrxvd9zxklgfc49h',
                channelComponent: '16a35d2ohi08ehp43lz8he4epgd23heuhb1q96anmvdn402nbaa626k11s18ddazwaspmyz08e4aqe88lg5fmu7bwu6tx1j5vilcpdhq1zaj5jppx9op6v1q220rep4hpe8xvi3gbx3ghzctmb70c6s500znvsd1',
                channelName: 'abiexfdkh41v5fxjhlmgxydfud2rydvv9uidhe6qksuexdki2lznb0al3e92vl3ptiuiqzoia63t05mnuqwa99ez5lsu7od9dr18i2arj21wplxpifqoc8ur82z326pmpmiem9gw0jjn3h2ta7vdi095433re01l',
                flowHash: 'j28oam4sv78fechmw4f8mu9eys3fkpki6b4cd7pk',
                flowParty: 'm3yz6pfc145rnmyqbv72c9aswdm3jviq9dmns1atu15ftewjfue1987xk6i52aorivkgs4d5aw2jt2ezf1oqxkiorcktxunyy881sgplpgyd0j2pipl5xlas1jgqnyh7osfpzgs63fe1e83b1zutyep2ij282adt',
                flowComponent: 't5m2wlph1qq5dh8179lx7sqd6t8zgk24qwvtg0kigkagtlwsik3rpmkekrs49q7oljon714kfwz7fden6no83v1o603pljwcitjlva11c8nhof5zchgcm9e1w37080tjc0puxkl46mlbq368tgr74eccfcrk7e60',
                flowInterfaceName: 'qkyzmb27jne7xmlxvx9e2hm9grh73pyasg0rs2dxuch8fm9z9kf9xeqrtg499k7gb70zy3gvq9at4o26wy2d6qlq4gvdywjin2yq77xhmrl95q84ubmrgjwfj95c51qwzm6zlc26vcz0e5nyol5xbxzomlc8zd8b',
                flowInterfaceNamespace: null,
                version: '5ped3d2tqw15rnh7i1d3',
                parameterGroup: 'pgezru8cmw0y77785ydglybxtrtu35v15jz0d4ipuxokboe4eyuwkkkbqnsk08ugj4z5kt8v7ukdg6735f4f9xn8s7bjju2454raku3sx5vtpitrrd0zkwz36rn237dnegg6ejmrvzs5bcavabyb04djd1kg9hgbuc8s3s0g1h8hs0svtsg3tg0avlxw821p4yfsdja9hwj4rncgn04o9kjnbujuz4r1t8qpekkdcfzjnoxln112f311run4d2y',
                name: 'uho2yd8we40yuo709kvgpw1h7yqk7it2zw68cxck2g8mkqkfx0s1xtqhdo6r7hi3hjam3wuedvlav9hy49t5qybybuolwosx73pwsea9f5og0gvijgnjwkl6d232thza5a71gjv23di10dbi86vv8ui9f3bwrz7yiabrgz7wx46a5vpzblqsz88u8cpu5zlt3i2kcrudzdfo3ksp8sds29jexttzeloxvc92pj4udseohvuilqtfkma0vdk00j5pa1raigfpj1xs2r8btxkdqnp07deot9lpho0x4q086qaa8huz4eofi8uuw1s8flba',
                parameterName: 'ilu9sypmv4qg0y4cly0hpsk7ihixmtjx6mvaymt1fwq7o2ne4tekkht2on0phrjhk2kh9fkztusl8c98whgl1m2kd279xu4k7jec69yvvitdphjhk4mli7fel8i48qbcbjgs7bjz23xjpq7mxppc1vugxbdyyzzp5bgwg2eo1glwrl0dpn1o0mamtys4l73fsw45xzqjaaqwedu4mncqnl9sj7nx9rrioqvuzcqdt4mdmzz6b92k20dkf33j9yodysjwedw7rr1rbursmjsmxbrme7x67ku1j0780ohg837zbzjcblpry8ouywd9rokb',
                parameterValue: '53qka7ll1hmg4fgq84lp6ku8ax3l0yepsh4p20mloc5opfqgmpdpxzxszg9vhijrymzvfk9jokhuzlol37qsj9qas8z4lszu28gt6d9db5a2sv32q0x553jek3k54ru7ksi7ya7e3kc3ieoxton04y82qak631ewaif6qbek6xv5ggqwrmm991hsquke71w9vx151g91ru2piatn2s7h2oau8iurho45v01hw4zdengvlgtf6m3rzi4xvv4uqkv49lpte35ok4b6fm83cii8b9j9ldr1yes5a0xnut3p74tvvlc9do9rshawcyijzrijfdgstrav2lthu2j9bkik15xfr4338adi27sgd62903822evuvvi97xu7jg2yewzlc0eszavjexizx4w9ryueihhpdupn80azxgincz4ntpg8v0e7izpi9ex5kao9re4lpikezkow3nzemyr515h9be14w6h4vhglddfcb4hcucem2ypfqbn1yehbh79ygkm2jrpa6z7u3quiary2xuahd1j4b0va0jbknwlfhwf4to6zcsx3lbzbt4zzp865nhnoh62x058qwvbgvosust91kpwzfw4uxvx87q5ddmfmcqnqtrw1zmzu8wu7mrm1969ppkxarfe2grwujl02vdodnekhgpde9v3gm7z4j53swev44or8rkteugny29qelvwe27f8epibslmxfav77var8ncgsxheomwkr0mgcueqmiw5o4dry26w2qiz0jjtynaeni7b5duxwa2dab5ny0dsf1rsxjbvizv7vjgai1g98q6eohwuw2qvyy7tkc7d2s3hx64q8uabncc3vvjlb98mp7akgrqkx6qupzzyy290yfj5powasx9yg4xkivwupi3fnaazay7o0zf8wtsemlqif3rwh4cysztpt0nri8w6uaymlpum0h5f49pu5wc1m0m3g8a0c586jr0ylnv03wwcmjok031j0f96dfhdnhmqlmulitevz4yguymlw9p70ukl',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'ccvp6m6173y8lk9aj4cjx5b5l1uzzh3tqzy1rizsws1td6y8hr',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '2b8hj4mcq41345cgqwqx',
                channelHash: 'pjrk8jd986o9oqys3khyxv1w05bfsyp2ywu2eown',
                channelParty: '84c5y47wupfmumhl4a2g01wohm3310xultsykfwl1zriioqlsm7in3tldabdbudjjlzf8oc08e5ffezlqg9olk7wdx0pixgd294sll2amcc89rbk7sqi2g3f04fftqjntfvfmjg4to2q6ebeh9syc0xklqxzx9vx',
                channelComponent: 'bd686jft1iv4771c1sbaqzukm2bosbm4l9yj84cqedc29il6vneiim0jpbqd74pqo4f64jyrbm46snbj6pab7apjqypj0b3xdw324mtbk295dr2tahwygo5uujlhpvchr3a438yomizxq39a9uawgvxgvtocab8n',
                channelName: 'nkk2vcauqe98t5rbqb5qr8ie71eb9gxthl7aa8r79t6fegym1chxuvx5snecuz4eprbhigf0b5v57ojgwlz2fkknr6way0zkwvq5oirl3dq6s53l52xrovki8e62uke2xryc3pq35pe858z1szwrolyri5o866xc',
                flowHash: 'w7oeqnnyv8y5rq7acxeduilcl4b3zqk7jbmdhnfq',
                flowParty: 't8y7di54dulc2sepwr5bi4eesh4zwo9nvbphfpxq174xpnml0lq0iiquy7ifec86u83gqxxsf3xome3pfq2healyhef596o3i6rvleus6884mqldvblb140jipk9omy2bkwht1sn7xz71upqgp2pjuyp3mgn5dvw',
                flowComponent: 'eawxg4snzjieeladlj3wfzcs196intt6uwgp7y66uypgoydwp0d1tugbywrlaxa7pg87q0id12al6ozqx2gtx0m36rzqlb86x1ipfshwcu0orni00ekcp1pbpolsmvr64jaj9otelhwg9wlpwjlj5xjsv2h5yz1n',
                flowInterfaceName: 'n4fpi9m2ktf4on7bntm0l7ikgfdfdnlpzecyzb8eqww9mur7feychlu71h337p7gsm9xw6c83dv4s85tsnjqoffkwf37cabgxjw6nikomm8uh22899wfe3nivac8js01ai4xkksdf3qshbig374zgtlry2dgihhj',
                
                version: 'ivd7zv5vpcdhh9bid0xe',
                parameterGroup: 'hd8tkh31r6zfbf8556ozh5wobrtjet23bp5s0tjmf35za99un4na0qrbb94m01qf6ihzbd9qctgszxit81v9ablfzxknuzh1t6dwig4swoycxna1614ed1c5wgys8qnnf6x074hrd4xxw3j0xdu2wlhlwdt7upr2cr8r6g66nu2ma6hkt0salsm5igug5gotf2hy2d54fm5jtedizco0ixqibmatko94dfjid9i4ihqu289ga7nwuyb346rhh2q',
                name: '74ktirl99mv0g25ef3rk83ycv4fmc0nps5ni35ku3eqazox4cs0y2d8qezwe1rhzm3qy7vjkkhsz5tpo3ev1yguj1ze16f1j2fr9y27u5exuqp1wlnbbq2bjv0019mfw86j3rymyybm0ocms2y14o3xf08myjyt88xhhoebg9oixy7jpshjo9ewtra58bc0dcac7t5va4jza3yjqrp896dexu3zfx7oqxx3gfp25c0x6f0d9ba5lllhk3umzbubh71afuaysb3q7jhtn35xlyj7fsf6kcqgo8lvmzioiyhqx6hj9zazvns40rnmh88an',
                parameterName: 'k8dugthf3ngfobhw4iuahzkekm6gmz1iydws0l1vcy6owo5idp9mdjuz8w17z4ldqbikrbpsjmrgthpz5vmu0cmn3losswu9vzd8jzfpc1axpy9kfazomdwjegpdqya2sx3zcctxf4sp55r52dy2bwf5iwpnvwxx3fec31rt0slp3l2ml3rwqj2zo5zzgl6c5ktghsxk6bpxj1ebgxd0t0eecqkyoxab08ez8tfy93izkz1tlguwkyl26y8g1yog1av2qtmjmk8pjtr9bftdpwne80pxj1uy0tgeq9npobtwh9ppvr1t07tyjnn7a0wx',
                parameterValue: '73o5kue263hltwdsyfsczup9wdktwrjdvir9j2r1vduy3fc3x8eool7s0p0xoqy9dozb17cj1wnxmulxlcs4a7rdtg7jxce5q5cf5dxwil4aqzex8jidsb4jcily0hlhoa3ccstw03mnho3zq6uazcht0anzsvwmt4l73osrs84xmgd1f13om2t1uov7g6m30bkuarbpw4eo47epq6hd0vkegb8rrtcsi42nwcqm4ew40aokcvpu7wgutm5jvl9lpx0xxdcve7cekwk1lsyut83wqejnanudgn4ijx7bhdb0ia27rfynvslosp8txt04icqvhrotbs5kiqfkamulwht7i2ax6p25x8tcnukvfnhgmg2ckdfjpnorzg1bytn2wdgk3vtclyqrl5wlvmzk9f0g31reljiwtwivkhzjsumr484fgttsk0955g9dbspbqof29goczypsqgqqn7e9e7sxy6oln85kfyuzimorj8va2ec26jbwangn5n82ejen1hxnt5r9fggaw7ni7s8j0k400uxto3abcv44c71c67ks6ebxi2nbyaxr8w277cdtz2lwc8kf0pi6z409e4vfhjnra37lfrhukkuzpulag8fbhqmjzlfsv280yr2an5cf1jk170dyynyuaui6n77fpecv0hmizyy32zybel2f22xvp65u657hj8m5y7fi3g9c3razstlsosn7nlva2wxv318htf4blvwovw9jmoi1bsqnayilb9bqhgwzpvidnr54y3z1onwza60jubfqw11wqjfmnht17pe2zuwv4ljyupm1pinapu9zjgaseaqkrwd9hkvkz34yvirbwt48zn1htf2alnk8p5mpj3c240714kqb3xkzxcpufdu6gxdgu3zbtbd67um13h80vcd97e5luxxvjuiyimr03tii6v8ods3zw3ytwgdtkavfzapwk75607x16nea0twckwu19nhd4ji6fcdtbs2q0qf6wcu5m6tzanvdmepniuf4t0xd3qu1',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '6lzz2jqn8aupkkgvqd39hlivskje6j8caf35jw50ewp9tg0rfl',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'seuopx21fkozs8x8tkeu',
                channelHash: 'dmoz32pxfxdbt2s9zdtu8o08m804rbsm5l9ifbpv',
                channelParty: '9gmvh8g15ys9m9vdrnnqwjylvok0541plyqhexsjj8x00t10xvuhn0tro2evsdlx6l82txyttysuogomn42tv7spnjalh79w31dk0brgiw6aet61j1vqqg4ylly2jlitzb2o5y5ngfkvi2ve5wn2d1s9y918om8v',
                channelComponent: 'bdmgn54njhvjk8vqu5ilmkmucya5tczdsdnqsvm7tldhfmbf3fn3x9nmzijn7wwbmyj60yybu8cfnwhv1dpd392yx2y6qm72a98dvwr4jaiqdhrl6ymcr9i0vge1u4eg1rhl3jw99cdv8np3c82nwibzpqewodh5',
                channelName: '7ucagf2fhafuvp1g3mdgai3cnaonldit33vr36rgbok75ddkswpw2z9fwn45ahs26lqocbxxbk2hxunuu9czxnlks5og5603a7fai89vqdwloq6fqi1bgewc6reuqq4nyd335ve6uhcerqidsx5vinirtbrjrpso',
                flowHash: '1b747atot51c0m6qoyf11vborvlfelzsa4hief0z',
                flowParty: '4i37uzu7bk8jffjokjwmhuc3xi64brqv9t6esryfo5hbgc8gkkgoccgek8v7vqoxk7mxvpnyv0t0oqdggqck7z8i1ityvt07fif8lefyl1kce6pfcz03n7qmuscli8i6xjsw1rdsneqihxqiwraq1n0y018da79u',
                flowComponent: '5yfc6mmm1sn5zl5gv39efvjpzdnv4ac14bn1q2gqbuz9i1jkf4i0cc2ogv4ez983nohoquw38lhsui6gi83s8haiac5m9vwo7jfveqpeww340zopcbd4pjonqsngx9ivfkv7i0wt7ut2owlld8s62rkhkd99w54n',
                flowInterfaceName: 'vzxcojm7yijokddhc8glzhhhc5m899yajsqw2vyhwbdczlrdxp4ieib9sm47p778r4mreaamug2sq7udm4fgrzqhfj34os8xkbrwvdh7u8py4dks17robeooc5b1i90r305w33150m9e8wycpz70841s10xlx3rj',
                flowInterfaceNamespace: 'g652f1c44yc26jaj3il8os9h43d9qpqmy2kursn1tf2h4vhkff61vxlshmymieup2wh7io2rsvqcb51w4ez87fryskkaiillj1ptgpmtgf9p5lag5y7d5oxf92rujqlynppme94n6l9t1czxq3h0shb6prwmwe1y',
                version: null,
                parameterGroup: 'eecfgmhzi5tng78hqws7akynewcjeoepdyuhbjmia23lb1bp21ql4wd4ijg3m106twp19qwebcbpyew8irepys9s7251w3ives64gunam7syzmsjgewv2zqltvejmezlyecmc37df26krq4t00ndnlkfhu4a4elfrw3ee4wec3cblgggugvnut01taa1gxhcki1mvun4euac40uz4i3bx99k6k3sl37ki8d25jb4zyi10mj8l73l8mf3osx5ek8',
                name: '19sb0ylzi9cr7ef1wv9ksernalgbjiy10hrsi29l088wy2rzh0udsipufjob5r3e7fhy4x9ag15sef0gckom0rec95kzeqf0rys2lztbuxmufjj4dvd97slxbed6m8fjksd7bd8oicee1xu5apnbahbe3sj045wfm8khrsp8sbv6rvyq5p7zfecla7x76mhgs6zi6kjgbfji22m8tztbkttyg9nriak8ejcc7i6vnffl68r3a0opavu0fe4xo9uo8zemvte1xdgnms0t94wbp758cu1r5aghwjh0wnibj1nu4pmcpxnauqgh00rkgaii',
                parameterName: 'p8so6c5uamiaa11rrkkdoi3a1wy1gisumnhu1x28dhxxi98q0oaomjzucco3ig798szb7u9fgnzp10rl4ysefg5ed4gn5lepsjldofq9omeuqjm48qsxfdhi8r6yxk4c8jqtfdfkvoivv2z81nmrxcng25dboabtbsc97k86imvc2b469n2n1bv6aznyb976dpzox84zbrxkkrfcg5v513lvq78mv7i9yaz4b7kpt6ck0kssebdrbe7gech7px6n0rlcangrtd0iqx0hkiqaldqmo2j5rg0v7nb54q7i393ufeljevf2ybxy3trnjb9e',
                parameterValue: 'y2d1xi0whijyd09a17t2lc5p2gthgqxa1b7kw2zlcilloy3du4ws5naco06gyz6jnjc3rqc90nsncijw1204lozl3qrxpcyyccc5mgwezbcsivo9g0vkrdmlx7kqzotox7835rsoxqei96oev3w69ljdjtte0cxuo6jbmm1rp0r95i23sjshkna1n4hei9ks59m2jbmho77xa9a3kyb0jmd9riqsdx3rl7favsbakz1gbljfvdod7rpr61dvln5da8o7lldp01u1kn383xh2nu3vj16yafcit0e4ljuzf1dz65ddjnsghb3y7tj6avbgqop78c5adrh8nbdrrqlrgpso1itg76ub9diyat0ainvgcw850ylntq1kyplze8om9479k01z0cv16spgtm0ccm8n19vlgr9lh3gy2jtv9w91ba1uvlhxjj2356c2secuctxutt9se30127qmvsfpmk19eq2st6f5h6nea15ks807kjy44o8jqa0wihunvo9vi5nfh21bvhpcgn3rymjkoajgvawktbcoiawftdnyex6xcmpx4h7wwywjzsy7af5dj8wmbdhasecvs4c89szmkn6jbp847yxvtuu0dxxuzr6frxy0ha0lkiww3j1ri14c0fxl5bq4h9631p8aih6jjarb0lcnfor79kxm6pa12mrlf8sqnr85h22ihncb91ylcnik5i9uasvpwslqkatrogyd1xtz2pm0x59f8yzyhgp18d46xhdqfqme39dm6cwzu0pnchkm3wzm0ogbz3sa4621k83y8b7t72mknarz2osaiv6a44ca1v1xsta7lscuaasd1t2ijoddg58ptlouqyg7nnky5eliutl2oxlhxhyp3o5stmyk5wwcxe42nhpxqhkivid1h42m9u0r93efjc19z9ly4hz81d9zb4aj9qukdrf8h4d1j7kstpjy91mjm98ihfw4l6h714z7ouiq7p53ocavv43bdf9q4xpqzcqz9llzy3ax3sp7xsh9tsc6',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '6x0lh6pxxzldgtpmx1yrk7j0qzlndd4di9gk3hhifpcj8ropwn',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'ngkqqzueg2bktp0aaden',
                channelHash: '643sj4o07d0evjdbimbc4g7dyinyf7zze19bi3s7',
                channelParty: '7ww8ehb4oqtg6v37j3ehn4l5a3g9xu2r0ukhftmimpmfd0l222jcvdtgyop4yxzqs3vmarxgyfumh0gb8r3nrdbky9wg1ksjbn5dcck2o8pihm398e4832ket08w8o0av0odzmdlbzn1yigsjeydmla876lj0o2r',
                channelComponent: 's73m3rty7qeqtzfzevfv28j36e2byfus895d62xznk16fqwmodc8v4l83cgkhkdlbm3jaocwxzo340wzb135vvng4ln4hcf2g1ozb971z8tfqocpe0f3emeoe5lcccbfhc988lr1ymd0s2xurwtmwg3nfls7ea78',
                channelName: 'h2s37scepuh8jqbo3vq3e2aeaeqqee3auksbcbcc2yq61km0qltj4i4qgd0mjuyel609z9mlbeo9uqq7x4pg4h0tyis27e7doje13y77n8baq2qr88pu5efwed06pjor3bgtfs36w2k09o9mm37ibvzqs6b9ris8',
                flowHash: 'cwqgvu4mat2md6uotcidodnznkh3d10adkmyuhj8',
                flowParty: '5qd3faltkzj7cyagbmlct5azy8a0ua8pi8tpa4stn6tktbabb6op02531j58gm53eiyvtm2r2wodzf6fy6hjmc75qsoyzvam53zhl3zbnnpbbctbvtcfc2rs73ydwu3bdbc2z4pj210rcyeiarwnr5rr7rdsv7eb',
                flowComponent: '7ikt7pe1xk1iyngrv93ssxsv4mopp9h9s98vqkidns36tnxpa6awo1tioo6f0r7g5iqsb9fzyg7ir3amftu2h4vw0ex2j99ay19e13ayaimmo7us63s23hd7qjvpm6b86qgeufs1o1j3nu2v1edkphlgsvlalolf',
                flowInterfaceName: 'm8939jtv1m0k3rog8us8hdr5whcxf6klt16pe2bvxvwulp10i2iu5kqpnab6j5eanbh7tyz3m7igkmlct2mo4r28tozgwqu3irczoembl0xrkbi79odhkno36gnd8997cpytrynafrs11xf69052ox6q3hlksdi6',
                flowInterfaceNamespace: 'uw30qdhnqvapwvtxmam0vg5vlbk3gtl0p5v8nec1bg2qjyfa8admn5q6qm8ewdu0g2pc3yor4zjx0jgolc52uba2ic0t98x5sqe1hy83qlzny2smtrdt99bme452kdgkbc1p316yx9xtc9qswe98moxcxom17yh0',
                
                parameterGroup: 'p6ibgfp1jk7tk2igqyabyv92rftyd59euswmefqbcgmpmugm4mduj35akvrogesvgftcsadoq9fyf18f1800qfi0sh0vwf6z8f93mjrlhnvnoyetj1z0277p5b9aea06ac8hbehl3icnuhl9nztte1458moewva1pkw22e8j41iyvz3lbp8gn81pqxvwxu6pgs8tw1wpp5eascsdjvzqitz0mdyodnlbj5foh6sumao6c2yvobdi7ale0ir3ycb',
                name: 'lfwfgczci4upqs4rr1a9adt1j3mjhexgbywsobf0h3ccqbj5iz4o683yn7hqvaf4zprrgw3dl67b9qhkskct6px1b1ghp5nep1nn36c9rcs8layjhhip999576sk29vhh048bcehgb3a11toyg26mph7yjpdkuk5foft9ehllxdsrwhn5vojgt2gcz2nfkjjh0p18pueufbgm61sc42xuyg1zrtxre71tzufw3j9gp02oyfi5eb1qzz378eiymo3o82xjragsht7l8pbt4f0sqxktzej7me26j72efkqetzcq8ajyikiweecqpnthdn8',
                parameterName: 'z03xl9oltc7gsw7mhct2ih2uv33q3xitb33tpt6nxf8aazmb44gyf3z1w3ly14wgyf9e5c9k5l0xga5zyg15afz2cqpxufimdw8v3nbnh20jtplnf8tc702xbly53et6n0bhnswufksysmsamyu5oynbpbxn8c8jzjawjqrgzikz266ttze5f4f17lmizck8kyvyfmckwef01od8kxt2l8wkyr9nxcer9giyfx8pubz66d3yo85u7zdka6vcx1hxllxjbxvzx69ng252l35sf82zuw0268kk3aff51cyvicbz17kyd127mkzqv82g0xr',
                parameterValue: '8rb5etr0shq1wujswsge6tsgyij8dpu5gv0dm52oyndyg4seeezk7bxxu8g1iadmrqewtzyeigaxt34jmgoj9k76zmiu1xrkfa7hkh67ckt6vwm64ob6iji9lmmdnoiutjsw2dxgpq35xlce55f9ijvs660gkqjn93yzx0y9a49o6hph2vahj8s3j7942th0bzu6bg96wt8zs86rkynm0cfvlep2mp86wivsln4p7rvblwhdyl9pm43w29v4g1hms4naasle6dnvjyv04r6aqe30vaq17v8hgyffwe0bqegf05jh4t4rcm04g2yro0c4mmf69hdz1c7gov5ac7e14scza6wch7s8vqifm3wr7e4o0ffi9l137yqrbtumcg0a0djknb390coatf52i4fhwq4tcp7kgkbep55vprm057q42fagx3gsshtnfc0oynnaol74ijnyp191jv3gci9q1dlpl9rc5jttmehw7t3uqzswlv3tf5ltpdlbrome91pi6bvb3te0yyk3mhnrlhjcia8manbakqvgeshew0oos59es9jffgn9bezm6d5y6glil3ir8ywqan4r2pfnhvhzft8caynqe0sm634jlpod8mcg177dgs3f6cczu5xx7twi6igwxww6skondg2v5x9v429k7pa7ykxmtdzid1hhthwd8is65s7jepw2ssp3egk531p5cefarib0aav7v2tgucqub5jxjqb9uum6xp3nvx4kwua45cor8ejdelhvpnvhtbwemdxhapf9wiwbmeiwt1qudbbl9h6iildy18ua2z9y6335tlxm04383faskrwm0djtco9ti1nzpgnyfyr8xa5b5vgnibi3dmaqr26bltg5jpm3df9zdt8p6sezmwrmg21x18c6o763ncwvm4asfm16dvux84i1i6wlznm8j5xa8x3p5s6upbk0dsixonndzbb2dh6s40e2ma5cgc3x0qc2sv7a0c6wmsky3cit2z3aodtpp1jg3yvtisqvqqh5',
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
                id: 'spvzp3nqcicxdeoe6rywo2jlfhurddyqr45g3',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'kczu3yumxbw4ebz9s4deqtxvdz082l1vps5g4wsu2qkm9869je',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'sp5cfs8bx7a1c4hxo51c',
                channelHash: 'rl20lamvyo4d3c0bmuybx8s7h0goilg02owphgor',
                channelParty: '9lwhh9diio6x013kbv7xdfmpvj7i7xlobh6aeowb9ipi21iw8hwzpxz6ngrlrg2r3huu1kwaya208yixx93s1fmyjbsm3sk98sfnyw5uh48kf3dnpyh7hglf8quuy27d2rxromgznnffsy4xecpvfivv4bwhhdst',
                channelComponent: 'epme7bu8fci5s7imudxtl0gdw1tppsljy96dc8px3zrfqabylqp2467z87ijcuqfvxd7ddsyglbf823j4al0di5rn09nn2i0z7kx97egl3o29qf695qtkc1x9qjvj7rtxvwkmxc603myie29hmgrz9c4qwibkbu5',
                channelName: '1ne3vbqq2yz94hm7ny0k2bn7huso2b4fw9ju1c6tf7t0gae4l90cr64vn3kd0j4hiw52a56px9i4m7gu48m106pv3m9k6ihc4q45pst3luy11pccg7oc02otj0rgusywbk78wdyxkw3kltc7zxrq4a3hyic29u5v',
                flowHash: 'oxy3mgbxp6m1vb5cez2b2n7mveex5bcb4z5nnwqc',
                flowParty: 'y7fy9kws4x127j421ffsq7xn93x77g22wnb843ea5zr3fsbfy0mb9nj85ax3o6k96deoc23slzpdlrz1dpmo53guaynahlpq8jy8esx47pd1jx741twx4ez7lo4zjizz7ailtmldt0i1hd77cnjml7u0oxbbq601',
                flowComponent: 'q9yk1rhiupk4m9g3ptwq0ilvc2l4kbjlnmm6pa0cdt9r8s5vwmj3sximsilb9bnmzdrfoqmj17r010dhdfphfcrw4fnb8jzvfjk815ntzkerw7bqypfnih50wk3610br9900cha8w0be0gdh1eh69vyvtg2y7fl9',
                flowInterfaceName: 'ltx8vofi3tbmir5n330j98wigd8328nj7rhr6wvq562zqt3be3zyzumxuipgsuv35dx29zhx5jux82686u24w67widxh3keipw91r71mlkbtfv6m22wlt5n1nuweq6t3mfix0pnmozd3boqyqyqduz5o81rgbsk1',
                flowInterfaceNamespace: 'aql2kx6whwx4o80oywa1aieuge1b7tk0ltcpkifr25d1wp6uxlou6a318lv3m6i3zcbfgvb1z343sl85k9sfph38ykzr5f3der9utbymon9usi5ktnv5t89klnh1hl9s2tymhycckss8zn8lxlnhcjija04zsmnk',
                version: 'u8pohpetwavn3laggimy',
                parameterGroup: 'w2q47xtn61ohearz0bv7qrkxt2jy837yyfpx7sfhsij7pxxyv1rma6oqr8cn4flxgdifl4qut0k2h1vyz200168ammuzvao63kb95hvlwtxgrooi9bc8fv55fz7tb0c7k82pcyiqlv31themdv3kgmubb5y7rz4lqxxubrkmls0938by984zudwhf12x3cctsgdyieqsgno0c45njubo12abrcufuadm9ikfx829qi8z3t1tk43t9ti3qpmg96x',
                name: 'tz4vmie60b9cx1jl83mkez8alfgrr36cc7s94pifinkyouafok3j7y95tddji8xlsowegbnvkvmmuydeius9jqfoha76ny7461thlqxaau6tdw6kv8bht4ehlyxng1xfnibzn6n5y7szpizxlrnmsk9gvywhn2qbimmdoxn82flli0jqqhjqh017z071fowvwd6vpm10pi9xvxdkqantsgzkfmpmolg7b8ci5azow9x8g6x1fenfdeqkxjeeghz4ujfl6ywbd7c00h1nzq600vql6kfisds9jpy61210dftyyfi9x3wxwv2v42toolem',
                parameterName: 'h7ydt2dn1g1ym1d1a8b4cwwev1ek3c6m1onmsk4itm60shsxgcxyn0oqz9oysslu7oiklqebjwotewv79xtslafamvzclcm1pm679bii2jhynbzv59eu3c185ebxs7py44ae128geiwb81pxgs6pgs7v510ntu2hrkc6rw60iq2bh990fia41h0uvqj455ng4uy0x4913zcsks64k7f627k6xgm1lm6dxq2c49afiwqyavjdes235xu14f43o1e9za8xpm73xyuulfzfaoienjdior3tlygr7d1mv200e1xo8x21bxl1lvi83cf4hl95',
                parameterValue: '6m4ein29ky69429a2s58ig8smfjjpr703axxou4ir9x0owmlt73y197fyxx01vxhbx0q1zkmu4xd3t9p2hj504pkc9yd3cijncjpdggbdik2aj0oqtcriirw68tubgxx5uxbpdy5bjaace5q5bcspujxrfn3hlscr5mjoakz00hmkp3dkcano508iodq32oily7vner9t6kfxv30s4wmt552ym26kk37jcwudih246kxo1aiamg2na4d8mghd1024d8020lercsdfaj2qkues1wog3s7ww6hfv1jf6gsj20no0uu1ft7tvioldqm80ppw7sdo2tutfgxtrylbmeze3qoovqvxc402e2i7y5u11iuwu2g697sol8utmpnty6m7w405zrhnwi1bir88dga3ei9iqreqblvcskplh21uwnu9e773g4lwvlvtwespi3kzntm4cm28mnsq9zeepm0uasmxk80ma5ojfxxtpmm2ndi11cgaw9x3w7n6big4g0imu7mo7iptfd0tlvxpo33dcjw6cjsflqjjl5b4yspzcwlfqc5f4bfcq91orfra5o5vrmo5pk7phxo9olb358aiiidka64z1z66q0en56b8xfowcbl4nv1cwdplrwqergtjfcyffkjamfd560qekf7b275xnjyqjr2xyuzx331m0a6jyg2fqwqthnicjm3jzoivcd9ljsdlrmkx3ognfbtxyp71k2nbmn8nca92r60yn87bm6bg1zj1z7sltmv59yn91078jxr8i6nnmzjqsvot8l90yj6gqytrgvha4wi0x76txfjgs200d2czcd52j9we4eqbpa6ln2gj6boyyqihvnxa19ivaclm2w7p91vuerijftid9c8lng1tmp1cgr1onxb18e0nownqbtywu2x164k1p890oan4qms9w5v0jjup0ufall4nkxw2i3i2m3zkf5d2hjj2hqecpjfzikpli3f387dchkm0gbqnqjtcjhlfyni35aijnzi3cuw2cb4',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: 'mrrgmj4xbbnf3bd3ngkmdsl316gfxfxlpr2lx',
                tenantCode: 'bttsb7uvr8aq5b362bf3r6h0l4aityzi4u4es7pg3o4ztgtci8',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '9dtgozsc4pyms2sycg1i',
                channelHash: '02jliknah8lqq4e3i0c0co0wrm8q0kmgiwadzdtj',
                channelParty: '0brepiuw5xamw0q7rso0zu4sfu773bpt5dd8k9fc9xnxstir49nsd2aigmtulro2rs9basylpe0w1rpiczcfcbxphla3k0har7ejekr4b8qbrvj8fz797wsjeqwkeqocv9cbxz1nmdzu0jhja6wfl21vr8xazmpp',
                channelComponent: 'ul35mqegz5xk4glm78ihxxpmnuo034ws39t8cxws6p044hcm614v4v9w1ihoz3s7t17dfewek0mcuhaqvn7otqfbyd1gjq0j068vrrw8jtvk358viw9lbhd4achki4023ecbb9ln81fh76dm17kd8ea9eo8mn7de',
                channelName: 'cwcisjeezbaohg7iibykn5vrp238llpcs2k5837kyyzp1povtj6dg7zeo8oolbbqqzvicuzy13qoq04a1l2lz0zex7ad2wbezx8t1rlyjyuffbw8rnll47mgskj0fgf0d0t7a7p5hqezlwa00rm8ls7pgeot4d3h',
                flowHash: 'lteaqq632l8uad8k05n0m73mpm6g2t6yf77wdrt0',
                flowParty: '6p739w5oba2178qbx500ag9afy5youftkeq395gy52tzbntxql1q69pjy8lol0pm7pckrrahvqchqs4j2kb0gu61vd8ugyhmo1zjke7lkt1cb3jvgrwkalxd66uazqkdo7thxvow76z3snt1kqfne1z956shmku7',
                flowComponent: '3h5t80brgc0vsf3gxswaanom5isy2vv6avr88jj94we9fm1k2ganwa8bhe60pt8qjde50042uba6mbr6w3t2de8kgfhoa40pv2ipvmcbg7r9an7nswkae8ei7dn6uxaimtffrw0w852qcbkva61lr98uqlsanpay',
                flowInterfaceName: 'yaav45wzz50rzusskvcswpe0w2aqqgt83g2qwv9vsso73txpst7l93kny02x0uegvr85q558f0mfzd2kc7g9lpcfmcclmmw58rgay31tng6m5k1mng21onc1px0xs20e7mkqgheocso34frbh9z7jn7u8rpo2g1q',
                flowInterfaceNamespace: 'chihd4fx2jnsxsgv0ojvb0ko8mu4uw2ixf766acohfbl5tsc7qs4obqe5lfex3h67qj7cclnbhf7egzahk0gdhcv5cin6luhi8by7dliogupdgp18ura5kqaz5w0lxpefzdlzf0hw3xx2wkozt651ktu9gqwmf1p',
                version: 'ft87qbu1pgz6ctf44vv2',
                parameterGroup: '2uhh6hq9z5bhc2xd5zcehak77ybtui943ymuypv8nyvuf7ghdfgrjcsy1y7722757u6sfdc7wv4vbosdjdlq1wxoi3ept3w0ivodx1tx6x44wrdnvgivt9nk7qie1ifptb6jihrwlmj45lacdox9uxzwvpbtpblpqy8jpv7wpls6pii22hiv28cw1dofx9g7jznzo6udfln7fgtrg0w8jyqhfqkj5isa53qszrn6j6eidd50zwrxv3f00fvklhn',
                name: '4z17m13prgun8f2uxgf4kenwogv7vr1kt82vxfu603xttqfknomsk72ziv5xluunt25wa8id6i7fij0kgalco52esm438gtwjvyi8rsfkp2d37b3qp0mb5mzi2uyibr5p87vtl2wnwe97utkwnf88noymo6p07wxour95z2xwq96jurfrfn2sg7p5t5vo6a50t2kngu527ouwsygfv2ntkxpana3vbaesqhvrltxcik5t9b5tva4nccazckx0gjtl0ybonq5613u2v9tg8rjwmwi0kytcrwlagfl77b0oax1g5h4r7zw8a4zh0mj8bg4',
                parameterName: 'cn505nhl1xe0hacj6my6tylsjihb614qtk9fkzu8xon554eidtbsh6hv9q0x0fee662gbz3ud5qjd9yfieak30llllkz3un7e5mvhbnhaebfu8rn8qiqzvtxo0a0gfjciqsfugo56171ocvldfb7wmcg6wxn4cpidj3b64l9i65b4ghlsrkeayy8nvuxilxlvp2rc5aptyzh64hmde95w2p0ik61wv5eplrmuvcmruambny1919907pihbz7jv7wmwwzsdckygpxaype8c9t9xdnlufp5ca0pe2ppb7dqwa19jfjse2biprbslja17c1',
                parameterValue: '9njgww0bu6d8b4ndrn0kj351b3ygxvb3fqfcbhgjkx6wtaviu773ktrtrf829a0y6fifsxul9syxh4vksociv6c1hzs7kb9n1ezxan46tacef3l4khztje9zf9tjstk7oyvzc98s626vg169njipu3hck8upjnyz7u54kgvxu61jm1jzdc4rbc1qyxvgs0cn9a7zh8lbl5zk8j1ha0lnxokzwxn0o0q0e4s9w0cyc2fpwo8s9t7ipn6vg1a6fuyz7wxr56yg533o9tx1as4y7s2m5hye9ztod4sidjtb1awcddu4eftgjz8txgjlpcl3mauxbw7kxyqb4ww10ng1zpc8ms35g1fvpgol0p9ehwes4fozi271bd5fh38lb0sjwrsyh414hlb18w3trdnjliivg822m5y5g4cvox78jpylmp6wbz9gnyy7nl1hyvturund8bj6lybn01s09fpgzddssxe9xfpl0kjwvn4osfopkmufb314bnhoqdqlawgg97gx702vru9l1a6o3xo5gfxf9t5tl0whguddlcn6n8mtzvxcqfpq080ehvnjgvkeauhnkqnlavda1lj7446pvckybbyh6m7hoc2dyvolvmxcttpiustoxfvpweuscyy4ns0at4fakihl7337jkc2wji4ckxb0au6wgqldu9ji66k7drwql7jx6w9joqfjh8p6ur58odts01mb8f7tm77wazhmr68926o4wlggy56xszg2d4r6hqh4c5hli6th2ishogvub3ug2g1xdojq216gk8g7p1vhc0gpr5yyefi5f2b5cpyit6om0dl8lg4sj3gntnkm7nfn4ezr5d2f3s9tz26cb283x6m55qq3ppc50seldyud9uwk1p7wjbrgj6zdlr562o44sdbl56i5v0vzbal4xv4hxiw85ssgep76l5a4cu989d8spyf2be2bjazrak94m0j3rhfwcc9865pt0975yolcmg5vzhq4z5zk6islb2tuay7g3ppi0fdzd1t',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'a5e8fw28tp9vj3o4i47rjl9ci3zkunj1915weha5tavgrrlgd9',
                systemId: 'nwxel44n5l24crvmz7i3akio2e95aekuyrsyq',
                systemName: 'y6wh9fk3b7nq2tkqjods',
                channelHash: 'l9i7gp8r6d8vnwuge7v1eyuw38y0elkrc53n5169',
                channelParty: 'uxgtx9a4190icykf62dhxiiskdv0gefq5bo4cx23gg0zhha3hop31qwx9zmi2kwzhscfwy1xmthwa2uf7rg2jjzg3pp7xi8gqcwt6yvvwgf5sg4ml8agxn3e66v1nvv34oxmeebnp3hkg6siuijlsx4kzkq87q23',
                channelComponent: '9vtpyz6rz9i9iccjs6lxpi421iggulikcubdhswmnrnye2htqjfgey9d5yny277o7y8ed16uxbbb9tslvn87jdjl0padk4bihdttpvks2fy0wbi6hki0efdexba2kyy6b98v06q3vv0ukwr3t2j2warwjpg80yje',
                channelName: 't2hv1vc1uin0z6jgfdkcpoca54nqbslhmo1t8sv626ilhgk04yoph47h5snimdat57olad270nuwlrs88zoq7bmp16r9ytfjfnk2kzusa3rl2n9qofr0lpagr5qmea83jooqviqceh2d2y3foo9qb9dceegl113h',
                flowHash: 'fl3ttp9h40gtdg8n0h5w5xt4vyrqs9oei7qdaq07',
                flowParty: 'ncvvvyzoj37jh2jf10zb3xtelt802oj996cvrbfv74dl3ieorg9vszeb1apapj3am8mi8si6xhxa5d4lthm98982pqvhadwa6etz654ossd9lk2qebd33isyssotwk3qvbr0ov31ipcicx7cbfjyjv4cr3wads9x',
                flowComponent: 'czap8eys8eht9zp8f4fjisd385izwla6a6zy9bju5xz1wtrh376llzcr3phtgb1p3p678yddyqslu7o5f93kdoiazlkgwsnnrd633g502afqedryh1azef787phoe4vk0zfi7e6lpfojy26nlhewk6uippnljaxz',
                flowInterfaceName: 't28xqmr2cw6d7ayamsjmpqb0vuk1durozsi8cco3y3b8j1ptdrbj1wv9sd3dkr7hti126wt9fgeiyxxgdx2n810szq804b8mwfd90wu39xllvx4rrhmddo0raxiirqtn648toth4q2elnl1gaz233wywijp22pjl',
                flowInterfaceNamespace: 'y0d19y4b6knqhcr3owb86tumj8gdf5r3ne5kjurts9gl69oovfqybftquo9lx3jvb4p28dstne8t2egbnqv205wun1ki7xfe2rthm14wf6malc9cw84n3vkhyz457a8fhbkp6z8izol77cxdp0u3c6j4abrgc3gs',
                version: '9h97vr01drqxzbv1ouva',
                parameterGroup: 'eruxtdciy8mn1bs537ex246nb51yvynj7odcmod5c0h95vtfxq68xgkrzgydjsrf3236xlqsj4bb0qrco8ohd81dcyd8fyzccl8u3tcj8e22afa2ttdx1nffta9quh1guugtr3e0bvid29l72e7vq2nab4nuwomm0k7t6idi1ldw6dzcysi9uix45xc0k28ukq7snhhq1ij2ckejyqvplntii8zki18ao8mnin98la7wlprvx58dcl3vpcoyr2l',
                name: 'l7gbrq34wjtpqe6nmeuls7s662myg7dyoxi5wur5nwppk1n6zor1yxge4v94ndty7a096ltluw7rtoxw1v3tkosrje21jt9vz9mun0bp3qp0e3b05qk9ga7danp31aa7hoxu5wfw3evopmpt93jee84ffmb0cxo8mg6fxcd9ymm6hsgg1d8wbol6mj4dzab1kcv8cxruu5yspcedakpxru71sk2711lok6gd5ejhg1bobcuarz2laosywvny2ipm16cvh22ohoj6v2hkag8q77z0rv8kpy7kn0eynfxukpt4u5pqoo7rnrq9d7rqgikz',
                parameterName: 'lgngphv1y13giz1i41qhlmqt9y7kmauysxtha2a5zasfaoelhtwokl0mrzvzm1vl5z635ouj71c6mfkmstz3dxrqdyn4e6wohemifzmd0wazno3bvskz95xcuxjsl9r0bi54pebn2yddv0wtt2r8nrmlzhmm9lt6d64eiu2lma6gfcj3qcolmgtbiszx408nf4yhasxbvcysx32tlsa24jcnt6r53t6ziqsemilpdrrtrve4t7e654z29e83iw2i7ym1r0inojxc6swk7n69hq1ochn50xgrh34tudy0htmtw5t0l0sdnuktqszzxyke',
                parameterValue: 'gs4crapzd8z0rnhiccwi7gmm2ngp7zj33hvwvrbcd7831ztgl3p6tk7ud64gmwa41mtpsu6x4jud6adkgg5subecgm1swp3vs9f7cb8ngthbscoyae633c1zbhxdclc53jq1dget3wjofawrfod7f083sl7u41dbxn2y3qmtlwz77ojfr4r4ygc2tajnaarbncnmhtgrwkz4ueuzajhuf66lkuyfl5uw6jbprkaj3wed4ohgkagp115ynuxohij75a7jexh3f3pk6r0vsigo5dkzc3b5qflvocfl0n3uj1i0dotvop9pmjqf5dl0aa4j1zbkcz8l2cw873hgn0sw6djto3ovwb45fk3y1d93vpxac2nod6ckpg7z2kc5hagqybx7iw0192j2innhx91hu3au214tx3ksw9n1y6xf7thrzanu5g93fqbdpulipfdn7xosdkf1j69vt2ca49c74euylmitwltes91uvmlxg54esonylckk4viiccayir6xlwrqbvx39hygsv7c52c17rq3b86n6jdfncnzu7b55r0l61foigrj6so5lhv9564j2p0tu9gp5y1qpjqsuguxw5ildcsmxqnmdkszpw7pudgnoqysw72z917trr6hh09knwtylm98vyau30z72s7gyzxxoa12mfytbh3q07tgob70kof4wqoxjc6n6mah4rcpp6c45rffgp7qqecie2eetbvemx9omu4kistryx6t7ojzby0o12cksglvufumjutpxz1a8ymwjv473v1rw9eaf1uz9hm6w07xgdvkmoqe93vjsmm2ttgn4nim4izapdasf04mwsuqjrtjp1nbrol2m813ezskmzkz39ikpa9paez6auw6zb4b61w8qgzu36jijxystnbxdc9emv2xzl5ofaxihpkqpdpf2pfidcdae3whws7dos19ge0faug2wzbj6o42slgrj75kf5gcc5e7le6ccnjur7qkf5txixdcg070zk2y431wmojpuij8llbm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'ta19qd740oqk0mau1dipgqnlpvtb8lklp1akjay9u8dxdyg0dw',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'obm2hkhxptg3c849p05a',
                channelHash: 'saky45n1fn8nm2fofnqlbffcioktb88zgy7nd351c',
                channelParty: '9hxk470qut3nye7v4t803h048l9ve00bkmakq9uul086wo9camowqo17mb37agx23qshtqelo50n29bv568vhwq9hdy2i9jfcl2u22h6xlxeso2dmepr0m21mmhig6qpwm8n1dyla0gq7y9uqcv77miui9jlvyjj',
                channelComponent: 'l3j4qfozokgx0ukvzdp8mcczuqce94408q53upl0cormxc8q48ppz3mrs5lophwkjhr033c8rq40yq5c3e6trv26t89s0lx44c4i2joi2vbp2o6zzy2uctj2rx6hob8bj31mum5uiva22am5ozvpzmys3t1zkjcl',
                channelName: 'bsqrktd75nliwvyglxb4icliww9tk0m5nom1be35jg2u681tl0a8m64do9z2jb5jsht2qhhgaqqji2k8hz3y2xn5vmljgns4cx35keymtydfxqkolnwtua6qvhfhisnlr0149p3aqzbizglk4iey7d8tliu9eu0x',
                flowHash: '8p72xetrpj8q9fv02qvz9zyz0woeqqxvambrin0k',
                flowParty: 'exb18vcm0e4ee45h0a9qviesuaaqz5b0lwa47fi7a1hc21eu4x49twhrg8djszzff9w9xpzv9803ajuprckjn0hdoq1uimv0ut5lwf5m85t9cx5gm3a7ei6a16tk3zwtzcyraay3empxh8pgw7tf1hd98hhqnb2u',
                flowComponent: 'uq30nsyiyt4m1v0m67m9ojrh8izjckc425b2gcv5llfx5dc9pr021nrkto4bu5t06ysyu78euy4zv1xmeg6ovtitk3l60zaemthwwlu6bwh8ht6bo0sv4qj1nlur03kiew4jawqrsu03pbatv0o8p7ots2ntzoeh',
                flowInterfaceName: 'f0mziajv8a2ojo4zsye1u88unn477inc2sj8jrpc3pb9g0sh41rrlv5qoeck17xvsnvh8dtixw4ascheubb4cgoo1tdiacem6eqctnvqyfpw2l08ow1w0sz647cio9xi3v7zbinjjc5nc5f3fsmb8e3m4n30jzlj',
                flowInterfaceNamespace: 'y6tp5235gwwagssvud7lk2sr0fmd08l8ozptxk0barkyvigkwrgpg7tfrrdpcpi26p8yelkvbkuyfwooom7qje8qkv67p482wt592bdtx0jv2er6plx2hslit7nxap8dlqo1o7fegsspnfunvyttwrwdep0g6cdf',
                version: '5bw2e9gkf6rk6xtexf84',
                parameterGroup: 'm94r9l8xihw2o0b0rjq7p74948pbnps8r6u583m7qxe11czldmvqkbv06ikxlv3xxs3vemye6s10b87lks4z95elioo0v47lla5g2okycygbwf9y8m2doxn94trzla1809e3scdwd2msuumlj1hztgt6b1j3m4sk30h2g7gjl3en66hk1hgj2iquowu1ypbt30o245y8rrhlygaqbd7rj1t6lqmiy7y33amjyrrg5y3l8b82upm6i80tepy3dw9',
                name: 'gqzcakbq5sve9x7zs5ajlvlthijrixcqwmo8g877pqduquc9q5mj9t2ndehwvaj9uqdeuo0g2v6rrxix0ke6xpu0fqtq507lgqva83gistiwuxkkog0v42bgtw2yaeqaw3xv8zg2ec46fyzeh3xq43gp71tes4htudteav5zv2pg90n9d90khotikxryxt5ieg31hwwu6jles8ip8lrjwc0hc0bdqhsdfj9ckhjft2een0028mikvnbxab8dhlws7p9pkrev81jnw8bo8enml32nik42vpajicdbr3ojun2s3204be5r9d5x1jm4dxil',
                parameterName: 'devhkma1723ojndjk65ma1pqpa8eaujxkcecb0vxp6mqm8enotba7l5btysap5yaz6pgja3lp18um7nz0zfvxsh93lul0iwzf4l40n1812kghtst6r94c00xnx41myaehq0pxds3i88adgwfk0udl36ohifg7fj5rewafm1ylaaflhn8j3g39m16k23sdc1ysb46fh60szjlry100ltsqdu1aw5e9iejr7zu842leqqrn69fhuh50ud7p8qx0g94qkxrhldwj1z0ttt33vxck5ljinwpwtlka2dvknr1sk01wpq2q78icihi0dq3notp',
                parameterValue: 'mwy8txc07ljrwrxy6b6lc9mh45n1mybsks1y398yxwi7grcere5myzhm1jipbvw1uac6pd68l4qgsyv7alps20r0wqetzp5pxzkkq2w1whk3voy365zyxcqlocisvxfv06uzqlen2faz4dn0b63hsc7w7y0nz40t7uif44tffea9suz39kfz87w42wg4fzapjuz75jpvadsugy96nrb066dv72wgayu3w64xb4ypvpr4basvzoii48zt74u69b4gvdgdjk5tydw2bsa5oi1sxhre4lc02e2rkpci21imem1wxaxokxd9l0mgdr13gqg97f7ke2m9v6uye8z1fucq1dr6ffjnm748e9h79t3mu0bf2niagtpimzt2ju8b78f2v1ncscez5pyo93pph2ll7o7t1e5p9jrh2r0qu5f3kukjb612w8dkj3e4xujoe7g70ylhbs0ef51p27092ccxcdryqyoxe51p29hg1qro11rkb42glt23fyqwi7zlbd1vllvzux54pyrxeu6vpct2tm0w6odydsqvw3rpcybcim9o633lfr7q72q0l111gp5qi798sf7dk2ilkqo05h61ulfb1cqjru9ub15ltp8ebuhcqzxv3dnzr42x8hwug1xzaw38c6poayx0dgpbjvz76vd8lq2yelari8w8dzeee3dxr2a1xaza7onwttz5a53k1ny0fs1cdx7jgtfarxwrkubl288lnurg8o984gup12dawuydmmp10e93aig7lwy93k8x3rq9vmmesb9xu7adxlsxv1ipu7lqqmozxzpafjf0o33btrqb97fveccquhjdms0a8h5gbnndd25hnzscrhgez971lgqjlp3mwc88y5jniyhusdxufav3cw9eu7ukfbdb8h1erfbjh085wvpjwz5kcx7nj5bw1h2eby22utggqkrwkzn3o6nlwsiy61930on9kk2ny30yfh7h368jttmj7qfq6l73f18h99ntyy5ooq2s21wlbq53uhlag3lt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'l12mcgi95qx8vlngw5c5wsg08g8olrecysznl6s9tbfio4a91v',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '6vyng5x936p1cd612xke',
                channelHash: 'nnci2xniypkrlt7nd5zh9bj56oui01y9bksnqcdx',
                channelParty: 'pke25fvqx3un2eqpx9sfd7tagbrxja68wzyy13j5q00v72ymktpw8n8fn7oya7kvboihnieaa3tt0vaj23u77w81c8g504kpjd4ty1dfoapkrpikuwxr7s9pdp8nzz2zx5f25tly81cfb459oz7i4kbrt6hdow5x',
                channelComponent: 'dbbnrj6ia9ltskcnnhn3intlfnb5puvbzu32zjkapott3brosww2ldkln6e5b4meg3mg9iwvt745frw1ss6901j118b59g28xhuwl6aypd4e3u9lkapexpcbtaq9euo88edffoc93o8fwo3d62h5qryz1d411j3f',
                channelName: 'tuukrcdcr37r3x84xx0wlb202rjhvs3udziemszh816pmi4rc72jztulaft9lg2dyxktvodhzokwvq04zpqd18kjp1f75kxj8mdwgl53eq5c66817xymm0p06vavo7h110xq3s6akdr9b79npi3dd8e4tv1fh2ps',
                flowHash: 'acx1emv08ifif5cf0qu4h0m2jk28zg9ddicl0yird',
                flowParty: '8q6qi9u38kq4u48vajuna4ns707ozsldpu0dosr3t9xidl6e2bu2rw1uvuinydhbtnj702p7rfsssjqsdnlwf2yurfa1te1z0asvergzq1lul3vig3386e3g2w9bawjhwm98d6pby32bjm8rdmvk48v1w6fc88kh',
                flowComponent: 'eltpqgegwfsudtx0advqzwvf1fm5wq2k849caigxhgesqr3wave97lhs06eallj7sma4s3dhssh4c1n0kysth4lae5kt25sq0jotlz0kyn28so3d1mwvne5kxou6q77uzwe4pz1hqj6qo75l9syhm3uwotd6pde6',
                flowInterfaceName: '2dh73u7z2vq2dof0a2gp57yc6mlzmteavdwz217z4j9y3oxwue4bh5bgx1kmf100d8ipvxfvha9p5drijd5ji1i125585lyo4yw2dw2e4hxgnm67t4o3okct1f6v177u87lm7xsspitif29nxqiz0oiu3zkdb2ro',
                flowInterfaceNamespace: 'u0go1npxs5zvjgbxw1zj0ww81vwjndor07blbajsscrk663dqdm9jvj1k07lzutfc5e1rt8uaknlifh6oz0brjc88u22am28yjny5q18kh73co6go8bnrxmwf3nsfr7a3luqvgydw3xd67w659b4fzquvraidl9t',
                version: 'qf5cctcluje84m8hilvv',
                parameterGroup: 'f37dbsitv1s1n0tpstmixgqkhsw6la2u87o1caojey897zm4xla3kdl3ytwf6qs5ofjs07e6p6kod76vj6ay5lvirsiuv8zu2gv8riadb8f5f1f1013syl19en95f8r2l2a6htr9rcj0o5v3u6x0wpk3pd5ft2nii5230jy64alqbjlxzv4gskmaousz7vxq60zjddj1niobmddjp5qhacvcjam1gor1hm6rhltcoikj6vzel91kzwoht5xb0jl',
                name: 'iq9m2g2mlqzknn2o73watuexebfowm449j14orjzhevdcpz15l79t7g4fuvthpvqs04tsofvbj2dsixtnp0kb9slj9nyu3cxke139tgfswpzpb648evt1b6dixl6zt2g8006caclqwohzqys9lf8xegx17fv3b551gmffwocihkc2k8umtssszwv740bt2c37bwbyj0hj0zcdi9sov2aynwi971vovkgz9qndurst4s69gqhb5b2rsmldlq1gt40xkklf8nlzc48rib8ji5vu8uo0laxck0t70u6na19fw5vdrjcv97bbiash2h419nb',
                parameterName: 'n8bcow023i246aelqadm6n3zxxf8gkxy16li0d8uansmp63dhp8iyqt5g5ccxxshh64ehdza4lxw6fxydae6y7zrl8wk1221406evrndlviewbdazciqu13z6ppcx8xr8nbpbnp98g6dlh0vp31vegvsnjdu089xzrect2th920hvdv0qjfcmvcdsu2d42iysy0gbm0i3329hh0a2bg8lvhq7y6tz3w0kbxmapv0jdmxrts2zi4ppb7nbx1ui94cfsb2rxars9szpj5ix0984575btmfrl6udg40nzne677qlhe1al277tiic1qelgv2',
                parameterValue: '7pjowo4josrw09s8h98w6rn8eb1ojhjlagqvdewz0iopoeqfelen5hnn5x0txhpzthznqfmnmmu330f46zagnji8bm9jwh23dwx5we44v63a3hvwo036zdvfhzffj03l58ggtf04zoak7pdsevwceoia386xzll6g5yxzjjadbh44mg8sc0g7zyrroy52q8na4yrtfvlf6pmwd02vnl1x1j0ltg9hma4rtu9ujdvain2eudttxh8dd4w58zogtoq0ljhqklmu9uy9p3du4gjrz2kxltu72ph550xsk22dfwrfi7yaz307mtqmr2jz5sodz0n4yhatmtwq4saaoi4latkqcmy0uwzswcs0296f2ijm2thhurxdg2xellpdhbuafpumn59fw1r85pez70xfwrj3if69sfc6atqaspixsizwkis5bquyvhkqpdzo2drtdkgn3ke53sgg90neypyf3kohl4ekhjzuz893j7m1l7htgzmabiitt2dpcdbasnjj504ln457awlhd7w75rndxsbu00ojy7ujd6a4jw678w1oyiytjba3ox8eh4naqnjcj2qlohu6sy3vv5i4qpj6vrvdqd6sjebqncemrugxvyth4a0blqlrj2t1qzs5i7o5kgqb1mhzpzvm5civj83uvxoo18bltfmmtzz04rx1jfsidid17sxblce1qmykj0ygzsmef7wo6kazllucli1nx4spskn0ujco3y43bk2xd6v33pyj7mg7tqcobaeydenkdahlnzqnqwq11r8s2pvzmg9yhjuzxun7xgmh1bp58g888qyaq1sqc7emxwpxorxvkjlycxioc8d3z0b8ftsteof4h9ximurmfbhxsbl7qwjav8gfzdm7vtjhojsj19q5h776pw1cee0msj0y49ndgcbc82uqc7ykskdg3jl6zdi1ix0av9qdob25lm26sxb6j3wooezqj23cie6unyrx7inr9vwjvfoi0h7wmbgerj7nb3yi4w99h0mr4j6c1se',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '1givja4hoopimiw8mqbxbh1jaosvwyh8lxyhd1gefrtb4ewcf33',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'nyb6lk04pfl9lxid7idv',
                channelHash: 'jdzhhrcdsr9d2n4uikqwia2babrp08dfynsqz0ik',
                channelParty: 'wan8kuyu74avb6y4e3r7cnq7h56tnc9xiwqiwvx3sdz56h1rc84ooak81aicr3q6uxurgkxu37sd5c2awf8ks1f9rt1biut17uou36rof5cn5emj3wcd8stcknrzj6zuhfacmkppmbctvmficg744nvxdtlv3goc',
                channelComponent: 'mojsljwo066jurn5i7qngc1n0qsstcqszrat6m0xiq4rdya5cwzmrth1wqq7opy66rpwlv0zxgcseop33mczely7ablh4jsorgzg3a78g0rw1frmbpywohr3vdz92qo17piq29hh0x3513s0ajroy0fsb3uj4ij0',
                channelName: 'rjeqzhuzbol6tn6ssrjy2834ae2vzbj2g4ysymq13cx1iho00vmhxzy9jrumkb3nd1o5hes0k7zuy6ccezu1bc5226nlshair57w5dc0x7u6m7m8va4i2nzexk60kemklitwimdwttepj32sp8o834xj521ym94k',
                flowHash: '6kv4bgfk1eumhrr0nzionbhfz97m6oimpnn6s1gw',
                flowParty: 'hgbmld7jg2a93yvpuk047unkuwyw345evmgspqjd7cie2txn3x4c40af7zva6y0phhden1csu6ccnowpxay1x0zy71yfusxu0ye41di3kon6z4gvgu04s3msu04zelcq1gbv5ibm7lmqzsurehqo60w0d72qe90y',
                flowComponent: 'c1zo8t3m4643yjk20aczueshh0lng8xbjg6548d83z4yv49977orh31yonmyin1mdinoht0rlwjb48k9g0ynwjvfs8ce3hkphh81wk5v6m04bu8619s8xulwtwe4h5lvbazw8cmtch8fcsqwy9rvunp4j2ocrf8p',
                flowInterfaceName: '7o7pk4z3ckn3mlc4rodgrtjesbw898kpbrjj93sxq96v28j50azi16zlge9gxwa4jydveyybpv835jcuoklf1r0ab06cspbgorsuxi1mlf2wxl81tllqrw9rwjdvqe4px24s1v3pm2kmhtdkhj4vd9fdllborcbq',
                flowInterfaceNamespace: 'chbb0dwnq4ztamj7ilys3bzar8zmq2zpcvn7z6smhlj4mfuo56f01ne0d0anuhclyujasqm2ya0m6wh4ccigirehonazls01m9dn14o06vzzw68hml90uevhau8pwbjdxfpbrgzcjk7t61cs1f1bqxzejnruyc6n',
                version: 'u05up57z4mlb4hx7nbkc',
                parameterGroup: 'grnteblqs5utbi4eda8y5bs5qz4n36kp6tl2cujla9d4toj7ch99o04l5bc0z94bm1tzklkflbcfzajds5nskic5blm89d870fp9b3fsjw2ye4gu57dz4vadagwmzz9fryg8mxvp0hnr3znd3xinv8faq2qapce6rdpc55wqcba4yrp0eyqvckfhg7g6b7t38xggedkv9gqjyhpqwbdnzd7btmdwac98til4hncncgpers4p9jdbhpyj426ys3h',
                name: '58g7lq4lovwvnt9j2wg14f0lpv1dznsl0y0y8icddqwgv8flh48cbcyxw0kb29ytwntxolskck0z28ktam5zck5ximc0kbdkw3hdsr8yaide7fezbpwjot9nkeo82se5op8abdolcw9xtixc7yzbpuxpcs9076qmz71yw93ovdbkdg7nagy9wvaezz6z8fpyu6o6tjdp0v8hle57pn16xc6361e3fvp1rzt8g0rvzz5ti1yzp9cywve4g94ilimj1j4rppg8m38izgigatp0yzem579zpj4x22jo9wfncea5i7zbdyxwzdet17nbw537',
                parameterName: 'wipxdyvvrhqgmzaxgjzncypa14oe62ur5bv2tlnch1bzye5p6w5rdhrsxm9augx7nt5el6ypg1poecxjjmsq5hbq8kb53qbt4aczy3grnt84b5q1vg4bbvitdr6ei2qp1fo76go3ms6y10o6r8q9kw3tg8zgwgf65y7zqx0tten0nbel8mh4gy5qwncgopq7s0ihjygvnceg5ywradkuxe01lyiz0qy6x3u1lo4kgiqrcv61b6e4gpb0jc15phtsct0ebi54pkq5op416rfg61ugtcl4i2fzwlsiisdyz7xybtww7uruqu7da21mesxe',
                parameterValue: 'qquabsr584gzvj692u0b52mrdu4h751b8zhpzcu29ztwvh3ktjwxx8c9q0blnl391svmb50mp72vadun15zf075oj184wmj10g3u2f0y894y6rjldgxiedl4f4mvdu1gnoisq3hxdgu3dg3y2ozh5kf8lja0j5wna0r10c843rvbjxwjjavwaq0owl406lg6p6qbw8dntv6bzw6o26ibbb4ehg6a0kyz9phxhck4eceo1234d9lsadiarnect5tfosvu1b3097ao0icy39v82kdu7qilkfamxr512gi98cr4d7v0lax1mt0ekmv13qvl3tbo17jr2y75vtalp3ncsqmkc5p9wdp5wt41gdg2khkoxg4zhy69s4evfkshwtu6uazbsw5dfbsyqrcg3h8usguqjfp9yofol26u94ubdarbvg2ranppn3u5easikpaa5aaeeqk0jr3afxvpa7kawbqos14tbx9eil0jtzr876mqnsd8kf8dm7f4vbpoqu0b9ps6efbddomam6yq5flbywqmhcxuc9euaa49dxbs77df9rbbq378b13joelk3o13jmyqp9ji1cahw49m1uzpby3cx2ru6jl0ttbns7u5i1z06ikrhm6umh4lul5fvzt3gknktlgprufzzu9sv88h9gjj70uqfsermhhsy5dd5hkewzg81j1qv2d2v1ijqohm7unmwlzw3evco59wud1c2z2nz5d54y0cy5nv1tu9powmjrfurn6gtgboo46goegno0rhx3zianxh4om5wie74sl9q527i6dq3j6sn1qrwzvp9cbiq3njssadk38nsej4jcd98an6dk30y22ip6y3fsrllsmk903io650qego7ci42praq32vziv3c7739alxejc70jd1xqbael9s9ezznhq2np3xt8k9g7epqo6nqxtid71k1opknoylvwk3sx7uecxriuvfopmck8qwv26afzd6dgbny3vi4lvowjlathuy3rinr6flv9tbb2483lxp',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'zwhx2nehfi0ymj9es7ffihedvlcq7vvx311i10xy16ae813tnx',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '3n6sstig73vj5c4dcaazu',
                channelHash: '6f8j0vidjnlj3gk5we3ok573megimbhu15ijov3r',
                channelParty: '6javffrvb98v18836kuzsdckkrb0g5ex3ugk93zvmfb07w4yhzhxjg9i4tgkh9up0wcy221t5acjqutxh4ejcbgg4l40unpy6omo6eqxllz0dbg53t0fcrd3qbhto9c3anep02vthcltyggdx93b3rte7u3u3lz9',
                channelComponent: 'rr38cwd7gptxs6ld3kb375btl6lbl8gnqw8uu3bxoldhmfu19dcti4s1quq0c7y0kttambnkpgvraldzmu8q3c9q60i317z77dj75lt7pj9juzjxncojkfrmw62inotcwp94odaww4dyiojvd2a9owc4pjdadz18',
                channelName: 's9cb51yc0r514swizhrfqvnbgqkia70n8s9jg5cxyu4tp814yrlf80af6ev5m9ol91ksysvx28ysocmwev3ug3vk7hqix3o78yu97ho4gm6rbtmdppo72ckf3w5oqo1jr8yszxwqujh70zyslplnhlyf8imzadmc',
                flowHash: 'y88xb1hvj6rhfuufttnh3g8zm06l3a6i0r3wlq9u',
                flowParty: 'y99s0b88vakpgoszhpxi8czdj6qdvshn6s2uvcxnya4pssr6fedvt55uqtw2g6dr3wr3k3ugus91g3oxicyakwftahvt5s7s1iimflqna8rcrv9f4g65ifi8bh1prsmayk6tw8xoht8hzoil5y5buuqxmzybi3j7',
                flowComponent: 'tcdzgnc65lerinfrk1ueizhwzbkei6y34x5k3x2mghopjjo2i7kl9vq093j8s5w0joeu8z0nmcl2pjtf6pmhy4qi7l31zvmbnhfy46qc1bx68afx68o9c1c34h3nqchskt2mmqv3eb23nuwusvs7lwhtnltgz1ez',
                flowInterfaceName: '9pj6y396s7fumkwonl97h42loamdv7svpf96bciqfly4ywvts0npeustbc152jbp7thm0kkq3nk4jg6dwivdtw81pp2bpes28mduqbajach24r3tuvu7z7o0m26gkwmje874tlwsdenilov1leyutk0e0bwntxz7',
                flowInterfaceNamespace: '53rv1ck5r040rj51vtjzaot8rdiufcdctae8nv783ylpqqul2oewbtg9a6ssqmi3yew1la2yxfzsgvkw3tnq4zftz9svip0x0ktzu1arsqebf9q9cr2kwfvnswwvr2poi1lttjzkgxkm9irdse983zx6k39owb08',
                version: 'jxlddw957qetmtmarqo2',
                parameterGroup: '2jkrj0941cgzxmtk9uw10ymp50a0fyb95kvxpen6va0qlv9mvvfpucyh0p6krgx5w6cg86l88fdqhky5kqriidm34jii09sy99y73kzheir4lgjms6v5xjt2pm7eg8h892ghx0ugf6ch5qm1cx67ejkxo1jaer59d85dcaa0pvk9l5k3uskuqd4tgmjnunfz4d9tp91quh38jxz1o2iylnsvv020x6uyn6o87k5iwimy0cqlbyw6x5c8u50xshw',
                name: 'se095o8xtiqb442zcicvq9q326iz9eg3zqi39bvsdmuoyyi2qndb9asqk352igdys5hkc854q5fxguivhg1njbmk84k5rbtim4mkgghb3guu9gh9ntlex0klz11x6gbvq95pljwo03bqzm2aez13mt9ms4397gdjxrkyad2rt1n2jfl3iov2bhakqshhwnod5t14chhvswm8kjtu9uv8eik8lh27kw7u3eyxsobkm0tpw6yn3058jti5g986op1gxqpkjlr9hmfeuabazpi4rllzrg9fben9eko6p11pwp25cuf0jylimqvfaosjfzpa',
                parameterName: 'lni6c7edc3oxcp5fg609g4354e77gci9290e4ljtrn3usphx6y49e2qlgsvx2scmo2ltub2vlv1wd176cp9h39gibn6lxgud2h4a3zng5kcj7icddm400yxtkduxe7pnp1ijoskn3s0ugftvbpmbni8pbshpu8lyigqnowdyxywu0ky5q9z51w01fz88fk32yacl852iqdob41hoky6fl56a99x9l4w5xcv8lbb41qtnoiqy4uqgkpkszg9xdvug708xmrbz97r7d7bgim013w8b0ae5lk77z4nqqk77snim79zxfel0zpsmpje979x9',
                parameterValue: 'zgxu87ifsbplyn4y1adhwma29kfacjvs9gbnedtvjw1jq5fqnopjhn4i6jchz0xyncbgq5kr8r5fx8jv29uz6dfz6he7cmpbbq6bxbt5pizkf2lqp4ycm1hg57mvbqpstma3qwehneb9y7okqxtjd75aq2d217qnsk3a61rt80i5ww1y9zsdwmb3gx19uk99wmyq6ih2bbul5rzw7hn6azxd06xphfw22upeofzlduea9k5jbzf202s2lmeqhflgudb8lqla5k6yppu625ateqb5zdpju8rnz1vnh68vod6j74p1xn8mw6441nvo5h999en5436ltwo5xt6votm65xxizy03dl9o55294guc003u699nie9yn204gp4vnga5bpr9h23aek5psuiu3068ct5k5ie3d9dwoz1boiaw7vtut7kmt9evrtpq4h2imd8t2ps9ieca4z146soj7ic6e4yn9ue051o9gk1ptl4enke3i3d1et51nbg5tcwyf8cyzykeu8mxyuok4mnd1xfiwi4d98pjebolwi09637h4ot2nu2z7bh3quinz0nh04521ly1h8p5dnapxvw6xdum1hwcxuvt4i1692wgyno6sl8ck8c99r1grlbo3j0ao6r8c4nda5t14dpxgptzm6qwwao3hekko7f3rntwd4vby18ffqnzpp5wi8b0grk95ns48ofxnezd75h9aqj6g0ukwitplfufhf1clafisf8ut0fho3dxwf73y7umh52ouyxwuyjq8datrx5423fiy97hma76k5fzi9xda4k6nrobsh82tqnj4vzw7vgmtqwars4ex26k2ogs9yylyonxkhnsgutfchbn968blc5xp1c44d1n3w780m9p4o234h2yqi4i7k2i39pqpadyffkvsxss3p1p4h6hd8hsnyyhuytktwxp8rfo6lo6sehllt6rwz9qmjkbmg8bx0mc5e3yobneotonin7vall9bsyjavahmtdrr89qzzz3gdi26vgf81or',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'tv9fmdz3o3ptd0a72gfr6j7e5pi94gdhas8fqzqc4v8ymggk6r',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'a4w9ycbahxa580d1eksp',
                channelHash: 'iil4thla7ufvlf5cafkknog7khw0k8qdtnojuj5p',
                channelParty: '1f42lt9zzzy1ep318krbxa3xi5kaj21ack63gkgjzjsj8nq1ak3nmwcwqh0mue3h76dmg8a57w358hi72f5rmjponj9gfj0az9wn71q0sfzh9xp8uui6ivmzhi24zwldmhtgxiw8jjcdrj4xvjz922qkr1143e647',
                channelComponent: 'ewii2baj5g3d50xmctk6o8xfs87ivy2sk93ttno9c1ofrsfojxle2s2azznr2599xvqopodqs3alfqtblq5jhhyz0a60wdhf1q03fwe7itj0ki7bkn2xp78kuk3ypqndva7j504o5dho6jpasus3q1zhrurtunhp',
                channelName: 'oek9aa86e24u28un9qb68ovc6c4802ngah3or7ef1k50xywstefs7umx38nb290kg3fyd47uegntxxjqvodkfex2iaj1k8tsi6ak326rfy592fgvtzskjsj5e0593l61n3b62gy06htwamkvr6hp2wftr9brysuv',
                flowHash: 'p064g3hjnf4o7vt7l5jqmjz7lod9im8l7033dv9a',
                flowParty: 'kg65abb7k2zzdmqotahlwcoj7upx98hczk5hba9dwvykeoqrswh58t9ocpew1tke8ua34k9zfgk2bjujxfsrusjf1nw8chz29t0yhiate6nt3fxayj1qoemtbactamnkrm71mul2erk5akxxexmz124p3ejikpe9',
                flowComponent: '85pdqxnpa1xw6vt63sqctksn0u8kcp4lictlm0f9joi2qosmqzxddactabv4k7ojpor9grc7kmiwzs9l08bulxttqobug055sf8ejtort0dpq5bqxe2b0idd46plly6mbfvpb3a3c86xi89ocws1u1hijf8mw2ve',
                flowInterfaceName: 'spf4bp1h7e106tm7zt4ql2wlvu4jdho46suyz9z94vkzrlf8l5vheq0gzvr1ji5vc0otnfk2wgfzozsvyh4l8urvufhk21z5ygfm75z5xb55l0goqfbcasllu5rs8ojs9nbhv0j9agsfl1368uk2mgypsmnweo4a',
                flowInterfaceNamespace: 'xbwxetfu8cv5pztri09z7kdw4pim7m6npsdm8wzfjng4qdyz39zlpv9c5sbwqcsbbpfuspgfn5ks6bi6lst2b16xwh8nmnpwv8msevlb5psc96zf9wjubu3lq5pwh1qo5zjux6vr110snzhmz2qjd48bi4vimrwc',
                version: 'r48qhg0j29r30xtfpfet',
                parameterGroup: 'oidd0tg810h5rofhmp9xeywci40ds1yb6573q790kkvcecna05ivvw4rvrc9n1pzzfan1488o8gdoj5iyjb9ax69uw3yl59oqp6363xdgk97ppfgpfocw6yq24q2cmkazcz6g0y1gypeoyso1w98b31jx163qavweci96y08olq1jw7xdag1t9aoujsvm4yz3docjb0drollnxcoy3u9khlaw64jphur02t2tf1ik03hqxj2obshnlcdxnfxdvk',
                name: 'ul93vr8ahh8aqibxmpa8jcx2cbbibh9sainw3pj81ilsu7d2w2skqvsagdqgmodoz010f1t71dpvdtr0t94k7tn2s41kxkfld1rg68uvfxbiuq1cfhem30jbbkj1khojlqxq9flfqcx2mryp5taxrg6ksf1a6n6ct3e8qjx4y8win87deqai2segfnsbjoribxq8xvsclkq0a0nb3vfeuo69cpgou8bckqj051uu6a4tjzgzn4nbc3dl3txy3ntvc10vzfe5ojg21ywnf0a1rhefm5vkcjb9dtv7kgyvx8uugd4tq2aw5qlphy1pkbdy',
                parameterName: '3gdwtfphd73ylxpm3p7bl09jl0u2p6nf6607ztm7kl26z3pr6stof4nsqpdkx862ervmavmnsqjkngncad2gvks59u7lc7qz64f66wjgpm6n9vzblsbyzrdlk080rsqfeamlyh033cvz3ekz1trgjniv4eauqvt2lzlc07zlivwnqekwj8qlblsuutokqnory1hew53qbwobq5dobhvvtl50o0hvr2n1gey34qkh75ebn1r8utyqup3kc2aokig8s8netcvsty18l78l81gkc1ly6982nzjgi0t6jr4lwot2bfn1q04b9qu0t552iuk1',
                parameterValue: 'iaja12u1f39v6pm09d40kpzu6kefnn9fzbn8emwr0tnimigcw6kt4gdyh49l3bxhh6v5xb073t5tq8tbvlywsybobixnfh8f9ib3kjx33qqn384ddz0khc8e592mtlvhu1i520g60h3rbtrjot8ik4tgg63s19cf8ojthp0rc63lakd64sge0p3pnpx20vqqhjlhc9dnrpj6jbyit3ui141usldz0moqho5isrt2aq26g0iesbgds9afmb8e54quo8oiashifspvcj4uknprhak4m0ezswixb996lp1u5b410jqpk21xjuhp1fafjcyhx5i7rj2rutkvbczwi9ghoh8xfm7p7oakt6yi0oj35vcaz50ogck2drcicmv878i9qmn1c7ud88aabxm041secpoxkejwu0qx4qoxb9o1wyeatxb63fhn3ixdwms6vud7oawo6djs1zj3u372w273za4i2btk4i7a50kemko3r5v1iludr95nt1lwnalhfgqd92q6k011qvkz9lvg7vf0dwh4f8qwuzof1oq5l82grsylb3lfb77o2b8u6x7gdppak3nrkziok0ior1p7uq6oim67h23u153k9an022epy6uuyon3zftmi48r6ihealrjdqrczi09f22vhbb34oh7xtzf3459qhhump9qhkil3euz48oopea4azwkbey38m4ntaoil97u4e0wh5luafnez14d49pesnwek9aauywenx0nn3r2k90nfbvo4u6zazt7r54280wlvxh7e8boe95e0wk9xsv1vrjzfgugfkpetmty44mad3b414umap6ybej0e6lnf6iujondvwt1u62yui0etg126bivqg0el03g013oos6wx3gvmttklay9ax3tnfalaxax6x4y0cdptj5sniz8rygd3cjp4cdzf9fydxz4lxv7cqp713xg5zx0bwuqp9yqoz5fqyzibnfldu6slxvj3373yfasunz1dfhqybdh8bxnes92tb1zloxi868l',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'w03ks0cy3zozt3rf1cdhc5004u39xp1j1tcg0w9il4xdsxhl2t',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'creovaedgvoif9a3k48h',
                channelHash: '1k2nhb0omflfe1iiqusrpj62unvavp36gg4h2j68',
                channelParty: '2qe96a1u1y1djt6xltxmk916lm4h9smq62raz4nkh6tr8pva6t5loqaojhetrvrcjkhiwb05cep3n88i3qbn7elnz6kwyda5f053kbweh5tjf6onyl5ebb5qu8q7ortbheixkz3rj3ywzz18gcvjp8375jm7n9ss',
                channelComponent: 'rufsmzz3y5m4qcyhw401lihny5yab33s1pz34w074tukveq45tfug1lvvekr8bfchgdfq73az7ezjz394jb5qtxoflqrqth2rlbsv90p7mcbm2vcvcfwb38e1kabs4r88h763w50vtjq6jvydip8drxvtll8w294r',
                channelName: 'eowj5k5w1ot0jcf5y1xjm0clgp4rncmizneheeir7hh1009e4aqsdre15utmib8u5jpa1dndzgaqsdn20njc6vrv83nn5wq8pulogmx75wbl3mbwduq327k2it0itxpxkju4gmkgatu9c1l8z569j3v7skk6sn6q',
                flowHash: '0y7wbxa89j91m6k5zrqy9zlu4omlsqodwqp8pkr5',
                flowParty: 'xkzgnv2r1hb1lp2fpobfbxqxfjv4fqisbcqv3sl76urof9lbx112iiw13rp3gbgdsxgrg61o3vkgn8fato1ac1623dkmhsl0ypv0aemgsp9hszrt7dhw0cgphp89bu6t912i4zeyvtrgz9stzud7v8rm9y0kuzrg',
                flowComponent: 'y2za2tdqu86hodt0zmp8jnghgdvierg29l76dsijjsrytctszabkm73qh34gei05r6e1p7nupdln1r2www2fhmf67otyyb3vi2i3v7ddip4bwll1p3q4df2dwmmyqdgbzwadjpg3wzs1jnxou5m239k3l7ekk76a',
                flowInterfaceName: '50qruftgutykz3tsl8u59fut3qay36rctyd64cjdv35on33njm1hg5qmz7ofqozud6lobinz144thir0mdxo1bmn326hqnrgnb0glzj603wcncc7c9sodlv9ojeislhrwv0bzlfs3ixf1ewpqcza2daozflg2e6n',
                flowInterfaceNamespace: 'yh8v4j9ermly1gspkyczwckos5c5mbbwa9u32jy98qpdbg5mqxp5vj39ymizqbcz47irx1zw6sd2j4w2lumvznui64txpb3h3f9mxd1wqtt4f6dxfv562yjr4fx7gcolj38o4lpk71t04h4883cwvfefh3coql25',
                version: 'pjl9u94r70654xljildd',
                parameterGroup: 'atjlwvil2cuv4r4arreykj6t1fhlsyligfo92qfflon9scp66ju9z87kr0eqyoy6j9nbre7a458b1bjr500k9z0ggfimr41fx753h60jd0615484toq1naev9b4xw6a1erenekutxpzv8z8aqmdad9v9r4w5nchr6j0cn9y4sg755e7zaacmw5t1ipq1ojve9b8813bg2o678l15v4sh5p7nvpllhhx7rw9ay8aw52bwcjxpdfkk19rs1g21q4n',
                name: 'cmq9nwjwtzcaqqxh0jtlhzp2vga2j1qe2cjazsu9rj4zg4459fwn5h2sav8cppvdjn8w07631fso5mjuyo4moia7vgjepvfvuz6x88y3587x5vcqe7h5xgi4o9qapuzugj6hez5ohwr92jatxchwtjpdrp6xq1zz921hatvuc2ynmgikm6ddvwnq21io700jt1mddo041b4hrgz5klcp0bc4q6jewp3rwtm534sywno4q0lw8nlonvvgktgjhmfus9yw41gtwgw0gpaxo7qh1c4m5j6fdr4me0evldjt4jy2dovt6ukp4nzomi2yj5ix',
                parameterName: '6zkez359o69c3wx29c9tkecz68r7t6xatmbhlj65jrb1le9mgkux0ocjutfpskrtpc898lq66liyfru1bmxn58228qf8qqlagf1ezpznbhmpzo5vl6aydgbf670149oo3m4858emg72y5l9ghdrtwtv6o6qmdd70alr8ykslj7m2ynk0yt61bcmkr5jnqd57ji6h01qm96yng543t18t801v9c0u5rg18bmo65ickdp2wy124gprgk4hazc4b2hcxrbpzx0jor423yo24srhq596hnebh81bov0q3yrgwjcb6nz7jv8qih85ws17q5p4',
                parameterValue: 'sw9y8qvscmxp2nf0ndj2k5lh5mi3778q76k2405374t0sud6fyrkw2idq17uaoo0z087mi4akd9cu0il8t14831ewz7ez9pt8jeyc91i37mjcqvfyy9wiuthkseclq2yfmvudln2yhr1aolimbdyeyw7d89zfcf2q10gzynlj1yxv672ysath52zrtqhhh9br1p93b5xpn97ufig4fth9ruh7w3s4h1dqbi0mtniit43k6kvkn6s9yxcjgbroacznrecdu1oj7kk8iu41cl1tcehpriw7sbbcbn388ugmd9ibx5yahpjk2f2rw8o64armgrwuk9sxfqa032jd5rmkybwxl88xmtbl5sulf0588d4gq8xb3odphqtmxlysmm5mxigbzw91p3pgfeihp714y8rtzn3ff0x5sjupifdfay9qd0mn3s4kiswa5di5ggmy3hm6blkh2mw5nhispt0cuhz2cwp2yr2jv61frg3c5ilrcqyyhjos5xr9xns6pbz9lj6f3h6pca4aom3euyf1iurqg2kg37felxpv5zhgz2d9hygokyykdi2m3rh3271ow5sy7ud6m0dg6w2jc510hypx2ks1wkbx2g83zua6nbpo713d0m48fxaffb71ibo9enedfe540ogvkttyz639qv4py3sbn41tqse2ok2g29d3f0a9m3x5nivcgxxktal1vsnk16ol5nr4buykytqvyrt1s4zm7dt6r0rjqkywtfbngz0grgs2txl08m577gejqlrc2c9t8lzpp5o7zjc3gkqrb9of7lgchckjojv6oymwphcwmpe1li6zeoc6rie81iycghmegwmpmdhlqezemwjttdunzl21pigcu8a7f094u4h0r2b0xfibwczkkdqqhm3c3wj8b5ryajxppdhwa6ql1mzemdh7n4nquvck6m8nucpwbu23g4tdvep2lzcqy0iqog1njrxdg5m1uzrc95yuuwf21tg84tny02pvort61ltrufcido707utc3ny',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'shljvkfz9fbyocgqd3nahiqcmb4mjkwysig1v19bqqdpw9wws1',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'tzv0uo20qqec9b3qnn72',
                channelHash: 'fxmgi661llu8w5r16nzz0ncyyoyb05dwmz72a4jb',
                channelParty: '29yv6eyeyyqt0bz2ttxy3uswi3sz3fff0dpb14gy9i3c6290mpfwya9i4ijo1f7h0ldjtkd3qcb4dbcc93pulvaqrs1oepi6ej3aptkzcu4cqbvcd2ghf35ky24bk2enxglguhe38n6sipgq3qaby2csy8s4yh1w',
                channelComponent: 'o47ajhuwvril6qaweuzjb4aqzl00h19qby9fto1oqxzt78gb2u4jmr68yi5vbolcwxbgf37t62imnl0okinoh1oiib9a49d7b56y8h84f327199orluxl013up17qh7px5zpzlwh74ra84kypqpw382k3dvcdj8z',
                channelName: '4dgi0di92ibm7manwqvwqq7yb4ze5jo7o5lok15q2jmxm0ovwvqiz30ddnjp8by9sanir3a02m3vs79f88kunhfaj069ue4u53uq1fzw2q6reqfmmv47swsseqjab7kgb5j1qe7w4jtxhjivbdcy2a2uexeo4netd',
                flowHash: '5wvqn8zw3a3wkn0h8nsxfk19l1wzd29yosfyd0zu',
                flowParty: '0uepwecxlzhgjsz1m5mr09x4fk5118pt0fp5770en64ft75gdqanfovfcevwzb9trbt9yx6yhoddd5p68zeblaj2gh3xe8o0txqlu7aj4lxh5hsj35awagjumw98j8yd91wbpe2cgxhm16my38re5f6hlfesu6wv',
                flowComponent: 'cws3duum6wlu5i7rzadawptgzghi30f2lju1wqu8golc5yppuhqlhcs8hi07gdee5xzs8o1g4kmzcqvh8rhyokvc4ixq6erxzfw4lc9xcgjqxxfb5xpm4o9epl9nb1tdrz6via72xz7b1x14fu9goij4repz1s01',
                flowInterfaceName: 'lv8omx9edisyyxbc23dexbkknc3mssfjj4ilih30o5vtb8e7hy3li5zbvdbk0fucwe8pp6q2gszo7bovcfyef76qns2y34lql480el30l16e5li3lrivp2v9o4zg0utf1834gu7zp1fkvd2shftue308q2021ydu',
                flowInterfaceNamespace: 'wrc00eqqygx9obok7ox30ht55k0bw352v434z2p2canmzdfuhg8inrzw83c86rjaanb0h9ky3lmaaa2838zgjqk0a6xedmrtrymfjuqdaa8nkdnnvga6zu87eulyp19ebidoyv1uo9feo8kbw9268u392uouhkjw',
                version: 'e8y0vcmry63tnm93wjol',
                parameterGroup: 'a04dko14sy2rc8ddhahr0txwfzhcwomf6a08vfl80iaibqkr2x7nkuzqzlt4bjsjtsb8qa1h67jbxh8um30suei3xnzkpa3otw3x6nryy9cygrru00h7wem7tauru7rsgl33o65y4d8yyec1069wtoxceidv80swzw1u53lxr3zmzf7vem2i145yxv2c2og7z86fbl6di7p4z0mnqghz7fgfuua9fwiazurec9nricmbxrzhkimllwc659sy5zu',
                name: 'd4ct60mlio20ypmxg1ipar0a388ppezi5r0wfzbxf2cvd0s419eiw27efs27duiyvkyhdlu431gpeqn16n6eyclzxxxc2kqih870jpspan4o8hdonfvz9k720un1ajpfqlr9cz2i5xpmzmvizzvreyyvppslv0a5y6t8otivp026eqynvdmbqbcirh1tqa35pzxyutv5ylbq7uxud9rhzyp8ifeo7q4hbu7dwc88kahwaf389ya79h9iaiyxmu2nbwjc633u353tl9tlglx2fol8necw4lj09ar4wtbr854ovlpcr9fwjifdhroy4dnc',
                parameterName: '8u74i3zrhsny8t7hj0kifgeb22gbe66ua6ivn1c1jezzg5aqvggnhn12muutz5j5o8zc2drvv4cajbvjfm9ydl9yuswkv361up5t7bs0ai9xpej0xzf176a65qi4uajbn75anul07tgr66vxal8edgzjjt3n8kgqrmkymcatpqjgkz751erkyptvilvaxymsx3udx5q16yyl9411costn1turiko3afmzju3tg3l6uulvnni2f0odn204c5wtb88ddm7g8rp70428incyybgd4w4m1cwx3sp69ckeff3j8r3brb1qx0amepkvy9if0r0',
                parameterValue: 'n78wpyunviav4kiyco351xxijwe9bzjcx9338gj90tt30kt14riyed29lp3za9enozz118eo837kr097aqqtbfqlkx4731c0cp3h54y080vmg1j6i3gtva2ynio5bg0djrytc1i7ha9ci6xy7kmny7bml5xvr7o1tp1p6ywrjp4rzfec3y2zsxwyzssxij007obwa5vrwafsr41tl1mme13caspilawbpvf0mxwn7wuwyxuorg9gddbp10jrfpedkf11m92e9g7j61a10qlhni57x0n0evnnelee5irtvhp5mi6aee00fd4n8oawvnuyz5w1h2nrcnp1ffkfulcsse9en2mo2i5er846a7ypr1sknjb32stdu6ibil75iyvkqek4l46arh8ajxei2d4styuhs5enwomkazy2qbfzvr8hvk4562c97nnfito1vk6dedylv6ts9e4z94finqr4tsm1hvvo0jlpp60ggyjk51uklv0zoiuapauuhdm5xzntabhoogwtxq8aeb6ginygsmtat4p0nt3zqy4yed0k5xnw3i3jest6u2qr546wz1ma11asjmznvcjzzndvxlno8ug35use9bj9fsw4op6kuxk5z5rle8471z5lvho7o59v40rt94f44fr0d4jrhwrgdws13zpggctmlt0vvfxwlrk8ovk9lqsixuy4nmkanzmatkuz686p526erjq1aivc5lf1g3xtmjweb57bbpdinahui31x0zta5whxste8it71lmq5nm8wew6ii8663cgss9w8fng9heub6o9nhubr4apd5zw4df1kdy65yddq4l3x9cfqlfsfuhf6wz24i3julzht7bouopbd6g098ecvvhbe5hrjcu38rzi025sxb4f6n38ffj6sgmryxnfrztrdmst2xn6mz12f3tw3ugstfrctq4umx0mzeaoiczvcto0x6yhhfwzvc49v3ih4jlmx0ksptgljtthd69bwej5x109blz3h9b8ucc7tu382f5t0',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'u2otgu104gn53b70mfe5dl6fag1bifof9jzjoei5f7k21wklbl',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '1ts563l3odkamtr2jz5u',
                channelHash: 'k16ucuu6f4xpecboxrcv1u3zkbt2yc18uxx9nf6q',
                channelParty: 'zxakobmnml39ldfmuzugh22fltzuxvs69oxansg9dhzx2i8mcrkhf6dhnyt5nlb6v209iozld9d75zgfg4jou0h3tkn9ary5q7vovxiru1822sae6ph2fg08wl5w13xsjdac9gyhvy3mgnq5tp5eoe55v32d07ut',
                channelComponent: 'qs56jr3wlx96xf4g8np0x4ivksh8o3o7n3j4u5bjyvnyh0wkt1a2v7tezahvwchb91bfdf7kfn3gkhoq2xy472l7few4rvxnd311hlred0ys5745r1kdkljdq3nju7gmm703rqsc23pquokk0xb2wu7nsfuusg6y',
                channelName: 'gzsj4hx1uob7axr37forrwzi8x2p2cfrldx53uokmkpv5pkffzoevcaazpgpf58zj0jos3gj9s2lt03yhvr3lfy9tuopkefhddli91sutzghiie8e14xucwtp8jok9u4w12dd55b6zv4xwbvelie2o3awuw8mjrj',
                flowHash: '3e7yzzwsn3v3j0p2q7pjev0q1dw2wkddt0pcvdq0',
                flowParty: 'pqjpw1p0nymo4wmx3f3u0amzm8fk6otpjgm6z0v9rrzphofp7trsh4q0yxm4jdfn8wxmg44oq3lhfuk52rta6cnvwn0z1ub8y85u7e9d87rpnjiz0er0c0ga3a94f7zgcc8jsy832thajvhcakypsuzepngfkp6v1',
                flowComponent: 'pvib7vit3pgnyp5arsvx5cbyjtn7v4l307949uwjqj9r6p7aea6um9ptygaj35gh61ntwllnaukvdrf5pqj1lg8gv6vlbyjnglxwkzth26fuvqtuhlictn7jtxk5w03ens268ao2nbm6ny6mywiefxk6i1w0i192',
                flowInterfaceName: '8z1chr5lh2xgryfa65c5ennoyric6hrcch104b319whlmzdmg76m3lowxu7ospkqx5s4nxi16l58shh3zr0lstrlip14xa8be5oliml6485qxtjco1hyfyya01flh0j4pfvadizv6e2dhikkira9mmmvc2w46zlv',
                flowInterfaceNamespace: '2k9j66rguvj7a2nmsff2zwx7gkketarp02404ru94sp6r6nxm2rbgecnhkb2yp8ncvgxkghpz8zocc9bjkmcnivup6uz3vox66s721hmz2146k4xa041ee4gemsxo3jqi3vcff2sbk5vxoyiryubuc4886vx3h1w',
                version: 'u84pqhavjkzx40889koh',
                parameterGroup: 'm91s0rm821xglr1xk6wt5o4072wbwnsukwygj7axi259jzfniv142du53x09g646p5pizj55uc285jua0o152ohqetysqtzuees9rm15yze7o1cus79ws2c0o9mi19yv893mo8tpbn7vetgtbobfztjx2gp5kbtet6wmaku032ofwz4nlwkz6xfwm1xuhc2uba9hwp5ufzp6dls2aa7f0qplq9ti7y5o86vd9d2fu7c1u6x49zs1oimrj29zwa2',
                name: '5a1r6mi8zew2fu5pam2e4nfqrvmpvrnn9hszl5nf8o6mb7ghi6ut2p5xhqsn76uheyrqm4gl77nhz28po0npj180zmo1uusjkxpcifpfnkivwpmuyg2f9y1rh2twk2i2d5qwcby1qo9g8ur0v0jlvvgaldzkwnknx85xsu61xg8ixhkq59h5scmdxlhftkzo6eb5rpr5nxvt42hoyb3vkc59gfvmon1solb4qwn0rwwd9msiz556hn5iwkvrwy9rzf0z2jl44u8cm2njpldoahb2pl6e981c2lgrmpisd8sh9ed4umxigmwzaj09955m',
                parameterName: 'mzxh6036ykyes1tig24c9kyfsr73r1usqw2yxuxqz2np4dbcqiwohsg8i4gfhw2ognjk7gyvuyqdedyylbwn4tcnvc9val22obqlxe6jl2hu2maa0lbshsvrhwb5efvhwr16pozka1qmqvpjg8kwubj406tb8kxz065jdeclodybd3m7uo01j4la8la9a2piy0h9zewvlfvy3qpzujbvgs8cngttgxybfz8lj64psu5gcus6b08aiu37tw8ph75561cqjhu4nhwgkhiqdeibuq5owp7rc2uco2b5yj40nff5u81iq8mfbmupw3ceqfxj',
                parameterValue: 'hx7568owycv6hgnt1v4tpmxtcp52i0i5eod93xum86kyp7c73zelun99cqxsv2jl3w2i9rwk0rbby0qno4nz00z83x1331838k81s2pcikhikjux1d5uqhh1el7uojfn6timwwfchr14ugrytymi9hweieay2h04sipuoed24u1p5jrunrzvx90jy90slejw6b3qjx2imgdirgfi2j0ov5yneswq1r7wmb9zd2zwnhps41om7htpt1yoom1whw2isn1s793w20zt9edduf75xfk4hwaophzwz3qqqzyjynm2yzhd8nt7qwtxod260fqoruo7ww4k2fsrgrmctcy517e9vi7cbsxc8ovlosbpm1cqv0xn4damunq301paneahapj0njwgjvp7kgia9ic7mfc7ioryd71nop3q83x08l1vkgdygduzxoltyv57j0cd3l7vgieofokx3a21z7lbc602n2hp2i90b0fp94b0bbnk7esprbitnro5i6mn91urm424v0inbvyrisqvz832xihj94x12wyh9xxw3ot22gch1b4jzzrx95m7qlxyml1zbigxsd6qti581vpyllbw34wiz24ql7kf3mnvg5to6kphhsu1r9o188yts2163rgxks48zzw7lx2vtgy64xpswgh9ywsdnt7ezmmpl6w6x7rfpxt580kpeq5ystqhqjczk58ydu7qhiuuj1oi6m0r9i03c031v7w2mq67ivgwv7ie5hl62o9hnyy7e5esat1okbhqu5oza3icdkjpj9gomk423vony6ibt2qkkj5hild3oesgcy9p0frd6xpu749g8jvegdf5hdx227d81jb6f9muz250sqg2tx85qp794nwmeevahenqw28frsjqvak8pdjc6li3p2onighpi5nkfj940g8hzc83yv89sd6drsyhd41225pmg3kz95hkqengrz5dhj47denr22d16549oyvb0pr0oxuvcwt1lbur65af9fjvkm4mf97gzqao5gdx',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '2u7a382emshfgdy6gqcmukfm27hc9igc4bki60i7hs8givynor',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'ljar3omj4jx1l4fzq7oo',
                channelHash: 'vaovvtugcjg3ye5ah31lm79trmek9o3led1ft0jt',
                channelParty: 'wkydd25o8vovo6ptq9rcrakmx4zsiskn43w0ru3m94v1jjp7z1htcay7etek1xwagfvvtc24dgek40khh7cxzwjvpl7zi67ixwnkb1pvmwvkd5zrgxaxfcxua2jcnytnwpwikqjmdcnbakak4sezpa2wjinh8c1p',
                channelComponent: 'th4ldxx9r7kvvdkj1w9bo8pos4rj2no3ft4i67bzh383yeytsjsepc0ffpn40gb07x22ug3oudcb7tf3tqoje6qw5oznlqlxwxdl4pmid5t1prwbj5nnolt2l58otd9b4tzq1b6l019zpir9xf7jf19owmdok4fg',
                channelName: 'tkdbuesub5twx8ki47dv59w6wtq85ah0pv8mfn1c9b5howfcrdg8moexztxd9isehzhnagf4vdmmrpmjwizcqn4qrh7l635v7rp4u820r52t3krryirwcgmwdpmnjd6d058uz378n1cm51klgt8w60d5mrm641yj',
                flowHash: 'n7qos4gqtksghnzcpurx844hmtzz430h3x31rlaf',
                flowParty: '3i8igqh7hgdm9n4clcwup0krqw7wei5p3lrq06jlop64d7oakghhzpcw31vio3vmd588nkwg0c96snx7hml51j3fh5vw3yz702gb00ngwj52si3660904kxmui54jypemfsf2ctwo41fvtpmlb6ucab0obs207ba',
                flowComponent: '5qp3jvz22f2y6f774gath0viacr82gsqxnd14xu66pss6xkgoytcb37enzwy45ng0zkqtzbvdksellyrswpwjpw0i0bki3pl33kyog1jjzpxn5dc2ymd85d9ha3pkcpy3exkbpz8gk5k2okcl5pmexvno00lyb2y2',
                flowInterfaceName: '35aze06mrl02kxdz3qucwhesa8jtz4kabyxvmemxlg84gnq7ybi3ripoi1qgfkil1asqm9oip1dd12uvx227cw89u7id20vc25sqwjvx16rx0p5kaaeqii7hc3dyjif5rkl0ou3wdxyhcm1pptatj97eq1csauak',
                flowInterfaceNamespace: 'ctz0iewir07y496yggxls914101tpmbp5pbzqudeiappwlgq4r9wg8gl2dmf2rqexj4a27ifevtw4jlpatv3sq90h779qqilgmj5572bv8todx0kv3we6tgspemqa2r60bdgpdzjvygoy866ki925834g0zu9sp7',
                version: 'roajcbvr25x25543psvy',
                parameterGroup: 'ba26l7gt51fniuxf0ljqs2t7gfl7nxffat6vejapeik6y9yigx9mskuqiy8ty2x6c41lfmpbzzx7pdee8ejsiutgbimmuqmaff93oxvw8jgs8w3lt8lxvsfwq22sqbir6fxu5h2cpf7ujv1x9ji2m5czdn4n762jnro4x5ugvqsfj2cc24r31cg70v6hgkm7gge2lq08txiy0gzjf7t7rnnjtdg8a925db59hokgx6niufuw6adip7rh3gn9eay',
                name: 'w5c6iyvlyuoaf4tlrixbe1a7zg6ppbb7c5jbgnesq8njb9valhxa8pvto7m77fq1w6jfioodvbyux37r1k0zb4cit6wgbtj2go9l9matmyh9ipghogb7llyjest99quqhbjvsta8v6e8dsc61fu9i23jqm8kxrs3pnqa6knodzlaw5lpm9fs8dlcg0xsvqhb7kf4pxhzxuhcyo425apx57vgt2xf4xqhixxe9m78o7swtwkn0vvx3xoz6zypcrvhfn3an0n5mzkcsbt93fnjldwa8twakvao03yagabn3sam8qeqn9bnajh1obp128ne',
                parameterName: 'f4dahcidgu2yqhg1xidcsxlo8do1qyzf9osjkvj0qllzaiq3c2gguc93b9nk6okyma6jp6d565rq5djc5grwm4pz6wd1fyu9v7hmbp65al4ouckkojoufs1a1abryw94bs0b7fv2995fg6dz03iyabi38m78bagsi51uo08hbe58gaylqqhnkigbghnu54d16plf3ctnp8w8mgan9ns21juteaxvypn1n37vf7vpjb5u3q3da9hk5g5xruu0j09i3y17cxk1eyqign0mdd4dr6n8hhu8wljyjcyskqzxxx0w5a57eflfvh781i39mpgz',
                parameterValue: 'hme9jdhaqjce9n6v2sv40x0j840ogagga35j0c3w8gtssjqgp9v7wqanaeolvn7wtjexekwz6cx4myylz7byzjvx7ngvvoyga0n1ghxio6itvbe0f9m0o24xxeg8n2fzz8x2girksebithim7huzv63wrvwv90d977vy5hal455e1fj6vh70esn1hp79dj21jtf0gkvzvsab0ef1je3wvfki2qajtbpasqdycuxdi1vxmidyaubo2ivlk8vgv8phq5fef6ri0btmfioabm8xhytaweng9nsh7hrbc28fbwhmqksa0uvr1jskssp9er2rdk7xlt34sq6il84f1dccp3efocaq36tyo9u6awq8crzzqfpsooqceloz07xah6vf2qfxz97auhcleqq3n809ovladw524wv5l659117cfl9edecz0x1vpbxwd34ppweeysubn9hf5107eabxdrobt1tqwf5j3fom9ymvhznoxo38bozvx8t3ud2t5fjq2jy6b3xfomi9dnep2d4r9nqkzjuct01v2yvtb3je38az56qun41f3htnbjvdfmv1d51lkqvbb8yklglnh0lbmeip1afutdkn4wqfnvgw2dkgz947hkcuwn7cbuwksk9zcil58f9igwz3thp04td0o1f6a8gwz20336roqtfvb2q6hlu5cets5hcwtuug730yvo9w3y88jlqy07iihxpyeol8lloq6hkidxihnlbothtrhumydye63pemfbpdudtl8bztzuewkozwijavf7kmd0pafqsd0nctnsmi20onj9tz5b3v0hyexm6byal6anlvahrr0ivz8u10uailxttr9nyguj7dot83a9egue8zvlccf0sjsfplbnjqshuud8xq3j6xq6sbwmdhseh31pbxc4w53qt2m2kad51x8tqlvydc7knv2khbrzl8g1503tivmrhrugsreboih28xz5nqjgjpbviomf6n37he5776jfofnwpcrab5nqq9ntiewgjbeosi',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '2lafk2hezqehlmejdo11iff9h5gqk2s4d9fomulbzaqfzqr3og',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '3b4kdla986ee4kafxn2d',
                channelHash: 'tk7q2mx7vuhefr99n49ndj9lzsw1r41dntmathkh',
                channelParty: 'mytbka8rppag2neuyuvhka1jshdv1n21y24h4zkt9q6m231yhcqdhmqud20jamit5x72paas3wu3v01rkle1wxecsino9u9yk6foth15t5a4jvyj6azk1935em8t4yrowenn0swn5637wycbxdntywdltdkrptev',
                channelComponent: '2i5ihyr4cz8wzvnf58bgyb9e8dhxuhzguddw5r6o2g0wbwzbhybld25t2pbxa3826nibl2ujpwkop2ne8ja36dd3ahqtvxwily2h2ffffuux9bs8jlzxgpdml7nhuiuds6380qg3x0w414hin1ksxxd3d8008se3',
                channelName: 'oay9zw9b2z7aaokq1xk9u2gtqcgl8hi3agwt6abgrv1hrjjegebtho0gqefr5s1spnnjwavl1oeq8cxh1kgaxy8qdk46q1y2839u375gxgnm0j7eqxflr58w4hje8cjqlii4j2vun0a3fbnnjpdqynypdbn5ulbd',
                flowHash: 'dnn66h3o1p9lcmqnfgmmj57wk46atigmsftknno6',
                flowParty: 'yhok8xs8py1l4dd7paeqyypuf3xiyv8w4wbor2jqxfbfskky87uu2zkh3c6ftifjzzw5o7cks8o8e2xmmb9dljg9ktl0j0rt02me9p93k2pycr1r7q3ajjbataxg4cpl7mdmdz45geg0v2674s1xy5d3wv2un0wb',
                flowComponent: 'pi9xhc3dwd0y92h2918btxvc3ykdvhrewlhgowkt84mn23h4f8eqo99pp4kpgbgi3ow2tnm7pfccnxmviup21gxfzc4tve1c0nduqjqj61jz30k8z0i8jyhclwh1w8o211gma610mh3ed3ev27tcsa78g4ui7llv',
                flowInterfaceName: 'rd4qavqfgll68svtk37m2q87zue9qydvuvab0wfqolpi2gtygtyhemo72ikserwa4o1e3bdwbaefaev40ka6v6lufp69bqe0z7p3jdcf0g15ga4ucqr3xjifj1d1ni2415hwun9gtmaxrzk4bm5agovmp5skxhvyw',
                flowInterfaceNamespace: 'ysgl0yizunv9h984gfz5qsg2nncsd4pjesc9c2vfqc1emcjp6raihud2e6azuabmajihuiwvik4sqhg8r3wictzellbk7d4jphkf1tfben6o8045enimb0y2wl2l0jip2bxbu790d0ods4n2z80uthxbmtf720lp',
                version: 'ip1y7zt4xxfjr3b7u98n',
                parameterGroup: '4or4m49f3msyexlh1n5zs0vzsvi8mp3ynwt4q77wun03tk7slwma4jrkmf28gslxbr9bsvry6o0fpedqcvy2sxvgt08db9ivi7nod5yn6i8p1jo1pffbx4925sww13ovidrds9j3t7w1lvgi35rkmvv6r3bfdwn95rquh0jz6dnpov5lmgfibagxnqmpyskps14oygnz2vwnknxsquy7ugz3r8dry17kna9td86qckhp4ktcrdv8gvsfrjdz5ve',
                name: 'vuaokxwrsk01drrjygngnrxwq5an6vcxllg1q6mquxon89d1cqqsoznr6fomrk0zggqgt9bsouuf8uuuki8sgyf7stx9wmwsc3qctnfqx5t903uebmi437m69vqhfj3sijc4l1h3mje8iocuwo58v0agldc3vfhge8clac7vlo3qz11l98cgizisrf70mphrpzvokc1fdzgeprwdebwrqm9i00h4kcckxdebe0zuuocigk6kuddbklejkjnrbjqr5xspoxbgkdb8zr68cica9zvf0m03tlc7v1dkq1a73f7u3ve0da5u9iu4bamxr9ze',
                parameterName: '2ofowgnvfn1x1sutb9ewaynffyjiyuuq8jhrvxmhym74fe7znuogg0j3nvwvow2vr00qorclan93f1e5g3kxt4c5ha8u9fwscrhnxi8sw26r70s9mi0qb5zyvlf7d3ngp0hqvqrbb7izc8cl8zd6iaq17ihwpfyesiwk8vm6x1mwujysah7ivgi9r6z9deheizqtbmrnug3p68iyc3tjewvg2re9niey145uhy5nj8agk3kl7fyi6gvcihnilx8vhpvmyc23ql742hlrth4zzv0r52kv39qyn42iqvaa8omb9cabxwd0y4ok14hh83m4',
                parameterValue: 'a8c7gz7burdz8vhh6ear9z5zyg7noysvfh3urxcb5d6zulpsass3vttbx94sff1cp40235op33pxvw17dsxp5dbtr5qyqm2pkuy9u77jp58uejhicvj5mzcjk0azh11tnw53gddtelgwfzo7ivaujuzas2hz795zopr0aiwmqnea4q1deki88n6a6oe5o3lqesw5pafwxy7iig9c5rzb0e2lzm2zs0qj75wmlau72724mmfxf76q2rbyxbd1ykpwjxnu7vsn93zfzavejjb88f4wi029i95z2xexsik31b17876jg1bbgizk5ggxml4aqhxycfy1nx08yclljb9e5g08wn7ijxxc2ajmx9rtamaxrmkojcotbpire1omn3wtuy1233xw4vpgrzwxp68qv07po4db4h62u4b406mon9tei1i3l37n4jw4venyz24bmjrlakqft1rt3b2rvm194hhtt33kkyhdqffba2nmjcerqd2af8n4npdpg6m8nhi84wfmnvm5ksd5whdhcj4waz1bkx2dyi10c6alw4j5117tq4fqdel6vvpkh23mk83i05wh3jzkbluvmxhs0rz0eds9nmv5d6pbdolud4rffcgr9223qdxm34q6qils2u9foyndzyhhcg85kkgfr1ut3fpxggoie4f3b4fbykbd6818x058dwfsxv3jlpx0pgamdjinysq1jxsb2dqwjqcuej5miqi8asy592e1gy712hh1yk4nd1p2cmlxw5tab9b51g2y2teaiqt7oz1vkyis6o4ixagv7jy8e4q21ioh9z9ma5rew3yn1xagxjnzd39rrl0j8b2l9fwo2eebyrkk4w0gerh0siwe0p5stwrcrieprptr9vdmh7fqtnyqp909fyy2wj1kn6e3afu482cp86k9i419le246qwrr5vvxkekcr4vqqiw9st1szjkskn8bs5f4h1v9j5zfsxxlqfnn3ozez7na6canhd5zmxwser75s105svsm2elju0ey5hf',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'p6dmk12jex2qv0koacq3nn67zhrr8p8dj83nf5dbxdiwa6eibu',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '5yuwdk8deox9d1u7fpr6',
                channelHash: 'piklycfg89g6w070215dog9rolqgdw2js9ve6qnj',
                channelParty: 'yl2gnwr37bgcnfo545jbcunug0e13dxkf39k5a9jhg08323ag7j28i8avjs3ww5zvfv1l2uaqf6acfv9dafls0yfn7b994njf10ea3k6nyaaxjl7idqw3xvm99i2d86uq4gbsmcslf9djqd8xkf8kyhrhv5qidi2',
                channelComponent: 'fjyvwvbsmsribfn468atz1oqyuadhxp13beh860iki1s8e2h8k03ymskjsmiyzgriskfaiepaveuhu97mi8asta0irlsynx7l08zo1fh5fq52wf1cfvjja7ntcfvlbp5jqq5dt0bir5gb8rqvn1k8m39jt4fcffc',
                channelName: '1vkhqnlgj5nwwvuqfxpz8l9dkazbmr7u6rkbd7cpe6dlj0w6qz0xx4hnlwx33oaiyzqq7u78cdzsxs45ky2na94nmyowipnlfdstlpx36m23tcxcb3ayg1w5msosqlkzstwfblp6dlyaczeyi7m2cirzdjd7q1ld',
                flowHash: '8ptuivpazyhgbu4e547vb1gw1aacffuqsz8t3903',
                flowParty: 'aag7jkujv5sbfksnlg3o8y06ykklmiaxog0kfkaqs3cm5yalcjvgyqgcf3ni620kz0xsunvo9fqztsnyikfh62v8i1ndjb4wxwol1ty503546ch67xqry6xilhidtlr7ebhxrds698gjg3yq1ug77207656skm4y',
                flowComponent: 'fdopwmjt388bw3a5ku3t9tk5knbhp734j6rkp9a46q2ww516q8hrtag5dfidf5s5zm7x3k7pmxpin0fb4evfu1f2jbj4j2q2sxswefzri84ryxhzuiw1bpkp55c8ywxfv0nrx5murcw6kg1y2xytp718vro5hpku',
                flowInterfaceName: 'qs8ygz94cz8h8oi6wrzi6zr18167l1oeg48nbhx6m6b0tsxpbtdyw1rarhktrdke8rpbzpl663lr1kofj2274gv9wh6yfdpm1r31fvtt7asmijs8krt1vr2jqgzplaxr9tuczhdx6s2r951v4b1qypz2syad2ycj',
                flowInterfaceNamespace: 'wohy9aj1wk3nmrbkderm71epwheaq7dan559d8xldzdvnbecgoc0zjc70ke59alh0md4azhwhhi8cf4swgei6f5o4p46wetjehhb857ceqyui90ap1ulj0aefkn4ik0zj33sjmb2872c0dd12j2byhxmgecgzu4nc',
                version: 'or9yiruknlhs9ugporb7',
                parameterGroup: '9s7f4ueodzsnjwcrbe368u6znx30xgftzmj02ov4uhp8faunwrvj21b5yyec8iyfm9mvvvkqqjk284iocxwn757enr4guss3s3lozie2bu0qg6o3h27lhbavxhdkru5bcbnnqdtnvvyb09v4xqzf4uewpid6c4opze6ipdomcy2267qggj2o9ba4pu7n0s0wfl5cztsco3416l5harkzi7jbfw07qohdn7rb6sai63mqfc6qpw0or24fj8icq9i',
                name: 'cmwonax7pl0ld25ytyfuhyf2qobdcwy7ug8qjzmwn8gitfvnojytf2izu9b8i1gdwiswm8y1p7htibrdh79fjrqazxuge3b1palh9lady9urhnvs7agj85gyz0lc4hmjv95oijc9fdy9sqwqewue4wxvyy7d730hql29tm8a8r00s0tgktxiblyhuae8csiibr5uykmv67wgslrr098ovp3cxlji4kvjonvizysk9iw8iw2zk4cfgnsaysodao3frbbg7axc5adk267746m0a1s1iliywco2xqe1ewvbuyytd6v3fs5lterf86majtkw',
                parameterName: 'xxwqx1v3mh0cx64wjds3kv6cbbjmu25kncofh8bj6pt9853n8vhf7tv5iecjwk8eb1yw0ghgxkx9890d1m5lkk4pofq01vbd8tmfpg539yo6597eci0qtnc4qj7dp7jcg6a9p99s97imjnsq3c68a3m362vq46rpaqkguqvnp8b93o65rd3atgzwh1i7o932807s9tsnfmd2ttifq65s9sqw6zdvqmaxen4hodnev2rzh5x0g2i5picn79nd1fhry0pr4omcs796c776zorr6spmpsjpms4bd56hx06jpt5ewb6bjdn5w46isem4ipw3',
                parameterValue: '0pxsldpplru40n6lxgh0lnqjjqlubn2yjp1x4nqcf31yqptogpkctj0owwalrk6orv7twtabg8lzvlczcoj3b9jqkzwf2xu9vu6alcrn9exfn7rnxjnb0wtpx0vciir2b8mm2stbaxr8uagh851u2d70eira606yeaggx913hp8ryqxfotgzygkmlbrbi4ot00xi5f8xsh9snfkvrqpv5zxmvqvkrcaixw09x35fj1uxs14p9bcbeiajx1tai80sti2adrupawcfgaaxgi4jjf9b1hqh2lbhno64pej3d2mqgmun342faeffbf3v9yz9wcfru1epez59uz0lc396rbao2mm08d2pb8jz6hlicqp5y8fqhpzqlcoonmb9fy1o5srj0b2vl4o03csncopzq3qj81six2lxdhb7kdcaq4929fnqprrnmsxw65lbgr4oli1hzb3os7ouimebfdak6t3baazevcp49d9h30hlyi30vs2eml5wq6u4gw2auu70qx71ob1v0sm9z3e0pqe9huy7oyzkq5odm66h0xye7da3le57iaidacx8qcty5v5nt51fhrnxkd9v7ve1pyjh7ioyf9kzk1f9tl6rsrpn1l3cwp6b4u8ku40am23i9kut0r0uief9b540jsu27l61gnwjq66bjoy5jxhk29tvnbr8gyineu58otmzllafzyj0sa9stx6bhh4zzpe5m8dpekpp8ge96a5m1hl84ehwuv8je9e42raimsu18n32dfk6cs99aimnskerqih6gpgkwn62ohr79mh84z9idh2itln0irrgtdbtvwdrjlku2bx8847d5tgnzrk2ohtpt2glb4jxob2seilq96lcsurpx0awmybgji1mzzs4c1ijvhgcsafxuo9z8f72pdeihf7zxhpxrl3e8dhv5x47k2x3wgihyq76hwswr6sz6jultfnqwo6e5b0tv2s5d2ry077xchhgb1elflshkd9zn3p2txlibamf2mi3ryi45lxtx8zv',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'coudilrjrzvrwrq9yu339y5mrmsoqtmfafo0ltqls3d40798nn',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'wn7naa93rdov7dzerdx8',
                channelHash: 'o4m4bl7l76em2tswo78y6wsts8tfkz8z03zct88v',
                channelParty: 'kh9u0w7s4m41br3a9m4zp82va2nddaikap6fkg59y6l7at9ow7x3gts7rt1sjc6fj2s2adib7rfjrtmhmd4n48k0wcedk70mz648nygh50q9kznkrikwj6msw40tc78j5vw6j3oqbxxg41u5sqe8cn1rfef478p6',
                channelComponent: '80chsxitxw0fp6dxr97xah7f0o0q6ld3pi8q1t8ljddtkbvy96d45v68lnltr67t2kykdz6i2rajma6bh3dkcjpfk2tyhrnekktyajsgjweq0dqh3zrns9ef8r5wi37fkogre1d6qckpzu6vd0dasp8f5o6nzc06',
                channelName: 'nf4fgaf8exw442yjbbb4m7mj8cavyalrbpjrm5r1x4kri4m58h1fzk32f239cmgotguwoeqxe8ump9sg2a2sfneh8cyg495kxf462dusisad77avwf85qpqd7bz6dyr6gc7b7dvmh3unl18u9m7zk1507xwlp88b',
                flowHash: 'dtn0s4vlk6gg57rjiengs2ir63zw7a7m3ntce7xw',
                flowParty: 'b8ruysh66zw5zdn5h7zznc18dymyovvuw06uh8uaqvurjdy42jg835ij4ccft0nnio5sh5r4ichfixjr6o5wcjin7hmjuzyk2hgmxe26s8pqi3813fvmvomw5w5telw5gm7x2qgnw1gfxqikw2cdteebliigm2n1',
                flowComponent: 'b0ltz3pdfg8sq5cqdcodo447jli5pzqaos9zs0rgr8iodns6gg2al8u5731dw3aj033b5muayb7dzr7qmop9rybxypgvph25jp6n2b98xjz2nsi7hihih4d5a70xu3cgtbuprjlnrh01posgaby9t0ehwtnyn11o',
                flowInterfaceName: 'eilbi7uh3lw5mmt5jfmznhoqp27t83kxkyvo6r042r0gn5pwtsdy703jzl3cyzv21a7x7nfiomibvt7iccfophni4tw6dv9iq4b4o7c8s6t2bc01ivosuk2yvryqvdhjpstp1ffmc7xunxwj8wazjgx1i5myb44q',
                flowInterfaceNamespace: 'n37c2mbxb0qm4ceaa609raw0fh32zqlsqcb38gnirg2hcywjdx5w0zblpfs82xea7g2m5sr53g4ru7eqlbqjv4b6g72ksp07c68hh8kjpngqn9xh2hq82qr4sb2p2tqala1ds5esg9y8jq2jjrxixaiw9hxv55hi',
                version: 'l4lrxr526m12i2djmcr98',
                parameterGroup: 'q9iu1ghvv9783jx0mx18ylet4m0bwy6btwuvq7ud1v6n726jfd14wkeoi1wk6y0e4l1dmowz380zztmakf7z3tkjx8mtl0mja9fp8ic21coxbj1mvcdpluuztppx7nisiwmgst50ni2ntbafh3g9ffyjchdosvja0org2v3chswvx7naxp543se9r0z6pr21kp6hbcbuh2jra34ol8jy2b6rv3zvf6jqh3a543ts1hws4vddwj4f28vfqqtpzt3',
                name: 'lrch0pqj63pet4c7hpx8l5ge79t6py4eme79k0idwl9mvikbi0zsrcebzhm8du02fyhv5go6nkvkcgin1rdl1793c5t1yydcprgfni50pwx8xkf6yp96vsmzw2sdnw8i1hha4sxexszt2err0rvt6d1sg7h6016oeo386ytdmz3hga98yugctaoj9clqdr2nhprlsvffpse2elprn3qqdza5iskw6qfxa3rlaorruw85orl6nl1xn5nf0lczvgsveo4of2k5p8akt5ca3bx20cu1apft7mr92a26lfcjgaxgve5vdbpb8jtg9z207p0b',
                parameterName: '6zv4o63874smpj9frxy1cpicty1eckouci84j812utm78ryj6fxve90uwi66mhwtrgly45nuo271dj84sjuts8dzm2vba930o9ktuw5a2ootg5l899jafpo4x2ocvptdqdolteqz6jk2mwve89h3bvls6r64hu2t0y5mimyr2n1jzhut60qikogqn52dpzcqt6m36906pebaeaqj55vvb87rsk9ezyuxjavs72aed1irzdf5zzzx9v9af5522hhrca24tevm3fio6yrbmvedw0dsgcpi8ygyzuwgukgw1xfa04m51iekhd8jy25ho6b5',
                parameterValue: 'o2u6u4dgjsg0bmal98m32f55scrotcwp4q009glj2eua8v4rzkxv8ol7mi7wi58gun2xoxvj7dpduyhn2w7ph7fsmfbvmxvrvwcf2z1ql6eiy6ml4lj3njz390x9ttm7pfxe0sbm6g3tctmz0zq25dtv7hpy48akyexk148yubp9wg6nb7iy0785j0a8fb5kc59gnwdjtf8vzpzayelorf6dw2d09dilznbj2dck4pf7qoitft7kfoe2u2hct3eppxc2rfn5pk3ux5k9kt01eoqy5fzpghc0kbmtw02u5jsden79evyr9oaor1q0x3x7f20yeni272k3hlglehobl25mtlibb7p52jmhsz4hcbem6vzr96rpvw5xyix3q3k8l7q58oz9w9e0l9qc8pb6q6jschnu9hnyw2y7vphn480uiuhvpn43ql7fnyyxvj4aqux7vjicv074w1gqsllipfhxv1fvpczgzehv2za0dnefl0hd30vv1qzqsssbtp5is7slcu45nq2e9n76x6kfw33yo7elsas3umso8hmtihgrkp0iha49lnys3vfjir1g691yrk0pgk3i9kyqgxfa998jeo00pe58c5al5etd4htde436neb3xxftxoypdmvyyu28j5zuvsepg8hfxfy9w65cn2faxvxploet2kbhzs054n1moymkc6e4yxedayfx5omup79wvldknhrll04lrdpwe5xb9gegrlbe32wby0uzm6cukk860dzq6iivz1helmmnuewk0v396btxt44irllkm2sf13rxjj8twg9r5d47o3vif59riuuirvlyvdnawii1mlu8xvi6ef4nhhcta69mbx5kdwjauqzswrs0toj4c1nne1oh3c975sis3im52rile4hy4k1horhmckyrrwn9e8b3q9efiuxsctgj5o3juia02b47xugmb8o6z973kd74gqj9v16af40rbuijawqji1wa8ugshaec4e88u4vr7tm1efd14hu5c1z1p2wj',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'fnvg8b7zec0isd85mir3kqmjntpt73nmwst1b9ndfg7skbyh4z',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'b5evunn5zdh324fhy7aw',
                channelHash: 'kbsxn1mnoztdkcwz8kd2n8tr2d9kgbspcf3riz82',
                channelParty: '2pqamgm38ox0ew5u815m6gn54l45qwiefojhy5ajbem7z8pyg58013wfj89wgr0ab2dbhn4x90civ96kp3fr7afhylxvfvbjew3ja5m4b6bpuooelxr45fkc5dqirn34hk3r3lc7zewhn4gw4gqpoy2eqn9y7o4f',
                channelComponent: 'ay9n5xux1lkvvbd0cbvsugo2z11lousheampyc366h66efmds53ro7w3vhv7ag9zg1bddc4tdyq26kotxb7smrba8x4nm5b8ndw39ugwab65n9nsk4yiuzmhtczm4wjfby9pwmptia8637azyx3vzycx04nlom59',
                channelName: 'ybt66b7ksrkw4xz5o2gnb7matn81szo05ustrgl5pvuwgphamw7stxrqddc903tvspbf2dvi3wr9gw3ugg16a057pam62oj35vhxxsaxdi3jchi8y3acpuf3e4amtjam6uopksdjo89bh3gx7wvik5hl72mp0ncq',
                flowHash: '5g0qtg6wmuosfjz0ksqtl97j2e4q30w13kfqentc',
                flowParty: 'gyeqvaztiqfug5a2mr5hbc5zzzqg6iusfrum2pp45xqs4wq0kytfbjxb5ydvxomj8kwuetl42z176erhlaa5rtd3eynyvbt5twxc6xa5tag3wshnlvqh6ulv5ro9qcixnsg11zdm1su4ujt25nczebrdzpxmvvab',
                flowComponent: 'sfhi0xqk3oxtkrlyimnkoxan2k9gog1l931l7sao809nxkgcb057hwkn6z9oattmzguzpvtej93j4kcjwdhpdmv6cnvuzg8elgk3frvo49zblcug0qolbt0rtxu15z3weshqxhe3570lr9u0jr179zrgmshfunwl',
                flowInterfaceName: '8e8y0u2k6dcf12xuz3fe5c94oufq5e30j4w3livvwh45hrcg3p0026ii05fcja3fkje42v5rljyw3puvbapzjrhb6ktsn34ubnzj4nq8jyn4zrsdm0uwf0wdr3nxt849z8l9sp7ctbnlntorcmvybtg340z60s67',
                flowInterfaceNamespace: 'tgyhi1u1mv5zdpt47c97kairkb8vqf59kb5qv7pkwx3debuad1ndh0qqjpk7kt3v3r1n8kw8rqmwey20j0bvjcogxyhveeso9vlje0gwc80n8aav1ojj0boebbcllfz05r5bnx2s5ti93pvwyteuhgw3jhgdpfmw',
                version: 'fa73igny3knibxjp6cae',
                parameterGroup: '0tnm1tyu219y146njqevvahj7mhrha31zyuaop4bh1h9v1d5n5uwi9ejconh4gag5oq3uh8m8fgqat1xvasfvmyxdsj1gn7ms2s17otb1eysedod26qhy6gk5zzv9cmvjpws2oxz7lmzm50fl1fl6hjmxejm4xdi9iqlb4rxq2e2rrha6832v343o6cby3zarriqiq0t3k3t5vpqrmm6r283cx8jeb727u02cm96jtulb7ll4wrxoka17t5n39cn',
                name: 'mm35bns9npd8bwft6f34tj3i4rwhcf8550jrhe9mgtmqflbx7lnxwjix9jxr24qcahq4n8y4mvnhr8aev2hykvzq0exd4prq3evgkuih00b9uhrk0zoo6ldg8ql2wsihg9ucx0gcrewhxuptyhr5vnf8zkal9ldp5x1m3ht8qvyn7t0ldtub3084fhof5tysvzyjim046a6ndq4r9rac2fjw2pbnmeut1t1nohh0tuyk7beruuimsssk8dofgv2uecgrie40rjifm3bp94bpgo6bmzzvm0ptfvd1ydx1pd87m0cd4sy6mxafwcd06fqg',
                parameterName: 'wf7yrs7b5abl6nuv0nzteavheavkrc5n77bc3chqrzfymdpc6rwaudhx7edur4t5r9a1c7ryx2lt42htmfk1lva6eb233bnk53tm836yexe5sp5gxtqq9d3j3heyraphoxzwvr4xfwyab5snmb0x8286wzffyjl4dibwzmiw262lxqnt2zm3ivmpu252n4jigkq72669ppchlopr19t4pgtltea7pu225xmdqor82d8telffmqu273nh4dzvthpt82kou5x8pjflp3vsidgrg4wvv5vlx5oormikhdtf12mva6wen1g00ruxknslsv8y',
                parameterValue: 'euy3nuo1zpsxy272a41dk2dpki11mf5b59mqs2kw0z5n2qep7xf75kr8v7bcvphjqgipfche3ajko1z3i2xvxcsk2tqfa19sooe2s3jlgk8pype4vq7t0qqzlfvjtnxb7cq8aegc4ey91qe86lgk7zzg8b8gqm2mr5mbsjucfea3ebe8irvo1azemxeaqot0mgnz6gp1fpjd3xo78ctd1pxjsuompwv7t0p7zss7hfzdi9bb9mhhqdg976zp9xrlxssqzdn4ceknn02b36vfvumqrutrl4l3qy3u5gon8xu1cbpifzx4r4ylqiatdyub3k4rqo03uqnnxhlytamooauemk62xk3eyuisrm24du3a94p8i68nj11d0gxhwewyfs54sh2ts8c7dc8rs13mg0y6rk22fmpqjgayeq96mmlppf1sd65pf9qwt1sha7gwaowgrolm2y02ld2r2056rvqsabhemwvn3xv5y282qvr9uvtggcalawrti3ol56gyp8e2tpgt5m79ncrlvud2d87nbrsvpb1l3645trhiuzmnigfv113xln5vpqkuetvhsrgzmm63abs77den50i0snfrh6d0w3ghmyvdkv904milz5zbkp7eqmg92zhvbe25htsv4ftvua9j88o43rugj48sw5euzxwda5m6wsa93ddi98i55335icoc7cfakgpxmhamfjptllc8aikh908x696stb55eubxg6dkgr3ubp6l7mzrqfm5m0x9144jt9np3nwozeipa8lm849npoygc2rl88prxi7sjqyhygo20r3gcg5phop2xw9rwjdsica9yhu6si3xkjtvka5pp7d80x1uz9ctvtl7o7hxw5fifzrdxkxzo1ncdr74uz5x39il3w7dx5d0fhn41s23oek28bj7mar6lqd2wwk0s631wo81k5hzk61qwazbxsc6n7j0cov8kj9xyfa0319mjo4iuexsl8pipmpr0abxvw5l26ib6d95zrze5qxvf4rjnv73',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'tdtubl3itu4xr7kn5rhjsgi7rc7gcag7oessqqojv4x9u7wdms',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '4bhxm2m3bihjm396gzjp',
                channelHash: '98up9zno1qoca5hsqfg8xf0bm79oli7rd4ngg7jr',
                channelParty: '0eok0tgq1idao0ejr66o0s9qkg96lrzbicr1t8mjq0iovxoi8xvz61t6fb07urmdn11xtln7nbu7jbt3shfrlh3dwwanh7lt0cayf9ehtwqkkgus7hhm6jy9lbw3tl7rv7if26nz995cv8afebc96u3k0a3x4p78',
                channelComponent: 'k6v3zqik9ej08jbtmiym1bl8mwd387f8nbr4j5vzii8lzx6hzm7u6zrvvfo1ljhnxy5syltu5wc9pdf6i7pgoq81mizkq7n7wgazuf5x1pe07a23pdku3sdo8zf9un1ruiuwgrogh8fgqfn6cvjudv5k6i1ajx9m',
                channelName: '9gjq53esiejxpjxhir41pzgymmc92pgj35oc59ulvidzpx98euyw9uj2l81qeglm6v6bkws88buulo12vjpwxzsro4mkkjn984dynieksq9hl8is1yszf6c14p69ujtju3cz0muowlbgwuqbukv8kzs6hf7yjb33',
                flowHash: '9h3x6tmx1f6cqsd6kiki7li9qamb4hm6nutp5xpy',
                flowParty: 'apso9t0cc3donxus7xgj9txv86fv0u6an0lholjffbrmy9sjo4f5sj8f876agxc89gx6klbvpjtdwupvfdv497xwgra2zk7ktvk0swvd6fc395bhfit76x6idtcklcp7tf8vg5u9mxzm3200rsvrk64hxxamp8rp',
                flowComponent: 'nj0rkus5vxc36e1osodmvub5m9hsub8n0ykdxd5ketq1h4rpezh84gzj75pl4b20jeapwazwqswmevc5lv2ukqcbq2zt84og5jv0bx0ggdgqaxf2qfhmv4tqvcdj7l3uwmonbfg4qpwk0lyh22i4hlt2f22fj78c',
                flowInterfaceName: 'y2gaqo1pdgh79lvsgk0731vbedzrebve65ah5z8h1t6gzgw3xuwyq39jawd51ghjob05a5lvjwmwz5ghw6hg9iwh5sssxo3jn8vpdoa3883fhhh8ohucgoadllta1lmv2cvo53xw7m59svmc4vm8x3w7p1023i8n',
                flowInterfaceNamespace: 'hxodd3h7ds0i1gtx6w8czsbesxj32ht6t4me5ykzja1yrm8sn5afe1wgmi5uk61xd52t3rymepakeg26cgc8ijai0rf7jtx8c1oun1lczcmubwx5e6q2glt6ff50y8zlnfhcytpnxfbfodsjsx2bky9hi7qhb9zw',
                version: 'jmlbvwrm125d46koyqh1',
                parameterGroup: 's8ov3sbmgv36xcv9ne6bfea3abj0osfqgsnz0hwecgut0fpkak2hurh39ubvlwzkejsesa0jra9beb7ng1ukht75c3hhtta5ep6g38ouckjhcp6h1jmxpfna8hketljxohx5id6kb5e4yxc1zg4p54j2ii2p2iw7y7io9ewfkrjtcvrokv0h71smqxcj3uj814ao30gvuattvmt18s8gr0u720zuuhwv1dtn4ym5xan6jky0tilx1gmmix3nkwf',
                name: '7r2um15sky0npz4civxcxqsswz836i1cgkjfu5zbhg1rdiyw3f39d9dkohavwsje3z4o9rkvbmk8wos75vrspup320mp7h2jsx8xe9upvpmvyky0rihlnqjkqji6o3i5gz5m0f9a6ivn3td3ou5ng65rx6bpwocerzxcv43n1lrgz9og37bv4sdydp1afadfrhphd161bwmsnw5prhxiy8a6ac4fdzzmz4eat8hn1swc4g0wn4byt7hy8ruqg7rqo59e86rove2315g3s5pth2y57i0g253j6pmwqzm1oef9t326cn4v39bwgegbt5o9q',
                parameterName: 'n4w24awsnu4fcg95eisfvxbgnha0n9vx36w2hi4ftrj7yzgbb3mlrjl7gdqj8c73vbz4wkpmqin7y1lgyovbhuyxovytih50spsd41c1ngej4sxkibovrc1ljl2ioj3e8jm5vjsn4edwt9f7wubgwxa0my44agoajwpjnd98o3bc77escqcq0vwtez5b8x3e834r8xsd2an065rmfrscq1o6jrsret5ihj66eqpxepooeyqrz0ba18goo9fvti12lyz06q8sbk8pngb6uaouk6zcc4i5y5y5p690uy1o87oohedp0ty0fcn3ubv881i5',
                parameterValue: 'ks77y7b3btghkbyajlehd2i1xpnd5bkd5tuzt0u6xg0mg6g422rre7hmifc7hl5o7j36z904j8hgk3s0y8lpz2suo6m5epxejcru4cggytl76ub0juuu7vulwckb94dz5no9l8zuimjhdb4f6j7efm0e54tuxajlr58laaupqpnikdug80e852i1z2gm1gercg9oynm5160c1rax5t52kb94n6xtbzvfru8gpit3k9zfc2zy96qrir9pjtxnq8q2d3evkvo86w5o8cdgw6gzqi5t22lo72n3mtoai9zagifkj3lbt14urd2n4mpwqm2pist26ucpmt1et4rl2yhyrjr4rmsr6okcp0luwjzuu98clow8bo2zq648mzjrdqrvxdalk3x01r9guatckp4b9jbiu8f34d1krzx99imd7dykhsw02cgbeh77mckpbldv4w58rgg032tnyqnoyv1fv6xkcj430xuiazqiqg8fo927j77umk7myd0293s87dqx4amqv8pnw6zieyyicd2pl0oqad4q3jfd22fpmy0hst94tb35cp5ke6ngaqr6tgik9jvgh7x5lbmqhswo9jhj1psa17p8wczhibgi4m3w2nez94hle9ddjhyipp3j01nawmq00v09hjvxtm5lsdq8o7jea8o1uynzk3zeqd5qupfrwj7xcs0vouatl8z85lpmgvwbatn52hcrbz2pu4lc5bes34ziggz0vtgdw0anhmpwsvzzq6i91ocu37c8cdhwxhar6sc2akxdxg5dqe4jrffp6pjn3oej3x1ueb5srb1mxkbh888jcu35dg5h0veryiikhkl99dat3cbda4netf6hx6667tv27ji9fvn0bj6tvnv9fwe2er0fuwl7v0xgv7rhsh1nuzt23jl334inwaw4j0mnafom7jjpi1m25mapfal8dgsbpmf6ej5lfmtot8yblec643vr8jij8yqersgdeysqftk9q12tu71a9ef7unmyw95tup4r2266dyqs',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'qh5xo63yo17zx1481xad5jdin1ipdit0ifsrgv0l29c9md3q6i',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '6q7vfjkri4ka1c3hqekf',
                channelHash: 'ihytc6wrbykf154tkwzl4qpool9ujtixtmqpdrmh',
                channelParty: '0nq6cgjofqunzx7kootu6pso9rpcka4kcwxt1p439ftjz3glxlrimfeqvqautmig7gk6yktr0pgocqg0ktgo7luykxy55nkf3erntsecdq1dsjn9dyp1tjkg9vn88z5dph92bkcg85k5xxgyv1g7nb5kwf6k21vz',
                channelComponent: 'ten58pkn1nigp6igyy0g21bspoe4y3dges0y7un9clnphjikcy2guctntdirkifmaxke7yuavz4ev3oyg5ym3bk30l1vm2zyagqcfbtcy7khkujnhmvs9y2zknujaozefmjfwo521nb15xzzqm3tcd73wn8cfat6',
                channelName: 'v9qm2ol0mjox2lh19yk83af77y7bikjtl05z8e8idwjgrem3phjqdx0aeoi8ja27asq9rlfir2k4jmgba9tfwvdjhizdvkvzs6ji468nk8pz9tfzszqdeqmqhu7wiwl2e8lhb383whd7h99pwt774kyp62nqrs57',
                flowHash: '7hbngps87lb2q35754ci1fl76iyvsjo5h44fj2hi',
                flowParty: 'pc2op8h21irc8psehpjnlyb17ouetmgkq1u5kvhxxk2khx1h2ivrqa7eau80pvyqkhd1coav3n779wragof1e6w2wppbymzzoa9ffk81rjpaf51s24cn753uhq8t5u9vbjrb0kx5m4p6rsy3q4te4x5bjpjq3p1x',
                flowComponent: 'linqkwap7upssz0l9m1gc44gex9d40k0idjp0jdtq1xs5i0xw4jmro90rpo71zm8vhd1e145vptfg2h2qelelkqede5zp34bs7y4pkcwiyd15la78s9v67b1cwdakxvgnorrgne8skhcaq1xh03dlz23346bhcj6',
                flowInterfaceName: '3ri3mjqp7rxvbpcbm251275mbhs9quv3yri8gt14ehlg7rcf4ey5stvg5da098ywzufrhcgabouoaxx0nz3b2qzt87o1qnr9hcqra7sj3lavp5ljudz5mo6ryrve0dud1q7jjtxr37ohjrxbkftmhootytulrjfb',
                flowInterfaceNamespace: 'rsah1fwyrm1rssox46xw0cujqbtitnq86r1uchpllsplb6vmweoa0wp1cq2e8l6uem1pji7b7f7y5d9400mhwtn5k845h26vcok5zkfzsuh9vtcv7cikrfnk3hgbh2c8oz2n6674svhi35ajym2fr5o2m4rohoe3',
                version: 'if0rbiha08tvue2eyun7',
                parameterGroup: '7cpd1y56ew4ogu9bxx4k370xyz6ja4avg3l5wnae5zdyjffu1ue47pgfhsl18h7t20822t4sfolek59pl2epa924ft62f3v699o07bucjxbkab2t3a7wq10d3f38d1xqnjr2tvn57vgzlcmicmp3mjr2ssnpcvtf9w7u556cdbqzgx8rgolpoqjboyes7sgmwi5mztn1vkpn3daihbbwbhw6hh5i043kixfdg8knm5s8gx9m8jva3iigqiqu1xl',
                name: 's4ezspsy04sy3zaxk9r7bo7tzuwg36ftgdjpy8tq7a9d870bil3l7gbfybi1i8ikwe146w3leg7zbp147gdmxqqjp1mqe8mf7zv3rx0exzlwm7v6abnj1lnhuntfdsldvvvn8onegghq8yt0bprothv2jrfe3dnr7x6nk7pstw9lq1yg5uht2dsk36ev0dzgls3dyuzxm0250rklueq9o8wh2rl20qrg7yn7c7an6g8soa21v1jioen7o9vtjoptwbagqlsjacjlqr8f1u4epyquj3m8dhzllv6qgo8l786k612ogrctyedft5dqv1jw',
                parameterName: '6ysvqpcunx86k9gcu2si044gptiv1c8bjlsllc6gdo1jxa81m1buhtdjm4oelc0v91ldfet2e7d3mugv5ctm00wzzffmc2bzlsr3efmdnm48qsprgybcqwfks4tn09pfhaao03nwi07jz0v2twg88x26ipqd9zqly27iuxb7lcz5mc40uqg2efj6bdvx7y96l48ky82tfuj1m0kdo8znl9pgbojq93qygqyyly1poplz3gc7acru0a4oxb9w9886je17r12xnfs0xpomz08iuzrfugz8s7igu9ueid7pilwlskvnjctg6oulefis72640',
                parameterValue: '36inorth41hga7lfnj1hus7or3h6bkx1gcf8ljk6rwcjnfk76r1857nmz5byd5m3glo0wi5bebqvx4ju3qd8ygan4h5eidi3jgfgtaw2w57a0q948xvmzhlaeuool5jxmx0yc949yvfhl88tsvgb5gdmry7g0p7ieypzd9yimyd8cqj3u7liwvtjo8npczflmt16n801dqx32qgu1mm6u09o56x6e5ltrki341uomkxqg2b17bv8si7ti0xpg0un89tjqze6rdf03g5oigbasx81zxh4v1vpdjw9wto38osx3dywqk00dgsxsq8va3rbhmpsgp6ltoy4ymo928u7eovh820svx0pdra9jwwuc0359c2cev7q2s3b6flxl7pe3p07s1ksg35ibk2ni648cxsgcukm5wjl11d54uf8jtvfwo9y89c9rdzph0uhxf5lkslvhisof8k868bjtya3o7ypkij7f9u8g9wreg3d3cedd0zinpq3sv6mbridm993kf7kk3218oo08d60pmk9y1pigk3isx26gpcq1rmdvs45c4tjquc8g6jz4cbcgwvwh4eenb7sykyxk49ycjyt3508ruh2cwzsa0viwlgpiac3wigxgznkeciwuxxnfwd2piqk8kyyeu5zz5vz2tk441ovhm28jpp74pw3cnt6mvzso0cln7xo1g93dob31clvkxlxyhs4nwi1ggocteo9o10a31t93oj0trr8wl9w8su3rj0kf4i5navsbi0ctw795ltg95jtfzh2fcmksacb7jme5dlzqdss1mrvuaar3wmy9i90bnaxxcmjonydrw3d15a07v8bv09ujrqsmdjk939kk1ljhaij52xd4pk6pw9do1ra7pgl18o396i033nv1ueo6hsasiwcv453mmjl0qou3txa9ds1h2hl8hywnonufqr80qdp4uu0u0epgrdr2d120np13m85uor69xnk9i6zdt9f92msczrdmpofyuuikl89z7pi2jr9qlpj5q16',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'lfaigkxpxt7wilvkie038mglmfjvulhnakf0o8nqzmeygkft6v',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'jikhwtbd7v9fsy0cw31y',
                channelHash: '9ezivio9wszxw4wko6h4dkmrn5286q9v1ll0d7jd',
                channelParty: '1zk5ibinbvphp1s5nfhu6suop95r7yo6udwvemaa15vnyb64259e8drnvjkaa0gwpkd3jim1cm353tgfkvc3vsih81u7j3upauhk0sgi1b3ppa0n89ta5inem1286yhe0gwka0mrdvdrhboybubwndvcg9spmb64',
                channelComponent: 'xjio7wnp61zgn1lxkm3ndgz8o2lzxd68d0ow07alkynfjsqzmv2tm6bhe8t3k8rrrjsd76njaeenql15pqwss2yggxogecf601aa67i74i0f1hjw1ygnby7f40nes6go412u1emfdmr3l8atgkut364c5yi3cc15',
                channelName: 'kwxh7ylakoyh3by54hyyb138ugtu7a278dafjyfalztbom846wt0ldbpt64eg1kxjmevwld7p9ug37fiq8bei2fyasndlpw1wvx5pp5hqc7w6e70u9oosoym4gyp0gjft0fisubpwtjma0jqdckbtgtdy7zb9wlx',
                flowHash: '1d4rtrl6qycuzd0bbkxvno701nowgz4grt120auh',
                flowParty: '4b9hob2ipe8pxnlfbvx3s1sw0skkkfnorj8c9jkajoow92649qtiygbb9utk969vzrc0wt5i6rbv84i5l5832m4xmcb8k432saw0s93n94um3bepdpmhe26s738ta10xdojcgbfj1id4pzmp8rvzsdhiz21ohiuu',
                flowComponent: '0zxhso6opradv3c7zs99rhjzha546nrke6zj43m97p66o6jacd0fg65xe888g4shff8j9roqabf3y3xb1sbhbz6d9d60v0kja0aq2nvo76ax7znp1jhbqi6qowuwrvv76ozdy07qzx6jn8uffgldgfghf5o1c82c',
                flowInterfaceName: '7qxxyvvg8zgn00hylavg1hav87jska739lej7aoyb3alb56chpoqb31ci8yf2e3rgcql6jn2fesc4ks4g8nmoa8e3otpe06n6cv87989c6v2n0wlqjwisasoy0i00uiz4a0mdrqgt4cz3a3cw2tmpppgg3pjm8io',
                flowInterfaceNamespace: 'fsz5vz51fo2tukxhlmk5qzewavm6mdewx3yknub22km4l4nvm686vh5zogb01bc062z6vsuub82fiq7hrmu4xpy709rnxdcwgmz5be25pfps0pvtuilhzf4rulh7xqiisnqnkipcoo9761tuk2q8rmsbb1wrqljq',
                version: '4zarj7hpil9eacgiawns',
                parameterGroup: 'kgzsgsnv8il3ssitfyovlx23l2i7udqmbz8sldjzk30i2yjex3dp2dfmp66zgpn5iwxf7sxejo5wn6ep4v8o2zqg53ti35lqm7kshjfruer1a73nrdg2v9kcgio0pp6i6ptae0shrhh29hx51jimgxojgamqzm93b2b2v4yvj9kk7txspil2oycbvv96927sszkz0pum22k7ajc0b7wfqfgbtkbtafm989vf6ph3v0ljyfvistsdsgpc2t7a2mq',
                name: 'wwlhksj6k99uyjl2cum9cfvuxi0th56290d4cbp1ripjcg8d1lnfbq0n6lwv7rz2rvu0x31g1lzosjtdh1m3bi0pd84vm3fp7gat3g5k7m4qrdljuijrz8h2ckim5w8ouv90shqdbursuzdkx7r0shasayc380s2tk8866vc34v38ma3zwj34whzm6r0sxn7jdivmef9629d879map8bsdyr8cp7emvsdia02rb2tgqpldku8f4xg4iqvm4owusjd4tnt36de08fdoxuykl1zffju81rpq35gkl2iu0xs39ou4nd4od5gwnoaov8ynbo',
                parameterName: 'clvw73aosf4v46d1t4k2ro0aygdlxf2zmf7zm74bnytuzxz51xtt4e1zt7ratkj79ft6rq7slha8q896mwn3eqtk9f20qe7zve1vnuqqdmguktpfrym7u38rq9c9rv0eeyfjttljq0twdbyfbdx5fbfdlqxxw54pvbktx530vs7kaeipdgg6283tl0pfbewrky2r1z5oytpys16z91t6dbysrggegmz3aebmtrzbh85yiictnu3rpuwtbpmrlcdla7vz23r5xwdarbavyvtrbq3ovnntppdvyk6tdb7tugt26pz7dodm7xegem5ipezd',
                parameterValue: '9n398691jkr8hcqsdhjc6ri8lygs0jx08rqq1tb1gbeoizrbvotlvxtyjgtqujp2nrqsz5eq2j60mx4b8vogj4zl0q5fsrz23u1lw4di4ch4vxnimrf8dwp4vvpnzuiows6pbe0ms6zyxb4778xuelgkhe04asvryo2dntwf4t72dgbpzbpilezeqwoja96y88sfg1mwigxo5j8w69ubngv2i08mysnyzqqcv3xido8at9dumqobkruze8gel4hym9348oq4zczg9pd4pbapmgt0u6q06k3mme1s1b5i29qjlgl060d00vpqq7lsqt4rm5246l0frxvy0so0woya2q2k5rqo93odcgb0hrlowt7rkin5v81snttrp2pa0um2pgbxkvxr6ay97ufqqyiqtqneaqebwvw8iqepku3p2cy0oct9lo5y0zrdfrc8qitszxk1en0c29wztpqpw64fe3je96i33qj1zwlo546nlis6dcre6yxorxm9v4z36mlldcjk0wt5gmy15e3jvuyrzrzefnfpu133i9k544i8wvj2q1xqbpyli2f6lkqsn3tzbk4pa4l0nvc26oazt86l81me26dwum70ehz21ot6g2q2o6cvpuvx7mh1to4ut4yiwex6iokfbxqh72jv9qu7s62mcs6hyifu6e0gvfhx7e6dn7gmjtw6b6rq7hcnr6eu9qdg5fzgjxcgtzwsqg98n2kyybo4lvd5pfgeotpjqde6pb8w1wgybvhqiawsxuuvgdv71g6qmblmqcylsi2u9dashaitat3s484hit7orsq4i5l0qwwi7iel2jd3z2mvcfmb7o407kj7hbc2is2xha3urp7pe7kn390xuxajdtc08qd0be94voyldfvsk22rcmdqtoq2ic42kv3z97fjd5vdj9nvdxfd0w7d3yf2v5v4argq72v0o4fe7t3uqqnmiy3x0zt3wdqksjerdjuzxuoit38iptl87sjzwdb98oda9r9cuz4v8o1170xkei0wu',
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
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: 'benkrb989szkvdwatahporv305ffh0jvj597l0pkw88qkfddz5',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: '7xqu8tbeqag55vuwz3n0',
                channelHash: '6saiomff7la52o4oyz529mm40w9s8r9qa7gwuq5a',
                channelParty: 'cv9lpd2qemkovi5nnxcqgiaqi21fncvioc9xgdprp8hwglvxga0i6jxvz2me1hxn0v3ygyna9zrunnce5q0bnk3gehyjpjxpwo6mr3rwuoditbursnejd4yz31bho24zlfbztvwctpuzcevaenvl51jy4acx0tb7',
                channelComponent: 'og9p07o68mukq5s8coi0wf1il5j87jeddfrb1geriznc97j5u9btob4xd5n7723pmflsw309bdpxh4adhal6bgcvkanw2nm1uco14x99i49i8bv1y4oil007m02zcgwuy0o25mono0uri0s1r4gbzik9wb8ijo47',
                channelName: '9o63kz1bns24b1hyk7g3420aohjx0gi5w5y351v3imyyseram4xjl8l9eppepo17hhpckh3xsdwfxcng4i8luigc3pjbw2xepjym0dahdsgsu0fc0r0qhw3n7l5tbiy8mh6i8e90sy58uetnll9fujnx5u0215t0',
                flowHash: 'x7caa6lwljc3zpgriwx13lr94x4ba66dw6kofpw4',
                flowParty: 'ahnw01s235asj9tlec11oq5x6c4y1pf6bckftdqjwusodliw81ab9iq232a12lmp3f2ta06n8zhrzb18wwnnum8uzizal4xbe93nuij4hgppkeyry6sbdc7ogss8vf0fcczpsmf1oz5r8xmtibciroal9vx7drko',
                flowComponent: '4a8i9igcrt2bxhq860j5a9oy0062bho3y7bvddmanl7eeyrocmg4kzo9ohbmyh5ad331nx20xqvz3ovw43hj6w400rlyvyaa9jg7i8skagtusg7wcnr8ww98z9pr9cgdodbh6pcy0x7xpcvum5ceasye1tacxuob',
                flowInterfaceName: '5824agver89nf4x8leol7v8x93dlmpd3ywnnqqtrwh5ohojjb1oml5yasiwsu1y0axm8r11o64k5behla4lk4mzclo1u7l7xnao6lg53zfzmx2u4jhj8sm3y929mp9xv4t9vqflhe6lodkw8z00odqi76ydojlmj',
                flowInterfaceNamespace: 'pz001sm68yo3fmlw9rsx8d3bo48hmdrzcw0i0qsg55hik0r28nsepqihialjbxrfa3hu0kw12s137jp5k4fs92ngtkopo2q8ctuqa8485er1c3dz4qt3i51dbcwctyk2x91satjmvdtley8fz6h8l3vhipekc2le',
                version: '6r264zv6odcl1nmfqtkz',
                parameterGroup: 'ybwadtl0xkkwhmj10is038uacv3w0d5yycng9ixz5xodw8qg7mb5e3ru6mzyxmthirsfa9rdcnpqrokvb22ouekm60ul0w74pyx7zidd0fadrw1exlp87d6tbc27p92oqnwjpv56l0e5pp58pjnc47esonjvk9rsajrzxge0dx83csu0k3yptjr5r2oi08nm90iwrxbso5zqd0zkpjdtp8zsb9jwbjynl27kavmvgcvu1fvhft82kl77smmg4h1',
                name: '1snpc61p67now8qcsxcxn06g4j5d8osesd3cwi4hubv85knqpt9nt7mrx642p8os4pkockolkjy40qga9d7mlhsnocw6mw9bzs4yy8xs2ksrl35m4hd9036df842v2lxlv6lbih7o1e6lhx1pxul2g98j9f9ky9yv12ys6yd75k3mkfj7ikxfioobkbmlso0677eo9048i9avbko5sqcr7kuucsvuulibfleamfxu5xfbtt3g3z88ibizcvitw4ut7qukbfys51nkcxopggdlpqebjow0evqjv9o1g61cgcgs78zjolyogwecdrcmnxd',
                parameterName: '19a7oi4mz6vtljq9ni2preap051igp2407r3rkizqjz6zlkrqqprohu030jorhczeqo3ldui5jhtb3ochw7cc9yqw2j8i6h5y6dpesv8gp7fn9d3u6vp7t8o7j9o6oyezrm7q3evhjknohxfuf1drkvls8nrm0022odm875v2a6gbwwtd38jdpuhpk5ecu6vz3e6lnvri53osaiennsxjurb01nzmzdxc0mupp1ecasrxyd96pekequms4e69w4cj98s6t02d8b50wbrs1nr6qnnmub200gj76bqu36zklep3sywarw6dvfk0kmomh7e',
                parameterValue: 'rloirj9xz05n2l5xhops6q9bbkil7c6ov7bws30l78ppna1xhe1m479rzzbr4ci21jflvzmu1ie232krxqsm3mt5amckmerskhgqjt4ve4yojz1sah20ibrtduc63h4nwph22n8zb50iy2puhbuy21cb27tcut4yikr25d925mgtkb0ev8q7qfbzo9whdarok8zhtrek2qtcwhqwy016j9ep6axdh21aby4iia97c8wf2vh69fnc5yp83u3hk4uolgx5appub1zom04st1qs3bozwl8qjiuk0947ok1yjlksfavidjidc7dtenukl9x3po9skdcnms5mn6x70i2qt8ftlf9ybu3yqi5gz2ovzni3t3uep2zx61m92idiwqn4m33lwztn2wx4lvo2a9t7vlllag4qav2ix707ocek06wtum3nxoev4s47wmu6fkzwpj7futtdfgnwkcvh9nqgvcpyy5ph6kth1q45ebqrx11i8zkwd18cu0gomhjn9498j3zxx75fh0rks7kqkz6mpblcjpukayh6mm0e1ir7b0alstvetko17aon13sswfdcaft5lrbnvum1yr8nbwwwp61rxn23ymveswolhfs4fqhv364a5w3yal0dw1ifn9exnhldez747llxkgj1a4ss3t7rkks1a69be69xzwzb4kinudtae1zzhvucwgrfsqj35hl4k03slklvnkiptncyycecogj08wqwoh6hb3zejlb929o0vejzr7mjtn57d5act1206wqqbepfn20kq5lmaf0h16ce5b00s7pgs4e8e1qsbji82xrowpwi8h4egst9mjusac9b2di3vf62p2ca6p2o9zle78rvv0ge3z4ruusoqeuczmmf3pcbmwhzvpgw4wbs65uhjippwifmnbp3yd4rvq4412dbahhg9byaos6x63psagcb3yk35ehwkvs1fp7v9x5hc2paa5a3jmzy3mwi1e5nmgc4fji0af1b39dubsvpe2zh191al0rk2lp6',
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
                        value   : 'da8757df-061b-4d99-8d62-1dded4160399'
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
                        value   : 'cb486ed4-d34f-4b25-8484-0700d59b6920'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cb486ed4-d34f-4b25-8484-0700d59b6920'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/0122a628-1064-4517-8634-957defd085b6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/cb486ed4-d34f-4b25-8484-0700d59b6920')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cb486ed4-d34f-4b25-8484-0700d59b6920'));
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
                
                id: 'c98b62b5-5496-4799-9fbf-eba827f06362',
                tenantId: '790fdff1-0879-47b9-b1d9-7c169ec11b63',
                tenantCode: '5qzuwm6bhztql7s04j33226uzk5lsjces2ukc11kjxh2wikrmn',
                systemId: '790051fc-c4e8-4fd9-8b06-f7a7d3fe0b25',
                systemName: 'ki6tqylt5fz7qvn38gsz',
                channelHash: 'naj4y7dwlvo21p0v6jxp42wdnqd70zqyn0gsgwxz',
                channelParty: 'i58j27wc3icsignblmma0gldr58vlgtacwcvfg4mf5l5rehyey3lpgecoltjwv7yvfjw9vk10aoj8q6d4cncle5p3s13q2aq44fg6jv5np13ksrf59w4m8uyjg1g85nnr90ar6zv9g3kxn1dudx9k9vwky7zceh5',
                channelComponent: '4au9yiv8it6ha5pmbo5s34gugx22k9th67jq4cu30d6ucxxsob1gkfwhrz08h4durp02l01pi5bhdry32x47yib2p31rmsszt63t4hweoqpgza0ren3ppasediwgejlev4pfnw8c4tu8dmdxts8y45ggci1dw5n5',
                channelName: 'kfwjn0cgtbccenn4vp042hbowe6wjg4p26i5gz3s13lcmhiciheqp2y4wlv5s55grm35or58vkdw54mo3t5gjnpxmo8dw27e3xpndfnk63vnjbtpo9paekvhfyaraus2wdumouno1v7vfg7chq8yqxoxm72uh4y6',
                flowHash: 'z2fiba7qqzi2mnzcbj07t57l1mby1zixv2ygt9qn',
                flowParty: 'lxyvihqk5v3sv4982w8nrj7e7eyjgnzznide7vo2j46cpia5g6tvmcsmmxevfizn9fc7xkg2ceej77n68p1uqy25z0dgnkuz96my13thsm1c96palfwnzv1r0gvx4re4f1khirb4e2qrercvqn0ambft6ojzqtdh',
                flowComponent: 'vfoek7q32sz8grgczw2x4d4dcr4zy790cuwr8um7t0dx2651dth6yhrehd5de81vkczfl2wlm7eyaeloqb4xe3l8wfcl3psn86fm8drcngjvzu2xlrpgzb8nmakek9olrivd4637y7pcierdtv05g6idl7irabn5',
                flowInterfaceName: 'yb4hohsq3as8eqh4a0m9mps7tezruez41ybr2jouax41x6vbqz2oswisu3qhv7t1v2a1zbklyzutyn2k3t1btxj9w1cxw44gevww2j41oxgh9z5y99wrxx3sy4370ematsxf3n5oo7vt4uqbs6i7n0un3q760meu',
                flowInterfaceNamespace: '0ef1f10nqgfv3k75bsi3etl5jpntt2evh02c46rgamwkdjbcqnzg8b1yxa69zm08hufkgf6aw4hf9x13c6nxxvqrc0200t3jnsc6yem2vn01abf42qwh47nwhs7o1zid597267p05jm2la87vimql63m6i94ywt5',
                version: '96psmkwwag6xiwfm6n7p',
                parameterGroup: 'm6ofx4nhafkg6qme4b5vlq6b4dsb839c2hyzmmuoxyze3uoeq8rqlemvh502mnafh971kt9nkcncr43bv8z68kci8e4l4ngsb8l3yo2y5rdq5faa8re4g188291tuo5unm5uuvkhd90nue1l7tjyk65wsu9ykjwltf16q2mbjp8vg91xx3jv9ohmub6dhsycyu5weweoy6q6qvf337udessj4nb04rseag61pq6j6mt12vcobvq2azkl9dyc5m8',
                name: 'n4n9u1c4ynxvcyekop41j5nfoja9frnrwi37rh5gerfqsukrag2gnoqtxvud02f9nppg1apedhh64eka1jguhtksh1zxwosovzssqj1fylhxa4i4kk38it6yat4p6jjyndj9lui3kevvkptgvq0uwl5nwbsgo8mmfojtflosu6ds2y3th3p9191xizodxigm5uxwajlk6ifzvd9eiag46tqqpasz9ukmo38sgfu83mfijxybx7cyxd3wv6gtoq2vjf9knhwlq41ipr2ndz1jqcfaxbaeqnumpollejqvgfhhkhqpbev6ckpajf8mcbzn',
                parameterName: 'd40r2og86haux1sacsq0qe4zilkeh3551edt5xfws53kfjfr5q0ifgv4slwtf24gvf1pb42c5ej3mnf473rdmfb2gis4b2fbu3chbhnzc1pczdtuywggtng4f5jor368f67d1gx165nbopnz0cj8qrcm6o14wpsdlsya3uw0gnb1wga8c40odj63uswjk65e3es8btyiz88tzitl8x7atwa19ccka0ufr07wii1las9sn7eip6k34nrpl7ded99p7we226gzkmw45qxy1woct12xbxjtsszrdo9mt1gzeykqbx8n5lumby4lwdchrfzb',
                parameterValue: 'kmw367l51iw1mo7issi59m8leatb87y4ta64m8b0zbya8m39kgy1iglqh0n6hu15jhio2cotj83j7cy550rzclqc0ml9xhc3y92agbaf9feknpmx788tvipho3h67k8u3hc1ht97hs8jm9u7lt5yix0r3ef2sdpuq22iklj6yug5dkkxh9fw2nugctndqon4afy76e16r93hx6k1s5ig4twytcaru78k0wyi671hndv5j5umkqjfzdxmrsits3xih9e3oyjncd5339oujre625q0yn2lxeziwi1j3dii2vb47jfzu8k3gy4rt1notv4jnl2cs8kem1h9raksnqm9i3x20nnn5dt5va4e5uld2ji825xyw1vgjjq53hnws4ce1km4gotb2w12matfuixjxdzjcqjl47vyxnqccs5cqt8jf403a1ylanwx49ra1w05548ulu2q9npbve8pf2t9qfmwp0ym0jr3tllod0kt1b3y7n6ndip10wswwm5880fsputvyzayt5lpzguuavv7mww7nwa5y0q4vt1lixzf10ucwu0s0fb44x4lm3f5zdjazh6q46tmjjq4d85w605h5burh0dyteum140o50in86pq5xvxazobovx0p8r56gsuy52eta3u6omkl5tg9nkcdtywnh0vgv6r8x87o830hqwpn8mqt94e4o3l52al7w7nzi8zxw2lnp8djrccuogrjoo5emz4rtmb9cmzlz7edvv0o8ul6rgo4k6p1tvn9jfi1w1zfz27uv37ylb6ud4bhbo4k5laot6tlp7dl7qrtmd23wyeme2afbg5f0gnfnr3emsvtmp48n2el6kssn98190gpwndlkeuceeskk4ih9vmmlwx87z79rpf4gsqs73np43nmfdl0bcmx3dfwkhs6rlyqyl3taihjpms7rwuhlnmop0b30kwa9vrqcvl92msw6olwy712sohn2stk5x0ce9mjqyykyr4jrs3wf25bf2ju510rb2zssz5df1wgk2e',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                tenantCode: '70me3nkidormdyy2wai05nq6zijvjm0pocqrwfy98tmenpf7aa',
                systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                systemName: 'th59n7z3zbzym7w0u8sd',
                channelHash: 'tki7mpbsqrqshnl283cpuqhemctc8xtfwka1gih5',
                channelParty: '2ld2d46m0qb8ssrt88xg1s9tfq6xine7vqd1m6ltjai9z9ydldckhnc7ikx0i5sxwavjlpgh02ulbwsfr1dz17yn5k7v9ty7ntwh59c9achrdbtuulgn6cop8xvo2i9s5ocp19qzzpklh9prjaexuoinaaqa04we',
                channelComponent: 'roogpoas41e1eajc364yxhzitaa1v935blhbfgah92myayfpx4lv1revkcc61l2wg7ns6q2bl0clrhbgcd4zphgot5dyad56o38xbi2j8wjhzomw5t32kirxf1zmhsnh2zw7fp8olk4aw4s6xbr0b68402c8q5j9',
                channelName: 'ryu9hbdggyhiq8fzt9c4yr46xj8m2ixnpck1t35msutvvx0zc73jzd04vs0w2q77nwzcmxxfghdfw3pmf2y0s6p9jrrkp179kh8d6f1zjamms6hbt90lljg1m3xdkxyda8hzsm1tcsiyliirzp0v02w0d10djbk9',
                flowHash: 'el8nxro9w96impvt0bqgzgle0vztaut9xbx4c3r4',
                flowParty: 'rvwrg6mfihjkdto5f9bqoo18kbtnwd3mzup1h44zsjy2ofzeikejlvevgtb5vbh5m15vgfleu0a0b5osmyuoyx6sdfztfarhi55hpw79i8iy15nfq3lqw0jliu2f3fh2nzoelxhjae7pispw9uab1murtr75vlrq',
                flowComponent: 'cwme6j7v6gpjxz8y67fw5kvw5rv38y46xkr2t24ssbayj9t5u910zvb19fq3mrtrvh0jwyqrcjjl78h7he8pa36w3j1pletn5tke6iu6ks9t6pybkhvtgdz8l254b5owctjsd5ldkdqwzwuyyh51t5zgayufo4re',
                flowInterfaceName: 'kqdppk7sv92sd4qeb74h6qt7qudpksf62wnsz4ylokxou7akkc1qio70vmnvfsag8bizrxtp0131mdm61ako76c2ha5xsuh71phoxm3hpuycjpcc9vuvtho4aybpmz234jfumaeo9ogho33htu7p4cv089mmwcde',
                flowInterfaceNamespace: 'i9nnjhjv14ipojt2c0kuz7rvjhzdfo5w7869fnw8izieo845g1v0ay0c8ukffobvu0hk155jdaht0wp8w7b49o4jfou2v51dm0yqht9zskwprsqrsy5dag7h8gwmxty4tbo7vk0isek4z42ilw90eemb4wojnztg',
                version: 'wzeeb8q5fafye77fh481',
                parameterGroup: 't2ls0r3v2kk0jf2yh13reo5b7kl0xgyjeai0dzmp94r4r3gkcm3cj9qv653b49ln0wtu56uf9m3842evgfsbwcszlztrn0oi3tw7psf7q7gee3scjry85j6296z7m7wzgi5tnqmtoadhou0af3u5s3iegngaicq41jpm0i6j8rgtj7ht9ovbthh402t4ginq9h4c6lntfntud4n875wpa2lj6jaxya1n2g7cc1j57bof62saaex7uu4s3osnrv0',
                name: 'u6df19bax9ajamgmwgll6mu7r0nb9jf47p6r0onh15xzh2fr807cv1t323ze9qagjqo3nsoypm23820if81bxnjwobeqc82z6bebnvsb8bf2v10mflkk7l0hx4pyhvowf4ctx2p2k8zzvkhl7gdahoysmil3yprjmye0aux4hkv5f52eabjpjnfspzd2wobngmpea88hzvpolgp9kg7snk9mgbqup5nvnp4l6f8yjpbtn5lm011aljomjshr2bbn67z1d5um0yqzokm1xgnfpgltekog5y4gcsc2o8612yd8oo60tftg3o4thmrm84qd',
                parameterName: 'chvt4maofyzgsfse33itbry8pzgvuoxxk28ggycl4lvp9vcts827brh3dmcdw1es3wc0aokv0hyp72inz60uj0wssd57psj35qff67ju8nf4022gvtlewzig55uql9qfvtcekzfzfhsc694k57yu4tntuj2b92p2abwvv1fzimxrz2tfxu0z2h5svl6cofwhrnfpk9v4wd6fjopidwqvpxhsrjgn4bix6rev4xbk15ibz2w9h835ghaepww0annp3zr3srcmnpe798b8n7ybhsaiv47bzu0c5snu08105n11ljltrlofck52fxd7pxyi',
                parameterValue: 'foce21bftc9d2qjlc1ftt6xvn5vzi3uxw8q39t8plo9sjqoislsnhz695xhypg5p909vbergz7y7hsicmna79ofwl88r2c49p5jcwm7rbjhkbtz9fyjlrl3uydi9u4rxsm8jkyru861n1xehtespa5uqg15g9g1m98lci54uyde08ub7fwd1n19pydpmlunvhu3205b89q1h9e58nmjhltjrp9hs7pesbl12fe36363l2xqp7q78nutn0s4t6n4b99ge7t8v7rxrfd7f0fvk4gx9qjcyhbhg0e71pfd5p93yo7ioh42xpk1oheja3hjvts19p5g9x7vqgdgyx948wd8yca9hwy4ysqdydb4q8o86dax5swz6gg9kfkoec8w7kxbsrxqbnlj56mm2yrzyczwuinrd64jcrbfx4jjmwg7qisclvlytc7xrdyecbz6t1oxh3x07n7x2zockryo8pjzafxc5trwjde09f6z146i2xovr4lcyj574b22gb5z7ackmacrz7nehbotzbi2975khoe48dntx40ju1whgjt1ffazghzpxi5cpeqsmf5ukhz4iyna5ho1s9o0x8fk5r0oqip9xxxvfnu9f76z78oiebx6rvemot2qghpxctx9jb287c08e1uu4n7mijlyptocr758xgq9d2u94rlbvo0gksj3p0dflwdo3xeggh3fmfh6qyg37m4cb3nzg2v7xi8fpshmkkbxxivu0ieqfwdy0opzdi80ocegajunsg9dba3b2j22nd8ou506b43bmf89hx0acp8699cmcb9xqol7huatmqjc5pjpm85325yqpa5wat0zikaoxg1m0ko1cv4m2kek5u4m7glxac1hdvk87jdqne55sfx8h8ikljojxn0uwwhe60u3u6hshtsv7fnqcmgrl63t0vudmx0xprg4fzpm33j7eufbm6yf18b54kmx4sj6j47hg80q9s6wyjdc8lynpshfv86fywts9c7deovx9iarg3xf464e0p5ev',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cb486ed4-d34f-4b25-8484-0700d59b6920'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/6d65a7f2-dbd2-4be7-b6e0-1b1649737de8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/cb486ed4-d34f-4b25-8484-0700d59b6920')
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                        id: '1e14c3e4-5bf0-4c53-ae58-5cb37655dd24',
                        tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                        tenantCode: '5056runwkuihgenao97sev7nxtfhw97ylrkz180o10wr0gucgc',
                        systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                        systemName: 'mu0ern79smmg7kh02oa8',
                        channelHash: 'v81d0xjeetus9mtlmtpb6c047qqykr6adcjoziqa',
                        channelParty: '6t3fkoztpo0gmznhg24gheugcz2f07t8yd6vaah3fxgc0kb8s6q2bblgqcgg7bn1s9o678gtsffmazfvc32qfil1etmtskx1w8j9n26amr8l86cqybyk5oy8ikk7g3tpwdzsaz1drloo56l7m0tsmqwp2tyhdy6j',
                        channelComponent: 'h9vvaaac4h9js58hwn23495mjtt0zfiuw1q3z1i1jtbct07pl9fj4zpehox9shshixk7z4azb49lpvo7upzvtg4u2rd0la7ul63dwyfek8fv5mjwqnj3vy193r26vr689c9itqoufkt7zyb8sue0shofx29uo292',
                        channelName: 'uydj4uimfiz5b2my86kirpbf5jm0k53ykk042jyk59okorvr5winz9umuadx7ersxoj6xrphojjeu54y6cbg92e9rlwta08t4ajlytxo5eb33vy1y2kemsp1wfmxp09zadkvec5qep8595wrg6i2cecbhytk7svh',
                        flowHash: 'hqlg1b0ekx91rr36ayxsmaokvtt5iywxh63aqzso',
                        flowParty: 'kvtwpoq19oqkc180tfbpnwozg50rkok6vr0kssyvr5wd8akibshzhv6tyxk48vgcbqs9l708owfynxdbi2kzg4kpm8tihq28lt8q8ibt4kvr4nsqkg1013ulkl45eb1cxv5hnje25s3cagtvydyaz2r0gcysa62v',
                        flowComponent: 'pwxz3tzvcsle3ndav6b12v03zolzn3lk0620v4qumsv1d4klp7bugx8md3aawrpgvyga1nkuizb8jnxttfdy9h2kexww7jxmq6htoak91azv349308ep0v3xyuh99oji239mn9ilj4wgd4lcjut2xb8742rkfy75',
                        flowInterfaceName: 'tlomqx4g1pmvz3kja4504kfrfwewnrjgqxfwfu3pjnlnap5h35wzsh9mdifczn2igxzzv8tonxgxsid0am8rc37ud1sjd0dhnf6uo3dl5jeuklxsu6tdz9wyolydoxfbixjnrtcoljcvq2l9x1vux1ziouqw1yyv',
                        flowInterfaceNamespace: '51fubzklx7122aqai0r6erj68olqthie5t3p4dokuhrqhk2ejf4tuwrm7o9i7bm5c1ub4a8y17qpdjpp2e5gmahjph240w9y1kirw1bk88munu2razydh3xtu94mortoni3x4f5jrt6idvv3bvgpkndqxlrm7sz2',
                        version: '13ay5rwo941zsu0wy8fz',
                        parameterGroup: 'sf4894vhv7q13t5rwrj4rzvr85kiavl5zw1hfacdp3fwauwjko03nuj173efwkccvnj3b6d9l9m9v5bce8y5ts6198iipw1o24s4xppqmuv3uvprbpmijd1xue8iq1t3ts2htt6lutchh8u9o0oddouwkgdw2rd6ojuwe21ijk3qxyynz5t5ch8caayy2l2cvzlyvx7yolj0dkvurfd5by6qeh83oqokgw3rw9tqgxgz7jsprchzth6uyuch3do',
                        name: '5q5u3lzf7hcun8ttlyz9rdnxw7h8m40e4xte6inycoz2mrj7273saqqdzp3bo7pki3iqxgsrxnxffw12n2iywjind0qnl3knkzo51gfrk61smqy95kneifdviroqz3dd1loho2vto5g2i6rl47a9wfr4ksc2zml1b4ak3mjbzpeky2ibufhnrwosoxfx5g0ohyg94c9sg6c3zj917wtb4uuxwmoyvxs2rebwqqw8if5pr52xxd23bw1gu00kfyqe9hds59ryqcnxitiht73sszwh66ffyi3j4mkbvopi4cnzmrboh91bi0wz7hymnedy',
                        parameterName: 'vxepznss0m9rouwr037z2vl1cf8vni6ayu30n9r0cprgpdkwvwkb0wetmso0n4z4fzdb2zk9mqnahcoma69ar9zn04a1c0zny13c6ocu3ff2o1v9asax6ve4ey6i8vox7cukhleoiq17lh7epj8ph1az82jeirq0r8h355at8t7jz1kwsh02fy1bal6ntrkhxve7k18lnxbbpmmo6cezdvpjxjzqs1pp6atsfakyttqgjp4ngh8zhc2253j7lalfx88u1n5ybk95eupw2muibj60ap53frhhot5d8kgf0v7t5n4ij55poqt9qn6dufgs',
                        parameterValue: 'o30ua30oqgn7u84mbsugbamrsglio7dvhkd3eoct2om4xdsycqye8hd6by0er6yz8p4aedmgt4yjfa1uabaj292eeg1qweaq5r2ux03a4d5vb3g1tmjdz8gp23ibayua4i8f6los7uwjohzieqgu7tv5fsdyyk22694hrp7ujzgkpnguygb1abps12ne6vma5v8optrtyo2d4ap6dotnmk5e38jxmqkb3r7xrya5qotsya2tvfmzyw7ogol1ehia60v9srulnjngpn88x9rigdg07h95fi854m0cqppkwu1mkp4v6hn3lwr9n3s8n1jvna8tayqgb8qz7udvwao0evpo4q859tce6cwqf82ktksn82dmv358xo17ctssgvu26tr0y4bn5ly3rd1903thbpidhn5lvqjhz108if4wh4fb3b2go2f3j6mrl6nhpe8i1uun65a99d0n5dw6n10s2tjfwfy7oaqdz6h5ew1z9veb2o40d74z4iipueoyeo8docy2cg231tfovsqwoefp3f2zxi6x2nelgi0x57jqft9yybdivpoi9v1mmmyewxmqryo102palfuv3nu5brotrdxog0lfhr5vx0ac9wgzbr5b5s3nzykxiybxnnr6r5bn04k76812qtvqqhulv14bm3nfmtuqa2ts2ex6iblohokrm1q8u9lw2ifgdw76jdcyd6c1uddqzw15dw3vh8suz84ysao9ln6kbaqus5qmq61gr8ksecd1o4nh5rnlzw98f9cj1mag09kzix5zmms66led8a3121qb6iapurha620991iw7rhyunht8hx8bfi1ubsbio5haj7w4mbnlm39esxmf4wm3rzcpgvh5cp0a79x3zpg5wqnzk9hml2nlgoxsuf2tnkbhndttbaw181n0d2kw0iy8n4tsf0pg4famoc3ceq7fkxz4vcynxercd3a7b4dg7b42e92f5j1kd68xkr2zoxt1h3ym5f2ke4y3iqr15a0yz62b4kmu1eewnf1',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '1e14c3e4-5bf0-4c53-ae58-5cb37655dd24');
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                            value   : '5d20642e-004d-45f0-9462-871b4aae6301'
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                            value   : 'cb486ed4-d34f-4b25-8484-0700d59b6920'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('cb486ed4-d34f-4b25-8484-0700d59b6920');
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                    id: 'c965add5-be59-41b3-94bd-ff5878776425'
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                    id: 'cb486ed4-d34f-4b25-8484-0700d59b6920'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('cb486ed4-d34f-4b25-8484-0700d59b6920');
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                        
                        id: 'e7009f48-5432-403e-ada7-faaeaea9b1e9',
                        tenantId: 'ea8172cc-ef6c-43af-a2ce-54d75f3275a5',
                        tenantCode: 'nfqgc8r6ro133nwg00h0g0etzgx5ajn3feh5z9xzba6oc9vx51',
                        systemId: '32cb3a99-317c-4a92-b0fe-d34480c3bebd',
                        systemName: 'eipnzbnnul95uh5660jn',
                        channelHash: '31rx9546vvez4gq1y8xvn234tb6ihex3ouu1mbky',
                        channelParty: 'wjqj3uyhvt3z05ozhwt9hhmjqmh1q6lp27k7yrcfpv5cry0fxljjy3juulkcflhqjdl5mve11l5du36w1ldn6d6bluthyr35cwn827p70s2xp7g96llu5pmf0vxhss5maiqnqiffyeeki5d7sdyq5zhnwsvgeia9',
                        channelComponent: 'fimmwrbdphh6g9e9ak2ughtl2b1ywio9efnqmq9fdpkwtmnn62mzsawbkf09m6m0019h3n9artf22b71zyy8ntu5pcf1o4ppxfzh12x0fppk9383nn8qrt7x9ch2ebwq3tnb3y2k29h3iaer93ez7rmn69vluknj',
                        channelName: 'mcntjqa8hts0ny65qx5j4gmvxyl7n2v2golecbo2rhuq9x96gf5mdfujl29oi1odx7pltel5yl988hkeb8tgihvb963djq6njt5zezj3ac06e2sn22ms6bh6oekyys7r2k22zjnprd38rihtou1ytbt12ycrid43',
                        flowHash: 'a6kdd4nr07gi730834u8l2p9wg7r0107wz7piswl',
                        flowParty: 'pjma9lt7n00k5rda744v9yy06948cwytyss8dfivr7m5avqxk4e325ktiid1gnp1hnph83f6g7fd064ogzhzm7nlu5xj827lu8msdnsx1oqj1v77ofj2wmn3bkm0cqnvncexwah3tt0uync1onmpna6kepok6zs1',
                        flowComponent: 'x4oa5p75fd59h3r34nk20pxamw9ibq1i1cmpjgt0yqi2vh5kr1iv1j6cou0l54qhgl9yvqxyc9s80sqzzyibb50y3lkskmbgvvpoef4jrgrwan7bw9be3ryg2qin63vfy7xiow6vy8d903w9og38nfmjw6rggb80',
                        flowInterfaceName: 'eyeilidiv0kyblkde5f30fhpph2r6s4geol6tsqelm6yp3kkm5yqz9hf8i45uddu9xq9dday0ho39d47etmwny9xqanpoea3qp64chxm0gkkqn60vwkxgjc6hibxopl2tit4i9d5lv3w6bur6240zlq1edq91m7a',
                        flowInterfaceNamespace: 'szr0yohttulrrpip1dtv3vbubkq7844owls4zwyujmys13k0zr1t8071h9rg6gliotr2nszs4k7s1sfufww87la5rale6zdg499gm6mxfj1xsbt8knh2c5csatog66v0q9ut6ta9xv4y5kz36u7hz4gdgkxdzjwb',
                        version: '5x7qrh9430kabf6qv50a',
                        parameterGroup: '0a2rqu1668mw5nge91pp9i1bqh8ofe3mmww0q017fij7akgryrlanji932tclnuw0tcmxyhvy12jr88n7irdr3pxw7ovhhsa932pr7rn02caocjp5puifevavcje2zhp7lrcz8jfrijwgie4djmdy69k174sz233qn893dscpfk4e480dqwtik9k789addvtgysrd0hb87e1v6pp4ea2c11jlb4vkyp4xk5oo7g4fkexxvqw0kerpa4o8puxzf5',
                        name: 'pfhoepd35s9eqmczpn4839r1v44cmp0miacv9jno9tzwy58tnx4o9hdnnbg5nwxibxofrlumkf8laou2yf2j26jneg2tmz2p7a8y2695rm5kpjcg0r2eg6tq19pmilzmca3crtcgrtiasypicirkw5qd0oyq9a0u87uyu45fekjrnyg2xhviu2dkngpw37ds5domc9xggjpuov4kim2nppkxynv0xx3lork5hwuxq1gnwa5sietj4q4c4h1vlv3hzqchds8y5uyohm9xygv6c4fs2s6xhzftgqta13hs49stjvqc1erphip8i83hibux',
                        parameterName: 'dhhpxscrg38bz6g3cu2gsy711cuctjztgvoz3uka3hqwhtmozskaiutje4pk8iw2c3txg4qjhk7en0b3awuuaoo9k5k2jqhvip0xie5pnjzdq9d7bmorstik3lze4em41ebjr9xfgftpigbwb866tqohaudgs9m6vxluf2jrksziq9ke2xmqu1sah76hdbstxmvv25s2dy4434d78t3qorjxnemunyj7fjopcj0103xl3pb4jizvlhcmew4h1ajrg4cmtkwskgv5izyey1hudi6of7q9xrma7k9bxvlje1ovxhdeh673712mfwdgl4cs',
                        parameterValue: '9ao90b1p5v4yj7nvgeiy746lnhc2ojhn9r0pw0flvoinb4ymbqozoplbh8b3y4jxuxmlpu3v00xbino6cbrd8mzwbq2cgg2nlavhvadjrivqo94gvsetvzfty48u0jj4wlsl6dxjfiec80bcqhh0smu3qzxp6ts5z3ddklk21a2gkw6cpw2pq7hzl8h63mj1oia09g2mjvno6dubkncx2p3i46fvgaiwppev6yjdrpzps4fgr5a85an1yk2i6pw71gp1w708a296mcfxppmvhk5d7nu5htuklx4oqw4fm1b3fiadahdfmerpk9ip6dti7rty2h7p5qdx4nwqocmtacig9l82y84h22fft3uveedntku5lmd5rhcjimw5gpwzq6huz9n2ep3v4i6rq1ccvjx4l36gr31a68efwkr83qv9lcu38nsnahxcq299kphfrhu947mpb2muqlu700w9bfnr55l1s2vka5juolj7qe4w8fpn3i9cn29ys3bn9dhvsu2jjrlyjbngj8dw41kk82bmkyye65fc7ln3ibshj7gfhxamoy35fi4237jchlwnmkgwla0z60uaossejq61wb4sshyvi77ll7ygoocg3fcit6sfq26vykqdvlj4mo1mhqriackikr36haun2aoyr8y1uwovf29spfjq446go5fx73nie7pdgilwghqhml2d9dmofbi7yatv7foid2dj20vn92ztxe59hbixd9ur625dustlqjr7ps7qmf8dmgjcna9qdb1ihznwphxr7smrcinekc0kv4o2q4ml2jum6829m7blwqki9utqicibxvthb2p6ogh3fr66rp5kw9s1svz6gzetfpmtbrqcax7xnk7qm0203ild491qolwdjzainlwhh929efmcy0apvvymq9g5dk28cotxgbymy51wp8c61ikx1fdsqxe40qij4x9oul61nxzvnmywafoo0ahieynaccqzmfymzt8nqn67udd4msyq1qpbvniyrgeydl9r',
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                        
                        id: 'cb486ed4-d34f-4b25-8484-0700d59b6920',
                        tenantId: '073722f7-29a0-4dce-ad10-e141169c73c7',
                        tenantCode: 'qbjwye8kcyfnj8o4qforzot279mrfb67n795knjksyhuid7xps',
                        systemId: '8a758dd6-1098-4b46-8fa2-1e4b6a646e36',
                        systemName: 'r00gi6l3dmvuetdjsbwy',
                        channelHash: 'fvdjaods2sta0vokn1g4y9vzm0gcclkfg30z2gmb',
                        channelParty: 'buu53btfmsckccsrqrvbvvrl4kysu3pmvw3iifsf8ge2lerb3ocx6jedsvo9dp2ecavtw98f7yglj2v6vep5txjlywnozd36a147gegzgm5udt3puqfgycn0uj1jfam0xw6u0hvji6thta6j1ha50buoruhraszt',
                        channelComponent: '4lf3a5wp3xo3pi9nbqk0hy8dc704m0upfoa7bit1v7cyg9rmn28pwetsrskxleeaqzv4v73631h32kb69bk9cf19x2ib2n5mbzeqr5g4uschbnhdxviznxyi8sx07wpgh4onmnekcm1jvs6h7g8htr1qfwbgs7l1',
                        channelName: '3k5y2a258dp3jbbgifcmzg2eyik3hlnfcxwzpimahm3shcd31hzuvvre9hf38cqm86tu5xgdbnxnxbcfkbvnd8dvojvyojc90jrtfpnn8mkvh59gecq1em0e1c83c68ngqa9gvieatzf4g9y474mncnr4m67umqz',
                        flowHash: 'axoaca1zxjdybvcqynkm8trq6a21iduhh1k2ugsq',
                        flowParty: '49dkf2unx1fxqceyrdv6yz04wfn5rxswpnsghruh9ba7zzpaba89hhc59s5wv76wvgh3rtswq58obvgn75ys86mtc46brqjylp3heubdhklcd0frfoljptogs9v3i2kb85z23xbxjtt55131e11ygidxu7i04pq4',
                        flowComponent: '86xw3w9h7yy5xc4xdvolnqyitlhzvjdowcue0n3ekrmkga4f5ycllivrnjw22jqbzp7ppf0jv7aqkd1ndlmaqb9tpqofxf12z5818f75vo74gx5x7r5ft5dnfemax5ck4ilnehx5pn9f293hsnlczp3s94cz5r8p',
                        flowInterfaceName: 'qzrw59hyhdlnhi7sisg802x8qpqebgijd9fx9rhqts8rm84uhbkq217u31owuaqchnfkk4ouwdsjcnto1928049dw2tafzjsqdk24wowobkditruhejpvdesep6wunnlvyepot2jg1dy9z6plt93023c21z5pinf',
                        flowInterfaceNamespace: '2qx6kf5dk6v2ubzjjsd70iycp1jnyerbk6j3sd0o7xot0cg3rkv46pve2ov2hyhiocx2j8hwzjyfp05c5g0k0g1udx47hmgvrvij6m4jitebqck83j5rt857qa0poix2wcx83zwjbm8x7gnbqdnneo9kbhqw14sb',
                        version: '12w2ojt57e7i3new7dhw',
                        parameterGroup: 'v9ou57cu6w3qadxog44engsj3ep5ozs3ncqtr09eus8af9w5kqrkz21cjjpjun41hosk4vwm9vno4nyjravkqggna4z2fzdtrmr8tk1eyk9aqq1r5qqr04kpeo6srl7zu0t8junf48aiyoadroxn0rjgi3z00xsxw9pl7mwfazbgsclj6q82fl8p6hkszti4zjjvhevuanzf5o7qa7n737gzx0ge1zd80mxvx5c0cmc86ckv1pt6u077ct9a6ih',
                        name: 'zoi1x4xeev9spn41omd09jy33s52kxldzzj2i0juzrnokr3vrufx8rbc263fm2p5gnmu6yv3ia1q72qj0pouaqftkgw8hdpo3prwyacc7sf7w3mzyo1wgdhh5u1lskqzjbnd49t2d0a6kr0gyqzkzo79qqxcr4oeovkehcg46cfzev38hk74pdwz4ox41jc2l2nye2hvuazy93ff14zuzjep0m1k3hhoflgysr65535d827aqqod0rpkcuo79aswconzeauitg7t9o7y1qngm5ztgtup77xy09f9078aephh8thpc0nl6q0vqctcjkq7',
                        parameterName: 'eftmsza7c0t60vuh8wzq4jizvvmev4uxapl3kynzr342sbmsxq3dw1hg39qzu3ha2xzqkwrp9ipsqzq1klxxuypqcetmb8w8fhghtu3tfdccgtqnlz8xdb3shl5wu9k9iyd7y1dedt6wgmjaetnnj5uxc2ocb7nsh7buonsnmbq9z6qc7qteoljcl0utp5jcpzuzlr4ysou1pjpp8g89nhk9274j6j55p7xvxxr0yjrxgl096hunidiovq93jydzmx24yq7n5j5thd074a1bxtju97z9stt20joyhb8sbnnyu6qvdxqezgqvshssio94',
                        parameterValue: 'c1k5a4mz9sz1r9hehbtzj7j85aqen0wr0nz28xfzzxueqklq2z8txcsacnnu1mi49zxp5usbk0webtiktp2puv6zzo7fje4d42qtrv58udxnoouw6necntmss82y901qjuq6q2f0zl6t11q0msnsss9cb5put8042ni74vws26kfglfmyyr5l0slyb2bppmzs37qblspnltk4tko1m8n4tu5nhdj5j3mpj8c99qicu852rhjmmmpwwydz39r9otchom2n06ki2z7zbh3mtrrkn1lzjpmqaig7843jja9ea5ixdg2g55q3x141nyz5k84xf8hbzzkf2e657eedr11giz8cemoz22xv3dzoqfpblcevwtxx20obfihtu9sp9buf78lwb7e6unespzvpvedlgza6mp9kachsqdfdwmw95m0y64vtxraln144sb26smm51ynu3na93fh6rqcx8iuxs34lx20bs3h79gcrlkvr51i7e3m54kpbxzy7jm266sgt2itf0xvzzq3dwwim3vmgy89m0s48vynz7zma8uy98bvro3su13lhhgu84233tusyxe1cy50jtgmnt403he6e0ewrjz27xhj5zeyft0l6bjos6io03xgqny5yybdp8nxq7q3r62u04hq07x70fjmvdos0rrswwyxxr8h4hgi6mot9li6lrnq7ibrvjj5h34thfecr6m0sw0tx3q72opm44yuu5oxj6ji69q1vo3o8e8hkwy6yqiyw73rlzdrbw455nmq3t79xguik9yevlmrmjuh7yw4di5278f0kcddw7zu4of8pp4tf90priij1vfq57gn6pb3ww46h3d0t4chw13euerua0tztfbuk717c1mu84mjuv12eq0l7pkfzaqdxn5zye956xvqbo1u8usdzqqtvbhf6cpmy32okdk4jwgoc0u198m33cox9y6g2dy0l52atxqnffgann3wbh4qbg17u0vmj5jo0uzktv2jn6rxqghy48gsw1mbpwnfh01s',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('cb486ed4-d34f-4b25-8484-0700d59b6920');
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                    id: '42996343-4ec9-497f-86f6-24a5b391bbae'
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                    id: 'cb486ed4-d34f-4b25-8484-0700d59b6920'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('cb486ed4-d34f-4b25-8484-0700d59b6920');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});