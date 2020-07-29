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
                hash: 'qgqz5dv6wtrfk7ig118y0jpynb6wkhhuvg7ws9g2',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'r52wzqapgg6gs6i9u0vkcshrch0dkupjvaxzoh4mth3julvzye',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'gvlj0w9hiixla7mpnxuz',
                version: 'n1tjmj05dt5ez9t1u010',
                scenario: 'hqdmth0m0aeoav0fubhvy33lxeri7518n3r8z8fqx0pnewmrxj3uybt3vn9s',
                party: 'l90zrmgb7s83l9q8eqy64oyldzb80rmo2568nzid4ewyg38nn5n0ihmy809nzknppzxkx6qajyn9y6p21dgooj527tj4b4ug3c1zvvci5t87d7eurjnuy4lv5o9pv9wbdh0zn843bj4jv28pqclxwe4g35ubo3js',
                component: '9e5u53glqksamp6yjt4zty1jymjq07qsciznhrlqc4tpr9a9rsq06v4irop7v8kloyj21m0772nxat58oe4a78ug2mva8m6j0qxqdoq4cb9zmnoiplfk20pdjz8gtkt6hw06nludergwyaqkejpif66zd5v5cvwj',
                interfaceName: 'n0xjfvuljy474ou3hwo0icvstjsrbxludokyn25dx5mq2w9w6knv7praavg1bnx0uj3ugmojroowjr75hjjnyfkw3a6oocdbl3piryv1gwf0ti4mn7sc4vi5oelhvfb6vgw5cxuvz2y3zfz6sir2zw84vpk8zdze',
                interfaceNamespace: '8l7w9qv747urwjop4zyxm178p1pb8mc6plg57c6qdwlo7s5kfpggv5af2yuou7v21bd9505lmr7vcls3z6f0r1fq7326n5yx4ciathi97i2oc82hebe7ttnap49q0cafpty7ad1rc0veqjj598yqd7a5vrewz2n5',
                iflowName: 'anxdayts6m4u2okfj2ce7788tnlhj2wqwubmydh8s1w4v6pfl8va8hosgyzd3x5axoxiz0vpz0dxotwgaqx9tk2kdb574l9fk7egye6pt7pngscqf1ffovhz0yxu162f4waeeidtn1j6s11f20yff7nzcst4sz6l',
                responsibleUserAccount: 'jddc0p6emx1z5i1atfd8',
                lastChangeUserAccount: 'z1ul32v266nwd97sba8m',
                lastChangedAt: '2020-07-29 02:07:05',
                folderPath: 'z6id54meprqc1o4o75ywpxnmj6dyyntjjh63zaajourlf5wz4tx7f71k3j6nvycnhexurfhxeeybsd6o9a8pbq0lrok1qhu29uwsdhiitrswpl3j3f3ffd38uiognnxn507yvz8pzijc6b7a4s3xwzxj4qzn3f8pp5bn991xo05s0yee0eje7pdtjhx6mayy1uqkqu6uie8xqv6dese1v0w4e4mftvesncrgzgqfbiv2dq8fwd25msyxejrurk5',
                description: '9lnk7c77f5i0kzoepd3t53a2phoc29rg40fzwgekl62vyfttjxu9skygqn2mvjmu324p23txh3m005elvwucgwo0s412xytuvvdzwntx9aha8igm8a1ibmsouilwzbissovmug8r1t7z2vouw1y3bzj2xu88dackq2ilxiv56k9aebeha4wm7b0d74qha7dsy2108sr84h7vkj1ehpmi3pq30tadt3i9dyy806fyv1vshs8jypzxfwssdmjjzfe',
                application: 'thm2uof2g99nxrqf6u7tpyu6rzpqzjeocq8t66tigjrn442fl1vjjf2sauy1',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                
                hash: '96men3qa0vt40m1ektodc215lc8xz258qb2pltx1',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'sgt8juqms7anoogcf4q08jf5xrbockaa899mu517agi8vbms0c',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: '5w1yz4visj1087r6sg8m',
                version: '3xoo31xap7nlqbaii5nz',
                scenario: 'd9yig1kmqnwaz3etoz9uleyb88kt152blxi50j61v599u8u1a138qwuvp4en',
                party: 'x4lu0wiet681bkfo4km9to034hbfl51e0kbiiy2ugrgvyzvi494c7hc89ty1hksoabsp1q2c4ltsgede6wf2yl5asahvvwrpnf6nbl4uje1gmx0qe1t2zo1b0m64nlhptzuf0ok5itt0w82ggc5ryho8bfip6mts',
                component: 'g3fmuf3kkc0fbb3phsiyw7i0sue31cqnv4zuqarppqgrr5wd77pp2b0st7nsksmt7t0uapb17u0qadnio9nwopt2daa5tjpdww8hk90i329bq4xsufvzpmegblsgofpbqlopbgbqgnm99dhq51uz93zo8mfp64cp',
                interfaceName: 'gi5tiefp3uvykdv1lc7awoewv5niinwr6avn5gv6y6fs5s2fsyw9da8aui8rr9vi6av7es626y82040you459amkzqhd52sxljq1rifbg0ey1dvzvlszp772ujywjctf1rsgrdp0pwxp2ln4p0jq8ha18nkmn1em',
                interfaceNamespace: 'uujh5tvnzgee9u2h0u3rtt91w9vluj58uaparbfvrdno1khszenlcl3y1mbjtsq6g1squnjze990xqodallwu52v4syttir7cpuzn6pd19dc91f9cj6xx17io32kcx2oekwwv0ivxq8zet68lt0h1rxjaj071zu1',
                iflowName: 'xyu9pufk28qxk6ln6h0z42xkjlwapx8j1tn40e98iyfwx2qmpgsww5ewcrjoe13vmx5ug11i3kq8sj8xyd7bo35xgjghk402begrchssiho3tbzufz6fus4ynstzlh50dgt5qfavq3xan94818q3v331drq64h2w',
                responsibleUserAccount: 'mdxf9c2a7txwdwjgbxv4',
                lastChangeUserAccount: 'dn3os87iymqvjkqsxhab',
                lastChangedAt: '2020-07-28 19:26:47',
                folderPath: '16btmo8bb7ey8xiefxrjqdg6inlxm67d68vxmj8ehy6ly2qroestkntck5po42d41ht14m6i7cu9a4tlarr8ugtqtutmo7x2df1jlfoirapocig3qz4pgscp2405jk193che6u9n1ujg8vlvhewx69o3ej2ozp1dlqld6u52atdkd78mjrekry9ahrljaj9mqsmee5gbp8r7k9xqrvaznqslxlwwxnqq3s3se94bdcpw7qlhtetrzfeai6auahg',
                description: 'nccc9pywa4ddnghmwslq3ao8oaqk1gkf22c4zbv5jv3j8ymn2c3oggwrv449kso6s9654avqt536s6x046r09iisoujw2muqu0gqdvi8llwr8yc6xmgzykst2cfj4rdg15lb6j4zib0u6qa5sao8ao7pbjctzb86u68n78c3bvh7gkho0tmgyqr7fiko1x1jgpgkye8mqueomjhrqt759fwu1cdcgnnxmyjy3xoofa3fbphxr4urhwbbk48k575',
                application: 'sl5548680vdgtjb8jbbe2p68h89kpobjzj7s2qmnsjmd3solhsr599r64wox',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: null,
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'aeqrdpfyp2yq76fikk7fy0iyydojh9k234xobhplj216wrisgw',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'k76xyhkj51zt0wx7unin',
                version: '0nbign3gx5env6p4ga50',
                scenario: 'tifgndmkcs3vgtj3jeeevj459ueq10rbzosdxd1l3vloh2uchm2paksq9dk9',
                party: 'dau6uygkoco31gb8a3m8525221cehdfe5nuud4ib7xt5iqadwmt1p32egw0u9m4ctwemx7hfbb5eejpyxsbie4j7c0crqewl3nalr0fwiddxy71dk9r15809bkch6dv6sv44dsbfmk8sxfazec03i8lbsi68w6k1',
                component: 'vhyj509temugss1rhhfc6i69tf5d79quyq4mm004trm6epxeee7hlqrdlwbuud8koufkrbmqvp17dii33vwd2puc9tiwc085uysjxxm6bqbz8rfkcwaj84o3nwuecc0cu2x52ss50qel886c4zjx0xyr7ivk39qp',
                interfaceName: 'tfqx04qo84ceclc8xyfk5dw4hub5v094drhfei8d6bposll6kitggst98hlna7ka1xmp84fbfol6hpc75nowpelhgkn0wtcz491n46k04zl2db9lwxfia5mjauhbdlm6253qctie1h34iqtacpq4xbagzfb1x0w8',
                interfaceNamespace: 'n39pf4zdm59m0nd4rv7a5whhx95ojpg2pg4voupaa2n5d1tgnrp1wrx8u4zllroaxabkjsad7fqhv5x8xsn7cbhrewl8uuse0w6dtvc2p228de4o42el5blm5r0qajjb7yi0mzvesa5pjtfvoa3c2ikze2zaxeyh',
                iflowName: 'fxsufpp7i1eckf4csx0sepxlax32v4j5x8jldwk6vhrcxo5ryitjhfkb1jz4cknmnrqjasylj1q6n20mm5dw6e6qhmxroajbe3g2k5qz117ezuxjadmqbv2asj6bkkl03836w77oyaegg3f7mavp6wp9eccpynoh',
                responsibleUserAccount: 'cuk1n3wox0oz1gag2s29',
                lastChangeUserAccount: 'a4fm6ggu3of3dk3d46id',
                lastChangedAt: '2020-07-28 17:09:35',
                folderPath: '6zwoppogy6sx3svu7iffhglps3o9nv55s9kr49faqdmt747lq00tcx47nydv75u82m1n5cxe16372610efff7bvtirdoe28xwlgo75a8bcyndbnud48wm2p28zm1tbfx6wwbo5lnxyxtrqa0ty1h0mowhh4tpy1wuiybw0re74d1aeaivrdb1fn83abcl6077ixdoap12cb6i6yjmdc04rdifq0mk5khaked6wr2u1j8s82k0qx45ejs6eg04c6',
                description: 'l5ztyyg85lzyinlyigye5ixar6a0uwcvxy2fvzwwcls2tomuig3f35l9qrj79kk3ulfl42z4juy7aiuklm9it4dpnuvt60p3y0w40gtfxjitmexbfut99se38sxoi0s5jucmji19i2mdq70g2v0l5zc77qpb6vvoq02pttdowqs0xrb48k18ltaxw2f98y9q55axcdmqzu0bwsi1h2g7s710aanv7pwe2o4lrvi38w5ndrszxbe4yem7cuvo4ag',
                application: '7ivcapk5bzermxgcow5spz11j6tv2v3j26qb9uypz1xnuwhlcnz0ftftg3xm',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'kcaolwrlbhla3lvx92k3qt8pzwwp98kq92nkeypjgqis5w7luo',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'rp8dkl9ilibemvs5w1tn',
                version: '465k5aodoanun10y59dq',
                scenario: '6vgygugqnpd1kbovofroj9fr2sbj9arf0l7i254bw2hjujs1q4dwcqa5fusf',
                party: 't122z235c5wz03vupkp5w8iu5ak2xd2139qvsu651ojj1lppxw84hp3bj4e3q3j9ve065auwdi52tex9u132nwy73js84sxuycbkpxcxphqju1emr1xrq1gwg7b8selhx75kxw9td3lx6yv5noaspmvgn8s6knkl',
                component: '2bz2njo6257swuvbd5wu12mxnj3ckkrjq5xp63dqddyvvdh5wlse6x83uiefu43zpdt2da1w4y7jo6xiizqnn778ctkwuwpx3yzgdc8igzako9e30od3yccqx9mah1w6a30kam6k1454sj74o4a2gro4yr6flv9b',
                interfaceName: 'rfj3m0u1tu0a83cywv3ddxn74309twn50gae78m03udl5a38smmf93mzcavfys3bx2x0qe3atn3g8k9bbudaw2meta365n4v1gvplw9s32muf0qfg0rsvn54anf2t2zumgjr0d81xeh8tpghzws61bljbrl3fp75',
                interfaceNamespace: 'fwu17d94aylc7rjpj10q3b4nd0fzyqgr2tqe9nioqz7bv3kewzrybaukhq4cyddf19xle97bmyghh7m7gatv7cdele6gfejummofkpll55fj2m7ix0h17wou282edsskiu1qmz2n3i91oj7sdjx3twper8chp28t',
                iflowName: 'mn158iyegelxm0uiwk3v28uqknhbponjbg8fkfkuj83xhhgdzj6ed47biljeonk3x5tsyifmy1l5ya7gdddlvwe5glvwczj0tkjii0g4kjute3csgx792nqjsp7e32gjbh4x010zh2ko9e4b0u8h78bc1gtp05bu',
                responsibleUserAccount: 'qhjn2h684mwnxvqlbhe1',
                lastChangeUserAccount: 'br9oml7nnj7ug8dm3ecj',
                lastChangedAt: '2020-07-28 22:04:08',
                folderPath: '71cb4gmcjygih8s15zv4ozppax67bt24aqieyk1aqn6avp4b4cx25x4hkrs34szgt9ufv4mw6e1yh19frw5xdxlgeufi6l3721cl04178852frnvqogb9kz5c9hx5fly772ahpbb6rx7re497jc49siaefzmr7fp5nfezrfg0bq4xywaz3qaqfiv0p53x901u1dhonihwn8ug0andapf5zgzdkx625i67qyd8wgusv9d3z7d92isxeqz8p5q598',
                description: 'wdr0eulbkqmszm9hqhy4ta1f4ymq5wskwixrupl9vu6cku1it7gw0ewcj1wa432m7xsyzz2maekwqkblik4alqh4s2tjcnex5bj0yj51aydoqhagi9qgmt1menl9phezj0qstm1qb9auc4wthrlxfl0yv8bucwdnrt933tnfcsliqklpbcu9ppsrjdcy90v2jirnyegrjtches92qu0xkgh4s5712fgsyv79q2bx32uw37wrycq7j130i7h0th9',
                application: 'mfef5sans7dtsvbh7zlq49w7t3a065m4aco12jpw979e6f7eq14wsrp2tv71',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'upobp4pri3w6mdubkg61en2zh912qjkduwpmyggp',
                tenantId: null,
                tenantCode: 'ml24if5zir32i6mfxw5y6ev8zdns61d8n9rpkq04o5i3df8trn',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'd48xrt5i5p043xvtvqul',
                version: 'idpuv6ulab3bv7l0ct06',
                scenario: '009bmgymbikaaodf0bu9jsn2n60eqjg27v1fmsfoslhxw13acd89y53z4hnk',
                party: 'v33rxqbhuv5t9ptnapwzaf514jjmehv57chto0d8ijzjvuwh32cut93lmz6p1n583m4ao3g2zp91kwcmc8n2su8tqe25yv1bmdyhtrpvmrcal2v36eyjk8c0oy0qbx1rms9eynudm01iab8b7916k9vm2qw6kk5s',
                component: 'oxspklc9pzjf0l5d1ihi2o913zaik63legb3qzbs2ki7qw8e0196jwhtfsr09zstnrl4l0b0h2qhh4scx42uek2fwahvpdttva9gh8xl4ejr5boj50kow5w1hke5v59gjwc51tcnj6o43o3jzj6bna16vzfmrthe',
                interfaceName: 'r81kkpf6bdyfrwvx5lnle5eco3pgz9lue0q3wn429jcr5mdn6rfgl59b6gnlkv9su92xqbuw4h1u203n3ysv785k6oqpmu11hg71t4h1fe52dlgxejl8dhn3ni22iwlp4wo6ueh6msvmodh3qqhw177ejyaz96o7',
                interfaceNamespace: 'qa7t8xjci2iiisz62r7kylm4v2rr0e7f267oy1wlqqqcyqt8rthsu3kx346pvjqmxyeryhnd76f51w2a7g11v9ugyk2xtnqes6v0iuwcjlg1pdoxku4gw2ole3j04hdgxl5lslqhcth3yoluo4rhaxwvx5yhjcrz',
                iflowName: 'un4032mu5ec9jdk4vskwknp6e1nbxfpj6q44dfmm97b69hakha4ir3emvqy8zh7jqsjbl55w2y8hdsxq94ssj3stel2h2nd3u126qwc3slbbiok7s9hjq41bal34xx735ctmf80i8cusevd98yfoa7r8waa0ieog',
                responsibleUserAccount: 'z2mvfewwd1isqr38i7br',
                lastChangeUserAccount: 'q9zkx6amxgkjrepvpdvj',
                lastChangedAt: '2020-07-29 02:53:17',
                folderPath: 'tx8ogr6qrooang5tu8i1oegxfdef6p8s6dcp65wa5z45vaxnc50e7t2vedky82ec4bfvdha01xbyzwk4rrygpihptdaxov7w7jcl607hayx1dqqovys64h0qnb0ps6znhoba6qxs4yp5ghf6k9x4iu7vazkc357nmrf861u30afrcsmrdberk347d8nua5mwfatxtwyb2pp79b300ohhdn6eg8hownv1xxi8fdtua7z7fu298rgi1j0ei739ooz',
                description: 'eqz0ob03vl960zp0srsoh5vko6n6swfpqbu9cz8bnb45auovpmv90wcxb6ur4sead3tfmlctltmqn350jc9ur94y0l8s4xb32q2nuj0oz6bmhp42s7clll98fdlv1n5qjf0ck7vf9t29xcaeg2pa629n2k2cb8yvjd84fqt3o8rhfbasyscgeazo0bep2dt3ldyryk4hdfo25pad7netkxhs24pmisacdjsfp9ni7q5ul44hkl6r9g5xcim34l0',
                application: '6b3hueotjoowzbxlfdvo3eitg4x3tb5bxea4r3oupbwjq5lizryhtv0bcn8p',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'dmvj9vdwls35pw7sbmo2m216033doiyq16ygk1o5',
                
                tenantCode: 'da6ub2tz18hbaqwrrw82uie23e6862ev7xhybpn3jb0wbxulkp',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'gke33zghpd2nztkinbna',
                version: 'ilgh21qwr0jat6w1fcia',
                scenario: '3jb7jx5v2ltkhnzi8t92aidijmqbsomeacnwvy5096843jgjjjb2z3intzf8',
                party: 'qrmzn16ks8gburt478zim3j8tb9uryhcknygc4mw434pumxvuubpgbgsix3rhqkbybcqcse2d2a4tiriitl272016wrcafpxvqvuclinhfj6u4lytds0q1fi4bhoyfki7ygrlhs2w565wy45fr59wqi7xxjryc1m',
                component: '6yb037oiy1q7h8tbxl5jhd9undsec1x1w5qanfwj2acv3nsyeili3xdt9ph3z5mrui0yv0gtk8w1y91ft1y09r558klju8s5lv36vekncsklkshzizuttj4exqqs6jx9sihhewd4rv3a60uhtqtc73mwhtg07n3a',
                interfaceName: 'le8y2tigq3bx30you7gxn1dehnjwl5s9wjuzdxo0598oh6xiavtfjp54hjzx81fg6xtocftm9hwadli9pt72spj95oj6g9jen05q4zxosqxu6ovi1x9zgxzr3weof2xa8xcz7gu40phhlmzwkkddn0tapwry9aqo',
                interfaceNamespace: 'owhyng30fxdd9agx8zqsx68vefm5i1p06c4oaumptbqrs31iclvb6mm87ptueuoxw0141eh7rp82ydukb1zegn4joaqnr9arvzagu30yc33eo4vjf59a2gk4r3dputcunk9qp7yzdvyandj19hlnnxv2u9r5k61f',
                iflowName: 'xxc1j1qsezyroqujk1puv2os3m7ukdjj2g2vkn38uia7mu9m2nhczeejnc8d6mbb4y69yimqgldu0v3zlxu5miisk9011jgjvi2j2tqksep18ynszy6vwpixp72ae434jt0slf5ilzshcsylrmdq0c39epvr780k',
                responsibleUserAccount: '6v3yq4xlvfehrj4kh6nx',
                lastChangeUserAccount: 'r6nxn0vvqd1uywskt85t',
                lastChangedAt: '2020-07-29 08:20:08',
                folderPath: 'v08sti9nlcjv034ttu6vftoxgz7ktqv3182gotpq45fc7v8346uj2l1hvfpolpa56r4tr4xcg87rwwyzj1xnu0rhr9qb5fm7zjnxgacsxc0kwc3qhu78sjim7o1ffxm46gp05j51l496wq9nznrrpqmdtpfsgdlcteyku376i0fp1mgs1zl0oopk1cbeky3sqeye7zj24qxcsjrp4qpyqscorqgnqc9jtzxk92n5mv7jtkogq77pexoz24hfnd4',
                description: 'x0txqqubctrkcvy8i7o7rmgh3wr2engcmnhc9sf6is7wksglx75a1l40yd70z0t3tkcjyycgeam2npoe0ip37fnz2xo59ieik6zu42f6u65h7qfcq2la7pnyjfzrlou59x4sxuydai5p0k1u0hze3luv01gvp4nfgfdh0oy108dzmtfoaksllf04oeoi8pu8pft3sbtwddj3lu7rqb710ol63xksl73sto8r2q12svujkt2ocnaydg0wg95qr09',
                application: 'm0fzlwnph1x5ulgt7flzctir28tby06hnde42lp0r3xc06odhq40povqp1jz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'd6s9563ntdhqntkk8i4qh0a86e997639ji6nxce3',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: null,
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'u6j012jpcx57u7y7omew',
                version: '8t7zufjja2wpwofohyy9',
                scenario: 'e0oko4wjurcwed2og69bjbp3st6jsgaglicna7j1lfpmku1cky3ughtxw18l',
                party: '6iiek3b6jbmb2qzbxaeln5bjc61cm99e0zox72m2srwzx8ni1iopym5c6ywvwoc2355aj0itz0kx54tirwt39om318nr0f719kf53ehvl304ld3yqxl4vws62cwk14gmlnr09aclyq2l2gpv0xprnc6bv1yvh0t3',
                component: 'a4q5s5czycbij3kckzia5fox5kfqlvz8bem79hracz2mqj0jbepf75vwzljqjx1r6fcguty9z7h3y759q143qugwcfbglrsz5pn58girvebkjk4sgw1d45w79dm78athtni8nnqk6a3rvu8mzus22p8u7xq8bqiw',
                interfaceName: 'lcvwotuygkptlbxvbe4ppyep9v18kindodd542f3cmp9bbwbrh6vmjv83zwgl9i9rkmc6w9ir6omc8i5kg2m43o4i2vi7sgorequ7gotddg7xmqnyf1gbtncjtd79z6mxx9tnixywphgow6h5woa74sbi9u74jc9',
                interfaceNamespace: 'um2zvkgoh8bxqovoqd88ql12cqqblg7j8tlotu8pvreg2jb3aovxp6dwo20bl1ipk48r9xu4m1xxznt0f740bwqzeg7c8tupe0i7bp7ifh0y8rqydvy5uudtl1ywqyi9l1q3jo6iopgh72y1ltdxtmy10zyfyqzm',
                iflowName: '1fvq4qeyu3bjlxgu35ltftvdpidb0znosv4b2aec1ujt3umy7j8uj4bqfaln7fq59luut7jyeokeb0zzht7iycekq64ggdho92bzslh4cnhhrdh6s95ava67p6w4rvgnqu68uqj0r7ries36k352o7dx1w3eqer8',
                responsibleUserAccount: 'xaeh2f4kpv1iuy9flf3w',
                lastChangeUserAccount: 'va2yla4n40g44wytv2wj',
                lastChangedAt: '2020-07-29 01:16:53',
                folderPath: '4rlo73270ar20yz4jbspkncipxoftszevh9yba1z88tkcwc010l691221urzl983dfki22jex2iho3rzc7y6k4g0ro6mkzejy8hz9bqlxo6gylqap9z2c4lr7ip4d4qywfoe9hgsvm0p68pi5vz1o8xvs1zueo563veiffmhwzs0tpxai7m5314po3534hunvuhxw2g66azj8bwb9rnoz9mbm0xto1zrbkdmqz956lnfazzktm6kkns76ol5h8u',
                description: 'ole737l6yr7ny0k1gyrlph3mzj7zylaaqxxf4eeimbgw56ckx1dvuocn4a8n6bri9i3rzlua2lt84ai97hzdrc95cdu4zb9srp38s0iugn50xf597pd6svna97yvgyvdwq5774zvyymv77gw7bn1nibm0eeq5hj3l3hvz7pj57ksui1eev2fztvi0t4tfdtfgz9s1ve5i9d5ivzmrgppiyvl0w140t79rlhctoce6qexjc6cjvjuvjbf40t16rw',
                application: 'ku5z6r2n1vhzholq89isolwoi9yhro74jwa8gn3jp8dw66sel50z7tiohwpk',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'ix0jkcg71945wur4iazr273legtssi90pvzivb9e',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'hmx83unwuzvxfeaq9hxh',
                version: 'bjvqdv4g2qdcjr7yppcy',
                scenario: 'd4dksaserhcytwyac55m05butemdl7fzz3lrxx7aoh0j7n1u2dg7q35agyog',
                party: 'h0atd83cznlihmzyve9edxtltf6bz18p5bs88qhmgdxfy3tpe23c0aymdyiz9emcgnor74a67t5qeqgdlz9ea9xko1e9lvat64wc3kopd12pn8pf06d6w713fxpq7mx8qqbpgg3dfibx40yn683ne371xshlfgrl',
                component: 'd70ftg8pz2ein1px8w9wdho8g5dlwgrvjksu1kak2hzjcuqmouwv8doixt2ki1iq7ixtk4ea160vgtrp3i0z4y5k8yng4cbwzjlaqtw54orkeryyc832bzmm4bxst8u4cjeks9n6mjswjpf0rkeu1cauqt9vysfc',
                interfaceName: 'v2kt5dcotympgv5a2a8myl6314ujsgmqnv8jvl3a8bzjbr3mfrgdl0mpm3m2s1fiz455p27unnf7d0c60jycyyvxgik1tuvp54yly3fvtfdbuw3dkmxqw5v86sn4h7uhfymc9p9v4wf6uwxgc2iiurntlqvcu9nf',
                interfaceNamespace: '0bpkct9upgmdi7owx71p3vrjhd8ofsbvh2gbhsuco0agfeqvfeif7afah9qhfhtpab5l8bey31tlz59j42o06s2q6272emnbrxru7zcayytv7j72w11r2lldh6aaot6ubydlngdbs9727tjon03p4pd37fm0r75j',
                iflowName: 'dqisfaxsvyhvvp7fo8br9mzbkrb15yx4uqwybgmh2abf2ol5k4zzdov8yzdf6cmfsapwd2pysylg07hdzx5803ie97r0vwzc9qe0r8hdup7u1hsxs3glfggl74fj56mrvorj5kt6ji2c288q45rkkz4s4v96bu9l',
                responsibleUserAccount: '1y562a0cp5n81cp0r4m7',
                lastChangeUserAccount: 'pqjkvhtojot4xe7gu5or',
                lastChangedAt: '2020-07-29 09:10:16',
                folderPath: 'ch1hcesk29opumuqfxvuiabhi2doli2nczt4758j4yx2p2p4vuk4epyabiigoclo2p75wnpcdqpj2xkir3vt716euflqvcd8hno40q3wx5fip0riolsgt28vqswiq156qoh96nfslmqozlhz0xcnjekn4pwm3parnwnpwv0eg1e8se8hhn3rxftjzspglulwih8rq6mvjq5r26hs5dwt5qcm3b0y8z00unjhpi2owt1jh2ki4ljfcwmter59sfi',
                description: 'scxy6hjrov627orzcdpil3dqgaethwkmk2o2bs8u9e831h9wpdw02fl3qx3w52ey4rsuqotstmjz8co6q8njrk0idqmkdw4oh4coimqn8fozpqw8d1my68izqi8xeg7rrns7zw8xhbe3oo0f7haxu73ki2p1oi9wru4n3qlk6jrf4vu0u548b747zjzzrsk9nxy3n4pb8ykxi0sqkm77ssaz90bwd1lz7s26gxatdjl0wx3amxnutj5kj2iiege',
                application: 'ahj4188h9gczy90138jbu41iu1g2tbafylh44t0ow1ulov69eh3uz29k1ahl',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: '9q93wsivzsxoy5shrhi6qr8c8h03w2crbx8z0s83',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'j7qqwajzefaro32vi9puwzep4s8up02pmuranejd7bv0il2raj',
                systemId: null,
                systemName: '2eqtb0l7c00l5md18lds',
                version: 'cdx0jtz9pmixk6vz9gfq',
                scenario: '929brdhlpxythn8unjjwdv7tjrwf5p1c17pwdfn2k7j3hpseybgegwunyjs5',
                party: '4l6v9etcers9unv39mxv36tpelq42np8a8sh7e3he2ig9x20jyhhc5px220r9sj81dwwwjibufspbuyoor8mveuxi8gmm863a7p78ts3kke57xl01ajerwro3mr02oarx8ydf7s40y09cnqvdqphbeew3x39igb4',
                component: '2cbbxprixk06fkdl63qve11t2xgmq4xevmctcrmym8cv37i4i7xbwbidsf4tgg5q6s0vp3gcik2qgtfu4xgl4vb6jxme90rv1vnk82cnjqwhfm93yq8px97qh3c7ae9kzin0l3qvakxatrdsm92hpipb12tp11u6',
                interfaceName: '501krefeg36ko8ljuq8e56bdk7vj92d64n903obpqil6ppthaci8rlvkrlhiiaee9dx3bg3jzv2my28tatb1pzwsdng18dolti04kanm6z23xlkq8rjn0lmqfrvo9kjlcgnao51mlb3cq87w6z3c160vroql90ce',
                interfaceNamespace: 'jajx76m4d0djcb4tqok7rm8hq0khcrypf024ck603qywj72i04ufu7fxqojtpd5jit5s6i5tk8rpx7wzmecrik6l2d9k9vh0kel3jnmwmjbwfuq9pjskkeom0lsvx1nbag1wjs7s7jdvnt9v73cf265gxe0fo4rz',
                iflowName: 'lyph5d4iuju5pl2xwnlsu554ti5a06630yl17py5natpqnlgh60oobs1cz6krj8sf8uyph2e6w46dbcuy0tnfsskl8vr7wazu74otwqmfxx1vrklyr9fd0wrg8bau884y2jqm49sz68l6rfr7brd5lxfhvzhl1qx',
                responsibleUserAccount: '8nttdgwefrkyljq8akmy',
                lastChangeUserAccount: 'ecx3nspvhsuomp3n06we',
                lastChangedAt: '2020-07-28 18:15:47',
                folderPath: 'g8u87qm8tm4be0tuup5zc4undi69uuf7o6zshaa0ga5goqf4dx2t37zlqnvjk9jwxxs3n8ipwwbypywc3mk8lsgclkcri29a0w57j9i9hanlmq1afqxcw5a8emldxq9rciv5w87one2vysk37ry552g3n2qcih1dy8qz8z1milsuknevccmh5e3yocqb2l9l1oexpxvuvpapltmo291x3kdei70ez5ej9bx876iqs4as4c47anb1x1l8kvvs4au',
                description: 'y0semj6qjn65joefw9737j8wqobsu8qhxea44rozbmk1mphasw19umf57g9tyhwh66ywjtbttxokuz7738ne1q9hcj1rzmvh2ajuuuxw6w83jpl1fy0he7e1akufplwxca5ilukmupd2fmu039br427w0uh1y1b6xd56cv6vlvkd5gakzaw6cvp7hs34o21qxnz34esiekxfbf6t111dqmzx7dmdozdoaziqfnuevrqh0tghu45z6dct6iqyu0j',
                application: 'x6h2d3p3mcjdjhd04a2kt2xmn1v3wkge93ay3ri3qhd5ixrgvo8uzxswwzht',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'wt4wox8hkl64qwfqzje0vgcziwiwzd7nqn9wglmd',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'foo51fsevrhwfp63yzysnyerkrmknzvfk44e2sbhhocptlsjeu',
                
                systemName: 'lbp5usn886cw6w5eawu9',
                version: '8tqg9p9m5l1h1co56bbm',
                scenario: 'xnvfzbmsegaeihrcz6k212zxtcrl3juipgeeh3oba9o1dio9j1cy9ls8gtg5',
                party: 'nj50b25nycw6mbswb8gjc5cj0ap9jkbnd5ojkjeeeri19kxatgjla6cemtpu2iskg9bew571ul4pyq8z3ny5re3d41a2dpqfbi2f8qh05su89tfxjupwp7tq2ywhchj44eoyilwjgswy4gzquaqobqho01moa1fd',
                component: '8223zirxvbzl1bgj4mx1cuscvemfkir6roc7xy37k922y2zlaoobrfao81ezt1zrxhool4bl6kwton4f3sf02b3i8b5d9blivn8a6rnosei1vaakfp3in8aaz9rpozxu3aq1n4lxe9e0h5dzft39rx6jbg9pc0to',
                interfaceName: 'ujai3td1hf19qz3seett9z53sb5xuwv8xoadme4e39z2tteonqthl1rgpkfa29wlog7coks5zdm93vkb7e4s80huet238ozos8irx8opci2yfjsuzispnotnvymmlqkdz0tbde0tdjvbiqszbbao7zo9h6aaw58h',
                interfaceNamespace: 'ce7y49ooyjvhfq4xg8uow7l59e729ljmasrwcih24puzxfstat18bfm143hrpl89zabd0qqlovy9goqfvthnlz5qd7vhs9jrl26ja4f652jlpkr0wlkba6h35941calki5pnvpm89agavvauf9tu8a3k2e3vvz3d',
                iflowName: 'ibb060zrpi45szem95h6h50jfbzie81iiin3xvqcwuxw3zy498bvgea5lhw22pfa78s3k7cbe6t0qvd4wgn5x2e7dl0niqhrxq6et9in4eoiroi34xi4516tohwaymti06g427bs1bntvv1qk44tiushqqny93s4',
                responsibleUserAccount: 'qxzv628atp7h311ijg12',
                lastChangeUserAccount: '3dgxobenrjyz9h8awjfl',
                lastChangedAt: '2020-07-28 19:00:46',
                folderPath: 'gl0t77xydwfm2r7bvbf7bce6osxjilvy9d87lew3b8u4xorr3c4eab8sd1viak37bro1xh0dnnumu57e5wyzb04d2gzep1sz0xus6fgfcnyyhm23kfw5dt3pug9ke0a86kplcwm937fov78nxvbbj7cg4n1yvr4kdtw4wo9d06wed3z7hjx6rqvkcars72n0y8pans2xswt59skkp9bjb6uvthzmxfherrd7aeizm2p7rb3eglx33l0ktqmzyjb',
                description: 'e3b7xxtizywiskbdzmn5r806fpjajmrf28fgrmoxwfva8mwz7wiv15zqva2rza4d2ob8rlszb5ic05g949zc3tcqitti5seiaz3xr15geelexqez8q967kbhs1jzjk3exxlwagipk9oo6znycszhgky0oxd5nnpsb3jy6m5hvstvyolwffx2bkgr8y6cldag4xwaz0gie3owj1uuvzz5hzhodzuv2iz5gixq62l6ingxt9zhsb020fehm3yb9mc',
                application: 'st9g72vmcu6j9antwfcapk792d8gjafav7up2ibi01upb7r8ogpyauxz5kyj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: '89xin9jynaq33wow6wlyj94fu5b7h7v1xh7477m5',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'g270or6z4urjesr169nls2m5sejwl79tuhj1wsue22e0pt16l4',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: null,
                version: 'lz0994c2oe1zisp1o3uh',
                scenario: '2v68rzi8wn8iiivftbnq0ecebrzx7wa4jwjsultzkxnq2kssd1yo5aqz2vnp',
                party: 'dkb7b2u0sms4h1jrrvdluw6r61mhi50x4hxye6v75ll3tueiamsc8ex2pnebzi91ravc5qva16pz5j7j3avs85e5r4pghce218n36iap6cwze684ryhz806bdly5qiottjzy9631tlwzxx4jfgiiqmkxvzt7mhyf',
                component: '8v28jft6ko3riyqcxln9uj76fwzcj8enlbyy6ftsjo8tbl6wuotp6us34qcxn0iteypmo0h5giemyarwanjem77d4nc126awqcgvoqidpwkscmhqbcfgepwxi4xcas58i9a2ghtz3n6cc8yrvre0n6ybcc4b935u',
                interfaceName: 'to1fhgobyul6v6r3lwkzzqlb1apc4y2syg4qwp7n28qrmyrbu1vqtftkg50qp1clrrn8325r7n6x9uvu0q847yoki3ubym7v8autjlmgi23nrozbz8iqq12i4zjg3o2hs25mjcdxphuzaps6mlckj9uwi08x000o',
                interfaceNamespace: 'ih9c70la49lsq5evr7oh8juqzx0ojqlqoixzzlblds36ak8nvajeqq541sa68o0e8kf4zgeftfsdo9t35vgzi3phabpafkelxfdj6skzd4t8geaekienow26mm5vtqkurm47rnvp90vgvs91mk7051n6i2l9sqkd',
                iflowName: 'u02kycvp8os7k9t0rxdoqxqc5efqdochn4c0jjtm9gt23wrawltv3xftnj1u2eec5euy40dxat3yomwyd3t9q869ifv7veo0nj2fjomo83sqishkwcoasowncpqevqxpxbp89d3jc1pi96cm550ugn4t0tnymj5p',
                responsibleUserAccount: 'abpvdq0krbfmdzzgsiw2',
                lastChangeUserAccount: '149qkyby158xs9vuijbw',
                lastChangedAt: '2020-07-29 14:39:46',
                folderPath: 'ayxin4xn07apibne6d872ksugvyoda7o9x01jzuqlq0t52w7mxorxcrxnsyxkk5zrkvzxz4t4klq6f30or7oeow21awe0zrs9gwz5zxix313wq7v368pyg09wzhtbbk7d8vuhwlnnc1hy8e0gzsd59f8df272duxhsho5oy5klamhx4g5rs08oxf55u7svx862j0l7ezhxr5d6eoqjq6ytsw14hrgy1i3iuyv4pwsy1xvkexw9pswhahb8wts4o',
                description: 'czo1r760y6276qu9n9k31hnmsdz0dl2payn00l2jdov7tqu7jzvy49uooth73gq01xvmoj0oyo3v148gr59p5g4bvofuyf0bf8vc17ft87h6uohfhhr5pt6gzofuys8ch7m4q9y0sj41h4u9f0pbavkg0as40nvfw7okla3njlzhq3rvmd0ppws5o93xjp2jvgdghagari9ddpmj4vogouokovjkcv47xfqhbzc2h5ef24rynndwsnudkrrbdzf',
                application: 'p29ig7juk04dcnakq6rw1z6grus9u8vipib5utw0kwf9rb194spay55yvh59',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'pcqrzofizoj6sqgmrimh9ucp7sfjq3ws5i6g5wx2',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'czszsj5deo3qj6q8n41wkbzqju0td6m7v288l458vllh9by86p',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                
                version: 'rwwaxpw3jsyu3evmxbym',
                scenario: 'k5lbmawlcv37fnpk4o9yk70v0mplhwmldlwzie0jdfhvsb67kmz9mi85xu5u',
                party: 'zymkoi75l15l36w6sodbfof3sckinqltqphlerptguzdijrm9zl4bdcjn0mt2rsrbjixy4wbm964rash4ijzrnj37zi09xr8m6gklqvkeeeymmh6534gnhwlbmwb47kbumvoay50qcp82tb8hg18wnxozw1xx42n',
                component: 'ahuwz0dvaavvciio8k70mm3xrzvvvkj22qfuadhgiwi9bcsdhgqaiv9h77x8ftp0wwhehieljsv2e4gi8wte1gmlkjojf879li39ukm5011nb4m9fukxdxdv9b109boi49zjwxfb0ua64de013ibr84hx9565wac',
                interfaceName: 'sxcadf40ydzothj6iy2f0nvb1fzqv3e4c31uriluxsuc2k8kcezqdbfzvgsqv8qkmzfq2pgu9eoxc7xnurjssjil8jq5p7ybz0w82r22zr5p9ya6rggw8rll952thbkwlafvj9ileizcevmbbam6kkos1oc3pc2l',
                interfaceNamespace: '0cvt82ibddbiy9lr3l5xjd27fphd1a815t4hlii3pz4pl0z1llevj7bbukwur3smyge1nxk9fnlctcyhfearrzznqgerdtoafptw6va7b8pes9rpwrrr57s84eq3dtffkg1lj548s790txrov4h7e9shwyhyhhkj',
                iflowName: 'ro6r9ia6gnslqpig0oovzvbylonnxg5nw7c6wqey65sokp815woiuz1uydjzmue4vnyjf78yp75jidt637ff90fommkhxmtdlpruvg0c944p6c9u0td8ct9r28icgltcuxh9snobn9v6gp0odk54226ud0swbit4',
                responsibleUserAccount: 'aadzo9boa8vi9br7hhye',
                lastChangeUserAccount: 'soch5qsnelacy81q14pk',
                lastChangedAt: '2020-07-29 04:30:08',
                folderPath: 'nfozwr2iubu4uth3fk5bdv14nfdkchfubh9mj68qimhqb7yo0cmmn8vskb7jmqjn96y730f35yecwyx9lhyr4z9svtq97suv61wfd64wmg8d22h26hxdu5x1o9yoo7edtqy7vi7c755mme2vvosqidwimrvr6zhri3wyp9j7s2qemc8h01eloshuxdb7jtfpb4aooa9rvd4nvan8bop01twf9pn3s8utertrj9l6h2d2vb4d4ktjzwstkhmntw3',
                description: '55qhpgmk2u6jrg38d7jnit9jd7lrtd4mvx1b32p83963dg0v1miszc6hpeq13lpfkj6v5o3pinoncjv9umwg8kgo0x08teo0r83fonb88m5e06ffox0dgcrcpufzsf4rcd7oxrgewif6n03mm5c51ogsx211eepvo0j22r40wro80ia7j6he7x4cwj8lainvl3nx8b59so3a0wzwccngk820rk2hej21up2zh38sefus5wks4907kge86w1arw9',
                application: 'kq3l9ionb8l8343ihtb594vv55iq2kdefp6iwshjp5s2pqyosp7523ns96o8',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'je66vz2ytsxg9oigel50kvly8tgqhblwpzbc8dpt',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'bcwgkm95m5phu1274pp2vujmebxulec7213ev5el39uv6ly0n7',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'p1aflf56v6fjb8j918v3',
                version: null,
                scenario: 'nram568y29o6cnvmt9y7301z7kv5gi3c5oxi3lt90s2o7f8p5p8eaf3fybj3',
                party: 'm5hmctovxanl67cy6vkk50wryx16s9wu17tptz0aye9dke6m044hb4jqirr8debkm95wsxn73t0cw6xnbp1a5dn8lyxe1aqc3z8ndybt0n6tysf7if2nupt725u8u8jjex2jxoy99ahyj1apumo9ewgidygk7n8z',
                component: 'vp4cwq85d6lmppppkvrmqg7kx0vlw3li4dq1v3cnfbyygoxd4433lwip7qwdz2riou89q89q0456l0sovaz7mons60ebduak5nlllsf143ltt5pq0izlt4uytvyqnulim49h9qybxdta6ea3nqlvzzydyxdq7xef',
                interfaceName: 'l0xhh2lu2n2d2h6x1ilrlyobttdphuo7y621hi2lr4jm39qu2nx9vji8py99oaduvjqp1d43v4wj41nzhvnypdacoizd7nhqotc05vg0pr72hulxeqf7nhym64l27bepyw8l97bti7wl3rzvk6ulmdwrcvfw20y9',
                interfaceNamespace: 'gzgwfr73msnjn5ol2p61i71cyar80k6s2hxft2i8j27qehawpalu1yhhx3pvgx4dn356olg9r0s00c9oww9dfgm4bi90tnitgmvswmlsigoq2sersman4ykv417l5358f63zlzkclmywihbb7yreejpetp9gzj12',
                iflowName: '1omneaik2kpagu5tk2n7ki51orf7mp26nzxv36p35rc50oya4xm3zsu5njnnigghq0vb2qebnarvwwbgf8qdlu2h7zy66y5zdfyv4k8rje9uxvq001378lpicq4atjvlpi1juq7p93guwf210kjb3moff6edyh4x',
                responsibleUserAccount: '6pko50dfejib0cy723rl',
                lastChangeUserAccount: 'msckxsh5ig54zfbip5zb',
                lastChangedAt: '2020-07-29 13:22:10',
                folderPath: '2yyxzgkc50wmvbjvnl6yflcty1k7fzdnkptnuut03nhnzsxy144tze3iu8dhcpets93rybmmrvvrg3gzyv9sfn8315hvp9xyvdgsksbd65q0ejdy83x7udbhrohbgrv4i4b3c5ii2syqtgjbx5h30uyhcqf4qi31lkctz1awh7xbventldiiqxz8kzx689v41sek7c5oqndujo7b1huxr1iw129bi0omgj8k2zyp5ejnudqnsjtcqwxuvr6bvvx',
                description: 'd9tpznhunyfuc8btygcd7tylhuo4rd1r0flevjsq5le8ald26lc60v43e8yh55c8mqq2ip5dx924vrr1jqjtp9onwg9v5xpdgzde487y5q5mpnz92vuesft4oy57agi8gebgj88y52njuko0gh8a0itb3sy6j2p1ie8ya7cwhmpi65urkhq2r2weyvypa1ztwfmsclq5o6thsi6zefsqv7joskur3cz2d7wvt5k1as2ayv97s1y64x0mt6wmrgm',
                application: 'ntleenl9kxhmdyho8bepl0y0muxl56u5j70ey7dbv8wracubaf8bjrqez2bt',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: '5rujcfopj4wtg1h31c6m0vxl95ylhvjkdbqrzptm',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'umesdu7xtwkq2wnzk06xqpeg6zbkh4ksav1d4xz99hhyb9ifil',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'bqqso8ku4bgu2fx1xf8w',
                
                scenario: 'aa0ufexgfsjbo4jccnurz3vymby8q0ihjn6sxjqvbr9fnxtmwrvn8yvatoh6',
                party: 'xmrpuxdgmwbbfjmfc65cfx0fv393du3zesc3znyhp5t2e4v8q1jm2m5itb9tmqr8oc3a0um63lu0yfsazoiardti7wchrh1mkgj17ck9s9qg12hh49ukam0gusg8s25zs6jv7jsxq2kmjb04nd5oq3ivynjq5sl3',
                component: '3kvah6imkeuazuadl3yfbvbf5fn9mac2qvlha3xzuzyz2bpruf4qwi91ow01d4ew0c8u4fa618b7l09m6oenivs1wvdielukg7i13hta5fkrn5b3nijuohd1xa7ko2tbgs4ps8uomz0k47rrtit9y4oppwqkbv70',
                interfaceName: 'jr5f161dvdg22m96lj40zjvin58sttsxrthm2tahc0atifc0qz5wef2hcnj34cwtghvsm10hasktvs3i9hrb22h5n0jocn17jv4ubzzw3rz6hn8arrv4v5smz7p0pmbwo9o67bgbf1k1tns6uq7gx9k93ce91631',
                interfaceNamespace: 'mpe5wtf03ox8ihuuktr5kw4twjys6bt0w89zaubrp2veyy5ehcuazjxc04j2gpmyrjiv0rdh3tap447ozsg7nap0khawricwmezc3a1ahyuptb56bua344m1rgg91zfaaizbuqdemb1yzvw52ikt4kmyszq68gy7',
                iflowName: '9kobzd2b8bqg4zfrto0814929pnpo5ssq6tgr6d1un5t74ua12hkky3sfbvbj0t3fs42elkzh1w15w19jo8jfnjyj90k282pkw01h6nrgojh9f3se7h6g3w2siubx8e12ht9jnh6yuspro1xdi3412rh60fouxm5',
                responsibleUserAccount: 'uwc3getjw156w7ri048a',
                lastChangeUserAccount: '5mubr8w1f195p3qgqy8s',
                lastChangedAt: '2020-07-29 06:06:00',
                folderPath: 'sb8y6cuabxjqk4ug7yth7ft846jo4etdmg7kp0we88tnt7da62dblp0trul8ltz165gssydxxiysol64hyng6q1req3zymtts3okzs4s1vpjb11x9bdz1blfggpzntva9c8ggbe6kjssafv560sy8vhhs08oa6k2hzlb6e9g1u97e8is5ei6q1zts6rk9hh2xm14ibfmjnbl423x18lh8rj036n313fe1ndjcyt0t4oa39h2s67ssly2s5m3of1',
                description: 'cvk8x3w7p7n2s838eo3md1hyawdy648rbm8j3zocss3spdvqwmwy26ux2l10ytfdg7z3rfksmg3nzqznd9du4uf670hpebs6flhklvscajqtxubui5xiijylq3zfh1g5hpat1jjqwzk5j6ta33pkeftf90pv69ajytik9fmfjanoz3andef5zrvhgn5hyfs46vo3vkyv2qrm5vbne1kdvpjysuepdd4f22gw0qqszt05ecqg3myt0nmyvkrglus',
                application: 'qqqln7v9ut93b2r2mscmrfjepj98516v42sqvmgl2m1lpwrc6omg36t31o4l',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: '6g3edeu2yolufspmouy0t9a5m66iosza5eajpxlp',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'j2x6i7k7ifavvsa8mrd0dukg9k8nygm0zjxzpfh6lb8ykmvr40',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'hmqc1ky2yibw337s7wnl',
                version: 'x0lcxigjzr7khtva3vpg',
                scenario: null,
                party: 'oktg5appmkbwsf05lmtzdyl674rs66cgq16ta353jrousgznz3fykk3pwvni88z8649l14g9p1of9w2gt0sinlsqf71snl1donuzqsc1760z4xbbcn35ka01p35f741jiq7ijacyse4olvibrrdql03ne8ouco2p',
                component: '8pq2k5q4t59rp5lqxk4opmrbwsz26481jumi5eqnuhdy39tbecgs989vce6zqht0yovox6ygfuc35n16mduamcvzhoyfujjvkpgq0gzn0tnvut3ws2cdles3qn0lb6hrhgvp2qsikatrzfx62n0z8q2p4nbxvvb0',
                interfaceName: 'jddwqrsnpj7o23h2snd3t9vu9tcc3yn4vxjprevl4a0dddzwxxoh1sdbxiha26bv4dz7eremiycdoqg0rp05bjh1mql00b2i6acd25wcnwqiqxghip4elypn7j484qh0pena0cy2ridxqwlgtid85hoji9u5yi35',
                interfaceNamespace: '5e22jq38sllq1fyc3la1ehtyyqjzmergywac3laoqzbayhp74bq5hqk1qz01s1d3y7tkqo1259ljols5eeslqu6fq1aprc2qmxvdushqrrzbsi71oxagb5pi4s0mr74skfyim8v9eu35ssbnxo1iig7b9l48uhak',
                iflowName: 'khu4x2iviqck2goakpkwl45q2r0sjg2kpa69926dwlbxv99rxyyvkm8qmeca1mzwnnu13ud6fjmcpq95nb2jksw8pneh8nd7ll3xoyv8x4y6vrxz1w6w90uygagqhl90ub2wb7f4pglzt0yka18mhybwf5w9nhc2',
                responsibleUserAccount: 'kzk63qpr76qddfdxf0qb',
                lastChangeUserAccount: 'faikb5afomtqey9hv5qt',
                lastChangedAt: '2020-07-29 07:16:24',
                folderPath: '526lhy8pof2hybxlbp9afy52cr310zsev1wjo9d3d3d3cfemkflf5luzau4m7fd5yrlqu1mf8qpmmw5pohr1io8buuztvx4kjfbh7dl641maotqgai4rexkam1atg5hh731mugdk645az5jvamameasowf4mze6q94nyfwyexqnvazmgq60wp9edlqa0aqnksuheyjhie6ljdwckfosya61bki7cuzvngvfko0f953xsyosx8u7tmb3zsocbixa',
                description: 'xb6tczo43l598yk945tse6u1vlbodq8w2g6zhv32e1ur4kiutuawnmicdfm26n29thzmd5hyaf0ynvvxwgz2c6nai1ovpkx1s2hdpqvgephkl63hv9d4ht7slc6vv77gnjqzeimzl74ux2m79m8csvlz29ul8ntm711qdy8n3evtb9s58175wj8a3qpnh7xeh2eew9mtmppulzv6kfqjwfq0nuimod639rud855bo7lv9r49dmyhee6zdxdg2m1',
                application: 'fgibpunfhhhob7lbpaf91t1lh6v8om64dx2nqo1ibcorhv4w1rjnjlzjzon5',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'ofdl9abmca7z64rn33t2hzshkuvs5asz84pfkxsg',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'z13mj81nufhrt58v8iyms27rkpz2mweo9gvavmq4p6pueui0hs',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: '6xtl6tipki7m2nmh9uhb',
                version: 'p39iokkk6gmz9vgclaqg',
                
                party: 'erroj3kmcjb87vraruhfwavmgmtpfypo1e1vtufj2860kmzunhzwycv7k3sso1a246rdels3vi5j5en2kmr3nee4d8if6kulno6yro5p9u3ca66vkv9an9hw6hkk0u0u16fj4defjvh7n3d74cw90gd3539y37ab',
                component: '8p2qil3e2ml7fvc0sd16lqh4d4hyacembd3vn2kre08s7uwm90zsn3eickwy40i51kdmodod7jhy7qf49sm651qb5ntzr1apitzevm71ov64lo2409qopc7p03fvkujzvy585tciael3asjjgqan4glqnpauzvy3',
                interfaceName: 'wpjw3ktzxzdmti8j1ndmgs4lgn8y8y5ysbpgajfu91dzbf2wnqqcpcu7uj2xrhm1ze6ary2jjg0ecbzwku7c3kh25s1fgvzybn92m0xw0gq4w8cff45cqp2z5qyjtqmflrc95cne7b4ty3e96ghd9fmsei4b70w3',
                interfaceNamespace: 'uzephxomtg1j4meez4j69pd560rgiufgp9sgb49tszbq5lv3qtp5p0ryfdmgedudz0bld91i0pq7e1zxc88s2suldmgsqxbchkljacknua3a8yxzxq875h57sim9213wi9czbvs052trcdw3aluodqyw54v5n57p',
                iflowName: 'j5s6rprh75y4inhm5hco12c38vyn36h5maucgqlh3wz5r9k30nps1i9d7sk802pc4yg4dgpyx24dfzu24675bjpyrieh9zstbn22rc6ypyd7rue1qkl7z3w434g5aiwp423dj6nhk7lnnv8ewcqbij81p4tzrwim',
                responsibleUserAccount: 'voypclc9yud5lcia0dag',
                lastChangeUserAccount: 'v0vht8gm3i5invnv2j6r',
                lastChangedAt: '2020-07-29 06:07:25',
                folderPath: '1jvddgom8c9v71185udpwupscf9l2oudk5rkv3ivd1cw88cqjio92qta26lfo4e369o1675mfbpc64wqivs9w48biuo6x7xqj2lom13eyw12y6rw9g83w9go9vj31n6zt9bntkvk2joc22jl7vpuud6imzwbiy60eljzmgnyips3fcelqk5ahfswmw45lzk86fw2hi1hn7aitgvc24tmztpmn08pjcikusrq56e1bz1r15jvy33akm24l221exm',
                description: '99013f6hqnlx38mt3r0lvx8e49f9ok59kqbqhtoh4esr21xqn6vmxmlem7vlb47h9atlqclqmhljo0kvepp255hktfmm53i0ejuh2fl2050lox0y1zfs1eb3vacnsrsh8gdmrgh0mk29722vqfki1uk8i2t54ovf20ibw9nbdrt343qqe25o3yztde8t7rcogsa23th9aj5uza2q3orwk01ahfslic5fos5mnktbziredof2hejyof11zmj78ik',
                application: 'ktp3g89go8l5h98l5w6qckj7lril9zzrsx8qbjfxfn7ackdunkityag1kk1c',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: '2msipm7ateq1c8sls8vyf8p5kr80ofqx1vw88if9',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '0ynn6906562soaaemt40h2510yqjik55pako774qgvbvyglfe3',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'k4h5ov7zct878jlv087q',
                version: 'ys5ktkft1q6fof8ll6go',
                scenario: 'wtj7m0ohubzuoflow6rf8tpd967ps19ci0ab7b7jz6guu3wpiorvzcs7iexe',
                party: 'r02suoc17lteiwda8mrap8dz84o9okkigiaavtpmnsd0unktqoefrm30p0xy3n0hxdgkmutndkdvird17ijna7fxk7smk859icn7u4js61al889jqiliyqy5yc7p6x1atrd7hnuwqqcqxsn7zc7dzoly8l9j8n7r',
                component: null,
                interfaceName: 'n91iaknloxibfo2jsmpea94q7o3cdqbhmo3ofw6iof0xp3n1zt7sleh4alw41r0zg4v0pbzcyjcfp7xg6b9k21xcc5nec2vup9og2rz8d8z3spmozxvwzy2xr3q3q717gsdlrf6jllu0c7kyzmmmxo9htbqgtkzl',
                interfaceNamespace: 'k6ihvu94cxzr5883wu2lpcoc2qnup4zvc05jud59embutp5moanhuubdtr03xtg6fs0dzvau050pskkoky8ev5jc4io9shfg7ugtbew7bbjcb3l7kp6o3mfbf2m3eexru7428krudexe0uvsxaezev49sogqjxtn',
                iflowName: 'l3ps0umd8mubrd87njomvj2m0ngheo9cn40xgeb47pup5of9cizrrymngbhrqq6ibdddljyh3w0px325sbw279w25ajcftcnjz83q4u48hhotkqjg0pyj3bxskxvuavtkmruoe7dnmdvgze4hyxccv8wunxnjz42',
                responsibleUserAccount: 'p5h7n4yc9i4kjtxt3jbm',
                lastChangeUserAccount: 'tahwotwuv9ujx5p31v6l',
                lastChangedAt: '2020-07-29 03:36:33',
                folderPath: 'gfxhdahqs78tooyya0fjw216h54xtrihmtx1cxyd872m767ot6j4u61amtem6eox219kc2wdywa2sbezh1sebowp46avgsj9c6pcehw5rdt0amf4wbh50a3h0lf4fqajvq2jtxfsnwx3b6z776zxmbcqgtvdn50jgv24np781sx97r26n0zduagvxnympjlochlo5zinfc3qknd5rr3lo2bgz466bos7zhj5u8az89upw6d8rhcmlarkne7g4da',
                description: 'fvnyuksos2q5k5qm5v2gafzefe1h26yvjq0li3vo6n0inxwdqa6uo3irt692sbai1pofsttll6t2pn1ujrlbwgivo09orbv6dsh527m9qz5srozohaf19nhknhqoa9emxrssivl6449dz9ms4xh2ndhqz6628382bq4hp9sbtsu9voav2ckewsdcz9j8mu31pp8twlk4wwpn3con5scrjs3bm1zjcrghhdd0muf6mt403ov6jqio3glaz639wim',
                application: 'yr018z321occks9kzvq7aj824hfq02yxkc6k79a57wbg8yj2rmjtvw6wzn5g',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'qd8hmegnt5yclmdz7b23799aphneog21xoe5dx75',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'lqt857ymeun5o7qvaxftu6vr8dbcmf1s6lwoo78z25apm91k46',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'vtpcgcocpeg4o04ptea9',
                version: 'o6ie8l9rbi12cbcpik2x',
                scenario: '61rvjzikmmw3ig2alfm2i76tbfu50xy0zliu9yto7c897p9kva62w4xtnlcz',
                party: 'ha0jnf8xcdxi8uwypwolcbvx2omgxwaurbnzpq9ilgwxik5t52brwo19et1l7ji2eivlh0skh993j4dercyq5m5keko2enp033ig7smgbj1metcvfkqxdb68p4ujk4xw94i54adnleeeoa46mcmn8fhmayu6cydh',
                
                interfaceName: 'y0d0l2qmk3ko7eztlqxz3eo0dwa9dmudhk0e1dekjdp42klbf91yj2fsvoyvk347vtkr1n5ggnf3sbierzc8boshm28j696u4q5g10nw2299uwk0rtmzsf1wrwtqbnfezxdedvtfx7yp24zzzyvk7e6jefk6g418',
                interfaceNamespace: 'nl4cs6mvfqskpsyl8yaazjcosczoo4gg9xx2arebaf960jqpbr7jb1pdq43gmx3nedhoidni7xyhuilvs8rj99q7d8vmzhft01cidl1534wb4dlaasm4hst08ytowxii4a744we179z5fz4l2g2zc9gqv7rs835c',
                iflowName: 'scoqcem0qbjnq66pfzj5q6816hdf504txzx72m187i5hqhn83fzhbuv8ipqrlx4njnyaakju8w66oidi1mtim2lo6092epoold4zoen6ilh87ha55ge4rql1635lwstbnaofuzfyuz9zetx5wame7uzlhjq0hcba',
                responsibleUserAccount: '3twuu0ezfcflufjp16hs',
                lastChangeUserAccount: 'kbzv7iqo7ugh93mqhib9',
                lastChangedAt: '2020-07-28 15:48:35',
                folderPath: 'wphujztjmgs162xoj16k3601jzdy1ropn2bhamika56kmnu291rzcp8bo94mj62ky3czjdw184m31096ov19vynspvesvuuxp7en8juv0jlnis95b00sbykdrav3i1et1c25v9g3hlhwh1pdb8dnwno4l4ulx8hv45kh8qze74yhppigfj8m63wgtcxjs1m4yl4krame4n0nvdcmg9k46qofzup5iayzmi7ym6d2q17b3c8firylxf7bid2d36b',
                description: 'o546pbi2669d6pvyrcqq5rcf4doul6siwn60okmvxwm66y1evx6xupw0qviz8ay7ot4fi39rwkku0fjzacsmvz7k0jz68yh5d8mcra5wd8n26424j59kyjklniepukd3409mpzf0efbsl00e1dn4qfwjc34gg4svgqe80yo8tdsm0xmdkrwtrkley5gg94t00gzf03f493uf5txzjmq3j5v6haxe2nma5eroulacj0t8rtav5atsf8ra75r2no7',
                application: 'u9xba2e7g6x79zmv4rb5lr71ivemy6rz69jmmf1644oecxqrrxfo4fo9q88b',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: '5pu7vj3sp93f5wrfeaxn3n1bjmcd1ragnfznka2t',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '83jj7tha18sf6hybwo0ykrlfmgd37ae9tytiuen4kio5i8o1uh',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'jonmlule0qn1bnhcoou2',
                version: 'vfqzln60m4voleobfocq',
                scenario: '8d020mp5168tv833beuyhlyf8tx6hexi7hfwr265stw7bsrv98v1vfdy1axf',
                party: 'zdxzbak3x1u5ffmd9cptibv52g4qnemkoyul5bw0iiw1kzp0b8424adt506o29gutskwyhj8sh11ryd9t18hpp8ycz0zwb4sn1q5jo7urknjdk7rflpltafbgrhu522btz7jig9hsyzx5oy8bw03s4jfw2gma0fs',
                component: 'ky5yf134mp0y9z9ev14528q6yz9pevykccfi7o3sv8tc58aq2qqdxex84i150kyu5ui2yf3m0aqxarp4whvl44mu1f5zhykx36re5g1vmg3944els5a97htw6cbbg31zr6kv60rqjpyn5u1pwym5dn0aalz7dr6r',
                interfaceName: null,
                interfaceNamespace: '6p8s4hnrquut10y6s3dnk0atybb4g8m0knwz67ild5owjb77pfuna0y9ji5izdjiqlnsj1ugn4wna9yn6pigugxn0wvh3k00ua4d3sqcjwt3lke5dnef9qxtriq0zom8lg5n28ctv9odwjf6wmt8dp2akw0zea6t',
                iflowName: '0dxl3bmlrlts4jy4l2qnjejhbu9xz7ek4zrr2qxuunsdpnf2k8qia1w2i1gybkcy9m1gsn4nm4yxqwistk2b1tdq9o9ss4fb8pdjby74pe8h0yh40d5eyd3k0mjpjp3rp9o9gxmnwsvjci4cryuj84udzkp0k637',
                responsibleUserAccount: '7h3bcbmrc7kk3j5imy11',
                lastChangeUserAccount: 'jf6x4wouv0h5emy2lq8r',
                lastChangedAt: '2020-07-28 19:00:45',
                folderPath: '4f9wtijhitx8urw7cypvxayjpl1ti3hl56or6mllu03vya5m68y6vct5u4i9bd5mqt05mv0lfnpogrrnecy5mndljuno356ir15u187diaqcinbr1h4ytnlcvk5pq3c7e9xt1uynikfblm94ufivf4z4qvyu0htexdl4jlvuxdczp0j6kwajxds27gh0wxkrewk1wdc471udpg60g4kwppw4vf8btrrej5eltktn4v8lpaivnhdjw92ug2047lr',
                description: 'f30ewcql3cnriu3rv7kfz0m306y5tb702j12y8qtfilxmp16nd684gylfg86etvahkyek5bolt494kuzh2ucwwjp5hsf4nbt4ftr7128tgxg0vp8pi7h9z8e4kr2petot53vp508p4nv6m47djznql6t4w7rq0owtt419qruqgocs63n23t1ljajgm0o2baaicwnnkw22l5rd0mjluqqv8paysv5s1075qm804ezi9e6jnt415u5bfbyiyvc9og',
                application: 'q2kafrjbo74f18cwtn3ihd7ktnliz2rvpaoo0gqu2crbxwaeizngckxypkfu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'kpiqfzsmbp7wsd6l3o66dqqzc74etway39iknom7',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'xlpybysvpk1hpn8g26snygnsyeyvft5muofmp7bhp0q0n9ww3g',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'k9x8y8fccc47tyn7ryih',
                version: 'tbbxi8eoljebwz45kw2g',
                scenario: 'lf15v7gllvodz7zz52gjpav21jpdsywvxb6djk4agy7pzcz7ida0aaozvujx',
                party: '5mrzprfr66dsiemb6auenwlr1gj32x93sq0232s3nhzexlzxwn4lbhuldc6wpod5qez5pfa8kmyd15t6g24kmzt7muwthl6ro9xcf30nm5kc1nkm0xbeyhw423v08z9atcge2tbz5n14v2lct6xjgqt6pik9ctuq',
                component: '833fvv69u2rtsmqe0zu24q72yg74tnpj88oir42dbg8dhbln3zs5ypsnjssrwtzex2gz0t3w7oh8pcxrs7s490igcb3f9ic0auirxgm20u7hx3ghe6qzsebqdt7nh0jmx84vammjjouh90nityz6jilbonnpc8wy',
                
                interfaceNamespace: 'e3x6c30u32r6l2ctzmct57fs8fcalb4yi9oi96ldltddlhxkhfsszud21j885on8hlc3dkdv53shzwnbje1rn2ldoiuinpw0zx5e2ut4ua97af0tmmlzwtcxhjrt2l3p4abtzawzi18fbfhygl7aksipwismbfq9',
                iflowName: '3ky3brnc5ay8w9ltsio0m26ezlq32s0pvf7vu6bdg7we1l3o2roh3slwsaqggj8t8i5q6l2ks4lqjlpljdkz6519w2w8bx7vlbx6gl7bepfqwrahbiskawsxvl2m632coxwrwou7abe5a3ng28zkgfah5y1e58l9',
                responsibleUserAccount: 'gqb43rb0vh19v296dmua',
                lastChangeUserAccount: 'esyrl734hnhtnrp8dt43',
                lastChangedAt: '2020-07-29 13:21:40',
                folderPath: '653cm3rsd4jqw9o6i8qv64c8hktri3cn6lp8fjrocx0ggnh52k8g3coxrg4ej8dqqbb88dikdioobrgkuun65ky8otm9mqajs0y9fw0exwsefw67h2p32pp6zisu1efi9w1x26aaak9eedie3dldjegmfmrz26iwknc15yiiygg22e3cfrck3ukrj0djx1tlsmpesenavv1yjqtbfu6mw1v5r4l6s1ckeycxbn8tjuaet1086b0b1ujiyaq1tfx',
                description: '5bgbkg2n1pin0xopnya7euo1whdt1hc6vv4irrxakx5fcc5ks0dc15o6bnaiprr8s2t730kyb0dzpz9usay1nr9pulnyv2ek38xbgr6hbbc69ikydkuei88h0lnf68sgvqt2s9kkb9p5dnjj3nej6vfy33r2ppyak7cbzzpvz791gobtffdar3wt6czxrl2bwiwczpgg4rnei9pmr9szbrr8iomt6a6j96ttyeikze5xhdg6ht91y1493mtk2an',
                application: 'zikh1r21q9m1hg30pmo3cprrhdnzm9o78xpohjs2hkom306st5ptqqnbuvsn',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'gsh8xy6y2oyuqsog1ggu2avzl0kfwt70pbj5oxp7',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'd2fn4faijr1x0bgo35xyi5zbnvtl15t6v0ppt0ezlwsz3kzs88',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'pgnlnclz4bpcjsv71pr7',
                version: 'myepl31lmlencroqq7t7',
                scenario: 'egl2x44jy5y6cfv3x51ts7518krxczpt9joaifvdl9hm0c0h5miyli7iyss9',
                party: '165yn9dxm19x8ytvzdv4s4yu0wnrq29m8pjur3u02377093e089t91fjo0j70agskqmvpzc5695pqcxnspn1lgtqltcfzc9budt8btjbk9k44va7266ovr3ewclfa0qz5mgvj0qu92jp4xm4snnerjpkn0cjbuv4',
                component: 'm43jhabgvvkg5micihkbq35acx8l3jwunix7eqvtvqtlcks6g8fwyfm40onih9szd3gymqz4o6uv491go6yrn0tt0wc82a37c2pgikuhjmewkw9efb3jxwu4io2wkl6rmh6sbauee9lvacozgh02xw985q0mtc4q',
                interfaceName: 'bjox9cqpl7sno223jzeir4z5epyy5n2qbwqbdozplzvw5hw1jsfp9vj3kth84ly2nkm7ac82aetxtqqp8y7jx8mzaqahxn90bfu89bkyujp4ouvpkafpp5t57p4lob9kiux6hu3q787ft32lqd7cfk0dw3gpdxf8',
                interfaceNamespace: null,
                iflowName: '7z0liox11bcqqooas4nljlpk0ss1pa2m6wj6r4yzqtwblqxf4qf6b9n4fymhswliraa3gohnky1wxk9jj8t0uwtl9kqtak2kmxleno15hto5eja8yhnzdc8c1xy2kdav1i4gutjgp0r893odd44kkum9pbpa0r3h',
                responsibleUserAccount: '82mu4biwxjumfbsicqa7',
                lastChangeUserAccount: 'x5f4psxozdk37upxpipd',
                lastChangedAt: '2020-07-28 20:16:26',
                folderPath: 'pb2sz92lb0kyfk2sdkh0k8mpuuzji3abzmjlm6uby5tpy503j1nbp5mjmqhoy54i38brer9fuq7x73w29puvykhziyo3ih88kc1ay203qu8m1ru15reg1ammtftcixnyoi95icckhva9yka3fow610m4ylzco01zcwxxeac52ihf2bt31p3nah3jbv61a5wjqvfkymnjd83t41h5210qwaj5f0t5c10nbq092dlbi0h2bf8ovxe9xdsbt8xjdki',
                description: 'nk556g1qr8aip5rv3jba6xjcajhrexo7crqhxqt3p6k09utxlby5n1nzsgbiak7a7ggsqvhgrprnl7w9boeyjrz6rff0t835p1sy79y480u94d52p0i0qvqs94putk6bl4c5ec53qtt2y8y5iazgx5x1491jkac2sjp2ahknqx8ueetdwohqtk6qi5b38tphwsz2xmvurzfh4oztwjnhsbf62iv088l1g8i5245jxvcsh7qyd2q4kzeg2vsoh2e',
                application: '39epx32f2g34bkfr60nbo7dixg13u2vcz7nikyogfm43mu4t8yx6a113s28t',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'xmlz9ymjthvolkqdin7wg60785whs5et1rjlce47',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'rsrzt6y27etgdb6ofmz8xwykv0h7txbn4gyuzp9joa6rtjyar0',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: '9brj1pstaxfz37v1zebp',
                version: '30sydosbnar0w3yk9v3y',
                scenario: 'hrqoc3w8lixix6tlezohqsw7br7eewil49xbhexdkf71cud52takqum3cg4n',
                party: '4fw9am4q3fyjl24t5vhpa1twap5iiuuyicvo3ia3rn0k7i4fh06690env97jqoxz4iu33ecupyq0a4fx60cb2g3tf6h266j6xaj2m0x25g24zhvbhdpvmuzuz8vt94ltrevqdsnlze27b15bnc7ary98ruoua1l1',
                component: 'fabqchiftr1v2f919m1jqxgyqxeqow0depupegjk69bvkfsykhhuxhdps5d4uqgkpwkwf2pesdsjgxikjgq2fj8tibx22byg8d1es6q6fe0nz1r5n13gly3krku1wnvonada0r6mmt7ys01re17e2yi2jlrcp8ft',
                interfaceName: 'rfk8hmr5sp6yf0jvlappv9grdjuwy5lj1usv9iuqnvsmjemu9oxfeiy46fq210shh7yeyafis75o1s05is0g836z0fkqzlufgo1vtj3jlxecmul256stw48cjbgtt611obgytk9ksff15k2zu88qsntcbmbi2cjc',
                
                iflowName: 'z612r92mk0rzj10vq413fsbe08xmitrrom24m3tpr87m9hvcl1kqw1im1rg6f94tinbzx1rvyx26yduar52o74xix5nkwoh8nw4y8muuhznf3chd4chtfh16n79g7rbibpsan7gphyqvtwl4r2zy0t0qcoulc5kj',
                responsibleUserAccount: '4p99rg5hei5p0v4ne0nm',
                lastChangeUserAccount: 'p00o8vi155zsfsmbikfr',
                lastChangedAt: '2020-07-28 19:17:16',
                folderPath: '018hauvrhyd6e56un9ieacpv8o9nun6hm4x2ak7uudwkvf0ujjepgnh8s1ezxjjtg3ng3cmx9w6pdmvcvkdw9g933bfndvcnf5fl4k4rni6uqo69f6r7nmm2nvfmly9lby4klk9jtwphqsi4hnvs8lvh1xwgnq09ot3suw5s6dn239pylv75wq9ebnb2haiui38e17v2kesf51bqce5nskw45xyf7jog92u6jx70jj8ckh8i7z2bbb51bzr09k2',
                description: 'w9gyqobejeqb7nbxrwr8xw7ma12cfy35zc0em7yry63yiccyswjp8236m16inzdfw9ofyvwyhi7j0zot9ea5rfydakf0gny3ad71vqh635gomkl4bl5h0jr1c4i9wehqwxst637sr0eztib6vxiswggzb7cy01xytdv68n4lssasfk3kmu526mo19qngb2n23x95ib5m7w0v6ntl34tiz1kgtvyn7czjoawonq2t79yp1d6h8pth7nq8g1sfe8a',
                application: '2o7r64421m9y00pxq6xjrf1gqg58ymhocv6linqbr81lp3qdaafj6c7ikdje',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'jbg8ea32morq2gkqmdti3binw7novepjimtr9id8',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'ar98uii3mj2vbmtxstss5dyrng4v4n9nh4b5fsz8pqcjnu56ey',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: '4kclq259ia9zjpoz8s5f',
                version: 'k31hcz2epdo1fl6cog47',
                scenario: 'tprfer0bm9aqvvas4v6d8taptnfe1k7kq1uphcys6pnoca16zc0sfqqecekz',
                party: '2ok4sv4t3683bmaw2xlvnlamvdjry1m8o98v0jjdn699qpje1uhswjqqu54aw8nwv5oeiompbddbydd4hni9iid15j9mphvax6ffrkmcig5xfoz7ijq8v8a3af4o71mp3cm3bjzwbamaxfohmhoqsd8d03rfwnlu',
                component: 'wuxyer1ygshsdei89od8mscmzh1wsp481d9ust9pfwnvtxyxk08tqukumoqgh6ubch61gcwh823g5nj70n8pkdgl2ufdhbj30lti59sf9msixt2wqven9g95kb8ok3uu5mruaw1b30njasswlu5a6fqrtxoit1du',
                interfaceName: 'fa6njai9wtgjuzmsuaxdvo3qab23bqr56jiy5hgwxqz8h1n9ervffp5o26rsypnm3nabjytx147r7spyo1h70p89nsxg86383i9nlklhgd959e7c21g9pho2nw6n50y548jj26mnpyeotmfrkean4dcz9ur6l7v0',
                interfaceNamespace: '2dwu4gx7x0g676zanrnxr2lssp3sw293dc7glqy1r76rsga4vjxrcekenniod7jgf3xwdq0br0xb2wvm695ow4jggjyntjhr1o88kccoawl08rotomhg56yg5isaqkl5i1upw9hez9d1el42oc283gk35vl3i85f',
                iflowName: 'zasv4r6tlyqscnxw3jverori5q2kj8vlw25tf4xgn1gk0sjw8tio1ujtn32k2ehde30vs5jispg6wx2xmbgqui8fci7mle2xqbss1bbpoyji1w2rcnzm9er9mkqitvufio0uflq7urjv0vqwjynx1572dyfglzdv',
                responsibleUserAccount: 'ncvbd4z7zf5mljirvgv9',
                lastChangeUserAccount: 'lom2zi8ogu386ofz50et',
                lastChangedAt: '2020-07-28 23:39:00',
                folderPath: '764imu14x2ichz672nle6bz5jy1ypu1yvi30eu4u1olhj5qrh3x5sut7vnlb0bf0lb9zr6a4mg9y03l1p6npppnz8hy2qsja7vnkthevywwyqj78gbszodfinu1hhwt6utkdwfpugl52fwjm3pa85n7mgbv5jttnciom7azlpwv8sol8teiubngfh6nn19otqt9ef096t8yru9udqb3n91vv7hn85u8beu537h0iy3go982ezmwngwcc041cfj9',
                description: '37u1sit612b7a8ygoe65p92weccvj4xsud7invz8hu9aq6ed1hsk1x8d6k5u45xl6d8ralzeg3oqwiam1hta26nvvcuurrhj2pv2zg8wa6jnh86054pvsxzmn63899ux3nv95kxwixr89u6h82ky1qp6fsb8ttzbug4m5ywu3vfki97wgttl236aaieba2dex0bmiwm7uyold8hcj18z1r2yqtjyup4g4dgvmxzulyomqtmtksc1hso1le6cpy2',
                application: 'yxgkc3x6n0b0j063rkfr58zmp9doz1825xdje2235b03t2t8tmb0650x4h5k',
                isCritical: null,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'waz6y9jw1biqu5ldrkrxe9l1udn6ch583kp0xwie',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'fb5rmu2817azmv8bj7nlt2471qdllk1b3ok03b9am70qt5ensf',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'eo8dkpltzdam2tgs6us7',
                version: '7ajcg7i5s6qw054w0pyr',
                scenario: '6y8u23ked5f2utlgx1rw2oiguseics8xsfznqoxh2cwyxnolvf4etlqamjll',
                party: 'uqimhfxsgkjpe02qlraqigpia7c3joo7gefgwo5ur06pjjf0ytrh72o2iatorzsz8uq9drkk973vei9ojvubyoijz2xynrefvs07sflw9hhtfs86axbfst0fa4ce9vu2slou3gjbeyqw301lv4qpf4o6ft7wsfy9',
                component: '2frnz78waq73llf35lrrn3ecc8c5n6km4o661yq3z6jefqshw5x8lqejyl07x9a6rqbzbnb3u0l1qcw9tii17r2kn6qjp8ecvj57ivnf6zwcsmjjbl8b8bgjk9jmu3s3kq6lmxvr4u6eudvp5zszdp9cllo2t6zh',
                interfaceName: 'wwwkw77urlaarpm32kxhshtlztqc5gt934p461fqmnacxp4jgwm4p1n6f9950se6cjtrdx91b6u7pyv28zduv3v323norkbdzu9va1vb4xw37r52ckixttgf09sz0s4g4d2wx4tfqar9uowyd65gcxqw310nfzit',
                interfaceNamespace: 'wf8ou6rmcun5jdtihmrj1498a0yntmtktrnib86ee10e7co4pb8ggeib270wmzuvp429bvpb626t0lfh1dzqdkc0bmdmeaw3jg8t4f673iqm3eyr6nzu1wizdwk7dowyk8swhj8ddue71g2qwx0km2ihzzxad6rf',
                iflowName: 'wsxe3qh18snapmrfcyh9b0c452xk3uridp0s3jyjzx4uac120de2j25aok06xqw8mzy72f2urdb2pbnuolc3whj6hrtaq7078olc3sjg00porl25zh4ctkl09g2xpnx4rq9aos1erhmstjr4j5wn1no2ebgnaz9t',
                responsibleUserAccount: 'cctjk96hb3gr7vcj5p1o',
                lastChangeUserAccount: '7gjd1nnegwzednx1z44w',
                lastChangedAt: '2020-07-28 16:05:13',
                folderPath: '1cf6rglfcghzjjofetwmjf7l4hayqj294gaim96tya7t14df9r7itjgluf7a8gm3yb8x6u869khxha247buu770zs03qwmzdrehlbtc5oaa553emycpp31mh63zdw04djlz1e70owpezl1ab4ct24io4m50k2kobkh1wwfywq466b40fzxb9n4j4a1ubtg55rk47cocyipg3t4g5b1cnj9vntigngyb5jrgnjtt3y5xsc2pilf92qt9af8ypa0u',
                description: 'kkgqzzbd55sb0zipv9pwt0fevikhr0l4s2snbdgnsgnkybxocdodgrtnbis0yh229st9md0n7d8nfpqq157o1wq90e6n75yrik112em00x9wn751uzi3jxk5hayoy09ag22rcam7xcbs80qza8q0qp7305hoxi16jm4ca0n55d3cs2amfujr0jfvrcd82as4bxses3ofqq0zd8qctcf78o2webbmdzmu27s2yivxrqhdjj08v79a7otaxwm06v7',
                application: 'tqbwxuv89uh03yvg85bp3gljiaotv149e10a6djuayrbn1knxmjrg7qnj9v9',
                
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'pb3gs6tyeidowcndeea6zropy7nst3rh9w3mvg7c',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '7v56bys3hfupbvg5mwv5fv2fcy3375up604yytmcsss4m8vxzo',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'udwbbd1u4qlwy2ctrnd2',
                version: '2yl5v0ccs7b7bi60oofp',
                scenario: 'qs92hkbkg84fpeb9ewnl5dy9bogj0f5zma2cno170kxdxba7a8ubkbw4ijec',
                party: 'tff8tu0mc5hh10dtlo8ys1njy4huffzy2cp0qg60yu2x5grnrq3qgn2vwp03egt7tgqi5box9uaxg2o7ca4r441d5b1xptg8rugzaxezyh91davg19vy1oxighw8anolhwrjpvti8bq176z3eeq673pgnnlde5tr',
                component: '1sntt23ypccqhiw914k128cusebteljfq6psi5oltet8s1nf6px824rqvuxkffb5u0qd61q1l1a2fqrfj4x8vny5vsvsjjo89l4quk85bg88ws7yenve12psvr404xxdhtbehyt58ezh4ivbgkk65uqixdd8swhb',
                interfaceName: 'djme604x3ymqo1nbvl7vhvkclsjzsn3cw1hy4syadmetr525391qo46m39ymtukj5cfn750a7crvxygjvsbtaaw0vvcis5owvyzzq2k5ua9a5e1mkgi2fvo90k8lw3i9tp8mv91869ietb59xu64epmkyhfl4c1c',
                interfaceNamespace: 'ircy334iwh4r996t0xz09bb4ejtx64vnx3uvi7if6nqlatktmqikl3u0j7oa7dgi74t93dmy6zecam5h1rva540tm0msvev5u9tae3akv7kkzeh5fa32qryz4m6oaaz6dwalda6k9gmvjv5uucnx8i4gscsfnpnu',
                iflowName: '7p1uxd9n0a34jtn2hosngunqwbrplp0oj0pb1h0nydvk19j03e7nruesai7tmdefjs642opjibt6ggx902jlh9b0jgbu3gchxfq8xsxfvz3n3yg9v3j7378nbf9hfqhfrd3pbo84kdnge41hb4tigqbv7gvgezv9',
                responsibleUserAccount: 'i1ltrixnvmpvpxx5utyo',
                lastChangeUserAccount: 'ktl0ikfb625poaquvbk7',
                lastChangedAt: '2020-07-29 08:16:11',
                folderPath: '6olc5smnubpp5fjs75yqdd2yt2n4aoss8o7ca3644azy4pxqfcvqh12k0z2i3mchfhl8bryv9ebiyi5v95ogz8c3kjk9id1j8ct1rjl7hsmew5ri90s2hej34yw67shf3ig71e6n74bqhs139s97rdxcwutjx43hwhbt8zj2qhj9baqj1uqkrnk103n7t3ouoi7qnxkpjhup1wy1qjdxm4euenvhg09z9mzq5wwu7ykzhcjrbp0l3b4shqpwe9w',
                description: 'y6gc938d3wzzzjaqapgkf0hot5tm4j7hho0xfr9ryhcgg9m6d22r1du8sdtd08lcll7fyaiv6xns8hx4k7z84oi1bntbmhyfxprn56u5j4gryq6gwvkxif5nnybp49o1dmfwe46w87hrdtoz19oa4kssa5r9yy50v9g0s7jiolfa177a7yagy6zv81lgrbcpin9ulzs7q77izmf1bmhoabvvobkezr7gp98s904j863sdpmzxpkkz0h6c0mz2a4',
                application: 'pgxglkjqmv6bxgve8swqcxz7cym16zgsk4eu5u56frdfpo4cux4hgv3xv2yg',
                isCritical: true,
                isComplex: null,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'cvtqb8hresbbk4tswh7fq8hv7v8vxdwkolosa4jc',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'f68rpj7c8vdmor0kybtdgixezcjqkk79lhdgg8stwu9s57bxk0',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'utc9oojvdq8v8yzwkb7v',
                version: 'rqcwjb70rqfqyoxb126p',
                scenario: 'l5tdao7slp6eth89t4r66tfuj4waoh3o7uwifwkruujfn971m2aue096ridh',
                party: 'fy2gcqovjytefhpapmyd2esu43i1wyfu6l67gpmbrufcfsq7ihpj6bw0qo70ceh5ho9flvvifkw6gurzomv8r7hyvs6a11jefgzp3srvdbr3hfy6cfhte833ceex77c46bxh87l9zy1vbi9al1lsdinznf3dgms4',
                component: '5getuqjtm5nuuo5pjc0we1rsp3xht6e4k6j53937vqhjb44d6ffo6a6u7xklrqh2ikvati1dnw0v3sdft6n3h3ugmt5779xiqhtm1w7kptfl37oy20boqmbu6d6q3tj9eijrgfauhgle6a8ibrl8bqlvv7kanu0p',
                interfaceName: '2gh0k0i0ux15rnqdqkru6thufba4lk7fk3hhypbeu6pyr1ae8p860aaeo2gyqbwzdqo7t7the4yprt3n8cbrmayj4mtseg5m4uc95v7wqiz3k2cegkj6ehbqcuduuatd8k87p0p94avjs4idj8ya4fanzu5egzn2',
                interfaceNamespace: '2mtff0mpoxv5rf82vmtm9uei4qukvhve41hwdditrh77ehl6i2wmabtr7icrddlkpxkbcneprkfdj8i944h4hmqdbmhli5i2rnvleqst4rdu1p7wxnbgsbbmfl0ytcve3dhgzpb7v8qqlm34szmmn3mxm90hpfdl',
                iflowName: 'us61ah6bz6x4lrmvup7k61hgcpbsh14gwb7n4kvvs9w34hr47w80bhtkyvyt2aq3ybjy1pdyxjx7majlbdtueobq3wxjr83nhkbtkrbwrlxxkq2tm1fhx5wf9xten2hnuv2svrcjyfbnnd1tggmxt30brz4jlz7y',
                responsibleUserAccount: 'lm4fz24z12rd4ebk6ton',
                lastChangeUserAccount: '57ppo202q3i5y3c4csrl',
                lastChangedAt: '2020-07-29 14:11:48',
                folderPath: '6bhvjds8c7pms99t5f7cvcd372mtzhphsg6qr5l6ygkrp6idv5z00qyihp3rtprwwmn2w840xwtzy9vnlw6ffipno0zascm6v3bvddphgjlapldklnlahkqgn8rwxgqo3sxqxaebbbszpg9ecjih1et1vtr7atih4iow6akvqb1pus3e1t0mi3fu66kg4h669niqdl4i9qn0jl26m770ql78jlmwmx23zsvj9fpal78orjq63h0ybrn2wrcsui0',
                description: '9xob8cchmlmsf2jguamxj00vvqanhlpdz365z5iakyls3uwo03gjgkdcdm52snsod6glx9on7ya8hbes9gq6ivahh83hx5z05amjs85sak93bphitggybjo6f5jbrvqw2wd7b8czw95f48lingusopaneyrcks6w8xkx980ep9vqu3baafvan9vjqivt53gavvtxglomxdx9lqjo8bym5uypsvm7avw6dna5xqdu2oh1b63111y5rvk781sp6xy',
                application: 'wswnt7x22bpzs6zn0d64wlamd5uqtv3bt5tdcd9m5aw07iynq14gx0ijc4a9',
                isCritical: true,
                
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'sflonv0zoaxvzdr00rfqcb18x3xqjomft1jzs',
                hash: '5b94ff206v9w8xaerctjnrrfkxwvun5ktg6520y6',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'mem97jrv2ywmjq8lqbsp6k7qqk3xa7kja6nscsenm7s1nlfax3',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: '888ieqh2z74ia7m6nyyl',
                version: 'in1qbhgw5f07a8ft3wmi',
                scenario: 'x2a1dw9bi7tgzidke85z0x4uztrv9vnbtmni394e5kkanp335rk76r8dcy7q',
                party: '6lyqat0lgg8stksm87undie7aa5i5jbpat0qm11l03zkgqu53bclvtx93jgm7o0mv0vf5bq6nh1w8fmvcqs6fptg6645b2q137dqttiitijms4gtakqfs7j2ihvk6s6p3vrku8irzw7mgb0xapf88i98yo19hvon',
                component: 'v9ebmrhskbp9hgq0xngdz0784440347o4qbhkvptsecpur2x9ipc35smf9y7yk85xj71s5y2tbssvbsa3l1njogtquy6ao8jpvutkzkmhannshh8bpmpbf31w4yijblry8cgaupg3wfxlojiym9wovsyg53ylyu0',
                interfaceName: 'mss901lze6judzmygw0rzs0fy9d6atjvjxtplv1orbcqpqeff5tomalh9fzov7exygl7vovk80jk76b39xkdgtl64ygrejodrxfzlosv54hgiavk9kwo5g2j5tzriliucjckmwisiiy0k4u3xl53xnv0omy9x208',
                interfaceNamespace: '04jvws3gvf4e342q4p4udomexi60vn0ri7p4l39bfjd89iwdodn9zxnw7d6nekq16xcmdq8kd2vvft1lzprfygr0lhsjajp55n6we314f01cjywcxv7cxbruw1qlaq48kpukjm98hpkiwcg5wik3kprlols20t8y',
                iflowName: 'lepkdiutl72zdm17ocbhn9j4splee8j2tjopvhbt0s7uesmkdc82gltkmpg9857zkmabp5ikvfj6srj74z61xstgcfxmfb5h1wxuy2g9ncr072928rixgmpxi2f0hb61nop85csci5o5kimo6j6amsq5km3k46r0',
                responsibleUserAccount: 'eq5oir2bwbpgorf97fhf',
                lastChangeUserAccount: 'hzbhgoa6ve3jzzox0tyh',
                lastChangedAt: '2020-07-29 15:10:58',
                folderPath: 'hv2hk4at3c1jzqv8imuxq4ibuapdss3fcpmf21cr26m32kaemhilm82wzsroj9632345265ywj6whn7nkj2v22bphe942opfoxfa1dr7pah8ilcve80odmcilspbpebgms9log5doyoxfzmwxkv426tbinjz2v1clgx1toz9f643yzv2v65m8ujfno9hpknonkr864g4oba1sdm3cfi7ke503wwzrej6wsmli2x4tfwssm455xj22ehtz921srk',
                description: '8y7yuy2zyvphqm5crz29kuun92oui4934zqiv3tjdgnw14vk7w3874ky9ysm2q0zcbxm97729pvem2airqmc4klkmyssl80gjvg3mkglw4baoo30hez8vbjjuss76cb8nswh9ffmle0sc4yjw5g0j3cqs1onw5itsl0yv9uamoi1cz1pb7cy2yfxqwtuhsln64nclvtczqwcx03frnmnv3a35m93m15tgdsooc94yyochmsc18g20bvk78frd8d',
                application: 'vqoeokire3avehuewijlu7f9mksh9poqegg5lamzmwsdrlpjj0q3rqb2vr12',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 't8nl37lvrcydt1xii3lbh93w0cr0jatlq57f1kzjq',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '9836bfxfv3ljx7uj29o0ac5og37t9vf3qfgbr1fysxxd8lvsnp',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'hzxdg61gkmnas6m27nc2',
                version: 'wxq5urh3dtdhlie49msf',
                scenario: 'bv9u8mcck6a5fhl16vu6abgb6iqitenln4qin5yxgcbnhldhifizihs2ca1h',
                party: '4tbyajlbnp1pw0jjs171mey3adojmegkxpv63lmk9hv95rf4d5kq3obahwkiedx1bazmwazg0a6uwtu0e87vnc1n7qg6as6s24opj2yfm0z6rxfnpuxe9vm1to3f8ipelkp1fol2e200d3a65s5qaeyaoiyfh22l',
                component: 'oazx2w4rob0b9gthnqqm251qplunxb8oajxvvn016gyvs8bwxwj2j3sygg1ee9vrtf7riuoielvnx4huygjxv8aju0a8w3iv9we5076g6t47vb8oqynr8nbku5fd9m3y5tr64y1qrb14srk43lita6kgs51t5t07',
                interfaceName: 'eu7f61kn9ns6rcsidej3y4peyzuzyk9n8njdbmy99id00uyevbor1nblwndv92ywxkg4cbkf101pun7ylwsknft3778nfi8ofegfvra9jdyi0pke8lewa9df2bv3slj2vp6ew1xr2li4dstf7bdfj60bkflxaq88',
                interfaceNamespace: 'rms53ev4hcg469m82hz5rhuanlt7hc3y64y910926xyh07tpu2fg6bcaixrywq47xevfcgz66y6a2jlged9tirejf7nhy3qlg7bmk9ndxsrd1aq331bsx1r64bdmwol7ru00rvoqdedf16meqjmk2qy57y44lax2',
                iflowName: 'z0vnwv6d04av1khcvr57b39hsdktkz31emh4735rqrrslojy8615tdntcrh1zyhtkojfod8bfsc6pnlrq9t5ac6ppsn24slurv324pvp3l2krb8t4e05x40sqcbb9u9db3xiucaz5j73aejw3jgwvrl5inic1q6w',
                responsibleUserAccount: 'izeq9le2zm18wgtxbfba',
                lastChangeUserAccount: '344iar4x0bviwpv573uy',
                lastChangedAt: '2020-07-28 19:08:10',
                folderPath: 'bb0yurf146xt75ueejkbt6i8hq15ix356bcqb145mwpftn3th90adubs2q6281fbbc01okuwa4l7lk8tw8x0b7o3newjmbaabzctbqsdedfooxn362wyh7oujghsseboimkhqxce2e9wc5zs8mfe2m4ch41awzngntmoaky36r50k8ekgp2xhulejvi26xouboejan290iynpqnvk3x198vpmgdv4sa13ub66jdmxudtmkr832i658o3eawewed',
                description: 'cntxlmktfx4c1oavt3n876gdsd2us9o47n9mnfmgwgfjru72yh0pmfv0o2ww7gvm7cm07y707zj2gysp31aevvgx8x78qv5tnehq8i1hsmyypqlq1qvmdibwy56jcwiwhwtqp7ih6ao11nyv5rpveor7kzph2a7h9481wxl3co79jlhu30joopjsf1840tfwr3hu8cu1dup6g9a3mznqbz8xmhrmcv4tem8vlwvo4c0trbq6lusbuy4oq54kw2d',
                application: 'mk2oqvrbfja5z3zb4sfi0dawmgvrvwbvdnfutt6j06thri2hjic0lcbg6wf5',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: '5jynrk9j789nvltmer2c6hzjds2mnz290nu7hbfu',
                tenantId: 'u1djycrhbuwzycil53t9srlto3lg5n95wf8jm',
                tenantCode: 'gb1u83fk9hnu71rngkpf3ra44vq48ziceeozhryay2nw25mhpi',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: '76owtd93ztjx5vr191rg',
                version: 'x9gr9bvhrkvuy7c07iof',
                scenario: '8lmnp60exsiubwmb02pkd35meyiskcj74vzdkg3d3n4xey9htqelspr0rnbl',
                party: '30ugqwuc9hmt4fxjs286f5rl8benjzb1iz7clz3yhi3ym0ihxmi8116e9nsexn90gmnqaicm1zg0ems0257kgql1x8sm3gjcigmrvnuukm7fn8s9rc8kl0pvf35ys0wxj5166d61tvjzwd7cnx929wewh8uiry3c',
                component: '3qhartew6qn6557v0zbs6musr56gs66d9j0h2s8gy3zd04y6l34ab8h6wg9uhk7gg439sw66p5emxyxp86c937acje8w1gh1sdojocj9k6td15mr7p0spfwpcwaqnq3gh7kt46rjin3oorqmkym0eubeljk2o4zr',
                interfaceName: '2fyd7f5vw3rt5x04ln6crm4t68puke5sygu7omghl2fza2x8t3spa5g96uj48v0qlchgg8fjl4susf9cq4eyp9054m8zlgvzx7p7bg5d9mge9yyhqcnu23znfp7ts25iuggd28gv92ojfzpx8zesbjrxhvuolplk',
                interfaceNamespace: 'yddtgph0swy1mqmaxt7k4pwfbdcqkshawzdtc9ke452ra1newwtv3k40g6z9ivb3uy75gigzkdyvxir4scsfr6zruz1bcbhtrln7u09wpz8rc4l5r3pcpf5t5wxuwnjfnuo5jkhiwa9dsphlvi2xtxpuyfxjepja',
                iflowName: '70aw8a6dyd2rxhcnxeth58df2zhdzkoqo8b0k5kn0y6y5k725p1ub88q4iqm74rl4wial1k8r57l7mm3qosgl58vf491zj8ydlwdybi3zwz9rrjeki2wbjwtb7zb83c2k4kwckt62a63oql8iq6t2hjpqtlphbv5',
                responsibleUserAccount: 'r0s191csudh7yuxbcrsk',
                lastChangeUserAccount: 'sqb6mb1zjsaactiggt13',
                lastChangedAt: '2020-07-28 22:58:32',
                folderPath: 'jxl7ljgqh4cstrocfbv52piu8hkabmqatie2jdqp2rt0gi0cv35uz0zvpc6pbeqhlxjkplls5bbyqzj0xc6q24qwr4yw80qkksyza8xhikr6lz6ig9fqhwb5rxi49p51734k147b2rvm54peml5x0b7v4otjfemg3pikpqn7gh0nw83p21mc24a5ww450e32u6gvzxjb2d51b1e1emniig4irnejkq4d6a1xiw693wn17r2jrd6djardz8dk3d9',
                description: 'ay76uh884pinpctlw7vlzpcg2w33dopmnjzcvoeuolndivb5qgpoexbfilieoooz2gaf31xty21l2nxediiast02gyzce52nas6by0bggvz7u4bkujxq9oxvwzam0crba8cojovcodtj6ehbfyl9d3gzh6fw9krjcvqs7lowwv2k44do8fepstgq7rljresnat0rzhpwr9m30y3whdkzfargwv5tb46w365xj1yiatyxvl7de88e8jxgokvxclo',
                application: 'vubdb3mnivmn41pj1dwofd9tzqq01iru2nzns7r9j1y2d3yxtxgbld3bk10l',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'q27fi3ad180ogogpght1tiku2or32ri7qcylyvh8',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '16y1re73nu91dv7g372t88oaeujg1x5lnoo4ze73csq8x3xjp1',
                systemId: 'jxkrkuiitic63k3nse2zqr0cdz4egmoi5n7hs',
                systemName: 'rwvbsuhcjbtjli7j2eii',
                version: 'fwx7fuxhkwc4ehd7u627',
                scenario: 'zinr4s42as26rxnwk3v5qyjmf0er35fd80g0bxq1tty0l358jqu2lvguzgtj',
                party: 's7vu6nb8yh056h2hhplehbxdva6h0ykb1p97okfl7qbtpmwgiiyojh62txnee766eq1ewzcfz10oh3o7mg6ymmhmxns8zpng0ftysjrawcd56njvg7bdxaogn16aa1ekj2y0y5is1s7jy49zl7xzb9o7w5q17lk2',
                component: 'p61mc9rhm7iyznmjapitnq0bz0dn2d618i1o7v3hmavyemw9aiwpjuh2hisukl8qf9vprau3pmu0if1l0rvbnaexmdsy8rwjwjcstu0z2fyne21ubsjnjlw1hjxkexobril1zfb04mbs0jebi7k12hzpkvqlzthm',
                interfaceName: 'cip1492olb5p4xh4e2gh8av7agovjq162eos4hsoeyu4o6n42j082x38sf4h88lyr3itjl43634h357kgl0oyzg9sunl1qcxutdwm3r8cd0k9ee8zjj0hq9fcv0tolpkqycembeggj1scypxki1ybzjmat8ue6el',
                interfaceNamespace: '21xc61xxxyehjs9psl3fz8x03u41u5p1l7fcsktdvwqw2lvo2q01mrv5do8tn4iuvrybww9xs6i41uojm4zpcxg243swke1rumo7q1r9dzzqzuzl404wywnknletj16tt14amev857gc7ztwa5ilt3scvicrs22b',
                iflowName: 'znlpqw6nzhcypinul513fkbx3gm5pl3at80ofvztrq8ik2ro63u364zxo2togw4a7krjherx28ncyv12l4xej56rd5jhnbleqh1j3zypstlkx32l8bjis2dcwbp78u2wud0p8xpzcdvj0ya9ax3y3wlpo246oavq',
                responsibleUserAccount: '0a0vagl4mpv7bb91zom8',
                lastChangeUserAccount: 'y7pavm936zuonx5447nx',
                lastChangedAt: '2020-07-29 11:10:29',
                folderPath: 'ikp76z5a3mw09ay96xp8ora2littrp636nejnw82gkehjd6nru1ixhx5rcyzp84ad9lia1thmoyq1ue8ikhtb2taxe55u9ms3gq4aucput94t34fgdnkipd0h9colokftyqupogf4hppcfp8ln7m33ayl7ccvsxqqp2953pitxi2w709kim2mdmiqdn3krb1jq62vdg768j4doyq9rsmon41nmx1wx3flqg98ryxh3mvu3kx4851fj6jp4ao1fk',
                description: 'v9jpgjwompn8epfubfhafzqr5owye77x61e5yt5znakjg7sh0elc9td9dmy9lty2bjsqj5lx510ex2voc7lcurjp9hxbvi41zrvyjuxlcyf2vt9tmzecllxm0an5b4hgbdq9p4iaedftotfnyp7iiweig3wyp62ezfk9edcrmxrq6y0ykylnvf1wak2m3i7dltewn66r2kgk9s2cfjwc6kmhxjvisepkloj3ypbydmt8s4pifoois7vj2t70wr7',
                application: 'ert9mrpgmwbo2zuryc4w7p73okwyni0123j3dk6f6sg3n4ydpodn3tfm3hfs',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'jfm6ktbmqoh265jnsclcltoa7g8fvslz1vrikrxi',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'y0jijp080ju0p9vv3pjdmbicuxy6685nlvjw8c1alifilg3r1m',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'aygb4v0zyqibmpq9hn2v',
                version: 'gy4frs7i3ysr041jg38j',
                scenario: 'mtlekwwi36i7hy5je0ak7aj64htvh42b7chbvobzxjmfn1ov699mi8w6mvdo',
                party: 'um04jeef2ml79tq4jektmb2rtyz63mpfbc4jk8jh7v7w3h4w12lyos42dnnn8kxm16ad69jacxljlme5zl0crmut4gh1apmrh71rohlol0qm3u7bcjkjgpr88onss5ztx1duq5ejy2wapxt944bt8m2pbuclgx37',
                component: 'gjbujc4wx6krgrms8w37la83ow3uicmlsrvp676ctymnh3c20y52w3dl41wdk8r00szcajjwv7x5t30a9dq7iu3m1lq5xj6mxhctdxnnn3qjobgx8od0o105jyjk502y63zlecm46j4r8fmp78pnrbl5gqjcn89j',
                interfaceName: 'abfht62oiflnr4nvhnernqsrrr35xhshlnu316ktv9gnqxdnuszelu2lnktraor740eznrzbju0f1urhqf2w99iju02i4i9awyn4enenj8skwdfni1777s19oq58shxp5hxtflbr2sx7d2g6mxwe0bdbb5vig5ch',
                interfaceNamespace: 'hr62nho9ni2vzomrs4zyw24ehoscbqcvyy85slpbgna3ikz78lhbyclmzlzvriqphgilp1epy3vzvedy5ep4ao0y9iqiurmbmywhr6tlb6ljdn8qe706c6fc18w15kemmtxzn19yyt9vbhn0bwzisrh3po54qqs1',
                iflowName: 'xo1ovhlykng97pkzsyuunygxtyu9kqcfsnkxwjowfngiakfqagr98il3m8dec7f53xxl00amizmtxy3wx90fatqrtvtef0x2odahvujjgm5gu75pfgjs9lzf0a7e02dfmjoe696d8gk9px1zsh0aux2w0rf8688o',
                responsibleUserAccount: 'qtp5o49ipikl4o3xhmyx',
                lastChangeUserAccount: 'mspb8bkr1tnzg5eul07w',
                lastChangedAt: '2020-07-28 19:25:22',
                folderPath: 'azppzhi1mfc9j3ykfg8i7uqi0yuwbw8aiowyc7cld1lua2chzfz7a13lc8d56i97ptd2v0hls5fzp4c9v03ldcur9jwp22u5j1ssub8fema56hra59ocxfkyf82xvcjap1tzj4ztizkmhqd2rz3mp1sfpsfmtgf4vro6j5i31h7cxkik763pks1ggfd48qj1xv21n5q4wzjrd7knjc05lnv76lu6i3ahjhb24q2n2a94n4oxsio7eoqy1ckoeo4',
                description: 'zsxcmq274qqiuv9fqwz38ctuemiuxkh7tyjppnrv96kaof29xrurxlbmnblnz181rp0x6rqzv6lm8b4ydz0epjbs8wiq5b8lzky8x4dtzkl3z9su7fkjb56whdmfizv8fgn81i855ss89xy4u3cpfa7zxs8gl2ijfyuv840ozr13tc6grji3w7t0nkqw9vwzwk9d86j9vxqj9gcgqyrcw1mostoxxmermyvma4c0uzluqsbw665y3oa9mpulby3',
                application: 'd38oritdcmytclx94f9x1bwthcf3f60yqwinjhz51hgntawly2d1te07nkea',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'w8l0c17qf52fxvrkfllbrnof26eioos9tynia',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'xoj73n5jvjorv8ojxg8q8i7xhwltf96mdiq8m9sf',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'r7apcz7qse84ycn3op9wycqkuk243b08ouo7ivwpgr1ady2am3j',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'sflj3l2ym1umnwsro89w',
                version: 'fn65kmf5ujpv9mf0vaik',
                scenario: 'djubb2bvmeilyk6gcwtpcmy2yq9aarvok8al5r0k5oy4k6zrsix9p40ccb7x',
                party: 'wkf70md9spd9llifzpg6mkbnfuez5n0obax67fs2i6sr4v9dwro46n2de17qvnx6d5pbsy8e4vmywb1wmzdyvrxejp04ibb2z0dss8hi88wxlf3izgl5klrj9nws4vnf03fxtjzglnir8cjb4u1zf3ws8z6mhc0f',
                component: 'cxip8mg5nyu2zno0chmchrnh1lkbvnnmjkifd2u1kufoa84xcftmm0s3mnfjj3vjda2ymhxsxs2yqiszampalhu0x5vsyord6rjsbk3njxeguru7rb6pbzfgcunuotu259o3bcuk9dcwpcu75idotwjl76pzdud4',
                interfaceName: 've6mxaemwb71pmam7pun1lzx5zkb72j1bz8eqyopa4mjc26hk2twhhgiy87nydlwwji7d3h88wfgelsl3oxfmg7gosefdzxewixydeoijv6va1x3gdmwupaunoiid734ox0d0kce9vy95qdr95o1p9d2ecvh9whm',
                interfaceNamespace: 'lorhvye4ipe3qz8upesv4jncw0b0hxei9hw0xt55vf1o2m0nf1qlqy4q4bhb17yff9f5vp8yewwyr28hdpl3enl84dg83mltotpaehe1txd51uxtca9cuhgmurko2hkrtt8dp17wvnh06n9assn2sfh2u7jgdokd',
                iflowName: 'f8vejk9psih3s8rr8lt6ns4jkvscsnklswcnlvdrgkm89vzjoy6l7c89x4r1s0jhbiwru62u6d2ipn65tsghvo0ol1bk51ffrrcui5edazwxw4wog8h3tpk3dzp0r8sf45g3uh808szwwbhswl4k8agjkd97qcv6',
                responsibleUserAccount: 'r9ne0iiwr7pujw07lb65',
                lastChangeUserAccount: 'y2q6422xv6j0zjwv06ge',
                lastChangedAt: '2020-07-29 04:20:41',
                folderPath: '0q9dj7jqyc12rb3abrgekkwhcxgxs9be2b1dggb9koqq3e31lenkgdiuxmqt78wuxvsru648br64a5jy32rmjbcry16i2jju40d10r138arqdwn4hkna2ejk3qytqj8a7y5ke7hyyh5kk9ute2al4y0zkhih63xdzgahkygmkxyrca9mupk9td8r3to1xjbaenpwc204u7kk67cuonhxidqs5sizodbj6xahxedyr3cu64et8qskzqkth6gdx10',
                description: 'e74a6bquqxupf5hz5ycdsied95v5c59mi7464y0m52djki9kqp6qd2lpy880ltdbfsaiptrcph1pt2h86n4yqkszmdta7zwxge71lxsst30w9a4vnvohp261bc56jdr90hyq8cdu5a6uzhdyw9q6b08mc21y5o9ktsdc827xmzntab593w00z4yg5lkeu0k704annqtta02z487pk879cfo0xy12ri6hunv7lpxi2s6iepkatisbzynxjrae40k',
                application: '77eivhltsrfufrk51rbnvt9bxfo7eos0k7rxo6f6c3cmz553tix2z4yvw4t1',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'z8nek9aifqvzxzwihl5ko62vr3kuy0spf9dyd3rz',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'jf9h43i8uy2pe1oj5y0097ei1kgpvb9ay0s96bfyqi2q2dqt9o',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'sbnprxhqwli3j5j3hlnst',
                version: 'w38dc1s8adlus7ogtlaw',
                scenario: 'nr0rh3gxmwzpc498yqagvh2s8hk7igssqkvube6g6cx769a3poq8nmx4d6y8',
                party: '9xdq89pwt6rmae5z0bop43z5p97x8rs212ggrzu8eii312b3f0rfr2hvde74ze7dbetnpqygryd0dhaf3y47o8ijga3me02gkiso7vevxp5qqu1ye94qpxfeq0pvj4kmbpy2d8e0g2hjzixhj947k3fbbaskaxf1',
                component: 'pbphg94z8xye2546a90oowh215a53gf3lydjy5d6o7uihir6u8xah5iqwmia6pnm064u84vt5utgf6ke9p0dqw7iordfvl60xc3fv1c13u5u752pz7ieqz246z36nfkr7jv1fi3yv5mha5kyr6o68jola5lceyqy',
                interfaceName: '0grt2rhr1z7akqv240k4d988z3oceytrt95acjrjcgg2j4bqne6n138d1a743jr30uq6bqu2e4g0fhja1l24ktjz0f1h50fsveljv3sxzj8fsp260dqbvuq0yl9ok82g6w75atizrbvwbi43ajkl1x6xwufgj2a2',
                interfaceNamespace: '0okx7329mpk5vevzdtqsz6mqtdnkoudgfbfasayfcoeghukcc4p09ec2oc1r4bmr944cgx512h5r57vs7bks55vc1wk5v1nufjquafhir4z1ns866mbril62ugohibos0i8r6rkvhirjxtftt8giqoyz5joqzrho',
                iflowName: 'xr4w9r4f1hk6436eervhap10l9wjov7njkpthtd1elsgci781oj7650w5k5z6ipvktiuwvsqmrsm08b41k94znf8yh6kibcbf30fs0uhsrzbz1z34gvyavgjp8b564htjcd776matl1bsr3xi7krsgtilaloam5v',
                responsibleUserAccount: 'usdran3gcmwk7i4k27vu',
                lastChangeUserAccount: 'plqvg1we33a8bi33r4jp',
                lastChangedAt: '2020-07-29 15:26:16',
                folderPath: 'ycqum9vysyllny1xv5n1784lnjkx17quef6e6y850e2ul0x5e5ktcue6nn2hxse9b4wgkbvj2mjzmm987i0odvsoasqvngke4y2cqkriisk7zehljkzsrd4yxp48j2vs1ataen02p8ic5ckeip8b337tct7c0ybbz03p4yng5o5jzurekuj2qzy1ddaxc1en0bi1kwym73cw41adueatynsyawdkn2dsgb2vxiho1kvmsp346atlqxeusxnkvru',
                description: '5fz0jffaksbwtwzyxdx33wfzcqn8ovh3k6z7jez8vnp4i53z0vbex9s3s1qbqv61huwjjqlzbqp0s7i0g3doendrzk43ydfj1w9wpb9h5l3byyt4n4pc8l58xe7q36x8tgprm8kdftk67pj6am7kan1nmsz5acl28ss1kw2x881mux71rwmc8w78eg5ttk8gc3lmsrvw1n6o5l9ki4o9dsq1xq8q4kgws1dq846ixa4niupu2ioyf1zw2p7bvlm',
                application: 'qm5rpi0s6jzjzf59xcpxusy2swuqt17fdmxaab6sdaooe72mmhtukwltmkk2',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'bm2e6wse4v0p1d5husrb1a3pn0yyvlialavkp05i',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'wa040wcmfw7a5o9hduh0af9ek8kzk2gel4r56gkb2ogsj4u2zc',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: '2t81e4sx42qpprm1z4s9',
                version: 'nb2ge3r6qov5akz8r7p2m',
                scenario: 'ew36cl8c4vxtp0b3h31w43weekd0uqqf59gwfvyjfn0wuli6g925z0o79ya0',
                party: 's648tomh58n3r6ur1s3m0ya0g97ycnh3xnh4oermyswq7y1w72yb1mstbtojf9oxm6vyibas9mkou250eftfk9en757xd7pkwqt5r5lunm42si75qdl9a2aurjvqg2zvq82bebtegvkskkcjyxsopbu08l3yxexc',
                component: '6w54fj38mr7imu9zl1yvjbt2yoznteq33trx28v9b5jwoksel7ltb5zvehubsax899kbahsk3p82k31viqjcqekztau7k34m9ywa9mllljew3dd3q1fgf83a5wdx2v2ip22kfz2qdaqlnc244gzi96o621hrlsa5',
                interfaceName: '7v1iwk876nui45ua962lszbacjm4crcnzri9t21oqmmqwcadx89njf9kzicz1u8vpislqsw20ti23fyjner78a5gkjn38ouwa2l9y9auq4su8df0nh005k9o7q4kn8zgob4o7lasem55xp1vb41tvpx2lfvqyjr5',
                interfaceNamespace: 'th86kh9reufeof4ci3wznr3nw6est2fgj26naafq3en8469yd1i6gd6owhj6on48n76bm66fkbzccdqktigll00s2pu73psm8p4viq5od0w9goxyuvh88akbw9csf3yesg76s32bi6y5zb7ppqyqin4arcoim9ay',
                iflowName: 'ae1js7pprxqt1jlvxpfdtw34zwukf9zxprbwz46mtmofkjerkvolb7dsu727s1y3rm5tuf6t21zpoyauvweri56e4shadb3e4z2m9i2esafn0wi3203cvnby2peurp4prxyvbci1lh58eu06ol1vb2g5jkeaxomp',
                responsibleUserAccount: 'jikcqp7vfm7o3iislnjc',
                lastChangeUserAccount: 'k9g6iih57fohmnqiuoxo',
                lastChangedAt: '2020-07-28 16:27:38',
                folderPath: 'xfa3ixvlo8co935p1yczy3d9ahjidj1w1sts2v01dw9vqjpzkbajplnvwh7q3jxgaa2a7a74yrqsa6io0jvoo2p2w6qs29reuew2vm4no6tstoycmjv9g50izc0tdqjckkpyts6vs99w60outgbppr37u4q7ij5hwjk9xmcjtkfch8yguvr2jkdiv4f0urgf2u6pyblhaw6ne8129r5fexdsejnjvtt634tee1pznymco729prftzj4alyvr3lf',
                description: '86vabdb400vn1qtcgg5lx9knu2qs7cmtto5n1dld8jkdgrp5tybjdcrt71v8umctkmahz8chmoybapuucjul5lpewcfp0xbd6eg78liqpsyd5709jg776plp610s2iqaccjusbkkux5n8lkvejzptm42sd5e55dw3immg3o6j7nptnfdznk8mvf4ek9re89spljbfdj6tlc9jq0dg32kmhyw9f8nczlnasog4muef7t48hnbb734ban5mrxrgo6',
                application: 'gwblykit5r1ulr9wvf895rt502vynyvh6sgbph1auo6py8rd0dvinwl140vt',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: '5dwgob2ludm1l0fp3dhuf24xy3kz9cejfxmmjz78',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'bdtiytbwwpsauxdrzvz85ebpdlrznz2s7dai8mdv3hsrmi2xp6',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'pkzhrz11w9ij60fuc8w5',
                version: '5pf4sg4kpbrz9fp19k68',
                scenario: 'l2ii5ygrn2yyvzkg906mzd52uuyohq6g1cqzqzpnsu8pdis4416cmlq71657u',
                party: 'zxpgie9khvqo0c2axfh0e99enuehond1l42l6q6mrsn0oqqtl0rwe4u9wi74qudf45589f5ehzh1yly2hwg8caaltx8706xntv4b5121t90g7fcu6m4e7pqr9z7xd5b846sz8291kzngef3j3bdin96g1njilo6y',
                component: 'j6reciuzn77tm7yea2osh23elp18d6spox8gcvzsfoj97jqu9urz33gydhc7hbb2pfjyowe2jtpfjzemmewc8wl2vpc1wisiz0odlxrn32icx93n8t3uh1bydu7dvwfcs7ejhdbb501n6r83g5dwb5g2e4h4nnwm',
                interfaceName: 'x9jc5iv6ib4mfrk2jyttqhj2sxn2nhziwnxodq17m2ehgpuvspgove97d6k70pyrlwnipsqxo87lynyri9zgh44blznj5725alqaleoyivrclg3j3gejz7hsi732t5mc08c5y7f9sq1ml41p7mlbkhqs6w2dd6b2',
                interfaceNamespace: '2eo1kes1eh9r1pqrsvwmsicy006t67p2n2u1y78qd18ovnyibut4hs2zyteypejc36y97ia1zjxy0yry0tzjacvguopi45hmg5yu691dvg0ltdmod0hd561cd725tkqqck6lafsiw3c88jy5w9il322v6ttoep2f',
                iflowName: 'sz2xre4zhben6di09ywe0dcby1t7sgwummt2u0zygyuavkh63vaof28inhwg74r6uqphkcdgdj7p716pp5os2m1yc6g8gizm3b2fejhbsg3emna80ow4wwp10jagzj4yun7f73wkpa7jxx31o5sadglpaaivk2n5',
                responsibleUserAccount: 'hk5yetqq4q41vdu8sb00',
                lastChangeUserAccount: 'fa2ulw22m9hzyhu3vbs5',
                lastChangedAt: '2020-07-29 09:04:24',
                folderPath: '9688k4pec3nrx3vtutokuahqu6he56ov3sqa17907x8kmj4tj3km10y3br27j53xwsp34qyfxt6nprqoc3cmj84i3z2xbg9m2r5rrw56psjreqmib93rpiu111slnljba4niqzthxdityhrkly1hxurf1w0i6e4o5fos6on3hqwifl28xqq8trfnjnppy9gz7pu4uwkq9bw4104bgof8g5i3w2ltktt646gbkjlcmndtnju3gs9gfy510pulqkr',
                description: 'lznhoi4lmy1lal0hyy5k2ocdtwx5rcok7k5iwz3ccin7yt8ogyx6hsrqp3v1s1dcd0bfp192p8q2e60ilg0vce9knnl3pqn3f4gxers4p9od88px6ghrx6w8of8i6tyz50ir9al5vmdxbcx4wgara6v28hup1jwenh2azgmviug8pywwso1q4qr5opntrrxpuf0pgzgms34whmaydy5b34ddteff6dtg7ngnioe6hgnjgr1qk55gj6rs34sx0op',
                application: 'j3mzx9xewa9bmwn8rvib3npciol8j3gprl283bo95qe4opna03ex9fpndbnw',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'svbx84qkz3gfupcgav6m4gg0vfic2ujspswvnnee',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '6mnz45dcn55iwm04rip1c0lte2o3venr6ppp7dll7zqkv969tc',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'cw2f9slun6av5z54p3eq',
                version: 'gr765hrlnxif6vbvn7ry',
                scenario: 'unn6jvkst2usxfjlakz0y60kqzuvgijsvfmjyey6s2kmjq242ufxu6q63xa5',
                party: 'q5ckkgdplvju0rxlr3gsfvlaeca4qtem33c4hqyv0vwz4b54zy3icno2549ob11jshndoqrf8qa8t1zhnub89y6k9i92ttyk2wcrgfe6h8glm9sjvmmpnu2vdntu5qqfz70inc34ky7yuc8zo0o5u17pi35vi6956',
                component: 'gwvbq2ntga717r0gy51q01oujmbyup3b2rlugd98vvp8phfutjcfmin469plprpbbb3zn55mklwc9l7xcpxyx6jl14vyknr9t6uyyqlw6grs0sy5qgwoxwt91gh0xz2fofcraw5oddx57m6xpgto54305c5haasa',
                interfaceName: 'h9dlhpiyg1uuge5kodgwo9433tls9zt451ka623fbznjntgmswwrtuf8i72f6vi1319vvzpy6cxt502ag5uteaup16wqx8iv3ucdvzk6wsfdibd56njgnahpzfeotqvw2rewczs58vup5ko92zwgh4rc556nlk78',
                interfaceNamespace: 'y5y0c7qv2b9ku565gf74iyl3lxcxek52lk16x0x8bm028dwon6har62kgaeq11wtp55d7f3lxgs7sswrwc1s4wm1s8c0ouy89qxnubg06bec7iod3jnintgk7xj28uxqm0uac5j68ry69xyum9ctqorc27d9d86f',
                iflowName: 'gmvmatvjd6jdfmojazwmqqab2ip4kg95287j9ff7ina8b1yt75m8ea5mg0apeuz2nl4zt198cd7h78xjy4wx6n0625xjyh6akeeatqxk88xdv493ulm6n1xe8v2u4ygwugvqu7cowkz4j6o9hv0hgrd6pomhoweo',
                responsibleUserAccount: '5yq9b59w6qi403lpy7bx',
                lastChangeUserAccount: '5da6tovc8rjwh7fnga6o',
                lastChangedAt: '2020-07-29 15:12:24',
                folderPath: 'dfbzzaf6odsz1iw4or685okfly0qbvjax35e7w41gw10p9apzsx4pccq3uiaeqmdypg0qnmlz1n0sra61epbchzy10buak0fdwk9oax0pkyej2n7gxrgiqrgaun5pp058fh24wfufosqhk3n5x1n57q8gvvwtb539kqb5utt4bc8idpi96mki3u4zpfy29eroliv3dn8q65h82w25h2zrplo0zw72la2jtw87s37it10pw1zn3rcp2z2xo5viu2',
                description: 'wnjfszlroggbj9cb9bh30ar9hhce3v4irh83idtndlvzwu0ux5e3xzfnc7wkk6ibpsuhau27tmt436lv30ltvcr8e886uh8c21xqyfuxy8epc1rq7mhv6iyp6lxpkxzrdpk7pxjdr68byfhqgtpluz3yb3g8kfzd13i9uf3g6ezvw9pto9uk5z3yy0lrjnun6yih7sdtzlzvc6bru8oxkmtlhg71q6q9atu5pbfes3dn2pn6eriu9auhcdrlik3',
                application: 'o5mk88fs3p90nwasyveivp3v1omnh166t3sqz4z9weyszaabpc6b7q8rw45t',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'cszmbumqv7cdn30hpruvokj92jaud8rqzri0d3bg',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'k135yz0lbgyxngkgkipunzz28fxkedy65bdow6hq2br4cyed4t',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: '6crwd4fd5l85d9lyhf7x',
                version: '3hd6yonk4zv57gfig92r',
                scenario: '2r8s5mzx4s90nn8o5lfehhd1kvhfz2cmed3mfsxnxw25zti6t5vkt5jf48nb',
                party: 'hlb75rx6ahymx164hvsgo7o4ll5qy5v3mfi3q0yfpb3j08h060rtdp1x81zs1evk6ey0oztcvuyqr4khffx7jy4s3quas0vk7fz2f584z23oknzmpi890lngzrlfsbdmo0zyamo553snebkoz1bdh8shbu302tsp',
                component: '4g130niguzdtz58aw0uyg1b8guynq96n8xqqi0vuiubgx4bxgcs4ydr9ib4j0ras81ef39jc5hal9cxt4f16urkwq8kss5syb54m2yrw0u2gxp3cdj6qvgt25rwlsx75xak91shn1oxjj1k78xpn9aghwaru0o97i',
                interfaceName: 'omekaj923fqxt5onao1gqx3meaxcbc694mbzdscl96ax7kkdz3rsi2eipvdxvycls29fd1579oa98sgermwfer73l03uki5tazo6q29vkonzinf8uzqdfm1lzmkg9ryhv1h64sdlic4bzymodf3w67v2ej9mkwzu',
                interfaceNamespace: '55al2jg69cvgnvij98gshhwlz109su4a61jqpkyw3ac1kt9osmzhxcwc47n4g8sn5nc93qlaykj1uhik8xrdk6hypq7xuvwjv9dvs9jhomq0hixwja9ftnpy864yhwih8wk5bwo83p5mej90aoj3lok1givts9l7',
                iflowName: '83ne5ns808phybs7sjcxbvgwz79pkzss05xvogqwalnt9jujgygrb5j4oseghgmbgu4br1q7iqpll611so2w0m5odpf5alomfvzqhuk3e4k1x2oolnpe5buahg4g50impx1ww3fie4cvgt6eg5ja3wb6vlghea8n',
                responsibleUserAccount: 'xsl9g0wp9mbd0rghdnbs',
                lastChangeUserAccount: '3rfccjte8nvjm0wjuc56',
                lastChangedAt: '2020-07-28 20:19:50',
                folderPath: 'yzs872pt49vyarvhb5ewhbxjcqrlgz0r7koqxx8kfrog3k5nyznm90ee06vhrugcz9r8z15l8jf8thqh0rw1s8ni88pe6xt52vrjh813kzuhytrg61rim0ihdsmf3zpvitw8budlet0cpp08ovfm5y9lwgh6f833csh81seusu2olmb4gcm7l8ko5hk55unie2eoxtytnw90t5v92tc4h8efink63g7ew2ifj7imk2ye6ty67es2b18v23zjabu',
                description: 'nv8966lq3xw79bd7nq2e1chmkzpoadnloddgmi5x6pebjkmgdj0icub237pj8mp9tqphe4u6f25f6143l6vnj5q7pvlsyf8j5weqtay7uxqwjbrjniyhdjkjo3i3oxd9p9gncv1h6hfwwurvd9d61ueb1g87i7n5i59e2r65wbo0rpvpxnqoy9n0dfw4mrf18qlce0ob9mhza8jgagnsf38k661gfluzzjj9csg39wtto7xfuw15a103rcezwxm',
                application: 'ifx2l0yqv78pt3qzb222cc47sesfk8i15650g75wv5x2kd9lr2snzq64x5np',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'qxgoxkh9zuukt7b56unwx8uowiw7k90azijbjhns',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'k27y1xzuj1khfk3ekmsr6h1estpd9z8m7aez1g46voiwrduem2',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: '9sledxone3jpww1pbc53',
                version: 'xuoo610bz6t2kp0ibzqn',
                scenario: 'dg03miayr94rhkkiua63j51eb9p9p8or9fr8f3as7kwsew8g9sp62jnjhbav',
                party: '6r6kg8eglp3sqgenbfoc6froam4yh902hoxcyyottielqsg34ksawb1dtyk1fd86ywbx1hfwa2s12txf5ci14zxuyyue14xoumi23u8qny9oqju7s03t1bgz4yiof7y7vusoyuobqsv4l3fqs65rht2e4xrbq77e',
                component: 'g7pp2ly64d8ju2n1xxtb38wdi4nup2wz5ky8y0ncdalitbsflni0x628371a27wiz04j6ez1lorv23479xohc2n7uv5chkz5ocqq4ndh32smo9rs0jykd90ixjhrrcvhvx0d1otxbjjyam4ewtaxzg2khj62vchk',
                interfaceName: 'wql8pscnb3r04bmg0f5ni2z4ztzzabtish0z9p3mh9bu6kqgy4k5has6i41lignfbo4fv3u99bxvftfooqxifu0mu9l2fn3vi5sxrj73rnzjt9je5yaqlls9qc1nztclid0ylouuuwg5i6d4s7861j0r67nse7n3m',
                interfaceNamespace: 'slwtwt9nhllp9096p1qjo1rjlgc982rg50uyme0391ur0u579q5nu2ggjwzd4ez5c8jcgl5gj3kfvxmeg4n4qar5env2alirc19jd9rmsau131omdhphzs4j0hvqs1zblhuu5q8mvxy4ct9cjs148emak23d5umf',
                iflowName: 'aec96ywefynmgwe4iujcnfm8awie6iltz1uij8rw3341urvszmhxk90s4orq0as4hfssgzh9o4s8rwa9kab82rlferf8m2twh8f0pedi707od4rjde0i31j85sufdhmfd6zx0bou11iawv4b8tbrjwyzphsronjo',
                responsibleUserAccount: 'hvtpv5uxrv8tk3zqmhpv',
                lastChangeUserAccount: '0glpmuo45okwvjsd65cb',
                lastChangedAt: '2020-07-29 11:35:49',
                folderPath: '2qmjeskwfqjpoblk5dbqebux14uxc3n41gzzwoymf1r4dfv1q5wq5ptrwkvfs7m33vzvqqxnkolxsuizi4xnven7qrry7p8py0pjuyhfl3f9z58z29x90svh2alhvqipswvzc2g6hzjv7v72d057c762ock4ub0eh1afkemdyf3t52dtyhi3rj04rbsinwhq0xd18cjr9heb8tao69oegupujxr5a4wiaaobopcq722dyd0ujxvbh20p59xeo6s',
                description: 'abw4251m45l9fjxypmtr5tfmva2u1xl043dhe5w4g2kz5xi62t8yiknapa3b4dm6x8o89utsjpx88ntz4uey857atjai0d0bsafvkhjsvw0gjhdof8iafwryi0dj2j0ize0ky04hk8pbi1b4v148yylnfhngx82uzv3k685f6m38g1usspukdg505re3yhgidjd581ftijnds9q79i30goc0stniixutwq3nt1g1adkqd105wbdfzaipncvdmmr',
                application: 'x321p9onmuy6ctdcuyxa4lc0uvvnjlfen8lz8ukd7xqc22j503vcazww105k',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'mhbmr4qheyn1y4cqgqo20v567ollsflmmmexnoz3',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'gchkqtrqv1zxqd518yb6vt6ddcjm85hqffamr4qa0u2mxpgdd0',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: '3p889i345suv0cikx6y3',
                version: 'd9g7krc4phtltsvuyv9c',
                scenario: 'hhz8ss8fs4a6at02ie0zdcmgzt10zmd339a0m40esm4hwmznwqdk0yuklnu8',
                party: '8yem2jtwdui92qj40j7d0lqofxxsn6z8eey8nzllpzkx1fj0tp5fgkg2c26q9yhb1l3himjxd6bmge46i4f535jnbjb1wn1p9ojzd2gi1g3ajcke3x6th85j0t446mu0sjlwmocgcdemo6eqg72fpg6129uj8ffc',
                component: 'as3l5676xent9m1emerxyg44vel0omuhob28dky5ajwxx7734yiomlchfw08qtkx2k40u1dcuhinr5zbrayyv41l4ho1yai8kaqo7q9z2kl82wo4bly7kbfabt1x9rlqmgzpqp628qecunqqazssbyrdcq2gaeg4',
                interfaceName: '73qowhtm5axou3zrlh67pt5vdjg5jepgytmufa2k4uzmrmzh2ry7bbxqdevaorl5sph3ks5r63crvwq4y53c6j2s0pd4ybp6y9c2yeck2sz3os8nwvofgpzyvtonucbycp6a9jp2nyxge12kxzq8rqves9j90nnf',
                interfaceNamespace: 'xpox8pt1vwoxnkuvs75ib7ho94uz7xuhqf1aa0od6ik57xjva5jqtk26gyx0phq1ml3ep3ee439yr3k7yw5v71zhb5b3yltb02ej9wv4xu1zf6ph519w2rrmnhyi9auf6465z0njlqnveelq56ek0mx0ontf8e813',
                iflowName: 'z1fp6pvsxwp9sqymmq66emh0bld1u8tniki46siyz9lrjhvrf2ut3ti6885g0lg6j71hf997hymf41gv8c8yznjhblqd96wehme2h92fv55fcgr78d8fo0tuyox15z236ocoayk30x6re4i1565i9bgkp4acgq7d',
                responsibleUserAccount: 'qnfy2ika1d8i5j61e0tn',
                lastChangeUserAccount: 'mo16gz3rzjdujh01s312',
                lastChangedAt: '2020-07-28 22:47:16',
                folderPath: 'i8limjczj1lw8m0r0vur6jce8zkv582sj03kka39gyydf9cgsadiywm1xzwy3plpxiek72son7yaucfjomugbjgvd271cbc9vgp8qo2bfm15zkyw3vydyh4efsbuxjirrxh1lwj35s5l2r41h7a3zjqton9orlo6wuoc0z2ooowceo8wqpxhw9uxw95slzlq27qli36mdejkh71lgd2z4hf7hh8z0lx1ol9d4yciv60mjnozantibifyknhxk73',
                description: 'i379046yp66iuclkqp7k30ybbjumce2abs75fvg29zumefzv0i23kdx785fxoj99p3fc5w9lutl5fs7jkcv7b38geexnejv4dahr3up2cuoax03brwwng3xjivg0qap84mdjtq9595yjg0s05fbcm5vofpk9npysnphnzt60ryswzx17rmb0fjzsqwzji78227pp0wir25kpf5q3ixnyc6a0giruh6xb5ljh16z3xccvoj5vcxti7mcuvh8dnwk',
                application: 'og2ytph6n0prkljr52r3ochy5g68ngeh6a78r93e0pxqf2tfpn98accqumbh',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: '37g5nfpdp2aqzslxot12n5gsz6f85xb7bw5qt7ub',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '578waye9j23acfu7zjkxripjzbm15kiuiakeexmtkc6ivjhxc9',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'lf4l64oduhpd0a1khoy7',
                version: 'wgtzdl2kgd0dlbfw1651',
                scenario: 'h6euba1952r1z3eu2xyfaevy46wq1pea05tdrncc7h3vl6g5th4n1qmihgv4',
                party: 'tjaikmq27hkvg0coo0u6c02zjcvfbq66jxxfb9atr7mxj1a4bdqyggcua15r5vdgywahvp5i6kmv0ldny6xtdm8l5dfba1opjggmp9sb5iwk6ti8mrz0jr7vdnjxq5b0b9mk9feod8sgdy0ccetl5zdlk2uvm0mr',
                component: 'ltz57zy3ofvhgeeum7n4jubz53gxcy6cli63znz3yx2hyblrtw4xirl7nu3yx0ll1k5z99ym1llgy6rskpiwv46tj2hdjkf87ngcjhll4j7lsfmbd3ac0zpewqnmqbd4tjpna1gmlcmz53wxsmxjdfiz8jgwh4vn',
                interfaceName: 'puywrdrgfqubvl3x32w3axhpr9cw2dqnv21gxn10s6s5pwv2mj1o7mcz4sbb2mzucuqrhfpw0z3xxk9czpcibwaziyyo2vyx31utwjimuykedhoo2oxlegepcnixeihztcwxp9kma8ltfegzd6cf6l08weolnbf0',
                interfaceNamespace: 'wkggowts80o59pz4sp2qa4r4ds9hgj42qkzg5h7jwpymprd0wr34e3md5l8qakmoysq1bmtxm3ozh0oy7bfk90xvdyavp2yy1anz7haepfybh049ijdmn39ezbdqkcdwr1s7btgg86avll2mag2vpxt0c401pzed',
                iflowName: 'svkokxnoanvtrovj6bf9fehxkizr528v5s1upexk5dt2jv2l3rypy80hr65zl6nmu7ehlew1y9fly803ywsbrsm5uwljf1ibg1nbqf0u85xczjcjdasrof3w5lqcfrn9d07mz8kj4dwen9zvjm9f09evsriz2qxux',
                responsibleUserAccount: 'dk9rqmehpdw10kv552ev',
                lastChangeUserAccount: 'lnti826pvl3tn4yjrz1q',
                lastChangedAt: '2020-07-28 16:50:52',
                folderPath: 'rnfui0njkzr2rj0zclta9ysg4iyuobz5vfbzl9tsqi6u6dqrt48i2iw62cl7sgypyxgoknktyrv2dz6vy0ggofr666usxfkdtcn32h650n2urg708cb68kr9o74zdh730m4usdo8bo0yrlz8680jo81w40f5zup8zlj2jyc6v1twr9rxf7x1gjmoneb7t66rnp3z0tdar9j6iwuc1bz0ryo49f6dd6vn82jwwkz0n4qairir2pj2vxg0otdclf4',
                description: '356jcj0cecpox5yufwfu3q8o7y9mxfkyqensg9sk6i3zei3iixme676nncdjdvcpglyqqim9dixh1dq52ayd4za01brja73v69m6vslmrz5rpmt4ardy3249isk1wz150n23kz98v8mns338lc21gxpct68l6fexce57rmiq7m1bmt42nsacfz9ne6se77db61f6vjhfwo9we43npk93bz0fjozqiw44u4h3qfgb0at07r3n4j0jv1usvbg9ltn',
                application: '5ga7ftcgblao4e1avbo6j9znn9h4ijlhx6tsj5zp31ega5o4yvhzjis8ww3h',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'bv4xiil6lx7tw8zeh8odjao1npn84hgkwat0sjft',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'ia6mjqxucv9m3qa17126uy1wn4wltj7bxhssmote5l88xeg0qe',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'exy18yniv8zy89p9kxkk',
                version: 'f8vn6ebmtr3s5s0cnx8y',
                scenario: 'ef27177ljn65zhg3k31fcc8vsroclcjr99vtkptvmtp3s39a2cndnq4nwgb8',
                party: '4qvkvlmyax8lqwgubi3yt762i41uwl6vcns39jdb5xejhzl3bmzykoj0ps1zxxwljcl29bshr1smyziml4bw8h4dzeklzqfkt749ru761jaqjldj44adlqi3hf4f3d21w1t23cc5e3ccdk1x60o5k3zivbqcfuoj',
                component: '75mmsasfcj3qfln8em2g90jxcm0udb47nlcdzh9n2w036xxo18n44015upqrpge9gqwcugy74zo9ef6plwgugsye74pxm2fw4iyqie90nx05g1yu5tsi80rhzdbv7wq7dlwri82f7q5bgj14ji0r5diq3db2eta9',
                interfaceName: 'tq39pm3ilx0hnz74vfhtyadlkhisp2pzaach3ho99dnk009p379ac6bhh2bqcievwwrhbwukxncecp39kl3je7vi3tu63o9uybrvu2ds9pdsbupdodkieku55t994fu1xicw7etrprhj4xp6cu4kh50yxhswl9h9',
                interfaceNamespace: '66p9avo80slclad7i0kblqn3ylagby8d93u8tvxkxnb2tuuf1f12fzhs5gf6vwrkyxhun83msubmgrhg6gjcwg4zyebi7fsp8n7gfozo87oa8w6m8dmdcwip7u9gk5iyj1qba5amvh2ml6umt22sj2w5uenc993y',
                iflowName: 'w65orv3ts8ccf2c9kk2jmah324i3hm5yhxy4law3jpzkts7eq4y63l0zdhvdzvmbz6zr3ksmid0cjm8kqrff457lvairpn9tbnaikzvm5g6dalgqwghgcw9n0bwl1kyswnb9zezg6pj8itncs6kf0q562f8a4wil',
                responsibleUserAccount: '5fqunadjhew510wmo8tn5',
                lastChangeUserAccount: 'h4aff08cz0a9lv793njv',
                lastChangedAt: '2020-07-29 04:47:16',
                folderPath: 'nbhychuqdc4ax4v1fp2yvtk6t0bkpjfe83fd7as1lizb0pscz17rfqt3wd4iy5k9i31ti2g49lsky23fv3yl0obmf64djr77xyyn7ptigxko95rm4goxf80rahzwsbueyzt63yvb6hx7ncv079ac1s5k2eubh2uv5iq97755de5c3otzrg9w7rwa39smig6605fzs4kxqwf46i7jc4mes3bug4tdlt11f7vyy8y06ipya7xw823g2jwn32joaag',
                description: 'psfhp8g8ayw8trbmqi7ali0pat3unzz7pyfiz4zazju54p4x2xa0fg3cw79er233t9oi3mrqgo5vlfuwpkfov83krbp6pgzdmcw9ixlsttc6u5trbulm57wi33tfu0jknibm3m2xg9q0exoyvbdb5wtrv9c5evmombhv6ck3pri6ks2f71xavybsnzphogfujytehu5flma6lny0iw293plno1khiwe9j8ox2b7ksg2vuur6qx9h26uetezdt1j',
                application: 'y3920fmky8rdhdoma70seqpymetznt4clwd9hl4u1ok8sttfg75t99zfissz',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'mr3p4ex7agso0x6u6home5otg938e8e5cy9ta96g',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '2hmw398qgpit5ovn0ks60zkmxxwlgycy7xejdxe0qeh887klvs',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'v28q6i6cexprw7ph1mzx',
                version: '9bwokzoqveloqcnukjd5',
                scenario: 'mhydddt27cjnsmtnmy3grs75kxemqnyemr0tflxazs1b036rh7uxryvmc7wx',
                party: 'ai1th1z8qutl8hqa64rgwjl8nke3gwjdwo858w3qt3sb6orswy2upkfejvtgs6qrq3gg1ibtkvoh6je2k11gbwx9ahu7esgbr4wzel3wzfwellosijrpm0eacmokgdmaduqx9gvkis0e5pb35w15jxscnq5ah2si',
                component: '7kyllti402rq08vxrpxudaq1tsbmmeyq8dqywwk1cji5fxwygky490wonnhqcl5q11qaqoe29heijgho98qbh7f89538zjghsdno68qkuhg24gt170sxoiscc227es2liy0c9c3ph29mmqf0hc1sxzcew39yn544',
                interfaceName: 'hcie8fq6607kwzh7lt4m3739glb98r4qepc46j45uraz3dg26c5je78m18vu4ekdf140ca9jxwg1vpbvzm77p7qdos3o1h6p1yrdswy243h0hzcx8hwyu4wyiv9mj6uv3pm49gsxmkwcrhg0gth9rr94hi7jgo74',
                interfaceNamespace: 'xt0iou7wofus8wevp48k5wd10cpiwbutcq5gwxfs46bplpripiapdotc9vh7ogx7qfat70xkwsmn2is559m5i28w65wgji6gpt1mcdalun1liks5hk0k5s3uj08mh0tol65w9g3n9c4ythma4bnhro74s83t5f9w',
                iflowName: '67u0qk7tl9qfy8gom3o39h9c4s6ee7ddabgity0xl1l8khzktk94vyqbuq3tagdodhenvwvsjs621zsiily2v4fy5t4g9um8q15ofjko1vakcah830vvfxhc1zjn067falrwq8lhjezcos5brn3q1dxsnmvkhofx',
                responsibleUserAccount: 'y01ie7qyghgpcx18f81m',
                lastChangeUserAccount: 'ro5656ta7femdcewg8q4m',
                lastChangedAt: '2020-07-28 21:11:49',
                folderPath: 'l1oalsv6u7q4ljmmaqg7pjf7gvfsx5ohwc4ln0magxbmd8gw0u0th5ud9v4muvemc4xhz1hkutrutqu9k049xj8ojq1h1v66gtrykqlkoet3w351l5ggo1rm16whr5k49rf1w8ca5qv605cthub0e89upze2yck56no7ozcmtb5mhqrkq3j7elbfg41yth5n0vmh64qyxmddbbdgk1vcws5ogua4n8og1ep9nb2lnbi96tnkyyb4itxsqwhd8r1',
                description: '6dlhe3tju16ygoc27vioa8808ut4ovf589gmtlkfamhiziczof3bt8a1xi2y4f77lf6tt6bi619mju5v8h7nrz5bovw0asxru505y4ir7o4h1wh5qzcb1ycmbisw7ku0lv8wiwkkcitfb3291druzqzu1qxd0unffnm2gjfmf412e92b24ftitac4f356xakykvb1lg4dourqfex7se07al01hz7jp9ju5ccju8lyjzv3bder56anpjudimf8yo',
                application: 'yhn8tiwqbst401ejmft3qabrwjjafx9e0yj7mdyn0je779fxh3kcfgbpvdfe',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'zijodhygxs0bxrzf4h9a6m7hd6nbt1vsnkozljic',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '6x0szqsquu32x8ffjcvlxz87unz2wea6ehwm9686isvf4xfpgt',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'bznio07fmfd3afk6op4a',
                version: 'w6je1f9qfgroc06l5rrc',
                scenario: 'jj9x674w6d0oae4yg1z67v528pkrfa7u414k8gjfiuqorkgu0jltgyw9ewu6',
                party: '5ke2qcqysd83xvjd225260t5xv9lv2ifvre779bw2bnd41nitvnvdd2hr36nz61ve0ii2ntah83zbv3bi3fis1sshfa7u7pikd1kyd9wkvfcwu25q4zeanrdoytv7xm7vebj3iujfnr5mkrmhnnwljrjkvm9aen6',
                component: 'erp2h01aofrmnqzwnhqctxlfahv04oydqzo784g4e6lu7b5z1foria0d8x4lbj2o8kz7tq7dy35w3t3i6od26qtg7tr96dvdllee0rtbuagjuyr60buzein5byu3xqpu9c9l39w9c8dixk31gjtrgt087045e1hg',
                interfaceName: 'beqzdct6g8gi2s15byv7t2z856bdc67wiz2tg8ayfaddio60g5cn2rtkowxhz018879l1hzzzdeyax43zc095q0w84qgafp2dqonsyqqsr7tsmakgoy4n4nl4j1isz1omlkx7hsw7nsxpw3ayjmsorp2o8ja93d7',
                interfaceNamespace: '00maqci2nx9792o8ladsupo29soyak442iuuahfknj5erwtd7p17na42hl9yi2z150uwz0rewkjqddvvwwmakr3e16dr4c67gtgzdlw9rdzthrafbkfug373fp2vsw1l8najoo4af7g5xojr01lik7k6vinkr9vc',
                iflowName: 'r6vliwk78xm219y626g8cktnmojgupv34lzzwyti9win0lq06z3815w65iff6rzdntxzfs972lfyjkxi8abr4pia10n88rhnui79irj142wvxbj73gourhogl3depidkwysuyay79l0yxvbm9d7qpy7tx617ku4u',
                responsibleUserAccount: 'eguabr93bzn2fxt8v05i',
                lastChangeUserAccount: '7cocm4bvz13mh36nw3tr',
                lastChangedAt: '2020-07-29 08:04:33',
                folderPath: '1r6ffl9k18ys89q07ydjqdcncb5cgzc991e9mvdiz1aq9n9wtuuuftwj33qm6nf1jxggp67nrymayxc6t73wuvev2wxp57w6dwrmdycmvsazgvi4cz36r0v06h6tvyeq9x4m09m53l5zb16akuk92kplu0slld3lcv2n6g9k8aj8zgfy21gjsxqjgzhim65qc3x5kam8k57dg6roc9chp2egxspv27bx0yf421p32y3gweqv0f2dhn3tdjj0sg24',
                description: 'ykxvfm9mg0qefibe3u4g8n5bfth4lw25umqcne6w2mlbmhixl8gtjlsdsqvj74ssm2vl5mrcj1xzf75qnmbw0yduyuy11m7grv7uzbjd5xyr72y392rmvxzvnj897r81upzf0uxq67dwjf5gvv0ttfqaapa0754inm5o7ct85axwt46ndq589s04mp5uzs64qj613ihagbik04c9b8c8jumba84qdlufym7lvy4ynab5p6ychvgbjz9qxpj2qe3',
                application: 'qr86f3nsnlbgmx30hv5bg6cgmmreskfdkazo0n09xotdrp1vifcy3up14016',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'vwk5lemj2qif8c74u627z0wgamu5jnp1v5s538ar',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'xirwes8zs18qw307hdnlv97u8e60mgh7xsyop12nawaziz6g3c',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'xir3cspi014ye89hgfbe',
                version: 'ike4bktrro3hy79ifsr2',
                scenario: '6gh3oj0lq0nuspfxa82j60f4h2lrie4wkgtulojw6amopsblvhwl8bl0b2k3',
                party: 'tb2j9i2xbqw24w7yas597oethadogxmbmg2ez370168y6ihsb7s51z3ln5t7hmh0iryt07fs5b64p04m97lluwt3dyqtv7mc46h2leypbdjchedaponab89rq38tol7okcsblaie2dw2ctpftwkz0khy54zt16yn',
                component: 'de75sowgicnftd118in0jhznl9zu47g9njaktncs3z768uozmlbcb083jzrh7k65zyi3u4jjqf98g4pwjxy4ar096s17qhri20fgga4oyp0f9a6n7s5mo3ghzilgcqkgb1snz2g0nkxoojpu4cmvctkv6x8vse1q',
                interfaceName: 'iiurchqfyzoqlu4oaq9780mssjchztgkrzlg8oyeeutkoic2mo654yif2hz5tddfy7uvontspkah6apstudi8vyyu6jnmz6d787zkcn882sc9m04ciro2l5s57dwvnvys4hhdtylkyw6tzopo61zit91r6m3yg5a',
                interfaceNamespace: 'edx8qal2ms14wuehlmb78kor1cjvqr7ckxv5lqocjp6vepbjdxd0wedq9vwxgeip6xv9qith5m8twuv5qgj7vp5ok2l7opa2vntqkb3lh0dkxwylm1wbp2ctvlk14ilwebbau43jj8gehqhav300wl8g45ixlvqx',
                iflowName: 'nbu01ne2f70jdq3089814piltu2dzybd88z2qjiu8gzcbh7wgx3m3i4zuj7illwneefu4yce4x15atmop8ugbl1tpraw7nlznoueb5ago27ytcgmk0myceksmjcf455jkuziudjagmls6pfys4774o47yxheuia1',
                responsibleUserAccount: 'u2aeix8m6uq8kjjavf30',
                lastChangeUserAccount: '6ye3u7k8dk56f8orautt',
                lastChangedAt: '2020-07-29 02:09:04',
                folderPath: 'k63vym72sezmfe73qag0u2i7jyks8ls6xxcwdurlbgqzsdrljsrhczzh9obbthcnv0mer4uhyx7s5xe2rbda4pf8rsqos36k3i95uwi5mfeaos1dyk3gkovfb9533m464e47fdhjzjqbduh8tojdo953y0zgqqmvr8m7pin9efw09r5rz7ro194ky4b1ae5xkjkplqhckeucy63ewvixc12555trq0mwn0d879zafwl49sv1evlhrzpsf8k7zjq',
                description: 'ytfszdqx0z1pdan9gwrggbp63y3ix2u12xt1067aem3ljqpmpuwl2xy88ro25ny7uva7y2qfpg9rtb87opcqktf2qqcu40aq0mzy1x41kqn9poukkffab46zl1pwbqk83s5ry3cc8sim5nma10fnu434f6b9ho9zr0lru9vu09xs5wncmv015k9u6gelwiamdplknf1xjmcdyzw7xi6esqbmaelw9jt6i08z3qsffsljebc730a4ptvjs8ibijsg',
                application: 'sep4r2o2o94qksed6sijhu3vdtcyl9t5ew819bo2u9ort3ppqajyqzax9wny',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: '1a6i3c5cpa5ncdexowa6kq7nrrf4d3hczp8mheyr',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'xm9rbybyjjdrmhe69bak2d2h1uut7ck5k1pnlzz6egkvutkmdi',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'ua2r5sgf723f7s9z7shb',
                version: 'rzne2x0pz19kovdgp2z3',
                scenario: 'gd9bq25762vbjw8gcs68dc2y4mfy1cm4iv7zhbnln2gnouanhjkag7xy9qgy',
                party: '86ynwmxwvmx93d8luziptx7onoxx6b3i2g31ok6bfyulv5y7x7ok1q6xk22upjpwftayp1l9ah36e1gcr6sjozjznsbei68ey4k2kt1myk2rr2ujshff9jfzb5h9vov0nwqytg4ltlue0yqa99x3gwm1r7vy4t9h',
                component: '977mtquehxiaaenikwilekbootlzjcm9srnpils7g8i2iyiomq9fv8eddxeuol87c24e0979pvavjwmrfb81pmr5egvdvz7f2mhvyonmwsj8f2xja14yp89zi97dw5j6s36ech1i862qmow6qxclbr2oe1iw8m6z',
                interfaceName: 'mbljsmscxpergdqr3v9qzfgwkizl3mto2vf0axj7wswou35z592b7v5t1drcxpwm3a2rfnepn44w76f9tod0ljkev0qlsc2awry5ubhascx4w64ey4h0sm5cfbxyaiuw07s1qpo74ml9rxrqs0rz1lhbjckidudh',
                interfaceNamespace: '3578bo5p1fubwsrcq9ofq9rlm6nrbtgtf4fdtdo2k1un44c4efk9zye9fsfb1xa42032rlk1d2350vocpx079tfbnhkr5ca4w4q4f9aic35rhldshzwrgq02y5gqs2mhrqtt6zulwf2lvwod9qqq7o9izic134uh',
                iflowName: '9zp2p06wz5h1b0p57z9q0nnz0yxl0tuxsygty71hqypbb6hwki737kcaxsgmgxx4azdjk6sqp6cb63n2lyww32qeicefmnq7nbezl1qri0g3s17qs9w4ljb12xc07eesvfeijn5ac9q5ou6lo35z7a6ybznjvpq0',
                responsibleUserAccount: '0wm2ir5hzmkkndtulvb0',
                lastChangeUserAccount: '31yfzlnoo677ocmhv6y8',
                lastChangedAt: '2020-07-29 06:07:46',
                folderPath: 'z4rgkk0lqrnojury1zdjh6wihy3ce0itbcql9bs5l3506tptfc248b54hg1oarilbrv8g8oxcy6ojxitdz55wpb71d7xppomqyz8qrk064fyqr7xydpz07euq27j2incvxxo59s8qsbmpe9vfbse8qvwz2jk7g75or8upuk8abhop9dtip3by7nnv1qq6bgnboo9egj8ivae7j3dnut41jz78zfhqh1eoqaoqcem4zwnpx05bx8817wxtu1f3bg',
                description: 'kshyc64jnnm27jv68b21ovkjc8stj832uib53pm2ab2iei6qxdiwwymblvz5kcmssyrbl9uynomamr1l9w4gt7o53tnfnkjrba64qyumgimsgp6px0eo9pn9nqk7gkjvr57g8ydb1ahqymc9u1f4bklkd6tgex2bl9s5d3z9k180sfo9dbdol7zhlfimc259wnrzg57lgpnn4glabe76jekkhatimt176nib0uif2igwnndg1c2jkj4j6fl97ay',
                application: '92zklvmgqyjfskceuqw9uaxk0lmt24n8ce6h8brs4nnehvhsiq94kawtjvj4z',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'm9j9vbams66vizcaxro9n4ujac2vjkpy05j82ycx',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'rpysrxeivwu14ye0zg2rkcx1h3z9yyxfa6qblhp0fstwhw8p6x',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'k092l5rsqfawtoqksham',
                version: '5ynqr8osudiz12tq7q9f',
                scenario: 'h04xr84piv412mlhbfjclopvnx4y888obls15v7njrycpisjtrr2zgbh04oe',
                party: 'xmfgfrkbk4xd7meiejqp023gv1nzesfa8tla8pbpop2cxhjv18a9ey887mrvx2sg6k015pf3mk02zorsxtf3ayjthb9xv9wgpuypa1fi19h06wza63uuefvmg456khjcjkks8qggwkz6b0jrcyya3fkr642fzfe3',
                component: 'r3oaqq89njfn2gp728okdgb3is539jezwjezvruj0x2gs4leek533cnm1p18evrm6ddkypjswwax9nctejjckjwo82kgdn3ytkor8dfhjcp2i74kxg6szstacohbe81zj5z8jtrrg8yr4qqj853m3aobton0kgln',
                interfaceName: '4iyazmh7vhiw8zenk1gj9yrnutcca8fv923ni59g1fgpucqa35pfx9iqzmfdh2garh78jnwearjogmfdxseypdweze3gr5svhsevwtndfhr5rnh9gzad5pgvlsrkwavuinqcol7gbd1nojv7nfxv7y4v04wbs2ag',
                interfaceNamespace: '0ijskqh7gcfi5b5m1bnvkjq5dhw8rjekihih1hdrc5ewdjgpxjn27ovnfp0jib6a7vwjrkbg0ak291dbikxhm9gnzzf1yafuvvtngcrc3hxhqzelel1rf7txv3u6qkaojpnpd6qxo68dqradr3iyid2ee0942e04',
                iflowName: 'bgbl72cmc6uhl0hnlb6awc87yv5gohas4k24q1y498dsrkfmf8nhi9ak2oxz6jnhsqhbngxozdnupizc705nf8agcbbvqxdard4fb82k9vpnnhghmxrsasu5q33m1nbkjwxmnsyly1cdxcva5rqqemdywe8eg934',
                responsibleUserAccount: 'ekgqe2imyboulvo4cznx',
                lastChangeUserAccount: '3o0giofvcalkqj79f6u5',
                lastChangedAt: '2020-07-29 01:16:45',
                folderPath: 'ivqwor8q7thv4r8e8c0uewdirbjq3k4ym8fcw7gl1dq2sjf6men3w0p4f407aayvahaceomlv7c94h64twv89j2rdyhmgvyw8zlma8h27i9meb0ayqh7g8oyysgf7idss77iveao1q3dsx18ohc7jo85osih2pbyuj6iscnczwmb7dv3881j2dzzu0qsmw23inp9q78f7er6jlsnj2xtpadfr9kntbdh64t2p09isbqfm5g8dvj1b7v7esuyjra',
                description: 'btldjpuktvlaehr8sqh7w6b0q9159e3x4fd6mzhnaxrqouxmz8cj41cn39wpn1tgpl8ezvjtli9grshr5wtu40r1mnglaznnei37qtikltl0iadb6b5nbv18qn73talhvhkwax07y763k07bg3kox13ecl6v1lae4mjomsfit98hl9htqqh9i44qytfsm01p8u4u8zqlllq0qmq098cqast9u0xvg5k8x0pkmj0i9mkkxc7a7paqgcjr4wssl0u',
                application: '53rzs3qp9om71dumsbg0o5zor28qzghdd5qy514h2018m42c84q3q7sj74wx',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'f45gownbso920kqz58hnzq76h5ansrta0x82pebq',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'wtaaer39wmryjjz1ztd2m4y4c8cijuf3iu06680ilddu9f3qi7',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'f5x9d5o0xm4fph5a3q3q',
                version: 'bj9y4n7nttuvn3q0br1n',
                scenario: 'ejxm70v8u204pq4al90bqtbhsvf89mhp1t3d0a05i3t0iyb6kqdwpa30asak',
                party: 'awybvsuttsvhw4ajm6ykmwielx5wrhu37kej2bsf6ek2ujtpyceb5o724e5z7vrzakecbcz7vjudpln8tiarx74c8rhqnz8vuwpb9sj0nmckehpgw2rp72xnyg9nt2ynatd5dtmweia59qmj20wys99aafereqgq',
                component: 'n6eulx6vytbq09ly94491cdfzy4xe223kowfttri4vlffhqd10g5nxp1urk7n5b0rx3qm3sslhyqzq37r8n0drt2o07ef4d07dew0zms9usskvpjxyrtrjdu0cz7kmpiw20cqx8tcqtnclrit026wxfelca1rb1i',
                interfaceName: '7zkknnu2ehkwyjjxc5h28f58gqdu9l9ttdlhdwbg2w0e8ohu3dnpc5gsc8ivyjprx5nykpuc5ph3f3e7gmnmeva3s7368qcbh9zm14cmtmy5fdfe3pjax619k0ubtfyr5wxn3fgrck5wbc242av4d5t23ij6fxfw',
                interfaceNamespace: 'cca046o1dxg52gnzumoogjw8yf0bfsqdvhlwyydd8btqr04qh3u8dgibt6yyqh9cf5k3oar1dknk0y63rnp40yg4cae9o71awku0nzc8bdc2igss7lu2odjzlomyjb20x0ildt7nmunwfm7kxloelllmvkv6oqeg',
                iflowName: 'lfra3vjplzivgkrimzjya0gpza7c3e3g47wef2qvlg82ftmdqtf9472uwbms3nk98y8v0oxsf6aah7kpxsr8n79yeq5f1gwjbae0h5pss8mcnf4bf8p5qeb8w65ulhlt3m9tvkc4nzw70gtcaatpa8n10e3q2s7l',
                responsibleUserAccount: 'l6xqen0v2wgn6079a7aw',
                lastChangeUserAccount: '3s7iesmokdm66nvfp3fa',
                lastChangedAt: '2020-07-28 18:09:01',
                folderPath: 'lvd14coo2bym7osoxnq8grc9lk4rrut22kzjlk353t4sebytf6z2rj5tct8iy8ewryoyn3jlu055tpukml5ze56bemwdsdgmcrnlpe1ymqcojlhbml6wb8ji8msmio6c5l8m9rcl1294gwq41bt9vomktkmyrgfcfedwou9uen4do08u9onwz6f7g93um1vbdb6of2a5vl58qzg13das8zhzc4mkjyg8bomjpbbwcdpzqslta1i1aypyendl2tb',
                description: '3uvyld1imppxf9lym52lpdf700mwc0k201g1agdus450uqckgze0z4844x5jd121yx1a00mqldc4b3amqyh8prhkpkayc996djsj2sev17y7er3ogonm10qwx3f2sk1tbt9o9srayn9210kcl4erf9wnqvjii2wdy5c51aq660p35vhbc0va46amwx8jchpiq6npsa5pqtilnxkbfmptsilt402x51es4fcnhj9pn757leczxww8taadryeu5cb',
                application: 'p9a8q07eyuprsokrlpl4et0uhhk3pi9osg6r4j98qwt69kjl7s0je5opq3i8',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'ozm9d56v8tbsmy0i6mybas2jg2lj278qpjmhbnue',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '247u2n4gcs2ll5899efs5bb28o8movr31xclqn8dkaditjhk0m',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'urt88nfubdwxtbcl0ojy',
                version: 'vedlzp2ofp3vqcw1v8wp',
                scenario: '14vdi77fmullvp48hwl88ttv2zcgyzksymwwdmuqhjyg4pdmnqd16rk6s79w',
                party: 'yhebbtkmg3oqjlzx22n59zan027uqixcnxi48km0y7281oc53qokzi4nan067avq431dbugg6if6a0wfnzxw8409jbj2035oo6qbpgqudc5efwxinxxy7lintmd7qw82a9zn0n7b4k7h1lib2keicd4bpumj9r0m',
                component: 'dw0uk9o2bbo2yhtq4paf8rhs1ccm6th22ic2xh78zqb1p9z10piv7gwoemm6s4ril7i2ckd6769zpwpxybtvrfna776c3mzclu6x8abunbmas7yi3x71v7x13hkwc1x8j5fa691ldtcbsxwnzmcr5amt9j4syb0i',
                interfaceName: 'sm34igk4i7ri6957pl4k61whrfph9xb0une0op8uxkvw0u4f8u2h6j546awodqlv64wz7ljerxrbpcb3lpj1teh33yanl3pv2sxi4eqa00ldt8bt1nz9gjaigq9au3exvc5odfx2ux9hv6gjokqu95i36bgexz3g',
                interfaceNamespace: 'y0ga0dxcid19loafgroqtttugi6wjoxoyj5qlfjg5i6yyvrzg908u0y60uutjz4vgm4lmlfstsv3i5edm0e6t0rffrfuy6slhmes9xd265odc53bx8o262kotpvkoqe10qpevau06y00l20b503hiwaoz5c4fgts',
                iflowName: 'e2nzle5lk7rmovigr1kwwtrjmtzm6n2jr34ecltu448k1dqtpyx4ykmu26yetd9idlwopzv2jurakmdofp5s5qxu8ae1wwknciguwg9e3rhiiazyo2rmtq45ak6ebkv6n73o1mvb40izlkvwfqjjvux0k1ffry4f',
                responsibleUserAccount: 'kge9uui2m0jyuk38zs0d',
                lastChangeUserAccount: 'zjljetqhxeyzlzazcb7g',
                lastChangedAt: 'XXXXXXXX',
                folderPath: '6eob28mamyrp6fmlh2ga1ksyn6z91caqrbolbi9unez9dpit6268j4ffsgvcvle4a3oxdezs5nktrjpamkoa5tctktngbsj9ilop7pw7h85h7nuo2c3dtwesznfep0aggjoze0hn6qzc4sgvqq9qt9v5oiak2kjq3wrjvkxm7s73oamful96rxzjsuzssgzxt6tb3jgvwdmyko46rvbqw3vueualc6jerqa2gbil8hlxp8k46jk0xk8uee6dnde',
                description: '3wsb0b5zc02x3unotmhf49jdcxfdh5ppi2ae37lnbr0e6lwvsnu47jfdg9e77ehp9uifh41qsxp3qoh8catrhjoxkn8dw84dcjheepre3rqlr6jmef38obz9nvrx901wo910n7kzo13pvihpb345z71hu5qm5hmfwtz64503ufedvweeb9fq4rlo5ltnb8vl6d83ftfxq0hmfh2bnsiwbk9we5nvukzt82krmo0oc80ygwpkrkwhed3w26zoi8o',
                application: 'b4wzo9ttlwbztu6nq335qvbyq8f9bzq6huqt67be9d9jm1hqwg7te7affrlp',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'ejq4aux9e72inoqmhuoylfjmfqlkjc4b9erz9wtu',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: 'd37321mx7h65jgb20anv08kte3xd7832mo19sbzwib73evwo6a',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'moktd88j9x3j9d7v8dej',
                version: 'q64os5zsrv7syieduze5',
                scenario: 't3zdb4x8p0dn5wdy00u2gifzvpfpfy4ckxkuf0gsqfsjvivlv8ykleqoq4z4',
                party: '5gn5aa5lgwf2w9aktm8gq6wx529hph7rkcmjln862wdgt6o8dhtu3x7p8q842bkkciv0rncjmyvpplcvb1gxkonh3s52fqz84ism35gj8d9buog1mcvo1k6o680k127jn9vrlfc1uy10es9xj1suxwcca7meia2p',
                component: 'swe7fwe0u6nyitb5ctind3hfc5aaqn7a8z7oc18gctr8bd0g1smx7nra6eo70ofcmisb6wh8jj3a2tvhhc71tvby6deukw4ppqte0ikrqpvr9zq2sz2esj01ltpm37nr6akv1ty75ijdvcdaeuj390z71i8qnlxf',
                interfaceName: 'x3c0m0sym7rfrp995fgffuiuny8wd84pb8jhmhvau3t7dp62wojnor0h14o63cilm3h1bgbvms3urkz0d9raywf7myouisadsaftu1zeuyywjt2fscxqc0tpro6gjbcbuga2ae1vbj7uskzk44wv4ono23h65epa',
                interfaceNamespace: 'l1w45am1y68xj8v1peh0shl8ib0djpcv38rx7mdo52n9xj0mknb54lknpev8ka4w2cbkwws8lyf9cveque4nxynjo4nls7vjihzfk3qftnl5x2dtrdca43hc3kajqlicm9geun6avhyxwd5k2hxxs12zxdpo1j2j',
                iflowName: '0i9g8ejthr0ytd9p9f3hkzg72azzm90xchiiw00hvd5w3u8amt25nvjktpkfaziotszqsgiltj8hfiyj522mrz00xhrzrcuobnj05ji3l2n2i73n1zsdiuk21ai646amqtzphevhbtotudc082c6lbdqm47hjza2',
                responsibleUserAccount: 'u5tjdqhdk57s9q6dgvfn',
                lastChangeUserAccount: '3wzlfnztonefzgf9hl1n',
                lastChangedAt: '2020-07-29 00:14:52',
                folderPath: 'ixf1lv9iccxc879mp4xklywxmtsae399ukb9zgfj4qk5dduh3ruk4fpmllvh3atb02khhirun7jmjiaqeuqa0a8310vh71vd8u4flobdll0wrpc7xc1f889pjnslnu0xspf3h4g0577svbui6xshz8ke9v4dojxsvmuxhq3oh354tfim15k1k2y1wkdhk90niqkku29yoy43wwobgrpqcvmv7bni38n7y9225xoyzw3rvi6svsm6htao11u3ss8',
                description: 'q52yhjxkooytkisnk5j9t5oh5g4ekkdzc4z4ogi9vvme0lnpg2fyjretdypl43cow3tu5yeajbeus9z5ld1uvk5xs8dz0wxetl2a8z2c0kxus3tp77nydqnfma2k9eb4ks7n4spvv3sqc4y0sfw1cbsk8xlpay6aso177cywlruqx9hwza9p9blhjd1jabirazdqt2odjjv4vy9lmm5hoxylvi7brz8igmqxx29o1gdocdrl4m1b3cv1umg7d5w',
                application: 'hilcocksfhf9lqw0gxtfgs54ca1rvakrhpx2wn5slkb5gsa2ha00stl4pdq0',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
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
                        value   : 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab'));
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
            .get('/bplus-it-sappi/flow/fd6a6d4d-73a9-47a0-b819-f1999bfb5eab')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab'));
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
                
                id: '4b8f98db-76b0-48f5-886b-9508f46277ee',
                hash: 'c8e1j927ui0oc8x8458mknzdhhzhcivxpds66n7m',
                tenantId: '30365d67-5a89-49fa-b304-20b8c3a7c9b2',
                tenantCode: '9pbbjq2q976h2viytdgnxeo6awht2pjja53t48stvyvah6yhfs',
                systemId: 'bc24c252-bf34-4fa5-9026-727e8cb9fd7c',
                systemName: 'lahuvwqmgrvtcc10bwgc',
                version: 'emsy9ysx22gttebjsdec',
                scenario: 'l7utsoglf11f7nc4yrgomb722rfsmbghc74ezbipdr40ojlk568v2qshey8o',
                party: 'mhlb6mi04o0exxiwjzxsxmj6e4cmqv319qx801pyqpgc5r4rfkpyq0ofua1ra8cpr9huhnxlm5ntqzrfpx0o2hfpytb6ix2x0jopnq5s1s06eep9z9ufnnowiclqty7hnfjdimxjo3b5ko8vs6zbjmxcxjwmxgu5',
                component: 'c9v8h7m9cx1t4i6wx1jyz6buv3dbea579bmx3p02c7agrs56ube69leohaomgwiyueg6uc217jsgu4ic4w0z9vzmjqnss83zszs27wtc6qiec5z9bm0z534pd3paom6o9264oylxpan1zgx5lq1cp4szbwrq0bf6',
                interfaceName: 'wk2ohjpx3zbkezexoomymq35frrun6extw2ecswht2b7xeq4irr24kisp6ssw8z64vhmkz0p2z0kbkiu2tbopiexnyj9ar9qyreru77cf8n33q4nt2a1jch41kclbjfjernxje2j3fnpodnnds9onxyxnvks25kq',
                interfaceNamespace: 'dpcmta96gtneydf0pi81x5kwblptemwji9r4s5dpqwvpinowz6wclhfjmzrnunt2a37garnyvlqyz1fpcp3qzblb6n2239wxke0o2vxc0lokgy33ylzk2e7hoe77iq6djj6yl5ch4268h6rviogbjxehsq0nzrmz',
                iflowName: 'j089zx0ap4pd53kt5hfb5xf0iqvskdhvr5yhd63vhooez980kgdb6dw3kjz7vzhrxklmqsdpztfekkw7bpc3ke0aorumh1y802v08203u482ekzvqrnosrmm8webvazv01inouv03ez25iam0p6s5kdf055z85er',
                responsibleUserAccount: '8y8x99rncnzowrd0ho2n',
                lastChangeUserAccount: 'v1vc3xy2ptwn7x0l4c64',
                lastChangedAt: '2020-07-29 08:15:45',
                folderPath: 'som3aff0gg7hbonq962q9thr62c1aagmue79645fd6mr7t7h8hsov37udr9sq5gev7oiqrq2pgel6rbr0e1ovi6ezt6m1kovqq5lrxsgi5ouy0trvsv7n5o39vvlh7get42iyhczb71ayuyy8qaa5tjezc0yqqpcs06kgpssecsxu536ipgvgw9n6z2823vjrkz09r1dnxpn3hdwunndy85j2ul3w9fz2rc3dnylg2kh5bxpezcczh61r9qo7c6',
                description: '8fs36c6lhlirerlbgqw2gc028pwtoryqc9m7x98stcesnz793ps6a5t9hrr4i717pn2xxb7xw4g1b1eiuwc145rt7juhedsnly3bzvx9ok9zz39mou97yf33c9i03wsk85p9zwuvl64k1ibi1ho6r3bkolpqu9arvyaicsg1taqm3rc45lturb15s6z74ts3bhds2ogcnxke86jwtdkdaon48ff1i1odxpyxnrsihol93sdmbajj26mjpclrwp6',
                application: 'ahofqgecaxvd8hdz1m6mmzs3lk04cd0rixd995hwf8mpzdp986kniaajjenb',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'ccc0c2ba-6765-4df6-aec1-8dcfbbc9d953',
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
                
                id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                hash: 'zebkydeom72vh72q5ttp9nzv8bipm87ltjs4sr1n',
                tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                tenantCode: '5mobl7fnaxv8un3evac3m0gpnicd2pxljba4vxdvm6kpozyrsl',
                systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                systemName: 'p0geknehzx5ra44wticl',
                version: '8riudrdbroftcvi6pwqo',
                scenario: 'o850jpu48rr7d1nedeb6q0oc3s2p48syqsyz5eii7idora19ak7gh1gim6k9',
                party: 'tqrllwigamxove8izg34ktese5dba264nu53spjo0bdjpl2ugrl5s318ve22o5ir3m2l9qqq6lfz2fj9f53g1q6kbxib222m135uenspq0gl8px6zs47kpk93q2c2mm85lzrwuiekrjdhvwu71fcqqikxd79s3ae',
                component: 'jpi98s50v6fl4xzae4n7httudlt7j5vyrm1iftvlukiijfoq21ults50c3eontmx81s6buwjzou5vmtg7vt8m03p2t1kssqpa2qp0gx0ikjeszdt2ylamjvvtv2buky28kf7sz9jwn0ifk751bl2sjvc1fu6rwpa',
                interfaceName: 'jrwadt32dqryl6xw91k7fsavbwwpsudsmxqt4j5ryr3jub1qnfc58wm5axulw647bzrqhmltkavt8dhd7cimh8dawoefutzrtgb22dd4pqvfj394gquzhqqcpze08otn9smtj8ixqnrd5cv5k52hfd3wua63470k',
                interfaceNamespace: 'yyyr5634qu2c1dghwq5bs8kph5bi943wnah9auv5w3sg82c18ob46nerobk8v8202qtfixq5hgice7riur1nmvsbanvzq5aifmuova0sav78nza9wszgb6napxxzmpx561kv43983mng1918dwg8az1pexppfuc0',
                iflowName: 'a6731miy05kjgm8mext972n5b9pocha5mlfhhygsuyk856g2bqc8eonikec1u07g6flk83zj0nsb1hbiwprj0vpctmnzfiuumi2rbdrq93a400dauk4f1s3lburwdj1h14or1ig49zoef2vh7ulb5knfh8mxch67',
                responsibleUserAccount: 'zf1idt3zntex9txbwb73',
                lastChangeUserAccount: '1irj6mh68g7wkbv2t746',
                lastChangedAt: '2020-07-29 06:49:03',
                folderPath: '6bx7tv1l1nnhctz4uf2u1nb756eryk9srwntdflgefgkj6vdrt470gka9fobxacomt606x0ngl5lbv1oh7hbkx6s2k5zu8gadncip1zjrwjy5om1ok93alufdsdaph3g4u0ukfftneearni0ztdht232kumubjyjly7b839nt4c2d9rews0r2z0pn4f7ysk4cglcuytcif273iqv54rbuwkiu1h6e5bfcol4mi8duystdowe6l61sqyz0k3jyjl',
                description: '0xhox6liowmvlo9po570jy3xvsi99atmjm66v7hs6rq2f7nhwpn29fm6iefhyqxrunnqy00bvgowwi180g2e74by63g3xqoma467dv0z5jtnxb4gc4dqgzvhoisabiqor813vsmgj4q7tb3joj7pv2gmho9f99dqao1bfbwkcc97v92zsvzv30egcdo4954brkpqljbj0w2obi5i3g3pzi7yb0k1kv9ply248ln75o7u6vfkpe7ezb0btvkb482',
                application: 'xfyfk27j46hrn5cnvo37m97w909mdlth2j0r1gu7ohaqwlwwhpqdcp4a7gyl',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab'));
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
            .delete('/bplus-it-sappi/flow/fd6a6d4d-73a9-47a0-b819-f1999bfb5eab')
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
                        id: 'adb22fe2-20c2-4d91-b43c-98cdd2efcccf',
                        hash: '0w18o2uatcsjs6vtiimw0fgz32apu545i5y7mbn1',
                        tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                        tenantCode: 'dbnr4xsu5cyzfegc1fjyk6oaam09zod1tlzcm8ycw3c2pf56l6',
                        systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                        systemName: 'qd28140cfw2zgihioyyu',
                        version: '5j8zdrkrszppcrycbys3',
                        scenario: '54t5uof04tn1liymgb14sobwnfmhuvlsw1dfdukt1gzrevh1383ex570oyjp',
                        party: 'pfkxbk4xympvs660jwwz2lqa30ogj10yeny9k1cw4hh0rw27sx5xtscpnayt1rvhdqlu2epxevcy913k1ffju551ik3xcagoiakhu0gft2c2osk87pc5bv69wevlcf7xmjk06iad7npi93btxgs284bpz79isq0z',
                        component: 'm8swzj6xnsqxu8jv5lui6x0wwvxpu4dqsy2iygfz8wdm52y65m4jssizw6ha7z18f7uao5avl5gnncaxn58k7grip0gzpqhbjnc7sliekvq2tp8yw6xa8yehr8bsje0y9oadnldxeo4fow3xcx8dgb1rljboksoz',
                        interfaceName: 'rfbwe0fczr2f7fc10xeolh8q37eqssunngxqqdt9qzgpzy1yh3k1iib7se9f6nefvvn9fcm2fg50efrchmd7d947qmcu6mc1rilz1flljgncznumjxnx5klnbvexvhkyi4e8a24ikd3oznalsj4itw6yshqthltw',
                        interfaceNamespace: '1do7e5kopg815iw8xnbz93dlmg1yxkwo6o5al352zhcu6g7u6jxc0n2y3h6ec8ejz252f03q6reelsl0fc3px2yavqop3f5vha6ui87wz1xlclvwxknitd586gs5f2y6lpr9ir60bleavqvn6tg61t80jjh4vy6q',
                        iflowName: 'rvgx65ov49h3j6avl9ouldt2t1hiku8w2exzp6sibyfivukg7hwoky2oy5vzvh8k4u7tmwfr1or0pvj9jxey98adcjrgbwspyn7xqb32xeloyqxj06vweav0m8uj00w0zqjwi44i7vi8qbijy5mx1zj6pmo13uz2',
                        responsibleUserAccount: 'qnz4atkmh48yad4kci2x',
                        lastChangeUserAccount: 'qx773whmf90oj7rizex9',
                        lastChangedAt: '2020-07-29 13:55:09',
                        folderPath: 'ynrmbrh05x1q6thoqu11duub3dfkqjpxp7nk5c85jxzh14pqbmo6gwxe4pjudhh8ho7kg2eu464ebsmippow6ilym3umqhh13idin5sh8kgrvysc6kp118ontfrcoq8imxt3rwkj05ml4hywk0bhm49qlp98qtzyn2ibhdvmimtk0ryu2773oycfdp1xy2rstbzlsa4yp6ioqwlalu3d72u7jyzpqibhflm52gu5ju82v0xen3efefodbk71dr8',
                        description: '14wu773e1hsngly12fdw0qg7b1vur8t9jfmddkuugudn5cveuvq16ww8ye65ltl99jocx4bdhbklozyh6viiiqvj77gj9nsfh3zca65qnin3emi2z5qg0mahy9eo61pvzctbyl7lxpauoj0kjojx4is37l8ejgqnnps2tvmlko17vi97vu4glly26kff9qljyrbd7b1joorp3rjzhkyzuj96a5con1dqem6h7450orh30a7980643l3cotyf5tn',
                        application: 'mwh4t1rzg5wtydkkiyjzoyzojcr781pmcom2xfwd3d0zfovrpthcc2j51ols',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'adb22fe2-20c2-4d91-b43c-98cdd2efcccf');
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
                            value   : 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('fd6a6d4d-73a9-47a0-b819-f1999bfb5eab');
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
                    id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('fd6a6d4d-73a9-47a0-b819-f1999bfb5eab');
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
                        
                        id: '3bc12d8c-c329-4a1b-ab4a-1d825eba5306',
                        hash: 'ulbd7m5s7u4akrsi76tsfkkgtpyqsj4vjh32pt6y',
                        tenantId: 'c414201f-b925-473a-8a56-0eb6cf7e5b5c',
                        tenantCode: 'cvbdqnqurshc0rcoouhe9l0t1nenghmkgc8pmlsg5b8sdr6qo2',
                        systemId: '9da05257-7a07-4018-a1c0-9112f4f5f7cf',
                        systemName: 'exd47h9lrun441pqnme2',
                        version: 'tp4x765bgl025zj62e8p',
                        scenario: '3b822guynfa8tnl0fuks9a7ap4vqgholoonwwlrvg2maso5wl8xdreha9i0b',
                        party: 'rkd9shk8u5e66u2ia7bd1ynx79007eb0029rg4t7r5j5vyhnjyg2xney8ya48dpvanm5ujqa5k1fiy1ocv9vex4arksac72u3csoqaqp0812zz1jwamc5v0llm4wue030xerb96h67gu7qipzlvs9cg55w18dluq',
                        component: 'ugfdq65x7d0rf5r4w3umavgx8z60u45iaspnxig8igu5kkvd8dny6zmrjaig381rqtw4rgwxx9fju0iuoqzn3n8x0cq7ir1tjub6az8pknsdl8xximfr8t4t9z9vwdc7qwregx3wzmnls5owzaqvzc1gis8tuwx8',
                        interfaceName: 'vogfthm11bl2kbcbe75uts7182sv0v94ktq42ukigz4akkgospaz5fnkgfoubp35vffken46g4p01y0dc8i531091znyhasfvnqbpwmyfityohidtv8qqefvmse9eska7oxz2duhwlp53pgg9tgc88bt3tj7zqnh',
                        interfaceNamespace: '1bu5de2th69iap0ggacj2ojv8n213tdsoouazo0m7e768mkq69n6pu5rrhnf23xbml7df0y0er32r3l050z1avqoad48enmqr55kcyx1ru3qzjwpt5xcgro1lkm8pc237flxkpfck6fnx7fhlbnnp6rupq4jsk4z',
                        iflowName: 'zfcq7b70668m31ih5is5xzreurl2hh9v1o40i9dqtfloo7umrolyx3qb1c3gcumtjcarccm6iiwapfhv76qmkd7yx5v1qsbm4v5hrgx7fbljfznczalscy8x9t57n584vfasxnph2wzgzogiyomw7dday4fmail2',
                        responsibleUserAccount: 'gqngtdh3g3nuallcz3d2',
                        lastChangeUserAccount: 'v17i7nao5pc6g84mljl4',
                        lastChangedAt: '2020-07-28 22:42:10',
                        folderPath: '5g323k32tqo5fb4gb6k2r8rar61ft6mh6fsgr21h2mjryg6u2cnbo7s09wmccf16szgg2nqyt3vp3yffjb8iv7fwdiord4fv53uf6ypgp0yav9pxn4y2hukavc68zhz1ekardjy6irgjeh0v6gho7nk4tmgsk7b9qdnsarjpdpihsiry4i3olkz5v7a27qse6ozf76nbxt16jvlpqcwvzsz8dgr5y45lrz0ru8u14bvapmjic7fhp07bi9323gh',
                        description: 'fwyx5vwja41qwup8qwr5dzxaahvj98uxn3yh44fzdvojuz4w9825rajg72jacpng5fkbvztg7vb7wccm0svu0r3gdb443ev0kz4oo5t8zlrnq06cba3gl6ruusu8oohn5iek0ragpxbovmvdweiuzme8yqnm61y8k0friar3d0xm2zpvbwoh4446melp766n82d3aizsouf48dtg0di7lq7lcsbgxnlolgbp98gyxmjwox65a2zyo49rxka7zl9',
                        application: 'eoowl5u2vs2yl6h9ssqtxtm7b3kwyk79bde5uiniy5xkkagy3lfx9l3f94kc',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'f7d7e639-0062-4c08-b432-c54b630937fe',
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
                        
                        id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab',
                        hash: '63ky91fos3x1bbpwfjm28bw02dzngmolzl1286x8',
                        tenantId: 'e100c5c7-62a9-4d07-a293-08d41b59792f',
                        tenantCode: '6ycz27cs699g79z4qwlprsoit3b2tn027bqe4qtsudq6m1lmxv',
                        systemId: 'd2cdf6a6-c106-4e6f-8319-041619fc96ba',
                        systemName: 'cg3p24zx9wnjns80zd0w',
                        version: 't8hfnomc9pthzlhmwx1m',
                        scenario: '5fe2fa40b7joyr2ikmzt2o6hir9ow4ty7xxkk9t1m8y1i0eq3x62vhp5ghfb',
                        party: 's9me05io8xou6l7x00jew129qvyu5nm52uudpbtm37vuk0gtx3chhh73fja6vk1a50u1f1vlvq13nl67a7y03ay2gzvskq9iupg1k6djrmcb763mk5ke9s54i60krmad605yy0mmqtfxdm1pgvsxep2rknlrnsaz',
                        component: 'x73e6vnvzjcrgd48mwkuhpyb6iw23d8hiu9why0foez7ebyslmi6qsly2tx2cmfsqngshqmac7j2xcan2pwjebzu5ln2ecosxeolvctma9pphh3s0ghxh70lkpvpilf5quei7mnriji7eix1m8w9pne2s933iyjb',
                        interfaceName: '0ot59vyhr7xo6ozsfygh3glk5ili4xzfdv70bagjls2u9jv1jp4videvvm3z2f0873nnl8lznh517vv1r3vdxmkhzuzleqmwpasw2hp1k81vkmtcbtbmfkyk3was0qnt7k2g58aetq4m3o0nyjfenk876qqry7qe',
                        interfaceNamespace: 'z6lprffbiy4nqfz6ug7e5mn5ls3enc0l1yy001ghkbtyvjikdob3xcahskkwsw7azixp48kmvcqlot81mcbfrqr1dypfqimhjgpb69hpwgdjcb3dftzl19ljlo30wg85eq3v9mqpkejioms72xjfc5shlxu2eoo1',
                        iflowName: 'i1ywyoc6slupeafcr79wig7htlw5rqbmilr6pf8ldpmryv3hw7vct8j0uv9edq89zprgwgqvhredy5ooe7sitthdo9o4lu57zzh38k1u15glpyhvq90nwpwtwowxu1r1g6k9qy4du92211u4lbazrywusxov3zqr',
                        responsibleUserAccount: '0bk8yendjlizfv7xjynh',
                        lastChangeUserAccount: 'v3fpfods94i9pj40bqc8',
                        lastChangedAt: '2020-07-28 21:11:30',
                        folderPath: 'cxvmtatp1128n4o6d30ecgld1w72embdt15jbx0exa7hn1q8nw0oja8gzm2xomw0x6nxa4dugnl9xzdrh7agvqo5ipxsj1gcqoub56q3w98z1eckgn9i3urz1yp1bzkbgr0s2b1netypg1o3tmvna638o2i41q2vwv2otdw5zrhw3qay978w0h32i6fiythiqe0qbm21lzhwh3e3isvkq8d4ohhn0c9ta187ffi073zi8hzlyha52o9jtjrm5gf',
                        description: 'pdr6z0wlcv6v2w03epptfd76zr7t9cda2uxjcf28f0uixkg1ywojvqfdos6wyvicjpoe7dk4kpl3s37tm5mk797f8u4xls6gzjs9zhtiv517nundmhmjmih1dlqsj3qftycisxxhpd49co0ic7besyknz5karq65zm6p9yj0feln8kqv5ddb9t2xdb06108veh1psn6zgf07w8z4dca3638qw1stfxd5hxuapnfradlod3rixkbc0nmk3nsnpsq',
                        application: 'zqvf57izsjw1fm9gxf9e0y3ust8wbuqpuu27tsh25p3gceecgvc09h23z7tw',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'e314c0e9-7531-4753-9e17-85f341a25a6a',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('fd6a6d4d-73a9-47a0-b819-f1999bfb5eab');
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
                    id: 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('fd6a6d4d-73a9-47a0-b819-f1999bfb5eab');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});