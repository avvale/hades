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
                hash: '9drm5r3i3bztsg6nadckpt1alr8uy7tq1o5zp07o',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'mt3hlpz03vqhejp73zsj38pkmcj01pkz125q1dbhpyytxq9352',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'jsth47gv5pdvpa4fh90o',
                version: 'f5ge7tfar6r5rag4itce',
                scenario: 'z8nsxvuqjewuu95ibxmtqd266svqjtguu94d3zbnvtuqg4tr124xmintea6j',
                party: 'lb4stkz5bilgqbi8q2b96szuwu5d63km1wrbcztyyvsxrsbdjrqf7577opkxcqj82he9sokyj78mecctdve3x5oqfpbule1xz2w3iu5kfvdah3gze27nzfdqlhu5ca7ozreq9wjs4w5pisowcgpdn7n6koni9e52',
                component: 'tegkj6g0kyzjqw2g7k45ww0aula2d4q87sgppqenj4gt9m50hydx1jxbyfwg7i3bpj52c1hn2g5zhs8vep10d21onr8mb7g0lfky6v7sllpzig1y9l72ml3i1ouh28o5h6eue7pbqoayrsc8ggt31yghwm2lh1ua',
                interfaceName: 'bmhvr5kukd44vkp3t3194kaep7fm0nnda004j8krtlytkohg5xxveahtjxz6kda503lpbbw2g2a5d0h1j5ddn5yvtwdue8sje2bfjqydwqgb7ll3nkxufq5ilx7kwyvsoxj5jqov0ick1sste0eeowhmqg00n7px',
                interfaceNamespace: 'nlcvrqe3efkqui03lkmoftopn5nrruheinef1r9xe5kibikrqzbu4snsud2m1s13zo2dmw8ifcfr7tzjtaygfpl3rb8aeorst9bmhf7p4kec8r12fcy77mg03r609ad16y17v0qe92o8xiee5oilcfwsunpoppnb',
                iflowName: 'q2lfn5s86rn8qgyjkw6tg3hewfmivi7501qeuel8exw3oxkflghb68xfocq5z660vpqb4fb2z4kz9lg8yqzoao9spe2w72iffqvkmgbe2k0yi22ykgvz9p1c1ldwvxau5ki5gl00wgockvyxsy2pa9us8e6jcm5p',
                responsibleUserAccount: 'gdrlei291imrnhu09u5a',
                lastChangeUserAccount: 'gp4lx46wdbq0r51lthsx',
                lastChangedAt: '2020-08-03 12:42:00',
                folderPath: 'a3y66d1oestyvyfv0xrlojldcvb46jbjr9ole5c0rervo3p5bysempyrh2iqmqpvd2k9ukbdk526j8ulr8ec8r6hts68cmh7pp76l0fzp7diq0f0w9qi371z1sjcplbgoafu65o5d6npzt40tqo33x6y09bpuehqcob13cwy7sco9ydg2700r2xr73kvnbxqcra9wszsy7qjuc5vbxn4iirxdcv0h1qoq03aewrie1gzozqrilvxd8f5sbsarfx',
                description: 'tsc7vyr9v10r7ofiwc073mkic9x45ct73mbhej9t68k3ijkbo9gk4veh9vrsku7rc3269mflpnbzmo1jj4xhtwpk7savbhjr2xw7d1n0ct000bvsp6dsiadohvpgmscassl1l7clrplyalr9tps78kk3rlomhc0ip66b33mp9mqjajr5ijqp9om06jzv6as2g9ardv04t8ibmv5mk8ovz0c7unn2r57neqx82besn3ppf5f34mej2a6z0ea1lx6',
                application: 'xwzky8b4o5lxqcp3emk1m2r3lo83l2sqcue0plestqict0qm28erpgfua22c',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                
                hash: 'kd00vbhpj1i3ujon82kcyfvdiblau4p3x5aw5nx4',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 't4b1a4ak17n0itdp6q9envsiwgikga67tg4xyj5jvte6ts3kux',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'iuh0kwz3doujno1zn99l',
                version: 'd2hq194adm0gcxgrbxwn',
                scenario: 'ueomle137jx5h3v0u9yjvkbx04bmla58i1ogoczccfxmzjebw2t6lg5x9u42',
                party: 'zrjis09y8jyyyvsu0d8bwmhf4rfmvh839qxtssx05k1e72mxmoh2s8s1ltxgsaeh1o12iymm20ulsc9hvl8kmb3re5nbf968xoqwloqcgeqk43hj3ufzfw1y2taeuj8ghio6ovut01aza78arofidcidzn6iqnnz',
                component: 'wol9ijxsismxub26o9v37bg22xmgm61gfhxow3ug9lrvtwv0vg83yns1jjlfjhwk7njfhzts8zldsecgs1pyudwv7o2b5kw69a1tysrtss8al94awom35i9ju9zl55iaeh1m381g9z6wogwyk0k8avfd8tfyczsk',
                interfaceName: 'ueik2gioaehikbspcz5krarmn9n5kb6vtghh3r51s2fxpcoijjry7o6emvn3d7cpgeksgb5s5mmjft0wmbb0h1d1dzn1joy9ohs4dnc6wnh1fa22p6wu6ybcnl1p5pd9cjv0p4wgwm4iwav3by3zy0wg4le5qh25',
                interfaceNamespace: 'x2449vl49l4jhk3x7nhjndwb4jb7p1voy85jmchoaofoswxwcu4eo9635cmhugusc1yoslrbvu3mdg3jzwjxuwp1ogmfipdsic59uzpdlkgk80vgzynn61i58otd95lxcli2i0wkwoyd1hz91rgl290sfvxv405n',
                iflowName: '3v6xp5n81y0ojma4feo07r321nhjwws745gu6vwo0fsh0me970mrbyabebmnv3h7h61eovrtnrexhdj4ejlvs7mj4o2cas90znfazskkihppsgr8xh3oqbj8lg2291e5g0j5mi1rk4zfwxwkrh2xgn88yuppods8',
                responsibleUserAccount: 'ivrsy0bx1euqen7yzubg',
                lastChangeUserAccount: '2y3240jfo5a6oguptahj',
                lastChangedAt: '2020-08-02 19:33:35',
                folderPath: 'ogx0q0an10dmyw320q5qqpgy1yxxnzakyhj1e75i8dbjl28920dpix7w7kzdjdaxe0l46j9pks03nw5esm5xungli3k1napysezru2dq6oczd2f8jykxr6l5gzc05scpstk791j254ezxkbiy0g0xsvwml167xid687hd5dkt6iqhyx5yoqfjgexadqzeniea1s1p9zktguiue72ahb0px9b3qntfwsb854iqvwjzqj8rl6f9di30c8lvstvkvr',
                description: 'b03g729svsy5uxfamen9ex623foh7i3nkxltekke3nhaafolgedvaukqithfn38edsl8z1ixd4mdydzuslwz9zknkyg1bga0we8dvn3ot664defo02yqbzaqt9gg56wxakm6wcp1vs4fgkyp6pm1olw5awhtg6s8gjtv9fm85yj6ayteltfs30tegyqusfakco2wihcrh68octu29v5itr3u65vuw9x15a1vshilwhj5jzpyz7k18yn17531jgm',
                application: '8kq51n92vpl37we9045o88imqe22wgvftmw2esakik9dtd76lbm9l2b873eg',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: null,
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: '3s4djtqmvjjrjdfedf5nmenvywrmdab2ai0s05gt2fcpfoo1rw',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'wo3ps4r5b953b48z7sxl',
                version: '0gv713v7mmoiutsgwaqy',
                scenario: 'o7fncojguufj14eaxhhvt3c0qb47zqtypq3i2nvwuc2drcq1wr86a3rys5gr',
                party: '3l0wj1q0osvz66tm7zdpmfpv5mo22tttd3alr44rz0lb50u251efrl5h4ph378bari15k1klz2e1vexya64jtfzr08tkkvsll9gmfzey402nujljq1nfezjbqg48hg41fu3iqeze6uta6gm44dypzdaxd33xav01',
                component: 'iiyh2h16h53gawecp6an4ahmdcj94hcz25mlveiw6xctcwcrid1qo10c8jhepfnyq6y4lsu0jnteg0s8z2pyfbqpf2rilorat5gg1q81v3f6mkqs3hdho5o9fjtpk86hk4osekhkyebmywaxwayddgqfek1ki4z0',
                interfaceName: '3wfzubpq8betxhnfpstl5mc94guqdhvdu45op0xyq4hcq0shqfrr9gi4ccum9pk87ccxlarzx2cghqa3zkj5wh922lfd3c6xjkh8v0g90kn0khl16nk37oklvscgfveol53qzvudac0m8f6yr58p9a68pr3cfz43',
                interfaceNamespace: 'ygwnd0kpsombw3lhc59ekjdi8wbvt5uzlrfpjtkne3wtryxzqyf2j8h70zn9twjlu5u4fnelu4pqy7goz2p7tnvwgm4az1co5fhskwxfixj60hrstqup5ku7wu77507yif1wyn14v2ng6yuh0dvgh0tjuv09vjkn',
                iflowName: '6s596m9hc83y32gv1y1ap5fs8ix1tb31sjh4paz1nznis8e51erheozr3crmvgv7ujsl9oancrbxxfaz1cfv3xi6jrle36snmbqm1u6dw3m1r0k3i386pfzfq26cxffm8m1wpwypoqccnph4hmk2wg11c3fxri5q',
                responsibleUserAccount: 'zu6p59wtlphh3a09fs8o',
                lastChangeUserAccount: 'ze4s8n5mzh074bbuu3ht',
                lastChangedAt: '2020-08-02 19:22:55',
                folderPath: 'lk6qee3bbib3q1z0ms3l8jpr2zua1jgk2shsars635lgi5cjz43wrc6vtfk1i9qbnbg4y3ly8weig1ro2fbihdlfn8nnub85lbbji8d7fp2pnpc6yki0sbavd15p4mvz6n3pojpsrppk6veid3wuuo64wa29g247ab4x4uk95vb27tqmzbjii0sn7njy5cxup1upviq1pt675thdj1rx45cxl94jv0nr536x0qkmrxmq0baewo38bxm3v6t04tv',
                description: 'l6mlp8x5asw7e75rp8b421679p16k5thsvadt5yf2gijy7lmolxwfz853jhi4p7xi1oran9ely70yzl12qcbfm7b5lt1dcxbsiy57t2z36wmwnpihtm19itstcp9rk1surnn8tx7k7v5ooehvgm9b64bd5g78061h3z0jrss43xg84wagfdtvs2lzpbtbe32ypfkgzqf5wypm3cczgtzvrltgh9dp8lprtmy6hticb9da7fy3au2ast266ifvmw',
                application: '2ekdpmc69ewf2ud19jundh3rczgwgho6rossyyf1tezzx9mrq6hh84k9wwcl',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'zyy8j05gb5k77jv82mmhg1e4rmi8jqiqytnofxny88dbiiod8k',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'wegen6d24tba6c1c28rz',
                version: 'za805dxzvzsrttkj67va',
                scenario: 'lhkuofearyfv6gwczts643kmcxm2rh9ffhmhjlrr57caq5b1a314crrk20l5',
                party: 'j58oao3dimd9juf1t4uuipnvesex2tivxp0lea3gae6agzrw3w4adhl79ynpixz9me8sv3hqkbcx57uc5w8vucz8pvfjk82ig6z8wm02l68ygzxwiwv58n9sk5h8g2i206sof8l5681zen2bkr8ie48cqvaso2pt',
                component: 'ihe935sfta9y4in5ej60fpsyfuiqnjg5bz963ek29gxb5cl1d157uennwbpxc09i4m8b0np5qktbvdqebv23vg4nwvd5ifzljpvaqh2z3yspv9r4oa5jh521jvo68589h9aq4ir7n9rfz7m5s67d7xuwv5uc34sy',
                interfaceName: 'xkl57r0oisq7cx41ltygoq2vjrpjcie778jxr47fxhlhig7g8yq0t8jlp5iftl2ihmz3nvmeqexoxdkxcx7sn266f7ezzxn6t0nmahv7sj2k7zj25lzvvtobvfby5q1x5hmlp6fm1meiy715y8celcn6jl1xv6io',
                interfaceNamespace: 'dfahko047qrsknnyus7wjoz0zcir3hpq9i7e39d0z5jdmejvv1bzzaezmp83y6mtijo8bq4ymdld9or6buh795u6rav11q9zxwxru7owsdmuzp8zkua0tcjhj9y89t6464ucgqhph95q7w8p6feovkv5bm56p8ka',
                iflowName: '7pfgev496xeknx8nefgjuj7d0z1cudp8sf2t5z3592hp8jnx7h6zdgbx51ah8kyf2h6nqfz6omeuge7lsqxh01242lgpf5515rzi1c2prpo9uh57161phfg0rhn1in804amlwi27zv5w08kmxqf9351syubuq1r7',
                responsibleUserAccount: '55boywzspunoft410mtz',
                lastChangeUserAccount: 'hlxevhcbsq9vzihnxw39',
                lastChangedAt: '2020-08-03 07:23:14',
                folderPath: 'bcw81dfcqqlhgnyqwa5abjzw7d4t6654318w40tcbc974rzmiva1lg1xeivdp5bym6akzlxl79byfhqt4573oml5kep11bfmh8k91070y1qqetder33xvsio0rbh6ccllvl9ceeykunu0lrld8ufrg4j1xsshiz4nlb670h5n52l5yqgmdbgrcz2nnnma4k6pw7woxigc1zicfyyc4ydszlbwa80aumum19ffql8m9qy9sl7v0i8ssmetfsih73',
                description: '0958k1r2u0xvc8oa7l7auctxq241mrikmesms9nw4s6g6or8zd4thwr1h0dowi5ob2qv88pe8hu6d1x816mhuz5vglakeuatjtd9popto6whkzyy4zce1vljpsw2luwp4ctm80f7u1zrxxzhz7qof7hx5ssn2kn0f7kk90phov8e4tbrhno95ljj8q015804lrxy0g3to67cspt7dsb76di1s0aa2i2tdlmk7jqey6rwn9cjc36a5ofcjicre4o',
                application: 'o3bub0bpdnsw5uorhc9df7v4k03fpduy7jyksat4u0spqvwyrmddi0yglt56',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'j409zstad3jewcpclbuu3u5xy1ek8q3y3zlty6x7',
                tenantId: null,
                tenantCode: 'uh3gr4pat986vj67jfssj6x0zh5dn9vr7ao8m76mkdpcu3ayw3',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'iyzb4wssncf3y6hkhjqw',
                version: 'd5ujw2jpeqsqz5qa3ygv',
                scenario: 'uvjuyzjn13pl4dio0y4nlg8uqcwbwhnrgkx00fx3j5m6x9v3qqte3qbxnzy3',
                party: 'q14uhqve2tg5fcntoi0ymrws672po2inpx6txc2eb0w3p4wfvtmiaacivdxl01u01r6w3jpnuosed414n33ummhyf81l76ti5j381ru4r8prx1bhh6u412uny3bgslclr7tnwew7j4i34rbdo82e1g578exeklv5',
                component: 'm6l29mx0hr2kyla15g73aovyskwpqrhtmgokm7bzhh1f5hmyq07g9smcql1uf7g0j3jsi0c99hu5fk278pl1cml20onljlfepulh4dqmzk7mnqwztl4e3qxbqz3cthmzuomx9tcwrxd9obcze7cg4idcvzr2gzmw',
                interfaceName: 'h086sb9l9yya205yoakameachpub228ovoppg5rbqo628cpphrws3x04foprhaffrib5pcu78dc3202pcuqplyy4u2hn625e4z5rb0aez7bbilb0z4obejbg06fuyxjeilawmbbjig6sepoj16ptmhhkida9ch0k',
                interfaceNamespace: 'wg2c5e3z6y1kp3zptayrno7vj9hrtn5db8shupb58beziuoin7qzjyxrgj63nwxg9uk617jbctj4citg7f3pvqy7cnesdoitnvtk6jtugpyw2u769jql0rs35nye86n16f4l6pu417j0ks8khpjq14tlfi8j1nb9',
                iflowName: 'vf32z7bcv9tu4drnp6dn1y5raorsba77peepg4tse02n82nut015bpeiz6oxocgvpxtnjikm8b9ufv1ly8kdtw7hgcj643zlssaoiuw33ncw8lzmr1jsxxrgf6ky2cjcadjw0alj76fesenw9xlvh4tbi4pxnlj0',
                responsibleUserAccount: 'nw0k4xrvne47dutdqief',
                lastChangeUserAccount: 'vz1yqqtw2d5o6ou1hzpb',
                lastChangedAt: '2020-08-03 16:26:29',
                folderPath: 'd1v4qbxzl2dw9t78774wplzz09jerrynu1xfc05tf7eo3517vks7gi0znnlqjxmj5qfwscnrg5z7gz7xsyjhfb6xngp3nsljvobp6buoeghg8m68jny9o5onmjkqupvf3hnwayw2wbl8hhsjbmnvis5vkj89z0iti5mxzfhc8civhggimp7xdv9q1zrfautsruvrxxm5lnf682i2w8nz5t7i5nyoou4fhzzjk3gck0r77mub5qr7y8heweo1np3',
                description: 'g7r4vatwshv0kqet2jaz5khm96oxfaskx3yao3890qbaoaekdixxpham85x0aves1wi6a3gd7drl74x1hg2ecseixfq08vmbco45cfcv22mydk69l5ovnt3kfw2s36erxushieei5r5gto3jqgxywe75kyh9e8qk03oxtleqhgkyflsqca23t0xe5597gwp28jfky403fpb8fss2u4emhd8spcql17soo3lq5tlxck1612i00fhfxahrjs0w04r',
                application: '2zaor1ehqb9pl3okjtmhojijzryhc12fu9h2scb60nq2n8g7u0sedltjeas6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'ue7s97pxfwpcxormankbtqlhpyltlwm6qahl5t16',
                
                tenantCode: '1ai3rfz1y1965292djwhcy3a3yd3xt43xpabqo1hmfsh8406rb',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'khxmz05xs2qld1m5tr99',
                version: '5micbm1qxqle2ojhdjyn',
                scenario: 'vjiaaz0h9l1gf20bdr15qyphjaun852jusjlbexe0ofdye6nyj6vs83mz5nx',
                party: 'l0flbkevopj73nnlc7t1cz1t0fk0htog8h90ypeen09k6s4hx2ineuttcjw5plgn8kstl0vaelrfyw1qfyhv5zeofhyfaahwig278f43axfhsw3wlo5vb49egy8q71e38z8wr8nueo2iknbpewen4hfp4y175391',
                component: 'q0alutqmmqtk9x4ud1li2pbbilf5ksoq13efinfo3xr9y2cxhrjgbv0ylaagx6uqysg5u6z2ug9j4gz5ovlnkke9vijyq9xyftjriyusn0pn9xv9mv4gdaryfcfh0bzv3ck3yj1ulp6f6u8kh1cwjrm8yusclfol',
                interfaceName: '7l3ijbg53kl8bfn4oo5r7yqba72flozsql3zfwskat4ro9xtguczym8edqev9vspd1iz517hj6so5my0gzhr7y0ruifaer1e11hvbw1c9jxlwgsfqgeccvu4xjfe49rh02p25hyg2obkoupbuwif4t7fbu9enxaj',
                interfaceNamespace: '7feiaqo0qyk0rm3s76eoaigks92g5iwvsk2m9ngpezc2q9s31l00652u88ol64102yo35zmxtx5wcf14i20doz6wf4t9uum9bkpceln24azcuc1m8v1i066pmy9kesqnktvdjkqejm56gvfyk1m58q9ljh1wx8q5',
                iflowName: 'hn9tjrsq83z2f4vn4sjox2vco6czmws8kvc51fy3w9lkernu4teag9fsqd7f2v1oxerm9vkytwm2a5wig0qkn4k4v3fczxsw7c843at9osmdvkaerbvyj4pbsjgtf52o3qfd0whfbvgmhfntxl616p7z0pka48ij',
                responsibleUserAccount: 'er0vjem17f2r3gr54iq3',
                lastChangeUserAccount: 'o3gya57fvglbe64pc032',
                lastChangedAt: '2020-08-02 21:01:43',
                folderPath: 'ty82lwyj62b5kp3et772bcu020xmv4cm6w0bo8i4oyicmplj0ttvaqoua96k27v2u2eg33gzxh6ybpjsyzipw87gt5mg38nni2gy7th1bq4opkb77m4rfxxxvms0xpkq275npuy6sk4s1w0uzaeef4p1feh169e04nkd8gps6qrdzha2scg80zav09hs0kc8kmya2cy523gweiaja2f2oqu28ko73qhdrcbou52rcm5lo3wlxqp4ewqwa630hzr',
                description: '12xacin8kn4j192yflvdt979domus2349shgjq6cyz5heesa5pass3ugsknecggwl1zeahfr253amqdirh8qc436a0hj78aok59q9f2eh0jfvkhgatvoo8quq5p48qlach988rtdec4j62eri336tmckz37gbj98l0895b4lhoq5ka2s44enkpeshn7mrwqkl3vkxh00qthndml83gh9ueqy721u80ar8v4hljks5qtrpwgwkpz5j44qvixwt1m',
                application: 'k6yovx3lcffy5ipkphen3pskmho2paziokbj7frgob1pbszuopgtk466ody2',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'im262t4poa90ubmlyrko5wynjm74g0s0lab8hswe',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: null,
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'ydfpt80j9f0u1f2gtz8a',
                version: 'ku68sdx1efoqsj1tatg8',
                scenario: 's9esepkl06lmwh48bcxpzdvsfm7wbmte8ymysj4lpg1d92y1e5nbbbnphqdo',
                party: '0juq25o14atqa0ugslgm8vn442rafec2grnshn7rxidv2f4w5tvgpt4d75lg9j00dt03iti9e8omwls6tb5kcqdycta6n9osbu4ex1ge75coymp1pz44gphbybglie0d7l04epqyn1o5zygkx1if3obhb935kl6t',
                component: '30cvkkty6c8z0mpl5dxgbinyacacei44m0yjtx188s9667bmcw9aar793h9juwdqdd2bny5q85qcabx3ovon5s0em2rpkajeg4llrvvewmbhewnk3p94je9bar9jpxsskc9y2ee76s4gddxtz1es7u7nm5u8xnor',
                interfaceName: 'dmybueaj5qerz7ru185gqr2fpf3qxheuku4fyqimfk84nvagi52zk1k1i0zrv53k2h40m9diqb2rqypx3jihgj04f2g8v4tzy2me9f2a2u11q819qln0g9s3qrgyzx1c0ehyendeoyr9yodtwv29visd6lybp5pb',
                interfaceNamespace: 'n8gl0n3i8lqm4wvut8sr15n0ewjftfoe103jov46c0vs5zmdrgpqa8ue36tgktytm3hwwck6s34tunwqgfittoru7ayum0gerqkgcf5u8vaxqyook075zan73lzkoimtl42wl58ydt0wiefzng1mmfx3vwjkju58',
                iflowName: '5dhodjoshuii5pvblayq7hgrwkju5z9zh93fpk5dwc66hp8ij9idd7lpx4bob9z23c63gjh7mcijrrn9mn02xq5bef3r5w1izhna2vdrg8bdil6fp3dimxqxq9a9vuxgt1yq4x77jkjgcgyl41yfsghf7ge9a4zc',
                responsibleUserAccount: 'lr8a1w1mc3sa8j4box9o',
                lastChangeUserAccount: '7pwo1q2z9subwqv2b496',
                lastChangedAt: '2020-08-02 23:17:51',
                folderPath: 'llhksohnzx8vdt1senyk2o1vnrv7exnrld3a3fz5jyp24exj3sp0p0469kgoyq7r2f13hrk20gb09n26ouuextpkki9yd9ilar18cdehzrp31ezvax2gz4bxsbkqyv1cpy64fnls05n09j4qxqk3enw4yuzxi67a9g2j7lr9zow9nknyqyahlme5oq912671fs5z1v6tnidrlkuvu3j0549ug6t32sycjmrnl9q564298eht2z2geuyqxq3hh86',
                description: 'malg4cz6b7aav5rvkpeurwgc3hdea5pwk1q15cem39es4ui8hzjg2lv17gtipg5c0uavhl3xoopzz7l3hhcfeu5iqhurwn4xi9c6mploaojep4fnbbznc886mgt5kej6zbwyfd029rydo467sh496ybwuashjkaj0s6x1zgmm2c56hk36tpp8l3stp47eyf2ai7pism2s2dm92bwn4fzwia0lhk69ddr23cq8lhwfzwhc4o5jj16ycjhvgn0h3u',
                application: 'iejn7qwez42rybr4sg84mgkx86yf9nnprgvayzif2rt69ktvi63cy8c4b8ew',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'nr7ng8tbw5kgsz653mr4hau4fmpimfhud0fej0bo',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '3xgappq1paueaae9c9ct',
                version: 'bpgmx0xucslwt0ax176v',
                scenario: 'btdctfapcqvsv3pp4jtik0x06zqapcullh2a8je80hyn63ukkmifa429jmrq',
                party: 'w545gwxzgytz3214uamdebfbrivrzelw7hmmbc7n7aowjqy2g4vlpmva9wh0goeuucx2rky6qbzv298m6h9x8os7osko9vicku5k486wdt1ug5ei0pb76zxw2umrtmhbr6m2duclh39rc8mam8pu0or7ku8yzdfl',
                component: 'hhlx65frrsfkzrimyng26grkots7u8oxpod1mbx9tnzxs78e4ybmmhwis7x1egjzl04te5h83lnpwh84zyv17gs9165yyu6uemk7ztyrm8der7u1cz77l8mttm51wkeedvprrawynbix2b99eo7q21p7iknpmnfq',
                interfaceName: '5k9b7h96ngetdeo5uachsb79naxira9omqbedinnh8hage5kw158pvwyv8vn4bmrqhjrssisybdtm4esb9pybysdaf28cpyfg72p4vfofhrxrz50d07hd8k6xl3csj7b73h38vcrpu71s4ktog7u0lsartw44782',
                interfaceNamespace: 'oxpn45sg8r3e6mesz92s4pm0npjg1dfetfn0hxeti1pp39bwv7jcsepfz196a83w6f5ve53q4unkrc6lnm5khzy4uak50fsnajahnakzm4ur9fstdx0oezuobpvp0le0jx27tvqf0as1cmacv2vn5z4mq2y3rr64',
                iflowName: 'hral9ye1doyvm4ba5e7zx0y3gvpylgtv2dko5bqifxflnjc2fe39n4p1s0cpeyghl17yi2pcnmp1f3rg10jxcf2zd9uexy2zy7obji2mibths8q84oy0o1kzbb7obwdu95zjt4epsez09nqxh3fpglz7dqd0od9f',
                responsibleUserAccount: '3uba5xmeov5y5wu1ynp3',
                lastChangeUserAccount: 'jbaouq2btzk07ir0ebem',
                lastChangedAt: '2020-08-03 12:32:31',
                folderPath: 'beo1riznyg8e2j433rd03xlxszbffv6927rrrxu75t8at6z6cwc95wy0xev07g5m37wckn9wg0xdmsty8joyfrwr6grgm48m7axj4aqkfh8ienwvxlgb7j3znu81dvto3lg0gqbt61s7ojwm4lx9bb3mna6wyrf33ym8a1xs88ruelcs7ra4tmsfs21axxf1swqcwrf3tsih0igjirvi6pc3pdz00la7bajicjuy62c6je83ur8jzn3w1r5e47j',
                description: 'jko0klmsscol958ai96czwuepea55axhvn6bdks0ikcql3k7nmbjpx56h68j7wgp8r5g4kqaukjodmpcrnsface4om49zkg7n29wzy5sdpirhageys76gjwvv8ikvride168ykahgmx2t0e1ljxn2gh83jhj0khq7pvv0ikst8s2980hgknjzmcq6xjz5t4z60cvlih05eiu9f8bh6ihqd3tvzqs6lgb8n45qev2rsdpvsakzqsmmoxmxghetuy',
                application: '2w9nqm3bffla812gh1bbpxaonc51a43ue1tcpqqmhdm86vail6aa02g2zo0y',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'o5j7vlxd9zphxn60v1d5xq5emwhx6wqy468jzoi3',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'grpb7a6x53gl60bjir4yvertomgukpcuu25nfdhp9lxqqgm8ps',
                systemId: null,
                systemName: 'd49bizv17g543hft1i4h',
                version: '21nox4h88yi7fna46lm4',
                scenario: 'vbzaanj4z72uqhew0m75faw2vzouiic1dzylllaftzb4uogk96tkbvic67id',
                party: 'u9wju0sku6p20co84kbri4yfuvc5t0yhae860t54ekx43hrhgjo06j2onkew4q8q728jkphivlfmzqlq7gnpxru605zg3jllo6f22kv2bk7ccagyyy7v6g0o90jtzbgwuuz3cjduahqw1y7kinhykrcpee6dfgny',
                component: '82y94wqx9dkg7zbugnygqlzfg1ax21d927uoybghu16d14yqnv6yb3y6l7ut0ulitjvsalce2dhejiat2pszsfs88mxnmfd29d96nq13w0y0yn5rajqaek07pwha4jiuyi5v5js5xcaax5bb1l8eic7bu81wn9hb',
                interfaceName: '9s2qps52eu9e57p4j4t6gvh87zk5pl4eq0b0hj8z9cig7irncbglfx15dmz1gw9evql4wf047w6fktml51rsrg60gyj7alwy6q1jo5r6kspkh35131in2mx0bjqpiouzayoa4db2wit0ak7f63r4ub73j3ovvgnt',
                interfaceNamespace: 'ml98tmvc873p10m46taugbzjglqc360438e161192bd737gb6ozaey98q1trhmdavslb4ogi1824rzn3kt99xmkldlabm73b1qsd0dxf41uh1x0knsgh5hx4kk7xgqmoiwsz808ht024f26rtixxqrfwv88gpzvu',
                iflowName: '0cj04a1pukcfvmvwjkyldmdptaqz7r60681o1sk3x8l8joz74zvoyt59wvj41eesdyibgz3pfwiz5uv3uou859fxpte3258iy1uzru6c14skzmq9ivwnitkqtv2zyvghu83ntn17mfzjtru0effffktzcyj95epd',
                responsibleUserAccount: '4e6pddy0qugpejdx37t8',
                lastChangeUserAccount: 'uumys3fmt22w6felmkpo',
                lastChangedAt: '2020-08-03 17:13:45',
                folderPath: 'za3o2rehjsnl6d718o0fapna82ye68kpy6ejjqfasf1ig9gddphcijzxvimx8vq8dr5s47von014qjav3bw4gnz9hmhdwakcpfmruruys8iht8yiab5wn8irw0ogpx21gzt4rp6n9q9mg0ee201f5bsftf0vltmkpp9ekauypaqsyuhweprwr2gqdzmgdzsvr5xpt696qf2jhtdl8syg2c9197pjs0hrf0c3rlgr7krbxz73igeag65zrlwt57p',
                description: '7d8glu2vmrmox9ijydu5ayxygbzps486icffp8rie3ouwpb8eu2pmqf0x7vwlubnpx2gb5d8ibzsfofo87clj41zgfoivduidcrl0j357stty8qm62ppn62wvja5m9rrjll2bee7qykbrxvycajuj9eukfjtwcv17fkisea0fw0b8io4r1kjfdfvghfj8hf64bjkrsvc7dwuwj51mk2ga88s1y29d1v2anaabcccp5a80m3fnxl2gqsyg9aml0a',
                application: 'ay8op9qvdztiz8qn4j7ee3tdhttb80itdfunwx1rn2nnqyhkt5atygl3g6uh',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: '32afwaj8u9p5k0bt9tybocx0mnrcfu5x5h7ytvir',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'i17d560l4v39e83jmdxozffv9wcf1mxzkfy53jcv5f37otes1p',
                
                systemName: 'iewqbo185q7r8gfl2ppz',
                version: 'm97b0zb3ll1zs1o0zlrd',
                scenario: '0l5wixgdlfplel22nypmjigryvsmh71a9nn4tr9uchtrcp2xrq9czrsgf4mf',
                party: 'fit79y1heudqi0a531mbow3xaf3wov5tvg2mewczsx6w66p7233f0a6tboeypplevvlpwol834nsxmgh1yq0xf5jxa63i2d2ho3yzvk4ixqfe5v9rigfxdsjhi1y1s3ngwruzfa7rhxddhbcxcvextvp93b98zq7',
                component: 'ffbm2bdycqpbjkn5f7bbaptxvob5cmcj855bei2icnq0v88oa8v442ev6bv84u5t132v4b7avycgatdqql4gfjtyzcx8h207tahn52zj9by6hb1jrrlglcn3h6egvj827n6ycb4fezzeyczwetvp2b3qp0kwgf3o',
                interfaceName: 'yeagwa8d75u91ftr1yp0fo1k62yqmbn2xnirvvqrsyttb5pcwg4kre95m3j3x9mfwjxxfdq6tbbj5h75fgu1iw08xo2sd89ksixykmdp1wa8walkdgijhnlyk7vi39m6lgcjizzfilsfi6rtgx4iop84wl4ftydy',
                interfaceNamespace: 'yhcntvzv1a6t9ona7tbjmpubh8myv4mn0du534tm5h74fuys3rnop1i0wkskt3bzul0ogqegi9yoepdmihi5aykeq2kki68mqf3qo9ep0ccab99mzm233jxxng0y2xu1ude2guaszwl3yvcvke9pyvpw508gvdfs',
                iflowName: '9b4dg1rqtsc778x5c09bwgine7ktb97tpy5bbqxypnws3h3po3n8nsy1th2meq0ttf8ph16qvy0mgf29hq0iza2z10o8ho2xvyrrlrlopha35tn1vq0sv65a9776b9b00zba4rmfb28g2fis4j6blje8t2vc2b25',
                responsibleUserAccount: '9zkrnshhb6k5p06oxvy5',
                lastChangeUserAccount: 'iylk1o7akktr83jf8l4z',
                lastChangedAt: '2020-08-03 12:23:19',
                folderPath: 'csevyfku3zp42e8fg690vtj3x7pqlhqfvf23ig9tjwrl5lyq98ppszxqupcgvqjbcj1tp2m227p2gkcl1u88p6k9p5plxuiypy1jvowylrww05iy01y7i3n8ecv0oopumk3cfzvezt9jhnrtpcqz1ob6x5rals7lum62ajwgwtlvkl90jpa4bpzlqdbnjqevp075644dy2ziopi6skr9h13v38ep6tprru8kr9keaxggxz4kxpmj124x2whbcb6',
                description: '84x199nm0nkc5yrc9bx5vqm64v7yh70na1s9r5wbkc3q6mgdv64lqbhsojxlc57r4mow3gbpdnhy21m86xj1qzteeufy2swwp41dt8vqub3220eic2bihb5bxrshxekqpxnqwomrfqn0ghwk7w2f8vno1kfge2teodi6i3sim5eiul53rd69haih0c5y0yx826r0u4yuqib9cxk8ftcvqpcrpz2ivmpympdrkj5eu0lrfx74il4h16x16vl4zky',
                application: 'thhwb6pf7ypxmjln84i7lkr7e6uplxdrsy306tmt2ekv78henqk4urqopoey',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'qpbjjjn07ikm2akjbi7jh0bk5vlh2vzqzs7hpbd3',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'tae3ka5f9aqt5rdhytwmciph0m0j7gv1lt6lmcni7qy21qgej6',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: null,
                version: 'nn0onzg7r21pqnqm25jd',
                scenario: 'xejjx1dzx7z1bxw9n1rzxcmi3zid3lwxcqcs6l03rvxrw0zp7iftdcmbysjf',
                party: '299s0achbyfsho1z1wry6lf0ypehsvawu7f8895osr6np6bqpeou5bzh2dxoau3n3427owzwf5euz15a2922iqqzb2g8ya3ybt72dckrud2nmplltlxyec26aieh3yqaax3dryxhgdhgyolyx8q3qhjgcy69de5x',
                component: 'qrxn43ceb9f4gognl2xlpiyh7510xegg45houl6eijwfd19fhvvaebdf035t7dddvqsuacnpdo0t26sqo198nnj8xk4u2z2dxh8nnnzzgqucamze5o4ns3tb7mdvrqcatcqdxo6808z0k7cbsegz6umbwrz24uou',
                interfaceName: 'wgn7kfzc0pxvtaqgoojbjr8wihjloisw695hq0nwj2vaqvs0fi11p44kujopyydl0m3oinx5sgqmmfwuf6bo5hflbutbtp2vn1170spwcb6aiapw8ye90uhxh3lp43fpc1vikbv9vjmdhp0ilbm4jwkpp6o2lvre',
                interfaceNamespace: '69sfjfijtnr8n68of7xktp18642f7tmgzh0dyqtumnm6dcmwnr1dabsfrosc41aa27drjmoaqizlmfis7d1h66g95jal0j257zz7tb216bbp6m5kxszsx87pm2jbmyskoq92b09sx8bhqdlwt0bxtbz31iyh4zf6',
                iflowName: 'xdz4zha5lxygxck5vssbjw4br2hycqned8bt7lajulrvc6zsk4hfrvh9dmwf60godvc11h5of5d0y8w6sbns9dqn5ec956wqza9u6jm1iggihwsu4g4xkn0tmxu2eqj6pok6fxut3q51rs185elw6vhielkx8y1i',
                responsibleUserAccount: 'wduavuyv5hewcmb2qyn4',
                lastChangeUserAccount: 'e8zncodiuwzvr9gkgcqv',
                lastChangedAt: '2020-08-03 07:06:36',
                folderPath: '6a693z0di1n1au5ufp086wttb3c4c1adjaeefg5t3b36lisi8f707hyhgawhxosz6ogqucgyal4xn9adl38zk9jdy6j16zjs18rzta3935fxai4mzg8vr5s6dnnckzz329cbalatbmz60umz6zraa3u9xg1az1sdx5ihh3vudbtwq08epldn90dx978tcnqto5x7mj3ffx2w4xp5e74puupsqdzfvbkoomuttfk1gfulbg19au9006vmtvx8q45',
                description: '9n745jq765i6u1yo2sgt9gxn1j7udb3j4giys6gv74lqc12v3nbru2k269aw5blumkpkf2rgv6nl1ocu4zuhjmmnn264eh00hrr8yij1bjejcdy7fieousbmubtov78524g1947l032obmkfplk3bpcw3kswyhnmagkwb3m86m37z0wxgtdg4hjt41i8y7lm3yp42twehkeelffthcfenntqtlmsyd3uvbl52qxymtha66lemgolppc80jac9h0',
                application: 'zxyx1ootlr1133p5l3akjvetxazvkw1e6ahgov9xb5jmfigec74xholhobp8',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'lv205orspmig3301pyjuam8qwq8fhh6t1mumxuq2',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'za3xatnaa3obgeagzrxw1vkj6gx0qlvr2j2g7zgywvwiodti4n',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                
                version: '2hzq3250mcgbdooeb7y8',
                scenario: 'k8npcnkedm1yc5sisyajwctymdj9i9ev273r6agg47jykqwfhz1gdwf4u6w2',
                party: '658rtjkmao9vkzdly8vqe4pkeaffgeo3exnyulhx2w7e3sq0ep9vbw95wj35ugadamyhlind4txrvidodj814cwop16bjnyc6d6qpvpynodoizjtltynea6f9x6id0bs9rrcwbzeofmfuujbcrlyiz70yyisajfo',
                component: '581dg5ziil8tnz6ri02w2we3wfi5p4ssj5sxzhc4zbjw2izfnywuya31e6t09j6x3f40ls86w8g4om3qxmv5qzz5kyn21vjrsm5ajoncvadmam0x8n8i20uzi06hcnsv3l5chvgayq2e378ae2z2u5t4djdbcmfr',
                interfaceName: '00htlu3mjfogrgq5rzj74z4su29ui8jywwan91sjlaaauzkrcn9zg4yt2imegz8knhx7bczr1i92s3dgnqvsixt1wyd2zihui1ramlr9549t5qlrodkwem7tdwcmn1ta4phzrbfx4g9kba5dkl11551r1qepzwfu',
                interfaceNamespace: 'tna3xcyc6nvw59tmcal64s9fiv8mpvs17wcec0t00p9ilgo95tfi95pv3awxhlu0kdi713w8emfy95xk2jquuat0hufrjoazmuixploh3sakdznuhv9ul0052ibeufk22p053zxclhuqkv22f4mzat0sh6t3dxbh',
                iflowName: 'jm4fjmbo8tdeqxxprr58deowxtsv43u91r9hk0oxxmmvyateym8n424j2fn9lfjjrmku9bemf6be50ldmgv7er7xs8o32xdpy8fqc6v4msdxlpkuqbt39zehd229ufdp822idcdyvvvq9ci2cacof1grczu2h3yp',
                responsibleUserAccount: 'c32i6gpax820mazge45t',
                lastChangeUserAccount: 'a4rc4zuhrs5v9ow9pr7t',
                lastChangedAt: '2020-08-03 16:41:32',
                folderPath: 'iajpcvg5sm9jvow6rcv981agpdsgrocfv9lisqs40hp17z0gp6412josqdlzioyqc104sfhzw37jpsu6isxdazqrn6dag38cszg6j1u46fjhyox08knj6j51usltcw3cbdxaqn4j8t2v8vogdrr9gx96209e8u4cv2lsdmyinnpsbdb4tzy7tem0mnirusisasihzch4y0og3004hpgh7ryou1deyc96t0uqetstpdlpoxfx1b5jgc8fsbhtthq',
                description: 'qwrddxdejan519js1a062nfdaqo51oxm8eptww42oytxdr8hzplbmj7jrzfb5l91lgvxklwg74lua8f7m131xyz9jr3h5fveeaib0kykl1s2ygqlymnoazz52714c0xz5vknj9iwwqpow3zbug8e7mpzojg4wccvf1b21ehb1ft7umrpj2ogxh2vk3tpdc5u8q08ob5qqz50c3h6lz01zqhbogtnqsrfuohpzjfdrl04ay5hpmz7wef04dxqn6z',
                application: '7vlfmp7s4ngu1a5r6bq9wbchhyw4qbfo7apl40nm0is5x5j4v0qsev916z1h',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'ylye25ep0kmw8wf7hcs58sgzhqm5fo8dib7yq23t',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: '94il7y04svygp6dx7cmp0jmvxdcy6bjekssbcc8e3hptx66eax',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'z0adhi4mbnd44l8vdy5o',
                version: null,
                scenario: 'sd24997gw4e2v3l1wzrmejke09utetgrb9zyz3iizb7omu130rgqpx1ma2ft',
                party: '07uoyraazz5qhy7vgn1xsa7eu4kdl1tv3mzg5qbvtm1gxtcherwnyu5ric4b7ilwimvk3dnl8gufdcgrdxbvupgzliiptyx7xhr3eenaowrvqd578a3ld0x821tvlpuycpxj0t72n25sk1z4e72sqg8ds12arcpu',
                component: 'w256t0l0d6dnqayvnt1z50mg93h7hew3og9iqxudvfluwvpei9woih24m4c1la3j0po978wb3z28lwzgku3u3ltd6e7vg9fphrmyl71dh9ha45yz9kz4xtc9k6z8bem2xkdex1z5cndiksktf7rm0f0yh84qby1h',
                interfaceName: 'wnnmnxjy4sqv5ccr3h0gtw81rujwvezou4oxn3saj8dwgdf0dv0w56lys2smvak3gbabkf9qg9v955w8d8xyn9t1fip0ksihces6lksxmwfcufc6cu3ob7nvpsz5kkoh9a3ozsddtiw62ardn1a5hla4pii00b88',
                interfaceNamespace: 'wuybbih1141rz2enn4knoxees6t933tekupxyqe4xc115dymdnfdo2y7rntk7ngsbk3rw0j6id4leyk4m94up55yqo4ppssi1wfnw5x5woeo9yeiu0penbbeubbjqht1qfj9jpl8nwbaj240vhpq6ki4uuteus7n',
                iflowName: 'hkk59yifid64ble28i1jcwf5ty2qvm652y330oivqu3itoytttr95phm915d6d35zca2outm5o4nzz7lksk3fgkw18i1m7w9ho0zw53z7t6s1hzyfqbyynoyw4u8m08u5vws9v6i50a0febf0jbiq04vi4rs9c7n',
                responsibleUserAccount: 'nizpmrshr5v81xxsiifo',
                lastChangeUserAccount: 'iyqo7pgnjxj1e9a0288s',
                lastChangedAt: '2020-08-03 11:41:11',
                folderPath: 'xwz4pg453tvkbpnekhmct7mzfsgx1418ar9vty4eb475gzihdsud8tewrghcca1ahr4fonnia6iomolxcts4rsvw9xkh1sail9w0lqidz4fzzh4274u59zbgifmgk2p2ixraesib46xv29poieo8h1dsyqoiqz6z2zytzw1bttunjnpul02a6fvtkv9w3rhpqbmv4edla5tfpuy2yxcdw2auh7uze688qqmwkhuqe3z3q6f1t2tf1bj75a039cj',
                description: '0eqib74xt2qr9xbt6wks8rmfmz7jex0kzp5udcyj0bhbnjcip7n5k695knji8jj27dhlc6m3ft9w0umqn5x52aelecvsy8qlpwuibp4jodjwaadd4yovgzc4n7x9xemez39mdu02n439silu2ag2dvmn3aqldjcc13j1nyymjds9l27889w9o4851cyfncnd3h4gulnp8ldxdz1bhj86k3x08ig6d8wec9liv5ve3v6mvzqpwg02szixwdoy5hb',
                application: 'x71er31ukb6uiyelxnykcdia2g4kurtxa8hldrtfdk119wpp0zxyzi01sxkv',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: '5c3pkr8yk7krfudsasz4ekxf0k5acg1wc4l4fl9l',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'b4at4ozk23cpqx6abs7nvxomp1fu3g2huki7ra6v7hy4pjh6h4',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '2wedt4lcw3nxvcpuobum',
                
                scenario: 'sd8k5zvp1xbkzmqxlzyivp1blrooovgetly6r0udcyfne0j9ljhxefv74vkg',
                party: 'y396mu64wz4ibw69w0kzfastluq1zigz47njhdsp4tkxgm280kgbsbgvjcw1ofeg9d94fpjqps5uhpuzycnks5aigb67ldgh4lb8x30tlp65zxd3fh11rjj7tafb6ctbr6pjh5dhdipciiwu1xwsye44f5bc26c7',
                component: 'wq0lr9tycnr5hges69t5k9vrcqbnlnk8366is55i4k75ee6l35gf9zuljdbw8d7xiuynwph2b93dd3zhkledt0cd4ksn7zjzaoc6gjmesybfpmwyckowqzqaxcl4g561isqh9302t8vf744flmx2b18ruyboitib',
                interfaceName: 'qyktlm62dunyhuned0q7bxsw9vgr1bhutjpu5n5nrgs05b0krbqezr0cpb0s17jjcau711ltl41i73yjs37tldjscamzcbnf4si94yck0cntjdufxkrpn95nm9wmk8vt9f3vgb3zxcxuctf9bsspz7dog9k87lqr',
                interfaceNamespace: 'z781x08c7zrsa5itc794w445lz694w526y5t8n3z4vbl870hx09y4wompha6q5f8a6qicgb5qg61jwhe9u9gbibwwymueog2hl0d7tu5pvpkq48r68coj2bd1m01ck2a23ms0mmun7hys0cy3mm14wk1lq97f7rm',
                iflowName: 'bb2a12yt8enmty0uf5cng16xqqbnkxcvwdf3vz1tvzidpfjfx5yaf5epd7oj0z4dvfiggehzwc2e3xfssfjojmf8nhvzoc0sw71rato9furrr3k3pi7hnh8tla6gbgm1s7s978fqc85zagnqqjt6r49ha4evehxo',
                responsibleUserAccount: 'c3bqlcku2utzu249pvcy',
                lastChangeUserAccount: 'jlv4u6dcdelg5w4solea',
                lastChangedAt: '2020-08-03 01:13:54',
                folderPath: 'ks81vgjjbmlswmvj94s2zkc8mzcrjnrfbb5vzvfqy16cygk2mws2gw1mgdmn0apke46j7nwbpsm8gihjtgdf1wjg8bnauar04olratqk88j8aokvhzx5qmelq8jm58rocosyj2ta04wogp26sv4objrbt0xyj3sm6vdsu8y7a3imwegk18urlimix5mie9z29rmmzt7zhpcwpyvh8idk4holsfn1f1k05k5o653n646xygbxs24z17pph2py9cm',
                description: 'yigtc6rsntv2v01ui8ee8zuo1qrgu4di0ime9ymzoe1g651abpirakklkqjui0kd4wj6u8skl60kr9kgntku0ems4kn12jmxp87qu3qgs1qnzwivuktszvy62t9xm8n3gu1od7gl63o25nwuurnqvrt8tw2v3gv2ah7fmeh0eke6m1ghw28uq528fn0171dh2gn91mfx2c42y1vwugkvafl64ctu82u63r1k01b1glm42buxgzkjyun47jsf5s6',
                application: 'ldgmxlppoqjatt2qrvhozld663gc88zzwiiojfp0ap1oad2a4ph00zlcc2az',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: '0ouyq357kmdgj5o6w2x11skjmw4gjhtce7ddfew5',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: '74l91egrapj130ga3o41tw0waisu9tt3forie9uihrd1cnyqcd',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'hgxx0hyogf5kyoih1zcj',
                version: 'ogdnnv24tjkj0dchfpgb',
                scenario: 'blx6yjmauba88c95putcf57efrgx60gt3ta6zzqa0jcgdk9fhldovgrb7gfx',
                party: 'uywdjjxcamyjaml2kp87dciefm5o4t2mu3sqjv3j9qpxi81rpqy3gkn3c679u4qlibzr3ttv5mmily9th2dqsdtz75qknu1ekvzd8nhsoolt1w7o7lftw4zj06l0npl47cavup3n6cut298rw2zvv0yqtzouo14d',
                component: null,
                interfaceName: 'r6twi3ws7zzj2ew3djbeeqmlccwdayd8uamoiq4dbhgxd1jouhixpkfzso9cw7lcr0au3edwucx2srqs3mc8iw795r9p58ff2o8a8e7c1g1ckakas3rsefdsd3rmqs0xy4ywfc3d77i68kqelzh5eocullpr5i8l',
                interfaceNamespace: '5fxgqc21zgiglvvsc9rwcouemp0ph2f9ytfup5ku41r0qkpdzfu1e2t36lbhg3kvnts0uuh4ixidtp8jn88s4y6p63ud3hpe77rs5hivbr2jp5lstjy5uo3zh1l5iln0zy4xxg77wn4upyjh8421coqy8ku9256u',
                iflowName: 'fi2x8wjs3idmkd9tw6imzmfork5a6eljat8oao4735rcxg0ohbhekrnvrhtrr2r8bczx3xfie40otcexjzhpr1ncrb0kntirnrd6fg11r6u0gjytsfxo7b5ay07iw2f2kfzhno671r4wbj35kiraie6ofpwbumax',
                responsibleUserAccount: '8qyuu4dl2742jsppvp65',
                lastChangeUserAccount: 'hjaai3bnjvm73fjlzbzy',
                lastChangedAt: '2020-08-02 18:37:34',
                folderPath: '8wyn8suhq46criguhij5aiqpdlst773f9jxg2g3nhl5b2so3o94kdzqpzq15g5goigkw9b79sc0yo1d2hqso8noew1pgv15xf6lg2q8ca86d6f9cht2fjo5a5q9k4njogkehbwoheu0gar81scrjjoxlvqeza3gzdy674fb9u00x0iyotn5fpoyfwr14v2618r11j15gh0repssaweqgijrifjcif6zvvry9ot2pijrcfwg4exuge0fxnfb7dc1',
                description: '7etcicqw7kjnkg2fgc955r6lj5p3muc6tf40f2y6268u3u5m4dqcde0mg4siyidmnmx8rqb60i6krfdut2aph12brpz0jdg5qt0v6ygmt7r49u6phic8cmiess3danl5s1zr3vkdm0u9jdtgjn3agsqecjgd46d4k7fw2hhrire850v4xxinzyr0xw7ksj0hgmi9eszwqat71nfbjjjyfj5782s5q722byurgaghg16xhhy4uqxeeffc2kdsc2h',
                application: 'hu07dxql1hz1oiwgiz7dwtogke79x318y9s1dmc9r708zbqr9aee04ise9bs',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'pltj5hfrl24139gyogw51qdi8kx1w1jqi2k4go57',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: '5q7wzo3rppaiydlr3vuuuf1h814091wciwwc0hj22k9rbqliep',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'wxlww2i6bpc8ijdya76q',
                version: 'uqucd0immb4tzifodihz',
                scenario: 'pqrgphrwd95c3zf5rc2nm47tw1rskmcbqcn5g5n4n9xqs4geq37afvrkiz3c',
                party: 'bgyv8lin3h4bizf9fbh8a0rzbd8rbeg2e84j8leblc0vhmrzi93ijh5horv2jds2fmtptzuy726tbpoow4nepumoarp4je4ahmhqpg5ojz14zgackt45mc1pm5rwa8afbcjaa14lc4vu5nzpuu2h0ptjs92j79zm',
                
                interfaceName: 'soyzgwuoi91cmm9jhqz8gaxdxrtjiml46jc13krae9hh59zeyqsox7twifn92p9navkthc5t65sje4d7gsgpplw7mz601acvs4l3408lp9gyb8n2uil0dh72xu78jljkix2yv5lvii97g75sw07f5lnj8v18y9jv',
                interfaceNamespace: '3sp603zp2iw9sccr1bcuspey50ustqt7zrhdlpa34raugb873sws7us43997i2j3y9xmfrw5xhn8lffga8mid23je2wo8uqo3060uyfvxwwv8fodjwe86pusztd13pakrzme1ieqvf8o5qllkmpdotrab9y3yoh3',
                iflowName: 'rcq61odkt3piecfyvlhmxdz2is9v9l538z4orlh6bh4ofsqnkkszmx8o6nik3etqc734gp2mwldlet2b2ladpdsvmqdztjw50w21ex8khpezv2bnsbfirku2u4ml4nru04o2x4dvb6mi36fvkna2v6l1eu3em7ck',
                responsibleUserAccount: 'r9ahutqq8wmd5qn0oxpm',
                lastChangeUserAccount: '3t4ppm7a41x3cruggffh',
                lastChangedAt: '2020-08-03 00:11:07',
                folderPath: '03tusyprk3kmrx5h855ikqrb5tjfx7clj0xv1lvfsxbn0qk3dp7md0xt2gwljx1flqk66x9woaf32mkkzmrouxjqc6mxgbgntj5sv3exjcagv3x6qh8grvfg4q3oyfwx1ixn85eapykx7nwhuorgfxmx6zm7sngargz09mrozpumzd4m8lkv5xs2eg80mc9zeudm046g4fx8dtxaslbva79mgjv9hgsdkipwjauet1zqrlcodtol909chtsx401',
                description: 'qd6ynijd3099bsfv2rrzk0w6iilzheysbqx89eybewxkmhuc86doxgjiiw0se1yhxuh0vggt3w0qd7mwy087hlzqyp1k0toppajt3iyslh2uifhcx1vq5nr03tgeot8jcn6qvxzz8175pnf5mfjxfeplwff8pzeqst966o8o4e2l0yip5nfqe6fkdi4yuugsua7yy7jjfh6tw3rffr1cvix522z1fp5z4j6blucuu83mt78ysfk5vbcq18hkkk7',
                application: 'rb611e2i4jukfcqb0y1jtawnoykilxy3524k261x5u4e28m60cqt8nfmxjxd',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: '730ikcs7ybxgziwrgwaolojxkziu4ie2p289l4h1',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'jv4dfvw3ez4l3vh483m2x4ke0idaabgkxmjaokxge7a5twcfdn',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'dhevmuooyy7jif08wgoz',
                version: 'h6bvev2848vyjs1qpzjq',
                scenario: 'y0vz0ebylruju8x65bggvj41jmbqxqjkmbtywl9jnmef8pez8d02tkmi04l1',
                party: 'tg4yn3qofookxfnm6nha5vyxx4f7nmpaua8z6xra2wcmeb9kcl90aw1c02qef0rusa04yrhli61hdovj27s7mcanpzr6iofoe928mg80jorq3nwmha0v37dzbb11jyhb0w8xbqpzm836dsm6p8enqj3dfk8mx730',
                component: 'due29dz13cb2fa5ta32vl0ya90by0tyzrf9gr5pbm9hxc2n6tojmylo7vdjdiehay1j9f1860u7w2801zvik4mgw41nwtrw6coonxkvgb7e2o4il1j8b2h5avm2nscv23i23v4ygp8lll8fqnfb5ynkwcuq56s63',
                interfaceName: null,
                interfaceNamespace: '4acwc7byzziv1ujvyz12mlhb7nlwsz6tshsxa0lpun0ruhibbxupyd4e73gqa4fcss57fd4kjg1reg3xyb2ro84pog3lici7df6aocjyionx3cvdjtu6byawm4y0nappq866cbt4fnlddmk4dm8jzvy97o2db4ci',
                iflowName: 'vvwcyaxyueeny0u7bay6au1ty1bxunrvlz8uahcfct30tyygrq7l5vaqu6tt6tyqj5ubblfo7g721j5i2pra8nzj9unyzh5mo54lybeuu6543symsj7napx08nxcnkmxvlnk440x1dcz5zwn8jgz3ek730twjuaz',
                responsibleUserAccount: 'hh79wvtia9vh8yfr74xr',
                lastChangeUserAccount: '9lrzlewjdf88lqav8f3a',
                lastChangedAt: '2020-08-03 03:42:37',
                folderPath: 'um8ths69pn2xgysl8rxvqogkzse3tyr3ny7839e6gpyebg05cnjn47d85ww1yrndjgy55co8rhlol10txnyrarxw1nixedp6ijoovt73rdlrnkintn63s8356dcilk9etj7oqc9eryc214qys6gq73xo32hd98u4rfiuxgr3qc2khoqtr24qmqzxqq7mvd3i4uzmot34zmiys4gzxptri6ib1k5hygjl5pawskpywjfubfbs8w69tw3sg4nm8ow',
                description: 'hrymwhi0xfj9tw2qmdhoqby6zcnzpnht6pir0y3u92oi7v0hi6zlyquqgryb4nrmtx2qsxcyjcgvyb73pgikh36v80jw9oarxe6xio74rwcsve44a4e1ew900kii0n29p6j0n8nop62hvtodlmhkx8zevxk5xat3da68f86r4h5uo3tqy8eapmujnfj66lztzx9y21a85gtumw0tq6z36bgxox3q0uh396n6k4p4vyl69h5agafz5kj9r12af17',
                application: 'a0qodkqmv9wxymnw3mh1xfvej8gmm8ut7hrajt2at7xeyat65xltak0zev2d',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'c71hqlh4t2jpx6w27fdyixo03fxuk1jox88oweoj',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'lbblf406neefab83qskt9bnc41hwzw2veisqyps3d9l1z8j2kn',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'q7xa5oz6ln3t1s0l85yl',
                version: 'ey14d02x8fy9yyvn1nnj',
                scenario: 'r3k8ry61pz92fqfnlfewya68i83a9na8hefm3efngjgsr5fx8z5ijt9bwwob',
                party: 'xtzkora363oy0bx43rk7ugyx1omkn3wpmbx106jk07rq7ej9r0v4vyqb34iswxx3umo3mgpvnj0q6ugfmixvf99irb4kuf3uca2kj7mtu848lya2tdrsrajhzj0v4s3eswh6ufetls17iyt9ollbjj425oy310b2',
                component: 'znpsnkx03zg2ca8zbfz75n3g2y54v7kflr9fl0srck6nd06l6t6s41yz2yda0o8xabcqelbl8xgniiaatddura4njpx9xynnne14fbqg70jqr88j9pdrjr36ngm3ic97flhkxhdaiogit8nsvnhqf17xjfoztoue',
                
                interfaceNamespace: 'v0fzrdpca17c29c9etaq3nlarzzdqiiwhv9ngjmyswovpad8s6q17hydk773widblmbxa86jvhxjdg472blhpm4h8s68s3nqzuo93tnve9hpm1rv3670x3ngi1tcc4tj2hstduz455cryifxbxd3t02e3lanuji8',
                iflowName: '7o34nyd7ss2z2hgx335f7sgi0mx86m0db6f946kxwux9238wh21adesz2ttl65vpm2mcyq7avbxwz3pp9pflox74b0n90203ftd57593bm8t5l0nx5jt03576lbx0lpfhb9zs5phx6kkdd7hdpgfdm9u0uocva9w',
                responsibleUserAccount: '059b6vtooar8sfb4imbf',
                lastChangeUserAccount: 'emzjm6lxegbpgnyxr54d',
                lastChangedAt: '2020-08-03 08:29:49',
                folderPath: 'hix989jz7y4b6q4kcu04tpfvst0prtlsd6ek2untjcda56po6bv7n6bzjsl6p3j9v3writak5mv2156jtmqtusw5285ugkt8i2we5d44otjddbnrrnvvj8vb0g7ofphyov7d804qlihlipfhkkz3ptpkvnccfk78c7m8a3lf3p563l7d357v7c3husekmf7oamcmkkngdgbpnrqmdbco94krfn88e6ob5n53y0vw61rt4seu7yagciiislkksso',
                description: 'd3vfsvd8093zbcj41dicsayuhqma2h4qpi2bqw07kddw7ouufgmnrajnr5wdki753hdnmqllpn0afdogus9so00408d3tdyd6kx0jimar3t9rpkoymnr473gpel1pebpjzjg1ru35370zkkzl56i2sr5h0lpjj8dfpfgy3o55xfqxqv9sfon7fzmw24zyb4l2g60z94nz4iwhhx0nyrmip3lgft933q7sf6ws4svobx3wdgg41fbstkvleqxwlf',
                application: '9exw047djxge3lqtm9mirezlyls7awxdizwi90zlqpb3ocv3rxfow6wv6boa',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'bowka6kos6skys6z7yhriymnjywek28u6lq1dfx7',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'nhaefhm65p8myp4rs70i07pjtmcm7ldktaxopd06dzmtmi1v82',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'wkgkw2q99u30snq1d0nu',
                version: 'hkpgxuuduyb7ble11z42',
                scenario: 'whb34o8ngi85gno6d7s2al14pq6a4p1ohcs2po8k7rtm572he0qh9o7bewgz',
                party: 'apofverc035aajvbk511jqeq0fkgdy40axan4bejgtux1kwr34lntm9vd8sxgql99yu35jrqs92w46o5tej3ylb55mc2eda1dyk90yjjpcvnd1irc6o5kwac25tsh151hmb401jbvmagb6bozwevxzy3fwqkk8if',
                component: 'u6ofaigw7jdm87jv4bnmoj4loierq9c08661dy3l6d055yf0tj40r7021mo9qpqjmapmyubs9o8ab1iopk3nmhhoybfsosjgpjtd32jjkbp83w5qkh7jj5tk37gwtr2xb4kmrjadytxglzns6td0nqg54z7apeo8',
                interfaceName: 'jhkmmgnxn17q1owe6wlk4rp52vd9it9ipgzjdxmvswwkl2seolfqdvo18qsaxt1d5ij2wftqrycjgkr5emjxb5loz52nfe4fnurljbmsyqti7nc3pezfhr1xga8ir6i7q1c9t38138eyb9gguhn846uwlb0kx8gx',
                interfaceNamespace: null,
                iflowName: 'yxsmec041echch2oq59ewkrrh1nzwtb72dmgmchjq9eerv2ty4gf5zmpweypf742b9uy9uf6fl17lspsmys2uwae03ms9jvpei96qkexr3bxlcoo954xpa35xy3mg3dnq88m6fpgfe0eobxm24xri3ii55iyy80i',
                responsibleUserAccount: 'on68w3qupzh8tmff2kzd',
                lastChangeUserAccount: 'nkv1uczn2n0f85u3kr65',
                lastChangedAt: '2020-08-03 12:15:36',
                folderPath: 'wgf31iqgzathecnayju21afbvrxeg5h26vpioua1acmd6c62o7lqdir2jqo7vjjueed9cgjk42lyw94edv1s3kzuen45f0yfttt505jnesdl5pyxhfzmrzi4uceikh3j2jlra56xitj8u6gbrmc37rhn2kh8jn5v377zq6yba8dn3il1ssnksyr8jdhe3rh1imlnkfz5oc2l0a0d5gpcutl17s1gdnw95qnlioeeu4bsurid58qdq574a9rtir3',
                description: 'ddsekl9sdnd2ezqp7n0fof88kh7vriqcyi4ufroq3e2eds6i4u7qhkggjofffda9jfn85k88mmc7mdm1g5jfs3yfwso7tmsxmmv2mlet82k31zlmu5m4nt569j2xx7aiu5td3mvvg5dit4ibi62hst22dveu7l2cqxwuh765jmnmslv54lylp5s46v78e9fhs0qx8h9umz5d1n8pqsmdjw1i69zy4trzc2na4odn6s989alac6tuyund6m4ygqp',
                application: '3jtt9gz02w1v25vsdxc2fbjhd0fl5k0l8ktop5cbb7m7acr1q67a72ceu4uu',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'kdvg7mti4xljfk5g64t91rjajf2qvrjyo68l9qsk',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'kjt5ibueh17xnbkmvwipcjt3a1yjk5mfej1nf7b53gc355hlnb',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '76ecpn7142a9z8lpt260',
                version: 'dypnxxud0c6wtqri7jqy',
                scenario: 'to3yjmvk2wrl3rria8dq54n3zvpm0vhdcbc7pjdnvs3bbqzfs5bu1riixi4s',
                party: 'u4sejdjt6juuzmjrgkn9a139zmtvx70max49eyhhwstz6vkpdpurttuyb63ni0f3siv39m9m1tlcl24cr2k1xy0fri4qqfo52cejm3la92kse881rzwkujgayyh0sjso2qrzz666tbflocgdebnwude1mp5rv56j',
                component: 'ao2xeecj642hv07cxlj00pq3m2elxdd8p94u47hhmgdodxk3zb5i5bpl25u8od6xr5z76mpvfgy8pdne5ghcl52sv7l1qsmxyyp79jymvkwdhpiniplgvn8ghnpsocu5no1kkarceg685bw71e0q9kg9i7xgqase',
                interfaceName: 'ksywtywzckx2p0mwzraaki86j8bynse4yawfr9oaf4xtgcodjpt3ez97yojss0eztf0nsyd77hk13imqqlayia4yfamuj0ma8fm6jjjseh8s8akgh5a5neq6k4q0s4qhnwqtoxr8csd0s0o4dbzicatpdkle9wxd',
                
                iflowName: 'asbmpbwksikbf8iheej3ruirjpcy78tlu9n16je1ofooknxyh05az78fzpxwcjdj6sws2btkircy5sud3nkc1thul1akr265dybfpusku1rjft08eupogxqmv1b5gm7efs2t2qqatobd89dhslxl0codbmy2jwwj',
                responsibleUserAccount: '8gg3hx5y4pt0d22j9uyo',
                lastChangeUserAccount: 'vvxk4egl5w9m8a1zz6xq',
                lastChangedAt: '2020-08-03 10:23:32',
                folderPath: 'k3ropdubr5xjrabcqco3v9p1432a6ua81p744mntushnymwgduvzi5g46w83c8swt2nnucmtbd7qfkfirzk16hxlwzhyyrocrpm1704k8baorkmim2ij4mv8ybsoy5gd5x0uqvuw0er16ij8pcfpcdh78tf26qlejxb5klc6o78hfoz1fu7oh194qz7fzgeyvb76yxg5fy7f9f04fpxj3mznebr8uon3iolmgc8w9uu1z168bn24lt8ekzf5ya6',
                description: 'zlo744578n16va1i78vxsjqlzeqp67l2jezegokqvw2q2fe12jeuad0at3bnbx4g1q2ieoivodjv0mqq425j42cbtrffxpl5a0n2vt990s34tcj577z9wu19eswaz49bna0vu4120zogntlh1htn4hmbpiu6rjf41y0q13w1pm8hxe1qju9frjuja5pbc260vswmskpddn2vsvjdudl7ia575a8iytthgdvbpmsq6uxvc7scn8dedsfn1zo0o0o',
                application: 'j335kz0ikn7kuxdew4seh0wfs04za14l9p0blg01kqyqrf70zvpr4teu0owy',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: 'v189p5m6i934qfiipofni2cqdhnpk37ansz57',
                hash: '7f9rhiawlohu8mg882ogf147tl01fo8u84b8n1ja',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'zbc3xpem3ygwkjuq8mbm3ax6e37axtqoe8t9svfkrgyx36seah',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'gu4yz2dlxsov2kirka5f',
                version: 'uzen1ksnibrbkyhege90',
                scenario: 'qj79ispqugjfi066mybonh9ya87eihokxst9msh4fnuhrgi8cgkrmres7qhn',
                party: '27aamh9l9tudfmts046llwzao69rm4t3vxuqp3d03og3a7pasxo8uv9jrfu0e8t5gg9ido14qz9a9tj7smsnz1n0alfcaek3q5e3tibkhjuplmtf5sgpgsd9u58cyuyb0c8qopxfqj5461g19a89lthz6huaitdp',
                component: 'r0hbmwhx5aynfiljhoqwylx0vfwjuef3azls2apg1h6iv16ev0tqf0c3ursbrt9kwx0x6tfgf9es7c6zhcekctba1792izt6zweyynvue5stc5neih3jg1jop37zp7p4r2btu75x4llrojiuhk0vwci32h5jk3uf',
                interfaceName: '8s4wpi3xcy5oc37nsrrympq4yu95wp40pdch6xc260ibrohh6lm25px0e5b1d2c3tuw0jk90gfjit65a58qmkrxa20jiguhiw087zbykwae81vfvk3lfpxza1cxxj67trre1gss4y51w0fqj1h6l88fsli6db67s',
                interfaceNamespace: 'l6xks1sg79j83pxdqvnao4barpxd5ne1a4znh7plozg3bhsvl6suivvyovytkwhw4cw2ziergek0j4rhuv6tguxo6cw3c2avn9vzrwz12e80vd4yt83y829ztehexhcmclo71o8dwjmlvojbogaimf070myxcyyk',
                iflowName: '4bb7tnuuxdh1hvnq9b6iqq19hadsesf6cmls8z0wgbsc47d5jbmkffpq3d6pjb0p6dwy9g55is6fu6b4qjw20x63uz9du3v7ph8loc2dsdt9li9q3275z1vl1z2la75pfq93ls668vxq8d447afix8mhc9d21whx',
                responsibleUserAccount: 'ulzgsoj42rhoxcixb8sr',
                lastChangeUserAccount: 'xmeba58i9rvkz2mfjoyx',
                lastChangedAt: '2020-08-03 01:44:52',
                folderPath: 'q077m5rkbxfms9173yem7iq80r5tw29j6xqpbc7ye9j4ns9ooul31fl1ismca84ndfadsquwrlerwqzzk7rfpse1yw3gsg0avmvmkuxsao687cx7u7o0cgpaxyvhdp1f5xt8s75z4qofhjrrf7a828ll3gsdqlqb8qmclrs4r5s5vdcequum6hizhdq8kobn9jhyx5wbgwwauzkbtirqxv049988higidznrq4weyjeq3r6opc5tqjqp0fqe6lh',
                description: 'xzk31b1z9a7gjrjyf6ly03nzwv6hd2vgbjvkulk136puowxvtv3q5h30lr5nov4gzlplmhybqqrq3e96q17e6rtbkum2vd4oj44xiicvnqzk0ttmsa0izq1idwnb1lud1urtcqi0frthnemueb9njrblr6mxdgds59wl9l9vvqmid47wb4y52b334tui3kz5tvyl6cfmv752f8j8x7dz54i9z1d5ca3y9tfae14fli52o7y6yz04twrmi1sragm',
                application: 'dyeqosgtil30g91oparbkkgedzjp33so3is825hnh0m70rmfxsze7j9tvu9k',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'fy5jz9nbc8z0s9pwa4kwiazc6x6o6496q8ns5w1xw',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'guxvjakj7zh167iuif9hge9h3b5xptmfudgbb6mc38630e9z4e',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'on7020kzxz1pexll9dud',
                version: 'djywnfvvjw1utd3jc1tl',
                scenario: 'drbr9dbop782r0cvpfjr9dqw8gge8ehim84w4pgqsu8z3rjooji8qwn7cwna',
                party: '1gs2jyvmpmmedhjdkamw64x35ed6kewc0liyj5nnta1epxhlbjrymnwjk0ox1048znt4qn3j8g58nxe7t3hutv71sgwiomk1hhinkj1csr17cblvch7dgpru9rxv788h9cery0fbm60e6xugivauf40rntgtl9ox',
                component: 'uykuaw52cdoo6baa79hg2s5focuts4dnoc2h0y9g0wykcxstx386u8c7e5xwfvgltu1lfnywm6q47a166p3dchk5l1ypi9x28w4f1scqjyf920h76nfxe3z1qcvmxhcn8pswlqztg5qg2zuadxz8xk2uqc584gl4',
                interfaceName: 'j9lr2kvrincrlz9ld2gexb5xmeicy8u4k06ertmpoewm7317vmkvsj9nbiynb9o4nd1klyid0w7q9w4t3zmr965fcgksim045g59ydzachz5uo1p6skqkqxuu002tov73i0bpqvyuls90jux8jw31w39q8l96spk',
                interfaceNamespace: 'e6vo0lk3dk0au4sn43n9wndzkpbyeaot7o4stobvryc2tkp0i5th9mqgaa8fwah81mqqgc4thrmlx8xvtjkhlc9i7hcvgc8knl80eemee045zqvdnjtsr681dgrmhtiih0rf4ttbkmvm76zytpmbc1xphqijejqo',
                iflowName: 'g419lucykv8l2jjchssz2v18zbu44qswfgjcp8ke9s51kkm38jvk4fhzn5oc6wvplzue59e9crn6m9k4qsjzmmsevoto8dau79gpy02rhgg7tbp96oglrgrf4re1nisrydm0mg8doo92m9g8eomt5g1ifbq61pk1',
                responsibleUserAccount: 'rgdvnie7pqxrxqe2r55m',
                lastChangeUserAccount: 'hg4ecoht6asl63651vn5',
                lastChangedAt: '2020-08-02 19:27:21',
                folderPath: '19b9jw3fugcj302lfvaao2g2jexy5hawiiab1giwloa7bttwel9599jwp5xr4zf9uo6r1isuuftga8tbnhy70ywd5uzvf317jeaka4gdsidu2l1d1qnxagczzgv5ru5ljwth733521psa3g8fmq4v3d62ksr7u1kg8hflavs92hwipo4cw48kz23p351j454gvecht2a86pndvyj03prd2twahj09htxolmpjcdkhaux99ootsp3f2e0br6i25u',
                description: 'q52q7vgeiabnaxrqxi8996r2xez86ueji896t8ox7ux869q407sdlu2jdhierw2khfl0fqdduiefs49krghtjyc8ys09rra65s3t914oblysrb3tstsitm87ljw6phzd9gheatucy5zyack47pr6jkyzzkwhpxwkojhs0qsge8ltwbl3gykh0pz7n6in2530h9roedkpdcvmhvsyv863swqgdpbeiqyj46df106it257p5r08uiawd3nxwrsdhr',
                application: 'ocb1mvvtnkamdgh2uv1kuu3jkqjeglgefp9r9265ht11gwjc4dtz0mis6fto',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'w79t7r9pxpagowdwgib3qwu5gq76fac606teheld',
                tenantId: 'uw5k0ye05me85ewqcay7ic2c5qsk13ml1evw2',
                tenantCode: '7sv12k277oiree17uegsbp1osarutok1hiawelnidal7hg8exo',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'c95zu9vx39s81e55igrb',
                version: '02davbjel5qdfpympgto',
                scenario: '7dqs7d16k22p4qaq4btut2o2l96fg9f6ybszahb5j752g34ceh8061th0ru1',
                party: 'a5ud19mf1fxx8oraplumfjy4z4jvrnrn8dxq6ra3rfqex3towt0nmyd0f3z3m2x4ls59vp0p6rk9jojinmp86lruc3c6tsf0fs7g3ujnkedigd8o7em4dhzsobokkyoroqt21667udkb5ops3ajwc2jg55qri975',
                component: 'bkzk5tnl25usanqid6uxw4zaimgtqg8936v3vlxjfs9yu2qble3a71rwfa37pcsl6m7drxt76xhnr1c0m0793ddty5onr4s1ohlj11nft3ddl3wufyx5pdzpf5xz4wjsf4dyogc0frx50p4tnzbovfx4jv2b6l9x',
                interfaceName: 'e3oemqp8vot4v077pt8gyv0olu3odcbreq8oqopvpnvroxuasvinei685wbhtcjg3bt12x7dhjmi7hllcgcnnd72awkhbeci7tg6e5ex53xv4223zy576u1dlc4arkgasw4b2ymwx6lflpr9nhj3l66kzcq438ty',
                interfaceNamespace: '3d54lphd3u7gcxmgy6fg6klssr569rkzvm2lol28o1a2w28apbhjkr5r79i6nlcj9um8xxkbqkoeoqna5uxsc7jefqvag1n6xqbkvtm7v37n1b3pyjinwch7qs5br0d39m45u1kxyffihya4wfobv7avm0n91k3k',
                iflowName: 'dja0zhwwj399c47j5ycbd0wo48u3k4t7o2cffws30o1722pcd9yak2m5ses7bgxr3nx79boo4pvmacyrtuaowujxx9s7tnb3ktnbh4xsj6m6svupkwdnrixvpl1vvj5zp11dp4aeuoznqgj8tyhyabuua468uw5x',
                responsibleUserAccount: '4bedc2ot1tsp575so6ln',
                lastChangeUserAccount: 'jekni3m09m2n2rehuss3',
                lastChangedAt: '2020-08-03 03:06:07',
                folderPath: '2jjtrc72cs54yyubz7cksgrwxsotw49x8p1ip8gmyma3qw6pg0rjll8s3g6ym4nwe4kgcnem6c2l1qzqtmhtdpl5sqdzrwmf8oliser93s0zm0899i4u08cz5um5t6vags1o3xp2qy4y4wsyaxyk2xb7j85zuny8n69w9qp0mqhw7gnuv7hgnwe3bgrkaad118vh8kf84jb2kz3dfyppmrmw557hs070uwt9sb3rwnz2gmq4cmi9z7ww2xssjii',
                description: 'yuo8sdeshl9ypljc4o828v44bu1gpojdi8e9gm3h4mz8crjt8b5ggna85jb19c650g7085rkqm8rb7ushozzq9inljkfgvoxfmbxxnro9ha9v3vwb7he266pvna9228e9nh7ruqgy9agesbzafcsg5ixaox6spl6vtlmhqhitob5yl5w1pqcdyq0x9x5kxir0sa5oazyz6ed2inof5a2tlljkcj22jb0e9qjoxygt0825badu07o51kskrjmdew',
                application: 'o2wt7ng8g74wonq7ie50vwcbm1u9hn6a88ooasu51kbytxhb16enhrxk4l7z',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'fwewf4dfrr1c244vic884gt0m0zu7eafnq1hlpy8',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'kcjes6d3jxejz5375s70uvdisaaryy0echwbj4vngxen286izs',
                systemId: '59y143bzmq9qklbowlc1rpiiaxnsf4syl25pr',
                systemName: 'g1cg6onls3mp2bzhrlat',
                version: '539cneljxlegmuic9zgr',
                scenario: 'xk4zujdjjymelcp91hkgtmg8st4oo0leigvm7ekmb8y9il2u22ge3ewt9v8r',
                party: 'st95u1f6griuyuu5cua6huyjdhj1fladx5ux8h95icomcnkcuax5mtj0cylp7tcojorgwiapcf07tlz4gvj5l6mis1q9g0i3drbpgf30zgapok3ngrzkfsw474ltwabkgkvg473c3kgalba4sgf8776ejnnwxx4z',
                component: 'jbaf8nj2ecao76fkzlr1nzxqogf478wzley5m51e9dp8lvu9i8s9qknlsfp0pkitulau0yi1it9tjvh4sdinwl67fub96thx4ompjaq8y9e6omrf1m60bdvnphjiim7texuakmhpv1rkz5mctd28crd6j5lpchs7',
                interfaceName: 'ur0s01znw6uir3z6xvo44e2oqaqpas1ye68zm4pi60p60ovbwo13408j8yd78ivnspupc32g1q7rj8sm80m912920rsqmqo099bin5ipyxs2bh9w1vb43z8utzza3fup3bs2h8dbbugk4aiwkneam3hmk0vyuxqo',
                interfaceNamespace: 'aibm733znfcig5jh477xy6luh4ji2o7b09rnxx0bqrckpbr7b3gn1sun2g2oiza56vgz8b0h5wpgtl5756z4an4nr42wr9lhweaja95doa7wbjn3jf71yo0sz7sv33oswo4ryf82gg09ci8p9qy4d80db6vf4lun',
                iflowName: '8pjtwx2qkcvxvgbfeg8ddfefuohurcsfkh9pn39yko8mur0dk2sfw4j78eb1aeml5z4v7jnegiy0lyqgs3i46ds3ak2is42mkddlcm3khpd2o4zqspehpbii0k8zz1ru47el4kwvfc7sg2wmb6yca3kd5fds54n4',
                responsibleUserAccount: '54dqr6s44gmsy0gewks3',
                lastChangeUserAccount: 'oouznh6v2yc2kdjnkm1j',
                lastChangedAt: '2020-08-03 15:09:03',
                folderPath: 'v6wrsyx4kl29hw5lbyifw5yabvm387lo61r684ibg3ci8alholjn8q2jajxwvxhoe4tjxuqt96jiebgp911e1l6hro6muf8c28g7r2335wv0cnd4xusza86tlmw0l8iv4i5tib5i8p1gzve7a156wra78r0sjc4hbtk5x2dk9dt1gcgm97fvrm70n10aheyts4h7vee8rbxvu4gsx6v55vhh4xy1xskjkwkqzhqyxlpu2rv31ju3kfau2ieys5j',
                description: 'wzpvny937i8hmt63dd220gxo6syviw55z6au3hff3oah48imznocsub1s1ivrnqay0tabpe7eov20af64p2o6gwqqj123yntsocdi17ixdcoiq67thpdeajw9i1j7dr92ulv56c2xv72q3ati8t704k0sl8x1x1ynxqcet17kxgb6gxyjs0c8x66kpr53ssc7bjg4u3qei8qgmhxlqd2ochoplhm2667myxh1f1fpn7ylfs471u19dh5hy42sbz',
                application: 'pyd6vgy53kgtfmymttbcbhm20bw9hf09k597blmla2ghhd0e6tv74mc8v0w6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: '0t7ueoo22onanexewrlud5q1udljnh73hq157t3j',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'z324mxdjjbfnzu2j2afzdvzbtf3jc83qp1pboqi3f0g3ko3wux',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '56k9vpgq315saf0eic4q',
                version: 'z46v08qn8tp4byrfd7ie',
                scenario: 'orckbfxh69ospraqueje3bofccbkq9i11shsr67f861q5t4rlxqwqumd3bzd',
                party: '8xeqpyr3z5i6t4874ehgmqni3rm39mvix1v9xm6k6cofiwl7auqj5kbo66196pdu92wuqog65i2icyvwklmbgx4lud75u54v22l9t360ky1ya1koypv5lctiq79nr71ug2wsry7x9xi6wm23pc7qohrc0vihashr',
                component: 'v8slnhbz34kfhkfmj4f8eb6op4yp5v85lyrbopqcjfuu9xp5fhpllofmurxs9m1h8e92ferjnlpg7pek26symna3t8mrqv0mvacxn54yd8edamj5u9vtqmn2gbgihe8uu0105hzt4acg3hsmltzlm32dhevifdqw',
                interfaceName: 'dclvxza13puct6ydixq2d25ey1me55zqkiykhi1x7peicwzo1okgijb4hclxgpgxoajccjmciyxfix266eh3x7uy44bpagd9ukwk7egeubyo3mruxvpn0fmsaa4m6ejgsxt2txz2pr9137ytj0by531g24wjextw',
                interfaceNamespace: '8tynl1nnpnku52k2bb5qpmzoixa5o0xaw52uwr7dffox4pa0tox0uchkau05sclylutg6073ti69jbjmc85ymhbzv2i6kyvlm0346gvioirhco4a6kulfwb8pxhyaoq0eqcaca4jg1r9lo8w1w0vy2rzqj9gvekp',
                iflowName: 'i0wk3nk3yynkwala84k98fitexwyvpu2r2wudi3m60oxuzr2g6itmf0rh9zvppjfapt7txtqg5jkuyikmcoamng1qb6694qt6zw67rkuvjc85m4x9kw9rl1nuimqc0yj839c2b3l3fiakc9u6f8dhn7gqy3s5nl4',
                responsibleUserAccount: 'w520teq1xcdfbnvr4lhk',
                lastChangeUserAccount: 'vu1k7kvp9mkga3jgbkk7',
                lastChangedAt: '2020-08-03 08:44:03',
                folderPath: 'rh2lvv8stbgjx4jtx702cmpitha14w53uteo58epbq96gln3b5ui8cb667th6tmx5zy53am2xbq2b9rcgu7dedrrbzvnlzlxnjpw9ij409ci85p43swtoe4b0wm9hh7o015viq3t3hnttp6o4o94qh8bo54bt7ibsq4tj9s199147sfbwaslww7d2wj3k1lroa61b677w29j9kxqzx70kcynw4d2n8hucw0knnpiejvkdq4grvx95w4v85vi5r1',
                description: 'q9halcvm4yzgo4l13u09hbml8x7xgy3e29xsch7pkhl5ypdkupbb1737vaz7aj2vbyylwo1a67zl5cl57g1h5r6sqpb6zfz3s45ke6mu6qbu1aadpx2hcjtb46ljtstiutmai59fdf5vivo2ei9keilyzpmx874tsnv8xftehb48wt13i7ldradojrw5qhcy5kc4bxi3xvfzpbphrrbqmjemh0v9ea7v3dpndmnmio8i6i5d2qdabej9y1kg4vw',
                application: '5sjbdypeyyy4tn6i93w3tjaexzapizxw45e8einoa87ky3x9y0xn47ov3fcj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'xm8ia7u9rwcf9kblfjnvyw386t3xpewcmhugv',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: '7c6dp8p0fvg1xjxhnvqy2omlhstnxhsmdbi52k31',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'l0i8zwrchxv3oub4rvt2xb7ajxlentcqbarr53tvlrm64loo6tg',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '8v55ascbf8kmy73hqgkq',
                version: 'jwrq8wvs4y30zm0mktcx',
                scenario: 'clhsb0e8nkwgyqwm289kmvua4695uu11schytfdqwwtwxmq8vr74zb3axe75',
                party: '3ed08vhx0t9bhelyfgw737e1cefnhru3ud8w6xcllumdmgqchca6n4cgcr0i2ftkcp4tz5whe9ld4j2o5khh0uhistjhb0ktxi86570bzo0m8x9o48m3ik7as08wxjwb2j8rvusympzsrebl399l8fgj0paob0wc',
                component: '8c04hmj916lvij3aaavzqxhztyqthxvbxis8mb4xrpkrfbpn68842nrlpk44bau8e5amma2nnshexx8bfd2efi9f1f2fj8ufuyt67dkcjo00nexfn45iztiqx9h8ta35u6pmd6z5u2odwxaxkpo5gkxpsp9be14g',
                interfaceName: 'u1ewbknqxugj8bu18z0ltuazinwde5cffmx9ua0ip8zr72tbllkifv6etc0ulgoyi9ri99ri1jixiab8zgn2dy103gw1tyy043jaxcnsc45x2uqmksft9sizeh2x94napmen5p83e8g2z8bcsyg8run742xybp49',
                interfaceNamespace: 'xyqxopxjw8m1u5mevd95oq5qmuznlobub5evts6yqvm52cnito1s38djizsxxvjigwuyag597kr5purjdftky4ah8hyg2wh72k2luhkq18licmtodbce5jibv1ff8r3349mtzfkex4s29kyjp93fb3cmypvkpdhc',
                iflowName: 'kt1zdrz2t4siws3myaeothhf6jasf3ygj6nqxqdvguscnb7f038sfiwqad6pvya2jd9wah609tw0d2kq0r2h9nojy8fzspmmy7yg7d6iudzyxfy6ntq7rw8ux2ap4i8g14ot1h4u9kk62xgvfle8hb68h3fdweko',
                responsibleUserAccount: 'rs5qqbhm2rbiyspf1enb',
                lastChangeUserAccount: 'c6r88fjo01sh3026p787',
                lastChangedAt: '2020-08-03 08:38:47',
                folderPath: 'h4b8d2vv637kzcovd5ndfczf510f7ttktu6e2ulww9jlh2d4837701e5itixps5luch8667ktqxca9fb7tbez9dyh1ajtz0rurh0timvapxyzynhj4vpruugg7dyz2jvi9kp5gui6rhwvgl78xqtjfifpimepluzohktvghm8epzaw7dlxa6loyaifd25y04e808pu3utbxwjyxpfkts535il9b5pxhp8a7ze1j3b1h52vh3llp0hlsgo3wy0ah',
                description: 'vgiw6gx0osjiqqop5aa4k7w03jxur20rlu6neyx0dhvb6x59k6n9ovp3zbmgdovsyfajqopmqpam6f12d1wesc47drvb4lyuk5ymysbw6rr3no2n1dr0zpe3ozoficdpvthhxh1n91yvwcqyjrgmzufml85cjpzcd8x9ir0uw3zskz2oowbtj5nvs4ktkpzmgcj8m60gyhu9goazav2rp2bohixytccyf7b9cdvutvh2bshztgzdwf2yiqrrr92',
                application: 'yk28w0n5bfvteqj4y3lz9vr8b2j6qmf8he9zadum8oynzcmw6re8pdustoog',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'vh96ayx5z6pv5hhj8z1r1m27ksf5a120x3qksl8a',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: '15njlpf8dckaj7o7gb7h7fe1gf1u0wqt6bctq3xk2ivsmquxdl',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'kb0l5hav54yrypnqm6qpb',
                version: '7o4r95w3e1agoq96q7u8',
                scenario: 'x0upws8gyj4v1iduqveznc82h38csruoqs3oxcazatrjwuznx63l703hrh9w',
                party: 'c3ws3m0dk39zd8k9v0ecxcvdq2q7ickmbt29fnlbflv5a6hvah9d8s36ru5l6xugkxfwyvui4wlu3pr83v14w7fmx43j739h5m97v2o7tb5lwba8266pjlt2k8b4tw96deqmn2pn4z8a39pnksn8ttdqst7aulzz',
                component: 'jf76h9frczri4ppw3z651s6apsv3ahbjeorse32qbtllfcmljubtv8spvfedej59j3op3kisi04qt4vqvd33czrmhdjtpac8itjk6e3zxmp4rl2hbxcdgb93co85v2mbrxbd5fspkftfz3yp09yfdoujcw8k11i5',
                interfaceName: '4phbp5z5c0srorwe6yig24qx14kduzl2g938r7auntkvyynly1ewt3g89jrdjkp4q0pt6u9aefvrr0lxwlff26b5dzot7mr5abz672ah1kag87mkprczvsjz4u69a3pv75eiso1ldso4i12ua0szhrwddw60fyj3',
                interfaceNamespace: 'rvbvjcu5fcjwu0chd0qm0e0kkfy0gygyddxo99hdhlxdhgdz4q7zdprx8wvvwjj1x5ygr0fs7ouf5et3guwz7njtbhb1pxhne0ynhvqqrak7s73pkinfqxik3l277zfpuor1a3uai755cc86wbs8h5u8z91rjw16',
                iflowName: 'kalhtsxzaihkmzcsrhavremi0hg4mvrhbjl6r6u2ire9zbjvg0spjssy0mamej8w57ca8885o1v8y6y7m71p6rjla1kyutr5jdfrizo5sr88isflhdn0rtgat4d9jv97i6md2bmibd4hc8ldvdugvbgntnwudf0k',
                responsibleUserAccount: 'wqhnhtev6bowh17r2qlc',
                lastChangeUserAccount: 'hrpaio0u9mbu9mkut7nq',
                lastChangedAt: '2020-08-03 06:41:22',
                folderPath: '9rweyiohxczf5lt7tpk1p7ggtakrpcsz7d51jv11r3vt43slodo1itfz04nxprl4nckwej7s58yl4ws7vzyfkan2dewo9s1510wwp7fj8kyxmthre6r5y1voc5kcxwoik1ysgkfusoz3cpcpwlwnh9u0tn1dnyuztdqcyffs6qlkjqivtnyam4qs741irxpnbqgxygfgqtk136o5b3i99sb8o10t1na1er9a1vbye7stjfn2y341e1axeutxpd5',
                description: 'xxfk8ouwkbkwvcrc896iqf9o11xyns0s4i9rca02bzgcryzxslnli58iot346y892a2x0scsqil1wo5ewf6cd9rw0xsdezsiwnsienlaxl7g910wm8lj3df14wr5nx94v0snv597jarqb7w5gephd5lammde2sho11jrnsyqyaxci5t8yfo4rx1m53r56bm8h5gwe2856fqyduoo4e503uwpqocwrh3ka3901l4hq9975botsefje2j7svjmvhu',
                application: '7mas9chyeyohotw9uhji9dwk8zgcphwglzp55eh6pavvl2oe4u39c04my3zh',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'op519yeg1d5hwwu9o9g4ndy175a10vqgz6aen8cp',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'm353fyebeuo0oxwp6sbfh0kcbfzf8oa0fv6s0jodbq2zu8a0if',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '5iqpkf7q0pz5rwuyc1mr',
                version: 'ltx8x391s1bcrl1dof2sj',
                scenario: 'o595msvvcwha5k0h1fk4c0i87u24unbbjdxo6l2qk9c34yker57nmg58hk16',
                party: 'kydf6ujcqlscm0z0uk0cb7km6aw7b13hnvrw5gmjueln6d4l0h0ce5r8ux2lvpov1e575837vwhrnsnzvafgewyxcvd39j03m0dhowhn7ftzjwmpuax0cb5ympwm6gjn7winj0ywkswtjme0kcj1fh75fs69oqbk',
                component: 't9bgmdygu0x0cbzq1cu0e7obskf86cjbc0qq4cv2j3xpw58tprmw81zgmg36ze4dli4dqo5vjrewyuy5hsgg8p6olchabou4foggogjbcqdxza31vh5l6ci02jc3z1ysznpwuomox3ule2ht57st1r7yutgsu3el',
                interfaceName: 'hq8ui98ci9ymej3xnj8krizfg8pb9iinf5k0pzipzqw77j8r9pkflxemdn97ddfzsahb4hi6p4zworb2qwydg8a470wb1aca6qe4yivg330cdjp1ans80d73lmj39ffc7n0t72txsbq6vru5ul6wxlckkzo6o7ig',
                interfaceNamespace: 'e7h3ors6qyx73i7xdcixu0dxswbpw8cv1k0ob6xe7rtp53dj7xn2u503f9jdsh1cxmrj4cuvmjv2uk5f8bp74t9n9doe7bwzie9otg8v1ng24dfz9a4dot4tldv2ljyqdj6zos9qy5pr5kd4idwizc07j33zyjn0',
                iflowName: 'b4zl3hotijrr1sskg9q7hm3uzrx7llgunrgl9j5qw7ws4e79u85z1mrhqy7cevcbxato1862bm7pqo53pyksiwfgooegx5zimx16ii7ihgtfdx29uy7g0rs8po2hof3tybq5u3ytwrwb6qma1txoocyxybozvzo7',
                responsibleUserAccount: '5shqjmtnfsvztfcbmpgt',
                lastChangeUserAccount: 'z2u4u20jb0qysy0dagn4',
                lastChangedAt: '2020-08-02 21:51:31',
                folderPath: 'ebpkzpxg9f73qxhh7hoor6ph5pds6037pk84pn32ow46uv0zt7vosk0mt8hhxla7iyqjyt3uszjvujct24p6j5yxt9r60ukdlv1c8dtv3wijdcewy3zm2eqk7jga6iegs9cg64cm5rgnolhmetbb75w0gwinf8kd41ho2xhb8po08fjw50e75liqt5xhp3dz5mr8x80hk983lpqvfcx5acqipofhfm6zmp7smhjuxi86wrr65f2ch1v2khvdnc2',
                description: 'ey66t6t5vctho09d41sgesnn2ftdi3t3m2ae6hxbyxeu801hbg6u6lhw7bwwga2a0g677si3l03t70i0bkxydwazf4lkyyqmjmpgo9dnpzqepcwzeulm1ttfmqrs5d1pudn3fzh63o88xigmpn04tbc4b8vwgu6o1rax8bpbo6jvu4ofrhp5swboy27cmmr7ffe00zqk167zhu48ihvd0krshsnsqe5xo70waiio7ck5b7fxaz689wdxmkftw4g',
                application: 'xp4v92hwyngd8ete3mwtja3tbnetkvmlaaneokxqafuah65893k88b150fwi',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'gpbcr5jgdwiqeeb67onze9fo3v5uuysfob6l8xx4',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'uxu3k1981ly1ejuos6dql0nrzwp1ni6pn77nppfqlpo5xq7u1g',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'c7a8jjvxgv0btb05j53f',
                version: 'oyct6yrfszpqnbrd7yo3',
                scenario: 'vx1cecn759s3fjexygf7uua8arauci1w6v0of7y1wvmp8jfx9q0rok7bm4i5w',
                party: 'oqxfare9pev174o89d2a97q8mor8vq0pe6z8g5tagdtjo43joue7svgddiuatieg03mskh78jc4h2spc2ks4w0ieb1fmtjv9orv0r8la2stx8ruklnlmkcib3cts5b96hz2yayz4o7eyfech9pxdsr91hhngz2ij',
                component: 'mzkwzdleh4fmwqt6h79ahef7ossfu8pqjavqkfmw1401l4eodej4q0ozxpvyis1dcxy6zvux2bbb0pfpijugh4kcsdb554xp44ewqg0n4daqe8v8omi6nwtg7882ct1asn3zkw0f6tewho1lad1joiju7uux70rp',
                interfaceName: '5nbaabg3ab0qh948l31encc7xkcwtsv91c0gx4c98hpmdd1ljh05tqopqd8f6a6jx8lyzyjeoxlypl9sfw2hkv1gmzhekvr8h0trw323n6syc6937eh82p7a8ujf4hwepijabb5apu5ds9tsb6mpayy5lqbkfv5z',
                interfaceNamespace: 'naucqt7o55bukuiymiyqsozfnlxg5umnum5n5t54cn131jyrgr382tt82zu5bfl2d4byml59dcw3ay9i1l6up1bznyix7yg1l2b6mplbxfzx999weckopx0tc4q5bkyiix1eult6gz5w75ihoaqmgxbodvjpgy65',
                iflowName: 'bjbja7ntggwnzgzueae2f6ntlnmicjkfa635wuqx6nd2l0n6osi7m8i5ese01i6qphzjmtvjl846zm1k8nd2vgt42x3ykmsqo65a7p7rwquhynx9r8dq1rurhhprg3bkey7ofmo99y1in8qm77np1hot7fwjbjab',
                responsibleUserAccount: 'u9lnc211nqj1ibgb0kbb',
                lastChangeUserAccount: '14ly7ccwjf8l89kgh4hy',
                lastChangedAt: '2020-08-03 13:54:14',
                folderPath: 'ct8kj6k9ai14r6ns8w9xtrjnhb3tv37ikbyyc20vz68co6iqqz26rwrg2gkrphspym6rhzc3ev01cuquhkaoy8tfjha47w48s5dmuqwl4jlk9f5b12tvag8bc8mcpne21wewrwctylggxxrswqenwx9cqxbamc1v62kq5olbvl84ktze37c4hk14zth9jm5jzxfn195tpfo2gzbb2vw74jzlncil43qo9h4tkrf26t6ibzmjzvn93aaci0zdy1r',
                description: 'xfegqc224aaeklex9oux12xwr1ezk5ln1p598lv5gsz1se4pdb2tda3d0qukxc1ncw3j52gd4947pu71srvbnfz6ccspaxq88vfdmwf7ys22i7zd8smklg7ehpyhqbumibqn862x6qklllbhgtciahjjx4w6p0pqm59vocdpdy93blmgxdn3rkrtpo89hkxvdgyelyoqff6whansghhwdo9gzuul96emld0qnkkj5j2pky00u7opfw00pxfegqb',
                application: '7qsvvfvrtkhz56ozbp8vkqe8ckx81cgfpudtur2aie9dfq8tsml3rbylwo46',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'thj0eskwsuydbskro6s4a74rdh2ruk2phrtvnu0j',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'h2mft4zuxigrhy7yo7fcb9pbyq4ne1ocss7y4g5fqq2o0t91ka',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '8sjm1t3v9662g5263b8l',
                version: '83its9scchp6nk2d8kh6',
                scenario: '9pn8l5orycyddqv3mocq53eo59fwpmtv7vbkj2v07ovei3db80zw6l2g1693',
                party: 'gebf9u3dlsusa68qvaw00wnjnlylqt9loo2pp1jbbqoqelwmeqm1gna44xde4j3jg7llyulrqn0s5be2cpik2d4eddbjtbfnqayroqi9vcnu09u4lxqat4bzcr9c6k6axhq4kioi15wjbzjsuhvae4cmuhngj4d05',
                component: 'zfjxuosxyr115j79c5c25eff9xqu91sb0pt3v87q7561a31wzyyvyq2lakkauan0zlloatvpirs7p8h5a3od6oq2pp2wvwxp123d5u5b4hvs9gop1xjvjq0j0snzks22ag112wol6cqsayu6cv4cojyhv8xtp59t',
                interfaceName: 'z139117x9rg5t1z2j7bfp6uioqd400pvmiq287ouo9aqtc1z3g8p63zgt1id7qmuc7pr4esslghm27nstc841rruyp4vn23ppz46xt3cigkjfnzctqcq8j3b5s1z2f3abpc9p5dx3llakvto3nve4e8uc148z9e5',
                interfaceNamespace: '0ikj256zloc96ngnlcqah30s389oimin8i4w138kbe0xvw831zse9wx9twc9xy7awxmyqgjuwezf76oek4qtqbz92u9a949qk4mw1q2mc3d4jzv4rfgrijtv3y6drjr4bclfit4uebpoxu2pu88oyimm4rpn2mzm',
                iflowName: 'g161ljh87os19fu6zbykn2progff9ek4f2e9frwdg67h0dto83ehpc2bshax0rpdrwhpeewmofw9bphc2pn1ivwyrirv3v14nxph1i8s8oywxaxqw9ilwrzg7xk3n4kwzw2htsidlvr7v8cw6xa7th6ehnisjdb1',
                responsibleUserAccount: 'c1vmtic999jbmdfez0gi',
                lastChangeUserAccount: 'x8haemikky6hdmgyxwl3',
                lastChangedAt: '2020-08-02 23:19:13',
                folderPath: '5t1m3hiuq6z7w7n9q6phehxfnijg8li99m16jlusgtfwgn591ke9s922a0mc4w0c6lkxuadn4pe2nysasiynmq2tghack3fp64h7ql8gmfzgmra4i73j5stqjdf40bsll8ajh37e90t4iwwfo4kis1suzo324b4qcgnkunsclgv1ojlhiovqbaiymiygr7fxswukpcghpeslmy9qyyjj5qx1yhtjog41kvbfs574d7pljwudstr68xwg77uxjvl',
                description: 'eo6gpgdcw9yol6bks17fu4rmfbuxuflr25laqepsvsjbs9ga8h9m59nu7l489emu03oegiyyay893493dryl1kd18paw1qifv6to6lak1hm0f6qh9nkf5a3x9h66xj3malvdmoirl40hye6pjkvb2th3me8k72gyxfalryteyebftq962wwgf7npz3p9at2zcueu7hwc4ylpx48fmnmm4certatec2gdqij9dsl5p1pfzvuz21mtplethdpqcb7',
                application: 'rpmtff16xq55o9wq5w67a058y5kdyvo7yx0qqavofcvrxa0ncgth7o6blzua',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'b29x1rfq7sknskc4sar94uqwxf6o8qieb6p2si6v',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'cxqelbu5h0y9xhxc04pv09pki34gbe9dsuzuxikwjljlojppek',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '9okujev2vbcjr5ewg4oy',
                version: '0ooe803m6ocwcpzduf21',
                scenario: 'klofrwlzh9e6at2ckckjvo6de58ovx5bfk57lys6hoxnsnlhgk3o2n8yhab9',
                party: 'gt1fqt9y1k36k3fnuqwlll4wytdtkjqwqkts8a6pxc3j6v4vdelgbonb7vn6srd19qcnpcqsenussneiwzpyhwuqoiycj9psg4gxe4k4i5puyjj7c1419t9rmkr2cbzt9zuzgncp1b6khagpjhpwjpttlicutihj',
                component: 'xogsu7etmlrmby7cqe0flpsmu3f96afzd3b4a6z6yc4z3zki8cjxk3jh0cljl3sa6rx1rpir632fqzzn44ypnne7axmwgiavxysfv4b09mhsusyb0hn96pamcgvaorggfiun2i4xpf2tra03wi1ur11kbx161xpp7',
                interfaceName: 'vg2x3ujmsy3ajeczohfkfscskf9zowo0lh1hclzvlc904ev299q257fkhwrqn409ufmltusz8ze1w76nup94jkolcad0r5xfmx0sdt615vun6jjxth0xcgoiez1cqjq6xkp5io6kw1nux1a0iemxqhtq9i152964',
                interfaceNamespace: 'zwvihooe800hifa4t7ftg54lyw9vy3j9252ps9tzipm6fm6cr8d59twt2eiro8kdl3qbbkwp7p9rqde7t2i3f416zqn0cnt8vr85muyov9brh374rdv8feedoupsfab2zvl6veh7a4xjy5k28d58lq7312phm5t2',
                iflowName: '85sf7mi6qgd4k0onctigxdibvqxzvvqkoy2iw6on2gp9ky1ivlogwcxq2strqubxayr5diabcs0851foveziy7vlncfwm8gs6kzmcurfylnz93d0i0smikiqxk8jenxwwb5g8lsettsco4yx5kwcltz53kt7z7v1',
                responsibleUserAccount: 'pl0pus6t0s9crtoxyx22',
                lastChangeUserAccount: 'amk6174e61xiwu0u5rm3',
                lastChangedAt: '2020-08-03 05:51:37',
                folderPath: 'wgvoawljgjm5qatz4yl93y7vjvg2t0grbsihq08in0ytzekyixlkz0af3opst87yd4nwz6ni0lvbscmlflim62l2gt2uhbadnh114y5ox05b2iggv4oxluy0kgms2xe2kdlg45zgtrjzmepuqht38u5juiuseze94g59dvx21nwzkfgr5fqtyakiewyak0hc2iv4h0f61943nlwd1rtioimfb139j15s73fripx5kcgsaf99lzbq1kbhii0flbd',
                description: '4js0szmxur993uj14gs6qbhrnid2uvvdjssegvf49q3mycy0qw66dstw8ia8je06nytlgsr6q7jw6sxyixojoj5castaxpev5nqwl48fezlgw280qvxu1e4t76o0u00jj5rayfygseb7yya28sxzuz3so9z2afp3347t77l4ey1bfhl8ty3b5x35pheb0lc9hzxnykmyjdd7dako3x6t53qw6744kd9wkg4q6a06n3pcekgcwb31xyodjdz30a0',
                application: 'kba8753i606alqhfosky2lgsbkgi00a9fe01q8ixkmc5w5h5taqj8x83hr3i',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: '5egtiu9sgawrhmdcx6h0nhy5b9xrp5kqv31x774x',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'fe0f0aoi9gbb0m6jd9hr3bqro740hbjpxtfld0sb5bszn0h13x',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'ymz1f4o3yldy9ryictbs',
                version: 'uuur3i4gddrxu3epn1g6',
                scenario: 'dtyse4ijvk0jhqhavtsbfsyfto8wzkuzujmp4o1nd54qbf4hj42clc40ui52',
                party: '1ekhrm3fvbz11goyp41vftfi2bi1bjvptclurs5wgc97gluucyo9u4069pa71mldgoershnyyyluen1bvtp1m2zcf7dphufy5o2hsuvfjwccnsfj6pb9ecidw3c728wn68svblo9yx7w01fx50rkmiyf4t0p2c15',
                component: 'rl8rcb8hplfiofuw3vv5zy3cukx2zjwub37i12e4vl5dwn97ih03kl9542v1lqpdrn77rlpgw9rq3eerz6tlges1wef7aa5o4i1t695lahm8m4kwji8sqaspjnxochct4mw8kk578ru62a8e7mw3dg8q98i4cug2',
                interfaceName: 'm5wv51ehplzmsm29to5avqhlw363b9uqzszuqnemnbekf5k3rinehqlhl33c9qupyq0n4hblojcqv0ydrjz62c0i1zwwdfulgxw976wdmbkmvf9yxe8aku31mzk43pr2y0xyd9r42r4tm5kh55br7senuabdk42c0',
                interfaceNamespace: 'd3z2a9r6jwyl5ut2qrpcgmiafv1vvzcejpyg3653y1rv0m48glr16chlir8vndsdyupr53gd6g2vks4j5ob5t9elakcnd8wclnw6koihp0xcs3ialahi68qgxnvax6dglei0xzwib8yvlxg8ilzd5s2b8fuhn9pt',
                iflowName: 'gp4qjrh8bw5dbzye8he99t7lvx2i6fp8kg4lm3ihap9bb5zxoklg8vrnxw3h32sz40ig6vm21r0t2cixfezds0d82wl35x813drpj41qgf6zg49hqt3binyainfyyjcbq9ydp8zg80nbnh7s336t9nfowpswzkqi',
                responsibleUserAccount: '75wlkwl49gwuelah7r9e',
                lastChangeUserAccount: 'ru3e0koxzarxloky44yu',
                lastChangedAt: '2020-08-02 20:46:17',
                folderPath: '5mdwtzi4z0h73w0pntfu3gufu7m6rf3nm71x968nxtmr8mdhvlcnuy1cuwup0qk8lzzsh7xxckjmqfo3y8z82kcws5vpfz1r6aki4nj03iftccd0pxeygeao2po3syytv8rw3tdr4t9iwg5sa80rq2ljsj8f8xkgczi3kcyvg9zhnuj48ucvyqsw9jott04nm72spevn9s2oxcest05atk1ec24c2t6kvxrhal5sa6s7a808zxbum2qqr6ca81f',
                description: 'ey64jjbg8v0c3fcmp6yjcznabyjg5wclus4274vgmrdwy5ghz2o3cz0oi36joxyix3ke0tr5hi93rrlry07656mdfw0p9l1lfb9bzm895qt2285gij04sbtldxtmbd3ngaw5dz25lyslcavuev1wzolucm1do5mvtwd3de6aeejeaejlee7obr5tp6sp6xn3gta61pro204xsh3ia6eibj4h9aqc9vs70twve1dr5aiisr4pm3bb3doobk9sruq',
                application: 'tdmn605nq7k8wpefjkfgztsz02yfsxeebx78fanhovfjpcrxqvp4mm7g603c',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'erzd94wrb0at7ldi1nlqro5xtyi6aza71msrw804',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: '6y51hbabd0ht68v0nu7m7anzk5msop8twp9n7lgm8lxhyc91jx',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '7gvvqga3x7jyl3k3oghk',
                version: '49sfqjulh9gi0bs7fhm3',
                scenario: 's6l59zrkjmy3n6ik7xouhttl6jgxv160ck3qhoq7w3hy2dx54w3swj2b0c35',
                party: '6pjaogkkf92y3s34nz33snk7asgvzq1s7sr4kbymqak9pnxasaz88t7lfr0hp4gzp6d5uhwzscuhgs0s1d19rt3gpmyar8iu67lgj67i75u34o6mqy8wp5w07s9t2kpfdwtdc61u4zj1jx12e8ze56ccy7ozkzjf',
                component: 'mm6x1sj661pjo0z0ryllifvu38ki51i4a5rhj82hmjg82c051dlsq8i633026b9nwsnykkb0zevldzpqcyzaxjvmchyrdkxtiqduxlzcr5j67bt2fedkdet7pz99r6633b31s8v3ycsr5j1bjhi3ji5drsl6r19c',
                interfaceName: 'o68g8f92ybntbt9ozw56sop7lxycb0aj1v6zhnwwowgqdxx95689a7pyc908pi4idk0l49lg7t256rxdtzbzhod1zfdatmkopzinacf49ad1w9zxqbwcz7qx07slwi56u3dg47d6ykiny8cytbexp4rbid0gwxm8',
                interfaceNamespace: '1x2f2hy1totffhhi5aheojos2cp2y2cns6eakfuckis7d9kj7q3z3lurcg8yxytrkv7nolfbrcky8dknf06s9xh81uznyqp5pyxd9v26vqt0pwusp5l49gx6qldec7bxo9njc8lotsa1etlswpfhxm4xk4rwbsuiu',
                iflowName: '99a5ftckcr658aeg655b01vhlq1cvrl6ctf3e3cza9sdvqpaf8zxuyg3v8hqepq9vp5lpnsrvp34jpm97a9r134kneoy2m9dbwbbnncfamcsfiya8b4n7n6d3m48zoq4afsf5daudigg04ee7xl3xztef59y2xbc',
                responsibleUserAccount: 'klib8m9ouhw9pqek3d3t',
                lastChangeUserAccount: 'kwboj0yae9dhvrzrk7dl',
                lastChangedAt: '2020-08-02 20:48:57',
                folderPath: 'nqgxqxa8hxq88e87djygc2cfs5a5chc19vj4s1kcgf55qs6drcl5apl3k3jm84oe5felt95wde9bdvkbl292kazd5u0vxsjzmmiftc31k7gkuzp11axloc45uonw23ejik8utywgtsawydeiydm026t07unx4h38ycyh3vv9volw0o4r7e50qdewsk4y49czrtylqxl1d4rx5oue0qbo5byir1x5js236c07qn0co2tsq2pca5xk0g0vzo4cz59',
                description: 'rajax6ojpfpfxevcf30zvmye8ezuioktwdrzol69nhbqxbobuh8a8nsz8vef7yrdn2lbdx1x2hr5f8weklo2oehsub4y8yifkhu3qryjntbx4tv9re80obana4m4nsz2qarfi0g1sla0f9ntnp09wj70dl2zq6grqys5164kxev1bdaody8sh4gs5kmahrbcga34qjwzwt70v5hs7uaoetbr62t676hpuw0y0ra7ol5w8qp9odhurj09fw2t918',
                application: 'sned13z90yyov0spb7foexsmj8nudrw26mqpbbrinz6muqlz7u6r0l8xblar',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'ojeysj9p2xrfhskbv56gda2c01bdm7z03o8s93wa',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'hj53in6n1umm1xml9ncba56u8ht0k0ee1rnrxk2qfsyieetfah',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'tcjnnsdlwnzf384iwabt',
                version: 'h22gp2faem9ve2bxhinq',
                scenario: 'oy6e00vhvp5yhnl4ci3pzwi683vz1otggqxaocc8qeim2781a5yy8i2uy4ht',
                party: '1f5av8akqmibyrj6tcx0aag8x0rmvuzbz1wrfhjl8gnnpw1se0pttqohdqt0ja5f4a9hvqyhn9legs07wz1dy7odnwlng8jirwxujxoj7ctzthblqxwb6xbimgm8m00dmlle2a5g05ezo7rbh06fw2yxsl7ipxpy',
                component: 'aoq34d88djocpfskn6f2bm385rszx7kx34nrzmxyp5j569a88hp0p18xiljl6jwr8756u8e0e0a0r9lc3rm7xdcq0el0tgt6ymask04ety8frvvgll8c2g6hx50i02f6tt1falpdolro6z71q1e8t4so08ki6luc',
                interfaceName: '93zx61gvkmy6v11jpnejrqnt33659uu6dc66iszsziexbvxz5xd0xnrjhtxdzgnxkdlljjqhzdu3qbf6zxnkpsav6x5j1dihcy6jknvjn547m71d4b38ihtye2eoq8wpk3y86d37zofiktr5xqfvdnlurf0515fl',
                interfaceNamespace: 'h107fm3thacixs1t3aqifbnm36n772di1x6688i7uyzol27aj0ay0ralloxoqvipncvmni7v826r0aa9szgopwvipzvl0nblz66wqgzizsh11xs6ymyirjt4hmrc5hupheayn0kpu2rqc6o0tnyn1mc9e7hn2uea',
                iflowName: '5f0ie3y901e56uv11ycx6ilchct01zai2tjj3wegapjao3vod2vuorkll5d5lyl8q8u53xloyxr7d375q0gg208t7tyfjyfcpepuf7u4hsqml4r6b5xcejo51tv1t9f8wu0p65vu4ehij5bxa45cxuu0wd3zjvyn8',
                responsibleUserAccount: 'q6uhj4j6w1ifen2izh9t',
                lastChangeUserAccount: '4y1f8dc3iousmlwj1jgu',
                lastChangedAt: '2020-08-03 14:36:22',
                folderPath: 'z1wyq52c7nrdis2c3074hfofbrh40g1gladhotppos8cjac08zk5r6ra30cldcwjo21nbcx630xj17nwxyg5y6b7wvr8d2g70hnoazleuyedhs35ok4f8bxz2opsxo7wr8cya52uwikwt83azrkoldhziyzduuwzxcax8rx2j09g0p0vnhkweswhwgtlvrwy7eqb8a9sc1x46g2rknjcgd8e3j9qp6058tl9w5qjmsdatiry67fl4x3mlv4p6vx',
                description: '3u5unm8yrpyb4dodoyzb33af3lcbr4e2qrq8yk4efsey4d6pl6gsnzunnhd2j6f9t7v8016nx5klyizw87xcsbvaqr27gvuqe8xe6ltsdzcx7z6kdbiqfnupvovioa6sw9bzazmim6avzojn4088x30r073zwl0ekurtkt36fymgeqquqy9wj1lb88dv71wntzq2hy1ktfcxr4nqoava0ughxaosqkkra80e2rzzryuw9f9lyz7ftwk8pj8hdms',
                application: 'xh6uqn7zze1imp0knktucen7xyr80mmvtcp3w2dxpjihgva8ek0y6vvietgh',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'b2xk5z016y8w4q0zks4zrmc4s4596f9djp22oru7',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: '2t11scehyqghm30xuviqquq50rgdvn7lxe1ha09muvlzc3p23i',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'hm81a5m63n7ohppj2hb4',
                version: 'o30l0f9385fruec94tyb',
                scenario: 'wt3i5671qntksg0xix1f41xzhfib522tt3mwh4wk52f2hnww1t96x6u6taul',
                party: 'obkrgtc4tzyxcx5qlhvci6otd1qxgmekj2t8vugvaqn82qspgry6qk1div8fod9dwywwmg3dv2xal9jjt79jo36wsp1k4mshv5f1f7b90h2g2mnbznp51yvpbioracyswmbomwlb6h0z2ilzk4caz8zbxvbj8ygx',
                component: 'rqtugs2xxp8g6k6joxegnh41g6hiw22ed1uutlqa3t0wp76kp2pobvzl1axu8dv61wk0pzwvasbihrkgofuaaexdfgnnwp9xbnx5bnktdq6723z58tb9tkq8yksz22cs57eaz7043nmd2dwd6lzbp5c666f6udi3',
                interfaceName: '0oirn4yu2u3i45vxpjju9k42f59ql7404n7okckmh34ywx6hawxcaw0kz221nl0rnadlxga43ublrs49c6ou1bqa5cxd00qzxda7jglg1bd5kx32uey2f7m0ngfindz87zh7tgwviowxflhn4lb79m3xhdoysl0g',
                interfaceNamespace: 'g5ojsanix7y662k928xcakpklbxwq1tdvdllimjootqrzrr1jud9imkmd0ac4m07qe97lemyywc7m9t8qnjlh7risn1vjbookj0lrob55sciwyejxraa3u32ez6rzz3e12fvanuzijsb3oggsgql6mhxikadgz60',
                iflowName: '5sjgc0vz8a08etlyioftxgs1s19oc785wk7fhjczn4lqazxcg0bso9cw0h0f3t4t9raiwgqhwlrk4g04kbb1fgui50z1dvxbpbagrzdn56c8zsawbo92rpseir15kijjxr6yem076weobcywbn04rwcqzch0pa94',
                responsibleUserAccount: 'kova4jivbb0kepwqcf9fo',
                lastChangeUserAccount: 'f1rojag47phd058jpwbq',
                lastChangedAt: '2020-08-03 15:06:10',
                folderPath: '0lfrcmmpwbh90mfhn6dkvqold734hwfy99cl1gt5va2uagf7sxva3yy9vmvwu0qca0i5wgmpajjc9hrzfsg8jxfugz21h6zzutarh2b4gnpeu2j0niug4u9ohy2png5bpuahehhf9hgpfj7zmecheuik0ajtwqck43wqw1r4jo3orxy4r0hl2fksl1zs0ejoowuumwx1dw63xz1xsrg8qj2kmril7lrx9bcuvu279us4hy1tluedi70sk9r3m98',
                description: 'mgk2kw8jzw15nuqonlbuns7rnydeu9844ks5zjdxrr7aahuk0gvodbiarw5m0qd1e0g8jowc1mxxlghdinc3frab9h3q6gc2jahs2uljpw09u83m8ajgtag71cme8ilouysimr7as8gvl34erjxih3uwegc4m00bxskir41rnmrbvzovtw0he1nf47w36uuiuon853vqirfsst35c5w7vv4jzx0ktx9z84z68mdpy06q921gwb3unorjyj1glwb',
                application: 'sqmpnyh83orhm8phn38fbjjrt2gfrbaez1sqllcg8ix7pwtg5hhsbja487v4',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: '89tor033w0ehh181nfb1vc9i1wr71f57ag46gzja',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: '18cpqpo1m3eljh53xwijxr0q320p2qk6wcf9ct4nnd0ej37mdy',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '1il8ggypugvrl6lyslvb',
                version: 'y5hv5uu6ay402k7y5zie',
                scenario: 'a4rpre98phr5zw1fnibd3rjaf0ami2y6ouq55ezb5udpo2rtgt2q9mk2sgpi',
                party: 'wr3uez8gka4n8s5utwzb688rwe40r8ed6zhvg4lei830z6mc5699bfl0025llsm143djvijwg1f0r265s374jzykjx851k2ma49v33guxupc9mf811p5zpmzmvwufpr6fa1vgzfsasrft9a5vzmxsv1571kopkdu',
                component: '5gbv4g90kr761zdl63eievpr099pcz9qhotudjkfsulxacbjmcnrlcn2yyv054itvrcnxtm6n9jl8yzuuqc9f09plgxuckv378903gfvo1c1adix44sfvz2u86sa44p92jfm0l7v7mm6bxf6ui6pjglgzoirekni',
                interfaceName: 'umswd4095b1ciccbkyefxrsgva1l5grekv479kixtls8nfhkrzz1i5h5zhv7v3d7omau5mg5h74ig4tnde3io154axf9bjd6hom3q0wsg6am40nob2t5albgry5u01bty5iwzk5ai9pr5bw4w29eudfbu3xizkku',
                interfaceNamespace: '2npaf2d7nyegf72bfmo7oos38ljrlz5slcqt9tjga2bvojbuhpd01w0e8z2ah77emrehc1s6ia2weimq72um5ltosadl5wskvkzk1fim3z4fkwskx4sk6ez6h0m0qc92d8qo59tcwz821vm0tgsyb5iapq0bmxq2',
                iflowName: 'vot3kqaojc357gst4jig1skjodibxqv8qapgv5g9csv1y1a2vzphn0oawmu3ldcrrwk1urb84e886zcx3eawmsp3b6xm9wep8rtqju77svq9o8knib9ngcwu7sn78c6efbe8ybs6xq5zlgt87qbur8l88b7j8k5v',
                responsibleUserAccount: 'p3g1r0ea2a75ow9dvj9p',
                lastChangeUserAccount: 'owh4q8nlh86bai3bprq5l',
                lastChangedAt: '2020-08-03 11:58:00',
                folderPath: '5af03u6vyzwraeg8rkc6uqx9hep3voz6hzho61b7vq7badwsynfhxhg7cvh99zafbkc8oso464rj49kicpsm6iodhemlwxagf9tlsfb40gs51va7nfoha0qw6c9hpq2gv8ylpe8xdb9qk14u7nhpw7l6pq3uae32wju2y2m281mly2z5hm2ia0sflfkzbcdh20rcokz6amnlcjybrui6ujnna8g4k91hgvcmin6wg7n3eju6gabcjrgf3sr3wa6',
                description: 'xu07sof14m4q0forigywdjcr61phgvw2ov41mjptrvzjgoq3dehufjsfj8gzfbdt57ru9er4a66q6csxh5uc3indqnbc0hzp3uc2ryfvnojxkygd6d0mq43aimlspiqcm0t0i5oza69qyezexxva4mkqslmpbxtoe100jj370cchzgparubstg4u8dr3ujdi5azl496yzkp4js20nx64a644yvlk7hsn8hvgev6k9g19q5wdslcle2a3reo28gg',
                application: 'ov4z71bg4lkqp9i3tekap1gh34jp47qnxqd3ojgd68zpxdpcg68dgsd4xq14',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: '0o0amplxabqbedo2dnh6oj9fmt80b2nfgt6jlz01',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'ts6uu0obdv0y3jzabksezkxrm4kw8fk3obbmq5mrir40xy7ha2',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'm6mvigl4faz2xy2xyrch',
                version: 'nh48ofa7co7gkc46umbr',
                scenario: 'g8pn82q5dntz3o8kz6ytce79fvq7n41hqrxu03f4z005kfxuaivdim67v5hl',
                party: 'ca19b6jnmrr30c3idsewnf39orj7k2l0b2j2w5yvf7la81jzrnqzju9qsvuv5m8lpqu6wr23ouk0w1i5eke0lwr1vvyuqu6lpw8d9axsiqjk3o1gm2h3na2kogcxnikq5da0yujha34o5w8xe326z8kkqc6bdi4f',
                component: 'xe6uzzb813d9kkco1p4ijtjg0wbkajwpgko85o9qvpxehqhatg2oq4hq0g2zld394xcfpdj2mo2g520mum2az2ycwo7w2sisbsni2ig0addoimuzmnaxrhn5x3hdkx52bdda5r83wgn2gdf53ml34nxwjwovwqf8',
                interfaceName: 'o4c5f9g7lagi5se2cffyyqdfr8j0wzj7grq5us6v8dw20k3aa0iwy0mmv3zz1uqv60az5i4heup2nfzv053ej6z35l5v7wypx4agbvthco85cf6k9qrkdvm6ln3ar6bfdp5wl4mnw2puaq52dd2png9k9ta6o2pf',
                interfaceNamespace: 'hzf5ir9rwfaujrczwyhe9t0p291ip0p0fjrwtfjj7bzvjw9nykchozkgsilszw0vucwqwdesughqe02zzxpi0eayfc3ki0fy3bruiqdq9ucu1gnp0qt81h70ws40xzgecj0ndmd0mfvgihwsuxydr2gtxpnd8mwg',
                iflowName: 'xx1hn7purllnrb3lm94tnejz9se52f847w4pfaju3xfdwn8c6qdr90dcvklwfkqbqvx4ppwgwecyw05m708mm9u686byzm9trazdafp5makq8pnrruq84uccywslynzpnorrvofrfrf2jt4f655v3ypnthu4e56b',
                responsibleUserAccount: 'x89pgx2ipkycdzy8mf32',
                lastChangeUserAccount: 'usccheojv8z0b2s6zmnf',
                lastChangedAt: '2020-08-03 18:15:50',
                folderPath: 'gpzfyfo3iq72m9p888r2b2mcma77lds1yuuaxxoov2ke840cc93yvb9ekjwqnywxkviwjuqzd1uaw0risjcjnl38fmyfxflfq4lnw5ybyzw1ykjc1smaamci2g4fdukaqo8u2ccivijgeshtzwddw856kfy3tj2k7qq2ddtf8mj615ng1faxjgjuku72zyzmnqzv3ck9lox07fajhwrb3d7rsekve6v70cg9su05kxzhgelwd0ncvr9sazyl6jwq',
                description: 'n3c1bb3ri4r31uqsdeq5f7qnq3fp0h81ndr9oa260e42lridq8uvnatwixo3s28pb3ba7smx0ch7sbmr1ukkx2d8bl5zpaqkt5bypqo2aknpyqdfwg5vm9wmfbdepoawi5lqauefadfkei8wtziad9dm1ucjyarl23vt0u97ov742rnvxmzc8kxxfucf0dv7g5tvnvx0cof3tnvz8vu6eau6er2mu56go77aokki22exlbjak78bw90dw0gryh6',
                application: 'kthn7akk50igh4dyjqz1ya9ukxmslhqpwhvcumgs9slb6j2tstvbqwkc8e5i',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'dhrgvwhq9xiall2bmp33jsf653wimzcc23i5230k',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: '99c6s21fm5vv3l7mm0acufz1ey1304p4lsl67qgi1luqwjjkjy',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'smxsjk38sv9vlhhbmq59',
                version: 'sugq256p068fj1qaljii',
                scenario: 'xok6gyfxelp77spd94ecigetuhej8b78l116etcx60twsbg7zchiozwhcnnu',
                party: 'kprvt1x278lzczmeyz2rrsalljonmmj6gdg5qimj7ne4nej6hj70wav6sckhh71af5uysupdjm3217d9ha8c8f69bu7uj0aqtde69p63udsoyi6r3lzc874glhrn3qcsups95whxlysymir6qciw1liauifrtcql',
                component: 'xhiljysurmoxp0w0he5zq1di5tgmavmq5usrsyyevonrrilrlppma59ihm1i9koc75psotwt79izbhae77bybl66q3478q4gj6irfagitc3jcup0kb0qqzv4008udgbcuyfvwq7r7imvdi39e3tna39apw881cae',
                interfaceName: 'qbwtoidiftm2wqqkedvfwn4m2uozhi5i9i7h0i0l5qqasl2gqvqbl58abqnpfygdgmoey9dfyve7ct5bfkx98b3bw61pjr8ur10g2c3j0y9qwba5vk3msiwd1l0tyg2cdvksir4irlu499krhd85rp7gm1jkrduk',
                interfaceNamespace: '8olje0jzwbqeu1aiqj2fbn9ek2ptvgopc5ojgk3rjkmirqfqucs6n5yz24vpi90wbps188tzbvv46n1xsiynax2w0613mymbsthu62q8j52l7fxsxo0ohhbh8bof2fsu4z4bki0j14li87kwnxgcdo5fkzc7fgc2',
                iflowName: 'to9hk3eexhr8y912d313bs3gyzg9dabh490j94uu820m8ynhp2mjfw1up43hrsibpdxy3lxgic0366ftp5inzsw6hmzmd0qdkbbeyjwab1jfciw9esdj4d2j6vswf4khbv25b79afz8wpkpa2t4wqkto7ljnjzz1',
                responsibleUserAccount: '8dhw5p2wl17ooo42dydz',
                lastChangeUserAccount: 'i1mirx8ucqwdfyu7bcfb',
                lastChangedAt: '2020-08-03 04:54:03',
                folderPath: 'b5i9r78qraiq7pa3lt05v0pl7pxdvikx727rzuuhcm4xuwa18su05z7c6rvodm4whhj99vlfox86vzbaxpm6jma88ockg6g4xsfj357lljbog0m3wpuw1rjtc698lrvyoje9gfl49e52ac7ds5mw27casr3nrayrtcxj5twtffoem6c9uin5uk0iesi31za0rk98xsj9vej47vqwfw4headfljaoy5dcwvr8x7s48cabjeubb6c35fr1g1q3q4p',
                description: 'k677dc7njse0cti5kextb0hoichlxsxkxi9todcfji0pyl9jec3okq9ccuhp8y65as3c05ay6kojgck8nvgy877mgkuaewzl4983q3bmikgzqwqjyc1jz7jkuc424cm0vmd0r3osg5g4gvo9q9qfyj4b5oyhd08v3pj8hrflmeipb26opnwpshterzr1awq6xjkv89c1rvsmk77qpe6afbz8ih4wh5zggt4hlq75erae67py5toqvnnovceavrhr',
                application: 'yb5409joqc1sqqljv0fv9du352ni3k2x3nj5zt5veeallvzvwr23n9ax2d41',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'zuk1h6rpz9r4r6yvz3ksoa9m9pyppiojq6m9vzj7',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'v3a94emrtns1xctkhchooktt06taitjzku2slrx7btnek5jlt1',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '9hsgcj013vgr8d0bfd03',
                version: 'zfsin9kicf9d3j3p741a',
                scenario: 'trd0t3tpjeiwi7fbd1dypr3n6n6g3nv9uqtzixhu6u5bvp0yo9bw2j6hx9dh',
                party: 'z371353na54eqhnq36u9d8mf45cbnqkmtpjs1csqxzagcba4styg4h56l7k7ajeuecvvtfyrxkye28u7pfmye9upt2r2q9p7ul21utgrf98md8ngg5qcn4vaomcl1xqoj8kpey2r8j2mma5uuqrsfb9ajl2hrixs',
                component: '01famju7dh9fm97dgu5nqjiaa9ijzkxoyy7xpycp21xxwe07lvstx43c88j6gyrnm9vxzgzfc02jazu77phlgrj56t15m39nf3ip2aw6brn4ui6zrr8uau1e4pzlh99g1p17ooggsiovvwp2ezyw37t8epyi722o',
                interfaceName: 'xwhqzt5014lpbuuvxhsad8ztu6ud8j6yyw5bjwck4xdhqwu29ryocvchg9yy3rd3l4yzvfi1513dc20n3ie2m796jjumjtr45yqkwxnq2hslzshwwg6izfyscnxdd3pj11f0wppj8jfe0luif2t2vaadhur2ivfa',
                interfaceNamespace: 'n19i5g8t9f4m0ejq5xgsz9cv6vie6fmyay71ekgu7kty9o5i20grmeijq37o7azah38vi6b2wl7etkrt19df9vbml9fqiobayp3ke4r2u1aj9wk07cfuogyhojwmbuxo5pzw4iqrmv9iksjplwxgew6d6a23dnrh',
                iflowName: 'xdnkngcd3vx61nsjxptadanhih1lerx3ocdf9w62pfs9wc1jzt7re6z6fbud11n7lr4s2u1q8byvu36u8wzeydqbmhubt3vvwh622ekt9nako06k7tetiymtn8arh7zr0e7qhh4y3pcy6gtdvtgre7ovglqoumoh',
                responsibleUserAccount: '5nzwkojt53tdhlrbfo90',
                lastChangeUserAccount: 'f84cjq0ptckkadl5oco1',
                lastChangedAt: '2020-08-03 11:45:14',
                folderPath: '6e24ujuzcmi3i8g0d60r8lq3qiyiepekrfyyi2hc35axeli33a9f8hcfibut7ad2evzh3biwlefb58flupgt3wray8wk5g1fslm6mg77c48x3tcuyi305kws4bdrxzhwh28kl13ds992uqkqqwsw3z05odtxhvimof8p34zwg9kcbst0pkh9xz370b6egvbicvofg8g7a1ieac7gbwcd5c9jndp9cvzcqjb2lfx82pnuvqfuzwu51h69vsxoug2',
                description: 'f3wuufnlw5z39dd8w0ioxjzsqhcpxhra0d3u2au88wcd4o5yujmaz6h1so1bfnh18idpx04p0nqnqjvz3gbk3jd15l08v3u3bqppzfpk0l1s7xekoax0epcmehq33p12aszqebbwh2ppgluijaz4n0lkrv3zv6dc3az58zcvhjty5he5ehgv3ualv9wy8krxxaelxkbificj360888kaask2hxqcwli88fk0wqa586yb2helw0269cs5j5q1obi',
                application: '6t7rofw15cooe8i3xbfbu90qtvmykjmltwnyjhz9va221d0yt4rqms6r32unj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'upfoti1n4roe1uwvkmgql6b43uw6pxqv7av8mc78',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'mtl469skrvy2g4kny9eeufndq5wkasw7bzuja7744y43oz77z9',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 'g3pkqvmwlnxx942edc6d',
                version: '3jias6u4qghtisiffmxx',
                scenario: '60xbqwtubgza6dy6utearikoqpem90265emimvd2n368o9v92a3250ztsl4j',
                party: '8j0w6zqmahbaef5mf2p26p3c6nq4raiwg0eabzailirj2n8zwuxpul1w7m3k631cse8dsrpevia1ilw1vma3jd9chs8rc3key0qp5g71zkabuqf84tatptxols1kt12ypfivjvzqbqz3n45zwp4xd3b3u9a0hn4f',
                component: 'far0syh8zdg9p9ws6mlbvnq7qge516fqj3z4g1bpnm62gxas7vcmy9tbue8tfwqro60htslmqkp0fvubeh4rvzkbr6di8znbulzc7j5w0nrn2bjf06hl69yqna8tngb7dkicuavovlhampv72ifzb9djlhojcyuq',
                interfaceName: 'shq8k082uabeintknzi10n3jlyk2ss4705j6eo4onf388sx19ug5o3l6wk4k42p7g84fvs8rxdxcd98gedqbj82dcg6untbwl1nunh8vxgbrp2mjpto0hjf1i2f1xaj5y90gxksxtbhg5gjotiyqrmgepemldvty',
                interfaceNamespace: 's9u9qa4maruu5qn85xwhdi0i53fcl8u87n64b1lchfubktyn3ekfyhxrktpwbahqgp9jhvvta9ohf7h5zex4y7fbx4f2i1ylnv1n2vu8ipaavd164i89crxjxf7soisvvqmzwjz6wsm3zr5rve31qjyhxlzz06w8',
                iflowName: 'buy8x65jogg6mn1fb8aomf5cdczbkerrmnb1lqewsjta75xtenyd5055nq1wuzc04l87xvwnqnvhqxqlm24y85z10mmmclqnctb41zg8qnzdold56nrbawcmv8bfgn6zezwzh0txe4yxt3ts735g6amoe6imjhat',
                responsibleUserAccount: 'oo9o64itymf38v1qxxt9',
                lastChangeUserAccount: 'k7fb1q4b5506pygd1nsm',
                lastChangedAt: '2020-08-03 13:16:16',
                folderPath: '8skv2o1briby027n3f0qiwvdyztmcwbqnmtb9m9w5ay9p4azrgn60ydlutr3tj4qs5xoojshnwnn28jklujqmcxuinnlju4icdh6umcg6ccwr0w95cp0hztdw5bp4mmzghjcrgwxgp89wc61blypo1gikvtobqrkqoxaqpvq4bnbstrrewdrvl9ovagij0mc9cbokbe7g9eaenui6qu32ixjklzy68up754cxpyvftbolgbq1lcvfnvi2j3it2x',
                description: 'clbc29krxjib1tres726ghkzm3wvtjsa111r2ekb7b6s5sutp10rc1qltlxp8jtxa6ea2qlirw2vmkd06a1so5k0d4vckafiyn9wv4pg11gn1reugszzve09j2bxauczdudhp0kkn7dm3q90bdnhonwynzizttsw4401q8c0mxfscsz27pofpqkjhadrogcxxgxv20l2v9gdlxvp27luet02zvx8y5cfwpb9c6y0oqsrnrsicis6kkj2hso0j9v',
                application: '7csonyzjgegvtg8wcs64lcyobims7mkihm3iwrywtb8db76nj0bglt3bt3vt',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'cncvf4987dkpain6ymp60qhok6rvrpytj5sh8jce',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: '6c2va1wninbdemi1cuwse7oa9fly5td5sze6sh3rfney14rebj',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: 't1l5hln4ck7uug8inn59',
                version: '73kucr3quenvq3tliei9',
                scenario: 'v3nxy6huz0z0o09o4rskzt72uqx54n1xwjmeyt34mx54kjabk8c40ul6q6lr',
                party: '4od8xx787k71sp44j9e2ur39zmqggq5vmcd9pt1ramewhbq51lyln1i8atl0qmzd1qjqemc805khg3jae9c1go3tahvoc4xk8uvzxibyiq1v16oqr0spe9ztnckktvo4ljh29mjrstqlopk3tv6e5u5nkc2lzz37',
                component: 'n5mpnim1gu2bdrg94bcobo8hn4m1s11hsdfykgum1rz92c8llo72wlltsjpwoa1lwl59kjhdyri8memup2jdcdg0zimi34c3dsne69vm2xxfjuw39s1mb3eiu2qbgsl4n3ppu1ovx0rankktma0v74zaom67st9o',
                interfaceName: 'vjssgg1ijs7zxpcqon6gicjvzehla8284ddfq6w6buymm9c9f8zrhgb467rbhcvpzb1ut9tqlrdcghq2vwyph07uqg1k42w8r0jbsaxyomqaezuyr81mqc38uzpzen2zsitxlaep8uijml2u9nt98e588t00nwx4',
                interfaceNamespace: 'rbn5flvcjgfsh0fambf0qmqkfggf3jzkxy5nzkbgtnf0d6jks0ed0qm273qmpaqw26cylf6z3h4c8paxhdhk5gk65if21qjxrq7eavvkdil2g31qgexgbsmb3o5l7t2e1b5mxk2jg7i1qohi11sle1shv7xqp8qf',
                iflowName: '98prpiy4hwosisa0c2bz6iwpxvbmnritv3lh75hgwrs3qh9dqblc7kidfwt8s85wz8l2ffmiybqp17qu2rvhoo0r0gwi7wqsphx0oe2fjsw9r7qppqhp8og1w4nuirdvg414n9xqiy5469v8mnnvzktctibzw7va',
                responsibleUserAccount: 'w1p40j5wgi18n49c44hz',
                lastChangeUserAccount: 't15sarejpkub93fcm6mj',
                lastChangedAt: '2020-08-03 13:37:14',
                folderPath: '9ztcgg7sgg2sp0mi9bmnmfsjz07vqxju61q19owugr7d8d74m5wszgfit95sjeabya2i997p4ufnw2gwugnips99jhd8l4qay01ijwfn1i7zt2nqj74bc8ncek9z5gjiaqyxfxcrjiuny129tfc06qvzt0oruuaci1r2j0laqknwv5fe5bj74fqxvlqdj9xpj7ox0ig7er6lfe1633mninpjp85kj0v9kkk0r9pcdbyqmy6adsyffbsfstzjco7',
                description: '7429alui76ooy3vdzvq58qynqkc7lbre97i3tukcslcme492ot5oslz4t257xsd2hwrxi41ct5d4fmujrpdkzo477j1i78mx9e9b37qroczfzx28plgbrhablhtkki2ngjpj0svs7a6djboll4h9760yfiop334s2v3n6m3znrgf16ljedzwx4sp8btlbf2zrgx9wi5tpoqv4fg2sb6r2o2r9ea4z132lb8t7w5tuzf24tqbn2mokikfi54dfdr',
                application: '56c1k7868h6bn9m6xekzu0od66c74hurfycg6fv3c35uinm5wdc65wkzo69n',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'bbjytlcwqpq5kkptx0qxike57efbg7rr5cp3l6j5',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'yyl5wx20sdrxamyfrra14bfwqq7d740kejpzu42w5hzh5kciko',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '9ya94x0mkpobzfwjenj8',
                version: '9zq9kah6njveqmzuoz1m',
                scenario: 'jnlk0vfagwi9f9w6xw0f0nooco5mvocuhifdst53wv8ima7pxjjctralgpdf',
                party: 'fzcws67a7qaxps3jyyfniem7r4qzmhitl12265wk23ooee1fc79lh4lwomfmunonw9weaq7ieflwal0ofk9j5cle2hdm5kcm1ykk20n7tud5o9aijhk4mc1tzvzvwp8hdo0pcucs35xzxpqnl8cjkotxu9n7tcxj',
                component: 'x43mbqf0g1k8g8hu6jax6sasq87afvqrzszluxvqyvpqytkq2ebzmk9x88w9qtaayna2rkov4dhpp0e9ljrmx55s6lrrhcviyc2sqv7ol4ifcvom86esw7dxxadi019onu3dg0zlvzi403zxgsskqybfqp73rdfb',
                interfaceName: 'n05njia5r0odxqkaojqfux181ikae5wk39c1dewyszyl7xt0d6vm0i3sft0ug7acw51knkr12ws640gkfe4j4mdqx8z1jd61i8i1o7k0x3mla06nzy69lh5pcoh65n8ple1tx2668o1ip1qakt605thmdi5z73mw',
                interfaceNamespace: 'lmqqubhdlst1uzgr8iem2rn134ci10dmpbqygt9t8ieryjhs1iubk5ttlixc2bj1sjy78qsh6ax1fkt7zq37193coqnojejav71ee0r9mh7hk66f6prsxi5z2zarusf87dyz1nbp3pmshx79jt5yygysi6tvd9gy',
                iflowName: 'cz0d7jgg6oyqfazvu5ksexstm8ctw5jijh4b2f1pnxg2t01h6n3o1798v2bahayayj6j5vfsbg9zdh8czley5k603noxx1mz84djmjrx89hfjay7iwptppcos4wg9dovrtmkc2yepxdriarou0to3admgeihlqad',
                responsibleUserAccount: 'w66bp9bw1hf09aelpmt0',
                lastChangeUserAccount: 'x1s9hojfryspcwh2zhfm',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'hy16ixkbvg51g8de7npmt3wk2j2ixm5g28o0cir8b30bs6f3yust7koqlsjpypieaw9odqd86wa5tpkok98kgjrhmumdi54rpcujiwswccqsyehmdchvluqsjsix34slbh6jh875xj42aqudw2c3vleir10p6l9nrpqmuxw84fga091frxv1dvh3dvhj48v5g2h5sg7yt3qpal01nt4nltji5a5k2o42qt0glsah91ifiq1dkt94fb9a4j1ahux',
                description: '634nxkl91g9z9famp2knzwv22jd9lvzs26hd0owsvt4gdvjy0kr15iwpyz5w9jm02a2b047tvyqwrn4pswtjzri5x1dos3wuwkdkqp490da8xqnkyi7ivs1d5r3od9vftuy0lg8brvr79ajoqte9gxtndq7b810ramn0oa1xyi2a2tbegxdntc5xd02o6f1xvx7notnos1ckywd4x9duotlj6v5it2kulw8aj3hk73xhniu3f67ha2nffkvjlcn',
                application: 'pz9scbf7313wrs8ui5qfwe1pf863lloww7eege56ikz0894pnrz4m77qnmdz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: '328tkvapym71plbk8zo3csofuhk4po91cwv7i05o',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'qoj8jr44i5ztxbox9h2mi3sgzj4elo0m31cj7lw04nwabjd98o',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '510h2ycu2zdbs0jmoc5h',
                version: 'fwrkdkjxj5o04r3qt754',
                scenario: '23h3l5sj5zd58lma1yx1d5pbiwryft4bugkm8p2ys6iv90pb0qnwfse34d2n',
                party: 'njv5sky9xb3krj1ywcuuxxkp7frrogqitowko44lkdzlsue4r8uh84evlh7q742rxygwp1ovjyya7cc5x616z75chtepy4pv1b9296ba9vxtcljgrn8est6vja0rpn43ui3w0rpaol9fgjtwj98jqyeq1sqtnfnr',
                component: 'a60mb7e60rtorkljucq6l8ligrxp28hgclr9fs3wyk6wummiay03k5mnpkqqufb9kck8ejlum92ngynknivjxtpqkfnwv9vg3fb05v9cgfy21kc6jxwu2gzu36fcq73chkxtz2tw8jgo7jzotdj48nugq2wk0olp',
                interfaceName: 'ekqs68la40kbe4rdkhrvj1gaetrbaonqpcj8at2ohg8mqjexzw392n71bbh618eiozhh5psispaqoae2lggntnz3iybxn3rmdgkjvnl0de6rf6swyifoe7vinhut6nghjwzpejcka9nvk0rrho47bnem5fvig22h',
                interfaceNamespace: 'xu1fh9ue8p7xiibkmo92udy2r5fj52y6ps3haumx6mnchnkd10vakk6fnfwrfsgscmhzf20b7ad9twa91pwijqyn315sa82n4z05mvrdn5s1wfhnlzq4v1wb1q5i4oa67qi8n4h6ami242n8i3dbdtoicuqkgyb9',
                iflowName: 'blu7o087jewegzo83j8e2zso4rltviksd99rx83sp451hbwegyoksnmliyp47mnhj25vne4qxj7hham976dnu6qtf6pxbza0qb856mcud6bqkbfm92ual796dfo6yzn5h09d57fnxy8zwr6emcd3hxj4v3knicsm',
                responsibleUserAccount: 'go99etzk0qng6gthaexv',
                lastChangeUserAccount: 'iarrqycg1kl27uhylglf',
                lastChangedAt: '2020-08-03 01:18:30',
                folderPath: '0hrxydqau1l28gzuenzj04qwx99zfd8p28uakoxxjya6w4n9ax3w8pf82g1f0wl38pfzvakp7z528epo61g2kb2stfshy9cdq0a6jm8r7kzgjf4ilil0uwclvsvt95e7rz5wmgq1vr4pyn5zh5uixei04ywxgf7eow1bjh6a00wpn3jrycwl3fk2kudo7kamwc59c5g57rdz9vdlfcpiqtkt8eyggmrgyc0hu4s9xbj5sit1a19mumm0i7ddw57',
                description: 'htbx7agdoqll54qhczx2la243p7l4uofu63egaeqkc9mkkdb11txtpd705z301cl3ox33eqkcftk013mx1yxhubnulga779gbxurtinvdo15mctyc2wlvs83fn18lx9wb8ffjk7rxbsbw3ssoam1ljivhp9hr4gi6201hfttk5esk41obgjxq5cbn2fymqen1xhg2jf7jvcddjwgjsjss9480l5bpqdukjl5yeflprturggdbgueqlicsbp3ocd',
                application: 'z8fu3vubc4ijug0ueuccffwv2krrzy0ozb277wxitjzvotewse50qh1ap01w',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
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
                        value   : '5c2a29e6-f935-4e5a-a55d-2d7c02116c76'
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
                        value   : '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/710e664a-f383-4058-826f-cecd33f13024')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/7f99ad84-70f3-4ed0-b44f-2f821dd07bf0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0'));
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
                
                id: '9ad8a4ae-2609-4eb1-9052-b8432e766eac',
                hash: '91zfl0br2kguevyg2qd0di6z1tmtvso6gsicpigf',
                tenantId: 'ab8c90bc-bc17-445d-848a-914bf89c0dd7',
                tenantCode: 'u2mc1suqn4qrqavoac3t2pjo2sfv8tcwe9hbe8e0mat4znilc5',
                systemId: '9a4fd565-46bc-42ea-ad5a-54788db6ea71',
                systemName: 'gpr34psc9tasigxelebv',
                version: '6k4fn072xr6dj1exppf0',
                scenario: 'uihf6pk0760420ospzakeut7zk4okrtjspgljiey7mfylqrg021g0ianv5a0',
                party: 'gmao0z2o6f37hx8rhez40b67xtg4nodwhzlhr0ezlvv4h45pseb4uesxm37n5vvx2yd6xun94n2o0eqi217uydwr25aylaud46e487tgt9gxbnquwob8lk4hy66vyjwuhwn9kulxmr3enfcksi8adamxuih0z1su',
                component: 'bz0no8qt3mt2g9h0xrdkkvkot0z3b1hven0dfllhah8uhjemec0o0vpt4kx7hejexvixsb0hr40ycyrrfbzf3uembfuxrv0qf0urxj87r3f2x5tc1y058iwuxckjv4vboh3tbfkkgszjf22xv012u6ithxj3seqg',
                interfaceName: 'lbm2bs7l7xadm9ig3knvuxoxjka7vdhrsz24l8g9laqlc1bp6lm4on7ntx5h6s6ti2eksmjh0u36drqlzqmi1jm90w30385ygja62zyzjh8him5f7ccc6fjnw6bhin0w1q56czcbzk60dbj4bw0s16ccalqjzqxq',
                interfaceNamespace: 'z9s2twe7yshd8trs1icilehdbjm90fbmq20lr7n5kcbfwi9kkjwp6azrg7ffo93loqvbatn88knb0agbz4lt0isuyhg4y36rmpjazk2di1uoumg7ckok09o3qgrmzgucohosvh065srmnqqra9uheojap2qhsr1j',
                iflowName: '80xsqi84l90jck7ymzqyycbrscips0pv4u9760yn4wr23binb6erfixvxy10s3xo0mczx8zw5im632lpjudbzsurrjinmx3oiysdd8d7kgr5z7zd7hc3zkhr3q1djnif5pkqtkeoa9t8mszx9b4s7nqs3xgs9ln0',
                responsibleUserAccount: 'z6xnd07ib5zeyc886apl',
                lastChangeUserAccount: 'uqtqzmo4opop28bug1vk',
                lastChangedAt: '2020-08-03 07:44:19',
                folderPath: '7wxvg1vyi4xh2ayldk23iit052dx5pu8cmhuhlw3g355dwcjnuee0017rcf74ez262ow2gsx6fody9xqv4tlwsi3atgrgznf62s3z2qt4dfimkvmcj0odi5dq0hegpm0x8ivfqbt14142n3fv666njagepxc40dizguuwxbo83jdcyy210wv2imuvhbevz1iyevyli4ven2ukzsaogv9ujrxhpnzezzvc3o0w0lfuuj10o7nznk379evcud7prz',
                description: 'w3glsr1puwz3key5zefa7dlxbw3p28vo3ivo37mqt1mqaj35z509wmicxgdyjk99kcfa5e11qq2mi2qun2l5dncmsylq35cnivtru5j8vj3o7dw5btsjxkpg11tppv8d1bep844hd3pzvrwirs2k9dea0fpghwqgvefxvijm8aqbru1hwrvxec84rslcikf9s7c9d953yhik3gkd6b74gou83cyzy767dwv8fnx4dcvpouikw28ug40bk9es5r3',
                application: 'k3hvmmsi3pkh0hr0w0mxymnce86m9cq1vyrm936qo2yvyrbvtewmpr1a8fzg',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9664b087-f226-4fa9-8953-67106366b95a',
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
                
                id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                hash: 'nok7infldzaytav140y21iqdwxc1tajz10zwbkff',
                tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                tenantCode: 'u9g0c4uj7jcv2xpx3mfd1h0nw36gx9m7ge2s6i7oszydnxoryp',
                systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                systemName: '6jensw9kdnvkz4rjfwyb',
                version: '8fkjt66v3crxzq3nxqyu',
                scenario: '9ivftznb4tyeyqo2u0x8q2lwnevb3icqtruc4g91q7hofk1do0i0tyxar05h',
                party: 'x671rnuttms6pwt04x16ykhssnpogzreu2mi24obuuo1c3dxny1s2ikng4h45ngsrh5zs963hi9yg2xjpn4ixu1pn7j7a7pxl2da0vu3lc7kxd8wja6sp5zcptpnamiml99wewow2axzf9ocpler5qb6cxhy8o33',
                component: 'gvpcwbr1rilntvgzyw6wasi6zcjbc3hqjfxqb0ae6dmxhwnfws9hfjyqx9z02906pj723f4bg4quyie0mauahzw1x05sc06dxpmi73naslt2b1m3dvzwooweuke02ex3h1wl4yer92499nz3f7cbxfyb9x5qzj7w',
                interfaceName: 'rn7vfhqckawrtv31ig6bdu37rjdxc3nbisi1al03c2u7se3p7qcz2vq7lhlnxpgm5d0avyr68f1qc6r9zas47nkpjkcmko4fc74f8307mreraqf6xez2t6chu62wc9z4z6nnq777mrdzyqniua6nd98g4naw1ef6',
                interfaceNamespace: 'qx04yv50xsdl6zudkibhohi26kngxrmtt0hetrg0fz10kft8vy15aemoqs1qmktsdzzjjgk30v543vkccdaimdgkrmuui1mf4puao2auwousnoqyz3p6s5a83jk6rs27fo35mvz3mz04z9a8p87abklxzfcnq3i1',
                iflowName: 'srewwndtm21jzx4y19b8cxeae09wp64zzylyyyxuoffpq9q3th9c8poc5ydxxa6o4m9ts8atzy1xglxlyf9jyi7tdlbra97sg8zc7yov8uei0hzxyq4wuzwjcfszabllckw1lvz8nieuio7hsq96eqylmmhllbr5',
                responsibleUserAccount: 'rrp4r1g0ejdp215putme',
                lastChangeUserAccount: 'y497m0i1bw25klavgkb2',
                lastChangedAt: '2020-08-03 16:58:30',
                folderPath: 'dzakkfqy7x5m47hqvkrrwwx4d7v57qo9p13lzvp9a2399j6jzrjm8j2y5totawp4zbo9q1dj7fs6ge01zanv9oizj2aqqilfzrq2wc3wtul3va0u87ti8us8cab9amdj27mur21gefvkb5cvunzr6ovuivgcwkxa590q39f4g6toc7um308x7tgw5g0x6uq7gk7gihs9bkivk8ovc542h8u8khuwt3y72q9d7p9mwrl5hbpew4p9ycl4alpwu33',
                description: 'jmnsuuzjpzw77b2d2g8omrlincsxqgcxax1ctpxy70utu1k1ca479hld0zq8zgx01x1r53izmhxabfx0kcnjhrhruoakcjq3qeq6neid7s7gb3zz43uhtaeatlz388ka504edjg1t0yy4ewvlo2t19webi1o5dbkfgmnzui09fsg95jofdvtcyk1bq48dsczzlvuvbw3qjnt8oo5v9jj2niiq6a4e34rggv50dhwqf3bcof2ggt7d9o5gvb3k49',
                application: 'bhfah4wcfdvdl2n599oyzjr82s8n6m3hhtawexrto2kqsp662b7bja8tny5m',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/e4a4b282-855b-4446-b3cc-5f93f443c849')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/7f99ad84-70f3-4ed0-b44f-2f821dd07bf0')
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
                        id: '9f814f70-e3f7-4369-9d85-1f072440d9c7',
                        hash: 'rqx3lrihop54vl3qxufz5hnfgfrcy6qw2uh7gf6o',
                        tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                        tenantCode: 'pvh8yq3p7gw39ru4xf2nalfml7gapmt29fny5qg9379iph5joo',
                        systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                        systemName: 'txqfljj4le04lejunkfu',
                        version: 'idpus5xx859c3qe3qgxy',
                        scenario: '7hrxz7pj2w41et78qan3xoqqopkg2txi9gfbilsnwurjtf0r4sv8a99xsp1y',
                        party: '13dh4radyxryayy71ulopkg2tylbgl8j44w4bg6ceeh896kel4ul53991160zgucf1okc02dcf1h2e68ag23o7kaokh50ytujgyw5t91r6024yancvgc30jl13vwkg4bn1xpbbls6rs7xok0i1w2vepu56w0npfe',
                        component: 't3fmw1kfztqbzyvqh1lxcw8md0lcujt4ssatp4qqga1p86h19j1uny5d2yxxp23g9hxm0pp5wdevn64bazl1loymmk3t5szof8qii9r8mpzwpsk66zxx30dp93tpmfwhixs16gzf8dy7nnhq4uf1npgcpezi6n6t',
                        interfaceName: 'l2v1ftml4qym4a7cotapptybs8mkk3kl55t3vdyp1sp42nqtugj2lydpsr235tw88i85g6gcps2e1svvv4lt48jhna6nte043etd3askzjpocjbb48mzupj25a1izzn66ubrasa54jupce9i824o9nlqm3nodqwp',
                        interfaceNamespace: 'd0r75uew14l8edfxule0wlz3af0q7ul9616lg8jty118y9f3z0s3eaopa7dlaelkgdyqmt69zuil7jorfqr2qkhuqlg1ocrywekolioauvkzapsv98cx0ss36rqqvna3exiyhfge55yeur1at6cqe5l0vfx67qu3',
                        iflowName: '3708cngfwt26si89wu17u81yp6fwhi7tbre25dzi8305ri1zvxlr86ekm5ugng3lv710mgggekyl86lpvygel6t9o1nbs538tgevh4zo1l9tsyxt3j7u6oe976tqnqvo105v7v2va97y4tzvwhondsx9t7hre8wb',
                        responsibleUserAccount: 'l21z5d90yeddi9bcsuux',
                        lastChangeUserAccount: 'mxdxnlzvrfvgvf3370n6',
                        lastChangedAt: '2020-08-03 10:53:09',
                        folderPath: '01h0yk1r73st1vfgj0o55wfsvd7qts5laozjycxibqn08zqa43z1iop6uicig6xlkots5vq4rlywg8qezf7wcbq9rdjmnr7vvg1babsevcnb35mki3md2qwce2js9ih9hxvnk6q5jhmcogv5gmtwy3lxgjqr15yn6qwj2m5aqpm3x71n4o2oou716bcvenl43rwex1pumc3bim75v46w9r879m3aq3sqb8p8aglneo217rsbldlqljvssc3qmea',
                        description: '4utoo36ovteexd8z7wr87srbj2oh2dgjpipdxpmy1e8d62z418ad6pc8rbvqtvo5c5zk46yvpfprc1im38d1zvzw0hj6pmvnp5x8of7y4aevlodwrd6h65vnnxe2ool5bpmx7shbpc3g19e0edwzwa60dwhnqzzfy5p9zy1nq4w6dn1tew1aq09xk8mfjp1pfckfbktzmdlac6p0uuqgh3huo7cfyzo1nlmmcxhmfdhywxhdxe9qwcxwi8onswv',
                        application: 'qmm85s9eom0o9a5xlmjv73ctx9z0n5s4m7j15wuvdxr2voz8rkeuqtxh7htc',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '9f814f70-e3f7-4369-9d85-1f072440d9c7');
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
                            value   : '4a4fab75-d047-4fd5-8fad-1e10e36a8ec5'
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
                            value   : '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('7f99ad84-70f3-4ed0-b44f-2f821dd07bf0');
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
                    id: '3acadd4c-d8b1-48f3-ba75-c923e0405263'
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
                    id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('7f99ad84-70f3-4ed0-b44f-2f821dd07bf0');
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
                        
                        id: 'c225d115-a8a6-4dc8-9771-824d03e125b6',
                        hash: 's78b0lcj1ak41ve7ab1pkwoph73o7qysmgsw6l1d',
                        tenantId: 'f8cc8578-e46e-4180-bb6a-3dd9e4c04b1d',
                        tenantCode: 'plwiyg9n43q5dcai1juyveugzt41u9x4upvk9amid5uk2r462b',
                        systemId: '3167dc05-3bac-4661-9ca5-11e81b4692eb',
                        systemName: 'umyrwa9t3s9dyz7g0o0l',
                        version: 'pdf0uahu56w3iflyesuj',
                        scenario: 'hvc57w9qwks60l4h0pnr8w8pqvnv2re3u77x6l8d8717eu8ffeezly2bj0ig',
                        party: 'jown7exh03xt61e27t2r6r7iw1bmzv5pmyld2351pdj1f74z2z5ejw2ocejfiupo4z751gj6wxjh0czkfzazcuezvb2zvf7zpvj49vfgemxq6qwv511nbsqngmka4em3pvvxv6mxv9e8rgxqozc3ijiem020tc7q',
                        component: 'o9jnww2tpgiphknnt0rwimyr2l73eg44yx7h8i4psed8ya5qhuqqx4vplzrjt5t8kxyy22jkfov5572vkbo36iz1zbrg5ndd9dlaslxc3sxhiveujtk06h9kg5bu6zs8wibt12eaqe7jwvim7tq7n9fd61y48j05',
                        interfaceName: 'r746wd47228ohp6ka25tgp7k0ans9biphezx9gwbbqivi3ijkvqy3ih4kakfavy8dns9420j3f6psa2z0ojgtbd66mhrg1jr96el1xqaafn879wi05qcvglr7dr2fjdmdsi1i3sla1sjok9uy8tyxpjkzrqd57wh',
                        interfaceNamespace: 'g7hcej02kqbpwz8rxifwb8yvcm79afo4ah3z2gu1fkhby68uqlhx073v29nnq43xzkz4s0e1i7dy9mmwibe4bol85y1cnuzdq4dl7jk442khs21rnlwltmzi15hrbljuqc3xz0neqc1r5z0fixzldv496v00e6te',
                        iflowName: 'qr8rzn8oxr0ozwmheuq3lxsl089at6pcvmw7g321p7hx0pgc4pddla24eaup1g4fu6dujam1ljavlgn1zuygxfz9xeo8a0o6w30ea3cu38ulsee31zcztqrnj0f4y7ssktca97itvp7kcenx9t5zb6bwyj8gd39o',
                        responsibleUserAccount: 'xjrngo68kbu6abt4w4qr',
                        lastChangeUserAccount: 'ftpgka48eifgbxfr1c4v',
                        lastChangedAt: '2020-08-03 14:59:12',
                        folderPath: '4tu9zbv5s5e2zra29hday2t78ggpjpatz8iis43e5h31chfba18zs63zesrsoj55imkt7hjovsc8d4o0c6w8tqnjgtu7z5oqvxn9jk4y3tq5iapy85c4ik6fdicyali07awtxrksmmjix08l7cc9n86g96neqgrccfe7gqlokv9ybwiaruo07ira2a4qsegr7yv10zfmyz46cefa8p3qvakltggiyesikz4hmli27a5tyonxx7gbw0qddegp0oe',
                        description: 'b0q1y5svf6docy3n6knbrg9v0t7xu3br7np7l72scfqebyaesmegnyetbh7i5z6b8bjg8bxt17tuk4mxc09bnd0070zkcxhrkjd77vankn125wx4w9qlbpqpynk82py1i4mqscqnp4h72d5x74n1ijeseslmynxmfue725aaowxndepysbz25k58o9ey2diex7lw1t0j1bzhy23nw2qjpjldi4adh8eyrq0559dipjrkc5y31rwzflbaxuit6m6',
                        application: 'jbi05y9n7rq87bwfq5yvpdoca3ho8jfbl3bdge5bk5oay5bl7cqcr0r9mqhw',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '0f082e6e-aa1c-4028-8156-7a59aa3c5917',
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
                        
                        id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0',
                        hash: 'gj4i13opfqur6bwh3qija3w0m2850z08cwwbd03v',
                        tenantId: '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f',
                        tenantCode: '4sa9lzj94zs7rjukexf58g63dcqt1u6yqezt4rt74zxr4l355w',
                        systemId: 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec',
                        systemName: 't8i5m74bo8ab0le6bwe8',
                        version: 'w67nczz5t88zp4ql5ums',
                        scenario: 'bni9qjre1vo5k1fdfv2d2gajzvpls5rkxcagaim48vslwa25747lqxwir4ns',
                        party: 'tkkthz5viwhd9l3vp01nlhi7ho1p59awqtokttd0vnc7ve7uirmmfp9lmj437uow1oejol2e8ec3cinl4u6y12uo4liucfy527549pvupzyx2snbyko0av0hnxkoslybgd2yneyiov2t2v1zkf5ldc1xhepl51lj',
                        component: 'lxs2156c1ra8tsa7fe1lwydjg2tmcisnjm51n0vqtl9nx70a09g91rl84pf2ia0msrnzj4q7hc1rgqajhzhacjf4w54hrjnnhmm8qodmqgus5r911pz2o9c3ri2xxafwykj84huo4jpgb2m8whr4byu4ct2rxke7',
                        interfaceName: 'njva0yvbq3clemjrjkgt1xrx5yr0z8wyj2idpca0r2it6b2az4y5d6he9wd5vbnys7249tct6da1kvs2tqjr63by40iz7eaddt4h84gqq9gc1n6hl0uyplol2q3xov8ngoixs3ducvbm6euvvzyvu77frdb6lk31',
                        interfaceNamespace: '7jn0qz3h56xe5e4mj5wckmtfxv4rhtaftvjbnilkk0brrkpjlmr2c71xvtey9npgb7bl85ihl4gp0fthlpqtjnfe4lp2aaoyrxeyvh4bs5f695mt5wo147awr4h1re1ybqs52rlozai8djjqeqopyt0fgzg4abrb',
                        iflowName: 'ldnrlz1y652qwtcxq3waivvemfl7oxulz4u8uufubj38f306qr0von6nrouq9909r0i6f84acum0hwswoovd472cinknqzaq9bfpzaesony3j8v0868raavustgmheu40fz0igft3izk2c3l9w57m4jakiojtuv3',
                        responsibleUserAccount: 'uv8tdwu50yf9zzr8xsdc',
                        lastChangeUserAccount: 'z70bkllr79y4tej1mcki',
                        lastChangedAt: '2020-08-03 12:02:53',
                        folderPath: 'bjt8zr2uhnmpucaepof5vowt0zpzz3ivqro9pr0ecivpqdyshmesc4t00s6q7sal7pun27aj9satdgf0pvd3d6ed1cdty3kflprxr4uk28eueqr4nqa4ye1ghb3n1zgwjbu9pkbd4q2iqeom2s6d5tq730ja9ze4ydwv7yxkbg4i6lrjujhs0qivhnippuocyfl6rf0crtdlj9a9banuvbufttc2pzduirxvwrpofbg0318d24lvb5ensmuwfsa',
                        description: 'ahayfno80599ww79xyqaaes2s61a8e4j3gkrdtvdeiqne5proap6t7ma6xlzzo918r5xhraie7uco1uxe7lpfvvhmf80uy6aduibv3kqfh5s48aut45957m3qmzok8haijiejchu9db7wpe32pld3yigb0wnes0vbzdets59gd5hlu8t1cfvdh7wiufy9lgazuoqdocau1s0vhzl15sgahnk86k3y8r0229plxuc4q4x41ypwsjggrfjvehqi87',
                        application: 'itjew64fjrplpf7kt7gzcejoirbvwukn47syf8yhffklp8ppwsspsifl0guc',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: '0f49570a-fb86-434e-85a0-9c4dd9688a13',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('7f99ad84-70f3-4ed0-b44f-2f821dd07bf0');
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
                    id: 'efb09cd0-506b-4beb-95a7-16c0e20ec922'
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
                    id: '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('7f99ad84-70f3-4ed0-b44f-2f821dd07bf0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});