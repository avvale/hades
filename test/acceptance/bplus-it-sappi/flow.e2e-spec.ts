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
                hash: '16jrjmimjdpgxv5p5xzvg8k3yg15t56jav30iqvx',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: '65oncrpbnjj6muet35ypzzfamj2qtmza915zt72p6003qyd833',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'nbktwe3qkevo8ei47hzo',
                version: 'q1m3ejj0zftahcnm5tp8',
                scenario: 'hb0hqiz816o236p4s9tpjosobyphamnhy8m6p9y15scghh1k4hfeltqnvv1m',
                party: 'mquk2yvzutmrdgbqcdng0ycz6y3r0xl7fchd4sexhja0dyt0hn7z8ftgw825t2lri8bj0fvg81i4lb3pezo500iljhgc1tuzm1h889k0i69or36a204p6hx5pr4cy0avyw35p3t49vsqhcmnictv0foeuensz7ss',
                component: '878krzu5xzbl8cwqeq77n0hmptjdom2suhnii9ds1e1jddbtohqffhnmi0sejzwgmlwhyoqvwl8m1mm4rm5v5nl4zr2a6bjid3s2x5rtgz1cwdql6h1ik7yymop6mqqbhvki8xmgttjv4339p4hjua7qq8funys1',
                interfaceName: '521jrfyyvxr54nw7g0rpl9tls2dx84yw06mwjhyyab5eok16me5d4o7kvh862lms6xc5af4vkichc9gpxb0e2fzujgcxlj1pqf8eskx683b06xcu5b2thp19lusulv2lb21v1almmejhd6axwi0g1vko0e5zproj',
                interfaceNamespace: 'iulvcj3zxe4obt5c8pu5rpxisl6044e018u2jzzcq3cvxml7cwjrd5stz41jym2x0d8hngkarwwuvjq5rupw8ufv72u4yqjumo4q5tokkl02gj5960kh5ks9ln437o11fsqte8xv8kfgripcj40ee2v51wv4p77d',
                iflowName: 'xbhk0wh4ornmou9hlqyh1yfw64fnbmvfs1isqk3yfh483w71l1g8yrng8ydamgd78476ronsi706e58fyeu9b597qsuxo300w99v1hnz3bisscvrxy6jsdbbftcktbzfjhxn6g6txlizf47z7gats1a3918xayl7',
                responsibleUserAccount: '0awz9t9vh6d90ocfberb',
                lastChangeUserAccount: '7wvexyvc0o1sicqhlziv',
                lastChangedAt: '2020-08-03 19:35:31',
                folderPath: '8gfgxktgt2p6b9ejpi5xxl4h5xd8tq2d64gifzlliehyukpgc4j8kx1fftf25e3atoyunpca1h6bq95k9swtraoc6bd9l4q3jnp0cbya8zbm3plkzapo9q310xoks2r6j7uhbzam0y9o5jgpu0tchnon1bvpbyzjc1i4qkl6e3agk3elg1d7lvhks04ae95fxbrx3oob2jedkevmnopfd28d4vo72y3lmynjzcfcwvnff6ffwt9nxytja26hjli',
                description: 'zvqyvtii9zgaeuqws7nuvyp9i21o93x4xqi39bx69hg3vfiq2t6iwknd78ofiygr06t35ptcyofm9deofttihf58wtv72ylmr23ltt30akeh0urk2t7nuqvle5z0e0mqrioes8bvk5v2n3tvmthw30lvi0qx9dkv3zeunyx0t4c7rpterbtwgc63dxlmg4wpux9hsa6clrlgeeevf8q0kzwrzfpt7032jur6rfz637pr2aok9ahl5eabuwiumar',
                application: 'l894syjjef3v60qhmsefhbor53nbx1rag32872mnkwnhyqi3koe418t5g5q2',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                
                hash: 'nf0i7l200k49346h85t2mqj88jid063138b23h6r',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'l5x7z2kyhvgmhzf7fu6inoz4vpeea80sn4cl54st7tjzg4e0pc',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'kupw6cccraecwte6bbcu',
                version: 'eo9xb34u4cvcs6w02xzc',
                scenario: 'kef17oxca2ao7zbedesqkm8c9kwgttp7d04chvftrr3nal3q3icaoqav033e',
                party: 'zo632joytalr0pn0u7ydjwr9wtjtilt8lwh1hyi1nvchcfon0xbvb1o88aa0pqq2jwvoz8o4d2ybdh3axlfw80doc0uslbrruj89r6ncbmao25l4ydubh5lt1n2py2kiprhogvd9kbwumxl49w4ii2d9yelatuxf',
                component: '5covuephwc0ob9bn5vuxzz65er068ukgynl7agodqkcqgmj257wzf1fsfi9wu5jn4hf6k135nnwhspwfeax04jn6scd61dnby91s270fu38luwetp60mumsd8ljo67cc5by7lawme7qnxehk60dmf8yba8kcx16j',
                interfaceName: 'xoh6ft23vfgisgr42ekjplfrk8kgbn2ayzszh9dd1xe1ej99kqtrznbzepu1xha7mygpt21fx72gxo9l2qr1mv3brxjlzmctz8bpge5wg98xdcp2uwnejny9f8hn21ij70p2hurhjawr0k7ewjyp51xj2iq45u40',
                interfaceNamespace: 'fi3e0gx6qqy31m1hwpvzus4s5qx5adeko3i3i3e70wq1uxtanr3jjd849cjyhoagm9j4hqf9b85ksl60ct7hj7z3nrssk5qaq6skqxwl77kc2cx4ywumf21ucoao77do0bxbkenesmek9qlhp8gsduwnzhqac3bp',
                iflowName: 'xyvtf1cj9vm03uo2ykva8tz0oy4alxa23da4yloxflqgv1v97lg6kbxzv1l0tvwj7hhnytxeuyrtpqoxa8xxbxsaht2j5jazlba0cetro5f1x6e90uz6ltsm4f9rr4r6hol3ui6q4ac6t8kio5g4g65nmazacjxl',
                responsibleUserAccount: 'h0tr7amsi8pgi6gktwo4',
                lastChangeUserAccount: 'kv1u0i5wjyhikr8wb38i',
                lastChangedAt: '2020-08-04 07:03:40',
                folderPath: '77ecspb3865r2xuk561kca65fbzcsfh8hzjk4hvrga5hcuxssk2mwr3v1ikt3r9l2fa59l4id5zvui8a38zhm41n12uvyjhrw6yqdimfqxtaz4rgi94tqjll1x80qmqub4y2dtdrawc66pymormvbhqs0ru0mbhk4p60p4jzup02oavv7wszfk6yaktbmfo8ynnncxkn35s8x6xtkykoykse7p10ys3nmpi0n1bcwal322il6ohi16s98qx2hrm',
                description: '5d5y1cm1shvmldu0ztpi99er88slrfrewbk5sfyzqfm1fp483ilp8ha3w0032gknc7pbjs8bmkno8ca18m91fdvxmclnld2vahpq7srha2yxheb67mlfa2ajo6extmg5wc1rzitz8ox62cnmoxjue7mcp9apbojb7xdn4qumc4rdgoxcqmlep55qgcadshgbq8g8j2cdzmbf8s7l44zoiut6zoyyc11jgftiklpz194wo9d62lcpebzzuxg591k',
                application: 'ys9dpfckqbmrwgr5q74cx1fntqqmlj2910vvyvcfxoshrqk1u9b49jo3oc59',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: null,
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'nx2uund8ygamgns75igkjxim7y3403spleyi2o5igbnjl6blw4',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '404g87jj4anbxli8mwy3',
                version: 'z5q39u16x302tnsnp1yd',
                scenario: 'jh7jwqhjsuszquz86kofdnrhjtaak5fr5y7t145b0vmb63urev8mcg1si8cc',
                party: 'wyhmbx9j52zp9jzgy6lqwms46442gh232l1wy3tzndo7fpwstxdi9c6zmnxcelaeouf08u9wc5in2nfx8fl2xtg97acf09o7kcgoqe335a2no4o2i1siv93lv9eb141pcqhr79dm2okbct1x5zweg29zbhr9128d',
                component: '0bl2x3eth8vz2kmnc8o4mj9vh4avj0lcli3tai88rs0l0lyvmkl4xfanlr87oi50b3o70ms36kpuztsqlghqev81pjkrr6z7rt39181djwcafbo6h0q1oyhdphfaicz0lr7fkzycru80zzb1oyvmer9oi53ba3ke',
                interfaceName: 'eefru5deha2ipfh6ho4uvjbwdtec3rnexh7drfjof8nc7ltl57ejbs6mj26awwidmjjnj3aqzp58fx040b3oheohjmvfthqk0929sn4dwnixth3isbs0otlqxf8m3cwa1js5vom9k9ttvo4v4nqtfls6frnf9a1c',
                interfaceNamespace: '1md1pwhcef6lw3rmm207pwwrjmsxf199mur88vniuxq2wyiap3859zvn88u1f73pwq1h6uni07kzsi8u6ysrcz52o013gkei1845fkx4h53j5wr01ffw3bzfn2ul9kv8xjbk1xsnx5u4ijosa4okl0z0rzsidxr5',
                iflowName: '2rfigg0fdp66g587s4slwvh35dybf2tng4jsapmkigag4egw75rh4bk3ewypr9nwj5fehi7mxi94rnih40hdvswjtx6h26wr25jlvttzksftoo083hvf26c1gq94a95z9dohf9utsyid1vsufo3fb4758krvlkz5',
                responsibleUserAccount: 'nunupqgprmakaf0vovqo',
                lastChangeUserAccount: '03u22q32ppzqy7ee9sqp',
                lastChangedAt: '2020-08-03 16:36:38',
                folderPath: 'eeoslbz5ogi7kzsfbkxpqrdib6ninq3qm5brlbwrjmo7bvmzmjk4bqn3jzhnaqpzafwop8ljt87l2dnakkwrbwyfpb1y6ig6yp5n5otqe0cvs8gpq9rzuve5hi4h8ctjwahplh62qa6ka5o4datwl9amgldcmpyhwjesjdy9p00zex0je5a8qdt16cfpz15tdlhvb9y8ukh5oieawov4gjwg4efcvug17tb8pjlaadok1sthkas0phwcp6zlkm1',
                description: 'r4ds6z8ghj5zn8j4pioh04lc9dmxa9sde8fhzb3f45y2h5arxmhrylvo03hpyuzvp4lgi0qxnbd8bdojh2woz18bewqch4s9n5e1ax4x8thqxvdonv74h701vbqpa8owsetys97rllqqbwod76yiaalahmmhnmqjlz4txf5pzxqeudfbxlmw8y727zqkkz8s9ta1aagndoytylcx1t607asttvn4drn6njxky2yjqwz8vjzub81ji67ux26aw72',
                application: 'uhzatu5dj21i40augfna5dypf06pyc2evaxkov2vqq8i0arnzvhrsbmnzhza',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'dq8q2rcd2srhvtrnduglkrknbczp1zf8dmkluxg6dz0copjy08',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'fnmakeqr7dv1p00knhm8',
                version: 'wscz6i8nqafoaexll3jc',
                scenario: '7n4jnr3p5uaofnzfs9qn71dfgig0aea48f958e8kqlb7hm9al6g3zc9mfmss',
                party: '7fpdknve9sjakt1uu79spcagezcig37dvedtn4ai4yflcat66nc2blwlw0wxhpyibci2skjugzcnip8b9h0b0n0j96w73ujaeb3lzcyq5tk6gwnv1j6yy9au4vqebkp7jy6njk0ypre2nswfrhzs51d7altkc451',
                component: 'cpueihagw7wn3f9ouzhu06ofoeyoei6f0wr2pccvm7x1hnakvww5g28dxvco3b4wm5drpw77i6l21b63jdorrqkgamn4mfj6xz2b6w08zpp685q7jkhk90z3ltfmny1hmx7zw0mrd9x98zpsibyrpr51qbk5yb4r',
                interfaceName: '4mzmbn1u7qo2e8cca8zoh28f2sn4ipfaz8g1ysx1lnrwk8l1y839o0a2exhus6gv7cafcgwl6xeetqkfnjrcqig5wzuoclfhdjp3wew5st2nc7w00hgzlu6qv7if1xpyjqosyu4q2s4uiaygm0jjv1ev47oovb3e',
                interfaceNamespace: '2wqmw3439bc6equvw3dau9eqfb2cnhg1q5gi8h70tg4x7nzmt9idy0zkdx4ry25w0esao66330hujra1b05iis9e6cv89dh6xwqhsojkuclrfyg8zjtpp57dapq2k8dcgugctc1eqq0aac3bova3eo95e4s8u02q',
                iflowName: '948v2eusvbq71fktbmzzq9z498uzs10rspt15a4yj0s8zi290cfzgqd70hlhdkk2httgfccfjto4sku0z0cqmodlw0surh08axy0pvwclicwjwj9oe7pvjql4ipqwh5w3cu9kypmc02o7prfxdia3tasuoe40ilf',
                responsibleUserAccount: 'ne597m6c6nmzq2wxez2s',
                lastChangeUserAccount: 'l2aeh81112stp2h4hd81',
                lastChangedAt: '2020-08-04 02:25:11',
                folderPath: 'cn5dncxihi1hqicyrh5n7789xmsq5qhlvz47t5un7ujgcr9d1m5u9jpwr10si1dkwxqci339dqkm8a76w6iko7hlhpdgdja3l5s3moipic1o5lyyxswnbddy0rlvkhinbifiry0q7wi13t6a00pblea1pe5b3q5lcoezreg7q10cfqbiqcqqn09nrvhyi3x2knonsnvylly5rfxfgh7a8vt25njz48ew9ttdi36el823mqa7eztu7irtrahzt7o',
                description: 'ruwlh7ff04ri34ee56jn1g5t5kw9doijshmij9okmj0y54ndb0kuwwsq65b1dyslxi8trr9v28n8rg2cn48nnxh27c1sc2vvnrjhwsq4fxy8wm2ie4r5ue0n35o6fkrjrv15h9mdgjpd3auiiosdy7qjvtydr6jcfr9ekaul2i5i7aplio49njfqo30m1zp5svkp1nhmiyruw7p5eyys8cr2owfhh6wze55qa4zkhl7z2aok78y9fxipazbeylk',
                application: 'vafczaxjy09eidwqs5820zpfae4n6d3cjwysqw929jbjlnk2eq445xgd4pv5',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'msj2yyn0vi49dpi9yg19lljkzuxa74ahwe4qb2b3',
                tenantId: null,
                tenantCode: '3qliby7nji3tqr1nrnr8hf8ol6988s31zjn4ii2v3rxurcqy9w',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'o4ler4r9m4jybvx9w7r8',
                version: 'qceum6iluyo9dszywexx',
                scenario: '6cl9yflkl7o8vgugl32ggcq3f8osjr86pq0jgr0t2wpbd9vfw4rco218sxlp',
                party: 'd3w5doqppz6nt0wx4kaepzkvdcwryuynrio9tj8iyie2518r3dofu4f7rbg4sk3gti429dvy6v793s8uk7xidccn2rm5qkgfxk8yrd3z9d3d1jtz3ovz3stgq12v3u7llqa0j2sb4wohxat6gniseflgi7vsqehr',
                component: 'f7ui5nukbhx2kcz582bc9j4sfqo4nuu1ccqlls6r4mmasjrg9sean7n8zzkwo7ivp8qogkp3l4hnziv7bnwy4uzod3hkwhbivs6s2308u2prgqulj6bmbzhj0tgycv9ny5yn80y39gctpzdc4eutfxlclb47iig0',
                interfaceName: '4ads2xfbxyb56tfnk3pog5g8xtn3kxd0g9il82elfc4762ejng3slqrn5j2krjlfzlk9mdz9ufu0myjvh58ui5iie3xn8gi6u2dtoaembqlm4coa5u685cr5mfrb92gk77bbenntccfa14wbkap6hvlyo22s8lhv',
                interfaceNamespace: 'd3vkp6stkoz9hjg4p4oq78zhqml203dfx5064nwla5yjngy2wjwme740uvq6hui7fbt1ghmrbt8zwiq2gnacwz88qp1n275ztu8iqwslqpwa4hs85lm11oqmdxbetcavm5mgvi89tp8yj2g3txm5qi9blkwdsc9f',
                iflowName: 'p3z2ra87v38keerwi6ye2llb3qntwdklg5zjgw2ttjmgb20wzndha8ur512vjuukyix3z31jsde3225f96bis3ckbghf6atyu37wcypyid3wgrta26xsbdtqqji5fc7i1ozcim0k29b5y9qmfocwky1yfbau0a42',
                responsibleUserAccount: '1iz59oyzmtw76l94j8xq',
                lastChangeUserAccount: '47mkbpb8pghllwvlxm6h',
                lastChangedAt: '2020-08-03 12:27:52',
                folderPath: 'izm6i0ot566au3osshytv6sykr6g92uyfp9c3w1y3t7m5h4sbab0tskap090am1g0bu3z5pi5if4nlbzg2gn4be5h2j3f15d1q90x68v8kew2k4xw0nt8qyq3bu2mxp29dphquf4atc87fx1e7utnmpp29lwy5cp85707lrmo5qj80ex65pparhyf22hq2nimu6f4nfau5lzipyelawkbs7qzntcef5e3qvl3vmwbt75zhnvo8cqpffyh4u4xr9',
                description: 'simoifkg8udru4lg3b2wbumlq91ej2y9ajfagjvdoeaqhqbmn1s4djwyujag6naw1b4zk80196ks2rkge1svnx29eha2hp0rd9x8wavszjc0ik68hpup08bdv7cwfexd6aabtf0mjo80s100x3hvkas1rytj7t4x7alge68yqw04l70k9rcg595q4zlpw21enibax520rom0n3kryhpnmvrmickrgw3tfelcvy9w087ruoc17kx24h1lemcefol',
                application: 'advw90ibn6cuwle0sbfogkb4oe3ff4g6votbldd3llb9w1dg4ngj91dg8226',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'hxlzem0symhryiogg2662qxf12k5oych724yh39c',
                
                tenantCode: 'ty5u9wwxh8vwtt8fvhvkhnq9ahswmjiyfr0owx6mu9foanlc27',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'j07ox3k8dtu2wf96v11l',
                version: 'bjj0vvajp7rsxt8r020h',
                scenario: '47tf9aizvee7bnf2484xj46kqyqz2socfsopi0e5p5ggudnx5vwemqy4hhh8',
                party: 'd5yili4fesj73iasvapmwwdt80lp93rn2puxyr33u7zskwu7lsuscrlkkcbq2uy6x54uub5v9wxtg22zknj85xhvdkdo56pdv2yn4yuhyfcvjpema2we30j5yqsc65toyu8zldel8st67k4ovpmj9zd2gpwcd0pn',
                component: 'tuedvkhle8ujzneyf0jv19uncvi87i7o4v8yopcrzt2hrzuu63ryxnsmrmlk9r5n4b0jcrt9yl369068qwlt3ve4i51ie647ak4nm4wk36luu77bml6wzqumerk2daqjg0ze0r1ya21z3pa9rasz5nnrw2emf1oq',
                interfaceName: '4hdambgn88oid45g0bngo14vg4jlwjwax6t4j7p3yr03m0tdyw0i8l95t7ajltolr6fxzvne43wnkqisklbahjm6he11plwagd9qkl1jppptovjkczqtuumjljxbrn0eohmxurhoks6d9e2r5kyaswqhct3oow0t',
                interfaceNamespace: 'p9h2b1l88qwlaamy0acp4ai0wil4635zhtovsg8ozxpx9f8k4navxz7lgua1xpd9bvjhsv3jkm9xokzib29p2lfxc0ffa49a34ozaiq5qcwvh0l7oj5z6w9sicdyr6wz02izx098raenn7e8i4fth1uwfgbjemjg',
                iflowName: '6se4777paz1xzh98dq2lzuqg8bcglzx1nktwh2xnp0fhgzuj81z65wzpx065kg3dup6owcy4e6th6mux6drhxnn9ngxjf6tbzlm2h3ey5chwzevy6zjp9522jn9da9syv2kngdaathqxe143nlfl6nvci6ng4co1',
                responsibleUserAccount: 'klew4v7kadapjxt89moz',
                lastChangeUserAccount: 'yjdi7ofg49i617hrqrgj',
                lastChangedAt: '2020-08-03 21:03:25',
                folderPath: '57ltgacqprlbqzpmx18z3th71tbmp5u6u5xgnuxynh8pu66vxhpr4gbibwa0rx5emc3jnggbqn73d2u36jcypkjsittpt41ut1d9ttlef51ec72yg59ye956ccwc0jii5hagrmytraka61mh0zuc9b6sgqdl4y4pmdt6j2mlo21wo0rktpfxgosd6k5yry4rok8vsav0avf7jsy52a1k7rwdy7to2f1r943wi5vqlm9g851epayn54nflj1wpk4',
                description: '51aa24r5ls7q7omux82vvr1cbcfs1vjjwacw9zvabxpujhfzj57zdynodi8edppgrk8c2ge3iebibifkjs8tv5srfr5f4vmqy6l3s37hm2wqrtd215nw82g6ewvc9w633o4vq7iq5cdiz9pw4mpz1k033i68n8rsk9x7pz28mlh2t4kb2nsiz6ygbfkkm4caguf16l3cnkssgumlf1vfkbl3t35xsc45a7mie0m2f0gz74k1xy9dy927ajk1yy6',
                application: '6hvv4nxh4il0j2nev2xps50rdy3ivuhg4ws9dniomkrcjkl89h1l7zj6sjhe',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'z96nuw2ukgzi9mr2pv07ee4ja03rj5yjgmlij1dq',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: null,
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'by9ixl1cy5fxgwjzssdt',
                version: '90nigjnuf0jl3mrhbdjo',
                scenario: 'xqc73zfzcu1h8cgc8vmtipk8gt16i31p9liihqoiv04o8sr4xfdvur06xujp',
                party: 'cx9ubf2lckg05eo06bac8c69ax6e6xmgq1i3w3742azar6onkoqysbm8izs60dphe1k6uaxtydcy8gl6qlu7xbjidlgxmna0nkerdbko5dox6p89h3olhf5lq6submegylujd5wpychrwgkvpld6h5h88aij6qjy',
                component: 'koy0n8w9leicffsibnxjgwqwegzvqw66c6nuzdspjl174nmn0ophkt507eu3qmuwriyh2mbw7iu1e4c31gx2akgv52mnxdw9gtc72omw8876c93ycyunszosaza44hhk26c6cix8h271tzxw9ah09br92axn3719',
                interfaceName: 'qe2m1o3xguqgaw866jxn04ro9mihxivmp5tz5iahy6v4vyf69v81a7uor6xgz71c52x2ed9jgjz430alire46lvwuje8hg9uqtzzyw7iykpveslkyad9lcpe2vowhcllkqz6oyqog68p2ogi494opqyruh62577r',
                interfaceNamespace: '1btlhiao9dw1yptxwcgxc7t2qzlm4g7pk128qgqhhdti1vppsl65jtkkn9kjnib60s9dpau5pzut4dqge9kzl4rz3jj6sj9qvyl0ojc07r8gkbbi53a7jnzvvz57x42cx5un554c375jh98g9bsrq75t8et9f6x5',
                iflowName: 'njhi8ubhwxpobryf4rdwl1qjmw9p9thc8aj67clg9p82rjcfmsq3q17i82wl18z6ro1hxzzbuvc9qccauvuwht3m0dy9pdc7sn3lnf0wxf1esvp4op165e5tm7lau8vdlv3brc3kt6m8hs2htip0akr5eb6km3fo',
                responsibleUserAccount: 'iepv3h4qg15s479n2x9l',
                lastChangeUserAccount: 'jo6xcezgdii6zo2ytkhu',
                lastChangedAt: '2020-08-04 07:26:46',
                folderPath: '53a1t2nu8z1etkyn4h5p0y18ln17xbwv6m7q46v6rh575qqblzo9mp7x651djvq1kkk4b9g2ieyyk5bgsgeijqmhiolcak59uxpn8y4kdh491xnfnt0w75e1ylf459s1asbl1xpor1804sx1p69rchayb7b876cejx3qcldj9h4aapn1k0niympd83xbdussayf2p3577gmvp3q9jy0ybi9x6ownm2sbv68qc7k1g2q3wfco0amwwbwy90xj49t',
                description: '2r1smh4ybdr161imt8phli05uj6iwxrf89ougfhot9k07uyf0cgbymuionxp9lbbi9cyqgnxlrfdxxk9rdl8jhm9yl81agcxqx2dyqmlmwd18ym8dbi32q6mazpiqfuk58t693s4a4xrta1n6e1evu8fcxl7ywapmkpm1buhqjf5xxvk4b04agc14gexvx4o3ntxkkp2m2r8ru11z9y449adzvsh23cazzqhpclattcrprao41md9bsyhuyvo5w',
                application: 'bk43srv79pf4luubl0j6q6k1btljs15jll57f16xpkwc6dt6finog16rhrrc',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'iyno7dm0um4fotuukxek1r70sxenq3oqhcn1zgon',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '7ewbgslgg0ikd6flu540',
                version: 'y8vbxp7hc9z1wwgjgd60',
                scenario: 'u2gu447aboo6dc3tzej7ljs046ewywcbaqm8bykbpxjx09wjh3vijb8yhmd6',
                party: '8ms6wikcn3iwrqz4jsh4hlrlcs1jg1wt8zxjxi55hi4wyhzxda74cw9nr63j2oj5zl5fwfotwtj3w52dz2howvv2mebs0cnxr5fb62mhbpiz9uanurex2ll4fy01wjbrfbxadydiw1qmvtt1ybtrp9zocfkoyx6s',
                component: 'nn4wuca6o1hp8kjrcv9b15y132owa22n685r4mst3kr5zjce5501c4ldp2w1nn8okkr7gq5rsqgkomrwspm7qy6c93g0600v5fb4z5v6imsfphxuhndo4oktnqlxod5qh05twactin85zsdv0f3t194v4sreb3h1',
                interfaceName: 'qeso4zw8cwepmsu3fuksc2che2td66f1qv1id1qmzqbw19l3d3z5bg0icdb69ldk1yzd75uw9uy9l1elusrar08cgjd3ta05h6452cq74h4y104hxfeabr7lr6x0xdlop3ahcka2c96ykf6525ija1a9bffg0rqb',
                interfaceNamespace: 'jj5n78o0dht6v9ng3tj64nt0jfie8gxp40ilcks54cptbtk9x78z0pmf3zzskkrge8mj5kfgbkp35z48mij0zjivzveo961h6zl1dqi55wg5xp9pgtoklk4es1muyr01mlg9k47j1dsclj65d7ed1mqfcrut3z6v',
                iflowName: 'pzame9x7u0r1uwntjy0q1asmokz916tzxkwzsnpeu086ao9hrmbtjtcfaecmdua2zy77ue8uabjoglltuk2h6yusjrfotd8ma9d56bxsd9khkzi1fflvwjhshzdyxl24tnsz7cvncgexm7l288h8gc3ro5yae5ts',
                responsibleUserAccount: 'vtop0ll4xfdsnkkyplrs',
                lastChangeUserAccount: '8v5x40gdv0fn12vizfkd',
                lastChangedAt: '2020-08-04 06:06:08',
                folderPath: 'icityz8kxl4py8tnnwo35x1hxusobvfo4autg2qo2zuiex2u47wcwuly2tlxvm2z9z6js6y96ahwpwvoofgykgfs97z87jbrucxsdicf99llu5ngiie75qjz1ky86ln9zehd0hq08tbvhjioz50q3fhed1nlzs4jwgfh488578aia7mcv5csxz8sz6k65a2k6z5myx0i7n2y6n372g2fdwgp1dh16e1avxevxxt4ia7znllfv8pb0igbusckcdq',
                description: 'dbjgwb8vivy7vadu5w79ymx9xoyl2y9oigvpi4uorom4f3eo1b3rqys1riyz1c265r7h8ia0a0flf9lqdyjlsg5c6c8ptcb08cz51wnl14nog33befm8eygmwd7fjufyr5hg0wuwjrf8549wmhpk6dw0nkyvvnmzde3ynj9v2psa4vtcskh3udqgxf7v5kzxt1igt80h3mvo2ltvj13dn4rtxfyulk371g1zjgypf1rxlyi1czf9x6apw50rkgl',
                application: 'ixlkyzt09m6zs0a9kz905xr4bdsnutgutpcqwzarzn6ix9lhk28ji9iz90ha',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'wlba8einm6fabzo0jiz9jitcvzbw0fzl19y707hs',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'sab4d46d68nxeo9r2kue03u9wfvhqxb6erd0xr9e8qlayec8r8',
                systemId: null,
                systemName: 'ndy5dy382weqf7rhixyl',
                version: 'ppus9kd1p3sn9t48acib',
                scenario: 'ftkk50wpiig0jgcrutsm6j9v04aov0wey22z6zmix7iwmsg9xxmmbaux1a2l',
                party: 'b44pp42iygyyjvurjvfdpc8atq2670s5rbian9j5v11gus2k87lnthl6jku1cg8sgchj8x89fvzg0p8njpy5go8m8kzdlmrs7oq0isr6lz0phnxzr09wn6wae0hwl3bff8quiaphjvmk0qhouv1moepswacusba9',
                component: 'v5016oigexou7lnz77yh3nm97mkh8y6s8vuxtclu3gw0n97h5kuapkur3cbz2zejceodfjiqtnep6d6igasbhssd37fmdtrba4g92hwr1jryyljknkxac3sadiagiwgq4i45q2wey4wfhewfqu1bjlg7f057jny4',
                interfaceName: '9dxbfm875i7al9mfx6fsbzyi35b7dj2o08nse5yckje2bprokgt2ssz0k96ypv4131wn73pcb0ypp5f8nq5zw9jc3xruon2uxp9k3wi91cesauvt51kknxdzwgvmj9v7ko1bmfjwjesmzgkwcj11anei356krpmv',
                interfaceNamespace: 'uxbvn5vp4yumwpbroo653v1zp7k1avpigurhiy6rnudh8s51ud9ue1rcpjw29ewl19opv0ur8ctott05viqz1guxijvjojb5754zj96d5pozbgoyfjzsnuab178dvqyq8p9ga5pr4ceqt8qhg93uoxsfgzvof0h3',
                iflowName: 'd9tolwmfr2l3ah1s4abni17610qq95vhtpg3oj7x5lruojrm91rpe2d77i4bwng0hbztwut11x7q9pqt0srmipz85bnj4t2egq1xo67k6j8xc3mo8lrl6i9a3zvmr0ufkkjtlpltvitofh3kzxo6b6ryv4ia7klf',
                responsibleUserAccount: 'fzrgfs18q07gwi38axuz',
                lastChangeUserAccount: 'hjh1rgpdkubwjjju7ru0',
                lastChangedAt: '2020-08-04 11:15:26',
                folderPath: 'k1ngcdi92ax3v1aae79hxapvxejjul8ypnyclwd2tz2ra4ywe0zwhz51yhmrkvmyrpq9rv3cos38w3p9eiqjajg4hux7ujqq5ii857t8wptk3zu992mwyli6ym2cjf456pwb0b39taagmfjx5nbovcjg8uazh971wtps9qif5nwm53jyc59pccfd9kigyh6hek7gb7ymusu2l1yvi257c252p701k2qcs0uje3qjwrbghf298xzgbs7xz8k7vy8',
                description: 'yeu5pphit046o57uec2syz7o4qe7d8yif1ska04qte41ibxmacraop0ht6jflnkvekehq3a8fe6aphekqu0lvylug3cdxy8x06mnrbq4hpd2jqpypy7v4ur2r289o1oa7f4koxp0tis2mtpzvod0rcuf97034ir6b009pjs71bcpswudkf5x9n3ll00x37n5am2ezwrhp39kb6ijm75hsntbjo07jv7wp5qrtzrk1xmn7560uz419eln4erh18x',
                application: '6861akvjiy1v6i9t1s8dp6fkjg3xtyq649aaeixzi9986qakt7nw6srle2m0',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'zc6vs0k2qqo3c65hi5dqa0vwac3xapiuz10mwnom',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'o2zzp95kv9leb4rxt5kls4xwglp33ws8gex8bmb7pnb895spke',
                
                systemName: 'c314btnn0yyda7h67tss',
                version: '0s6jnfj6fkixkfcbdnko',
                scenario: 'ipez3lquchn70ttxd4ubcncz4uuaiszc734ae6buywgi9dsnylhiwws6fuhy',
                party: 'prrs670wpo6bw35lwxqna2soaa1i3clptk0nfuti051egsgal9pr2zndkq6hu8525u6metwybvnvbe5i5c28glf8scvd6zvd9gdb9xrfql73jej5isk0h2ob3fzro0kfy9ub0zv04rtdkv2y8mg2hxxpcghllmjg',
                component: 'sngfmzb4xsu3qney71jgun75gs7dhj53dv4jvlnoqj25rcqzjnwazwvcxwprxzfyyzp3d313rcrjk9zees0jxc9qu8bgl1g3wm6jqgflv7f0xmd82yptqhp41ffcskqh50xjdj4ishovptdwcvmcsmg55x7zieaw',
                interfaceName: 'z1qbcui5r222i598pv6rr5ndjn2imxuh2805mcoasle63nzig19ih5eylc7ei47myw543zpcrmv2f7pttcyh07x7xy008a62m41xtzwpdowupjzrigvdxaz7e7e15or5pu8r2we9fawerx4gmz90nq0ecnkhjehh',
                interfaceNamespace: 'e7cjo4mqz4xwmgcmajw4tyvrnzvwlu2w0rzf99mn5p5r3qyzrldcwucwfe48l7oe7jbwd2xv7ufhygx2v45aizc44e8zql0g6yl1wntu7jh0r1ezrab6iwz5orbvctto299m5e6aek3dje6dcfcy3tsn72rlfvce',
                iflowName: '64vnariuf6flllzc99npim3z165ywngqgs7bep29a3w377hjp67l8wcg0zxjbt7oauo7wdx8p1ql7avw10ggium3fl0hfpl0ljvxxpf3hlj1xl5t6tzhm61k9jf99i1h4p3ll7lzb2rpfkmq3hfgc8f2j4iq7lnv',
                responsibleUserAccount: 'xno3fnq9nawp9dgpayvu',
                lastChangeUserAccount: 'sdw20ir1dwkn1mg34mql',
                lastChangedAt: '2020-08-03 23:46:33',
                folderPath: '1615t1697mh8ymxk9sz9i2yxd4m8cq8xs1t0oe0jji0t6fuphw5kzzv6c9t4uz2hpylrojf94afjhth52vftgbj3drbu9hblh8aucgael5bt2ddp2nezpcgdunxj2u09vlt0ckywj0uu39gfry5rbx8bzyxb7d9ijpdvdh5v774t7anyki5f15p3ig9rlokx4h20tffxwtxve1js0wi3tibalrjt0xykhos901bpug5cimfej1ntwk041b0ncqb',
                description: '3wnhcip9miv01lw88rhaxjh1lopaf4algansxedz1mkp2gfaj7wohz6de5in8ua0vziiem3wzmw83u7odos3jvj3ku34y6zo19iv5oq2cb8moscra6xohckhya3k5fmdscinjdw86ym1ymf6suf04dp7q9t04zucanv46a89yk2neyxfad4g0fut7kzwifjrrlo6gckjcqf9l92gesyt50i6k95m6juw5ye068o93dpj9ad8zphj1h8e4af1vcz',
                application: '5xwz5uq45m49uhu2vlj43wy69k4phtugxkvbsi0miz9vi79iot0hc8650ejd',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'tkasz3q17jpqyqzpcs4a8vrwk2raczay6o14f1xo',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'mzxjzh77fm26d4q02xcjs421m4ospeixd3w31kb6ihh247ry5w',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: null,
                version: 'guecgyni2vwpgfgazsf9',
                scenario: 'gi0lmpue299u7j10sz23ut7qxiaiol1xqfzxb67qw1b2baavawpcptns744g',
                party: 'l11knizaoq1n0bmkl6e1hcqj87je5tbbz1az4rx13rb1upfmctpbqqjv2asmn9eguaqpw90td50wafn1hvmg1yfc76xue9039wadlm19pbvndelc1m103x6lyx0sik5uhqw9rzoi66o66n3oeqrm2sugnib3mbto',
                component: 'k12v84lo6xs239vrp69mp1dhp49cdiera4j4geshpd2oj1ltdw3qf1b5i244kvinfbbr037z2c289348lae1kn549nyyhdjzawd88k770bc9om4flz8cbf77kfggeu1ftu4anntpa7y4yg5anzai9y7z5a5844zv',
                interfaceName: 'wwugwdcerrge241sxctricam05qqty8dfmgs2d12i064ux2s392hluma0362aijo9o9l4tdxeyvwrrhnt6bc3s66hi5hkme8pa1lw1cf0t6avzhl4kh4oo7jeqcu9bf0ctsv5qclvq53xnzh1iamfidesuh537lb',
                interfaceNamespace: 'g8u10yzkmcuyjamdx8kepa15s7tztymerwiaejsanmixbjnrsyw647p0207yqwl0tf6lfqae98e9x3qxqvmbjnxi277syye8klb4n49e1cxe55bg9l6lt9q6a7o92v31o641f29gjcmmxo4dhxljgru4d842ylnf',
                iflowName: '0hoz8w2zp94q1g90mqneuz3dfitx1rjowy8l9w8ahgsk5m3lctjjee6n9ks18yoj07h0e93ntrxpcylb5b140fqas7gkefsfm342s6wp52vg222iu2yg5ky0t7uxwqhuutiitj8jqcsqvvbeujtkdn5y6edrhn5k',
                responsibleUserAccount: 'cxgtm7jrtl1epjeav2t9',
                lastChangeUserAccount: 'u2i55kshi5l6dluetagz',
                lastChangedAt: '2020-08-03 23:48:05',
                folderPath: 'peem6kq7l6056ldc2wa1xhvauyh6m20kfnu5imsfno70u7sqel04h4zfrz49cq3nve0ob6mj0saazmtcxpqku8v5x01544xzbyzfdk8lrsgsbcyv8xqf0emny5v6mox08uc5s0he3n2c4twstu9nql89ahogm2l3p8k0m3lv83bskx2hceobz9f4iybub4njd696k0bi0qjqqgygr0w7axp773t0psc2kaki3dt1omunu527hg0osdw6nlglmeq',
                description: '3ptitswmodxzubtoc3ujvlr6r1sv9tbvv0s27o07fb505rl0ximro3de86w6u4fqqf7vnz28vr8eetzw9lmwdd1vd5197lqje777ayon163nnh5x1icf44hzz2wdmrupnturn9jn21kwoddy632e41tairjnuqjk34mhf7hitgs29y9703ulh7n615l53zghrt4jt2zhkh9rdi4lzim02r705gzcv8wheje610tc8fk444qupxwrqh5tru7iyg4',
                application: 'lwbefe9xfmkpu1vn01kd6mam5xxu16okzzx8mvwp48uryv5z5f9jir6yfsqw',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '1us0ryo1mz4tk045dkaunh2g4jt15cnzozazojti',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'lxhvzhv50w5pq6id7gictnzw9p0y2xit8ajh1gptjswph3r1ku',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                
                version: '5smjlf6iylh30ybo9v1w',
                scenario: 'esgonlmf3kxzmxziu14r63z62wi8e53c3ly9nhrrlbutu3dgqfs00cxu8ab9',
                party: 'ta5xry6tfrpo3604aoljq77poow7a8h7ilzm94wwzhqq8p2phoeouk8q37k3nt961ojh0jycu6lpoo4st482a88r4xqmte83kf6tta0hvfoir01paiyohnq6azxnfd93etby264qugupso31bmynwiy2oox4ui3i',
                component: 'u21muypccv27g64h0saogu7le16rfqm4ofhemv5777izor1kbbrnuz4nbkbyr20g2xwspm1idf5yzghl2olizlp22wfo5qyastf9wan6jznc6o2cybkf55d0qhotpnaeycivuzabf1ckz448quvyb7g5k8g7h6gx',
                interfaceName: 'im0o4rlje7rayt64e2qirjwfdjxvry7jgzm8tjcumonj4zjaa6rgm4iamaf1idosmx1mzpb938i1zriupnwxcnhit12a2j4fnzvcpvwa52wdscg8uaq3ruv454y6f396yooums73o41lsx5zfoex2b47aqp3hzi2',
                interfaceNamespace: '7e5mn1veflcmn6vpzxkq4ime7z8d202h94ekldolzvtxsgu6honiuhv9etrp6qxyz1wx3z0ab8xnbslrnpe52wuw5a9jolo3tqhtt1z20evw9dc36tdtuuitc0zxu31hq35xjbtpr9qrz2m89qz4kw9cditykwaq',
                iflowName: 'me5iqe3uor5t4ab6cmy5w8vn6c626gr72abxm8c2rpc1fd6vuy9jv2ag42k19eps1b8nh18e1ekfq1k6wbvbrp2sfwu35e4jdulkq0tk52j62phm3ttzt6igfppfz4vaek7oirzm0zfyh5nst6zhdjxgtx7ivas1',
                responsibleUserAccount: 'ps5yjhbdiy8a0b0khzba',
                lastChangeUserAccount: 't52w84i2r646dwuhzgb3',
                lastChangedAt: '2020-08-03 12:38:56',
                folderPath: 'nj537v4wo7ho8d3df5upfl3bsjvfo5znm50ijs6zlp248o5l2yxes0lm6686ixk4l9kwf4ht1c2gpjbeddhqxrg2zyvpn2heuc84yoliyru94vv8shyu5ppnqnpmlil1a0ub1xr6m1bjbh4xaxxhka6anpc4bprnbcsu1pnu4pst22lfvypwdyim6cdw6xwxzsxkmqh2v2f0e5k81fe7txh0zzxntvevtggkivfttzukcy57l1kozgr6zphcarx',
                description: 'nlgmxx2ef3jjfacevs9csjibx4xn9z2ioewmhljs9my67i6wj3wvsqhsoj6lg5rf9gv602xthkecu11stupwh689halxr48gw46fgxu320btmcjsvds2bo62jkthz111boods17uurv0gdwj3vbk4fbs0lf5ky3co7s1ffelp40v2m8ieiyjy762x7v4h7zoiimvkcez9y6v1lkivwv81ia5n4f69goxoba30oq5popejkxguf9eft3hx9bmdik',
                application: 'lbgnaxib4rv0whtucpca9i69tka2whpjfpgir98iaqrlw19i9islwa4c3po4',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'btcpbxa179qa023q4gq0wzfvrhzjog55un3na4y8',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'j6xiock01gryskoomsin8gftk5ckagmb5amqc8rgmc4wmdj8je',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '3a7zptj8ei2mgasfcctc',
                version: null,
                scenario: '2leegg6dqt5ev3wi6mcngup9hkolbumr8z9usoux9lqzb53h6rtfcfgfwtvc',
                party: 'ory6s3oz5709x6p8q9yedemkbklkonnnb5p16f1ip5f6l7t5b49vwcgmd7ev256a4b8hb7kd3o0diw8p5p97zu6rf4kh5sv0lbfafpy79ulcjc69picrboyxbh0x94g3isolhfdxwbhifnm06gs1jv2fpibxwkno',
                component: 'nevhetrjygvv2g16xrkql9d0ayga2xaal8tpgztgqkkdvp048l1zmfplh53u61tc8qt303poq3k082e0gosqelzt2tzxyzp623amif9l9mcnwyco3vxyyvj3czcj1ghfj7ie0n8ldwarmh0fy7krca9u525kb34t',
                interfaceName: '3smdh3ggq2l5ejjvs2sfnce0s8en4ca8zrtzaobsu7yc3eioaf9ahyol5fhssl20yhiyh216du5kz1r587x302d089q4pi541mbfyd4h8fyiglvo02z46e71f0fy6f9ew6p6gl77bxg8ej7wf7gs6r87qsqkjc0k',
                interfaceNamespace: 'erm1vfuz7d8sjcfk7ex3mdc358n9pfsrvwe4acif1pbtpeycvriaggeqkjwb68up5x1rnoidicn5kzbg1hbverf5ov4rxtu5diad3q2q07h1wofutof3cjb8hi57zq01tjbxl5zoxcjyt1fdsjcpiktp4ctyyypz',
                iflowName: '5ppnl2juppreqrjwsdawn5sevhrv3nchz7i11ftalu71mlzfhd97bnz6rq6r9bd37p3xhbf8dx93zcv2d4bslo1l5cm6ijcrndlcwkhkp0jkaeosqwfmsnqdwl3p3d9vmum3hyhv4pvidcxghdc8h3j20osh1zm5',
                responsibleUserAccount: 'uz4z87yu3q86qitusy7d',
                lastChangeUserAccount: '0ju91ve1vs3roaxcbu3h',
                lastChangedAt: '2020-08-03 17:35:52',
                folderPath: '8mvqun9pgr0e15c0i03vrxejbju6bpljghy03qdrhtytki3qmfu4m0ws4tn3w8up7dxcujc6zly0r6o8slp21bkowh4094buaf5sdsva6mrzhk1nyiiuls3yzov6ickw37p72hfosu6vve5dg9nz1c5ej9j0g6f4amlgzcrimvv03duqbdy370zt87oyltelr6bryynxdk51qo0mx1spgmmw56298xzcjt53nuc8iw1yu0sxtoav2mpb8xpt5cv',
                description: '0qrj6gjhkbuef86e8dmm4hrui773w4o8dpmc01q1o7u5duhmw599l3v7eh4ojdezfsbsy7rwy5og437vbp5h4parkkcz3wuahvc43y4gknslqokdb2l5qhiiq9ts0udo6qirf2cbpxhzj7nl8hwd8i0jlwxtjsfcbec0ihsvn1hj555bpxioh7017aztprqbqmzlyuc877xrbo1vjygujsbwfk15qlqm4bq2t2wyaxyr2uothu6fvoiyeebgwqh',
                application: 'uf8nacxe5o07nzu2czccy2fkl3yhm4int0g8ldc17adxj0vnvhfa5fdrhteu',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'u7qghkmy3vwosrls97gsgy7r2qhul9x105ph8rq2',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'moktvobsu82j81vln9mjsq1dg8pyjrz2npjl851b1ovkeqcbtc',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '3pum5cbm99tci0ry51jm',
                
                scenario: 'c0x4gb6uweni65iuequ0ygfexsod692dxmpl0mdsfjigqqktqq6ff7kx3ct0',
                party: 'h4ca4x7ahgxuqzxoium7osbkuytx1tecd8iygkrsym347gql0qwry9ek9tj00u79y1zxak3dkg9zcj0iexi3ti529hht717mfgv8bv6csi4svnl2yir9unuow5rv9iqrkr5xn48nhbvry54oow91s3w9xxw1mj64',
                component: 'kptruyf4351443dhpb11llr6gzlouragap8op9hjnndodqd5xa65nj1cf5ep1im08k05etb7ero3umm42dr0zgjgl1kzt4hn4mi67h6s57lbia1mtrzghlffg4b5mbg4w7xe6qml5ustarotqshdnzyf6mwerdau',
                interfaceName: 'bz3edzwd0u85y3bpzs3iok881uatovedlqmg8g2mgftltvi1v8hyqert6z3mvxmi2b7zxw28l1odcrjxt28djz3lmeuoox4vf9uulrahl405xgitv56jtjminug66zmogcf1o40zb6g1148u77ewsfte8e24w6xi',
                interfaceNamespace: '8mv6ldk66kwm17o1ki6z6lhfwrem0vdy3sgwnif6xsz9fxwrqv0kewueinwodnhjiv34nbi0x5lxb8jnq55maug679j0s4l3tj24u2ikrbyiz277eu4i52b6axm0553fer6fp003i9rjtfu99x37dqln2j25k6vb',
                iflowName: 'ibt2kvmqd6gpuqfc35ix4zn7zjq3fkysp1up04bau3gbfbcyzorycup9sbs7oh2zitp5vh7c2wxya3rf3g8z6cwkl4qneyyf48ff38vzkmt5j8mv1a46xqygyx9zuhcfr9ed01d7i1ddme1t3zaupnun3uefwcps',
                responsibleUserAccount: 'y5gsepvlm3arwi61x2cc',
                lastChangeUserAccount: 'hnjeru258xhzvh62bbuc',
                lastChangedAt: '2020-08-03 14:06:55',
                folderPath: 'wlb170ct0js8qkyszyzrdiwi0v3t4jjxhh3uiszqatdrnpjhx70xh9g5cbjw56ktzy1hoj2jt4ib99bwojodpmbn5qkw7flu7dhgac7923vxi8p9n2p64su6hhzldxa1e9el8j8bgnlmd7rhxzxtc3yvgcw0vzakhuwqzf1g9tt22jcg6frcsxydxrfunwe09l21mjkd7j295e4p6sdrvfxbua9urpr6twvynbsf3ebchjzl43qu8xpmtrmqyl3',
                description: 'wvthbqup5htwl9y9ugs2ezpboami2ar334o9suwa27jfeipoqas6mqm9bx1ltsykcoazipafdvutlwy4i27q10vc9htncrqyan8ah5pa1ttgaykjtti1uzukcenomhzn8yvaf3on2nm1zzqdlti4ywrbsbnammb62b8cei2wd5w1wbjhtj400hwznqr58ri2jw3d8hyg5dowy028u5o2xv64yf39e53yxwz2s8mmyr284id78cndv0ah3vb39gf',
                application: '9yb20bvs6ke41q81zjb929d399aaqgstzj9c2sdkvt4tc3un7uxo5oye4muq',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'tomlo8qsrvu00d3jy1lo2io47wv8xso0gwtv2q23',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'kjsvpy8v7dha2jn6aka3a8klasmj2xecuqait7q8duqylh7kly',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'ycx5rk26lcx1y8onnmgz',
                version: '0ob8qg7be7qp3gq71c9p',
                scenario: '06yiurfyhh7xjtjie2y7a50z7egsciwihk0x5ijfah4oyyu1o08jxbe9rwrt',
                party: '3p3l8qzomy87q5n381b18pwu4shwtt3jnzw5n5pi16hk7s2d3g13ue11cgsb76e3z5y0oukryda829k2l7xdtcsjzk4fmsdr5l3w8uqhm2uph0uylcare3z3q0r5eaurwor5cocz8ol7022lpdz4ukhu3b02r5vb',
                component: null,
                interfaceName: 'atajch8y0ivs4v0kvb4tcxpar2kv1vnwufefoaguph4nidlkq9m62gvkdwhcb6noyhuvahye55iry79c7kqgxnxmlmv56zgpypnh3t7n418p3gz369m5lkcj932445dvahthe1y6pul7bxn4upqdrjjgv8fdcut8',
                interfaceNamespace: 'p4x2scawgtik4s4p3w9yls3cx5q71obrhsxml7txpbj8eoh0wcefkdw927wdi779acwmeb8re60muz3izka1asfqaz5rjv2a1l1nvzdm0g62d1v3s9ui0wnc20r2zza6nw6fzfchpfgly73sbk4vqjhe3x3p68l8',
                iflowName: 'txh2qrwa207j9083pffvru6pqc32pspdtbu2s4o5kghlcoegt81moie2t6jd08k0jwp9sdooa01slfwo8qvdgbvi57gji0ctye2gv716653srgilnha12r4s58suzsiny30f6tj7xvr7hydpf64ahv3n155oromv',
                responsibleUserAccount: '5pmypvokaopul54fqjvf',
                lastChangeUserAccount: 'smnwijp9llhfd05f1c52',
                lastChangedAt: '2020-08-03 22:44:08',
                folderPath: 'e7djdicuhsf2r412s70uvhx0dtligc72z1pemzthvfk18es1emqqpqim1r17zsxehaknqd6firmgo6sfq9yhe3ms2kchhrjgzwxvdfkxg7nix4z3l11h6iy59jhfzp61wu9fvkn9ds43r21vzqmbqlqs04tmokzzesp7fyk26lsyqauuqeg6ilshzf2upo1d36ldq35q66j753ydpzm6m6s2cxqi1y2bb1oqipmg59aq4o48uvtvqiucpj5pfdx',
                description: 'tu3lap4ciyrfoqupqhzsptnf0b6j7sglpez4tgj6ibnpf4cysxyp33jdqoy2me2120smo91at94no2o8rz7b4932dbn9g2c0xh3f01awmqcd04zrikle0mk0b4x4upa9ptm8w258dwghxm1ublyoldj0p5uj7fdwq7jjdwxm2reg1jmxvs6n7nqkwztwaoidtbmcwvh2gogpz8z8xp7977gix6bcf1a79xf5zswfhuakkt0ffyar4o93i22s9ep',
                application: 'xy5mhfsgdn8ocvm6cjhvzf48cp16zw71ue4f2552smnkbjhxi0vi7oyla1ig',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'wzo6suhjwrrp4r79lbzor230qwb9xxfqcrzjtv35',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: '7hq7nrtp46qaf2khgn9j83ofu9yuv8p54hpoj4hdf2gu8goktr',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'rfdwqltz9w35ujd1csw6',
                version: 'jbm06u92faxwp3msbfoi',
                scenario: 'cw0ycivoz0itgddlkvok1fh74g2kt9hw756uao9ebccdiv5j7zg404ca5gcf',
                party: '21pqab5dlgz7qv2wigbouzq65vwi9cm64uho45h8wfbcdv63merfkb14avmnqlyi98hxpgy9dhktpo9bbubuhfpeqi5iigmuhy09y1lc6f1i5kq9u59bh952b9obqhn7z9iozt1sq2yj89hzboszd4gtvrtvzdiy',
                
                interfaceName: 'eo3lvyqfvw9owkm2o7xy8lqsz9yrabjpu7jzg1c6fuhlxgdfp12qe832f6rqopsni9m2sbuxmf4v7carqe8ij71o3saq7kzp15v389xbrxqxoy7vjrs1qud8pqbwsmvxry45y1z5bl1l55ezcgnsyn0r3idodx6o',
                interfaceNamespace: 'wsm1i5fj2qb3tx1cmzrkne7pwd2m7zqd8pccujnzu1u1lpd59yhy42vp1khe5bogzycwau55sjbgfyfo006e9wzlyv44m7jkua34e140vfxm3fnvqpm1it88zzteuet1d6hotquikjz2pjwczesjhavhommrvhs2',
                iflowName: 'gwbf78d8ohbr9trp30mdmvgt4anxuw779lsqwfnkag6h0euf6g12cmmvmu0lzr7biacy59x0joew5vtqo3r5d4uchshkmg94pn8evisvw81ngjr0r3ftndrmm3lg87g3ejc41rpati6k594vijpguq68kc4pxb5v',
                responsibleUserAccount: 'albfi8e6ftgl5c0kfqzc',
                lastChangeUserAccount: 'wshtmadguingrpsf9p2o',
                lastChangedAt: '2020-08-04 06:12:55',
                folderPath: 'mc1aflb33wt15ewpv356wopmqfr3pveyoy05urts3xtnrl8c5lt8mduy8pdl1c95m9i21h0k84poi7rt517vw2m3a3g1xqnlz2m22ssedmwwteq7rqp8ehp6sjvk61865404hhb9pvwohredui5gq1xpld9ru9jsv71s3e9tcj9t1gx3o094xpcr2e98i43roy2tato0u8yyhh04cu03tmdwrxjmyx18zzo4741lnhslzjfoi7rwi80wp3cyflw',
                description: 'sd6qr79att63bfnq95ah8nw6ofij45ckrp5mk8m3sl0nslvbnpb3dgck8a9m98afvzbng489bcbdw7dfp16n3wklw530xcympzkdiqzk0ibtulcheomnbej2p8nl81pwqyzv2uqw7oml9owebf3hnlyfrxj42s94h8eh3c95j1dtdbexplxcet8g5a2zpw4ypi4wsx9v1dtyqgyr08k0aynnan1kq6n39xy9t1rykyn598ut4jg0zlpe9oab1vq',
                application: 'b3ur735a5xry10c5nwuf5szf7nh3nwcgyf8kjlrq2ddnmmtz80gfeslf5kz1',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'raxfjob7e0avtjnal7tfk5zp2f08t5894n1w2ulc',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'qsag9hbkdueppedijsmyzjq8fe2qv3aje9gfiqpva9f2srbvnu',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'km7gwpuj2s7r7lvskomh',
                version: 'dv62mkc2jnenbh4jtn6x',
                scenario: '1d9e3zeojwz4hhe4woohdi8u17o6y02s94ekxgc5c9ocnknw0yvt4so9iu81',
                party: 'm3snkni5ah0dkp9ee5ymnuw8pi9xch4srk6ap940c7xqfdsa1yxek4ifacn5n9rspxx5zsuikp7e596a4lw2y6werlfdqfbwcpimv2155tmrhve49zdczi3ygqn3ron8rer8evik77j59wmbt2qrhdql4se83ej2',
                component: 'gb8o4spm8r0y4dtl9gut73ptp04337oiorvlnx8overqaqib9jbgjwm3kddkcbdkbnwtksyw8jrlv95po1847y740n3i0g31o0kpvzwgjvhm2qcluzxbtszxlji5p9f44ngjpuq7d5n4i1ass9hneuggxzrda7hj',
                interfaceName: null,
                interfaceNamespace: '85mvpujaytwtks1h89gnxlc05motmmku8000f6u36f4xflbl1b5d4hwcr5z9cg13w78j4afefzn19i8aucq6dgzuj7eh1lr5mdy0br2cfbemfcvayqg3zv8rkmh5e20teftud2r6dlq5lakv9wn28s1roztkfhx7',
                iflowName: 'wcjcdfzyrw6rhmw62y9qjlh1u7qzmjc0v6f6xjtun550u9tm97shlr3dwz6dp25yl8hg4u10rwo9sgasexzfmn4iet99wmgkdf8xa5wl6r88de1g3lcch6ygr6mi2zwrhax572ork5az8qh2d83vuywgyqphi89f',
                responsibleUserAccount: '0nr4z0i6m52e8qr4ephb',
                lastChangeUserAccount: 'ly44t86x1uxx68rih5mz',
                lastChangedAt: '2020-08-03 21:11:01',
                folderPath: 'lck5tfdheke2zbamgwdkghniai7mm3lylaqu6ktepevae11jqlmdjghclh1lbugkrmlsuvfwljejkiti2ows3nz2dke1k7ktcdiy40xv551kb3eqlfo5mq1t8si79w6zm4ghrf1tr4vtcn3p5wtpcfmbpms8one9ssbxhe3v1zeqcie27sv93siw7phmhtb0j93bo91r47c6zkm6celq7r4mdo05rzre5vebqt598ucu70yhturug9larkzfgp6',
                description: '1rka1r5ql208q873dt1ksavs5sg3zn4swc03r65fjg3zeljdz84azbe14nwqnxmuoudbqcwwxdjjeco2444jpry2wky2um1aarj87k63vnl5ddo2xinre98adrvoc2qmfdabcy1wiflv4vsf2us3rvo1gn1uaieqonvj6p9yghjqvsngifc33xl2bu9s1ok9btvi67gy9ftylc6i0db97le0e290krt5vx6waavwsave12ecx1hfu5l5kq4c6k0',
                application: 'zowyu3abeng5p0tgxmy84dkn5nr544vzp7rbybw0p516uwmjp33tey9sbfh5',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '9077m32l7rj05k14vg5c0zbhtgdbbbdev4qjxvay',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'ei57q4nfxk14p51spu8x61mb1h09f73uc162etz0ghc9pfv1uy',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'xwou749wcpxz8o1sl2wr',
                version: 'xstfn9qhbp6t81x6m3xg',
                scenario: 'cxb7n099ph7f4jyqtu7z0cmmps1giljy7s7xdogkxu5loyob1y637dedpwo8',
                party: 'icbdcdwqcg93347z0i8n2opq8wsovgwvm4g7loiokr0svi30e9prrdwgnygz8gkir9kjvfgjw03c1ewceznjrsjrcmdaj0j5der22250qac8r9704av0tm1g5fhuwfeuftnhz7d0ekk6qdf8c537idf7jqgwok9i',
                component: '9osuq6pmgr4kbm8f58m7vnyravi0e3va5rmpkiisxl41j9em3013uzziijc3r57gsurls0d7pzkm5fqk4lejg1o4phxq866tpqmcc9bc3ddgb3v3tk3rjkohi01prdgnvlwhl7pzdtyr24tqppa20vbbjprtficz',
                
                interfaceNamespace: 'za8foel9xquuzz6vchcivq1bxurlqa3m82as5hh64hmal28s4yymx490gxsuiz5og8nz3rj0m7zwrsk6e1i43ji5db34kcc96qcmitwq6w8zigsbjtgh2lpoxvxn3qv84h82s4ciadzspu5rmt4x18pdqk53p1d3',
                iflowName: 'omdwc8apk4jpkx5rpotaqe5c16z2oacq4sfpw4n4w26tzq4l9ttsm4t5md7ph78e7v95wgqfypnq223548ofqtc9rffdhpmeo5eco8v41senbbihr4r0cf5y8va3xcbmvm8n2epq9a0m2ucaea5q7vw930l60n4m',
                responsibleUserAccount: 'zkmle9ifbhecag9bx71v',
                lastChangeUserAccount: '49c34jmnfvpmcuz8ynjf',
                lastChangedAt: '2020-08-03 16:08:57',
                folderPath: 'g4jb7s6if4kslv34p428n2wt59dkf9rcijgpqlm0m3tyuvw84njtt3trvr8yokg8wqpe9uexa31ck2jw3gvhlzrej5p4yowar5bnmhi839k6c6owaqctgk3tiqdw5lsk7rjqxzddlzmgjltdzdjhfxkcede69fxyp77lcexmtpywqvigote1xbfzuw4jtnm549js70922h3oywkpg4gp1nbqm3eohqznkb89hn0ufooa71k6a3wacte8pfdetmz',
                description: 'kmcdzc7b6de3n5q87x0ob65fvqcg62v8sewk5h05p4v71yl8on8072splycssg2vcuit0h43i08rto8msdbdazmcsh3dwmqc38jvg6mx5t0v9h3794n6np0arrbcc8b6w6i43qpnu76kilis2l872e87qxyx9jbc42mft7uhxz67svq0gyyzp71g3y6l049hxmcxnfwheqmjze0uou3ymiqci5cbvr5xc193jp5797igwl6rpof58gsb63hubmo',
                application: 'nsxkcv8hafctpay8aw0rva6ne7yat3ewm910fp2x4i5fdhgpi2siqds6heau',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'p0d9yy4oymvg6umi2o48eb2cv2dx558yw2yp2d2x',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: '7odt3ls9jilea35hcrpionxt74cf73wrcist4il9dmfzila54s',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'pep25sgp7214868l70z3',
                version: '67tkryei7qjeiswcdrce',
                scenario: 'lohryesrdfqxkx940j235l4q7hvigmelmmvr8gxa0v0m9nmfnwiquhxub1r2',
                party: 'ccykd4zmhpft1f7idu70v4mfuaejdh3058tkolujz8c127qszmh6jwlip2ty3pi3g8a51ptrpe8e62488wuw3gskn04u2pcafq0x0hbvq3604bi13igcewk5xfjb6venq833jvaedq217mcl1q40sxkslvbvi7cy',
                component: '3shrrhp6azc8qp4unbfv8v08e4ll3q6pjoixpowg5iz3ybofi0irwjv7lcu25m2hzdb1jaeiacut385e1t3m71jhilt6835fmv02qbv83sts6giif7be0sjfgfvq032jbzri0katu5zws8l03yv17qzgrgeqokpm',
                interfaceName: '2ryw62dyrxtbcxh4hwnix5njw1ojurbf7mor4c5zy0funw7oa6itvif4u168z06o4oiy61qgtp4u84jqg1cor0k9xmyk7jjc3l0gj6zuz21vyu2udgtsqyv2kwhdfr4x3l6ri81cmp2zlvdypecicyl23bcbq2ze',
                interfaceNamespace: null,
                iflowName: 'hwwvxemg9c1bf3cud5qji17yyycfl8vkj8lsa3abbbx587mhay1pzcydkacay3h50qr18mftuxca03u0dldho1swpsyp4h79gyj9g3sjjqkf40c14p1eep9cne4ibna8c9umokjas4ty1nexst8n7qdl7pbjntr5',
                responsibleUserAccount: '6f0eup9bc1gkt5sj36q5',
                lastChangeUserAccount: '44ijyiov6s9cceu723mc',
                lastChangedAt: '2020-08-03 13:06:23',
                folderPath: 'g0wpx67hr6swr1cwz5tcm6qhgtpuihx6dh6awx6i1ozmiu6ped7978zu03f0x5s6qatqsiemh0tp73wqa8oi46ax47a8kbkcdprbpmchhfa5zxel1l9h38xkmcadyvodnfmm2cdbdlya88ww6klxxkmz4hkp8p8u62h4f6crlcsxto0uqo2t9nqk4nquzoqgd2sy9alsl2u5ly4e15r349tcwjvu15hgluo3kj6m09zn0cvbktrl5z9m0gv2usv',
                description: '0ektwmpd1wj48cze3ew34dl66p4mn9v44uhu4q3zgwvsju3qnp3ho9f2ag5i2twnekfd79871nzeaqljak8cj02ho8kb2mv1c7zukh0f0z3hgubgglrba3i7f2xhsefq328a82tje1ww4a9r29ycv7wx9keqagn1h1mlztq7zy59oh67qg0qdj9bfpueoexpw938t9v8oa6en9u6flnbtw1d6es7ogkq1ipb3jho24v12tdq1i5zz2lm8q8jkcf',
                application: 'e09ecq4spdx2jvduv4dejqvpj6kiyphp5fkie0np92g4ag8ohhq0bx42vxoc',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '5qulzyv64skew945btufrt4dvgkgngurn69qag63',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'bildwiofy1zjtwun22wg2pbevr7n6j7a2nz6qtrv6jubo8fvx5',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '6alzds6nmep5kk37blgc',
                version: 'lqvo8dkjdovmod05ks5b',
                scenario: 'ckoc3nisyasrc134ru4pll7rzjj0qpwf6dcgdu2o78hf35vqy51srt8zsszj',
                party: '90ldhf9ju0lh5t1j3uh97oqtvq90j3hkxss5qaj59j5tra7kbyz5lfni3wofktljubz7u7x1ajnxa93f6iq27lrx5ti74jc7aqcshueuzmzoy4udmx32o15c789yydafbsgldeyyimddvcdagl0yke2s8dg8a8ko',
                component: 'b1cnkaxdgwnygn9qj6q4oi6v957pknkt2kk271db3o55lo3w190ofq5r2vxfkdxav25tesuh6qahpdt8v3eopaydglkij79c6ej7fl2kdmi96ojg3vgzi137dhfa0mn5lvjshujsgtov7xtdu6h1ojk5a51jnd00',
                interfaceName: '8mx8qc43ricaseeufbspgsgkcr06a4u3xf7eo43iayxu2rzsrej71iq54ekzkote6pf5hswus7hyd18zkx2amqow4gb8is0huhrk5o5ggcsang0go8j20t238ra80d6fw4ye570d104oo36013r4tpw3ss0er1h7',
                
                iflowName: 'kdgrcud08h7ii99rcm06qybgxrz5x9lhazx8l4z7qqj3htwomjddtvn822kwteogomi43uw7kpo2viuie9xkxysbx2yhmkzxsqr1wa178v0f9t3vc4q4zw36bwrjaycp7mpsfv293p8sf1f9y96d3ayjd3f9wbie',
                responsibleUserAccount: 'mps9v9i2aa6m0k6j7vq4',
                lastChangeUserAccount: 'jqapjvkatss42hgzjz8z',
                lastChangedAt: '2020-08-03 16:38:11',
                folderPath: 'urfxqlk2x772cgfzn77i70z8n6eoxrzv6ssg8lru4mfrqfmgokni5cbq2bhxezf13l6t9hqv8y5c7m1wmk1o1cytn553bf5bonrnzb6w4gsbgjaldpx7nugrzna666iocxwz7ujnsk0koom3nqo87w9kei28knl4y5hjbo9yqa3ch8tma4zhkpx103k93l4jlhmcwrxrh4afsptcddmebvha3znnb8fmfrpzox0uenrf42qbd6wjj9twwefcpvc',
                description: 'ohdq4b53b1u3pahs5nhqw2zb5972dvctk9vur41pqkhqimg76izyf13ghungj5z12pedbm83er3ufbax79f8oza0kai02onof9j8sb4n1vhm7pzg09ttrjyo83fs4rtswz3al6ziuck616691290qtf9b8rzpg63p6a965pg1hpu7sosnh1dr9bwysn6howx1nv13xmpig0fe2lk79ac6sv9f3nefsty88vw5anyp65n1nsa8ihv45ds9h33dkd',
                application: 'mys0jepdmuahmybwdlhup3owm0zevezlw48zid8uni34m7ildgck3k5oilx0',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: 'w30vsye6tb9t58d6lpfhcnw3ufj89vc7u9sf5',
                hash: 'kr38c4skj4bxksxepx7rov6w84qrysf3d75rgi1u',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'e9ej55loffk3si4f1xxzgzl3poie0y0b2kmmj6izholiot9kte',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '6trv0wx3uzllay685otx',
                version: 'tvbx5xb8nj6ho9xrvo01',
                scenario: '3qrdfm6ilt4gvpva71khlis1be18cvwefhzyc7cwk714gvkp7hjemf5xk4ny',
                party: 'jg9idgy3ma6wbigqvew7b2zmt5wuq3ms5gz1lmaaxdac9hh1b269xgqv81dufdqmz4negwzebt9wla6dtballzsefo7d8lsqd91p9ym5mnh9elttqr3jbzzn7kr2fgsc411f3qflnc5wmmz9h2xm6qgyb6ge3kn7',
                component: 'ysv1cc6i9f86mqfbkg7fducs1kr3zdstsc6fil0uwjdfeaptxypgenzbhe8fqz79j6xdooty6526h75z5bjw50i6gfe1ktp8dds0fiu5s68s8pv6wu5cvswzpd49fgpugeuusms8u6s56opfay1kfk0cgewkmpr1',
                interfaceName: '7hy05ns5s398nhhrbvrl9rr8xonhsq8rjkjv742c2z73ni49vvh7ccl0ay47t1te696iyu33ej78h872bm7xxa4cf0co28ni7s481atgu0l0sfmpd2kpjfgeqkg38pg5yxousxeu7d8ev1encakmflj86jkaojdu',
                interfaceNamespace: 'm9auf0l7ghewcsl1pz9pselahqh5t628r4b9lpt4nbwb0grkprnin1qf7so7dxikve7o391gqd73h0ix2s4s2ooncn13tnvsrkdc06ydard1qa5vdw7vn9b4t04rruphpus6df7lnmex433gbe7d77v9olwwafyg',
                iflowName: 'ounuz45n2b6fycnrb2qh3dz11zymfqq8epsjtfh7uykqko603bwz7t1vokbjt34tohqh2vnxeikpymlcup9g4ni2ap8b8awwq71h391ksd24o8w5nmjnc4hnr5zxn3f6tr1kpqwd81ls4vsvz2cux2g1psvrq6gm',
                responsibleUserAccount: 'izkkb2yllu32kwnk7dt6',
                lastChangeUserAccount: 'hwnmjitdop3b9ab3hmf2',
                lastChangedAt: '2020-08-04 02:56:16',
                folderPath: 'cu68ybl1s5wa5iisogqzs2oxxpsuflapl0qf80ci47yoazimi3nljpkr8qyonenelzu6bqtc2uim36ocn3q2y95fj99xlwfu6vltazk1owluwo1a8za6q0qcbqb88akw57tqtn8x8bja4jq3clj3h8gq74tjv22oonivs7skaod9fve52me84guadzn2u6o3rmrpumj6yy8dpbg33j0dy87ncgehi5vgqvvs17kk9rofqoqcc32s3i0i30jm5na',
                description: 'ds1v0yob8ic7dx33qy8qf9kabzt5rxosiqp6w93pa56cpkjcm92t34dox6p8yjef46ci0pojredctnh5dqcy0iujjlyg44iat85ikym2ipa24ke3fr3ncw957wrygm2jfrmvjcfldqergo0c0jatulf3g9rpdks2gbr7bt21nuoijl7o5tbypp0h0v64bbqonthmaxcyq9n2zhh87aon3zzkgcwnlqhwg0xzrh09sh7l1s3638x9w4l6o62ickf',
                application: 'ha2nhc7lqoq7u1w5q5xwfe11g9g41yandz27h2fiuoyfmnub012898wu7y7l',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '2yqburd5bbr7c9aerejsjxiv3yccb59e3zahxqm7n',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'etqqsqk12tsft7q15yv5dtihhcnqi8wxz7qx4v20211wuwq9c8',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'iy57tmytzj64r8sy63a0',
                version: 'lcyf47ck3ne4zi59qvz4',
                scenario: '38043y78f5u7xikpx3dhecqbzsetvqmoivuab8p8uylw2h2d4o4w41x3txfc',
                party: 'ml799mq7wegieoqq80xi4e8ywnqisvnqe7pd5dtpawd81oow3a97wn969nw3g55zcgaacow76xflx0a18hqcc8znc5p9ufh8p7tsvryhwkvjaftl0rpvm7w4j6l9annvat4krkqzm8eu5hzstb2bs3owfnzpfidz',
                component: 'zvi5vucie73g8gz8refhua2ws22ph4y3lllwccpoitqusn6idj5woqh4spl6hzdfb9j4jt1muvalnsyggzob2m67iwqmb0quw7y1z71xq85a8eh27lpl2yhgv62563u5bjxnj2t8fr4tbsdfjsdzkzzsgefc3uns',
                interfaceName: 'gn28aww9cj1p6t5ksy9s5jsmgdjtnn1fgqi150i4hbn1w5yl0or2tsq8ppr3edmstlblc511k1zo7uzkv11fqcnin0upodq9x9p8088jp03m8c9lcrdve3ruab334ao21eyeqfg83qerppaldt4v45iea6n7dfvv',
                interfaceNamespace: 'xh3da4o9ucrjnt5ug4a4qo8yyekdjhujfpwwdfk7areer1zp1cydfhl7w4kjuxiq8zs2d0s3c64cgip7tuq0scriqxr61expkv1emtoh053s6mxpkpjh0fcqj4uyewj1dm0ddgr7riuvmbyrn9036t7r1t8n85d4',
                iflowName: 'hfkzpm5zuh2waw9d95gp2h5gnn19r1rk6ojjrknashmq1l165yptyh6070qpccph4q619p8dg9383mz4bws0vdtd8pmznszbr0xg18nmfjh9tmg5nvv9wziaqk4yo218lcjz2a9nvcjmwdi7ep7u2kyiq6gm109o',
                responsibleUserAccount: 'fc4eai139nkw1ttklx6f',
                lastChangeUserAccount: 'o2ko61exfxs0n46l8e64',
                lastChangedAt: '2020-08-04 00:23:30',
                folderPath: '4ab89h6w8u56ijrm5yshkuih73dslpgn9ad96q0u4n88x16h6xz7chpj6p6vlkxdki7rb291c6ua6446gnfp26xzd1g1po3d5drq5a8a0pt7ezup43w3swppt6oajc9qa27p0elbu5n65bkaji8c5o7qd6jogoasjdf9g0si88o7tstv20hzeg9crjjtwnbfdz5yiqe2fqaeb6ai3m8twmoek4tnu2v9ha0bh1yvsddd6h7mr1thhhh8ni4cjuz',
                description: 'qk419xyjxdtz5un5q06dirx2hjhe7xhg88tr9uwmrren37ealif3oyei9dble46q17f7tzv5a0je8fcdbnzohpli69viub35kueoo01wb81o7qeasnzuqkyy5kehc20az2h0z545dj3gppob7osu6xpp0b3zi539i1nezlfrjr79ag04r3pmubdh9jixd1uwqhjrdn7c3pa6jryrcusec55icf2cbx8gbwc1le8ijcg4s2ib5xuer65lj4db09p',
                application: 'h3bd9nwwrc9estir4s57mtrv0ud9nqhlftgut9cewijv3tq3sacp3493nrp9',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'qm0y161r23o11u3qvka3hl5r0gmqlrb39wbmtrnk',
                tenantId: 'ukdvvjd45zztxnijq59m2igeropbx4kj6nxqt',
                tenantCode: 'tn9fy4zo4ywzpy0s4pq4e7gnneicpag6ge1h5qsntnexip4dyq',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '3qmwy9gq24ic6i82ndei',
                version: '50ly6w8lp08a58pc79ye',
                scenario: 'zgcb9osdunj0td7ddekbmnlc7gsxl3y4fshb0tak0jhk2q6dnkuwvcgsae7g',
                party: 'wrlg80ran4uku0c1kpnu7dp3ujwfpahuhjm31eo2i4wk7qjqqdc6uqioiv0rkguqtzq4we2i379jne04wbxm5zf66d4twd0kbplkya7tmgg7cy8endg50rbmqinsd5ek6kbk2l7m1kafa3d5rgdb0wwhtb4dpt7q',
                component: 'y2ne8vb831kazk0ff9utuudm2gwnk552zk9g867qs4v7wrz52p0pqdfsvyc615j6dmhjxcd2p8cibsccbys5lol4higzzmx8dbwkhrmh1z26skmieg4k9om3au3cjmh1g4takotbhto98ivusq6qrr972f478fer',
                interfaceName: 'yswwex6uz4sjkiojwnjot60v75198pyckkn1onahljts56r9mkg9mv9rrsuimpxujnf3f0u7nvocstfmo2wh44xgyzhp19565y5f18b04g2rz5l3r7huwuilp2r89cq3t5kz3bnnsd19edh8xdv9zrnfm9h4r0wd',
                interfaceNamespace: 'm2cf6rwfnw92yjxyfpr5cjlwfkxbl1hn37y46i4ouu1wlv0oj98aj4jnvfvt1iyhlr53athwmd54lm5pf5g88k0oqknd80pntmu28vapdvvc3whvsq5uhb4zlzgj4s63zq79rl2nqacgkg5pn5cvebc11qtff0i4',
                iflowName: '2dgnq6etqo73k63o3ass1pwaoutcpwkxexgai3sbbvzkiakkur9x0dhds0ypag1vyg1itiuw7lyg6y4amwbf7h7yegjy8wthn5z0at82yyk69k1ptgixsq5wzwejocfn4oi5nxub1f0724fx735ilzyqlln9bji2',
                responsibleUserAccount: 'ah46ywp80fz0klab9dnx',
                lastChangeUserAccount: 'gj1gz2t6w2qxk35yqjxp',
                lastChangedAt: '2020-08-03 18:55:52',
                folderPath: '2s2x0viemtdzunpc3t9haht19pepui0gsmh61836m3knca39cgzpa8y4w5mwkkn7aazhex6nyb2y18o20lbjt6277hws297rj2cs010zfmk2dolojbob76xql6794tq0h2g36lv3qi200g48rgd9elp8gwqufe4yrp89mg3uq415tfgppdsvqdhi87jm8vwqq7neiveczdtdwj8ro9zo82f6a250y0a20aj0h8s3y0zc315141e37hvtsgfv6pv',
                description: 'dn843japh414mq4h0q7fld5qz2yobpv01rl1khenai6wosup3q3k6wqqpcbprnj34rxcw710cy10htwsys7coo77s4nqln7joj8u6o5cefv92phrzu8nqmc00eh9bmbgbgmltjd0ziu5jbqk8fptjxpd4pda2q6f75v9owdealu7ojf1lza9mg1mrytds5f9pd82rexab8jyu15ck094w8ed24g5ljytsqhamrutscd1myofdn3eu70jmr46qs0',
                application: '98359k7jya5hrt3sthbwu8obfb1sbii2g7hzssnilr0eto8sfxbapk77tin0',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'ho0f1vgv37vfhqp722cuqiqoxy94c25s7mebne6z',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'askngnxs78yb6jmvzirt0kvz5sfkl14xtv6buobaut7rnlj8og',
                systemId: '565zkdoplgqbvrasv1vvkz6sjm83cv6n1yc2q',
                systemName: 'fdgvbu54rb9vssg0xji2',
                version: 'c26a4ai71xr26jixsyip',
                scenario: 'lnh1xosam35gflt1xysb9qc5utgj4o7sjfyrk6tuhqc6cqyfftyfo3zarz0t',
                party: 'n6lb67f2poegqdht1z1xwb4w5nwsyuxqbuo5hi0q8o4uq1vt0sn9qmlb0hic5svoabvsvzn2ilxajsqs3jlpj9l28ezyka5ecik4owve69ngi53torawjtbnzk51zaveim40jqrmuqv6lkqcpn9rxym2brcm9ppi',
                component: 'ih3d16jg22pyse8ztc7rdtexrl9yjhhrk9zr7r91evzihs0zhqof5lmnaqb58i54sdpjdbz78rtdek9us7p3yg6s0tmrh28otokgu3udf0bjnkuvkuzf8ozh6wzu9wc4c32d3fei1bk5rozcby53ya7zeuqfb85g',
                interfaceName: '3sf6rkd70frfin2oymh7uv1giwzh7wsj2lljlak1ioo43qhuqdbigttpqrreexrrshpvkiqtl5pjow3zq73z8j0ndrdtktzm8hlbtucqfbaf1z1rx240tb7u3vu6e108uf7manpeorycg8s9ejylan55ll8jlvxe',
                interfaceNamespace: 'uv2c7g9m692a0gdaymag74liohtpq7cr5y2mq0z2s36enm7qtrh3qcq2j4hv6gi2a4ziv190xneo8nsl0lumr9opjl6plfwjxshrdos8o8qusab5dveo5pp5vodhc8syyom6qba0m9wh5qzp52wydlu5vjz8lc2i',
                iflowName: '713pg1zu7bugkk8dfu35w5ilq62lbqarvtt2udesr7rmyffbj6n4ybujrhxcdkuxyy20i034gsb2unmdbyto15hjfexjhph73ksmglvb68c5ba8byo6yx6swuxh80or06jro9fzj2or7m6dhoumytf7iwamcemo7',
                responsibleUserAccount: 'ufim1yxa2w4usqlxy94i',
                lastChangeUserAccount: '2mh4ng49n39qj3t05sdh',
                lastChangedAt: '2020-08-04 03:17:32',
                folderPath: 'kc7s1b0dmpmdweerr172n68in6pzyujzqqjjys8n5tft09mzb2jzthcolk0c0v8g6v7xo1gpqu0lq03kac8jlb3mjqa16yf28g6lsmi81go0igzgcwlnwagn2icooq6h4y6sm8kxktlz1hsx1mfjkk29bv1qg9p1e188aupwbj3q1i5he11xmm5k93rqoaj3foidymn6wveghc4586z6mg23wwu11rvm85pmf7hss90kti75jh9guuxl8l2zkr1',
                description: '679yqbbd4xem56gumiyzv12rcpuha3dkttzwkqs5dez5glb008qknb5obw9xam9k6vxs1yei47mxv4a6kqefntxkntp0rnxdlv64g7vjzyom67xh1ufidtiskjx995dtnto1d77e9hv0e5oeaa3j6acndyg9cxp4kdzapbl4yw9mdg88gktpa51jp3neqns17k5s0trbanza1vv3g1nxmi3dlqog6hhojizx8ng575ngwqtl2mx8oj52yc5prnr',
                application: 'fgug70wwjpwrzfc43ggqqg3b0i6bhv5i9weqvyubf2mezpgz8ofackbwz37m',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'xsne1wwj94owx7s8l05z456gc18dbeym38weckwn',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'l8iuphl9aquwxto20zjkdal9grpdzhrih1benbl2b7flj0gw2c',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'xmv0ncpon7e8id48986s',
                version: 'h7wuseslxhd9ls75668g',
                scenario: 'f8tt7ygc2nxc91ymj6felxuax743vjss1b4nn4tj25kaoegufb85gzmwib9m',
                party: '5ooxdpkorkuo3hji8i5nd5b3uds1tpz2ynuaqnq6xqfrrrw4vjg8yb63zrfuiopuqa05guxxg0cmne0xgdnfizpml4zdqgvk5pwx2wsujzee5gk1a7upwrko2wntcvq408vf3rt4xzwhhpai7ihkfkgtggag1f8b',
                component: '8hs0xmxd8znkffx637skgoa2w865nzctgtsy0nsxaidxgdaaetul23rdw6zokurvchgk4rek5nqxjm6gboolllzf3p16io02m2cvwn0v99vimhkzngjcgmbsmngpkhddz4cni85590fu643ao5x7he4jp37kwnao',
                interfaceName: '0wab2a09kp03rc0lyflc7shsa1c0lcrk737gzrpqguuxtcs7r1dy0lsgd056lmc5ipetl8ei6xa44bq7ip3mvhb0544qouci0uogejts825ppg09o2zhroig75ju29tjru85c0ra0a8kvedlfiofah3nnlbivfyp',
                interfaceNamespace: 'ypbyvybkfa3bbvgifzdei91s6kj8yxvyivkcuw04thm9z1bkm16lbb4j4dlsvkx9h0gbn0mst38g6bt2bibsm3559qrr04e6ujboh46yg8lhhc2yrh4tjb30w5glnif2hdj2zpcljh6dhocmtg5pmzzrcb933xku',
                iflowName: '8ye3vxca64titrja1um6htcj8tstsxuvlxs7gmbvmnsd8e3zkvqq3e34onuam8wxdtb4go9lk3zd9wqzu8buavv81jh7pnx7vqfxbwlxbf72qb6nwqhdz3yahbupdz3maukv4dvod1gdc2qcv9whew3jkpmvu6fd',
                responsibleUserAccount: 'kee2z1bthehhh2ak2o4p',
                lastChangeUserAccount: '2wxmz4f4h4fgiq82bruf',
                lastChangedAt: '2020-08-04 10:04:45',
                folderPath: '8qg7uodksg6zqfi5lhd2c6447ep69uwc6byjpe3xbcsab2ycuf9uyvpb0qd2qp6mj676tbzp5drhumq8vu2d4s4xcjj52s79ds71agaomrcyu4q6jlyqy0d45hfjn68was90nn08hwrd6zauzchgfay69nbvfkimxiagoq7o3gqxxijcolnbw069ipmjnrdf7b1gmvoe4qxazlk259v5esxfpfxa71xqaaz2zu028equorvjul317rrnkzdq6it',
                description: 'vikqoxli4w9t1yn9hoctkuxgem338amv2zuv2xbc0f8j9d5wvnogejbnvuvfuj6cg1umq45lj5i7dula4zcjb1c0swjtuvsddu59jhoawa5hax7ansj0ru4mpzc9sj2lahlpnlxbxlxsm1hktq734ohday3ozn8ddmuhzd990e4roo0gwa97qmetbuowb5i2gqm1bsyxh24ecmi6a06y40uo5b68cjao21brznc8t42t0doa9dyf1xl37s6pmpl',
                application: 'xrmc8nua77p6winmnoia5c5fm40gwwqt17rmblbvcxfcwa6vmaglz0xdn4kj',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'zp87eapz6r9ia2pf78gufh3l81o7f5kfu2433',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'voq1ymy67ff91cinp292lntv6rn1acd5bjo3slud',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'j40kww9bojaqfqpqy2338rrtf4a419na1c38jabr0uxxnp5wlmi',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '671o2gk9p7pwru7fon8z',
                version: '29ffare1oidzjqfdh1pw',
                scenario: 'j4vrrgezi20rt2guzwrtocse0q1fpwo01zru7zm1qrlf5eeyrmewzvp7egld',
                party: 'av1lerglf7vhbu5y6fkfkg0b23y2wi8cc2fnple57mdqmsh6gv7thejeon4gas43yjogj2c6813c87y62mkyl2lhkf7ns4fhb31jkyvbfekl8okriligxxirxcsrxqfbv6mnu67o1zovg0f4e548l3ovou6upfct',
                component: 'cvjvgv3k3suxj69027i6tnt1f4l1p2hj6uiy4n5n94bgzoliepkadrmbx5eu25uuz8rgwsmc63bun5i1zqtjvv04sp20z4y2gmotewyg8wcua2jloae503053oj96z4mtxkvatk5iszbx9fpyr290nn7kzebjqwi',
                interfaceName: 'p179g5b5pn2j8uzq0caouu0b0qbu7li72rhbsduhbvonpypfmdnrdu8ghmakwahemw64dhqevw91dvx50vrjtakiazlc23gpg52eczcfn4khctr7arf8yf14qvq4pmfy8n3gfva4d1iej152yp8wygwbpjnj6oqa',
                interfaceNamespace: 'gjdqd43agyeaa2ab47ugt4tbd6coehxmtf1jwimd659bptoecbolwi1atf2b3h2czeyq3zfc4z1zc92e6xqszysm7gh7710hp8rido5oqyjfay0j4oebiiy3p7tfjzk50bcd9jci0ipw0ldeysreljsoc6ocauyp',
                iflowName: 'dqcdhbzxlck82ochpy5bhnhftk5er5to9yuhu7c7l7fql0k5mrlenfl3iyif4szougcjk1s7sgl3mx2idom3ef3euequrvb399kh1t68g06pa7ttfdq0n9s6x6bb02aaslnzewp5ln25cruhp156cqk3h247qpe9',
                responsibleUserAccount: 'vtrn3hxrlned4fbvl36a',
                lastChangeUserAccount: 'gmysb0nlut9gfte7di03',
                lastChangedAt: '2020-08-03 19:46:11',
                folderPath: '250e7j941znqn17j02bbmx60u6qblfj9gndvvv60x65g9n64zkzm1or4ot1haow2pi8cv8lgtbxowy98zf56ki5utbhzu16v1it8o7g8jsl4otaguka606gg5m4t4flgmydh9svplz3ftmduunyuolo0bf0f7z6uxxh7wqb8wcleyt2tiad1tmhwtqszxfpgwta0cziumluk1xyzvji2oy424e9ccdua5usqj7jhxgh056sol9v3ygjz1c2deri',
                description: 'pta9inws4ul80r2i0kp5g3zacrdb50ms2vx02x1jbrxt1rzjgloiw3tqs3wl8mi3835qhxrx5z33lnys0camcwsf3ctmm9be8u1yz5a4665l8m19e59lg93kcxt8iytjcktu0tkvsu826yu3umr0qdr541rzcg4tckd2tb3y4nqnoahbkfkj2wh7ptj8dtxgl6hc7a8zmwn60izrnzw9s2wqbifu5qgwfo7ibnkvj8u88e51vkzhec3l0up55vn',
                application: 'puqt0sbgip82musd658d031f1l1eft2ihqe7jyo0d19oapuojckytfqxjv8w',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'fs8pjlxv6r0b9i8rgprif9b19vf3qjra5najkchb',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'oizmbx0v4nknf9m83sclg6dtwmi9ceis3pivrt4z0cxrybfvqq',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'acg8qb0ayugoke1cx5gld',
                version: '4oh50tf7j1vjykhxeqj5',
                scenario: 'lyvp0u6j0purj34363ejnmytdizsdm8wstel7ysodibkhys048m08layhw0k',
                party: 'ihvspb589yrbvlq12w7lk4ow9cptjcd9r666wcyiei5vkas4oqx83lfw57n4e9zzx8kmjyj9br6hu10xkvaymqyqiesr25fst1lu8crt2nyohf8sdmmr9a7bzjrxb1pmw4gr4i5sbgf250i7rzqurt2lfb3kngnf',
                component: '7d0pl5vcg17z1q7hld9tu9j8srpmhoeoqfqa0byval0hyheuq2qpogiwpax0k0t4h8n9x7voi6h01ofmoihv5efxommxuxvhx62wvmspcbor784c4hurf2jxnavsm2ic86b2y7e1pvmslo8uvzdsfuo9n1leayug',
                interfaceName: 'qoc5yc61c7ks27nkddh0hofzmbnb0nl7784wqftbm83w3t4tv1fbn3y9p8iylapva8ystbmm2omdvl5ac9hltpossm4nlims1k1vmtynviyn5axszwazxuv412amp0l6yiyxvjkmnxbecz1suwlqtwudwdquw14m',
                interfaceNamespace: '3prjchsiw6ogxqjuk9pq1uyu8gxo4m41di5u6tiuvaartvicr92ubr84ke9s3h2t2uznw9nuj4un4cweqteg3zcig0asw9mdree05f3uf54v07cc9a26e1usni9nea8dv1kpnl95cp8uv669fi7bed1hxkd2yl1j',
                iflowName: 'vz6rlhnfn75fpd60cktt5qb1fcpv8r76z9g2zvxac8zany6fehtbgfz34yx3ebvzagzohpkosot00gr3f591b5r85750mf5u846h7rsmpnmvjru9v9r6dhsapg98bn1udgu8c619olbxdtkl9w1euj908ijmotgr',
                responsibleUserAccount: 'mm7r0t0i7xvic1ok2vxo',
                lastChangeUserAccount: '8z4izum58twb8y7l8nyd',
                lastChangedAt: '2020-08-04 05:50:17',
                folderPath: 'x652a7fgniek4g4uf3a2mbdzv1i0ct5vb0g52oruyykmhsf59tw55pbprc6o6aus53va8yc0phjtsckhu1lb3oy52r5syp0scllf4u561xr5lhwz9l0w3912lbjml1tx8gkftnh44elw2dz07cf1lw628a24onvd1rfdq6t2sluelaklaxtn3qmhibt3bgbx3owat9zuccoc3ecmj8q9q3bqtijwkh5mh4gugl8yae8xilarsq7xnp93endkbif',
                description: 'w1guew6vk738nyleg7j41a7emq3gchgj3q9nsnhe8wqls49gz5o4dsor2fapeg3z0zfmh0gj8vy0w8ekh8g8m1v8tkty94aikt5q37nidqvunw2tma7eubfpduh5hto5boe4n6p5lag1s2zf14gx6ohutixfc0pavzzdtwmxp9ldq13bwxy8yxz9l4ot4f6gb7t5uwvef51gm166jcphtt8023gld3kg6wjlmx3jajetzfr6bfzk5dlo0jaghh6',
                application: 'lsvjvykuab4ei684jarsgy4ehvkyhbyih9qweqma05dftr5066xyznuo853t',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'wb52cv5d95nmyy8qjekp5t53fpfym51mfbkqcs0e',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: '2wfjlxvfh5voe5d0cxi0ad0bqaejspxy3j9lvmjoz2kvv5k6mb',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 's9wnz92qcgn44ndsrfbv',
                version: 'iuvhf2p4mwomx7a57nm8d',
                scenario: 'eiv7md377hlz18fs65vmqbfbnykkm3hoc5so0gj8xanbgsnlf7e2l2va4sq4',
                party: '5ahe2hrcdc4frfcdjy04bpx5tdlgxjsgyak10m2zstmzmgit7ph23u40rf37ftkw06lhkyveimk53cypi2x02xwucm7pcpm7z3fvcudoaruexlwz31n1jzsuh5izqcd95a3qe7daltjcm1xhahbmzo4azi1wxx64',
                component: 'amo9rkjr5qpkx4kka3xoje7omwwpql0uwa2960cgo5pzfsmg2v7wnq6ocutf3du34jkj2bfwdbo7blepjgrpuq4tevb0tt6hxcthhke9cxgin6ne6dpq126i3mh9vw4qu0ujw0cuj03vg39aer3lzdm9yodh5pqk',
                interfaceName: 'y5knqdf6p0v77rgh61x9lkwkn20csqmul7l6evsruoh5fej6ntu2dusgx8uzqzp9m9fm4b0eiqqub3ka6i8it3y4gc6wlgmt8u8qpatmd7l6y2c2gxhy1wc2jxgb9s3y0wo198pqtx4oqjjupofbisksp2giw8hn',
                interfaceNamespace: 'wvmpxmwq7p3r9uurm4cqe9s8u4sx510cudpxwxw8ek8jxd3olrw14nl2vik15abxzl19erkixk1zj01mcp0u1lmcf043yp9m8anci9b10j9x2lyprnumbr6d4dnlazcxwgb3cni81rwjt6wy7lfgbx53lhuy6dyi',
                iflowName: 'kikdzl8lqha43ubl98b2ork3k4nxmnvuqh9nb3bzvl2e8xkzv2nhjhfaf2uz066eddmi84lfm58xujuhv16qbjo4egc915nfz6ztjkr33wcbv0mvbptl1e9txxuc8pjm6js79byvg408l10jdep8vsurmq4ij06b',
                responsibleUserAccount: '5rw2ctgrb0236k0vjnlz',
                lastChangeUserAccount: 'gpg29ufeznwbba7pxrcb',
                lastChangedAt: '2020-08-04 01:00:53',
                folderPath: 'f0t0eb38ximk1x9gl2t6cjacl4mbkpetkwy4cqtzcr58cs8an8mprfvff4tmvwv1winr5875u7p432o1oh91bgnc652lk6nji0rwg7iijbxubzquuycvpbtrqjfgfiftzvgy6q74sm9pmo270zmsl3xlnr5xivadmtu7ikxyuc684vxs67u0gwoa1xlh1me08g5z2pyd9s1cwicy2raxl5zwbxnbjv454p7677bbf4b304upatx4iaub1zcasys',
                description: 'e84omwqhthon4f24e3wrk2esorw9o7o7evvt9t6cqotermopilcuwp9jxbkd76i9o8p9aprqvg574i69uakfwhzbls95z8cslcq1hw1f5r5qcpt0khqykd1qx7k09fqg5nb2bqnlt1pnmqz5ro5d22a8bxyip0vsb4xgi9conk5ufc26y3ltw2zv3lq4ux3bqwugfj756gi2fyu3gktutk1u8ba0hw8y16tfwgdomcwajmiypb00l8sucaevwkf',
                application: 'xd1scbtxn59yq5ub6ufi5spxq8x11qj27stks5vd2ojd576k3pozek2xx1fh',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '82esse9omjzu6quijy37q8ndgcwp4nzv9803o002',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'wdbw4t46ju6www9aezzgu90y1x22e6y217ze14l2yyhdqpfamc',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'xf12q9wd1ykhmijv0v8u',
                version: 'eovfyn1to5hog2ifdjau',
                scenario: 'wz20rtduv8htmrzjury6t8mgcg2v2bq21z89tyvgrke41b846yi1lclstmkj7',
                party: 'pmz1dwrb6exn2j6icduw8o8ru2y7be83nnv6nqppjr4gst2ajah7cpm2iprapsuuscwpj7et80tdzj4vfawqskl58o2p74vfc1m37a3m525plbko42r0opfelww9xrzdxp4be97x6iiajsa0u54t92mt6f3spm7b',
                component: 'n9jscj6edmxnzezqfz4uap7pw1oiw6suzv9dv9m3new9y40de6nfcgj7roreewwjp2cc90ck5d44unyytupi03qwphtqwgt8x59wy27slqzlowpmo5dei6usba8hn70ure5d0iinbq3jbfm0ahv1ssxshxmx1vi7',
                interfaceName: 'gm1f9nu2p22gfcna601dio6q4rkdv2hhtmij22fkrdtb622nhqgkv3vu4hou6csv7r2dwo9q5qxicsf58p1vmobokhee9o35y1oj5wc874l575oqofyf5p9hta614ex1o3gi50ubai576rq924v5xs061xsgob0g',
                interfaceNamespace: '0ppmuof4f2qu4vii70itmaneved7nsi787xiauod407yidpml12y51stohqoyela7h1svxucojaw64xr9qvuplfbwuclrdjmo5oekitpq5kby2smexy8246jni3y475ibkr600kfqoy7y0k91tav3tel0xg4ln4b',
                iflowName: '7idwy33rbn7gv86r151z8wueqedei3a655r2niij8g1eadqkgs05atbgx033w8mbtrwamzhv1ut0zxkjuacnibwtq2uvh09gpf5wzr16g5azxvhbtj3c9ltrh787x38dm5n7lhbd3de9gag40vb3ck6couzkh77z',
                responsibleUserAccount: '78ov24xsgsdyoolwddik',
                lastChangeUserAccount: 'ec001e325w40lgnu5yay',
                lastChangedAt: '2020-08-03 17:19:44',
                folderPath: 'qunk5prqsctjd8rmi51k2f7d0x0dv18j2dkz7cxvxtx4bglf3j40mukal90eszvw7dwze9szowhv7vqud9yprzqmdol19hwpvzfilcpdjy5gtkqtv7r2jbvqhg46ss10bx446dcwlxor8oh3w7pve594krjd5qre5kuujb6n27pcrltzyi4ocmc225nbz5bdxjmayjd1gf5065t6nq0vr21h2bk46mq4axduy57yefdjvlq6hwghalg6os2w9h1',
                description: 'oy6ty6tefvd5p8wuvpus7mt0t7ohwxrvj5polod6xqqiuzdcytop12zfpmepo5weotpc77oz1iv6qxpl9bcnrm70xx0pfbglaj8vo8txrnegk76y3b7x6dx7po36gcuulkii24suuailfst7dq3l3kinh8zkltu1ygpprsghsoevxlqy0rctwepmvkzv1ocon2u7gfcvj6kzxv8gwf4809u8npzyg6j2nk8mtbblnn3o3dmwpv5y0hszq0hl3i9',
                application: 'fs5zk75ph8krdhc3ws4uaurz7jwsi8n1xzpxyptlhipd3ilojm2bfqn0fnfg',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '8qgyf4kpjdvr3uybi6lbniax9hjs7c8lja2wyhhl',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: '6ctwcbzijihppr77dhoxncwugg12rx53x1614ohgatvgoumbbg',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '5n6jjv1yqwybftwznu55',
                version: 'ibysy9qp8x8wvw5aqipt',
                scenario: '54shkjv9n9bncrwyy4xfe66xl635z7sauvkyx2u7mbu36kr2npdnz2z9jrsm',
                party: '0i8jf4vtc8luvm4e70rfci4s43xdvttlic883kfc9thpxl19jzwvmukyjhk29vytjxdm2b8atpd8b0t2n8jqz6hqtkk67y6le587o595kuu82wew7q8anz2na5mo5vbq901gd23cuu32ugwbxtvxivqs142cyg1kq',
                component: 'o2ho9787r195t4jmumrxr4blp9kp29y5zlb9or2zjwwk2z4vaof1cs2hjkjfj1qby3agp6jqjfc7iyxwdtlwtaxczjxp2pdgjtr19wbkwxcccyu7yyc23cjpu2q9ncjjr6vhsbocjej80bxfuvifqz3u92cfwvdh',
                interfaceName: 'feisjqui9slma7aneadzhrsi51xjnu4hlxf8com5c67admcju2o0f0u800y7xpitu87z1dbwzvfh70rkxak8v38obcy298sk7205zh1gl8oiuqt07qmjjh4lriphoyuv9itopf46pbbdmgai0ytu9d82yf5jw6zb',
                interfaceNamespace: '5f363nm8ylealt0kvdfe0vpt97dx3umoyt67cbk4oysswf3eodouz0pv2er1tmy6ch2zfw1isgzbxczi57j2px1fv9dgj5w1ziudz3dqffuydq8wigtigxtarszqlro65h0vvpqieuntg60xzpzxfx699dljk9ti',
                iflowName: 'pmza43f9wyzkh813xzx8wknu27crpvilee6pa1c7fy8mpcq0ymuyx5oaoo9fu5iwmjp8yypp5lt7rxjydafg5bx8ra9o4xwhep4ulqgeujezy9kuxnjr7qesc72l3drp7wxufe2lt5k701zi3o9fvb76gdjkipck',
                responsibleUserAccount: 'x8g0gfk7m3v2cmraqiqg',
                lastChangeUserAccount: '1ivsrv8peux8e658czxu',
                lastChangedAt: '2020-08-03 11:26:19',
                folderPath: 'f4lwbqb3e86ruy95jdzz4vzx2xdm4y4ufeolk4d0c7aoyqkpobhzb3rrwtzpgi41k74faf52dv1wk21fjo002vlxk9bpcnhcaq4l41ik4gkeb8c0kiibvh4vpumg8hx9aod7j8j2hb59a6nwxyflkfjypwpkyv6zo34m7x5f6scv219h07whdzf4tl4h08q9an6k80j6tv12lpyfexec8qjkl8s8wffdq0h4v7ck7qjzig89lqtrp70kcook7xp',
                description: 'gkhsh3j18o5fizq96eljbek4nkdgeatt8qcj33xul637d6jya9lk0ve109393209gjuwcgx5n9qokhz111dxv8ysi1tfz1i9kfan9a3folwzn3lm1k5yuvq7golvbr89e4eqvbrtrkpo8iimwfs953mqtspldsbyllf30e6ns1psui3vhgc54qw45t389nv0qva5sfx9ex86a76r1bg8nj98mq61bqskrs2skxcet0ujwooeyqyksa27x183dxr',
                application: 'dttdhwpgnpe1h24x5y0t299e1d4mrdl61m0eb5a3hlsmsqmmf1l05iyjyofq',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'bewwusg8huaj1p6ta8jeu30l3z8l4visuhgpfd8j',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'kx7hugc68zkdkh0u7podvdvopcxw0fv8o9dw0kbs3333zkhqm0',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '42fadct9ein9ugfydqm7',
                version: 'z90qyap5n738oq8ik17g',
                scenario: '2id0ecso5vv9jbo37v4akrk2h4nwil873yhr6un2smru6idn5nq7o5sc35bq',
                party: 'rhswn69m189z39gv1zm4bdqmbv6unu5cevgzyo7gv91y06w55c6mdxbv6nuf3rnnhb7i0ks30b5vlxfjia33p2y23mgljjqk8po9py7w83x6d7iuftgr3wp00e05sifbypkyvby9k6svfytmhj2ks81mmyo8vi3u',
                component: 'tmpf5o8evqyuaxod8petrw42l9q4k5bpyvj7kkhdjiv82ml2bx5egx0qfjob70tmcke6bk4uxovn0lbm5icr5v13343zuiuiem4d6n3e7f5uvly8tad56lv5zt3rj37yzqgpelfv9x9v22x8cb3b89bm3sufv0pb7',
                interfaceName: 'ai7ogb922do3hlq95t0gfv457h62wiwzshsww3pjlwbl8665vwsqyg57oxg46cel8d7zh2c0dpdoejkwc6yq8z9uukjshme0os7mu3bw5iu678rgjzbqaxlgudszu6ojopi9og3pj85ezgvbdi4erkt6l902miqx',
                interfaceNamespace: 'ozvkgjxwi8sc23gs3jjbosls9x1hv0z2iej8tw0p4sm0pa8i1o4zzabq3whr91c7pnskprd7djc65opfo78hir19ebt6lsz6hhdcv9wf5hkfk4e9mtut7hqvi6njeqgag7e6wrj9vklbnx7klark5flulfw4n80t',
                iflowName: 'ir48vnj6n5xdufbu00n0jmpg84me7m49bnubhovsbm6spdoxem4koaiz3tguosl8610vsi4phqjgii54unocq3ewszt430joesent6p4vvf5rurokeiq6swn4o8y1reoh4g6j4njmrdoq5ykor93oqxkh2df7aqp',
                responsibleUserAccount: 'prtlnwgm34f5mhfx1kpn',
                lastChangeUserAccount: '9wxcp3gwwiqgk2sjqbq0',
                lastChangedAt: '2020-08-03 15:47:53',
                folderPath: 'hoteh221nd9ncy5jijywtxhe9n2h45e025jh37j9ooywzvcrgw1ggie6r84nxqreffjb2doi2l6fiavuzz66rt75kponyvzlc3dvt4nzhd9z6oe0q5d4vgon8hyn1wqhqmkxh6fo1bf6pxkn9wdcni80nzry7cjhp8gu9ifbrmtg1tf84saan3llctudojn50zxi3hrqe4r5unbqpvax1tus7gtmkblq0v01tku3uc8jne7cxxj98okbte0c7bs',
                description: '9blbliyom06w1tlfgbnny0ja39qg4pk3c9zd7i1k1r2rc21hcnyi575wi0qhn1cew9izj52jb4bnrisl6hw0pzdyp6q01ll4nqphk4p4r9n1wbj2vye7up4bacaupc11bhapzmn7yb6no1nigxl4ndp89c390sbvjl23laepe3e04rjiaz1g3ry2kq8u8h23f6f9geufs6hadoqvvegmurh46b85oobs1dn8bajsjrnca6vftq51wdqdrjp806x',
                application: '40pqtaa5qr3csdx3vmu4p1wrtyfuumb0zmqdt5tq6eo15zzen9ilhx09brcg',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'lgx48mepj5fc3zsdxazaw3mrd2rkgkagqvltvovf',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'kjep2en0jvmcufesywed50y3wdjx2fs43sffec2pvs1qrgxjaf',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'd1g3lr8rh7db1xgwzf55',
                version: '0tqdz26psbuys49vulgn',
                scenario: 'deiyo332w6cwkzvux3oiwralibjt00wgqp7z0ufe3pqycxy491o5zahv23xu',
                party: 'oam1lbxsmfg9v95wj71w7outygwehtwr5mr29wanpeiv4hveezy7gpek033ekc6qd1h45ir7wkyuf8or4ax6hwzjn69hdv0cc3ml6jsmebh9y5i64r4buxzj1t5jl0pykm6o1jltjpqn8exij2w5x7jn1ha4xnno',
                component: 'cz64ffx40qqd32g9s6457al0q2osaecgcn8lrfuvctzz0ntxll71v5ac1y5i5ma7qbz5spv1wvw8tz7wpb39lpdhir21y4tozehauh0tntua8u48nr97vuz0e9or3u55q5ojajt349zxuzmt3f58som8nxnvdm0z',
                interfaceName: 'uwwv3w8b1e8w4cm1doadj6y6qz3wi3ps8fq6884g08o6r3bkt6ivvs6g1t0mat11logu7m1f9g3rg8vf5ltor0d23dmi6hprz2wtqlblhfex3egzc9ybwnfenb2oum4j2a19ww9r6k7uwpbizy2qqdr01qnxqn9dw',
                interfaceNamespace: 'ub0hvvon9zp90pt986x2vngngrqy8iytxcbvccaajqoevnuqvrub4mm0ozlqtwriwoqv59w8wmlm895iud202xl85hlmfhoi4foftp9hdzo9jvao0j8muqt0me08pfcatbmmn7hry8ynuxnu1weh739cz90hj0lg',
                iflowName: 'x1y0f764ikwcizi5ujeff6stqkw8akmg5dfuf9qt8v0d4rn1a5iw1bz1vahuavq2rlj8mp0cq7x2d3t734czbgsbie0modkr16asawdemvqy5mgutgo2x9hjf46kd7b9txirp2ulc4r9iuqjjhcwxrk70sojn1mo',
                responsibleUserAccount: 'x87b1wopm98bqriodlll',
                lastChangeUserAccount: 'ax1jnoygvmvug48tbxmg',
                lastChangedAt: '2020-08-03 16:18:57',
                folderPath: '1s7pye8hn5qrb3cxitt4xjzn9pybtgmyo5zn1ciikz3mzqe8k1kjr3h5tbfuzm9ug0vhw9r2oe7f2f9ambbtms2bdxrixf0p4i2sq20mp8x8veyjdij3duzkkojpi96v6nw2ohymd7h50wqk9jg2oexb29xico26droopdem4im4nf7pm7gvy1pbms0vfize9ki6b30lwp1ac0nmcw4jkvqradq4wyag4f4zlsxprln53dd1uyttb0d31cahvu4',
                description: 'qme0al8htznu7hjapukezwbfn6lljxdg670960klbto9et055uo2de9qke2hw9pkq3quksdm3hcouz5s6w9lq0hospyytvgmm94iobyw1h4rkq3jvon3hbxdmbe4a9iby2b0jlr8099yipakc5du6x544qk7bowgso7g6md6pwsuyi5u6ejgdnbikbasrh8kqe4wkk5pcok6a4k2drs1k2hcuwr7au8mffz2n777bkf6us7qmnnwrlv25nsrkw4',
                application: 'd5ax9oz59oq8o0m6908rguio3yy70u7alcmeah7qyifsfzhowmksr4vgb5he',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '4sk4radb35ptfvp3qf0jujijpz24t67ebx5c27r3',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'mzrdjf3akytq1shntvvuq139p617xvicka732jv4402a7wqosx',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'rrllgaqcpc0xidsy3xiy',
                version: 'tdh3ypd51ocdbxxuritz',
                scenario: '8jntnmazxay2e5psrypfsok8e76711cv0dw497ixqndajaky4kgpsxveqexy',
                party: 'vab770jaxdtwaqh30nnn8sotqyv2aqpykobn1p86c62p9uxgfldzpcbgoiroxlwuw20llftv78mslxp477hhgyks03uyooyh2lh8cc2rqq26juvble5vld8j7amoeiyu8biiv7ywindk178qyg48vjeze76brgsv',
                component: '5q6dgwha9kmnrz76ri53d3whe4t6flub0ulkh83beh3oupd7n554iy6xmgpibvti1bg0sypd6e9814eei27x1fs84k0nywzbrng3b0m6bc8689d7e8obd8wffxr65jy76n3luw621f2d2x6pg6tu60wbp6bri1re',
                interfaceName: 'zfutwn3690llvso8i6sfbfave2xs32s1fiyas01pae82w9qhcyiblrzyn05v8blckmnqs5af7gl4fygenmgugwvzzf1iievt2054mtydg1sf9t0njyh0llmojivxe0j17njyhqer8omdsnw2z3eu2ipl84wmu2ya',
                interfaceNamespace: 'aq6utfpwpmtf3wojmvx5660bkh2v1a64lamo5tvsgjmgxh16872ovgdqv71xx301ap06l7t2sbug2phrikup0y63zcnaixryvvqk7ygr5ijdeyqykfu2ukn11wfhwahyfy45hf59guke533mngwzadm1tm4jhnuv4',
                iflowName: '7ee5r3jlxeybfy26cu1qfj8hzhx6ovy84knnxzxxyqq0ixw3ginskiszz6ovgbkda1ef7i96xl7uv0sigv3eibevvs42zhalk44d7klibo6gztvsllq0zg3408wsc7ctvmuynmnsn2cwqbjuv8t03gsprt90xu1j',
                responsibleUserAccount: 'cxtrj8llt7ciarjdn4ec',
                lastChangeUserAccount: '4ixcupvwyl1wkwyr4xni',
                lastChangedAt: '2020-08-04 07:59:03',
                folderPath: 'm24fhm3haqm8c1iapaw66un5joz50cbki0t84749go0kvg3xr1emecnff217yboqc54q84y1gelb40ny7xd6f0bol9lgdjacipkmzseoel87b56awake58t55mzh1j1zcn8owvlej9cmri1mjbpdz3dk2ymd36wfngmurbexy10y7sw7b22si4ndn2056gub87x63zuzl43thn5xx4czwxhtmhzmjb3imfderg0oghvf36m1or087fg95ktjm8s',
                description: 'rntsvuvheyzg919abhlnhhr8t1autna5va7smqqslyrqf96xys2s29kwag9gm65llyliid0dk4mcmm2miu42ukmyb99v2hn6fya2x2ntkxsh3mjljdrnwrv6mz7dr9q3m7pi0ku8ptcb88gly2dedj5nt689bjdgdxcciqawc65poyertbjqc02ev38ikb1dirk3yuhwpwagl9lbp5fwuy78lnpii9ce3jh8qphwte2midp3igxwicb51vspbxh',
                application: 'v6i5unwy3ra32wdhg4xohca1eu0cd7fvk0jfbu57xlu6gh5g8vl8mjyqrgk8',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'obm3plm7fb5yriflzqkz3iopojrf1qd7v0ncani6',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'tgyezkgaa4cwibll5tbbc1dk450mj9lnovit7ckm3dr7ql29ii',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'ghw4e16tqj5v79efs7rx',
                version: 'zolfipwzjdsx4bu4trj5',
                scenario: 'bsfcfp68lcqy5ahuzz2bg90eorrxfln9o50snf4igohlxbgkyfc9aptryem3',
                party: 'oxwaiemo0jbwy0eum8jk2kpg2d83jbz8fqavzkezc35fsz6q85be3yhuxtkil01sf5g7jr43maczmcd109lzf994b55cpjncghv5m5bdlx1o9tqgzbhcq1bg1d71k8adyvznr819we04wnckg93z1o9qk6pyxzj0',
                component: 'euxvx7h6olkws8w7i29waq6hdmc6ch7hd1ibncpgat1ciwsrdvznv0k2pb0id5e61yuyzbht63bfnuqvz9g4533s98rsziavskc0kx6pkmofuvvy2xvm1z1v7f2n67x5bkwdgyl09qpnj1vqsd5tsgpv7v9sq8gf',
                interfaceName: '3iywi6rqjidzzj5mukf9sqw56j9gfuxpg6gqjg05v3sp5kfjk4jpcac58yg39j91ifh1qru5yy5epz6klh8b4hcibnba8ulqlzvlphtjo0fwhmn09x75l80dvuhdxakyseupu07ef1iiapaav6qsy30mdy7jkinl',
                interfaceNamespace: 'dsjspw4qmby2mhqih4hfwsoqvj2qzt4vvkr251158avgufiw7oysduc146gibn4esrycaye5ym8zw7mrj5u06ef7p8av62dlauh718wz6iqmig864pfenud5ieikbigf5n4a49ywe6v6osbwi64hos7xiu8ckp5g',
                iflowName: 'mj8ven327ma1i71500xfwua8dfnldhkwmbnsjkcr0yq80bkmzyk24pu0azj32l557dx5243s65msp17a3iik1zestwyvf9gxfy896hc0l0oh0vksjot9zc891qtizyxomqh71t48n8ms12szyojvye1qzk49jdluv',
                responsibleUserAccount: 'bdnwcea3ftljlc567k4j',
                lastChangeUserAccount: '9v7ilazpsyiyj5osjhhp',
                lastChangedAt: '2020-08-03 21:45:51',
                folderPath: 'h3qdwfuak7z3iti0dz0hjqwx4acqn79ynj8f2s42e1zvlmxhhrb8jecg5c88n9jshnxvvobr1wai85tv43d9ccuxg6sxcl4dq21pgoydo59udf1csesyp6mbp1gr7buxuryr9ffldjh52jeusd3l5j5u99vgf4xbtl94gvpcysir3zwfhsvy20kje4dx2smflrvzn39x520jjb0x5klyeuo3j8ssfnyjdxkhiw2xfisglvdrojbddomv3206mg6',
                description: 'ac5a0f2xpgbazl17ymvvqepkrahioiuexpwt7f9q0xdx3h9ib6ngmsq8l9bmbi7i4cirgilo0uzu989i4rnc2txvhq39du72btk70ad9x80imv4m2bewjmpk68srpz1u6fnn1kogvdiig1xa6q8pgz1qtjjl77c2efcx3qv54gu9p2cxsmqi3dz2f1dpvp6eftk627pwtm7ajf14cnlhrkjwclxeqr79vhaanlyytnxdpmct4i9gznft8anw271',
                application: 'pzb7fr04u48tu87pwxh4nelwnn6ksqr8aujiij17ckcxovvs8f16rtqcorc0',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'fwcrc9n2tvzs4c8sl3khahu8j4ncyz27mhncnpft',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'rzyfhlst2pyy1b5ksd9m5ykrgznluae3czq95a045w2727fnnw',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '0axv8qoaab6jtxzd4uwm',
                version: 'px6ka40z017pig9u88e2',
                scenario: '8gg7j0fzopzlo7b1p4jm1kv19xr2ngljofhcztf8md7hd6zpxcl5ehc4jmjh',
                party: 'b1r1a0g60zruvjvirs55y967xkw0l32fnhkjbwe6083haknpzg5g03t6nrpld8payfd069kihoam5xoypw863jxblm2qfkz0tjmvpcyw51kcqu6l7ka46nm4i9kw2wuuu37m1bxoojwitg7z9ei0cfj5pkgkza8w',
                component: 'pza2qo4rn9zaqfwa2va6m49cdsf9obfqthmup857fu0z8luuydreh1f0zqutlowfpusqreqwgy2x8d9yy466caophrhb88m2f9oo6kchtls5mcxzh8125pi820bnspkvcnjo908em7g45pz80xwkpxrh74xiaiyy',
                interfaceName: 'ql9ygl2ezi39ur2tm9ezpzaarg6fslcmew1b3ualpsbgfo6n9j0a33eda3wamdxwcvjptbxg8hpw04dqmb0rrgj14zex63zri0ne3x4e50yi1w23r2dzhqykh1bjlxkq38dvd7uiccv0cl9m9jfppr0mft74puj3',
                interfaceNamespace: '2wfqwia26ig5e5knlcjlm1yzcdpdfr8iwpt8ikkg8wet1jzqqqtd88p5kpeclwhb8jztby1by17ppu2f7otcfr91utv2d42gtgj8wjlrp6ekgnuivi81qcr41i8yfmeaz9etnccg1e07nobcizyz7n6cpwg07vng',
                iflowName: 'dwsrqrcienc9lxa73k95musvxbk02nyygogmuo68oucpalsbxqlm7r82ppo4ywc9eannthu9aj21pfh55p59ld97qnqe65h3ux5pms6rwet4yoh34sb1n66bhyzabds19romfbvomlm11ki3957c253m16kt4ak7',
                responsibleUserAccount: 'xvye98o6m6ltwi3ebixc2',
                lastChangeUserAccount: '7hnu42wzoqaw1qoce3y4',
                lastChangedAt: '2020-08-03 11:55:17',
                folderPath: 'el1jabld8npyqf2orob43866fene44f5gq6x1h6mw8zh8wvc0surobk74w209hxp8iymkeb5b1035ei9pv43bssam0ixmx7lzd7jjrpb2ml8h2f5r3v2i5vt377hbmgnmzjp2h22awztugi5pxpw4qz9w4gz757hx77hynqg0jrywwpspan80prkseln7oq7zcewp5387l84txql30g9ro1qwuprb2qdgv5gyrr9z1t7glu9jptkzj34xb2vf8y',
                description: 'vc1xhzhxx8fls4iife0i6f3o69henxpoc6t0ak8fzy92dcv9qb9f55fwgcovfx612ajtqjuxsbf45f7jouft1n89h2xnqkpir6rd2k27iktjyp84t3t6ujywggfhkvieshyy7fqvkke0iwlz12yovkvzmgqib2mjywjsxqt24hzzpzwp8014iiegzndprf22yw97xb1zf1furs9iax4ou6eadv8c1wf83ld6teb1fgzwvjhivuc5ijp0zz11slz',
                application: 'i9q8olk2fpwn3qzgz6zzuzsj1luxjnbkwphbcyv24qlu5w1oj5fenmfzgaxz',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'b04wga6mwc90c3kmmssviaytldbrjvj340ilamsf',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'my0vblqtmumifrncpz0ksqvuvtt7kpjm3ltdxwz552hmiseup9',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'l2i3i671qbrbjn7agxtw',
                version: '74pjvj3x3s1vieafbexk',
                scenario: 'pzixy4a7afqin3t18fra7i6gflfjzlksopli8h2hmenzz3oo38cltico0dmo',
                party: 'yzft13uzw7vo0os4vu3r0csu2hrhjegrejb71apko3htoc59fb68p4ccptvllsskr2xw6bre0etzqwejj7hza5mnt8cws5kwqm54mrdbogb9mc0hq499ynr1np5pzx7eogi66ujzemelf0ca23kk2uny09tgd3g9',
                component: '1vawbunhjwhn3jg0o6hutd5h8xydi4u4snkglqakv9lqxzeo5hzojsxewvxz5kqfrwd6umwlpds5q9g4i5bskadr1bimnaojgo3te42e8kq6agmpjqdl3ov0p32ukm8s9422ntvejo804507nzbu5nlxkmpgk0zx',
                interfaceName: 'c0lvd4vf3ny1rj9jsavtexlr5kp4lcl3plv1pfttmli8b045lufr3vtztepl6ejwsr75fcerqntz71jsvona7wuh7536810luzr6f95orir7swbr93l2cy1hqpysu45st1k9scq6a59185ab8jluz7hrojdeapwg',
                interfaceNamespace: 'b8izjvpc9z8arql8zc5tqvjv7p9z2r6tgl16tjo0jg0s4wa73y0fcxqyykm5eqzcgvl6cmv80kef8i8hggry6nnnoeob0qcvl7e0u7kg24t3ykzxcnhhmakk2n19klv8eov70uf1bas9wo2extbhuxp5sac7g3r3',
                iflowName: 'arofbb5xsgvbjje4yrpllkzoxpnmrmgdr73f9ncquofakink0nq7chdqpqsmfcrac5mthwyvvz7qourrie8ijlpol5dtq69f74f21lq1iulfa87i8nor8gb6nt9bz8e3cfu7ydgtg7trdvzz3y3i67xt2fz1pcsa',
                responsibleUserAccount: 'ibg6s6194fcr5yoo1cfk',
                lastChangeUserAccount: 'bjzm1su1zs76qbifl0s1q',
                lastChangedAt: '2020-08-04 05:44:34',
                folderPath: 'djq3sf4v51je1fn6ofkhdznu7n4fto73facy37u5xzck5jui1tip2q3rlkvy69y3mq9h0pwni7rjzmnswm1w8gstczj0a4oebxzvgxxqhz6rmp2a6t7kp7ipiacmchoi0spv3fnm190brxk921ed4zpzbil5fsrlrohny32amni5fj3sbbqjsh8u3ocmch7nwrp9ztzswdhq7q4omdan28063ql2d09y3aqcpivo2adb9ow0o3156w8cp8e3dth',
                description: 'vybh1431ryvt1esvlk9ez9n2r66f3l145nuwz5k0kbc1doke9sm81m40x6aljp341jx0p6kmxo58s6kj79enj2nbgtoxoz9utz7lnziygvif38kytj7ap8e6ets1b100reg0si4i0ja822jzhgkha4j9d3xspllz98ga7iopyuaoo3nwyec8r8l1f3o7yxn457dpz83l5f9ncgfyio9ecxno26mqqpij8s324oqp5qjfythr7uoglpo3hna2fqj',
                application: 'e9pb0gpf4pa86ny73t5yzetx0lhmxqx2i6bw19w8zh81qdijatvmphdjpaug',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'sn9n68rl1wptrz0wqj5lwxgivkn6txh5lu5cpygw',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'zg158x981vo5x3iveapcsddlmbp79whccbonq7g8fk0lyfijr7',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'vuppx45p0fd0x3eizr7z',
                version: 't4cjayoejev3c1so1l3r',
                scenario: 'modml92ib47dylp2svw33kfjk3jttn7e8o215d71tvhy2q5jbo288k3nqltw',
                party: 'zdttio2a235wesinv8453nrdvbud1xkp1ylu5xa0fjmobu3ohqcmlrs9cgubnsqzvsvkryf3ddcngeqmjww3owog0iunjuv31uahyj930bscp2q3b6loh0l71qsvxfsqywf33p0443pdodprmjqh00zg2zafa610',
                component: '16f4lylz84yq5nvm6w14cd8vpoc2xs1ubzm2xmeaf9rybxyoh519e9maskmsd3z1o107hndnbyu4klfgosqe4qutv427xuhovin1hgkk8hyfgohg3jzgg3h7df6mw9bsnuor5fh96mgsayjy9m79rrgd2l06chiz',
                interfaceName: 'qz5ft27o7iszkcbhr5aw7zgnkpcuck69d1z24tdagfcsm79jbjv242klmd7ehtqe4a084un9f6i1isaltw619u092zbm9rugdjxmwhxsl6ois82usiiskps0tdot6z7wx5utf4v5c10ilxxpxctkz1cqjoio73hf',
                interfaceNamespace: 'x3fl2hbz8pgh44oqt5jocvui0v7nm3q58r6ulc8wuc1rdinz2bso90wjdqjita6940ta4rm1ss7nl4mjn555qprqzjq524mbf8ge6erz12dqorab7oc61nfrhiunuk3d0c6po95s9bwxio1mssbpive6vcfpb6kr',
                iflowName: '2ly83ynth63v27ohhpehcr5nwd1xg8w68ohzlx6r61l9j1p1olgwroyus7m6bbnoyejzbwigkp5ypjud77x7b59mmx1oa639ekssmv01pc3pjl1hzxkf9rt5wh239a8wtjs6to6ncjrl77imy7zt5i6x06ljjppn',
                responsibleUserAccount: 'hdpf5m6iynrxows9lk34',
                lastChangeUserAccount: '99bmr84w52ngdlkebo2i',
                lastChangedAt: '2020-08-03 15:20:28',
                folderPath: 'x222m2qjwwtg3jae0lmhs685hixakd9kahkkh5jks1j1bjho5cqsb2078h8cpkby6rlj3clv1yqznvbd0sxz069d3w4xprcnp7h6jdvfotm39fv4h87g5dri1fx9ypx67on04mzvl3883923ks9c9447rj8gag8kgpckh3pqorsznignft2uvhskjnxs1yma9n1zgvsh8rd9zjrqiayt65d2xnwfaldy74w2dyii6diedsfwqlhhlompjqbxyguo',
                description: 'bn3jk3bpo60wojyhx0lbrrsro2j14to8f4qiywzc70u7x5h1aek0kqu4gi7mwpc4v4bpakkdwc1o7i76hqwyhp44p8b3b69llm2b9vi9f3j00mnon841srf9871rc2r0ahjislowjrrtaksrxsun0142ivq50d8ftcfkxyap4i32db6bapqtk4xrg5i3v4hfsc8tsuj8v66fl77qdbgoj17bzgih75l3fpqq35jgtzaq596iek26xfvqvlcqmun',
                application: '8076gymc2kqqu73hriijdlgkmatmqglhqizsdf6aql93o38rjbjms1nlxlr1',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '0d8lfo4lqctaqwg88loh28whj3lff8k16chb569j',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'xoji9r6y19az3f4nltjswullu6l3awkvyl7789izzh0d6ldb4q',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'zfocx4xoa5s8e6cjy31n',
                version: '7zko1s8u5aww2d6jn3wu',
                scenario: 'ersc5ir4psksw9sdhle0fiiiq6txpc0xal5ejrgkc4baqwfojv6v8pt360y9',
                party: '6d8k4fyy54b519l3nhna4a0ep9fe9daozah37fosfvn9ndgli8ywg2ox4zbp8w5d933sgcd7m2m6d2cju5hnu0g5zr4lhhhgfhsm19jjizbllr9x9jyt196h8iyb8i25zx3llrernl4i8g66s6zwheeb29voyi8a',
                component: 'fngyj40cw9rx4v7z1t0jfocxn5k2iypoc0d2e5kyixunr4x1ij6bz273uh0dokc8pl1e7rlfy8i3il46ruj5eyjkkzh5bedn7o1tcu2emkazotep5758hkpl7kujt81fklcijmbmad5quxgap71iseff47wwebx3',
                interfaceName: 'k23non168aenahc94i5rdk1mx13o6esntfdszr2dfykib62tl91u5bpq4cvlf7o8lph0qyaz52h6pjbp30jk66qe2tk63hkv0p89d49ikuklfwco9grb8w9ogrrp09orieo3v9y5jfvfmtahj5pub5i4pbycrq3z',
                interfaceNamespace: '78aphevenshs6dfg380wur04vtj40x61gm3fguok5z6ecff0ugeuolanq8oucm6zwarewkd28untufdqge7ucpmegeiotyde0t57y8jcdzdszcgwannmpg5evzpcgv2545ykbn1re7kmtrpxxq5pmu2mtoyv7vio',
                iflowName: 'ok9uf71ebd5hm33b1sq2mbm7jpii3yozggcdal2gr40gyn9snw6u0ol3qyaw48kkma4xwkn7733lty9vzte4gz4fxhdln25hm0fvz44szab3igyoc76b24io93lxtu44dtn80yi3cavggw6t7r23xbzl9n5y21r1',
                responsibleUserAccount: '32gflwvyzw03btozcoqe',
                lastChangeUserAccount: 'is8neuiejrcw3d20sdkx',
                lastChangedAt: '2020-08-04 08:48:50',
                folderPath: 'lpym2x8v0bq68bjpcg9ehktairgrj6z5ggyq69x3d25rmce2bgcn3tu7y4sim7gr28u5bb4vpfablqwzia7lx82x9eo0qcldgymyg03k3dzj3qpc6kocfhk3lmvce8qflt7r1kjglg6tl1m4775piq50l6fvxke0y095sq7okhicyrdljj14gv9zfujggcbkn6wuohr112jufeqqpkq64uab3lph96rnye4q55oxb51ezxrvba57xkj4ohedw11',
                description: 'smmrzge7021unaz93x6yvnl6uject2quirednpo7cwnmc0806mmra298eiuh31n6uu1wxfgfv2sua44hksufmm0zh0go5u92y2wtz8rt08mj083lo6grxbk06svg81fe6tqscqjug6ppb51b5o96jdf5aw8khz02okhcabfdzrtpaspfg4pq3venrxodj4ftjo0gn9xnzl41zcfo4dkkbzr1k7mju7erw0uuurhnhr8h8s5zdsnyl1qx7vwxk82l',
                application: '23lzav7hc7woo6h0fhwdu50gjk9t7188qyofhla38i0srnm3tvzaniwjymdv',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '0lazjyvs3r6gqy4k5vznu8s3e420qtyd164rjb8h',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'yean5sxn9g35fl9bpp5s1cigs4qaws6lhh33rxszoa2ezf5n11',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '154ut3vj2o8s7t4gyv8i',
                version: 'h3nkzvahe1i6llqhn1bh',
                scenario: '1hpb4bxuj8wlqz0dpyyua9cuo180antqccjrgjqkfrqgo1q04v9t248sfjwt',
                party: '7ui3kfbaxwoa7lvu16afxvd5xiqorouk1donbllfop79eyzcg4z9tbhn0rvv8v3wmi0y1lcebxf1rn00669n2f7zjq8uji5py2y9yzzwar9vnj3rrg17cgg8rflbzreu5cu7zurjtoszax3nctn2mzawf0426ctn',
                component: 'yuxw5newdy3tzjf963d5n1qct12s0b9a8eja45ns8f5i38im8slg7gn58lddaj028365n8kmus3v2xwob40pq0lqwgm7d3iq84532bpr5ndzbkk6edfk0k4y3s2b81kk8qko7jatol4xgdjtxb1o98t6gqembwx8',
                interfaceName: 'vy9gtonml2y05n5h9mf3h03d7w7toisbh8pq510q9yews0qg63iu4pmmj6pcbwu73drot5eb8d9nppyr3mrjhv48xx2nlwlqs8wsob3zo02ke4d10erdbwtf91yhc11wyxy0pjtlye4sy4ud44dbhfatbba3ahz8',
                interfaceNamespace: '8wgko9x4pctw07kkowtd10fveabt3co29fyppo4r7myqltirmacpvju3becs0ijb1u6h9nf5p1r6xx3q7pmn2ur20er8ptmrakcvuufn96aft5v0eoq6q33ffvpcapp68jyw794pexknkhzndspv2td761hkqv89',
                iflowName: '42rp7bapkciexl2xl95walnp5ewgjhio69ozig6gx2ahbcfpm4fu68pp6uhwkyhuel42lp0ggbd4e3bmtb2d0ppi4nvm82wvv9o6x5lt8l1d04cv6sc1dipoh9o0s8nd4cgftlpdg6ivb6stq4b4hy6b626sb15s',
                responsibleUserAccount: 'nbj79lufmay21a5ap8m6',
                lastChangeUserAccount: 'hormu8ni99c6epx60wlu',
                lastChangedAt: '2020-08-03 12:16:20',
                folderPath: 'tgynu78wc3opa8eedlbecoqq89gebqh90qm932wobrcl9rpzd1ohsc9b2xjcwujp3pp8exbs2qxrtjvvjtov67l5xupwfzx7liojo43ap9o7jhonqdl2tsi3d2o5y1jvp81x5owky452015d7mko7szh1e1x7vdalnd85t1imwscpc5y235dooenkwghxxr5bdhb1yo3sk4r73cgt7mu7kydxwy8b7afrbx44y9h1stqkf4iw11z111tk22je7c',
                description: 'ryd1sv9mc38hn6avvj3fm47j9e3dccdwi3jt5poop9u5zou4dyitnrbe5x4f8adnysode3zyyehla0e4x3og0fhgdyzzsbhayayd96wnwpr5z07unmvlr2e5y0pba0gqi54z9kx0a056mtu9fhhyg2i80ac95t4p7fw9o3boe0jocrlxl6r5a3jgalxr1i2suqniyw09pdr6gipxupll25et4uwpn93a9wu90ipf6g3pyi1pfr8vnot1ol46bjh',
                application: '1oulbsj9gpj6z1q3d41v6sirmtlr3f9p8cj55iu6gr65pfefvowg7wbz6um9u',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '79rjgl8rkmis95ui1749ef66epzjsbbu01ij9k54',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'id136r8dm92m145ev3e8voxico3ez42mq7nezn85mrj58cq1g2',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'jipufomv8h980m9qsfif',
                version: 'hfvd59q90fzt19y3fru6',
                scenario: 'qk0ll9ce4syecahbalz7v7k4n9nedvrfld2suxap92io98in88ednlnzdvmi',
                party: 'yakhl5217m0b89s0srfbte0p4zp48efx9v00vtful0x6b3hdcghhy7tyyu1a7e783chr065bkxtekqejamjophskx3t3mfcxe11px2qxmvy9tqbfnbkyuc8tw7a57eoyvcbu480a7018k9ryirl8h4yf4hvbfbfa',
                component: 'k5xyh2sftc7atmw7c02ys1mohiebaxkpxw8bdcfjyw95qgb7m7m5mqrvpyzwn1pjma5cc90d7vxe8khoacguygimvx4b08quqzqce85ugo8636q5nsasmdxmdn4msp1m549up9vmasene92kjbsjkkkxu0xtftri',
                interfaceName: 'vowhndlq6dknjo8brzolo8hx278tpakvzto9mescphst0m66te766n6ss91z5ilysqbeuc9kvqgn6s74fsmahrnd4ldkcdd3wrt7p0ucudtp6gudwzuufzw7pkvgfzrsht7ghvgi9q4jfkh5g8tbp0jvfj6bm57d',
                interfaceNamespace: '4i8sqdl5f7eovp6jqnubsj8g2b4vk67smsdpqcybdt5r6ew6q7ulcn9lwohz3vammf0w3xejuxtfiiwrpw46ke65tytsfnntqom9g0ch49wqaradkpd5v44u34jqzbdrvwxxf980tbolv2m7561f2xhyecbdletk',
                iflowName: 'u9hrzic63dvbugaai4ctmqywv98ux7vx339d840ihusad2qudw9d5acpttfdkz7d0mltsuql8lj1j7f409tqiicxznfpfz5x4xul4ckbseamy3jrex3f24zbens1okg12u483kihxrxkcyzvehmct546girro9yw',
                responsibleUserAccount: '0po4bv1tv0q5a89vbjb3',
                lastChangeUserAccount: '7hbq82wwatt6iepazwdy',
                lastChangedAt: '2020-08-03 13:11:14',
                folderPath: 'tanu10tvm1tjy3xvs71pw44r1cu6947v1xo7x5s5wx32ts64uakh6efa9gmumxslvcfxa9emn46vvov7nqq7od526p7zwu4qqlxjj83vesgzwuftrfiyogyyjyi0v22yezbxyz2pd5vc4s6zkhi9oej4adwkvxhc84zqnd9y2bsgdn043xor754tunjxhxkehkxqmaarawzqo5vcze1rc5h8444igzj1u5zr1mnmtzzcd6u9umzbi0c6bhcbjgb',
                description: 'k6dmwnem479m89sqvat00ngitnpfo8r3ta8kdf3b9vl86bwnst346nt044hkau7htpnfzjcp3byc52rwtxdmdsuij0q5bhrx83fdxefscfc7pi5e1z7082lly4wum8eddqcw1o0f87rhmsf0rdmli9vgdgldl7zsg42nbkglt3vxucfwzn6vjrnxcgqftmo9x4w3wfbem8jhch6udpccqqezjrlw85o9va30xgui4vzeouhinyxnusp3i63vhuh',
                application: 'ifp2j62olkx8kg5ixhivgv36hg75oqx29u2wozmfrhqv9ydrj0rjdd891bmy',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'b7ait4ug6858io8b773qej2hw2dopotd2ww0csgq',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: '8qnlkwwe7clzijbobtqf0khun7tb219blv0l5zevp1xc3p1yip',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: '8k4z987od8x4385pl2g1',
                version: '6avb9djxml6ieczb7wnf',
                scenario: '263eeufwx8cplbk891ikuydnonlfkwb62e1yh5r9g86ehdag7fyqipfs9dcf',
                party: 'wr04vqskkmlwbc7blezygwvvb5x7r1onbidjvhbmi67yej6olkk0rcjyyelhevpwbx0mtgun2rogyy1eub7d1kkk5i53um4zxkocewcdi9mesdi20moog08klecsk1af8qc2d4m8kdcka2upuyw30ou6othjlsq1',
                component: 'bt0y932w3x01wvztxydhs5b7jps0gnh35rgpjzvcbd65co81qsvda2uak82h76ckk5jrs1kevn5rx7ru38dy303a8ye582kyyh1tg616sudfndp7sdqw34il3n0ej4e8du1918em8ygzt2w234s86ghi6kgblxht',
                interfaceName: 'bnwe3vyjf09gnu5hxenfgnp54pkmwblsfsrm97b4iwn2kg1sgpdapmaxswd82pn9y7lm8pd41r57ggdfujm57gricygj8v2wege5ox5lzifxafw3ju9oz8rgyj7ozhe7jbbkhfb61ubyt6bqgoy5b24jb0pv5xhl',
                interfaceNamespace: 'fb69xj4k43zxb318tr77m27ko0ydjytdp53g8x03vslht5z4kopzinzzlmthhy0oxurqdpdu32crve17nkdksgpt2d11me4txqah9dwr5o3tak34q2zaozpqu8ww5ekxd8ete1la33vn1l676cs8jjtch9d9lbk0',
                iflowName: 'tke788yhsqs475w2x3cpgwzrv7p9475zv6ngkbpyxsakbeyv6gxcga297npwlzgqfx5loikcjyjaywd3pbdnzcad79qclb5la9oetn47b0pdg9s19hv30xvzg8pl4v8pa2xmlrz3hbtcfd7zpuoezbp8es1szcsp',
                responsibleUserAccount: 'esyn6glsm81o70vxkxu3',
                lastChangeUserAccount: 'psjocx2du4l0dd1mw8af',
                lastChangedAt: '2020-08-04 08:35:49',
                folderPath: 'r5bw8bjzpnuh6gx24mujlx4xt2lzukomvxe4635k8rwmm6gc4lkeql4ovu2bn3uvfp4ywrlrojatzbdpkffd56sisvzsp6wthk1adp1mphm2a3ebh1mxv956xifjm7c67u9y5fc2inu9hshmewffb477o6xsi07i6qcahjekc5d7hmir752jaa8ra4i3s9ju9b0c30e0uu6pvfusg8yacrfp0ka6mo7rhm13u90iblgtvm1rkd6ol4tqcve0ume',
                description: 'tdkwhtcfoz7yt5htuhz489kkq04dlp4w5seh4bveilbel1su12ljw9ynvakvxfcgw52gibm8wu4fvbah8j7h8hrlzwvj7l4hpk8bevprxvmto8h6sduiq7p2rf99kt5p1737mpmonim0jmue07hmbd157cjpljgrk91dck8pns6khhhho4v7d76oemr35en4538q20kwfs66wuvilr8kmzyuetnbdxyzdrefypj55ub2rsiaaefxko0p6kv0nja',
                application: 'rcua0y0h9tyilt4uc987l6m0q2cno1sr61sza8poavut7u4vy8gmulnoqhrw',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '9ax3juhrguhso6unpt95bk4641q7xkpe6il3atue',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: '9m607v5xkhd7djtuuhg5jezeubbbub8ol7pnrqfvsspg8mz2n1',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'hi4aid8vh36deezq05wi',
                version: '61b6w121jorrznkupy2o',
                scenario: 'trez241stbxmxai3gs24agijhud7u6kjdbcifmxvtbaa0tg9055t99utyar5',
                party: 'lcemh13i9702metwysg9c9d7prw7fdx0pptao9wltkdx5c39ahou1oi7cugr2xqzu1q9p03kv626wt8b2g8ks0b1hftsfxxbmtfnn7460fzkuse127fph4qujjdjq9bcjms7d9ld0ehnqzxoertn1618mj6f3zzg',
                component: 'upr6bdikn2lf3mo4tdlylfvdqjxxazcd3jxzj6wq4q07ub0xg7ryqjswv0n61rq5sh20uk2k06ubso3tw3gkqxq3tbrs9kv9f2pr0cvp4qxbgah8cfdsnckgge8qbb994uso0nqnrh243q3ul6cw2c8pnzm1wmr1',
                interfaceName: 'rfattgamjv6oy7xxc0viw6n2wda92eexix1xe7c3r43vezjvjc4yx7emw557uxwvizlshdi71ygxc99vqgdjrt5kj45ozoomp8o6qfgrkojyyo3l1v8eeqfqxql3ud7j09qojy2d354y0o5mea2z6w3c430mwztd',
                interfaceNamespace: 'tdvyqpmxam41fg1r21zhm1yxbk92ta7xp98skqvc0ducs9pcb9x1rhjlth3pw2eyceb2oivh2znktxnaghka1a6bxbe11bbn3lt2o20p1irn5mchfcxifgtg28em9jyuj52pcajqxhspghq4son8e0p6keif2ykh',
                iflowName: '4i354lfesr4reoocv7if9fzm85t9przx5u29q1ts1c1axeawx0lhgtj9dtzaytalh8r0ucoc7vdhrdrexshcchj8fcib0i1g0velmxmnfb1bv3h2wh672nrh3rt9wnpaxdi74fd0v5stc5tu8ofcz4kvmr7cblcz',
                responsibleUserAccount: 'fkpxbbkjmjg1o8adoka2',
                lastChangeUserAccount: 'cz5cdf8cdjlai6g1uvqn',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'pndhmhv5ka3luj35vj9jjies4rrphd5pckwwm598djs0jcmujb7fuyxmukv12p7f82xlb7hof9fvvoxcglzdodshse3ijukg8sqh15yvnyjlwcjrh76nipgwpfpi1mjqtmuaj59voen13r3u4qvc7jba6cuwcoxnmqk2msxxenubr6gqnreov9akre32li44wpgyduy603hxd50g4b5d5bviul5rov1xu8swfokoix8tginqr3distn75q6fz2t',
                description: 'ra7am9mrdekxm521julazwr5swdvh0h07h8p2nv72lspq56gtr7idygxrvjcf8qjh3xg8u0weld4xmlbrgnoh1k8ixtco3eriiqyh65p2f0th47a5lpfim3yt4f5fpbi8v0nupcsg2jp0mzkuqy8fpylip84j1p71lpj2bzahpalww3m5j8dl68n1qcpj08xwkj9ftxim4wkhik8fdqe0d43grcjfhe68yz2o0cg81etngtj1wzq0gti1usrn5t',
                application: 'ipw23e8ce6e1x6ensnix9wlr9taxi1cvsv2fydevbysn5x89nvubomy82o5l',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: '95ztx8mlfzo8on7d95m7tmpq9ywxkce2te4vo2xa',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: 'dbthhfswn1s2vh4w4aqj9ecnwy1mjtf0jqggcs2e1t0dim7a7o',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'uqekqe785z05hadiy0vy',
                version: 's0x60bfijy7ffrz56seb',
                scenario: 'q5irvdt834d02qo90tg2ybwrbox9ix6tenh1bhhd39dnf2wumx0w4ksquleo',
                party: 'der6cytmstehuyh4fvvdhu0haejckmmklnrkmugxazjjik9gh8lxlkpvhoq84p17rp03xb6daghwsquzxn2ch5xcccb8ll0hc3s96ti4hayqh61q4jxcer8zbsfjsnq5on7i7yo4m11uq48hj15ljjfi4a017jfw',
                component: 'ifixnyiobzwyy3i4kwmwauxkg9o6rqf9ricjijsohy9lphb5iqjnth5ob373sfa60dewfwsm2fwcfiblo4bdv7tup902deul903if8lnrottn5mblkprd466vmnqam1rbdmp68401l1jwxqzurjio5uc9oquurwe',
                interfaceName: 'jvobwphc4ul3d70xjpenpzin6fzqc795k5ulbr6tbx0qnse8vf0hd1apf6d2la545kxf8af7ffu4d18z9nlqp3qa41kz8pfna0ai390cj0qoitzrkwym2j51eggw4crfmh3nvmeb7nc9124u5smbebaouihd28zf',
                interfaceNamespace: '6gz32ysupvlh3bcdq6gj54d4l753ez7y9xo9z6lzqdhh247gsurvaseenwjwo5w3kb8gak6ef1a0scwn4kqzu6aip5cy3hoveazrg3bjqkkbffifc3lsi62qvswn96py1c1xg1trjpw311vt0x47u9si48gac26o',
                iflowName: 'ccf28dfuvsq0sqga1vn9ro9wfjy51051vhszgyvfil742az7apspplqzxeikz6ndk8jlgkifmk46vri586v8ia86bxy7cfwxhobqhri57qq6bdbn494vperjyrg4cp4uap8q5qagc26fi38yh5cj6s4x1dg04vnt',
                responsibleUserAccount: 'lgwnt0vci67s2x2v5uow',
                lastChangeUserAccount: 'aa66m9chu5kkzlhcepu7',
                lastChangedAt: '2020-08-03 15:28:06',
                folderPath: '4022n1quckpkyt25eu1n3l8bk5n37y588a9al16e54fcqxf72wb7zm3tqp88kitct1toj8gz2f3bb1c78xwfffr9mapk3l7qenogu7k67fqrlqwf34nc8kb0veo6e4ncf09ijyl3hjvzeiznvawnnjvz94c0jct5llfg7kjvpji6s5kz7a9re4hfs4j6uzusacv0jfxshxp8qwddhd0q3p1i32blds4j7zaw3cmgdowbmd9dfgzykqpbd1q4wzc',
                description: 'v7ig6bdi347hdtukpnjrchy4f743qfva6atgo59ztwskjbiqybij6rivt07u5re3qyio5orakhi9kcxhdenk2c2s180nsg2mn32wwycauk4euus58plj1cgd449v2hgg7l4ksxnt9imxwppks4by5iyg8f5pp2xbjs2phznlhsxw9297ybt2wvxgcgslw1jkymeajvsqeray9vl9n5dmb2m3nvmkfuyyicdlfapcy5pql6nbtuipm80hgwul5uo',
                application: 'ydvqagakvym4ketn2ssb2z130k90jjz1b5t3h8joo6vw43uio1rig3unqgmi',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
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
                        value   : '2e658698-e231-4ab9-9cf1-da00ae60ba6f'
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
                        value   : '55510c84-cd62-4db9-9935-e23121ce61ec'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '55510c84-cd62-4db9-9935-e23121ce61ec'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/ef809676-f8ae-42eb-a324-38a6ca1e13d2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/55510c84-cd62-4db9-9935-e23121ce61ec')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '55510c84-cd62-4db9-9935-e23121ce61ec'));
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
                
                id: 'ac43109a-6939-452f-81dd-e9ff847d14a3',
                hash: 'y4m3h1hujjgdk7jbvhowo8lkrqm1ogdq7cuyobrl',
                tenantId: 'b399b60d-c1d9-4ea1-b8d1-d6532d0fe0c6',
                tenantCode: 'tds4ci4ovdurtebjomfwe06dbh6aobtwru5fkm037q5l5866ee',
                systemId: '141014ed-5f36-44a8-b82a-0e3da5ffeacb',
                systemName: 'j8hspty17sr0r4en4alf',
                version: 'u9nbfvb5nu5cqjxiddei',
                scenario: 'oex1v9l8ww5frgzovp0you9qir0rtedps0uhth8csf9k31d3sbdz09dnqxxt',
                party: 'kk15f4ylj7ayb4adgpz29q4fnzhc8yu815d794w7gvuwovren12zlp8r9kcg5avm1tkzz99jsfv48lbcb758vzmmmmef8vqxa89ggr03e0avihd7vnksmthm5fz8kqf7mclcf9lomba6jbe5eldeq25uvt4z2xal',
                component: 'qumbnphcnv2rpifuoz19bqussz0ymix547nhfziq3dl94apr2t7hi5ojqq2i9b6n9j2ash4soh8ekrhof6cjcmn6aabkud8lpjc8fml0qp3nquqb56tpjsg10ya2iz8wnsw0uew24gul2shz9ziacl7f05gna87u',
                interfaceName: 'ctb8m0wuvu2tzfxk13pzy5okmi4w5hekpp7ti6o9fkhb5zqgixuso6tj7um2addagdkl615q8v49g5dutyr2pkoj5j4l9lyrva2vrf5uz06j9x7sktfyl18gkgjwgpi60p2xhc18nlnt4v5dv74hpnyblf1zml2w',
                interfaceNamespace: '3sscxuxrs4n4cwbb9bbf5bb708ylayqvxhtkcwha05vh3xhlrnspr59xnw66mjuhvan6kp887in491yb3iixjatjjpz5tvtxdf3wm1m8mv9gktyg17rfl892fy39o6n7hgsc47f853qu4zppflp2w2gyc2obzmhs',
                iflowName: '7hne34n863hb7zoz2507plfz2womeac1wwxgqgqwl8y1rzqy3uea10c5rv1wru1iiequkswhscld3pdmoqv13a42hqtokt7pytq0809hn64nwo4z4a1ch973t2v5ijst7syqskw8ltb7mnrkse9cyfiyw84mauih',
                responsibleUserAccount: '2r00ovok0q1ks9iorye6',
                lastChangeUserAccount: 'p6syydv5b2a3kiyyamdr',
                lastChangedAt: '2020-08-04 02:43:50',
                folderPath: 'aypa8xwk5riui75kd54o2kr7bhylmbgj6i30wl2wqxyg15jizkef7r993s91o37ji9mnnissp792xbpdbr8qvri4dtgonc4voweb2i681rhd6hno5wstn6jq0lxsl36t4jea8j993088dco3nts9fj1cy2c7ilzqrould5pypld3y28ct2jlwpqi4zu2ruzqjlwy40lemqxvqtcz4d5j0j2an9o7070u7w21icdmhuwko3mj95xf12nbzj1hpew',
                description: 'yiyon178x1xnpqe3kjq1yzexzby6au9l8jdrdm9lscaob7y1qdkuj3rn7a0a4rc3gqmn17w2e0g8dhe41n0fpomaoniuqivgokd47jpd99rldrra6nrimqsfw26vd4l82ljh9ghlr4a4jtloe81in66k9bevxnomt5ytt63dpo5fzalqf78oqvwnknv4788b31x01j8wgcj41nmklve9n60w46my4or16j4ckrowyhydir9q3ntxek19cdh5u0y',
                application: 'pl5a9ci2j486c3jwkc3fi1o3muf5xt3retpa38ay84xzyge5pv0c5an5zc7m',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0533e8f4-bb3e-4798-8120-01d0ec829985',
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
                
                id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                hash: 'rpls4jjhj9k7s1asmjckgiod4hsbim4ie26vooli',
                tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                tenantCode: '06o969u2ioz0puosg2bnb1gogo3mvf59jzbaaezw4csalwzvon',
                systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                systemName: 'pnrjyq2279iowq1ljd87',
                version: 'qhd0q42aokilsjb3v9rt',
                scenario: 'pv26nw0h7hmb8fit32wps1xz9n7zlvn57mb1c62nhfd5g9rmly732ea1nvnm',
                party: 'l6zab7jsycd0z9384gv866ad0s15xfn5q7wz40k6bbdyuqt3sth05dfchgcavqskx0nbigmp5u9gvmr6zzpq0bscgvwcxwmh3teer3w9seyq5abtlyyl996te3oc5vig7g6ytf2hdtul3smcgsdt1c9w3gxysv71',
                component: 'f5o6mikbehvzfrawceawlz4xg05cyzteiqyvpv1onujdlfs5rsflrrjoovr3y4hxx6k2kl9u792mim8efiuxcr5ahiqi0t7qrq4spvunftdyhr2puio9cy76xjg926tmg0bxi3ock143bxy2sg7wg9w4igm5gbs7',
                interfaceName: 'ywten4alflfbzgt60tb4f74q2l6oq20ejm7xwcu2aeggvgkzjnq4dxr1yo28nc42h94vts63w00sl1e5cluk77dzlezqowjh24yvnw9vf5tol16qlym7vbbgbqr9v6w7zjb8g7qjwvy305umea3yl9789ury7phb',
                interfaceNamespace: 'mxvbz6y2ryw4ghz3qdpw7g1jt1kd43rvjo741p0z6qrx5vt5gwrs815qg6rabnhw48hz4laibig3zi1mnv6m5rekm28ptjqjzxgllkj5kphvg262cp6y9uu316q6q23y8sauzkglvrntf0eii5psmx3vefqru95h',
                iflowName: '2yyudi8vsuuk4pmk61330sjc9rklji5z0y20pajzas7stkjo61d1p267umizh8i52uh84ygjk1s8nrlcsyefjr2c2zov14m02csqrtobxg6ptgjnhlujqkfva4wziestji61qmot8ge4zrd3fx03tc8ez2xitqjv',
                responsibleUserAccount: 'zf9zj40abjwl49q285wr',
                lastChangeUserAccount: 't22oyat0pec6n1aptatq',
                lastChangedAt: '2020-08-03 21:21:36',
                folderPath: 'dmwnhtg8e9nxirk0gb4ylaur29653mzerlpr00ygqvf614yii6vwhpfccq4isg8vdg577ne7t8wd0ga433oyklksvgmmasfmhxb0p40f6478f95i6hbqf3d7p5caolhs6368hb97335emd9kipzoh3lw2ttko96ffabuwsb0pyti3tu4a0il6bkk53c5js4ca6zu7cqsk2al8yizzy03lkb4p57zn3molypcm9prt9ys3aykp99x8012wyavjp3',
                description: 'ojc5pfxoa7pzwl547tf6vn7pe5rzrh2rxfrp4t8rzv91302oy45o68t8kair0nhn9fb174h84h84tmppvzh9c9ddnw759ktwx7dk5lxperyyf47wn7bhjox1lc65l4opz0ca0hq367i33jprfkescdvyx51ht6hrgf2xr5q4b0vtpksvhv3lvmci5cb97qzahkmlqgyki9uinjqimuvaw26003tknu0a74ggxj5p1lfp0oaphqkl9uq2lghxsih',
                application: 'pjkzryqj5z0r8b0439nv57pjxxatha43jo136gop9416yesxb9bxsry5kp9r',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '55510c84-cd62-4db9-9935-e23121ce61ec'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/1a2320dc-347e-47e7-adbe-30aee47c9d0b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/55510c84-cd62-4db9-9935-e23121ce61ec')
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
                        id: '9c8d0565-5ced-4aa8-9c38-545238edc6fa',
                        hash: 'q9hqopa6crgqmopcr4yrlsfji4b7tcdk388ys8p9',
                        tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                        tenantCode: 'gee8c5cf279wd331ikdbwheap5b9z5u1nyy6ferd2lyqsj82ei',
                        systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                        systemName: 'wietnswj9o9p79gu5voq',
                        version: '07zlsu1103lxvavbwp7j',
                        scenario: 'nois1nfcsa0n0il65x8gr8ga6oeredbipcg1eq17wqqx33v8i4481bfep5sd',
                        party: 'b8ithrt78nb9c0kzmo9pb9u0dynxc030pc3rgicmtxre4vv8yl22d4lxjoyciedl8piy9y09h60mq82aonngnmhzk9bvtzmfzghxehpfaap1l7epcodb50vlawykfin8txd3jbvgst3bujmv9tqxh6dd3pj8y7ux',
                        component: 'zk4r177mluqeytvg4mrycx8ig052uyjvio7tscwhtmnwqo3kh9mqik7ob8kjtzi3qgv0y1t2tjjs0wyhkpykn8u4v8txw75o3iqlk84lfsvcxcsc0zrz9i37kvlfm60347jz4yg9ycgupfttxf6xi70osjeaic0z',
                        interfaceName: 't1pyi65l5a326apljjouknieiomgj1b50uc7xamkwqzh1m1pzng6h4ns3g4c92uj0txtkewmfd5v7obgv4gwvcxy13xisuv8qenmdz7i3mt5zu4v5awray9t5xv9g7sg0lnp0ov0lif3x994eiwxqblqg0hq2ce2',
                        interfaceNamespace: 'bpc4mi27nrmmf8zozkt7pnzz2ol4z2x0msf8k7chtz71egi6hvkoczjntg896s4twacu317otobl3zi7o1b0i1xuledpwbugyhtjb6rfh9vv35q74szz914o94o066nxegmoykm6q3nt3864dkm6eamyhwe41wyp',
                        iflowName: '5zjcszirjz5m1km66hb4d1ooi94uplhcui0yhxke4j4gydeezcs5hxhfss4kuot3xn0uj9ugl129jz1si776tex9fm53ki8ibgbtfqmamwsb931df50b6glj1wna6on23hewbei6zs83xyjy8vnk2080hpojjqmx',
                        responsibleUserAccount: 'e6jnuvftiqimfkxw1p1w',
                        lastChangeUserAccount: 'rxnnmvgozeln58nr93u0',
                        lastChangedAt: '2020-08-03 20:58:19',
                        folderPath: '9aulkxbsir4ag4u01xskj82rpasbdlvit3wzxl8s238iaec9evru2ny791e7fgsk09xo7aeutnmh5askwbt7lr2xtn7fdav8kc91mtdhy8wr6gwm65v2cb9kwta1ozwkjgpcubjhju6ucuoijgi1aahuwumjsyb7nctc0keab34xvbozhiu9xmhl5cs4muyvka51qt1e2i3xw2vinokg6irn5it9pzwqfufotyghn63qgm6q402teo0pq7nnaxl',
                        description: '5ikvwe2fwoxw730cueo5uippq9z7cu6oetztezrnfjqocjzhwk95a7dzyu5818ycz8sf66u6ysdtgx2xti1oitl6hrc7m4fy3tgbc2wnpain4aok8ez33ygyy904ctbxynp7wvbci5ntocesn83nx0xqrmg7onzl36y0tmc9r546bn9u92m32esh5bmd01f3ja1o4x91lq9dnsanc3db643waoznaopzsdlcqdqq9wq4mg1y21qgphgucmv5csh',
                        application: 'bbukfldqgqjmy01hidigea48ghqcyuxsv3s3a2aalccwbfancb4kvk6bqvkh',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '9c8d0565-5ced-4aa8-9c38-545238edc6fa');
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
                            value   : '6ee7f4cc-bbac-4c70-a090-828cc1f1054b'
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
                            value   : '55510c84-cd62-4db9-9935-e23121ce61ec'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('55510c84-cd62-4db9-9935-e23121ce61ec');
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
                    id: 'ee0c82b6-cfcb-4e17-bb8c-2cad7f8adca1'
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
                    id: '55510c84-cd62-4db9-9935-e23121ce61ec'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('55510c84-cd62-4db9-9935-e23121ce61ec');
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
                        
                        id: '29728d1c-ead9-4dd4-b7c3-197599de3c1f',
                        hash: 'eudctlg0o3mgyqt6uqeq51ok4udqolc3bgv00ke4',
                        tenantId: '30ee2baf-12f5-4515-b96c-6988cbfc2170',
                        tenantCode: '5p5mo5znt24yl2wavur5sox1gggji94tp6w80c40xozb2lfszg',
                        systemId: '1c9ce11c-5ab2-4f76-8003-b5cf09b720b6',
                        systemName: 'ueollao42ezs8zjkg0mf',
                        version: '5939vsskr6r1ugp2z4vb',
                        scenario: 'x8y0tvgr5q98bt8k15niw3yheqzo0l06qz6ylabj5qifh5v1bpfwrr63qggq',
                        party: 'oyrcqidganaa97clpo90l8087lf733tzfbvhcmz0ccdu2ta63c3n4o8v6rwq5va76qt4cphfqf6i627ds6e2bqybbvf5zu98kfw4a9inzyjxhp1sd4cudbkt6b3ri1r3e5g9bokytevmt1d7wu04z8yumyoi3d2y',
                        component: 'hr0e92s5v7hjmjaztwu1s4jfbvu67dbkemgytu9ym9ydmte8q45fy2hj1f5d41r6zrjx11zojxixrt29aus4kgv8o0bu566mhdtlztllokfmukh1fzqe04w6h1b2h7nfmsxj4jpk14d2ntce7n66j3keyqn7vwa7',
                        interfaceName: 'hesiq7evfdbyhtrxwie1zysdfzfs4hx6n9rpfp9cz90520vlv6uarx9j4hwnwndosut187r4tuzh5f12c2jo8za54vak0egixwu08kp7wzpdojp384w3s0377tgrxhzzewsoq0rb5pjrii6sjqrguzquczv5zbko',
                        interfaceNamespace: 'ott6mhpgy1d0yzng5h2nwjsjinjxw17vyrbuvvcff0q6doq9yybkrwekjs5isaf14b3v09pz44kc0g689dwnosg1j2j4q4d6ao3zjzc6ccn8fnr39plg5dc1piath50mrjxqxw77lv5ve5s660aru5thl822ca7v',
                        iflowName: 'icsm3mborp4tugca0bsjd50b9cf5u4wlxj8jx88hosfpp3j2mnjr03w665m6ck3yrlq5ght2sbziicul83vrlmwqc6ztatdqa4l71lvjks4ieh25345ewhehe89zcqwl3mei5augr8v3zyker09n5kj4p2y7mojf',
                        responsibleUserAccount: 'qc3dru1wa27zvm17y1is',
                        lastChangeUserAccount: 'eb53f3urj53xw4y77ki8',
                        lastChangedAt: '2020-08-03 15:14:23',
                        folderPath: 'sv7zzggtgb9ufencutl6ddusix8sg1b12mhnl4pljupmvc1oyt192q9oryqp26oxwzhga25kt65nrsrfe4vk9dc893457b2h33efye1ddlzx8sv8v5ajblsn78ezkvcvxl9739x7f2p8izrrwa3f57oq4jmyh57sg6qh92foqbzqg5612whoczugodotvbi4dqev8uzfodo00qbddf54c1e06la6lo8gw5bc3nabv6826pfusqqs549ckrjqu1n',
                        description: 'c8odky6zwachb9pvfki4lcmkju2heq4dku29d193mirdxe1bxbj4yy6ru5vr0bs3levli9x3rt6e4963kbfq6dqz2quzbkasdxojbc6ebfdu66kljumizzljrowcf16zkg2v8p5c4aj7fq5mohg4nqbghq39wfrgilqf0v88bqntnzbryxd17cmshwqytr6qn31z47f0o5yicvufbbd3i3er6lv0fuf9i4762aluljck2jlt8llngdgg9nez0hm',
                        application: '57beuksk02c8pdftqdtwpijxu5mijam6lwlnyabflbbl4th9ebimsydph7xb',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '40f6ba4a-8a7e-4460-8851-475918b172e7',
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
                        
                        id: '55510c84-cd62-4db9-9935-e23121ce61ec',
                        hash: 'w7ls846xjsire4n4vhdmrb2vqqoegn6mwq6gnxr0',
                        tenantId: '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d',
                        tenantCode: '3o9e1qcaby2gtdvrkgp7rtnxkvr1zatoi2r87lk0vx8uff3w6p',
                        systemId: 'b3766561-bd36-49fe-a736-5f6d8f8298ca',
                        systemName: 'z22pst31r57e88dx3s2b',
                        version: 'b23tb77w3osi18egdzey',
                        scenario: 'gswnhvyf1fnazbuijxxyh9xie9v3x8yi531f0s5cgip3miuad920n4vztrrz',
                        party: 'vnbr0xsmjwtchrn1n7bixnvd18p8syyglzwqqawbkaygc95mdw6c7mp2xj1kc2w7pf0ati1vt13nhasomsna01ck7ojs8s6iejwjzv95ldqxk6i8weblv0po22pomg0tsvlnx3l28ixf7ktzl1xvkqn32he3a4e2',
                        component: 'vzz8hdm8isartzmrujii78pohbqqbusk07m4duyslya3ciekqnkln3sx4xc9fi000r342o004wsahcq5rh8jicievpryeixa7xfxu7vilaa1feb8iut5qo07e9l395rswvlj2j8jbazg5gsyqjkk1qfzcauysb37',
                        interfaceName: '8c9rb17x0uwmuk199hldb34i2nuqiav2igwsod439zktoqeva77rvcuy3m5fexaf4g3cd71b5j66oe7fuhzara5xftsva194hlw0qyg711hnxw1ievgbjv8isqhh6tswr58i9890mqz3h2hwzu8wix77piv9rr80',
                        interfaceNamespace: 'u0lqp2sr62dd5spzte6i4lu3k6bzpfeg36y577b6zblo2vv74ee35d7py04gsjbtqkaggp1o14f2y6suyh50zzyn14mz894srmxfsyv5mwqwbv4qbommk0giuv3japvemap2sy0bsj5h8aiwnwoqyejzxah5jvx2',
                        iflowName: 'kviiefrtnu1e2i77i9gh89yrgc46km1d1y95w4hvub83qhte60piv2vgyfgla486cyb5oh86ymq3uhwn2vdhoabcchgazor7dq9btefxwgqgs5lopdhl55ll5pybciqom02h0k0iq6hdmel9wlxth38342msqvv8',
                        responsibleUserAccount: 'l75k7h5vpauahh12muaa',
                        lastChangeUserAccount: 'zkwlkgpz0g48uvsyllt9',
                        lastChangedAt: '2020-08-04 08:36:30',
                        folderPath: '161kvxzl89z8s512i71ucl9ulo8qhoqymotwm4yu36ccm2kvepkhvg0k1ocyim2efdwt2kfs0zfwe53731pu2m6f8btu99f9ey6x5ywd0neusoqhtph0vp69ww4ao299gcacfd0u8aoo0smp5ifkpm6xhm0be6g39dzt29b1twc7n3nj5ahyx4b1i3yyo5snnfz6d7r0p3vq0idn8a3npz74tviqdbezuye5a5jvp0bjtpfcw5mto571lichzya',
                        description: 'iw95hx5ku7fpemnm9c2lsq4r1m85xvwyt0bwjgc02jh5uw61lsl0awljef66qjk9upbyw6p8tdwt3x7ure6krhrasfepy4ghwj017a267wabf5pcnytn6g0kbndci06teb3pc06nkhzy2yk5ip8lusjfyezu1kemzp6jbpjrpsi2xkwd3sc8z5cgd2bv7xe29cpnyael93m3ws0jiiaq5wfvz4ztb6mxos5bhtk7pi4ln9ff5odx9ke767n9wvs',
                        application: '4nrwb9e59aivxbe13238it92598j5gu56mrju131fhotvi0gntrecdzeqhj7',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'f403744d-a5e4-494d-9d50-9551f66d5acd',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('55510c84-cd62-4db9-9935-e23121ce61ec');
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
                    id: '7b9b4097-ecaa-4ade-a7f3-aff29e674da4'
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
                    id: '55510c84-cd62-4db9-9935-e23121ce61ec'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('55510c84-cd62-4db9-9935-e23121ce61ec');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});