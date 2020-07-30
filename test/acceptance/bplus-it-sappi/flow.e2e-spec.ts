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
                hash: 'sc7ioeqf7ayfmu1kfu9j60xi8txf65zwgbfanit1',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'mca9443jevwcgelbops5bwduhx1czu5tfe22rasryxqblox51h',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'znkmnj2cdu6nvi6uc29c',
                version: 'e3qvnu1o7mmkgw9cwpvp',
                scenario: 'dt11e293i34siayewzh8tj3geqaypq2al5323919xp3ptdvo83yt8st0ry8o',
                party: '33zozhzd9jg7go4bt2ag917ab0603lz2e3wdki1fxwojfug6f88xcexkj6smzlcgzzn2vcrvisj3kpjorhqufx1w118ivf5u3s8xq2v2u7a8odkia9a55t79qwzpqwfqkbs4wd55pk2enrw02ohexm0i5ma294ig',
                component: 'wioxdt6512jjijnkur5m866arqom9crn5p97d291jvpg4rzxk1u1kmzp27jt9egnd9qtfyqa9rlsc3eorank0aobslu3ikcz0687x9b4ugte61sq4qa3iw28vo9dqs42kvlibucimm3woonu56xenz7vlnjfz57h',
                interfaceName: '5y2j9oxp816s7gq0f4tv7rv4g2x9eyk4xjy0fs2h9uu98ebr8kmx0d4893zvl3pt6p8w107bjplpf73neafoudm4jpdajiwrqoaxjjk9sol7rpzn6vv5esvnrm8ue5945s884ydcnm4dyp3w90koegx39mf4gcdy',
                interfaceNamespace: 'j0ihh9tzufxa9hgrksqunpth8f3aqd4wx746m4t17s8hhpmmvsblzsnq63ciz3ndn6okb2e6wk7ge5l5a89be6h5f2d09j2xkq6kcqn8fuo6ek0fmwgu7oeyqk9c7hf96u4mlcx774lvt0lhyc1l500ohjya8kb8',
                iflowName: 'dnom3m7jpahvlnddtczcsd4w54ib1gk6ljcoxpswzfgte92612g89htnsa5au1fz7u7yv4dxzvaafplgn7swoo98o55syc9qgi61s1j08qbhe07cjh1wpe1x4ue8xpxcl8bdm1q2ww8mu8iki5vmxtydjzkp5xlw',
                responsibleUserAccount: 'kyf1ybbled9iqdxmow6b',
                lastChangeUserAccount: 'yewulis792xj9q7s11zz',
                lastChangedAt: '2020-07-29 11:04:40',
                folderPath: 'mxi9cpxzsptu66l8eut0dx3jxi3z1pzozdh1llcznc42z2n0tdwevzo6rxn2abvk58ssruj9g99sbqcfz6eu99r1hn704iwcly7k491d9it47in9k4lrtcf88megg0y10eopgism0ws0b1p9o8bx65sj1luhiuo487wmkfb2zdb7oo95o00bwd3cv2dm24i6ko284wkm6cd322y82p8lv51uzt3fth9cvnghw498ajty5wi7p1n6tqc62dri5tf',
                description: 'clsyem894aji7zaw1aayx6l7kb8icb6q1lj7xehhxnqt33zwd79pfeaisgncl6qkuzikrd2nittg8vpho5wem5z4s6boazfchcgrnoyx01qh9qxsfylybbk7cloejubhtw180t3p1kdgb4cqmupaoc3tvkbn5fnv75csjfwfq3tjv054uk7isbttbheatwmdye4weny3ne9jcbkjecf62rmz3vhrz3joy5wgyld120lyxdg7swf3xst5hye1rai',
                application: 'n3yc2kvdbwib29dp62h6qrf0ku5m7hmzunypd9m44r3fqzkn7dzts3iosewk',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                
                hash: 'x18hmbjo3sa1hti1vm98385b4dzxlsens16w9mcy',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'ujrmref9zf9hq7yb1dhqjnp61vjiamtd8qtrcxr2o2q3c1algd',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '0k3eydamkybrcgsjwswh',
                version: 'v9e5teuey43y5zxwakk1',
                scenario: 'eqii4e0xdx1fytr9iz7k0v08z49191okl9fip42vbobob1vwap23uvskalc6',
                party: '3o345ekciw3kqd1ap1j5uxddalta6dstp9n8kqs2o473jcl7hsb5tnqgsl0fy2m5a105op848d14zq90v4d2c9ic7xil79b4lgg2ygsbbx4cgaguhv6b5mlq0t2aoax47fd5l8d0apl3il58nx4jyym7v2frgirm',
                component: '01g4j3j4kw9zgby6btbesnzkkdzywz6wefxzrtz434d2ad992wi9j38rx05ug6jrulmx7syrndi0ap50p7ryd87wx6ongw2z4n3skf5nvelaxtln5hxruwqhwi2mf5qs88ioyxzv6l7kgy7jfimutearmw2nwkoq',
                interfaceName: 'pwvl91qs87prkjic7xtzu93qxt5r3lwc2akuct7ayhvmdjovg4f9jmk5ik9uxwim4tkjam5mw1w3d6rx5xujib9wm2h44zn5e2w0b3kk8w9i7p6lvkbpkoadgq8g5nz71nab4nxfzpxkr6mm6vkem8lbxa90c4yr',
                interfaceNamespace: 'tmbk9p5kwfk398b6uv3zll5bpme4scs0r19311ijb1p9okaaosfsrto8jiynfqreplqgavvx2qrl664le82y3mrxi74c1n70u4chqbhz2c79ks05sq3noub08xo5tjo5akc4es7e8qwktb9vhbb84j76fd6h8knd',
                iflowName: 'dyvzwzd6v681nr3mhfpr0sllfst6c3ez5at0m71czy1a8xr4d2dr6w0iaylj5mjgu4alcyonxlg906kmlopkl701sniavz5f73oai36koubrxb32riirkb4cgrqmu6ajz17yz66iikfw2svlkvndxb019vkowilr',
                responsibleUserAccount: '9ario29h3zolfh261rtx',
                lastChangeUserAccount: '4wl0dremnx1bhhtxrm43',
                lastChangedAt: '2020-07-29 16:47:57',
                folderPath: 'dy7lap4px730403bbw8da6w6gctsra8u01g6ua8f4n8fn654v42inmvea1tcfbxqtpn2zp86bsbzitka1q7ppbg70c92goe2c4hqgdj7lebycqq7j7nuclljyvtett3feec642913v49kdfqsmse7h8gs7w1pz1kr9q8ucmybkjq6007nufrm4jtc4nmv5pp7pvcbnz7s6mat0iam5j5wqrvvclg9rqqcfjnrrn2j1y91gjtg5rlhfktw3sgl0s',
                description: 'qisovdpjvf8sujm25x6b6hfy8hcwu6w7fhn67u4hckq6rpg068b2k0aolgyeeot6jvpwn9xs01fx09i7ze61klg2b7gbphegl9ur055oc8v80u8npmhhyy0sc7cileboh3co3odznfyra83jt7ttnyps8ckc0ebcp6wf2vaukhn1xpyj25dj2v8jf8hzrj3qy5674lstus14xzq1r5pwpeccc2lsxximkit6sq1gavlwphw3dxg7qr03uaoxlpj',
                application: 'x5ulxilmnz462b7uwr9uf6svyfqj8d273rxhptil282y8cuf3gnw50nwexks',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: null,
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: '6yxziidj0pi25j86lapt4q2lozvn6xxepy2jtz4c0ucaw6q6nz',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'ymonsun39rz83xks25s4',
                version: 'vhq0i4iu3n9rsvzhkthn',
                scenario: 'uycjdgm4e5v98eojetcmapcv6bqqy9cdxo5tkg9lwl8u34bhdvnt3z2znt8z',
                party: 'xe5xb34xzis83xjhufefqpbtee8judxz78bhzxfd95exxavi9rt9z6k7tyhkittgcu8ky1iid1t2ekd8ilcy043p361pmzd95t75zaehkrcwptov7k81oygviolwzzjy9z99pa6laeh9d7w6gzjgp8ynrn9g52jm',
                component: '1163cspyr2rgtpi9dj0kt419hm0vu8u6cjagnwwf5xf1we1oj3cjwbhohc0jwzl42sy769k5xvigi1bagsejvccygqsqew528yw1r91o86remqlob9xi6mg2wazb4lbmrvbfgvh7z3d9fzy3a8w78vjdxmkcykh0',
                interfaceName: 'gbylum6qbm3w32i7ojwbferpv0px7d7vsuc8csw9op3oat3iv9uj8khuqt47ebkgfdn2ccfhms41qd9o3i3nwzjoxw2vvivzqvw5ewzichal2v4az8h5sjfkra39isef8lbzhqpr7hyy8jlxkvh7l51zqdikaiqh',
                interfaceNamespace: 'pcadewldx6rpxvoik75z16pz4ye39vxm3cztnqpqkyg4n1ay8xsirw61gmhyeasa83uetxszhacswipgxvk4dxuhlggv4jo8v9xgtnt6s54568g0hzmcavd1k0cagpmsw1wr9mpalsem4tsha78945v72pmdl5zl',
                iflowName: '5n5an9gdk8guesopf6j38li0wvveqbkrcl2x5xt1bdp3onj1pybr6jb56b8ti9hqjcilu8jh03fq7idqyssiv2kkblscrxkz3lt07ffhu2g4fouesw8l0hm38agj2c1k8hlfgsxtdean42kqono263zxhaw2reng',
                responsibleUserAccount: 'al93j80bad9wa32pgzdj',
                lastChangeUserAccount: 'adv0k8lok0cd6fo1v3ix',
                lastChangedAt: '2020-07-29 22:18:45',
                folderPath: '34th1pw3w3zetmwxg922xewynabx017zykf90banohy2vjvf4tez4xu2e78cynp0w0d3e7ec4dc9rwfkoz2gt9tz1giazwokhg69rfyj7jfcqtti2zsvi3cbxh4r0dn1d71bfsue7pdnvtuf8jhhl97nhsimffyha3y03509xwhnqistsm0zkcojos7d4q8jqu8j0dojkehrmj01ihuz6oyy62wmparfvqqut7ata1gvf1gv6el16hd2qff5g6y',
                description: 'ct0h76h9k2vry3iqjbn0cmzh7eg1bbjsx7w0roc7acfzq4fxwjus16lbwbep4k4gweb1i64sya7d8bzyn5n4olfp5raau6p2k4i9lwlysiw89jkav9309g51ejkftam23yjuxjfz54v1b7f5xfrvuwfp6spn5kkpg5506ljtu5itcxgmykhfv4ryo10sgmgen45s467c1zettdpnjesjutqyymabwoz2shord61t19t2z2p0erpqtedejxk25kh',
                application: 'evdtlccgvmvrh7pr7uzwee28rq5sjuxp80d1lpoa1jn3vb99r69txqk5dask',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'i3mhx6wkw7nspdnsijomjomjwaloxhbq4fj3516conetj78zz1',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'zuve39emfru2g9rk7fvj',
                version: 'irlqo9dnze5v8dcqnu4r',
                scenario: 'cgu0ccr419zqp975sdc4yeu5psec8xl89n5zni5bftt81ixhwrtffhdnn4lq',
                party: 'yt7iu70096jcp98hk84tyrixvnv39si1r0h9f0024et2wmwqeq8e8that8ruypn8r89owuuqp77ofxl8fmze1yz4nkvq94idpi88g2fm9ecxn65c28q1plfjc7mcipfcgzirg2dr0to7es3su5wl8heh0mzqf560',
                component: 'ppikcpbpxafkp44y53ibywb90i2d8uzl18l7stoi9xh733rp7m7wefk47kidxmt27hgvmxuxbrqv4oydratsjzfg1zdaq5l73fow484ee5jvyefe9ufgcscvqjss4jyg01d9m2uvyqdwiaynvm82l20kbuwp4sht',
                interfaceName: '6gavxpuxle11s87c417h6e62sfr542b1ydvdhuzbpiskujc0ix7xvmjk34hvkltepeymnt4qo1trmso5ik8wn2boc74b9py27qxwlyq4y2tfw88ytu39fvb6noytfsm3cvtuqcv1roeuagxd34hbqk6ub8qd6vg9',
                interfaceNamespace: '5y7a25vzrjx7tjr0mb9xhnfd5kvsmaeylb6hcl4kjhixp7a9l495qudjybzwnd7jvolj5j847w8u1bwiqwt7ehua0dxfkajibp26pcptjwi80pnjyd2kbm8wuybjvbcwmu66zvkkggg9m30l4e3ez2ic4z1jol6l',
                iflowName: '4ud48rir11erhvl60cpsr9x6lshuu5l21l7xvsnmpdrdcngu2l47fpz7sv4a8rmz2uv48bmbrima4c9ktectm2ju4lzet3r7no1td4bggznunpt55ndrqpc46nv1d2070uz3opbt58px5aoqqc76r1t4jywn896j',
                responsibleUserAccount: 'hj1v7ddl08t5wqugp06q',
                lastChangeUserAccount: 'zlsbldecvzukdw7z1bpd',
                lastChangedAt: '2020-07-29 05:02:38',
                folderPath: 'yjto0vmh5b0vkoz3t4supv0cxbrle1mb4cusxio92h8kmvdgwmf2cmgnvikeuge3v0txg4p6e2qgamydnqwaaqyvzjahg2vywcza8j2xez0kl67ytcvqpfkxq1pjfm7rlghhsj0ckd4uhg80v8d6qvy4f98mexgqc6nuw57vs97qsllgxzzsy4lyikjkdeyz3t9wk1s5rj8uq9u7ujyddaa3s7mtqu6uv3uw6acfssudiidi4275fou8a47q86p',
                description: 'mu3qvusl7aa5o1kjvrp88x2m5cqtvnwi15rr5h4kr9dno0tvzk80wprd4dkfddssm2pqeywpds5mlfq02cw09tph90sxr2a6s4hj2g23gxswslq4fj77a4e7adtx14uvci3ob7z2u02s8kyt620svmb7meicsd7faclr6m4fgutrbob2y8zsi1qfpdjghbppk8d1vca54haqeto8vq1pnd0uhlbixprwg5g99sjyxan9qf85nw21lodrjy91c2v',
                application: 'j188l2o7ewswef2cbl8zvh7mxw9hpcjqi74uugvrpw0bvlquh77cug3a9zs2',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: '0vpmtjaftf4p9o9ffo7g8v4khb1k3z8nq1kvoarl',
                tenantId: null,
                tenantCode: 'x9y2mu7esr0w7jjdo9b3spewrniekj1zidhq26ugnyox3rff20',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '2tfjo0rkrnkdjmvkvkhn',
                version: 'w7iv5c0xzlgdhqiht8u9',
                scenario: 'hq2lfw291wtihapkgyj46s0kukzlswpavf3gyappi3kg9eabgi33vhettfdg',
                party: 'zlpxl2goceu4vd5zv54rnddjavgh70dzrayvllkdeaps88c84ze6b49r6knbvuuivnr1rzwanzy831vj5j7rzitaai2nv4wporhgprlyasua62y7oybg6tfybk97dy7s44zibzy1r2103uraswgfroh2f519pji9',
                component: 'itf1pc8cpg2nwaovkwkbtsgo1o1uw9s5w9w2re831w1k3zg93pof34f3d0vymrpzdpj8nzkb7n6ia7bablwb0lfd54x6kv8leymb3noz89r2sxihe53tawdcze2whl6dc04x1dsdvac45rkbhl3c2w94o6i57arm',
                interfaceName: 'x6ssstwkzrj9q09914wvqvrc9chd45m7d1e1g89qzu6lm033ysfki4wb4bfxepfqbe4zlsjxgfmogxpql06fs18g9x2x636sot254c7qrw0ug917jgnx74p1mun9cru7t5nvyosrq1owwhib3f4kqymhbhe44tao',
                interfaceNamespace: 'ta35zbq2flmotao1dy793v9qyx7a8y13vxc5hibxuwjskvxwek3o0l90kekrecc1d515ugoztiyf2oc5odnsnvhskr3ymy2qgh9cd0njfdf1fk4ceacpkrwdwre16hp4vjsfyejtl1phpfiqbszbo3pjtvel0qyf',
                iflowName: 'qszarhuxzyxkikoh0ereth2e4u13uk1xtw4ynzju5bxc7075fxc54vddnytxs674matg9dfuash43crr7elv9h19vvsy0zymwuz3myfy59mrf8ixj25ksdbo7h6cq8l4pajuzac39fze3jmrnbluyoj5dua53857',
                responsibleUserAccount: 'oryry6ti6ezw4mx8qhzq',
                lastChangeUserAccount: '9h3fuxozbsatf7hvbq0a',
                lastChangedAt: '2020-07-29 11:33:30',
                folderPath: 'pmaaxqwrcc24rejb62j31z9suhwm0gb0kwjxiy9teky49chijoxi5px2hlsqtwzm6cyw7fa58ilyk54kshf403as0dautf87b0zuz0lhczqupvd9yzua3ushop8p3z3dy44uwvjyf8qeh57dsgjkidgp6my01bwqd4zkkx1s2wmyc4adw0ovq024gxbt5res8brq5pmp5v9e2ut2hh4vpefax71tkcm8q1q2rbidahlev55mbzz5opghf98307m',
                description: 'c6l3wq50v7i60xza2b5d6c73yw7xncda0t0i7wqzi6frcqfhqkl6cxnf5cgx9imu751dxh7rkji2owzbesrmjhjb0nbmgsagv4nb0zkq6nagh49wc0f2s0m1pt0l72ym6j72u9l6gtn6clp06n9mkxfi8qti238ffgw5bpj8ekbquhay64a3tlvyskl25fd74f7ymzuyeld1zyrxoat24gohf1s827m7m3c9u36hva7gsviqw7euoqmvkaegl1a',
                application: 'g1yst9hl4oqb9rjipgwiz2wroozjg3gi9rglc1fh1a9ve9leaai07dvj8fq9',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: '613c9y1o6jwnvs94g8pdjf5qa0v4j0z3ti5ff27q',
                
                tenantCode: 'ebxk04tdnnsrzt0rhvokumycaeef6zr8qz1iaz4gfco2t0k4eg',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'preli6tr5m5b0sapygn0',
                version: 'iix4qc6kt3f0qxswt2qp',
                scenario: 'ja907odveddkcrckjf6kkmg512p82z1o648okowh2ghcwhkwqrusr5t91j1q',
                party: '4e0vb09377uenkvn3fbvq0zrxbz21rf49zlscmtk6ge4nk4c89a2ciu9b67itcqzl71rg3r7q0lr8jlpo6el2rq23al1kz0dg18h55yhv3yv1orwafkltcmdudwsvs541j85nca3it95e0wqodherutj77e4wwf3',
                component: '0qteop1dg87j170bjisy71pcfbhjzzzgxcwmxn314y3d7qx2bywmkt696fs47zog41l3giyz2y11wpbardegidwh3k1lvtxwg007pflnwobqw0q0psykm95s81114y3zldx5zq91oaerz9ffnzmltpwae8wby6pr',
                interfaceName: 'je1nbp1yml582pw2lpvtsxn2wxyk9ki3x4c3k62os77bhg8qabtgo44vppbo462humutc34d247zwd8hcd9auec3nsps81ipt84vu602rxyxotm2abo0sk45iv3sne0nnux4l5ievv8etejxiel44579pyvcevh1',
                interfaceNamespace: '44mghdwelici55odsp348f5s59p6e3n7p1b6qw63ynnl8wqai53qtc4nbizywcr803x07dbtgvvg1s9r3l9jxloujmah9687u6lngollqvqjok2fb7psxzkm0kbftjca6q0q4lnmbmucmfh2zkpjf1r5sc27uz42',
                iflowName: 'f2wccl5v1bs14mdzi7omchvbij54mqoajht6uh8ziy2zbq3ppd3531ri1043qxnx9ybzzoviq7hl7k4ekk1vhkoxm8t1i71pnpjgexitpy0bp8vw6ulzpmnrhfo7lmy1uukf25oe43csejb2juj0pmyfu3vcxrbu',
                responsibleUserAccount: 'q8gvyol6das9ntapjyu4',
                lastChangeUserAccount: '7cyjtfp4d2jaezlnjxdx',
                lastChangedAt: '2020-07-29 16:19:06',
                folderPath: '72chtqr7tmag5m95aeatz3e4743tytv4q4fdtyxn9u25nrt7uin2k4zmiyr8c82mzb6hn9esv6cfi4sdzq98cgi2w7gtp5ysvxh1fnq4oh1zxre4cd5ag8py719iehkq5zqc2jn8npwfunbaxz5ku7p3fve5a1snlwctt11zcxcj2uc2flpbh2oi6kfpl4kj4pwo5ux5lyles4djzy3scul5py5j31b8tdff7cfb6ilf3vhdgfu2175ic3stfih',
                description: 'l5uxbov3lufdsqyim731d6jm2prc7yxf958qgc3dgb1scm2lbeeasbiu6iuuz1dt1hnq79hoeoquitavdichpcgcd1dknlb2gu1o953bsrm87xc269eithtw4fr0ylh44dbfnmo2fe21bqn6gp2jm1nopv82fv2hu0mb17gdcmpm2oijahzwk1nsh92wnmhjdwhmk16k13f77ijqgtntiq6fu1m4dtxvy16q59kicpdjfp9k2l2la3jqnhoaljh',
                application: '2jgaqnc8p382y7aht7e70ono3uxi0uesg1qirbnyhu61cusrx93zrzruquz4',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'jmwdeklcowduy769dqi20z8rk5y7lai1vzkledd2',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: null,
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'knuqe9qaew6ugsxjmy66',
                version: 'wci23mdlq4so43w8sane',
                scenario: 'g4j9db0zei9kkwzu6y1jp3nt9r9x2cw8si28w0z188e70ci68ugw0ccmd0d6',
                party: 'd3vqhnrmszfp403nwwhzrtdfshn1t07d2h7hkulgnf45131nft856hj1mksr0r1g98md0c243nrsuhovf4r2cltflpy7b0y4n0aclcixubsvy6r554si8e9tqlcfoz25s80gyoh205nvts07h6t7bfk6ok6j0vqz',
                component: 'vtk3d08qdecfmmgq6xkhom5yljvkm6dn7voj8n41x2bjetmfrrch8sipixp17blh4kcaaxh70ggyscqa7ux9j3p4c9chm5sgckzt0b89gnfgh0m2xxr1ivq4ao9qj3ogjvbzcqiqsxrph4401k1oqlcc0mg0jidc',
                interfaceName: 'cwsobvicxoa82e44t2bl7p2dndvmha9ha6y1xd7v7rivibd6f0qohp56zeziii390pv5kuberd5sdhw2ui51ii5hp9ob9akkn7jb870bb4jkfti2jtp3qm69boc45k8d5mgcty4e1q9z2gn4n8pfech2xw3ct7pf',
                interfaceNamespace: 'f1pvzggnnb4gzy5490vrppg2o9p0tz2ti4yaix86kel0ps3f18f4dsvkjqizy9lzm2gjxgks3t0ea1at8j63qd0i3a8pphus64l85235vfplynr8vcy2p7e77bd59hnjxqzg2nf4lzpwredtcig4jwchg25nx8hy',
                iflowName: 'mi53dy6hexmz0b2mov5lyow78bwsgpyzmvv1bf2axynwis9i8x61f7tqleww1lw5bx5on9ifuoy13e0cb05lwmwk62ha47z1k386flhg5koyu0xgdfimtbmp0e6b92kvmkzsgd694o467ue7un4l3xfd2ehoyooj',
                responsibleUserAccount: 'zqidizzqrgwoz3uzwxl3',
                lastChangeUserAccount: '67yf3qo3yjf5wpl0vxqw',
                lastChangedAt: '2020-07-29 23:41:03',
                folderPath: '3fe2awgqtxbmptnrww0z4myhorhk1j8bsywfalheirmfae69p5dnv9s8qdok3mryrh1oh1tr1lhndtsydhiqbqdqjbn76a0kqjzzzz2c4y4c58we4zxdq6gvdga1mynaleai7jg1aab9nxr7zc1l2yl477b8gejowozqope8f115wyb9x7ftxflq03fmvf99qyx6bf84xpv3p7g6ccp6bjcewu21tvup9hkuewf2vmkqvp0bdqdf3637xgfehpv',
                description: 'xy4totfbj6tq5c5dkozg38hkxdv2bu4gc2sb7a0p9xea40n34zwu0h1t4gd9ij2q6koletzkicwgpvvv30xdu5l2ueyhx1isawsrus69mr79j7vju0rs3rmyfa5hqumhb7diingjc5wajrd4kzdgjdi8jeo7greidvx9x84ohfvf48sfxg8j0w7u40f5p73290o5gxl6ma0x0y95g75aw1py2sbd399tiegxg53z4m60xwwy9fd2by6n2i3b0cm',
                application: '5kskyuof7ibcltxbjvpb4siwj4olwuyi7jybsrt7ahue3nm9xp25d1lq20hz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'aaqcb27l97qq9fise3dr4qkomlr8yjd9pdecnc01',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '7d4x8pr9lq6j10japu8x',
                version: '21n03v3bfzp9wg87zel4',
                scenario: 'uscu2xcrjw65c31lnzc9ffxtr4x3sdupnj1p2xlpiwwa2bcrzwy2i7hximqc',
                party: 'rsz20hq5v4bt49hjpnpou7965nvmaj5a4ctylvnlydn4yiu4jzb2v3qq7oqttidykfh5jqrwpl2n227g1znasul46s5h00n79o8x8xho17impgiq8578mnur8cg37ju60ylsm94v93rchhw0f0vq84reyry4cp18',
                component: '20inlrrxxv76ez60h6yucim00vsvofu14ev485l3qmr9dvxw98358jk3rppxdrnehygnlfxf3qirftfajstn1hdy0kr2o6o71sea6945zmysqkc8y3ynwlek0hyd18f7vk5ceie2svnrbpfxgub9g4qgnfq4ff9x',
                interfaceName: '8tb57nk6w4zguirqd4wnavfpcaszkzkm47msx4o9ta2i5d29sdg2zjgvouvawg9f37k6ltrrhe920nzvbyiaas2jw3r9xncr4rnw2wcorigvq00so90gxs3ryr1ilje1tgm2vx8etip7tbxr957bsjd0m9ngny0a',
                interfaceNamespace: '82n3mef2ozh4shbh1nygoc9cctljwyw2osq3bd100x9yulnnpcvl6zptvybrgl3v1u6oa5st643z3o7v5c17yty2fvx7spofon04k1r8593zmk9m3oldiu92t9t3fhuj82d0ay9cgnahlbqmzi6p645w767ktfmz',
                iflowName: '6n6nawp7ugo7ga4bsro9lnav1k752l6o3mmjhyq748vpt0nw25zycupxaslquun3q742molnxbd7pngs4pqrgrgqzshqp0ix6iu3syj3moqsqwgho8ad33roz8f6jle7g4fz2n4u56o6ui7haqx8pty0tnzrun7p',
                responsibleUserAccount: '0sh4h8slid9nq4mg6jvk',
                lastChangeUserAccount: '1kla2kdd4nq2dpj7i9u6',
                lastChangedAt: '2020-07-29 03:55:02',
                folderPath: 'gg1hl4627io1zm44gw7epnfq6y1d37eklg3hng4soo2r4mied5049tlo01sb2rdw03fd279quunq4f858dcmddsqz69bcpylewckpajxxgo6xl6ygrmvl21y2eot8ir3pwlwdsgaf6ghba461ny69sxip2r4a5tk1jkka5ov3lvi43vh4kj8svv9mrodkoik1onepr2bquuk0u6wj6ty9pw539q35jxzi7lekrmc55ztup7ranee3498hhq4lnk',
                description: 'ha8ip63b3icdxowyt2poxut9jzxkk0l9p8ntpabsfy74428d5m0l4fh18h5scb239j678qtolrz4i4haibim7fs8iqrkd0etepur11i60q77otk5f7n7nr2x59b6ykbzw47qc7ax9m81wjrd7rwshvrfd5vl84pzh24qwv1g612688j8257nepm0toffi2wkqmmhjebju7gfqtjt1svbt5xsrmdt03rszeu7681kbet4fs0rm9lushnmlshgjf7',
                application: '1y9nmffnqwfgx2v70rmronvm82ayrkyk5soukqx7h2klu8lejl947vgzre8l',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: '7sl6k0i3oqys8n7z8s3f8eri85k106qy400mxva7',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'gtm4tn50au752y02umkvie2wzyyjoi7684bex9tzkxwute6a0x',
                systemId: null,
                systemName: '6j8z7shex30e52sxyho7',
                version: 'a2bbi4c38rijiz6y0x46',
                scenario: '7p570ul1v85n7mk02lpy81ufd8hrq8pxtuin6btxb7ubq8ho2s2lyri4ua0v',
                party: '8u92sow7b7cowpowx6p74cczzpi0kjb78ui0ytndqa6zu7zpxebm0liqxwn6mm3gwcrzizv4pjpjrdbx8bhqnkkfgrrgy1j7kz1mwyj1jtbgji0j1gtjtgwkp1bphv2xvi7f7o3834i5ftl8y20jz2d2ke8metkl',
                component: '9w3197dv6t6fr5awgf20reprwnnqkwqst43e398lujrumlslhpe59ndanbqkcdo64gjs0mm8c78b9vhce2bngrqhyr9nvaews803epwbpf7oxjqtiktcuzyw05kukekriyf05gy254k02gsuk6py7chqpjjossty',
                interfaceName: 'hz1wopirugle0mxlmko98o6bdbuwd02ed9azx3k5emrjg5i7iwrckwt852xyz31ll989nbuywir2h6zj6m2mhqm79t2j1en9zytx8de6iroho77f3fgxzvf4pgm3nss7btw90lqo06so30aq9invx9f6y18qoi83',
                interfaceNamespace: 'szprwp22242iuof7ooa1xxl2tuvfxqikkkvg985v5khk049f1pr14jiey8c95grr7hewalpc2qwud07aex6x4yds6j0775vell02yvbatp4n1arux07jp0nuxamfxr26m4ccqcb3mwqvv63f5vcdxf12y751ezo6',
                iflowName: 'qj8m8cm8133r32edagf6qok4mlfqyx9i7tohos5al9qvuftbfcy6yc13rm3dlvuxr5ujcf3192skxtemofx91ey7y5quaw7efkyeyxh0i6mke7wfla55tzyd5qwt6agqipkeehvwt65obybi1nbglbgvb7jcs3ow',
                responsibleUserAccount: 'dt77in5jj3fzzxcl4alw',
                lastChangeUserAccount: '93h6ezvgk1ep6xesn0dr',
                lastChangedAt: '2020-07-29 11:11:22',
                folderPath: '3ddkyviicpr1ohpxgcsaugfjpaqyxcthv41rw12o8rx9vzlgl7t2tpolsqrjkhxqxry9ky34udens1k7z9nljbq0sn4jcwe4woqwpg1g89ulexsccry18ttknibaz2ch43rzbaof2enwasrr8y6zs645bmd64z5oe1i7m46rujjrkuvn3ufa2f057c40b8owejzmb09sg65n307x17kw4cbtfv4349nv23hfpqb0mlrf9bo5kc42knsm4swnu1v',
                description: 'ij0ymou7licim2r51ptzymb235bffqwub8v3bak8oapt7hnzakl7v0r1vopifnqxizbea971ra73r42vdu6y2kogepm5bvoz5vibw9ypu6lggk07dz569xu68msfcqbzgxpxr9u8zcnz80umrtb90cu5yega4a80blbymd42rkhqacmzviuh1wvjy3fudjc4thw0azbjvhnvnpj5b29uek2jd64iybtw576e9xdg2mhxns6pkrqf6o0tix2bi9i',
                application: 'wjsy06wjdwoxnnhc33eod8k05qsb6nj6tiyufxsmy02e7wq1dgob9fdnizhi',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'f586izwp3tc5b5tokm5exu4nk8jzczteixf25v6p',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: '1901h7g5zouyn2qnl9jd7v7j1fcqpv9oo8k3ys7rkxgeoiqi30',
                
                systemName: '1gra8m3e7xpz5ox0g7zx',
                version: 'ed63iay84k0skpdhhwsj',
                scenario: 'ax57m28wqjuzfvsc1tq5iruylrzp6w5evto2w7uyrzg6zvz3i580cn4pty33',
                party: '6ijlmfjw2niw1llxwn0dqcjlrwrje40513l0clp7zsltysiz0niwdvwn1whr5auf3mx7v5su1l9ndqd5qmhx21sktqjynwglnzygo4pk3qwbwawju1t7xta1qa887dtj47g5cn8vyfgb30pubmbpmplcqbyz04g8',
                component: 'mt3bqbe0u8yveyxpku9f629xwprd06i9cg4jvygrsoo9x1p2on88i853ugz6n5v6wpgyu3h2n6bbfs02kyrz50a180exi49zldfb9r5v5zkwt3byeej9vt89h7j2ucvkrhw2qsvb2ccnhy8a2mcu2jw9vgcnepq7',
                interfaceName: 'dsyl6taf49jauax8505nmezhr6oknuobu8an46wzkhzvb13nw1xfrbx51ohn5jwpbpjytfow3n4iq5w0p0jo448ftlnns9jcn92gmpwfv2jcasfrgi0h8izf8dskxgzyxh5x99t8frmd52mcm1jmpha4up5ffqvg',
                interfaceNamespace: 'y995spdbe24crr4tevyk1o017c1lxb5nmnucqc0mnqapliqn2ww6g6aps7z09k8n0vu8l7botbdnl9jho45fjqhi62q3k8aye54gww8x0cdg2ymtm8tdkcomvlujzas00dlr1s2mbmuw27d9k7c9573vy74a7dm1',
                iflowName: 'wd6sy8vnuhouz1gjny1bqqip20iud0hpfa0cyvn20a658y9y8xohd0mq1fm49q3einq106h0puw7w41om0tfutjbyui9fa34a6v3l9mydjfoyti9xif30crs37msex2gyxdxxfccplv0657z2r9lmi29sh7evtir',
                responsibleUserAccount: 'gr0xikv8xb7ya4jr6mqw',
                lastChangeUserAccount: 'xny3cdudtd2m9a70zf6r',
                lastChangedAt: '2020-07-29 20:29:13',
                folderPath: '4iu9mj081i2tyjquiv37svofwk72x7j23bkspby2cwfp593jh9p84t2f3qwaqi0rbodrwf58c62587mvgp9tci4s6xkd411ydujyurplte964lg7g5udmpy7tvaumsxzpqq5k4err9rwmofrylzpziruyi9uempd4od5jx844p8wa188mxfmn5xau3b4mzhywyfcr00p4fq7gmqf74i723ckbur7k4smoa9wbs5io19hsfn1k7ylzbmkr6yu4n9',
                description: 'ynwsqfo6fx1wde4n2hzatcbh226g5gcsti21y3v0curvq908u42zsjs3xidvy0zrsj0e8bqfz51n9w2rsj11j7mls0afup6kftyhim6982tr8kcubseziayt28jk4b5efr6gst6vij4i82q3ra70jfo522j7k9lfebuhnf3pmk71f9m6mbqlovouge9xft9zek7po4mfskk4kc7vobpylim1t9hhzgocfvuoopzwi9smrfx0qhzy3tgt9e3zm6t',
                application: 'oiqrj2031jva8gtyn7b64oilcvvczjqpoad61quk2o1t1fagkj0hcrzs1jgo',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'qt2xrej0t5mkpgt2hrl7rwolhsappu1wi7mrbcbj',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'zd1xj8fphfgycop02mbke5qaif6ewk9z5ope2y12siogxuzd3t',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: null,
                version: 'mpvvrhd87v5id7f6bjib',
                scenario: 'qr329r4hvftchtolm86x5xtt00gqke0yoojtlo6eje28guxt1orvblcdyace',
                party: 's44aai6bcgwy0t8xdtogzczq8o9xi5yv9rh6g3513hcnrfjyfuntsm4qlfkx45wf6j7v7msdz0kg6srljfd39sdpuomuiteqjc5x779dadlpf975z94yj500q2a50qynwuwqhfl36uge0deohhg7iot6394l4g1s',
                component: 'fz7pcb4odbm7qxgfcqmetx2ztwhkwmbvvoyi4213v8q8zmbmji5uzinx1yn973rcg8eiukg2jyitqowj30ay89csdplkpv7m5z4aq7a8oe7e7pjzd2vsw3a9xviuepwxo97kffsq3fmqg322jti2liaaqeds8hi3',
                interfaceName: '4bw4gv3cmcuipbmrfehg5q1832e1q9gfr5w23pcc49sgbzk3qb2ty6ewwgibpaeeof47r9gabtc5ve5xgtspkyf0wxit2m4hupplltjq235sazksy94veox3sg683qd8u2ylin5ru0gqsj3s0ni0ql99do2seynz',
                interfaceNamespace: 'zd4cmrdnisx0wfewpenc1wbc8yi55k4ok0fca9fjqthj8cyekhgz2ywa8xskw2f6t43izlft579dgr93if4or8ozivex97j1ot0vt0vmksqnk3bx4dy3wpkgvuysg2tlm32dadvn1yteuqnkn1qpp0alcm8788h3',
                iflowName: 'nzectff5kmy46jbhpih8am7b5xj6a9kkkrtmwzamdissbpgmkurntryz3imnwt7ftcj0smroqv7ce8lloyoap4yk09maqka2sy9jwgd8s4szqtlzhhj2bsdvg0kua6x60pvrbto6s43g9fn411ktdjbgq7z7b1rr',
                responsibleUserAccount: '4vujyeviienj4ouyihho',
                lastChangeUserAccount: 'k9bxzbx0e4puhjqr0b4i',
                lastChangedAt: '2020-07-29 11:36:42',
                folderPath: 'e1fn070vsk7aolkay6z3giz23dx50hwvlowso4u13lbccaawfeu9aaw66wji6m489y1bg86fu27l6gi9jbxmqikl6hpemvqaqcf3jx0kgp4tchazaaotcqvhduj04ij5wo05w8t48n2qkd4d2ml332eu0p8gi1oamg2qo5c815kswj8fvxdzf8ztsv4tp0mm8v66kacdjn7xw9gaizgi11zb3koji1bgllj20quq05dfi1ex2qf7d0thzeq4454',
                description: '913enfi0t9vr1x3gs9omfit9z8qj4bvazndrqz4wdvz1wjb671rm55o4psdpv78zegam5ojdjunce1klqiizmzo2dk0wtajlq46mv23d2g2p5y28th44n2wzidqreuu3r30mbvnkeggr9wz5gt1dpxsh8iuki5gxv91gl8vuvf1onnu721ov9l1uww9hpanmtymnshbpg77d9je2omrbi44xpcxqz2sexjecisn329hax1c8omlqee8oos7gs3o',
                application: 'ph1tmotsftainkic40w6f1gl8t90z05lk2w0jxjbbjhn0em5sibx3c2sw4ka',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'qhsrel2e0biiz0ffndbhcb2v2m0pqv8308uhtipp',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'm9x2odemgch4y9n6h14fv4fo989jzgrdu1ar83ik2hi0ne479d',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                
                version: '4wdd6gmdrod3oed00x0y',
                scenario: 'jhfh6fhapcwg5a1otklnkvx2fa1ciahazl0q1xtlxlshkhz91evrxhru0htu',
                party: 'sx3r9hc4w3zacvdgagdpv6fztpx2wvgdorz1n3drmp909rdfgzfe877f7xjgzwe7807ea8zv1m7jseri9mpv8n3bscy5x97yrv3tw2weddpc70estv4xd223rrq5u2v0m1hptc8zr147d6hf2194jb8l7v3b1ysv',
                component: 'p7kaifrhi67ntmuqqu2znohnui78hlbkv3gq58otbv2n8ash6vgyogiieq3oyhd1q4wmtj4eo55rcgtcyr4l3617kpb9w4r0crfbpmpw2ksppykigwkl42loa78grwuxdm945ktr91agd94yl8b7zkhztevzb9gu',
                interfaceName: 'nhglaa1k395nv6ed52fdoa9vqn8p46ma91eidh65rnxjay6nsw5yuejgolq3bg5s62il1ay795u6w42cwiujqbn41qf8fysgzg5aucgtt5zbuo10o1dff8mdxuv2fspmv9dg93zpbdszs9njy65y9auc2wqcpn75',
                interfaceNamespace: 'wikwjgaedtqdu6tsz70ex30ttap0r0x7v3ytj90xk4tl8gahcytoumkzpq82yiwvaw98ad6vqfcts7qnhvqti65wne4x2hz90w1sfd2xmusliksoq4q2ydhhdhz26hhqs3nxtxq719i54zlsvf59197mv4w4fk74',
                iflowName: 'c4lhgsfunqtjaoqww9ckuqf8cxnpynpyl3gpdgqe6wzonhqwihw5diu1pe706jjerjj5526lpz6cmvd9nk5p4z6b1hroicqpf34x6b2e19q29npcui3vmhg4hi1qnjj8hntjp0cpy0ff444yicu8pbdweq5fjm36',
                responsibleUserAccount: 'sncn7b3ttpchk9dq2vz4',
                lastChangeUserAccount: 'eh4cmkeyb1fhs1yqmnpp',
                lastChangedAt: '2020-07-29 18:15:46',
                folderPath: 'srih1pnq22odlxs7wudp4ubzvvs55fw8p68umt05p9b2h6p74ehcl1clh2a3tg8f6z2mp5mdldsx781dzfg41zwb1dul8n7fdx203zlen5e84ml4adpsi8iucwec3nfxbtr0omi8sj1xhfit2irplp7e01al5um0q9fv37zf233as3j2ofo967ipbupgve1krrvd3xe84mluh7dx5r774gvwcxjlf1e34yde24vgr8s7amh1jbxt2cxnkguus32',
                description: 'j08rvz1afonnbmudevkkzylkkwnslmz8x854r26hc7v1u1r0goo21mvgkksnetuzyjn6l6qbwb9o0vgxm3r9779wdwaillih5uz6gszymo52qquezs63tac960jgod297cz7tp6w8dlhkq667xufw2la2y1i0l3p3np5xgclvz1r0qcfqj1ajhtuimxfq373ej04uuijji9m0tn1p5gu05xhxq8jtrmylugsc5azu3tihxx7zm0wchnax9s12cp',
                application: '7pqt6cvg95g55p035bvg6d6pv7zr6blymugro12cgcb5a9enc82b7xrvmn53',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'l31bqgbmdnyae5muykenwehwwihffn7gjfkecct2',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'z19q0ity1bcvpn1yzrahx42vdjtu27k93vku8g2lul1skjhrnc',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'jrrsy8nc460ddhraptov',
                version: null,
                scenario: 'nejaf0ai2v9kkt7l8r3ti7r6ve28yp967mcv9gdpod2s8eqdmqa10ei6ov81',
                party: '157bgpr5qitdzdv1qlv1kkshh5oaqi2052lx9i28qk01nlbnsvljoicvuo7dg9qmslaa15fel1zlejhl785r13kg313kqz7fyjksf2s9hc859l72l9mmv9ncgnqybvubenwcn4akl3vz9mpvfu04rb159pxp3i12',
                component: 'kbys8ln1vj971w5zfsba0858sq4m8x6uhirn6mxtbpqaoo039us3easg2k06te9zzk8ooemt8pnx0xs9rc3e71yfnyfz9ee3mtso6hdqcf40uudxi0fzu85osa1veql8xf8uc2wdx8ox7t2powls4y80h3n7k461',
                interfaceName: '4yu33kg3l55q434o7dgkhrmcxd5bfu4mq533q0dx5fv5ilecoeqodt8k2fmocbvsyunyv8px7p64z1zb7lrnshh722go9tr7r5rmg1qxwrlsqur2zk9eled06o0qhgr7s2neywxcb6ftzt1que2abewiauzj8lzf',
                interfaceNamespace: 'itu5ra4aevkqwydtgu7m7dcb60n7uqjhwq1wvyxros5v6wl1fhjgl9di8kn1ge422kgjf1w7cx02k3jxcai8325h9k85xbcvsfzwarmd8gq63tl0oojoshp5zrxxj8vvzdocgp4lepuug21lawarr6609nvboooh',
                iflowName: 'coh0yl0n79y2mdaw0imw15dfxrkay1xklk430ubv6ns4ud7oem1f92zeoasupg133179adz16c3z7fib5hzykrojfdzov7lfvrwwq5x58vpmawkf4gqnw57o6cr03h0kho8n6ooepdfx98qc6xqe9evuvb30w7ye',
                responsibleUserAccount: '4tn8v5xu8dz5qzogx6zp',
                lastChangeUserAccount: 'bqczthdpconwcgokzoe3',
                lastChangedAt: '2020-07-30 01:46:52',
                folderPath: 'y59l1551hc5qtfm5bvdiw45mrnq6saa5jq53kigq4n3oesssaiwhoj1prurm4tzljl6b8d87bo3tz8t7a6apalyljaf1tvhf7w7a93cszmi5mglyzaah3v9f2u376zi51335z1pt5684qljbdrkj5cut2lkz6uwtgpb1ajm148n9fhl5nk9xf1vlm71zp3pflentog8lemy0n2dze2ap7imixw5db3p7jk62z6gcfw66qevfzkn1k5vn7bbo8vk',
                description: 'ds5f5u4g812l4dv3q1o1thi1kabo5fooe9wdrz13b1h7v6ddscpid72pzbdzpv0wvjq84zdh8fqvoau13oyd5547qtpdxjtodpc2b2plaxw34uwjlxyvt6cl01u48jjp334rinc4csn8vno18vg029ytpjsv8r4du4urcj9rgmbi91bhdhy7xz49nravoujfvqvlxgn9zeijnss0evpsp6ykt5cjbrgk5aiy4nvfks2w558f5guf03yh69bfptt',
                application: 'vbouz3brzm6fk1t6l4m8scpkht32f0kzj6p12whk775uiz4wi0pybbm5jle1',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'fs24iir4taiqhvrv217m2k9gj7acxyocg7c3er1a',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'kk7lg7n4qigbjlf20n9p79gfzvm8t71en5iaj1d9nqjfcr7bma',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'dqcorrfbweenusfqmvq1',
                
                scenario: '5285fdq485ls2uedhuv79n49kxow4sjpk1pcos3vq4gnuv7694b166vskbv6',
                party: 'mysuzbjra0pijdy57m930lqumdjfhljhy9omgi2jsdjqsxo8jun9l4kz58gx5glbmnerw45pzxe4enxcjjm4n4m1stvwb85mhkqt5aj4ayw31gle220ew59joxp469hk4ftsbcufb85u696b70vq0xdrosnfnors',
                component: 'n2vs3aalo20060617iyxr7lz1ahk3prt9bwj57dnih8prl0gbswet6k0mmjdmb2e55ek7z6gn28pgymee6lrib9lduz6rhavo99b2u76xqkgx0oarkqjm1a1btadiwwng9untu69jvyf8h8n9v1je4ord8pa14dh',
                interfaceName: 'wevkr27777mkg0isxsotrlv2ixuobeoq2826xl1nmldthppasx5xptci9vwwk5rmpa54r8hs007b3gu9n4iyg123fsv0y7g0qc3cyz4f1r0ilsb4euc14b6wuy97ixvieep1umzjb85p6mj7h9yxikbinl1pkx7t',
                interfaceNamespace: '81k5uhwymbzfa0gakw830dy70fuh3nfafkqy9ekw922lc19akeq4n0y1c6w6fmck35bh2p2yf21lq756gvbur2up99vtpt78d68vkpq2g07605gedcay2c7qvom1vl6boe61qwz865wgl03zuyegwsht91fugxtr',
                iflowName: 'jqyuso2t81maplqce4rn31ui0u3sovhuzhnpxrcoid5u0qz2juvylcrzuy0lqf1t68k1lb27hivafglgzk0orgrwnjrueusjlfigp6g8nap6yycx6z5zlzs139u1prs42hf6q92k11gckawc6u7elcz0rvaecrn1',
                responsibleUserAccount: 'vprtskj5yhbh8svul4ov',
                lastChangeUserAccount: 'nnt80bctnjry8e3bif79',
                lastChangedAt: '2020-07-29 09:38:38',
                folderPath: 'etk8aaxfqcwpwgr0zj1qku27nocofwmvppfkb08tnljxsb1vi0cwlufkdekdv3zlcpl6ipppbfkm5o41zbfh4xiuamg5ese4kik657tzatk7pdcih040q3sq0cr6v7mgmbuc84us8ggmzkao2lih1ejvflpia4vw4m2saec0y8bzoy13ywibtvjscwbj4tkf9yynbyn6ltrip8b8hesf1mcjs9xqko1dm7fs0u9rxyl5h3t15mr7bdzofikafo8',
                description: '8t8ot0w793iyr3x7uu5xxm33b403erbbp53hwz4gzpzkgis6yn50u8fvaqze43neklt2sax18ujqeu6gz3uziu4cpw2gm3oell7rjxy6xgd9mldqtx98fpgxmhime08zs9bdnry0yi3368qah1sjh1lg5w4p0wlzbv7a4z58cl38a47q7629qunjbw7juodfkg8s9w54es6jvwd394xvnr1kcpuzjtyma244en7u9ufunwep61b7ats5p5p8y6l',
                application: 'a0dyjiast2wrf36uh6mejgw294jj5tiqnwatopkqxe0g4wa26drgw5hrnbav',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'q51kqzjubrg2jpw3pvt0f3usfmrirewtqbe90y81',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'd67cahpf361lf1hdf6fs72ky1m0wxmlakkf49exfgdaz77gd8o',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'g8fvhu3u32z8kr1ev4gg',
                version: 'wqr7fp2hveao475akr5w',
                scenario: null,
                party: '0rfxcn3dpv9mdohy5y5mzseg0x80u745q1xzgguri8ntiklkoqjb37idkl6reuiw8m4epgt7psx7og0uydivavo2mln97914q3af5ar30pdxy7346nsoogxmlj91yf9w850u9yyv8vkij395aymni4v2b28ppu73',
                component: 'em4wx23goh741afe52aymyl2bseb26vq3x964m2ywjfitgb86avlx3gl9oqe1ra8zfbwr7wwiinosqwkmqy01obam0we10oqrwdytsl2b73w8573822ns69086asbmham1fec9jwfcobukvcpfdq881cmcdfre0j',
                interfaceName: '7qdcdh8p783388mzj73q17vwj3e0kiihapoqmynv85f1smyxywwu0ug0upc0k30g0wgaxf4848smom89m7u0gg3ey1mu37m5s7xwv3dvwh3dvmlw64n2sce6yys7d649l1kwuc9e7zwjabjcfl2jfua7ist0ro1r',
                interfaceNamespace: 'lgb7icr92vfi3cj45sth56k2iidjkbl0hnuhbn947cz9f31v86jdwrx7t4dridv5v1fb7erzu2wiv66ewuu3ul1aelqo2i3576t671bo0z15y3adyyga5b36995y00yr35qko0so998fakasg42hudjs15zj0mxc',
                iflowName: 'dygjc9am64mf29k4vbp5lkoe3jsdysjmykolj0zpq4ty58j24o06ywpqo2aszamqzjs8xxkgjt23ra0mwf1rwrfckpadqyn7gzcret59xlsnk42wjzd79tbbez93ubwcqjh151s6eivatvhxzh5rnp0ogl8bffcx',
                responsibleUserAccount: 'ipfmnfx56laounn2x96i',
                lastChangeUserAccount: '529132tpcbxgsa74a6ax',
                lastChangedAt: '2020-07-29 09:47:03',
                folderPath: 'gfy2n8d2g2ct7zkkzre54nwr0st1edmxrufowpz267d1mg21r3mwmkly9c8diqqkzbmdljldx8e3wpg8z2bog0pfjgy8u61obn1bjdyog9eqlzrp7y22funuzxsa9aqrybttqszp7dlxiy7ywlddt1mee2efyqj6xra4ne01o15alkypm5fismjkj1ey94sg1hcee14a9zh3g6c8jg70844xqku5xxxbmaxi8ckm5bm6n93ippf8szyshj5yyuu',
                description: 'm95g053b8ddhoc48jz54k3s67ox16t3xikd3nw5qgbtfl5atj7i7vd71dqoz148qx0c0z02vpezrhmejvvuyilut7zdrxhlif62ker3n9gieka2k35ov1ad9kpas0emahwp9bsq2itfsbxj7c35brdgdd32dn99u720elspbwbu0lhz9lpdbld2woxuuz1nkecnslze806qhjfpjcga3xjj7l33kidwxvsf3kd8lu98u2wp5jg7yuow6vbn29gn',
                application: '5c71eohc0cpswq4jpja9qqxgxkw9gx3wjscu92bon7s5z7hs4sew21ngs81r',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'lafpfzxsf9r2woq8w0r3e49y61qhoir3magrlegw',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'dx66p4nxmenjtk64x4js6hwmau6mvx6hwfyblrqlv5kcm00nn1',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'nbvizbyr0xzg7k5fz36y',
                version: 'd20676sd7ce4o7cqp1u7',
                
                party: '0dx8twirnbkrivtnchfhvjknx0navhcyj12emc5skxg5ulvb4e6r66z512i9ujamn4ksxrmiht6gwo4728xao3p1rbstp4v1171vlj7f1o7kv1r9zbrjv70vriypcq6pb0i6q885ftls9j0n08bcmhrjdb3vv7cu',
                component: 'urfvu9peclt69gjwkdmxvnf1g5k1x1zi4avzt9o8xjgq1msc8xz0rgtyd052tvh4zbvhju944teni8w9xhf7ldbv88ysmdh6dmay2xw8tm8fzj6nhva72t6nj7jlmd3suuoj69y5tbagngp3zo0ulu2q061mq8a5',
                interfaceName: '7tvat5ed3ngrs5l2k2r0lwfnh7o3zunrr2qibzesfc4kca2oiunkhyf6nuqjeo7a5bawnkjsc9omx4qxty4fyfrus6bvjeimrph0sl1ljz9r53ovgilyz4hvrjgiehs8wpdzus6mwf7pfgru44cfhyisldyw3390',
                interfaceNamespace: 'kv887g2ct41e0lvdfazw4isuzj9itez95dqgwam7mzmu0ipxxrg5ujwsvn9hpr414l47674h5ff4jvytl0dj735z4knkpk93wgnttsmdt6rwq59mv2xv2ow2x8t53g61me8muan3yjthowib8gz4bnjx3629gu9k',
                iflowName: '8jk9jwwnuygx6l44ry9fmli2haz5953dgthblz8psbubnrkeqti8r8q25mx1oi5ukqjk3pgdvx7i7fwz6kbv1hxono1xwh4vryx4s3qoas4v1go2dp8cgr8yue4380c27dl9iioi3phmclc95sbyz1u5l0o6edzf',
                responsibleUserAccount: 'obxvmogmifgr1jk2z8ps',
                lastChangeUserAccount: 'ctfwfr6xbpj3fuk3pout',
                lastChangedAt: '2020-07-29 10:25:12',
                folderPath: 'y05duhzbj0ff2qhgan8jpkdsxne824axcb8qeyt1f7t920foexqjfvq43wh83mo8uh8ggifar2vymx23bw1vtzrxqw2vaz5xwfkbcyj8wrwwt5dovq8dxgq7z29379xr01mir7ak54emgn87rms9890msni4opqhb7czbrzvq9nlipw9wfsvbtrbjgr3so5x1x17yayglbyrfsyru21bjmke9h10l4bz8edcu90yaajdce1ep6vi305ftbgvzva',
                description: 'tjybsn5r1bq9fybew9ykpyzhmv97qx1w38ev37k9onemmzuapfn6tzwfephz33v8nc56v06wzrnx7liq2arqrhonqg2cow4xcmtk1pocg7a65taiq5bl9qlfjz989e4ysigd1xc3wb12sieujfpuxkj1yrtc694fm1cuzvxm95q5d098we96xys6pve2q0vhsswlm34fvwifythjn1fn4c2qs6u786k2kbc9ypk51qq3u2a17vzf84aaogoechl',
                application: 'vtz417u3snsoq3ldm12lil4q5zgo3w7klvx02rk77mmnmayoq4qb8y4wpqx6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'dmlpjjzcuribwlpjm5btnp4tml6t7kyiqlwlqsqe',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: '8lt1eqt3re5shl7s5gbvbvccffgrq6dq7j0zbm9x78x18xwm16',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '9jo5me6ibf7gr225n9dg',
                version: 'a9gyymnz0he45yl4uga0',
                scenario: 'l11t1c32qo62swe887xihpy1681t12gzg8yvtozi2mivx3uhgifjag5oratj',
                party: 'nln53e43nvnxm8e1toueo41dxjorb9tlby4803kemvclf6mkrefkdnvsdl7z9ul39cvjfxsskw1ik6z04j6qpvv00dwep3om6f9p1wi8o0mcsz9sv56s7ey7jsup4uj6xg9wbzuiaxuxtvgjl7uussfntbx8isow',
                component: null,
                interfaceName: 'lpxc3l3ol5fa6dnwm2e3hp449w9ijxpm1rujizgh5597q425xj3v8c2s9rs61agikj4jibzu9yelcpnpjiz9p4dggzvff0jvdxrypof11spdunhc6hc6tlo44poy0k9r3tpimh9asd3whdmjdeyq1celo3qbie6t',
                interfaceNamespace: 'dwb30cp8710fprk6laj32ek9h1b55yyfqt0qk3mstyqk1elf5eyh16z7kc6zwuk1yukzrcws47pyqeg2gcyw9yqbadhpspzaqjp1la1n81gw9ed6k2adr276n52vfkxjkgya5ly7mhmxnzy8idv10bc496nhu8kk',
                iflowName: '4253z31inpmv7fwary6z2aeu67bsd9aj3f89wm8n2y2phijje4nwpe84yvfe6ofv9n48zjs0gafl38ee3l3dvchgxp15p5w80gn82gq3vu0vvlvx4p0w9pggllsc3s1sbhr6rt2ly31f99qxtg5cbngyq8es10fc',
                responsibleUserAccount: 'f0iiku4qpdjya298apkn',
                lastChangeUserAccount: '8cb2oqrcpuwbqxmq0cc8',
                lastChangedAt: '2020-07-29 19:03:37',
                folderPath: 'hvzzoyn0i89lee6ehqs9us82yrpbe50vzehnnkbrkync3s48h4bzrzthmfms2f0khmfqn4m0sfa0rfrpiqkl0emm98d0uruh9zed18dbqgcqx30ttaaftpz08gzx8uufphstfk7i7zycjfgmzn5yn1nc5qv5klzae7kzz5bqn3uhi3o7qdli2ol490bz162hmg6bqn6i1put84sysav4kqn8rgizqd3cehb46pk18rh8lp0cnn7xiuq1dmeg99d',
                description: '47ovuwrllo6imta24qjjzhzca172j5pj133y27alb58xmpeeqvy5dvfr07o3tqlmskhi0tslgo3w1qkxb2l4yt102drppgcusmj4n7b6gh37ubob9k4gwiqs589n9oh2cq02d4pbyxfbcqj7tm6sibo9wumt2uxzmyig37n2fkir61lrg0cq1kmqkx6nbbi520a6qnyfcpnaclxfpp1853hkzs3u9a01d7vv21lct1i5oz17i0vdf1zafksmwhl',
                application: 'z197v2xjp0i0991caw4b93elbxrii8pawjtia9aeyujc9su3gfncdbvxhz9a',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: '0afs0248nlu9cwc3z35wto3dc8n0iqz0lbxpjagk',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'eju24d89tl3jkvc6kqrgxz20gltu1zds1o71q4ui5w4ouzxg7c',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'wp8nd9gfm70kla56iwnq',
                version: '7eosbdsrpb71kyd1e186',
                scenario: 'mi8joejijsl6swpvnon7khomssvghg4q0c235gjy0oq9mxexq21ide49cxj7',
                party: '0j8wd9zbj6jk8e7h177lbbeal6edc8aqqxf0f4r7vthafi3dhn1pvsoitbw4xulrmry2istw01r9kbhzcxi9aciv4dp6jacule7netxglhac31b1nplq11ambnfseknag5f7oym1kdxy5xtcrm778wu9k7kr1ia5',
                
                interfaceName: 'm9qxmt8lgtono89xjcnpkp7sw7xe43sjpe9j40rfbcyi0ybuj1a6p8te0h2jdaodney1ojxgzgpaxqa6xsntq1qut7hrgd3vl2ur1thvx7c5tucf7lh1036qsa6qevfhw9p73hck0ruj627ibl5g2zwq5oit095h',
                interfaceNamespace: 'ef761zljnplluc4ssd131s30mi9a7wvz6a8d4szti0v00njl2tj34htixd2a62ot0sa6rhqcif37zqqh96evkz32rzrguch75h481ryqie1j5g2wh1py8qzgizhpfdkav4j73oib7bwftfw7xeqby76vrm4u25ro',
                iflowName: 'c3bdjdp03sy3ydecqif075542h1mu452oz1wpgmzfrr5yme34eh253vhpb5x5js2esu4kz91l520zdvt8c182y4cb0iox02p7qlvn8ipdiy2xj9ifqmbgejiq9uhpc65l9ytrw70th4qpvp99c2ib8ii5lxanlyg',
                responsibleUserAccount: 'l6zjxk5u1f581wfg90ox',
                lastChangeUserAccount: 'jegjfaq74s8l4jvcmo01',
                lastChangedAt: '2020-07-29 08:01:33',
                folderPath: 'ncp1jlkmwiyzo24oi4nl7pyydpqy89rlr4ytmktvx01qo34hjgm1mo350wt7sktrblvouts7uzkvh46i0vlyyz0u4a4v9u48ohk624m81daac0bkudf3z3t8atjn9h2y6814khr5rxzw0iatdfx4bqsyie3kqeihudaiu8iawz2p1kx6qvg6ky05sxpn6t3t0x239rh8bly67ecq3iepgspfdnon20u2kk2m15a3m0gsuya6unzoa1vc6mzb23c',
                description: '32ga2g0jsmacqqccx75tsntzvi1khy0by3036m2ugl2129il4f90p6l9dtuhg1pf69hfo3ogw3zgjhxlvkm0y401xcld9t407xo4r78lv8fc3vxxgche7krhhcenqy06buu59vdwatmlhgrv63f2xv7ioqj63xiqfcymw6il6pdqy92r89l0sypva15f6zv2s5j7zjkhrhqpfo63j2q1fvcozb6n8fnm9gxpnqty3ncqz2agmzb7lyet1msnsmv',
                application: 'q6nua1ut16q2bea2aqen1gvy6k1elq19y78zvnivnsznpaf78qytvld2xzab',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'mshs4rv2gpgsyepxr7vsl9mxa79r1effts68dl25',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'nwi0c8q3rmhs866c0zsxr25t3lq3h06dvwczowatv3ivvjuuvo',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '8yex2qpkwkw0ijrst07x',
                version: '94duda3915047o3blkxl',
                scenario: 'bh40x8w3l99ua9m404uqn2xexe6ydwi9wg9grsmarlv4bh4vv40xpccla5z9',
                party: 'ofc2m6gwy2deexl17s7nb992w96utle5hgj34qbjog0k3euu3mnk6p3oyc8kia13uy75e24wm7kasr759wshqzz0fkjnkeloze37bbwd18626sbd0bscck6swq1i1bqgdsjl9qc7sacfjn80fleyfvh98fls7j33',
                component: 'wvzytsjabkkliqiokjplrghwb2mkg6gaqbsyv2p2fpsrxs4twuerepd4gueb0zipuuzmcefd6a8epc9ez1uz1pe12r6pakwb2azqutubljctmu8o01k9nw4kzz00af79mhhwjuqw9gevu0jmfl74jojh8srp0xwz',
                interfaceName: null,
                interfaceNamespace: 'r0kb773sldhr6pkq4h2paemkymiwm22nrvpiv5kx5gdcih3b39imx6ygqkq77umbdczuzu9htvvh9lwbqqalgr8olgw6a8dtbq4m1zti1uy0dz1ral49foethftasfzgkov6std0oae74iyfx8gisgufxbp9fj4i',
                iflowName: 'zezq2lw0c4rsy1bx6kj46f0pd9j95qmab0djxoq1q33igf0tnyi9kv6qabz9ympqsc0pbtfntmiw70327m8gorq4ici4eqqkmkl7ctax1uzsa3fnreh07spsqxfa3h1ckp8eoybfeio83i9za018rwbq5mq1pdf9',
                responsibleUserAccount: '4nnk4xczpdxf096kqvhx',
                lastChangeUserAccount: 'odgm43tpueyn8u1f6muv',
                lastChangedAt: '2020-07-29 04:51:46',
                folderPath: '6cjl2dosci8d1ylcp1pd95x7ks8jvr0k7vglmopgp72sgms9prtcugukhp2rlxpqjlrhb4us9qimki0qt6rd9ov1sjqvpkawhi8qs87lot2daqi1d4cvppo8pkll0kbnfvjyae7fjdcr95muajwpavrjn5yq2gsje79loxvf4pywsrim70o6gqryncdsiubkt1zaznoinlxrq6au2pzbtog2fza7xs6bwk5697eyori8uqezenu1qg3ll2kgyen',
                description: 'xfk6vtmkbr30jlmn9fpb07gvaxjq3i9se61062bi6iozdnl7leo1q76qjk76lx07c62j9hh5l8cstj6hrsnffo0y3tioekmqlpanwvdfqu8k4vuis5jxeasg602ks34ifia1s8ogike8i5u3e8cmm57ewi2zyznzcqpfy9qz5ziyegkcyo5bd0zd0vzq61gbxla0s8q0g20p9akq1uwnvkjl1j5lkdhseexm4v4d2j50kmptwy51hz0cmlz7fs0',
                application: 'anymxazb1yed5mwx8y739dy6q6pfedayujtwmrn6b9g320tc5djx72rzhndj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'p5hqkd5gvh9zpb2xkbkbu13ujy04extppz6q4w5p',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'gxkbggmwk4dzgvorg5u6fwnkhdmce4avniz5krliw2lkenplun',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'nejrx1ydk325nef7wsdw',
                version: 'ofud68cf1yv5djule67v',
                scenario: 'j9iovqnnn9v2xsas5yd65x1bts4jvxaipi03062nteprrpo2mz5ddp76vv9a',
                party: 'sbhpnvr3gtmwni3opqb2vzx0gsomjxr6tsqjpdmekers2opvakds1801mbhkfoeb9w7q2f2ek38ul9a2vr6i9bmw9g62awoppm7g9ikx7pbvqpd3l5tafxp4ofqq230j292eyjhj2axfwnh4irtrniln06x4gdjd',
                component: 'dvbjkhl6cawi0luu41mb8al2j1qjr2tg7eh09pnncbi87pn11hcxgps80ji4hpb6e2cqz0vr9pbv79tn9txd7z16d9pkjb8ud84e1ylr6igbtvmwietdrzplfq4bfazs2rwfgjqzmd9o79feqfbgnn1uyv5trd56',
                
                interfaceNamespace: 'p3cso3du98fuurgvrfuzfwftk5634tzzbagg85j63ypfz3tg1tgheal6keel4zt5y48rd3qv31nidwcekpesj1oebqtvhllk7qsii3n8agkyots3vnosocq2s8ip26k86rzd2g9eb08byu6y6hpaniixm5hwu2xm',
                iflowName: '4rfba1sf2n9u4oqjpx2xqkeyy3dpotu53hl9o6l86iuurkc4krctgsa08kpoud2s12fm162x1j31683346jr1imkogkk0raqot9tjfc9jnhev4wqsk2f0hveh5tfasaauqlu75t5qdqwbn5xymh6eglgw5fwpenc',
                responsibleUserAccount: 'kxxncfjuepff237m5vak',
                lastChangeUserAccount: '434wuyiblqf7gibxhyh6',
                lastChangedAt: '2020-07-29 08:57:49',
                folderPath: '1abe31lx3h0fzwtmhqaxkq7wrf3hsi7eaxpxe69uqxdpp3n63oagey6vd0llmb9btw5xzfawgax2afcb3shkxzh3q05l3x7udtbhmg312qffwyj58ldau97b0co3jyfyed35ez3uh8y85zqnkxf3soz2au0l1y1072302jbjrd8vpu0fofcx9nw96n9cq1sh68g0lkbw97q02l3c9w1c2f1giqnmsxjt51p6609riaen95252ukog19whr7638p',
                description: 'pts2yx9y6ge91ttaoivadsd87d43ujiwxq966u8zza02bq9mx08r02yu0x6kvhaaesv7l5j3znuz12zim0tf4efzoudxp5dmq3knfbdsfe11hh896nntvrie15q0d04b3o69wb8fo2t9odu2cm0sm5rysnl8ddwfkjx48cra8a9vtazo1tzp2fg9bkw9eulbpdjqt0jf58yu2x5zxzjokcadp61oe8qt82y89tndclbipwsgc8kka2wr0m3vo1c',
                application: 'ksanjru7zr0vvrctl84ic1v73bdmgf68pjuloegatmt3xvhwudiogr2ooqd1',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'ej3q139n203saxfw0g2m5s9by9zys7rc17ei4na0',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'e0gtgy6lps2moh1j1e1ur7t0outdszvvmwy59y5gxwctz14eyl',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '2ida8031361e7bmzwxxn',
                version: 'cd6qv38vd1mm1lpkk8hj',
                scenario: 'ldsbfnhqnwgcbsylvxgo2ho3uk0742xef47l4evc1um5bjyr88vtfw669ywi',
                party: 'o1mwom147tnrl27u7eupj4heo9xz8d2chbx9hg49vry32nu0m1s2wog5g461xye1b5wrpgu2fib5oupaf4c3kwlpllv2fsx8bwr5jneedrehz8cria0s17vccf9ox24gf00ij9kp93u9g03aeifbqt26wr5jnoom',
                component: 'aqvhcu9lua79hrmuixse9yxki8wp4xpmjhyfeoql3bbnsmw44cq4ottedoc1f4jnwzfbmgvupzvwfd4q92ihevbhxr4336tv5zy58ykalqd643yjoorom38tissko5p5sftppuk988h3ap9dseiih2q6xj9k0567',
                interfaceName: 'efyn49tsuiiapeyavoi4ht8272g9pfoj3q7gprxsn373xnqcafzxad65try9cwy8b848t1l8pz885kg6jvmpxf9dibw26obhhf5trqovh4mszjlciy5gn30sw6zqwssugjfhkn0s9e2gdblp8haru7h36w2e3oa6',
                interfaceNamespace: null,
                iflowName: 'tudf3odi52blh4otb2hjjnuu5qdy93yrdoaxvstsbda5068nb5q4l52enxiqms6l8d2mvaj6pjhguffrpesp7inmchgmhibiprpvn105v2r0olj954xdl5gryvmvsaoue25yahfw14rzepvuhypalqw53coejf8s',
                responsibleUserAccount: 'dg4yzjuv8sjrvc20rgp5',
                lastChangeUserAccount: 'iiaoxlskhmbjicgcapyq',
                lastChangedAt: '2020-07-29 14:25:16',
                folderPath: '2e9w72i3b4oxp965tc63xzmg3el8g7jel0c1tudrpp2ttyzg1lo152i4x1u9er9k80vovon6oadpnt8c5fn42man5fz22eqrv7lfmt2z93td9ql8klfofwk5r3mzj5k7owszj7yfr9mql83owrad1ankulyqnnxyl9g7xhv6pfvfsa7a6e81lh6f8fex1t8rqdz2hl4obj8qmkhvvtio5loom4xzaql99lffh4azsz1rzwf3u1fklwd58onr3wc',
                description: 'csjrkunuqyt9bcr9nfnndev83ih37rg0ae3p60848mq43k5cmnr9sm48v50f62u4thvdyfps0i5398uz9ehkny2iu1bzn49s2ejp940195feqsvnzxmhkhrwhwl8e7dw0h85anumo3btdf8e62xrrl4m4ngwleitb7k5ov13oktar2xlrna13847n40qnnqxsqs3rqmuvyjozsmtoylo0f969y2tqzbt37ogp8aqqhk03du1bui0328u1ixwv4t',
                application: 'nybw6mykbm2xy6v2qk3hez9uow7qv3bdap8ryk5dsbnkfqtinc4ys07eqda7',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'yyreh0rn7q33bex163g32r75dh9y3r9fkqarcda3',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'l55syhedv8kqw4647nlic0bf3f6fw59libb751b3ot4tacxw85',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'kgl0om3daaf1fm7pxref',
                version: '4vnlo6jxmb3rc290sx44',
                scenario: 'ur6fe5tmdieli8sf3c7eemwwrd6vqov11zy2a9nb5rqnvl5jsybhj132u43a',
                party: 'ef7sugad3butorwllg7fvz4us6ii1gt1uiamu40azm8u3k0gsilujjkvavp5w1xu74ssu1y44zl7pst65unyzdlh51e5fkp798f3t0ecl40jnvrumahmawqyy0h6l0cm3c79a4s2l577bd4c3ly8r1bjy6m8tick',
                component: 'trfntzw4rj8hk39ewsgftqsoydehnqbl3zfkplmho1v0bq7z0tel5xenwmzv2imvogn8okvzh8jtutcau3rk37gj4a7b7vxcg0lyzvndln9bmtnsf2ha7k3vhquup0nthefjd5vzifa96uenbfy2bzvzjktevrsa',
                interfaceName: '2dmzqdh8e4knhpmjl6perefbew9laryghop7obnu3ir3ms6exmyo5iazsh68dpumnefv821b1ygfgnfwo7b5xbd8berx2b856yy6kq5vtxb20lq2nat9ibe33ziib8ctls4j0yzq4amtd9bdq0y2bjmf8da1zxrs',
                
                iflowName: 'vtzaa76sm5jceecgzbt42lp0lsfd31v32detjtltm41cq0lhd0rkcxeyp65ikjsdvtldr4538coy5x8a6gb6rv7aviv307ym3plo1do1b5q46fvhyg55im97f16lq5j527skg0rlvbi4lav7eskpa67ny9wlgato',
                responsibleUserAccount: 'bmhn549700gv8e0g50kw',
                lastChangeUserAccount: 'bkamifr8sq6yfuhfrr0g',
                lastChangedAt: '2020-07-29 20:47:56',
                folderPath: '4ywqdwztnv1y9rbclnxyrbkys58i3k8c57btrhm15yg36zg5lr35hrghu1blvsjf79gl5xrnm88enbyubbbi4m96kzmemj644lvk367zu7xfdluvljge79axpihlv07g7kjuatojyya4d5lhb37dg77yx3k04cwun1spmdm9hfxei4r5nn9wcgi2jlglauh85e1s6flzjprkjesyw7vy59uymtq7xv7c0eg4aov3evtrk14uugoruujxdtusdq2',
                description: 'xgotmtdyo05jrwss8456gv1qa8cf11emrfx1c0cdgxze4sxq5dm267utsd0rmy38j2v9454amoaxfevaqi6cceljhok1s44ya3hihe8atei95elsib60cuqdbe4vh6lkl86xx4em9dyh0x6dwgozowttssty1ghyxl2wrphxftn9n3e1jyvluwuqksvtnfpbebor9i4js3ocldz4q7zrc5u90pw4of2x5thc9jwbgohbajfrwg3qj3hmtpuvucr',
                application: '08w2y0vbpca75nz4nb70sxz1ypdq7wx8hn2xj83ac4daqyjhn219kxx17msv',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '2dk2e95g89auoqswml3dhaihxa082zmfz8agj',
                hash: 'a9l97a8magwcqa0wxi6t2as4b2cal686f54do8v4',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'nv3xqxosfidscj11ta86c1ufp7j7rsbdypqmpqnvpuyziky9ko',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'gv8v2k2v8mi150sjfgt3',
                version: '21l4kbrib3q4ht85jm3g',
                scenario: 'a5prepry48u667awx4loysavynl6s1o5hl0vcxzn97qw19boeitn2ozctx38',
                party: 'ulz4q08963k89unucbw2bo6495l9dwrktcufwy47dangcbi917jufmmt79qc1kxvc4nzr3cmla13bf2c3dflbvmwiup16tytav8n3vexdfxheknzuzrjltwvqict8kv2ycybm8r8k20b1bocna6h407cgtcs4h6f',
                component: 'n0gzdo3q1edkqx6kh86std5k8hoerp2la3tdwlmfu6hgt1cfgya8s1y3lc5nb9wt4y2mjw9rvaygz2h7ap75daaw5hypkcmmd8xwjaqdrvtwvgt3n0kt1vqy7h764jxfzdlonsmv1b7cp1bqh0cvs2io18mwzi3x',
                interfaceName: 'yrhal5yy881pbea5wu6apzk8wbb85o6ltlkpp0ip20xxelowfyd8wr556q4w1vp57p2rnj6y401hh1x4bxuti9fgro6nzidyg8j8xrnsrqg0uv3ia7mov0ca78dsyf3w0uiq2rgijq7eqyqrex8k2slc500re1dg',
                interfaceNamespace: 'x0djbn4iose986vtk333lpppmfq05phmhaukc79s3dpmvp1i75uhg25fsltnnpdcauvjdnv93pm6pd288deaqq7xlfb8annbso7syqp5742yzur9dgquto6qela70q3x75orbrhwjj9igjdtt28wscggt0gs19io',
                iflowName: 'lme58pdycai9xph3bbnmqq1j0sb0q2nfyh9zjjpz80vrp3wy6up4j7ec4zv6y3imf8veub4kvor42eueo12ktvptlyaqpgcb05i6pzce7ur8et8to5vqwjhrhmelceiqvjnkra0cqj7kxtm02qje4l0gfhax6u02',
                responsibleUserAccount: 'qdpkaeh2e71csvojdz8r',
                lastChangeUserAccount: 'h8guqb69dk7kkfqgxmmv',
                lastChangedAt: '2020-07-29 07:17:59',
                folderPath: 'j3yxvvmvctrre7g42tm19ze7biug2ivz6gapiw9rc3eap76hn7k4kowyk7gdz5d33ypm29boitl43d6tf02n4fk2eb8lisdc8o7op9lf6erlbwxaja0iu2srzqdcdbypgu0qr8zkdt1jm86dgot1mwr2s7jk8r9d1tvf65o0h6hxyt053v004ehogiu3g2ip569cmcesvw1tt0noleellrfz90gp51mzys81kajtk6fuxfo05v8xcft7kne1ekc',
                description: 'ebkpm4qz1dk68yeo05ldzwov8m8hcucx6o5obvwv6f5frxl0nn9p304au8nvuxg5e53xf9phcmm3jrrkip0etlbeikpjr6acz7uc0fxz23uyflnk0euz6kqgiwqrzwefd0s2q4jyfzdq5c6qs92zviotlg6376pbeq1gx4wm8kht3nwry9f4npt2hxov5278g70xdk3rwqz2zwmtppjwb4a3kjlmylyplffr0feufbggobqhumyinl59naplmxg',
                application: 'zgegtb4dwi3xa7z3be1d9qfxtlieflg6rq7zmsu3r3zelvylfrgbuxfcp8hb',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'dt97fvoy5wtrvf82okelsfz9yrgt9kd4p4g6g7db5',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: '3s3vdtsr8110ocfe7dqe5dt15igp0dzjjd6vboz3m805e4snqj',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '0brj1k6evmjihaah6qb7',
                version: 'nr3f4dp8razxbxe5hecn',
                scenario: 'tycq075qtbtsiz8jhuolnded5xjefgvlipspedl8udi7lnv7245bwy1zrb4k',
                party: 'rzx360lkm37hg4jt8cone4dkxwdb8h1sym38u3bnyhvw69l63qbqll50zjedq0g9jkbv3804bgd22syd1tp1h19e9r11bb32i818gwhp41i8nj0elnzq7gfeycj1p5r9nricrpogbs5gavyogkf4c3h14c7w2dyi',
                component: '3suk7zl2rt8g7mvq2zjoj21stn2qlpjso0hx7h497al46w7cumfco60fqitljvrnsum6qfuk58z1x8ak76zhb6oykxikjo91791gzajzvdhr3pof1iwnaf54pkpy2meu4dz5ki99qav2niz6t2bazlzk4x0tw1s5',
                interfaceName: 'cwvnds48jqwsczw3ff98v8jdmfeqbub7nykmmmpfymsr3jhh0erocvb4r7u9786mc6p5f2k1900lxwyyb13mfbm8qrjdxh288r5eh5mpfucfi3wgy0qo6pkj7mpddto31eknaf3bcelode4imyn7oxgqd1m6c19z',
                interfaceNamespace: 'cgk5r83lt133r1myp6tqcfcrf9czxmiysudxub19cdd5vohbh3e1u4733uuqpocf8hji4rkrwncn9do0cn66gk04cxcxp032up7lia0a33ude64uq7ixnhh84f56t5vh3lvbdfvqbtbaqnzsngo80401jv6lbe4f',
                iflowName: 'lnv3k45y84oof0u7ntujm1vmtuo9l4gamseamcr1qka0emb5wko26fdz2784lwo8ui6bw35276bg5hourke9y6dy7biy8m3gzk9yz6rj0ldo8d5m612y32jt4ggxzdbwm9ow05vuw4bpxcltkxlwn3ta9q3xrsmb',
                responsibleUserAccount: 'er35l4mckeievhv01h6z',
                lastChangeUserAccount: 'dkuqmvb61dme179jygga',
                lastChangedAt: '2020-07-29 14:18:48',
                folderPath: 'cdlzfz2c1hbq82bk6h9rsm39vap2cu7olfr571g8zxiogcwcdzrq39ogr9ej09sxbq1lsbj7sedseo6661okmi0z7i88d0bs7j9881azcsw6mjcwwvmqts2qprtqjrxattjg3yrgrgkszoutxck7er00b8bmrnk8292ywerv0xi7pb8fohef926ymjgk5wu45oew3852i1u2t7b1pr8llyivpbp2qh8jzh6acohiptbr8jzzwz6fmtrud49f0s9',
                description: 'zjzkjmolo5or711pr9i0ah9le5722pnp4wlh707fisvpwk5xks2cznagirzhfnkmzu64y76rkybc12t8gg0j0n31b5tpi46smkh7luflkaztedzbn61eyb9y6a0af8kpg5l98x7qyflpuxggcrj8ix4xlaoxqgzyrvv705qpw49qn8o6060p5wmd8nl69ydwlwsi3i03pquk6w6a3p705t4qmgax8ofqgx2dt0osgx7y49fskzdat9znjr5x4wj',
                application: 'ixh0vfqtn3wb65gjlwegam7srpg3ea76os58fyw65u21fx7e8crti3kp3xay',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'bxviua10d5ej2n253az8mem03vj77guazzn51zo1',
                tenantId: 'ogbfo45qa0ggzk111jaembhifyi4vpzz7xaxo',
                tenantCode: '9v96o1xbmcsa9iv0nq8zfmjv2r541oeq52nl3byy3t4b6wnaaw',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'n1ard4bjy32195gj3pd1',
                version: 'zjq5mnem6yqld1pg1qlz',
                scenario: 'vwup3xrv49nbija6wr6fuw73igu3lpwekqkrf5qm83dwcodosjsqtz8fo56s',
                party: 'swuykr6r6wbfu2zey06l0g4jn0lmr9xejbwu4qebi6joskdbsxc0ob7tcfzypvztndfokp2kse76x3myyp1mkuhkaagh9armbvsnh9tx4azrb5t3vwnlzmcg7gdws6se0qjcr9a8km9vye40933gvewy2bhpv620',
                component: 'cut1o1otg7l8ijoqipxpz2by6ujbpyo4n29bhar1lpbvgn6gdt8okzmgc2k7qeozk867fwp3xl496q0zetq6lwk3mem06955zyds6znk6r5rfyq0z7lqw6iygib0p0h9dyhlb4old5yf3n42py243lri9npojl04',
                interfaceName: '3ufk64ytfegblq54cduddpya5e5fum53vkwoxjd4ekx7q3p7dkcwecotmu3iggxvxhbq25s424m01gvhvpl557j0gqegh99ucrfkwhdclli0pjop3w8wiwjpiqn6hdl35x5840e8s44yq8icwfs4wd5329b83cda',
                interfaceNamespace: '4n9jyip4y43szje5wn8u4qmlzju1f0o9wwi7i3dw7zxdg4wcx0m6xlpx2lt056lw1l9iw5epvmdsmz2g5g6grtdce02a2jr0w30dl7cvt1d34ls52xkzroe2rxe6puf10xtvex2p7bxbgdwe8jgdmi1pdfe6a0p8',
                iflowName: 'qh2n02fdt54duhajs7qg6w71jky0suyf0rk0pqq3tcbhbc0eu7lg6l2dfqor3axpdx11pqhguvp3wxqnnj5yn7kui2ons39nsu7ggh04z7aqmgnhqeedbx89lbsfuk6z7xmsdje6lr0xx4uk61lblqya5360olq8',
                responsibleUserAccount: 'mr1658wysd7rq6v2z5w6',
                lastChangeUserAccount: 'vxk023cnlhu7sfwkx9fg',
                lastChangedAt: '2020-07-29 17:30:40',
                folderPath: 'yqty6lguhrlp5b9wqiboojoq1jqqeudcpa4i0ldp9ga5avy2r148u8or5cupjn83ysfadhmn0vpeufw2ll44x1at25icktdb3iz4j6g37uecc3rkskifdbrsb3kxju4ft8sd8h5bhg4lig563go2h7rkr1dm03z41pvlm263zhfcmdaz3uovmyrb8f92pf6pa0f5ci70jy1ltxd3mcw76kayle06qt0nmyg4wcjxr6etu7dlxtugdtq2ymf9b3t',
                description: 'plsll09dkffmb3fp8y50c4pb5xhyosjhxcnsmx7h803sdem9c20o7boe6wv21k8zm66j3gvai8242mut2l6ortg9tf1rb1iexxpag8hpygaorssxnyua99fh1rmn3sw9bab81zvc41lnrlrv5tyy33tra4l3j0jse4i8ktb4z07ln7cqobiz735ou421k11fop1aeock55l1c081hmx09r8429bjtkgr5v48tgi6obx08ayh8gcqkn001h83g98',
                application: 'kt7obyatkxn6tx6kkuuukijj87od959kbpshh8gkae1izfqa0b80zvzpo1ce',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: '9x7t5nfw2rdkr0b3lehgrosfwsl0j5a77xz4ekgy',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'xayvh2i9is19xayj3jxp9igynurox89on875ut6mfvn5ynzb85',
                systemId: 'hbzt8bv0trc2ahgn8z4zit4fbi29xe7bc5z8j',
                systemName: 'p098ejcd57nnauw8vtii',
                version: 'jmk9oqxvqahr9w3yarvf',
                scenario: 'tmcfhc4rrbjsh0w8dengw6wjly2nm3114imjods1j5lvvwdalvfekl0sr7ld',
                party: 't9c93t6mozv0i08zh45qclsbj5wt8yrx7cy8zi5olo42o22n8d8bj13dahhqruk7y3vgss2ao76f85tf9vqjndb1rd2g6709ecbjcihlh5fe0qifg7di4q6nrlkg9w1g1pbw7t18tgenax6o5zx0dpwcbszljmf9',
                component: 'pt9u16d35guqh0mql8wsy865aguzkktg4nqatwpdq8vlelz05ymsywudznhpw4ezrda1l8tuovtmezzse4mwwbjb5jb2mo8s5am8ezphqlsl7owt674ntprvv9fofc2nsuk600kyx15lusm52lq37vm6uioxnpfk',
                interfaceName: 'uf4u1u9cpx0r3wdejirb5mfef0tump5fosvio29yilhf41m7m3vzqvlsngxlt8t093a5uen3lp6wvwe5pwaoj7eteak4007pj88f7w8jta4kyn38wlq1y2th3rjucu37n530b3t67xyy7ewj0wpb4lxl9ipvys7p',
                interfaceNamespace: 'tf09vr40xdkxzgomdygjrm01ka762q4sajqn7rxqpjqxa4mwhm3237nrii8fhhdjil4xiyumr9sqvlepqxaxhto0p80wqpaex1y5urzdoqxlvw5ktscp2xeuoehzg8ukwc6rzm76wfye0snwijdrnvbewf0sba5p',
                iflowName: 'rkidsbvixmfdkszo8jegpxbsvxrrym86hruhcka3khye1fux28jwxpy1eba3zr2972l89ms6h12ljpgchd6kr8u4ovjxmmghikn389afce8m7phzs4eduap0mbwp6hoebqzravxv9aew9t6n7jhf2gm6gbg7xw7r',
                responsibleUserAccount: 'pg6039mr29x6x187181t',
                lastChangeUserAccount: '29yekw5621egn5ed0s4f',
                lastChangedAt: '2020-07-29 13:33:35',
                folderPath: 'mmxamk5llz9dle6y6c2ur4h073mv5ps6ynfjp5frr1wvo9l47u0pk8sk45nrisp5i3kbvd5vhpjmudqz5h7hk5gwyvyyhf4iedtvydaiu866qiysop6twkv2c21buaqflxq3ddnpx73cl5f0tn96powa8pvxorcn51llrrvfqzzwpvzhqfg4p79wzawf3ijcmz9d05hfvb1b6nbqdvj8hixpg16yjomlq3fnpgq9z22q26em84i259gi7wr223n',
                description: 'tbpsex15v4jjshyk73qwoe4xwilp4uc0qj94zfknl9spon5ja8uzzm5pvd9eax35h5tbnt5jxp0drbnuljiqld1akl6zt9ezpxt445ltwab414kausor9e4qcy4klk7rpi3i97b1ueiy6j5q14yrzsofxy349nqzfm3rorb8hejk6f6s15tup40rzmglolh9g1cfr9qra7tat4doqdmmsfclvj2y07xxy3ucz0y2gx0vzqpca51ojr2o7rn053a',
                application: '61882e3bnc5ho7u27s28baf22jh97lo5mj13tlh365cizrkj605uvu9ssfwy',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'tb17znt6ybby8ixaseds8gtj10l7imt6ucgbsvmi',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'ursisjgcojc7tpm96qg6izb41mk4e90w3n0vacdulus9r9vnox',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '9cmb6fzo86pyady2n8ir',
                version: 'wlmv2jn7f5new9sje39n',
                scenario: 'rdkso9yc9k60uo30uoadmyt5bp50v19cqcjkm14ytils5qiasu1oq3wav33g',
                party: 'zsoy756p501h3gq6fgrmfsq1p9p9npo78i1oneibf73xmlo0fyurpf1qvtsfuwrgc973wkb3ftg2b3aeu3teg1xmxwdpkzmmfmdgy1fcoj2xsv1vbp5h5uq4l00xmz4i9utnj5oyf92imo3bf0g97em8lw2c0l54',
                component: 'n5fiwuuatw5b8t2v1xldqbszo7g8lsw7sqsmg122k8442way90s1oy2pvkhiaq2j62wghl51jttyclvdxuf8qlxv0ymbhobo6nym2jevegathrx74kg3exxawdwl4bfmqegwklp950avvnk8r9sn6vgwenrpmf1j',
                interfaceName: 'qna33q4lulbsjovwi7xf68mwc2ibzow2o8m4fgfr27v915wcmvtah1b1kxyebgcmeamzp38uppzx6zn9cr1l2wl0rwq40ls9xofg2lnb6jxxrajs2xb51za9k600i9i9igv7b0mwi56j3527kzjxo3ii56sq2mri',
                interfaceNamespace: '82d6ybggcys8px90vl7eae9hcq7x6f3u8yh4wme2vampe0zwsyukzb2w1njvusq2jg41j968xvfemiqm3p3ztvskdlpnqx9bl13kmzc6b9wfmf9eux1gedwy9kudssvjs9si5hyrbd3xqb1zejvf58ffet42w2ak',
                iflowName: 'hcqrn470k0du03y93840qaaigj2xrgwasgegvfx4e2wr98qa2ojpzpj2775skxblpvlzztra0i782mh5e7f8xz5sf329on8y3om1ni26yx8zwqybpnesuux4xgfuv01c3j34t6gr8xikxc093xqzrgtlb74oeosh',
                responsibleUserAccount: 'lg3xyq35n8662n4enqga',
                lastChangeUserAccount: 'yj1myooaqpklmr6bckjg',
                lastChangedAt: '2020-07-29 22:27:19',
                folderPath: 'dm2pnmyyyxj99i6n0y5s8nbcoca1yf8nxsagnaupn9qn8flukbaf4mptw5y8q6vmswjd30mw99lxzvdqvtyty64smnzb7bbii6ua1py6986mngun9spjj6p1radds39bd9u4gdw8z5qbxa1ml8pv00jb1t29b3fq0vzi86q7ohuapsk1shwoo2953qbtqbhod1zlznk9m54ah9z5cddpw8nxxirpwf58y2zceqphy7e43srxxhrn2qp0waebxkb',
                description: 'zps0o9k2b4txtg896t0yn4vci669d2r3lafk0om1cf2ozrzskxs8crj9ogwvuotphqi46lai3nqu2lonreueg9rl7c5hmu5ktrhivbf6ed90uw1cibs8d8lqiu3ygmkmzfyqa8nsizazr89jghncmorzhe827rz4hoim1dqso7gfaseaxcwdg6d08pjbji9naej4tih2u7rccnkp8bvdyn7pnvgg4s2n9tzviijtx03rh5wwrm25f8knueq59uu',
                application: '16ar54snmqwnh259r124h2g1zwi9mclxsl89hztx17qxe8wuvushgygxqcaa',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'rs4mzamjw1u2igmuzquydewk7zwt63uearoz9',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: '10z55wcfoxce9dzc6q8lz4jf7eonwxnip7xarmaj',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'owqoof6sohahts0mw8ewr14rmxu0afv4nc4t69k23ja5nmxwm11',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '5pua4oudaup59z3p4wqr',
                version: 'ssve1dnhajwga7vi20ss',
                scenario: '07sp5pxwek9c9o4jrhhq7dfijcbtj5qi5knlwmrfmyt15pipleob9fs6gmhe',
                party: 'xdkbpofx4vg8znrjpk2zgye2vvl0e3e3wz5l4ga686qbbslb5kz9aisuvexriwm661twpdeyi6mrqhkt0f3fwoh0odui6uuwzea7mzc1bsgnxqvfcs3nmjfgx2orfv2hz9buekv2ryqbx2y8zc8p3cjbw93dic7a',
                component: '0qqmx1csbkkbwm97xr9gprn7vf4dr22h6k0kpd9fkckhhamjlxai526cnqaw6ey082xkkthfcwdatkvb2wfvysjni7l9r836p0gozj88rf2x265xmzd33htt6nj6n2pt4tvu9418vgsfd0tfmqld1whf5hvlz16i',
                interfaceName: 'ecbdq77dva9q3p2rtqqmeyzc49fm7jvwx27492pa07oorxc8mc95y0js0ggaot0g7jywdujotps4434ihwrj58l68nkctooiq43x5q0mkjyn3y7zg3kvfgoxviqahiolixtgvel0t51iyu6jm98yhpg3tdl14kr3',
                interfaceNamespace: 'jh5ofvidmmu3bpqdo751zvmsxqcxiszsw59iwx8k617b43lxi3ewcucb8jkrdrqaf3gig7uctgp91v6p4laymywvuqqe035fdkibhx49vqxxo6q5gwaagzj3q3wi58xlg4rg3axtq1cbfjulmwnz6bt33dqngz9a',
                iflowName: 'kt3zrsiegb5nevbi9x25wkcdip47mcslsvhtrad4xefm6l0v8rt9cmshx53h7obc962brfs2v87gvg2wj1e1fi36fd2s3or0bad9qg30zfb1lfvob97ofj775xdw8ejihweyhiq5i5g6b28or42i2jbeup6v8fza',
                responsibleUserAccount: '909gp80eutxk0m3pav7v',
                lastChangeUserAccount: '97tv4n3if9w91f7eu1pt',
                lastChangedAt: '2020-07-29 20:20:43',
                folderPath: '1f6bpw8eqbrf80j4sx1ea0yv04zyg99pcifn2y6wu7g800m0ajc4wxwk1du50ya7lyul2icswgu7ueh2b7mpzwkuh04wjwjrvi7sc1270e2frif8gnjdk2um3ks1e04dy4mzvkzbjtbzszi7k2u9npfqlz90ye2lz09lge6cua1uj3djt0lyq6npbf9yo40aynyy134wsbdm6iwd68ev5exglfich5y3gvtmsa8khgn7yoauumvnuz94i00ae9t',
                description: 's86hy4l1n6g4ic2nqevnfr1ysn1u9k14xn27ghzstzit8cukzv3e2jjwsvoozetvkxd84hcowseog3e6kzerj5xwzbrg2nrxpnp2fvbx06i21ap2f3t6a2v3m64vy3nsz8kaaw1p1v859h9idmwnk3j0cbgkmy527juzqyb2mnjbm6du383zbkqvvr17juleps4rvmiwrlcukr0f1tdi5dbdsx1ewiaxe10932t74oecblgeruqb0het2kh14vq',
                application: '6ehm33isvcgrdrlol2u5r2u0xp0hykh6kuthz36kl0prdgapaao8i04pl6aj',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'sm2jsyxedrsh6lveliik8onukosppbmojk2h0aax',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'qmtmnej1a78ktbsfbsvs5ien7slrsldw3214yko6a7u7ymxhgo',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'ejk6gtjqpocmc1va45nlo',
                version: 'y4o5xis4kiwz0aqeklpx',
                scenario: 'fgjrp746423yhozcr0khi83y3w3yoqv8701fj3p8ig2dhq73d3s6usknyzzi',
                party: 'fpgf51i3pr1bw8bhclht0jnm0zz7uqz3ecnvl1ohqtkbn603sspghneb51ak9ciomn4obm6gazczy0b1obzq4r252jpjllhmxm00cqz0dxv1913pu1r8rrwyw72elroddakm3o098ardgsynn3wx0nisuk2c30rz',
                component: '929g2sz606uih52rxtnoa0pbry1rg2iv1xupn83k6767canlajop8vbm4ywrhmfkjtxyxuec2aydwgo4ebobgtw6yxxppxeugnjn99cfd2yx9fr8kfl63gvmdq0lc82nqzfl5udkh7d0yru0ffklc88pw27scmzv',
                interfaceName: 'y0p4b6s9fero13tw2npyiito5cbu38i5s5136kkhd3zvs7vh8b8mkevzdjsvetd2i42k0cmz7qrxwwaz2f2l2yjvjk20pmla5etslipgljw3v2moa5eng4g20hh73n2u31frf9mxsf6xw6biz1mq4qmdx3kz2xv5',
                interfaceNamespace: 'yb0sp8ccl0z2w3b8f9n9tshcl6tb2qauh95wyrjbcgxh18cfnb21x3v5iu7kjh3azjw2qa2qev44bxi5warm2ptnk2fd9oaufklykzyx7ncu4wjb76itkt8626ulo0zxp1trioag7nij8kgnefocgbatrwg5c80v',
                iflowName: '17qqbqymx8ctv3f8j90l286f8gjkz9x8hwnakyj3v6xy9ob4cpvecouplkrtnthmzybthb1acb5bpvod81o761onkb9wz51ylnihu57o2h7rwmjjaafiubb50e6jnje0sv8ria1haxdjk3pbh9bfypzzq1f1gdo6',
                responsibleUserAccount: 'dc4o0tfcd0t52nvhzfpl',
                lastChangeUserAccount: 'yzgcjuj1vvdsu09i6dwq',
                lastChangedAt: '2020-07-29 21:56:42',
                folderPath: 'do0kvmx4px0odty65nqa1ewbahn5h86h3rxkwdty8rc6w0eg7kh1l8vhp5waflkpqo8sc7nd1vmp4uoxqr30xey45pk3g0dmkmfrw05grgg38d71zglo3eki26h5iln7kqpxh04xuirdn99cgwkqqydex1j8k37pq5oowbsjtqb8ie71jv3fpfhf9w4d8gk1ix4oli2ykqyavhsxi2tn249g1cabriwt8iotimh7if00gi4gsfqrwt248yjo3mg',
                description: '42fe2svf3gvcq4f0u8jsczafv43nrih6jnpcxdbws9ayki5t4ov21q1tfjk89s4ft57gakizkdxucs36hw4ded6k70fbvtfa5poyczohj1444oprsn4csvb7fof5hzst0s4xv2b28a37guz0u3y35r2zyvfw996t1nnouc6ycr2ypzcl0dgmv4nc7olo8s4csobrsl8ni5g0z46klpo6lgncmllierw0csvw8agcmjdepfn95yy81stsyn1hcha',
                application: 'wbet1vv7rulhqwckqskwu6b09nzzgibxurbtrhgtcjrx1mqp0ipcj6jgbslh',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'o6rp6ovluvrcaervmto7yrfsuyf36qdjxlt4g7ac',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 's7j4djcnymblrcd1ddbtqmn214o394d5v0eywp0hrn1g9b2dp9',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'j3jmrncp0x8b6k05xpgv',
                version: 'cvp0df9imntbn5rgiaokf',
                scenario: 'lyq3ckv49hx5rfx1dywo5iskba3uaomis5pmkkwf8ayu351tkmu3thrdaxdi',
                party: 'styc9q7aiv3e28xf3n37rnl4h9ie4ciau3jv094n3bidk2weegot59lgl6hynfofnntg5c5fp63dc5byf792a9ua6s187dswh0db3h2uenjnxpfiqvx1wgyzpbkovkmywomwm5k1vlkloht52uw99sjsxk3onvq6',
                component: 'pkdb0d2hufaveqhikrd42u7l3g63709b0pg7tkh9txy6q4rv1axtq6sa1da7v4e6aq5z1m54f05eq83ohlobvwwurpp5osnu0518pv2bh32h80ez720407ykymuu25a5ijqaps8oszh39yvufaxb0x23riwjoriy',
                interfaceName: '6tzzpt0a903lmlu6fn4oz64zvwwjx3kdtq9vel4gfwz5xjuie8li1jhgrvezbw9pehd4e5ohnv1kk49q9wxfd6plhsjl7q0m1hycsrx2jtnpfs0bhwjdx890efdvkxjui6lulwmpxuwampxsqtyfgxzpupkzekx7',
                interfaceNamespace: 'cynytg5iso1do8jq5r8qqvushdcqtxccbmul3v1ml3z86mnkcyjem8iimd127mu3xmo9oq7zak14d84lfc8k8t2hrntr79ofelad0dtz2v9oi2ghdktwxnk80wiqycsfuelc6nadzlkskfm7d1gxwmtxyp2bqd3z',
                iflowName: 'fj3tmm770kxphzpyx9qnk86pj67ivbxgl4rhiavul0kxwzkntff6zutbnfmmcontf21axxqrru8rnkmyaaej95tl43fkqie17n5btw4msr4sywgdpaj8grkprx6w63ltbq3rejqx0enbdanjmny6s4rxcdwvtmhq',
                responsibleUserAccount: 'gtrw318aqisaj83k15iq',
                lastChangeUserAccount: 'nuuj6x20rtf41wlr2pcv',
                lastChangedAt: '2020-07-29 23:59:24',
                folderPath: 'ee4w4n0j1xy0dkn3gotfb5yxo9hdz3nc68u065lfn63pjv4rrp6eimgkhphyaneyveiebwo4h7w89gaazsjuvntk03k4uua59f0ei3hmmzz5iiiga3j42io9dmbbeky8z3ibgusiofgc465jbqx2slbhc5jcdmjmoqfp1gyykf70lvatfjufy6jkyxivoqqrcrou79mmk7fskwqk5v06ec1uqd36xsvfazgsm1xl7qgfy2a09ih3ojdh0gx5gyw',
                description: 'nectlzruwjawffhlbrdjzbyjb2jnvw2701z2c3ysif99vvemoxt334dkfcxuocrhr0zjkpmtsilqseel2uujwzwth2bl68qrcuhltq43uruhu2e5hkl5ouif4alwlsja4f07fr8ocdibhps3hx07hw9wojwia40v3nwte2fazcu1le8bl8d9u9kt5zpwbnmnau5kr3rmokl2vf325kqksvb336phy9bk6d17ggvmmf2ipow2q4cxfgqsa5ubzsc',
                application: '9tob7pipb1ts2y7vs9yrh5ubhxk5ho7rh7yvr2kaauwgs4e6ws73fkh7nmwi',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: '1kctcvz0k0o1sslfnxy0gherd2dcufgin30m4lw4',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'fkq4spgbogr3zv1jw1ibvosxeqxmdqnx7fcf1hyhimoxr53v0a',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'vdb3ed0iqn9jf5kt0z0v',
                version: 'ahxyu323suc8axyr2r98',
                scenario: '2pqcc9aed8l2faexy5l0e1y4le5pu0iou7vdv6w4gp46vcwpnhg5ag33no05o',
                party: 'zltyg1mv671s7cllj4fh222l6t6vqqfecax5ayou4esx6hd1ll62q8uumco9c28gga72hvli0bhifps54kh4yu10s97872h0pof9iryt4xpol284zeer3wizc1gif9ml3ifp3t45xggievpctw61ylhxqtdgy882',
                component: '5j5jjeuniitphf13ii67fhht58dn50yaeqfr4so1nwwvdixsb9e445bgomkiau36yr8ezoeiksrte8myff3wh0a9kkmadiv3atjvqo6jyv09tifa5ux2ldmz78d5mshr50t6e0cmhjx0et2o1n3kplex9zdwl99s',
                interfaceName: '9n6tlzupb0v6kjdl1ge397ip4ys25gpd69va4re3m9d0b7uepkdkk7q95vdo86xmoif20xngqwyttkhwtjz5rwvd3h1tmhb2c4d39sc2j2e4e99295b9jqfg0ca5q9zt9ytyhlpf4y7tkj6r6xkb8w2ddlunym2a',
                interfaceNamespace: 'r4n80y08axhem79jdfm1sukhqb2o1fyj280o9rsafj7mzz4uly5x7ymq472074m8bwyn43jnbm3jkl5gzlxrxdyi5ub2uvf6mj2dnpp5yu48saojla947p2f4almhnm5u61v44myjvb8h7cy9yt1j2kr89l04946',
                iflowName: 'hrbr3d87diwdttkw2j4nnr0lh0tl3pnvg534zl306v0v5ucbqgv3kx8euxup75l1se4vms7gom0sndbs1cdbdu1gb9uybkiva35fkz3bv2bm09cu0e51wnpqbkj2u3vk97n3hlfixfxyyidmqm6l7ue72i7d5tth',
                responsibleUserAccount: '1uz6opad3mmi6v6h2trh',
                lastChangeUserAccount: 'm8ub9mkaf6bwpo25jrqu',
                lastChangedAt: '2020-07-29 14:41:19',
                folderPath: 'gxsbf7oo1yyym55ntjb5oten8ldcmwnso2ub8gpsg56llb8rdl9wqzs40vp839meeep49ai7jq5i2he8h5063q7ejznm4n6lwzqrir2tjcsdrpagwpvqxsbmw82ayk95e0rd4gway1dxl2gzltwqme693oj4gha5blnxb5cy1zmyr09ns9k2xucopki3rfnoajd6v9du9kzp5eoqaqvehnyxjwumhlzidu0v40dnt8sojl5mmeol5sodmkqgzt8',
                description: '9qdykfdm52aksm6su9t54ol5acwiwr7ulq72q9lg313c779fpy5xlpec9edsv6k2r2bjhgw7df3grppya7grci0u5o63gpka1xo9l6sqc5kmlje2bjcyl027xh835685wnpk6wm1j9vi8d1cj90ytksfmopbbaj747iomj0ds2pckoqmc2wx9ubfq66wc11fhvb4a60qpyw0ezptghwjgkuxgx69vly4huad19p88k0axhgstoy6nizj9c26lo5',
                application: '3c6s8aq3lm89ajkag3r59uw984e2fts7wokih07m3q638rsq0uswmrt0odam',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'kl8oq9qsf3o44mdgdqnijtuddrtp9khiwvyrp9hv',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'yyhkr1hstp6bf7bkw60tm3awwth0q0uskavp7ttkmua4hj1sjv',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '3mgmp8a2mhbsfr1oq3dq',
                version: 'j67j58dp8zalpgxb3eqj',
                scenario: 'krv9hf4vmycz8e6f417gtjtkan2bd055cfvfq24e3srpzt3fgcx3sf1wwqgx',
                party: 'rfviuivxhc84cztafnwwc5j99080l0ijanhr27jcja6rnswrpro9c4k9m3cbhjkr6bakna6aoivva1od8slosuq3xh3lyqc479ng3mfz5icyiinu9y29gus7p03b64nisgziqaonx2a5rvre79ptso0h2efo1a9xl',
                component: 'ih65cujdabjgmu7en3cjbkty44qwvwhi2fuf8wm41y3c69a8lufu2p37i44wazjfgjxuk6jb8l0w1x6uzo0v591wj8xkwnnvrx7m7zpmbmfmo08gji6o4swgu86f7xc6it4ne4j8uaqb6tjpe3ah1cgavhtcnco0',
                interfaceName: '77dc1iksgfjmi01od4ic7pb45pepid1c9wx8efr8n228w8y5fx9st9v1h0vzl4f1n4xeyj1adpl39ogxt633nhfzyun9yu3zsk58ossfpymzhsr75pumhk9cxowrao6njy4clq5ypto7a6ip181v1h7ff2kxhmtx',
                interfaceNamespace: 'btqkueplpj9hl82p1p2bwzj6cn1kwrtw0l47245eejpg87a0tns36nc5bpo3f8bhw672qa8z9ef1jgsn8wu4l4xm81pahpzi9slhhqa4gus9i2zjpa0iketf3vlmntpq6uufcu9cqrii1a1iqb2lkl85wryk152b',
                iflowName: 'uxctvzwizauozg84n9skvma6fu0e75sxehcfv6oisnlcqubk8fhl2ankqh7g70c5nw6r6nus8g4cfxrb2zkfb6re2t6ku5ta1r70vh6mxxey65dbw4tuncrz69kevqu24v3lh1ludme8zymjtpnnesyz84c8z0e3',
                responsibleUserAccount: 'zm7d49kqk6i80mwmlhoa',
                lastChangeUserAccount: 'g8j7y09wzkyiwk22r7hf',
                lastChangedAt: '2020-07-29 04:16:56',
                folderPath: 'f08wdufs1ojfe7qd1kckb7szygx8astppudqp5sqdjeac04liwmvw1j9uzq4oucj9b2q0a99o0xiaoc4rnomvx837bx6me7vwj488uej3iybeuaf258fkppc24tbkk19syrtsjj4ldtmc9azxrhft13hf1glnhe10y7qh6004nwti7j44jb8hbr0qvmbudgp03yt6pml02nqiqetyznczgbriacafmho8dohualdpjkwe48h6nhxl927lzy57a7',
                description: 'rcuw3hhszpcl39p96gqlkl3ci2axogk99jyqlyv0d5zviondj6a2d9xb399smb21duecpbcgbaled4rt19rphg5ke62uwgx6bfdx2v78vii3mbiuts6imsobfks4kuhv61t0ps48e7dogjtgjjnah5kb5qu6buqj52a5k9xkx03wfv30jkgph6cj6nzktk2asxp4xcghc23iy3iyy3dvqnfnfg3b6xydxv2e3jihh4oryey463cizov6omjw86d',
                application: 'l3npvbh00uziradkldlqasa2zxw245hm5z1m1g0zrbknlbncxx4ue0wuh6w9',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'p4iu5puncs1gsqyfjshl4xpccbgjj2uhfdw357em',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'khbveft63olngtfydqhrxbrg8ifwjoh6c7ei6dblk5clg92tln',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'c89w9egl3f5eemff2gpz',
                version: 'muyu9m1w1572wrqyzh6i',
                scenario: 'baeoe0s0fumgwrwdcbn3ogg7lp1gkdty8959lq1yhujz4vj4y4v0yjnglx5h',
                party: 'ggz2jk8shlr1aqf5bgdykdh1duvl2swut9rpcjet3hyy9skvrp4o7mznwjnn34jttwdfg01jt9ykcyn8k5k3ygcyq0hxj8gcrushuetfu8hpvi5p4mnd4c0o413i63wk3x2f0hnfdn4u7dboqyo6r0h5857xsrai',
                component: '1zi7lsjxv39do9fquu4e5vcqyqq48rwm7tifhthq3vim79kc7hzolgzz0w4xu0uevtkzjx6g5eg3hq5mb0fcgy2k8leznz8qa08ky5cet6xdfjiyvv6pvn2dauqkdr2a5wm83lf2wrzs193zs00oac2o3rwjznz2l',
                interfaceName: '0443yo44s7dymdgmrkl9kpfsvzguqqqtlsyzmg97b4h1zis0jzdekw44cky97qh0oafdj3faihikdfqpdm7kib7v1ggel815zvseuilg3dh7n9k5nd1tndr71zdcznynjpol8jpfx21p3jwe57rmg4xlebem25ti',
                interfaceNamespace: 'u5gkrn669pwkau2suhbm0qzgusttzt4bd5rbs4idevf70ieq21wd9pgxxzn5ar7p64t1ct4y1qufr2e5mbp1tpj2miq3okjkyerrikzrhdg71snzmufij5081xxr5mk6lbudrhne3u8ey3fl3wtudgvou59uib5t',
                iflowName: 'zwsbpwzusomfpiyxn0ee5n9lelw1f9drglo9tpdob4fxn0sajd4360895immd6aprqvgmucf6if508oo5gbhyg4tj8l3xyifyju3cdt2buhky3d11tbme8eyx8v4i6fxqy3abq0gkn910rd0aylf6xiix9iq3ksj',
                responsibleUserAccount: 'lauu6u7abizw46ch2el6',
                lastChangeUserAccount: '2c9d420070pzd2svpp7d',
                lastChangedAt: '2020-07-29 15:52:37',
                folderPath: 'op2xh1hcrtylow2dh2b6gf6df81s8ems7dmwr8a0j2ra35cyvl22w9s4oaoyej4bpkxguru106p1qhpwnp8r8w4shme5a1lhbbdn6qk6e7zflofro3yf65eaohfc7gdbj477ex869yc0qs4bdd65tvy5f9v87d6ae8i8120cnhdtqux67slqwf32s48d1mtgz6z2pp4zdq2811tcg80nlz3xp43sk2mqqhofil3i2qh5ts83nptk28beaeiizx7',
                description: 'wtgg1apdan9weqjj4boz5n96neuvzm76pbp2sze8at25s14xakmijfyl9zqfccjkb9iks7466es892zuhvcu61umsdz6u5b208qjqt1donglvv97j5uwlebgmo6nnru9i2up8ilmeflx8y68qcdin76qb4u3p2f4i41s9wzglq81t20x53zoe4r9idgmj6mg6i8c5ej5kaaofiediuro868e1kgccjzrez7qaa6tad3hny9zb7jbp6wfvrwa8mb',
                application: 'eumvsmvhqtwuu9liamis4hdh0r3v9g3leuxz06200h9da51847fgh3rphjld',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'yyqc2rau9rku35eux46ph4swieiv9uhex8eefe4e',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'fvw7s776z9g6w4e0dxq567rkf0ufnmhc0z1j8x7fciej8yzalc',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'ghei1x820z0a49go7rhi',
                version: 'zepu1i79yvjxmlmcxxnq',
                scenario: 'oeo5m0qaqng66f0phpkpvwq1q8czzx3njbrqqec62n8w9ljx4p6uyxe7iy1y',
                party: 'w0d7ccr0t3n5rvwe6ljhkhapzpf39v3lw9kf086smrpkyll45vff65ndmgfbgq7is92ae6nf5px2t4ml3bcll37sjxj9vkhty2gslh3kl301x6cggaha149i5sash07526eto06s8y3sbaee08xb69ilntg2gb3u',
                component: 'jeqvchoyfuzajwwnnic9gaxe707lvy6xsjp4wbo8ikyjtnl990ivlsda0prfrinxaabnzv2iviw27eqrf16vlmdz6aapcmf3k0rxtc6z3t5hmyh33jxdr2cjun6gnewopxcn2ckbmnnc5khst3vjcc6yh1rlpnkw',
                interfaceName: 'y6pze3yldatgdfosf65yxd8iszf3pbwqd27m46mwh68nqvp58gyb698e6ebkakwxnn062wlmssvheww361f4mo0zb2io3wv5z3kelwhsflpjt2b2hk8tnthals4mzemx628fftt2g623txubxt3i1lumteqjo4y8x',
                interfaceNamespace: 'dqpi2ujauqr87ebshfzozyhjhx5ky210qe7wnwkmqi81df0lfjh63ni1wz9b80nqywl14uoziwjqo4qjh07hi1r1rmj565mgoqkexohrcj9eef1me9hylm0armzqhr4jz1a1w1egcsbs0kt64reoyxe8hlcbaq0z',
                iflowName: 'k1q9qec3nywisxisv2r3w7m7o32nz663x88kho4a0h160waplti8f3muryxl1bgpuos29liclghgumh3ab1o3s8iumu0zbzbqo65v5xvg9bca5l6o0asjj8mxqpxkc1spa6bx5wm0ddo64pzepuv3z8l92eu8fhl',
                responsibleUserAccount: '89wgjiguw2458i6z5s5c',
                lastChangeUserAccount: '4keyoipv4ee05m6fn3y3',
                lastChangedAt: '2020-07-29 19:27:56',
                folderPath: 'hhy9k518a44rfzzfdxu9wgi35wf1vkpem9utha7l6my73l97tfifbj3sv835qyc46a7tnsto48wqoefge29e0n4sa5iuy8zkk9rl9kg89ajgrwt2zn8ullg4dccwpg1enlwy947rph0rqt2q7s4geg25xa81fkpk0ditw2ibhe9u3n4rj5ij0uzavc9aeud4u6sfk19pe929c1d4pifegjneec55uwmrij90mc586qol6ha3cb7ie0k5fdqgkbe',
                description: '2u39257f5lo5fpg47cw6t6550havh7ddrkd84j255zhfc3ikquci83fgw03o0wb9pl7whmob1r61cexpg17gwac5vs553erlolpzxf4oninfuxakvvgyvf5i0u31w004kkkfaa79ddypwt29w1qxvnnoruefu6pjewnvx64vg9ofiqmblr5htb3y5anyxfdfmc7rdortpy7l04h5zsl00n35vk3aedlrcijcim63z91ht0jy7aluofwsn2c42nh',
                application: 'alnd30e2gkb4qvr124r8s8p0chx2iegmlxa7zvf9z8ul24c4yf4l1d8rayfw',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: '6vxoqgch8y0j6hkrqnx4qfvg0luwo05wmi63jq86',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'u73mjp7gkjnogps11k01vfbjzmaypmjkyi8rg4n19s71b27kt9',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '7veq9jwy0c48aclkpyc3',
                version: '5ymus4bf16gz09ea6z3c',
                scenario: 'ke0nhghf56gq8rg65u4tq9ztypxpgy93ecl2jicre64go1gkzotdxsqnaets',
                party: '0w8yrbzedgpfesbzzp102oi4haxcxk9b9xt4x872zsyt5bxeivhbcvu8ioqbteyh9qamzyq5lumjspccc9ap3kiuik5b1hctanfgi6nqgqaq5qpxbaa1yczxw1nwrs3e0vf94mnfjluph8w87q9nuhlf32uvay0a',
                component: 'mj7nv3mryif2se2r5n7od5pc4rggkfb9i2gedeeyfke90m6xw6dhxfraywi93nffjwco643b7o824x6y8ju4m54vfyw094dva0n36mpiqfd5qi7r0eav7hzxci69gw47bgmd3xlgbrz3pgf5nj393igm7sncv2fl',
                interfaceName: 'r2d5z48mg7ctug7e0yousvlgc2l42ojbb9wkcfvuncsdmltgbky9r57szw0dwpfsxisj8mcq12o6akno89lldx4drsf4r85b4d6iklcv5ubjnxzo7jok8epgokroe1p32mi7qrbcspzhizuylnhvkbpb7rlbdllt',
                interfaceNamespace: 'q3t5hggn0pbs2j1t8al8w27ynpobeectcqcl5zj4qedtd547v2vm9fdw11081258iw6750opmyie6vza53s4bl9tinzcymcc0a67zek2f9ffsfo66r8ac4z0a980doy2a9er4fzmpylwa0xe93y1yahgdqpem4pvg',
                iflowName: '3nzza4pbh5fpkolzkbsguuwmd7yk1o1hjbc232dlfn39mfowtrotxstynum64v8qzipkvyhgepyuufbk5ygiuvc07noap9w2g7hmgijt8chbgcu47y6yph10oogwb251ukk0zkpusjjj2na5kojnmqr4eh6lanhm',
                responsibleUserAccount: 'bnk5b2xgnjej0vht2rd2',
                lastChangeUserAccount: 'bxrg4t2grigcfhh7l1du',
                lastChangedAt: '2020-07-29 22:22:19',
                folderPath: 'rf497b50c6eeek1858yp7ic0bt9pqgh92jw91clo1boo405n58nhfzu9dl59j3zpdemzbyrwoxwc0yljbcxbrf7sn4nk8y7qwhp50n1zf8oahe0lx1xhflvq1zftfcrx4041ulzt07mzmx1sbaa457mm3ppt2tc1s6rafnxpldah9ucz6aikoya329nfd3931sg3t1vy3esm9x6djox55kutqoq7jj531irgalaaku8yysdbpmrrru8rgwmdd2j',
                description: '159k7mjk67usai4ipgcsgrz1rpz26d1oww4tszd6soc97en5d5mkjqya9cwpyl3xktiqgoouwjxe0l1gnur5um7g8gs8z65qwhbr8r4zm0fgmnbb6twedpgo835iep3lczjc4wcfzbgb9ryuhe6d7l66sg3i85u7y2pl7zgbsot38wu9lro2l3t2fa1etat219lhdlj46sv0pr29yqodlxp12gedrif0zhu0h3jvo12gcu83d8zk7du4u0ftzoa',
                application: 'w6ld84axspkdsefohhm2e50h3dkv4n1d2t11aof1t0c26m9zjoukeb8qtcqo',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'wf5m04kfen3a2ei2mfrxacazh4jcsh1ggqcsca2i',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: '0z8nqbfzex18r62wi7twjvw6irwphu9ohuwsr4o7517vag8j6i',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'cx5li3esfmpt67twbw34',
                version: '6vsa7xdoiawgghkhq40w',
                scenario: 'le2xumf08y1tsqoyogxn3xvhjo0vct1ozjqc791t674wz7sja2zim49brap0',
                party: 'p1qima0mo4apbbgcayog0q0ypzqc4jou5bxhja9uumcb5eyvqzy5hfirfjhmpll8qsp6pvadv8docaru4ydri8z8qtrayz614bgnanwmvq735khucimu4ylfi3fjhgi03ahr19m2fua9r2uq85r7oe70sjmktnw0',
                component: 'x1ovfpjycgmb1lov2iuysxermtkxqc7o47il6qymh9ul78787xvw6keupkuis570jin7m0i0ptq1mid2y5ud25qow289if4b4pm48ogxvppyrfuiqv7nz8gni5elx0te56vmy44x3o3vg4w7ypa10rxug60hwrbp',
                interfaceName: 'o84ules6s7slb5mu8kfktrrdhi9ngbizz1mflx81w56jhh0beh9zvlte37giwqks6sifxi8xa4b39b4vxtnvd9ngq47xc1nk81po689lvi7vlyabkkborp338593j6kc54rvner9qeqepu80vythild8h5m4aog0',
                interfaceNamespace: 'k8155crr4nihqwtegwt1iedh7grpfvyv1iy9wrjnzb7lfnrj56fjxlpipv4xw19zccgbuni5w1fexg9lly4jq0tkbspdy0yl77javsx8mly65do8o2mwti6ziklctzqwelcb1kr6byt7v3khmprtt1iadfm6aa31',
                iflowName: '6wtavviefwx59r0oiig366mmz5imhauu228fg8bcjehjjaol7rsycwekoiq1baappncd24mpl1mzz04pwx947dt3m7qo8ldoeuw4mahdez98w6iu0zzhagzdatjjw0j6sud0eulmefy8i7hcv1rq3zk9c5gkc3cmm',
                responsibleUserAccount: 't6i490z5rncgir89pc05',
                lastChangeUserAccount: 'yy7ask5kve0t9ui99efl',
                lastChangedAt: '2020-07-29 08:32:34',
                folderPath: 'xnl8c07raldsxz1qe42ggue9slal2hya84ixitgi1hvvnj208j36t6gq4sshlewmfxk6mlzbpkba3s02ym4w8ibssa9jg8pfi7hwcl2s1paya6gugku67cus963tse1vgxa0s6vmwb7b6zqyxsqeni7mwd542f6kkmv5qzar7p3x1164z23fjstumh5l7j293ag91njp08g8kjgtfriucd6qpks85v5a8xhyff0armvfl86s6dw3c90lvj9wd1g',
                description: 'ky08cejwthan0u4b4es9i0uke9gldfxf9js1zomkyejdvhirdhg40bvi9pkgkx3wzrvwck7lsre7vomx4fjwa62u5dqgfn3vxq4sm4n2ycy3aixpkch2ugjf380nm316qrcvne9setourw84v8avbjprjmttxyngy4q6tzuba5t3fvjcrqys1wb8nz0y34x791xdo6u9x62dtjkobqu8sah0f2ry8vphlvwtuijc7k9nw17pr1wmz6ahmzaeqwu',
                application: '2hpiat6ijkoivm1ov855twm3ls7h4cqhe39uh48h388eepwfm0817w53xet6',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'm8deocy017ncvvqxyzzlxcla44c57iwyjmdarzie',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'adwoir288b94sfgujmnszzoc86mjgbsp1sht5hbtm1a1zy2b8x',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'cmw0e1ks4hkqndt1ctr8',
                version: '6eg0hhn24p6qnk8wsbtf',
                scenario: 'c929nbhibtfve15hcrp4295dng53u608uvyeiiodt6hg7z3u9jyyjr3cav1x',
                party: 'fjlveb32jpbn72rr99ttvilpsogqze1o9o76l4kbmcrg9ww9cpbt58sxrdtudsbqoop70jezqxzulb08vdxft673uxkll56ckbq18gc138h1jefgksotc0qm2rep6qgntiiyy1zg1a2a28rgiah58tnvnqef1x3i',
                component: '13q9h2cvl0u39z6s134p19qjlq1wnd9bp56wgc32snc9sk0mcn5fue4cq0tedcf5z5e8gstttj2b9u8k323yq9i054dqtx5pw9sdj60y6thj9g2ergjau1w1e8itm0b85ew3cf6p20xl6xqypjo3n3cv24v327kl',
                interfaceName: '8s7p6mdfjz3w31ry0qco07xw1rnlfhga42zd9vsu6fm5qtawfyqbnc4atm3zakox8j8f9ncfjo9mm4nh44wt89cvppz9y1mntnr7jjq9mzpghpz2szxu400c6536khj95knqee01dv3se71fgq37hirxp197qsx9',
                interfaceNamespace: 'x0ga0t810uenkrokr40k0t9ksyy7pdh13g7pd92ef80iz11mgv8o2l9vrn1grrizy9j010j0fc5itp6vnomn6eowlestcj7e8h7yka9k6bflxp9ffc2f0pdmqk08pd98uhiairrzy2ho9if0zsqj05dxg609wwjj',
                iflowName: 'oc8oxcwmy489jyw35d8bo9drzr93r0ya0dmdwdtkw9f9x9qd1q5scu6vg6x2swdqot9kfv7s8rjff6yq8f7i1ufa8dh3xq6jusuit8eomx7lelhzcqmkosixj6vofgik0z2bnwp3pkoryujoq2g5823l2cxcqiiw',
                responsibleUserAccount: '7cae1w88v8prwi1khf4dh',
                lastChangeUserAccount: 'fa56abap3dsz19js5bnz',
                lastChangedAt: '2020-07-29 14:27:01',
                folderPath: 'eazzg2a805x158ybw21mdm3l8uswdyyvfm7lcywojt82im657yymbtbc1dv3ua43cjevt3dqj4e1z7w9qe4mzdvg14v42unibs78yn85fbmyvm2mh98o0ln0atb1lj87vfd3b9treg9o7qqt5btkkqyqhxdl1v4ru98h7q6xjrrv2febf9clls47hmp4947jpcypc19czkqsw04t4jj8he1qzusqanrhanlgzj0fx5whjjakh4lks55t7jccuxv',
                description: 'kdj45hwhzpdhyquabt96vj9i2s5q8lnu0ecyu023as0wwlw286mhhtw4zwtkxxba8qbjp3dj1d89gfum4s1vvdpht4fx36s9qmhm7nckz4if43m3fgic4l3sep1xg3vcvxlez0uovushwatt6kezufh4c7iry1krd39buxogaay15y16wydyuyjhr83li2egudzn91c6wjeh3o46e92m1wdw8tjww0w714fcq6933k87y3flrvb4lhmh62f04vv',
                application: 'n1o3yxmfel1xp6zaobal7x8d1yx986mou03osrh1du1tpi6rcbgw40a34qbv',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'xofebn3d3zakjquv9qxphewz5bro7nlg13dwhgsh',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'hbw0m7kbduci9rb4qmiu215seks0qfjsppyqc9w8wea0xz4j8y',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'rlhyky8c26svlyvoo164',
                version: 'lg1ypuuksbeeosduqiin',
                scenario: 'uzaa1s5fnx17m5w557qobgczh62ow1pleymkxbex5ur9w8biw8exstj88ywn',
                party: 'dn912pv98y1s8sv9r8bq9ay3lqohd1mo6umqp57gsq53sxy69jxk3tvmqr4r422ny797pfie2jwvs6x4fx5fprodq48pgj6ookxrolhmobw8zeuqskboti0rmmep8nnpqenlnbar7uywbwtsinqi77fgt7pxp14t',
                component: 'j2hoyiw959hg4c8hm9ozadhu8pw93c3m7oruxy4ijz1epkbs8w9j9zdfebe2ryx4av7wl4rr1hyci0d4of4tzeor8y4yxbd4k8ighysis9j4anz3w432sfh1pu6kjmkj4545muk96drag6t8cvcweluef9htw7jo',
                interfaceName: 'jgcdcgk6jixph9kq5g057j0l4ud08j6t6cv2xlw63b4feup1fh82beijjk1hknnsofj9kwt6xfj4fkc2wyy5ja3qncuixy89de6pla1gf6j5u053xl9vrtnvp8o3d08gqzrt7c9m1qtp38vja1zb6zx6o5b686wl',
                interfaceNamespace: 'jk37p5oemr96uecvzkkr2dchfsri1197a5arqa27j69pov4zncd51vq818f5rxn54w5z2aqyjgbyybkyl1gydy6lu041bwcxbvcbc574g4d5o0l11nku4h4dd6c7ez11ahbrhfofvooiv8bf3yj0e70v24kb1maz',
                iflowName: 'gpban27yg3ex14lw7jn5yx0qz6q7fownmhmb2nf8rp2kn29pbkinkbl6rcdmvcep062ru0ze6b7hfbihkz1ovklxjeyh84w4r6os03svtlwhzpmjz21sal880u8gc0irg50ckglmcyinh2an9wftux7kppxfb4ad',
                responsibleUserAccount: 'olurr023r6vbzmis5piw',
                lastChangeUserAccount: '2fh0bci02d0rr9ixji4ht',
                lastChangedAt: '2020-07-29 02:29:27',
                folderPath: '6f43u6mn2ogp9zzixfenewe1mpjqctbr3zkq2169zom1jegojlk9aktm2rzj4ph3pt4tojg5d3ecykkq6jr9lv6d1aaf5r7o8xw5hki77aups0h59fxfemtp63yclnrjqf4y5cfsy4llpn7fg9rr9omfsk84uwvvw7i9yqa89r7smx4ucsxeylwvzyb3byuo674zfvzmaoht5w8fd2ce2yoc4q4mshb4qfz2bc3yvnjxoky50qanyahgfvb5rui',
                description: '1wl75cg6bdjq3wgj2jaww80nej1fjztkla19id77d5ysl8sad1yfflhvtyj6ml8n81gy75vj55yjags4tu1m2umerejmwe1c81tbxti7ex3ftvuuw5jzjes35nubqbogsd0kpvi8x7qmh27f1l4e4qxoo94eie89gkrp872fayqnuhu20gg6wfsfs8q3mj0wfofa8krlhq08oduz02p36fdqj8zjohkxqi4dsrkx2bysffuh8shk4tndubgmli8',
                application: 'fdff18uhev0f2ye6lgc3wkcijhbwoeejr237e6jobygd68kep21tc6r5ynj6',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'oadnlpo41ghr6lryff5uewg33qpoi5v1vhnm4h30',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: '269rotss0v4ck44jebetl1cmhlgjo4ezfj2wepsuct3ts19qp0',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'c6e8mpa0jwke1cxdwpv1',
                version: 'vb02lfna32iby7zvw5xa',
                scenario: '12vqg7tk9ofduvo9lozzqrlt8jkhhxuksya7rn3p7qa1kjfubgd2txt0q4ks',
                party: '7h07ix7yal14lf61k638bibcyik5nxcxp3kpcfhz78b9zs6zyckdqp0ctrotg4j4qwwljxtdm2pbgdfkisoss5u7tvxemhyom91n67qnqyeq7hacaz3t9bqoxtrusvh9pirv7mdxpt72hgulcw02hlmm8m4ydrip',
                component: 'doaxpsubts8eci2deh0enp765b31rkp5tehzmf0zy4yg19zs7fss1miqd4uoou4a0ndl0s9i6risjrso9e60jcpxe03ptc4njjmhjv42a4zbvh0ld62d7zt6kln17hynq17ut1gmw8bn7axpvgn5nljn86zzs259',
                interfaceName: 'e5xcbkt7z6cwhx0schijlxfxa7g7ng5np6spsg2pejr66ngc6yadvbdjr4o8wvzq8edc5se314ph75g3a0o8y53wp19vj159z6qnc2rkvxynqbdq6hchgf5yybrq61mxi4ltaqdatm2z2etwm3kp3tdxvr1kv8y4',
                interfaceNamespace: 'lehx8nska17qv4rh260axhqkxqlnhui58ogpim8y0p3at46oboyv3p40ynixgh2ku8wy9soxg3zujzlu179invfhm0ozp55nkrltvc3wud4ym2febs1y54bcqg8ceb6w9fefwmgvq16xt5gmh85dgfmubc4frizi',
                iflowName: '82phdvwubrb6s9wv5d33d2wxpzijmpuvdfkxr1ucnxfn3ejxlvj9cz2m1ayh18ihenku1wga33oyei8st73x6orn06k1qgpjaowk5w2ug3j1w86vn9x1bs4r8amor6vqxeb7q1gsh2h6051jmq3kyuwg8q8dyc8n',
                responsibleUserAccount: 'xwekmtfw1t16a18vqqlv',
                lastChangeUserAccount: 'b46htnl5o34nyruoabj5',
                lastChangedAt: '2020-07-29 12:15:54',
                folderPath: 'ba981h8tcbc8rjgpuy8u0zaphqr2lun29e12ri0fm497rpoez4mubdll2sb5umplt6rew0grse79fmxqpoiibahkyhiyfeuh9qj756uadydxyft1fp56llyc90ujvl7wnq3wu2qxi0b40trwfzsxsrsx0orusnib8guq4zqsunopledeidy6uxnxa0y2eelw8npra324h13e2tpwiof6r7ep4c8tz7bzjh0dz73aatm8svb7x140ktma393utxbd',
                description: 'figbfgjdkjv0xhler9hz59frbdxmf3jmzx0svfdbp9evqexkif0lkgu0k7kvxoizo9y6faifcjr1ps2m5221krftrxbq4xlhhwkdekggoobcpm5efw89l5firzctjsb3qdttl4xadw126v9h31ts3vfhpsxbilulm82ca4glwngzqkg7tmq5weliiarz1vv68t55hrmok6ivrxhel8kvq2hdfsq1e4oeb195c6y8rjyxkhre6ccifkg9eofhfbg',
                application: '66k081d1xnro9e744v0g2yy3u9p3qm8cotb6py7bekuw5wxxollm8ugdsrhi',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'ae1p1gie8ngoncxy0v07isd9e60ipli3x15c796y',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: '9izo5q32koacnwc7p0rjws8ecjoyop63lil1u9j0525nuxc28l',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'wh4368ysj2m8aq9qwl5a',
                version: 'kymmtvadbvnvgje49lk6',
                scenario: 'ttrkoj2xz3bh8guyhvpd4mbb50htse3gru9in03xh78tvn8lap1fl8q86pjl',
                party: 'w7fogsiypiee630r46j1v7os1rvcbs29zk0u7ny8hh29467vo25gln5y4k9r9cf3dkzrhiaitxoe6exzn3dz4j4d1rnvlbm8mjiktqt34geiai99n0il96sy0vrwtjuwguq13ll1anu280i1kf3z4cl5c0927pvx',
                component: 'adjp3415zs28wg962td6rdaqf0s9xxvotvmxsjod7fgwcn0zz5q4p8uy7tniyz59unrnckajajwiil8bpqzgmtolqhfdw7ruq917qqtjpfgj3l1puhjg0tq6sd8b4xa2uxyxjf9j57af4phhoem82jehmwyf49el',
                interfaceName: 'xc9n2aivd6qbjrdtq5gfr7tyxqvrdauyzxf5e9o5loxajtw7javk203q30ti9tz0yj0dmx41xzdqoic23fesurhsyprm74c99m1ehy6bf5ve7u4hs0wt1z5074bi6pk0tz69fc6tkdf1fsrqbl7bzjyudkdyqpux',
                interfaceNamespace: '5pmsugetsai34bvfybx8zd1hgwsigykvqxj6nby6t7gfpjf7wjv08kehtgnta78lq1d85ju938qqqip52x8g1js9wp32hk4iq9zvf3zadmx2k9wsfhxke86qmf6jelc218qj0uk5prz91jbtauu1yocmumdkeusm',
                iflowName: 'flno6r1ooby688q6vl213r8v66bapu0grbo8kl7eoz6fxlgm1f5ic3cy8fcii6w7yk45r9bdh0moxnxuvh4yeu50xy0uzk3rgp04ar0tmzwk0n2hmd8pha6n58pjqx7l90xbsrd1xv8y2gdyhw3hkfb8ehdradta',
                responsibleUserAccount: 'wcc8y7iex5y38p0m1xki',
                lastChangeUserAccount: 'xnhn83hkwa1xklhoy60y',
                lastChangedAt: '2020-07-29 21:28:31',
                folderPath: 'j0qmjvgk2yot6vxd3lafj6jjlmwjz22gbfjmdy2p31kru9gzfv469pa1p2si4006r33opefocmy239xwoqsiti87hffjh4xi8yshfql41zr8twtf4zdneq0fdl34weclj9li3nj3wc3jy18jj65t89b1e6u6gtpk41tpj4sw80a319pdkf597rrdqa91n48fazx3w41sswost8my7jhrgid8wa8veooy6jql666a7qpk3k5jmikw7vua3nixe1z',
                description: '124356b8l5boxcme7x21h7dwb9yb0yhe0ha75glso7wwm79jladc35fdibiv6orzeyp22fawcdy6b3bwjybt6vxt5qgi2hzw1hc5p9zfujuq4ypaj14893jq34gnsgq1ydor32xtz4mw0jdslxjjt9atvlnbvszeykv2isjifarfsfh6x7oka97yq4b899oyifjhty8lyihp3b86qwgljrditp7hg860h31nkhhy5v4m9ltfmnuc49zmk2dp3dk5',
                application: 'fnbbsmwy4zfpr903ksa78gk5ylqv6qhdup58040wos0ubmtwu1695uwh5mvf',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'm2z59vpxjurfvl9iujhmk68e165gzx92v30l8uob',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'rqiwgmdayqict1tegf44eqe7axjsjzb9ish6epwnk5rydqaazm',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'dwv6uukvafr74t13i8na',
                version: 'el5mtfln8wg38tn45c37',
                scenario: 'v4sx72dur8j2ltblwak1e2c34k3f9aqq0oxr93spp7q4tt1qvzx7i904gm31',
                party: 'tpkl7tlt01fqwii55p213yargfhroel84amsolpu8nz8g1dthe4kd3w59a37jvlp6y47nezgbpebjm8lm66ufh7iwca3k7cu16xyveytzayteywlfu5qvke4ccdni0bh4y7sb4ija7ak5run6wku3kau9un8az4r',
                component: 'c56hc5kez6snkuvnh7g8m3ghdymekt2pwlg1i7pulvze7tcpd9a4lfzu6ds4xah5sh3q4ws4a35ym8u7uarz7ohrpjiwkbasclfluzrngfnue10z4xesuczrl0ruhs0olq0fwpbjh1jra5wl48lg40ujm2o3kp4e',
                interfaceName: 'kecw5mz29p4276znnbbv60e5omtixvlsl6na9l1ly0nydylomgd7e7022czfbgtdnqf9c5teea4v84pqwykeduyuev6ppm3qe0n9teopa4u5fbq2hm2n9itli9004263digbpt2zg8g61rv4pomi70tty9p50pz0',
                interfaceNamespace: 'keqz2lo9o3im2hecs80dek70zcsg4nuy5sfcxxwb9li5ftka01yuguc2240wdykwv62ummq4xfm7m6au1h1e41pk60tple6pqdn8124r4jsnysaesujh1avu4p1g3wmr0562zhfwdxlgriwwaqdsl8pgvhthu4pz',
                iflowName: '4wwhcn32cd0r6n4d95s6b3d0lgo2hkb6hozonn6whfy4cll2yxfeiv2szralnvd800rvy6yrbs79nmkoc4qw7mzxim4oaf4i4s0zp0h0mfxk5r4ag9ozsrzfbzqwd4una05vjeed5emg2f57w9cjsb62rf3dxyhy',
                responsibleUserAccount: 'tew2apzlwsy57dil0653',
                lastChangeUserAccount: 'c63e1oomtoz4ukky7ggs',
                lastChangedAt: '2020-07-29 08:06:47',
                folderPath: 'ejdlwpvq0s3r4s3xaii4892lblx0uuggxri4g2bkuljin4w3q1mtshqyqsfdv7hcohmlwdpiwvfavj9hra33g3gwjvr5xkdedao4rymvwi2mtazsau7wft1cys1corr9j0152jfsnecclebm9qkayiybzo50xyzfjvzeio7uct7alzo5470dtyqdivhceodn4rbjduj62axjf2a413omp1ig1zc5l3wucsd5lxndophuug74h04869hxc3g18wd',
                description: 'm8rh9gfumpvtmhh9zoljdejczj3ajbe4jvzahhdfk2katygt7v7ixr9d0wqdrjgwzc4awvzzyk1z3vyllo9m3x3v3uwfh0jtqygz7sia2r06dgxnb9nbogtdl4am4euxf5uxty6br6mznuevanziv6hqafq01j26lwqko01d95n73243s0n3mzpqzahqqvvdctzf0v4y5m0a7ghmk5q7iqsliep95p7fk6q9wt1a22tzkfheahv2b83f7uni6iq',
                application: 'htojasl8glxejwi1ej33maatr6u1dggskwlqpzzgnx3cu3r0os778ccsdf7hq',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'ddx60vfwj640niq7mluya79z5uu7e69onz8bfrc3',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'pwiiiu6ixx8h262kgas91q8m9mmzif1n3nb16e0yuif3dup20n',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '2fhginzd673lpjajyhg5',
                version: 'wgpsmaya94cl2m4u3wo5',
                scenario: 'whwis2kftvl626i7p2t9fp3easzo6q8ik30z9c7lega71fij4mak735gs67f',
                party: 'hjxc9ttcgmg76522u6n7v5rd7ens95yr83jzlvu6rep65yhupajfhrrydzc7pryyqlkp17bmse156uz8fmw0gsofbj2lobdj6qd63569bbvxydfsgm7giq28p97rw6m546zjsmcsjertxgx8e99u3s27ex2929n6',
                component: 'hm98168yqe0t2h1thfptnfsagskapzawwyras4g73psueps7gbjgrm6n18gfncae0bhyic2xc9p1aoybv17boz6xf2zuon43vuhao48hc19cwa959xw64ffmz1gnjwx16mr4rp27w60fsyoit8dhudfdnfs3udbl',
                interfaceName: '1abhaxw2xbrs98jgsm5qfcychu2kq4mk1akv0leoemw2z98ph86e33vmg8jh6gxxxtb5b9ojqd4y23558j46kfqkmlcwtoi2t3x7rm3f2pfenvb49yg5f1z0oiyojqnpd4ky3wqapsgloc5v40o9e70tdu7wh0rx',
                interfaceNamespace: 'oe7j8188j6xutfm4p6vpzl1e65zy3vpfxfbgughhh56x3n4cx5kst1cijo1j1n0cqnam2v7quatsmlfalojdz2nifdnaxknn0qkfhssbzbozlukstbdrruc02j5ubqc5183ktzfna6i5f7z1qjvr68dkgx1j4hk3',
                iflowName: 'jkpjfi6t0gea475hr6lalwg7rlfobw58zopiuhvkmqnazgzeaoezn4pv2cs8ao9vpoavy2y95kbw4jnhjdrjz5v3st8l49et0mm445m9luzjoxemrl1u4k5fbvlczwae6hwmne4o1bi35i2j2i39dqnnfslfg6ux',
                responsibleUserAccount: 'uvqur8z1k0d11hs21ypu',
                lastChangeUserAccount: 'w27f123q9d3aedbe78sp',
                lastChangedAt: '2020-07-29 09:10:19',
                folderPath: 'j794ridu2jkuq903ekd589dbom30nx4bka3pl1zubds7lb0wae6dbcv7wxolmlojfhrx63oj3malwyn8nb9hle3wgh088o9fqhvplta59almwymbhjw7akdni4z5tlrv0zxcjz8vabjhzjqnhiuzikpu2wegw43i8ps1z5s0kmm9g7th7vzfvrv04mq3wla5jgjxi03hi5uvjylxsmdu7iptvsqoxeou2pn96phkm5d8zsjp0x3g1e8g3ocqnop',
                description: 'crmkzqxx4klr32lgnlgtke2mlae0okufneo7orrbdqqxok6i34myzqqjhmashoce67yvhmjygjwuvrhp80qrk51kpvn0y8a78mvkzaxd7q851rl4cp9lbf2hgagwgadxs400sz7xqzkinh1otvval6q3pf2lwlldf3jooxxlwg5y49l2y9aolhtj22o5kiv77bierconk8e2ngv2jqc0fnv0ggldl7rfs0yunjhhpuyu8vl1g8fogcfilhw4maw',
                application: 'annpwr9ca5tscn9die462b7cpe8pjj25mr2p65ladw5ple66zp07ghmdc6bc',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'adw75jlvxyt456l8vsq2rz1wqnvvl0394jxfmdc0',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'iugw6ynxq7nysgh3fbgpb0hyb6n04luaa35jyi4uw6krzerq3i',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '71ebpki2wlf159161xth',
                version: 'yekzglg80skqymxvcxl5',
                scenario: 'bqu8rxsir49kvzp4zq6ys91g9irp0zxgfpayypg370b3bblwinnz1gf5vzup',
                party: 'pud12h0qdvc6c0yyn5v1dtz8py6wv5cymtufybgfqid1ummy6csoecv7rti9fzmgs4kkweixuuto6sthk3gk2a6bn8dhhu18dh6t7qcnmjpvjudyecnwjo9thfpw6bvcfqdofgj7heahpn2kmh40vgb6bmujejio',
                component: 'o3c03tzqm15so1b706nfwtts3xt5mu0rxydps2tm2yv4szb5oh6p495c7gnlsisrmldghlldjf2oow232wpgwktfhmcjxc6kzsasrblhab2bt19i5yvup0g7a7ylfsyps333032d9wubb739cskyakpgtee5f1n8',
                interfaceName: 'nfkuvaehvol0rsa1eepyrmr0yaux0rxjd4nkbwwair0u53sit5usajo156fgufqjt8qseropk3f86mofc2gr50espy6sg2bbtqmjavmy4u6ad1ngi9e3e33swkc4co7fe4dmiu6rem8whym4jdeats2uef0vkci0',
                interfaceNamespace: 'coy9zhnfd99buk9rftofb5rhpqxro17tb87w8ah3e5y290txcokwx900rhdfyydl9e75rau5lmuishikjee1hz36bx83ntnuk7rif07dahtuuuema88e8drb0xje48xaik3rfrzcz2kjp6sshav87hc3x48sm9vh',
                iflowName: '8mgz002z2xxqa2p0gds7yamgl9o4bujvn4gc5nrkp1rix3qi05dcerljrxb8xv94q63op7tqg5jvd1l7ipqo9ol9lslo7urpb01xmyjfcdicxj7zy7atvbh20a1zbs4v7gzcs50wginnrg7b8v9tpbidac11t91w',
                responsibleUserAccount: 'omd5jnoqmusgyvyef4nm',
                lastChangeUserAccount: 'gxcjyw77a4830d3ugumu',
                lastChangedAt: '2020-07-29 03:16:27',
                folderPath: 'ar00uaq3z6qfjzpkzczzscrme3kx82ciehtd5m0jkx820cz8u7ymtajoj1x4f1acorw6lhi8x7khzleb7df3dio0e96yfcm7gnkrn8hql65ag1dzt76apnb0d86kvcmysb6sqpejy3f0p5h2a4chheeg1w23k14jkxhzaf65dq0lkp4z8za2dhjr7lqgxau5bnk5cvlgehvg1vftj2t7f8o8txiuuj3fs8mg2qtpn24wh7s4o39abq0cmcp7y4l',
                description: 'lppkd1mxhle2kdlx5rlg22z43dtbf0k9tvyp6xfqbgyw0pirhr7d8qg6onmzakzvy6tkl431dzzha1w0ijha38ru4hnn72ftbdipkjhydf5mfix4xdn5i8l4ry9vhpxbuz4cvf45xspqh70xzasmntl5c6r7qayrlufyuyugy2aickf9ozh4e1iodethjf8ki51sfuqzrrc9883gakrgxg32rjxjso6yrlpkzr11a04w9y8e2bdf9uxx1xmnxrl',
                application: 'mc5hxex478ljylhvr2b3d2rb226f9ic4tx6xj2bi9xiwi40a2knaziuz8cow',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'o1gmuher5mmso191zrg2m8qelbex9r8ddjslh9ny',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'iqfh6f3wjsnxe1h6tlihgz2a7q13x6s0jbf3cg03jkuilw40wc',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'rfbr9ote1vpmxe2apqbo',
                version: '65znid03pcovque9huto',
                scenario: '7o6egmdaqxilzlz1q4sv7bpok8aa781cr9gki1y4qbr7uiaumzg1z06gtkri',
                party: 'u742jl7zk80btdis1g3datj3jj80810wjk1c98ekbq8z09vpe2jlkiznioakcbdivfmm5fg1v1wd371ie0t3nc7gh7ymh9fn1xz6h5y76nvhk3p2bepbc1neophd5ez13b1z0vb0teal3xsbn9gnktx8vew7d18k',
                component: 'usmclwec9pcm5asorm10sc9lwr4wxkkopfpehfua49xpg0rplnow9wepp7913webelz4h8ll6jut41jfb8135kfugslijjlphsncgli8zfxloukvkdc96q257txh9ozifsl1nrviziy49yigoav0xue5g3bxmx5m',
                interfaceName: '8qaoih149mg1jdzizzkxl2filc166fyarjuuj2p3gbc5pvhywurq02tk47v9fdg0e82qeuwta8izrzsibpz1t7mhc4b433d9m2ecrxv3udxa1fksrlaqaz0b21bycdlj095qyhq6sd8ovq6ezeoif0eobh2nne2a',
                interfaceNamespace: 've8s9bjpdkgi87c0zjfshjno9rbwohdazf5g5d3eslvnyyl0toi5uwdkw9dxk4042n0dkk39o8bp4mz972cvnbd14s4ri1nin0jqvn7ymmnimkv2ixqkjzbw3the7ifhw8d9yzh36tj9udmk0a9j0lvtlpqjlxvl',
                iflowName: 'ocg50qpjto51cpud3gsfu9qhv1isav5qynv5v5weowk2wt4ck09sgo3q0qbcgk9tr390pwxnbi0r0rxtqxkd3xl0vxvmo7pnvoum800neg0k0h3al9pwbfz0hseg3ej87ikfjqciffb388cu0wmtlnthywr8ut11',
                responsibleUserAccount: 'ixhoy5w81dzkxphtesc4',
                lastChangeUserAccount: 'qoby0ms225i30u8rb3k4',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'kzxi3p4njm81fylu7zwcakbjkdhts9yggw27qck0fkpg8rq78aer595ca8hn7qpmm3x3nuvejqdg2tu5ysiz4wdqt7iqffh5mdwe6ww05y2r76qrd27vh0w8snapgx86pv4jh3j95lkv0r3uqhgcp226uam079j7o7vvf51e6wkpvbckpkjtuffgn2l38ydx6rqepzf5jrey5k02q7rs1v2xlkev6l0t2ypnk0sarmltws1r3cg0vd59gpfp39n',
                description: '9hhylngmsv2qk89quio30e4lw947xb7qhtbmg6paucnljpqsdn3fomak44p7o3op8bcauqef5pdrqjvw171uzekllol95tlxfpz5b5fnxxmkbef492yylxjrzfocaxo9ei3cyehmioplcruy7kzc8aibwhkwsrj7ajw9oexf7ynxg7t81do2hmd9kwgbpidvx9dxl0qf5jcnqcdu2afzk69yhbd07q5l6ztwalfjr5k3l5gxud0yd3v13z76l2t',
                application: 'y71vx2tf53hkewb5orbr3pf35t1fdrrupp9sgm7s5xing0915h9828juquk9',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: 'lis3pidmhjcvkqzw3j86eds1gt44owzwyxqlwkq9',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'ehqbuwcchf3n15k817erw91nkkbglod3opnzj4d348gzpuerna',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: 'rj85hb0icv366snx8l4x',
                version: '54lzk8unnjcfw403yd5o',
                scenario: 'l6z2bkupc6wce8jl8tel38rblne9m1i5dnxhwd18pfqoyqq68touoot062au',
                party: 'wp33iqqulx2b5nfv0mmtcr3i1vhmhqjeggb2ntewthv1mo7ibu97pxvctmk03zycaz10bd0qyg3rphkf0btqf8npubjoee8wstvw3i6t3drmzqxfl3eph9mxnrntq294qebgsloxv0ytcbsnrv7j9teo5q28qsys',
                component: 'zxuio7v3r56djz1n55t8tql3v9e0ins06obgk5pob7o58y9qw2bs3i3xp2e3s7owooi8prbe2duqy9cv6k4kh9jy08xpknfln3g4ufxfg09yjj9ou5pkvf3hfu73za8xxlnt9s7jk00u78bcdsifqqukxom86h7n',
                interfaceName: 'ohyigvd5zk4wijie8w33536aqegmbu98tt2pkkp8ggnfxui3dtdmqull1v0zzzv1txgqe7ap034p1zeivv8qlnf2jp8ske9djb0lthsljdhpufo52wtdkurgv8ggzc5kix1rpkbqimqf8zaw1mou0xoodk7jbot2',
                interfaceNamespace: 'guyjvszo8ouf2rs3x23pbcpfn77sbkfm9ii5nn2m9wm4jijhexho2f50fuw74jn5we749eqr08wkdy5ri1h9optyif20wf1zfb4coujnmryfug95vgdoxkbii0ddoa47qhbmanliygetb9rk92n6sqfjh6vh2cvq',
                iflowName: 'xj9gz15syje9mhmbpp0r7xn14dmg773clc3brmjqd9jzt8ndjadnsc33xpxphc0f7k3xostvn4efil43pdef2gwfogspxvcunorzena8ya9flokgtw5jdbn8wg5g4m994wjp1snzf4pb8e1jto1h078tzgcqhkjq',
                responsibleUserAccount: '6u8nm8gdllw37ov8cpxq',
                lastChangeUserAccount: '16cqvkru1rzn2qgsf6fv',
                lastChangedAt: '2020-07-29 22:34:53',
                folderPath: '87p60k47s54yi6lzjmzmsvp0r4itm14agn3c8gh6bz4g0v2085ekeekw4rg7w4a0lf31zz7ldivpi24dprdyoxha01vc2hv4bfna4fzdhxx6stusnugn1ya2dkd3wbq1u8ffuy5xnt0iqr9v6hv1qapbgsv71c10mbbi5i8x3i27pw141myl908w9mdad97elbosblgh7q6qxgi1dw0pes23q6pubs2yujyz62qnoxob342xl05pg45fm2hlxvv',
                description: '00d7sijqb7senz0f45gk6luq0n5qpop68gswhlokdtb0onkcxyo6rgakv6tjxi6imarof8fdrkize5e8t27is3e9uymsza2a66ec7sxq7fnhf4s1w7enjo0rsfmvydtiz92npjqlsab5raoovmlnqi4p509abra8hlkjrx1akkbk1jjxnnm961m66jvhq9dye9wli1flscu3p8vu5cr1jwasiwirun4wdeypttrd2uwi3r66wxyqwzhn3pxxxb3',
                application: 'll7kqosid9iskfykd1wgyw07ewh2u8jxf8xwnrbwh0p31ldyzlrf5va3rwv3',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
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
                        value   : '63782898-8b0a-4661-a88e-4304ca734dd1'
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
                        value   : '049dfba2-c985-4a0d-9349-eacd2961a92d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '049dfba2-c985-4a0d-9349-eacd2961a92d'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/ef4d0cee-a3ab-4aba-9e99-e113c14418e3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/049dfba2-c985-4a0d-9349-eacd2961a92d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '049dfba2-c985-4a0d-9349-eacd2961a92d'));
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
                
                id: '99ffff15-82be-4548-bf06-5a38614a634c',
                hash: 'vpd42rp0fwidxkz08vhtj75hxh6949i07zo7i9ss',
                tenantId: '9748f249-5a96-4262-9bb4-625ce4746812',
                tenantCode: '4hebyg1acdlgor3xwd35059mv078vptxxk9m9xh3vt6wtdx5vc',
                systemId: '9d8b0fc8-b700-441d-bcfd-e0138a9c2851',
                systemName: 'ndk0pduckew3iiang0ec',
                version: 'ct5tsjpxljx2wn194od9',
                scenario: 'bynab4py0ot1180r7e8tixc8hvt8h8dc56z1gfla8e6i5p6vamj3j98gc123',
                party: '4eh8jwmd22ip579yqq9lzqhf17h8j7dsxkgv53uumx9ugnzy02b53jqp5laowiz3v49l7c6nikamz1thqugk6cljcn8t7bt8ngv1a1yl7pjg48sqyo9bgvbrux605xyaapr01me2ie7p1ic9bart69kwsqtii157',
                component: 'z5la1z9st3lwnsve0oo3mfd0aygas69u8xqy18gneqfmfzpflqijgkor85aravsb6kqot2465tgg79zup192kd3mksj3hjjb70a0ipgide8ffdlx13bfpr4m1ip8fmtpou4l43xhcgy5hfxtimr9a8fvl43sa9ng',
                interfaceName: 'gfxgu0unktkgbqpxo5a4c5ndqz0kjhovuie0mifhi9qdt19oibwfdl7m1cy5i7jndntc3rt48iu0b8t98wmzn37jd4h80rp1eigwdpxpnny5f70d0gz2gmfapahlyzhg9zrnzvb4c04sc5wnte4d02a0r5t11h4n',
                interfaceNamespace: 'zsef8htp5ndmbthifjglhq66875q53zu0h6a3ptkc3yf7z1busg25if65k987xrodileokreytlbgqkhg4lqsh8v7cku4lls8sb862w5l63kkksed2mhdf7adh8ij6oynffbdxc57uo832kddsphs69ynmhzzqv9',
                iflowName: 'el8zwgl5qnw4pbelxni2euu1uwzc4fazdk3pycl2w8e5sdneq1w8t17hawdzkiw23qf2p9mvhsbnt3t1skeo8murxmoviaik902791qpr950cp840adca89ldmb7qkuv2lkv3vdtee6we0nho40sinbwad0b20nb',
                responsibleUserAccount: 'pv1mjyu61czcycaea6fl',
                lastChangeUserAccount: '8rk5wz9n1u0ri9kqpyck',
                lastChangedAt: '2020-07-29 18:16:49',
                folderPath: 'e2n6fk8qppzroghmkexu43t12f7jhr4y9pi344lxrbg5nda681y4ri8jet27wdpoh5pnlagk4syul6lc18eyrzp1gfl7atnebfe8b3eio6i77s507cmcqiwht50x9rw4ehy913xv1w9l8htlwensa4s60hx08chz16n8zmxvh6cogark1m28i0g2zb01zshxashpovenup1gqy53c7tr3og346tqmzulw36s0yctds0iznhvpjxxuktde0enqok',
                description: 'pfyqide2sx5eru28oe7thsg48m26ytscldh806yhupxtj28di1dqe8vvcxicozyvhva234480w9jweb1k58dtb4jdble0qt1m2meuoh2mnio1n596sqq1gzwrkl4mpvz78pnbiz6vvrj1h6fijucuodnf52w2yokrymu56bend7eb3fak6i4plqarxbdm8gcqve26hl7z6qenco9f8kgup8ksmkf6e0m5pprrtdj2fhmq3mmd3hmc1g04mwuoep',
                application: 'ftr3bezksdxdu8m5x9a0rscnf653b1e5lkjxkxhwtx5hfxpc565aib864f3q',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '54467f13-0408-45e8-9bfb-1ed45d7db9ca',
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
                
                id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                hash: '4hxrqmc0yep4zbahrmc5gylt6o1lzto54k0p3pc3',
                tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                tenantCode: 'mbwf69fxuzd4jse6qwjke8somfstdkp46y2elze2lxatbc2ihm',
                systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                systemName: '7mpeksipdk444mj4s4pt',
                version: 'jnsucuudsgbzmuzdzl9m',
                scenario: '1y3juiauwyd1yi7h6quuvfptyvzqbc4pjz0tc9z3k41gdgcmwtv7kj5ikwvo',
                party: 'cbqfn934wqdux21j3kqi9liofh5mp0j3imqxxbhnsf4r1aybxvuum0jx6g1p5ejjlxlcn0jyagvit3askl3qqcfj0v5an95e9pd439q0s0uwpadyilan8ke18d9qh4dh4dsa17j6g9fapu3ait1kt099fo4l3zuz',
                component: 'chz94bn64yc9xtlr97vbquu47i293nzj1kmyjp0vlk73324nni2mfbstqwjafeq6d10k0xpgphc0jpegafuj6ryssrcx3by2tx9yxu7ujro6q3dmxbaen4jppe1owkd90ic847ft4sctaqrcej9yyzyeljghr64e',
                interfaceName: 't8mb14cmgvpbxqs078qpjphr7bc737hvilwg068jhswmgennm8pxc47krg3u2urommxx4w54ciujoe5w6f0zpghj3kya5e4z1x08uqejffaosc2hqibepehm8ht0bma9e6feysy1n6jfofsssquq1awwmixp8z3d',
                interfaceNamespace: 'yrtt4w6eo7ikcw8ggr79mklekkvyynjchgpfe6i7hfggdq59kubao3kxlumcd11jqyqhqmy5dwglbks0hkcgj0xih35qkkqyn3msm4dqlz0oiilxa4s1gaojkhjiq3nnj3ncj15wvv173dvbxcrbn274gly6jqgl',
                iflowName: 'j613j7t8mp458gif2bzfmlmx4fw63xhp8gsc2hz9u2xa0461rl67fjpyu7ukcxon4esqj6ecox0pd2hnumpjflckbbfx1ywi6wi1n7w106g0t50zbw2gqxclpqie7aisa633jfdtcxf2qhd8gd25ysmx3dw9pn7i',
                responsibleUserAccount: '5eo3v3c582mkf4fxwc86',
                lastChangeUserAccount: '7syndgu0s9rl01wk8ehc',
                lastChangedAt: '2020-07-29 23:09:56',
                folderPath: 'vebm4bmhjc7utag4lt3tlyu41ye1tt1bk0ejm7jhd7edg2jmvo77u9rgzqqvkleiemhokomgopkprx46hj04yyomh74d7vlrcgtnal3sz9lqkiym29ww4oaf0unat54faqisgmuyke8jzw4gx0ug9me2dg45fsyfgflqw0uzubvsfwwcuxta4uvwvewg9uizoa9m3oecx2rk4vn5v2wxvattot0zf85c5r86xa3zux71w4jdg184q5gpb4nzm0p',
                description: 'evgcdtp7o5avg6ndbhmndbzaqu0bcu6ilcgc20h38y9t8wxfy7ygas8fwnf60ubserxciz94kdkeklu5l7r9mtpyb7jc5e0wss4clqavhrh00xhqb8i5cxekanx0rkzscupotimbei6a1neld5utireagolpy1aq5jx1sqkuu2rzfw0dlieo9p0dglr2ql9884zs14e4onxbzwk4o8nvkewoua4082ve5c28clzxx52rnvnd26vacba7yp0q8id',
                application: 'zukz6koisdcbc9dzp1o07av4swpcvouyt7sz5s8oegqpqr8jn02jx6ppe4y9',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '049dfba2-c985-4a0d-9349-eacd2961a92d'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/0603cb2d-0d42-4209-9fb5-9a78998f40a7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/049dfba2-c985-4a0d-9349-eacd2961a92d')
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
                        id: 'e7071b10-ecd5-4826-9646-8a12e438e41e',
                        hash: 'qir6h482ydl69xv4uuzas45d7n5nags3puscktrd',
                        tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                        tenantCode: 'o7luggh9j0e91g7h56fc7ebef5t7vvrm96pi9yds7fguotgjjn',
                        systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                        systemName: '8q9h6fg28h9eyx6fyy1b',
                        version: '3e7a1e0zaaf3nadg5lii',
                        scenario: 'rhqekkdxbqlb6ck4364bnjvc8svpo789t0v7mfhq9z39wkggq2c3hr2jl47k',
                        party: '81wlfz32wjew56xv1zpf379kh017eufy4773ueoh657uefflihkmfemj215uixj936g4js976lkmqq5rp21wlpywew09iejl941f29yk5131d49xgb74vyxme5mhix3zcjn71eaqeya72if77k5pzepkotpup3fh',
                        component: 'kdyo6bf7hw59ygi94roaf05l8gv1yt4i66yhhe2uva571tnhd267srr2ibo63der2b8117shepl4l58bvj8eee1o563poc4cmcdzrrymyknlf8xak41hy32qn6kng1f8a3l0f1uar1ew4im5garx0n498niaq60h',
                        interfaceName: 'hxuc74jqq7ix5lr6dpa5wxpdo36zcxc7hot5501fpobzl0bhv8laqmfy4zs61j4yr1agyv5qap3nvapmtedkobjpdfe101t92cy07ss08aqctjzacvianm9f5j8aj78p3w3i4oo3d4reye955vuefb44hvvub9yg',
                        interfaceNamespace: 'b6g3fdbp0tejop6f5xfn64nieh1vi7a43w8a4yxorkq37nc3k9iocuwfhggxx1xadvnjin2ujih9a8lt3mmx45g0q0ew9br3pnf3pe55gdbh81rus8m0uek1gkzqp5tkd33nzlkl7osqzkkj67m5gh01rxx0ud5t',
                        iflowName: 'kyxbjp56yzikvzqlah74gdxsal4tzx3q4n52c0esam7s1w4pambvs8fo49kn5d5939hlht4dn604kncip0bj42v2s49xz83vldn2el44y0vq9embu971xcbn9tsmpce8jaf2si2m0vo3ogevz8x5brp8l3yqmmbz',
                        responsibleUserAccount: 'q6ef8uykgho1twve294c',
                        lastChangeUserAccount: 'vw9jjpa8js3pluxkc9lk',
                        lastChangedAt: '2020-07-29 22:58:31',
                        folderPath: 'o5m9g4e6jy5l7j6i6tdu2xfqoeysp13k4cp7nywnqmo2znfa3bm7xe54pthg121p9n6lq5oq4vfxslp76p0vhb5i6oo032r616frtqxypvm3q0v05hifpnezfqmqaen3iw3z5timl836eaeeghhc9rlv1p35pc9342urtsi0coxob09kwtwddgc0rtni0kyuko4qlbdbk7gte2lnpjtp9wsr88gkdhg90jzdtaes0o0e1sh2ni4tx05e15nolye',
                        description: 'qd7c29ravx1nkpio4iax42ap07xk60o6jpj890ax9e9vh8kg4hkpulnhs3qyn3fok6w5ste0wxz2r5h9wgx4vwjn3o4zc0kx1qm4cme9t7ht17mm8m81u9i1xbx88719cuecafihoicbg2ysb3yqh9pzs30acrq4hc620n7qxjfo14zma1g7pc2ka33mqz1oth1bvrhy01zkvb9d69tq57dkfuq8yo7c5ob2unmlvxxbw408tfdywp13oj10c7t',
                        application: '320lgl842pco48iikw9jtu1ikbjpmj8wt1pkrd96n5r73b335xmo2j8h2z4r',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'e7071b10-ecd5-4826-9646-8a12e438e41e');
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
                            value   : 'bd003a93-a7b1-49d2-8bba-1736a2b21a24'
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
                            value   : '049dfba2-c985-4a0d-9349-eacd2961a92d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('049dfba2-c985-4a0d-9349-eacd2961a92d');
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
                    id: '4cc4cca2-6202-4ebb-831d-cf3df3e5c277'
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
                    id: '049dfba2-c985-4a0d-9349-eacd2961a92d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('049dfba2-c985-4a0d-9349-eacd2961a92d');
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
                        
                        id: 'd99524be-a18f-4c02-bcb6-ff6a8c5777b2',
                        hash: 'h8yp6n13jo0apj0a4pegz3iqmmreebmzsuhdra79',
                        tenantId: '2197052d-ed43-489b-a795-3418c20ce9a5',
                        tenantCode: 'giq49iwrfn1i0z2cch3s5n91gphr1jvgb32zpqowtthg6dxmyo',
                        systemId: 'ac753a76-8dfd-49b5-b22c-e24aa0ffa17b',
                        systemName: 'jx01d7vk8valnuvwlxjs',
                        version: 'alnp9zkvo8i869a1afzq',
                        scenario: 'fne9xlnjwxhd6joyvi1j2ktvw7stmyoynaw8zuxc4o42g72vorrqwfrhds3a',
                        party: 'wkknv01ptmgxbioga0381gt9hwv3gmzm9jaw087182qbbk3972cykcnessv00u6wah27lgp66up2vtntyqizzqnh3zdkire4zygojjah3m88olu6grfffwgphiltcq1drgm1npdh68tnq2e2ascolskzr6j2d2r1',
                        component: 'g5qta31nqbe2rc2r1pqu304ki3yeqj1r8osnl71m7l2qqmp8m01lo3jidiwcgn6nxtx0g0gg88w843spf00gbbygi3wltm67jpf56cjazay5x4wper2t8c7r24mdhirdfg7js46hcpzj1oxgzpqs4actpsk5hf1x',
                        interfaceName: 'ezv2uatbnbeb5eu0fje8r8csskkgbu1xpdny45t8d7a7abot5yzpggvt7w3u8t5jd9bqezryk772mztxh9pndcjcvi30mko0i4myq1lw4ipotsvyyi5klocod08clazj25ndomj9okscdazu76rmpmq5qg7tj8js',
                        interfaceNamespace: '4ug3ug0rx2oi9qgvv83788judhav3h23mvmzqvwhyi96ezz78d1yd480w739rznz1igtd3dv8i98gbu16blwq0rgtssxif175uv89g6jazxlfnsttgo1a5gbpax6jiu57latc8rtk4zfggvxaya2bu184f4smk2q',
                        iflowName: 'chhn6d66kdg5idqtt5txtwm711nwvbyr9ynu6ucxw4j85sfx5wiis3b19oiv34fdisk9rjo529ixz6u40pfjxsa1xv6akx7w0gp4df9k6kimz8n8w8d3sr2nipcgzeckg30nblzcg14d7k0zm08ppikxnicz8vwo',
                        responsibleUserAccount: '3fd886w0yy7v8zrsnjdh',
                        lastChangeUserAccount: 'xbau6b21mue6kfr3lqw5',
                        lastChangedAt: '2020-07-29 06:10:43',
                        folderPath: 'vd735lnn55yvrmmc3b3bb9fa0y5vv2tf8gixzrimji33jcec1hzqagamzlvx1wni69r7undyxps5he3h8y3ae62s44fswil4ncp13ztd255vq76nhdvhvpeh1oal6sfi6kztk6z1lrbju91x2q0k1jmi8reoxonk83f6sioqrrce9x9ockzmkbocvkga4w9ohugeecisiyxd6bwusip0ziye3bhi4c0msx9y2e0tkex51odk0o0vwn35ndwrou9',
                        description: 'tw8a6ynp2qaeqwpj00fwakt44io5nfxgjwnft7tw41ktkwst7cllabbilkwhx7bvgzttogwpvx41ttz3txt53dbedz87dgwvdcgdgiabkswj70rmn1rq6d3winptluq43gnqx8xt20elwhnp7lmu3yas4kdy9jywcl6e4ohc3m1he5nbl2ysmu9tznsg4h6qf8jl9mdzf031c0m6nyk5fajjmohhj67ho6fq4jzhzxxpu7rrtbm4rx1odohobwh',
                        application: '8xsg94nza7eiaw2al9e3w5sjotfgp3hh99bug1i03aiwo7lghnvz3jqmwgih',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: '0c12750f-6a53-449c-a706-48641f799361',
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
                        
                        id: '049dfba2-c985-4a0d-9349-eacd2961a92d',
                        hash: 'y0hlprb1drarlgdtjqpo1lxtgvml429b460vj3e0',
                        tenantId: '79b12cad-c428-42df-8f7b-411f865c3f47',
                        tenantCode: 'ocslr2i2acx065ietxo3ymnhiffl4o8dpurjxnrxrl2xmzihml',
                        systemId: '62c34638-d7a4-463a-a635-5f070479bcb9',
                        systemName: 'vv4etjwhmntq8r4i5pik',
                        version: '36kimhndf9fzfz1d8uo8',
                        scenario: 's357xwq2ud3fzir56htrsgyahe14tpiey0eesfp1bzglezn7v8ua4peabl6y',
                        party: 'b42mu8eigq9z8gk1o39ykuz0s0jcyq995fvdkcc4re7fykydpbgo8odyn8nyxjrk9w2m3jxiosekkpzc8hyfdi8i8yxclp1ft4tyu517wpcyhfd23asrpvkmha9gsj73x63oo47sgrfb1rqyi6g8uzpa9k0uusbx',
                        component: 'jzst8otv4ba8yxr2zbz5v88dsf0gy6d1xzvuewav8e2yraw7qa1e4nexotmdovuv5yhfvrr1415f50hxxxxlpmnjgnpsjesktcml65ty6wmlctxhqtk44rinjzfn6ea4tdqbqse3g61p2qs9gcutz2s9240r8b3x',
                        interfaceName: 'd810dtm4r1d1z709npzgtomvp46bdlwea31e8bb6qrvtvh7dki0bs388q83pcohtqya6ytbley982yuwe3r9onl76nf64l4yn1as04mksy5anhtyuyj4jcj52r7z8mlgixh7c2bis7im65t5bojjjxdmbmj4eyi3',
                        interfaceNamespace: 'm9ayggviyfckr8rinqw49jn3hqgazyhr4q7mezw18zqdkm0tktlkko324u9cw1ncyvp6bgjyrh0vqjac1lf3ckk680qrwrftdf73dnidfqummxt1iu7v3vrkbwcc3jze414gp1s9yhfads99tmotj66dsm41s6sj',
                        iflowName: 'xvkef01p7gm8lsilvoi35iyh4gbai2g206bex46oflthmoqi2xw96lpt36v6633l6xyc4b9mqm8oi0kf2w1wgjiur7vryx40dxw5tu1hkwe549g8dtva01299viisbsd9rbnnpgymd0akf3k788uj214ngu3zkja',
                        responsibleUserAccount: 'hpio9rshqetsn91f6pl9',
                        lastChangeUserAccount: 'yzzpjv5fifutkgp5fclq',
                        lastChangedAt: '2020-07-29 18:00:26',
                        folderPath: 'tdxv2y40kfrj0hxh48e8ubw4d9qwuc1h2utgp2miunnve0ufu635p0rc8aj3bir9v4nvlv6g5l743fb4qv39uhnj0ua9nk0j08k6zcetfxmorlu0l50mdmum0m3i2vag6a837kk8fzrbn76bbr4cga1huhob1bjrcvzshyrvyzqunhrks7r02icrtgd1eu3s3vpu389akvy9rxi7l20cmklamqaqjvgr64rsa9hxj1476ub9ljsb0e08jslkydm',
                        description: '3ny1jiuol5s2c1yx8qkb700vgrdznax2poyhtgiertkeyb4du26wqolgdttegb4h56e6yi02vk1nrjqzx53fy21180dyoudas83nblopolvywys3dbjntdellom0ijrxti53i6kkusgwc6i1ti00kcfwa3ngkskwc8xhjd9t38tmitiqdr4angc2ysaaqpilpvngxel2yysv8l6iufm0tx873n7fe8h95xfxd9c8369fecc8tctysfvn7zapeey',
                        application: '67kr4xwroljfr0ob7f7ozskzo3ce8gkqhdvsfui53bgc2zpl9gsnioyxr4t7',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('049dfba2-c985-4a0d-9349-eacd2961a92d');
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
                    id: 'd24a26ef-15de-4730-a8d5-b73392d57909'
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
                    id: '049dfba2-c985-4a0d-9349-eacd2961a92d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('049dfba2-c985-4a0d-9349-eacd2961a92d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});