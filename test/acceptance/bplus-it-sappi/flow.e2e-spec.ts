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
                hash: 'rozkc9xcnvu0e9x3xnr3jvdchjgrgmnfhwvmw2vg',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '5gxlc3wm7ukvqsysi7iblcv9xho27n2ax43fzfb8pfe4hwxrc6',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '7q8hj5hinskkbucdqaxx',
                version: 'w3arwi4excir1hwkmqfz',
                scenario: 'v25fmar0o9v8d32x64v6el1ngyhw5t1922phbig5kywhl9gmd5wv9d5k86ct',
                party: 'wveggazygmlfdv4n3qbrw73epvou9mmfqtq8x7fktx8buayy43ek8dj3us3xd2wgzziskdncex0maql0gakb6gtljx2ly7272oz9w5xrihgkdvhxd19hur2hfqiys90gphf6by9yzd0x7g9ph6briye7cu78u1y8',
                component: 'rp3d07mwpa7tjxt6ocs0tm58qadlw29hp7d8scdk2p4ouszcwec5gw0csmy1ef5rhtg70r1ejshlpttd8wfbymjjxg4btw70h0mlsk546ebphzru8b44yunra51wp0zybzh05l4dbzmamal97kiri8qmo6658f19',
                interfaceName: '718w35jnmuxt74ubs50b0d88e3p4dj2un52v3rd2hzloh1e2n9qc7lk8ovu9b6rriat4opreby5qgr0w31uniz759ssfx55pab71fh0tp41j4a6s08s649fvyfvvfibbmuebtp6z1a30e48awkj1peb5zcmzdacj',
                interfaceNamespace: 'rbplxww8vipfszcb21pm90gi4pmb9ej0rrz7njvccw4y5frr106ewtak0mrzrctz4fvmuerx6tk3nvc5aixa04so46dgqa2kkmx4c0mbohjkungbj2v7vluyb2fprjbxjl8xw71q0x4w5xgoxzp37dee5ba2gy1j',
                iflowName: 'zphklfu0fy3celwas4kotc8flr9o4drgup785u4lyz8h3rqrsv4m993koj6lphpkl2fzmjzub5mtv5kx1v8z5r2j7410dlpwd5yhemssuqppz02sxci4i215hp9t292fcjgp4vqyigvlq3w9twue87rfrdj7plwf',
                responsibleUserAccount: '3cy6ocke1ynv1y3rvzlx',
                lastChangeUserAccount: 'z4kbu47wck48bq5gpbqk',
                lastChangedAt: '2020-07-29 00:57:06',
                folderPath: 'tju58i4kuruyvwjlbc1jtco83ken3l2ovmtlxpbfgtbevu5hcznp5c5cmhx8vrfoldiej0le8b7q4sh1yjnjxr7dn8qq75mdbzv2vipx2qe8rri6udwxlszcl8f7b5yjfmr50vsk84aboxbo0e9cd2kvw0at4ktut24emh2ygs5g08rtagryjto4b14cjfg50c2w2j03w7zsk4xh54x9vuwd4ljakanr042fbq9yhrneatk9gnpc2u52dcyso9n',
                description: 'a8rpq46rcl2rq0abo8q14qh0g9wnbffb7k48puu2iyvtey5dukms35833hzy0c82ahlezvtvn4tu2wlgoz0s26fpjqf4l2bfteiz25ryvq9l7yqp6sc08zyyu5lx8ipi0a6zefq9aowev5xkcc4osz6f4zqgdz08aqiy8zgra8emibqoxziyy71amyhwlm2y1utxhebtrxklpqm80nv1aqocgyrhfvtbeph2cavu8te7jdxdn8t7h95w1ttcf57',
                application: '3d1uazzqdrdpkxt5ow8hv0m3fvspijsplzp9bc54uoik7cbezzm0x0wjsayg',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                
                hash: 'yelr3e2jwzsep7nvem6wsbm9l5016w1zqcdxz2mv',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'vvw8uyagsx3sgjqj8eh7tbpumbr9qi7ynlothi5ks1acsqng3x',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 's53xd1o5n9o06jkvvbma',
                version: 'f5mjhjncwv1maks1c6og',
                scenario: 'hckcvqwpd6r7lx8bxwyu3rnk9txwa89uab0gge76lm9m0gzi8h4ny83dkxig',
                party: '9qmt9wl7b6go6r06ztpr2ikw8yqcnuaj3alqezs9mpm17ti4260b8px174f1u2jxoh7qqrnb4uz6rwsw2xxad2ghfnipz40hky0mijydca2ingcv6uba70z4bwb26ggbpwcj605wmr2vddfx9v9e6h8m0va63nyq',
                component: '3awh88etc2ovzclgpivj0yhbr31dm0hruubuwsqx54okzq5pnafvh4m3b6p1srr6n3v8fzcoli3sag478a1z8emae58tssve77579cd0w028lsomj9ttmw2qz0t6bzbsavzovypgwnytl232aq184ydjf48mxrej',
                interfaceName: 'uf9qm3ghc4wq84cz820xef1ydhcxnv6e7gq55wt4siumw5xcnt37wardc7uatzadfajvn844hk1zm2vpb0mtdg4bbm5cv6qlu3wr8qop0fm6d2krx5o2muzs9qhv8zajun3teqxism47ldlzu3hs3rpvaw92ywhk',
                interfaceNamespace: 'iptuwtn5otutqj7ljivblvgxrdcyzext1ep8cyfvuslyzup4t7dargzs80jhwe34mnqzj4d4kncstt845sv7sl79j6v2s7nehug0jwiqv4lhe0h40q1ob36j4b2tr8zbxkfh08uve2t0k1ou3p9i7sc54cjfn9y8',
                iflowName: 'jptxtw7od4xah88quhns6omdmy89yasmsu09jvbyjg0lg6b1ixlthc4i307n5tuzt9260s2zmljfxkfyo52p8ttpfl5qdksusii2nf4f6sx1mt7j2ibip15wszz79e2k1ifxo3ocksu8b1zzajuylekk6bfd97l1',
                responsibleUserAccount: 'xg4i1bk6rp6bed0cs31f',
                lastChangeUserAccount: 'akzy2mqq2c586wfhalut',
                lastChangedAt: '2020-07-28 21:29:11',
                folderPath: 'udj2ep1sb2wmy65f09qgs49h9pwpu3onz2hu2m6os6usfn0zyxbhtewzzp8nfz2euox1o3o9ank5jg600iib2sy9w9sccnqgcttorp9v16bdhsvj3xvb3hg6rbx3a86x4g2difu5fj784od52st1oebk6ojgoc2dcj4iq0xnz0oue23xksqwgmbzp2mmc5gdil8pik8zlin2se3492gp31lpzndssbb2gnearbac0jzqvbxfb13hy8x5x0tw440',
                description: 'paxygidomuf0q8280jq8u2l2tmh69lnjh4q5nu8mxn5md7b19g2rb4rqk1hrwmi9oma6fqbmjoi0a9rkwkh4vuw74iboqlrtttod53jriqkvh9nf28lp6jm248jlzuelelgnvvacew1njfdq2eoobp81kq50j1g2q2a364nfz0e58wnjyfga7asusnsmkbt1zjtb3mapf93u3gg5g2il3lqlpefmnx0nxfe776kecbgbv47rle0n3451kwl7d32',
                application: 'yi7rzixm9q9vv9xs12vesgdu09h61jhg0lt85p1964mhml0rd9y4mi0x09rf',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: null,
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'nlp0lzbinvrd4ff81ni0iwdz5x647pf8u8pwkcy1bmqs01yhgf',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 't051d2g2s6d8gkvw2uan',
                version: '8wshv5d88a3wbzfmdphh',
                scenario: 'p6kz9brsfj99g3g3zbcut59xc9gl8h2ujtk47z5btlhxa8okrm7k5rdltjgi',
                party: '19u8quntsd8lpwcqyit74ce3u2axuk60yczqykf3icaekglun3exmf35sxsqfpyws0aux0erkvc589cz9fvlwzi6sd1lw58c57964o2wbd4tgh56zjof4eusr8zrrv1x6shr481lhwc1jc4q49os8h7rmrclw22k',
                component: 'v8dsgo6to3op2dnz5i218c3qvhxzj6mvf8xbyrkh7qsgrlgubcnshp4dnst289t5fgiqsi4kuiqr5xt8u2pa1hewn0nsi4mypxl7tv2339ogi96a7vja04y1597tfouzi64r0cg2bb9q2fxgl0qjw314r3l44y8p',
                interfaceName: '9sdkrjwd37p3jsdm38onrvlvoi0x7qcz21ikgvoevqt9nvqfu72x26lgk0584ly6zubw6tyaz9mkjw8yoaqviemb1xbcqzdj1i0qumcxln2czxx7l48ocejgo2tugt2x8uy0tsporulwzbu54ay4554p0lv6ju2r',
                interfaceNamespace: 'c5zvn2k6ha8aa3g30hzq69rq6wk490dq6j7ndia6ynyihjxxeiy58e7xl327slfu09zrjhl1xs909al9lxzpnylbqt5ye74mauf5r09w0opnzck7v2rc88cnwolg6ohdi45uwalb3ua6n6fob8r2eozzqexzkwug',
                iflowName: 'ekw0ext8k3fbifvnzlvkzj1jst0t5mv9o3oja76u55gd7g1248ygbubs8emwer1d6ck46t3cob55bo3va6l396tbcbk5iwh3ijilxwvtd2dyqgxf94jhx87nlxbs9mxzsvtk3zs9gxg7zsp88x2v606m0hrmf9yq',
                responsibleUserAccount: 'xhf8coum0f108pfbkn5r',
                lastChangeUserAccount: '48n7rdn63wqx73apzlxm',
                lastChangedAt: '2020-07-29 15:27:19',
                folderPath: 'olj3cpn5ahk8anb1cpfuv2mljzv2t304cgdfbo3dm9pcoiaskga9mjihi9gfovchneun2ief4dhemrqcxrsdfmcvepj79qmlon08ld9hh8ivj6yndgeuf0opqfq4vlvlm791svhiipid1meppifale3xeij938wvuexr4lh8x2gvhp78sdjkgzyanffermwwjfgwl381vo2kufnw07waxrzxbm1s2c2qqx72jwamfxxa2z5vu4z0wr63opnbzho',
                description: 's1y1guozoo203fxywwldp2qvtiyx15mqxjlpxufszf1nsv0x1one5y9if09tgr3hjvpz363kv9xdldj67kglz3vfdlwpjevqoup9bq22ejz7atr1y2uyz22orkeick7s1mtb6v2ni9eu5xmlm97l9x2gc4vs1syhf0elnikcjrkaz0r3hr8xm8spq78v8k9w4tkfia9r74quuzcj8awmuge61u6l6esxi3j2ta6sxdzv65g6lwrb17y4bic93mz',
                application: 'eaoakfuog58eaqa4ws2hyhhrsbjza27209nj7bqokapufslio9jt96j8zina',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'xf85ykbqk48wt3mg7qotwy5hf99hkvtqt3u6rabdkz46j74d7d',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'tvf1g972z6w22fohacpi',
                version: 'sm2o8n3bya8rn883rqxh',
                scenario: 'd4ohd0y9otg4un34ivbt74x2svrh12sz2mezd7tchf16lbvx5r2t5e50dbd1',
                party: '4sp4w5x5qsh41bimw8si524c6vho013x9sbdx3hft3040ou6enpl3g3ufalsus0bzmkxi7m78605wag3rj0gjf5hq1e5657z85prrbec2s5gf31e4nn0i2ilteji9inbvb9x7rwbpum9poqc9m7ozyzedf6p2gob',
                component: 'dz3pqci949avkmup7iv9si6jbpuc19vtov0c7fsoqzhj2bnxthf6ue301qkzofnjq0o6498hurbet4dijyn11d23dwn35cbk0dvkbwm779m0tkokklz07h147wlmxlvy4ayjleevoyj8t84vrfjt46w8xonyg0h1',
                interfaceName: 'nkwvjwlap0ms440slyrqtuiv3mlfc0rcs0oih1fn4ms2e1wrpqqm8t5n3l3q7pa90v1m5enj21fbhuva1dmdpynph8qjgkxe1rczebtucx5nexa8byg17bl03yv96n08x4nt4oyqwfkd1nx2sno8td5lg1kkx3s1',
                interfaceNamespace: 'zaa0vhdgcarudd2wzpl4lgwesyy6o9qwu1xfc3ivl5dup6jgr2t72owdi0ymoyhwk2nz7ph1iblbvsdft4r803l740wzsyouhr2u0rv2lidnkilw5tb8016rw1z9r0q6kx67trw4sij6tsgfkesopouo2dn15gol',
                iflowName: 'ua45au6gwrsx49qqqn5ehhwyjswr8tkl9tgn1qlkatcagjggg34ve5yl90526fnp17upqwt2ftarw7rnptuxsoux46hmqg83tgp9dwnthjtsbo0feehvz9w0avrns8sa36ud8nc8xg01abm7b6g4npvdkpsp2e36',
                responsibleUserAccount: 'zhg0d7znrca1z18yb2dj',
                lastChangeUserAccount: '4p54byae028qx8axbgjf',
                lastChangedAt: '2020-07-29 01:06:50',
                folderPath: '66jzcoute74590bj80wd635lpuwe4s540cp9fzk2j4vgnxm38ort390tf0ukmz66px1clur9un1oyx94k4hrewjgp9df6yoehvn7rx82za3y5w8rm09tnq4twzo9frga3yfp25gjnoybjiu7yti2fj33uecox1105pu68nap6k9cmpv9mz2gkjbss18ng9bs1b21kvmqk7o4erq0027frg7ah0iepwtasqt6hh1h1phfg1w6d1zp1kf4zeyedej',
                description: 'gs281ajsd717z3excltiaeoun5wygsd9oiqjzn0i2spb5vzjly2shz8gm3hvxlfr5tzf79l28cuvbwrvnupq28y6pqxirbd8czm94nao0p25uyyry3mgekdl50apqfmn5xaszurjgmwvawnv3dvruihmmfh0k0f9kg6k6yro7ck0u832ejltzj0worlk6qi1cauyz2iro9e7sduw3op7rsg9vb6ywgb6k37pf8z87cjp9b6g7cb53m6kfgcnuy9',
                application: 'sgroy6b8qwvrl4hf1zw70fefbvwv3gehzboyw4et7s7k3uvo336z9pqogdv3',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'otiuk4s2bgcp9p679pl2q806d15vgr5urda1wvxq',
                tenantId: null,
                tenantCode: 'js1ml57ohxj6kh5bk8k9qgh057jvvr4ogs5rak8s9s5leuulth',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'ez9p68jc3hf68om5hztf',
                version: '3umq2g3s4kfew448calp',
                scenario: 'r2mtq6mxln6bw6h3ijc2qyochvybijws5cdrc14q7l0h3hmdnsrlnu3hlads',
                party: '5f8sun32rn0otnnazw9q8seza3am8206iq91mu81hwvg3brxvx2g1k9pqo8pyrogp7m6lbiolbnnsircx4mbl786jbhad2czborrju2jchb4l10gsfibnhsg6tpq9mu9qx54xn866bm2o520wyh6bf3yqf6vm9rf',
                component: 'dy12z1zhyxocnw3tcudv2en1qjn0v65rxbok2y8lj920ovdnx6xar98u963zd22u565y3kucwqz5jgbzegvo8lrbomn9a71889887gsmyqcfr7bhie4j4f3u8yrpbyfhox77gi7wzag00bbef5i5cgecjpyxqbjp',
                interfaceName: 'ga24wmvoua4aukltlpkp6ogbrmcnd2siksc4kpp62k6x5gucszxcqtk25qpp0qcteec7oz37yi75dlnezd037i1diwnltk762wabeyof3lsd0hya7p8h72v020l4mshx2kg5b1k2ku6vpbb4kzfqaevwg2d9zkd4',
                interfaceNamespace: 'c4dhpjr2li3ssywbb7hy2mand8dr9l8rcur25wpiff695zgd2v2yxq3lttl5cu28zow2pvbod9yiasffbg5b2ble0903273tetvrpbl686mh0pi0j55bu81a22lyvuq3lmxyijp8xg863yd5chjm5p946brdurj4',
                iflowName: 'g0z0dzql3sum4ko9bmh1ydhi3qwdgx2m4p7s7vo6w3jnyvdo2a5qqay3ibb5zjg3mxwpjpasql3jozgiih1m2ncuc5w5unklaivxmguwqgf3aas68ch1docst4ot3d7kpil602o0mvuvvsufe036ig2ubaj3ityc',
                responsibleUserAccount: 'j6gdhniieo3x8bjrofrq',
                lastChangeUserAccount: 'huv73iz2yon7uzb40fnb',
                lastChangedAt: '2020-07-29 03:55:13',
                folderPath: 'i68ruucjgjzpsxn7kdf686rffvdz6knwblyxu728mpgaa2zwznexjhkkttlf7074s0kkkd17ujem8ehnpgwy7017aed4qinvhyocn68vjb7f4zyv6so8dyt9dg8x43i3oj7c8tz0yg6blh3hf5hb0tpru6scvzy6hw2wc0jboqfgiz88brm16u6tlee1wxmhjyvrrx88wvp9yj7kja5rfudeixl231z7c6clwlfdquacd3wuz36afw4erg0uj1w',
                description: 'w1mv6d2tb69re8nrjpnr2frwqyu7khe0zwtlyf7lopxlnbf8xdkpn6me20rx5r4boiollp7kxp9hqjm5caf1fl6o4taztqaez2pnvui98r2hjtc92ma3r2vnxf5e4plvpxoc7f7fkguo11z3bmvh9r9e761qab5ymee5r3op0pnz0u81mbqg86y7j9xurc1gdtuvs4nv6sujj7qo1afdkqs41125w6ue274qpxelf6affrin0f52dae5q724if5',
                application: 'z6sttov51tarqvjddoctvdnnatqjoygfuoccili08a7b76bmulhmdljtdtyj',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'r2b3tgninnj59l00hvzv6gijvmmg1vxfwi699o62',
                
                tenantCode: 'xj5zk8hyp90nucyl2ibe1i0ii93z955rmlphv3bm2ik6kpbug1',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'ap6jahjg9fpa494uow4f',
                version: 'c4ixwirs41ia43jfsb1f',
                scenario: '41okcth8m2m1if025wgwzk2xl4th17nrx036naia21sjpeqpar0ud404t370',
                party: 'uzemnd9mwtk1lctdrfndqs3w58r1grc01vqd720h434uo584n8v6wtgjjcb4zh0ocmoholdjeze3ax8xel9oabmxs0oxmma5fmgbj6y6rnzvpqmlbaeix456cm8u1x1vi6ivqxr9w02xl7jdc3tft0kdktxu49gp',
                component: '6a2yv1k80wyiaodjl2dqkfefdh984as7vkanhnh3t9vosg3dju36nab46f9e1rp5gjd9aqqg3h541j54997g62klhg5vba96cg29939dthqfry7v040y58p41gz9am64zqanf1r81bjbvrfp0l0o04j5eeqkb8to',
                interfaceName: 'hq2p1kt1jol69wf4qt1uy4k8z52ecr3lrtei8dh9dgdr91qw18vvl837xlustkuvqjy5kw10f7ggy79o21qjj1etpe2mtsdyps4hgr10oe46k9vg5h43qb4hvyfato6y0dk6dimtja5c5sslhvmmoh12h6xjbj1q',
                interfaceNamespace: 'st4vsep8h38d7i9o66t6d7z3m44y7whvu956uiuvrze9ebd829yr4bbamqo4p690spzwrynpte2rxccjcf1og7q38fy6k2nk9hrb70xpb38fgauqawbomssrc3i1obu8tgnvh8z99xvm4gnn9cjn8aiasvfbxqfb',
                iflowName: '9utdwyobm7264gya01stl9i4hl2xwv7rqpn4my5lyyqzvuowxj90zkof510ote0h2s5apwgv8ch3utmvwljse3blsdo1180w5qrq2lu3db4try78b04vbj0ts5z299xj4wkedp7mtt7cmg7k4ug3sfjxhpiecdir',
                responsibleUserAccount: 'bb5d7wof1720cgpxsawf',
                lastChangeUserAccount: 'lhqfw8wfb3ltywp5sg8w',
                lastChangedAt: '2020-07-28 19:29:50',
                folderPath: 'y0okik4ettbx4fr7xansttu2zy65z13icfxm5lfelbt8d1qbpx9f0avfuyi6sea3cjnxx1bpj4gc1ag0ky3z9kv889fj5oa2cv67avy47qrg0vk3f8yppmsn0pbvuc1qcjbawmdr6vf1jsackbchuut8qldiv4tad2jg8i96ods3mivl79kcemo6jo1viq8h8vobl8k1qmhzema8q599lls69zwzhld4skwsl0en7e4pp30pykliqtrk5gmjor6',
                description: 'zw3nm8hlk4u16r8t2fr6n2xs9c71ftqq6cg5ghin38g7039rhbu0lg5ggxv6ko5mis077i6kdjonr7r7xenf6vo58nnc36rb60xcuaenqn546eyzmskqj3fltmbasxqd6jt721glypm9btz9gztub9fiydrrr1f9euftb9spzlanr3hkn9yeb2wrgl99nl46jo8tukl6rgfq1mea82vla6irtonkufamz3175r5bzhhvnrt7yzsgajacorqdo1q',
                application: 'yawm62d0ru01la44k40w7h7he1bt00tkjyunn9e1tck9a3dekfx7wyr1cg0k',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'd62jvc8y3wopwt001pl1deatgrfs85rrl9aik36g',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: null,
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '8to2tsvwxuu6tdy073kk',
                version: '7sv9tls6u5nctyqyiezn',
                scenario: 'isv99rqqd4y3lfsp3pgljq80fqym2lykc20u3sglz8xqopxlr1446gjn5sbp',
                party: '1p5zsx8puiwi1bis4hfrs0rgwv93mi91ni0s6klt2pwoqk8hyqdmvgww1z1b1ns43cbvsgeo2vg4uc0mv0dbp2gf8j0ktamb6d5ce7jl60b0twb738sny75h8api1oqpgt63wetf30niq4wsskzl80jtelbfevcn',
                component: 'sxw5dugi5hg86ci9885sr3vme6cc3k6t07e3v8bmwo9rwwp27wh5b7cb5m397fh1kssm1ivb4trblxcpt3hbu361qmf4wex4tvataug2thwqbzcxkq1vz29hpa19mbw12tkvrsvtf1x7vgrrlimgow7glhedi531',
                interfaceName: '1trrlyw21ko9sek2zjv79jnt0u3bu31r8r9r2t7b6aewzo71x990tx4vsznxblzf3f2yjukx6dvkb46l5iwnugxe4hf5uf59v4zk4qy7n490ypelhr94uihql34fhf1aksqhsmcxi6ej8hpvxzn2xg6mk75cnhxg',
                interfaceNamespace: 'kivdf59et1i35hpozv2hrhfla2er6ywy6b7j5li3ljk9pdfcnrwx8shwq8gvdyuzt9kis07arhlmlqrcds4fziwi8g41rokfq940b3803xjywifuqoy6xgpy0fpwtp67kqapwfgnzt21p6y38v50m17vpi4qppap',
                iflowName: '3b4zrarxfme0v0bmg5qtlc637ifbsd3gkgyguppe9djeb67vpw0d0ozl9i1c9n9ikairyc542v8rh3uk93wvu6l9ln5nd4phr5a7og8xzkgeqfqppx6ebc1sal8qh7co1k7ueanrbc1lyrd4k034blz9wto5l381',
                responsibleUserAccount: 'cqi8shpxrk7b8pf8t8br',
                lastChangeUserAccount: 'rhe1m8si471o91ktxy6o',
                lastChangedAt: '2020-07-29 01:23:30',
                folderPath: 'nfux64w3622x4dzanfiqjoek0hhnbggqk6v14vpc5r6crxp3qye2rpe0cq2xw7kyvjdu1bzyjujekp2cxhrgxrrailmph5nb1wd1oxqp8ulwh17ikoq41ghrn626cvazvnxojnmsv3a8ofu7ywy3nefpfa6wfjzyv7tzzbv7aj53pven1csaww87wzb51eh9fo8umxwur6sglac5ukk5x3lfbihcyv7lsul2roxr3sp18j12k7tr07espyqwuoe',
                description: 'futc12l1n4i2679jru6rdyh6a6g7imcwq5z9s3wr08q4fmbc9fzovknxgd8hzwg0h2q01wjsqh80dmptbbcnyp35dxufvfdqpuks9j58xlnyoeumx9m1o2n92v9shmm4vf9dbbh8zht9jn0obwdkvibyegh1zqp2figidmracgujx3kfpm17ciyzzrdc7twgnq868k9mtnglnq22shpv1vh3fsicot94dc0xj9uz18fdn6smi8u1g88gsfjh122',
                application: 'mypz7kp2g4uyxagjg4x5jr08hqt4sl61j6qhq6y6ycugbi3ent0bj7yj3fiv',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'q3gq9ptnvsxnq373w2c7a3mpeb38wy1s20gw0lpp',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'uzj86yzi8hhpcq58hy2j',
                version: 'y4t97ksj5igcewkokx38',
                scenario: 'tsg50e6hkd2tnltvviredam8o0xfde96f7eac1dvyt9rppebgs1mk9nwj7zh',
                party: '6ufhhn0xk8k4sh5tce1iy636mhpd067yl3w09dhlnnmeis7iak46w58b3nmo62vjyftqnmzusnt7n97qrf5beq360d71ykhldp64nwjuickqtgwej5ug1sbia5xq5cqs9gqv1mvoisf5sceqzeckmw1umk82dqq4',
                component: '8hc3h5lf0vo6ic1ld90gqvy9xex144m1rpwozt5lgvrnvohuph3c8ttaya9bay02j6tg8h7rszpuig4zob6rt6k6lrk055iwrgamm5x8igtegmrb745qckvojvocg0wfnms4y46xlhplz4diziibmt7hz37lp0w4',
                interfaceName: 'yt1lo3ld828dv7g8z81ypfhcvwrh49dko9gpaykl1wx2nxalsldd0pyfrxju96gxq1bazfghmxn2vzu0artuvze2j5fexgohmkw0g7tc6mhu6ic433py29j2eak6v2j02roj0lnn8dyby4xcomyi8kh73j29i205',
                interfaceNamespace: 'fm13irbj6lwprv426k4488ui5og18zad5ykxtri0v274nv9yjcrowg8i578lbq0hxlqw2x26nvo09h5kmj8s1lbtkj6f4r3qzzue0t5zefwd7ltsfxucj9bhz0f83b69owcno534v0swhbbspb1zrduy0c7fzzsw',
                iflowName: 'leo97t2xpbw3kb1mh1bwe30efslxv2gpn4n1chiz2fikfflujwgb5myzca9kjc5sge2la2n2jjpgr7cllk11nvjnki5mrwkba0yg0odyrc3kislpxlbc5tiepkdol9fuicmoar43yh84crt7ladhsamfy4c1f2pa',
                responsibleUserAccount: 'w0k64q6qgn5j3l3fp0or',
                lastChangeUserAccount: 'qocd3dum595z81r1aqoe',
                lastChangedAt: '2020-07-29 02:37:59',
                folderPath: 'e5fb1usgf1rrp1f2otihyvvhsn175gqr3tvktlz2oxlsfvvbolc1xmhi59g2x00wkk2z2w4ovxvvrd4779togcrci3juirz6fyf9ywk5qu5oxcx13k6fjpq9mzlx06l2l7c83dnmkpt7krqyuxgyct0i2d6btktpolpijohbt2gse8nm4p51c1s33uhqh7lshwlrn0aj4fapzsszy7c2c4kacvyptnmrl149nemhulq8nv9uz3nxgzo1ivlondi',
                description: 'xk2o1ssvrmi6ydbrvc9s8dzdrmbbf64fo4bg7kie7qmcqxqaej3o9twhokmlxjlnsgl03tj6c6hrramg6sg6tu0ed5mz1wixrmo9y57dijtmc01r43c1uqmgj4orbqa4sh97wbhkueeij8oo83ksubqmxzjmzl87idbrk377bfh2oemxtcowp63xjt8k12d7zphwjji5bxu8r7xhwg34c14hd769ilojosyi4bh8imqiqz5cbm8j1rcjs6ziqwy',
                application: 'e743y1ap22tcmyllpy1ia9iiismpdbuoe3cgqojp96x0otg5pdz1lnf5abgx',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'o44j1wys4zy1ax6leof3y2k1u5zl5u9s1zprp8kg',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'dejeo2j5lzkg91be9l8s7bi83rfef5nului1ty53vbcq94g8am',
                systemId: null,
                systemName: 'kvgktgnjopn7um4matkn',
                version: 'euzd1ccg5xd6xajmn4od',
                scenario: 'l06jk3jjzstfj3fa40ieqtugtzi47xyowkfri2xocylle6ve8h51cxfpm2s8',
                party: 'hygkp6t6bia2qqw9obtkamof35mky42np6wjyqzo66p4y2ajidlkp1381e2gijzb4l64dvfg9guyhao11bh8yeqar0a1weiyv8x88zdxlukc1880yq1nforqqzi7tu67745pfexm9wqrwkntk04rgx9ccuui6zph',
                component: 'hgesm5vyl2etam8p5eg27unstdije57nqpns8m5vgn9ftn1lw2wepewqbn2lxd132ku7euc020rlhkptmvunfw92fjl9vk4z89kxd5kc41ixkae5rtjhnwp0v0ivj8c80c7iop6d9s0nhzm8hcpsj6z3h8xq5i82',
                interfaceName: 'rztgmy61hlf2jearsoa5os4aje7jn7xb8sa3ji0y4xdc6ovmmi162m3fdge708h9tw83byx2l4m047tcwdumgppw4vr5vjy6os7mdwbvlac5xmjmtn3xf8jl9fnz6fm6twnkfqgr0vl1c2op60y2nna5jxcdmflv',
                interfaceNamespace: 'vcsdcepueqf34hi66wi6hm2ewyiusgz0yg90a9bb92yyfh30rl3a0panw9tpzdu9chfw5yvwo5vec6rt84xb1ti5ada690q88c8a1wp791uaj7jg58blaxbzr8h5duqppk8aukqx0y3uhxzx25k3r9g96ubymbya',
                iflowName: '7hquxsw68jkxd7inwuxkc252k4dhwpg1ues2gfgnw5mxal3dwx00xrcv6cbnqiuyhwnsp9qz3khsqp4jdvg8omssmtuzxu443v7l8sqjxcyf075hdbrxjir4gzmagdc9crm4a5d2j023s0ozf51glws9zgyeaoiw',
                responsibleUserAccount: 'dulrlax7r7nkcqyo6u2b',
                lastChangeUserAccount: 'fr377bprs1y4y97mdhyy',
                lastChangedAt: '2020-07-29 10:09:44',
                folderPath: 'ptscp4l8z0atniu0vh0ys8659lhy1az0186yo56uydwhl896l9r28xnn0n8gkg7p2oqkbapwv8q5uyo3zb3x30nw41ph9oeahi1183vvljwug7d3gxuwr5nwfy49rqvhzl0zs5bjp9wq4mvuzxagzvetexpviks1g0xpe1en0yrkeg760pm1dqz0ab7wz1l6hfe87nmqug5wkaqmfmd1ovdq3bivf2vjz8h5x28fkt6rhjjw2bpfb0yin2ljfl1',
                description: 'yuj7x71m2iu315zjjdph97ufc718ve54bvwz5dx550bddpoueelx44rvydaquf2okh3rw5mhb91cfl7ckbqqwhclg4y9sd4cc53xbszfnf0ceiznzcol14bhd5dqjqqb69n7xl1scfadv4xerigppwr7odr7eh2dcz7q0uo8nvpam1wdj1jwem80k130xlm92wo0knmccu2p0mjoqhweg74s9nyu8s0a9rbo3p7o1odr3vfdaypv66687onhcon',
                application: 'l8wcwk4ct791mln90ubsnhg4dow659fu3fsg7cm6fgvnpmj7r9604nkxb2hc',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'nprlr72yewd7ube7konrkh62j1tg9ros1k1ewibh',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'ffhvgfb52sbl7hivwr064hy33hwiwtw9d46k11oynsbfa2c7qv',
                
                systemName: 'v6cs0r84j67vs5hfdi9b',
                version: '22v92smhg2bcsp9evfh7',
                scenario: '6ree514tf65u4q044dx9qqvk9u5iq08r63xnt8c18zyyugyq0zizljmvjd8f',
                party: 'vfa4wo6tihinamy2jqanrnrc9btfhr7b76g330lkmtog22xjmt9cr4hsdhphw7yfudv3qv0smfuk0j65hcmggewx7z28h1v0igvldzval0q23vaw2o4lzn9jmh2dy8wadn4bkes23jno44f5a46620oyfjfmqd0e',
                component: 'hdgbw3effz1a52sk6k04t72yyhuh63wwf9v8xpmd5ojc8kq2cfhjlk9w3nidpdmwf5rio91k9ulcc2gd6yribygfhm30q3y0w75yha3ycqep21o30o9kq5v6sy2olr5xs3pdys8bx67iy81jgcd4bxplcdnvijq9',
                interfaceName: 'ue0l5t51duqavxqdgm7wjg0a93z4chot3m6xn8b7tr0vfwz8s9pee3s2z9en48d7dcv276xhlxj5iwzw0sktdc411jhimdamh8dzr8w8l9u5dp0i8dhfvz54vcfv7gu5uu4kvbqb5tqdoepeu8sln91gmaauvxy5',
                interfaceNamespace: 'd5mecq8ou60jz3qe690345wql0r36w3mtiunpbhvtakb29a0ukvpjroui5n0xbwe2mjw7ktlbnpnwch9v2s6mgns9wbalvtdz62l1so398zxl9562mdfum0mz1zsxp8yzqkbq2rqfcxl49hg5z8ot9wku4of0usa',
                iflowName: '1eyicbdz1gkw1nnsbtwqvdhe05k4an73d9kv3xaxf13rbmj3qmueeqr0vvd2gjvttfaf28tbpf7trampno9erdp5a1807mjclsssdnw8aw0s7s5lvr96vrsksk4cc7czqy4gsw3zuro9c9z4jpesqc4k3bhel9y0',
                responsibleUserAccount: '7o1m3npcrzk1iwersj0n',
                lastChangeUserAccount: 'va6g6neqi0c9wtmt1csr',
                lastChangedAt: '2020-07-28 19:06:34',
                folderPath: '4lxzsec3ojtn8hh5sst0l163z5br794oyil3ng3g0q6f3k92waebhd5lr2akgk7kplz6pb7uk13fl3t139lqbvkf5p9avcd7bh0kidcwxagw8laqmxbp64n7jduq0d0a5x307nwmf9udieppz47y7767f2sg6vwfdem4l0412ri4pxt5dn8fr4c7xaz6i9ux4qsex0srfbhdscge1vghg8efgd5hfjc8w0jan3jx2ve19kherqvvz7n3d9bzbvp',
                description: 'nevku3111rl5fllohfuagkynvj5mdgesdrybsknsuzroqm08obzi59zf7bzqoxri5azoe6g8fazwyglelvj28skjhh06sh9jzvqoikz8vzb1dzm1g4ao5ahaah5d2zhizk5w55i6aprlt070h04rwfxe7zxnrm6752d2vqmrhw663rrnle4631xr27hdm5kw08l103ofbnmdl5dw2hsg95vl12v788fd2a70zm7z525vub53mgfpq6i423juuzn',
                application: 'e03517ct0de0p6rq00qwrgxm4qfinvzoevo65kvs78ydndhjk656twdhx4jo',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'kk36ttgck0pujoywxkx8ff8szkpzn96vd83hntzc',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '7bdt94vhlrxpatvfeb9nble5whvvu4uiti40pm05w5mwywpv3t',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: null,
                version: '8tzf0s2o9bdfkywejxwp',
                scenario: 'hzmla4n9z4bplky89diizoi4wuu53amgeg9w5s5d3ow3njwcjo0kpre8dc8j',
                party: '31knrw22uuxc1gga8q6kl3071pfbnzrirox89ztt1xbwsecrro0ow2rp0g7d9covxsrtqy6ggw77jgliugzsr065vn7vxie17vawy8gmoke0g57hlsokddb1r4a6swy7amstls3so5ret6q5n6s2es519b5vosup',
                component: '3xjfl5bkeztu84kd6mq0w6aex8yra05kdn7rm00xz9472vc2gbrtnn32mq5ma4q08ymwov5a5m4arse3iz01onh4738jgqlz1ge7cf8n7oefip7mebqmkxm1jkps3jp16mp14o7a76hdbi8obykts2xnys56k6sl',
                interfaceName: '3qwvawp67m791hn6yrdlr32fnvyrtwjpcaljgl9kq8gy1ah2r9qxo7eyus6c6w4p8xtr4exey7xv1oigsrehyyknaoqv5e7po8fyc0lt6equdk6cyj8mww8mzpo4ltpp09osoyne9ezvy0o7qpwnjqj6opvxis3h',
                interfaceNamespace: 'oswcrca7fg3ru86yic0dfc2n14j6saa8i8e1f6amq69d0ukvppncttvv738xkcldmdz9is9cegt6lsuein8s9rsabn4z702ha769ipfwge9bkr7jnwqs9w4c72l5isy5437xuv1d7eq5bvo43wl24rc7ztp31acu',
                iflowName: '97l9f2jvnlg1gmw57c1ka2pcn748j3zymuuh8d2fq889lbz8wro211ugxllijbnxhy1y8zlyqesyahak723cp509ot6etocg8xf1ppzhzhqp5bcukguzrg0mlh1nzhfd284fz6bcnywqgnhe1zhqhlb5h4bns05x',
                responsibleUserAccount: '7e7b78fi5cryk54c26fv',
                lastChangeUserAccount: 'amk617cisqx4lr8siy81',
                lastChangedAt: '2020-07-29 03:17:48',
                folderPath: 'to314ukyjxoqcie48ab8z7ptfqc66bp6bii2y15k7r3jjphjemumbgzf2updq1nk2sx63knnb9sb0assyygm5bh5y1eps9d4adfq8caorkjd1h66kr45oxpapxduo13db3isp5rttoau2aqjoivi22f7e7wgf6uoyltrovdz60cm5hupir5ebyu54kotdevsxgos8qls73oe3c769xlsmhig3nzgede0gfxb5zyykvrq2wyyezn8c9h7h4uomfy',
                description: '928z4e2stmsrvoqccp7bbnwh4e5p4fsjxxtluqt6y8g7d7m8tdbj8dn9btfj7vi0av9hoztdazy4uy9srj39pmy0b0pk0ojf0gxshm179neil5z2g9g6otralpm4qa47r1kn8i48u2rvashbjanxhtd2s399t1h13fq6cj14mjnmz1ftn9pyvtrbzsip0ya49nkmw0ccyzls4xzg1jaxka6p87qfp8amsn38b3u5goelicb7sczq39kfsa5zlfd',
                application: '8g1ej09ssj1av5v60eha14ykh1lcv8dx04v81yh43g35xxl2jjze8fnre04k',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'huqlkru0gx91ox4lf77i0lpw5ba6p8v3gcp24bpi',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'bas6brf8gukgfck5la41egv8yq8gl5ljhxsm3it01ay4soyvcz',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                
                version: 'pe5lv4ngg5zl9tk4xkv7',
                scenario: 'p76oega6mu8ue8r8a6jmn9pg9vvy40z9alc21efo2chsi30497snc15i864j',
                party: '55dgr0ii3x66lal329fbi7uu77fkj7r77e41zeouuq8ncp6ts3se4u30yyep989ckbnoagzj0ky2akrezd8hm42tm2ubt1glvz41lda4pagxzx4hmxgej2bi7iyt0k0366wojydhbwwxpcm58utqg7vkzvvh96fq',
                component: 'ju7rnbg0w29h2absgukp5gfvwmq2hf9w1zpx59aye0ztg0kt2vo96daz16tzwdd00cyfg1xlby5m4cp1t02u63i11jf1qrymy9hxso2alkstyu6eqsqjd1pdpoadi0ls4cbcywohwmazrbrehnchn16mmj31ffk3',
                interfaceName: 'bcf2ciomms4c6xnr885q6gpzh1wotxaqsr6tlcgrejhowmal7p1p4g5ncjgzt3o3vs4vcqfriy2w05a4plxjtqa0nw6cc4f87or1jkubmmlk3x821mt1km3jdkt2d9xmlmy7bzn60gf7eff3k1wufh7sit6ftoh4',
                interfaceNamespace: 'dp6s2bydfzfwhg6phrhbuuivrpylga6hpmt1gfzoqcnm28s67rd27tuvn2vuhpxt0ovigpp3vgxwf3o9ftn78xgeg3o9z9ex4y8eqsanu4lga0l0euyh97l7budtgwwz34hd0356w1u62erbbr5u83cemwmy8ywk',
                iflowName: 'ioc2apbpynffule73q4hbmt136a4eav8rssc3snqu8qfhpw7hibqc6mw8y46qe68x06ygrj8hrlax47b7mr0thw4qzps97jienfsgbbtnuyp4pcdvjz2oe497paj8uek7yz5odz8jseeuuzkrwlohzg3x93lhrsj',
                responsibleUserAccount: 'xbz0z0c50lkhthdnok7r',
                lastChangeUserAccount: '2fkf9h43chvx9q7snj8y',
                lastChangedAt: '2020-07-29 05:17:36',
                folderPath: 'bylsbisq0g1zbokcxlhxyac7w53ioh69xyjmb22qav8yyj3rvnuluw3h2ketdql4x8sscbjxmhcaapqv44jigxmasa2pw7lbksc5qozo3vrp7sde6t304h7bhkfznqlueted19abf8bjujfvfsqekj8p6gdrfbl8t9j7mox0juud5medoti5muwgbhz7vxqa4qtzs0fkszfc3jb6ces0qr3kg364ybgew70vf4709oomyggh6kte47vhnpufum1',
                description: 'cuc9jh4nglg4al54wv8ogw29r8irwco16b5rhqcwxs62ww79j0jnyb10xhrllqfcxld393nnls982f5wt39yw2ka03bosc8bxwheimwa6ofvreqftjpj266dppanl9pi8jfa18w2zwvw5z6wp867negakcw7n94umd3frzxd55w3tb6kkbotk1b8d3dhq4g8bzgoxz5gqrl7yjn6ldithtu97jw0lo1v4p680niqgft6kpexelj8pu91hven3az',
                application: '89lkd51sa5k8psdbaeqm65wuq0mefo6jmmvlsrtyb6k1znb90uw7xnrbu03b',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'wc5y0m2nbtsilx73b2cegbqs6mepbxktwc736m41',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 's4nyi4giwter4a0o3ak6j8v0zyz1h5jkwfw51k3eaoikrjjzat',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'q9xy05h3gahudnsoyqne',
                version: null,
                scenario: '40ymz71fmnghepw6e4g6uyjxn81o106w63pmwejabdk8srfyv8goyi45eszm',
                party: 'wdqb1zv81zns3baz7ibsv5johv2sr9b5axjkypyzltisnchz3viv20mr3z33r448qzuswzulfaeyitpj74ac3wkafucixcdcg4dibi3sqsxir0g9clvj1rarobbu2kgzfoxr6dwv07oykyrjfjienmheav50g52j',
                component: 'as4k43shdzs0c7j201umxtmf53843n7a87xy57b3ia290llauitu9o3i39iz3ykjaowc7aay9iubl3dyjnn9irybz855es17g96yihtajvdwbzuzyrunxvofowtm1toadfqpoxnxpx5zj57ioo8yg0ir1xnu5jog',
                interfaceName: 'd6lt90t9p76b0coqkaludfr8sekf4bcub7iyawzq3ot0lnvlmzfkybnu3usxwk8vpajb3jinb3u0oerznku1esglqxzpkhtgtaj3qiwplaz0dgs44eu0a5057yi47lqbhrqbuzh4g9r3bwdhi7dj8tvjbxbutcr9',
                interfaceNamespace: 'w86a3ottov95i9pqxs9qj3505dpyd1s0jttzhw5rwygvcj55oy0axt9kk2i20xxzh125gjuj2awuhz0ajotzbw7czr3549lfgg7r3l738t6xfs1cchxobhp8m7f6l0p821gqz9dd6bg3vvokuugjv2unfw05o19e',
                iflowName: 'x8xvo4ocz98c5e4g1xbgyzpy7l068jw3w4g2wnre9tf3zqmhxdbjficpq2t65rzv4413c9aplem13vua40uxxd1lyrll4g41ufzsnu7gkkhiv02yjaaqir40ndmmf1edj6lpb0ao49huu3ptgg2jwaeakf60nbvl',
                responsibleUserAccount: '4ojyb5njd7g4uu4605n5',
                lastChangeUserAccount: '17j58qbds4ntvepc9xgr',
                lastChangedAt: '2020-07-29 14:29:20',
                folderPath: 'ozm4ccqgl9a0upm608ducr1sqalbwmoh8daf4psqguxcq6lpz46ao6otdkngjhclpphe338qfxmz9c2iucg20o6gw6vrqgvtotfyg6fmyxh612dh627at0rf8t82e7o7v4k70g63hhcpbx6w57wq9347nay0m374w60ql2nx8l1qhjkmgzljkkcpzri57yu6rwhaq5z5vgb3nb80utiy5pfutt7d7r3rarqghjdavo1dv1s6ovpp6ubaovp04bq',
                description: '7ef4zlm123ff6p8wu34vsubyq7f4vtu5i3yc4gla4r883w4vhlmyiglyjvvfrtg1n36awkgu1n2jiaijkvg55phin7lmmxbt9fi4h7ass0bxmhehl9x396n4hvlk75m77k66lmouizsfbbmp482ce797xo6rrkut1lqp2xqpu0wlku62ffv6bquuq37ts7mr7i5vgymit1g8mjqw8c6gy6dvtwr3ftpi67os9n5qg9aq97cadnk2eqjkjy5xrpv',
                application: 'iiigd231alubvfuxxx53w2xu0vyk4khpiey9f7h0aqdjlpecd9une3c4c91s',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'ng6czpvqzyenrv7sb7i62ep46kv0fzrcnq6u64r8',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'i9lekh9sfutkg7jc4m7operhtiugwq2u6gxbycxhmfrxgfn4of',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'cwokh8c2e0b6810aeug0',
                
                scenario: 'o9twiq4t81u390v1ji8yu0mcjqlnwaluw5n89f8hrz9xhtvhz1hka28dc5ns',
                party: 'kkw7evbtypqtjztoso9dn9k32wu11sp5w6ga7dxbc5xi5mjulmkskajvf30k19y538wsm8n69hxapq2tgkboccqwqcmeszrnljbve1z7tezurt3w32mwploav9k761hx2dprikco2vo0te6loow7svwp3mpgnyq0',
                component: '6hrzp6sarw5oaiux6xype2f9z3yzzvf1146eh7m22vws4bcpscrhj0e9khear4ms3pubhiw2n5x86lblozlq9c1sc6tii9ptorihtgmomkdsbdrapsy5khidvmpq4j4wo0pcoav90oc3gymjdn601ir7l23rj9n6',
                interfaceName: '1k4ds13ylulwjvxysdxy599vznw6iqrnzigmlrdqkef6ja7bqjsa97ma1p5ds6oj4cqgpv3f35qzpwc4d95gyq0thiugxrvh5p74hueouztsioy0sbrv5bq60h2ki2yx5b52fut446btnuoa55u3154sef9e5tyf',
                interfaceNamespace: 'pz7kofugf8ltixdlssixajr24tfqowhepw23rvjzl0lo08mr0dxtg6brfutvnehmyobj0cpqzd4ysjzqlofkpi3id2t4bk59epz4kui8r0ehzg5zgg2lawqgw7xq1rrl4v23jeam1jccv3ipss08adcv683hadv6',
                iflowName: 'djosit9imtr5cwctji6ivyj8a7eb13tz7r55opvjwjrdjurlnxy4pydbspvdmr4pffjk31ly4duic7v3j41n962lcdsrhxc9melwos7q1kx0fjunyq2lnl079svm3v7zq6f38oevc515maakjcwyv25wwm3958sy',
                responsibleUserAccount: 'zve7fb5mbykhy6vp5nqb',
                lastChangeUserAccount: 'b325rcd5qc3bj7768jw7',
                lastChangedAt: '2020-07-28 16:49:18',
                folderPath: 'u0zzje72os1oin8vigdvxxodouf7rwtr79gtnk3h90nxmsnesigeqe15qh9ylnfmmpyopcwpfcve39oz0mtdfh4ohu8mwdtdr7ddwbb9atyrue1y4c422e0s8fidpbv3hqx54fi6xi0ycq77tvnhs0sxrc6frl1me8ha72nci6t8vwlof6n4z9t92fnv8mbndd561l529qlxxkf6uvkaoloiody18dvcgq1e9bxjqnrc3grao4omlxh9n107idb',
                description: '26nvqpk0m02m44bmb1ym2bhwh0wxt409flkqnko5bedhvb6eta0gtevohajoa1kom1sklh12meo65ej5eeuws8mo5nfna8jrytf3wq6aw8jorvd4qgr22zceyjcgi9c85hllqp25y6mnd28jdi4y24bs4fsd72fknwiu7z9zqkrprlq359etibmsvj61o6plez06qe5obrbqe13zh7km66jp0j8ks5zfcg5116hvq4f3slhj4qfhyqe9f9zuq21',
                application: '4ygti3tj3sh9jcyb5wmyhldew76hj72rrazusj3rpzb27d4uth1bxars7wsd',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: '6fatjhr1f3mc19k1lf0d1v1bxlp1ydyq9ii8tjve',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'icaj9co56y6u9pr5glwajmqdb1vcexr5aot31r3ebyszws9fic',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'vek0w1pwc3s8mxv2l23o',
                version: '4dsb48t8mppf5cf52o1r',
                scenario: null,
                party: 'xwz1epa7sbbwuq6at346gbuzmkebtxm8t8igl25qxlc76v3dg6s1ucr67qbouap4pvbmja9xczv0enyokzn309na1a8gsk65jsc3pna75xz0jhvgn9zqdesso418b77rasqcbymmh0orr4rct8732rpofuvjlmzm',
                component: 'mpy21rfucmu0ls88n7kn4cl9qtj1mq9q03evqqsurq9bv5znyz6ykkhhcnx9cxgzat5t3p787plilcbj4nvluj0b200jtniqipx0k35zdsi3q3ysvnm26s2r18mhdkchnpjh1gscsfpsh6m11mn8c0119f4gp58m',
                interfaceName: 'bu8ih53fpl4yj5vgldnj3etihs6d8tnxzn4lteu4tj4cpa5lkf2mvrhasr0fo7beg9soi2z9ag3aj3ib20fkoxtrid77e4mtottlkoe55jzn99iet1r4h0ivakkaux9cutvfdv8j688uqkkrbzq7k3vvp1pdjpum',
                interfaceNamespace: 'srlz4ls000kfso1io91b2r3x7hz3vv75zvvsi6r1hrgb6l08mw8c4yjag5fmaey78gmo9stwql2vn2upl4iwbfk4ak95prvfqt6grua1rg0ds3w15ce0oae32m1t62jg5zmykx0scsnxasbpnzic3226mbkmq0q1',
                iflowName: 'rt4nh2mi8jlkez9t6jjssxuf1bmggbeujkkmzy13x9t4vu4zviyar7ee92fe65de0bqjsviv0nubget3wpjqpq6jxbfzpmdql08mlskm6k24cdp4iswgc4hheelxfyhzi5477m8bv2i5aa98c70aglx5ilt7tby6',
                responsibleUserAccount: 'uuf1521ktm9gjp4nnmva',
                lastChangeUserAccount: '9rupyosz9q2jy0fyga09',
                lastChangedAt: '2020-07-29 08:00:38',
                folderPath: 'ajt5dlyeiznq6p225p7amdqrokmiwq9ftxxfbkkydgy6j5opbbnhcaxwg7qjaxtm6gbd130h6qiq43vqy0vzpx4gq11uwbnrdblytp0yza7v6cp1rsoglk3r5exbngktycjqc43w7i76igeqew3fkq721onbr687e1sfl3rg5xu6i0cirzdmo7qz1mo6ec22bx3e5yyuejsx5uba1oofy6xvth3sadru6y3rypfqlzgmu3p2ov940wnih48ler5',
                description: '4svbncqkpksiql3gu2ijmmbqlbxp9vj40uwonq6he5r4q8f8xczar5rdbzucvntcwszmngo5iywmnue2froddlo0meas7jdpzizg9f6rs18a5bibaxfoygeuf6g7b6u1l2s8bgb7sujqlwzn8gd4qip5yk38sv69njxgiq1b1av528u3qop0njout198gupf2atmkmvp0u1ih10jyla00rx70rtji6b1xqc3v4t6iwdnt0uvxasvor7hsn2fuii',
                application: '7fyw1lp8uatco7ots0fvd0e00k0hxjhuj95d76bsweo4528445nygxunpxd7',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'iitn2wski3o6ycm18n7oa0v7a7jwwzf1temc8v8c',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'dwu43dtl3rtvg6b10numayoszq7p2dx3b08xv0co9x9y4sia90',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'ycpj29noofgj824vcvn9',
                version: 'dgzcoij5iok954biozn0',
                
                party: 'c2wkg8w6j3tf3pn6gy1sdx3c265yfs10vhcs93hmjnsuzvo2ab8ko7c88rv06gvfu93cz23payzu07o9rfhqy6ybaxfwjrkw4pi3nzvr0789t6q87432kv9eezjxrmqhz10r8uozeeptlb1jcaby4dyzb5cn3g63',
                component: 'k84cr86qmopgc1iupk94gvwshhpw4gk4i2bzwqynyin15xbpu1qjh3n34uqlhymyinjp7ccfqr39mptau9lhpzbbhk393zfnqqb7u93e6qqjano9itssezxghbg0x3bomft93repxaljtvgj3c60c53sfraeovta',
                interfaceName: '62wkhrk8exkxj0sy3wc40yslmr9rzkq9hntaxepjwe4ccilgmpnvrixuw5fw5sacs5u8241j1izhr3s3qdod5gfd8mfvse84oesd4uptffej4atqgbo4s99hidokkxyseuiul1z6289y4qmxpdqv2nek2qxw9g35',
                interfaceNamespace: 'v45lz40gnfy1wsv7jmxafop7tc8k3whbkpscccgr8z457ovi8ekwocn0xwod94q5rzt4s4t3fo6sntjxmndtuw1niv731h55t9bpk68aao6ycy03wrtwe3tdxz55tjz0k31kpdosy8spdng007iqw3hxi9amt0my',
                iflowName: 'kgfsi8z2ovv2o578orhkbc6hz741k2n4e375pyo00bh03vt6qbnydvbwyom3j7uq9o4rqnbmoslyqan95g1ybihxz7pnn9wpss5wdyzfyyh0m5rbu8g6ndw1wzjuxtumwl19hon6fn7h0doywwt29s5f980f29p4',
                responsibleUserAccount: 'kjfzgnvyywcjat4fddd6',
                lastChangeUserAccount: '8ouss6iiydrh81tz6ig9',
                lastChangedAt: '2020-07-29 04:29:00',
                folderPath: 'h0eif7pnm23osy8ju3krcd4uhkqzftrrwf5pby5fz3sy2t7htizophocsvlcq56nke53wsxpa04403wa3qk7s5o1tia2cm8t50jx934oat1o5vm0jk9m0doepeklydu7czd5mw2xz0qb2g7s50fe2rtybc1v7892oixgqdzyhn44fcrps9k76hesd8bhl5c79ahofzujxlkjqyt3uxoxyoa2o0oq3y7x43jc35dzew2gr7yops8pzurk6i2gz1f',
                description: 't0moksqie169iajgnhn0xe6wx37oc0vf8hf0vj53ni8287t3jim10btsm7vutn8idb60uwq65j0cxba32nm2vjmgmuw6t6gmcv7pw129pjvt9xsv8517zuw4ooojx58rd0baivw0n1zrt8limd5j0vqp3enz8lm72m92q0ra042poy4km80zhxtm38lo3vqyb0nc7nr9nzogccc21uy68b27tx7yeaarbpiirfptmbatrkyw268ngjvsin7ekii',
                application: 'hvtzfzeycs04udq289hu4bblloxwda3mrlje5wmiazfixauv7q2oqqavt320',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'ijtd4t5up7or884uqsclgwmlibv36c8vtdu13ur3',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '42v14l5i0nkq9qvfr25e0kq7hf26vzgx2om7qgyorazinve3ti',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'mgpgcnsv2uq6t64jsxyd',
                version: 'ea94j0fxqow4pzwtxudg',
                scenario: 'yr1lzvzga606kks6oqm3tatb2xhqgjiuvi3f40hcovdp0adlslqxxa0or5jv',
                party: '7xi565p2u2y86auc3721eg76etff8bhwpepgubfigkikq2yh2iwhzi09fpcwwp1am5n3t09sx3h200r8unz3uhbxc2vrm9dpx3wwhgqntkecii9e1z9r5w2mqdvelt6670a89e5sbus0gcp3uht5ku8qquud9el5',
                component: null,
                interfaceName: 'k8ho9q6rm7dm4tnljt3unxfn2v6oh70g55sjd7lqu9op1qtobyps7ageqrppf7vau8e82g0xju4kmfjt5t89c0fpbobnuoyifocnnz27d2as6yuyu6r9v3m123w9o8w93ge3asjtrkpcb6iu9iihd4xouo9g7b5x',
                interfaceNamespace: '56ovsedy4ahjh1fxeeqdm2vujx4df4z6x7wqn33xtaemi4r4kv24ulr2j587cjcce2cloz68btd0ffr1dlynmcz901jq7p2exbfommh8ja1f9d1fzcn772h2jmzxuiei33xpqw567920uzjg1754r79z7ic8as6h',
                iflowName: 'gld77h7alc66n3qbvxr5eqq8b9ibczcn9usjouk17pzwlaex829azrqcvimu8hhm9gww7zgmcapjlwso3li0v6jfkgxnagskg3s1kznqz2y54ovzm5ixyag54e465w35p1yxyoo9ndbz44e54vqn1tx9h71welhu',
                responsibleUserAccount: 'mfgymywbt4179yguy8as',
                lastChangeUserAccount: '2mgwc07voov6p1eqdx7y',
                lastChangedAt: '2020-07-29 01:12:16',
                folderPath: '4rbla9gk86wdadm64btqgy2ytmb7hlp93vmdux56tqvkvcoqb4zgoixzsbtqhc8ans374w4iek1jxwvz917hoavr039892xg7ci8nv5pv39m0plof2ey6tlnvf4fu9fweg9ckvr2o34ou7kx6s2pml4ymtcavwvurow9vmxjntb3pvqf3r5v1l0xsidftau76ithdu8r5mmysfoofufvji5uhuf2wqgzf6bc3o0c6kgw5hgwazkmy550pq2p18a',
                description: '2uiuqaupahhy855yz44xyvrbxq94qg85yizp6mq7qinh1v4idvi8hh91pfezrlzvmrupk4t5rxokn0g9591qpsxphriknk8bec2659vtkuyixdd8tqudf6zac3h3rkio3r2rroxfa36mm929ynavlgqpijugnqz407aqp2nqhenah9rpuhdwtfxcdfnxwa52ns9187y7i4bx280wsyimb71mhd8v7uf3uio1qjdqcapgd0d0i4sjvcrxuc1rwls',
                application: 'xfcph5q5pbri8jnos3mn2eu2ngevradkb50xqk39njaukans9lr1o7ht7rue',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'icwy314i61ipc81y055h6k1jvg373lamulh7pgx3',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '3fsj3h9mkpg595imq87oxymv3mxa0uiu02gwj62qanur32fd48',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'v2dvbssmzv9yv3p6hmme',
                version: '1cbh9glfj1zan6hcpfw1',
                scenario: 'ymbg2ngnryfvzec1yib83568c7dwmn7t4cle7tj0nvdqtjfjp8j3d02gdlox',
                party: 'kumr9ung1mkws62zn5at70s24no850atstwo0ekllioc713rjuhu4240t289mwxs6y4cv3ztdsmaei941dpg2mnl73rch36j4afnzb0oaskdhotdck666nq6umy5jiwqw0sdwc3fejzpdxmbv0ykwej7yxkqx08g',
                
                interfaceName: 'aovzvu7pcbcwe10gujq8rupnm4rl3nwba40bvjeluwtbhaobwt9spx9rh4h4wi8907nf53gnb4d5vym3tpdljgzmop0llmmbrmkbggylx0rbcxujbbi1hk0vs3a4j9myieu20qa8pphkj6syj3i6bau626blqdci',
                interfaceNamespace: '8k03h9x3ga50cqj11vymwelkxgqrepbnk1qewzato8krplul322zct7lbsvfw4xfmlrn6abkspil84onsrn2hul8b8lcoagc60my4y040ztzs9aegqe40dbedj7vee7xpmvnflp9u6z1mwm8wvuuh8w8htelj80v',
                iflowName: 'y8ppk27d2hbvy6mv4vqptssh6601msp6pp6ucy0ym73o7k6b0eyb4aynb5nxtx5ga49eiiuoopz5eam10lq3k9awk6nyledzio7r1vih5eqlbneitbkx0jou5wiayri6fszys6ca617dr2mywjtqtd9m6xkfwznj',
                responsibleUserAccount: 'g56buzxcyjxqpa3e7pq5',
                lastChangeUserAccount: 'f4yvvfm3zjqe22t6z2ye',
                lastChangedAt: '2020-07-28 15:56:35',
                folderPath: '2ua3rrezm1406r53jf4nxfa5vu05clsi84ve0s7biiimpkhtb6plq8skpf1u1uisiccftyn2fwffgb3fsbt4ti4qaydofep5js22pcgteyyrvxcyf9gpsprvi9lkgw0iee9j9sjty8vz6mgfvpu7lppsj4qhl1v6i19fe7jzxbh5jhwh52eaq753g373p2ar8d7kzsazmofom85hoc4x76rifrirhdd90o3xlckkmasrubfqfg4kocguemhz6un',
                description: '5tl43m3k70jugr4kdzf4sxx0x8gy176qxybqj8vswa74d2y820gn4ynuz0yi3f0g9rmoe7jq44e9ign79xhp9a4hpvvji7p7crrma7ts07qwmcfi8dn7roymkel1mymdcy4msw6etvo9mqxvbmtlortdq5773agvl3u600ljzlj64b4f61r001zgmm99dnvsljnuh3bo6is9kfy20try95uvc8ya6vvf9nc0bkweei5j06tvwvus27u19ao2x2c',
                application: 'z15x4luom81raida7vwtdrvntlyc1jq78b33guao21e3bq2elr9ma7vbli5o',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: '5u30b8bd51wz4z31a1z9f3xr4a303a86k74qtd9j',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'bci5l7fz31lzw77jqhpjgrda5g0k943g3uzcbb92n7uc6zs0sl',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'babto9rovzpdifeim99a',
                version: '835bczk9qeelvb1gnakm',
                scenario: '6e7b202c5g0iwkfcwalqx5envyq6g724fql3r8zft4xi8qri5kwfa2oupnby',
                party: 'mocmy6crlpurd38kn83j7tv8noomyjn480y7my8icgzypcfmqpb329tmweasg51pkyf1a5mpntatjcabdy0pi4vmvddnka10kzgclzte9djhjj57n2t0o3l75t3fj5bop3h83madk8k3ubytdomkxp5zaw7d5qoc',
                component: 'uly9w5ypb3psushv2la32vfoasmtp5k2b84vqwb13nxs7z86d01z688vhygxql8jvs19jxw26ttbwafwh0ehsltksfw9uad9hjxpq9dl1t39ahtwqq858m3kpwy5kne5b4y3yfuwa8lwrlipfyueb7l2kcim059u',
                interfaceName: null,
                interfaceNamespace: '4ts8o5lgop2pj98aolei1hawif8e32hhgodt1s92ukhuarxpna947ki7kzer2cclj4uz3h0r9w3hjvjq3b52amk8a2wl5fapw9xc1qoo3w1m866y8d7m3hcyuut2yfvqrjdbmyt57tssx6e9a9lucqgwma0y5hde',
                iflowName: '41hifgp64p5a16mq8bwgqg7s0rzng4u5dd9tu7sj9enknnwnqkcy1r9lmum1w85vxqmu8n0ewyfyeu1fzealwc2kemv4g421focq0726helgjj8b6xbaygmfn88yi30ei9nzjae07c1pr6na2887px62v1hd930z',
                responsibleUserAccount: '1hsd58oenhdjnh4uud16',
                lastChangeUserAccount: 'skxgzpy4ndu9t604jhpz',
                lastChangedAt: '2020-07-29 05:48:54',
                folderPath: 'kilz0ge22d6hld3mvoh3sb1f95mow95mkibzgeqa9p64mii5rmzajc3r8vu7tiwbl59w6bpng3gdsmwg9cznvqfxsnqatmd96rerxkeot9kfjg7eyb0mh3ykeppa4ykd91cx84nag6w904qh8fbdlxqh6jilhiix7s8i55h9h74iatzya90erbqiaffm748pz505m84huhsomqy8xm948yx32qrswd03o100jejfmfwtlmiaj3y0bw93a2y5edc',
                description: 'nhaq4wabhjqtsl11mmo7bxrtjsd7ctmi2gclz2qftzld6pz59wor9fsj004wr8un2cmor25ycmlhpxpa9vpcxgfjz54jhryy79m6zkrwlhpeu54p725sxneb1j3y2iz998yhvi7qtpawpqoyvryn2opsyshwr3n7joh92yxt4olccam5234bsbujmiv2plh5ochr5vd0bqbziwcbfohgdllta6kg0wf9nluxmq3rn8a0iu4qthua46u4qulqlzr',
                application: 'ft1qtypwigxtdhe16fctwyd3n8tju49csicjsmtpsjndyqiqy89klrn8lbdn',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'jhh3xb09p3nbp3r6q2ibld5ek8czwy336se3bf5l',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '5qfkf8vj67zy540o38zdsyvpvt5x3cuh1z061x7btivlabens1',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'xpjfre86zl8mhdkwggnm',
                version: 'zqifpb9yt2urmqjo7dhu',
                scenario: '5mi2wefowdhixsds46ja3io1sr4qw0yz4eakc453t9ggsbw7zo1yxhs5lnyl',
                party: 'ly640rcbfsszox4sxl6ifplnos4fagbn7ig806mwhvrygjxfpzcpy2bhunz3j18wviuaz8ymqilvgmcil21qhf5r08z523tl9m9v4dyz9b64n159yyeuljgxlprjy7kadpfo0j2mwxpqhwjfy2xdm50c9uxx2boi',
                component: 'b15o1h3y3wbwigsyeazdb2zjex1zzkoo9u98lish97kv785ha6mpbmc90pkuwlewee99bkaurjc921rhef62zk6av9z0nzrhkkhfqq70w8zd0vs0xc571bsh7znfiy9ng3658az2k231osrv7f20pu6s4dfjpfyr',
                
                interfaceNamespace: 'nok1mev5t7eeucouzry4w3n0pl38of2srrrnru635ldierammtvry5xil92chdv2f4sugu1nrvo4teb71h3pho95j00qp20xol7y92tn84mde798qfgbuynevrsv8ahrlh66qplmb515iyfep7omsmugw8k2vlk1',
                iflowName: 'u8gb443f6rp7sjkpv5d1efj1yjpp8q7ccq6wk8o1zbo99mngun6x7g9mae1xcbqz9dj69wphyj2fdvkdgwvv70xkk3iebbpzcsk6w5oihebw2kbwjsl0qmtt1kdvpeavpomiuwa5li15vo9856gs19phkk0z0q57',
                responsibleUserAccount: 'frvwp0mflou4oruexthv',
                lastChangeUserAccount: 'p2cwa5juxc60q3xxcbhr',
                lastChangedAt: '2020-07-28 21:08:41',
                folderPath: 'v6tmjwuc6bo74lmctj4lfo199eyw6kg9ue6nfhx4ixudi68bopzt88xt3vyxfaxn885qenon3eaxlhkgcujig98edk44s3jr04fm4chbgpn7rlxal9x2m3mlldy518wcpjrc2hs9sz0ahmo280ropxgzzjb4wkjb1tlk6ec8o741ndkq67pwm6huft36y2vx36x0edu99b6wonajww883wgwo2gnunl9zirgskoqas1tn5ds9zuta4zrlc961mn',
                description: '4keh2l7lndwhhbl3l8h4jf2jd8tyy7h1gffsxltd00iqsdwg8qmj1r6mz4qzro423oqjvtugx7xggznin8s494k7l645zkk5l7jukslqs5u982jsdv6e2c916xd5s9ysnznntz2n3fodsusop6k2tndgq2g7hf2rr16ye8n6xtc7yf3b6ekhi4kosfxsinstm0woors7b8wbzgmh3r2x1tpvtxmngu5hpjn9rlugjylgnr6qn8ptrwc4e9sxetg',
                application: 'mllueptoeb9d4h9xl8jpwblxystcx4hae0ttebyhm4ip8wbs3h26onxexc4b',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'uaiu4wow05u7euk5rc6p3c5q0u0a79a4yxv3jocp',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'slkq2k5r4cjloi8cravco3gzljnzi50qjorwf0ke97zmm84q8n',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '1a1nupai4g8i4w2yro0f',
                version: 'kjomngc9sb1hq46jfkc8',
                scenario: 'o4uy48fbqq2am0ezyc1l19hbzajgfirfo8lu4exl2t7hy86vdgagh7usa7qc',
                party: 'x7xugltr8gajhaed8wzw80nj5ovxvxek9gj0jm896r36naeom4kybpueoojiy1n9zmluw97vwixmuo0dovc0ea4frfs6z1n2fjyy71wnuqclqkyeblut5xuloap7f5pd66v2ccf6ktge5yg4yp2mdyan4m95b5h5',
                component: '4ihwqckpfkds5ypgvq5qqsq16ggux7o8a84etmd7s03hvam7pegut2a4szh03n786ivdrjzfc8e28wg79quns7yrhcqx4qtehflwp3xccv8g48hssfy5j9nekjx7mjtbag6zhkxqt9sq2ucjimug4rniczn79ajz',
                interfaceName: 'vk1q9tyhhg205up36nfn8yz45c11o5okthgn0jekjr3jwgi8en8e3jevoyjuoqkyn7sooxrh2z9r6yx2y3bpnj5vhki9b0917hoqvxeqt20cn4wmlcp3dcpfvndoc50xsowbx6tpnqcfi68ibstilil7dbysy094',
                interfaceNamespace: null,
                iflowName: 'xto7jcq84dxljdsk40qc9z77plt8y6epmb6eb8yahknv91fqh00ooytj6h5lvlbvlzx1hskpd3oacisu3k71x84tbns5tevkz85de0oqpatij3fzradds226yycx78c6lbvfr86i0cdu14ywmk11pegkgar3c91o',
                responsibleUserAccount: 'slise7k6prtf4uu27zs6',
                lastChangeUserAccount: 'fzn3pb5bgvwc855ko5yx',
                lastChangedAt: '2020-07-29 11:03:08',
                folderPath: 'lsesm2f2o5yawpp13p6r9i3ep6bqd0clmna5m7e1xbg3ep619pl3rqrxptf60b1h8qv64ypubunu6fzmitmujfm0p0xrnkmnfs421ze5us89d5oq0yyvxc3qj6biazjhbzsh50jsn40x8bhpmdr5b9zh0p7y61zex9ts4wonnpawpy9o1t9693150oifmt9fjxfptu5mw3nkn3qv9sqgyha14chnf2xthhyb9cfah6yc6zlux68nyfeft09w7mm',
                description: 's6pattxbldwtxrmt43h3k5i4iah3gxfjv2y3bvury1kbzjqj3py9i83ktaxrtipbm04h9ggeje63dg9ybtuwya0qh01vvp2xpm3xm9108bgbqgsc8dxwf59g0x3g5v77a3gzkd7rfjushfbap4fhdcd766zuoy4d950xq0hzuwg3jkdpbi34x0tp8pqf521lfy3xrbs1wyjaxz7nl7u9eaxm12dmqg6gwkgvnezmby9rkvu7tfegv5r19g9feqq',
                application: 'yld8pw0p7uzglhnjxmwsczc1080edh9rb7ehv46lrbhw2nblrfy41ljt4uut',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'ajkudvuaaszu0bri359mgvjinir1b86qo0t29fbm',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '2tsjtxa7n9j22jp54qf6czr5vdlxy9l3xafxmpw2nonk9ud7ra',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '2552ojf76k9eekvxrobk',
                version: '1yikl2wm7wrvjz06bdn3',
                scenario: 'noz0n8b6xj4nslnbfvknoez52sxkgmydfyhjhaj1bxtqpuxrl48ayzoszgqd',
                party: '86e9ig11h5jephilf7mzkq0kxa8ofv1hxg44u8wrby3kv9cnauk5gddg1k492yysemsplkmdivynz3jpkpodabwr2pxivc007ne5tx87dvt82bwuuxct3idgatezj11z7txqytrich5o0c5hd2sv95aqsaa2euvw',
                component: 'mk3s11ont6hwesnmvtrtcecafenalaj0roorgb9wwqmfgmvspr49zok7ov92ob6543yjt5gm58agttx7gt7maaom2vf9ot04xoc9v838a6601x8fublg6bwjsnzs21jkxb0djp0au3myfz918vvjl0ykes93zu5f',
                interfaceName: 'l9p2cbqh0pjcurur7tlrm2r0y8ch8i7kchywwbvh5q119kzw4hcii5qajvc0p5um9onkvp2a6tdgbntc358enztmtqr9d0r4bc5pt7o2gdtqwszpjsgdj1kovqtmadja407f9s5i7aqnmdhhlo3gex5tgzmb2h66',
                
                iflowName: 'xbj3hzfkfaf3pkzbh3tfxhzcupx22pr4wvfij1mrqo8ayd45bp8focomy06wdl7autgcmj03cppefkaald6p8n7txt59dkf1psy9k5ag773sa82qsvc0jj4577dp4itdvxea41704u4ccv4vu06o43edts7phiri',
                responsibleUserAccount: 'o81ynhieozat8zea3oof',
                lastChangeUserAccount: 'a7ndj4d27nrszbygzvgr',
                lastChangedAt: '2020-07-28 19:12:20',
                folderPath: 'lmmg2vcspabqszrwbweah7g7kmfgyvxuxke8b14sjvvejcb06tt410cj6y4k33zb2ck9xq1nbngsusvamkccej0am5e5j8250ma7k4luuujajcz8cve0mv2mms27x2z5z74akyva2pl94ng7izi2y7htcmnbiuziersxy8lpp5v8byt303hmhiqy9j1sckrt1go6yx2c10ex995fv3lobjhq0ee2hu0r5mmkrxlntosqu8m4oupqjzsmy716o2a',
                description: 'c2m8pr0y39y93lb0mtuark7qd2zyxht3qkcsco9ycgqa809e4kzkscko1wsoacblzirfznqlv55fzuist5u8yt47islakwwc2ysy2e7yoge3gctlgawu10kecjkd09e89cxroh211hqy7r9281nmmshyckxisrxwgoihjjj0tke2w4n3lfevbv6qc6pam7emgcm06lu7csc21w85d56t4ne38560s6xpbwxdlea332kl6m4pky0oas52sf6jb77',
                application: 'j603syyo6cjg1v1pckxibn0g1xh8zvz1g5y3b41yn42u2ykr67cc1nvsmzzj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: '0rqeg4ls5d4jqo8h6ln0bs52czod844ehswq2hv3',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'iyfl1qxtlbvxdtw7wnrvvid0bfv55soc7ghlfbv4steh17bcdk',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '1na7ejkfmx7z634pluhz',
                version: 'xq8bf6h3xlm59ivckeo4',
                scenario: 'luiaqltu6v0vd9j7y9ol68cuy1q29xcfp5aske2c26c7ez96b7mg7hcii11m',
                party: 'iurove5o650mz0yoop4x7c37sec5zwtcgghxglyntxzrbdtfblihejy0ml3lq4421uc64urr3m5o4stfmueafphesagdbtpiu2n9mcyg9g36icjpnfh36npp213hy8zdp1v78k7jdigoki4r8gvfwsov5nrglfgi',
                component: 'gvyhxjdtb26gqwq5o1w7uboa4hbny155zs51p3sg9pu3neczyxeg1opfudsjxicowb87xboqu1475oc7yfzeybh453fkdcka0gq6ok70anb0tif2wh4fdi8b5agoo0ewmjmlsnrr3dkwt447lkxdfyl1bf0t2iq6',
                interfaceName: 'q5x58beeif34xuxm9cbuehejoakjuzjg6em8lzn0tso4h54vgsgckhyfxrbsodkmjk1xbyqxw5e0u6er7kvayb3du0f1eli1qjzo59g0zacm1pfjuf1uc7vofw1qxc7k93pb41r3muijfaqrfrz6dx2hu70imyol',
                interfaceNamespace: 'lefj03x3wvkgwcrc92i9v7lc6teu01rblwzz4121a2rz3ez3uzwcvxinm3bq5ef5wpdv0a0c1260izrdn60rgs6ukx9l5iuj9hjrybd7a92w936cwxk3amh0wf4y0to11149sv2p9if6hh4hj20ap2lf1tc8l12f',
                iflowName: 'ann3ydyo43y3sq04gjw7b16pk8znloaurjwbnpzgteuilj1kv6y0zvishk7my7sdkwfi7y4u28lb9eckoztfiht1pu87qreb0ymkgbabuhixxkgbzd61u00p51sx4wxbxw18v223hfbj4ex1j6ozh600qrpmbjze',
                responsibleUserAccount: 'h5u6mndbxec0czo7sniv',
                lastChangeUserAccount: 'c75vz8ios3ozktum6932',
                lastChangedAt: '2020-07-28 19:25:31',
                folderPath: '4s7no1i12v0xsctjhjdlhfod3cosymmmuoys9jpz5e6ojtfb59jkjglju1qxsk44t0twj1iiuh1zs6iouck1l3q2hgne79l9wr4nci805nl4wvj9smyejag2b3jlq9hrqyd21p5cg8oo554g6f9hp91mvx7m158ld0pugq48loxv8c3rtjkderfpb73twl960ud2iq8obi7gz4igl6ifoitv871j8lx6e6qklkyxjhdbkvn9bhjubwcafpl6mpj',
                description: 'ixl0gbummjrki08hsxsgt5vw708162258s173kv0i12s0yqgtz03ok2xcsq8nd1cgy1q6n4wt6x1jpijt7h4mggm2rxxak70a0c6drdl4idhynt5483yjr23440dhv9bvssd9dboiwh8v2ld6igolna8ib81xz6l8nz52i3fqlgnxkoh4nvekhv31ypatlscc9xnbin00yrtgqahh1fttz6wi8befkav3uqnz0q817do6ic1bpjw711zm8c8c94',
                application: 'tmor6cmf4flib8c4a085tva79at5526ydhshw562i4h7mgghd4pknga2tf7x',
                isCritical: null,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'rasw1qack25fjfsw494cgencjtoyp9kgvo4bnm3k',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'g03qb2sfdjucqswbmk243qryoxe9nhmnnamrltbpep3jbc7eja',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'g5hzmw3k0p7rqd32cu54',
                version: 'coqu6pmhlwxo6nk2t010',
                scenario: '9rac7js5iafapy0c5eedigg7ogvy71ctjtxp7scbxpzffjz2of75hhrl1csy',
                party: 'l6g0soh57cyn6dq1p314pw8aycfe3ugcelemuqgcfdugbia90f4fylowwx73doofge0neihi2yrhlv5maiumune0laptqlx4bpklqjxlmaowd8s73ju5497m83tst7sqkmt6exj5i4esbn01nrhzkkcct6babax6',
                component: 'o53gnm3zmyiu6sgngwxk71vwihny3pcdbdg3et4wxp24wzlb8kx3z7nxjfqjh8cd37m0juiakkpjzg3t0iatg6y4zsmz1szqwjh9sfgjgqtnfuy419knmbzft0plcus6ixty8jep03liy3w8bp61yo1hmz0rrubw',
                interfaceName: 'ieqfjbu88fqoovhx7ch3b9ewcdvumsuuupp9sezdp3qafqioy1rkaaa2ex4t4og4xvwpoe1vyot5cez33b4nu8fhl8hamd2w1qdr00xgk6xsct0iuwafkwwr2ghwkrewaxw9eln3ynr8mja22344ykn0o8kw886f',
                interfaceNamespace: 'yl616kzuwcjt5dxpjny8lebbvt3mhemiwy7wt0d9ih7irsjrj5zm84374649rw5u8xmh4djdiotif0ayrs5f1jff7869x7ga7od6x95idji3qzedu3hqvgs2puvozm1odk7n352znofiexf27g2rtafdoi3to0pi',
                iflowName: '1nktah3xt236gaw7x6rm55ggd5fznslzob8d54lldfd8041azj67r2qo7j7td1c7jf8qtq5zrdthidfh3grk9x8x62sl38e6ajgg2k5b4v5fw4g4wdfgruavfxp7nlerypubgnacq43uoqjrqiejcxqnhinw0u0p',
                responsibleUserAccount: 'd8yl9bheflq7b4p07san',
                lastChangeUserAccount: 'u214arhlv6wtcgq3j8cz',
                lastChangedAt: '2020-07-29 12:19:49',
                folderPath: 'v3zx2hmyyb4u7elll04et479hhswijhloua9cuvoydhce36839t875bb69cfcwdlxan2ovjwkyy69dmj77hk21xk88bax8hmag36b4z07lkjypln04qsu8sgynybqf7f0pfshmrv6ryj4udawd3e9vbe0lfb9ibdkiye1dheflkddkcx3n089wnbzlkt9v1io7n7hkapblaoftm52mpy1uyq5mrqmw7cjgchj64lkoxkir4et8850zw99eeqq04',
                description: '0qpkqamuqpx1uigq93xdy4fl7l1mtorqdyu63pr6vedmbegacv4lhmliym4aix7y30fxk5dob8s4nzkztke5ee0n74ci3rlwwjye8urqfyo8q69yqdwrdilgd8tz0y664oly1xz6hr1heu0zj8u0bg5oss8dbvtdyw9t8r2ryxgs2duh2jjkblxzh2yo185jhyboxfu8bbe1gmslnc06vokmaks3yb8patfs824qsi4v4327u4znuqdi1mstam0',
                application: 't81lh4nix7ra62ltth1i18oxcpu7qsjlvk2h210d46iar27t67iv6o8i8kd6',
                
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'rrsl5l0fii2vfbyulic99pdw1w12cfoxm0vv2zbb',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'qbyefvry4zpmkhr8ef40ws9vq5lxpoa4yidppkldfhhy8tqwcz',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'jt00v47fpsj3ua9vel5s',
                version: 'd8bz236fyta51oxi73g9',
                scenario: 'uzlm90yulzaupz1tg2x4l6xkrtoroz7ef6g19vpjbccrs1yo90m8kgos6d8q',
                party: 'uac2mibcn3glg9vxh4pbill8k6xtk86l0ijbkxxgme02crcl2rmtjjaw4bqlszue7d6qqe74b4vg7tcjti0bfx35olypp708vzmdfklxz0hg1k2mr8gmvxpd99af9zsfpjh7of606tcm6v5i322fotqei8d64mss',
                component: 'alduzz3s2zqtkwrd7mb42rtup3p12nn2wmc68kt9kl7rsof1bsutdoq2gu8i49rc6redkhekehxvlks96370dj6cs29sfrlxhcsqeppu02fb91ripbur9iet63lysbt7px31vkhri5o4dl5wns1xk4m56fedvw7v',
                interfaceName: 'vqbxnlm8e79pn9e3mo88imkb57xtd82jevsjztyv1jvbktf2j9vqakswqw9cx5mt2w2ysh0t80i0sztrcj9a4h28ctry56v3vanyspue00o3a5wzqihnll2i31bv2nx8fx6o5tqxru9c9me19e6hul29xiyphyt8',
                interfaceNamespace: '9bm2clwhmxfivwyuiswbs6qvncltjkzcaahq8ywl3fuht5we63eb6vf8nqi9eoqxiu2qqaivjxu7py0d4z6xjvuoq3wpvj4w7cde3ebp3wb3sgntbw2lufacs0cz42n43d642o1spnxo7mjl77uy2ae4eg6qnkbf',
                iflowName: '3yxk3pipaojpxlvqahfttpivezpkldqlk0x52t4o1gwpxy6t15w8rknt8rbr61dooxzl11857qn2nyadl6b5jaugcqpbe8rmlogieua007boc1ug2kr72snh7mlhiok751pmotnln1f979ln9g8fow0l7wzsy85b',
                responsibleUserAccount: 'gq6nmm4zzdmc4w8cwu79',
                lastChangeUserAccount: 'na1pn3z9yrkga2xdqelc',
                lastChangedAt: '2020-07-29 04:15:02',
                folderPath: '7rvggi1oz9s3udq14zywbgrgh06hxniq99srcficf0zjkfdx6qasxjtca1tdtx7cn2zioic31i46zskyanvy1zi4iwudlt7wexs3762n29yzjj0er4lhcq8zlln0e4hebuywbz34vdr1nxr1436f675u8zvsi3udsl5eloolf02unuz0utrv0oew787tg7j3aruogg8gbf6a0i19ge2uil3l6c7akfau1lhcz0tkzwc84eppmwo3oe044987t3z',
                description: 'cmkmhbiyqq0qpf5z8anfw84zp03lq0j6x3jam7xurr835tldh00inus5t0prnqs2q25az76gph4wxhlpwptkrlaldp1411ju69mtgggtl10t8zgfmmi8jnvll1bdu4bm26d0f6o1re7h2c778hds2sy89qon06yygzb030hyocrqau12z7klp57e8dlblq4m4m5cu1m3ddqbkn58vooypj2999j57hcmx2x4efhai9ckqxqdo813ujfzmpuxbpn',
                application: 'sz0ofr2uc78enmtobbak5dtfxeiagxhiburvm4f8qv8vkbtk4sxnzpa2bvbc',
                isCritical: true,
                isComplex: null,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'az6xkzzz7ap0f4nhfpm2g3o5ul7xr48uwb1fvdm8',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'ph8ka8r5fhne4aaaxdkrglb77rgkojfhsechz90d9gwjp77c0w',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '17v4b5lsmr6wdggt1hq1',
                version: 'tzmdm939eb87wa6bki49',
                scenario: 'm4zr1qbq1c5v5sgzmwoz1yu8j3850dhymf7aeixq8arrebfv9drfn598vmn4',
                party: 'jjxa7qwc38hhybuhmr1t6f0r2ho74hq97t51fx15lp1jgj5vuvncgs3btvpqpkbb5103h0i370l39sjbu0o5z22y3crh9qrbhsvllohaj445cuif5y53afsyt4xtlshawazwjjurma7d92f8asmrd9nm8l61z93g',
                component: 'xck8o121a22mbc57uixtisq8679tskyu7fg5fq7eymep5iei3acqo42mh9lezhymhqog6ni4f5g2wjlqyrbttstyw77qzofzkhfo6s9pn64vmld1nd7e2wuaibigy8ca3f5igr1cluxwqz454vgb1phd7fpcgn4i',
                interfaceName: 'yiz128t2olpsoab84o3wyjpgn3tou6vg6or8sef84yog512cgc0hp4dch43vi5pe2wb3npxp3mbc1l8vylrz1wrqzrdh5pqu7hbqnlpt2kdasnep9ydfsw8wadkib8z8tfewwp7975cushru51vczbamsg3eqx6b',
                interfaceNamespace: 'prc4g9jil8afxwc4qfisgu0smbl1b0f4udfa0rfps2x01dm119aoo4bof4znt0g6wyu3esl8pujemkcan26vakhdcomb59ztwvs9ywr6zj6nhy33092l5etr6t5aj1vramb169qhlb6hhfdxc4bvh6jis1zqhn5e',
                iflowName: 'zas08k6orfibbny79xw00b6usthhpliyjig1068lyre4mz972htd1ibhfas9q56nq1ebi9foaiw7zqtls64wdslmqgvgcqzq05jr3q4tj70pkll51dyp54xk80u2gs8lj1935yv4sbqzvjenkbwvnffquh2whlkh',
                responsibleUserAccount: '68nboluh215ccw9ev4dj',
                lastChangeUserAccount: 'tz56u2sahtlzc5tspl24',
                lastChangedAt: '2020-07-29 02:25:36',
                folderPath: 'oh3m1d8cprdydvp0buknwyfysxly6u9172n7i6q9yeg83whwixuouqllowud22kovqtx4x13xz0jxymd9py13iwzcuwxh1e4qd69cazwvmt5d1ebdcdqhlf9keiiewdhmdryz1x2s3xu3y1nyo76oogc5zx39lfcz0930uend5f2rqn78jytzfwo2uqo4svwhovnj2oij6a8so7fj9zj9tyrnn8a7p9hx4fpl7h08bf271m0b1459a2u7247s2v',
                description: 'sndz5y93yv6o29lkpphvsxjrlaamvtmq7kstg56g16ne008ormch3fmtw2xnjn04wla97zzhcy0aoafao8j1j1x9za0w7otj3t3qf6ko4op9qursq6lk2m7us0k7r7bw0teoww4sbhkadcvbjatowvtbsz25q0jzakt9cjzvm5xptb7lhdnd8rs1nzzhw4nonqwn3wq89ljg4y81udupkst1cndbehcn7bcaaxalel81j6yj9xdsemnet7611vp',
                application: 'vilh2l1f70ur05tbvzc62aimdfllwtjcmcmqm4q5t72kp59trx1y0vrzgdns',
                isCritical: true,
                
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'x19e59jn0h2lxwo3kgjldhfae1pbmc0zh3igx',
                hash: 'ua8j8cayk8trc16tdnr6pifzhpti93g2qm50z9kj',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'j8xbtmkd147v7dkcvxrf8y8n0afgiz3zswcb7c9ndhctppgjk9',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'uej0x9kpft4jfmw9qnip',
                version: 'ue3692bnezqup3gnl0yk',
                scenario: 'o6zayobeg00tolouuxugp8bvyoa40s2mcz32r22sub0sbkfkzqjt326rp1u8',
                party: 'm2ttl3xsxe4gc9tv96kr2hla3h5ghtql9yev2mimcj7xmliam2ac83wko2i720tlfshrk7zp291leq5zxa5h2dx3be3d86490gryg60wlq3zco7rxi6h623m0cz7zeb29whfucq60ns3q0lk7mlnpyvnpuoqofyb',
                component: 'ihfiw2ktdxnmthszo4juydlkjp7ts5n1269h9zxkgk8fpcq970ho2rebljuujsbddduaq9xsndit7n00ly6wc9hnpxpjxhdw7d2fem2i7tf2vfka2rxn03kuqcu6n0asmvoolvr0exfwb00zvnxvxli68nnmh12u',
                interfaceName: 'v7rgw3qwl3lq7cz2d8oev85nyvqey52vb1u1rvfa0qcg8gy2u3kdv631hpeyr5f01ursxrw5dj47mnhn4vq6zo0l7gh6oy9lrztfcffw3xtp9lsn23kxrozvnulhz559qckoz6i8rx3edh0pwywgcgm4mjroh4c5',
                interfaceNamespace: '5mfzvdxg3f8m7ru9wq0omn81seczgk4h97zdq0oj8cuywoz6lchcgsa0129q02wl6j09rwtqlwg60qrve3878mukwywk6kfv2wfn1d82vtizkmpg8n5pmhglu497vdmb5tzhoiv51g245gmogz33nbidhzif9wbm',
                iflowName: '8mr56x2qpshiqoa0jytvebhgyfwvcswchfjashkd1xxsw4o5sdipnwzw5jguxwzw21x3o8d8wsh790p9kuayrdqaqq0glyr8tajcx66nqzv19kkv8x0dribq3xwjxotilpi1fckbtz2gtp2abuemqczo8e8wrn7v',
                responsibleUserAccount: 'ekx5srlwor511elzdwi5',
                lastChangeUserAccount: 'ygcoak39y2ezt3kgoyyf',
                lastChangedAt: '2020-07-29 01:19:57',
                folderPath: 'ktdfend13oiw6tmwe7o08xcsonik57gpeaqo4wmq29tr277tviwzqbgha2gcbs6nzt68gac1rve080wlcbhqiikfqzflbziyn0zjo3yalhorhupmt0mdtt3mqyhgt1n2gk0lwkurd5c90zbp6afl7gpaa3ice9rbyob85ybbqweqpryeqfzzipqqpr9go5w3lo3vnbn1vl55369j6qzspktb92b7b8izknedxf33x5ugysctoeom5c62ws9i4m8',
                description: '5dpzsltvohmf25vq7e3ux91qlmib0mwb11bj65gbvhxhiefwagpg0ra1rpblgfvjmr2fokdmwh6pyqmkrycn0kag97wkr6sgygc7y3q1dma0qrg7sjndm1th5of0vx3ki6rrjt7l2uihje4b5zmm7vmxrpfr0t0gukg9lr87ktudoejhoiol83veglz533xi1tdlt5b2is0752kuito9fnix6j9peryxkd1oplxah61gq5absn5z44glorh1cjv',
                application: 'e14ry0m88fg1hpz43be0mydie32azbppprcq5m1jc7odn25n31h7q66ncpa7',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'r6c1kp5sbwk6mq9kc2oagliz05eavpl4t5wq0vvgt',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'i7ih6uojxdb7jy95tmex0tzkdscmv8uo27bpxg8za3fusnulxw',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'lzi7pp6naf2eekl18lot',
                version: 'xbq9c2mx2komc1kkomf5',
                scenario: 'brnslj7v550a5978phu0pi9769ovio28xxeut6e6qz6tmwwgbnz69ce2ahv8',
                party: 'vzzon6mtn3cker4nwzikf41a9hhdq7hueqtbr2n4fefou167l4k5d64h7yu6ziag4pcq0h3lmipgok2uw84t8pveg8jxc612m0qk5n4dy05eixyz5quiklbu4n53rdr1l4644ogo85z7n88iogekm8uxwzugz0la',
                component: 'lm7gwsezpae9v6jn98ma7bdvtjz4uhmh9frjnmjjuwhr43bsr589zw5vjyzwqmaoewiwzu7lifxs4l9bx3r059o2w5i5fil3iwdgpw5un4qtw07yq2r34aauu1tlyra430cbs8jjxw0gng629og57gjf26fsz0l2',
                interfaceName: '0gdzimkx5scpevxadyrawtc8347hyvo61o2gjubzil32alqgdvp964yvmu9yc6izsan07rlt3gin3cex9m2d3h7cawomt688u7jf3x32wpjsjx00b0ojxhscqpgxuvidy4sm2bpjh7j6gxqr9zb6ssj7h3zi79g7',
                interfaceNamespace: 'ox2ob8kf30rz4nlcfeqpgl9hq675k6vuxmjywnr8ped5s15zeqd0n1755k0qo4hef5v5zfg2kaidsoojfwmhek1znr9qo1lwheyd22lk88hlja2z1er8bfli2gehrnufyynfxfzi7h5j6so4z62rw68tfps6drdg',
                iflowName: '4ikkvdpcnm2isdierbtrtzvrb1io3k09wn3arxyjw655ak1e7dlyz43xynau2jcenm36toh8qscozjc9tnglj7ee59bv934w8pnesaj14ddgvpw6eh57ltylqqygubk73v7m3xva21a5tsc7lrauy9r0iatp6ha9',
                responsibleUserAccount: 'nezyyz9blk5gqzlnfiwz',
                lastChangeUserAccount: '4osx5rq8ti50q1muge9y',
                lastChangedAt: '2020-07-28 16:22:51',
                folderPath: '9c3870cnqhjprl03k8gargp0n85h44156prhsuwows9r8fhx6ti6wv1gt98ges9g2n0b8jr83thqatji0weivn5asc5khq5plsx9dv5fobu6cebpjact44m3aj0qczl26j9eqp2vtdphr5vhfp2hygcyreo5ywxcma7xgjdkfwyh3oj58jk38d4t6kgzex3la1deewou3doc8nbwzhtkqd5i6veyf8d227fwy2otqgv77jqtqdxnoibx7n68gbf',
                description: 'pzvw4giktva9qr9kp5mbc3d1gu9udu3wf4vd88sp5ss1yr0ygr4vo0nv7hsq49d0gs10smbqs1hwlp0m1gbajriz92499xl9btw9i5zlp5bdl19o85hl5f7y62h9jergjsgzhhlvmgatfyarhoiv3hc0w3hn38mgrsmjskohixxbfbe635srbg6q8tssdyal7dbza7znv3bras5gppbiudip30c93tq3w7yyzbf7hrhagv8jfgcpq32onjdl9q6',
                application: '9v6gc44gg7j5488sg8aohaqo6pxsfzm6ogv7xevqesp6qihs8zvexsaqiqzb',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: '892rzdbyja82atdxp4cyke63twdsvwl76uff0kfu',
                tenantId: 'nvlugqxft2no18esco3ycc2jamdkjjwjlpc6g',
                tenantCode: 'r85khl9y4awotxp48kdqfx9ldrns3kn1d7z2pk40prmy7eln00',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '27qegm8hgpq5478tt3uv',
                version: '02qhqn3z06rarmze22sk',
                scenario: 'ymgkvgdzf6g4l96qopswkfff3tzfijvvv9tsph2u6o5xnz4hy2u6jqq6oh6i',
                party: 'sigyxsg943e9nd3wiff71efvx0yw78owraar7bm8xw9v97fbqxdvswv31kd728t132ry80g7tzmxyiowo32pvlpq51cnohg49h9d86yrolxd26ugasrssmxccw9yaumovuzwsi64lebf9h483eagqoed07ft8atg',
                component: '7e3q93vury6idwoaljkdh9uynzk5paeyk66crfk53p10i1184gqzbtlx1nhi6vzru2pw1evh3cl3zlo735jyisjx6u1a8vtgvm729av2d2pr6d3760jp1px4xq3s4zx09n1mo8ngwpdnw10zfsvbps4u5pzyte40',
                interfaceName: 'mu0rsqfvuvg9j0ha1ovwe7qwxhdik554uoklsdc2hvyi2dwtkktzzpxryatpe1akrou1gebjg8x2434cxgsb0ddize8bwkfi9y7xihay068btk0fm1glagtqpsqbjzjsaz44qdd8fe6m83q6jekfggig01rl0wat',
                interfaceNamespace: 'pso2s96mkjghrz8mqe4oroq2byvklboir43iatrhpxpqvbo0m0ymeudckglg59mdztahbtdz68bq5k2yawe605nljge23yq54vbe6ipw424h29pq5ndnv1if5s1mrlaz4ao4z0pz1nk2lecfdp139z0y0rq3hcnr',
                iflowName: '6wma7rcui88jobltsjvr8p7achyy5esbiypqess4w4yv4urdxgg6wnpl3buo8f62cnr746codsv6w248aeuk6yz7lep213sxuntvmmr4uguae1vqex2r7umiutpw1g0jpbwps18wfq2ef9j90ifphdl8e87nlv1y',
                responsibleUserAccount: '8dt22u0ws5chrh8nxcsn',
                lastChangeUserAccount: 'wj4us37ynbpvpzjbxg7w',
                lastChangedAt: '2020-07-29 05:23:08',
                folderPath: 'f5txa23b4it2z2olmmsylzsl50o57sweuido52v6nmwmbjgge9efih61lklu5v102k2b4vxpgcv9uufj8bej7qb05blclg1wy0v6fxz11dsrtx5h144hnyg1bk6jfrf17tk70ito6ar39xqq5lmt9ghzx1t2uw3hq6zuwvjnczbj82c7tr2tpco6evfk711kqm79y7m6amfgzu9aron6m2ubba6os7rvygu20klt0p4ltkayjbwr1qinemx1tkn',
                description: '9fgafgirrylyoyqf2itpskqru99krcg0qsm6jnchup9t9tey3mnh8d0nsgpo3jix546wi8ajnwbdo77kclsauuh02y6lnb856xl4scam012uoko2vgwr0id6gt40ptc3tdx6j4eu3ul71txgwwfsi1zrogv0d76tqgxl70lcer9i39s6pv0p6u9po827jrb2i0qe2hydsqtmu44r75g6v6scjm9kzguq53nfr8stpjr6gcvn2i332tji61y66lo',
                application: 'xygxzeu87g3ykg2373h28t3xax0lxszh00un8seiqwbvqdd96nug5oynbat8',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'w2rof99hnah2nqiif7gv7gq53qjcyxra03t07kz5',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '1fg7jj0p1ctblzidrofoyvvl3si7s8xni2b82e0nppprwpnsu1',
                systemId: 'h9669uqbb1p0airg8lsc79d09yi8zry8ctyek',
                systemName: 'aw8rcxzqj8rmolb42l9x',
                version: 'kt0v6yxspqmwqbgm922j',
                scenario: '0y9lmsm5b12uah1dqj651hv9a74dyicg0q4hvjobct6onvdqldbhtekug0ri',
                party: 'r91ars6t24j0cdrnkpfiesiko4pjf9hfeb61wwfod9ozt3rsqn4s9wny8tmnk8lzau6slmfb2uf45aq7dd8itb9p4677vj4m5pwe47qmt3xfj41veqvvfrvjn8sw0i8kjbarybvg44oxgmha3sktrwsqufotf68z',
                component: 'f0c6rldh0r0912s7zhh03878qpeobw1v5dmpceoqfhm9h6t29w27881klqztbokz5u7jq4v4vlgdsyjxliw768122tmwstkk4i8r8ga6skz1ql303lw5g9ty1k6aac8ua62sunttnyrah8hyxn6w07kvs6d879ui',
                interfaceName: '4hz47xfk0ng8oaxyqemvh688hktn5olc11g4qmvkj6gveagokq2h0ckh640dlqu56lb235pvjuz0cus5xj1crl59yheojva7kzqb0rel2ylr0x8qb19cmf0u6458x6h1lmqhv5z5kr1wlpzl2r58uomw229bgc4u',
                interfaceNamespace: '5t9g28nw58nezlurh2cpvo98ar613smnhhhv7txxh5f14uq8cpz0d3z0a3ol29bcbna3q8wj80gz1fzineehhcg1sw5ud3xi7gey46kw9s3zn1l4txz1inbx42emyxl2pigroik2dlisp0l0bsv6zw7w9un6rrgd',
                iflowName: 'julso9pkomtayg1dbe1agk6l0ay9u9l10gsew35rhtqszs1bkxrm2s0i6t2cln3du2x00yuwaqcu23dhpv5m4amnjpsofb7qucz8xbv1sv0d38tf7fns8yz1y8raeqn78f8n2cn182ghkkqk26b9jl4s4k7o6o4n',
                responsibleUserAccount: 'ce848byhv095uroa4wkm',
                lastChangeUserAccount: '8866j1i63euerq7we71z',
                lastChangedAt: '2020-07-29 12:45:39',
                folderPath: 'f8ja9dugir64w8batnnye9oi6rm8tp8gh5m9dw452axk72wsricw8wr9aua7xj6eyb9tlic0lhhr2d34ml9lqkh2wt22d943jml7axgelckd0rvkdt4znzjk497lyqqy0c5mzztzxvoy9xufffv0mjeyb842alxkcrhb2lr8wfugp4q062ofg6davpy3pu4oj1439w9tgludcgpgi0r3e5evd8v3ghtrjzb8qb2jf30a5ozgywwgupxyz3dapoz',
                description: 'we5bnp3hy0qmw5flkpu2xlnvae1fvwhzd5ebgmhwqi1oqm6adv09pej1tng2jyjxp4ngnd517511jm6b4j8kov2ctno878ec3eca0wg8zr311enn94n6rf3md67hvocl75j0bznipj5dz3kfhx994cdzorou87l644v3au5zf3sijugjov9g4ro9hdosji3wqlvrwn1iazlkf7cevb64jjcdj6bdf2p9ravuj52e5ljreb17wfufwtuqcyt0kej',
                application: 'ktajzidz0au6xwz4vvjog4fdehaxql7iiwcqw29p4l26q81pjtcqmm2mo3hi',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: '8bsfarrykt0rhs544b43e58ec6pwnk9vp692mbvi',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'dho07wpbuzw8gxznosfxqvfur1gj3f5zo3bu1s8f6l8cbgkw3d',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '6z990oectxdf0eknpb6e',
                version: 'k9a8xecaiui5m0sxftbr',
                scenario: 'xt4eypxcxmwsknbf9w7sbh9ro5ozm5vak1bn6hwxc4kph34n2096nmhh88jj',
                party: 'gcp2oq5by9ljaw5gksq4whmifjtedcoo2ptztadwdwaoae7d18tjnobww121tktqit5fcq3zj7tb3aqu19bdq6obpoe2z1hh6vlt81svdfxzqclqn0cycet63bc4h4558r8hy3lb8oa89882wt5pvw6owaatsknr',
                component: '633fi2zfles5xuhe54zoh6zqlo6wocbxdswdzrfr1m1ubf1p47jo2zznvblnthrx4v6itcbn2kdb2msjd3g7ovenibbntg7efz93m7h06j042xo21j16qoeikajnqzrn8iorwgne6nv45t13z4ruo5k9miuyw6ur',
                interfaceName: 's9xn9rahtrp6u4oghmia98p8u38e6qup5cdu7e1i7b6kq82n86gabk53k7y3h43llb2nf8d5px4kt75l8a5t3wqa8ne7o87t6sks8wtyatuzmlpes3321tkh3sqrrbckvo9enskzqbpdw9pmhjgdv8ejeh0ecsgr',
                interfaceNamespace: '7u9wyj6pv2uwzc0ol44gaqk8ug49tsstaz5rdj7hlytw5u5nrh13vegl1m3dsz64p52a53agf2l10k8re77svrx9nu26ipt8anl2g0ro66i5t1rstotwqozl7iuzr9ee95gnmkdnnfggmnawi48v95at3vgnkucn',
                iflowName: '876ynzi3fyyycp3mocj112jrhl8anjnio5okjg08h6wfkrrgfy59itfr022vg6ksaxhui8ci2v3liqoelnxmwtl3ad36ipv9bbrx6hmyfcn9z1zez7n926h06z6qdwznsua3nxrj39va6gogp5u6y0m2dqq5buug',
                responsibleUserAccount: 'ytp85n4va7egw58n8lr8',
                lastChangeUserAccount: 'xpe3ypjomtdph4411mnd',
                lastChangedAt: '2020-07-28 18:43:18',
                folderPath: '8m2pa9buzp4f8tmhw8cunkn1b2onx7k13ljg7xeol9nd4csj84otejpyu0mt6ona57msrtg700p0r85sjxdjy9ss09xy7nihk99kfazs2xi3s9uakngc2quuh5ukho9dgzjygs1u4kldebzd3endkzr0e1ytymqnlg0833crbifjlq9boq0o3zayxrlxqivvpu2uvygdbc393k1bvlklgw0deye5m041pxjbpk9qudtgjc3jhdqgjf92u3xlho9',
                description: 'rq7l6uzkw19jjbjl5d5auc9pql8kckbd0p3exbcgdhvf8i4zmm0ddzmfxbfpm1ugu9d409xtkpyaise1ro6hrjrg9d5qffjnhbgczdxnpxmst53i6rs7bh66by8pjh551s2a395lzbso6bhl5zm7nubyztbldze3rhxm1wi6xymiknv0o2q5x7m06u11zzsnr7242dad97rpju7j8lie4qljofvoyujmgla3l77k5t9s4aybbmbraivja6l60mr',
                application: 'q8lptmdhbuq0mfnmuavmlh6psaiq457hkriri5zcx5fspx7nns8pe546txhp',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'jr3hvbe2repb6fnyyylkacjebpmx6tmgfw8xz',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'zo7v6lh0h8qywyg13uu6eumdnxrfxiwx5rhape8i',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'yh3uu03cduaq7unhf43xujqq2adw3x8gkqy9ih61r3gsn1t5uav',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'srxzssvez85a72b1ssc8',
                version: 'd1t1zvjxehiyg1knijv9',
                scenario: 'dqhub34iorbm2zduphqzccfibh4fufa64euedzll6bciwm3uhpn7b9h7t186',
                party: '9f7rotclm0j10ffzvers81pff3ilxxivy9zw4vkr0rry64ugybw88wypbf0xzpj7uk1gkh8o6vgiigo014q3cwfo2sfxxer55fwq9863rdgoyt88gkl5o2ml4vwt17zefv73g0wk0f0bgtv3ucjv13x7r37ja0nn',
                component: 'zjw5vf65mb7czrgtu2fgqbcojw1d5c4r6cmxx5gw70mxbxve117psmink1l60mozsyju829n77mkjwempctkjvoqkcwz874mi5q147t4h1k2869gx0w9y53wea6tkkuci9ykngv27j4h9fimre2f8791fp4w2smn',
                interfaceName: 'am10ao3g13kb7mgp91wejfoc0hg1mf7we9mk98vsr54jggphk7gm4aizcfjze4ft388u18fbo3swkaohigvp0e1hotmmjdu5fgp0gqogaysji1ac5wo161y4047dzgl5ojejsxtzdhpgjodmpaf5h5tos5hot123',
                interfaceNamespace: '5z1lnopjoa4ubeso2s5uhgznn4t50zew32w4uv1r0q4wyi2moai5zwsvp0yx7x1f95fwu1gf8tfv7y72svkldyoj96j0nw258flszsx2t8f59utxaj9sx347s40pby4zovaq66utwjv14go22iqhxphqlsswntta',
                iflowName: 'pcexbl9pndaezog0z3pehkiafkt3rg7xsf5g1h783dxajvd5onglqeb455zg2w0bpo0s5jm76ich9xa523se290qayogfqk3u9smkgn9qbwbz9j27knibeho5ilhjq6111dw6b5rxmxlzbupykrn9m5wnibz7r1j',
                responsibleUserAccount: '1j7tnp8ea8bq7rmgbd6j',
                lastChangeUserAccount: 'oaqy5sffzq1dnhdi7yqn',
                lastChangedAt: '2020-07-28 17:10:54',
                folderPath: 'khyz0y347ho9uhlph5e6t4otqfsjs5w6ln00j2e8u11ugebfd2l0affvtt081n6reat8prwrp1516w1hsx029wxyn4e5u8g7i75yx13zed5336mjktdlsrrf4onrxpkylk02httejmivrha07otu4ntentmte95iehcf78spujyxfnye2j3l0bjivjvh2x324qwcy2477tmfawihw29jtz662oimstpthkomle43meyhw4898icf0h6j4sjfxbc',
                description: '6vwn5fd5ey5mvh6uth32p91t4tgkv60j7hb6s0tidzeyazyly3bmzvjnr5tidibk723exkqu0jerinczmb9yde9y1ey18q6zszibxuetezdvr6wrnc6syca0cj2ji0eechsh1fvxmg69x87ugmqs20r8km07iianfrd4pfhgijhln2mktqiuqhd1qihmw4th19x578s9y00drtr7v2gxc6gt9xiu6oxwxr73s6w5lkmguw2mpkry0dq1nby7ugm',
                application: 'pbwmunc7hf84vhktldso522k7w4rek5gf0odfpemx48h4fid5x67vn8028dh',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'j40vz3l43qzq7i0q8ldxf8gs9oh6kx2w1opkx20y',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'kmo01ekck1yxw2ijqhx6ztusqghdjs4hepmd7693sz5sl0iiqn',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'm6nibjiwf7qet9btq6ti6',
                version: 'iw12id035i71icr0zeyq',
                scenario: '433ld9xgumcfpuiecsbovu5qyj7s9susvf3kbav5k33j1uys7ig2v2cl01xf',
                party: 'mq3ljxf1ze377iuptuibdhq4ubsbdx0bgs087akzgt36k7csu38qyid11pkzf0hxyurk178v7hcozrkv9g56wucg6k0c9869edvwspaatiw0mkqkg00xfb67dmh52694j1m930ypckmvtxrnaw5a9evk0ofwjkwt',
                component: 'omov5lu8hm3a8nw1duuylm8pmj7hm7i4l6qqjv4e87yj1a8usyhtlppzkntbp0t01twbcjnu9eq5k0yinlpwihyoq9b6asijvw8i443eqpie1xeifrgtop33rhngwcfgo0xepcxx5pz9vbidzx9j0f79p03cxolq',
                interfaceName: 'mt40f8du0ou8atyp888ddcwm6jo7nxbibc6opxpx8z58glbvn0qnmphbmkfi4mb5snstu7o44cry31wolh9rvol34bt6xj3f0rx1vex4dxtx7n4exaxlq134lmoy75p3mwt4rn6tc6ue9exc5o0i2wcr43p8wq06',
                interfaceNamespace: 'aev99see0yzmw15noj1wst91cncghoups9u7da4fyriuasz3brmyc5q88hj4vv0cob2ugucz50pfunxf01vum0pfsvu6jf40kfuyewxzs7mrck2v33xq5g8bnacj08y8t9ximc9n2yz6jg95qhf7c6v969teu98k',
                iflowName: 'fcsm21srt2lon33usc5my1bp6xkyc0mh7svl836650aowm2zx3q888wpo1pfbny2oyduxtni88ekq4t9s4ds76oywuzginfwvutbtb2t429d2mu2cd8ox5t8gcjxti7ke2lwkek7k709sxvsip05kmeypvb4vmmj',
                responsibleUserAccount: 'y3kpxv2qdhvnxplpgnab',
                lastChangeUserAccount: 'zfdlhyrjft2jrc18ku3x',
                lastChangedAt: '2020-07-29 01:36:49',
                folderPath: '5nz70at5i5stj92x8k7rsyig56d1fsdw4m6kk1e0999nk157i635dgak5rno8y968k8vfqwl63mnmpda4l9vmgtchjekyb6586fvgd9nybjqqyyucln3qpxixbuelai4ead2ezv09dzw2x0nvmrnfvqycx61s6p46343b40osjr6jjl95l90qb3tssuwguhwgl60fuoxt88k022kg8dmpg0ftwb6yifrlrumsfa6e3tyiy7yeaz45xyrcqvvl7c',
                description: 'zobm2cp944dqcns9klk2edn37n124hu4puoslqek37qzgghbscr4hluh3ty5jcngtwo1ouqy9jxk354m24tgjvq72tc5ksh5tz420uidwwpdhn7h4iqrn1fqrrfpy88dlq7m4j515s755k8awrwlqi5kxk8czv2cmrn3you0229y845vr0h1abytl58y36eb41ru8ltzbc1xy8ds44l1qoszmqbryw2ml6a3dylcnrhpzjlwhixke0iz6233cy7',
                application: '002ad8ky1eqrycl4dli1xwo0iuoqvi0jb2ug2g7nmocy77ow8ojs6u7tv3cl',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: '7kxsq8wl19xh1a8xeoi3iol06rdg1w7d5miue2or',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '0rumtl90dx9yfm4w1bo8ajng3kszeogh3h3qscor6y7atns5or',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '8ve4so84v2btyerxmvyo',
                version: 'wap7i6l2n9f0bs17varq3',
                scenario: 't7540b18djr8q4qm0whxma45ygum8pirjcxi6s5miwhj6h0822uliv96n23z',
                party: 'c160jnnjemeujfzgf643k2nrlj73zgixch6stzakr3ifkcv552jgerlrc14eglvgj4jk3u34as7y78whahpnzurhhj9vt852ngyjk4ecedt9kazvv1hivyb14t7omyi2nmmjj0up9nxcxqtfztoho9fh3t0848cq',
                component: 'o1ci80ux9r2cp8yqlpdno8txxuxsublsvd5jxphubk4fwj31lpf7bs6xlxr7snyy8oe2xgkfiemmhje1lkm4rnx7mtx85x3gko07ar0xfeagk2emr5t2of2ffv1arwvrgsqp13oz5wdafvb3whylw87y8v05yp6v',
                interfaceName: '3ibwb7l3cksm8sthemkqblr8q4bz2lgzkldzahljcr0sivmgotacm6qoqdn91g92vblneqro4xdgqw2tp4kgcxnpf3hv2o4vfzytbnh5e23mzybzgsl7d8tqum8qgewozo9t4qa01mofcz4x26l1w3au63mvr7zz',
                interfaceNamespace: 'udaxnozte56ntfpp1blujf0azemg0h9ndmyp7p4encsyriievs1sz79n9dvbnry7zfi0uupc113o4n1m0oxim8iv7f3f78so55xjpynb57upfoaay5gib3j3vld9d54v3rgsabg577qzm1fb34goexy0gyy5phnp',
                iflowName: 'yl4e8336u7wfcrqjpkp7mvc7etf1gj0oc69ummtptp6hmfq56ca5zzft9f1rzo03nbw5t9vroocafnolknov1ib1r53wfoypflo7k43r3vbcaa4ji8ix80j781a2eo7kfbjuxs16et2r3o9nltib98k1gd857o4n',
                responsibleUserAccount: 'fhklstodmy4roa6yzdrh',
                lastChangeUserAccount: '5rbg3aotk8dy952z9s9d',
                lastChangedAt: '2020-07-29 06:12:49',
                folderPath: 'i5iopu6x457zp1avrtbkdopxxm7iqq81398yhkb7k1xl1p0w5r3404247s9tpl4u3dmib3wt5gv8exqqtfgm5se9fta7rf9a4u3wstmy58ncjb44n1qjp45f18jssf6aaiwblgfh12afqwwfm40lspd5hqqzpg27e8dtj4rhjyd7y2cogjcci3jpyzowi9625tr0hanf7hvdwqjqp9tflk8qygyxn0vvrlfl2k0czsjgtjlwpuwuq3xt1u57xzq',
                description: '7ne0en6pag0ogj2r6muff0b0663tfyog9niywlutmpx6rfuqsairkhdxfi5kfz89sg055xjgshxslsqsw2rezz9sxx4pdlrrglrfaqwtvdqirxdytpmehl2xkmw5ogs3fk98nhlntksgu0za05gxv60vdibjrdb9pizerqa23nka0xouate45dyy19ictupxac3qp9py2lxbzztvwr99pqdfvwx08wph1vk49x2dkt1152k0em29t9r79mzy524',
                application: 'pejo9fzlblx8z3x7osqtq6u8afmlv7kyiikmauk1q16p16veb5u1bna2ocyj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'taiae8h4cna6cn8bazj4evo4dmji6h3t2lr7hfj5',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'bj8k80cjxax7rrwq4qpb4sgxgc9jyjjrr5xyxcjdwuhsm4mhq5',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 't4nlishhdzyv4ew1qcio',
                version: 'ylx26ylpk7fks9913dxp',
                scenario: 'y9xlsm31sd0kac1qvei3oi8ccou0ywtt0okrdvrjgoq6kiyob2u9qdxb7ht0y',
                party: '3yzrr4w9m9qxot45o8nqhk0jhpwx4m0ltqduksvz4gazgmtaonrnru7b7b7oy3nc3lq1g2704ldtmzj40p1zdvrryz1y4rlb0xbka59v12px4lrafwjf0tilsl7nu6bj4kdxxdupljzxo762z9hr28qe74jtbsj5',
                component: 'fh67kyhvcpatrshz3c1irxjr2wgvloamdbeytvptb6xl8drg8x42sfrdyh17xjge6rpyxyqam33u34gyiw68zn6g08ghlobwfka7r33ljba8nfktbhh11xghrubqlj2bhj71nutytbzlygmhpffjeekr69shazrv',
                interfaceName: 'uz3ga7vaah9j9neeeqjixn8n015s4gg1k4ikknt7z5e4gcd0nfuug0je5hzalach3ajmgu7t5vp3xyfbe14fhsxxpy2zelxqa4679wvhql6nvyh9dqohlpul187ob21rzt3owdt8w9q413ak9n7v12yesdou3gcj',
                interfaceNamespace: 'txy05ssfcsecxufte8kzhnmjtoxf486cftepn77fiub58swtltsb5umclvkla2hsd60m42fcnpu3bcq4s41hz4qn1yy9ldd9th7z88to20wd3iflorije3b3ndi2n2i5gtcprohnstxn2rma3knsgqku4hlwg4k7',
                iflowName: 'xnc8lze3e89u4gaknrjsawb4bwqi9lcqmb4z8vk8aepyr4djia2zrvwgmxfz0lptw5brs1b6kps6ui702am98fndjds8k0j5wujrblwaz7q3pu1zifhyyjdriuobv09un2pdxpi46a4zadeh9fihre1xg76hh1md',
                responsibleUserAccount: 'gbiyeknt8raa34xjlxuo',
                lastChangeUserAccount: 'xa85a0zyipz7e0vk83jk',
                lastChangedAt: '2020-07-28 22:26:33',
                folderPath: 'ko2qmpbssp6v1libhpj44429c3o95qkqzmgjuh4nobillnyhc6cvhd1y9kau6afpcc83juna1z5ylg3ig2de7p0a0s3gvjoq10pdznq9rigoqohikidfypd1ax7zl84neav49fn9ti18cj04sx5ur0kcu08egdeqjxv17n2kzq37rrz1sxi3u30y737pdww7ol5nqee8uqnf43nwt1daqe5c7baao3dhlt3fwm7uz0thy83njakvowaw9vcbual',
                description: '53ud3lnff8yhypwmhrccldfevk5kekid05taritse4xphi5jc2cjr9ia7pviktwakl7165jxuwqco7q2y4l61j129ulrig3gpsdh5kuiyf2a4bd3vi9hpp8lngst5w3apd98veqw1314onaypmo7ohx3w962wrz1a4nv1dbi4ocy9rg2k54jonfx7b2wg662luj3py6c1bir0d5r73dytgrm3tmhs0kzu6ps7jnm4zc03ywb91jszsju9gll2pt',
                application: 'i4ym6khqb6urb76gtabahqo7p5dz3h38yer6yelr8vzj0y9ytq0k79nlsf8w',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: '17ooed06slalxzatlyhmhi3ix4886ctrsbylvxko',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'qv29kl3w9letyvxkxhm9yfgd82yyp6t3cog00szj9on5fa0v36',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '2xpjb47rfnkywerdhd1k',
                version: 'porjmxxa51j3ooww8qqj',
                scenario: 'eplasre6h92p5zyko2rd14adivhucir247oyah2b2681xqgpoqgb7isfufh7',
                party: 'jsun59o9arq1wy4ea9gi26hgatusmm014xnlj4ebiuhyuj0we0f3b8dals3bkgp141mnqxzp7gzchlcmx8ieiv9r92y8u8lh78niylwt9vkucwvglfxkoka67uv9lc5wt9ots3e486gky65io8hv64ixe90onjgb5',
                component: 'hbxdlyeps0r5meseziqdovti1bq2rd0evotbjdmfgny8v68taw9exbvsi8dbovjbmzl0ninjeo65r7cw7svkuz4ho6280b91njzd0e3rnvvrvfbho6s2hxandf7hctefnlguj3mqal5jqey3wflag37bhdt9wfay',
                interfaceName: 'wba1kxijca17sabldy32z7qw903e56sgm9zifss989w3tilpi69p2xea8r155ds9n7xmk9dy4egdb7t24esb8p2pwwgdnjg63yuox3wqnorof21faod0gokey48rnx2pncajrvsp86kevfj65lbqjj7c43d3k9p5',
                interfaceNamespace: 'tp4vu5peuzovl5eunl4rsu13m4n4zjkoktsa55vd1o22e4imjxk8df10js3vf3se9jo1albq9nkbjjzsmgjpdv1xta8bosuvp8qe96xmwuixmd9e9qs4bd1wpwj2mr8qkujg480uro2em66nzrg8jbhlxq54mz5g',
                iflowName: '3xqs9qm1vo97vit357ny57kayuo9ow6es19gobg6k49gktj16per28dtzmklaup2h4rfy6o0grielc7ssg5p2p17z7h84pigndbjichme0l6e9iv0ar2uan6h9k6jinxwipb5gn9tqhksz3zr8wdbz70av2v5vvx',
                responsibleUserAccount: 'um7p8nvhcw98uv4cb2nd',
                lastChangeUserAccount: 'vz0dnbihus0yi36ufpic',
                lastChangedAt: '2020-07-28 22:48:30',
                folderPath: 'odb7h1im64wl4533fxpcskz12e9400c3nfnano6n6ux159a5qjj0li0h3b5kmi5ba9cx8eog3nri4ehnymtdahxq20773rn9va9gfs9mank1vn1wn4zbxk9hs0guuqpr2hotr6kl07cowt0x5vdrpiym4sjh3iyfxv9veid7ki4chk9bl2e34qfwbr4pli0git3w7n6rjp5ar2kxz1zav3rt29q4e3f2p1q61vi7yuqfn4cp5ny3sbzbluvhemw',
                description: 'jda0slm2iyj9c40srxvu0cvxoqzbhw5bauzawnscg71f76gyi3rueww4ippgurnm1wq20f4bwd7cugzs1btjlsmjwkg40rs2tbvocthu2fop1yuri7vvtj642crw3y6yvy1b7z50pn9yiuta0gxg6c8kmg8bexrlevicqfa9ysbgnjd0t8mzhjjnre0krwqxm87hbetoi7y4iul3ysiysv31m1k9o7rclrsb83467d9nhpxczdx35nds906ysl6',
                application: 'scny5uabludo55jigbi8wcn3n7ythlrj8xcnhyzm8977zvg8qvw5qlken0aj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'jbk5rwo7n56tge28n6b3z2jvly8gklzmvqps4qg9',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'jafa79vgr148l2flns28we8w8wn47bokue74oypauy144l9476',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'z63vsl7w2eck50p1g3hs',
                version: '3s0yq0k8qgqrfgu116bq',
                scenario: 'lemosyp1s3ac44pe1tzxx5vm1y1o7d6et3rugf97aolpwb3jv9efirwm3jcm',
                party: 'm81ccerag7ov1s9ex8ui4ef7yhq3pl8zzsg7rgludp1efmkr4o7phfjn7w3syvl5qmp62134gnke6j3i7sq3p7bn6v5ookfkcpukqu1kgdmebgqf450rlwwo02fc7xaseb3sao0nevyalhk7di6olwxz3pf29xz4',
                component: 'wp2onppn41ivoxyuo2bgcvmhwq3csnkdbqparsrl487blekxg5xg70ixik2i6vh7izdetrwl6e3kz1ce9o6xkazscvlyzw8veo27ry4p333rtuthj51ca094tktryfnt86doz22i93xan01eqw6adva2ymfva4y1x',
                interfaceName: '64j6m3x7smu8r5cwnpaq2kgcl41zfnry4x45dhn5iqlbsbedcwwfhhk7bnxq5hp9q82i04ebet1vg7q41rynemp0gc4l1zg37h8f74oqe1j7im4opnl06nsoi2ol480ua8eggl5klidabvwxedqgmj7qx9ss6y7e',
                interfaceNamespace: 'q6jm4uvi8s6agx7egodb4kkuk582injnvvd4j7db7z2xuli1ax76ui0vxj61y5akvrks6ftygg0l84imrnkwklyf21zm4q1rgtgnghg8y2qyunv6byqwtfr3wd271qwx5hnjyf2t6f4vee7uo7vup851f0k2me3s',
                iflowName: 'uoig39ihi6xajn0kk9w7wydh3ib4hojff3m97yz13gshn8bwwommw5bvggrzxeicel35hpkbo2mw05knnhu7g5wzgbzfuxhdzml3hbtwnqtg6ir5vh9bof7750tl0cnbz6yszt0l1vt9dgv9uoosrpjowdazrny8',
                responsibleUserAccount: 'g8dv8l1liys3hp5xi6o4',
                lastChangeUserAccount: 'iylkyo1iow1ltmzcn7a7',
                lastChangedAt: '2020-07-29 11:50:39',
                folderPath: 'rd110p9tggtvs9gcqpiti6cutpwlsz7cez86yjx50ax1owk8xtgsb6yvp7hm84pb81z8oyxju5ptla9oe0v9kmc8epabvtk842h7t8q32r7q1crp4yntyywqwlweyp9iq6ib475tals4bxum2j4nqmwldlpha0yxuu0azw7q4zltnnwg47s4xeml5inacj5gfvsbv2i3ajw1n54x2ayeapo6z3v7rfprum7u2ytxiqiu7vtrnlk38uwnfbohniz',
                description: 'dmejr1r28m19hf5tfgu6guzg8jax4atw804hieu7x8t31enxu6g4h80us4hbey32hmzltbpnvjaeg6m0e41jh1liv0i1xrmgc5jlc43ig8cz7ya9jm0qza2nyo22aj7wrek6zis67zi7hjj366coqwpi14rdcxi1yydt1nleihu9f1x65r5a3gl0nlc9er8yusmmvp6fh0a1x81c7mossq807vcwl296lggdzd9zc0d4blcbk5ldhmh717mwt44',
                application: 'ru5qnd1m2dbpmao9lhiulb8ul0pv0rlmzoa2kkvdpftw0bbizh9cfb5y19c1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'adqrdycmlecx20ai0wy6ytr6jh9kmryndnc6u2n8',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'v09wrw18qmr6q98ktcioxjrsblz4sr9107k74373kgudkvxtq5',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '4m3p7ffvetc0ci0z0bvu',
                version: 'm6aqy2fz59goxgpylpu3',
                scenario: 'ig83iyyfonea9t48eotw51q3o1yzgdktek8fcwnl0lukb61kw66efbcu7p2o',
                party: 'mnh9id89ct0nrn14waii64sxyt93bcoq0s5w8u3xbkyz5k95hhhf3ll9ysr7zwgazqp63o3m5dwyz0gl8xnnfcob93vbqd69gf12jld89nhzbc2bxiz35d1qxznkqfahdd6o60ej7wk21xcyhpingj4fc9sydo6n',
                component: 'dzgjah8idgv6uwp23638kp30xyqzdlgfo6ld6h3v9u90uhhv78sk319rfxew6ng3dm6d7yw6awr39ejls96k1ipwursbxofrf5l0hbnielll0eyv5m4viwpf9dchzkp6t4jbznnid1kybd6pe7zvxg867zddsdn1',
                interfaceName: 'tyoxtji6mlw2fcmotn5klqrwx516uwvpcy0jle8xyjpaztx2dcrtejus71fxdl8iriyb3uyzheoohvw59aarobp9ec1jtje1c7crk0mx98cu6rbndl9uhfrjvj6u6g8rvjrpbm756o6otr4sj4y10yb7br7yaez9f',
                interfaceNamespace: 'qz3kal2aa72qwr7ovc5637meebsry9tf5q58dtzld3su9l3bavv232zoizgilvz2cbwzhaq2hosz4eofuc8jpjcedy42tjbgqda3pr3376wj7l0r3c1x8rqccnc79vr5gzwrmbb3qml3labkrgqg7gdtxe911cv1',
                iflowName: 'yst70ptis0uhv7n9be222sykdo8i0uku4bud716livcc63tjwfnmlcjuou6nzzjrfjlamkixb4pc96v4h2hu9g68rj3ju565ji7ojk37t9qa2xtiarx18kb2ky5bi717az1alafjsxynpg4l6rd9pcy5borpojcw',
                responsibleUserAccount: 'zt83qaro0awsvhfg8ikk',
                lastChangeUserAccount: 'b86efapd2sp9vodprc08',
                lastChangedAt: '2020-07-29 03:27:30',
                folderPath: 'cteyf3emaf2yyqragphdx67f1wjss4h7kwrm4nvpgrxmk4e0axosiihyuco24p2kzdwzjac22bl3vwk5ourgjmvksilnb8alvho04nfkvdu2fybqbf6e05wl3i6cwkwiwhjs185lewbotjddn4jiyul9jpoap6midgo6bgdrhv99vz9shxw9zlhem9wqxpsr6r32l7jo1gfq2badiitrpvfdnyd9h46wpmmo5rbu441r2svxc8554rrh91e4f4g',
                description: 'z41q9qovgxnyx1a38w6dvxradxfcy6bh58x7dsbv8eh74swfxj83pjx249dubc0owb0qpr1mgr4pnxsslnjzf0dum5jns6ih01xh729sn20u6tnr5dj3pu2ht74zrijqlce9aneye2pdzzdptjv4n9ju6ani3ixe5o9xse6lkkf702vklee5ys5xb93c323wr1hcs9fd4sv13eakon1hnt4otxu6lz0c25b9f1wy12erztmqa7m93b5nunxu6t8',
                application: 'ggaf31jf5k3ebm16bj9vwiug1h3c44ba15ziqi6naayf02chknr7sk5a82s7',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: '7ydsypudmjd6hwyd9vaa49fguntqd6tyr1kwcpp7',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '95mgnpxbpprq2kkmp7wm2qajg8eru34fteaoe7s77pbxwkxn8d',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'epm6xjsw6xtqwyws7nyo',
                version: '766392g6ragdhjl6grlc',
                scenario: 'wamr53jdycg0hkjm59nwh10fmbhy1avqaeraut0e1aw0qyogzcp1zif1hvrl',
                party: 'i40qp0e7m0i2qchejsabeveghuugs2gc2uzbz9twklvo6o2jbru83ztzfufq3hpjejqx2fqzui96xoe7rioa8wbpgi7ui4ur1bni6yw78jpiq6a60jb77qfkacns5f05r2ujrcwbkvo338uvd5fhkxukvnrslrja',
                component: '9i2czbd6udyi5xpb1i0dguyticgctanr9gg5bdp7zcd1tine53wn9g2pa3cbtvplb2c2vdzk65ppvb7c2qzvags55yvlqubs4sjvx3gqac1r1ql6mryw2h4hxk3d21pcu17r7jsfjtgrd4yhyaoirxszan7625rx',
                interfaceName: 'xzcjn8tthzr9ccfywt46wv8iimh07kpic2udfka86u3yvc1ezf5jrdj0zpjxt9iltriynn9vf3auqkxlwg2v2gjaq1esuvb0314d22bpdvtwh47hhx2vvxx1a54qcnsf1fokboinbjmt8hvwx3izc2lqjo27p2dz',
                interfaceNamespace: 'u08e8eqy9v54jpdmfxkhlhw5auyn65sot1q8q6rgdscmxnr26jxvx9ma6dam3ef3nn3lo6qoj4mdslay9sxd7olo48oj5pxfg2rj5q33oilzz9u64lnxf6f11q8h1z8rzv8wqwnn4g38xr8qonwfozqbgc7sg0abj',
                iflowName: 'qobxfy0sh5vkxbzkyabg78jacnamqyq9uzm3o38t5ttd43toorkyej4nt8jhhbm5mgd92o4y1uqnss5leapnvm3xgufamcveb57d4vu91nkuhmv6ixv2ym2dhnhlyzm9ymsozr2ib10zewrg5hh2jog3ff3588c9',
                responsibleUserAccount: '3yaylqnuhssfkdf8fbwv',
                lastChangeUserAccount: 'x6x8bu5fkjcewaozjxqb',
                lastChangedAt: '2020-07-28 15:58:50',
                folderPath: 'refiubpq9x2alqf497kf9hmyzyw2d965jdb9ls39hopps2o2oj2pbh16wxg3w0nc6r3nft1pksxqwdyh8w8kujk0t4m2loqk8a4qu2btyyw5i9o4gklbpschwi9k8i75zfmrs1hiiv6tdn6nj2g7346a2nwciwujeqmknbwhqu3kt7e9tj7q8zpzu9hl5zh8jp9uusxymip57exb1cbfnr0gh2qg3r5uxa56ieerqtx3anthwp2ric32vsod7hr',
                description: 'q9dxrsemxiwh2a33zjvfzoinadgfhl0952evf5e8vvzspj8rk2i01aesior65pe5mp8fz8omjq7tcg73qxwr0ew0e9d93j01qhwt8xmb8oai8hoj4if4au1yacl49b8sjlow9nmdpbph3lf3x7hp0i3hkx5p3zdsc662sx7ch1x41qvq08pv6qzkbjvhe17z6qipmzmxod0pjmxz49f3vsiyit9tool3951mjx843e93vm7gvdl2yrks24cju1m',
                application: 'z0luhege8b0dpxiuojs3ozyrqo4if2ulue3on9sx564glifq4z1l69bg5e7l',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'p1nnc535obigi7bpcrrg7fa5r3elnvsmagh7p4p8',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '85hlyt7p6gsiigaq7jds1a4db9vy65rj7x3398pihqh89dyrh1',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'wxcdgawacjp67807xere',
                version: 'muheqz7m37lell66hhbo',
                scenario: '1pkgdkgggqo8jmek7qgqn4cw6s7lecp91jlbtjvbrfdrn0n1lzfrin16ge3e',
                party: 'k26zs6old0qnsmxez6cef1a3a9qq2nj0iemrbrw37bwk9uyh720p17vjrx8hu5szut5e2aq7jgg6gerxli6xs09iknexe61x3wtsxdhzj1u8d85uujd0xx17mtizvm9o1pgcsh47xsi5xm95ltt6f49cuqdtn5ua',
                component: 'rems4907rkcp05rwhaux334ribhbkqdtiolkyvg3pazavbewien8a25b8suh51edezcekrz353ni1ctekwyv5skw7jml2mqa9rjlzd5rgkfcrioyyt4x08ufgogh8ia3ermrovx7g2hptnz10s9pcp3nw2828npe',
                interfaceName: 'mqqk0lcqc8x0qfagg94z56yz57axvgxvh8vrxj5ushwp2aj1r1hg5633g61nsdnrcfljk6nbgmyecpm1oe6hsqjc4xfk9iub35nx0ais4zsto6z988850h1e9qxs2qygc3ej8hnach2qcle3e1pd7ipeigdt6wwc',
                interfaceNamespace: 'hwch3zrjhymt8axf831jmd04kl4rti5infai3at9vvs05rktuillc80layyc5hcae73xmqo4z44zuy12tdsqy9lsbbkjpzkbbtz51nso2p19zz91tbarj009a9zu701wc7mwi2mnsw8kw5qpb15bzbocgu2msfy4',
                iflowName: '3pfe5rdq36sj361377ucjyg8812zunpl5zty2bt1jokowagxsx2i9kexytvgkvfrvzvvsw442d53u0uph8khym3qj2zor1w3otiu16vkxphgtzb84sygn6r1a8l6x9hphbo6je1090c1iird08pkv5hynpsh1al82',
                responsibleUserAccount: 'x5ldays6qvl9dhydlr6b',
                lastChangeUserAccount: '3ur6r45ysvev9k8muwxm',
                lastChangedAt: '2020-07-28 17:51:54',
                folderPath: 'i2e3z2mx3laic8rz2plx8e8nohgy5kw69ppdrmhyylef4vfv7bbrsn8nkbpxqb5808anh41v16vh27i3uj3g5zpeo5l3vgs1hvonmxm1iej904eprspi3b3x4dk01k4wephkwrt4dhnrkhypyxoz5s8es6ier90y0xjabpvglns4d60u6qj1mqj0841a0ji2m0lfzi22bgggg7p7g06hxb8le0h26tve4v6rvlawu6b0tdn7ke6o34ucauysxin',
                description: 'aldliaieg541wjjfzxf6heeujyhw5y4icximwv2bfax4jemmbh2pdh3bnf9531i0grbnir4txs4vt5xfm9oroahmqig5x3dw3nnmhn1pdh74tuk81uujfhvqylkyghpw6b0bysylz8lbmkbo87qgpelmnjvlwqna5g0grup9ckzwmhrveoa0wmg1t8jzfdrl8bcaqaipbksdyxgzh5onxwuidv8g5ny0tw8z2fi5fgyju6u565jm8htjufywzfz',
                application: 'wdewbj0b3s6l5r4diepz1jj5upmv09wkb0n3dsdwc1d3b637wbsofs87apvc',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'mm23qtgnnvyfm3a4ox3kyoy742nqt71e6cfqtcmd',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '127qpsbf675uy1rg54npnt4e2lgzjey31a73azw0lbeox1qzoc',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'phrejuugbbibxmmbk17f',
                version: '6p2iu53iivow66cwyzmn',
                scenario: 'kh1yf58p0lxyswfkvfohy9fpuwujsovwsgndf82lmz26d63hc9ckr046fo21',
                party: 'fqkyv05uj9v1zd6qx13cogc7kjb2zp1jziqj0u017k869tw9mx8qjm3zjilsa1qkpaeetow985lipfagowam4gi6b0pzbqjfv7s907x7cchakhrvhf9n4v47v23r44ztaco4h2aa3l9fjie77zp651qccrunkmel',
                component: '6ytixtp6i1qyoc1rukhxlyrm1tk4r97y996xkd79u5hhpal65eynx066lzrjr8eqas6zc17h45dt7oggbncokfgd0vjt8ns6w71zez1ts94g356inbftvtkvibz7603nt5p320vtw940s73fif93kbi2qn5g4bvo',
                interfaceName: 'klk04f1u34z9dzfg5f6bpucdibsp5fb8yrer70ubn4vx7avz87iffby1lrko3udj2zv9ut309lt3p19p5yujara6ftql2icui380fdsapr5ttb2iqsjssseew315pt8eggzb4iippl5skjszpoeqj14mze7wuajd',
                interfaceNamespace: 'rj383zrabquzlyfxpja99hf4xfyu6tx1bxd89pdwns0d2zfbc0289shdrx2d4w9zgiyv8wzgr81kw62zkxogxrdp9na3l147gibeoq7frzlfuyf5y0cj1xox7ocdlad1k6ijr60palkhv9izjdqx9pzpxzd2yvxr',
                iflowName: 'aajwqkei0pz3jo7y9ia66zry36gprva8w6ljzsko3stzclgh5hokjd4x4sdt86co6259kpgtanm2rye658awg0b1f8vamlfj1iirp2kcvemf67utmteb4yswg1beai3oxohz1sov6fe6vb9b2du3wfmjpbefgu5b',
                responsibleUserAccount: 'p9z7qodrxzz4cabht429d',
                lastChangeUserAccount: '7i9b3jxba2q3m7es0zo6',
                lastChangedAt: '2020-07-29 09:15:08',
                folderPath: 'o1bghh6l9und4wzehmdho4og20q2rrcf1auxoh6zoi640gh09wmx8jcddy96rzfhj7jd6gojcrl4gm6iqgf6188sdbdadq4a53es1pt6cam2m2wo50tlur29kl7iubdo0jyp03szuffm75r42jj96hb89yvhwjyc4kt2l6nxw4i8q5ripsskem6a6x7qdqg9apkjrnh9fu25ivd085rokx5tjpbrv976bkla1fmy6fpylhq5h9abow5x8cgzm92',
                description: '0d8oh6i8q7tyasvq7n1jm8dw4dgmwl4byc9ehfwb9mr6c5igyox3qa8nns6qc4vex91f5lfwc7no36t2e2pw56s7xen2c2j18y1t8onl7f18ad8x1ijuetfrke4wqdevbeerl4279mrqnjseaflrkv3kc4xonz2eut4m9fspaplnxzlx3tpwbuerg9ycu159ytd6hks7lwg1fdga8j5acose1tx8gmkfl44v6yk6q62k80x8fxu2apdyifrxb9v',
                application: '5ea1pbbe8l7t7i9e1e9g7dvs7do3591sd14gzouavrvocs2imghpg38829ri',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'db3hvk66x05eoe9balt4ovrvtpmsuophxmevwi8y',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'qmz73uocl7ha3otb06xj7dvj8ubxx0tw7cdg8hhdy2dix2bk8r',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '7x81uytsuiwr0eoayp6a',
                version: '3pke7n5fiwyl00qigpsp',
                scenario: 'c8fteghlp3cavhefe0zu83n5ofpj14yvzhak0thtch2xo7cdcfeskkg2ecii',
                party: 'q56sf61pz6j77ty8u32kjydgoc9kopwxuj5nyguo6frq8hj24pl28rfqvckjo1k67j3ray4lgbbrz9tuwkv1hr9snk8onc0vu1qo1d07pd5c00qezaxv7hj6ue5uwf9r212wsp6ay12qznsnk0m4v9l9y9arw50a',
                component: 'tyx7fd97vh3qm6dl9ismlxl4qhtfov5kinr31kbtt7wdhpkx3pmlahi5mpcedm03cprq76jgunjzoja1whre86dl1nz18o5kgu8eat8ifl41cmb22wix7m1vnywtq2o0eo32ucm94op373fkwjg6xafqejkb5zl4',
                interfaceName: 'ihmgtj1oil5i9ytk91s34netmz2an29ybp4nyxo6zxowq17p2d87epm86jhow4i92sdabr9ksci6slvulv6ka29lxra2omvz7v80s64id5nyj3p5ss731zj9hlmxc36mo9ji03yc61i4nr5ikfbo9zl8cgwso450',
                interfaceNamespace: '7p2tz8qikcpjs220wxjtk9ximvr2tqopjpbm8fghd2oa6x5tgzn953ljehkyk8tynb94yre8g4eilmpr94hl8myvc6jyyxh1ah553xzm6kwjnud2wka76n933td0o7aqeyoa2gkzgij5d8d37wd7unmbs4kohjoa',
                iflowName: 'nnlws5t4o4hbfvx1pmx5wf1efnft5klxn86eblna6ijrewwaz7cclzui06o8cbkwrk7y6wg0toi3ejgrdhmuooppgfuojgxhrtd2obce60zka8sdf3uofwn2k4v4pg1x18j6do2mpdmpnpayykdhiroam5go7bub',
                responsibleUserAccount: '94dvwqme1sfwfeloi4ux',
                lastChangeUserAccount: '5cbnsmtyuxlappgqdn9y7',
                lastChangedAt: '2020-07-29 11:13:24',
                folderPath: '0nvz2ki4pqpc7jumlrb2rki64n2sjxjcsqf4rd8vx0c62n8edseqcnuovbx67th6hy3j90w4lk6mgjshr3qyj4onz7k2dzz3as58l2vqulvsx8ikl9r29surrv7tggn4ezo1j1rs9mjncv8bia7px7s8xuinm8uaj4yfmpn1bms9tuntf7t0wnxz9ra7on1cbwtkjvha07hjsxgzuuw2yjuuojnjn3k3nf9rrvq43qb66ntp1em52z1yuk0x9lm',
                description: 'njxapuuukwrfgs7quqfvzcplxbn2xfadgs9zpbex663k9dkjn43dvaerezamrb714dod90paqpglmtp4mo4ysmfsbv01dybse4w2jzoz6a2g5pfewbd1t4evzcf0zg3obdrp0o78ewggyap3o1ghj8t4ogm7fxzkdmkujqlhhzf9yjsu7klka5d5iavijfyu5txsru015tlkypqbsdqgtj3u221b9zsf1n4acoa2qlneqnx46j7z8k9ylsoaiqc',
                application: '21wdvfhqusd2seexcxkuvou7djyv6xdfupfzqsuvem2nwt53hy9kxzf2wv5z',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'eaj5hxs772o4n9qdgch9nf9h1p1qdzybt9pbuxtl',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'rsn6l7wm7qnd3j33e41xl8334l5f4wle90uajquh7s2opnkq3v',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'dhzisl2sbubf7oldt7e1',
                version: 'hmnpovl4ynv6m2tjqnqk',
                scenario: 'dui1zjylxn6xk5fkulno8tfg1q7ukd6ly2l7yrnsz71k9utnff0rbgq5olec',
                party: '93llmn69t4jbhlwq3u49xh1u9o8qnho9e2pxidg0f7sdnbemkn60nrs62ztnh2fu0xvjhmd476qv4ugvnuucklnm2ac5mso03mzo0gt1lnh6k6ijcyco8g4w6aju90u1f0h8m121w1v72w1dqbaolrxqyjl6daaw',
                component: 'gn6l0kv9i7aosj0u956xqwtqo1q3ju21d5lp5y9deu2dr56kobm5m1no06kmat433a4kc7dwbkalswimqogyful6f8bojg5f9yhrwhpuyvewy9fzc7qj1cawe6ayfpu8uo2xhii1sakbsqhndjmtagqffp69t4tm',
                interfaceName: 'ksr1gvv73xjhyzt888qbdcursgjw6u37tcq852b8e8j4zljsxy2e9sdank6pdg3t0axj6v30prarvnh3iy6zgkjxpviaos1ob4ha7uppcivqv5lfnio8w3gf5qrjiaakcnzkek2kz4033z28l7k3vmi3fza35gcq',
                interfaceNamespace: 'o5ge9bc0gvm0gh09nqkoubhpeqloebmhbwf3oyt98g9hqcy9b4dbozevin1b9fy4071256j0nhkg4h46g12bjrvop0mhcozvqpblyg0tdzvw51w1b8s6fh3jpdo5c2cbrio1mzzz63gnw2u957ng8bdggpvuiwax',
                iflowName: '8lgxz7v1pu0tchf7wyx3ycewqzfkjjtjjpbkx5w96xenzvlatbodxku98nkf7bvmeoi7qzs14b9rbccs9tz5e0r51cip5xdf77scv46nmlw21kc4c18ommuoblebrlhtcjck4bsewbooo0msu2lfldfcphvegyzd',
                responsibleUserAccount: 'wr78cndauiagjdp2jxh5',
                lastChangeUserAccount: 'w313o6dqdya06klm6yqf',
                lastChangedAt: '2020-07-28 19:05:08',
                folderPath: 'xg5wri9xlf2au9a5tg9o6g34hg593we9klhujcv90h77rgg3e4n4ae4a9b5apyqxisrx3tvny1iv46bwskhzz4f1kymhaqj5slablo6gq25qfr6rwac17mcm08nkph74kub7l0d4piq7rwx75p2d9jt9rdsd7lx9nnosv4mc6ynduq3prkmi8nqi5zi2jlsw5vr8dhpd3f6pg1qyqtvklpbc92imuzlq3678xg66h462z873v7r2fuh6tqyke1zd',
                description: 'q316jbw9jmb1t4jpadcq1wvpbmnovvwa7a1kz0nzhjj6nlj834p5e7bh5k50o1kmhzrb08wvv5s3qarpi5zjoxmn04sp4c4d1u49z1lmj1a3h1yfqjkirlukq358m1ws7735haz12akakil6kl3zz979j6x1yfdwr4l0fccvrqfqghb3nxdju7e6w29wwns8sd57toq21uvctgyhdrjfjgfr1a4o3w5pr817ut756a8drdc8vurdodlxmb2dd1n',
                application: 'b0x4l1oe5j02km1w6y42l9gj7ztgf33c89onmtsiiwwafzr0czgdlsymohba',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'gr2fyr0vxzd7fnvifjh3vopbfcf52th5wlwwoho3',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'nh7h2eqxkwu8ozvsfbz2ut8fmoppi02e09jfk3cjcy91s05k9y',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'dnfvof6p8csg2a87kdyl',
                version: 'iwjt927qf8652qabym5w',
                scenario: 'ftv6tapzibrhmicesnl7wcafre2166q11ysnuz6qxdfbp989z8h0zocbucu6',
                party: 'rlyb4vp5hax21kcmtd9p8nh9vxhfxdf6cazwzvrlk88i67pf316060uk3ctsgnfwy0qm15fm3iz2ovg8aqzab6uxdtrc1grdla0sjy3k7l88p0h7v9w6kt68h6phzy2jct2xofc3ca06oz9ojvylq7uzd1hekc73',
                component: 'b49w9hhu81ghcmixsy328olctladhwajojs3v3dfexxsm00ur2yzmcjrfjr3cjxpsuonj9sl2np9kuiirlknsvg1zsgn3gqpoz5egenf7aq71bi4mhosd0afi8v8fe5fdg4wtwhrtxsikd7rv8tbwqp55icuyo56',
                interfaceName: 'cfaawp8pxv1hau9cbsoz62t6moggfckevjo5j6wffyuky4v8w5s1xmx5jhtv6nuj1z0aow7wgc0zsdav5bjt30dbetlqxrjjwrzvthgi1tb1vu4rxfj2nc2rv597db04es8kd61f81fsx1a1yjbnqoni8d2v7jps',
                interfaceNamespace: '3bcx2sfhxwcp2xurbug67trfy4tlj20j2qbscz0m3i7nktz6prpw76a5toxvkqojdcqw5xyxusvahilrn4p9ymkcl9py6fohb4geu5jxkeegfp39v89760wq15ma6547tr151qsyhcjm7uyqz4ea5sd104o6wh0u',
                iflowName: '3jqigurrcmi1xy6fu27b72ryj4w3tclx475hkhpvgrv99roqgecnt7o1hmt498tzss4mqa1f7q1imr4gbptrp7mk4193ywj6fwzduhx2ugorgl23o3w9uxjxkb5q9tuxkgpoe8jtkxlaw4z5qgbw37aio8wibzq8',
                responsibleUserAccount: 'bsf63ufo9y99p7iquydv',
                lastChangeUserAccount: 'yi0345i6i6uazjdlx6la',
                lastChangedAt: '2020-07-29 05:37:41',
                folderPath: 'hohxohjvkv78y1z2ohofqj4l7135uuftk8b49hcko714vmwhsw56fdgogzrx9f86k1jy390ab51nfpodhr3viq5nb2ux8ihfaz78el0r6yeivv87c7mbc12ph3qbnih0k5r467cxjlyo0c0bz96z6ypkn34bg2mgidaow8y7gxasy2pt0tw0pjbzsx1sfrjiol0s65tslz4zczdjcp3bxyusxuqmiw2kdknj0hm0v06x8w1a5xwy1ex2z46b51h',
                description: 'phmucyd3l97yja5vux7orh6sgrveo8f1kdg1p53fx96stbbrfcoa7yovo6dw80zrcmxun9aaaonuxh12r0cwopj88rirblohwzt6uwk3io4d5qae0yv38v13468p4gnh3wq8xxjndl3ue1z5vyfg4pcu5e2v6ey1tulihq8iw9qvx5i4c80jm70q26cxa5vxk2a559a5tuidlcx0g6426ytwyyrlknxcts3g8vmqlcb3ynyyg06mqnivttwjpbjt',
                application: '4sr26b4vhl8t0aqurd9gci9ha2eruhg9yjyak2ea8hxqckupwaor5ouu4eth',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: '6mbdkpnypfguuwjtaakbbjfxndiyabpxfb6ifm9x',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'st40579525cbs35qbsv7gw1xxx38po4sxqz4kq0mqaplt8fwed',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: '3zrbmtouae8we8k032o2',
                version: 'sn3wrkdal5kch5ghieri',
                scenario: 'fr1kkl6xae5k3shw44kz4meb3als81kzejot9mf5oq5sclb8t6l6l4144fto',
                party: 'o9ysqgyh4l16keraxu6sz808zee0cucn8377u9xnrw2p7jxwwm358tnlt8vbt3kqv1o4z1tjplct7hxt689au8nus2fahcg8vquxl2nke1g3xfstk8vmwshdd3zc67vdbho0vtf0tk8759pusiilb7usix0e7ljc',
                component: '5ul4uv883yk0mt83b6qrdc02a6t8ncknngnnwulhrzxczj1oajb8hjprzwqcotjcp0t8s62nimz8rvhkt96013yweea9ap4lqff3gjvie0v957962jumbtkivxn1dir70woeuo73eh3qihpa9mzpdl1n5b3t0gg5',
                interfaceName: '9abriocyjus9ebt9ykoh7cfmldzx1ev7feurpph5jsf8sfr875fey3bw2qjgpybexl0o87q04kj317maxkv4zzc3o2gpcrrg5lsjj3hc78cxjmf94q80dmdtke607djohdqtgt35hxibeuihpes03hxtp6mgcuot',
                interfaceNamespace: 'u8uop0tkyp19bmyxyhl3drkzng9qpa9y6f0f4ugkje394uvxoft018ivsw1u0jg8ifez1nni1707c8ogu2clrcracoqembqik2hh4u1di5tbslzpifx6m9skf4o7blodd40oygyzv1bg67qsb73krv1fd7oyfsgz',
                iflowName: 'eodwfy7bxhl8if6pvrpd5h8nihqmmx8k7sbtyipe6row5slvm7bgjtudhcar9112u2detjbx7hfo358ox6zjni8yth3o7tr7sms8cfe934de9b6htf4h4khl9uaag50q4mq6tayc4pz9utwwt86pzlv80s7s9w2n',
                responsibleUserAccount: 'qsfk9eotid6k3ru7upzv',
                lastChangeUserAccount: 'uhh1nocktxogoisrwkzo',
                lastChangedAt: '2020-07-28 22:05:13',
                folderPath: 'fvzff4k3o6zdoml1hzc3yj1dp5ikouiiei1hs96ldcoxfn6vt2n5nizqt4u2bnaot7mel783k0ftc5qfmd54cl51r041ah7dxnyhewbp2b3gkjdrzbxv8z83uesfwpwlne9vczr7um0zus48vtdtxt8ywcgkmvw7yz1goiti9xmm2oz18f0b0u31jzoryojih0pxnvn1dv2mpiyphvcj2fjvajxxtd9k5obxd3621v9gj1sfqk93ztmn2nxfd7y',
                description: 'jqsqxda3hqdu9tfcd18h93qd67pd01luma1r3vg2fqzu1vckgmh7dvasuus94pmx2105z4856cuiuy4eyfb1jscd4byurvxy1vfwp6itifo3syflb5sfdbimsv54o4ptsbmncf6uce82i3eprl7r6injf9pev6srvhkrtmlgkvtg3wycpjz8jkw9teas53r6afr6yzj26adnssei8v7dvk2qo6wpfv9iwq3mmaeoiwclkz8rl57c8cupgm35fme',
                application: 'zugqfnywjx8k7dq2uu5ei64upi1znnnmjtf98sb6nhwwunbabiobdf9ozxy8y',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'uqcw6x7urf6ej6h9rjr0b1onwdp54jivqaqnh9qa',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '7ocoh6o173y5dzdw74mk39z4qmhsmapuh25x52nk34p8p9qg2g',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'cunsecztdrwm346pmoaz',
                version: 'gf80szyswllxwekwc7xh',
                scenario: 'au1m1ltqm9o2gnmb340p86cv8l37civ57akykhud7n6uo3upoqinil2kzoi4',
                party: 'lex1x5lewyqci4qbchcf9tju7ffk3unzetzz8tkjvajtprvb5c45ytiiitpxlhq4dsj5jbdyrcl0b3njugkwvx6rfhceebrmydvt6m7vf7ft5xmlwrukexq4h8flutf4pl6fbq1ynb5xxzj40f177iq6tsvwkxpm',
                component: '1965cdzkvkg3z1arznnq7kasb1aii6q9iwp571zr769koo2kvqd24kd219lqd8gimc9h0ekuhyqfi1x992uempfxtx9kctc5okx1h68afsbtiv6fwymn6ueiokr7c132im6xljzcgnljcitq1qu37z8ilv4r5psa',
                interfaceName: 'n7eitjbmyti5515qs3ivecjmqi9rwu31y8eyk1mgzmwei4016wnrcsgqwegerii4mt1jrhx8cxmx4aiupe1v8akvkcarhfmpvth034kg72zc2wzooqmrstj7mhwrrs6324lgfqs1bcdpzzvg8pvw703gl81cwg1y',
                interfaceNamespace: 'jt39r189ybcflivt4jm3lknw1cgjdyvwepg1kbbq679z6c8a772yfc2yv39acidijj8p2m1wlcz3azg2w4cr1w7iixbtl43mpqvka35f77hafjfdpcfbky576i3v59avm7e0pzj6zk4el888q0pvn9bmktjckbha',
                iflowName: '41pxdv3vsrpssqve3q3chnghz8y7jpro1dw5moki1suom847dfg3v1huzo9e0o9bkvgvk0msc0t577neola66osp661px70lxflfgsz8hb5e6myzkyei0ul9r3xbe0715v673ofi8fcok6pny9cnkso7tavuj5tx',
                responsibleUserAccount: 'nlmiq5kbw6jszhrq2vto',
                lastChangeUserAccount: 'czefpaygy3gl2u8f3gvk',
                lastChangedAt: '2020-07-29 08:01:15',
                folderPath: 'r5wbhd4bma90j5bpm6hfb202jk1wsrruk3etlr2tqe3q7uckqkfn3z82kz909nuca1xf2262kauhkra0yl5kvj8bq6rmwc21siacdnmmum89b5ve0022jm60ykxktf667fq1kff0wo5qg8cerb66vrplz66pd3q3xf4szzgr9cthzbotslfse6le8q35q5pjy88t8bh9ubhzq5qng8n6n9ed26o4xttma4r4stndfrub7j4s298yz6xtmc6a13w',
                description: 'uv5m78wt3pwawpp6j2yjbw6ki917e77vynhj72c62gyvnoy1mveyqw2br9qgyi4o0o0t8inbx40uci277zti6n70kvneez1ruktau8nlwx1ryf58wxo0z3xm9rw62h460ydoas6t8qoigkkpbbordk5wgs59rz0ilmvty9tmne05sefawhyeycr327akch8pp42yqvlvv7nw0jkaeyeo97uy1oi5vzeww5bfmzdroo9z2ndyowvqh8hyyoryd02',
                application: '4le4c2taxyy539cn8rv0qe8zr2w1wqk6kt65iq2l81ig9jxa21wccfhyzub9',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'x2uupf3lk1uxyq0agrelihckwut7rpea64wfqdhh',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '805sq549uimd1m4ag7zirjzvvomz6msi5eygxorlvz38no9ep0',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'jbupppaj08pb24yhga00',
                version: 'i4vpg2q3o12wfj0m0quw',
                scenario: 'bv03fhb13q162yt76i5uszz06oevhbjbdjnxebfe4w5rup1et8uvj20p3b5w',
                party: 'moz75wg64h9tua3zjafjhb1au5atpufnapyfsmlf0xvobnr7axpnuyt9llpt4f93l5z89kfszld6zxyjwxkgtwforyzx3o4rd5ktamp2v02jjf6f2fgsbujyj9fg3p32ksf5007khb3afdrsdvfd2cqewkm3q190',
                component: '5hdx86p3mndhcbsa1oc2871w1imy0ttapf2un8rfg9misbr32qwvscxq04efaxp487osrylgl0sm6xeau40bfhfmr5bo9nt03ri0fri35ap5r136nvatsm3zjd15d96w0xk8ide62d1xwiwkgp8768au0bvi8fhd',
                interfaceName: 'ythlvl2wjkvqb71ltk894tmyfulrk60dg8hmewpqwd0gk190pawdtfsrjsw3t7kh1upmfyq7c6qwssyb5gacql97w2oshdbg3upjehwy1nxth824wpz30zqlcagushcvdrdt1yroxgxq885yhu2yughdt33vfgyn',
                interfaceNamespace: 'fa39h7oytos32ltbofjs7bdnygezyju6blm6m2nm3fzsot52k47vkn7annhpwfh9xwdsumqwm265ewkcdt1zwwezuwldstvch49t667l9x8i1sh8uak7wp3e6dg1e0laloe7zosamwvj0mvxixdszhxvun1t500u',
                iflowName: '6wq3bq91zyn8lpwsdqnq3jpr27mvfje5xso21unyrthlr1nqrqrj2ew9hli3zrepa2qj8v12wg9odktahlu4i2c1ttmlwocxaumr6gsxxrrwr5k4xqbw6shxct54xdgpcezig41xzwevjekycg1470txl8xnjcxw',
                responsibleUserAccount: 'wb6vw62xf5ff5v7df8o0',
                lastChangeUserAccount: 'c7wbla4r3r1vnfyomkwk',
                lastChangedAt: '2020-07-28 18:53:46',
                folderPath: '6j6w0awv6ibet940vfvsxf5uf4ipyoe0ft3kpfpwcgjwoicmhjgdl78l2bmz3bo3dq7gbd0n5qs7nb3ew2jvh7jlcvivjgulmepikug45ff4l0r3mdc9x6aiqjoj221tzo8m0cxfay2d44ug8ag1qeinqlfj4f406zwcdj862axigj1rqkgu4hd0wydkc5jen9yvrgo67qu1c2r6878b78eqqhe7b7mbr5onpts4v8blcr10oa11ibaqgx85624',
                description: 'wzgz31v2bxqsxhyy20ocotzse0kknmzu071k7vrhfb7xcg1yfd0buz2oj4jt7jo7oqp9r4d4hjunha4nwkzudttgnfeqzlycivcztkembvx20rtpelbxeuwn2iegn26yzfx845jlho6zr3irj5woto9o2os6iobb6l9g1wh4pw98n7b0oqq2tvff4na63n92df730dnn33la86egezfwmo4p47veuncjn3zyojwjs4gg2wdejqq2bonl21f5qre',
                application: 'zxm89y0pe369n3v37icgrae76ndy9zn214grxyzaugcn6bilw9e8ohlsx1jj',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'hlwsiyd57jj117k9x4puf2qxs5g0tefb64nrzwv8',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'btxg09lxql5y3m38d61kk3ix3utz0jb4fv67fkxkb22lety360',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'jt3xodmaevjh856s54mm',
                version: '7hbbv09vg8o5la8wdtho',
                scenario: 'g713j37obi69dfqstiimav4vnu9m3eitesunbuvhfi6ts9g6hrqxogg6lmy1',
                party: 'r71aan0niyg6tev90ifvck7279a21u628snku3ty11uii397qp82cyf633v9kkzb3pvmz6vcadzifzdyv4b3mcr15x1872hwat75rhx9mi2yrxly7iur64gytmqc6r8gxj3p8bgnerfvxlsn2o6d19hqkjfemre1',
                component: 'oamgw3g7urxlihk77dq19pu0ifsqu7ur7oehd03whhh4lt69t7j33rp0rc3nafbboqbpcl68s8rqz9ak2q5xsurnszsm9olrquivmplhrwzzv7zl8azyz3ialmj841zowcj0l1dvm7kq7oo4ng2ogccnrt3vunet',
                interfaceName: 'nnf7aa3nf8q21rx4uwzvexqk0fq3oy78j42cdh3khy281cpwc82pturd798236p3ykrvzchd801ymo5ujf2umimw5qxi3jeka3hpa7mgd35y5f8b65ibrtqlv21fh7puamhnnfedacj3lhvdxm9xnq5im6vmqr4a',
                interfaceNamespace: '8pgwhdc86aijbe2m5alpb7yeu3m272l97kr8iv3w2p5f1cas737x3e741j5l10vcub9b4bbh8glqxatoxt3c23ecu50cgpiqtikmijz2s2jqa0x35ze0lkj1o0zy1lje2f8ihouyh6k1ydi97hcvbquvnegbgquu',
                iflowName: 'cv0tf6qwn39jag9uyhv95fixlc8alf9bao322afahafp5wc8ii2gi0y8i7wbe4tsc4qdblz9lelsmrg7ftsxt4cp1i9wzdv0jcpvo43n2wnlq9dkkw2qiewboq2sbn8zovhhz0ros2bxu20lm863b2u5tv1s5wfd',
                responsibleUserAccount: '7sxs6vo5cmmosq0v2z24',
                lastChangeUserAccount: 'vda8ghij5t1hi75rdacj',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'bpv8s986u9sw64ozorpipj8tis9ipebe5kpuzjuybb5gn7s4sp87ajuj314zowwh9lgwxyxn6ao9l3z1q9p0l8u9cj3k5cw2sm8j7qsor8ibrg6wa8uyf6x1es88w4x80zq2mpd6vk63wp9gec56rqj6pqwuxt6ffp006t0gtqif9q7i2zo040fhni7b3xbjcby22lmsz50ne8j1w25712ikchx2sq1yriw3cm2tx77g0fw3w6evn098bnou0tt',
                description: '0rz5ga4undo84gmlomxmtyxybi1vsx84n0lqscauyqs2u9nwvsn5as6rlcupspy14spxstxkn0rrjnwigrky44jgmqy0hll66cqtcfsv3x185jp8j127y47ge09h5oaokr6t1ifln4ahc0a01uaue5bmibmfsvnd70o19kn49irvymjo68ku0u8iil9kdijkf0joks2d8f9xlf6ox1pn8zcf1ew1d2n1epysdum50ab6e50fil22vif6ose809u',
                application: '9b5ve40nrtal1x2kc81u94fwmwd1ct991554k82nsd8m0evulnhsjs6y8whv',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'c3ao3yayr9qy9z84uhu8nq33xos5eyhgx1j7aeq5',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: '5dz38pa03ax796oadiijblv1nwmco7d3qunrgmrwliq1xvbuw2',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'h7szc9oov12mb9fopnuc',
                version: 'tvpxh2uo2b3jpronefmx',
                scenario: '9legy6oi9vnz87en5zo3rxc2wq9rzcpyvj9d591u5c6kjbnhm3dmpbdigr1w',
                party: 'w1gvxj8g5a6xlhgahlolg1d5ilw9lvdv64ihkz5j6nscuqhr0gwun2ekt1j07nzdmx9z08lp7fcrbgxf6vr84o2ksbit0frwytorak0w4vim93xdsvl2f7eyd6wv9xkqna0i1ya7xw9jw72xi22m5hzsnw11ntti',
                component: 're4117y502w3hmlbz5f14hoixcyw9zfu1d182f9fudh7uvczf776fqck1nn4vg0jtlo0tkzufdy97objp7yug4mdbmv71gbf3ubd16n01cjbobkyuufhnvydyw5astfmtdhyoajqlvmva8rp1ox1di2uu6pwl9m1',
                interfaceName: '0o7edtivy6dnvu7jyd0gmvqozbvjjtvgmgk1tbpguix810sbxpobmhnbqrd00um9444i7bpm9mzzu57inj1sz7pesvye7yninnpi5vi33wpsbxzo5tqvxs4jppt4i6u2hkzb3leuzjte568dur4yr7przy38tp0a',
                interfaceNamespace: 's9t8593m9dilj5zwrxvjewqaxplf7ticdrshi14fhgc2uawc9ljgl6uinsrrvctsb75aeedix95e8206lqg1xv0ukvuu2pvlzs0gndj6srldvu4okip0mhfg0zt2wesuxc2nmh9b1ld2jsehmp46mronbkzd73lf',
                iflowName: '3scrialc53t5c02i0asafzn0093syc2kbc027pxy9zlkl1p96mlll52odifuj53l8mjrsxiigral73sxnune5qzl13itu8bulrh7yqo88hzou33f04cjuozyz6isflleqh7rurfxjrcoh3gink3by93r59d3ewfx',
                responsibleUserAccount: '9olfs0he240bowrcdanc',
                lastChangeUserAccount: '6niw0trcoi51rouebcrj',
                lastChangedAt: '2020-07-29 09:12:49',
                folderPath: 'nzww6w7m1wmjyo0isdpseb6whgeklwf918ax4uhrrtwvwpdle54qgqs0n3xegyb31t6dclt1xqvzqnqfz2seq3nggogy9x041eh4at68i5mjh6jdlu2eoluv671sfq01nsbvaqg2e0pgv416m7kb4uoqnkqbtebv8l7tob2mnbv41kzoj0otg9645yf9b535hj0k00fmwlqz4a2d53fsaq0r7br4h1trwhic9adzoyn5agfxra3o337qmu1fklk',
                description: 'opqr7drzuiollux9wkpujo5axmwofl8yj8nntdaac7pkf10j4otijg1cs6do7acerfhi3nt3opaov1hieyckn6ihvb6fsc13qv1cshvay4dzt29wale38c6od07gkaf1yt4z72zjttvh5vfz1ppftmhrbiiznbj75wl9yki1lmnci1swanlvhlxwwr394305thbzerpku3cinkblylcn580nnu699s9gpeqqzitkdqe7a0vzv71rh8h08u1ckw5',
                application: 'knd2hkazfk3g3ldr0byx9trexbx8uu2jk7mcoyhgq50df6jq198sfbfgbv8b',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
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
                        value   : 'dca73653-5f25-4652-b032-04a805aaaa71'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'dca73653-5f25-4652-b032-04a805aaaa71'));
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
            .get('/bplus-it-sappi/flow/dca73653-5f25-4652-b032-04a805aaaa71')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dca73653-5f25-4652-b032-04a805aaaa71'));
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
                
                id: 'c3c28c48-a078-4061-bf16-9295be83f7f4',
                hash: 'm4o2hvu9u53ajw81q19che7tt8ipfesmf369prdt',
                tenantId: 'bd288051-e4b9-476d-bf00-ae343336d234',
                tenantCode: 'ewi6b3pxw3w1st8btpmkq77h40fa8d2sflb0j5581ziwao3nre',
                systemId: '2f19d292-fd6a-4378-acd8-bb3fb7e08a89',
                systemName: 'qlmhanzfr7akh7m26zke',
                version: '5ba5ssejl10ov4bgcer1',
                scenario: 'wt2pkoqrqczlzaamk6eu5d4q0utdv7wm2rz8yyea3l3lmaauktt4hexzoswf',
                party: 'p4nm6l99ih6p9cpc2ts07i9szb7vjvsbma8odk6mexdbwp7wzywvffbfmwp5mtq9lqoazupj1xo40rpx13bcx7mtzltmi29ivt175rielg0196kr7o5lenqldoj7lvj75y92ec823twjm2cjbbscoz727urz7ctz',
                component: '2tatmmh4s5d1zhfi7wavoc0wlph8n1hl0uc1pr8kvkhqudef4y826haln0pebnwrwfeh5nub5mbkj8pu61tizeiyhym39q2ox7umpjprfo1g6jo07jb09nab9lystxr2ncd27xu0voklsuuomn3jrqym1dcl7cnd',
                interfaceName: 'hcizqofx8uy1dqm7qrk80v64mcgyi38r4l35z965khdrex0j00bsuf2yimpw8oljlwthpf25uf7sltdvidmqz3dd18yqjjv4e4e6hdhvwtpf6052pmfm7virqcr33in4tfhbmg0wyh6iseqngaqs45g0v6dfrabp',
                interfaceNamespace: 'tr7lmqqy166r43uxfn2j7mvy4gur4k5l8fzzpn1l0bjyzvipmivlidr81753j9rspgdskz3rc2tqgdjf3q1orapb0kb3v4tbrc15y0m01sam6u4ufqyis0dq1jijlhn7ikj2zmx3ws0tcd6oxva1xevjt6x038zf',
                iflowName: '15vzaf71yll859taezn2ojjg6pi2iarg2p7xwsvl99nzltwb9qtuxbd0ifgx6pv19kj8vyeyi8l35d2g3y77dhkigqt2ttdd59e7vtx7xjyz3vk2rmbvfb27io6qsn09vb1eddw6xlcjz5l2282wmx8fbbqj8ro3',
                responsibleUserAccount: '953iqdx9lfbkfryz9f36',
                lastChangeUserAccount: 'jyjqdnjj1ulyid4uoqx2',
                lastChangedAt: '2020-07-28 16:33:21',
                folderPath: 'qntb90lnabt8k15rskss3wo1wl90r2l0k3ps5hq44ozi7mlslfklqs1ezodbth5ywweereprp4zbh9u92rr2j0z4wonnqejs6a52sfdu7knbhkghu7k09ai0l9djkrmwkgmxw6isj8c68ph16a176gekdqc7snic3jb3ioq5r1g9aimcqtrvsnufcfb4tkfak9jd91jov8hhg00fp2wgoxjpgxub4bfes7uxqfeomuf1s9ffpdq89idsfdq77zv',
                description: '9n6nb4hgeozxciwat0resuotxhlko6ijz2g4f7hjcwn5u4akot9orj0ey7cbvu4nwmjigu9h6edfhx637fietp360nif6kbq1six554nlu4xh9udkhf29me7xxii8710o24y1bupzcjdx4x8bhgds7a6bg6yqahubqzbaywqk79td5zcfp6c011ds5c7utd9cudj9yk2bvvljpciqnvk76ezgkc65drglepi5rfp9st8hxjhbjc9z5poj69545j',
                application: 'exd067ihhh3fz4b2hzz5kmt4vdmr6c6s72286e16xba1y2nnumbqlyyliv5z',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '553855bd-2517-4a47-892f-e7412f3c69f8',
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
                
                id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                hash: 'fablcqclhadpv0g0flxu0tpnb7uho7g6m8wyybri',
                tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                tenantCode: 'z8724l1kg4r5r6ws8a44hhtyssa4emud3swb8r17wn3az7d1vc',
                systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                systemName: 'w8jov8ycnu2e9krb5eoz',
                version: 'lil3jxj2wyixol94qh57',
                scenario: 'culiropxmxc1ojthn26t8lua1vuomeksnol9v7yvw0vi27gigjl5x9wo8pig',
                party: '3zcm84l0b06ftfjc982rfrt33yjsy4ar625zidpt1ro5x58aeol480th4vsvfhdqen4aiomi1t7p79rrv89li159j88q4it6jbktgmemdlk7556tmjs2rine6l9mjutut5uoc29umvsclv1m8psrnfblc0rfx3ap',
                component: 'r9zzfppx91jgvmele32awm1i2v33iu4d7aer01d0dq6ar5tfc2hshmpx28e45go3b4uual3zj0dkeue3ly8bv7cm8uzwocy83z9x6gkph31kr2hiyy1w95j8y0mmk4cljk4ensr658ozai2uo0mh8x14hfl368yg',
                interfaceName: '22iieu8y36pmfl18asaoipatapzr92nsl82r89x21zu6qwn2nn0aj8uuuctyhpudy2izybjt50buwmsoxiyn1nmc7s43i9fsqhe0ynvlkvdcedh3yc940mvcel6jfxpfgwvn84eb4k8sp56qgsy5ockk55g7rx4u',
                interfaceNamespace: '54urxfp32btfz7gte9g2zb7xvxxj57s6j8pbbpur8hlvsaltg0s0ao2rmfd6jen3fsjwfxjscmszvv413kgpphllizoqb1vhfsku89wpl7f8lru6vnrs6z04hjefsdmtg9dmada5qwslenktqmxywtp96tfljj2t',
                iflowName: 'z4dv37e5j9pw8mr98j9f4chebn7nc1offtd8eekkj5rhtl2creemxkqbbqym9i42budqxui9pc9nhfmzw172cqfarqxhiod78mrdjavsmptpqopfcix0o0zgq6bz7gq9rp1e2eooxflq3v93g9vxh55j2wg9rvbc',
                responsibleUserAccount: 'vpcqd26kgkid9379fd3h',
                lastChangeUserAccount: '66hggwg4xvn6ftoact80',
                lastChangedAt: '2020-07-29 11:02:01',
                folderPath: '50qosjed453fwen4cy0xq5hi7iptvcooax3fec28nyc4lpawv5qs6z21p39uuvd88isri26qhvjxo2fo88aexpg2mvqy4vle4xmjr7mdlm4c5bauusxsocvymlptlewr00tlslbgwmjj1ym8xz092zgnlo1mav42d0p6ec3od4os1bjwofz22muxaqr8sxh15d3wko2m546bse1hnk1m9jscatszcspbk1h3a623xxk7r6d2pe0zoh53k3u8j7v',
                description: 'o3norkv2o0uj5p64lkojje307gzsbrq01r4bpewyqmvhmmtnrxw4nx93goopih8ucxtdamwyt7m06z2mc7o3szbceflh7shadjoye6qvnb27uqydekacz77rpkdyg5r18w0t17ec8wmo7pkibp9yrd1ccy1voh0yco2l4f2gk908w6nnpjme3jnfjdcouaktt7112egfvjub44o11i43q2p0jehfnp5a2ud1gav6k5ftku5cw7xzj7z7adrk1a7',
                application: '8wf8bqfgfq6bywtneoqy4exzln77s30s8xjdfaikxv3o3wagy2qx74dkrq8s',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dca73653-5f25-4652-b032-04a805aaaa71'));
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
            .delete('/bplus-it-sappi/flow/dca73653-5f25-4652-b032-04a805aaaa71')
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
                        id: '876d8eb9-d642-4174-84b4-f4824ea35885',
                        hash: '9b4utw1bd2sl1zltpv5r16li8k4hgdqecamzf6we',
                        tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                        tenantCode: 'z5qv4cu10y1mjd1zg5xt0ce92xgfagqdew7p80gpliwsi4ot0y',
                        systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                        systemName: 'f8el2wq0t5pn1y1wx1gs',
                        version: '0471z91jyldtd6lfhhxb',
                        scenario: 'zo9qo2e9azw4xcqm98ng41ckj7i0nnocqdczhun2j294f8q3kr5hrigwlix4',
                        party: 'khcp5g1rj5g0ywjjhdavgi1gw23n0gjspldlk3v6dxk87y8xnjbs0c0amlcugt82x548hgpmv13jyjq3wf50j49htost65lw2c04nt0wtjdp62izue152rxj3wyv8ethqsjoxmm8iomiskl4v9viff7q39n0v0a6',
                        component: 'vvcih5t15y9mki77l75lgjn93u9f7f5m9znlwz4hzpwiwhqeth2n7hvt9u95vzf4ivk8qgkqfo4s64bs36f6thpwcqu8w26eevm3cm2uv3ugecqts6lvlb77rytp8cjg0wzaahg6s1z9kevivjucna8k15lnz6co',
                        interfaceName: 'kd2k3gq98mueb78de50rmr40hht5nfo676xgazp351e2oayuay26x0rbaufjpqq42ecnz824b3qvcqv6gw2dazwq84qmzhpcz8f42as9farpl3n2xux12tlqy79cb2ib82n55o8d36dzg9u4gffyvtqzxx4m1w89',
                        interfaceNamespace: '5rb2gyv3u1o7t1svq7oz73fxagbpgdzrc06cojdqatvzyts32y7bqxigg5eha06znwy61htui68x101havwn4pwkthhnwmd4tjfjmdipl6xj9al56xd7156mvf7x4b0idnn3akc00m9ter7u9xjyim2hsc1dkr2j',
                        iflowName: 'sy5dwvdrg4bwkkis6qam78k3ar1x8b29gu0h77rptu075fja8f0z8qi2mo69t5wj7lmb4oq8fbxgq3qvexhtk1jkrz1dr5am1ud33xo5tauybuwip7podxdj6nbosnjjrr9vx4xmy8t43qcbqi7b13vy3eyyydjs',
                        responsibleUserAccount: 'jc95s59up1gx27tz0d4l',
                        lastChangeUserAccount: '0h9yu0a9m3mkdz6xea4x',
                        lastChangedAt: '2020-07-28 22:34:45',
                        folderPath: 'qlzvuvgqq8343ymr67m7fo7twbc7h2yu4f271xz3xc33xv1k1ircfwm18v90qaibtljwkznnwwtw41ms8yltlgoyrj25gj6sxngyfdeazwmk1sqcr5b3f0wu8w2o2haunhwoyxsctyg2elk9gg4jbxgkqt57m7u95b18qa8xsqo4zf86eqckie95b9061n8sc8r750zvydjd4dqcp4fh52losbzpeiqs51ufmu68o1l0ki4p8kml29gjfiirw53',
                        description: '73cl9rinef2x7cu8325k12k574k74ywzvnye70yfzf88rby58ch6yfiga1qfdschrvhwd7h71mhgo7d1ocj3m23or4stqziel3p168atr94q0fs29bow1lneoxximl22pztbghvvs58fet6ditgawicp6w7dzxwwdv0ssf4ilb50jtr0p4zgtg826efnmqrhcyzy6r7ce1kgyns2s0ux97ohzhdh5ofbd2vtpomjio0onhjljmq01mwblhacqfg',
                        application: 'l14v222a2ke1era22csj1bixwuop3cdva2hiwf9cq5su04cufnjbox5r1p8q',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '876d8eb9-d642-4174-84b4-f4824ea35885');
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
                            value   : 'dca73653-5f25-4652-b032-04a805aaaa71'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('dca73653-5f25-4652-b032-04a805aaaa71');
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
                    id: 'dca73653-5f25-4652-b032-04a805aaaa71'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('dca73653-5f25-4652-b032-04a805aaaa71');
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
                        
                        id: '6ad26b6a-e6fa-4746-b326-620fb7a92655',
                        hash: 'jm7mwn0tix9nxgxa34xybviglqqp6ztwvavyq1y2',
                        tenantId: '745f21a1-55a9-4515-b996-5a91188f29a4',
                        tenantCode: 'll1w2sq9tqexeyfm52h5881s8zaly2cyplv599qo0s3tybprxo',
                        systemId: '1aa93eb4-5c12-46a8-8394-7183d144fcfc',
                        systemName: '1i1siyhctr6khikzj6kb',
                        version: '92yjcxsi4d3enfqcl8tw',
                        scenario: '93n4hrteoz6qgbgvtgd5xtdrxnb27vxnh2kwia56rympacpopcr6glfftqbs',
                        party: '6bbzimbkpyfzqkrry1fzf1q7g0c574jv72ja16kl2htdfp3gnxw4fgsl5u7l8kdn31tpcseynsq011nvr49nfv7rg6fyylbr8jdrb1w2xbibp882fzxzok9n6jzz1z2dws5f9koan9wmbonntkajsfawwn0q4zil',
                        component: '9k2yn0kmx4xgmrpp23n4u99i6rxf0v8es8t18hharl4y1eu21ioru5zd9k7bvxc5rsiiqkah740tix2ylxw7buuy4hgxz537uapr43r3j43kovm7t1xf8lbh5p7qv45ekilkwblrj37e4u5rl7tujuw6e23k7kp7',
                        interfaceName: '3z0oz8k9on6fvf5i5bn85i1o2nt4srbzdh4btogvs8bwtgxb1cps2k0jw2066dho95p4t68uhl1vec6ggv8b6yud00k95g973vyzeabfvvj6e6b40sou2o9pl1orsbrh1clv240usk1oznb9lfllzt1s5li51p7w',
                        interfaceNamespace: '9h3qcr1jl6vgfy6fj82fstfosglxzad8gbgeb3vpl2r13cdjyx1xn26h37jrha92aru12e0lorvqu5q333m5q42r5t83qqd8q6edpy876lg32ietnd0r458axz05a1oq86cghrka206ipg3049qrbz1j16j7oxdm',
                        iflowName: 'jgnnk3yfyvh0uhhy38oumzq8xivt4rl153lsv5wjw2d0wrkbw4ymybo3yrwmj973mkt7dyolzzr4j5aynw2r4z6xt0v8e12mchw8nsmcb9fy6ujvggkj3orgugy9tdanmwxh42zfqug6vc1gayhu6jtm3jn0whm9',
                        responsibleUserAccount: '7jokdylpm4dpwk8mxum4',
                        lastChangeUserAccount: 'wu3ivyjnh4qwlxkyb9tz',
                        lastChangedAt: '2020-07-29 03:42:44',
                        folderPath: 'd4mspt4zryusago0aq5mctkc8e9lz9ibzy9nrrbug4cp7a3obvx9tteam4j5dhr996w00pq2y1lhwkbexaxueqzq3hwlks4oo6km5yjtu5jfonokwe4ybchld9v01gab1fbir7pn3ckjz0q4x8px47ww07505qoekk067gpp8i95lfg7u1ctwe5ffq2rgmfqvt30ltm8vk7uv48jmwmu6vgdbhc1i7b8e051fz0qlglexzzf94b1dirzanww16d',
                        description: 'e9xkwgqdx6sebaz4qo66wdh5e7vosaftrh1yrn3qj1x70lo3q7liz767d3ebvxqw9mpcbcnen63wntskt3h11kwwsd5cfp2qb7y7s0r2zjb412s33fpvyty44s85c4t3babxhdrzhqf6m0zwt0fj1qwbx2jxs5wr91xvz8jj6rw2zzfxnxn6se0hydpmtadbbn8ffcor56kmhlktslca2tyn3azv9rl1yfp9gl2mfvnfsqh1hn9ttmz8795j2hb',
                        application: 'rmohqki457ujxxw5m1yilmimt2w35gl3fu70t011ued31wst2sjnsop641p7',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '57fb33d1-694d-4d12-9651-39027142f667',
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
                        
                        id: 'dca73653-5f25-4652-b032-04a805aaaa71',
                        hash: 'ei1wu3wejkigygv84g44k39x95sgjm7pkv8e3i00',
                        tenantId: '805fbff4-17b6-4b1e-89ba-15bd0330d86e',
                        tenantCode: '4s2yvrpx8lwe4rwjdszye1uxxmx9f55vyc9t3e3y1km9qs782w',
                        systemId: 'c729ce28-3b1b-4572-b781-ef38c7e06766',
                        systemName: 'o6j8r8yvcsueu1sah46t',
                        version: '6jf14ku1zzopjfvkk4kc',
                        scenario: '2kx7d1xba1tymatpuhfrl1231emvtrzgcp3sehkssqcpe09gmx4wy7wfqjd1',
                        party: '803hng009b0znyt2a6724fg2nqqaxxerw0urzc1ayqowxxgf30oiq2m0by233isekw3vee6jjppdbngddqbnu2qlp3hqctosfhephi2q81uc45hbt8x1e18ew2elmwfs9f8cvr21022s0enirf7y51idtbgmyqwj',
                        component: '1psnpq6rk87hkdk3p02b4uw5v33edy5nu3w7egcfzpqtp048u0jtjnwadx92jn78mcyl8r7ipj5zkwym3569dpqpo8zghsox3xoxq3lu2pzidbxfofmcknaz8cxgz9lm9yiyfx9xvrrz40jdfvj6e8qo8iimj0wi',
                        interfaceName: 'e0v9sls7kqaq11y3j87b0u2xpyxvm7s7yh5cy738d6hswlsfw2tejgdegrue51v0zye0lzlmsukfdbi5ztve9bkap4mo8c1kz7jsj1i615gwuqm6dehb7us6d96a37uxxe10rhulwy006pciogoyk6xomjz515ov',
                        interfaceNamespace: '8qmoj8cj3kl2vzafe3nzbwuim87pufrzatk7tctca53ycbeak2kfya9gyjahksprqftzyxq0raqluers5duatdbhowbx6s5gr2tlvf0bd43u0s91t2z98t424cy806ij56qgs20qftjc8l73vi9yiuy8jztb3y4f',
                        iflowName: '608gm8askrnnj4fj3u0hevvdxzr4onnus8dfl318rb8ddvu9bf3ajs3jtzdew6ssll08oo4ckb59tohsrhqcx2tnmzu1tl96kuijvsh6o3j74mqcbj7n9a1fwbjxqyyhs5111g3wen1sf2t8k7e2yb5s3987it08',
                        responsibleUserAccount: 'x6jy4ifk1tncwweb41bj',
                        lastChangeUserAccount: 'x6xozz8woh9rfycymcho',
                        lastChangedAt: '2020-07-28 20:19:00',
                        folderPath: 'e5hgqmf06bpoq4wyvolxdin7hz7vah4jm2bruuayr15ef4bpak1tvv4t4ya4woaetverfavy73vf8qbyobva60vth45hnwexl77fbffi7iq99g1z5rjm520dc2o7o7hmlwn3u79e4xoj1a3hgv96vobt1sdcjxkf3h3vzqj5au8c7ulr81ikc5axvkok3i8bewe8k01w438da96jiw9042befzkcio4wo6aqtb8pqqk5oiqgknjmcyb06qdr68w',
                        description: '89qp2ofqdbz5d4hrdwu25g5togn6r6whzdl14wgcnqd0mq47o7c03mazv5bovsyvltjskc7uv05ydf52uys8i838frsc4we6xz2pghbnwjy7t8kk0psxl1aztyfxldaufxryvu4gvmhwem5jqg7yljdbhk2ypl48jjjic28gbote344v6ujvxq51lpb52jp97m37i46d3e7gwdo5h6v5w677sat9qwgzkqmwy3f0s4k1k6px48e7teyziva2rbb',
                        application: 'c3yu2v37rvv2phe6zr2hkckwois294zn1ckchojpaohofoy1qamyzlh0bx3p',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '913dc527-b649-4dfc-a892-98142524b324',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('dca73653-5f25-4652-b032-04a805aaaa71');
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
                    id: 'dca73653-5f25-4652-b032-04a805aaaa71'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('dca73653-5f25-4652-b032-04a805aaaa71');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});