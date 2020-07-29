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
                hash: '2ni13i64vy86lk3ktnuqnwi72m8yl9q8fmqq4n25',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '2x0q3frhhwx9wx60sy1v8juh6r1i036n8thnreil02ohzulgy8',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'jqavat52e161kgef07ja',
                version: 'jrz5z1cbypd6gm8knsgt',
                scenario: '3l72pyvlon7nj6vgeiepgsy3wx4xwsuglj9cjg1lk4ngugnn3ibdbknwk1cn',
                party: 'ezrbl9e9zkxsqo8kobficp85md7ygqaoh90mnegj6xdkbry2u7i8d2rhrjztmq1rdaw6cce6hqidvog2jw7455p16mzsb2grpsqw8g5zcprgt2pbjxf2omy3z7s214j1mqb6ach65gkhqia2tqeeejq24lnq634u',
                component: 'kkba4yveytacvdrc8ds6j6xvxn8hhxwt1o7avevdee7g8mlzjf96hy6ennw6s13lh46x3r1f7zvktas79ze9pl6hjxtd4xo6a7pz00q2bi0oa5eo3q2b4fd3xfjhqn1bdvzd0ypqxu87nwg4ldshhwowou2y8m43',
                interfaceName: 'hfa0io469i6gipvyxiq1ua8zzez62s0m362qp3xir7v2iw8h9jqo7f2xkrice9vqd0byr4jbfxepx1yvwe1a6xkt2wok2fxlbfjk4s2h2ghu86dtokdunlnavoc23srd27ksjljhneh102zyca3iai3s3soadab0',
                interfaceNamespace: 'otn0kau8nq04y393seiiy4ndwuk327yyf8of8vuffgmvdcfxwbrg8ioao36uvwwh1em4xagu3hxxts8l4r9v2s7pju7t6k1e1rrep1hbs9w4q7erlbzfs084prxfa8k67jjn2hkpc6frnc5uxbkh634thmfrtk5i',
                iflowName: '8hvv9b5ertly8bnwv5x3uha6g0onivip1pudl4nroim8uh8d7iypnzjn9zhuvx5kkt5j8zuy32f7uuetq9ttg2n55x2xkchyzb4ng9vhwfbavksh1a5xtcnqnnoy3x9zau25zb29206ltrsiesiz5fsr8o0fysjq',
                responsibleUserAccount: 'cynceu5bswqtd9zi8368',
                lastChangeUserAccount: 'd6so053qn0hsi4gvfcge',
                lastChangedAt: '2020-07-29 09:33:25',
                folderPath: 'na9dpxuez6ptdfndos1waexop5nybjvd1353jaw1m7fhlxkdhqle682pqqvodww5f1vbraax7qymxf8i69fnq4xwwk15h6yzva7x125ivr7ctvsfwhhdt1i7vzik5rrhfmq97wrlvqbdy9bsymoj4jfdc9m4p64ag7bwb0uc6n75g0060n6aowq6ok7gjam91gdztkbaiv0du38lco3a994fn1c532s36ilu4t8fdhg2t001tmelc6w2brdt568',
                description: 'pdwkqvf2e0hb83f0phwlw78aqyik0m5ofd8fs1i7evfy47s2lsx7gjyret9zih84z7q7chyomuzw32teicp7cq13ihh9zkw8uubclwlr9w1abn37pgv3d08y77q0tgg5l3mikf6lr82tmxmuq90cgeb72atbzebxa3cf3vkdiq2umsd9oettlmgw4clx6tru0pz2kerfta1qnbjghrtx4ga592x2qcs0iargfpzmtltau831a6cfzg2g8xdm8n1',
                application: 'nqg1ec5fsobrmr89y2mk9t7yka05yv63a55ul2mcr7bcy372elg8js8wkhvb',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                
                hash: 'oee5bhs2nn31e4y96gg1kqjahubygm72i5duanm9',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'ou6fffcyy2tvagv3xa1edxdw4ybshzns01nf366sfljmnjkjpo',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: '2flordglhwkd4gtb3435',
                version: 'ze2ow8v56ebkrkk9pdsn',
                scenario: 'byv42ci0lrdc8ujcpnmj810mhiizu0f7ddeonpo91by7hylrcwvodv02ve5y',
                party: '7jn6yfedco28wa9jn77wngkunt02cbed6fcjqgwp9nkzi1r1v9u5tv69sqc5g11iar191h010kj5mb28etuxrdx17lw60u367xm1x8db8ami588vnj6hf255dsal8rwlse75eh8hs3kzsecfynrkzyr5op0y1z60',
                component: 'es4h1pjadyq40i1ijwmjgczxql7nkcpzw0qi4wwudc293zknw319k6h072f3oi86z03u16wo52b2s04ppvz2scdx5m6z6cal6hkxi3nr5ra1b2ne410vxoyi8x3y2g5fk4vibothn7bb9qclc0ew8gkm0hacc0k9',
                interfaceName: 'mve0g87rzdqvd9cwh0qt01ov7kivhllrv1mr3s6rzaa8fguip25fagqgaw73k5sr27cyrlekc7tts12ye2il1a0nqynheb6juzvgkh4o48i5klfo0xf7l88flga373fyf772z32dhyofmrefn6duvm9ur3iufofe',
                interfaceNamespace: '4xikowb0im00otrm86cvgtxxhfpofqt93al3ih9hxoen0sg9waz32dx5wl7785j7to1ph9qgrxozfedh9jymftgu2kksrw80gulma4gw95dt53k47v13qdzocwmu4uwvhtcc0em9vfb2f2bj82o56xmptpg1idd5',
                iflowName: '7dle46khpkd97wkhf8lvdtf0cvws43ymawh3wemd5tzli15zily1277kj29xf4ucwpyatdl4mbxdw8a0l0d562l0kt9v2fwwoiggupgdn0py3owtzktr9mc05pt98xm80fgcgtd4dn6ru27axm89432k8kurvbq5',
                responsibleUserAccount: '6q63o8kk5yfoihaa5z9g',
                lastChangeUserAccount: 't6hejjh7x3jpiveb7wfd',
                lastChangedAt: '2020-07-29 01:38:10',
                folderPath: '0c5lke2ryav6cf010eypie0d3ciu6q7aajbjxoirwiqvpler3ui1qb2byx9jo37frr5laggxhper2vsupm773qeg57frksvdrnbrl0jypbadddbx8ihh920rgoq7u7f65qhklh7up6ee8wkhhhm2c6bwafdl42pe5kn1ne1lvkzcgwxfhmte9se7xbvn5gslds38csg3o6q413istpoh0zrism1z5u7tm7exu03h74pvokixxjxiy0oirwwrvpy',
                description: '84ytl7g80kn2a410dqz437xv30l8xhon4o9s6jzv7ar0gcuks26b5yaqqse0x7c6re75l9ccq42g1kjcdimt3ulpzvmi1o676kayh1nuf2oc989469o9fcib6e3sci2catjvd2q1lq4hfd1arlj8rgr13g3w14t2p41m5ciz8mtjsrhuoqaj0ie1ua4ko7o99o1htz2z3rzo8ac43cuxqwjdlren7u7m5onf359xbs2u2irbmiwe09v5hmsv5yc',
                application: '4dz0knbmzlcrpifzbaoa66tfsvmtz3u729r9ggyp6v0qzyxob6i5dx5fxr55',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: null,
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '1wjulyumurqllk99l0ztzpaypgek3btotfs23nvzelz3sfwdsj',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'k9mkfxm8ekc0jrcja2s3',
                version: 'cy21wvo0dof94r59lskv',
                scenario: '5h0e60k9s0az2heeiv5yd0nvdihnygz07ea2osw1zvwlxl40lg6uot5orxnq',
                party: 'vva58d2zn3ymxbahfm5fuipooxemeeylhs1wbdlrpm8pll65nryug4z7nf798hte6a78c3m41zm4za5ao0tq4ntmsmn4g8kf45kzd322283osl4zvgc815yeoihriejbp98blkfadq8qbixusfta0oxkqn361p6f',
                component: 'ycqa2bsfx784h4w9nv8w1drw2znhdi2jlf5hcoof2jdm3skizahx01t5jmwibqkruyh3ll3g0dk87bvf2bcjjb5ijclhc83zkmfhlqcx9wbkpbk8rgmtekvkdtzyf95ug2bnq304886asy9jbzjwz9760off3152',
                interfaceName: 'tj2qd7zfc73nherp2qikjw4k3x4w5wi87xce614vilngz7xi5nkl6k4qyynwdlsbt9gv6c3k6qoq3hpq29l1diqacoduy4bs3s1svs5eqkz3s7cnt9rjwv0hn7b7e4rpr2gj6uviqu0g95eg52fw834qt4ro947r',
                interfaceNamespace: 'btu4nsmeb9qohlz1kxd343rea8vmugsambwjwf7oituhzl9e645709f3skt35s2s3ouo557wptbapv7eyrzjsid9l3qpjdkjd5k1k142honyaeockdl5y8v1lw8pg0rl6b1wvike19xz7ck0gljjbcm384n49i0l',
                iflowName: 'ipjimtwnt4jy2dk9axmg9pywi0xdjb5o7obb5rakyshzea2t3w0z2e45b2yqw1f2q1bprj0olo2qdyjt2zli2q329gcm9h8688zgmauef4vljynf8zrctczxi1cmeeu1soq1yiv5dr4q1rapx4b6ochmsp4u8lyt',
                responsibleUserAccount: 'nqnlazgjiap4dkftuleb',
                lastChangeUserAccount: 'vu4ba4ld80a55dgn17wc',
                lastChangedAt: '2020-07-29 05:15:47',
                folderPath: '2pg357a1hruerpixdqd0usij2vknd54ek4sn82157kkr2h3iy1e3uxhd7eowirqvvl8nolwym9b9j46l712bi97y2lfwfla1cfsiikstot1y2i06led4aghym29emms35ex1jz3wkjczk04tjwutlh83wdbdvnm96uj7hcdagtfc8b35bjturosml0fjtwkx19w4gtgb6q3v5x645o7sxoezaof7qnh7afwzwonp04gt290psnehqh35en1tgih',
                description: '8xljudu773ugpzxnt5id0szew8dwhnan956vsct48qne7jegix8ggz7ev2lzh8u1aw3jmtti34lopt2rfjur52k4ymsrg8qrqos5ggxp4n8lskmu5an6zshhvlc5d1m6kmp3v3r1my90lku2l18iwppboulk097p505l4ad6wtg67bh3r85u0xmwyejakhui6b3sq5if58cb6ukpptgozmfo37aseev4mk5ssiyuxp8uuvg7vbftsr61190xl48',
                application: 'h9cr9vakkqo5sialt3wqwml9t12b4dtbfiuwwpnbzbnjov9r6qpe1genj262',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 's8qy61bm0047f9bfett6l1r0d52xppfhmacrotvmkpsw87h9ap',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: '9wmf66drk73k6zh4sdxi',
                version: 'tst9czzdayldfvweyyt9',
                scenario: 'qo6fyd7t877w7gkr4wziw5hyy5girsu0r2q57mdsi83g06vtol0xn6p5iljn',
                party: 'l5uf5qmwgwmpvffd1fqdd33pfemfuhzu9rupz88toup65vrs629ofighdh55pgu2932kt0fvetoxqryz6067x2wyrnaj88l219xrd48tqfxdao95f3xlthyzkx7a7hy4hhvew4vb81s08d56g4krp619ehpbcs2c',
                component: 'ew5kubunye6ea4mtn6nd5w5z2ac4ke361nbwp5xc6idf8ze5gvu4rr1mkknqkkmg4yyysgtpoyeuc1dlplp0jep0njqerkbcihgrzygcdjwoilsd5hzpr15o06vrc1kajx9jmt7w4s2bd0saeqdmvhjsmigug21q',
                interfaceName: 'ti5i9vk4da8oj40si1la5tdjp3spl8ka78md9maq52jwrdnuw2cm96pma3zg248h60trajcpco2hq1tf3ewmluz2y0nqxdo6w8jaxgxorib50okjvjef9jfud9rvwdj6d1zybrquqif9zi32ksnyfyc6x7valiu5',
                interfaceNamespace: '0w83dy8i6dz2o7bfnkc59rovcq1dvxg6legdqu1umpqk9fwohcdbcoqvjvjdlg9zvicop5lfaxquoqqv7i1ey38hfsyui2jza6wx3ne2rkda23fmtelmfmcom2wyxzoydeqgyb5wxsqnozvkeav80qu4ec015bcg',
                iflowName: 'na6ng4ws8dbnay75kj4ti83k1kb5pwxx6kweqp34bah0f5jvwt1zxj4019e1lxm60pp1neinsyp5dfrzrlwz8y61690y0p3btvpef80tlx0p77ota3afi14xygmx3myvxfpunu3ji5xpj7lf5dj10ukhfp25i9kf',
                responsibleUserAccount: '27kubnt0n1696c5s5njy',
                lastChangeUserAccount: 's09fzm0680ttewcyh7cq',
                lastChangedAt: '2020-07-29 13:05:26',
                folderPath: '8d67pkl6xvazjo3r24a6q44ds6y92c9bt8zgjcwys8bgdbzie4cctu0bov21p68zpdyiq9vbkhui6ulcsmz0316h73xolu7l2nchkfjyawg1di5vw6i0jmtth2dar2rq31vrbr3x3h1ro8wtz7f9xmcxwbfdfvd1kr0g1ikmytpi0zvdhg02pxr493r18miamow8tqmbzoktbjeby13yqlouivur8rlipvamrds6nz8lam0vmyizrpo6q2on0l0',
                description: 'ch18o1wyd1qnb4s46xlaoo8dz6phjb5xo1a2ianaaguayctu8tp4vve9zosm35pn400umso88288n4mut5k4aoefs13bqufa9fw2mmnovltdsnzs1gile9vbcewu8v6vnqa4jze2yxncc9tlp5gxos1p7j0dk6ohdbr5sge6qliqb7ft6s8mggs3kyou62yb1421q0dw7q9qss4r4b1y7dnbqn87w9qr3zwtggzumcc5ktl1bqc5pi5uwzpxrqy',
                application: 'zcgsxfmaygjr34wqydf593nar0m7qohit3gkxayo3p20657ql79bf2jwyuvn',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '0tyi2vj77u2xawwtf9whr9yhxdlkjh00d9j3w9df',
                tenantId: null,
                tenantCode: 'uhx43avwc0bljn0013ollfmkbaloxunqnw8erk9smiwe6g7nst',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'jjs5z0r5gbvv22wf0fvh',
                version: 'smk0yi2vmzvcy6656vgr',
                scenario: 'puqei6kilvcihxza48rfxcisdjjmvzi1iewvfuo0alcvuj9oy8df4y0o9cnt',
                party: 'p9b24wwpbmoa3lj7l1tnp6t5s2pa5qeuwt3le0cg4ew6qb9nvfg449fz65wn7dgaoiwqpmtbn7ivdzz8wp0mkuf9cqx1qckeo2wpxu0p1r7lnb3zeufxbk4spt8swm8nt7as742800lshmon75v299fb5zkuc615',
                component: '5s5v225e8g6ahuzwfourjw4iabmpwmedi8jslvatytcs62a8npmttbkmxqzuxazqbi3gou4mlc6pbv6h3e2jtr5jlnfrzb270lf7rg3t1inn9n4qq3fqkbth60ls9r8nqbcrgvmo5r0557lls8avlw7in0nmf4av',
                interfaceName: '3kjs8m5eayb59fpi287v46f40klgjb67lfmjfav2t4z46gdhii4g43ls76lyscpc9x3vtrkmbunl0nufwi6dvi9w1kogkj74apq5a6eel8ao4mmp5mpu51h2ar74ubqhneenh67z39quk828y6xtv4jybxdgfm6e',
                interfaceNamespace: '5ncxwh4usduoubnvh66y7t6q96swtxtwnsb8sga4bw5u32m9013el8ucw8u316u20f6m66mdmz67tcbpelwrhpva420599elwtuebw035aq7up1z6mh546epmul67nzr1y98u5bw90iact3biqmmsenwnge9y36z',
                iflowName: 'nhlnanzm90ynfzwb7z5i2hf8r0fy2w0a13foh5703heux5q70xbamgrrw5hvq9qx6rgh5zl0v88tt8j007c5fgjq1l11860gtx7n9ijpr4b00vb9r9c72zipemg7oxdtkbbw8te14at22xt0yn2uqejyft5r44jy',
                responsibleUserAccount: 'uk1ii9nkwocw2tq55pty',
                lastChangeUserAccount: 'uok64wituu87ul2u2kmn',
                lastChangedAt: '2020-07-29 09:19:37',
                folderPath: 'xl3a7qmi5805udpkcev5960bs0o180gnpodj2n4s11j83x67cqgwi5nokax1vwcmz36wh5lpuzkn6cffp5pitmbezuw458t0u29jal18s5k9ljnudhjrh3dxojtjn1zcvwg660fp6ax9q9oxzdvzvjrvxp2ktsy8nyp6r6l72ankhehpe684mfvl7lb2jnx74a0g7mqfkrnaj4m5f36somr34e7p1ods59033yziy4s5cf5z95lnyjudgoiwyn1',
                description: '4g3nnykf743241vriqee3u9gs6g3ou6xkqpr41yxs4o9z5jlwyrhe5e2vhnlfb8q9js66l4c9legxqtd7g5uwp6us9itk6yorge6i62gm9jfi3vpzd6cvsbbmfvblvpwg0el4vcxsqq8ejimf0qt4nxxi4fj6jy6m4zcafk1tmci3vo7tedw3j9a3nkyb2xjxh1hmk8zthnmqnw48lhn9cmfyzol8pnu1ib341inx8653sdxb5r88o794z64nyo',
                application: 'z8n5hxpzv3u1ncf7rezsw9hwwscb2zxwqdrpcluhe92jwj6qrw9x8lus872u',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'yup1vzvlxcqrp2gu3xfx5o0gp2smzv95tyk5xpuz',
                
                tenantCode: 'b9x5wymg2f0li24oanudlwi2bwllszi7p6h9ncqyzmozb1r02j',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'u411ca8ts26fc1l9sjqu',
                version: 'wfehchwy0zv2boaiyh0p',
                scenario: 'id2fiqt2avedppuk6g1bi9h9bir4gmnyr8isxczicuw9j025lyvus44xtu3x',
                party: 'z4f4h8y2752vqjaw1myvn1p2nl8l3t8w0meswv5r153lyg7d9bj6iphpav23b88jtev42j54gcen89nyqhzzuy98n8flv7vszuzqe8qc6insa2v3m8i7ht2r4jlb2kp4sab5x2plnjplibmonn071voias1gvomr',
                component: '5869mg29wo4olteld4ar9tp870tzkszkh7c5hnlv5ghbus7konrm6cuw8umrny15j1mlt6kroqwvu1pfaorskf7q2f1hwn4jibx2a77f10lfzj0za9ly37wnjsy3m43lhceg3qzhsl7rcpdbwc97isd87el948rp',
                interfaceName: 'y8150h26e94385rk2ys6zlw920ozzr8vkuhrdn86j7za4j61co1e7iuqa4pz7oqkptu7i4xxseopejxwzw32upxbn1b6emtcjuwfx9raag5b4adqkt5dhuk0qklkhfcrwqqrz1jyobc21d08b0mfa6ltly11gwcp',
                interfaceNamespace: 'i0ild74aoomw96lainvcyi2ekl9ol1dcm30z5os62tm9wpw9bxuzoqt2ro9acboyu72u4miq289cqoyey7jboh69pjc3m60ok87g7u3u88sr8qsez9qbkutiw2b8d04goqhsaz16phodbo4p7eqw9l2epj6stqkc',
                iflowName: 'y1ll0emiirzsmccbxq2pnhe6uyibnu9mo4e6koudnnvvrvksqmifybbxb47xrcz8h7lw2z9da4wcwyare9e8t4obmbx498h9mrt039w47n8xxqdl97qdyrno18xvu36ot7p7bqwm8oes7mrs2lkykfdndeothfvk',
                responsibleUserAccount: 'jjwsb52f5p6ayn9i8c29',
                lastChangeUserAccount: 'kk7a2vt4v2t693z45mys',
                lastChangedAt: '2020-07-29 06:29:01',
                folderPath: 'kp92ijjtdlrajgjbe1qq1flqpmyovdv1h6162fveh8hv2ypn25xrdlf2ea7hx932a7b1kvpb1gt8ka6omrtel7xzbrytf89alixpwb39k3z4vv9ktnwbxdtx13ikn8sj54kpoxo4c79n4czv9jh097uu9zm91ixykda0yvzmrkoosly9hyzarphmb7mwxfwvmgfrx21g6lszjlqjj8mhwson077qr8j6sxluk79ltxm7a7sfj3f2tjygk7wxrm0',
                description: 'xkz830ps55zjl0t1a044fn52koo905csvacbbdsuwloqtxoy468ej2njb5lef92mx0u1vem64v1t8zhgu2jgcjeupncpjckyoha6d6n009ub4clnirkt7fkwcyjdmvegv34qik317odka5lie97ba4ezcr1iiohqxe0ciwkpb6692i5eujjqgx5kvufbezfdi7duzudhl6b74v5u3qtjysbg33ge2a7cmtyyg0ergfr7pwlygn2if85zf0hjhx1',
                application: 'tkv08lgcsi48eqb40bptub2dswft2a5br9rpl5pb7grcy4460uu1tm0j0113',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '5862yfs94jra4g2xpj7a5l4yov8vihyx13rilidh',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: null,
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'ac2trwe4kb34xs91uva7',
                version: 'hgjvd49frzgzbqdd6f01',
                scenario: 'r9y8siyfosdlh3atebjluvbcr3ahiysr6ccv5smlhscqcd8e95ccxz4fxf2m',
                party: 'y7ujxv5sb8lod4p1h5jxk2wruifxx4pnpcly70qkeebuceme4j8barqhexwx0ywuezodhd2nha9wqmchs1dh3twvbbl83ik4tywafqzdipw6o5caebepaos11o4h05sra76fhsqcemwxydw2mlj2qc7hdp6isgzk',
                component: 'f4awr6x23i2t3009kp65a2oysy1jzxc4pbqj557f6tceud34j5676pkx9um11dnfst7rpt0bqklp0cp0ldftwrith5ptg9zz4c3puyrudlcj5oslrvldpoi47o2c3og0p3am7zb3utrlqvnqo97sa580c6kreqmk',
                interfaceName: 'gqs87axv1d77jxkhpq2cqgt3v0ob9s94zxe0mgp50pbh9odikr0361195xo2r242idsz3u9pm432c56djy8hxkqleiq3bbpj88wykl9nfu7aizpy0hz50m2ua3jfqkga9eyzr4mocqvnuq7kvbjsvq0c5i7hzl9f',
                interfaceNamespace: '7s7u0imqxgktqe97gz9vsty2gldf9jekejozkiqj7550nopx8uqwwjud7l5by4bwnjnlutje5rp7p3h9amp1gm6yuedfvbh559c1sgpj3d9wnscy5i46e19ugrffs85150fwp4wtrre1w5ot6du8pgq44amc4fm1',
                iflowName: 'ktsp20nxoivr4cshde54af6v9ef1ty9qfprd2g834py71wxgse3jbvwtsej78qem6b1rczt5mdfkhrkiqdbu02ld5pji7k4dftrlhrx0hn26lixgmh4swegbtaflse1oen02gxv46ytyr73f8tddfabhiz18z9vf',
                responsibleUserAccount: '5dnn91688nz7d6tzczzx',
                lastChangeUserAccount: 'xcsq3sur3k2jupxk7kek',
                lastChangedAt: '2020-07-28 19:58:40',
                folderPath: '2roj1tf94m1h82rojw19if7ekj8mbeazfbszod0a13nrc8ek4h22799inb8buirpip261epympu5f51t6e0cb7hml0uvl0qe1r2dop61rmjqamjahmi8ubnepbnnowdghbhpk4nsga87ssim9mowzhxerqenjbew8oehnv2gzwk8eqxjvll375xop9uix73t60s3x7bvo4bnyhoh33vmov8h62n4q55oholpp36emduftppj4qkhk9voysv4v2u',
                description: 'qwgc6cbauja448f42hiiuei8mgwcs646bdgke5hyobaoc886unjfa58o4bin3d8n5mp6nrc0vsrzzfb6p2mmqt9ver2bqa1jucupvi88ahl3aa2xmlqmiafsb0kdn811i0k9gif78yqnr76mbfnk4e3zv0ko2ftwz15qyws536qyf8z0v96vrpklc2cswmrpzh1xl1frmve361zcocuzmahaniue6owdlezhkcizvhjzb1gbcuclr83dixbt5ke',
                application: '9et40cjhovfw9n0n7trz8uudro0so90i1kzr304vdv9ucs1v2ju7qw9mx0t3',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'nswolrwal8hisnpxt2i4l9vcj8dlee9utmdhp7zw',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'xjwd33m7ncmzwq3fkk34',
                version: 'dcqammy3ohnckfvmcrv5',
                scenario: 'm8y31xmw7nizzg8f5i3vj7wjquguu8h2cyq0rqvcxzg5cbmqc358ikcjsiaq',
                party: 'xpfq8o9k4aqurf713lki9viyoppxglsl0g6zzcanfasoimq72a1fq8p1dekivtndh6lbv33abrl1mee0fm4l58winv2dbb4l90p596uhco6cf77ti9binrymtf3sov9i5grzfrmxwmbl4h233zwr78hb1tagxjm5',
                component: '1ft3e4nlnfahthqbfklsbmmsmapzfzlx3ibkzeqvxrgz77j2hn48emj92ttphrto4slpw7ap5j8pkn713gegy5j06yzju6vn1thf2pdo3zslsvkserdasiptsktn0rbtq0bh4vscgabwnxkqii70fc9d06qi5c92',
                interfaceName: 'u252vhajtlzpiutpvwbop2fcc8e35thy9lz4niy8rzxbg1sznd86e8mr82rcqgx32d0z0m6qay485j1zjpr5xvks90umry9xbu2a9x6ssolg5wvbeycnanj7cobtzdha8xq81cn5wo903kpdh37t1oxre8h294g1',
                interfaceNamespace: '3bccraaekr8m9xetyy9sgaaxc2756kall355p70x2lmjrfw3jca95s6m7r34scbxdhuqeb7zr4y6aku9nt08cwxg28v8pqizrhpzksec0zjgh0krxg9hev03rxl078i2j6drnd2mi7mfwwkzyxqv77vqy6l3zkl9',
                iflowName: 'qwp661s1180aczqynfo4oadahc7zeqdvu3yas1mg2n9jk8o1aph25pxe126yd2nqxqdheom67ulkv9lk5q622bg4cktjf0pqbtlhs0uo0t9ubyom2quoccn51eafnx3g31eyiscf1762sofseuwipj315hvqq65g',
                responsibleUserAccount: 'w605fz1jyyh9oj948vqc',
                lastChangeUserAccount: 'zr7c5fy3ldxwa1n199e5',
                lastChangedAt: '2020-07-29 12:40:08',
                folderPath: '8atwtiy186pht47rctwrwyfpuzghcwuyvo8jmn31kff3berr8ookukc8l7fhd4m15r3hu5m1g1ulbzglfky39z20h0o7451p73rn5n2qc3raoe9st8zf14g48llua4et6ltwuu99xliz5o29kv9o6qu0mr6cbv8pab74pswm2klc3ce9lu0paskoo1mv3lxzdg5qvt7r1ogundryc9efsc36tpqdaiy7vsbdguuoiuy10gol7joxaxis2nwsyck',
                description: 'nlpcnwk8a0gmveybb09poranb8s5be6e54tgqpt8hcav44en7vc4wqea7jzibm4rjbh2empr94ioznt60smi2nq12htzf81a5cg5yc33fccz689cwluurtprs72z8qxwldg9lokq62felbby998wg5gztbtygipegb42gfzmvoczt5s2eommniqz3y61al9fc3g3959ne3ljr5a7ura1rckmxt22c7n7m9gji3jfq8c3n6mnrbech7yddt8pyq2',
                application: 'v2awi22y7a2h4h3dia401tmwez1vs3eshevhiq4iaocqzrn0reyk5k5g43w9',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '3mib58luv5tgnpo9yqs264jj5qn2udxu7nrvnhll',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'rjbuljs85vc9lnglbtu5ts985dfsc5pipd28qc8fqypvs6tgj8',
                systemId: null,
                systemName: '49jstbt0d9zajkwpkxe7',
                version: 'eb72mguqxr0fhrjgiu0q',
                scenario: 'p640aansdnf98mgcsswou8ak20a8jgrbqwjj12ohlymxt3boodl3k0gp4qzi',
                party: 'ld4ivj9usgnyuxuvx3suhr935zaknha6vhz22emor0x5x05qdskywq2y0feaa7v7r7jh97vgu6osppustasl0dikz2t1dom30zsk89iil231ksa3ltu07x3tjyg1f2cl7887456gxn0j73ejrsbs64kwdvq7x4fp',
                component: 'ou1mw3f8dwbd55wm0ao2pqd40uqu6cpg9q5v2unl3k50mk6krnsiplonsi56csptwqyoyijshvhogn2ahf802uai0rxw4f1jg0obd3kbu74t27mbqboovpu0dxm6nno8lhju7wf8uw3m6v4768wkpkwebb8pdxdb',
                interfaceName: 'y3bvxv35jsy7sv6d32imgnk06u8c8042f91gfqhbyre7d6m3vz4g9qnjdkod33tdhtxn4hizafd7yiiq0bcg4otglk6scx2rkjy8uylzbim18ffsu74csnqrfmnyaif5evxtldexhbdugjew6s7w2yzrcayat56u',
                interfaceNamespace: 'oxh99habp2sjkcre1xkg5kdei174davsm9ocdgjfmm8aaha1vw0kxt1z3yuqdxrz9m4itbgtxixlmuwc1h46xhgegw8rgckdnv18osgq9yzpx3of3z5x4685nzjwl06fpqkkxd4338jlvae9j3ogxe6wgz84uxc5',
                iflowName: 'n1go9g90zln0prywhln115ij111xrq5s14ozmd0dfc066vnijdcgys8qzmdjs5z1wvr6sm9ucmooh3aybhlwwwprpcdqh06g317ml2jiswn20w1ijgcnhdtqsb7r4wfzzs7oerlf5eucj3v4yruf87vl8332oafm',
                responsibleUserAccount: 'jnooytv0pqowxw90zbye',
                lastChangeUserAccount: 'b3c0wupusg95irf2zr9x',
                lastChangedAt: '2020-07-29 04:11:10',
                folderPath: 'ft197n8m73frvqtrqo196brev3eudgc5hex81sbz8byugoskwa002pk3jpehkxf9hw7mxh3sp28n9tcmpdiuhe3712hyqc180uni50i8w10c3mb50c0uklsasrqnqiz6wnwmth2pl3eokma6pbhmns0ao2ww01qmc60amjpgv2va7g9q715b2ighq6a160hy99hree012pvtnzxupk693bs3perrcwrqj00brwy7kby6layzo3kojjjm6acaor4',
                description: 'cjznkq7hl5v51ozs3v2fju1rq8wmh9ffxa19qi2tcz6v0e7mlav4zfzhnc5dl9jkuee1cgpqgopbhig60djdqwgz3sihdp5effnlkc8emhuk1uajy044iopke8koa3mfiaortyvroayuc53ox24zbig9jn8rbjzizj0gkunt3e0yu7qva0sa7rrvpk836t2i1rmxvntp4fmtf6c292y3pwnh22qu2n0k9e66scax128gg54bhxtvdnpn64u7u2q',
                application: 'sbxh4tpmcnx8xco2lvbev7m1od1ctz2omit18ss6cjw20ajzg1t23l7x10wz',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'bfz5mcmmbgil30t3kwdzrz1mkjkijgkpor7sdog1',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'mai3c8duecjcznwwfermtrea7rh1lb17mg8ew35c4wxgj22mki',
                
                systemName: 'katytjyz9ih7aw5i5u5z',
                version: 'iuuz6knvw2wd4vxhfqot',
                scenario: 'ka3h3254msv42ks4qvi8awvatzfni6oj65m7fhkpliwpleoxospv9amq2op9',
                party: 'trstsfgq49div37an2wq57am6zi38hma2b33ql2ir1bfptg9sxkx4ci2vn1a5e0yqc0yhmzprtl84wbt9adfz5stdfkawx5x1tak5byjy8s2r25szo5136fix2qqftpf3alsbww8b4vvxcthmh4aq8pd5uzaldme',
                component: 'joim9c2bkxsxcjep4j563mc6jstpie3f9ije1vihnofyby2h2akmq75v0v9adqf179jc34dclvem07qc2pqe9t9hqxos5hu4ca3fv9hp6akg0omymk91qcodgd6b5m9qk27cckf5v1butsn0uvd5v9f72au4ds5z',
                interfaceName: 'e70l1cch6xmz7kg6ujhwo7yzwc74nn1hmdhj3rreiewpay11ev8a6nwijchu35dffwsy7hx1nynzki03hjutk0votwtmmdn6jcgn3l7ngw0hwwdugcybzz162e156cbde6xud2aizp1i0ct24h9leucisjsia7bn',
                interfaceNamespace: 'ovmgcwbryzau6a5av7g03ee36x2jg261ysgvhl8krlfsuxwnnprr25uqh8j7rc1g7hj03ysuf4fkkrr8i7332pe5pe243v6sfn1u1lq3b492okuapkouj8bjoiucasqz85omx0dmbbxkzvn87z2b94k72mzn0d25',
                iflowName: 'kjwkq25tcvqt9f7ywaff731rlr31ibnbgq1yr819pjbou3djd1ro2kh7zcu26ddvcx8ufyyllf8ibbs779nsb4hmkhsspkasbrh6ljn6bm8227aupe0pd3acgyjsrog710373mknxigypyrnd5pw1q7kp1v9p31e',
                responsibleUserAccount: '53p9tr0ewz0r5aoblc91',
                lastChangeUserAccount: '2o7s9eqlkbmoxx8pj94t',
                lastChangedAt: '2020-07-29 00:14:42',
                folderPath: 'xe4jif7rmlrjma39cbcnzh1wluef89e7zvq8w3mp0v0fo3yai8876oe5jkuvn46ulz2ojt6kvjbf8rpwvr9une8u55q8n2jdf9r5s7jd9tpw20ktqkfmsiczs9urvs52f7bys7xy6ty2q6gzp7ffcu4v8w1b9ujyctmtwqqbrbu1bzepokkr5hrabj4u16yhfo6yu85rqgow40kvhwbaq4vgw5r2i3xhdciheugwo7hv9eklhdq4h9pq79u8oz1',
                description: 't68g5aidxgjzml33kf6f35rwm8ypodicnwlcbsr2e1rkdx1ldp8p23f2eton6hum4vflenssa35pz7a9ept9druo53sc2bklhfzk1p734k1pva899oslqjezi7rdzj3lr3035m6ety7dab6rczg6wk98qnaatp9raxncdps9xrcp0pwgbta1zx37d1cuap1kv1s683x8oe77wnz8jdkjp5wdhtxmp1ifm6i7mp8yk90ez90yf0pqokjcs9lsovy',
                application: 'eydx4hcbgomevssqib46ysenp3g1uzho3rnzz81k9frkuvlipfb83daz4dq9',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'x1ov08imsppmhvev6mowjlqyjntqoh8kv9uskqym',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '6ldt7ev8d00hpsmox6bakomx7lfbcs6o7hkhyaz348l4x4qsjp',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: null,
                version: 'k2qrriw889zijlypne0t',
                scenario: 'xr9ghai8r1a7ygd7cfftc9ledldp15e43f25t48ssef6qv42ws6vivimjdy3',
                party: '7u9e3rx9d1ahd5lewzvlqr90bujsajsm123mcjzi7qumw5e7wdrga952of8tl7dl2nrcj2d2zcaxesy6bxz0iggjeik9wpke55di93wxgf1zij89vwhchdnsqrt7jobwqtepfvpvchrtyrnpk827ls3ixsd40ttx',
                component: 'vyyq9oke7st7f9045ehz6y7u2xr5poc890mspnbr4zmyi4zyi8n9pdn2kam6toetcb9nslur7dcq8wgzx4zoxl43hct7o14z0pmxhpw3ozs692r1hga8axqf3okct684i6odssw64u2rfsw7an7az5yqhjnm5tm8',
                interfaceName: '9w52itsa4zwnpuh78xtti6s9cmwg9csrsxvpfl0dqr08szhwy32qpo45m6sr2tjtx8y56zrgioe4qxje5ikcz00fzsj390kyyz24g00wgkpnw37onjtkrxe2ukn4xjg7zzzi36wv0z7e2ls2u8m8o04l9l2hbevi',
                interfaceNamespace: 'y9q0hymlkknsx47yb4ospt9th3g56qt2xieqwmikjnn0oclszmwjsph2qu4xnx6om2bn32n65if39ykrvycq7fjonbzlvi8m7olrwvbxe4dtr3az6m2tm63asixb0qjuda9o2rmoa6njng0fpnkcxmw1e5qlhi7y',
                iflowName: '9c1p7g3uez55704cdbaa8h9e26l1oi3on9bq7m8kqthhxs8aygphls6rfv1k0rrotie5fa3ag7d6qibzx1xzw2u5nankh20ppt2uq265f13a1vk22mlgz2psl3hzl92tdh585pf7u8osu5z79wc4wt4nvn6sy9pk',
                responsibleUserAccount: 'rngqqxymztx0t27hes6x',
                lastChangeUserAccount: 'xrhsa1c526idwu3p2zqm',
                lastChangedAt: '2020-07-29 11:30:23',
                folderPath: '6gacefn5kpghkbdd31jkz6x86yd6uhekey2859ctquz0m216vp9u7xpa3rawh83157olcsoypxapmzamue46d8dwhjtwtk4syqj1cep3pqj36hlp4urlta67ux1kqbb9aojm3eyj0uqr7fbq3why2stnvls0ed3rfn4k35nztxl40v7aoxilaone9mzsfloc65zl7ki8cs77g4xoyq4q8tqg2rjyccrs5j7ks3g1qt4qggfytrvwdghai9m3jrh',
                description: 'brfe8zk8co9qpngzwlmmxq2v9ux7avb126laa8fanpn6sf44xfonjb1px9twufdhervwyl6ddoytdyw20i98pobu4wli07z2v49nm964nfctliye9nbq7co3w1rfwgjl4mnkhhj894m22d0sf965f1ppqv6tlmmiklnn8dox83y81v8lmjorevsxdhd50c51tls4vdtoufl3f4zefn5nv96fqccwrchdfyebz0zl8j6qbmto1cyee7u4x0v0mwm',
                application: 'koi92jyvg0t0c978b8qaylojk87xnj3dnkhxubs34cjn9ncgwra4l3bdgckn',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'x9hw7grsay41szgyed9hyfzcz1m3p2w32bnqnc7e',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'mt6o6xomlfjp2g2udfbi6aaamo197nogdfvyrxb29rrienwor0',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                
                version: 'lm4kxpud4brx6padhcs8',
                scenario: 'up3ygor5pufjvxd214dvxzm0fhzxlcmnmzfr5wgpiclx9g3tg6tk8k52e2x9',
                party: '7jcm2wjm5okwtwzspb8tb14gbl0xb0ccn3cz4tr7kyt2oamvqrcznkme4jg9ocdbcwusrhhq489bnhryo7ocqq36amb0w2eflionmc0oivokvob87omyb3vpuguov5tmy75rh3mfp7p48dbc1b3skvc1pnomt1mj',
                component: 'i5h36b1j8ywi08z0nsor79fqy6rcke1l2f57q9o4tcqjnxerjas0jwk6vb9t1zxn205zw2dso09cjhvxl7s3z39fjw83ip7ookr996vz2us6qbw6i018mrmzqfpohem80j8pckg323keeinsxn9xagcnw5kpp7pd',
                interfaceName: '7myyw3i9xfpowk7egjx9arab22gvy649o32wutheygjln2k8edwxte7cbkvhepjs52y2gdppnirkn8slaar5ofn7zmhg9yxmoww6ymwxug71zgtitxws27od8wqbbx3uzs8twk8rod5cqdpkf27cw4f3fvgg7uc8',
                interfaceNamespace: 'cexzz7omr59g9dglc0hiizp2p335d03wqasuxtdmopdi3zz11uwut44a3be1vn7dudmlj9172d6pxcc65izsil3ntvczzv8ps89cvrhf1xak9vhv3q7yjra5egynhrih2xyvglak3aomfwuf1oavy5l0fik2buts',
                iflowName: 'vdwgie6lfauj5hzzs6u5oa2ogwj3hu51rw5y4jfv4ts24liaxkncjmjmz3kv6636nh06ch669b0othdds0x7ociqpp5ohmexalq3c8aepcvylmz2fmv5im14bm5hl3abs35z9pbn94666y0lx2f9m4s3rwyg86y2',
                responsibleUserAccount: '04a57nq0zqzfid85siqx',
                lastChangeUserAccount: 'yb8xex1u0yaggikfugt8',
                lastChangedAt: '2020-07-28 18:31:52',
                folderPath: '6kfj3qngtc6uju22o2ofz73ka44pslw92840jd6hg6fgxtx6oy6wouct5p7nygilk74vexe4g9gmj2rny3ph59zhdysabrxhw9g3zgje35ahdu64dbfbufbinxd8cvk6i6jq01mpwp0g84wzlpuzx5beiypqo8f6b18b8fle3hse6xegnc8mh9rsqsfb3gf0z3fi8b4oocje94piftjylsrc67jd5dra58f82cxm7jeg79qf9akocjmvzk5l9jm',
                description: 'eowk7yx5h63dga6mvi0d3hjb9orw2dlfhoj91ptje493f5h4tij7cjcrap6vnfvmgonyls0bu5x276xqohdvjkh23kxmgp31qnlmjntbpr8snwicv1zc8aybs7ikgs3bk7ahamccblq1gwxm8gpmfpqjvp1vjaufsbu7so0jxb4lusske5dk197gsv2etnyhxqp1os1ur15zhspj7s6zbl1js0h1id9jn8x6snc87tfnpuub83so17xabv72v8n',
                application: 'mob3u8ojj0s1ul4w367z8czotmi5lg75x4xkv10dxgs3cymgpto2sttmh8r2',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '5g8uy2ym890opnn8vncm7o17spvej5y451eqwp87',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'hteb67wjunkmzqmz0qtws7mfdy0z5s9pvfx0ctjef5j9jwxf2y',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'wrtw3k5h7wn2gnfik67q',
                version: null,
                scenario: 'we8afoawjcd5jdt5ihl22k9ggbxea03sxkmg9y91bo66108rgc7owpjo7j87',
                party: 'ymhloje8jkkdsgnn1ltoqxv26g63i7qbr3vznto5et2avmcrnfyl7joqzcucytytt9b0rfqjizgrk7aoa14zwkefc1pv0gm9fyh4wkypbdfiwx5wpfncu9mpcjgif58mduzjhmv04rd9h27b4rbduzw7982nnisc',
                component: '4gshliy6ojvobi6nmt0fsxeeyeh5kqrrrr1rwq7n0cex18pnpl2rc7zgqpiticuvxl4gamj7mg961julo4l2xrh24y0sd49w3ltiswrfwdgsj3n7n7cb484kqawst5r249h8h25exuzzlty3xne4gpjgz3xdqjdk',
                interfaceName: '6msmumxrej6gr1razbotyzcreay3ow583g2hzinyb9shaz9jo2nsgwpe1258m6q3npzmn9v51ig4tu3u1ydcbwlbojzjcv49ld9remdo3a80oni7kuxt79b0fpf1v5zdgw3hi5fdx3is2xw75789vx003u8bkmoy',
                interfaceNamespace: 'ufehmo9abj9bsoxcy8llgocv357z6gwoyjxkktnksl4drt7ql86zu8dr0icvnnmot2alezusoxk4qhdoodcnudpygj9yfq16k6dd2t1oxogrqrl2p79r88wid6xt8yka3520sl3aqjn0dns7xofzwap3b7nsw0qc',
                iflowName: 'eca4ol958cmt7n80xc9l0zwpq306jsu5lbnfw1v12mkz8v4xr4wyiakjuphu0tch307ct3r8509j2i5x8vytqnv5g5c8354obw8325kfwhik5kmcul0ih1ruu4qn9xmhdtca82i2vqr1fqyib5g5a5f0rvqcoau2',
                responsibleUserAccount: 'dgt0naz56c6etn5sp5jc',
                lastChangeUserAccount: 'w35jd27jq15qiqgb4z7k',
                lastChangedAt: '2020-07-28 18:06:01',
                folderPath: 'i5pqzru7cc1jzom4un139y5k9hvyql2qluwla455x7rp7rmju4x6wrh1iuwirgx62zvj3e5ef1ecuwvlungzx7xsk5fe42e7hpreqiajj9lhkxbzi5ptcp0biuois7h8bmfyhvbrptz0baadmb4je7e6tmcbeteg8vbngpqgzadbxdeh7iu1uk57olis7sewmckrx9r7k8zi2i76uzzq808a3mvn7xwo9nriuzlvakdazy5rgfcvs7rofms9zxf',
                description: 'fbqfucswrpenlxci6c56ooxr5d633rs7tz3ctfqg2on72ekm8fjw07ou341ag00aqdtewz3gfpo0zbmnpsaxz6lou51fng0ldm7zilfpfzkc6xmpnxnaw58sv7pm8820dpcpzv86u0lw696e188tv3uzpkv6dz2r2hxd3zx42a49eroyl00hxvi808qd0iftq4pkwccy9i1wzkjy2npicwoxkch51xw7f1zhuavf52i933pycqrhq5om29l5l1w',
                application: '7dixa8k05t88ltcunwr7p9eridbnq4ss7fw6bbln0iuf5ye8welq2e9yhcxi',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'hxmxyd03on6rqe922qjub1h4tg4gtybb1gp9xka5',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'rxmn66ij9ft0f0k2yx7m7b1eknk8x601mos1ea5kh289slx5po',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'dr5eggcvvmyd7evxjltz',
                
                scenario: 'gw6b3jl1yyoqssdz9z0c723lam0q4wm2r7hus4s4ihfbu1wya8z6ylm2foqj',
                party: '3bi0m0c5ufvnukz2mf7ai1gcdno1najhfotyx80sh9akfiju6t0gs8w0oelm7ic1mesdchbnfdx2s4fl1sdcf792sbcl0yg4i28fsitxxndu7dmroe186gi1rj6hu51hqxtidcbj7itaxf121o8ecv3ycvznlwzx',
                component: '1o2xb09e4bi4rxeahsrumpk7hu2w84hp6mi7ud0auv39howtt8ppgh80q03uc3h4bm5oi5ew3vhnjlfze18i4fo6buht95e4d7ugey7g17ro0dkrsg3gzcvzkzh6aqkdb28yaw8b74ivub7qa9qmohkm7yykj99d',
                interfaceName: 'ztpq7m4ac9bcfz6jyxz02lbn95cvbrh4fgn8doeuxe3x4024ws06q9fct0i6ccp9xlnxwrvng89t5m0v7cr2a4v55x3jtoeg11u864e4ur5ynmm8fqgm9a16gpx1xwhc321dqnre0edx4gw1xgy79ewzbmwiam44',
                interfaceNamespace: 'efbevo6s29ustzjcliu3ciy2h8vb4s9e2phe88670qih7du81xbiq9mgka3b5p8uruqrhiu7p4ei4szz7r1wyahpfka72afgneacbiw4hh999qs2ol06z4zt7bygivksenbl6ru1dg0cqgyvcipbf80xhzto8wxc',
                iflowName: 'l3merainfuqzpe3zlwrce9ojesrr75qbrjvhq93nf8akzuyfbrvnzo4jdk0f2oc4s7jvavus9ylnual7t3xiqbzdocnl5fox64oil2craojvbqj5kho75x5ww3fdf84ur47weyr3apyvmlte41ct1ucebkft5hwo',
                responsibleUserAccount: 'g46qqmcmql7cngotuyfa',
                lastChangeUserAccount: 'slvq2fjgf7sh5dwmyj70',
                lastChangedAt: '2020-07-29 09:11:18',
                folderPath: 'j2oo4yip6i7w4obklelrd9wfbia3f0otaaj1n86c0g2cf2nmwrlu67zqni9rxw2gq7u36kew4pgzvod85n64ilqsyi68i9k77m5710jcu0e7ml1xmgnsbr5boxkz3df2w9a6b463ck5zmsmyhoedaq2yvsvhgdtevcwm0sg9lnh6s8iecx83llp8ydxdexhbaf55niyfjpgose4iau2damg89t7k3xddo9ugwnxw8qtbjompp20hqlyqwhf2wgi',
                description: 'emd3z37zpjwtyy0fgjf8bppd1cjk4qq99mpr4zg2immpe3t1t5csnovmnqb2a73yeod7ba7remnaegrgnqc939fbfgabu79p5qgmwl8oarezz2mnx88n7hwdlelv8qw5bpf8snnqzrfkwgqqz117mcf30jcw1bz90276jz53kdri2ujy3fxp5acf46vi3nbfofy476zglbfbcp5d4zy907lsk6qxy001hdkl0yy6vpfqyl7uwtvja7hjba39wcb',
                application: 'xb4fz2hxrmpzgbypsc6vtprqxy7wzpm3xd67dze6cy96e6g54xspx70w17hs',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '57usb88d5xkmr90kl8uqkt5eetq0vld86h61p403',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'ae5a6g8idzecxobhlk8fk1ynhymm56o8eqywdog7078i8fp4op',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: '3aun1dc8a2unjk5gcq6t',
                version: 'vp8w9jkpq8mohocge260',
                scenario: null,
                party: 'olkx9kauur4rzwjpzltnl2mxq0rjgg9qi4ud8fb3thbz33etmcw1wo02otgcxv6swk4t6mid59higryzpu2894ls9tac9bo7tg0lcgf6c5gjw0qz2pcbyn3lfs4vi5eda0rqm2c3opltblgsmdedac8l1osiasuq',
                component: 'q54jyz42ewpqcqij4yy53nq5xzsgkrvif6rgk9ondvpq5c1kzriquh3gtiwesm8pu4qmu0khhqsxu30kb2l2cgozvxiypnejm5bqctjy0i6qm8dehfghy16u5cx6innla182s6fwvp85evthop0c0lopf3rx3s3c',
                interfaceName: '9l0uv7rc4gkar4t0kq2phdnnblbqh64wakxg2t3v9402aej7pvsxeqhdy42bdtv2sx1djh59egb9f1pxp6pvbr320b96abv2ze81w892dcdffm8utnmtncf5dkiit2qq2beh9smqq6ck5kvz1rfrdsf561aotyvf',
                interfaceNamespace: 'rdmri4gr8csi4jbtbtd2iqy7k98f26fqdrronx4efki5yqu0kkxtl08g6vpuer7cob32scmytp961ap08hkareqtdflu0vxti8ytkhiq67n49qhw27hplw5gbyqwp1ek4yriate603bwk80rrwm42e7aio7xg6oc',
                iflowName: 'r6qsh9yd9hnhakh3ph8umu4gx2k6lxugegzzw81ctakp1spo6bwk52ljtd1v7hjkv65qd7klukh7wkdytrojhzcrmkw2n1hkw8z0tp0ofxqlucjlb7gitepdlgp8tmdx1tdh288bqbls1u67mic3wlp3edd2hop7',
                responsibleUserAccount: 'us7rmznjio1ilz3owszx',
                lastChangeUserAccount: '1h6de7ro4apav2j20bkd',
                lastChangedAt: '2020-07-29 11:00:51',
                folderPath: 'ev2h0hh5zq43vvj3zywu4enhkaue79y3864nhk5drgvjqallv4wwkr6ofrsxcqgz86guosjmssqltnlc3s8ctd45rj6z0gvm6cz5eh3ehsy8v8jdce8v233txtx4hq46u06lajcursxhe6kapejc6v1wqe7jotyp0zqz684ssmffn07ygr2ojut03wc3lxnwrbipwltqwgdtzbn26j6zhaarpwzcpbfo1si9v2xlxsbcz2umr9s09g9l6pdfot6',
                description: '04alflzr4noqcrevzqi5tusdo2ec91q251h76vjohw3r11i4khw3la2mo6lauk3k9of1wzrofy1pkxjhiaoe0e5z6ji1c5q6rpbt39liqmjq5z1ikuj7o3t3cqzm2u16jqvuju0tr7ffbxtgxm1k79mtxgs1e8shankf9l155k5cj9zoc5v9i0qucwq8wrf8cudyecfu6f0s11vi6tvivhdkhgvjv2mn9f3dxukclahjq19po3tui45k8f184q8',
                application: 'mwixhq9v2snc3gft0itzf30opknqk8nj0u111w7mr55ri2gpn7420bfm7an0',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'opz957nk9bnyaa8ep1g3x1nbvcdughn410hxiqwe',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'msy6ewqgcpmdde65oivg4fkjd48geufkw4b3r2e33ngoiaiatl',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'os4xwruebuyxg96h6yyq',
                version: '84wn5tus61nczzrkd37c',
                
                party: 'ciqzx5no7c01yskf5c8mvmdd5a22jxklfcml3rao4aq6h0map3z6reobrr4jpy8wdiqo4utntkctv4qdkiqp88osbne4js5w1ctd2kqhxpw7yovbhivppxjyyqlg1wvugsqgohajxq9s8ogepcuvvv7tgdfbylpx',
                component: 't3qi7w73prjzj4jdyggvn198jw251s6r6wylb9n9gc4x0dycxbi49go960pmx1ejte0wydsbkyc4ywtdltkgfz684cmrjlrwghugagx85hhet3ebth3k1g95d0kawfzsej1t9pdrge1jbrtl9z5pz0hfu5b9bl85',
                interfaceName: 'vif8gu2oi24pjruowgfhetpv5hfekb0n077qgbyaef23srcunfc76kwhlwv8tdz95wro9xds1fck8p2uszg1jmd122jy7bqiw74rm43v6tpjwqwnqxmujk6ktgorsckh500l2xishdg3gofwun88y92vmcyd392o',
                interfaceNamespace: 'wlpqmratpemjc1vf73p9kyac9wbm674xmt86qw398erv0bftfdhpi08llf0ktsjfrf5jcn155vkpkmp78z2vmn7xbzhwfn83xlvqe19gg3plhw3jqwnsfxis0p216dg3jshvpyh8dv0g4n8i6sl68v20tdutv2k4',
                iflowName: 'qsmuu7k34jd3ngezqmr79vxwv261ah2hfxxoeub9o2wauqmar2fzni3w3smk2l9sqjcny4uy8kz9qjyeps9zw3ey0og2hpjxhlf4z2nzbrth0egvgmcsyu0bisr9uyqpjaqrktq2ye208puzuym9qqodx6je6k63',
                responsibleUserAccount: '0q73di2ux98sdd6yo2fe',
                lastChangeUserAccount: 'iuzyxhilfsoq3wputrbm',
                lastChangedAt: '2020-07-29 03:25:14',
                folderPath: 'facc1d7b1sm535pe4jv9en1vnv18ab857heuxnwlskr39x48ckh2hzko8foiwvaedj1vryin3g3ir1gxqrye6b5ta9d40luw2jbwmncn2lht02jehqkc8evn55wav88fy0z21kss228vmksis3ocwcznp7o13tyq75n98lw9lboeesjf2339tejud81k6tvm472a8lg2307qr8qw45g8n427oli6ie182k68vh6slu5gtsjwsxq732h9drxrb5b',
                description: '579xb5mc5xmiwrdjsl8pgluht51ub2xm2g3yyduurax1bjr3s7wiipg5hr1lzuf0dfmc5lsn6zerksaqye2yf5dou8ww39pjsi8par6bz8wh1oa17w1w34hl94w2i2ta9s3172rspx0pbw02m83z0ds2nua318s9lzkgtxr7a9qemxus0keo155dlgzyvtu09u15vf9iqfkekkd81efe2pe1w7ydzqwcryuokfsfzu64dgik52s1tal085yl55t',
                application: 'fpxybcmn0bgswxj942swdkrkcfvia1y1bos1boe8xiqndumwhqchfxf9xq8g',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'zq4sjfxv51vc8oy7sylj6xolvg0rc4kijo9ixfa4',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'wjmhzcbtyi9z98tmth1ovwyyrjjs2ci7270md986daun87dw6c',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'ru86edjrwut4eg7imuze',
                version: 'fze7a1ekatjypgrifw1m',
                scenario: 'vm5bbum593ehy0mjq0feomgvivgqt8q6ct4ge677c86ks8qx8igiy1l65taz',
                party: 'zp7d931kr0orfs9iq9m7nn4vy97aw7v8i9h7bhpivk6bjq1kausumplodujqoi9jchdr4f89imruvo34fcxx6w0o3te4r5xdbgwyjbbj87uzdykakr9m76hcd76hgj9gkmyq8rygvb4vw4eeehzblfwkrjro82xl',
                component: null,
                interfaceName: 'g6pl59by66xtxz3ha6tylbi7z64800odytzij9y9m02p0dkackbe7f0gw22d3ipynzcswmkrx8pz5b0uhd35j95ppqzi8drvijbickuocn1u6aokojij5titnathuxj6ecy1rnnethq6q6j176itx8p3doz47axl',
                interfaceNamespace: 'unmvck8obn75radw7hoykdzjru8gn6655uyhz7jutn364nb3ss2hjbps5o5dexxqqqc49ugammgh34ahkaa1e0ug36zn3b7ap1ctotcbmt07tmbkbvwhkbybyspnprq54ytteq9rnaw3oimrj24o7159z8b988zi',
                iflowName: '7wdduwdqkbabn7gs7pitrqebx8iq0nwrw9ijj68xxdfsuk98ey0nmrzn1vcwwvnu975fbvtycrt9wy362sy8dfrrol43ucd3908f0b1yqhe6f8hpeg9ocgv8sraelnld1gpq9vvnznbojfh29tr9lons9o567843',
                responsibleUserAccount: '33o0z68sszz3k09f41ps',
                lastChangeUserAccount: 'amnkqhiqacbxex5qurmw',
                lastChangedAt: '2020-07-29 03:37:20',
                folderPath: 'n35qsrqxeu2c01vc0sfy1jnh4gzrsv7c64dwtq5w5tr0xhqxs6e95csepodbe6r5wtqxrqdm5d0c465oay0y571zozmlbzqxawq8xkmmgkd5mrw6cya23ks1ekhzr7pywws96n0qw923f4t3gy4vyg6v4mkdxsnzcxweo6gt11hc72wrju9jcofowfib0h1jc8gxonnlur954pcf9hno9ovcbqi384u52d74ucdnnt29xdqu93py67p0h2bom9v',
                description: 'ui7y2gys9rplw0aszkjy5q45httpqkp951ri0dflgb31hujgequ1xzoec0a6bripkzfshuofaop69q3qsdx2k5ivffysedt7k9e6sarzi0nppxxttu2zbzmfnwtdwlkki2zsaagp8l5vvgeyyeab1b41r21s58taq94slp5esaw4docc6dhbw7a0hvzb1jqnawbo1pazhieo5mjtux5f9rgz88hnotwq0jrrjemra60p3x08k20am4grd40jv4f',
                application: '9lyd1jn4w7e7bj6w6b53v537rxe3ngyhf2zlr8w78pgmusr2jwj20oftqbvc',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'nq2yi25pg9pbh8klfy9ah85plnua73zjnin6hits',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '1a4s3x8ux69hotmhpxayszprvthwcsl3u296qslrt5vmjnsmpo',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'iggp31mzrfa0qo0xwehj',
                version: 'fm8wk2b2r94ubu9ia1na',
                scenario: '96tjrzv82vravzses9iovz6050tlpp368ufxzwl4zdo9y4x52zpizql280tt',
                party: 't5rhf28ng4l9ofh761npmwtzvd6nr7a57lo01y9wl4csn03jz91h0gupy5xsmu2d1dcfkgxxm98xfr5mhpcsi09ysarqy3bjg63r3zqhjzdb6xt7e6uau3y5uo3sar1gb8xszfy5frn7l24ll8p7xnp8omgz8j9t',
                
                interfaceName: 'q9klybbpr9g301k16eo8tnqfncxqu63vk1r1byoc13ohjt07cf0lyaqcfcfqb7kluuishjp0eagm4hekvy6wg5itlk0z43v0dhxpg021nijq9uf3mgkvaz5tc9dc2qng0npf82szdvfhae1lm6lsum5c7nsslfd5',
                interfaceNamespace: 's4wz8h0e9u4qj3d1otggqwz3fitds0cwk95m9ggrt3nuwsf5ztkjdry6nxt93mhfpc81fwfxtcb9xhl2wxoxkjjoiqc10q8272v769jra0aredqbn0fn2dw0fpdadec3l3byaaehhxhha0hwk65crdif96ifd3ni',
                iflowName: 'dgv1y5fjohknjtzyw2ujalkt6b69gpa5gy8qv6wqzb9865k7sue3hze71vdz5x5hq3zpum09ix5xyhdvzc1s3pairyizi5w8lobma63wbfxmkfliihinp81s2xa0n1hw7d48uzyg39ore81geozlb3190j2rrv5q',
                responsibleUserAccount: '0eyo1npdrar551ojs3jk',
                lastChangeUserAccount: 'hkkcmcc4ubeowzosn7bx',
                lastChangedAt: '2020-07-28 22:33:00',
                folderPath: 'qnle1vgq25hofuavuzezw4ws7n9iqbiai00zycz69e05i1ziuhb58ea19s96hvm6t3rfyjorg96modpl0unvm08zx31nj1p9kbjjzv1ohsd7kp014r74om4ekpuae7uivw09tlemw4zgq2r9sphju85vcsqic6nyli8r7ws2603bx2e4aypxag8oxhylha3v1p7fmqkz2o6dqrni6mauwxlhdb2p2i5ykjy7h08q8xw0dmlt86wwgrf95ihgclk',
                description: '5tqkklews11xv0rl66jr0m8g4ko3ut0kjcyep971e08vth4auvisvlvm8jcuinchyq5jb0xi79k6b228vlr87t1e6ny1fcc43js84bqlpn826ve9ause5bwm5f1y099llngujdkfbw4vbkp56z6y0ari0zbuqgopzy388tudrjeymmnm0dib52y5sn6d36lxovtbiio4armvoq8271he8ietj0h96eu1kv9d1t052nfx57hscod9z33dv8ztbyl',
                application: 'u90uvlb3mnldn7zjst3duhdt84h9zrgj565lq3vmir85qrqphz2lniedl9up',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'nsowetumowvobjhy5oc5xsfos6f9nwfkxto84a3p',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'oxqqoehit4clooqaw4vpuim3c9unh13t3aaxz2dkvlhhsc8fpb',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'qvylylt5i0q3d9v0nmeh',
                version: '1evv6sluwi0jvgt6akr2',
                scenario: 'ckjdttbcy661fzgvqcet77u10lyw85q0r5lmwy0m05tzcw417pl5ov0tes33',
                party: 'v4ebed2qym3764fairusikung6kqm4eogi2oe4b6xv79io5l581p3k3zaef9okb8gcys6xfh81j02d39ye1cswb36f1wmz30kjrq4v9ddqq5go4g7skztkmxdgzx10ssro7l5jupd208bsdm8s5padeyodec9teg',
                component: 'nkyx3jn1hb44r03e713v7yrkzpucbqo7xwqujhysf6f1ontowd4k2zpx5iyrg125ejxx6rf62sdyxs89o22jsostf6bikiosb97iu4srirlomo0xy8ceona6yw9kqgprzt3kmjx0yhisfys3kdfa9d0xah5uble8',
                interfaceName: null,
                interfaceNamespace: 'gzqkylgdq852lw0ncjfpvz74cvm000eyuy3flrittmtbg4qo7y3c47w1y1cidwaukhe7z1d6oau9zfufkxx6dtetkxa376x11p4ofuzskh6f8sq1hc8s1jyq8jkucg6ei3ed69p4vo9nfvke0zbudevkft6d8dss',
                iflowName: 'yw8p2q6ln5dopikvt5qpgo226bnifi8mljccdzxi2c03tcx8o90ayywpzige12xaffu5nt1z8akmfdf68xz1evxcwca77ipnohzouv0jytwov9a52s78h7p3ouwzjk9i0ahnf3xwh9dpxgkww11fz8js2u37g610',
                responsibleUserAccount: 'aehqq8q0tgvsg147axi3',
                lastChangeUserAccount: 'pwgrh60hyq2hefnxcmzc',
                lastChangedAt: '2020-07-29 12:10:15',
                folderPath: '0yiovao22u7vnfocrzsbabepw1vd0hqqyda3c6fywcwx72vuv678fzr6xdj4zk3be9gy7acais6gnt018pyc1xqtmbhr4bsmibr22b3xh103zm7ma5p39uaq1i5a8fgt0a6xxssvwgevo9u8tb9tgla9hy9u3l0gm7k0jdbtqtxu7rbqjc3xhzore9vdn74u0w4qhtu4swavz5dyk3zzrsl3oh72gcc2lr97v93eqlpuuxuo769htoueucm14gc',
                description: '7phmftbx9piax1l1wipq1jl2j66tu0xpyx7w7dsftfwu9fauggtkiasyya5mbp0l2rehe8eu48j06cct48dnrx3h2g8mqbvarskla72chc898kg4b56v3v2zewx9tklcanpv362dxtdei00z5vijdt9jf8yq0e51s6i8j6hfri2iw36v9t1qhpf8097si8233l7qdnjwhtgxynbsyvxtkqbl5gnoi6wvfstv2wn3phtkw6klpdy6h5tjo7ptdo8',
                application: 'e43tjpey8w29pquqvjbuv826kecbqanp9tnkt8lpyjyw5oeg6q6hp1l2yqqb',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '7gnhmku7c2witn3hybxa8naav0x50va9voxv7mpt',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'j5uvfnu6yswy9bn6e74toi5j0hzlx3bhchlsvv2wyoryou2avj',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'up22x9mhcec4lcr2wqtx',
                version: 'xmb0flva6vna4yt2dqgl',
                scenario: 'sodpc0jy6813aspmef93y777lmb6t0ydbr89bxy51vyvshm4mbjhuv35k4di',
                party: 'buofn4an0w7gh85lvhuqovefi6ei28ng2tjufbk9b3c9welpgql0o9hggjxawvgc21zz8ti6hq8yffe8jqwtmcyw7aieemmr6t03m7l06zpqz4hhb9hky9ku9tnguy3l289s3ihjk7ata5wo3mzklbk606xu3tnh',
                component: 'v5i1qz5enhsdrh1voszesy17d2oqgog8pbo291r7rf2w1x1w1eewn07vg64m941rkgcljgn4gztd9xs1ixyizuwlugyfvlwbttkfomh191ob1s4xi176ba782r5235uhbaiqbzvgyrqfuhwj92n36ybahnc463ut',
                
                interfaceNamespace: 'cn6cjq60pwc2d0htut9lfoukzbsse72ns6x9p7cl611ugnwnrk4y5qbafogr2vjupfejaqgk9fm1ywmul8ckk07ag02yobxd04xngq0jdktdjo4blz12b11rz3tgdziydhqs9zyhs552idmmfytelon4miopf2gg',
                iflowName: 'nj5b7eb1hlpggksueo8p4ncvb8amehoo37cavvh250gzzkpw4nhiy4umbu0zc8xzf5gx0mx3wgyea1bxx2k5at2efdv2swa4vm0j1y1zcjqxao0tzj7agemu7woman2ptq5ob15nu51872orq0n0xu2y1evxt98w',
                responsibleUserAccount: '53b3dz86wb8u5vnvz06g',
                lastChangeUserAccount: 'h3g049puy6gsdr7uhpyu',
                lastChangedAt: '2020-07-28 16:59:58',
                folderPath: '2zduen17hgtkdlplg0wcsabwbbegs0z8mytby48hyyv83st95pv087zvvb844pjep2f96jqw7hrj3jwn7949atrz9htnjkpgux1s6w7ashot4pkt9nmfh5ozymahzzlxgk9218anjcu16mwh8djvv9tci5i6wk72u7wahvqgwidw5ntbvqrn8iun6193bprap5fqtsn15q4o22ljqnqxk6kbl2y1wb9pcjogqssvfiocxpyqdu321fr7d41qyx6',
                description: 'oqfzf58gbb254bm9ws7fmkjq8dm6vejfq7pf94etedx8kznpcvuoeunr6ojhidoc1vajsca74y6aj4wmvmczo0fxnxwcrowehgprl32agktbcerfvggdwdft5jiavgmm6gdl8bqnknbslk5hgr6jveq9pni28wzstimhd86e581cymzo59dkobh4fmptincskqhzizq7o3slmknp13kcp0erasbgb554mwnl715dgwx5cs8yhu0v0xwkqx63dp2',
                application: 'hp93ij7pfw8dsshdvp1nboc8ma4uqftp1xrbs0lb069w3xz7bzsp2rd13btb',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '2kjhe12x3r1kazl77aewxuw94jmv6zhzrjswscew',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'k8tjmcnn09lbik4cvbyefr08r2qbfsdc6zs3ohym2l3jlbcd3u',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'vh62v2r8l0gu3i1vuesa',
                version: '4mzb0kq5up0y7dieginp',
                scenario: 'q856nf67jwo6wrv9xfw34pd4xb8s1j0qlxg259yitckv7ov9mo1ab7oez7lo',
                party: '8kp5m00xd8lukfjgu2w8dlzgt0bg9mvvavcwkdktbgmyne6c2jzbp1u9j1pwm7ex4zx48buzsh5ytqf073ee7q9u2u8mw0q2lac2zro5t1gu0a5km3zj8qwljs6gnvrfzmkbn516wtqw6wp92uqqbad0p6m3te5g',
                component: '1frd7wu8jui5h24tgfulugstx02pyw4qucvmg8w5sfwcoctn0hzxaryvxyeyglu67i02z0lbteqh6tu1lpayhx01sj9ovp4g0viniomn8sx81vc2xml848zzhd8gdpychjwc3w4o75hh46cybd0995zkotdm36uf',
                interfaceName: 'l6v4e30xighbie9eekemh0ozc8ud65np67zdr4cjq0epgxeh8mlfgmhg5m1hs3v8vhc1au52f87ujz3b3u594o854dro584z3kul5owyodw2by0zridrppxgq7j9yns4xrfn2gw7lmfx2hs0opsv7zqiqfbuh84d',
                interfaceNamespace: null,
                iflowName: '1bi3tbs3gxc53mutxps7j1ta04vra46gi5cku5yvuwytzsau7kda64m6kspr5nbaxrv4yoft5i5e4nje05sqy3sdij0v0y0h31k8pnruz2pk7rcxv8jql230zvn2318517j5gy6613ld5edsszceyksdgokqqp3y',
                responsibleUserAccount: 'uue8or17pm3sxzf7a02k',
                lastChangeUserAccount: '9kx7k9m805iittm5kl4w',
                lastChangedAt: '2020-07-28 18:53:24',
                folderPath: 'u0roe1fbzjf36uzxnb30qn09wkt2pfnt3tpk7yvc676vfe2ox7ior74ceeou7sqmnulr25q5x4vxp4fi1chyt9ap17z1p1ix27uydrfsce643gk3d8zre0zxn93xm9qrn6lq2dbxt9lg58oxcbt6mqrr9h67bzfs4oetjyh271oyorv6mkt2iwi3fppw19fry81otsv8s4ihfo2e1npph4koc9tv6ow2k5e4dsa4a1sbz465oin2tk8bpvuegcn',
                description: 'cullu7p0qm8m3o7o8wfbi6i0eyw4k2ntb9p6o1v9x0e5hgeh5a0afbkzalb2tvprpldjm2uvgpzif8ta1wjjb4vvs0lvl7bed820fuxajyp8eqdpq6yxd4whm1p3c0rpwsg7o873qgky61qkw55b496f5dw2j5l5y804obmkw4cyq4ccpuif4py2b8x680dptb8igclzvsdl5bbvll7t3b329xwo6om1hk7e1fn8x9hep12gwll4j110iu02z10',
                application: 'sm6dimdaqgkqm4qdc85gu65kpwtwh2m72488hdopqodxngo2pvx0jvzpyel1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '6k9iy4zq8nca56y4i3vdwa7uaonj9rn2aoy0pc32',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '2vp1zbcusvhtchlpa3ukzifnrrg56oqhvtybdg3vfix64fxh4x',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: '99h3paq332dsar1fifn7',
                version: '6htr8l61rf2jihlu808y',
                scenario: 'vgcpfs8da899cavs4czefh8e43zl0m0ghbq7vgbihb5n012kf7mdcenqk6xt',
                party: '24o5p0r04utf1tz4v1kxujxxysyk15guz2x6qfrcqwrhz004hoq84aholkfiiguz05vqfkwazsid2jw2rpz0i9iffe4jtyjl3mq5vi84h6hxshokc2r5t4blwsa3a9b480ubvne9z3mra8by56uxb2rz648pgbg8',
                component: '9s2a16fan6qj9280o5l7wds5ihwh0mv98ynkuz54bmyvbkvklu5gwcrz09wj1hv0r44cjd5pmyy011m8jel2st41efztwumegexerlwu1rmzlwnnjhcuzjuiu33dzwantjp5oqtwah85hv3c2ul995b2j7h67b6q',
                interfaceName: 'lokky8i891da1x32ggcvvr328e8brct3b0hnuwdxycya1v15xmrvbyy34xkaq7cchpv0219a7ql0fjsmctr1ggmbd3zitqcmj94z8okm9yjn19dzdxsnk5n0pga6tuetmialv1ffmcbfrc7we976da62w5zc8bh8',
                
                iflowName: 'g3w4v1w2zuktpiozuzc41fn4t5ssyjwaku6ktj8k9fqiee3undw2r8g87opr2xtfeipn7z1cggrryjh8rdauonblz6dtklccz5bi6s5143mbzda605fenaxe6p5j5rrop13tytiuu9cmkqhi095si0a7wab1usvg',
                responsibleUserAccount: '2m9q1r3b50eb4qwig28j',
                lastChangeUserAccount: 'eloka9tdo6krxmff1bj7',
                lastChangedAt: '2020-07-29 10:34:35',
                folderPath: 'xpsc7w8s1sxfy3pgcvx5mf1jazfgyuze3rsymh5spgxfb3xy7n0a638z4yryphbiwr1nav320jz8088xlu3zbtfcnj67e6hva88biywv6264pj56ek02dlv4gzl4iax4jgexqhmcmdhfjlf7womef2z95k57etgs354m3tcqj4ye4awmbjnggwcemqa12g632grc1ajgc0jrkosmtz2x1bo3no4lhahs9th0mqy3k3gov4r5it9z3vz5grbdlgm',
                description: 'ulj8wrdpnqvqkedncxpp9i4jzja6e775acykluiy7bq33h0b0vfowtmyndkps3i6w5ws3b1qk0x05ozerz7jp2356jtszmatadw1zci1abzdknkpv4papktiwcpp57djgwhgqgc5ksh23dper591oppaqsazac1fjxyimdsjgdytfz75x6plcdpaobd9zzi997uwxw2dl6hc6f511gr2n4ar7sguf03n0ssbpgscspe5sbf1vehu41vnme500lw',
                application: '6xzr98nsy4opgnnbn2ucw19tzv79i22r4pkz332ko7z7tjnpxglx88uxv0nj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '82fazfq11desbdo1g33mgb5kdtid1i0ku8fo4zn4',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 's8jcpyoa1wfcwcx2ad5gewm3ro81sd6jsh8mijh0un92gtmdkr',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: '3qr4j9tn6jfvfcd3drkz',
                version: 'jyyoj1zumkq50zv99vi5',
                scenario: 'egai97zdrmc3wmfmwfgax3lsyaq0xa8oqazswryolzoill2marovszq2r88t',
                party: 'u4mhi8n4fo1lgpgftbxwxwaugrrdo1enc8sf2if49y83gptc62jrpwccxo7bcsm4q1klrlv63rm1flq43r41g2942mej2gy34gbxhuapxv4wm4k68h7di2c5mxywhdb6y4u3graya8ui8rcr73adunjjmufy3rgo',
                component: 'p0t3hkys33x4i3b3o4qus1kv9eaaktwvvg83g0nczm68ngtu1rurcw0rc8silu11oxk4fo7qriyixqpu62z3u1xan0f8obfyb9ppc1rnehpz952v45iiunev5rgn3tl5sl8v3elrm7m1vps49tfrkl52dpoqirnz',
                interfaceName: 'z98jww5qvoktpu3l92ynqstqt3ifg49vh0ofl1px1n37i2voxxzh1ykynbnkv4kj3g6ibm3c0p4400det929my6rsad4kgzdys0hvcbfatrcbs0wpofav8g1u47pabt6bzxy7z3dbh1dzratlh0mh560t13ublhd',
                interfaceNamespace: '2lui1yyljts0mb7i26ag0gr8meli3bsbkdyiaukrxtnhcyidptqdq4ns465ubza9u3kau5pab7r1q329vf4g2cyh660r6c9bmfot34hdi7lz3im78a8dk1rtj1bkvt4ilsa9yhtm3a5y5thh1wk5g04xuosg5ry0',
                iflowName: 'ccvtvjmoo1fqq49lekliqwi56b3e3v2nagqa4etqspzh6il8hk7zyw43wc42nctng9c9i3nu4tfloeyqryfiogpk4zmq2u45uka5hdf8tgowcbrsvysgd586c5ia3whaufuiiku06zzx2jux7eva779q8fazbr3m',
                responsibleUserAccount: '87160ijcml2108shuf4y',
                lastChangeUserAccount: 'ig5pou6bnnzbuecuey9n',
                lastChangedAt: '2020-07-28 19:09:09',
                folderPath: 'pjnlkjthifrtn9dzbhzyr5rxgs35wl74zb1y1n1wekpc86gzzfg3qs1wq1y1p3xoveey1nw3lgov399b5yi5akunoji9zk90bu9ck8rp988765wf89tjckuo6u9dk87ynx9bb3ppxujtd2v9bemm0pp2biit67x3qr9pr2z759f4dbs9reeq8q0ydoddt9jvuvfc22lyv0m69m7gi9wlgf7xyhn9uqic9ft9ex5m0qw3fop7adpqhjnmp9n4vuy',
                description: '7hp532qs9b4rznry0l4iuyxsh0kl5vw345qhhl0c2zn051v1uu7csstczsfxw31wjgnvgjn2connw5w367qpmmjkpdpun3eofiemcs9gqo4nhbt8ubsfs7cnh73f767ogwqd98ievh0qvml8fbsnlxhr7sjyth3apdnlg0e5ouq9b5f5jmbz91rmuqtzbf8a9t6t3d6h1hhrx47pz1dgx2hxzztj7om51zu0g9uh1ytxxdzsg33vusggxnw5429',
                application: '79it3p0qv0i7rhkupnhho50sk15twamvilryi3mkzmlrco4qib603zduyje2',
                isCritical: null,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'n28ssdihopbzrme4kcm4fv2245nz2gxrc8jdjleb',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'spcicmsdye5ajy00d0brsrknv9fpc0so34jb1a0grfz5l78uj6',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: '4429e6vbpqezvs6ogdw3',
                version: 'g3lwuhxh48b2euswo51q',
                scenario: 'tm5590zyouw05yar04zahlp2hnsx4uvwh4czoixc1fg5i4zxg6l6ve3xs49w',
                party: '15jxfez25o93zn1h50uev7zxov51mlw1bsl0s21zppak89fpby27le8v1ltn88hlr2ern4se8jnivrh9w32w9jottslksvusjvwxm6t9j87f7l5s397ayn1apnkx6ilyc5cmal5rh7nmg0y3u3bjwjzu0f56oxrn',
                component: 'wpxwevvz9183t0ufrtlyb1v5w5f7blgxn9e4w7brgi0433bjebu06izky4a5cixu1a50df63docw8eksg2ouww18oe417rtl8rjv20pb1mzanh4bcrdihydwyi6q2n037jfbl3lj4p3ag3pac32xb7423rfg97zt',
                interfaceName: 'wx7wy6kjr082kyj2i5gzdjfxnf6m4nms68k4osyz0tjjsiisq680972ts9n7gtgji64lwon4v86za9l2q0prs3m7vt6vu1f0uay9hs4e00okmju36x7bvbzbvjjheo32xcabede6udrj5fce2879kqccnlc34dnk',
                interfaceNamespace: 'd08nnjouuqz2e7nmg6xzopdzdh1fimw4m9r399vdcv3q4urm2iso7b8tmi2gxm2iipqpg9zy1tbklr3tj6j32jjat4nwndnxauo1tsa4ovqdwd9afmxia81dkzpjdnucwoatff5n8tcvbdqhk89wym22e7jswved',
                iflowName: 'n93ct2k7wu2frwwg48apaohwo0ki6dsent21qtmfj7uqn586t46qy4l6bzsclxp60g4y21kehsfflb18eui1gpex9l70ms0nnueulsgkjnmvwrwz8n560fgr705f60nlrikcyp7ls52ly5ab3jgkwp3z91yenanv',
                responsibleUserAccount: 'uk5ur2i94gq48uip0bm1',
                lastChangeUserAccount: '8ngnv92lh9z5f8moiles',
                lastChangedAt: '2020-07-29 02:14:10',
                folderPath: '91r0al38d2lkez475byjyc3nwfjvexuvsm8zqazdvk56nnximoorhrc5zz5lr1q1ypbkfzflg8yfbsjyitx442ztpwylu32j1ao5o2vrxn6pjxab3drtlafucin3jd5nrbnkdeyqehckahskkleezkpdx463p7thgbxrjt9h8m48tb8t7sa3hp2e5ivsqjit6k73fn63schiq2weds918tl16w6eribidccaodmg4r15cofc1tiytqizsr5a1fh',
                description: '5pdj149sgytqk8xbixuxoux3aayhixfm1uhbi4i58vz1yfmo6p4yitfobpbuigthjdk0l2hcmlt80l0tgvlcw1nhiwxcx8jkgogjbdkxadqle0bsk9fld027g2i71ykp39p4aslmjumx6t45bmhfouxpix511b0lp37i1ue2c63xflxy33e5dvwflthjkarch1mztm4si02c9n73owl3ovlxtn9fz4pbzu7e7oxqoyq5kynqi6pqp5y9daq0mkb',
                application: 's6dkjvcqlfiu1l66eq4ksvfksi1pier1prn3p6b8iam1h5y9goyyz79gnk8n',
                
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'ophbxqnnzddyconv7voadlfq0i1km4mxyfbc0nxo',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '1ii7r7x72bwz5wzsnaf0sxsvx7e6l5zhzma3qsngfgodhq11qj',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'ul9rsqhmzcogx7ztcvft',
                version: 'o4x57mxw1d3rmjovt00y',
                scenario: 'd7277rgt4nm9uey4hv2yc32y7wff27akdxw1xjjx4y2yjlyyii4h92c126b8',
                party: 'lmic517uxf7vipjikfjg6fb0paysip126av77mp34ub3zcdit0e23224l4gihlctwzlethejw5j7lxky9jp9qkntqwbeddu5qq8zsth8w7z3rb4vig05ce25z4m770l8gnbkrubtts6hhdd0mln3dhvy4xe856bf',
                component: 'vlwtc0hmcwdd8k4igh5nfupqqe86osbbbemfpkjxgme25ar75jmw9xyht8wxxkbqjsy4spm1x8fib44mmpeytoiq08iq1wa8o55cyco6qbxgj6ek0dfd03nelaenrse9blgbt9iods4cpm4mjtf3mpztkqvodco3',
                interfaceName: 'qu8kwdauh2ntaao6nwgb5hf4zfhiopjrdyui5jtb9fgslx7e1mm9n01eqeo06ei5h538362nzrg2izrmwl2m6uppfjzr6v7o9wwnk93ud65w9fsbrtekjck36d2wia6zibk6n47dprmlz30uk0dpy0ympyzooe2j',
                interfaceNamespace: 'o5c1et0t6rumeig9i643yn30ujywkmvi5t2apkw4u4lc20va3olao4es1osj66nfq5tl2todpq1ugup1jvfrjd58jxf4cuppo61crp7qvlc2j4twl4kp5412skqzwzwzz13wcvkv7erskzlmwsi2k7dkera3oeib',
                iflowName: 'xssnic97niczqvook9sr2l2uvuxbj9lczh1zgszdzl6e82f1iqps274oep2umhsow5rpmpsxwu5zp7z36dlwyzmwu0vgjg4jsd6qw1ptb6rfssc9scfjwaugddbqm2mx782nus5263pe0zjsejbm2qi53yrok6hv',
                responsibleUserAccount: 'k0zdhzww4uenrjgm9v8k',
                lastChangeUserAccount: 'krpvj7qqzmpt5e3qmuny',
                lastChangedAt: '2020-07-29 13:35:14',
                folderPath: 'r09g1q757tqapc2sc707x8ly24f913pa71hjwgt4qnlrbpp41fvou2ctluauocip9latfwbk63n1781r3h6ximnez5owwzb8sy28hd8p9mivqx1nx6opyvqf7vx2hna25uono1uw56niwwiud24sfrx9xi3kh4a1axef6vqljnqrn9waykgng0k8w18ihc112zdnurl14g8yj6fajdxb2xgupnqbuhj6wd0k83zle0xh1rpvqw6k0s8nbvyzzus',
                description: 'cp16sk2lyqt1bdeno62acnw8gqs5mg3ezh4d67l8scmgqk3nip200onjeepzh6gyhfbm0pqy332gq0983wuf8c8mgoxqrl1jz86b3du68o08hz0rlpygcumkrks2kb1gv6821kseb6axfvnlbvc9ggf6ix6cwr27ze6qd71t1cptl655uz1s6xi8lc5ooquzq08nhd1vt45rmrqk9y2f6114jo1v8awfrxs2i9d09nmkhqa5x6f3gfgbyevt39t',
                application: '6fkxkfzx9aav7p51nkbuorqcwl2gipgqibzwyh1kdwg1ce0c95m7s7jjiovo',
                isCritical: false,
                isComplex: null,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '8x8sj3g0frvtmpzlp5q9opev5fiyfya022l4qb92',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'jmdh870yo4iu9zkfnrry27dvrgd5sdbhbfu4b7vbmsee34rxb3',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'hhkpuouukz8ubi5vjui1',
                version: '8utm9mxno43cgtvntnfm',
                scenario: 'b4pwsyzh09q33f2fa82ye8quwq7iqyvtiz0lnul1gpediffli1ox9xeik11s',
                party: '89num699d4rmn55ozclwfeofs9iy2b37aw4d6qgqridbdyn68pwuyhjv4bze6x0un68w8hih1dexihd8c4y78ytnq10x7mjx0igwjb1p0prbqafqdleh5yizp6x1wf7c3xzm9c5577987iehexkv1h3tk1x3tia0',
                component: 'v7gze27bmzp8uw94gnozczwdqkuyhbqjfvx2pstmj9xco7at6zyaitrdlxoou5hs4fq6l5v488xylh5df02dl6pr2nbod00jmqx31bq0lhsfny75toemwb1ctb9f4u4ikyhzvkw3nw7luy6j1tqjn0zenfqrdkvw',
                interfaceName: '5i738utncbq1hawh3b5xsn15c8e98mzqz4lj0r8pp2h988y5y8ppos2g3sfhtvuupcbp60nhd6ztbo6m7n6o82yb0ew4mto81lqqy4f96fr7i5lab6xfm5j41hp1901baoun4e7a5wpvvcnlch95lncaaito3td9',
                interfaceNamespace: '5xtaqm75ozw4sqyi9ea6mxwj48jqxf151l5uayaa617gbt643xo6004v811xmeuf9e7xzq1fqyjmgsf1r1323cnhankemw20sl5nbf6x83xw9hhmr0h9moza7bxejxomsmsobbpkdsy1t8ykcgoqpxg7ahhgzraz',
                iflowName: 'vvtq4fg2uflj5u7x3xmsb5eknlbun0wc1sa7fv4py2tiomikqnu7asd80i510qglbfzfgfs6hrla13ugfsvugjhyuewa16erh3y4ns6r5e3lwpwg822eoj0tivjggiidyom1c742t99wweax626ikgxj5vb9pd8s',
                responsibleUserAccount: 'cf98selt8obeddoxqbhj',
                lastChangeUserAccount: 'fz7b3t5hme8xjwe24f0w',
                lastChangedAt: '2020-07-28 16:51:47',
                folderPath: 'xzi2obmi7ljaa80scjalinenzk4vnsgs0s4ocesrryqtnhoyacml0o0nt0zuvl8vcyr8a25162jwipjpa2xihmmclb7r9thuzuk94vgi06qzbgm2k6pkam5yx5zxkrec341k69ia43tvw9mc1iau4nigp3cfkk4g6xh2gz7juzlqrwgtd9h2b2angp0de94f1o0o3szcis4ly221ghgmvbfg00uxcbgt6zrseppx33e0soxhkwb0epgoy6mi5as',
                description: 'thjpbjgvrqk14alvpyara9vr7l9vouabsj2wh0ac8vz6sw9f6rwbe5jy30ojv1fr8aqx2xsn8c4rql9run5mzv7zw9yvnrdszi5j186q1s1meyu8dk3krvaquutzzlwzefktce01xp0pwafgqqn6a787k1b1z7oipni02sepfp8pj5q8xqnjgtt4maiakktxhk12tdmkb4wwn88o82yivgimb10sdu4gi00l7iniaosz6qw3jh3x22yviu0i37z',
                application: '2xyzph1etgt5pbqpmtypl9uwu66oj42ottfyp6n9cyq643o0s6ukbd9sxmxz',
                isCritical: true,
                
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: '5f6gptf9ydnjue0gwvb6in1kohmkx9nwoagm5',
                hash: '92xvu4td705hizwiv4kjyk1moznpe6n53mzzsxn5',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'upxsbkc6ypgpxb9oyr916s0ym4878iroqt96hdgklkhj9mui04',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'sew01lo1xl0gtqspyiml',
                version: 'n4xh2esjmqv6ozzpqfzx',
                scenario: 'q6zxgkksztznsc90cc5ph0a9avxbg9dwlzzxq4qptxyc5wamqs7r3l4je7y7',
                party: 'x10f1bdtdb4ndikbq7xh6isl0dzg5hmcdhddezb1twpxk6q7vc2ci1x84j4vblp5j04n4r63jsc6hsuvd1rcjhwgm5oegnw3yr6rn3e0nyh3ilur6ccvh2mwyybnaf820px5b4lop6d372xtikxs42b163ymomyk',
                component: '6cs7o76fwzeuco8a2813r767ek5uj8fw5ejnczgcq2oyvikls1wz33lf2zmv4pucokowp2eo1ww6hkjl98cps8wah4ecs6auuzs6ml6u2tybduee46acffk9ak2491p74oztxxrrezupp7q1hxwedyi7nojhysbs',
                interfaceName: 'vi4tyav86godw0k6t5jzy3kmjocdh12r5lgfftzsxwzuq43tpqjlkl4e5nwo9pdpg3wo2i9kg4tqkiupac02s1t9m8qmv8hj3jm9yt6l5hc7msxnktno7rzoyh21k7cyedeh6v88c02ppph79ialr4z1jjbk9ax9',
                interfaceNamespace: 'ofo81wujd3qppkqh5ge7o9oqo2sth64koktggbbc3tt6jirextgmdob2hlxadpxdt11b8041sa3hb0gytjp0o2h6sdfybzpy5ecq9bf7tuelbuthhsd59alfy4yashz9gdmcnrwhp1chqpadfs0i133vpg2j942c',
                iflowName: 'hiyhzi8xy1duhjukifal0zyoa08bg3ijqvepeqbbheoraxhgjt0ks9ddaslbmfpc71f8sk5afa3ih89p3z0152ylspvsgrsw28tpicfelrr80vcu4sgit7dtjxtm6emz6k65i5madrah09ss1eozpxvobwjv74iy',
                responsibleUserAccount: 'nr4cxo5e77spobg06eth',
                lastChangeUserAccount: 'lc978t0zvdjaeay22hrz',
                lastChangedAt: '2020-07-29 10:32:05',
                folderPath: 'n18bzqazsjgbx4c4cbv0eupf55nfj3md1g553k35469boafx7t69aq8kizrmjc6etlx5dd655ij4pce3hf9r77eb6suoy45hdjdewfrb6jc20s8lu9njwbd90c1os8eaw0ya49h4t0o3aq7vmutxvmlc1wwdgqxkoy1in75kv5ga658nti0qypfusxtrbmmx3kl2qcdyktx85byk613gnrrxvjgphvdvs6t8aikhtnnj3z0ca1gzvz5dc4ke5df',
                description: 'fikf6aco4y4mk8n6xh3njg6emx0l55wh3ncld9vn0jdpq81zgjx0h1fxmbztwfati6eiildfyvhm88chpoebaomlpmsi70ggkydfqvh7tuwd4s0hnmy2r4j1fwjpfklp9cqih1ndlryqfz3rwfh5dpt4llbd3n928rhbcdbkz8w9yqlpa5tg179quprbkz6oz6kxabksugv6132lii15sbs603wzwf82tragqvy8as7py34l0sari0v2pbx4quy',
                application: 'tl6pmkwik0yqcka89mzbylwsqmb216aozc48pdghjn3h4dopfduza7xldqzv',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'b9m06bud543kql2by7w8enbhl8y0se3orj454zekr',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '8sr3fxg6dzc4ejqg04eyzekjtxcqnnx26m7czjl343y6a1jben',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'ubhmd8flko7qo5klwi2o',
                version: 'u66vdruenmutqhtrfbw4',
                scenario: 'hztig49ozrhzls9eq2arm04s7lkwrxdn8n3xdmwzsk8u9o0pxub3snua8hrf',
                party: 'p5eqla5to86gp4vzp0qpknpf0302zusy7mbxmezfwxkjqp8qo68kmap9ua3en58v2jakreh6k9z37jtgk91pnjr8pu1i8dp9ier68w2pvdo21e27ns5qcbk5qk18akr1ri9k9qz53drf2hwk9xva64jx6c4t7p6i',
                component: 'do9dawqaghjqkmypg8gofjce2u5pota0upli6v45tj1qp8c16we066ttpv5v1g6ysrtlgndrfpvpoxut7qp1si81kq5k6pidlfczrvfhw0psh9ncnwg1tze9xo8rh1ll26ny3h220ngfmiiq838lc2ece8zc0xhe',
                interfaceName: 'n72jabqrswnupvqrordxd7oxgz6fosyjlkk3roo8e09ie7fw3sc4jvpjbuwutfz6m6tmjrngo6z4jryde90rnc0wk2piibnnpzv0ggnsin4v702kicssdk1l9ym9bo7p538k59cp5y4l4qlf393kga9qotvjwqhl',
                interfaceNamespace: '9xy7tietf1h8vq7m29ih82jjzvhj04kdsawd64cngra5gtsy8n4ti7psk0tsdtuntr4e3116dt0xxmaytnv6h223etowmq971rpyp853vh9opv3tibm0sg6kfbx2poz0dlfq6i46guke4dsxhjjunwc9vw7t73wn',
                iflowName: 'rxhzpz528wpwj9d32o1vpmvxiqzjl50ukxj98j659zc45vgleykb4kl196hyifs7utjtjci5e0txdp93gojd1vpcbvzdito57diej0xae0ih1infh8878yqnw03kb47cov97w2szo5nz58dx6m177ixrxpu5t70m',
                responsibleUserAccount: '27y8w6dg5s3w6r0rjoqh',
                lastChangeUserAccount: '50vdj92l4nj3rhpvsvju',
                lastChangedAt: '2020-07-29 06:42:04',
                folderPath: 'yusq3s77mb0s3jlg472iy2eigq36jdz7kx36z0vygzjzqhkq4iksrvtzr3pv3rh67zuuf1ywzjm1qz090weawgqr2l7ss77g300f715zkbn5x9w4dqieatpgmszs7fjlylridwbsu53wjyi8whn6zzyt6cehydck94cjbazyla8l4vksgk850xppyu9sjyygg88c9sfn7oypckzywjrf6ziemfe84xohorjuohapr204pbqgfcmc0tf8fx5kr0z',
                description: 'a28o7x47bu06j2jfxhaecejs2ms1x9s1ewq83gfoj5cl3ojrvbccq569doyffpab3c2um1758d7f23dba903c6g0qgfbrvswnrjvd0plk9mnkwzy94p8zthpxpzkgco2fxspnxpgk13mvymor29uba46ay729riid2dd9u8zej52f7jpux44unw0zz45djmibd1swy0wggf5rfnp9nfupraatk8u4oey195ka02xnq09bcehoo7pt7rulwt928t',
                application: '397wie633gy35hk9tr8eww3vnk775hkmisaaiwjv54othrix4kl5pxv1bdhf',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'ej3ie86mfevf4ykofbmiay1e9mxcolh6yyb8ouch',
                tenantId: 'p5gff2s4zaav2j9c8ecja9d4k3eoe9dm3t0a5',
                tenantCode: 'tfrqhbbkt2117ebucgmpzmoa66n1o58h5oqpqnxc4gnuifg63x',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'neubfhfdmjswzok55i8u',
                version: 'i653e66difyycm1w5et1',
                scenario: 'e6ak91yqj3nah15u4le0z6cmsuon3q3dpxnidlzk8lx81b7vs3v4uqwcsn2r',
                party: 'ul2v2j7c210m6wwhb6xx6fimvf1wk65a502abkiu1eclh6krlg966ifhjizx32ue6xed12h55stwmdllmbitshenlne39fslp75c9w1a090zu6l6buabz0w4fvsffmnp2ramdkpoq5x0x8ax3szp8304wyhtylfu',
                component: 'vqusc2ii5rglp21x4m253epxle88uvklehx27znnvgcqtocubq8y7gx7zq8adjvrd5duptepyx9o50inaxhlhzaczj1skbk09ktw3ycrlem7c7o1z6nxt13u7u0u9tmlban41epfklhxcfcfnqvwaj8ty8yfch12',
                interfaceName: 'j5mvpa9p96otapxm4bpempcms4w8k1fi6pep6xjx6v05cyzzex7l9h5xrs1oo48zl3pj1rfhh7ny2b796k61t91svme1tetckg5921f4v6zdw5tnfw6toxuiuww4qxjg75s0poq2uctfcba5c1zd1tsj442sfrka',
                interfaceNamespace: 'x8ha81eyvljvjtsvv0go8u0rnljz8v0ydqospz2rvbmsvggnqvtnzfju4s0nz2ao1e89rfcg3bsj4u3ocu4i28ni80pc4xeiel3kllqac5i7j5kcjk9b9hne4i22squqh53d5mnufta9re70966e9vgoa4xlac83',
                iflowName: 'nsvr4fwjp4nrtruspvvekqytsg9fb60awnt4qmq77vxrkaw6xwcg36sk23tvwmzy16kwesv9yh54qyu53lqjno77977zvggsv5cvobvgkhbvor4xks2bye9o13ybkng5nsghkhpqmb1crl2ly1ja7ml0a9x1t0v2',
                responsibleUserAccount: 'ycsmrj6ytnfibmjnhnvt',
                lastChangeUserAccount: 'gqnssxx2n8m8afa5nkk3',
                lastChangedAt: '2020-07-28 21:18:51',
                folderPath: 'hresi8jrtzg7a334sae8g63oaa04vdmjwccouz4fsfqe44w8kp95z83c7yn4yrwivibvtvouvkqqip8apvys7j0v8wpv4y1aaapa233xbjbjshvgnhz8sn2scvbx2jvf8777no400gcptpqi3oeg99oi150l2xma9k5in2dzp2z1x221jcgor6xb9xy58mb0ccidm68y3b5cicwyna1usi9o2y5914r1uzn9r3ryhdipubi7jj0ani9gqto9qkl',
                description: '0ibeq3xi149qszv3upfezuxuxczf9c6sv7noii27fgmzqqhxa8g7315nretapr46e2ypaamjpfv6tasglbltj4kspsu31jtyjnbj350eh8ba0nad1oggu8gw8pk6mway5owzjb9v2wkxgbzn4obr8txb2m1xzsfvatb0w28sw0zloj5b59pl428cgcep49fveyk9b4whvpzxhp9cyx9bfkhmtkv041ztz8938t1yajjqe8cexzxr1uif3l7bg20',
                application: 'vramjni4fw8x23tvkttesy5wypqrputihrd2nj32gn997phqpdzek7lxkvh8',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '0thxilusyeoo1d7mi5ib5o4w2nwb1h0upp7ifbi0',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'ds7wlxrzeupryc8cw1ybikla2yicxpkm3rd17rnr4p2x031ho8',
                systemId: 'hdv1o8j2z888uwk3o9ol0yzpm32gfeetoyynl',
                systemName: 'zxpwgt5gvzalb8cstwnh',
                version: '6tf7nr8uyapm46bg1xzv',
                scenario: 'px2suyimy818v0ofvh8mjzatbd7326ysgq569ccehoublft2dpqo7zcz2kzl',
                party: 'xifxquilxwjurnfxuya4wd876ilvhzaoiy80h0hkwvmjfxhyphu15hw3tf17cii67cxi2obsu6dczhqt3r57qtsjz8bo0t0a323oosace61fu1yy1d54u0rl2gzco620ea7hf9e888221m2kmd3ex08j7uxq8y0k',
                component: 'b8upletz978huf50lpqb1u6i7lsij0wukf8ldef903hobshk67eilf4itu1pah7obfzo41z8q29v81smu9b03zcdrnk75y77uxnb3kyh21hodtixqi9lljora33xij9ljdfs9pgc1u6ohcgo0hum3kgh0mox8bc2',
                interfaceName: '0m6w9b2izq9ocjuatht8d9lubt27l47uaoa3humbnv8sddodnoiey8j7wk7f58ix4c2dkh7ulv8t3spefvddsn4dn6agjwm6kq5hm6bkncaway1425ex19i42so02gw3l56oe81s9tmgbipa32r27tez5jsoiktr',
                interfaceNamespace: '23cn5wcr9lox2bm66pr73hfiads93dd6orig9vbwtru49n615zn5znmh1rv0m4xyiha56a1gsswquo7w4cdelfl55w8u6w4iowr6yc3tmq5g6poyb1jm3t8y2arlcbx0vkg3bev7idusk0ml8d4t26a6wkeq9ggo',
                iflowName: '4gm4ushe8264rnaurrdt4gab6l2gg43rgkrp7fi9u8mkw3dgm0fe45kiwzf2aj3v9p899b6hjq0peie60ymnlil27rh7tintr0s82hgoghe5ywdqf7xm6srly6uu4c8spl7si94r4twovw8ykeweziy4kf103clm',
                responsibleUserAccount: 'uzm3aevzghythz491cll',
                lastChangeUserAccount: 'qc5zbj9dpcrvnp3gtoz4',
                lastChangedAt: '2020-07-28 23:49:21',
                folderPath: 'tkm9ddb4pv5mwk5mj04p4yrvefactk36ji6ng28ud59i38g1r352930xid9bokxb750csznmh53ue0usqbt6zvhhxicm8ftf5a8ejsnoi4mmw0nz66zk54qeok10td7gzfmi8ajfqqwmy84r95ykp64703iwx7afok6liim02wf3o19dwqcv9vh19y0czfr1uhjg3gve4u01jr8ka620h0rkpami66ay8zh8hnnytnqkn27n9ijl78for15zn0f',
                description: '8i90tkvds0kbrp5m8cxwhlkb5o772vmvv6v9msyjsek2lzgklp80ddmgyjvy9jh36t7uawiivtotwy7t89qigpzk73xrmi4mxwbqpaaxeyphabs90h2clmuj640z8qj8kzvogs8hxinok8k6okps3xzqyhkcln90f8qjb5hl5te7963ba2wa5nstjtn412q5aevg9z4eav36a7cv2cqjl7v6ttdjrrgupnozmjpdn3lybmxp5v43424k62z1l4v',
                application: 'y9kzxkib1h2e8fr5cyfv5mrnstrxk5wabkno7dqf6fc9elcok6wfr3bwf35z',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'ijeb3qjdzzvk34g2fq0xmggmk0juw7nbz0gh11uv',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '0p44gpmhert4fpct4vfsiubjj86mvrf4tl8r3xp7ii0yktlyut',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'ezemze6jqx369z4y5u86',
                version: 'c6qz5jij9m42ez6u94zn',
                scenario: '49no6sxkn2lnmu1pvmbc642w8tddramq0rv51kmf4dwkqqxzqg4hc8liejp5',
                party: 'ojjet30jxexrugdd4hr3pspht40zhdixo5ykrb7rgfo99ljcb6j3e50n14yjvkhgsldzok6fvpshoj7xwoj88qtue7xzgfn41dww9xiijlz6lsk9ihjyla5bqlzjwb7z9bju58r7u5gdsiwzd4d8eh4st40wf5e7',
                component: 'ural7zipmxgqslprmhhef6k15rdqtc37jlwr502c7qvzdtrk12rlry07vt1rjs4t5lxs8pdmpr2qak7syjma3vp9ohv4axmws8g2vmervw3was5auw0ak0k4bknalqy8j1hlg5h9d3e4ywzq0q853dkx4mckrbnf',
                interfaceName: 'fneq2umx11eliz5j1ddtzp9c71msv2durhyvscix2ai0oirs7fuct2n93vkpmwa63jc2plsqqqho300fun1qrtc0esrtkneq21ph3q59ga006k6bc6nbr0yvep12qpu1j6a3vp5zpr68iif524ceygt0rqjwanje',
                interfaceNamespace: 'rk6rwpc70c4gkzz796onhs41x1yn9qdry5s4pva2fcpm96oqbqu1p9c0omck8prnfcghccf9nynlo63o1r0qmx7hlwhd0hqczodr1lg2lm8u9yp8ojp7i4pueaiig9dy15hdnht2b5lckiao6gnkmi3zutin6252',
                iflowName: 'ns09basl8u6y854tqdieyoeqx0nroz3ly83vwslbd7qjptkw2gp4bwthu056l1sbkkpw6wq6kfug9apx95w0lvkcrgsa9ek5w31i9cqo02ozwj0rrv6bedmuy9d60q14oow2b84f6nmir4ap0o6ulnm0wj51r5jz',
                responsibleUserAccount: 'zq67eo43j8e7l1hagb6d',
                lastChangeUserAccount: 'lfak5y3ub4mftxsokz2w',
                lastChangedAt: '2020-07-29 00:47:53',
                folderPath: 'daxrcqts3efa6pwjz3l7xun2u47tixivsxhoktrsxdxp1iwj2dbsrfr2kgzwo3azy1a11qaoy5p25bgmpmlw9d583dg694edmqf95rotgdszyly3d09ygk8q66sdq25ncw149ucummrmiegvfy7ro5fe310j7t0cc8rjf60z1lguknauiwd6gx99zbryhvl20l19rawohj9o6wzynzm1l1egsrf2etaaxtd8ghnkiz64b28d05m7hu5meg7qew6',
                description: 'ymvzq2z41nacn7diup8cbkevvh2nm1x9u0gi9en30w6bnmjvapvurvdv2sgntz5vqp2l8bee9bzr63vbmb9dgslv87ptiw894jecei4dl4k2f17b433cnj5ohb5vyt1k3lpz3twhcgacyb67gk6hbi02pa727h2h7e8v0unj6rd5vr5wq03ic3uo9k12my0ocrzj8mvdqw1h46etx5rv1tq9o989ko7jrou1azueh5wtt8g9uhrqshu6vnhoo8a',
                application: 'w58qatb7w3me9teap89dkcltojbln9uzbmsx65ulmiuv0jnrtywfzcq81pee',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6wx53amrs2zv8vtmtsf70sqedga08p7i36kld',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'ven0n3p39g3d5ul2b1m8wnjtop7ucyrxj2hbm75l',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '0i2god3bbhigqs11vwuiusgrw24pdy4jrv1eh1bwx20mytr52cv',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: '24dbx5w21c3og689grxd',
                version: 'gsq35w6j53ruyzgccp8o',
                scenario: 'kgx3vyr07eedu25unhex625sebxk7o2bc5o7eya04tup0h2jqlfke07097i4',
                party: '8avhe2mny2ld0m4ovduzv1f4c400pk3bqnhkpz3mm2ct972svtgisiof4ylb3d32ex40xt303pbz8uawjodqi545z3lyav27jdnwzl8auzf54kf5hq0d4w0or0nxttbhhb5n1y3s61z7p0remhz201vunc5lyzo1',
                component: 'dc6mtao3j2vvmwgnylx3xfv0rluc4xukgqfxb4t4vtgf48xfg9p23zgf85mpsbi65vziz7re6930f1xnhe9vefr2a4cv42y9kahalq6jm3m01qkyu6bws8d6g19de9fpdo2pqpfwwkttftvt24fj9y29ds9aj005',
                interfaceName: 'wrp5uva21rfel8veozilnaucuyr651x82lcb8ux5fo1gmxxzdgkny80yx14odjzd0tu1memmrfbg4cga0jghjo85yeu60hnw547983pd76hwveymaqena72tm3rk8f7hlfqy9fuapxnnmi4uv9vserlq83d1tq9s',
                interfaceNamespace: 'ovbg51hdtbzjb1wdh1075ki3ub4tr3mpq8poqg3ein3y16p8jht0b0uhzxu2egh81ugyzzxeh6xrm71pd51goburmp7yns4hu41czmtj26emswbszkccbcm4aki5ez6rrhat9o2j500xeyw0ra4agrmyp1kqtb49',
                iflowName: 'lk87qtlcakgotiv7lto9cl65gojc5n03pndi5ur1um89q8pggleu4wgy4zxcvlmo3oupbyff78jow7egc5g1mlban51p4iyzwktelsobnhzz8us9hssteoswvoe21ibfbgzj1o74wzfuenuiau7eyw3ltxolo8vw',
                responsibleUserAccount: '6r1x2i9c8u60rlzpdjzd',
                lastChangeUserAccount: 'm3oxb5cr3ias3zqkxwiq',
                lastChangedAt: '2020-07-29 14:35:26',
                folderPath: 'p5bfpjmnd9wt6hp16t3qf0u6vmbcuz0vx6ayrscc7t9pfqrw3ao3gyojecw1cb05499ihvsvum6yb5q97byyau5otxz2aae9o56cr7amoubfmxmb3h7od5t5c3aj66x0ert51xfgz8dyktmwqy9ud9ya9zo7g233b6zu18donf0b10otmwxaojdizvacsp70cwz461926kg9eyyj48cx8h44c1n1dxhsj8cbtq4uib7vn6qrb2uuwc1bqblzlp0',
                description: 'edmeu9cqh0nxdh8zrcw4jdebm0vaubnh9jb2fvzctk5ffm7pk9h2buvx01im7q7ftfsscm43i7m1lbmi5f0ybuw9p6qekrhg5wvqa2ktosksxrgzp9dbbw7xyikoh1ubf6tdw4fv9bk849z3c7rdig32l50rw0l18vxwasxxe0fzbywtbnceo0rih990j63fdr4tud224uuidpplkwsjoyesjuffikzz2coi3g9oawifiw31mx5xykok471xzqf',
                application: 'sv8kifa6hibtkfv105m2rq1u0vyw2wow5paglyd4cut3dqpdjo8yrmvrl24x',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'jw24djsjfgwvx6zkutspvdvgmx25maigf487kwfa',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'k4rpd7tuejw5bq2jc2ku2o8ql94n23c0ifbxrojd9itwj7qpo1',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'ic7f2r0x1co7rpx7asdxb',
                version: '66aeu38c7qpkq0a7ouu7',
                scenario: 'm7xusq356zhf2113fqosxv9ujiu5x30ks0ru3k5wdq1chneb9j6fsxsjo24y',
                party: 'auur6kzy35iywufhe0k7beua7pvy6fdfhp5mq6p36f46203nshk4mmueqknysz3ln87h8umqphpdez43urs5u4ijqkac9vdk0n50i8tnjlagjvkrs86myvy9btndfmj6wqj31l02ewtc3a421dgpaoerbyplk9y9',
                component: 'qpi11o6b1bjh2stavuigvwfwl4shss4nt2t17sq0ok0v0a7h9aeepiajlzxi50efbzxxmuwqkb6iycmg9l8c71tj4mcsexpizkl91vzp3l72l3k3i2cfgr4z2nhjvpxds87gpb0z3sg7s1b0wteakld3fiwfcwib',
                interfaceName: 'q7jg25liffmen97j4p0rt1qtcav933lx8t8m0emklq6ytl9jd0r5du632ryhuo86virf6k3moov960r8vstkf49utyu15senzrnyfccuo7ggwg1v3cofvor2fkrluluhzccoo87301h1m8uorsn5sjw7v5vpqp56',
                interfaceNamespace: 'mc66k7c4o31ksrohaudjwc4s151qlpqwr9k7cc0l77r7pjfzwyufa3jigmcnyyk515nedodme6kzjvhy7uoc5m645sftppkp32mdqt14xfeul7pwgp4hbbb68jmtktyddfn6kfryedlw5lg9r5hi6jwlabe9ru53',
                iflowName: '83vuhpnkt44rv0u2u4qeyirjh3bkynj3hl9wtrxi72uz30m38ybnjw6unkpxpcmvy5jq83qj887vddr5pst7m7nbn4svudrwj86icpz0qvnm9ecf1ost7tx3xq96dfvn4ejbam1v2og82eo8ynt6u0yhvreh92f6',
                responsibleUserAccount: 'q8yp63s942gzt404kzla',
                lastChangeUserAccount: '0xccvu0bbhelyvie45n2',
                lastChangedAt: '2020-07-29 16:11:23',
                folderPath: '7ujwulfx0cau74wwq9f7onnqo0gkwsadh19bapizmxsv9infrpwh131r8irbja80a0rnntfux6flfzkq07k0hqw8m39k42jkr3tudl6d0inowxenkp5my3av85tli8hjuhu04nvqu4q1dgxvzw491xr2hkax334ygmtvzp2lu6zi0yo4ri56xcp6tfef7afgd7k3degsgrtg42bqgwttuq941rpv70s3u3h6jh5qhjygpanp80zfkpdo6f47uk2',
                description: '33l06kcw5aoxqa13tj79cjkirqxxfuokm0ljf1wp7kfjo1ndmm0j03v5mck47wmu21apnydnrfmaj3k9aq0cpmz7bq1vgn4smew5s6k7xyd6dm5sp9dcpejv752cbr3ql2oavzmaxu3h261m6zlhyff2xx716qlemi4lxexyt2on6hk7es13hgludqqdcajmjdgseajp4z4ievd3atchetx4pto9vt4zdjl9dg8u3m48lqnlpl97mqgkg53e30c',
                application: 'i1h9ywxni5cg6nkhd35kaf98egrs9eisva8iu1v3j6s4gmxs9mr5daguke3i',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 's8rbf0oa834lm2mburytibe0l9xnk091hx2oolw3',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'n8i2d1r0w7kq5mmzubdwataic4ooggfq4y7p4y3lgsq4jzlvuw',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'wviulwi9kl3xmttuycgd',
                version: 'sojrjo40hl37abf641uke',
                scenario: 't6vw9jewidl4eqpb1xo90vwp2rkgihtvqjdkrvksbz15ku9edwk2ui6cit85',
                party: 'z44oznx5uwypt7lodk2j2zgs5r6ea5j6pgzl7x3xxtk5xi1vrdd8ufxbqbb5wmj5s8o68kg9l712t0i2cayko2cwylw5exrjha8wnz1l7ykoyn3sykt2igixgmpk3lp9bccayhtr5jieugzp1a7lqsk9l45mdev3',
                component: 'jw1iwxkvqs7969h7434hsmqxjkqvvrojnhytkbhinaqfh9xemli9rdnlmed89f4azr156tft2qfbjv2g10he8gz1yqwg8ffu8hg710iiz95orsh8i5kenp31ck3xi6chddu8b81qz3ojw7bu6xqjmlb2zmt1wzqc',
                interfaceName: '6qm584l8ntdrgyebo0uqjqydi4wgv18h1v2kjxsrurwtkybklv9l4628zaww92629vnh2dixgp0s1ef2unsclj1j7ui15ws1ywz2i9zquxxq8tdqh8nxn0wnqgwdiq5sax7pqd9wrg7327yoxtvm64ysnusk0suz',
                interfaceNamespace: 'uco4691ysdbe0eq9n2x3n1yyukzvbfrrr1p23myi9xxtdzajudau598sh1fwqe7ij4kk4arnymoaaz39s307mpv9dfydwh0998vduu31u5gb3m7ql7slniloj6ehdlnppxrzh4dbz4tcmzk1j1rhflr898ffpl0w',
                iflowName: 'jq3r8zksy44isckpgh60csuj3cfsvjit0ez2a5nzmjfnmvkes6cs5g68rkkm4qczbnjr3k9ksul1lphind4kx5tvr1u77whati4v4kvmix0vu1zioqiekh240key81jpro71he64691320w9ktama4lvxomo09qn',
                responsibleUserAccount: '4qoe8gu3e1hklsx7w5yy',
                lastChangeUserAccount: 'nydrcdmzi42ptwh8loug',
                lastChangedAt: '2020-07-29 16:28:48',
                folderPath: 'alcgsyx0da3ahp2n5waedugkbfs8m1z74l73eci0jzntmne3g28zbvcvzg3jcz8xn7tpnnieivdt2wicui0xr79r6wtn6t3bue98iua1r88cgt5hkhgyuwjh3mkbff0u2b3bzr3v8pk1cod1drx56cu22iypu48hucllq132iz520ycxo88opncijqx14ptzky8tyztgh1n2xrv4mowg4uzcpitt2pste233ycggnfmzt4nu4bt9j24bcia9y8t',
                description: '5svmena140dzy7qu4s2ablip9jgblypfew1qlt52r2erokyo7ddlsuegg0lgk43v50eqf60j937yhirpe53zzym35o1l7v11yg1ouxdtt7jrgp3zr4jvkbnvm2duqr5mbdt4rqx9yy6cnc33vxepv48v50uilzwwrqbbqsqva13hecyku8faxs6e147oknf6l62ni3es6gwt7izvjk00ob0lxvjhntqwde9poaey2fu1fj7qog37w0bcm3ulupk',
                application: 'ytahhhftv5n1jbmwjqo6l6qtbv5fky19zf33xettxo83wh01c5sh96i545ch',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'amm530jgwv2tm8bmcvxel0svhj9cqbrvm5908b0n',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'w19ap5lgt80rekj4syy4rk8frfpbetfvbd9jbhttknhsqc0jc4',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'krjg54ufcvzja5a9ycu6',
                version: 'yrzxrqsj4p0y8ip9p1vc',
                scenario: 'dbpffg7k6wxipsdyhvwovk113l4n1vmul1iidgba6xywh45xpnctodp3yna20',
                party: 'e4yi912fc7utxyc09869fp8fgiulzf6a2h3a35fqf4d4rx2ff17d8aa3uxdpobnnzez2gwsfnu25zf4qfxpz6ehr7ipxhd2ivzmeyld34aoax9eintufp7fxp6hirv795baqbdx89o6nbiaeu1oqdrbbesg35dl0',
                component: 'kbg7j9vtr0q9i0kkzd8xs4kmxymg1slf0phg8o1f2lopvehiroi0xoywrjcxq7gqiueepxrbzs2h7se8yyuwrr1mjulxkigr0veb564x9i624knpv4ys8b1vf0m1ux9xvjtj7dlfmisjqiijlwv1g6zkgkb84lce',
                interfaceName: 'slwr6tlwau943s91yskqkmrfstq7axnazb06v4s7r2pgky5stm79ew86odaqxnvntph8kx4j02a17jcyo57ut9ncf672mvdsawtdifqgeg2z6perdp1ihwqcmv4sg7jpmx6m47b9z8t6iakmujthnwl44cn6k2r8',
                interfaceNamespace: 'gwuw0wyi43mjk74p5s8xi9noaxg0l7e4kkysu7ivi4i1af5124n3vggy957ktoeo7ij1iwhw30nuqruypejaqfq486c9kkg9sj4byom1vesi4npyovg8plihnc5dmxm8qepycneaqhw16wxihr2zhmwc3jy1rbr8',
                iflowName: 'rxl5ob2t0ffi7innc860mpaa3dfvgdn5hqov4xfb1qxdxqeucaqsfo7amdl1pn7pktr92dr2l7mjgqn1dpvpiqhol8u0t3c5yuk85uxrb6sg226fvsy7wxoq7ix005x2v1vw4tgxjayrczjuke2cda87zoig8w0v',
                responsibleUserAccount: 'b8hq1d0xdov1yuk7jh3p',
                lastChangeUserAccount: 'q85rhx3rzs4tkw6mmy2s',
                lastChangedAt: '2020-07-29 09:39:54',
                folderPath: 'zrwtnflufz6n7srk213hnsakeqoztlmyineyvgzevcvca3eyh3hv72573w8878cy9a8q0ks3imqymmrr36g5fyb4blfqqbgzgb0cfz8diy933dutpf0sk8xrpc8mg5c9zzhmro4ec2782hthrscwhhy1cxw3j5my8vfch8f33nlc5p85my19qvszfknf2ubst7s20iyhsg6wckjges7fimygwj04h9g46w1aud762gx8xwyoi5our4fykvrzehs',
                description: 'v1b14o83lcaqzb9e3fbchvnc1y2v3y2e9a0c7ritpiqzuy3y4fro94cj68fa3dbo0c4ntwghogn3ato69cw2oqwyrc7dxnfh9peor23q9408gtroboa6mns7eebye4rpc7qmzeb7vbkqf3b3zzasffvhim7fn9fglmd5whjd33dxjb8p5ddjakuh9hlvl6wfsnmllnhdur3x7zbr4ual78juk9oq3unuepxixj452unc6bft4l60fs8qbsdubfy',
                application: 'n0cexa1qy704v5ecq8xrkx1cg2rzpz42c3kzq9c7y051wdc9e6ymtgd08hyr',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'd6g2ti7tm9ig63zinvs77n9jbdauunfdg64tlkvj',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'rrby14txs0s26ghgvadb8g2jh95o8aofmp2ileof4ihs8rufnw',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'ge1isnfsuoo50lsgcbsu',
                version: 'nq0ufuf5gks6d2q8olwb',
                scenario: '1old278jkfdbx8fsudn4wx2nlr6zebahkr7lk41239z5cv462mjq5bxrsk8m',
                party: '2obmrd63mo1r3cnm8ga0emx02lmoiqqsfx5omhmx76iaito3v0tkm288tm349b5mrileatkvww9z611csqe3tv59k6c2sxm3vw76c31fs4yppzro3uj9rhwsmmmz4bffxjhqfihq8ol3gkelxs9tnaqamggq8vkwd',
                component: 'vkql19y5z5yj8vixbou2sspj5wr70g4rsj6lnlaac3m0tgr3lus2g36am1fsvr1jag1eebnup1hxoui78a0gu8ce006wqqhjok16d8ka9uyv5bf4v4klqhf8mur1d7rbegb4hq19jni3il6beunuynf7dw99tw6i',
                interfaceName: '9rnic35hlr0yj253ynw7svixxf945c0d3hkzk6wvp66yssi2gk7tm1s4aj8ufnw4uxuaaz4zclgyqmn41wwnfvwbaitm72ybhscu3qbjcglj5xtemj69yugkxxagrl2rpz0ymihsmqu7xcql8pmiu3zcg8407oe5',
                interfaceNamespace: 'w543qdp748hjfwc71e1t9a9cel7trcdd57z8wf84p3ho2sswsihrc1wmu5zyh2mkz1hweffo04adas8kk1ftt7249iw2xya6lxed7ywknwhmhtjsnxjuul6hnolowwvd6j2n4zwcglcmtlecdzhso2pkv6c0umgx',
                iflowName: 'qcuusehjs4amkhuv4khc4d898ami64dry943iuglnejxzro2so02olvo0gc372vmb87fpc0wxotsi9m817u8w3n7edltor3xffmn8buy1jrbwol2p1cy2hb7azp3zgbc3t3yc4aytabdi1zflkbqbj2wjdx4nt4p',
                responsibleUserAccount: '44iynz4q5pclmg1mji0m',
                lastChangeUserAccount: 'oatv00s9lg8xfn6mwzio',
                lastChangedAt: '2020-07-29 06:43:18',
                folderPath: 'xhga13w4vb1oi2w6ppawp9zodvarhnb3xbmd7w0bq6rf6ri63n5p7xtllh74ba2r4u9j2bdrbahh6wrbe0exsuh5jocdfqjpx0uiojqa2appkehx487cfzsoirhdb4v3kr08qbg7vpacvsrd6pdxijoyf8mamhfne4rp4w0gcwloepjqkhx62lwwqk10rec1jyva6w0rhjyyexw7fsloza894u5629yj9wrmjy8ft7tnglnp2ylf7sd7kixazwe',
                description: '5irqq4on3vu0hl4lg3z3pwvwidrgw8pthph3y715qit1idqc4gx7ispgjdwznknqmde3buznni5amxjp1d3zu3wfj0o4lxt2e1rj1qx7x5ryjkgrlj5z2zlkkfjlkpfiq40w4soathqbkdpss2t1jn3fimctexlmx3m0egq4cdp73qq3eg0kd87w00984updt1xxde90qsp1j3lki0sdv6tftj0xjup9nmw2jmjqfxufkiygx8duwu5laevlzs8',
                application: 'mhggbvamhvgwetb9aj46r4sgv51q9plk79orfkvkzr7e7ofmz2zwdchq59pa',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'qps26kuzdr849g8c0bsezvjq1r9lpwelt0l2cacn',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '6ua55hrsy87fgdssleolg6srltv73dyg08p5ib5cpmzmgncb85',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'rs7i9j1x0hjo58to201l',
                version: 'wxx2o6oq2mt8yjvxm32b',
                scenario: 'y37mumr67k87mpwcc0qpyr9185eh4u6splywplwo2fpx5gcipozszuw17lmx',
                party: 'ms85gte3n4ozs4hpa6rfuxrlh3nkfo6hk1kp672aq2jmqvrc6m4c7omzk8syc5xdbhrkg1kiymlcjsvhzpuxdzyeiy32w0rsjbh5k1n30otpbir2k2ak0y8p3cvray9v5pcpe9fzkh6qzdipal71oc7lx2btg9mi',
                component: '4ant36uevv9ayqj592whde00dtu9i0d7ybd4npgv6h5lyk7w7d6hrf44czgf97bbmweqf338juyrcv182ii3j2c9idlnm7o68pgoe3h3l3jibqy4a9okg0dl3wgrkj9m8e5lxxkn8ggxh1toxbb8d64eywamad0mo',
                interfaceName: 'lerwbw9yydhma7il9eqagmgpwbel5fuc6r2skq1q6c7ehnubvewquxalihwudttbqssopsvaqpgouk7j78dkyid0lfurpupvrjg6xdln7tazjeua2jqevnkccjaphtya6xyy21st6ml54x4oq8r1q4b5aqk8e0zn',
                interfaceNamespace: 'vux319kxmi5pnunghfm5weuodikb3ldzssc50ul50i7r7uweymqo34bd23s65hhqxe3ihxayd7w3k22l34g9si4vwyut36zaxiqy22in0e47sckkdroawykyjbitizo1h8hsjdwdh3mf660s6d5hads5y0ao1tjj',
                iflowName: 'xmz7ky527bqlyqm37nlmbae74diewqv0z2w6c10quf8m1py4hnz32dxkoqgpsan9nix3b8yppwfwtnnzparm62lk3pcaxeijz782hj1ecgcpxlmtjb6hpvx45tskwt5wfi5piichwelv4o1z1mp3nejf8md7utwd',
                responsibleUserAccount: '2vsthg4xqx5ddlugjhon',
                lastChangeUserAccount: 'mp3sja52n4qp0pjb9gy7',
                lastChangedAt: '2020-07-29 11:35:43',
                folderPath: '7h79by3racsppz3cw7g0x9z4big409ry2r3qfi4q15nbz7ze485kx7pjsfszbd6l6qleehr737skgmceipnt6hsvvt03bseehpvc1j9vd4vgonpt6mc3vvv2kqg60rrtvy7exa1aqheir6tigahlucgtiyc6lxrj7lgj6o5f07qczhsrdchb93ilkqg8i8jq4qsa9a4k032bpp9y57a00spbvglrybblim8ilnenpvrenf0oq44uw5exi3aek5v',
                description: 'q6tl783s4i7j5zlfidwdcjm2up7il8jisrc1q54lect1jts1f244tn17mtru8l7m44bat14qk52kei1tul0hf0nh0bomcqfz90tw2plksk570fn7qm92qrr1iwdjeqtu8fk3n2otot7osnp606hox2mnba7y4tw5upyspy206v54jbct25b8tfnmcrv4y6ofg79jwcj7fccqfu3j429gx6t38o74zhki30m60ybtt64vg84zysb18d6cd9wmppa',
                application: 'smmlyyf4sq2fs6xyatflu6r6uv7vl310xtbtfro502rom7eztcsb3pb55sur',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'oiyclgfcv55lzcvhfb7zp3bte0ar7n8aajv5glva',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'dujl2o6gkhpw7by5jxdonuj6ri5m8jvdxdtnxshhapfa9m3p7e',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'xzdl6yhglxmn0n4gn44m',
                version: 'm8wk1guzj2vj2kico4rx',
                scenario: 's98frvg8cz2249ijc5h0ir49p70rb1p43p1zpkdvhe9zob5zy4ui1eiy479n',
                party: 'p1xrzwnry8w0gsffyi9lt3mj3fac3e8k47pwo3kc53341emtpmb77qu3e78gox7oc3pfdib3zxeyolnx8rdztzbacdyh5gszmkfztrfmvvhhnfgnz6jtilxgm8ik21o51qf63k0uatyftaw0sxfwixaoesc7isi7',
                component: '5bys5equa83815bbo0iqwltdpeutwcg0a0j15emdecn44g2sllfyw7t0y5lhptcrrau9vzowbdwr71sgumafh3avcyxyvkqlyp6xifl2qwt57lu1uchdg7rba4mzp9dmtctn72j8urcmex2eqv0bvge9x3dc9gkk',
                interfaceName: 'wv5aqj60xwr8xkm7wxtgrwb7bsm0zt02x6kz581rt0uonffnkecthpxce5y3fq6c0vux0alibq86puomxairjhmz19e6ptlrr93ygi9fjhokn2brhcup9o1xvcix5yyuvajhm8kuo7ydguxga4gdmvfg9g22hyp8b',
                interfaceNamespace: 'lybtmxfqrqz15kr1jn5u4hfcw1iyzc0mvazp9j7d39x888balfo8030qewopvavyw6thu3k2wdp59iz7j7r1sgij1cwvk1k2bpnp11maen5gwn4njci2dctcuxekggr29foobvetmnmlozfmotw62awuno4gadsw',
                iflowName: 'qr56yvlcj49tyszq0hv3agy5jcghfb6hsk3bbxi51l41kefn82n72c5tu55vwj3efa04hw5qdkh164j0pr7qzzjevvrnpx996icl0f3o9v1pv95yp9fdn7gk1iuahb090fqnh6pni9mea7fbnr2880zdayzz94qz',
                responsibleUserAccount: 'qtob8mmhf6p4rn74qbi7',
                lastChangeUserAccount: '5sgi1058bdnw8ipdds38',
                lastChangedAt: '2020-07-29 08:31:59',
                folderPath: '0l6m0k2vggnq5992a587iis3ciq7b5mmtdakaianmc7r64a525d2l9exv3e7rd4b30f0dz61sb1tqcwlq6szxf49thl53gx19m0vs0nedf8byz0dnt5czdaelpj8jd8kq119z4ek9eqki0653hmrihj0mae4efsvoo5n36zry6x4krb7u71tj3u2iahauoqtsboh0alo5unbb5rgq9xqzsffg6xy4py73gqx6vaqqh471zg82vh4k34nd3rp9mn',
                description: 'ryxw7bt5284vfivt8cc7w7cet5o2ygm7vbbye3pxgak7a3prdf4r62242izy7ycmjdrar0t69ub4qol92hb4a17h6mznv056fy5q4v6gz13qlwtn5r2zdd0fzo96l3zol8hvsgcwqhlxpi2dxmrhf9mxztlvlcicvlozhsgbwol6teq548nzke74kx73ep7zwnlo7s4yor7amtpjahzcdnvdh3n80cm0vq26hkkvjtg655crjn9ojxwhznalcr0',
                application: 's3o0mgr45vubp7z3c37rt7xedvczz5n9lmxukqszeodlonty813g2pffoydy',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'akisdbxs3jbid9zzpm104c5nsisrwpt0ku2ouqn3',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'gom6n1ltmy1b4lk2v38w8w7bjzzxwtdu2zzyuecgqfxm6ic9ab',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'uekco3kdu59pbfnex0i5',
                version: 'u8fw53bd97i7442paz5x',
                scenario: 'cszncle9ilz09qevzd008yydv8xzzkuii7sfoun9i8xfkkxlpr5jmzzhr3sy',
                party: 'jikax2af6eahm90vwvdrzpl4s9li8p6qghxiidjmc82836buw1wudfhm5hznevt6vo31xnudaq6e0z7pjjqk45i5ngujpfl4ng7ytv1bi6iheysy99yczmkuinqb6sjvuho3f35w07db9oe2tv1cixf05om2u54a',
                component: 'w80uj9ouvj0s73t22kphw31a1tule42qje0qd70z65jj4c9233lq7bpqnzmhl7cmfd8lovqjjaatvsdxnpxrgc4eya2veasadnnmhizodr5j2r0xs5xt78dxeveizys8as8f5sn997upuux9p560na7akeroe102',
                interfaceName: 'jurjbv2s35kfwalysuo2uiu4k6n2um6etywpwj12g4lhsrbefpth6ift7doc83d2mvwmsjobtorqgxvaxk6mvo4npl7xss6xbzoltfsv74wd6ask13gfc68qcihofx45h503a32yybms0wfbrzq7mrudnz756ork',
                interfaceNamespace: 'lwh33t9x71nxbhtedcgjsiyzg5ms2ar24d2mxuful0kvhrdu82xra3zz3le4eyscxo3nk7fii8rx21jum3i3jw1br6dwjofn7c1my1xs26kyl1s7bppd3v3fhbehnnszgnw1s4ijkeegxcbqqqqmsxfsild5molzd',
                iflowName: '6xluwn97aqmrtjpla6dauiy24nsmdd7kh7emc09qi8yk4v7f7vgb4oqy5az7px99jtxuqtead584bn6rieb9031m9azx1h4mo2hjh4543gy476ch2rqjhnfmuv0ccf23vctj8xcvn3prclh6fotnniqf2zzjzfm5',
                responsibleUserAccount: 'v318874uuc2wmdkfzdhk',
                lastChangeUserAccount: '141ahapx0lyu2n4d11vw',
                lastChangedAt: '2020-07-28 20:47:02',
                folderPath: '5izsgq735hiyoa23aqpu6bh2tbvhmmgdpkjagn5j4tcne7w05cheqk3772lblzoimc4z3w6vmrwqq6j9c8zam83bahkjfoib3oxkeb2leva334d7or9zsis438x5px2j0is4sx9kosqe8r0nrgse0rowc5ki95qkg9dghdka0x284johjmryrdsqkn4zjexppol6uvd0o19xum39h11m66ov1qjsdjtuylgehr9hpiprjpq5jy47cortfg7h1bk',
                description: '245sngowl68q9lvnsgtklv9u8n5uu3ergnsoa7coqwt1crtiywaom0tz3gisz2c8stk5fzpgsniww3z5yjhxqyvc9ocl6g69fk9kc1k2ong4xarqu2uspzh0leh4cu7stktj7d2dsf7pt0v1c0k1cw2dyzzhbxrbp0xneeqymtr20ny9i91imi87tph0z6vr6gvudb3l46yc7x1w23coq25zsdyb7gmkv3jdpgo0t1tzhgj1bjxx05om9vp0he4',
                application: 'l8l8teorzg776y8bj0w0vp2h27b08ape41y0w7gz662h732lp1dlqxuf8m5i',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'n2iyd8wyfcwfmm1z2jpd7xjddvx0y0ksbfc64syc',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'kxd6gk25ophonhnrg5b3boiv7b6574z89s1u4ot7t6b1dy6ixr',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'wd280iw0ij7016029yfy',
                version: 'd0oz0u3dj42gpwgr1ru1',
                scenario: 'p0fx3r2qq5319ylw4of62sk4r0i99nm520n13ypkywlv5r0p037fz754oaqb',
                party: 'kas1r0kcpdafwnn0xfe9k211z4g6jsnlh96mh5xw0t2ibb77l2nndslc4qeykyu118intci2egha6tb0lt36f6pvldb01no6o7011wd009yw4bwasytf1p8btni6ml9to65shuos8xcgxe76aoad94z6dy3n0srp',
                component: '4l8gc5neppc2k6qkabgvq7b0wymef8eulhjpwmqtlkn6b8v9lsxha76bdixyyj00ilw4q5nulqa35w3wv36chtskcq179yaj7vz7u7cklp42q33835ut5ic09hi8ohbeabujwbbgrxvoteynet2av8kbgvdpi6qe',
                interfaceName: '37103ie9alhl4ce6670qahagb7agzbjehq2l5jm9kewl8llfnciw8edcyu2tpwz5g64wgd05gby2lyolyuafw8bumjg1jcq8mahov622scd0kyipvd11y1o9rzsbw1xe0ytp9fm53d0eokyf93yxh0vjru5yzj0c',
                interfaceNamespace: 'dxhkbledbsfo679msbs5fkw4k2ukjd2k7o63j1pcz71ldxegerthybqqu2yyg5n44xw81sndgmc5gsxkd91vwykukis129iyffhngq98mladv6k8ls8fx8gcvoobb9ja34tqsmqo2ecxazo23jiugzwkw15ywok7',
                iflowName: '4kf841lk4p3wcns9v568rwtco0xluidn7horjrzjqe9fzpmqyvr1by6g1masbrf68i6qeifukqfzzvqvzn857vu9rm5xjcjg9k7ansuil06aglyn98mzukh4usjfzv125qqefi7re2i8jc0zhlyqfd0d4o3g0k4ec',
                responsibleUserAccount: '6cmk0t9cxoqearracw8s',
                lastChangeUserAccount: 'db2405h13focf7c8iiqe',
                lastChangedAt: '2020-07-28 21:32:46',
                folderPath: 'ek8idx1fp728v4eylyqhbevtzuljumjq3etw1lnhop0g8oawo5983kfrp9ly56mydns05hmlmp6wz3qdcaphp6r2c5zu4o9ahbdso1fnd98py9ucgyuisb2jf9h4hthhaud2vjp7ziidgkj0vuat1lg7dw1smdu684ei1d8t9izwy5mzgl5yvjr1zhteiaqgpa7anf7hcqjha3shszf11kqkk5tte3uq43vb3k30dsr02dapbaheu3m0r7ma0u7',
                description: 'a728dezdwccjdfcui86hi8libjezgjhke0nvt7ekvetxwczo8p7e10oman3kvdw85x6vrxaa0fsvtfnkq5pq8fxzf83pf9xrgtkkqbc1hludnzqhqx48qdx1rps9jc9cw7ztrcbi636yjx88lkw4c5txlijmafl4nmvja9hivz786mlcqzbuyx9i98pgx78ark0s6pc4yqpi1tyvsirhg2cwso34za6tcw2366aehr71fjrpiqvjbct835iir79',
                application: '7gsifzcpycx35jq8iltxciz5bs0a7sqr38tibxbtvo5hmjvlywxb38b2fk9b',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'emvgn29a4xfjpqv92nh5lvqpx8bcw4vc4u89xfu1',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'shz3usadcaif42ddgkbfm1u88mz5vvtlogbwuct9sl29w1b38p',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: '9yc1zygdrjxxk7guasra',
                version: '9cc81pavdy9mbkk6l4i3',
                scenario: 'bgmwogvl42inrhge8h5yw5euv9wstqpy4pigtlf5qt71jdc3y98sa7co3tq5',
                party: 's6lenifrdgj9evieeyyixjwfty79pznqav31kp40de5dewaon15vmm3q00xhol6270hr6pbrip62q4gtrqlmithcm5zsfimxemchd97pvlxbsa8jz64syr8t2zq118j7pkmt9r5ph7h8ttcs06ug6oxevjmdh30a',
                component: 'vnc7apc04czjt5xwsgyacol8rudyvsibehevmt97ac77i59x23l75vv8cmm8ao4lpqa58i4ogfzju9td8bv46zqo8s3j1e2thodn25ppa5j6hmkee8k2sxmou4y5bcv2s1w82qp5ic15a40uudlsc29xsuak3ofi',
                interfaceName: 'x617e9kglg2w4x15h7psi7erzgk5097y39h4fr4mqwylhnit4qrcxemmkw4yaeoulamz8zovrohwc6fagafc9wgfh7xhf04h9smj79sl3rg92bwfbcidmiy3o2bol2oobx00k75mxcnrcobdymc7ihl3puo268it',
                interfaceNamespace: 'b08cgec1u92xhoovfymai6j66h2duqw5rbh9uyemy73m2vedgeqn38glazyk7af9erohnkh4626qd7jnrr0drw0bnm3q58nd4omifem648xyaqs0iyu7fwrfa23xr470a8k7ihs2coo08tlnmohiq17rdmx6vces',
                iflowName: 'geiko2kje5vii9odguw473i6jcpc2p2i03e50hv0borszs5f3zzp9locnx3l1io68rk4jnu4oz99j33a9jhhf0u5hzhnl3bk7fxdc6tyqk273dzshreq2nf3r2f0wql3spr58w708mgka40kvhwhsdojj9vjm6bk',
                responsibleUserAccount: '1z865zrdd6ch7erqgu0id',
                lastChangeUserAccount: '9p2njkzlw2q8dppvv510',
                lastChangedAt: '2020-07-29 04:03:53',
                folderPath: 'vo6kdfcpqbeo8ue6v50r3xyygxk4n5q8dsabkqgyr5vegmpcs9v6j1o8ffevgq0d8oco7lqizqltrc1qnzvizql8wi6zocwffu7cwqfw69l1wnhj9r8xp6xvuoex3f80xxcyqm3ukqfotchw6ka0mflx7obwt8iwbhwuauegotw80d46qyogqz76q1ncgp5bfwvj182kl8vl7zgocvf72h4ftmp94ig2u143oexfjwop24tvowr5hmxwxtvmlt4',
                description: 'gn50sse2uf3tc831pqpws239ko10z5ckcpnfugbnqaorbnp6a8djxh66nhngc91btdan4xbcsouioqx8nq333rqu12xq8t3w4lz1phshhmqfk92dz4ugo2thm7xkpzelllhjb92xrz64tjck07uo285axqyl4rsybyci4q44i07azp9vbl1avn5ur23dhzl91lnbbkri1bqcpkwi7e5a8wcyhom3k83onan46myxtw7zmvs5799e7p14t3g2e5s',
                application: '2ycq6fc5hk9ngi3hr96nha0ug78fzyne6skyq58922zzw9m8344feocs2rar',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'hzfg45oq5wc891zpihh0gque2rrprmu92ekn5wjp',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '8oznkhcksb63jl0g82zyi4akrupvyokiv3s4246hpbiocrjwn3',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'bqzee4jggj7n5323p42a',
                version: 'byf42tlkfr5s3r648prc',
                scenario: 'v8hfwqjbl9z7wn6u3uv8jnos35g98xvxid1qg3az3fmbshevz4ljnxhgak33',
                party: 't4dm5wnsvfj7sh2rk9r9j853u7s1cyrndb14ahw1ont16jiybjm3a8mrpphqcsp05mo93vty2kzjwvh46nh9674d7seqzs8yxx025opf5yf2y0nct4khktiua6gq94uhw7k3xmg8z7w0u7gay2n26con3wapl22h',
                component: 'rpjv4ecfnaafdzwljpywh5vow7y7554q4rwrbhh1j7qm61pf4jg9bxffgyk6sihuc6ecusogufofunfz0hmxqzm2gelmt61wd3gdmg4mxx54den5qftoeoytcfwx6f4dbypk8ma4s77jxw5fe4h8ejvl0nb2e2c2',
                interfaceName: 'e42dh31ysp8ig7p1gv1iz2bvdx29ihiimduxd8vgr6jucpjyqcpz14u6xzvf1i122fmg7nnzlced813tbyxwxy236xcyz4udfkwke4n8zghpow8ep45gf774ba7dd6af70vxtorh8p1pdqgt41sfhqa2oa2yq7jc',
                interfaceNamespace: 'ibi47genhzfu49kbs7njcuh4dfyponsdys4lsiy1htt1gy4cb9zr75fruzq3kt8xkfmy3124llcwz48lxfshqq4jsh9c6dit73bk6fgvsf1mt8zel1mofnbm18zsflo7f0z3b8eshkjeyh2x9w1ykmcwfax6keiw',
                iflowName: '5xm9kjvvhyg7iol0pzuo2pkb1iz9yphz10g2xgaxvc2m5825vtnegp7sn8n6fxhpa1mxeenixl9ey5m50np1xhcfj265mbh6jkl7rc2m9i45eopvbticuyb39v1tao3w72av634sil4g7l0dhst0pr4sq4pursgb',
                responsibleUserAccount: '8a8m4r3yce4hpqbkzhck',
                lastChangeUserAccount: 'kxmqlj90qlmk9xk1udhk5',
                lastChangedAt: '2020-07-29 09:06:52',
                folderPath: 'vn91ynibh0nktka4hwqvy7i0bemauekg7rilvwj8gwyzj5v8tp5tjt3g3dfp6bnkll9one1b5c6rrr7joednakle132h7ikcamidjwhozoic2u9ths66xmmolq6nr5nt8kywakpqk7dtcn7ezrf0ri6jrgl6texa802st1xkfbf534eqmpt384mypmc5qpb0oj8quzjikwjcp1uvnnuk6q0trqgix8af8qp7opwhoj362axhacr6px3vionpqwa',
                description: 'litneid14vgg561uce5x4i8o9uathwoelw8y7pf7hgn164hs56c9ms3v8ddrxr636jkg3rwuinx296xnpoxegimk3guvs6sad69j06c9l0rtm54s7utgqsrtp5hfizcer6ithumb94ww8uh4erctk3jnyusq5vcigg2yxlyunjwky3uv9uxzyk5bnlx79i7sqpzlnu8bpqpcx9vv3h8z8wqo8mhjqn8956955b5e6hhufykxec5m6mcwvurf9ub',
                application: 'k7dom15tponb4sp9z90f1dw5tebft554j1hcl714saq32bmwpcr7ktt3g46i',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'afwr8q1hz8p3lngb43gl32qkgpwvgv2dh2s9yvu5',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 's229s7jy4c8icc5m1t23ch4gxeu5um270v7tv3tao6xc5fbc90',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'g81t3ydb1yss1qf1uig3',
                version: '0t70qxjzm4ibtrrqws4r',
                scenario: 'jcddai243h6bbbrx9uyx4rxkh6fny9hw59to8zju6t8xc42yfvc3jocc2n0k',
                party: 'putqzfo2bxwajnw99regmwtqhvgpsno7y5v02jpmrxl001rn9wshi97x3f47blh4jabz2f4g70jak5q2gtov1mhrdav1savc1g9uswn96ysrlr8rrqrmdwbgpllppbas0vab47v7qjuctrz318bgpvua9fvuybs5',
                component: 'xnugpyfj85avg7oi46go7xr1ydz6qr26nxn5lsqbm9k6p65xw9ui9jww1gtiptk4wdz61ncszr6ab6o5zf96mijcu4rgkek7ebr73pwe4j05x5025up9zwz0tst5l7rcbs4m4bhte6m5nznmvqbeb7z0gitq6oyv',
                interfaceName: '9kbsr897rod96pt7znnii6bjujpsu8ns8871m2otkexz1vlajyqq8gk6f70of6or339rufos3nk673fqpi1uwq6ellrzc4pue19q6gsawho1tilk9wn2fcbfxeov9vit478f5167jwtb5vs1xbl39jp26bj2adwz',
                interfaceNamespace: '446hr7hxecow1lxwp8f1mz8jccgg1p6pzmy827f55kaf3l104pfh74tzhmssqn16uv20in6cfyxpig2c87yaynbxx3xlccpnshjn6aac8oclbrs1rmnhx4l0nmmxgz7sf4hu6jfed87rbhxnehuid03gjcgru6er',
                iflowName: 'u3x4x5lcrpnn15u1hjowzx7cjwnxv1hrxoslv6ybdpzi2xfcb5px4itk2ccqhwypdb580f0ktijeioh1siqei5syxmljdvn3ayno8fzmf9cay5txrcf0urmvp9dwtvgblelq1wl03lsqy4oseth6e514cesixl8f',
                responsibleUserAccount: 'lmk5yc2sfchqz6gihski',
                lastChangeUserAccount: 'tj1ew7fgjo395kz8o4vh',
                lastChangedAt: '2020-07-28 22:51:36',
                folderPath: 'q9fzt8wthnwq4413k5eh2xi51b4ykb71cjul2s1fde2bx2cwp5gl8cgdg2vixhh5rv6unjhawgir6101qe6edbs3cgko24avpo1vxc0oon10bjw7pjafcsa118hvw9i2c2fei9co7vwmcx2fpxjnaqi1caltl3xhsd6eqecvo14ol65bes4nrzn3mz3q2j4ykai2mvbqjvygddhhkqq4oyksrogzn43tic3cyaad4wosh9kardjv970xcgrg7jdy',
                description: '9qdzwgfjp26rc0q19gzgosg1gmycpz2p76undptuc5mbt3uhy5388ffb450560zt3bm50ji3f7cq6tn6sd5xh74hyizxs5t6u7rx40g1c48mj94u0unir4gpzwcslpsmabfw9hd3mghcihja8t0apslvn50fkxiru6cq2qgjlchwgklpka77ruff141ltrjl12w48w7ckjx2tthg2gx5sd73vwujsrziiajrgks56xyq9bn07c45t651tqpjs2e',
                application: 'rws4ssk4npmtkql2wmvxhfhx0jqzdtxo5e4q86ebjhah2yis45x1dums55bi',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '9gyt46490x8e7ru114y0j6wdr553josjy4vpfey4',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'izmpd5i3iqbshnkskqy77non4unzzymu4mve4daorjzu6thiew',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'w8nr3gce31m4uzyio9b1',
                version: 'aix00iej9q624xwop4fr',
                scenario: '57gr5ghrwhhxncvd2y8ljfyfgf4fn5zzcg4mh6d6hzg8ajnxr16x1kq5sdru',
                party: '1dmydzwfgwc5mosmbhgqhfhtef9xjo0vqtpqhtixpmu1uy8ilxjiecf4k0tb5g24ifgzyasi4j0x2lv2kr3i19rvmed7cfvxkdigiv8mqv3kx4bszc0aykkujljim0adfibb7pawg7h6o4ix2o7ea2kts0afl4ra',
                component: '0m06xjvjbee666niemxyktt35c6rpvnir31a3bd49shot8x2mp51ws96rcuwj6nbp0ry63u7ijrcnyi28gwisxbtzyl9xl6yda5ky3eb0063colv340h9ot3s4olhquazan01yw1l51s1utyiycpswbsjhnq15wv',
                interfaceName: 'fd7x4ick9zy5ipq2c95om13rna2rly203dt3nzwo45b5wcq6w7qosbxd8chcx9cuuwn3ts2qnrd9yelou0h5vep1kgkhifl5gf1iq0uxu0jbo7qdvci9n38365zqrrz33v9vlve9s8vasbpoc2y96ct42pka7u40',
                interfaceNamespace: 'rhewgs44bnq8etwb0lcf2ybqu8abseygjwgcrlh5qr6hm2rq2k4t336cnn0y9o5i36wip7fajxc95veiwyskgz6fi1x5hpel9rhergh06shjgf0ah35lzodefjeestcc6amq0lqdnffnd50ao1buax6iexrz69ac',
                iflowName: '00aqiu7wu9qne9w9phs3pd41dakw6g5b2aapzcxe5ks9bysrz2llj566hm4fe91z2u1d1a4l2nrowvivz3jf5jivcn9a2tj2mashe8id6i7cf05w2rahv3n7e6djebxu3a21ul56xm0t9csi7gq9erd6n8bgcp5t',
                responsibleUserAccount: 'k86ab875185cqjbx6gqo',
                lastChangeUserAccount: 'fj1pqtaei5vtwrq194w9',
                lastChangedAt: '2020-07-28 18:55:01',
                folderPath: 'ihqoud8z61gij3wgm9dr55p70zap82va1f7etpf900z6rwnd8dd5crgtap10lkgtfixmlb1c1lgef90793225v1y6v4fxa3bekez2jlgq88ee5evqv1m5g8ul66q1kxb4f39j6xpjzcunn2mo3ur6pr2wfxsmrhgmtb0uikcka1l5ay804zx8u0ys47gnrknpkyknxorgmoatfsxqekcyvsyc12mfouhm383j6u13epjmuohswlksv6ycvzuh1m',
                description: '5w7gnckfhvi6kn8pmv2xhse88vnxi8t8agylsu7cnd2meu2m9spno648pcrcwdyfgpjh37x205peb4jmyml3mwsbrfxwdcivu2sltvanxg3irdvg45h8xqcltrw2dkzxfk0cx63khdzkb4co2ejsuf9nywhsbw4lxb0redklhjf12vowr4xp8en3ilhxzxlu3xhz5evmzq5bcu39b474cpb2asb3f8ov7cbzlh0bcnv0jc77n5ituokmrzugk8g1',
                application: '1bkhq151znrxz5vmk8dsg1tv9lj1tj2oezwj0sws787usrkr65emxw83txrx',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '2xgq8nbds6be2ndx7nuqrv0t16yxaejuj4xiqjol',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'kxkr0dnt1kayfbkzoczcx13s3ewjm6yi90707wncidbahwhmew',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'ujhogn8ma5fh2lm6zyt3',
                version: 'y4srsmob5asdzkjqgl9t',
                scenario: 'uk5ixwv61zpt1zkh4eq6x69zjzkxlzulnutuw3uqm2qnuz8455givj6cbrnf',
                party: 'jtq0lsox8huisdxjk8kcis399r80rdwdn5dxb4xcv2xfja1h3dh5r9qh9vl9qx15na26omvymnsr00c6xau3kobshlue3wey1gcd5iwki4ysxfgonc6heoyg8heysx83fr5ej1mkb85fbjhbtu9btcto8r8jyhqd',
                component: '5fvgnf09v2647bwfly6west894l8kc3a3e102drzg14482oqotcwzpna5wjzfdicnfyw2ywo5s2g90m0dmbj7btupnp8risvrh81d3az8toagw035t3mko5p4wwcwk7revd83ngb51vwzhqcyhb3bpu9f24egi5y',
                interfaceName: 'vqmh80edgalf597hd4o2rxoiqnrzy648jeex6os70n9qyt3j39d8z8trj9m6q4quccb0o55q9umygdt4ldzzlzdi2616uoh9q7e9up4dg290ixwivp3j4tewb8yxl31va5sz9jldvvs183dxtosu4hfgqprai9fj',
                interfaceNamespace: 'yr0agyr4afi0226z3yx0xzzpkoz4vqz9aux06efcfxa87z7f6l0fgcc0hjvolb9255j259hqlopwjje0z1oao9esxq729vz7gz4i3diilbjc9hoz27hvup9wkb6tjt1xizs00nrzu2g1qeuga3nj6ubc5zm7e1nd',
                iflowName: 'kbe7f91ywi16dg2fnsdl4ybn8kcmrb2lzctsd1lluhz2824qbi8uujq4sykbw9kvzj7ijbc9g2sxvbcxuaf16j2iuyx6oa3cq7fi5pz1rdv2m6bopgrqnpjas3cjj57fxw269se25dlwbivuu071tpwo7qo1gwdh',
                responsibleUserAccount: 'brvczqjy6z1prdf7blwb',
                lastChangeUserAccount: 'y0k6fc8hsyztowetx7uo',
                lastChangedAt: '2020-07-29 09:14:18',
                folderPath: 'q1m2lzudvwh1kioi4gcf6t72rrjtmmx1u4iojp084zgo8m7d7d0ydm9gyfoqmvkec91oigwdiqq4xwu1z3ilpf7sp8gv48z28tqt7gabk2qygs625y5wxwudt79m14wq7z5zm32a4w7un1bztxpuxlm5104snpvhuua6rnbip1v7tjwo9zrinhwey8f038iaqltnxhw748vbxx1iiemiv5xl5hbczdg7qj87a6ytyxhwa1yhgkvivgehl4o1ce8',
                description: 'n6a1ivehhrofhvijh9m6r9aizxm9n8j08ew55h4wphubis7v3jbmox9eubvrxmpmvszbd3ftapurjuy21fsrfitph4s7y0jjwwa5lei7y295151e3z0vef2jr9jcegznymldgkzzerx3f6ief0j34zb76vdlxe4aqg985d9ygnu6etwdee6q0w8s0g64yd6dix3y6upx23cpj4bqn6kksp41bafhk24dzhtvfxn0h0lvqxlvpdfvpqz249nd1na',
                application: 's1kx5ktjw7w4rizqczsek290prfve02w68dwgyrg5he0goxowu9wxfcsaeb5p',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '6e9fgdtsyii92457fzfmojxfdj2528gyb9rbfs3j',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '1vxg7pyauz3uv8uk20dpv1bvgcxrxw5zmrthvo1ywq8kzlmv0x',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'v3fsa208bg914zer7ylu',
                version: 'xelfr1l819eqy3qp9cxj',
                scenario: 'fhl1204nsbbypga43k2jfyy53dzvbq26afrksids5iwlkx4y6lzqbwwc6yx3',
                party: '5hqcz5iz1g5p3zfetg92x4apg0u7e2mdhkb17z0kyww4wsjny0zgrm0d784ulyff7tehnhas0ybm4bht314gqoc3rpd6wyj26n4pisq0k26vgwulk7bxb5wbyjzazrupt2xn5rsmwehyk49ybybhdmgpb39kgeuo',
                component: '4qjpxbowsl0nue19bo5j5xecmf6zqrwah0acp9uy824u2q0brpnvmdh4fz4n5zp2cjuhhegah09xrtt2c5qqa9il0p9k90dws0kgxcsxgp509qd9xt1kdwuvrt7ezswaevol2s9opzwt5ts9l7fu6ylpr2blckov',
                interfaceName: 'nogkorr7i1ramqc05yxtplzy1uqatybs8cx2dny561eogzewnviqw0cqlylbdz7bs2xaahoidys10271pchmpmfmj02rv1vr83upffta5qbls37vd3y7r719njfa9ddh7nf0tdufzxrd306tfm0mu1m6udrqpsca',
                interfaceNamespace: 'h2aumwqp21q9tts6ewlu9xz2305qssr9hu325okepkb5s1pdsfrgcxxtdpagqbkvm3jvclu47bifgwcel8l6uw38qruupxp8avditlrk5a5cyyg8jmbhkbpimkf5bnpnivo1l4e4qxlw2gyaza77yp4ydpyn8euk',
                iflowName: 'yd5f4ia83w380kcfnvnsnhryetstifej14ktv46baz9p1v4kiwom704z6w493yy931j1ugdhk1e1d0s6wzdhagtxcagsihgwyibp0qoinx7b1v3y97a56zrcsxcr5xryz627e8u75oabnnvtykhgwv7wuf4h9erk',
                responsibleUserAccount: 'ux4etyys8qwdoj7nmppf',
                lastChangeUserAccount: 'l7o0lfgiei5h5ge66zxn',
                lastChangedAt: '2020-07-29 15:30:43',
                folderPath: '01nd30b66ol7fwknvxiew1ohwmnl4zulfoz66aqn74uudesiafo38s2gjthrilx0dirh6zsb69hd2qt44xstbzfdx6trc8r8kupzj2xyns52j32gezyl44ojtj4phsmlhdj6pduf5yup0dzsoff2jzooywl16cdblbq1vxrh3yd7ymvkfgl6i0xoz1cfse83f8o97s492nbd14lhlqyotx7xi0v91b3uy92qyeseb4dtrw1s6onjpai866om1hq',
                description: 'ongviyi9uydbb2hf634apxqtcdc450n9xupl6yv0zn84exmhthc7wi56h0avghxa6dbh06gfn11vp8ag9imogotmbdh4qdvc585h88j3kqnk5o1emsjc5srokph30ct6j7bvk3ik85oku0z64b4ojn1g89f8hrz0ofmt4ve6q39atgr8cm3e6py44wffggsdaauypwc9ya6h4phxjnbxrrp9wq8id1d2i9brihmeoi38h0z7iwukj5nz0l1a7bg',
                application: '8y9n0n8altmrjazwmbj7xgjuhbe7vjv6axs7t7f16pe3lkrm9rwhw0ugmyss',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'tbg7r87uvvqrkw2mix1lvhpo83zf4uno54lwzh50',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'gujseovpk8pfzhlh6pzecp1vuh316btcpv3x303f7oyxrw980u',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'c275ziyg6nxz8g7pwdv3',
                version: 'u2o8nnnwz6dq28psbrdb',
                scenario: 'i0t629elasmzx3ggkz7v9req1cuwm82a9xk0m58rts7grlgnvynvibg3dcqs',
                party: '5c630gydpkm4rhxrzuz0leydfbp3sxn3ufkyto7r6a91xh14y71fcyzb2dxat8yr85vny41xlx4v1v8kog3qa3ngelgn0wdttrytcw6oxmdo8s066kxv0aj12y699w2gmpp6k1dmh13ld3su6lic0siyhcbarzuj',
                component: 'ouon4sje4takh7nu5hdlb2kp5ri5ql4p49ummw5v1tt223a3ec35if6002yp86en36y9eiwvem442mpj805djopvbarwcax4sjdicru04pmcdqzi61k6u4zsxkwqez2usa0kx8zj6fjyznpslpo3xoyotmv8nlo8',
                interfaceName: 'hgy31trvei52hp3ilpkumgde193r841xe6f23efhm72wsbnkj4qfb4ycjiz0snuzikznpj02kmsooie4vrjyxdi74c22nadxafg75rg6c8rq92zf0g327kwomx2rbbhtjxdg3nypooqapirz3ny5s3rl0lfgbdlj',
                interfaceNamespace: 'vfoqvkoxbtai094ebd87c0a43mysxe07kg2sgfx0mmm6wk95zde3j06dd3y3so108wldmb17kesr67u3hh44galvs0wb5f5smo6d4azliz8e9v29kx0uzxkdbnzhnnd3yucs4hm1qt3520kw4vwjjo0fqu7efy3x',
                iflowName: 'b15er672xveexh3addobcy0rvt86qi7i4uedtyu6giomniqky9zuf46679bquwosjdhv6semlfpd7cgh7t00sww6rox78cln8k4vn023g1u2d3xcym6tlbkrtp7chvz10pbigb17f583bpptgepr96i12y40x52t',
                responsibleUserAccount: 'fq0moi0kq4h8bh8pve8m',
                lastChangeUserAccount: 't3acjz6jwag0jbt1hbcr',
                lastChangedAt: '2020-07-29 13:52:52',
                folderPath: 'ivzp84wq5flpth09zl6hvc5gx2hwoimfbmafw4q7fvm4osocfaisp0a8ogi56uicsgouqvxxry0s0ip1tbdznkdt39w9g1op2pr3b33bax6mrj38fjewqgtvjk11e2y4u08jef1d28uex2j5swqxho898jq3ein78vo14dnqtg9n7r6h30fnfuizzgi17nax4mmt7jjcvpjfgk0zzupslmd9mkqcwhnd57b0lg0kwai3zpctbq3812w26bh7d5t',
                description: '54o9gbimq1d1a1vy941ztn3q62jojfeuwef07alx0996jjnpj5hc61kdxs2qb54r0biwd1qpsyj4bny4k3rumx3v0gr3b26x3mn61apvwx9eftkphk2d1lmq1q4u45yxo5h10jl7myhjj075jiv34mzpzvkg192y1t9l9sa6ik6ydjfajsrftkgiqvlxc8hzhcr6mg3oyb33gdkk4c9a8kymysdt40lw89bt5xs3a946ljedc7jvtw7bcmpj90b',
                application: 'f97la7m8lfrg0p38ntkcnrtpndkf6sqhnxvvvrzfvplwx0tlyzw8yg60qkjs',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '46kldahq2002je9gga5d8i2jhxa023t1ylpvwf83',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: '7yjefmsgn5e1dxbmqlng6oeezrleojuc00jfkccmj685d619en',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'i7xvsrkvj2pfzrycdhn2',
                version: 'qi9h649kacg1y02smup1',
                scenario: '9e5xupp5qv41p0x73mxzqpj3kr31t1yl605x6kf2q2o1tktlhwam7oi8zgm0',
                party: 't575smox3qkypazi86ia7gh2l1xrmhk4y7di68q1wttlrip60giwjah6rf0ksi15k8k5y0x36p91b1e13cpo3ybm3bno3b3lvrbqktxootfzigur58b1079wva7mw873h0wpy3erdpmx2e5q5h7ma4m5wzjogqjl',
                component: '6ke2dxkxkecwdgv904xw81kv7qli0ln5l06sbr52oi7e7ooeu6m9j2uh42ez39msm9tqcgx9o4jashsflklur5634v1akvct2t0n55mj0gclje8d9arbb48ult3gmupy0a3k8z7wchau5iqs4q63gc3k79zv8roa',
                interfaceName: '705u31sa0jag4ebzslowndjwdreqcrdv2ff746x83i7bu4wsomba91uzzmju3fivvnm872uyys3mpwkqcoplxbmmpl98jyu1hqhjefqswxuog39z4c0x74k0ikz9ujqmtqt0xcr7e1vbq4n0ljabhkfa9s6e9k82',
                interfaceNamespace: 'yzcfxe623y85n4xcsakouh41udiaiwbz33tyoas5qu9pq3vy9dgevsg5cr7tqder3n3asvp79echlwk4ih6cmpp0iv2o9hnixevh5ozpzs152idaxz05wm7310ts72xpe4s6p8s25syzacyrr9cpm42a4pqg5f9p',
                iflowName: 'ibarf5vhlochg2iq77q9hx7d1abbij1cxt7i4hueqkey4z13yfp69j43d4mqxl66qvdlxtf61y95govjdq8u6ta7wwzs7ld6x5dv98h6s7m9duyu55fns4pnb3gwczv3lnpoyssb8pc2y3bydwk90sm79mapd6h6',
                responsibleUserAccount: 'scfsje9a0rbm0i6u2fq2',
                lastChangeUserAccount: '38n3l5e99hqgal3czvra',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'umb3ddt3wbysuciznoqq2cf4yvuj8y6fqhw3gnjd39vcsp4k2hzlzeyhn5osokguingvv8pkt4fs1sorhvax9fpcnz9tt5jtbgeocvjw3ntuzbox8vzz2o3iohq7fmwjbl61fnoa8kouxkgrn45x2bq10x1hvm4rrn1bfh08kqjtn8rm4laipb47ugou3x8p4kj9tauf7utillfj5v5b2lv4fhfhgyqbnoklsvneok8z0ivgchhe1xd3iupnnw1',
                description: 'ewd2n8l2f3ygnfchrws6b8yvtpo8ykm94q9d1dxyi3bxtvgmflyn6zthqmc9dzgr5m2e9bc2it8u2mrryi8rjgu4qcfdj1ub08yd8ulqub83xdsjeea9g2h58a4i0h7ew44kai1pj51ef5wgfkm2d7j5o26w8vv730mn75cchfhumdmqup12bojjo9pbigjx8p1va86loza3dad4f0mche9pv99t1vl8bk7zvasl4akypvgjupd1xuauh9bzx7q',
                application: 'ihag95fywwqoik6x6fmz8pivlbhvm12y07imw9mh1h63j1nlfrj2jozj7rct',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: 'h07q44wi5gnxt6vokdgosoaetuprw9g2q2bcikat',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'wxzemhdsqzg8x447imwt3wd85hsc160jss2wuz75zc1wmh9qs4',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'ndxf7lzpt9fo2k647tcz',
                version: '5tw0zta91x09utvzvt9z',
                scenario: 'wl7cqr5eyokt8hrbtpk5ll76bpzy8dm8uj0f9thi7s4wgcx2i6b5dmliaarp',
                party: 'psvary8ja6jmw9uvg2p0evopyd58lhji885l3ciidn0j7w3ks9usrp8qflxa3a0ql9zodq5b7bghdsk5tizu8n1mvyltqt7ez9dfsx71l6mmkyu2h5ga6h73ztnwm4sv3necd4e3qbq0m5y1070msp8qqltaszky',
                component: '16eqe3abmwuryt5666mguzttx71ai2ufgc2ob5qguozucoz0b9dqjhxlrnsu2ni6sqbvw779j9j01sxfnid5ivjwqdmxpomd13k8taqrtzqeot1uno7o1sorfyekxf9vuit0q5c2kcpsrx6dfvo4yqta2jj40kfd',
                interfaceName: 'nuvh8aptlyphe5pgp1xlq9ljkbt6131au3cvsv1ig0j5l2gifod0u046i4k7bbyzxkb8zief0syaprqd5fu52uwwzv6r1x24v7bz3cgn8y5ju9jtnclz505tu6hh4jde4kj6ec1c3hybz3s357tkjs984qmpxxp9',
                interfaceNamespace: 'h5hhjtwps0xzj0x2lp5wwuxr2usoovutoyb3t6lu4ptuy0ub71w5iinz9yihz4ctvyga1u0vn4x5isx4gc3wu6m20tz3tum7iwuo7d7srytuu8z9c5yjg3dudk9yrzi4dcduj30gxce6p1dqflzndr21b0chcbt3',
                iflowName: 'cw01cfy9itplreumbnrgpe24zgm8gfbsqvr13pan71aao7bqox83xomhex9ku5m8izv9adyaag3u07k8kvvfget0ueuesjah7ic2pi366jlykfdoz2yx1x8kl64c2v9r3ghevt0cuocyksegha1hed3y1trxvckg',
                responsibleUserAccount: 'egow0dypv7qmrt7wvy2w',
                lastChangeUserAccount: 'k512k6zllm8sfimiqifn',
                lastChangedAt: '2020-07-29 14:40:11',
                folderPath: '5c0s3k7l2bamher5p64rv58rhu7c6y8zr0gfytuyohd6xfv4soggf9r42ixc27oesw886rif1zr9okc37m5f8lvhd2p5dz9hcawt81rd9izk72bno3t6w9kvnisoaejq9i2d7iuaxd3fc1iao3gg3nmi933cfnmllwrtlw0c78ou4c77n4lf2lpm8zqlyxrb9u092lpmnhc46h81exw3s78j2mgo4wsmz9lievhtp7sead55m2bs4bnrhwy2hsd',
                description: 'vj3dlh8se17lzk15ji2f8mnyr6j2qx2bvyzwve5vwvo1rfmw488rd3dyulurvbtpb9zblshlz0p9tvp17v5ys4z45f6s8xgtwjb2et17c637ki72ppe4kj9k4gtrum7y9gtaper19q47hiiowvgwh88nxs67tztxo2sn7xkf9x2p6toeltouylmdb97855orn24iutp40scp9ol153o0hx4juejigjcv5ox46cjghnypvdyzkcpzdgbj6qiij7n',
                application: 'bnddz2grih4ryl3ni2nfv7a720ps7ldt1mmz2elrqjgeziy78f4fjp4cc15x',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
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
                        value   : 'b10b028b-1e7b-4098-aae2-18bbaf2fec38'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b10b028b-1e7b-4098-aae2-18bbaf2fec38'));
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
            .get('/bplus-it-sappi/flow/b10b028b-1e7b-4098-aae2-18bbaf2fec38')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b10b028b-1e7b-4098-aae2-18bbaf2fec38'));
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
                
                id: '367e8d03-f12d-4433-b50b-9b2c0822a8c3',
                hash: 'w13d86rt8s49s5li14c7skhr1qhwpshg87p5i84p',
                tenantId: 'c34d430e-5c73-499b-bcc6-12672026c745',
                tenantCode: 'aezm04muktllpktj1fy4qzpkuin0alq30ioh7wg5rzuii0bcn3',
                systemId: '494e0fd8-e32a-4f92-99c9-170317672b9c',
                systemName: 'f4ncz20iwbdyydbb110y',
                version: 's46c9pze9950obcs1688',
                scenario: 'arkznuo6mfoc1kair9ypt4n3hvticlybjwrkckrcnk7vo6choluqzzfeqyl9',
                party: 'tcoyrennt2qsfgwh7phsojlrfx8wtwy1da1xseqdulpujjoa2rfkmkbcrvrb41d2ea7zizbi1ujba57u31587d6uslbxnx41cy66wbm50ep7weplantxnzacszeeva3lds7hrbhp3eebjsccm3sb782gwz291sra',
                component: 't0hjl3u0dzy2rviezlbhbl48dperw3mqdyp5l9smtzy13r1dmr76b1xxlw1hcqyxuwbcrwby170wbwptxcmo875j18x0qrlz9yqabtkrdonjbdeww1xldi88rpxcmcwn4pedkjeetl0tqemyha06fe3z6s6hzfyn',
                interfaceName: 'bpxpwegwdtwfyoddxz7lnv1oke7p3c3d2s2dwl1pgn0kf34nwivq0inf2alpwmh00d3ws1kcwi354doqd7y3vfe9jyw6203xt4a7ba83v7ji9jfwjjyv64j5qxhi275k4djf8fdqylvs0e1affe1d9j0fvl5ts2c',
                interfaceNamespace: 'gw8p7xg27e8gtxx274m53aglywymdtgk3opg997ljru57m7i0n5oh6l31m5f9mai5bsqmrxlmtbkpr7mi24xzzx08nzwcr7bmysnzyaci41b2gsu778v7yq8r9r0bpo0lb5x5z26pr8jxnw0ia4q3aygpt89uqor',
                iflowName: 'x9xgtnacqxlaq51n91dybbfnhd5khvxexyvb6hm5llzrkylpf1tg5vs9gdkwdxv2uv08c0jbkcen0tf0lti3r66sjpxfnqvkwqye37ow5pjowx1t6zsexzd78qbk47lxv28s0cs2yejr8x1r9v20gvnyb3jf44zu',
                responsibleUserAccount: 'nfoxvt3d3kufvj1mmgj1',
                lastChangeUserAccount: 'q9kp3ricm2rjthpq5wtm',
                lastChangedAt: '2020-07-29 02:02:20',
                folderPath: 'bpi0uc8qto27tcitn0hdfmhnx0xopgf0lguo5v39bh14qppgvx0krb9o7ukbjdb6uezk9waybyj4slzu2vj7c78wkxyqosyvani5vdgz5pio5g1k25nm5xcdgf3wl1bbpvk0jd3sb7qax3ktmjpj7qppa72no9a4gzhjuhl547a0roimwh0tf099x8tmuovn9oygdaj76cgnag08e6mo328sput704fj91g5l1k6mvd4o67glx4f88vs0xpghgi',
                description: 'mw58k8qz5hlcq8e8zh7krmnt2zk5gkq814c3jpitt176xkyzs5xdt5k83qs63t6qxjjy5gp53xgn34eav8y8r1411y0c0ds0rdw3niznedjwkpsaticv4zya4fzvvqb5qikx8u5gakvxd5t5idk1rs6736arz4mbcz0g363xiqqpxodosi6oioqbzll7laokihq9p5cd7y6npfwpx8yzcw7d8xsim35txpkfjwhylh0gcdc9p2n6zfjyk4n3sip',
                application: 'emgfu4t9lrdthxduvemdkbsuze800zqpqhrtttw04p1vo6ik4cj3ls9cuf6l',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '6abbd27f-0db0-4180-af8f-3bb279f93e59',
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
                
                id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                hash: '1lysvl9arhj7nozm4f1r9rcesopd5uqldh5pk81v',
                tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                tenantCode: 'kfmt3b97kruelxk5nxzzs3umi3tppu9awgncdnvy6cohneije7',
                systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                systemName: 'cz36ggp1xnctuelvu8q4',
                version: 'rxutsek97jzndhhxr5q5',
                scenario: 'vsb0q4i5p7iphtgryehyu7tj3oz80pzowbu14sziekjle4x3mjf7hi8tkei0',
                party: '5mujuxz1wwa8subcadqnmqylmofowh331tccq6x7kyuei1hxek9933zv1f5czl6z80jfikmknpld97k92288rvxt9ijc94ms0ju53zvgivov2tbnpmd8edqj514ikpqoem83l2hj9x1hz8d3vvuuxdyarbn2tz0l',
                component: 'prhxkfklnhztjyttgvgecombo3nykvj83r85jjywvdyb6fw9pcwfq01st1spoh78ocpor1qsco9mmsttpjvkgteno6ftck4ykrd2tzfl41xjek7gm8ap0fx9yfng8i4gmmxnwqxhgdwgk91jwqjuo2fnvg9nb5xs',
                interfaceName: 'nfohkvnnsu42s17fn74npmb340hel9u2d17gc3adiujd91n0xufkbdxtlgttezvgr4t9lv3zq0hia8ygpj64s2lixkabzxrfuq1s4lfgzmgtpumhl71c2jlp1o40ndyco9jzbscz4mef23yopcv6ieqqjr9i1gbc',
                interfaceNamespace: 'etaq1cz205m233eo0unals6t6hl1e0xyfl8z8ng8znz885621hlm8t2ylfqbvvcfgl9c5w5j2bysnw1f8td75nwab1k6tki3ysiucbetupaekf35fi28ohz2uloz28bw1e3a3sehslqoaot6lyjjngif3k5ijr7l',
                iflowName: 'bkdyy05ar1sytoxg7ixpnzjg04l86o3qldrnzgyo4a0xtqqvtluquof2wt48rd9938ytfcohlyhprurpyfh2ck2sqbb1g5r8lcqwnkrnzngabn8k7a90z32krxse55pbvxs5q4uigp778ev56sf9i5wznn4h23a1',
                responsibleUserAccount: '4m5xb3bc4xysfrjydn4e',
                lastChangeUserAccount: 'smq93b4pec2f8pftburp',
                lastChangedAt: '2020-07-29 00:28:23',
                folderPath: 'n2niq2o5ku7vizflkiw2g2ajq40krigykegqwku4da05wkufv8nm3qzofpoke30vmcdxadfp0qurwrd91dg2vs4grg4wsofguup9klsdtxkata54io4el3au267fn7vdif8fbz5nldipcmlhegi85qqgfk4m8jbdcc2mguqf8avqwu6mu2fv5a77xchj65fohln62aw45w3shrzguym23fsz87087ls6cl3bxw9y5ymfwd5os73jdr8b359k2ne',
                description: 'lk6vbd1o9669p3j1o4xt35een0665zdzu7bzoul3fs79zjg1dzyqcaucpjahvgm3v0cns7n6gswai62884kml10dlrc1bi4lnr9p0me5ah26c74p1ir16oln1dkuntl41ta0keq491aayhmspd1wd3p9cbxdorntlysq4q1ooxv2l83xslvhzyiuiurtgjvbrpg4y9cebktfnvvlukxm9l03ba4h9o2lgwo1youmlw3qc5vilgwc4qk8v58r30m',
                application: '8zhgtbmmr0tcs9ala6z9dvwg0fqc316zkzkh5uhd66icoa21u05bemjri89b',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b10b028b-1e7b-4098-aae2-18bbaf2fec38'));
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
            .delete('/bplus-it-sappi/flow/b10b028b-1e7b-4098-aae2-18bbaf2fec38')
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
                        id: '0dc0af98-19b2-42f0-88a1-f9e591bc5cdd',
                        hash: 'r7udoibo6d04p1ooxt83yfcy5nx17xvp1zhh3qtw',
                        tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                        tenantCode: 'xe54rwshnvra4uy2zv818e0i6rwk14gc3xcwio7143jsqy2l4h',
                        systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                        systemName: 'd2fs1b5ndsctse6dyx0l',
                        version: 'bb14gvbomt5v0icl238w',
                        scenario: 'a4q32rt83gwlflv5pi3b1fwzlad9ypvh9klhuingqnjjptyj2esq4yfe8i8s',
                        party: 'lwnoj9ozhy17p1oq63piumaiyo9y5swyt8gt73by06q7umc4af9y6bcb9e75ldkirdepp8ipkhesf3k0j08fgbm49176w1u6esgbfknqfg8a5m2jt4dc3y820nue7pr143brhfpb0qe8ui2pthijkn3t01sgl3th',
                        component: 'x29qs6ef5bgm1k6te16cireknwbhl63hk8gi1h7na9ubw897fbrwfsk9xiq76drbe7dit42kq6e0o1lvpxj2gzx7v6clguu7pi1excnwil99asvfbjjh7xjsjqgkzs26exnbuqu4vkdx3u32fihixcg95mgooh8l',
                        interfaceName: 'c24b6eddm1sfkfe02v4q7j4u09ie8kygt1cw8yda0v2116bcidggq947oq0w6mnyqu39b595wmetvf0onnzuo46dium49mt1eve5tgvrei6iq1jwo712n9zpu37gty7yhh3v028u0r8ez5oxvmzl7sgz81fye1ej',
                        interfaceNamespace: 'tamh1ri8s77d0dzm86xqrwjpqudavclx9jq47bzs7dtx9kp1illbo01m4v5j7bg1oyqsikthd1m0ubeqtv8q064rdb5rduyn0qktl8nfuxxm2exjnks6c40iwg4g9s3polwnt3nd9uqme37pqaeqqfqvogplk7k4',
                        iflowName: 'w7luh0d1i82k9ienxxbdzwbtv89p0yuhky4n1s8mw61b7zls7w2me7jktucdtmf6bjwo3fbc0jrvotnivutemgpzxtqc6eqei7akr3kwi1li7exe5pggzzhs7idvsmjhqsxamnl6sb6n58k2d96p47jg9mrio48o',
                        responsibleUserAccount: '6v559e1l5drjdtbtk5dr',
                        lastChangeUserAccount: 'ad4yq9awm3xpz7pgynoe',
                        lastChangedAt: '2020-07-29 15:52:38',
                        folderPath: 'vexofptzvh90untuk6pzqs7f0yjx7ih96c6qojk8twhzo4cghvfzm4zvqyftz2w7gpk2n212fhtfm2dr8guzcaf610r836h7tnnjejzxlg555n751seumvwu3kpcarce89hd6wlm5t65gt89m8qanx0vnr2oeyofwg2h0774232q3ec5odha4j93ehktbfo5e56nfvum19uep4wf0oc11b8w2rbx1fdxqqdciwqusn4g3ex78p0h47lb3x3377y',
                        description: 'caoi48exn92dz7zedvlzl9ult7hlg1pgzp2d9rqqfbwwld6bg03fsq5z3uty3boxoue32p01pxapnoh2u863kh1zka0kw3x9uz78m8tuf19h2tab7xvh8pfy57t7jfuctcvleezujo4m00raepwd0zabfwo1mbhuqm0eey8dd0cqf9m8cml46jezbonhcbmu32s3oqxj6p7gs5p5ggjd10z2lf32bv5hf1fhcu2ffe8onms7rql88lw0h0xewok',
                        application: '6ek4lrp4x4s6zr9akuzzmr3ghj2d8uesu69bbdjiv5d2ua51ll6d1jo4eyjf',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '0dc0af98-19b2-42f0-88a1-f9e591bc5cdd');
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
                            value   : 'b10b028b-1e7b-4098-aae2-18bbaf2fec38'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('b10b028b-1e7b-4098-aae2-18bbaf2fec38');
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
                    id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('b10b028b-1e7b-4098-aae2-18bbaf2fec38');
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
                        
                        id: '217eb6d1-6da7-4976-995e-c62e99b88dc1',
                        hash: '7gttg3in3wjsay6v7kwiselp1on76swcmlpgnqmm',
                        tenantId: '57c20da7-7f1d-40d0-98ba-0fda8f1f0718',
                        tenantCode: 'k7l32y8fqwedsugzh0ycv2qu8q7fhi496nwrvo1006d640h543',
                        systemId: '89fc2adf-cb86-4fd5-9439-9e690d1dfb92',
                        systemName: 'aotx4hiftb1wtb5d2njb',
                        version: 'k0hw5wzmc4ccmyrv4j85',
                        scenario: 'men98uajowu49h3pb839aixgr2vm9c652a6p5vzlqmukwdkw2avatlvxw66x',
                        party: 'fi68cad39i6n4mchetqudjxl52p41g4sjps1kcraw8ovskaivne1vppurwq1fc6kx1idbv7e3r8hosoty6wl35dovq72khv5af5p1yhfumh18abksj8kcp7je4ptypsv1z35ikanijo0xrkabnczcvp1wkvmju0x',
                        component: 'x8doqstmfutftgqikoxdnjpipo30psmt03quyh2o7j0z71grxjv0zsw4iea43ypotz5dzyhpqkiofh7uw2g47kzq76s002mxx8s8wj1z9hujec5nxj8ku2faxmkklxm5mmtkscmij15uwgkhet4r2uki43apfaw0',
                        interfaceName: 'jnvzltum1uraibf4irb1f0h4h1m2qylcq9nsib4i63gsrrrmqsjedkq3vtnjfbiw2k02ln7240sd0usxjuo7a3sw74gkyzhrnvaiowtd25rj2fx5nfu1eej7moxsat8gaeqp4pucbd8kp75j0q8kx7ia2pjn5y8b',
                        interfaceNamespace: '2ksrg42me71krvq89wtr82aoe0vg7vb0jsa9nby2rc23qprxam36lk3j962ay36ahla6cmhic2sao5604szlryk15zri1m1wf1y91n6uv4hba1jh3sjwf64mrrccf301rvxht5wsnxw4ivi7vqolt9rd2jqdiirm',
                        iflowName: 'ocogd7oxzbgdqwz6tneibknlaeabw7c3ud7arn898498j9lorkna17szc82ai6vey6psylcbw2p2llgtc3ziq7qgex2bylg1p4rog4dh4dghzatomwmzpnbxu9qettl8l1hb6kru5cw75s0dp6cgn2eo8l7w06uw',
                        responsibleUserAccount: '79de3jh94g1b34wtsdmj',
                        lastChangeUserAccount: 'ydw0bh0xm1o2vyh9m0r1',
                        lastChangedAt: '2020-07-29 10:07:35',
                        folderPath: 'oxliyihk6jvwjvrhg3arnemwc2te0jg271k1g2e5rk57uh8ajkwvf50lxdhad8xzch47rwmr1d6rgnof7vltwt9h49paq80ki6xiv2bbp8d61dk9kdv6bvq2qqce1clumo7zfstqtw0ohv8qrga7tbyzqunylfcvo17hb3rwy2fho4eqbf4psjhij86lbz0gx8e8f98lelqlqsfbzyepmijhsd7uk2iw47vcndgaz0ap2z8co3e184hgnp77flg',
                        description: '3kkt9lbt50i6r5yawpbfcnnbd4y9zedo94wltgxrjr0bvnhi0c6gezaa512mi9oq64lnnj4pii2ly9bvma8ukn67g9i7j7aoz8i8e7aie8r0edvzzo63ubdsmaz0k8l9csu1vrgm1uaycfpv0gjbuzxefdwx1lv2usulvutbsh44xuprxdgwh8jqubdd5aqno1qeuf0ohb2a8ta7ei046k4sv5az9sx1n7eh194v9rcw7gikcztngu4jvs28az8',
                        application: 'gphr9vpvj0enkmxkk6siy74ctr1qmui7xf6841v3ltz0jotlf9rsy7bdegtb',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '32f46074-562e-4c42-8719-3dda4c04498d',
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
                        
                        id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38',
                        hash: 'qk8hi3zw4ul5xv82j6e6ip10gaugz1ddpk17dypv',
                        tenantId: '48132ca9-66fd-4019-b9dd-620337ddbe56',
                        tenantCode: 'mqh1695f4ewohzdxg8w795z4vhi991a53nviwxczn7nja7uq29',
                        systemId: 'f98b30fe-06f8-460f-bff1-8d567c29fedd',
                        systemName: 'd8dep1dl7vb1t0j99xa9',
                        version: 'u8uzdhr27m08t6n57mxw',
                        scenario: 'q0xoponxbdy5dsmqdf6vk4tm7o68gdq2qy5ytagagssqinqtq0wjwczv5i3t',
                        party: '82enz0unu49gx29pxnmvzee71k7s6w9w6neqhm9ash51vjveblib65nvqciboxvripmtvvky1c6gfmw99yewp5g808lcao3qfmod33vv098sxrvlze835wzud7ediweltetfblrpowpga6isz0orngh700w34jhp',
                        component: '9k3xh4pd4thxwkb0x1bfhdosd7jqpaly8hol4b7iofemcxm8d00fkxtc3lm2tadddlryiptvobtydbdcjolozpecxt0kbebma2levpafkxzu3ta829txlymwzs1avubo8pm9lcqnwya3y4s6h1i2sb81x567i49s',
                        interfaceName: '5rfjyow023f90kn9odnzaylclye01st2fbx5fhc4b2mk2xsaazkjkklbxdj0o2v5v42jtg9d4od8nm6xz5u2nry15ptzurzj81e2nh0hik8amms1vc3eeh9jg8s1lab83qx4iw6upufvb8ihdo1yzlpccii5kk64',
                        interfaceNamespace: 'uq1ahhu56mb6r791orws80zxzf6ypjbal5hv3t7khqrp4o1bmzabny4xegp5we85lqb8mg6xexi262ifnvqxwayd3pkh32porv2mwp75bp5utemd2zgja0fqlknnsmih5zvr03ivxzw4ddap8215ffzgv6xu0eol',
                        iflowName: 'vzdqe5rsdzcn2bdg075z3x922y8ojc6pkr09mnt2lqvo0469nq6fougzxabn2h0dqsq6bhdapoaked4w7itz3hfzlxxgr9z4e7ti467nkmyftj1y2meqgo7495hm3pgu0dimosvrrx65ygwidw06lojd1i20mnjt',
                        responsibleUserAccount: 'pi8966m45dbvixrz6yb7',
                        lastChangeUserAccount: 'gm2hvmrq94q7ber9h3ab',
                        lastChangedAt: '2020-07-29 01:12:05',
                        folderPath: 'w3n4kubjyyt80tke7a1panxunyqo0gfie7ti9xpj3uhxuykzt77h84naekonjxfog6blxaq866d6cpt8hzrkrw9loaobcttbwodq9dms9o76f7q0tyj0l1huwmns2dw3x6uvh9ct6wta9tm9urm2pk71rxh5wp6dlsk6vosxyritb51b8yj1eht45imt3rh5vr92tjyubwpz7um1yefc3xjpz90pzcntqkcstnww92wfngkypy42pkbozpyakmb',
                        description: 'mpxcmrek829n8d5ug9i406piblbceq5flo8dmzdndnnzhz057v6e6yr6voptq4emskm0l7cbeuvvnvop9d69uietlclnrdfzu6vslvfifsyauumgqskiwrvydq7ynk8cs0znv5dcl4jocuksoqjfl8fbzsedv3pjtwckyxs9fa7zrg3ur299f6n5l1fn1txye5h14mlpodsekm66khgqu92j9919xqz5y3i5q9pi86wub8s8xgafjxkweoy4yhw',
                        application: 'ayur0k2zeealrva3dhdsy0bk7j3wal70p7iedqb1d5oz9q4mnjh8y3osxven',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '0bec15a5-9dc4-4383-b536-3fa9e4446819',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('b10b028b-1e7b-4098-aae2-18bbaf2fec38');
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
                    id: 'b10b028b-1e7b-4098-aae2-18bbaf2fec38'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('b10b028b-1e7b-4098-aae2-18bbaf2fec38');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});