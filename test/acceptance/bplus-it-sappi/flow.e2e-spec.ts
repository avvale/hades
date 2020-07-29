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
                hash: 'ietyzrvg01lak8t3xr28lyb1rvzveifzdq08zd6c',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '39z6qy81jp0axvpnqgsclpij9ue2paynv5249ejzh50l3q6okd',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: '5kaosxftzhfmpscqwfru',
                version: 'k5aviinzluw3mva2mp56',
                scenario: 'edzzc822yt2iuswlr31bue3cmeerph4eoqrp53hejt0597era17jzzxearzb',
                party: 'sgfx77bnsl6qnayz6fw65r4x9vccjkxbnti30xw2evtgg0pvtzw7fqb33g61yul30dweymyrh4dux02l0tbadbi20jgfuxjl3ufiyyppr11h7j1rsq8cyvxvdyogoyhxcj5oe130utp25pfth4pcbzycnxa6nyqs',
                component: 'ytv5l4latjd59djfw7ixpr21ulg30lqeadydattl7saz6izyb0m02mq2gul94bqvssgivvsme4epsbwbajmc5lrl3sxnbuury6drfayso2texy9460m4xfr2clhe56d4wvzityo25ytxoru38ql8snnls4kg4eky',
                interfaceName: 't9mjk7pkwizev8hvohdsw3wzffaucnajqcn58j86ba225ce2gxu67wqlb7slqccwnwvjaagz55swwtsm01qebf0d5yn7ozu3vgzy5ulimdj42zwcreysb5r1wzkqunr7qoct6lt9z3271qdbsaxy2vmkb5ej2xdp',
                interfaceNamespace: '3g0eoewhoxd4adublnvk6iduxqwghnxztm9u5u3ob2gmpws9io9o11jiyact14esty5bfvvw8nu55lbqn22tvx1zxhfkjj2y7zl09ge15u2dam19df739x70qs1yuxdpavprh0wn9onxp2o48wmi4d1s64h9gszy',
                iflowName: 'z4564igdgk8r9yuakw3l2nue8r5qhecrjfv1krpa47vxrepb2kic4n6ybxnshygwgs6htdw066jlu293ckh3830zugj4tmlyo5ly7db7ddn337rqn5x572srofxlzqexsn4mm92qqr0gchkov0bhxdq32ob9xh04',
                responsibleUserAccount: 'p97kiz7bg9h572snz1r9',
                lastChangeUserAccount: 'dye4u69gb2d3xr9468um',
                lastChangedAt: '2020-07-29 16:55:25',
                folderPath: 'rgr7m1ojw5p4o3k7ebf1uhmqgwohmw5ftugjx7fmnxggttmzlar9knnfnpwgszmgawqo4g5kxqdmb9t2wl04vs1a86ldvt0pax9iqy3pm5ae5ixbs2wxmyl8r889n52kx4ag3sz5i3ojsqua3u5ib1cnmd5vvvm9jucb01078fyaq2wlrmhe9iholleuouc8blnw3mnjsmtdzs4uoffmeqpvgve7p2kex17uoluk45s7ziudfn4e465zxeqsapz',
                description: 'b8z85medtmq4g6d98blfffs370s4ktldcawle95r6w5dr6vbcc51823r6e29zkh0pti9ngjr8v8v8wzrb40ssflal7j0guvnj3bst0wvkmw5jjsxphztnayi78bdtlac3pgeyjab5kwh54kwrlin7tu621ux8oh4js4mcgcsc844k2tsebrfyon4heo01lxqlcwtn4zaga9o3zbrsysmyig5n9033toyyag6l8tv4az9haw1oljamgoimr1qhuo',
                application: 'vot7xup15j99oxufolj3qmgdq8k0b5t04xhyrv52piwk21xqc6zoqujyz4gs',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                
                hash: 'mosqf6l7ncyl1vrwsaex7tg2obqag1nncmhhz6zq',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'q7seuwoxb4j2v76nrrc8ekdcninacz3sfnb1cvb565fogkgulu',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'rdkaz70p2r8lar5l6h0f',
                version: '0p467t9ll3eiijqglqf0',
                scenario: 'faeo2ofbabn7m08b99f7ii7ti56wrv7zmoml1s0hdp55tus8diohnhbru1oq',
                party: '8e310wy7zbduwyg4xnnne00y8dqi3345gd5q4zzmofrxow4da6tddk2sr6kkcc924q16vaur790kal7cw9ekj1c40hfwnriw7wiiuw23vwco6i6xhvvut25cbnk3jwca0wh9b9c54d19lsnuovtn2k2ach6qx76b',
                component: 'wl6792p0daifx8n56jkz30gccep3s5frjfpcssdd8g50c3wzhq4fwc0wghkm5gnoxuy9t414g6l5v8sie0ji46jymj9tepabinalz74e85ggqo3g2tag7usg9ibqsct92rp39z0dfus4uigyhe8msc9v64vcqcb1',
                interfaceName: 'eiy2ju9eii7p802m6t70p8yhcar1cc2jh56v8tj5clk31cqfnh6gb63sss084nr2tph7vqedf9u4zu3irml8342qk46gdiwe1801vbbgy7t1swxw3d5ratcesiu5jdjhem8vvz54jlghtpe42rser64txuy3fpnv',
                interfaceNamespace: '6v7v5z8h54q53i79kagvgva6x3zbqqumrd7r986ou8jymxxzf8ekod3bm9d64skd7q4n3o2odrktdu9qeo6vbysm5jnoqr60t3zbjq6scvml8fjkme6x1ersl3ej6tjig8j8q5d4xf8m31o53au4lsnk9dpbwtny',
                iflowName: 'yfo70xb17cwdzqut228demqhxp1vxoq0od1ea9lbfwylk5j7ww7q41j8issgruwrjj5e8mkas889cnlg5ehmv8z2b8jt0ngg3j54mid8y3rd0btc6mvzzf1e4orjs21trzeqqoyku5lstojn55h4nw98asrrygpa',
                responsibleUserAccount: 'ctx68y3qugunydxi6dik',
                lastChangeUserAccount: '5tgaq55xvh3zpcdk1n8j',
                lastChangedAt: '2020-07-29 17:56:56',
                folderPath: '02sgnn4l0qny3099yfpnoy5dv6hd8nt4dp9uam0c0n9e75jwids4vine6r3eyxlc6i8xxgkehsim83cgrenm6ecxw1itjynsatfq3j78nsnkllt8alt6lzfyb7bv5lll7uvbd6642dc50qeh36sxggux39brb91whsyd9mmoqbjamdhno8nitj7wfh600z738fju67dt2xbfgh0u8poabuc7gqfazco4seps7d8i03trpynr0shy913z4c5ttdz',
                description: '120j70l65dnfnd7d80sceyvt9bzp2q53cf29bxf52dhhy247wzblln827sh6fjz6wasvi7e213y85ci4hz95ibpkft8ii8e6fd6drntvqd7o33m9ut9pfbho1ekiptqvoa2j3mjyv89v5cfd1niwwuac13nirnrkgvk0iny0r6u7e8u8d6nh6unlk3n4ujfjqlbdoo2f8qigx6uoh0tn7rksqdsmt7khlq57kwc4ipp8llx80068k8sz4xy93nw',
                application: 'lh818oc89y7np7yi2g4n9ci65chptzwr4luebshh06d1idbw8lav1p5lgv51',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: null,
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'rmbpc5tcve3t44pnpr25goavs1yybjezz9emslzq4i21n47utb',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'lauksmbtitoyk7gszoyv',
                version: '5fdu8kc9eknp3se0udon',
                scenario: 'ynrs08bdhnnyxhves4hks4570w1iioe4tkn28mrcz7hz92zdkedltolhqxnq',
                party: 'shab9qrpqte4ew0g7689hw5l5tvv0meu4dsgeo3samsi5dbgsb1babcodgzc4t0tb99ps89alqf0w4qxon4bfv38uczsegde38qpbbuqeqprxlgnpxjo50adf13whlggwf8jzvcmdeoaoz9yuovvfhi3mw4lm7gt',
                component: 'f62jur673z9356btlzdfsabhs3fuv6l2j5zo35z3mtf77qe7sxskhbkcqh0h6ih2k2auavowyav06vi7pufrr7bpe9budxjoh3cdgajt1a0sb6sw8f6b9x0unhlkdjjskkoqzy3d2m4ifnyrhnju7waeae8zrjfh',
                interfaceName: '5qh6gih3oxpxx2z057r66b6v4bfxx8hh17vc4dk4euh1j3mlnaobuzcb2qygntbdb2tc66quev4sucbpfhq6xbtcyl3qiu6brcjkncxouwjpota4x4pc4lnw7vn1fl6qzfzughucisgjehcjed2ddo1shxzkt556',
                interfaceNamespace: '0m9f2hdpc9k3py81b3ecocpop6qqgyfdhpxdlx4tsrw95ew2g79b2qcn0cukn3l7lsrjh14w1zhbmuaul93bt977w1hqzn35b0bhf055aphlnfqhx62gejbvk9hk8g33xk8ykixw36v24srvqatfgxy6vf9byzn0',
                iflowName: 'sgl7nl3ruuie15smuxwvnzsmsx5nu2x1qpwtbvgqfnluflw994wm6obp8dri995kqgnsld761wxrcwwp6r7r49p80bjglkitp2ctdc8vfcwgt48j4p77f6atbnkkd85uavksgbh8a0df3acwwsr8umh9p7ktlbzv',
                responsibleUserAccount: 'advypn81sv6lev94e52j',
                lastChangeUserAccount: '5x684mwx4mvnnvm4ahkf',
                lastChangedAt: '2020-07-29 14:20:20',
                folderPath: 'ud6ddhi521mfi0vj9y6c8gojd1pvufjgqzbf5yz4nsds9cezls36ugczxawbc54zyegiebqlmdhdiwpqa7xgjk74y5qmead12raoovk54p3100qfzicefdafmit07v9qltc9c8jqt3dy2c71tdks7b3o3xn8gjevm0h60jf84w09nguq4avms7rbm7rftm1is4aiqxfx3nixiudtcb5osx350xsybzjtjxahcdj7gakttmhsn9gdvjvrm7exfs1',
                description: '03vs591nibubn2u6j1274gy5g6agcc7s2stav65blixdn6fes1n3hyqo17p4monsd2diobjo605e2vg03wadar7h2wp6s1d0dq0zo1dw86c3w092js41zfbgeo0ez8uohxj7kvgpu2qu9lgoopl8v0wp0xoupssvht9e010z5q7sjnb4lfqpekxqdgie6ruoybn9kaaa564klp0mf5q6xa0o9mtuevviqs1blduyylzl8rvgg5l7qit3fjxek7c',
                application: 'xuzb7l1uwqy8mhui5r9vlksa1gf6yc4msb4dne9s9brpx0bh07fo9ya2ybbo',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'iz920upc8k0gwsxku756ehd7cvuxk003n376ndo0j1j3d3q7rz',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'ow4rs6qgidgpepql0i1j',
                version: '1p662m5r5iij5rsf8kwn',
                scenario: 'j8sw3kryh8h968wy15al3mudp2ddbvdrl2mess17t7l3osxykw8wjaxvrsdv',
                party: '9qr0av6l9h55o1dkcgyb4rmmldxhkji2j3cubo6yzt71vplxwebvyj98ns0eygctp0wua4wkkkz1wzeguvj4g062oavmnloxbp9vhai23i9nxjwjcvfak9ra27wy8xg0wtyu0jre0xbhp4t88b6b5kyxzbxk36sv',
                component: '2ykfwinli0y55doazynphwjn6ghuqwsy60n689qcbh4gj080eh2q40rq5w25wfopifzsi79na2wydccfmhjy11iw8jgmh6s31u0eh0lf3ur5d1w9dh0r5nsf1lmac2us453ig60xw5gz1ioo8fxvxkxabvkkowhv',
                interfaceName: 'fpom9ipq6clxjoqo1tk33sofgumhmpw961zzt0e5l4eo82ss59rkcvyby5qzb1t595r7r6sg2o6khmcp4n1gleyj7v1kpm3li4pljd42ekef4e6g8pwsto6n887thmzvf9wxdd4t7pyv4ffa3k9n2tlt4wnnscri',
                interfaceNamespace: 'sdslccx9hb45lvhi2k67hn9mxsqpf32keicvsf5lnqe2q8n2zstls4l3dyuscemaotazt8nph8utq9v392l273m6mg85f9v7c85oj2ehxfbdkt9tg0iwhlsctevcpgj76epj2ic2rze5cmr9v4jl0l88tzckm8dl',
                iflowName: '87r2qki29gn1a005niokfgtwsi18cx0y89mq6jg5hrhwnbh1xgg8yhag9h1u1bvrjai7bzp1gxp5q33kgr8ifroqkfuyvtqhu6jmizj8yl5s3qpkx53c376ql8jovknd1byvsep83d5gd7eye6aqhc1kzvwebio2',
                responsibleUserAccount: 'wajg87o1lih6xodexlz6',
                lastChangeUserAccount: '7cfs5z8wcmfm5m08zx6o',
                lastChangedAt: '2020-07-28 18:21:09',
                folderPath: 'wblnpe5guwg5mragq0eoijdpbmluu6hm60kzaq9wrlv1tukwisv99rt8qwna1n45cwpg7sca98or8y5knxsr4hj2u2s8vgh4memk6smzn8rgsjtw9ueyom66ijwpak4ihi90ioy5ziza275oowf4v9oxbuj8gsonmm4n98ndtxo0im69l148c46j50yn1798psx0cvvu97ksw9wrlud7x981lonl7e8vo2u67s7iorqhpbxmzxhu878jinqm4cy',
                description: 'bwkqj9wdoorrjvucrz380vzle1a45wjt5gjjwcfmhlz5pfgokxtu8vekt73cdng6tp2h7phitjnf7q8y1lmnbs5oa06ow310zua2e6a8liw9tnjsgrlr4ywvlbfst6cwwzbaj5yrbm2t0jqv5d854mjb0xs9bzuzur9m93o176hgcvpv3kgn31kezjm00dxhmd8h8w335atzrrl298nxuijyr1qxzdfb718k5xenp5bdfic5lvhdat3n0k2hcwz',
                application: 'g0ce6gvwe25nu01kw4b7644nd17sxd6wibf0v7rmgvbwz6pu0pnrgl0i6jv7',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'hdzzjv2pb8cbi72o4sctf11a4gipbw18um9vlz6c',
                tenantId: null,
                tenantCode: '75ljc0dyxv4e4gaknpkpqpuwrwiw0545l1u2uyzzjcn73vahvc',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'k67hw0558ntyj1mkr69m',
                version: 'rbwy4sx57r5nbhi3ht0v',
                scenario: 'ypjumunu809prvjoc2sicko7xqv3ni3y78oanirkzixjcoi5jql4dykz00bb',
                party: 'd33gvx437nak31tkxch75pwjcfmy63zhz8vtd5qexfdl6wttes29asgt1wzxw8gpw44huzxfwtm7jdqlrkvlkhdywa5bj355mbyf705s5lu2a8hpglgtk4yiwm27muhm0mvg1m59w7kijf6y36ais9sqgfsmvowo',
                component: 'th9qc95rbp987vcdb8n11fy22q76o5apf3su590vt1ppsxe5qkxpurr90egdz0yxy34x0wfieend2swkuk17kbjjkcxr8w5e4vesfv04goybf222mp5gh1fv9waoswvenk0598z1c6wkwem6v8kktcaxcxrwbiq2',
                interfaceName: '6ldwdju5t61ydsuu3rbz7nuurih8ujvarzeihfr8rqw0m6llrlymabq8qkpv2iqb9w9etre0dft4gicjvo8vqxlpb2cjaey3vxhyz9senfb4xlgdpdj8iubfafk0qxbstz5a9h0at6pfulzuq0nnjfjufjldzwz1',
                interfaceNamespace: 'ony8q0yselzjv8qr6rjl29w34zew2tgzmd8uoaxwoxd7opoao6wb1w02es87x0gm9k829t195qtocv1kdavi2xmswxbv57fa4usg2xa7rmqbk26nil5cryfg7hnzgzojj0nas8u8xk6bgm8fogor5osn4gv3e3vl',
                iflowName: 'rmbl0bso7qhy9thv29fu8dpf3vo1r40tt49a0nuqq1nfdj5chzpzmlmxj1x3ipzatj7hft2tgjdn52jq60l93nq6ae7vp6dw7z9fnh0moyaexq559sghlh97mjm5d8pxn301bs1pj8xbold9jdo42gyo0ue3v978',
                responsibleUserAccount: 'bpkfq9imdf084xf1cboi',
                lastChangeUserAccount: 'jvtcb6r7sarbmw43g26k',
                lastChangedAt: '2020-07-29 09:43:49',
                folderPath: 'zmrd72wi309kryi1a3lk8wggiiko0rh6ve23gpzjnezhs028i3kqdt1t73rinll9h7npdc49byt31gvo1sft4k3a8karuu2x0pi89m7d3bhmys8qhuzr1lqwgi2oksfqvtwin77jfn155yi7j08ylgx8kbgqvsiev1biy06imzp1i9muvonxwsldovl3ob1nfey4rpozdd2hsrfzsoywbjml128tqfda4mvuc9fpoee9tb7vpbo11h6yk558k63',
                description: 'wryhte6osiffu7v2cacfehspn7qhorqht8uwt458s2xb6e2tv64rhccmj9imdx0a5iegqeq5s2wo2ah06o5ry8ibjmphvsj44ex3xqqac4hw04abjgaht1wciyvd86vfmww8c8viqv4fxt0n37cup2x86koq962e3lxpn20bhgza27mve688711wrp6zal6f8xkyixyitsdva5xl49jtdq2oe4kstoqf5unp0i63sfmdavxdj8ktzkxv5yyhh8g',
                application: 'k5m5jdmswj5xi387ozsibx39wri7fcbpsa5ndfld0u4f764zjloagh8wnni4',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'dhpfrp6fw0cxs1bb9vkv04ksk7kecvp4hfws59h8',
                
                tenantCode: 'ytzf1vfn9bx3fezyc22lhc18au5rzjs89yp7m2wtvjwcim3ttk',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: '5merk3jkqadc2ynb01jh',
                version: '69srjelvzucewh1yas2o',
                scenario: 'owck5ksnq6fr3gcf4ugp24s18x452yb4dmfor91q5vh30qu8jphx9uyn8fuw',
                party: 's2xsv42h5srdv4az32q3wadu3kr4p2urbg2ybbwf6jubuap2lsl3ibtqyzj2845d41211ipminqp34img2svcrona980165n8xjxj3od7ow25z2rnlzw6ycpt72y2ju9nha68seiau7y7tqm28dmlbvk0k6ftq8o',
                component: 'd24ws4t7yqsjb33vxoiofujn2nwrw2wcgfq3dl4zlikujy8o68z6lcvoszpg2l0yxlsb8eno4vif7htpsz7pk7w2chfds7ogvo9wjhvo9y07u3zgfravjnjno6iv5hgjniljryk8qamz1ijgucwai79jj79ggu1n',
                interfaceName: '3n2wawrjyf6akcd8bqxgtfipildd3h2o1c14eowsoyetboqc0grtthzmupb38m9rq8fysys5reaeflxu8zcik7i5jlbyedp4s3qc8xqg74ov2j7fjrajzajmgv2emwrfysputmxgtalr3e2fvn3ti6e2ugdqr9jh',
                interfaceNamespace: 'athh89y01hrzvkkdlp51t1m05a8872e364yqlw3ag1rdespweaxrql79j9lbdkzjfz3q9e6irxxub70lmw7u1ru0pn8bwdo2ipaxu3yelsmh22jfswws2zt82nncj13vpqj3ri416fi9yda1lwvqqjvvmpcq337c',
                iflowName: 'jo6t5s2r4yiotloe6cz6wwo3vlhylzaon46h8oq5su7fhud7hbc6a8gs44mnmgk4vyn8bjshpzcaq431gkr844ckq77a62gqueqtkytt6u8rqfnnkioo8wro68cvqpmfphm1si90u8ccxtxngnwp9ltfyzi9sy4l',
                responsibleUserAccount: 'muu9ylen09j7wlywzuld',
                lastChangeUserAccount: '5k6hs40kssbqm0iq8nvs',
                lastChangedAt: '2020-07-29 11:27:26',
                folderPath: 'vhmrfrt63xswjwsp1asvr6sieefko9o4q8u6mawu11x41uwhgv4lejex8x9p2cc8qkezyrkuhq8ydtulrjbgq5ufh1rzn5u82vpuq66djtypqhfeo9ynkk88idgcecbnegionlnwchf1r7qui53ow8b1eqg0dn9s33mpbouel7mnwgn6p63c5dhgh27845exw5tvkj8qyoxuz2i5mv76jm9saqjnhbkbim71r09fuant0c7p4sdd6u0922iry76',
                description: '2qmjjw65aul6jposf9dhjxi0sdipvbqivvsx7ko5xejykeiprxqy7j50b2rimbvo37mkk6bc4u5jvotwgs2nupn30p5urzv12iq4425gdqic7l7er3j91i0xlxoo5y321khwao8kn8wnujdhqosapf4arg4je22lnnkluqnilwo5xyfi4smkmr5ivq4jcv02syi8nu6msglgdtek4856gu5qaje4acdfz3r656geg39bdu8o4uvffw99s97xnqw',
                application: 'pon3ptjohsqusy35io9muchus3x8qzvimz2q775yx9547fbkh63k1jdyefy6',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '299bc5e2pq57q4l6y1e6o0ynwfzmmld1h9bbqss1',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: null,
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'mle4jx2vkzw5hvitsinn',
                version: '7t8pcr3f61bb84xewnjj',
                scenario: 'd89i5h9yaf7irax4awgy866zc7q20eqnza4ml6rug9b7lipn41h4r6yn8ck9',
                party: 'xe8q08jxh0v56ww7pg2t32q7esadwh2xjif6bijl62lxfsrvd4918m8q9x8o431icyic0knnqktj4mob7gq651kw1gm89yjucdpff61s3egazxa6p4k7p493blolm46be0mu8llrdqtgms4ilihhflr2n826b5j0',
                component: 'osup7ff9ltkv2t8ymcj36kidf2sjx02838tlqem1p9grvwklp6h7nub2j7hyqhz1k9z0a9d45yxm7ymfuunby9n582qecej6by3det5ca9f3g4ol37rc5b27cyz4ikhpo7e7eczhs7s0lkjilcmhjr90lj4oyrlg',
                interfaceName: 'cg93le4nwu71l63funomb9a7x7cxeguhzo123u11om1xycc8ozqouav8czqqpyrfbs9sqzxst1ae0n9wibqspn823inc9vujx5nsktazuxwkfdvpwu4jrs8rjf2ih8bxwqwiiy6jwgerp7xllgn5zf0lf1weti7y',
                interfaceNamespace: 's1abt64n1kl1tqhu37m6vykbi2klclbn4tc7dcpy46di66d2xwuf1gcobs0dhqm61d2pkpxv0hwsdvdpxpm87ajvjcn8en4exkfsum0deb3cria3ainlzjizxab3dcr273e2017f49pn3dytyknxy2wrpuaax0j0',
                iflowName: 'djfsp89a8z2qylgj7po3doasy7aew2swgmnquo306hn82h05vepuwj5eepm5ndixyag6672hw17ufjoe4pfyxkfohzs0k7d7gxl2hat4jjvya00kcdqpe0suyy9h9crjvbqjqdnifijmuv0a3dlix4qgndcdhkn9',
                responsibleUserAccount: 'tiz2qf650hfc23h5ox0r',
                lastChangeUserAccount: 'j4ogcfnrv6l7u1l5r2fe',
                lastChangedAt: '2020-07-29 13:35:23',
                folderPath: 'cr9tqgn8ri9fq3i0hi2l0ok7g7jdqu8h0ojzhq1ifrws7vmbnw3xxo7hr18y7f0c1m925zek55pjnub844husfcpn8rcbuu7xnxyyp98wadl8nonrs3hvd6qhd1h7kss40ejjucslanao8w7y1kbfc8scr18yd029r1aldmzbrxnwd498gkwkxckz7lohce9maxnzcgwwoyhhg75crmhj4niou5u035qw3yh74gfrfd67ibltm2e6vohdavbusi',
                description: '4x9fmluylblwavt59dej7wlys0tr0im0ogml0jwz716312s3rfjpm224yu1m4eat5n1vx6ojcr0wokh7f2lgqzx3w9kkboili65biix23gmtbhtmwwml0x2kaef923q05u7xk6pd38c0u7c9ao6cl6t6j3v8zs7latbo3ct3bwia1a418dsowv0ix7e2u7ujteenxh2cxmbjjh8mwy2ns2owxn8q7mnlskak51gsxd8j6ixgq8rydx97dt05d8i',
                application: 'zjndldevoundgocpkh32pnkumcs0h6jfd63yms9svr7ayvtvnvj53jdwbu6n',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'c4dw7dui8izpv8la77udazl8e40lt3v3x9f6ty41',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'oc0on67srt5xiqqrc32k',
                version: 'cdl4oaknak4jlziiwuis',
                scenario: '4wbfvfr0lt1866l9uxxeye3l5pq9wumg4wk7ree85jr2virdgmy1pyxtfqkt',
                party: 'jdetsotohqlcytkj1qozobu9ev62ndptyhubtjkozw1g6flsucr42bkf81i9u8ui406stkont4ng96gjka3yiky3q9ot8vntil1jfr4oj3oyc41oqydxznt89oku276984pbf7apxqz6vezsremw5bs5z6txj9sh',
                component: 'sh74dlqepibhsgq1lg86hn8ua2vz9epje5n41rvbd92y95t3kpw65zv3jvim73evm3ir6ls8du5d8h1gcgh89u5okaruymznnypemvjndp6nikblmwilvrhr37a1occasp2b0qglvo2oazwa500gslod4dlvveld',
                interfaceName: 'ycxix3awqgp9rzwk6crnaegzxbappjry2vefpzul6d8qytoy0hxoisplbzg5kugswbrfo26t9ubkxyt4lygeivok19548cumgckbk50ystdclzslzmno5bumq51t21hgiz61gxn8yd3y7cufvlqvg5h45uvd9ajf',
                interfaceNamespace: 'xfuzs6rc9azh64mrtez1h62h0nsx54emmfpr2ib09vdzwdlwwj5mcu1tcrgpy838thdt0mf6afnonyawvkmhl8vh5lbnvddxi9b468iiwd9yxas26nb2iqdjy1032a1828zru3v4hyvlejjwh4z9h2hohdh1z6xs',
                iflowName: 'z9yg5ghz5b4fu6zcp5sbjc4xtgmqyj97pxykq94a4xf8ggbunadhm5vbhwo4imcn0zddribyl4zrwf3o8sn9po9p4mtp4kwdrh89bbjjk9dcbmt9vx49uw0w1t4s4ulbo8fotcoztffiqcq8zw0q4vx7q5tyvdne',
                responsibleUserAccount: 'omerw8sg5edxohwfq7lc',
                lastChangeUserAccount: 'czh47r453rcje6l78oxx',
                lastChangedAt: '2020-07-29 09:01:18',
                folderPath: 'ljrvwwoj63p863drd7ut95bxlcsgs87zx934yexhu9rfufjnrx2vmwmk43v1fzz8s0suayz66l2cykhskqsyyexmfzcevg0tl5mbgmw255jx0zz7vgjly66gtogfsherup41gs7nl7byybtu0qwn0gmzqx46dzx87zog4yk635oqkp3mtiz7mukvh04c7ahdosyyo9en4ftmro5m6nyjfsg9yzeniixn2byjudyhnsk9mk3behyo309t72mouc7',
                description: 'q9yfvpiknhq17e4o3yjib56xmb56gag9dapmkp4rorgyt9uc543mdu1fnzwle9wfw3r9kekt8yj9yfydm5ok83zew51prxy9vslfmbixialw4wyby25usrd8w6e3edoracbwnpma4jcw1ao2qq42479149bjp7m629yk5ytrwla9y1h9k4n26cfkujf5ryjzclanf56mn4u7uuhehtu067qmp9nqjw1rg73ow2njhggj0qyuewlhk72y311c6th',
                application: 'b9rb7mqdoru5nw2vgouv34a0sg2d8sr5je8he2jh645q0i40m6zuv6mcpu2f',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '5f1euylise64ndo9qbahwusrxujlgzhfebb8v3gb',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '3t760ur0wgp5klt8exsr4rpgjaw6hjy4q474inuxbbbsa9527s',
                systemId: null,
                systemName: 'atgf9gv44fi7x2a7jldj',
                version: 'dnjn0lvhoiv3efx486d2',
                scenario: 'a0jkbh6nroexspb1ybmwmnoqqhg1ed02e3swrnsxc3v4zhzgzgu8ot4iyscu',
                party: 'ejpx4koi3v3qcelk346ggj80y3ali6roetf26bxb49gko0o2vund316k0nkc833ndvyihgyzgee3vtriaz4hk0hj008vhnlex3mivpfyqeikp8wkitsroekkq6z01gjcn6pf2sddc36nue1xwh0sk7xhb0j2bp45',
                component: 'qqzhbmnnmgzadploe2po4yds1dscyn6060lbxdvljj1i91bfhy39fs45v2mdt3fwcgee5tazr30pqmx7nn2521si19m95rycojwrigv7ikbzn9yrwm2a5llvy6e6npa489rxrqxwbfwmo1jzjxt8olo8eawya9rw',
                interfaceName: '8n4rhlaee1xxiszh9zsa6ecrorx2d6slp480rllmhyfojw2mmkef95jsu717vampfp7z9uxhb4nyhh19e9eujme4mpypvinja3f8oc7hi9g1rqhj7u7f4g7tqjqs0cz1y7t86ervcvtt2quh2f4u8d5z0euohizx',
                interfaceNamespace: 'z8dewwf238mtllsty9bbgofyc3per0afkd8wwdwxnkcgulhtcptb96v8ilath8h0hv94mg87s22ld5r95jqmokx3u4c6jlc8kuigzydbrgwpszr8470ulci0r5iyznlytr3dm96ilu45u4nacgqw7o5hak1ba4fw',
                iflowName: 'c2szbbc9eom213updycugvqzj92h0orvdjja7fp64ez92rlsfc3mx19adbp71nygr5mie9x58u4ksrukpjqasvx8iu0puk6ow9p1u0rtbzpajtov995w7ynusqo8twn9de34j6f4qd6jeno6ulp71ebz3ev6aywv',
                responsibleUserAccount: 'elam387ch0msv2fc3911',
                lastChangeUserAccount: 'fjdv5utdu6mt5c881huo',
                lastChangedAt: '2020-07-29 13:11:39',
                folderPath: 'ih0222cpbrmdnk72jud3h7jnuh8gywnynt4omav28crkw18immtk91kdijtztkz0p49u0gzapz8oeojcxduv78xmdm9kj0jehpl00uie3u72gg8jk50b8yjyh0f7vi2n3hnd2d0rnlntltejgph2t46wfa7ndy8b5h6xivhwhkpnhhgcq2ffwqdbtcr1jczunmzi8l2e2paxu39t72wjw3wqx6e4ifcqbmzcsq4lijd152x8tbn3zqe0xmkpsl7',
                description: 'wjdx8paz6uxh3imhyg3t7kygejher2hcqnwaqvkqy5frn9iuspbt7ij6xh08rh3nogwp6jhjgt3di0492z8coe1mhxrsyj9cjux5p3zog6b6igfx49tok3w2zh7nny3g150cxmwqhsu0md26qnc4fdu59kqkqewm8o0vsuxqfay8fjy8mi5xyhliecjpuue7oidr63bbpmlg4x4rif18l557o9jgh8ok92zxrkh43ooh8rddv9qrqztb4tnmy70',
                application: '09l068ms0ekys81dhrlvv7ugppdws6jt95urkx8j4ifbuuic6slf1x0uiy8h',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'e80tpwoznnx8ki47cyv3t8xgtyhpobqvoc8ys4l1',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'wjoeyfx2wwrg2zpydv60j4vtteyfdqw7zwzng48bbmujlf5xtr',
                
                systemName: '2q5y49t803mdk4t5ojoq',
                version: 'pmthga7mxybatctljx0v',
                scenario: 'zt1z67dppe5zcjlloenf2k4q1p6cts7t75cglyc7xf53rcpxg9rabny6772z',
                party: 'xwnoa82rh82euyfz1zsptaphw500tv3hmbh8yeacxzlpogkswjpuf5lg67k5ocjxtpdrdmdx0e95g7e2xho9xljiy8i1w5jtnmysc8pwrghmi8f96efnm0u1ymwsk8dl98cinx090eb2xbh5idqc78lzr5qk8x5s',
                component: '3ms9vrm6tqpr70w4koe97nhztoxn88mtzgkfx4tupgyec9ghsnxsjx34ouugqtfmwvgp1daw18pe79qdydx38fdr60p8422kuah3jr3dtnq8ldgo7ugzeqjjr6zxyorhivpfsc6ninytolbfhfq6uw0lc39v8e4r',
                interfaceName: 'x8efmj6shctjact3hgg5scd48z5owk3qbtehh9gdgu2s4uaoduwho1e1n0ls6utphi4hnf47f6o0juv3tf8qy9zezu1ixhe0tuda01tqmauhmydurjqbgfv6et1fhj2u3mic5iz88pdxn5544ffi5ek05htpvsm6',
                interfaceNamespace: 'ghyh4ofxd5976zzuoxvomqqzf7v4n6r63ee42u641174kpwu9bb2f1u8ghfzhcaxayqc1aav8botd4geq3pmobijol2p54dtb4q7ki47lnpy8znu39nfd9ebo8pbxxuwabinxl8idx5pwk62qgjiknxr6a68dtrg',
                iflowName: '9twzeyaoayjsrweyhwf6nd1svgse66b5wowj03gf7wzj25cn5cpztp8xeawxwkt4srjvjrgagasdgp9dnq4cxa06xky0cltpdehgiverchp1wjxuyo1po6coz2unsuvws60ihzm4thc4xdrhuyatf1t0kl09n9ui',
                responsibleUserAccount: 'vq1woxiaxn4lppxc1qz9',
                lastChangeUserAccount: 'x37x5fa8x1zzcsaq1n0g',
                lastChangedAt: '2020-07-28 21:21:00',
                folderPath: 'hfnrg2dxsa8qivqnc34a3spwaaqi55u3mpnwlcifznmyovs73pha94mmx5amz131m0v7grrznezrs5kur26e53tmgxi2jtxmdyxbw86bvhl5fb44b33h065895vr2rjg28u0lnitcj1sqjirohdu35epjtg4bchd85aahkv68ldi026bvw064247s6fvyx70apox2l530ruut5exdylt12wedaq1d5c0ny6m1kf4fzr322ppnjx1hlj0az25oyg',
                description: 'l1ajc6vfnnz3b2vjo5zffiu8o6nose8gmbei3y4o9fcblyrut096gopy9iyez5sq05g94dsmfdb247vb6woqzfqby8ydmd156tjer68z0ksfsvaju6csm97y9e5jhcs5otjwqe8l3n8jcksq0qb26hwn2mek5p9ll15me266a4ab35wkaolwcqdronx0y0xsvdib6afwueirtx46hzgxsxmz94wzy72g2xtf91w31jwey9bs2gn2qkwftyn5ckv',
                application: '705ogqye17vba9nvphfgexf49p86kff7yxzlfdxnqzj2vvhy8i9slwjuvz8p',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'qf20707wt6rsx8i970guk0pemvfhmo2isowvysy2',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '9nhtck51w9q17lud9us328tk9s9c7p6xyig49f8ksvk1z7amyt',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: null,
                version: 'odsw6peu41tnqjkj9s35',
                scenario: 'ea2tb0nzboego6wdj9dv0w2a3xe2qramt5fwb6o8gcl8jkwmoht6d4jpuakh',
                party: '1wr8jcep6fvcq5ugylwir49kehafou801spuquwz2fkdqu7whdzki46kdnj18a4yzd4hb68u1s7bzcdlwcq87bj3xreu91365i6fb3kzjr1w43kc2j26kk2v21bjg05f1cf0qpx5hab5kt11g5q00d8k6cw7efty',
                component: 'x8jzu4s4gok0e3c713ijqm51n7swvxq028i7tedypmkypgrmxehvu93pw21vxi2eufbjowvf4xaq9ezyre8jeybrmir3qv6ktt7aau0kvwxnoolhazf9phy9vhbul2r42knbukt42notqdjnvsauc3pct7sway2r',
                interfaceName: 'x53ewwspjomwxors8gutqqoz9z3xldmukn3riholtxme5pqmftnx8kg7r00nkj4el3qkzwbcjeb66r75jn42vd5keokaexrjg1pnlklhasex0jemdisqgk61buym308gkdazn0idp87ld61trbsjfnomj9akz3si',
                interfaceNamespace: '67m6xoy3tnn8rgc97ugzhlp2r6f00ze9ojjo4qig2dqdvtbvkswejbgg7b4erner6198wp4a2kcdv8q656cgeas8qj3pg935kd98q4ru9agxwi57o844335n1fw2vkoorocecyam9bzcw4yn99wysje76akkz020',
                iflowName: 'k3izhyqi0shir45t2034fy90xbv03y1stfavwrnl5927xbbgxsgrk2zj1ly1n5fewmr7ibeeu1zowu90oaeubm8j3t1vujtg3x6ewe6ds5eslxghaqye1445u31262mx0tbex9wv7kts6qaro1a0ynxn1sglhisq',
                responsibleUserAccount: 'qcq7rouz0hssni51jdsk',
                lastChangeUserAccount: 'tjnlkubkoydywxw0134a',
                lastChangedAt: '2020-07-29 03:57:06',
                folderPath: 'z7070f76wuuekwtb7u5e44zk26gnje2fiq145vv443t3a9v7vqbreym4r6q0awjc98kqrdixyzvjiz0qg03rspsi3se1di2veu1m7u3tt9d4c70k9q7uhu8epjx7749m2wx7tnlnf3eprrhlu9cl1r8miebs9p9q1pp28upgljwnki97ijl175d2dog4jl23pamd8cag4hkuhhdivosi3pt3g351h1i5nu70ipjsqrznnh4gtzxjehc1empo3p3',
                description: '9rj5vpqq4xnnr60hb69lrbtclxctkcqx2aqxry8crmgze5wa6v6ck8fmpgd6gm7dwrpy4ketnz7msvcz6golcyavxlmubplug7cqzsasc7nsrddazcff3dyd45ix0qyz5kac59hv2agbgiic1pp9wcyrkvirzx3px6nepfqzjqh885iwxm0vebmcmwp3oow301395moud26yx6890nfchuz58xn5p8gtay0ep3eqlbgk4cfyn189w43qdhjgxvn',
                application: 'avbdmtjds720ej7bvjbphxhvxzq17otp55kmmp09p9iytd1i6fr40ut9ojev',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '9wseggmjc8wvkvvikfaydc1x6ysw559xt1wea4v7',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'mpthq9nclchh995l30njr9ta6lp99jq0wdbv4sdzby65qx7wa0',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                
                version: 'qlrscydpajfvsqtad8d6',
                scenario: 'sthioq6ieugy94guuyxdkjse3qkby1jg9h6pgn7lpjr9qhm6vemtkubg8o62',
                party: 'ko9bqj7n8gdhw0evguhcvnseeaa0c91tmid2d7tsyo9brsdcsx9j0uq2mf066s9g5jp3atb401789g2xgdo6j6h2ot3jyxnderelyt1ufahj7236og2e5brnmyxsj4q00xn98q5q5htfjwbktswwd0vw5rbuf118',
                component: 'gtccpon9lne8113ssvtdej5z501jp6v4c5elhab8mm9llolmsld1klu5h1gt9j4kwb0wepv46ei5pb268dsf9x4ki53kjnfx1ammsclby9mlwiumcy9moloqiguqqpj5cz2m19qkftfvhxjqmzuv6qfmgcljsk0q',
                interfaceName: 'h7p6nvc6loeyoek6fyzeo8h6sb2vr71ewtpsw41jmiacq7nrkz1cnm8211w7p5phshebunlbejmt4bhey814nwfd0tc6ed5xa91ylo3jjrkpj0dt5zjuj1r7twurl43in2z7riqs2ueypc5qc5tu8btrvxd9fmwz',
                interfaceNamespace: '3tw68igp3sgt2xo6ila38dbgjt04h911usgr26hmywoco84zouxiz6qhhq12y85agmztehxaxpeinuf5siduxsjmgupadfx4ex2d3xvhcyesrfjlqpzjmab8m6jefeexn2li183k3eq7bi7fb2xe3xhmkxi37uhg',
                iflowName: 'p105hdr1vpudx280j5ve1tm0c3l57a294kyfxxxgwt6gwbz8ljykt68222rpqkdk0no52nlnbfhaby021tp272lud3oqzd9psam3ae3kf0bubg5ucrpu3epravo6b70e463g93xqr7qyid5hz9jurrhkz0xhkqqs',
                responsibleUserAccount: 'mixo6orw7covagupuzyo',
                lastChangeUserAccount: 'twid7cclqzfoe9kmab1a',
                lastChangedAt: '2020-07-29 06:59:27',
                folderPath: 'z0ojw31jb8z37ihbv41b0tguk5qkgh8b2erggpfkwfzpgm8003a5b68nxpyl9xssuztw71jm2kewvtkyt49pr5iddpf4i773z74ppbds3ylge30wrkq1ub0aa91be23icmagyhdah1iikfncotvt4zzl266xrpn4obi1ohide5n2xv2ksi8oqtzjr9s1tjhp54brsyesxdcr9ghyimqw5gs4830444f46i07m3d1k7ov5v9npo6n07y2syy8lru',
                description: 'l050pex6zhl9vd0nj9c71knjayiohbaikf874ov9ydg392j4g2m3rpnsxyvbub0us6yy7kaqp3fxtgw7yk0joztpprk2nvr086jru5tsv0j7dgliah6omijj07nauxth0jh6byinu4fluqx9jziyi1yk9ez0i8ghwn0ecbsh08rpuuufm8vovbo1k16bv050oh7bljasucg0zln5159u4phd2noc1kds9u3zol44hx9lktodxojxqudjy85gpy3',
                application: 'pl1nxiblk5vz5j5e4scp4ryhgovrug11hcped0j51r4akcswxd7vyc9u4gdb',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'o8zga2rkpgfyusuzlr2l2ts807hj1kmvtddd94e2',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'd85yais4z8lh9yjmgz719pz77by2ew8tb86ljqkgp6caondmmv',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'zqwg9qm944eoyrarbona',
                version: null,
                scenario: 'l5eylq0hhbuipd5dfze3atgwvd6hrrsc26w5rggvslvrsqf2t1ndzx0ftdu1',
                party: '7ezlmfivmpu2rumvqju5qr5ih0zal9koem3hvo0f30oftypu1ofvgybwtcx7sb310om385ke9wmvs4ccpogtbmpm9lt03vffor5uktz89en5mwzjqhhi6fxjkgyv0wz3h9zloqwpngwoew1opmjeak689y2zkmhx',
                component: 'ntvqteq4fhwqou15sd8mty4cyuwzuv27uhkfc949lsnhx24pvbgirre4158v7ze3pm7qn6rrnaqf5j3v6nn9ab04k8nk8p9486hisou7toy8am5yr9u8s6oihqr1gyuchhp2qel40uvrnn3t4lernlue3w6zti78',
                interfaceName: 'uujdxzgp75dfewlmvwc3jzypoz8jp0rvreyr6244rf120ymdw3514xw5nviyfpl5wh3u68uirlokdoc1c7zxjs70z2wdz2fvzgojniuzbbw274a8rs0jy9j9hujk64vw376mcmi4dcsv2ggjfyyscr6honn0lsoy',
                interfaceNamespace: 'j4amlxttvy78ni5ia3yhsanwxf1yn2n96qr8rfudcybxmcpsjc5h7lazj8fxq7o14m6mi3hjeshq4nefn8zkhuin7h1nqgpsomib8w06izefyf2lummcze3a37tw6eu14r8m2nlj6xm5xji6ztdjt3ljn84rvkcb',
                iflowName: 'fe4r7y78yzw97at4upimnll1mh3k1rmc8cuqjpc8pqcmp9pco4ueic39oeu2k3l2m4f87p59ylczl9qc91mosos3luejdx0ginppockbqyrazajdiby537srqsgnfyo2vd9pjdf9p9syqzg88no0bya35hevwm4d',
                responsibleUserAccount: 'rmi95fe9ljnr71wi98ea',
                lastChangeUserAccount: 't3257pgqjjnk415563qu',
                lastChangedAt: '2020-07-28 18:57:01',
                folderPath: 'k4we5nelm2v2efa9hayikq65z8nzhth5ang9pd50rr4xf7zsu4yr0kfzq0d2l6qqfmf3nk8tz1kb8j3mnwzpp98wkq055s7iuoe2n6jar7jb4tirso0w29p0zq3hd8zatc4wecy2ed5lnwb2buzagmb47jwfhgqvmwgarooarywbdh9e3iziyn90ov6vjttkjy6fjgqsvd5s09k89lbfphcgy91lp7qbuqxvr14f7tzgcqzyy28r0dbwbhog4k8',
                description: 'r88bmbtffgke57et5pypoqp4nmm4przaagrazxconohs9swoa2lgv0cvpfbuamh3sghongdi74l6py3jxa3bseyvrde07hhk5if1pbdji9pe525hfzoryov5so5sqj0jy1tm8v0rvha4jazobfaejak944xv96p15cy45bsi9t0i8rakfa601jakhnkufjn5u45ii89xtv3e5a2ucoigmpeyieiyroe753hrlu465uvrry591torwezhrq62xs1',
                application: 'yr3kguzihwih1jwjpvlxpae7a21yc2dzg3lb3a29qh448vxfwuy5o34czcrp',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'occp82ro7jmboipolyu8j85a6kwzon4cfxy1xc9v',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '2a3owss973tggixla19k1pfqejybz9mbb0xkarbmes8u36u6o2',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'sxmwfh7r0hzyihl39417',
                
                scenario: 'pcrz9zru8yl61zjk4gs6ltp6rrgo3zk1m92so5d0t48shkrn1awp6tpw86z3',
                party: 'wkp8qm6e7mbkxry1zzbkg5camvpic226rana12ty00nx865780yi7ozt0bj5lma92jiwhr3r99oa223jvsv5eo6ce12dnqklfig1fyhpsn9df1ky19iwq4j13gma9d4243jfze5pd7qoztkg1yzwugokmuviq30s',
                component: '86cnnpe7rwjcl3j0sqac4ey20otf4vzqavjo7rmlmz0uxwesnribky3sbf1rvsghojzvcshi4g5po2effozoodhtf9yd6urzz9jslmy7jhzd3tc0hynqm1koga3mezkknreiclymnqdk45ywy9k2aru53lobl9eg',
                interfaceName: 't7v3aaduju5fxmop70n13s0zukgcjk9eymwgwpjgq7kir2a76ttij4knx2n5fccgzbrczp60h6yqba4xbrjed82pxavz028braszhn5bfg43bsldanxjzcdn7x1yovbe33h2l9ydle7oeeqzhi9ef803coix66as',
                interfaceNamespace: 'm1wge1wlc24x4dn7q7la8phuic6cihn41ulroay40rxo4mmtq50c3n0hc9k97h049xhrhdph06eq1v458ffpnlvzlmqqgdxoy9bktg1pgz9pgqsmpermdx7fzdjcttowrfiher6kuk4lu4bwz4chyh5tdh7cvg18',
                iflowName: 'k7sd8whjv691tj9irw0r0425j0ppbdqy4odaejda54dkjl8m557k1rj01tp68x30aidle3mo1rnibg8njmmdyyabuomzbpgeg7b1c9riwcogt0oibfd103vsnnvukeubhpmvl6fdtkorl0z8vhxh7xv1u66hj54m',
                responsibleUserAccount: '84cdorecphvghodflb4g',
                lastChangeUserAccount: '7hgj5ulfm6g06unktuaf',
                lastChangedAt: '2020-07-29 09:20:17',
                folderPath: 'fzyl87tc4979wjndr403rzzd1vy4h0lbydiv1yb9v3c5j87al24k3pssclairwoqkpengdvxpndmluxylbjk9xkam32hl71aj3j60uzhsunal4h73acupw9zn6v6w1rkbcxchwr5d1843fqwdp2enoi5x8t2ij41ehqvsf8otyx568gjqvw1x9q2og5054b19czj15vmwpoz5ubt3x2g8adk2kam7zhbwk2njwtifzuvqvpokluttl72c3jmmn1',
                description: '3p8dk4u1dgua8pagtcb5vs3minthrf8etg4dz2xpzlp3im791bm3qv9o423lr5fr89k6frlzd7vg1z3b1enevo9vxtk2z0bzv8tlul0ux14tjvkiptt32koyuljljbm6l0noopul81emwc0fk4w3n2ry32hnm19w9q1p8fi8ccyvz5m730zmq0hqfzd9z53ybk58ji7p29505agieegebwvesxvz53vwfwg6hx37imka4gxlkiq3iix7gkuprbm',
                application: 'gbwkyray6lbyb5ryx8g8hqr4q5ht91ulkjqv7btszrgpaiyiy782thj7cffu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'iliqqcnsp4pa1orhy8u0prvkg95a9zw94wrvzofn',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'knfg14ecbsbardnfz407816n9im4antgjlgb2bq7r6oikvlcnd',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'tjmqd31k4y3v7emqogbe',
                version: 'f6sjqt7g9fnxb4cmjbwo',
                scenario: null,
                party: '1o4wspdftld8mdo9gpn6pmttzgqob41akzylwsc9ih5sgd9m3sim881j2chafqhzhjm42ycpvci7evsgguhs28myowp02fvkv3dmitw3btzs0v1h5g77d0mdlwzgswcpm0hg4ht3y2zqrsoe3yjuqq549gid70mk',
                component: 'gsql14sb38jd7opfomcuozo89cf2i1b6g30jljsvdjlhwo6b1q512losiwj70qwumsz7i2pkzglzd67678mdeqpdqt8oiku8y8lobunfrvhlhrz94c7j539aey3hieigwl6gx18jwk5mw110icdli5de20cwchke',
                interfaceName: 'kig8smt49htigirtjh4bq824vnt3wldd79ghrcgqyumyowsbibycztru13lguhmx14d2ffokzeh08rygcmnu37p2vggnem7imtswntkg7dg4mlrpn7pkz256u35rykcpqvytuh2mmone8pcohm8oabru4dxsdgyx',
                interfaceNamespace: 'r93qeup6f8o6x465ebcm1jt82we1dj6sx4ch72i60r984gvdhvkakx493jd8qdmc7yplvrqtux1xrbwa374j8bfsz36531mpai463q2v4rhuzsrazxuqy06o5f0o9f591b7xixlqdhe85n3u8yscutb0fezcf4jw',
                iflowName: 'neiqbypuwpflwzet6hursxaw3rdmu97oudwlu682b0qwkdygzm2w2uzn9dvgaq69nvwcvne4uwxzhhh9xbayp7yfn5ft5m0gmpvah4sa0qp9wz15avzbk6ljvl93nj37xpdc4mfa0iztp8kw7sv117bn0ew6vxem',
                responsibleUserAccount: 'ni95j2q3msbui8gcz4g9',
                lastChangeUserAccount: 'znylx4o83b4z83uzg21o',
                lastChangedAt: '2020-07-28 22:23:45',
                folderPath: 'c235am9t49pms40dr7zzvt17v71wsbt1aguu4ssmf4tp7qbegn0jh0tl7xje73j323myfb7mjmr50icet8s4z4a9aru78ze3bt4bhk44zh1g4ir9hgec0i7m3y5c9jorctwpkp9kwbcjpoz33sf1qwelxuo0k74ewwo8hnduw1d2b4dw6b68gkfxuo4s256g2ubbulsqykterdfsmewndhsl8eyygugw1zzqtqhc01h0jk1el7dgvqc2x5iu6oh',
                description: 'wufs33l7x9kkbxtinp3g2kzp9yivqb8efrz1nm5atek4bzw5a4bwm2yvs6e9bgl3s0msdonjacs7z4chq3amju16itmmgu9de8mbj3lz1w89wsvlywv3gxeut6b95lr8m45kabeh1zdf95qdpvm6yl6t06c63475eo9tw68a7dpvv0rxf5bniecfatydo119n7xu5ozz2wcuk0vlvg5lrxjocqljplptrkxsqrf1j3uedeyea5fcxgm4xn7xv47',
                application: 'yu8tsgzk05hcjd3eujm5n10ga1ja8ye66wmtx7b5hrvc1znxrumr4smg8rcx',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'oevrficiuki8l4xsls3sxvncjemafcfr3ep6xcm7',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'g2pc00e0n01swhdqtpqwgpkvbst5bzh680ff2uxhzhjs6mct56',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'z30e4mvj80h9al5nr01h',
                version: 'qh8xv6e2iegqmgiox66r',
                
                party: '2f8p8nyjkvtqurmis2fjfagvxwm7ch309gq48s2y517og2x8a90rc69f5df9vlh73x2pnn0qi8rxomfv81gggy3tm4ehlwfoehcon49el7la7tq6x3sniet06bu3qx8vz5z46e8klampangt3w6e54zz0oyvb6rb',
                component: '8ul4s4ts6uanrf9qkbqs33fd57apky5ve564v6p70zj3pxj0zpupgg2mkwk9w65ar2c9y7qd2eical80aby0w5jsgyhs5w861tha6kjlg7k5qp7i1vz6b39166gqxt01v1tlahzdeqcf2hcah9xs97amru6dt450',
                interfaceName: '1ha6qluqgfxg0jhug5q21gbrfxiipg1kg9rs42d41r1fiss8o85apkkragabou95qluv2a5foyycpm3mxbq2chbptz2ultivonvb7yuoodasetqdcnonsmh3f4xmu3j3sh9a1zzuasr0cj5q5r3u7llpxabkonmy',
                interfaceNamespace: 'jplwk7y0m17whqc726bfpeuqedglo3ndv22h8ervtuxj3w2d8p3qhpiqwp8r42prt9cd7xp884denv72iqg7wwshzpvcm3sh8tpiswua2gwimsoiliqgqxdqzd4fpkrva68e1squigyivoc5kpe2u39c9iu0ahvh',
                iflowName: 'ybolni7h3nmy4l9nyk1m9qnzr57y6cy1dnsmj86iphupt3c9gelyhlfa3kale5a5d982bl3hy4i7jec00vvg8sfjuxruhycqb9kq9p7xm0vx5nxpbwt2shlohg9v4bc1tutjnwbnsx5bgrp5b26t57fjb1za866e',
                responsibleUserAccount: '28ozi49kddelb60i50la',
                lastChangeUserAccount: 'shd4mszn79fwk8q21036',
                lastChangedAt: '2020-07-29 13:03:07',
                folderPath: 'toqaq4o30jarl4ot2pvxagx7hpba87ag8fe68m1lxbc1rpg22v3plpi8duff7m1jtcg5vmal8700hnrtrvy6rgjappn5eu0hc6a3mpku90bjs9athcqmxiidjhg693otmpmf3066kh8o5f0u19an6o95p97q5g8icbghd4ziv82rt3lrzjswk9r0ksie4uvtd792s9m9mnx2h5rxlxglz80lzioq88opmoqocvom6axuuyjn8xa337f8omqp6wg',
                description: 'elq9tl3mt02p1eh2jo3qbzq9mwdjoc67xojkisz5nzixc4jf6j6jlottbk0u4f3f0lpemax2dj9fp3udhyqi4azkrwkttj0g0lrx499r9kkxpfe10e2zgiqxsqthew82n3w9hfi2fztzq9ucumjke670ja5fjxv9fc36e2fr2umwfhprqa7i9ha8vbvhy6msg35hfk7mo84a59o2bpdmsi1srgp6jgruq7wsgjxtee73htnm8ca215n35pqzmnm',
                application: 'c27zfp2ecaasuw5q7an49plthyihsndfuoyllpe1jbve2hxi47yyogowxh1i',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'c8f5kn5baukiq4ci5j5heq4n0s1kk3u8ce7mhe8t',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'n01hk0hrp3ob5ud41mf9px32phvxlwk7li689j7aqji9fsnm0t',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'kzxrhvhphk6428l01sfd',
                version: 'nf73nmb1xnfldpckotyg',
                scenario: 'exxrmgz3yaghjin6gwl1oyb9lzm2p5no2ftg47lz6oevv7dsvgcqkwmc3rkw',
                party: 'kcyz71l2tfr95ll009gshead5qmmhkjay00pr3ypr9sv06524qe2iwccrxohfrpmqgm0dkwsyaf0njqvwwhifdwu797c3poikc3o0zxkmu4vgf3bw9161c7aoqmsymjfq9bg7oov0vkm7vshfe2txayslf6ynr7u',
                component: null,
                interfaceName: '1hu8pst2h0y1eviw5rsbzs1vvcftxarrc02kywbxanb6l4tuowvp68p1u5y1rc12pbhged4vuf6kpcvfpa06k2jo60b9zn19ljc5e54qbcyc8je508xt6zunwgowm098sa92a0l63wcn8ckcwt3t4we57vlv1ktz',
                interfaceNamespace: 'kg6ntgvkpbavvbiqbqd36deb59favcdj9lpjxqh0vidvnptiqw31hzu2mhv4oqv6czods8m3d61ndugzqlr6wtn13hrwnd5q3p5zbfusrio0erpfol6oboorfru8z8tyjwvxk6lilh7bj0qleypru0zmybmx82rf',
                iflowName: 'i5hrwfvwbli4htc3hfb2hwipq1jcq0yqhl4jqka12k2t4zflwp9162qvwj4tbhijqp8852p4qn4fzjr5pauzrrxjxvq5yq7xj9zunxqfudrey66pd6jos49k02jwjw860wim1hnrc18u0yawaluoawaax5upye39',
                responsibleUserAccount: '3s30hpi2syhlux7uem61',
                lastChangeUserAccount: '60afiwtfefbnkuuxcg0z',
                lastChangedAt: '2020-07-29 11:45:02',
                folderPath: 'up8fw9ub5sw6g9z92w6dla3xdzbhbkw6dnma2vhtb09le59mkau8faw9v81bnwuada3swf75wg9wim7fyaf3bstxpvxv74xio9w5kgdwvzvmziiy3jnjgcxf1r9i9elk87puxn9trbqghqzhzlqh887bxrvvf06aohi7ysrm1tf4lzuoee8vxkfmags39x7b15fgos36at1oqg9xrphcp61nozvdjhhxhscvzrpe7s5vsjgfehv3907e4rhul27',
                description: 'yg4cexnt6hn5ps1tdqpyx2l0zpmdb2e3a79s3yikil84geqb0c2qyseygotmqtev7t4xoamtgnas26vvfv1bek6hy3ib6v3ia4a4468tvibfilgn0asbe3bvy333i5y5tybd27kbl4vtkffjyzp2e0lnahqvpetjdg2o1b8eh0uwpcgoh77ygf3sw84ylauivp0320vcpovcznn1jea5biyyexy34pn9y0n5vrq9bk70f71o1bziga5yct2q589',
                application: 'uo1k4mmg6n71h2bbzjcbrsocux7ud6gce1f3i7lfszmwohfzz4nbljs5qbjd',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 's5iufi3ymza18d6bthij6s59fcgj2vsnsxpqjocy',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'x1zutj1lou6s6g8tg9adpzkxem1094tcicppw67ar7265pnsde',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'i1260tsl03gn3j9q3jol',
                version: 'ba42ub2mzy4m5r4z0qg0',
                scenario: 'w5045s5bs888hgdnfhfc7699jmhs08ojnt1exgh8rzulzluj5m3vpr7xs65r',
                party: 'sndx625v6gqwuw2gb5nky2h6i8odx4i62lhba1qpzypamtn28gyza40o0q52nt9ron13fm5ziw4ato87hti8bagfziqr6144cfdp0h9eww6etqmb2r7szbi1xfmtdglmzo9g5imkcs8bi8m975ho7qh80h6df9lt',
                
                interfaceName: '4mq17pcgox6q3th7vbynnb7tetonejqsof7s2paibiriqcquc42nvgz0n9nydpth84jefpxtyag6eibsmlwu9uurwkud2nudmm3to578zxaoemuus083tlnho37v9o75cr4ujxdgbpc9g2nxgptvgvtfc9szvwqv',
                interfaceNamespace: '7bqrwa2dy646psbpffic672pyw22czcl7upji1helhngu7yhmd9rg4yzugz4vlvdjz1r72id6cucxr8txbwvueu4qvfpp8y3nm8nfvqwwhxpsk2s2uuucgcwckvfthiho7d4wamxqo3aho212uhj0mo95ki7g431',
                iflowName: '1o4adecivb2wqlx7oaxn7jw1rim9kngok9eqo2qyz6c7lx1s1ni5hfv1jn94e4yd8np1qspzvaz90jlfel0skdqr80xcmjqxvllnxm3xmx7m5bk7zf2u1954mjvga1sqp25gev8rhdlbktxs0es4mrz1kmy4zmoc',
                responsibleUserAccount: 'txmnr6vvar9e9dkn1wrm',
                lastChangeUserAccount: '65rzhoxssiybynyw32ax',
                lastChangedAt: '2020-07-29 07:35:03',
                folderPath: 'mplolihnhwt8ppugjm1j0j867ydaspc2junqh1vu6i0nvq0nfylxb40nqxjtyvh57j0b9lsr179ixmix5ex5jqbtp9e8s2teejr3gj37km5yvivpm20nwvcpps1nfrh8z9gu77ah7tpi1k8yy3i3v7gqrmmyvszu2lrmd0rss5g4fgzu1ui7dmmh98c4r7un8pu9wvmgspuka5mcomv93mc250g2e709g2yzd76pj5xk9m8ig0mu09bbx4mwp1t',
                description: '208v4ypdb4lwllniihfltaky2dt7mq4pxd1vqvdy3s5iex18wkiefy7b74qrerda39fskba5l4zqwfustpr89195g0srlajg13dtiv8yxsotjwhui3jtiva6aocqo07n3atse18yvu39vmoaxah1oeobfzs7ymmsh45hrxksx6ynafqio6s6s3arts1gghegjr45198at14hsw9ttdwpo7m2otu1fffl4zpu159om75ebitutt3rsxr6hdjsvpc',
                application: '6qbpvjplghhpf90h7ihgwr5ixgb0zvsz5o6gl4w0305xhg018mehdl3fm3sl',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '99dtf3fh33g9kwzy73ti2tkea3tops9d3ee9htkn',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '2robp6705e46wu0y0ajbux29ol7iozfkq1wd4q2h6vz4pf7z0q',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'c4ur382ii8azt70s8dbv',
                version: '8hyoae5apaapf57opl8g',
                scenario: 'd4s9a2rxzrs8xqed1xshr5zv7458plbzl40q7cumx36jeu7yuvxv2vt7ws7z',
                party: '5j1a04mutc7tdw0d3kapn563l1hmr0zlkwsx3j6aw785jy3vdi6qni4e53501rjljjo0ey4570kanzbm2uivtx52uns4xxumq3qovzj59yejcy9ucszo3pejy2hgtoo02xiavb8k7k33kuotadvkov0b6fvru7qd',
                component: 'p7ruaaees4s6n18wmux3u36fsm4531chtzxyzczhf7hsvs4suun9ykhdan1rlb43qke5wz2wk61vvztsj14fcohpv9tzxn5osfbog814c9jjra7b068jkgye1crcmv3ksyy14qp55c2q7ssa6d951lyzz31fcww5',
                interfaceName: null,
                interfaceNamespace: 't5ejtt11ln59iq62xobjv9l8ibtnvaj0s9zyjqw7wckbx9sxxxsf32za7uc6xyfqq7a9zkokzhp4d9sprm58tl7n212xtk5knj2p3cjd5sfm7msovf1rwxq5amq24un9vkgtxvdejbla0sj11hjtztkgldoq1d5u',
                iflowName: 'cdqnf14bwsn5nu3h0imj6vg8br0dut7vi8dw4r4z5a8firsrh7m2q0l7858opv964zwopz3h4vpsiww9w041whyyulogftw08ss0bcai47d8frtbap3rb6lda5xi62zqj4ihxejkhpo3z40joa01fw174s0phokl',
                responsibleUserAccount: 'espv6t7lx58pazwj2xsz',
                lastChangeUserAccount: 'kl8xpif6rhrscb0nlm1m',
                lastChangedAt: '2020-07-29 05:27:58',
                folderPath: 'pqe3hspc942k9f9okanyvjaio33t6g2b1qcu8cx3ap4vir5ft04ffpp0o8r9qpjb2o4w4w263r7gvjvim9npry010v2p9jxhwbyh4ln23gyhmflgl3n4zh1l3gyh79u9vrv116ufhd4ln9ew3oii7o1j9eddcnb4vkpkrvf7jbi53lfeaa2iyc1t8x1duzotaeg0jr452ql48tkialkp2j9mri9v9ciwvocwbhvg2anwu7gxuzm2o79kp6c06th',
                description: 'iv6sqdhuy5yhqbm2fbhox7waaw6ar3c6wljimvw80epp2vhwmhq627p89is65ypozebz7lpgpopyvo1cukfu5jazzoz09c98vd2a40v7xj7wdhunx79sxsvsu4lzn588v3iwhh7pnsrouypfeuat73mukfuzcoxikvctzj32jbqxljs858ky1vm4pkdc3xwmah5m0mnv5598iy4l7n1p2t2keno3usbi94bnnrfafzzhxyy8tw7sxoglaylfwj3',
                application: 'bvz1u7w9yhqdytr9yqnif3oebycosis67ds9njx85jlc4p6o2jwaomnvp3h7',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'uvaejgngb7vg4kv69l5x81o0zotjtsb8n9ytom0b',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'htqwoqbcrzpr9a2xclhxnsorxryohdkl0ef39fvwi1eg30uwsg',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'mvyhicjrxjh7pppnk0xj',
                version: 'ijcdh8xj2hpsmb5j8ey4',
                scenario: '4nenftjx66kd4wijtxjukkdryu18ox7zxdvwl7l4kuiar7drobjtevb8b52k',
                party: '1d31sy1xmw1k1wm230mz570qcj9axxstoieq24vqw9f3ut7zl7vprfl8qtbunwtxtp3dr3tyrp77ufve51uyoam68pyh4h39i7egf60794gp4ddutsean1j8a7t08s2o12tji2gn7quw6zbpkxp5i1k2p6poxaqv',
                component: 'v3icj1eqj3vbsmgru6ewsu2zrzl61wch9gc3sntz05guvvjnoanhprnjuddk8apsqyazrv180lmaz0wi78f004wxwrrwvoea38qnb6pb5mpxoc17on3jc4fd2vj7ja9vmedfpkd2omrw600d431xizpvfxdz9s0a',
                
                interfaceNamespace: '5v6lm4m6m43lzo54mgmu1rpsmxi61i2u600ooubxfpalyzz1qfoqlzj0bjspimam90c7i25wyckeuczt4qb8rnxa5icfz0i7zxlgpmib3q0a6awnxa8ivy7z3qy2bfdji3587zxzineyfby7mf1l3fkvau0n8sst',
                iflowName: '8filmqzdeqvxfd9nmuzctjwn3wr42dhvb80htvzc6hz2q39z3gqe1g86f5e2s8jqzr8rg4nnf6dhpg2pv1tjyxnrqxvr3o8rpszwq6a6slcln8fux8wwugrchoachtl94zj3kn0vx8rr8gartazpvstna7g6iuqj',
                responsibleUserAccount: '6pjvkqcibbe6cnlr2nic',
                lastChangeUserAccount: 'tdjqjwwxm5vmgbtf8nj2',
                lastChangedAt: '2020-07-29 13:56:12',
                folderPath: 'l6u26o6g39ildpg7ul51oflrl21ttrckt0xm55g8sgp5h2ax6i7dg1w46s3wib779g085g8z8cfkiq37pptal45bfzovyfr5juljbnmd6u2t91usvmvetwrqrnzsx7nijkz9pckjl4o00f5slm39iikvesx6sn65r0t1qxq82zpdzt88ooax7a9unttvmh4a0gcdj0mrnpx5g57nuikp6zwbuesjy0bp36hmhds1au5qg0foh90bevmx0asmijq',
                description: '5lpioxnd16glhp84lt079h6qa1c7n1dlijjn8totttgnwpi2g6bg8m1o43137pox6ek7uids3t0bcxd2vqoz77kjo8x6rssj0xkse6wmz22zr7074l9h2b81xgb0ktsi23d2fkrsozdsz5hnha17btwd6wk3gkyfnzm21oyr16s9mlpkv1aa66mdk2ya334kng61jbdbglxk3ekjor0fs555vkw0qqh5hfyktngalq85kefuwchsdrdldivaw5q',
                application: 'k1xg38u53o36exuhctjqle7af726b2km8lkqwq2ruxutayp626zssiiki1qp',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'm3lj5nkhbv1s7rfmqygvoxyhxifhvfov45c20soz',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'bzheiubz3f19epm15u6rur3j8x9zltgc370q3aw3dnocu61kpu',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'ujkbgmynvsm1syvjupmz',
                version: 'fsbw7878im8zngpnzf82',
                scenario: 'igseoskf6t6uo3y3atry54n0gk4xuo4bap21s3mrqwp8v3q6mcjfr7zolxje',
                party: 'sw2fmbe6tz5zxv478lykvztze2q0xxkf7rofxvsgbs00ey0gdcngc7j1obr708r41xj3rue4endk619oriw5ihme75jx7ihth4w7h37w4mmbxi3uvur616oeemw1qy3ovga2bsoi7amaapiusgmlvn7h1137mw30',
                component: 'rv2641eaygg3bqdvwndiko2dsea3e870g4qc2maoi6v7vgv136uo12qppl97dv74ljm1xgbym71ab45c0fegt7brw7p4fcmqq97xvy51y46nsccg0gmpwr4l3yy6x4ib21o3xn4odtolca8dxke2ard3rfirwucq',
                interfaceName: 'kb8r0ynwecc0o8brm41tm71rd06qt1b3vjcly6uw11pbsxi2ha3eh37fzoufyyymfmu6do28278ypj8na1kftt729c1wson1p1b6lw0fpkx0jms4h2cpiz0zvlppbslkms2xeo6c63bjjh7xx1xxmwcun86gif01',
                interfaceNamespace: null,
                iflowName: '8rzk1bmixqwb1k8qgcr33z8o50lf0pu9e4jwqrkmm3j1ppssumtzypirzgsulvs6f2j56ncjjnwjnkbhegpmnmlu73bq1a17cm6pdi78y84b9x9ojfx3rabehn3rgvjmy9mn002y9229f49l5rofjb5k64ogh74w',
                responsibleUserAccount: '96u4qkjdb4871inzejue',
                lastChangeUserAccount: 'e8e8psg7ateal07edugf',
                lastChangedAt: '2020-07-29 08:22:43',
                folderPath: 'c904ks907n80twddkvprxfmidr0cqom83u1d8kz59uxnwhsy3fidtihlfyhw54sbmlvtp01ahnatbu9hb3elxrciqjw74vxwv9i6p8q3aer3xlkln89du5qns262mlq6x5cyhlqp06caswnyba3gm2po47j09s1ai1anew9hc5mhp4t4pjesxmrdiwpeprtfu6isthgfbamsgmh98ryvmqxobdo7lrlrqndqjfw2jb9gdenv2f31vaj075db55d',
                description: '6b1qlr0yfi755wtk57c16ik4e7835tmy7bd4vzfc72ev4i1grgvkra1zxl6nom15x9p5bhq6l3xmh7q2mn4duiqji067sgqt9fthl944jpz4dc3lrqddltpi7tmaf2gfla7m40stnqlfybe6t7kwc3y7ckcphm1hs2nl7o1o3fawuunmrdzeesnrmz51uye5z7ljdmrce6e0xol6yxcddv8ts6cxatelgweeznvaf698otax5tedwbn0nc4t5qi',
                application: 'k0yz103adue6kzxbtrosmokpmc7em2fnmw98lneuof48c3jd4xrhj35y1mac',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'xrjyg78uyd8wnqhx7pt0neyjnpou69o3660zxmo6',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '3msgggq5cive652ilf08w6bj6aze3o7feyjjg5i60g851ipzre',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'bjdmcbnzfy6ar4jh24zt',
                version: 'sznbarkuf0037usqtfuh',
                scenario: 'la0e6yzb03xhaz4kzr6rh82w5ijy0xjv7jkn7yrmpga4edawbz4le58vliuz',
                party: 'db64pbhwwqscarjaxrupare17as8xskm7s5mw08bugk4jlaqppp0sgghunoaelyp16owk7fli6rvjhjedrw8p0p3tsvb3290ka2j5rmm6w5ld6gx8wqx0rzvtjw94s1mpjqy168r51llmus5wxei1cbod3lybysc',
                component: 'iayveslqlbyow9njjqitr7pj5uefyzftkaegsh5orom6fgyou0utnewu0rehowv1ynk0mdrw3ny54yl8wq2e7rvkfh6kg3sywo7hqwtj84vf4va3in6mbtji00sgx4mfel6bmhm4jshk2v7gzolywnhvuy4wt7oj',
                interfaceName: '4tyo86k1urbbf5ebfw814pj1nodlimgir8pc1lv3armi0n2sraj9ch4hfp7q7jliv5l3ydxb0i8rnlpj5870y7kv2a8wz0y4l6by6frq5f7rly9uwrz8sezyvdacbnhh03or7ckrzhxssyk724hr2v8ajrertuqm',
                
                iflowName: 'fhk4o87jdxpmodj44dv1h59nt40jlaqknnuzeyc90kaj702nkrfn242us0n5gs3evct03r6dqh7ltrezczn3rsyl1h3lqur4yum7jm66kvnhc5xmq2m07nqv72ap06grfhsbkj9d44i3sxfftlo9riypz0fq7axa',
                responsibleUserAccount: 'zoaycho6rjimnqohevqn',
                lastChangeUserAccount: 'li47h6vzet3zghlb0w6q',
                lastChangedAt: '2020-07-28 20:14:41',
                folderPath: 'i186w51sg081wpng7zarz2z1xn5xtjp3jpbpekacavhaax1827kqmm1i6ua93k77cgd4dpuhgza9uvklpwq8w8d511er1liji40mzq46sl7wggf1z09nien36dx5hl3oyvbi7kfrbt5p73jhrhgafrdixn3ps7iybc1p48yvlt1h5zi6mujktndt0n440rjdrfkkicenlrphho066u0wltcdbatwj3pvcfkgq3huc22mqc38c25mf4xs0zimtgr',
                description: 'p4liydfrum3o2cpzuzq8y0ly8j7ku4ozrak2tmftqwjwnsuvzg6wdm116akh00lewfmxdcl20lx1upq5442tjpjtz71esviggyy2mpi97s40mi2xdxdraa7rvq7lai7eqxyk6tzw6c4iavp31q42eoedbnf1bujecqzhr70ije5fo7jggjfgbocdu8aqieavyh6gv0vfcqbane0hsai79nrve46p64c7djfft8vpmtsdm7hey32z6kdj2orzds5',
                application: 'q65j6gno7alhwvu9jvl21g2dxyws5j7zg3najpifnfw3l3p675jjqjqkbui0',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'c444r6guxj4hwrer2dzjb6ml94ulkct4z5xuylye',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'sd8zw3r8i1sgyi1hyatsrlxsnehtavdv9gyrz3uh0b8g2klxhs',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'kc7che0j5sm9jctz81e0',
                version: 'uzuz558hq7mppy4jdxfj',
                scenario: '7f3k3a4bk68iyrbgooaerug0gflmkehqvfy24ud8ggabm4z697kzd7satuky',
                party: 'z6inrwwozar1mqnyjod9bm1rqiq00yeg6rjhipsy1khup5qqkgw41vawk2sdwy77zkg4d7i2t3hpvkyllzmzhkzdgkjjdm9okgsgfg8wzvv5x67y5l08o0rc2qqyapqm2uxjx8liwfpm8py9828idfccmmb9w0nv',
                component: '461zc2qd1rhg9pab3se7oxnm681mk95mrkef6a319v6t5am9rkh1vfjksxylx8826t3a0pvaw7x21gouwkd2h6jur5lyjadjltevs6old5ogtqsth86l55soahy6c7kuysg3fbp0kic3pw4ox9641xbgf9oimbw1',
                interfaceName: 'eovvth05t2ikkie95yl0zshbcksbh361ebr6yjoam86baezjpn19x2nt2mne6cvi2vmy6dedjd7xjbkolnfojd5yvtwmpq1q33adjw1tn9ut4wfqj3t12kut7a1grzb011vnd4ilyf8mxga9n3u1pxjvtaehoruo',
                interfaceNamespace: 'afyzip4wv1vdtkq2tx88fc8usnmwzz2dky25jcw5uk0z9pk3wqcu1o89d9nvaono6cmla716voxojbvow6u67dpmjzvi3iy2mkaebfmb4wfl8z8nkvwzky270v9wf9kvla3vkod7ewbjaklb0rdk878gbf4xmthh',
                iflowName: 'kr62hqpwh8ooj1z9kcn2mqndl247kfj6y6ynrwrt88v60ibz25f32n0dr7j19yz1ilo3ojrfhw4pjwm2oiom8wuxdp9upxd01dc74xju6ihzdatsfkjwdwxkz48ta0avmwo8n0dd9gtnd4w2bm2zzqaqzmo8ds8s',
                responsibleUserAccount: 's4ry7x18ohstchalg22g',
                lastChangeUserAccount: '1rkvh0trfftfalu8bfx5',
                lastChangedAt: '2020-07-29 13:11:45',
                folderPath: '1apg6uojm1tngcks6kl34af6i0o76mj2vjr8oc9ljoxyg52i8u2bbk8za1803dtqv1h2i391qcinhxgghdm8391p2lxueknj0gy92rvkql7mkwyizzj0frjxyuknxp32w8rc2rzbduudpx10vmg8a6cjm5ujhn13hcmj6wcylrscbzsfyoydoy9n9eoiz5uctutwfushtlqr0jx813geookeurk4nlsc9szt9r3s0zd3e8lyx90bfvw1itknoqb',
                description: '5cvjx2kxcuszbc0dkgsntz8rhi2c03t9o18zfqueosar2pmnsr82271jkc008h1y4ht5j1gj5h2jzi1l04tlxtofcu7espt21jqxbdjk4h7r00g15qoilwlzuihfhi1jv7isdmm6x9zn5ku7jfmvq1hkrdeqmo4qj7xujylp39selfocj1qmnk8ezbjhhiftv073el2s17zvv1uq0qvvlsmk51ps6b59l0gzdxm94oajf5i1u7l42tedhvh2tcl',
                application: 'ug3ys5f3up3g826xxqoorlsd7cbkw8d18gu8en3zyztkbnl6plxw2bcm81hb',
                isCritical: null,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'thg4t248z6kcinv81z8uid1mci1unowf26c31a9c',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '77m6cgb5hl8jfghanb5drsxjnrotwl3cmjmmirvuztpq0xb4vp',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'ur5tj1gywyq6156knud0',
                version: 'xfw6pvosqz61lh1owp4s',
                scenario: 'lxzs2o2d9pu03lhaah3j32lxmtiwhpfxrx5qif6njj9ewhojyfbip3dfk1ui',
                party: 'rdlm3ntphbxj8o7fjfm10qpinclicg9z4sai7kuagyexs6eba91xdi1jm9zuw0s2jt9ruzbiklvuvs33wt4s28jjcm0znxkmmml24kmzn73hlih86x0l1a43voh1kembgr7pg840ckivamtupl6e8hai4ax2yee2',
                component: 'vjmj3u68rytfc1b40saede1rgxk2jzqw8f3dyrlwfg797ehsjolxtyjedtve71jmslnq2xrl2ac6tfrl8nlhgovqxz5pwxz79aan9rn71n0b4gif3fk2gwxaf5sx3hrivsts0o0s8dlhyabpkdiuh8ha9dojqy3j',
                interfaceName: 'u1hcho9ll23k533i5fazijtz0b5kqrsf43hql6wshm2ah87mpu9gzgkxbop984ozjk6sg6nytkr55ndwtcvvfpmkue7mid6yq3i3dikcbr6q06fmkcjk7u3022s6qgdt5u8cwwhx0eot1dp8np8fhid6t4gd7uj0',
                interfaceNamespace: 'hrqtsvbk4i790g8z7pp5wshfv6sku81pkrfr9b6xh3rljsrau19ndae2dmm1tvoonnbis1zi7caozt2yr3diflizhw3svf10jal57q9rdb3efrdjokh8bbx5fwi6c861gccarglxp6imeuoc7x3wjobpfvaz940q',
                iflowName: 'o6qhw6giv13ma4gkvv7tz1kj1qyzm4e6vadfpqv31bvxdauho6l0uxv6ago64yw6puihtq59xl4ovy66w72ci67yu0nmc0o8oay07yv0b86icmgfm7b9yfovar1nzo3ato7p6nieejpr4pb3rppsr1u05d7oco4n',
                responsibleUserAccount: '2crf0tfku2dyy5mlmujo',
                lastChangeUserAccount: 'brasqhwuxrht7u6wrru6',
                lastChangedAt: '2020-07-29 09:00:01',
                folderPath: 'edyl23qtoog4k8i8tghus9z3ncju49lhh5ef0afnbmthdog05s4s7oe4b1u3p0iiw5iyzvx6evbtpnqu6istogmymb48qim4hrty9vy0bh5jm3uqg1v60l5t464chmof6prxt1nf5uhzu5wjrn0cdwymnad36kx3t218v6k6j6h82a1oe2w6699af04px90vgy41fxmvu9th5dogms9vv56u4falo5me635thbzmxzdyd6s1heomxesxn82vjj7',
                description: 'as5awoeh0xmdirlhxmjr8swim1k7gxah1zapmsnigukwwx72msuomnycjpac11efa3kkn9dmtgjy6bfx4o5ftb1l7ur2irm6hu16oli5wacisrsgzdd57dj2in9v4bex56mm4y9kstaubhla4z0n5xad6gxoeprzcqydzhzbauu2hsd74aq9rwuef0ox94oemrscqlq4pflvhhgxqgp2zl4d3cg9o84uaojfjujy0ws9478twl03lo3uvbjuqcp',
                application: 'bkwpm9g9wjyeqgyki975iouzhttx4ku37t62p7xeok9x7t5674mddir17awo',
                
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'wnbf590nedu0azalf9ccn01o34yc051n9c20uyz5',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '95ijrvjxrdmb25y7o9v3m4cc9ki4puoy941sit7ffw8nqkb5i8',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'g9ysukuvopgyxj7ye7jl',
                version: 'orj454cxa0fkm764lph3',
                scenario: 'kzm30o0vcnxjctijcq1gblvwuf15kyksbn1duplb1uaaep8mdy4v2w0c5r39',
                party: 'd6iv4c6n6zftq7d16gq15ly6y7pj5i74zg24r2m27vuom62i9icjy71b9xbcxh010wjvzejepm2euypwce136v6s7avyh3asprxxzh76snytz6b249mreg2frv3an0l2a004x9fra414bqh5eckdyfgocr9029kf',
                component: '3qz21hpdmehw6mdmtrqhnkq5qqq7an08yivxgj1ajg2d5yj0rprphygpieibgs82witu1aequ2k6tb60cbkwqf65cigx6pf0jc3usfegtrsztp48d960nxldjp4gjvgrv09vnxilk7bpoiw4b45x25xm2y94oofb',
                interfaceName: 'oqmfdop4jta6j2egc9lpgmbx2wfyzqp8uundl8g3tsw8m1fzvp68cmf7afjd4fwvol57157o7vc6gp01szdqf0iyjlucbudi9wgi67my31c787f9zrf0zoz363mi0qsdnmqvpkuzuro5sgr7qht99c0iiw9gmgv3',
                interfaceNamespace: 'fxe3547d8gzza9zr24k1grr5mil7ysezbobqny2fxauz6yer5ftnsu5rflblumtyupwmbnlmrjvgzeqpczngcydpveec4n8lilp0kejb3ugfy4l46othxtmy7k8uazjk54159llk5obmg214z9en19cfqandnnts',
                iflowName: 'bj89aw1axsur7n4my6heb5gkky1b2x5ipa41of5eieogm16jdl7treqry35e5klpvxpn8fus0u52kfgdu7l8lchjs1fr3jpi7tqx4xxnelwycdgs6ztfqw9yrh1tg37cfyj39phqtmytipbiidylvmlblxysrza7',
                responsibleUserAccount: 'asj0ue87phn1e2t75v9n',
                lastChangeUserAccount: 'igyqsxfkqx3i9ewseuwo',
                lastChangedAt: '2020-07-29 05:26:30',
                folderPath: 'qm33zqhqv51c8t09j1662okrtuz9dyfrmomgkd7ynqnc3x3rnmhb3aqlnnr4hjth2yiy98lc1hav9mnhkfajsvzd7qgbbt7pacrtv7749528fa4zgierx2cufrk7ll63m1mm5sk5wzhwb07enj5839uvu9eskfi6z06on8nhlkm96z5ou14qy75e9gu8ygpdnqb7t6mrmisr58zx7b3kd17nni6f3cvb3zff2jpdv7ateykr0zjxitvq14iz1ih',
                description: 'ma9b6v2i8a8s8xznrv9olrug610fz0srp9w5q4s63rvv7tlwafe6lfujjtxmyzsa2aa9z2at9rbjuvz5bqn6wq8h2b2m1hq69t247ficy9dles5qrc7doq6ckds5u73s6g4yye7567l5erdk7nup8m4qg1j248yf0jr645gt7s8jwrrth4rcb6x6tkkh7b62bqo110p2aby078zj1zijz9svjncqzfkt4cwosxwhpj31c8way9xweytey346zfn',
                application: '06me9q5atcepaqt5g8wyjzn94z6dk7xzamunijbdbsfp05armn90u5aggma4',
                isCritical: false,
                isComplex: null,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'mn0qkw0t5h9ijrhjdx2yvqk1keh57173qukoni0f',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'zxgqyhgdvu4uipjgnyhaqu4ldkxpeeii9afluk81dk2u9dd1de',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'to9dqsyu36cfqa701np3',
                version: 'itrxxva0ga0hv6uyu1yy',
                scenario: 'hv7kmf39apjqolyea82npxqjjobf566dnzlx5bf9iedq7ayenkaeal04dctr',
                party: 'kj3dafddnz16camtk9auae71zsx04ni59bifjm6f7wtmgayo6nq6m97prtmq41cste1f1pgqeidnux80eb8dwtrlkb9qpl71vvrqpsw9cdi6ej3vm6tnic63oead2nh3ih1xaj90gqdlqgbfn1gf18tg4n3y5gwe',
                component: 'qk2p5bjxeh1k4p16wy828k05mq7l49ualtrkkqbc48qoqtan2iikpmsfyueu93ysl2mbo2zvv6tpi79io5jfozm4q0dtzzorvf00ccskgxcc329coucu7pi8riuotd4fjbrtankwmb1gd5zviw3xfmz7cyxq92c7',
                interfaceName: 'gde4kv9qf7jw4a6ubhthcqa9pwg36wb8fm1jt5tkl100rpn1skhw0d5ud2wc8rxt9wuodzvdclfjqi8r30l0d458pjms3r0skg2lr6fdxq0ssfum2e179ixn4gp60golqs22lv25u97h4fo51w82hbjbrmts5ojn',
                interfaceNamespace: 'bvc8hs0y9wc6s7e9psg1qbr07a5sodm61yp4f27qcvnr5qlxiheynpmspnvp6tirxovb0cfft94xgx4wi4tmg3rte7ya285jtrw8t45abmqnjl1mnofz2bmt73aoah509apslsw8zkdn06jlklixh2qr0xsv9i23',
                iflowName: 'j57r3rcqrsdvorgk4liuuiz50gvqnfd2oro0puetbh241lon92loal4vusv65rlk4g90zplgt8qxsfvp8dil8obk9drzyjqseklx6catzy7kdzyv1h25c8klz48dlaiuaarvyrkd8eje7xo3761w1sq05dm9rygi',
                responsibleUserAccount: '5i1nqy8vwacolmz4fbhq',
                lastChangeUserAccount: '5w5r5rne7muwkj7ygzj9',
                lastChangedAt: '2020-07-29 09:48:53',
                folderPath: 'imuelfo159lfd961v2akz4k9mlh6145fqfjz9me7bll5057bgo32oj0lmbh4gmd9ccvrgquuhzauydgldhnngfspyy6oz756ngkc9e095b1pxnmtd5rzmx1rc43yubr33fxrfuldfz1uiu7x265moi3o2m7jmoro2hddai2hyufeifryft0xkhfl9yku3wfi55osobnp2u33hobigayzxr9vggcfyez9wqgvprapdpg7c555oou0vpqezpe9dps',
                description: 'z1d6gv3h8s1mmrnn2vrv5tm0ni0byki1vkwttjkwwe0dvepetl6d9maa7ida2otyfxhs5lus8eoe0g3m6czx5vhnawocnvc60g6jlzcwnacjjlzmrpuxbb7v4dl2g2uajtwqmc66jaqvqw8yuv8b841pi6mmzxygk2pygoi0h67iksvgewlu7n2kjcafqjjm6fy9z7ilapntyawax0rw2cl9gkriok9hnpo26wzhwntuu266nj9bwc0z2u4cdeb',
                application: 'untcxa6brrs0xzflwqqdbjhgb8d6dhrzej9k5bvk3wf8wai5q9cd3q8070i6',
                isCritical: false,
                
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'wharlh8hbgd35sccvpr9s1zisgomcsq8t2umi',
                hash: '9m5vqkd5mjejui8kd5n6jensp9uq5t2zbo6cntm2',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '78v8jhfsrumu6kpa3p2ys687fqpd77kml9uxistnmpuysephd5',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'up2jjdn8fcly601wzpu6',
                version: 'jl5inct3g8e0zg4vdhun',
                scenario: '7a9e8mm1lhh56k07d2qsglm9aty5azqpz0cf0yotddb8zwfpjnomr4al26w6',
                party: 'xn527s80z8sjqqbzauddrcfv9pdjhc5pp1e7tgo0lg21uom6yomxytg9ol5iq5jrkra37fz2u2eqoa4r4ufec0mpx7ze1l5rb4xydijg1lst7oc2ho8pwqpic95syd9haccos0yqwzdgfp0qfb2p3j8lmhye0dqa',
                component: 'qegoi9k4y4ch5dbtvo000xi88hkz4l86gbfdpiuywcoa5imcsm0etnmq9ym8t90jckmffdg1dip02n2k79cvd5qozife24tm7v1itc4g61i8hhuynatgardxvd8hjl6kjmpcwwiun53do1w03prn773bx5q2f6qn',
                interfaceName: 'kzd2gooj6nweht0f91oad5rn72t6h0odkhfa1zk54onty6k6uye8rbdl5p3u2rg3x23aho7zghlflq0p0w12zdcjjfh5bg2nduw4kw7ixousrev8dumhpyzfbcwhit6aujyhmbdvhse2u5ns0i4tl7tgd61llg7f',
                interfaceNamespace: 'v3xem6o7a5uko7t5mxb3kb8ek1fx9fn9eb8c1ltqvilk0q7ll6sucims7v4fq7brtkxnxm7pl5q0jh5hplb9506w4w542x7csuv2g8w296jued0es08inoc3aq5uc41ko1xanwywinp15l59r4ie48j1w6hblsl6',
                iflowName: '98z5n27a3fkum5j6cqqt8bkl0iuf0514jfsk9nq1n1fj9xf513cwk9vj1gulvwefos92yeyinj635cju3ig8rnkr1c0udq8qebfsdkacx9r0y5jfeqr94h91zp3k45h2hbhql4qavgla5hnex9ea8o4bf94r0tdd',
                responsibleUserAccount: 'rqdgjcna30h4thg2912f',
                lastChangeUserAccount: 'ifihb30os4cvre8uxqy6',
                lastChangedAt: '2020-07-29 10:39:45',
                folderPath: 'xah48bdiz1i0ytec8gvdyfqw1ksgmnx5gfvpddm46x6v6nszfvn5f0mb5h2jcfwni53a19uhgkjpkn19c7s57wrc8op1ydcb48sa2iz1qxuz8r2m4fj9ayl1z9fj6yyflijbubzr5fc2uxquqs1lqbk15un7n88duh5ifco2baninsko14mx4feolljmakmvca9xyecou32yz7erua9yzxa7uakdt70tw26113eti4s57fs56e6orbywxqhee0l',
                description: 'ag9ijotjjn89vas3ixli2ubtvmlbo37m0dhmca1sn4wwsahie6d84v0ugbemnwjzzb0c7tbv6wtnheuskpsbjio6esefq8ca73b9viujtjdey6q1vqpsedledyok3ikq9b0mtanhn7qultet0i7wr9dj9zqy4fjixhjg3qg01t6mmhhky0ljom7evv8yhyx7ohcq9puvcy0xvn7r75fauxjb342l6al30d3ar5yg03iheggn60zzq1mboxx7xd5',
                application: 'e1ir851sj38ugeuxmjqw3fnm9bfr51h3i9hezhflrdhjldfua50a24qq7vhr',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'jog9kdhoonb7c6skh8bdnpm0ix2lxd8a56vpazo9c',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'ry9sgccsg0eyrlw0dgutv9zt1txjnp26nzga4fqvby8m2ldd0w',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: '3oeaqm9faxpnnpbtuso6',
                version: 'n4s71jvep55tjeq1ed09',
                scenario: 'ob7ovwjiymhh6xf359dbsh4act2nc16fv52l8oq488qrz1jswkw7b0bippof',
                party: 'gn5j7srx0jxk8wkrf8nd0ugtoa2mtff15jae3lfm89dk075h7sxm9506d5xk56898cny6qf9b5yu68wp0t8mwcwsw9yt2mecna1tgs8y18twne1o1vmggl9161l7mc8mw1s64rq9fleagfwyivkiriswkledj85x',
                component: '3narai0o9iy3p3x2gfz7k44datmbnwqrdbnsjzrw3qvbys3tgm2n90s84fuq2bmvtov4ghvpd421tv1cxlnc183xph1ilb9139g80tn6gqvw1p33hjpf7fg7z9tfw15y0bofukh8j30vknzih8t91pkap2rne7tu',
                interfaceName: 'm4ssi9rxwcz312wvvsmnzas2o5z913dmg2hcktvq7v7spcz07drvu788q057vaq7dd1pex4fkg16hrsnkfic8y9g5gi454rt5wmvl9ao4910h21d4kj63s4upc5ulr8v91c3tqlpu25izm1zabv17n0sfp1hkwu1',
                interfaceNamespace: 'v38itookphl4w3kkrb2gm1l928n3p6gh6hmelflmk4sf89hqytc46rjhrzm795gptbh53xhd3r1lwcbx95h6huv1pkfxcdpsgsrb8kv9dkww1q7sxds9bt06dmvxtj8vn27f58fpwxjuqxmrtnvvj7wfb8i0cs5w',
                iflowName: 'q008f7lmm3r1z78xdd3rcfqh9ang3t9sjwkfnq91wepvh3ab8qr7q4mg6bgvzncljo90mqxj4ktc3ekp4tudh3s0qirih5ea4tu1ptyyz84662c1g2gvxc0y8h8n0ekhwzmtjclj2h58jos4kux4ree7zw9tbk5j',
                responsibleUserAccount: 'wa4p2lxd8cureo1k9e2o',
                lastChangeUserAccount: '1n2lr1lxpudtbrckaa59',
                lastChangedAt: '2020-07-29 01:33:30',
                folderPath: 'wbptbnsr9p5oc3ongs02khfgp6vphxdoctgk5eoap9lyswx09dmm63t2v278hyuhansoxc6qc6aqtaqr6kxvxvirc4nuic65ul407pwymywxcm3oyts78i6q9tf7jwxesgwl1w12y8aot8z532l0xqldsy1a145a7qdea23minseatwyjzhkbdfam0ou7cxlxih69ycw7of7rwiobrf7uws6fmaxvh3dlijdsy5t3m5qxulnlbimp5wzlj25pqt',
                description: 'eqxgjo4gxg9ovw4rcearlpku9fb7eqbwm1l0fei9f1gc83zoiyoghh1qdhc9zs6x0ywert2xg8vxwb3i6i67vb0s88dtvo7s9yv0k4p94gm4ig4t4zl4acxgi0rbo60uhx5y1g5v59a950c2fnw2ortnfpcica9s02m3r1jh10lgoxc7j5cgakw8niuiyctieaaxdm000h4op0ex1m3cuy2qt9pbi5mfqzhwoe9s3wr9qpfoerzdtvbjz8hlth6',
                application: '7wahloh531dt270iikvlzs9l0cp7s57g3vdmyjhx6fjswhkw5o8d71s73pjh',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'fbqgqd0fqqnq3y4ebz9cn2r6zankw3btpo6ro8tk',
                tenantId: 'tgeugh4t2o8ti0wla5phltrcpdbzlvoo8ja5n',
                tenantCode: 'kolvr1zljjm6mqu5uyc9hz52giwmrmda6oxc1pbhdetm23ktwt',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'i22lfe0h1cemlgs6md8w',
                version: 'umr9no3txhjqcghceoyq',
                scenario: 'k0vfyqinbkb19hvooo3uelfisgv46j94hs6oi51ofqxuuwwjhub2mdp1q4um',
                party: 's8hv4o80ah93afyryyeyw9ubvaagza4bkrlj0h2divelabmahcavza55koy3z6bsprh34bt8jzwwa3oalrcno7ffzzbn8ku4wepiihsq7yj6v2gr8hr8gcvmfsa4o2s9garnvd110f9tap8oh10w3f9pijv3claw',
                component: 'wru3jcge46swix9gweq8vz4go87h27e3865369zi3y0i51dbd1oa0ilj4tipe3wf6owgaebeaezn59sr46669z1bfbl5nrkjsv3e9iwlw7c7yruorqzm0efj99xhoqus86qp9pke6eyvg7mgphy5mn6lkkgckvkt',
                interfaceName: 'd5uzj8loac6bdtpsl0nqtbnx1hihgbvkvxq7spt5kuo8ktuglblxnttoxw9frvkqq0bi3k8qedjwz98tg5m1ulrpyndcknw16lyqpg8cz07du9k1smkf6f2hk7b0d3btgnendiixy6ndjiz7ki9r9frgz2iyha5k',
                interfaceNamespace: '7wyqm0kxo9ie6vhjhc7p5gb47nag6z383irei65tit01eua7j5f3o5qgni7q3fkhrx8l9fv2vgizt4opca62v7llv42dwtek0vuc768vqhrjzzwrgyqchmtih5z4fy1ejehhrladeemps2ot23yg2htp9il5uuyy',
                iflowName: 'g5g5u2a4buuuqbw0vyikjfkja6zy58qwhi14bimiy2tokzyde3gcsg7l9e6ynbb9ksjao1waa3sjcfxupxf2m4xf05yh5ioqrpy047jn8i2le87emyutz70cje5z5y92o9mx300rca5k0z0681qu2f8l4vil6ewt',
                responsibleUserAccount: 'xknp88cstgnfc2vxjeel',
                lastChangeUserAccount: 'qix022njiv5wiujxlosm',
                lastChangedAt: '2020-07-29 09:52:49',
                folderPath: '9sl0y4oxc0iyrcxi6n2h8c8nmxbqfhinou7swlekojb38346f02c58164em9973q6u5slebz0pxy9sqol7dd6schhmw56ieak8cdzfoos8qsgej2zi9ikl2ctj14uxbpf8hmg5n3q0nws2zxus301acypha2takzrerg643fsfe60li6cxzugjfl2otlxocq3drwbtax9h3jvn5sjday5jp36wkc0mu7d8njmbya2moyjlhs8v5dtbri2yd75y9',
                description: '4y70uh9f9bce3k40cf92y5fi6ahl6nxjtfr5fo0dhiqq1pk1w6zfewqxh6ei9mu3t8d2j1i9hcw2upnntn1x4oe07rkz0lcoajyssi2ppex14hbivvrqr3wzww6r5p8t4004g7c4dja15metluajub60mjt4qjd10hhub4467ymgxqycvmf9kc3d8seydqp6sswwbfl4tgxf112tgklg1jzfv4g9yr8qpn77ld7ppa2wpdprv4l6wo2j5y36hhj',
                application: '55g75ztnxurdstizhf2bu527mp7guv5s5bwk1poc0gp9oe7kpl4nuf3fh5kx',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '5d4dlsssuute2lr4wzjhzkfy17sd63utcefar7dg',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'i0xns186gi3qabo7ynltkn2fse375yq0k31sh5iksvalxgg8np',
                systemId: 'benldiymvt1dtt0umbm2ui8769ishey9hhsn9',
                systemName: 'dmvqj9zb18ompjcqyfi9',
                version: 'wzmkbltulxx43xyhm5zx',
                scenario: 'ajepd2su471iab6ici2etubsva78otifuj9m3to0ftmoff82i3biz62omvzw',
                party: 'fwp1vr12lom9h6up5e1x9iy85v3t0nysx3vdfbvtqh4zblgur23mqko7f0bxplk5z7tmp9ggujwlgxfowhsqem1y85uw86nycw7pg00ne9lyl3oj611rmnhkni1kpqm5j1fv88cwj2gfrt0npkhsftyd5jf6izj2',
                component: '44ut8jo9z16vuynddo9ez2ewqbnzbtshxvfquah1kc53fvsmmfx16k9t9bywcuirgyadqptpu50e3e2p4mjv8qd6lik06ppd9gx6f3wtstrpgqtqrpm48cc23tlcqkxp30u6a8uumfnou6h99jihga10l4ax21bz',
                interfaceName: '7uzb1xixzsiwnkb8jrs92eflmdsjnx5md5cdmyiqrkxowoiyb778kzhaa1yzdsuau70d9sfpbjtcypdaopdmwoa2hcelnogo9h4psodku1i3tch9e43czt9ddhsik49q3n3vjey34hw5mwm0rxvky88atr1375ot',
                interfaceNamespace: 'xzbsj7b8bkrcizkc900yy5c7gpziw1jsvqwr1zbyepignxxwpo1maomcl3yyykkw5vptk0mp18yoym4laf9kw78jigcun2avh4rxohdtf8sswtyqjgg0yzchdnefovo3xi7w9u3cpkfhgt9zqt3mxm75j0iqu4yf',
                iflowName: 'z8zsl2v0nzv09zu6kapknlo3srxbyzoxw0s5pjcp2tqaph4j6nxlzqd0rzfmnebd7wf059arrhdw6a57k7ok891r71ofngv30tx3ylodsrx17oxtwc9rsxhdmod081gs2egnti0rp612cc32yjohech5l5fvio51',
                responsibleUserAccount: '1dwhpfichcqlfltooty7',
                lastChangeUserAccount: 'vdw3kherupzgr8071w4n',
                lastChangedAt: '2020-07-28 23:02:19',
                folderPath: '3t8d7y5bzvn0oh07nqlv8ppo7ci8ae32k0f1pn76e1dfmtsgn5c20vxuq0fs35voctby1soyjrcoluw8yqmz64th622bycgutnt6zrqkf0wk87um0u3vyd56nfj0pf1lkm0siqhgflndvm0zcrx3bd0tfd159ecouc68rapqztst4j9q2fhx3jwz7a3ifxtn61myb77forr7nm597tzsfcp1yqgm4ei91u6jcv03ykujz20eel1a6ir0qa76tts',
                description: '8qv44xarkhafwlauf0viz4aw2xwjvv75rui5t9js72e292n7g2r1di2vno36gqwq0r9px2vzdr70a9n8qsoa3gn4pk31wbrxxy5yx8crf0m64ad37oxjjktt37jij2pt8asonawrwkwhe0cr73k1by9pzep47y6bvtbyw87lm3fiwv2a33elnnl8dc3gzftm4jzt1wxol4vzc02ran4mqot4zvqpjt7whrdloqk87979eq9gwkqgfc2jf5fucqu',
                application: 'heu3h920agwurbr6xjcn0dip2vcfi44yix4pfv70hplwwa830ywcktb3mdyk',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'bkbe2bvgzsia3gem6jiqesr4408whao9ezf6zdje',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '4r74zh730hzaqupq0ekrzookj8qj8zbc1gg4yy5t9x8np83z5y',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'cis595s4o8porv7zkwhe',
                version: 'ae0ihshvcrmk3p9ftq8y',
                scenario: 'o9kalcimcqi6pokq5ry7imy0c26e3w5vondj9wr1yemrdpj1moom71dgj2z0',
                party: 'gxds3y7d5lsdupth3ty7y2sw8wxvt93yfljqi6sii6qf4s37cvmaiucf0k33ew3z9obnxzqas380hfaktsm1drqf9espdqhzkq16jymmv78n0rj0mqdbjerji3z4zwdegzxtyx3456lns75jh1obego7bnr7sc8h',
                component: '0o5aphcgchxtu13gnki0o3bg19nuy76dd6idxgburp1crz5pq2srzzucztedrae6u7r0z0foz4eczu10nyt933a377hwaljrd8ffleimubefer2bft7h335yhh6t8gpadp52noleiqug03l2ngwt5rpulv9bdhkx',
                interfaceName: '01e5423ishy4ki2qrs0cltzx9ih5w07p4dsz38v2qckbpcbz9e9cuhg9ib6nhz42bvhu027tug0davauqxb6uz5b86bl7i97tufxx8fde0djituitvfdponzc8k05pclj71pylhw9yjzmcskhdt7chqz5kd5wl31',
                interfaceNamespace: 'hv30n7xawzm11cow2dbmli86nthawrszzsg4mhg6qrwyctxojc8nqo73akfmkrkjvs8xrxk6wv8uuj2ebzxc28v16cnxh5re30qak0nnz41sqbmti6khnmyh4ftjuwehs33idf9ik37wsbutcldfc4fte45uih2a',
                iflowName: 'ssvhu4u8lag2vgftblaxal1njes24ogcjsaf77rb21s4yhuuegp2tlsdkosd769eq2ppfida4tzvyh7hyns9bbvkb2cya9sbu44a64ou1ye5pgm3jyxr4vy8j3zdgm752jmorsmplpcfnjpgqgz5pvuc98ip9m4b',
                responsibleUserAccount: 'jpqov9xw9iuetsfhwuyc',
                lastChangeUserAccount: '9wtu9cuwa97uc4xrq0tj',
                lastChangedAt: '2020-07-29 14:32:58',
                folderPath: 'w99ce3gyvgg0x8nad8tsvly211q4yhgepagv3wivsgdipth58mjeccel8mr9p3av7vo4i2lbrzgkba4xz3a45rjef5rwv8a9ixlvqos0wgf9pqxur63btsfm5625grn7gbj6zi0j0rqypo72glw9gtws700nl4e04m8ndgni0ijq7mriemgh3beq2bp6ukcck91ot0m64yo3v9yqpsgkzunr9h8yzfu768gjee625bmcek1g2lho4fbrqp6cfi6',
                description: 'fe6w46r34y8ln0h3k2brbaim2c5mg8er4108ywtp67pxqbc81b2rizkd0qtv218segblflbcbbh6l9nh9jng7b2oyof73zr1429udyojhono3lr2ntrtwufvt9mqmwcts8diluykve54vqeb18fssfujv7heuudwzsemggxkz75kaux6ew7jn2fvncxwqh2ppj6kkes2717fle967je4f19a5gr4l4ofhshxru0nx2kvnvkj9z7bbtqoa9grfbd',
                application: 'ttaec05xlglnhagw2yye9vydce3pdass4v91y5zo1pen175y171uom22gcl0',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'v96id8eu5pn59p41xjz35aingxag55e2brz4w',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'gcda4tfdvds3kmflgh0cozm02v92t3195f56uhr2',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'x7k20ceidu5ahlrggk7kmdxqbqg0wuf691yiagrc80n2b8vepzb',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'ly00160djncm9zwzl0m1',
                version: 'wurvsgkg2wazpmwt55nv',
                scenario: 'luaosrlzqou3fjwstd1ec78shofsh9a7j0mmxwsa6vuv2de9ykdvw3q54knu',
                party: '7vfwu7yl0f8xgwqq0bjvpxt4zgl26qjfn9gxhkel71kh7i1ypiubr3uvyc2jc2xp7zwpdo8mqyki83whdpdbuyzjhpqux871hhnkaxf06y0ny36vlo1bmtpxzt8nw8r6g12e6hm6yf2gb575571j02s34rlj0btt',
                component: 'inykf4g31fi44fjufdc766kw5z8mwd45avsm7vn3ys0mkowbwc84y5hilc5romzexqsau8c87kkechg6bmkhnrwb7iu40rsafrw3jam0r1wjigh61ifq6nzktv3gjoyhrpg5jk0v20ivcv6zj4vao1hefny3eahl',
                interfaceName: 'sgov8qo6x2bif2345ha5vde3sb53a42flszdda1i0nfgojh1t01brzabv23mopmznnx5vaititklgeaxbkvsqmj3ah6px7iuabrubn1trpn7iucpnfwahxy0hatxf5hgz15np54m00cgwib3p30vl6ylok68ascv',
                interfaceNamespace: '8fuvbaj3miwg2hqnu7oe4sbc5gr9yukxr6z88g1fpv4ahrq57dpa1rjr8v2521lm1cvnzzhe08juxwn839ao36i5ojsw4aqbxg24dp3d1z20fk0flugjpeiiwsd8itfnv4jeq4zzdko7huvryyoqhifg0scvabqv',
                iflowName: '9j9u23p9h42b0pen4lswdxgu8d6yd239lt2y3iphcia0bak0016bhemew7fs06ldtaifdv9v679r1enjcs92ykg84rsqyarddhav6qr33vv49k2oi2uipj9krtickog9f8tawf6zri8k7yqsinwp4visu9srvjg5',
                responsibleUserAccount: '0n0digcxtammf4wv95c7',
                lastChangeUserAccount: 'i88lvx2y5meu19ay2r2c',
                lastChangedAt: '2020-07-29 04:40:11',
                folderPath: 'zl6t1no890ip0c4kq6nmewj6jeq3kfr050r1trool6nvu0jv15em4i8l32eei7rd52hjehnqd5wnfjbw1iao7z9w03r34qdl0j64rswdy33k7pc7oi5i67pxu1k3j52emszprsqc7uxd8iqaxjmngr5yaeftuftzv8pzmp7pffsedruau8cjf8yqpf78xjgf3xf2agmnqrc57yvtt7udef95aajjswcvfcs492dachxouzom5ko9hkn7lf91rfz',
                description: '4p0q79v23mr8max5ddu6l70z5o1z6mfbjlahwljm13oz7psqdufc7738tz56gsoiop3nutzmijvackw3w7v8su90vnvsrydsfy6idwpybzr7c4kdluxrsb9x4rie5d5o682kexjeefc8jbnylp9kvru31ltry4st13m3l4rhfkppu8cicjtkh8fu0tl37gybej52j43479j9kx9p23a97eokyz5i0ml4gpy191oedtzanpno6bwd8cjip6yr1y9',
                application: 'p4hikdumqg3757fhs81cufh7ibgah7syccywhrflx1htb14auq4bcb3w6vrx',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'fp49ka7txlq0e19jkwnks48gd6tn41d0kug72tfd',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'hrq5oiq6y8flpxti10woebjvb5knf9rcb25pn6j5dy8o10zmsa',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'fa968sez7l2aggx6b3len',
                version: 'pu6uwe2hfljno39tcmli',
                scenario: 'fq0netdo0ckhx9pm4jdt1bjrs01bsiag2qsqy7xn3u48agqvyyxxc75ud6ay',
                party: 'j63a3qm2h2mlr3cwylp3hzlgxpyzmzqja90dungu1z25qafo0kr7ivnmkhxlib9pmyx3reslyw8kmh76kpifjq0hsewuon1s084gdmg5jd8csllb2odvgqe2x2eumr3k0s6wxb0xd5k9bgf5j2p0u6w97il4435d',
                component: 'n4yptoyfyai44cp9260e4xkpfheb361kxgb3ojpz69aqk2ytfbwfevppb9kq3q5y34atpa7q5p5nwjitcz1vyrhcay20l2ujykxs185vr9r0dlf76a24cwzykw2zn1jzcl3eci1yvm43v4qivgyx0vxrfhm4h9hp',
                interfaceName: 'zrsjp45oxpeyiej1umgm7ei4rc8829u9hqyc27skklmnwys7gjzzfjfkhqmtbgl1c8gtew3slk6pe23mix3usc9p6qqmn3qe9t7tyiiquqm6009514ocugxyz7e5z0k2t6fw3sga6byn4skgc3gqfu3zwse0neei',
                interfaceNamespace: 'clr58d6revfjia9fxb42xnol0xq64s83p4luf07o61lt7x3z3biyefv3yau7g8pycz13b6wdq0kph9sbwwzlrqcj2tdh7s61kzkxjdordm3a0ijbup79ovutbhobodeyxxabcdzzrf13f8e6so2hwmql6abgu7lf',
                iflowName: 'lv5vgc9b031ykpuaq3gwwbslkrfcjp6813nf7qmlrptxzup9zmamuwwqpd2ecpwuorjozgjd2c70vmc6qdyjqh7dnrsz4lkzi162lckkqql3zsgl2ftlmyvd9vztxandtyqnwjd0cusxby9gbfa92rdssjfrlrv9',
                responsibleUserAccount: 'ww1rcllgkg8rjzgqnkxy',
                lastChangeUserAccount: 'ln6cppuejbm2qq6bik34',
                lastChangedAt: '2020-07-29 09:09:07',
                folderPath: '1k6wyqbgu11bsf3c22761dvdvrhq64f9i1qg0j81f5mqsa8dn2h38fnduw3l25n05sz0g42a82ub1myo90g7h27zfaj5wjo63je5talgspz8isdcl7cy3vk3353qi3f0cvu06ladyna0utlwvgbl9mp3esuyocacu5em5f0a7nbga3ajywd3hii8tc1i4okwjqqrjljmzqdd8hj7mdvz3nbshubqh6fkdtflzwcqe5481b4jqof64f04g99las4',
                description: 'beweus4zqpf2f2wbm6dcp7g4xi03ou7s4ywfvjc0ay6g9duv1koy272t25z30eknnk2iq647alkxb46sbeivo5uudjgm0c1mfil8jqplwx6u0nm0o3ghevby9cbmqt7vhqze6p1mir2179g48vhtwjalsci8zwjdf5v2hzaw1eqpq5oxdt27qaxoeoil1b9bhn35tr29pkrpu5oreae62ytxzobg59cztabl8a0xuauzw86mgdy42qeqkrbev11',
                application: 'jzhh9x7nxvo60dui6g41i1vyfc3ytza4d6wcppvcs0prlyynw90ax9u9u4vp',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '4ktzjnsfowlgqw7sph273iqt3fsr26ywxgoxscf5',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '9q5xubvvxfpe9txl1c029mo1pwmnf7tfw0knxjvfdzxlw1dz9o',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'cuoxdeibww8m6gnvx0x7',
                version: 'du4kba5yh5pxwtwmja876',
                scenario: 'ted7lyhzncgsmypgtug67cfiwuekxhnrl3ev9fmo2xkba1uh45gitnhtlvz2',
                party: 'tu8fvopxlisy8c4kzv68kgkg1gcl40ro4i73woelpgysx5dnfufq2bcxe1r1xucm6g8fz79zgfau69i0sdw3hmzybxujee8h0xood1k4rq49bg2tbf8q7d4fcdsolcwyfyicynlujzpk7218cedv1d4vsdvqhwok',
                component: 'xe317uju5a9flpbzgyy7mvgdfks96bk4zv83iohq5sk60h6u69pz2cq1kfrfaf1vbdb3ld8lknydnomjyrom2ffplwej4ldd3keeenvpde9kkts22zvv4pgx3d75pms6cicd55q2qu497v92y6pwbsbsywq8q6h4',
                interfaceName: '91z0u3tc3ktgy3fzakbmnodksucbq84xi3wigfv858ynd6rigfnaus05wsytkvrs61fk0zd8suopr20l80p1k5a939ji30li7he495wg8vc64cw5uzuov19vxa4pciq08h70eo0m2aw06helux8mm92j5ysefhiv',
                interfaceNamespace: 'o9etjrv4142d40ul8duktafl5nxky6xrolpq3ln5q48ilghszjyd4olf04r11vxzg31n51jkzrjk8ydzzyb2djpvrxiv8lgvmlxtbzk7xb4qeec63a7ij466mobnfayizcvrur63stou389mhn9cdlzuwaagqy5h',
                iflowName: 'itf8iqcf72lqxptfqp8ftlou47oix30lrudvb9cnzsny4jbigepvgqvsatn3psjvlmfnbq286bwj6kyx6plsp935pxfiuo3c9tyw57e3ag04v1rr6vuaktqupzdlx0r5r4a4jfpgo0eubg674wlwvdr5nejiunz3',
                responsibleUserAccount: 'pgq0t43wridww5n5gmce',
                lastChangeUserAccount: 'v28oy9y27p23ags9eyly',
                lastChangedAt: '2020-07-28 21:11:08',
                folderPath: 'a8fksw6fvh4m4clvmlfojref6uddfa7idxv1w4g0110gd4qxacm47ksyxsh9zljvn9t1o2p0twi7i4omtu1b90c4p8xscz10qoxiy8gxm0guddrs0zft2q5mogkqst01xyc2dyc6bj8qa311xcq9n9z8ddobj2634p1axz8q2gh0ucorqnaenr657e45xqd245yo3sxpn9fryoip6ssy5xp5wd68y6iotjmuhpgsgjg2pxgzc0t6pcqk0x0pkdo',
                description: 'v4114jhmyb3thk9iuqr2prl09leg8psz1qafc3icjw5vfw3azvfzbcloz68jtpfaaub29n90vjds27gxfwe376hvpyg353f7zlcyod5nd60n1kdqwhrs6gx2ohdpej4etvawo7n0hb2nvvv8f3lyqkhy94vd4udemke72rglvp7qvh228ioczim5m0lafgbcquqoaqp8rh4bcn7ru747b2gahw6zpqjkl9heff0kw57k8vzhds2a33uxxpy5xqo',
                application: 'xw3ez60klnhm2eoj9xubwft6dwmm4rihyw8r90zbk9epav4g2dqxj4h5qpis',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'm9aqqpjt0dj6gnf36lps76dujv6ozyepjtj5pnyv',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '1ix48i6w54ydcavifvd0llk56cenpjfrkfhh0njrqllilm7niv',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: '5j24ik1kdorj241bwo1y',
                version: 'c7ke3qfha8vgb5fxvbiy',
                scenario: 'wlm5jpkrmn136jrbxa74fzkb3gzw2me2jwsr8ujex8sorcalm6vh59ewiov3e',
                party: '7xkh6haop04xupg38tmrp5i95k09w229lhjos3ycrpg78475s4ciuy543qigenmwnpdswvx4edd12voyzp7a6geon1ibehswgwzf8g8jmzdqsrc74wmgul46dqzewtye7dwvou41wdi46p2xca9k65bthwk2ah6q',
                component: 'r5fg359b4vp4qqun1kofwisxysqx3hnv1kewxnsww4n3l2oh3hnw3qxgaeuxjm68rk0owfjm1czlhqy4wn0f8k2xxdshlw4ynw7bti3v5c11zq6f8w1n13lhkoom4iv3h3tr339pqxqaiq0jm0cxy252231sq8xi',
                interfaceName: 'boh1vusp03wavz6qh9jl5bcozqxxpn29d0dxjvoy3y7dwpy7x3j1022r4xbqd0oqii7gsid83u9j4thsgftamq226vdjn00eh8w57sgi5w9fugk8spulmmvpjjlcsqzbww35f55gvqgy87ngirzbfauduemy8kt9',
                interfaceNamespace: '6zyyx2j402cz3tb9z3b5770i9e2abkp89x92ikgjjs8mn4awzdlrte7ic32trj4omp733q878p0o3bst61iget7xhxl5xw03ga9zjdl8buu08uj20m70azjzghbwuj3rs5atsbf486orbgqakqtmy4ypo9hqhtyg',
                iflowName: '78u6bxi6gf2ydjrr2eu9gvpra75x7of8z39fajph9r1edtig51foqu51k902d7773h1spoy1tb6xisp88tvem2ykxx8lkdbqy5szmtkaquigriy793a7u4f9po6au2a3kwqlbg5ojtbuy88wrqt6kuo7j959wh40',
                responsibleUserAccount: 'k8z598bul313sdmgaifr',
                lastChangeUserAccount: '8hztyib8mkup9qs8lbyx',
                lastChangedAt: '2020-07-29 16:48:34',
                folderPath: 'nvhrezgjalkziogenajyq1iit005t5cqhr8mqg6d6f2b5z5cwnl1ri1wcmd9qaa68if76ue2gcs01akl6qohmmlejtxo6x05tbzq9w0o5w7bxggo25swvp89hvs4kawiyn6dluqpg91b4lpvu80bztdb5olo2g5rakatbbu944udyrzxyk7w0e0ix16qrlnqr1gdkwq516sml8jo3emvmfebpjc7rf43r1orpam6vie9rjt09u9jnlqb0mrf19a',
                description: '1vpiz3l6r5nuv9k8e04p8rp1bq785jp9c5390x10jxkitn5k6qjn80w52d7u5xbfjjnj90klymvhubjjie9v6yk46ol7cj9ry32oofkw1u4s0sgtnk2qcj14joxfsahc32x0lzffbvt942x9ww78728j3gdn5m4m897ks9j0bdvboa11zz8d3m1ysbz1n2dysh86gwmjc1x5xicdb06hbzu309m3nltv5w02v9bfv2n0swpgzerapiv7died1sw',
                application: 'y8qvk0lkyhjkavejlb1ckfivcr6lrscbldi96kv1rejmw1du54fmffy8461q',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '4thhz00iuqq9cpnj66xgp2q2z7lyzpq3fe1am04c',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'c7avan1d3j6ne6zvdz6ty0e5eptaigg3dw5o88tv1bpclh9v7w',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'mdke6gi4i7uq7w0hircl',
                version: 'g3jqjv1o9rnmqdhqz5wv',
                scenario: '2uhky7knwly2q0v1p4qq202wvo6ddi5vvmnjur3owak7gc28specny4zcie9',
                party: 'iezcqjm2h248fwakkiahjrr9nemd442mj8son82ry1t4x2apll8vzixldohe23ctcvlu54v2qkblb83b0tr29drj15norc52mcq36ko4hsii1iowwmw5m5mmx83qed3ro3k54ivxlxdags0hgufsagv2x4gufvvva',
                component: 'cokyhzvsv1jltiz0b1frqfvhrq81qj3roqgt9qa2uwlm9c0d4o2x3nv2u6q1j8uh58xattl87swstjgqiffuirbcq0medbn747uveztpf8hvru5rh5wed4wx88jdjh71cbjl3svahelimzxtbddxw446f6e6mw6k',
                interfaceName: 'dg7d6lcvyo06sr6szeh2lfuqrp51ql9myd5jx2t0kdcx0yumjsm5ape4fwc7n2y2e6nhglk72dnb6ruaieyiqlwcmo1p2vrjwp5utrrrgubpfkhlsmruyk867x4b02lm4d4gs7gvaceqjqgzqqf3bilvqmxf1ot2',
                interfaceNamespace: 'vfc6ueyylsml5nn7b3hmhbofjvl807c01jhd14usco6c17ubzyb5gb03pfhupil0w5sop1h7qqbsu1zcxloj2dvsn8s459yrg7i3nzuhada7cn16urg41hzpqqi0wknxjkx6dbysnabmhtk0biddbq3wwtpj8hqr',
                iflowName: 'q59x1w2qami9qp0x2rvnkjgentrqr0zyeyz9fg6q7yi5mjhuz5aa9jitsiit2n3gl3fqwpr98bq7jazrq0vnrya1sjxwqkpd2qfcdc9ab6qpibv0owrjhk1hybjotqjo94tozxc6skhgsa9tw5rz7ehvj3n4a4fv',
                responsibleUserAccount: 'sqw2lg9q0djgjmkf1zno',
                lastChangeUserAccount: 'juess50lgpjwjebt11p7',
                lastChangedAt: '2020-07-29 17:17:09',
                folderPath: 'qfnw0sbv7elhl5z72uqlptp6ev4phtnrtkbszwn7rf570p2o7oa5ovxgpnant0bs55vpn0do9exokrp3pzwgozgfdymvlb0w1cvmf2ekthef87sj3ai9g21y9zg3lecbppfyx1fdx77i2kj898puf8q17iv2gzotitlhz9ptwjvwgt2p58ib7bdo3lha1dv4er2g9fuz71axuv1467l1kwrqa9ydruu7fjl9rc4s42etgkptxoxgz7qhyj6dk0s',
                description: 'zhnwboitzhnjn0s5z2zeqorzwz3fj8n9g9b2htkovy2ker5wm194gg1t6u40vddh4709boqqr4yyri3mow656wy8ep6x27vyyz9tkb3w4ixv601dagwjqurwmwev32n114zb5l8sk9krei140a34c1ttiscvzq6i4kflm0jdywix6jnrmjx99lh5wj1oxs6srp1qmrcg9t3luhb1lzdh6n8cyp8bbr7j5kcnkammbrzknit5t8cc3wa59ty8m9r',
                application: '5xsfkl34k55xawkh9h4uw6dn3ufd0q2gkrfxwpg672yxo00raz6vqb0myer5',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'nmjsgi72fv068xlb3mfeu0xqwqzkhwfgxvt24k6n',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '5ebq2lxljc44n2pcn36704stpvtzahnoe9b0pjrws2jpmlz8eg',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'f776dgfk49mi9w89x4hs',
                version: 'dbicyq5xi1ejvcsuajkd',
                scenario: 'xc4dzgugpli94ik9gtmggcamh4wxuzousq7fqkt9u3dnsczwmmdavfvlbhqx',
                party: 'gee7n7xzlsxee9hahnmjccx78ukevkq5gnzye2km51fmuev50vp9bv0771im4f7sophoxo5mbcgt86tqa7ir4vu5vccann0414q1klr1yb4d31v52z5xbcm6j8qx15vdmnk2pdloj60itctjnjxhfrrm253mf2fe',
                component: 'dgeyazwctz4kgsezcffn42ranibpfie09null6znml3uimzm6k6z8pt6mo04opws5w03ei8ucb6kur4z7urpe4mqs22wgi2yoibp9jzmgw2oy1n3aks8s89n7dl6ggyfsn3nn4e4dwpvzbw6pde3qf25btktqtmwh',
                interfaceName: 'b91ti1kjauvlj4jjjza4zo4n24sns8cj8fthlp12nst4xovvcrxolxm2x3yrf7j4phawnudxj3f5rfulka41pely79kz8bwoi2fmcr0lfln11uc0cirawof6v7a3ds1j9vav8jn0o8rd1t9j6g81k24s0fow4mbi',
                interfaceNamespace: 'g8wpbh3wb7eej32obnxk2ktcx5rtshf8jmlda1u901rmv7c5rj9207r5g999hvnkjrwiuemvr53uv2ldierbduf4gd59tuz8ebf3ylarrpgai208ehvtwozaqtxuao7psju2t4ukj671z8l3bfm9jth1qyoqla8j',
                iflowName: 'yjqk116egf7k2w6y2wlxxnyuuzpadnq0o8admm6aw0yzebi30tcag3rjbxzasy13k7ec82vwgas5833bbdpvi2x6t32roxxu7h48waus85jygrwfnttl2vivt9vnm9spl3pk853cki7y22wmdgew6knte1802af7',
                responsibleUserAccount: 'dx6ulgiar5ttxv9axw59',
                lastChangeUserAccount: 'dsb2315o3k4batvildk9',
                lastChangedAt: '2020-07-29 05:40:52',
                folderPath: 'vavuxnp1yogz2dwedej898cccr6vjtd2mzad8hcayn4w257kt3j5068vdb3pb11hommy2222bur6mhurf4hgqb46s4nlmin5wwmguyw8i1ngf0txwj0mzr010uq1pel40j998vg2lz6l5goez4fzn6qezhco6nyz7souavg12c279c9iy5ez29gotdcojjuv4yeri2byxqm36t033pkibgycf06938pug3s7f277gex0poriwc9332wrw5i9ifv',
                description: 't5shj4lmihi9hr11ehuemvom1wop6xz2m72nm9f95q5n4tod84ctbbszrjoc7c2hi2x2bxur2r1huaw9wj4axbraiumoss3c7d0owuyev5mo4os5fgksuxrllmlitfhn6ukja7yo2hnw40x5pijdkgemsb6sx82hvnee8ang4bz7a17ir5qvjc1ml31lnz8k1nhr4weq4j0ubkf6ne96bhqk675aeq0dx3k8sr8x04i3trkxtef12zqybrkngqx',
                application: 'rcssf5ear9ohc4hwxh9zt86rpydktfpu7z8q2dj43ebwoyaza50z4s5ui95d',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'dw7kk7vmimqnmh7882aeftqj8hjwx9qefprytryj',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'sg7cczgk9ngduj9gijhx0in2esllcdq27i9ftjs5j2djzj1sqq',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'wjvy92ov4og6t0y41ffy',
                version: 'c3nv6uuila7rd7p0a7co',
                scenario: 'cwcwsmj1xc83cpk5b40mhrlkl7m0mychbmxh7f5rqllvtuc44vbbfayty6g4',
                party: 'q6kwuwf4z1iqxd8osc3z94s291fev683iovo6w97ennci3tiakvod22eprszsx1x7ouhxfin38g6zrr3oa0e8n51pk3pw2sl6ymy3a525wm50smyeoteoh5w67jixmqlzjwkpluxi82ybh8niqcy7qvtyw23zge8',
                component: 'x5hyjmunpy1owivy049exfkhwdu6vergkjqyz4ypb7897ie16cj8t4zt94tu33203i6vw4kokyqmdd7zm9wi3v9r2mlnahkpsz8msko0n0qbbwwueu50u77ebjyynupxrytq5vi25dlxwkang5l8ugpn7olwazox',
                interfaceName: 'n0otm3qj0j2wov3bnkb1mtq74wqmrdasl9v8hok07x4gtnyhylvhm60ngi15y2ai2f780kudkqgo6afsxp8pxknu34ip0g1esr1bagyez88sqqkhwikfvrlx275vxyrlgpdq55m1wtrn21vk6ycok85k6kwylaloq',
                interfaceNamespace: 'ikb9ggw8qhj50evu824umczc7ynlkuz3tipg2cgu7qp3csxojkwzq2nyjqv55r6yl3h15rb6mevlo80lmjnuqtevflyel5ckuyljvrr5bb39y7y0batee8zay3g5ne37bhhvkz29ixph8qat03i5qho6xf06yo6i',
                iflowName: 'y11bflz9fmrqhmhhfi25vz32iwr3g1t0jba5zf74nikaobkvf9jl3ucs1oln4da1mp9mruq5ymmem8rzx4mkqlwv2f5z8003lgktynlqccrnjghkws8gmmalfgao6527andixja8r60a8i51s2zpq3n23awlka14',
                responsibleUserAccount: 'oqp0kcwz8ghpje2i8cky',
                lastChangeUserAccount: 'lkfl7kghqs2gpa2bgr3g',
                lastChangedAt: '2020-07-29 07:30:48',
                folderPath: '16p1pt9xrup04zhs5spi89vwqxwzb207qb6whyzin39eert69v01h0nnbafp65v2t4g7gdvc7t33xpbwm53p4ovd4psne5oc5o3oplcsuj75ir3h9gxjcelckxjlbyabpo5cyk0mqjvt1chgmk62pe2r8tvq8zehdhduo54uzqk5hdp5bb7spomcard97rqaugjfv6a1wo7i1gg9pznlamsmx916i34dp9ce8gxzx609ppdu4ak381bek4wrg1x',
                description: '1cvy1bngx7iiucpd74955kby6wfai2tz3g1rufiv0q81gwqq70bixsc0tt4m7urr9gbeovbmu9mo5c2oeeze3qchgbzxsjzljdznbpeln40srf6ksvj0we7k7kymq7gbqy82x72rxidq0rc0gscloiliz7ppzs51y0qcqiibs3ehtlkqn6w2qg3i9henflbawzwld4cwh37onqyaewrhy1694g0xxkuqfetuvl2he0ovuipf09ifky3copsy8gz',
                application: 'r192c6u424v2nno833ie2yv6jqoexviwzuo0gw6y4grfzl4edp6pjxw769mb',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'clitghcl31s6mz5ozvr28eaf614828atwe1bvsvb',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'vt53wb26djzvfwbiowbq0dxf3fwdybg46ddohupv4jsyd4ya00',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: '0ctda3qm5rnjo2ov5qd0',
                version: 'ahsp9l0jbheel5wme0uc',
                scenario: '3pm4mr9ysusn1o0p2t5u5mlnz4zfmgm1ygxo2r4vjspotl5kkds3ofeij1fs',
                party: 'u9isbsa9m0hj1t6u6oqexmufbxm0fsobozvgb3mkcn06b5l3whan6zp1d6qm8salredn525mp86rwruy6auc836z0bhvsik584bfmvyww0gwptxj7xeezoqicsw8ohtkhm9pq2pow2q5jehr44ppmk1ikmicvfaj',
                component: 'rnx9es7pa533efpslta9zunilkoze885kab3h2d6ahgi43y3u1sz7zp3klh15b5tnvqhm2waqcb89ej4sf7206s5253mqqqolhxcn7qf4b4noy7sohexh4sdkpbdsd0qu1qep0p0eypblx0zh45qh7oleh7ovs05',
                interfaceName: 'kxprq0nxg5m5ytapofpfsl7q87v77f9zl2jomyvcvejh6xxl7xpadvafycct03iakuozciwajpau4e0td8ycee8a4ninyl3rd27brjl2m4etyj7w4vgqfm7ygqgw4k3nwpuei05cdp9nua1wniaxie7iytpk8rgc',
                interfaceNamespace: 'ewy75qs83n1j9btoboo8z8kfj78dmkn5of83b2bl6ofqfj75lhlzofajmo5c2j5sn4af7z209vnlte0v5g8c7i915mawfwj5njuzmom5rk8mlzasqnwmi5utetb23ldtux04kw3uhvck23zzhoi4lazwumaxukrjx',
                iflowName: '1rewo3iar9bb8avyk8zgq2k0odlwwuzbjubu3omuedddtfug3yjhrzu0n5u9gxqbg61d4f2zt11t4u8s3iz5zre6j988h9tahmdmd8e2wijspk0qdhzyoam690eyqk6syedaysvrtljyackqwyx90bbym0l2st5y',
                responsibleUserAccount: 'oroeweiiw5ccafh495zr',
                lastChangeUserAccount: '4swp267vzx156sg6msw2',
                lastChangedAt: '2020-07-29 03:36:14',
                folderPath: 'npz3ikz4erqlksm0apn4fm1aczbchcvppf4385q4or943ucmfv2dan1alsc5ne56d3j55rwch5bik520ynxce3zko222q77cfong8k1are7bpmobcsyl4cvo908lpxawibktwj8l62ejojicpnn56qk0p8f3hklmu3ffvcoot2dja18j437k2z7kjild69og90y5gbyzve3em2kpi7ykex1uji2wpyuitvw5eff50af26fn2zfi1f7u532q1pct',
                description: 'n9n3pjkpfqgfqvmrjvwe3m6btmswoywdyn6522t2j7lds9svcfm83yxhrfgaxxozk3raplq5gvcevy6eqnxjpbuxul9rif1tnqs48c6zfiq4f3w1irih962keigtjjtd1wmf9z6evh3fwsqcv3euswnpfruiwolyez85rgtdhkt9mg43tw3sh4d1x96hg5aho6b8bm01rwokf3tdxjjv4655oa3v9p5q2zv1zt4c0obnld33hkhsmqknsphqqdd',
                application: '3aqo7dhw0c9xxdn3jlw9llezx8tkqisdmclwjrofythqzd3zlq1xef81mooj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '14mhu3mtd15mfd8ttj3p7s01cwgfw7w829oefbvc',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '1xwfa42p47wsadt54qw37pwtoagljabrc9i016rp8po3uwhefj',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: '9qyoshgho86f18mu5abe',
                version: 'fttqt44lfw380vko0k77',
                scenario: 'njfsqysy81aunz8wvk8164jvmp7y4wj35y4usymuqgykcy74euvjp2ikpx93',
                party: 'pcvwf5qykoxk6m27si6gww6fyxsurdup3sj80l89nbxjg5zq81e3993rnpk6wv33x0dz26lsnlxi49ilmey74pavm1aopf6tsouonqdsqco5jzjwlbiuq7d6aifhgetstl71rvbxovm8x8zaxum3odr5i3uu3c8g',
                component: '44n5rbedy03u3s7dhglf5uq7o6jyi3ppth159ujca5aacsmc6yk0t04t35982f6jjzii6mjj8vtweyr5k1zr7ssd7lxyfhgob1wcwlhwz437axe9387fehuqa3gvywj0d64y6ofnwx135mynp6s71lyys1871hk1',
                interfaceName: '2ugq9zgievjmc3kilvkrsg3s0x6dtwibv5oguq0dvc5to2pm42uz690lf9wzxk271cm2malrpxkrg4a9w1028zfruh2bpcnuh3r5rohv4frstqv0gspa6cf67i9blcu4ooe5iywrmwlzk2pfq3atp1hz4akvjt67',
                interfaceNamespace: '3mf3yhze8jhozcl1z7tvcxcwddj4xasop7v3hbfyxczh2v85g60x7n1tpvjqf4t2h8zch8twmh85mx2myigchqxeczcp5yr2eo6fi3c3k0w8ty850146kysi4z38jynaz1ay46yx6eufg930l6ahknw0dpbilqo1',
                iflowName: '938bjz5e9zmvt2403n6j1g8jmpkhwswucmsd9ihtg91cinm62dfs1hre1uxvex2r9k04foaerr9o4zwr4gxw41wr8u0cpyb3kcpy5fc4tbkcaknqqtmcjjex8d6zjbfh1ie5y2f0w1pt8t27of21hzjnb6ipgt5ac',
                responsibleUserAccount: '4a3u57ybbxgz6qtoc3fu',
                lastChangeUserAccount: 'pfacwh4iih4r0gg1lkxv',
                lastChangedAt: '2020-07-29 12:59:28',
                folderPath: 'rl8t0otf4jnr1mikg9awwaxj62isntgni7zurlsjubp0qd95y0n38ro9vqkl5xokt922cnjc5dk7w0fnnqvyn8umuzwxd50yw8h6obpgb2aguut9xptb6zh1bv5dkb8v20j1j6rnfx674kzq42eukkadkpwz0kar7y2d539ijegnoeacrwk5i9ak138uygymynyp7dsw0vfwz7ozqt56msbtmn7wixdyv1te8bg088kwhs1fpi0v74st9vlf5m6',
                description: '0srmq6s7yo28k68gbbcta1jn9dtmde0gqasb2v4e1h8jndobrs3q146yknrgrg6vp66mg4vwcmntr1b4mr3bf32hyjrrovnojotizno0tvzp3usp6eapfeecl5ei6gw805ggsi53ll3ei4kc3yjkut8sflxlq784xfhkhnm8umjez19tja0ujf2114pvi7mgi0gz86b8l8udfvswt3rnrlfswlv2bmh0rohnc2hqxg12pcieufsb6l1goqbuula',
                application: 'f7wfq0jo3dlxbukyk6vkzk060mmy53c7f6dx41pc5hkctdi3i1lhtec3d47n',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'fkbudb5g1dlof1mwbcgcgk0fi3zf0eyq5o6h6xdw',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 't03lm0g0420lpmtb4m5858qv9cosij7vssviwvvp3jn4xh151l',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'bhe5qdvfr7083qwmaz1d',
                version: 'rj8qbee37pmonvqknz62',
                scenario: '2h3t98ese7ehfcf0midqqhoe0teo6gevbn74atwvj5pi23tvv3dzwzz4tcfu',
                party: 'mndhbyqf0rphma484q7fvyys8uml5g6hxhidp18gjkak7mw3332ogqqb9bh69d99wzcysnoy7f3zw8l0u55qzd7pz3ph7k0qjpw9z6ii0c9ovp1g9imjtaybuupddkho6rhn3k275bzh8oks3j3a6frzaa18xo0s',
                component: 'ze6eej43g6vp4rzq9wf7z3zozjrcl9wf2mb8zmss6yjuodkwi2bais3zfgjivs73z7pmeu7el1exmctsqr1zcfd12t29uzldr7creanwide95xh0pisxa1b773wuuxqt2icjommngukhtzebtj5ysi5uf3uan1bm',
                interfaceName: 'rsjb9pz3uqevy9khi80z47zzljy6555do2e1xq5qup4nxg4z1s5gub08f4jwe7qcup6lpvfhlpgfc75400g8awgzwysw0toxh2ihzhp3zj98cu4hznnn6keod60to2nqwp6g6xmlnd31g1gdvitcgyimn6g22o56',
                interfaceNamespace: 'un1xd07wb7t5y4o7a09faq1w3clnwmxzz9ps4qnpymzpnm0rzuiy6o4p2xhxziyq2hmx3ao8ciq42gi0gjsu0hlxmj66x9e7y97ogk7k4lc4989q11w8l8kz49w3sdixu2onljynkgpkuyklqj5nygheazv31mkd',
                iflowName: '7ksaxg5ssw67xhfavm2b68guab5m2vnk0sc2yeh6g2jove7amdumhw4s5j9y8hgjiu1feexn9b92p4f5lj65ykcjgw68ilcm7z30cftpyqzrbrtx54bmtmwnisrygi6d4y2465dmme75yywm39t2i6uyhulajeet',
                responsibleUserAccount: 'e3kxkjo7if9pfuxlzij26',
                lastChangeUserAccount: 'opfyegn649hcjo1ejnf1',
                lastChangedAt: '2020-07-28 22:12:06',
                folderPath: 'jxqztv7ytroz8wbj9msqahcqm6vc0yol021o1r1fe14pc0buezuga47pbj66qgm74wzy8dkcx1qeiz2muw8j5byenx2sa65q5nd5hx34hlv1xyyannqwvczi2mfhv5qchfc503n4vb3elc4o2x3t91j9a1dhskvp1ri5sedt4er8o01uxd9340638z2vnqrczpe47b1p299xzcgr7ptxnam6333b0trvr1lbaibhhbzxn89y296yi4i7dmz2dt5',
                description: 'uxt1eubg5t3grcm82exfra2odtp372av85lgiq4fl7xysyn40rqvj72g2qagr99or4zt2zraip6gia563xf3t1rg6k82n0f73aylbxp5tdf66ua4mc35quac1xu8k8sclnorillx5yychgp6u2l625gjd19j02pc05t7umvp5l0ph0cp12jta6t39wctbu2s1lsiio30wwnhzgyw2o5yr8kusj3exbna6flos1e7hp6775vmjyhx59195asj9lf',
                application: 'xm7ilxkkjc5f6mvn1nwrbm4dz8cf0wrwgmvr4r2h1xprvu6pqslzxb2pbjck',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'ng935di39rtfwtu7rug8z52g0sctenwr413k62b1',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'dcx9fn25tfp2epffk1jkvfq9s88q22j8d8eqk85r2n1d3y3x19',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'cydgm2wxzg3a5v8filv7',
                version: 'bzvb9ax3gdsdz6u00y3r',
                scenario: 'hxjzxdnba26ovt19ooskb1gix85sbgvbyrlnucrqn8s8ffuilgou4t1ns732',
                party: 'chhaf88acnn0chi9bw6w8ok6a38sdhalko9pxbc1rwglrcin8kwwwpsciaa5mkjdr5q5tkcqtvxzuapp7lhu081rko05zmutjsy0qen6d7t9ehu2jut54eer17y86arh7knhwpfu83p86br0esxmukh8ey64g3vc',
                component: '7mpet6mh1su38ccstbw1cehszom2o70qi6p4f5eenap2649q1dk0onsc5879vpivxd8u850etyzm3k0d2q17n3jg7m9prirchgudbuje1yisshypsmfjad5twcy51906zvm95wbn4gwrl317ehuhxp25ohmsmq6u',
                interfaceName: 'wbga07zpryh2vf1albbhi58wx2fj22pnqn0j5tnedgoug81tf7wyoppp6cijob4tczdwq6dole7ke7lglzwsmq3tp29wgizg5yl04galzk2iq6fktmo65eg05zknzi1zgovaamoxxd0irp8qsxplfx7xn041cg8r',
                interfaceNamespace: '5qllc2r8kg5nl9nynndfxbnyhw9f7nqqq19s52h2f7hx4396uoacjxh6yhzw9tc4rr0jn2yzj7784yw370zet22biw1a39zmbdbvvxiedf123na41gt96nxfu9go1ku9sx5lhfdbh7slxmqd3nxxpus1uhoqlfoj',
                iflowName: '4ea6a6ae28fihm79x3lpw6kgflvyjkgn2nhi4ax8a85or8mgiww08msllkyej9m1gd2pc2b9fio2qyb26yh1nlmb554t6q2n3kn6v6ghbwr1vzv9d316otqc14wknru1hd17e737wstt15x87gmylpv1ng351peu',
                responsibleUserAccount: 'zydky7zdxssnvseczejw',
                lastChangeUserAccount: 'ljb37949018nejx448ska',
                lastChangedAt: '2020-07-28 21:49:12',
                folderPath: 'psgxnuqybvc7tmerw1x6luh136zh81tngfbhi2yjb6ag6p7b7rnb03wsscubhbd4ixgkxrmpbjhi63l6ta27zh3uxg4czeo2v9pdtloosu7n3shsd6xnvfo8miggayu3n9cs2a0qe853f71vp1pzndpt6uwtg9m3m8qq0mvgtn30e9cyirp2ixsrk5g4x9g8eqeb6crcka8h0n0kpjdtprtqj9wsyj0rmqkrim1xe8bv53myqehwkfwd92e8wxn',
                description: '6gziznio4m4277xga0ahas7pyp31km1gqqbvddg80zn94bvut1ppneftsba65qkjuoit4bkrt0fntwxa26wwpo3qho3arch9gwtni99ub1q8446vh4cchfgqlhppypwrbeh1nato2vlppoa3az4jex28cvgevd74yre7n5gbb7as8yu6kzc75s70gw791fdyhldhzs75835xowm8oaw4vs9tm9u05e4hjvxw58mm662cdozhdbqi3xjea2t6076',
                application: '3w9im2z0c7b14389f04n1snswa67q2atcka1mi7abrd7lo8soxqqcc52ayqi',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'gt0d1ybw61rjo3foutts5hezmy4dmz8dxqnskz68',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '59zwa93qw4ksyjzcp0opmanx90wfwq55eu0hq21et40q7tlja6',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'fc1lcl2qqtq5k11o0vjl',
                version: 'm9fnqvvct5ux0t9b6krt',
                scenario: 'vhduu844yo6w6l8wpxnr1238za5hww8cyalt0v6hek8692y8gx3sj2qcyiyx',
                party: 'q1d7wkx3eu6z86y3bvirabfbtnmi11emo2zj0ppwtmpaaofj3hh27jjkuivyhydzwszszgxkbp2zoxl659aaxotfju7atrwcwi9mmsidyuzklqsarg0w5srqtk80f0v4ypbv4gr6wewwb6sel7fy8fi223obo7fs',
                component: 't5a8i6nshgegr8ti74kom2hdd3wvn0jgzk3nhu19y7jtptj5oj94s8mtp5ew9oyp7rxz25fj3shxejslrybq15jl8zfk1pmrbfpt262rwwca3iy6bzunt17364ruz3b5nqyvrhpt86wz8g3jn2h07nk3l4y6v0ba',
                interfaceName: '2hg1707ckn4oy2jjvr9wv01za9atp2fexl5fyalknoxffsfoaeve6uwvmazes3fzeghqjpyskhnxcuevttjfxzn238vxl2kandljzwslzszlgwqseflh88mp4bh7gtro1oiv1xc2o5zflec6iikqy7kkvuhvlhei',
                interfaceNamespace: 'xveffztvtvb5b1m1q3azvah91qhowx8izw67pu1r6n0l6vboixcgutywxsqfxvheakkez7v85670tk9qzm08k7wct57yb41kr0eam2rb5hh427a751xr7gefzvmnnqh82sad241j6wspx5u2umvl4jec78m0ftfl',
                iflowName: 'o5r04bcfzpjrpjpmz6fng7lqtf03rilvjdwyn57qyezy0p90dugfaqafrhh3005dxntsecglzd13y6i9v521wfhrjgyn136af7gh848ik8m5046fs23fh0qdbqfaq0xe6m1igfxd9ptk5u5pucrwv3pmyhq4fq4g',
                responsibleUserAccount: '26y2ej3dj5irjeqp7ow8',
                lastChangeUserAccount: 'wzgieobvk2p5v37l35h0',
                lastChangedAt: '2020-07-29 12:53:38',
                folderPath: 'gu6iw65412hoshsvim1zcnvea89mjb8dgehg8k1190iyk5tp7yme4akhtctb9e57ea1n7dc01blb8yxk3kefa3quo5evcm0adi738gfz30hl6li0fk3hy5xe9o0g58gkqz8r40m82w1anlid8rj6loleorooh8irsaseeiei3owxnsnql85tl68mp3m17ukq3l5pe753iw2o9syfhwz28phrlrksdsdoy2fkbzheqrajcbp3wt8cv3fic6g4f3pg',
                description: '7rz8j7agbxrah0olkqm7y4fb8j8b9xx8o3mbcior0b1y14ed85850g0ucazij26l6ajnhn9aiigiqsobswu4gzobmpcqv9syyuw23wlyvzuehzuwakxcmwjsh6fd2ku18zqgm2xvekuke5mz5uxp8paxselufy3o6vu41c0j6ia7k2clu2dzh41oaqnjknqlvr6a0higvrmzrjzamehza7sowwrl390ivl0blycvm9uwisibxb5668z5x4jkxhq',
                application: 'xt0o47bzgm46a4a1bd93wi24eixdjop1h7c4auuwhvyy4ldyblsmhx32udrj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'ew4pza8ojjulvtvn6ihhlwrwxu7w1vr87lrggji1',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '1rpx9viwcuaxm93hhtrsusyqb0zpjkza0xsrkutic6l5kv5rj7',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'h5gzmp9g9cqsi7d6dpft',
                version: 'o77zqh3xkiotlz0uqc8r',
                scenario: '212s4e8u088tz762bx3bmjg0u0vcbbc04jtcvjb9z5hmrdm32akpz02dq169',
                party: 'cz8g3hq41wwt42tqwrp4muabw59d3a2a2njrdk721tq1qriellzcxs1v3tmr15utdblnk93r3brgldwz4wsn5dwxipppjl34344yorhd6ugn0zotu5tkf0deote07dcm4wwbi9oz30zwn2086hwapxg3hyg4s13d',
                component: 'xmgmu5bnto6dyi22y8osyqfmo84j6puczf019kk2nyx4he1xlkfrzmpewcvzjr8x2gn5b1qiw7g1unt4rowjigi624cuueek4fegvqup6u3pgmcolq057i1wljh8mmhvo8vye7jd1mcnv6z80oo559zy7txyb76u',
                interfaceName: '1m02ycqz0ig8lzj3vrgekd4k8eno1ma5h7cbajjucq5griugar9q0cbkuc41cg91tw6xhs4zh4f8t2v76btq6wyv8xpsfcny8a9rid74uw6mdgqyf5uova27kgxjjlsp12njfb7bsxbwq6n94uqnbmd79c9rbs7r',
                interfaceNamespace: '02h53n6zg8qn1k5hbb7zkq76yg342gjwsdhs24z2hy5nwah23fiogcrfc4izyu1vskpgpvc0bc3955gf97nnbi9v56ro3orwillx5eehlt53dfjmlbagptrzmjiusuyre4dl6oisen5ll6uk04gd0nv1ebs2pwjv',
                iflowName: 'uoehrjwblof5lb47k23a8d9p2fd02m5zlonaemi0714d3tg7ojz1mpvvwhqtey45suve60t5o78wrilwa4zsryjbm7327hih6y31oed7ccsi192vg3b863x82tnb29j8tfeqs418d8cpblodu03mf7y8w3ym2luh',
                responsibleUserAccount: '92g7biosjlledwwli38k',
                lastChangeUserAccount: 'xe1hxkde34gkpiim19kw',
                lastChangedAt: '2020-07-29 07:00:01',
                folderPath: 'w2dwv9c17k1llh2u3vh2fpr35k1cazmul730smw0aj0thuq742qemehp1lwdu5fkylpidxpd8rg46vgisirxhp4b452sijdmhln78agx1tbivf6uqxe0hceobm9vv83o8vvv71hd6esida3aa15ijujye3mm48aow9eeysbjuzvr6586hbmbno92rtjsutsm0xzjdys2voqhd6rryxr7ggtp0riqnupa6ockpcxe6h2jchw4qf9028xg4xzf9ht',
                description: 'x5jasrbbyq6nvk9r8g2t7srda1kzolf8u9yketyd6cwfq6nsgkwdpg8sqz6zj6qd8jqz6yu7d2mbgueemm06nwdpckj7of75ap5igtu0xeulodlcf3uf7a6kk1vglqj5xpsl93al07d9risajbhsqmdsmxti6jo2s9mkxpyj55cxfxth456gw3fo2hc700eknbhh0ibw0gnhrrkttgqyzantnnkqrcnqun389lb4jlkjurmrjk6nbmbpfr9c3rsc',
                application: '4bi2s2leophg9hazdpni555md0gw1mddk4zgabqo8r4p13q4dezxkty0y0m0',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'tqu7mrnnkcvej1u74udpj5opbojllvcb1hno2vsh',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'nrnkcbm2y3lw45btm0s401jg8mnakt36q21ufl2a9m7lh1fyu7',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'i0schfj968ry908x1tr4',
                version: 'zqk9g10kv5lpnrmt58ar',
                scenario: '81y0rzykcgxgcipjd8cl4utke6xdrq08h7lpsedyl361e82futhhlxbldb45',
                party: 'spa08iqjq53r4qf65yrgprrenblwovtqhxhofx5b4bfkk148cn7zzd8hbjvxz0y3fgzl3kml78qwrldpm35q2v2e5htlgf66ql4tb6e2ldd8ixdagil4lsn7ob7w0ne9xa9mqdb8x4o5a8lhgvmmpqg4q7a6s9jo',
                component: 'bskwljywd182pvq7t9jrks85w64q3ajt3dc2dnuiqeajuyv1raqp6vxe2figtjwh7hpqv4vflf36oqxylk9wryhb04y7ncjvn5zsilhaodrzuw7s9wygzy0yn8a2drqe3bedxgsggzi2dd79lej9n89qjrtqzet8',
                interfaceName: '6adptm67kpuf0nraimxptggkqqxlqefghpyf2e9vmzd7xhl1c14mhy3rgxip8il8d8pzsxw7gzivxfl8k1kuipaqnhjp3cs6pyvclsw0zpchq6z3ka8b6dyn5ibryi5mpt322e5es3cizn9qmgnt5rnpv27a56j2',
                interfaceNamespace: 'smg85sz809thb0jkxx4ogmh61usx4dnkljam0iklupj1iexrtuzb3ztoom80h8b9o7m25zduyzjbq56ypes0e520gizk055b1tmtfi7ywlwlfdnfwxeguajuogok99tad1yqahdi8moa9eozo4o2perepq2q34e6',
                iflowName: 'wxfzdcqjqq0x7gns9kp4zsycv93md6lgz85enaans91ejt5g216sddy9obfe13tae8peiw1nf1fv8hiw5kczn3arsyt2gh5ts5fxaupymquikv5as075mosq677ysj4m9henbepe8qure27ws403l769ooxkk1kj',
                responsibleUserAccount: 'dt9kbsdqo9tkdw65iyy5',
                lastChangeUserAccount: 'g1m90z806ix2d0nkbf8g',
                lastChangedAt: '2020-07-29 05:46:55',
                folderPath: '2b5czo0rfzo75nxzanzbdu1nsbnmjqq5x16x9zeed0n9wpnd41qj7l5jux3igblqez3xmxzf50dlsjsui0jyucfscifb7hf2jo23t48k1qgu26eolmsgqjl847tragvsarugmzarxba2ih6xohtldqm5sydcldriz3d4p2vefjq4eeqgk6yenxgxhwr7a4crqse0ig2srdsb43o1evrwm8732ljtphebl9a01i2fcbuzjrb0kx2cupn4fgaiivp',
                description: '4fnusedih7vmq9z8618ka8bm6czryx4gki5jjd3vcws1aov8ion4fmfb0kz4o0o9f0pklfoha383qt4086461opkvabmj5v4vxhcgp5733bm5m074950xliclaalotq6to6hoomhaoyfyf5soht04lwmfxtgwlvy8eqjhkgp7kiplx1tiwg126swas88muqdkih6deaxv1td6rbann8jtotuwr8c6eaxw4fiy8fqvweu9yf293hazzveqztcn50',
                application: 'wwje9kg3hlul0wwg2t4wr3v4dbiyj76qm6g5o1l442iod1by7vhkw6jchfs5b',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'agw9ydp3exvd7rowhbpr059bmtbp1hqi4m18kg1z',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'o3pu6gerdu06l9vxzndwbldd08gc77p8ck51zi7700z581ourn',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'pw0y6tsx2dp8wc02snxa',
                version: '8882zq11rmlzu3jwcxic',
                scenario: 'rk3u1dzwg7vdcn0v1gbxe75xabb7yhm1sy9hi6p4hmf2ikn2w0odzfandh9q',
                party: 'yqz8lag0dj9tdxjd9a9m718w0aaotz01ejcvuhhp48h8kflwk9tmgyan19ruimadbx2uqwth20g0t920v2zulias1r3ubho9p1ytaqtvtzdrye000lepal05z0t7l11xjw1a79lvexjn8g7237aea4glyfzuoeyl',
                component: '1vgipvhf7h7qqer5hg7aav3cy1s0n9eazoxik1hfgn38hvhi3k4sk82658176kwhh2644x9buydegcfjz0nstwyur1o577wk3flmrzcnve4y79vfsna6hlkkmwxmv2ueup1ruta7adl2mahuvubktrpk8f9reszu',
                interfaceName: '9wq443ums4234oihig53gcyyk8vtikn3y6nocf8bid0rq2gnql6ytfoht5joyge2mw9janq4srn10ij7m785686jr4yltc8gimudpe0vg93fknaq0u93bmcfkok2kw5umbr573qqystuw8bz9yezmtzity4hrx5z',
                interfaceNamespace: 'mb7b8w40sip5g05pzvn6k6lw885rcibrvs12gadn2kfk1tma6djcsttwfmcli6pzmcp1kd48z7adhooov6j3t58o1ocsoy8c944yuyaxcuxkig76k4e61hbnaqidhfqdchndym4no1dy4iy7snderaxnny1zvy7s',
                iflowName: 'ff58xuak3syjmvmsy7djijrg56pbz4zad8xjc80siydmc8wrqxvmjm9k19x85cvd2qpmcibsa674f9a1p2zi2zi2k7f10redhyzmnv2fhkcidbdiekfol31dwsw3aljc6xvglga4p4yho119iz2cznxbdnq61vtr',
                responsibleUserAccount: 'ubenjd0q5lpamtzxs4ka',
                lastChangeUserAccount: '71d1rzlw9hbthtryi9mv',
                lastChangedAt: '2020-07-29 12:41:08',
                folderPath: 'bjzz5cuvx21byeg3vkgbp49c3gtzlantcrhmuhq3mf5kq2ny757m1e5zl09ht0jw0sosydl3w3njilyju7ns9wl35eokkoqff4wb599mt3w9qzrvw0ofqjwxu4da81t0nhxt6xls614egt1pst0obd6w842iubdvswbihtya02nwvrv3gv5r0u0sxe80kkobnsckl4hhxk8s3k6hsz3ssje5b7v2qqrfimdvz7f6aksyxelyvohbo8og380srpa',
                description: 'dayv8y7ps8fgm6pv5ussuprw62u4za2zvlkzkehrsk6yqhd09nn4swut3deb6b9049p3nv95g7fzvhok1mrfb6bby9ik8cpm4hw7rxq6criflci5o9tvrg3kt9yq6jq0neme1ggujerod7fm6wqxx0q5lcb0ihd0b6lmgr4w551wdu6bi1140zspgl1q1vpv9q2rt65ilccqtyj4rfdqh3bkecqxvnagqo5nwhcuzm8afvf4cbzmx2jf846llcr',
                application: '7pdwz46rk2m19x95i5khevrdglqfb9tavlks0ahmlmiuk3eomt798inf8k9s',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '1hb7u7rucudw0f2udzwv00r9212jph5szgywxxfn',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'qgnoohokhcwnscin4dous8xhwoz2qlw3mqfkvtd5qbwzai9ssw',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: '30sx08huranaf1o8yonp',
                version: 'k3afezclpxqnzkogw8al',
                scenario: 'dvqlicja0i1y5302ps8rimraz7985rmszy0zmaeii1qtokpdmlo7e2yzf6gg',
                party: 'hjonfefh2ap0lni47lagxvjl5vw1v7gmh3np2cp2zcr79ovym83sqqfzhps6rkzqdlke513ybeuolsu9r86mftet2x4txh8qmyiride89niaog85rzthul57js77o61bsisn260hbqlh8z8yea2o3k4dy9gxakgx',
                component: 'uvz3rsv2ddbd581h6d6bndnumywrjdit37sr48x4nlz73nqiwiz4slkzku5sq45oixgcqngvc1bxk3z7nvpl7hxr1y2roipps65uo2uhzsopyxapxpsazmwoj5h8aco1dq1269offbf85cdjq8gu05vy159p53xv',
                interfaceName: '4cqu6fy2yrcfvhs354yvop74iwpys0ge7tz8x9p3lxdg121gq6xk39dz82d100b21p0xi12yp7fszuqdpg6nfd6pl4hvltybzahibqcvh7bodubing7wowc3yd210ap15h6mtn9hsfx31byxeq4jlj2aed7q97gv',
                interfaceNamespace: '3j4c6hyd9dq0aw3o33ioak93ff3sl4zl5l4t3f3zvr98bxosqjas78qbfqnqc3tk5j580zuz7of15shtae46zzejgbskqlq5hchmrr3liwe33ehv219kvai5fl5md43637n4jymbkte87xoh9il98uxwm2tr3rkx',
                iflowName: 'hwgocf215lv16z6tlsc2r7tg8h6y92a9ewyyem8b1rtg9absuzoe56zk33997hkgganleydmeovp5txvyn6swdh76yxmq88q2h5xxlp9um3jj8uchuw1dw0vof1gynbjuvjhkzjpptdhqengwkwmcdc74i424zz9',
                responsibleUserAccount: 'l0r10b5zessov04sd4nu',
                lastChangeUserAccount: '0l4mt5r5naypcvujgrfc',
                lastChangedAt: '2020-07-29 01:35:59',
                folderPath: '7q0wylod8z28yas6z07t1x3kd4gad7q44ffey0d2pm23t7nq6gszf4i4jxe3epcs35yz30fqf2by9euti4kgjamjhdja6gcfizqj8a4j1yllqsusclb1h68cyj62a7pf01bebf51p8db8ue6czwc19iz52n8d4jb9ovcig4e0tvhuj2ygg8d57owd9rhfqirros8p2goqmmiovdow74w7e06y4pp72svi5zjwgursujkr97du6pa802z31rxkaq',
                description: '2qbai0cpalszbedvy6o12rwn9a4xmbqg1nu93gk6suqz0xx3v77t2wy9bcfqt1vhaq9yj1wuj7qdhvfnbmp0kuavlshp97j5yaq1rhmnptxbmqid2z03qlxd6u5tem9tjhnz0luuvyv3t1rvc1jkwisjq8i6klbljgmdh3rk1d4r87ddbfb1kx5jpulukx7g9r2hlbhsm3tjidkej4868mnn559kt0l99yia4i13rg9bl64kxes7tr018vf5nsd',
                application: 'qpqfezyw073i3yqovg9g65tsxjtadd34w8uniofzjepqrszrx9olfifxsxua',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '2gvrasgyimyy6iqkdr34dq5ak2nrsahfvdotbj49',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'auglj5ppzw99ibxt0b1eddxtnn143fn24gxhs4o1y1iqawn803',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: '3qtiym8wjjk32a4inixt',
                version: '6l9sexekfwfe53nfndqd',
                scenario: '8xz2n59cebgtyu3rsp1rwu0x8epa7t8o6eeptxi5wucsop39d8xdi3r4c6q5',
                party: 'ofxki1dfvzytvo35zq876amtuiv5i1a8k6a9z8uahp3spvxs9sa78be6kfbski1uoads7o48vle8owxzs09rf7n4fvyss65iip64qx9lrwdcj07r0qszza0u9tlpw7u3b47q0yq59v2yw20srfqgbb4gvn4w0ls3',
                component: 'nn6ld8tyrh6e1cndwy7u9emvu0ovgfdx7yynk7css90avaggcuad9kyl9iate2mj4w6bja72ri9ouynapojtbfa2554exqy7a7twyke1ykysjjnmh3phpw8yj2l21bfaw0yisydclvoaj40jixoayghbo57u6od5',
                interfaceName: 'zdqoz9ogdwc2dg1lge6uldckvp742sl5xuybqdyrod6alkwq4k8kumztalncugiryfqogj21vbptgyvjhowi34on95j81l2u0d9l730t5lbn8rv1x7sf1mazmv520r4e1ga6ikmckoccxw5k6gl6qi310t3psqn6',
                interfaceNamespace: 'k7f4rmdk3u9ebf9ec56v5g6wz5k6u6jiookyv1itum6b72e6r8v0azkkwi2wmjcr73g8pohvverqog28jzsoqwtrd8w3z691woghphrygz2tr3wg4dev2brbdttk76gwnkvt7lf11tdseiez65ay4fnggw82g9be',
                iflowName: 'iv98fvle7a3g4rlaao14kfshwpk0enskth3wd3oanaqxrblidrfqhqdcl4u2gnuc7q12vk76tsoqnd59pj1fxozkz2utf9lnflau1rvrw1vqhkn6b3gj4wokq74i8dv4mfv6nfuekshvf8lrodsr4958w9junlmy',
                responsibleUserAccount: 'z6w9s8uloj5vudglzr7x',
                lastChangeUserAccount: 'f2c5ywc0slalln0eg39p',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'y67v8t73y2kcfnkcpvmq2ntuoorvz37lru7sbj5p4uzepfqx1otrgzwz11l1cj06ysf9ju1rpyi65286o2yj6u1kfbjryxmavdlhgw9ftjyes9p0p8ujk5cwa0sapkbgm0r778t8hc3xp96h7dapjlthko8uwfperazydjuf3dg89s19rhses1o3sa0egf84ic75bbrqw5aj95f14uzkgoge5fsb8zsk323tugcsjai1q6dkie1fmnbjof1jhrf',
                description: 'ikgrnu48mc8avyu39q9k0ylic7gpewxz10tt2lnae47uzqz8fyay3j0xwu6h61iz1kfigod7uvwlm93lew5bc05dywqje2m6qvxzt1qyegcf2y86iiqftx7mk1owaagwf6yruapyfzpi9zszlvsf1wao2nur3jg2p9svwadp8y6ns7jjhnnygw4it6y4p1t5rahqdd0yro8qd8lkgys1hf0miq3n5y5qo1z9uoh3375u59oqzh667og5qs8swtn',
                application: '9v28bw7bmbs6iqntnd2hug1ecv5k81en9xc637sp5app2lij3zoo52cqeh3m',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: '50gflwzsori1dr6tlu5wy5yt7cv2mf5xn1kwmzxj',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: '82vda7ipiwqkfv42d4rgtduxrqdi0zdx96g0xgjpeozrguuqaw',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'xnx65y3u8xms6g1enfre',
                version: 'eufnx4idrgx5fhnaiowr',
                scenario: 'rzirnybiv7gpu1mzd8zwfb3kxgskf4i4qkpf2f3ef9jqbonc4p0agubmnr0h',
                party: 'd8a5bghmeg9us14nam3g0ycgpxe534yskf9m5u5jzco5k714ccm9c22mtq97902b2egdqxgdvrmuc21we66hvqpv8la9ddpajf6cpzqldz9ek5km99a042mg3g6z68xx6la93uy184zbx6ojbd30ka1kjmpean7o',
                component: 'qjsd6uv3b687b32sxpgwhqvtiytu4637e3x28jp5ujq8nlq8pkfchqwyu0st1js1fn2rtl3dpdu34jwdho67w55o3sz9ztipdnwetygbw9lf80v1o5yqf3lnp3qs5k4mia7qakfs64yev6ewl5rn9as3s92eb805',
                interfaceName: 'wjug92kf9ykcgx2cxi03ln9f53lzjjxwty286jlnvj52ty69op2iqbynl365k2qlpda9cm195a58y91uf6145lzelzw09cb7h7gklfh37mvmdb20azjixg3swfcj4dh3naj0nv5h2a5g6k1wh27qjjst7ud7x9u0',
                interfaceNamespace: 'lvmh1cv2y6dgzzz2hpdsf01ruz2nsyxwuhryamsx0sz4gxbqtttd3uuhois99lhznfm6ctmvskz7eww5gs86esf3v06duj7h2qorvfssxy0r1xhsvui53it6c33083ebriyt8ps3ybf6cj9b0xrxc2box2h96kz1',
                iflowName: 'ra9mn2l6i5o7fz2uiighe0e9bqecwfl7b9tsjxu7sejz15gnep7qxsgx6hvvl9gaknx2ems3y9pv41ozjlqpkf1vip77hwe0pmgun72etwa4u9pv9nq1addtreclphd9wqhmatibdm9y4kwssdarffuja366oc2t',
                responsibleUserAccount: 'ydynic1kia8a5x8ybrfg',
                lastChangeUserAccount: 'asnmvjkwtmjcumrdbxtq',
                lastChangedAt: '2020-07-29 07:31:31',
                folderPath: 'ulzg2ud3nz5ft67e2ah6idqefjzb3r4d2dgv933wnorpyyy9vrzb77yyzp04p6sn1qkxxz47kz7o7pgjpyz6420d7xpxzwtn2r5hr7jcy8mxiukv7cmkdyuwfqaueam7a2l95d7aojtev11s2jynj6dmqm2fot4kh3hl1x3hkn558n094p4tnz7896npdmghchfjwwez0m8mazpzwimzyznrmkk9ixwxs9ckxh4caegn1vikv1v20s116l8zdqw',
                description: 'hye7q8z3na74u30ylev7szn22xhy6cktmaq6sumf8lvp8wnauoztvwc6v56dlptxuvns4tuotbqzzrk2jlry90c7ibn9omlxw9th1gi81zbmcpcsm8raiqpiz1r7fl2pmd0ggy9ro4uyrukjjj32iffni1t76tgso9fyv4ne9srpdtcusxi1gag1ljen9pckd1ukl22xosu8tmv166i6wcpxsq9fdg0tllgybaeo8psj28lv86si87xn5uer08y',
                application: 'u70x4nftm51hgm58polf8ds9o2qlij220kz283oxl311k9cdnvs8chfoc50i',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e'));
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
                
                id: '56b47f3a-9d89-48cf-aa0c-357a9b886775',
                hash: '7gbk0e46jr5ryothev60sx0i8fc6opr5r9fydggs',
                tenantId: '9d6f2725-375c-413b-b187-50423bb8e61b',
                tenantCode: 'c6x4262pumtgin781o3unohejst7k294lzbxdnaynt5it7hu8t',
                systemId: '97265a6c-7262-469a-ae15-107d3c1b65e6',
                systemName: 'osozygzxz6krfyu415s1',
                version: 'xdjrst57amuis47jpf6h',
                scenario: 'f1sqrcfhjljbw92o6jpejhlmd16oezqhhxxfqcmx28nv5k7asisvo6s73t7s',
                party: 'txman2kcia18uehnbfct31yliin2ykhnm1kiwhfusqe9kl1he0kxo0s0mfrechdz5u9lz7svvhce3zqtqlshcewbg7uczaezot0p76ohmn9olgep1fugtueb18rr4ysbt7p17xpxlvovy4s0th3ybwdazun9fmco',
                component: 'uka79acyfov87e3lu39y4xpy40vq8ouwyoks9ohqsgjfpeps7sm2hethyh654csnvdnxzpvia65o4r3l7dcm64x931u20q3mcrk0fdegok6p92eullyzlwusnxav77o2k5uqof2rjdv0300e85cweco7asaj68md',
                interfaceName: 'myw2qdarxtlsyin9mwbw01xtutn64kka3withx5em5wdm5y36oft25pcizqg1ht9obnhirfjxciupuewdpjg4xn6sxffcui1l8t1c8bwij0wowd9lpe5o6gwiavy49dl2vonh6y5crt96hxt4ngtn3x4a3fvk0xy',
                interfaceNamespace: 'wv48gw8cwxpmgcb0hmpihqaiaawiwhn8hyu8o01z0vu4jl936lyellfxurz29piaikjqmtg3j34jsxztb6pkb1fnn79ktj7ksmf6gf7nzgqa49my4w5bwio1nl795ge4h80tfmay0jietl4hedu3tl59txwtkz4p',
                iflowName: 'mbg8jfpirjvj800a62p28j9zwonvqaadre1bmefmiqeyfwrdyos6e28n9jar17mgw8imogz2zkqpdp6xvrw62ijozfscqei7obh9wgrot6n926xnpjqb2gatsnlbx5145mej6786xjatc4bufz6juyc77jk8pd0d',
                responsibleUserAccount: 'uxibmcfa9dt5ao0he6bx',
                lastChangeUserAccount: 'gxho18teqmr7cpsnioua',
                lastChangedAt: '2020-07-29 10:40:15',
                folderPath: 'y092ebwfl5ut44rd4lojxutfi721wkvluk02ya6172wl0xmrpgq5q2uekmzhagzi1vh89d4tnimx1d5xwwxxvg19406e72eaprgjwuvhhdcd7pzktl68hpngqapqrvdecgydzzy30fou5rn34wdxs3kdqht5gesqnfyw4pnz6ctdcab3z0u1gewblnfexzow5kmxjhigz9ti90mi490c2f472zbqwclllrccps2i4aatti8nxh0x7ikbicgf39o',
                description: 'lbc6ijtn6glw3pejbeyux0nbyxxydaila410vdcfdthj1lyjp230229pyfwg4hv819urckllf2ozq3bonjwo0am88hvpphnr1wefs5tqu7720ondhj5izoul83d91eqj0yfnst7am4cod9yz6hd7ghahyqtmrozyyuuomiuc54kqs7zy9urs1xo5spul6jg1z5nrojkc57w5qexrssyljx5k2ehterbfpnzmnpahb7j3w0lw15rtofbtib669mr',
                application: 'doiyhu0spuvsa80ocamdvcnt3vdghhn40uyufoon03ohhjv6xunvdkoeb00j',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f34dbaf4-f9ad-4b12-832a-c6e11ae68ac3',
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
                
                id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                hash: 'c2nr1mcsreudhskp73eargbyorbbdf7cyjc3qzx1',
                tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                tenantCode: 'dgq6el2u1jhcgidrg8vstbfvwbuxsjvxs3k05c5d7ctttp7rzq',
                systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                systemName: 'qlvvxoqahhaqo43spr9v',
                version: 'daj99ijy5wr4hzhg60sj',
                scenario: 'nula7t2qgov88cnscf8hpqoj7midyk1c3p7b76yfz3zt51txpfposndnxfxq',
                party: '21k4cnog5df0xqzfgrnwfgtr5prt9lr16oew2lsfu8otqyvviy2q45ddg20ltaveiw4j34nkijfxjjqdk9j8v0bpdjlijc4rdhrq8c0fbzbzlr6dfle2zi4tjthgzlwzhuvtqvytgfkosd6k7qj5sm37aiyqkq8a',
                component: 'vd7k6vt4rb3z2md6yd8dkzidw2fi1s1ayhrf2meelaqkshvrslrkd7vb8zamskffysehg3byh04ix56l4acuoa9ebd3r40b5hrtn6suttsk0h5tq9qzlywrkde5lap7a2c33ydndobnr21njptj7emjpijvlwrbs',
                interfaceName: 'ghsn0sv4h7eb4glcn5phszuygqtulu3actq0i3a3mdbdkvcy9v7q1vonfh6qawjqlgvv87rhh3zup18wto8qelg2pfwg0oeablwoqnzkvopltoxdpzb7l4xge5u5w65ba52gi649vjpt4w88w0bmp6xz9p1gh3f6',
                interfaceNamespace: 'tqwaozohqx7rrqak7jg7xm4co8fmtp5odipgzzke81i1odzzhidoscwf8ico9afpl29t6cr04drdrdow3xi0b1kwrqijl92s6093sxusougtb91fut4nzdob5p5xyaw6p6djru9ndcjm95dq8sjg85dufx3v9zrv',
                iflowName: '56vif3t1dqg4s7s3oioyw67zvct4j8tcyjb3o6ul915a3bmjnhmcvltpxpe7r6kzbk9jrbf6owkedc9ahl118e0vqn8c3113qwsyv71vhlm03dehvuwg6t9y5rpqe01u2fcfya2t18cjuglojobjt7anws17gbgs',
                responsibleUserAccount: 'jgp6turs0i60c9f5fpau',
                lastChangeUserAccount: 'zu6lwngj793fb2a86let',
                lastChangedAt: '2020-07-29 16:29:44',
                folderPath: 'l5ovejnv1cuj20z6jkr6ihdglv9jqptgk99akxa5qsd6gc99jfi5fec53w8v5eil5ehd7jt4pm0tx2zgb30x2to0t4vlpsennhensip90z18javv9amquyjnntndo4jdbbn5t0ld3nstuspicefokmhdldgta6wwtnai53n05x0c4k5a4dwg99zif0nmx9ndmxhvaedcvhr6suuyms4nnpow46opp6ihe2vb42udwo5mqfsjp89w61hhi7yq9dt',
                description: 'qtfdsbpusk4y98qd53pglsjxh357s4hy62osacmo5mq4ed7zbtt41tiy9jpg422fr9svxfermz8otrkdy2td2tykrxfxbqad55z9877sdtj9rc9qip1rrsh47lbu892z7hpeyhkqtx4tqqeroz7m95xq0ynkvqe6j20mwqqwanypmeu8v4u65jy35bxasw2n3edjpys2kacu7o74ahovnuxwtfjy6txpoqcik596k0uj8b5bmgb0k4zg14lnflx',
                application: '5dsd3j1igjnw8d86ov3qjat548hd3vlpfodqwzwbc87ooms5ntjh6z3w92gz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e')
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
                        id: '81446bf7-07f6-449e-b72c-abdce968f07d',
                        hash: 'c795lbr2cp7vvs41inkbqm6547mtp2uevab1ygy2',
                        tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                        tenantCode: '288jm8vt4yvziiqqwnc39g1vsyiia8r2pw29sedemt9vwyo5ao',
                        systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                        systemName: '8d2avt7yl1jo8tngi5qj',
                        version: 'be4w8o1mq1g97brtxjmn',
                        scenario: 'rjnqs1a0d5exdz9fbp7xad61pjf34noi8cf6eha3ibfakfig7ad80onp7er7',
                        party: 'womhr0ed1qy18f0t4q8pjzodmkhwmb5wnpa5pyi2fo8h7mklb8n4o4e9vdgv755bqngkybiro0xaqimbsjlzxu23th2xakqnjib992mrzprxb213v8xtl2jgvukm0vptldr7uyk7hmn8uiglfrsewhcjt49a9epm',
                        component: 'xci1jowejmtkx9suu48obx9kqchkwjw3lafso621ug4dpr6y9zaxnspd2f7i8jp4qahem1twyfyo2x0uh8htfukagwy226cbgsru8tiby0t9ldfoagyrj767m0xzsbiw5hgw7092wrsous495mtvervf70xyk7ct',
                        interfaceName: 'jjak3u9jf3ljsim1qtw3r32945i4vpbosgekb0qk5avtjxhg4pycqegntt9fmeycvir03yigyu86vgmhogxnto0br4jstc4dewkr9483o4r9dyu99633rufdokmg9slfjkfk6s35o84a6n5mpvjldwg5ny6ojyxk',
                        interfaceNamespace: 'ccotykq0bxgyr2vdqw1mzkkjsu78ymz4ql0xk5f8lvnr5bsumzl1kwd2v5l8bv3zyn7ekckkfjsys7lsv8gwpworvyze9fmb97yozgczxj6cy6n6t5ws51no3tmqpum9586kqm1w0ycre8pvjlu6c15vi5ddsvxa',
                        iflowName: 'fskvolfqzoje8e3tshf7ff0u1gj63ilxu7f0vzstsbeoucdr1og49orz1wq4htxng1iyp7i64xq0blgi0xtc7dgivbesmepdftwanxdj3rlgdy0rgal2s21v9t4t0dponv9srjpdov4dgh090fgdbfrjve9kt29q',
                        responsibleUserAccount: 'ms8lgzs5wvuakqmwrt2w',
                        lastChangeUserAccount: 'r8oqeq30yn1g6g559fw4',
                        lastChangedAt: '2020-07-29 06:23:57',
                        folderPath: '42424gyublvq92q450g9j09kd49xs1dsnccre3reai2vaf1uhacifbu3uh7zf82wsix06a6yqlcyo9key0r4xm7moeb0vuyo4lvrf6z097ecnb3jydgejb9mi5yba187bpzh38tzqn7le63n86j7h21wm7v0gyr4qetwlutiz2urd4a5bhfl3f4u8aug7hdonrp4tjvi864me8kj5oqelon2cvodeo5bsy67y8imyb4jfsv56mg7l23qsbxq6rr',
                        description: 'uh33wzawo218kfpoxsoedoijk5p59llghair63m4ds7dx8ksnetzocxy33newc1hny6xle6c5lcpsbec5g5m6udktsbl0utrvcv8ulb8hr94lka7womdpcjnvya9lp906v9oz0eehqy1fpdg6b28ahjohgmy2lnmi5ji0pgbhapb6n2hpcxwikjtbu73bik2w3amdaowshevdf8uvq2jirsq5mont4frodmul3eleio7dvl9hckk1mhxgpa8csy',
                        application: '3gjmgqo1bjcpj9e5n9dlv798yoasb2uii0wddbcffszp41m04h3rj5lt54t1',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '81446bf7-07f6-449e-b72c-abdce968f07d');
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
                            value   : 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e');
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
                    id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e');
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
                        
                        id: '93b246b7-3e85-4b6a-b1d8-cd1ebd951607',
                        hash: '7mvaot6mxvtf8z19rdy01r4q1vmqbtqbyhy2dxjr',
                        tenantId: 'aba38b7d-d70e-4081-800d-fa47a3c763f3',
                        tenantCode: 'ibadec2u9rrdenis67j4goqyqpdgnrheyv95zmb81l8l270t7g',
                        systemId: '956152a1-8fd7-418f-b488-c9cc2730c960',
                        systemName: 'lbmbubr5d11uwim110gx',
                        version: 'e22pw4b2g51m2u2m8taf',
                        scenario: 'o5qy3lcdlwq3wuybruwnmcot1ewf8kk5gzsmmpce4w9t8p4oeiwf3cp3dkz2',
                        party: 'rg0r3uzmlgyqklifblvwhpcoq9dapsl209xmm06okuxysbj22kq4gcvwzesszkkbu7hjj79k99nwxzh5hroe3e2buos7anifqkzcuoeoxtgiahne2yo50hjhbkyfpsw2tm30sb8l9pbl0tk5x1xjpmzewzy0wc4k',
                        component: 'bmm04o1350asy3oa7n36sf8tfccpgb21kcbxyywm4ojdevv09d7vpqi0zhj8r2kg2ps7mm0w5chnlot3qhbr3rvgun64zepon6czs7lexpefr3k27iogbicogfqjsuw2tnx7jvk6wagf60elhe05qfgs5v0cgxly',
                        interfaceName: 'r74byrtojw8ny8u7xioormzfpd13p5yyj7o613yehgx6zgvw14poturp5ley4eqp79onedezds3qi4h35i4khjkp7ggcvbqzrticvb1y56muu75muwmk6xoxl3fhjnogl4utglc2fyexaa08t7q2z6yf2984b14y',
                        interfaceNamespace: '8j3vzr3pq0gxs9n1gkjxlisbbtgevzw9fa2sqjxn02zk9hh2pqrkz0sbyq3kwf84jse6nj1vsfc6jo0wab8ggpwmg4smt2ymq5pe9hjo1twnkgfh1v9wpuda5kvq5lqbb2r43uydu2cgekmoblsyb5hr1oqul35t',
                        iflowName: 'wp1metk9qknzbu8hb7s7ilbn0ie8ahun73v4wglzilpcwj5ose4j7lqmsdiyaib54vrzqs2hm5cr7tpbswlli855wkbchmysdkg3jx0pec3v7vziudy8dchl7dg24ipozjdn496lq7yi3ufkx58wyzyd9q9hcltr',
                        responsibleUserAccount: 'vzkga3zvkgzeugx4arxe',
                        lastChangeUserAccount: '7ikwqv3vsksyiuo0ozt7',
                        lastChangedAt: '2020-07-29 01:08:49',
                        folderPath: '814ge8mefkycmjgd5pjp676r2e8oe34htm8uvcl9j56dyjfvow71eabxqzruor513vfoxj9n6zcl6ziu9mhq6yi8a5zewa97reiplflug72q8k29cdfblx3yexceho5iie9qiuhj4hpl9b07z6e5o48xtoabubnfhtt0j3pndyp8nztd382txpxpiiemape5f7mqxqvtxh8ycasuyl4672vvv2l2oid0m050nmp213wocvo6z4nq2jozfrgp1pj',
                        description: '74qii9y0yykubhc7nhow4sgatzsbibsmtv7obx8fc2zk8pjam8nyno29m8mpr94puy6sa892wmwk5b9k4zu097p8hpvp3acn4majvz8fua4zl94zalfquik4dq91h9mkncmlq86be8m5217arokaqveoumqwfun7g367wqkqcnvdgc069l7mnhre8oinhhay57ue5mg4ico77dp12p8hxskizft9q7ey0zrc674u8wjwaygolcraqrf1qt0qf98',
                        application: 'pjw89kxml9ch9i19ebdfl3xviwfi7rzfk6bzqnmb87eeylzpw3s1mehxtx1p',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: 'fcbc4f50-1e6c-462b-b040-926f8f1f9b84',
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
                        
                        id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e',
                        hash: 'ru2qpb8tctyt34s6nf4f0anqzpu6hf5gwp0rd06l',
                        tenantId: 'c9f4327d-1e85-4dff-80d6-f566e5e1f272',
                        tenantCode: 'b2ownmfunmrcpxwbs23u8u9pb972om7z0r2plhupz7ahix9wrr',
                        systemId: '3f141849-f618-493d-97ae-909e79b3c0e9',
                        systemName: 's5fly98zg5rh9ke90qp2',
                        version: 'fdr3dw62azj1b3kd1b9q',
                        scenario: 'ixaagux0ups45g87u6vybtzt0k5o6i2ogd2p03kvxw3db7kwz2qk6gc6u1m7',
                        party: '0q00x57m2ks24cxk75g9jxflwm59s05q4hhpuqzjpddp7k4ql6a95e4tzqvo5m3l6e7nuvm62y1mv7361vxzfkw23tynhvhpksfo8q824n1j6plxbd2diqrywvmhzrru28907ocyhneo58wtgx3ijcjqvjpjt9zj',
                        component: 'ys250x89pccic1hzxy17p9ttkakhkjitkd2dff3m87x7cmaz2t41yigwwfjd1l39iajy9ixrfwziz2qe78jpas8rffmoom10gnjqgf24up7rspngapsbh8txqbypwi3d3i7fekze1cl0y0ran6rox5vqa8fhc5x3',
                        interfaceName: 'saqcb6mcu5ozp0ta0l1rsyjw0jg2950tbxt4khbyh0wu2rt6lsjq4mp2topohj8gq2p93049dfz78r7rq7zp55v0gr63mazdmiwjah23wd2g3g8glf44ffbhb6e0xppj6d4mpxt7ipzxjxy0thcty4r3937j4tdq',
                        interfaceNamespace: 'actj2b91zrzgnadklmehk59tbcm7cry0yc2w5dyab4f46k0wrmxp8hx02ssxy7hzcbmggjzkikc7aldpslquwkwlyg0roogsrgylrnmooz5ohp4fi33x987l0nudf3x1pp50yrfpbxrmy02kuw0itigkwjj8lcg6',
                        iflowName: 'dynjy5x2ni6hal64qzpm4s47q8o380g3codatykd4e8h2tcj26dy5v4n1mt7858nvqijhjorcafj9wd5y2becsrqug57fy8752g1g06r5e22uugkaoicffyd0zlvsv524omv0w7uvz6seir3zvi2ptybuetpx5lc',
                        responsibleUserAccount: 'k0d9kczn0a7z2p02vxhf',
                        lastChangeUserAccount: 'o0652179c7udqcsy4zy0',
                        lastChangedAt: '2020-07-29 15:17:36',
                        folderPath: 'hxaj6omfs9xatjz9oo918w5mxzk5oapaqpm3fwtn90ae91acx70umpjinyonlv57pzzed8b4xkuwuridpkd5yqmap9637ml830kmimzxvjmr4t7c3t0p8yj9ykwilor1suflpwsh5vkkc714k7dq9gxstqxw7k01hnqbm7978h07px8uhqh7zdtkdq7slfk40n2sli37plil24rt16uwm5w0el3mhv05s2kxvpl04pvwdqp73d8y2j9kpawv0y2',
                        description: 'ttw7ni48jtzk5fduyd1zcygaljtwy2b8axlt5bligiy26dxdfqx9k8pbjgh0vd1vzzbru6n4o90e7r5wlxv3e9sdjtcyxxi31kcvkapn6c37mrysk84qc2zfls68t4s7s7bxsxvc230l5zfhrqxh0zp391q1wbyebr7h9gw3trugxjxe44jlq0car9e5x6shvtcqj864vtceg8zdzjzp4qcozbc85py66kmxchcojo5l08wjp632whkgiwcfqy2',
                        application: 'j0kr7j0gdipvty8ayjxo1wizp0ldxs5gx1jv8y1b2nsdleto711jjx4hmbuk',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '61d7c7e5-118c-4aa3-8a94-562c0805e506',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e');
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
                    id: 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});