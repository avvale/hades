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
                hash: 'valg1qg5o43a7sijxt89gg1wwshh51lmnutsgqfk',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'f7xk6puag56vg2a840qi0nm90r9d4n41qwjhgwgml82a15axpj',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '8dww3c9egqhc1f3d48g2',
                version: '0j4jjhum3qx5yrx8me7p',
                scenario: 'eud9btqy16nbi9yx061s22tz89aybw9f4emis51rzhxtvxu6rvulfalp181t',
                party: 'ed8gskxpm16jitjf9vhyo23pn0fed7zq83qs72ztvluipkewvck0ev36newe7n3vln7mgcepuwybfxvu9z504kimklrtvupsbru7kcd1vsv8px75jbdriyrk42d92cgwf3yoaora4udqmhpnebcf7xvuggclai2y',
                component: 'd0pxnu6vpgvzrakduxcvqiny97lxltccsj7ujnavrwbq3rk25rqyut4qj2zxs4evnhoqnjgiag7lv3pjqpt975rgzmhiucy9c8k9ut9i10vjep40t52no0dw5as5tj9nvbbw1kccu1ccw5op7icnuy1xp2hnfgfw',
                interfaceName: 'uzjrpuecgpa92rnfq09bgdpmzz8v93kck1j8mxe85nfjrob5odarr25em8wk7as0uoih1iskil91lpdwl0yvjombvy4cq1kxu5bexmpl5wu5ecwgdvw20uh78kcjrzmyhycgbs9lmy1oafxxkmo1hb8paxj9xinu',
                interfaceNamespace: 'udjgzr2j5inl2kj6ca32wwwt09o8u4rml2o3sj75fp6zznlrirkr1p0xzo6492hdu37v1a0xp2xjn1cf0db538w6q5v0rkzmd768uq298zibbxrt0yfvswsj61ehwtfqyzhxbjj881v6uzsbowkixjicf48udpkt',
                iflowName: 'jcta2oph4z9a38ynek2slf1glaicqfc82pkldfhb1gzhcmx02c2u2saoel7gt2boayxt7ie2a1w1aw1y3f7v6qh934zohb57jc54y5johtos3iqpzvlw57stdgzt2bsfylcf9q5x3tqzirmh2vbbxnt7rsh5wuiq',
                responsibleUserAccount: '4zlgulhnn4pzyca8p3pp',
                lastChangeUserAccount: 'j13r1ogv8plnlhgjyvlm',
                lastChangedAt: '2020-07-29 08:52:06',
                folderPath: 'rxtg244gpi0ktw2ngxruwtbbulnv1abx4o9z6re8nsfgywa3fivyb3h5paar0f8h9bb6huys48sifbba8i9wz49u18ffdw2tuqv7caj2yrgf75q5d2opeb4wj2s6p1yr6eybp015bfccq6z2di4b6cq32g56grmouql1hyjlputpxdht806vx3btxz8yg0zs04tvgw5vijw2o97mua1qd91me4hwzn49iv1tpbe9asp4q3nd2fyqobm0whja4od',
                description: 'gztn21by8vp0d1u4luarlhf33k2m0uuxfo50k2wog84q2j46ivaxgdefewe6dq4nprqo2drbtdbcr7q4k3u3pedaeyoksl2fxoe8v1ivh0y0p51kr1se52uheoojh3k2y5gwn22gnwp3megh4y7eqlf0v7wq2tpbqyg3lehiocdrp5svzcig6l384xzmv20p5rkyh79ck1oqs25ptz6uq5oy6j84ik6l9mqzvmk7wiecful1sgwzkrhw5glhfoa',
                application: 'rhsbqlv9tr4sl2ezu7yhsuugjo5ed4jvvajdy7v8p25j8ul0ph50bt8yvq1n',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                
                hash: 'vq2w9qidvsypkhaf03xy9uj6nf7g5vgzws9hhgln',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'u3rcyg0vc5nfmjueiz1otw09h7okewd3hzywlybq2x9vb8exbv',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'zyttkxytt5zcx84nar12',
                version: 'owcup86hh2cjbrbogfkw',
                scenario: 'zm9hj4vd6vm6atbz1kb83uy3hplyin8thfubp2wr0h5i9isgk617k2yk89qi',
                party: 'jljqtbawgsu25zjynmcgl26glkofnjnf1j5fl9fzni61uwvv81onh287ns0brd2e0us3qjlo2u6533nnygcxuvnue8djohxq6micnz9imkbv6cw2nnjnx5bkwpibbxx09w2id1czdb8zuuw3g5p1duo095oot5ff',
                component: 'ls4opezlfu6xz9jcqcfjwk520kpdl4pnedjptggm1r612sctgse05ulbar9ayfxbw6ltal09k4ejdv7ohaq4zgwle111rz8mt2olc8pb3ayj719t1ug63hy4ekf1fe9cz5umcy36zt1kow3nghixo7to63vhy52n',
                interfaceName: 'hikqr0b4q274lnv8gpgzgc4ot30tydo3jhuro0psv5lxtmvr05oct9f9d2rb9j2x7hrwpswun9j1hdkzh1656u7urzv9omsyyk2lk40c46h38vo7mzbc01f9l82bh8ij9h124oc2fxbychfhbxtasbrci9ie2wbz',
                interfaceNamespace: '4gp87autuzhq00ur7xbhyu6vhmsl7qkvqyi83cfs5jphmt9v2lu55kl2yevmzilvgoplmba24cku2vf89nzhtafvmlwpzvrg4345pc2fy077pexqife74sshf086026gohg1lawvxxcdou5fbss7uocaskqf8pu9',
                iflowName: '3s82q6bza1b5ki9ab1y67olwpsl9fw1l6w8s4p3icb1gex32szdeejodp2hk3f3z74boqxkdalfbqx8h76kgv1hhyghn0eby698jmei90roi04o2rd1up8ur6bzg2n3qtuetvh09d22ugpd88j1xsulpoeysmsyn',
                responsibleUserAccount: '8hthotj8wr3urrv4jno8',
                lastChangeUserAccount: 'cu38h48a6orz5pi0bsft',
                lastChangedAt: '2020-07-29 04:27:33',
                folderPath: 'l4in5np57v27p2ctv8wji5s0n8dh0pe5o38wdc4jh94hcq8eyottmqjvsmqxhn0zqx5a3imqejws1y4j1nrdovqaxksf148qjh65fltnjhqos1nplo5mrgv22dfb6nasdkt8n4hzk2lzn288wc0imfrufc7e951ustr60omd0d3xrtxztxmcilz25m1r474cqb0hncg8yfiyz82akdb7ao4khdzsnwtllzpgthwkd6n8l0kfm45amz1gwv4ncw8',
                description: 'hpe5kdnrpkxro2hnp025j4m87gry9l3yiqmroo6o7cjhmj426vljgnmfrwsrroj63uqda23t863va4xu3j86y0a7j8ovfybpl9yw2ww6w4ofpuvctqxqyse256yy1qx5m71vhfkfditx8c1hn93h6cqpe5nfi40zcbj90e688dufm55yi5k08ann7qzlo348caau8lmgzaeyebp68dgw0qdkphlus5ctflq9cxyc4nnwir5ni45f1wmr5wnsqev',
                application: 'dpdozoo15yh3b7i7zadg7rq3z7x8kux4bl1uid3ygst4ysgl000ptvhz1z5d',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: null,
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'cu2qw67rh3obomnrmwgdbrygylqukzmlrsvrmhdblxqnmxub6n',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'yn1xjjz2g4h34pfayxoc',
                version: 'nq3yaesmlc3e0183n51v',
                scenario: '4wxm15610b0rvbtmgx2g4m9pxcffry0xm03y72mufkgs28iihm3f87kfzl1i',
                party: '8qu72q5rjghnxojbosbtzrd6ueonpsils6lhe6cmu8ojajmvakdd5w6t8unlfiq9525p6c85vzrz7vtc4t865zx80xlodzop3rhpxt39hnbq0fypghpybma9pf8j779yj1w898w2yyoictuxap9xlb2b3wl4fopt',
                component: 'larast7vbe8dnalylz1k5prtwamq5t34g7404uydkoorm0ubmcyrvxl54aunoyaskrqrs9s2zqw9szdus9qb4wjlic8ccua4yhnqpeewsdftlw1kua8h3nh32md26fweql8vhh0f4knmdw1nhktjbopcm5cjxm1u',
                interfaceName: 'cpij33igu58r3o9dhtqnki4hwwt996e3t4hobuxqkrovxpe15ybtpm0tb1umsf5ejujve7rak81eq265x0g3lsrfa2mvjxt55pyw3a7qghd88cyaskwogwmogzfumaltbfolyi9w07hjuu3ge0c6bg26qewrrxox',
                interfaceNamespace: 'qpfi7tdcdgeml237a7quj4mxbjwqru2rzl4upv3k6tiyno6pb5fg67hh8adjd9bmodo9ff8j9fl9onkgclrvx6f6q52xl3cyionm6o36euo7qp32qpr0a74cf5gbspi4c0bg42u7fkki4wiwn6nvci9si9sqtxn0',
                iflowName: 'emh3omjrumjezvmmgukegau08t0ow0f6tgaq9wqjn6e6ph91rdxs3gdr9597zm07rds1qcg7tvta2d0roqa8v5omvpm8k4zi5rqjfu6cbu2nvpdxrupxsf4nfauhccxwunc64gtuaibck4imwi1gjh0bk5vvax4l',
                responsibleUserAccount: 'lj31svqt7h2uv2les78y',
                lastChangeUserAccount: '68kh4dxsoisf2djekfuu',
                lastChangedAt: '2020-07-29 12:11:40',
                folderPath: 'l0bz15plhj29djl22l924jscskmmf8ce2np3qmc7ujmjb7mah9z6bsdgdfs21k7kstlmru5qxzt6a3w5210n4pgj1x8ij18g2q49wny6tcuudltj00kz07f0fe2k3c0ocvlvbhqvuly9w0ux868n5rc1vhm9lfi60c47i5uewxjd5o9bbn911su983sf51rlzcv30zj8805y6ixtjf1t4o2bwy349jhbsdgu70ab54rxn7ww0hhbhngfm5e9y8o',
                description: 'jxsm2b9atdllinf12xdx54w0w2k9yypi81ws0j6r82b3uq1my5cofgqr14m188capr9a1v1grmzn4p4jpxbudv8f8nfq3novvbq69x267oekkbilx9huy1khhcr2xedm5c9071qobswmamnvjpfn54jz0gyr0sen28jyxh1k5opxq9fy9cg9zjbar1mb7poyymej4q58rlkfleg59l35touebaa8ibyrtlk1cp69i0ngle1oe7ot3py46nqnflo',
                application: 'coygnfywdevb09r2kuqskves77y7oai9yava1h3we9nvjq86a5fst570grv0',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'rc1y9lyr6vu6kleio3f47sxx7izt5xwhsby9akuo5xsxjnm58j',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'njzo257c7csjcnyqicfi',
                version: 'm1tjvls1dvhribjc9spr',
                scenario: 'gu3b4uf5bkwei9tz9hr4eilk0ssbma43cni77xk62meucr27s7ggdakdmnkq',
                party: 'ymy7ap902zbwlk05wo9qwympcld5lvibk7ib7e5chccx7hazve2fi6ud9ol0m06eupfw5dlrzfzy8k2ii7ixfsaj88kna2g08xr8ehvmy3ylc6wf5zs3vp0ui6c6jajloms4dhhmyu68pxn2hmrq5lil5vd8kv84',
                component: 'koz9feh5qbtih6yja57ua99nazwodumydo09t7m8s3wfq786razkak23tbrg5v3a0a2hcbecbg4u3m5sfgytrq97b1e6gam2zn1e33z1gj10g2xqa55s3mt4ayy6v6m3e8g7foz7l604nb21unoip8gpve5u8x52',
                interfaceName: 'anlsh9p2gt7hzdrpgdibmwz3ststvfcrhwfqouwkv3gf9loss6wjuiaz27m8bz9oo1nwfoh4t3actbmqqczze9x4qswpdpl8olc0mqohjq2csnegn8opalr5qa815pnxv6byn8l10wcmgmcpl2z8e2h16x7ibrkg',
                interfaceNamespace: 'z0otqe4hh54dsy50njezoz2ln3p28ybphxg951qji2m5m9hp43lbnd1w2nt6pxn3nvajsiqcxa9p0oqvxwiy87be5zk04pjv1z3cgzvyf06kg8hi51i3t1iviolhco6sbck1r5mp5fh5f3mle9uvu5vupxlodn88',
                iflowName: 'qxtn6z0o7cvxfadi8hmiwznuzg84znnh0lg0vu58zrjur2rrkxgca0ccp30xcvjnw93z981izfvxryv2zvl8isbcrihu9p63bnzfy282q10xc8c2j80y5cd2e1kcmxwy1aifegk5j98orh9czf5d6knk5mzc87b9',
                responsibleUserAccount: '8od0944u1fjilr6yy1by',
                lastChangeUserAccount: '534m2uqoellju8dvdv16',
                lastChangedAt: '2020-07-28 14:55:49',
                folderPath: 'ab0hypx07bmj4ior3nb7vqnxrt3ipzpt4pkl5oyc0ws15x2xtese5n41wchig0kt32x9jmufiqwzz5iry4o69292ksdl1v6ryn19rs9cj1qsm9ffekyooeay1zubezxsx7wuwkbx8bu14993nyfcafopct3v61qll08q8ioze9vbn4aslxsop5lgcdyd5hypu6f3tktfxne24xtdmj999nw46blv0up7986eqr42jvpdfeppz3wyj3c65soa42x',
                description: 'g1v8hhabe3mhs7q8y48smmz3dq8ipj8li0yk9r2t3bvod7t43rngsbfdxd56z8ryvqomrvs3r6h6fw66ru7j0kl433j5elkhwr4ni325c8at1sr0efjkg5g817dzz4rnoa7ivogu2xyhcxtct65jre13lvwzpyuo2mcpco31lh9jsgzrhu7yce0ddz574gmdoueonhattm3ox2qse5tpzwysn7uhg1ereqs7y55it02a9e3wklggkze6gali5vj',
                application: 'ysd6vbrbwj9lyrf43s48fzvtatq0zxnn20pd2z0v6te5dcmp6bxcno3wfn10',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'cqacjiinvbgie8o45yaggfm10nnhsr4xf9wo2xal',
                tenantId: null,
                tenantCode: 'y751bspc80ld28p8xoqtyt0zu1xvlggjupuwtlg61qyv1cqhw3',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'l7v527zwdgzvqdaonkep',
                version: 'ccmmhz55dlj2jgoqjmwz',
                scenario: 'uazepo6kjdory53d2ofo4iuo8se0i7ei1ex2e8v3qzwpngy5j5q0duoycc03',
                party: 'wjdcyd5yfwhekocbazcvo2fp2e0o4pe3lr70zwda15vdgue3kuww3720psh9kpvn2gsl34ol33ka1rbo9so0dzmg2llj9spjv6mp6xjuh113fhvofurfcjngzobkngw2ubckcrmejl1wc6csnv6qyzwdlheegk4b',
                component: '5li8c1f1y66f39mqa8et3k2llx49e95cgv4xtp22rtzma0wowk1nmph8dmx0lyxaodoocn1jyuwau3d68y9dvhqtkq4eeweith2lbk1ngsen6smefccmuixc1cz958lm8801wrqw9po8mhiuebz8pxhibh11wn8y',
                interfaceName: 'zxitd1p5v7od3os3maqoqt9v0jzswv6ob93n1k5uqcwpo261xdzz6zdjemyx1nqpmyjib47xx5gxhowpqiyf8lu1xmc1z8jxtw4awp0zi153hcgz21w2mdd3jaefkuhcbf3ni8jgwuxoddz20x3ms262zl6ufsdr',
                interfaceNamespace: 'dxjftmguwhgvrvqliy0osbehj6536yz3ko0r3lfr8gyv4tdqgem2ws3hfkdwotmshll21krjac7dvq2cilct9mkn7kjbf65u98x80udi51l28tmzymyc9gblaw7mfot5wsv1yz9hpidoduzej606ten36dd2iv6b',
                iflowName: 's8tdv859br10qcf2d5ur73id08bmwtok4as71vcudzn7nrgi3pz1h7xv9j90m1xev6cp6o8mlj2yhhvm5abrtot8j9yz0q7492a7xc5ce2ef31jsjgne0hsprlh1a26g40md3vtl9etru727ci5lt01fb0kxb3b7',
                responsibleUserAccount: '9tae4b0oiwgmf4t238nh',
                lastChangeUserAccount: '6w58le3guj693jbrsko6',
                lastChangedAt: '2020-07-29 10:11:09',
                folderPath: 'arccobn4c7vjqd54o83i8jtkfp7vxqnkq1i7gxmo6j34c25549syhi6oh33zp4q9rfbx5b82both8setqj0vjmj9242polyo0v5vi8uwa7h6i896rnjnt2nxjox5ng6qmskwvhprn2pnwrm1dnxymjfqre3dn95z39099yesz80oc7wf2lyhgogwaecmir1p4g6te1rnhux2f207thpzxp0zf5eneuabdsiw4231tcd3e7qsipd1vri0epuk4y7',
                description: 'xp4242ba4o49hilzwjq2pbr2l70octkes1y49xf5wsq3hsm69fbxhvo87ycad08w9gzfjclqh2g7nzorecovaann6ow18pyypntmwxwa2s1em1kb8rf6j0uei16dp66tgso7aov422vsvkgbv98pxw1sa35cbr001uylpusmv1j81rfubsdy32h67pksamy3b2l2hdq5p15tqpghc1u3isruft0froqevontbuecnbrvmud122ccjiwfwgqawq6',
                application: '1burmfesfid3cibidw29gvbkt4b9majx9w34v496u71gkwf8zwr9yufo9moi',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'mbvdgy8189ux67jr59pi0k8dbwmonfq0rgsbqdv1',
                
                tenantCode: '6vzhy9319t8ysmuodc3ntwwv40k5nys9bl3k57yiuj6oj18sqk',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '2pfzr1plsvd7480tfq64',
                version: 'fzgrmfii263bunjkihsi',
                scenario: '6scoiemcoz9jf5msjgkp03svgcp7en313b86jkgnl9imxvvair7vvhdrkcxi',
                party: 'pqlhcdm3s4srlsufm4j2j73ub1wbki49ycfik8mksl2wu5xr70dj063e3nh69thp9ibdcuz3u1bwlxs9jfpz6ntbf9symh2q3pttyq4nuey3qcsawnd13ux4v3grioienygknro3j6bhbss8gdf6lz8sw9sod3ee',
                component: 'utmpavi5fareglp6dihfx93z3htnfsib2pt7gq56iv5358lqmnk4a00qj4mh2fe22kxh1xdvl8sh4rt5a2rq1sj1vpe1waigc2hltrum9u6zd5jgbphxs84x5rvedpn7drd94e5xoj1a9838cm4de8hsy9isto6b',
                interfaceName: 'bv29xthbwvxar2554l1sigge7fbt5nn50k1zycjqj5u65x2liyr2gus8oci2gy17d8gh1w4g47ib3r7kfga18q4v8o4y255613eb49qrmahh8u7fbkd1xx09eyun4447qaf9tef2h7m5kct3r8x3oq4skid09heu',
                interfaceNamespace: '3lx4wwb96t7tazm6zepdf0xaf9i8lxhoyqcebu1rjj2r9261ohz6tl4096tz990j8htrt0szc69n0fau4vcqqivqcq3rzd8nupbew1zm2mstxhsvj39o6bpahojy3crygfvf5g14aax93ljrmdaagawu75soj6rb',
                iflowName: 'eze7j9x17kod61nqevs6xpn0z7hs96lrwec42ybf2v641tcnqmh6vg8mx3onukjklccmzi94c39bo4oqr0zcy2utc7fcek0mdp5bblkicrldnhk2gltixnwmxsphi251wab1cpnrv5fq05gff8vnh486zg8fw94j',
                responsibleUserAccount: '0rz86lxfxhhexwtf1bvj',
                lastChangeUserAccount: 'th5pdwfps5qw7epz5heo',
                lastChangedAt: '2020-07-28 18:33:58',
                folderPath: 'pf2a8jhkyfnw1lqg96ssy2f1ragcv6x6tu08osf2ervbhkdfsvl0g880jflv1yp09vbddnand9hb909mp8cej4lpn78ly1p4ohy6h83ts52cc9r2farl21lm5rsz23wvhycpqekq3c6vtqb1lzqasl7kr4pkyjl4p5y8iauam03uc8c9e7o77uq03n496lrmpfhqgn8mxtey3l4aed7js9qjtk42kturmrz0j1i8nx7em6wxa1uqofhbjtrecow',
                description: 'm9cj9jwoagzn38otmq09thk70u50m5jml4ss166rkygfq2g1858fl00io28rthwkuy8iayztoolvy0hht6xpd9jf7qfozzfgmbo4rz1eflm833h9bl0sft3d8icrvnwfwyvzft5x0xrvvxvolpkv02up1rfx1vhsm9lljbjpkwivyxgsp2w6nct046a2ami4kohpowegz73wcwcjt4ux1937dh84taxlucf2k0rx22rddxzeuu7bub0dx7b8rmk',
                application: '9ja9uuuiusn2xlvczhzscgs9v0iw2wv8ijw8ebublk25upzvy109vmaid3ht',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'kjycyt90btq30241zaaxegj4fcs2ek68ddaprqyu',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: null,
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'clo6lzpc5m4tf7f14126',
                version: 'uuz3q7oz3mpi9uhuphrn',
                scenario: 'mab0mmu9sxzd9qbxssm367j8gnczjaj98l8ewafmcquorijuaud34khe5lp7',
                party: 'exntqkua7q2o14zvi7bhjsyc4b7jntt5aja9qyp5bumd54cev3m2fdmda0obp4uwy27y0fykjn5olyihp6n32c0xoklttzrg0l1z6xv13yqqi3eux7q4wd053bf0kfnnpdhltsomt0tbetl6pkqj2zvl45eiyr81',
                component: 'f4khfch8h4wq6gv0z5zvmwp35dwxca3ocg1pvjr6rmki6fh3nim7libbhpv7mhv2izdgz7xjlwf30tcswflwvhi629g1kwllf6z0q3c1arvggattsaur2tk3uk1r132vrzo1bqw2uammvgxs4dztine49e8s6dqd',
                interfaceName: 'cub0gif6llgbaaz39szndhxplad9bmxf64mzj5k0fd9nm8gx2sjgnnrxlz7n0kqnlwpuvfleiqntz6pwatze0zt2zgbqieiqyu17kwmkdjclrj01iwgamq71xauinlyoxdhh4x6d866j1hs65krrj4nwy38y4h0i',
                interfaceNamespace: 'b5y40vhz52sf3ayeumrbbx9fzxg91c6r3chswk1jmn7497y3njebxz1pr21hcr7ykk9hhlmclvowukbn8oj9nja9tg3xp5i943bgv5lukfgxo5c8xxf9k1502f3phpvoab4b2zqbrxpsatzs3x1fq720sog2l0df',
                iflowName: 'o1r5ntt6gd7xbktjeub9hljk3ovxf365vm2p52js0z83tgd8ncnlgbh79xjduh156t9mfhej2ac875oqb4at822x4zodrcnk4eqyewplqa1xo35npic459cuhsoy1vso8382kaa5xqlf5ezkyy90ic1ahvapnnn5',
                responsibleUserAccount: 'byy3oc3fazcuo4dt2s6p',
                lastChangeUserAccount: 'momly15gbatjxezcxco0',
                lastChangedAt: '2020-07-29 06:39:11',
                folderPath: '7t2ct3l0dkr3kj0yzb6u8dpmz61lh2qs0bw1pofkzt1v2anfv14km16jqa1094lyj9w979e27ub88g74uu8hun3vnsuuagv8aa3r1l3abyim4bdib77ycuvbb07dfueghskpveb1wbo129925e3lg5fdo0j9kgfp8rn8hc1nuvspa9lsppa1p59gsx3cqpl9ug26th9i10von6fwdyptvir5zhnwz0wh9g9r33av42jf85dua9irh2ibz5lonxw',
                description: '8hv7a2sdcb09wvn94ciz58ahvsqvy0u5jfvu7w4c7as4pm496x3ooaqlmyhsotnhsf0n74x65mvfqbe61jr3hyqh0dmzf2z4jilj5i6rhwfmf01wajqsqev0cdvvs2qlc6lhl3wbfi5vwwce0a2zei2flvvycni06toa9mnw0357yc8tw2wy2jdpdk042rucyvf04jd6m4aggw306j62hbg01xd8peuu35mrxhaj5wlhbefi6gwyeuuw0dfx82z',
                application: 'fakmh4txsjvsgon5nzf25kxiio8oo912u2x4lkvi7kqsffbuchkx9qio3pqk',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'zgr6i0nrdqhrtzyhk2wmqiypzhyia0dip94z3qyl',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'ul4os4aeg0e1plp0psmu',
                version: '3wzhn06yke15n05zfkn3',
                scenario: '70k0ogauuuy2v3rwrkdozcvht708996oxarwod4nwwr5ihu2odgyytluqrcd',
                party: 't821lflf6x5yzzjapbesipyb8k2kaho04nwcj5hrzvdelqd1f4ovozhg56ttnanhnyd9y04h0u86rpqzs7grp43cf75ifacj0uqj5s9860duxsvuuibyta7lsmthfzpzxsvvoalp2oct6hjmvwzf9d6ut0z5m3gu',
                component: 'e6twigzvbunl938jl0ks68pupghg4jcoworyn8129y9z5f7quqi3lc46t9wf3kcnpy6hes0oc5bg58ojbfgtuolmyz4qemm0qoz9xorpvpk8cjupjxw0m2vpbwcaddy8adw4479a9yan8e8k84cf5w8prlajthb6',
                interfaceName: 'bek6r80dbzxyh2ygdbhykws0kd7an5if36l6ilq905ralnvr6p6lgsmu54tby71vwj98do2pqr2htd2aqbaxwgngq83g9ngzusjr3p48zs79uep6cp947iupuw76xg49ueq54tl54winlz4y4qx4visqebsj1lyl',
                interfaceNamespace: 'u5exjuits2rop1lmfeiwxoiyb5sldq4ig9jsljrabur39yxln70fri304gyzy5ohx057r9tjbjs8smrfov3e29tvannlcc5cfyvdg1ml7b63f76rv2199l6cy5hthyyc37lh45hjcin9l3qv01oq0qr8p4ijenwi',
                iflowName: 'bqbpefx4v1ncclhq79tpnl1nzntfj0e3dmjda26vi43mm1keewe8o0wy2i86csbwe5chb2agktjdch1dmi5rleecl7h9jas1fikxj4dog9yoog9mkt9mm75s0wdn6u1i4poqmxt314dyclobto8xwq4z92d71x4v',
                responsibleUserAccount: 'k4y211wtt7g712t6qhk5',
                lastChangeUserAccount: 'wv3i11b17ud2xcu29sqe',
                lastChangedAt: '2020-07-28 19:21:26',
                folderPath: 'z3ehrgttwbbemm0lk9fr2xl03fqmabmorl16kqn7yq3pmyzz0tjtwed22hlamy49jd6bjjlburxdtbv6nj44b3bwnc7zkoaps94werojpi8jdlyhuhz2sikn7s6uf2hfvv1k2bietb08cfxzrq6uzhscr7uy1xmw53qjdoscg5mckxjemf6sccr23d3w8eovf70vef2kbqcn7fwr5eo3apxetsk5uckq35wh9bhufn3i3hhjmxqkh5yq5raj4rn',
                description: '9qzfjfxy6w1eob9wjxavqgtqwx0lmadiqpj5tzbi6jaiqaxpwsv1iyy0uc72rl25ckrga60z0vakje2l2s8m4a1brhb5hjhaxmkceh4hhbk6v1o9p7dit7mrqoyd8d8sbkhdedyfbajvf2wwt2u432g5tuluqs649hg98nqtc4o6wrqahzq952b52eeba89r057z3yukyes7kbd386uftz0cbb426az5hu8umpl8irr81vffoz91vtwshhj49w5',
                application: '01b4qy534clip0sf30snlo6uckr9y1nn0ncq13wgjbro9s9uvhsoj96lk8in',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: '7px40bvhecgoduk796s4qgvxdfq6gscy137gsz4n',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'kykwlbf9esq8b4y54sur3etgxdc4fse5brwf40u3siyn0u7zrx',
                systemId: null,
                systemName: 'wfov70bsj50j798c1afe',
                version: 'xfba6wv7zcxym621zqsb',
                scenario: 'qmwuhieobyn0ndt1bch8szoljdy05t7xz7966ytoiypnlfzh2lsyqgsiho3x',
                party: 'xyhlukpzju538veje8l16l0unbrjx6zk2027pbnz6i12tugrclgln2c12ae247xkjr341zk0e6ubp30hrgruqg74mxe1hf4hgcsinkb9ikx8lv45s4k3utpuh95tgnyywb3g5cntowze8v2x434tsu4uchmrp12u',
                component: 'kk4z9t01o7m4hmdzj99j91ireqmtksok7h1i6n2bcs1uv1q0h9uhw2mghkdt3nkt6z0l0s3q1grzrinys958hs6n42rr3djyqxgp0gdq5nlhudwf27oa3iv8pvmiu03wg9rw61kfd204eeo9wvhe1v21h6bbyuyb',
                interfaceName: 'zkvq2jyyy4jjtwbd7vsigayutoawm6x34xwhtc0rnphemjukx5fxdwp3wdphsxn8bnqymxxlfhijlcwljtfrd984y83h2ga8s78n4tlzd9be5eouwo0x6vsdbk377639c1o2rtpegeytanu3cqrn93e1jls7qffv',
                interfaceNamespace: 'v4oeskzilx1tfh2rluopptyzyt2f259714ggs6lgcxyfyw90up1tk76j7tfnh3r3e0pcu1xutswwnjxkqeai8kxl99rpifism6y9dk03sp4na209winczylfdus1mkptu1ehrl9ur9s5m8lhktmyhisqbqd2l2kq',
                iflowName: 'pwrws696hph1u7625jfb4p0lywyiehpflqx5kjsax5ij4so7id7uiedccqldp858wybadswlv0iyxcr8kqueg90l3zxb1h8cwfeunqkmdoagi230or8gsmuxdoljqf6ltzf0kg7tpmmecm2tb1keecz68ygueeu8',
                responsibleUserAccount: '8844kiarvbjsv0k6v09b',
                lastChangeUserAccount: '5dpsytsou3nzc6r855qs',
                lastChangedAt: '2020-07-28 20:09:30',
                folderPath: 'di6fxv4h27u1q3jrei8rgm93k968trb29oq7utr47f3m5l1xwwvs13icb3ao553w49ymnr6wr1ig2vzfm6qq7r9l0kwwxy9ud1z19n9igqmhyq3ufa7ww646as6g72ze6c11t109fbgef6me38xvbgcdtvpacljci2mes7qas3zjh7m58npf19jzdfgps4cr3fmqua69rwo46avee85cev5uf54frds9vyp1z6f02a3tbv8ixtp2gndx2ifbng8',
                description: 'n2hvdfa5v1b07r53injgp3yjqckfrfstu5ph9i3w4rrubmu79bqswpby3ykx2n1pahdgpo8fd9af6mv51z90on49wuitntfy9cdkh5nks3byhhortwwx8disdp25rfkryarff7zenur5fvs92uknaukjqtp2ofbxbr8tp9yfvpq4e2jqhbh6nfsgs2i82hz8vj4c69yk9ka37uknee08ogwh1wmf9mnpzn4ad07vzhwapm1x05on24l2ur1zuvv',
                application: 'guq2dnkud0z34gssj9n8d9r5usxfp8r9ez662sw44rjvbm4aozefr89mt6go',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'qjzjwquqdlcwouf7bvshvzmbm2squgv4ssib13l2',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'jyfnehl0z8bmrh75ccfocaijfvlbvpo33ttcjkrgpfh5wm8fvl',
                
                systemName: 'btdjy28bo2v9j95rlg1x',
                version: '1l4c6slqv1fyu3yw1nhf',
                scenario: '7ec867mdy2fmb4mtoygx36v7br6qa724lqs76oo3ycl72ga6d3ryfsytbsyu',
                party: 'zpdfgcscb72qbo33ar38pukakhykzli3boxn9ohml2uyssjvp9o6ckhravjggcfssck7x4o841mgyvg1mzvuyh11ne7ewk91uokp78i9woevkat98s3qdbnnry21s6wwz16zvbii6tvb3peczjkxte9kpp74wkpx',
                component: 'pqbnqqzcc7whq51sgv31mnary7iq1kbvxlr1g8fhnj4a3jniowsloue46ehjcbp86r6tc3gy76zmu8kdqf7pyauqca2mh252iia00tep5uofrofs2jveus457wnowuhaxsty4v1ny63o0du8a8d5bmdugp35fruk',
                interfaceName: 'h8vr3lsqlj1wgk1qzt6h4h90y57lqoqnk10rutev7cpg40c534361shiqgngkyddyfb61e87c9awze02cczimgyxbelxngcg6z7xtwo2i0eks2jk410alabpjdfhrnt2pu7xx8cx7icpw8l07uil0nr9ymicydnz',
                interfaceNamespace: 'e4kg383342dcp7huje9pewf5ok45kw4nkx7pzt3x62h7b0nboue9c1x1ir80qsni8vwqf5pmeaha9aqnmsd2np3ag59jld2omva59cxi5mpob2raqx65b9obdu3g3tvzubhs90vzbojopn4y7dbbvfk1d11f5bpe',
                iflowName: '0tgieeyy1ikg66ovvnsynqggto54k4rv9orn4h7z1vb8tlqyatximrbi09pqsvtvx001dslm5xi69b6ojg6gobt3xixbpzbus368svmb7d2634416ihc9324zm3x5oie17uoineiz7v4qbeu2l6v3t99cobqjl4h',
                responsibleUserAccount: 'q9iyfe9jp8g8s2qcg5rj',
                lastChangeUserAccount: 'vki966zk0vu8zbebl5qn',
                lastChangedAt: '2020-07-29 07:06:03',
                folderPath: '9ajiwgjlo64f23qnlni5cvzw41wnkkqm2bfjlz84qdorww0uf9xbi8rq5vhitor8tkqg5spqb8urxmjszl5hmmtsuyq0l6shekxhwun5wees5bksi1ed3r2afggsl0dfk3gpbla8a8v4nophyala7l19ef91uxpakxnmr3kad9wjlfrv4eg55uvd31487c9w5nr7zz85xxd09tslo72kynh3dfscmuofs1kb4440e6xcuuvhzdpv5ppuwca5xnw',
                description: 'xdnaoxnj923p2tuwxre5r9zwncr7q76w15td9zghndb4jr1yxq2eaxganuw2qhhevkz8ks1mhon4we3mfrje0ufc5aaid3cw1pgqf0jvzveth9ql80ubbsgr4ciy211ysclz945yngv0hvrgks9lkzc9x6o1u41oem462d9rg4m1w13wquptpcjfyhkvnk2dztdesh84t5fywum7lxqtghpbv3pkxj6wf0p340boitqetiab75o3yidwwfciwwy',
                application: 'dzfjjr6uh2mwjwrp7mdwfh0yqbrz0n6nswlpyceqpcs9mo2t2vt78aqj43lx',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'ozh81sbi4r1cr235wadf1o7dhvubw9mdh6hrhnhr',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'gefjqpu55j64y47by7tkxhn1mgkqgdggej5orq2n9eesmd9nyj',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: null,
                version: 'v1nyj76ljas8has5yzoj',
                scenario: 'hqwayxj2825v4mgk2vewyopets8lev76vraxj2n9jqpyb7kitlhrbasjf544',
                party: 'pcmjfag45e84haspn7k1pyqol21i3n1di4kxn21v0q957pmnkqiallmhxcn3x5jh6w9oo1ltd80ihoe56oljbxbj3f6utgs58zeqdehscsey87k3bpwgdlfnoeoc0n3ytz7bvzdznem7blv3opi3dnmzqfouftyp',
                component: 'bkt2cpstmxmgdmkrth0t49b769e45dowcaszsagyzyuckpjqldk0c5gw0hfmy3ysyhlpgjeem77vji2m6spncr4lq1mcotjtd416wtewffpcy8z66xtn308ffjpeulr3s7ahgsnnudfrry53cxgfqouffj1hx9o0',
                interfaceName: 'i25iysdo0ip1gxflw5jqlu4zo8o1fs9hn25n5yxusbtmwsbdokg1mpwjxohro4distw2hadsg3n2i6whl1ix7kqyxb2at4ogjwjwtrjsi3usbwb1e3atu9pdhvnogoohsp1zsrsxn1faiojtxabh6jlptu1pska2',
                interfaceNamespace: 'ks3pvgphzh1pukgkt0nkpccgvsz91tycbl20yufppdlgv3le4yzzb5dnmoeqr51is4v7maj8dt11nm1l82bany4qlbyuy8kb4snbd5bv8x1uok82a2vj2l4o9blutccbdkz1qb61o2m3z35ka7r2j86n6qjbchfw',
                iflowName: 'z3nff8s44bzj7xba38llblrrsm3loyuwslwtmjuoqflyyfu2r5kfih21skorgaqpvqwug50n4l3bbm6ett89c930bzl96fgvztlwqmdpm60pvnqenwkoi94rfx3dhxft90ekdgyn12sqr4hmfepinz1himccjr8n',
                responsibleUserAccount: 'wloqemeav14zn7y5ujin',
                lastChangeUserAccount: 'n91zepm3iw2wartmb0ae',
                lastChangedAt: '2020-07-28 13:28:10',
                folderPath: 'ooruu75tfotf6ldenw3oh4jkkobxnnysv2yaeqcd21k6y7wpm36xqs4sp3xqec363a4mi8fd0hhrarp6txyyochydbthl00k46366fuy3ghpej1lk5ygiishmjs80kuxbkyk76cesvdycjyctzn0085qwfj4c6f32s1v1anozu6a2mk0nv9phj6msccehm9c94czleuhakvhg4owjhp47fu8t5qt9ex87bqdvzo9taeg7mydxgrjt1m6slvd2ic',
                description: 'w9l6jx16mzaezbn6y525zlh2jaz9p1kx8jkhczb9iz8insf274rmk1k7yc7hv5pot0ji0hz9s2knto0664lrxp0lod0t63r0z8i7f753jcnn1k3mwkhih1t6gi7tqct3choqezjsjf5l2nrse73qznj8ft2cxloa8en0vqv7sfvc7s2d64chhkddjsjlyamc9bu5kopq538wi5cwrt98sf3jvbnpqi3yejk8b8s1r3yfe3hzcrez8mqnzhu7zq5',
                application: 'bqqqyazbskg4vwfuhozr5cdrl10qrfo5qspv7cw7svkjuhcv82dphg3qt6ep',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: '7py6mfql25shlqljls98q8nl85bm3odx4cxvig6h',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '13qz9sd0h6mhspa26v7nlsxpoaihqskt9zpldo1ouek3a9jwpf',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                
                version: 'dowkvvpx7mknppi78hff',
                scenario: 'mlb6sctwg344277ami0fevzaljxmdew6m78rr2b2063b4x6sf8t5gj5fokvq',
                party: 'aijll9g70ths7hvaap0e8ouichmsdbnof429w38pu5y28mm1d92yvaux5zel09zojwcoa8hdf622qwwh0ce1aw31g4408uolz19zlu167r52yicpckrkq6jtr4u8lgtsods3rrqg6kpmcoi5hrna1ur9r6x218wh',
                component: '6dzrsmi7ecoyjv3pi9n1qkixliatplhvkiqc3fbw7m2r952rgkpvl57masexb6dxmoghwqytududp5b8quirjoomjwwhiuaonc2163abm4y1mniuu1x7853vi9jn72myr9ivoux6hqj6esl4giy3s42cr0p0e1c3',
                interfaceName: 'blltsbg7zx8wj00voqeyf32fepoy8m5d6w6qhjc0k6up9q84audajtpq8pfg34xj1ivrxhw5f0yb9vgrobm9ni6ws0zlf7h9vsdvjy3wfbj6x2f5utjmb53wtdvyehg9gjtsyxjqtjvsmusbgs2qrcs0wp0urpqu',
                interfaceNamespace: 'xt1la5ahoajb4r9e56qeo4yrb5dzwb4ox0bjztm44odteecp57alxm6ejdkj6et0xrdza5bvpqzlub1g6wzux2uapcc9r5ymkls0bz9nrrk5k2ymsqnqlkgoeauayh4of5bp422e0snmhozoi8ilf7qilwebbgu3',
                iflowName: 'xgbfv34986we463s31b724fs7v6njz0jo9j2i9rxyp4gmu3xnqcven31imrkyrchdudtropwnr4j2lqyhu8dq55hovsxxrp7xyeq9i0l1d4abkxfbxrfw7jjpbqzakrk34zqi31yeslf5csk27oyxbtnhl71in40',
                responsibleUserAccount: 'sbgvnxkp6ooncpvx809x',
                lastChangeUserAccount: '30h6frvbpabqu62mh1ec',
                lastChangedAt: '2020-07-29 10:44:00',
                folderPath: 'c5etcn8tgsxepuo1d73syv82qwtro6z4wcfb7s1wmuk2mg59qvs9jo01n8c7g2lugy05rbr6hmbfzkcn1tq1swtu6guhj42q3mfbcq8qgtx16t0r083q7fsb9on127cbsdmtfz7nconaqs95mu113x2wpxxllftvja9v9cfycmx25ttktv9mlruaujri0lfb1pzvjuoc44bormxit29i4k8gaxdj5zrkr4aep6owavhhesir7gikw07oorh7ajh',
                description: 'byqct8qiv9mxojrxbvdp6sby6f1iwz0rnjq9splsv2x9835wdp11rka5aiovafxhj3vtjgfhsfu2nu23ap9sh23fku2oz849e7dntg93max6jppole614uibdr83bvlptf4ux2b56qfbzz6j8zp38lpaegj0oi8orm1e38wfqd51rjdsjcbf7fmlwmh60p7t913v4k77mmqz0e6cio5bedkxi73ukqhwrdc0uscjsztnb4gxnnd0s3rduk2wb0s',
                application: 'np0p1f0bbqic3ul4ybjnuzxs1q3orabl3zjbok5wm1frhirgbhe0209ij3bs',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'k1t38l713apngk57xp4idkdzmpilkvoxns4l8i59',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'dg9fsttj0satc29v9iebyxw8g4n5bn41486doqfakzmz65n05p',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '6cxkmgyvt0h7dwudpbu5',
                version: null,
                scenario: 'mkwek51oi4isz7cnica1eitmwpqcf6r20cek5qlg0m6e6mafwt10i6adxap7',
                party: 'j0838sa6hii5y6dedocry4nomyfyqpgzu0suapsv9dwtq4xldtja90squrog4hy8zyvc781s25fbmspr77xyokk3qq3sbycgq8k8uz5hy7aizd06gtdk8420unlckl8dc88gn943lgd8eht1vftergeabazt5i1f',
                component: '461agbdtflyml27xotg10ecs6vn761x6w10jjish8bkpiggy14otttc3pj7rlpg86p2q7rywrarg0x6gifqx7f8feuklpeoyag72e4l9jjqvzrfm1ch8bkt4q0wnvwt0w34xj3xvqvhvzdngwpb0guqhsar01rvq',
                interfaceName: 'osrtoxxdg63v9dfftx80mzdnxdk0qotl51qlt24tuequk69rff421v2gfidzsosg5a4av7umm7pl7dy5pcbi0vgobddlni5ke3zhgk28qz5zcgnw2b6r0vvhul4lty90ms6y8ix1kn00copil97d2pz0s6wx2t88',
                interfaceNamespace: '4l0p7fnts192c27jxloeoo28z44knm494dsfiivad9z9n8guc3s9grr0shg8qyzf1u4doawehfosdr3ipfyp41e3pimrzhpds32cjqgob883hoycx4rld25ryo0a1ng0bl912vbzzfrmnc3z5co233j4h1lq820u',
                iflowName: 'r4nc7tr8lw0nhcon7rc7aqxbl6lrdxgfaiqrtrzfs76buxicc8cdyppjb1i9pham0c88a36gp94unksg3jzuzs61zq80046jnfey88gozbxa16bcq63qp1gw6rj76jepoomfwyemh7ih9lojbtgv5ta6h6yw5g0a',
                responsibleUserAccount: 'avq4ucl8uo10fwi0nfz5',
                lastChangeUserAccount: 'wbty1dda91aw32u93pgl',
                lastChangedAt: '2020-07-28 18:51:13',
                folderPath: '2882famvcrf7jw52jm5enq8ptsavn67bfffc435h5swz0ckmons186l577mdpwc515mva6ssaedlx3jhv2s3m4un1ihz4wxq6tkc550ixxha999ufk6kyun0sxh8ff6n05qioca5g9vt3i5le22vi6hey4tn4zq1iohmyanc17yaitfno21briveci3vmwt72g71yjd5c49yb2tyyfrv3t7qp95azgmyjd719yw9j9qsjecmdh07kamcqfm8w6a',
                description: 'z5zitnn2fwpdl7ydyiqeabdt75jmraek2c5goz30f4jln9hpoo0fx0jk7ale7dz7jxb1llygysco1fazfwj036zmznlx7lrzm4kwx0be2qw3h6i1cuyx7uh9ccl0crr8j1cc6r7em8uyhaagtin89h7ijvph64q0mrihtgerr862ndkhbyge2xbm3k2zx12ol94ckpkiwl6bu00qy65uhtckx5bvwpnbwwvujct3kotjfvchg50delg6asgkfxk',
                application: 'hr6d6wh8xp2c7pi6g31aln2v351szu32jucdslr6tzljnjf7451ctf1rsk4a',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'vnmscgmv3cjhpap8tkf5iuu0vs24a5izf680yux2',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '7u2skiwyeckagk42l28mzwrayudc909lhi36a3ia0wtk2nqkah',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'ow47esk7qmrj7w4c5lzi',
                
                scenario: 'nn2uwki7crrpzv85tfsn1vmkhsgge63etl824phfusktuafc8rwm8abnx42j',
                party: '7n93aub1dro5us1oystx3oxi3cxlc5fryr3xrja634y2nilhx49z6jlg36saihlrsblrvfbz614fiztou1gynnhtpw6wkqxhgtav877psnar1g6ttvsmji81kqq8u37pav37ikc350zttjh7exeqc8uyllezchi2',
                component: 'nrargk5bpcmme3tgskefr07hqbq06jqhfw4ctfm7opco9o8r88dfmfn98r0qys4xzrky8x0ci1ed1flucdu2f7chg657apkr73pfkkn41bx5lmbvf5egzjr8468cdztuakzxm3cd72fobx71ifhaanqvqwc3d02l',
                interfaceName: 'r9m7xfoz42td4zzpy0try888jjklm7r8p4kx4vsq4ir630potl5v5ovp6dfi64et3s6v5568gafyt33rmt5zn105nety3kidxz2dces98mkc2yheogucquab79ns4ppcjzy4q2j3jqhf40ag0ue8949xzp5bj4aa',
                interfaceNamespace: 'he7q2fafd1xskvu2jfu2toj2y4qwh90tzb59x4l7g6yag21udtjy4reqfxpxx7mrcr064im47oc46lmewlls36tt09ogwi4vale2kj02pckvoxyvlgszk30iwfejvqdmdux6ub8qu2q30c2869kvvhccmv4xncti',
                iflowName: 'um0a7hhlb7p3tr9p54p0m0d8e42bhyo5eqqd3b7xioyna9yxs33aqqjpecvivd4w9ahax8hx18sdd2tw0hybzysbvc676vjzkwenfhsz7mlo7x3r223nns1lt6dzl4zr56zsr91yj089w5rizfolpht73q846xlp',
                responsibleUserAccount: 'ax4io8ujen69tm781s75',
                lastChangeUserAccount: 'gj87t2oh0ljku7vkfwgw',
                lastChangedAt: '2020-07-28 18:17:30',
                folderPath: '2l8yt5oj296qdkk7zi5q95859oywddwt07wieh6p77hy5sn7q41piie0f03ozdko49ayyd5fizyjqzhicw2yy16p1sdmrc97p8ohy8zlig1zn51urvg5unv7un0b9p7buo0c5uhbjnegvyv2fnfxc4g990gxnuq2m68r7u6mtmbgcuxn0czpwsd32jvnr27rm5nf6k7zcp6bbzmpdzfq2h0lfitn06bg73lo3oq4s0rppq9fl38xnk8kza5ou6x',
                description: 'xbz805354zf5jnz5w3m1qd1j6br5zsi2xg3dsl6r2dvy554yv6mesrewcb6ff515k2chl7uw0ajmyqm14z7kyvbxepof5542crc8qfm4mo7sg7o7lxn7niah5myagqzpglc8mc6voau8za0re5cc21as158ah3jm22lu3r31l8qj13d9xf3sbkprc18imk56miaobfbdzeuo06557e9ovvkkj7p839eup2nipoilmyrpa7tlq2jaj3baz1xzycx',
                application: '4016hyqatohx35vaxt6aou8mv1nyto6kguhfnw0k3kshb3wovv11ir20i8gk',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'hwk50s8snmcmwuchn6nc4pnctwtdc72jp1rlsctl',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'y1ygwqw4a30wwfleziuibpxc7tvbyuq07wk8msq4bos80zuab6',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'jw7zilg5rjzeqtzjoxeh',
                version: 'zm2o8r9hun8wzh851mmo',
                scenario: null,
                party: 'adc4he919hjw72msqfj5fce7y6ex3nego9c5usmfebh1dc9sdyggxdibosksovjvle09ugzukuvk5p8ak2nmml4nc9y0w68pb8fh8kqbghs2otihmqart9xcr4jfg7y1eh4k2ipd5xpx3j7q0dg6hf6t6no428jf',
                component: 'bw72qtbk0dobaoqibo9mpncf021h3tu1rkp3xn11oad6s60s5wxii81ipjhn5aqzle90fwxw18ykb6u6mmzy4q47h24z7h6k3gkhkyu07scul5ylapdt5we4skt93jbs9n8twc24waxd7i6qo7na0btodno1p5ax',
                interfaceName: '2o2hla2zz3smrgsjxd2c1a1gsnv64bwxvp4sgzl6tl8vh6z07cibi3lzuwpwxu6njmvltfy5qjx1yf69a76jtcvrf8d60a8w5uyq5g66ahaaysng5vhazpyy1trqqp4vygcyqsq2v45sbvhz9eqiwwiy78gobiz6',
                interfaceNamespace: 'u4pwzm0685bu5owaezrjcv0q1k3ixd2sum7i6uk91s1myhcku5dq3rmkewtm53lzr89zzcy657veds4rba8auzsp2ek9nnaum7hmjklcu4ovgknw2yaf0ji6szwiigyrhqcc68bu5qyvzait38y30zxt702sxpbd',
                iflowName: 'wor2kx5kvhmya8g1m9prfri7hb84jmx1y2ishfafmnj20hab5nw3hhp2piergcfnb1gyrmj4bcsx3t1br0ch0g26c7ekl2yy6l3ukqwb1ag3iafsncvetx2qk7j8nju6rlsi5mk1c0s0xx7so3q7rkfg1ki1z4dx',
                responsibleUserAccount: 'jzhnpzmclct6ph30euy7',
                lastChangeUserAccount: '6j2h5tgfx1g97ubhpz90',
                lastChangedAt: '2020-07-28 23:11:24',
                folderPath: 'z7b0irw6r1jse3l4coa8qs8874fqy3x92scxao5drzbqxq6go9vnd3neh4zk3cletpeqbepzrgj1m8qefuzbsu3ltean4hbj6keaxds8ma62wb7hogvonfaxjxzjwqoe4idbjujqc94d6bnmg6g0cz3ze5yr5stkqmklrwykzmkmnc5b017fx49s89indgxt0nnbt6btxlf8s2v6zp8r3gaclx6p4f58ujdom2jjatfvq53he5ivuqlkl6fm794',
                description: '45y4sfmus3tz9pfzrrfo8gcdbqihg7npfbsmdoqeae0nswfkl270ogx4w1n3we4p6lgrw5or7smtm3rja1frl7ekofwztydb1bdh8tlnt9icu05hzc6mh40z4cjge7b3pstpulxias6c72j476y0hfvpsuye0y847u5yljtjjtr09rpi0hr843r7vev7m6ldtztu6269oj3eydp03g3wmkfxqgwgjwpltfqvx4fwclibq7nc8yh4qudznbf9wd3',
                application: '6m9675zc9iljtj0ch0wod7kobtrw67t4ad06fo8wm18oe3vtxmtcbdcfs4u5',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'zh4d0dbwun6ozvold1r3u8iqd8076b057hssv9rr',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'ptat6ow7x0ymqvxadeqdzk8ux3vt44zpucokn6ocnllee3poln',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'cnuexr09f4jlo3nz9vc7',
                version: '1p6u4kk7qy8dgafor1a8',
                
                party: 'b7xc7fs2jqt6qgm328e2yezzh2dgoahdq4ztbqvg5saz4y23tp1n643e8aov4qniib3v2hmkncwrpu16gt1cye63v85e6gp3k12dbf4c1maouhn3yv8iz6gojv9v4vwm561ju8imhnrufio1w8h7n75xty123cb3',
                component: 'mn7r6lrf06rkm5a4xrynk3z4pw80u66jiwqtswm6gb29l8wq2vsutx2rsrv4qwagyzpdjvdu96dbeam48b5ydpuzboki572d7qhcepzbi3543vgg26oq99nigjhc047fash8huvcdlvo48c2zv18n6n10ii4x5cm',
                interfaceName: 'tu5ml4su9iiik24xtj31z3g9s3f5e54a3k45y7lr4f0g25r332lfv2m8szuzg4fsbmjbgncg5pp69964nyqrq2qzdf6cmepslfilt44gblimq0y22e6amm9k3u0xd7uqokp1c67izyep1oi0iub69lcdkc84wms5',
                interfaceNamespace: 'bdssmb3cxlfnvtj0jvkni8w0dc1m36evk0djocody0h60owrppbfys08qy1fqsqdb4163japx2xjenn6sz9637stf3oq84fqp1rstqom1eneg2fuku5ye2n1unzumjakezfki29lxt6v7z2w5lr8xtp4x06yth4a',
                iflowName: 'm2vzy0a4sxyvlyhsm8ehks6lfae4lg3jrmp8s2cnfrjnekc7gpcnliyx6sldw9dktmi5prdnl7bq7vl8v8n121ohezw6q58o8lzrfo5bof5jho1vu5tb2nqq2p981dm0wer027tqdzh26hxgoz3sv12mglvhqv45',
                responsibleUserAccount: 'n5ga46oljczjqkz7lxrd',
                lastChangeUserAccount: 'jqs4utufvd28y6t2e9ec',
                lastChangedAt: '2020-07-29 13:07:21',
                folderPath: 'hm28p5acvsz0688eh61quabd09ujj47kp0pnhfsgdlyzlqsy5j8mnkx842u52slrzr3y976vlejcarlm2vu2fp2bq4hu9u8afgcvkresj4dodmg46auai8vftgsv84nsypn9015s2wwpj32vpi3mhbgrybeq2jrb2s7n3xoiw07xa3jkttqzshvbthio1buw4obpd1k7pe8xuopi2aq9cllcgdq6gtfv403vln9bn9hesv64vxd29tfeb7evg3u',
                description: 'clcd4ecow9387jrqtdtkk4ov6ohsfp2q4xms9jdbkm3cpscvnjczjf4ymr57aan32xplbejf5rz2qqc0ojy2voo954emzyfcps2dg9l3ur4zmjrnpmga5y4e0ci4q3ldnf2v6yten4lpn6wp92weulq5e5u9hnben2u60e2juoxjx77rl66u2bxlrueo5fsx9nwcfvar13zm39ym07arl0kca39ectf2fdwx7xz62o06dbtd6xovimx0mwot3vf',
                application: 'zu5wyrth2vemn849yt7v9c8yc6rihtdrci51aseelxlgpx3wb61kvhipi09w',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'd3mxbsuhwlhe2hk1t860902lr4sy8vqd2wpmwqio',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'rfnepp3uu6vqxgch60qmo2g2hyaj31d6rjzky2qki39bpcup8u',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '44zs18dv2pwr38hlkog1',
                version: 'y4mk3afqklmxkpsvashi',
                scenario: 'zd5ikopoolkc8p1npeob5yn64p6j4ezix6gmkhe6wpus22rxjjvokz77lk0f',
                party: 't2dogonovew9b0yw1da11p04badrq22rq0l6tpti51uo3pclry63lnmdxwd781wkg0dh24rlk19xvj3eamt5jt30ndc5685yp20jaoz2q9n7d0eu5ozpa94zdtwgo46jshmxgfbk714fa58pek0l4dhpu09vg1j7',
                component: null,
                interfaceName: 'm7xtgtg415myg5185d9vzsnfew9f6qi0nr0iaqucauec75hwaeb8ekqkegl1k12s5v9osq93u4p703ps9ugl7jjhffern01xoj5p2i082s081ye6025dv5wpitdq39uj2sqi8z1fqjj6oych1j9qhp13479sgq6h',
                interfaceNamespace: '92zd2w198j2ahynq5qhl46ftdj901kcwk46xwtvbliumgo673mykhtjfafbxzmruz2o8gjzraddz24xsbue3d5aot11dzzq1ueqxyamu49qw2gunub801tt50jjx319xnf4j2has2pvt001dqgabojvty0w4s85p',
                iflowName: 'qfpkpp9fv4ckgvct7ygysatee08htwucapfl9o9na60kphat8ih6n0o1nnujym97d3tnbjigl17ydxjhqm9dgxozppbgzyaaycn5kp43yd1c6pz18dblbwfykxplfo2mq9s4ervk22lp67wao12nox2trwe59zmu',
                responsibleUserAccount: 'e2pha3ioltgngzt3ybaw',
                lastChangeUserAccount: '9mme0a6a6xmyfo3cb6q5',
                lastChangedAt: '2020-07-29 12:24:18',
                folderPath: '26niywb2tk1jso1tz5oe2b571q2zsq0jglfczw6k9a6z00y303qbyh1jmyl10pmqwyi6rb1qwd0w7s4fp65yol1y01h1clpt4vbvcnqrqjk30hj69k43zds8h1ao9yfze1eh6in736bjhkueorxit4cd3dlworbkxop32rkhu1rs6pljlaahb8sprvonheq2k827bfwp4hea61yljim5xclb29uouf8osp8xtez6knbdnzyllw0xoq4kxmzyvpv',
                description: 'myfzexaf5ayft278lcivd1w0shr5uruww82sbl3b9r1flrosjowmtyvm3356fthr7e53fwak7qfwmupn5r1kg0wfpr5ljw42yxondlijwxl2b27hzvceoqp4m1498c8jbdr9fqxthhc6g1fglvanvyir4ubr4wck13ud3fvd5mdsr0j8xdur1rvxgtp3zg9cxekz3pa16wz5emp1pu3zlib81sn493sj4yprok1obavoqcn1mcczh7hvgjo7sw8',
                application: '3xnj1eyx4yvq40ttnw4x393pi8ek6bv8r6fhjcw7pzpmrkj4apexnlvw7t9e',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'ob4jjd96bx5rjxvx6wd3doahljgt55aduiyv1ck9',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'x9lrqusp5sjzjyhpab40q5wy23fgy80vnucddzph5rpy18el4c',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'z2wlxaj6veehziawo9sr',
                version: 'ykd79crp13qznqp0nv2n',
                scenario: 'h7tgn71r8rhmj07psdz62xyu5j3e84mcw00364r2y07jjmpzh8s80lf9kl5z',
                party: 'bcnv5pk6roe9q0rbqzh7b8jw50drnane31xrw0om3kw3avipq6335jnpurtyz3cbnvvl52tvaawu38gq4gbskkx7gkyqgt2zqnmlttzcrdf7o4ywhdp8vnd75dykp1v75ln9a9hw0pg856h4wktduqo4922femdw',
                
                interfaceName: 'uozqzkqjjz06o4t843br5tjo8k0tmpo1wshimeiar07uexrkrtegz8rzyhnj9z7ncgzucisy2ce8hrco03aeg1hstgd0ixw864tw9dg7rp50d2ds2tnpkhsgb6n8j1q6r5h9ie1em05rxwc8sdon619433flvaq9',
                interfaceNamespace: 'r7hc3l5jk5ob4l67n49lue2xs72f8hk538gtr6snsp26pa26letuwdeo6enkoun44gdyxlo5wfdp4gd1xm2tpezxai0p7pq8ezd1yeqfoer9xmbi2u1r6suzxtjz7eqw1rhtymf79azv1ecm1al9stntveud4uxq',
                iflowName: 's0ziyz8wkgzhaann62rqy1vszgx08gqvyqetnj76jph2y4dkqivant8ybxeox10ou83k06qxmygxn5iez0terzb3o3x35lca8ickxmktda0hiavkwkdritqv7w9o17s9eystcymkmwo2qxhido66nbpjwzrvaqxq',
                responsibleUserAccount: '7f7bqo610zqqfhxoqtzg',
                lastChangeUserAccount: '0m24x5tj97lqjavy2bbs',
                lastChangedAt: '2020-07-28 22:37:47',
                folderPath: 'zdzyo5gfnokx091muunaejmzz2jhetx5r3zo7u4j1borhikcmuzrfr301ck8428m265bj8p3mirxjlv2zr9q4907zjt9melrg3g2by3zstnhv5csmsks5ce73ydj8nt1y8zsetdav5d85wm978kjo99g5qhpenmebzm0dcds455t5gtoyils9a2kwm00vcijb2sxyi4draju7xcu5pjuwjm4gbfq7mw5fk3nqvyate6fvnl5xahxkyzsgbf3ds3',
                description: 'crdzwz70lvq56og2mq2cmcm3e2rkdukyq4vmsbw8z1n6y4i8h0dct7auqtnhj4hsxyeqgmg0pi3fey4284rb7cjhutip3lz8aooujy03dbkziwv2fwwydi7gssiy0pv9du7qtanujzxe62fovrwv3ezewk7hn2ehve1ojtfva8htfwgllkhgdfwgttlsw8jv4ek5m3ox8vx7ytj1sxgsabbhvzpxlux4xkvah9qsceewqf7y8yc4rkiogne9qba',
                application: '8tnirmofyx40kbss9nwnb4eqlnkgk6wzysulzkaqsxyldqfjxm8tx3fw0kb5',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'fb2cseewhwqjq5afd5m6q9i3wst2hscdqjz9ri7v',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'mukahjifhl8f76qo0yi5spfihvv754ieqk1zwzxrg2197g79eg',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '2rpp3he54lu6l11fa0by',
                version: 'f467g3ra3xtfmq62vzg1',
                scenario: '0bsa0mg0w0n432dj5iilhh2t5abrm2ilct7ipz305i4kt9wj6e8o9w92l2et',
                party: 'fykvls7a42nshujwl1aiqv5uu73e6smy69q7z417hdduqa6limk7wju7ziuhhonr6q2hgegtfqur8dojz5d0pv883dcro5c2wlyai7z968fap0hppgklgj0y4obhiyjr86za6d8f2rfc9lgfrvddqokr1qrv3j04',
                component: '3h46lyi6ae3hmplclmpwumdzuaupmpphhwevd20zbju0gf7w2gzbzc8qnevz16jdj8wtu5mk8wqlab6gj8q4nzha7axvl4lpop42cbd9b8nlcdjb2sderknkpeoopy8773cqumyv6snwcfe33qf89nbe8k11wk0k',
                interfaceName: null,
                interfaceNamespace: 'ntlo6e5ikmm6g6kpsxi0bpn057h8iovktpq4t6b3k39dsih8m5rp46fdv5e9xnxogym4wrg70wu4sk1xdcahwqkq10mbg7zhvm2ekj282mvhmywpzhcx9w62cd018bv9hgsdidnfvoovinvs5yi913nx23zg6tro',
                iflowName: 'zy6pg55hi0tfxqp6220bgr1es4jfxfu9ehxe9dhn6otafeuyuv924ns3ii5bsyppq1sf5ckkig42mrd5ldsfhhzk79zooedj0an86yopelwpl3rh21dfp34gz4wpnpjnub8bkpr2jxxvk4hr64easq88xl0rcp8d',
                responsibleUserAccount: 's4tw8nl08z702dq2nwly',
                lastChangeUserAccount: '2vj6ya5i9vli3pthz5s7',
                lastChangedAt: '2020-07-28 17:53:59',
                folderPath: 'x58q8r860wzxsvmkextdiftrmomjoin1fei96jp5zw025wyhhxuh2qj154yh3vgho1tr0wzwluecd69v3ka2aq9r5xjw35goy6jzw7g24msdixx9joyhyvk2hgli8lq26z1ntmwh02f6qswrjpvvwvydceactf0yeidksg3lpgvwg5ibxd4n3cjn6xdi3q2xe9bgauzoah50kgqqf5ytryiq172p96gz2ion6cougdo8og17fx99tdojmocdl4f',
                description: '6hknznqu16pjni4vqdvuwai5a1sdat27dci6gtktpdgbnjucdmbw2x9iujbgwzkbqpyee09801bhabd51dk9jnyv8iu6myns5rvm19cx6gust0cjs67g0offx3gi51kt81r8af2gnuwp5ymja7866ms58sgv0a1mkusbnhgxg4a7ite6271118smj2ob9vo6d0ahv8dzvku0vyqjb0ygkgiuwieiqelbuvqzmxoho3mxd6yqnvmsaddsjxlvsqt',
                application: 'iay9eh4pvrt40rm2rwxgroktpmsz6ebb6nbev3g0jd6g8dd6hqonq1ootyv7',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: '62bqto3656a9p5797a5xgt0euvoqtkmfn5izuwai',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'geoakorsw4nfpfopayvj8sali2o98mg5ktq71j4prtp9q3d3t2',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'woyhnc6and8x4aacmq7z',
                version: 'id151byweh6jkfkmp1fn',
                scenario: 'da9cisyzhdi6yetv4qsfham5l31hqu9b9gn55xsdpbq5g3pyrhyiqvap4304',
                party: '4pkecj0bxyeqt6fa3aotftwzx0fbmk80mn6iuk2beb6xovmlkwkynow86ha5anm0mw18iu7perkbmds54o74kvfzy3r4a1rfpvhj5buyseicagsdz5j1xh2px6zyvpsujiane8i4qpot0phat83glw74do53rj6s',
                component: 'ilh52izq80byqik7munuldrom8nsmk3anad24m6zdc76ytnfg158hogmu70qnws4500qwqv0n8f0hvoht7a6aex3mcais7kz21kelzmsa5ato47e1kbh8u6y5obit1uk12zv824uf9jxgacfyjgt1q0g65jxjgyw',
                
                interfaceNamespace: '2gg5lof08b1furjijx2bxb3kle24hbsutf4jb7pmxl67u71z1niu2fdl047v9xzb79tjr3bn6txs712wo2acsgj1x5g8yg7zdzcvspmjoqg0cjtrcp7090vwcqcwubpmg014yfsce8ook87ult3m1pdu6huqzmqr',
                iflowName: 'h0fteeliyczd5b9capg45f7e08k77jy3u653p68hiizuq4t3wq488ibftjh0z8eb3pjl9z9qypn927r0gdeqqggt85m2pstbfu5xslfh4w4uzr36pwthiq680cq7v7fnz9l2qt7x6ghh2paax4o4qyb00u8oenj9',
                responsibleUserAccount: '87l8llh7e1xz3l5tr55d',
                lastChangeUserAccount: 'mcscgradzwcy1i7hh28o',
                lastChangedAt: '2020-07-28 23:58:38',
                folderPath: 'fiw0xeiiwt4fb64e2kp41x1f6pm3y6uijihttshxi93c1rxsgx52kgreurl38w9g7umk83ya74faaa9txldgltg0on9wsodvg82pmrygea086kdwin1z6ycr58szjrn3eik04cwor286lwknqx31ifml7ypgkd82exqqq5djarecjh2qk3xw1dtojith42hw3mi0c49ns64pdw66sgwzuvj0izobik0xoh760zr28jwexpg4dkm39dnghamb670',
                description: 'fq23t31e1284r0w9xmbp93r2w25i82ywc3y480sxg2vgmn5r4fwu1t1fnvj0xmmvfhjf1b9dgp96vbldch6544mewvn1eo4nk7wrcmn89fth1czbwnwpl8xbilmxnufq8fjwjthpihk1fbmuretozvn4es1catpbd694wamshq1rnvk070bkgv26frcyyvgnr7bqeiifllyg6o2ro1aj11qrzk1goszmc8wv70mi28hb3w9rbcurbiavjhvkzxy',
                application: 'zl99o14q9gsu4ys050s9ismf6pm7t0sjskwsvaf2uhp9i5rb6fc6mb1m805a',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: '3e2ym7oy6jio6um1xiidpaasdfpceceucpn5ynv7',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'f78j5dkze0e2op0crw4dchzzvlb3rxt6xa5xfsaayi61g1qwqo',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'gii3f7evzu597r2itz95',
                version: 'r169zaw3c6cca57gqdgp',
                scenario: 'iyw4w0h8ep574pg0kl6qx0yv2uhwp633ri3hwnbw6n0ulsxm4ylelghadwrx',
                party: '08k69voiojklg8fsoqw0m7nw72nadhj6ugoslui09cthcssucw74blywoq56ec9cr0db3gn3rdpfowha3srf5r79n7ubf5g8qz6fnezedno0lftbdkehsarpl13hya7cg596mh3wugebptq4eyh51dvuylddlzss',
                component: 'tcp932i1lkn4qfgvhz6yya4ve17watno5ltcfb60ah0n0fumk747dfn3imhy4t4kqysnivl7v2q6akixaixtej7owysbudoh5rq4ip6tt0d3qps2hi39h0turhgbt6qr3ns4uhscldvnor9jbcq21xi5oksczfel',
                interfaceName: 'kvwsuepvs99plj2hv415bjma8uadqkpdl7krjjq8t1zu9u4eixm4l9lvgw38m0hy7mu68ozzlri9cil3odkxw52yjim59y9ywil9jnf14tayjura3zxnxj7f6ne93q45700huzjeaaxro4itjiri4nv5y9pgq9og',
                interfaceNamespace: null,
                iflowName: 'hmcbmd72677s3ye4gtvh12boyop9xrh2jlbphhwf7wj1yjxm8zysib7zmogdvand71so3ecxx4dsh4elbsf8btghh9jgairzqolyiq6lq2ltr9jy0b8zs8lm3vjuyatblgr5afmh6uxv65dbtku0lm3u7h0xpgfw',
                responsibleUserAccount: 'yme3o9ed011t0xdpbh7z',
                lastChangeUserAccount: 'v1oi9z1eddzt6kfwy0no',
                lastChangedAt: '2020-07-29 01:39:45',
                folderPath: 'xvczgowr50xhwgimxd66s6t378ax09iinnvs8uaas7ia6ezwgvn09xghtjavguekoas13lnq6c8hzoeh3vxcn5eky0x9uha8qmws91lj3zqlham6qxtr2tt1jwd6omgepu45693kzsuadn515ior4c91k6zybxgbsg5yb9oyy3m04xvpsyktpx0tg8ilbnrohhrtcl7b92yse02pidudb924vkquoay08uhe65sdb3rnk389oz06bwulbuh7m27',
                description: 'zwt8hgf4vfzxbnc412daeoab5p9c4fqbvr3xbs2110l5orfmv2uupotuxwrsx27p9e0o9v6q9w8pp6ljka7jwfr5eohyen3x8tpaew7fw73pdw91sywqz6qzmqxhus0s3964imkgej8ed94vgfcm945x2hv0eyl1vxhprh2v5he7u5g78sj8jkxkrcnk3z72trs3f40af2gy2b2jubrluc3ls9j4wvw3196oo903k91bjprvspkpkkhrphzwon4',
                application: '0jndye0thr3vqbm4a0h6a6ek4qt0co9ynyph0nvggymj1rnwik3pisufwyhw',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'ee7puq86ahdy82uzr805tvl6e5abrsbgw8xbd3o7',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '3kv1t7rzwbuia9cbsb292bqlz0gtzw7sel4ip1asf51tkj8n2j',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '2yzxorgcxfs4phfdy12s',
                version: 'd9cu9dhwsaph8cjz0lvo',
                scenario: '1ci03n7nn40gtw0fpx5fpxrmkq7irvqrteu85lxr1orcj2l92c6l6p8tf8rt',
                party: '3y7m96sjl2b392dq1tyepira7gz2fwyc2eviwzve8v62cb1hetn5g56c0vqzayzmaarmxidjfghfiuao3apzxmqocotwg5743usx0tlax50tlph70f36xo9w7jq35dvhlfgsxkuvmzokgdw9bn87aa1li1pn7of5',
                component: 'urvia6rzxnztn29qnqrw2yfpzmgt5k45tyicu0dnpftb3ob36eis4rmlo81sq54qj9s033rc7x4x6xzaokwumt354pp88k8xwi6gyzopljfp829c35rhxur1i9kfqte91y0q7enc3gytw4hmzywk61vu8j66no3k',
                interfaceName: '2nnxgyl6yu4qfqt05wglpw3ye8cwqwrojjrr16eo9ijz2p9o8zehtpwij7skcfr393hpfu5f0rooaj6xl2dnuc35pbur8igzqqidulmjpl5aqs7k8zq01toryn21v4yg81wisf3wlou3a0bme2iw9cmduk2w1a4r',
                
                iflowName: 'xsuh7e3c5ie3ouwvdkhr5wfljz63ouqwdacqyesum9059726hdf14v93a6a4b7ojij6qw07s2iz2e5jzcytjk7ivyk9appdckbq5y9y0zdhnz72gbox10duebf1im6nruuexuln7k4q22v5035srf3x86v0tw6vz',
                responsibleUserAccount: '241xtnoa2n3gc1z0utjy',
                lastChangeUserAccount: 'fu8mk89y9mnx2zkzep58',
                lastChangedAt: '2020-07-28 23:26:26',
                folderPath: 'n50g33k3fv3wlsuqabulaea111jy0z322if7ty7c1h6nq9oi0dx6lo4d1l8qt50jyocmu064k3ue4ben8tegm64kpqktijz40y9qci8235qui7oclgo03nyozy3uibk3p30cv6i1l9d2yihcmrqy0wwub5kvnfvyjmzs7nt22fd6yucxuu5abmoyrllu8x5z9q7jh6it8m1n26035g45smek20d6sl00zyv08byr8hrafxaio6ju603nn3ujbz8',
                description: 'mki635h9r6x2r75p23ii9wjcq2ot4547d5mep0s2t2prfofvpbbzih7wsh378k8ua853yb2p0oy33a1yn1qme2bpxlpbo01f737siewt85askjb0vrab8udldx239hstx6wf7ecl5s2t9fvpw4rxyayairyq082o4a3anqp52xx3hx2wp1go3717fh7h5drfd2pgg08hpb5dcy5fc7kgzvdna1qos3o6y08isexfbvwwcwjkzcflsqw7eni3rd4',
                application: 'cdqk3875vfata28os2ths0xt4fq8mef9n1kj9pd7f4crd7zxpe8mc97ooc66',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'q3d120q2cqipkfce6dvi11p1yjjqos5nr88fsxj9',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '4jqpsiydp9w92stkt8a14d8lbukw6yyx1nowyfc48pnkpdzshf',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '1c590bdhgtz2z6s81rsy',
                version: 'di649q9q5g5mvv81x8lw',
                scenario: 'i1ye39t7jx8pdxo3yaugdabylmqnrujjbblj53it08fpa6aubdjby6l22bih',
                party: 'mffccnoa64fxhlpqzx4tufeucepjslmhm1ddp771m7rqcwiz6eskdfqk46i6wvboyv2l6crgjjjz0l4q4rxtcla0qzuepu29m19z03hlt0btr8utb07t3cat8w3od57ztd9yldqe4rqad1klcydx3xmsthxd7xid',
                component: 'z9cf9gbi1w3sjl1nd3sdzygc5r4klnjetaler6b8mwggs2mkx1clo7gdmo7it6o75tyknocub5mlqrw10jv346y0tubiupd93dknjen1swiu2i3hv65mt78ddzk2qocemnik0x2foimy4kcp95xh4mcmmiw1obrd',
                interfaceName: '7qh3f1fabn0jfa7ijg6cjd58cnhzuqxx8tasfmo6rsbhr4ydztifko62mw0mxs4g2lfg2w0is47hdxqkb31wok4w3kzu8q0zltmzslazrtlt3y99dpdelt6okzpum97p46rvq5t0w6vpctzojgscbjs4tl1fq85t',
                interfaceNamespace: 'p422spap1cwuy1ioaydcslq1p8fm9p6txzlx4hufqkfl21lrrxubkvjyhi30sd8f4vvkov06qi2t1ribiscmrx0zhsjfi3rwhze8qqq1xf146jvifjf9xm6pns09gz06k9dj11gs8yx432msosat6ryjk8phbp4z',
                iflowName: 'cquqcw9kel5akv76si7jdhyapaquqrnccac3r650kgk5m02n81lsybsmkjd4178g2myvql4upqrgjjmpwc7nhp7dqlkwbv78r3x6ptih6804ykcbbardd9qeudke5wdhe12ssw5sylubm906p63fa241e9kdb399',
                responsibleUserAccount: '4owbhy08q3u2mj2pyca7',
                lastChangeUserAccount: '8ow13h604w6bwc7dmnym',
                lastChangedAt: '2020-07-29 01:53:10',
                folderPath: '42ao7j74td1d691x3qugmhk62vaw1skydbgqrdaczg7dqx9nitlcqt8e3uvhumcnzr60xj482kj1xhcp112we72mfcdeh8y76vjdm13ofk81y7tsyut8xnyi4tah14r6lcycj70w9lv6cys48cmgwv87sa91j46gryi83on3unafn07d1ifb8refzj1as6qfuq0s2c0j0ofaq9coqvygcjbzvdp3f3cfwm6megg8vfe2vdidurwlxvjsp4jf04w',
                description: '4nnuhes8egr1qdf12w0vcvlf1fimqqh7msbje0ycilhp7q0t9z0uiagkmtxppdu2ihgiivnpekop68g44t8ddhegz5lvtkogwm3yl3ugpb0fgqw9v0rk8wc0zt282iyc4swwg8d1tp35bx9s1gnutuetaidr0tj30yh55axdw90w6ckz2agyn4taiyuttwlu3s2bs52lqcpoa7fyf8ijrt2ywv8xznfgdp16a2hq7hyjww7s0u56oodskeej7zl',
                application: 'z4n6c0nn0jrr7egiearm4qnlx7assrzqilsajib8kex0pv9fniav2tidqyxf',
                isCritical: null,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: '0wuuvbs4d28r0lwnahiknpp6j636mlz3m92xz1a6',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'khq44l2gwa0xlnpdrvfrlr5fbsh2one4vudoul3dgq81rm2rtk',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '7b0alvz1n5xwsnf1zwm2',
                version: '3izffj2beesxtdrrj2zq',
                scenario: '2hr28xcwz33v5u0x1qzh57c28avejtk7pk6jj7pn08huwu7nppytk9x8ug7k',
                party: 'vtzj703whubx3fdh11vcdd3rdjds28qtgmp5rajnmr3xorkkm5mbhnpmlay9fmc8lryx16ag8kcwbm5verfc0b6nqclaokuvcmolwwuhhbj8w23yvzo8kj2pk68uxi69fkqpm9xvtfe65c3ix24exgzpr2lib7vm',
                component: '5zokedp4n9pl2d2mgi4qatl52305tn8beo0gc9qlqkb2pqiiam660yvsvc9pkksr2hgk42d8fv7gsru8kwump3xog93x3izlbzxxej9dni2fgjc8b6rz2zop51yl7qvzxwgznsg7kxm8nw3id6atghxzrdbb21es',
                interfaceName: 'vb674paqz2o3rad8zm3igonar4i80m4t7t7j2oappkijw459w8cmcr2f5i49kjenesvf6eig1giwa09u0pnwzk69tcxtjd6yimf4kbkcoajviow5ohi8etrt53vq7c6ixbtk0dr42g2enz6bhqadivwdwy7p0jbj',
                interfaceNamespace: '5zomzyfwyxeivy2vjdtj5bwv9l6n2lc0b69pg0lnjmjr26cfn66np40vqukzup9h2vs9q1ndmq0st28o6kxn5k6whd7zxfx7m8uvw5dn96m5d8hq4lws02qet8xt2rh683bsqs0ktgdbqvzaa69bdih8v3jpkj1t',
                iflowName: 'oil7epuisidrx5ru08qivgj8qtmgdmeqf112ojzdg3nd2yqjmeux9lujrtxz8u6e4pkog2i26rmmhyvok0uwjpyqhcg2vecdu9c7k2y9dbpjj2jhek6k2hnia8k1afy8bw45x2o5sb0uzq01qhwtcolrd1f6bfx6',
                responsibleUserAccount: 'gwh00qwteh6z2y6wyscj',
                lastChangeUserAccount: 'cryu4y7rl0powh0v86h0',
                lastChangedAt: '2020-07-28 17:56:04',
                folderPath: 'ip2hx4xxpz2j72ob6w5pqnd5zky3i8ux8wlyz941hqtb5abst5mw9xd4k9hbvumynn6qe8qqvivtcgz8hmfokkd828xg7oltfptqetq0qaqc2ruypmc3pcyxuqlh2kbuzsep4n66mnequwqa9ozj5unpeijp0zpcp840cjg464na8qjves518lbu5nbhn289sp2zj0jkl4y0arz5e7rb41siscc0lawqrhzzntx3qvnckjldigvvggwnl8n3dqt',
                description: 'urj94vaizv2txxa56r2vd5i0ffmz2x8n5bbjy3kfvgnxapbmc5a3mg9a21cclsk4zpyy6mq1a9x3n0zmtb4dwcxuwsxihhtxmwchjpx0helbx10wgel752wn0vy50st08oh0galpbelqarb8qhi28yzset0lmzenj1bch201azcxn3rpavgmwqaix9i7o86zley09mqam27snugkdepsw02xd5wjnzygpxhy5l8yo1qr0g1u23qgedvjl13kk2c',
                application: 'ggt80g7v4lvhj1nqh1xug0f6e5o7xml2mi76gcoq0dzulrljz9f82ojfgr4g',
                
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'ubt0f3tmslsoqaxy7ibe5vkbmfeq8e14lrx5uzwe',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'c5g9nw5bpy4vpbsz3usnntotmlgzxhtmimvu9h52h7k3ki61kr',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '25lxewe6eqckqoug5kpx',
                version: 'ey5ytrj5ndwotpdiy0nd',
                scenario: 'j3in50rqrvawkc4ytw9tk0zv82zx8yvpt9yd067fna4lrz294rgo3aaa0kjq',
                party: 'lx841qnr9zrwp2gkxk7v11jo7515i4k30e9hc3rf9l1mnrz68zpuqx9o319ayyruxyysm85nv0fyj8lm2ig152jib63o2lu5pcjuykgf3t2vy47tzok19u0xve83mi6rr4mu16r3ocy0byjfvny4wzo1m8pf1ror',
                component: 'dua61polrhchon88v9oxxht9tpenoauic4v0udv4592ruqiz9qeiwi37ecyhdvad3hy1yl1269d6ig3uuc3o6v71qprixe1ro8vhvu9g32tknefdgpcobvbp40esadg974czonea2i0uffh1pkbq9isbs597z5gk',
                interfaceName: 'vrjxl5zbyt81odvrmkk45t2lobvoaws2cg5cwf1kj40v5vk7adutrdqcwn6pcsj3iq40x0vt8md61hkvritol2xpd1zuwpsa72iru746y0t6fq60ymfq1w7h3b6lwqpd3z1nrcnkgoedxk6r0jey6awctacxbabp',
                interfaceNamespace: '2qk6osuitjr6cbsdyltqiaj68ub8hdx44zl40tr3nod5hgdg5hk60dsl7kp3sfgdqalxl534mwnxs8fw2t0b8ovalmbns3xjqf68vvnzagpys39u8d5u1tl2bwgkiyzonhp00nw36ccibkzbb5uos3aiwspkftm7',
                iflowName: 'xr5ot4onvovpylsz2iq74h3gpiu4khjdr94g0jyj018ynmvwzap1dz0czyreasgtk4vi4lsja8ygzj566xp0iy9iu1o7tvme9qnxbxrr736h1hjb2jhkp1il284stgph9bsry9azdppl1s45xc9pmeve2fexregk',
                responsibleUserAccount: '8c2j6jr0w1x5ym3r0iyt',
                lastChangeUserAccount: 'ehf32w9a6gc04utpz8qu',
                lastChangedAt: '2020-07-29 10:08:57',
                folderPath: 'qsu9vvlgxjspmt8s8a6jid3web1nusk92ozbka15c7v3awb44e23uopgvm54tdsmsvjvqqmx6z2l5jnk401bvunmjzu94yed9w4i077i4r2kfbj9l62v5raxu6l9rrw1p7rr0iuz1kl0fk1z3ubwuz3wagmg41mrvole6z5fh2s1k5tno5ymeobbcgi7h22ob8mwdehjfpkm039u947mdevuy2k0g6yhnu1g3lbihvp04drdl7ewgc5r0t78iwd',
                description: 'miokj09r4z32hhs65tviin15nbyzqebork6o1h8wgnrm6lk1958sxfb2ye2iqcgvnll17vrzqvsv10zp8w46yccl4d15lhl2xsyx8og3mcvz7h633ydgqcdd8iw42yyknh03fnbeq43rueflk14mj9f3c2tu2w05v3cx5f98vz8r8c26ayigkcewyrqsxtioo49o8i50li0xkqugmuxhk4gq6sho4kopdw0s0n82tekvesbwgzxkt36cngadwtf',
                application: 'yh8f97zq1galk4idc9738b81530b3eblunu0ugtv7eneiw1v9yhoii75c7kl',
                isCritical: true,
                isComplex: null,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'bstesppa54aq9s2tsxlnbygh3pjkrcmdciurkuuf',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'wag07qhkfe12h85qr1v8cn4vht7wzavzemk7zst99mkfvrx67j',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'sj1hip8b8bqsm8ixe4gq',
                version: 'o33or5yekifknri9l32c',
                scenario: '5vi7ih234ddr4dpna0ibyjzk2rrkr32ixt0ltb4hoz45uj09b00gcpuy68sw',
                party: 'vy49fm4l0be5hwiamc3g5xpyqbtzo9iea3j399bcv1tiwehcubjjbmfwbw69b37fjrmttwjv5u90x8ijn0eivx8mgwd9kl7uqdupvzdv911mrx34d5s527x2bkxqspkc9hu13y6i5e3zaof1koqywm70xv7evzbd',
                component: 'sya6pyt9zj01sioxh526vu2x1t835sqh6ern08uo66x1oct9akijpecbtkkrud10tn9oy0rldzplgfz5ab5ldt3h7d267eoezvmye738o6xvemo5gdpnc7j8tugozidt5lnhthp87cmg93fulhaztmbp2fy1enmm',
                interfaceName: 'nr0p68g394qyuw6ehzkl081mybqufgibhqsek1r1wxptqzre71jhc2gm16ecvulidhjszzvsqg61hcw999q0l418e48j9bkfhnhf2rpdvu6fltkbp9pdu4yee26zz9mx3q6x0a0jjamstagg8756pbisfdn7u59e',
                interfaceNamespace: '1aziy92oct4q02343ltsfzanrvnirngyst18c7qjv8rzknhu7d3w5uymd5v7i1q8cpfd14x63fy2zodkzgaj2lbie3us890d88evcsqiy8gqn86tppijzas3uijpl2lefk8n3ujdo6rhcx0kp5a6v3agzi3uwf52',
                iflowName: 'ks1pscpho8zez00dimh6ey4iutj8ph8fzxgzrx24fyw1lwweaqvdvgexhye0fzen0chyasoelcdginnn78vg4wljz8thi4eo1thndwti5lkvnn1ylbepw5lafjkdaxc9wzpwns27mvft8tcffwguc0cxrt363i9h',
                responsibleUserAccount: 'wi5k6kgzs41kkw9o77hb',
                lastChangeUserAccount: 'xj9m5ba4kkuhlrgap2k0',
                lastChangedAt: '2020-07-28 15:02:30',
                folderPath: '2am22vpld9fjpc561549lhnou5en5qwdb74ojfefj6tslsfrzic2h0ly272l8es3gvcuxqfvc0qm09w39a92z5t3mlg4ly7f5scc707c2wj5dm7cxee8vea8749d3685sr9shh480pecbbzun7xxeq3xb80r53ag4et5rm5tuiwgo21j2jcdtcuw33ro6ue99gl1mrnt3zci5g9pkf897lultgzqytcoe8h7rkaxlyuaub6fgjdva725txj0gi3',
                description: 'yb23fob5flyin8pmkrxc7kzphd20h6yw222dyp26o6yhpe4pi2ckjg88kvfwag8p5w0kh3tdwiu71ocswpzxnrydi0efbwisooswg2fiph9crgkzrps5rs7pnjgrj0onjx19vqmz4exi58r5kquvfl3poggvam6gwuityxr3qp7a29ov65pymrh6vf160eauqhn5tbygd3eg5tiyw3cdjyqbqt734eh3u0cjxkc0lqcm4z75z84wjhm3euyfj9b',
                application: 'n8ioxqmfxk1zionijkdcgqdpl51f4x53ndy6bcejswdjjd214kp7z8n5lwf8',
                isCritical: true,
                
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: 'k6p1iwqmwf1pr01bm6cey7xjrndscnwco93je',
                hash: '44hmci3w5szw3a7oj6por49y12egna6tnzgsqosf',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '43ia3xytfb9wtzwtxcag6ntz7qcpiqywfc25mydj5a4qaazse1',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'hjhkbnjzd0gg3ic0kc5t',
                version: 'w7f7k4abmpyh2kjf29xt',
                scenario: 'zhxm5vcvpvvbj8gzpcpsxaj84jeehvuzs8ycct4n6ngno1qploxin7lz7k4b',
                party: '68kjydgsc8msbx554nef6bxadd1n89483o3lkp638ns6j1rgh6raupjvxcba47xy4voce39l2qn5znxqbieb5d579du6dcxjd8lsvctsxz39f4x71mgyvdrl6zei86e1la98cicl26jhn12sjp25fb5gd38y89s4',
                component: 'xhpf5fyrhq205q7o6t1wc2cw4x6f4u653dubg5602lelhjjynsc44nuai5uqvcd9f3hgjforl1vt8orbd4ax52jgnubmo5dl9kn6we86b83mx8fcsv6i2elknkbvgn8954v9zmxa4974f012zbw6enko57bd68bk',
                interfaceName: '012v1cgqq5vd4eywpxw8bzh521c47p60hc07m6n2gc08yuibjdcl1nmlveic0ibfy3ha1ivy24mqbknmw96qrdswesy2ox49ubnwrcg7dmw21kiukbcdqrbpbfzfw19hl8x1w5ggjzts82qxr4idbb4k2ops5r80',
                interfaceNamespace: 'ectlcklt8wyvuqvzli1m2sp5kcnx1s66sg4zxrk4ujqmi4jz4n62zuydwijkn7zt1kg6h36uu5c6g6o3o3keu6zqbqqoy1a0onwy597ua6gg27jzhoivqqi8fjtoahzkmtztuimd9mgt34obi6d5i5f7nc5p0jv3',
                iflowName: '45xm571k9zo7cy0ov8cxhs3vmlhx1f13ymzvvzcxmsgdsnxifi1vlk223ex0hjucox1qdeafn587vt2e2sjsg8lgfkpi0xgr6aejr5i3440bvu05t9pljpum22xe6fl7jbdrtg9jsyh7lu8z3t1kyjzu15ogf4aa',
                responsibleUserAccount: 'adeavdp7q4fexry6ymyk',
                lastChangeUserAccount: 'cfyoh1d1khzvl5t3laib',
                lastChangedAt: '2020-07-28 14:12:46',
                folderPath: 'kvdvthgv5veclq8fzgdrkaztk78rm5jtfi1zup0vo4a1o18xaym5t60h7sb91b35bgak1hp8ktdbpqol7t2o2iimp1sdm65zghjm4a163b7ccq60s6o9j8mef1tj1fsyz9oy3mnjzo19v3uosgmyru99ak8mujwxyo59f72ag94wvn69kfuq8sz4fkhu25dkvvpdlfatu1qp7u3g5b9i9lwjwolrdfpfqop7vxj4defle4kil5vj8bau249a6rw',
                description: 'utnmrs1gte6p8bu83g537q234lrfftbnpk5qszgf544sevha7gdfadk8lwtk7jtgk8rxok79aegvr6lz0nj09d2d7ok23nub1ei9ntm4b0d7kgon3bctph0b6sg8sbi73vseueyneoy4avihs768oerb83gmbc025waxktk30q4dpohyk9z3sc1omtz2oh9726xarrm8symcoicv2khzogwsnwu91b2tjnpp5g43o0flwatcyzdjoouz9dvplme',
                application: 't23a4fdfv6vu6ewm0cuqokyhca7ladnm15gzvd1qpliqt138wc9p0kid02um',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: '1t2k2l03jdzaht8ckrlhfrb7l8n7a22qgcx5dz5tw',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '9j1nrwf3yd75i6yf4w4kpg51ufrtt1nm37strl81t4b47a3kze',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'eufn6i6njsuf5zwlcopd',
                version: 'toguw2wl0b88g6e2xc0v',
                scenario: 't83yeqypzdc6h467h6x8q75t8j1j9v2oubtbu55pnpr6dfg2jdu1gls5dl7v',
                party: 'a5nfzem7pwwff6i24pcopyshsv3ii661977k069uve4b723svgokuo51epsvtdt0996idgd047g2f01xeidwvlb37xldxg9h99v7o1mcgedgq8ov62clgveahp4y2b9uk1cza447vh2gkt1ieqkwp0riy454h5sv',
                component: '2vp81cx74jvxwgaw3368j57ejscwhuwtlhtt79amq39o52l5pycufy476ofdnqkscrfptrsb6h4jg0dww2v90nwdbjvxn2zj8t56njtjzus7cgq8qeeofzpumy6dp54i4jt2ga3fzbakhxmya8h3erwaazb4vwjo',
                interfaceName: 'taqtdrkrbqo3jk5yjhvooqzzqvi0jhhah1nts5h8frmv1gaf070z7c4b7a5uwp2wgse58pb7aojyooz7awv60otdj3lcg06is1502buli7o83qzhqrbzpe944lmf0rm7m3uylxsaorch886cg5y09jm0l8u1m4t3',
                interfaceNamespace: 'vkn08t2n6sl9nxkzol7jluybdt181pnvlzzn291osb3fgpjnlwebnmfvkdumu4djdj1nq5qvk0y5376ksjsb6xvu2ozcfpcdirrp678zzqapntxqbolkr6lg0swwchlg18iz8b47uorcaff8u07ugui4ufzpu1q8',
                iflowName: 'f33xnlfvovgdnpp7b49qkkw8cb0z0rstl5clrhrgcxmqdrsfrdkgns7ecuzdvhurrmd18nt2hp93d8eegy7ku9f7ecwkeaoow1o1xghqzjv7mw9scjss6rlmh13xd3picjpx0ud2ogkdv9cezcfui7ck1md8kaw5',
                responsibleUserAccount: 'g0ek74f1zl3k140ilxzt',
                lastChangeUserAccount: 'silxggomvgnmk5eguh9g',
                lastChangedAt: '2020-07-29 08:22:18',
                folderPath: 'muh4yyopjdyhq6eofwzr6fdylkfx6fv5mgwhkwb0j20c7v3d6y0q1seiw0yrgngmjbmp7scc5dm1hhqdkzsywwvklx21s6fos8tghhj62bxsky9njyn51lfk3t1yxk4djpiaeeyw7gk539pj1rsxrfeuvomu6wadfbs8gtjrqog82m0x8iphyi0h2gapnnez54xrwlxxwiyw60u3gtc3bcaivi2hw39roz4m31h54mhp5k78mb30dvfo8gyxbye',
                description: 'ykwtd2g9qb5hlgdyvbke4hvg4kc96ccnyy5x16bvwje35oz81e7nivsq0auc24c7ko1ivu2fsjd2obcwzjj1jk6mqgvue4x500jc952t9p3zks2suk6plsfcilvu4xtt8wvmrp2gt18fcj2ixys5yr8cmj1746p0pgajlpv7rwtfzbszjwnawhi9yq3grzcrbj4gr8dgw0n96f449dxqq7sfctwc52b4t8ii0fg64cso1jrnroy940vx5ta8xnw',
                application: 'rqef8672ghx2nkc7gqs268fsnto1rkfl07bsnt4jenzvryim6eirj9whzbvt',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: '58rg89hc92sl7m92z65eh70b64d0id3v3xony2hn',
                tenantId: 'kuq9xmeebtb241refa4afwpesydvmrolk2s60',
                tenantCode: 'sb6nkt0acnbqldmi6zduuv9duzuj5c08ulz97kuszgys5q7f97',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'my1yav0wpu9cnc5cpwbh',
                version: '9pw00xlen6j2uqtsh3f8',
                scenario: 'afeanien1xb6zhhdjvq6ytizxtrdokuiwl2tlmbhn3hdy9y09zd67raibceb',
                party: 'bmxo0qo1ifbajk07vo5xel4e8dehnrbqp4mxvgmx0dynz3fq9p553t1i30fgh2dfdib7lxas8xnojrn8ydhh5v87jl2wuxc6njuwlv3gpjjx2vv4ex9o25x82uso8oikpqnbugz0ejchxis0syrct8u1au9fp1ot',
                component: '3q9q9ecieayyjj4yz49hw3h5ub07hp94rx1l9advmzlmz3aaavi0571duebrrl5vj29u7pr8hcc0bd500lhkqoq9ulj2q5pukusar815kfpfvaa2io0nyn0u0f4yv64y5i3avrtudvxg0vnk30rkobcu93i5tk5k',
                interfaceName: 'nqjxovkzl9h7zoh5ogp4h7v74jd0b72jzera2ctxaw1p7f08cgm20kicfonoxg6ad4z19et3j9ipqnnkx9ecrzxl43iwtamvh0lybir9x4dpr96ln6ckse8r53qdqphj96yay03kafq75w4lyly6t57yqmhjy6m8',
                interfaceNamespace: 'p26489o55o1lkhrmypou2uw77hm9rzn7ejj3a7axukzaq1n7y77is8g2gmfgvtfbb0jskr6qtu7egecq335l23godhiog7wmg67tzpj0welwrof19fff851x1bnnytlo1crs2acf696pqrn55iycisvz17t5ah2h',
                iflowName: 'a84vmn0u63axjmbozf2wctza11f27pbzk18i9a943wemwbeqaf3qlqgqwww2rmqcykhykaiad1umg5y4hbek0jhwq0ck3yy301uo8xnn68n7aalo967xwcd131pc3q31rx7lqb6eq5z7eukj3suu7vf12gicbc40',
                responsibleUserAccount: 'zdxg0vm3o7jkidb22j81',
                lastChangeUserAccount: 'qzou27q69ksf2yqhodm8',
                lastChangedAt: '2020-07-29 01:15:52',
                folderPath: 'uj702t0hl1nbew8tj0ejubi8i6unt3q3eglvz0rn0t8duekd31etp7nvsax3s2ne9y1rsnv3dxfgiyxk6vnyvij5mbfdromixpnyqyky7v0w5jq0vcip0mvhsgor7loo5jd68h6outl2opufz12igm5sibx9rhuy2fiwcu1vjbbsf6y37bsyzsl50a2ox4b712fu6q2dhq4934po3g18p6bt3gsirjgzmrxfbu2opngrpely7kbserwqgrs7269',
                description: '4e9eedfoffs2wvg4h3r89befh4io4arr9m6izcq0qxd7y7v590avxld77pj82pkfgytohahsrp9qi1f6lz88k895yu1mqhx5s2fff75rndumbpjel40x3rb641szrqt01caq5lt3lzrw7s0i6xxajf4krsi19r260n4l5dpga1hmt1bdswe940n8jhowcfsnalvk09gjqrz2g6uq3dzsd0mpuwwcunehduq9yact4rgogfx492k6gr2edhiflfz',
                application: '59xgbgqse3w21lve1zi0lcqrm14a8d0gc2mnm361n75tlwzuiqes12b530bi',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: '52feonw95awh1gl1ni59oyhbvn0e50e8w4rwa6xb',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'n65wltqod995zmrkmbsbl4b9vn0ev5g81b93odnc04ixnlw709',
                systemId: 'ywbf50iep6oo59rj9ftadu5wjutxfx7jaoq72',
                systemName: 'cefik9yx6qleotvtmutj',
                version: 'rham0sezf2782sfc3kh5',
                scenario: 'i9jl1ed3jqew710yovd8eddppd3u3bzaq3u3gp3wtlsmxouzwz2f0v8t0zcz',
                party: '4rtp2q03o7up00wi8suj2rmdqan4b61l1109g9nurc836vaong3u0743bdyae3efumex2tiy1bt2mhn4fhxgo7rlytayrrvhuhuffdpsx13bzfit79mw4e2bj02yg0ed5u1yyhhk2wkbp5avl62hv6uzhrrs8ei9',
                component: '25ksmlmqrlng030cbzfeurziazs0lmqjdrw7ioi4l7fjp75p53ko858x6lr4qdj333f7439t2toq897ykq29tmodo7h8haeoox6tjqzhz0zycpvwy8in0z9dzvbve3yk2bz576bkqq1u0jjqgvl69ksunq49cllf',
                interfaceName: '868tqg19rykh2ytjw8fjpbx3j04ffri2648h9to3hwlqddxhuogu358cbsypo4lnwzyv60s0hyee4ihcspjn7wectn4q2po4mlpgxo6mddk7m2es3yjbbzl042r53x7z30y9srx9f6965wmmkki9oplzfuopyvi9',
                interfaceNamespace: 'kz7jnqc7zcjg4hh53xvmql7o583u59orvzakxtz0p7s87l1h60673q9j2j7aaqr2ka6qsl5s4ssk5ufcl38j92wzav267xxbyfk3bd9flwbho1cwz3gsa2xorz0iz9v61hquz0t9v0ug9pph0jseh5j1tcr2z15j',
                iflowName: 'o1csno5zpxur9f5vicu6tcn3uyzvf9enzod3pl2xp2n593wl2wuw8q5m17wfs6v832cpoerrvi1womufueuxxkmtl8xxnhgju2y6hyy13m77iu3kx149sbtdtu0jtqgldqzk05he5t8q77t7mrf3q0czfgt5hh1d',
                responsibleUserAccount: '726z26n1ncvasgi0ysvf',
                lastChangeUserAccount: 'oms2u9c35dggl26lqg7j',
                lastChangedAt: '2020-07-28 17:47:45',
                folderPath: 's7uvn98ul6d5m2y8o2552td7468yg5pj799otba5ikk0hpjcqip0m38eqlhrnc6o1o9hffh6bs23gqicen546ivv4py71hg7cslazsxylpc6kohgti34isk19jmerhlbyz438wmlr0k6djdh95kexmc9rnn7l21epebcv9rk0p4schgxemyxgarokh718asnd6c2kef7j3spufg0efe3d40i9gggnctd4hamc9vhyolblm0d7ffgtlx8amhfok4',
                description: 'x52nhw3abuy3p8fmu6bmv4twx704ilauqfuynthql5qug5sp24inc8iqngn8a14o6q19pxj2me6uxwh803rrl1rutgg1f8qz0f5j3yjo60ksx96cun7titvlbzyt7egrdrkfim1776zzarw7axdwja3t0rcw74ouvgi7yeskkx2kkxli95y2ycsw7zq2ffbh0y6vpcz8ob9q70pbn3kshewshlh797dymjp43yvadbs9mmzpcglwv6w8ldqhmr2',
                application: 'rktvyehfx9nuspf7cnl4ett2onlw8fzwa38fbm263p4gjhbzm8hjvjxglj0y',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'vl725zhm5pqabvboq92b81wo3q9fe0fz4madfoec',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'pz78biztdav8sgd7npscz6uxi6u8ngernqchptwpnh4ifjc2k0',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '5yj2wgeq1d5rebad8f9n',
                version: '4gudz9g1pmqsihh7tpa5',
                scenario: 'seuyw0m2k74gyemkitmh4gn7641kotu1fs88oq2oth3ynsyvk9o4guyg3m17',
                party: '2l8730lj0ms4ujfw0ps9zc77nramm45etx4yve98mue90f0sydv86qzm9r1i5neqemj246am5vk3ryx7c9fk9483pgbmz148l37xyhmy408cl6jpztasqgpp7bmu2ydw8y6g8nczoimdwi3acffkh86kzn7qe5ej',
                component: 'kr27srrmtjcr52kwegn9k2thkynrhvm27zrc90xitw4cjdbz1ub2gtb2mpvqye6jzswmkazl1yikzn0t3mrpe962fldx8rac65qn0h4t2lmlntem6t2l1fxlc8s06ccut87g3f4d352flcylywo5t0ruazuo6p2m',
                interfaceName: 'xvdtcczkst0fy8sga6bfzcv19j0abrxo1rauxxtt13jtb8kuxbff5fwwqaanpza43nej7ossgf3o3f9n7rczts0mb7w7v30v35ezgt7plmhmysv6yq0ngprxg5p9jkuo3fu055ko32rekzdr1csw9engtb0f9m8h',
                interfaceNamespace: '39z4miw7r52kvu6qftxx5ep72gpquh8khkpsne3l8cgafitbwcuh84ujsiyyq9xc612tyfj0w9yloouqwtdw8vclkdlcmq0x0i3kfovs1mmwjpa8xivox3k42f08ua8yvovlc5oxmezj55f5dtqwhmvf7yzte7ln',
                iflowName: 'sfl9pvylxdcm4ihhpuk9v4stoklx9ezjouojilj0wfiobbsshl80kw90r697px5z2ka0ae0dj83k7h52s8alnolmxelxb5t5d115u02qzhltz5sqsngn3p6m2hxj1bfd5pxqc1fzjn4iwvl4xmbv0aq30fa3jjir',
                responsibleUserAccount: 'sgyinkyrj36m2xftmp2r',
                lastChangeUserAccount: 'm6stjanur298614tuc7u',
                lastChangedAt: '2020-07-29 10:40:47',
                folderPath: 'tiflkiq6m8lucxm6vwd0r30vmu57zo3aqu2wpcwj5ymq9vtbahtt62j6dxxtpg8gqalhmapd9mwlfma4zhd9s83pughq65r48a8vsphq69316hhx9eo4t6j6sv3xg0lk7yasc5q5dzm3sstuy96rl7iccjtr0upqrib6d9q2zy742hek62r34u0w64rd75p5ann227cbfona8yy21zsdfie4yywmi778m3ccjh29lnquzyctzcht2tdf14ctt3a',
                description: 'am7nhkvxbwykqiqcwvol1934lwz40dd6nv3yzbwtyefwdcxhlw8s20xhw5qv13m1bqk67q26rm5fn2ldh5cyz9j1w25vq32fbpmvhjt47cjmyo0rq6iv9vqh0lyc3ubu8nmgena59p3aifa00swr95ek12rky3f3mtwyre5dct1r6wn1npwz9zejfkuh6ezrbbnx7n5h4rez5zkh7nkst4aszl0xosc25avpijf6sktf514klyfrxiyuclfkigc',
                application: 'cw7oh4ce1isgyiaamsnq3pims3n0qkboupr46hylz50hoz9iofm58mgzgau7',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'ee48g0neoq2ofdc23occ97uodp9qqzaur2dd3',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'pyto1obw7dnx5kditdfytofakc1kl14ines52crf',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'yzbnlhkxazsv61p0ob9w7p15wc03yxpmi2izb06h6dd4rt5d5nx',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '355czrutt9wgabz2gz2e',
                version: 'mzff73pwyecq9mp5lbim',
                scenario: 'q9y1m8u59vky139d9jl9dkjw4q1nm1inqq9mal2oh4yi9u6jy3hzo1pbxxxm',
                party: 'j97mltqcwqam0ae0gme43881d1bov8zleyiughl83ri0cdonxdm175pu3zv9slb4plr60c4z91nly31c7g7zwnwakspgedm9n2if9onl8gm2bnbt4kt338kuqif7d67t0d1azcoy69cv3um57hairaq60srzxz4u',
                component: 'z2qzqpakd3izi34ylyhzra97ukgmmqsi7dzzoku06ie4gn5ustawus4tcqjw9zqt775tsbn9zysn2afeboojb9gpj05otje9o4plc8ocfbvlo5r6x6s1qhgg468eh948x1omqebnpfnmo8y6vuml9cvsw6o92e6q',
                interfaceName: 's6nl3gdx5uiwt4qc4lna1vikt09akacxndsyutjwgr9zyivrpez9luupmu4wozi1wa9aipja25muqc77hu4taptl5mbskfccbzwr4roqxla94zv4gky0fct9r4sovn9815od4nf2385wykhanyfur2qkkvybapd1',
                interfaceNamespace: 'o9tueurlqgx78eccpdcq6pjp3mkcbds2ncysa1jp8kmqrom5xzlt6udo8ioa7lgjk5xstjvcid50eij0jtewq8vzhfrxnp9i34026fvyy1pbfhnupjvzt979z2f9ur1r6ch3wbpgs50uffq3yi1184srx5cxdr54',
                iflowName: 'vm6d1xuoq22i08o5jkyfx586xoqj2sdt9cfewhr3mspl19x76n1uyy66og7b8jb3npdoi17w9csyxid45r1uogb1scf6b4u54hdtrpqjht4pgycotufm2rnmcgiolxry1glzjksoiji08chii0pcvlpc380du2kz',
                responsibleUserAccount: '5jhr1a3uhhu96gxg25ml',
                lastChangeUserAccount: 'v1y3zmgltvtpuscbgh8v',
                lastChangedAt: '2020-07-29 05:28:05',
                folderPath: 'q88dcwfw97vk0qon5xpb3kx6edkybo92qezloyp89c0umvxiipyunq966k4uc59m8vw3dhuciarpkmtsqwvkg6go1o7whxjp54mpm36wc89a8t7vol5ougnegxhkswnsoo8ro4ephjy2c2nufttwsz293fkrjc7f90foxgh4f8ifqev8pbwrh4p2u9h1k5lkdu15yain8dyek19xweb10ox7f96cf3dsmw9zqe6lfbypjfk5z4xi8reslpt9vnu',
                description: 'lz2jsukgdhmob2u9ad9h9w21qcxvxq8szm7he0z9e0fsjn95pojybgi3m3qyetpg22adyz9blb7939mfwz3wetmscgi4kwaaufmzqm58yz8emkt1a0cpiss9g1w025lmjx3to5nb567wahbcuhm7sbdrhfcqpg51nqza9hyt6cq20nhgm51uogtd2sd72nz3k2m6d7pbi6nlqhho7zez6cugxxc2fennuzh6dkb3w7lt569ene9tqiaiqk4i5vj',
                application: 'prkyn4uvulqzldmimxnh4yrvhxchgvihnb9eplser7ws8y7ool9uwyqrns4d',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'dtjmnud4sncqeyda3jhty19hq6etezrye9jky31x',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'rh5gb0t5efeo1ft2q5md4p33wbfv8ociieahsmwta5bsx37ek5',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '80cnbeehh0x86glo399rp',
                version: 'tk0o7y0tnon4aa5zznlf',
                scenario: '0z6ocdu81xro3euxgavmu8c5jnypk5ia70w54jnir82nryai5jfr60j5pggy',
                party: '75a3w0db82fv1rpsojjnjywz83svimnt2dkb7pu614vhfx059mbeg9n6hjgqrflhqg6e64pq759ugvyqs3vz3om6fjedi9tucznki7x7ygexw3adsr4lfwh5oz7ufoukg50paaj194cknscjgwn9u94ssewprypm',
                component: 'rsub2fpt20pcuz9x5tzn6iv5gvwl9snil6vvpw1vcyaxxfuuy2z5235d0o9c6f8y8ieq0q0mp62b6eimsphyl87d0wqchqn45xith148dgzwnfscd7mtpikk4uenltqqya8jx79hhu4bh1hhhii4c0laye3sor28',
                interfaceName: 'p9u6veu1pxm1v1sgwz9nxqnx5errvt9bl7c1bmmwkbeof31uonxyw9ly3gigvyozzez2r7f7qzeo4kc4iu03yec208wudz8xt37iv3w6xn2p5q64z4oqf26qmmbu5rxcbxy8b0dbhepkdrhvrvh83mco5ax3gom6',
                interfaceNamespace: '19b4nr2wnpx4o93adq6vxojn2kr0n7v7kh7yebjwh94rvuh8rslg5ogsl6w2tc6osfppj02cm52msb98v4ua0e0o32wk042p0xefdt3x9wvj2hc45hmeiq74hkchs5qreh3tl8lshtz7cymlgy4kmcwnp512cvnr',
                iflowName: 'idtlmwpmkyveqiabjhl8zvazppgrj7gpa7a7j4eej44afe83qg61x0hyiac7inwg1xtm98v3uyp7i4neo2sqwqxmmm1ys77m53g9qvm6ftgp1gd8tp3vb6bb5bkf2pjh7trng4r8i0c1o1tlyaxe2rsl9lhcugvh',
                responsibleUserAccount: '4kkyd8spbqzlycltcg7x',
                lastChangeUserAccount: 'hglgd2itz3kbl690bmdj',
                lastChangedAt: '2020-07-29 01:16:31',
                folderPath: 'fj1eg8hhxb3naffbl827q7pofvts7815m623afk6oozjedm1z1vhmcyopa1ygper8i43ww0t1fg42vcaz4c4sagasitxmqxre0558jlbykbym3nqozxhyqq1503aeje638spto99a9pz03nbam9dvx03ovys1je55w155njyls4j6tvjd4k7usk2k2kndu0yf8581tj69i0e9fdvre73nj8lh8oqe2rzxhto1cxiu8q4z3fur39b0caz3t5vbx0',
                description: 'eep0wmx3z796ftkndmm8nlw9rbl57u8ub4x2tg2m3tf5j60dhae5itnsg16cispmrs4zho6bptfxlpvvc9qznssgabf1ehsbmxwnynxozpqgu9d1zxy0k62xf6qeec9fyh4a4q2b53i36632iossouxxv0h6a35dmnpj81mnokga2zg3stmwbce6jeq1qvxst8hxbqo2549sbye8bifamy5tyltc4iuw0twck0gf5ml8jo9f1icn4syi7qg9hgl',
                application: 'xlpwggu7a483r0j8s48sxhi91zqyjgcqvguzmhjgr3rmyaqwz5x4ukj2er6g',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'rqxco2rkd5o0sa98ve76sj9rl8ldiniekbwroc45',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'b7jrmg823zvnpce4k2he2qq6aiifn7zkuwun9zfnxz4ypq78g3',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'w1gy041pbgya601ja9mf',
                version: '0xttyg60bk9e491yftige',
                scenario: '7etthw2yg17hanuum8aylztw6nxptr7qmjn7yf45eeak8lf83ggjxx7ft9jj',
                party: 'jh9z6f65wjtalo1h7bgo6ahb2t53lm4n4idnv0jhuswvkgplb7qrfbyayjwwfwnref7g9j2z01e9o0xih0p55u1446rjk3oe09km8v6amth9od55o7ckkqinrlajcsvpg322e4qsavv59disnrp5gtxmtodya4hu',
                component: 'blw7c89z4h536vum136nf7ngos93k4dlh2sxgd7yb8pcpza1b0cpaut3uf3lbs6qwfl9k2h5mfq0pgv89xy8yvxqqk22ufu003y8lsevbey2kpjv35ba8470ym3n8esdatp22hwd3e4zfx5yiydvhen2g662jy6q',
                interfaceName: 'm663eg9tm9qpgbhw3tv6vcdi7wyz9ls8nqmqrrutg1i0x2hrgv9fs8mn9o9tclxkpx3hjsr3a2qx3jaw046j0u346d0v8d1qu7gkbap5jufbmmjndnwjominnt43g0tjud9slp0tdq0lk1kb7x168o76zzv8blpm',
                interfaceNamespace: '142y9wdo910tf4dq6siyjesly3eynbxchhvf6102u42wkhp9irg1icirqvwihgbn25lwspkixjc9clg75zrlictpafszbeoic1csp66atrf6zml55cupmekoofqvxu1rvoi7i3gmy34qfbfv4uhyf04j9iaaqu5o',
                iflowName: 'hqbfnp5e11i4kwd20ac4rev05ttc6kycstfnk6p6h3hy2hmacp73igpjsx3xock9clle7gnfcokwr6uvjxyyzwsmb9ptw3v5m9qimzl15q1ncgv4fmjt44rna9djb2dv312kqxo6yl75e54k2d8rsmwvbtu1orts',
                responsibleUserAccount: 'qlyp1r5a3fj0mbi6za45',
                lastChangeUserAccount: 'amwsxw6eat3sqobsppf6',
                lastChangedAt: '2020-07-29 06:01:03',
                folderPath: 'bccls3bjb8a5j43iaehbrp8m15yhuh8swq4i048zhz2favvo29prjbbadz80n7848905f8h6frvnpu1r28e10nsvlvg6yobpy4ipt3v5yohntjdmirtncbjq8o5eys257d63pb7nci27oouosk1fwhenc8ar03bskdf7cymsao39p2an63oslqnlv6svhum868s8nbgqkvaxbazfiv02tmdnm9vdkt2miy8gel6f761v5xgr3jbwr29qyrrphrv',
                description: '1lx2j61owkvclyawzsmvuzqlexx4r7bykxlyop2ktol4fi8q8zmxen9q4axcngrlae4pwt5hcgan3oziucijjsow9vonlrhshjkp9qcpnq0vw7bws15fej1j4atfavlv3h1d1et0wtaq5p31t1k3vb1wrlzd4gywh5i5hdkc1yckcoecxdinjc6umulfor2nkvopij43g0g0hz1bpxt2on8ko4ujgfskpg15yyl96xlor4ax7ewullttnj9n8uv',
                application: 'yd5cmp3hzfvd3x6f13aeoed2aqhzhn0p7ber6nep5xfe687ip5otmbxjmb0y',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'ucl8n4lotdiacv45d52oi0b2788w6d4ok5mk312d',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'nv143sr9wdyyiskpb1j9b364c5syfa3ouqyt9lobgxmuxq7ql8',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'a05e6efmotg6a6yk6q1d',
                version: '5h8ostyh7sf3ene02fa1',
                scenario: 'get3zbpjnno2xi8ti40a48xco3rez9dhwidhaxjl9oj0m2fx5y9butmgl93ph',
                party: 'pg2e9zxw3woinh11t2dtmjbihhmn4zrxulv0bvg3yp5fxofud216khsnppp1d724ddu8irkf5lfsflq4txpuunm2jwm6mb9kxn1xqj1nshvti3uq7py12u0rqp2tqcr5do07augsuzvoxb50v0kbzkqvkqx47uzb',
                component: 'o2n2a85ebmsb59hbyxldd8ep159hly47xqfnn5l0hbupgexxbvfs7jseobpv7lgl59adktd0us7gbp0cfrhfp9wka19zo8tb03it1yp9l6opj3vwxjxhlahug4scb6cp05ygmeh19hsv1ckvqrfemoi4a476aj8z',
                interfaceName: 'zuktp1l028amd9k9takghiwocc0cjotlkknn2a7mf1iv2we6xcvf6jen4iqqu8jh1selw5iveir9ubekgxknnc45d7y0dsch77amdkfv17bo8d8fn8odmj3xm7wp2096lrz4fsipcnad3oncwxuccwjmirw8q53d',
                interfaceNamespace: 'i86odoiqhfhdlp4dqygwdthflx5bdp5jdlu15ryrwmbdp60f4oucu5yt2w6vja8lcp46o4l9hujkpidlh0471zx6pvnnrrjxbpjekui1holn2c3jvohvnfzrb4m97mxdxl4o2fw50k3m57ng99d85ejnw1fj5jn4',
                iflowName: 'ze0s1epkuurt1czuy6sspf19cylq7hm5nicp9qox3tesuoamtpbn90kjtwrc5imq4a20xmnwqp7lwtzcee0hpliw5gmq1mpr7vuly7nxh38orw1lfq8mw0sh8rn7k15rh9m3bsb7hdcmtqvu232vkyohszh4b8tv',
                responsibleUserAccount: '54b47dbzpc5i71j8oq1g',
                lastChangeUserAccount: '282r4tqfm4x1hins17r2',
                lastChangedAt: '2020-07-29 06:57:13',
                folderPath: 'i6pujs4k4chuutb1xlwow3ddkwbpzt1ca2rj01sj479wub2vi5z1nmclhfdy6jmp1oec498g1mdsrus824fg04iw6lzmzy1fdtjxd3axfi5wn0j0wqte4jvdldsolinx6s1uqcdii8w51df94gifr8nvm8n8szx0oshtuf31vs5a771pg29qgqs7e85m4uz3ykglm6v5o0m0yd3iycmwi9hydkxdc43o5njt8xqdwf167wa1ouvfcgl509w4k1w',
                description: 'zv8tid1y2v6kg3uwaioqv3eh2yfkjkx4140p8fqresfxh0sdij8rhinwmrzxlvojctnlhbzxn4c6mkfaks8j7cjcmw3xnywjlcard8q8slug2itofs4pc7q6e20ykr0nhklrmf4ndm8v3ldow7ht2gqf78da87ayckt7cd3jmqgioiycirbjpbq1mowpkxbdccn16vg4qleipeyz1s01ryp81kp8e8sqjavblnbaq351d872reoc5lor08fexfp',
                application: '34aoagij2uazf1ynvb1eze5o75k0mnmg3by3rbdmz1gi3luaj33nz1pvnq2b',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'ijjym837eu1so91s4u3g4hanbdq46asgdl8n534c',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'cvh7kw91vfhqzwl12z643pknsvocgg0bsnmbvsbuxmjm3p3qho',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'e3xuo03yl8rry58kzvvy',
                version: 'bo6cvuxenh49f3fw22rj',
                scenario: 'gg5km2bmcbc4z8ifglr9ookdq88vs4nskpvl7gr436cpqvoz10hz5cjrn9jh',
                party: 'zjokbvxjk5nff07if6q12yldsfiwynd4dljtobvnss6uxhoxaawpruxfsci2fuq75yvk8iy6m1y8txfjy2zi5tlb9e2hlyp46ndhi7yke54b9h6nhnvj2ug5vnunwti6boh24si5hvchu58hdt89mv6qrys2iepq2',
                component: '5zdctk7gval2zjjfem94y5v56e0vigztwm9bmts943sat2j6eoqhezryepw2htbqb5slc307jqe7pnh1ibgb4zeeicde0ah6vwiompkgd690lehmaq38vt7btearcxkkv4htlworwfe3jn65ndy4l2ujreuv5ib4',
                interfaceName: 'flxyy9pujm4ul6qvubedgqeihmq4qyhi7jbaixagk4p0wl7ino5qothmvh6huqri2zpulxkpg6xenyoyeks4qvok55cjcbslv23kdxpumflbuhnli4a8dfitihkfjvyig1qjo1irqcln24jgyv1warzo52vpjrj9',
                interfaceNamespace: '9ba2x230wh3uw932xrfpkl8p0z5yrvuv73deyxqlcidgmvpkdcl1b7vzulcqhvsudulne0w0nyh4mtytmj8l5rjo1m1ksqzlpycgdhtkhziv27y7f0j29ejw0yqb9xukn7sywuc831i3s91v2y7ol8650ec0g5va',
                iflowName: 'sbiloz9gdm0g94nj0y39jzguv7nholltfqwes89z9j2htlv0hooooxekpalo6klfry5hxhouz8ndjjsi9spaimlr3cj9v4bwxpvu3em0jxt1cr1pqvdkwmt78ql0vsnx96pkwuc2aw32hrfsulpmkqs7yrw8sbu1',
                responsibleUserAccount: 'ozd8hhie6u41ruetd02r',
                lastChangeUserAccount: 'nhyxzk9xzrhyzrl20x3y',
                lastChangedAt: '2020-07-29 09:50:37',
                folderPath: 'jpd0mkljvsj0216fha5zykvy55ep5ifaispt62ws7ioewh3sk9v5xal9jqr4e82r1jrkitv8uyxae2fxygqrtxvnlcefbe42sbouubsu4q82lk8w33w78pon8lxomwjr92knotwrg7g9cdiy0ffc0gh9cchlgphmzn1yict31jo5am7yrfqndldunrq1j6i1c499d70vwdawpt6nnrf5xfypa3bwh9xr5mbgyzb9hpg5ldqefdlhikwxdhejxtn',
                description: '613fgp829wyf9j88p4mk6e9ucu9oufxrbf0l2q5m03k8inb3lfmc768dmf532exopav1a38c9azdr16ab0s4ue58o0al82i1cgdn2m09romqyto9w0q5tgm6tyq35al74rrlg16vw7hv9bkun0kdhc67j91e5ojnwg35gx4yql60okmvr3zuw6y2zntc449eqbq1p1n6fy5b1zxflydx0yzfdkmawxieoavtkqd4muxf9fj38w3suzyo2r9w6n6',
                application: 'zydoja5wdxnxdg82wbcxwq3uuskepw6w3s0hrfkh61gg4ghmzmeeyvvdtjca',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: '1wwukz7vet06aq0sfe046lg4wrgi04enmvned6xb',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'r6myrtguqlxpd0enepj4aj2jdnqjvwqhcu8g7f9afazu3dhooj',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'w0l1fhujst5hfz225ghr',
                version: 'qwkg0o3za8iyeiwp6o69',
                scenario: 'aowo4hx735c2q6x6nfvddrmotia2gwcafcd4v6lcn2k1o1xsyes2afdiyaux',
                party: '43tlrogqvkhsw816hw8tt7orwso4x17hnqt3gxzsk7aekt9dd83kcfbk7r608lvomskgxsg0cxektpoc0iz1ihu2wp8znhgaul1kee5v1whvs9igrtjvns6zwrc5iqw7pmnb76haz1i8fcltpvitghuvsag2xkil',
                component: 'tueu9heik1520tebdfg31wbs2f9ty99r8iahkuzpzp0ep73dny5l0tmbwwknptmftpddu8gyqfs3r8yud039gpbnlltzld5hyheupwmsp2i4mkcg8o8fdz54kvem90t4m957xk9z8pnz3x8djthrkynkwjmyzq4st',
                interfaceName: 'csajnlaftdsvzihj7gffvte771ar3lh1unotgxbo6oj8n724b82jh8zate2ftcz814zqor86ilos6o7p2hdcjyolywvp1jztx9f6lhfq735mixykbm3u56xtjrat6yrm0air58zq21y2k8pc454e3ef10f5d0jat',
                interfaceNamespace: 'rk5vch9i2ct26lsfl0radbcnwsvb9h8xpg7crhtekhkvmlri609u4439drnf5hepcg6vsp8kbscv3hx5vj1xn9x4x00zwinpdhnp6wnwj58dho1wj0jrtzajt8h6mp6fxa7rqtn0qhsms6fb56325pd9l1vd6cvx',
                iflowName: 'ogb7ba4cbf77kg33qk5qq6ua0068daf3zwnpioaslbj73i0d4cg0rqqb297bqwrii7ls83zhwyv5gsba6sv9cz4huqrbxuhuv6vinky8im442svz5ed742q788p0t00li80tlsdpve77ct1b5hx7qrjahe0p2be3',
                responsibleUserAccount: 'makvkgaj4q3c8wpfoebq',
                lastChangeUserAccount: '0b7eexcsgcnzpp965nw9',
                lastChangedAt: '2020-07-29 06:24:45',
                folderPath: 'p87j34uy74ezr9d8qxe9wib6hub63n7z2ext5cr2w4ok0l9qsdau99rirxye1od7zmfam3znqf3hwcvad4st60fnx7otyp7vu0f3l7cydz4lu5o6r85w0y6yiqdi0e284lcga31xwqdupb0x8c2mi2pungn9ilbewve8p6ybt8me1nb2ez4k6ay1r671sztfdxekmqxdodmziuhy2dj0cnzdgzdwqm48e4mi6el7slw9sjqvncb5ci3glh7tmxp',
                description: 'itsxkvm5uwem7o619tt4khmwia41zw2xjyp7k7mhw4e0m5zxdumu1nnzpqqkv4xaze1zwoptqry2tauk3p46x2n5n18opzwhuxptyfqa80o2iabtn87vdzuxo44m2jdtp0birpsuglankvgfctpwx4611mqbeu9qcn8s2u5yn8cnn70bu56jn2d963bcecnmifcujtywjuuhuqno0bsj11gal9zhm78scw4hljq31pphmmn7rgpfcebg4pavmd7',
                application: 'e09q6a3695t5wo2i0xgp8kg68f778d1q8hcr1k8dno4pxirn2bxrz49mmg8r',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: '4df8h6j3k7d8f56uo08gbdrvmsvmdbi55v23qtog',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'f6fyvq2guouke9xrb0tzwnxok85pxmzl49c7e33o6nescriel5',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'kfszecq7afys02tjh8na',
                version: 'gpvleux22fxpcue4s04y',
                scenario: 'u9y7oca2mdogorbja3o4bibbyo3q4gh5dt004fir8uzyp10ad1zypxhjurqd',
                party: '9df7vm3ifn5rd9odgnrygf7c8l40hoe3pgc735q55e1o27yqapuwehrwdruzuoeug9upxhqejg5scacv8vfogv4rfu5rfa0wfk9znd3w2v4qeto076veuacf8p2ipnd577n0rfj8eluy16kwk0hov43zubskrft5',
                component: 'ld6qcin8crctdcnva4k7o1nqe5d8db66tx6rlfyw5qqmzve1gnnsqgt263rtkron6onhlmxn0b24gza5kk9eo6z41fbcaj2pc5x2tbp0qjbgkhrx5op383b7k2apn38xpo5691nnju03q2dopcylyctqzxhn415h',
                interfaceName: '6c7ejsfll2a0eapjshjdmvmsr6tuw3jp5bc1cuxtttqpdo09euqd0shvw3gq9txf31m2gwzehk0k0g8i2zhwcjcnc2z7vqhejue0uascka1kw8yj0egqy3hkjlyd2xoqvm4sewsqkol8wce1nghhbbxvlcs5n8x7e',
                interfaceNamespace: 's119unbqlbojvfwmjlcku7608zdsl1dtgqnqof0q5d7wv8xbfgv4lp9o76c4x025m5pr4o7bfaylmmzcul7hp1b36vl6176r1g4q05st23be3d1g8n1m016vnxg4smeizz2lf5bxjb0xcv8k83d3hogw8g432yru',
                iflowName: '0lx8mzjf1k6cpisp3gtq6bw4wt08pu52fg4gyu33ptzxi3odb0pf5qwyic5s1elqfmi8yk9s7b2i66x4i7vbv8sgrdnn5pxkesdtdtv7xhxmdd9ff0o3pc5tgw4drscq94wrxzujvt6anm1ajtewgiwo64dg06fh',
                responsibleUserAccount: '8gskdmdcxr7unw3n6trj',
                lastChangeUserAccount: 'hoge9due1t6p4o2xj385',
                lastChangedAt: '2020-07-29 09:33:07',
                folderPath: '510smlxnshrjaxrazer4z9szdl8qcdrdtizziy4zohc9dk3j0llp63bxfrz8cym4jh06t8cvsjscm04udboeo4eo55ug8ajw8mnfl6pkkxkb7d0ttrtsfe1viigxceu6n1ns8jl03in59wbar39rdhdz4ha6tluzyh5p98hah8epl1w63dwamverr4bj8r0bjbo01potzz0i8ochbfq32pjufxcyj0d7gvlagmjdd9gv6u94d4zbgrkz5w9zsx3',
                description: 'aj2mgrqa9wzegqq0rdccjh57cyqd4r3gzkn4r7u6xuyzgqvauidwirg3bu01pfchuidun2kpetza4429zu87qytb391n663riyxgsb7k70l2w4navx1u8mwxikak7v9ogmukknihunjwqxo6sgit1ed9d1hzip6hbymlico0n19c4d9q8zd4fm967y7uxw8qjx6nowsu1ve07xu5mkkr57w05eja0guecsx1zrwn0u3zzf3rkdbeh0o4cgtvz0h',
                application: '11pi0jl4vf9zp41akncqv610emybdu2iryba58osfw8jv9v6zme7t99tk6c0',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'pu556tg3hq8l39f4940nam37bagpucte0ll0gwnh',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '29gf5qmwxu68ydysibql1mvyycct5ictn2ghuouc6lnwvt6xfs',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '7dolqth5vnxw9nmtg472',
                version: 'z5z6toi73h7a2qxvki1d',
                scenario: 'ua7738lrs1cc5ulei7qgqheoe7ud932r7tluj766u5mxoisefqiz9wtngdqi',
                party: 'xm8vm61uv42nbg02n9fqe8gk8w7szp1yqc2ptdce6p71tpbcgy6ucfb20szi40j8109l58rks2j4zog801h3of1yilybvdrt72gck27sh42vll0opxi5yy2m6yshxjznbgicciim9naklfytgp1k5gu9iv6dq6m1',
                component: '7xm8o3b20refgcsbs8eamhsu85eiv6auyz04uhy35qgp2mz2k1ulbzym40uv7zcvczd015sfbxx5y2rxj3n169k1ylnlnt2p8hlncukthhuuq37jdwt0vbhl850u0loxx544j5ok9jwlzs5xns47sm3g669und4g',
                interfaceName: 'fpit83yhedwqjddwu2xx0hk6wy8sgjgr1t1bnp4l3pnha66vnu7qssoi0zqcy1i48u57lza3r0kzeagh95onqekwr3p27bcxwc04uj0yeo7qp750g7dy718i7vyjolm7od2sibz4tu51pwtcgucectva41mceat0',
                interfaceNamespace: 'gvxvzwhl5ofppcczoqfil73dmb1ad1wrh4nbq5h0i0ivd4798gic4q3p1ubrtu841kyqcgoului43wufdpv6n8857ddi1ak8ckclf2yplgf386sckjbpht6cpvoj2pal47smzgxi1oyuo16z10q6q1num8t6u90kq',
                iflowName: 'eggc1yeydjwt89k6vipgnbe0rp14dbxwnv0ma99h63u0r5yk3qievmqhly39nrprwdlgmsgw8wxapu6urggst22h1jl92jgoxxbebf68orqw4ethdrqbj0699h20rbwhb5l4hh6i4gl4cr3ifjwjz86j11wrf4j0',
                responsibleUserAccount: 'qvr4rulzr27b1tto1gb1',
                lastChangeUserAccount: 'emejsjhdoim5yx2z5j6o',
                lastChangedAt: '2020-07-28 18:50:32',
                folderPath: '4wjxzhpqpgogfhrdyayskb3wexha9wqquq1gsa01iw0wkhc9a2k6mhnclgbh3axme4zn0x70gefl2vptakre3atu78bm72le9brv1opoy6r798mg91ugl90xukbmdj16ct0jj39ys0dtecjgtluzs24kqnbkf0og95w6vpzn0gju5rwj8uxpg61ujn4oyw6u3dh2n70ka32dgn0w5d6ob9llw18zjq90g5ly62gv64yrp265jm9zh3v5xyjl56q',
                description: 'i0pn9ti93y48t02sl9vhjzatjkry08hp01sby78r9jjkiqvwxp3jz1lbzaj06f0zjrj3gof59v3qng98l4vfwrezlkvg30ucov5u0ye8mfmcip570l7q58l1mja02zh5qzihljuf5lchvwyo7b7asascvzkq8pz2makzz4h9ug3z5eqzzj7sq0crs3ehp5bhwb7y8xd3jlgfcoonovhv2iigln3u90gichfre9nx9h5z3jnchna3pl5ndf3blrh',
                application: 'jnbclnvcg2w3acl1v6ydwjy1gj8arbt8rdqc5ugdks8gsobqn8h3ne4iy8qs',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'zptpvg34my2pi2pclh7vftc7fh1gbjiw3duqfs3d',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '4kvq9sffdyv8s1v2f5vwu99homa05w7nljaiqcvera81jdy6ns',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: '1kk04uk367uikonwqc3i',
                version: 'ggmsqc9qg7s61cuxfvyo',
                scenario: '99xdl4y4sl8eu7tl2n86i7s9qp2i6wd7mi5pjb8sfyp63afvf09v6hbuv6pv',
                party: 'nqdl2ir221aw8bbm5bakvv7ovig1bt9tcpp5peexri4eqnsctounw3myjp2iy4kgmaen06n1ffnc4yfri0xgxwfvyqffrbc92m3hpziyh73s54jn5erw5ivwey66kch0k4re814beliqw11mofed4fbahjzy7vxo',
                component: 'ez3iigv0q1fwt5eo8j9vccau10wdqj0768kb45coppmjnfbubzmjy5l9xr3erfww9pdpatywd0nx9yhe5ub59ss3wq5y3msbjhjt7cclvndyrg4556x91nt1k05u4fjaaai9qravxph0zxen6cjgjm6llih2igbj',
                interfaceName: 'kqkg9zjntsw0gwdxv1rk3czre6vtt5ecbob8nhf2thf79ioxft2y6w1bqy6edkoijnzgrp4oqnz3zz3p1rmw9eyh4owbyfab7gcrdk5wzpfxm8hqhoyuuepxitj08ai60uu92g7i09xukgo9kqwrng3q0th2xj0s',
                interfaceNamespace: '9mdprvharyio6dhx8ghjx2u9wb2jgg6iinbms5s5tq227jpzpquj3r5h9mldke4e1e954cl1uj785ru27dfs6gaulunr4vs3s38bmlcrfgjhi9fyhdnrund7nuesg6rq610df8h0ard9b9i0983k1kmkcvh4hvv4',
                iflowName: '2c49rqp69meo31th2uj04lh3gmz14crwewo55hlxgxstdmuawfltqcefqjft4owkbth5wvdq634a3fmhhofkufgurwrv1cotfc0pqsoyqc63lat0undg3c6r051hq1muuzd3ftnpuu81s6h83sw711qvsb0lwghrr',
                responsibleUserAccount: 'vzf4ek7jlign63cc1rfi',
                lastChangeUserAccount: 'wkq4hp3rg379z66muo1b',
                lastChangedAt: '2020-07-28 17:01:49',
                folderPath: 'gqo42r3cpeg5ckavnsj34bxkuc9xhwcys43quh34yf5btpfmipbq10m2yzks071q5f06pkacljyqnoy2uomg8ln3bhjdu3gtc3imy448pltw0rjt1pp4orbkru88ch34nfxxpqinz0vabxrq1sdqgf7eyj5v1adzglj3nkkkd5co2l9fva725e321xaq6n591taa2plfh7hp2fciqhgcp742ooaj03mxhi1wdexu7o6ji1770jmwu4wod1goe34',
                description: 'y2ozle1vb2ilaxfc7p5gf3mqfkj4s03qcxqkjkkropdvk5lhdvcoktew4e8uvgawa3wv5wqdq1nv8pygphpk8ze846n5lcjk9l3vpff7shef4hdy61v343qap628bhhfigtlx34jjavv27wmy85b7s4goq000x2jp9xn1fxt06vig51jjnaygwkqwxqrm2v2fxylpgasd47h1fw0et8ejew86inrp6i9k9gqb4rbnn428wbnm76zwg8uysp71sd',
                application: 'wos01wihuuduy4w42p4cfe3rcixy651nyqkzkt5ul3xmawdwrn1wdr4lrb2q',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'jm43jlyb8e9qir71o9yt0ttalqr06exdqjt0agk7',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'oe97x8rk0o59qyw6xssmeroujjz3p58b36calfntfx7bkd1vk1',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'mchow325hyjc61i0z6pu',
                version: 'o6s9hdh9taq1pskyf3lf',
                scenario: 'b95ssye8nky9t8jwe04y5e7lezunl5wy6tvifyutosl5y13qrn1didxpqpbq',
                party: 'tjjjh3awskqu3qxlabv5q2mpno11pdmxknqsm7in2ewd65k9jqvik4omwfg6b6e6s9moz5lfj01hd9kzovwbbve08z6qf5ccgy746jsbprgt52fwlxpys9fo64kvej7zsr5wddye5vxo2mdqktptwdpnubkxemp3',
                component: 'cd6zpdajkd81edl31h70ui3f4a55b0ff47mewg9pp6dva1x593k23a1pg46n75i2cbaebazfij4jhu5tyxikaxs5xeass4ehi9qyp2rt67d92lk0ey2ih8wxkuwwfhyg90w8zzzhwt9vm38mxcug9vkyzmif63i3',
                interfaceName: '5lx9jdixn88smx3o8jfldtwye8vdqo0r67tg4kd8aae0gjvc1sdmf4q7soklzjamt9fw6zlephp8g02chpbvgcwr565eri0r619upzzm9bv11l9mmcrbx7qn44h8gcstexunwmhe88termd4h4okwjse27z73t3l',
                interfaceNamespace: '9u5muvmbdpnsy6r5pmyma09wx7g9dmxoxhecdgl0nr5e14bzvdtjn23girzx0q7dr4bkawhvbbwegluwbdo607k4lx0kv0s4fft5egsnk9vdbnyvq8i45wbw9l80hic421moj1ztbqrs9e8ina9y6dvosf0w69d3',
                iflowName: 'qq1pweww1czcdhb56s53894x1abzya36wi1qh99fmnvp3b91sa2exzyrc9jhq7wjs1cq4usbuvepr4yxz7mfnc16zw0ceju6rrzfnxry549mqpli648yt0aq8nvc03qwydnm8th3u8m55bh5oqvzyl1eh65tcjgm',
                responsibleUserAccount: 'n1qt7r54gqqrcnvpwn42h',
                lastChangeUserAccount: 'i8c9zj9ret2l4tk1ngua',
                lastChangedAt: '2020-07-28 21:14:45',
                folderPath: 'p0gqxtxosy2g48r6s8fntdl0fe1gu6eorwxm2epxim29ju588kds3uhukjq3gykdb9wi1mp9ab1lvo4d9dr4mujct5vajp6c1mthq7xcotuppvn5rsoiyygq1hxa9cjf5ilu2m1e9qxgevmdc335oknmr4iw0g06f2e4fr7u72jtu368b8svmlxhqexma8vq1kvr9f63h6m6hfyoq82r9o9a8a8pmfrvtjb4m54ckjya9c8czt7mfi4igtevyok',
                description: 'ojeguo7uomc8fm748m1kburgbxug193rju9dr20mams584w7crjgk9oiu9p8rg9clovlcdkowacgwqgegned35dwazgoxju7ytkv3ligeewqr9bj5485wk7uwed3d3ee7matwqfesdyxtbbh6wjiawsvifwbq0e2g8acntdtmt4e3d90wlysugq66v3hrv0ar4oulxh7hl1r8tb4wj7zr5snwesoxzj1izhtv6hrcqr4oew05mfpztpsi1agfzo',
                application: '0tuc0nj2nzt25hpbd45ln85ehcrwdqqxav21kd7adu4muxhmr8na187krof9',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'pbjtl9e5jq25knnzto3iyimn31pb6diozfh1cb0t',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'q7wfxwx7a3jpfgynlfr4uawubrpqljqfqk6w1u2qejsme2muip',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'dpr5xzcxwzk5up0j1n80',
                version: 'dt5jwuyohjeppf17zz33',
                scenario: '1y1pynmbtwrij4n0r0hte5urll0outafdaa2ff9z9umyqk5qd9berx1wbrgc',
                party: '7bv344ccasg2685ef7winqmo13un68l82y1q874dk218eiv6v4t3iierfvc74n18ma79895q9sgwtgorv9377m8bupqi2c03551rszhwfq1sgulzwyldt1fncm6o4h52z2ktn4nd8guc6mmyy7me5c54uymhad38',
                component: 'w7i9rujpxlrtd3wpkxohi3xmg9yyab9uau427tqvcvbwu4nwy03dpcdqkud0nakrikk5i3zo3fwmb0sfs879c53n3lrw1n1pbtjjl4wyoj2amtmztknd8p2xoh1b2tvdhq82wr1ouoajn0m28jn6zvywef2yukcq',
                interfaceName: 'rzx24c4b6560ci2dmq65l0v1wbr6c72lic03tv8xlz46oi5hcsk5njpatlm91ukppobug0p7wmiqtqd7nfvtazpiahaxy304m9rm6olh11jfafdpigiub9llqboirbbxdyxvuzb543l15fz27y5zauycjbihqq73',
                interfaceNamespace: 'hwu1a25ka5qibi503u1tujm2w4v18ls5jccj2cz4qe0j4nxdmmgykdwhmput1resl7g2tg8shzbblhrq6shzk2xc4sd6x2azxyfkd1y8mav58jwe1drpf2deotesow0obykf20q2k6kplctxxhkf690ewlhsdrfl',
                iflowName: 'm3757eqhja2yeqw0iibjzpqu7u4be3gchblc0kflrj6u8reet3zc19gm62kjfs8yko0fgfsecom4hwyoovnyhkdmwzwuvis71lfh4vt3v2fkgvyjnqgxp692yc9aitnqqxdgkaa7akb1e1eq4gvkkbevzrdbqlpm',
                responsibleUserAccount: '0uez6oiku55vbsvytcnr',
                lastChangeUserAccount: 'u7spnpf3iae9rssex191c',
                lastChangedAt: '2020-07-28 13:25:32',
                folderPath: 'vk3w8ewq9g00vr32a6qkwmiiikjaap3vzo4o4kls5m63sy4psd2u0ni5f8snbi5hkjk8fonoiue7df59wvk8f116zr36d3b5g5yw20tkh79tc2vrp9w0uwlm51qdpw8nafb1vlhx2mupy1az0fiefv439vju7mo0j452078m01jp1npohqdac5pphkjnt6qtpiegziix87m0tnfl4gxii20smsg7rs20z76nfux8e3g6thew23gcrefwkgkar60',
                description: 'oofcci1wvrhr0x9nzraakx5uug2tm4t55jsnpjfev8230ckg781aexfgtmqsjrpk2deb93bvants2d0y0g6wz6uxajhiibod6h1vyk1uhpomzfragg4qzozqjpqlyhh6ihqlulwqwzpw8mkc4jh00o7bs340ziqsvbt9wpmk5fmdogjj0b7ct7a74izq1b76b2q5uf02nlc2pc59hs85mms12pamrbztwyfzqk0fz448zhfg7apqkhpnkauy0em',
                application: 'toj6pm9yhgvbbai3xmba8exktmylht9b4ehwct6s16gz885mq0z9jq2eb6j4',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'fw38a6tpm5ol2b3mhru1i010u87pt0qfov7np7nk',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '12ds3u2m1obibvvi9xlarjnmg1m6frb6q68d9sprn00agp6wnn',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'p4kp548zr5hbwbt8qn7f',
                version: 'uwzvull94x4z64fim0td',
                scenario: '6pfv2y4l531cpqtxireu559tlo8gkbk99vvqqecl968qmsow09pzvje7xdan',
                party: 'g5goonpqog5em698b2kvoyl4yqvn7qnnl2mre07vzjm87axmbfgi6k5ga96756lhpxy1564w303ufj32932uj5l6vvbha2b5vfxc3zyjrozvfzkwpkczu7a4nzc23v3bny915qoiq1wki5mxiwfx7d80hl080bkr',
                component: 'a0s84jcdps7rupyfy1ix6am8s17uhy2v7zsdyhww0hgh2nuykwnnyxmr9asm4vgaj5vt1m0u22zrh1h1a5a8sofcg5cs8os0wc67jeg3kgeba1ue1i3lqytfzodktj4bkhk397ygj2a2zsqhkon9bp0l4rr625cr',
                interfaceName: 'bphip8d1mivtj59hstk65enh5z4itk4s8dpigye5r72i759qjwiysiitb2h6lb8g55c87gxv4mnxcvr7q948ceg73v2lvzs4x51za1di1s6jnfao8asun1qf3km97n1t8noj79nybfzjw75jf2rjopbu5h1vwj3p',
                interfaceNamespace: 'km8l3p8kcoclwt0t2p1drm5oe6q2sp4njxvyo7qg00z1xxjdic0yeu8maz6kf363h5balbcd7rwwgpp6ipjnuzjrqr8hokp1wrb0irqqs0iy9wnedtklce2dmeyr9k49ko92dbsi33qype6a4kkhhwiwej3gxjgn',
                iflowName: 'n3whltf0a9aynkx2nobwi5vz1ptq3ef1bldp9vtfvukpnex15pyy2djx0d5k3v1nrszamju2dxpc6uwwjru6m1li978rd669w1tb46k2ivs12sb6dnzpmmqrbuwpt6xi66fohu99n3jugu9ronagk2s9fpb1pbi6',
                responsibleUserAccount: 'hgxzyouroyfbk023z331',
                lastChangeUserAccount: '0sr59a0iy8y8zxfcsuh2',
                lastChangedAt: '2020-07-28 17:09:03',
                folderPath: 'e1rgnz9lfq2ikf2a4mwncn2b6kelm4bdmpqludc3b7spn86fe0pnaejhikg8jfq3bnxuuigsnpexpfuejff3lh7deygceqw67z6h40wzsbxnvpzonemj969d9lqfm08ce5xn5j1yhgjtgzt13aa9285hlmfmviww1i3d7qkstlb3j1t523n6hpx0phbay6010ahvtq764wrwycsuwbwm88h8wj2rid6jbxp24gqb1gamcbfumwgn1txsom0q6853',
                description: 'dacqgr0njwmtciwglc35uke4m4h5vs13wiqzc1flqy7nyodxkbu96ztjw4nx8p29yycoc6oeamty2ymm8p8prryebs5d2z1cdnumy4tkj2qnahdj9y5j40sxhm2dnjrrr0sa5rgyqjv1tuyc9xk255xe8ave14jf1uo3yrnitfgvd1i0qcyvbm5260r1kj5ufz4anqfo05l4g53tjqs0lsr8p0j59yqkk0pfjhf3h30vy4qa4dmbc4emwhtqr41',
                application: 'pdtir6qp45kkngym81oxq1p8vt1x0l7v8x94pitjfkgprpnn4cwwgn1nzw2l',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'q8yjbzuprbvf7e4qa2ibo493cscj44yw0kk39umf',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'usooo8npb4q1cta1y14f65dliw52vsd3ajf8vx3pvpxgnkcsld',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'fjp2um0u0mf5fd9lct0j',
                version: '95qa59ba46gs1zxbip32',
                scenario: 'pe7tbxjkdjjmmfznf165pfcvpafwc0nq4793z8e68kcwgjpr7qt2ku77wndm',
                party: 'bw69ii0hd8j8o1w0nly4cpi1k1osf100f5addiw3pjiec9flodx4qzdiqer8vunc21mvy591xbbmh4ft5owd612e95i4i4jjifyn7rryzjlniemtp47giymccy8m6x9fh3dabqhi16b7l0p8ppg6dxu0gypuy5fr',
                component: 'brre7f83lijwvip78uooiwwq67ci1zvsczcrnys13vn49b5mgm6hhopo4tqyhdyji6rt9yn7nb60hvu8wb8ny5rx67fi07mtsbdkjs3fdsn6ukkqntpl7i3rkvu3f2oadh09wpnjzb86iinks1s7prn1ae8ts7d1',
                interfaceName: '7g66mswc4el10piurcioljjgugor57ituyu0yytwnn6uktak1nhd6e518j15fj2paceuegviou4rp2uobraqy16ncrnh958jl844l8m1lr9egmaubse6qo2ne9uib956s39qzfa21neu61n5z7wgqox40n4r8alu',
                interfaceNamespace: 'dpvem7f8rhxczu02yl56dogu2nyhledhettiv3bsruljl4z11xh2thsmx1d64yjwlqgy96zhhoj78gscvm9uls97hkn2d35e4istm5beioqlsybck9248ca1zymc3fulkuuolknbds3mtihqams3bp72647z5lvz',
                iflowName: '7ef1mbzhfgvspneia9s6jmt7rhej613bhu7a4hov4dhowissvboosvr6n5iqa2nd77zackjquj0vyvg2pgbf9x5877ghhdg5qagdlya8wbxychms0v7zhmflh5499x1ic8jy84sc0xr44kbv4lhvgt5l6028g4xv',
                responsibleUserAccount: 'o1iycsvv4w9m8ru8md8t',
                lastChangeUserAccount: 'a8fdrqwq67uhghwxo0xj',
                lastChangedAt: '2020-07-28 23:42:17',
                folderPath: 'cc9iewb9jz4knvqv6ecfax3uf9mvyzgajpwsevszf9t9iaf20aitmz0rwurx557pf192aqebekihjdufmrxlwz4xiv8xqvrhp27rrzw2b4k3bucm912odb9g7ul08yud2jmequt7y5zsektws40xi20q9rfnllww57y6bmr7g0qaqkkaut2km5t8uxss9hrbytjh4p9zzu77z4mewnzrwjlng9j6b6pjhpfthjt3pex8gnoy6ew6f8p3j5skcv0',
                description: 'xs0zekkndbfi1dwdtxxwd7oi2ag0ea4x2fktcwxfeeqsb80ypf5hgfkuk7xypn171mmg9l9hem0rrprsqckfuoyssrkf5ykkz3u3w7ew2ualk91ik5qazmd6ye8af2o40xswlocg0ikkg7yxf81m5dws9uorceds0eaxpig7diorr165us92ud5l5yghucxf7dut4lmwkdo6knab0al588kt031day7m514cbl11ra72g35jvjiunac2kd2iimb8',
                application: 'xx0n4feo79yhvxogja3iz0bzaddv0wq1hrak0dhlmavdkqxvpfgitkb7ybfe',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'un9q1drhvzr9ry4q6b3ea84dc5xu3g81e9uhf5tb',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'mf1ui3e9tvtzs7ojwcs9d6u2qboxccildbdfntmdw7x1qejtol',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'ahi385j1d2v4njhdz1to',
                version: 'jloku2o057o2dokorbs6',
                scenario: '3v8j560u5btr5eu2ws4uy84ct5fdb3gzaxc2aazs65ode1p45pxas9dnb5uy',
                party: 'csoj1e4vj7kzomx7ndmgekntai6x10vu58w8d83rek2s1hdy1657kg30l72d8kuo49koy2i6kfoa1130l52paubljghau7p1i6p18at6lcqmaei9iepex8cp9nn6o8q58qx6yxqravkyvu4uxs1ub476fa2qzmrd',
                component: 'etr220sodzhg7kyj4r2rtjnbgwyzbsf4q4vnrvw0k64hezsxnqybmg8880gd90b5vz8kkht7c9p197bql9yuul36rl24xa4n7mwk2ggoimyyl1er71672aivzim4btdzd5f0avktdfpbtp1cuqzhm4m00xekh4op',
                interfaceName: 'pugsit0y19xsuprm5of3lulh989x30zd7c33hgzwqkvx2h9ueklio9s2cjq7ihs3pjf0j6x8arfr98ugiiivw4p2f2aczbtierkznlpi2z8khhuiyhnle96c9lb6agivmifniy3t34oji2myi2e9fetabcwem0mr',
                interfaceNamespace: '1llh0frgoo6bd6rvldqmd4r0tqxrmy9fckmzm13a1e11a2yzoambci1zcxexvz8tc2nw09xd3i81ofb1h2edabxwz4x07gyhi3ccf5003umnq1rvao0hbjbznlwru7q9ap2zefkbopnddd71sopp96vl2m64cuf8',
                iflowName: 'hqnmrk2xlb0syq87d7ctstaq6erp6bpgxb9zkfx5vjuu85w9wptb7mj3kgslg8lcidnjofae0h8mav2libdpnuc9r7p5e0kpvwrjtxte589zt8llabnlddz7bae97jbdffrkd4ih5s86z9xtknnsk8plxly7oi31',
                responsibleUserAccount: 'w16m4ezgasstjtp9ojhx',
                lastChangeUserAccount: '2ht6segrlmm21zwwtbhv',
                lastChangedAt: '2020-07-28 23:22:18',
                folderPath: 'e4uy4tka32283x2srxsbj0qapm79u7l068wbp919ttnlwh06kprv8a71ftzvga5tvsa5dazhlyhomuoo9js2c00m2h69yv4bo4lpq4l9fotqohp8w3zkeh9ykigs57as1r8z187sjq8s5weqwsek18qnp8okct2pt3wuzhmgey9zyiwol8miiji4zzl22cm9m07oi2xfcldru638cbe05wkrcgf9t1bo0hfkjoxhjmc10gii8ac7std8melct10',
                description: '58q9tkcbd9beeeqi7938vz5da6tspls7ejf9w8nctjkvqtodyq6i9j7lrudvpcnv9cdgy131jm5au7j7mhbo1ju7fe02jdjfmx7nfp6rpb2g4ytlybd0tq8uyiity6w56rvz2og4o0fcrr73d1wzxff832d9nuweqri5q6ckvrt0ms5yqd90ylfvake8qgrl8hg4k6oj9s4emyg47i7jwx2p7pnta9v3x7czw5s5kub7rfrum0xzdumv4wxn6z0',
                application: 'ksy92uuohcb28s37byd2wdmzv5ow8s2prh2nr28edahkicomhfvo7a7x4p65k',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'raxvm3q64i8w72ga4wr8o6ltx110ogn54lyokwfx',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '95b0ca6uw8pmu6ggw213cnzcce3ygoi9hfnpu0pxrr1p7bk9xk',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'ze83n9spl99zrbsmitvh',
                version: 'sptlpvr57ynvr2ni6cfo',
                scenario: 'sgg4tm58vg4xsz8hsln2drn33jdxh6pmd4mnpyte6rnpm5qeub2iwtiz3oaa',
                party: 'fvh3iajtofwng9ieyzyhm3v5p7h04p9qsesr4xqneffwzlua859sacyhr2mhv1gazbbvrmo9pihkoqdigwfyy30ri1535udy98yzim498181i2cgzzzzgyi99ad6rxzh5shj7igu56zhlo6kxjzxgtcmogo93rk9',
                component: 'cpy8g9fc5gp7dh4pj0zd3eox1gbr9chfo989275xf4r19fo7ykmve6il4pv8jlxjzydd93xcw8jfpups8xt3adwl9m9d0qrrvt6etoykkcrbuhk55ak4pqcjh239yo275g7jqnzawjytz8hghuh3aahkcs7135fn',
                interfaceName: 'd3afvwqc87qwsctza28o5wpm3eknx1xapoaqbxwkxvoo86zot1cc4cw3pivmykjtzvz2txviq7gc4r5b51yc40jo19cragzxlsgvuj90h8na6u6u2oqo2jpm83xlcfki4ajjd1c0zjco5jzvz6a1322zh3yau3cy',
                interfaceNamespace: '4j8767a9aj2hrhisujhqkp84o2xw591u39rzepulehbl46nw2o3yj6zzkdmszuphanpzukh8ejlm0y6a4ku3v43e2z4t88ir6jnwdst5fn79c6rth3s00l7w7kq0jgy8u50zg5fci87umw455d1pz2mkh3myzsrg',
                iflowName: 'rqvyiley3o49yj3ngp6toohnog1q3p0kbyf74hhbq8z6u4qiv5h92smn2c9tl8wf7krnjaaube1x5lurd8ovwfm8b3v3ncn6nubpsxorc0vbls0zq89u7r119btetr1m5xtms6j0t9faec0wpz4mji7k1r14zlfy',
                responsibleUserAccount: 'ielyw9v7g4zhp8qbtjbu',
                lastChangeUserAccount: 'exqhsyowd0tvip6toxdp',
                lastChangedAt: '2020-07-29 00:09:55',
                folderPath: '28d8rj25w0gxxjdoev1z00nd87e290eeyulvd48mk55sq5n0sy8129phfxklofkkjjetsccxcsd649r5eb3wuje30jrpp8bi0i2wv1ljuayxqsu261dk41edomx3pbx2dr0gyu3r0mecldnf76xzbak7ac87vxv3tmvoi4x8eo52z5kuyfca03sxidcizvqwcgh0ridae6cq86gdcefbq01n9gzbq7yq7jkhsxosm6jqimupko1el64gin3g9ri',
                description: 'mzp8sq9q5wfzmnbel4v6czqwk7jvwevncll89qr34bzibgr9ie0uc6xqb44uxdms1qihd1vihefftlf106cpijhrgksdncu62owl8u5e7wolkka88cw8tmch2qdrradkfucu0q0uelxfqn3mx6n5ih2q59we18xcew4lw1ywcwpufloezoep0p1p9pgjx8ihgkhpr6et9qyxoglefosfi5p1lt2nr7jmkohdymuiqz4ytru0dbs4lmng108yap3',
                application: 'hg0jid3wa4fm9t2anjpw6v7acrrsppu20vhwpgh9tn1qwn4jx9zw7cc3ia0z',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'kk1p1n5747y1q0p7qxewp9h9xjvz3c3gzp7dk07l',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'wv96k9xi6bqikmvpzktsxalolp10trtjk78554ovcpzkvszd9c',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'cr0j2227il9h0qkaedus',
                version: 'erah9ytogkefxqfg3hff',
                scenario: 'yvcih9qygdcwp7onosu40p7doi4t624zh02dvb63my5kyp2ddacwpvdh1q0z',
                party: 'z9k7smo4usjpq2wjbsojlnvutotjuyy5dbib7v24zs1ncy2dt2uxo9oux91cuk7tmevuniig8zgzni5y58o6kekougmx9x8avxvhac3krqdbvaa547q2c8r1u2s3pyawh5pk87ghglx83tn4g7idt5df7dx5e86t',
                component: '8kxe64oofpfy2d2q435clewpfqqr6cdbur7mh8iz0iyiuyt3n7xsl4omlxp2gqgu6rqnbrpof1us2dxztknj7wwl5f995xr436zcf2j2oykuszqrliceqrop8my53guziya65buo3er6v16c1ws7ssy3nkxl00je',
                interfaceName: 'jgq123zi63b8skzi6z96085h91f9pttwscfv4bl21bj4h6l7jack4mxfdk1ri0vu429i1rodkgwu9kv7zv1zi0ptbedepr4ikmd6rm91f7xg72mbpascg9sirieujuqg5hiu7cye7sdctdpkb1rbn6baoj1xprkw',
                interfaceNamespace: '7bpjp7fbfh5fx99jnwaex7kwa4av088jzs19anas43qf4bveoxhmvsdzqdmkzbwngbvzqtf6z8yiwps82mjlvpafygzs0jaezq6nepcqe7q60dyd57wqjgv4y2s4k85rsadka46c4vhspzw6ot55pyw90dtsnl3w',
                iflowName: '0o71c6d78040cxlg6nz8evmivqg2tt3jczbna0uchqgv7covxwc06sjmovct6wr0dqv28wembilq01ybthdqlt1us69qt0fm8xv53wmkp6hqo1kxr556257nbxpgbj06w05c0jfcs64mn7foooxbuxlhawml7lhp',
                responsibleUserAccount: '729gojlvsm611p5x7r9t',
                lastChangeUserAccount: 'r5lcbu76id8yn0p2lnq8',
                lastChangedAt: '2020-07-29 07:35:44',
                folderPath: 'qb0iak9itztyn46p4o16ubasv3i4shh68npjhr64065jczobtejfwajtt4a3csy8y6s150bemv116i9gmc5l2zgnvv3s31ioonw5c7u7w6u93zfxwy5bznrvtgnclkc9tdziy8ef9181px28wzongur31pyjjv24u4x6vpv3yiogsiw3d4ylxxyrpxbpokrl02ekkjuukmjyhmw47pok9uk12f04agnbjpjcae3l9axnee1g34s7j4wk17hclii',
                description: 'xlnwjwnktlqkwr1ry76ipwvc7md8vjs647oqlmlhxv7d3l6k3wp1knoaes9smbllobffgd22zwe56xim9h3ddm8md4mj01f8h99tlx7hjt6vbm6k2g7rem71yzvx4lmp4j2ngg2z4cv1e91b10rsgw4u4in1bpf6ssdscwl6t39t6tkks19t71i1tub3i3wpnea6agqrtb541nqn0mphz5dno89caf6vhyvrsh2gjn8kv0dcfv64y7xig6oqhx9',
                application: 'sxibt68z12ame8wgrrg9luj0mag4pmjwe8smjkf0aud3623q854nloodwfkp',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'nf2tynlc1ilcqcr2wzm09bswncih85fuhy7siz94',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'vl4uscslqeg1v5czqx0c92q1cdgpt8akdr7t48qpm77q50sj5w',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'jfgrdd12dxpyner2ts33',
                version: 'm5hojww3u6poj9ro9fs9',
                scenario: '9cr33jp8ym8hx8f31gf3nbsqyb9s98i562ecmpv7c42g04334fg0ig7utzls',
                party: 'c9u17ieo8tcqp0wr0p6ko8emiprbu36lfy79lhi0w4324kfmro5zc5h4ssjhenrt2kx3z8msca6s1ydftfrtysq5gh2ayuzp9kvigygacqni71wd19zinz1b5ermj56588qjvizt0dr7ozymjd9p838xnebcaqqd',
                component: 'z0r1xm5o477jkxsx30io9lldwi1busn3yf3ts2siwohcip6h17qkvntoex2yxznx149ma5ckhg1qvebbbg1yxg1zuup59v79isq4pjtf7dsln3x34zpchms0cldoq0hhc5z5nrb25vk10251qpguitjrubqoh9fu',
                interfaceName: 'mxz9ysuaqh2jwqla3ji6kuweh457d00tvsiju0mmvnt7mpm3d6fa3cstw3vdmi015utulappohnh97xfv0utn387ch1ionnkxqo8qkirzoeq34dsnr7szc4ipt1lyhf821ar89333bdx7yjf4z1zterzh3eeyl8r',
                interfaceNamespace: 'ywzxizeilw64y4t8jxfu0j3az3q6g8gitro8ii3hlq72ayjhe9tdsh0r3qtaxbtfrh9wq3d7ox736onp0z89eme7cd7076f0j11ldvhl847uynts3gb0tls15j8y9rmhvs9hgh5xuqx17e0vbske2vxngx7ecf9x',
                iflowName: '1a5w60bhn9nmybj0679b5e7v1rsmcdysr5qs6cg48fdu23ot7vkwf9sf3r1gkt5dg98lnah4lg5ia55p71rz5uillwbu6tt1kqedhhdu3ownvr5cnbli6my6ecwofz1dlrzk7jn6jndrcxjlt7q6zrdane7axfkp',
                responsibleUserAccount: 'on64tfuvkp2m9xctldla',
                lastChangeUserAccount: 'qwq566rl44j4wf9mvxpe',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'dqxahnn243vq5wnvdjuv46ibpdc8fnsqbsqqq876bnuzklrrnyd7pvvdr8fa0trl7em3knxcanp7pcmykmd3q6if144ln9c4g159wl3xkixlapvssttk98tnj93vqbwmwz259waurj5r74spoj8yv6aq6gkfx0ny9exd468fxoeb2zn7sjht0hk1t7phm7ni9cdw1x8qwb3l49of2vdga13q4z6cgdj1aum1a5q11505ca1dpm6iub3rad4qz4n',
                description: 'ged3kb8k8peuq9xwiksdd3di6c12pdnqdxt40b2bijgku45f5dckowvd3thqg8nc69oxhv8z6oyf3d4p807qj7swktswo6jpss35xq3z23tb7jo7juwfjo038uv3zmognqcc81nlz1lvwsc0l3ueuf3bu7gsrdhqbiknpq7w3e6tzc2liw2wk69gv4iwyy8imvtfyl0jfdfiu9fgfosax60vqeehktjsabjtxxw1jj5jnqx50sjqdgrwh2yvye2',
                application: 'zi3fame1dsb9dvwyvt4lyw098qgd2r8gynz7j6fguu5twmjf39024cpxu976',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'lxyxjpytc8vp97zzs4s2n1tnxuhrg2dg1xxebepj',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: 'fdqhpk2vw4rl8923ady8kkopq1poa8h0h6oatdakm8lsspmcg1',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'xcmgyezx72v8403isr67',
                version: 'ae86l0xyh7kipm1ustg5',
                scenario: 'd6i14ujuir33hwerq61ka61wtazhgxumqd48ti7dzolfnmt38pnb626pljxg',
                party: '0zbyc199rx0x0hl4q2wv02brwow6eowkqobkkank6ti51tc3qk99zoc29h5z97uu3uzam3mmg0bvf5227ziv9895ytms40dju2uvs3vktse96e8ctz2azd05lilkscq01ugdlx7fp6ndo1wdwv53nszu0m92vili',
                component: 'ty6jw7whthsaivt4ulli2dnysompi58j3xnmp58nx5ar7jlv4cg9cnpah6uxdpepb4jxmylaqloncsack2xlaeqadgjq4q1fmji9glc32k35s4su80asivj9p7usqoazj4mweqftkvmf6weo5d21z0lnocmbo01r',
                interfaceName: 'ihkfj50nd6eorfv68pjmy9nk8x9qy8e2qlttaffpt0p6qfwwyqns692wuj1ck50jg5yvqiuzwy9jx0j729iww39ni5uqahiksq5zc3agqh3kbd12t3c8k1j537ecd67khugkfl8fp1ctxpbgxqs61tqwdv4uulqh',
                interfaceNamespace: 'ws0hoy691s0icnz2ayxbqa7yg3y1rb9i8ofg3lljwqqdja3tzbti5k1vli7mzoce3blz08pxotni52w6eztpys5hluks36xwmg0qy7sej8dr9dippx2fpas0ake9qgcn0yyb51mwbu0ke2oc9llqn5vh6annbvmu',
                iflowName: 'kcsxqxo911pp5ycr3qlcjl5puhyxbjnrfelnqs7djxs7nsb6bjypav53stdgc0x8qtku224chajxiane503dk9blli1azvcksw3axyhdyxf2z549xs9g50bldh5zwbo67e4p8s93o7tk1um042suhk13xp99b5rp',
                responsibleUserAccount: '721br6kmvo9sr70icpyk',
                lastChangeUserAccount: 'xqyv16th0igi1gvb3uab',
                lastChangedAt: '2020-07-29 09:06:43',
                folderPath: 'wpf96tta18tr2036dm09ydel9v48v2aldqk1xh2qns6nwqgzb1s94n46dyzba1vfd0i7h9ivdzgcjktk72liewshgl9a93k7rsovmcm1ov00tkwqir1caefzkashsh2a70bt4s7m8sm356nozz6mw4xmhq0hjcgv582oydqwiiyy1611xhpqq3dg8g2vy0wpco4d4kv2eskn0pfjfd52fe1anjjkj27j2kherrzoxu7kggtz3aahma18rlnenzo',
                description: 'kvanlo923r03kd1959i1l6r6gumc2tdm7xlt56osgpc0wvf7uqf1m8zl1cslujnf9kby4md6azqjknd0zxc8r2an3n3wtrcks2eh9gwia547sml5ne0wu2z0qz21kdehiggoup26lkk0n4lpi0b4152g9qk1gx5w05ncmv2koanwrh9m8d32v5cn2d66jygfphk91kxqdkpneqofpw2h050puvmllrcecmpj0ow8pzuwzkbg8pa0nsyid9y7sqj',
                application: '3qdfljuqakujycj6wyz02im5krydymqsuuqa8ixg5e3x7p9sffhqjro10zkt',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
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
                        value   : '0cb0483c-8a7d-4378-b026-f78949422144'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0cb0483c-8a7d-4378-b026-f78949422144'));
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
            .get('/bplus-it-sappi/flow/0cb0483c-8a7d-4378-b026-f78949422144')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0cb0483c-8a7d-4378-b026-f78949422144'));
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
                
                id: '16e0a347-b50a-487c-bae3-876549459c6a',
                hash: 'amte3km6plhm4bbeua1mq2ks29n5t2274aefzlxu',
                tenantId: '7b7e0ca8-d292-4137-a20f-f873861b489f',
                tenantCode: 'bw3ggee6edkfcs0497zkaaj6aizulvuyi8a7zkieyqnrvngnuw',
                systemId: 'd131c1b9-5c0c-4667-8cdf-3fae092a43a5',
                systemName: 'u10e3illro794mawz2u5',
                version: 'gfpf0u0cyw6bt1jepj2h',
                scenario: 'hds0iik1db5cqea7rnhsfx380feabu53n240isrdmxvq12adqc3wi68nh8x8',
                party: '2frmaznj07jpc8916gl83cgyprcq45kp2guoruw99v3e23elydk8rayvhbw3sq58v4a5hxcoekd5tr6r65abvnccy660f8cmbaf68e66m76zc5lhkgp0c5g1ypwpa2zgop7r1v84mec4u1at4j2ylihvge6wt0f4',
                component: 'igpwrsx6jruvh26xgbcw2ohnly7dci1y7s34e473hp6c7rlryxekltbv1l5slqhd8ywpffm9ffxifnxyj5l6erpskndaphfheqpkpd3nbgybstpagorwoobodcpqhluxfjuugeo8r9uuxdfxtqs2winv1g1v9oa4',
                interfaceName: '2r7i5q4mne3b73hpkg135wrg1mpeygm13aohpi2sncya9sjdzzpfxgwegg2e5oxjuoqfl4yhhvre3wvenopnx50rdaozv66bzd9ew2yer5gk3sj0kh8ikz4vu8qen56dxg4nortvib7ttj2h8n4zs3sl7osinh83',
                interfaceNamespace: 'vm8lgevtnyx2kf3bai28n86nqysivg8gppvghvn3jiupgr3swuynecngivt14asb6c4kbdrb0z7f3b88h7amku9b2xhg9xykglyybmyqkwxawojj31jf0xga27j0e2mr171o8ggskktiti9uhv0acf5gjbdjjeco',
                iflowName: 'm22yamovm60e11rnwdhie73exw5an6umumwd0xbl4ddun3oxaqmhkrfpuxttr1lkwuc5exchqe9c0raij8thunjzxmclcybxcmgd8wriw7fxgwsrx01gjebnuh7hdjt8kx69vafdn4vff7wkhsip7jvxssn1aizl',
                responsibleUserAccount: 'c0wa7h0dz4de7tixe609',
                lastChangeUserAccount: 'o2td8vnjz73jz2wlxnvc',
                lastChangedAt: '2020-07-28 13:19:23',
                folderPath: 'w29s7c2xue4r3lysghngx95bciico6v11x2ype1b6pky0qqps4sst6e3wkvxuumb6j41i6j01hiux9d5j3sj89fiou492bag2z120a86o4c4u337crlrci2jbsrtgoj2ew41ued1pani4hj9jdrjjqi7yfid96pxw6hk5rbexlglsbrogo8rehpfkezgc51kj7v12jf7wd8pdtx2tj9nelfi0oot4zq09k3o3oyybjhfkx3dzilrlnjh8mq0op0',
                description: 'sjcrcr98ws2vz6hcm327nbrj24a9n5uk1pecpr0mqjl2nno405w87uh9dswe8kn93xb46kgv5bcmo7gjjnowawrw8hlgi406nm5xj43jhq4bom5vwjjivlqsqgahn6xd1mkvewybjt9av79nfxdoa0dtsodb49n0dd1svve6quqrfbw33vrz2n5av8fpw99wbd593cmlsvocdzm4xek339lq9axoi7cv3h8ybtud3ufdpn8cdffmcgrbx3dv497',
                application: '8n59in1o3y9yaktv5vq0qxodt9x5ysrafqzft1mpk7wsgdau5kaly67dvpr1',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '9f269ce2-5899-4a27-85d2-f366a111ebe3',
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
                
                id: '0cb0483c-8a7d-4378-b026-f78949422144',
                hash: 'wooy79rrqh2p1mf1qeh9xyt4zxs5gcx5taz0uny5',
                tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                tenantCode: '3syy0l6hahjkmb6cpfh69uhj5hdg8x8brhwmx873m48qwn0pnc',
                systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                systemName: 'y390tddoryxirco9d2mi',
                version: '1p2ds5z5w80lbzf7ktnd',
                scenario: 'xzwjewpy0622wb9fzjla9hksktaitx0a4h5n9bcaewvd13m5henwu14d0rgl',
                party: '3ujb723mngqpr828lur6i4g9qpkxnygbqtv9xn9bcuvzjalenygzjn2juu7kogm9vahjzoyiaa5dcqg53ml515hsrqlpcaozoreexztlfsz6chlnird25h6py6phonutyic1wyexfaeqa91wc5p6u6ncdjtmdgk4',
                component: '96knr7lqug6zdu73hyh4cu3s7elnwoft3q9y63me1aag2w1obgsd5045fskgqqbloydymxxtubti6myuu5zd9jzowgqz0fnkwgffkhw66igj8gp5ln7p2yp6ndz6721cbj39bh7skib29i9g19woyq10twp4x7ue',
                interfaceName: 'a91gl0a0hhs1ywogg8sxwxriuigvo9b7d8louzy5ndqzhbu3jgpfz6kv39dk6t3pn8tk6xolni4tm05kb5wao2nrj4knxfs9kt7fddqfeme58j6lt9gcjfqxpljcs47a6t1jlkd3denk310a7zspor8buxicgjam',
                interfaceNamespace: '4ddrpi4vth63yj626wzl16alb5q9gffdh3iyvopay3y3b4lr3a3ee0cjvpp6fo4agepi1jsncorcijr6k1qadny9nialux3ab5s05votrgdtqlx2uggicjszttuy0ss7x0mw35pt3rcrf5sgdopbmojc0czsb5tg',
                iflowName: 'pvepbqafmjz5lzprqe0l59ftdl4zynoz661qn722khvwci5c41we3n3jd9g3bqtxk3lpdcufy8hvtxz8as76ggefm0g8wg5jrtbhnba4gah57jxo1jyw5fsdqp7lcd370e13dbp3ffyt7yb2qfhz8c0asv7srh2l',
                responsibleUserAccount: 'boyajl6wrvoldh2721n7',
                lastChangeUserAccount: '5jjmwabw5ovf5f29vhrp',
                lastChangedAt: '2020-07-28 22:16:29',
                folderPath: 'fs7c1h3gl9uj50s5cjgyj99ju5nw0ead8qaxqs1gr7azirmy3brw4cb3kxb8ibdggexxb1fhb8x7ubj5kwg0gstjvfvf8oxeime4gflyhxck91zacqliilok09xakzylea2g235z1kyd7mf09mzxuh0gk6llf5wxnngr0vr7u4gzw3xy8nbhhnllwqwfab397w85vxskfn2f14vu5x5yeodxjbvam980wkrconrbchb2gf71cky1t1j21rz5rcd',
                description: 't947u7kutngwm2oh3mga0vsw3y0hulb3z8j3kp1sr0sx5t100x6a4dftwi1u92cekiamz9479skft4pg295djazki18gpiy5ckco2bxcf2vr2nss23ye6o0mar436lf0999wkxwi511j04hauvhqyqvf4vmc9y6mma052bu4eh80ui8rcycafshi1uy048dthv35zak30f9aa8igtw7nze302fhuzzwfvy8rh0ihtcr4zq47zyrsj02jfyluoqo',
                application: 't030onyct1f1mhlx5btx0c5uai96mt4lpg9gudfks5jz1e5gr27114xolswe',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0cb0483c-8a7d-4378-b026-f78949422144'));
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
            .delete('/bplus-it-sappi/flow/0cb0483c-8a7d-4378-b026-f78949422144')
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
                        id: '63f027f6-b42d-4144-8978-3fb61916d40c',
                        hash: 'jg3vnr0i2tycwhf6y29zcpsl17l1qw9qnulccaai',
                        tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                        tenantCode: '86z168d84mc6nwhmzajatjstqle924239ac22ogmdmyiryv4tx',
                        systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                        systemName: 'aimqf49q1bihxyqm5uoy',
                        version: 'lcnsx7wh2zs3wduuuhjn',
                        scenario: 'dwddfwa9pprd9z0jd66dumom5y71akcf0uufdirx0fbaoy15t2d8v1ydby5a',
                        party: '2dcx2t1w3031l0ht5809evluiy0wcbsiabg1m41329budijdnjn7gc34eelyy29k53vaa7s7m1odv0kfenlojla26nig4ls744z2o8qnm2gjm7781a0gpgsqlz3cjyn9f9b8f7hjfc8ek2erv1otxc0ahp4a57zf',
                        component: 'bf3zxmwpr9sau4c7f5080v20yd4c9wufb692yynje7gcpezagzg3sdobgch5p5ytl5qsbb9suq8zi2o9by5br2z0nxwf7buxh51uryqpawv8fd9k8qx0zml9by840zg5mcqw660kz6yz9ofvc9xfv5ns3d7jsxpl',
                        interfaceName: 'yq3rgm10zsh6l6aq0xbo7sidvum5bml8q407bojsho7izyqq1jfu8oyg8zmknfxg95eoes7gqnssxyowyhoifu15gy6u4ygzu7tcw1w9j64wnflrpsylwypa3d4fm93mjz8qk9bjf5t8lkquj1waaobqks5ymx5o',
                        interfaceNamespace: 'i82fu97excgtmxesqh8cwapvicqqwzy6i3vp6oeywxmpka1ttrl5cxxjgt97wnpad8vuqsfuebls6wwysg8tzjd5ijy9f0ei7bwshsx2433wy8tecgjb46eqnx80rzlpnkrdsxd0ifgh8cw3x2ql5qvcykvxfg5k',
                        iflowName: '48b7zxq94ax8vad7m86arng6ymtdo3y3bnfrrogg3kkdi8616krezduc70qnwvufwsoofcnwy04762kb2xjd8n1xlwezg9e75hasu4l7u6np74fbx2sb35o32utt2vzrxsim8l6imaykkx6ua977vzsothk9tci3',
                        responsibleUserAccount: '2dorgdhm9vvnth31x316',
                        lastChangeUserAccount: '1k3x6e6ej42g7agzvxj8',
                        lastChangedAt: '2020-07-29 03:06:36',
                        folderPath: 'x1n0306mw2iiw1839vikfmuke1lrp8abva4sk405mm619dpd2lf59jl2401zfyvid0s0q4lneqom7dezkj0b2gicu20yfdkrghuus0ie61cibo405spwnodzqh7yleorc5rfr7wsyrtv8d361ozyilpryxwm197n1u0aq38udm5q5kzagn7hd0l1ztc8hmg4txt8909vnboskh8b3iy3s325vhw3na4z7lqyykvkv2fsqyjsxrdkcqqypphdoq6',
                        description: '75vxjipa3wm8yhh2fejh91jfemmlmjqxq9ihxnmt2dq175c6oggc60ajdfaehxlz46a9vydt504poobm7e9luesdzn5jrtt3o1qr8iiunp028ernww4z5f14mllsce0naelnnppdmbm3sc6mqp1kmy0elj7g2mre8yqs03gari6mewnu0do0odhkqdyblt2h77rjtd8hx991oedkuq2o42a6itkfmmvdjy1h3hf3qcl9k4k15c5096vmg84g24x',
                        application: 'q585ww883w7sws0uj26w6wppu71jhs3l0d4x30nrjrc9swj529ads323lo5s',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '63f027f6-b42d-4144-8978-3fb61916d40c');
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
                            value   : '0cb0483c-8a7d-4378-b026-f78949422144'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('0cb0483c-8a7d-4378-b026-f78949422144');
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
                    id: '0cb0483c-8a7d-4378-b026-f78949422144'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('0cb0483c-8a7d-4378-b026-f78949422144');
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
                        
                        id: 'f612027a-f9fb-456c-bb8c-6d2746c41975',
                        hash: 'fxuics3pjl7n6qydijs7y4sk0mi1gvlajssteu2e',
                        tenantId: 'a4a66140-d192-4905-912a-8e7616c24c9e',
                        tenantCode: 'owfp4vzr2tuelzl5saikh88u2jk5848ap9cgfsgeciqiq997ro',
                        systemId: 'a1bf7374-38c1-4bc8-b78e-56fda58ef9e2',
                        systemName: '57bnxcme7a8vyd66w932',
                        version: 'cjpp1etk7689auyph5kf',
                        scenario: 'azlfvlxk037rybz70tzulm3a5e5f01vkbdbcvv6yk6clmjqe5ais2irmue6m',
                        party: 'm2akf2zpkvtjf17mubyvkh5zw92tk226sn0fev3vslc0a0t73ecjvi7ew1xkpf7jsy7q1mdwu8mdwj9ob5ov5c8e5tab27uj4e35qdqriumnutokm6q4liqnaxzqkkjlwmxdfxhg5v0xrruq4t0s09vwosk30q9h',
                        component: 'f0bn805apr8wx8q7s0tb4jst6ngszqviw548hbgf3re214qqgzhg3tii7gd0gbz07anvswe3xcv2ihd7fdg84d7nxqi3or0t9bmr99hbrlmxtqil174doogyjpr0ag21jj5bi29wenjfares2uvnfipk11kt80od',
                        interfaceName: '3633f5jctr8gn3q0dz1orqgpvmgzcq78cnbpl4tbnavdmmtwl16wbf4t2jie77r8hbawecck6njbp9euihs3ejnvs9g0kbfs5khdgvbppbs95m7tmpkuowemzv778dcdzlw46hv5asz34t27vqgouftq11be6uyi',
                        interfaceNamespace: '02jzfzyrdyn9dbktdywl4uqapz8ux7w7aox9dhdu9nwi0paja4bws433jpieaxo0nf8swf61aa6gbukvur8z6kmh8nfietjl2md2axmt4qnrypj9ezmhw0v3zl94j0hycmg6e7bn4x6zzbwykev9hzvdhzbgjmbq',
                        iflowName: 'mneuesltplqu8egnw1ozs166hge2k19w2k09vyn30joanryi1re7lbb7ylaxf0vgaj6hqbc2xvzb5cxh2klkswu26wib9ra1eakr25ar5003ov0xwdalnuiiagprhzgqjlziypr3dexzglihxqpoo2vdsebmdafu',
                        responsibleUserAccount: '5dag9tcz6rvckutzmb0p',
                        lastChangeUserAccount: 'n5u9uic6xgtyqzzwt4ae',
                        lastChangedAt: '2020-07-28 18:49:07',
                        folderPath: 'jgp1vsv50oxw72a1wt8hk8plesmt4berksolrw4jykwd7on6cu1npduy3wv4r0cep4eedo8auemagdukm4lq4otq0bb052nnbmiwvj0pml26u1ee6qm9g72j9jbvpudkfbt0q0e0h7balpgonzizbxxh8z3wauhs7wv7ry9zmyjwbqivgkcsiqle5kwg3xxu4maeezimop2ard8f60yex8euauuy80i8spe7ious8xtv8vfgrozvmg8plpv91yv',
                        description: 'utb1s7qutu34b1vzuscp88rsg668b6n67nw8h6hmsx5vh1bb1p5ta2z3xf2avjln7l4zh76m6iviiilrl8maade4axlfefxar0orqgrkbwr1t6cpnwmrdg48d349r0gvhb6warjens4jppwnxcow63ykgqjd02ohsloyr8m4swzrg7hrbsrdhkewlx0kt7303ybof6ueiedl9bq7mvneosf721vahmm9nz278iymvf2br2gptm14zrzx3fizn2j',
                        application: 'pz9tvk0phuvhgh3ai1okyo2oyaz24p0lqcf6eim3djaqbnkyq77cbzp937s4',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'c46e9a42-284a-4d69-befa-c82e06e3c3cf',
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
                        
                        id: '0cb0483c-8a7d-4378-b026-f78949422144',
                        hash: 'jrueso9r0mgkki7lxr86hd0cwboi3yane8jie9fg',
                        tenantId: 'c7e37d86-9aa6-4fb2-afd0-df883496803f',
                        tenantCode: 'ah27cr0t1uzjqm7pv40qw48bd52zlu31cytfus1l5eukwsdxk8',
                        systemId: '1847fd8c-663a-4a25-9186-564787c9cdb5',
                        systemName: 'aq3modult9b8oga699ne',
                        version: 'qpiifswzslclldx918hx',
                        scenario: 'uqxnw68rc1n2m4x2asopjypzlnz3iuv49pogibbgsrg16ncmbx0jbk6xs9p9',
                        party: 'lhjd6sjxkkv6ch3uiuodzr1zm4r478g0koke9csmc57dggqqsg6r1irg6mohqljzonavh64d162m1xgs8e4qyx0a3aph8b5f8oaq6l3y37k4pyij8cvdkr9o9yacrr5t0zpsgi0lrbbm4fkaft50d2umbzzvz4pl',
                        component: 'xw3vvu3o1ji9k7q7zloow37coz2wbggfedd45lrq5hjfilogwhk7e4wrbnohsv7urhoc1yl08bos2g0wkt9t86fwin2fxxnzaszdns9okd0c1ddr7dw25i8e1nylcpx52b49rh77fqf6dpsc3xuuz0m4vviloe1w',
                        interfaceName: 'rikgiec6cr0xe8lhfm81k5eqny06m74m3e3q9y415sm8d6ze50mgvlsmovm30rzvzwwv99a7kou1205a8a9yomj4uzrfyjw5786vm690n6ltlwo3l9xikscvswth2bkhhlqxesvfboq1ntg0eo6bcjfac2p2xp8w',
                        interfaceNamespace: 'xvxja4f99eoo15guc0du9aoxd3wu7zeiiirnccpk00vurzlq0me7ls9lmgjb38141ogj54gnboly8wrtpljyy5h3ejsxssko427sizy7ht6usynhn8ipwepmf60hm3tsm33ecaq797jd32pgctijjk14ar39yhv2',
                        iflowName: '0rjqj2hhh433tfgrj95c8mgfken2nl2vej6kh7q848ethe9vfp9u89ogppt0nfa9tnw0efzxpavo1w2akm23mtbpcog7x506vpmcbbhrvw3i2hrm6ykxxzaqqo7ka9xa3z514wg3ms6dyecjtw73suqk2xlilgzn',
                        responsibleUserAccount: '6hsxsmeuw60bhbczzt3k',
                        lastChangeUserAccount: 'dhc5gcbthj1glgbzcf6x',
                        lastChangedAt: '2020-07-29 10:33:39',
                        folderPath: '9w2esswx11rboz8kjelz8777ao6todobcujj7v8o2jh8jdb79vs3wiajj4lm7r1j8eh34jevpfcz48s0mfsy3smrblgzcdwkzgjuypv02tggr2evtt0efaqjjkfyfra9q4washccs7ow0kjxbpi59ptwd8w53m2cpo65a7h8b1dgqyn1o2fvy7hu0wonppw8wnf6z3jlvofv8gxgf17vepcv71pdupti96rrg3ek76odz7lhuhr3p7kes1ztyrz',
                        description: 'oi3cnaemt44z4af8rh0vjrfxyj8xgnipsw3mhycglkqkh31126dl51nas4tlblr8jh9c0z9cyooooaj7vqdrjn6i885m2kbspkdzq00eh89gx8jghourmou2ot9kegkq7jr5v0zjotkrbsi72j8gxwrr981ymkyan3d801swic6vhclcmlciqvsl1d0gxmmdtic3fccc9oopj7gw5urg9botcny674u05phi0m5au0glowvom9qpfzjho82lqb7',
                        application: 'e2j22fbyb3az8ost6jes789yx4k7la56zroyr3hmw1mcjta18isvrnz4i8en',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('0cb0483c-8a7d-4378-b026-f78949422144');
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
                    id: '0cb0483c-8a7d-4378-b026-f78949422144'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('0cb0483c-8a7d-4378-b026-f78949422144');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});