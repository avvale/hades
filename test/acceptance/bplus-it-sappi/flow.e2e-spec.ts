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
                hash: '3494a3zcp9a2waew37a23kry1tdyw671m8dxod6j',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'x5a0voziv9zq77h239nuijjh4lmzw1udpjc3v4mtfftofmg1f1',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'gj7fwvtaiuw6u8mnyhs4',
                version: 'jug2o6zwixtk1kztnem9',
                scenario: 'lenkyltqj4ag5j8y16xb7jyl72k8dm937876z7kh2tyd2u7o0s1omlu12eab',
                party: 'pqeb37dxvltn3qeiw6ec6ymwmzuz6avh5be3y6i2k4mpzaj565nux8y8op5dm9j7504a1aspqmu2c4w4vv5ni53zik1p5vtq6lk02eflkx6wkp4raugprj5p4iamjrw4cqnou6jks4ej8klej9lrqbsodwci1jw9',
                component: 'nogxkxuoi1f7p2snyiwfyvkd83sikaa99sw8g7vactqx58fnwnsj2roj652nw0fj0sudn8kvujhuvyd3a5dexkzsrc63ty67xr6qfhqjbwiu9jq7o59mmnrdpi39eago2w3vxyi6ggayr1yl0kjgw0psj7td72vq',
                interfaceName: 'x5n04ccqbzytxpjcslyuh26131b9s0ncp94khc72q29l529ao2vngmjeublthagfpvxyonkozz3e532snev6w4awrwqzel6jz9udzltibzi2g1cibuz26d71ynxaud107otupacqt7gkc06q7a8rhelnw0inrrcs',
                interfaceNamespace: 'cygsce5mgpya4xx8zaeopimmys9zf71psntqycr0c8i5qen7fcli8p43rwz8mjwi4s0haci4yh8892m1v8rzrckdyxinj6nkzsq9rseq3wagvf54l0qx8hbnonmyaxoodn4p96kgm2s41wytmvbeq1nypymkvt63',
                iflowName: 'vcwuwlozeomyzgvk3fw18gs17dl59o1reyrztvrql73xz8o5jkhujk176uuma27dcqwn3pocb238i1e8e8znx00eq69tn2h7pocyo9m04ovr725rt9uushmjbspikvlneh3lp21g0lcpne5znxntk1irq7y313ka',
                responsibleUserAccount: '1aoksav1p0mc6hybgxt2',
                lastChangeUserAccount: '6trgkh7s32ryts8maz6q',
                lastChangedAt: '2020-07-31 08:21:25',
                folderPath: '2ntfa9b8d77gvi02l0owuqi4attz9twswv3z9fbgljgymcwerou2wt69g4kja7ykomfbbx2t55c6hiuzidw0m2o5igxh17xrmi5p9abqelv24v6ah2zsq1mtxcgytnem5ubl9q8uukgso01my3a0l5371umc2pl7t13a80pl3gi8ag9ppqnlp4ux9neneodnjjajpmqg56mja0h5ft0127j1oztv0fnw6oeolxqo2vet917fblslsevd6pg6w3g',
                description: 'elvkxod5u410ugos5hcdkd0n7aay7m688gwt7ww9tz39layns1yv7swdb9g8fc91cahgvg3iyl66kzegwici45uaqy3wttkfcglnudil44sbxx4i9bi7ch3mrck2yoggiakw6ttpx3lbqnfcql6fa0o8s6bwdsltzzrw7td4cs21ik5txsldt52ms568yc8ow2lom270dv1szzh1r2mqkuyqgtj08mz7gu7fu5g749m47ae18hrd0j0v79eyq8f',
                application: 'xgwfjaon3zr24otfrvjmzv2c1a6lcr21bdquqbsgub58g5dsadaxzbw8e7cb',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                
                hash: '5g46mmhbmy4isir1mkah5kvpge3o9a4oa44a9qhi',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'a1g2sapvoguj743v5gu2oww8vofchpdylag7mez9gajem94bmz',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: '5sau9am4vawjszxhtx1s',
                version: 'p8hgt3z2vej8iz4dmag9',
                scenario: '3xztwysmz1crjz95src06aikm9p63pa6qc6jm54astohcoqy623za2j448bo',
                party: 'btbqpeheuzlm9uz0q2rtch85u6r4kihb3sm3qq33juoeg5on25rje934ax193v71d1bzbon347qm1o90ne8cdsjx57w7tzfr1nqy0dx61vw5evu26s7nw1f4qybn42k7pbf45jsfer34wx76722clxyu34hthjwn',
                component: '61rv62i75qdaaubljpa5z17fedhb99wb9g4b6h0q17286bjeyo1uim2mgyvz1msb36lnxufscj8accxhs5rqwaatwln9emadwr2t1g0obefqbcvkckp7ppi60j437evzsr3uaaepy45edjx3cxzi4iy3rhnh3en6',
                interfaceName: 'svf8jsllx14lw6rf3zqnikttkywl2y3r1ad4ny1wnqkz1991tq7bet3qyt7oz5usdhf9wks1tmftqt725r1bgz7h3zh59t07v3v11ntl683tiuik8hk3ymuw2h4xi6ysvl36s85mr334khxli8plk9ioc4rzvbd3',
                interfaceNamespace: '0pgpmkxexfm8orlrc9b4ldgzkwsg7zw8xdzezfh1qa2w1ja9y0sk2rqxdiedqstrqr5wlqphufl153295z6pg8s3ui4kw6wfdarbusw6sk678wrvw2b8ihjzfynzrh76965pleku526z9mf3s64bzw6q3l5wrg21',
                iflowName: 'rfk05ahkfi6x11i4wjtb9zu0p0fa3218fmhm3611vbkrnxmyhcpdh39x39ipeah0mpz2bxt7sal73un9e6xmeqm5gq92qoavpmqeic2k724m3g4und71gw3fm54jrygr2uo4xg9pmjxtq3lfhnvwb91xwc21s0ug',
                responsibleUserAccount: 'o3971nv2nibz5cd4gyjd',
                lastChangeUserAccount: '9d5sgf34lwaam7zycbzc',
                lastChangedAt: '2020-07-31 11:37:36',
                folderPath: 'zmsrsdpnwyp84ao5dyydis5jra3ele60qeydg32nsi1mss1lbqxojmoppsg5t0lpe7gzq3itndwr8kmt19x2ucf5gxpdna7tkz1j58h12f4ozesmjseistd8t76cdqbj0swtpksh4f20x414oaw2cwpycwokr12x1d7tqbq877m22a5maucq61m7858jgl6jt6x4933lb47oxrxv5x6va14dgir2dvconpdb21w8j7mu7qrjopy7f90d54dhjrf',
                description: 'ut58yhrmwdqdro3a64amamrra5edb5n038qjr5lgp77in6zlmgn2ty4sp0hg0sv6cpguhzxs4i85aiiriqmxcnp84xe64ynqpkkknvi17a07ljc519n5djt22yvc6njpnpu16gf1n54fabknoj3y8jp7p0pas0g7lsje9dzmb0xisfr0hjdlenckklkitnpfzpbwtw2e74j9woylzs3y3o6nqkf2spoibcscmn5hdwy62b1kvxqcq4n7lpiiuex',
                application: '1r07vm6ttiv9okkco5bnbi6uug2dpipv5t8tvedea2glifjadimbnowhuimh',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: null,
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'pi5ihn65ajj3rdw55bvkdgroc7qjeafqfvwdpc6ywtwvj406w8',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'cf4pmhqbhma1rw1dm2wr',
                version: 'jstbv7t4mftwlmh4ekic',
                scenario: 'l1f3ne23loaw06x3iwrmczu3cwvbyer90ofj0ixv764fb0d4cug2fj477m5l',
                party: 'ouzsx8mnvdnn2t5vl03idxqb1c57y0y440vxnov2pcq8u7xhtzc6poblg6govrhlxlu7qeaw25he85tvmcfyluh9wgfjnyr3v3sj3uhs7c0n9gglltnzt8449lfgk656zwvh41269cdmn68lvwdgmhvphzg52ln6',
                component: 'tiyylxukib473zyt7iy4r7dfn2ptao2lkprz00vni7kmve06ivcjtkagb1yy9lgdmnr9pwb0t0o1n6ui5jqg3ddfuona54tneqtir723lp2cpqrizq0x4vj2q98p4ny00kkqij156k10tjeyl2s254hr04wl6msf',
                interfaceName: '6iah1yd74dks4homrbtz3oabetzcfrfcsxgc730hyz4pz3gllk2f3camlnfeyg43yvfrmu4gdugdt4aptn2t07ei4cb881uok7j1ixsrl7rw8fk8n3i2fvvhpzo3sav5xmr5fvteuj7c3p9iiiiajkh9fmp9qzr0',
                interfaceNamespace: '8utp4hxjzkcq69g3rscxzwefdo77ngic3yj9t096vgby8kt7xfj3cyh2grm68fijm6og2qah2s53jhz2ypd09c8cxy9r8mkd8et5xwyms8xemgsf0wmgmb9k13cvkihgp9pp1c7ppfhbn2c44fhtxb9vlni8zasi',
                iflowName: 'z1e0zwb6vycdav0ftuvwsl5zz8izu6qu8jygawb5yp7eq731dwzsniype5xq2b6xp8bc8zls69cpakoujnp8an2u5ub4v906bny0mk1pimuzfanisxm4yumkiea65161m3rdcqc0tgvfoy4950tvcmf8c67s43ef',
                responsibleUserAccount: 'sb4jxvha39mul888vezy',
                lastChangeUserAccount: 'smewabf52fhhcy9mudve',
                lastChangedAt: '2020-07-30 22:05:40',
                folderPath: 'f2fyw6oei68y7dxpbbf8lzqs6l26cfr8qxnb8aa0yzs2rjgf6fmk5bla8cpenyqgybzc06bokg5evrkc6f0ha9x8npnmkyu0eh28w8cayhas6fl8bh79z7mvcffz0igyzsh8vc8jnsv5yoviepo6zi6utdn508qofzd7h5yzcqy8sfp1ea08kgx9ezjwrviba0f36d8e7n65m8neu9g19ixwajjoc7ol6h7hnu4rphxmumdodmfytbpzxxjwok8',
                description: 'wu3c8h537yajhi0na8eoirtg3ub5ejq1m1plsoh0mhrpltvro7wm96irbu29a2243c4sv6dtj1r4tghyo2f0rcp9fif2x4oh492j9im2wb8224oyixdh6pxz85ayyggeegbx5w6bm7lhv2h70tx9jcvzt1gxmnc90z55cj509fcddrg94ddc0vks884l0mpmsd93drj0jomcfnic0i8wl4jnnfrachnlxg0z16mxmn98s6xr7m626cfv3ob7hu0',
                application: '8m5myvsgyv8opl3lm9a6plnmtam54g2yoikmjs68bnu75t847quhreyr899w',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '5wk68fpjhji8u473g8p3crz3zukn40xe3s2ofljnvglicbs81q',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'j5qo38liod6tls0hq5ev',
                version: 'ooyg8g5e43w9wvof5qw8',
                scenario: 'wclxjwjg47mshdpeul20uyp09cqgwy19b7vwb1tzi44fnrmijek14pzb6dm4',
                party: 's5a34dsbosp5e67t6ubdmdr4dzv5rcgf3qeawf3c0eayd8s2txlebc1i4gjlk88rxnuk73z7yv309u3hsbhe9gddbpmeweh71yy743psh053v75jod4mygd3gyla17r8rlhpqz1eb3ngbliuzzvds54bfh6iyohg',
                component: 'sechfi71lfek6mzqxn6ngjl7cmos3c46wayujanal63wg0mq7l60u3e18ebodfvryz8tqpppq6o8b0htbhbftye2gabcv2dip7jcc975whe7rafe7osp8m2ful7gs38dfk78sutf6c8gqun53l7bjcr4rfv1ei0m',
                interfaceName: '7m9zjjtq967tva06ygq7lmucp15ugaf9fa2bhj4qppg1r7dnj27vh0ena1mah0c3jbdmcjcgb00mnlbiki0jy89pbm7dgy433bl2spl79u735wfb2go5qmooszu91wsxwdzmgeg7jenuhaw1wbcf9ohxzmqt1482',
                interfaceNamespace: '1zyvzzwz02satmgyf312pywg0vu7ps79hxmjm2a6dtzbf4m72xqdbrzkc6iz9hfdqdcaom158t7apuo7w71gvfqsytpbj9cakrnlz36tvn572xjrmrmf1viizduqvu0hty6eodrjjb9dug2bslr6wvvcwfvol63s',
                iflowName: 'lok2glzrj65u5clah4riw7ac4ry59y3ypg0bzt56imxbyyf3zh2uupk2kkj2zdrnqewhlf47arltt4yab8wsuzp2ls8rw5notkuejthggvkkcrjy3yf8vc72t7rqm9o2gd5oadka0yalp3m3i2851gkracy91d72',
                responsibleUserAccount: '1xqlaqfja2u92aer2m1s',
                lastChangeUserAccount: 'w5l3t95e5u4viqxilhao',
                lastChangedAt: '2020-07-31 00:13:29',
                folderPath: 'rb0k8al4f2w4khal1ss1vbkzs5inej2qxk8l6k1134o67fws5zttaudwh2ai4nccdy4h6x4jkwmrgh245puaj4boja2ff4moxisiehsn0p96yxw71i3i5jnvcnd10ajna4nibxz6zih35rjpi42i82ff3v5ly29tazotmuv5z33d43444s00p7wsg8l5bpjaypoxln93mhzo0ufagqzsc9zt1xxlecnct1nbeqrrziygeolh7z7juvw3dronrw5',
                description: '0wi0nvx4bnvyh7d132tvok91fu3rm6i3iw8m4e6xy0uahgg1dx2lyxbxnd6d9svr7kq2ay2c1nimo0xzrpa0qwopkzmmpeuw3wr1o93y32sbgzogjqqkvjdrckh9n8gpn19g6rj6fmqpgx6asynqd2af2hx3tdngzla8v9vnwywio0cy178wzipv6gx59oibmuh7orjr10d0vhf9asap3s3hyyr99mk0g73p3tzncibm4ale4lldm6flw2vce74',
                application: 'f6m45m7z607lcycsjvciu4ukq9jksxit4qg1qq6ahptz21363hnnv4vblbri',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 's4vm4perdcblgo9gtr3jwjidvltkhp81mfyqph4e',
                tenantId: null,
                tenantCode: 'nkl70cxshm16j3cpqbdz2o8v80xhaiifgpfkb2jrfyh1rsv83v',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'iv21vrrhs4y4dedq8uww',
                version: 'giiywd1ac6wmf5ylwoy5',
                scenario: 'ha4yhlwbs5af9lmfoyelpf1abwqf8uib5q5czq1hmipyrhlzqne7shbagb37',
                party: 'x8nu10fmsh8951dtz8bs26hvtj2l76eks8luqtowc6ehye6fb11us8xtqget91cb9dp7o3zzfu47bxdfy2dug1tbb1helyt7a3uk4vvuqfrrccv0ddhgnmsvv4iyel0xdgduorvzhjhslxm8nhue78kedzkpiyoz',
                component: 'xmwxoa21kkrihmkxg45u6c1f7ozkiar9ytxn93meubl8g3ukivvsyarcokq2l4xsv9rjo0hew2nqn58fsm6ndqmizfz01l7if94jqxnann289xxzrupyv4th577t8y6badqikkrz8482b4w46pe20hmzpc1iwwvl',
                interfaceName: 'iyzpxi2neenftv1pg7sh0f3y2ut7bo84f2labx5x9c6de9ybgdqv8ow0x4id8q9k7j8qjizjcuj1yjfcgysj0etv0f45vw4huu3gqlthzxm512zutjabyez45cl5j0dw00igvueoehklxybnflv9ubb75t0cev1s',
                interfaceNamespace: '0xxx7i2kk4jn2839ghtqu6yuqqz9n14v4woisy69ughbspgqz71bo43qisdbeayn5ht6i0mdidtsp8s1mpv2dz9kyin5d3v5bxtq2j5310csnjmspxly6xsidao8q4uqrx6h04tlsftadox8lkyotyv3tatukv0z',
                iflowName: 'zum4hphh4kefxoqx7ldkdsja2q3gkldonwktcjdjdqca5bipajnotlc8467dbgl7uaucli9yfz6tey8hr9z25kp67uu6fphu1dwefdix0qo32r9b46y3ybwmp9jzwb378737d4f8ln2it4d4cc3hjrj26higa7km',
                responsibleUserAccount: 'lmijbi7vt318pei91xt0',
                lastChangeUserAccount: 'qv4yf008aa6gtitgbh1h',
                lastChangedAt: '2020-07-30 13:58:03',
                folderPath: '18omab4zdixhkiq5hau25oj04pyg6spnyj9n5i6wr4e50jrjb77r4ssuwfclj8mh772gy72t1iz4enlpmev7mdfmqc0n0d5ubbqddrn8d2rp44vo3134iqrglzt4gmkvmlkyklpkz6c8by96kufy04bccitbtd0796njrugitbsoyvxdfr5fi16awg509orf22j502gzubfpf022ra50kw9wi2c96flstb692wpickp3g4jegzbwstg5o90qzoq',
                description: 'q6l7nc47iiku61qf8cfuuhqjanziz1j3b5d40vs0u4apnv2ebwqyl6kkbsn8x51rup7nsidsjkscll91y19ryfamhg0sjl19lirdsrhh71kxvkgpsfwreq2myr6t135btj30ezmc90xzojltjmxp9ygqynsul7xzinklvkmym7x9xzr3pxsq9uxc0u4ufoon1zm8h226tabrusq1f3tpxfic5iojasem1e2369osbybru7hxdtatdsj97xic7fx',
                application: 'ltwqz2jq0guan434uj7b3bg7s8nyxjwo4fg6tfe4dwxyqy9mqvl3u5lzx2ti',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'vkonxsnbcvp7wj29c6q09b1rigjho4fyrrf4svpp',
                
                tenantCode: 'o58pzxukmswxeoskquj8v960mcx72jwxvx1vw2kqu1sgmq5sm6',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: '0kyx65ygvzjdncwidbrc',
                version: 'pj1pqwojrxab6kxucmge',
                scenario: 'nzj3sgw6x16ua95nfm2eumnf4b8exkwd2ebd2b25fyzmcyiysazwonvzgov3',
                party: '322841yth1uyharejborfe1sb7sr5g2r81e530bzcb6oyfmqqqf183jz2fcud0d1x8epzrjgtxw2k87ovnbgbcgzziwdliwr2zanuc8gqmwjk0mpb5mcix6g4yzqrktr4ee4mklcm7zx1ocogsc4k8ehuqo4jx27',
                component: '3hh2o7mes5bnk2srn3i5l57gezl0j94yeixc75ga18qdtwq8e0ezfjxfqxvz7r3lpynjqorbfvndrt6j8otbwe0gr81vjy2gssz2p9z18oguhc2gnre46hucyhw34yavx04eawu69a5psrmelaqldezmjczle99n',
                interfaceName: 'sptj4cdif5mycwz9gxnmid0vq3im3iki9z5dqr92br6n3qqjq59sr0tpk2wyrd95fciasrrrzhmuwq8axqvb87eigfvnx7ssezxmbkszwxqxt0asiz7bdskzqptakz87qzqx72p6zw616fossrvyrscz6a62r9yz',
                interfaceNamespace: 'ezoy4ciyoktb6xd7mrafm6c78arvkstvqvwjbm7shpczi2gp1mkygkva1fk6u40fbhkaeerdytot5iqqkmc7db71t4pwog4hgy942iw5xn3g9b7cu02nxu5pgfs9wa0umto1kzq5b3oes4pqfujwn7096hl794r4',
                iflowName: 'xg0ezpbnxktemfxi5qxnki99t2lvwieoyr51xhhf8i6q32ph4cnyj3bylmdmyekpgvazmjacpytkk85t6zcqd927uf6k21ty3b0javj745v96ukmxszig9tre3yt7vld8db4t6dz2s3p0rnpqpcifdl303abl4xz',
                responsibleUserAccount: 'u9xclexe1f4i3l0iaqdi',
                lastChangeUserAccount: 'oc156vuu3sjeqtv1wwyc',
                lastChangedAt: '2020-07-31 10:30:01',
                folderPath: 'k29iomdrtyzy5dp4pqf8bemkj24k18bhabyi7869hy8fpvwnhugdm5kh1v0e2gtzwi1x6qbposnvcmlqkibox3eqt8vyc809aofzzpjdfmkswi1jselu48i42xd2pg8prwuohyl84rezvfu4mojxaitjxgvuvsnq35zqk8vd2o3813zdxub19duk0t7mg1lx62m4cpiubg4zel11b1916sriztxb60080edhi4af1syep6jojmlujx3byvxeays',
                description: 'le7cuygpfcx7os9128163fwt8v35hdboxrc6gycvxswwy0yrhl689s5qr5mwxqv6yh63aora82qndzoic3dvsikf1rz8fyc8zrqjvlsmbu289ggrn42wl858lq5gv8xhrqj6vvpvbdequbb490v59v9s1sd707tvtydjokk9pzs10uu6ss8v2cl57fl0fwdt0tn7cnnjon86o1ct6zy8tn5mh6junxs4khluu6xulkxgghrb64okz3r8587zln6',
                application: 'ddtmzkwrfm6a5blulk42k34t9s1f0m1kvx5ykugg5x4969i042kl07haxa0p',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'axbx3ur2caeaqym8c1wc0o1t1lfnt8198ptgl6vx',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: null,
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'zmtonczxlpsmrtwyw5mh',
                version: '6r6lt7qzk2kcvic8dy0v',
                scenario: '77txe5vx4z18lqbuuxxa4ken40cel1t6kd1a4tmex18xgzyo92bi0ksvp5qk',
                party: '6dw8cuimlmtxh7gextubd13ayk6ko2rti1yxv7du0ix3qgqxis277l7p9vd2tkapnouczkb0t52wr1h4pyombn9ofwjva3d00ufojvlgvo5uvptgdtkva9upiw4eauhbekm6b86pbx7bt7anju19x5ibkae49q9u',
                component: '2qv3bu6we74dvufstckwb9svhzzlvc1k69ienowzvmiv0fy4c21orek0rqr233xyu5n3eraqqzkv7vunm4zvzmgrmg7dbmwpafimh4jux0pn6m1esr06kb1ruc5o959iyzweg228l1cl2cvaur3wfp7hf391upw0',
                interfaceName: '5swzp2zdxruer6nzkf3di3y2p3b2py9lh76akfrf3zrbotznck202rl7jnmggy98roa75dg03bq4tiybpj47yxekcqzxm8u387aqbwdt2e54ggzxua9v5b1hs45b8hzojb0n760ieg208rqdgtam0eh3jhs9su5e',
                interfaceNamespace: 'twybc4uuxnz41dyz5vf3ntkceqaxjqgc4b40bu4owok1t76ds2ivpvcknbh6zckgr7sh0ocp048wg1u62lv2zo4be7v915zcp8douvvwgwxi1an7ti85qdrm7hyj9piruhjc1jywnbb5zn7sgvaitq9y4hlzvp2t',
                iflowName: 'bqc0fg1nunwze6tuu92xz3cck11yt3aew5gcy635fbe2azgsvsjlnzq2nkjqgtwqd1jgbysdwm4i9930gb3pqg6n341y6aqlcd3kh2vkzj3knifm9djiunb1dowtf8432rqkl1axh3iyu0rec4jmpy5p2f4dmucc',
                responsibleUserAccount: 'pabqs9ccyrticec2bc40',
                lastChangeUserAccount: '6nzsln57oli9l8f9c1zd',
                lastChangedAt: '2020-07-30 20:02:22',
                folderPath: 'tl1uicg2iuexbutbpeuxzmf8j7w9bfe999yrjqnrridfbmc4b3rz536cmgi7ivxo93u0smtd1s2ng8xya2mwbi7kr3eyr6z4je8jnb7x77u585x6auufv91lwlf9n8c5h25x5rsk36d22jk8rpg7v1zjnw8wesjq3csf73wobf54pn3zrf65ls7w7uhg74abms32cgjnk193q02tusizcjlycpe1yqimw7izv4fh8a1qzpels0x6prct1ezs0a7',
                description: 'ay1u0c09pzc8v37zxyu0tzmjroql3yeug5ndh28rdmbc1jreshg4d5l7vvmhz1b6zscym0sz7nhx8sgalt0zxd21xk2dybz84wmw92et0kezyxjm7ze2644r18w4j6dk5tsfwc9yjn0ws2xw3b6i3bp4q6lk0sttc87c8dgdxqppdofff019jl3s6b36110hphicpn7whcz748ssu30ipti4axhs71ls7dgmfe0qcfnlg8lyzkctzjgx775zjlm',
                application: 'nwlsfte3v42omre0fiw94iyx33ufc57hpbtaoahdunt5hhhgl1wafyhb3tls',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'qur2re753p625pphbdgait2osmysepy2b778fz0n',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'jy2bkffutvw2nhwlqzg3',
                version: 'hdxnkgrilwhzgacly0fi',
                scenario: 'ad2abkk30hge2smgk8leck705jt99s1azhtjtshu24ytcwc86yjn1afvkp6m',
                party: 's10wda6ayg9h0r59j5cz6zs021l555wkcitol2x69orieslk3or4yh1fcyk4and5t0n37ttm8qivhdwl13odybczlo4kvv50fpk03rubjiciq29wug9ecac41bnumnogbn1u6crk8m7gpr1disopelaukhdnucwa',
                component: 'i4k9yu86qb64ty225snn839bzofwn6jpcu1gbqpkvu6vmswa4go9towna4qp6ordeymbevpi19gxuqmwzruuuz4gd6hvd8894qyxn9r8dfjf6vpk68nxu1tx4akh6nomba3iuni98u2ond7tyidp88igo838vj10',
                interfaceName: 'f5eutwpyc7epk0rpb0i5wvegg5vnp84mq6j1k2o1jf5asvh6hz9rtstnpcmcwk3hkm05bwkyl2q1lyi4y877gk1z2yr22cef24ymij84sdy343nit4u56mlchpvecnvcgsq3qwiizy0hi3icw5ygnutnwwhys92n',
                interfaceNamespace: '57y7krp44zuble638q52nltwsut6t5r1c8i73t6bx1bj5c6i9r783e4e5yu7eabhix4nwld2w4ptmyjs2c4jmeo623frk8v7sshl6s31ybxlygxbzssqiwg90roz2u9vqkqzklepyimqlljgb75d0mjpm99xyygl',
                iflowName: 'ybe7p09lwzhmfcf7wowygzsxoo91s8i48rsd1ozw6ztzd5r8umtl1hks1ckr3fuqteszl9sipcs5nuzyidu7303wn0r052i1pvmu10lhqtiqvmcweb6icgch8ztbug9hatgqpkw3hv3jo4ipol8xyl2s0amhmn3y',
                responsibleUserAccount: 'x3g8xkqv9zcy7j420m9a',
                lastChangeUserAccount: '9n52khw5o0xxoru21iy5',
                lastChangedAt: '2020-07-30 22:31:53',
                folderPath: 'd0wa9gr7ku6rkpqvz20knd7dlyx5bcdi8emdhp93yu8eobran9qo2zmtds4ro0p219rc0ni6oawn9xnc8sucwf4n3zw8mbpnw1bfdxhc9o1wmayt0mky70praes9ypq6fq3lwc50y3ijobml7qc1k0s78njlbl8z3gojyo9syegx2w8pcd27g49u1gohx6vnm0yxeqiksf7oai7dxk9rgusqo1s4s7thsrz0xzp0lva2ndy82i2j594ybhkeujt',
                description: 'lin1bkl711xkzcjjgxlka29aqghvgk6kc517jf740f255plo1smkrmie6beyxmh08xjbapt9x5jn5uidyhosra1vuo36yh962hbnel271m8mvnjat40jzd021v1445my3zt5eqzcvn2fnl4cncfxbvmo9ozisp4ip009zxnr9kxrnfwndjmjux0em42gcnrm9ddt3pj4tjc09to7va4pparlpkj3s7hhga6106vt8cfck1ck1zd6vca06cwpfjz',
                application: 'a9icqqo4yg98l7gfza6o74170lkzavlmizzm4wxfa3flu682iusb17bs2al6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'dx2a9ijfw0n4etiok5pwalvezjtjosfxdq7i8vxc',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '7r02nr5o42vqql6tszlqseoctjhwcgg8gj3t5qb7spic4bkfsg',
                systemId: null,
                systemName: 'ybxak4n3gd90lrtb6apm',
                version: 'i4kw5ryr7vy8bu1tszmn',
                scenario: 'rwf1h8pnncoxzz8vxxtlxrf43swxqjjsg6cq4u8z7cvczg798m6cv3nzka1a',
                party: '6745wwla0j0iujvmqewio3vurh61rfx1a0pp9om7ek4zop081ley4aoem7ycgnlxe4g8qeyg03yyafapme2ag7k9c6e933a3quubqxbpi10ktpdal7oilssygujpwn9jb5rzrt2103uqcoq8wr657qsxxmeyr4z9',
                component: 'egvapfvvyte5xzgbkepyckjvyalhs6kk0o6f9idugjp3vj3ho0fe9d0smrnif683jk140gnsp2jjdq2mn7rpu1sj44h40okrmltyxfpvyeazwyhkp6sk281yzd08lhw59uvjt550dq3pzzogw59qu5t78sctsvbr',
                interfaceName: 'bne78fnt830dp1jnaoxhddktwuloncm0phl0mhqmd3zb6hbndzgc3z6hx3sw75omr6x9pnklwdw9iksaote6e71xdco8d57dun3gh3fdh8yl0zmas1oqnm6x4fjycsnkl4haoxutco4928h20o1sqj7w67d6s0vq',
                interfaceNamespace: 'na5p4q4xkeuisrx90byqmgg9ypcb0wbj8sxsdvy0kdndxr9uviakbfxk5o5wbdmvg1a7asbyd9by8xiqgq2g14hwz870nk3kkl7j00b2eh32kn8zqaok0vvfhc5s89932ckc1ntcy8ei99oc073251u4du3v8r7i',
                iflowName: '5cv883a9hchntmayhfsjjbrev4csvx309kl64cplx03xwz6somx828y4otx0nrrtefp4j45zoj8ut6lj2a1nbfbjecbb8madeyizg6qxdgh6uuhcchc0venb7cpomfvw8w3bj03i0w6g3zm62ksh4wzzdt3jcx70',
                responsibleUserAccount: 'v44b9aabcbwt5liqhdru',
                lastChangeUserAccount: 'wa66sstkn6mxk6denlgl',
                lastChangedAt: '2020-07-30 15:16:48',
                folderPath: 'x5qqgytqe7hb241zs9zt1xsstcxamnw8u5sv3q60ewfe4uqgdr4y2m6bipsaohuolq7sbpbd9x8ry9gtz4qlxymltdt0rvd3n155rjpq2m0fr3zdloyfpb3ynwje2549xjtb1op58hhh4gn4r4h9o50xvsiiz4p0nk2vnmo957xxjytdk0zny56ic7p2gsyy1ghzbjsx4pldjggezwgm1rwgt4egcotg4mljtxhof197du8ec45fukey7shmeo5',
                description: '0hmycaom1t6yrshzlnzd5ib74xlqeku6imshpv3nc4exyo2jb62ptnl9fsfbduq7d7o8emetnj5ubm4dhjwf32pskso0etj4evbxn99xzb7368tp6gc638i1ctfvh8h532uooqviotxiwv7mga0pqjr6midlegkyr4vvd9vzdnmhrbd95ydrvqlzktqogx4uiolwiin3hnr9432h6i2bnbrcvwqbbnkb6c2jrjkmzunta75sx9yrfbqwqzro77m',
                application: 'thuvrjmxor6tw75hwrnegme0nfnzjeeniban1d5n5zk9gr9blbtu9xotu632',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'kriagb0e26bkve1h3gcj2wj26kgy3m23iksm6616',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '7m2asnm2fzl86vcynv1mqcv5a4l0znv87os16uygzyfdhkdjvj',
                
                systemName: 'bjwn3h5r1xdkbeb2rh7o',
                version: '6ifwcjm4peoibcrucept',
                scenario: 'c0ck73p3eqs5wz3k4rkhxv9zmdp3kg23ay1x9tzcp9ilgsu9x7w8qnmc76tg',
                party: '4o5az1yebjmnina5qjg72660ts99wsls9pcu95mgfleslu2beo5vkcdfftrn0tlvyn9zaxyxnktbxy30ownlx0xdffqz5rjxomnal4qt7qnbnc4s4325ko08qnhgc5i39dxv8wsp62fk7dz8fj7citele19gi30b',
                component: 'eom1038q8qex1bflxgcrmi268upn35g2qberw5s2t3gklielwds3oa4vfpxbflmp8vu0apbtpf22av47wqv6q4xhtjfqm5v2ajkgqys0jg895f14gkuvhtyi7fhjnav2d6bkv4nj5bt5qrinf7yfu8zuw5uy1e0c',
                interfaceName: 'enyukbcxgo4dn3y05nhr2rbqgur9gyc8qho50lhq36qavjng22m2fdj86ddjsvhwk9kpyf53yuc28ahm099azb53o09n5h7a4kqyjojpody07sryvhsjruihz3bq0okwd9v4gepd35331pu3x1dtv9voipll8ajk',
                interfaceNamespace: '5zvg4bd0n4dtx0isqxbf4zux2z90zqjsife0yg4dc3r7bollrwojqu6cy6akek9muq1gbul7x8x53vore0e8i3g5jthbprgrvypmucikrn4jvm8xinas1u2yidq7uq0lr69j14lv946d8jufjgleu6je8c8mtjw6',
                iflowName: '2fe8za1lql0onxswanoli3ml7bqta0emjg2dr7mrkbjhjd26kfkv6kazbhu1nvzbbhrv6cs2xcxrrtt0niyfkatzoqdf24lvyswb6if8yp75sxoovxd6lea25ojojthuc0it98o3mixd12o6vycfi1gfj2bottsi',
                responsibleUserAccount: '56vv9c1r0366iw69glcw',
                lastChangeUserAccount: 'dau3evi0bpqfkyc6tt4n',
                lastChangedAt: '2020-07-30 22:53:19',
                folderPath: '1fp0lu43e0x17mqcpjgvhmmf1hnsist5b5wj0mo4sx7uwt6xua3htz8dp9ygmqqg89r8k8u60dodttskrqc1bca928yryqljmeaakwb56qjewiv7bz0le0wsiemupw1h0jc0g8ud2bxaoqbq8t5fvjzkd6j930ahwmp7vdzwh2dalyj9xtfn4270dlay921bc1iaqum42jd4h19hbdxrd125zp3gu6xoekgrks2rij57g5dnsg5wd06vo2wq2aw',
                description: 'w2n0n6m7gntmt1w6s3xmhvnzxmy39v3byokqf2gyetf14sy0ewg25w2j6a078eo2ksk2zwbesunl53e0l31kxynpixn3wzls4t0ycqa75w9ec4gcnowj07sgixcoilq7ze3r9gcefy4dec2q6j14xsdc25bog5c6vjjgbq28pjbizwnb472dgovocpg3gf4psemtrsl36wy1ccnhm8vtemlgswk8udk6oem7rx6s11cpbpaw9x156bfig6gi5m8',
                application: '1nuulql6tr7y5h2551vpx1qvgcwbdognag0hs857kv72w0wjqng22anme8fp',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: '91fotm5uu2redjgwt62h6butoj0r2ho7io3q6t78',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '05gyqeynr3ihemz5frfbta521zdzzoattt2umxl6t9bzezqk26',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: null,
                version: 'awstspdvf2y5vvjsk61g',
                scenario: 'thtvc3rpxk7fc5lu2d2u9vh14a3vz74d71yibwherokbjfw2uhwqzrm4zmmv',
                party: '3g3tkti4xxfx1hsn5qdba2gupuhwlhcuqtov5ooh4jbz87ky0qjrfrfc6llyz7lu1g005ltbj0bmesnl3yk4brm8szeqcsbivz1dp65wcgrwl61zwn5csk0s00dt4k482f0xglrp4obzcz41skn9wi9wmbf1nts6',
                component: 'k439eg6usujmtoml4vgtd03pm4dyssbiedw9wbs3wxn1l2h70tubpx67f2cxm8y41zeyqsvbz5nuvcn2nqekmd1fx4eo58v9qqacbtldnyy1djytrfbu1250ywqge6836ow470ylrhhvdpgudazufezsa4ejyvfi',
                interfaceName: 'dxp2u0i5gtbio8fcxbmr6g3jsek9bglm0zlo3aao6t5x6a3jktczwjtepl6h5czag4gwyxx9cy5bztbl6i5i4fc3haevx1u02tja0pzta1ew0etemg7ao7q73fg0f8v04ubk9h78qwfp78dcw635eqblfc4slg5p',
                interfaceNamespace: 'lmmyzce0pag1i0osyzds9p19y8jnkdlth5vjfih6efnces5q2jnzlm430u60ml8mfooy84r9q0msn5mhph5it3mt0j5kbg8rzn4f1pdat8c11b8pc7er2xr7aq27xgdyurkzyygwulepgqqjvvhlvpnppog3v295',
                iflowName: '2r98a8vclmoqwjyablqpfy5esip4rris9i1ovxynubggxvqv0k97j07rp6dl5r64g6tn3juwudjwz001czchihqzc4ekgxpwhupg8vxg0rvosm4rawvpc27f81sqlhvwm78q0vajey2w6wdvdpus9vurd2lnntus',
                responsibleUserAccount: '62aphgzscn2obij9mdp5',
                lastChangeUserAccount: 'ml8rzrzwx94mlw0tphfh',
                lastChangedAt: '2020-07-31 13:45:03',
                folderPath: 'u6jx4k6pjarp4ybekq9l3t4s8ee0w1r57qdr4uhst84zr5ktr6mnal3szbunbnj4snpbjpa7njxnfn1en55wprpmb8a1bplst5oz6mjpxzzouyawnp2gu1dfsifs2f4hbmpqmok3iq6quy4fc866b0xryi1euai1imtjfgppjj4ovgqe1cqin96eaaxv04xcujckq8dj3sbmoswi00mrmtsb5tyxa7jzdr00iwhsuo85e793i9pzfk29qfn048i',
                description: 'qwt98ehohx39eehyxoxh41hw3rrjxetx7g4sp94efivtpkbqcarduy4vds5o3zwibxyf0xhoboj3xt0f3dyqbe5farzexxftbvdvzja91sgfeibiok6iiu1eeyepn6klugv6cvcry6v8rjcjapt8nxcrtfyfxsnlm0jxpq74ud05ih01movbmikafnmo5m61cadsipg9cdzrhdjmha1t8tnlhbdzmbnjfwwjy9azoh9jy4cs63z0dk4pluebekc',
                application: 'bdfnxozulisyv90mzp8znl8immjxrgoas2uq8zhf04kdowxx33pw0kjhtsi4',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'i13in5l273l2idosl7rm4o4iyysj4zm0wxu62ko1',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '3qk6krrl4hl5s4vq4uya02ekheh4amlohen8wl7iz2owibzzks',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                
                version: 'a168yfk39c844se2vaym',
                scenario: 'hler8hgeeocids3eqze1q1axrn4cerciztn4spsyh3lla5rqh1y1hz7rk0lt',
                party: '9ujbtte17cxnde0khz1s7umi5onls2s75rhxessljhkfyl9lx135mgc08gnql70z1c772k0qa2ii02ywb3szuka8n9vmrq4klbcjc7ych3c1rrocs0a1siyyq57rbhl7a47mil961aeh5vavqfs08t5gs907pkbm',
                component: '5z722xu6uqtaf6wa5ido9srm49qb6y3vzoj3jr1hsunu8svp5x5dl6x2ek8iw16gbkcuohq6ylam93f292ig129qn2g2ly2yhmawsdsx0fo7thq7v7egtrkzqgcmubsmmx993xde1j6zg8g430c7jibj17agpq35',
                interfaceName: 'wzh01rjj7ce92uzitqztxiseu8w6850arxq513k2fyh8mwygvl9vjfvo1u1nl6eam2xebgtru0z4exrkxxcndnmmxio0hiqzd05v3e3mi6jl7j4pdr2vn29ri2qeqvi5zie5daejbp666fbpi720kf4uen6bfad6',
                interfaceNamespace: 'n4kabo57fkp0rwj0lsv1wjjet2hj1si010ausmqyle7mbh2n8vxz3ufzlo6f2hzlgrr9g61t54isch43w54f3mee4mqlsn97l9wm8i3du1oc5el99ntcq7p2m8zhhgfo7acn8kz7gyhewrber7slsmm9i3gwmye6',
                iflowName: '9n1dx9g13kdx55iy3spar3yvnsnrt5s92fw7w6dx9hyoab4qgvlvx0np4qgdu5geo5mhuwyfp6qhe15tb2al9zzcdwisvx247pi5ic8nlc8yfp0wxr0tdlwzasu4ysftwcj7pk5cird6jejordodtmxabjwu3i50',
                responsibleUserAccount: '836dn2dvrnef674iq294',
                lastChangeUserAccount: 'a99e8o9x4e4ut501stq3',
                lastChangedAt: '2020-07-31 03:12:56',
                folderPath: 'axd7g7d0d4qt2u4g8ty8g3uwf3jpjr5orr7zugmrbci2lhuqjdzci48tlq1n1hd5zz6fk3qnsj3ncr72khva2zyi3pp5b906hbry1r9wpi1u78op6hy7759p44td78q5q119f24k8yzol5hh9sogwbpjgpvage2urp4sbsrnkhat35wxqy6x5yxgdmczkh6h4cnluuk62bygddczmo7frn44jrdzsmm411ycy3ws5337vnrotkgck52607vak8w',
                description: 'nr8d85fzqtaghwnqhcohtsoo0b0467smocrwuwpvq9o0i589c2pn497zx7b165b09i1rfxb52wjcbmtfnqkkt0tt28am6vi84mhcx3iprtm2tsd9d9ceiae0aetbmrcwm608c1x7zs8giiukylrubtd0nrnnvnatsc1lpl628q8uf931ks2d5zsrk8etdmhdkao6ebjh5v4ljwi93rst2g17tn0yr9v0wu9ys2vkdoim7k2en8s8y9zzf1okw9r',
                application: 'uq8bjw17el4qir6gbudsqyv5qn3z3mzsur7bdynft0t43qrz7acy09udls10',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: '5ohw92uckee0p1fr5ttscdl7xi0xwqrui9nnhukp',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'lpqu953bgp1tt1q1ot1sor69l2uyat2gyxkszel03cd5aiuenx',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'kc2qyfj08ul4mhr0re7s',
                version: null,
                scenario: '6mgy7r9pc9qu3pykxq1ydw1g6hpdadxpwdcx7680dzmytcif72z9cnyv8q3p',
                party: 'uwdeu2m17dalyr7wn61mqsydk1zeabwzy6vi616lm9g5jl5jbft9krhs51v8kdcwvrlusmxx5he52d9370sgg1p7bfb9x5hixw4ew7pprni1bi195it07p3w57ppc9wdapatev3zn2uzb6z2bpqv480qolfvti5r',
                component: 'k0a0n39oo72wselnj3vwxpw6lohznyc01zu27gz26o58kha0jw1n5th6yi2hpblv686cg0h2u4ibfkz7i1t7gtl184gxbija2qzbbvmuobdrv0cgmunpprc7q7dq63kyo7f3iw865t7wwznzrfy6hgn5nxk4a7b2',
                interfaceName: 'e58skfuigp7pymcu8hlif8biyufnl49aw3q34mwm4blexd8ohrld6t7p1rmi77o4tqc9ipsm7psn0puse07vlj2tsaaosd050dgekfq00ej7o21blgkinh33eoo5omc1ucqhnt8euuauegdq3jwrtcjsxo0zkps5',
                interfaceNamespace: '76earrvtyzcmmy9kgekplk121b9indxg89mzfjs9styvna3wvvjrldaaz82nap05dx2shc92v8wf428lqzj7u2scj9yv06loem8g361wr7fdm4lf7jvxgiv92pk69rpfkrk3kff23mkqxknpq7h3gz01r6zoek4n',
                iflowName: 'pokh30bgnugzkxab2upc4p862eynaw1j5egxg6s05jcyc7myimo96u8xk5ysi41rmovpnhhe68qw7cod8ymampzi6r497jn826937t4i9pv7qd23o7599y0hg42jv7aqjq0egbfl1oyqef3pbav856fcqh2mh27l',
                responsibleUserAccount: 'sdfytfrbgr2wteegfa7p',
                lastChangeUserAccount: 'hy9eg7a3sepxpn50fasv',
                lastChangedAt: '2020-07-30 18:45:57',
                folderPath: '289kszloh02lfbf76aug32kiqxmathsyspqy8er1pke5jmytudqkwaqe6joeg82g2osu1c0zpywds2oz1u3utnokdmruxkscewehxrdlier22c0bdkswivb69snn9nke71ytzl8tc1fy6n0u94lp94n8xea5tm48c1h504ei728k7b9y51xkj88rntipenual4cz3a987aj5zc0v8f5tm77jal4vofz9pebzf8pzycdqofmz559ggceukzoo7sm',
                description: 'lb6zmyqvcfk0my5b8fhnh0x7yaa6egpq35pwyztm0w7burirsdur2hn4gez31e890etne3z9zypq2a8xevlg0rbbjd1l19isupgamz05wnf4fkgwh9viqcb8wuqbj8yrdiih5fms5mjhxii3vuqqo4jn5cpui9jkip6hxr2l8j1p8kwfg3mphb4n83eww15j1whabezyhyvrsrg2streq37a4cbfjjr2nmbuqk7u0g0efhnndy3cr6ns66gbv57',
                application: '2vnw0aihlhv5p2z9lv1wrseqbes7la0sn06z3g0y2i34qs5nj8jopjyo9h8a',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'usymbsz08vu1cmn7h7gpsdw82kl7yopjywbrh1r3',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '6tlnduzfyo9iorqxn6plurc79btiomtrepinw93d0zlaocuaa2',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'r6yfwvmrnlyqkkxo2usv',
                
                scenario: '7l9fv9fystwhd23mw9k9n8mss3gxa3sxcmly6quvtqj2e595uuf7ga7lnb3t',
                party: 't0xsms7o0i0p5nt5ruu3fygho2l73v4ujftx9zq2yn8sommv58ms2v9hjssvd8hthju8147q0wqannyd71cjyz2rly9jwao9pladvadg3pnwg6bwka6hbuqdeknns5u5ut5ivgfy5hqo67z5r6otk31zixpfssjc',
                component: '2qqsqz916md9kveajng1taylcoaida1q9xf07cgwlvt1t4kram0ftiarrwewrh2ctm1qc3h1wpx7p45rjvc07ne2bvzqi7ktuj3iqv59mcqlr5xi0xftlue9plk6r0ib2yi8d83g8ck78f0y74sym1uigjafqzt5',
                interfaceName: 'ollsf7wdy8fj9yxi269wjkeoesdd3imk8v65pg4zwatucd32syi8qlysqburqc43v6lzqe9i75eeqop1e3zdckrfuwnqi266117wqm0tm5i4rcgxjqxeno9y0g6xsaj4pjdd5877us8ghpnowoupw0ebgm30vm2m',
                interfaceNamespace: 'e6xpqvlwxtkp1wrbho3azr51kpihpb0ublhfadukypiqfmvs1a5u96izbqx0cn8d7gxmcimxqmiluqsjbq1s3v56y0q7sbmgslocs7p6etjsnaugkr2fcrts6dvdz5rhvzdyizztnd0kr6pvpue20fduuentgft1',
                iflowName: '01h90icirdbzm30ef020oqrapcefp6uzz2c25sre0ulenmvvhlh515bfeirj2cbsom5qz1v1fjcpcso2i4xqdyr2cj55hw88x89j3eo67tlzhhy0pjk0y8yqnxb5zjeoqnbqi97kb6jumx8iud6xtlkof8c9reoe',
                responsibleUserAccount: '5h0whd17dc562wzaqrch',
                lastChangeUserAccount: 'm4tl1o3ygea7x9aufvrc',
                lastChangedAt: '2020-07-31 03:18:45',
                folderPath: 'gzod5nfhqtkqhjbueumdork10d1dqq8dvvty70vr8sjvk9f7qg5kjet2t4f6b9hzxhg7ksskraniqjzheovib2tnvrdmtgn9gjxaadjy0qxgvvmj2b4u41lyd6g5webkiyypc1np61zr8l7pykdbf8auke5iub8vyyeca1wt9w2wn7cuwjuims0drpbm9n9z4nuagatxhcohl11b88a87ix8ul2rq4la2t3h73pgszxpjol841vqa9fpud9t5wb',
                description: '1solwy5xwlkpc6iyh43wfk67itnvhvgqkhdyclugj0dke59bnuwj1kkwo15wrekoxlnn3zzh2so7af6ebzha3nvmalak931dzh2ee511tz05u6vvw6qf9q8ax2988a6pee2xwklg981dtugshtrt2n6syun1l9dig282mogwq8qur9rz9pggxalykee5f03me9b9zuhbps99lrtp0ju347y64os3e4sxgatz8mwff6cz1gpopjw6zy8y05ntdae',
                application: 'dy2croycrj95gmj3gdbeo8cbxy8iaewek7i8mxdh9onkpioogr36v9bilkxl',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'wgn2775u0dq7cdzof0bncbvm1cdxsfhi5k7rl8bk',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'bjc0lg1mtaypr9sl3tu54l5tk1k7cwdu3ee6tvsuxuv4xttwwy',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'dfzt5iqdufkt03nyuzos',
                version: 'q3kv2xzq4jetravovjst',
                scenario: 'ifuqzko8po6lrvbaozs5g73ebigxii9ck98yuow7a6ac97lu049zjo8qp5u9',
                party: 'cevcu9v4tj8yrxda8584p628bgl82pfh6dpw6yk3bfnyi9nxf46a8jowbsegep1pwnqy6ts9zjiip37ooaw42qi5qj6ye5ujgh4h8n28j2d46n1y4st8ls0a6s9e9aus60w5x2a2igl8ksbt8ttxa86gtiifu46f',
                component: null,
                interfaceName: 'jfq1yzfn5xdblg06w3hqwrl04nnxzrn2ktlavybz68ygyd66is717ine89p35dl7as8gdvt7ws9gipzji9q91i3s7668uvr3mochi1mvarhnfzhayqka5feq9411fwl414specycerg4lxx0e6bp5zd4uwa026xl',
                interfaceNamespace: 'l15npe4f3lqaypa4mcezqyjluh42po0szf6mazz4cx20fftumd4pszdiw6z9bfpz0frl4skuiur9no6deh9xyyhybjmoqwr15lw8ldadktfejipjxn0rkajlomdctzky7bjd3duel0b1o7lk5f3eh11c5rxtt468',
                iflowName: 'hmb38oepgzjukx6w6hm1b31om9fn54dz1engtq5jo9u9yvte3c6c0z89n8xpkmjmiw63uzpm7rbp2fxn6qtu5wzmwmu4dbjnb812t9fesk4xvjtwyx4yylqiq354qo3g7pv3ihcpj0cygvqiqmfuxahfv1f33rr8',
                responsibleUserAccount: 'xcvdb6rwz07swzegmw7e',
                lastChangeUserAccount: '7hl55nm1fvuro2ugwzng',
                lastChangedAt: '2020-07-31 04:18:32',
                folderPath: 'bve20w74zjneyyc8abbbk4rx8tj5nfqua53x0kmcz1b4c2sxp7t2ssuki2ato2hal6umhy57wmytmdeg2me24a2x9f7nu4c5p1af3adw3aaarn4bvw9fve4f3dcfydvb3hqtet2lmcqq0elk7yxybf9dm8wq3adxpikeelsxqfof025z3kpvp9z7boe1j2m005z5szaug7zsl9nq0bzeto366mkwhbqex0nmajw8ys1743wqgu35h4dz5sswlfd',
                description: 'w5r9ce980v2j8bx8v4ihh9sbkgbj3qef6mc5reqyplzwy9oixnwuk0t1zjebztiod1qmyk3glipky6issa3iujemlgw5ere414ydn2w63hqw8o2u4e1qkbpkj2pse4581ptxgqyrw0xfsp6bcryuy11w6d8wt3w0tteji1yq3dmfgxtx30m1gkgys58tb1flrwn6uj783kzvarn0vnawy3omf5lf61sq2uvdporxtwx5zc798nh4lszyqoxys07',
                application: 'lk11r3hgpnba1hu5hg44dymtkc33z5zu7fdqd04c1x2os20y1sxa2q53d6b7',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: '5x2ao98q3dlz18957gfu2pgvof4wh3ia1dywqpr7',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'gafbuyr42l2g5ll4gfz5ztmilkjrx686z12ilj4vjuzc464gv0',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'w8z4swmjl1nefv4xsbe8',
                version: 'n7h7bre3399nw1q3ajgy',
                scenario: '7294uu502wxasozr6r7rkdkhsy97p4doahpmw2ze8i1qu8rymi4bzy9ylo0v',
                party: 'k2b7qf4kwuzkf3sgmrt40ipy2vqbsz5m017wk0n7aq20r2r5rddon766xgckq9njit149f6g0oxfzba5ck99gz36n238sqlrallotle35hnfhd8daiqhqam7fep27uhpbe8jczddmt79tsrkgnl18o7ksewrzopr',
                
                interfaceName: 'za8w1qg0ed6ove6seap0bjd2v88t7cbbedjfu55i3h04yqy5wappmp945a8f0ktk987zgoej8boc023l1e2rlt19tycsrg18ox2tbg8j3p1tkqiq72c2g7178ke4tainodexjzbd5vm3udelm6sc2rqu3hx48izn',
                interfaceNamespace: '3pa9cpg9wf1yacmt71xlz3m495jvniwh77giuy5h81z60ojlzp6081t1t5scy69c3s8pr5v5kapgjhcum2jmi48n8lm8my0tdtp8bbfjcwu6o3rxxdyv7nd7ctcwjnwplq4hcy0yf35gtc5o2q3zj474g8yx8d5y',
                iflowName: 'ibl5xdlg9ntuplqpg101omlgwp3jxw8hj9merv4iqvahabok7brfrsm5j4z5j2yy335uq62nomyz7iv9xea0z7o5cw7vuu24y2ht026e59rkct5fo4gnhb772g58nljf87mkxx47o3l6w14zxxiaid1zo6c51vvy',
                responsibleUserAccount: 'dbzffqu5redj450zxr0s',
                lastChangeUserAccount: 'vu3tf6kysybfvbr1dy5e',
                lastChangedAt: '2020-07-31 07:02:00',
                folderPath: 'dw3tb5kr29vlzet28ilg48h231uttxj1jefzqe9jk7iuceo8nh0ukk7awythyrxhcly8sqb0tdw0tfe4ebuvhvab1y69tcttyijb7xw8ez1o2uhsakpyilgo4f0ibwxrd2j5oath91qykxnrgee2yatbrw7pwcgtxkyr4znbrlcecxha9r4d3c8nxgkz4csv2u9bcu9okgxnwwa17sq9hwtnv27gtv94a8oduhetzf5oh4sx1jh8xm14jnsqabu',
                description: 'jh1tj6jx1m3xtt7p7kayumx1zhjbktyh0imd5n7ildts9keyj128q45z6z0hwpt299h5ol8wo0527v7qe15e8aydnkkx7xr7btlj3xqpkx8504jjoy9cxh59e73vtsgl4fbzp24syfen2j93uorzcv5j6bes5vr3otpmqrz4278qe9jqdnzy9ubpjdofx4eh7ung98ethzkditroiu67sfbeidty6ekiwvsb8fush68gx9zacroqx0u9map59bo',
                application: 'fn4brpj5f052jrnra06w8arklnj880i4mcx1qu5pdqnku070h411xrf8ui4i',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'chdoexdd2fo27ajh2f48li4hsrp8edk2xl7vm3t3',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'a9zt6kmq3jkezsqllzb26rrmbe0wdb2lad0r6slgixv1rpfwee',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'wg30unz96io51bm3hbli',
                version: 'fjbffdkqlpoxn1dfxh56',
                scenario: '6acz8zqacpihtuwe0c2p5epizyyuel2pyasbeo61xjxdel9vs2b227cznfpa',
                party: 'kmkl6x1igiqax8oy5bryo9xgslxv9nrozymsb26htdjs48pvxdsm2ixp5zvslsa24y5lix1il2g8ydy3alobukj50q5f5plm7xnymixaj3rizov5ej8e8zm0owzbc3sfc6ajh52r6hl5aecdwde28asyaj3dqg7i',
                component: 'aebsjuadtxymkjzofqu3cnrne2wkwubljh5qc3nauxz0x2ki5zehk19gyjufey7zfi0pf99oh1e6ilvo6jmimcm96ytxndz8wa4tewz6l3q166zyfraxga8or3azipzdnbrnw9tgf95xeerb7ocz6jxvkjvcsjmj',
                interfaceName: null,
                interfaceNamespace: '0e5j9mw6lcfjftoo8drhqp0xyqwxxzsm1i2abe7xl3c6fpx70msls6p0byq4fzn33a16i0dtn13ed0b8axwwigf2kcuvr7n2y3lr4d2gu32ujnkmay8n9i39dkxg7pan2qmgjlhp83t6rvt2wxxr2gtj1qkqcs35',
                iflowName: '73qi1mi9yxwy2o1qbk1hx7ztvm1xfws1y8owa0udl1erplpjqk0jbgddvilhvch5r9j8ycl59pcqekpw97dhlxfs9b542v9de6woep8epex46purv2aons6xvnvl7cc0kwoeqh821swi5qw44wavsz08vsiaymq9',
                responsibleUserAccount: 'x6o046d7mfyz05uxcj2a',
                lastChangeUserAccount: 'h1tbsxgh7z0sz0ltcxhj',
                lastChangedAt: '2020-07-31 12:55:21',
                folderPath: '42dvjh1dfyynwzvc87f91udgnjbpvxiiwqzfabsicpe6hxj8nwnkot4pjv4ngxhlhxah0f52k7ij231xrojggroprn9b2sxdlu9ysdi11p5zokumh4tmfyy2cud6brkv1ssxzygkbdwvc093u4hrdjprop5362fgdlgn1e7acpryitk57fq79fftepo8w5lwp3nxgm5cfzq89p24y64i1jb71f3z67kd37hshnj9m1k9gdid0yziry7ntyds3gi',
                description: '2j2015izzmieh4m63k30lag6b6p3a9pvc8bh0wqfmqqhn43twgczhql4o735l0fb6pghi1bsg6ps6ngshc7mbplqf1xsowo4yqy24kl3ydwszjtzkm949tpfhnjh2s8yz08u67n519jhm5700zoile5o81bx9gewpsxvm0wdsk097yp1ol4jjnbbg8r87tpblrrfkxczm6avtw8gkvqlz732eyc0jw2picxzsnxjvdsz800bjbvonp3orjikc5a',
                application: '36rcc5w4zxep5aizwyckbnbfdoa85yq9nh0qj7irzvi5wg9ua9vweq1gdp6i',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'vfkfqq3g16r3ovdsm0644s1svuthqgnnkf400tc7',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '87e3a9r36t69n9e0v9y4pkd8lx8jqg7u0z99i68ktzew585zkq',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'uedu6ai2n56lpmhsx2e6',
                version: 'ra4g4yhjh3wzh73f9wco',
                scenario: 's5278e3xxim7uvtq9kw4no2s4w8mnfjrrn4ixd5kyreww0mpd4dmmma6awne',
                party: 'aepxr6qmvhpxwfrdb1ufu9kxxljvfvyijcit1eh5e6z25nikjp7tlram84gsjm8ffozbbiimz3brpsyv7d36s2p9evgf4k9noi5yojuxmszg16atnd34i7ojdpgs1ovimmp0u2jpqeguvqqhf180ipb12ovk6c4o',
                component: 'l9z83we77lit3hdvpl10up27nq8mkwo1elh8uscbldk2fpuml14st8uvh6j9y6az8ecge1tf3bjtu3w65vlavcaypunzbfksdkvgi0emq7le6ifsq4ir5e9lsqdui35gi3d6cj70obmy6g1s49v4vx86ki0b3k8m',
                
                interfaceNamespace: 'c2v0dlzle6h4ql9eumu2hggisaq7h3vptqyn8arrc6fbai8ux90px0292ehdjeie7zx1rt35y8kuclyyc95b54a89fnxc2ozoendm6s5o54lrbqklt5wya9o7siqjeffd11vo107zhp30ec7963h1kcfjoi9xwco',
                iflowName: 'h42q5lkiydr32viu9pyp8jazdh11k4qalvcje4g6yiegk0gggl8gob1l1bssjxc7rk9my94xfdd5g8arqh4s0mdxvdan7xnjzg13zceibcx18cdy6ogl000x5ekikjpe8g181a3odcuwnfksdzy46288p8sqefzz',
                responsibleUserAccount: 'twutnx1qyrom1n0hn5ne',
                lastChangeUserAccount: 'c34rpe45gswfyoex8g66',
                lastChangedAt: '2020-07-31 03:00:29',
                folderPath: '5j2nrwwpcwynisuy5nt2n0lvhyhx7jil3saqn0pic4pxia6fbuj3qi3ilmdf96wvzibcohkd8gqgsupa5w2ptuat6f2yu5wo5rhgv1308bfx2ysp7eiu2dwchogeigwlky7djgfm8ffj2ysr95jsxbkx8j711ronvu6vp4o5tqpbawrp2bx73s2a99e2rp8ay0reo093sk8eoxwe2j3j7ln2izpn4mtkwrx7ynecr4w3tetv84q3isopdi7n1bs',
                description: 'l6an82e0e12f6szbizmwq76lavhu16z4p71x1jj64ffnwalm2axjp4bk9pnu7lfbh294lmsa5aasbwklaskwypq39a5438ghokxy14oppr80no2ve7aeq5ul5w3zwio9skob73g904ubw73ec1kd5w6p5at3956ybwtfzrtjtnuwv9wyadw6fwssev0gj3rstr9q4lylq7yhfj67myx371fimgl8kfcxrpcjbynfg5qipod0q2zeq9hb3ysx8cs',
                application: 'qt8z83ebv7wdsweraqrj4e2bor90f8tve2qdz34vie4vcuka6ryjn2to80m9',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'vryveogyvf5kznk4tqa2flzq5o9he6412iqdzxvd',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'wqr49ue55qjed5t9qxzm70cgqwkvgsioqcfnmcv7axgoq7aloi',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: '80yyr7qy98gj5em1mm5f',
                version: 'r33f5rwv4josoq3n8q50',
                scenario: 'dm4ogp0wnpwcuvx73fl1z3irihczvugdgvx0ttzo670c9p2cbhwf4b54v1j3',
                party: 'e4smo8zh0rltkyz75jovnauizk1jo6ph9qjruv3gs4hswl4figt48w17j8wsrn0uksr322j1shhgjvuln32jx1xh76tmfdonq2624ki6ar59kxf7no2ho3vvbevntvy2h15uojcbg7z4ukk1vazq2bg1qh9t0qsx',
                component: '10fz6tzwmkfuc754u71ikvnjzh4gsj68fk4tg0pfrql7kwf0wu48pv99wqxm9nogiz18cipddx71glsymznkucb9s8yw1sh8urf08phovpdbq2uef3adzgphbu0muogn74mwasc0r14706etjqrlbzw90xtchrv1',
                interfaceName: 'r67wdrcm42prrz1a0h1yzhajsvlvviaocwb1xh8kx1h0tb3n7ybsybitawwd4jx0ym5t623vzg9l1g93h9r3r2fzt07m5fe4z2wc4gs56w59n52rc8q657rpjfiqlfk02jfmgxoyjygn3zg68sqopv4imdzob6tq',
                interfaceNamespace: null,
                iflowName: 'bmx3fkvp9xksgchvz20x6cgmpk4boh35anmsws1fpnp63k7h5lagxtw3fsb05p2z32pb7rl6b6yhhd5gy5vvm0ulgmg3ffprmm6zn5ci6ed07ojrjtyd7j79aou3r62w324hofeu50xu9zt6rkc8rl1rsv8xse4u',
                responsibleUserAccount: 'lb0srjpemunyhpi11j9a',
                lastChangeUserAccount: 'cxca0n7o5i635cpcmyeu',
                lastChangedAt: '2020-07-31 12:47:03',
                folderPath: '88b9lxkku4hwfp8ft82sd0s8mraj93glltzxnrdnwy4i7lr7mf1bbqs1f7rvxxkc0hffazaheljs99l8gupd4q1ptbnlh27h7ovjc1jbopigk1bvxys3d8rw8xq0jtam5dingfrcdo7sr6i43dp5y7gh4twwtz1ovjrtaqnttab5ldfq1kb70o67ueaya634qgn4aex8k81737xew9bsd0vpfg91g91bi753kh0boxd781ch7s1gva9ylndt98z',
                description: '4pyfzxhgppqfk1em7q1ot8gf5p679v4f401l6yh65ac2rzs6cdt0dwbfltpuunq5ovd3pt74q0ghrhhu1z7kskrhilwbyttmzpz26s654cxirayx7w4gje4622fkab471yghb36adatb1w2y8d1equb7768iy82rd1tua6x4z4f5cq5ny75ru4gk0zp9i7kytxu9p9uzlqeoa7b0rh8hgt4qp2vvmtg9g7d0c57iu0yxlrgsow02er1kr9spcpy',
                application: 'rmn9kb6b3isaetgtr9b4r9gdu0628edvnb3phi7qe8vfp42rmkde360x2ibf',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: '6tc23pnhxvmjipfysh8vjsv0vvtz0x6unviu3da5',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '5889u17ackydtshcdnnqbhoq0u336j7bzx3n30j57v1wfiev9w',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'yhjf06bq426frydjx2ch',
                version: 'ptl2fkbfqgj85o65ysr3',
                scenario: '4vopz3of4r62e2n5rl8qwy4outzdtf9jqvz2a4i6eo69b3py7isqrv79umvw',
                party: 'f5oke5chxqaleyyqbnt8q1292cbbky5g672jsi3j9lm8ij8cru4svatbwp9n8ra8mcyxq2dszlpydk5zz0ipap7kptjw252kfjgn5c4etwygul000qjxk945u78iknzv907k47vvt5mkwqu9u0yb1cb0ttaho699',
                component: '7rj43ugjxyq16twrn20aulcvbuwp83a5q8wigiibklsqbbmek5hjp7u2utu7vhv004py4ej4490b5j8eak7da0fe46iwr90yz3f4cf2lksxngevnkyxfx9yi2dyzyyd6v0rz5gpsb48u08u6nrigfrho7f0ij7ap',
                interfaceName: 'djk5rzhlg6lq8g61ntskkedq5f7qel3uec4zicbujislw12p4rhjtcgy8n7kxx06e83a46ptnm3adtyyz9jt6tsvku0y2plpkjfxkmh8wo6o62f1lleom27s8hvxp7zsr1emrxskcjij02pgdkce7qv6x0xndy50',
                
                iflowName: '0cer7c5la9ot5dqpl3vm0de0361tm3vqlturo3ykowgliiobbd3no8y6inzxeanzh1ovzcc99udbxpar4ca2gjev0bdz50784w41b2dhl1n7cdemu1nn34n5q98uedjhyacxv95emzoxbsytqr337sktbx4fy5kq',
                responsibleUserAccount: '98ug915ayg74dgzoz8e0',
                lastChangeUserAccount: '3csopc8dfpn6601ztbeq',
                lastChangedAt: '2020-07-31 11:52:17',
                folderPath: 'fufnk6adshel61gksfjoj7ae3nn7m4lk7uxxy75hzqa6n7isom6t3ypf90c35xh41nf2lf9dxs8tzqxw977p6l75esr9anv67vj45y099k1i6m6mwwui93y84ghwigz2qchmm3mv2we7ef5pfm4o1bq8fiwe95xz5wuic8s2faolp8nq3lu9tmwezhvt4o386aqcp8wnld92bte0drbejo8hs34ilhlgqzfbafissd00kc4npvedlw1eig7hpoc',
                description: '9odzenui5cae1fjwjku3o16s66ncafpyhq0nfeorb5o5tqgb54fnppdn6hy1letyxsdwupjued4n79c4mn6o40c445ium7njicomo30znqn5mi7rbcbel2bus9ptrfsh1ixy1an86n7ab5jin8m3cgkahw7cl1qwyyuyxbbz9nq07sr0v877v8y9iwgt66nn4d8ku74s951weotyzpvo7wsyweesxg44yzcfzmyzi5sty585wabpcd1kh1ibj9g',
                application: 'aot58o8v9zjo791ch9p69eyvw12obft6ujgnaa2hv6th9k04dnwmzlegccea',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'widc5q84h8jbeqyjad4fjsac6xalka75prg2h',
                hash: 'igumknmaajpca6ca78up16mrf5hy9p2vk4mewi16',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'fxptty3uqv6jmql6ijsv9ta5egdw1dyx4cjwhtbw20kp3hqu4x',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: '8e7ibxtrmwz52b1o1203',
                version: 'o09u6400s68mroqvrss1',
                scenario: 'tw882o4ujf08fx5uft853oudvhm4ryhaatgylxr7ek53ul5pers0hus1qhvh',
                party: 'fbodoo8frv6b5dta8be40gz9y6lrcb438p1pnl1j4avzfortmk5la809i9zlb0k1feoaldzi8vrpytrlblninx74sljshz8hnoounzec3j99m6i0qomg58x1jhy3uzbtbyiswdvyq62yjsnvv7zpsb2v0np8paid',
                component: 'a87b3ugaht4fdgn8i1yiglnfchqxcje1s4oyg4gnrj255w9omafid9a46qwf6s9lc2ewt7by9cn5b0cwog8aspbbczkexugg3hjsbif7hrqlm93bha91zuhe2covea22c169e0c0km7upsa9t1dlbhhksh7s8bdl',
                interfaceName: 'gp4u24x11itk0fiht1hvp43kotyw4absd95v92lqfrts1f1uunp5l56jfc00tsesqh9tt1p5e4kydv2yzxqjpvz39vbce7t9di5qim6wo3mucibcg5xady4yfqy35hxluir64ouk2bsu0nf59nfo1cr68bfkm7xc',
                interfaceNamespace: '2qn68p5zr1rjlm2wnrgv910c07csoqld0oje7mhk2kxzw81db49uyxtj8f2kqlym0za8gw823kcckb4purce11fyci5u08xkzjc6w7k0cr6b05i2hkn11xr7pdswcw4jbagl3978nxcuzm3rwy25rzxzjtwzya6h',
                iflowName: '30ejxebq4c8133uzbmptm16kbk0u1dgzeur3cc91fb0gs60srsdtxdec4tfbw4nbw8valag17nv10u3rden9bjw41d2x47xfnns89ab59tug2pyq1se4gm4ipngl1ds92k142juegr9bvy5nuhp7b427jkd9xsd8',
                responsibleUserAccount: 'ueb0lgy1mwmn5ifmkqya',
                lastChangeUserAccount: 'jdzamrg3li7olvepg5x5',
                lastChangedAt: '2020-07-30 21:38:14',
                folderPath: 'cy8xfx7rhj7bkzqj9m3c93horl0cyl8i2c2c4yq0wdxjj5wnptkslwh0nn3p4tdmksojgxk1viu3uvkcvql6uws0p9c5hlbdyk8s5xeu7a9748ouyq0hhnvbe0ry3o9mcv3h9hd1eab5lgvm4g9eqvcsoivtswa3nw9cdnecrj4sooiwgp2ycckv27lu4wrwrkc2as81sb88pe23tdooongpudh9t0tgubctw7b0db6qzv48ghnauhlqnwiefd6',
                description: 'd53czrh5yxtwulzontb0ro2n79zq9oaa0r3tfy7fn3p2tp5syaqajo6xxh7xmspltq5x1gwzzf9pd1wftq819r6k43erj06n7lze3y76ab8395gcxku7jluu79b5ujbqwckwacnkts2nrbusx6v8wc7u6etcaq3yxvinowtpu2fyqklw5e7uettw9j4vgwwj2o8z7m5v2aiudiwkl6h1b54f2m2vaekfid1g2p2d1gnz8ytsd4n8tiyayt4pwsm',
                application: '2ei8m4fw5yu4i81g5x7xb9aevznk5wqy01f1ys8letcedbivud7do6akg6z6',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'vtacw1yb82g2c0brf84es2rkawrvc5476294w5eno',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '66bizyq2dch05quz8kf2ke3gleig55gwsdlqa1xp5osur7rp5t',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'aludd2eeyolexhsg2dzo',
                version: 'qkwpl991c37fwemtmh90',
                scenario: '5w7u9gvit3fq49k614ftj6lg5pzcxc50uxhnjo3x50hsx2qixlv4z966c22v',
                party: 'kkuj9rwwbb10fwp5nzpsavb6t2tbcq1s98b46dw84djhbjt8rta6zvw19fkdgfhftafvkyfu3gjj14btrofe0mf2g4zb143xj2i00tsfinib16slr7p3p8lz14ov55hei7ugfnlxz6uotjm6wd8xgxfusxoczcpj',
                component: '90vj9zpitwszp1m4leybj73hq2itj9dzwr63aln20p322vphjqq256naz0y4c79dw6dsh6gs0484q1c4kfl96brv18z9bfghjhw44k98phbc4zt6ahn363ucgqozu9tsk5a699g16r4isfgh07fyzglahk8i867f',
                interfaceName: 'awx6m5dw7hutv5zkl3m0gw41bbwfg8fjnmxc6a2ypn5ugyj3sdzp6nh7iogqyb5g6aecqbwjsmkhqvkl1bd56wjfq6eq9wwsd7mdyhzdyqnjtd69b50uffxiespvh6l2w6u82w0pkua1ja1fuk9k8h3d4r25i7as',
                interfaceNamespace: 'xzfa4fsmajk55p78fyuqyunydrkmcc1kfr7vdi0dxe8r7raajik57nnuyy9akou3bnn0gtzh0891bi34ddyq494ach13xh524o5i2hoxh5i5zk3965n4sm2k34uzjc8sa1b1z0y64rsonz176oyyclq2zk140gsx',
                iflowName: '8li2cr6gd4h08joucbbwc7v7ve6827to6upcvhcz4nq7nlk4yoki2qrzjjye2k58mrk6mm9559ql6wb500n7casz3m10kr3zeidoy7f39olwhvo3lcv3vyc4lnnd20vtgajc6c6b6rxuwnyafr84d9drvwmge1jj',
                responsibleUserAccount: '0yno42fx1nzaub07gg93',
                lastChangeUserAccount: 'gz1ah84oi40hfk8wv2ir',
                lastChangedAt: '2020-07-31 02:03:56',
                folderPath: 'xcxufdtowlu3kc1ngymmmyqrfggiinamr8d050vx3yjo6cpuvy71f7thio8ea054dtf1z04l2ppzlof902291m9gitvvtov5xx244bogh3dxqiteeosidkf3fq2tg5pnes2mehv3teu80ufqnfqkrq0my16rf7y8o9o5sqm8lmp28wpv0loacqlknruvcs259xpfsirkzybf9ohgkowlbhtsj2yicb4xfp45p4cr19vgc1zamrw0u343r4eykas',
                description: '8kat66sumyqcu8thcjujf1x198ic7z8pow1k0qy5pqpj6isgtjsas0x0hgtzp4aat4244pirbjigna7b1vccam6axytkq43u4luu6d2kzq4jae4fxbh0w1zcqg4maw24r92xwsuua4l8fvg1x6km4xst9zrgfp8zwrs210zny4rgldwmuiqtz0wgdk9b2i5v4r7ivb607x7sa6sxxnq3gcytsllk2nephf28see13a4ls8bfcmsfqoahdjii6jq',
                application: 'b6fg28o89g8tct3owzndxpzrfa6lwxpejpldvid4qcic0esfy57tg5ri6zju',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'z9aof02f5zmn55xyivuyd3zpm7fjcrz6sygkclgw',
                tenantId: 'a06b72tizf82g13u8x08yy9mh5ojmk2vj2jbf',
                tenantCode: 'zoh7ivjo9alx4s5q0q4tkt1fb7tn379b8bxgyt9yc54615kgs4',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 's6zxb92npmlqbhmc8n37',
                version: 'uzx9lreieyw94vo5apbo',
                scenario: 'td27bsiz0w9cztjdcn6vftebno18tcdeln73sb1emt9yvz6l2h1rkg4xojd7',
                party: 'dzzrxzshxka57622nr933gg6o916hnzso09say0h694nxo1kl3841zrwbemdh06yedqvqevtysan7d3b2r29tbufhx51hloj8b6fp5fjvk0rc8hexrpuljo95i3yyb2vmtsxlxhep2o3lkimbnac275jcu4zbrby',
                component: 'zn2afx1ftnhri4tt39zd71gh7ald092inpgw6ti5qccyivzwhbvp5x9wofwfkjcoojm87s0hn9afsjpu43rk4fguncx7yelml5h4k4dk33m5dj1z7wwv34jv89atuctepqm9cxvlpjalfi76ifbk31smqjx6h3dy',
                interfaceName: 'zqu1zszxlnua9zaz42s47xnbg6u43mx3aeabyymxsnn5ij8n71oxsypsah17y0ynso0kwy7etfbzmdrd0t4p82z3eafrc885j1rmsdynlyti3nbbe1bd5wsy8dzvot80cwglzsyxojjl8jfobno56h94hxwxcxpe',
                interfaceNamespace: 'n2ci0tr3eit1uh88gncay711mb4kp4d2n3ep3fcox0gu5qb2dta3djawgmhv2yc07z6ez2h3n91nzpov2xrvy2aas9wlf67v9txnw4nosoimlhfx0bkpe364bavpf85tyakckv8utqedbevh2kqbapz8ftjekzkq',
                iflowName: '1kbw494hwv0wbalz4g928r49uzebtpyowu5t2ymfkstkwyst9c4ohtovzro92o71wobucq42rlwigqysztjjcaldvsa6gw5hn2ldyvfrjznl7hqkvdi571pv3nwur31zpo8alibzwt44d6iszc8ut0jbnd1zf7he',
                responsibleUserAccount: 'e3ox0ebrr0iyxa30s2yw',
                lastChangeUserAccount: '8n95lhyat8wf2obgmf81',
                lastChangedAt: '2020-07-30 19:39:29',
                folderPath: '19zc5igz56ucmxoet267u3hby7px1kt5v8j00k207qp0o98pkastp1jutmwsuz5s4o26m6nao4ifp46lpc29q6conkholytz4qbrt4yh84yz4l4twlr0p7s3wbhp8pk8ucgmst2a0eqlld1ioo6ivkejur0hhxqq8b86vwiq7qndv3v744cs2b9eb4wglvwm1d6p7u7d4nukph24abfbrmpi4vfygih2gochf3xk1w3b9bnd1wnno7qj6g53ydx',
                description: 'afvhk9xwwm4387jea77hglsj115nqfcl47iourdi26maj8w5fix9ecq41ety81w1ph7x5bmvbomsnugb8hsu2gpcsg3zzya4mpzzle3fsofh0hiq0z42slzxz5hsjn9cgfharig3kf7ybla3vho7hpukqkp95pnjzcbdpog1efsjdva1puy24gamrzp1i0wpso9duh0oz55nccob54b08ewpsz5pmkzefui1llcw4e28ss4nse4m615tiba0yfw',
                application: '4bfh63j8bvn3ai40j6ye0cofm4jc879kwmgym0sesiq381tl3onkr7j7xlwe',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'gnt5rmrqbvlmeosamt5pfkind1tsedqyuznb2j9j',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '4ontrjm6pgga1e89w7o0qy0fgo2b4hsm04v2111ugurhrzkqor',
                systemId: '5i69yetpz4e2acv4zzh7eq0mwypck3q3ht62d',
                systemName: 'sc11oh8xatc19u2x7lot',
                version: 'vmun6gosxvdmml02ajzd',
                scenario: 'ik5jccf1uijtxlmhjgvhxy6owf4fgx2f2ti3xozne947jg9z7xr9viif5pi1',
                party: '8mvn5usrkp0uf6tdq1miomv46p65snouuvzi5t6wnuduelgdg6p38tgyag4pyla1l6co24gxpfzhn4xl57d699cx777a7i5m3omgzgy2hso0s4qzqdifzwkcy30s4yul3lzd8rohws5y79rp97sv7joy13b4x722',
                component: 'jg40mtx3t11sa25q38fe3ph6vwyrmofg0hxk9u9vn6b2ju7sf2idlgyjrwqk2akg3p4azfiypkui2hig9t2cz82d06w9zp59fcb4atsdo0t5sk230de5qw05i9gc8g54bkgdm2yy8hkuswaq7hr8w1btqfxznpuu',
                interfaceName: 'jv3iofxmkz67e3q7d4g97jhcpcahl2vwelnrap8k8dcmz3vbz1qmj7ih2fnfkfm6okoy7h7bl578tewcqdmyrf8pq1soexde6h0gtpwbnp3b003n0lxdj115rylahk2gq80jnw6trea7ht3z658maqiuh08cykf3',
                interfaceNamespace: 'b8qic9tdg75uxiv6cx3zar7auqw7yj9ri0i9f55ydzm5l82bp6htkbd2oows73px2acigy1nlmnlouyj59bkufr9kz28m2f4ankztxnulhvjzfifynz6frqnozv3f9osk9j6goo6jwehxc9urr3yq9yo5nk7wj1f',
                iflowName: 'ukayup08ctp99zi9fhsvyfurmsh9jxu97ld23gvn3svw8wmhkht9fn7mh8tp9o1jgyh57zdsy4nuw91pko791ae0qehurezgmqw1swt13rqx3yjiapfzwyt6azipol30d2g98fk39yjlum354l66x5e5ubgh1gkp',
                responsibleUserAccount: 'xmllavmic7omtkbz9p9x',
                lastChangeUserAccount: 'f3ihmbyctb746jg74rws',
                lastChangedAt: '2020-07-31 06:00:12',
                folderPath: 'ucj4m12qb3m9nme4uuu835v8wex2ym9xm6ppovz8ysvdxnyy5lc1wqkqjgy5oufepygg3vlo1t0uaeluzmlharqtzqjqdpqkh2g4ub66exmxnpvkfx64cs9hariqx5pq15c9wr65564ptq1l360gwkvbh6bl2ovdo85nvzr0fl9zjd23ayrp2dgogo8ydww5ypy5eqc59rqyw7mii6601txnjcgtiirwkylvrqgguw21ok4lbu738od1mtv7nhs',
                description: '86pgxq33x394gll06x2nna06ml0f67dgbxtl9qazh66k83e5dj7g3l57thjftj5nkrxfepkdbfx3v10d1mx6d40w1jyx3fya9ol5fn3jh69hv9toa6d9qxsljso06rwx63n9mp5w6fmnteofn6dt28ya55uhivp8suzrghh2jpapsvsiqinnqi1kitvlw83rreipoby1ryf3zfqwrs0r5482bkpf0m7ujfcdi1go3by1kxbf8jdhh78dmm6u3g1',
                application: '2rfqzasgplq2xnjwk1xq0gg0maw2hcgfny6ptsom7o1mbq1lqsule15bbs7v',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'f172unsgsncdodzc24ob1rzo3ewlwcfsjbx4k0xk',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'b0t81msr752h8j1z8qzipeixx4qid7eaa93knpv2bb3l1idxeh',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: '0ijz2s3zqma86px5o5dd',
                version: 'l3owpgzeh0fpd6a6uu4l',
                scenario: 'lytnvifboqzlxyqpwhhnjn3zrw3ni01x8syszcb18l7o3f1mheg659c8kze2',
                party: 'mu972fydj9q3ghbzatc1rr7cs7o4kqap69l90b3fcpurpqkskygvjv09sv8u3c216qfmyiq01w28rfykrb8bncrve3yhgsrgp2hw77x0efkky6fj6qh8bvfsoz0hsluh9opwibgaeugzym5u5iphgpbdju42uctv',
                component: 'e4xjl0lu56vjfbbjtc1lgg0k8g9f7gfh7qrvxqnqmej4tizkozt1mfi8xlv2ysmkh985v8i9lzy2vimp3lvr40961oimk5alo8lq3c6i9i1or147tudnu8jit5k7xcsn4ntb8i439nqllf9hp0owfrwk1aa6jmyx',
                interfaceName: 'nmss687sa4v4jaxshb0r8wr98bf48jwo9vjd1fk3c9q8z42x83m0wfmhz6mbxojroedzhv3ijqhxlf08qgdsxt7jkd4dfpkwuape9theog2j6eigj3xw9dvdioyfpvg8s3o4v9si4jnmmogvtdkgb9sjwaggok86',
                interfaceNamespace: 'nxpyr02sbhermgj2alenzhw63n8jdcqy7pikl7ti99ppdys8erbmvt4esfe34gfgrkho7cs07fvb1z1erltqd68122wh52j7nbdnhcj36axpokitnffggp2fl44q0tglwcnuqy0klun0hfgod3f7qzkf4j7kst28',
                iflowName: 'ercoizlq1u3hmclic8j6mbjkzsu9poy840n834z7a6lf31s0mt9up5emjbby12pkllt4fxb6bdqlthkn38hkend7ux3a3wd21h4uw4axzb77oe0uyw5tkzy47m9v4rj1unberhs4xmml7xjaltln9v1hdcikh1hn',
                responsibleUserAccount: '6vr0irrnw6b1kkjv672f',
                lastChangeUserAccount: 'rb0gv6kxfgfbkc90qxqs',
                lastChangedAt: '2020-07-30 23:41:01',
                folderPath: 'ufl3xrwy4mvt2ozgit70kcgn3x5gg4874buw1n2uv37pfmlit4w55wgphnsk4w7cp9nqdyvn8h2ob7vy6begvl90m64sw1gy3y4vkip8sium5kip6m60hof2ej4oy1efimcxzb5y10ssr3q42azj56gciiktj5xjhitkqwbnndhgf1u73ksc5bog90putwwwas37wgppseexs1yqux9r8ovyh1uvqf3uepvzpa511kvli93mbzzrpmxo38ryt8j',
                description: 'sr07ot5wxvqsjru8u9xsrro4bp3zzdb4ikfy4tyzyzidleiv4woczcrjeueb52ajxhe53mlxazgk2g8wo7q7gkqu7p8hdyp97we9nsqn9vgvp6pfchc4mq7n69n2tuga6qd5unsg36tzwqo8uu4mf53qwdz9kb9o0u6vnedby6k997plrh79o19dkx07z52ptauer5q2ofla5spu12hgn5h76uamr5pqxhgt0uzpj44g8cqyddtw5jmvqoej9mg',
                application: '4h0d4sym0i6zsr1embfzk75m6vndbu64ek17xvbgy9xqog6ebz853dzzt5zs',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'mb2wbm1xtvmlqzuoste38a5pomt52rltpilnk',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'xrgfx07ms2um13mj50cohu4w6p79fk4cml0hz13i',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '6zuvycsz6w2hseh7rwbkqrnqk4k9y18wy7in43lw73wpro6jrkx',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: '4k4x9o8m5o2zfu1mlwcc',
                version: 'wagvdzdv3q92xgnybglf',
                scenario: '4nq0z948jpzqdmx6r9xv5llau18xlttrvjsq8uifu5k46vweptsysb60jxis',
                party: '8qxc3jzpkchy0ggianrd9b347jtl75q5w3pon1wtgwu87wss2prod3plzjcvfno3shptc3morwifj91c4574aa208togsr6jotba0fkrgh3x3zy97i7i1hqcfwt4jwdt46zwnjlto7y03bg5gx7cbncyh36cqqo1',
                component: 'we8fg7c2w9msbvf08nies6xn1dner2rsb19gtqghd2sw9edbtd8hkja3msrjyggys90ak89c4h7fxh0c49777ip0v4dtevuep4e6v54rqyhsw1i73n0w6m43v43gzdl13lesc1g3w0hfk1vf2i5louoxn17sh1cf',
                interfaceName: 'wgam3nl8qglcvj3of3xzhhevuvig532a05082bkbik6nw0qt39cz0r6dvqznus0g7rtpj90pkmgpabp8erkroh26f6ac05ph221nm735ginto080mry739cj25t27v41mmnl51deelxz9jimg1ancyf2i1mp94ec',
                interfaceNamespace: 'p5k4skl197kzdntya624rgwr8s7qesmgmszppyt49ojy59ipec9s63rt5j237e3ktsrvh49xev0fg9bt7pe3enuead8vy41q8ktfyu3ejeb9a46klluubfxxp8f7gtiwa353dm1844i2lzc23um2ktckdgp33zni',
                iflowName: 'w0y0zmkloq2wali5wkbkr497ou6bervvzqdsq29cn4thx3anoack6apip733ba2muilvtrhreo3cwasdob7qqlxx1i9c2vlo5h1xyxwiorjff7blto3vrnu0tzyf3jyiq686r9ndjermcrbqcb6nq8fanowg2omn',
                responsibleUserAccount: '4z0y5bsgivfqogdditjh',
                lastChangeUserAccount: 'z2hmbrz2cyroj3c51yye',
                lastChangedAt: '2020-07-31 00:16:44',
                folderPath: 'k54jzjsy2d7lbb8wf0jxen5gwcru6s3faxupml4kvmjx0l08g802vz8n890cajuigktzady65cabv7c5wojp7kcpidifapcxt3tze1xy6r3v89h2ev1h4c9entsuhbwd7x594lstkzglg13jllmd8t6kwawig355hemnmf882feamhqkgbqf7xg5zinneu5j71dtt2m6tgyfthdedhsn7g6y7qa6ph5k54ka4461fag7mjda7qqufha9vs76m2j',
                description: 'h8zqk7a58n79dhbr44jge6t88zzqitcctyzoju2xhw9vbu4554netxqrnkl4wcn1eelwdbff1vvws1nr6vyux9ltla1h79oi33xsz68p2rnu2pg5e5gg2l6agbgpw5jzkb0hqadt1r216blwdrg1aknxxc6nz1358wt974zyso53tgfpk6lmdzlb1su0cz6bllymslw4wz91rddeomwe7sj8peacxo5leqw0r5f4j99nadys561u20s82581tkd',
                application: '18m2mxy9gk3aewwi6j4la8jzxaeblh5vkjucm9t3cu59w4zdgkgvzbgt3f19',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'nhdj0z3cw0fc7ajy7csdnlxa32qjlbdd0g8dq0ip',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '9w7o00gjjhuyboqsdngc3huvxkn8hj2fjxw9z4zbhbmrqmtxl7',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'cyga3yfp8abkelejtve29',
                version: '6g1xc0q5kvdrfkire9dh',
                scenario: 'gzbhtn7gc233x2byuq5nz5u2bkobayr79pl9kjm18txmpnvb8xfb6eg1g7ms',
                party: '0k48c7552wh8lkotwi06km3no0oohdwowt2kkdtl2ss4l1bv8nedjs4pgndlvd3k0dbyk6kxkcktgw03kci340vr4tnaar91hk8gljycpsmojgha2j34ix0l1g193o9kv2ca7zvxxafdpeirzqdhaorn2uk2k3sc',
                component: 'kvx6kx3eeguuuax6xt06l1rnk6oqcq6n75eed6tn6rzvf6vj5owzvrvwmeh7l0gphjtgfgkgby6jpx0xqgg6uhzhfo11wz6dterlup1z7zlwkhw0ab3bnjeisuinspfgecccxenwk91i52w2gj0p7pwttx29qnnx',
                interfaceName: 'sdozj8jeu8052f6h3kz43p9kbuaf2v2jgwm3y8bcx3dse9d3iwusfi1ezi67cq2i2wohx85ktgwajf9j7mz3zxz2l4orf50fi88byaobe2sdbu7j1w3ruh5u0a4oj7k0y9qqwmnctx9k2shsjmntbzh6tz0joo4m',
                interfaceNamespace: 'b3go1txmvjgq7rkuoglarop6wou80mmseqc1fq5cc0olggdtd5vj07mkml33vqn4sozlxkjwkagzec31ctepe17estm8j8wjolhksjwlopuv7zathasajr2bolekrnb8spd7fjrx6m4yegjshq4y5l26v6lrxtkl',
                iflowName: '0am79xfn5jmaxg0kyfxe8yh0ks87ld7nsztdrfcrowgred56k4olvhuifs9fzzh1h7k4umsqp0nxe1lvb73gwo3uw75wd89bka4dkp8cjrqjwszf0bhmhtpkm8lctk7mvsxsd5yq2cf0l4wfw5tbson6gufjgogf',
                responsibleUserAccount: '8zlxoipajdk01qstldis',
                lastChangeUserAccount: '0zjl1km2zapdywak9vbc',
                lastChangedAt: '2020-07-30 23:15:24',
                folderPath: '4ec7swvj2lpgtbk3gaxyez3xywl0qvg56bf84lzt9gqr19w3t0payeljva37jpv2cvy3f0w064cnijqdvby74mz3pfp0p8sh23qyepc6bcryqhkahg8kkth40uryg1ttnzs3y4nhg5cm70zileje86q8um4p1cpr1a0253z9wxgjqjhqx6flj91446njc59ia318pjl5rgum2m7sp5fhrkout4pxwgzp89bfbsyx3uafl3djolchhn2gfu6npfi',
                description: 'ad1f2nb1dqbizy26n3n13okq2nnu3ngnu089k5d42craetapdfmbf096xshiq3as5y1ezvblwir5zzokf47lyi1l26dwdwbhcr3uh77ojkeoy1munsbr4njif8183u1hfds4m3n58z8u6rna3pt3w5xtg5hpm219o4ihjqzqxi1nlkyk0ra8ppjoypieac9sd5urjge0i7wc81r8eowue2qvottha0w5et7vrw8mxd8sfa087st98bvet11g6kx',
                application: 'xt996rqnv91enyz1bdoez9ezayem9y5m5jf5jvbie4vn9xuizelagc6ohk3g',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'ijgvzd7qcek5neh4m8jwmiubiv5nsd0y5j68rfnx',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '8kguggqvsatqn5u9un65siec0sb5misjideb8uwhrwwjsepo9x',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'ca6w6qg2x5bpyzu6vo7v',
                version: 'bjcoff8tmoaoxespqynch',
                scenario: '2oy7d83jcy4da8hjyf2oewncj819xk4a00wq89mrwggll4ggg3mjvvp46dsm',
                party: '0gxwhx2zozs29nm6vwr8fme137251i91utzbj2xmb1caxdqnaofsxvh4bgm7k9w35fgyboafxdjfxl069pcbgbku94jexiqz2pft1usgj2hwk0q9mbvgm4u39kcv6um6k4pkgik4tm006q6rfbcd2qay1uqovqsi',
                component: '48fuztkk0jzwohrm2wugrfeshrk7lr4h61jqxs1skrt4814kq5rabqjhtu41thn57jg88kx8skxq1jgmfyi0d5p842frwurd9zg2g932tuf0qiozq4yk3kl4bzn5ntxhhsvbr55wwi8v5hzf8icclxoy3g0bnb27',
                interfaceName: 'qs1dz7qohjg5nxz78oxo5w09gfsf0q48r89kypsrx8oo2ik7j9eyya1t9rdjhpde8g97x7m0jwlw4yf6oq4rq05xrdmwfodbldjk3xz46twwrs73pj4p9u5qekrptg5p92ptb8f771dyc5xeqh7sdw0wa7fhrine',
                interfaceNamespace: '6nhu0penttfnujzl3vc33fbikbm6xaa7szmhboyariauvcz0vtcxxd1cnpe83l9mzhicdfobzabvwukcdv28b4fasarptpp45atr9gcz7fbu5ohweidiw8nphdspbn4fro4xck3luqtw6ve7t9ohnifzytd342aj',
                iflowName: 'ip6w4frfyifzu2nvq1q0qz0mmqxkx8v3qpiq5pchvnpokf2juariveo8vy1w3p4i1skq7ckquil00sr4wa6kw1pxpl0t1qn7t5sw3n0w2y6n1mmriubzr0eygx0jytompg1f3oc8ohwgjclpc3p9t0ya29aqc2px',
                responsibleUserAccount: 't4vi0e4nc4snwenq7jip',
                lastChangeUserAccount: 'a497a51rusbgy3d1zc5b',
                lastChangedAt: '2020-07-31 06:30:08',
                folderPath: 'bgvo1cc6gex0gditsdly433ry4ymua26ozu05z1ycsnb1x3spye66qdrnd031wa20f825pph81yoy53fyxec1uztn6co7ocs45jz2ztfzoq2mmysb883b4l4k4acpdx8g5y1hsb7d3xjim47plvl215xsmiutlh3zy9u4fx9jzf3uxr05aeygnnd48p9npxpro6qkfmlhqvz9wbr69wkc2umjlm8irx6zfvqic1h7z3zyslb8q9d5xgbmr11kc8',
                description: 'tepmdpyz2tafz5qkp11uob3hajwwkbxhj3tmhkv7i3j0npycbx5uhwbyuxgojqmp5sqmqe1v7zgsumxkdxia4ym8n70jflynlm7f9kedj0wcisewryi9r5wvqamq4329gsfggmsemvpstrobf08l7jke1eyox098rsxzmk62wciqnylc26a4pgk1hlrykkn83k52x1ahnl88pmp80qd73nj3htr0nb5pq99a2c7rglvj7wmnyll5cuzk996yib6',
                application: '69xvfztct756krcydcul1zu2ixjgryajyl09d0afsiiu8ndirxzk4ucvz59h',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'p3w6hpvljji1hrpeb73008gfsahyajqyiibiuspg',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'k4cutyv1u32rc7jk4u3g9z08mo6r6tox2le5knty3ur3ejcnz6',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'wzq8cnnoix28fylpmc7g',
                version: 'nugozh3k70k592s8fv3b',
                scenario: 'xsdjy2jzsizy20yvqrs4y5oz44dbuh8sbsw00ycnh5brsig06kjtbb45aw7z2',
                party: 'exgobr8rsxjgx6w67lqha7wgdga31d2mfklnsh1jrqd89exy97jnn9yruaogizl7nbn23buhwtvsytf0euezokvdc8s6hq5igo0uwi30jgsm8ncvjcfluv8upamkgtu9vhxxuu00mhuk8yfa8l05db8xf7cdve9e',
                component: 'b6km58e34inx4x8koesa27trhimkd0r8803qwpwwnpdwuoupjenhqtlobhmms5oddsyt5fx91hf7pnjq6nrhlmxqvqe52m4w1e8v099my1vuhc3v6mnwdjkuw14c37dyndi9d40vikq4zcygrexbgc0cbw1h3e5s',
                interfaceName: '0rbft3vkweuph4czib6i8fks0fe00itwdvu01ovkny3sqrb9qhhp2qxp13a2r62521h9g6mxoth4fkmf4ecy8nlnkf1jxsa8gy7aoousqcrvf59cj621fmpb9vl3kl1r3w3k90r1kpv3ysrq2o7rt3t37nmacsyx',
                interfaceNamespace: 'c5r8tt131h02usnuiu931otsu66d6duvcedy3ihupijf10x13fy9boo9esnvg8iqd4xwf1yk4lpqmq4usllz7z0v91l3cudryn9ht5kzm20mz9k8un8ws25zzqygk94dce811036icd436fimv82qujajzzgtt7q',
                iflowName: 'gxcgb6a0kyjavtn7cxulqusq7vpojivyn40wx8ka07vs65ayuvs10k0ij71tco58h06pwqasnegalwlgoay78uis8hnetgiaul9589hml2tnnaxl63729itagsan42wwmqlf7igwhy7nay2oegcp3gh2tcwcj61d',
                responsibleUserAccount: '39m6q61xew6d467cqqbs',
                lastChangeUserAccount: '3j993w078mcsbi54ofve',
                lastChangedAt: '2020-07-30 21:12:45',
                folderPath: '36bubzpj2vkj7bgiqp4ygvd05nzmcdwqiwb6o0waon3v8phsmqgjhqw384ue94l0nta4zup0lc1gq9jjkws45jlw5nl926z02jescv55093ukrb4i7mbj2us93pb7o3fnjgtxs7oycwauai9wam2vmbpan6u27gnqfpf8cipu5wayo5me5ocu45d09gfueseotzy27xa0dij45joxckv7zr9xg6xri09nmlrr4j9c3nv8cpd17dad2ng2pfhi05',
                description: '19hkc8bwwzivwkwgndtgdmcvf4s0jga2mlr9w103uqop6aaafme8wto2cxdwghhq7xrkkjxwp2lvoadv4cyh7bfsw1yf4s3gs7koq3lefdfb0el9qlkl3vd1qanfh1cfts1a7f5uc1azj5ung3iirbig1h75afsf9vvsw01nz6g2u86qes7m9tmey9badeyz6plm6sktiwob0t5erghnmz5otfjmqbrau8t5o2wz1ldyhyqsdm2dogvm13rvre2',
                application: 'yq95g2o3zn90lthnko2jciw3yasmjewfiwpkbr8z719czenmplqzj9maxlij',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'vhof4ur266ge8bracpvhxzptbit20h5emebcar1l',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '6v3g952w1lh8dlq3m5z1uggley8d8fzjskf5xk9x2hgm4p5j0r',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'twirbtz8g8fhi3tr4m8c',
                version: '5rpgbpzyjn1tbtxue2b4',
                scenario: '9snu5czjl0ct7od0cc7asm4yk4r1s6a5twh5nii67lwayn5q3hytolwq3mol',
                party: 'elokctul06v6rpqrri9hju3f2r7smk80fj3i9mjjoyatsy40akco0y94c8zthr2k2zoa6wyep02m2pndpy6zs8dgu3m7t6zx375xgv3t2hm767ni7d690izihmzuovffslzslsv67iho1z6ivaudl453nepnit7vb',
                component: 'ru5eeovfkrvq3c2t2rp8rmkayz3t2e3gebz0pmyc4u9mzctpbradv163o12mjxvq08zjd1mama29839ial39tw7h3kg56354u13jh544r40g23ftg44tzlnnf0mbmik3jokuqx2xgnj0hejnn99ubrmfnpdzgnwe',
                interfaceName: 'me6d0ro14h08q5lmt2arz6j1s9c6zoum8ybbjzolodj3luyzlsrt4viqcd0e5kkeiqurqy29rtiyt5b630m7s1bhnukfrq8bfdfd1f84tan43omr94tu4lxg22msubgpq9nsybekam2fhxv4k1rhcnab422mo9wo',
                interfaceNamespace: 'w61i2obyi5ea4b96mvmt95u9xzpewt49n37tw1jo8plthe5xyc5d8ant1234p03q455ku0fi4ebogilebckssp8bm36m6fof6fdjd4b6wdat2qnhxvrdxhjnje0b1o920jwn8omh66onrlhmov8xfbc3waltk93q',
                iflowName: 'ojk4yc6bnl9zzb173ih493ddf4wntg2f7cnx0zyyxepci6wd2i9smeupe907g9n791x71tf3nfn7xmvsozaveabjdecjrl1x3fct2ay4069fo2yniyndraq589chu8lt2qaii93164nycabq1khkzns76p4w0gsg',
                responsibleUserAccount: 'tuej9qxgfmvscn2wpvxk',
                lastChangeUserAccount: '2jcjehfy9wo8ihjou53e',
                lastChangedAt: '2020-07-31 04:08:28',
                folderPath: 't87etftgz9nylrd9331g9kw4u5mrw6xp7cc9ktmreipmq738y3yu4sm3ef3bbh5v3hl4f1oan0qo5xxpvkagpu2w6iq4y1xgexqhtt6xqwnrtc6quwswm6gxqlxsquvh4xfvkf1006okqxqtym5gze5ewn6zw87kuubl06pvljucw07xd1f244krex9vsskqz0quagjez891r6bhklt628p4mqgl7m64r8gp6it1hrk5hoho7zep2win4bd7mrk',
                description: '35mbforoolrmaeiyt22grh8185mf34zksu2gj27hiftyh5knu77oavgw087fq67w0b6199fs5vskw6pf2stl6ml2a6jnmwtp3recxigo85ztkpmbu7tou29mq6rbova3sytqkrklfavg4cauaran0bej3y343rebvgrhdbv6lq16d2ld9ng00ywynf2bz0j7r3zvch5zrgl0v8vsjk0sg0hsz6uh7m3k72m4erpidxe39ky5mxesi74sgh2cequ',
                application: 'ii7gkv0xisv3nqmo5op31yfab3eom5zvyr711ovg21rrjf9rvysbiaksmayh',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'cy6kmipldazha1zs6137dwcfp6vap68oacbrwt74',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'z4s8dew382pyoewu6mzcba7wiqynicfhdgqzuolkrfxnsl07v3',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: '9lktu8ffbvsglzdbox6g',
                version: 'jnjstii4v8rc30yoqrj7',
                scenario: 'gz5t6e27hzz7hy9dhnmv90bcjv866x4q5swuka0e5ed13fozn00e0fwuq3wj',
                party: 'k80ilq1m4ievx17l6xntqrslh517n86gyse4v1osix0e63b09xqbo1y34dt30d7c7ck34nw5pjy2j9yl3di8nj5u0aexqsrx2m790js1d7xlh7zgcsd06lt5b0ork1c4zw6z762slrjefat57izjf06dr3u77n58',
                component: 'tjk85rcarfl2484l6uwwcdu97rgpibsh4d4ffcvgc8eytsd62sgz7v3hw0btwbk5z3q6ahal8endt8yx62ftb474nmnny2n6hkx0noonobpc647j606dqkjev75jt1etpqu9twv37t2srafrev6m05nyyy2v6b7fw',
                interfaceName: 'd8n3lwqhajv98l0r4u0q7dojygvcrejvxv7kec1sbnb14cdkynmd43k9mxosf78k8xyodc6dguedb09ajqtyysjde369os199yr26xd72rkawpl2h5rxfokyj9xyv6ocu40ya724n6v0n1gqjti9gbqte7c1fbdk',
                interfaceNamespace: 'o7b64j93z18m4vtm2wrs1hg7ma7hszrmr07wn421xaxv48uc3quopcjgv411619hshodpstl421x99np8ctt7uzar21umhksz32pkmdwh74v7nchc9du5d7dzqra2s4nr2w4m8dzdzg6e1y9uojtty5o5hpm3hg5',
                iflowName: '7v3mffz1tuo1zgkahvlijmrsqjctn8hfu7ar3ayppub8m3zx46fwkn9rqlhdpcs6p1ezd3wkuxl9d1nif5dfff6mqdjhcars93ep72dyjeohbaahxkvxffw11i2vitdbagxivhzh08b5ynfnn7oo5sh8jdhnq3wg',
                responsibleUserAccount: 'u0m3qo6jcw0cajayfagi',
                lastChangeUserAccount: 'bge73fbsn8om8cksh0es',
                lastChangedAt: '2020-07-31 12:18:49',
                folderPath: 'mo5277ei0d6p62s4gfzc3evfsyogrxh2jceinoee94dp8fqrntq6198gn7jsbtfd5t6etetia8z06g4a840a7fxzom3uvcu5kly1mxf1zvtu8jg188yzqin9nxzejaocakzrdx8ulg05z9xggiem0hjcdjrrcicu8es6pm5qqfh20kx9gnl1qz24hyv9tv4wj3s3bej47z6ynuzj7r63ongc9obxzkzr6f955digm10k80rungfi1lqrby9w8xn',
                description: '6wsdwwqj1mzau3y3r2yvgsmwovf3t2c2tvhzi5w0ccnv9qkcfpvn3xkj3sv3359kn5e5h28c86iegd2nfv09i8xpjwr67isl5jkjpyzkblenedn3v1dye9f031g4va5aq5gji0oljofmjcnhvr0y1nrvedzuietbjnpt2kw6qij9bd8sl226iiw56fy7npqny14g3g5xapmluwfo73muglq25w3mn6eeofdbjtrcw672r370ys4q7r0wzs8bq1i',
                application: 'h746ergtkipb9sht3qz7ys3gnntryhk2acijwqsxeiandhqj50enjzoyul6p',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'o2its1g1bleft7kkkydsvgv0iupmvrkr96sp0ra2',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'g57tbmmw8dhke06ijimrb43oleoofr6xe2a9isorvzxp96rw3d',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'kyd37rl3kqzcotei9lu2',
                version: '1y6uk8mdt3tpsswapeu5',
                scenario: '3trrdfnlw50rkk2zx3z3va55y1uij02zzbjr6jw8eg1etujcib7u95721rvq',
                party: 'lgj3pajxk4tm8fpwqptug0qu654qdrm7zm6uinpf2usbzvpwqznzv5r19kfzj00cxmr4jlj84qb6rsqr4bybljveefkikc36z8fgvwt5tlznu8l2dt6c2ms8mg00m1oeyrxv2w9g78lx7n1mxgqyr3ccekk8hv5t',
                component: 'b50gjb5tddzv6n8c2ow1ar4jz3m24imgwe4uw68671f182sxje237l27gyin8p96bmu01qzxjrxryeyk3bvfthj2h792k5bz0cfki60tv3y1tntfr89oubfa1j38tfc596u5ht5lckmax7s9m4a8p9i98fcrb9ik',
                interfaceName: 'f0du27m9aw53r8ach1teysgwfnchkqwjrhhx5buuru87wizumnta968hzbi2hbyvwf8hwmb26r92q2h0sc4c8t46bc21vokbdjqzsqthfzxh54iic76lhm6h73fkxzzwbfwvryahs883bp06h3kmzg4tstn90ke6y',
                interfaceNamespace: 'sb8suagr8grppx22z3hwx5blkf4coyt0pu4db328wmnp5j4mfd5xzinfsf4jmvmm6wj2dgmmc7c3mhyvbxhd0u09bqu5qv6n52grluxxb073md6zopy0etnn0eic6pc655voz0j9x50203il2mw960f99q16xd7j',
                iflowName: 'r9g8t83srcbyyqdqi76tb3n3pvycp0h6qrbnpykkhnjs0kn3kkbnuduyadggu9y9w4nfd6rdthkc7sgmejrujnv4g0mgnbn7kkmixu2ut5bynmwcssh53ghirh5411gw0n8fgpch5n8h8p8a5zlgnv1ruh7qv1i1',
                responsibleUserAccount: '5bg20yflo2v2ywgi3xma',
                lastChangeUserAccount: 'ozm0pdhizyht2umnskyy',
                lastChangedAt: '2020-07-31 04:29:59',
                folderPath: '8ccorwopudy6ejykhoz4986jdlh9az34bgm256n5yidmwlwgibbv8vxzw8ywna8c2bj65hj3hhr281do4aind52ylj88prjxc5o7q8j4jwe6kf7w3gec8p777oraz4dbc9yph6y447gwrg71x90stezyv6vammccclt0ul5smzhmhsychmd306uyul97lcrxuudjsmale8ia8g62eky7v02cvgj7agc3mvtp5nm1uxgka32fc2bj4uaouapu18t',
                description: 'sahfd0qp4qgfxyyvg6uxhdlg0dxrrz5eibhi8zo80jgri0k30eahq5pmtr0981kqte15idu6n6cw4io7lk7976tk3srsg0ara6qnnugaolfy1kahqy5hlzexo9l9rdg60djl44j4bfuoebv17q0za3l1of7mvbi6ra2i5lt4z2pkrav8m4rrfm3jvri2d2pq2igpkf6u0milyk1pmsgyugwits0isbwkv3lmuctdk1y4g2ckmavnhbwn888qafj',
                application: 'u0d42vb7azdfel880epepnykpi97ds5evxbjs1g8hq57d92lfjnaiom2m01t',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'so3vddhjitannblhgal6sxltj5lm8uryvik8r6tn',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'z1q56onh9e7lc9juhj6uwfho0z42p3u2zpoyct49o0bgo57yj5',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'xthqkxbyeq332dfbc6jd',
                version: 'zvaxp6bgyhzd4b7l227r',
                scenario: 'd8jzld4fj9d5bnfg7728zo2yl1iuqkd9460flgi8jot2b1s4aazvwrfrae5x',
                party: '62l72fm114zr8le6f1rubgjppuqdmylx6m9e63b2m0h4bvmquhdajm463l8g4br7vvle2afu5xa7u91o2rau8fnhfjkeezhgw93fj50u859qjja9zu0pdm8yvcozownj3w41lht3re071kjtty2aw20pdqn5uxta',
                component: 'aehgg20gzddbo6ggho1365vnrfof03af5bgm8a54if4cij2f0frbt9dows9wu985ykpg1mn9j14gvc5fe1uzwf0fo5c7ilhhbl8koo5phlbfugh9ubgch4gdtmkmxae73oq5yf2tuwlg40ss0yp4f7qh3t22q6os',
                interfaceName: 's5kss3vpvhvss4zk6xzrkqjs642z0e52w13kmigyszmj86rqp2n3ols3mgwf20yy3lx3hsh7wrz4k45oaz8srk95jqg0s2p9dd28afizkce3afbzr4vqj2cgyh8zfs0fdne2s0r4vj8gxmbuzcmxc5ta8tcdbyvp',
                interfaceNamespace: '4nk86hr6h5bwueoctvddkvrd39yk8d0g8ixd0aj0olu26vj9dgfnoop0o32npj0s00z7gul5oxxtyd3v8w3fjpjfbyy3rt4ukyj8i4v5vnbkxnj3z3ozk0ee3vkdxoor3zkw4j26rjclvun3rehni6dl4p97f08si',
                iflowName: 'czywxslbne8v5an08s79msruhgw75vhmmf6y8jw7c0v3swa9a7wq2y69fxpbqffv5zvy2rn3e1q81fza44meg4rbyzyqnigyjvxpm719j0ole6zfj2nymwsbnmtvmx2xyyaf5v0q7y96bkruo7zr51ueh86hj0gj',
                responsibleUserAccount: 'bnbxtixl2xb6n1lpa20m',
                lastChangeUserAccount: '1h2m0ulkz1rkv1mannmu',
                lastChangedAt: '2020-07-30 15:37:10',
                folderPath: '8n0slo8rla0qyvrnuociuye3n0t5ddmaj7d8ljl5hlkehgltq117rydza1rtth1v3r6ltc3207xhtk8u26k7r9wlj20010q41htnw9zo1ncu2835adr0ktbc2lojxz2vxp784dai4o8af3mbx6q7wtf1bc8gg02qwkmjsll1i0w7lo7fme1igu42l8n12aj7cwmrzierzd3x2p0c4dg5ahp9kou22810aaf9hha867nzovpm8j7qjuqfigp8bvd',
                description: '03bqmv5f1xx9x3h6x4wt9v9j7d0zf4t3anvlekx10862nxvhwml48pryd67nhnwy90g3ie3fopuzd65a6r5dw3pp4pf8g0twyecltw3e3ue8vkbdvdxkzsjnj4omjq9sab1kbblrjbf3tctkaj8e2j3vbk94m13eww3im9vnnf4aikwxzyxr5b5khmjestwzer5inf8i48rp3opfp4mimdf5w71ovugt6t5p59jgxiq3mtgf7imc6rdu63jcmmf',
                application: 'i4zfbcrhdsyzq6wnzaat4bfsrurfdw8sjb77tyi37u9usqyjxr57dzlbjcth',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: '0wtvzgfs6kzklobyfw6vsidz89k79i82lyq3qisy',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'j4l8h9hwow7pvjtrk3a3vezmig93ixrdpvizornng87i0f1svy',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'c0qjdeb2je30s4rznps0',
                version: 'wjyos7b1mcsjuyx2rua3',
                scenario: 'ojjxk1qy68o1hcoyufky3pikmn8csss6xu0p7scze0aqsvxxomyfjk5t7zq1',
                party: 'dkn7lyqcoyet29tad0cjvlzgxb5wk93ibjxc4zfmhileliw2esl5zgzc4qet0k4l6cy6nhkvoci59c7ki8927u4zdwuwpmc1pk1ielusw8h4i1b34zwalfz4dd1a4ui5r4rzvju02fvnfh4eigax7rwnwa4zabwv',
                component: 'o7pivkyho9gipocvxv557i60bqg378dcb1nzo503k0mgzmnmly75o7c5fqa13o70yz47dunej6dfw0srqwp9tdv34bpi3wrt7v90lk2qpt0svp0zau8vyii83hyocnt5p5iwxfwl1jtkbuz7ilwq7vnmjxoeh3kf',
                interfaceName: 'bc2ys34m073g5pjujpsgeds70hwc17l84udhjasufo4dvwzm1joi6zaidbjwfoxb1nvi5b5y769odd1svf8mozwv43t3ohx8v9q5fyf9c9eulydo91h4t2odyz2oxvyql1qxelc535a6f1mhso1g4r8d9om3dswb',
                interfaceNamespace: 'lnmfs4r2pnzhqe7nbzfp4aoi366xettpn51fhdvquqczi2y5x6w26gzcr98nmzuev7895kmay0mq0t90sh1wetfnwj3jylv1mzo1zhnqmyw2e44ioc92b7jskiv353ss7wyve5lg548eykacs9fxfkbg4kt5n7dp',
                iflowName: 'mzj2hjc3ww53jmccg6ntbv7v3tiewxcueixdqabq4jee5kjxkc4t19w59l533dsgn1vm29jjqgpb0ca9mgmc2qlb8gvc463dtl9j0jsvh8rteso8ky1ajvdmmlk3x15p8jqbkgh7drpewdjuaut4soagcz447vr15',
                responsibleUserAccount: '38fkc1hezaaea3vunb9t',
                lastChangeUserAccount: 'wk9p0jkxzcf3tt0tciky',
                lastChangedAt: '2020-07-30 17:08:18',
                folderPath: '7hjyxxnplxgm0uf5h74jql0v2n29qvr3y2l1u4w1bh183g7oav4wodsbmxgwax5bz6ctym17z2rh5xl8vrr29g6at24ig4f08oqayit1gvv7y58x8ovwyqk30rm61vg7torl69w5gq4u7hizkgc5ffyombkexi6p4k4ic76ztqqysosbadkr42uhficbewkpm9gbe23dp1kj80c5dtiim8yciv5zg4k3iug7qj60c50ba9g5jyl2xaoj3lgkdpz',
                description: 'kejj9iwah3ftyttd9ztyykvwke36intfxtwfpkmpy53cdd7lkvaa9po5y3kd7ul4xpuae651ye5d2xu74kv74pw371v5gqxkvp50zdanez5y4rl56am4n0r1pdvipmhkp5mmt5ve955swxy13bvi84g1ge4p6cdnj6rka3mir12zbmq2atjx0e5imesdzkmmms2n830a04291m0uu3chuccyaxjqrc16ls16jykvjnky8wztxlaurg0ixeuyb07',
                application: 'xjoiqicgdctky0tp4dr7zs6a3b93wiamspzqdr5oqxgkhqufaet01u0p7pny',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'r5h145jpbgax2g0drxeiivke9utvj2jjnb5w1kr5',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'a655cql51l8yacl36ny2b4x56pzacmacelpf4sz7ondb5saeje',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'znmai8rs8dcz1ixd1uh0',
                version: 'gf975wptokhbzca4grmk',
                scenario: 'dmzufl441qlf2hip2eo8bnzywv358v0si74h59yuelw27y142wpt2yozjfp3',
                party: 'bwg3lr8vrmed0rdmynqe2m8ssvki0iqgsl510752svdye0070adnde6qvxwlepcp5zum00uqz0vpe2dxxs4fao0yc2hislivvkordxzjpuwdliv5xion2x1uxpf2xd5o76aaz0440dog6fepkdtl5vt798xyuxa0',
                component: 'prkk1b1fkv5ct8gzur2ezo3vheax6suheny2sq34xah3bkq0k4yr84vfrny8pv8bbromj3al0hhd0xnim5dd3rsm9v0ck4cqkjr9cioq43ict35z7wf2nujf373e037bhy89564l9bymzsmaqtszxb1jbv21zrxo',
                interfaceName: '491025on3t0qv5pxahlu987tupf9mo14ra262y9cjdwa0afrppdk8kk1vu6lw0oa49z1nysmlzd0n04nqkmmmkw2a4desen79slqxj8z2e2x9i3afsd3a8y9wepovnjf4imfv3nzfhtzk9pw6p3x8kplgyahql2n',
                interfaceNamespace: 'aml9s2w82vmowid9urkcuvchp9t9846ltw7u2qv41lyf382jsapx8zj7ubf8e8xm8las48y9xeuxbj2qraq6oqju848dn44r9g24nkvmc25k2lowjxs5clmeauxzf9kn14mmc252b382at5ovn9fjrkqz54kjdsx',
                iflowName: 'nwtoa6q3hs0060tjiz724jbm6c09ejla7xucj5550sn2s2zjhssuaegggfesnrtcxzn8rja05f9teat4yqzv9wgg915dswx9mku0tznbf3zwfrq2jxjiczf8urqyliq6nbmlzsiedmczvomyk7zhjwa1gnyccmix',
                responsibleUserAccount: '837c8p8u0vigpmdjxxrhn',
                lastChangeUserAccount: 'p0p6osk9oz3z3l1z7g2h',
                lastChangedAt: '2020-07-30 20:27:31',
                folderPath: 'pjxceu4x48lfiepbupq76kq3dz34rrd96h4h1c2rehcccz1z80lti5dylpc6i78b2sesjub754bvnipgufcs0iv6ure4ohj9bi7xfvmpvbkd2vwbss5tf7fpi20gnjxbyx67doyh6gs0oieqs7ms4cfc5xkidkxqc9z2vzrsekn0hkrl474jws7tt20yn0p3snivbteyko3wkivuowjg6a0ozfv7lwz4mgkcah6e91xwt4okosx399rwr3uiavg',
                description: 'wuti9qpsvuks6olrsopiyay2q32j2foafs66awhk7e4kjo1b0gd4v9rdottuuawb498wlg2h4e1uv1egy19e3gciuc1jnzpru6ya4u5tcio82bjd1lo7y7b9gcme9cgcroyekoxbtyw1t5518o4jq70eq1i8p7vvnmaf2gzguklaeha5ryiwa5yo5iyfbozi58upbdyfr8czvpe8ekv7bzgo748bqmzkt132xwt107vm0qkavmppysdiz7hud38',
                application: 'id62ufya6rz56yzmnm878dwxs2d2wf7rirc8k5xxztasbs7omj9pbh74hmdx',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'w03jgzxfxe72vk6820ioht7t4nh4qfgig7tv8q96',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'dz1audw4xqwl9cp5ze7sebgr93utpzhytyokwjg8yj41vpcwjz',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'u06mwpqeqwzps0l2k049',
                version: '6d1b99v9l1zllvb50596',
                scenario: 'lhtnbqr1cxy8ca83mxi05ul2njd9p6e4d2aeije2gupuzeewauj0wqte7p4v',
                party: '50wxd6k31i685aek30i9w1uob9cc21r3p2y0bi6j2qwvdob0ack4swv43uetj73a0vwsv7hfkgrq80800phi7kwmw4bzarquazmd9cna6ycmw8lysgpnr25wne740hnnjf5cu3i5dyevuit2ts834qn7cirlpv4z',
                component: 'zg69wutwbvipbel0pv2tgn44ilrl9mie84fs5g2qbyzg0xps7mn2iiljp5fk0w113lktbquhg758rioka0hqzf8pjolns8et73qs0g702l692gp3sjxuegy11x02fhlxv9mr7hhjcqqtt715ud66w2g3pxk2xmc6',
                interfaceName: '9qti6triwrvli4sierlmlqb6pnu7y5bji9z2m9dupxs9b5ygsoaqqp05n5n573bkisd8j4q96tjysti1enf1pfve3aq723ler37vwa0c70ry1a1ip1bgcyzd9wgwgoyfc21327n7brwttff3j8utye6j7pwzntue',
                interfaceNamespace: '1g8g28gigekb0f3h2t2lw343pt0ena5d38di519ytqpw0o0j48olqobz3j4cj5z9wppse6358qjs33h73jeqq73llbkbawq6woyyx2dhos92enxp792w0lh4euv5b62zrp2cn9agtg4xhayjdh0t7pe95bh3xgt8',
                iflowName: 'd1x3jzg7rfie21b1huoq4fn706nrtft93alah2w2hhxoaun24ipirvpomkj4ms3tqg9lv833ejzf8a6w5zey5cu9qr7c5gjttwks2uch7qzz4tm8lsvihomje4xgdy6bukqsgfb7skfvc8uqhqrxnrzmpnybcw5z',
                responsibleUserAccount: '0ksaqehhyfwl80aa7uhz',
                lastChangeUserAccount: 'xj9rm3a8v539l4heoz5p2',
                lastChangedAt: '2020-07-31 08:02:06',
                folderPath: 'lh18ihfgsoszw1t6mclyzr15n0ila71gd2afi9xk3wsnd6cozw129ersuqj7v3z5vgjw69b0pp4rr9n43sjh7t7wnfr0tgcsgmhrkmby9lwqi80uhi7k4jbeoexoy84f6mv9w0810w9ovgdv0sx237zpj0k1o3nb0g9wk04n13qw7g2zfp3ojih482txtbeg341uxlruj7thgktco96b5bjy5nwvjoo8w9dhbbfvcc8t15j6oafzv6lja269r1v',
                description: '74vb65yp3rpv3ki8v627f0ivibd7bs5j66ymeuutp5jcabk8q9un5834dxuxud9pbh7cutrg5co6ncplb4p03gl7p7gr9ev2yzqs0vsvy469djsmwzmo6vq1gw61r0l42cbdyvhsuek4ltjziphdi8gjqj7oswpbhacgqhhyhdfxgm2xkvqs5iwkndae2x9i2mrq2rbru5sng14h01rrobcrulm88eyj9pgf06eczcfw5mtk2yfsxn6oy66pqzs',
                application: '7f2d336p1jvmermd2dzkcn8s67ngpf3j710vqm4z4rbx1mvh3v1zh88et9w7',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'ecpqelm2qxh9apspvbco4b528olhz8663ceuigjf',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'wxvpaotxspaakfkublx2h33tt05zntq8vmibx5snv3qi9zsn2b',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'ijxyfryrndr8tdi4esgt',
                version: 'el732nwifcp2mup28okb',
                scenario: 'rlonaitxz0d9cbgbk6z1mj3fyp49sm7sonoi59u5vnjnmgmopulid1v0h0ya',
                party: 'ydjmbe8b8ldzlcn8jk199vqdz8g2wn9dl8feoj9q4449qtpvqc930ync1c7h26n8peu3arap0iy2qwjciv9ymlnh3i8ccelyh113dhqlgj1jza92eenmytid5zhlwf919xe2sh15ddb4w3yfu550aswf3siu56rn',
                component: 'f9i7p081hh6ltm1enn5yqzzbzcsd0xnpdy7b63phks2av4b4atva12gib6af4ci1u51kx0dx11qmzgkcwbo3lf9qh3mypo51n28noadooyckb52x980lsqdsszg9ac3fhg8i7vl1bvnqk63oui5wxisght6j60di',
                interfaceName: 'me70gugqy2lpvl885l4hzeeml4rww3qkmqg4f6nbyxqd8kx316qxi45uffbmatv1tnbgyms4jh98bmqft2xyzup3wr5jyxwa386b9t1bt7xf3ki78hpu2fdqbb3yuru70zyfmup8ctmm4r7zx1anqm4bxli3pczi',
                interfaceNamespace: '3zt12rb9bb4dxv93n59oep9e9sfu5wvzx5akeg5yfy1dksem3t06em3u0o5mrlh68cfnbeue4dxonasxt6kuwecx40bij6t21rf39sd3f5n65usjky26w54o599fvi23cnltkml4mtakew198yb3pf0nofopoba7',
                iflowName: '2b8fpn9b6f1gea9wrvn4yilpziwfieyyjrke7zz982eitj8ebv6xvbujm0jrcm37hpq4nt9pxdx9ywmn9gu1n3747dobcy28vnxaym7vzrob9i8g3worv1v3mua5gitg97ne8lo5r2cn0orbtejolj0rw242qyno',
                responsibleUserAccount: '36zmh2appsvllpjf6ruo',
                lastChangeUserAccount: '53ikex5shq4ebggkaxxl',
                lastChangedAt: '2020-07-30 21:55:46',
                folderPath: 'lx0fnft0hzi86h9tuml84aalajc42yygs9bwlr3jrz5f0ctq1r3z1v9nqvarig56845sesig80hucvpztcb4pwug4yxgrw4z1um8jxve5r96wqgjtsdfbidw9pslm8cz0ltmz62prqikgka2w19ap7k2si9yctouyfv0con48hawexxnq1g3654kt53hplvzsz14xsqbxcvsf0ds11on4b1ndzwp2qeixdnj1ba38q6zeq5xvr7cwz6j8p2ag0no',
                description: 'bdj9nv442she03yzuwo82wxt8cji463qt3bzcakgrf845gyfs6oeaiyc2rc2826bcxt5hk8cfcdxxkzeje4wepvav8tfgnskob3ahubwkvx1mm8aruffaddd7tv95kbcqwgb1sl2garcyb6ja6twmb44ix7a2atsju3zodbbaqdbxh91gezn4ykeywzm76ol83pj0r8jo9mjxaqt676fpzzh7b7f1ptytpqxirzdqlkk3g3cag2j8x81k2p53eq',
                application: 'kzs41tesz39ezog8mix0nzbo8ca96vlk8ybi6sr25ftj3nxu2tn1ugmdyo66',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'masb1ylfrsqictdrdj8t76cqmtgwi48sh6l3xdp6',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'aifm2nr2l9q11jfa5voys73furfx40jqxol47uu7eq5qc8tvz6',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'oqqx8k23bvunsj135352',
                version: 'ewjpa6ecfounrsiy6zyg',
                scenario: 'krdg4qvi4sie7ja6rseoqkbaxlwnrvq688a7hoeh0zelgo2cyrlalnwcn8r3',
                party: 'yh8d6vb2rwf6dm0qslnxq9a78jdp7jpr8vlvjtac7o1hdh4sf40i5tvrj7wf10vzci1svhxx39sgpnjtwgnu0wl1do1upy5nuvx18nrdwd4dnm38uw9ptw6kb4hkzp671lv89bzr62botr7w9i286u14wfbvv2ud',
                component: 'jb1ujiai1p8safn2bap27a0z4ojd1y88jclu4ygjv3t4k86ljw80g28sgkjpxywdkommr6xhioilgztk70dtoj91vm5hciibhphxgl92rqrps92dh5jgewmp23x21842pusq1dz9l6bsm7mmo6zrzkc03e6or89e',
                interfaceName: 'apf08elrtoazdm8suumvbkwc66mf6ynckwoynk7y5001diwrdz36tydw3k8mfufc50qtkxbmz3u0opxtz0cyi48abtpjayw7spy1bia5xyrd0x5saijw0k9ynd5i6axg6jlrh0khesidwett87nkpjhesazc3hb0',
                interfaceNamespace: 'k4pikesyfi9gnsxt39pnvzka2ci4r2w3lu8clcbt1k2vfmru3q9f96fagspg2yz0bkbnbzk9urhqb97f3txozsp92a86cbmbbwmlm2h1519pxgkrq1tm118ijos5i479j8egbwrv2ypjynlphm3z6sssn6heqjn7',
                iflowName: 'p7ep6hkgme3fa0yufcryzudtnqqnefnxm39iw9u8cyoicxuhqer20setqdro5q5lr51urjcjis4rfnae7gxkn3l94urcbxgqma773obpi0656ggrb1ay97136ixvdsfsyjpfjpb2dq7zvza69i4u0hpovmjttyin',
                responsibleUserAccount: '0oxy5vm32na9yrp6jtoe',
                lastChangeUserAccount: 'u3f3x1av02be2m86csds',
                lastChangedAt: '2020-07-31 03:20:17',
                folderPath: '558y4tbfvpukda4boswr10q83ltj1bztpjna1shxs3pn089flbxjt7j771xta7g98hrhe1au2ycxe8u81g0u1ljyezepti1qtfhvp3ax2bi7kavy2urp08v0t5d6v1hamedcp70d9ko7wljazdm4o8et6hgtdoh4qph5m3xlpeojam6i12wqugtmyen28gsuj4xwqybxy3kwx7hnvinnv4vcw3jdgsbf4312s10fg67tr3r7poyfe5tjbs81yy3',
                description: 'bk8r7jz56ukwezlfg2843ie1588s7p1obdd003dln5nvpg43p9fs43in6px4h2zd3tzod0xcdn5nz5dbq4x6vpjmq28b3ga40m8aust9krmxkhgfww04ac001t17mfr4b9iuvjelhih4eaf27afkwdwdjw5udilo7jnk9p2lsx5bftnklhlzevkhteuwyhxwvd2lmu05ro5f941vu6jsxux33i28opp5orvw1jqnywrby72nq8aybj6xc5zzg5y8',
                application: '0jy2zeqbr7aybd3xj07c133vxf5f8acvjs9xjgqo8gbic0zps4wpf6yls9et',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: '1ihdea71wwq3gx8uvq82qofsbf35urkm5ffvtrhg',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'sp2nsxcxq4sp6nvdyqoavqk3mhpahu6tb01t6irujmq416cofa',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'kasu6hw0r8fk7ks6id02',
                version: '4e4mbhdnw4m0perpe2n6',
                scenario: '9mcjs7lvperi6ly5y4nq7i0tflu6ccbxfy5lyq2l75vwp7wkk4kp6n6boe4l',
                party: 'd6xg89ucp5plf1vqvd4z8f0ktge9ca897srjz7zkwtpckf359ibdfq97ay6gajzurhpbbqf300s8nqfkx6ykfdh2r5get2bnssl350xji1fhf3bqyhkh1whl8d0v0st0w1dckyzwf3cz708q73nhrewg0pbno11o',
                component: 'ftlzpmakawhomkizk33600esrxabbndb5n2fkzh1f5so57jftb4uf5ail8qbccghxinynmr6ktv3yzidw08be1kvss7p8i91iubgdnh0hkm2ejdihdtd15lthtw25jes1qgpqmvlt6kqhllk83j24d3lv2uoq0rg',
                interfaceName: 'n4almp7dimnwtl6pulsz4d33kwi3y515fidxqu536ygi1mrju5szts0ryvxgw8xwbgj27jyp49cpeo9fncnz9enrtf3e38tlug0fohqnlpgf62fn5bs4rp1w317dlz1daw3nhd2jcry2ywhe095lvgfr3v33jb5z',
                interfaceNamespace: '2b0gq6cat4lv52sfrts6ov2hs2w4qwft5zuar23zp39l5s3tgqiwsulwreua1wkiwarm00z1a5yuekvpwgdyeybd7ymxscgoycuam2dsg1utw1wsh7cgfaueswzrny9jd5bm5f0v1xzd5lblv6ldnpgszfmqvmso',
                iflowName: 'yqfu2t2vyzohkw7vn8tyaxxqilm4ixkb1nf7d8p13kawgcumb4drkam1szlguj208k0y2chd1fzub22osu31wrgi438sk6n7ukrl6kkbvsanmcbdrnty9p4d9l1ilpjbsvspezc9pectck5zlmyhwli0fiq6p020',
                responsibleUserAccount: 'nhkhuttk4fgz1b9ccis0',
                lastChangeUserAccount: 'zkz4ggklqqj73w59q0dm',
                lastChangedAt: '2020-07-31 06:03:09',
                folderPath: 'v57fl1rpx0gdkd36fcy1gmuf6ts9365rj0oqvv9lbau3gdhkxs36jp5hku7c4ezex9i3e5vbvj7twa370mqwhovz4wj13kdpfnvxslrvu90u2gxqtpkqe9ic34l9qoa897a3qxou4ouze9soct7j5mdld7dwskxgoxegrpn3lwqxso40kul415ypeg4ts7fz4ctrkdlmqf87ztr9r8r5wa2fbfg1tr4eg65xvapgtlhlonr3hqvylygaqz29frw',
                description: 'y9yo1frou9hc0ya71w6y8v6zyqjh6qp123bsj27ro38j4y8fyyhbxt92b4ji50u2357w00yql3ytbohs7pccg7pt2dl389me0elt67exuttrquqtrq6zhfucnze8wusd3hyiffutkqhfqpedso1ve5sbl8768828ighervfh0znc14pqet79q3b9sg5m88qbu31pdkfw6f4specajnlk1mj96wz3437cvs5gbyu7aees8t9pu45ug8gton5qcwv',
                application: '831etxw40agtcozg3cwozdrao9ljw8v3zdnpozztzlckcmtt9dm8ef6p5ads4',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 's79gxifpevs7f6vs7x63riki9j57wbn4zkgbgz37',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'mpg0gowoy5urqh2x9ddr7188vhr8w6z3d7lhi8nib42992uf4u',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: '9tqmxp3woagwwto6ovih',
                version: '978nu0xiz5xpis1s5a8i',
                scenario: '3bj7g729zioqjrw08yndyrpzytj35t1dghv0t0yp8roiebs1d7gku0irmphb',
                party: '0ga69pmbclr1rtxw6al0f2rd49jj9dtcrkxxw3bv6jdewoo3tqdu9igfl5f4bx7cyj226rdlpda6xdm0kzlb9ba6uhg2c1c7kzkek0lap399kkyhxfocng5pxq30w07q9t6ztdqxpdmyh5p3f2g53hmw77ain9lk',
                component: '4aq7a1dm7ddrm2ztue9pphhrkquac84ttnr4xotxt9z7u326n9jiavff5j6o1lw2i1w1mhltbwin7is9278gqsgu2zj3wf2fuetu46sfc2o7vjnhnrawr261o2x6mwe0d0dl36jwwffcyjpeumoe9s87pcui16ot',
                interfaceName: '9io2gdte66tizlca1c0u776zriwvd0bhah0m1zxcvk8sb5dqp3opjjjxay0dxpgm3r3s4ab4zm5yb75toy1jpkphogm26hy1b23t7cue1vhwy0ei36pfoscqxi166ye7eb6aom78su63ort0ezmf3k8sm6reo4km',
                interfaceNamespace: '7p7ky3nc4vh4k20i6amfhsepfwluecjvdafdn4s0bs3ng0xvtxkbmku17jcmtmhnhzgyajrvzjpafkyojfha37hyohna0x01p6lhvfolg08t26zc4g9h0b9gfsly0ff11nz4sf1fxaje3xii5n91hv8cp10py0tt',
                iflowName: '0l7ehprw8l612xbrw6i4ehin39dk5az8sc8h6cuqxhqdumlyhta3pv1q8njnl284g2ps9bedh1n3ck4u96hb9b8isv9m2puend3ras5i3xcl2ij70xbkx5rdpp9hno4hzlkmg3fxri386bbhb9azbx19spu02x0g',
                responsibleUserAccount: '883nd74wc9isx03t9rze',
                lastChangeUserAccount: 'w4f1boj373kmxovtyqhr',
                lastChangedAt: '2020-07-31 08:41:27',
                folderPath: 'e8tb955duxzyh1b9ec33wmsnmk6ulfgw5ma9eantfpv64yjuvxnktln3xwsxru4zxcsldp0dsn34zb1vtihv1c2zqt3ktauaw0yln8yca022llr7fe45f7jkpw3h97fah9ubmkac7by6elov8q0bbg6fvlcg7c0r08csynnsjpk43irfsd1ab7buoxu7bdugik49mjzqn8440zf8594z5mgn5zlghbswuljweyerpus7s8yui1wxi5f1m273jta',
                description: '4bgt5qeohlb73elmhy5nt5bsxnig2kjwofoz49f4qc323tk63dkno0rxqx8yevkc9yvz3pjefec7usfmsgtca4e1ryzg235ofwcdlxrt175efok5jh65bmqt0i552by6icoo2ema9vp2rryu0w139glxbylfis7rkm0e0khkdfsanxog9gg57evnyf78tg5n8766v9mw1dr53fekia1dnmij3gjt0q73hs0w07bgd2zamufohmj4q2vkg9yp3hf',
                application: 'dm49ozazcdfmu9v3vgqxwlscio9hkf0nhjuv86spopfn0cy3b6wikv51jkj8',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'tcb01dcanw6jn8ckinmj8nu7offk2yzza3519w6k',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'n43wxh9sofuoqj2vaa6948kdi35ofcgph1h17q3vgw9a02j5wj',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'nktvj7rrg7wccqm70dq0',
                version: 'grh1yons9qwlaoyxr6dj',
                scenario: 'x4yekzyqsopaowkcdbgnqbb8464spy2zwwe62r13z9zeadwisnfe9sc9j0zj',
                party: 'ovpf7k689hqs219ymwyeobyzfi60gzl2minzrdbw87q0p4dytwuo1qpxs8hfjkgl5k93l21mpbf1f2uom0sqw82eidp15sn5tr4iil48adbylmckv8njjxwzo9mwe4o8us34crh2dmyyzv2qg50l6c1a7z40aidn',
                component: '10211ro7hmsk6kxwob1iiyzs3wt0rb80jc9crp0eskjst1dhixgzwxbx17kq46haxpg6x2tb76ldtq6jactn9t6j4klodo8pc3ebbkj7unf56ztbkfpf7lbs1yyvvlvslktsl6d20rlp36nfucd77s1l88m44n2x',
                interfaceName: 'ml5es956j5eb9gfhm70s7042kar2e1x2ddrm7d8j4nhy9z21i2tsu0z4cbt8m78vzag62d48b5xuikytn9pbg2qkoosfhihb1imc1jpfjfblr0v6t5ivodfjszsjbmskgnk9t5tedxaw6ze34n6qgiq9ytn9dzx9',
                interfaceNamespace: 'q0qptps9u5i0f9xq9imvll9nmm5gfsu9jk5x2jrm0093vr6a45dqxijai9amfuaspixn46qi2i9aykbbiyt552fw2d59yzmy09ae0qzv4tqseuvzui7gsqupyacqeegvxyweiszr0m37xgbo8o8gvqukxigm29ox',
                iflowName: 'h789p6xgpvz0812l0z9jk79yuwbhi9l6ziwdy7g1kok8u1ktpys4b1lcedn04va0unx0eybxkwjigm6kcelpkq79w90rdb7wgpzj67z80c88xn0fvdfaixis131yidg3nqxtfmqrut4o81nmckog0fiddbqbgsat',
                responsibleUserAccount: '6jk5m6coat9k4tbcaaz5',
                lastChangeUserAccount: 'ohe4i3y00ne4ykvdgh6n',
                lastChangedAt: '2020-07-30 23:44:01',
                folderPath: 'bybrifypsx1fhq0tuf3zf8ndsi1b9jwzr5dnexpfgeo9p36zp7x33tupol1q7kam1nemqpcjjz1kqb4dko3ix7ml1riknjl1gx6cpfs0ek4rkav0596ulp4ucbjufs20b0xbewbf2fejwrymvnza1w5c3p47s945qwzuerw45cgd57n3xxvsnjftnx7k1nlf1tkgfc4103ms0xvdb5820yk2i288ss1pzd4wx2dwpxkilsu9en34jzkjcrhw4xk',
                description: '9mdl43vrbwmfcybi7vznditnrsb1pcjr4nhjn1yx73o1vo4eoewehrqhw9fjlymlarbq13o7sdnqqfkcpcl4cw82jud9enw5xvlkr8uowl2h43tjf1w6m56pmzazvox0a14c7v4h1op1diksn5xkeh2v6uei5fnyqbjdgcjdppfgiynj5a28fsh76h4thtppb7nqffx9pnwisjaq9hw1xpzjdg6cjp098706z834to9s02yjp1786slnz7oc7jo',
                application: '4mxnx7bf77z1brrknpwowxgosuzudjbfwk2amr7h5u42s983ks8l2d0dpr38',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'vesqe7o72xmydwmmzb5s7454f59hb08a9n6xlkco',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: '1597olespwi8kr36qy6d6bzglqun9uo5vosqfnhe6yjllxxpiu',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'l459850l6qhsnsdv0bsd',
                version: 'i0pz6qx5fgmm2hhtifif',
                scenario: 'w83exv5ee575toeplhk6yanlikfk4lyebwre1ekcq04mpp7u75u9iw7orekp',
                party: 'buknl2103hr8fde4siaadp9xo4xh12ukb12vvvquol6vkcfs47tu1y0cxfdp53e05xs2lv9wllknolttoqh1ingncjddljbwi0hskao75q4fcox5mjfc3jtmh1jx1aybsx1117gn5udz19jv9m3hjni60q7539y9',
                component: 'kk1revstorrk02zf0q6lfptmx3euoukh63gw0lwvxr1g4okbip2639n0pzxjbrzx0j49u0zvm4p9izcaew46jq0106g0l11p8hat79prxedvrp4yd8l2b4tpmehvi4cso5rjmwf9ixsf8e8cmkkkqkct0s3e1op1',
                interfaceName: '7ifi6f1vygm414ls4qn8idv8po2vv5htyfsrmmfao5f1qd7jfuyyv4nqn8r721hswror83jr1xh6axusd9eobf5m04m2c1y8on05m001rmdsrm2y52fttvlmx8qzqel1xyrjaa37b4569fa0xfebv6ciq9sx1d02',
                interfaceNamespace: 'xww43wegj4uj4rlaheooxv1w192e1ghzbcf23xeohud0uvplizov29vucspwylqx81kvy8is9b1l90lqqwda7eh4dob9xs9yrhkrjygde0t8cpy3bu0evlncvesflu7bxb3lbs21ys0fesxtpcugf6hz55vi22ah',
                iflowName: 'sqqm04jtv303ajliulpeknotseuy1l2httyzqvwy8284hna8zgifec83do5ktwy92j9beti53i3zdd3n7n6hhm3qv1ok23l8ysocetbjjmht2omml7vbzdk8mtdhcxpy6a2orrmet6z8yy6gbbrzxnaq4om3tw9z',
                responsibleUserAccount: '02kds98jkce9v2ad2xgl',
                lastChangeUserAccount: '2fe88dc5szpvbyykyau4',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'sc4rri5kobzqoadasbweg3bpc31z4c5k4z53iveumdj6duzxgeswoxw1nyuqdu91iabea5fvqpn7hdyyn9rv0qe00rxb8pj01jawb6k434ahr0tfjogfn1r5zdvaxm6n7fzu2bjrwf2cgme41n0iz4ilyhxrfx3acicghk931qamfpos105ghk4q8fhxpoz6vuld9c89wnd8gnv1ddlcqn9fynfpser4s0kastq6qzh8jj21zd9fsj6djegnym3',
                description: 'rocsocbykvmwdvwz69mesxdal7riprptdozxhrna6otjfhlplpmiuue71uivp8p55v8m5655e7qwtqqsehqc6tghizp1xf13zzdz5ro4cz0shnd0a71a871c2qom89uasm61cqp2o1xdbh09ntyf016tkgbttnbnvj8ma5sxjwp0fuw3lyc72p0nw43liq28fyk1wy1c3bfn79ybq3m7z6rs0udsww0jqsd6jm644h350sslp4v5ckejb6331he',
                application: 'o8g4hjtkqtquotfjm2l8v6b0h59zn51ifc9y9kap2qc4uio15faavayvmr83',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'a14vu60kpxituxuelmxgi5jg9k4ep53z51jtlq44',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'etsh4jyqfg1hpprlhl0c6w91v3be9wtrlsy34ccdzhoarhdi6j',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: 'tygsz4p78glzg1pnafdh',
                version: 'pmmu59hpxp25o941d9ix',
                scenario: 'qe7x6cavxwvmapm5mpabbf68xt2p3889hq5wyu2sj9egvno49z92hfj56ef0',
                party: 'fpelqnncak35ijzdrb3mgi2f1uabpfphkt9940uc2kgjdbi27lvxfwcx25pagvs499y8kgclvmkh140b5bsaviiibu77ai25tjh45bvs0r7x6375kc49ebjnuu8u8cqv4d45xihzfxk3m2lb4v1d5eo00oqm0e0j',
                component: '3roc6s81harkrg2puxy5ix7lrpnynpxw92lje694d1va34sskmuaobxtd7608zquxckfbj3eoptd78br9b12y2vdj7oxgq4hhvw6jqjukjv7on0w7xo4231vnq46kqxmnm126f3mobqqgfzrbqos14217apt55fa',
                interfaceName: '3z8lm8gbt6jatxjpj6dlpkje67hoyyyr25t22fcpr7mqe0w6szx18cz4ugv9ku6kxcv40pnmltrc4wdmuarnac20x2lbim2tmuspdymh0n11cq6xrey7efewksb3hxc0w2u9zcvw455tadrvv0lrxqkvpdd41le8',
                interfaceNamespace: 'qcaywjomg5zldy21lxprk01v82c94yyrs7w2kqb9amt0v7o31yak1cezrzsh56v2np04l12gy31q6o7u8qt8xfkw133jelz51ohw8cr6i4rudcgk3hxvcid1xze20nugc6wi6n8c3ltjzbhhei6nj9ryfsvsxr8t',
                iflowName: 'igtl0gqnxcpn0yilp5f3m16cor1x5z0r2m02ks4wr1rphhf2et023nujexj3j9hjtny5sobi3fby9g339em0exkv8iibv6av9a8dgsaom0xv2aaq2785kyctc125ueoq5fcu491xhfg0zc7t2b6q97l1jhnrkqfx',
                responsibleUserAccount: 'w5dbjaqpfw2u4uxgmyba',
                lastChangeUserAccount: 'tm1zg10uuecoslrtqxsh',
                lastChangedAt: '2020-07-31 04:01:27',
                folderPath: 'qlq5wpaqp34ah35phojkr8p1ij2kt5lr2uwx3ew2s7zgg88iqx2s6razo2ja3wnk5ht77akvbxi3496q3tyy7123xwrcu1sphjgyei6jdzh6jklidxtxtn072x5p5vuzwlph4mcuyo5kcg21207s1o7657zi39lej10eszxf3ao4x7ekax59x2gcviap622laoup42l7wc59zw9921lxwere26wt007hagt48nsl239m5nd82p8eqeai9xxyni5',
                description: 'wpbba7drerpxfce4hl5bojzfazt0w72pgr6eeazq9pask6bl2ajqycfn20fqv9whnbpmvvhaf9wuq5hc4amkv01zw0b43ptjvbcs7xqz99zc0lkhkolia2w7d6h8iz8idy1j3p3roa7c75j5bxz58fo3jqbt9wlcl94qbhnn4hj9ifwl690l059p57v61cnuwpzvuay70qmbukvnjeuslnzjpz1xkcaunq4vaqr2gvmswpm51nlqy5p5v86n9mc',
                application: 'zsgc8l6lir53bfo5v1359b7y7l7itzoc9ygac6e2fifzwclu9kw7g6syg3li',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
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
                        value   : '888ce869-522f-462a-a712-da58c7b1f70a'
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
                        value   : 'e9a9aae6-f0a9-4022-8682-4c8e0501460a'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e9a9aae6-f0a9-4022-8682-4c8e0501460a'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/860894ae-0916-41b7-ab06-d7c7f26c69d6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/e9a9aae6-f0a9-4022-8682-4c8e0501460a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e9a9aae6-f0a9-4022-8682-4c8e0501460a'));
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
                
                id: '3bcc769b-d86e-4720-9c8e-d950ce685ce7',
                hash: 'dn2fsrpbqsvfheaqtqtx5ilxpf1rpc3owj2e4ql8',
                tenantId: 'c597df7b-364c-4beb-9f95-0de4e97a4249',
                tenantCode: 'foukheo0k9qvy03dktalkyfspoh4gjr2ey7n9dzd32sitil023',
                systemId: '2741648b-a49d-42e5-8ff2-34f1578eec76',
                systemName: 'wl39c1j90alwvy13q1t6',
                version: '4rg4dvk45gh2swgbuwxa',
                scenario: '7qwx2pev0rsu7cxmd0mjcgyujghnqfiear674oh4dgvagj0qlpw0quutlfkf',
                party: '9q86fap17au8tdesfw1fmkg9l815cmnrxaxp3fgydfcjlt4hwbeik8qybj7s2vhfkjhvdiellcmx3kzt51fmufdd0hzfq40cw5j1vuwdweeto4dyg7qgtd8omykvzav8pcupzplqfl5bn5xskxhazx9cjyllqxp3',
                component: 'i8t4jguwhuilqs97mt9vxvdlh7ixsiahwccl7pumxt5sp93ft40bhj2vxiqaosu3rnkfj3y81c61gxu218zamw333eg6ouxmoukwy75pns9vp2ochtsfusj6xgl4fk7pgz5dsygz2bmml1vd9igmcc6exbyyx1r7',
                interfaceName: 't9a2myypk4uzby4pprwexq3sbd4h8yljmys2wjj5ieuc5q5yg6wjeob2wvjno5vmc0jmsc248ym7k2a8nu59yeaxyg8xvg1g5fbcc96w82nin7ensw89y1o6absc98i3tprfethyvu6ysay6lxbe50wekncwn6qy',
                interfaceNamespace: '0skqzlo6ydn0j9ttw7o3h7gzx7vskxn9lmtg3bdb6icy8sb7ztm9bzznaii5kmsd29hg6fch0tit5so9bbv9xk33nouu7ctgm1dz2xaqqu9yr0smsro6aqkotzir9q8zhxl23pkv7bu64yh1olth0xxjs3nipy1i',
                iflowName: 'mh5zeebftfy4lqt5y09ruf9uelj5rzqmtmqtzyqzurq4z0zp2jji4beouwvshjq0vdj74n1wkv1l6p5z67togpl8zdi2g3zjlp74k1oj8mxb5wkh3rsw8rmwwjve6sqv8f5729wcjgudh1bqrihwi5b971ecyzh3',
                responsibleUserAccount: 'be925s43nhnlye2v5y64',
                lastChangeUserAccount: '9ratyif2qwsanbktvdw1',
                lastChangedAt: '2020-07-30 16:57:40',
                folderPath: 'vd56tdl5hw8zpvhqod673b01akjwy7m8mdglyzsqsxv2s2ytz96y43q08o7d3qqms95fi12nnn1enp7vuirx0vttv5865xqboimkub9vu02g6flm2vbbvjwiobyv49s1mju13sjmsi8eiwnyusqra1ie70w2ggkt0ahbaf146crnwkk54y2r52c5h55zi7ijq2npb6efp77grsdhh77qhvyf5q16ywil15ly97j0ty6blquctsb9cdp5geqlyk4',
                description: 'q97o9l7x8fcgq4lnj3vhg8qxoojjf0q2ngrb15n2h4tor0xqwhb8wuxqdutxendyujmimqge9o1swy3c3getjdblj62701doulbu0d8mpeir7vbco1o496f1brlrul4ef6wgx66cblhfd2caxgmr9pz2np9z9httkovyt97xuuzc3fce9rgdljw9j1eunldbtt00qhniz9sesjr9z8yu223e59txz6xmrth4zylqe5cl643u7qlmcfs89t4n7nm',
                application: 'avht3fev6wa9qd5njrq7r6d7628ijihkkdlucecan5ts5jh4w4mc46x03rpr',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '35fa2bc1-7721-43e1-b389-4038e0e2ed0d',
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
                
                id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                hash: 'si71quow9b6k04s9mfkdhac508a64n2x16vxb6j8',
                tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                tenantCode: 'svo0fhrb5a71p7xfa7xasvgjeyrlam9i7f6ugc0kmr0kb1lefn',
                systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                systemName: '826z53zhfjvpf3traf4l',
                version: '698q0ukjjy3elqm3ax2x',
                scenario: 'nnsk7v7g571o0ojwelm404cauy3fleap05stm0zov52kpaw82skurgq9zy2w',
                party: 'nvho8jeqzadmkaekyt0kdc3wcrdfh8egc6cgd0c4pni3isxj7c1kbgtg2y57m5k2eyyhqe2z7kwtruyq9xh1uijb5acoo5ub75b4f2zdfob34capmpi4xygba6hubi2zw6v0o88yb7iqkv2561tldj0dljcdeoi3',
                component: 'u82ln3j63k70snpe5cfukb4m8r56z1sqtuctpx0f3g3i2zerrpcckpa899ioea6un1jax94fyv6vjlhbsippwfzztob000e9d9lxwlxrkwe0hvv0ha5vg6im684h9ka99o8ul8r6nr5o6m0a9k4foeqkzv5iqp28',
                interfaceName: 'hat3ocshfwly7mpdch9tx5zzx0d1fxpjy50i35a2bs3a6wpxqihjsnptpsxdh7hu5tausuzduwqz1hnbwxf6gc2y9wc844o2ftfdj91dxnjhpx93p0fdafrxpoir1sqoiz94cgfqvqk2bch4bmzr2p6dgph7acm3',
                interfaceNamespace: 'ue8s9z389fn7n9cmgtgfs69yyq2vmqt4h1qj8gcaf9vuqaejzzcrf275uc7972ga19m2rbk8dyj4h35n0q61y3ir2w22huiy5ns6ocxdytjg8k02g9nmzf6h0mmizza31p97yd1urewoc3j5bpzj7gea0q9rb4km',
                iflowName: 'bndgpzg421oi69a468kfcszf204bia3dlsypnx6bh3515y2w1kkbxbhgpza16g8fwsnb0p60lgl4dnvgwsu4bdc9wdsnj4gnlwdbqqfoyddhpr9z8pqj6x42p3s2ftmknckos6zl4ygbbo8xd9n5lkqq0yelxf5v',
                responsibleUserAccount: 'a13o5ovx79kmoejicupm',
                lastChangeUserAccount: 'ojk46uvimp3byedahbf3',
                lastChangedAt: '2020-07-31 06:16:23',
                folderPath: '4l6jbjhtr5im0r2642hc8s0uxnk9mmf6anxim3tx58zo3z43plttwcx04kr29ql3raevscu0pbuwwg4ukgf5kw9jlocvg2ocy1lz9gogd9ly5wv7ir6t9hgaa4yhhyzd79xthst4uiujuifsg5p4rzhf70qizf8m2ipk2r94hg45amn5hgikrwklh112d4g9j8p1ikuegu83s0zktsowgqemwoyf6l6ums8r6zva8l1debaqtxm37p5hoybg3d0',
                description: 'q6o4psnjkkyi33kxk77k8i1r8dfwrgac1uot4vlzgin4kt7yi5m0xep2ns705ch5kzdbnr5vqjevqd459oehpgk4ib2tjc9k6k6ji1wsy2pbv48dd9nygki2ts0kp1d481sabkfjd6965j1kppewfg0617z1zbaqwsxgkt9nndcyvleahwo2abcyk7o0rk01zmll49xo8ka2tn6hhov9506495xewc1i3dgm4l4lb7pig6c49c13dnp5te3yam8',
                application: 'iuei72b53hbzex7qzhmrzcy5fhba3ikdo3ofksl0jy29kw4i0sm952u3lgmt',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e9a9aae6-f0a9-4022-8682-4c8e0501460a'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/8f5f1c3a-c692-4ad9-bfe4-32b6e4404fd5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/e9a9aae6-f0a9-4022-8682-4c8e0501460a')
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
                        id: '7487d1b1-2453-4a4d-bac6-b903e43869d2',
                        hash: '2x3savmbb2kbug2f2zoftj16c5onw5tn8kn3tkay',
                        tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                        tenantCode: 'aiqjsf9ugx1q2mg55au18i3sntfwovdxfwic4lmvzynk7ywwup',
                        systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                        systemName: 'zjixxfwxt5meiu9oml6q',
                        version: '3gmusv5rutuzkssvq6zc',
                        scenario: 'pb65eubzhk1j7z8dwgwy8kt6etkmp1u19usfqsc2z607b1h3cppoy02w0k4t',
                        party: '7d8efnhg2c97rl743wz34pt3m4pb3qngl8pls7ftoytq5h3gnn1jn7yjikbqqry8jaqjk0q6i9pdkrmowxb5nyota772de8t5xbtb47b8qghai5pblyeb6anqrjo0qgm33wlukbbfp83osplk79t7retc8mtkbx6',
                        component: 'sudj78kc41p18dp1j6wo1edmedfwoszr1cvyx4fv32nhske8viahbclhqui1ap8k5vyvs7ayasxx334d0kspxvaa1bsztuvcdiufb0kf3vwd2qv74eaklsih2kefbbu5jbcoebohx145ox63l8jtg34871oebgw7',
                        interfaceName: 'j60gem61e2r0v5lr074qxcr0b5ri6mw2kduxuu2q7m4vrrrghx5von9ok6s7bduz4vrhg44knlk1qrm2wnct2ybcbg7ts5rttgb347260oz0mowiiin8tzzuzi7ekhgbsxqsjz0hrb6y59zchu41d5wlldzuxd27',
                        interfaceNamespace: '0qem0svsznc8s9m49ws0j2e3x6rpom5qmo6hm4p3a43zjun0tdui5u508qryyg0j9bhv17r62p26x6a1qz2488xomr03m428qcu8ntdb7t4m7zktphjxlo6wqsz0awxqn2zlxbp8qyo3zwy7eotyo4qxg8md998l',
                        iflowName: 'bshns3g2ss3cmugjge4hvgrl0elkq6ty9knejalf9gr23ehwqh7txpuzwiwwreqt3oqb86c8oerj3oa0fv5ylydzmi2r4jof90uswfdacm2u38i6ung78pzi28oktq3t17t1jpda9f5e3t9wcaeexio0dmjvbcvy',
                        responsibleUserAccount: 'o5yh5t85tm1u7dltpwjp',
                        lastChangeUserAccount: 'w2clsc3j9a3tbhnlm03t',
                        lastChangedAt: '2020-07-31 03:14:09',
                        folderPath: '7rxpn76xkx7urv4mteprf5mi7407ui1dgvq4a7mk1j5vqwc61ivrtnaqbydhzxlxqzs2yfyrt98xjf9qd44kpdqa3szzwk3tzlfjm9nj4603mw0iccrjorqcui7r4vyei0zlgjygsc9zr40zxtmxwp66dvf9d3zv04gu8wl4lq9bqdj0rgs3fiwnb2jighsas64j7mtu4ypnuzvghrrghihoeeof4aqbnggwde9fw4bzc4w973d7t7fnt69xz2c',
                        description: 'jhl1uthsng4hvsn9s4rrz865hrsfz4iov8j0rc86kasvee9c2p16w7fsltj8f8mhoxzh1zv0ihkjpqg8536h47y5yx26pty8zaj8e58ar3e3mobmp9iozzafcblfg1l8ze9swmkgf7hvuux6e4y69nyb6whl4zvptpxwf0vmmu3z7zgsj99c7z03z1nvf2is7b2p2p6r0ldqgkawwf0n950adiq1zc69fj0cnn408z9au4v0xl4vyjoejnz3v9l',
                        application: '7mh42goc3bv1tjvke3t5vs70nc1pdbskn68jkpqe8mezb9o5pvy8aw7ejgj1',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '7487d1b1-2453-4a4d-bac6-b903e43869d2');
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
                            value   : 'ca174d3f-9d3d-4ece-a353-de22d637ac36'
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
                            value   : 'e9a9aae6-f0a9-4022-8682-4c8e0501460a'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('e9a9aae6-f0a9-4022-8682-4c8e0501460a');
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
                    id: '1b56e757-0b99-4db1-926b-8750636b0fec'
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
                    id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('e9a9aae6-f0a9-4022-8682-4c8e0501460a');
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
                        
                        id: '98bd47f5-467b-4cb4-9ce1-e8434c52624a',
                        hash: 'mn38lfcb6gysy6fiox2gb01ammk57qnlggfh0kgq',
                        tenantId: 'bd54fed0-9277-46eb-8611-1b943f205b29',
                        tenantCode: 'i0oae16xpq840oc4gq42e9jchf0hgxkjnabw5kt38iiwbj9lf4',
                        systemId: '897f5bd4-0c70-490f-8d99-a01ac5c6e122',
                        systemName: 'h6she32gpwhxcehm65gk',
                        version: '0hbe1eqtyifrh9aw6yy4',
                        scenario: '2rivu66qw0gv2defszc94ixtfpxp35cd636d1zw8nbsnpcjrj6unq9xzqrb6',
                        party: 'thjh8kuyyqi2ai4f7ninp5d9clbnznhd0mbe8ksv1mcgfe0ba1icvq3plijvwr0k7w5jtqv3atknl9a47359rcdev4f0hw09fhtbpejjrjgca8dbfimk36vnmh39nfsmk7yuie7jp70ui8zpo5r4n0x7lidq3oxb',
                        component: 'j9lu7caaask4d9md37golvdvhpjrpnyt0yxe8voblmrnwlqhxuoicvgu2sfhcmrgombru9loy4m5uq3210tzag0rquloqj920hx5fvp3hrthi6d6bfdghq49eetdsd9ka12x4ba880o8uluqkxamd4w6vbmoilcj',
                        interfaceName: 'uxakhb4wrs3hnrtfo8f7cindps57t3g39sarrd485fzsusj0cgyu6l8scd8f8n4zs9zlmn03o9afq39ye4ulisolpromyh8bvk3n9jen8gkh3qw95iauua5637okhqymokhobk3rc3jamgarbxr403zqhyf4ujkk',
                        interfaceNamespace: 'u8p1btftqllcs944vzhdyn5ywlypqs37ts7lzv0d9hwowg1m2catfl2y55yip7h8156ivdjfeyc2btjt58160p5eiok9udbw3h7l7ijp78w5utwagzfvj5gwtmyhcrpg2qpsox74vue5t5jk9pvui38x18xrovpw',
                        iflowName: 'j1akfafpm5zaycbwdu6udgzjy46erqeglcotl37w9h1oar85t6ihfmx0411clt2y54lqhl0nlorqdybl16rdkywsfgq7c8wog3wn6m49quxm2gizrsgj6jc1ayyuq8pl3szwtehyjrou8jvrizx283j8k5fgccuo',
                        responsibleUserAccount: 'xkk29gqiz3yixf26wm15',
                        lastChangeUserAccount: '3ua1fkes2pxoawrhh2li',
                        lastChangedAt: '2020-07-30 23:52:14',
                        folderPath: 'oop4sfvtpy7j8i68ry3jq8ve9jb3uu14vsbf61lsl8h0efdnnsahc3se5f0k3azhyn4ssh84up7716pzg0ic2gc12csc70etoeehdldkgpgt0b67a4ztso8pla6bdpdvh284riku9t4me3ifwcjvan88ai1q1052q410cyfksryphikaez7dl10do0lod91nlgqweyvh7l564q3td0nva87swbxepxhaewd2avcu1nxfzwa2f3fcb4hyzghzg1m',
                        description: 'lv1fk1g81ubnw4wkwdp420sacyjqx3xqgb09czyxbl764suclektazvrpq82za623c2bumdwmvzv4x8e94cyv0neutwv89wa1b4ybm6zzivkzj75ipdjcs9aokdej41pnmfjmnbpcg0me40mrdt9ubnwp1rc6k7g3xa1iwspqi3obkfhc07nslkkp5482zduylouplfv78tpe6nn6ufua1hlgx09evk4ee4qojsfu870siwmqqqmi6ws08ffq38',
                        application: '80a6u49retf1yz1axje74je8wm680rdqqjjgqwy4thj27htoyo322enyu1xn',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '3c1767b1-60a9-4354-939a-e320a9e24dc8',
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
                        
                        id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a',
                        hash: 't8nhhie3hd0aaihrsbvlyaro6hxa1ghbkpi441oz',
                        tenantId: 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37',
                        tenantCode: 'tjo5eyoun2mmht5xz0f2gmjw891r8l09mwgmaz3ed6e8jr5wae',
                        systemId: '7ebcfeb6-6479-47f8-9051-506ae6d3872a',
                        systemName: 'h80c5dkwpc8g1rgt1l0b',
                        version: 'fo8vfmxpwp2d2jqtdgq7',
                        scenario: 'q9d4yu3kfr3y9o3ejarew8j877nrdv8gla5n0bq4lcc7b4e4wv15gsm2yoez',
                        party: 'freii15p3oj33n40xsfo1ivf1eozhs012omqpb3am233s97i5z5u5c0jdl8rven6l6vu29mu6v2osfu96z05mzzqayp07s8wwvew69chf5ivcbu2jpbbhqzqul7i55b98rlexujtcly77ox58mjdbkq1bcyl8lxb',
                        component: '2i4eu4pq96ct4u3mn825xbjatr45s5wy3ayp5mxi3wbf33hdc3l4hvduotjnmv5e4gkpkxihs29ginnxv562c49vq0srbsrhdc7oey4otj1o8iqxh2wd8t8iqoh6kjek9iuti17ds9vezy4kzhpla8omi5ex2w3s',
                        interfaceName: 'fqnww2ndqw4r0yv6hsmtaxwi7n942uv1o44u2ni9iwwrfgurybnlfdgrckfldszslxb7npjzzh3hnvohmxlasa2u44plz04p87syc27dveny895bquhcgavm5sqw7hpgrqnudgdkot0v159qxobxed7czyvay93y',
                        interfaceNamespace: 'scudid4998f4veykxvl8f3dbf80uv6ls9q17etkchr2ex2i4kzh0hgvmocgwo3nqdyxpbnl49k67v3zuv9xn8rxzkj0315psi4k466ph9bbgz9x83ygujhlvsojh8uvm87uu4j94yhk8a57zki13sro8a4bs8yc9',
                        iflowName: '1d77uhc49mezhfmb53h8b67rwv1evafrub8p5ba58p6w1cb4a7qz0l4jk0q9kmce436qmfw8kl0fslz7mneonf6b6b2zurfm9zl2oizeypmzk9jmzw6jgujgql8q174mkfj3vp2s45o456fw3vorhpg4jke2mh16',
                        responsibleUserAccount: 'nbine11smqdpsqjedqjb',
                        lastChangeUserAccount: 'tz6afpxf59c2bfskkn7j',
                        lastChangedAt: '2020-07-31 03:14:01',
                        folderPath: '4yhaibxqsgtxobuesfnp955tk851b9pl9ewsi8jzo851owqup68pivfxcnqqk1qeloy5ak7ee0tpaj57h3jmd484pijv2b1jcjn0e2dtemh1yodmbpd1lz6yr65iv4t0xdql2ycowl1xxngch25yuh5d1aift9oyif3xpt64u7vr44erguaudnbki4y6ckj5rdndc32vbh275ixl7359xdnct4e71m2sz62r2tx5jw96urwhekevjxinmcbfclr',
                        description: 'k7ww1y7bmbcco5r0q0tvq65l1duhozof5h00p8pnwds9la23e8z73y986x70c1cpmfqa8ayxj0276frvb2no1hbw6ylb6l0w6179en23zijhcubffuipiidffr6hkicj4v05arg1gg456kko3zmqh4zcj7mmfuyrysvm207s4dazmv9b1k8kjht6xztro5m3rbm1h8r3yj93sewe80bnikgbn6dohrz0jhqfn4gk52rhuoghan9jgorjovhzihd',
                        application: 'w5jpds5eq6irp16app1h3egkp69p696ac62o09amd2x7qfvc4zlms0lc2z0z',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: '106d932f-8e63-4b49-a441-13aec0deee54',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('e9a9aae6-f0a9-4022-8682-4c8e0501460a');
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
                    id: '5ffac5a1-76aa-4487-8fc9-ee1532cd5bb1'
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
                    id: 'e9a9aae6-f0a9-4022-8682-4c8e0501460a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('e9a9aae6-f0a9-4022-8682-4c8e0501460a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});