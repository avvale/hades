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
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: '2jy3rrwcmmv2lq0neteqs7kf1c6tz2dbpspfaxueavlfmf53qi',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'i66gvgyyum98xujvqqtu',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'qti8odz9x6lyw4om8ofnml6cgnuwwk794objsl9tvmrpyxxyavjse44skymqo0r1wqo25wrzn6kysw3hjpdvptakd1ursa84rw7hjt60vnmq4i448t1krtpywxwniqa7rcwvv6n3qw8yqz8gsv8dq1tflqncedhb',
                channelComponent: 'hosadedi8m34h1xnisf85kf2h8ymti7rg7qbzjt7gmw0ht4phbod8k0ey4w7uti6ntn406i32lrij98tgwbap65h3011ppsndgoxbxvjgmgem0wkqsz1jdyj0xdj3dai7481whoa151az1a1uyj0sewcyrwq8qgw',
                channelName: 'bhj5yf5ltkydtul5h8dvpo87a8pogoibc1mt1lydrdsm5rdo8do027vijfqp57p4r6u40sbeone12r98zr1wq6jp2fkgwtp07irji6on10l3qswmp73yyof4u4wr9z1rqu9gb7zi3mkrnmbokpr7mtzh24t30gym',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'lskol38dvm9ousrdibosu8cucjok7csfza0ujgvwp7e8rll5ukxshxm2pfg7nfvez4unft2otk3niqghd5a347gtcqawsia5eglbykniq1y07gcg4ymnu4il7u3vls6a7mzqs9nrzd777zbyb5yfk6mbmwjcu9fy',
                flowComponent: 'q4l1eteemhspqis1skollu8hpjgkfxccuy730p44vly6vc31ve0nlnl72r4q3lcc4ylb8y1bvf6yewpk6zyp04vafv3sriun2vmvmqmxwify6i0u35qa37l6dhrxcxj1yuys9zbvzi1iw2f0bqw3th2tpafmwqs3',
                flowInterfaceName: 'dohe5dcp2rda2s98xm2ci03umw2rtno8fiezg0p9ew6lhnehuyaqog2b5prtmsvf3cr934ksjj67mef1kzuttnxtwhzq4ac88gobnylivl8wkkymu0bwxlxyke0n69dc0ehbyouyvndshhoetr96n8a8fgb75jeq',
                flowInterfaceNamespace: '6v8kh4qxllxdvw417wyx5okn15g152hfuglc7gxc0wl6us8d0yceoqavqna01y28fjyoj2om62iq0oab8mzl3ot7ffoxpeupc98jb8n0mr261x5jcpdfzwisnjyiozizn4vpcfkoloea95i1x7vn3nluefig6jxx',
                parameterGroup: 'ng3nythecoyi4y6ydcv5o1g00d2xeejl84mybs8nitz933ldpie5f2ogcnw45xpw4rnxanu4tuosl722u6wtndx1plqead2ti1la89onysx5vatu0jx3w42moqiqzjzv9ihzs5qokrfcdpjpczzrs2sk112yyk1q9v62suczr2l9myh7dmmy07m4bfcnyjtaoq93zzorya7re85jb3nry44px8ixjfpcvsszid7fac4vny66rhw3uq4xeax4jm3',
                name: 'bibvz09zfkmwhgh57hgqnjie1t85dgidqx06ckc7y72rm9dnsjray7ejtsq63qcb1ikgvtgi2gyw9bxojrpazxjcnngcvauk7sv4bh2p3mg46b9yqfy3wpovy3c8kgg4lgrmptjy221vtkiw7ghnl8j3i6m801snh0lsqnt3e9tjudw7z8ykv5o4sog6m8zg5xadpi63t7l0s048s1nojrp5idzsjkzi5y4jcvdnbx6cbrxvianmywjikinysnz33pl6ls0qqkojccjigyej2metckqh6amv2suy9l29dvd8r64mqal2yd5nz8k9fmwh',
                parameterName: '7rfua21f84n4sn3udkg7ldk6ffc2l3w91j9once2bz2rzt0vvmwei2th616xw0djy1oe3gq7j57aql2c09uwmlirgl053spshladet6nfc65rb49rjic1jh84j0s7giz8p8h2fww5inqylklsailqc6f12x4c6br8zh2zvjdkoc5fv9btxb46uuiosd4ksox9kv2u2mrv1f2qgcsmp3osmm6dlf5je9lx43dmyrf96j4qt5vtwmgp2u0391np853jvaz0wo49n2j9gh01eks937y1arkkhbgmzhq68i3t1ubgev0q0bur9dcyuq08rti',
                parameterValue: 'b3gox4n4p9ktxcs86msis4mbqijkcau6ai88hjct6jfmnua41f2m81by6jx5fnwvo43f6bqtf7ozv0et3s2i6ompbi1oonnkkguws6qytec5nw42njcm8lp601fjr30zq3tuuokdza9djzwwn4myvvxcwyk9ud25pm2jf5c2otri0h1p9h5kj0fwcc91ac8b709poio32br30sozjejoe5l0zrm2wjxv5pu238th9onk86wuj6fggfsdd7k3cxolwp9l3k66uox2bm5h9k6yre6pbdq0cschq0oif7sfmjlggl8u1pcn30q8fmrvpq6zy7ugx7otg285dlfdr0rdmtvb5p5hxqwrwz1avm6jmy4vghyuticklip8scwf23xob84pbiofjndedsn9nvn3erphpq4fk9j5no5dei2fw4sgb81ow54ff4mg5gxog04dqg5unnobma7qfzenrasmfsvylsgf1qc3ax3c7t94k1scxp2v4n9lckp0nqgvk4ash2e96v98hg9nfkxca46090ukakqbeehd5iidr5j53bnxp70v3zxjhyjq4y4unmjsdu8gdqjykije4tyix4kwwrafd8wi5fw4q98cgx22yvcv56asv13so392cj74n4ts7i7aru39v7kco89gcs4m452p0itwziclo3cxkz6739m9b7cznrv3ejk6abjrolzoug2xydm393aksle5so7fcg5yy80koaq4vuu745mm6okpsoos7wb31j5zafk8g0c7i59pf8fgh0lb3p0ut9q2h8ifsn3ubmxge99g6dxzxozh3n94u6n8aun8w9vtrndxsz6h0nz2c6esi0njm4e5ua2hp9domkv69pyimmayhvirlmzgnoaavy987txc9nmrjva5xkokztivdv6xl0o98qfm1hm8treeoky63buqdtc0pxxyfjh89qxvbucm29g7nn3c9m4e4gkevicouwuj81zcmqdwacbqsbaxqazzbji9ojxyrrf2mm50o3pewa39',
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
                
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: '1znka5oe8fk3o6mfvub2cqi7ges8pxj4lg5lmd04mukt375udk',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '9727n4kqrh9yw7uppmlo',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'ewa4xc9cvzsh5q26mae9t0rsgz79hm5m78ncm0j7iae7tdtp64jw6v1upp0nhhrvvqvhesc3dbesjl36x3dxthdgd7ekg0ae276io3al5x7mgp8vbsfpfzq9xxg78osyvor0gifbffw6e638td17gorqsiy2now0',
                channelComponent: '2uovglefopuulq2s1ecefmhsj9dtgh5sier5bb7pv8gnynax7pjbtt21r7wxp3d9holo7cc5j3g80cjcxrbbiinz5hnrgs3hfpg9msjeoprxygbuiz1snmg7i0hr1w12vttv4f1tmcd9b0yl6xz5ie6auseixmnh',
                channelName: 'gg3qsvheb3twycq3hnj1etsu50vu77mnuvp7jvwkpmxnbz9w13iq4wqhr2h63r1bfipqc4e8holgfdjpzq2gthc74mzhwttl9e7ub833cejdzmmjvw7qpqaialu5x90zghrhium2nmtaq8zaue83xg5fopu2kvk5',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'rpxvoa1lgm1dahma3bj9xl0bozis9u5ijj6rlgp5c6d20icaa3l19jccun849a86d4opld5t89pwlvqz60oz1n2fq4gwmh0ncp27mhf9knkcb0rp2kc9vt1m36xzztkn3l38guulm53xiytkcx23a4dvjkg2kez8',
                flowComponent: 'xv2tjgg77zw4ubgvp6p96en1xp2wptv02o102s9j8se7cpkm3wxl6xr14wlttuksc9lqpbxbcljctjvrfshfq35u1wrpuya3uqz3o5x84mhz0l43pcd17najqsv7tck4pc0263dtgxyzlpuffzmr0n4fricbz6rx',
                flowInterfaceName: 's47gl2dpo987noe2avntzwrys9uayx6eatiwnoyhnge2x0eovvuzqu42sqsqtv5ok6bocutcjmw1id5z5igpkyejukvttxeslyq4dwn04j1mp06iw74xwo5ogogq1ifqi43uywp278z83mi8vt81zvlnx48orjsi',
                flowInterfaceNamespace: '8096gdh7dejr5dw5v8nmrvwt1c2ymf0rmebot3zp5pk1iqdge9fpsbdjb1ff1bm07b2o0zn8sne7t0498anrox781c2bjcfa1d0slzqlnhcq90yjt8wcqvcjdqziksixhzw35au6ljukys821euf691bsl57ttuv',
                parameterGroup: 'xrm7rmgvixc49qa7s7mvbuvsarziuheqltu0k4sk7p5p052pc8rhq4tcqofv1b5x5iw0qp7oxdyuh8fvsinfduuuqrvbyjpos8ysbbfds7xo147a2d6b3rnubqv7d36wttgfsze8jbtm4qp8340abiay11lviljanzpk171byurhmco5izf8h89ctq5zbnfujsnc91odqmijakw9fys5ruffgzsr675are7lsjdy17inh3pulgi27ngfdketu1f',
                name: 'k3555j6mip767lgvafzxv54h2n11gsxozkf54u4k1rhqk85ilr3c01hxa65xxw9t5xubiwc9psjau62hoe4ph8ybbixdnby78qqxy8zttyr6tkv412z8941ofck3441xqxp889hozw57cf21smbknex2atsntw8ybpocndiuckvjdoki5zcjcg39u8jusjnvf7y0sqe0gotoncmg7a4dhiu5c0ou9vb651dhvfarehq5aa2o61thw6cuf5r8dn9puidrv97ncigo6fea8idna6td0pckea2b0sdrfjfgezadny2pxb4y14xmh4cmslmd',
                parameterName: 'oq05t8h3ih1eeuxili4cmbombigqbvelt8guom787bslmi9ouo0mcod6nbzir75ug07xye1k6kd7f7ib4mktk0rzkwzly13xryvcvj0000l4ig48f2axkc97oi8r70fbrd6jjbawu7zpdei7bqg0nxu34uy5q0wa0tpr9ccezvx0chab1dqhkotnk2c9peaxxa0ydy4m8kdzniagfbnnlu96e921kzc3titl9icte9rca45duh4ttt7can8x6h6asyv8rf8anprpzpioxv60cu4m1q4dji303qortyzyepznb01msd28wzt96ropm9o1',
                parameterValue: 'ih514b5z2co16snzva3v3uwq5asp3jfucbc5rqixmkw4iqkpr6z16qy0tg68whp0w969whzb4axe1rhaw7fyoslq696bjt2qcq3ej4spli0c64z38xq2vs1306731gedsdii8uo7hg78y31rmxmu4zkrpi672mp9v1anlqedbxdb0jdwd088cbkkkx0lv3z7g8nplivknpepnbbx8l9i1gaqi042yv8pddvyka1eb2co7eevvhgg1asq8jtcbkgyaqrl2ioanxu8pzhn9ct77uaaoipzsn21ew9knmj1uk45e1g5ldayxcjs31kzfhz22mbng5hmnjki9jcawthosuou950ybxt5hu739r1rwl2oudv3hkuky8yukgmte2dlrxnnk3sghcyjugfc22quwmt33kc0f3dy7h3cffdto9vfok3uji8eez30m80x8vp5xgm79qwdkws34o2ex4q54qa0y4wgawy7f2zfleb0dujzkaihs0s8pbaozdng474d6ngbzs6rut0mpdb1t2pm5a9qkm0coycw283qwqgrmouz0rm1aki7pz3497m2ps99zaoak8bfig02psm43x81itkcpq3yvo772m3i98p1111rjjlsmzpelq7yh8krxzdgu06dyc28qthl8nuboraviuny1k82k8xclv1squmflonlki2rzbo83g1h606yss8fl0u9usvv5hzsskzb6h8nwpe35me3iof89xbelm4prqiinn4ncds22fjrj67aoe3f558vymoq3gzfe90g44suuab954wc80c12m6lfbsbp0np627q6aqlgqjkqk8ck8sr46y0ac5h5deb499tj866p5ezhdilkc3vc37tm6j9c2xhwaabyvafq32qj8g0xruw02bip0ix3yw1d51ttqx2mx6wzi9iq4t5h0coxfy1apk0afd8gmlid1sop6mwn07u3wjrcjce854x67mp679jfugzbpstnvatls7jwjioyzl8gdwjbie3twdn96f5inho',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: null,
                tenantCode: 'd1ax8oqi2ddczmqd7buv37hn0bo4yzy3g9uahmojyih2ycw0dy',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'pd6lemiv1njqefylx71s',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'omlkobkjiqwyhlz2lkd6pl2uqx1qv0omg1mfu3prg7kbpxswr9u185hu1hfb82d6hcywfyf9o9ruymxot0amndbdytu65ocsj54z7n2ftkr0ru9sbz8lzhia5jgormpi35gqspgl7pd5ybgqi3mx5kbzj0gz2nyp',
                channelComponent: 'ysmsjgazyruuvzb02c8gidrvmtdjpio5748gll5rx6ob4c1rosg1a1k5v9jsobk6e3xurvybahjp0k6ps7nw3i755q2vleggw1372m00h9i9f55u6he5g7y4xa9bodxhclv75nx5y12cyegxu8ua79nd93845okd',
                channelName: '679tojfci3q0jtj986m33agyj6gq3wthet7sj1257pumdmvnrf4snh186e4i9r8nt8shp0vft03kh7tkawl3h2togg2wbjq6t47p66bjshwc42vh652k6ahsk1lfzlg4gleyr5izqdcckl3scyyldf7tkikhqst6',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'kjyst64bda02pon9ri4hwu2d9c8fa6pogb5lrz6uxpw1a3rjlyu5yl74d7zljq7ez0sf7yti7p7y5a82jf9xvul1d0kcspehiwp7eabwybc91tgl0ypk9smw6qrxwh391ur8o9g02ec1wgo3g9tw417ikbsfj33b',
                flowComponent: 'am6gfd9gb43roi8magha4dk7wd0jnt2x2pyzx1xd0tuu6nobp3hbye85k7z8h3999k7ng81xl9i9vlx4jswreqdooj8ex3u9eaw1dk27e99g1nci6giurklilffbfy4w16chuigphuxjh4ezrwcjnqdi6rmrr4r9',
                flowInterfaceName: 't7tylwkt1f2j84ljh8q573wi4groczkoxvb3luc2y7ru8oa2911ko0jj2u15zdcxwwh8j70f59qeu86o8lvvxmsc9ve33h6r0upxa2uxt7rx21gqs5wu5r3jty3f2xnqftrlze4249kv7md54mduyowagh6c5iv2',
                flowInterfaceNamespace: 'dgctc5yba4b64qapqfy8iqrbowujdmwdyidnetobgc9a0icnp9ox7w750843ggry8fv697635mczi48fby8f0a6w9fqxkw6dhmibjznik7ev0k7899hfu6v1pn1eqp6bqyymsnacyijrxaoxu5xzhpi81vu9gqrn',
                parameterGroup: 'ovdo19k2j4u8kidh2020ygsi4snwr4hincd4i98gt52oyftwk90djda8ty7y1l34cac61mivglcljecwpnhk2dxkzyyidee6a5cluyo5732ieiu36hhwg0hqf7novc8nkgjw3sn7qf8cgdwzztohxqzlkpjx5q3boofyguoeub1xwg89rb0yholnzhhozq9qdont5ox35avdjpm3sit5mu8b183pwm7rg1keqca5y529919rm3cbvxvhqjjy90v',
                name: 'dqiygtsb441lef5dz335w2i13l2jpbawl8z7anz4jgay84cc46zj8ugu3nrnw0ccbw8jmvttwiqdwrsn4rx5lx2cwus9bn1wgau4y5oy2gqe8s3ar1aqaultrdl1v0ck306jmg0dridmxnyykgqqng82k7e0cx0ktpovsu6p4nmz1eog4hger5zgvqujtdfybnkyjqpgb9a9bcc440a4tik5oe743pjck6gxm2ibszin32aqy0cglap50ymmyw6ere4yeis86ahq8zlysnjs91axt5a0h36nzxvhcukw1zpts5f63qw5djbe0bw8jt21',
                parameterName: 'edwjborbjj8vdwpyav9nut03a861yjt6lcu9rpt5n90w7di3exoguc0zphyw5o09egx7726adtf4tvwbai6lushptncggf352zt3rkzg2fwncyszcq6m8177buuz6enkgbzc2kyiinn1drvk7nte7uluc2vtk2oif0y8hd428lual22k2rumkzecxixjiuzs51zsp3l8nuwlspq4u9j1fkbvbs17d8p62xm2golbtokedy01xlmuu6gxjkyt5cjgv4gdiaclfn2do23jbzjgcdsj58putzwprxi1s4yzev8s1s4j1jckzt1wmet38t11',
                parameterValue: '07bw3neoey2dotzoyhuxqphv7tyspec15jpo01f2j2nhb0oq8n4uahx6ohc1k8z43lgkzgiyxgd8q3oc5kfnnrzumelru3p0nq4jk2idws3x7y3ykaqae6iwky3q0bwoxgkbyqhugcrp1l1hhmimjrdn1owdvg1kxodhmim941gj384v285t4dupvxp1hprhfj4gvglh07wkbtic636k6h4x1ntnequwhpf9cc9j3x41utrva6e1rq3bpx3xn757cyzhlgyt8fczbfetye128l7yi7f0ld6z425qykdkuxz4ogva4qi2h3x7clvl0qni7b47z8apuz4wg9gqk10pd6l6y593slubzxgrykxw3zyde4wwjvg8ta6liw1zt566odrue2s3q0xkdoxg7rvu5pp331cegvblvjnsjqk91prmr6b03altf83icqewifaknzjlt5qtai4gqp7ehcg07ugfu59el5ag10v6yw2ecw5rbdeb8pabh2ss5h8a35ovk3jgjhzdado5stnklyn28qo8qiu8epsp7p1wt6rybe2hbpy23kgg10z7yf9afmdzu1owj780nqzzmlccpdhx0593v7jmh5aucrln6lhor516czksxfq0cuj3nyjybuwym6i2h1uya6wi42czavrc7khn3jdvesyl1qgskvd0874prnfgkfoesefewwewk4v076b7mshpge3sl5k7nex9qdco8g6uoo6aiqsddg09kiftn0ml7clnhjiw173mxj4026d4pk2sdzf5oo4incdl1okhpyb9q24k9hix35085dyaurtbw983k5bg4bnuetayr16x97pivnieqvyqyd14hbbzacqmh35lv9pyyazgutfjbhuxjkjt8g4qs200akbd3yxyz4l3s3ayvx1vub8o6rhl6sy6r2blkfb71tzvm8r0pfhgjy16d35yo5n6nzk6r64k5uzw7knmp8hpbkp58pplsmwruf6dbz70qy5gf79apx15e19sd8k3feus8vyp',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                
                tenantCode: 'a50e85sw57b11shdf86lbzj41z5awq92n2l7h4gdoui3cwgyd3',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'fd68uwo2tgz6vyq21jg0',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'btqmtfgdqwe67n8hm041rs17alzpy8v09812qy2i4f9irnkf06pxscwpy5eocw7opj5wsoevdg7blf26t5zqv6sjfr2r4gil6q9aog1qkavadkmvc01611y2cnzfp76n9j7itit02jxjr6p81npkwl49bz1xy4bu',
                channelComponent: 'tcr7a3xhtlq52v7anzc3qbzrcd5yg1cmc25wcvlsb8z10sdl4i2m1t2qqjyehlw015ug7hvqmbv7e59ompqirxsuu4ey0xwtnnbfjuomrv10013czjn4v18l0kzt394rbouw4uct46zp75nagd2djje8murvu2mx',
                channelName: 'k4wfb2ibx4e9eofashj5o49brtd61hfaxt6vt6n0q9uof7bvjc95kif815040mnfp9c0fcwczcq5q744jp33bvzphlh3jmprrkv8fws9ixrwa5lnstdku3ro9hk2vdmmkpzq9x6u4yqpg6s6vhaft7d4ujv7aho6',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '80jcv1a027m5web2ksdi7fxpxz1kc552pdjqnlm31d6qb2o0gr0aob0maaaal8a8iu4e2xxjbhke843ge7uv0dytle5qfn3uqnf2tbt0rvo1sd5c0gabpnnxizqmkg4il6s6o0fr96wrx1gt6szk2hzwiw5jt0n3',
                flowComponent: '5901ohj9h3b4efyr82c9lpudf9yerobfoxgwg7lpazto7inq8cwv93aloesugjgto4bjrtx25rxio76prbox6wzidjlkrg84gvj0czn2vxxo6oaz0fx2gqxcktkn2cf4zqud2nykxxjxa10n7r3zwdo2ot9t172w',
                flowInterfaceName: 'b3j2q2kscy6anzndd8rx2l03e039wm2c6wj9if8nmqns0yjboj28xmzjz1k0aii82wi998xdkqgu91thm4l0ri70mt6axl5jppvattssebfenvnz7eyk41ma8xg37arkv3ywunu81g7u31cbjobadk5dz898pr89',
                flowInterfaceNamespace: 'nzwew7t9k24u5qbypg2tj6tmogyetw08e93un1wyf64vd5b5f6spnt8clqzzvr3s0v9gmqz55pjzs3vn553ii0dux25wxgqqiikphwdnjwhmo131hvo0ky9ttj99rpcundp1so8c4tl9vbmmlromrxnwznjsfqr9',
                parameterGroup: 'leowaz6x0xpxug0nr7z3e4v6mj1ipzqesz24hjedggp9a5t5ddo2k721bx2p8bufp6bv14cu0mimwx02t1kpzyy58m5p6bcsx9qbx6hp7li3nbvwosd2cu6elrp6sgjww2nbq5w75uhp639bmxnk6e2nos6rlonzbxzap4lpxo10z2f3d4yn16aeq34y2cvdu3lgetxvmljlr1va6jynxbxs0lx1ix23ceuw7i9bwl2i9388pgwhgagabx977t2',
                name: 'ypr5u8vzqxerkyh3u4zaigwdc6jusd9yzsd3hfkeq9ar2f19xke9tjfv7x70n8uhmsopylacxn7925tvt888h02iencf177ijds68slezts56tx352hr99pmv2oy7iaqtcs3yr9qu0p78psp4xlm2883ykxgg3h0m7xq6919i7bc40tpxsbfhbzabee892tyawr72cb3lxbolnls7tpbph49nlbi3fffhe3rbohchte3o7m5frb5noaf6rog5zg98wxyup9i311dxi4temzytwrce80ctovwdloedh5xo0ohdd1pimihdkvd8rpivcb5',
                parameterName: 'tbl8q52xt9sbv7m6m4qvaby7qhetelcic5m8ub71axttqi2kid6qxrb0hdb9he8wys135chbzrahpft34cb1cdi9mlazjnk9cnidranwdjemt9aovrfhl1d7n5bme88chwtx3sk8ubiioapy8xd6mu1eckl4x4umihi883qqgb5pkad3ox2wqvcfo1ipu6dim6csfwlvtwx7j30i88nw12cdj1qj311nap5po4l4hmtghjiiv1je70is1bt5z9t39us52l0u9vg9yex7l8d7eoshelpati1w4cjymflhw4y2fjq9tww1vi423wnojh0c',
                parameterValue: 'mphhuomelof7oo54gtl5dj51aactyt3v4ziwjvjxw4wsqnwmzcmd834fc0716jns7n8ume1cli09l5mgfqf1s2dhov5sihg1pjy38t07vxxha6ihcnzl2nrik8a3who0fxlxfug201l2huqgr880a5327r38rx7seqmm4wptlcxzb01q86jiulpmyhlhb5o9jpi3subfpn72txftfg30zf32f2n17rngvn0jgxbc1hk0p6wae0iqzi513nh5czdtc9tgcy1hpp5mre8afpc0pthx3j264twrev7vabkvnrycl3pkz9d66nttyygv35iot6z0ya3q1789y58hszkztpj6gtw0ah7bqjgah2g66rd6amt91a00c7p4far53vjwd7aszssb676rnlnnpypqpfmtdsuhtnm5qv41ntstzogs9mj764xlhsrbtvdjslrpb1yuvpkpdxaeect0bqtyauqgqz1u7rdu35c68yoo90ol4jm18x9cbpfkhwv9buna6wdkz8qvgg91pc6upm93sda239ek5c53fcog9y96j9jlsfh2vpr935tg00i94d6ranfbq7mssych1ipzmt65a27ago1vij9lpybad1uz62mzl6rs0zt4r8d2s5ubfcdv1vi8k3nn7gxelmw0msoxaqvssiaoknyb72eeubaqtrl3h69shiizeg4576fsbmw4s3k7vh4xhwlbocdxj6ie06qdoi7hcp7piq0jdlg3ukihdots4fj90qv33rcw8v9lr1focjv4tz2bv5h7rm4b3smcrakjpolum92gtafaxr7fbfzyp1j6unhj96109ksnkej4n7xl8bg5qclrz7511exan2x2kydxnov0akavy45d4k5ndj1z7s327ahlziwsmakz7z5rq5xlwr4rd8s4xoaehmvnxmig0dknh3gzzl91ha6zyayl87oeqo1leje0m3zyflo6ju634lti81ud1d2wono2mw33r4s3zsk6mcbyc4rcsqqse54oh773083r',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: null,
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '2flcbi8b3qq9kara448h',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '11wdncmcitoq17kbed6cphp4pk8fd8zxnwif72464k9el7p3koofspux6xgd74587ft6pctqxuzc61j4f4irnkbbmsizjv93f2st2f1f5cyrwsis1z4lghc0gnbfjd4s83rdiuvuj4iph8u8f7wa66m3qrlr97ze',
                channelComponent: 'xbf0l3ray6xfyvtnleztq7ljj796zzgk8c6xuj7dhmv5wsmnvdv0scxu8j4uu5xx72cnxljthy0l3fdlxhibqpsxonv3ergvgfh34k8gs0o3du9cuexv79vuq4c97l9x65cnv9onid8o4dhx0ifxw2jt1v5k531u',
                channelName: '5stmxtsbgmmm3wq8uyi5ya9e643gv8hvhz7xtspnqv4ykc7o1xm0qtsd6faaa4kr6uyoq5nysq3wrpankbvv9cn21rol68pfou1fi4633wbemypzn7f7v14djsfoo6md7qzrn31yhens22w6g9am2umjxo2odfht',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '86nsm9htxh3oaokvqld66inw2ibd2lmvom8rtq447oqr00mnedmjikun1oyfc1cdvvhjj4jp708wggmzh8pp4hlvqfoic4wiu79rwx4wi1ooao2difh62v83ez8zb4amzb57n6e16vdzikyrbbbw85ul0dah8n3z',
                flowComponent: 'vh70okfmpckr1g8ysdtay7ijt35oynikg7c9xxou1x0pzagz86ogwtn43n10id8kt5a694xy4z2ncb9nbsdqdbg3zpb41ea1f8wk8rhzja4n50n3pw0n0aesdsbehpx9opw0wernlnaosclwl5cpnzvt4y4xugby',
                flowInterfaceName: '15ckkjqikcecki9pyc0d83tb60ajmgal4ojh52mrhalh0ab47td0gdci30b8s4rqexjckolcvfxlylfnccem4d8pfviv8aw1aiml9nzyinylol9efuzkekzzi9zqau9f8de0z4pz2uqz57l3ngcbkcvjadejlzlg',
                flowInterfaceNamespace: 'io2tsannuwn18qzpn5p7rxkcojgnwpjoe3e9xdnpriy023sggaetjdu410rf0n6jp8efeatejkop2o5ybaibwjc44uifvs608hrxkmx86qar72y7z5dyds19aynxkf0216w0g4vvsyw5cpkt95gzie4tk6i6ybq0',
                parameterGroup: '2ni6s9vxzhx2f0h4meod63bkirectluj0w2e8krcuu12z1ldg6dcy4kzeo9vzko1arj8mjx2dboa741bdwe7e5tcauqvy202fe9tg9liw8ufml57r0ovig1rwvltvlo9fo94pjvaq5nxbt22rqqblivk1u6ipuk5ngsjzul92gtg1o0dqhqiiqey5x8rer4pz7cie42sukc65hfk08fsvlu3hsym2yi2m6anq1qyap7n7a590t14gncxpwhro2u',
                name: 'yyw460sd1b5as4duq2bazhj7z3si77v4x7smutuvthawy7hi3iaexlreqtn15v0upfkbppfy35rrhbwqm51xpqnwi2cm4l7ce5gcl8w0fxtl9e2gvo7mtuftpbuhogj0dk34evtsq6hmhkh1x0oy0tg58srtm11pc3kru1mdn00co1fvg6zas5373awfb91l4767ef560gd285ic46jmq5pcasa5lihh5og44wtibb8ws4yk2ap8x3urqyysprnj961nx69vz9bo6r0qty20jirrh721yz9puptfrf97yw74o6qa31sczlgv9w356ucx',
                parameterName: 'aqmrwh3abfwsjxf69vlf9bsn3epqalcq5sssf994zdax5luy84syw832fsqa7h0t5z6z8sxtsr7ya1pr0ru1dbe2xznrojwtuxo7d1zlegs312uz5t5n9tygue0hzd6glrqoe0vijewq8khzf8s6c165pspsvct0mb9evthh0v0fae45jykrmmj1o5oneebedken2qigzsuto60dlwblyrq2c6j1jj78peg5se9fqdgc5rj4m8v7qagvjo1vnx5i1wn96bghqbybugp172c56zcvqvmdw0qjaoeu3ii6nnxpn51rqij1tosh2nq5sx91',
                parameterValue: 'po4e9cpaibpzu5ao5sz6cqeijh3w1hqgea8qecx7gim0kzjfy49ymer5soclxmdh6hm67fmbd0jb65ip8i3jaj1cz9aqz5g0u2p6m9uhdde24780zk32zsvsakx1cte6mjdjujrz491hylp5unqnmq61v5spyrsw7ss9ae2jlfmra8fvwlkos1wtufjug0pmx78ffwegcusujtp2qupowpkyhp7s6qhje2l31giif22ed988i3uuqg2psvxz8fuku7w8sgjon3yimkodltjjryhf1zt2zwpv9wxgz50xljyllugpuahe4k0pl1rugvbu0phmhptas8toly5ff5vqwhh6xvm9pdkc76c39ppfkcebmdhjz2gpletdm4tlbl9c75lrzeik23p3zadi7r17g9b2b4ioy5ob7x90g4e0f029viyqq0kgrqwu3iercpv91qec81hbojbx4t6obdex8rpwdslqjnt2p52coiu51x3c962da58d1n1duqesp81qw87efl2hgll9sprj4cwgp7dqmcr984eg38zag22mnxq44dstvfmuwb45xsrfcgi5yjqsi5r57clso3y38ijkysc663vo3mv0lh2a1hu3tv5sgjnadr2ymdyptwmh0sjbuq2k95pjkdcaqblts0ho7xgru6orxrydtckbrxo0bmjj9ok82bkj8uy3kxtfvjarceisb9s2bqhy757xf5qay3eci16vaxrtzx5zdlup40r0kal3aog906n2g8ea7ixwop8n8eikfdsiv2g6f8lhydev5rvs0uqa666y8jzx3rqdbp4yuqi7mqbxhmcfoziz3w7zda9r6ywa60v5slgjvv7b2imzvmtzjlym6mmyedherfjigpi41nl0vhdtonkvi33q3mz669yl2hllkvz63m1b9a8whuftv3xlpu1axfuvlei4bwh6ztiwibv2yei3x6rlxkga0k2952nyujuke65ebpa06k9v6nh853umywc9mtkd368r9za01z9e5md5',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '2br80ryw7p2mi6i9i7qc',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'aynrx8y2el89mdcnfdc7hseuwo8v2q4gpwljbeb4y1szcgrdqbij2g9m521qveq03cwgougtdbaxw1waqft2rr6x0fdo3hyjaxkaqfwt4i7gcv1o14w36yeheaj7jb218a9uz41go194ojlqdru7a0qug4hbtcj9',
                channelComponent: '91gdn4al5j54wsbxjcdygkd4p21xv6ugxy9h3v96fb1klr4f1xnv2ymrd2lxtnzuaq16m9e9mevfi3902avyzo8tq2sb3bdx2oephep45xr6enrgh3i3d7lnv9a5imuj4wft2ta1xi15szwttxjj2jslj65re1pf',
                channelName: 'pugl6zem4bxuz4airlia34q5jws281ue6hgahxu5mo4ak4hz38ik0vu1s4nzmufc9gnv9x31e9j97rzyg6b2cqa2okpkzqb09aqujyq13n24qr9nqx6duty8iupsgg1ebkknow29d935cg5kln04w054rb5aklnr',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'eveloh7e8mdljafvboq8l27f3rwcbtniq8g0perldbqsbjuhqfbwq65sxy93gx0qwlthawbv3wrqlzauuyx3l7pljckujbyh3cxmgj5iiyxqsdp0utq5tacv69cyqr8g8wbfghhedwn7kgyks6p9df7ho5p9yi0l',
                flowComponent: 'jzlbi6nb2zti31646bonv3ji6j8xh52ed2hgs8hh4wcmqm5rqav3qmzgbaquqwdwhxvl6f2707khfqjg2xuxvunywzp51ibyzr2tf11jy50bfh9kqq1cqusjubqpv4uimo06c61zjxnu1jypj7nrksi6wm8nbjmv',
                flowInterfaceName: 'ln43v4eknvg2ldivf7bqnko65elonhhs86916pspl9sfl2s31j5oas5cy3x8u9wk2k2pbqomply3ap4akhadlplvdhhbsm1bk0i921ulgtz5lhe6xrqllt39heosxqtvp7pq32khfbrja85myyzrn7p9qb8w8gcf',
                flowInterfaceNamespace: '1pj9llk8p88kndb38psr853yjcsfr0lgqzk960bhllur3iy997615jdsmco0v2ffezoxkgnaxpxcyf0u25133ulox9x2tgux8qbke4ihdsg6ieiu63ogf2vn4svr01n4mnegkhr2i9i4uao41itr4ydpmmxnsd16',
                parameterGroup: 'fdazbzfmnxgw5sq2nhlwfznacbpfthzw22n3tq9f0d8dm94tfctosdiov7gndi4wqze1echycfhnvu9dy65mg0x8tfmd044sizyr55xnivp8uj9mwllp71kz9bolyvol70xpru8y0yvtheq8jl84tfws78cxgwiio70d286icmw9idqxyfgvb22ohv5z9141amc3tpaa26m1msshx1zeffofa262hcc6ao6a1973zz5xymtywztfqwdxr8g6wzs',
                name: '6n0fmmtjc0sfqfldq3w6ftm2dwqrc6ha4mupurbnqtw2pu7tcyluvp45ktm41dz59gm36497qr2ym6oe6yedbpa21dbybex4wnn39sepyb7cqymrwimyimbk68r53xqseu2o034xe6uy1mzfe2rg5fdf72ie8auvxu7uou9lw5br26rh783b79o33un87lnag1wc7o0a326mzaqr4y91scrm0mqzo3gl8cl9bjj3a8ghyitq1vcvy7ephkw8sl15wybfc4xor8w6g3uecci89igylsc0wp184o86z14eyj1iqpvdp9yfziuv73xu45a2',
                parameterName: 'b4av4wtdvohjd2asirv1b9lmcmsfajwejhf3bpuq1w4624d62zp7day7xxv2eq6wpw0eqpdct5x3cquwri3pro8q1j7dgb673y4xlxeuvsp6j2cknc8h1zn3yux8e6yid3zhqh1ahyt57pxouckrn46oy0iyvhuqfjkanrn1akvh14a5anfgcvmpfhvqweh5jcqhp53oezw023sq6qxvd7guoz00jv41lutt0k52wbbcuxsvrzdub9fvmla6chs9a91hx85stb7x2gk173etdria797hc17qits5u5hlaw3ro99kmnrtq9bww2icnww6',
                parameterValue: 'wxvtxu5zxqzdev0zp5zbtwevcd32ppn5675qomvat0hfpo3csytg7fee2pnqzb7jjtj2rqnudbb9gu8dpoflywvcbe2bhqa4hjvg797ryk71uxkeuoxy7bixuwd836u4ujfy19060ajpywkoiz8k8dorrq1ahq2idz2z54gb3y0lek0gmaqqufinfkvddf7dtsw8q4hie9zkdozsckufgbpjneyo33pplmbstkgucchypalcswz246bxq69pinmney9zdh045akhi8werxhj873bjghc9vsfyo0wbzvea7tdbptcwtoj46qa4qw880itclbykj6tb6uspy60ekes4sceuissf8wncrsdy8m803gaeexa037ozj2kgv0en0k99zpda98qv0jjq3p10tq3werx1816awfyu783l6o0ssgurcphdx9jgx3v4lvz40bjonuey5dvwdi1f7l4d4du2w8o7jpsgpi45xolicvh3mm0mbuez9oc41xdkuh3ue27ag4hqxskofaum68hmexcrxfps3ywj2wjcp5165q2qy7qncsxkk357nj338lq5roodtjbobsbaawy0o1muehkxh6rkpgsyskbgx9b4azrwiri354e5s7ivaa6gqs5vgnsz64l2r069id16sdht2zua1g04kiq5yd3ccanug46kj0k6fmbrm9w7qgnkm21sodg8n38lj0ig9ica7g8eq4k7vcr067jaghktyvou7eicqvgykbzg7n9nl5dr6vdt8ptbvw8iy2b4htohvou59sogoaixf5cfv4qcijdrqn6vr4049b3kuj08tkobg4wh55y5fqiavyyy6kgztvo7p3n7g8ta5s054tuqp5bcijek5wsjnwz0chssoq27ncnnoxsy7qwn4pd6bkd8cgcy1aohphzhh141z3q9w4mrc97nv4jpcwtvv6v5a7sgl95nbykwpn9y0964lku8qw066jgun016ugfto9ytf5l4s0qcfppdpfjrrvpu760ivhbo9cj',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 's67bwm8d05qhdq4sl49z2ijnazbge2ndfwjhn43xjh9f38prii',
                systemId: null,
                systemName: 'oic8ptcj9gwpydl812th',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'g837g977n2aiwu4df3kcx1rkv8q7vca03rdugcs2f3pofybgx3dazonk0su4mhfs6r4j3c3hcbs3iuhb5qxzwdn6ophli9ofoidk8q2af1n58f2exjcca1a0iw2vjle4t758285vxawp42obce13uzabyedtvadm',
                channelComponent: '904ohaxjhkc6sp3z9aur0j9ynf44hkp03b310vgu79rprrty559ot37k5zjrce53tfxyq86vuirqfhzsx7595znedpna5nwm0bid9onuhczrrt2t7an6wh0r0vwogvnna8849jpnls9zsfrwq3y2inxj7syjw0ls',
                channelName: 'lwma9fl0h57s0gwn7ufurilefmkzp81407r0m1qlsqvc7zvioj6bgggkam704wooay6f0zoa3sh5yqbstv4s4u71kkmdxe3hbbiz02q0wfh470jvkpla9qfw6974vh0ljuy0ag776t4vprvdqgxgnwq0hcq1mkhq',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'hdpe69mdzsinkl7rz8i6yapszpw53qssym5n0qggq5q4utntpba61hoac34aravarsyu3t8a4be9jj55vcgpyby9weqg6mbb4cjp5heyuhceo09lpyrf5v8cwn8um4gknujgdj26ytln0pf5knw1e063tjw6wwjm',
                flowComponent: 'mqi5z6378a6mlwmlei1t8kl0o89dgl8gkg2bwjagwup1bfp6aoznq2rk210gfsin91hd78qtn6unam4py1nnwau75sl7xf8wmj5tiungfg40z5aopnrkuzyvdpybkoysbwl1975sri01iuyecmcty2ghy4tzgb39',
                flowInterfaceName: 'i55rsgqmf1ewf4nepqkp2vtsbcccqce3mbwbxdw7kqew9do6fsq7x3zhhehk1c2qo51n2064rx1r34na2mb77bhupkknshln480q0076acapchkxfj195vqa712oe9zb6up3nm6x2pmkzks0fc4blfs51mkx84bi',
                flowInterfaceNamespace: 'z6uljkknhgveg0ao7pljr7kt3my3tmyfqxhr6fd73tvhyruhwto7hrjhlgd92bq8mb353zchf7d66qh9hdnokxpvzxgfatpims24u8rdic05ufvvswx6rwxcstwpc7kv5c5fx7gz3yrg1g6eklx2dinm5lvvk77x',
                parameterGroup: '58qztxkwx9d42ltw7v5ryl7k4671qqqbu7xclaq7o1ovvt048n7koa2z3m03gwd6zcr30hvzk45ci3ay51of4b8q6pz26zetbynzcmdqhu9cjp4zhknia0i69lru2ovgywb0gcyftf8ta8uwaitrkgaikxbyhdgmtwhlyen6pndp58k5fv2w0euer1t6qbvnb54rabls5vxngfcf6q2fpynovtvvukdkju7wbk97asefv0cztf0a9jymszbfxfu',
                name: 'ofnszrno2mqkufurj3cn1gwwx2yx4gll35a4w9q7q14krlrrxfb1zgenej7zeescubcqp8y3sz4kf8kdynbah3i3gfonyvjjhtnsf0lx31dbid4apez8k9hzx3bsgedvj61wabl9mvcs4vfqq4kdg63j8z8iakfu49zxmq4b06a7a4ffc2r6wr6m4ctccyb9u2029onjtrpw0byqzpq30yxspf96ffutg0eozx0vcib0ci4agb5h8pbi5hfx8tc1ox1sya9ljoo2wbo9latvle3t6agqrtiugnyx6a3r8f81tcy8hb0cj0p4m3yv30ra',
                parameterName: '2ulsbi4bmrplhh1z7f0trp6jrmw0da1f90f0iukp51mwin05m5ww7h7e125y0eg4r2hx55iz2dtgj49antjgcse69y3qwfp8h4kebw6km2utgvkurm2azuv1xkumbqmu5fs4sgchahjzwv91txkf4jkq3gqwsl77s2lcejzi9cmq242dl0p647mha92rjd8bcds6tsryyc5ddwzkv7m7rpqf0dkplr5xnvtsu1dgnx83ilt261nnjl6mnya2xa1cvhcq7luuly7mnnh9j42jtlhzsiq54lyu9chm3vs56qt4zhyvcnlswstaq2pgb4na',
                parameterValue: 'mnkypu4sgcp6pjg28fi02kxnfefyb0j66abri2dcvr9lv0p2ymuwbxnubjljuq1stvjwjtw6jr1ryjqrbugcuty36gaczw4ep8udu907yr3xjixb6q5ejjc3ozdq0tpyzk5nm4by9ljfstptxy7vpn49ihroibctwum44weew8o6gwrvadxvxu4gdgcco2j3m0ad6dezdwoaguo9zbim50vx13na5pmdacpcktlygfmti3baxluho1emmxk1scaglk8s2zh2valeybjf0a72mphrslu6yuv170jyfwj4qh5adle91qx4ytgem32ji3o7ir545nh02vad96jf9t2rx9n30007noqodfjeo1pcsumn1atxz6tuz4qmvie1954tl6su01gdiv5txb2kga5jyqpowz76du7ysxtcdshnzw9o1krvpg9hj6et2301ltl69q9xy9oacfrqsd8z4um4r5d8udv2w8k2dduiqyx0y3vao3zd3y5l5j1iwhz9jo6k07t4zstotroi50div3pzinaz3388cvx918al0xhnf76cv5map4a0s55eh3bqy7ytavnugrek7m7i8lgkqu6l60babz38hojgwarramfm370c4bf8w04gkp9e39ebfqe9f4ywcj2j20dwwszc9f805oaveo0cu3jb1h0ddd772023vag3lna44er0vmv3ekhybe32pc57ot4k0acdx97s59edlc4nl0js7n33rr5d2q8vmw21cazdbw3s773po4ntncozpg1jzv11t2cv1mwoqq6x4cwzdphm8pqbjt72cy84187jgua2yvonh2hu8blxasyuowj2ssqw5ggmljdbycxbvcu1riwtl13arq4ycj20ru5rfusppc04xqd47wze0xsrdc3f5fcjjo0vptls15tfnn4ko7ja3zez6vby57q5cbgi83coobbtlguy0sa4f92se24ygk37fl7kuunyaszmnd0p43x1il571gbt8oask5qyr0vutl11or4v6b1f',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'cakugt7byge5li0jvhd7jrbppv9owu73eky2yupwqz1ha4p811',
                
                systemName: '8jnxwr1u4d0e7knv48yx',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'uaxteqq8rku86gl7zz95fsn2p00cqrmowv2yy75yu1qq5u5pkxn9m0vz8s0vdz3hmecutx3v9hd4rrfqsbw692343oyxouibhiii5efe4ewf4k88its47rzmvti5h2jksrpcnv3xp5gzf4ho2klqklkvispehfx0',
                channelComponent: '7vao14zqzv16mwdq6kww617wxt1mk136lk3ypua8g4p5nz3twr3y6kkm5spqr8jrrd4resyzi0gdu0fvhuihgjjdpflams0kdzbtwapw6lfu7f6fol73xxov7x63qg5xuaijlvvutpqjp8uy42nmog7wi8h6yusn',
                channelName: '20397oyrdbl7wxeijf9zhlvd32zzroo0dmrtt7ph8ijjijr6zmzmonolsh94yzksz4w92fu7awa1t2z4ouvkt81vg8uuuma1pp6hyiy2yiyn6xlstwoh4pzldt45s8ke2ak82tlbkfheswhr8pswwimkf5zo5n0o',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'y81eij7y30kfhgdrrz6dticop5888z6pb6gtuzv1rqlnxmv46nfwxxobbwge9e2kmapne2hy1wobqje83uuqii6hpddt7pqyjn899r30k0vyeu426pvy0mot7hqrv63ijgjq8ewas897yuo3kmr8ybzrkb1umo1s',
                flowComponent: '3kn0luleeuy4tz9uumbrh30ti7pbkwnsybvb1dv0rwek3hmdf5cz1jmht2cxm9y8bxx35drz47p9a5x4qn4ypxdgs5o0amvp1p15mrr2c2y3e8d8qwiyf9mjz1dsmt7vsuyi5g9peis3wxamt8wfot2ks5p9a1h4',
                flowInterfaceName: 'igyhnkge9lbd2u4ucvw496mru2fv8v6xjmpsrcdt3fyodr4iwmrfzdexnopqx3gyznetct5zy3h3qgwtkrwdin1gwzk2n72yiwpri9kdjr0tb7wxdccmptemzu7xwi0g8akxzq8hzqoirj9ukqboxpt48s8407o5',
                flowInterfaceNamespace: 'boombduq9wfve16hh99njla47em94id6s2mxg9pm1blzpgp454rg6fdl5f3lysczb4cmgk6jc3oc3zyjk3lkvwqrp711mc7hwoynceevmm8rlax0nc92demdltajb6kvijoimz11gpmaii2lrkxrrq2aw33vds66',
                parameterGroup: 'rix9se7risl1mjavnly15udta1ngzpdo8trrsdrnecmmb5se2ezx1cuw1pjv5gkjb8p1esygntm5xfjfn2b1cq8ylwc47d59er2bamgjf5qa2jcjlavnsq3imf5eyl5632aa43hro6ujaavg6jg6ke8v9g85hxuooya4fqjhbv36mine36wumsa2x7tca4rjiiod72qiqmt0un9o7vuodrtihlht0gvswj9v86sde6jbddr334o5kk6g5pztm27',
                name: 'd4ze8ir970hckpf9kiilxkh0orzeehbw05p0hgci132ozyeb1vvy3b8ymz36bobyx6d2f7quhu29oezmugystkrwmdd1p3lmr0v3vqbur9u04hm58ta7yrhkftiq16ci9uom20u61khltklxc1748dwnkovz20mvvf2ugflihshrae8wztgfh2nkw3z2ig5yj36vc88puhu9ng4tkvm7qulkq3d0i5mgbe1njooob655gn71yivjq7ovfnvnpj1lnwr68wfo2747jyohpvkme74d3ng18r8q0mgk96ymmapkvvxwh6n0xd9os6t0qoh7',
                parameterName: 'q12wif2zjypajw9d2lwxu3cc63k157cukli5peqdmqcmwngntqzie5kuboauujh6g3g3galiopfvjdzrgiawzbn9aw6ijghu20gs9ghxortvfvwbepux7fuyadxsbrsmueeutank3xi42t4ifl9896tn8v5num69i8c6s7bg6m0upurqc214pnixx94pstuemjnerjdwce8ctbvremtnjf77lzytu3g1xjirp595zwulds67rpeqvue4tgyeviti96p8tr46uma5dyvvdms9t71oqn74srpiybb6frwcjoc2ilt9meirk5xngoq7dc7o',
                parameterValue: 'kbbks0i93efs92pspccjl2d0kry4afs4rhjbsyfqtpexjb9qljgn0gembog7is6kws2vroobp4rkzo2mico3cz137yuxe6kucuwmrif31925ohaee049epj1cjvqlyy7z3e3rh1gs228fo6nrl0c1gv14jb26okbt48mavtke8jjgytf04bck23rl5ts0kb9somi8hd9egibepbtg7uylsdfckhd35z6swynqnef1kje6o26xdye4kj6cs4l64ibbtbl4c689ofd5j6byuy2gzk0cpags6rq7m32hywb0wpfyu5wunu4mxlzvehzgo36w0gkwrgkhu1htgq4fce0ax7hwpe0v5pyqkli1rtavt8pqzcm9s510spx5l7hrutlaf59419ye5vrh9ija4rgr0vfgj9280sd6uljtldxn385k8biw4uctyq577f4b9wmp4vz8d71y5sfdejuya24km8sk5svozt4mtk3l5v857ifgfs2xbft3g6gkgzcvd5qq0qus0ppo52zdbysl4rqygfukgbqe0odlqq4szfm7ghl91c4mn0i3vhs2rw3anxd42s9rkmmtvrkgtm337r0nn8u4s3etd65x1t19rnsz1qm5u1nrbcz7fwd1vazv3kcy2asaalmc3hp63qugkl51256isic4qkd527fgtahqj104ykobuxsqopzmjf1k6afb1yba2wdk9z0l65c27kj1bwqgktsp8wgv2yeg0rqxbdyhkz1vrcjyxh5244gfzcvryoihoy2pusab6tarwaof73tktypv14e0e6zsb08zrs6vkr32c9pt9u74aw12uqoxwb6m16e6jaar9hzx9cgj7t73qmj683qwgyiasbmg70uqdrlx4vq9zmqjx0pz04vb673h848xhs7mkrenzkhcbwqo5kvt9u3bm8t76j788ttz0hql4iajcs3ytjbd9vsays9fdi0bwhxzh0l2q5nfv1y7n3mdcgc2em1galbq8sh7venphuiylsrc6zpdn84',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'a02jbrrleifvs05vgiihznwewiiwf90i42usa0hy6oiq9zmegv',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: null,
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'p452lv0wui1k0g3bpd7hgrfs9ta7t8lkas3ohrsg4nqdz8zmovbpv80jkrxaazp9s16qbc9f9viuqnvlzwy6bh077wgz2ndr58bi899o5o99icrfx9ouavya1yo6b8cdrvnw9qip0c84ifjejknloy3kmkrpe30x',
                channelComponent: '6vsv82thzezt773rz1smscwppr89nvr393xp6lt08piw7jtx1mcyq8440zmhcngtdvh1qrwd18jzbngire1ehporywghtip1v4kqxz4pe1spd2hf21i43n6exq53jdjfos9ml0l7xrbtpx363kfmy28p3ybk9j82',
                channelName: 'ig9928fpo51hasal3w9quspwcwomidpvb8fnq45m62ptg9jknahy0b12nqjxvdvt7b9q0ey2fjwqshz8qfw485orxpbo8styxj7grbn3ts78ywgomjxqprller2j2t93a5y604k2hk3g7zadoc8bllbznp73xfdz',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'xuisdkd7ul21g8ibmnbtjclmk6uu1yqakedjufnr00i6p425v1qq1pt721zsfe0h8sb73tsf5sulxlfvkkh8emxmhd5udg3nxmpy4a1isnz28643m4wwzb35yyof63ppwi2tbw5nnzknldxou1mnot11aoct9ptq',
                flowComponent: 's1ukalig224rr33qwz3vp72lvxz5b0su4nwtaxs0abugrrlg21jlam96ojge0h3yhz97985gmdc7276pzuxm6h0vdp207p9uthr21vz7icsaebfpvpttf0lkaztogxk1welrtcge5r42xh9ie4vyvnpo08lwgqyg',
                flowInterfaceName: 'db7xpm0sqhoqdal1x3wr5rg94b8iorv9j1v72ke1auoowv3p232ix2qslih7weiqklfecve1uz9u523f5ivpa3n9r6yez446onap7w39wikouhkzcwr3hbc1rgyboagyjfgdrg1s7m5195dbtvp2o0n4neg844n7',
                flowInterfaceNamespace: 'tygnsunvxn0w1llh74gcu94i8rmetknn5k7c49j28xgvucpgr2sylqs4rzh2ididrxq2is03wf9s6bveb2i8vj1zqd3tcdxd3wfxqc7em0ogrjcrq967ycoa7wam9q00g7cgjsu1zfshbt4u6kd80tarhsuhzb7t',
                parameterGroup: 't6zv0otitzkxfxpjs21ys099r76i19hgbnxngb34w82h9w5x7z3rxtc76hze84euf0i33elrcnufagacfzg6h2abv6848btx3o5mpj8kw75ytgzopx0y4yt89fmpted7w1mxuuulnjf3oi7d3hm306xjkzg3vdixvjyanqvezvxuvywifhho1fmvl4ozkr6xnfssaiuf6o3sg35kqcfmepoh17gyaxtaq0z8dhwym44v1e8xvz2qomksd15eniy',
                name: 'b0yo4mm4lhxjc2tcjl33gvqaudydhazmuvjq9il9iufciktsn1us4hioiig4tgu5619ew7065wumz5gri1zro5mq7xvnwigwrtlcdqmt6rjsdyxkc54pelr6iec9owsmor0gghs3xf7ydgtodf5fxjyg7ldm2lgcc3lyped9kftp65rrrvgrljwti1bb0a1npboxajlf8fr2dwl72nh49qhc69wokvidf11avu1npatsrr3pnsqh5u37fkmtt26dyvqulmpkimegfu9p0rr4cxntv9nbwtk32q2ndczlykunic0hj2zr3t89nms3ezjm',
                parameterName: 'kcaqrwq504dxpc9rvi5nkdvftf9g2dfp4lx0snqf71bg6kzk7vm5tc8vucptcypyu6bnnbdyj1e27f7yg06pes1yl6zd7rp5avkjmdbk4idd087iae3aox8hfqxhwykjh0wnptyqtnaoug45uuo76rtvde6anijr1fp82yx2fh9rl5exgmmd887syk36kg1v5vt22fubh4qezdbo2dwdfu3ko15bizr0hfju58n757ib4s3yejqt294f4tdwaktosrny749sbepl6u928aazidsgwyufaynifntwjdf8h9611yqxmnqs1e6w6ie3q7h6',
                parameterValue: '3ofop7roypyhlkcbhnpgike8dhaffreenf5hwz9liwwzxbc95l3nlabth0bqpq5aadbg6lfvruozw1y7wln3rhtaxt4mirbbo70t7wt9hnm0khaq2yznnojbqr2aizcou1bkmi6nglne52o5kucr1afccuvtlvxwhi69jh3c4kfd8fy1u7qhfhu03ctt6copji4e17dzd720fe8834vxju7ee0kyaz6y2c63c43u5ppbmwxjn1r74l79st6ir7xqsshj8dplx8ktb2mjz7xmk3fuvpgr9gjyy50efxusrdnim07bms59izhc3ydavcpcblaodopzv15kbm9xf57u36157celxhowdhtb8p24t9ou4hc7sicvarwvopjbw4pzox6xuszrbzguc033numom6vqb8ljnm7exxtx6teoulhfyaoyn6ou5mw4p019tbasv6dneksn2z27negi38liy7vexijw1gerwflhnwlw44wk9nun0i6q712scsm22ft21g6wrjypikw5s55p8b8icspbvonkngrirukcs0k9nrsh0r9hg4618g43tkmb94c1mrz0qq6n5jnxk00c5t1jkr9khaa3iz2j6vug0f5jbl6ycaasvoi4j9u27nrr0kvhn74nmoqick1gvo7bs1j7dwso3w3xg4lmk3lknvv8t8oye3nl8xyi07b24tlu80gvi7y42zn1s0xvyxwq3obuokdmg5kp74ao1py93qxxgjaermpimdxha4g8yqfenblw6v6px1mqlyayohq6sf440xxnn0vuvzd3egsazs36l1i6mon1te2s8ytb1376rhbbkbvjw37qhjayv772ypl8mh9xsnek31glg6w2wh6oqfu47y2un4aboqurca5bfneh6u74gxh6x28b388m7p563js5fmwbnwz8bzd4oi93jo650uepba2k9le75ykmexaz3tnr0omc9c58m5c5d0yz2dal39jjsnp2q8wz1qopr2h8yn7zs7w8zw0sqa7fziny',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'r4rjb9d5gsssynuco0boslcjkxrqso9cxaq0k4hc39tpfvab2t',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'ksv9ln7f7zj2o7cq92033g47gc3b0lqylk4kkdcvmtw86zl92dbpeh5ij9m35f545k2mj45xuv3i4iguoq6abkpgsqgl0k76n0v4h7q1ehyzzmrhnoxcphbenq9bqzusykui5aw8rv86tpz46b7tbb546gnacn9h',
                channelComponent: '6f04pgbrjbw1m0rp7rzzpw6fnk56evgsbxxs2urxdbypyr0iqkw9kx5bge4zrkux9kejyeo9t51j39rfoijgyc283ekc4bljvozjsrp4g32e49aku4i46m1fvhz4nwpjdbq8944dieabxsy6mt8ayir05o2wl7ep',
                channelName: 'w5e0uijv834e4lwk4pvfysi0n1x2twzeq1tvgramqc3ayfxtmt1r8mjuv3maypnk13ifjre4do1x02dqng38fcj9vo9owpb5olrdpjnk7m0wt9g092lkgedh1rsir3bvu7du8145eb3xor0yw64t0px65bzxjgkh',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'cvpb27zjg06w1uu29s1e2b5qrmr7yn4nmha1v3drtu197fg71toqrlq57cip7ustzjoel6aoza77op7lo1y753lz7ef98q7ririvpdlc8v4amvd25gz3qzs01c9p2g22xbp659zl6jr2fexyjbgg0ddjm6gieoxg',
                flowComponent: 'hs6vrnldj4ubxb72fg3rxsejl6ul5553lte1dkv753ws6tw2bjc7lws74k90ndokb4kr7qwoeuj5l252igwd2d2ew85fzveuc2lo012cr5b359xn6nl4f2kmg5k8dype68oi0djnnqhi8trnx6upra6l47fuy2t8',
                flowInterfaceName: 'miy5wu7ddb1bsho1kp11jxwdbfx0muxrb5iaxwua7ait8hnhmfkx2ms029fbjxph3glnbu39zwtig04eyqj70fmkd9gje312n6y1xwrv9mn4pkuzuovx3z9mi7329hcxdnslk49exbq78qmbuml9mku9zvaksjbb',
                flowInterfaceNamespace: 'bhh390bka1d7a5wo1rfehiyh17ltqw047vx3hqbkc31wz2tg35ykgelve8qxjam6igigvfqsyed1t2cnv1761m3oz39was9y05ouiwzuczdmc76lfwol4r1cwgtfrer917p7yvteuaickwg13tae6lcc8d1ofbim',
                parameterGroup: '1wvec8dbv8zhdytejzc3iz7yynqzb1bndsl0i5f2jw0muc9pxc0banp9kxn98eoreqk3x20qenhyuhvlmih7493y36oh7vd4fjfeay9tvlo60dd4ag3445440rxwtsdnbvqcxbf8qn3hp1jkts6e8auoqy1scxfc0zxaz9w2pd06x9pun0gtgt7zvrdzfcjii6x2of0g6dhxjjk5z488v18o387vdqihp4k8v29ae1fjxaszz4t9s5asdzw6t0j',
                name: 'xb3z9b8nyxbxrc4m6agyd2rcv4gydg4ihv845z2vxy171hsa04k3m18f982ldur8q56yiob9xq5fwy5m59mdd64njotbtgq76qsntla5m90oimz6uxbp4q94yb33e3fhui38ymz0phn7pljvr8x9wrub49nsq6lv6u8he4ba35lqfusfxvcgbratwtot9bu309mulsuzjfx14kgnfookazmux01nhsw11nkoeql5rpbss7k8rc5slngygvb3bt9ysfrfe2outpkqvixdtso4ba28oc50xp3dpb2tmi5vry88a1uzllljhco0ods10c9b',
                parameterName: '42esfrcs8xytjiqky1oxprg3bkktp9facenmez01insjlxwhnzonj54ykhbahviq8j4euo93nuvu2xkfil9p2x7qlv8egmde1sn11kwzh6bgr85r1mgy5rd6mv0ssplvewvjv95fdoum0jeow7z5dg5miu4npv34mqj49nhiei5mwpn3qvxemuci1dp27impiid2oaprveexuehz67jzqr4udmfue6xvcl6bkpmsfg3wxu5bbdaokecotrwvrx8skkwp8bte2bd3dix4f20uylo89iaj1nb81f65d38wld9zylj6has8cea9f147sb3m',
                parameterValue: 'lg4nwx30fhcgqhb2m4rg02fdzpjsj41nsbs61prknuqp4n01nya7lc076il2veoiymi31cbru4pcm1vems18kyz6tn2p4n9r8wgiplpmuh6y1ec1tcurv1wr1j860obzmgepy0d7vx58wzp1s4uungeglx37r50rv2b3c3w5my2gh0polpq0ydbh5ak7668dpewczxmvcikpfznubs59fqoi9c0nj78aas8hiyys26fw4ky7j2uik68o5khaet9lpzex0kx67wfd11kvc3se6tgnwrhp42xsa4rtzpt6uhglbi7haa1t7xqmnppt0wririahw4rlnlkue354ab3ag9s6i6rvbjcy5g0fprlb2a07oko11yyviqt3reomnvx8k2wzn34reyb70njlwz29pjnmyw87ta07a7sjnbisy9js2orm0hvbjdghzw25xhckrvlvnavn6833ahlc9ccqfs352w3e6ss51ibbkizrm2rfxr51d6j22q1hyi3rlha5511u8jmpkcjqo7u4pz7cy0k37slgs85ahi80jj5s6q6hx9d901d80qak6pa57eta5il87yzfknxnzfg3u8uezxdrtm4otqetwem6uqs12xs22tliaac4tsegp1pefr6pp7e5mqvu9yo6igf2gvhzaaxg2cd2zu7ea4cuyn6imm6fv75narelh3h96av1vptfly8284l9g84wfe5ipw0bvrpkiz1wjxdr6g6ivd2oniypooirt4r2uekh85sbib71nbkbc636ehyx2rk63rgtfiiv94nxc91zv1flmzxlxotbhpgaaokgnkb80prqi0u6wv6ql4fcdfb3obiduvjcmma00czg373gqxsh3qmc5ionaq5sjm8k3w25cajkycvloai3i4jp15j3u7u6t1r71mk73zm8df4nqvuo540meva6naz376bgrl6t0dbeynkn2bsbpnruutrc45qj460mbf6k7osdd32nbv2m67vk46neeqd5wib9ure8fdtj23zp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 't0gewl9nhzx277umny6pxdh1s50oxxsindyk4k821t12m7j5pq',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'tosdm9o8ch9dnxr6wf0f',
                channelId: null,
                channelParty: 'cibugvm0bn2ph06uufz8aa44adr78vst322j6rjiz773eax4jfznemul043cm8mxugruei4sy31o98izndnzzgd5xcuaavm7qydkyv59wa698jlsdy34f87hjq11ykj9m8kbiw5r2he5bxvpcml8ym04ehatyptr',
                channelComponent: 'beyep1uutes6zlrv729e31984x1l5mxrtj70svd5t0pom1difrjmxzt73slkrelcrjjenp5p0fv20dl45mpo5w9ih5bmshzdvxev16rq9l6t63qjkxhwjvmqfaz9uxnju4sctuunb02r3gonealsrnvwhr4mf5gi',
                channelName: 'incaqc8b92aija9lpn3patknhnbvnthms0yt6j5igrqi7ucrg1hzyi3a98vv7a3w6z4oqcbgqlsawndt7le4puro44wes3l5yyg8lqzrchk2nqfdob0jd9otuko8gpgrzatvj7zz6i743m5kuw1so1vz2c3mv1qo',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'blw4suszgozbtokp9mbuyye6y875kgk6zz36qqy5mlkxfx20ghecx4p3smt818apk9mwwwmdm330vxkv1500bao7g1vb1xtf3ifbwk4czerwlj3w68fr9m829zpkduabeu8smj5am4uecmpupd53im6bh3iyy2ra',
                flowComponent: 'y5ca5b9c4s03zoenxp05yeay54weiwfr1ngwi9g9ampkt0yyudfyedtmq60kpqn8dws2736qvwutpim0fuj7aplxxr8c91gdkqwvpciltsiektr8n2651m6brxss3r3r8iwk4zjh9txi7yz4as9qzelpvs2xawmy',
                flowInterfaceName: 'dzyapxu9oo9v6v83aj3mheuj5m4scs1fo1j8wb3wvg70fzigi1vz9ht4tloomzhxqis84wvob7n5o85zkek3m869j5cqzk0bu734woue3gf1y9rj7qem77xprd9t9hv3syoowiziyx55hhbes9qaxnc3staphfs2',
                flowInterfaceNamespace: '56fhafusu1zgwveoqawer3j2ixmx3w8iv6cm39l6hkr8yw19bhcqxjfqpzg3y5esd1lofh71e4l5689qvf3by8pfp5k9xfzmmekvdzhdtr53g91rbnegtlinr1sd2kypnvglu41lvgbkan86fyw95lx4r6l8mq1q',
                parameterGroup: '24gzmpiqej5349d60rxanpxzpg9m5zf3ifddo1wbvhxz7ltx7n5q8goachh0xpi9rj7drg4ijijsk2mz67trwuqddg8d0qc3tlzezvm67l3ttcdeivc3otd2bix0m3wxmuda0u86j0dzdnd7rqh15tuue8doiscoy4b6g1tn93ml5eo7x4k3dwcq5tq5h0rvw1nfjm7bvwyaeuph16iftq2cm8srvu0rdmt0guwb4xeaeedrakxbdlqipbzb2mf',
                name: 'pu1850v1i0rzcgilhe2e8skgdz5n6rofioxy10ur5tfhy9liydri3qsgrxdzxfvdnnpiba415tb9cwclvtz6004bytlblg5ov6riv77mlt1cqaowqyla4wwfttvwhdbzqx3kponhoy03f302jei3eb8s4de0y99jznkv2sz8gxb0lmoqc655ko2onpt2fnhp1ap2jeytqgrtt32jc54yclmj4xksvemxix9w3j7nxb2vqgz5ocukv4jidwocs0whxlwlqjeyvkylxmcflu09valktacinwvi4fef8a2xuq0nzm03q60foppu6311y9xv',
                parameterName: '254fu9vtgvstaxkhz016l5i7fyoav93004n5xu3qlbyu1eofjabr50dmyc3tkjhlqs2q8inft7naeay2ahbxbu65u0yquwuhqkza5he0gy1eenxdd2wl6dsvaz4vys6m7wnok4albmtsogfq7ehql8bdqct86c0q97ypsufkfm47ahnoutvmwszw5gzb74486vvdcksgwbnw81i3l7xm9n6fm672y4rk9k3c3d0zb2ougs3fxs6uxb9kv358eulto6gtwncxb419sf8xa4cdgg15umtcsc0ze2ww8hg1eeg4fd9bmo6y6aqoanadv9ez',
                parameterValue: '4h94wx9adk3pg80gzb1j86cqf3gwjgitwjqkdcz6rodrjch6yqbxy87n81bxz6p9dd5rcovihup090ajo5fgk8jw3mcudwzej1hms37gvu6kt4r3vy5436k39qdek24qs7uq2khc0sdwvrwk7w9pl0j4gcfua9tscrlufotkaf3ranf4hs6iiqu3zoc2k8l0o50jjx4jnj2rs4akq85lavlj2dvkasfhf7zb76suc84rngds6qeuwhz0aahcwfzgjfuxj97kbip8izlse9gsfle9agqkni9sqz1vda4r5fgf3atm002vn85ntq3t1hvqt52mkjq4myjp4oxkf14qqqze6vqqirjh8oldn1lhqjen1rmhg3w4k6c2v19ob260v6txqviktoeuij9ny3puk9fe2z5gzki8qtbi2yttb6dp36tpvthxh0t9ki4xz2bb9q591w86kw8slcrcmugwuhhhxhtesdhuoqrglah8k64ldj2o9ly9t1oh3pll6k7ivil5vzg33hlsm73rxpzv02gh5qkv4em45lmhawl9f08cddai82ztxbo4tc87m250wx5u9miz22eeyfzj1kxsy3igxitk1ca2dd25dkgr1f01cvhlc369v7t8wqcpz5od53gt7lbyc4an6grvv2xaef45f4evn8gj7je6os6oel4dje98ffskzxyd4haedbix5e1wdjv9chqfuzpy5nvw39fel7trdnhyn5amvfbt4linvacgrnxqtigq7i01ae9p7ftdjiv8iod4k7havzryzt7ku0vrdtqy6lehl8t2bk7pc2puz9xvjjxgr42ncjhvajm2jw7a1bbvaoz8ddsm9x49itgzo57z3kh3bmz9r0l23z2li669lgq2kukn73ku9kqwreymtcwurdz1lobwh6n9601psi539mi5ilvif0cy8a6idp3xk5jv5lk5ulrhalp50454b3izno9mp3s3ddy8i46meb9ck7vrdea4hhh44xuacmtklng4smvq5bzj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'hd8awfe5cfu23qs3sqvc8zmav08an27125bnusps9e15bnf2gw',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'pvxnyzfgmbu2xf16tx8i',
                
                channelParty: 'x8woud4zdbxs0ovemqh2ixlo3f2tnttqbc99j5qd458qklkge3q44i49glebb5833bl9f6l1k2h37yhnvd6sha8ab8d2zbhrae7rfo32raxkkhqfccxst4zqhnou3zoiaquhnnoyjnh11sepnb1deown035fsqy8',
                channelComponent: 'ngad9zp2vpsdhxjxcogfx3e20d9pi405j3xfrzv94je97ffz4zch2x2dsjv7cvh572h8tupez2obym0pkc5mjkalqgp2v8a9cm4qs1gbdkzhissbp1v6bvduvoz7csyok2w3hmeby0oqtvmzzhvt4xcbas7wuz49',
                channelName: '0yb0d9j1stpvcnwtiau5fndlah40fdjud01bzpqkj8a8v0tqu1ojbis1ext2zert6ynbpvht99gzdrpylwp4pgfscuxh0evsv27chhj3k4s0gwen1y93cd8whswymo2ruoziw0wuroo4w2292ugv42q9w120eqoe',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'o0xbvfe06xzinp05hl4jzp60xry5f6wwcx320xqlb305eb2cevoiwmk36lohdn7k1nag75fqz8j05ck1wa93xwqqmzxike1v813hwsc13qvmbldn3f5yrx7fr707a65q3a1uomosrrajvmjjma6652v8wcnowjlq',
                flowComponent: 'se85im9jym57sp1ufd6xsp98eg594tpdnr0s03zs2plw4vusxcd57tr08m98g8qwbctx7oqyb95bo7lnye3v02vq3g5bwuth0ng5z1kvlvjo966ajx5vcqao81hza43nyi691zf5pm7vrolcgb2yrja7j140de3j',
                flowInterfaceName: 'yez6feqh63woxo7tal67jnqj4cv1aufc1mggnecw5u0uh55sn7tl30c5rth5jm6yrkoy6iydpi1z0pcufy4xrphxpkymsjhfbjq487w3uy1yh462iohoqh5v03128aicexbi540cfyu2iqlcv5ciagb8sr7sat70',
                flowInterfaceNamespace: 'wlrk6bx5va8xn9qifidt9z09ywlvv1mwqlu3n8v6d8cgmf51uwt7akw59m5j7309u3gnnudyszwb45om10s56bydxlc5heosxpjw7dus3dnobnzfvqxkup5l2og7on332pcllc41goofm9m0zz6l0hiperdf9tvd',
                parameterGroup: '6f914ua8khxdseuqk7vczjwlin8ebiuph1osjn230omyqf2kxj0hzwgslji8tpp88umds7o7cw9m6pbg41ghszgg20dvbq66xxtnovgpew7mokm8lkpmzj6hsb1b1bwotxz8wtlgxxvev7tqxfo1lwmr4ukv2ya84o3b9trq6cspfzl72ai8ft6sihkzpzbpbu3nqbus2bbfd4wuorn5j3asc7yb2w7jqay3v0772zxuh2h7hsm9v0tsr2lzgiq',
                name: 'fpmm4gj9qhgkmbwfmc7ge07hqtgj2c43ddwrv00u588v8kond0ybww56fqecft0vt9jeysewfo5eyskbvvara1emrxlstw0puis0idqi0dxqfdmka46on7a80ekm4owa6snvwyhg1mvd0kqj3w2dcdhapkyaju8i1tvfkokhos2iabd9olqyd5hm5enhu3ftvivplytdatx37u29onimc9140hw0gew4yh7ugkmtkdes0zennffnfvqf4v8yfwah1f063da9w736f2v6gyxsgnvia7r48mshyf11w415zz70etme7ipi8mgghc3ehcg1',
                parameterName: '9w301cw4iy6vnl2g1m1zi3teu0ei2qn2act7w7w5firlwk66sl0e3juzdg5cnrdxx9p2f97i8zfzvueqbhkpl07m2jpy76v6925d3h3ij7mkebhzq0883i6jf0ym548eylsk4gny8uozqxs4hb27wjxaohl4gd5hdktcj2q6ip42f9hb7l6t4349gclsc2iigm2iqf7tqa08z7ohgr0api3ps3mnk9ztiaqucrqu2ae91e5in62lfvn6fo1xs3nz1kso7o8dk8zsgcdmtgsi71a9y54mhfy5m04kxosi3h66nj3154s5j0sa3qauqhv3',
                parameterValue: 'glpy1br3gjii6ekhm6awbqfqx42wwyj7fqqz71h2c4iq6riwpac5hndi3n9uuwdckcvztydxkuypgurrs55afpidxujj6qtteitokip04zv1vazf6meoazlwtqixaoms3uaaaeshiet3325nyujkw8wxupg9ggithcrk7icmnpxrx4xl9f6v3vc1of5df4wkj91pxq3hd0hnti478ewaduyojfwl7w83dlf2mllvyb4k05gonyyyuuk7iyn94775d09kugmg876lj2la73ne93bwy3cifz0yesc0wjoeoug27d7iyoke01hcyrvw0q32feg7fjr3zw76ettyioyogw4liblif2h68cfv45138ufewyqfj0o43ggweqqktln2zaabsnugezrwlgbkktgpj1s43caeoaffgj5jxpg4tsqkpo8ucgbu0vxyzbul993yxs8vc6ucal2u79w2pllkol3q796053w43svymvpo2nptckl6ppd30n2ybqvhlkghzllr2sekkwa2cgd0vxrjgiop0pk9w4yyjqmokodsf1b18w8qy5hqvofrotvrc8mh47ipqxq5ru1sio1q2fjtear5z9l7h8blqlr5f3j8fe94vqqqfuxgj0p9mqkn4fnxzwqwirnhry8p0kxf3tgrd87w6px349ih6s2525wn1948cffshodxy1qrez7jox27jn1db0woyvjyrxbvnkh1wjexizx9jzegrmuoap4sicp6o5j76735rsxa6ir2k033fquydt83adv9vid9wl3wka6asfnf95kbof4bbts2iqzcerasmzkn1klpibo1p92b7cizkyt1njbn9j21fge7rkvky4jgbxkjeeoz4kdqf4d5ypq0ged2u6qpthoa2v5g1wy8obfk8g3b0zw7rhqv6irj3md1ajcld5h5oc96m4m8owvpffb3rvh0w3c3m3hvsjwr5yexsvoj4otds6a92yzgvssk9duskv3iz2ikjlp30mgwf9vxjxnmgmmjvvxf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'm9ja4glnshtrpmca88pn3n2xu7lqqew0pyyn6kldikhtm6ihq9',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'm6bfbyr8kqc4kw5hsilh',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '3r7hdpx80tlh8cvi4b3340ewuxtbnqjr4h21vi48p8vh8fs92979cghpmdzul8qocqkz9lmnjmak1wn2pevfw3uycwlx59kyaasuoahqcd2yqgh3f1k37zfjf9ojvc56pfxpvsjug6tsv9ex8oalgkdt17y2g6gn',
                channelComponent: null,
                channelName: '0ythd72bte3kulavlfxbvplmrfrpji1t73eas9zxdft11ujgi0f0oqajnf3lp3toexejirhr1zmv8wougoqojlssno2n75ej2pxpm7951r9tiuci0t1tdy9jeclrqyinpws8wlvhwn1ayjj3yu832epn2i45drdn',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'j14g19urs04ziu45ynof182va5hzwlp0lbvp14509jqwn557uskrenygfyoojnd1n9mxai22b757xy2wj2kjvhdeufz6ll6gm3ar3rtlx00eec1jnoj67puczi355akid4ybmi8py89iwxtgcueuop7plahcamru',
                flowComponent: 'p5ph9ofwi2wlztjrlqwzy9s78nwtrxkqdxm39bi20lntb8vyraoeiq3hevh5nao0i36c830ydis9qop2zvsbksejal4cg9pjuaw0zm0jcytt7n018ah62kjxgmfzf8tf2vl89ct4yjknio1t7ogc5psrgozvr8e4',
                flowInterfaceName: 'hjkbb8mliaiw28064l3lmvrxyqkld8ixell4ve42f5w3l00mki0nxk29zyrt61niaf0f10zzzxjgfutuv6y5j2cvb5dchqliqkrgldxpfyk7fsrp2w777r6ypbsu6aqrgbi4x3juxh4ky439ub3qmie23gr8wfko',
                flowInterfaceNamespace: 'akwypb4vtn68n5m5opn29yk9fw2jr5m7fb4tvlvguo1cluuvqadtrm8s3hz60eipj453wti3ti4huk99cw565de7z9d549p2hi9a4cg10vb1nf9ne8kzd26sftih6k3up6ybt4jbobwdp9ppxagqxvn89xuzrswy',
                parameterGroup: 'af8pvqsycvmytwl1w6o5bjuhe5s6xnrz0kl8gw61pxjzins46ekpohu0wd5cm9l8axldrg5vhq0b5q7y2nhb7b72hiblz19clak4gt0iz5gowvk1i1bkbge5zwq352ghga602hbgshi9acbnev503wijhcbb8g1lnqlgtcq4cn53buazv1dkebxct6c80p3hs29dpzft35epsgdegeqwul0txdt2ikawz81rnr8e14qcg32hojkzasy4ajjkyf8',
                name: '407l7tqeqsjrbixvuj54zsoude9pn93kbggvgrtbd6e0d7kae6sci6a909vxq45zpon4uco5tqgjotl5mc46qft648zj3qpa9vhw1hgdx6266r4clg0e066frdg7m4gowjoc6rfbwnb3el411itue0qgmry1codh76af62mp9z5njndp9pe3n0curzi0oarenh6jc9v7qbtp6rp1xyqrj6sb3sn4020klhv525qkrtnpom5b8odyk3dbwb804e134u3jvt92es32suotqaxbqc2m18486iwbcua8kga7m0fthgc30bt9b9tynr6bfmto',
                parameterName: 'oydb62kpyos0lk384z64jhzjg15acspmg2bd3647zq9tn91li808li58hifndoxmb6gd3xs1auuh90fjovntlcd2a4zcebqrrrf7pcvpflsj9k4nuavfeulnuxd3dlzdr0l5u2zjvxx48gdz1yrah5tvr8ofq93dhdl35mft6140helkj71slzqlmrazyy96j4fpnls905nojo5efdl6hvhm2h1fwdhpobp1uw437m9ilpvbcf6go7x06qsvno2rpzx1p2nfo3x2dq42feqsved3d3mhzoq43or5bkeeokqpxx7nwr4gv6a9dktu3s4m',
                parameterValue: 'mcr8g6ln05dwxmzt3hhdzs0hayri5ss3et0nz81mtfu0ybi544jjypltazwsrxw9xvggrdtzo21znof3qjlxtkjj4ah55ameyq674pxwc0yhjvmudg4s298ssikqj8sf5kk3417ww1pduir2j2tbm2zwcaq5ztwl14lzil6e31s14efwoph7d7h3b84gr4cd93n1hpaxrygxy6qzvckiest411h3gwimjv118wvzq80bijrvee6yu1a3a8gr9puabue65eng3b8boxpaq7yj6wknqsgso4qz8up5892s3w1049ic9al72m8o63o09y4s2o7ujeb2mf0ul189poq6q8stzcsylxo6podbbjmmzvp3wi664j3zx68bqlsowa4o3c80k9um1a7gelz0lrdj9skdm892oy3v8ickxtgp9f0d677if55u68n59t0p3f6m43tvrw8k5z2jeblpr7943my967qgs83b4aaj0gaj9dcb2a415w6bk37jlo1q8jqiewnk3cfs3aoxxoub0g2tuz4kwos5j7zjndgbg0bi3w8db51j22o9l602ysxdv8oa0wa6aaxgcivyp2en5f3fn1637j4ifpvg2a8psu9hs8lxzk08kf1h6ro17s0stigi4jxxx17yzex89elcje9i1kby3oymegbi0k1sw3nca0c06n5bcrguf5a6ww9w7q6vciydblcu45xkl52zyv0vbg89rs251s1ubuva46sde7qlk48vyhe3s1luigdrznegpifthmj0wpmpzi16w6i12jotyfp3z28zinkwt8f35d0zr3q9y3dc0mlzyedc76yaygpj3etfpm0x4idxu2bhgf1u835fpt2czh7f7sc1lp4vjpt74cp1b1qss9xx3m2hqfltztbm7y5lla3jr6srh1r6aoal9m5h77knmjsfix1qlne8ntpbsso1cqttpkty3kbledyoieemc1bvsh96mqtmn17fjergghrc0bmrv2b9efmmolaruzlj8yejjqyw',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'c17f70d2p9a0a8slijvg4e0ep4w5l54ltjk7a3zrdjtak6wxxb',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'mo4rcdkojjolbumwqtxd',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'nxclsmvrr5krx2eba5fjitkfx9uts8593t3sbz354i8q0zs7s61h4d8sfsqybcg2r011cfnjvyko4jc5scq1lxxqvbmrxhhotsjnrbymq8dh9fppvhan9mb8lfmgsvj5zs5hvz4lopfx85qnrb7f0j4utxfp0gf6',
                
                channelName: '5sezaz43ijdfgn08u6s4dx6yz1i03wr2xwktgft0bvxwqg3zxu5301qvzjumamaev1jrbzqy2xgt8qkb3znlpx9yod3tvz1kaxdmulgbtp4mrnipkv96p624ihkp6mi97gvvpps3p0eqkg8tu25vghg7lfhhjn59',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'k2nmfsenuhcy7xpp6yt7w3gohl0rbi824ofge755vuhecicd3wmiazjbk45gi3vtzq4flsgu6p8qdap6yvz9985q1e2ejd01j05rzmh941av00s0ax47mq806fsjbekoz89eiam0b3u4nyw9bw33o3zo5unxb798',
                flowComponent: 'qo0fvr23s5uf4v5r77zxad860a0qvjo6wm1p42tidyov6h6hqq5vnlidy4fxskiq4n0ko3giu8z8j9csd50xgdcla9zbci304vko4mwcvn831wjdi4d1rbybxhxjlq7uktvhw8ph4vq2bp103qrjpgp4yyt7mqin',
                flowInterfaceName: 'x46lgw0anbz0ksryiqdno7708dy5lwwbu38jw8ycbhwmx6ezw60xdbgtltee5h7084kz9c54fhn8l0puiwigd16vun3tuafxg48bb4i9ena7au5d5gnqsy25jzc1awwplhp6bqob276ietragoy3rkahjpbamlui',
                flowInterfaceNamespace: '1w2k8edh1ll1fjmh61yihun20y6mjbmh2ebqzizde9o3tq4wu0rfx85dwjs645ne843lq4c077iuhvjsguuyxnht40d0lq8n2rns39cvqsci6rbnczhu4fxfnrlj6mtg10ta6f4wo95zg0wepnyqpk0s3gk162r5',
                parameterGroup: 'hwlaecmyrtvvnremftqyqhjc5hza9ffo9xah7y4qdf5m7sbwv3raomfmz2yqzxbnu5xrc68bau4vt644ix1najp1m09yarskis1uqrpz196lqec21fa8xh9gjx7mc8obcwhcc2vxvmt176zz4oyez6l8h2nabdyvz310y4tryeoso1uk1owv1uck270ojt7fm2svt18kci993wh8bljianhrek1h7nto2l7s9smdfz68k9n1zvh0kd5xcvuu7a3',
                name: 'xfdp1sy6t19846f7718rxs2mkqiuc7gy626wio222zreu0fsge6y8p4y4qvd7lr94h57ooquc677pwsb4nhqu8nvhmbwa3m3jbcg0qqztc2cc6a37um3v3zgeusbyy08cb3wwmb4lfososd2ufstc6mxpeg0m4gvrz1mejconmiotnw74bilhirh3ahk52z0yrkamqv43dxoy5vvdyp2i1uq2vbzgztag7yknm3w5a94w1cohuq4k0g5308ilxxhqyccluct4im75hjd4k1zaohsmxd5rn89q4vm0tg3xb86l6w605jmdv7k8rkvy53k',
                parameterName: 'w2qlbppv7yocinoh8ozj6j92m12yjp3cru8ozloxey0f2cdw0kpl2n11vpir4vst8977pqr9fo5zzt0bk470rv3alwf2bwhjstmdeq3r6zotgl7csndybkkmonw3sx37o4qovx7n4kbphzo6kg8pwgjop8whzw9pfgq2f7py133n4tkx0wh2m21vprxgihpgmaoj0bpxnuwmfi9s25cw9seqhtans8oeiomiu37yvffbgwh5giwh0bvv6j4tfuzvoqc10336axkhbrged1ksu9oejxled3awp6mw9fj6qf1fnfrcbhmpyp8nctv528w9',
                parameterValue: '6ladh2z8ydiyss2xcgootfds2yuogzoc6znew6gtn519xj9ncmvp4ajxe8c6u3uemkrq6cb1pq6yf63msb3y9poox6owlnmigax1ij1js9plz6uikr88eqhhqi15c39ajdehvj67mh6vuo6f8e9kjg764onign9ietqcfwgs8jfhagjrdprq6r0l6yp5kwde8bybpu4qvuyoop2h1ay3olfug24k6j6vqkdp4b80q0uzx1ye2il9kb3ddq5emmpa8q5y176ktzm5dl1u9myq5e9b1tj5cm9r7foimo1envf5kodttsc9wvbuz7ls1voliut3vfkn8dt54a2ue0vyxegig3opnebn95llx7td050tcktlaav16x9qupi29bmpkllrwrfmwu5p4sqqqw7c7t92v16p6fh2ershid8i2ksfblttafxwqbu30lqu6e8kbz8vaky7cx7kfoiahnoeot3qx1yooycmgwu3znodtu8fcdguc5wcowlagfe86jhgwaz12nzpstnzif799n0mjpernbuzbi695jzzahcczsgyyv4myoljd4ih27s59hl39jl5qqyxa82s9dbeolo65pl1hhwuw1wnb4x4y7gp29xlpb1kddgmwk2psx5saau3cuydj7f00fynx0xo9brw17mlt4czq8y9w3p28f9zze1hnslmzxeztfikix4ez8ne67y4gmsd5tzlef447spgq0l25ae5p00hcw9c8p0bkdesyp04bk7qf7ryqhxrkgn7icvk92fnyfss2dt4545nx9v87wbn67vmyue6pf7m1jzmnhcizgvcq78gpt6kjeebxww5jwlkfq5hk7ovazc0e4q0lducvnf0zpk3xirzcfl28v8pxzcpy14fylvbfyk1ozj5ruqoymq2k4q8q46r49dxsj0cibctmn420g84nlzv9dvti0gyia8kv0p3rnrc9c9hnhywuhfv4xadsy58f1fcntr7577w4armfjno6mg7bbzq30ccdnn0mcptv4yx',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'fuzngpw8v4tft3b92vgzb1n5e85s6hjrjdz3925chz9yanrbxn',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'wprirleth4kz54m7of7e',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'utb2czuyia0bshibmu4s16uvkplkqqyvh8q5ojb4pjf0tkhscrwor6svbv78e8nnfhwxmlfp288j2ngwedab0bzkgceooqg3y0lu6pkv8hr93m2hrmeplr1lm90wsgfclaqakh5oe2b67tb5j9egm6mrhu1zjvux',
                channelComponent: 'jya3atdx0o990v8z8nslav67g3hrqp718aoxd3ai5ep9kbhzfvceagwdbm341x96ddm36lhzvxsflk99xwaydsc0hitreig1o96rlrs0v73fvjcsapp5bi4cm069ibamrzyhzlqq8wjeuco43e5ati278yxq4mmf',
                channelName: null,
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '9vuamrthtjuqej7wvtgrj0fj4vn845fj4osgmkyd42bsev8iuay5vy4575y2at34uhxd8qeuhzw3vbve5gl5e0i5elqle6nbtd5u1oqync5yfjer1gc9461nvy1gediej0xyqwk9cqgbaxlifeojqxqt88stfm5a',
                flowComponent: 'qtt3a7omrc81n6l6y0xz6s9aby0ts7ve2mwitvys0z14mp74lpikvuec24q4j5m5f20hiyv3ylh9io4fov9uuyonu6t5k4smvwqahh88dq5auaq2wz4ptwyt1xyaucq30wcojxosrmstsz86gxwn67gmstu1r8lp',
                flowInterfaceName: 'l3rw9j4ac27yk86044ehb6wpbl7i6ms5l3s23fs81wkq21h7q3wc67z72zqhbdn3y7507tgjry0vxl47ser6ilnzj74qt7txua0pc8p36ae823v9kzpdkyxkmwvwa6x0k87a0cerwafm2x6xx2x0urk9clyquk6h',
                flowInterfaceNamespace: '9v72o2iihwgrjl57vf52u9io6ivaz1nf4qyij8wkf3ojlc2xkp47px6c02swmntraqxrjepshszfex2rudq39p0ruolkdjws5679if42g5hs4a2z7nimp1trymml06hdqzgx4lphf48ovjc8adgv54pmxtd5oy7r',
                parameterGroup: 'nkx8hleiqg0h3c1ush8b349gd01sgxs5l1mjldsz7r5snx7jimiua6ur7rpqtukm77ax2yotq8kmb1ap1y78gdogzo643qhsi1e1osnznvethipy6ybpwmvmnttcrepcfz9je0g5wl24j0hq7mk88d64ilsak8evsewejm6na95lahhvuwrvbzj5pgt0zg0ukkugqtwcue9kvq0k6yms10ehivkq6d07ro88jaylqd7uhwzy32inmnv2ieq7452',
                name: 'q9r4e7w83fgrxaqr30rf1kc8gfb9dakrregi5xqgdyh5i72kb862zpv4c6wjon34x1qqropm1goppm3yn5bqso0meo9naqohdjhg3xkrd7riwwtkdbdt2wmiombjl2g879hdmbbtv8iipbyo7rxs4evjz1rbl8kgsqmy62wbfslxh34i50urqj798tdj7ni2sxk5dslmgzvqhsa60pfynad66thrdojxw7cswb5oz5axdsyzk7r11rl7jpwp5a789dg5a3yh9x28cmq7hjm7gv01wpl494actevv1801n44ugijmlrhn9mpopuphwt0y',
                parameterName: 'a82714bvhsl41t1j9f1jkpbn9skf4p0gf4xuz7gkvhkcnmc786yu34vrxadj9i3w3ewsxa92w450o4fp6f5hpsd7tdww2h6zn4enwhd865olhi5z7f6tm4v8h2zo4bx5s8bwuxar8cbw6j673sphi4fxjinz2sn8jbserr4x42gl1wmwoy7jeuamdrw0nnoar5do88eh3yt29apj4l43yi3kue9w0n9tls8h1poywkcpyn2q7yxmv6v1f1ihhy7o85f9uulhtw50r044byln3jg3rhl9a4uvmkvply1gaa9bgfei4q8qwqamqbyr667u',
                parameterValue: 'ywsnm1zr46u120lrkowsw1fh9g7wqo2ss0fkk4joaekce9uca78aazxgpr5x8ceygq218583v6qxpeoglbp3bg7z8zq1874tnmwppydzdl326tui2f10ntoqnzqp5to3lq9w28ww5rnxkfppdn8t728wn5d95trjtnf7dh3noebtokj07achzge09hr85g2l2h7jc2f5zoohzvh81ams5e4dscm4324vxb6jn2m8q35f2pwoaogcx6j90nupgzsvw3ujsfo5r910ngg017lnjr1xeuoowytvsfbjcgsic1n80f6ivdg08tan5ovvwilhctrcil436gyj3yo7vbpzpnaejxh3jmmsv9kno429q2479mdavj7exf3cqtfcgsbfqvtdugz73qa9fcxrru1uysx8nus81lgkx4cvjaor54c0n4klcggsays6q3l0gyfonmozkft28gui9t256kbk3xd94zpkplrid4y7dspklrstqq0u364jya6w3qgtg1gaq6ydavl30icn2rrcs9s8shv0764velh2dnj0p022efc42ywwqw0nyw0v13462grdll3zh6pwhk90etv39s4khz4ceemcrtjk6vv6ws76u2nss9z8qq71txj694pblr8126603jt7buidm9shznx6r9wl5n7xjlxukc9f1ebiyhh64ysfmnsub0j4ujxjcbbjz8vkxk0cvn5ua850unyz8anwhw1kx59tf0ycz14a8usxsudfgs723fx5syhoi4thstrs3de41stxcltb054rs7rw1gozshmdgp7exfdqhlyjd27h9d3b33skqpg6m85jtnh9vxh83xnxe9d5tyalfs02jn03rjm4kxo3t3u3qvs2r5rg1dvk9uvpivcrqzt25hylre5ko1ijnl80qdce4n635qrkqys8qphsndnkelfqjxzoka290ijw63xuaa1i9tsouo5gdav4acsqq1u3k1f4hdijzzgwco05pl97bqm9mnz95de1rn7z1u17qzvu',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'auo1lkkjcl31vuebjdy3xq80e8o1sjabhiql27t42wtr37wd5q',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'wcg7pnstvkj51tfx259t',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '8pemmcd9fvyabavyo3wt1y91eoj9zwynvm5oi9x6ffr5rnuiup2d5apuaq2ec2fcpgwrwryu8f30x6fnph8mx7ph9vhkmkqyz5ui7xnfc0p2lz4x8ih8crq2d4lu1ofm9p5vuvbwbsckbuvcdg705xhnd9mx3plo',
                channelComponent: 'btevkkr6m2ojpmtmgks5l25tyq5qm4egfk2l95yho2ntqmqb7lnxf7f0kr2ebsg6ey562ch3qyswedsvj6z2n1wkplcoo2phmoxf3uj1yepm84z6cfb17qvoszy7r6inja8h34tm2sma1qsrmefx1ra1r6el8vze',
                
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'rjvz0x1gnlkh5ptsx9ompnu8fbxm22hbmtay8bu1zt5gaiwtvzp1g2hm06qu3jt7lta41hov0jucoio5c90k22gszm6cw15nh3qsapsvqgtrygw89qacqnlxemtdkexcoqmy9qd9cqaxk5lz1eujk6q3h26ciq9r',
                flowComponent: 'j7vpo2lz08rh46het0dtfcrj4889by9atxu7ppwnsrbmscp0tox0jbjyvu7kd9jiinbw40n9l03sgna18u77rbscymjppn6qy9cxj4qyjd86vdjdc3tmwtn5fhswv2v9robxjv0x7y6yue20cw1e084lfes4vrm6',
                flowInterfaceName: '93n207073s9npiv9t3kito8dk6j4s5k0amhxmggxjmbbuuptldbgru838lzgyfjk51n5ng58o4tuck3acjqzsf8efmfcs8z9x5foxjndjgp9mhqgt2e55bc2j2owoqtnyde26xu35rjg251qw62tiib17aonvolo',
                flowInterfaceNamespace: 'watwtwazakahdywc433s8dc4d0xxvooo1wipvsr96ibe3syky54oywx14sqdri8unu3wn3e1z2zv4e9w2398scanpgrp3frmvw4tlpwbx4nzd5clw9vvjx6ug1x17mjcpk8kf22vxnv9wmp2hs6xv7x5nl0g4f0j',
                parameterGroup: '032dai4q4r7yr24mgf2bjrrk0gosejtf8llckr4y4y7mhmhqb0jwyjjlmcvfh8bbthewa97o0ttbnwwe6rntkbj7hdalnev7ij7wfdhv3n8xmst5iodie3a6br1ppbo6dvcfprd68b842y8sr03wmclpza6rz88ucl156knnqw3k8u9g6pm8ur1tuljn32bjfuh64g1jdmrth6afqhzsnprm3cc4m1oxp8hzmooqpmvz8llzbmhef0ktbyvhmar',
                name: 'l2fwy310u6mb5u4wxihf3s082o14k7k2pjr71oq3t8jz8grkffdgwpfb30rb3bdg97tingcf72ybm4prkzmny9hns5bmgtbhjhybi53xj6xq98p9pbrpxrppwc7gvcfirdf69mhqo9129t0wcy9q778jvw1nxw5rp42l6k2qo5158y06mplbf48wqkvtirtlnusk0jfqm3lw6damawvhp4tutf8xb5b1ktrv43mcym6unfgf34km7iwyjww1o2n9x2dpawglwsw0guacccspvibkp9atwdjzbe8gpu8ifjfdgka82ohnfia9ury7vmqi',
                parameterName: '8z4ylbu5b10hp8p36p965u6puhqcm20jbewv3o54vew8nry9lxsqsz66msjn9ezhc6mvb2eduad5kjo3f1nk0cx02aajv8ekpccndu7oppqt2bfkzssis3x1ubti7w76c3hs2th1b0j8fc80skkiddyow0zp3xdk77u2ify3sa53lqlmnkwucoo9ht7h5pimpsbhrecmtgsgmjfq6pwwjppbxtuhjjobi1bbml7p843qawo0npp1mebo1l4x24xpqlvl1md4395px8102d57r9nrgpjesh8v9r7i4sz1nlh3d6wqshpsex88z8i5kdp4',
                parameterValue: '7ijvn9xui4vzezhrgja2mb8c1qqkv9wphfycfvwbnff01fuke5q61zuzv6ntzrzkhm14p3bit5cqqwkamdbs0wogd4ngbyk02tynejfltaosqj0tbp6nuwqwzdiz3bsn7410ooqf4x6t3huts1u99xs6mvwro3wz60th6ruczas2l8d84ugbrsfzriky6hsul2xn5wep7o6eocu1om77wpl884f68zl0od6s5q2v6irhcrlsdeautjagc464tci60i594hgp60s806x5ol2wwys2eibqubdv5jr6ukig0zomxi17ojv4d2zbn1uho37vl8m6csiez78j4yg2frfp40x4ibpd2wyaxq6356w07huc3i8g3opzr5cwg9mazcim5vk1rv7cnpp1rdmy8me5sivgalb99ujgek4indijphy1ltgdy7upvk84d3w6hyfoyfp54bgf9uuoacw99py6x022nxnxstlj546kvvqsiokhntnn5zo3rzrki98z7fn0brvm0erpwi2ih4tibk8vc80rtweeuj8gzx5n45g3l6wjx9outc5npvnjttalys8532whlzjp9aawvqgaa14lxu2oyx6n7uzfg6byhr3edp9jdtm21fh7f995rl78iec59xm1lvdd29jv5uujso62c2gt3bn2m3s6ru1vez1v7dyrmrtkh6rs2dstjvdtdrv4lb4rigosgdnnl155ym305uq1t64iwox2qzrdfhl4h7tjooyxnmq04lwqlntppbtxvnh2uxx9hxt754cuz4r1g75rx93c6h22pnmls2jzobkzqlr7o42gczuxgxjki7f6d293yhepc5aqn3ulzcgo2z21inb7i10uaiqvt2bkwpzc9h72el4llcgenj9xd4otqqgfpxlseetoqvu6kz6pmh97ykuahi4cbl0a6lnmgx18te4m55h67kq873w364aluoyhvkj41uwrmv13h6znttd4ncpcabgffga0va5k3ootqurghnl61itsl3z1u2xx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'cmzkux603c4oq4dkryl2juw8ite9euzulkkkr9cqdbujwhgktr',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '6bex1yri9dlx4h1z5ri9',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'qcsm7gn3unhnqvz9s3h9hzpk7m0yk5crqi377uzdzpivr2zmjeqz82ja3z4zgoweykg88s4m8mw27tlz7bimr72fkfxpc04ckgxzg11m2bo2efn9nvygxvmdmncy30yjf2tvh28ifkxr7eedr3ukskjbt8gruf8b',
                channelComponent: 'oa99up0o5we40cg3gd8r9g6om25m42zcoi0m2jxczqddm6br4fl8ujf1b7jbax6gvn9ppy8bb7fctces5esiidyjezml0vjqk95cnsaxm4ax987cd3j3frk9nr9govx7wrg8bri1sjd80900432qlbnzi3fqijgn',
                channelName: '057kefn4ny8cz3biw1d603bfd2rlxkng00zbqaljrdso34s7dvevnr09krlqkntw1pzbwv9oju2inmipck4kc1nw51uhp8ezlw16hz42by30d9p38hpnwsndazuscnnf3qd3rwtd4dezz2nu5qu36154dfhdcd9n',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '4ev42jyq8565nrm983jqwppmreskpylrmcl1tv2nlsygp8dm4lfq72fxgc03eq8dbz37lpjzz3tn1gxzhx91ug2u9xfldvsg2oq3g6os9l8fo49rwu3rkxc55zm6lu8xo6vdr57q4dpgbe3cuaxw0w1wp03dex4k',
                flowComponent: null,
                flowInterfaceName: '6fj4i0ndmxy3drv4gered5116txk8ltp49mu7g3xx7qwn8swh3fra4lq1fk6k2x9vonlvz29cyhw4sm85mr3ds7ilb4ta0w8oyggcl0rkee3j0jzpqi5itxfle09hojkq5pwlu5byu3pzpedh9oxtcm7yk7nzk2s',
                flowInterfaceNamespace: '6e9l6stql48u019stxus2q5g4ldnuvs83pjj4bsdhg8uj91ex3t2vpx0klswhltigid81cvxpxjdvdtb8of696f71vy9f4lp3fgvekq1j62lmrdi44nd3g07ltk5cmjoz73gp9g6q1q1kjt27n9s54n0xl7asg8a',
                parameterGroup: '5i9hqatxbj9hblfaratis9rdx64tht7w1g53wj3ij7xz61k2py8t6inodumzi5hhx1pco6fofmu0qkmfha4p3ba0m928hmbst95v9gesd1amtwdhx4muyt8ox3i6a7due402pf9u8jhm5346235k1b7uy9607uux7ey1rfjz839a00mz2oillwol5kjc3jhh2vr6emqljd1hqgihp0d97zofrkl5g32a81xnf9uqyau2ymc7p0ou6frxgmga6mg',
                name: '22jbufti6pnyc3cpv9g5qovf1ptf3nk21eqtj245nf841hgx80liknctg2js94zfebdze5mwfqfs5r480oxso4rugfaqy53cs7tr63zdca090kj908zgw34dh6actx9mjwjvbtosxxh5wnk6m76es0bk9ya2w76rxpw811raaz73ndzcplq41pt1tsdl3r9prypn3wmcetwekyxhq9a8ra225bf4kx4f5w088s77zoo02vdovs635um3c5nhlp084wre8b0icmb37dta68z91ma0mb351s1f3upmax4hpej3nhka8cmuq216ryzh6x46',
                parameterName: 'ssci1510k372z39rkc2j42yq87f9fnxlfvn0shyw8re6yxk4lspzoy1ouf6n5wmj09ed9jkce26ce44qwi9iaydcde7ptry1z1xa2inef8rwq9qu1q39gkzy7iwbrg65vorae77j0hrwvdyn35dm9nc8pnwadnnspvufxsy0p3ev6po8pctfq2dgcpna5cwstu8j8ovvm6qhzebgc23azpzkdcoblgnkudpw5qa0dp76bgmqmvrlqqqvdd7i8aulh46xoly1pzks37pfz7l0pwg5i67i793kcx4ccxb5tx7m1xuy9svq69qnu91q7ed0',
                parameterValue: 'v69uw2exkl111frrem6umt3htte5fuvpx325xvjr3ym646qljy5buvpvizuvqvfodzp9r8o32qfl59hna7ig1xdhdoh153akwckndnct3vkids25y114vtyjb5bb00gzgi8fgdhg26xf01grooyw4k2ryhifphklrr5nutqqd1bwn4duqviujpeb0v5bh8wa3tuotvvzj03w8k3xmretzfgt7y05f27bkgu40k9lrshdwiz6x32c08sbsz6vactsgsuhndn9v522pckk2mixx95x0wbst9sao2tmak9mvbjbgf4u3qtgxmtj36m67l3bs29uunnunms8gnjwnkert5iz3ti68h7tn73tl7zcirmqd7krfmubvs2ocqdpghvn9okybbaooc7o184sesmdpgxbztej20r7hofaql5udkedi8h79pgf0ybxgz3zomhfhbtrc6wvs9d7yi22tkjz703p4fhewag3ftedyknzdxh138w0vkqh4xsseoxtatvqegpok7rifqaboi9q2amaix3g2l24x0qanz4brhes8jr47f8huxtbny1rug1huf2xbk832sn3bfhrqaljio8hj1rk1a42z7vamyegqg9j6xg70gae4kkab7yiez6q6tf4c6iiq25oowpz8z22zwb02x5qromc9lh0jxl7xf5iv2mwcxo52tdzkmf1xn16dzierqlmdk8s6d4hb1mdp4ruy8eyxvm7wpf8vuwtvfnobr2sy5tqmtjownxbtt7dcv7aotpgszjaldsvtggbpvjmwqc9h7cofkjjl3exv7gbpbt6rlsgzbp76jwytd0xywmearxeha8y73y25awv1ghbxgezuu9hewswgpjba50vpuipj1gkzfyi8ktodse13h9znrlflohqkmqskn1t7c6mjfalwbtemmeljraidg35yarexfe6a9qtaae7ach8gd2dxlc4pstm6w3hagb5a1c7s0y7jzcy99vy1uswvai02lltt9d3zu37nvahoj3fh8y3',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'xbpjb4aq8cdrbevy91ydq5co00mm31gqy0vout0e3w8t7f1syq',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '5kupxjp18637dunnxa6b',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '0n1idni32lgj4icly6nblpu1mrh01pfibnr26v71ayhuptvexyh7650cjbup3dbvpj5nvyv4m7i5v6g0juozxabqvm9gqdl459ji9y6pvk60fpopd6ff2rqmarwbauwvd07lky61bbyfcu6ja3etx9tvnfbf6hgg',
                channelComponent: '48hwceydpmegxbd7puuu7cpb87pxemnafn0fy5xkrsdi74hfmq9cn5h08e26n6kiuxteu61lpexgqbji4v2ivvezhbg7ulcb5oredz0hvgokimezqy6ymofq2t4tad4m00awge87t9h2u6ijsmmjnesxkkfyol5k',
                channelName: 'zjvf4thf1oys66o0vqbbivwro6qocywxdpg05eap046yn7urjxmiyog62qdkzw6evc9uifge338f9uhtnn842ekblzso4kd18f00s4ufd1qlenil2yfav37gtydzymufy5z9k9233tlvmcz1s5prpacgaigndvdf',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'h7177kmyt8nflgoejabv05fvb7yhigcxp38ty6xdtli3vvmli2s27y81n0ejqkh5k6oewuq9unth6qa056c9vrnt3481y3eehnwr0jodwo3lz7bfthdu62opiwzk0w66yplf3s0x5hy3q4j932oxucibyupghuwm',
                
                flowInterfaceName: 'lttz3zknlm17gh94nrwun4ofx6qrvg6z4qgew9jh9ramy8cav7mqpntb5xzin9ysjl9fpgnx8i0sejedxsxq0i6nuobrqh8cvhzzvu2762ngp8itkwm2kxg2g2qv550d5zug8svqjparsal0ji0ka8dia06mzysx',
                flowInterfaceNamespace: 'pdi6hlm4m096a75xml1kyayu1545g2bzaaz0bwn4ka4nb7lrotwr01n6fuxdau46rt4ad0irf8qlo5t5eh7rp5ggs6u7ckysh2hip155st8mi0ryczotpnfo8g283pwdwy4f0n8bwj6rvzk9bqybz0n79hfcu49n',
                parameterGroup: 'uxm1zn0ryz3x3b2sroaoura8exbgn96ek03se6yxfcw2wsnpcw0uygn26hb87f6bj7ni41gfhb3tar69onqwcbz9swnpbyc5abduy3ffhwec3f7glb7ijf5i06px3gyug7561ojlyb2hgf0mbhvkwlqchh3s9fo2jlxkhjm739cugihnre5y85555ccqq1ai1okltz5dgd9jyx0ouo70akypm3qo5sioq6rjkqxde3xzaxygap6vzm53j0nfyfl',
                name: 'rwmsajmv5v34f99p7axyahj9x295qd43hgohqvctqhmk1yc6eclct8uls5zvw62jh4w80zuod6yovjucwbijrhxmkr8g9u864g9pr1kuaa6e4pk2cdkfdmbespeh99wd99ht7dgdcz7at2374o0nnn6u6rfzl1qj8dlo41oabns2s9uk57oyw82edvt8ugx1t3vbsr5y3yeb1of33dvmygnc98xyf40pb8l2fsmgz74dbg6jgruc2uj8ozkvxaupm143lqb1b9d2f3ayt71doqn26b32wb55h559dytdenl5azk9cn2puczmml6z9rhk',
                parameterName: 'hx1hcj6a71css5ygdx9i9gj9rrp7bq62k0qcysnd2jcghmbsmfea64to1no34xcea301tmpaqrzt57tqduxmj3tloztu20uep0o9syl7susxofg0fdb6q9dtpod5m1otsaewd86h8yolrrosajx4b8ls2dvm9sx0anmngbo192rhvpqpg8aqs2f6qupwmxk71t9l2gkv6p9ycisraeqhtv48wmty5a52mp21j3bn53mf659hrxgc9hvwj86y7zb4wief3bbequ6n4i2frsjyyiz6g9w5aw7a04ql1098qejpw7zphg8crlmxernh4mgp',
                parameterValue: 'nmu7snvhpz9a3uvn72mvxjngb0hlbam2tosleb0im4xx4boqgtuxzqrqi18prdvm9hyeg1vhtopk7nlcqu3o2c33quxd4jjkz5n0e13ybqp54k8nntovankwzijjlravr9b0kevt4lhiv1nggki793exw59xs1129fx85gfsdnmqy03hzic1sizou4qez8aexy0va3e9p2m1mfpulnxvxfo2soe6e7f9dyn7xlz4xnczrj05cqs2h9sd5flzmfncae6n8m7s1b9icrwj7ftyolvsk5vdafrl9g7t8fg1etmy2ct6rasb8cfsusfh8eyirxlw6vxamaisdtxdce1u46bise8wac36njitvbx7k8mj8lap637mvmc33s3bxmxyfct8ozfz1ub1g6m5kxpenljxlembtqy7wf7x1r3d38nuaf1yt13l9vwoeb1i4focx0t3czmjiyny9hpny85wxu7xmakqk37hse1p2arv0zqbtgwicfhawr7j6nriingi6u6smomnhzlm4k6rxuufkokodxm1la7i5jtgt8g6xq4q78f5ywg8d1j7oxzpvdycclohj9j7ksyq7afo3rzywpy310bj0pepeg73ljhhc7v0ixck3874wp04zm8d37w24h2lph1h76q5m1wathuwome2aj0zf1hp2kr7bes4kosx0y8nbyl3htwbtbqxvhz382olxsvbbw2l2dpg08aw37qlwgs6u5d4eqs3chalhks9uawvhctveka0218f389fkm5jjuqpxan1ue383aky65dhfgu8ac77x58h6oj1ecyvnd8e8sd32m7sjfwq5jd2aojv6rwps0y97bbp33i7omxja164woxalecjlpueil1qm7gculkmxdsw6thhglcypglyfp3lxgu3lkxcmtzf1jmjn3flrvqhtcbkmi2ueaefzrqoluzwxquyq2zj0u7wmz5tkcn54wu6jlpffx0zannkfpj0768c4fzfdmvbfhfxrszp5p4m2oc1qmsuarx5',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'ie8eu9ef53x1z10nypc6738vkwcg29bs5touw7tn4tckkyqarm',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'os8gipxwyxsnwowuid84',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'byyleaelve6vyl9t7268m1bojj64jbi00to2kzjqrk5xyktv5y2xx7jx7luy6tzjc8rpe72m9wmw4r8r9k8s9d5n09uymkou8ov9q0nt19gajcho2gplvqpyy1fhdikqrjb8ub90rnrjfljua4rodju9qj44cbhs',
                channelComponent: 'rm6lxeqp11iahb47s4j0idabke5k9s54kd4frt2ch0t6ycg5d4wirniafd3902u3yhu3re4g92aix3vt277mcggh9gr223erix3bku7x7bjn1cfzg0qjblo7h88y7wfi5g1bzn819ayh1jot088fbob0hkpvhvfu',
                channelName: 'lnzfdhqkky7eh9y4wnl5t4rrkc4may3jf9t9n6z9gnokwpkplaeg9jrr0hox7dgxiq76ouyi57mtl50gaaorotfcnw79pc9sapk7cbgc3g2muyvnanor7uxg89gz20a92k0tnvvoqjxzyhifgtnhherpwfoepjs4',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'y472whlbpmtyjj7cniqzr45v7xsej1uub3g4cl4tcejnkbyh306x7is44qcij5y6k7j6dpe0r2mbgf6bkj5c4se1x1227seykr46rpf9dsvuou8gz0ytii4aqjtmwz9ba3euekunetu0rlnzxk0znr15s00twvgk',
                flowComponent: '6q7zf5d6t4ac5xtshl0lhx9omwyvezhbfrdgzjvb9lracz4vq5gownqb6zgj0vmd8snwrwtoesi0ypxuefsjcerieyyf6bimmndozc8hcpdpzjf7whhy4hk5imj9b3ewliwirrw5xal9jtu1kl4apskpmeiwjl43',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'ugc7etzcf347ug4gq5eyg0m6a5wg2wyzpc0caz4b5bqutky11fswl5hxig2mgw524cqs1sdjcn4zq1lmcc4hxhyffvxjdqaou9ugo15dpj1vobv8mr8xpjfgn49l6f2cr8hpqbbvw7gcmcs59pq50v6jfmprgvl2',
                parameterGroup: 'na2x3r0ozvk7b9ltqut8zr08p9fqt9dqre89y33bj8pfe6s0d2p6v7ve8vhvlms6qc3753ekc8afmqmkeztuvvfbfnqwb2gzmx6578avfbqj7jnyju36v6kuer32ugl9uwasul5cu0594vf5bn5h9qw4ebrhqgd4jhqt7qsrpt6jo6ghnu5jui3a9z9l4tpfws96hk21b29b3gxyk49p0k8ssg9mv8iuca6bfj4q0uxm2dg4gu208sunigzixg5',
                name: '4c0jrt8qq78ihnpvv6cckvh1zjc0d5owyfvjvkg8k0rqc251wi6xlwyv1ddknhnpzk1my9avs41oy69r1iant4cv713s406b5th02p18h4essf9ytqggcfu4z8uj8zgyz5ocg3w4xajosnt91rylen7f7fqg1lqkds1gvchldnkh18v1frutpffxbqz1wnsh55b672wumkwsabco0gmagf51ajx58ts82ggtduhr7fvwuan848spzl42vxcomates2pzpnrp2l310zay74m18hc9fvwou1u9i73iy6jzjsan9y03ak41195sqpdjyt83',
                parameterName: 'acelwtjjpheoybhkaqffzp06dwrbxxb5du35r4hqzoqzuauixddoagrskpd7ds1ntct4fqjl7ly0szch1m6gebyd3b9uuqeub7epabs92b1owhwx8w4f0x3mdmadz0pbsesiq7awdxokq5sdfgos6x7uxras2hktjgmvs3barkk5qljxs3uf3n7i82rqiblhz3cjsx3an3lek7cs382vzuqqn8s0wvjib0zxzw1iir4d3ab5j93v0qtc77ezalu2o41zvoo7dtv2fr8ud12hc05c17t825zekc0wkqwon5wpuseqs79iaduacz508tmp',
                parameterValue: '7qm54pjl994m2bope9bnnb5lt5w2xnvxr3jrfddtjwt46h5quggcdjswoba2xzmq4a5erm06r8blmj267zuzqykbe99swdivpsviffusolp1d8jom6omvz33pqbdc1plqce900mv2sp1qplearboxgmx3szelv0nrmxdydfyc4m5tp3vfj8i7o7ui6t20xjqlwb7gkm7a5zpfnx7y7hdx5v16loz3omztea3e64wf8q8yfsniq2uw6k2j2wa12m912bdb1wf16g5b8e77d65dzvp5g5enwg1qbnslh8pki5w4uzicieqdqgxol622qwm09k8ej03jadrb3txuubxdsn1curg7bz9uni40ca15k5mqpvd37c2hv2rvfozxwwclulyho13ia0s13p3w099cprxv6tvpz44fypxtlc4th561l0g61cvxkzmpkw91oqymqk7gax0m9h0oukxh1i0khmzx47clo52ncs9qq13iwtjm98n6yjnhowol0lruba8wep132091ne8nbzedob7uhmp492uc6u6xxuyqnpjte1w9ehb3ub9pppkdw8smh83knsik290ydpdw8g1c19py4okkoeowxne4yd0o6veon9v2xm3rc1a9fg0q274uk1x221nb2yxftgbe1itz7s6w06qbv4x83eizzoa45tdyeccqm4as57hzhjb95rzxnjxlla4rfo1cqq1vpxvfbupusltbqlpka67b1be3zfkpshni7yjarrsfsdojd60h74f4rk4qw7ftxtps4l76lv8x99t2mt0f9yp6jcnh2r17l05rlux6g3g0ylxbk0830g8tvd919terc8y619gqknajmd6hq9ofnex64jqmooi0nla4o5ums32xmk9g5h80ebpnjrhafio2vzhry8mp1b331r4ck0e9rbl1oyf9a2q1czc1uiedgsm3fj2zkinh5xddlfu9whu38y7kc3mlh4qmjf7c6p4ghjnlsdxu7594c6t2rewv2sycd7gg21qmg4k',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'dlfjr2djyq42fexz0098lako9j7ms9uz6lq4imwgstdy95k6yw',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'gkc7g2dl4zaghbmjfhrp',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'a08l0futvzagyjv0gwzp21wyc2avhte340ruraa5c8fzhgszw5ikwde0qd1nvhlutp7mhfry5i6sluvbbt93ic7lbic6l2rn3a56wq9hp7gw8d5ogv0k5mmw0oddxi0dsfasjznccsexm3vplktjei240mixi66f',
                channelComponent: 'nocko5wv4h0bdcvt54bhgp0ess97emnhb1nopyjk9zpyuo8mcks8ceh9nvjgsav2ywiijvgglorxbygfn4627o9zuqfam7u892dmsim3gnmo18tv6gl3qw41f710kolst7uf11ngjgrbp52wi55vneg7apgcco2u',
                channelName: 'mt9qhr4baawz7fe1tb49iggeenf410t2o1arzr6mv9al8n9s6swudm1tuhrsenvl0q0fasfuim67li23gjhyew0rhvmo49i9bl4pluzq65crylh4edb770sqm98m45ojsfqagjd34i7tfsr5na1mtu5xtb2f8gri',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '6dq1l7zubmqmq8q81iql6jrda9abt9o2cbhtlyg7vl0v4j5y5sby737mykvodofn2pap0m9lwxpuve7q8evakmm0wttzpkql0x0g0oa8u1fpgu6wvxqngxpesu2ycc0wwrg7ft5tqp1w1q81an5oahzjfva51p00',
                flowComponent: 'cj4byk31xmd7wxb9ttrhhklv2vwye33kht4yehhhjgg8zetu3s94e2ti19gt7ygzlcj8stxdfd7sydn225jawo7v6sfaor5r42fb3ozf5hhszxejdu0gnyyivo4md6um27bhutk6wkuiv0s66dv7570g51fuspyt',
                
                flowInterfaceNamespace: '5hr1dbrxmtz761h0qde7vylj9g07hu4kx5evel9g8dzwgnfj265whoo687355zu8lokbqtwhm31eamsvp7qkg6bk3zj7rssrjjqntyq3gkispa5wb8s712j3nuk20rkrqo267d39unpho1fuppt9xykj7uishnef',
                parameterGroup: 'nmx5bacylmvi70id19tdcqjlab7v0tcyrllq2cg3c87xjaoiyk9zguzlkx2xnbq5kuueq4tegl7mdt7ar8h1z2q940tallhnuyt6w4lfjw7j2vvzbqae0d8ku44yzddhtcbjp7z0dm4gg3fqtb6v26dtzrk76oxky6c2b6lsowg0m86ioyqciws8clfy8pa0grtlut8djmxmusnsafya9gzszuo8qb34s2luqo4ans93mndf30es3ja00b3z675',
                name: '3c9surm62fi17v7fzptto4mr6uqv8rt0jhkwf9wnyez5flctc4tinojs5qzg5tupcwpgkp4e8ecs77ib8zvi3zdf1lypcepy7cyunyawlwqwaaoqkgyysese9nvkmez6jjfq8ru72wt5bo9iapyrno84o114ewnj2q96emt28b3qc2me8t11xxjtgkk3adanxxlge7xdrmty6h47ebylu3sfs8c3qpiwi2j1lhblxpcqi4c7gd4hbrx8maasm95s8tailpw8juzapjhma5uzkkqk1ybpw07wyqjkk3t8i0k9jesyy4acdecao9y9k716',
                parameterName: '7np6zfks5yksyflj4oacpc8pvr1v6s6bh1ledqx6r5b79tl9dbjdyueb66a6338i003uiasyxicdhtak23lnqj7rz83nevzkunrdwx6qu48keqoub9jv2c21rb5q5xbj9om59g3ksk5az3hlf2dqzuqzih6fkw54buzgbl82tpj0zbcw694hm3cf4vnd9xpks25j115wea0esqoail7lw7l9rnz9egh2ag0er1zcu565o4wtuofqt0mmk51hjn0pu4i5rybkacc6bezsf1eedjbvresuwol19mapixisd9gj7jokyyrc4yybx82cc82r',
                parameterValue: 'cxd90y1no66e7kdzvnsiwoa4ya27taj7ls3yv4wq5zekp5yj63gal3qy394nmj76fpk80mor9oxyih1al0qobio24xbauc5cslc1yih3d1y8wabxmb121n76kyjo3trmgwk55ahsxu50d2q0cmsv8emakov4nahlf06txij6xgb085as2mp9niswne4z2nwct08ubtqvcb4ycktkp4g8mqhwsuhcxrpt076wis7n1s1w2n7o7v7jo28h2wikk5jj28cwseuwr8dtbts8y6gmqk76y57a9i2tvqyhpu6fc55is3wp73k3yw99h6wl48jz8n5vr1x2pmxw1g7210exk5y1vqxh6d91juel7yuw1jeqs7mh1x9kee8kglhvcmsr97pe6pu0xetldx3ytsypojrub7ppgovkoegy459ydzhe8vrzhfgfu9ut2gbs6votjo5abmokwnxkkyxybwxuisvf8uj5j6w8fses1de8yevxlltzwwjifzym22u7zz1sik1odjw9mowvckkgksj6u61qs7ah2lzybf74jjtkjrj4ih0ap0t8fuf4x4ma0ktj5h1eusxxpsv7gyl8tiuin1xu5fo1ylzhj1intiqnc8i5wfy3kupw1eh1wf6z8yllta2rx0y1o1ol4mdyi3q2btgq4m1bl5e6rh6vlcrvkx3afu7a62j7avs91oem93t3tlktry8lnpnrwk3dkcdj3bfdpsn3310wrdg2cw1f4jhbi3nsf3jght4kwbjpscnsaz9myna6nozwz1eqk6sizrmcii5uo1cssyev3vf6mhnkzgq6xngd34gt0bggf2ukf8ooeihr8gqn4friyv0dxz2bzw7gu4244mc1i0cdkwcm11r6oht8r7b687n4d65twhiyv0p3qemt1pvndsx6pftmh0qj996ra0syo0mhjwt88o1k05qq9uepaffk4htkpg1gts2e23e5wsjqcfz8er0r94au7o5vjyg7rlfvd9gjutk2ufppbhlku8ebttt3',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'ln1ca69oir81d1xz3sncrv5qlvk6oyvkcvifjkc1dcuhx53ogp',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '0g18my5qi58cpln8cw5z',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '0xjp7uogyn4vo3td6ruoby4e2orfmc7d44j3x1cb7ivta8487724tdqjm8t0xt2o5hy6qumt1sl99v9vumpkarn0px3z4rrvuf7cugb2mwizf78zbfl4r9b9fi8mguy7nzyseihvchky4u5j6rw1th15litur6at',
                channelComponent: 'w3661nqy5c49mgehqf9hba8xdj7kvhncj88tqouf4is08s6ho7ks33ubk9l3pu8upxg5cxzj0uaezmvblot7nrf5k0crbef9n40fti4hxb1c51acgxgdf6asnufei0btuczdm0bn6t2m68hqikt4roswcx7k296n',
                channelName: '220cwrefc4m67et1izlj2bheykdsecez3cb9aefyi30m310a0wjbalaw9uh8n1bbxpxocovmbrismjc6lnwhzq4n6uflih1m0kf8qeo4968bu212f2wflf5bu3zf1fe7mok14petbqib3z1e1bb7250zyr7s7or0',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'bp68pghbj5m5z1mkuteiushuy5khswcnq7sbtnwnvm5eigwm42l3c12r8u5ufg7rvbz9yilkmfg06myzsgx6dqye5dzh8xdiu0jzych7m1vmktaxggwcjm6ayt1j3rwjm79e43dfb937yfnjonqn2w0qepoypgld',
                flowComponent: 't67ipduqdk439f1ztux3rg1143jl8w4no3t3k208gzqeviug7vxf3mmgx7esfjb3fl5dhfeifo0qtwxnb4w3r41l3f194rhyti7gopvebvqdnhc60efa8fwyxs8hydft6qcxpm7n3hi67syr1s75k7kis2jo2qrd',
                flowInterfaceName: '53xoiz5p1almbtqhbeaefv7bz8rgl0qfp3kitmx0f02ctr5tvcpqq0al68ynrvw74r2x2jwmxzmvnelhrn9nm08fsj1e8g9o84r8q7vob99i9s8ccys9xi6ixrlwtg3qg54jsj2mpq42z50j725iz7jnghw5hn28',
                flowInterfaceNamespace: null,
                parameterGroup: '45w6orf2dm4lnd0r7jtj6dtft621zu5883wqa4kl35p2e7a77rzuw9h6rtx8ohqeza0wkic0u1koy93jvih94p8ok5pv378ou5sjzxcjk43f5adekrq1o4o03zdz8oykbgpdttfw6o3fotruokft7slw47fdubihi048arjups6ga86ndvh313ttok8g725sbizr0ornc96x40s90y1rtds6z0966ubqvkyvl5oqo79l5p5dp2qef7f9ilcp2xi',
                name: 'le20d8sle4v72qb6zvfcuhscd6uivacld7pv7wkyedlde92t8vl6118om0l9boajorcz14c5hoo0qfx2b2est7lcg4gqgk2efwtmt6k0qp3djrm0arhxsffzgu4aes3fg4skacyxesmbr4jjy1edjr5oa3iz0a1geu83vemy1lx1y8toijqlzyv952kpvekj8y66zs0bx1h69mmod9sp9fbmeifas7ysbwvi9sqkslwq8ccf85v7bjnqfh65asqvw6uvsomipcuwq6u0ht3615ui0qb6tzdmzlrcd0dgyhswzvhwn7ohr93pvnnjpwae',
                parameterName: 'fxcz9gpz14oz5wjxtbmgmhicgs5v24cigq7pv7lc2cqvw97ux6vvcyjoy7zficfwrb21y5uvw2qdfvbav4le6wi8f2rlyltf2h95bjkabxsj64x0e1yphkug31pk4ovyfuhvzbkk1smhfkrdxb6ty3gl3bsfguytj4n5zt4f82e7y9i9l0v3i7dq3mzjdt91zt2a6j7e51cr0bqz0uiioqo0s9cbhorrfqecmhq52vpz2ac1oava0rva3v8zcioyg40mtkkpahurawbg1tn38npoc8hspsslposnmuzmd8ob7r3gcx7dtft2bfwlqe17',
                parameterValue: 'hgdicqrdtq0shw5l9eykoh24waxwjysrio61duyktddtlkkxsoxjzo4utwltpmlwi0rvefgdw3lkegzj0i4w0ew46zo8lg852372v8pqk7x4oy5qnayato487ofkee2pez92ylxy0u05cmconno8v922f16hgtnosidnx095flwwpm7l5i55g8tsw2a0q8lhr1bllztfgxtakqy5rji1092pyv7ugbl9cwfsdaz81y1km0fo9bi8b33xv65bv6pn0mlei9p5l5741pjvbtbmqmipnexrp1owpdf3nltt64vwuoxuxm7arg6zljyupuj1cqzj4wtm2mtdj9f75kxfb360ql1811hxjy5ewpmzbkg7aurlvexfz916ok8dzb65k4taebyteg4bjh73j7ojczrq4pz7escowarwpyzdmi8j53akuytrjf03wy8yemlw96o2dtkdgvp2r84z3wt85as9uxl0k1wlfl7p55yv5o1vw7hip9j84cet1k1dur8tkgdm7rme2iwkgwryjwu57o6naa01eixiquc5mv2ks5rt5us9e6s6kv41ygn4r1w6cut2gs0rjh5uevdw14h8tv6de0p4n9rjeghewzl37ben8faihqp49x9efm21nanhgy40m5nx0bwhw96olx2xh8bzb96bza561rhguyrlm9v9ho7686p35yewbixs5euxpcf9vz762ie35hkxz5gkbaltj7n73e3ke3p7v0inpxzctyzvedy4m24eamzr1s9a4gg9imoxzrihhh8jugxzrfwhds5tp2or2ndccf78fhntx599w8dje8eqg3crg396t8vj21vm4s48l40cga6qoaat4y5q31y8a03rj3yvdd7covt7vzx6lslcs5skzk7yne7ueaye7rvufsyoyuik0o9lyhyx8978g4hpburs2tqvw0l3rc9pcurqs7jg88o8r57fmldir7fx82cb325ctitxpsw8ccf4oslrqp63c5wtj1k15qfwl6pm7woojyu3',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'jc0tejzd1tnj6gwbisfnqkgzq0vnseeqowzjzs1ry6j6768iqd',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'di95ys6robcjej32t5ut',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'fkz0man0nsw86eryo13ph2oy5szanyyt6gev69nlcbo7z1j8ft0pf6v3ykcx6wi9849c8j78ts3jw2vp763tm8hukccux8ed4loz56ymncnp1140bguk573awxo4rsm6a7ptr2fjqqjs3dctt5p8sgcxapk1lgbw',
                channelComponent: 'zlhbbxjgtrzy80ww6qucxnshrk8fpz2dg1ouwr9ounh4puop1tdvc24gxyihopplcgsus55gwdc4kk3szvhorlvpnsifv8jggiq7ibe902hkh939jxilqti4r34wwh29mfn7za902eia8j3arhffgji2xhuv7k20',
                channelName: 'bfl37gz9t8p1dzgifvi3a8q9zvn319g60zzw9gdbvszj70m7gk3wgwdfhlzcb9qmywq5ycporaz3o3f86vxwkm31udvh8i27g0zlr73dlwiat1nuz268krviddb4iavmu3nuxrdfmmxon35ze5wfw0ys9d1qzjsh',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '882v585si9qyqia9lq22dyp16f20873cij8pfaior0dogjg29499y4i5j7xqitjayzjk9fpm49lca8qed1bkg1bw6ygaptngn86xirjekhairnzfifv036aydiyhtz9ibwybf76d96vhkm875hvugzj5uddz596s',
                flowComponent: 'px0itg9c9zmjan0o0ge04glz2s1wd40qalo9bp83zekct556939gfuvh75a73qb8t4gbx17d5haonfggimmm1wah3t9cg2pqdhfoh7fca66gizwhwesqs7rgxmsktnreb2fiih17kiqmvf6bnx5rb16s4wv63gny',
                flowInterfaceName: 'iwvspqn09v5cembc26glo211kjc6qq2noaxh08byl9cyj5kat1zmh1v33nvpbuglgwwe8kzv5qkhffr3j8q3gezuvuttduu7lswkz68kt18gk1epn1hqjo3a2vfu6b3ri29ocf0seamym5el7q1vsdzo4ji3ud62',
                
                parameterGroup: 'j62ppm7mtdil6afkfkf06a5d8rfs5geiecf3o2u6gjlyk6yuszy1pg1c1onpxfhr4qklt3m7mvmirbwr00kdih4gw5zq6f6na65osa7qxzud8rio915esmdflp68vr0ncmjw5fb4t1335bnw2v7zo82jyvauf9fju5c3ihfup3mkwiw1nwm5zahw445ogym5sr81s3y6r3bwip3z48e1q1z76yvlkarfvjb6dmjlzvsr2brpkha4na6mutcz6uv',
                name: '0uhoj0qizivw50e7ly61uc0obq867kh4pxe0ypr5exao66egg7xe5pnrihskl6ojqrko3jvyetztty2xablcjrysd36oq8eo0oo85feqz0qrw6psldvxhttcgca6moub0hkb1poea1lwx4pciobyp7u8gkwt7p35bp5sj5ae7ko35ksx6p9eq06c2du9jovhh3ld17fx01e11y4kzb9lq8mbqce3xgue14s96wa3rd6t4qfmydly517dp0749sa1yk1qotrrl245axs3ukq508629osses3xuknwuztmjq00ycv8jvxvtoblu1kmzlop',
                parameterName: 'upahcz4rl4nouaya11dmpg30eq9sbq841bdk6yvsytmlt7ga35dvsv05gsl9wgcgrjq3xmcf3e2x82u18oujg7icz953c3yy23njve59pol072htjcw37mxhc69wnjy61ba2xb0bfr9urkkpmczbm8isau691r996b2t9u7672rxn02rjh2allhte8ku7bycd7njy6tmw3ec686f3ndzo90istfd9ps7w3kavyk7znr3w9yp16enrutyt48xnxyp1rzdpzpbqqfvzzg0b12uy5874p6bk7qj8tr9b04iws2zqeofybbvw80dpux3k42l',
                parameterValue: 'rs2jgmf2wkx9bl0vbqwcuy6536k5xmnvci9drkuz1jo8f3fqc9lrseww48q55ydfdnr07vtlh0g5eqnuu3dvh33qrrmxjeduoxj0qo13xxraonsoc1ter3v44y249fdqpnjadepu2bwbuhtbgg1bwd06tr6ay9702gcrttwjgxrv5gor8x15th8ankbp4rmgz9te0tev39zo2kskaqg3b91o2uuzoom5vqpvowso7amdljwytwp2dxvhfved4xhar6bbw9ig8hp7qlzsgvjwqn42dultjdx2ogv5j60i2t8oe3r3d0erykp6mzpgi7id8b4ldeq04k2kgoodx6t29o7h9mpts2u236927sxfptp06pymlekqb087us6onynoqabx551321d91cct2w407ksmhn2el3agdhspbyd9bk64zc8wytdupho8styrg671wj9iz23xzvzxtlnu3ryfueze8wfwxgkd5r3sgo405aqoto4ypw8zfj0iwo0btvz5affsuwyhunkiy7g83tbnx5me3p7ypjxs81xra1wrklcu1jp86rmadgqz0yaabhhuanhe7x9497mxr5khli17t35eckr0vccwct0aedsrebxn2vm1mdji6mnd6rp41qmykdi9br3ks61388pn2gamcn51ktcnbff5k2hkjwh1i202s7d5wkdv9ny84ifxfpnie7f458dduas8kz610afssz5a8z7o4zf00eyfjgirha6szzc7fifz8cvbavfa85pkc03knvmu7k2x5oc8m4nwjm9z1iuwvzl5bjo05saqkgqtht2zvb0ruty6d0h0p3jsdd1jg6yfy5z8w18q4q2pm4fm2fg4o82jhuppg19ol8w1a41bjrqi2ww2tf2xehpldfggp1tajxk52ft5u0rvtntjtcytgf741g7jyye49x69uoqytmlnwbh34lxfr7d895gbbiijyiwk6azlsjgh95v8iebu1bvtu45iny0173ozgqmthxwsqgpgs1q3wh9o',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '25ihhx9pzxjrbipephk6wgjys00m1dzt944e1',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'nxbqxygo1cfmdu5hazscmxdekp5nem3keomz1qucmrpnt7q29k',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'qligt39rghed76bj32d2',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'ogbo78hperxdgnru5hbzmh9x834909ncpmtt5kky995d8uwgh4vb0y75u1jg9oobd5i7ra9891xc1l6287hq56d1me5fj71ysdc2p7zcwoygfgpo9vs4rzdbmcmitn1bu98vhnsvldr1xgti8gvufyofgfodttlp',
                channelComponent: 'u460t8c797eio16n6wi2wddhvd4xn7nrwikahsegki8fkdgj7yc9tw7y2ezhjetibqnvbazauidmeo6p8rikzqgd1i66m3b3mcv10i0mx6rjm7rk813k5vluz163a3mr3v4bn9dbxfmu38079yn7syloamc3opec',
                channelName: 'j5e67d7cimr28astgd65zbfebv561gmkf2hy6hcys3wszjd5hcq6z1nzojv3efypx96s704cvp5yw70c17as2s6fa0ccekttncy3ouiutvgqp2odhf8yq95y55c0ktarqkrdexntdjoxoasr1buypmce7rcwib1n',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'tyg0g04grd2djl0cl56l7ehou2p0e5m5bssrszvmsdn1dxcskmm4wluzjm0zer0tm4a1hgo95t1p8dq6vouzfq87l3gijroikwuofb21mhwxauucru7ddxoao3w9lnx9h4m96calkmg3cy2pwchtaog8g6vcwffx',
                flowComponent: 'nj1wrgbvjaq23ly5ilrd0qq8vaurruy4tpm7bzibqz7nficwojjx1rn8g9xz8j8k3zpn3gil4l7b0ed5n7pmcrx8j3tsqj2kkpbwibn7se6xhoilfn3kt25k0yeypi3xl5g5h58dg2xe12yhq3itcoh1b3z2zfya',
                flowInterfaceName: 'i53041vdksfo0ixwlirwp8vqrc8hon3ly48ogkhpk4c8f8roxryzd39255md53rrstct3flqvv8z1n90a0t7ikdb914m617t5acuk7kf08udmhvpnpprdc8r5difqw576d76qhhm2mvj4qa9e3svfc0i2g14lgjq',
                flowInterfaceNamespace: 'lc4dzwnurl3j6i9o6c4rj8kec4hgjml0gwl639iw3s7ts2hadahtx7vvokricazb3j3h3nf0nzng13br33sgk2ibt7cpdkb6kvfimn6vgca0dowx24a9iiljt4rtzelofhdj5d4mzbnnu3qrm4bjai16hrmfn6ma',
                parameterGroup: 'keiemi5e8bnmbu8nahc74n6wnnebsqcy9fh8crjhtmfxfmjh34h3u9tub8hglri5yx1uhjujc9f234xk1e3r8ffe9e1jy9lc7wol7au2wi1hpe0sphrgn2ongmpmh8z5bvuc2i68iu6n2ua945en252qvqps0m22ef9vz2jc089l3cdreeg3mfsrazob7444rznqqhv9l5ay9q64gfwyu2m3spxvqiq7m7t7patvxmhvwuvtwjext28rxzkm9lv',
                name: '8jiezh9zkwulfhua0ttn0xd9dl6pkpx9gz17pev1blt30mp1and02moubw9b3dntf82qkgxswwa064qz90jxpjl1af5gic04h7ri1ea6j1qrw4oodlnr0qk1sdoliw7rjubj3bx8j1gcveufbl5d9mnd1fghrydoe9l3cl4tlq3yh4apg5o1fxb0sog7rsf0u0cw6az0o0s93ammtxcztuvg8043yzvwvn16iipmufhm5phrspk0mo4d5sdh0b6lo7wb4tggzy5yjm4jndsiwgqt4xurul4mitzf6nybwxeupd48a5lbuvfbqmcm4jik',
                parameterName: 'ci8lnuc561251sbj54rthetjaua4a3dvlo32l80dwu3oj1swo39bp56i2tg43vhs6akcmfp7pwj3fj0r9ch7u7p2zxmnsmtf8ueqhgw4v63or9kbdvrfjl0idg01dkznx2ky96f6pymuv6xk9hofu4c3icqxwy8353416mrykx6prbzzbga668wh02l9gqqedlfo8oia6xieh42y6stghkdnfuw5xo4vtme8b3tmcqd2x593ah6flog0gs9hviuk4nz87lpdc19g4yuhxwjrxgokv3ilg361kcm0vyhtcj6w5ck05vtrtpz2d4eeztl3',
                parameterValue: '2s4iyyst4cqp138yimyla60bq1s3cc3t1yhpu46xierg4syzwnbitf1w82st29st4stlhw3tqwj4xq052ywjjivbnd28dkbb3v81lhxakjhf20p4xbhde4mv11jeikasuoepiuwdgj76vlq2wv03wgfvzjimkrrnk9eca9tj1jrgoc7cu2synympv43e8gtc78386zq3u79u5utm1th9hzj2gjt64d2y0umyh5vmv4v3xaxzl4h1349hwk7mcp5d52g078n2d4zql1wpapargv0agzfzr2cpjmiu5oi409c8pfm1j7dp5al03am3fiqbwbxlze0rufl3dcavj3vqfd0vyfpjkd3wt0thbeux0pfoip0vzf7nptzr110pubpncc4lymwlx8bv1hn0xf6qg86x3dtswqesaadycrx3s0bv6ty3q7o753ywbonvzulx7oir94gvuamjemthnx74k33ks4j57pzh5qjdgc0mpx2gnbvi9y8czjas64ar323xcupv9uebdafd688k47brh9ndt0bx6iixkftwpppwol3r1yom2k7e1huey5ad6jyf5gd5fuk7ef2f8hdctc1robh8vfugj7row31atsprkop5r9nf3tauosh04qaz77n8q7e1zsw6xwc078f77dixe6icfo6z1a84dbv5w2a1wua7i0ropky7egvmk916xj7jac6xw40q1vk4jw02lw0nqt5rpdvqh4pwxqbn339d5w07ou0pz23vwg3q2ow81b43a6irerz6vnxbt181n0vferq2tfwwyxwaburb527d4487few58k7jq3qpv1hrpz74qpdc75ty90c1vu45i1mao2rs68n8z1g6wrgdhow3tr1nxgtdhb0e4msnss7zwgu7ifww9kqh2m6b4198n3xktiaelak5kku8ye6et95aknrqr51wytvefwha2fqdizxjtmxnvg6pk6t2vdgsp8hyak42ld10pbgri2mavwm3yi4tley90ecuxw6m7j4aqauk',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '11d5y9cv2fmol2g03d49681y8fk0qyijde4tb',
                tenantCode: 'u2dpf07a1czx1egv7er6nmvwqa6d0we6q9601d90xypl0fldva',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'abpjf7v9als9f44ty46b',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'q5jlmzqnvdnc4xaxjq00oil03biheixl5ny0g3kndytjv3ubzq4mgsvbmdstgbmdpqzld8rv01wf7a4ae6xsplnggtylnn2rqgbs1pzrgi5wh5lf1uxvzikfnrw4e3txmqnvs3uupwq68buvnmgl2isvglhg6ome',
                channelComponent: '2ci0sjsqcr9zptf3wqzx7xxu7frkj625dqhgy443zytkdawqaltlc2vfj2t61hjyasxeb66za135sifh7drs19n7gre5ei82lfa0wsuzkmy675lpwsyrrwck3sy2mpzg9h2xg8cd6w89n3rs7vt8e95147wt5cso',
                channelName: 'y9w7iulcctzith81d3tdy0mymgxwdoowynxdf7gkwvn6co6j1xr7n74cx8qb2t43zwhi5zg6nwmcv1bgpfz85qxitvthn4r5u7l6znrgo3ouyx77mh3l7jnidb6t4esug3xnqxzgyw5zxhogfn6awqi90q1sdc6h',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'j8brfdqabwm0alocskbxlt21dhiyq2hv0ewnn4tyow19qtphyebp9h5nbxbqeqf0s95tr1743ickkuwkpby6elyju12zvwrd2fm88nrvdy7qe48iybpsycdiq347rsp7tefjiq3yzfuygyyn0ltbqsei086l2jiv',
                flowComponent: 's8rxzxg55vq401nfqmwjto1zlyxey3r8padr32tjif3ljjlm0j031vh9uzscpjzkzg0hyiebj9d76ocgtnocyfcapezf9tdmymyd1y0jg2wv1uwszgef6n9caurgg89x2uqrn6b1ycwdfa1vxn4o4sj51wx9za9t',
                flowInterfaceName: 'ppnyowhcjjmbzm71iu3cg93d2m5is4slcxub3nr7vhlvgfdpwhqoty65pg74s1iwvq4q2gfthvjg5sdblyac3spnpqassj9vyrlnm65plzkw4aq1pcvmb8dry6my5xdajlt8ky97qhn1szwk2w44y93f7gufkycj',
                flowInterfaceNamespace: 'ihgx9wuz3fho2l2jhdn4gnf94ru2uvbbi5qx1sqamv40v3x4hw6xyj5vumu2gcibc0p7lljsfvitabv2s8seo1648jfe00owmxojaumbe5xawu6rzrd1at4siynymgly600j0somscsreuelbpiwtf2nnsfv8dna',
                parameterGroup: 'z1syn15lxw2utnm4tan9h7akzvfzsk7th632402tt0l8fdhs6fl3qr7y2hw3xdg5z3v3f2v5so6piccijz9mkm2zr9a0dln9ib6mahuw17t2t6te94tp90ljp4jmg7ujw8eco75urc91zbysa5m2jjrskelr9l60rrrxjnxukfdzho7hm3mpv4bibj0vuv2pmiriklix6isph8x5gsloffbb4a8c6zah7gob2dn0fss2zuktousv2qyt0mqqelg',
                name: 'asnayq1xetbd8zvd62u8z98a3myehmp13gjejv37wnvedzj3e60lczfe5r8ll7e8u6xzfkai9mk5qqnesq2m26mr83d417a7eg627ebfsrjccnd7jvif0nwxasmi3eryad819p8r9v279jwy1g0uzhs4qj0b3tdpqwff3qx90wvoweauyof8fheisvxhkkak6hgdbfdnwuqqg1g3ypg56ncgqyzdoz9kppweknrncdm9gkucpvww8bnc3rche6dmm43ia4xp2mnrs63q8lq6fiy5ya5my45ijspb9l3kbtkw3qc5uhykn8tj58486dx1',
                parameterName: '6sgdlxt3jc1627st8g3r19pjit4jtir4qmq4yav5uqrxguyjiempzq1fd8b1sxsqkcrr9bb6qsplvznabgru40lhuiro5cb4dqn3ht8ea4flfwqdv3dnrvd8nczcpd5304pjfmumhic4khf2wxaezraj008k70s6k5pxhy09djhv2oa3jpsvxdl74plzelbwybnqcj6h4jpy3pjnpmu70sg85bc25v538nehlreev2ic2sfmp6ur1tba8y1vm1hfazwlextv2yjyjk1fhvawchjywgfv1w1ocp0mtey2co1p99p92gol7yxcwhxj4kml',
                parameterValue: 'ucbgbcux6tfjtanr07p1y6imlya709edi07i47s9hls5knocveq2cxjh0697rqw34osk7tmylzqyblkkupcbua13rs7d8jeziz09g5pvwfumgqw2ais3wo8c039q8ijzw9dvg1u7gq30snm2pi9ox6yfo3gg12ed55knttd2y3e9g5rjstsjapurnaly6p5vxu2ij8gpj54sobv88po1m8d8gbte56vvecgi06q7wwe1pvyubgf3xt1h21vikowuxvgpwvltbf4zurg5ur9prrs7sok2u572jwvile6fb1r4piasvgpg12u7q9syj3605wft8om2fyfepxvaouagbro7sxabfitvattwmbih0rx2ghz2ch9kpy79ondyt1uznqvjl3gimrzdt9xd8rn487qo8ep1s53nsee1uqauuilkj2p7yligxb5kanfkea67kv6yb94xqm9ucu85sfr27mf4lr8cvysktqtwjebc4h9elutsd6op3lw04cfk9lz30yhoat8mebfjj12uyehapg9upj5wql2y5drgbo2gm7eipu667p9r1cs9dehwykx4zr1phzpt1t4ikdjza30znypvdg2uk9fb44d9ty0cfzxlkjoh1idmfas9l3du7sz9cqgntsclo3e99bgi7e34sfwe55ni96xjrws6yy4qiw7m9s41hqir96i8vk6sbj9lc4sud4u7yn0mpowmliqvqm12bdqzyvfnstnvmxf5epdi9r1z6p3lat6y9mz2bsqlpg9lheanya9o6fii52zsoeiu734qeddx0scm57c9j5lz9cojnskk06c9xy58quszx50ih8m4gn8r1teiguavjmof9bt15wmq20dqnigu0t64o5gc4oz8vath310es7k1i3kr5m4km91e2cdshzyobsir86hmgwtu2famxrg5xsnqvo6zfb2iz48k7guhmqfkwnfg316ryhvpzkdyuk8pd255yflwhp6r4c205jwp06s9ovnsw2jvtxxy5zkriz07',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'n8otw1j5frwwqsvrql3hoq0j8mj9ljz4momol0jhqmx7fyn1n4',
                systemId: 'mrea6ycdhj66ap1nysmlzel8h6wtwytjqch1e',
                systemName: 'rpg6sr8omubu07am0vk6',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'jeb07g698o7xt3qlxprxx1q2fb1d8esqnvbroxr7b7f8953ny3p31ibrrw3mbx5di1toa8i5tnsq154jl7rxtsgyoo0ejkakcd5gfbyglcp7ju3e8c3hzdo8uf2yjdtyx1fgmroc31xqold63vc8ngi92w34tidl',
                channelComponent: 'yjj0qrmmm5dtv1p8woym809s103732qz3vbmgutkkhvirf8b6l4l5x48omzdhb28vcu6u2mtkdgfsv953tfyl6kheuwxdlxzrmfh50kgyjt28ffg6qcsn3v2h08zzwtr9dc0pz35qnpw07jfoa9t2pa003p7xv3p',
                channelName: 'faeqj3d38keo7jquuip7ppvdhcuylqfd3n6ny9cl0boq2l7fb6seax4j2ug5o1xj4prlrra2ct0zqs6hxipvbcfwv136qjclrrgq2eom9kuplnkkwwz097y99sxgxzbnpl3b4gofbowcfx12zv9ep9pktu45wcq1',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '69vxzzqebbc6bp3xoit5emkojuvycxj5lbxpoeckpeluv6vjrwlql87j0arb8pw8s7dlz8ncsqhwba9c1i3oxb1e2y7pt2yonbzwq96idargtop2hoqcpkejdvwda2yug8wp7bzy5xdpo11wdpxqyd3eg7lcpoko',
                flowComponent: 'ku250u7a19lcje42x5br98rypz227cmiwox8age5o0c7gx9w1lutr671uxbyrcokt6edjktb6umrdiygkbrfvtnbdv2x9twat9h8c0iqov0rej11pyplut5hj3ksvnsx52wzemtcaso2blsh0z0xtow123rks17e',
                flowInterfaceName: '7z706lc9521a4sxdhfb9c29988rxj3a99pjora50jdbfm0isfzd9x2tibgcwtclz2uxm676tt6qyt9w4gmy11qf4vznpxofib76hw2hw3kqurrn685s6m3mjstexo6i8pmswmz4bjtgsnnmjkvx5k4jcrkyxd5go',
                flowInterfaceNamespace: '6x405s53255sgvvyia8iocqphkk6kj1m56rdlssgsf3um9pejcmvftifhp0s7juddcexeg4n28uuf7htm4705jzgp0rpz1rxlgp712mk270pzdkxzxv3rkgwq3dwv76b8n55v2i6tf8kud2aepfs4mi4xcoye9vn',
                parameterGroup: '8oz97oqrcslm5j9j7tsish6g9i625eps6awqby32yzajiab2x1hypa2nvf0gifoimcg99ec2tdtnyayvwzyxlkvlwy50fafelwmg5vgitizwp6pphrmsjc7tn10kmj5426s2oo0wbajoik5p45srur4i8m7o2ocwgcmkbc9g6dloxehx6djzog0tzimj1irz5tdo0x8gev6g2f33rskxusfa49v1gheb5z1ypx30ysfan163gjfc5ls78somyf4',
                name: '7yu1c9ulc4vrgc5cgi2oyn7gi5zx3hyl19hydqqigty7hzoinnyclrt4mmypynporybgji20ai6r13c2d4lb4pkehk8vkc58jq22iyvlvql3wmztvf1a96jlv4extouug81u8bhs69txorarat15w484ria45djzukc2d6p918nwtlgf07516iv20zxmvlia4304qnvc9exwg5d5mjkoz48odkuyphplg56vpei60n9eg6uejzqhrbphgcyjpco9ewxekmj8mewicdohd881k39fltix3cvjmw1duzhnkgp9fya52gncqhbmfj40eyra',
                parameterName: 'nsvr0ifm2jqkr1zz1wgue5yd19alwggbfairnhfzu575dzt1m0hvjlyyyyy4auvsq2arplrlfodl6enfyyb6x7qgacf10hmayazcm54puxs77isp37onhlb3o1jex2cd3h4yeiuesadnlrigvs66eayz2qj9qs330p5cyebysn7kbi1umhbkumyr33ebl5hxgiwaupe7xildtk1jp319udkjag6jmae6au46spd80kb9xets50xygwu7bvguhzz63us726bf3plg900ywhu0u74hl5qy7xzfdss1sgqnmp5xq3s9k61s0gfmo84broku',
                parameterValue: 'bs42ganvae5n88ib8wpnufnic69xx2lnr6qjxyldj8elsa8mxk91lrp33kn92m65ruhxzfudtciljw2f601yapfgcx6kb65w02ucf10dxdpu4csx3tln6trv70tvnpi7vmst1avhekpljfx9ikgeypcx7814osrjwvpn3ei8dj41s94druj4n32nr0h1f7m8pkoz684m19ikq8webty7pgqsk72zoob8eqy71jqtxjv8h1ye5fcvu4qjr1ne5hktlalcehtnx5vxekh706jt24mgaxl1vtapor0fyo5gwp8qzvb1m3glk4f9e88zpfcrkrdxlohpyoere6boxo5wl6zcq18pevcd7egslc6hl8eiv6hbwz93uhaxd3t3sen9l1a175qol1qin55gwvthph8rlpo1yj0wp0143s5c6stu7lr6eqxfmg0jmd7jtjbyszc4vq13ksl165i0tutofm44qivx0mqfz6ev9sxz9vddz7fjclqkl04nk9cz0nkycwznbfsmlmg5yyu218r4zer4myhl2v58wb7yhz7b3bfx4m9dpz84a34i15h6r6v1zn75xsnz0v58wi02rbvvrpa3frui1222bn2tjl1aiz8c858z0yihggxlfuc92likbjvfsb2cayqc9l8ht3kf3d8id7r0lj13ck6s3e88rstj60j4105uqaih5l9bq1kfsbmmiizq2hlvnwzfl9rwv4idwfz6q2387nwuotujgj1xtwneys2coggr25s7ci1alzeouscbs82zafuvyxp921j5jqd2ugb8w5opjq41smthfpk7lm0gbkg1l5m6j1296378im18kb3m6c56rr5z5g8eo3or67awg0nap53gmlkc33o5ehe2kwdljo2mm326ui9440ys5633vzgryxfievrzert1qg4wrjy0liifyyywn549mrzhwd5cy708g89fx1n8948dhkst55e56lpdfs9miyz8sf5n4mya7cn1wp4xchmf2hch0676a4jkb71c',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: '6bblh0b8zcd8l12lvm8h8v9plgs9ksqtyph4dkw2kjdb5dc7mt',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'dch9pn7vklfky8xvu3k1',
                channelId: 'zjvimsb2tzbj58sqiz9sw2xpt9p66qvxjoiqj',
                channelParty: 'm6qrxrcp6jc3eawvgdphpth1ry7wpn3qin664vq1y7bh0bs9ig921y27ccgbxlnbnv61q5pq4rc0hh1nm39ele35s62evpgo7n2g3z0ndj1jpznxr3a1ylv24mslem4evvlyzim4tzikqpcme2p3xy0hsz20wohc',
                channelComponent: '7x64vt6vxv4behytqbkow9zzvada7u85dmu7ivjnlyq8j63g2bo4gz7pkhynqpmsok620itp3yyzxzu6z6ssz192l0txyvyw4dbgq070n6ulc2zsam4guxjpcmjclxl4dogaf7ykkb90en4b6hqdqu353sp1um4q',
                channelName: 'n7rh9tlsa3oqmtbsyrkn7pnmmq349j5vle2ufh0muwr1ggdx2slw2ah2gidhmurdofd5i9drzsfk3nsghx4kw831zzks61wjz6jz95d9kcn069kug3yexdsa7p7xbi4lnj921mba0wu184kg3gggpmy8n7ww1b5l',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '6r3yzd6g8ye6l5gypyhdlazyymxhi3aj78zlhs9ddf8fq0vofwq9n7jmvd1y6x0o9cgre2zk6t7tu650efkluj64bdhz6h0hg0qzjzbawh0wq3miwf2j9os9ojaxvru1fu8dqwh4c8pjpwj87vxlav7v8psxzrum',
                flowComponent: '9smw0o0q3bbprztxehv3e8z60pdci82ukxsjdd5o3voxt06uy1i781c1r5jg0uc1ivj29dnw27u5xbibr7fyjkeagc5mzt58dviyky2jw3pabiljkok050gq61i8yg5nezru6mdfwnkoapb8lqc7ps3vcschylol',
                flowInterfaceName: 'ig3thfcre5pfh86vn9tstqwwhbxknc4m8mz3yjzwsixamg4bquor3ujqrrixum9akpyz6j578zk33ggew8gjar0p4bimj3pqr21q8u1poicjrmex4zlvvqfrinyfiu62fdsiyi1cx2wsx9zz90mkf0bufdfte5zq',
                flowInterfaceNamespace: '45l25u2el3zqfxnepz04ea6uq145rpqu64mys5o9lk3ef2xyf3lsg1tqcxzkqtuwvebbqdr4ip6mqomibcqntbkfqk23qufcs28zs9kg97c79hbo27zdc55iplok4r8leat2xljof2f4bfqkejlzhl0guzqanvwo',
                parameterGroup: 'dcnj3ihepot3n5s1m6wjl0ot0cxdx6l1tw4q2021et5rtnlrsrlp7tsf3d60s2jpfg7wenekq8i49vv2wb9x9ggj1yqo6sphvw8p2jsjlkivtmx6qor5tywvqwgbm839xavsfg2o61nmmbvb34aknkgfnnk4skkog3kefu0skvwdzanmmuugk75zma9cq3u3yypup9i0snpeo6yds3c755zul9kjwokxa1ysy60yo3rcnvmcom767izd43jsiv8',
                name: 'knlx9f8omh5ovy8hsbazfmvrx1zghto9jd4tp5ye2cli6n3gmpwb8f1vy8iibcpanxxutnhk9ui1csilyxxo1xjhx81c59zktrgb8ne9g36b1xw2nnvcvxinfzu9vc68mkyd9r3kvb1jodihyfovfawtr3tu2a2hhk11a7vqjb441tw2eb36ylt6lj55vkb663700w8padc6q85vy88vv9hi7w3p09lg5gt9fj2ld0w64hlfjd8cb26exc0qeqq5bho99asowx0dkgly3dlfrbw96klw7g8zr75nu2tpxwj39pki7dizghzfmx19fejb',
                parameterName: '6j8jgur1vq2gyu6iaxkklv9r8zsatj7ge17jlalb5fsb5oitxpdwkeakwn6sidgggqp5x5c8eu2wr2tghz0bf9zrddgitbi102p4hhibq3j80j77jb6alniix6ln9667gmrw87n7c51sbrghkh9sju8oxspdtoe5wqg0xrqlsptlia6endc03evguf8sx1yj9ffvmap1u8yyhekywzpt7npi667k39zp1g5ob9r6v6lru4sy3e8w7neza389vncf5xuo8fj1hpynt50qtbtqalruprrsf7fvujisau244tkyyoixmwwa1ypdtj0krt8h',
                parameterValue: 'lbk70giid8xmbr7ijvk63y6km34hfl66b0nhytwsuerxiw34yglletpx0fcpt6kj3hqvycoht2681k8rtndbnld17r0nm7zj4wlp0drwh2k4zzxseko5g7d0k37zbt4xcwx3wqbhn7dut3771zawlpse49c050p8eh7lo3ujule2tig5waes2kgxi5ca49ogiwx9y488k3p6oexnae63dfs34z2c22dtbmb5glb88j186din7badmj48sil3szj2yt3a5roojrkbbojb0bi9e5kvcaeku8a4fmxdnak6hgcvhi0pfuiyt3if0m2n0846ijgeu281fk8r4lagenlzz0yhvd6ew9xl3hmkqpvqegheqxq78ojybfqf8nmnxkg5v3tyx0do5izvp68h9k2f06ol7j8acf4tjksf34hou6cqftr5njxeejo5by3tnvhuqe9ef6yfsvldo3d2gh2e9i5nmz4eu5dx0c23d449e7c6681kb727pyf3sctsrvg0pwvadimxviimlfvdzueio9l3zslo85ga6s4xirifzz0g20lc54ajed7g2n2gl26z2apkqoxfarmx1ps66g060x9weuitprkifj6j3udlt7mz0xcwxzm3c4gaphpuz4vgxbmn9ezcbe4dfroe810jynn0vydf5t5r2hp87mym3056yfyp6ik0lv1nuzq6csgw5p1jz9mrrc8d4njersvrgy6z4iqvlne1biwmifithzojedqp07az0oxkhtrui4nd1qv0gpxl32sjc9j2kow3bk9qcblwjrnv25uk8mi0myho4s1x4y5wf91s73sgeucr73d6j89qvbhmawwfmakmacaotya5x3tjk633gw0cbn8atjztbho96jf3r0nf3myv3kq9wan0tpxu5th1s9c8v6ocng6u5ywr4p8bpk4l068p7qn7l0z337hpe5uzprq1lb9koip5kbja2pfnwgrjulixo8goc13bb084m8tzdy8mjvs1gexvfzty6acjk5gb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'jc2evr2e0847926m6d37a9kjga2llzeqxqre18uueb9vk7rylh',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'pt2f2lfm2o65n0o9yabt',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '5hs6mh7egiug11ahk9k666ldej4pv72vkn22q9e9i0f1r5b8bvfc291g26uscwdzospcv17o67arb3eo877r5nzg147ekbql25snsab93dlnsswwahkouh0vmp97x2chpqmhl4c4tspxoqelsoz6e2hq6oxtr4o3',
                channelComponent: 'lg4ur04z2fuomo6ms4psxvo1mynl8maqqwa0ag46hun6glwiifpv0hnasgd170jypobqup5z3jdq4l0mwq5nulx1oqhgp6nahsjau22axvmyc4a9usc6h3gtz3mr7avam2anwvv161w3esdteeqthgh8ab7nvgrq',
                channelName: 'wtdx0sea89agrybv5k5aix00wekiznahwbbjhiygvi63nq4yibdiaikjyqwofa11f75spavvj8rz3yxlg1lyl30icvmswfrb917tjzl12u1z1non0lzipei7xwp4agna5xptptoc3we31jf7ycf92em0w8wcwtis',
                flowId: 'hicenq55c4xs4h0q8symp8w91degmkq1or4v9',
                flowParty: 'b2oxp1wrgmhxcge0bi9f389qvb1ezbzsnmr2vsvdbquzy7akgb9jcoeqleaqb88py33bllxehbwtrazxfuzogu49e1az3r95bcdevzza9xsrgzexmf6tfnqnjh7f7u9gf0d3j7aongrfxlovpqh23p3h6fn24wo0',
                flowComponent: '99gnfagm35b6qjemqzyx1vabmso6shhc3t3i7fgoldfm7o6n6n5zbqxdvhd7tsyj74lwm0e1h1c0tmy8ajhhfp5oi84fmbc76ohb2cnmmn11b3ad974x09x6k64hytk5pu5i6quy7lovo5abokooc5tu3j3cf6vo',
                flowInterfaceName: 'lwmwvi6flve5bhpebm1iwonrjpay03ies99cn6x08b7a5tbc0url8w4mnsqupbo90hnmjzn4gnwzpnqwg3w6xxdw1q8g7vk4sjdbzbm19l459gyw32o8ewyxtiher85dpywelg0xq37qdk4vpf26tl56yuwy9nn8',
                flowInterfaceNamespace: 'phhp7r62pi30btnhu1gwcu1p9bmeq45ga84azjmpah4r4x5hzqw4bkbegznvpb38k782aug8uaxx2ba6lqy8wml1rn18prmc34myo4yjmsqfrqp1nsqqv6bzhqjr5k9psr7u4ptrbtja8kojvbkeag6onfi8cwqo',
                parameterGroup: 'm7bdpx0s0e3emejvl3utomcq5kbekk3j1ea55gg7ibe00fr7cs9pe1elg5bikbg8ishirnegk2gq6asjlxgirj1cqr5c9tyycr2oho36nwesfw7w2i3t2szmqtl0duqdqh2vv9v4wr1lphmi8rwya6aibhoib1nr9ptubqhgvnusn4hh3x4iqahcymtcqhgbnx9rcw5gxz54mhmpqio8jw9bdrp5sdkmgv1dqw5my7wk69mng0rbrgfwk6srpeq',
                name: 'blpk0i31uqorbnp0n5oo9qy6ump2kunrtydikonde2argddimo2w3ejv4lgrglhi83k2etlbo8mngvqb9pzphx5xowb9fnu6qfj67kic5p7kq3aef2z06p8ws7b2d662xrppfe7p6mrqyr5md8pq3pev6r27jg3hrpvz2khleqezuv5rc25flw0mc6h008uhe3q05rdxa2pvl77ne147h4nz06jgnaq2y29aovxk8nq0jrsz6bxr5orno1d96k6dob3i3lnr8qinliu6zxiqsao3am2263ls7i5dpflpxnv7s5kz5qw6vwt9mwe0ce7e',
                parameterName: '5kyd08t5j2avjgkvfr3ehvnhehtorm38omwcutpohhxrxjev18zjzwhjppx5pgc6y19ma5ifhshj75267arof1c28st9p1x3aohy64dxex4i5054635jvoaorwp7cd44wuuequb28bazlzbs2in208dtkz9os0zleeupa0acl0tt88w7qt4n0sh3b0pit96s3tnwk7fzme05l73xo9m31x77udn5r20rj70qnp042dlihzt9v2szcdmubexzhbjn7jb9cv03tfl7yczl27ruqo8xz79vdjupnfqvcy5jj0oyvbpo0xwuf0fsiv8wfi06',
                parameterValue: 'p0mmqgs18x38qk1fom0devia79iaofqq8ntwqcrdwqurzvu4n3jm0gwonwsp4bdbkgnsb4v65ozjfd1iit2xul9amsj5okmod22zryoujxl7aixfva1vfakyml9ds2mq0fom0jof70vgjvo2me3cw6cozmq8cirb9vnfejfqzoosz52pkhavfivfvvq7lv8f13tu21dunvmyyb41andloqjcg7dbbdj35n0gmpa4j94u6z3guz2i4319q66n8f3rvqlj8l6vkke9zr9r634ji6b0ar5bbrhc5kx3d8fztrda4isgwdrxantyaewuozxzh2s4xcye6iz8peerdo5eqkh29shcfmlomu5tfdl199znj2u0uucmvpp9mccdw5c74940m0n1se85ryl56peaivcmzhxy9tfwv0xcx0uhfctj6al4y0u4z7lufcpuqzitne98k6tgwqixvnl6ht141aa6rm7w290ut2w7s36p0zs4v5b0ojtbudyeeavrcd47p7w10j3k3gkvb3cw7s9da1wrkkpd5vwsbqqh1mie669mgocm9qbmqnnvqajol7t26ec864hg5bsyzp25fd8kgy1gjxt0g5if0voer13yw51evljseb2xwnj50berdo34uh9g9gm2b6p52gx1hwflh0qki62xdp4v2ghjba8ppp1s15wn0pfzqhip9nzzaiur4pc2l08ex9y66bx3il2y2m0fdnsnuyvdi0h6bnazb27jvaf605wzsfz2wxkfs853dxbd5g8yofyde6fv0cup74zfaa1tsopordgq0zhoz4hqeokn3ttadqq2jyqvdhgi2zt2athme6vfpy0drpm27fu0syr9rpwoloqc2kfe80gq7ebr0nfw4n50yrwn754ezxrq5jlehw13yhhgnx32l2m5k40ky92bssaclz877mqo3gsu98p1s9fl8umq84bc5s9h1vnrfxrxdtxx1v9bljgxx65mxdckete2k3jc19vqhpqlif5m1ho4ayqahj9n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: '1xyqq8s85udizw5p3wmkinq1ixn1p7gwx99xttlt89t6307mnta',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'ofxs5wx9m00vi7nkqfrf',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '1kbnl2qd9tmi2jra8otyre2ufy3h4ysxclcqb0i6hiza13nf0guzq713ogs8sxtff0r5ub12b68pgh7j1d8hzdwzfmasvwrsq6xcnbeou609o8e21g3u3nb0g0ppxm725p84zffcz2fq17uz2ay1p8yc0dqv8ggc',
                channelComponent: 'q6n39147dqen58j9yoalw5d9r33bsbpo3vyz2g3imo177x1sor68b02dr6ptbqpcsr91usuoih9euhbtfbdfzsztfc8hgqhqozns6mwo9tyszfxvkce5ajicr9g4sxysabc5cwri25tpzvacwguabi8gvq7o6rbx',
                channelName: '3zh9r7pmiksfw4dy5thrbeiw3fxuvil6ks9d0pptlu6o7afgoap8div1ga2bnvu0r5ptbak1aw2andz9rqtgoujdvmp85tbsh6z3vy6nukavc2w3bbvuhg5sbg2hgxuek6v91qr7qagcppcnfkiuaogl1k1naq4y',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '5ro2bmv8oyx59qnjinda68w360kwz9k0vsyxufqqqa1wofan9tohg5bqjxytgppdrrp9ydkcickmsb9bd096mgoatuk4ap6doaxrc2vjsiwkviji6sizs19ng3apj7rz99hs90xnamygl8ty44qeixfi3fxg4hap',
                flowComponent: 'lsthw7trrgp2r7cybdsdnt89ge59uo1038qcik02zr6lept17yz20o1nv9n87cotj718r9dme4i76p6mxa7eln2eo8hd9afx02p4ma0ktqyaplwv6l54v9nchj45yp4gvf4v49590ccnogfirw55rkwilv6y3w3j',
                flowInterfaceName: 'ajlzbb0bcz06oxswvsdq961kwlztt2nrhncbaesmzt36ubwv3iqdyhk3c5e4czqqygmbgitg6ps1rfa6yuh56kuzn6wv31hvrimnrb5qq904xb6g0a2qqbggxsmuzisdcp3rjhgm9nui43dtqakps988qoktjf1t',
                flowInterfaceNamespace: '8y5ztntvlp0zfp0tfzegdtdv9182aw5bh282dghmzrdszivhvb5dhd8ogo9og7jurd3igpk5tx210zbda6npswz6453fotxzjjqcywjw81q93gwousxutnsos0whs4158r4xodfr8dk4fv9zc547vs71gvkhcwob',
                parameterGroup: 'aitjy29wqya2adt0l017tlvpdnfyyyfuogxfgkdwrgcj78kv7afovoegef14plgbvz5p2xjldzgobcmue2v2x8tk4pkwq7q9oqzxozxbzudrxbaunkr9kxvva1neuzovelyvq5ny8780dznybs0np5hxopl2ncwt72rxob7ef920qpbo4eaq8b0mzbuqjjjxtpem8aqcjwp1l30f2mmxaeuyasubcoiutthb1u6ny33ilf9i3ajcv3p0mj9nbez',
                name: 't87o93s966s6iujzqvop0fohew1sl71bsmyuj9c0p21dem2ljlq45yyuqfm4cgrt2f2b26t5jiqgvjke620i7bvg7kej9kcmdj9xvl1mm5fx1yzd4y4ccdalvtikvys2fx2iny31sj8d82eca00ts8bzzs841ieg7r7xdgkarhv73n2f5ojhqqye6cfxu065dx4am929n7l3zko5x7mviq7kwqyo8igqggtsbo1946n5rerrvj8nz8oebnmo636liw30uhecgioyfc3ya18efdn5zsqosfztppywsndtwekm22sqiztb4xhnatfrugkp',
                parameterName: 'iaw6giit6lvvyhzeafj2j8gpyew20gwl4z3lfljdwjcm3sepwji9uij5tet920itbqo520iwvt52pduzw8zm5jzihtrsfihnomoblelpjffk3oxl9sh5c60nl3otw0ryvjdxcuse2843htx47a0b3w1hx8frfjb7bz1qts4uo33g3h1g5cnvcpnmuk72yq7brmrolqufzc8a2ylrriic7edjkpazj4mrma0c4plw2knjs6iowuahv4odcu390oko8q0rw9af2engv74vmslvfclq0y67oedy68nfq4l7hn6vct9zlzlfy8s2v3x2j9iv',
                parameterValue: 'wl0rkuqli2qh1azs6eaomot3hn6vvowmcmswqctpimwum9a346v1h52fyqkwjo72vu9tedou2cz7gj0bl9zk0aa5ahwrj0qsw6anlpkbz2p2sbtzglhk4jpu2r0ud8bpfap803vdabsz15tq7haob0qa9fn7ndhu4yvhbbr0rb9kwk7r1rnn12zk5n8h1rdtx87kzxm0hwsz6gl4k9rzgs8ozkadfyr6l7mpy0zbizmuttywwrzbz9dzqj0ttv0wk9ns15s1rhcevcxtdiiwetmrz7xvp3iwlbt6n2vtfsi3mj02db0agi31ifeencyqajfugokjiva2uasvtoort3iwvo389r1wnl8hprztfq5veisys55qtmxixon6e2i1pii33gma880mte7c3dxoeni60ufwfgmxihzzju4up2f8k0xdtoe3fn9xljgr87q2t7k3fn2tgjxp0ahr1m3hik65pggevpscnzvbf6ya77qv01wyzljqpjuotvqfkkizgsdxh0fclw07rggi18ok6y0hdecwju36izkipfkjz2sgadjltro805x0cfiai7e5k7og22ss648aphvw4x2ompk2rh9pfmwxnjuqxp5ee5w8kmh36tl57ic2cqty02t6rrz45ce9c1rs5nccriwqrwapuxo7lkw60mda406do2ge3keydxe6vnavbym9dbg26wnpfhgx7q28u5b8f83t0myoeu014ssc083r791tfscvc7ieylxzk9g5rvgpci5v0u8artgcphjk48adru6bj3dxinu77kv9nucrtjarbd76gal498hs4uwawdm6cw96gpeasu4afx7t7b1oydixf40pfqgzmiqqizaacrqq0ct8wl16dqz4du3h7n379rr5ra3n16j42sve5kpln8x0bqog9naza73h5izvc8n58w819f9kv5jghiuwpb9soyl6uyhwvq4zi1wz5ltsu5wh4kwqwb9pbvynkmvbgkjzpwt0v4iumuqphlb20v5y9ce9',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'iovu1vyxcj6yqtwxi81yvy1h6xs2zo64qfm04c4am3z6uuv770',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'danq893fcdsfst2g6vg0a',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '08u3k89pcqtae8hukw70sme41bu5f6ffna6h3tzjkbia64sumbrrklcbxk9ub089t43v9ayrgbth19ihrnqthreoybvz8wmqqopuom585nkyivhh7j7a0hu5iykc8uil8b1q0gsp01rl8xp2k1bivz4v8g0n0hqt',
                channelComponent: '18j1n8d039zlia6x2u85uhyyg3zuiqkafzbrw6aosoq4xvdcl1exqiwytl5vqymx7wi2ovml1nkacg3knp8ctjoyu9fwvzqbvzjqjzc5diknunb4cmcstj312rtg6lta8bnkekr4yzvepc58fdp585cnagpg0o97',
                channelName: 'o973sswgwwhesb3h264uc35b0wrkn82ajqerlsms1ssd3yc2zfubol0flygg2e36ogx6kx9tk7v0370pas6z29aql2kgr10g2nwxv7o57ahj7jjcslg0mvqznfs1jfummc78zosfggq1dp7prx68wm1uc0yw3i5u',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'lhpr5c5wi2wimqikvvblp3d8sep6thxnlmc9fzkkgu2lqnx0vuh8xfu74txabhb5q813enwwmrkk6jbtaber0qs2qrvva8atryagvq9rgdd59oskbkl3l6mo2ve4o3hjk46ecbw221qclpqirrozyoo7ynvpn4jb',
                flowComponent: '8599wf36scrtgsxssfgpdgqjqtbb716nbtrji7oydkuoar91r3bukyyilh4jkz286tjl2vci45cc8uhvztuomavo1felxhi8mix0lhjuy6ilyz3mtinya7x8qbaz5smsvb373l7liltgbvzejib8dw7ndkjj0dyv',
                flowInterfaceName: 'zdel5ivdv1sphrdql88vw16c190xso1r75n2znqrqiz0o5e6hqo88l5prte74erw21gs9jkwpty1fttv0eow111qxzn7qgf582939lrl88odbw19fhgvnf0vos7yo1wexk3lxb86w6trgvxan7kof2y4lddvvj4u',
                flowInterfaceNamespace: 'ay12pmdxvdkzg917jssvl1yn8n9p94jfh5aknxl9j65sziri47khrvmacnrmmhshvba8zbrc6onofa0u7x2w1epismsj3l4wgk965tqpni155ngqvmx2ub29uad56ywkfhfuh6ye5c2sylebmw07eegp3s6wo5hc',
                parameterGroup: 'z0a6zht05k8kfykdswiw6g682fd3yfwduz3argdbxs7ay3ppewnee5nm3tkbknb8yl4za6xe9g4f0nnuni1gaa7rtcnq94e6eitdqq6ipsniokaixym3smk5prcbuofhaayh10hjzq3cggbdryrdmlw6jtcp7gc2ya6kk5ak9h785bflwj0pvz4gza3nea3yc01ooflhqiiox5d7drpnknssup0f1kfek8hovvayd7r9asziumgq1b3oj8kjtqm',
                name: 'xp9gx7kmwv9pct02zmcmcyz6telf454ipt989rhoy4z7pzu6e1q01fgrcgmfhl4tdxy3j19cdjnjz5nuvyulqgd3g6p850venl2ha9wm97aplgutgrbw8x1siva5b8bcub6d1qntlwy1fyruqcetpi3v8z38o6eugipdp9t22smwvz4473a1qlnv3uzbtdgns7a1y2wzbtkacurnwsydsfk9cft43520wsy5m3w53zzj44vjvflu7yswsi54d1krb81e4tftjnlmi03j1ogm9dgsjjp0u4k86kdq55rqi2h0oc94abkydfe1pt5ehmlh',
                parameterName: '2o65vwxj4fl4qvl2mayiu9mgs1tcdn3sbu00i0nblwezlyp7jihl6ysld3ujgpsc7hjjbz5nacm64jsidgnx871101qvip8iydok6yu7fuirm2yno2hy803nr3tinnbjbbi2wtdtxzc0bh5obq0k647uje815aw8b891z27fhd526sah4r9hz5jxcwuvh0l8tzwz3asno2jafiqm7rb91jxb2lg62tq8i33cpdr8recv9qvvg5i51o6qdsgrmnownd3nwhtvzovrrpdsponpp8opr47y6ij3hl62247ab86d8mes4w8u5otzi3wlsykk',
                parameterValue: 'tuc1lvezudch5am7qpr41ecokjdvt2y6wx2np3eej5az8gr9s1wp2f4bpvr04uvw9pclwjcl7gya7ad2yuuv7vd2d44m76c8w2bnhoaj39f9qrr598heg64d0vilybzth4oqrrytwjww4al3pejva83iaesns7rbofpyzai43iebe5one7rk4rw2v1athsxqs8itwv7oukv29p00ycml919agbapesvruhqvb5h1xmjyf1xvj2fg6mnjl8ipiconb3k6bxob6mucz6wfqz19z744253k94q95vszwyd9xux8wiroj3ajoohwojkrc3wyjdu1jc1jf36r353seutq1tayznld1y5q5a5g6pql2p1b400kuzahtvvo59b978jty9khrnlk1412xzmiyy2hyqtgiav7qq9o3n9ffs9jtmqgp1613f9wltcuqt6vdlbuhhh1iou7vqn1jnexcu7x9f22gx0cd99w2d3512otmdg6a17k6eyjrm6ecrf45ntd38499jbmkqk1r9hypgammb9tnkbhwb9wokj9w6r2ou2df8b987di955v2iwvjddzghwoagbfp52ygdizv2toom83pwfkew93rhawrnk4dsa1m58aai12eea6f6f87ieppghsorxoic1j3hgec2w0kkkusndn9it7d7g9f1u9vojhnosdfuzxbxwtsicktxfj2c2fqylkh09icszf73nuuzcbwn9n88s30dxjbga6k2d4ahcqyovhlrj8po9b4sa6v0qvxi0q50j6226jxtl07abdc53mrrcp96dpsol41cwlktmq3dx4yhe9l5lap14zdowzm286rfzsjs8mrcfpa1pi8cuf2h86cr8eacicah0efr4s98i92ehvnn3543w5twy4w5cn8to9aul4oa6iz0h1p08n23ikktywr5188mduylg61pmfcwc2eomi9tye907l3kia28rp9q7vdv2kfku0zxo642dh7wkkpuvqvpb1f4d2bnsexmf0iodxg622',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'ojkqytdifluchmlommnnt5i7ffekl07jhtupr9vl5n77jcrhag',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '75195ko1n5wjurxf98ho',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'd830l9n0z4wfekjembz7swnwgcxwijwhl3xbdb5dbay3affxz77axvr7aclh929pqebwcncofkyci3i5oc82i2e4sccyagdcn8fsrl3kwwduelfa89q8ceo28yntc1hueu0zius6pes98dtl7fvsunv9pefo827n4',
                channelComponent: 'mxnp00ztp65tq9n1ic5mtx5i8oa8wda72qw7put2v30ynmdtwx0fu172an97xt99wj2kttoqvn0o0qkl5drtfgbuh02eyteq524juot6pgbfgd11r5sfcxv7jaaw7ymwx8mfg9ggo32gqzgc932znulpsdf6qj0z',
                channelName: 'k9jkws5w3jikog7dh3zsvxr6kj4ls1kk9cexzvwx7836eomiybi78i0rujuzt3lpr8nyjyz94o2otcknjjjkjgy52g6gemxh1hxmk01pjdy7enfmejspm0zblk8w7c6cm4n94ff318tjykqxflg74hf2tyr1sp4i',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '3f74p7hw8srpvf4javlwtfkqjw7bp68c85j8xl64oefum9txw9vgri2zgnt7kc9sfiji640tewhb98et4vrnz03sew4uh8k85l6580g96c67e89p3ous1aozbw92r80ersvife8e2go3ci4cbpw0vwviz9rxaccz',
                flowComponent: '9ytpwkf9h75lfma1ls35nj5jrlwjc3sm5i90depwpg7ltmtpq8u761okx5hs44lqxhhr4n6dbwr097r2zbln39hmsc9dxuflnhbesbwrahb2gtwt703q649db2tyqst3inxsw1wwxal48kyyzyeulj4snegexp61',
                flowInterfaceName: '6zkxfi39znepmt020lfibej1b8n9g7xy5xs32rzk33md9w78tbotfgqov12uh8jhu09g1pxwtjuft4s1fg73uqz1tjd1ukznclkm76ukg267n5cqc01fsugz93fmeq8zovddbpykfn3x139dof6jahg4biylddqt',
                flowInterfaceNamespace: 'csy5imp9xnbu50z8zlrk89ey14qxwwojz1dg0egrdhlgf47wlss7czdg8qwq5i43blsbdqcupxsx4yptmhpvyne41hkrbs9d1xmp7jnyjjjts4ge6p9kthblhtjg38bfkw3a536c21zke6ewj6pivufpjb51smje',
                parameterGroup: 'a3s124copt45ldkfbgyun810nwalqpaeurvizdoibnxs1uleolgc220uxyqv5u580enh7amat8aijxrkf0q9bdu0x1lqia2ns7y2qang6fnzma8tds3ephfjltgn29r8n117idfz01r4qpg9ix8qejq8tev48cgytxt0g6p1u8hcd3jzcmppwa7gx18vdy5jdbsov4n2dvvnipxyd63z3lxz4lp77pu7cg43aqobktudiwf4x8lhwtsd6qrow5h',
                name: 'rb362130jhm4cml4wfu6loh58s1156qvjf2e1o8qlp43h8ly69rg3mpfxtc6ard2t4cvcl95x7qfdre1ydafz3po8z1hcb89v7d9t0ubn22xpb7jm1jmlgdfw8xkqqjvuyc45o3i7m3h2h0cj0wubrlmfveor6cmwkgq2meojsbklt3wew81vf5a2y0pnxxi9qhyj3bf5j7z1hm3jmrrodack1v3f066g7tduelfzqyiv7t2gmpyqvprq4o32iy098sjsr7ahpl2tyc8h42t9e003ynhif97xwkqqa7qb1k44vmvnm6b1o496hbyt0nu',
                parameterName: 'g78n0ssvhch4pxozu0aiizmqu7a55rc8movgthvhs478tuv4fix89np3t9dbd213zq4fdfsqmpnhvdxro08n1gq0cbupn3sym46kad1gu28jrd7mxlbv62xzo040ojosgbtjp5xfe868uo0mu1pfn22khzde2tlcr8fx57xx978qcoeuqczb2fdvhxbsm7rlbgihr1i8wm92cv6eip2wgjyn3inz2cnsn6ml4pcubvtdmglv1eluvoul0qt9jxlj5qdiuz0ge0wgkthh6xjicq9mpqw4uilbed65ikuk4u6by3zmf3511yfvze0i2nia',
                parameterValue: 'rj3x79t98w0kaixsmfh9zvgvlh5eay7b03wwnzbp0gnbsl3r6psp4fusd1lkig11vxbyxpss8gu20k20ve27dpc85d8ga5qnp5lszs7q75t2zg49u3fzte09qlv6krka5c8wfpsm1ew3gqexwf27zwjc2wzk7wojkss0m7s8l36lkit4byr4s0pmou8uvoiwh2xz736y89la21qsmzy06njst3pn5h8stht3d2k0oaeq8socrexpcox507q5983brv8nj8u9ewurnkx8d7gfeukfgimlnov3echgl05bph504c1rk4v5w0cxooxo1oqbegxjt4z2m3xn3r6glv2yht376wd5yi5xly10emt2yurzdvljghupyf0tcgtege5touw4w2rgdb2prtk2jlb5t3lnmvxlhq2gfgy57ycsjfstso3okpcyqbqs3ueirjo2vonubux0x5wrdy431n2halfq227q3s9qrtoaan7q13143l7el2dw67tb6o9r1ii4pyggyrvfrq62uypbb9r6h502d9hupg4pp4tg683wa7k4k9g208jl3hodg0oydlw1udpjkuye95mej7zd63gtpf7bdxgit6zczo5zhi4q7yx8llfwingl8fpz6pyk322eqh5sbhzfjc2jgrodz1x9c0qe0arz7703h3ebtcwm700a6zsr6hh5cnsr3m8pnxvdi1omzq09349152fb92rhngixg8aaak4ijdzahgkei2vf4zstv3mubjhej67aawznypn6prmjl9k9lu2ng59n6m6hywp3oq6kba1rqhjs90033is7k3waliz43354i67a1xdw875rxqabgd51m8y7bgxfcx6d05lingl2qqn6p5vo1lcbf65hhzuvhz9fxq230kvela3vj73okz6c93xwxrcx894gdseccfdkw6ghmi9kz17rs4zg1vf9skrskwmz9753dgjfkw5gcafyoc8mbybeh1uw6onbgketcipb0yoigi876to1esy9jde1qxy4',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'mpfv0tev9ys2onlbxc3r2f75zlih0yn99dn66610psm1lts0vg',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '440gzpx1gm2lj6twtjh8',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'm01b589sd525nmwiz7kem6fu97hakcx00ujlpwnhomqgpf38t5t3g37rxk3ynve3eviwk6k7xl1sok4p5xibq1tzgpakk9fo4ld1d6takbsau35rs01m4va4ojwngk5v7313juj8fpe5v0b162xhv5nt0dbakoq5',
                channelComponent: 'ff0499fu6eyq14cfbja7dkblsagkldga8pbp1b64681tah2g92wphnjdwn90sm8edwwn94k45f36gx48001sueumkuzqc9aewp6xms7w5mjxabn1sa0ygefcygl8swlakcwmmef8rj8ju0z9h3y10d0mqk47ptgtg',
                channelName: 'kq98fjb4z7zfevkjoiut6u51qa47ocv1berqk8fkoo0qmtzl04nv12q2m8fn797pwxs43x8v8gfwfwdormrznur2nyyn6cr2w5e2bs6qbmrmegg3a44esnmsc1sz061xj7msccrjgjws374zn6eotygs8ugh9ccg',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'oexhaa6s7o19ag8qcn07wzkk8g97jx56w5gk7u439j7z0gm9xf9j04qkhf69patfltjl4xb706jxf49yx98cye0755g7dp73p2ucp0wf2p3u3r8sk7vo6gowh1adu3l3guq0dsyavckyqzjaysxungolcpxrd7ls',
                flowComponent: 'aevkl7tjvtcw6iq92ss62vgpn0lz4zl9v10ow9tknuuxqbsssfscnrxz9qk3e4pfhw1o7ze5c1uj936q9gyne32n720nscr7502sswabn9e7y6bfd1lt3bzs9phh4rylxnxqlc3b6a84cg59ozhc3kw72b0cufua',
                flowInterfaceName: 'igck6zz89jd72nkgih4rj0n00wok2r42n6owmdvn11m4ms48k0wak6h3elnkynh9f7cnqleeelf9dbfpbst3qauhpxemfg13ixk3nvg6d9f9zrah8tc2zb1aunghdkl9u1n2xn4kii0u72d40q5fa4fa85lzta0i',
                flowInterfaceNamespace: '76nadu8dw1rqj20e7jcaitoeyymd0bd3k79bkg6mwh4iahiygn22kjg5yh259rp1onzgs1yydcpi7uikwz3xbzn2fsssdqo28cggvnlnm5dc9tg8swk7h2vp8247f7ykq9ajnei2k4qn1l0woohjfmwlxa8jldjq',
                parameterGroup: 'd7hzk8nhvxw0khbomvzdzjxrrkrlwtytzfdqhnualh9klcxw80ygs7dug80x8agndclbeg5g3emg3iflg5sbxxadntqbx630i42yocnrxn6m794evly4wxv6wosodubo6njsl9f7halhsxu66l3zsaximsqhcahrm3dvdnh554k0pm835z6rhia1xihsq0h9g52lv1115t4joe0j5i1fh3podslh3twnd2d8ck5erso6lpqod67oe0c9areoxfx',
                name: 'js9orbo3o8faetnbcl1nuxk4usrodp4hz85viq5vwq4fk928415d2ebix5bsgt0ul3ilxitjfin87ye82c4h8z0mpbt91qnui5dpyz2zu95pqg7rk81vkl1qoodi0d8z34g1c9vep0d0ccqtm8ts9gsaojnif3wd7f4bjz8u02j9qqlaq2u0utms89xh2cys30eyteh17y7jd6lqogxxhafskwdwpj5dh1d1leh5zeggvxg7khf9fr75ptwms8qa6zbpzviaa35c4fpkwd220e8fadbwjh4dvf9gykf58bfoel3wwv6iqg5g5800mq4g',
                parameterName: 'b2ebg44ea2q3hyn10g6flucckmnwgqvim8s7rrjxry5ayl79wab3aroth65nyovskdpr8ndsty620t3zpco43tic86gh9qbk13iq2t8zv80j8kfaerhda0wqbdk7m1fy8ze2a9dej9z3m1ru4cazqyt7w5v4g4g8m1mntsaapal1r5ew2i84h36en24ronnrqp753c4rzm72h0fbiixawg2h4oxbwdrormpdiaz1seaaobpoxcbbev1irkk0119tl94yy9d98ofpuxcf061kwmn3uyb4qmrkqg8cjno1345fsld1mhgrg3kkbr25jgw1',
                parameterValue: 'rzpvq2xymfyjgcoy2fjdl22dlnqz1wd70vwapst1tyz45f0nnsslzoa3ubqzb52gbyd5x646cnjfdciye7753v0etxiv20oj0fof6ki5ojs5af5mlfdsd73ad90rg56wly2qc4cmv8qz385hjfpjle8e6c7rouq2qhr528q7qsgqrr2uoa022wi3yqkajmky8ssadzjgd8j0hrbtgq7wju43pmyyvcvsav4m2y8zffrr0c8cpdpe57n6ggeo9q0o1szhq0ufzk5p7909qpmx5yhij9yivox3vm9qrccs5r7fysjc956helm8ppue0acb4fgtd7gaolmbvjp3agnqi7epqy12ck6246deznymyhk223totl87dl4tt2y4nmd8q1ctguznq2onf8qgr6m0314wz33s56j8l93637xpxgzc2bbrr4navha991ny0xqxphr6zpycfh4jtz7x3sqy3izp66ny4tkhwjishqewxf3qpsb7dyyumnsk2e9my0ax0ed928xz2nmcbkfugppnvtia02fsa48cy33snf6un9je65aerbgntqm26qlk9n5l4jwlur66l3xayndah7gc3smb2j9051fc2iepz5p83u9i9zn0rqj9hw2af481bjmqqm7h8rbeoo3sdyvq3b99gti6salhf4roa8tk1p0dfba1pbjjf60sequa687h7u739kirlqasg9due37zpxig2hcxjpen1oi8d9gzr69svjs7f8wnxof2fsff8ea5fx7xz0k2kns6oy6xwwqwf6uk8cr1gvxohza22gru52g9pl77wobgmuu7y2vx9fqa9itxrgk3h1zon4xw9goigrhcu3sr8n7dovvkogc49hru0mpheaxcxz24e471mhaw348bi9zw6kqrve79ffbfvpx3iq6k7irfz8d8xipb1x7y2b8op5yv04yalzj8r5jkdlxdjv406vitws15w42jibox4jaf262d0jdyatkj188qxjh5tkn0okovvw31x5csli2h',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'nx4x5l616mm54n7e1ye3kbyoz79v4p7o1vfnktppjn834wt041',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'pd32drbxaduhl4y9r09w',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '4m49xv3o8kw9495ay62hynpew4lsimjqatmr7gelv9b1359dvxhpqvukokz2c0ly5fvcunm2ngwiwmdr5qcy199ozni04tdo5vp2s0xuaoaeweddwu8ietis9uad5kehk14erbrbvfbqetppfoo9uluwcp84m244',
                channelComponent: '9rxrf2r8luqocfme9tk87e9rgsx2gu8x79gqo5amcimw820p9j4jb5yrn80oijgcmj1f8esbuh53b1xr94sgs7by78o7mt15arxgxz8diwtoaq5dk0byld0o1y9tuwqplnzp5jy83gkh2n1z6gqvxck6113j851f',
                channelName: 'kolzi2m6hx0drclxai3kfxqi31ook7ncmsv8n8jflozh5w9kvzpvx43yw1o0fjjblgzvggm30xljwlz3a7rlt8966pss1afaaiybb9nzs3b36gjhmvsdbmlg0hh33uyhl3cp0aqcrabbnzeo9ai6yjgz5klx9osjv',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '7k1q6vlqvdqh2sm4zeuquq5wzns7caostlxs03986qn8pz6zwx35z3rn9qywi6p07x15siu0ibeg091ylbv8u9gd9krjfgte34hpvnj9eydrjb2kpwi5cswgiddkfhe6xl5th80tc3yb197y6furbetkigzn9i5c',
                flowComponent: 'jl0t59cwhvippg6bwxv5dn70aiupivz2x0djde3gyhpt48apadcp42agl4oqv9suwic2s3cprpx1lltoj8llb1gzxgx25vcvjn83ccif9dbdfawtx1hm8hkork08t7ko824hcv5b84bt6s9lz7n20nuii6pvbimk',
                flowInterfaceName: 'f87o9ul4jkp4xzh28gmouh2y7j7ud02vg6j12kz3ayng6k0gdy7pbgygh4265tyvkir4offwf83m507kbz7sxq7f5itthm8og07t8m9v05cycraw2lk9w1nqjmdr78q42r3890fzn73r6sccxyr1ml7k1iek80rf',
                flowInterfaceNamespace: 'ci5msoul8ieuv2pdl5e6h0ijjrvuub573jllvtatc2n5ez30hn6ip3po2rgcows84bm927oxtft1yu7iydcb6fe09ssloa1db56tyqchtrihmgeprhe8t0a9e8wndt78czq8gdy2bwiv9ootqq62irbvp8dec6og',
                parameterGroup: '0iu1u105o6acujo4ezfasvmocd5hifmodvfdcz2bqzeh7xtciebnxmstp106je2xs9nmf8x3anvclpbamuier3bc25g8vwsuq3ed3kji3gidq4xvxtbtwgmxr4j3kucaawjmz4hx48t3fqevxcn5getur7ptpemqu7nvo7b2wnj0a6gz73inyx03804n8qy4593xs4u6n36cb2wirbmh13y49tew8gjnjvjhf4lbicvx69p4g0gpl47dqh87bdy',
                name: 'xzkmqhkcqpiu4b1j37keu8hbkapyg52aq7h0tkcl5aob9k1e53awspjktfpxu52oomyxrw0g5s8p9j6dz0zpduqb7ksq57xqgdaa74adp2asr0g04wtfx1ndjj1znfnyzqfyaaikipbqjhbi62l9jobq8l9sajb6g6ha82eotc9ria3ly0mnwsr11dgdqs0r73c68i69tvxuod7adquljbdlrzv1vnzgnurzcytotokz4xsuy07oc765mgpiwapflx9l3mq7mdek9v6trio48ct5xx236o4updlgmj3zco2y3pv9vh5y4hfd2c5r3odr',
                parameterName: 'zoyher1b0u51cbk9jtvw0koaqr3zfk1azlbg3ui17dn81oa2kl6207zxf6bgvklkw1jkipj98fi2jkm7fj1njlyexxexik212zdplg0j9jeb4iism74bojvk0ne8xgx5wq90315qcah375uzfcuoem717vqwxphsz648hvicicmnibvzxzltflapk54qryl9quffbi0his32ipwa3g3zl23r33raaukmv9zm6f3wq8fnd2ozgfltamharszt5pn6ibfjgct837v4md8lehf42b0gdzvy3dq9n87bisbhj4iuzoj4yfe7ygyqcgzq421b',
                parameterValue: '77xytyrbjgubyevrs930o7pe9iokhb1o7boh59jjsxnqg8qsrxnyr21ygv3y66j4gjknkcfq4svg8iaesd2hlh4dkfhbf5236225h2h1x67g0xs7bl858fqfxq49hczxyug3rdf7vewpp6nla88ipskkcva9wtanv4987y3k1b8e73ipkrtnr1ihv0syf0mjnl7r5d2c2gxbmitkyz30i45v12exma4o6tpqp302abg735dp7ppbsl163tvmyjfkrseso3wsqjvpagfxh09yviga6vambdpiyyjhpz36iu5d5omv3rv6l9fuaqjpcgzeh98v2ya12pqp4v7nnt9tc3ch8mpsm1m51w365wrkcmluzpmq64ioe335uwmxq9yg1l6n7b4boibvhblguxtjgpv99wfv552a7v51ro3i9s7rct9apekzy3tp3od11uf9fifioz29kr7r0dh5ymggtop71j64608cul5xqglpx8hm0eved3sylkgcrw0vlbrkgcaz5jgzp8v6sgr0jsykzaa39eohwwant30av4u3b1lmzu32w3e569bbg6of4xjxdqvtdutofxcruvbch6cunkff29nqvn1qkoirg592tt8zx4q0sat4y29r8jw5ixfho5c9ktw5bqm7tgryemwssv8vjbnsd8dc9parcsznlykbt22mnhumzaoo8hkfr9z6vzzvdkbgz40eyniwi9zl0s63rxd22flt1irno0qfw4fx0ef0hjry2rk4nnr0van66l98r03hfa71upqfjkgmccvcqx74rko086w97vykif2hnw9mfbymhcckxy8m2fvvi099nes80ia20cccv9bmo0bnnnj730z1rw3dyzasr1z5mb09as2z3yqntyl0imdc1kqm4auyq1w2tom7kndvvbaqrq8fiy0orct8japjljhorkf431xuuri6q8t3uby391ckxsi7k24mxxwp2g7s0hw76mvvy7uxstmgix95f9g76r9aqj93ck007yg8ds8w',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: '4rbxyumf3gkej2wu8cf3uxg7n69kle7s0rcp885ycknjq95tmg',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'gizxiu2jbz0s61j3za5q',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'qnuyho286otuye3kfofcckredzwltbm0rlfcj3315rwbsiem94kylau612c2akp0y9sooe6uh0ti7jkx9kbxccu3neax4ds8ae8v2tj8fbk1zcubhpyfmor1n1fv77exhqmr5ncsxz0ls926g0wiapabt1bdhmi2',
                channelComponent: '874l56tgpgez8f4t44nbe470bkwvh78klc323tuk40y3yehiksl25e2av927dpttd6nihacosrfhsaxeli5yrfkuwbcqq8i83c1qu9ums7w8gndfa5bb6s365ch2s4qtvof9t0329fpr25hche6jqq9bevt870dd',
                channelName: 'bs9g69zau7m5xkytcqsv9azs77tv1y6jfb92rhwrsc5fuzf3k1i9ps1wlmjvnf3fjpl3oy5zfyd0l96j1tujoytrpr8co78xy2ceq57xbl9ktn6lykxnqlh2bbpc25rcgblcmnzv6furhu9frd46g71x40bop1ey',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'ionep6z5njh5v4kopzz7mna9efkjpslsi1y8xhj3tev2bxuqnlw8voey23at5ddyqwbdrkx0buli53e6o47ugcxg5b679i8a5dlnpmbvhs7143rhwltlwyputb9e33xcvv5j0oqn9dw5ni079gnwzpfx7o52rrpxh',
                flowComponent: 'g60ecvh14y1cr828ak51vx3ckhmwktjtyrlgjxb5rpzwc0c807yp1zawprzff5dg22l4qiuu4n7zecgsr7qrq8zgs6vdq4qnmke5cmxdv0gasdc76itschbngtrblakkehh10j4gxar5y62hqxgockj7cnzcew8q',
                flowInterfaceName: 'u60wscsr5nvto7cc5tot3okz3lfful0mtziw76oe4yd5t41xvzlos6fl7t7us3cgdho950urlzv9oloxhrpn6mswpu0c650fnzid6z5z5qvlujeicvly37y2yidbqm8ta2ykn2pbgsqkufj487dza5qn0s4u3qn7',
                flowInterfaceNamespace: 'pyx726o3lq2je4sxpq22suwnfrb8ypyvn4lxl6hzfpm2nrua1ud31t4y9whf89zenrwfpqlxvymp82p0p32nhpqh5wqhi0ht93wbasl6fsjqoktskiubcy4x6032tswch9kodyuif6nrm7hr80p9mnyxor95imtj',
                parameterGroup: 'hbuubl424lq86k09dj5uuz9t7jn7i4smyfbh7r7ygo12pntmeknx3svg2t2ygm1yk3fjfuw9fmtr5y6rxq9rwgu5f7l7dxsfpn6sw9i1xkstghb6l4ynizvnn2dwmaqjdsl8sxzi0kb8byo8xrej8h27we3rnz9w1u5w5lwp3jco1cmt7tqyac8yiv2b6f876g5trj00e7owlrc0vemervvvwiowom45430mse7hie6ygt9eynsjkrpgur2mxpp',
                name: 'lwipgjplgildyx43n1opsbj2ajb4mhamh9nu6w2dmun4490flg147m2frsm01mq5fuyv95mh12v2cqc2ejksheotgmmi4exl9zaef0ys1wncy1lxh6ch7mn15ymkn4wfqgrkh1k43gw6puan9nqwexk7oqj0meh8p3kyjm5nzr89ee4y69zyzlps69jz708nu9ag1pjm9ewnwgmivegdxn9mbl5n4fyaahkbp8kg2ze1l6l3xkli288z97d498bfnopmkedlo0mucque3wceoli2wv2nmhj965d7fovtbodekxj7kqytzj432qwlidcs',
                parameterName: 'y1g4z5ztv7w4p887vwzjnsehnkgrs2jp9axcdjnsj9ca9bru8s3q6ta83y19i27w5a3b4ja2bh6uqb7jgd1bv14yu8g27h0lr62gsab5w5t00urt06zst4vkangtf4ca0w6luixap03ia4ovo6y49wpus75citubtigse4fj02y54p6d0p1po90vrobc6na4o8qhz7wp8svtb1mwbh4cxle3xjn8rn9mq4h2ik9d7b2b1pghl5gq0a7wf85rdypux6f4xztrd1uhm8pqlnv6xpy8suevkkxf5ztkbmnh8jy5rn70zhs0qjffenxh74qm',
                parameterValue: 'ogn08lf2k2241wlwxfdgvlpyok3vqms6fq7wftzptj5acyth999hfku6kk7e6wpld5ne04zilxcnj9p4ao44h27mb5gd7z9jl0glp7c40o0o8n70k1cc6ex0wwddlv1vad7yxz5hl1mszxa83oi9fpg9wbth7z39tb6nsss0xj4k99bgdzsw3cxxkntct9yms7btbpf8fokjrbzyvyyj6rsw5reawwuv3q7rqyp2fdofvh5t4t19bqye9rd5rltp6ireu3qcbggpgz68ksj9qbxmqpvpw9vmi9d71re6xr9lfgudckpu9p16qer5wgqqlbpksuqmhosxdcw6b59zaz0sc5wlglrgx6urklfvgvjzucoulumtxvl2oky5i9nw8bzked2ikf54x1buf5j5kvfmflujdcbqjh7n7z0xba1amir6k9u5bgc5pkfi4j9ftjm2p8g7bnqwg5tn2agkvgglakgmyy6ad9n3care9ph3k74qeh8vtifvb0rjn7vmj8s93f5oq8v96muzo09jpu1pfxjqbqbxll5ycscggv90zyp0xr6p7ds7kwz8w5uvwf525q6vsrbyzub9vgvgw50s61xr1rd0uyu6m2ls4tzea1igony90zr2kiimfx8817x9r6xkvtxafzuqqxuwrhfe9iqz0qs2c31quc199gx2k6dz05cvx1rc617gzuzc89bs17bo4wvf1kqctlqkea7pioe7enigbyujr0rrn7teru2yw7c6yuzmmg02z4hb04tgz19c80mbe140ltlk04u1hncksr7suvw6oo7s0grqdqwje7i8w01nqlr4nwp6c949887tiwz4kstm8q3hfhgepopayzu11etpwe8gar0h4dufrp0ppbasnq1s5odclzopwr0yodyfx1z2423uufnd33knrct7xyypvjt3qxvcke6ewzhgy2f5zqysd51jookhmhbvqlch7w9ied4k72jt46v71snzydpi3zvgz3qv05uncvndcokmhohi1ls8',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: '4djphlr07q86h9fn1v1g2brqlgggbqsx4nomh4btcrt9qrnekw',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '9guua06nkrtpdkcqjz2l',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'st6xbroa9jibi9lfenrtf8hrzgrbzjvfwiuojh1fpq8s6ehofsjqroxbsoweezjwic9lsa0gsq4fba4ee2tpyt9qph391e0y1jvlo1o0ua9nazyr0bh4za4wm0ucs7z5ij00p9gwvom3qyfaqrh1isg4qlwwfysf',
                channelComponent: '12l9m0kdwcmc3s11hr7924mvncgsjch24dodf7ed383byrt45kqx16uppa8gbg24jwz2z2g1qg53zudzmpatkyvamvmd101kqmyz4eoaq80n5fch9q9rx4m9ybmtazi7ngqr11dym31erujpnukzwjl5rnhnlqik',
                channelName: 'l51nyoptv22d9dvcdy20ac4zozz477883u1z3wkw2b7bhyt159hs6rokeus3vwqxglfjxqs7tgfbaob5md6eo2fo6k0iqfamwxuld1fluucgird7ipltr9qiv0hh01g25dg3o909zs04d6wm1nekju3g030tsd0k',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'ujqwqfgyk4k46siwjlgksq9ulb3gog2j3e675j93m9einksmd6gwe4avmkf79j1ekecx00kqjacpsr5xfx766q9gltc0iq7a2nkvkyh31kduz8ey22v70m9qnn7ti3ao7aldgr26ed6fxqdthppx241b435fr4ps',
                flowComponent: '3niypocv8eogejuxy024pks6y0v1f5vbnhnjnoj1cj9xte26uhzch8ny2rht8o2g82fy59yv6tsru85bbjwxhoqlfy3p18becxymkzica43ysorozzcy7cn6r55rf0uyl8mungju7hk75ld8goohst1lblv8xst0p',
                flowInterfaceName: 'oz5edwkw802ujdbjcwya8emy86233n91jfkj7tl38r4cy34c37nuhc9zxbn3k7oylaeedul1eubqxc24bjb20vhxyifma5qojz77tmwklqrt47zn3o68s4s1ii1myh9j3okr7ce0seryzker61ku7g5djily1b9z',
                flowInterfaceNamespace: 'c8e1i4s5rqdv0aosvexmuinmva3gcbr1v02ieh1aieze76p20541xkrggoi0dsdsu2w5p061dpa5u1znwg329ukio8s4kfru4bapb04yy8r5ztxwiuc4wqe78hwrn7e16tnh9qj7lnaivxtwik8u52v77d1z8doy',
                parameterGroup: '7be1hmi0hu82qffm2jt7ilmqd4j25xvu5001dip9iuj6d7728lge6wy3rediov7k38bhiicwkvyam2kme7njh7m19igkclo7uss4ksp67wy2tda5tj7iy95k0mxkebrkl4icxyw4kt74kt832aod3agl294qmduexhpqlnhkh8nbiig7pkfv6tmwmrugcbx1lfqmix3n0i9xmvztqe7bb1zw0a8x82vn9obysog6byetrdqqwq3wynee9gyk9b0',
                name: 'fve9l0gch2o3f1ps10pw5eotrcoe1fnzk6nzmgwza9ufad48orgbqz83cn8r8btsgvpksoxgzuxc4e9mlhknaqci6jsdsx2ut053wd3k4d7bmfzlam5hzzjid406gflarctjhhvj4juptrfiz5znzunsnmtkvho4mqfgvnxzm7jlkhlhxfzmze0u35402335df7gn3nyie9or8qpfzpu5n1v4p9l06ud2g74ojmxgmiafb1m4if1gi75p76uzmh7mtg5ro5memvzfeet084p7xhw3ju6zcl9wlfbgfdrgp26pgf3dmkr6ospvu8ulvpa',
                parameterName: 'cyfluonwof80n7y8jgrjfr7im24ycoz3uicxfazq52yromb5h3mfnhz8fim0ia5ot1uc5vwmmpv3jz3u3pb7p53xewp0hgbyjl09h1cnor53430h0d0pfxbfuxwhm7w4uswgolk5jrmcfex0y6idrvngpur9gjlv1gp6bakcc17bu7l9x76u7571zo9guf88mpg6dqodzth5w1itj85xdmdv7cdlsn8xcjm6mdgyb0bzhamnhafmwobyffv4ahuaj33hln9oi14my2jeoojvlpqqg2vh9e0zxpmjxi8zeay7gcxuc9arq58l2kt90zku',
                parameterValue: 'fj9wzc2zyy74l1nshq1byvdyrdab5bcsoetys9vc1uvsfxvilx5pd5epwyfhzkce82fr17u3xm6k326fr7pn59n32l3ro3qiilr416rk95qsk4eas0wtb3z0g6ryjb0tcau5rvtqvi5ebnusipscj8j4kdib1cggucyaftp433qxoddw4alpkob7mahofn2eu3r7c9vnc00y3tnlptxzjp4kje62qqurg9sy0quo2ou989lnoeq0eygjw3s5u295m0qvp23rxivmlh0fa2amtb4qke2ecnj04a62bc7yz4dourampg036p2w6wjo92owtdy75uxr0kxyoup9hf5i7oui69wkkppwq5vxs4s3shy7gtaksfg1jj062m8dqph6fx2cdstfmwc1j0wj5nbfvl0k3rfdyjiiy3xhgzzcz1vcv7rnt24eyu0019pybyleh7kp5la20rn95pkjud8ph9mp1wgd63uro4isf91cyygwiu4y1dj59ntpqj0nl8xrk2w2sycqgkx7rdcia53psgrbv7xbuue9k3pibtjd800pdceygxla4arxrc2x8ycqf1qizxrdl9an13hfwtvoq4x8k2saq4ranp8ykujxx97gbjrt4kl8a7gtx1462bd5ohkfgz8ylofdnh7hl2vttolk7h12awlozw56np7alfo5p8ruvqf6854kvp8zdbxwu9fjf97ebc3t7tgj365yyjnh6fb6xevp1q481o28sx4echk13e5j9tzosvlewe5ia8k3m5stkdqo2ymzcve4sysbjgh9zj8qjzbwxwyoifzgl17lt4ct0p06bab8wkwu48lq7u6k19qjbg9tj8r478r5x2ctgzxkw03hqce35dfl3mxxv9f1c9566acgnotd1q1q44lo1vgekfr56ht3ndh5ibp9i85gzzia9g462x41mwhxyqikddq2jb3hi4o54p5guq0vwb2mbnz97touu0bsgnatt0limd7z3n9zgucssqoz4m19hjudmcs7gnyi',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'znov9gj7agojstbuqcs56d0vd5xmhspk5c5bu0ndqvzr2ziy5t',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '2t29hgbhqfremoptlq2r',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '8nctv8owdg9u9tx4etoke099f3s5ph5v7gs3rgxbtjyheiwb271scrc9z7auaou8ajub8k3702thtblyq3i6dmn6xoju4fycxk76i9u3nb80i2io59fshgkelj8199dj0anrtb08n0sxhjezxcj7dvdnvi5gf75p',
                channelComponent: 'fqs02ebrx5j90vm4g14wcmrb8pxf24gssboei76vc3p9ol0mdven6czv1iohwot6pauq6vdgdnk2q0dopt80sryhvcr59khyk3nxzxvmton23bdj8nihj54f5nxwctrwxl25de29gmn8255n1mmkwoip21wltifb',
                channelName: 'n0kfejghbun4vo64ez1txpgbxwu246ri0bvl4lv1uur6okhojl7dm3pnkctee75ptman0rmipeu8kzxyfe94dadmvcjq0ms53f5ih05a91b7jjca3t0xvywlwmqmxbx9o9u0hehncuzxmrf3thsf2vv0v9hshtm1',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'xiacd7b7ed2wdslzenqpx142cwyre8kpvnm954cjzc1ks5murnmu7uh4lvgr7cdl2b6tng1ck46kci0dzl4nwp36gkfjqmhzc0hroce90gqyzo3ka9r8qnjhyl802wuy9uagsigwlsnn1e52v4rdfqafx2eeigy6',
                flowComponent: 'xkxzn4r72xjwrbcf0pywluld24fai7wdwwj7gjw62muzi5of3hwy44d3zvajisfr5fcq4o5fd8h1tohwvxubbsw40ba4l44bs9pzz12pi28hzyjsdr4zeyznmxt477k9osl0c409p9y4ox598fohy9jyf0n2hbwh',
                flowInterfaceName: 'iralmshvry8fe9nd6q83kpq1junjlsba4l7zvotoshvxngipx4ikspqhnpbstavolbjx62jbaoxg4bao59hfji8t5gfn8m0h424abytkbi5qod1syllltm00yf9x26w8vxeg7ocefalcatx7jbed8034c38qex3ac',
                flowInterfaceNamespace: 'jwwvugph9gf8mos9lzjrk9l7iv39vja6lp23565hrbbbbh7se7bhls25m77mtf2oex5d7lli2ddaovaqis9xfpc72unbur91ncmhr06kx69eoknjljxxxzn6fa3k5gfstyaqh9ifsg3cge0ysvc3h4hop7m6eckk',
                parameterGroup: 'xk7b6jagj568q1vi8mtxpzmiuujo2oeuk2qukrt39wdkd76p64ct4p4lf9d9c5edpr1qny87ngdy69ticbhn58jb3loidno2hc6y4nd09n8nyovb2dmrvun5z4ebjxljagoxr9lood5mq62d3il45sp9kpjdaec8unp8szloqvt9wze3zkjqlhfxvrqft2i0l84iglxps2cg03bg2zy4vhcpk933ph5o41imr51it5in90zudxe1onntb9igs63',
                name: '1jjztioelol9qp1uv8esb6dzelm3b4s1ecqokv4nxwvx1b163kku0mr00c1r4hlyuwf9e023c8n7joju3bwnttdpremssfrkm1g350s8gsnh5fgusf3jxh1qot8pfd9tb6mmxdh0qwwhkgcm1mjiq85o6eoczdye5eejbsl8g4vuny9b0om8swi8crhqwef2pw8hxn42otd40uti3k5ofkvz9207gw5y91yxc53jn6t9su6dph7pnr2xg00wtqesmn2ukdsz8brk8ons5vtx943kitsu9i15nho3rgv7jt07xf4bpfgs4rrhtnuojc7p',
                parameterName: 'ilozbsd5nafho40mmw9mmvw174gtuuseu34kf5pyjbvu2yiyjh6lg3ov074857pdp5gm6zg5oj7n4py2lg66tglm6pgy9zs4ky75jbxdphn1celv2xv23hnte21k6ewl1ujo8vg2n7w430asbucde79j6mkj10nqsx5wggl7cpy7uogyzqf5wmjr2iyvj1bn5wxqcr2p35zkstksz6t0gnpa7exjjtb1dg2z6wjcwpcw7xnaanwa6fm2urtqr42r46m9dt8qd9h5r47uq8455gyy1jnbi8y2qc8081o0op7fko5nqvfgkk52yasigqj6',
                parameterValue: 'ujlasthtxnml1z8rbf5ynz29c0tqic9b5a9y7n6y540g5gcy9zdynlnuvcklnyz5wt2i3p0vk1bw2j6pyfzevosu6ed065knfroaqu6hs2hz1ilwptmiqa5qpc3a2kf08vyzjfjbk0wsw74xlnjytlcrhzz2cyufwu9t7j85llt8fve8ynpg391bwsjtw5nu7meudckke3bab05cvr8azxn075b53nr73wrqmbjgqxa9hw7borccdx542fkb2ilcdvmykpf6g5fwhukx4x4sht5whaxcgx1l1wp0f7c8n7lx2ojsltvjl9j6oqw7mohq0mnzdky5cig8wiox7pg0wzq7gl613e5r1cfc015r9o32pghnjqa8cfudofgx87jmlf5qcgbsumec65wztlb7i3uxmxle61webz7qkvijp847jfe1bklrjvphhvz2f91qlgdxjtbwyx7tvoopfsbw6oidp8vasym5dgkbeknch4n9s4xhb4pqc5ekvztwhesm9t7ltewp57n98o7fua6jphwonra4bt1faye5yx84hjlp97wyqvow6bqshp98qo23qta8qa3xe2x80l4vnkym48eb8sc12yhhs4lyot788sp0ivry0yr3f879k0grsyyfcjmx4qq2ro8t7sl96h7d8y3ni7fpicgycpjmqchzassg4v5qp77niaz4nssm1xe6e2qmo00sb6x9ctpn4weom21b5edxpopk6lvbsxdt79gtvue7aheqklqxd78kt1jjhlrh00dcway0m2swnnre0tl9ja3zdmf99b0eqixcccbf8xfmffl2muawzifuzj0r0a6q6qdv5cabu91jxr1wi9skf7ypfm66qn13foigokfm7apuconh4nwjgjokzhpdmhdpvc64n8hvkg9butf6vtbdn3b7bht8lapxqwdc57jkk3v4kd30tr5p55pbpmtdv758kb2x967z4hc1p5brvxts0umjlinrcvyre1v19tki749st9s3zzba2gqrcsv7',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'gmuia8yoiqqolf2ysb909p0q1zj2auon8ybnz34gm0jd6sjw1x',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '5ga8x8i08ql3e9q9oxac',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'h6ce7dr276at4c4ax7eov3qplb4i1cymy8iiybnly70l5rnp0x7jkcr26vupruup8wy22hghmf18aqmql89teiy54292vt3ko133j6c3cqjduyhvhk6nbg0mxpl6lhkb9pg3d56gmhacn8nkl9zcvnqopcn1xkzp',
                channelComponent: 'f016gypik140sm4ai8fkh1avtrdpvsizzgs6gh598g6nvnrttbot9gvkvjyy41r1x739zg4lxel2dtxdl5jtcnxwle4fnddk1bdoa3vbps9flu8fu3z09hxx5osbk6hgno8z4wo0nb6cr8l86t609xcrgkf4df02',
                channelName: '5lvd5ty78msxxi4xqh7k4007bv34wr2e5xljnvwc8fpczcpyp3kvoxib4ui47y8h4snufvr86pw4gljdg56zat92a38o41atfaetqc5yi348hgxh1bg0ipuhq8rumtgwx8t881e8y41z8ajg6rr01aj4lkncu0f8',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'rjd9iu398ats9jtfug5bjwcodlsmg6jx91abgbpw334iz5tsq6q57zo42g9ug6pucys9na9hrd6gloh0fizfz1pnurb4p6thbnuuvrp1b9s4pcvbkh8czlgryz72164nrds8qoix12xs17zmi04rne377hcp3jfq',
                flowComponent: 'my8d470rrv4bj2x4vlcflpj2oecl4luvy8nufz3w25fz0qm8hr854fdk9zaxsf6sdfv7ro5qb12pm75r3pjxbeex5gulmx7ntg4tg5h4g9uhsg88vhucbyi4gvu2nddg1wrnoxdop4xu8qkiq6j2ncyge7pciyg3',
                flowInterfaceName: 'nwlq8sxyihj1t90tp2usuhax9mxbo8bayoj5u9v9kl5xlmmafux5k2sr6cdf9fio3nyl7vopud2gwe1sffig3e4yxc1ny5c2z1hzwo8vnn4e56yac72plcba0nh457fwjyamrbop23yugy9doul1i85i7or9yump',
                flowInterfaceNamespace: 'mryubjrra12r9b53idunfhab813szys3ihas2crff7vljmx8p4481ay7jrszq8ydqd86izkljdb4arwlf1j3m2jriqzy2p2kagnpdebexiegm35e44apf6j862ay52wf3lv7zkp64hctjch3zkjiredjknwu66eos',
                parameterGroup: 'n4g3rsdeg4eykweahrwqgxkwlalf3njmjxnufuqdx1lbgn294kf5x4h99wqdpon9rfxvnuu7f8s1yjt7wa59uagpwez8ijwren4bzb4m6tw2u7n4grutvxjjkjro7dca78zfxc4aecxaum18uvl6b4xg6v6uv8hkgr65yhtlsurmd1zjufxmbxukl8vj2hb4vmtls5zw2thgvew4mup1kh3flmw4xu21adxq2zdpd1qs2eptjqtyc9u5427v5g0',
                name: 'zc9518l1km4kt78shcnvj9q1406qm890swks1s9ppz2at6qn2lt1a6gjmt5bq256wo4gujp9kpl3wvc1w5167eyuqm82qt39rfked77q45pec040ld2adl2ih96dqiwnbkzvv7qf1wzkr5cocwvjl33cu52ehlwi4uj86vzyg4nmln0g7ef77h904xv1j8z81su7s9514cdvxvnv52q9ojprg4ayukknvufd79wublf7i0906ci1zqp9mm7xcck94qket7szdcalu5yow9xwufnrpkhmhzx296x33kcfomnadrmxs2qgnsftxds8to9w',
                parameterName: 'uik7zyju1nivl4ood1a5itwzmdbzoetu8do52bd6h6jixt7gqzebttpidszq1levtt7abab07dazo279p1ivku4ripr9lhar8zztdeh03ab0aqexkdy29u1gineqjpfhk5cmgsstl96ibmz76jcfbyh4zi2h4mdcf8jary8sal84x0b9acuplw2xc803wgbrbtywo1dpv9b8qupnhb3ppx6bikh524f0ehyh5sybt3x5atgyjvfbxhkiik5cjm7b904xkxttovqwzf6xkcjf49ohipnbvq7fphdavv2vtr8foy8d83hkm7v9twz2xqb6',
                parameterValue: 'cbmigoojoz03lg8qhpciapiu67svumlwrl0615mpf8rvg0kky2cbx2i8msyzy2xudg09ivplti3wmwz7tbshy34jrvwz1aukz365yer1tc3a40hijupddixa8mtfntruv1hj0jpilnb92gqafioyvagupsvb8p7ow8g6kphqct3fzxe2kuispn1or5jmnple7on5fv3kvkczt4t71mrupl8014n4ehlcwvoutuphhfvswrtjj4pzhb9gxpjgx1zmbarni5dr8fp0rkqeo174pns5f58sml5f86rraxwojhfwqqitl6t4jlj1cucw4geydvn827m2iz425wyx2o0rb2ayu9wonvxozczkst87l9x9iz7bqlbxk1fbpzzarttlahg8q8q56s46vz7z5uf3d8ydppijaszkqlcupnklctok560pp5i5j8cug69a7lfk2u4y97nk0er6x6dpn4ftmcoixmlpsqxqqy91hgrdko2j5g4meqd82umhjzx7pr3721hibxduoev4c6ilgecncjfpi5a36cwfaa9ej2ghb41c5hb77wz6xetmgdb2htpoaqfwfydxytlwvxj2wgm899r13psrhec8tqh8he2vidkbes2zuuw9qgtsx5lqa3bkk802waz98cdm462slbclck0e3yyk9d7va2xbyey09aul1u4r9p9ut2z4z1xuzr7kb2rq9oqwrz1h3urv57jiy9fwlxozedjtztnil3n85k16y40e2niwacr9oj730tymf3takckco30korb6z2gtonbjpynmbybia2lgx9gc0q3xoo4q73nk84xy788w7de9ymkooqdwk00ccivtn25uohik05lebtronqt2mjcwj9jfddylee2vd52yl6aj76meezdofewnb2swtlbupwvj263ogqasmnn57t9jkk95al136k4emyfo5azqa6r1qithnk8wo3vn8wpit2a8ckye9npjostuxqqbolrqbv0s7z43dv324to13yfod7fh0yu0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'k4vsk8z6g2gxn0ua13lwpeb8ngjyk2dflrh3hdswhyaiclwyqh',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'z6u9lu5q1ewn479vv4nm',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'y7r89drikokbjwxmlco9wzmtojfg4pvecnsf80914n9c3hxtxf5fejlprqf8tbr6avg1ytkcdwjczdmzdfup9tjxq43wpmm5iwrhrtqvdktbpmmlxsvu4ritx39uitt0jrtgfs96p0e6o8x9hlt42sichmaz2qpf',
                channelComponent: '8o3xb7k1jey5mwibcu89agzu4fecqzm78kq86a472lkdnvowjtnl4s7523a7h4bwoyza75lhxizs6zv5z9f3sp8ibxfs2jwzqk1h72e2wnaaz68m1vuwkqgconh1hdw9l8fhi3hvf5j80hyrt4i5xya3zyz55fmq',
                channelName: '372g6dfjwj31eyaktcfe6ixw93f4gdvo299tow3e6dlld0wtr0rcqgtul6p2zag0g3zsoo7msbh1peg9nrgswo8x5zsev37ey4tvdhg2gyqcbs9kf0mxgh37wrh1fp0injelf0849hrtn22pxrwyuwfakm5aihuq',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'kc2xr3tfurm49dqo8lhyy4l1r4ohnq03b4v9m8tipfehb1cpjbd8lj09pslotupwuk98x3njm35x92kw3tlaf9mf0gdkh79hbqbthc0i30inutm0f5tzpv0r4aauc4zie6lo59s17ic5zl9vn9pswxjfjtiprbbq',
                flowComponent: 'rvmamplsje4l9zfalebzo5z17eunf0rsvqu1plthkdlq0cllmtrkhay9kgvdfo6w8fb384a82cewg5ek5ba7l39f15sm4h943mcc2znef4kr0hxkx1owvimu8nbfeyp1iwwwrzj1qvq6o66kkbvmnd7rjtk8b0dg',
                flowInterfaceName: 'qds3zambrk3wmc848oc66owwylnxlnzq9stp9hnhx8tlumzahrkw93fjsm6wh8rtzugdppqhffukk407csjyt2sn02m6ud38efem87e1mm9s71qdhuc9uo0413o8l693hisflzbmywvddb4sli2ory5otpuhnv8d',
                flowInterfaceNamespace: 'zvf0x7dp0wr39aiuoyb9peqokdb4fzsauyy8gj7epvw0xd76v1zerky8ls1q6qn0luin1wwgxa4s67wrqzt8k16bbpcggsc2dbnuhxno1q6vlazsnp26jcwivg8zi4igcp0yflna5s2el96fbtpdvb8m0rvg9dlv',
                parameterGroup: 'zu0rji6iaenuty58l1d9zmpxguugku5eov3wngw2f2rbjm3p18vlvgu07qropbs7ukyv4f4d0b0rm6z4wwgaf091sifi4gjzcd82ljd0lke3us71sh9cisva3hxi04g6fdml1tyowt0f1qguirexpgf5wjmnu1oihjwz7zznq1ra3qancitzzrptft29kkiarwe1lhb9a347iyuus8541i2in7qeghrmx3rnecone9mlhwz8ge5k2l6oyaaomvch',
                name: 'nj2aargbr9lls5p0y6nvhlo6s8fakhpf7c274ihjofa3zhtcj1yqq0g8u7v0hg80zy33096q799sp7j3dyv93czxdf4p7x79132mcgkvxbxpsyb0xd1u28y957rznoc7dr53tzrxp8gndzbo1ay4nidduf0hal9ma0gdxtmanfqw5dylctub06od62y1q336gclpu9uz4987ent9zgk2kq3j2rr5d8e2zi63sblio51qra1j3sxcs3nzqqmellefa7lq92h03nm63aad8lriuqrj4a6q9pmpkkvvzedtyrl0j84uwm9qyk21b0264bym',
                parameterName: 'mry29omayery3oegewj6e3jt8d8w6y1i0ubrwiggop61u4k3w5w4b3h3kmtpbze5rf1qt6g5sehumpi0j5yvqdjuyfsz9ttxvq3i26zu0rx3ugm0ayl456odfk0syhwow9nkethah519wpi4e8fbdmtkyflqhhdoafa2jpneb5d95qusu6oo2vibowp73772n03tw9e138tgj6pxf06g8qk4mvw3jh97qnvqtb18xh6kowfw0q2higs3h6uqxr76a8na2rxalkdt0ghh2elcnz7tu971u92axtwjsdcuvsofxji19q01zoc61azuhdbp',
                parameterValue: '8zvb5galdxjoy92jxzlpg1pyhqrvyktxjas6mzinpbn1keiuax2u9v1zk4y5t1ik1sf6gtfejaxkk5o2o30i6jz5dngtv1yhsa5rcl9muujvms66dor48ts0rsv3sh09nn1b48975qj8hk26ljry3ryswy06to2d6rgs2vjiyy240qvrhpc491n8ymae4cdpen476x37msr50hcre90gehc08mz9usg1t7opqwwjhcku1d07wcb600v08oyhh2851bu8dzkimn2fvrxnsh33y6uplop5xb30gkzkq9zwc0sqbbwgzgo8re1v3e1jhooiub1t0qp6ahs3n81pp6jit64c8x87tj8e26k7tu6509meevxyfsoaowoyuo2o6gj3xyv46ey2dl294hdk8z3knyvbuqnmaxhdhsndr6dt2000k4yksqezx0xluf9mkw3uc7pqq3b4phfzqlg3asay2nl17d22nrjochk4spyo927w8betzoumvi3k0ma6khjy6v41gt0vwl2stxogoda8q8bmxrub2i691s7p5s6xnx91e78zo8uumqckoc0c111tpa97a6i7y2pmij4k6rx0v13vzdycli7jodl0efdnidj4ykpphk4cra3labbj7p3z5w6p1yiqk56ji7pul7c6vo5uvqmbmzaxx30vvxmk7mytdfr9mll31pp2cel7slksub8exgx7szarir1c9jv9n62ad6vjd0whxzwhpl53sa7lzj9zmnw9rd6i0aqw4m88oz7y2sms0x1ujvwsfhzmmk2bpg1d4z08r1fly65h4iv8ncmr1g72an39ogqmnjhhsdstsnnng3z0i3ku0rfs52begopv2zd6uzsttpnkacqwgck181a8eqywwh2qfbn4g9s8sdx1u7fhwz6502sg4a18hhdiy98u079zlrukjcd821or7m9u90sr8p1hz7bayqorl2yb1ffdy8xv6ykmarh9wlbw4uuxe0abio1l1w4f9lwoea2v4gvzfz080e3k',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'wozbxy0k3og3ispq8wvyizvjm1052ecdiku1u4y8q9gaieq6w5',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'veg1tyf3togwekp2rjns',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '19pij2fd0464ny3xwlh2e5uwxw8a6mhedc7w8mgjoyrjyey4hafd375qk6kmheb9oxws0ejsp45js63ubtrm412cbpqpebs49cl3oen0ydbz0nee8l765dir3anod4modnr6vrk5pvuimh0bv05yzoo8191ylcsw',
                channelComponent: 'r081ygpugxljj0q1fwrqugap8kq83pgjcsui4ibznafu5ejk4z2aqtaqhc24ay0qc8np22uq19kmttic1vyn5qrrbwa8xt2akq6km00wehzbm9a47kvzrno5aav66mzy5n8gxoneh7tnzmspdraohs0yj4veff51',
                channelName: '4ez3xfceza2dfmvvzrni8g8fiqqr09ja1g6vt30rbntvc7w61wc2zv79wu4b9lfgrzemkndi62y1tmpvthpxeudo8favctl3292z0mn1eu9460tywnp8ncnraud759bc76wuqogr015tatygzwof27796bjb93ma',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '47rxpg09a1lg2lfnp9dbor312tx8j8q26zaupv3bqax1v5zlrr3qtr1kllqme6359h2zi0edka6oxf10zz2hdf3mv7rp2pv9e5fnwtk58ar4w1dai1e9ehm0ob9ue81feluidsgja1vukty016vqdrasr3tjepoi',
                flowComponent: 'gxemq6o7udo6svb4bvcxb14e3dmbzbog8lrgz91lbya04m95gq40n7k0xp13kcmbbm9p2qcuruxf4lc4w3kzqc043auajsei5s1b0f6lh4jum3htsznd35c7h409h64shcspj6d0wfnugy45nhuro6x7dwaluoob',
                flowInterfaceName: '5q8cl05448q62mp387ypi6rbercvvzu33p7jm8sfqo2dlw5qp8ap3tyh2zarp35orp0c3v65mkpd9lit6tfzj3symw3f999xqqt56ryc17r0qzkw005hj0i73iko0wdvno4e7ojv2bwy6cqcojnbydqyccnpxhk2',
                flowInterfaceNamespace: 'tb4ep8st4z2xodba7y7u02mugnlc2xwc7kexoyxdrksytup28asiwmi3yit99s5grg32k3nbzr68dk3r3gwftt7cmxl6daq55vmb3v0ds5uosq65knefmhh0zdqskyg71v01dce5iugkaihfdatnqo8wi218n8xj',
                parameterGroup: 'gbw0b76zoaawdmh58jygo12rxszua8yqh60m08uwam8k4qw360wim7inkgzwchlrsuzwvpm83ldn62fvj80yplxz8ttaiqdf2z9yxkg90ci06huv9fy8hu5dnppchzoytanwlnpzrecat83eer1ra2jxuo123a66wd68qpwxm5gxf6idflbrfzsp70d4j5kiifp91ux3ni9dkbz2cmaoayl5ae9pr5wpahuw46l5aq8oc2ua4i12p457ii4d0co',
                name: 'ery8h67qd5l3cryxyftz6m7dwhfi8gaatz8xv1qc721zy4a0p1r69iogd4knf1m1vufmrip2psf57mcxsleq0dl9hfdv5ha9v8p1qn7wn4m22wwz89i8mbkgk5lel1obqj3ar8wq0cly9nc3r19pfhu9hsinwaytusu7h9dyj4zvov0z5plqsux1hmdi30e270cya2h2gdjmqi8cpvi9g6ded24uig5y1atzu72d3brmnywta997v34incjnjg3v60lrgkthoisgdyb6to0szxvx1b6oohqptycaugb05dxejij5t2kryc027ojfbwyl4',
                parameterName: 'oh18oajnow6z4f8qmglulorls4de0ezbd745xohqpvnte5u1i0694wxgzpszuqzoawoortx81l3ho1b4tx8vqudt47z3iak5hjnmryxkafq5s31nx0m5kjpx7lhnpv15i3jbd1ay8j8l5xmc701737kxl5unwyiqya6p4ws3axp3uupgcdna3gak5cbld1cxt27n3l92slqrkz7vv8y552wrwh176ovpy7i7jhgsg9yq58tn72ky7uwmhiywltumi4bskhluklhvoyatzn3d81e01fmbvvhvq06o0hagi46gj7hht985ib16kkz5vq8k',
                parameterValue: 'if4lqefwmj9xugoszwshbko44fc5uqxcykt9udx797ki0zzgi4a9ad1b4mndzaqx3rx42rqn31am5tmlt6sp1xggc47tcf6r3caph1rm9hjwu8hk3x5lhg2iezn1mcoaoao5mt23zjcqct1o2mlbuxjll4dt2xg7tge59r8kywru55u955ss7jhvhpg76qwr4e3wanvpw9gn922sguxv64g8nmg2w3uipgj2adw6np688vj7s7dubnawqmm8zxecjqtixdgtq0m9ft2llpsgnve4i2f3c81zdn5r074klgi07wfu5sonq1uynuae6bt8268ipya42g7ixd2uxwatzrg653d8dl8mz6sl2epvqxr354uh1w51bk8fnppqtq5ldpoqkmu68z0dznkr800zo188y7dpw2xe8dly5vrpb6kdfkvsngo7kmk0n1opwyqqrmxxuhnu963dy24h47w9yrchl1buc1x8u1gslp7enfqnp294xe6m2xintn89itprk26p7853gzsn3yblynajt5eos8n4enmfuf6f4mrmznmx9kbs649slrujrviq75jkzrwykmbh3uwpu1ca59fmpp2sgpixb0a2uvqup54twfqw68b3eu4iqd9bibgajdhtvfb9oel9e9j34zpi1ef2fp86l03u20xim5lwmdbrh18h7jfequ91s13o4wup1c4170ofb681qbri4ylhzai5uzvxptlmfp6xfcxijn9jgufna9p7kif4mrrtc0kypo7j2wcxybt1macltp85sxmob88vbezb791mlejsj8mgeujvn29x9xu1xg4p3dw455wjhh87bd4rqi1ykzqv0t8me2i7kri6b6axs2owd6ujauz6qdlidk3k4716jjjfk09vjwq3on676y47jvfcv4sujhd0ou70utgq1wug5kw2npgmmxlg15ot2toy5bleycyvr3if1fu2owbuov499m7hp10gq9xczsxc4hbkb5ptccn5nd81l3e358w1hfbznt4r',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'rjeubtw4c5diivd7mraic3mjubrgphi04vayqycxhc2d48wbaq',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'khfswnppowfhej92qtr0',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '3m3bb484j4il9zkuupj87ppghap187wst3b1mxa69kxee503f7xje9r4q95wvx7qhem23w0uo249ceri8be4dtl3v0dcjisf5i4e8eaj71anaeop3w92a6zlqxz1l3dkv8vg0ryfg25eadhuqyidaeaaikrla4j8',
                channelComponent: 'f95jm0q2d32zd669yroqjl9vyigaumj5yaxw8ong9wnnpk5tjjq1k7ccbiuoy09xxnl3lvqweyvbt4bwbu5lg333wl9k7w6ag6l3jnhojpph8nkzhr1b5iibhwlf7myu9pzme4om5bdf0x3h8g5cl9sztecosoxk',
                channelName: 'qw0nb0mxfmqpobd2bkze9go4vgvc0d6s42ab0dboq98kknb4ojsl6ecbgof2ie3kre3hvn99mplb0mxau6lr0hq5kdqpftljwl6ptgczzwaktoxjslzxveo1f186a3dlx3jmvdts704kgc4jipaolkzl7c5n3a1o',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '1xxrjs57wnzcp41ukmucbwz6y68yq0m5sk88r87y0r5h4lbfqyyee1y04ng85nq4vr9gfxsds32brjy0q0ur8di1l2dratn6xli3vokubdf91g7movatm1f4pspvyl8y9mlwjopk0ur80i9je5nxnhw800vps69d',
                flowComponent: 'eckzn91s2n152wpdthntza021pn7iutf0afs4fmvqfg7f81ngozstr1e0t27timcpeun0iquicery5s7sl4fmpbbutet34i3pnenv7uyi9kdypibvc7nymggfv72f31qupzy13oed5jgxjzj1byo71q526mzuj3l',
                flowInterfaceName: 'ptpd6wy1o9ma6xzkt51mh3y7lpzuvmzwo77r4ogd9xm8puselln1wmba66kh7mf11bj95nvwdg5u01v9cts3482zea07urg34cqi1arp6haytocsmcs0nokohn0l9bxrye1nldcp3z248jlsxw6op1qpt59aifej',
                flowInterfaceNamespace: 'p5wmvznavo2gcm8ljqi9qeambbseyvimzsz1nf8x3t2d8e6n6ylb3ls2bp7nphnuty1at11ip92f9bq72gdvgj0rgefkdx0f6664jtfppcf5hvw4ijclncy92w6po9dzs93yq8r6mdefm8f29nvfkiqboesfhr3m',
                parameterGroup: '1f7bkubpcpogwixb8pr395tdgvnpti5b9cifyjw39s7nj4l9kamwbxij0tqmbz7fbzcos6qqpm7jgi90088wpt9sc46ajre5mve0ei0nuijtfbj480j4bh7s3se0w8s7x3c0kmfhb7wrl10vta93q15gs81lfks12021rso20lz6dsdqdotxsff48wjlmmc4152ak7qd5u5xe9iw3xtn0r78gg1vlsgldlgxl9vltru3q1r7661ncsdurvhp2tl',
                name: 'phmok32znws3rga53f0m1q838m2xfykiob8amf4zyfpaob5j2jiimu2s72cej2xvmi8cgy0h2b9wkr23byh9vhhhg07t6s9uor8le38lfs103apfgsm0209laurqg88605d4pheu8w3ig5wp3rvmvdfeojhf3nlnwcrj0tr4esznr9lvi01b7i6qmv2voywplaxaua2l10nqfpf97x1y3b414o969nrb963oypcw49c5hf1tivyz2nr3p2d4vw7qget3obz0624k1p51x60xlfv99ujbf1igoh36vytqh87yjaymb378le4ktdzpsxwb',
                parameterName: 'ofx0g2pab4xxcrtt5h5iui6d8eyoue4e4abronlpd76c4allk1sveuum75wemjhl6yceukmkt2rw58k47797jhvo6jgtn4nk475gmavwt5cdq9oh3zhoj06f983ad4b52aauzzouvqtorbnfc255uqbu0lrfq2xh4brq2bsn4ggxymodv3v4j28z3s63nu0yu45f4yunowmgviz7oe4wuo1rh9of5sn9hfp4ikbeh2khyzks9ff67y64d7rmxvv7oei5foi3pi688q0yby8xtwygrayy2wn78dmv9og4onbvkga2q7tnf82abqg9bkkfo',
                parameterValue: '5m838nf9owai5nmgt5gye4mhz1cytyesmfgqug16l6ki7iiudjdvap4dkq0pluhreul9n9n9bt4m0vokk0oywmmq1q8ovn0020nxt394fg20hzc4dn8au7fh3vuez4ryl1rfluj4kn80b5qn8tqhczzw4zt8z66ode4szjv7f4z3ly134w0dsbl4bb74phiqhpr4v9vy0f84gzemjoj4sotal3ch2gy4dm17zpml25wf12lv1u3xcb7bfhhk2viadccnikf6gsip0848zytn2hwog8vvzarcpjlbhgnrgwjnumcry8ub8koxuhulfyl9v962l6xx54awbg64xt4uvajhtf5yh4re39o6o46txgpgzpilagumdrn84s7ia9b7b4mb92w7jz6n9q62k9ii80h0p784y1491t7tc5rvrzg4q868ap4ljtsc1jxu82pcl7jaa2jn4ljvn3r6vwq4uxdhjyl9aowcp82hx3e5eo34f5fafsbrq1gymf253wrcaenpf5vy7h0gv13be9ysxkrauk0zw0bry7pjulh3a5en60nz8f52l35w0u8vbc0l1a181z40bkpfk4lc7le3l2ny50yiiqkpmbz6ujgd5mry1cw2y8i2isxuxf9auff8jisjismo7a571vme16566bffqcgheprnx1icdey7qlu3jj23c8ng8z9gmccyxhdaizspwcy3th2591c5a1j3djbf9ibqj8d0t5qvlhjp23udtu91bgaq904bctjjkx7nomsh6jtpq8rotsm2qaonzzu5eyqz95utu1hnyld8sv7az5lu5ja9if57ousxz00xyf1eznpzwbpflcvaaz05g0lvkedtqwawkkwuq1bft8cu3pog4shp2269b42e4w6cx2dcujaoi68zey2h3mdeeam1jpwtb3ydnvr073my6y2jlpgkbu0o1jsggudjmq7j7prg2ofx9vvga3mabzlpgbb4nou1p5sxfeexx7t78ruk07d9fo9qc6vr3m2sz0tl',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 't9dhwv5bxa305pk02crs3awxyrmic1zvt6tkswab0hks1xdq1w',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'kgwtgiyr5uqiyfjsinom',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: '1k0p05pj763zvfilxjlokij60qqiqpqcxj3klyw3iq0vomdh0wmyebsi6engc6t03v3t596d0f9akfudnk9s8qjcoxnihenfy1npskrebhoz08zj9vwsy7kmuil2yec3k3gcdg4ifg8xdzn10e5tiap0m9uwcu3s',
                channelComponent: 'j5xsghvr4bs5liou90nk8rwrx8n1ue1q5d0hztx03snkbarkrp0brgxz5ax7eli6jyletilt71qjuwsi7221vygr14ktrdq6lx17rl4suovjn1tt3pb9c9f60xa9qc9nhh7zguypa40w9264vmzpyd20980nobwj',
                channelName: '36589ppvh2tiem3bq4mul0sgnb6x99idfj7igyzymlw7lrteqyrcedaqsuqmymfyjixfns9hqntk35af2s5d77zpq8vq90vleayc6tpb857o5nk7wc6uo0mtu3kqf7ff07ctfvwjon4b634iievtrd01oxntyqhp',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: '6jmm3afhsehzw34zbcutfys9feav24nmccq7jk41ouz3jxmlcxp53csqvecy1ozl9xy8zj4swpqlk2mv6lnf17w0sj5907jcf3ezalvrn5179rryxdp3g54iltmmgnfq5w4o36z52hiizlftt8bgtpf6oxfnicx5',
                flowComponent: 'e7e8caqmyz3hk4u5a8zlva9opmhtm78cmsi3evvjyhr40epqrmrxni58ifrkxdiw0e7ohozbmamzl0k7eaw4swrhb436frxiu7hj2r79gqbatnw7yhz1f88wsbpdm5s3sx5jnjv2sv0y8shhy1s5gbm4586j1mrf',
                flowInterfaceName: 'ormu8pj7gd11sedi2vz53bvapx2w3uiuw3zuj96z97ujhjk9jqtjo9lq1jdm71ny1efnsupdgyguslok6wd8ewfwxdc33k1mhy9ashrebjukd6gvdrjltpazqpr6nc2msrnxkycb8c02azbkuuaklc75mhnf3vu0',
                flowInterfaceNamespace: '1758g798wk51a1mv9cbsvbiel8n5dycob8cvrkleommf4hcindpymix16jtbp91fcm2f4mb7s6fxmxegvdkkia3aaki7rx0bvfdv0uxpvkvlogwkx5on579fl6vsnulun9i97eqett4eghbcujrn9b0y5z3wssmb',
                parameterGroup: 'uk28esytkgz6pvi2269hye8xccn4g3r132ljvcekz0dr75uods6w3scq4ri36feadjq6v7jutjw31oa95v88s134g9jdgjzi2t1535bula8y6no0u2jdzq38gp6njqij045wgxya8c9ujog6zgr0rx0maqoz2t4nw40dl5nnj7t6d6zljkqu6w4fdofi7mb9x53e2ou12slg92hhdg6ti16x9rb4391culoyin1fple16rw3831661py63fz4fj',
                name: 'vq50lstau7vwyaa4dh2ulxnr54ja8vt9rpqqpgkjq60bttsx709alxw4xjms90t23wlbdbeezcpqsvf049sdskpgo8w2ru63nro5mbu2rka1vxvgf3kcjmgt69mo6v3qm60t2vte35of3su22zvjeu1rfhvszxjtxdauzv0iqbrmrdfpy3qakdnkdyt59i1uu1ydupwych1vg90pmya7p6kmjxo9t7kzhab24bneqtpr4bhn6kyidkisq9pofnbwiuwsbdruv7775frrdqj8ets9jefc1wp0eeq93159chobjlbe4tqb1gmm5rhyxpnf',
                parameterName: '5fpomgy3pjf3fe1vml7p7wcz2keyz8a9spn8k40glmw2ub1rkkyhj6hlkheps5rhwo5tof7g48aeq16tgks611yqgf2b4d3fxdrkw7y4i5l9nvqlfvkr1l8ckwswg9maik6aqcv61exys8oy2oudj5txgtmapepw5hegtn1vo4kclcfwv4zivaduh2yws7ebzwhj827acctyll2phcuu5tc9r7e5ft24cbep4ba7n1b6z9h1klwqjfnuoj5osr4m4u4i3c2hisjimp5u9y52g3cgrjzdncivbmpwg2owq4tf1xuw093kul4peakimljp',
                parameterValue: 'tfqsmg7kgrzdui06of0bkdqdkbp65uozzyltpk2w2hb8ia2fp9z23c6kgm7okmtbdmsqn3lz937czgkye24h99v9sm19qj76fnu4mywtfhi2j0mso4nbfgywzwqs2jhxw3tzzs6h26stnnnqhm0i16n05veuv75d23qvcgu5pll98lea4osrhq22fftpg2jfqnpxx5uaabgrn3ef2v5ltuupomesybxnear26kng7vvbnu8vxrvlwbzwq88ey4mduchv35ac3eofp87sosii39tgh08wzodurldbspt90ea1eneo9rt1jdzsxm4zbxhhldnotuoopj5dnhft5p8f74aajaprszc0mzyoa43yk2rdyrwvym45r854445dxb9l1gbc7z6cj67ei27l0txjm0xzbmiupvobyfp7mldf3g0syu51js4en4gj5x704ym50okl2af8cp7iushs89ehphcx0c5dba4b2rgy4rh8fcdylvpvgqxgf1qymmjp168xz8kt0rsnujmk0ys0wxg5kxup82myyatz3tx00n883seeri8qbzg18dmt5mhprht9n37gnnpi8u226frncjd6k0xwc3fc80davefqjr4h8i83090yrrvb3a2165z6gw9opc7poej7h09scfhc2uq34njae8wagyxnloc9o4czmf196fd84qt6m93fhtkhpktzer4d6b9mckblmztfvmofj1m0ahc77e0ijhwh2polj09b1dxack91xh45bh2wa7aty6y8gw9v9rvmg0jt10yju1xozfi9oxvn34etudr2uq36ic71uj17onxti7ry0nq2dha0f5zywus7va44um81nqs8srv2dl8idxw5cu80ikwk7t4e62s9wghywafoy4a1v8zabddqqvmvpivm7faccn4y6xlfr1l243rc108fzgcxkwdhphhkim7fepj3ivnjcs2ii9l59lddf69u0158danb0v8ly6z7d2v9ftg1gqxsg1qqyfwcrnx5ykx729iqa',
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
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'ads3qxw175dayl2ot9i10spd0j34vtm2vcn5q2k8b6o3a3uybf',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: '0y5i9fscu8ozvgd7sybe',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'sr3mjvbtlhcc4z9jsckjvpu3mbhjhbz4lbx1uxvgextx80pfmzr7yuez109tnk8be2yjh9ueqnlrgyo8n4k888wsmccoylhtk14k9z9qdhcdahzy4uhkmltg3p3gbinnf3ch6ci5ysj84i0t1o548xg9vesfq33c',
                channelComponent: 'rj1c1zr2jkgp1758mr6mumt0a1mlyub6odf9m0ylh344rhyywx5byft8qrb5iszcm8yo8aurrtfsvrcjl0pe0m78q2ypmr89hz6njoh0l4zagaib9f4xk8ktwlonlx07uylhtjd54jx9j12ex859czapq7fap7mw',
                channelName: 'r5d3om2ov797ydvfazgpma8vo5qkxajpn1x80hsrqe783jxasxusihfh30llnu1n8uqlgopfycp9dem76jij5eaallzm3s0aq24j6iwwzfgyxzfcy7utfgvpgkt2z0yhz4e4t7eomieedke2p51dlqe41te0zul6',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'f8syb8v1204xsz6iiqzmjiv12rp8chzsszq00olsjh3m6nm6jxsbjbmtppmvlyxswdtu0rzw51vvmwi75o99xh52pl8vo5floclos7e6xcl8jbw6kdacck762xf8uavletfe5tqcwnutuasjsj8pess4ddhzq8qm',
                flowComponent: 'sxtejuouzour2u8k3ykcq2bjrtaa8vagjvaxso50kup2v9zk8gsont7n5d3fe8k9pflk2ch9jusw8m8pe4nmcnxy6q85b6qjeu383t4rdwphw8i5nk4sgfdaerilf5yojp1sitzxxta64bn82sino97rozg0c5yv',
                flowInterfaceName: 'nus6f1z9xive938bw9fxg9sobl00h0v72rkkxey1g2mlixh6nbvgstvnzpu5t5a8guz3vtuov53pz8unng4j53b2xjuuesup34g0cybmbj6p21d533bkf3w9fxghxmu8ygxqfi344tvptj1nhaq49gwfips0jjfa',
                flowInterfaceNamespace: '82mn3nhcsd8o7h5081b6idkoeioqakptimwrj4q2ddrtnni4pl7gphzlv03zw4aigwp0c2iga9w4k4gkhezyaazk7smx8morn2s2yg1g8z5pquianhqbpjvu0nlrp6f3fwb5hbo7zusqzkbdiyzvwnjygt0k97f2',
                parameterGroup: '52rqgtc4df5qadb8trpkrqpn4wmjdmqgg94naft1apj8tlyvqaafoeg7cdcmxcov9kb2nemipz4sxcwyw9hec5qrvoywjnbc4p40tpb6l9woi0hkxvuhhhpk4m9otbhypztcymkbejodgnorbh4lv9oiymnuvequbr3saf1uiu002u9qoj38oo0uuckce87x721w3q1jxih7z9hn7bmbe6w51gqhx4uo9h3xfrof1yxd99j0wl2y4x2n78nms4o',
                name: 'nqo4bom3gyc4t4yxnjbd7jt3c17k5q691kn4jy2t7a4074z6mlym6d9ubkejdxqz8te7uw4fdiwgnk8p8qexj5z4boqm4y3abr71nuq39gev4ypcelpst8pjkpo8eiyqpyo1zqzssaplmwkbxu9rcji5eptvelzbt8mycacij0s2zx85no3188jh4skxuhet41me3o7i8fxh2zcj9j8l1i6hq5onll94n9yjvw1ji67ie8ur5d4goyqco391zvajq0v6v4ohs7g2xhuee9yxgos2k7mlq08ksmefpwqwz9v44o3hjlhm30y3wqq51byr',
                parameterName: '320as7f23b57inwpqu83ztkczz512qlrzxdkygtzrauahnnr68ystglf0tx75qbibrctoryu04jtxv16mfot7uqlju4pzf8xzb0v6oyvqf2led0zvxn2294e4kgybltd3agu9adfg3nluzw613ks4q35s7umno2qrt364wykb5mcipahnln15iaum6j9qnwpe83aics9dqkdq59ck42b8thu08bd52534aau635aeqwd00jevxt3wzyhaajf2yyptqkc1pyrnyi4nf07o8ohcvma3he3gz5bx4vsm64y78isp56mheik26kolp4jrybe',
                parameterValue: 'c9kyoyzd5zyot05283qpgmni0fmuu5knkfmaoh8f9v8recm846sahgwxzn8a79znj8dt21a7rn185xpj6c0jm3s5g2izjiz7pq64q2r5lqpqvlpumcjr6r9ezxpypfemb20f8r5bp2neigtx3fpznzipiks1gntw1j1dqzwyflnfnzrgvkk3zv79w1dblfhoropk9cr602xqbmw8rimkgfptt9kz6ebeocdrbp2z5pc3nm5hpy1cm4nup7k9opo9j4tcd759bg2300my3248eixlu6t5qzpsfeqos2hdywmxwn5qggz90sxc7ispe1dgy5uibepk0z93kcth6piz1jrd2g0b03jiph843paxuwy9ckcm51tjd6tggauzdt5p9x4io8xhxvnurwfrbic1i8df2w0tav40578smshpkblx9rhu3k8kcoffzo0ao8vtfhbwxv0bdbm8yeu52b80i521jl965mhe9o361ruaoqr1w3fb0hgtpz2tgrn3iks4vtd6pvatc8jdxivu1s9ktik00y7nfn64d4q490diw15w8vbd688h4mqtbuydd6icfzuv6csudhegi31z4vlsu9ny82xmylh8gdv29woh3foac9dqkny9rk5iix2zj5tq1ikh2cycvtae0gqg52yp9mgkd4g7qfq991iy4r20osomykokgpxczl4npp9nqiam7mh1fh61nibk13mw3tlv1pi4gbxxvpmdkapjpvdz0lsyehl4rupvpgflnrtu01bg9zm32gthf9vrsfy0dpty1vlpm9u96mgeh46mbisrdd5vqoh8uvzl3kxugayyccqqer2619mefdglp45hxo270nq1tr1729b5i1ec0qzunmbtkabkfpcn2j560g8jasqmliapz33ryf9d393hae9ruaeertpy0in38vdz34wzp4y44vos8xufofu3i4gmg6fxtvpeom3vxt6mo83bdp6br5orboqwandziset7adoctq266p1r5g16piyn1kuar9o',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf'));
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
                
                id: '8aaf82ba-98ef-43d4-8208-7d296f65e227',
                tenantId: '837fc1fb-15eb-4a00-8434-cec712d1e99d',
                tenantCode: '5e2t26unddejdnq77q6q5sh3v9gmse2tr7zui6ywbqgrebcpde',
                systemId: 'c214881e-6eb5-432a-8bd1-d46165ddc6f4',
                systemName: 'm7setlkwjwo8imh6ddfw',
                channelId: 'fff9698e-a3f9-4bee-b5ef-2cb5075305bf',
                channelParty: 'q5cqacqjwfa5c4wkqjphsqduxap4bbnfcb15bk3u25n9eo4w99tjdpq2ahv3wrwhcovq4cnyzs0wguajbggg2rvxwzi3jooywp4g55o40w7tv5jzx380l454oqerbpav3fgp2sxtwsinr00wthfcjl41vjwx12ew',
                channelComponent: 'uomm7u27mgyebiw6m3dh81lx5cfpv0nkp0suqoxb5tomjawxfae8l6t0koac7e7ttna8b04qfycn2t9zzst4hwx74l2xp7pfw90ilg31zpd1upjvwgmmfi23jx7evfcfzej4kraq8skrx9a8iq8c0wu3dra8mb74',
                channelName: 'j5g322k8npwz0uduicmr33c1tk6yoyg99ncixvm9v84oplttk14g5g7a4zoi0wpug4jwhbncqhk54gex92s0sk0srzsyfwa7hbx0ystu664zidywvu6i1ri0da2j5zkcm7v1vle5a5gz47m16zaau547wucpyksi',
                flowId: '03e297f3-6791-4632-9dcb-b97d4db7a73c',
                flowParty: 'u15dtgrptj7eywirtoi59g0v6ezetj83m43rskraobpgnhr2lrz66plc5syngrjmahukbn7mc0cl6abixq4qdp1oa7g0pjqa7x3m4uiaig7shffnh9t7gs25878nw31o9a2vixdbu9fw4t26nqv56zzomctunuil',
                flowComponent: 'ulwtyt8fctg3d0apfizugot13dpojtg4nzy5rxgswrzrg21f0veojzhb5g8ap3fkfvsqk1tqa7raw6q9rrv7ayfn93bxitybcfdmxxhgc0m10wicmug8tphkks6jbx0yreea1uzxtnsb15a5pkss4zpmtxw5s33o',
                flowInterfaceName: 'w7fnliw92y414y6ixpaii6xy4t5ltk9y8jufp4usfnd4mmbxn674ltm83ovg3199t8gm8ju6hlf2rswez375zilz5evdb0o8gzda5pa2ukub3m40jacgdub4nf63z9qd7zu5zkqaagaajiq9tzcw66wr1zk18rcu',
                flowInterfaceNamespace: 'whj5hiwc5of4z156rbs5l6blknh9ark9pj9ubhikvc1nmeprv8mw7m5rwxt93hnas3apl4x38lui2v8rp6qnahqvf3ul221qv9n4akt5y0rlbyrxnyh98vhtzokxw1cm21ocwuvc5651tsjt2qjdg2frvoxc9lqv',
                parameterGroup: '85jhft63nufr72xf0exl0y5tzzgn3g7d6kw3qr9zkm22zk6ftdp2l4w61z2z3mdia6eml2m4w84gcnsy6o8n9ctk17dmwweihfgmyzxh90fs3tuysrxeotpphfiv79z2m1dds3l4dq7t4vnv920xdd2xkn3ziuedpcakc6ngk0q6w3542o9v3l7b2pwrozn7ss4scnnoe6d1jykoxdflrvspai93x8wmp9krf0461hdjnuvrr4t90ko052f9tuf',
                name: 'j9x15yc96679rmuffunpx6h0pee5rhidpjt600byn3ewh8uik5lmfbfmq5r8w3y481cgwulirn0d53og3tj0913x30fyyvwic5aoes70tqw68f4srd7ildgozauuvzc5tg6vpvzt8kl33mmb31i6bjzuhfg1kjf20n5zsvgko8rw0vrc8j5dnr8zq3j8684kwkrowhnjztuttyq66utt9jzo5plc657xzvus4zk0u2k1s7kcf6id7281a8ohsmz8cnhal1ccpqxji5b1mzo41fj3a6fl0xrcty1p310t0kt4240xitbd3n5ftuv8f5h7',
                parameterName: 'dgy7c9xdhfx3hbtjzmxrqhjcq7sofaoddh8hp7ahzjzclvk5375tnu4yew1lldq374peoikroeobu8grsv0ozmy4cze799x3ca5ae0w1t9x4hl078m89jtgxeh71nl1xnr0drz2o5frv5b3r73kvd768tsjgqawxlzheo6uokbor6ysekfg2brbi4jrtrku1r6wivlgjrhrnngvas2hrb4qe1m4034b4zcsk0js2dzyfpe62ykohe0b2j6vqhi8hcl6xzc23144zhx9fzjiwz824cne6jfnazp3io94h25upv8aui711j4jff6w14pm1',
                parameterValue: '7a0rpzmyzw0k6iwij84iycrnf3lrennkjps9ydeqlm8qlnnae1xe5t25e6gm6kirr7u1w53jm5kdruz5ln5rxt942gjtfr6f915icsw32vz84nhth668l9d4d08ots704f52yocr1e8xtx7vgsc4ruulcj5iuq9vttforykiv3yi8zit75m1smohwn7yo5ten9nqbem8qn94ffgnfqu3flsd1pd5htiogxoc7pf9l7v3u746pxpt46ec5op8xtfyzl54gw9vej8kzosq622cxjgrloh3z6mjpa1fzi26wx85hn8iwtzuljksei715l0zf7zqg98qzij7dm1zx77wkiqn8f0pu54utsjlt8vbm2mfczionq174q7gi1vhpj11hokqh36kzr8jc89zvc1gpfg7snhdlotgweyoeafelj2hdxsipcce6rrofus1z8fjtv73t6o1tzh5pubqomobmovkv01oeyhm8057klajlof2kiwnunddyg0soqnjhbeyn5vuakjj2oypn6mctk8nl7coygr93kuy7g99kj805lg43lwseae8stbi3fiqgwj8xeqrwhcan61uuatxcf7dwkl1jz3uit35ns9hsepbkvcstumgjxh5ekmlvw56favuw9mecz1ldq2fjavziq842qvm9osk4p5nzorubd04sefvhs4a2ltd3nyrbptn1zuq0ilju2msal5vm5mj4lmbnnxaiku3ohijh8qpu2qnboa5jiyd8hve5t1iricfe8vlg1up280azxj5b4enlqh35cfzpydr56njgkzrytpgmu56l8bagoi81k6y0a3x5inq1w376od32poxwum02vmaekq6ifl6tizxhsnrt8e7wagz7vhov2yqu1b9non7pi02fqmx5gfyyhz01go1c1f1x7pgr44djrk2e886ka1ucll8cgcdzi6nj3ne9ze41weffei4qci3lctc57wg901fh0793fek8zmcitd8y76bmg62n9qjtlkx4bzt2qprh7av',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                tenantCode: 'njo4ei5c5tv504uus4guqcbh7vouuvw9ydps9kaofglr8hda8c',
                systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                systemName: 'le80sesuw19l2q6iukyn',
                channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                channelParty: 'cpuaf5tmv45bu6q0viwzdp18q3i7a03lzyp74t9wnwqisk7tay2ivfxqps656qy1nqywm9y9vuywuq26evpqiam5h5kwehinlsnalb8owfa3txyfrg8grol7ivibwhbh5cgugtjervcu6ol3cqevzc72ruz6k52i',
                channelComponent: '4efobsy79lkwet7x9z8xnciqf8sk0txzd1kftfd8hxqmv1h6xqdv2ns71hkddsmstcir6quiuf9pjf4a7tz04cyvq271vs0ld5hs74lbjl1hbb12mce3wahzrnooc1jhwwbpdxjr6lc4rb16ddus9ygevfnh1age',
                channelName: '6jqsujp34p9agxq994rcomzq0nkntz76re1icw8a3glc928wwvuuei4oildb718pmdqiuedcflospouj4jp86ry9hkywg8ru1mcu5be06tqwombnyd28h9u3hf50pyvt4vbhuer62xvxrf818abwco2kae4xj7tp',
                flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                flowParty: 'xe8lm6q2qgzakw5yc22fu23mrm6u6x80bpctvze4jmdx9s0f2gih1g699d304l4561lpc5abm1gx67wl7iys4xuts1tf1rsanlivvkd3m86orob3xkcmyjcij6xgu1ctad5hlfi64ro14rcm1hx9s63zvdyv80t4',
                flowComponent: 'ckov5hcuzlbc1hbsecrdvlu4xuaotlzav6wvudl8oqcpnrnm4vu96efrkkbwtmyh68m7em43tbxgdomsthn1zytugiglqy8swo8mwa2wzdcq50unuvs6sf8t1m0jj5ksjl59y932vjb6mb5xgoxerd2483uupf0q',
                flowInterfaceName: 'n5f5689y4jzyerjrhxtbiytq6dv6g9owugme8v6mpibmjbexkaiqc1dpaoi9fqr5tf63cj49spdz8fixrxb8yvkkrdf9xt77ir78mke6drs6kgr68t9u3g8h774kjqics98c2s0xjueuuypnu4up7oxezmwokenf',
                flowInterfaceNamespace: 'nxh70o16pm2zp7xh9hryyt96ju4wya2infoqrp5b1h6c17g5995cd2qjlwq9r38gs9cy2a8isbkqnunjg7znmkxwvwmekpfgd1ue5faxqme3vrjs9gz3sbdxwizorqxqgf5eck60jm5b18odrfcvn2nvv4ymybfl',
                parameterGroup: 'fl3syfkkarfpmoznl4txmodi7z9no9ycx9qzrmd1nmh6vevc9sas4am7h3yfb5d5lz2r1yd5zcnqr0ojut5jtrquekm5bvkjgz1tyut1dwp8czgivds10q6nxls3yt2m8zvllnsmmyf02teya54tvk21pgyjo3maiqvue8tcg2qf2k6uexhabmiv1mw18730ux037f5gdmf6ugbfgm01cdri6d89k5diunl8lvw9u8m55m9wz0eh8852ah5pxkp',
                name: '6vunck3dj2gl5xthghmnig05hy1b7b8ym9w6n5w3loxm4fvtzjnpfxtu9fs9gxo0d2lhoskd1o8hn8agpllcxo8s1wr7elmfgyos1oix3wbihyqgb28q86u2ogb65sdqgt34n25211sv5mzako1va8n61pq4meev80cbh17pyhnejw19e79kt1kf0o8cyzpsdxr82u2p4tqqb50ggol47i0k8zv44b14180komnfqv8z3r7j13q16mrmlhgkf757nkw3b5myqq234mr7avexm88kn8dfx88wxmdc09ke2e88l76ehvztdioumskiq16w',
                parameterName: 'vjlevvhgyx6vkojslmyib3lq8jeyx60g7zp7pyx87mdyllh2fh2vscuk4dozhr6zdbpmw5n2wh64gt5qdcqbqknd12yy2da0jfzkes4rnwysqxgtqp1ayjhqlo6h6wj062hsnxpdi8b8z1b5tr78ig4z32yp6uv0a81k67g1wlmhqk4dhy3gh5kipr8e9udw64ib3ks4nvuvrenmww6xls9gr30pq8j2ogekq7wlwmypywmtk49d6tyn8yfvgtt9ebqo85clgvcmmn141m18whx6xr8cwyaa5hrtd20rwl6gzdo8hq65l0tm4ud8jd0z',
                parameterValue: 'jwtf7lrf8v995w0xguazxpx27q26z2r9itvgfhl6oa8fmyhdezwjlyw9h6c7jz1kliy3hgmbav42f19hyzy89ui5n3xmnlasjxas3rgat4umyr72xrcyf8096iltobyu6buy99itg8kp5orns41563nrvt0tithcsd631lksqf3ezy1dd90i7v1874zdkd7ud8ewg2sxpd5ispvltejkv7bhb6il1uqi239oupstzd9pqh39o53wwq9lufuvuzyt1hqxihmjp06aytyrv4ds0mf7v6cerezmozybnjmll2024ctranqbdhltgpqyexk6zpwj7t3dd4y72y5u8j293r37altv1uhqp2yup87diuzcrpl74q9eztcajzdnfv27g4ok5kawn8lqzxcpj3fsdogs07jh3irc5f7v17bwmd5n4k12bjmcbsmbsf7y6kakhv84s3tj2fe7ida6s4v0n4ycjeeianou4ydqhrkepuskhm66x9a8arlc0k2kv6mlyzhljdvy0h9ls6rl5oaph0b7kqxc3754hfaamjjsjh5zzsboqgm1q2pphfpd0wdviy8k4eolgstkqt0al3hur6olw5pc05dlwicb4yq6caj17eeo369oajgqypgozgl07iddiu48abdyadxu5xnhm7qzajmpd4tzgp5a0ctem50ecix3krkr5k4h0l3lzdynutf7ptqyr81w5v3hwjz46towq16ta5ud1mplmmn0we6tqz45kniq015pfbigoy9h6fecbvizhc8p1em13xni3wv8uys2fh3ncp3734w0wgll5cuz0xg3v5b6nv49g4do3f08pfwo36l790macnkyodubbnechtqxn7szh8wcxnlpfxzcugi2uxxw8tcgkjr80j90kqbb4m8gmv89yqyggytfnuk5atcs7z0gzsl4bjgmwlxlf8c5kwzh9r0mmp0768r4n1pys2nx3hrypqcb7uz4vl7czyfjm6zyjommrr173km1cxaxcyelzc2govl0',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf')
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        id: 'a5685701-01be-4411-b2d6-f00c0ff5b371',
                        tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                        tenantCode: 'o82reakn5axleq3pnn80o66rg6b7boogrw2ribyqirfrnd6abn',
                        systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                        systemName: 'uky3nis6c6c3lyz37hx9',
                        channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                        channelParty: 'hf47e0aulc3dc2lvqtyqyje1rsvfjg1dwgt5x7jh937v0075rlv7lesp162mepccl1dcnt2s9w8scownrsq82bhlhm470j1k882ppdq932kpgd2nto71sakm07lr0bg89i4j2onaqc2x9t950gcm1na7tauqt17y',
                        channelComponent: 'r4k3lkltiqoyjvii2wun6m1kqa0bcyxy0xgl2o03adqn58czr3flhxbuithtw3tb4rozocrvtojq39rmizu1b7u7b7w60cilrvxuuc1meuwjs92h3lr4y9rffpvwppzg6jz8il7h853semmfcm5mrkgay43rw0t0',
                        channelName: '85q9hjgfpvfybczfm3564gswc78wg6h7uuzjgyfx7gin9tv5uwcoea7ifynfpjv5hfogycjwpboqxakq7kwuy7qc0wkto59mqtgo2tar92b6elpggapxzxlzc72ubcrbhmhghtv4o6nvg1maa9dagi0gp0t6rw9j',
                        flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                        flowParty: 'cj7bml9xtw3q6be2ts4oofghfwtuv00fkfzcbzfvwsjgzk26musm4cl5n3zd35tugbu2lhw09b0ygmwig36qxb5s5v4noteji50w150jemsv46cvwikckv77anflv7oc7vy2xxopvzjr7384vf8dybsjry2onlzr',
                        flowComponent: 'x13nm51mdqdywdodx5s0hxsnqpeotql27zhqyubws8lghpjb9b4kcz0vkgx0s1g16249iunnoipv6av4wr21ot5gp9upng7c13jedvz5bom95fkgdxeu87wxsvhgq1t3fu8gzsv1caerguba813078ftaujgndvh',
                        flowInterfaceName: 'q96r1qseikdc5ptiub105ysmtn85v1g24ernpgi9unlbzq2vp8guw0pfvmgcdlvuddzx5ip79kw3gp13xctqk41zwwcxd6b0yu09vzmwgu97kb5uj66nbqewlbyffgiqgc3cx4gx1nj3v844wlf847aqimwohacd',
                        flowInterfaceNamespace: 'yb372v2z7yf084sewju15eu5qki6smt0l7zxkw47ct0g0gxunmex99exce4dqyx1u07i0o5xw2keey0gfd54uq67tav4bknboeq31v23o873mjcxf0elk1vogplxe4axa01txlk3sy7fw65dlqnf98bmzjcm8vjj',
                        parameterGroup: 'ji8ekr4zp8irr4env484tulidrmhuqobmkfkmuiqdndopdm9e82wbmhe0on1szp03y4p7pczxxtrxp0jantkud4h9alcshi6yszpqp9z55r836k18o5nuu033gettctshaymnouev4g4fgqvcrmp139hgwlri9n9hs2g81w1ulqutt6f7yz5iyfzanf2a7vysozmuh3ltb9cgwxxd5p6wxvpv938gftthqyqhjmdsfq3kohbuxoql6iz8tgdul1',
                        name: 'e5ffqaoahgo6tf24o4vt410qy5q5vn2r5gk0rdt89dnbr3od5hddd8m3ksy9fgvio31xdmdf6h51b0hergs105u0vsuzb2b72kr5r1hh4wwqmzwtvb9s2wp34ke97pv43u9w16ptu0p53c3bq7eq5ovzuhu1v07o76nkg5pq7q05hov5lwsms9lpqhzzlqbk7zglbsv4o5wix0an91qrek3od9gia3eyy5gkumaff5rvrdkraciantgxbqpt5rvwzqifi9rbqzkp5wwn408oachrpw0bajr593tof9hi4knjty5py92l7qnt8a6exkd3',
                        parameterName: '57vq0hw83t9c7qdwoduiz4zkj45op033jvkmaj9brwkaau7nnp5ntyiufj1czzh28ql27ovkf2wn01xjkbakmldumc2xc0qp8xgu6g9ljn6872rv1hquxy68outp81oo3i3oz28dnulxi6fztipqezh4zs28hky3u1p4rrzfkbzi0kyjtzd37q8nocx7400w5lngl47aq1pbv1pl5g1sut5cpc9pvw6jvzhdd5jiltlzyfyiulhc7phezkezlzuv9sku86ohf6rgp2htij943njdf4rdzqiqcyvscxm6150s84ko6dbl9tpo3c4zi5jo',
                        parameterValue: 'wqxtnzmjfxblcx4p62gp8tyaxqxpja0o7rfqf7vtiewcwjb5j18bp7r14jrwspo7l03jzdnkhiqcofcydacpvb1nv6boofuheohxgnh89kmbrrqmrsi8cs3qnxh965z3bwmizsrxabulv3ege79rmjhlinh11i41bsjzzxtmu0fs2hq0j18qa2oujy591facat7tli67g4p7h6av87rgw5l03ghtq7acfsrhtkpm2xq9wh514x6o4xh4q7ifnh76thpojg5xu5cw4f7rqff51966x49qjwy7t8fbb31srxs8pg9j8rnjt4goaop7v663sh42c646f8nj4qi4st0leen0a1jn9oxgstgme4wkd5xzpk43p0m2resuwmqu1qbo4x4rl4d6fp4oqh338410g4jlphbfw7p8ea7m1ar4i4h022bxdn4ziq6d0a4hxzf9lrtrz2tg2xrvoew15y01n06gk8ip2o2ur31fjoeir7sah9u069sy7kmta6du1km5niuraxro5t4tipledvlbkoo74fdxhu9vrtqtt273dnjbsuywt5vo132dytvx87dksyaadob5rt0uo2lw3d4icrag5e94v3543cr5ss8qepzv83kot3j29plw2yc8cnsvnesuxp8jreuy0dt8gci17zzg98cp0j6h7m6kvu3o1z6pdu9gn7rafwyc9h7foq8synen3re2i7ta8qu154dh5aqyy5ij24ixgt21h694cns2663ywred49zbdwkk400lopi8g04g778gmtoaujpraylrvuigeq3at3h7k53wd6lu72ufnhqjrpyv3mrb3eip3n9xc152isspxmuhaclcp5v9b8bviec772ybkwjadrnl6vuno770hc7djiiftpf5290abqtcol8uvrkzpsfb31hs29qn95uwog7uapperlbodppflklhzpb26qpyoorfqcoysa894myxs5melqxkt7vbuodojf3g2veyy2kd7zv67hbi1uq8j2mdaa3l3j0r',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', 'a5685701-01be-4411-b2d6-f00c0ff5b371');
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            value   : '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf');
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                    id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf');
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        
                        id: 'a8603b0a-c43b-4274-be30-06e3687eec5c',
                        tenantId: '02c3f654-1ec1-466a-965f-7048f81b2859',
                        tenantCode: 'dzfud0le4w5pz1jvbsloolsqf3477sgegiojll15qez6kr7baz',
                        systemId: 'd7ab2d3e-33c4-4ffa-86d4-2415b3204ca8',
                        systemName: '31pvp8dl6cu4ivl2gnke',
                        channelId: '545898a7-c184-465f-ac78-f890e5937e12',
                        channelParty: 'xqkipnv5lflwa6kuajqybol4tw662amgo09ol5ik45twx7oqxd17klfgsdhczfbj03ot8nd7s11mi0ibphqy5q5l0lfjv2el506wbn16if0je5knlmbs9jq9ocjsfmqrzo0lxdg90u8v6i2u60ke62bk22hydhzu',
                        channelComponent: 'dc6vyysx1326ld35kzj7z4siho4mrbhp3gy1gnaiche0hl6hz074zl9nyxprz0z764c5zsd2z4jxprgl6bqae15ec2ygaeixi00bousq5e5a40300pwn1n31b8x770hn6tjzj781fw8vkubk07e06txjgorc4k34',
                        channelName: '942a7g9sgl6yj10hlu1rfa0f85zgxpynq8xm22w4c715krjw2sbon0cyodbm3t0o9wpm6mjdokm9huieyfp8geu0hhpv5vs7peg0iwq9ap8m42vczv7p8j7zwhwl3t99gchh20q1bvdzsgwm9ppe6a39uakcvsor',
                        flowId: '0e7d5bde-769d-47b9-a170-b6ce4d4d4bb7',
                        flowParty: '5rrxpbfx37ugf714d55w20q7mfvtsch28kefsx022jcfjz6jqlccsu1sjd17z4kgqq3s745mwwz839fy5kthb94cpi8tgabzdqxemua0rjl685mw7qs96bnpuu2q54lb8eldc6iy254f872oj3rjduoklwnjaje1',
                        flowComponent: 'j7m9ty9nmh2uykzxuej8ga0xrr6208u153ops47ybyb0c9neafkd3rqlsjzlwz5yx5ejp7rkxf94e86kgjkgvmvem446c00gfiswyclx5bt55mkp2cwwblydtu8hqljrmdreztnaajf6gbp73ukm4pspbpsgfhvh',
                        flowInterfaceName: 'gwf4lcm0lgcd7wanr3wm4nq7t193wm92uilkxdfai08efxn8ddkjrraycg6p5sgu33brcmv79ddwbxpnu971qxhf1eh9j2s8fpttrr4bofdda3t8yopndxh24znouf368qt5p53ps7flcxb5yj8eenhnfzhxd240',
                        flowInterfaceNamespace: 'i9a7kufqxauokybiyusd5k0fralxewphagv2eqju77irzu8atfy7837zm39tj2g4mnr6a1uidimdhwjkpml3mujwzh1bvrpnriflnj6olwwvyjbt6ia5mq94vx6t6by6n36tn8zd34l9dd4s4le0gyj6dnafczjv',
                        parameterGroup: 'mg2yx2uamqrazwyhw0v0prck764usdwa14mxrb0r2ha4g6qi9inl3v005izss9jrwpdmomhd5pl0ehir45yq5h04loao8izhnnzgd1hwbl88lw9tf90u0b2natlc7hwn6x5kcwipp2p2enk1lpnmjgb12lome5eyg3ext14fokwucadk2e6n6unseyzjnwsa44k3vnf5rm7qqobjtpj5m2zvb3eu13nddef7hnqshuru1xub4649hh6i44ku4m3',
                        name: 'y5g66bsdivqecmq7uo8q2l0jnq62jcf9brfi6pmihebx294asabi93mkbf2dbjfq6dv9kuxobq0segh1alni0f1yhiedoi22hjt7utm15q9s9w0un43q14nrx02sc8b8h3cbvwv8a3tkax8y1zbp07a18vpaat9vm7slis8i0mlq9sq6ft3zs66giw2smdtpjx5lzq038ahv66top1q0ogc3sk7uf3zgtxq0a7auf6dihnkxdn7fnpuwge6sbyd9nvlfj6k9lm2ru8t4308u62ln0d3tcks2634ptcieje1i5ymfdjvzkzc4u72fs4fr',
                        parameterName: 'v4fvdmvdssmtvre9bzzxb9kd5w3knekaoxlw18zbm04ocddzoaredyt8s0z1lt3v6nj6e3epud8zvbms6ybxxzqw7ykh4rhfosmn99ywbqxfndczg4uwovmiszh427i1xtz1o4q8xw7osow7uwqhr7wb1c5ql8phmrtr9boy4j369pxg6hrjd52dznjs0rejkvsck7u734fj74sbccar85nimpr2p5kciwxe4pll34v1c4jf0tkdr3qitiw3eb6sre2h4qyaq4q320tp1h304kpshic79bpmw6y7d9nvz69wxj17ll2ps1vn2q161q7a',
                        parameterValue: 'pkzvl56t9eygy17738n6d958bxfe7dfu4f16xsvasovh5smvtonnvplbpaurefnbei62yovqzjpahzyps3yeh29bohfpthbfqxguqwmzh6g5r1ynrjib9zb7ardwzmngk744di73eqja9ekvje80ovot3ns3vyz608rvwg1dsntujkwi41t8nvqielwpfnciymby38qbtj0hgayt2nrn2mbe4vz3d022kohnazgnvoq68i6ixx8jfke3au726ag6oghzinbx4yqkqbyrqfj7g7eivkd4y76a7m19xo9mt420uzvlrzsrdo406bnc1799cylc0oerf5h1qy954r30q3rzy2xbn6owloeu6edmnp0tyf0kohas74nkl61b80yh52piy8d4bjzdqghtglck4qt29ehbnqc3tfphmvbdmonq7rj7lj7nyxizoqa2vplc9ee132mzw8b8exc2kesby2tghmlnsll4hympr04sdp9umi78ioz1pz1itu2bz5628lhcvusfp5gwcokoh1pw91hpjjxg2pqr3jnaximxnpbu53yalrxwhmnbqqf50q8dhq2h0z1is0759jgcihrfnpck3xigw51etzv8f12wd5ndcjpidgx4ohq8odj8j2g9u0zzkd4b7ok55kmmzm2gnt2ok0apgv82n1hprtsnxb7zm1d1gzz9lrb15htyle0udkuebxxc0myuc59uk6z8jn9q5ulp2p4yb6hb489smvg5jj06bomunwh7q0g1h58xsxlj3vjuwecnlalpcpj6szpems9y30l9whw8b69il9sg2z3yz4f3itn7o0f7g090b3buiybiyctbvqm9oydj1758ubos8h4h7c4urg2upj4wgod3qi6obbzpsma366vvzo1c8mcltdo2f3gea0yygjcucmflcn9ewovq0tlu50b60z0dy7p30635pbt9n3r831n2526ornhthcgwoft3brd66n60bgubcmp3w2b7qe7s54iovgozi839j277fler',
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        
                        id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf',
                        tenantId: '0d2bce69-5a52-4b60-9260-2ad71dcdc504',
                        tenantCode: 'p78qrmc3cn7fmypjxh35kw3wx8826ppcx2wgi4hafxsjhr4e6n',
                        systemId: '4a627b52-0a81-4b72-96db-38bc0da009b6',
                        systemName: 'ks9upc1ezy4xpdb6v0gh',
                        channelId: 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b',
                        channelParty: '3xmqe84etgpsu35pp7pcf5jvhfnexjwzafwgqqdqfd1t5hic7nivbmnil7eyhlvntgu2jyq9kozyqq9teaugimsvix0k3o8cd2nhiga59elf235n2bqb1v16jip7rlp2grwpk1ylq2julds6h0o8bufzht78ue96',
                        channelComponent: 'yxjiakm75pgxl5l5vxu44y543u310omdyd659zc877tdk7fyfapr4x1mb8afuybferc0onukro7k0i991s8k3kmdh19txne369d5zkge6hkkw68gnvzpbg5yc7h9epgva063ln9higdmp862z2f7fgw1jyh6o7eq',
                        channelName: 'g4ooifkhydshul2cudgaa954xq0srmjqsuely8rbbh7ydw665aw17h5ahqqdbqu4v232dyzrazlquxmsp1qp38ryoiu5mw5tlaral1rtg4b6ktn6ozhypr0n71puhapc6joxl14fwb4lc7j4ys6x5xihkv8iiit3',
                        flowId: '1fe276cf-521f-47ea-8574-880d952fa56a',
                        flowParty: 'qnfw9nxrjs87hhnpx3nwvrxf2q2l1z1rf4kpk7s0po9ehbekd15uh4lysatnxkni88rqou1jzk1ewd307vp6cgijk9e06n6zraxgwp1z8gluos7ql5of9icwwud4uj2vxo9wi6u6td5lsn2gz2j4rcq5y77yx4l7',
                        flowComponent: 'eqnpmriqvw4znsyelia2io4ru1n90fhlgf2xfuq4ynljdg12ovcrdr2ie1js3j5u507l6r9c4g2iqcvy2ipj5opx7fmziw034kfbn80b2zwvhkw5123p8bto044zp39x3kw1h4fb4zglirlbysu59f7ea7r7mjol',
                        flowInterfaceName: '6owb3unidlrcku730p0xio4c8sdaxtn6ourzg77qidqs5c6inoorqypuxqrt2sjfskgkvnxqr3n9jtjo5y96l5l4gaqyyxgijzmbjzwuj9lphdq8ru7uva5ldxokw53eu9rl2g9wuap4cinva0gvfwp6s4dzotv5',
                        flowInterfaceNamespace: 'aoz0hhfpz7tedwcr4ix14mtk3qk79x1t5chl6mcnmq96l68w4u7kynu3s3bosc23nrhtkk1i36ltt7gdlma059a3w65o7uqtbc3w2dqses0ue3e7rz5stc3f11m2jyz7qwo7uf02bf7wba9ivc1ah5ygml1ium6q',
                        parameterGroup: 'tn2t6owi1uds0967ajax0958cvj5cye2ggw562mjdknvdz8j64xjq88f7fll6o7d6mpsatl1f8y2bj5vbcjc6jxuvey14axfxtmny4f1sfmg9xfxxawz50xz3503tt7r8c7pud8jlj47x69it79rqcge6qs3yifiix337jrrdov00clamc1fwwyw2u7snxvc8j4levvdfy66xmbjzhqcw046z3sucp3g57vqsk53s0f048dez3o3s8lkgl6rahb',
                        name: 'dwloqkzttzff84chtcseu31w2imhpnz752nhyk2orepehvxgsjvl7beaufni7f8uajdd8kjguf0vm7eoz313qqgkg65xi3phbfd710ji18tchtozwx65tkoe1q8krmu16r2avot07lta1ie5lct3zvtwbpqva8c4t72bjgqn3m5ctez6qcfwfq4v8473gnv4hbxv6p92xqfzuwzj4a915rcdhivs1q7tw60hcatza762mptz1gltrarmrwdwu7kvtzmcrkxnf2wnunm1plv55e9a242falknsnd3wg8h3ljizlxeazo4023wogaz0o7t',
                        parameterName: 'w2ey8c04j3cmmr3ojqjoxfo6gbaj0sgpyrfsfdzit0znigtta83w6kw1rfbpz1sdzgzqe1rthl4l7x5z4dey198b6bfjvhfkh36rocxh4fuk6ysm4dc2raetqljb7ivn0a02vf2ffr66i32c1lg3axpwq93mae77b5d2ye8p4xxl8urs16vwrtt94q5rzaelgdz2g9ucrrknwnby5db0p7wktmy5f870bowx3ad9v0wuvb6pkqne87fbbsdn9bielvb5qkb6hlllmdqcqvqqd7cevw2y8w7y18tyw8q06azldgougaa94dyk88q0x9dj',
                        parameterValue: 'gftcrku4i0063l1w6zh0p5iz4m0208v2yzqjmbrdxmpxufnyql3fadvdsef6ahskgwgyu1slmnm6lrgx9q8bo3hvd3ql3zs9lmqmbj2953243zwbd3d3jic9t3coaskj6ta4x8o3erj9gm9weemnifhugy41bsfc0dmewtcxltf9cuvrt96bv0ihws5sv7bnjqsn97l7sajrw7uzictddcqywvqaln7s80bel167ey5khysvvm8uzrobrjbo94m7p2abikm4n6ddbzc3rhnkhc723v4zg8op208c4lndtw6hi0ztuft4n0xqp3hxqd3a64sv9aw8gm6jbutun99luqo0tekcd9143us13cn9y5dnaj424ewqhzwcjesvrfo58fxhjwgn5wwg8sbg8ptqujloon75c131m2j3b1b56bgsl99b81vwf1ybhueg2sxrt7hoih49iivurhcb0mx9c574itzj6nncb5vgu6g6x5jhipa9dhcj57n1dq0fx2h6sob6oo5ihezuefvotcjsyy9thh5i59jot9vzbff43zof61lsh6ul2gkb3l7wktn6fxmoxbswi5ol0q12y5jswt6tzyzjmd191qc5vgcodso6isaqbazuq0dm6o0vvi6gcdbu5jtp9gg7theqasg0tqbq0525t7h3kdse2xkzgfgl3gq08wwgmxqyonhu6c20pr96py9rf6sehpkqj5if4f24qstbs07gj4icqctpejlp3hnsa3c238cvgwa3virmkmlpofypdzjyvvk2d4yofw48lmvrcxwlvreqsmcf2az02yk7y3md7n620shldvxpka7ouy2j8s5w172436e8e25fap0xczv73kkwqowyaydrwgmyr59dnxt3yg6k37ey73d2sii6pbjdm56g22lwgiwx7pon0ohwotvxupvdd084gvthsi5ao3cil9o7rhd65oe5jek1wigg4oiiirl6jpy19e9gn5dj7f6kdf9mn8d4olklqo7br8gqfcxztyzo',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf');
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                    id: '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});