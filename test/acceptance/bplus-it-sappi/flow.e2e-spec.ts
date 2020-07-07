import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'lo9safur4yfgeexahkjp',
                scenario: '037y28r3bo9z4d6spk6jno6bxzl78z5ewh6ebpdkx12xabkalx0qd846o540',
                party: '6e8tcvukkolibeyysots94ehwiqi4tcez1pd6uigyld33k6w5jsl68wamofs145l2w6zlf0q9nx78swwlrqii4oi0sglbg6vm0q10o25n5gj5j2icsc0yshdyxm9vuopbfw3sk7evxn1jv7uocbu4vaut8rvdsdz',
                component: 'm28geffthd2j37hf7gix6cc9vcf9ezug81236hj38sm6qcjz74ais5lcqgxm9uxxv98y40b9g4gwgiwfsajexubsol3q41eoerhrfm5m261tl1x151xzrny08wjg785kpd9asjheb05innb1owsc09c90a91pbfj',
                interfaceName: 'vib3vslfcjcdnjbqj099dd2joqfnc1s8dskxrcc1so1wueyirfln5ifvog6q8rmh274xhltia34m2yjtoijj2k82he0kwwelrznmmb20ci3ri0eelico0tvencfqeqlmwpmvs4d09l9ylz9e303hvkl4pau16b31',
                interfaceNamespace: 'ayntntzqfixs3ho12byc300ojlyafdogz8dbbs7ca2ilp1d7fv3osjkx1h0u03vtx913t0vzpehrqv8hvhi2ywd3ckmsvbf8ueg6eyexkau3mswn3mwegu553cp50b42rj1zuy3tvddreg43e92pnfzuwg224e13',
                iflowName: 'afi6vtx6ru7uuqo22k3nbicebbzl6e29fj8kk33k3uo7jjvu7hx0sp6gthkabug7sz90wf72wulcwvq7435jdih23aeh61ihmhh2b6x9k1m5lh1z4vbs3hadervga1lwa7wj40etqs9qq3bmsdblzthtvecajtvi',
                responsibleUserAccount: 'hhhzvtfgutapobszw2yh',
                lastChangeUserAccount: '6n16rxafkpzagrjefrz1',
                lastChangedAt: '2020-07-06 23:42:23',
                folderPath: 'kbi4v1iz6yuliqkzciw748t3hsyrrnq9knpa77gsa3r4p01fuw4fqnva9vz2tjhknedld9i34xehwemsqv74q9imv4un0r6kqq42tif721uzlx0mapldut9r6oqb6yhv7x9nycchhqmbbby684j3ardpkb0ty0ynkr5qt8slx41qemq3a79fmni9idkm1qfyfry1nysira61gjdifl2a4fbzzm5cwe3w6vnj51fhpdsrp6thxctrafrpxc526nb',
                description: 'ulkhidn1mr8jj46yf9ucl87g3af8np7j692w32h43flgvy3g7bglcw9jfij21l4tj2td3qh833b5dapm9nxk16tjyjhns54d5ktkf8gnz6e4dj47rvi4cdec3sca7j3c11nuysh9eryj1jbhsqtgj90pk41nc8o8iohhw5xwnu1dywj1krpri8elivrpyeru0pbbfsf4w111s9huwa53nkfwtf2cbmf2o8evlzrutw4mc59clcpdvyah35pob6y',
                application: 'xt2cy22fud82xs1lkimhv1ldjulroxwf26nxshmjk7hsx14acyb7a2g4ngem',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'vii76ly7053gq3gsnsed',
                scenario: 'jv2ltn6bpfvr4ynjmlvumyh0re4c8u2ve6z6w88og63ji4l74fyqo6yemluh',
                party: '8jbnml4im4v03nlmqoc7r1f2u9lmgaxkegff8g8vlizigzv6brwclq8g5fqzz6kmdiefxrd1vhmgufnmfenjhghwlw83b0sv68fzvkztfiueup8ev5yr9xyyq7x5stipii2or6g9kjjmhy8pjiazjmfvf0vi5q72',
                component: 'tfpelipltpgaud0bhe8byw5x3qfoodqbhdbd3jbro2fie1dqgyol0wg9cox8y9ou9c1oa07qsne6rlqd5yw93jghzut7rvd8pqit8d22r8crhw07mjif4fpl59rh7ohihofcad7l0op895q5ocy20wo8vy9tp82x',
                interfaceName: 'ppug0pxi4kb8yy4vhogvse4370oxwtdqqcyor0oi8zlau2dv9s1hbfw82l7fnjyfce9lt6bqxwyko40kcz7mgqyophrv2yj0x93djvsdmjyeur5om80c3pdjvbvxqlh2rdudg7nyaak8p0as9jrau1ero0rglqqx',
                interfaceNamespace: 'fkiqh36t5fcb4won5bnvce87w7xmab3su8e39iwz4wprkuztpqf0lbbts2ygsgublm5docryvmj7rq2ow5f1leyoybw2px06ftl1r3n67ps6vicc0zuqiv6bbdztc0xq9y1cw22h5ax4c77w0dqiojy1kkrm1ytn',
                iflowName: 'w1c2ej5gwca40prw4ipqq2y0uih340ypra47s9vxqlrd9cl5obx62b2sim936bdztyfl6t4srzo46li2u03pwq15qnkh7ok2tzeb501yo6lajycf8kevqpsa7bp9mat7pysbilbkv4ldejv50h9wvdjhycb5snsz',
                responsibleUserAccount: 'vervvx3sxjlc8x2r06sx',
                lastChangeUserAccount: 'ca0154ngzvcj5c86frf1',
                lastChangedAt: '2020-07-06 14:53:25',
                folderPath: 'o9tu9w1y63ubb57hd2rxv8yhvhmqmaw1f17fsmwxwjl77et5d0kqmqpiorkbg3zts3lstczzlsa35dqsqrr926v2u2ytg85zwlsz1frn2gb10gu3q4aypdm0k8vby4w513b1rf3ohahz1ry5v6ucwkot8ew8i41cw6o8s5p7s6potqws9me9n49hvb89s2yafrpj0giomv8ehjttu62uvvank1o1ubquwkjghziq7ojjl5hggshcgwa8scjml37',
                description: 'rktfaa0mad9uzu72jnatuptwaxvsl6yic7dp3k3a2wd45hur8enkzzmxa8l46569e1lycex9680l2xrx1om56zag5pgi3ssax9i9yx3tjnx33wgbycsq7ehdz7dfkhcly8371x0ykqee2w5o84zjtg0hqng6e5d1k9y8sv3y85bfeul5wp098esufekl92cg73ezgwnp475mjbpp8us320rg7jsiwat0nsro7ckodnn47h2qqufmev6ltubjgdm',
                application: 'emj6ij75xegluzc8f45e35ehw2xdydl4sbs9y6yvsn82n5k76t2wwct7ahlk',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: null,
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'p7j3abihj0a5742e3vl2',
                scenario: 'd7m4hxb5xtxsg1kbmte15wb85os7pz0phwz7x3uyvksyxnb94m73f6rmc56o',
                party: 'iypw67im30ltumvuezn38l69tnqa5gc116zvylphhzlxtvhac9n7rfdkw0luqo73byzvif1g1bk654u0l15r2jeh70v5ccxs1i0lrkxyhqv9b9wr321kfbhb2mcdmjlag17gdmdb4091uy5qhwvqxxgj7cmsg95h',
                component: 'vr7pj09q34mt5lqbet040k3q9u0zu58lnqu98d95t4nx6kxgj8816yncpfhpvdqr14stg0arudrwv0quqmkhf90ceuf0c8yuxvmadhdo6g6n2bof0e3dbk3q1f1azmt2bxnprta8at5zfamyperiml7o5p0cb5ls',
                interfaceName: 'f0n67jzhga7ofrmwrvwg0hgfedm2vo7z2zysrhnwhimv0k17zf9tb2j5ysbkr6hpqzfbyw980avj3gj4k06jlkrbp7jihurdgfpq4dwo71f38orqsro1n4fee3snd79ue5knyrg3vua22209bhc3kv4puxv480hm',
                interfaceNamespace: '0p7jip3ojo0lx7kpwwg1wp9ru1rcxencivfgpvnxd62xgjb9q5hofk4pn00cwtut19esdmlhj8aa2qtnf6lzzqn52atri7g4ct7x4q86a0hrjdibb8rvk2i1mtj8y97xb8jb41mz9e3g8zzivdgl2zk5guceuktc',
                iflowName: 'ln6antk4p128lpdh55gk2dq0bc8gm92bpqung8dyak840b9syb39esupszd2hxdrlar9130xxzjtp3nqqlbfo9kuhto9wl7o85x2cjjjfhbp2dqa8gju6nn1sbfq5z5cx1qgfxvvq81y7ccp0oudh4itfwfoc8ru',
                responsibleUserAccount: 'nr985md5wx23kcubke97',
                lastChangeUserAccount: 'iu6mk5968k563s3h4utu',
                lastChangedAt: '2020-07-06 23:17:58',
                folderPath: 'zigwscexxa3fjtlpsha6bp7nhu67ui6b0hx8ddeblu4o7zefcchvgsdz57a5pki3m06qtcyrrn4773xnv4doatfewx9xg5rvaw25rz187epy9oaggncd83zqpb6nk08ehgv00opsv8lof1b7irxp92c6h2nx19drnunx3624yj5xis360bdl4dwst9ah2q46xe883tmspmldsied806pnymzwrkt2vv4ywnlntbc9rx3o7bew9q5vy61rpy7aqy',
                description: 'wg2wwh8dx5gtfuqnxwlbyc06e5xapoj10eeamm3iuos6711gub11ahenv5adrh35hvwdw8nfbzkqk9se2qepc8xaalbcpodkuzt63cjuasxlf7olfk4slkux2y6ck5hzvj9z4qq0vfuzc75wawk6ayb02a8lri2vawqhcr290d75bwgm0bjrvewagwlqelgqpd5kvc869q6lat97wg1uo8wwe7wy3xxiri56vt7sijy96ucer6gjhu2azwtguty',
                application: '59xm62aw1d0vz6x6kb8ngjhofut40iw068au7evoheb12ba2g07upwu3dwk6',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'sipgeibg036bmw6nc3aq',
                scenario: 'fdiwfflka30zg6huo9awlkalyxg0hdd6i04m0rrdo5ilg10gbzpp29m2cx3z',
                party: '5kpkupb0tubxir0dqoib5tmende7lx16dmkelol00g5rt2yef08nhxjsqt6ztx9h1sld8si7wa5hekyubbnuhho5j5crdl0kbatgrww4gn430uq4j3xo9osez8n1yimpzy6jkwwos9qccztsq78khmj45neue3d2',
                component: 'z17qx3lfwt97vqk06da6ckv5aeiatgk09003vl4ozdk6s967pwc8jttjjnngauyo75usuh20a6nb2cduq97tk5gh2g91s68vf3rnqqp0q6enkyvpwa9b111smd0sbeyi4ar0mc302kmwz3jrl483b6i7yprm782b',
                interfaceName: 'l8yl0h4rj5e7zi39lamfyykoc8g59axph0swwtm80gle2jg6rfbk46ztpwtg71qdyfloju4zwcwov72bb3h9g9dfkmgkvz5pu9wk4puqv4exvneox3vjoxrj0si24o5itfch5quw8zqzobe91fl9n5vaz3hklnaw',
                interfaceNamespace: 'c0qjgagquq7x8of3ynmeu6x772zte5k3xvtw8fyyferivu0cn81j4cpbzwwe2bzb7go6o7vibc68iohkm4ujcfdfhgw5aq1pveptpl3qknqrozvy3zmjej45nvo2uyoxqz745ca8qi76b4wt1yxp63l59scn1z1o',
                iflowName: 'd7vnnb4zn7v6niwiycsct311rolkslnz50cq5347clsrfrzc45qfaitfw7e2qzuoceq29v4fn3yytftq767str2et85277bt7cv2xhcnr99mjp659403wg01t2mis5apflnf9uog7kvwlfywg2e7jsit8ml0v5ln',
                responsibleUserAccount: '36h4cgl26et3yvu0iqwl',
                lastChangeUserAccount: '9x00eg9pfomhpx18b10f',
                lastChangedAt: '2020-07-07 04:48:45',
                folderPath: '2k926bprmlr3mj0mhya66a519h5egwzze6z52h5bxru1fywzom51f4w06v8xsrp5llizea3iclpp699w6svhbctaiuirs74i81ygip8s3igjv9e9pgg0t83la8fvjf95wt96xyp73fepydtf5mgt4x0esvsd3wy6eebza57d4jun9rqj575vktxwth0d9yu0fxmzzehprcffhiiwekd2n66zmdq8fhscpmvfvxbje37kpjcoag1tffm53l0izzy',
                description: 'c60398oz835gf8lfo77b7dl57b11siiq9ppvd0fxopa853fqkd4fvv0dyjku7aunetmmpmbqjfzy0uoafaq0efmf9v9kjva83pxqnbusytlz4gu1rfrig5sdzi0tl0rrnr2t9pna4edndp6hjr8r6c2neqbsfhiyg743s99is806y47p1wmrywp16qrb6jk79cxz72f2dlfhjb5glggo5cachmzkavodf41oyfhtzqlh28qu558mui1d7ycdjb9',
                application: 'pm2txplgugrxa09hgn5joepnwqlp8azcnqvu4mila9x7hek5fn3andgfc3bx',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: null,
                systemName: 'fu00prgvt1cs00by2dhl',
                scenario: 'ma41zauo4y6kzjrm5zahjx2rulqxanz1oqyu0u27fdb5e8dq9kjq7chditn4',
                party: '8ld32d8bmuqitmoekfp48qyfz0cl5p0gvlzfbe1ecjfwzxx5kvc0jilhhsp1q0svh6ctztm9p67xxjvkw451s8pbsyade5xihr6wm8c2w4z3iuoj2wah8pbidyawy97hnpssxobd7yc3ja231smr74st0hxosq2k',
                component: '9x9u6pqag28jfu70hob3qy7tnbv1psj5ms724lwl5uqvbueaj9vxg1x5sj54sn9mf7rg17oh9lkz6wbl3cunnutkwheqwvwjfci38ut1er8uzxdblgaahw16d8hb5xa7htuc2w6avcady7vmxgb9jsh66njt84h0',
                interfaceName: '8z86udmcnzhj3rmqa281mzy87hulsfwuei6dwlkykuuqsrywyxjuigd3cno7lg4ja91orpe3m429v8kxd9ewlejq62ku5rcnd95vl7ycytbddgntccth8so5q86xebdnuaovt3zc1colq6wgx6vvoqadm3n98rfm',
                interfaceNamespace: 'ls9i7v2jljevmwf10h8olg1c281qfnmra9owsuunm2q573hazirv8j8gy7lm8tmnn8w755rlem4mxcdj9x3yqb3evcz2sot6mxgkjewvdvtijpqh8loqbi2oko5y1a4wj0fvlrdpl4cf0kongsgdivpnca5cm2dm',
                iflowName: 'rm8ms11z3trsdgvcz95l08p3trqhe0xjbgw5b3r8rm20lvii0o4w081ehbumbpbkfn6vz31yeajawcme5eoc7tduofbgdnq03h8y01zqivifgkge0yx2ucu8ixpijux7q7u98xb4gkn2bxio6tkqdugq689cjp3x',
                responsibleUserAccount: '4vud9djkqo0i7303jk2e',
                lastChangeUserAccount: 'fll403snf3welhrin0nw',
                lastChangedAt: '2020-07-07 06:14:35',
                folderPath: 'qj74285ckkr5f8ao0fgnkuu6gg8izk3l8kbi2xwu2vspz34fa8etq6xoj0r4ys9hrovbze4s3tpym23n1vzqnhcvoajnwk65dqejzzbk2fmxmjszhmddzhh7f9axu68secxytmloviyipb6mud01ysxr7o30qu58ajtm883ch46bt9izsszey5ef3nkfkpqqgrkmzhc1cdnwuqto2rg9ke6jd7e2whbxu7yyru4vgvxxzw6rtmsowb2edbkvuyv',
                description: 'uig9ztqbfho6x6uotkajxr8tm63vy4hw0w9p0gxb1h32z0gmy3qsl98b27kbgafyb5r9qv1hdwd5zp2qg34o6v8j5herjwhl2i685colzh1eqpjb4rtmcovjbvyl19e2znzq869vuxxxeqro82nb4xs2ave8z545rft3qfn9nthjv6ubipuqp9vcysht5xatf76ghk25jxrq9fiukaqyk11vvck5yr86ov9ysihac3s32kue9h5h1rx73icxid5',
                application: 'jdwtyh5ntop6pyfrb62g4wqwyxiv4qlgr0nsyt8o8udfymuyyi6un2r7j4jz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                
                systemName: '4u00b2mnxm1ytq5eewc4',
                scenario: '5ozlq6da1579t5rpxfijft3zxdxiblzhy4zz70dibi875505ui2vtwu40mmq',
                party: 'zduwp96mnpaxql0agwkbzw87lbq8th8ywvmm3e75qoux0c8v8vtop1w9p8cjjqy2b6bwnveb93jajefxp69wnz1oim739z0wtbpe7v0v0relzcu9yokby5va1aa32ep4t6ko9pxnygsqm8cxju24cb3qwfb5f42s',
                component: '0p1fmcthct7nuw9hen27er7rs5segksdf1ig7b8lg38fse2tf5x88my6nh2rrz7dhr41bau3jiwbzx0r3v7t7axti9xdee44bvo1xyqf9ocb4ahlkk4jqd27ux8q8a3xzvpuadkoqcajbfchy3zd4lnbr26x2bg8',
                interfaceName: '6fldhzxiov1llr0p937p8y441bycq3jcjbr07w6oa3mb3yzwhg8y3663i7onhs0o62zwtahs4x574vg8d6sbk536jh4vxcvjnzrihjrx2vll8bhwfcljpberkhab3ftq6pxkzapqz1dyg4ouruyh6vf18pvjd39f',
                interfaceNamespace: '2gm050czvltvz3w9eod62tx8c9nt59digq6opx9tmpkkewi3pv42qes9z61hvjv6m5fp4dszbjrvocrvk5g8tynqa9rf6r1eaua8wt6r1l8d0suh0bgya1sdpm713vsnjujbh5w35dkd8ohx7pmifj52d8z50x1r',
                iflowName: 'qj27862ipaqm1insr92tt6e29tvqo2awb32lb576wgn1qjh1g0nya5bcyrqc5mms8x3c5rvbcl5m5zj4v6kpgflc87npsvtsbsw43d4lc16e3vz3o5tihhdsk5qfuotafcw1q05ekx66tmlzg61ubyvvpj8cnrg8',
                responsibleUserAccount: 'f9g27ioo8bt4sld8mj7n',
                lastChangeUserAccount: 'nvasxc9oac28a52azpuo',
                lastChangedAt: '2020-07-06 15:43:05',
                folderPath: 'uquljlmrfyxdl5zz2by2fngh6bp9lyuansieq1dw85yn1w61c5mmnmblrfbm5s3bl2brgo4lknidzghtkdkkpv6xdxb4lg2twrutsibfncrsz4oiqlqet7ayu4rhiu6ea1xzwh4nm94awq4lahengt85w7vprujpiizsod2cnrm05nawd842ghx3bj5tsunqczljg4oh58axpx8bp1oht75fyyezri1jv6agq2iucfae9hffziwtxuec6xsndtl',
                description: 'pyg0mtwibekxpi864ojtsv815lh0xde183tq38bm1u7pse9q8abbza3cmz30hltrh0wgsqmh6sg5xz7t9a7u9ogfnta8zkyfdos6utr8aaif5r42gcy0gct6sltw5r9o57lb9lc5wk1t7qf4w4vygtxv3cnocze0gi7rxtvb3nbtpd0695hxwrfpwfyrl5h7900xzyl0ko2d5ackuthwk5hzjwwo7c0gcfoxc8p10t5qvabgzfkwini5l0yyblj',
                application: 'b0ceu1i42fyhplruwwcavmwj35d1q5f7lkwc4o778wrn1d9i8dwyqglmhhnh',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: null,
                scenario: '1xsg64mxlwt67m50nurwhcu9ncv21v6ofwvwgepzrs47cmob2a476k78xtd9',
                party: 'psvdkh79w0ifavzcijiumwucj4smbiunzjqey8u87xrpbhcm005jmt2wtw0gr81rtjgxhhs9g4f04nszewytivumclb2c6z34n78wifcnoo3thgvnpizenffi78r80wlysq8qn5wc9sv7okm6my4tk2wqfaedf4s',
                component: 'bmuzl0t42a84zc2a0ey886szdlc6l6oy5w5vn2gllv46zt3ezeg2guwwsafbiojwrui3qjv803cyaohaa3usej9t6pll9lgmb8mmo7pevjgzjl45zt82ue76bkgwenswzzt8naa4rrf7jiizytrm2v522vlmye5m',
                interfaceName: 'mtp63ihjtuoj8whgy7p6avdbf9cgsu60f8fwq50omck1zk4ej334eq1z2fwdq10xgrdxx0pjw8ghvovdz0d5o7mt5yrmfkmuax9kbdqd23mfj3j2vh38koji7s7h80zlkrgdloc281nrij42pqv6q6qq3fz53fzr',
                interfaceNamespace: 'fw3q8jtn1p59jiyodh3pbqpc65inplts7lg1ewxrrs26ukpdalvpi689c208clswsdc3f93e8s3gflv3e8jiu7j2wn6c07s9wowl1vz79fw7h555csxcexwfgm6iruonovfvy20dm83jnq5hqbs3x44v6uwgm798',
                iflowName: 'ye2b5du2ymb7untbsseafb2hvgnwoqw4lx2apf0tauf7eoixy89defdg25bl60epwe5fvyqdig5rjplxdvvhki1e5xb6hijaur4ovaz7o9728dkwrq3mixzzawqq67whqxb33m5jc8bgl6efy2cwn1sxbiuphby1',
                responsibleUserAccount: 'w9fhfefgemxdyrtf9gjx',
                lastChangeUserAccount: 'bdi5z98yczivaxbbyix7',
                lastChangedAt: '2020-07-06 17:57:31',
                folderPath: 'chv9nts66y64x7owj3f5qdrtm6fto95m63r2k4eajuoq6o570jlqwlkmunedl583p1vcf0t9m1ixrf02da6rb58r1awg5w2i6d0ttn9b7rithvdqeb0fz663joiagy1vsl5rxkh6hsymf2ac8sdanubzsqjknmw6ws9x8ha2j5ijq5ckd0fw5qefo4qea8uwrtytg20zigd6japzyfeuzutpicmigj3rcmrlxyvwxxt9ownszqwfiou9rnrprmn',
                description: 'liw2f59irrhxruq0zyl6yvh5u7nzd0fyceg627efglak77k5uyxe17sjs3ryum5kb0u9j7bbn7udmp9fdsu3tiui8j3eg538ma6yc3k4vzb480fx0bx7116n4ughjb5pyvnnsphipipexi4aw6dy3b3chgjzrhf7xa4tb1bywodsouk6c2xyz1e9wwyfzpooetsal02k1n30f217nya90xbbtsew6eaicgtdxaponanuzv9uebxnkb33xxb7hbw',
                application: '2dod1cgch98eafqgxwclmror1e51y78abb24wh7w7xdgfkh76sbd3i8zxj2m',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                
                scenario: 'medr6qkj2lra7sytdxflqcgcjx8nv4zhhpiioe6gjn07wydd6vvmy3pm07ua',
                party: '76ctncj3kxlbp5eqplqemff542dk917lsknifwi3wckv7fthz7iwod6uaxfizke430ikpexqwvjv2s4yvsqjnp5fqvkk5s4ooljc8mdp3a9zposiboz3830s6ur9mplwwu4vq5il34r9rviog0nnc3zs2dxqrw1v',
                component: 'ze4vqgfiuogyxdifqfcyf0fi0hvrcvfh9vhwkyakln646ljemrtp9qqveu9dutzghui6jwwl2x8vtf6qr98eu9wh43n11hapqcq64wpnce0avlfrq9dgcre1c5wusz843b9bjlpfhfnuu9bilq0fqka6rrgolvs0',
                interfaceName: '52f55nhaakm9tqs3plen9hxwz71ho4rqtq6u1bz9kkp4toejyj66cnqazrsksqd05nt9cltoll329r1sm4oznwmrynljq19tkton28ot0c4388ml10rjtedybaqdvsedzgjc2fgpu4twr0bivvim6efod5fivebz',
                interfaceNamespace: 'z6ud59wrse9qxkekm5gujxtvxwkhu5fwt7g43x4vx2szlzeb4q9swg59kpltxmryr4dgvjhb5llev240muo6vfck0mupslr2vhxtdktov6wj6a703mw4qyoxz7apwlxtkfco1y2kq85anzlxp7q7topxwrdretfu',
                iflowName: '5u3a5adw2f4ob6kcva2ldt569b8udcorpfbzz918dsanpqkyhagr0o80nhen3ju9vfvr4fkmd3jmkknzh8mo013apatihaugrk31v021g76ki5xwm3zxs3omgw5ctff0px0b34c2oyvquko1f67xq35vhhkr7yg9',
                responsibleUserAccount: '9e0d3mkmrfuf3x1062yl',
                lastChangeUserAccount: 'naxpjniclis1ogtvx3qo',
                lastChangedAt: '2020-07-07 05:12:45',
                folderPath: '79pqfpm3rchplwt4bxkzvdcnv1xlwpxgiqeqtlcugr71yxoian8d158n61o2mttslnh55te1kjs01a8wquitxivz5b2gvvkb9ddkaz8mpivbui62zu3korkvc9ji83y37cp9lz4a1qmueknx3jz6f55w98ls64dgtst6hobm0fci5b45hobz324jkmf2jyyyfaitxyn4wrkaofnjv1v9la6us75s71lm32xu6yw227s8ee41r9qngatk4rav7w9',
                description: 'vtsldkjnpnz7g76t9r0qay5c6tx7r8u2a253eojvogmiokn989ntjvxeyajm8im0dvto5g82kvx4cmtju1jmfpwo7wdl0b6heywkz66qormwdqkitviu1we5uu95w239e71wavb88f2tdq8p1mmul1vf0kz5tdv7s5elor0wrgjvuya3feypw5clsrj2218blyqkcgu7vv7qzr620dsgh4z117d84el14h6xljqt0l4c3cmjyejbgghgovhakvf',
                application: 'ao8ow4q3ck6o3t5wkbox2m6jrquziiaow1s0p8i8n8t0fmgnl3yeu2wcaldc',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'dgpdszq6jdwoss4mnvuc',
                scenario: null,
                party: 'zycdb7acnuuacn1u21mxmjhsbg2vhjqvgscls7x0z068imti9eh1ps2zlthcgrc65duv9j6nxy2pl55ohq4lqj4egsihxub2hhjurur4upcjrav5jyhgbm099mgoc1hrbef62g6mbavq0k2hra4spracd5770qa1',
                component: 'gno8k7l5uagcjdlcgpwwvebrprpvxb4dfuxpbafxz26166rc6gv5z821jaypyktd4pqp6qrqay012kethoat21hfg6p7u8df5telvgrcaf4kpmsg50dmi6m3by7lod7plhuqa2nl5v100iz1qfqrqqus8uh1j5b1',
                interfaceName: 'txko0jkbcppklcw9cvrbf0gy0q589el73qd9wszqc22j16oth71s7rmvuzqd4shyg35zlbj7hy8hvlgg7rx55m8365dxbbbfftihywa1eom151jlo0avaqg06grtc3r9bfkzb7wf7giqm9f8oxlaop3sdz0g554e',
                interfaceNamespace: 'px7qm59ehqq2hqmnyz2swao6xjxxqmb70i3vyna3cvp5e7u2h6mn8vrvtf03g2m8y43fu2ttjxq7pagjuf8litpmsse0tkhnw6hflozilygdsx7mku7elq954whdgwwfyu36kjx1n6dzatp9phcy03sz3d8pgwyy',
                iflowName: 'a00g51a59pqni29qsu6alrey8s3uxnkm4buapmwkpwp7hrthkmz30mwdlvx7yic93ib59ms5myef0ayn7ku32mh7j44e4drl07tg7jc0qu5uw4252cwiw1b1pd7csxkpec15jbmckb6e3nzusnhrl1bdeb94rvzt',
                responsibleUserAccount: '99jcqp4gdm2nmxh7oah8',
                lastChangeUserAccount: 'x2vd0pxzfuk792o8gjzb',
                lastChangedAt: '2020-07-06 13:59:34',
                folderPath: 't8hlld14m0prsiobjon7t2k3qsb9yotk27le03ncl067v6nzeg3dfiif6jixpnbwn6pr3yzyoncmew2e15tzt0y75q437ltvwzhdwijhe08x5ovr96lcd717iadhc6rf51a2fbdef2tzxyr5b49kpq5doocy2e46sxrt2pjx78da7iwvr9o3a52swj8nzjryezqw3nd9is73a1b79478qzy2lwmo8tzrsxaig1ecp2mm5jp2wg3a8kzv18ugll5',
                description: '8e24x1m39wnwnxa8m74s5e1jyl9l9idoenpvomi7cdvqw5hthe3k3cojtuosgv4rnxmy3h9dkf1mehllxaj5n5uhhc6lem510ikenw08ozelyhjrdeq45qzr0o4v04m6tgsklvrnt9clwj5cmi0ato6d8tatkah7i7o1utcydq3x83goehpjr9u7rdwxqj9gphfw26ayffwovgkfxnpexbigl0ytkke0pi90pu2kwihz334iomr8oif4fenry2u',
                application: '3bkr8qyztumvhoixboh2q156ld9ckdm8hl7qw9gkmlf6gm341b0vzhzkku5u',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: '164w0vjl06fbl2av3fve',
                
                party: 'tpb3cwkg38vj09hrt3z0asz7m4xqrftett3zie9o5gorvdp72i2hyph84qnvn7twrohk4atzsuby7wkypdo88y82r6pk9q0w6ar98p93wqg9xel4cfdv7f0u1o89vev5xr8ckdffhlmwzhvgrxvqb0ycpgmfgc5z',
                component: '6ap960246ukyw9wbd38ml3ofn9p0su9my3vajvcirmylpeu9yxa18qznthvff6kmz2qyf9u7e5p13kqxfk1vt4zwkk4qyhvowopoq2d6tt680gwlyah66jmnpdlz2qghopng98pf0ypbefy553vj8067vyqr2pfi',
                interfaceName: 'm599aoyhn58oedfhdrhvd7jsgcpm9m23qjpyp918vwg3diz7wpzm3j744os6cw29m0qy6yb1q9jhbkeyy6pjpdpw89gnl4dnmyaofxdf09myqcd46rbqkyfy41cknzzs5a73ouqtwjj39265d5ozclwl8v0op8yj',
                interfaceNamespace: 'czyj7vai7dcodghwx8q8w0vpg2ysgrdfu2wonsv7z5op3zp82dfbcpizskne2frjkdg3jalosmycflpd6e64p82xlaji5tnse388ghcmva0dq6bk502imc1gu0xhn0xqm2mnssp6ls2m9ns3aoq8j1tw5h0gmz5e',
                iflowName: 'bergy7r4k697vbtlpd355h2cb0pgbrme132k502qezzlatacupiy4fhnrpzqi6hcbbj59sa1gtkwn6btx62sfpcw2ur6jpuy596x2vfbmiqxtqf3u8xdff3zkfs4tx9cuilf01er06nwe3dz6w7oxfwid6tchr7s',
                responsibleUserAccount: 'u1pjlpzvo1o02bn3rw8c',
                lastChangeUserAccount: 'b1fk3ek0ieei8mjszxfe',
                lastChangedAt: '2020-07-06 23:04:09',
                folderPath: '9zf3n3yp0o6bym68rcjkatob6r34itn8i0a41ir8g19lscpw2sn7wahas0qnnfo6st33h4u6vno472yaovl6ywmzthp3pamccgikq5jkdbv89w0j5veyowpzsxsweicq2ucetmlt6ju2jb8ydp20naovlqj9hqq50rs0ne32owmq5k6qclyquw5ihcfaum6dj5nc37stxnvo7jnbff03gpk1j8hydwnqsnk30w0pjtu3bfg93o2c8zqm8r1jq4g',
                description: 'tuacpngwmysr02e49dsexoos1jpg9onimz5b4w1h1fuj2ge6gmz5ycisq4lmjym2tp9flmr2nuz269d85pamy6c41j2qr1s066lbrgjqtb69hzak3rn021568n2uqw7h7azqccs5u0oykztvmneayssa5swku5co3c430cijr6b5ua83b0tklnndg8v1y2nc38j6iaxmnnp0tnmmunhd4qwuoacy3b1mcnivv8lqr2zxr6dcmosgj7da7so9rxc',
                application: 'myh77cix9tfuvau3pu0jkqvc9rcyg5gy7m1ede8pyv6hs5jkdfukgzdh25l0',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'bqarv169g14cooennnez',
                scenario: 'rpqwdwc147ocv99s3due80c5x6saltxjml6flyxf9bwg4en8t32te3gdz1of',
                party: 'vlt14foffroa905u2qu0wyof5h09fo2sqdpr7l74n7wuk3q8hpas1vh0ihpnkrjx2dlteaoz83gm5aj2nb7cdo65wwd4y6tkdseg4me7f5dtvtyjnpqgod8z38oex8sgjp7lxal48dfbpr09vjg2929lqvtcyqub',
                component: null,
                interfaceName: 'g9ozvfyh4bcvic4i5ueidy4tkkswlye2jut3mzzzzv14qgpimfxdrb4acq7fd91hs02zn5fqqwgbdocs1nt21cxicspxgcagnbtmzaorfne373i3d0ux038z783ah0cob1ttph0u6nkrip3lht29s6fs18qm10qp',
                interfaceNamespace: 'nvgfv7rlvqzukbrfnwuvzag5e8vjrytw1yuhgs7x0kxgp2r1cddmk4dbty17kvsrq7jcljfr0kly881vclnsl37o5gkwhmb5yw9t7pod6ejtuuy2vx3xvar6wrmlk491tvr3uwc361v0b1eune8u3pef6gepuort',
                iflowName: '47w1q1y2emq5p8pic32f4pwhtnqw5u023wt8xsoaxpbh7an9q02c0a76hdaigt2xo60jgo6bryqv81nfplqrp56slearspzw682wrtxnmkngaujbtg08opo3ef456wvxlx8qut54r7uyyo3p3wjl3kuafny9cwlp',
                responsibleUserAccount: 'iw3bop8oa8kk8wnlbcoi',
                lastChangeUserAccount: 'dmefhxpszd655xzy6cg1',
                lastChangedAt: '2020-07-06 11:31:58',
                folderPath: '317wxt7o6pcestvs5vg4wxv6hfe2brm914sokhjub5phy32teq0mzqz55to76oo5jsvdggrx9jhryt49g2hr9gje8x2ee76n4z1pyjuqxbn9thtc5fn16x59uporx4onxmt823iptng96srihwb92e4dbo3qvliho50x89nol18ssn4lwddy7iktq33yf6kjwn0tu56805ez7h09gpeetb1d29x9grn1fnunpuy2ax409i4zlvxjglcb5cqg6lr',
                description: 't3fvnmxqrl20rrzlj7fzwhruqvms4923emycc32o775miaan3l3c5m5eq6r10y6ic1605hbhcamzk6yj9rn2kcrxw9rg7ugy33mcvcr06nz7xwrohiqso9l1edn4th7c0drpwhn1vo0r4v1gvm678v7j9e3i6rqctpiqe1fhs4dwp5o3ltr4l2bfij1d0o8pcugs5o73dym5vn2wnoba3f5mz0dqjmdfcmi3d6c83wmgphgikvymk5t4ht6p0ah',
                application: '6uuk7hb2081n081th6mkulhb0ki3km9t4glw38304895oa7y97380nkrjdma',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: '8faza0vkceq5cawi7vb9',
                scenario: 'qb5sm7ie6f8hrd5xvck62uh3w9wbwkg3jnb26738eymqp6k8oguir6qkkzay',
                party: '21y2j3cjt9qwzcsx6a3r65no285qq3jl7027krykotaqjs3mgyq72f1s5qh0odlb25nxxl451i89l3o78q5vd1sm6oidtw3fygop0hbwqwlo2dga7yucbo3wlijxd7naiss47o5c7iej5u8mxrpmp3vgz29fryeg',
                
                interfaceName: 'kplp7qgnixkw3e7reih39wp7df01skuvyatn0r56rotxjqgsbfipx3drbhqreb911exgbfyp23ly1n1e3q6zudlxa8cyxjjn2088wfqhstc36modjc278lfb2ii4jyi1p1kd9zwcf8zbk3d4d8f0u4kpevtpgy3h',
                interfaceNamespace: 'vcon5dc01t2dgm1sudzgyu6hfdpj2qdixm92kywfx76fiool1ipvwwzyknetcnjstfdchi6hqqolgloomqohmo67tvz9oxtzic8p03eatgahujhcjsu77gpgydn2iy3sbgmftltma9hopmil43ovp8y6wconm3vf',
                iflowName: 'p6xoja0qbb49namzq0kfzhd4j8i9ga6jsxawjtobokucexij9e1e977uxvyrnjpbuzetqcvfut431ao3tfbtku08ewrh3l5el1mr0dnxsii74zvas8kz1ssqve4ga68ki9q7ujrx1dkr0zgowirmyy6qorsq7qgb',
                responsibleUserAccount: 'vtz0110dmcwljx7njrfj',
                lastChangeUserAccount: '0w5u9q8soqol1j1xrhp9',
                lastChangedAt: '2020-07-07 08:30:26',
                folderPath: 'a7jnykvvw28rj7i1hst7a75vvzdpqigq9e00dz1irpdbh15yd00flzs5tjefqcwhmbjcun5dxjvse2qgt8xg8zbskdyh9j1n6297oq8f9tiydpdwd7jc9b5tyeih6flt7jl5831o6gfdsyjmuvocf04ofskon8j15gsbp0dpwvxgwnvjf1aid3d5kvv4p72rykd3zu7pp28mz86t2bviyh9pcae9ezkqj0mhvs846zaapn46phepv51w9zcbr18',
                description: 'b84dpgyuw9gg58takf1aqeut14fozku94izspk6meuvbsoe9e6mhxjrb4b3epeb8do93rway6ggl5xo2ilz864kb6p3d95sfyg87a97yvq0wtnrc387uhklhxjpnbgmpwd8xm2law29vnq0q76525k456gtii5ddrinji4ldatqm2g0p0rz9oad2pvkdsddfhce3lrkzk9og11fy2wl2ppbqolwezfufcyjrroa0rva6bqpsmrtqsqwu9lsc7j9',
                application: 'b5gekjrb47nz3wiuemgixw6ueteosbcedrvr39r924u285demtq5nrwboq1o',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'my03l8uycayi93sfnz7r',
                scenario: 'ams5jsovw5q838k30hck24fsv5lt6c71p19rain2r4cjjpgxr03qpli1zfxm',
                party: '0n74tivb79322zgtpm34d32gw3mwbg61w4ma1pyugra1c4y7kq7hd0qxgt4nipg0cs1cgv4eb0gxyeqrj950firj3kxxcvnu4grf5kksc7phdyp7apes3nj59cap3a8dnqp559ayvsfuobtr8m7yru5j8muyilwg',
                component: 'lnkqmtj9258zz85xw873il1f9e7cn8tmcoi16g1m9r7p0v9x33oldrm93mgtkniv3dd9k9g6aqau9bbdpmrd0f7b9uf8pui9jmvpybe9w326t6jjulp2eia71qc78d9clnh852x6e66qj3mggflwscsxwjf3f2xe',
                interfaceName: null,
                interfaceNamespace: 'im4fv3e7lbr2xq0pxmzvtnjpm933kpq7azptokku1dcys9be8ndv1c2hfz1nb0hp1xn95efch5rlupiz8luh33w9w6637hvmpwbiopz5jdo1tqs7uzprj6o4uzge57psi2zvyqudba3unrzskpm50veni2g1a5t4',
                iflowName: '2w4ijxm3dx11e8j9h0ileayaojr62l04xwuun7exyhd10gpg0r826q0ainue905z41ige35q6mmcd7zvk0vhlvheyh6uzcgw5i6akyeuskncoqnw2yy03oy0vuy1y7l8vkr72stykyop5u68mxmnwhfb0v94do6u',
                responsibleUserAccount: '8jkgg2hrjjqu2z5z27mh',
                lastChangeUserAccount: 'rmrtp4uoxl6ksox6npah',
                lastChangedAt: '2020-07-06 13:12:47',
                folderPath: 'coasw7zz1zh0ni6na8sdhp1djvnvwye9dvy3rdku5ro8p79isylqh5f0uv66vzo20dqoskmpqa2kguqqs5uox1ejruuiq0i0sd57kayavls0by84vkqebn5r12yq112zo15phtn3b5e5paweh71sgzc3fpkudx66did3s7jda0iummnhqsljnfru5mu7l2mbr95xfr0ci7o74ro4mna7ul9eot9gy64ui8poop66ulop183oslct6t9eh9rjf80',
                description: 'fkze463cecg1js653setx9i4f89jyi0mq3us8vv3xxz00c0h8ivve1h0bii6ya4n8auxdrl4v33na4jgro38hpce0xbshg1kjyy86sr802z295w6ksnszlbhs99vtxnjgu90f670axvfurmv2q5bcknvc0madfr1euoivc14g04a907krl5w07ml17w66qmgvpkwtbpxuvslt9p7gu8v84xfrnh7x9gmbigdsytm3t9ljrql4vpxjbe9n3vp4ti',
                application: 'v1gfoxw0ozb6ph5nwecrhdcl0letyi4kjcl0u8uyrnsfm85gz3nau9lql87q',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'd2ttg8gyd03hgf0wv2v2',
                scenario: '8zdk5k3oizpg6nd9j6rxfm9d70nez8a9zj04vdq6e8berevj7f4jnspfpdoj',
                party: '492odufwfxqdmapcopthbhqgr30f0gg69hv5s77kzrlw5my3tsgsxyq8cubtbt176zpkw01g69pswhxv509k03mdovvlbcyt21dr4tfckcig0j3iqajaifqfv192c9h208fs335kmh7d6tw37ijva9f8zterqrja',
                component: 'jep36oya2fapnywipicadfkt32qacai6oltujjm5j9gih3kcas0z4lm4x0dx64ncbq4znovqhudewldyvff91cswrmos27tj3qrq51j9vo70aebwd0ohyq805ylgulfqstytv18eiyoo52qs4ayrxl8vacashwyk',
                
                interfaceNamespace: 'ywrf0mqigdjwbkkqslarxecev93yyt6pu8qn5sd72w30b5mju4ay3a5oepcck1g45mzj8hnjo4r0vyd5lroa7d3zqi647j4lmyht4xoc6h5gew9riegy7dp2klp2f6zty3oofdgccdilb7g2a89nbsdr58zozgkg',
                iflowName: 'xm1r2p87i2c1h7r8nc6yhv8qldk2erh05zl8abcwk6i2z7lukhe0exxec7mm6ix6g5ybxqd11z06wyrgkkx3p46t85hhkbp9neezjvhp0o3ntgit838irok5h3djvwuel8kkelyxab9xskooiiz4yvwjpy20k7ka',
                responsibleUserAccount: '3g9jd86fidjqrgxlybk9',
                lastChangeUserAccount: '4wa8ij3vh3pdhnr81tp5',
                lastChangedAt: '2020-07-07 02:11:49',
                folderPath: 'ka5ptz21ur1qgc237cvh87q457t9uztq9qrjnd71p3ye03svdr1pdfwcfen7s9vpewkn21vqf7nf4wii56jtrcxfx4lfu9u3tg00qb7j0r1z372p2v5mo0jxwkmjynozbfqzzb7t840he4nqq00aixn7iokr4yx3erczcp9zxx81k2ctoqdqni8y8m8a0iqiovdf0k090u2jpdg0pwlt83t4ofnndbzxd1l79792voks6ik9fsagt2m336oyb6b',
                description: 'pztgq6vtdglp5ltcjkfscgow4pbqa55520ngggz8ffgd4nnau8k6ejc6jib2hr2p3iig3q0sjbozcnpgfrubw4js91nh5bmnfab4ybugb6skf6rmhzolvm7ez287wffjhg5sktfcdf7wb2ed8gb17qb7cy6ad4ons815h885ziip63ij2q9ajowpyhqssetd8zwyjfu7z8omya6vi3qijhvfuniuv0jjo9egc2h02fx5rwgfexwqehe0i7ewf0r',
                application: 'ytjtcy8tzb9oymfz3jjdhd4cou4gli4gjc4p799wekax97s95mzbnsyemnpp',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 's7r7bi5bwprc48dddxqa',
                scenario: 'pgyw3lkektgkcdlhhb4s23grs5xnt6ajveqsjbs7uevk0ka0u316au158i2x',
                party: 'wziv1s7v751h0icqz7p6r798mbpch451r6yevou2oxrdprvp95hzmp8w485xbod5b2wpo4ao0gx9dot6bsk6u2pflgsgz0cgp9elebkhnxmh166loqv3gc6xeuc588hbt8vv21hbxqhyg9w4ham475t540fndrar',
                component: '7hlks0dqkq325p6ca68q3h0rl2ddzk5bvkimi3vorxabbszdg33e8nlv5pdff4kmhjrs6un43dzv4w51qzw33n6wtmigh1wr9lyh4zhad87aavwhwer4jem5lxp40sdg4nt016rprmaqaj4r8i1ffsz5hifc27gf',
                interfaceName: 'emgefkw8dagsox38rpi7wl8vww22j89e7tk3ibc5dosszo3q9gou83jy4ffo3oaseo1fhmbjtryp6c2xcttrzg73jky1r108ayri611mxa2fml10rmbx48bqika3rp35e7kfimabpq1853wqx4zzia7u8ql5ka07',
                interfaceNamespace: null,
                iflowName: 'sv4x99wtrdk8s9avkb1m97fbtm6dkb5lbspjnbjrejyl7xob7acnhvckrhfksvu9unu8q11q369x01rq75uihis7dp37v8ib5cuwrrkovd00cxuer9fne6iwxxx2qmlzm2arhr2xyb8fgqagyi0svp8urd6voxzz',
                responsibleUserAccount: 'rf4kx4amxosprk39stuo',
                lastChangeUserAccount: '42b6zwc4u4kx644je2zt',
                lastChangedAt: '2020-07-07 04:24:46',
                folderPath: 'rl4hdf7xpw4fayi6p9yjr6u975yluztgv1lbtr0nj87acep59gp0kfijzlg96xyc1kk7kooj3o4pqdkn4jfjgfg389rs4357bvzbdd1f0kg8bgie2rqpvleyqld8yy8i9p1gsi66s1rz56z1uyxhxktxf0rurz3wuixfc50ldy9a3d3kcviea53dcfm0h0srrpaydcoljhhtxz6x9q78c0r57rnimten6es69sqoxewyrnwmsrq6qg24yf2s3lb',
                description: 'md7bs8mz70tqanuvx9z4iy6cg0e3gz2l1zika31mppbtqzay1alwwr2mftg45mf6meez00d98jkco50kgrhi83t40nbapdpnigmygyzbzb2x6hohe0ztl6h4c35h1myzftg15hr83umav9jbgxrmuklrz4xxv1vyr5zd0ms2xp7axife1kdbqsff4bhq3jrl3bsyhzqjr0wq7myn2juepgokvzuagzlejdxb7x3ngd9vfe5kl20hnafpssq2gi2',
                application: 'nzdbbjbo9070rdp51tyoonbft3cyoqb5ems4vqp9smjx80yuhcetjtgalvcq',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'q7v7po3oqy3ql6uj2w02',
                scenario: '3eqoh4yfdukx1jqda6bccj79nkm7fzin8zzl6sapa4fer5wrbzob181w0mmw',
                party: '8gkv1btu3gl176jhvjuj23huq5f5fovdwqzcuy8sf9flvodpxjlgppmdfzk092vukem9qhjh9z7amoiggdwdrqgi3pfykmqm210huufypldko6u0i3han4qixkwwd9ouwizg8vvsnit6tx24vnx3s7v4x3acxqi6',
                component: 'ele35939gvptr2kgkh1qegi9dphfzkqpcwpef65a4ojhywo9x5ugldv43oocic9nnmmqy41yxco9g9tjdme9nzba0xn50v72ckdz147itjj452mubkpbr7p4pfb3hbpk1rchc80rfak4145lqkp3s0ityc2qe2ij',
                interfaceName: '35ijgdupqrd83dxbm7tofhup0rh7wtix14ft42p1aovrnssdltm6rsoiveg59sahm37rutl0modkritno5w5cillo98p9vc80mrurcayaodml6laiid0h15wev3cxmszi1i1opywfy2ybm3nx8vknspgwf9zz36i',
                
                iflowName: 'xuolm5oatwp1fo3w3mofbbn6w3q35v8vgeq0rcjwudtsmuwv38pmqgbz0hqfz021ennxhjvm675nda9hzzawyvp26igzw5u0munx1okaw9dldvmqy99u4ubrv4n9jzd4u9ag5s0f2jaxtxle9ilqbe3bzjk4gbru',
                responsibleUserAccount: 'g5tzlpcuedregfr8yesn',
                lastChangeUserAccount: 'ipepex456sy3u1nanih3',
                lastChangedAt: '2020-07-06 10:42:49',
                folderPath: 'dnml5q0su6bv1etwob64la4hli426q75qvmodrocp8q5tjzxfiy7i025ym1q5xvkuff6yrbac9uuur5fv0rpaptr8soi9uij7x1mgicdu6o3pddu64g0w3bmr2sch7af5934xkyo6ry6qupmqa41i3uhl116bwbthshin53cfhgehpu7hxyc9nf4nejfzaqpmpa7sozvto7tgnwr4xqh9rq0wmcxheifgclxzyzzivdit5ehpda57ye9395psgo',
                description: '2kd01nssu2eforkdo88skir7ydd6u4lxyh36teoztslf3tqmjngvhmfoanlmljw8c2fbagb91bocp4hzl2e2jm5ty5vlulmgch8gpk3bjbopspvg3kgcvt006ra32baxghzvsx2adxiic1vvk6celshomkssm6h9zeh4hgr2g4zkmvfntlcd536kjonr7ij7yuh38vgvsbalfzmpd2ni5t759i35urtm5vxbxi6qwu33urobg6dft3p8uogq6i2',
                application: 'jwq3qouq9fsjw7a0cztpvww0955jjigfyrwwpmysy9suo400r6kel6x0yqqc',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: '4x591uwuqftycv65zdyj',
                scenario: 'gq5n1za3zeufesgon0w29ph7kn828xipnpyjzkij6564b1gh5xgdlypktgtv',
                party: 'lbabayxk1wujvo8o3hq2o5nvbgpetuyd0hlyrqa2etl29yno503torfhgm2uu6ktxj3wnla4oc6vyo3zzkchfpbz54zzml6jsty15v9h137r8vtje8l59cma34t2nskkx24rosgkefp9cfkkjz8kz7fmjug7zavr',
                component: '7txew72h9kvfoz61v1hlolgjyw23rhe7wbdj9s1hw6n3mldfyu6yu5yaxe95eul7h47fiyl123soqx7g30t0xs405ai14t49pcszicatd5wg9igq7dg6e48ts8jxrdlk9u8k1cuur0y9h5lizqey6vjoge8ew96q',
                interfaceName: 'buepfat2957uljd0rzro9dz26d9uott84uwn5f1v8i3upa7rvydawgv9q1tlkkvqpqq9pjea6vak2i3kfm8y8y5p79a14a6gaftwlnxorcr32yui9z8eytwlbnmku6ofdv319apx3tlv36k8o3j18q9hqvk302j0',
                interfaceNamespace: 'zx2o7hk5822g3iifidpfn4e7nkr5i7xtn6fa1hw2hnsdt8xgo79apge7su4ltx2ayxgokyfi1pkfg1hmb94iljniqtppq9xf175n99mw0k04kefitb0n1xcvpmrku6qa6vfyo3crpwpm6h9xslz9rwy875oae6xg',
                iflowName: '0is80cjgihgsmgctvv885k7dtds5awqvnr2hoad8jqt1do205wo9dulgk50s9qo7kvw4o8bjkdafwbov84drsgtzivs5e404fixxv6p4wwiotjqgwlcnd2x66htpxw70hu9gqhsiuycz48cahzthvg4zumqedm01',
                responsibleUserAccount: '081u7t3lk2o3on9zkx3v',
                lastChangeUserAccount: 'fclbtb786u4yo3p6pmxr',
                lastChangedAt: '2020-07-07 04:33:53',
                folderPath: '6zi2wfreumo9x4zf2l0osxbb6wtd5tl160ktb89kdifvuuww5gwbm2foedinp4uvtcp0qnk6bqf0imhxb76zio2b3aaeimup9dm7160jiibxpiobvwu781zmcrcbp74yw496f2955p2w1odp9jpcgx0bsjqabiwljyoiztpcwcun5q2fp14z99sd1ho9xlhew9sxvv38ab5l6etepqd47s553181rjfb0xoqvjtvutgohfcgagnranv85aywm4u',
                description: 'gccvbsm4p06qp1228windauevgr5g6tsbnzbvxoar1zzuho3oizmjyd6yfogtjuukhf3nmxfhqlidxst0ypvxbwzabwa7ccqca1wa58quojnn802vja3o44t7e6altxicjb7rqas3gc3bwrcb01u9psiqqs4yokjl8j8go95ftxaivc84f0imrc9btrnv47t5jgk77k4rnnc0l5y75vnmcb4r5yengsamyudd111bve2fqr2ym1ub8ginuzzwd7',
                application: 'oc4ho0f582k6a02kh4int9ntrl0sxjj233uq1iv7ervmm9jvl17tnstzez2t',
                isCritical: null,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'yprdlu7s65jf5ud0vqzu',
                scenario: 'hspl4kycn4lq8li4linhsqquge14ki2njs4q2cqe4k6yh66dkg8gmctjxt1p',
                party: '2hu4ci84p74w3x7lyix6dovpr10dsxmd9gyd9ts2uq2dlwh4uwstsltnfygch7ukzr7wvkwc7ixjku4wdgbjgxwwk928te2retxq3wzl3fb3is50tl21yviiz6ir0aip6hh6v5xazlcop1lmo76zib6yuxwfa647',
                component: '6snh2oy8e2zf430z6b6wf1dh3c6bz2cgtiviqw44zqfcbhlibqu62yzc2ni224za5llzcewa8gedibg63j9yb4s5wi9ppmtbvzcczh3d5w0g8ym2ljte8b083zsor1y5qfbrpo1s9lec8w7k1d58yo82w7h5a5xd',
                interfaceName: '93ihyh8zegpjmv2pp5zeiiihpdof999m0be3tz684bzvn7yik0w1szr27b30eqlsbwloam5f3ohznpgj8iev0r4kzh3t5scwzkmhl2ndiwxitw02kxyefirz8ts7zmoarhpwyslshwsnrshik0sn4qz18rllc24p',
                interfaceNamespace: 'wvjok5v0ojnj3te2iukwjirwn30ibgfhtjz2b0rc3t4etfa8x4prfg2xaaw9f0bv5wi71bzu60si0j232yh3n9d1ihek7x14g73exkiakj1o2tt9mekk66n67fuqrwj8m1u1unwy6ezpipfcihwglyy2q6htwgvx',
                iflowName: 'p5uvwmg5lclusowd2vonw7fxi87rins7u9a6y70tvn0zllgrq4ho11r4cbki30ljmnc6plrlimmys8hop7fpijmdkatv77hiuuow7060qdxhedodpig4hyew21cs8o7ubu7ekizbe4uxf1srflo54bny1vs68jy9',
                responsibleUserAccount: 'hoh3xq65zex3cqpi8wca',
                lastChangeUserAccount: 'xd43k2r7w3gckgygw0tf',
                lastChangedAt: '2020-07-07 08:37:02',
                folderPath: 'shs9x42hmdjk58lsoptizobucmc6b2timgw3t3mzo9hgu3v63ymzac018owjqj9t1e0d6fvx1rtttkw5zeuxc2f49zxtlayx8rgk994ilk1xqbozvvjtfd9wro8srpextg9zexjb01ru2ziwffxs4dwxilai0j78b2e60aldped6dbollkyfrhg1eswc2ibmbreenmn3qvag6t4si8k8oxlwz32i7m4zmsp14v85wtzzq13b2gl7c3wavcr2jbk',
                description: 'dmfz794a9rw6k61a95ptxbzh29b4uq7gdmws0vo705rnjeix0pdenrg3g44oye7v1wnovoosb1ge9fyx1lbqd0kema2iper87udalobxqafyt18o5ba5cy6ha99ybdxl7c8tu7chggsp73mfc7u5c9gzp2w2qyz11hn8rxspntk1espqb20oil9zxtojgzwfhpym1s905a0rdn04z5uvyqafc1y4q06h3xzz2dcbdir0zp484lyt9xmsn6m8qsc',
                application: 'a51fb9svmcdvqpq2mol5c47vcdi63n6wqhz7kvr8qqlgsqvstugyxicg8ou5',
                
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'qsd2vqtawj0xvypcb9xs',
                scenario: 'u0juera9nrgixfqj65wfk5qgygwevqgkr8pwq81p3hjsuilci2prlqzhqvz6',
                party: '0qf6i1sfqyp2ww62hzjgsxk8rmbl8kel0isnc5dotzhmtjm7nq9q6oyfgi91yag6ftmmmfsjo97bqfahjloug2tgh8uz2yupgl1vll156ljxyjay642s07fcszsper4375ukhdc88pwp94r419t74ua8gkplresd',
                component: 't41dpj71jnojslnqtpnelu1recf1o38rh3kanmtbqw2olejcac4exfsg3sehyie8xdfm2554wz5z8q870ltz6hbse9chzsvlddtlrdcraol90qxo036xeyxj5c13e06gaiaolnbe7w89xelayd2690fe5o6hm7yf',
                interfaceName: 'r6p7sq53j6mknyqxou3g5uzq993xnjqezyokrymj1tmp71370y8uh2tsdzfs1bn2plya9ycqzj2xfj07twi2uo8gj1u5un3ye0q7i5duku4aof7f99irtsuuaza8g5rbc9rp11q9ma1rmex7c2rmckag6co9zlt5',
                interfaceNamespace: 's4vk3142a0ls67y629ylv1f26vqlih4bgtzn04l7dnf00eap8l944h0it4jft4zfscdvadg54lk0q4hvxkjpw3g4yo252612iqxgbjaygf3t7byzg7cowtrrlc0xh588f3al0wg9enhpm78v0tip3y0vbfopjofb',
                iflowName: 't1f1jmzwibvyigtj34kapebehftc07muylr430bbl913rklorm9aim8dk7qydghve45bcde7b798cqy0m98yfaepp5owf0wio2pup1tvka9znlbwfbw7bgyvukt3m2nsgo58v29eejkbio2f3p4wyk6fx8czxd6r',
                responsibleUserAccount: 'stkbjqyeicc9p7c3uws4',
                lastChangeUserAccount: 'zz516grbtaqko1fl20uy',
                lastChangedAt: '2020-07-06 14:43:07',
                folderPath: '0ar3n0cph2t6k1x6x9v4hez7bjfvke4prjlnylry6z626blwfy5nyxbcyyuobyhof351ie6wwdatdlzjx2rik28qbptbqnziru27p4wtbywmc5u8s7bgg4f5k3z9tycj6gtk5f5ei7ctca7mowjszbax3xdqzs4nhqi24uvgxt45kshkrakzkwhk0yul1gmq5cgoq011ifs59udz5uvztcfveycreg0iyz4udm3c37l58999ll3ppcgb1y97tmo',
                description: '51grdz7sh11kjnemx6fk660joo0zn56dp2ovgu2yh9e1io8pgyx1yugwmbzls7i0vkse032wbs3sshn9nhgwncoofxa05iu109dkg1h1zuc7ubq518pwi6z43l80itqivg6gf9htdgxsrq9xaygn7yvrvyhm8vlhj8xsb88mazwdfpsme7p7udkj1tfnldvh9kcoevh8psxdo4ge4rye62qduz0834d31lx8a0f93xlhv5y33j62zstuyztl37h',
                application: 'ks1thp4peg4o7lzyibzvcya5siel5edfg7kl013j3w2t8neiiftdbulc38ir',
                isCritical: true,
                isComplex: null,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'jnumac7zascwoc6sc6uw',
                scenario: '6wmb35dsw5rg06ddiabzfvxdz3t25taw7oqtg8hmazils7p4oxm4flh17vg8',
                party: 'xp0tedubvoi326muok3kf8g8fw6i8cmr7vl9pl1c6a3g1neuix0szdmad3m2ompvhuclyywzy05gn1cwsz07zseku2fy0831c8ldnocaxex9bfxrde7rv2oox7if316z0thdnn5c7u9rfv5x5on6cbvpn0xm28ry',
                component: 'qxzvex2jipu5g92ii9zmo6wt15rbk4q0jpj9q8fpyn4yl7fv679ulw55t4l6cpfdseik686maqbkxbbjy65iuwcen067fyj9dbknwktkv5ajwm651fq7273sjl2537hhjt856wrpo2992n36lkl113oue1rz7dda',
                interfaceName: 'tbcm34cfiems1tnbzij79f2uu7iifwow2j1owf2v6sx8oaqxwsvf15b5dnq3view0tsc2h123vb5nd7rntup2b48weih790rlzeomaw64jf4xini4whvs8lfsi5izllf84azicadl56po7lu86x81ex74t2no9r4',
                interfaceNamespace: '7stm6jx58xtqr9b0zidmvdsxc4cgsf37qmjsuujp2681uakz9vfnnqwbyfhl4r275y94vyccoztfuf18ownuo75r0dlvycy77bqrmeq33x1n88ju29nqzjq7ypruklek2unezh9qnvsgl8q9m0mr0t4aafkosdmo',
                iflowName: 'tnw5sd3mf6mfq1pzmfr79z6y5njsl534oj5ek1l7o0awhf1gatzx625yzxrnkgnlg7pln26xc4djs9r9bd894xevpfva7jvun27a0pxpj0y2200bm681kh5l73iq3vesy0tc7or3zgvt0oukjr5wk36qt5es6iss',
                responsibleUserAccount: 'dt9vhyvxs7i4psv3ujrf',
                lastChangeUserAccount: '4nmw2zr0tntku6o38gx6',
                lastChangedAt: '2020-07-06 23:34:27',
                folderPath: '6nhgvsjpp8c0zxzcetw0yis8iq4h30yalqaibood397mpfrv0oyh7fzj4md9ba8g9sof0q7jbnth7c9y4dt56u2hvzbt4mr389aezmnqx7sc4n8qxu0zu2jeaxaf69jbsa1l19ypu0tv1ezugon9b1oqbzouoen2u4dkxiy8qcxeyioouidhgw0766jsttb0j568my8woec6dml790d0engw67580s9an02glkv51n3wrsv1zkqiwbpq8aj2ku7',
                description: 'e2udhb9tf0edly3pwyokr8mdxm8w63m1f9wiqmr05l0t354sxwzigls1jy94zb0etvo1k2zk08zb2jg39q70flt54wbd9lv66f72np3rf208cf1wiisllv2a5yh6t6z7tgrmjp6my08gk7yalhrgvs09tax3q6mkhcmtoxjjtzeepej74g3esu5b7zl1pcmsozsjvpx04oxkj44bge70ezvapyblxfwlb25jmwa8mapudscpb99tttailqiwy1q',
                application: 'lo5psn5q2tfvqo2i38fkenct1espqjvxxboe0o4ipza9mrz66ch28z2yan85',
                isCritical: true,
                
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'cb47vvxi5ckwieoutj5okity8zwfmak4ai6rd',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'kurumgo032xugkuu9guu',
                scenario: '1qbndeo9s79dzqnyr69gwttgotkuwl63yokg56dt9n9pstthhf01rdg8wcwm',
                party: '6mqqyc3j9zl077jk67hzd4lv1zoadsl38rvqk2b05nkfeoadsu5w9lfbcw5uklow54qkbyujsncpmnjf12tdtcrrwg9o7ejfr728w8vjuy5qcf6g83ml3izuv8bpgq31ix5owo95teg9jcxz8hxtfejbvoqfl1kb',
                component: 'gmfz8gvnyxf39zo4aegmc5od7csgtp7xc7a8ttr6yjj78p0n4da6oopidyva03zdvqyzi9h81x94skmv9w83l8uao81gfh96pg6vukv7wirgkuto0nvwqmirgtj20679mdepnitq68gckrbrc7vubm0nh6nyjixy',
                interfaceName: 'nlvwh2j04zow4ex6pzp12ytu3e108ozjr3j89jh6h0tqt7u1utj57tsw82w6r6d3m3dfv5s7f1vb45evbb27ek3vyl7o3ar8qy56m8u9yn4leq6fpvd5c35aollcmvqo4vmggn8aohyschkzw6iqgk92qb8uqhj9',
                interfaceNamespace: '8o6i3a738lpfx39xavoqdpj7t7d7tgt7yd192ik313vzjzvka3t3c68jo60eqahowtm1hq6e677ukuxv1m5menwq4yk7g4b060jp8wedz934d57h784pmz5wzpn2tdnkgy3kv9p9wl8y2gwvd7a8vxyh9mb9bz3o',
                iflowName: '85691jtt66aozcx0qepykwjoobkc3s43lxjqgfcqkwg35oroahby784cks0q2krjwwfn2hiuko15x0o30mrjjbm4ewzqqp1xwtgxl58v3uzd27rhfagcuhpe9aunq2nqrm131mfdcim2g1tnp7bup8i4jtr2uwa5',
                responsibleUserAccount: 'u1c28607pjto24j6hcfx',
                lastChangeUserAccount: '2ndauqrrwdoqa4codi4v',
                lastChangedAt: '2020-07-06 22:12:45',
                folderPath: 'gfdkb15p6k0jm383hl4ni8ci0qakunone6ylex5i3jhwade6zwnf2juc6gxo4sp79lhxhz4sp3mxlvoct7p00c45s3zwthhrocdhythwd7u781dvz73kjsre9158zm7yumh0w7fid9ak5h3ho7fwd91shgkv2t2c1ffpk973o6qkxw9upl1zs01wqy5vm5vy20vzqm4ppm45ch6z4uppwcuhu01f3nrzublktvt0lcqphpfv3s5ah5essh8ser8',
                description: 'utuelj72462iatwrdsookcuawt8cc4yav4knopgrebzyn8z5clumm4gl3rcugx48a3sbvmtys9io7odmy4akcew0gw6mmo0e5705bm4zr8tps9z0j76gz0kfcjkaf0b6yihazwhjej0osuzp2wfwg2oqtu5zd0ggbyyezyvc60c6vv4qlh7mp5r688oac01y2mue6ucjn15w0qmhlxttz9633tfs9jskizg0g0x8x8mqbas1cx020p4lr6g1im3',
                application: 'opbg5civpwt0kym5b325hd0e35iohn61fzujq7w886df6jwspv7ldtlc8x4r',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: 'tb1xa5s7oboel6rkus1jte4bcqtwb2z5rdgho',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'r5pv6ca0lmhf7hqq6yvj',
                scenario: 'xvxxrbsgv6zesttm40cuxie9qvhm7s65clt6ffzp4cnw5zkjjzjsnj2yv4m0',
                party: 'utt87ezcm3difni8hv6rhzuhgtdx3e3rco3dt3vp8au8v3t73r77klrveiwvdi3qlolz8wrh96uj2k26yyt2h0ja0kzv9sn0ie568stzc0bwwdh3jl01id5q6ajfe38ck798bkhdwswk1fy2z72zzu37ejttsiiv',
                component: '8dx1ehuiv3mcaka22zoyo68sc3noovgk865fqqvf7b9tnocf77n1ibybogt9npqe3mlvnk33x46fs78t3uvvcvedrgp8zhyhst5d1t5m0xjv5kaxzji9vdfxsoxvklipierou8zvop3tm93jwpsjf94jdmtfujkm',
                interfaceName: 'ay209qkooc0ej15x7q0s1slks1wll7b36614wnskkvbylmv3aoa2jzg1ewddxchr4x3lf3u6im0xanzeydozhudmv1bct4qiipkpphdwrsev9fr1zdzdtfw0kummcq0s3azdb0goipfkc9uuhonlzqof4x1jgvxm',
                interfaceNamespace: 'xppa2pq3hnwj7wtszybnh0z6o2k47omdgah2zf5fsk2tjqoahr6hdia1oktthuy8psyt8lentse2sph128cxfa5v6ukjdrxbs9kct51h5s5mx3fkh4aaxdyikaz1juy34jmc5p15accyq0u9unh6ggz6vf1i34ih',
                iflowName: '70yojs2fuay65revfq7ui64x3877cv9n141b76qsuipe8knlf9v5v0egg1yuskfg85r7cs02475opsgp5l4iwwk9xq0z9tycdmiseir9ddot2ik3ybo9zmmjfmadqk4hchiet5e96kxwq03cu54tv2nhpjzc9lcg',
                responsibleUserAccount: 'p45gprssyoibmgv7dq3s',
                lastChangeUserAccount: '4dc9f0z8mhizl6o3vr22',
                lastChangedAt: '2020-07-06 14:30:11',
                folderPath: 'yx5ogu9u7utii7fr6rji048bfg6gx6yqtb3x02uk0w5y4tuic622vbrh1bbjnrypt6cz6fhdaseux0siayfihn5x7i30r3o6c0y4h4f2dv2dl26zeln456vldub0wcn0810whbrqe15ngjt7tg5k8vggda4p75iemtlgx0vra1qe4954o7qhx85qqcg4wy9efk3czzdrmkx2oodurarq7jt1glb7pp8498114wbvznwtnc5gvau59kptdgnqprg',
                description: 'c82jff256szmc5xsij66srprrq0fh5fabuyefhtumf7sf6dkiaaqy36ytlro6sq9nbm2qeurm8s1s40y3xezs3fvgtdiyenzb09z5pfjhwwn1v7qoqduwsvfrjxk11il8loazuoms3x19n9wcbg94f9xqrp34vsbhq4z7jh59hubfjoaxhq3c7kcjdpqx1dpc9wdkp16p4wzq8f4mpdi9qnisj7agwhmet7jha8ldebhdjwlcjjtnc2orfo166w',
                application: '1b1pi5gi1j1sl5njmf8uk4lzuqa4429xbz3wrpyvvryjtua7blxauumcaf9j',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '5qgrbb6bee1b9wqx9y0dhei4jskm0f0uzndpt',
                systemName: '95ykn69hnhw8h4mgjwp9',
                scenario: '1ghbtfolju52pl9z3e0vlxftgwvtsjnj9o29kp1ib2kcqcwmb16gvl0kc78o',
                party: 'myakascof7yot2byma4ppqris323dxjh3fwf4fjcizct7rrgrvoa1tlm5okgp5sekct05plewilpx4bhma851vfl1if9r8q5u7x9bxn6sv6e206zzw0gd9sl1lm0qzs13kd9st0ucsbn29y94bm5gdm26v35u9a9',
                component: 'cxkoi4j43ryjgj390p9608q5nrpan73rwedv9ongyzc43w3petbwikc3lorny069eqtze4en897tzvrk1rj1b3xj427dh1xolt3tes6s9b8ywecqqg2fvgy7idcp07vhvsx9v51mlw0ajryimroferz7ecq70h28',
                interfaceName: '79he4k5txrf910rhlvyz8obp940xc7mjxtkwu0x3nni6d7xwlydr32r4jric15f5zyplz23jrvp30fyyrx07rwd5wwhx2sguwkev4wdg2ss15duuev9rqlysqi2nabkd9gnrmx5jonzpbtwbfrtgxy9ems60wi2q',
                interfaceNamespace: 'w8ka3r7a6x11c76axuwzitu3i6gmgywrpm7xersha9exkykjl1lauuyte0uwjuffm8olocig2yvj0xrpi542o2qfdgl7hmvz6r76mcwt8f0w8v2y7y0wvfihk2es4yzhx2dqkk0hhbddfahi4tua39lo0ac4325n',
                iflowName: 'qzu7862j9dauerpt9zu29swbw7hg0gq0z60s2ytf7iigoopzp7m8635fc71qrocauwe4s9225v6g2vn6hz88pfitj147gfxiowcd6jcpxm5lnsodfpehr0njahabdoygq062i0l04hiwcowg9i26yysks2w3t060',
                responsibleUserAccount: 'lu6wn8qtfkx62mebg1l1',
                lastChangeUserAccount: '5wl650huqxoclhrngugq',
                lastChangedAt: '2020-07-07 09:23:04',
                folderPath: '0c5comeeh03i776ponvl8utdhpglfyydyvah9pcj8j0lqylgvzieo0dzpmzzmd0zufz0ydr1td0fpklmwk6nocf13nnip5l5o5ta4k2h4nat6l32gk1of6t1su7qblfjihcpf60t9cteubrv5cb1e4c7hq63mx3hhy3pycyobwrbeqe6poj43sgq944urf2uvf3slc757wkxxtlnc1365lte64cg0cllnr5af3os35vf1kucypujqp5nlyb0jv8',
                description: 'gpat5926jvkxpsww6it49tgk49rpb2s7xe8j8mrcsijrtztho3gzo6yxvsm024eib1dxz3by5x059kymxle4diborb6qcsm89qm5l5r3c53mkcnbi7iqbx6m9drnk0nu4tgoolr87hl7xkloat4vetzbchai82hwo9zvxxcyphrjnb43084w7vosqpqincfow5ibww4215kpxhmixttmb15aa63eufh22m0mno979vh80raxkg6m9h9zz5h50sa',
                application: '7m5eju87vjh1gzadgwiu8kqxdyq09h2fuz94fdfipjaw22sv3hkxgxzz7exa',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'hck2g1bbhlhc97ajl4i4',
                scenario: 'inrb397168r2qynqeqbhrpnv9q1dekakf4i38f4qarhf9w2xlirj8dmrj35f',
                party: 'x7tvzis0uog7g8dnsulvggyke57hwk94p6nqatedip39s6b12elb2sebxmke00kfkwvkkx0345dcoplf7n1lx2zuz2h1ml871rggxjxcg4p4odym0rcdxxkdhb4ivcfuk14gzbujp3p98q6ocdhtbgjklpjt2ui2',
                component: '8nm8wgf13oiuusdlblqw4znjontplrj25fy3xkdnby3alqp187oeh8o3be39na8ot5uda50p0znei6r3ua6f821h5iqp1zfbh6rdxxjiq22rlx8b83g8l6hb97l5t2omjhb9lk374bfoausi92nggylyept389ud',
                interfaceName: '80kjyeelb7bgy20lgxck6wo9hcwnui9n96lmk68tlsyn1mwn53ygwbe88l3pjbq2cb8z7d8uxq7jcl7uhxn1szxjlprn0c41lb1cofur1u9toml0n5nngsnls83oblmhwyw76fzoe1sqgz2jijzuolyp9pgtc1ee',
                interfaceNamespace: 'tjwxpzp99is8amqs98r4osbb81p9am8ul5rcpxrhwxsju7ikripkwtsl79rvo1jir26z6h9h453wd2k47plgyl9cya8s2hycy7qt9ez6bxui6fmvs7qke9i6vz6rlp0i1awsz0e72mgc7tzpzi4efhxh13bdjfk1',
                iflowName: '2skrneprxnm82vxhfqwj988se8px4e2hko0ko1c7hmrockwnoc92nre96670m4nh18kge4wunoq0btggtmfgikhguars75a97czwfj1o0cmopmoas7tt1d45g360ci2hojsb4gl5mjmb1zayzyc3jyv70bbp0k0d',
                responsibleUserAccount: '08k2tacliqclhuk6jllj',
                lastChangeUserAccount: '2nlbxwg3fo1mpubszow6',
                lastChangedAt: '2020-07-06 17:03:44',
                folderPath: 'i30le4906iffkiqawrd0u1t1rfd1wwlk1x6r1zbwbovhgbafg6v8op0xdp09apegs7qy4f6aehxbvr4z1dercpljk5zuvs5cvyoqisv6tcfwbbp275sv3jkc9m79lphdiig9yq9nst7hdgg52uales2xqmmcnk7pna8o3cy6v8c3g2agnz3spepa43od4cxjvdjrxt9k59ig9lu2vvrqicvndtmk9iao1m2st8dumax6ackdvxla0apwcjc4gsu',
                description: 'u2w8i4nz87j7bkn2ls57r9uv209bw3c9fkgoi37dsz6qa5jfhyimde9ltigzcvr3dq4gjx8sgmb70lrmwlupaz4997ded8f0g19rrv8erokbreouvenapd8onptmznu68hi7n0ihlsvyg6fofphuldzcu1v91t0i5syhekdhkvcg8gq69gnp2hz3iu0syuyhwc7qhiepxyvceoafwsjy05jgetizpkm9lmsjrk7m6vk1q858hceqy38efj2g1vz',
                application: 'ad75smt3whrwm16nlpgfx2lbdkqkcji6y1c98xvppbyc56xvtkcw97ucjypf',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'iqbuif7h6tk67xtgfrafq9qaec8x3mkz5le9g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'etbvnab1o4qurn2o9pkua',
                scenario: '41ov2d9npxqwnqufox6x3cves8q5uuge2d253ix0w1viv6cauyfplvj3nwi6',
                party: 'awxwzats83wijh08887qjstb7drjsao64v54ut8zi7jkwfkokp54trwco12eqqje4jmy0en1nhwbxc1qhe18zkuh9wadffawcdhrbl8miwrjfzzz4xy3erajksokyp7h954chxwcoc5p9jms3rc7ir17xhk341ih',
                component: '3rge6hhe1sdmms8eezf05tqd9pagc6g2ryj8v9x5dzww9fbh6wsanoaozmcy1ab0hq7wfau499g25wq96on48a33dzwtwdxxesrtkt8qh1wzcfxexbpdtflue60q32b97souzrz7wwg23vqaukrcxuune3bpssb1',
                interfaceName: 'f83md8usms0d6s1avukbb916avygulm6jx4w3qrlr4j1gjq9pxgk1bntgp32h5f3wa3yp4fxszd0oibpd7j6yb4l09p829j0r5uqfos5g492lyim6z0imutox5o5ybwyx3jqdjd9jylqt38yit87fs6hdufcstd2',
                interfaceNamespace: 'hhynnxpr2ubysflas05nmfd0i7vwqjmlz2e3kdtwlej2lhx9077qxqxw1y2qiq17p0k0qq0dd45mex2vrjs94o47vssb58mpw3j7d8oj89wn1v8zjz1r869i47t3swqf1km4bckzlefos9h92qalxcfq08mdb874',
                iflowName: '75y0vmon2s5p4ugos97v50el56vim8q77l7t19sl0awhh68vdscyf3qquiy85mbccfqgzv5ug3fxtrem9ndsksq2xk34fg604lttik4k6uym8f3m7n5pl2k015lubtuca7o7x3p66hmy31u1x3hy3rywzt5hao6t',
                responsibleUserAccount: 'g4as5r491jte5nfim79r',
                lastChangeUserAccount: 'c994v7uks6rt5sy2eq39',
                lastChangedAt: '2020-07-07 08:24:33',
                folderPath: '36gz17jvylfzo67t4j7m0tky9lxxcccyo50688afinianj981c90e76zweur8fcefrqrhurtilz791bdgprsxq2e23jqy3u1jsgzpf5eyv602vdx018uanbj6a2ltvn4b800hs5l6q2xyfxpf2nuscs1avf1arjbzgyiil71gmwg4uy26xcdo57zj7d14albfgh22v7t57fkx1xweze5ejs48yxuq24u28z8mp691x5ksm3hswqy2o7yp82jlq0',
                description: 'i7y4maucx39loz1ywxvnq5x7b02a9psag2mmfby53nnfm8dnyb6kcyqxlvqw8him8lo15nvzl8iv7vrmtm1qux49u314cphoucytfvcqyues1zb6udio2svmuc75ztf86b21lfxrb0i6ipql3utufkum1q7zemo7h25c5tz4yls6dl2ujm7u78a4suicy8qqyv5l3q9n0njp8xf7m7m3b9xbp1irgc46vi5a9stko5hx2ncddmpx85wd9stesx0',
                application: 'i6zn2xur7niz4zwbruqle067n0705jvgbaulq3jvllm51tvucsnargvp4x3x',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'xx6zdi66v9f53otqngjr',
                scenario: 'gfraw553v71v8ndq3fci8xkx6oq7iio8fi9usc2yws6pjm8rpv4ry7r97fqgz',
                party: 'pw81ya5qf43upa8xnvw8mphjnuq0oyqjtfi1sa2vdkyykh1imt0adnsq8g2wp7fkhontb8h8rfun3p5yx9vdpu1hc0ne04388urqtxnwqp35jl76p6uz2mi7jd5i3udddqjqbhzcu78mdli3a44bu71rrcl28han',
                component: 'cfj1c4cpz6r5aq4ny2mly6a3agsnxrn371n77txr7jymvd1dh3i1ogfmqoxxrelimgi2cvrtkg4meiel38w35vpayfvi0depj2slg77ds1v0ew56v5owmjk7kivbekilo6c04ushp1v3hefrwp1u0dq9nlr6ct27',
                interfaceName: 'x7p88yd53zmr4yrf6gpra1qmv027sloagvzv7l39zs5lmreliii73cq9q9mbwvlxchbeu0tcp2x6hku9sioa24k0c3d6nw1bwl1yku274vyke6dzknf0m42nzidy3blesptpxm5pw45l39842jogycaunngwlyud',
                interfaceNamespace: 'hvvlxz9mw0p2lc41wzen69r3yikr5ua9ie57n1m5ipp6ih2cozxviazf6noayoo9fugfx7tlhz23zj7k2c8lflf3gr3n67xq3anhuqma1wt2rwma9ya3j9cy3sxa0mirm52gurz3mo715zrqi802qyu2org6gu43',
                iflowName: '3fu9n91tdrmt08eg63cw3g0uyvv67coi1c88h4u7536hf3fy4bg8w2y9faixspctjg6zg7f8bgvkep6n5v8nf6vr82fudlk7ozxo9t377oazxv44l7bs13b978m5oqu074v0wqh21dk24vg96ts2bcj391dbrgh5',
                responsibleUserAccount: '77xreog7qlbc0rxr06x6',
                lastChangeUserAccount: 'skologilmdhw038akf2g',
                lastChangedAt: '2020-07-07 02:15:26',
                folderPath: 'tuxfx4ohwqyuc1t60aqfquc0qswnnzoyc0tfad8dy74aeqg6ch0g39h0hf9gpz95g11mfsr8wzsdh26d8c0ltmv6aqe59ilnzu9toe6j292uf915vct7ukdwug51b5gd9q1yriuqnkyx4e5ewjvmhrt62ieavribt2jkrms23c6j64ltetf0eus0cwc3iocive7c3e5bilc6w2lgl5jp4k67jlufzgnfozt4zm6s2auzwhv3nne3if3um1dzvh3',
                description: 'xqnc97aw4nrzy8cshfkti5nvs0id5758mwle71ix5s3lszq0do92gpmzv2up0badaddpfb9xqmvs00fam3iolpp9mt9zk3p535axccozr1i6qz765bde1kl11ie67ll1musdoo228qmdevci8mtksi68nu7x7i4jbs59h5pc6ebks62yw9z4jfwuu7bblz6ipodgryupjhsvg8t4hqg185757l3t63iowfsguxt202v4s0eknybj6eam8viw05k',
                application: '2b12ymjg9kmknyi4vz9rzirj2bi28z3zg43p2f7plbvxff58vq4u4zmpx2ht',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'dpb0505kigw70agppuqo',
                scenario: 'oeef4aax4guupdmu9ballg7w9lup89z96s53mhc994jpcqy4bswbw1kj2oec',
                party: '3o78j6gorxmom3wx0pwdkg9qlh439weigk4luczvpm7x69iycd818pypxrxfbr6eujo5zpma9nd7tuotm69qc25dkjgx0hiflikh3jpryricewtwkb68c4k50pwfoly78boyemlnh0fmjku6373xbw9y1n1dvjnu1',
                component: 'rlbtpaw37aw5kxow7r8v00pves0u1fire8e66t5s20m4fyees2d8nm1surgpiesd1k5v93doqh3gfu9zfewy1ysi677axs548hexow5y9if67ylci9ndf60um8nbbfwhym64lob0osai9qq2d7jjlifys5nnijhm',
                interfaceName: '0nfybxv2c6pvd0rsnl1kh6rawcuu5hzch8pckqk4fux59xko7b6rc4q1wq5zgfetqy10it4lko493is5jbheemqad018krpkz9k01p4ayrrq9vm218shhvk9mm21g3cng8cgequhvdxdwvicwv24eresyx35qntx',
                interfaceNamespace: 'egxmr403963yh8kwj1mb2gmc5izp8izosejeswhfqlj1far1ypplkoonab2716f46j6ygmn68vr76uoor9gb8k17w3agklq7ec4go31dg9gk7nht48668xo4m1ex3yoze93wm5y5ea7xjdivwjjgt4uswxwj4irm',
                iflowName: 'fj03stbjqsyyaa4ee1w2bm379en58bn7uhkcynm4lk4snff10ohonwo3ntnf7o0jaxbl7v7mzgi7xbwm12bam82w1ru41t7mov2hxyh7lztxzffn0p9dnqg2ezadyc351wgc4dm63236u6caex173mfai8uyjlzj',
                responsibleUserAccount: 'zq4510ehrtyf0k6ceqzg',
                lastChangeUserAccount: 'azqmac7myp8tro7ol2i8',
                lastChangedAt: '2020-07-06 11:30:42',
                folderPath: 'vpwvnfud5e1pgm2797stz39i4rs0c2ynix81b3xx811ob4fhfqn6tolmypi3wrlrdyxzxa8fgqae9xzjrsjpg51f8qxy5pant1ap49kl1dvw4p95opjcpwyb7izv7ejixa3g0kktq2iyl5yegehdsq1w724n150r8nwp06cbbcooato9stzbjpjn0rml9g3o3iil57ht96s2s0e1h550kbbujefsk997tzo5gva7eozpddc35mg3qq7oif4l9ue',
                description: 'b72h6khrdq3q6iy20itv076ait71q1vbbu01nhun9e03gjs2tp2cgd103t9rcxgeiykz484cj2iv1vlazelt1uzt8w12rjormqcj0w6u7ruynejx8oh9lt0tqlrjqhwixzk2grdo71swwpqxtn3zn84h0eqrr11vqhkjh59ku0cjiwf20kg64ug64cd3ltcu20f7yydgszunp83qrj5mthn92faqe51w00v4kbwluobgmhna7tv7i80rih4mc2t',
                application: 'w2vh5n3ci12zms6j6pccv3zgr7k5jxslcka8q4k14vlarnyicrc6suto5yaj',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'ldkixcqfhs4beu9gsq56',
                scenario: 'khezwq9e0r6c16ohd2g0k7w9zg5bhhme58q054upb3z7xgthpzcdqx4r04s9',
                party: 'bwsxg5fjz6yh3vdr1jiiypfqak5rhw3xzz83eas55e7p6ov0kf4k2ro06v5c90x3gmwfgo52evxtdj52o2vbhhmnt9twm555sm4momsm43bkszeqifvhmsxl3tu00pnfdvoxgyh2jsd2k39zp8cn52sysjdcsqb9',
                component: '7qzozs0jwiypb65d0x4twq8gjhquu64evmmcpdj39mu00gzxkw4aourxikhu46hblsviagtr7lg79pxwvi9nbel34gc46y3a4yfl2ov9j6mqwq9ae00owe6kdl93z0lk3gnxr5t9r5qqgm09pghukppyd3iofgd7x',
                interfaceName: '684khmbp5kz9sycnhir8a3qw4wmv6cgz211bwyu8hqy641b1p19h5qyldimxxr44p2pklfcww7ukyiwaw36oi8wyfenzijg4bh7ohxpo02laj5k95fh7f8x2y7x5suh4r87lzcs1gn7d2k8nrbbs3jepkg4ai2ea',
                interfaceNamespace: 'ttj5v3yoogl1084qhjrp1cwbxpdukql8jymf0f74ah5xs06zhh1vjuqyz1fb3wc19em53m0uf8uquz18mpkjiw2b083cntr84qrtzn8bhxn2v4d0o2gkucmsaautjvc5tute7qq08zs4au6y7kp06wn9kyalmshz',
                iflowName: 'qvwlsoogmwep52qw0gkuu4unqf4eumltcagfjer5sqdcar2sggdrc8kkvl1rvmds9v4f9rcu16374xqkootqg2z5x07l9nbhf78zrqv6wibuobvzv3ckf38spvfxwcpwftiersur2zg79bc1kr91l30ut2m17m6w',
                responsibleUserAccount: '8dz2qy4wcjtpd2q0nhur',
                lastChangeUserAccount: 'lp12v8h8f47qk5ostpty',
                lastChangedAt: '2020-07-07 06:32:57',
                folderPath: 'e7n0vjqnpi4ez0t0x3p2ps62enf25tv9ijq5een9q7jr5ri6axlqtvuwiwjgenp9k3cj9zv1ysyxtj7hkcwjegiy7qywxfivbbczc8bt37r2x9gik418i0mdmaky3urr68qtgal4hfnof8hcpcp5urhz26degqvfdhwn2pm9sby65n9p0wop3eirxranrizqmds4n9wdrf7124drfqt191n202ql8qx5bkcamny84ohhrsa78dnn1r9xfcnmtk8',
                description: 'x2hvwleto30dihreh4qewkzlxpl7b16sjbhwgbqjvcknizu0y1op96o8a12rj7tlmpkzbf6ck4lrugyiev4mvrw20zunryuvrvcowzt5wn6z7qejs4kna6ycy8a2ednpmyolccawe1z7e5t6fqzepgnke5cdbu78qi1jcbkkr5lkh28c2r6yxt6wop4sfr30c60pruhethz0m1n5lks4sudm5tf1we6rg4dbdr92x74yvqegpu0th1weckl0dbm',
                application: 'z1oykk4noqkpud3vhz3ah8k4fqtjz88kywubshrbzhb63qcdj0wekeftlmon',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'cjmma2am1i4c1yjnrpdd',
                scenario: 'vj6hj6yxywsryirkfmh2mjhbwmrcj5xfcpgjkizs68qhn6xlnfuw9vk2loph',
                party: '5m33y79x52quqxdbd56fw6yngcb8wyxpgfozhznkzfrmbzxwcw79oar09103y2idz9otu57ol1zf4il3y9ewvsxjw5bfnuv0mgc29z8zoyqxyq1xw1pj01qjdb7s1jydpmlw0x3lbzdawqpjag0ao44lfp379nmc',
                component: 'f14r4ib32a2rvgnoso0vah6jrmrkcpo63jyip7soeeeo37y0cg2kjphcwudfzplztviibtfjwfzql9b80qnn87abjpe80qcrwdjn5ngwtqp38m4e70yqiczqxupuu2v2ub7p3arl3v343cuk7mb5bq9edl71t2mi',
                interfaceName: 'oce8avzkv7t7ib97npei49yx1xlb1tkg278scp1on2fyrz16mo66nsydtkgn1s4q95g55kezqju1a96ilhqfmao73zcxgwg3qde6ik93x6qfjiw3hrnzgzkmgl4e72fk9fuzpldksnx3r21zaiojlqrahxghmwa8l',
                interfaceNamespace: 'dpm9t3x2n2ndyxll7aeqnvv3zh8wy8ppfdnx67cimf5uidillgn6kxft8004542hwm83nz1jq8nxob316pta3fffs4n7cew76us8zndlgqvxtglyzwp42nof8z1gigdaldo05urllj4lh8mcs6ixjofqqhwcm3qn',
                iflowName: '823wsgflpamlujygfn1y573ru1ru6pvicpg8ytvp0lidlcgwcccstr8t8s3lyqvm2k9i6tx6r6kj5ycaxcvivnh4f7wv9igs0o4i1rps467l5bzwsvsr3f67eoryxoe0wqp4wkrl1st6dt2330hnj1cdkgbfxdi1',
                responsibleUserAccount: 'mvfrsdfhqxh4yxn7sjsx',
                lastChangeUserAccount: '1sufy5py9wc7t8jqt520',
                lastChangedAt: '2020-07-06 16:51:34',
                folderPath: 'tlr21mp5gifshklxhuj9o6ifdz022e4uxeowd4a1nmc8rb0n46k8nyh7csqyyaixv64ma58rj6kyrcphsgx1eglsj5uz4xeiitikiw80g4p1pcj4ffucdqtd2y3d55bvowexexvolri7rogem5uibae4q0olizyvnuanusrfxj4nn47top5k5n47znqdp9kgtrns4fk35fhmyeufwflv70uvm95v2a6lgwt0m1upj8wyr91p9a8tkd1o8nury4m',
                description: 'jf526fmr0e7vsipk89b7uod2p3tagwjhxyiwechk4jo4fqz0obnwoimym2o3i9mgcbzcb4hdmpvnuy0lbaepja2tlffupjawp9fda93oesujjmx3bncxaq1i1tgvcyly7x6a48f57g0uhgpcxtke3ctgubdbu7ulabkfd2jebi0k9d9vehlnpb9jhzhacflig8p6iespnl4hpbpg03hb5q22to43rsjqek0acj1yyw4nz4jax0k59m4scygiqc5',
                application: '6c34u6fsrffognnsdwizqubit7m7khkw7p3r1kj2n15mfvd7zzcjh0hj6shq',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: '1l7l2z8mlo5vi1h05i30',
                scenario: '2uxc6nroslt9fo8lx23638chy1e9egsk7sqgd45jpxcii7qnad3em3zcvsax',
                party: 'r7n3vxexgwn2k5ugdildqqt000lsb7xzzdgd9r44pxaydebz5rpegkpipa14buinj6mt46920w5m083xkr76h75c5yb5jvfnjz0ax3kqsbmy8q47t7xn1dwdkdng4nidoi9f6rxu8bfuhlg722xancemi7n0ty7d',
                component: 'vlhiyw7rhxfeggnrr4jzx3n1ekxfcjtm53ijez73t6ad06cmtiwm1ruvvmsj7jndfccred0b0tvr1r94e5sm4xyerb6qxo0edsjpd02a564d528mvnh791oodwwqwx4xd4rb0y2ng47wnhy2ehq9yaypb7ln1v5v',
                interfaceName: 'cd9mndur4fy9a155sjtwhha10druej9c4uf6za0q326mpfttpu3z2ra59pywz1qvwivv3xv695cpd7vnjl7ot1j8rad1hbe4qwu34dbty48c9xu64up2afiek617r8c70vwoieh8v1r7otwd7e6nssedlaz0kxce',
                interfaceNamespace: 'k49ubuqb8rvtph7756ge5sd4qsupxv73y8mqk7aq9v034qtugg0rdt01tm70n6yi3jh602urxrnzn4j6xsml0pp7enkcb7yyn7sofhfu1awlprx1kw0mn2kz0v6yhdporpmrzqgxqtzjqfsxkyv837vea5cepin04',
                iflowName: 't3w7ivnhjx8wkgenzuko9kvfwcs6ehbtbg0ozou3tcgz3zj4fkfzj4iylbu1kza7t6zd4r8i14mw4frgx7eguq3lfq4ly6dc6xkxz5la2pkyv5ujivgb9c6hf3ql7hg04l55fz1qkmjg28s2l1myj1c4rqpvubm2',
                responsibleUserAccount: 'to3lvl0t0zn15j296g8p',
                lastChangeUserAccount: '0x8x08fkjj09kclx3xpd',
                lastChangedAt: '2020-07-06 15:27:03',
                folderPath: 'sat9d32sibraaydv4d9q869f2jv2jt7zbw5jqtrxjuusml0cxj3853gsid63x7udwui01kqben3v96fqegu2ih89tvp2e7796z5l5qyzt9ej5ku3gr7i00z86w6rveh1n7a6a31d1sa68xf3d23kt4vu6x9b5xy8409ytrdurhi41vi2px7e82ngsi6dd8csqx8560dykz0l2htmxwpf76664jb0a02hupn0zqlcv4lmeto9a001pcfrmxzwude',
                description: '8apdjknwax7yttxoy5gawr1k41xdaux9oshy33d6d7qesp1vseuic64y2suxcv8079lhwdl4hl9xj569e9xgevk2g5ee4etn13j6cgs0wsnmg14tv5k1yl7wudeuc5hy6ovwh9hckjvy4dwulvyoinxg41zm5h9trbfevztp9ud2e5vwe6bynpga03zzmoadbuu0beitjq4sqmax5vmir03tpltxzuchfvimz5evyru1cwlxtc3iflzmkbdyvjf',
                application: 'uf8m9mxh8vwdubal5hzsapq4jpv9bxlyvokdfgakeeevqgt3xm8ngbvcibb6',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'zi3wycixbfio3e44krfr',
                scenario: '88e8w1q8b6bmb6u5xctlhp2s2ll62vz9epl3g12u7w1zntgsfg4edm9f6vb3',
                party: 'bypuajohnbagjja4ayi2x5ecupax5cjqdwu32wpjeyywl9ync4u36ztdhl4xcluhr8tjoagx9s6170iml9bxgf56ax1s7nznbl5puipv2eynvmfwmxey64kdu148fuqeomk1ay4gk95cz7kgod0m442x58lw0xpw',
                component: 'v417p51fk7wygskqu73d9ypoku5967jdah6roqhrwelunzjf353bxotnba5ubtfi9mkz0minvzez3qbmv3ois4x2xw1jehaad4imxxsysn32jrhht35h9cbopydaoek8frzto6vq57r6x190k7qli852fg33qrry',
                interfaceName: '4ti15iion6hwh2ggg31g82jmq3wpjtkx7wzg49132j68a6m6my1d56d8afsaxa8squfvzyg9qt14345r7g648gli32r5asa2fdjsakobrk4kvqfmdbno3874e3pty3a7eolxxs5zsxzyvlgt0a4fubkv29d9q5fw',
                interfaceNamespace: '2ruzdi9jhfhszf92vz8fog3sdv4kef14koj65zc29vuwkfkf0g65q8tjvzucniws24vq3y2dv4rmnec27q919ry3ag7jweahwidj121i7oj4nm8dw5rk5h5oxhp2iejm4rr0h6l6wsyktm9yp4d8x0dujnxt8jsq',
                iflowName: 'mx0o6qikku92blahirpxn5hcyauwomvjbd1uh7ch0ezgf8tcwe6kmv3pty01hjn9vfv4p3yejh2hv3bdyb3s28of9ppoflpixe99lm28h86l374ynwbi67qicmlia94t13tfhcwdz72mgwrm6ck4sfmi3e0vop8mh',
                responsibleUserAccount: '4pj0ntkqkcofz6t47nje',
                lastChangeUserAccount: 'je35rnciesvdt85vadtv',
                lastChangedAt: '2020-07-06 11:37:41',
                folderPath: '391pm52g9t70cnq1gwqqtscybrrtbmh8c58o9u1tpw3sys3taja1abrpbwv2ouln9j9wfm5gg804n4nk2ienv14oqwygmrah6h9jpm5lhyzfte1fnyipgqfnkaegie4k9s0lotmt0cza2odss7wczar5dcs0deiahov18z4zud68l853q9smwru53sskksus5nsogedxyv9gli2h3okdfhzx1p0ms41kijpsxi2nt402ls7009lvz7az1zxxb1k',
                description: 'jnplnlab1pbn9krcpgx51vb77tr7qsqb9ud2obv25e3xq6ryrjsla8tfsnzmexro0yivchvk4c09z6f9jo6f10llplmwmybkt0b11rqo885vhz7tpkvtoc95zb7jqv4svl1o58pg193dphejptbj3mavoifi9xwisc7ujodh7yh7pj8vltggjv5l1gzlaku02n80nal5obh7jre08gb8xonnwwk2dx3zka2757g9frogwkicgy5fqdlpz6vv9ph',
                application: 'e848ujzv0f4aacyord6d8pyi0kk8k3sl2yfmviewb5im1wnb5iy6lsrsf67v',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'msranitqicvbbxrebddr',
                scenario: 'psuyg3ww1tfoppaaqy0j07lqc6tar72y6c1dyaejn5g1q1jrpjvzhakp1by2',
                party: '254gkyo25bekfwriafz8dv4squz6led1np8ugaels5tsns5ocy5p5a8jxwx774t1rgeen3rlfhidssq2pfnqezy9c6vb5i6ib4cqo1yjg7lf0xtwo4b3965kwkjk24ju5yzlx9j5192fpfh2y0ck2ydpbwt62dtx',
                component: 'tfd984yc0956lxpjsolume9s3af0omr8mgzyqk8v00sghlpu12vpnrnlahnidk4e4lp8hu60vvy56c93cs5ludryoljv55afd3rrpsl90c34hw82lwj0ose4qi1fky3ip2xdgmjf3l8nlsvdqddazkzdei07bntn',
                interfaceName: 'cvykvsdh15mdeku0dcg1udku35jgozg6ux7f7zfhe41l8eobosygzccitx5yviwu1qa9jwxkpdq2z7h9ifemuay0f994f64vmc7thddqn06tlqvpg8t500xaa90dztpnmicwyh0uhk06gjai06vuoun3wx72b8ie',
                interfaceNamespace: 'u1350jvs565dxdxcxvl9v42gaobwabeqjcglpw30nkoyl1hlv3nb632bbh980bd6qjjtxcpyo71wu4119zqs5fdnm0zhefpt4h4rk8u15zui7a0ldru5o6o3ikp94or53qz6lqog4kchy4hx63za627ly1b06zca',
                iflowName: 'zfqv5qxn581ms1lptizhwn2qhnraqs9mo4vu1dwuigytz5gh1ww3urmiercwng8d5zuhy88z3bz9me6jw4e2944lrb4ep9ew7uavfg2f97jrna2vzv2bgtc4hd7fjriv0kish3dvj4vyuauqlma28dop9jfp8u3t',
                responsibleUserAccount: '8qgr2btd3024tyw6zrkuy',
                lastChangeUserAccount: '1sl67jckv06mp0pvjqix',
                lastChangedAt: '2020-07-06 20:10:57',
                folderPath: 'tib4x2td51kyvjx4i2g3bba18qu70jj32wh17xz9h57975ssgq4op1f60hkobz2qbifi17ot5h5w9sgkkd9yzuxwfm69hontmgs40u4d6onsdi2frsryaq729r7bir6g17jonatqa532ey4k2xsn0ie4pwral8s6a2qilfu9v4y0dybrhnrrxups1iat6vzrvetpb2vvjch2ke1u1lec4vjmooktjox9ryo0sv9n1bqdnv12ao481gq6cy7m1ru',
                description: 'uzd3328u624406f1p2ha9j6cw99e5g8p3eccsgxr6d3jia86z520ug289ts9oa00c6c09bxg13i9kgsemz9ucff6uwxx75rly5gvka1kbji2idd0gje9vj79dx7k5c9dw135qa8vi581q7dnim82sqsj0lkq4ftufitvsosioq32tnw0wrvtpul0htr6ew7ezupbkvmoqiepqdqbawpe6jp4b31ers4z3w58yooqx3c7wyt3fye6j2mnivmgbus',
                application: 'cbmcxdecy5jkefq8gbb8w8zthy2mvihry7zfzm15gxkrjq0bxwq5m71xt79s',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'g1a02f586tbwom392yrj',
                scenario: 'fg8hioh081e0d7equiajatue714r2vejvhqaxrp93e7h3auorwrep1mgda0l',
                party: '04aezr5jsece8dd37orzdu2x3liqgbja4m5fs1ssvbt5t1788x96q9z6bqsbq3qdlvj0iypl0yhp6myjn38h8hd2zowrgagi4gaqawktvytl8ifvfzfybzgj0hvw88fa3cgkuoar1mt3f4uj33faqyenmkzgoy1r',
                component: '3ouay6uyh0fhixgubay7dl1dun3qe01gof0p2s14894icg73cwe48t0uqmu87ed8kboy14qx39o9t4nvk9o6bssydd43a0rh832qh5z9ixbb87q39mq2qsedywa41y9t3z5iei7ejxfo2lkjcn72xpodzd6g7zay',
                interfaceName: '6ej728hlj6zoak2ynhqu7z6j9xd6g4s7j46mytb93otav85f8z0bt94ls8s6qnus693blfa7v73cz3njyeald2bzs26q9liasj5thbhgbdaly4czoc8cdbvbicuxdii7s6o63wa6bptl9j9840vmxpxx96tw61x9',
                interfaceNamespace: '5vjqjimunxwkzv800fua8crr1kkn50szxkd95labjhwk87hiu2fn6zvfy2pd58wkj8vtqwi5q7tf8zlddc0b1c6soo35m9noh278hsqesc1z5ku34owh4vwmucnxmpr8eoqvmzuzib9st4msyh54iwib2ewnvvx1',
                iflowName: '3ofcpzul2riswtii02ewhtq6pt8f868tsrznw2f87wy3htwvz9dx318as7m3spo3eln7ao2zzpruh8xt513dnun4364d9fbti798s15yhph57r21hx05wd3ivsi1hepgkgo2hv7pd6gv7ipwi94vf2rm7gpl524f',
                responsibleUserAccount: 'ocutcho3zqv47mydbw2r',
                lastChangeUserAccount: '1lkzylmm32e3h88stgxip',
                lastChangedAt: '2020-07-07 08:00:07',
                folderPath: 'xx3njey72ibxf5yzkrgi82ea02s9gz6dz6gveuqbafmjdaevcaz48zqjbyygqq5vv2nr8i2v9sqaoy7ks8v16m0j41i3wexiuigeog58cmae9bkla70uq52x0t8ddd23exu4ayzye0xi9mjtsorrvg27yixg1jiwtmbxtsa51xm84eceuciuqllhied009ayirvnuszuudzdoea65cheerq1v4hzyo9utlo97ixu8hp2c5d569g1yu8ibvxwf4u',
                description: 'fvqmtm9mf5bg4fjoht4ynkbi4mribl5v5jmygsal5f4x6cvwlh2429tt0mlrezpzc4pwuk2yfdwyufdkifio4get97bmsfs8c8wv8w6kluctmspti7c17unky8lhuf6m59kk2eb85tkrpig8v2xd0yi64jf8d3d5hkl9j6x1igcwgc3z5049fip74yqtwreaq5hr1dfgjt13kbwp1hjo9gysgvq6lmv67vl2rfs7uicwm8vhjnfwz30ul63ohs2',
                application: '2c27m507kgjccnws4hcafw2726bydf7ar3erp7s1lf6m6zx7drktjifzcz3d',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: '3efu8bss1m7o33yf83f0',
                scenario: 'cl5kbgmw5bqkmzi3i06yh2p2oa5m2i7ru82ca8uvb14lzlfo93yg2haj9d7a',
                party: 'j4fdd994nbtfwv8r1ssvkjkylw1tmdv9q7890ohomaqvoagaoudnczmncgytoc7wcfxxlajlemxsxs1kr8snnbe49ztq6bgw7hugbb9wzmcild8mphp66nv84ojf97m0ni42sohbjnpmvyk0916h0wepx0dk1hcq',
                component: 'lc7q6n5w3qkza56wvxcqr4ulk43kt4vkmo4enwo8yaveykttycgl8rg46s28f4eeq6xqrvmuk11rs1xsxsyxgnvdyuafdofdj8konttlenv59unll5twbd1lhiu1497a5w47q1zpjbg7nmsqb7h83vzikys3hcz1',
                interfaceName: 'm6bw85v21rjn03elv3zy7uqtnun8qkzurk1rwfme3r2kflov8lvlgmm1p779sc1wyta5xgzpm2qiejxa7cbgkiqmj3k4hu9jfwsy46uji15is22j4hh12pt27lrutchcwjud2bicpon751vf45rpfbe314wqfx9x',
                interfaceNamespace: '3lltffufghs51vq4c03v8c9x48dtiiv95hbx1656pdr9rwioffzdz902odi5c1q1rzqybh8e9msu4ghgtsnrd7fek9zx2ud70oggueswj3flf0lzdtkp0k4dz0hicb94p7v0ftfhhrcsedsu2g7oxt16bzs2qbwj',
                iflowName: 'k0wz9s1zbhozcmpv91icsmr3selrvg68ydjywzsgr40cm2mdzzapa58oteuq0y2yokx93mix57rr9emwdek52u87qs1j6bwh5wrtv0dorre812la9aeb1rucdggz7vd75zjdcg2rqti4u10c338gmiqyx7vpjlg2',
                responsibleUserAccount: 'ydmy4g4bi6vs0nswagta',
                lastChangeUserAccount: 'jixdp17nwwshhc0h6e6h',
                lastChangedAt: '2020-07-07 09:13:08',
                folderPath: 'obfo6evkb45i3nuvroqn6qtfy28v4wuk4kn22tbf6q8qtf4t009ft5rma6xcwnp34cva41r8e9yalltrfhqpz071dyw7qo60zugeahwvv0f655552kazntgbruhvbghqr7wtvjs9590sbv7zdwsitk06wcgd1otpovmjs9r4adhcz19aljrmye477ozvlne34xmiou8t8n3ch2rqj1vn83hs9o8rx7io8yx09hck7wtkr66ec3cphnfu4rdaz5sw',
                description: 'mj0aeaa54sg6achcnvrurb0iogp9sy3bkmswswqoeq4usxftut3q6izqwelulz44jmgrt70tlndtzk8ogjcbfrpu9gqunw6td7quvhl4j080d0ekvngkrvc4ybl1tnh9yi2wlr6mk6s9yfwwfe134bi4fvtbuk15uvl6db4ktz21imqbkemywoq42okt2r9oegb5y9v1begsdgiofkogm3r0ng28chw5z9td9xyzpvghbxjb9m6axk2pk7w2i8c',
                application: 'hce57jecjtfv9xy08s9e3cm3o8qb4xknb3eopxxabz3qjgu8ugq7390adxnr',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'evnmm1ful61oklq0qozr',
                scenario: 'no6sl73wki4lmuhiah0c0nak54ncmqs2sjmj4yr8zqswu3y764277dzhxw25',
                party: 'me8q6m0ovxp6en898o9l78jtgyr79w9onp6d2c5w53nqyi2iiigr3y9ojiv8q4i6f8rjob8eyam0mvjmjmf93pb58v0ybj9l70yqc9u1rn38kp1qwlbdshs0r990yka6ugvcbw13h24ke8b4nswspg6uzcq2ea7y',
                component: '17znekweglag0s32e50kd3gq407ddphyh5ol8khunfm5kjbbx63wu650c8ebu66sr89os0g8268i3mg0nu021cy35hxghanv3zw5psstxqy981rstv37dp07zun3k35aygv69b2do5r1sogmc6mhbosrasb77ls1',
                interfaceName: 'uob5yplm1tm5oihp3y4s2yrd922pxh1bb6ei7erw30mfr9apmmy5lqo3dhptscez4n0t1nwzegm1lgeqdapsx1hj319lknqqp3qrwp2nnvg5zlkf5mt2fid93jlgxztdzx6l5r4zu7z1xkwiz7ww44xk9rbtkk5k',
                interfaceNamespace: 'a51u5ia0z21dj10jdusb27lpwj42mvg4q7ngatlez3wgv4yof0hrrmqklyo5bptdzjckcxgftgr2q7yum5lvoxj7ziz12qgdw95cmrzr16kyl2weistrb6aajofwi1fkvnvz2nlvh4le32y2vuwiea1txnjfbxoz',
                iflowName: 'idgpbf8mnatba6qesa9i3rji5mqegvjka007ei8aovu6thu99yu1gu76lk1i8hyn7ssweauowc6et5qnrrkmccmfzf29qtyt5mleh2vhfxw9dvrw7p9g0hi5018dcnlekn7aew4ua25cso5c5vgyc3xnwu4catbk',
                responsibleUserAccount: 'rf37kxlama5shxde7rhd',
                lastChangeUserAccount: 'n7d7ob3ny17z7jwlernq',
                lastChangedAt: '2020-07-06 10:20:38',
                folderPath: 'dutemaild3kjucatiw7m45f4hp2ji0f7w2o3a7nj21fz3jffpfvy36jn0aupyyx4rgt1j6gftka3w06oqc4993qcjjmkxd263fk6k22b6bri45wa814zx0m5gwkjo47wxcfjhepm9b91s31pc8xm7osai6d6xgqi7ob2sazfnmmp4pf8iggwdu8i6pl2hvt4qn9s7gb5di906p7h4yxl0blw6qzodyehmwej7xbxh38jon5xzq9uhtvm9990291',
                description: '2a3i8z6fzmgaegbjfvlahszaw0q3fi99p21pn5isdjgwehywbo2wur481h0vqqik7aeyhfjox9lywqcfe5i9oyie4vuheas47u1e5syn6nzklrzb3x4b67ea9n5p3jhnbqnvs9x4n4lt5ujt1x45qtub96v779puc4c2xadfl9igeukzz9bh37wddf1cgix3d5vc1g1sw6jx4y47unxmlc7dg4cvf5zzboir94hhncdygmp7vh1m0llq8dxo8o1h',
                application: '3cv0dk7mclt0yu59h0ec4f4qrqfsdnvvn8gi5zg0w8rsqka9t7c7vjfsdrow',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'q0qg3kztzuza4aslhnaa',
                scenario: 'q8cwa49hr2it7gxzsoqmt4bxhligpqd03qatw5bpkuv9ghx77bc833g4s4ne',
                party: '07sq5wr0byga0rty01sqb9emxxr8v0r7gn0gmp2h4p1tpgre1p84jiecvgp7m4fq4epfmnviqras3fnjqc56ajsknu4avw9fbjacsrg854svbsk2v9zdyj3zj6f7zr8ldk2j8zx7brvcjf8c9ugl4l23deopozl6',
                component: 'wkch7eglyhhyk50ffdjvlailgcde2vjgw1gykivt99fw1ivbjzxeg53malu2ldpjbzdbgghh3cm09gakd4wc1stbv912ncrmd6kw4oc1zu9ogqinujjedfvhr58ilchu0ameiazhpzmnye7vj015kdkoyxs0y191',
                interfaceName: 'g1q5cx3eoxhczg4yeyyjgr33dx5zflk8i8sl72f0trys34r1pup8uirezta9ruzdd0bj9ueztnrhc3pycm8q6sijcuxz4r27hnau1z9uoubsbvwv0859oxg24m725u6d1f0ek8fqx80iktxtp9z1u4lcbx0cjg9p',
                interfaceNamespace: 'wml63mn15pgmwg75ieyh6kubtdxcunrz9iq2rh9k7lr5k6kzvoznzlvowx8ldtfi7p20riz6sidz1ergol4u86q92wev2ztje22c4xn3qiv59w134smf152sfprgaqh40a13c4po7wrp78zmtq9hn9w2jo6dcvdk',
                iflowName: 'jtp2xut0a6c5eufukoiyt3ugx63jt9rbxuph719gdsvgo147pqu3m52znnzyi089jfsugubmykx2pwr3jwnvqp2o8el5jw5eajtmii58mwva3qryqtfh0du8sfdt00crrhfzfztbmqzttfo4ox77368br0vreq3j',
                responsibleUserAccount: 'yxnsyt05zxneghmthwgu',
                lastChangeUserAccount: 'pp1p1bjz779ohu49dvbs',
                lastChangedAt: '2020-07-07 09:29:13',
                folderPath: 'ekw4dzle3tlgaur3houbxv1gqgwla3sxw3emqpigyd1t8o0og2bm3o2629q4g41joft5stipt18ywobc6hir6f62yspocfzx4by5yiariyxes36cuynkxj7qw269agy7y6p0gkc152gdsrzn3ulg5b9o1ms4rxe2yev6cf4rvcnhg9ktpslfip9nf9n3fh89ib87oe55shk0yocurdzbvr3tzmgldjwvhptwh4tyr4alyc965m1sui1q58sopob',
                description: 'seazcikkilo9ff6kx0byk87u4uk23e1d4d76zdzvbjy4gqhtbmuwbhrrd50mvgwkj8rffy78vqz99i392dgbzf8is2dvn016m6mfn04acymguyw733as5vv9pkbgt3p0tzocya4fuwgujiccz9dwj4cogajc1y8u3mvamkvowvnld8sid4bi13qsn6phsur2dhm25eckwua26on5n9uaeda2voqck8l6b3alc3nwobcq8k4t39qchnns2lzhrf6',
                application: 'c0iy9xrkw52025mifrkxxg948be311akjigi3r46h3hgotjkxlt0frbsmio65',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'zqwwmx2jol5vf0jnpe1l',
                scenario: '26nlmc0e5z73gs9q1e21uzeym75le87cg0ddlgjli3wc3r0cb2z8mrp425kp',
                party: '47pn5cdkoz6h2xhrzhv6juu6tngb66hqghau87ai7bvzz80nfswho60sr2qqr5t6qthanfnfc50bva0ttxa8g8eq3vo1y8847futbp4jx2c321a1qr8j2teqgd2xrkqqtungh49atfk9wbzn3gau1sb2z22tl8tc',
                component: 'rp8trgejiwh1tlgph1527kdj6i5dgm589x0aioandb489swv07jrsgco8d8899svl910fb2b990jnrd1el2f47olqt7722el1dltdf3gq19qv0xmp9ueaaa2iftya6qtfowvb55m6wm23lu9hem7b5lp139f2c7e',
                interfaceName: 'sgs3ql9cgihoa0pepm2r4mdm74xe4v1q9lmqc29htb8z57ehytj8la6joagm04t6otgytwe8gxydrez7tcwrlm110wy2773953zohufjvt8sir9fqz5haedjidac161dsuu56dplv41czkxqfrcw8x9cl1iab163',
                interfaceNamespace: '41sihyqrrfcm930pi33asl389udvqtxncn3y3t1te8ueec3gj2d8jffcutzh03pgdkdndez66e9gops4o9nbfjy5t6juuk65cds5blpf9mwhle5g5i3yd6rhquw6upv4lassxq9n5pnpmezuwfuzzbh9grzz9g8k',
                iflowName: '7jnnptv7i43ojniu5jt2xoox8qg23f777w6eisb3uedo4y2f1lf0712pi54lfdz1hoficni1mwt2fqk9oksrm3g5l1yq9fi38zrr57pv4ccmdsyd5qhl0lbfnt5em3ml5h5ji9ckm5a22ayuanphvnz5jsc3adbl',
                responsibleUserAccount: 'rtjvlxaq0yccy5afbe0m',
                lastChangeUserAccount: '1iyt3kt7jmuep1fjm2fd',
                lastChangedAt: '2020-07-06 19:20:57',
                folderPath: 'gzor2zw0eqftgcou2w15l0klzytqeoah63hbb4bbzq252ns0vqci6yn1mf7satpyst82wdih6t3olo0fnj62piqtwfwet2ugms95zntut5pzn43r3e0hj6hq4pszigmyztd1a6i4gdj85bpxph0pcn7n6i9pvz8e44oqx84rf3ysni5mggd0ypkgm88tj63fxiogzzf0t49ryntra2qodjq2suo5sx2yrewoz43vo9ji71ylxhnnjjvypu4wbww',
                description: 'sfsfwxqwlkpiynicstuqx9tukvtb1u0fasec17y0cvhx29427p3cvnom2dd6d3weqtszbnbsg68vmhs94x32xcglibflv14yq8lax394qhu3lkhoozn5d73qgoqgmtv2krru394bcpr7dfp66g1jt6a7uevk0iwcc5ecemmpze7ih336sbaes9wl0y8wxr8iak3oxpsj202sa7gk7tojm848z9lsgd9748l0k3k0kzbklz0tq14h3v6uxhajd0b',
                application: 'nx9unwqh5wysii3b88oz78u4rm2plyzamhc5vp5xiodv9bp8v8a8ryhlcsd9',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'uql5d5kz48wjjxwp33ne',
                scenario: 'os6slw8ynp2dffdmesm72vepg8534yu6iwlzcv749pdguz48o4tc0c2pbdjl',
                party: 'w2njo2l1e3yomxacns9nruidd52s3vqunsu6qj3cpwu4baab9cgxdm072mw8qnfbcifxz7e7wqaeovtqm5a8f7y0umupwwnu4ytz4jd8ekl0ccvc5eyg2c7kkympi9t6fzriwhcepdmehjg0yeg830o0rxz1c4oz',
                component: 'b6rkr15kfkuicbxiwa8iq529uvr0nunna0a1xgrofrccvi43xfigt646f4g8mehb8ugavkxmfsz7vz57hvig1vcd9dyvdapqehactsdtsi7tx3jahru6vokk4mj1u55bnwgdknb95q9kb8t9bhvcvled90di70oj',
                interfaceName: 'i1k4mq7vtz5ydw14rtntg1cef638nub4yu9f6n2jxqkba2biz0kf5n9o009qz7amabh1vu6bcellbbdjr2a0clcce6ug8tmjxu1tw6mapcgdrq3dmloj79kp1dpwcds4p9ea6ui0fytum7vykbfotfmlfldib5i8',
                interfaceNamespace: 'xa4m4vwvp7ad8ft1fvkpvgqpmaa1m52krhigfc95jjno3pwtxwl390ruev9fd7n8p1xpcybxfjz4njhenwts5uuu60smh8bxp9q5zoqgoo42loleumzh3p0xldiakst7ba05q9a4knvi2w741kzw7jc0q6tx18pb',
                iflowName: '66c51ys21ey7txyil28yliyqqcotojrbzkw4ufjxnle2tzv8ot2p79uvegltctytuyf6x1nhtwofooqv272l4wm72nhnf48hl4w2nud98dq50fwdg5mx8ipy5zd9usgtmqfvsrxyqz29csv3p7xex06pflrx8r2l',
                responsibleUserAccount: '5ehor5o91831pw6d5qvl',
                lastChangeUserAccount: 'sv8e50y1f87n3dq0fs49',
                lastChangedAt: '2020-07-06 19:50:09',
                folderPath: 'jv7t45idomrbc4pvbcz5t8k04ouvzdk5n27dv7e0ihqucaskxedyu7q39l8juunhybcl8ysn6e0di3896014wxaqplcmrt4okakoj6vjcwi5d1a9mx2wwmahrujdinumydykhgjjzwo8sadx76lkd575326tqecbcv4eyd506goz110x0ep2icxw2ny4mcpamth5oxxsux4zb1jfhrj7ag6nyaxx1j9gqlviuiakkl52z5wd16hzhhradw865wv',
                description: 'x1dqen8a4vy60xkzmyq9entmjliaeyzijv17bq6moxo7vq1mby5xps0obxampo51y9l4w03tksxfljokjbqt26fe1qahqeklo1yh9qkar6o0cbp4l06gx27q7ztnjjzlobkznoyavp5tylsp8vdfb3d7ni23m1lezvnx7rdz4csysan8crbtgu6s4hyoeuezpzwsos2v1bnhnh1x3td7xzqtupt4p4i6sagb53fewfh7jn90thwu6gzupq6cxam',
                application: 'o2lihw73j87sk0mhpd72khhvcol3zkxs1efumctjwo14j93hvs76qlbup3g4',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'c7ssup3sagjfl008oln7',
                scenario: '06etzjhigsrw9ncl29c8b1rt0kz8cagsibjcu9y4ew20y82xfw2u4b28kcm8',
                party: 'z614qbr8q6kovki63ndrkc76supi4v9gnm3coyervnbdnrcur732ihkkpr2yl1ioe8cystmrmhenm2u9gha14zmxfskgqfjv2dpl78pu203f1eowxlptije4xbwr4emmxyafcpmgxv80athfkoopixucgxuqe4sm',
                component: '6wmzamos2q3bv2jtxao9ljqk07pwq9j0f9d1yu54vz2g133ovxr8me1rkgbdnp773popk7mf7z96xp0tqc34z4h52p4m1jre9krypwme3l33t0uqxdyinnx48yv1yrdi5fwkglshkexzzj6pvmqvsea6i4dq8uuo',
                interfaceName: '5ikv017ber8pknxeqvhhew6tw7tmuw0pabkb0lhn5cx5c7vji6sc4xwz5eodwa0qyb6ki4vps1ehszw72kfpm2xfinx9vb8yh72ogrb0cte4gcbxdwnxbl3j8qvwdwzyrezkr8zgrj8j1xo5o77e9nqumxhw4qpd',
                interfaceNamespace: 'ee2x7pvst4g7ydbx8nzfajr7s6ud7er9z7kk0db2rgnksi5w07ykoos5od7un5aapbn7mcs8bkgg5r5bty2rum03nylmsr5m6vdhq2vkhkayihghsj8zc4ex1qtproon4fattk1pthm3jh76wwqvti2jord0n6dx',
                iflowName: '9gyzatqpzxdqj7avx0emjy81gagy7j818i9h2sklbh4ewhq42n99n2hcyhxs8dsl4ne4uq50ghmzbgf6wjrso8ks0y4kibotaxea317ho8abalkm4d116hht7nnkspupvhw9v7uz19ki1d9cq9mtvhzbosk452fd',
                responsibleUserAccount: 'plk3sp1r25r49vem4wnf',
                lastChangeUserAccount: 'lm65y3mixvdoddplboed',
                lastChangedAt: 'XXXXXXXX',
                folderPath: '0ns0g5m1ms3wpeoipr5hkcanou6xloqoctl13ci2jb3qqfysrmy9xjewoflpr574lj00stgco3chff9swla04jtldda0nw6bqvkjnxdmv35m5sqviqspp6w8pfcqg41oveg9a0nfek4jrvbr8acadks8g59npj0o59jwyzrh6y30v1u3qa2ma04j8ajztldc37u4lxa19gp9wxfvb9o200xnhc38ibi3w6q6r393tncpcyhronm2m1i4oe663r5',
                description: 'p9lsyag2rv2x8eta3ptevg0bih6xfx3u7mkdcudz0pve3bng985iow985e5wlfsto1wci4de82za1amcpzglq67lzs3lup6emvblwkviptnzw2sbwt6tmcd2unxsrrdb7pyp8pnyjggzn4amzi2lgqxdpegixhqdbxqs36m4ix4w8rkvjj2q5qeg4jwk3mpwzegmbrlynlowgjikfrnr842nd2uefxvc7kedekav2whr6g1gmdnupn0eargact0',
                application: 'xgego0nkkgdekgouojdzgrxbnglyddudcf47irikq271fp1hqmjkvw98lw6z',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: 'z256ltp5xutilxbwjzkb',
                scenario: 'v6q9137usszyc82n56ls8qkynttpke620v7dsjo1gjpp5xqq21w1zhbdlu0t',
                party: '6xbmpb2ofqs5f0p8lp6yy7tz1q7y6wcknomjb9vxrwgvcg1ynlloodx06xomuru1pp7b0xjqxhkamodkd2d4gifzq2ms4g27l1b82ej7lchtafut4p7sg74bt1u005t08t4egxqf3fj4034sp90ed96tu2uw8bqm',
                component: '7105993fqu8nev9awz5pkke1vjpbys2rm4qtw6qp3wrhz6rsynqglaf9mtzawp8071ymcf69opsfr0row4rwo6un23fozw6vxofgjsxdx0892ez86teptl208lhk3mdobc8xpcphzxpi7x7nh30tkflzt5lbzpzr',
                interfaceName: 'byiptb39q27qao7bn7uiapcm8po69nm5hypu7gdqxl9icoarrvgadutumsxjkbwt5klhd7lvrsaxwgoiyyqggkh8nv1nn5nequpsyr7wn9tgqem1g46n9jf7gu9ijgqka9xf5dkmxd5zedwdwobapnnswiisnoor',
                interfaceNamespace: 'k3s60pha8gor7kktr86wkum8g4b6qibxvw1ohfgbo0ea953ce6zqfx5d9mdk4a615z0vt4atizzgerqk4i0r563u3cb3d3npiq9iu8smx5ixdsl7p8e12kqhumsbwm5ilyypqkhg3mw9e3zvh6z363jimc3vsp26',
                iflowName: 'u9tvkofygxo009bgd5uqcpaxelvd9qw58q2jd2enevy2llwx4uqreqqm67bhelmi16lspt7w193a0tjbldguxp7sy4agzh8cgex5jq25n3npjz4k1prvb9654cf4ps2s0x1j0bokkqbngo7tojuboj1ky4ga1izn',
                responsibleUserAccount: 'vbqq10d29paa2jeuaqoo',
                lastChangeUserAccount: 'znlda322bd4k7gapz126',
                lastChangedAt: '2020-07-06 14:00:33',
                folderPath: '4lexsuk6eqe3denge0x0u43zy5j2a52vcpalamx5otcuu0p4oqoa2twfbwaltw1hbdl3wy0ynxl0yo63yidw58nvekymeb7fy9wglqmtdlxl0zcne3sqmvukcmidh3du8vxxi15kvry0xi2mc1zb4jjb6uevmnlqxhl5sulzqednn85qujghzy111p31j82y2p2pm26vnzi0khdydzczet2bd822vfbtb0zq0jufb9kb2wns9frc44pfcke1lca',
                description: 'iva8l7b4dfcgikzbmyh6qkbj1fvrpdr7cfwqgdentbarifo02vbgnqrz91rktyukn6j0d9vij9xmnosgysd0p4xeju7yttvy35p7r0i7jzt6yoxo9ndihuf29iu2qqvoigmnpfooeeabsy4tsjakd92h5mldc4btfm4nxku2n3y53m1ed1oyugp2sp28fzq2kclcc540458huac4c27uo1hidhi67a33apy1nas60im74zdbejhbrvu4hf2pv2w',
                application: '558r0wrh1zmpswn9qbg9mf6gjqnfnllxv6gyh8ah3oanp5het247pp9q2s3w',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/flow`, () => 
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
                        value   : 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2'));
    });

    it(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/a07a3ece-d864-48f7-aea1-f8a72ea8b1a2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2'));
    });

    it(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fdb0fdda-ec19-41d0-89eb-eccc46db9aea',
                tenantId: '164f8313-6136-4308-af4c-03084558f8eb',
                systemId: '1d7bd7bc-9ba2-4ebf-8c59-a0344bcd2ed0',
                systemName: 'tnypqdr7fqt75jmvs1rq',
                scenario: 'dnpgvy9if9cvrbepbeyfu53ildy5qgdrzsanw0myxq199he9rucvgh8vs72p',
                party: 'rw5544rwmj3fpen4uqt27xsj361zuww46yd0dpj5gvjz9inhy3vljzhd481wnk4fcur5hd7vemyxgo1slufjpsbra4racf5u3oiq054953na1jwtptsby1n9tyh1nfxumxcw24yw14jqvstcnj037whf5qgyqjn8',
                component: 'udoymlxbu99n8f4kfahujl4g1wxmzkwjjcndvf8w0ntv5tdkyb6jfcaggc5uikmfzwzsamu3mgp3tjsm2w6xesar27qri86v1ugwc9ubvjtl19ft9qazjkwb4ot4tl64rxm6laqjoop8fxk9y6v07259a0ql4y2i',
                interfaceName: 'cc61z06exyiw1petu3bfxw6trzlprriahxnk8yg0lmidurm3u5e0eucgbr5yad1yrcm1fdkxtw7o01mrthylasb0frdn4fcxb14xr76peksu2n8tb465wwf76eevn5f8k2m3y2g8rhzmnp09d80llmpkiakmp0z9',
                interfaceNamespace: 'ousyb1oemvmmf5kcyj4o45apigijsf1jvlmj7x089hz3cpfftgyoohc9ov07iiu4gwej37gu1z1vusqee8a6rkl8mqtvyip357xfttnbq0sh32xh09nv8mps2ih90yqknnlltp6i7tet0h7yu4915ezoa4dbfv3p',
                iflowName: 'p5jnznei5z707ckk8k9286g2nl3iwytvxtu9g9av7io8fv6m5pzn4l2inbgbi3nyaf3uifai0amap288zev22ienilrnsdp5qutelf5imqdob07wrpn4nkiwru9avn12wavyt7dlbch229tiep26gzqblt7ndk6g',
                responsibleUserAccount: 'vms6ep5jvjtfp60vmso3',
                lastChangeUserAccount: 'qju7kfogicwmpucsri5h',
                lastChangedAt: '2020-07-06 21:34:12',
                folderPath: 'sfk02839lso7it39mozjpt2axabek5rwmlubaj6amt0f4xz3eb3mug9l9rmlzgusuul8olqaaghse7zm9wquk8wcnxn817ce53xbwo8i1060fbhcb6ogxt8znxa5aijudo1m7tz3q6bpezx2ei4dcbe6klbhjk0qm6424iyzgpm8kjhxejvn86128w5zfhj8k88urkb60ve8hx51mx81hv62i1dznjjtos4vu2k9u6e4rc0ou1afdrwmdjofxyx',
                description: 'p2ksq337rfxp72uh80saovm0zpad4ohl94eutle7kmhie56trrug61phos97ri6t9xyzhzespb4n0to8p99ugqmpnmhrlk99kh5ylt1npque4865onsglif5b8dbz3pjqupavavl37kkk0xkyu25ddeti06ghyzrlqs4wzclhzwexirns9gbstvqhgkgbv2rs6ckmu677p1f0nw8veav876oqw8mi53sy846brytxpvfe82tuvna1xgmjr8vnp0',
                application: 'yyhmmjmoqxdyg6giokm3teosq756rloqv88zwdz85tfi1jywak231bs55gir',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '1843f2d2-ea05-42aa-b04b-dc2eea61c8b5',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                systemName: '49ka7wiwfr4xuu6wf9d6',
                scenario: 'h7c47esy8e8ikyzlccyj7pgshwr4w4tadqe4zfz8q3x2q7ydenyqru8auelb',
                party: 'tmf358nkh4oxqvoh5gfcbkasf09rsdlpgtlpfu5pbjfgrqiv0y3302g9pxya5csee8hyrvktvnkti3i268x43hfj8hls3e462s5h6cxqbdzx5zt61mwj0fpi3xnndtdiwx7sfirewmmmg24xe6k7rdogppisb2du',
                component: 'dqz0m7fce6d94wdnvjkkkbvkg4c5n62ivgxjy7cv91x9cjom1zwu72cyatwam5ab28v4o9rxjo1pwpm2dm3sgehid1wgevqeykm6hdscl8gbrw4qle65gbdukx9sovydjb8bobiyv7oa8ov1xezfe6nv2uv0man7',
                interfaceName: 'yzky6uuzrwt6wntq9ud4lm77otxbz83leijtvlue7t7i3nv32kmvz8wi8ai0md4qfq8x2o64dz2bi05x68fytv7gxeupgsxpjgalo3h2romy3ml333t7uyboqj1wxer2ha8p5swrk5950i0i0nx2gxdlm6ufv2gn',
                interfaceNamespace: 'u16q862g4g3jld4b4ghiui08i4lskr611gielm90xd5cwa5w3gsyqs3wiy8vef8x2gq7set5yyjtwubk4qr2s8sahtqtr49bnd3qm64lmnen1r2xybcpdvcw8cju5g2j9dm1pob99wawos8wof56jo4itoebpigv',
                iflowName: 'wm54ocmfilkftmpxq5w3i1lzc6mz9julm22mfiyp1dy2b71sxwsawsz1sldyc2j6gnvet2indvg4hf6o0fenp3wx7aros5guakkaoxf3an7dr6qj93ehmwhzkb1fsyw2b7wzbxyfy93gy45r81y48shw7bwd3yvw',
                responsibleUserAccount: 'tyc54ip30tc3bv160g4z',
                lastChangeUserAccount: 'ozkuxjmvlrstoshpcjtb',
                lastChangedAt: '2020-07-06 21:40:52',
                folderPath: '883x2i9lnknf1r8iyswrxp8oo4w57i8uiskr0e1u36rr903j6nopa11e3lho0c562ss4yt0e8qamnrob1mlyslud5lhunk0td9hhgdlkfr1r5yjwifo8nh7gug3xma4jjlz2j1skalnbvy8xh6kr3io1n6iqya3rcqgpbezjjjvixqf7su920k06boynwl28rkyzrond1aurntfi7fx5sy2n14hucxnppwwnwzmbz39r315wp3346jdqlqdpycy',
                description: 'se1d5f24l7mxy8z25bmc3serr6edbx1o6exdn2k2ysusrf1zsn8v1494nnglxn8h2dg1bx4g3w6jatrq6w8fn12f1hqonheb2lo6l296l8ewllch21dzgpy2chdsmhg8tsnk73ttd6ancyiuhr9goonhs078nrl1bkhrdckdy0tyanl8n3vmidhaetsipxkmej6uwkouem3yq7hmcgxxj1izyzdaagh4of9t7xytjlxjperyyfuxy514xmd0buv',
                application: '9qriq9fbyn6jhdgxyqdd62p0wqh0vhpbmxsy9c3ed356eyunqfbyd59frabs',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2'));
    });

    it(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/a07a3ece-d864-48f7-aea1-f8a72ea8b1a2')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
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
                            tenantId
                            systemId
                            systemName
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

    it(`/GraphQL bplusItSappiCreateFlow`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                        id: '0453ff68-78a4-4ea4-b414-a375d468ec7d',
                        tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                        systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                        systemName: '774fqnlxs7c3l1kv22vl',
                        scenario: 'qv7oofhc8bm1clh46m0h4v6z870w4cv0fpwmv7891aw1m8dv89ppjc6d64nj',
                        party: 'ul28gda4ombwi0rwl1w7ns09v1fts78bae25cdt378p5e77x0vsqbo8hbb018apnwn2x216dd05lfxkc299q18mhg7m1v5pbfuxhz0uhk35b7fces0vkvd2iylgf19ztjnpq0rnabvgb7swa315n6uk68zy2eubz',
                        component: '2goedwarjeo6hs4ug7y1viu1xpgmag4993o83xc54fh7fc5d99krq7ru5wrrmhv13v6fpr65ie3d6ioiokbzjvmq97fqh24bqdezjnlsdp4j3klym034r5eneswtlj0jhrjem9txt0mr4fzl67r8jgohc8oajnee',
                        interfaceName: '2von8xg4wtdso1xbesa7dyej5d1e1pv8ppwosf883l6xk69r53pa6fwgy4im9m29pxzlfungpjo1g0x93fozukd9szcf7jugge4rbee326owrb036o0hjd54si909bu71v79xzf9hsxja3xvcb1zv1cna889dwsd',
                        interfaceNamespace: 'zg6tfkb43wsp1i5611nwuz02wz9hq8360dflau4fnxjz5i9mi08dy6qp45op1qfrucxj2h21fc126rjtty6bo3pghs8y46p3w1tq4fm4wg7ftqxpuoorqnbq8d6m8y3innyhuuusz34pnutx4r39shyv7s5hs9gq',
                        iflowName: '2ur4j3p2lvq3iu3g9jgp4qm68zmbmstgswsrad6e5zqv5x5diiql1zjci9nc6ieqzfeufvhntas277vrikxjom1nunzqk2v1tvn1osb89scw22gnrghppu296qgpj0yfxrem8smwaww3z7kt2ohqe298bw8iyzg3',
                        responsibleUserAccount: '4as7e15olwpwkbfcubip',
                        lastChangeUserAccount: '1sk079ybjajedeni0xht',
                        lastChangedAt: '2020-07-06 22:06:46',
                        folderPath: 'fuv2bp914vl4nqovf1dm6rtf2qfvjorbgma4jjgl7cpk1wlo24itg0m4a0j1884kt846fimypm2pchyb5xu2113sqf3g3hdid47c440e0pwtl2e869q8l7hxc6q0on25zo5jg342vpa74fqsov4diobew4ko76o9eu6saxqljce5zv9oymxd113j4nlmifiil2m8a43ynjo2h0uq2xc2phxw392pjcszqfdfz97bkkjhm0cvu4x8qlmj1496zsy',
                        description: 'zi7mzrjdp84oyaj4pz20o6rhzypfba8zy9ek5qbmeopy1qfo0dw7m7p8fe85tby2zyxejxfsqrovp0vztfvwza3jx7vgs3clflmwpb5oj6licxfptqz78g0i86gxrykl5y1kknw6i5y0tqq843rgi0ye21fphhejyzsjk76ilpbymm2pk9vx2aarmg881jgl70a3ppu95afwuooerdqb8ofbha0x119is9x4vuvm038n3yqamnerp1uspq4j52g',
                        application: 'llow3fnba8c2zh7lmbsajapwomno6ridij66x3vlstgpttb76ub0285cstbx',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '0453ff68-78a4-4ea4-b414-a375d468ec7d');
            });
    });

    it(`/GraphQL bplusItSappiPaginateFlows`, () => 
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

    it(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
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
                            tenantId
                            systemId
                            systemName
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

    it(`/GraphQL bplusItSappiFindFlow`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                            value   : 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('a07a3ece-d864-48f7-aea1-f8a72ea8b1a2');
            });
    });

    it(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
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
                            tenantId
                            systemId
                            systemName
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

    it(`/GraphQL bplusItSappiFindFlowById`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                    id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('a07a3ece-d864-48f7-aea1-f8a72ea8b1a2');
            });
    });

    it(`/GraphQL bplusItSappiGetFlows`, () => 
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
                            tenantId
                            systemId
                            systemName
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

    it(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                        
                        id: '3e9d85e9-19ce-40cc-9f68-430f32bad75c',
                        tenantId: 'a258d937-c36e-45ab-88ed-82be59d0db6e',
                        systemId: '0210b247-c5b7-484b-ac4b-f09ebd981fe5',
                        systemName: 'hz06qeponmsh6s09uknu',
                        scenario: 'xf9i2p15lftv8hxylw867ufddijm5rld3e7wxogu029wipj4xicpx0v3ea8i',
                        party: '5sekn2aqqp3e6tp2w79xfgknu6u59h252lyfp920xub1yq2jsbzmqaar34sfky4i14o6mvmy38il7vezgkmjiw2q74i08m1e7vhq0p041vclz7ip5x8z696tx2qleb21h12mliftknob1c948vrywkw38bb6qlh3',
                        component: '3m11u6fruk5mxq2lwms5fe1q4qqvdl76odfcbtmxv9awbx17iocyria785cyry9ld71n6lgsjtpy2u07ky6zsd1p5i2z3l0h7f7kvoo80kvmt222fa4z7gdmaqy52peyereb2wv8d3skv49jciafbeb7jzckpkes',
                        interfaceName: 'rvbat1avfasg0ajmjt8g2qbrbrubmkni6pm8r79vjnqqqx19wh5wqem9oaqu6y1d1iix7umka0vpj2hbzh2e2whjhykr1ig69zw0ewjsyeaj2xbbhoes75mjk8325cf08t71lwor3n2lrpo2nkcsakx46g836tta',
                        interfaceNamespace: 'opap3md62e2b97yfjzoeo4qrxqpz6ei76dh59w7wow2fsv5b0ut6cq9z3z14f0pht44h3as6lcziockqzymic9g6by5uusbvohwzvywesqzpvpkaw36mnqqj42qzbh6c0qid7cqpeucuw5k2egcocdyzbr38d0pq',
                        iflowName: 'ojt5byidr5muhb71wpl6p45txnlfw60m60olhfn14tcawdfezw2u9cyv8kxrsv89gmpcefk7whgflwn9m741z7chjhszs28pgrvhwli0e1a63u0jxiisoc8r2w30nb95pz41durb5fkky5v5ulvltrgzmg4uk6kh',
                        responsibleUserAccount: 'tu1gl4e7dw20dz5r86wm',
                        lastChangeUserAccount: '30sevr0ngkqwezemeyno',
                        lastChangedAt: '2020-07-06 23:36:57',
                        folderPath: '1nqywsls0n9sme6psci8bs89wu10uziucqaapmx8s0imsdey7vivup30ydlwodtp4jiz1vfnvbrr8p81d15f8x47ce44yziix5b7949reoagdj1vnrhwy3fw1jm6odjgb4cmvifddghs47b0wgfsswk0y60l5n58tqglm8hbcaj46w0gs5971o2528t51dd9i73t4o852gnyavn8wmm8vzoc2wf8ipoxp61yg4ve67gmyvmgfqsl1h17ypq5k8u',
                        description: '0ncwld52j60p4zgjfar7kcqd5fp4ucsr4ziyxmwroycebx11rjzuv78p50fiz7h29mritl6zps0upvxsntbvrf3jd3jaovnw9cqgtog0vwf15nzqvosdy97r105jplphhwi7sauyil98z87mbareztnp04za9swp0v512y3npcepc9y5lzijux1tme21gofgw5apwy4n1vqec6ccz6c7hhca1cwfb3heiviy7d307k33np5xehv5ak3a1897t5r',
                        application: 'unf5uonhn914281r0oxxsnsn2i3ertw0ppohjisu5w0so68gas21q2po9l5b',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '74228428-009d-4410-a591-26bc3c7e4b4e',
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

    it(`/GraphQL bplusItSappiUpdateFlow`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                        
                        id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
                        tenantId: '16aebac5-50d0-4830-a9ce-4ecfab242f14',
                        systemId: '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
                        systemName: 'cvy8csj9hptscrxi9zcs',
                        scenario: '8tedwpv675rr9nsf9tw40s4lkfq8ny31xihl0438d6jk8wf7lamqzt6tu8g3',
                        party: '9g3myjtlhx5nxxw7nvl5wycerd7yimd72joxrs83b6rr9yl9mrm4t0v0kxcz2s1n7euembqienc80mnkxiugw19ljphst8ffoxjwt52uf60xjv7s2911cf67d08uvl0leods7m4lxg5i294o4bys2v9lamlonfz9',
                        component: 'bzdtvrb612rxin7fom2rxj0bsl4d328twat91ja5mt0zal9ktyby5pr9hua26wffy98r7nxeo2aza1ytxvitjt03356grqdi058jreftgp1iwvtt9wd5rcmo47ajwdxa780sv0pubce3rzcvucwmd4yosz8w1cod',
                        interfaceName: 'b75iww85f00q58onjg2ovw7ilp8l0as4o8mcio1m4v0fuaug6vpeg44hbhmna5xnvt2fjq3w6h47ag34znl45cp78g980qn0f6a4o9534qh9z5oe7uptjilimq015d1puhqmh1dymkntrvgtyicemeqozsirhj6c',
                        interfaceNamespace: 'ee4bay93lfcp36y0nn8gg89ei0hyd3z9zbqtk9c400sq708qn554zgjqaeigau8pqerosw239bzyx8r4s18vsfmd2bsld6rmrf5wupkz6ua8ji0lxqtlw71eahjvr09c42ae09y0i0lqa6ugwtvs75627d39zr24',
                        iflowName: '3smnjeu15qwa06n6k80x0m1mzoya5jweb7wgjnrso19ozh2x1bujoar7kch4uu58jx6dfe6dtg3r1oktxvfkggk42m4ta4qaao4wdlhumf9riq2pigcswq1wmooqnemk5qvt0enbqm67vc6bq3yqmetwexjao8qe',
                        responsibleUserAccount: 'cfokdj4axdqmjw8ef6fc',
                        lastChangeUserAccount: 't60jq3q8rjfl7v8aqo32',
                        lastChangedAt: '2020-07-07 04:53:16',
                        folderPath: 'qvt9m3fkgrc0298hp1hluuqo8dtcaqxgo5yqxh4hmagav14oy7uwdb97f680ahhjuucu9502frzb2vdr5niy9vpwjd0toxfil3oqimril7hifk599qa90aq37kosdbikvqevj5bf7h6o3dk2fvupwwkqh8sivf21s8xnz9rnrtfior16ad8i0izf2qinpq0bpd5od3glxgt7vry65zk4m6n3g8jqzva03gaf966vma5aipaftzff2jg0d1iakrb',
                        description: 'pqitg56yu1iwmq1b7nhgvcnfjb9apgxx2l09ebe5kbhne2o9rzoqwnoeqm74vee006upwrw7l7kig4oy7f9mva68ouwoi0lfsf03icg5c5a4ga1r05grnx77a65yad51mvcjn5wj6e45ffmhxdcz506q0cxgmyi6u8mszbe77bml8r22juk3axq82sl0z1ve86gmrj8zwvam59rmvulery33rsndcpyhyf1las8hzza6lyp5n5b1d0nwfs8vu73',
                        application: 'v95sersbudni8imqprt8zheg16480ted898250tvfn1iptpbqfk1z62gvb00',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('a07a3ece-d864-48f7-aea1-f8a72ea8b1a2');
            });
    });

    it(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
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
                            tenantId
                            systemId
                            systemName
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

    it(`/GraphQL bplusItSappiDeleteFlowById`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                    id: 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('a07a3ece-d864-48f7-aea1-f8a72ea8b1a2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});