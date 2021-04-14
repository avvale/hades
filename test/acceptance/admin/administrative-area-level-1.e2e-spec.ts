import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('administrative-area-level-1', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAdministrativeAreaLevel1Repository)
            .useClass(MockAdministrativeAreaLevel1Repository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel1Repository>module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 't3lky2qn',
                customCode: 'kl1qt8m1jf',
                name: 'qmg2say9tcgkx6egxggrfr3692ih6lrkhyd7bgw3ufeimkavdfmk8xqkiem8z2ybzxsqr75mkgzg5ggxmcxhz7t1zdgyp64lsgmdx111ob59a0c05zodxkwq47iv9sv5qv3b1trbnavnwz2y5508g90i6plxsu3a6aq5ys6xp5x5btl8q0l9lue1laryzhayyvz4nfc33nn40uasomvkzlbaor80wus3tv8xplagliok59ypyncvihu6k5iv3id',
                slug: 't2e19kmivk4pcsk0bd9kr2wdn2n7dkdz3fqxx3xvxompk94607mnipf46oq5tyoh9c2atm1th32tf1d5w5zbzvefbmpfbc43xb6t80y8reasw3fztbjym16gd6c2n0mf4fvu0h5hocnnz9xfwx32i1grl4y3mc9k8eywqcp3ixkz3qv0losfnhrk7zberjs7kf7dxvbjr2u9iz0vuvn6t2r1gyi7occ49uniuqwptwyil4hnkh4c8177463dhp4',
                latitude: 610.61,
                longitude: 914.62,
                zoom: 75,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'wiuliutv',
                customCode: 'giij9h292g',
                name: 'pnb7fcv55le6axzsinw998wptyqz27viiullx5q6vgqk86mc1vx2siq2gxycb835vj1mjauyhrbx2l9t18oygw037zur1yc4frdbbku972tclzktgsq0pr6yljntuofuzqao9bk3snyk6l1c0qwcqvmn0l7y21c06jxozez1ilkqogt4kj3wuo7m7dm6vrzmp1ay5pnzhb2rrlxi98ltx5nfutm0al3o7b8td55c9gvxj2le3m6e4sbszjmhqz6',
                slug: 'nww731b46cxxi67wqxu1wcmmqvh37fappd0yfzblrffvjazri9v05z75y4d8k88sgdhw2iaxbzs5yi8i5epbai7t7vkou590w5gh5dsnt4c738egqhsc70g490gh5avv1uhbkyn7wldu5kkv3w7hpo0u8yu7vhn7qwoitat5icdn1n9vmk2efjszz3pno69rgazdmqokgfi7gbsdolahtjvfrqv7vqura5l2pinp6s41yccurb0az8ifksil064',
                latitude: 370.50,
                longitude: 157.66,
                zoom: 40,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: null,
                code: 'hppe4mkm',
                customCode: 'm3fzgvzppy',
                name: 'a81gdo05uefhsz3kkuvjai8wia5t6gh2s4ze70a9wbecyq47hbr0i5pw8j4ijpf1a8atjs4xokeqqk6g16gwecuw8aku5qx9lb67q8zfjbvd1l85rg8axrpvkz1jc2e4o0w3yww2vga3u7bpb1ah3wmbwmiril9pro1c21c32jmleg4l7ncsvwiplcm4ycf4iflssd3sa7dpwjcev99l6x17xpq4zhwd3auqieevupnbe95z4agzf1oocfdep0e',
                slug: '8mej0pizb9cvy0qh5apjljo77acqz0nsiobw9fmzyhcmrbiiwohsofnkpez2is0urlms6fp4tzil4m0z6zd2uvkup0bzis3vny09xfd8j66cgn5f5nu5z8qxcp723ktgh6pb1lwd954oddiyonapvi4b5zz51bg4udej9sqo880k4bb2y2wdu89v68wsx4vz7pwmgi4sljxjanyq9hwnr0jkwp4dt4uhj3583orx41p7eokxoa54xrz6uf3yps9',
                latitude: 461.70,
                longitude: 854.28,
                zoom: 52,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                
                code: 'b7mmrtwv',
                customCode: 'ghrd3ifss5',
                name: 'c4w7znj55jgof2jiye21hwxxji4zo184mgz192ciz04imvb9gfpfa0b3v4pjdhz46xo9zo5ivvac0hp4uiqood4xw84707kfy8sft7mr1x5wpitkiwz3cl18gyg1rdmluc8uyo7jjnzlo7ut0syjfgixlijy29f603jq0kkjl7rkc24yp89xpqy3w0knj3ejicrv9m0wdxmj29yep5xldjw9zkbbcs3q8n3unvoc2aqb8359xsaohp9z0pbhwdn',
                slug: 'msbc0nor2tomn7dxe0ao1hz0ahkkzcvel4kly100x6mszit8dxli0s2js1edoluc3juur8fy651lqt5b2fnwpj8cbresz64u30alskfxnlrrwttj9d2o3tnxhis5b7h36dt69ozda40avnqmz2g1wdwnuixwqopsy7sckmzble8srt6xxy3o58v1hjg80sskbrqk98okmcoajv24lasfsz41pbxgrx97jafioz3s9mjt1lpj9xciv1qqublwg50',
                latitude: 432.73,
                longitude: 681.73,
                zoom: 29,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: null,
                customCode: 'pge7ao5gle',
                name: 'o37dchlsvqmoqd62htkl24va9lpj0hv1v2yaa9kc9v2b51ai6gyqozjcm44xj7jcidxlceg0422a7maqfkvkmn6kk9gllfzsjjvebfs8625f6vxgdf80s0anfji3qk6d9vzau8q7blealv0e39p0fv3l9g57n4d6ihizzme2ce7njk3ga2okpr0qc8e7os8jj28pgvprtze4gloysqsyin0nfjc7y94o7pjeo9j7y2adoiazmbi8h2o0t5hnogh',
                slug: '1uc1zzq97fk89vn7dctmpzdebcgw9o0xl9jua59nbighj8nihp02um10j62kc10xqlos3m2izow6ymaypzf6ozdc8wnk7t6mplgosnjisjhvu3zg9iw16me64vg42behkznwtd7xwjsompesbkokly8y8r58gwdequ3rnl62fg5whaha61b8299l9lxygl3cf7f895rxm84byzzexywewouj4madnjgpr5wo54l8qty1zd3ziouo63n7d45nbvx',
                latitude: 838.34,
                longitude: 689.09,
                zoom: 15,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                
                customCode: 'vu7ayax089',
                name: '14cilvyceb6fqhdqro1lssar9vn06rxmuka4iyi7z14bjjp8km7iqithmzf1m35a4m9x6bze4pv2rrxdhm81wlc58a7v4no2tw5ee69rj4iy4ocg4nnviia90j6c0laj6ptcdmc2f8rls71j83puxcr3nn14tbleuy38p40zj8kignzlly3grxod4tg3vwm3y1im78bvh7i0sfvx69sj3y55ifftqqqtarl55sa3wm6lmrm7gorqhqn81gwypla',
                slug: '2phh7vtdnaguoau3ytwnrlxd7kxjt4pwlr7vnurqe8ju4cecbjaflviduez85ao9zw80t26uonzz7tmyltsjkmimidjuxvyf197bqnup94lwx5xr17ayl8euoqugdl6870sso9lrwbibmp0reqvw9kgwhvt0fiplk9sbjsclo81j3khy6ng3un01fj6pewdk34d4f78154ubxut0l9p2d7x6a5d6uvmyl7clnbhpxe1s28r8gpi00m973e0t3iw',
                latitude: 136.14,
                longitude: 359.23,
                zoom: 60,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'ynkifhqx',
                customCode: '0mhvdn1i9c',
                name: null,
                slug: 'lmeyu2pa54brrcv1bfn7ug05rq218gya9vz5ssgqq6mzev347d2x8kdl9axm1tqwbqxlu7uth77djp4r64wwah93w4kialww5km2hymdhc97nbhvtvs7h1t6zpsf66yij2rs0ze3o5jjkya40z3upkuojeufb0s7opj4pl9tzr2bju37u79lg74dwn155wqfgruca2yv13h1w1x0de2ef1eksznp25t3qv1py3rnffzwn4pjw7p35khj60adq4i',
                latitude: 202.88,
                longitude: 468.39,
                zoom: 38,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'bwt2oeq1',
                customCode: '5m97e29zjr',
                
                slug: '447acq331t3kutt52lavvi2q062zgn4mnqtyqs9mivx35pj8tk9vn9z1olxeymwi1aem80769xx149qzs2cic7px86pzfedy6zv1vb1ql1js6f2rhg20bsujkumoc8zzxai7mbe3l4ty41ebmfq425du58p8neh89s2bfu7nhez5skox0ewi5lcznwnvqt329eiwa0ubnnvphjx933nrnhcrftbj42uc99q75wfkjliawwk97ljkfoi0fmloqf8',
                latitude: 176.30,
                longitude: 392.28,
                zoom: 97,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'acsicfi9',
                customCode: '2yhieavopo',
                name: 'ltsefawzlwg341c1gmoejoaczhxm0okjmrmomlpwiib3x3y5l1b2sypaofb3frpqolijwi01i6s5bift0s8ccdivfqkbt9oy6hme2gw7v0j72bq5de9mbidvw843czxdmqwwkuhduzttjy3jm409d4larji1q4agjhyb781ob9baammcyorcb3kefuk3wi1gxdejz18me7zc938t1fnga1o4ctbku9pnsr6c59pq1isyi948q6uvxomk7umzgeh',
                slug: null,
                latitude: 912.64,
                longitude: 906.90,
                zoom: 29,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'i1qpt027',
                customCode: 'txtep1z8ir',
                name: '904r2yv8orgdj0q49t3qad2xyuad563ezvscijw7btventt7o0snt67h31o6wwi36sbmjcyunboo8y6ph8vveitl1x23eyoh7zh6vp48ewsv93otedkvohuhqhc9rse1hpb9vsvs8t9fwedfx9onoa9oz77yqy72dohpa3lf7gxo4iy59uaq5o3g1q9woxcllonhur3gwpkto77extdedx77qp609uem97g9n1j3v8r6razpmjy482w4wh3fz9x',
                
                latitude: 758.25,
                longitude: 69.95,
                zoom: 78,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'zeffl73zlza8af2uc0k6mn7w92sduhrfm7jxk',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: '7mec3770',
                customCode: 'tv1by562fk',
                name: 'wg4bopzit1wgus98iyi3f7z4kh6pnp48pcq1y740a3jd6x6c9o55qcxtu2fysbip342clw7egl0dfpvmfjnft9fqbssujhx8t8tarlt51wnhbnh6sqwd8dxrgvbqbruimxksexiow23pgnb0p5997wvwmynfk76osodwll62pt65mx16sz1kvn2m4lwi7w3lc32jq9bgybpu32v3qm0g2vtzwlszteurq3ogxc4qgwb4oslpnd7z0w5n1rphvw6',
                slug: 'bi101su9ms7ygo7vkq9s7kvhnnq4jr1xewra8m9spcfsre7b3sjdk7k5tlmzknwb5i40inzmphlifnhetuhzvczm95bpp8l7cty1o4d8fty5qhp7tcfiaw6n1ummpw6j1ra7sxq02wrx9ukrdq4s99rqil90wu2y2j2rrd1mkwuo5pvv3zafve1muzbkfqazo50p98dfrp75p0ekl8539cgc3akx3caagz4czhoy5bbsqkj4b9iti5abwh3nehf',
                latitude: 828.95,
                longitude: 696.12,
                zoom: 37,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'oxrhb4niunp1ear0a1hr1vxay9ggvkaphq0bd',
                code: '0ujuqxo8',
                customCode: '7jdd2q06dp',
                name: 'qnntob0zwgiy81azk8jqhk3ksoibapjl8azzfadlkyvfvkrg7xqv5vntpbiffok6grp610rzb6x4dzuarey4n49fkxi4rp2nniquj278c9krm4qj76pfwqg2bkzrelzpg07nfusri5hpixiboe6xuoxur5kp14kj5knyfgzxn9zb6alufl0j1c8s10k31icvpi9uaidrozavfd9ey2slsjws9xlp4cybgvfh2vbordiqsq2qxc7s20y0kl7rvmh',
                slug: 'jlaon5eibbnsrlxh8dx24xysuegm4j1erf3araf53u2oyy0j1dhccgle102n3e3ebla2zajoitwqsfm4630q959uo4dgd3eycd8swtt5dol49trztih1msa4uwv3i3eqxlgur34n4z1vjzn4vrqrowru1i750b7fcdq3nqp06s4l1u00nzhnhhk3br6nnwmgkskjyofkxvcfzh21djxoj8o39o9fznmdxd8sf3hdo6dwfx04elp9g9nt0h2nth1',
                latitude: 262.35,
                longitude: 316.30,
                zoom: 13,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code is too large, has a maximum length of 8`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'dndxe7e5m',
                customCode: '0bq6mrapnq',
                name: 'e6zicav3zw9twk3m2jp06k1cfdukkwhlzinagk4ic7slp774y8ldcjkk2rmwr59etxcn30mgo3p0vyfy9a6l1jdlgkhioc0v4mm421l9x2madg1o4p1u238l14afh36x0uxsyqrvdnlq22gxj8wszdo4t0sia7gul38t95qpogpn16sm8taf8lqmfqvk5x84wsoh5fimv9rvff2kmi1ysqdaitdv4c3w4bymxtdl3wvzgpl6etky76obdzah45o',
                slug: 'kez0xchzqsltkts4ayesqzhcj4p2ycifvy44hialm1e8zaan43e9z5ke6ynv8hifuwi4nmey9oma1p3x6z1wc0b8unmswjwijec30l8vqwxg46ud3r0t36xpg7zm1zo2g5vhahd637v012n3ljk7prrb7w2kwc7fg8gmriyqxlr52n0zp085ugy7t06b84jjxk86cdud0ea1zthm23tzbup8zxixi84uc86vxidkvw70a4ngp6yemsrkag1jnrv',
                latitude: 714.05,
                longitude: 159.22,
                zoom: 43,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code is too large, has a maximum length of 8');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'ryxpgrib',
                customCode: 'ltyd7e6uwxe',
                name: 'aes46ypsm1ai1kip6iqbr39hfv26sixp3e7ckv7lzbsxs7wdnp485lnsion7e3a2qzn92xs4154oki49hqym0oda70xvph8ur5vvjfiu6r8yt1nugpwmgunkn393xmk1lmwx7lvczdf0tojuht4alw5wbo0gqmqq6t7he4lu75pklf1yi7dfolvwp97in6izf0paof0chybhph36atyaz2csftjf2xc7xs7ukbpbjihuia3wmpmh06m1ctluy52',
                slug: 'ftos7e9xn86uxtgk3nigwntooxo46g1zmauwkngk9ouz7h7zj7l18ayja4y6ye3id74qirypbu5j8g6v68fhr8dxxmaprryis4qqkoau77cojc3v0etj6wa9giudecgogze67dkugq73j8fr6tpc8lgu3f46ny334l48flo38w1w094c1rntf1liw8y4laaojpbximt9hl115hhjlvplb064m7dw4jqezhgw3seqo1cmr8zxquksaxyiumy5ajh',
                latitude: 519.08,
                longitude: 239.97,
                zoom: 85,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'x3ijk9bb',
                customCode: 't76hfbc30t',
                name: 'jhsrrjxzhrww4yy3hmb7m3oxcy8z99dfsvye6ac3yvzitgauc7shhy5yufpk0l30e7q8sx45t6dxkk1iaurk8iijpft7mtctm8dnxdkxhuncqyi41yrlhsu70uhxbl69ce6leh4vffwfiy0w38m3c8ntdmbt31rki0y5ir7boopefjmaox68nz7apup96pv3zp8f93vy6rt5mhuz564o40xwe7xayu9zbkghkd9dsagaz04p3wgt1kd1hxarwcun',
                slug: '16j3hbxlzkt34k9fe9fyxmsttpizgjqpwu6nn8m7hzi2gxybdbqva6itc440l7vn9jnzu0pc5b3lo4el1fqoyiaedjrd7m2mvo1736l0teb7uzuutu53oytj2k0zm405fpz37631m1k5jpqe45t2o571b32b7xqleeazbptqb8qe9ldeqqh42smqoegtus7h3okcha1z1bayjs058trhajqo16wefw8jrs66pylrxgwd3raxpob0unz5iflw25x',
                latitude: 95.50,
                longitude: 654.24,
                zoom: 59,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'j66s5hrw',
                customCode: 'k45fjckh7e',
                name: '7ao2b6ehgpna6wtmhnrxkrvxh7v7zbpnnwp994dzoimkrnr9bb4k5zcw3fi81zzu5u02l2klq75otf428lbmeh38r2pczsdm9h2u4y4fv02zdl4h11xvtvd2z80e7zpcxnmq5qavw49qxhlubt2m2skoqxunri72ac6q0qjz01yqy7lpp8kbigoyvk5bn1dl4c3x1jmcym0xoylbfwzowpoo8vbg5swya77kkhdtm1wpj24hvlln15vn3mm0mz3',
                slug: 'w7bus8uanevkxpn0mesv96od45cumnh8pdmr0i32qdzpu7zuakvmw2vvdhglp34vkd0x1vu17ejr7xj84rys62q47ctzowh0km34aijrjy275teebliy57fmy6zepdeb425a36i8sda9dc89rfqnh0kdxv14jhk7y3pxa504r3gfu445d8eggtmo7jn3d8zyrf4l7t9411psigvdhx3394ul7673qh7xma5qfsvw1bthryraxwg97563f7bwo9ir',
                latitude: 465.12,
                longitude: 108.25,
                zoom: 68,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Latitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'zfvvw4dy',
                customCode: 'py3xl9ao51',
                name: 'i71viglwi42ermacn0ea0etd90oeqbdxd4qinrpqxsoxfbd1uaq1825blhygb5ok2m3percqwr03awzxfkdxav2m5p9oomvu8uf1hh6hvsae8vdggwfzcz12w1i38jyvhkswho9wvroips7btuhix1bct1qzkvfb8q12l1ao42uyyedrbngqhb9hb0iam873o4dazc6u3dg4n7wyq21bykcjkujaqmnbkf69v1jt3ip3hn0vieovior01oww8vj',
                slug: 'n6p39bu1t0rgzvj689zcqcs6fiie016ftbkk24036snp1mpaohwcdtsz80rc0gz8nuzlaj56j8d0l4lb0ilowbmo8evd0zyeb2fks490wgpgwkzhzbhffav5b4znhqpgzglp04wv7tm8r1l7bsokf9oamov7dawq5lbsx3c3sf61x1jgih13bwvo90t6vylyw34305wgn5ji57yue5d9f8p52eyjw34fvct69ysduclk7ybbczlrmy981wjmfae',
                latitude: 835.61,
                longitude: 953.14,
                zoom: 69,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Latitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Longitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'frvqr0av',
                customCode: 'zxza0m6857',
                name: 'hsnspqcck1sqnbj8ytvfyglml88f2e08ji9a3gw2l6f7ygifa6azy2xjamat9de8gzfvhawofv3lhwxnmov4g65oy9byjqbzkg6m6jss2vfnmssf8fyjofq22gwr69hcaksawohugdlji33f20idp44wtktkcbmbpbo1opxqhqyinhfwfkm7e7x0nh01q1fw4kk8cpnubii99scu16brk2subhfff2ep6pk3dop5jybvyfmflw3zfd9gho7lbxd',
                slug: '3859gqk4c5poiou9tsm3a0rvkqj3fbl8pri9htyr6lklrfny2tsw7i5qmjmoxsgduovj0mnqeelr49am90cl84s2bnh0qfj4bbzv3pf8n1hheljn7d4epwm97rtx0holykh9la810yf0px2lslvinb48eu4enkuy6w1m2iohznk1llv12jvyt2z2gcshokz9c75xaqjl7s0y95t385vxbkztvpqtcyfmerh4o6mne1wzauap3fxrp2a441youor',
                latitude: 994.73,
                longitude: 578.54,
                zoom: 92,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Longitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: '2xt9t7hj',
                customCode: 'xx45vg33d2',
                name: 'c0rfwwbhrdym0ptaguadl7i12rztc1vw76kfwfkevkwt1zrayjupfpviml5c58jr3jouoigaeiemofuuzt7t8pa0u0b4cijsc9wwozceoqr7zuhsqyh6yxww7ooea8r4huksic4t6aqhhyxcavjgrls84pl6y1gz4lxkdy077weuhpqph2x0ztuc5b317urvwvcs92mseuwh9k5zdllfgyate86pisarraokfh748jw90bp6ngny9g6y653xkaf',
                slug: 'rrvvtlqhintfkiwlicxsejicnmx22oyfwz0twe51ow5ygm1r7cwdn2aghbz03gqrnq07w9o09wsqctps61xvs6eoicwt4oamine870tprd2v8is6j227z4am1cd3duxf92fin2tsk1bgguenx4oesuewmkhmntpwpxd6blkl8kb78uoqs56sir1i761m13tvia5uy74hk2vfr4hju2k0o71v5cn7tpibvd9ioxfqi742z814hz3knadjp3hepo1',
                latitude: 653.76,
                longitude: 513.06,
                zoom: 516,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2');
            });
    });
    

    

    

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Zoom must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'r4jetuqt',
                customCode: 'gq0ql2kvv4',
                name: '0bc2f7qqsp03zs874f6r7r5hhfi9orgmzvd3obr497fwwubwnjj1852y9b4mbkktldey92aqfuzftpjjiz5g0woulhbszkl2tk6dhnpa85rcmz1ggyvkudgvjydsonozu7fp24ikwvo1u6kk6joy9rc414uw91m4o2l5v15ppzbtv3yg4r3i1w6z7vc3g276n6ksd9ppthe9qz6xk528i5nzvgtr0cqm7xqy9rvisllxszwrudwhdjqulex6s3m',
                slug: 'ofp6qxi7pfh1gkmnskpeg5iazem5hdbxsz0208y7ezpldfyercf9vm56c54zxxy4y2fika6glv9pgse147tluckz0ptmlqvh0vk76art0cveq255v1zskcr9zguic2z9kyapx1tmtyn8hs4qp36dll5nwtsb7qtd9lh7lx97y1zh8xxud55i1gu7pseft7htjy97g1c2k64v7gd8cuhyxo2d2oavkt5a3xmpb3jf1ui0bw6d4oluqo85t31aq54',
                latitude: 949.55,
                longitude: 866.90,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel1Zoom must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'gmxthvyn',
                customCode: 'ms9hvv7mqb',
                name: 'q96jh2fiircl490c01ql15gp2ihc9t8smutijyrvh0kon0mbt2qwu3tm2boyqub2wboo749cs7oxwypq94tgmba544evgijktg6gk7i8yqk8lpzd5grnpnp4zovl6r6j0xq6fglq6nxui6nlvu8xwzj154drqsxjxjx783z7dze2z4afyvzeyxwz64vctqp2m15rl6ib3hlwvbhgxzf0u8o7ddc7dqbcy6z073gqjmqe0gbwso0z3zt3y329m1o',
                slug: 'koogv8gt72emy23iu3rbr8eb7w4z0bb2vpohee2qvkz5wvcejot21kub3w3tvs4rplkp50pv7iippwv5xye1s3e9ykoya7zisoc9phepktxe1cfowdc5y0wyu3csh3vnymks3lyo22lhhy3kplrqhpf2nnrb05g8vfvwh9lflxren14tvfq66x14t03bzpmai70x0o88j4glostu479qohqii64m1x1nrvwmir9wu3useygcw7jv8ymuvhzuq20',
                latitude: 894.90,
                longitude: 649.61,
                zoom: 10,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-1/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/administrative-area-level-1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '98867297-b364-4649-86fa-59d6c39753ae'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '9fe1007b-6442-418e-9a56-f3902404a773'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9fe1007b-6442-418e-9a56-f3902404a773'));
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/5924b371-b2ea-4ff0-82c6-16a9769dbacc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/9fe1007b-6442-418e-9a56-f3902404a773')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9fe1007b-6442-418e-9a56-f3902404a773'));
    });

    test(`/REST:GET admin/administrative-areas-level-1`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: '0aa1608d-3d41-465c-bb30-b964f274cc4e',
                countryCommonId: '738e85ab-58b5-41d4-9785-7483be8e4f0f',
                code: 'cv6ok61p',
                customCode: 'xosurclmtt',
                name: 'h4u3be1rh34zu4417pg8xwjgts2pvdrk6zxiv2a7h4ayhtiur7oomtvsjetkup7zhp6mbefcq52mbbkxuw0y426qln3wek0yov6yf11cbpwy2d8v2jfyafh5hhfnxah40d8wg2yq1841rssoctw4nhq6ppxgacis8ybui2qchc0iv6ikd2rq734b56w8igmtcs5e1bbjwviqmy6i4bpcqkg8nssh44tybp1osib079vtjs2tjf7fro78podidwn',
                slug: 'd2en5n3lvsn8qrpv312ln0v7la7c5giitd9tgdqsowm6x2z93bzc6cze0eo9e3nwasef9qd551n5owbynltfnudh4dkglno434rlgd90phk6hjh8ex0v16elojt951ym8lsoou6jwtdw3pk0p7aiasbrmsdz8dydovpggkxws5k4p9v3ub9il0m6cpcw27j9wb9umcxy2jwgzdp1i2es7fgdn7gem8ib0bbffef3xnn4bqvjhbzemviudbmcxtj',
                latitude: 771.22,
                longitude: 103.34,
                zoom: 55,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: '9fe1007b-6442-418e-9a56-f3902404a773',
                countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                code: 'a77ug6i9',
                customCode: 'g5nbmdrsxy',
                name: '6habt0lpobgfqtimiv4c858c2zl9ccppcrk3d4viojmzp8nkj5saeqht9cthnqt5p1qtf746p1h5zn0pvwgpe30a5gkkx941672p96a5wx5r281yp6b3redm946g0nxu7n6vds45v8wgu3rzfj9rwkzls8bncts1if3jq24us9cp3scix291ifdlr3qmetcoe81p7vbn92ffvcmviqfayv4wug5rs9hdzb9o1hypgjarryow9vimldwozxtmp5v',
                slug: 'rbu4di1ohs3gue07c107wqg583vna1v7akxisprr9udbbosryq30mswx4hrl77agbjbsjcs8j72994vivzvybmfe7ay2qf8azpkckvsuwbvpbb75un94xt0vt3tg5yy531oiwbjilqlsnjp7vqplqw5vdtigsz612hhj5bz3mulhoqy1gji5gr0ezryzc1fe84yrwbibuc1gfqhub8jiioz47bm4aq3cm9mqkl22u385pljo4s6upxcq3b2b9oe',
                latitude: 980.28,
                longitude: 364.31,
                zoom: 38,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9fe1007b-6442-418e-9a56-f3902404a773'));
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/79ae68a6-c899-46d2-bb45-10d63d52c914')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/9fe1007b-6442-418e-9a56-f3902404a773')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel1 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '00c2311c-fe69-42a3-9c8a-1c53a3de2840',
                        countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                        code: 'ki71u2j8',
                        customCode: 'fvwq36ik82',
                        name: '08wcu8vmwyzd4s737g4oxkoqww85othnr13kohsutnto5ufygu83td8fcoxzsjoeqyg8axsxozh798q9xugnfq3ejx4edchh4k1z0q84eic3zyout7tbtc4xokdmgin133esuaulli38xy2eclv7yoisi7iap0i40xw3e3eu1g87x7spy1qjx58h4brnkz5tj1kpjyzsvsy3ba0cetp9q4wii4125i2h9xnltt1hnss2c4sxv3rx36kuklpcoo7',
                        slug: '67rn66d45o2ap71y03voqd8kum5kpu4zmxan48ttqzydj7kzthvka32kz6yc6jq2bb6a0g7gce451xya4vcgj0ub9vhwkzo5v29w41gptjyfc1nvfo2emthk8nr9u85sl81g9c1ptrjkhrszcx3i92ygaezvi5afabi601qotrb6gvmgpu94ckd08rp23gtg6nsjeso4lvyuvqrpfcibu79b0uiosbfmavufo1cn2dv25ueya35nyy12bl2r7a8',
                        latitude: 62.11,
                        longitude: 446.92,
                        zoom: 58,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', '00c2311c-fe69-42a3-9c8a-1c53a3de2840');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel1 (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'fb279b4d-eb96-42ba-b127-46869df3a0ff'
                        }
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

    test(`/GraphQL adminFindAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '9fe1007b-6442-418e-9a56-f3902404a773'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('9fe1007b-6442-418e-9a56-f3902404a773');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6319a8f8-dffa-426f-8341-6490b32269f5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9fe1007b-6442-418e-9a56-f3902404a773'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('9fe1007b-6442-418e-9a56-f3902404a773');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel1 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel1.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cfb94b04-5c63-4490-af1d-f0617b974f29',
                        countryCommonId: 'ee6c00f1-5bda-4c09-8807-921505357634',
                        code: 'gx2pzxn3',
                        customCode: 'gbwy8fe161',
                        name: 'dtwu3cvlcahj80dccfgd659vwyuom8ifqcvzoeqv1g06su1pbfa8hqodtfyovrtbo27ysn8ydainvrwuaycujg8m9hdb1vyrt0f84purrtaktwk8rlx9beqayicdbz1h8anjpt8sw2i0oo40p2z2efbqn9k089d4qrk2b3lfiqjwlr1kt5fggk6z18fvu0tmi74olio1elb21l6vfgwl7g3xn2ejv5qdjeb7noxg21jyi6vp9pjuranj9xw9yb2',
                        slug: '0wprix89fbbatsuo8p9b81sufxc7i412gh1iysq9aimbadgresh7ittfhniaur1a4awqbkddpg7t61orhr8j63ypl1uyr70oao55khn4a3sn1mjy2nxpbpjwsz30nirwsra1cyhwprsffwdqxtdb2mijnrb3viha5rsd3spwlu54fusj9gqekfks1js0l66uyl0imj8pejcditmoo4fv0l5hkw9e4777cqqih33b972e2pba8pxa3xduralu0dz',
                        latitude: 845.25,
                        longitude: 135.91,
                        zoom: 99,
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9fe1007b-6442-418e-9a56-f3902404a773',
                        countryCommonId: 'f4823ab9-0f44-4f8f-b3e8-071853c20a24',
                        code: 'j44kpfqd',
                        customCode: 'cjvz3tpygq',
                        name: 'v5t53s1j03el5qxchpij74dx3vryl8wbv9sre9oq3iaqv49jj133vbmu528499s3yskvlava4vgal3liggmgk1l5xgsdp178cmck7tmj908jspgu5b407jg8eza1fn20nw5s5oih9ezq3x0yrvy7tn48c4cxos8urrtzlunondjebzzzz8pelrpbn3vyu4x77rk9k5gbw0orarv5g8ak1tlw66os8ugem6sxe6bwluxlqlvvvd1pikc6nhydicg',
                        slug: 'nz5chpq5sgeiarpk5zho4a577l348fwvi8ykanxq1hai7veoapk76w3ciqd7vtkz3t1h2jtk3siox8nnej0moa8bevzn5m8bcw4w5qbgazbivsxnkrgqt4sd5usi7ybuhq2rb4jperns7m9x9dfdyqyzkcz7fms05xuhae4in31ilxox64x3ztpgy6avk22ek2vrdz62m0y493blqkcxphk1pr7eihprbywa7scrhyeg5xgaoixq8deneoncnq7',
                        latitude: 644.54,
                        longitude: 637.13,
                        zoom: 89,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('9fe1007b-6442-418e-9a56-f3902404a773');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a1e30d0a-0df1-44bc-8035-12002441f22f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9fe1007b-6442-418e-9a56-f3902404a773'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('9fe1007b-6442-418e-9a56-f3902404a773');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});