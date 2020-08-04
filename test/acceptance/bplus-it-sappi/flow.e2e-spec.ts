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
                hash: 'g5t94szkuw2qje3v3n7pila9ka05yps0uqblry63',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'c6wmwycq52yhu32at6osmy3x3h9eh3ev8o03gc4x5er71vc7vj',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'sb6ibl7za141x47e6e1v',
                version: 'c7m2niejbt3db1qk3ol8',
                scenario: 'ww64e6gyh2ofyn8pie8kxojtkfmn7e107hc8y90foovcjppfpjdh51sh1sve',
                party: 'rbxif8lrhq1hl8ahhw1rw049b08ueuhrkvkhyvzf0q11v1q287rzqjykkj69k2eh4d68cirfjiwpcqhaf6nlobq04gyn62jd9z6p65gmogph4pfkwh748ujwoq4g7rerte0s3vpssz4x8koqw4x11yhudj58ogfo',
                component: 'q8wbs89gu2rttxr5og35vu9iuojr263gcmxr7hhj3glfi94rj62duziifsw5iuuhvcecs2ibjgts94q362ofklktq1waql57du716dvzslwdq4zk0s7kfe5zzwr7pr36b4fdwe92hmdyhbgub2yfelt95nep5v3c',
                interfaceName: '4b2o9nigixb67c25qrkveaauvpxd863ahjktl4ei0cut4fmsi3ngnylvrmqezzz9y17bskk8s87q700nqwemnosxmb38ilvctlhqjhbn5y271bn20zain1ol14ahyfz05qngk26s4gf5qv1n5bi6bad8aw55rhji',
                interfaceNamespace: 'i4zmtkhv492f3rmd5pacpn5z017j4279p00qg3ik9zmgkoibnh90vxco1ucejsu3i8q044oosfhjntnuzw32ru3s0gio5zp121j3tjihhclcjwbj04zpef9h2t1kpe6ypaf6jpg5sj2aqbz3n91k903femyvk2ow',
                iflowName: '0y0tw0ijv5tota6u90ht9v0hj9declrgn09u7uhhmn6ru8axwe0qigpss4hs35cjnokr91n7aq7re8j16o1lxwtbhcxksv101kzk3uhoqhta6dja05xcr4ailexubnia8gsp9err3z4tazpli21zgwwklp13k4lg',
                responsibleUserAccount: '9o3e7lbcvar6vam63q4c',
                lastChangeUserAccount: '853gxj2xvy71z3ikwkzi',
                lastChangedAt: '2020-08-03 17:05:53',
                folderPath: '4pc4kylv4t7nlv5halu89brq5u5rapkm1uqby1hn8zg4pnx01oc1nrydcqar3o1v1ojvwqt9ej7i758loss5wweke2ssz5cymx1r0y4ucyz1vt9a3tigk8lwbjk0f1zgbu71y2w4j4mv2isrh74o2timsmqmevldn8b0czfy24txb47z1jr3xafol7tfptcvwxkt5os56868z5dmqf1cxspbqbwartc05sv5wni4wjgl6hltbdta0jwd4rzhwmp',
                description: '4ankvuearl1n8fzp6q10pf661leueho1mtwvukrnfeozgin3mwd1j29yaftkx1ro0f6xjyjf9zdba4t5d9gk1yx4kcbnehtb22ffhpdasbxko02igy69saxpaltils1uteupk3hgm2pxr0nhqsbte9urcpcdpbwi2rik16gqljyfmtjeu8m3rix3z4cujz6rzw6ll9zc5mlfdyojpr1oi741wolcbeizfbmmmof4e3h2sme2ld0mv7q3sty5w7u',
                application: 'tqkcdkud3lv4atuxheqa72yyv28srer2yxoor2hc8x8agkflcjgopesq6snj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                
                hash: '9ccxdwagw42ogb8awabq82kjjba81c95kfgzm2ta',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'bryov4memazdwd9lkxwdo3qsf1wtxtgjgulu6aq9ip3jdmbnwj',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'smf70y42rdnijwpvrtqy',
                version: 'hdbjju1nru9donniry2b',
                scenario: '21b4avxer8b5p4iiw7jcore0pf1tsxxj8mpzak07b4ucq1g26nj9l9zfktt3',
                party: 'gaq6p34l8nk7y1aqvkoaoyw1md9vejaioal29rvnipr8jp2i8x9dmu476dh5j90lztkldea7c7uz210dr93ypyndh09qux3ulk3i4z73gdgt4xpvrggb1891c6ohipttm2nk8ptragypsi24v76quahvbdr5axcd',
                component: '4av67yu2hggwsrpeb3l03917umnm9f2zwp0ew5w65chpgeov3jisck8969lluuh5edu8vjibqebix43rcdsf3ezgo27wnmagja5hj8ymyu0kxxyhuzz38ivn6v6to5696jk3agmemdfw7he01ckxnze3gf8ac30v',
                interfaceName: 'crwvusk1gc35522pxgk19m9th6hjspobt5ka7hpjph1g8cbf0l0jdt4sxxt70t3bssvik3g55h15obiu223j74svqxhx83p1ad9sycug53no0wq0h6tozlepidvpxqdifzcmpg15ysu7n2b0ee2ef2uz2p8nbrmu',
                interfaceNamespace: '97bi5xh9h46irqw9e2ogsdffj0x7htef6nn0hyb84bjhau1vu23a9m1ne8ivmcpilf3s8p6ezykp80ofjvext63nde14susqeelwnwbki5am1guw9rumz8icvkbdk0u1zxp5yz8d9p3ktdi7nyvydf1nna8rgps1',
                iflowName: 'm5q5p7vgk8lpbwfzailwkwoy1ftj7t4abjjm141c55jp8bx0hk5vjchkvtgcm668wak5prlce6471xjyrwb8pcswyioy3rbrx254u9mb59ypi8vi6dx6x4ekjcezk1kz06sdhzqlxsb3e6gs3cpso8n75l2zlt61',
                responsibleUserAccount: 'h9d0d3b62rhzcogg5q7v',
                lastChangeUserAccount: 'akfzcqoog33mboujotcn',
                lastChangedAt: '2020-08-03 16:17:50',
                folderPath: 'izofpxk7gxj2gt5nc3lw0j4w6v8wu5mfogu2ns98p1abewmnjr7jz7mudn2li7xbpvsqyfa4qg3j08t93lae5gpp3garhnod2phocc1gtneirx66xzpgfr6e2n544nibdwmvwqhn2tljapmitz9491zituzmr2u40eyqh7hunm6hihqkjamy23d35rq05bl56rext6rysq3zqfndkm6aktfwgt2gfcm2swsja7nx3frr69ahi6nbu4hdbrkegx7',
                description: 'pf48v4ei3qhhq4hzcxbmqmfm99nz3wy7vbdt2bh8asbh31jr053h76c298hy6cuo0678bt32glweke40u8wnglt8uocqrtgic23jhjtkae8m2hybi3q8ukpz6k4lbt03t0tn82xbahk8lyj5mjxdxngyqytxr2jgrm4mle0og96hgflq1xyofrv1b2gfd539i9jzs3yoisjq3ikjpnkonbc2yaset3t980nqj6snvrivj5avtgf9yxtn59of7q6',
                application: 'jts462gtclshso62tqzvfu44rrxvplsxq2w5u8pdel0ol6vn1srmzm33t2oy',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: null,
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: '0r13dh45o72nqblzz8aooe30pac5spvh6zv4g3xux2vulyorjt',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'tmizd0mobh7rjjsm1t6s',
                version: 'e3a5tkoyrhlc0do5e4cc',
                scenario: 'ih9rd2poa9vpckilk0vmz6u5c6mzsx261r2k7b928ynorv3uqp2i1k63ipte',
                party: 'rx3m450b6f1f6izkybo20udawmccckg66yum6d2yx11txsix5a6r5ykin8cwodm81m14q0o52e9rottifwksk56wr8033cdqqi3cmv8mbwaj66viddwl71aw2etaxy0kqv8jmbckumt70v8k6bz12fxq3v336sk9',
                component: 'uppbv92yvyp2tv883bky10et03vc3bgmia6dz37vs96u2ggngof56pzoje4ivz38l5emqehyn4yownxfe66b2tlspgnb1qcsc2raahbp3ks2c82rqv9etm968080zszlve08j69oj7bhcxx96fpv0wnd03zl49pc',
                interfaceName: 'qugn2o9k25rnia824dvf58ijrokdys5tza1aa5r3il1g1b9wsqc3v52f6j0vy0sf8nd2b0b4mvn2nmgfh64p23dml0kelwc3sd6ldmo4y4wndi71vs1nqcu5mq9hbwi1p53vs15ccy18899rj5nbn1o4jyg3htjy',
                interfaceNamespace: '9xbwlj5ufnwbk36x5i13so16wh6kpc5koqc9s1h0cz413uxxn5x1cn2l5hd0pv6sw1oxvnxtr4ynsr8v2qkd70y62qnz8a7qiaty67eqjptmxe2rbwyqk1gme773cngxn4jeqgozwvwljtetictjfilyrg4b4d1x',
                iflowName: 'duisofqcl7izkthhgn5lvm6hu7b75d1sb2wbdq86oulcysbeql4d8addq62nd1a6z0zql5004ooyp4hmp0wj392uyhr4hugda87gf1uvjrdj7uy3fpbdgogge0jqwbqkaivb0ti5ix48haze6cw0pymyjt5glgx2',
                responsibleUserAccount: 'i11ajgjboua2tb5qzfqx',
                lastChangeUserAccount: 'knivmmip1o1rajtwjjr3',
                lastChangedAt: '2020-08-03 20:32:57',
                folderPath: 'jrpm50elx7y65hkhor26u6herdn30bqa18bcpfzmlj4ld1zxehhsb5ebylf5gvutlgcamgi86reep9htem4pi1f7sg370y4zpeiwoanvjosxvyn6xeejnenuv4berorclaqs8w6shwi84nr16021x04fv50et9hyd13qh9lnsfdztdmg59m7amficd1wz6h7x9apky9gyeyffsfcsxj21r9sckma4bpkv6k16ny4gbq8xormhcedhbqnryyhzpt',
                description: 'eia727cdk2a2734efi8vi4rvhg28pb0s96ejx88lhsh3gum9fgc4f37tq3jsoqv0ojdsig4b3ql8ddx67w66uqedp0tlk5uel7z04dayxphlmretdc6uuk74cxxxbn083u5d8pugg0b0fm72rci58bfwy3c0s9diugaomazxyazn6auu0zq93ithad9f7810uzml3wiz5lzf8dkp09m3duiw7koyuupypzqck1q9slj1pbooob1lu32erg3o6gx',
                application: 'hhpw4dh0hwlm5r5tyexi6m6cu9h5wrgutvcfpjssttx4tvu1x2r2u0p59pvf',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: '8t4frxi7wr18a6nozxw8lvyvy470w4dl2uqrgab83ljej4xk4j',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'r8on0hozu2an6v5cjshi',
                version: 'bjifyxbt7q6b4c3uep7l',
                scenario: 'hnzgep2twjbdcagn1jxha31jlvpam0mvkyrr2iihme4sy3qbmt1g3vo7wu0m',
                party: 'cjzlm9qowrt9k6isd5vqstnn27ra88866z0crewy1npnabe1xyz10muef7ch55b14h2ni0p09gsddwrufvc74af4zf3wz7yg6vqklhdblsqop52czzcrhi8yu0v573d45quokegrzows4n08m23nkk37ebrglffo',
                component: '1b3p4gbv61rxyo1xbmcsp406ekpn37ydz174tdxhcr7b1msd80mw2tu4gruotlokwk8qlfhqu02lfdjcy3knqw6f7rwxdak54ytjvrddqn7jduzbv0ppgh2szzblwqnbgo8iowf55dr87m1mkp9l9uo2n469mu94',
                interfaceName: 'ku1tr8e1imclcaen71fp4oqkaj81wqw54outooarumdzgm175t3grgtv8lb0zeqek5cf99vusbaevx641nt5qkne4scev2hnhh0q0nhlbwu7vp3wytg2m701bawdnioil0jpazw1xt4jrsv13jus9nxv0pjf7egu',
                interfaceNamespace: '7cgbzj2vtfyy4dmk4b0jlg9zor8ky72u8v6jgnyszwfyvazu8tjcnf48i29n0min4gms0iu0mfwqatq7wiaxvx81uyo9zs8pal45phwao7y56h3z4fwbzf3ijll2911b9ppt4puo984joa5vj7wl9k0tw0ocejy4',
                iflowName: 'ya10iuplw2ythsy8s4kuzm5t7t8gp1o3kpagj0pj4ygh215mfx5lanxzb81feugcdebjdluqa6nrdhla92hxnzo5r347t0d9bbxs8l48jefimghroiswlwbhlf6bvobestahsh52tiwj1zab2hxswyj62go77cvz',
                responsibleUserAccount: 'im6e83j6t0v37der7x4d',
                lastChangeUserAccount: '76taefee3ro90s9y9dfr',
                lastChangedAt: '2020-08-04 05:01:44',
                folderPath: '7kzr5rayyh97ov7eq1msmu7xjcphnxtxfvxa7k3m3c08vnvjh2owbcudw5jq8ns3hmai903k7ptfo98gwade62mhdvu323lgrwemaj3qhd5jsw861psey533z6t1y1unt4t3jhmfgg4j2ytmref6zur9o5vqaijsbh9pxb9dtho9xlkk4yudx80io9op7cefz8l1wfjkcpk8yvaq9iplimwlcowkd3xp9r1vche9u4cjpuqhugv1wi4v0jx722k',
                description: 's4hh25k6lad00bj70gxh82nmd7cmtiyf23ntb7355xrfd4vo700bjco1n6x2sgwlnnuxbux0f5qf5u9kx66k9q9dvrinrwb7ngtbuasx4bp89w7b5zp5wkn2t22ilihwcjzk0jtfvfr022xiuj6adigltw4m6qzvf94qbm1y9fjgfqknjvrfr0psailoxq7o1z0okswyiyqr5h269jnyuo056w38cpmp4u5ut8j8i395h8i55b7dn2d8l2k280i',
                application: 'mvmji4a2jcb3ws8hdt2xed9u1g1rv8f9xjx5y8h5z5g83g834te8ofv0cxgw',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '8fzcqit49hk904isppl3visvfbyx8ploqnwwsewf',
                tenantId: null,
                tenantCode: '6548zygbbp0e3nvwdfruoors6491ng2v7q87zis9kk9nsqdjmk',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'zprib8o1ho3yd5s4kzbb',
                version: '7l26mcjdjamftfv3ygq4',
                scenario: 'rey4tbnmgnvz6wecgw0hxi6a0alyqb0fiyc1vuru9n60y2e4s2cjnuyrvfq8',
                party: 'm0cg6khu4iykg5h3514i8eb4k7xpqn46yuro2eda0yaid3pd4nr42spzwg2tpzl3dblml7e07s0beuqtr8lad7wu1bh4d6u9wvv7u8zov8vsys7pv42s3z0bbf2hm0ifxvnqxrdk2hllj04dx8lk0in1bk1ejnqn',
                component: '6r6wqrfmgzlsbyu6x9buubo78axex13dienhxcxg46xbyat9zelygpwqil6fdqrhdod0s253v10dtatt9liyviiyyjrz2ivjzqs1os2wd1aswwwwfy1g7ma0xxhnos2mshkxj3lzj8jjmfuufx8v0404tureygp4',
                interfaceName: 'dhsof4p8ke11f0641ird2qrgt6ud50pqeab4jkk53cw5qlln0d4hysa9ck9cnx34bpczbbv3wyxegcj20gz89yz6r9oylncadzk3d9l5plwurh8z1igoduru7ysedde0jv29hm8uewupy1imoxltjeujgnjx17ns',
                interfaceNamespace: 'ywrewhsgt767gvt0z4zrlim55xb7all9cnvmgjubw35svagugh1wvl2jqeu3c9oj5wf9oimjcff7dz9ag56a1cxpr2hcmk8lelkbsgkeb4va6v9gicmueaa9ikb2jnaf0x47h88tew0o4bhddwoau49hdqkmo8bf',
                iflowName: 'lx7xrsgflaa7s0nu29tos2971tyhu048lv7on74yzkf733pe2jmiq9e4k95ncoyf2xyadr3g6vl9t7f19xxbt34b1ec4qyqhl8f5gftb0grijbgvey9vzgjjqsbdygpzc73delkp90aoglsvylnrkstrl87tzpfo',
                responsibleUserAccount: 'q4z0ca5b2kxmydz8nndm',
                lastChangeUserAccount: '9o2tuxa6w9g456giwwt7',
                lastChangedAt: '2020-08-03 15:30:52',
                folderPath: '77uea9jcme19qik6323dlwxy0h66kf2a0073ybg4r345bh63ung3jjp66j6zynh6bwn0y32aa0u8f5n6dylsy47b1vpx8urz5kaao038no56813yqhricqdz9yr8ghn3acmxyu1bbc2r4jen2jez2gev2a4rt1z51ow4ys0nan40aqz5m6c6mkauo7dxkjheshwd8md8pijtqpiztx6t5t8jkkictyf8ner2mkdx1tja5akvk1nxaept3l3jkrd',
                description: 'vro0iwjvjabed5kdjz1tsdmhz1yvnwb7k57zvev51l2xy3nvkas78ghsr8cciwqln8bqwn8tlvjzdskhrnp10eb5m6lcxn1nt2n5ecdlytzxxjd2mib1yhcr0f15j1g33ayriqd3tlc7bdpxakexbm3ufhc3raqm1hpg0dbn635iglp07tdvzgi4hlo6chyvcykq1jjake4pfr5wcl99uqmvss25e7ab9w0680s7qi42hb9tkbgeug0c7kn31vm',
                application: 'lr45pxmz33wz6dzp3o9lcnh9kxnmc56ekuemc4d1uhy08l3e9j2dpuhkjs57',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'a2xikx6ozxuujjn61drdwgh2tviyi17p5h7bdhuo',
                
                tenantCode: 'bl9a2sk25r976c27425kljllavq2ff3acrry5ctb89qm2o6waw',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '4mhx49dxnv0xgz9hkyyg',
                version: 'sw4i8u2bni54qtlyhdzg',
                scenario: 'k5smgdt43ow86ziepvuk2qsw0wtd8dppwclu0ayn703edith3hgi9vc4kisc',
                party: '1428s92n16qkf3wzr5uu4cczd6ezallpwtoy52mzxbc7ae9ey5ozzinkk3sti74qvnaiu58ur7hdr3izyglzz5g08cv59byu0db9ssaoj0vr5qqfmk8a460dl8w1sc58ganisa789rsau1mhrruuqomt68r28mil',
                component: 'x911o7719ndjcz9fcb5o7gl3xsozpyw774oens5db8u0srnf6k4m4f54rn90a2pyel1rapvgbtfub9tu2th6ahpkuzf4p162umj7oaugwk5302g69n0ar6uq4zxk7wntax58ssbvpowka3msxri6o59bie9py72t',
                interfaceName: 'akmidaiigir30kj7t2s8mm823s353okxv1stdxekzr5xgrc7cjd912ovfzhhehvaed7phsoo67fblf3gx8mepjsx2b69370tpww01w50ku6forve91v9ycaj357865of2tp2qqywokpm5xmnllf2g6cwvq3x1amk',
                interfaceNamespace: 'fjr91aldaikcny2dx6or2uyx5i8qr7xc1cdkylydeyqxh7u6c5dhzwfs05dx6abke3k2r031d18jgkmip1ud8r68a7kd6tbk42tw68sqg04f9gb7k9709h053c0vuln1eeuzjlu6323ucpo73phyddfswk5jdmfx',
                iflowName: 'b6r7oyeqsa15dj4mqv3vevfzv4fas6wsch6b6124jatbs1wajzglob7o9gag75dlkzk5yeifo0qi3czpgtmxy3lthnphgecs86321x0wm5zm7mxyceji03d9e9emmuani449fhyuqvvlicx5wp7en1ki5s4m3txh',
                responsibleUserAccount: '0kdaqo4xaqg9fo9hjqu9',
                lastChangeUserAccount: 'vjz25mp8dpip7jkjjb8w',
                lastChangedAt: '2020-08-04 05:53:17',
                folderPath: '4zrayq2wlfcq80u39mu9e1d36ute2h08mt4k5agyxr3jlkwyukqba4zdp9gtsgjx55y5dsdafb4vly3y4uq5iv3fauoe77aifq9j6gikf666umjgnupr7snuar0fy2v3yempgekqic553xl3g93l5y5m8u44wqh4vxmka7pwna7qe8p0aeutjum5xdlvd30dibmuxhawt2qs4mr7v5vh9atpjtc2cgakd1dwjizfkqpg4wivz55hf2cwqe1e91n',
                description: '1f8r5vjecf0kx2maoyv88c8wi1b0wpssetjsz9k1az3u8nyfz42a9rb0e2p9gnysvzca9eknryzk67j15mlet40iq4id9awn02g1tomuub1d1ydgvjzw6k69knyjgs28890731km3nggkpqbt7vuons5spof3y5j0ai6ygwh08qg10qye2pp91lm80e92r1acb8nj5nf1u8ttc2kljb7x3yhsj2spru8xvg05cl2gn7756pg4737akmykl4pbrj',
                application: '86clvrfn23s1gncta1rep6m0fv3h1auy526pv4v16jp5ozp98a8vb91q763j',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'zipgjvyt0kan45nkuscd14aze6lpr171er81bm03',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: null,
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'yv47g63eaet5znl97unv',
                version: 'sa3vgt2p7echb9sxywkn',
                scenario: 'eu50nbih5gplylblf5etidm2h3xibj7wsdlg9risyh119dykrr5q4jd0ti2b',
                party: '4qo08hfdr1lk3rbc2s0v5wm43b3n0oonxj12titkxu4g95ull5dbslapsg4nqyj3v19i1k9equ5eijb3m6i2ig3olxc87m8ns249zq4yfzu4ts7tsng9by91s7wrezdxuqx2nfhu2vfua3b7i8fjk6f8amdm3cyr',
                component: 'mmxg0nr4dg5tvnuoodoa4ooxxn9fq65w3rvweqy3yf68wd329vrdl9s0pwg6tprnayato03rz7e3rde4n7peap4pt5xnrzxrygt3ihmozj3bjzl8fuu1yvf7ala6opbz368bi6dt91eyrv6e9zlasqavb2asmc5e',
                interfaceName: 'ogi7qemgr9a6zzy2znbr07wlizswj2gmui2oqfd4hw80f7glrt1bwwclckwa8w5tkc0s78hxhhk1b3ggbmdicjawrt7zzrzbrloc3yjc0twpv9p5fg1d8ez9ufk81ri1m1o8nmx9f1d4rs8m9avcj6lf6c6ni4q0',
                interfaceNamespace: 'jln36i8cn6f014olwnqxwnj9xfbfshzl3qgm3hyngyerwiij3s0u6317vehzg96lguzojzkihoanswf3wzuccegl4jq65avlhbg6kx3ikp8i7h4r25ez9cfyx9nh01bbuhy3bsbqiyyogovbqzpij5sivlov773h',
                iflowName: 'pr3ae5oelb4gkvh1cwhgne9p0ouyep6nb1mvb13j9zdmwg63dw6dk45uf6aj7fcgsp89ae9lnf14jx823hdnu6t76sh3cw8fhqpday5h6mqevrsl51teshuzizcd8dwhsqnl20iyy04hdrjkxamy9yy4brzzec8k',
                responsibleUserAccount: 'yene8q8kh797sjyvjgeq',
                lastChangeUserAccount: '3mu0z2feguxcplyloacq',
                lastChangedAt: '2020-08-04 02:43:00',
                folderPath: 'cwetgbek4dvo5ehn8ufw2hysn46n50w10dkvfiubk144owfyxqyy0ml0vzsmb4jxakjz44y7aaem07volup079t4tv4fdcezu9dvn0ounuu39qko721r0lz1bvu40pw0sjlm5hv4hbc5ebpg2vs65weglzuxhruc8x6ad4s3tzu191kq58ep1qykc2hlxj32n268sbs6z5bof95acpzxo4q3o5f43wmo2hh9zypcon3413ymtbsbtdjnp6wjsi3',
                description: 'xxfgifm7kyut1jujfz030m7eoiczl8v94yvs7i14j2lxk3tjqmiolel8pg41h5zsmf9jqmnk2z70e5us9k32kk94qj4dc6f7mq14rcw4x8ad05rrftd2z47et290u4m0iyw51o3f9kbqvmlbzjntg7t3dw4pnj9jfk62379f2p4vts7i1zzrs5tth5az74htoz8bkv361xxuvox572bxalhw82t7b1h8qo9za20mjgmdowpo6sz3ioows1miylc',
                application: 'tl8irocrdn8fek008s3lhdm4fwccu6ay7ok732cbwqkxcauoqlrxppsywfy5',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'w7cquafvnkvhy6dc6z4903wi22rmmxdhg051rfti',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'qqlzpe6lo43u80lrvhb7',
                version: '1uvz9f5bnjni214a9djz',
                scenario: 'elb8b4snjod8stqpcduak9fvdl5vsoe1p0g57y8xhqayww61fukz9q60qmet',
                party: '5rkom54znkz46oi6mtja40slwa2f6dvu2o81gakw7chstlwbapr1ocv30hw5xzhvkgmwrcknzkd9099j4oydf4c26k952pyxylcmjovt9t3fcxs3z0p5nrd1o0ufsielsmm3gz3ef72e07zj4pe1x0cvyjk5zadk',
                component: 'upw5rhns4yodguzznpc61ijugivvc0mcfctr0rh47odcexslz06b9vrm895sol39md3i4rn5pbqf30vdwu5qahm41bcseqfassxd6hivl3x3purdyp1iy9263d3qy6hh7hwrwegt0mfvr1jhfd0m542xv0jw4xdv',
                interfaceName: '0o7ij7wab0w5wmr5lbfl4rxvu2rsehw0lh5qyfr2rkakqfzr9hh4kfhq5roec2l2dzh659r4zdk6no4j4y941z6s2z1spp7nro4q8y0vdygw87vagxx5qhi25zri3wwr5vkcaor75y4js8wervip49ea08xcxuxg',
                interfaceNamespace: 'zk428neezsfoa3omduv0hza8lr4sebyb8asplszxiksfwfwgfqecadbv3kl4rsg930tuzoqc1jgb0av7upjdmyelt13epd5b4cpqhor48k6sxyji9njijlzdwnvgblb2uus8i6glw146o8p7agockrywheq91j9t',
                iflowName: 'yxt2aw1mufhdzcmwuj705buy04ycq5ficiwlhvnpy7lhxh6a8w84hizn61ffindvo5yt0hlrxx1ia77sohvoip2yda78a1hl0f4i7ytnmf4g33xb5kpgtud5xvwyst13ozwynv8ekmwbvmmqih39667dhqdgbjnm',
                responsibleUserAccount: '90d6vd8b1kjsl5vfa3bv',
                lastChangeUserAccount: '0x0jbrauqa70r9n4ox2q',
                lastChangedAt: '2020-08-04 01:04:55',
                folderPath: 'thg3jsha0i66hm5q76pm33d2yd02mcgjk6zjhkg73phtorq4xaqjiag434u8qnupz8vohghveym0vysz8p50ek28c77kd6ee81if3e17u01y2w951usf424n3m6pzbnzu6yu89p2kcqu07bipwwks2supcanwp1vnfnf0u403gavy6gcaqwv3xt8nagsoypvqhahlflpnoe2y0a9xofcgbsxepu6lrz0hts2fqyy9jzb4gkahbk5uerqpwja3o9',
                description: 'lcpv538vfkqqk5fbknc50a625ytotmnz59a26z8060lzyf7denl70w8rvzs9e8q3jg3h81i5ekxs2hpcmdutnjbogyzwn5bq2okpo9sxgvsk0ci66a6kp7kogc10nbmbelfoaxr7do9p0nr8rt2zkzbeqxudyk9wplrg6uw4o8n95w5addw7jnhckphum0ix4b45vwpfhzlymfql30gctwxg1os8sebkyg541jjks1e3fwcqgnqxvos171nvxxz',
                application: 'swj39nk5gupa0jdsetyk9q3b2imgjiwliucosqp2bd6clj67rskl1dzkbxhh',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '8f9tjemds3527klwmj9nlxo0lincds9t86bh1xj8',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: '86r8zpdaz9qsp9w3m9ge5dgu286u15wt4xn285gojyz518a8wy',
                systemId: null,
                systemName: 'pvtlcwslz9qon9qki0tq',
                version: 'aqgxh6w2gvqs8lhah0v8',
                scenario: 'cjh5rfr7uznb1j4f9bsf42kdsv5bsy09z2lojrt48m81ti1duy3vn123wsh4',
                party: '2mylv52x89a0jzxkohkxknbvq9wfmkuhlqg6nfjc8y1pond05gbon2xsrij9trjdfj9o3yavgzm0b1mmof6jbn9fue7b55tkplqyyky8dmeiyb799qul43dbtueoxf3cuv0ozy3pomcujbcxzev6tgndf1rtfgcn',
                component: 'gi31fna41bosjuf1zyc4ifa85cj2fz1ghsomtr97x9bc2zv6pxkp494sujwqm3t35rj5opjhmj88de16ruz2bun4jweqv4yvn8ksrf4y0gp7d9j9zd620uuek2azq9youkvg893ouuquupo5pvyg6bedy4itlwh6',
                interfaceName: 'dltymu92zunyqnttq9peby8ksoico4jsaa1eau7pptbqvfkvqsks692dyqm3nkie42eo07miomkmv380y3og0o6dvdr2j7ek6d37dbrug66zftdbubuocm16yr0n2fzsd0e7zpxwxqhqowx0v3yaaximstyfb9qn',
                interfaceNamespace: 'zvoxwmadczkbd89ojiuz8evz24qi9piak19p6oobtxxxmudsz02td1yr0ra79b5m2te14xh5b7k7a5y67sy22jxei3q0t4vnmljhtl8t441tb3cbvm79zwpoagyg1zfjhyp4ll957xeq8d9zxipaoffz7ymb8qpf',
                iflowName: 'b44p8pl4l7ls29vx4jio0u6196g93bufs3l674n6rtu8gnudqz95zqbugs0721pzrkylyhhkce40q1zvsk29suxn6v02vspuikyw562kgi6g37xkbo2ivzeqsgq0rt8vfwjy5onmkalvbl3v0fuo3d5yde9ehytu',
                responsibleUserAccount: 'cmo669pgdzhjd0fsqstv',
                lastChangeUserAccount: '7o3qgn9d7p5pt9brdce8',
                lastChangedAt: '2020-08-03 20:31:13',
                folderPath: 'qjrn7in0cmx5713gnbxgx4lj1dhzqjhmteer2hwykyimktcwpit59kfkbzwch61t794b0xiailkvv8f84evb9xk91mzh9lz8p0gvv3wh6odaldvhyghpm3q1aoo9d2phi4n9hxxmbpj2b5s3ydgkolxefmg3otnvy8sexhvopn7tz5exf2nn1260efso2akdwr0gu0r2ijxusr8dr3mrvq5nb81gwv3yj3xq1jq8xx1uh4v92jdonuufy4tstlr',
                description: '1zt7myopgg6kad1xysnt7za5vbh8syx4ywfm4k2xwl9cg0b1osf0865u8eufwdi6a5ynsclm4rbuoq59mxnxjlyw4ajj8z16krf551wo8f7ruesf6wpox3svh8tzy8x8qfeor9iwunhstcn8erty0j04xzxf5y45e1dge6xo3h5uiv1lva4b2y0zp5s6hjhoedjezkv8wyystf2pv1bjh5nn525yyfidy27vuttvcpkwwfhv5e78nc6c8x9fsr4',
                application: 'htq85h30cz8nidcnyobo7g7xu0yi5n1021zi9egr8gq9a36cihk71mwr5k3k',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 's1ct0iu5f882kxurb1jdqtj0brjb98j2puz0eefb',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'nyhclo6r15yxarlv0p8siz2xz98y0m6o3ual5okqhm9dp36gjh',
                
                systemName: 'wtp8h3pdphhadh6mp391',
                version: '8lei6ii7qnbi731ubwda',
                scenario: 'gz2qcutwf4xhp5ii8qw5d0o3riylh5iynhmlc7v4o3r0oifxkpw4mnrmj4df',
                party: '2vg7gfj3zhf7r4x567zfoe5m6b3alnf6xcnvpit9ruvj8bwdnwcowsj6l7av0ih911o60ppmkaof6m4n9tkl5f5ej2ykws3kolsjjdnqemcvyuiv3rq6i4rqx251gsokg1kr3qbe55n9q4pgc0prn88wb45jigmy',
                component: '19hzhz0hd3m0oqlq7mhk3tly059agjh6bfio1ybov8x7rmisoi9idla42rh267bz8unb9axtxr1auo6xqy0czb46b8lc00e85kn5dw9pdek6cdmzlxjoogbqjv5ndkrbfuczatt8arhkjpqlmxk0mqxtnajtddtw',
                interfaceName: 'ywzo4vbejo8wq35pzaincct4pe275wiz8yj7g7p4mtpmd1qwvc84e6qd8aryzd5s1ia0n9xh5w2lflk0gbwaxfqpza29dz8pkuyuat3qqa6xmbors4yrw9ryzn5ao4xypyos4wlun2koervx31n903ixn5ti027t',
                interfaceNamespace: 'jnn75abgjblwx472u070xjdxnrwq9r844j3xarqidhan5px9nk06xjtvd4vslbvbvu9j4a4ocrwnvytcsc5hfum2utf4fbljjvgkby8wwmvh8amddn80bj3f9jxhteh8dzhht08uktvc3lx2u3j039kvci7j5ygf',
                iflowName: 'q0ro9rpdspkvrz6as2fqnsyz113tltlbsfjuoynkxhic6v09q8u577hv60wpm4539g5txvadzc22379e5clhl3yzg3fon17y4mo90in9sxh6tdpind9qwx0nw15fp16ccf5gc0ig2619ht6biwuide6gkzdqwfh3',
                responsibleUserAccount: 'jk8wrl1wzefh5q6e8a37',
                lastChangeUserAccount: 'r1dejznney754vg82k5s',
                lastChangedAt: '2020-08-04 03:45:49',
                folderPath: 'aipg8oqaaqu3ocoypllevk2dsy44868twb91xkiht65ams8xl0vxvsuooo6a386wbsqaqyzpuce5pfgtiznbbocwljxpr4q3ttn4clqghkimoq23ugek895v85hf1s61en3ueof41df1dxkggjqs4a9x1f2lgvdwc1dxnoi2mvehsbw4t6bjvvr935tafvej6j1pwx6syboswtu0ajhu1z04zi2r7z9s36cgwstbdscf67y8hojh68mbau0jltq',
                description: 'vbs1zw06qeulels2gibyzatt9whn3f1z06tk3g4pn4r3j8bzoiln9fp3wlwzacebxw2680umaabdddzglzdrhixkhhc24gob16yxygnn6acs96p35xrd0bi7t25odvzp7t34bmj0cfzlrsogfs5jc9bps767b8iscuvwc2pbzw97avi8bu74sd11a1zvtbmroe35c5qf1ogylikzee5khcbpaqob8l9drjxgswz9ata1sm2y716k0bzd95wp71r',
                application: 'zwdj34522q3m23v7nz2ocnumoav34dqapbjoto79prpuhjq3p8mp2wn583ev',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'v9iwnygljvikjhaca41m2j8g7sys59pln6wzkf6q',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'qhfil5p9jyd0hnfw5vmk2dxlez49winjgqt65waj8ubpegegtw',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: null,
                version: 'cqgnyamxgv3iqxo7lk89',
                scenario: 'g6n2m1dq2vpnsiotakcpgi1vfxqe1ybs1ej8w9drq090slm1yr9zbys2ua7f',
                party: 'p77kz3rxqcljxmuwb2ne4tgiizbjfdf412vmjuaqfihzlm8xxm1k0c7g8ajqdkc5sr69na3yq8qv81x2z0jwqb9eqybniuq3uv90v0zna07uqzchk4x4fs89pfk8emxtasy5vrk9dgju9kepkm9dzjxrii0tkr0d',
                component: '6rhmlqd3lkfil22ln9av3hpi4e0o2x9t0dim1sdzfd9fegcy9zx8so9zkykw836u8bryx2m6xk1w5dc24r2831grrlz3l8tnyd88p1yzm4aw2zqlecozkyjx2rsoyb76an1e1s9b1uw0ayt5mjkntb54o2usv1zb',
                interfaceName: 'wtxghp9hnt4h3ll9dcxncqmaq7wogcuk7xsga725s4wvhw6api2g9u065b8bctubmq7tcfzpwh7iux32ba69ihw2grujx03s818euzxfn7e0y28mr3zvb6soe300qg7zbh7cbl2nidkac75ogmjb4f2fboxezfpe',
                interfaceNamespace: '43jbp38kvby7hcqaj3p1xlmowlduqgw5pglxm2xyzckgqydtmk97eyuk7hkaekcv06ritc98fi7l7nfpjm0n1tbhxnzqgxkotb3bfmcpj9qo4es85fwzje87pz9kn7d0o3dtfq7e7s3ix0k0je3k3bfwuy61ddwd',
                iflowName: 'glfy9y6gzfce1b8gboawgohz1glvnq4fyqqmzy2uqnm5a6fo59b1f0dbo7iq5nz5sirzod2vuwjupepltk5ulsou3hpxxfmaaruk3no6uhrtddnaxb2ip0x38vpsr3y85pzcqxpylzx85a7yahmdewypas3cqq3r',
                responsibleUserAccount: 'v2ymoeaou9q8ug2hw168',
                lastChangeUserAccount: 'z32dvg053e08vzdtz2pv',
                lastChangedAt: '2020-08-03 20:55:01',
                folderPath: 'etlo4n8g53imdvd1p1jxv1ic38bnny91w5cte62i3js2wfn54lrekpwa1oz79m4svhdci7g2262fhkbivsw0wbm4ws608xpbgts8e0fmn6pp8r3q26uq4kg1ym3qs87fryhcsd1htx1qljjs9jlc4d1aed2ol4ipwkjfh1mlg5zwvctbikh3e8bwxumu2a0lhktzwe7exub8r15ghakvigv5uh9nzz29zjt68z9u9vapkuoxf72humiixcx99rv',
                description: '5l9fq8504lg01jhmu6rbg4yvp62no3ebwaqvoht62iml0399dlrqv3hvvrt1v1na1sj4sfh6ijjfii63eelw79i0vqttnp7ptaoz4j1r5wefb86twk6nodmy3k2cx5za29fmac0cqg2m5fpz3a5feiw8123m5y2a0hxa057b7lhqdzfesquue91vhqhyhyqqpcugk3r2p56usjgquur4szb41t832goakhjfnmzjxx4w9536883dc6v7ar5avpk',
                application: 'txi2bhd0gd3fyvm4v0hl4ka89t16exq6b9ic3eqwhjmzp7a5rthnbj19gjur',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '779px4k075fh4iy1luf0wtkty7587xzkv8ai9ccs',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: '1amllh24sm5uw05vdabrmp2xnpp95wnsjhxe3imjuxs5xvclnd',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                
                version: 'tu1s7fnma0hlc3em4yfh',
                scenario: '9wafx6rdss7oe8ljo4jy0xawajgurz2n6i2jrrw9a15s7hb6ieyj3aakhn7u',
                party: 'wq6c10p7yqzv21qasj405jmy9waw27d24a67vzi8bmrsedzn1w7jfzkp9k5hb9e71fytj07337rrqcyfc4zwrut8gb9rqumiteuixx547eok247vjx1fp3xtys2qsaebypfpy5zracfmpc9q7ttp56rytx4sgtlc',
                component: 'xpdravbgick8amjjszp9i1h3w00mc7qin1eidi9kjjnluiwn5gmz12q5yqvyjp0mpa3zjq32ojd8o1c0qevfg8m6nw6fjk8tgsinn0hxnljwt9p5s8gxrb2ncb2p210252jeu7h1thlphgxd08ff6hqrkowuh3be',
                interfaceName: 'f0vch7q3p85oc9uqhy8pey7i9g7q60brmek0ltvvqmg9r103cujap78dvag1ohd5uht1pk6hszd84ak2jnf1rm9pxw1l1e9fytzbl2cjnyeaemps68ulbb7slfl5ac99gzasuodgdv2gnr8wlwop9m6n67j2xu2k',
                interfaceNamespace: '7haqakk2d2jbd0kjt60ooa8wrxxoptvoulcjcidlf7e2xezahq117bk4wlkwi1sa4ks2ea84wscn5804o2kcwwoi144umcsof8h251h7omlm0ckmsblt11fm3qftu8p5kmlevteciwoh9y3g5aer739qiu2vis76',
                iflowName: 'qn2hrhamhf71n6dl7bg08mumstkvjflwnpp1z6a0vpb7wh37eumhpmktge1ftwqqep5anlo2oaqik0etb930qe0cffq26lc3ri135ywo9m21is1yrgt8chjpr3326qm5mtsgvc789ly5so5qfnuacw2m6xycf9uy',
                responsibleUserAccount: 'tcatwwebtheiyjngzezd',
                lastChangeUserAccount: 'l1t50p7trmxxdmkqxu4z',
                lastChangedAt: '2020-08-03 22:38:58',
                folderPath: 's225mof9i2zpbmrw4t7t62nl9asefub9qa7uwbjr9tkzfzo7rrspcekia7npwb2pnpf9w0fa4aea6gap7epg11a86fydyq0f4ga7ulzw0v0kpaxpvt7k7tdfwxtu0h66g9baobg0jojlms63hqfze53oki4pgzv6n7vhnfoaoonjsi0oa6bqpqdy8xvxu5yg8s989fzwc4z0twug3ieh19g5kziup8jzwl6gi26xt1fokkds7hcq0qkrm6ygxws',
                description: 'ncs1par7znniur26sq2r91cyy8i6h06y9ir4phhjy86rwc9ngq66513i5r7vgzaad28f94m2ic77eq5is9slv2uxfeq6kzhqrk2hdqjq7bncsiyeh7vaz3h88ul8pfzbk76jnijd6jjywcnojk245fuw8m8xy6055dr0628vaqvia1v1n8841dnc3lrpdvz9c0qnumm8zk0w4ra8kqa0b89wrte84ykzmiut8w0fye5jp7quglff767a01bnvxh',
                application: '21aam2tg1dwrw8ezlzzu0mctiok63dxbrl8k3t88kvdqc9hganguzab4sluk',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'fy0w8yay9w51azubht99vz50qx4ivc4pqlmfuf57',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'thdw07ipdsbvshiei9iazqsqxckksxnn7wdkj08h92dcg3k68x',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'cg50uqaf1mtt84r82ggj',
                version: null,
                scenario: '91a731otnta46pwjfcdwx2026jc3dri6lstpw0r0hqwa5f9cfm85noobuoag',
                party: '6ke5rig355s68jp5rgwjfrd2bt4pudvkrsygrz52j06743ykgzx8quue07zfx3yz6u492894x06u0sctludsx7h4jsng0v5figpmh3m28o8xyv215w8pombzijzeyeqlmi6br4gknbc5dc4xy1b9c66bl8k5ormr',
                component: 'blxoevlqt62w2avbw0tfcm224iim5fcjgu1md64ey00bxqpyeh1mqnpodqfv5wvi30k40nfhgt4ynqx8uubs6yagi5fwi5irduxnfh8hs8ao0f7abdjerhalby6qxwkhcz618yxhyy4qi35ee7y12k47jy0ekk6l',
                interfaceName: 'i1hb4ntj7otz7ukzofveeactklyuucw57r6v8agtyci442vmj59oumc3i5m8j9wftauvidltoofr69v0i6i075sj8rb4o3cmqtl34evpgnae1s18jtht7y3kbiv8amwpz1c74ybdttsbmofpqaxaps739i5h624g',
                interfaceNamespace: 'nwdi9x191duonl6wsfb9stxnbagcq22zduh6v9mqdtv8s3t2gvhdaywjufwc9heda6tlqe59g86q525gttmq3r2xh2kqoxc7ydr09mk8rxxjo243w8lnqna8zcgjrydybxjx8qcrxrlnd0s9w1vj0ms4sxbnahcr',
                iflowName: 'ezire44j1eyk2okum9z3xgoag1zwt0uq0o7q6xkfxy08vntpbc1vb3s4xukxhfa8tdqekag9d455hvtvbw3kwpgx7gq0vdh4zpssmcnr0y4qfwy1ogp4sozwynturzsskmqf40xskkh4d6bs3bay4nskhg7xun4w',
                responsibleUserAccount: 'vz0qzrv7i1lqfatffkz5',
                lastChangeUserAccount: 'hb2i1i1z4lghoho5rzrp',
                lastChangedAt: '2020-08-04 10:03:55',
                folderPath: 'obusf4xxbqk1mhtyykzl7ol8bk9r6fez1zdb2qqr3imrb1skoue9cn8o0bqsd5m3fpawdwb622x2ndb6d7ekrbwhnfvelbeqqv2tfeku3tyucyndrvrlr659p6nh37wpyv4mgtky2inytwxp481xvl3dy3vt9or08b1202h90vfqxw4yl2plgo2yp2p1xp4s42r3oafxezamm8t0fnb6l3kj9dvij1uf2il7wh64o875b0tssty6x421rxqudor',
                description: 'ndi5a315lm60hf6xpjigugdh4u1yvm6bqxpnje94qfpc47kotim4w1bk1xjoi724ir5hsl56ct7h8j5wj0rfcqtb01hcdz9q70hhyz6cesq46ou24hl9keljqk9l6sdnun2g6uyuah8w2bcd4bndnqqtapbinl96x4cu78xhvux19fmsp47oyp4y58g1pyxi3m0papryqsgyhcasj506gulvc3dytl2wn3329ohfct1btunc7pienjfkxeb0qbl',
                application: 'mwl0ki1g0jqc0cv7jwnuprnxn64le6qjodtx7an0652pvz01ek5r7kg9vj7k',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'y8d52cu5wd97bj3bqcxc338dxfby9ijucbuo3hho',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'emx2n65sloonflc3upj70taa7ruv557e524fmxmd7qpplfsgav',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'z3pxfl8cp0akvc68xeke',
                
                scenario: 'xz3yyzc0pn6iipe3ails529xgzyr1op040f76yo9dk88mafzzc8nsx8t8ert',
                party: '6dih8g3doxugx5e4fthspj478l11q4x99vk1gx72yljettg5ogmim0g4keq96lxn4dmzxidg665crzu51j41z73zahruyz7n8uoo91c9wgnsjtzlpozl8eotw4p568g83o5utt9pflm1p8nsjcyc1wxsbwdk5qr4',
                component: 'rj5vor9ztbewqb2l1vhulvfl1ass7d37n1ioluhtmx2mx86wi312wdpov06z3cf2mvzjbrhqve7j9vndleto0p7wrjjln31507hkzv67cxnlcdyg33xfupnce718bocf2n783y3h746p6jlcpo02lwzt7kegx0zr',
                interfaceName: 'twtup5kguhib624d6ty3hy0zj5jtr8dqo3dmroigiayncro1jix2qe1psgnk44hbyl57kawe87d8tm59g1y0tnse25tjhcv0s6g51d7sew8u6ar0s2f6zwarea46ovoqnwpzgk5hyebgp7mc995q0k0l7k107eat',
                interfaceNamespace: 'fgbsyu4odduop5ogkxmjr3dwk2p6izrbucj5hd0w53ngv3ed5qor8v2at3lwqr7bkgqz5fmqkukylk57ti72exhl2llnhb5b0a6irgpmxe2pbwncqjw3pnui6mnfdf20pyf6tczs8rlh0qz6faa384s0ftmydeam',
                iflowName: 'o6p5pz97mq14h9pvd9oy6biwxm71g8hz69ioz2qu4odbj7ni0xp45v4e9nw22z4losmbfuv42tihokjktar9rqni970xjo5m8rm7jkihnxmlvucjq5mcmd42khj9bg4dfmjt811v9lteeqfmd1zvtsegpzk92m3y',
                responsibleUserAccount: 'u3n001t0gxdhb4vwr0dh',
                lastChangeUserAccount: 'nlsmxmj720xpszdeatk9',
                lastChangedAt: '2020-08-03 17:39:52',
                folderPath: '4y3xwx0118sx84ho86r1f4u08yig9dee0e7hi6q6jgwgete3npgpiyrajjqqiwz342211xm3qcvk5a9eycmjakq737iz6mlj53gs6h3vflrpnmaq6x2iqklb1z2iabc9idtexr401iyoh7uz7donc7hyvq9fcmmip1djgsna1pg9qhmt5sk3bit5memm1qkz6r2usg4tqhsbr3omre3wb7f1fz2bjyd43f1od6orblnvi8n2fup80gth0evn9bg',
                description: 'gpv0kdpp1dl3pr5ra7knzr6c1y9bnnkvrc5tzehjnjm0tmmqmj1sljwv5l1gvr17isqcvws50ie94xe7o69vf1aj9r719h1cpx52cawo742pdw9mye6ldgziocbyd0lb776olfn3wjszsy5ojhm1h7a9h07inzwiqxn5nolyljck0d5lhotwtlyd5shl0ydwz2wpjjwf7fdzwf0ohioz8w4hyn7rxm8qf11m596awnq5xcuejf90pq7vzzdt1ea',
                application: 'lib0kv7b26b035px9f317qclpmjblzaw2yldjbczkqqk6sxlmx70ly1vn1ai',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '9n8isv98d1l119p7gfjk230ue2zqepmiuaw8x3ma',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'k4pz3n4wx6x0k5wwe65k3s21vnemgorxdk1netd6mivparbggd',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'iahn1yok8khmenbc9tx7',
                version: 'srd5qcf9a4tfrerxnskp',
                scenario: 'xsucz7tqprls3zigwxzbhqhu7qkybb4iuk81743e5ylk9etn8iow38f1vs24',
                party: 'd59n4v000z1172gpq7ye1f1922m6qgqboynslcwm61lrejrpr3swdjkv5dw8fhwu4jygbvs1zuvj427207jqdplc5wi7hpcjtyt1hqd2gi23cq9f7l6321sya73qfifw4xldnwqq3bzzcz7kc4cinhj2s01soj4m',
                component: null,
                interfaceName: 'vht3ckje2fxqe2o1q3k1go0224ufhhcouvtxpuj7180le44xtmzgzeext25dh5r7orwdlgsppy7t7e20pwpvtx6w4bujrvy414ijtedis9fa6jk8poyhwfschtli0xg57pkaj9d8d9s5m4t9xbblswk4lzsnbzvb',
                interfaceNamespace: 'v43jlfeo7pgs56o74u7246e4j0qpkz3onaroxsivx7gr9ygtrnn9hxdlavrtdlw3uwjw1766cxmny82pt7s7kvekjs75rkkismrapt7udre7zse5sezs60qco2i3q561pf1pre2hh3dx418hnjnr0uqoh1clc66q',
                iflowName: 'i0pkb1tgxs5yvdcz5gnmkclyja5jlw5jp59sg1p4z7qmezxsw73n30d7ul6x7xmtcwr5jvu16h42gmblvtghs4fxus8qsdfl4mfkxsjv2t34rzrqsgkls0iqb4pxblihflw50qizw25zoznm5qbzfeatsm62h6v4',
                responsibleUserAccount: 'j9rga6mbi149gqo9rmhj',
                lastChangeUserAccount: '3elu7ntuwep55in8ggb5',
                lastChangedAt: '2020-08-04 13:48:59',
                folderPath: '83yvda0r1alcy3der2gv2sx14xt5a0addoh96ycfcxicphbs7s326fgh0llt6d1mxmhown1xtpqi0yb9vk3v5ltbhjjr653504k9p70ido19kqnqijgvd5bg0tncl6z6b556fop4kw4k0vzfaamzpflpdjjmbwx64ypruz0flojdzusdcsgkkhdv6bfeyaose2nwi7g7w3725u677j1nynznxotplxphl2qotxojgx2w26qdwwalcu7m1tjspgi',
                description: 'esh6unaljf456deqoqqosbozco2ryld4mxevog70or5jxyu5diggahtqor1pzen5b1s49owf9v7gwr8oecd9r0u8wmp5s6s8tdrdx4hnfqpu75j7ecjmzosunjulecdccth9n4g6ns4vdubyfp8d5zzgnvpvdb3e3o8s7q4gfrj5pd1qwyaxwt4gpjoymvhsf89azrkk3ouak0x9ckpbpp048j8xdcieo5igjxoupskxugqo4vofnytfkt633um',
                application: '55vmmsyxxfb81ymd2u8bvirbpitnyeskgqv316t8v7m09zg16ioscdn8cjux',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'a8fn6zhhq9wvd9mantpdceqr6of54zabfy30u90a',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'adzd0b0g7u95ii98fg3tgyr1v4aj8zv52ko82hnyjprg7eu84b',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 've9waclp5200y61bfjrq',
                version: 'p4m1ud5l5g384ubgq9bl',
                scenario: '2g1305xtkxg95vqiaz0witx1cnm9wtrtq1o8ue92agugbg4r5zxb5dyu66d5',
                party: 'sf1jpliu5uuoo8xxcrhf1y36c22tj95x5k1r68rx862oze812h5dz8i7okdmn1p1tkzrv6b7vazyfjl5uiqf8v4y5r86wjh55uojylds8p5fjn476l1jlaqzdfvh3aibmrees3su08wgaw9ljosvso8ezonxyeeb',
                
                interfaceName: 'zxqdd1xb04xiprd8fprl4azbl2tw0ph7wf3l76a2igtepk3icxqgpsnjz6hdj8j65og2tthyrqkafuyfpo19ubuo48bxi1slurbus8hb1ba6or1y7n5ciu987dp2usfgxmhj3pc5r0gz25698uq7nnyyx19qizyx',
                interfaceNamespace: '5wto1ph91b3i5ta6qmalg6d0vqo5mk87muvgb2ly35k4i73p6p51l0pfqucenh7ro6fbsbnbvubdeqb0qycp55q63mmpmnv6ova9rgngd8ftafulq04ed0vogonlmtkxk9m84c1vsx3cppy3o41k7wmmukh4a8tr',
                iflowName: 'evt08blmsz2ruvak2u2m4xmpahbmt6zbynd5bp1tzt64tsjxl41e37f2emgpx67pliyvplz0gewd09vdf36vt6yvpwnldcjsok3q6f2w4xh9zl0te8ma3nvqyux62nm5j3nu7ckft2495lp8h96dyb7nf0zosuhf',
                responsibleUserAccount: '4r3fm3y1pu8ba0441p72',
                lastChangeUserAccount: 'nomsdoadgp36c25qgwyv',
                lastChangedAt: '2020-08-03 15:10:50',
                folderPath: 'xcal3fescpnhl3sqp0ndp2dnm31vnwlotn1jnp9kpoyg949m7um1bn9gmx1vva2ns9h5ai3t9iiqlzy0b5g46qjoz34jewyu6x19ci46na6g3c41upipeimjk9dd3lv2wjpnu3gw96k0n1edzl8h6qjugmniqg7udpl49gsggm2msqgpadaey4s4qt97drufio2j5hrfdn02vq6dnd5g90h7km012bbrsri92bajri16sma5wuwd6lo33c0mk0q',
                description: 'oxykmjwjrshb76p8w0opk3r5sgh69pzcozdrolw8hirwul9qkukntxvqudzbq655cv7i4a05nfptxlfznk0j3ysj8di4riub5ovl87itzo6fkr3tevmwrgsv2kpd0efhw3cw5ojsk3kzognq57stdvntx0ez3t3fz5sdgbmqbu8a4oqdeepc8o4305dwmw9eclr1a0174n941kh11v65qkmixp03xpc7yzi08ll6k07k1w9jsimtllt4vouahox',
                application: '846xazcql5i06d3akianzwqbiaga3d9bgxg41knwzwpv0foglm7jjewmwf5a',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'l8z1ugwjelugc34f3j31pt3lnrl0gfbz546tt4y9',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 's9b7hyc48vz3zou8jyt0gws4af4o4alwmawggfbxiebhd1jvyv',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'y4zepndj6x7tj54aistp',
                version: 'e5zrv46dtg6kh8hml5zk',
                scenario: 'bc119006xsds2dlqjkgdz7ht30q23r3eaobvxosvhi2st1vci0m04rqjf0wl',
                party: '8l7yiacaz8l1g10uxbndylwbqmeyo0ybuikannj7i5omwlwzr0szqdzfr3dr7j5d5c4kjqadedpffue7wjhzmuxfg32ibw0onuu73eo2fho0dx2hi4w2g2bq45ncbidlblcm5s638ztm11opc4316j9rmlkefo5v',
                component: '9zlrhpzopf5czjupe3qyacajbhz3tw1e6j0u2d8m3n7a9d0y19z6w69g0uxj0iw5yz9k6qx2xaehtw8v0jme3fjw63wxdmwi51ft8yozof04on3nysjhhai9348y4m4esyvbfx6okwzfp3vaqbxv3vkkpmb3ty1d',
                interfaceName: null,
                interfaceNamespace: 'mrnffmat41vsodeujnwe789l2rcjasrnhm3b4cuy33pvu39o691vvedbi0jrxmcu83a906vfcgpqm2q1x2uww4inup6atitdd9c3z8qrbykleb8rt939exj935t1svzo4i6jyqora82otzvtqtshqqx5hvzww5h5',
                iflowName: 'c2f3bboerkevyjcek8j7ldyciu0rb2xhls97dupf6h0e1hg0a1m87xvnd1b1i6oior6wdk3px7rkfu994uo5aeijto9sfpwnp6ieom1nva2uvxqi4bs69v89wygfkjlr5tf9cxyrp8w7rxkyd7e9hyecya8q266f',
                responsibleUserAccount: '7qc71uw72imoh4b88ekn',
                lastChangeUserAccount: 'f895tba2ue9s1dkkh840',
                lastChangedAt: '2020-08-04 06:18:49',
                folderPath: '1mnkr9g9nk5tb78ipyxqs65lkwecpaptrrzyl00g5166481te4ttqciyljmvnugwt5iyz1lq2vrr2v8eqvabd1sx6tj8lkw7tmmeucbsoop95enszwg30b7gnsfsz6qw7k7j98b7ject49n41skjowukyobfbwk970lqp4gspvzoq66aowly0gq8tp4pqrtmik5cwqk3zhrjycrjld25t6v52pznrz009ldlmaiuzqguzg071k8w80y0797js6m',
                description: '0olfp1u8ia6z8r34e9ubzfrk2mdlk7vi9chl4xct9zlgn2050nlfhk2xao3idxejigpv4vgt60sokqeuxztskr4wphejgbssgn56abp9aozad7u9svrwh94zm5ewhl58l1hziglo376m9wj25ntz3vxat52bywco0jtfxwao95dawugh7emsaav769j61vqi20qr9wgwwrig0zr189ws3qt0gqu23qhqwi7yv78zsxkbx2604466arty3ymqrj3',
                application: '4j2pgnipfmhxj4kspf55qhp9hee3suimh94pjhwfhbos3anwugz7oylpjb4p',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'g7ocmk86hqmy2u509ekythbjx83arw3dcelgmxuk',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'f6dn03w9uhbscbcdmxj6y2bedsqyxnfkw9h4kbb9zum326xg3b',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '54dt7cjucl1vmbec64nk',
                version: 'til1ufprky5wkqyfpl46',
                scenario: '0b4xe5hwb7whas662090aff7gf0i6663vjc4n9kqmh8mh8mpxmjpdym72gn3',
                party: 'lhswwduzw3v22e232fa7t2wro2qasv4wqh97llmql2vjrftk0p18z2waasxvj8hswxjpg834mjl5h2pv7q677aeokftdwwdin7urej4z8h7416hfvlxyxkf6h5p4mpi0oqdq8kss35wl9f8ssbe4je0nrnb23vtn',
                component: 'w7ar2gsywl1h4oa6rp6md6fl8rsc9l9kdzsfrqcobugaksqgoq4wsscenselskpbghrm91kg9h0gs5moi3dwzm86e5rc3cfrruw284wwx2lcsf0zqnba6tqxtfi3jl78q39ym0bkblvfu0rxspb8kwpx2niolivs',
                
                interfaceNamespace: '4atbzo0bddw6gjhlug0wsr0lyn9hnsqvhchq2tbrvgsw59t2hl430u6cxki2z0pflxvxewgttxh9w15byw64zlmtrgkwxcgetu8n8psfcb0ikaao376tnbwhixqno7s5r04c2qk5a1ijanoydqfa9whab53xztcn',
                iflowName: '4x8vgbcsjza8h6800x4ax1rr9zx7x17ij5ngpdep8wa2z3tj6j2hpbtevth0ilos1e8cuya14oh065ebmjp0wfa1m3ltmnhaadeniq2r8qjmlkg6lwtvvzhrlixd7ppbst2ze0r53krhtykkjzvleqy3ngif9l3j',
                responsibleUserAccount: 'qw5ktx738e5yhcgyfrn0',
                lastChangeUserAccount: '0qxfbv2m07icjbvt5bn6',
                lastChangedAt: '2020-08-03 18:12:30',
                folderPath: '55mo4c2t2pvg4m50nan4o4c7jsb8jdil4p39teyjj3s8ll1rvc5zwq2dahlzsy4jsszdq1fjtmdlrv4fzslsxkaa4b7r27c1gkmci8z2x6wutzfd4jpgcugxxkgbyt8yfbrbg0vjij73e0i7mo2ejd66ta6e1rmc0ygor72b8sezztizcsebcj0imuxt49ebx2o6gbr2wj1iiurqjm1shszurfs7eoqv3nvze832rzg888uuqj7rmmesa4zjtmk',
                description: 'hun2zyrz99fd2171y2nphc0z1lbalcfes10o8t8fpob4r4mrjwajy9os6f53svubzsmeq4t6wh687kquhj34q90hho3ysl7bchdkmzx842hwgc7c7mrjgg3dnbu0u0raq3e0clng71o1ckepfo69rw8bpplra3kof8ofyo3dk433luhoj1qvun9wn62ntmffls382t00opyyrari90mo17jcrys19m99tqce1nddqazgu1n6ny0aa06zrdw1bts',
                application: '7kv6k1cebqqhanmgsmysc7q20o6dt2xx2rni9qp524klj6euvtjz4gkqcaxn',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'rztpljxzjo8l9etu36ypqiq6of5cwbn1b0vpy8h1',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'nttbz3tqlgfduwl0otkjxzraihxl169howjey75xm5aksgqj3e',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'v75qort2m51l92b93rl5',
                version: 'lwveieevgp4wvdsh74wq',
                scenario: 'owi69nuqc5hjkblkcsw9zxxnfzuah73kf2dhhj1sil9iqn3mc05fydfixso7',
                party: '4ai0wnut7lubro1thf051d7ppkdt6i34lm1nk4quu7r5aw7y0nrsrudfd5jfdhbkl9rg7tgl287fis79165o7l5wze1zc7e6h5tcsiwvdqw3024mk6y2xm53ftr0ceflutfqyqcaegobebp32r7csce8x5p838vd',
                component: 'xu9ns7piiymmj4y52uj331o0vevfp7mqgj797bnl0degxwl9ae0z64hzc8b5dm56k2tcphiiaossz7d94y1786f5yle5ws1sz92j02xa9nb91paqt9ke3psphcelttnfd9y3wiwez3pma73qey3ryfuzthjnm63l',
                interfaceName: '44dbkexn5xvjo5u3h2rebvsep0xqx2p397hi55santncz4sos4azid6ky2rloiublwsw1ikc6hqnditqws6xd718wyxt31u1rrmp7eaoxp46b4wr2n3x6byji8wthwb7auejjt80zp269a9la36lt3duo4xvjntu',
                interfaceNamespace: null,
                iflowName: 'p6x60fyv73tarbqcgv9u2596h6z2ps564gna1qgo2zgnrj3m7is1ww62ger243tlzzqfcxae21gj94ixeiucs9tmn6utowd49ndpndly5uecjn4rs0iib80b3ws0jz65izit91bo57huoi9plui47thw8d6enowx',
                responsibleUserAccount: 'bqp2epsr9io2d54fyu5l',
                lastChangeUserAccount: 'ae8jbptw9khtz2y6mkih',
                lastChangedAt: '2020-08-03 18:53:12',
                folderPath: '53vz3xm7166xt65kt5v2z96h7yuzk36ln3w86npqwqx37mgh25u290eqrikvl00pjth8u9s07facenc9ryi8x4lid1dqrwxtb048uupj4fuof57qgg8ztcmwbg8bvh6gr4sbymyp33qu5j5gujl9j1b9f2x0durz4g3iibtqa4en2a1m6wydyg091jhew11inbjuebybbbgizqhi5xk89u6gkevqmdc5z5wnjqgvvdvc3xoqg7kmmdkj4p6llxz',
                description: 'tvp125ys3zzl34ijt00pu3i3x2ijlxz46yexaeu4wp8ho0qpzicp75blouoxd900q7lt1otun2ook2sjmwh273lpu86z3k29i725saq4b0mrwdezmt8k1hkm0e58jrfu9ph3puqpoop5u2z5nt3keuj3p15mdigxqoawgigkdhrj4c4apn77kygu7bllcsxm041ufsyih81o7aa48zzuysllzz8z5r8k3chhk6vevxmt8reyzzt0orqgai1vrio',
                application: 'ascsq0x3ganvs2u36zkzwvyyf2q8th53omu6a8p9t9d3p9vsrj1rs64kphbg',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '1hgrb2wunreej8ddc0zn9udoeuuk8f5zmdp9ta68',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'ucpcb71w4y4dw14cs4nht3q8b43jqwaof9zminb4zm3jci6f9a',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'xgiuf2lin26f1vz585u2',
                version: 'qcj4j624w3bxx4aywn1f',
                scenario: 'l9u0b7notvxkkon40lbezw5xydtnacwchtspjtxwqrskp3kj2fu7peumqnbj',
                party: 'aymbrbl63xlqucewe14k7nggigwlmd94umn3cu525rzdcka3nzpkhbsmstdx54avan0sovgk7xg20l9uveiu108xkw6clb2oc42ej707q2gzgjr9vvqhqrfkmtokunr6lavz31bze9ji9jz6yac6qdqaxradn9nc',
                component: 'xvb5ea1fwo8li0e8tpb5eg1jcwxut0cxiuv34glx7ro5ttchc0lr9zov1r23hr4aj7v6y5kzuq1ptnl2q4218qm4bivj848nl7mppgi16sv069xlbibm4nm3vgkpy8pp7ls5uks0yjzow8lxynsg5kyvqxoc1drp',
                interfaceName: '1zc3629wyvs71qk2ko3xyd29ccqn3fo7odzcduocok9htspcw7k870pv4x3qofqkevgkjuksjn66sqiut6gdn8uuhsb1g1esjw817tjaiog1ahhs6dl0bozzzq6x27kid15c8to5o16mob80v2u93j7xfpbwvtu4',
                
                iflowName: 'dx7pvn11aaeyaxmf113wf9nrmyle3hhcd8xs9s98zvinqcjicv28wxwpv89s1mx3x8d5rzdff7j1bzjubphe3aok6cmu1ynwtt9g33t0g6e0jdhoh3xwgkd6izdh2qq2pjt0nsbap9ueht6daiby9wbkj5z6bsw6',
                responsibleUserAccount: 'nwb5pnqw24i1dfuld2i6',
                lastChangeUserAccount: '2p0dot1rous6ije0ajaa',
                lastChangedAt: '2020-08-04 00:49:45',
                folderPath: 'so0kg56pim81jhg13zco5fda58w7mf3j0wmzk5rscdumo4sdo9xdwf9h735bq4i4mr793pznf3odbntsaw6w4aauhlnek5j12nduc19zf1q5hjs4h9ql5esewuyisw9b4aerd2437291xbazaxr0fw22fqjp38jt0qzu5ephtc6okirbmnxdcylfu8hjg95yo3n3lt4hcb4hx52ttce5dgaf7ba46ku8a936uqi4jjdz3c0e8720nlsayy7w2ph',
                description: 'x988ffmnrt4bhxk5op0q3ybt5rxzg14d7jruzhx2ty56uth20uxfcf8nh9tizqs03upwmoessb1p5zys5hmdxjefjoke0zyy4kzafurqr0k1iwl7hyglcqlphg49be93aaf33e98mbofpnomkbszxn31u821q6w0e5lxlg755fvj7xmfkitwwkzww3xz40g4cevmld46qzpqeoh8km85kadiibfbsqk0bwb9iwbav8uxeihezwct0bglbseo68i',
                application: 'ykhyyoh2jfjsry665q7z9p9qk2hm5r25y2ch3cc40zw6tmcpn32zcrglvpyf',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: 'aao0eusi1eokgoqzx3uaxfbr618o4sw0kzbwl',
                hash: 'm81m5kfdyqpxm67rmz6kj1zd77ongnu20woqaf38',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'evbzpthdslody7gtrq63xoqq12q5vmuvthl35s8lehbcwo9laf',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '92myoh48piwuneat0r3z',
                version: '6pod3lriw01r4bgiw8fj',
                scenario: '2jhr68buf4v6eoh5cm8nmtju5250xfqu0t7eav4go4cqhsx91p52yzeaib8g',
                party: 'qb1t49prbae6mnfk82aaf3eujik0d7rttk1bzflya3l4pzzx258gnln5gwzg2e0napwbm0sngktm5mfh3hlylxg2c6aguhgdmm5ol2iv0rwpyvy8xx0w94fxbiqjzjxtf7j283dgecavkacp3vpgmgcsj0ihzb78',
                component: 'gopd2s0pn11hly1tf8xjdmb6y7r5vjpdyf1vooovbky2jngt7tl0afy79bhxij4ac2729ebhq0e54bniv59pqzxhn2zsli5aj83gllfjl5ow05zs448aphlcv5uqs8bufg8tpoi3pkk9nk9h904hxe5uba2hgb5r',
                interfaceName: 'uls34j61i62nqkkq5r15b5zajqtwxevztqshdybyghgj7f6ocg62aei4z0z0vfz3gh840zg6rslelulczrf68zlywjn65k1izmx2gz1fxykeaih67dvcse16lawumht3ryqhcgbslzjysb31yg11u64ztygs6bdx',
                interfaceNamespace: '49ts5wscjrh57xviwgnk7qvn2m0xy9pipy6ey3dsibiy1ffcr683bc8e3ppokg8yaxmtgyre06mc2ggcfm2kt0e8nkbu5lfxu10an4mp98b0e97d4efisood9z12pgxyrqx5xqlskuhw9digzncei2ifjc4h1r5u',
                iflowName: 'wzmwqub1nql0ii3i64jsnkise3a55dr4ihhoar5y7o1vzb29lkylp45x5mra3gnnegyqs7ftx0syaytddyblgbma1rsbpjw1suberhpghnldi3p0olu0gwi86fqngtgqxqqoyekrlgqzgra1i4jeiyu42lc7rvhg',
                responsibleUserAccount: '99yak1c4yquave4w5gnt',
                lastChangeUserAccount: 'pnq6ucmxd98jscew2kia',
                lastChangedAt: '2020-08-03 22:28:48',
                folderPath: 'l9s4em4z8ji0ucccm39iwldkjia9716zyh0lag2ljojze1e6uvlfq6pdcx0q9o3d2igi3kts5rz4thakfxx1wjopzdor8qdskfzc9ph06nsnpffcxpc5k7nof8xs25j4nlb9vdffp1atze1pg0pxwiueai68hbutzxmy4jhwur09es42euonj9whl580vyjigpqlu8uwylby4pjt29hoxv21bifk8ypizklbsk34qx3iw9p88l4ynqwv1me9mjt',
                description: 'sidqrqu6exuffz9j3lbgtqdephfylzjky8r1a3b3yekdksq26vfyu3k05u07e2b4umy7kpoosxbf5a3mnq7kkjikrrkk48rht3wzvvc1k7w5ee8el2ylgiwnm25ne1q1th1iw5i5bgf4omm3upqeac59insprt31jz546wy8c7aqu7vfqq50fqypoe1x53ap8r72b0avsfe9ei1cupn1rvdtopy295u88yi53mp3edmpms9cioj3xc9m8qwyisp',
                application: '78ak26ubzd0zgcw9qgph7ypggm7vj4xchrz1vyg4edf6x5h8uldkg7a5nujd',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'zgf28n0dc79yk1gkja7jg8egv7cn5q0vba3nf3q2m',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'ks72f5mplegjk7sw42xntp6jid85f1n5w3p24uefqmrovsbgoh',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '703xwvn9qkte1y539vpp',
                version: '32d5uexr9wo8jlc22e4u',
                scenario: 'h7pfktnhfna39h5vw6kmki5y37ogbr3nbe6s19unwjk4vtxh0mu3w8hu0pvt',
                party: 'k8p3zcpg0sd61text5eo4133pez54xzvl7prseppbahaxj1rxegflk1xq72s2uidjchr3jvl3taclcnealk05fszjooy8re02o06mylajoogrqxjo5d7gb8v2k62ez6eoao0qaqckxg200ymwm3z1xarm297ygcg',
                component: '8v4olgzr3khdgbieatvq4tnb7ez5o3xifem74etmrebflilogoi8yd1bjs22ulet4nunk16vjy9x74532v8r88chrh5b7fobikuv99vi4y9p1cn517f0ssemb9snum1sljeft7rjwuz0mrm8yw58v12trwq0dfbf',
                interfaceName: 'hg8qwsozawoyv501pwnd7k4fqvtif1zzmc3l61clp94duecr9xyse3j2cfmse2ter64qsqpqio744uf0stiuvpzdlvf0nvjd8brj3p72brri9i1ioqaaawdseppd1qx8jm957pfagslgzm5bekm3plhlb046zsxr',
                interfaceNamespace: 'l3eljp6u4blan9in6z86fv4b325lv16gilukm4qmqbojrz2ru66r4pa3jvx3fuy4om92znejf6re4rymbqq4a78q24twomko0kqd1o46e8lt7n7m79vnvkvgjpf6ulz6jtfp8r2510gn3nzwtyc0884fchgvkj4t',
                iflowName: 'suqkvntmajo1afnol47uw3t7e4wlgdbegetmrow0q8bwyhvrxnq76y0l70l7ax7pb48owk5ikzhd4ok98jv48n0mxn4pd477ky8ry9pmbivspw2yylbpk48c8sjpvnutom8wis5yejdtw6wperg50m535rduhlyt',
                responsibleUserAccount: 'xfqpgzf8shv7cm1leas5',
                lastChangeUserAccount: 'pxhdenv70oy6sys1v1sa',
                lastChangedAt: '2020-08-04 14:04:51',
                folderPath: 'c1znrmpode6a7x1bs2qw5qr4csqr6ebck32gzxi7sdmgtjv70r1rzkhsrauxjfrfk2t5f7k4zrg23jqkklhtdrcu53o4y13aa7c63nyv24aky5de7ieblls2ctrv4sgkag6m0iy2qb0g2fgvh8fizkilghwqnzd2q0n48rjyj18wgzfs5cmzadsiynz7qjmdeusywqx395s0tlbd5iks7ir1p7v33hpiuzjjg6o5a9d0xlguur5lr16gw193z1a',
                description: '85d8896xw1n4hc5h8i1440h4ddoqikw24rv6s7hu3y4fa2s7z1uya46vmr0cm6wrm111axtagwns7rnvu4zx00d3xlt20p13iut7q4xt01x9rgmro5541c35mqcna3d86k5w531tdzhavdwqc5x5unbm6r295rfgp7ej3kxmmxvknu9m7kea3e1w1jzh8v90xw6f6tli0hjl35zlik57b01i4dzyrk3l2bkwx125o8fjxctdm7fu9wr55koi1ia',
                application: 'vzi60eoqvq95k4seyh62jmmh78px14kks77a0ld4n3xk56byivyw8fk6n4hs',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'pvvhniozxbf89do08yz5fnaks3la3sosszv1lhl5',
                tenantId: 'c9u1qcbgbq9syv6omahq9857umop5m0r2mwv4',
                tenantCode: 'ogl4tk1dnqwpg0ivyl6phkh222uaensav86bnv0t5mfhdoljm6',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '4248qqvgwajvd9j9yxf5',
                version: '89r7ljoa0injc6u32qqi',
                scenario: '1wee3hi0qfko8yfbx3l99mzo4ev3vdtji92f0jjpqwv8gwf8ii4eu18gatil',
                party: 'u4jy96unfugxmrkm850k9172onw4u05rme7rrl4q7d0okp150z7s0mqghdwtszme8yhge28dumf82b0snf7d9ismkke38j4f61or624dcuzta0ko7nju8gxymmsuxwjjxz9et39zywz9x3yra6z8x5xk2pxnh4h3',
                component: 'w4cnhx30rmw0qctxn8vp3n55p7g4xgzdoqz51ofdq7aosqtduq9six3522ult4y0qzh964earuou1a0da3ynsaewvz2kvy2dbuof4yb3hsewb692x76uu6zd6qp4te2qlzl1j0hm11lwzmlifemn5kmceiwpo5aq',
                interfaceName: 'r9ak5hsa37ktentp817bvf77fp2lbwj0qqxodj88sa43v5tqq2cj3ypyop9slbxri0827jledtr9bkn3jmkw6pgafyqgvu90n3gdjvty3bftvzjezy6iylb6x1x7ty9yjbk48jqwfludycfqo7q9k4cjspdvz1rg',
                interfaceNamespace: 'dl7o75rj51rosuu35sxlsusu3tuqrc32c0ix8eslh4izt3cr6t0da6ppv2wzecdlnk0xogoa23zsb1bp4x1ao0ybzbbatmn4wcv004a6t8zfge2j6qr2rogugy2xecw4zlvdbbcuwmv5iub8n6qt2tilb5fvjd12',
                iflowName: 'v1v1z6gametwxiguel6kbly9atl64r62jqu9z6cghgxe375463jzhhd0w0erzu7onc95j47evdzabvuf1gjsmlzadszikzkc5dv9l1ccvn8axysc8b2trmo9wpgzwurrez0s46mem9sd88xiax3rf4wy2yde41s5',
                responsibleUserAccount: '9memvlnlfp87ef25o22f',
                lastChangeUserAccount: '1q4rc4ausq4mdsautoa8',
                lastChangedAt: '2020-08-03 20:29:31',
                folderPath: '60idsb31a7neeicrcjyw2fz695bf8vaywmbuvs6a1iffber7e0evdyw00xe3p4mllfanoobj10dyijl71n7lsnxw13iahmk7t17rks7gvlldnm2dyo100qdfyeebnbds7yzxuot5m61kr0zcnwsx9i2wa2wjrn4d0nn1u7sqys52ra22ynrjt4m8hu740u1yzz7ff7hp92ppyab956949i3nktxubdvyr22m6l5ska2ozgwspmqybiev8q0un13',
                description: '9tuwide1ne0xe3xa2p0tgrz70ta70ddx6ip20wkdeanhf2wgkq66fsal0wk5gbuk3mgb06sw4y63zlgxtc0891e5foaychbrnzlz5xnd6o0il7jcxr8xm8o6wqyz2vljclt6j9hsid0grhv8wlbcfr0y1xmbts43cz5t1hpg9j29hj3i9afkpj7rw8ba1so7q1q9s0amhhx66aqm7xrd569fznz3nzubi1rem7vn3cot7f3605mfl847v24xjch',
                application: 'mur7j3fnn8ywglzqjs5qme2520o6d3qfqs3f0xw9s90m4edfb0v0qj6xiuw4',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '6147dzu6u4rqdyae1ligqicnxckrwvj2ubxessp9',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: '6nbohtgw3el0q1exf8eni3scjtcxrshmq7pssn85q3bgq2fboo',
                systemId: 'bylghnbmnkahdr3sezhd0e22w58lc8s53glkj',
                systemName: '85y9l036e8bbko7wwspm',
                version: 'e62e3drx61athdnujspe',
                scenario: 'uns3x3y9dgdjmh3ckhfietzmax7gqq34a9g81wkp9rjqy9c3o3q2j9y6htrl',
                party: 'w9qpy2uok4r6avme4jia2n6kexie5ek9x4fk7p778o0zo0m65tcutjoqexf68ah7z0vh0b5njo9q6x11zky4dranpiwd5cgyzf0dlrmw7qsvs0bc45ce0mmw9abqh19ikcvpy4n6iwv8c7vdnes582dg49hl9o4c',
                component: 'y48e9jphdz52fc19crnhj0haqwgr3i5d9r81q9czjb2n63hlbaaxcku1ej0bor3iy4pu3nknwtrm5kyve5w1v5fzwdg9qs6rbc4duyoknzwzj8ggk8ebtjbfgzc3je3trxwh1dmtjxcl0mzq4wj08wixuyt4fmjw',
                interfaceName: 'i6z28funs0683gmnh0eyrbhzcb59mrol8ibve957suv074622244z822e4s214yfy25o5izvbk3zza9wyi5fsqlgmluw0u0exnkbdrtwtiq1m26c1857675ncpa1ulwobugnhagw1hawf22s4z0wkmnl7vsocvn4',
                interfaceNamespace: '0yia1axzew9ye747oh4e5uammgtkgw7ez2zufjp3ma38nlw4nh7u8u6zmji33pnldab1haw7vame00tskp0x1wri7shhof8mudaknb4dbyqamn18d373xvn9ric2fxe0f2dr1emsl2iuwg7zmvlqpe6d6z6n9sma',
                iflowName: 'tzuae4k120pxe49mzp26j6ui048dy2bgq1q1fvf6jpt8nihnekgiein43glc5pwwgzjesapznri6g7t5v3d008e0uaous14uq02884741pitzrgmekkj5s9q2hgk19cr513cel5xpmdk3j52qnxbs0pywqjcikmx',
                responsibleUserAccount: 'ucmn12c0or6p9bjwollx',
                lastChangeUserAccount: 'wbznhhnnrz4p50n8vm7p',
                lastChangedAt: '2020-08-04 12:10:17',
                folderPath: 'c1vmrlk9a1ko3rxsiuvcak9asgti5au1n7si0d5k7hj45j1rmrybwayppt23g3jhup711p1apxams7s0xb6dbu0hbt6haamofzegv19i39qynhojlglh1039b3fge4pu6ct4dzjjejg3tyxmlz6rvxcofjiktp2txjilgvscga1wvq3pb9ua9sm9xaj0hia2nqf5px8s9rdudx7vt401h6jeu0a9d7z5bdeepng4jj2rsjmd733hxall7jku8bu',
                description: 'o3qvk5bhf9j4mrg3mukkfq0e6ihixv65xe9schnz227cuk1p5f5qtf1fnksysvkhoex4bv34yu600x81zzqlr5lxorerh9z7hed51vwdieoqgbc9c8654azbr6dwcr4420b8srg2oin3rjgpc22nm4myssnijdpf60e3f540s31dh3kwpng26epgp5e12bbnfr742wsrw2ntn0l8mzwlrny3fqun8zbk3h2bblexslfs3pl6ncxrtzftqhcya56',
                application: 'fgw503ya127zpemj8ne3pntn7yu10oh3r11cmzs3j8wut8ib9t5s67az7mwc',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '3ni5dmsqs1qup04jgnv0d0qnse7ov1rre01rdqme',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'xf7rqmggjn3axys2ck7wjze9ggmt134edusuwmxz8doava2i7z',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '2dsrv9mrtqnof31pc2i9',
                version: 'utu42a99duxrf1wki8ar',
                scenario: 'vlae199g3dhxdv7pkawvy6532ypxs5imszc3uqe2wb944vru2z9tou1wpvrt',
                party: 'w3s2ttvkkt3pout9uhs4599sgr601sun4axkok458b293a4zdo0asetzpfovqq6lhkw37cj22gc8k3s4ixl0779ck4ubd6kwyixt3u7tuycaojv6jyvdvbp251hcq9pulb8235voimwl3fkivksh0ps2h13a0tym',
                component: 'zu84d36an2ywaqkn7z9f3v6xqjyp75quffurgqoo6qe49xgke2arx8ybaochl3hdlir3rapr90825l2joygvhghbvoe2kyqqu4bdrgwjfu92b10jwjlr83rpld6vd0ezf3kcr5a99jzz9xrdpuoy4q6zxkdead40',
                interfaceName: 'ta2mtiunws8aa1xv4wrh4lsumat2kfq0pmo6taxq35kyed0e2mexstcrk44m6n5zx3hzhomxdsmdqr22f566a9bk23rjy7vuaui6ip60wdetptuahug7e6ffjsp7i0m7segt86uzrs7fukqf5ujhmr7x3we92qxk',
                interfaceNamespace: 'mjmyu1xyb139vihsyipsbk4ru1mymfe9uzj04hzznatrrfhqcl5gey5nx1yggdfdlqjnvfkylg2b9hbpoxc6jlreua3u9erbz9n3ue2gplv7vq7xrvu6jb0fzrbezazziqiee9caqgoxu27tyqmsks68qfm2ivj1',
                iflowName: 'i0ep1srryeclhsic1ja6o5pp4t7950slhgtdmwpwoccst57ohpzobcftwf9h6vwe8gcblpq2uincfzwfwg8qel5fe74c45842jg89wl2onpldst32b6yduwln5vzah300b9h327zt26oo4yagwpuaewcg5ebatb4',
                responsibleUserAccount: 'ya4x5mppuswe45xqf7p6',
                lastChangeUserAccount: '0ci25nqyqdbrnsyh26re',
                lastChangedAt: '2020-08-04 13:00:37',
                folderPath: '4zi6dbd7cvw1znhpanyfr8o7yhnwoh8l8a4ljrv6hos22up25e63qw2u10c3tv6xic10o0eqajky9edop3vlqnuzjt0chvtrvgb7ngk67g7rzjid96uh7jnkx14zor4ne0bwswhb24vsx5kq5je0k2dzazaok8lv9k8mltt4buvoe6b08csmxvdlph7d9r9vepqfxb46m91o7qmupvumjxly2usprlsvfghf27lbgunnv9epofm4674t7zgeet6',
                description: 'iykhwcbh6jmvlgwbzv10mo8mx4omlcea5ewj94hwocw041qtfmanstmqd4ki980txkqxy2gkw12ul55v7pwejki0ows6apu8d3yzmh56894y56p8nrvx52wswukagmq88gt9i2be991qmhtwgb9mtnqq9jqdk56eap9npvvijdbvxxtlpk77jp5ak7e85icagi2gwq99lzphxv8xmrfx8x29j1dup3ry0wfhhef3zfymwy2rj4zh3kz3cbfpijg',
                application: 'mmbg0x23ktn1warny2osbaidew36a7olw1ompwbxmxg1vsvrj9z0cqkcq5ml',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'gm40eytmmb5glu3ucbrccm5j01a3k8nasg8kn',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'gqeq0pwmhm56vpytbo621926lu27pfessi6gbvr2',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'il9pldfv3unbzzpl7yzqvksz35st2f838ac3wdk9ebqrzcb77nq',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'u5z6gf5j2f7p4ekixeoh',
                version: '05z8l8tow5hsedvbn1qz',
                scenario: '0z1dtoutve4ajbun6d5sjfpovcitjtqfwktb7r8ee47sa9rp9u4e79sjgemi',
                party: 'tf3k3z2mnve2mi0yijfwtzakytmbk64mpktapclzpbhqjrvgikcsiz5n5ve6grv1u0zup9awoivokmo0dinvs4pxusbnwyk2vovf8n8qr0w1z4j9kx7p1t5vgv6vxibfstw0vjrgdssrkzzvkgesuiin1rezov10',
                component: 'eqvwgdwkfirgxiu25sspkdbve6yeh8vzw8nlt8m3akxnq52fkzlykx3cdjye80b88ac3v6aoz0zcpalz6cx9lksc20z7ceidzsdu4x6rw914gdzx6yw7wmnmbnzh7bsogeuwv6h0vn2wd8smphlnd44q59gxcnk3',
                interfaceName: '2pyg8q63p2e1713o2ghptnqdib8ug82cr8xmvq8u2t2tfmcu4ajx1oz6xb1mtf8i25wdpz034dy6qwkedv1jekkvpps6i8dz7c6nby54ws7s6rlvxo3b21hj8oap08dujt4wpiek7t7z9i0j7o8sj55z2k2wpi06',
                interfaceNamespace: 'u7de4zwghizwc9lkk6xj6iqp3dawfhrl33t921wo0aw2sv3v0e6jei3r1el4azekn4oxpcwicfvbqyzmx57gvkz2v16qtol9gibfx3v1k5ld9utsgisxcd59dp6isw0c4f4d27wn20fxfvpmov83hpn6fy85onn0',
                iflowName: 'cxeicebg0wnkfpi4a8zlceauy09ojplhkwqqpmuz656oi4prupic66ce8l04jdwjuaikzalnq86eov6ol5om7sbikzgkaofsoltbvjnlrkusp6q5ft5g6xfd3qs2641i3dzdtv2equda1tyer9kk5ipk1bsq1pym',
                responsibleUserAccount: 'vb1spvep5cvwkj633vl4',
                lastChangeUserAccount: 's6gv9mzilb75wp63hw7u',
                lastChangedAt: '2020-08-04 11:11:27',
                folderPath: '5xlayha0fqvjnx3gqz6rcfrtjw7e9q4bftnktq2oezjc4isfsuf5u6st5cef83int0kk54yoiqxxnkqq5j4ajgj5hqoyhmjomr8phaqvdh25oykwi1vyvy7rzw5pilftge0fwbofnjibuo8ebo6a567zpfldg46x9qjsb792zephdmodhs7cw3gjq1aunvpunv051jbet2lc9lekgfaqsbfvgg18gbv49gtvtcm9me4tqobdhds7qzqxuhb582d',
                description: '7q6d9jbpp5ffifg837q14lyne3qnwk0rg7hq7ch8yomovsebssqqgeousumj1s6267xhmn1g87yyolrfp6bych132kyopwbdo12mp4fbyzr6hrqi50soptanbuo5plp9keazr845kd46exo2jyz6lz1qhpzx7fr5zag2wy1717x7f6yiu7z4urbn5n2fj3kvivgwtb6x5rgqkj15amjqgxlu5qqzk0fbq82mi159f4e44778aes8gbck3k60m7n',
                application: 'vy3vtj9ucp9zmagycha94xq8rddw2yq2n6qrr2fhkmschsncfyrnax22j62n',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'mgmnn4rq8uk4nd1852fwtmmowmu4zuvu5avg2s44',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: '80nrw87xt4rhcacu34lu90r2n1kobzzemxhz63i7ag3unpfcxj',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'uvip5tn7zcaz5p8qck0z5',
                version: '90aszyprbuzl3yh11ru0',
                scenario: 't2eja5zqf4g1hvl8bi0qdgrg5t4a5lolhhje2kgimtvo3e5ngag913m5dizv',
                party: 'vgulpak737lhuknpkrj0l3ciud71eere9z5rt6lxsas6vc1tbibfjsk8a1bbkr8rl9egfl3j3vldnk64vu8452lgfffnpzz84o2f4oygvoc7w9y2jyrl3260xy3jh2ag5lla68emd7znpuoh6b7hl98vl1dtfl0v',
                component: 'us62khk9revd1brrzdz8t2g418sowjhj1kjpwplnkq9eqjvv9e38wputctl53udgaiac8qi5yo7ajqad3fef9pzk4uh0j57m34ywyzbruervvjtgfou49kmok9iyd0istyvzm2rda90t3x3h87v5jqgs58fhz612',
                interfaceName: 'fym89ouksv7ankvb9khkchj7tfxnpwoktfdddexcl44gxmpaz6iaq10jcq7dm60h6on3xsi6g1wr49mqcsxjxxayp657ziglj38n03l3fxxxpfjfs8wyb5wl759z1fj7f8sdngqslx65uq45q9r5m09xnrh89zzk',
                interfaceNamespace: '8wg1j5yf6lvrbp3xbtj2kvc7q445jcszrcupb1uojdtwb13gxp7bw2xakaguwnahr9fpk644zektu89fkjuwu68h4btytb3leilsvr17b9rlyysattcj9x6ksj6fhkcdzhvirl75yub3o6b6z8wampoz22dq9hrc',
                iflowName: 'wp9obl02mx7y67laacbys3fhaysynbp4g19mtlou0tpqut9c2z8chcaghw82n2rusaygy2iqhf19nvu0aaz37xquu9vh21y93lld50lv5w4imejsku2vt7xr0aikg0t8iww1slqhr95xlj7bpxi83kmb2rn36qwo',
                responsibleUserAccount: 'hd8o0q5w0x3jg78f9xcs',
                lastChangeUserAccount: 'f8imo1m2mdbnhtl2btjf',
                lastChangedAt: '2020-08-04 14:35:52',
                folderPath: 'imn24f713xube9lw6aku0zfl1tfnu3cqb7n042q7nhqwl194ezrijygpr9mvkavo2i90qoo0mpbpe8bxt1nlnkgrtg47vlupomruhuxe7k2hh0mjwcygab3e2bbat7y892f4vde898sbdkw77kokke8ojqm9tokiosf0z72enxza57b1cbhngn7tem7vj3jhysqm0vcum45yct0mxtawy3cdn58yy3687b61xp63b81exrslc4mem0rqtpfekie',
                description: 'iv6myo0qic41xwtpqm1j1hcscsorkmi6r439e9sp7gx3h266v58u2wp00rptyhbkm38maye73q6vl5otmqqrdh4lkf07d8u4xegq494eglm5oayqxsp82ezm4txwpi78kp9d8voadetlzekcanyizq1h69u4z03yp4k61vbmq1j1gcowhsw9wj3h7c6vs1o4uuixrw5vivsbyilwnv2o964xxj71y3yahbp1kvllo6votwebv9h0uqddan2ukwj',
                application: 'xtz6vs8jnkz6yjaryqmrat92536cpe9vh1l6vyekftnjze2f8808bmzro02n',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '0hv7fj6j4ymz55naxjzrncek46vxzbl32v82fkbq',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'wj8vkpv8790pd02nuo0t38qe0mpv7564kjr5uiod6y05kkhdxs',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '55dka38zg4o3bcfs11p6',
                version: 'tdoqucnblv99nttm7fx8w',
                scenario: 'pu1aqqe0ibaad8wu08g6yh6tf1p5gd80z6zr1jofu5z8f1wisp17zdbwu6el',
                party: '66dwx2fgxuerfqu16do8w9uc5n04j9vmfucyaubz03guaxoapt9aw2aegm6ovcaasy8xt7z2ofaqkfa71hxa9veb3cl7p54s9emwe7kkz00vh99c4s7cvzre6d9bar97m60g8hg79zu3763q92lcxml8qfm238rh',
                component: 'roxe44x05vwnabv7u7xkhbnzjt4pr059tdgf2oji2v8v9u0p8d3txtfe8rqfpodlzvr477xyu13akvwxtj3avwxj8z5z7z22u0rxmcso89oqt9qovwj653xtsgtm7o5j5m39ognoo01njhjrgv1jbz8chb5h55l9',
                interfaceName: 'uccp8lid24sqrkskgy9jhfe3o7580umpd7nyg5hz3d9ffpapnhs51yq4zld423ytaqcdo3d51hf9weg2go1k50d37tntej81su14bw6mvblgqv2gxsit24v9hxaqarzwyz0qu32y11s8995juyl7nknlm4cwqjlc',
                interfaceNamespace: 'q3cp8ai3v4jnqwdu9jynr75zsdgsjs5j4sn05bx7bx0r9ahxv4a6gfgur97cglpta2jifyhvj1knq604km0xplwbpccebb86nq5xvo78z693gntp1kaudedmrkr8qruihaaua3ohvremj4wavq2614to9o5t3tlt',
                iflowName: 'uda7rmgei8q8tqoc6ji95ve7o3n0i83tfmv953iq1qdz7osve0v2d0svttzqmxylhsbanx6scko5weekbwbayrutmm9le9awvh6khklarcuwwjc5wttz9v53z8fxm2vj1jl05pquzkm9r1cadf95l1hzszp6fd41',
                responsibleUserAccount: 'p2hd3n7rzur8cf7f86aj',
                lastChangeUserAccount: 'cv5k7aa7zqrjjtbucjb6',
                lastChangedAt: '2020-08-03 20:24:22',
                folderPath: 'tliue9jdw7i5aeki3scztwxqr1yrm724mp9ger1t6fjsv2cnxuyd5pzibym0cf2xr5g9txizh8ri035vjxvis1ipjo04sw39eo4rr01yi0dfyn752lyz37oiw3516g22f1fm3sv3j0zk3fmctfa5elmvqrxs3pju52fwycyt7j7bkh95y6ii0zu2wbbft0rm7mt0951uawded8ga8oz8lsxp9tqcnvb4v57w8e03c8a284d478bcifn4xixgbik',
                description: '2lzqg7xaa91th88c99c4iwkp8p1any1m0o8352esgrej7tn7at0reghwjobpdiixl5djo2z1v7xwk9ew0zzth3mzcphwe5iac1e9x4cj13h0ooa2s0z9isk87fd0a096iwjm5h491ynih9xonax0580bgrcjb3gebygnppm1je4unouhzfxd7oi60w1hb8dp1rpw8xeqbjarpj069ulxda42wujp34wlk426kziaqfbwrhq0v4lbgwrzxp8wqm0',
                application: '5e23nf14ppnzv4lnrxcf6zafcm9271qwwt46ykymoml3iaufxy4i7ks4zwku',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '3amat8njw601ym9ssrajwm5gpj429sjx87jrw7ww',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: '3kzrezxj04voluaph5at184o35361cicwwwx5xcuif56sfw0yz',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'og97jrprrf8csqpggb1h',
                version: 'o9lnxykv1l62k8xzj8jd',
                scenario: 'jcw8wo2vj1esf3kpd3hvqoxoqm8vtv69xzfu030n7c568rmzaj0obpdvvx4e0',
                party: '4uuxwewfna7zenuc6ezls6xcpxopa8j0z56neammf4mjkr54uqq514htilbcpkxidgub57rzbmiwd7omtiu4kipltkc6w48eueliw2kwrdtl72ivttkeswe029wn1otz7aosqcih4ivchzttx3uh7mgycin21aoy',
                component: 'bgbdz75du208inyng1losugz9n1mxrvyr2ena8mfm6e62tmb1nyskjjkvr38ebxfikxqvj0982f4znzh1wojnybif1ohtm3xb62ziin819q0ysw2gv5hxmleikitv4t3ey8rgi7vcj7hfhvvytfdg25hks8pa7zf',
                interfaceName: 'z9a5yfs2r0q3istykmlmuf2e4x6ojeml15ode0vnym2o58h3k3t6rypkrzak5a1tkqepikwlfcz4519ll5f2qmp3j6ulgpnjin4bvm6ixkx1ig8p0fuadn9fwr5661ocnt2ftkw1jlvrrzavzlv3slhwe1xy7iym',
                interfaceNamespace: 'j3rentgcath4e3esqzgklbf1zwnsmhb8t4ddwuroin929vxhpyxvwkiotbevvny1r5sk3hmydujjxcd93zw4cqinuqp4hoixciae2dathb8tm53k1qtbts8mic4zmkzqsdjd1jqfmpyytu1lmgsnxclyf3trgrb5',
                iflowName: '511p5wbe2r0q1kwmix93h46cbn7owspo0vt9p2w15ca958xqx8s0la0llh3raiasbr4wh6zdc7um55xz7rz4vmz6dasb5r7yrexrjevseyxa199qypjsjekmw8r5r22fnefjetijw7jxqedg1c51el4ohrku53mh',
                responsibleUserAccount: 'tcga2jkwvvjyixhwnoy8',
                lastChangeUserAccount: 'm8kxw885x2kjh90q7ih0',
                lastChangedAt: '2020-08-03 17:50:46',
                folderPath: '80qvm0gxrdue7j92tyc6ufpyycnt7bdhl3hebebgrk16abtez5yms9emnx80chs2q1ktlpo33gs0ubrci7shasn9hnga14hbn3kjl0e52ovlbp2rqvrwd1hzfgfspzzfjsru5ac51zqt4tmkb3t349e0vsz06pnhpt6e3fka42s413hymae67jzi57awxei3rrta13zz36rurswx8gbzsy367h07zve3px5vk32rfcfwj4ux3xcd5iwk55q8olo',
                description: '3jotnuq8ztqm2y2wnrnje1jxfi5nt3d9klj9573kji2gx7evcdlzutmncc0oumav8xmz3i0jizh03lsbv17l8x0g36asy0rwcntjzbjou85h8zxdxw2b4upscfz3yh07f6drlpjvxny3n8flzej7i9w192gqi7qziuimi2chuh7h2s2e2jcvpth0s42x51m2nnfktwrg2yoyumft2px7niuz1oitn09xs5dttee2vmwd3wknepi4tek4y7pyg69',
                application: '17bromuatwgc2itxcjlloa914h536tei4ei5jbj8j8yqmn8ybun07q571du0',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '4jojqpecvvi3ozqt2nbpp57pdv44zousv604bzwe',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'er1blp99cxx9h95m8qiwcjitvdbzbqphucbk986dwws19bpn7j',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'cfbmvqylrfarx64sejog',
                version: 'o56t0kin3vjyamdriexn',
                scenario: '5x3cs79lyi2nf3wzougffu37omtlkyy260czrpyqsnxe8bsqsuiw881gx9q6',
                party: 'kp0jya9latmbicnvo532fkoim7ujef85ela3rf3ei5dfd6bam572m0l3r7xd3dyrioof98m1p70c22dc12we692wykknmop5kbjbz30pdxax3cmp6xtzkr102obojam58v1o66twmqf4v0op878louhvp3utw08w4',
                component: '1npjcbl5t6oc9t29g6sb299wj8f8esznb7krcymhzc3wiit5v6kvvoiekghqxiijaiphv2y3e529m1baudx37e2eg8h573bhzhf7hwj85kcxufu2s17xipetzeird58asuqmbg2rkpz9unhxbv5dop1efk6zc8h6',
                interfaceName: 'blozc1bvfgps4plkx5p05dgg8j7qyuyrh1qtvy34l6nmv0b6islfdbwugreattzwj3fiadxpu9hs5fnf81nrc4v8zo08b4c6bzx9mqlufdpl7wf64kz29qehlup809i4e9cca0gjao2dftasqkwybxj7457qf8ye',
                interfaceNamespace: 'zbmce335qzefgjusbfmrqijz303bmtsbf1nymxnxg85mt40n72yg0nptumfw7yspnoqz0t8g5z1u38zvuavm3xtk3h73r5zeaxfy7o92nkdmig4k0gnrxpnqbryw3j5x99bn63ocngj56nkgoafc8m3g4x28eoog',
                iflowName: 'm165f61sp2d0fslcmth5w11oyzm5jujiz48omdbjt2lfuwqwvcdpblab3pmlzzaihquh0sl2em06q8nczrygiwjp82vavq2dsja1v06mdx7fhy6i9tnb115yhih32fqxcmd0ek7qxdv2f69zkpe22l1diu9uhi3z',
                responsibleUserAccount: 'z191udkcntsbm95eebza',
                lastChangeUserAccount: 'isglyjq8ibmkab9l8dr9',
                lastChangedAt: '2020-08-03 18:05:35',
                folderPath: '252hdxdu2bkpbqpg9ldj91iaaol7n8cse0mavtc5cvtw1dbk92cufy6mpjkakq9zdco01xz00mrsq9z4bcv8nu37tb0sc5puuzn2kec9hdrkdbhko2zo4bechuzk8ccw1pg2o34kojk1mxv3zidal3uavot4jwx6yiixvw2ehdunsexuxayuhsd7jq1754hnkeuj2dz0zloypdnyzlhtcthgx6uo2xoz0mietlgb5edjjmrowf7cxuhvm2l7hmz',
                description: 'uv04w3jnv41fv5a2v3cpwgw6c9rdafj9f7uy9ligcbk8ow29rzfqrp8en6237i0l2d1mccbed4hnz3532jkwi4jjfndkqy6hiqkpq8syd71ma10npkvcgnb45fl7ic9c7qjrvvvfibd3hq53bfxcthxraeh80lslcunkxfi8fukdlkgtp79andmet51mlmkzpt4d6v3cjqkp8kr7dgungt83r7x2fdz6ivswu67856r8b5mnp9182bwd8tjwfxz',
                application: 'bagouzsqmsiywmj5ekthv9q4yog3vgbesohctyaw5h8skms958feklc9kbp3',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'dsedz28fj0yfnsm0mhz3760k50x3oplhd90k1ssu',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'ty6966titk7juadpht032gws4thh8sjcxvzzhv6j8kxkie1ast',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'c6jnwksm3euzlnzcrjbr',
                version: 'g87cpijqtdwl3w42jsui',
                scenario: '8gppx9zupvn6ndnopza69jjdr5sn3p983h86vp90j5srgwpr9n2jxai6mbcx',
                party: 'cuy0g8jz37hph2sab8a69763dqqicya0g1zs36y0go42yhi288qhknx8wlyw5dla1hszv6wyjhhmdx2qh7l1n84182v28394ymk3lmgxzwe46rxqqn1i0kjc5f3t2sas04trngcca3h8e4m6m45ugx8u4lhu1oli',
                component: 's7vjf770tcf9v61vbv6li1b33uwahuwcxvpwl5cp696r8xlgern19etycb60eqzcqsndzg3u3yycb66pd2bqu7xjfkvqhwftamawkxtokzjg8i48pvqmnc0egtmt0e99iypk2nfkccyir6s0w9x5u251m5rxlg8nv',
                interfaceName: '5ytiqb8ejz456evd9rnfi3wrkn17q5aps7uipekahxe8djq4c7piobhf1r3vdiu4035iab7v10c2abc3behajg3qz7y9p3rowhjcm44l7pqro5jz9a9lvl13vqgs0ihxtikrxncawmv0a5mfldan91bqenlk58tx',
                interfaceNamespace: 'ukh67zuprg23358v4xq5xbqz62u5l20kncxyevzdds2q66eu2vzarhoshxkzh4zhoj9al8tbhlzulj4ksxitpukmhw58v0amz9th8qpcgd1lpuo8tl5y7doalnn1ekaq1n4ggh2a2mew6cpvwe8e7nl3ibeaz54t',
                iflowName: '4u6tx7y0locq2pwk4a3tqu8tb9n9v6zdxi8l45lwxfbbxlbf36thyvyg6v4i0221nf24b1r2ysaarl90xqt801cgbleakc0yp4yhip4yruhejgcqr586xaoskamnqnxyecnik88q4uzbsby5gjmg50uk6eh4n9rl',
                responsibleUserAccount: '77hdsci1ks09pdroiuba',
                lastChangeUserAccount: '0w8qtc6e6oyvc1wxcma0',
                lastChangedAt: '2020-08-03 21:27:02',
                folderPath: 'ottl09f2wj6258d6s3xac6r1c8ga0dbndsahz3xnhnyufnenygx6i8yl3bkr2c06lx72on6jb4kui8e75feeauq1ao6mlsdafflgzja6jt0z951ldortzs5auy7tw4izda1f00fpg9nbnmexrckwqwr3pyv9idn8bu720cty9ff8e84bxyrwvqobneepvjcd3dutrwz54ax8yv0er3gy6rmtb99v2augxq9ma86ev9r9px9j04x740v5qav0gf1',
                description: 'bk8yzrwhkfdg1nfje77dxn2qg7byu5ya23oedmttvcs1w16pig27qd5di6jsv3bmxjauyeraqdo83w38j170x3h3azakm9lfx926zkdnouq2wvkodlaaaslpy0fsegtkmm6gcb65p4jo6l1f4olsdznxyjainjfgncqf9lny6v8qbepb8nkkr08rygt3e0d3rmftqtjx1t93cb3iiooei3fzwoek0afxzmzzotqu53h2h3qbg2uri6xiq78372p',
                application: '0ec0b7qyaax7fmx99r3mmhgpl5tt03h5vyglvfx5mcw726dga26cxbkepi5a',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'pkkztzkwur64vnt4a4b8lbm64qr86agdb12sl8j8',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'kjvk8gfxfx3dx1yfp1xtwpmk099xrqgb8rxsdzdj237nyj2ydq',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'yfrg1c65vk8f8pwp3j2x',
                version: '7l5kywyox1jqalomkwhw',
                scenario: 'pczbulyr22ikg9txdyg7i9qajb6rcolypolmlelyxjc5jdhss510frf45p3a',
                party: 'ykq91ro9wbn6fzhckd7v8lw1oi2nw05j8awa1juumeerxd9lzeeakqd3i6jauw6gejs01x9efy8yc76rj7wa583xeutt0vt5g2vyw6q0wg1wxe1pyl5k3ar2j8vijk1fdsvnb43cs3i7u3mcb0jey33m3oubfxgj',
                component: '6tph6dbxx5o5b019t9ia3w7erlv1i0pdjlqdf0g546v5fje98mzzi3ciibj5iua0z7mdoov60odl8ip46l03dgnw2abxxsqrv0ofvufe1annvcroafvn4snho328wj9mkjk88sxr8lptx08i8e2b00h8mmgyiq17',
                interfaceName: 'nr8ft1hcxnw54h9p4wtsa9pcg8yrpsive9sbdj4f6n60iutv1kcp7yn1nod00wzkwb8b1ak7seybt0g0xonvtboe4tmutwgcj3ssbff3less8ofbya95r8v3dqo6bd201hc4asgt5uppqtknkvtm3o97jl895z8im',
                interfaceNamespace: 'p98ca9lhtfgikg7f3k9w71za21y4va1m8nuqvdfdj3cwemv3dvzt6wml0q4hu7il4s9u6ps520ts3dqh00tigr79rw6jl04hld88r6j6t165451kehkg9o7ppr8sh7q3u51w09xsm160oerayr43udt1f6ks33db',
                iflowName: 'xcn08gtusxjep2j5q34273xrwt115nbvi8hwb3jhwn6wxd47co8mj6pr93xnj9baox9b23r83dj6mb4k11aya9puh9sbzlkhie27kre5imeuuhix6xd7kdapcvsslqh24nulxhec1e1nj6ojx05w1a7bol3qaua2',
                responsibleUserAccount: 'al3fvoo3kh5n78lo67si',
                lastChangeUserAccount: 'o5gk49f2sz9ccpd8p40t',
                lastChangedAt: '2020-08-04 14:32:19',
                folderPath: '3i3snlb9n6k1acnqldr7cur3xp7y2sfceac6obg85h5a6qu1mbctc5mu7z5ngo9dpd4kzr6cbf2h3gt9ry2jrnf1fwfvirrkfx632ay7360s8o4r4i7m3ng0zxvr9yuoe2390zekqz7tkm4o98f35kl4t5weqfkszjute9i3b8za1x5nrctgidinarbnuglhqjbu4i4nnrprxyffybb21zjqgvednuwywfk4qzi3fvb9qsfsj06ak4rawp0sjff',
                description: 'gu5yn4yrvgmlfw94wognh5cl6vshpyblkqujw1mxjd0mdqb6kp5ab5hjil2fwf7ak1jtlhvsj6hror3k6vcvoqxrop1bfg5a4av1b4plkw7k3qy5mtohrg9xby5pb2ojpsrysc3hugdb36xjj93ufiygrek2vjxd3e98as8nh6bmjfapib4fx4ab6s4zfbr11h0ve823b0f3l3wsiy6736rzbtm41t06g4w5z3crtc6vm7ar30ukqwh5osh6vlf',
                application: 'snqxotul6jbm6ay6pj30bx7q56ytc96t6sxyyeihvig032pq7aqcdc7twd8j',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '45h5zixyvxvxhn90ghu84i714ko6ilhas74w3kjh',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: '47vk8d2oipnle7mhkpy4bxrz18c5lbl43xii5nzya947xjeqto',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '7icooq2d0z3cgzzfbcqw',
                version: 'vhffhgnt8cpshapnpzvy',
                scenario: 'fnuf6rlwxse1xhblyui511lvz06h85gcbznqomn9psdi47vvss2vjb6kw9mg',
                party: 'imeng4fmofahyds9fuc1kfgsdiw4ji20gznyri9eqhunvg4qunh7poim958emkom6rgwev4nz5xsno2yeiibm9oa0t0ohnt56cf3tkqryu40787lvseaqdl9hmcatvlugm80x1jll2k7gt14jyvgxad2jg8v71ru',
                component: 'zekt63h652fwcax2tbloafgf3vamsu94hgmdkkl3erbhuqxjbds04s7qf0ugo80mrvvafw08iy3epk3upxvz5gn2osleheda58i91zcgakvoh3kwhs3ot9vw4lc8741ppk8ukns7by3w6oihqiay1uosqp25d26k',
                interfaceName: '0kqv0lcpws3m0vrwr27i63wgg77nl3lha2dw7nvvh7wws6dgviyb7wmpgd9bj97r6rr8ry7thvku9rgea18bn0oi0kagbqz363ompa4rcz9k5kfp2waixo19lijwlib8u6ya0xwz1jt7hri5zmgiap99ooj1h313',
                interfaceNamespace: 'e0zofpyzc3951i1v01hry0afz5cmret0208uk2clrb1royilq0zljb31o1misylj8q0j0q90gq5uaflucorzfg2700x2cvm6eaivnp90x3g2tyslew64h8oflhrh03wo5oupgez9ufuu9fwlyfagx96gvwu7cscdw',
                iflowName: 'vj118l1bqx2l956un9i78yx1nippx3ojw6c6ue3mseaoaqd10s4tdg8xevx1o9374cal4t3y2b6gn815nb21mptfn7c1cefo3ywpbo16klaouedn73ioeuu8bv96tyfy58rhx1fs62b0iy2lg1gi3f3c8925npz7',
                responsibleUserAccount: 'rvqd5855fuingwdauyum',
                lastChangeUserAccount: 't8jb6zg34oxf9sjcxdgc',
                lastChangedAt: '2020-08-04 12:44:33',
                folderPath: 'jyntrktrwkys9cwd6qdopqjjcqxzd62e5kpjbcok3qani9i5odyfx1o47twk8sh5re3ej8e1bjsi31yvvbnzg4jqbvnj13hcx7co9in1c6xbb4937sz6oozyrt7ulzoqsm7go6x3cd81gvhplevb8ucstdh7xk5fcibceankkz0o2dx5xvqfthp9xxpba2y1i9y0qh7qe0iaumjovovul8gvkl87mdfb0k0apjy9k8kpwrmqsuwveq92wwiqced',
                description: 'naovi9evolqy372zx6u7fj6dj8eevyc2w1i0c4ycxyknb534dqaylg3rdbdf9fscuorfsje1omyftbk9lmuckvp248lofsf72fe8p5heb33wzwdgavyjs3p8g9jg2k6387kgb3mt0f7mzwg1m61bqbm3e253awgmuiwq7vtfpuswukdq6spsya383wofd3zvqfa14b05mex1swcnqobuuir1urxunjwv772kv44ppjg1nsektn2i1anamzhig23',
                application: 'z069hpgib2f6c3vtmsn632c91c030rx20a0twds9qskmyinx4ttco17botpw',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '5gk9qy7taq4vynu89yb1zab2pxqivgbm9xdtygnz',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'vx1mb8nqsvqzd4eepw18t2cfmp5cjcn1ptkg7fekiq6r0999h5',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '5jc5n9ule3amacetl83v',
                version: '5jjkxdg25cy9emla3esw',
                scenario: 'usc8mm9yblcbasjafbevyq74e0yfdhg1gkw8l582aq95xet71ttlgj651c5b',
                party: 'f7y6yuznw0v11pwc21sgmfmwuy4yowaxwvtw6c3gpiu34hz176dvygeg04ui7oqni3mxcux280r2f0g26a7jndpj8h1807i1prob6acz1tsb2vgen6gfor55j78rnfsl9iyhgcloilvxc2bahyjymlh50hiqpild',
                component: '4vbu6j9fejrwsatoia5y5icmnf2aiktffgr6vfsh4tq65gbmp7h9kp715dz5iwab3ay5164hyas6zmevlpnrh6nu7o3a5gsoy5eddzzn5mhudrariqzvwhp2d3j6tg05vp04gk6kxt1c0ktw2og90n99yde6gdag',
                interfaceName: 'u35tftf4s6at11a6ka2y4hv6zv0fjgw7xwk6ihk0bf3dn2ku99vhw5pycot68l55rbl1k86b01zeqxsa6uezp0smx859pilrv10gtg1hs8ufbxzngbzg71ok0ejud61d6pyp8rtvlgsogi0iotzfva31rwflhaty',
                interfaceNamespace: 'lnrdoun2ixl1ikpavej2kdoweq4rgwp0e5h37hpbhw3uwt4q5cs4em77n27z1rk21opcsx1ixk0gtver8wrag1l2fspacybdk669bc2g6ktchouutkh108uhlygqu6kqn7rotvct0r36c4vwz1naf4v7uzew8fb7',
                iflowName: 'ygssveh8qz8kkvk8irc1gi90wnh29xnre78fd1a727se8hj00wizih1q4n8v8vewlugu7jv5jyquowebrd92d1406vtq1moupzjvicxem6d9rzlkjdrtfy1whvtzruz4ldfgcx79pmwqxjbthj04j03jm1gfads2p',
                responsibleUserAccount: '2b4o4rbt8jmzifsxg800',
                lastChangeUserAccount: '80xs7kxcpbpe4e84wg0u',
                lastChangedAt: '2020-08-04 03:35:25',
                folderPath: 'wecjo4upeun5b3ddljmdrc1cozi6tqxqkp7cdakxle628skujn5q12i3gvbm3pdpghc55jwp5n78rjsxcjr5v64dvfoqtm3zfzafupvb7gqr5xq0v4pxuzebng4pnrtxuipfcao688gl2pu51zm8gzp97yzs9ywadnq2na7q11woksvenmvevbj06eonez6t2hujayctvrcvep00l1n5ir3qwvl7797jk1ul8b2zkejsj8olyd6xpy64hv6y730',
                description: '5gpsridpfde4mdqd1o3pcejdzqndyqwnxn0ke6frmky71fg76cvaucbu2uk15p5uin8sxop2x5av3df0fgqymngdln4if8ql9u07xt74gu5o17ojo7dw3szfsrncghmrevtni8ynuolfwm7g1t1lstfvtqp96ywtbbnu9vspanosj4rcgcjtkzhxibbvpnidfj9d5rxtktppdv69rmmx0yyr07j7sfcc3dyxggik9y7vdfj67n7z6x4o5x098r2',
                application: 'e09e9vrxk0t3k9l7vuewq5x3hukzjev67g0pmcbr638i9ysujyj06xt2tosj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '8cacgxx00w4mb8wxsxny86t2eweqlariw4d5mhxu',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'wnneug9qs48vz3zjitgofr75qc812m1zewu171uejr9z8rd5l3',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'sp5slajrwbjz4br30ano',
                version: 'ia443h2j86bljmp1jajo',
                scenario: 'ghtdk9lkbehbgkgkueag8ea7j6bkftj1ljuitjc6la8n1m65ix0bfpcc3ymg',
                party: 'nrdd429p341ool4nqz9ws3ehqj8lpb8r6uutber2qx1l58yzlche99o8h8ue54omt8qu4vkz41i8f46vnkg67wkq0nprsw1z08ttgf94sjk42cob4licyjf2jdf9z80t9x34a3dkku0pgh4riohhy7990exd1hz0',
                component: 'msvzycy7fyl31609ohelya71ldden53mjse1gil3l0fwfdzhxuvl2ao4o2n293ov090at9hcb60o16lt7236973rsuuhp0jzdruh1n1ewneinancggm80061end55cn3mv82lq8equ1m3e51cpq5i1s4on9syxgu',
                interfaceName: 'ksqnuzu5typw5nr9l8qdwl3ba3d43yy9atdds0if2fw1arx9zyt0hc403vzhen7olqz9jejgqoo6q4b4f7es04jp6rqznb5bjcpi9tye07h3tda9t326xyr2ne7zbxkq73ste0lasnrp30y3z2zb8q41fqildq3a',
                interfaceNamespace: 'iyq621ai39tw77e69hqtvy3nz00ch28bhwlwt5y1ihitv5car5uf5ub9bf2lyp533o7kggqaij0efdfrxzr1n7p8uw0b9iqxg6eh6rrare1nnmsmombf5prp9mzacfju4ucfqqol7lrj67ttg5x1bz74h83u44uc',
                iflowName: 's3m04gyv4ispg69xbonp9yedhlii7obzs7riro1eq7h9l94cg6coe96h4w6hqjtxuklhae87193oaf56ph16gsx6bz1jrmyi4y5w5ao3dzi1293v101kxqjqp2cwtv7pketegw3762aplu0sitnvcfzfx77u1c9z',
                responsibleUserAccount: 'fsk046cc5286lmkalb89n',
                lastChangeUserAccount: 'vbgcpqpel12nqymohgqv',
                lastChangedAt: '2020-08-04 05:02:30',
                folderPath: '4hbnau5atlw6dho3x6852merh5z6gufomkgg0rqz2b1tge764ct0kat5vr5tccw0i5b4kvlx2b0z0wodfj677yfpbud5v3e4carwpceayffcv1mqev6gspdo73dt3i5obqlr0t7zivnd9onevnlsajb94fpr509z8t2ms8zlp2nny2t283czbxugu5g8g2ia47cwy2z8lctnx7gqexandtaix410knuq5g14o0h09153e4ipvxwzppgnat4uxjg',
                description: 'j3i723u0bybb0pn18vxrljup02p9ay1j81656nfjde7t5icwby1fttkdtn4dk5ggqb7oagjrwridxltf3d2a67u5pbaw69lojibjo3ghwraqovccd0x81ozxk2rn73xrt8mpyswx7n0vq4skf97ovgwjulrxtpwdz9muz4baetf3ecply4x8f7banjvldrdub98v5neathjlx2gsxmiblm60jcblpjlx8e5zamwwf74h9ytslsg7xu9zgtf05k3',
                application: 'bkynlzcc1bvddemglnvqo4btr95hhp725nofg89j75u5nh06tabdcpn5r3l0',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'a4mc6rqu9lmaoj7qk23s6mjgv4kwpup5wcqnzq2p',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: '2m9o0b98b6dhivj63r95f22jyf30rv00plj21h5ghrdnkvdlxq',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '58325whqckuzn1ldn9ao',
                version: 'yw9jxfcb6vq6f2b9x1ny',
                scenario: 'mrapnr8l1u0s7zwmb9xihhr170e6f8ohxsmi7620hhc35ve1gw9ynyuvl5of',
                party: 'ta8zlo1brdqakye9wewzekgbjjo21bekjgk8qq24s17lqyaop02mtldy893aph52h10ubx5c47e3j0pjitdl1h88wnpj9oj0rtij7kasfnj81reneyu8t1iktlq8h89zogg9vqikg4wdtvr3ieubdvgrp10tn5az',
                component: 'gb2yaxeirnxjvy8dah7c2pbg39yc5a5dyqboy07txuwvugmsgjdr0vugd17nqv05zbgc6syz4tn2b41jn7nzs2vwff2tvnie62juoh12qie5htuiegmkc5vq21auac4qrktk2ek7qnc8iqi3nf34jye5qh8zjomi',
                interfaceName: 'mrpz0xv9qqg494pqeo7mgcyujn820lyl1ey6y4rx968pqi2j89krlurbpfbkm13owvnymgt6cqc5ghd2u89wxgbg37fjzhhojkjy48g7b0gpf8yz916c9p56ybs30zuvcb2ghz1xz1uuh52al9is9rnqf221b3mg',
                interfaceNamespace: 'xqon4jpo8ot4nwdyibrlcp6j2ftbzkopzryiy9yr23k8w1f2rsqzn02tk3jt9xsffrih379kdw2wy29zlxlbrepelp8xe7jahfzrjugzl48mkncwqybbw4nzye273esbtt744671dfys90osdsephcx8wv1x9oat',
                iflowName: 'r7t22lqyzo13nylm49g25jil1366pmvj6ebspm1dwp7vw3ks7isvf6oc5ewent5zu5np84c6ahqulnrx1sd4a8s8pbsm0o00g4w5ccizikjh3azo9q697wrq8r01jh6jn3knpfnxgmxp430zzo1ahp58axh4lpbd',
                responsibleUserAccount: 'z6zqk4s09ekir1qjnlk5',
                lastChangeUserAccount: 'wivq4sbq887ozspmo2s6e',
                lastChangedAt: '2020-08-04 04:55:31',
                folderPath: 'mss4189k8s0ycmojvqn6oeoqpx6ls7zmg97wynw2rg7hijd9d58kgrl1ktjprotplolew2ybq08alk82m0s5b17kejd22hsz2el0fummif0ysqj37s56r4qpc2ztaday7yp4f35vuoy8blgrknalv7sdbk6n9q0j3h6382pbsxt07s1jpescxw4wzhtnnn240kdmvsw9gmcmo7eudjxjy4igpmb7dpwxtinlu837vyqe2sqcde5rjx4bm4mya3s',
                description: 'fctoxija5foz95kozghqprlyf7l8gf0zk09gh9lhsn8xbnu58xklxg1jo6iz1q9kde40eq05xtm6kytmtfrghzdm75cuylhnscoigm1uvm2uy8hmjo7er48334uwsltxemwu788lc4ch1yytqpor9nlq6qmull5k7pm925zfrk55y4rbr3alq3gl3mx96bli1ue6u3v8hgzye2vm9to4k6njucu1fyczta92bpy6yhsxr8kx8e4eoo3oc705fj8',
                application: 'hlkpdku0986sa5bxzypxgg2p7wytvzqwzr2m5t199n161exbhzrje8koul13',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'fooeab2p0p9ue3arnhn3pjjxge5ipjc0ol5u6o02',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'cnu2fxiktnuhoomnxg8w3866fspopzhrh7yuw8jpbk63op0pru',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'vwzbwxl6kzkqujlst26v',
                version: '5kalpv2gjrx2pnipr2gp',
                scenario: '5ag92z3edwepwpwf6fjf6erk0d0xpshlteccnq8i6p28084tsutehavs5b2z',
                party: '7t49hu9qq94giql1onadrkn4ou69jga3gmycx9kra2hnup4k4ckrimhqamvdu3onzrsmpycebhqthaw8zgqvk5tp6mmyylhnn8dhrtel6q3xzrfqeux45szuhbmyd2nx30lpkjhdhkcoy3v5clnnjxqdaagci17j',
                component: 'jdhwauah72woq1kffesl11dphc0jdokd2c9kh9fr2qf61mkqec27jpnnow57sz9hzou25t4oi1lcfd0tyahktq6g2h2wppnpxh6vn1hbtcmc0l8gdjhjdtrjbv8tsvgxru0v96d1du01132734mjdjeiugli3c9m',
                interfaceName: 'mo8hmtkqznjbdbrol37c60lnkf3qksly3fonsmoeks75j201grfcseku2nbtvh5ikv02su2axe1sypfil4ps9z5h8cd0qss69gfp5sh5t7q8dyjb0ayp6sno0l57v9pme0hxdzft9aijs5dlamze70e0d2pvvjp9',
                interfaceNamespace: '9yjakvma3pzoxmznybhswuzgnzvs8v6as8x7ypkjhpkuvx1si25nfg2l2ps7jem2b1sw9aiau6swd3by9hsg21ex5rgw5gfrxaoupediphs6bf9mqlrfiac66xtsc2omlqgwdc3g851xd8ihh6cns5m0q4bq0z9l',
                iflowName: 'wwd61u322zsdeiu99fmxuulea1sye8n3z77zi80spolpyheuzrz8z8tvvbcskk8u4glk7psr8j4dkpxtfnu9st02lx67oey5apxg40xl5gf4m7f88rnd0k7ao6tl7b9tctf1fqtjoqvtsmdag13h8i1uytbjx20l',
                responsibleUserAccount: 'iptdmf6vlqbfkyua44cj',
                lastChangeUserAccount: '4s3n49nqbtfua6aim47i',
                lastChangedAt: '2020-08-03 20:39:01',
                folderPath: '8oabcyovoixj4d8lwrpxvo5ylvqcst4i6sbmsr4nbazce4v5cup5d4605eks3btjzre1fz46h1w1j5xznuttnqxn8oh26kfqpxkulgdfsjp5qb7uwbjv6nlllrfxwckh6xrtqo9vljgtkf3wlpj1iaodupz9n079zagm1ruu927rb2cew8e4mk014u07ij6fimm69zw8b5fevrxy4ak1xsl6buopzlo3eaeydb1gsydsfoyskq8hc3ab5t9zgggx',
                description: 'hyjeo3rrl9ps90hxmtnu6yh8uzung747qo2yaswbr660y2h1rjyiy545qj5l947p2c9ss825si436h6jloypanw9x5lwd9nkgr5zyw8kcaf6x9f3vel3b134k80s0nhvkhyo5um1g8b5h1wurhlrxlfwyqas48bokxr7l38ne27qbiwu38h3ezz8fujyi555kqzfc1zp4wr0jzgymfa4hfaf87r11t2kbvn46ktx0l3f3k5wvc5hiiiasz2otja',
                application: 'iedf6m9swy3l6sq4hgk62t4plvn9ir4ix5lqzc574idca25f61l9neze1kya',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '4lhojvrjb4prkhoj5h2kk63a2m00rvqyn6c0radc',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'bndsrw10accksft2triu3lfaonhih1c11seic7g0uzxnyvjmuc',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: '30yq5t8rjzz5ekpeagbo',
                version: 'x7pqpb9on58o7yxjawi2',
                scenario: 'r62z5cm7fdm2zo3hx8uifqfsv8lm9t640491fsfnqkx6rakwr6b740vfpfnb',
                party: '6cdfhup6ss32oj9fu8cac73jw3hhdkd2b0gm9arwbbklu7fl7tjreub5pk21mac9uqeexvccwgaymg0u54q76x0rhhh3h7iukxah7qxfgg7chxmynq5zqwkaj7db92bs4yrqfhkmqon0vm9pcqq32txora6h3irf',
                component: '8sz81dpokxsi4uu7g658xlpuzot8nrrpwzeosdv8zjftqx3ec3kwxsalra9s73plq51z4ugyxx6w9kkbjsmzjf6pqcxmi63d2qfkgiozev33legmx3qpg2kk8s5q0f4cy8jgriqbildhd3rx9dmb3zpycwvu60kb',
                interfaceName: 'iodyyct537fhgal5jfx5za0e6ra9jv0y5rrb8zw8mar0quelm0tyg5qrxwexswom7noi2xe8b11yttdxtstxepco9poy9ijrw62k2dxa0dfsat94wdj5o1469az97c6gt26n42eu5wck08afgh5ghcoabpv83xlc',
                interfaceNamespace: '7xmf0uses3w267df6jwuesfe0xj788c8154qcz7bxfefx3f3ipzaxw6vz8zgn024ci0ja0emvccbfam3yhl66g7xee0eurgf2tnffj76fwne4andc3uo3l9p7lu5pmcvrlhh1jba0580jr7be61b7ejav6eodxe8',
                iflowName: '15lq4bitgoomsnbfi1764mow775s3izx30fo3ikac38631bi2iwze8e1hjnxd463jo6s7ch1ibj4veqjcazrft94hmf6x2sguw82rh65otrb8hvzi52diwo8noyz5z3vflj47e6903fx3gl1gvnswss4giicet9z',
                responsibleUserAccount: 'jz1li39p0vgj5g0ozc6e',
                lastChangeUserAccount: 'f8xis9xua1lowl0ejse1',
                lastChangedAt: '2020-08-03 22:27:18',
                folderPath: '7ugmvv3r6ec47nr9xgi6q9cetuufw2dfakgge5lw44fr0w8ne9ra0q9hdd00vxf32ydyj8r6bevnnytn5pb8a4gp60dxcrtqq0a8hm17wixk6ka6ken975p3me98ou9nbce01lsdmzfnje0eydmi3peyx5on642fnahumarypxxq3db8vjrbmyx5098bvcj3nqzwu18g321ap2tfqochlndgebmdhc8x92cwjiyk687tn0k67x0c1lf0x0tp2l4',
                description: '7430mw5xzcjtmqt4cac0qmj3s9vadv7qxi2sh3d80uzbkg80749hiaag29b8hemby7z980n4t6pkygfojacuxbih2hderbbv975xsp9qw65njwucrw267yddlpbt69u23sb29fjnb1ymqj9k4ixnqgunfa7fg2h8ek1uzyc8z6ovh4wodzg99jsvwsfppkd4uyugh9bf1p9np2ww9kfpjeief1eczxqsqf4dcbvlhdqoxnc034tic8bdnmak9qw6',
                application: 'd9uplhjjfk0kkwfwpp02qlrwnm3w199jx9bh1lke484ytxyysr9ueuiqc0w1',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '9zxpnh9tbu8qgpfewdoj4r1bq66eqjuiunfka8pn',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'xvkvxldlp5g7pi4jsmfbbpmkxxz1fwfchrpnbuiu9sww19u7cu',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'wyigkiapyoohbjvtnerr',
                version: 'lr5f5n7243m56sbwot0u',
                scenario: 'aq0ztduegaupg2eoj2179e3s3uzz0sby8qp9gawh9kdrda9j978g9q0y7aa3',
                party: 'sewijy2ptu9m20dwkm7m267txwor0ana883hvzl7te5ozuqbfq8fxx2aku5n9mt5jx0dpebs3u0hmtvt4rx3sxq15z8780ww9uekyqdior9qvxl4cfdu3934b84jntz2tb4kovsbhmdusddhfeok62bt8isfmt93',
                component: 'a5gwnh2jyfgcdcx7wkf5w4abvyukbdb3qiunpg70sajbme7h00mh4i52dzmnto6odh47vuafkqafgnr06r019dy19c6hxgeyo1rppa15xo1kcyakhsrzzi893d9kx1wmajm2fllskz05c83bsmgei5kouzsdaw3m',
                interfaceName: '42pspfh2ezkvn7gi8vecp4fdccuo2x6yszdqutivpmrnzpn93a7pll4mk1ovv0k7gpxpau8cwwsoaxw9jztfvipw88fem23jaya129z0r4arj7wzxz0nl5ytgp7qjs7lr18imjczdysqgg7sv36bpuc9e1jlf16p',
                interfaceNamespace: 'ifiu3nmq4ahjop3lvi6gb2rhp72y6do0p8jrwio9tgzlh6uo1q8dh52t85gbn24usqcjs9b94gdhivi55ixs6jc7f6a8q83n0wmb8cij8di8mqsko75zj81364pl1n0hufd149skvvt8tmumhne363zjwa6aeunm',
                iflowName: 'ct8u18cmcna91atiw03z4z5ow29wx63nfkfvee2ratslv7lvzdibqvkygi5z4em8iboonlij5ln847nrq880f5wdma0yf0uh5wwwnuzwpdiazug7s3a6v3o6bbi0k7y5nh7hhdjhjrle15qcw4em8ivf06rt8wfz',
                responsibleUserAccount: '72sbw6pvrm805w1d747f',
                lastChangeUserAccount: 'n2hmalj57ubm9lq21b98',
                lastChangedAt: '2020-08-03 19:28:44',
                folderPath: 's0wxp6b6wuf5xeo3yn4xlhp0q5mawvdbokcw2ofcv9g4vgrdhzcb1duy0fvb6n29gedoa3okek4j6r2vzza4z3fyzhlhpz6n0pz2gt3c41sc1r237jb2kjes3iblatlr7krdf6s2ptz17t0naax4yksof6n6d7uqzlz7jayjpnvcrgec3jyyb4m5ztw3m78ioxv0iro5dinjxa5j1999jv7vlipprcnbrakcp161t88tbqyewkyb5w1iixtkhk3',
                description: 'tq8pqi2aaubdlplw96mxaqr20jjg4fqba2vwktjahnjthnw4m1x33u8f4q88ekypat9wilrn6vrxm6rde0f7a4k11g8323hasbfuhu050bvn67wgagkawp62wm2tqlb7kj90ypimsvfki00speyfvhg7hcv9c8m2jz6lyu8i8r2nlfjguujf1ig6prwmn5zvmhtxq34g6o28q4lp0svl5pw2wvo4xqc43bjwoxq5vdpc06hcyodcnbuwv1ergcw',
                application: '0dmucv4fwq5zrqz2izqr2r2mpprxl3fil3egk8t5d917e8n9asi6jriptwetx',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'tqtl9bon919c4grr1kmigjh4syacufnpjm6fonov',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'ibkv1czgf6t3wy2evc5ulw95mhh1di7z2gcbuun2bgzsz8g2y3',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'x9twcfn02onjb5vt41dj',
                version: 'pb1g11jux9hi1o4pt9xm',
                scenario: 'uk6qdsz1pp1fmpsmlnv28lmerr5g0bie62dhxanwab9hqqi6vtxnm742yyw1',
                party: '5tba94pl4429ipnsiq38rg31170he55pfyicow260tpj69fllt3426jopqhmivykodx5x9rfu7lhdvp530at7mjw7sitiawqvlma2w3pzhpazdpvlkkt2d0vqi38k2ed7vcgxxqknlg3srbbqti39lrp047v3sgm',
                component: 'd4m9v4zrlvg81pbpu4zpfm70934bq6sd9yg8zjx9otx7ztbtgiyb3aaoa42eq6uq73themgv9d6z5sj9ts01w5t5h5z9x8u3dgp2ncgisns2zmshhfgacvxfbplf01g4guv0jt46rgn01nsq3n518cuxh9qnzi1u',
                interfaceName: '97t9jxnazyt7axukrvkhnrvnnjiyljicfqtrrpdqh6cjrumuj3f37h4x8p3cmds99ka0c0hlsvidpczafcd8itnvpbvchtt7a8ngvq192ingzl67uhiw72t18vc15rd8t7p084vhlui82upri9zjwqvp7wizesxg',
                interfaceNamespace: 'rmfpmh4itvn2y8agc0i5b61cda01cdxs2n2bp325lf6qim3llqkaml0j3ydvz85y7qau8tsin68yx1pe77taosmvjlmvzdp9l2xx0y7ou1d9icu4v95yo7cmdlzs9057kyys1e4b9cnrz8o3wyzoaig2eyw4tqsa',
                iflowName: '0t2jdl6itdd1ek36fm00qcksklrq8my1c86shv6ccbcvo98uitfifjy1pmujlzo985va451x1nldhit7oljjit1u5fjn894yrtkej15os7co9jsqkenzai8pm64uxfyhvizmwffd6smj61uvjyxjr4630vtxpg5l',
                responsibleUserAccount: 'hwsq0rhsrbk1dvejnikk',
                lastChangeUserAccount: 'hu09qe7nt5amc5g48aoe',
                lastChangedAt: '2020-08-04 02:17:23',
                folderPath: '8oa3idwk804pju1237wsbmqffpzzntg950vivcb0e2euoqhbt158p86honiviszxg0c0cos9psoxkxe9lc4o5sg7ysuys3u5ilbwyaaftf3qhh68cskvd5dwleq7m5eazdjfglqqdr3aola0natjvf6m51bjt9fv1n0qd000moyc3tusc0cx1n8ud7tshhtoc5wdqfvebipo7sx55f8z2iegb97te5eobtjif1pe6sia8l4n2xbc63osq3zm2s3',
                description: 'csj0ni0itq2154femckxp7q3vj557pjn3m4hwto2drxc6ltfpk9rzmv9w9wpl0hzn03ot87smgzvod7xpbr85zlwkfp8ksghsif4fy1fkoyw443bsus7zqczwp6dtky6d9msfbows1si86kzpg4tilath0han69dm2negggrmyjl0jqe54tmaaszao0cfn78j820bw46v9q7ffvdohsc4q32znk0z1rgwvtfb8ziniji30zolh12xalsi346gxu',
                application: 'rvvi0xnq80ybe6zzcxgl0nzvfdbz5oj6b0b2vh08hkd8o16udhq6nh8ztwci',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '286o79xn846ay3yx78pif9uxbfw4o5ox45ij326v',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 's9cx926eiv7f9ay8a6787pfo4d6z4vld64xwdqken821e4bps5',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'o9ay5dycxxtnt7vm3jv4',
                version: 'e1ogvpberhouatm6azpp',
                scenario: 'l2il565aml8ls02kq3vmicjo4wl7e3emch78abpn1fuwr6xaq1w0un5vgdx9',
                party: 'mhh2y7qqgf6ozcz1nhg02x01i9wwkpyo73j5599g8uji6r8dxze1evw181dgeb0u6fvoz7ptnsbk7b01cfp52jx56u19grhzbb1cpe3lciry6jnrzilsbgcwfav5o0n4tt4v79ciie3tdvs82nrcnfyo715xr7dy',
                component: 'uib93ue42wjojr9qmntkcds3feh5r7e8287lscg5ubioaja0lxdps7r4tgq2iadttno0tzy0s92iw7hvprb1n4o65yvv8bhapuevuyjo0fn47t5xd66sssdrpgpofdnf8ixp6av9n5ku0ec5i25xqaq4o4w0sjiq',
                interfaceName: 'jphvhwkexy52etcqw75h6p50qgm81drj4ve0u0utdbca72rqfj1yz0w7oxztzbi6anunkw8w0nb7mvslvd6ywknk5e847gtthsed8lp1dmumc7m099c9glp2mw5rjgywpvs0vg22l03p73h1z1nieifgw4y2s6ci',
                interfaceNamespace: 'v5kvxsctcl4c6zjw5btx7m1tvbfjsbd040rlrcno75gjjvbs8k881o1mcuzbzp6fvwyag6ocij6seigryfq1bjytllo855l476t5wmsks49x26ih1438xrcame4nrr1jf5k4505hfcky4nwvbakebu1602fl4kqm',
                iflowName: 'grdn8tsvnmy20lu7z50bkps3cgssi2rbt6bn6wywoo7pjihdut41kgjl4wn588az1dahsesi4wm8emykyhbz5pp5qwoq2fimhp67n71js4a35uw6exoutkhpgcs3hbx1sew9lwmm782hp6ip06zbt3nfa6qzjzxn',
                responsibleUserAccount: '13dt2lr7220ezkn90zex',
                lastChangeUserAccount: 'gk5nsmfkg4jg6z88370x',
                lastChangedAt: '2020-08-04 12:21:53',
                folderPath: 'jkpnl58lzshzv7dkjvu95rw2n577v8fng5zvscgc4fzzxvg4jfrfbqbj8xdsmo3i2jip38y69esig1rgsu0ix0yvnek6fd3v4bsr44yrgjtmivt9ubhsco50mt2xnrx4rkxhzl9jyujji8bhpt1evjgdixfamdyr0pqjlil9pa51yklj6gxt598ioyy1gxs221k48ag13gdsbg52u27fxb2kumjllum92dk7w735cx7rps4dwo9wnsa72nm91p1',
                description: 'jnsv0wbtqsmoals62etqzmfdzpx4q9kyr1ynsn3ocismntdlpswgiqg73ecmijl7zcmlhu8fmxbrqh3428c0h4jipw7utilhjh6cmqgbp6kf50b2y0i8zulbpnj4rj98mnn4y078xperlotjv4l5im53qezut2j1uf8vs24a2detn6v4q0ln7bugcn2xwtt1o7t35kf3bna7rpso7e9n34o9y0vq51g8dbz8de3ympgc6945khrg175ldrqx19h',
                application: '82svz2bg643rnnyd1lhwdyzt6t3h2a9w5517rvzk2u56cfm53l8jehu84uvw',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'oddqa77wk5anb1jg20iiaoze5gjhmv1hksqikpgo',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'lmrxgcwnh4xusab5j8bo83crpjia0ewa24kmepy19fjthwf93m',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'mdrrtsnl82qqlygjp4iy',
                version: 'upx31kdf0lo65fsvkttc',
                scenario: 'jtbnsnmtxiemvj1tob0snl1niv9hu9rkvspszm3ywlgwjioaqgp3o3cphmcl',
                party: 'j85qz2s6xx8kf4oritzdwki37sou8tb7c2cqojlwzlx5fzzuefxf6eoeugkb97aprg2ftrzlv49fksacsapzxl2zusq1p3bt5n97gjq71obe6vsu1r2bcnbha20ceea4wnrhd39bezn7a4z77w8k3hqzp7irvdyq',
                component: 'au61xwzg2l7sbmxp6y6qn3w57rrk03rycv9b48xw9quy8wwi09wgcbpjahfn0xzag14nbre7c6xqj2bfoaa7920okbjcvqb68wmhi6ywya5wc7i6pkuqmdk5wc3e9noesfcptlmtkqboqcu5zgpxkoc41rgieahr',
                interfaceName: '4rkc2o98fkq8k0hw4na0w1wnuehd8empn1qqyixz80wpk4v1c7fk1d9po0oix3j9u2r4cs4ny0fr2omyg13eac990oeexd9yk7rmylxkk85e567x0j7nmjs0c8ief9qznpk1crev4mhd7hzgxjvi4c2shzz8pi0r',
                interfaceNamespace: 'ccx69y419exsadh5eykfb4m2eq1e2526cor9d9cq5t9n3cpitvi3fet70mpl5v5wpgd754eqmgy6dltd13bvrcc7ow5881hckwh5ob83tv9ujlr0dkky2ep0olghqmp7k4pjf7idxvf2yinc1f3zjhznut15ymp4',
                iflowName: 'wcsv9ci49agvstyi386h4mz2jhdug5xr358g81rmfdwunryxjxiazg5x2eueym6f6vp4f1jsaps703b9kcfz2i2frvsx3t3bwaifjorxehrzy8ghtv4agueppazj14iwbhsi97cr0ltc0jcgj13wim9ajm8pw2ls',
                responsibleUserAccount: '9gryfht0126uknyaodp4',
                lastChangeUserAccount: 'yspnkd3pjw6uc7q48jar',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'uoyyfhnib51fz89e5tnh1uz0j6evov5qkt1ug8gybnzhzlr0r51fp0wv0kpg7fu0czsaju1ceww4lcgfpe6gjk1iii9swhqpq9xudd8a3cs4q47hshxueg6hrw9d80fkcsl5l3kjgadd6ilbd8ai9kpennuy54cbo0agt8e17swzexs211w5go2x5vxyhkv3kmouru9tsr3hlxou5crp4kaw1jg4a989cpzmw6hkaecbcgl69iy4ag01zwn154c',
                description: 'iugnk8n9tst0eqeiifue6pir1m3dbnvaw8tnu2rp79clvzis4k9pygi66ejfdw847e5r3vg6dcx1c4hr5zro5eq2ffvw3wt7i4wmoslkrgaekfdgfe599ugbdrbsixkcmdkirxt0tw61ybpugkf587vhq8cgsgo3vm4rsg57qj8f3xp3c8efoe6jlcmpa4wqr3mn8a6irsdwltpm9uinkghxkw74fq011sj0v43rte75v5ym9wyuem3z40mts10',
                application: '05uaqr8g4jy5a9jwiorainybwu1bpdjtmrshn3fq4frhud6dvlmexm8pnv6z',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: 'uc7fcvitxpmza13cldt078hp6dak03dxg2xs3gfq',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'ymiuzv7ogpfe7lmw1uvz5q50qfugjuhdcpqfmm9w3rq2mwh15f',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'zwj6ip54gb0fkadxyjp5',
                version: 'tvpdnpowbtceb28bu3s2',
                scenario: '6tae4uiv05lofiwpu7w5p6glt59lg7sqqkmeocwl5g4wmzzkmpkgrbqospr5',
                party: '0wn21vcs032n231t9ho29upwdxbv36xfs8q8ozmd8smiu2j9tz2jux9y4e11uolkna7sl6mxqrqhs38o0dhcrkcp37ldy4irx3eexrs8v6emq3r2qb5h6rccqfibbvbr1f2kxb233alu44e5698cbyfv9c8i4glj',
                component: '4qjcjfrq75ptv11hb2s2iw2oiha1a4bs24t0dnuqdkalwduasa2cjpj4yuirbqxuvufj4fl584c4q3agrmq7u84wec9kt9exriep7yq0u0l7kee8nnaky2o4mz15z6wu6wshzg8jrukpdhje9ffwi3rlrg7jn1tu',
                interfaceName: 'qzqs1dul38qg9q9j3nfucx6fw5pilti9vehz5jfp59nbcbtgrqo2g0dwitn401thgwp6pi3e75vjo9684igzamvz5pea3uvwz41w7y5dtm1y8ipwh6euars1inicemysq0roay1wzv25scr98lkvwpnd451wbjgh',
                interfaceNamespace: 'sctzvb8mtyb3sy7nc0tbtua7z4nq8cat1gnccwbqhzfovt6szi0gey3c8k6lrtz0hk1t7agcauktect5icjmxt7yw2fj7q26ci4v5nwp7e2ncabn9ka0fzxdnwjnhqc7175j0p59zwtr4dm09u0esmef1l0n9j0l',
                iflowName: '9s1r3vr21ndy66vemy6d3qsryzktfofur1p34w7n59pikmvkd5wkq287a269u3xvj2by6ewdxhcqe0eh4uo5sa0e7sb0ir2wq60w03fcswl78lirmlfvfiuenxoq1ezkco4lbfq0dduab8garw5e3jsa05z45ee5',
                responsibleUserAccount: 'dhkd5qko56sybr4e5r96',
                lastChangeUserAccount: '0hwpu4d4dcwh1c7kqr8p',
                lastChangedAt: '2020-08-04 08:33:19',
                folderPath: 'yqi12u4e7uxr19nf3ljoecu48np70gef7p4k4tdseu831l7aolx9vtxpzdvwhvz64mnqkjfk96bww8j08ahhddwvv7qx6sowbf6ef0zwvg7981zeodunga4ibk99l00lo8495otr1eixhqmab9i9kvwxs1vtkl17ld1ubn0oxwf6sjjwptcanp0d8jj9q8bogz3382bzbt0hohzde37rrjy3lneyh0n27j7g0nndhhoqc6vl9vw4wxdv9gt5cvm',
                description: 'sltv8coowzey4ma9u00tuxyshm0yu9nyk1md6w1n7lgyemkhheozcja57ng40lgyy1clq1by3ugkaf4y87h00iwtb4t0qzs8ugfl0scf6euud97cy1wgvlvkdq1vwnl6m4yqbzp1yv759iws1rbjub6xhitzahfd4zkc493q2j86otfo07112z0cp5824tcq57ujdde2rdaeth0wpeld09sv01icn3zzvynkael280dhvxomxte79docscd0btd',
                application: '2j7nstaioe6p056c3hoy9dqyg6vkin16sp3il3ycx2inzp4zmpgrat6nbg9b',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
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
                        value   : '7a7d4a70-9824-4e0a-8a34-ad4cee448c38'
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
                        value   : '19c29c1c-2b1a-4374-af5b-9b4a8c84b387'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '19c29c1c-2b1a-4374-af5b-9b4a8c84b387'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/e88c833d-655b-41a6-bd71-5f9eb79b3dab')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/19c29c1c-2b1a-4374-af5b-9b4a8c84b387')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '19c29c1c-2b1a-4374-af5b-9b4a8c84b387'));
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
                
                id: 'abde0694-e760-4eda-b837-7251c12de558',
                hash: 'c1zfn1i5agd6bum170fgl12edpkffkkwjdrm4gci',
                tenantId: 'fd81f720-80aa-44eb-b00c-60b1db073743',
                tenantCode: 'yzsu8q2y4o6y3nu64xycstqoiljabokw0mevk8w0dyrwadxci7',
                systemId: '79fbc033-60e9-4470-a9d9-b9fd899a1f22',
                systemName: '72umz6gf1xuwrkqvo41k',
                version: 'o9gzu8mgvkttrodgs32d',
                scenario: 'vk0tq6xqeayxystaphoif6mxh6ehcji4bginy8hs8ugzzaajyr4cuh18xw1f',
                party: 'ke5okbjeqdibvuifdja43mmcthig78dftoe1f6ejbep5q9l6iy0s607j9mr58dkg8ugik0omuxs1cr8jyvhwxkunrc3kc9e5jkm9i33ockoddrh6nzc8zj3euwuco28jxk1g4x2njzxqiw3v7mjfbswqqma1h97q',
                component: 'q6s1liu537956jcw3yyt2psk74l0k7zr0vvfq4v8j1l1p813rfksdkgdob4sisd7pio1r0m0c54548i4umdlxxuvnxnbv09vl7nv0o3tifi8svxnruid2zl93tbtctb5yoz3ichax16rap3f38km2ka6ssddsp24',
                interfaceName: 'ldtmuo9ujh14xql0h15d55sq0sp3xp0tcj41xlvq6591grfw6lzhtcay1rmfxhc72spmalkgtuxw5c4gqs9cfn5md5y5f4xgyxtbu05u3750m6rjae91s20dfsl8m65amr7k51o48xcc2cwosmemxgb0vp1k3i4s',
                interfaceNamespace: '1wnooi2ze6x5rmxlis6606cwa1eyb4hldee8ki38s3t40w6hww8p4m58r1xpy51nkoag489cjkcpvtmdlh3sj524dnw69bkik0npmflq72zgmdas9h9ymsy81jxl27ttrhoau5orn03daj0th3gjl4om04q6t4wj',
                iflowName: 'nmf79p2nlfrn5cwqmuzxpsha5ggucp0s5biony00gsfbae93j1avwbc0axi75g65zoqsjrh25j5qyaffngreje5rljku89wcgvcaflzxnd5008xe7be8atjjtxkparq810dxp6ev5zl1aulls623jnojc4zzrnqf',
                responsibleUserAccount: '7rvsgx86d5lgwa3re1cd',
                lastChangeUserAccount: 'c6pmm2dinex8i1lyxuxa',
                lastChangedAt: '2020-08-03 21:09:03',
                folderPath: 'jqxnrvekdjzihaufnftzw5zm9kijogc5fdqj6pfxyea1relqy01daf6zg1lnvgxbsmfin643qy9oailnk1711ocureq7lrh4xan8i8d8bn8xu8pd644jfznlfbf7c2j8co58xe9thf51wzz734ym2qz8hrog28ev2hvso0d08rag8shi64yoaxqltpwczxey8ttlyer2thl0fgd46bapwvn1kzp2jalczvmi4qvn2lyu2w80qt07h98nccsbb05',
                description: 'glhzaekpxgsytaw7iaapmfmwyylkn9a46txajacyyje7xyhn1kk6kiio24cnmujx22srf4vnyrdd2nm8pppsgdcrad63vzc68due6mzay31fsz695so2sb27qjz8ktydf7aghm7dbewbn3sz1klewiwnv4d1lcitl6nz4qk5b4jzt1i9jcbqkehokopyjpwj2rnnays2m9mhetypd9gvjz8wi10bfwsua4dmj1pag9uvrlmxnouymi10luq3779',
                application: 'mt9ajg7lufn8wxb6x8cytt9mishgvi2tghl8ycw2gyu3a0ef35swim22oxnl',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'd3607567-d4c2-461b-8dde-dcdaca56fa2e',
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
                
                id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                hash: '4hzm40vcs0ry0vebq0myjlobi55jf9ctv44o2n7p',
                tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                tenantCode: 'ud4pjtb367h28t1t8ac6rdu6h1fgh3q1udrla708sxlbmq3jaz',
                systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                systemName: 'y6n1jn0anwnby60apqg8',
                version: 'ibp2dv3rr4zfnj0hav1s',
                scenario: 'lm2xsk664ckhjoepm8ctz4geuqgat0l08o9zzed25i2o5w2pycmcs5sutuxs',
                party: 'fa6p0mq1ta5bx3jcfmmfwxhir7nv1duofb7i9nedc0s3gvymur6p2ln9j5zgst57djw6jb3duyi21mho0ts8dsp5bjex4ykmtyq123leafwl4kz0kegc8cozk5g3kxgu119nvx2u3l52uwef5yhkrpatvieyxcms',
                component: '5yfak21u3k3nivjk4ut4u5bpxkb2wn3tsqebnv2vd9o5ww1s6t9rpgdl6o1on9esdimx9z0h3zsc8ey0g31u2fsjrl98z5g4j1b1vsa5bxu6y48c27ph469to99gubxnhmpa0kltmy3z56tip9qusuyyt96un0a7',
                interfaceName: 'lg2nugjyceiz0j0nicvadmprchilkrrs2p9xv02n7w2yny4nk9jehe4xmc9wmbap82nerl8ddlrjc70n1zw58yr150rst1nx87lxac938gn1nv1kcloc2uzgkbch5tsdrmhy64rbca1dznisc14efo9ns2wljtow',
                interfaceNamespace: 'c7xkwtr4hekvfhw4ptd16drklke6fb5dhdgpl6b7ydbj01t5b8a5vufa7ssssnkj5zx5tj7ohjdt64dzx8nfnxr1ej9f15tepewa9eez9reqjojg05x4g8m69jkis72ny9l0igoyr9691gtvwl93tpysjrtsxfr8',
                iflowName: '4wl5ceobxn0k68j6yispge8mcivmfdsup1a1xrlh2zyi412nxjj2ore296pvruhkbrhebqvmxhij0sbkckjotkty66s89cxud6tn6h1z6z0kgsh76977cximxspgtl77bdohl4ykf2j5g0qnrv9ijkzb349z9de3',
                responsibleUserAccount: '6qs84n8ffy6uzvptz624',
                lastChangeUserAccount: '08c1skf1ns0ehnaxdb78',
                lastChangedAt: '2020-08-04 12:01:16',
                folderPath: 'uyc3j7r1ps95c3wvxveyd0sr7rehi4j6keuxv3tzzt2x3a2o62qkpqbqr2fg3hdfaupk5i62fnipjjdsjbjjf7rx615pfjzwrpbwp69y6q237fj9aotnnpqtk6um3wirntcgo7t0yp7x04zf84knrac1ush90aeh43fkmreh3l9wjzldnha1dbhewam78lmo10e6rio4l5a9fo84v5gkr18lzmgzs94e9v2h42c5v5gy1q6qyamd9ttr7doh022',
                description: 'kwnw0wlubgqy9acjqoj79ve06ql1uboqvvwxhj8z2djtso01qdp7kvbl7q9y8hixqzfjv7wzv9vaqduf95l6g1wam6xu7emg9wmbgrrmdo2xjjrkxh448x58js26ogsggfy504u4mcpxk3hysbqkf7o1bgv7qmkpgaz39e5n8yy5tc0djd958pmok7wwlw2dkgv92uqhpwiomhwfonozcmqm8ns2uy469sj0xmeoumjf9choi1lmx270ylx76uq',
                application: '3mdisp74o605e6mrlkhbyyo2gzmx8wulnirlq8s09gwgfvgo9l2v8ktznreg',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '19c29c1c-2b1a-4374-af5b-9b4a8c84b387'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/4da210a9-7b9d-4068-ae83-4eb07ac146aa')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/19c29c1c-2b1a-4374-af5b-9b4a8c84b387')
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
                        id: '9ddfe5e7-5d65-4d87-b9a9-9f3e88b0afd5',
                        hash: 'lz5uwb1a9vfz0nrhx68kobp8oserdo4c72j74e6i',
                        tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                        tenantCode: 'nxr0r314fwdpfoguvfy6pp4zg3vklno3izmbs8f04ukig01cim',
                        systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                        systemName: 'fhwer6nobmcz5i8gv7aa',
                        version: 'rsz9y24mpqkbzy0vdv49',
                        scenario: 'xfsrqz3mxmf3grip7fxrzaladnn0w4db0wgii6mkwb2wu6ufcql41ntvo63l',
                        party: 'k3qh36kk9kj6xb79oq4os6e2fh2xit5hqaeksa3dloz04vvhoroijfk7wab5jz54mbfqli6hzg2qrl6t7cbln6b7ozo6tnw4g5zzvejl4iy1mki6zzik7747mltlhv8oi8v7fithl5uxixe0g2rnha01ha2viz0j',
                        component: '4r4m0h384ggx1eiuj6ocfty4yaxo8ohty0ghty80x58vkl0eygfyvnre9rb5zwr0e4ls5slwtx7n5it61ge1rbrrutj9rbzwxazq242qv626mvt6v83p5mfqnq8tjn2egdp468chykildojld97l9yfy88bb91tj',
                        interfaceName: 'pupunr1x2ta9fasfrel1y44r1rna5tbyhewk8fyorfmib80614ziavsqrxnj8pn50kyx5d5q35qb2zq6niyqp0kyrosp0lum0eydn7bca5fhg19zqub14a4mq9bppq9pj5c68q6y1u09hdmo8wciu5pz0ycd19hm',
                        interfaceNamespace: 'djt593u2x9v3x7unbk190t4q0sxxx8h3k906hy3iaaoozxnf9wh2qo54avoyw0971et6duyb015dz8z2attccisosr3xqpfjmv99qqnlpl09y1e8g6ejrjbumoz11zeut6mbb0hy4tplbly2tsh52jzcjnu9g5e7',
                        iflowName: '2vkxbrdhougxg3va1fkb4fqqsv1xmw0krrjxj61pspf1xaxory5i3jftzekuq2sh6xper0z05ouci67p6aiilc8t4g12230nfyk1oipdgxtk3hcx3zhj092jxft3y5tad03goda61uh122m2zq6lyh2us7ecjs6r',
                        responsibleUserAccount: 'f5htb9ry116oph37im0a',
                        lastChangeUserAccount: 's1v5ip5o3s3ztkalyesr',
                        lastChangedAt: '2020-08-04 02:10:39',
                        folderPath: 'td0clb4o2i9x0w2mmzcybsc6zgwjfdxwseyyeqrn2wo5b1vjng1v42o74enphntmo5h8lo1b5uajxr8qom0tm9v0p96dkjaesrxmraik61x2z58gpp3uhgg1xo82yyqpua3q2xtrthq5frs5px7jkzvn1hrt9e1qsvie4w1iqjvm9z0aacoawp0upt5hx46a65cukcqatd6sx64p669w075rlwlgqsiq2ilhmsvu0g1blkxqy8f2il2s8g48yc1',
                        description: 'ds05qrhqtw8wgcz9n7zqpjtk6q17b9fj32a2286mjd03e6pt4sbcm2fltbasmzqlevul17mvgixvztuyborqx3wafyat8ew91vhax1q2x27yhs6ff5hd95b832jytju072cmvbqllc89avt6s4iaet9lzv3h2t3shjzj1vc3xgd7uviwad2rakubabc6n2dtpjwkxyp3xul95zsldh89gy8u6zv7pgtg3qxoibz22bfjd28be64n5ssbxesy3s5',
                        application: 'iojxlozkdkbwdqdlpjb3ui6ths7nlvfinpqwvtra6ljlkxls34lo74vdii69',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '9ddfe5e7-5d65-4d87-b9a9-9f3e88b0afd5');
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
                            value   : '6f6b1b7f-fd2b-4ae2-beb4-1753cb456136'
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
                            value   : '19c29c1c-2b1a-4374-af5b-9b4a8c84b387'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('19c29c1c-2b1a-4374-af5b-9b4a8c84b387');
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
                    id: 'd4ca4a31-13ab-4289-b603-dd4779e510c0'
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
                    id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('19c29c1c-2b1a-4374-af5b-9b4a8c84b387');
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
                        
                        id: 'eb20e722-e359-45d6-813f-e2e58adcccbc',
                        hash: 'ejz25515n741owsc9a3xcqgbzysrnp8r1q8supx5',
                        tenantId: '71676271-4553-452c-9f46-36ffc21eebff',
                        tenantCode: 'kozmn5bpasx2qbrew0h16s2ymvwoou2z2aqf2e1grp2jf2shje',
                        systemId: '796b4a82-533b-4300-9158-84d8134ea616',
                        systemName: '3fnxc4bclsb3sp89hhsq',
                        version: '4mv9p3v0q665elidnumg',
                        scenario: 'vd9i834dggpx35vvm8u9ppghums1ncro6ossh56rdp0qbwsejd6m9fgd7hkz',
                        party: '2x0hfpy923ya3uts5isswix34a126kpuzoxt77l98qrmiaoywlwheipoj2icksrgjx6du3sb8d0nprhjz86ddckebzqa5ys5tgxabl8o2h0zqdiypzvlxjc1a0p5zikgu6lcir9r6c808ak1qj1ybu4qbcrypvq4',
                        component: 'fe58addu1ttnbux9ssinapge56mrsgs1jjn6kr01j24pdvkxjhcy93ibbnnk3y7xdyiei4k5ylfw9hwi5sw7qvgoeo1jhpkahdaxwvmb2j56rqooeclfhb0f9pp8mgbwy24vf27rd33aolzu05eusut6bngzf17q',
                        interfaceName: 'lhx3a9xyt00870pkd9xefnbi8o9yem7pi9d6d3htiagb5qmr2tv9xxdljhb7fcgaiy7wmythrtk4v0zzwg5dod5fwkamminvwy1x57mgt8562c2ql4kpuk4be42vyhkcxv43wzci76rs2t8ixigq7hjhadzdw8qd',
                        interfaceNamespace: 'vky3fjsnfmfodchnka0298fvroibraln8n6s16dz0v90m5pvcq5bxk1tpaixinc4pt7p8gk8cav90nsbghhvmzwqjry2lkzut5amwa1gndds3yw3r6ssvznk1rw9ne7lha41tcpcesh0wvzm62o2tfs46o2i09nu',
                        iflowName: 'e4oz7gwujerr1qml894bt3qz9orw7j5ezwk5hflpizz1mtnmedowv9brpyv7wbwj5xgysg1j1cjxltjtkkykyogmmn50w8guz9fluhe9gyvgp9ptxhxirgi8e5wczepbsha8l4wr3h94sylg6fhgv6ma2m4d4up4',
                        responsibleUserAccount: 'eujf8ft0zws22pdlsxoy',
                        lastChangeUserAccount: 'amambfysg4mthoffxwrz',
                        lastChangedAt: '2020-08-04 04:19:58',
                        folderPath: 'ypkva646dtcbjixi96qhr5qz42m8m8etau6ddc6d8xw502ptejmpepjwl1h3bw7ew965hwxd6n8bg24xlni9dpa7htsqlr2gzt7xctg3sbel33h5ff6lt1sw260oivtdpj8u0abspddhhpmc4tmonznl0miwxodt3vjhqzzaldr41risqsxl8j7h2e7weyx0b7dqlcf4p192odztvsfanlcqakidyxy7125thwhiy8kyoing6950xgfmr8o7fta',
                        description: 'vhti8x4v4ailuezf6kuyby6aj8bpz6atknmo9igmzqzy9p3ujj1z7un3ovp45d5v6lyrenpc8xr8ddg7k7gsmnk73rlis6gz82ivdf5nkqw6zd8af2e9hdmtyrjk3dccd6vjy1aiv9a9rsjvddxjhoqiv5oyxh59gx4a9hqh8b193bj1gso138pvqpr1midwfqwgm9x4gtgk48m68ivngpbab0jrzjcoru8eornap4uijn7j086sudpovinotlo',
                        application: 'bwv389fez2klkd1uuwibrlpy7fnz0wrsms7fybz56xk085uqr9xf5eq6h2nz',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: 'e7d7e353-baba-4a2b-bb1b-f22ce4d18f92',
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
                        
                        id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387',
                        hash: '034q73ami5v0x327ajqotxo4ptkswwbd2oa6zxv9',
                        tenantId: '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b',
                        tenantCode: '8f551mldu2j8zm5gpno431sreeq9yoz0y5jpxflp2ev8mf8pap',
                        systemId: '4a20b716-d5ba-4ee2-80de-084afd7cf1cf',
                        systemName: 'q9p0v15lg5farck83awh',
                        version: 'caqc7iul83glj53ho056',
                        scenario: 'm9alksyfo7srmllqsxhwz2jd53wskl8emxrkhtwgyhk8z0pqe4vodu9fqzwz',
                        party: '91uu3kkuwo6e4ybsia5mk0zz620h6bw8x57r797u93bp7ratcinttqen9fvf8sskwwsgpb4kj2aahf4sqeajk217j7bxg7lexr0cp8rxylqwbc6qvhi9husxkhpfxvn4mc5etl319o27dsfvc0rsbw61ddvskzn4',
                        component: 'x5koibk7cdktrzl69pnikigrw4cno66t59piclka8h0xou06gmeim8pmm3104qrji2aqz62tftyg19l8smp4xmbmgkf266dykci0mtfmouhertix0z220rklr75ndsl6rgoo0hxdsmgyfg80jt2yax3wr79gbwlq',
                        interfaceName: '8g9o1707paz9dypm1c49y5nvsns8q9jtfpfdox7hk15euu0bgvkrbiqo1y9dnxvct4fyyex01k4mjc1s44z0353ccvdl194001rmmgkig4zwur5rxnuoqyw3jw9y0bquk7b9ux5a8c5kca2vefwo8g0t6540r7fo',
                        interfaceNamespace: 'vtcwo2pmz86p05xsvaiko3borla4crtfw6ejarz7uer65a0dgc8puhbik1fv5nl776v369b234i8ai9j4w6k8rhjqojb9sg1ou2imw49ec9o8kt3wrl5q9hxdfw5xeok42v57imn1pdw3z9rty0zuj90d4jnwxuv',
                        iflowName: '46dpqn2770ah6vrlvbfeotd5e6kw41ggfad9usl77v94b7nlj0ev9875t06m5j5ewbyd4qaurbbsmbh8jvbg62afccnv7026wf7z289pql8ccog53y2m2aika1ucz0rsvxqezachclswgku1o9bzk63fz41wi81m',
                        responsibleUserAccount: 'vee4jp21xivfrbsbh6pz',
                        lastChangeUserAccount: 'y1vp61b3sd9kiamj2ugl',
                        lastChangedAt: '2020-08-04 14:19:07',
                        folderPath: '76m8da5ad8rghn4bgssghadgy6ia10nd1t9tl7a089j5my3wyxwlpqxdv6p7f5i90iwq8ou8hk3drsepsglpej9ki8nqbuu04c85yb6jcplv7v7j7e6zbab5yucqnbou4r5i4xvexui54yz6tz7wo3ap1smfk9hokswk3b5jvxj8a1n7hfii2f4uft1zq8klo5cwa55hya1g7asjn76ogfskgdltflxlr7e3ra78ut2aimp8ljt02vzyuov7ru1',
                        description: 'byjakt0ogjfgru847rrcwk6w6658ov7mu1nj8v2rb9eskqyquomyof30fvob0ycb6y13qy3enhw2t2gwi6tbsnabbduoyq2er1pg0qt7hrotzypevc3ve932g4me43q3qu8gr342co2df0kszxn3yqtk9rd1b96x8lw4vld59f7nq4tsm1i5h8ilpsroxwn31wnr6cadmc3qlgkj0rux7gehq1olf8c72a4ls6k754bpwqfcqukoh6z1qxln66z',
                        application: 'l540i04jzi682ycvul2h0vk6d16audy0y1sthkf2rchbjsedd2ke344rxbkw',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '6c55ada4-0e8a-461a-a2b1-63847e5befb2',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('19c29c1c-2b1a-4374-af5b-9b4a8c84b387');
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
                    id: '7127b318-ea6b-4164-8c7d-2ea7a1064635'
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
                    id: '19c29c1c-2b1a-4374-af5b-9b4a8c84b387'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('19c29c1c-2b1a-4374-af5b-9b4a8c84b387');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});