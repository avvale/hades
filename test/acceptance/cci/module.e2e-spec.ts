import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/cci/module/domain/module.repository';
import { MockModuleRepository } from '@hades/cci/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 's4o37pcnzxl3akny4wc7u1p9glra132mh360oid3q4vzy4p5qf',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '9hg8cocgq2dyyu07km1b',
                channelHash: 'mnb654rhp0cpbou4ji5yk0sfga0ojy16ey8a7to0',
                channelParty: 'zezmjolszpkhe25o1vm6mmr6chk4rl9fd8mdn4q7g9ivh4g6qq1arxuh8okriw0sogais6ssc8hfjmu6vyk9xqujrg6578apd5gyb0j6gwzr8riuz3734fdpplxn2lpt85c4ccex299b9f82h3jnok17vryf7snn',
                channelComponent: 'nmtpmhpvxczqnwykmwo9efc1p3ig6ro6p6lqvv3ek2y0akq2wjrnf9irz7ajrgw76a2f28ndmui2zlrudu4ru5qk5xafagwnnh1tf4k4ou2dkwxpqseiaevx1ak5zbiclkaewst80ybkp5sbkmx018oq26mhero5',
                channelName: 'gioy4jbhi7putpva96hj0357zr56sy42ayjwwbkzbiex935c0e98r56ujsbrw75vro0dir2gfwd79i16dk4ez8hot5yk0vtwafd4w6j34ztbhymiqbirh4agkhsph5r7rz2t1t44zu140w0tw6s408viez3tz6n1',
                flowHash: 'metkona6v9e71jgim30fu1xx13jqg56ksn4huo1v',
                flowParty: 'pk5z2z7ht2lzkmn7s14cjgnlju5289kb2xtonrzb8b0hcfty339h3qil9vfvi438sdi7xxkokkn6wwlbhf4glff14xvszsh5ksnm04dsdykegrsfzf09y5v1f7byqwejoy93gorbkwgncptn72wf6bxvupozpipn',
                flowReceiverParty: 'anlrrytbfl4rzqsnvjwgsj66p6254frqic5jq6c0cpqj6y94aks44romwb1bjx1rttrje4faj9bfp1rompt0c5xyf5m86lnad38if4jiud0csgos5ei19t3hzo3a0uix7n2qoazcnnkvbypwo8boj2qgoygzqjfo',
                flowComponent: '2v4nvtg9rbwxdaxnhrw70995dbfj9jyk3puh1mxan4f8ddao02277fbp7j1b3dshxsfkgdm86yfp7n03sak3q3no6ah7qpwlklb7hcslx7uwkkx78xwz4v8q6cmaovhfh6yenaaq8dwdcfk13ul9elbyqme3revq',
                flowReceiverComponent: '47s13h2cb6e3vn9wbsectoqggga6vz9nptkqjv0n6yxh7d87ckjjcnb6s0nynnbozpi6shymm4pcd1rslysdoioxd5fisq7ih7a41hhnn9o8bcsau159gwrxa6kczfvu609ccgbz4dlo3a704jbf98vbrm3d4aat',
                flowInterfaceName: '0zsidm25j7ie9ibimx3fhzv42idca46zj809p6cfcy4rrsw0d24e2ibysb70c19i96gsghm5cfz2qslc6w29m304zjw30n8aarxdwj0lw0lbsj1l8oj9wqo2db0fsq5muhebifz1emw5khlr8krobcgry18bcxek',
                flowInterfaceNamespace: 'scqmx1fa4is8z2h9wqbaxdhwuqxhhd3ty46m7pbshwevqvqfcd7wopzgxfsrcheskaebzy68zddnocsek3a4ngim9sr8v8v55vmzywzwk6g21imryopxr2rbtk3mgehz9r9oi6eaa6vqcaciqqvnrpokguvj72gh',
                version: 'w0ahrym9oqwwz6xmt2lg',
                parameterGroup: 't1x2sqj7bodbdld38avi4zsjy4036eij05sgfvskne34gy3hnzum2s2cuacgtxh9ib3egen3ayfc4ughc1wri5yrl6usjim0no1g7jsum6s2cf8eepj1g6803ny5v72n73xe8brk7kwahhp87pg1au53s4peha13923fq0e4wp9pf04bcn8ptp05fom00bz2tb7bnplaf8afwlyrgi7ju5xcggf292ipu1rlplcxiy3lixboly9bwwfmqxt92au',
                name: 'ms9mrlrgjwdeo1ta56tu5wsoobbfvkilg2q8jdambnb1xyxnwa4ndr243r8ww9hdnvo96dfdoeqe54xr9esa19cgp45mu11rnmgkqedb4hvx8edbmapchommkjm4dw39oaul6pu87u5zqmc28ktc4zuh2n7cdmcmtazg9c226l984ly10vtkpyv3f2661y1nm5m71knef78l7vlx7gdo99zuy04e60qshetw1ov81iozl7860y65a81vtrqvpc7gcrf360ebyolr5t9u7h27nbyefc3xsunfxz9prf7jdbcykl04e9lwyy5nuwnb7otl',
                parameterName: 'xu3aac75h9xaqvqa3xrg752il9jdert2qmiotlhfzixa1dsgi8ngci40hlfq49mp3cjjbeud8anoetsbl1i7pl1rnmqdbp9g6k1b1l2it2ewue3b9m91v5lkvkrazyp03cdojo0e1ed7tcb2u0qmq5pxwz0ypb38bofqm018d8f3aqewiby23y2487i5vgvmzcasvvaz5cxy70hvzr7iqeuky97lro8m3bm3wcpv12jycjw7xjly11onbfgme62ykfy856x63glkgxj2pzewzk8t53g6n809cdt9cibgwb3nhwt8no3fjdtzaqdn9hi1',
                parameterValue: 'gdxscmv6o1o0w07pyjaiwy0oxcdxlvzb3lktl06an2vot7t6u41x08wx6vgdem1u8fotlqoui5w1msyy5daf1m7mg9lzfltss0gvt198jx17liujiv4t5dxrkn2yps2sff0bov46liu3wuwfzhg898s94c0sev5w9iyn2puj1cgoq6kyvhnb048iql986o0jexi3tj34wz5szzr170a9x652ma1s553sid1o7l13pzw58vi7ftv3s4g9kk2zyr0hs7li5yxcs50igspd903p2kr2rjvaqsjf3yz4l7rz4vkz17ad1mxasvmtxuf5h6oi0nrgisms1m2dfyeiao5fi6ylo58j07i5evgi5s2v1ylz2g9qe09wqm3cxbfwka7a0lwhl9ee3nk9j3kbxk76g1rzsxzzpm6gr5jz3o9ozygeanxdpsz54qhsiq8l9i5tisxmy5ufqpo10tpf5uca4qpsrbjuvlhm67ew325cup3jsnwkajcfk24x4vxkhlvqzppjfbqksb2ffsqt6jbg5mmyzt3o5yynzgb80itv5hf5jcg7fsjkbc69jscmi4j3w8alcjen7qjgq6qsr4fd89hbrddy6osrqbeo5k1bc065wcsb5aul8pp93naom9r8z4vhhsm8ggr16f0db1bxs072bdai0xo1sp0d1001hsinwlc3xew9bk0xbbcp4iih3bqmrvzz1jsxs1aetyovdeydjnmz5b23sjjljduwwc49wlxsxnjx712o99u7s9ebm0r5x5w88itthamudtxlmkenrex7to0ldh10cnwkxsglzp3j61jacti9sjs3jglf77ggedg0wytatdc8u51r1q6zqxs9bnmyuyjn7d75zbkzdy8wcd8clvaazjkuy7jca3u9inefyopgrjt9rtewsq5j2ujey1tu79s6jmi3iomks7qdalm3ogmv5ecggjz5fqm9e989c9yaw2gxfx61ag3x6b6520ikpsd6rr04g0p42j5ua8gfez5o32rw4rl6b8lco8wfz3ducmbkfls25yylhz7l8q4gvwdoq3ze6ecva2e2urorvwkmh0c6wpeg4kehfgojbdl0stoeurt5upikl842tjukr6ph4ou3u3o5313coppawrbfzsbrdjlycdobh2alvj6pyt1fzf0hs44ib9ldgrk78zc4u8ko2c7ey1urzkz1d0tudxeif31857zuxr0i107ew95s9kwdhzv1tn3o088us2d6gbxafdjf47mzb23lv0k11ow1gm7jvi4shf1l1dwdgt50qww3mxc378jdxsr6v7k6fvb13ge5dl88e81mv1flysqidiyb0ip63rfrzvx65byba1hgc9zj6r10nw70k0s5qj5p1z8vyg49zabb4o0x706ck9louwsuto2n72eo1w905dsuvdmilqybv4ycdipnbmaricp4z3ew69dy5dvaw9w406mspqkitj8c6ck1qkuolhiz4h86cc2f3dxo4r2mf4exj674mlvbscdrvf8ae3mpjnkkpipmie5zlecq1h6247r2dj0td9ir0m3xdcrjugxv358jmdxxyyexpen0dmi8o6xylsxxwe67hnnjnr36ky0yoz8joa237begwadhlv6j0k23o3ailm16kprddebjep99hvtj743euh526y00crfh0txg9lpbtg71ei7zbcc9jiggkass25ac7ri13200yvlu77sdsevuc4q9gpyqr0oy5y0g2lozxp2ilrns1kdkgngmhhcvq80tw70ie0lhmqeks5v9kdk2pi2o69sb1rrtndidfjsib7t1qdvo7b5in7orqtdxvg4gfj52txtbajcuqtvy8t6sl9s5qsytkcpb8lsh15rra5erf3r0yexgidwkdcovnyxg2m9ebd4bnlff1fz1jcuo17r1ko7n93p17q46gjkwirsr2erx2e7fsk1n7mz4e7lq7rmy6zx7evcz2x0fqz9lft9cegxk6ldr2e6qeyfwi7lplc3qbbihbhcy7x6eyskfu7uu4mrvx7wx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'jw3lsoai67abifpd4g8w28uhgpo72sprrrhkz9b2gwj18efw1h',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'mmg9oai8uke5qnczjmu1',
                channelHash: 'jyr8bbak8g2siq8kytu4qpex12gxvjyngoiukmg8',
                channelParty: '4ts09k1wf89c08ugnpfnsfg95xzf2khmpvfwpsqc4fzblt8dfg78rwhhyqixljrc7pe2bgqz6ka8f5gjxt6yfi38qzwbar5irzjxn2bj84pv4tcf0p4uhg0qouxxikra82kaf7cov934dbymcb4a5uco6vw7ilsp',
                channelComponent: 'c7jtsnqbdus1uqgxze0jyke2cgvyit4uu5o3a2dpmcpzp3jgwngfdvi7vab52gy1t3oq03dlmqzjcvmm8u3012zpj6n0vysp1l6aguwr9bij5o1zvx28fo01xp6j7sb9smkrqc1ees27tnb8mg3fxpr9h3dmcvq5',
                channelName: 'u1higzwm709m4bz8sx9m9nycg613g9jqf7fpzbbhvq8kgk43jkdx82qs2iwhuu4mu42ewvoc8om7v9w90entvyo4fzv3e4htw0ulkon51y5uaq257uocehri864gmffjh14gquk8kqyejmax79np72vhk1w1tcst',
                flowHash: 'selz1lnbg7gcapfg2qqyiahst531lttomv8z3u6v',
                flowParty: 'nfau58t4on31pg2ri5y2436nsfzsb8eawa4t3tnbkr5k6bpzg1zxvjdhgr4iq7y6i4plhhl7oofuuvdie9dhr7sdrs9mq01ebpkncnolh9m527jg1e8dy98j82cjhfzf8mrl1ddepusfl6b4kagtsj9b4n5xyxw3',
                flowReceiverParty: 'c562ntu1fnzpz4gfw1m9zq3aeupgqutsixjqq0mvyqqzgpld9pr4wfis0ykmhp7tbohparrwi3cqpq7a13bnjjagons8ndixo6hy6xx0kufs64zqdhm1kidd1ddx2cxn38c963npyznlzh5dh2v6wxm0bdthf4o8',
                flowComponent: 'mncj5a1yki6w3ivtt2td470je1qkkq0im9vhbnq0pgheocxyhtfi31qllqvj6owiqmk9w7bx5ra0vrp9bvil619w3dgun5g6icgyrh6mx2187nx88kknlobwcz1a9jdxigd2ea2xxihtnpm31aluieo4q0bctqpe',
                flowReceiverComponent: 'i09bpnoz82s6bb2ztvssfn9d42u8cf53vo8pn4hdfpis3pxm6dwvoh0x2nd93w16mvcifmkxr4swcgipz93a20lux3xb492fqebvvj2m1y4xbwdf5m8ohxn9n097fy5wjhtvr9zwv236thyv1wijkbo6153r9cot',
                flowInterfaceName: '2ez3oeetvc6jw79lw0dyt4stxfbz6x8v70d7j1u76r8p73gai6mzfj9npenfjiohvsoyfcaizflm3gyrqelyr5q75blzmihvjfr13wbsakxv3ly9jjjr2lw56mzoynqieqpcouzv98i9r2gtupylwncwv1dcfr80',
                flowInterfaceNamespace: 'i4jqkrxbtls0fvr9udmc2007bn3eujczgghpw08mppbbmp6g0xphh35lys1t0aiyq4tp621vxgol6eps41xo0rm7at7xm2v35wff86krandj0uu6j2ofxaswexzgr6zxyvvga4cj9ff1yc9o0x6jy9kycrzfr6n2',
                version: 'i612oqzd3mbwk9id92ik',
                parameterGroup: '43yw5u52islgpizh2mcd36whpbuvhq237tigogfrbywb772zjg1e2plhabubxii5jg0h3vxu9s9c1s0dtsekvq2q0q7cfc31o0u9i8a2vmki5m4mtkeu90mohyphef8l0juqj0036o86g5tqisp82757hg5d6wrr5o172os6vg1cj48viaf3mo9ci0hoedsxoacsrfs1jwvq6segg3l3uil8ikjn8666azrdpl18qeulmn6a2o90q9lqlvlqkgz',
                name: 'cjuzscwczw3a8qrhyt4p1ojoof02ta1ho5w3qr58eyskqmv75pq41dpli9igsqauu9mf82oh4u5udhlbh6azjngp6r9y4jgkdhvcl2eqh5hfb7qf31ceope5bmpeuc9ljg763431cwjbdmfp9jtn1tsplrozbmwy78shhfilekdgs0iim7fjlzarc61txv89e1h93a1ouxv44hrpjaaem3gfp7gskqvv3nmez4ektbivu5sg0zb82zly0l5yum1927izpemc80wfos4lpowxhrc7opla06ru1gie1e0nzwpbmwrc8hcd6aln6d7raeuk',
                parameterName: '3igpm1nklre3wh6vv2xbu31kwvtqfdcsmph3yz2vyw3ewikpcgd265xtgcj2vbbre7tye3kxfmfqq3ur1u0wawhzagn7zd1n7am01cv6smik3kc7bh7wc48f4bfgbnrnq5hu1vrtla0ptam7dip6qtf24zvyqot1wfdgznpsqmwwtg3rl0wt06okf817xzczvohhfohszq1m0uxzfyd30bpkdypze93bew5osb9xgos60quy4e3ri0nm72wub16ihlxmby7iuvdnii8h1ddegmj0up5wqn5i9lyueautzc52c5nchz3py9aa4h4jjjsd',
                parameterValue: 'e9a05kchlcke93wyjdvf1rkr8gai7dfu6icltz7ojwmf9dedenvuzggt365zqmdxvi9qhcwz1oldswcor9gb5o6scz80vsjmteaageeibty5fgl32pa0hrzt4hncqg0p7b7vxras5rc91rtc8zcvrgdz1zr5swxiuosrvckjdz3n2anff1vezhw42kbgm8rxaq08w08qrk9vxxk2uhf8ttiykl4uktunf8h27vk5tsniacbm6kft2mnw7laaswyct9h4ns81z7ix7pzxywh5c3igmhanvqzk2ttd7f72hvmiys85livdc7kymp5p51zb76x795pp3u0orxt2416d7qb5c6cacg2gepf0dj038dqgza0ntnhde8ps71f62290zwkm9x0aos9wb5sl9vjkukk0y2i95ty5mbe9nn91typqb8rvgk37zm6eoh87k5b2otclg4wzcim9msh511dp0nrsrokcdd6312xnk8547w482nzkj1rb11r8qcegxw4jajnrrg5hs5aalfgihst5g0paapo2urpvict3prophtveedx9g0cf4u1bsumtfj9dqp9lilhkoflisrldc8197c0lkqvyu54vtqf2thsr6wz477l3k3pozk4x7ujguunpl5t4p862wy2kd6dgmv89sstc6xn110hbmrnp9n9frtgr2cez59392fzx6wtobszvvhqi1g2lpp0b1e3o7nw5z49s673l45k3vf0uxex9tfkof8z21kclb5nmv0za9a45o4ijdoght67vizd1tufuvcd0x0uw6849gnkdzjgngqe1h3fl2f3ogu7wxasn1boh8dj9dxfr7gks9k8p1kl15deeat6p5c5xrsz10rnogkm1fqb59kx4a8gxkl6i55ty72lwpgebasslxn3spzuypob4sciml2my1jqx6ac8ecckcreh42vrn078z98yyucmmfwgwiz41kh1fdec12mqrm5s3hgsq906dghw5yfthtkkw0w0d1ofdv1cd4fmp0uv2sttxl2vg7reomk1gzkx14kwy4bkm1vnd1y4oas0mljoc9iwistpi06x98861kp1a4cybvgxlks3g7o1slkzfl6ap0m1rk2e9kd77zmiy0j9nem2hbkr8khbtqhbg0isyb8joqvoj3eyo7bodvj8xse3u9jcwavxyspti2efo4vzza1oqe6mkuy4lap130dghw1ply0miun3740ebavk072cc2ab1fw03l77q7jap8yyvdp83gw5v0fd90n0ts125t7y45zkke8jmef1ds2nhj4df2zzy8y4q47kol39sxjae8abyz7buz8dx6iirg9wbu91a4yfyj5aodtycb81jnfior0zqh9zljb7lj32tshvh11eoqq5wxfr89u01y70alahc6ojbh77axdglqvmx6xjsvfkkkrnbifxwirug7kp899y9tnoix1lxbx174umm0oowpbj4ctbsucb3q6odjkezmh20o2ow8zo710mhhrvgu3e2wnh82s8lz9k19i9x2kvqckc9bz0izjgfdjjzgh6ejajqee0qjn2r49xluge2tdruuymmjb51l9zbw2x2ofhl1an56utvg645zj1psvfhkg7lckovumlmxky5fzaol8emc53fmi98dl25rvmc1r649dqymb6f7sdf177z1q9wdj180f3chfrcsvye50e7sl3l3iabc30wjm2bn81mq9puj59da8zpto0paymp10x5qv8yn1ng2im7e6oz4kkvbpd4o3kae5low479buiwca0louldjetmnctxjens7gbveq9rqf4nmprtlpay9bae8alyo2yjgi2shtcqjuko1a7ng62hrogmlzz881vgvm6sncryyucvi6ogww6ghlv4ug5xqs3vnqbm1vi01jmwfsofc6u9fefrzu2r677j0lhkvupfdn8pxnwfhpu2cik0qinu9kadjqcgqyguf0rryspht6oys1crymeidw5vkee26t4vnesnyc4vii8gkhmkgkkxz0o6fniejk38t7e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: null,
                tenantCode: 'dffifpqmdnjlquc6c10bjljsg0ujp02rox2767274lwb8uxfpq',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'dz6b5cd21bk15vboxlhh',
                channelHash: 'o4qsqkdppsyw1nr92jqiua5bytf70hqyj2b673mr',
                channelParty: 'xkvtlpb91vk8a3z347mjfdbqmw93rhjmnpfp9mh6rxbqrl9rs7e2kxvakzyntjtj2amudezfe79ce5cu7hj6ev7icxmd8yb7bagqeiz51k7kxiovgedumw2nvfzizocbenkm8woeufzzjkpr7x999f3k3350bmyu',
                channelComponent: 'sg7aztqyldrre9gtjirca9oj3jrbhsmarxxlvdpbsntc5j3bpcunos2ut16yzu3lsav445hh9l833xt5bmq1acosgqorav43gffqnxpkaw511t6yd1h89u7f92g2i8j1y0y3pzvjtpfzdb6yrtf33fxqbn2agdm3',
                channelName: 'kvygcl6idtdpakya9jxb29avwm7m7bislx2xnr8gb7gb5xl6ffvf0wy003v5j66baexl35qe5vwwvdzp8wrguc67k0xz2m7ggn0vi8jwcsflfzv37ga6kbwk2os95khf4wp13ak53lfxovppxaqhl6edty5mvenh',
                flowHash: 'zuay0uauz6kl4v2bvgx6xtynzqqz2u75vrfzgtdp',
                flowParty: 'y48j8dcxtu8arwt0u5rigop7ucta10h2kz8o6j2g5b4to0kdffryxxvf9gl4ddxzfr33m1wzvalbl885rwfshza69in6nif2s5z4gytqdq24lp14w3bdkigqyoi3m1lz1df2hxv3l5fynpsmljtr8gzp996wghzl',
                flowReceiverParty: 'erlejxp1q4eg7xjmo7nj06vedmtntj83lvgyjqqi26la8oi9czzu8x5wxxloednzh7ge3dzqarsscvcjess3jblwll8o2ku5ifbv6mizg9oaui6df3f23dqtg6fjh34svquz7coz47f0nenl0sivxse8op17rhll',
                flowComponent: 'qpux4kprmw9d2x511a5dta0hck23rxita7k8jatifqznet6ac61eb1vm1i1u5cp7x4fv55t7by4syrxir9d1nuw1fcj122h3nfe9o171d4b7pnv6b9hpv4u8xa9w8dyk4mncdu74ecoyct3sz25ufscjbzii6bij',
                flowReceiverComponent: 'f1vihu5o6fm3w6kygy2rie5vdrmd41s58ppsszefr1vs19d9wrk9110tluxqkuhw44c1h849r0jr7kocd7bilphdz7fywpxivleniajlvdmki1lkem34l0qtqybwh52ng4n77ke1x12khsm0s19lqslkxr3weyc9',
                flowInterfaceName: 'z9z45iupqt18xtth9wy3o5oei9si31vbsj6gthmm5nj6zkdjqeuwrua7bccps559oervn9ucd2r3ifyzppugl3g2lepz9b3f8jzv16ahhosj4fe5st8pijyn836n0cqbuktjsrtachafpajrfq0wste72mbxwhz7',
                flowInterfaceNamespace: 'aeaei7e55qzr49ak7whlj85sjxzksffs4z5da1dzvbp0dg3r0b236vtr4kgptlg9wpi3te28wpfvg32v7v1cz4d2ahsq7p3l22szc1ksn2i9jbh2udjpt68blpxuhyfyqbcrewd2dcfopcmvyn7navccdnxlwlnu',
                version: 'sqz0ghbonsclob9n9twp',
                parameterGroup: 'hq6dww3gdoe8yhe7sto6mwyt06408p37wgwphai14oyodamt9nvuyw7uqxfl9c1h68l8z8sdqpvf16fnyxtaksr0nlh4fux90qr25z77siohtmoe5vr4bqk4jfzyjuiai72n5p1p7j4ds2oqzo05ge5q4c5zvq4nerqnsgd637k7gbreevolnqv69j4ly1yeood4ozw3ibumxlh3oslthg6dn1hmyj4h4gtekw8vtrhbvickbvypkjin8z584mm',
                name: 'gmhvu9az93eekec4a0sl51ylywvuknsd90bbo2knvfeqhhsow8jg2lkwr9wj745x0pjvm6dsaf5jrtkhs19324cw9w2oawta0s19a7g9qkee6eb3oluaz83o2mtnnhjuv1yzfr31hc1rxg3ulqy1lncncninldur34aq0h43jz5x5pjahypsjtu8fix5deb69gaz8ae3flh1vtpx4cgn0m3zxm64i111ka0fi0q0grtjglrv06d8dsj3poa0kv46eisi408f2prvvzjmixrgajuvon65gum74ek8dcy84kmfazy3xm3zt068c01zjpka',
                parameterName: '85e9o8fxvj18i77qpaw1h4nnmn9n6uonuze9nalnd2p7w5c39xly1ya8qijkafrnae2nvtljhaun483ys9yh7zkos2dqljrtu7twwqc4ls9xyqb7hr24g2qss11p87dxmak6g8p5lejnl7zqqb63g5napwjgqofk6b2e75ffl66hvi36s2ak1ebowlf5md1igtfbrmys731t1we8kinn3v3wwkkqwf8rj7ubbtlkjpcaj5ujkre2k6ppaqhxsozfku8kayujcao4t1iu067xc1k2ghsd0cirgtsjdtqzupx3qofxwout2v81gdahu0da',
                parameterValue: 'ednx9jzp0g55f3w9zl2jt39u4x692vgcxizvam4jf46dh7gts680vqz7b8br6ojlkloud3x01ps49wez2fbbzjihu3h6ll7golpoemvazq5379a8j33cc0nw1f0t71wuf7qrzyhn584gmo5wuf8ye0usvpu10sgpkmcel6kl3mur44k4d2rr2t7aycggbbcihvb4ovge6iksfglqr0phjt87btundxfubncvknjqszf872fc4wrhbx1xl92gp2w4td8flyixom937cxsjvwfovtr6kjhsu38t72p1b77fw5mpl8pjbrgs6zct0raeywwzdwrub5e7v5t9cw5eh0bdj9bqnmn85tp7uat0njh4am1ekmgdzn7lw2hy7bmfplt7a7u8r1tnnw5dlj7rpasywumvnui0czk5mj84aqeyussz34pwcxq00akwdeeel4ar7bb3zg7zzptzksn9ruh0o9mk5u2mag3azxjk1pologfvcz6cf5nqh0468of71y1ydqiutt5xpy4u0rqn5wnsym00qaijljm1rcd6jr4yid7g1klg5f4xrxglkxnlbs31wjohikadz4oabvjnhrqriwduca7gx5d5man2hmeva3n2wsx0ho38bpxvpowwv5kqfutkni203wf1wbpxk1hzy6fmz26mu5u4lxuoax2meqx9zk225n4cr33ib6fk6mhq8g9u36l6wrtxwwqjm6c2xqa1w7zl21xlb22zprbrt39rkvry4t0fxftt57m2voyhthks2ooo3an4mtqf8mwl1zq7up69lr95sclhbk293gccirnxprx6tj31gnqhynttkbflg7qj1mt8t8e5pal6k1gs5pres9es32zdtnketcvr3pmz0r0crirbipbbho8j1u2jxq3vnkni52seb1vnlu7qna8hxzsibsfb9lyt17jxw3jbm7v5mmw00sjjf80w21nk955tarnnjq1jf2scfi343bkfhj7tim2oke9eqveqbch0zuw1kg6z1eupshdjvw4egh5xtt89pm6r0auu6vs9w38zsdlg31444y626atv0ohdscirp8fqab0iudpq25f06lbmrzcrdt4xxwjcin2uouhtkccjf01fwevpa5flwcdkc9tfjkly1e461wqpgkp5usy0l8mkpd25cpnxnddtapnthsgmvs4c9qg9mmly7efdjuqicycbpwg0gfdgz0gwrif1hc8vgv27fmxwods2su6b5qnkgu5s7eau6om4k6hifymtihq9s9sejmtvmggwatdg6d2y34dsguhl08zjds8vax8k4xlj4581c81aqzk7l0zfbwplptf07llcl3h6wkcm7zqy9e3j3z5eqk0jw33wv3jafumfa9o4qxwgxxpalvdk81y3nfg9yw002imztmazka9zoqrtmbqsxnrpmt4s1yck4vfv9sjejjvtn6gd2m76yqc8jh4i3956qbbym71q3doed1ehvyq2theojh78z1r22ajy88kkre186bxqberwrnl72tmve99i5tqdrned1hdqoaqc2mowg6tvhbagsd4ep8oagtr643em2ukf71mn6ujgq60blb8j8e7s23luna1fn4fepfsymhy64guqeb3wopjnxow2z37wag9l8myvajv9c849wgd8wce4pvge3rphd59mbyks1ylqen6gzcgf4g1wzy1untgisdh8xjinqrfyhtfoyr2l1an2xesxobizrclee1mo2huzamcr8ued3jvr8jyxf51fg74c3orva0rpz0gaca8go0em31x6mnxvq5q1yjmbooc4zyb89jwo94o2mxegkh7l4siq16wg4ckubqorbyqv85o312k8lfoutp4i8rxoe7yxnv36rpgdtw8tz96m8fec6vbtle5cnxnyxagvqf8lcus5et30kuugeebuqrdpxvc4gu7ewifq9dwcyeo9dh6cxvvkj4hts3e3836xecqrs9702ip1vsjqrdx5uvlsitwti1v1lz1o8381j6jpgbs8nxmoyosjptex2ssw1a0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                
                tenantCode: 'h93pps78vzkc86w7szj477xm46ub2uzj0we8t9tjygtrnemx2j',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'rkdtdcc2l4wggct5rgr0',
                channelHash: 'dxoo0nzk6v6bv5vgvhv6yyz617ifroe6kf664ft1',
                channelParty: '6sbl8rw7pl1ctfldslg0d2a9cermrt5bsxoj9qvj0lebtit45andyklj9g7lvfzjlbx0ryhch4xhuk49cv94237cqytwkqee5jeoahlhqpvqg8c9uvmdjnaqem190v25wrferau9bx1jym38yio80ptz9466onpn',
                channelComponent: 'yf5bag69qcu1nj0rjq8gwmtydmfnf97akm7sndqabx3iocna9ak38g4cr8hcme215j3hn3srrl1uw0qcmlcritazt2rn9yclhf8fzpxv66dmxt9x0o1iv9v0me8dxrursdunauwgoprpoz1jj9cgzi4zzxd4eakz',
                channelName: 'vopzeg7k9457d0lnhe31uxpqm3a9e7wly2vyh2s33v0nzn06o39u7l7t6x6am8r9vphpnccy353i3knoo9i4gkfyubb6xranhy3xt8tkdl8sqmhlkcfmqv1eejtgz7zr0y5ubmct6ooet6mpdcj35zwr5oty57n5',
                flowHash: '8k06v8jwwkgca6t0y5oqow5m33rgj7ifj9jqv60j',
                flowParty: 'r0tudtyj772xorya9pk4shub0adl4l5wz5s0bli9k8d6gthh2mdderjw8d1p21cwyjnjuxlw9chr31mlf9ae52kfmvcz7vl7fa9m75w5ol67shavtp4xw0j4fv5ataw227atr3sifsh0ywl6d2nek1z8l7e0w24o',
                flowReceiverParty: 'poco9ln1p7de5wc2pntpubdwzvut5uw61qvvxjrf4gzdmitsb6j61oqmhqn2agpuazbhom9ecegefvr38glt8v8dhx9sewtah9tbmbt57uqr9p7cxq40o033j7k6as05fcrqsw0yk9xl7ky8wezjonya7ddv9w14',
                flowComponent: 'xkggnbxjtskgj0kmyj4odcylasol9ermf1ky83uunrih0tnpzgdsooelpv8v6gauzlrmlo2rullptgnre2mf5izp8z25x8slxk1h84365l1mljf25l4ojs4aqj4h2knna4cl50aifd6bczrkloau1igvgqd77lh6',
                flowReceiverComponent: '2ztgpmg92oazzllayotkrrvawlfaiuzhn8zoz8dz69x3adgpurp60k1076c5bijtqmnpya1ylbqv7leg3ik1rdqngttlell5mg77kmk307tqy4o2c06bd8ncipoe1bq4a7aybxpezt0lz26kzmn4vabih8q7vgti',
                flowInterfaceName: 'jh412kw150wyeieoy18sirtyoe6mqku479gfhx4x2ldcl79381qp7nlpi4gbl014gny1bqtpmg9i7rdecbyhv08tij62m1qw6k8tzralnjli0unr877tlif7yq2ykxc822ivhom5oysaih3t2i4z5s2rm0slqilz',
                flowInterfaceNamespace: 'rdkhe7yqf25ow8p8wgb5ypaa37gm21dyg8tkk1yh1aebl6xtyh4bkkd9uhk85t34llojgmb6mcty0pnxrh97nsxmemnqtaw4nsu1wa17jmygn8zex1rzdmzr03fkccpkpl5dr35slgq494q9vn0nhlrd2gbjzmfy',
                version: 'vz7am01a0k5idvhxp8y4',
                parameterGroup: 'ketd3ahlvz1ww6lbok45hve4tyhksa38wnfxjf8pz9b1r1o516fnqsqov57ktzcvpjhu04c6l9rofp73rbtrdurouhipxsskmn3ebhtuhdg1itarrj5pogu9qfsj3nehrtgiefuluf5aisuf0z79bzlzojvwsgssdy5s3ag4k8o6dfga9ym4r474xx3sl07w8edoh79x0x5rb0tt5lsfupwpfg6amh7ulujmlujyjy868ug8n3jsh1qjpfgjf80',
                name: 'm8vuhcik8du5c1w571rn0iyq58xi5pq1570sqnlvv98rh0olz8n016vmlj4ofzuby5udiza2ogoa0lpbpvwrvuujssvtjlth5fksyjufd01bpg5it4q0vgz5m8b7vaee0of848rpfxt25c9lttdq65swufqm9myr1niu43fbgwooxj0fxzwa5a4k9bfhp8266iriv9do49if9ndcta7s75u923zw0p13l7a2gj03yyq5fspci0950gim44kcvdqqbxxe7ciitpvcl4t46rfiqo9359gg43j6n7k46370a6h3h63scxgg53ap1pxoi1h1',
                parameterName: 'xjr47uwy4kjdw1777919vhgj8bahv9wc0ddx16cx06emsz5s868i8ungnjk2b34hn7zjf9n234m2jdbxl8rlntqpf2nvkydccs03bt8zgdhm9bkr46xwaagqy41o2mkjrmu12tr612hrsq9bnrwzl6tqnszx84d284d53cqbyuvdzjst7cd6ycscclnoyyyakbgebepherx3khr728ivww2w83m8e39kszyghndpz9ru5jot44ylldg454kwo9pd96jo49bfuaispimxaggyrzg1u508jx42vzjchko0y0j3ri6k47dvb04dtuycuafx',
                parameterValue: 'bjx1fr7ba9cn9r9017hdskdocjz0j5wtfb6r1rsbw75k4hdl4y8i7syq86vdvnquas7z1g4b9mi1jlgbu3l5770funnxpva2ibkxmg96kcmzkc8bzgt4tgjw43tdbox1ppkq1wtyz1oo86dvzu0bjl6vg5a7zyzk1c677atu8y3bkg606dv0pg3m890p4rmrmdpzdd1p6i7v1szc70f7o1h6ces4fx1yh6umwsvo63rsuq3sf1127hgveci6a2vopg64wsg1jxfripu20g17ev48z7hms5xch81sy990lyzvumjop5p4yodsh1k991jvnvqlb03a1ssp7z2nr9hdqbtv2zjvuva1szb1f8i0f16ychfnitz0yuk7wjddafw7sf6la96xwjzl7n4zxc7eludp6e62xowvps2xsayfo771ewjozi5hdxuh3zp7wy8cvtefaczxvktey23b27vo82w3jjtemedz3kj3x7gl287pba6v2ytdxc7c5acgdtzy1te856jlonj7ou7a8ess2v22j0vnshp8loi61htme6364xtdy9tglygcasv33ajcvzcwaf0dbfug5dlng5qbiejvtkx8usu6se45h8inmlq6480mmvr1ztgibedib00ty98p6fe50wo0643p1zsspbez3g9bizykhhtk6ldukix9bgt6hush8pukm4vj5vywb2h1oyds1kz47rewyih12cn0468nt6jjg9ftuh8505zekzffnthachj9gku1e5fbtc115kznf93yecx2z628lloixi622glua2tldxwe78pw7wqm5xkck6a7y2s0eng2qqjm47mofatbtnvkzlmrn4c2r5mbnq66k9m6i1ypuqh5ry217h41blgmnm3b4l7ms82uj3d7mplhct9ik7d3mvnycygi1a2g8ecti50m68mucqf5brqbsymyrx85o8vxhilx2awcitub8n8be6hyeimk7t6uq1f1nstar6kaq5zb2le8y1pdzvf80b2h3oukrl0tj141ggauvaa54koy3nd63iza8t06350pvh0kc25aeabzqkq4mkbiygjpsr56wg20bu44rnit6pw5897rw5fhf9p060ltyfcgdcsjed86fmk6raifjz1iaay6pj7lzv6zova8aul8ebwqj5irafb8bgul5oyxvzb9rwhntp1q20ihjmncjkk3sg2tkhaz9kil0wgjtytnsfipq0eom9q02xplu399dvfvnulu0b6i3kd0h44dlcdz18cxzqv1hhmu12z0zds8o0kf2pa63dt48g8nlp5q5dsbthdkisp0ur0pjgj6p5c7vhunx0a7pdlyv9xt4mj3wiaza1lgwb3o2i8gtxaq6utx0x4ltdu0q0yph3vu7zsmw9jdvknriqk4wp491gzklytpm1yv01k1a7970jepipgmm3ru4d2guwvpvmyywgymorv4y38nyqf3vzjy2c7vhm0om9058j94ohuayi9vc7sz4wpk5u35i2rjlnp54hykchdy5jtw71fc0044nh2xm6lsjgowybn2u5w50wz4iib3gs57165kp8yi1yamdhnr783u7hukfekgd7mj5bwv7jimwyqcidie1lqjkrs171n1aocpc24jn174aovhneocdk05dwbvadhndbt1xhuo9ssmy899ctd05mn10n55k586psqxou2x9zd0fwgex2l4c950j8sfvh1n11ppwjvvq0uft12vdrh6gbis0ixxyhqd268qiaki397ee3dbk9ilqdy5paum5xz9cx4a55ahk3sdfvsmthge3mop6n30xnr1q17h9wunya3528fwvngi2wkrac1lwdfzq94arxoup9bfofv8c3ww7pccqs60f222qwcv6pqhr0ag8ks0p08mlt4kprj3u2nud7ej9iuhss9334879cmsbhfx9o7hd7ht3umzemg6gsbuxdyko63bgs9se5115x7yxoke70luues0nqex646i54pzutj6oyy31cq063wzluekhxdyu6s9943l04r4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: null,
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'efdh9m424b3kmlhete33',
                channelHash: '0ar2uxvrb7v0zkgbdo6wzy26w21uts7r49tmn3db',
                channelParty: 'c1mucyotq2pvn5u3w940qvl75f71kce41vginclvp5ajqb4lzsmo8tyzrlgy0k8h135v1oodqq4fdi0oo7izklegcrxlrfqceba7023pfmrbzopem87tgiwpv5f9whwngkwo66cle4f24cpbsyi1vofyuxahe92e',
                channelComponent: 'kp7lsd1fpzsm7xhmlbbzrg213b58azu5hpo3d7gpizxmvdyv9k8uuri3g3zjvhwshbbwuky9sswj8y73hvsg29cqftdgu32u2cd53t2dmqcjen8t6s003lna0qe3bylrokgl8oinu52p010bdqy3w7h66ipv1yq7',
                channelName: 'ojd9nqrj75kf3rz9zq4cyu216q9p4f8v7lqf2xqpnirv2bnzlm1t8xfdzuk3e9q8vptv9m7zapj0csmtxrz8f5izhpi7v9l1k3yzv7465hapv7jgcx6n1jgnj72yqf9mn5gsk34pexcambwejhbd765jd3mof3qx',
                flowHash: '3q5wncsb4j9hxlsedyxv52y3ekus4u3ehejplq12',
                flowParty: 'dhsd6myp3d1xt66owc8gxd7bkqjv56yy5eoobh7orc0zwun7qtkyd07xq2r3cs4irqpars8nrqqtwcgfmf6td4i69d56ei28lygcg6ri8d2g50chn1azari0v768nfxe0nm2ehcct7e70p9wbuss9mtmfw8amc4z',
                flowReceiverParty: 'f6qkytd6guwuxn9bdgi9ew8lf3267t9mpdn9z6d8xskinnwdow18ffizy706p1k7udg1frhxeffymiswotk95x38r3kwc9887bci4jk448mb2l1r3ygmv4idoxacgu3wib2a698qyismsv7enl894nkfevw4y2o2',
                flowComponent: 'zgzg2zt6chypt7xsmyqwc8q1wk1pm355coetvqjofp2wdzopl2wpragvtf3s2snf9vptv3i6a0ysm8jretd603gwm3a5q6ulu9t96uf0aezt2180vfi9wmw0mcnjzvaqcqfllkqk54kc3qx16bnkooi41btllrp5',
                flowReceiverComponent: '27x70ek32jxoc4xg7kvrufy07csky9xjexsc1jfhj1ylgmud7e35aub00paw97b7m1k3ur6aq7cta993e19qi7d41jvvce8dxhut3r75arogxofk6qgswtlajbc1o2zu59mf4k0eiove2mrr02ap8yy4tb12rg67',
                flowInterfaceName: 'z0dmpw494i903cct4lctersoqju6kvxnt7c08gx0ww1od3wmzi4gc5bcklcidonatd57wqhkudfb900ihndbwws03q9zg02hbchlgw053m47k6jkonfzz8pa87obv372nwvto0sxusm8orc3ivtiduhhjo4qhn6g',
                flowInterfaceNamespace: '4gvpjcx5ytce74g1wyws6ck7tghx5y4ikmoyo14l7xeqqrcchjw9d1d009eis9g67dll6squy8oo6fqvdgahj05141kb87owiftxez3t5e3aidks6qebnw1ul655t8t9civxzk3pfj2ajffr68qms7yxyq9at8kq',
                version: '3fbj97jzzhkamj5tu1me',
                parameterGroup: '93t7w1iu000gn7onxd7rx44548wt7pu51npq7qagyudplwy0z50y2dfyxqij52x3ay2402yzzjzkaqdvvprjuafpf6o8ecjy6t4ve0cqvp97j9gu3ey626gqxdnpk3uya7khp7g4skes9h12g767euv3dwvqm48ff7gpxjgnc41r85le3xb2j34n9ddsfyngg3ozii6k7qcnne3rb7r4gxozljc8htflvtl1lwdrkofa2mtgs5axjgsc9o8a191',
                name: 'bkkvgkj2h8n8bijvgu90a7aihr0hueoea884pckw9w9pydj5qz9o53kkknbmldw81yft90dbxn6njhchnupyx2spu3w0a60ubj3i79r1zbo29wbbzpsli2x8yy26b8bnu39355t44k7cqfiejytt4iqtu14m8gkmf04qz6t98o1on0v2tvzlkuyaxxbaabhu8tib1pqml32sdnsfvrqwfsfs6j5fderak51gniiwhpg0vfdi0i90a0lgikwf09rc4otn3mqldoi70cvjv578rlpzzhfnnozn0mkbveyau527i7po1ly1au1n79ogzhlx',
                parameterName: '96jzyh4nppz9vetu5d6jvn245jphfde7u0lkmfcz266mm600w6naj8ltexn1uolnmfmmzh2lm8hf36hswma8eak0wpvgjqlgyafou020ogun3l1r1du8twj1fxcb4cz682qqbuyf5iiggmek56juxsuyfod5qmoc7gnoz7iq9t9vdw31xng6na4j4snl1pb3v4vknjv51xctj1ucndt02oq6r24u4qmv6dbpxg9yd3v5ja2rv8kt1irdw0gcpb51lqjjf67d6tf4qdy106167ypten65yy1d6wcqqdurpcftenqjhaxvs4imm8ljwu9h',
                parameterValue: '29qai5dy7sehb7nqu3jv9h05rp5667hpgdw13x4hgi5nu5hbveaexv038akz46xps6wecfv1ema9rvf3k5f0eql0303j9hjfljhzbou9p91jwf73no8aauim4flfe8ucq86wot39595wdbaz21skax77ct6s3013o8iu88tcv6s991df0ez7pcrw7kyt2av7dxery2x7h27kce028o1lzt74jh6so0ojcddgit953882sgsyv6p2hrcsfu9ruut09ebl91op7l01xzb3bw5rkphjmkvk0isimyotoq7mppafaprlh6zbn7c6m8rpsv96nb9op0jpq4by67286nvc6oswlrzqthqjfqqjk6mffswnq161qwdtvmm6coystqw87slziv05acwiux10k32mgs7ii5en3eez98k81vuk5yl09s0o8idvis4swlmqr3jowf6dro0nmfnt998zj9gn4zayd1cdlik2nunsxcobf3lloo585dt22h2ofe1xoc2i55z8td4ddxwxte5s7843l1reej1qd4af43rhnaxsjbhmgeuqnzak60nuzpjuwmj3h4fidyk06ia4nblk11fly2ubjhwzomfblrb8gwb22lki9vl93cmx114qig3rq4wl9h9l20sagpca6544gevvddd0f85i61ijr4rpl71kzjsj3w20g6p4gr6iwxc5x4idc5v32400hiwwjmlz1iz0w6feaoz8walqi7zbmecacjb3lnb7tph0fvr9dhnziaqbsj0va2vq1kx3qwawysj6a08l5hhm9gz0qnhf38vrhsuelps6bo8lum69f3u0a0j43329htw78zk3xybfjqssu0kita6i6own2mw645haqrc5k548xjddtp1iswhpfdy8ts39fd4gefcfmshsyed1y705iw5lze87om7wx3dexkz7wkn7e164dgoydh34p9nhukkd2p5f0j0lepehyczmuiq2umhqdvw5djufikwfffzlxbk3m11i417w4pyqj0cam8kn8bbqzfjfi4hyt3cd4ydwnb9q1ooo0unq96fahxhvgmpyra7zhwcczxapp648nl500c62l7ym7q7fsutpzgom5gg9xpg0zcjlddwdbs3ycy9uu5p1h8ku7zgsxf2jhnk20mkjeh3pnictw8bzom91vanmawtt77bcx4o2tipielgcw0h0reh06fqe50s5llodlyzusdx49ifqcyrapjdc7xxq8p51ueod9mw0sajir3796gjs475wxt9dyvb435zu1iuuabfd0vrufffdwjr2edamhiiqnxco3e3b2qadwkr250ns3f15j22t5attw9mmpqmlm1me2o6mbua3c17jz9kihikb4jj5j3hwuiy210cryt316thmfx91gnq7ds7vajuerg9t4fg8yo1us6uyd9qcugfulvwt1b8ibdb4ex150wgygz1lhq76bc88lvjbjbvg16idbbeppabfl8xg0jewpuhcye0140l8uwlq83zczlv8k4288xcmndm9slmyxbefzsah236aa7j9xfjbyuaeqt2skywjencqsuh6vna4vy9jm14b7m7m3vlaxri35smog1lnohydzmqze851pl58qqnx81nubfoq9slslpn0mgsrtd9d8zask08eeyoxn17r03jpv5kxss4je4nf90ho8jz5zo7zojti0bn8wdoxzh13ur93u0wwhrp2zjlyrrszb518gtw80qsexwmlncg40fi3zkpdq25jjqpu6vvj03skfdbmpza9nptmx82a9xksgso9zvmyqw0iks871kpop8qrc4aufup1rx1a8s8ee1jn2y30u0yim6lqd4uqcbwdw7p99o9np82fsqym9yne20k82q8tjc7hhn6yrtixi32r3qm85l9zsv1sgyjdlmq9vved4b78k1hsml8lxur80ccv2efy9scz8dnnkzj2g384nj2vsffggr9x2zz25js9gc0uhap5k4op4f4lq1n63989lfioc9h5v9if25ske2ukjaswhk71cgq0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '7fh2qvtzu1fotxiakrqk',
                channelHash: 'gwck2c4ii6fbkr2i6q08v6z5pusmvevveg6t3y5p',
                channelParty: 'ydbmsu0h1jn10wubtqvtkp66rgk91r6czd4l0mqtt39ykfxvitfhdv5zxzszffadpxfamfl3vsgqbhzfsm1e17nznxz62xwu252j7e414seecxws62pnm143s0j4dmikfw7zpvcxsrgluqz58cx7e5luq8dr2pn5',
                channelComponent: 'banz6au2fpee27jpggllljkvoy9wc4n47oe0mq9xx6fg7g688sdaln83kzcsgp279ri5ql727yoimkftatrb3wfqxwehfvazmhrv4cb0ggc467os4i6teybaslbd1d4m548w39vjcucqum97u7lkap7md3muzotr',
                channelName: '6sxuwvtl05d1opdik8wgx4vbs4dl6d6pnmbs2av5zzuthszvoafn135oa74wr9671e1zz2sywacto9kzfj7yjsir3dxtl5s3u3b809221p9g0xbn7ndta0nlgmq0qsqh0g0ljurclx7j5vxgnp49cv5cghzkxeew',
                flowHash: 'p5rnjzxxfvzcadymcsj4zrdal67gbvdi952dfemd',
                flowParty: '02boiuur2i14t8rgqt0ebbpqbvwgxx061pd8q2hvw4hcjjsx3aflhf4qlxis0snrfp4hbjrnmmpnmglr438hp7i4uq3adtz7al08r11uw9yj5wax4swgauz8i33piwzsfg1oi9ypzfo97ahoe95ke9d5ksidiu6q',
                flowReceiverParty: 'li22ihxi4p1bvy3b8n1q9neroykftz7snddkkcilm3eyiqjz8j55fihn6r0j0mfrd5886w48q8gl2cpsjtyqpb6dj6a9891pgg2634y9l11xk6q5c7ih5n9b5gjeia6nf3ifpindshz4dks67q1tgjzi5twbgtyz',
                flowComponent: '4vsagg8bvusil016gq4zfwhpegebtw2i1fkinxpkkw1bcc3eplw61e4olf7hk5hh3s5qv4nx1pdauum6kw9q3aw06fzd6su2wppkebtr3e1xya8zodqrmflokwmstfhvxr9r1dg36x3ko65g2bmk7yir4xseotoo',
                flowReceiverComponent: '33q7ya7zhlcx4rl2he4j8ggo1ee5dqf0seh8falix8f06s4dscpqeq3rw2typ7075vwyfpmyx6vc1dhxbwkoxlhj10cc8naxxug57g78o24y5yluefz2d40bhhmz6oskh6ezp1kzfozn5t6k6pm7f1adjh2hl604',
                flowInterfaceName: 's83eojlmwiog4om2bjx5xra9vnt9ok8c9lxehy4zrk2ze0nc4k747pq95clro4mutmbba690bhz3lowy9i7h64wo6xkgpruit6qmc83ehqubk4uu6j7g3n9en9bmn0ts906rmnxf27o3caha12qvzgauuznptilr',
                flowInterfaceNamespace: '8vi2r192umeizemfnqf73hl602wzkonoz9o9sr9p6x0paow764thbda7qqmt9q10wcujcomi5bge24x9z4on7ggubnpkdj1i1mz4esuzspbx0u1pk2gngngv8ki3vmkl5zxzgwqznrvo3lwv5auph0hldjebdtnn',
                version: 'di45qc955nt40i77wyn1',
                parameterGroup: '8glrk3a0alugz8fbxncw3i8c6aqqueeo4m8uwbklqsykg0yt1mt3owug015unok3w58h38tf79e7gt4nqthmozsf49dvco1vxh60q4dgx36chv73a33t0xwa31efhbu1oa83na5vcdrnwjxot0irc874xaayu1rpz0c0rru7fvkvpu4o5kvlcobn9nq7t6ynj7pucurym0mxpg3qg903s0eq9jfombc1gmj04pm44bpi7w7vu22uwq1rirdfz2q',
                name: 'nxax1a978bqvwzkpgibkp8iprgnxtcyfiaysfe6debqxcgqjvowx0j82vnz328izjqikzdmo2885gxit2btbbv9wqnpt97dcz0eoc2vw1bpvgs387rl0fhnkes6kamwr9qwt1cwdzml8u1r209j3wlm6gi4jiocrr9uxr23bosvlh668nvebabivo5gjiu5ka1igi1fdawjyhvo6a72m8oiyf9mvz9xc5s2ku1z55ol933uqtf5jn0ouwmoczth05yp2ns1wtcx0md395g1mwehavq5gocfvufm16ds2llu9hly5to5paebi831t6amc',
                parameterName: 'bkmw50rgvxa5u5wdc591nyc1lta469v4yqvg015k4o2f0ki6gr0e1x3rgdgxr78u66whb1ycb167tj0pwlorylp64jem67tefxq4diz9zsrjhzjrcztdilk253okjq1244olnygq7sbg77o31imaj8g2bfwi4y8bkjc0l5bd2ziho6kr7o5vnfxa2z0xq5fuvlnt16mdr2l1pceht5jeziy3kheae5ntx9us7sb9xo0g0u4wbyoleier7g9id4zfv81cabqjaif8u83lygsmbneawptj5ivijvg40t4hs9g6826h3b341itn5dqeea68',
                parameterValue: 'ateovgbcekoqyi5k896ff3e7eko1umdy3hn6w42c61jj204ukkcwr52gfew3s8n9cy22xq6a9msgzxfhqkwje2kbyt1xpxwc1qop1koi4nf125w7wxa2qb5eqdzzw9tszejzjd1s7xywhnhps1e07x8txdr5trq6tw2fg6v6j4wuo1xe5w5nzo5ny0yvgz79nll5yllke1vjd6biuibb13tamxvulc819z4os1ym33c6ukojw96kwm47pgd54klm5661q1ng0u43p8wmkukw851qwmvk7pa9hbpc5hskuxy25hcmek6a4qfwqina50nc2ii2nprl217d8x7uv1k1epiqdngzlbtczptac93pmq6b4xj6ou6oue1end624p2f9cqwdwgzs3c2ppr0oayr0x2ptoaizqw0vv40obnyroiy5k69bw4w7mklxo7hubsdt18vxv9xzih33vwg30p7oemztwrewzdz6gbpj3sx7j3qyttz5td3i7wwxnw6j75nhf5pqhv4p60htbvgemq46wwe3lc56gqx61uxd1c5bmgg7nrcui0e45wsmlkmcpj0hs9d8qujm7sax8he75wrgoax012po6rtldaahrgnieer2a8umyeyq9avb5diw97uwt0dle3yr6srlcu7tyetl9wexbtcfetk0jedslf46mprfauo2wvpjhl1hkj81jfglo93mfsm6ypu6slxhl72vphxmedm3mfgkz9ayse4e9e1c1fok2yzgf96ymt85m95dg5xdzrzdmh52ul1v9n9rrlx5zd97qiv65mlfyyp5eyun7n00mdr0uwqclvdyu4orzfztykv80542ayjfjoji0cz4ud3mxr144fgs0tt2nygb5vjoei5ww5kq1zmqp46just79byx22s47odtp8xs1cdoho3rsnmjgqul5smqqy559cjebtshv8mr54ocrxbyeb0ci1idzxm9u3frtcejzn5tzt5uj8pmtlb3laho62cc1eparohkigx4gsh2w0up5ifb2ian2f7qwz6zokjrw4gujh7xjqqhea1nzh1eit8t62v0t3qi78t01tl6pc0nm1vkcdob1wrk441hlwhrhb346wgrpbks2nj1bknuf2q9znaqibkdk786gojvsys7y3lmwuc33otdfpsg3mgelewdy9jeb5rn1ydk5aa2t9xmybq7zdhyf9n6ug9qioda0o3hp5ygdxbfec9ie2nedbpbndk4n295kut3zfajhgxt05rj5p5r3veso2wweo9yixxha7lzcgcako1k0rhv15t9ijf8ocm0vvhbvvco1nyxf1se4pf8cuuv6a4811jj71k7k6q8cpca9bzuvn37qk3ptrsyhhxh12vnl6a6tqojtbfcma9jscd43tehky0x9uhsx65svvsj9vpi5mpfo6u7j9a81muxzho6wqnmd5u2cwrty37ynj0skstus3tdv1hxonm2410g2lke0ifjolaoa1yh924zmeqbe7jm3qz9bplhvlp2h2zppq51a6mpgv78nxl8mudbh5a2t4zop5rn4wq78jo8od2s893vub68crmzvv43umqfnuuf0a0kypr8bt8cmre4crmya15hbqwaid29i5b83e1wrkjd8kvv4kpqwoirrx9wjwsyt8atjv8ha5j2lfuwqzz61gyte4a13lgi3x27tz3c0k6ybuuse8xc6aw387s922xds6i3ui4p7buf2stw065zj8kcjlo9qszoi1k5pof5nifwj2v96l0cyt0auqkm7udixdyr6owjo8lvw7f8qvkrpsduq566cra98917ye5vk0pw3wmapnr5ippjmi485n9ob4x5ycxds9h1aat1789fu8n5q8uptx3lodwdtuqvmmrwna1hio4ns2phkkjsmfiji5p30j284e7z8ze4ttwvereqokw5fqcsg6izgarqztl7lpzlwc7r5k9e1p43g10tp5q70ornprl50advg3hoa7y5j00k4dxwap72tmjlix14y2wrw3vqaq9ibcahpviexx5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'hr5e1lvqwrscccxhaxkzqnyz2ok9ptuyviqcl2g23l59i30e62',
                systemId: null,
                systemName: 'pd4sq4jg1vf0xqh14xmo',
                channelHash: 'hlt0sxo76a7067snkvw3ee5ptyih7uuvc1dvc408',
                channelParty: 'punap75fv2tmnp6dlhcc4b5mdpu321fxee7p7mv245oacve2frx3sgsz8my229ciywi3wkc70o1z6iuoy995y4nqplbxgiu1tlxgae2ncf1ba8sk8tzip41n7tm14x51rv4iur35jtd8cehfe8s750i5st6k8l5g',
                channelComponent: 'gv4ip5p45jgp529iisdisuy0jpiu1f0va9z24pzmi2g339qup4i9ooh7sjfzwesqfw0zm5mssfggcxv9r9ck6txplg0xlhtdby4d1tllzeg8qfdybij8i880jhqg6w2y2kld1hmqwxywcvdznebot5vwf63u7e8g',
                channelName: 'ebd2ihrtx8vyzr2dj11w30ky5jgrytkvaxmh6iv1r5z9zfo8i9u1xzpfha7saavvajmjbwjn8ezseszvps0jijigjyxgqu6ds7ledkmy5b8yar6l1l1cv3159mgs75jyq1w9kl2egm3uj2x6ne41tgnkygoay3dj',
                flowHash: 'srebjtvgarptgwge2d3rg3poq1d0deitf3eahtsa',
                flowParty: '6o5ritsvb9k4ilg7byg0f19wj9vyx1r3mjupasi99zr56e8szgxpujdocma0r32ztqftoarqjm5cju64iul155zjk883kt4m4bnzv5bawy390oxmsxanj9w42jswq1v2e64twbtt6k1dk5sumkkpas0g5ppvhau3',
                flowReceiverParty: '6zfz9sbr6f42wlby8yulhdyrjpf410918lmkmvr97644v2la11pnx70oj4889qmt8z66xmdeo2c44cq7l4jh3o41o7hpnq0873uo11qxpa2o1mdgkhklz2gd5zyz1ftarmepmvwskqg1uagsj59q0wkll3i67lds',
                flowComponent: '4f6f2e8211nw9spwemqwapi0yow5xv77n6ml8y8m3kyigq2dhl6g46mshh0zshzzn3spa6uuzljosbskcc8xj369290miscuu6z63ccga3r2yk50gxvjmj5yhm5yotzevdex59hohcb75ze4g24vl4g6ferq5q5h',
                flowReceiverComponent: '9p39d1qb1pv9rrpt1cnqik4nvfrann03jx9v8px4t6ktf6tmorto8bvn8p3hckpc8zsddp1cllnbte7xwm3xylcpdc41kka5jfo59q84pzm7fvhjaq8y9dzedyowi2d2f5dz3a0rptp0q7o530nmrklpy3b0tsjz',
                flowInterfaceName: 'xb2o8xl7r5txyo30rdnb8dupg8zxbpf86n2n5zhb6rssjz7pcsuchvyj2jzewwlvywv9r22c1pt64inhb13vpj23xsqfjbmiaur8z2tv97dt9w86g1e0hddabhbh0ag2pn0z4w8tennrl05ofg00ru0kn9prwei4',
                flowInterfaceNamespace: 'svz41jreu95lk4pvwelutoq48mfbcr07uvhnag6fp4hmba5hou45120dgwqk1lcby40a6ujpsqygbu8qwe0l2x0cth0nsy1fdbh7bsrzrirti2zuobjjy0bp4comzltm4xyzs5gru205gvl6ps75wc80776tamtk',
                version: 'troqskm60idkzshuve3y',
                parameterGroup: 'du4rbl3qz9ifuv92zuj3k54vkbg4rehp18wruehwq31o4nujmu803k44zzo76puf3f6dx03i81c6khvybt1yl0kfi9qp7yqbq12rj6zb3wnmd0dfw44pa8jaj92kgs9ivq6gpz4pec8v7dbpmvpo7z2515ueawr8c7z5yvsugqniehzqslsol6m77dzq8un8esu5kaldzb2s213tar8l42i24gmns83ihdx7ltkazwn07mehfi1sllznx73597z',
                name: 'dcvthrf9k0jn8s1sr994zf0ytzfiuxi2m5xucxl2di8xcy8hvmmhx0zqk3u8yx0a1itetqkxr6x3hoj80dj2rd543tt3vbw8g1n8ruq3g4xp9dx5xlusguaweh7mmbw0rpbf28hc2brln84h916ern0cqhb92dpjedig5h0y79it1kgfvprjnssw68g9uaxwodbmx1736lujc5z27eud4f2beke64afapr7vio6wq52dqq2phh9ra0kkhmoidyli5mm9kgfvlbpbq1hrxcl29vrp4dlcyic143wu9z8pfi9k46c4mjwlsh4gpn4ibqw1',
                parameterName: '8hb8j9jlpk1xyp7dc9uwll84ktwj5g6w7gagqcei6hedtubvcnrksy646vvd1a58biqx26szmwz6mtm85dwl6wslhkzg9upscw9vmqif3opsyfsmqvqdv6a6i5jyn5y6ap67qta8ibgh688loeyb48ycnp89dpfqmrsf750scvxzf03215gy7bgqjglav096sgtfse4l4wksyze1p5tfnf3c7dvni49vr77936omnudyvdlwwjb2ez3vhf7v2ncn2vwaph54nhkfnhonmund55doci4xjs3rrb14eg811rm438eol7h8nghc5e55rxtp',
                parameterValue: 'qfhk781tuz7ok9s6240cfun0d2dne8xnqqk6s4qfku03f21vgq7mrmfathkuysw7ok3htps3w8p5pptm3ahxnnq71inra0e18c3vpcsc09hq095crcac45jl8w4961htjvvsz2l3s5gfp99v1efk9x145l6ewr66pufq2jv416cta43e1rj733rt6aclwsf6q7r0p5mok68c6redwlbrzunclsgpyxhdgqv3nxkadt85nzynzpjwkdug2voyv5xh1nk7hy77k3qzp87v7ck273h6bhmcvgh4x7ckn4zdvh6b3gl9q0sva8ryt6yttuuchc13oir2yj04iilqx6t7t1dprr6y4qjoguzm34odwo651amkhpuz4hctuje5zrbkot8bf532l60bkps4y2tfc8hw9tojsk3xa1ah29jjt6a4s9kx8igmm3e08kck0kb9jf3bl939nk31r2eqc3vjkr3fs6e6szpjzik708h88ejovlshjz1d38dwm4ot8mmxjw8dtelp2lumulf0h03jicuqp21il8fd5ltb8fa7rqro4vs7z7vdbh87h4bnnvqf3yi9it4qj50ncyot5pjqflwk87j0b4wjs90kqwqib75r96ftgwflbvxq2e25tjnqw3v67i6h8b1jg97a2vp1un5k3zyj6kwu4299j8p8dzegtgd7rl47y2q9q1rkj308hzixnz9q3kqszieo46gh9y1dvfgdtoms0j9o1zip19joz3jbszv59qr37gg1eebilo38qouq9cazrydnxd591qxreaymvlcmldt87nc43t13o6dfpawvbumeexe164bjjixnhcqjnly8j9jk189aixdfarkapj1zgcn7sdcyv5fgoqqqh69yd68t2etedcxhzlvl12268bpn2xd022rkf3ma4d5nw0v7zpo4bmaiv40k9q5gs8yanq1ts3j5ktoz3ja54r9czp369th4461xdjns6zdpm5lryq4ri1760a20duq9wmpoi3v7dcg5x4bajlie787dcyy2xc9ljae5s1lch7oshmk1ekodv7yeow3gxbmlk1ktwsyegd60nj4skue9h31af59wgw249iiigpiuhskz4gt2vlzpff5kvm5azz11a1wn8cxwtl22h4602lqoimd1k8wlszek5p0bdxeiwbq5k9y433655kree7ag72wqzngc099k3l9jhfzyrmx0kh7a50aw6a3mwuvyzq8sbv9599s69ro14mtzjd42lzlemuhvf9o5txziye1jm7vmgs4tu637b7v95vwhbcwqt00hcft5ug5b0g8vvq2k9hqw2y56qerd3jxt610vl1g0l5xdhno7sj1re29raztn6pjc1aitjdcdk8u603e55s3t6luweujzfjj1gyn2pnzsey4dtgvx9k8t8ghbp049xmrvaiuppqrqbgjgcszarbvpe9402pashcts8l6qm3f44ehfbw7aowr553xvk3ymyfuxbu5adft5nxvnbl06b16fa720ai9per01ilv4z76b17x86n41jn0ig2hey838oo4waevmhmfzeljy5hkafwhm5q4az8q2gc86i8ckox7t4y5ik5p6ezgq0adqribdn3dwkbkzkck5xj8siq5ixrnmrhwxspgl2i9akp8jz5jqonwee6a1z5iructhbo7j8ipfn5iwtfmx2wdd9kt4dcg7n81pkyv8r1wvtllut4827gidak87dipfkb2di6qjmzvq0sbfwi64krii20dk6l6it26brdvw2qggslz5b0nu95mecetyyxafoqh8rvkknco6y1orn8l5z7k4dt9uepsnusl6d4vbo36z33vn7wgf2sntz5ipaajhutfco0oz918i8iviw4nl02zybmavwm6nzd2zbk6u21wfc7ong7bnczix7e0wmha9llxlb9weqz7yj3n1kyzq7o0912k89xihpsfs3qj59szehzwdgzttvk3kz7m16dyqnspo6aplibp2x6gbigbi5qriepsue93mlr1i24vsbqy8vvwj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'x8qxbri7lc3jbzrqsl48wuhnac8zhhn8p74g8rdvvfjs5pml37',
                
                systemName: 'wqhpij5hn63o8labux3b',
                channelHash: 'yjthtevb61b8u04jjs6h77gqr5dmllzorxx4tvsz',
                channelParty: 'd3j9ddds2xe24zoz1llb4kmm3s2q9huyuhgl3klnaq4vtkgg2mxhqwm44w5uc06rllbvt193eys5mw2pezvz7o9lqnmrfixtp57zsp35i7ml4nawubfy0fiv5n86xfg5ip7c0w7v7k2ei9vjbw4ouaanvmsatvla',
                channelComponent: 'f5t470m61ru3s5rfufhygrv7tm132ax9xzfou45i74y6poepxu59xrbewcxd10isb25lc27p08gn4uymn2gj1lavy79xz3vziy0a6sr5dybd8e2dzwfzp9huco2rankffq5pz7dz0nx5ie9c9kebu70sg48vh9ht',
                channelName: 'n7enerqmg5a4vugrznen1z11aibyhmthepp6sdrtzd1lspohvty4icjw3p3q8odc6iclxpdt0czwgmd607a1apo0pi69kz1ynosiwhr375kayo7exz9hgvspxa8nrp4vi3y8vpnj7ei8oxb9yxpjytayfuw3rcdt',
                flowHash: 'va0lohcrx7cwoy967ygq719glx0zaisxebm6wqjs',
                flowParty: '2l8trgk012pi3ts6zj0hzjndcu3xv1yk74h48ysp2y5u0ibk6cwd4ceuwpx2we2ohb9hyvlqvh3oykabmkolq27e1usnohfbwbuzisfq6q67ne917g15o6lm2b1hk7yn7xqbv81ki2skd9fb5hhmar526oufay8y',
                flowReceiverParty: 'v2y639xa2ogm4lrk3drabvocekf3vmcyd6s58qlhgjvs9blkaft0t9mfwoiolyiki5ciazr1t1xef69jj3rxf81jz3lx7ut2l550zgvi4gkanetfm1dhdkz9iavw1xs1eaulhfiehxo6mffdunujx12n38mb2ykj',
                flowComponent: 'ndcxrtmwd2gvmp1yfoxa91k261nkdqr3naxc0zclvqpo1whgexd0d8ry0dt6h5aqgy6d88j2junrf9jruw32suqnnret8xlhcsrwg1ez5u5iljv4d04r3rknfu5mowk9t07ogw8pqf5indhgon84ui09bs7sop5r',
                flowReceiverComponent: 'pbsowyeqwsveu8a3dbpdso50asia2pg9b9z6hjiygmjuw296vyu1xfy1n8jy7999vomd4muw7oodo408gy8mwpada9z4lz59sk46gersvc44fj2lsj8s9jtrte2g0s7gg809obcssggw1gtpuxisktdvxwd9atuk',
                flowInterfaceName: '12usg76ku70c0tn5ei0kt3wv0fkdrd7hbfsiyxif0v5829p6yg5189jxrs03xm4wwlrd7b1ditnwwl5mgz90sdu6fzkum9we9ao0lzgpyy5inqkgriudurtoypa8rlesgyxfywlw61l4pz4yfvqoxxnszm96mbh3',
                flowInterfaceNamespace: '5rd5t7vo8fn16m9hxx78h92z5wvz5s5eorjkiuvzt55fg3ldmr7hhygrwfdx7a08xqdckuh928plbt7mvajpydu05czpugttepdpq0a180o2pepi1zova73a8oini9hwebv3uc11bdt8c135myll4iwmreaa8wn3',
                version: 'xfiuog4qchkhv8zfyd4j',
                parameterGroup: 'jtv8sxo4r6g7caxjlvqvcm2sw5np8w7nluuxs1uhcvl3tyrwgaxpf1kv8k3vc5i8ipc2um7hr8coyqf17jeslypv2qn0np0zd4zwrz4880vd15a8qekwvx2h5qxn2e2qeot59zz4sw2rg1qf15kp9k3tm2htjcvextou4n07r5ahw6ppfdhx3t7cxxvmw7zh3q74ape79m338p7j23tdy8x6iye58uixz8cd1qaq7i6lc9thvvlae1bl6gek7tt',
                name: 'ga71gp1zwevg7llj5inl2c35pqdy2m5v1v0lgmkgwvbvts02n0rr09v1ihp03oepyhq4w2vaioz05198gcyra2yq83wzh5a7c87ifkh00b271ox6mlct4ezucpha14ge3105hvnov5508hfa3cxsrx4ki14ov1ti68fhclnm2799aqlmmoqjik3q4bn80nlx4mfe4prqold42t48j2vj2zyjivjt41bctkrpekl3f29n3e4jt0vkm17n8r5de9o5h6c887fknb3zpwiahhvebywechcfqd2nfgt5petffbpzkcw7uc581gwitew1jnpb',
                parameterName: 'asrcds7i37vhs4l70yx6kjzj12bxx59go1e1qv2zjdvwu4p70r0qm2of85eyovyjiqoh3ai0c5r9l919hgggyeznnczqv56ub9hb6pd5e6dr5azll623k3ncfi90oetxr8khriu9qm4mnugh3pt259i76mb19mobcb09ydk7ezjlidolhvg1jcesom8jg147oxj3n6fizfiwszhz5bbxm3ah2b4a2rtb9oxobk1n8i0nv4htqsp85keskl35yd74o0vpna5tcvg0qo3nliirrgsq5vwnw2zbxh9f7uv499i9b88tr6401dd973f44llk',
                parameterValue: 'sp2h47lsvj986jdl9hg8drab647avdojuo4vu67f8b1kudjyvxkm3hghkzpfl5g8hzmmal20myxk8zzhnz9576ildlnhv5tefclxwrqmxo1a6al5v1561tm0emft8oytk7czcaq6y05snrpmopfw06fk36z2qkb8yu9jjm40rg1hsuzvzezv21794w15c3r87qg0zzwqytz2aie795r8asxv5fxeuup8dbtyd620fejy5sw97ciy5ng4pn38y50u6r8hi73rimv85oo5ldl25n63v507p6x2k5hjipvaspecag23yfyn3krrr3ywcjty17j6vlsb06q452vuqzd8cb122a4lj0lom1zg39nq9zmhbcgq4pzvuztz2fbeea7car0va7c0tefrlkerkm708oxycvm4htpcilk0daz8dk5flt2y8ge623rza0kb5zsao9u3no3zecnz07m6e4xwrfz2c87wznc3m5teprbfst0jju6p93gmqverdqzjfad723vihrr202q5bxf9dsiwm0lo835qzm39lnc4myjujlz395gaqpj0id40bdjnt53x2yjgzs1twov7iomdlama7kibynltle8r1yobocdoj8frypxasg2kvf8fgs2itfc34wxuotrtxakhy8tm782gbzvcu4jwvwfrr08wzznuhij9iacloo0rzqytm80p3ut7rnqq0e1qw6a87t93cbs4n9xa7u106xn52f7l3xwq23utm33wrjdzc6suwn3yn2u65iw1e8rkyto1n93z2flllkv737d6r0p0qmf36fue0g9pj8mfpsy7sjsnwe8t081mtsc97b6ftjo8asd2b9j91vgpdkng14117yd2cbto27e30zogz3z9dje7mcdk2oalwu9tejur67xojrxvb1witcqghgkzg8pge03zrnpokdkp83l8s8ddwigrqbt3xds59bfg4adj9illpu6wk00l8tttt7pv0g514f9cfi80nfp6befd7t9umnk3hxzfgefm3l58v2b28xzjh5y28c0l582t63wfrwc8x5hx1novngs446n1pkqjc6fjq20t6y8uwsiyn9ami6b8vcd6y1xwf1b9a9gyhjgwavfskgtwrk21iljpadtjynwz9gf25hplm6nii9161v4wsiohwv66ezen2hmdpnm71f5fii4tbsyzwk005ib0n7vbrmz4igv3j6d0tgzijsire7ty8sdr35zhz39y6teznjxp62k1vgyua4pezxpj4y192sag8rb5knjwnufh52569qq4bf1ayxrukxbs039ylm8ajhxntexvrjygq17kh1itjyxlrxhxutiq0tinmt3j10w28wnrbbmw70rfm67bfvxa9m7o37m7jlroc9rwevs293cydl8e3uevr4ypkue6s6cbyoufneeowsomr5w54mgw6ovwz6lv7wmmg9a65n9ca696888h3n7vd08kwoh9t56rjllw69z7qy2ifq324t4654eszsej9772x9vf0hhhkl9rf5dw66abd1yyfu95ofym3ijc8aht5vx24u33s8qv1tecyjp335vwufl9fr7amp5tj03toq15sid3ep1j73ojtjrt7ri9fdvsvixk84issucdqhq04mbzvfozrn9n612hx9qcqtzv7zmckjioovniew0chfutrme578olgtku9ix2jz8z0j046sqool96gjz0h67uppuup447a28zom73deajiin2xqnce5nzao3rafwn70xkfexc5bp3mn8umofl5eehw1h6xnxb5bovky3uk1f374xhggr9dtlwushsf1mkz79ftfdhi5f8ijketyh40dp8im0s2z1zeer692u6njb0qqzq29ljrbe9la8ebhvjt8f9ocsz03ifhyjav33n4dl2r50n48bntjo8nf5e0864w29m2p4m0s2ajtte12nmvf6uwthmtxeoyymv4uavl77cuxykyzl2l68qtfi8hqhvkhe9ti4a1qc5v042c8rrwnk3ea01t1o6py0iqtezavtu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: '1gl88bo7anwj05ur52j5mo668ef3s8554ekhsaz8tp2pp1sy88',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: null,
                channelHash: 'fgc216qvv4mwgojwurx30f7o7g0o8rs2q0gjdko5',
                channelParty: 'sxil38fmikaf5e0f4d83izb02y2g3rliw8qv2wo7vd1nj7ym2e2wjb52av5r4zx7za7ihhyztf6i937kqwzud36eghdhndjr0d4kiwcyi0beiqjelji7rsg7ifujdxzvpr21v6a8ka4bchszrlazn3cqkap6yme1',
                channelComponent: '1gt4wwv4ih4widpqmpi7d05bechug5rdmshumhmn6m9d6zr29xjze57b5i0s6uv406aflfw4cr0rhnch69xc76d770wxyoknn4106599xw4iuxqs9iut8xqthmvzwfadcm7n9dg6wq4z2zl0c56ai6ug7stlachv',
                channelName: 'zij7evwcz2t193ap0v0k5dxmfjyqeb89ese8uy26wq26mxny7z0hr7977egg9unedr7pia2hjv9qa9ro7romoz6co5j03gilmccupmq8i3ht6th4d9p4az4vw4glvr2qx3w6osne1ou18cgkwtqov009mi4rqqpw',
                flowHash: 'mdeeid1dmiv4acp54z5wxvr1x69zhz0hr5ur70sn',
                flowParty: '9q82p1byz8nqy8d2l2me0rpbyw7ze8ytvg5wdvlu3xhaux42ne27ipbvk3i8mqff7l8czr3f825tqnuwpu3hmf5w1n7kbx82dbtdoul7z1k80zwoye2vsr9v8vexnp5js6bctzil7ywm7hzx4zsqnwg27u75zldv',
                flowReceiverParty: 'p9wsm70chxq3b2yvv1y2ngvar0ynqu3sag42xt2l4xl24vcs9ipx0xypcy5h08kvdd027ruvhhijomvcy0zemvn54bl1mt9z89ueb2znjmvdoz78gtpnvnz1h9r9chte2zvh45t63etfbz0b3is5i8rbwhjjgre5',
                flowComponent: 'p2pfriohqkzbgddiyzs0ff1q98o1fsczfrbpmsgiz13af1gtpy4en7h1khfrty1n03mm6x8km9gzjp37y4nvzb10baqajz7b86rpaf33n64gmsgsv922o06ziarz35toxr7jqyszy89ehgbg2efklsw5h9bf78p8',
                flowReceiverComponent: 'khjmqw4xh2np095k7oz83dwswdhx1dlckpj5npskv1mx8x4j07vvu030qp6tm4sq36p4w9py2quh81eo4n8byi60xgwe8323dcol57v9lr4cwktxwlgcsgoo1sls0sx2catcoavwrw13yqp2p0v7tyreppd22iav',
                flowInterfaceName: 'msbqdt0ka73otlwuxg0j9gye2d1v0zczkjv2p22ar0srsfnh1wol2c69f5v9hvq6gn4cs0h3sdp4235w0dytnsnzqn6cwda32zm0ipmqukb3pvs76govj8y573a1jm7fv44quzabq3knc1tgs2e8rixrz8pip0x3',
                flowInterfaceNamespace: 'baj7j19r142p3i3ye2tx8i30mzepefuncp9qg51hbn0itr7lskqna7ye93rer1cz9qk1d0uq6f2rkfkz1kxc9h5t4jvibtj1xa789nmbpholbh4chvqssh0viduj84wmh5ipl5csm7c326t957ymg00drchpmnle',
                version: '46x93r3wc611e2aqkzbs',
                parameterGroup: 'wje7cakv90v5x780z0rqi5vv7gfzz9v4axgksa2ak05z367h0f3l1zgknearvn026h0x5s8w33ti7zc3uqlgqnxpoalbmw4zhhyf8p7ti99ze9ki84hsif31s49mzb6s9xtjje305e3ip74h24tnotxngq2dzkt4g7l4zuxr9digfxfnzer3kyimufj430bgkku7rx6v3w8zffcxcwu7uy86zowkagamw44mxt9q8zyn8ru8mlifdzufmviplou',
                name: 'uj0wwkc9gi6064v876enxa620ga37pflwaic0rc0kz5sas9vgpyg5j2e6n1qc0dil255p9mrjp2uffav7p72aduly6rmvqnsvhdop928doddtzh21ohy4tkzibyr1sa5ehtyb2ovf1f04h2t53vjszt6u51qtsaz0plmo7g4b83hlz22zyq58e4mfap185kqu9gptpkpa4f4y1vo82c67zwsom6qig2bgvtylqg9k4el4yoofl56zdkplu5ypvewjs5tb07m2k7qnoyfu5rt1hhvryy0z2gli1b1fe0xjjvwv9ad7t3hls7qlc8znv2p',
                parameterName: 'q393hp6jg34y6dvbt2xjhxpgvh5xsab8x4a5ug2zq1endc9hlf6wqgwodj8xa1b2yqofcz8asodb0afixi6f2x3o77j6eqddgtlvj52hicujdluaohxzcdwxo4u21lw9vwo8j8oe3nfd2of6fwwpqp4u7pbvmiisan6nvw5qkx609wsobb2ckyn7x2o637mhnwh1uecfl103p75yt8wukvndrhx1cn2zashhfocx3q9nlh9s1j5uulss9axk84rov83502mvcx5dlddt30c8dse2os0uat3mdy9bbuphyssq0gboey58e2fisl8dracj',
                parameterValue: 't1705i2skv6ijnh40z0bovl7xqvt0xae9zej05ieou0ueo4eamjhucf3269g8xsu5h0emrxh2a809lclygmfhtbt0fk6tfyyf84okxj6vyd1ta4ks2b4v2929qz16lzx8axeb6hqty5v7kyop9oita7uh020a10sy23mvpe51fksajis5codc4q0cyk32o0hw6lcpvsiqbj20bturff5b5o4h2cjrm5k13tq9o3jjga983gx3awwhm97yvukcyzlrw9jb7p0cxoliozppwyft2riam1utjuah5lit1gnv4lvnyh8yx4orvdd0rzmqu285zmmu1otk5wcyjqpbbbzsgcmhh16bkfdhhhoi0e8in5iwbzadqsazpvt1lazd3kbh6wo67xnqtyn9q3r9nzng34w0h376eamulr8f4s4brmoif9rxdl3gtqlhepzoqg7f8flff0tju3sovdslfdsvaf2awlt4yt9iuktjh1p7y4lm7adfrb4eeywk1jpuwu9p2xm55nsy56r13yqbtu0pb2g458z1vl29f3e52s0jjnw8f7k6arux03228i6tqwzqkkk16nwe4kqofguprrw1vjnk46kq8xe5kgagnf8vchbfyqd7akrvj7h25d9unao2fchxv7fepcnvi8neropt1aq4jlgqr7sxixx9db4git5j0xpdlx006jfdgs33wwev7cg4svi9olko5i74wm1nlypnhhk9hnbf6v0f9t2yfw3qthuj9rnnyg6s9x45fa8zmnqbaansx1saapw460ee28z2ib4g5c9md7zcz03hzi7wr0dp6yn8bh4554q53enuwjrnaq0k2ct53tg3ov48b04zauljs01iva5k5vi3euwusxop6jpyn59jzpeuzi05zdnhxjzre4rq33qxc3ls0z0f9vo3qycrwwqqx0cyyspb5guscpvzv2mpnhdp6zxukuudy011mo7867k79rcyps85o8mlawlojnsx1mhkrcmuvk1kao5v6d0634s64bisvvd1w10w1yp43ui7hl58j14ui7qphjm8wrioolo46wz25mcozkxco31p0t00z7u71z2u8rh569i5z9x2qltpu1nyaokb8aa01lqjr28bzz6qvzbw4t9x5ftwb85comcyt8fxymq1u02d9y20irffq2g41reid8mfzju42cu74xpmz3dhis4eq3vfygb6xd28fa9fbot6s1xi4sczdj9ji4j3eho9wukw1sdh292jkrwb6v7kqcmywz4zn0se9bq1dim72ngcpn3lxaicejlymh0l8xl31poo830d5sppzz3c2kmxen035mbl2u70jgmsmov7m0baln8yrofwcgy3917cc400bcfzgqnpzbpbtb1rioaffb1nbc3dym5vkty5eqdacphint23hh6unlgxh856sgj7hchsl2j2guiwoibcix0y6fhlmafeuna2beldpl6ey86p35gplpe0qbnofiw0ts1khndd1g6imzh83qvxc7xmeeimldebhq45umu6ch60zg743f7z7zibjohk8lrmapcc6lybrdbcy14kgx5qx1qhxbxatp8qde0s284nhkhrwtd1cvt58ue3mtrawewqg45qzcje11xk4joe1xlnoyptaqjmk0qn7bpqwwfgepvw2ngmr0q994birr7h87h7d4di6p4leh6zg65sdtusdi7ldqdlhs0bajb771fnjepua6quczvfi4z9rg5ce8t6is64s45qpfql54sevj1qdkxa2n5mfdbm4csmsx11idnjj1ld5mrljo8012ys7csqg17o7n7pucwr7uj54jliesta62gax1zcyxzpmk0skgq3xnmx58aozpyfrsr9w7rzb7x0untdmmw0e3kvj9cxk8chkpz6bmoc6io36l01znw1cjw9upbcxho0aoh6ei8vlapt4js3w992pug7w1pe3827gpfdjkfdgl7j8ysk36lydpzkyoxwi65qhfqiopp6s3yctr2cpfzwbbwomr8uxcxh9anzie8qt7reb4p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'a2zaj7yojyrcvvjnltkg39vqqds590o9g442zdfvv6mlqydf4i',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                
                channelHash: '9oouexz35g6xg9qo101n3vc2r7xm0kgevq82tda5',
                channelParty: '1njuq0qtztqrkqhelzecczvzf19lji878vc6c85oj8bkftwwdgm27tw8zx6thfutfg41tq8j1g1r48zf3hmbdaur0om3g9j6u2i6m3o9xahn3296vctdw0b3easfeu0amkpxff2lh2b2sts4caca9l6onwcgnaba',
                channelComponent: 'rsh58cfjdhk03fuyl643gj7ea5sqkvgnw6tbgeg648uult2qml1103fosy62kr85t7caxoyoizjy1ayqv5qr83uhbrpeuxz19swcjceofhoyhmaawya10qhh1e019hrtwrmuxozncngaafq6rg2gdh4m009ad7z8',
                channelName: 'fguskk2a2dmzp7a07l3bsmxzopxn6bpz7sg4c279jysjeb8jz3cbrq51nwqh0vyy6qqoxp11mx5op9auwr824hyaro75h380g5083s7ka9ctmh5bvk54gwkkb7l1x3jypf014wj8ektj73d52mnnsl7ow2r6obyd',
                flowHash: 'gdgmm48pyxtk5f48hcxr72skm6g5mlg8zguvf4r4',
                flowParty: 'c29412p53nyagrs3cruy2ileygwr7lqffgfgi152u6dx99revapf88j8diazfcs1tcc185kh75gdu6br3k6jbkdumaggabk3xjggkky22les8i8xq6hbqbqcsjd3cvhlzcguioiwg3v5qtne96f89le70guagccb',
                flowReceiverParty: '1vu8kbv8ndwtznzorl5gpce0tyg5enfhmus8wm0iowsoojxv0cwgbozjyt0rlzedgewgblht60prb5bw485pt8m28d2vvg0bmn1zoxa1zj3ekl7c943w8z4jh4cvdsqdriq6k4uiexryj5m23zovvaqhtjey05fa',
                flowComponent: '9ob9sjvg6ppwaz6kpj9fhm0ynowqexqv46uc46j66ggeah3kwybv8awa5ast1fkmuxcnt4m0kh050f3sua73db1ogu4n8ewp31lwlc43tmuj6h141xjbd87msug6tgbztoobmd7f9wgs55oorj3poci0wro0ys08',
                flowReceiverComponent: 'a3nwucr1pr3ig7i92c8cmjazgrdhix3k0lydrfwzwa39iq33l5p1d4cw5xax6x07tp83qckarfm2nokgknibshfxconda0qz4k8582oh98gu0u43i0f8savrr88dnrh2ya7r8m276331gxgd5mcuclbctj7ellvr',
                flowInterfaceName: 'jiw4i7e6j7d2ifxrvwq9bnewnq9oo7rgdg3n9zlcss4wirl37g8rhmql50f7j3c1ku3xlddc1zjgoy4mzwwhxyxadwlb303o3l7jnwkowtx9jl27k81ir3sdfkek7kel9qj2w49i5lcpcwowuivmjgkntfymwbgo',
                flowInterfaceNamespace: 'vsi8v4xrnk9egicibk7n7mr956736hrn26tn943fy36ulm70sq65kgu36lxl2que6m9achza1zla3s9pqbgqzlzoiupz5te506h722gam8di4vs9iw8d9ktyds8jy7ltxz5bufwg6cc98jgsp5kkphkoyz56ww8z',
                version: 's2y5tq98l4lptpr9wckm',
                parameterGroup: '4kskxfela9zduu92c18cuu7alrlxt6dfywswupc4xn7lw3gfewelouvptj9j2rpbp3w1xd00op98ffingh7o3bfi22lf0m6hd69mo0wdevc9nzpfwd6o9nhomt6sivit5be21e0qpfrld65hc3dj3h7law8q2jjwlmyifiwy6nh0mm05jfht8wntjdo82b87cz8t1ip5isb0xgv4rpfvojdxszow22hnjqfeq0vahjvgq8lucc6euq35u9dj88r',
                name: '89l21jl02780d98nsboyhz7pn7zlou5ov96q6oyjveww1j2y18youj875cwm6ynfvo050v4ufwgc4loxoo8iw7b97ykvjcmtmazgwkcds7faxbkprmhjoilr18rhoss0h6avpmrv9e1x18eyykwog1clx3vznqsnivbukly2qt66nsyw2i883egzx88jmgve5bk4lm9060fori67hjvuvn1hf3e4ps5pqoidto0jcdb9utdzusioqane4wwdxcmeccg7lpnqksz7a32c8r160h41ri9dyw2gagucespcc7h7kpysvkm7rob1qt3zrs80',
                parameterName: '45n7j59he6lypif94ols783do0lkkiafeagvvhuoi388aqacrbyjm0i1lnnh8lo1v5mpqz3mtx0p9aoc3uk43n3w9f8b3z63ekya60qt8am26rxolr9txg3v2eqf1t92abp8dn70gdwem206x51epj370tl3prdehl9m3zdyfc5em3wgmvff5s1nnzjvzhx2uv4gnv56kkm34hol1pkiosrwl5g1mvkkvaj9wo409e6h86hxfy27esfnjoiia8e5qik5puwcsih1329l1b5br1wmfc66120s9qkv9k6ue7npppv5y3lwlrn0q0p4azy6',
                parameterValue: 'f6jdww2g6j7idvrbkezyqzbau2b74r09gx79z7ud4l0dtmiyl6qv07tclgck3i1shf5rle5c7l8cau1z9txqnmjb2w55vsqgjx2e11w1p5e6vpkpa08cn7uhlo3ywudan0acbg5xgos44onu9whvlii741g90nkb62rdtql4z4nh81z0yijd0n86xeg4nc36q66ry4cnlrgmirxyqa206697xl8sch1h2lteown32k2niddfqfk01b43c8p8yzcr8bo03liag5hwlu2yt1wh2eimq535pgfymfomkbm9agwy4k4bn3jgvt3wjqg0pd5j23jxv1fqrq685qysgpubr92ftiglcy1dtfnsuz3ijwe7eauuneb5xri9ffar9xaxvj1fqh8dkj7owtcafly85vd605rt73v9sn72gu9n96xun4u7erjnajozyuz1fviw8zan7ltr2clgjsz1mbyv7o9imoq8cw8cwa75nywo4gq17cvuvtgpqykmywu4oygktfmf66wf75k3n4fasfmm0vsiy0ngn295j9ouktn71ioy9t1bwb712tq1hrsl53jhkazx25pw83pb7kbwdyn27icz92kocoyzu6rs1yx83o8kkff7gwgotystpjjh82zc21v3sfy9miey6mmbajdoors9r2w3lwbal47akch9ugg8kqfk1v0zo7fe1lkg1o3h4shx9b0wu3obst7ct0v9usj8xiwr3k3f2h3s553ojr0djae8xy0igd0pltyom2u7hl2r8f68sh67iixtsapmrbksl2uzhh493hsfnbxajt8eg4rigd062ylr89v5jqz7r5dz4l315dgt6dqmffzvdhzokzuk0qt2idq9ylkn1wsrqkuwbgtox3w12ys2evazdlqno0eq4ev2xdj7ttqb0kb9up2q2s4iuxkzqonvnawjt921sqe9eebokydb5muf3ae354grx9vdrgpeo4udzimxqrv2gkcasc5mnn8n650p9cxhib23v1k4gztbbj54jcua5he9p4o6ypgrzwfazueanrj2kdyr8fciztc321ntfs1zjg3xenrwum8jd16uzfldjgxyiw0a5ygws2jv0bwaqporh1kiy21wj7uejp3yhsedzosh2oylkymfmrp2u8du0pk5c885svdifhwl010hgq0kaovfvgjvqt1ruumb0e8e7ua2s5kqq3fm4ajj4qcv0hguajsxlwwmsj8c55n8psqwigrj592vcoenmuvfzhv8k4nlzvncb5e7mlgjntsym8n5sbmsnnkz1mcp6wngk89wo84sv9f99ldvq2zawyzol4dyccg19z8xplbyx3gjgq6srk5yf86k6ijdjsacb2atg60g9ak5pwguzwf1wt6xej7raol2y52xx8vzo8t21prr2p1hh0ys3fhyn44bezug9roeey0c1lcljegg43x39e4i2g6do2vm0vju7xsri1uqwfcnjr89sx9lakzsa1w9p5lzecupdxyceadk4jts6umgu0q3apspliooeaoptahaxfwazuyhqfis7os2s3ari10mjpsk7tv12pk3hu0ixqb4uhmozkh1l70k7qnbf0546kmwwk94d0wmbqr27ht2fhaxu2gi76rp11m5dc9z866r9hpl2mmv37778wu95ell4pny42ingotrdsnhnrijgh6mmxf8ukna7j0qtbw6i7wm60w4qosyrmenuxcta0oqz3z54hv2ib4cavfqe0onoftei9gb4geak7933fuql9k4aqfd3ib4nf411dhvcx1qy25i2liwre6750dyrrz2hlvexoz2z5ld067sprmkzpm28lg7doswp5bm2n05z10102okfagrb3w6meyk1zrqjgqox2wtyavphn01wnh72qbu40o2tkc5j4v9b6r6kb5wjtms57ijq2kyfwkodxzgtx414f291y0vtefcu7p1nsicqcydyk30s9e2d6lknwnj7u4zwp3e7b4f7fy5pgbq0raaog5bcdnmlx0u9w8ztpxj7lrwog4gkenq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'm1wgz3hu6zh3wlyvqhy59mh3o2qlftlp0muao53gbv1jpbsy2j',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'ael76edsx3uni4jzy7vf',
                channelHash: null,
                channelParty: 'k8jle0lj2gzxmtwhrvzet06l3phzjsugwd4xyrutt2l6nzqnc6foa358wncr1ejfd55hru7249d0ar28zyfnuhd0qwyy8od3qysulvid5qqc5h2ruhdzqguees1252161tuh7euuigq23gjtaklf3e86mlrdn4sn',
                channelComponent: 'igb4dtiok1i7cn17yq40bvwt4dqsdv05xhsatomhf6xgiwteg6trc2ah0424by7w0so5maim95xeai4zp37emyl0uk8iloxtwwu1tb7x4yae565j0huiorc0t1r0md9tu5c2nzlbj87afaeeubx9dg9t7kce556f',
                channelName: 'wtztjels3471ynnyb88wvq9q7rikqar9lbw1xbkj090leoscz4l46kx3wqw7nsybxt9q0arsx597iwh0xzhwq07vrccw154hyjhnhe5g558tfl80t8jqm6axd3imume1zsibrhzhiklbjxivlp24bgo6qfx5f8pj',
                flowHash: '2vcdcybccyilpsbfzxbwnp9puug6gmxx2qh06394',
                flowParty: 'rmv4a6z37665v3q8oyi8vuk5v99wrzl04454mpxz0mh2w0op29z5peuljnsfo2zyoiy6p23lh63wtwivqrkpyuftsz56y792z0iid20qh38wer2yj6ir4bs45hlav6cyg98ddcpwqtddgulzz94e8h1xcqtd8rny',
                flowReceiverParty: 'f7p8cces4imqwahdz8xdl74s55ze0w10gxrrssdxtxyfz3x5463fx52e8prtm5iv3a3ne6zv58t6rq62ihn1jau9ztwpdz56cof7a95xk37l3lqjsc9e47p1e0ab5wyznqhlcuwd4e2quygq8ubc99kl3p1xvfs5',
                flowComponent: '9f12x6ozj9hln1rhefi04nvshsya9dktibghjd70wcezy6fx7jcjchmeqdgiybyuv91f7h7pi1d82xgckefxdfxfmxzdg6hghfb8vvstqz7qrgruzq6hqldjd08ev8cbs0xg55bn3aznwpu0d541bik6st0zs4bl',
                flowReceiverComponent: '9of4606drvtg29l5r9vgw32nqui61sd1zfbfyn0loxte3p2gs27llnhzssk7eh5checx16hs6ar213yvh403ctp134rswn9qmq421i7ggme89gfotaz791h3zvw6pt1u7uqj014zthtp7g0wqnp2lt2alr9cxg60',
                flowInterfaceName: '6s09xjx2on23xzjpqfpfqh8v8ontn02w2g04mo4sbs9t6527l1rw41sa7csfd6lu14p6cv8kfkdn4g9qi2n908zcfva4g4i8mrfka13jq72arboj0i1n1yvme1t3ufqe8a994s0313br5967ntaxjihwb557n31n',
                flowInterfaceNamespace: '1lllud8h0vvemfd3n747epfdsrrfu0a0mrfzxsley54a7mpia16iefbqqgxzebab496sk4zssx52nfhzpif8f7sqxhy0cg73277r4tqfldn8n8ywoamzb8sjrqlbdtkvkwiz7xois8gf43hwa3pqnnjpe52a0bay',
                version: 'jfwikasko6htx4khfx4m',
                parameterGroup: 'vnke9kkwq3qz2crd9djjjp0ka95zforhjrfk3lgpucseyu20cuhuyc7ym17e5ms2tkzbjexxb80uwofve8b8nevs1jc3hf7y5097p393iyqm4k6mgci47on8bsbx200w9jusq82w3wuixse0qx2tq78eh4xgznzgg3gkm08c6mazebsza8ehq98d4sbkfmisn9lpyber2takdtsz3x3wpd4wid63xsdwvy6uvdmxtq4qfter3h1s8izlxmy8rnt',
                name: 'pfhjzm3xpjr9og7ysgosapnjofr8dta4055yudsa7c6d1ux869fpdtx6kr39v1t6pslwd9fzodaht2mhfsgmbgqycqpwebb4z2w0qhzy2jytfwgfqpux5lccoa4owcwjb65o27s5ocq10j4hkv3i1awnznohtxd34pfh02gvspk2rbyhhk7ll0r7yxtk37a896ityfcgz7ledgw2udbtyif789lkiemf9dvf8n8lhivfa6yip8a6zmw45qv9mlmnbhkgqshs3w05pv3tgit0fnucizox0njszkdswzjjjsgr2mgx3m55xe28jtz3h1pf',
                parameterName: 'rbge6x09ska6zgk80cmq0qc2pbhb1fvpp9o4mg8eqar34y2okmds7apat0pxh7mx9nz45epvnouf3tqc4skbtfxjx6vwydgd60sloenzbfn007dpqy0se4mck787ygaz7zt62i51g0pp41i6163abtsthl4jibw6yg8bvv8fhrdn23l9p1c8brjxwr9shx7zbvb0xcdxumdoirypuocppummom7fepk8clh29pvy0k2uacn5q2jha3pbktmd12by2ulfgwpljn81iyk24xp54xagvkqv0ifvlrsossesqaidwbskvgk8wcqrcjiylkn3',
                parameterValue: 'ux31ktoj5fx8ziafej63zak4a08oxipkfquqp62cobwmsj68ukdo6owlcagjr1st8br8yvxt8h28x7585rnjewrcp2cirke1wixzp6c0qja8k74ocuxmbk29cu2pf61ntauhc79pdxhleujbv64c16ri41vkwixhhdsiecq68dn2vwtgufyc04ru4u4qyn7nh4ht33s54pk72nj4r0eb3u7hmb32q0mwex16byx516qdc81wjbxwwpagl61jni295ai1pqopn6cq7xd6km6p2skd5baxwzhg51y9l8f47lnu4ja2axdtcph3s05y0u4946xzqp8hcbtg8fviv50w2zc38kku9lgbteef3nmyigxdineeb848hbi6apsc2m1hfr2sh9c420kwi7nbi9ktsu4n3ybv0ajaq92b6z95fden2yt5d4qahjmc4uovpthy9yfkgmxfmdej8uwln6f812mh1m5hdltjvtoimrcf1replx35z59aqga2culcekgwsx75jvpfqm7az3nvni448dyloojos4kh1pqf005qvy6ord4hl23gwi2mdgdmtszgcxlc1a92apn1tbew19oiyqzdoy642gi1f8du52cduii75u1abx5sk9yv3tsbbl114sokcm4y75tidcnfhz4a5q7yry13wz7byc77165r4j1uhsn2d680z3rltpm4c8xopvgka10udxx48iveyu1nefbxjimcq9swjmm3xd2n35gtaew4taio5j0gyjljtgoxcvigtkwvj6m87dc1ue3b3vs57wg5w0ikmyk9ivxhnr0ma55n5jhehbxqyep1ylihdlomui0u0g2zea59lr0ren1zqy1brtxodgirmo2czmf1jf22zxbdj0c9bjxgw5tlf9gbrpdu89uypv5hvg3vuict4n5bqp62x3s7xibzx1fr0k6km5obg7oix8ao7h8urei8cgb2dszydmvb55d4s3hj7ssudx7mis4yf3aszpzlayov34d9synfprz8m2fi9rhz7o39e79vm626ce2hinoou506xdtvmdnup3h2syal6cm35w0wi21huy7p05de2ff4b2bqr8lg0uiytcqyq3kq4j3ephxww1wc9uxl59jfzgnd3cs3odco3nzeyh302mbp2leuvud2e8gth70zutugljmr1y89d64qnmiv0oltwhfb2q8kd08v8nf6f03obudr07i8prtwkuwgv1xcgz8jjdtod2swwq36kmj5tvl31j67n2vla9yqzkbi8vpf9q1tccot0ziunxa3p1hu508v999qndd3cdxxgnycndof5f2swy4tnbgf30587htugimuomllgussk5thxkk01es5vqwvhiexebro7o8zqablijpcxvq51fr7lam2i20o2bkmjkyjcvh7ibsgh2cln4bnqmwd4tc3kvf484xxfz5et5enb4qbtei7ensoszq202m568kikpkdytd7asjan0e8htq9ji6jaayhsu2qhp5xsse3x6x2mpe9437pktu078mjaxwbq9zt38m0jp6mq8qpmohp57s0euis56lofpo20rb6noa3woi0dodilbpy0nylbu9xbp4fvhzxcr5byf2ynvqzgb12b9soxbz0317qo5ls2c81etaweocshlnky0urrz2tv4gcjyz0m5iau13bgq78dl0hbb4ajeelzy57nznl8phipc3j6m930pbtg3779costcdd1bwq7c5hmni4472230z2a1yczt74w2283ydk2nyhfwumrf0atqmctpb2x70bpxfh2ckqn8ftjeql9qvpdpfz3b06qx3nolfaspqak5keca5nfbzi13xn2iblnhcf5x2u3r6xxgk6c8w03r8an7mv3ekl04fn7awh7zivd54ypmec5ikvv8qyncwshuii1mdag5vcav7qgsr9q8l3cko76iz37yngjn69jqroecda6hseodbr32fwmepjqxo4bdtno2k2byxojvdwy7arq5vr397vkpryup0c7sd05e7bm2vqxbdshbx9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'qy0ge34ej2evhet8u2cd2ifwq4f65746ib2243fpd49acqne57',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'l47hk5nw3ara5d03xhus',
                
                channelParty: 'g48tcome1oxoti28fosoehwsfrugfbuakrr971yumxj0w6q2sfrvx4onins25mkrbqf1jp30vfjzo3s1g41pq5alr91x5mu4v6er3kzndbqqs1m9gxecs3suif7g9qwqpubbk2tz9gtolk42r7xqxwnw4qk5eoer',
                channelComponent: '5kcix89jsao90s9c0cfuywyt6davwjgrvft9azvlnlaeebnlp1dlg04jt9eswhmhs67zyrdpfa3yejpciebig0juo6qjacjbce3jmgei6wt54e8mcwqmukl10y2o84zeo9yjpq0jl2otvgdb2vmd0m3gaj33z410',
                channelName: '0l7qaqra32wsim4obdxmmbnp1dzes7r1xg32tq9lsi7xf8du8iqwfrm4m689c3eutdw8avvokbooehtzvcpgy4lbt917k6cee8a2li6mszhnwdu43yz0k9onifa34gwluv3j7a208o578rphuvqm59rs65c4p05m',
                flowHash: 'ib737jxy48nodx7f696syq5ey7vzwcanhg7e5fr2',
                flowParty: 'j4ab7my2mlsy168zq9q6vpt6nrbodii9nn39ab5uyqn4pzqy4gfmqz3jvkvn1hb85d3wkow1q5vjw33515eyadyolays3p9mvoe9erloz81t4cmpi0eqga2le0ku0qmn3rkode6is009of7kgledq5kkpwrsr70j',
                flowReceiverParty: 'htqhl250zyk3m7wynpbxs1p59200g473jn23r7r4l09dqe15i0npozuf0we5x0pwivkbg6v5p7x8eis8sdz72q9hmtlct8oni1re04dn4fi1he7ern42cmx9kzqb5kog16oqvyoj72bhkng63p4fqpxakpgpqszy',
                flowComponent: '6daznv1j5xpsbcx5h5d8c8c7svkfkmihodlyvm3r6zmekwg87xog0kgxx0z78qwnn2650i91ksbxp9o5xc78gxsrp565jmeeuf2ynyjqo2uu60shrz761j5hr80lnioua6nukt7lwi6ef0hwc5z69ng1xgrfbbmx',
                flowReceiverComponent: 'nl3ixs49zjxapin6s45s5o50wzf68afbpc4q5uyd7nah7bta00bt8nxucld9hh0khcoa9m1gugyfdy3tnv6v3p4slbsch4pykafcl4f1xh2sq8qxa42q7woks44k80tf333mapsfwau8hxwyex14qhrpbjy1y7x1',
                flowInterfaceName: '2gqmjwjwkwehueqvf5zfxqxsqgg77z4744ahjid8nqym2ojx82ijm1enaxwop7wcsk6uiafjy9afvngkd5mi5cnk8qllazm38my0ahj02i7d8zd6pu41hjbf52jr2782e6einviioznwm2cwcqsqiccy2cqc83a2',
                flowInterfaceNamespace: '3msh8yowth5rfr5lx7r0iryuxfyuhmsltlk1b8rxc7wyn2ri0k3kt34i1dzwtbi7f5m9x29osq55jvjmx3aj9jnigoi9adqmv6e8rwo6fuq3b0hl5vhsgpowy0p3iij1drwzomw3v8bkgxxj0skqsiew8fpfb0hg',
                version: 'p0boxxsfq8n343uygvot',
                parameterGroup: 'n8ayas8bc1ta1gc6fonfy2jj90gumtm313c4zpcjbthy1tfyvwb833e2g4fxsfpn1xvkyyfh3nljd15w732devskp1rokdsp6u5wh0twi15hlx7577ponoj19oeggtufbkj3fvl1nfv6hijq10wykl3wx8in7560kfln7vo9s7g8ic9oztx0vpgfsi9mlqx6nb9nc5gn5v8mmya7fuo2q8520zhuga74aa9wyl6esd6equl6ozm2aet3hy4e6z4',
                name: 'g848tb8ppwsk2oo3jwu5erchjfkm7dqz7e9296e6u4xpv23njuw1ki6bailmdy230gy7loa4nciuh477p6b1tifkqke0wcjk60jcthlesks7nyipaa3m17vx8oghxgt1q606qy3qgn0t0ph8qme2tiwme2aslppq5l9uarfl7w8etzo9rntzhezyc1zeudgqkr8txxmmmtwhg0zklwybm06hlx36kuii79dlg3a1by9ftp6mcf2c3d07q0lq4su1m8migss4u5lvndiju2plsoon65qwcwup7o6dpjsqtq0jfll3isa78451awf3iwlw',
                parameterName: 'b6tdk5meru2y8fhq1l8r12lcu59v57smsnyhijtsxmxo95mg1eezofvcb6thdpctvjsmhpd3f77ndwhmu9ht66tevkj3w9rsxtf8hxwz0bolqxb6r13r1k4yle2vngz1amj8ec7iehudnnw1sxx4ihodwt000o0ne07bdw27v935iwl8gv8jstcxafbgsd4wqbjo9z80a50xmqpqidhq36jcyidp1adzelc1b6wvlxj7hvhj4fsh6m5xoxtiidqx1af328y5yfkioy714pkc93tilebusieyl2zs1alezg9ms6o7lbf1kkeh7o4o9ekj',
                parameterValue: 'htzoohqp5glz12dqo38nryl83zk4gtpzrp4tc9osjt84y6r516o59loo2f73fugnj5uwrjue37tn7tekop399og2vwsenzo6i94puwo0851xnu58q17htrptukcqkua90gl4sf7yzbcpqix5heamvmpyepva2n4mcf4x0bkwin9jq2wvmbdev5ql37pzi9t3837bno7tg1qq5zzi3o79i2z9e7w8yz5tijwpsixzfz84k3qeqx37lqb5bmg9yyd8rb1utlq3q8gycpypt0rn3z0nipe4ddsr158ocm70sita4xw2bpz1vii3y7yk1nn956kdrn86s7v681jnk1t244kdcoce2xx4sff5bk32692ztxtzi1vva90ou0srwczkspnz1ldxsr7fx2cwo84aiiyj8eo0j7vn5z5theeuc20wtpfkdl9ytwxz77u16kza3eqdgxdugmt5hjj0mlzdrhuq44adcxn25zvyw2n0i367ailzdqw5pnw3nbrgqdke2t1tasjcw4vab8l4yponplkz83n7jg8cj4wcnguioasea8sbo1mmnldxqkm9l5dt85ait204qd22fus2aundouab9vq85vbplwffy4pymruf1mt4e6ffdg1chcw0s15skj2thgybqfdzk7set9a6peurkdlos9fb230zi5gka45pqsrz509f2xi6h3vxidr7a7zbjb1qmhul1ape3ba6h64rvs9obtoimwbn7rhtn8z0pmz800wz4oxlpahy0n0n9qifaqlfvvcvsep2zp75s3vwcgzj5982cqyb92atijypx32b7kbl6m0tm9xb9gqxiqox6n1ijvozt7k3wnr5ffmc7y63sxb5mrqv2u8sqieu3vrsp1eq34w4zxf8wml75hzol0wolly2zcvd3chlegn05cckok19f9x19xnjtw3dbgzwdeow2e4lbibwgzfbyfd8wu0a28l8w0p2k98qsc2oab0ytwb2ahlaqfh67uaglxaybh3onygsaga6khw00em1lt65wsdh61sf04l1uovm1pjnknluhs350o66b307h0syachtdtqu2qgx9vran0zmj5mg97jrbzr71vxkkmo89diwuf6a1yb7tysl0d9hy8jjomjjkvnnkibskd84cong8ecx7bkpmitm5yi6d7e7ldzyzvon2lhdia188fxmeblkjf2bx3v74dy99yb1xr5ocdevm72w9vix6ly4wrslz1awhkyazlkat0trsvdhxd36nw3mblg60wgazcv605e8lyy8hngr8gdld8y4ymjqf88q2n1a1u9yq8b56fvlmcbyawq1n8xzq8kzivqngz3b2lue9h739gyreoy2l425nl41g1buz4aoadowvrj12bkqs3gmn4c9ogwuwvl842avudxyubshpu5pnlseeztuey4eol9jgjs3ssnblazwd5td3fbxndeevlykqtshtr02hwuzmbpl6iexqo0v0o7q050p01jrsocgpnzxepnyl735pjbyhspavhbeph54hh49mql742nogcndm7lptqahqmmd0v2nvrszry9rt5mdvwugh1bijeb7qywy1c81d5nxy5th2cb945bxluo74zzovytd0ewstzdo21c8ff9772tjmj3wuejf961ugzcc48w1waz8l5o9k60f713f63konnwfbuk41ho3gnpvgq28iib415o7b0ot3p5e08trjy0gytbjtq0cg1ztet08oh5irkawwvwrlqa94qyeov3nxqcz26zqsle2h8njm5pqwvtg2j1uhtl7863isgfxk9po91s8k9t0wyed0mdjrwdk9j55xouw428czzb8fcrsff25vukgghqtnacyzah8ig88pu98frd0t5h4xqrhenmr11ssslunx9z7zu7ft8zdp0qa50d1b0z63zuhuaoro3jxg7zz6ptf4n5euq26pkagqigfqq7arm2gydl39fbmwe1dbzq3vgu269mntrxkqvn7i37txv1k7nc97qqpa43j4gz255qz5ti8ttuteza5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'dryvwiqadkvbb0wxmqtl4hs21geuseqp78t0on9n6qvppt7c6h',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '1lp8o70fplj88g7pqpop',
                channelHash: 'qt4xt69ju8mt81khc3oww0w724eyal1eqd91795x',
                channelParty: '6wxp17gt7fxc36xu1pkfrbjtuo9m15f0k19l5nfw2pb80w2f39dyutclyex2w9p793ot6u5a0se61y9brzg82mk3y2vaeuyl4pjw35g5sbnm2jviibcehu9ye49ggbc7ozxkfz5a0v5a9ul9h34wpt78fn7s6281',
                channelComponent: null,
                channelName: '3dn5ywb31v8p8cvvdxwo00kudkkn9hlg9sgfd98qs2aaudilhoyg7izugs6d9kxs1qjzsrh2bhtp3842vjvlpcylqb4pfvdr61su630oumc4t5ck40z3dkpdb8kijt48ixtt1st4liqelvttked7fx6odfild8tg',
                flowHash: 'cx8kal8t1zd9im24tyet71tildcq0adm4yabvwy1',
                flowParty: 'tu4da8gxhi0w3ja9jb54hiofvq2hh3e43kiign92lffp88xiajgpykg6fzwjmybyh82nqp4su6tq8vaxzdqiwb9h0823ns4phu9s1rqxhdpp593slp39wrben3xs3gsd1j2qh5ry9glunsr7f0eh5t6ozm7azua2',
                flowReceiverParty: 'i0labyzqmjpgwsbuq9h8kf6h90kgcwkjl3thmm1qpxi2sge1zqvkqsq8jk43d4fiwt4nx14r05z88dwhzpcz66yolivs4wv771e8kjrmvdwvxth4di7u6f4kogc92fz38u1p5f3x62bncl70d2nwz6f49rbt0x21',
                flowComponent: 'pbnaj7p2z9if43atd14lmad6z6suvr3hn03sb2c1ivmr89t3f7uh6lgj6stq1qb945emoh8met2b0vlhsugg708ls2rqj4ejtqrvzwomteul9y53uy3x00d66qcxsey64vuh7h3lney1qyq1vw37aytg8i9px4p4',
                flowReceiverComponent: 'vvk0ctdrqyqjgsvn36839acreu7ao5yf7yzt26g6nv3j9my9u9tw6hycz10p5eyhbhhbcnspfk3egppxqtdf9122frj547s296qo4y1bbuufl4ecqk4h9ep0zk2b4wzzs6eqpdd0p91rzudb6viz5rkivck77ktl',
                flowInterfaceName: 'lnnrfgr1dal8thnq2ttoqpceb3lj67upaf1kush1ol28lekwnvxl38w0bqtuwzmdpznl5835d3yig806nj8di2sv565ojqtev8iseeqm9y301a2pfgqbotjsenf4vsclvvwavx8jrvr0kfjxf1vp1sy63k59ris9',
                flowInterfaceNamespace: 'fi7f93i3kpgbytq7xr98xpfjmurjv5ct1epd0jcli4lq09alvfjkslk3bk7i8j2ykdvtxgpu1nunzz9k1wfgjkvdvkols2mfmqe7hbmu3nnvqoo0mhtz6mb8q49pgk2ji7frqic4lllqbcg3ohnxa695g6zr0683',
                version: 'p8rc34rolrg5wacudmg2',
                parameterGroup: 'hl9mfkfqkkdjnd2xc6zhf6d63v8ah3e73u283ztdzvylecl10ahb1j0mp3smbjl4ji3wo8e17px7zxnzq9lhxpl99aoss2mavbzlrgy1loafg2ebznvnmvqsx5xbg0iws7szmsxjr8mougclg4s8f0us3pb7z5fkaesq0zvjubjcoof88yqtz40ow8vorsk7hvbjbx6l50kixhycjugb20urd2tvc6hgl49i2apcqpu52sg33xrt4pscij61xif',
                name: 'ss6urz1uelmz7d0ohrypkod0jl0z8fp7n4lay5hmpid8f88xxph7ym8tbb8nre72yymz9rqjx3r5k1nk9r4j0umzd3vweuw64s9t82y57w4fqecvmy2686t22tlp2jlrr3a00qthzm8oup8z9l5ymcf59xrnxknb5tvmzf3u0kzbtqkrwj6eq9o2dbfxrw168mrk7uwa3qp8cvdn26022uk7i5t1nttcmj403dwfg6ry36ngy1bnehuhei78m68mz4da99wpnszofrxeo4xgmprto4crltmqodxumj7umrsazzv34bdkvm6p7xekqxr1',
                parameterName: 'm25k3tbyww1577cc0421i1obwly1hj70sa6s10xo725z6tdduypn3eye39kqwxtdhxe10rpg7vp3cu88ttnj3kebczjss2rnmdhlp2f52eplh3elvgnc10hidil8emr1kshkej767w63si93bhqggkrj04tlhndv95dtjtonhc92tsl05wr4xnnns3d6gycct3c85kuywhyzcpold0cq8y9uxy1v5uqj3kgm3iem29cm13i4eaksxcl3cfubvgda3lfj8e6t5j5g0kyfl6t1quu6xmq0hy4vsaenoifd15apko7tlrit16fgp2ipxzf2',
                parameterValue: 'du8z6etkr55ypdd4et6oisyl9t0fdug1vcc30efkybhuj325fdsk6ef83mbll4dmerbp4glo2eyzw3jtnbuvcnjnq77kmezv7tfd8ugct3v9y4tp5uuas97fc45eidodb6v9qflz4r2mydvgo8b1hjpdjn5hlo2zudl7roauvqml2oj89v77go3r99vaw2wzs7r8i534ivud2sl1uhynakonp797zgenzac5zkpg6k8nxjhqht5bo7fgl6y4jiwxkc1qeeht28ao4j1e6lp0rhfi30urlomxhnjxg2iuqiq890731h7f6wod3385cvw7wvv1int4dpiw8iqpd4b8ca47bm5yetukrg6jbgiywyd2c2hggz5pzw8ohpwn1vw9ys1lrpbcj4fnonclhv0n22uurwfr7s1whguodlbgke55g3ot86mqvsvmgqbvbldyewbjcn4smoo0co9nmea363vnlxwwlh8pzw4mwa9l0fnxhq0mvprf87od1egcj3aof02zy8hx7yhh9crh9shj3mt3pks2h8i0h1vti3o136e1pm3cf0rux88415symfvmtseogimgyu4kwkabg6bbwuwo9n0x5pxvaaperur79cfldi7pu3xuy0lkthbhe3qisgfn9y4is2ssjmhbieawef3nhssns2sum54kjfbozblqxfp97xe3ceggopand7lk8gjanevwshoh4zs3hyj7s2vtebphajfqlk63jgn6f3eqy80ubymbxyrdqh5ulhbe20gzt5me8rw9naxihwmtxza5xnpkppcw3k7gnibk9o9a05vkwj59hynjb7yuzw48gad1megwvqm35afrberys5fkl4ksf08ys7j58qpu665kbd9dh22j3gbwmygrclkjpsiyqlmmz95350unllcwim24exmmkl7n96i3atrkt1un4u2vh0moapwk8k544cqocdyd8od39nwl1whnb8c5vk8in43ype0gkwsd9guozcqsv2830auwg7s9dt6rtqu7ksl9r9qyzlrm7f0gj9plfp931u7mvcfyodjmt99kzr836ve5roepop4k6mpqqtrrhyy2ybie6ejd7io6f8w60p3sc5who0fjrrglxjvbkz847wrkyrj4jbs4ipemg2prrvf8wfcm72solt1qaiyumynjp9ay4wd6h58prr9y05sq63xhezoxcvipjzxm7jboo7xbgfdc90lkd584j58k2b1jqzccok3qnpryw73kxh1zdc0z3utgeisi9mdbg55bfwgcr4b5l7cck5fzp06t496r9xgs1a8ie9yoq3ear342fr5cm3z7ixjjx6p7rfb0kh3dsz42w4r8oa5tqx9qpq8hr8enio875y1gwajgk5bdgv4hhcpa09jvzjt9siqo53k7q2trapvjee98o8d1kqh58pr5o4no0tngugxyf1hevmmgvfvr9tmw2getf9j8tfxixojtq3avc87neh6zzei59gk6rt36gtlu02tdo6v47joo2nguanhgndsqgatb3z38dj26luca71yy43rqjyp9wq3hnm94dvsqaqlkh1er0gevgwx5kgw6e1aadqz4c44o1dqgx481yxhnrlfp2yhhv4fn8bt3i6vjx0b93yfc3j2mn1zkqrmst9iqmf3xbd8znhijiwj5wtielmzmogvoxzd4kk4z3p5yzog07fw3xitnt2gm5uqw9gbys6j89vlho3s8be6zhf72nma37xzqmlu3fvppmsbf5bw3nt5k494mr48wt1z5i2qgd4utts8x1aimjdhsmx8hem9rlxnkenpo7tl8f0mr74y66nulaazphs6cbtjz56so7jdezm4rrgejkogd22wbpov3f37lyodnzpft8qebjuxnt544whnzg696scbqu61hr39w1looxf7h5i4mkuhf62xklhphe13d3kkq95ecw4hr4r3tmpc93nl4zs4ped7gahem9rk67wntiuxrpyazkvzc09fn7u4ptb0scohtf79rcw7f3bcbezvs7odqxgeeynzm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'ts42ttz4ikfm5rxc7mtz7gs97b0a6e9a359ky6thtl88mkw5bv',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'it97j4n7svoozrkfth0e',
                channelHash: 'i63kqt4x44xhtn9leepgqorzmixxmruik5s0wy6j',
                channelParty: 'qg6bios0bzljrn600a47hi8n4j6tz5gg1f4ux727i8kjxxvykjvgboqpcf0ug1obpwkkn55b24kj0kj5qnr15wlm49id9c48btefoad0f7bi8vdt4qlob5amso0recp34ys8qc29tonp1q2ptvm733uxk966nd0f',
                
                channelName: 'sdjw5xz8mvry1vo7w2jlfllvlv1z0yi3r6k57l59v4hp0wv9bpr1864j6zh2yitdpoul4mqipnlhbtuva3596y7lrd1yjln0uzp25ibbjwo087ipiqedewsr1t6ymeoo4jbhttgl0uh4up7n7dn2s14t87rq54ax',
                flowHash: 'ssvobwhg512egmsleqyvwqqz5dxwhovpuez8xn54',
                flowParty: '46wdqf3rahq4b3si2nwru71pm5c3gb2m6lk58mwg12yxkdr0rd57zp1xnc8gk7ivdga1cghpj6yzhdi6nvbh4pta5quo4p096hjzksl7u4f0v40r4r6nsvp6dyw3h4ib45vd40d6aqhh9phvy8iq6g3xen1ht2p9',
                flowReceiverParty: 'do6ewnm8y8rr150oesoexknqle93s81lz9bfk0oap7lgfh1v0ez4hl5rro5kg718hitcgh4fu4aqgix0ko4bh5gbr4h9in1b8z40bt728mifdvru2wgzg3z0slmcy74awzvl53whkhdm3z01bmim0cwjsb3x7m45',
                flowComponent: 'uzj8gw34cw8f7wpd7qho06h58aacu6i0hx60b9ibjfjmyh8yhtm1r5zedl95vpvp0wsskhkp2d1wzrkt3bzsw4rvah5mu8ygd7cpjo3dd19q389dgfepbooxv5tmx58qbcdmoffsxbyweejngjp22kxd6nhkujiv',
                flowReceiverComponent: 'rawwm4vk2n3da61vuymyagy1g08fa6ot9vr6kavi7eeg4zkzqrdyri4krrdqy8bfkr9i08zualtz4ie0cn0jnqq2zwri6auj3ur18xaso29p0lr732ujrzztdlgxh1g3bw57r6tjxhcxg87d7wrnnpymayxgw3rq',
                flowInterfaceName: 'kozkcpc7eyj38hlbkm10oeahkwcsaiqcjeho45b9metam19d2ou6x0le033abxr55aai8dojtsnupasnb9gb93izullu1amdu9lbcsjt8s3jhuzsc4ijemgnabed1hyq15ep4sycw8gr33pv5qcjdhjwijli7hpv',
                flowInterfaceNamespace: 'xi99abm3z7ly1ft7jt5m7nrg2mvniuwiru8lkhcm057jz3cb3yaog0kusa9mv6f9iyxujklvywxccrkqrhgfdxr8gewowkhdic2co9aytexcr1f4znglo2ly2kor56fpyvfitmsbu2bhegh7zbkx13gudof08foi',
                version: 'lh0elsto4yc6z7ukj9j8',
                parameterGroup: '879e845pwkwm8q026fy0bkq6d4pgbwmil5lsjyfluocm36phqxu2trn1e1yoati8fkhy6gqbezgbu8g2e32i5opwvly33oe8heeukfxcgf4c2ev0ytcmvj14rkpiciosrvpli3eah9jyh6dvehjtexphd97xz67ewcfauj96ijrbqbpw09im4z8a6npcftl3ofw4h2vg7uaqnarrpqackbh2yi0qkwhtegmj9vxbgkck6efv6lqx0rvosh4htfh',
                name: '1p83p0izcgxuxaexnvclsfog3lz5lz608eho1u0eec56dklp3mw7dkk91ywvxlm310f4yc2y368h1mbw46e6j00x6ruosg93acuh87xt47t7sovlej3og2vvbvxb6vb8ey1d9wroueqhgk6vog3xs95z7x8po3recu9b16eu6c8ypoiw2j0dx16ckfohqyc2h7maph4oepfgerliq2n1qmdst6b8xuy4yrdz395yoh42gn3ov26l402m6ia8st4qgxx9iu1pkiap7bdgy28pjd078yz9gptyipzzft5xdfpmmuvfnkfdrfhv1h9utbe3',
                parameterName: 'wb5xivbynn84lz985ehl788wyadegevu3wmu1m765hvswfqh94prikacks7p9x3mq6suawn7jvfqtrsg0vf65d01uf7p3zx4s1lbupvk33f0qcl4epta4ilenqppu1cpke519j21e5fpnqbda56u8a6wktpa2i34ytc4y7pmyhhujfer5st3u22ut360zcf0rbjip5yqmyc2reqt59x0g1jjiyf30n5yinbhp28eazuof9h5zwi7vvkrmwy1vatjfjj33p7h9f0xbkcm1r0653ot6fap01fig89scmkzgyg201y7mif2j0ut75xzrnwj',
                parameterValue: 'fegyin6dcqi4cli9eumyuwu5bmn5q4tmcrg4dljd0kpl7wrzokxjhlybnajjvaq8uws61tffu072f8llui8nyk7nzdbbrmvfm0cnnony9ij99bjzzphhzqnk3e459lf11qoeuimy0c15t4d13ogndme9uyykk8ncsb0k68w2vcfyq987cgpcgg1gqaugdzn24i2eaxotxu4l5n98unky1gubq32weg6i2wm8ofr423kpg8waivxfh2cc1qon47px4397c6rpolnjkbrljwfx1ifwg1cquj9evnbpoqspfz9lynmmqabl3bb6qllxm6ffvsesh0fmhyyt3cx9a03mpnaosywbx6fmyxwc2our3ktsfv9o2on7jxxs1cf5km9tx3gb0b8es0dqafzvjcwbf97lzxqtyz3wlph4x1g3mosixpgtappam851j2ycvfinbmj0ynjwoaxf32ppvmxpl3qjp6yk8trcotr6qj9df3tf74bw7c3j777388i4suqfa3q8glocz1y4v4qi23wm8k6hq8iog63eaytc6drzztv5u0cxjqugudjlz8fgcjlwa44od4y30ompgt73byc6t6jinc1o2hyyf3mv3jfvimrah23j10l2bxnoh73tz1xsmjya40uhex09xp107utveb8bqqm3ya4f12i7k3sd70o777ryldzemin3o71h2obecivv2glbffjhzw5jpdvd7whtan6t43ms3x5tfs72gzke7blwc7bj387ll1icakhy3ptstqtykppaxfib4euk2qhigvpzepddrju2kaqx9ja07givib8xu5nswhae2q39t7axs1geodx8z3t47ctd5lzmmcdcqzlw36yx0uz2zzahfppg3o7vv2uc1pb0aac31n8o7k3svf7vrszc58mtubh06eg4u5ii2agnvrz0slxe58ittg6pvwg4jzigffv39r1g53bxiz7mhxloo7l3sj7ek8izfh9vbxxaiggre5l3x485gzk3ss04yqkpd9zj6o67ul4dr10e2hf8godn3j14lhz372gk5slawn5keyewgeppxdllx95qs9kv9uejmryx1a8sp1of3jfefmm1dlfhwgfjqilrj2xl03y1pbcitm43v354hvptnf5cm3ialmuix9kzbykjixufwhrpr2hhw3ta5vsmgjmcwrvevuxp6stoknl6hokegjgi6hp7p37gg2eeqvbdyzgrlvwupg7qh4tr6txb7f8w8ldshfk9qg3lg3da8ntj64bk97xapww91ehhnlpwd3uyfdcpk2nav5tlqrpe3fpzcff9ed9mnyxtwbibvbwsnw4ex9utliqrpbtru37ftrxw0o8wp4j5o6f5ydbgi0vxfh6k71rjp07xqniaejiyd9biorlyw8qnvqdfenh20tj51qqnl3tl84oldew8oycah92jjait77dmidyfjp0612zy7cjb39dp5yarg4l7s327o8be6opjq3y4gvmgygz6n7qo6qrz91gdgqn79dzl5vf69po12r8lx2p04y1gql9dngamgp8a90rwayjsmqk5na00xy1o0s9pd715itt3cm6s0rm2wudfs4z52y1z8k7iwv2efdfcmtvbzgjfgptkk0bv9erlf46hbqffi1oz2ethr1o75sf2btc3tehfozlemuyo1oe4q9xm9h319d3i2qyn3e62gxlcrfaf9stf70rl1nfgpqwf3dn0yhg7pfhcnqvpu1qmng4m66hu1l7yzyzg2ecz3dcte2qq9rovwocmok986p6e4tgjn4zfmltl5f0kv4s19lk6krwzb5uevj1qvjkeq8hpqw5c6pudblb69rzlzlxdj7l9znq6l2a6ibdj6uexe0cpkmjjhy2tb1kdcpac903yl07o6ee6dw7vyawtqkfrc83jz5npp8t6gp21rrxj34znf3re7xmjf4ly2qasdbj0h1nq0rkfhzmbko272nsyrvc87r42vp2d6tveqjxw33xl6n089ynnosel382lgbod5x1cktckpzygh3oq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: '9u340u7lj1z2hnk3j373i6an91a6565hptixjfpt10aff5fv0l',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '9k5csw6ncljjd6dfkzcy',
                channelHash: 'tv6mco76jwg0aatuiinrwe82aoz00znh6d82pshk',
                channelParty: 'c124rpyqreew32o65hxe8fu43apyu68u390w85zu9wodzj0mdt3bog426dzvjjmdhgnre2grf1w157xksm093wy1gbbwfvt3429ei84myuciwnes5xiaobhdi6vfto2bg6ujwk40vibydg09npt2s07q0ldg7a2k',
                channelComponent: '6u34uegdcvkjvkumxani93y2f3li0z9ab1uepibopmyb353hxia5zxdbdhk98fjakmisaz38z382651paordqbjlltz656x5xed904wgj1cddh7ejyyupzovjwxf12xgfkgl3cpcnazb3h3e94gcn3fwjktex7ck',
                channelName: null,
                flowHash: 'ka8umf0kxkgmn41hexdb8qv9h6vo3w7q8er9eobu',
                flowParty: 'it68je292rd8fupkm5u51fzrmhbimvk5ft7rreky6nrijx47kn2blw3c917648zfuo7zdeusn7dah8hunb3m2cn5h9bt2sq9zcdnou7vx2cwoqgjf5y6gyalp8arupso11ef5kzoj9u8qx9b0bbe0syf62o3kt9e',
                flowReceiverParty: '0o89oz9urhua9rcj06tdno4cerpfv0y4wglgiwsqod8ubs5lg28yp2c7l1r4sdwdhay449eft2msv7tduwwf90ifnstisyhy21duh8usrmzqbs3x3v3zc00xo71ohg97wl9hcy0szlgkfxsu7k8u91e76xhk4rve',
                flowComponent: 'ub8hjambb0skklvoethk4k6y9io1cj5rlp4i79f9qemkm4sf3g5f4jqj5cxoehfcd3aka7tntnziooc73fnmref1090b2wyv7bjtmhjjl75v7zcmskg684lcl5vp5onpjuuxko8ap84oi9kxikpvsknxs4memiue',
                flowReceiverComponent: 'lsyeqlcm2jhh8eq9ta4qpilhkdw97jvw8v8x8gfc283kdko6wk5ilsczbkgiyg8ninnyw5wec8air4n52sl9c37xquo66hvzpy2rrhbgt5jzbputb7b5q8jhssak50k50evska78x4kxp55pewh0zaiiw76g3jc7',
                flowInterfaceName: 'ka9y9aavgatrga0s7t75zdiia42yev1uwjlwicdovhddf1o12wtolu8j5hi297evzaphjagf07535yh3xhq498b06xxbs3na8lob9234g2xi93ssrnaypsuiapneb7gcz2oms1u107hxc4rdmq7tyg0fnptsy90i',
                flowInterfaceNamespace: 'w2kpdz3ribef691e245kg4nuc39c9b3wlto5aqfjei6x5i1qlvaimto1d4x8otl4xun7p1z0nxogcklekboowxjv2rlsg0gxjocd0x65rr730hhsz43v8mkhh6jajgadzgd6vif0e60wwmd6xd97r72kdzhehbfq',
                version: 'z3srl9tc2fi3gmgk9fre',
                parameterGroup: 'qnr4p6svb6171lgjxqwqql87jdcgfwf49mpapgxiia8rvozgfwi69l7ln0zewf7bf7fvc7mkg6ebrgltr7pemc3oggq3aga9x185z7z8vuktf79szhlt3u76br06wdam901ndcaghsgsci5eclrbspfwb5keq9evwecq079gyhpszraag18mxlunlf31ad2mkib3pq9vwv2r0y4wxpznp5gf8qnjbeixwfj49gojke2s07uduw15te951tb9jux',
                name: '3mwhvbuswk9eja6fc5p4t87xgwiop2cuepluw0l2klk3k6r8rjf7kdzfh5lhvro5fw2jmvg86hnt7kgt92bcuadwpj7kkc8087ave5826fdk91qk35orq72lz830pbx2ftvth28966ybryw1egh7h2l30v1goni277zjcdsdnedtgpv4vrilpmjwmurgytszsfkc27l549l1jh43xgaqmfd4pnlirb0ic90291zlfwu5q361ffp5jpgtrqpljwmaq4ivj5ijprcbtryaezai01cf0wft9d013uxwkgkect2n80ktl98fusv1jqyvqttm',
                parameterName: 'nrysmbup3mzvg1hhnski5i1taku1z0ihomapfxy4zoz5n95hzt94qtdargrjilo813mr5lhqq0devkd2c4v58lnydxol9izgcnrj39pn3i819euljlz21xee9fefqw35a1zvwsn8r4hh2a4syfsxsr06itlgcch2xqr5eugh5fmec6tgtuw2vc8bepfk6ci9gfao8830qh10uv9z64dzy9kipjnp838ai28ch7vbgqddotmifzi1n90tumjfgj8soqshzux2t0tj2xbvpqxpjyokx9on7r7qciof4vy88790y33yptfhhd1m3qehug54',
                parameterValue: '22rb277q1486nj69wu90d8p8u878zv3rtb0uofh1ah2p6lvv6kgsugd8fdlhxjt8mq67b9v26j6knwxc2n9bkhxwjijpimupruu8eemggfs3t4s3clb0s003ew5vm2ng3wvxfe7qbrtaao2939qqgcleryjrixvlhntip7ccqk7x45benognoojax5hykfk79lq9fqfnvx39vwbuydjd0o4oorjtmcu8dcszlgsctml7tafc7w47t69mvt7rqdx5wgawtg8r63ayvhjze29wu7lur443y03n0orjg27nf992t14g4lp3ok53n8malv0388qnj1e9ooxfde54isbs3q9lbrwqxw81ypggc90o0eul6f8wbpu274o9rf8jo8jjcax9x0tlyv18nnd7v9nidp0k58adivn0kspih59g0z8e9n38ppylxm3tiqih91h7itotsnzknajk4r799l481fo1xeaenwl61pha9id8s36atj6wwvsgjkyeg62654dyrrphuq06xq05pra7hn8knfmohp17370eavrauhdby93gqwglp5j6q3n8tbxe6r68qh19px1erw4zm3al07h17180il1loc12lndemmkr9bg7tw2txvl1vk1raq7be2gtwgilbqodp27138hgfdjl9vnvo9o105rnpljx0m7kysf4uotr90s1e1w9cftr13h8vdqeetdqhm6o58wl07zed7frvq56y5bup0skjmpewogzzasaph390ac85rjg91bu1reqj4jtrln04y9k22dk1nzufc2qil3uppmqj4g1djqm2gvev663em750ercntzs4aru1l3qmg0r6qmi66a8wf5bx0amybgyr9p55dpzptz5p5sluez5liopazxg1wy310v3jr5s32m5jf9y8fwsbzcevcoauh6dzo674awzg0vcou8cty7xrq7rgbmjg0bhw75jg7acarq81427wme6sts6zzl7xtt04kg333clq5f6gklaui5s54cr2tk67myt20odkegbxaf5xsrnqx5apwly4n072x1d2szlj701kin03sqn64ob7p403njir5i8gqcjttmu7b75vlgm569mwsyq9bwkvl2hsv9fv3os532e9eaq7ylk6v5mjyf62m5u71fan7isrgit07cfsex3nll4c0r6we9qwjt7c7017hl3s96847p3t15lhmaj3g88f92gz8rd2m8kmf4fbouid31zmvi0uw0gujdiji4flvgkslgptdlygjea3jj4uz2lw6c4ewhf30vr5e1vufqmzr9z04wzqqpdaewega2srlye5hojyu61y61d28sgpy1ij7psg2rb88z4d8htsigusgpw5bttvpwr8b9gwzaogwe895yt6l1ywbg4l2c41nkysh926gw8mbye78blt86zzsee8i6j9x3n1aw581rpkh78m2aygn6flusg71x9wzfbhg5ixv8lp5ua44a4q0fnmfwbhdhw2lplj444cd2qtkn8xvs54mxhbi24c3a6bgcccak7inb35b3nevu3qyhhkncwk11334eog8hf9iz5d27bldkp4ylh5a82tntbizvsllpt8ltupisc9cnnvsgjcr44bxxu3gr46tfjqyxe6n0m9z2qucr9omtga408gqf5347ttj1a3qv84rbxzd5gizmhzocig741ws16kfq0czles8mqgpxwfn0zeur5aqe6jc9vjqmbkkh1uhdgqp90qkgsqacghu9x6gxqnz6o4szb42jj5r4lgr47f2ukgu4assl5bxk5t9asmd0bpusumgadll7x7pl245p20e6qoecxb6ll69b13et2guh7mnt9ovzlkvff4q1ks0non91w0rtwlog7b8dgq2aj880ta4y310t4f0hs5at5ya42rzepwhf254qrnjohvigwyvhk4ikr2xart1qz2ieqq3c03v0v3735ng965zq9ne7n8wvu2ap3kywy9cjlvcnazmqeavhyupnvhls56mkkeijez1eat43w6fwxlarhmp6i39pe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: '3jupnkkr85rvgk6u4kobhy0g0ccyfkm6vj4xohs6l9iv9hn2qd',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'eeno26uesvyksrcqtxra',
                channelHash: 'oxwnvvgsgh300os0ijryc2ts29i6tigsf6wh69w5',
                channelParty: '4prpaplaykh8c5ljo0kjd6sw6jjbdhddrgf64rp39gj1hzm5cn8u3t4nw9c0mvq6x66y4wnrp4udmyxwx4yey2ivz48axbqwwd4xjvzdhzno79c8t8a30unwn3a9710muqaibc4ejysdl4537fcrqm6ywam7y3nj',
                channelComponent: '70bju3zvyfplee50wkjhtt9hq6u5yhvjetkkheq6fqwozot1q6wja0k7v72ya1qxv9glssy6zt9ybjwr4dvncruetivgt72f5b2lut3qb9qec31sqk4xu8bj15sszzeho3bq9qofyedmsb6zv6jtxent5my7kphy',
                
                flowHash: 'fi95t4woigz02b0amj5elwwiwm08h54cwo4cji2a',
                flowParty: 'wnrdbec38bcl7qh7jk7f663xgavh5g9yskja96ogjspc78gl5djfa4g5fcvxwpk84nptg0ccs8c03d0o8u0w4q00ug8hx3u8od1dldk0to6n9bey2bx52k6ofdmzezrr6ndn5kclwzml7jh0lu0ewwsndutvy73l',
                flowReceiverParty: '0ttnvvhobdjtecved24bo6gkjtfxhr0v4vl2dcuc4bvy6md6r7olfz4yhxdiuoypdukppxzfeiuymja500i3qrl73gdjd6ooqjlo3bhoi330x8mmt3pimnts5dtkeoaco2xh4q59deiisz3fzgrajqxkle3ey2ty',
                flowComponent: 'ifbh6cp1f5333crq3ip2ythpgqh2e5oy6aixhxi3jg6hwijlqkhju3chf001s1jej66gxsme91we6k0iynsol67ufp9su2myidvjheit9kuavsz1z247za3uo9oldh1x7zuphx7m8bjvs61rlgaj7qf8tia32dx1',
                flowReceiverComponent: 'fykrdam2b0rttpse3ih9jz8idxx7qyaqub4133f356f9q8abf3u70xqq5bzfturevp6fmlfrfqo71eha76gr5qrmuhxign0n6iwr1lvr7tk4v8ffnd5fwqo1uzfquwewaqndmxnda03lc8col9vsmoa53cwncpmn',
                flowInterfaceName: 'ujqecoh7eyjcylviqa7iib943xcytmw49zk8nm22f6xpw862netmpk9pca91zqqtnnepf3tp17aoib6okww26koqp0oep92u8dh8ar5p109d4wgs9e1tvaqy0n0jehlbpk3p5xaxjgf710wqsdbbaohhgw4inf7g',
                flowInterfaceNamespace: 'vbi9dxb936vw5yg1c8y2odasejp8ztchgm6i0uvjy1jumsy67fgd2p9g4nuwoakngnnzfkzz5s7ur6wgdjp189p8xbw1nlft9lpmb1xvegff1utp9op9t7istip4b3zh7vga6ahjzqll1h48g1voz01eh8gc2i64',
                version: 'olf85wy6zvhq6onkw753',
                parameterGroup: 'l31r64m8192mngiiwwq9je902x47u509r1wx9nnxjs3692z435ibbjnmyaf8w4bek4ikht67y8iw6uk74yvk5d4aweu19is1mmthe7mq22bokz2k8lou4jty7wxl2lpdllbm4l8tdcitfouzw9xv36k9oihbxndz1r3qq7hawdl172iafbc8y3096qxuu1m1dhu3ulovp08iua2uhzl8k2ui53kcc9t73o1v62f5mxruzolkqqd4pcl8emu4a51',
                name: 'd8g7smf5b2yt914odr4a0hnc85y6x4cnmasdmekzl4ldd6culjdqaau8ort6izsov13i4iep97jadp9lwomowwsz0hlecw9qlz9d3y6v00p3de21j1vi6u7z7meo29g1q6p8ptm6tuj04fzch10gk39a143ujw0fr97nkg866e9qpgq8g3oou8mz0eripk5bzxv0mr8ebkic7qnote9tvp33blle1qwcukr5o3j6t3r1qhaog9s3w817fotke2w07eaer8xpxtlqjj4rg1g3mucb1jkebrq4d7qigda0kzx4z0p3aih9gudqucykfa6c',
                parameterName: '8ahe37mg5y6bhsnbr2xre2qablugiatdvvpzxn608nn8584f89oil25id7019l29jwo5jxxpa8nu6w3u6ehbbcd8avgwnum37um544niahd5ijy75hxpb1qbno0wse2h56rxed47bukfjgzwmy9g1acae0lpkrftxmj2hnrs92o5yu28tohpxvuf6ox29kfjm9f953nl400kkrvive3wt1sksn0mafoep7ql8mq14buasaqvasq535gqxcaga8zy205g39lhtv08nd1biqd9whcn83kmvmgfhu1j3ep84o4llxgfuzv71t4f38i2gqtl',
                parameterValue: 'm2y1oi3zyp63lu2f3zqtg0xzfgr3hzp0cpnz5j605lgrd8gtg2c9dtkt3tc88mim25pt6ldx70z1yufji6a49vui7j3e9jfb6th94ojetkmfxnz42ynrrlwhl2pcp9vpwz27czu5hx1agolikxqihf8j04ymrgffy765e3f8fdf3foaqamdkq51xetljg4zyr7j3brh1v1gpzu3x2zv93aveg1c9xg22bahy5thavc3k6kragd923epwa6kjzlct3foqssl6pgznrv3z0mpmhw28nm06n7m45emv5cfq2lzxf57y5wzuglqoqndclwgllfeg665lcoelbmv3e53mq3qfv9pvujjhs6mowtqg9dtfxgi2a08fkh8pi6a46ki02bydb0ie5db76ivpnrqmuzvp089wxf0l6bzrdfex8f511gzll1b8cc15nnoty8fq3xidw37w50ncip8ppoghfsv0wny6uph9azqoo4hf8cved7vtul171h7huw8mwjyy2z46a8emup2jzs8mo0xpco6dlo5wotrw68fsjhwyr2futp30eodetglesbuy94g6glcdfl0g957hpn9bxxiq7opaxah832gbrkxqyykhhb9tmna0ndd631mo8i2vhh2li3zqvti6vfsnud4v0duui6tkr4ayi13n5oooja6bpal3otac1rz4yg2tj3b579oaooc3tl4xqh0un4o4qalnbvx7u6zrd3rm6m97zwpdpqocvkluh3ql0b1qk7q6ctjpmz7vxytf3751d4dht0dg5yg2iir2t03w8q3aj05m2hwcfmnhsw2dx5dbr34fwwowqv49139gs8ghif08jvea6vh4zuqq6szq89patc2roye26ojrzie8y9zzs6806kriynp8yxi1p3wn5z1biaumcnqda422i71p49j5eaizgfl40yvoi7rx2uffmfgu1c6jvs76mo066gpjf8gv6wtjgw7x7l1vo35hhppblkd5j92wyhp14gz8obxa6o3pbhr4ostij6qtmi6ih5cuu6lwu67e5z15w5h3poh72ftpnhf3dc3owt670bbnpj1wxuhinqg3t2vk8ui7089h71lef1hxm3epsobatuzwc5f6anaz33oafsc9usqjlrw6zvmo5f5wlc97u37z8685qqg52zp0vvwcdwshjill2v0uwaoi31bdtlnd6ohc57uui5rgdp411lokafj0diujrfawcsj0mzaujc5i04l71ybtbdsloosoqh9rammjafr7u1753kce1iiafasn3uxkmtwy9tawaqtza5zy042izmvtw7qpaj1nujiw4z8ukwwu55xs0cazduypsq3cz8pyeqvbvmn04qfjf60lk8g14sm616dm3vv0iuwit1sn9u5q8d6xro1tn558uy8gq4hm0te192xpdk925slgbx5hl0p8oeudyasunzq11b5i9fxy2dk06lzon08hs9lckyshpa6w934n359hv3ycbq4lz2fhd7sieebhbyzjmff3kxgvqqf96nvl71b0aoprq5bvzqday9fa3axkw89e5squp8z9krl3w91tm4u2j65v4kpl4kk5a7ah8zhqs7xy98oe54wdzcar5fummx96v7lkxspvp2naxbqunfvnbqaabmx20ds1psgf7e7dqy540qqms3t2l5bvc59ti4s736czaa4c5w0ff493po892yvk5sap1zeiq00xi7v1npd2hmbcplwbybpcnjd6rg1vq7aeuh17t9al3318a0za9b9bhvhv78aeo2y3hryxm4b1tfa1xo6luqwhgw2pw5d2psryh6afypgoesntq5w3mzg2fx7ltlwfj4c0l75dpc122oj6v1z2k63lukbc5z1i2nq34ivuj6rxo2akat7sq5vsj840rbnc28l8d6m5174tu1o649aoqydsrzdmk1lt31croj496bxzkiizuviw248iwivar5zfngw41ekxu4myz1oolgf6tkod8m94lbzqm5bxt1kp86barheitexdke8ymt95vg9x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'n56rzoxww609u0ibye7rzufg1qhugjguvulrmvrkucv9cxf4p2',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'x71nmuj5hnjl0l7s3n8d',
                channelHash: 'a1on3286t3cxjchlyi5o7m0nrxrw29v858q2p7ft',
                channelParty: '89m8iexz3gd7zglmnu0i6en88ald825lu052rx3mnialle02ksd6khr26veovc88hvxlbogk1ua5sero8xs8ietheb96f62ubq1jbht5ykxinweerhr2cdkmnealbpl0x1f419yixcjscl1e06njjaudcwjgf8x1',
                channelComponent: 'c0i2q2nx812cq1b9xq0cpb5xcw59ke77azm02hr9q07roi6fgxndnkl1exo3xq717j99renjhbuwhcmhp08xbl2dgflsfe2wbbcqgtm4ljc0jj6kdg2wdmk3yqzos6okptlpv5ykho3p6kwcqdxux43jpny4ppso',
                channelName: 'j2kw9zikqcptm4em89dn133rafhcx0388iktfzlldkonbm20420gm3vlokt4l9dx6aedzsfqllfahg2t0det6gwdqbtbniiuzotvigfz6hncasn9hmdkk5ovvzagzg1itdw86y8k5ufu10gr18z5iks9wpbtvoss',
                flowHash: '5n3iobuy5cgottokduhclpky8e4kh40t0s2y4txm',
                flowParty: 'w86javjwckui79nh7nhqtvwm9av4m5xbu80i1721p4pk2l1vin450db37ha7q752x10qh98yf0o0fx50pcah690mxexbtom5otkdxlwl8xi3oko3dgwv5cax57zcob0k0ri19x3hukhd9gp2yd7810sbpbzoo7sh',
                flowReceiverParty: 'my35nprs1rmnyysiu0i917ajvahf0g7mf77pyvhasbe6cpe2pd6fr40vip4nml1fktkco6ayiuajjri9kqb37h2n7t1lbm2pvekdvq3ms2vxrwlzp5z6cce3mqrvzqxbmn15uq84ioxccfree3g600kjsntl9blf',
                flowComponent: 'mxc61v56ahbvw1sma3w8snmebsbs2ngy8binimnr3hz86rdtxtiwr5dvni8qhf64kmmap20v2xrbuqc9sby2gfykz5twnuus4tfv2m18uh0plcrywumnb2tk4boi9sqkor92d3r6ykrqupkq0782eau1kdg314yv',
                flowReceiverComponent: '65uec55sza3yoje8czboq3nt6e7t3f2opcsvlz4d9hfs1jhgv4inoqsy5qhojku7843asp6x0gsdr8h0tmd462jcfgaewfoh0fivp03rv1gd3hn1n2hkhmr3iozawx9h6hpxgfo2ruzawc1wbnz82kzt9w2rbz31',
                flowInterfaceName: 'y7aifoj2ywa267nlvp7kojqxhckqb8wngcc2pge3omai9rqplnmqjt46wb10lra2wd74mbm59140j2rf2w66u3a32op837zsc98p5dlq0mmuz8ger561t1uxcnb3305alure2u24dlo6yzn7849c1jau6qztcc8h',
                flowInterfaceNamespace: '3h53a6sm0h8d79mm6mdjyr0a75y7v7ux0cybz3stjrza2xilm4ocslwn67b3oulqf1n725zrfcyezwecir9b4v92e50rh81et0gg8npb29kg137kbngjxtvx9w9llzi132uoz6bqjdds2vgda4x5s0wl0hiishzb',
                version: null,
                parameterGroup: '9osbw6znmi3h0ddvb56hq1yrrkqeijsidrjm3p7jmfbjzqqktc3931t77lhexv2va6s6jtbaabr149bdf9urj5hig8a0vru9mwhig9h3mkojg82sg7rhar3q7k8lvi9uv4hdm4mp8x4akcxzk11mkvezly4zqrmdkpxemzbee86doo7fsa7tcwx7mlv8xf4t5kfe9a94br925luks6dfceblinetmr8omnivxeas1a4x70z84lj0vb08hwubtps',
                name: '5vtwo744zlhi3bcjjkfm9nakq5cxytzlncstvrw1sbifbuhi088ykrwj4y6a1njlj2v4dc1bin980jcj2nbioswbt9jpynqqy3ffjgef7fbly0xgdh0hyg8kz34aynagcy7snbnsztcxhidek8kbyrlqwzbs4yt08nxmhuuziydgs6prbg9xqi5nz681ypq5ov5sgy9f4yv55si71w2qzibmnpm8yoi72y35wzsxdbgbts2dj8aethltitlze6h6ggfrazvgkcvo59bj158rhtm7zx6r4v8ltt1q7ue6tuc542rgrma9w793ocpe7jvx',
                parameterName: 'hg65xt8df6i4i44s9zyh2o2o41cgpkhu8lcjtrl346jgq99ghl56b5zrxwht202jqmqbf2mu2z7qphd2qnebvtmzbzxxg74tp3brs78hfaevset2luyrecba62bnztxnqeicykunsbiiokalkpl3m6kjmlqw9p7k3i8u0gbf2bgrw9h3rpv0sna2y0noagc0irpn17r7huvsqbpmolnrp5fte8rhutkaze50d1653miydvzbr5uyql3lk55jsstou7uaaw6n7gsnh6wmva4t00w013ectkrhshow7jhju3xqkdm7579ke5gdfxgm8mqe',
                parameterValue: 'zggcwiykok8ebcm9ljtv0dwr7co6cwtoandwt775teymp5nvsu1du92155zp7w7l6rw45eut7r6cm8g04ykqghej3313qy66bpzv0kq1f0gvi62issotj3jskaxn1eybi8adbdzz862yjcfa43oh0p9byau9alyejv6dyjp9yntv1gyfqn58jtqkc657a3c82vsws6y0qthn01o51a0qveh0yv1j5xbz3az910z24h0x224yqfib4itcseteropnplnq5fu0wfc4w4sd33i7aozccgk0gafezkxzu7aj8d0rnjdepgm3ndr9yzb0d5zqf204649qryarqpqrzuy0a8chifp2ndouo8td8votb8ggvhu7wx1o9dm9u9ianveil5xs1e0nzyqizjrsf493smx84xri6qrfgz2xbl0ckfzbkm9t88f7m5yi15h32b3swzfrtlksyv95gyud13arhc5a875trlqcl6g3sqmim59568cjbsldbqxoz72hicts5db7xybg421mfd92imwjd10txsw8vckch8tsxhpzl9ub7sj0zm7wbiy8oz1pca3gkp9yd7bncg3hnccte0hyunuwsa4d4gd6cku38xi6g249no3woizy1snslpi88j0b0o51scjgj9wf8xo627km9l5xoztbpeikgbvn5vduhd25nai93fvl1eh960iy1v27xrb5qb9c44j3osv4i3utjv9zrhbyjss1ct9bo48gtmpqk5g3qs77aq6wzjhttc5s8sxur1fanfnvhi795q3xd0gpyucm7r254sjiyv4q5ec2t7k8hebzp8fpx5e3kgwkp25u8f287sgdamra6us64lp7iq8affnwimdltcn199ik8cxaujj7cchk08s6hvdgdeawko5as6kmd7d71auxxjv2v20rm2nqtrvpee4u37bzxmm4u2ye58tmatnjbtleg8vwppq0b8917xhlhz171j47dpw3z0uud7pa5i1djr116nnii6obqks12eg8u7x5x3zjijjyzpgrjscgqau2b9rr6fddawi8wsh306otcgm7vjc8y8sbd0xzbc7ux1iyurwxczs30tyieqkv7d5lza12t7q6002edxl30aof86wzlodscdhg03m6u4qfwgphq1s9lmtocl5kwfkqvtlk1xz5rn1a1tifexj6u454b4re6bv8nrk23yim53fz18w1rtn39xk7z7jl4g0l1mz85c20dakkut2sga157rf544pzchvzrskcz7tkqjuuldwu38888qdt19k1q7utugj4rs8juxk7whc1j2zahg1kmxh9e6nlcth0zba3hy8ut3o2c07xu40q44n9hmkj6k5ln93qrkjk0wovybxy1timxicc7vqduunne69fe2nke3gffib4n5zh3nbkj22brculxoyjme126tw4leorgb5pusqecz998m24npt5flq14v44vq754gpo03rkks1mvkzilar12ohd0my96nf99z4s1jra44o05jwzu9fknr5zkckakaweqtf79gdekwu90c9pou7ftczj8031658ft7r7r3z79ubvdeozjn68gta82iouw2wz57j9ygyg7opv43xgzbuur451z12gf369ye2rnqjt8580w527qzhn8rn7w2gl2irjonb424aux3bkv383zbbgdwe600a018b7p77onobr5vr6z8udqurssfnbpd2mkzhcfa2mhaojohuki0luw29edwbsgi8obeeyyxv6jhj0y6n0jhumz9jldc9oyas3ansefdou9961tx24l5nit8tp59l5n63x126gsrswlycmxddy74wyakr9b6m0xx2d5s0w9yzzd86excj0wmqrq8l3i8p8wmk6757k561w2wzffiul2zcmw3smfmjc04tavovug0i75ji2z64175s6u2jdiirg8ktdmk5nug9xbjnp3wet96otmb7wz053ayat448y2jjr7e9blpqx6fqeenf5gztz7ziqtrvwffhreol3pxuu76e6cjc4qy4uv8mb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'wlj98741xgnq605phyml3tjwey2kpw3uozkaln01yqkispjtzf',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'm58yp2wpx96koex8vwgd',
                channelHash: 'zb7rp9hxgxfzbdysj417w4qeff3y3zah9biz597c',
                channelParty: 'q7zvt0ywf2jvy8t9ct02toojft9mt881bni5gib8zzaycwm8bcegx1z2xp9bgrqfi61uhz18tgquuzm62gsqgvzqvbm146q2i6k6drxzjmccbayggqc8d3j61k0be86xqebtcy13ckzkcgjhb95jlumdp6lnqpwp',
                channelComponent: 'gsz8nofkr8vx867hucajyec2pj9veadnoj91dpx2z0pgiclxbxtrtje4d4yea765tbcfrlrwj7o7sagi35tbay3owbb1c109o3464aa0rosmd482t01tbmjpi9fpc9vdpyyrr8pfel0u8f1vgy4gi7eioj70ib4t',
                channelName: 'eju979fkhxv817hmzfe25elx3rk1315srq90nm77snxm3ufckjedlvkmwubf4xpb7trxp4rzh7p6ck3n66krn164qt9t1rt83z140nx999gew8it1j4jj9dz4pi44jllh88v42q171h6qcpnykwo3d0eyw989fgc',
                flowHash: 'obqnlbb8ex8ozxc5wqsqdvd002zjfwomguiyptn3',
                flowParty: 'lfvwn2tdeyatotjgjom90olsffulsif6ev93rewkt348h35rpa301qe8ozte0vnch0khc28rlx5ov6d8z45w8wqgb05hg261m2vwvwvapjxaecj7nopibqlbokv4457mom7lxcr30y857bksjekgd51fsqmgrg00',
                flowReceiverParty: 'u5iz612epwgbo99rv4m5zqmyoeyp2fi5jf2lyte4bebrx5yskxy9n3ndd4l7xng2hym2ow25j23fe4czp5om9n57mbpmi249qgfyqg9el7zy9x4zkp7il6umwbpad8mdqu49fa1db882f80i4029ppinvar24xdt',
                flowComponent: 'ufpenb7ppcu1h5rkylqvhsygkspuntlkekwzlub4yqk04zwbds6x9y5cwbp4tgl6jws39rykerctccii42osmrcowbh7q0q2qp1bwlpkevrcnxa6xtpjffbca8ephuknim4pfd0wwb12dc2us7xvg3rmy95kmmdl',
                flowReceiverComponent: '8z8xffs92cg15ed86kwd6bfuh43dn9lp94hos3sl979ag9lgovveyg2okzwpjza197rte7fz3o1r0t1r4twt4r5flofus0hbvrv2e38n3rasudjvhrf11te5g792an3fsgd1z5tzsf63smh3u6kqg3iajrwqxmi5',
                flowInterfaceName: '1fmrfmdh3hntfczs2qzapv1dr27v063g9rouo5dlxyoev5ngoeff5upzcv0oh3vd2ocsoffker9aksehj7hgr3e7hz3qh4vmksiu4agybwq796dh1zb046cj89eh3y6gb409x6rxfzkk76rnfpldjyq65fyu2l8n',
                flowInterfaceNamespace: '34h71n995hfbsmtbozmz6kltags48ugy65o83hp05u2mfe01m93kgykfhn9dt035d0loh2lo1oi3ziwhvcwj4wlzlgzue9erkb3r5enb5xd69vayqkhoq1xmy2hjlzykc1j92p4p3rb6u5oz9mmi7mzyavewzktt',
                
                parameterGroup: 'y0c0t42r6s6ofn35qzwygf0yjzj08asew0vn0g4hsvipy8o565c0p1wz3ej5861gqq3nfn1pmss54hq0pche0lqhf96getj8y6hi1996leg3zs0dsuqr6ayuvfm95l78ut0nsaxirbrq1a6ldkdhdilpxhqlshcpazkeao3bb0b27zg7nnbi3c1km5it48junm9szprz8rna99492yjz3l0dq8j9f6bet5fxdaimr7gr2jn3av4w7tmc2hu6luq',
                name: 'k5bl9xdcikkx5vt945j4zrklaeog5608iudipqu0vi33m919kf5hzer6zmsckcqb6oud6op50rho9eiuofxhri3n9a1p8wymop3ln806ufwsdh8pg4wjfjuswrmuxfhirql69xuiwgzyxe3y99jbtbne2ck182fst9stxvc2kjzhwm5383kapfum9t9hpm4f7q9mv2jcv454thy7fw1s131uveoq2enra09dpa5e1pp0ubezq39ideebyw80v4o7srd1j48hs7fwpm45iot8ll6g4biek1vzpg8nw7mftrqhkn5v814yjxn1m6d09dft',
                parameterName: 'z00k75wou2kibgdsmow5rtnvs8dyo7h4u4ioh6pa016n0fiha00lbvulyk5c1vj5rtt3k1e5zvwjmq7qsuwjj1xomnw5ocm4v0tyrtkfyjnd5rw0ig3ulhd2g9442e1kei65a5r30xydfzvu5u0tr8zjj29uqgqtez6t74u6hfg18pzpxlm2zmxfwaaqr2xwmzbbbvs8lapxizesa3mxgye2lvkg57sl3xmnw2tn3sck6n9v0enz19do9aouj6msfvafcglxh2dh49nqzkben7on193x9pluf0v5pqweqe4h5vd1a0xp5mf4lg1t0uk8',
                parameterValue: 'vofojdyh22vhjtsxhvyt8uod0s4e1dkzuc2cwk2qoiop0y5yckr4srparx8oeta4ps4jo66dumeu41y2r450byzxrq9mg4j6r2092a2yce3uvsupiusrit186306syeermvg9tucr0876e1otcm1i2xru4o942517xpe4l5q3d7w0n33b5w0ylh0ozmppaku7pmq5wfyvgh0r48nweo2zf9zzo75ep04l7njmseo05ro7juzq79v15ulg7m20w7nda5fh8467cqdely8l8qtz439pwds9w0bfmw9w6dqbpbgsy9jc1gicfb5j5xwsmmcxg1l904sw8g35vy7nnxnm3n7yb2oh892ask8b4yit0u998zzmvok3t4m86i2ssc58wna174xcpqwql3mi8c9v145a6o1f0bgspk6t66gywy78fjlk5ij4yqtyh00nobj0p5vmgoju1anl3gp6kd35n98q6v8z9yupa0pmehp3meajvpcc044j8hc2gdr5s7s81aiqou6fb0vjvhvix94k5klr84dt29pmphhu31qeg37kqwnqptc3ujrlx8tfpyd98izautpjmwiqo1gtazewc2g5uqzyp4o32m5jmgj6n9pme5ql8exitmblkr0vgn58a0lwg7sz9wbyfttk0nqkg0818oog3ij399df7jmb05voegvbwcoaqiz7kd4cg0g9de44yq67k3rh1cpob64f7xovwfhgbbma9krasq6ae2zlq1jlz46d8aim9nobuvu1b70zxbcwgp6i5i4z14gakvf7zirw3h4cf6p6egpp1lbu3yr7zf7pb31mvo0ng2dg868cnqd7j2w2iq9vywirgwwexptz2cqwf1hbtgt0muockx9wx5xaepkytwn1zht45586b2mq75rwt3ne5gne9b7h6v7n1gb27f68payscw7uoaxmofmub57sgqgptv5k3qsktty8gxutkotpkmjn1qu0tzisr36vtq9w08762h5k7u0zv7446wxe00tzni8mh776dudkelxt3259882icmhocf73ajaz9pba4mpahitfdcf1if69zn7ie6y82wpnqqbfwftj0fgcdhvu4hkyfcg5x5s2vnkf4iqol43rvnl65uvxwlv6v809xinmbd33uztm8gcoacqp4s80zzmaxnteqbk0wwpwofhy6c7gvlipyxcbsslf75a0g26173ff0i383r3h06n31a652fs1il27buyy0ioynjld230bfa8bt3yj61slwjwofridhoqyqygv7pycvej8zk8x5tvimlfglnm98qizxjw5lzvw7h5rduhwmzw3fux9cpb29xpi4preqqo45kp1u1jihrwo5tkdgqmfovwzn9gnzu0bqx8tbq9olybi9x7xv3mxflrrn45iq23vl3jhr24kcuojcxebbs83kjwcfdwl3dl98vhv5v08br8zgf2ab57j9dyl1attbzw0ar0zb6uiq4dqvrgwclwk9fypquxnionfai8if1mm7xt09s8sibxt9ker4vbuhwlug099f6hfknt69amwjfsuwhi77g6jp73sxgrmqh3dfwi10r33tbfskhzdw085o5t8x01gop8f9dp75o7vo2lxpnwrhs4a5gdfp356cmpxsk2h4b3i5zy5jbasf7lyhvbhr991byygzpr8ri2redfm0940gj37e4fcvafxqkasrxc3w2i0tm33jd0fuz78r3dxnotit3v3xlkl2o81zs6gux2zp12zfx9xa066yg7zezbgc1cmu0swqv4e2bh2tpl3fa87j3ewk1qk7ejrmassl8khl2xpa365mz7mi1mdiz0oa843uxdklh0qxkhufqz6r3dafy6un474opongcoidk4bfb4bz7jkcdk1cgf17b81cgogg7odh3jq0hd48pcjpbpx52dg11wk0x3rs3tbehznexmbzcj2pfrm9jukyxdb7fsnyn3r71jcnyuvvoi9ps4642tq2mvdu7mpt7o1crsn1wvmck72ik5wt14kngctpthdxignq4a',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: 'yjqhjsyxo3xhwxu9d7ivxkapq67pge2jup7xh',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'qmfv7hcvgn0kgka89by5gfsj3zf82mw8ndqpyfeu2sml0g0gh6',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'a7v8mu2ny88nvlblqbus',
                channelHash: '2hw7rip0o8otiokkqubizhj62eax9u9gbdk9fd5f',
                channelParty: '5xf2mogda5b9gx4a65lj0h5qfkbzj689c1txwe0vrz7embg5au9zvg8xw4nl56evfvz9i346k7o3akpfh6tgftphylbxi9bx3vqcxpe9q7vidi3w3i2vg41t49rk3yxp1wgmov4p0ve5gfry9njd07kp93y4u6pe',
                channelComponent: '0ate1ep812g7cei0w8utq72pcgbpgjej7xxap8phl1kg6yamf721x2of6urz9u4ccsvm5ijx43d0yf616fe0vydm4v9m8g994sx1v84gnf7bhrfa47po6vwcqlvwr76df87wjfhbdmq0f75bwo6562udhag9zdjc',
                channelName: 'tuuf5f8tmvptmj865eok93wetlsmwg2jb9qoieiuqhhstceuvnuqbttr4ywk18llk23jquq26bax37godxrcxa693fpr0fpm2ix8njjcykyp9watcoy8igse6jjifie0t40rv57hdbdvdmfmymexzozjuw6ibp5x',
                flowHash: 'vhi64b3qduv2j3reajdzpccsimwjsk6vxhcs3x6p',
                flowParty: '2pzvv41nhznyjd9ak5m29wh6i5wpq4nokwkx5nt0c0pr9si3m8moaknt2lmlbrksz9w5mca8ea7o1eaond0kxejz83bvym8b77awhao8w0drz5pg4icusbvi9hi2w914bm0caiykag7eqiqc62k71in5tx45tkzl',
                flowReceiverParty: 'dwc9emxyycvj3wmokm81j9p3sdl4som6l1m58k9rewq4drmj4tjdiiwvupx63v7l7zsoatk33hv8gjmyxvxr3jvx4a8xidh4yg283z58hgirzgab3rjcy4bikwxm907p3irpy9wo52iw8pbk4guppevz498rzdl0',
                flowComponent: '1vlevb1axjji9vf21uai7gagbvy5yq40iswyoi02dxn0ze8cbbq4h8tosmrddjwtoigj6mj7mnp4c5cpxpyjf40pz9qn5ac0gduv7ojbsumvb4vpzuxtejxmw8s3yxwq74bobldmx3pffbmtqj5vjgqm98xj9hzf',
                flowReceiverComponent: 'm9z5bxrb2sgb882aifwu14dc4y0144x2eacvu684mtx6pzplnw1g1lbbedm4f5rpoaeq8kgkcyereiksix5ulx0z2i48fzm417w9cd3v2cyifgdlny2sfb7iuij841981in2evlnri5e0svtw0ov3oms9p4ec2op',
                flowInterfaceName: 's60dmlhr4tedt5mtf29fzl9aiimwlqpmoyz2kyfdmq6phb6x3e3y1l0txkz12sgczzssequmxdji0qajhuow16bt2hf1175sdyusnsogo9kt2cvu5skkx4b3llixg7sbris2zlreqaq643s1rs4h705c8ysigglw',
                flowInterfaceNamespace: 'eyy1fgfgsdjuraz38os52p6i2upllgp7zedk7xq24cyt2453lehxitnbr94sy1okcoualcg14x58ui7iopk64ab1u5n9vwgi2lamdgecphitkbhoaltc1yyfnyyzcft40hnnwe8iou14rzmhfh4zc7jff0222rw2',
                version: 'zpjlb7isux45hyfvxhdj',
                parameterGroup: 'lsp1zhj1oialagburt30138s7a8kcrkgtx6xijy9ybsdq026swmgvjjv7bpg2ld1wn1xek6os67rnzbsmx2d89vtucibsz8hdvmoo6qbp8akys9pn2y2r5aruuxvsekzwu89kvn9he8n14u58j431mwwy769zb9i3gx1zupwcdkcigm5eb25hj1ms3us2fwz3qh08kay417sh58m3b1oyxsx5wlsa67ij3uytvkyc7ikl2f7qsscz8zq8nuq5kr',
                name: 'p1zei120lla5xoqwgxxtfaajms2cgwn7m0ndq2e2csewnht9u2akuungq6xnm3d9kddi5sw7bqn1trsgdeon80i3hik2i0r8goxg10fkrtdtia3st48hi10v0hceposruplfwmkgb3prtlxdeaanl840b30qev50pntmf3it5uaioybtvh8vgnjmquai3yqyn2gfeuuzx2dl7u481v5nw3gxju784k6phw4n0rtu5xl6b8xckohkzgz6xlahn0vsgbltlxieptznc69niwyl5muq9kqtdmmywoj1z4i7jgzfa74g3t8344ymbea81dtc',
                parameterName: 'nerytk2x3y0cslji3ktcazamcuzdqtt9vg2fpg1p3zia0nbosp3n0qoc0uqfilod530aivcp0g3ut6hxsdti0m4b6e4ko0uva0hiuf3uneawgkswqsx1vdlx46ujhn7grylwmzao22vt76qywylvavhf6urfo7xrjswnjnd1emue2thpsxxmcmgg1bmn3mkfft61b9e9no8udab7zgic9sgre0ia4w3dckk42gbkrmcko4osbb1ayysu3wtbqdp47au1zfilj2rjl5j1qsl2vz7x7qjcddbkpskvdy3cdo7xg48hqkub46tz4vbeyxny',
                parameterValue: 's8i9h1rcn61lqoyo06rn6boqx0w26ra9scfzxu42r647652haez2h85f49auh6twceml5836j5zsyitjpn8op9ml29vce2b6vu3hvvdhapcboz6q4dnqcmfead47y7pt61vnldqt587ymme64vlign98m8uqksz7cmuoqn4ddcaedssc8m3rhh6245i39yejmca0yhoy3ftity5yqd8j4x7qjse8kykl9ifd5fp8wb8kf01lkf8ildt62t2mpkcmzak8qaufhr9zs3d0j0bnrc5hv6o8i1b3ai5cbgmv9ecs4migtnit5rrm337375g9iwwgcfdh41j85i3mza6ttwq9890jrwcpbx8ed28y3xmz9pid3198niynk1b159dnacsencs473i696xfm55deeui0ph7kg3bj98fho57242o3xobomti5um0vddbkoo1qyrws9qjakjx3gkiyfwcf3dl5502cy7zui4l5zom9duucey6t48fomy59orbez7sic6m23ytco2h07717hkfz48zxzj30wrxtbxnkh2es3ehs2fh0m4iepwtpwcqwjv9j5fjsblq0b7o0det1mf34i5o3hy5eoovryi07qu3xeqi3loz7r4dfk1c6o86dy8242ox3heakfpkz31ravsxxhpemcivnlld6uukfih0bexk6am0sbpndi6q5ka5gl1cpkw1hlj125zxn1h6ejl9xant3ilrv4fu9nvtanl1g31v5ulb25e7rnz0rmckt4ewhyvre03ovwcukkic963yyqh2nrcmtharxmmoqq7brb4i86ost1bv8c69vfdf4kl3u0lokpv89nuh2p54ulseq3m2kj3kb5xrfnt1cc1c0y86eom1s3g7b8mzgdtetl531t5re7gce6qd3b6yhkkqhzcf0cm0d9447wunn1l3zc445bmivmn17m9m3fvz5wrslm2cfvxipxibc0wkcw201846qnym0padbi00oijhx4l0ws880f3t66rcuok869d5tbj7oiv9ifoao5uwn9xwiai49a76nbhzyz1neuzcur6tgbp51nr3j89prqfb9va5prlm9z0f4fhq91wagxyessaaz9j1pjkhaa1pbs5nvklfvvp77duxr9hdz38qk2572ph8bz1bgpk5xiwq9wgwvszrk3w6uiuvyubqfif98psbxrcmu6yl1lhw83suhoccrwdq3xun2ckxy6anmg9qki5bygixb1iibkt1psw3uuasuwlkufe6yqz2a7d69iu9e6hoax6hqnw5mlio5icy1li7thr9wt93mqoo2ajypssdx2gjydn63ie43s0sjt7pnbjxdgrj1bkx7tqt8oq088qn2rtr7kilfn0849i114co5b5i94hs6lpgnmcmb7ofhn9xtsr7olf6lqgzbtut4thnvli9bfuh4x3el7zhu2joauswaloo45d81aa3kiax5an76ahrxiz0wm6ahtm0thoipw468b5ggvsvjrywn0kwyp0nfhtgvn7ppffjua9ddlqy06vg4hlspiq3tf45tylnccc7msg5gmyen6u0drh58o3yx12dh2lqw7n6z5aezw6zu5mdbthegwm92c5l52iqhydg88z3d76wz1yxdm452rw51aicnjusciutfwku8x0haehjh7w2tdkaqnse62tgicjatgxq6hdwet3f97pom3fvwyxd0rrluytuom44qn2q61m2f9lsrj9ushdf1k7hxochfvmcbpuycv1dvfuoptoau1htmyvmdkssul6p1qubl7y8j7rc6uvmf8lhz2wg41pk2sxoqi5vp4uxf518l8w7x9ta0dw4moxrmcr4yomxaz903krosu9d97pcc37fxosaz7ze3px3hf2v6kbxdd0b7wvxpy9cefkvi2jnwitanvdoknwgyqejy0cupaszuv2lq9ai86nzrna4kdyj8gcbi8n1dm76kuuh58xxifdcn2s81mmrmnljxevpz2zkjkq7bdep4kysxrcnr1z1iaobfyhy6occk5bomc8r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '94gyhsbju0ei3p9z92xw57wjsr540r0pel379',
                tenantCode: 'hjobwozsi74o3iv5n8sqlbg4o313s2skmedorlvnwqut91n0z9',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 't6iy0ywppzydea9zdsk0',
                channelHash: 'i9z2zkovxb2eo2ibmi5czdh50my9cwzfn20ovmzv',
                channelParty: 'a88r6nbbjve8p1gvtgowetsnbz4koshknz28rltrtw0ns7no2cqehz0u0kd8aoiwkswwx3qj11fh4je33t4ucstblpazkdni9sq93syzikdzkwqc9xt9b6zv2if6gjs1orvttj94ogocs2a63piwli49w966mnc9',
                channelComponent: '9gwaw6apmmew03f8kadfv422atfu4gh1jzxegbp55w7dug7vwbjven0gy9hvcit2iqcl5o9vz8hecqd78deskt2b78dl7pnzidb8p4cku88zan34juus2p2uvft7ah9eu40v6qmrabu0xorgln76nfuyrn3p8ald',
                channelName: 'hg91w1idtpbwa94ujjj9d2uhwhad02hasjwjg1wiblkapqvd0nqtmsbb0i366v566zawz41dqkk7yupvty07djxmquga3qdko1mgm51kho83yhckt6eb6amsc71larcawld58369xxniekc1ldolmvx8b71wlnvo',
                flowHash: 'j53u2gq3qlb1g2okost9opkmlzndlzyz9v1t9qdy',
                flowParty: 'c8wz85d4jbnydq8ouvc9eej1hapalveycynugta7j7iljffic024fj56lzcspbpfrmifez0524g0k2le908ii9n2zrle37rk39wx5zhfdhm2wrh19k66cks02zd1xcrehd6c9rhw1cglczf09e7bv7prkqtbhwja',
                flowReceiverParty: 'u0nswzcmljyhxpqai0u2azy6jhf21325ngk39ipacq37sehnc5qu29s331pixm9q84lpeeqb1vv01blxc6ox4kajubcm0ayow3lr7rbo9pvx9k1ienqa7ihdnqk0zwkwg2iq5x56em5d37zj87eyl5kxg4ikyvh7',
                flowComponent: 'nf5itgfzt8gw69v36vtivdx56bihu88of93gzcpfya00nk0eu5277571pdxeb5b07y5dlwxo2rr0ry2ma219tz2k0u2r2z3zxbbu6c0w6djkyujlltse5f71egymuq19nkyamf6ajo8ep2ifqddowrm4efphru7z',
                flowReceiverComponent: 'u3ywnsr56aunf6ga8s9b60ylps57b5jtuxptplhxrlajjhq16q1gb0xm2l8yohghknxsp5o8gd8pqrbe6jkty9s6c6sl35fza9ngfrefqp6990ciamhwwp9giqr0rmr3zo8chg6tmn0hz8ngnmwfq807u5rcn9x5',
                flowInterfaceName: 'tseywrjrgj0jshsrbm6853pkr943doy01peq0je8rn5nscrhqscaz23jduwkko8y0ek7x47yshb6wjkdkz559mteaeuk028ldnaocq3gtyja7zawwoltog11ynuz5o7ztxdol1tqe2n88xkuf2e8i1738vhx25vk',
                flowInterfaceNamespace: '5nna99sz2zlcb4ny4mwefktyd3xqpypqz4orlupbzciwdoxn4rqip8xq8lrv017z094pmylh2azi7fsbpjcecddg60rns4d3spgi5cfv8p32sc5mz7a01ery690mwqp6xcstcizu3flqawe1ehb5zhw7rz3v93r5',
                version: 'w7jgu7zi4ah1axx01rq1',
                parameterGroup: 'nsmijro45ga88x0exf5ep8dl1q30hgto3urw7gpj6no77787c3tlcz4ahvjkr4xpilitzuyvpxxwd46053su8elqtiwbbi1xt41odf0ehgai2rxjzxcxnepxpwuk07z72ualqxx4qlm9gyhskfbcrm66u8f11wc08j4o0celvhtbiq1hgk9cnp8n9lexl1xkl0jfgikao9kpggwout96pzsitv6y45hmymw34tj8in871jh9c0cruzrscg89rs0',
                name: 'o0wahru7b38n4hr299ilj0t1r5gelvl6kq5ectrj4hph2tu535b850yh1733hsz047x2p9429q12avs0ttrj32b807cubhv8qc1njh79kl9g4afz0guvj7x44zge8xxfhw072lsh8c0y1zf2ve1i1mbnnzdjiq305catro9hb1clj5kt7dzefv9dlwaaobxxgc2x3v1jzn0p0vl3weuys3mu14la9jzyuv3n3s111jgtd09uuvwytewmz28nc9bevlf0sqws600n6zlfv3lkok9iahx743brqmpwxdg9g7vjmn1ae93o1ne8bf0kcx52',
                parameterName: 'r4qoewmoomphkzf6ooznu2rc6prkdkz25dt67t4wmggq1o45jruee5a9w94evxwuv7oazn7x2lh2lzzmfrlokqysz9f7j7gp32s3z91ztgyuqyro3b9xsm6jt725ql5c4pwvo6f61oiw9ezyvcpma42w9zh41gza0tfw11sk3stu9kjl54w8blxk2rxbekhupowq86rte3iqal89iyp4mq7f5oi7b0sq3vbwsix2qe5y374hqk8x2kwuzi0ois50nw49h9e3uiwh8a62bvxnbe1voyy9j6bf6z6ho5zj4r1nz5yl0pd7hvut6q1ivsj1',
                parameterValue: 'wnyaoq6r6968e8a36xkdmxms8oii417p9teg4b8aqc32fpmpwtjp1s6nmxt5l0m9uwuyl5thypespogqe516orkzuxk8sp2ae7ufkqret15hysq45128j7l2bxa8xejkwhqnonup793gcb7edky0n6mwiebeis62gblxzsmyi6zs53vom4how5baz9sqx62mydthz4d6b5rjx79bpwzo2467o1ej844v3j4g3mnoa4mppmj7f76c0ronlrdhkalyl0qe0tzx4w2lwg37y027ledvm2a26rijankv9c4fu6oi7taeptt3lfxhyyqsk8semkbb0jf1yvfyq33ftexrka70ektzf64z6i2u5uj467qguk6rtow7cshhtdrw6m1fjzbczbmz3ilwpugk6ujta6yu78qod0mve3ji3l9odve1263b0pjvyqlcn8w5mpi9zzp6p9kz7szl9lsm8tb87268r072lqnqwuyn37q0lng16zmyv0emio4rtk9a2foa6pk8yvx7o4df9vtp3hyy76lbu0gflagrpxk15up1fytrbijr3gv1vcthlzvuuzgzxr7dtfg6mqlqz5g7ueokabjdyuurn5aphhpltjwedqet4mkzo0y5jpdibf3d1m53yv99af6k1mmbll5znfgmvq3qhvmannu6oijzolk29wpah610530fsyry02zc90buusn5n5saej5yl0moxg2og6cr2cjucisxyc63qxx39zih0clo7ek2z43vmbwovqo0vaenxx427qelxrb8t8nepjvz689vb44s0md91gykofj3k2q4pfzxs9y9h4oqdc04w0j4xomakaif5zjnac6hzwvb3pdslg1cd27fd1ey3iku64kobfdz27y6u5reya1jrj6mv24a7veg5w1hkv3bkwa9xha44awgvywvfeqjdxsmi8hremlmatnavpdjzr025viubho2uetk8pgib1wcilsxegncnec1mvnzuuspqvgy4iubfx99dun29rmcl732o7cvuqqv4n4zir4w54sud7czmie73zcm2g4353rzwde4cfgnotw6jnvqz6qu7ir08rvzjlexapz0xsszcxbk2o5zou5c532w6l7wuwca7rl41b7hq2mctdkk523syfxxsxn4f1y4tbbnstmihc2n7qtmzl3zzqnurk3g6oeq22yl885vro41hslhfvf6hti4b197w2kmgvba8a4vzjjj2c79cqk9pdkdafcifnzfhjn13ry3x9p3l55tew9de59qql8latdwnrjucafg36zeii536u91j0lyzctvqlnzf3vn44at74cle5dzbeubzstgmwjgw75hsgqoqn4xc0m7oktw7x0g9w44zk1o3cdc2urzji1nis6cw6ie234j7z7auakfrg233xixxrwxxvviahxd5jiy21808o26itpk108nx79dar3dhcp4ozrutxaygy77agkm75irofvb4l6619emdth8cqyweti90job7qh6bneuq4wu177cggh04aao9sxm7ypyyv9a2cae0t5zaovizct8ay1klt65kznfbcks8pkarocozhwjztbry2kzku2qonotkg9qphcr98udbbdkvq792vowbydrpybho8a7olpiqr4tg9hu0lwlet5zloxxy1lc0hhc0qezimxeclkvth3ex4oneupyumcd1ri5l0yomaxz2krz5ay3rzqnpx78on116uw99auxo08x7dltfm4bhncgk821wm8imlonbr8ksuooo3exj7txtfv5redacptb618pkfnuwzg8xvl9n6bbm09rx0c1uo71tkg1vm53b6p325an4py6rgsqr08yhykzfmwlzc0forzzhzmadu25ltlbclfgpcl7zv5l5as38ttqz3ceze8bnc3v139qqgxssr5yqg18z4zh28z4mkp8hnoteaiclcpf9wp648g7vowinwlp88qonek8j3rngaiptqbd6m4ai7lui93dw9r0z9sxm0zzmpf0df14ldwto2o5xt1plshsyzuf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'i40dwb3kysayd15h8i1nxkvsx950jnj5i2lemcby7yrm7q5jul',
                systemId: 'vqk9yz6qga7sf6m5gq83b3tuyb24pgjkjxpsh',
                systemName: 'byo7bjhd2kqqna6dygnj',
                channelHash: '7zdzarr8910ubtf35xbcftovij8ezvfojummj214',
                channelParty: 'kvplvnfjisn2qwi2ds5dtgp7azqjhnu564oa8n0r6bmbcrtbjs0ty6ggoij08l5bzn45jhx4ikqd8fpycil7asee8kduqnhgg69m6os2ksr7c0eklgin6ls6mwqtq8pkb9whgcy9wu5aj7mg61pjbpe48we200o1',
                channelComponent: 'yx81afzpt160dhggmfanwl4ko7j6ytrsw6gn9xge7yesl703bktpij7l2vnsq74l11i5vrjuj7xs6zxhjcr4id7d9o639sdjsuiodcabm0lrcbcmdar4vj8xvxzgh3xed8fwo41az3q08zuxori560m7ywygwkdw',
                channelName: 'odx2cwfvycv1i8q3e694j2ghj6q4jp0bcg12jwrgzs9vzoxbe2gm020qjye3wr3cettga8h9xyud3dcyzc5fb9s3c35b4ming1jye4hrwmmxkkjtqm27r37djnyyft3o43m7xg1yh9fx1ypcsos85fwr22pfha4a',
                flowHash: 'ng585ndmrrypdh39x87lgnyjy5ar298dfk3vsmtu',
                flowParty: 'jrfum2m9orgtbkq11m9f1e0jmkseb31tm5mgmccfqndeny920nlu9yhml845me18ev15z61cosew4py41z7k4uft1gq99imsfbrxosxq7f70318jyov7uhed2xwkaduvksm0dzrbzn9fzhme1w6g1kndlndmhazo',
                flowReceiverParty: 'ravz7sbeldd7a1p1xuaw2mxfex5hjx6k7srg2705hr0yi5xingyr7k7gfp5bil8ma5nal1mbn8oi1sajbi5v0e5a6wh6qy1pt6xrn3ryhwfdxajyin8phs3db4iwk6w71iebzwh4txiwb1zilhyf5ywullfxsi20',
                flowComponent: 'c8ijp3znhlc1uciadamjat8rnbkrmi3cl7tr08khnfx6m8o8fb1pthts7t89981slvw0phgm2oc5fp4d3w7ecp6me0r9gyjmqv5mfkt07szmcgw0zjdborhdqdvfhf4zgim0grdox05gziwu9s0581ofk89mw7f8',
                flowReceiverComponent: '3s9oi6l8uux1o70h88ps1kir21vmqp652j7y5m7tl33lphk4qhli026xc48nan7p221jx6rpvar5w3bm84mx11pbt277xep2pwzxwi1rksx6knit4u691qn98eyu23iduvxt79i82g68r9q46lgiwiyeon1h2t41',
                flowInterfaceName: 'j4eqwyzj1n21matmqzg9v43poftfgjndw3qsg4nxky3fevp0jbdt3fm2shxdr559wmd91dvg9bqyfsazerashjxrrb5tiboq3y017jqkl82ywtp491s1ppptud4tf7o618gd03szm2ojkeeuxmkpfwtbza3y5wx6',
                flowInterfaceNamespace: 'hguyd4k7zywn93yqrxxho59yzbnndkpip4uakocdd9gnqy5prsxxsopyiu887sh0h8q1zlctimyfay3uekoro8y3dbis9m75cedi8znug0lspj6zrj2qu8axkm8glih34j7my9kvmti8s8fv4f8vplt9fo1xqnlj',
                version: 'ohl7z2ysvnsge2h4bmaf',
                parameterGroup: 'oa3qtkqahetax1je5rzemzgg5yvm573dd11pqmnj0pbnj9hfmjunozmab8nrb7jcqtjzcl4k13ey2kobp2zcesfduhfz58f9nfknp0zrtrsb3frtydpfnmsq7etsk5eupwkb51g3bj913k7goedcj859lyu95861nm3nmyhfkpj1vrxs15oato1vzfq6kckhb26de97kbenkfxm56y9qunr93c9e35589n4vrw2vxqm8ttyodbkisqnf8kztjme',
                name: 'xiqwt2u5qsi3uk9ev4n9hm54otsv9bs7fm4qnlg5ajhae9fd2uvqi5ouw9bqx9yn3lenujsebwwtgonwzu5go145wgon4q47li3rjk7fi5gijyujdjeh6nndwc7ryz6o4kf6vmd2ys6uhbm45kazm973p26560pzo95rs15yr8v22xzj7bv9re1clnxdoxf4qfhsrh3vhezixg2oiq05n0rm66hrnrln54xyoumbjp5517c1h0adh24hm8ho4qq618sejfo24dbqtl4u1hpb65zvauzd19eu7if2sib0zld8jhogykbhethpclqruex3',
                parameterName: 'h4v4h2g6xsqe3ucksiovdum19edwtadfb7pqp2zscoepx3lxriaydyr33ujrcwn3eq1hwe5yub4s3ane52558ub3xkwxdwrm3j0jm0m1plh19hp5vi6zxz3v9ceyn5wf1vd43s84w1wozsb8uxjtkv12zex7xpfqndfsvkzvifeeevxa27cdq69hputrfbv3wmmdsjnu1e8tapbyxmjeihx6box59efvxpt1ep9046v1qae9kduhott6tk45a7cx51cxh7cm6lbsgp6jokmia6ziv1ixodbeo6x9n9umsnfyb3zsmeipymowup8h2kad',
                parameterValue: 'tqofnbi87axrfg12o4ba1n9w5sq2zrxadf1bs9ri1gr2ngyy4gi3u8agdd6bxmlojnzty54lpe2esnitj6lfyoxse2nmlv01vyonb5bfyrf5mozsvf5wfwi9x2jxxnpt13uafm4cbo56z97as0le8xwpugv8ce9epf4bltradpddx6q9ne761g2b4vimczf4i284s0gg1qw8e38gd0i19yin85hxtc0jbhzhccp7poqfhfy6hytgmeyj1dmz5mup0vkzmvvv6l7dm2oly75rm41e14jx4aofqddmy9z54rx81zggthz3zvhhndgeod4nob46zsgp5ij56d2qgs4lh6d4zk863bfxm29j27092aqc3ecg6dlid1wmfgami9hvg12mz4eiv22orerjlh7ohvwof2j17qyxfcpm37kal6p2lha7y3jplxngj0lnp3bncdfreazom8dnbedjyf97x44v8g2x50on3u1v4i9w130bmm16x34ge0fo8vmoz90l9qepcovc6eixgm64tuz1fv9xo707fenforay5c6d8bt9n3l8gokfr0hy5vjhhw3hih62uixfryvqcioz0p9uo7anjyf6aktkbmmvh4nx058mco5svhyg9zzclzm4wifqs7saidva1nwg6j8hy09dk69c8t0li6q6owi2za5e02kywsxuc0cuk8dyx38zyc2dgjbgxxxftffmyapiaorphcchcvicvz1v7qgexg9y15qdyhqjou7m7mkm0vt1m8aowpnegznqywmwoj95x99mq300g9fxc84790gn1s9n6wiwtj8ymuflxit81cg2x0ijp88r6ghb8ciw16l1zo91ruckswovnw69mahql0y5vy5kmpairvwfuwfyd824hg8pohtpncl07reb9iiqr4dgoxcnlu0lsmyc1fgosg00sdmb8z52qlv8lyq8gpkbf4h8c1qk4xvudmsyjmr6kd2h0y5pwwzvay4mo2gt24tdrkkkcesm0739ivwrobh5ope4qbxi3i1t6ij2zvdga0ubbyuqdx07hlcnri1sb3nj2mb5ep422ha6j8wlo06rx51uxpnydu3974g09yrzyvjylnh2k6t3q2idv2plysp0rtmbz3evuuui7okkx1k85jstytgte4tmwrn813fmin0cj3xmbj752lo60rxfv4tt05vcv1cgjvnwwijqa5nmrb84d8jqmkpiwagnli6u51lkvj7u89nuz6xqfs9q1wh9bi18e831iy8aiwdvqupb2mmu6oj3f520x3jt76gywmi25din5ww7yfvqjdyzuy2ofhdwcq2s5t4fznzxa1p60hvax8vzgvi8bpaixy2jm4h89q74ixeuzcgg12hhrs1b82f9x5cbbf9y26yvacjnhwom258xze57b96eztif5au7u0ehrs82ha44vu4zir86jx93bqdnoff138nncs7ny692lc6hja9u4g9icc61idjwh3d88fqvp9jyyapg1nltxbjtwxemh40m49kj3pc6vi9mo446t4grygfkxpulbxg6y26usqw2r06q0vz0e939v5tssj5jztu2cbj1ewvjqmfll8wvzy99h6ltvsy8yuorj5drwsnch9y5ynq56772xai5fdbmwpk25r5zmrp1ay0vp8who9791bdvsrgekhqsqczp5eweregpetkf6ssyw9ud4p9a0vdqusa9y4989be6l9cx3n068tuiqxds3ih36c4voca5rbscb8op0d5wbexnf5ob2iyeskm5bgd8j4mm8s36j4maq6n45gkjz5rymp6fhtbroleidegj39q6nbqnebbe7ji4kswh7bexvzuyjtxxosozawc8kxm5810g4epc6qjvqu5y0cpfq6iaih99mavmf8g9f3i71k5vc15bde1v887733uqkz85ff9dv434ubykacjz7dus8flqyul2q8nx9d5i1om167liftzga84hehu6882eibmr7nnwg5u24y0bcl3c0xcz2j12bq0n6tuxju9sfzz23apj2arf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'sef34ofbp6uggf67e6kh8hjcox003ampegc2sg3l5nc0k5qqxk',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'o5tsglsxslm6zqnzztrj',
                channelHash: 'x3r8urtd3krje19ok3ucdlk7m7vpw7et22tr0stt1',
                channelParty: '9fvtzkflkouvy7dgjs4ce7ek2rbkmvvd7vrbrg5bz0sh0j322dqe79jz71cx1m6j7u8l22to4wt7ecbeyar27ifsvur4p7jqiu8rkuxf4q3660vilu0pxfvilgipwiu55oqs33ggdq1jl3n8xx43ohgbsilbyggu',
                channelComponent: '8tqtn549rvgabxx6ata5myjukx5520xvjr863k02x0uyafjejzc9s27q95x3b7e32tp3ktkbbt6o0mlk93vl22c4xb4x16q4d4w1r9h2wca5wf26hfc0wmzisbonghksx9qjwfkxggzuw94mli9rjdrmqvig0wu7',
                channelName: 'dfkmtr5wqkj585l0iipq577ni6jzp8fowrzj4tnu2rfsyhonk5uinpf5owu1c4knlgidojrjb5a0bd9dtz0vgv0imxvucbhj1edl1ecf6mws502v8u71lpllv70p22xs0inc6186y74f9auepr6f8aqfemsi57l3',
                flowHash: '6ugd5x1kl8fw06v3w9aex0z8g32ynhqs6bxnhj2a',
                flowParty: 'zs2tu92t071i9rtzg3dwcy9yvlwhh6me2qsyy8zrc0xmvcg5wqkr2t3qieviamqr0x9x3ictp7jnkorkkfvlrfd2pzr3j6oi4chbr4xel6wqmc8j403cr3epswbsijjoptdq8ik8a0cmeqw73isfm9f4fcwhkq92',
                flowReceiverParty: 's31hbe3uto6xryoh153j140wd9niinbjhjrbu6rrt5vbwet456r95rep10ioj3e6w6gi48w19io7v01q5eezasscq1qi2ovges6sdav0abstn18pcqtc5dgdir2gsbzq43p6f7cja0zbait1u7c7bahsjxk3r9m3',
                flowComponent: 'lixz7qufm2v81b6yw2zxss5k8u3ivtqallgzjf3q59u21c9jnkc5zgllq9ta96gnpu58upzey3vji66ehnvx2ytkyaph60jxf05bxracb4z0r2cdutadst88sdav3gx2rfz9oxczuxm1v3liqjdxinzg5vasjdee',
                flowReceiverComponent: 'p6enxal5vbvd8g5wou33ep74tymvwzdhnxfggp7tmxnaw8ydzu4llrn67ic0rfbis4h0x2iqovzh1opzgmveglzv1067rkc53zru2vhomdk40pgy46wmkzi5hf7iz7ypxmlic5i0chvma52td69elepliovju4yh',
                flowInterfaceName: 'c59hsow2uoz7bm75y8stw18srrvre2x1z4rubf7m9ur1rwg4xk84rwb5t55p8wjfgkug2lkuzgxhrd1ma2hm2msbadupt49wyprfbx8so3lmpioe9unybo1voywu1kwmzu13xihhm9xakh4nlt2k6oovqhwf53o4',
                flowInterfaceNamespace: '8ys9jhs8il2p50enpuefy4b8rgsj9n32tomi1bhsxxcl87r5cdweutl76fqm26y9j4r97opo8wb7deqz1tqitld1idk4ki9glwwlu1u4yntt6dkymokwyzyi1tweygkq9x42quf0qwhk9acqqxtk2ko7kd954ijn',
                version: 'ur1bn48v84hmsrszv0oc',
                parameterGroup: '6r0e5z1sm8po4fqdnph04rzqh7mf26l7dmxfm8dfxigindusfsairkg8hdq76k26dcw9zc51iofx8ckpyenjay8te9oj6k5u9h3cpgrljvw1g7gt54xwiwwc2mmhyvancs617lt7f7asmjc2twvyehqcl1mub6z6g7hwdldqdc2n6xsfdn4plfz3y5tslgvdzja427myv1a4bfdjgrpdmnsufi3edpzeb26dgj4309pb2mt4n99o6pcplcg5j91',
                name: 'vx0mtkjhhusgjruqcsgj8tmmznfjqq6wxxu4p5qfmee8w264doa7ixgxbm3qx1d9nzxqxv4ie9wq6uk8be6ablrd6xph930zpwjswy39ob3s4otejuhdjma5ujo25hjupsesomqk6pa5x63gbnvje8eu8q8oubojtu4ws6ff835gidr0zf20n8l2zx9mg8fee0u32s832mw3ls7fv4x5lxfw7pig3ownvryfpae3rwyuhityexe9959uvsw4x474ozvbc7y7fzi54fho6hvku0dvr3hwvuglzbsohhkp8he1l19o0aln0qfra2gqbjlc',
                parameterName: 'ue2qbi404a7h6o18ayrnpy5mqgeadtvgmxgan8obc948hmvuqy1p3rwq9no7ntkzaw4q19t0a6tkq4wl19infg935qv41thxllcutvbw8jykeoajkfkqroct266ptrjlnz5f2dfmzefx1ylctq3w0z65obgm90mtub4rbo9xv12urbgdlx495chjtt0bgabeyiavibp1y6yhzk3ecpmo1lbfw1o94zpia270vvk8p48qchxxgomyniavb4y89yihfqbu0wj6mn7kg74oi2l9kjfz6psb1hj9mhxcr4sc7ahlwgbg01jv3suf79m749gj',
                parameterValue: '7x2rpoucnouu8z5mdjqqakfopt2886fnw7hzcqap0lehniyijk48mtkmq5sr03b9hyprmbkhr7geemygvdezjvff9jc836bytbveuie79xdy2hw29om25g612o687u24i4kbw6srzvd3nzb8nsapcc6jeqwgi0dqh2awhw5dergmqv3hznj20rchecfhftvp73n1xljk8iun60cl675lfzoi8vfqtrb12lhrll7h7g7ncpktak0p3flir59tuwrvtvlbd0hobf3kyv9nfgf3u7bsktpfovzlggnyiy81m2r8r3b2jbkttxjwm6b6725welg7i7zm6jvmvkmj3rb3khdzii2oku0x4kbulk2q72is8rd3715eyudvv1nkghee6r6ijdwh45su1tm3g2wrfuuwgc8istnb0lj5saewsjreb8foapm6zgr4f4u1x14rxhg7vnwotmyr354nxiwpcnmozb7butfdga7g4r7j8fbgsttnsp1200srpgzehflwahgf1g3pu1ufzvexr6emkytnlyrj5qw4ljy2vr451zy427ne557neak80p0n0kpry5fc6ju9wtsvgtvualv00vu07fqdknnufs58jowv6xr36dnj1go4dx7ojvyrze1hago5bc1n15cpc1s5sq1zz3lkkuujux84y0ez0iwvsojs0w6mxw4l8kxs78t8ean6s4591jspm6lvodrle02w73v6srkqqz3wnzb3yssgl72bakp48fu2pi2plrqgnxgz1l1x1yrcd4bgudjybsmv9bn8b1ird2u0yz2y815wvpi0vc4r9zxrt3pc6fidpim4s6kandd6eef6euizj961te2lew7m4ho9t2zco4r4s2f8mmvkl802l9b6y6lsp25dzx69r5uzu1xf91n9d7rz1zh2hb9j5lwulpjng6csbsp8pm8np6gpkxwdbhhq5oy8zrvkm53vj1jm46zbtef5ktkp4xlw820rycxbu7vigthxymsga0wddm7rroqmiqrmuydsn0kii239ed81p1oxz3ooswxs1azo1eh06cylcsvyouamwrijo8808feo93j9lys00yumfh9b6ofcrqy3soukxcuflwa2lylv07pl6hdb0sw8x0d1ofnkl84ydzasnwou5su5m0awdnuu1zi0rif4xcrwwo7fafoylrjcwnar64tx1kbxhm4mxtpzsfmxfmb39yxiunucisgu8ekwgudua4dj5v4q3dguzfv09iji05b35s8a7d7e3tf1l1b7ycj1hkr4hwapkupjzxqw7w6hh7zek6j0pgb0jmbnqfjalyfg6y2mztz8ul5iv0ekk22k6lqi58izgkoqzly0s8kpc6cyigf5kff60wvhjfnfe8k5xmduh95hfdmge3bpep6mm72vuxevj602eelx8frbsuqlswee104zto5pw6bix2dzqt5wnbvop2kvydkk0p64hbs0zr2ls2oocjiu2fsk96x2q99pr7xhmm8mqds7y8guve380j3t32lx8nsnagkb81grc5prmnt9wlz8r9zl0qzcxqmn5lgsq0a8il7cue4kyy3c1wp5j99nril7zpdmgei1bcfsz8u0g0my7ehxyo7pesx5ktqvnmyezlolkvvpfdosfj9rfwnck648k3utqmhgioobqndd95q9dmb80tp4cy4qje254is1jerwsa5qisnk6pa8w717v9yd5ice0cdvblbt641mha3c512fcd4845mo905u1gn7d22npce3kqebjpcvia664rujrhqe5o4n04nogo0yzpdsfgkjt5tt5a8d11gx3747kpntlirvwruq1qrc34tjcclnvpzdvky72f8frcmtx8mnnx453ljc5shdm4bhmylz4xndvc9btmseevnzn097dhcqc4v4za2u3tpqboujpy7x2i263c5fp3uog14e2d2ggsyepplwvets05tp8izra1n2ybzpxgf5n5vsw1tfkb9uzd40cfgb2kcy8agvn6464gxuaoou8o3e0s594qgivui5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: '9c7dyy5pmun4ybtv4c7von7t1snj773q5vrbzwz763tssguyhb',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '4wnj9tilzlilytwnkxg2',
                channelHash: '149s0dw4bpei0u9nu18jweacwavta4r5uagyii74',
                channelParty: 'ejr8ix1jssqd901t1gq4n4wam31r1m2qoi9ynwph4u732hrbboepy9kkrtcpwt51imymwet90a2xupr9ohkwobp55sqffg3oijpr2inpnaprbsq9bh5xg52ezai6jmyblc4n2872oog02b0f8qd9qrl4arik8g95',
                channelComponent: '1ly7kr6xetxsps742k6duyeikyko7769jm4981cmht74c6g3nssngiwehe4r70ft4ts9mxz8hit0qqb0f6hbn6ac78r3kau0olke3imnid5ta2o9n2ftwemd6cjjlzukq6vrjdx4ujtlwowhx4t7v74i3qdz5o6v',
                channelName: 'lsb8sndpmy5idkl95e207u8myi6qr73x4gkhc499lo6jlktocvt9ewlrh0z4vepep6w7oy450z9lhcm3xjsjtve8vgmgrnfkbrt26ftzxxf977b5x4kgbktdpxld0omt1q7fowv4okrxj7o26qvgf8l08fn45sx1',
                flowHash: '9cv4bx6d3sswm467heqip8fellucok4d7tyjghivd',
                flowParty: 'yo2s4f6l5vwjsu0864cmhuogtq7k0spvzen2kufvow7k15smnjc3d01rh96d19vmjr8sujw6c474qbbl9e158dikhj98rx1qxmdaw68cwph4lompepm2fn0xf4gcgj8cdqvwcddq5wso73obxhg1ifkmcseezqkz',
                flowReceiverParty: 'v93jkv2ravnr420i0amtbpmulsgqvb5mkx7e0vreukffmvvkxrcfq73sulyx2cvw86872qj07imojy5l8qxbtb9uz5wy50ehtgjuncic84g3jld3m2bxrfgc9qgiuu2oc7nyed8gqjtewocl7wwrvmyvcgp8la8k',
                flowComponent: 'nz26e1742g7ty4tavn32xels8n89sw5y2azxjbjzf7fl8z4ezj4ajf39xjqayl6sywfxgsfz4gm5mmcskwknwjjiihobzfsb1dd7grfu90w4p00vrvqwa6fl9eqg6at8ukdzdqs75gzb46r2hzfti82yf5r2wki3',
                flowReceiverComponent: '8z426stg58ousr4nidqbo342yv83klobyyj18uvm9dmtki733rmspsibhq29xu24x6b9v7dw13i9sosxs28tav0h8tntq6t73g9v64yg6n4qn8ogo5dluq3icmq35jtx2gwycxloyy2dkgqb6q10f0y56t5e6e8d',
                flowInterfaceName: 'wyyqbqb8gofxsoj17l5q93mgmwgfctrn1pd00vbbvzni0l6g3y0puwezq8nn1a8gtg4z88zdkwiopo6paeur7bfigmfru8ka1m0okp97vc5iua1nm8rtannjk8qwjyvbk6wuivbx0d1mbcj107qj77ih5r10llge',
                flowInterfaceNamespace: 'gqzbv4pkqdluzlmuyqok37j1ejk90n2ahutbwbip9y1liw323hcxm2biktdlz0h16ym0wajc88nqmh016avygicdpkyi87xx4b1rk8wo4g2c8o6ydncbgvl48hmpbsyp0kuhbkwpdji774e0j5mpjpd9ojzkwns5',
                version: 'bf0w06w7emh2vmpk543a',
                parameterGroup: 'inrs4w9nz1xrsf3gvr4tpav3o62hvqtcfpjcfut6pznxaomzui5mkfvzuybjzjbg6x9k24os894g6v1r3t1wrumeiieqdfib4s2mnvvxi6me57bqxgf7gjwqihcavwyx2ojimcisawoiodo8813fqw4ezviy8a03msjjoyknvpx3rzzg7ox10lrxinn7jypbi642302b4q7bsl3eq63gjojzz8ixdm0cth386fliw69130wkp2r8oyug03hli2x',
                name: 'an76axeprnndmlpxvroeyu9pk7t3nja1bzat8j63ydgty1w75wbl57m8mh7cp0fjfdo4cj50yy973ch3x7d6zxhvs6lnb1ktg7fsizys2itp5mf8arp4kbgohxpv4maiuodfxh5jft521ah9o90lt448o60pguvmc5pm2w2clxpv0fk4r9lxckpp0slcps8ope5dn531ptvmpazq28sxtlpt72cgb2f9g3cydg84l39kta6za94bus70mzoz9qswkpz2zpd87e6ej2g93ypwcxtkulyu8qdhnvf1m31nt27t27r65a706rgs3xul6xf9',
                parameterName: 'k8towzmcke1f3a0oktpp7yykya01x5xx2bwvxdbe6heo3de3kle9944l60gimyc5qxaie0dbq4a3vy2rawalf5hdchgrjae6zq2nsfafst197g030b04rfjja91jmdmr209ikfix9audy37q9ka10172frplxn6emc2m4d5iw8c5lhfm2tteflsgz9w6a9xxtebbenpvnibq87xn143hb54zlrhz100l9fsa5wuvp8nm3ytjzkuy4znbsjd394ymed82g0s5xk7f2lq72674ch20gt7z1w78u3svpc9165ggdv4n4dxyibpto2lzszck',
                parameterValue: 'vfjhwk8h4g1as7wr5simqep4ydtt0a9wq2gwmy3nzty209mf0hcep7zrk6effqyko465w4ntpiwyyms6aihd38ue2pdmh20jzmjtdpvgogwiraulwzraat0uqoslzmjo5l1xmn3no36l1hvfy87pnoc4ud4a6mapyxhxn1qelc27rcpl2rcbd7epgyalqk7ogo6t6gtjig56zfkrqrvh2pecslvnq8ki3wagwtihi5tmkqukj6xa6ryt34fix3nok781y9sa7ekww4tpxpqhcrc02qzb1niks9hpyzzt6gp4oayqelqhnhq0452rus8bmfe0yz6hiyxx8eo2t2w5465j4jyp5chxzfrh43smrtrp2tnf00iz2mtrscxy3scw4prheficonydaarwnkbdunwtvwk4u37xrsp2gqavhe17f8c4r09rh33xq2grzaya0j0r6j1jae2d1v5dxcijfvgqdo5cn9knj8g9jzsa0kijlupffqmec24grxzao9j2jv8w2s5bfo2a2z3b8qudf939u412e6dtmlkd7nm09rb83wau8pn4429uklpfdrj5cch5gxotshiwv1ik708j9qhkvpkk0njl5pbo3csrkw23grsd79u386lmn6oobf66oq8wlzsbflgf621vtbkvumpcpnz1yuufsndnonoj3j2l2l9d3z88xkqye95r9xfpqqxwi15bww3hv19jnnz2uec4smosu11q5d4hl2jyfnbn03wzv1jgcel9fvgc1rdy6pbsexozgn1chkf5dvvsgsou6gfxhw6zcm3iss82xnrukhrj9n6kg4m6lqqf68mja6eqehn30qidsjfm2qhhtrqj3r6amkwf8nfk2jkv27889itd38pjc15ejzrneypcltgst7utjdypjiuxg13o1ecsbj5omokptga3e87t4b6dnw5wzg1m7gw7hb1fx57kbn98b9xz1tdxyyp87ddqtu5vnda4l9ug06lsfbpnwf59jhj5r44em4v66gjk0vbkl9q0hvgus54or1sdns3gede81p17t3300115wfulmdy5ss3psnaki2nyb7f2i0crhojwsyw76ileousb0tga3nuiqi005v69q6t013e9u7ry6n1at1felgwdkcddzru052bizj8jesrtl9930fliyj1fwdjy0vgd9yhq2ci312j8eaoa8jlkdghw7wv4eg93czp1cyf8nvwra5ayz9mqdw6bcnppjpk73ogdlbhdlgb7fkvcr60mgkzuzkkwl1whe504jso40mz7nqud1gol8bkod7o7tvran1wx8uw2ugbpo4b78y018odye16bln3zzl954z1had0hhvj2tu3bmib7k00ilj0kbjtcdrjepf9p1w0i5qs2b5cjjuhtd0n4z6h6nt7efsrcki0jzde9u5isvgfkyy048dd7vmu7it7x3mp2ehwolg8x3dwohlt1367dbl670r0db83hacncoi8whgxy36a1ool6dbwy1oormvjvm5fisc9yrbsvsrkao9mngd59gdy6cxnhmk63ir5jbgm3gywbna603nszkekvzckbvf20ryqdw3sgosfi9vt4rjb0jnod2kmov0spn4hzrc8saqvjv64qgp08h9qeuph01t2epxcbzkdym4ldq94j8qs2rybpfdzqzaor1v6kl1sf9foy4xa8x6uo4dstd1trx0r0h08buvguc6c1sgo3gwgkkxkhmlbo1sux28ejsjsnff0lqmy80nkwdy420do8rxcohm37usksw5m7vtjiicuhywse5t6l5v8heucdvhqjj4i95qlb7y4mhnbszz4d7ezolsnyma7egmaefi37k7phpofcv2xhfufn7fr7gtvvnbi8azdr8ojv6brsob03cq4y2mfpvhknpddmg5741l8sg3iywha0cm6odm7uczg305pkk7aeya5qgx1d4kjrhpnjfhlckxq17dz9pynxhao7k23ojqon9hsajt48o0v0tlptdnuhjker71s6qqamfidsal9uhf2wvigf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'b0q3akboqipo2l5xso9czb69tbmyu1qtz72ilcafp4aq4u86p8u',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '7jc7vxfn93q2ila6wl72',
                channelHash: 't2apgjrj6dsw0ryhhskmiksw3vatrtaxtzv3d289',
                channelParty: 'wygslr1058ifyac1xvahl2l3n879l08wakiuckq35q3lzq6mg701qhbo7bnzicgglmtpqvkwmba78mw7ayt790ijaf1cmlvhf994iacczgyqnibp81aag5t32d1xwzrjigrluieyxrroe9cpd9zjrhy5g0ij59fz',
                channelComponent: 'wq5x7n62ji8pgp9hmdw0esa7mlivknjyi93vb4b9todas8z0tle8yyn8ik0lxhmjsprf7rhlctlz9zyutwka5rfgo7umzipz8ut4pduz5i0ps0srt6wumaruc71hbtrkg2uwefaou9a9svxqzbu3rpbiq7mwxg77',
                channelName: 'uuissb6n6mq9oqfq49rui8dq5op8hs2s94r78arp1na3iutivy622ycgpkbu6iynhpwdtz4lhfy4d57yb68znux1cpfhqkazgihd2qxotmhc18180sg8jme3l0x9fb6glp0ogcc7cyfjbwzirnbe4xxgbhpian3c',
                flowHash: 'mb8liylynxul0z8vnb8ro7b8p3sxt2fmqen0j21b',
                flowParty: 'qrblgr7ocem5jdfdao8tnku7rwgw5zpesjmkmhp7qylsr36buqrokuem9ru3jgrmd0dgqv5dqubd2iqj8ba12a9f8u2sdkgvvfwd8qlddxc8htb5h2u3roys76myqsts8o4lwr7tz91a0wqc7nintvj8rmhnloer',
                flowReceiverParty: 'sgwasdc70bt3ny9fradejlcv2nzah9slu14mz95307jcr0qyzt3k096tssej06zw9mg66jzlkx9xngqxm2jclihvyyztx0d8d71sknrbf7h9qpitc0l9kppk1h3jvyng84ytzdb5jflgxsqc0k402zb0ccglrrie',
                flowComponent: 'bw0geg2uwq16923a06ypc6593fjiwoztrscaogfry4h7nikmhm284fybq6jdj8qqeyz6emvczqz8zdjh8w25yh7q47uii5hkxjmxpdp7gw2edn1xm6xqtwt8epef6zqcg952oupb8d3kmlkodfafgh8echl3igt4',
                flowReceiverComponent: 'iqn89pezr7jayofcump3eoyhhiraoudwspivlwku7jqzmz7m757w9rr0rst4fzmhvh00vwl9q9wxdg4bntytvh5xk30oraqq1ti8cyrizik214enmiqoh1lbnr92o54l9pq401c54lphszfwepcpkgdasbgsen39',
                flowInterfaceName: '1m360l7pv57kci7rhkhtbz77y8srikan8qsff4f4bhr2oguog39kgxa7zz9p5l8wijbvehen3hppjddxebrriz7qwwmxiutb6j3sas0n761r7aa5ks4hexn6ouz442ai6i37ns1ligvdqawk99p5enzzl10mc1ib',
                flowInterfaceNamespace: 'vpb7zaz1qw458wx1hw7ooqr00025lsaeh6yax77p6zqnqhxl2juttwy9z3shzsk4bj1c4uv7obpwv2jytoodyng3vys635quuxzcmy91a2alvorg2s3jwf396sx6rphov9u3n5w48r72p3de24fbfnxs59s8023w',
                version: 'ghga2c7dnyevbh5rx1av',
                parameterGroup: 'b3dlu9efhcob0j8lgve6vbcaq6douiesyxj7boqj8zlo0m83o0jjvi315gaw66unzuirj2udldx4xvm9rmsnyugb4dde90gw68qforzi4tfn4cnelnnof9lo036udwj1k38h390120wd78ravsiz2xm9mwea5earncnvkctn8tt2w51p8e1e7xiukla323gm5b00u2d25my11qcdz1itji34dmdz7u2g5joyleehfm1slfjkp1y0dmjoxjvg9mf',
                name: '7ccbda5txg1colr149tn4me9ada2irmh6ljos0kfuqgm6mwmtcd9ed24fnur3kwrrizswwsu33ggu0a4sqkbzck9grl7vty0tire0sbsvqtaj4v4h6rk51ag4hrykf067961jheugxj5nm5zooedfuw6afj5d5bvy7ivlhrq7804saqzebyljqv0cfpmngjcfh5vxqmec3qeunsm9jkkwxkzjdp28vna5bdcc5219gog5l9rq1km1kpahcg2bumvjm42ccjwv53esdfr2fk2a6615h7jvw29j4h8v86w05oozcufx4tmzzg7m83fmz5f',
                parameterName: 't8s5dav1fe8plhke1486yx4agelbjd26lufg8mrn1oxczy45j5txqcsp8tgc8xp4u5jleu8nlrt10h1fp2wgms5hxclg8sqsr530l09xym7m82gcmbhi9y2fx49lutali9yjl791epspxb3fwdi195cfrt6oha7ux4augv620n3o317g7fje8zxt68yx1m6sn5l5rgpr1nljos4ljs5ueei9fgou0kw57lrlu8p8zlxwpc8hy0ibul20nv55tag9h0n6d20sh2wc1e35s6885la8b4list8fu1mx6uhzn1nj12wgiix3xbntgvbs458b',
                parameterValue: 'ykfbnty5xz0k6vcv6wuh8gu9nwqvxxfe9rnj6faof346d1iibwrhqa0cf035gk3u1ahsidjsypq5qse7tytraca2fuws8rmrgdm3xdqmpz5mx7269amcpspfqn4roooh17hc5qvp3nckeswan8o0jsenicui1qcfogmji17gwirkd6dh4fgs8ag2wn729f5hxhuk6pijs92itsklzfn7bbp2y3qy4w4s5w4hbsabb1wc7uregb6fwf1srpzvdyxrcuewkih0t83bynpcbfhbtlbte460jnslviypv5yxktnhwbjw062vyfat4nkvnwo1r970fiaeqhkrvzrrcgjo3n53g0auuatcp1vvmn8m389etwcwhhtcgmllzufwnfvomua92gg58rn278aqia1k4y8so35uzrlsrg2ppu9reqjmne3mlqyenkdv3hz3vrvi5vbirriqwybwsosxf9d532ft0ctsepojuon00n8sp1vqibzjo6zjg4socc9k98rn0lope18z655l2zjy91sd0mdqloax4y60t0r7dwxmd16nbfkjzo9c3qbldcsboqy4lpmbmaod34tf2q4vp1zjqey9ke1k8wl9e1rgvii6ur6rzin5ce0ami3h4fjvokrqbnqsjpbiveilht0tdoheaz7r3f2b6gv3cxzktg4r6i39ae9dch7m3edn96poda971c7nlafwq8poid2s3fgt8d8bzp1bsb0r8r16qzatzmcagbvqa8a1u7z3iu6b78bnylu5jfd2sc4vcp93n1nyelu20ac9g23ke7c17tv1jh6lwssxgpg1lpw0cght4h577ui5tt3xrgpuxf11jhm8zoht1ff8e5f9khjmi94iwczvrmmcueyh7ebacgeaqsusljom59z0zwae9xhlhd4uyi0oitndzzn033wb7u68babwo5yhcl7c3ln16y4jzfcxovjyiyxyycitugjneyehxhrbu7r1td2f6w1ggb5101ch91evrewcitv4gdsbca9c04sebiel1kc9029kg64zjzmcjvhequioef8rjg8ftn5bczy447iv3bsfd6ftisf2y4hqgyeehv1v7yzjcxtyox98icgv72zihedxvrx7hmk0tturhai6w05k5t1kdffg5u6ryzy5gm4qmjmtmflduw6lbapubs1cfvgzc5du3ksg6vy58k6q40btdxxdwcgjt888u01stzft6bvohmaa5q0bb6lhj86n8gdymtzuult5z5b0e0hlo8vubtj7d3onwrd9j2jbh6ay2ji4kr1svcn1gxachdvsz1nf5o5prf525ldambw1zmqmyg0m6wvu5les8sz4wwxeo5lalsmrylwm2vf2kqo45prnzuz375t2sfte3yfccf4m2lyvjdpy497ekciygomap9utf4g7qg5fmtvyrhgbfp2nos0lrms4v2efzgr45lw20hqky9qp17y2617f6eaplrqa3l0cxl7tocq0v8zgo96jpum771qtr7n5p5tryuen2uzjbms72s43gv87mupriacnr64hu0ral8iqrtpfsg5ygdx2s8hms12t08p53mesy4pxww5zume1o90izzt1yemz9q7e69p0y1cub9urio222q4oq7mzploogmetalqb1z345ijq3czk5scdhud1g3fc59a00g0wkff95npb8em59ptimfsenoa0kc5xi3tyrzmnsi4eu1oqmha3t9eno1bhxzjqx7039g4tji0omimcsmlrzk3odjrjv4oh1pfum9y6vjbeyokoa3kxqi7av4vg8tdh8unf1wc9bvn8gkvq1kzqjwgir3rx7p5eatmwg0sh60qk915ugdova6aaz9fr2tiwzmtsq2qkv2xkxcf76svtaij2jczs75imfae6sbzc5gey19oauyg38gf3wgd5spqsbrnjqnpf8ln6blgouk0yykcr7i55ogr3g8lhbl7292inflfa4vvr6bcs368b7qgbo8pkwsmkeruog7hg0vgkm1s02i0awtobpeu49y92kddb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: '9ez7dqqk5mkjf1ctkycp9882plvsc5dzmbepmrpcye7ml57h9a',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'snqry1tzpdo71j4s4c4dp',
                channelHash: 'cwzunonmdlz054iid26402qbc0fr5etgfolecl57',
                channelParty: 'ssbe6lflc0yaxthm77246mk49n836ql4z577rtqohr4ycz777hma0hujmp79aq1ofkfq4961kasovn0lg6ra9qmoyjq2n5j3n99th0ipq2airxume67gjoaffqcs8yprrdugk0j58yjgqcddvv7836jkvd5owx8p',
                channelComponent: 'bkv5se2ylwm1eyan3h9knqkjclfm7wvuvbs9o91u6q71ov9dh6dt64mziqo4kx2ow8f1x4e86tpolnqx63rytjxwj9vdqtxhtfgcyrxlkbzr89f37cm7rssdpovo81cecq51745p778lhn6quj9dtvg8iel6g9n1',
                channelName: '9fts59pa4jkb6pnz3sihbhmltcivrbw4hrgtuw8oznd4as29acyptxyysb5gkvsvq5u51uvt0qzpxdkk799v0lfq51u2evd9n88pgp4ah4li40ulmo4rvucgd9n3ip099fjx0kvoofbuka5gljpqx8hv9b3z74so',
                flowHash: 'xpokf4elwcgurzj7wiwdp4tix1qeewv6lnge9l2f',
                flowParty: 'fq4665qt2ztnp92mo1hf9bd460z30oz854u2ctpm5x699xki4bftjckd8ox3rf7fgqsix0d6mqvg9vvtkl5d6ciegvfnl9nvye2lkwtsgsum7686g0wwe17subfm8xikl9vle74plhs5xonuruxnckgc755jiooy',
                flowReceiverParty: 't3l54pezg5owkdv36kvrp6ycb6i3lfgrbnbwmzj52goenhf2pthwofjgqatsdj7bmpexnn065bhucbd3al0pvpuei8ch9vy9peiyhqdul7pk6j585odeyup09qphnk8q0tv3wdn364fu1l437msni2u89zyt2vgp',
                flowComponent: 'yb24b7r7thf8g7zfj9wdyqq98pbx3c7dyvir3wdyqu73ao6jz9dc40xur62natra67pju5hip3ig450d7k3w08iuercj1yj5at71g2obnfkypqy6gpqbxzexaqpmmv8xao0hsmfelnf6ey2h9435jn277yur9ry8',
                flowReceiverComponent: 'lu2byzv0ll1nhxa7malauvgdac2a0p10ckm7p3lk6btyg1ntbkr3a9tv5w92xlny0kx5w27f5jpaq59eohvbop0pok11fb0pprye5k7b5006nujluffkez1uauq1v4947vpqjiocsoetqs673e5duc74546pfp1l',
                flowInterfaceName: '22dh8cwcjyg25mcwl9cf0zxen9l8rxlwdgbz8387tfr2q6wsodkpgsy0vvzo0hljo095tpgv80nxgemgrjgmc0sbt3unk2bas998919tc9l2w8vp0htn5mvp90yy0uysv5rlqaf462jwxs57mhlaolkri5svocy9',
                flowInterfaceNamespace: 'a8tgo7gdb9i8rnyx07jq2u8usfkkh7jcu9rfs0p8rqvpq0dmi0sw07tgq3g74ucki7ggo9jgc9mdp78j8yvmc5jjrgnj90toloknh7cjsohsybfb83a9cq3dsiw41oe6b1xyzr5oo5uc5ikkind12j48o6n4c5yr',
                version: '4dzxyt4kiixi25ffq33i',
                parameterGroup: 'z7d2dfxuf9e9g8wevgxbd2xaz50cos68bdglt637pmhpdtuahonudv63284fgqqlfbr7nvg4gsyvzxl8eu9v6w00wy4fz25dcm7d1nmue592bcizr0s7t1tp5u05dqus8fup7gku5p1028a3h1i3utlr0e4c9te4m4s71e8z1x18cekh7lytpaugp0wx92yhne1ylnrck4c7zzyadexg8h148u066yxv3gtx42b4b8l98zyct8lgqsbl6a99s7u',
                name: 'co7a2d3wh9sls2vrmf5jka54iaz6yuqp325mv5f62mwizbn4lm0i8wuzu29fz2dzshwygupmktk2yhwfc1jbnl8qr7gpzceup3oeeis3fg8t79z4n10gh6hgyzfxpa0d6tklxjy107kdxcu8eqd3bkxggswvxs95p0ru7bahihn9kp88m1130s54c88csgwb8wtk71dk8arbi5412d5iu4n1v01ijcty8ynf05jvqxsyi0o0wbzkg1g8clbwkzcm2j3ey662q7ymfw3xgfmvtcnv8dxrqv9q1e15nrf5f5iqt63xebhacm4v4dzfwohq',
                parameterName: '5oegc7dshvk2uy2akuri3jdil2f7jhigv1weui4f6ye9yswostwiw20eas4zzsmnt7y60sldj9bamcwt3knxv2xq5mwdjhc0b3ienode8k8fjdtc09fwgz3txw72wvhr1hrenn8e6zsdsrlxtsrcluazn49mljqydfxkwgeb2tojyjz05hzsti85tgpo1yim4agq7dh7qxawqrdw7w0o4zd0jsn73hf1pvquopjmmqpfrccni13hqnkc96zmyrqkt837zdor4ghwhstf4wc723atr7pvyyvgg1n01ar2bodspgteouo0xbtbqvvydhz6',
                parameterValue: 'x8903hrxhifq4b4qimn44igymrpkp1my3pszsici6sw6sae2g7wo0x2jp9ossle17e8ctoxphstnauqk606k9hwy3lkt8rfqo6ok8cbf4rj1s4qgoomtx0770xtimgwpn2l0klzcqayrhb0o15k3dyk5abfkessqkm9g3qdno99motis6u2eb1hupx8s9twmzj9xcsgenw6ijx0pfilp8q9pjirmcoe0t0f9v87ncoz5jpenjafdu6w8yr4497swm607y9uoy78ia9vud6tk0o6kybitugwq865g8eazkkhj9kr67l6dn4qw64jev0p8wp45vy66dbvx2igfq2o2ly61wv7y9ctc7ugpp92o7doxned25aew361w096r1wwe3ixqvb4n40dlvnir69z397tu6yv3ri58tuds2t5r171umtf0rvdvfq1jnmb19jdrz8f9xkmwgqhqnbtvlduamtz4qfkiq4qsvwee2ex289c6w46xgb77hxcw3zcdnl9p1z68q0fakcrt3oi31g6cafejyyd98ac1z29fr39z1a6v4j72a8jbty60obswwz3rnnhvjelkjf54pcsmpy9ed7p9nbbgk17kq4dyaorm4hfdx47x886r5mjrrwlt4snt0h2b4vlqroftejqnrgpw29g4qehztb4visfa33mmllutayfml2xbrs1f9rt9ciy1jdeak4xvvvxyh4vu8bhzl04icd9fnpdwpd3v2akhd217bobw48wxa29dcgnqzzyma65tt35t91oljq0ixc8zy0evl0afc64u8zxw290dglb4uxwkv3cnnt56qo05b7dzhqgfypdcqx5yyhbqjwuwbrcwcid271hcaxb2v1fj5jy073qdkp8vw78maeazu0p1ofrxjmpsl45988jss19t7y8un8yrsruvoi6w2fe6met429tcymll5qotinqnt2dv4amyxx3hoe46s0cg7zshv0z0z9tgn7ustvwtb4mf6xjt1e0nq8jlte0m2bftzgcoag1g5m94jqn38lgh3mo8ccir0z91r48ef8zloi4y5ixe8e14drmfzw7neon97zvhoobkqw6j5mf9fykrpi3tmzqub0p5fgh87gqkgn4oxvbh33gepb3o26j6m00uunr59q01utoja44dtr5kgvdddye7032xkg74bsnbhzb4ybimnpwzltmrlojg4ip3cfk9hdmz4pk9to2kkwxqxhb4o8qzt87hzzd9gdg1vkgdduo4m0sn3wcii5dabp4g7qf7rysvve1v15fiqv820w2b9jv6rwjjaexhjoo24a3woqq40yp07apan4nqzwwaaitxdujpes5k5alrw05g1lkpejl36js28gilucez1ook3jf7eeobac8t65afzbhaya3w5dwa9ntfjardwbgmh50ig27v6lu4c0zk5mwoyn6af7vby33fwx7twv6xjbayj6xhge0ufajrqdzw9v0xci6mkfxloyedj69z5sr6u2k3lgupluul49by8k0otqrwete34bepu2l5dpm84dpkifk6mhfpzkdm7pz4b54tm6tg3nkim26ouaj53elfwx74j5knod2pgp2634x1xbw95mbn0x3rpu1voyiuw3rv4sb5fxvxjkqyhc4u6zanf5gb0zjnoe96j6z0burxoac39ks0e3khzitxaujxuya50o3fhp7qioj40c64iz6rb3hzufjlx8bgyugtxuf7uz7agshjn760o9tqlnjd0ww4iu9ovqmn44393b3qy0vjs6hd1e3typw6xuj09snbs3apj5pbfyhyml5qmv351otugeohzp1ib4l4z1lxsgz8d6u2wcs6at8pjwg7aj2yo6p2by00o9f2ul04097bq2udxmej7qwh5dqhf8254sir7m419ufz4vjtjghyldmgoscfzbgp1pm4i82z81kailpzklezqxwc28ymcm076dhy8zfh9j1m38edlwhuz3hwxh7cdqu2jp33hn8sh5jwxzsm7479l7x3sw02vmvi5bmsdmabpe2q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'amzb0wrbfhmedcvd3lq31rw235qawfua41j2q1l704lgnw5e7g',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'nusuo70q6mh69ip563oi',
                channelHash: 'z41zzuvqr5j0k0wlhe5trlqrafbdk39yzvwoq1dw',
                channelParty: 'rzo82f8w4yaepmx5hptuytacavdfm1og0spiluagemw6cczcpj4rpgcapknq22x7vmsih3l4alw4eb6juh148r8sag6qnq0axtvpz85fr0p1vchwbtgc9h5br3rs2jfhhmla3mwnngu4fwh3qfgr2c853e5qi3k0j',
                channelComponent: 'xybvnforywdd2stf82wxqa2x6f7h58n45zj7a9so5a07sabesnixskn9mnq76k6mbx6c5sz25eqdtmgrfvshbetpg3o1jnisf13zmsgbwvqajvl7a2z4d1pps7p6svmg14g8vqy4fllwzbeodux4bkbq6eh66hdv',
                channelName: 'iwiytonw1mh4hy1g7o9gj1dohdbaohpsp1jblrkt3wge0jw3pm213yb8z3txg39gw4dixtt090vdhw51mcg8hu6ridd7mvf46m5lkplsriwjpntz2dmbedc0ifoi6udbi9yvbek4po4swnxxuoaah86ci6dqgez2',
                flowHash: '1q2tcp1gjfz7ek4twzegjh3h8u7yxgycj1s3ck70',
                flowParty: '0w191hu8lw2hz0nu84gm9npq2jo4c1z44so3mnhclv872g6ej04t6xl57ee2ngigsk1xyeez01y8h43e1ufakujfwqhajedtefj9dx9izvb8dfylvt8cyqmego7jtr2w3611d4hr7ohaoinj9nlla08c2j35ileo',
                flowReceiverParty: 'yncv61yck31nuu0xaat8k4f38ib2qkej46gzjjg83lqezaz70zcjob85obhb2r395cozxnfifvuhljopv3e6mmi2qdvy2bl32zhf8htwgf3l17n7lwcmqyrsuugwrgu5egxvtikxgfmcn56949uylcevxnmsovg3',
                flowComponent: '8hl7n0i8q31vl0er3jikilwbew5ed848lu2ezpncjlesgdggctg6duou58olo9rnc98r53gx2vci6om5r90a0hywy331cgkfglodxgon85yqm12qzpzo0gjyi0cbvv29s7ip4uiojjivb4s2ffqpbjatcb4wdxjm',
                flowReceiverComponent: 'vr44tgwd2a01gzffsjb5w73k1dl8y4h801u922xqb7zt6cp8s65uohu5x5comffed2zr1foliae2ncr4ncf2qwlxg6zzh1n3ln10qi630qq31nv2h9wyft2dam6kfg1wc562l9d2u5133rwukc7t0ixm79jwtv79',
                flowInterfaceName: 'nfi79jy3boyf32ycozmaxnvcrqxf07hybg4m98arfc8uvai7oidyctkcrlx9njk6le97rek2i534fxw0uiud0g52u6sxl6tr5jn6hs8tf9aktve880lca576dptoasel5bv5sstd6wbhov2r3clshjpzocjnlo3b',
                flowInterfaceNamespace: 'td83910yzljifgomtkbxqlopbeoucmdwchd1r46tcq04g0xd919mqaus3t3ur6drs04q2piuztz03ec1wqod41yb1zqa49jrtzqo9f4ye4w8qtg2il2o262hb3kjte8zmhjsb4q8hqrt5vksorqwjs4xefgymz91',
                version: 'gjuvanlfpz0cgy76o658',
                parameterGroup: 'u9y5mebvupeauybfmf5djz0782si6jshg6muq710lm7g56dnte5ze7qoqw92a6o4y05606k1r0zjpsipr4433hg0q2xlypjpd4t7l1h2klcohcnvyqvav1fl9gbsyxh0cnus1kry6s3g68hzfnvg9im73fokek965dvn0o2zyaem7qfyzseca6gex0l0zaakcqh25m4o9vikxoxw2qde32rh2erkq9vbf07uiezli9rww8eoh12f7ek0kggxlmb',
                name: '90ygm0lluv11hy7ro178f4ek0bsl1gp9gphwvn4y05v4ny4hv3vj0ust0flggl4jiwckymofu249wm3lzqmucwymuwzyzj1939x3fyeed81i8ysstciw31zy5ow8l1yuvo2z5ki7ra8izhz0n1lotdyvkmdgdwdxo0rkabmlb3rd59dr7ms8hyz3bvih0d5iarpz0kzg9vpirvho2t3jf4ethirabk0rat2vadk84mfkr5yix5roq680fogyh2hlq2bzdirw8n01gr7ptsqc5pb60fwgu3qx4w2unf5kdxigc3p25jpzuyk3bgrfm089',
                parameterName: 'wbqogg07o6w4fbxm6711q5ylhz2ywdiyr8i5j4j534grtv7ub4pci65q50r8mpvheq79ilc47uvxxeqksgj9f0nlkni49m8vgxp43w1fji5azdmk9e1g69v0wy5f6lmrf0ywp2zqpnz1mloj8wopiityyhx6fxeg1r4852movfenqazr0e3mxfhi0gl7734ksdi1aedhzox0ttvn7espvsg0ni5hrv1i5jmr9lp3aw3ldf61ofl1rs7qrqeoo4zk7wwy5iyyn4cg9b7iypkame4bznz4q4l8epgredy88oeoczituirdqg0yffmyynig',
                parameterValue: '0l32drzusouszxihvnh4jqkm79gertuu1ij98m1ab8xmngj7z6a8ezgsk1084gsepn2b3ga810xs7h7kd8bi42ugz6m11llqkhnb6196rzq97nh5ng2a5cg7b8hi9ipwilz5jvgsgzxe9mybci98eu0ftkytbq7n301yoahfcmbb0d19gtqxx3uziup4bzq2mw1xp46uceo9f7syl4b2gndsd6yvinn83wcw43llttz2xbq2ct69lxcvsv99mwa3vc8yp6oxcrsxep3bbqoy25kd5a7ejsozz0q8ntm4id063ol4z54hd3f0ne2d6snfpo9h3shczj6avq4p22agtlm6d4t8sitryo6x3ynmm0tf0i5gioxj3v6jaaw6kbq90jkmewbsmj9fp432tj7fkr7f7m6pjamjvgkkv4ast59c4xxtwtpjbzllgj377m890tmfludrfufndu2ynykrv87cioed3dwlzgixbdutwuyyik9hkabqgldc3tuodoebievezaz6fti8xbjwyveiyc0od4f78kesyq5f6rh944ckixak138shtp03pdoruhl8horwjowiw7m9bc9h6org47z2hkshcoh8obwqu89bq7kpeeand45ax5caw36qwjzbx514tx1f8ytxqsdv2rjds20nq0n4v3orgw0aat9mnopck0egxqcxbqffsmiqvf5s3etzarmiat7f00dqektf8od4515lok74i70s91txeftrmqy6gq0ydpza56kaftz68886yp08oovxpdfgqlctj73k9pfey0n5ptrwtu3uant35mchvx2z3cckzo9wmijn5eje7o1jc14gknxoyevpqgqsatqcjpck9czeq1cj0xiiuiqdbhyhafkr64g498slcguuv0zzusqp2mifz73by200q3aj85ootq4qwdotwveuwp978oqjt3izp7hx9nve7dgv37k3utqqbk9uoruyad48qwfs7c2cagpmhqshbdlmhaeawp9x40sd5h037xgkunhris21l45ftubuu9ha5ehuh79a0j1p77x6r7rm3ymrusnu1twp3oofomw54xdmuy9n3c241etx33m0zp4wsmoarnsiga0w6pdvzcx0ly5bx8ls1da7pl3ixlvdn7lf0jazvbo0qrb2eitbnkv0e4wkpu6qm6w0g08v0vvk80gjp9u707rbhqzw2mwz05sm5m5hnk2rorynlgfy6glxlhwkc23bbtz2ftr1b7xr096pwt3dbsquo1jzfcst8zerssobxijv7all0iiuui1zgbxvusa1wc8le7wofnbfdvs4op461qz3egaxqk2e5ozqo2251h5kk0gj10gynzimdn2pgc5qrm4y4iizu7t8prcizoska45dn7vteuyabuosrcd16wniu1rng96yqknh7hfcuw9m1385mdnck7239jfptnic6lgkgs05f9j8r7zdvrivlr1seaxqb0tu7zfthlxtqd4b6tdpm180qj1x93hlgkm61i645x00xpkr55rt4p2gl2y2yrlksd5f1d6hhheln5anv1cb69w3qjwiluy2yu6azp9v8l6zliohnizh0tzs7wffruren0zn6in6owcar67ds3pqpjaararazkzzhyonzlc2qzaro20kua7snlsy3bpt36jmrpqwuq6lsp47o36b8n9lhl1gk73hdmsvq97v0t8lkx6n9c5zuwelq7jjon18n8r9xc1ie9t1pqm45x3fefcagcb2crin3q87zhtz5vo4yeszy7cgtqfrxmbaqk6mcswa7o4njhtmt4u18p0cnjk24to18uf9xqpxztkxzzj4aos2xfjs6k9a7qkop92aazybf1zclsawdtuagfk5dpgm9xkgrxerahmjbj2vy3ucseiuk3609wocwv6bgxh8fu5a04q8of25vyhwo6jcnn64mukp52q22v1zhgmq746xzvknlx7hnu35ab0h7vta41kbbe3oth2zxrz53h8p77zhfuvjkht3grikai9jb5o9i30xjvbk3qh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'cgds7tagw8s6wp8o7cwqvdcsprs19xllngteb0uxpp40kpg6po',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'pa73ubo0tpgbyoefwii2',
                channelHash: 'oqhbco84oaz4aj1l5xnvqz97yvh1c96kqxmzz4fh',
                channelParty: '7hiuay0osgtnipqohzvl1qn3570j5dv9naw1uqqmx8m8mu83z8f9r5a4wwxf1e2aod0qxwwoj32lxzxn67fyrj5gq8mbmavn8mg937zxi6ary2oxemr70500sfxu3ry9ckki5ynbku4422m0fzxpvzuwuqc3pcty',
                channelComponent: 'dezom3p48xkf0ryj04yrpnpmqd2zn0c84x2wqun0jke462emhh4hf9eqb4t9i9zlip52x6tukn8qmg3u1zo5m9vy0ttsabajoout58abnnbyca8p0mdkzmnka5l5yppe2knn2qgz39anu6dyet1cdwxbrb33hrt1d',
                channelName: '8izkzxaxntvq99mjzcychc3ta2jtm8zcx7lw1co7ts0azas4qicegzaqnaakwh949j202t1dxub7ej0lvth533n23rzfvsxdnrp81fm9wo0gv77m1x2ll8ap4eaobydakupqil0jweo7oo919gvc835i13xf9hxt',
                flowHash: 'kuczflgv3irt2xni472ua8hqum6jbk75wz5uss7m',
                flowParty: 'o5ccz1zhr9a02li1bsd8awlus7e4c2nam8rbubieya68vldqemhbj2jtgt3osx6glmezo6zxu2etc7ttop3mc0kg6eu4tvg0igy80slr18seaj8t5tr55sq0wc7wq7yz64jkvts26wnc8lsdnqlm9q418g00lcrx',
                flowReceiverParty: 'oozsz1pj3s01eksffc83oj0snjv5in62r58c0tergxcut4mswx2zkbt7g17c20f7g6enwd5wy2r5hhcu6ehdgoqinfq7xsuqh7hbwzxqxuzn8iajcnuuprc4s3uo5iw64nbe6keycqake1arkpzjaa3sk1i9n9z8',
                flowComponent: '8srlyz5uwp2n38umyfsv8axuvlk0zz7aj9481i2nq6kfsvupndtvosukm5z6megk0o2r1f8u4bhvrzfokdfv1hox09ggxq831rrk5x1hg4mfz8eghvqqm4gg7onznu802dkxq6dhikhlvea1egiwu4eil1x9yemj',
                flowReceiverComponent: 'qcimxyefpqj5d6yzkjo3d1z7vant0ivaekfr89wzw90011qqsccfrvvg37t01himoi0p4ml6ft3bg4h44oxf3zjm1aep4t8xzh92xk5f10whhjwcigto63wa0lcp2i1gtk1h9dsjs9eyrwvlfjgpsjsovp9efd8i',
                flowInterfaceName: '71q7ieu6iw28yl7jnxz53xn4gno1ycfxokjx1x7i5eeh30mby0c5x3frjc1we15s4w9gvr9ejhgvzks3cszxx27c16zbwt3fzza2u9q5q8e7symix62m1n6thx36gqj1u1szmsg2ozmpntb6jiayshays9tkk1sa',
                flowInterfaceNamespace: 'a18zeo06z2b24mbegoxcmyoliwpz1bgk4ttfcafx046k7lk8owiopmeji9et21cvnwvkqz57kxsbfgjomd4bakxev26hl03ybdvkz4ck7zmyj5ef6cbtsilt4ti4skmgln0sh9pxyozme4u9woufpwc1yygu9cmw',
                version: 'lsg9dbbyf985uwuxo4pn',
                parameterGroup: 'yq2u8hsjgr054dbv9jlzh93zrkk9kxnpirpqfuyot69i2f3votx3m6vjlkfyefjmd0591tdwf5m1qg8jov0bl2lomwx7kgra1upnni96bv6yd151k4or61d04alp46xsb8udjc6qtcigmahdonff0wplx9yim8lhm986905crhvllez1yl7z4xijacafv2jn1nhz6x7bw3rt1zgq7qeiqpnbt8jdyp2yz9iy1ph83xyb82w3f4j609f6mnm6q8y',
                name: 'vwq4ripjn1wk3r7gaed29gwrlv3uen8zanax18ziibmebli4wxc5agtjqlc4qw796yu4hr5en18vqedxbvgcjjor7x617g4c6zw4y2jcogci723h8oylg603eh4amftmzcqvbdove833h6d8zlnvp7hz8rppsnzn1quod9tsq9r5ix1ezmqs7na7sozjt06k8ud7xlf7cx7ld8rrtn6qdemlyxngwfsh6cnwk1gsq8i4rtnkb6paaj85oh8yuevo2rxij4u4jv6kvliy9emi7zaxz1b7qvpdrh7ouqds6q0z3m6zlmyoc7ef2fb3vnri',
                parameterName: 'b9uo8qau6ghb4thmzpn6gexvm37r2ow2dg8euhoq1wczhas0efe5tfbo5hlmbl96hkzzrnn9xwbs56xmaosiiwe4weeica82hvoy71zjccsaety16adrlahhwl4jzq9qp9s51fxnyuebq84u1tpcmfdrofpndzys3w9gkfgg2blirgt9nwhxttnvlzyhcvrcf2t72lshl4qo7wv10kqofe0wrsarucmjvdmggw3a3gx5ww9znlvutt3jeofjwntlefhiacxpp6cdp34o74e1hhhldag9ui7qp85nzf7s0sb7u56g82njc5i83y5xbm3b',
                parameterValue: 'udbgmoxlihmf98qe036r2gogg2tg1ubqt7evvo2hip1opj30k98qxl072pkc0fuf8hrlw73x23wf2wpo2vuvs7o925l85ss4svl906u4wg4uc519f21wc8zimv4t6bgm6mg55wp80a4q19z0boyxvk9eph6h6rfmni5w1qw0oe9kbqzgoe5ov7se7dd7tsz75c6zn3o42nodt6883glqm6tz5ozs6cl87hj0lb068c66j702kp4n6922gu640e0yuu7gjmpk0w6ag1joz8uxi7sbvh9qtxspvxql6flmyzh85ic6vpwd0xakxygnjmj3ye64pzrafauffsof20t8f3qs3k047sbcs5x11epfjoj2b71k2w78xapelvjzowhhqht2s2vbf7zsimruggu3n4r1g8ki10fdciuma7e61uqvtkbfytae9luzybfg1az4m451n9kn19ytjwt9xv9u87u0c87cr8x8yhncnlcoqcf49kbi89gn1htfwzt6vj39aoq7469hm2fuw8x4lwpflni5gc8hetnsm8z4g6p2pyb63fidbir64itwatn29epvsx3v8fvwmtu9dzjp9un0wstvvkgoqp7m3pt2ifidwj8b9ap6hzx2l690mm0xkj94vuz5cemaerbi5azoss2od82fwh97595hude4yw29me0qewzfbnp4fgmca8ao675q4gg9pi2vhsg8rhwq48lq7h4es5fu44wpfgzlbl3oj7oygl85w1z2wweoylcenpv4bq54kfbwhzfmthw3wv01ycmxg0twtqgc5709snsgwdx2sw1qnzxo49t9xy5no44e22twdb8qv2o0kt1kmglzav033h8bulkz5oki15l9e2trwxf645trugdnqbx663n83ld5owbnj2ufwyed24m1ji1fc88p8kn9wotoxrin6ljwtllz6jcmeyx67xbeklx7s9yvo3xt5bjx9wbfmap4330eknjyckqavzvnyurva81amyn9w8tuuca39f18rrpi5z6i9woyk1tg9zvbowqtro7hlnk79obbcntvu8afwjmeyhi8ppufjfcc8eb8qsh9f7fhj4ad1591w79fsylipnxgme9axknwtl85kjnc1qjudb0l0v0zk3uencqony9j81bk2n4cl4pd3yihdhvuent68uymnuyj6apyjko3wmvu8h6l137hbrscwm2x8ike0wzgoyes4kt6dehnnmpxx5h0a3xbwrn99cg7p5h7h5qm6o3hfpz9vryh0qgwyxkjz5sj9sbepvg89n3rt0zdeu483w6pdvdp9i4ak4yyt8v91rk4pp2bp9a1r9lvky0j5yrg78fquzyvgqyxtcrvyojfpqh88t2njg1dsed2ykt1aledb5c62bwlg3dwqzvdstee18ptcdm7qqzb4ixhs94rnroiefpgrz7f2vpr99dybfx6q674p71othixj3fzqbsatptr26fbl797say1w4rjm9ifrylg5vh187ogaxmomrujh1pm1xa8pr560r549s4d3j1wxgdpep28hm33v7v986we7rf51t7uqgj21e4hqesk4vdj8bwi4i7zcinueivxa0msfiyglpcim49ksgo7y4kzl524shgc3to1fwsy0wotqcjhqlwz9qphmrurz2kvslai96lryr5crquwcbwatwx9vvh0d3j26d27yecun2iguzj5nufnpa9z8lm1jj21qwkzw6bgafcra9w7aedqhpfqno10keue61xua6dvdmwct9ybzfs96lyhpi4my1wxspocgxea04efxqiygi1zayljjkdax49vctnt0j99oik121grobfsjg1qjupyko3jsssr4nqxn06zmkd3oklnsm2bvd9vkrc18es03vraf2yd8x91mojj71vjru411bx3jwhqh5i9myna9wppxayy5d8w79h2gvlb16wgy7md1ofgjueyphjbh8b3ochbodtdddzjw850k8nladztrqskgzyumph6r4b8nuisadea7p0bfobnl27935fsxngm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'n2rrxz09wy8f1f2aor0j3b5lcxt6o2wfr2nsx0rgqz4wdkixmx',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '7kvg9blgupa5vb1ueymc',
                channelHash: 'gqn3nq11229wiscj98p29xnb0nmx4s3ergsjj3sf',
                channelParty: 'm22y4a8afnarmnxgdcgxf4zszoyyd1eim9ayg4idywmehcx0n69l28pzyi3yd38dw44gcmpcqjm3bh6l04jl4bqt2fddxaqtpv9n9klt4j4g227j0p0n46pdx902086gulf7qp1de22gitfyffty49qvfv0wfjy5',
                channelComponent: 'zajco2v75lg27dgi5d5bou4x2herjmb4ladhhku3fo74k2lr94y59zn4u12lnvyrmilr3kn7d5geb2hvsddrom0mw73b1xtnjg4uh6iiyryjcxuh65g64i5rcn0qvdc2rv16gcfy4okh8fntrk2g97e7dx99g09o',
                channelName: 'aohv0jbv4nk6a0lkxp6eogdk0nnbytegf330gz4m5eitipq4fhlsxdlop9xj391qk4t608sg8v5y926fpnyc5zexavuqe8ymvp4apts5x74r3p4j5ntlw349jgm4sk6doz61q9igfjguiy6vo0vp815ugt3rbo53b',
                flowHash: 'k8ncudihyk2mbc171f9491mj8f24bvgfg95qfyxk',
                flowParty: 'jstc3w22z1hdug2tk4lycthu82tslz6hh1k36nl3i49zfb2yya656rocr1hxmhie1ek2le3qnofo5r5yn9dogyotmns6wwug8worpp3twclselnrmn7ucdvs0golitwgyfpyx43rku9uc5ppupwu75xoci0dntlp',
                flowReceiverParty: '7ur4xaim9qwqizq35ctu4dmf0tzzsueupvnlxxz7pjr6rnobjh8m2cltjvb4b7hutri1mnc5ilkvnwjjtqfy5yo9655tpcd67meim0ij9f3v5kuy7jpqbllxze4ejgxrjmmswpcp0z0dyg4l9vp7rb4v94xbwoiv',
                flowComponent: 'cooh4ne44z8v2ombhg5kwy4ytvzdv9p4npqww68jewkvir4x23ixnx4845cd12qvjp05bbx8ip2hlbxm8zc39wcg85bpp9mnefxe9c8hzmfthu8w124frubgnliu3rd81sr5no8z0v97aj5kd58ayg945mji8tw3',
                flowReceiverComponent: 'ljdm0nz82ygi1z712ytfbsa5n6pzmhitz0jelbd7qxzbjqtzofy6cxmd8q60melsxpp2gzi28ib2iji7jzk8x65fm4flnyvssd7gu8x27j56f3kfsxrscrox7lfn1gz0qp3pt7q1uetyf432mqiccdm9uvd2yxco',
                flowInterfaceName: 'ey9t8rhsr7i3jccpnozosff6jbwrfimh67pu0npq9gw3d3rixmltjcm0c1aor0gx6ihu9mhndlqfk8onwfzw772vb3t4po2x0si8l50kgoj6r9xa53sxzdxwlk1ya3lskgoa7kx3fryhvhzr9lrw2v0a1jfizj5h',
                flowInterfaceNamespace: 'ftidowhwuuog2xjv1drk2t6u0oyiejcufy5uu8xwr3hqjo05e4k7bpvw1vbqs6p9wqmot0ww1g6juozunepnvzcu5r0eln4wqhdwhyanjzco8kttiqf5ycrfgg3fncqunmnw79ydknfpq7rfqqhvmskwdmk2xjcj',
                version: 'c2p354ndp5710llsf5ae',
                parameterGroup: 'bs5a7v8p4ztbunv24pun20yyh7ymbkzathqndlm5frtbogsbizjj5azzixxs9maxjfvpfmbmwkrptojpovcndlh5kt3v8z97cyxj87sblcyg220w09gaxwqbewmcdrpnesq40wky28m54pgyd7gvqupwkdpvu7fma7ea0svponhnkou52cifv2el72cet1gycz6r5ohvbjj6w89fdfe3ivuobsnht2kahaq8a7ka7fqf2cks2aywrudcikjpgg3',
                name: 'pgoqo6ii21e5osnikc1hkyg16r1rjh2tgxhmqoov7wf6miy7b1bf673mhse2i9gy2gnbj13en80kcatfdwsecxkws67sgi306bl41eu4bjjbu7hje8aohvkn13aj7fnyxjlv93qi0dsd1dpdq0r21wmvebjgw8ossba3j6pgouhoanme48em1cs8zcpar4r1vyfx4b97qpnvc5gbuhivsypszeao0u2h259pncn2atvejn2i2uixv74j11wd8c824hk3o6pen8fel7plj9rhadf8ngndeyyfp1jbh4lzskmvgq02dbymeotiwof9g8yw',
                parameterName: 'xbnt916zzr8jkh92orvfxynan69nqrb4y1kkziu8etrybhsyth7nyvxyw6kgja8xik2ddvsiokxnv152q1gcn2yqtmuijqs2u0m0rjyh2dzoe7xnsh3oq9zyp3mipwqap8b2fvbppyurwx0f1bptfi9hqzhojkxmo05w7dba58sip2885a86tdhwq4fkvu3gl83out9ehu2mgmbh9yux4yy7ldv427dqhw2tuqh9n09qfocjbfgalbaike2e98ppg61yy5nqbza84thyu68oov5j21injpcuyatyhuf947dcavwn3a5ee8f1h82ttvd6',
                parameterValue: '35n0nrispaov21jw418f4pqm4mnqzeg1hll7ug64lxrskbcd8p9nf1kzpc5f587u7vqs02sdb6z9ctngdws9qdcl94n4k5hblvjarvp83wxh7521ey0ksk8t53a5hizumhy93a0lhjwvh1n8xcgeue3w6wvbii30o694a2bu0w2gcy6qoms24420iwc8oq1f4vjknh5geooez5nuplf8po5s9kee9nldq3ueorkj6e5f3x0txufjx2r8eml31tfw3msr3w7tme2xq6d0fdo7cu4cffsbizwv6qs2t5kp5059hz938gneo5krgwfsxorvi19mk5y4vdzpdyznz4oav14sy7mev9mtke5dtbj0116wpf75glyehpnj2luopw4a9h2urrzn75lufjlyzii0qzjnhtd1x4d1jpu6nyf6ladzxpjenttoa6g79uwop4x1wbb92wt0nv8l695x6laty9gdjvemhgk5kpp43ihk0qcx4bnutpnopcxr4gleghlmdml5q0pqsdljbyrxrit3436gpr02vbtpbgspextc22tw9l1p1adl9pwp456ivqz7bhv6gspafibwqaamoeb8vvfig3av1er1rwx6xsfqxsenwuav3d1eoa1xauuk0cyj15gzspsytqvcft15pd8r56t7e37grqb1b5dmz28r5zd836sj4oa1dcx7e9ryey3b121sznsyk0wlw34b7xt7sl4yyukaout3lgz3rfe5coxx88m0q843x3ihpu16z7m3m4dbmzmab85duju4d1xe0ersrxn3sfnsygle42b62oycxjs9d7r8us8n5fv8ylm5g8s3dbl9xlwzc1a4mnxc986kan7rg2q19jba867gdj04hyzeoeu0fcxsqx1k5qopltwvs1o9h4b4y8ua6oy0rt332ydtb93ctwapltamw9lxprbooqllk21vofyto9xbkopguw72o0rx9lb0a5yrfw7gncnoqh036fwyt9xcy8s370y1f34xgx05xmhk32rlsupvvkaxzzxambvxmuawacgl7b61qihwz5fotmapw445nrxknnagivz2p3wplcfh3m9h1uahtkb6pr8hud2bkelsw5gu0jilvpx34j30zdjpd1x3p805e6pzt27xaw1adrf2qvymr0sqs9976l5m3ye0so1ytak7cegenj253r17nxghsbcnl2otb91dgyb2lpxbhkjcx4rpgz44tw7gj2k7yazwk85fpkqj275lh03ab08a5wkqyq2tequs2zhhp5kg9q0y9oy8y2vbcxt3ngcz7xlx9xye8fyrhky06iurtwugsf7gy4uzzfipbnw3ool9ihqtem2t76na1hvberzibi3ydaxjnudun7n13d492s3j256ejjcyvhn7jxip3b32fzc9nmhvjlireave2aio0s0m24ubpufa95bypwoxkh2d6n5sre8zmyb1mo3wv1ydtet9mqnzxenrxgr3mqskgrehnqgqwd5w5ydd7q1g620wkoyaszkdott0jwadqc6z1sw84gl2zn6ftwskk4la9m9oduafjfb3lp2hcgudl2ecodjxy0uvrpbfpatrgvymlfnudze0khgh9migzmexbk42uyszya0zot5dj3qugncb6xa0vq4r5mlwsomjiik7krw2yssye3o5fg2uh21zxd1troqstxz46z1eri17kql98mdudz2nz1149dr5n80215osnvivzya0ouxduwixp0x3e4u6brlx1880toot4rkpz4hon3q2atoa5n23z2z1gjham67odwok43fsih05ylxh2phi3yvkhn6bbh556eloponvmjp1u1gkk98l48td3calqfirhpzbhl8rnc6pvxc6jsm0mwubzyiu2b8j3ysasmgkxgycoxi11yxy51ryie1cwgcful5ckalc8cf57jviv9olm99nxg0an8zx2i0gx97ut62i5sojzf3klqk9x879ty2f5haj41dklew3kemuq3g4wyed1n3xd2ob5d01bpnzkygfroll1qc2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'r9v9es40rnxq7ec6dirkhqpcnvcnv8q35mkm0r90b4xb3rfs4o',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'is2hb2g8zwkfwsg2x0ez',
                channelHash: '6e4noj4rngwq2cv1a5pnout8jhqeq9newwjnq86o',
                channelParty: 'hi34y6ap11ke43nkggexrshatjc4eukm2e524sx2f0uljc82tdpwrmmcd7k2v76cdpfl4fbxbt0khxz3ri15xw0l35w6zu76zy3tnbk344u9cbcv7phtt8j3dzboge83ez7wove6nb8sh863cp1toks6qzgr856a',
                channelComponent: 'vr6xyfl4w7pm885a1t8trohd1i050ysv4x3ujaw94hzfielinyb0thy13zrpojr7900prqvihz9o3xvxmjr5ail7tproc7dz3g28j0twkpqy8ty6l49fulurht5c7rflo1qkvcv0dtqcm9hhl99xtyxod9pqmmcs',
                channelName: 'tjvhddxgtw0zh3cl6mbphzhzmjzmauoct4zr6nlo7sbdg9yxc4rh83qk651k0owpzi87zjy8wb7r0ziz54lacvjlhr6mrf608z5yuvdaxm2h1tq9d8yuq1bwu337h17rrdt8soca3oghhwu86o01be0phr9lw5j0',
                flowHash: 'm64hzuemokfx7de5v8rke06xvfc9ckmfmwfmopo5',
                flowParty: 'b5br1ww9fjqmh6m8izjwu59kbqolc4pgzgfwx4u58h6gt1e2drjf9431szh7ahmy6ci2vaqp500ghd0qdug2m9oxr0w8vu1hw8sdtpuzo516wagc1d9p4ifwqk9wnt9kqa48okac8onl0sco5jcx3wsrnnnr8xnu3',
                flowReceiverParty: '2u3ay942aedx5tgnfdmuo9rtcrbbm1xybthch12drntphgjq55kfew1hiidlstr15cvw51mdihxbejz9z75znilh2ewwz4f7wb17l4lrgijkd5tfu52ja17ca7m2cipow8vrm752zl4thu6u67tqqib24cgi3vje',
                flowComponent: 'pm1b2rwu2ejzl3lrjxc1mxr8873p37dqeiisd3i3bzqbqxx11oskd5dds0cn3jhu77qlohee5h21klrrrrj0xhbx3dpf10guln3utxpp6wcqv7vnhlkmkewt3dsya8lhe638wttvadqxg29gp9z1v67u79uayy9u',
                flowReceiverComponent: 'q7cr22g0w2nh3l1xp248i0adikgi8qh60h476n8i2fjycl154ecmbqcexhafff6bhui3hm6kqg94lmthpvl44635n96f3zvy5mt97rxejfkgbsbmszv11gb6603golz60mwwxp2uifkwu1ifue40cmkxfwzzjqpi',
                flowInterfaceName: '5cehuw0tv0gojlavez7vf2hzpgcbx3mi2lf73ht2oj4m8p487am5xns5kro3k544zkpjlcd3wwzn93buxxmommsgr1om6lyydz22v27gvayjm91fl5iz9kovl20i2wi7n98i5ogb1v0hsov4kgdjsyaj3hs2qufs',
                flowInterfaceNamespace: 'so51ntzcdpiiu8ktuezvlgum7dafw5zjcy87eumyhqjoweeywuni7xqtb6ddz9yqn3hh8amlybhzva3cx9ulz9s63d8oeiq6xqfsueev99pd218p1n9a0hfhheccd244sibdgixkn3r5ngmlcuy0astttwumwv8p',
                version: 'm6arax30vjoy943xn75l',
                parameterGroup: 'xr6ghiwdrqj2jbvtear4iihv4b4ore8ywe7xml621s7rpi7hgydfzvlxj7fqgfbijgu8c0a15qep7ekdvjwothedq0nd8nf5mvfpupslwv8h8xerw0vuh7toxo2audrqgxzjt0qmg24agilxbuvvffecmigyavp00vpkqx0kafinhto3g1moz3bh9m0cj0qfv7ktog167lsy91ooyrbw3n4p3jmledb9xjfpupjqits6bc8p80lal7vjpaqg8ha',
                name: 'vk4l33emeu508bmxkbbtfdavl9qytwldw8w8f6kvolqa7vv0yp2mgecd2bhj0lsl3vzuzj8k5sirgrm5gj07pd7g71453durq5b2z4e3yifcv21rcwwyh7pp8xg9ef433gi9nnhdnzptia90ty4o6hm9qqzs5n73zlwmcv63sccwrd11liwvhh34y5dk97dp93s5mcrpgaq52qb5phr478zkpvspm5tn7nth3lhd9axcehn9khxgms1i6e62yg20bdqrp7f25sjduzqrjxxehfv5asxyh84dbtt7qcr6uo60pc68akc0suzylkwct2e4',
                parameterName: 'itki7wqz1yr8fe057hh1idcezb4n6fim17t8vbhy4pqdweb7y0ypb7hrtw802oqh8to72f8etf3mce7fl1fdih36w9p33w6uqbs03520wqwgaqvjlj2nvunjlefxbsabgxojqj8eo5ij7purkhmw9wn1wh7fk430gb3ohjcmbi3hk79t50fe5vyahst1l88ppbs851kobwf3raphcp7d06s1t57wrl7c0qxc71fxsghj8hbn1ir1ryslsft0xchrbcxbi0s7fzl257lb4my36ibpjiekab0rs4d1jlj44562n71ovyy7qid8zyggy08v',
                parameterValue: 'obg8v561pkwz9n6k6zj9lsxnt8qrcg6rfs3dqpfiaqrm31lnuw4xke952g6gwlmgjjsvbo3r609huvgcjxiibqg9k4830qu185uzc5gw91kf0medw792i4gdc25jf41r80i3lprnercx39p4qwuqfpsb41bbzmqyxf7abkwrngsramp0ek60aenxfw54zfd8k7s0yqfd8iqvn0h2e73w2g5x8to7r0qipwjt0bndicaz8vcclbzixqoripuiauhcsens929n3fjc967iypz8kx4osqj2b6c631lr356phh89jrl536y7b55624tmoo8bgd5q7ewlvhlx9mggdlolb8aevz1z9zcmf6kiwoer39psyjnlwfd92cbz09beghwspkkxfh6ztzqs3nbwmaa8vgt5qgr3so92firl44e78xpil5rto97q4ut8ppbmpzz9tza4ddxb8sl2kelx9oosjpw36vjm9ncgmadox9bo8sd1gqspcdd1z6skpepoq5ojl53zexfmo6bu8nu3yvkhbyj5oqz15ffzz9rxwipphnjbw2wihzel16w8tu8r0km4fqu8hdor3d233cr24lr011oo7ejs9oy4f1xcjh0kjhsjc6lh6lxfkatprxumva18qy13wdlk5pow73w4g6u1bn9d4gg2t9x2mabtmzue7p41rafifr7qj6xtoec3f6fqgoio5n8hlj5p05b444khyyvvl9m1sq87i3hwp85kwn03y9rlqxnk3lv9feu80cyvc6ij9k8e8e1vtfwg49uadufkbwx1yulo3ezady5fdqjakvjz5p0w0uxcqgje2gwztsnpmj3f3at7q4t9yblx47ibs3gf1lmf4lzeo8edhhnk3r1f6xhhmyp2xdik48gu8dggchxwpkvpp1ugk9vt4hcv71kjeomqdibx0zdqbc3ozlrrad9i1srkhiergu2efquamo7q53tu1pm9sjrz4uqsy2hshvm7mytgk1f34apm6lt0o88zy8duop1npl1xtwmeuff2e1lbxsxs5hooyo00wc7ddz3txob9yrgu0terc6ypirgwywosi9y1i5upreiuinz214azycrhtv2kv9gtlj8stdg80szmuyldeipc40q09u59jorvbo6a4j9gnyuqtxmtbd2x16eixa0znbixc6zv3lxsa5bi7jpy1hns1a7vsi1o7ilhcy1u9p1vfqe7pvl275lu58wcemksn37xa0efflkaftt9fzmqgiykcy7c0tf5myzrj31ouac0z5cqw205dupk3iaz3kqgpw9ok4byxx72ysp6irg2y1a7st8q1fr4tfeh4xg9mqqlgj6ems5ngsvaeowmcvh96u73m0740rpsknn3m88h4d7el55owm8ijfd89jdcawld5me1a4836hsmsvhrtxy0elf747cvy0lwb7ycvggpzpnpq3rmaktvfhr91zn9041poa6p05z3r4tuz56rbsg188glr91xww8qml2jwbtz4vikopranow7pdcue8c77c7ojt9aackona4rzfkjl4h6pbjct4vujzqeeh1fe3nrdyehef6wl1ghu5gmarl7641ibbxi2zhwqx8p6epl6u5xpax1fh4ospi0n476y18safrgw0jiisjkbbb1tpmmqx5jfmfzvezzfccpgjly3uf6btcu8upf63h4rj218m6g75nzhklmznr4k6vztcfl3icaax0bcxt9laheyuw14j7lll30ujvdmapvvy6tdluzj4u7ga8g7vfbm0j89w8bf22g9ttwy589mrb9xdaw8vhrrk8t88jb0ajcki2i0eeyx3nzrdexmqiyz579lp9bmouns8cp5h4urq0d3la9hxdng652p4khiqen39cvvkipgsp9qv1tbbn4uis9ntvhkrt773sgz2wluft9up60j3rll8i45a6t7ws76sp302im5zwou3opku2bjkvdc477ajkdo2bcoc1yx0auq5u16pwpyyo5nz70f8h2utd6n0kvpwk1i01pxlb1k3ds99ws3vho',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'o6tvi2ydkiuhftwscppzx2iw74lxnq78cxun8lfgelke206tw6',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '5cfwca3sbo4x7ypdevrn',
                channelHash: '13bugrwz3tlgtvcvbv2rcdywpk7zermjj7w75r3x',
                channelParty: 'qynaafhskqzym0rdbx4i766b1uh7yao91szrny6o1t704pw8v0ca3d4b6bc9lrdzm5ju0sjb0170a85ktsdek7y80nrbu7zjdmequa627rnssx9o8oyygkw09ygq63af5vd5vqydhc8bsmidhwfn14axztjfyh5k',
                channelComponent: 'b0u6gpyxh9zyut5zkd6arkhxvs30mjaks9ga57rcwlf3yszgopd3p8q3bhiasgag8zt3cywvv8n1d99xglq8882v6fjorem69t9lwlybjit0hqp9rebssh0mji2mrtvqm0oggzucd38wilzzgjad3q70tl98dzol',
                channelName: '2kbk0dyuq6sjmd3lrhbygdipyih1nmiyitxdur3oyisotjfvjm8d98pmfjsjmju74p9sixmr01k9k685lezpqviqee9yjtdu2ht6a1h7am7qdlm8e7kwmfbz20c0uy1v2w6kwka3whhfe5oapdo2ltj2iv3etlzf',
                flowHash: '2sv1u4hluadcqwoi5va2k0sipe9xzj8mgxv5bcl2',
                flowParty: 'k1pj5508oyc8xuui11x4n3ok9ac0bzyo3g8j8f9y0e53nhh5qem5vi8xt2xs814y6nbbtt3bixpkg71vljhpxvbekqeo8ayissqeaj95rxnxyxljz11drmol09t9mwq0h08ij9u45p0390nnspbp6y0ev1rd9cnf',
                flowReceiverParty: 'fn10ymm9u4gwxh1eqiru144bq8eszzhgh81o8eaosf5mwqxsf48temv7ntrnrqurp4nagly906wlb8kv5pky9paleo0zyqffjbofzr0pkpi245o7yqb9bpvduiok52rah5sc43ao52s2vns20hhetdiqgn50eqbjg',
                flowComponent: 'p9k29b10jaarmy3ycsniswv3dtux0qpaoix0hhfz43wy22kqw3whwsth7iomv5wbn9okz269xm7dw0ndsvgzef1eoomdhi5i8ryzgjqkgix6q08zhs3do1hfeoqypdki757hpdmy6m06z1h1w0mpt22cha5bo3p1',
                flowReceiverComponent: '4wvn65k53e03n2fbq6yg90bke8g56zstmc6vv94oucvh66m5ubde0yeotxfmg6581xu1qfxeeagusazjhl3zalxfonczkyq1s92w1z5t60jvekqz7hpo1pkdnyo96spl9sz193wkeq8cpof2k24fp2enuwfouvi8',
                flowInterfaceName: 'k6j5y82giqk57k8xn4zds4ptw192wu10bck7w5smsc9x4mmfeyw0h4rv7ipqpva4qsv2w7cit0orsr53k73nkgn67ujmbiwhxil7sxekhlzhm64elbi0y8kud43gmn2b3kugx6x0x5amee2al6dq52s667m5dq43',
                flowInterfaceNamespace: 'spq9ii05euyi01gjlemm94n2d9unhtvppwf1wpu4t4bufmthn2upvr1izautpc7xy6h4fi3rdgal52px795egpqd0fxpdwtbsjoc4ah9t8es8v4qvmvmfkwduqnasme1wktx3y5ilccxx6hxo4bykehefzslhokb',
                version: 'pupzw83vvslebvi7fik3',
                parameterGroup: 'dnn6h33je93p8hst389lpmq83zxn1b4u64tlu7evw3sglbd14nh5u2demgevppyfvgg2nhd0x5uh35786m1ec0jgt8msg8btvkcmfxto5jiam4g0h5khrt20fhxhdqwi4blpr7obdv2qvnpo3y3xfka2bvr158y6fi1l2ohvibvvc1xrs2yj2np9w44tx9orrsoihng49oi33nwxbpd2cku151heywklsasj7a1rwa2ywq71t7emxr8fp066eph',
                name: '7xekovlcnwgwyy355rzty3ncdf8gqyfdoyuyev916lsnjkagmgxzf39y4dlrxmgcs9r18qwagj161n6ccah2wraobit2dbrmr8buhmcb5s8h6sopr8h9a9fxw07wfomf2wuygmzqh7hefmgi0qwcgr8q7jeg1zljpqc05u7rfbta68fgd194p40o7kw77nclmyz42obfn0sua774hiavp23qwbhq6linly8l47sa9l4ok154s70dot0wo05vktxpsynnja1a0cnaivdq6elxaj9xvq35fwcsqwaa59ipo05jk1vzr7n5raknv8c7rtdc',
                parameterName: '8ti19pmqve91cdll7253z4f79azf90t7a8u2516f7uf72yccpraumvnnnzflb9r8a3p9cz6d903x319uwfwp1yd54g9noclm1rmfr8ie88h1czj5crke2dcuqejk7eotbjjhtl4w1ucw9cptj4clpwfhu5hmz50jho8pqe16u42wk4xiwj1yaonfdg65rwackfs513kevzj5jcchm0qukl0bzpbnw0t86jdmgdvr9jz9cq16l3gjl4q4gc6dcxpc4mva88h8sbg43zdcjxkyb4gbs4qf3lvbffw2bzywag15kviv6rhxcx9yke47325z',
                parameterValue: 'n1zc5vhw0lunby7dradklr1gabulxsbuixq5pcpfa4jynorrvear8f7ndewv4y6n2twlubax4zuti1sfvlryeu312cjrxyku1bartqa9op7wgon08bi27lfqfz3yuh7uv8vi848x6hnpga6benmey06w7a9y7ujuzfs1k3w100kfbq4x6a9xz03521re0m9uf1ge2obcmh1dvsaijfxqsjwb7zdcx75icv3eydmt7ckzxmkve2vpz01ftw6kv1019h2rlq0itv4wqvf21kdjc4t70f1wnyhpf8g42dsgofg8ptvqd08pqts5tc3a6hfr87bqaz9fxnqubh3ratrraz9ojcjdly2oi8mznbbmr0txh4wnnco74kpoorfr4r8h0283f530hs5utzzye0r1ws6n28xn6knrfpcz007ep2yzjlyews7b7uen6z842tn263q8m1g4pm9d7fmzzeej1yk975mmjlxxlm7nkmseg9pb08qe27xl2vzixye5z00ufksk4609orca19larqu6hyuvnlrt5c8r94bu00b5b0l4co1n9k249tq9j5gzwj2sbv7yn0ipfes0w0x2s3h1u9e9w5bjvc4hk5vlb4ecnd712r47a2li3mrs4q4v5xp0ne7xodwzyzo9rxiauuc3ffm62anektgz22g3kbuzi6s6y0b1maomd5cvl0qvn4qvmufu4uiz5j4duw24t66bjel8ah5h4dppkezqmng8go6qrki5e2ljt6j98hc6nhgzalq840za2gfhop35vf0xbrlfdhiujncgobwaytremj5tm93rqd8rv8iok64evxv1qaqv6gqylm5b8xwoxip4cubjkr1rq7zd38f0rhfslnucoycpj5puoklndavq0z6kaegy441skevz0nrllppc8cdiidu51d5hqm5edf8o0pbpj7l3noh7p5bhxjssnd12n0cve1kwojgr7945e60kpf99nucucm3b0gjuujxijhfrpbzov2kybbebzlkf6t4uvzwhiwoe54s87hwf6wdvnc0zxa8ycdvykmdux3hjbk3xgofjseego1mp150rd9v85zdzn8t2vvpqhh7jeucvfqrzi45okv6lx7c5rolazspqtqybtqyqpebpeycosrgnh5n3pnzivjfl0c77ja6c1b99ntro74ksmyijbx9djtydylbtv0z97q7d9ct8glyig2lkcp0x4w9kxjfhshmjarxycb8arjmrbpnorypxt6hn54r1hvx7mdwl4hs05ew0opv8drz2mvyvcwebdioljcr4tgusw9xyqc51cril9uf4w12vdct05dxj2mvdrvktvl2guyadt9f7pv3c88c4hftui1xq0ybxomcjboa34kvltfhz828htydcfouqfn84543jdw5hogop2e2lukw0iqdsr99nufb45glwxo2ugj54f43jpb07ps7evq0q11z8oju2tnpog91vczzkhiv1uil5bvade76dot2nz7gd8o66pfyaw4dvxilcewtkx3pp1u136uvkfnumsrrpri73yzlb9z9sal75qi51p4ndrdxjjt1huf11fi3icgkz2h8l6hj0j2m5g5ff9ubox03rhd4rhisrrm04v97hq11bu1epy5oq0qwvytsj6eexr7hq25d4qsoyldbx7a4ewma0ocy214d2cudfusb8g5baee6eeik6pagdjg1j3bsktjwkijyaxg1qzsr8fix2r0xrpqs7dko78fasryo5beinfzryq57khiyosympr8ifublmg0x0rcdxd9en8zgq94r9n8jv4yrhb56uwymq6v6zvxu7d8jruxp1atk8t4ijwvs2logbi377cs89zykxe5g4v98ployh6dlekv2wha0yyh9vla58uopfgc9ndmva0xzpe02bdh42sv8eju8egpasfdkk317s89qaxd60n13lrzr7j37h2ev0ooj26bxd5xtlaw5lzlck7w6izh179156cheg3eiiqd0afv0hw5jup4aq08u2vv6ngxc6wpcd3l3p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'llvdzi50ru74uy3fvt9da27oqot16c3xetiui8czvwya1sef54',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '6r1idzu7g5tiwwsqqhax',
                channelHash: 'z7l0dg346tq0xi3v4ftlcz2p0az81b2syse2fg80',
                channelParty: 'ab6hw9ubk7msoadlt25ky36x31gzqo0wjub7pvzbw77d48o83f4getsjxg1rfinvbai4p642l002i4dka0ola0etf4bc5jruawl69uhs0sr5ov8u41ko8ums0jjy2ihoonqhucum5out90kh66b9uh8syxzrjes2',
                channelComponent: 'r2jdyrbo2bt95zs019grs8zj6h0swumfz8stvl7tsdmehkeyth7z02vjrti7s29vx8jlegrwfmnxd6yjr47zu6o6z6nshryaz7nb38kxzh6eluimf085rghkefa0ntzi6jtja7j3rrwggafbcah7a323m78soaum',
                channelName: 'xughnnyjvtekv5rkyqc89intw7glp7fcoxgo5kkshc0c9w9ngjm7rdq7kmls5jcjpzitsnc35vo0q4tdty1ed62fik3zkds2qdbiaazw5b0f8ass80sdukw0mcicb55nwopzhuu4b5toyj7ym8e4a5t4bfseqsj9',
                flowHash: '3rp7u0q94nsrb80opvnz2flu6hk1d6i1mgr3y0wr',
                flowParty: 'ggdc6qmr3s1sv96etr7801pcrgwlv9hnpmckz4m1w9g9p7tcklbpoymgmcpbzbj4z8yr820tz00yiidrqrpnwz2s9ce2iqqn5e6gi8yl8musy0bywtsy57gup0q5eovmt10jrpf4ss2u2nz8httakia8vuy1426o',
                flowReceiverParty: 'tqy7oc0u7iuk1z256wfnh4sotdepu9p4qxhcxg2nmouzga8qd9be5mwx8fmuxi76nkfxfru0rd0f7vee5e5u58e7emntgakbc73jvyasboupmj22estoa8la3b49k6vdvf8a3ny9b54jns085vru49y8inlvnjfr',
                flowComponent: 'nsdlkbc9ei4flfzgmgt9dbntmxshssy0mzt7mszhwk3wqjl059laidegkxsj1k0tvt6i040ckkpha8x5809c4o7goo8xta9511kkyr147oz8yln61wv03cwyt37hiup5kgb9gfbz3aqpr1zkoo9e7mog273qv8ci8',
                flowReceiverComponent: 'eornfc9qvy8iz7zma01q7u6rbuint9j7hxr6qy31qqd4drcrs9qaivizw7htwfaigkenexxv82har089jkumqzuwo8wdkedghcanv3tr6ogtgkzxdodsov2ux3j7ocu7i91gwbfb09pwxl9b9n5b87dg0wd7bx0g',
                flowInterfaceName: 'fy6ugvbbahuadgdyua42fbwfxauyxwa7m85mvrkotwb15k1xtfg6vcqkagrz8zsjw9ua5dhj8llb0boflt1zp18imqe678yzwau9oeyuwwymy2dsztd5zoaerwoh9lt71x43h6jxh26ftqk3wu0rb7vr4q3urmn1',
                flowInterfaceNamespace: 'qcr1w0ciw09thv64qk1dvcu0z94b652o3p364h9fbw3llx6e7wobz678sl0llvndfe71p4wxx8zwkz121l9fu72waaujxuieo88nrmwdkk6hdnf9ou2832i754zca0g6oyibjc83vaim18cobjki2hvvclkineti',
                version: 'qu3i064n5y1g22koe0ne',
                parameterGroup: '4m2veimsaykkda045daluwje0w7y0psx6bi6oxc4jhe9s0d1fnag0vdly7zsp8ia2by6q57363cv59kavfura3p4r1setaev857szh3yzn5z9yhrrvlzw7hwbf652zte6mgx0mfbe3el8ow40az7tkihctb5oq48h0509jemq3e71oyf5t8l0r4pgjqje957v3rkqd8c3x6rzqhkwxz33wu8szwm77sgreb1o0pxl57z8ylmxoegupm5wfypege',
                name: '50tni2s90l084bkl5anjmd2lgn2dsgnyg8os4hj5fw5b5o06f2dvwxbmiajzxkextvv2s4g22vin1vexxym459idgzrv7ed2cxon6rb5ozu8jiyjljlsyw9vs8cc35nd1iqtlhu6rhalm5vc6rw3422plafirj176vgppfbxvvmm0mx4pk1872hwab6ov4bvpv8lz51fmgsxna7tqw1ev4qfaffeif56j1m9s7y0qa3bo27gco8u9by85lvhhdgimskpjce6s5lbae5jck5c21oe4dx1zr4ipu20qrnajcn5arq2eqg5figtkslr1s9q',
                parameterName: '0vdvmdv42g9gmp7midwxn8myh4p979tvi9zy0j1j43ik1f47lrp1iorp0lumrit3rm51v3iedf4yxhbbfb505sptb6b9etwa3enee9oi7wxix7jx6zawosqjyoul9mhzyiye5esbk6gay9njq2g5jlr0uyphx67eevbrz7bigew44mryhwqdf1nqaln6623i2g1hjauwltgolgv4bu5d96h6ti30wb8u5cbae77frdonryygkovsw6rh3gfczlyalhvy68rva66r0lu3ixigby8w2nlhzjix6mqxmaeyhkeuqs6vg3zzz945otizyke9',
                parameterValue: 'maf1opethq2dgh119rn26kx74l2vmd9b76n8eemeyzyrwg8x6izkth7jva7q1ajhyz3ixaxb07jk2qbydjwxhttiqb44pxaawn9gi17o0sj50txdksyy21i2mf2p88159rrop5q0kml8b1u8ordq5qgr83vtf5a5mw93l9ubhwm3q6b7gxr1vsvqeewybhdjcc9ayk915yen9rlj7an1f0unl06ou5tigo9uwilrpr8jozchgo4gfoe75d1u9jthyu8rxcex9lasbs1yv2hmg5303ytir46oq9t7tt87pjue9un7qpjha8qkwbpv29yi03aal90swck928ek7g0x33d83sx396i0ko4fgpwfifa4gems8cbx6q28vmm5s7fgzg5zekym1oyj0uyeskw0cmd9cg6oh12ycza31v2wcww6jwij8et41w6hppn3tqrls2zdzw9bv129mjhmob9blmhycyvl0m3s2306gs82lzfaab1fju4ymhm1vuj8ywlmtt4x7vnvd0blgpkp6syyrb5y4mroqzv1sn8kw51ev9a1jzj5jhqylxhwahvkpcpfeui0dcm0m1ne18ai7mm1wy5oh1e8ttgwis454wlh54ltymmyqsfuzbj7p920qv4gdnu9n21twroyvo39fqjw4b18a00daxd9o0tgc2nva2heicbzcipwz8zml1uox3ylfeizqyu54lpzoguuwuhjubkuoxkpsdm86rjk8bpdp46cq1wqewcdb97osrugfvyheoy9qd9pq3drxcyflm65uy02coq30kqinm7rsrle134wtvjgo4x9dwegwnes8u3rvmrswfoi5iitan2rh4svee3x8t4rbuxdbbpbymv77aw6zqntbq9be6do0dbl6381qlrq7d0neghvicwuaoaehbeo0c6aeos1jovgla8tuk853k5f93pe1v00f7iyx6c39y9lkslr7wxhua0svy30gcczs3oz4zv08epn7fx3tfnd1zw4oghpirc654akz7ty4clejin0p9umqq9mwaxyht8k9foxps9pglvg8w3470fqzv1q5znbfnqh1dvsojlpcbjooqnvu2wiwrx7atdnaq02o6g2s04vows5pzbqryy6afyjfuzvwlp6xhbmehgdo1es2phj6rwlr0qwm8co9djky1kvb0oky7kln0p1xj70v7c1h1tkmwasblpmjie473mvreashqcw84amjtlgnrrrdunztjn28qxgdg1sdv4zm44t8s0y515d0be6a86qumd8nh8zdtf6u243709el5np4i7x1bqrq27c4vyrj5b5tqqnkyk4t7sdt4mdcfcgw8pq0gkbg48dxml2sh5gppbrjfprmngjzgtz2yd6gnrjufbhwwjc00ln2qbbhjd8exqbreoq5ap5imz9daf0ghtfbci9mz5q5oo6lckz49h7qjqajnmlsswafiimka70k2ycm43p4mvhu2y1bdbt9x4f9jdlf95kn59cc280zfye6fzpy0454ehpwkaq70cujbf86kv0wvkn0lckv9tjsejjmpxd6x56ty5x7hu248mepqzs7m1k2tpqykxz1v03e4o70gtr7a13w8mzenrpuauawla93zs6mwjzv26x3jeg5v7h1p9v1aciumuxaxjwrrl85vp8dcn5bi7rs1z1wo41203cn1zr4idq5eevqnrk2ahi0kcpoawbpmiw83v5rczsbn8mwv1ih1mxfysoyl1kn6854jxsgu2l5hwxynezsfu0a1rv431w4n7banih4u0inyudze35fh3y8a3g6gjo3n16wwqxl4alls9fwzotjdcjfhv2fepw7b53tkkaacnr6bz7rkbgp4b6ir3eoghmmgae13bvi4smhyh9065pwgsagn3vzx2qpl36yb5izek93j85o2pc7e58czxa7akoepv7fyxp7c3m0ii19034nk6j99iwdvxroa9vgvx12cv58osijh0x5dw8qhbu4wjf1d5p2irmj8xjqvh3sz4cns6elw7fhv0il09pdozo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'uckbz1sjlpqflrzflzxyudvx099aih0szzso62az2v1ctxcozy',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'moivvv9mz0o1ytd8dj7l',
                channelHash: 'gljq8u7m70gr7y5b45i9i7ldegt79nrjw9qgn7e9',
                channelParty: '0lvo7nj6q1z8vpfil36u1mirg862za081gz693ko3zw0fsdsmnhzg3mil8lv36s5gmrn7w5zsyprw0zpqf4yuhyra2jreclnnw0fxk9sw1s46yfor3tuiw8qkyknpejvhv5cutrqwo7h1t1k4k0focdipuh6bxei',
                channelComponent: '1igibhzktnjca1rcxax0646ymlih2g6ptflkefn9nrpx4rrcwxfua0hjfqodkrjakrwhtzo4uf0eqvw58whet48v1ymghiw1bmwx375w5lkgc7nddpyweosmjzyjj69m3jfuz1ds8yr0g0hj38i22xb94yvw4x09',
                channelName: 'e2j5tvtm44hx355e0xfiqc7yyuwlrzdnq44krondu1ymzjeo0rssl55zwh9c6tvfn65lj1cskf77kqe27mwi6kebt9fg0o0labt4dgxmqh3hx8v9rkns3q2zdiiia1ncudi7gc4mkwgjpuv08wspr79poavnml3c',
                flowHash: '2lr8pqirtwjcrybu9wzy1cicb1fl9hauu4nxbw13',
                flowParty: 'brzps08kctho30x406q689ygcflh0h45do1aunq6v6l166mjgwc9ub2cs3jash3auyakww4xyf51ulmuno0ue05ifa4tk5rh32o9huxiw9tiruv2fmhv8ia5hpersy00vuo6hdf34ojnd4e2w64uyihxdds206fd',
                flowReceiverParty: 'c4rbbvn7mtezwn15pdm04pxe5dn8josckzi2o19sh6gk27bwrjmjtjwojkds11o8zgn1whc4sgqegeto7p3w8s6m5vlvk2sjle51kv1krav8kd2tmsgyxp2fzcviuilhfiy4f6bkqqvu50qqtgh6z6qobunwr94s',
                flowComponent: '6lt9khdmp18wraqcb4i13mil3z8cc91r6soiwczb57xsypew6ny6u5n4ces97udhcqqol9z0zcw3ntjuv4ytx9ybts87m59cfgmmmvrwb51mrp25t0nph20vs61k8l0nal1d40wgyf9cgaz4rxdgg2k4l10uza96',
                flowReceiverComponent: '7dj8ps95jl84zd1qu215bmgbb832ky8tk96j2fafex0svc1ojokdz8hdxnuq6nfyacu3i4if3ucnil1o736jhlc3gsmjx91b4g5nbu2uxovc1e49ms2fc9iroziy90mphfkpq6146oyr76ywjek3qzivfcdkbioar',
                flowInterfaceName: '2roped28ho3qpzwa4jm2nv2f4i4gju1qdix58sj4y7vyoeu7jj18wh9uqexr1szfw9085eki17svah08r4m8tjhpeul414divp3m68gjtfafxbpa3vru1p42xzocqo7au6ie3n6diwudz97c8j8bwpv27ewy18tu',
                flowInterfaceNamespace: '3jxn26vtbpg7p65d26r9i4j0dapsz462jax9ny7bdif5lnd42fqduz5v4r5wm0s6d30fx66q9nnv6o2o4qtk0z0l90r37wqj8wrddzysxu3llcebhp0x1jnmk4ujnu2ho0ycih4bs5mfbizpvn78a66nuqkod65e',
                version: '2ug5gq03795f4plbygow',
                parameterGroup: 'cyn0ifcpuwk4tpzkc4plowld0lsz95bzhchpjt4j6dvvcqsrgakc39g0ltda5ffx5jeu9jk2gmc24sm36i6egpkiivzdztmjet3kp994c8r1hail3vi41x6iflvmrp47ncitak8cz8cl5pi4m664h5pgg38qtqw55c8nmxnux6gnxhl555zujnfh7gtz3j7btmlxp0auv6pdgknn1asd4vb5ktk7b7ds1ikoqwefza89dyeqkwz9tvruccbhx2o',
                name: 'agrdq3t4o80j024t82g0oy5wmb5n8nmm3k5win4n4t3w0axt0f2bzceqn3ztq5s2sl5ufv3ops71uwwedhjggxg80irdi5b3sux2dcist5h12vydhkic2j5wj8dcd2bepwr1l9ve4hczxj1iybkhm894dytzbvnl35jvsuonu7ad3rh0dpi1hom8qciukdbz285ie8dv5ebqn7hk8uqyey5ue3h0ghfw81lfp2uk6paqemwsnb07y2vnlwurlpslokuddf1o1v5ru36l6gp2pv2q0yj5b3ohb894eerldeh2dv7fuef2rcv9yo62yu3i',
                parameterName: 'wh7iwpq8s3nl6s1m5esspmj4am17s0nnftuzb32vnfu9iqocdrs330zqz5m30lgve4gtlgiqo6xnlov0ansbt5i6xcr4ljmlufi002trr8vxjo0dr8cgckemkvujulilsvequ9hjuckezszgcun4ueyq2if1yt1fmmdkumgahj8ujj192zpf58hknijttef65fnste6o4gjyv607tv7p6p9h0mte70g2vsib4mlgdx5f5rgw82usx4t7dnhfbtvxihlce48x76p1m5nzn4y31x0om4gqyk5z2h42f5tedvg1ou2ht5zbsxrcmhspyf1k',
                parameterValue: 'zqn998aoxhuwg9ek5w5ymf7dv926rx3waipsnm425zy83m0a91b5m5rt16mca9oow4vv4voj9z9m8qvu3tbjmep9a9vrfltun7pis16rov2ql56rq8o3y228u9zxyw33ptx2mkcsgaw7xh2auo04hwkvrkb766yvtfr2v1z23ktbe5hmdaq8u0g6rrvmmcbfinn7lk5myvxindvnoyin3wxx96q0jci1axm0igi9e9l51ggb580bsuazo18ix6m6iohdm7eo4743b2zov2d9kskbpxgp2tfisx96l93ml76c152mz7j01qvt93x75qndhqktmf9ciswelzliuwi1iqkuzo66skasn3i5ep4l7n0szxo4lsckb92kru8dyi7hh75luzl1oldxldn53t8ncsba0y0xg3wyxiqiv05yu1l8rs44qyflvm6vaeujqka3lgumzzfrdh4ofzecl8zmvqpi9pc5zdcrxmj3r8hp3w3ab1r2tvtel1twoyhayi7w3rqx6m67x8fkfzsucq50w6vxym917raz79rsvxonusvnj0dvbxp0c2xhsk9fqrkdln6bxnzzdlgzc94ihr10xeg7gmmmu8g5ujhybh4c6ddk7hziz4j0vdk5rbyfy2jwtugup8cij9y34rfm1r2kbd0x102gr9m8a2mxo9c5sdradze977mhhq59papax5t0g3x1uxn7pil9rui14snjfoj5iltbc522kdxprt9723zod70g36da4frs2z2q37xk6yam8bqgppcckzk2cgjqfz4lpwc27yaug9itsp5lef395xf7lzpqjegr3x3qpz662im0mnva826yqqtkjvlk1o51ffzbvsc3d8mhyt586rjkjmxa8r0hdx20fpekep8pp47saqfhlsip5h7w7uxb4r86d3uu3jpkb9zeb9lit1h5iaij1yh7m8237j62035d85byrxdss1essvspzj1hwjyflbvimw85kmxsgroppprbdgrwja28cawdvqsmwerc1c9ilkj88kquw8i3s5hchaw9m07w4i6ctpuf3mvxdte4mnlsqh7xuffyei285iqajdunjfmtry62ha5kkw2ca1p77l342p1eqx2oocq1ikkfpkjtldreb4csx5trrq1ylpcnraq8e6cemu730dea5giiymaztjhnwwyzt36ujv6wzra5wi8rs3mfd9yb3ppjoupdea5zzkwjnglhce5jy8x3ljjdsfvgm8gvbljmewlwahyfkqb53u6isgu7usfxlkj4dc1xgy3rk6050qxawjn11wcjpptyrrx9lrbizjs5dz4ux5fp4uvhdorww2y33yasp3n5f6kn9omrkintoogz35a1f4yr0503j66j1pk71527olsvotxiqbcrpjgg3155hqrz0vqq4c6a4s0wcsx62bgjet7ftlhiuklyl6qm7up53vis3l6mhgo1svijd1yhpx3fykqhsvps0hpdk02undhag042lmvf7j6plar5113f920bo0r28p2cqjeee8d3qaa15rtnqagz6mgslsrm8c41nyq0t5d7l6m01cqj7c9xy22ublljom2qnlic32g245t7id517ztrutuo4ys44wyp7u63af8qrhnqbgv9w7b67aad9le132ao19phl1d85zlut9ddnoyfq4b8lcrkp0tmj1j0t8s24aamznq5y0csoium141afazsp52qouva9wet7mvrt622x5ba8l0szyy4wr4m1hkx405ctqrlvxtvfszvxnx9v6ju0k2bk586jpdxb08j52l69ragn5mz0y6og2lf13d7cb70gt8f7vbjjhmrappr41663cp1zjkn4nk14cjo7ltkt8yic1tyqu2ap824xyynjzu8abr4ryji52jf3i4j03l5fz7bbnrd0uu3rnapcylqexu5ovvajydkipybxznbzht25jfa2h87zq4442ftkmb4cfu2qga7x7rz3te3z5d90zmxqj9skt2p3ww72uqco493ewxclzjxkauio39kg5zsofbo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'x6rbvnlj2tdugu5gwn4gv27ls7b9fycd1tdyjwxeiifiui9t2z',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'kyt0lvgn3dq7lclj9y7t',
                channelHash: 'mw9xxirax70y34fkadwsut0jyt2zhiqvwjlioynu',
                channelParty: 'srq247hva377r4k42fveo451ujmnjmmf743x98srl3li9o91o7e1ei6fk66fer7teg56u2cg7u10tzhp452aak8idd5px5b9tizv9h8fml641919wsxbqs8b26jh6i74axbomnqv83d1bkep7cb1kxhde2yycaqf',
                channelComponent: 'r7w4im0nvt6brbi5bz7et9jlvtfcjhjmx6p7dct0b2o88u2g8ph4hua4bmemc98tmunteevqaga0qpxagkklvvafuogipsz0fesv8ebj0lg33s2cadx1gfnswghy0biorwtfpp6xw3tlcxgh04vrvyoe8tcptmlv',
                channelName: 'b90p7jpr86mq0q766sci0pe51k8pk2le7oskstdidg9y0xdzb8ue58e7hwb2kgp1tqgy413eescrn0rb7asfyns8gtab5zoc2odh3z7jisykniq4z8zch0y65b91y2klziskj001cg06po1nlntj3cna90wfmjy6',
                flowHash: 'gpma54ynzm3glemnlvq2c3i7qasy5osjiy8kil8r',
                flowParty: 'gyhu46d0cpe8qusmxz7tauszbax43nsfp9ywgj0f005v57pxgj06mg13unaretlcorbjynjhg911xmpkewar6y78iqnmuf2dso4vw5p1xlj4qswcpvvfg55zpnndxof9cqz2mdyrxpdkoe59r9xvzwqzc5bvzu11',
                flowReceiverParty: '6v1qu3lym2f9xy3d64ax2vfsz9i481aib7gggmvdt3j0az34j7nul0mt8x192pphmpfdtyrs26zx9npt9y08sn4o7mqy93o5qnrpfhrgytjjcg939suye4tiejku3wywe4eckof78w0kpfm6rupkpz6tgf4r68es',
                flowComponent: 'mzbhnbn4p06vmufapquyvs5z9l8ivvbkf9zwxcwugw7h0tunocf4pqg9r53898awy4wmwrebe47ei6p4v90a0ja6xooc5tddzkc78e3zw1ra6xpee8jqmr74yz8u7mpvkq6y1yzowclya6emgvoowznzrugniyzm',
                flowReceiverComponent: 'hs6ee1vn04j41d1nlfd0qq416wmmuiwwzd0ma1yaqom8tya9179luixwlrtz9sgt7vuktj4shgrl05bmhp5fyw8ku2vp0yogwtchvz8ohl2vhrrtb2go5mabpkhqrgnlv3xjn68ug13nmsqfxxw0m2nffcmxz5mr',
                flowInterfaceName: 'cpzdi81nfinsilv25ilquewvg3c20l7ri9mrw95p3gvmhbt2t8mgzwbaljwoq9gc94aplsl0ga3cqrs5ba7h0dui9to4bti38so78kuxxkxczek5u4qi4q2xhyrs5lxskw46qjozfioo1oyo6sg93ianwb50pltrp',
                flowInterfaceNamespace: 'sgitp2stuhsg92m1kws0ntl0kh6l2jsh262xzilowy1erwgirha42sg4u7ltbtir6wb057q4kw4ozm2hdhyd7kdgcmhvgz1eqjs3dwzekizoqbgoad8vx6o8yxt9afc6dy0517a81wg1ujn1djj3kbfvil10szle',
                version: 'e8m1jpzvucgtbsj3qm9v',
                parameterGroup: '3d8ojiee79hocj1bv6h8xu2fl7gmx00mhgwp1wbt7fjtevdkw3k8kou4fykbjkpmrds35d9l8x13f6mf7tjfhg8tt0we4puvdozig88twvj9nlhkfirile0v5hhsb32t4hf4bxzrrtnfjmt9zswfj2peygtv82lg391nm6ew8jkzii512y3tmgjnfwhv41cszeaqt4lb0uhwa87rxxjmpkn54ptkkesa6eq5u2kxejk7c1c0yytsq23bu5oo38m',
                name: 'tr115lxldczsc7hahtyiktq33o834v1kttg5rocpluepl5mxtxkl83554vhjkaa0czo73l1wztzd9qfxdqd1p72fznzhx2oljowu2xsielqe16eadqde935jywp8lxrnzd4vpvooabjdgtx4qe8qc87oa35au5xjajxlalm3j3dbxf7ge1mi83iud1xa17bpjuo9g3rjjmdvck3pz448xya1a2ec8ux842u37g5bttak9tl8btpf7tnh23ngwx2vsfvtmgya58phizhw7fbm6100ahhghorlucmptvut2tkd8t56e1v1fphgikp6irhd',
                parameterName: 'gtg38kqw5jt86p4s1q2s7xipvp3jn6ij179wdyk4o5atgowbf6xs9tyzmhi9ocls78521gqy4cmaiy1tmlb42004km913hn4hzxbyhh9qhln2cv16mvh9nxkuubsl7t8ecnqn3fd8punfpkprfuppn4ysuy60971gnn0xmswkko3vnhjnwyi3ht69zcqt096sqfecr2j99ou6qsrxdnndh00bm2aqfzxw2385viam9vd100dyy0e8t0xc4udawid649r2g4wwefzsmboc25jpz4tk8587aachrwh7nyg1qetw5ejx2uwk8hz0xsy7kgt',
                parameterValue: '28g8zgp0qxqoskbruax787uo7zmg8npln9sj6xwnr3i1de73tlf2i8uy3sob20tt3u056ut61btwxcizawlqnwbv62z0aq11fvm2a7loecat4idi5f432ocohbt3f8z5q9jo5mnz4bwhr9r55ec9r8wo2d7xuzbwa2r5c32737pb5gkjwt5icdugjunrv5vzvje4qfo74z11mlfvc24lxcvq5n39k3qiyux8y0cijm4nknc910f1lpak8j59l2i73r8flaq4nwz7qp92ggvp2k55erkcg59rmdm3e0mog2y7qst7e87unezt4onuhnzprhbfsw30ep31p2gr7v5s6lcs94yu2zmrscxpq5s3u4krajlpp9s8r9no8rclbmlo6j6pt69i0yfx7ekxtygqyscqgm5zc6b8tehcf0h5f8dtl23ac4f8dehbmkjfxjnfndi9nu1zkdav86xy8kibntvv0unvfbt7tqs9yayia3suy77us4ftatknuwn80qthn81lz9o6jn1yqc46mb4rz0idkst9c73sq1433z1a2hkl38bed3oai2trhftd50ckqonlzalj43stxzhpbul4lfvova8oa4xidqdse63bkyn9homokvnyptbbln5s7cyaw487dd2k22nlbmx3ti4m764nh9dqhhui28ajln59d7qrk43nttimabsnuifsjpp90ic77hbkp2u3b33ckw3m35z3724lt3cg15tlbo4dwiy9co5lpgbw8smo52n94y3in4admkqcye055kzdha3o9e2w0ih9qqlwx91yltumm6sbv233nl6nqubmons9p7mzm7gui0hl4tszlgrumj7tw5ngx00qfdb4h8ae8081lycer5bs2vtrr3mfsxf2siusk3cqwe634g1jgbj5u7x2ukt0xd9yvavu3y768zyez0hpnj0536zwpxgtkttzc1vhdvl9fuueloytodikcwf7bfak3izeopal81tyowbu47fnqxw3v6ff3deeq542zr6km9euad16ecyg7dicuhd8qjbg9nrnft9t6d1q7peinnq0dpgorku1komr7yqw2lkv8hjt7cftbxtwu2ds8mfg0qu0t3y3kzj4x3oimhd0skp48palsail1sedtkg2wadnkvulp70q4hjwfwhub2lof7l59tvwsdb5ti00hkadp00tanc4xbkqwn3he2eatxqc2zmimtkocv65oe7rnuku0szc7v0j3cq7cpiy0b9unsh5kh5o0x85pye742mep77i0ugklg3vkbxm0t64s78qih8dynw1omgtz9aozrc0giohv9ig2gyi8xxgrgkz9uzi8kwjzbya4frmdexz9a0p7ghyg9h8ngy76r5y7u5bkvm68yrk62wxhhapiaskj4aa5o84gha65uwbm0ctbnqx16kg1k21h1jigab9zk8oh9hfx21rce47q698lq5hjjtp2sw7g4zai8obwi26ro8fp099y2g3k35i97syuxt2nqrcmokfglzaaq2led6t0aopguzilv6t1vw9ovafj1za8sgox4ubkjxn4kwljoicdgc3lki9s8rxd7dpko7k25s45xtrdpxfwgynvuue7r983qavc8xohxbkki5isn5y8bn73uw9qovnv08qvrrnjd76lhbo17hxjlges2ndbfiklj793mqps30yjllr0f1tj0fr7x7wyofzhe0vy2833kqvocf982knatahdeucc5krfzd8mkiia3ab0iyon9p7yjbp1nwb4542ajy4crsqhilq489rf3mhdq2qg9ij7r8hjgdqufcysi3iqqukfm0dvy1guwjj8khei9y2t775ilvoqf6drsg5qkpbv7j4zj4w1f5c5j9gzm7a14g0hrza99c0ovx6sixp6eyq2qzyts5d6ofr7i3mdkztfx53mr3jg2bgx4nqfk4myvkwjccmgd9w4p9sua26hlpxl6kpzino29hr7l2gl61e2xbfsm3mum9sp3j19afgp2zeofustcvtyn537zn8epvpumv6kr2a',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 't6s40hogdbilnd3lhsi9yj7w03zjozwwgypkadj4zcwuw3qsob',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'a4wxlcujh4v82ixyamnc',
                channelHash: '85jmmoan311ufwdeynzp4959povp51z2j55uth7d',
                channelParty: 'qdzhrscx82plvsk7qsp7v0gtzqts9adpz41nnb9q0qktgnuks0121xmxwtxh7r12nm7zwgf2m9jo04b297xm71tm9old49xd8rvvlutp21ygb938n3se9cdaaihg5umcqib5gqoyw4lhx7gnfvnd1ryoiakhn8r5',
                channelComponent: 'ramkt39wcxy1ckm7h8mfxr3nlu2zp9lf9zm6osfmkf5c8c3x4feuw7ws36knhmi9a9w4v3o1y7ct79bgdc5j5lgo4rk6qkg8sb5bob1ychdvsaryei41ques9w009gymqdl0uaz1exdxr90chruql7m4ahar2pda',
                channelName: 'onjzo4qa3s5pnepmmqpk6pbyjyr78mrtxlh5ad0x9iin1sccajxfvku1bf8yy4iirff1xd4xiw8256is7qkox8ov62hcb4u8glsm51pfwxm55o9migbqrxvgnyxf2k4hlsd85cay4blh7ea1km4vxyylix45dtec',
                flowHash: '92q6kbct4u4fxj3tme0zsal25isdt2p67mdw978e',
                flowParty: 'x4ot5pijhuvy0tzh91zttlgb29af7pm8pgiijyen8jx0z5zzm33r87rb1psd014s4qg1dsvax8qqzcjy226nka1fvwhwv4k4t6x080wuu6qmeytjdd693ul662ih5vc09qts89q0m3e1vmgr75ewofxhcmlbfayy',
                flowReceiverParty: '9qkendj0juyebkmojw91u5rfiq72tsnaut7788x9e9hvco6u9z6kh2y4ky21s9jb8n7itqh3pdmc0i5w3ua9lw2hidu6qwbj1w558y4i2g8m3m4qksfer1yywcxgwnzd3oofxk54f6pzxwker5ey3l5mdnrhutjl',
                flowComponent: 'u2hs1hq5eg7n4pnht0oni5xf3gv699xnqfqd0zx3fkxhrs4d89rs3m83alccyvgg8fxi60wxxljqvemlmxq7c92yws8x9aqc8vona8bt5ydaznx4oh39hw98o64ohafiq7h5kq87ke06puifa0llyomhlzhhww2d',
                flowReceiverComponent: 'nwhhx793ipnwikioi4jnf8ggz7qaliy51ibdl21tq9dg8wqtxfnbdh6g024agxgb3b5l1lui08tj4wgwpk97bb4mijpsak2r17mivvp78ipqnfj6oa2m2obq5xm44zkgpjyixlk7ej8yyzxhzjl7pr06nw6me4hu',
                flowInterfaceName: 'fk4osc9y2j2uekfpenafihbxjzke3v6tyid8lwjsa67cykbb85kagd7cggg45d8t02x2905gt7ytudpv2v8wijrm4557litb1kuccnc0xg8ltjrkhn7a5xsms0oxzs3iedlsr77gtrybe04h2ecqtyashm0n6q14',
                flowInterfaceNamespace: '0l1yrk97fjas1k189igt5kar1dxf18tnttekdrcbe1y30f0evzygk9luysoz62hqyrxi1juw3qux92x7qf905t14jrnzuncmw83rpzcxnnr3tr8uwjfuriuw26w64fk2a2gkxzstgmlzzcoxjpe3trnseabfu9di2',
                version: 'a4i88y4i7olfu2ko1f33',
                parameterGroup: 'wpd898o2bodg03tfaf6qjhfk548rqyaa71unuez0ygb44fydoccf9xzhf8y9ua5ejxq1o459njf3p9ob76b3qgvdzgfvvqoitjouvno07deu304n9wsv1ueht0j0sij0geigjlen9qrfqyozk7wc4sckvz3sug5mfssrp0cst49rvspzh63wyirgb93hjqhp8ls7xl8n5s9g8aw0ww84fvt1wjvouuglbslk92ttqb238h8swotsve980yvxs66',
                name: 'rjicsj42x1wxnrby4g3ma330eyxogh3gilaw6pdnzy6b74c8m0duk86y8ln05prjda5wp9xmyxt5i0qi6jev760l16eqigb5xvyktqvhj6te1gfglbd1w94ol5dnj3ei5j8q7mabgsb00ki9tyzf8045tzs2cb7dvs04gyb1o0ygparackc6zj2bhkm97ljxrju4om501sdepk304enrumquncgm1i4v72eyp9w7nmhqc9c6o9kuktmlgn42qbzrlk93fl178poc95d5jaaoyyyp482vh6vz0sja2nspljualukvf5s8txzp2xxrawd9',
                parameterName: 'lz5py7uixukfvstyhhhpy3spt27fhwwmkq870jc8l2ggxlrhd75ozxn4v1rnfmyh8ozgcl8ysddf4mhczehlwzawrtsymazeb84fgh1b6zsq023ofa5fmu9r67m56qt2z5okrce9hbalmv63ne30czdjjl95kaa9hsejxmbeulsqia49p8xh10qkyu9dpwtugyvojx9vqbyma7vfmwtsokkv48l9el624yoowd6kqyfo9hbgfdp1z9m8cw4zsmiq71rs8olhrcxbulc3h34kbfxnkt9kbspv34mvot3g5ovrxhtlf8b2o7unc8g6sj2f',
                parameterValue: 'xq3fq4z4c4fbvnvfqwy9cyjvqq2w1d6pb2umqvv63019y8sm2j4kpivgtapzu9nmsb9xwpx2y7w1v8lmig67mw5dlfo1qe29g83lbe1yzvax36sbwvi30jcatakqrlfxu782wtx755wb30knb6al0bga4w24votijzuttnx5us7ku2dngqyy1yp4o9ed2bwet371t8d4njpfawx30nppn46vrblmtwx4gzexiefhf41mm1rnx0yczgyrmmbmvo0nq1638sodri50ldbop98rardzggc8ajgqpusswsxsowygm71j7vlq8u5b3j07r8uwgy15vnrnspxpp8bm7tjkx1gx807zj9dotkpz7667ut724gij1fu1v156rztt1ux4da2lzm2s12gjijx55ujkn5r6pic5b18d3ummmqudj0nbjhbusdvhi1vy3y4di80u7b5hnflb2tc42xxrlavyuh7jv0otexfxlldntfkwkanyrg1e78y6yr1d4kncshqmhnblj3ibtt7fmhc6g9gz7p9blh50oel1hgbmjr8ek678qahpx5nyt5r4k2r2ijn3lrdmxspm5qymjuzor41tiovhpt8wbklsigjfpcbnc2vmpbceijuhg2b0mukr0ppsu33qkiw2dgt5kp35a9llkmmv8aynmvbea444foq1984utdqwj4v20iqighvj6xqvefe4j60l43zizo0ar4huar8vybgb0xkf6w7nhkjmnzmxtf0fx2379v37puqqc5aw447awyp9749jxyec4h7zjquoozpqjckgb1yhev9pbtgbxry6lmq86rvarsyj1k6vhye4d2xrhe38tkfwyrlbtkubugdnldw0yhi4xz2w1u2u8xrhhhkopgknm0s9z3xdnkzcj5nfxyqucwi4008yaog2fh2eo3nps4kq1ni8d9hjb6zxc8yyzw2pl2we5t1quk48e53o780a6hw0gmyfevhhff9vvtlyo5pjaiqq2y451tumkkdwxjsocf0d2w6mse4rux0yi3xejqgtx0efsfi9xka9osmffawj9iu9p0nvm11f7jjuatq7kehgqowbcds4eq38k6ai6a85ta4t0kucaxo7ej55fxbd8thyccz4titrg1v16qk3ln4ito35qxllgao72c9giuauqdduwm2ljvlnbpikodhwwengfrsn94vjok3aay45qbk5yrob04cdsgfizb8q8pxkv31qc7fudic7sf8fy48l0c5c27uxhx2gtluno6q7sxgem7lp35emb7oug6dr0ajtkb2kirha5ndoqm50dyq1ls3r75igdvjtq7q4c3tm9c5g1qf4aantueih9efxfhm1dpil7mywbg12wf4gw8luywjx993ky9e5ouh3h4ps90hxnbapc9h3gm7svhz00626x41n6agrvyve84k80clezly3lvqq7ny4zo0n1dpul9q086bp5z9rhf2jv6hpet83f6gqvx5v9mck37hnq3g89hrjpq0kl1ewuyaobj7y7rr76wb6jjwrxjy2r8wy4qsa55xsd8ehnxx9xnubo0lyqdkm7mrp6ompfexqzsonkpujjyfayfen73288uf7kz13zs4cidp7c66q49049u9fbrbhvrp47cgz1s0ju9l1fxihprn78zwmul33wkjb0yxgiwfm16fwndxixty2qt8680g4w7wg6s85zgmz6ppxsg7zraz3a3g84ksbtekj6wp21mcfrcrz7o3fh4a9b7gyaocnyo7lcbv2107te8x4nzqzpx67qn6fvhhwfp5exa8anjd6ksa23kzk2s9l42oeajsy7vngz6cm09o9aasf6ch4r5m8lvek317w39217im5toem9ilnve89frr0aqklztofnqinjaoy9htpfyeyfh17bxv47a0j2e8ynplp1ivcr2kwduxgfk7xzhv9fbj0d9shu0bnikf7qrccnaxix52x8l6yikkw431ym4dvp3noob0wd7b0uhpj9uj023bllmltkphnsowl93deix2dzpparxg9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'f6ahjj0q7nnvzz4lvpsyq4zzfhfryzspqcxc7elraqgysoe9rs',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'xf55sqbpvhlncpvmovgq',
                channelHash: '6pfysmmcfljfof9oh3i9pznuwuyf6vup2bvl91vm',
                channelParty: 'p3oymefkel1jmxqwpb4tzfmyd4l8y33bg949nqjooe2munv3ho4xltg9vbp0mo1d1nuyied4fgxvslwl31kgcc0deuw2md25fc9ys0oyr8bg5g7iqn7k8dbc5haw254wup5datubqr7nyl1hv85u6y4t69798wud',
                channelComponent: '2u57atgzi0hagmqlu2qdpc2xkl4r067blveoo0bnub973op2vhiw46xvbx100uk7gyg4jvlg97nolu18s5lxfcp2qa0ykig8g90onrn00x9719odixkeuvkrx4wl1a9c4idt9rqkpjcsw2vllz8cnf7c44cmiqw8',
                channelName: '2lr422e97ye3fu76239wnyqd1g31rula7uft7lclzbsrummcbxqq8fkybcr3z6n88vuhi8xcmudh4zmkppm76o7cq676hqxg7kwqbzx3a9jfcgl593n9gain7udkbtk005qy6uvcsy5mdzaffbwku8qnrxu642p7',
                flowHash: 'ta74nb8n8uoaq2ps6qh32iixwvdtkqycnua4peit',
                flowParty: 'jug7u0kklbnhwiuae2qiguqm6q3cjenymal3jetsjhe2p087t7f6zo0r4vnkgbhv7slh7i40em3gtquqnb8s0i63nkqo2xjljnjsj5k5h6ivz76qvqo3935x9qlxyma07pbtvoh04evqxqtoof9m8848l9817pcl',
                flowReceiverParty: 'jho1kzhimjvjvoy9bmkh60oqfwg5xmtj5n5cpmdqiccrmud8e5xi7dnbazl7zxpveerwf2if08lijok842bbr2dozlgarubnhq3shwxehevs01epa7enipywqyosncedf1eboi2ixxm5sjxp2qyrrubwhg030oq9',
                flowComponent: '58k03lv4oczdgkjrdvz8ot6suxzdnosxoj2s6t7udlcn9ylxzf9921evey8ap0qg1as92d6oiko4suz67ycons2cu7c5w87gmckatm4rzd6ychzms9ihk7jf8mqjw43ot9aptc0btb3hfdyjoz8pzakyvya9v48n',
                flowReceiverComponent: 'mllc7atwqt59lw76rr0rxj09czrx75hz2u5jg7nbdr74fllgtt89d8me779uv3w28d35iibtzh25mv36t2uquo7vo9g45png0j0f5ftpot95a7z7r9t75q6vg0atvac267hbjyl2eacsct81lvnt456xoa9dhgvc',
                flowInterfaceName: 'qun3nic2jgvb4335yy918n9oo59bov1fq47xp4xtyhec7atz1cd61xs4gpk6i61qugmu96nrufssagll4fl18abum3prxxry35eg3brwao68ra05mcbcqhum4s9jyj4l9mona1hvuoipqozyduvdaxf4p4e8deug',
                flowInterfaceNamespace: '168uooh9zp31ewlr1ca6ivx1toe0gfpkjkfszwqu8dlol7rx0822tc0aw88j30m8zk6o0vmr53xaydx5bhxfq5jkslmsu5bg978m7uraozcbcesjdxgonogx9xcdmg2urgc0hs4ef9ks1cxtvtv8nbpp2zdg1lko',
                version: '8y79i6yilv87bd5foq3qr',
                parameterGroup: 'ghtu0fzjdnj0uek9eikpryqkmixwb906riwosaop7ybfnqppsjxnf1n2wvjsu7mpgx6uieqcrcppprzcjpuzr342box6unu1lclcx97ao8dn1zwwppd3cqmu7ef8ovcnqv36in2329qxqz66g85ryvc4lwuqe2dzsm8i5sf8llna22dthqmxfzyjyrqbafo69xo0745r67tdrj6mvdlr10esto0uel2z4fi1152f1dkqvwhfjs3za82rq4b1xni',
                name: 'npa4pqs93nes3f09ltvg8it6k322hiqgew84d4h1e4ags0il712hukcod7zanqziuikpadhhb4vgahm7qg9cz402mwun50m8msidd6zk967wnqx152pzcjm91xgbh9w5jzasik6bt63tgac9l6xrzadcdjqp41sgnrv520br3qpi3syiwj2imwqqlz5k4yq4k46itnn3p0fgblgx4rerjratr5c5j880d7xgrd3tuqksblmu6xjw5lua62git5zk0qc3c22pm2zsh5gxj5yy72by5in7w031iv1spsqrer45pxnormifwsmzoeaitvsc',
                parameterName: '8vfmxg0tgybdg7j1b41xsjujx3xudhk3cqum8br051ll67lcigoxeyr18cpq8mk4np8af859p4hzgsithj9f3di2ls1zbqeqyojbe7ryscm4snpe9n7p4ekjrvrg89ynrwmsmmge1glg2cykh0iv15fp67s5pco3j3tre2ak7h0nvw3ywdtq0xziu939ikxxdmtxo4fxal8h12nnzu89spz23lqogxn0ji6fjao65rxuiebi5hhtxzni42gr651cm2xxbnx7e1ilyhjpgggs5rsk8tqdgx1g9xltu3n2tgxo3jv7trzyq1xeesatkno5',
                parameterValue: 'i107fh7lg4h9a4yqytl3darxw7ykxq6ddslob2tf5av7olmf05d7gzgxfpqefd5dk5k29f7pafmi4mdb3a9k3xor3ch4j5ssq8azz3o0zi5yn6o7s06fbawx3laut0ch49s31bgx5ypm2uxd0xe5plyfc1ge9j1p8z83kw33btzld63nz7i15nbfpwywa277wvv8l5sg7wqi3k7v87r44p4wswg8h0j2uej4eml1s70iudnqif1zd7z2rkrclhi6z022s90vsz4t65let3cxzvv8qljjwbtg0r5w17qtf2yd0wl1tp9m8hhlwhino0xe9disvp3ygewgjmjria9vouup91ljerp1h10r8sqgur7rzrsq9ltbzcr8vr8m007wu2xxr4bl9ajn7rpr4yxj4ya3jwxn5ype16odj4yvxj4ov6b3n4sznqjksab3o2072m9pmdyoew230pcz0ddauosphatrt389w5depibmxe8trct0e4zdae9bmk1mg2vbcoatrw2fu392gjk3w4t7o08hr2fbgkls4qityt8fwxrhzwii91lvivq6sxthbsvxdhfyspgk0p9jnapsrl1gitwikaa2bwwxlimih8iot1od08xf7khnb0adaoyievqa55spv8z3q61rgg167g5hkgjoa9wdc045y5rcf1pr4gxhmqs80j22byevlm2gx465o0zgwhtcu5u3tdlr11f8vfzn8fwvml88n5rfd5rvu0pog7tfrv88lvfsw41s1wi3tmzi1n467gs6dnx70qytn94j9m5jhege0pb81p672sxygulkavigh0qmwrcvg2prryz3eb2ye9k6m9n6tsojdfu7quc7rbun11x9oll2i6v8vrxus1jals5s0wvjy1qy57x3kz8fjs5mfcc5nk50a745f27u2ymj2zpalus43t4xvxelr4qkly1cni6y3obsmqyly0ye7si6s0dbc5f3p2dlp8fdyr4mw11lgz3u4ed1kxhxa18vfe6uycfxgaqx4s1dw8ugb29dg8x5wuhz9hlmzn8bqmsfixl73mjut2ncbgmjkv0i1iqojtlrg4d8ee4d7wkv3qcc8tqao9597szb5nj6urm7cnu5vvbj3uli1iojs2iyho9w2uvkd8g2940ykk2jko1xh4oqmpmg6ptf0xz4kvagdsehuwplv4kljggbdqf8fcbua282bnh6khz0u4ymhxkf2jgr92eoerqktzw4fphn9lkpwozwhwuna93411d5z8le6be3p8gn62bkyeo74e4spyo03anbxu6mu3g71ckxlqg7layasixqh76gdz1blb8imsr3z46h84aw9bmvasnigaj9ujgesm0jlvhvpqueel3pr55yhh27r8eqjowrm0xzx9j600bf5pghev0p16iwqcbj6fdj8goa5kl1db9zcmg3z5do96uu7845xlfelfso68zuflhw6lxe9c6dszr4awtyhbydlgi8hajq4xzwux7hk7nomjknkd19ynavb7deqz8w8lwb5x0u4jjctr2keryzrrugi9s53ofrlowte0dgyp95enzi17c8jchj8fd76c963c3or9kogsn1vnun8zopvu5o9sk7e5wm65h6h4cnl72rrmx0mjxwr5539hs25zn4spe09uoa4wxrx0lhf5jeno1txjoh1jd2nanv30gbkt6mjnoxkq07x1c21is5dkdgfrdu9fhbigjflmf21701oj96bvyraui1dao01cqczigvjxynmp0ja0pnx4q9gw7jb49ranm985t6qtoq5wh3kz63wvtrsaujlg0rmebac73ljgdzvdh4cmvk0t4cforbho9wblmxw5c7tz1orq9xtv5kvitlzlfk98stcrchm03n74iqpw4h2o6ix739cgfxj0fzp6i3cwpt8mkcwhkoy72ybxna4izm19xz11fa4hsj8x6is5kgkud3oof845p071idar3sq6goivy2ij18wdqkako2hj5453wpp4holgqalqnxc0ftxlgmy3alr2yoa9oz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'tovpfref6see7umlx633muz66whd0ee5wq1xzl5pck5cjvp0b1',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '5mpisxe1nob3gqlruzs9',
                channelHash: 'lulzkgczjtoihvzm3ynhqphslqcvcc4cbs0wazxg',
                channelParty: 'h25a37x3rsgxjifn4gy97nruutxcrz82ii4k9z1omgh57bi9tsly62nqlse6iep8zb2nnxtarlmik4tz5d6jmmqo9wefy1liyw0ulwe7o5klvo78oxjmngu5x0herlr732vhcfo6hx940h2ptr65uw98roiz87a3',
                channelComponent: 'kxt3vg5hpdy7pqvgvryn4u9bqf95myfr97t46ky7s27899d9417l0g30wcxs4c47tflinxyhqq7mo926114uo3hw8py44p798eh4sanwwu6aqokr9egfpo9jrw9aixz6z5ah79kqp07ftwx85t6pypnd5g617hfx',
                channelName: 'w7y8dg1w3wi3743c8269ae39y984lhqfex5yta33tdd3onpbquussk3gzwpdpdqzwymg032kzd28blybwuhl5j8j84ka70ytjmlzgkbbwyy07yr98hzduzrwi1t476j1iojoz7s2g5crd70g9wm424tpaz3idal3',
                flowHash: 'egtr4m4ph5trplog5nn67tb32za2nwxvhcrrql3z',
                flowParty: '85029xdxh62ufprl2fh4z5dkb3wol3azj4d5x523tdyirk56g0iasypc2b7jflssmcu6iow04jsxg840m9askkjkqa39cnydy8o906firccf6d9zpwj8ushzubvhrueswe1zd410mse3sbmhjyj4xs3ks3jbawao',
                flowReceiverParty: '4bhlti4wzqu235im8gu1noe4w9aiicspd11fh0pf1wjs62it9yicgzlfprsbrqn7wbcev8b6g4bz9b1vwi0x3p06e0dl90v2ucxuz94u2nfmavb53sja63xzgz2qgcd14n1hb3d6v4sqtaap40cy36jnh2ukz66r',
                flowComponent: 'cvv4mvu833yb6y0tex1pstksaj749dg330cw891697byiu3y9vsce8yjummp9yzohjmdqrg4uts4ddj96mpcq4temt6wum0o9a0i01i1pvgy3ql0jukiou5jm7ae8k2w3218khu59zdqv622eetzh79to0j8tmms',
                flowReceiverComponent: '3v4wre808uhrz2qb0x27nemctwq835ft0folkaiurk3quqm9rfiuushn9m4n4fkkztuckcakm3wvem554qb7ne4wpryb83okjwvvtdv281s62giyu54ok0n3dd4gtfpbd49xaqlbveyap2ojcsk1z1ecsbsc0jmc',
                flowInterfaceName: 'c4k5nkzocqogmioqpp5tv2c875ennkfbv0sfx07axyicx8rhk5dyc7f1goki5nvjtfyv0egzfz6p6144f8hb3edmg3d5p7t01r9u4bmlvbdxxtyso4e1yryl8l1g2bt7z9cid1f62w9z0mvsadywp7878pptnj40',
                flowInterfaceNamespace: 'i94gfkyqhxg1oke21m6n8t43kqcxwlnvqjfn8f1hryvx381vypomium2ltefq1ttgp7gleslervwkww07wkp466aykoh4g1c9upe06h03t9ogodzcdqsuq1u39pulu83x2cepgxe5mbyw8cg965bjqqbx5xf4fhq',
                version: 'xavujvuxriucsvl815h0',
                parameterGroup: 'idu33v4odxu1axlm7vvxv6f5kyemq59zwmrxkyrb0iuhv0ivn4z02a871ry5e1vlckwz8dja1k5a55kvlj7tjmnyxc2qg2dlrsl3lbhkdnn9h2fo6vhy42gymbl51w4z20ahy617paoyxn2v7seti0f3v4olnplchs38givem5lbp34kwq9bvrv9dotu7kjh1g2vqpg47lumbs3zc2sg34f0l9simjhxx2krorr3jz6djxncxljjp486fqa0y8kt',
                name: 'nj097d7qup6y1zcfyeuk7jycg58t5mso9imqa7cqnobfb2f32a5xgjhod5op7n06ztxy6qr4a9h2q11ki4yxkr18ilnml0dfc839oijo6lte1h32i5o46soy88hmz8tc9n358ly4wjvdzupc6u2asuxfz5orqlcyztjie36btjwp8smqe9r2c6ykk47afuc0yd5ut967dd0elfz2lekm650bt2unpms6lhmu33de8wonqyuchwggvx2wcaxiiynb08lmta0p3k0e6r03mkk7kmzu8u93dzdq5pkmlfped56giir486wr7r1zhppegzmq',
                parameterName: '8j0n8p0v6hbdddru4klgnur66jls12bt00n9wp35lqcwctkvc7ew4kkfnnc6evyc15ix8pocmhjgfc4jismwbceh59zhjiehu9n6kwzjk8bc716ryp7exuckhaek69uv4gwbnbau19fdkhixnvt4h8sg6g4656j6qw6enhlwi40nikgl2z4zov5luyvurkk6jvowut2aj5xje5m7wrnvmgwom22fu5b7skrvv81u9ijt52kwuc69v83gww3owwroc3czy1mpm3r2p0akp9isdf55qtynjtkth07xuqkkhvllbhd3hemqsqjg1utn69uc',
                parameterValue: '34ympju286fjnfrhxuw41bni60z5ba93gg7tssj8lvdhpbnkte3sybzw4kh20xutd4q1o9m2cfjrl7lb10adqacxkho0nmd2cu79o1v2sn020wfv1iy4z7yfl6w792vyvb5o8hl49v2svkwuui3bs2w1mq1u2ptlwtp13asdkak6j8aphduuf40yors2rn5rrzqio5qht5xe2votu80v5po08hcrfpj6q07txm0gyaafhqz69jw6u4kkyelr0hircj2jtpb1dgft8c8x0o5xwwes729p8knd6uqpsu27ohon1rj3ea2xb4al46rfpobmvgnnznh5nwbnlghiwxny00nhrrse4ra307cho67ig1dbdxm3c566kx57ob1ncks5weo37ufb9s40rqbz0nxau0k3mvecp70x1fitgsqzo58aj7togvswo8mxbq0w37d5uogq6jmzwfs0bw958dp3qy1pdc01v8y6znnasu5yh4e392pi0bjuhh7xvkwataogkkucgfoobpsrdl06puwgnjs0ifzend2y3v37wps0153dr4n1aro0bmkw63enllek07uagipxta47pvpfz09zpere87vclbpa7djrm01j10auyh5jj0hz0zr98qd4hja6a6000jct5u56g3igoksugv8rj28nkcyu7f43dxkl79ulqsylip5oi1w4skw3pvqu6ih14i79k1vc84rh1bn71sejeb1kqbiddsyllvoip5g7i92kddctjbudsy3lg7f1o5eww19tlerac78n8p49dcog1akmit8h1gzrvvczvkprqvybrd12bmxch4sroixnnf3xx9nm3nc4715xnv52jfpiwancd6mam8vrdqdywz38t8yviiukb5j8irl9beeyfmclypukrtthwj5mv1du88me148po5jhpfy5m6ugz0crkvw3dnqw0pnjkzxfe26piut35wpwvmzdvnttbpwab6p0io74bidyt5gmp92c5p4y6eral6czx2le489i3dw1dfcshwnshg5jxd29a3oqn7hyqzvs7sxa2c8ie0wrb3gvszkne3xrh70gbtyirpoybpdohhz0wkhj2bljtx2xftzdolh5wtp0l5o8x40f5ypd7h27q4t5org1t8dz2dupgh0g1487c751q40igmpvtnzw706366ctl8v86zxwlqg8wip7gq6eg00id714fvuwx7c7refj7aae80t4pganbwdnbb9anl7l9wmrac1e9i4ifctpulgielnk6lynmd2xhd39vmo09rplwgv2h8vghtl3dv8dnfd87rv37sf8mj1qnw6fkjyahpvkii7hes46auz7mhczy3e5mme4y7oiekpfahnqnjp9kqrcqjxuoikpxquphcnb824uspdeesdl8horpamyp1dqwyv2ckqz9sdurm5jswz19pzq3pqncsfy8vyxq7tpi4waaorynuhvu3r1jq68k5k9lo1v0brtizpuhbso70kk24a218qekvhxo4dss8pi0hu2qtc7ei9ocgl7a2rpaueh2wymxh62baaikw5nkkbbalufzxlt73o9x1xz1n0yatdroshm0npnhfyyun79uzrda185u6m9piocldqqsumj1g835lagqbbsixkxzp8w90hi6x8b9iotqnrgdormbh92xro8phhn64hlfqfbqpjxod7rrn8gy7sl8kbnkfo4zyh92gmdwbvcjgfbi3y4d71j4bsjmpa80v5o3rzckt2ttx10g3x0rgpom874bki4clu2yntzi1tuoe4x3wz623tz9gqxzm3qnhhn16f7rrila7pm0rcmhv0dqmx11jq3rmmfr5ivx6vn88fsgyumg41ldld6hxbakn19gf6bqc6hmxosjehvsaozsd8rjeyr2jh1uxwnqxua03sox6hnvig42j7k2figc28z6447alxpcr62slt2uq66ipf5q0wr3n74x38564k9c29wzscjpu0uajm6dndlml3velbrvutf524xaweim3v3gtorfve1abnuz7pkjfs3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'ij236t0idkta5brge7pooe7m0u0i8eddvynhpous4fre4lgnf8',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'kxmzxtzm956pchj7vrna',
                channelHash: 'azbpycrchzuwraprew3ady2bb8jx7u2gjzrh2smq',
                channelParty: 'gahzl7zckffzqwmvpyvxuz4doprem0zza0aosqygft8uf912g8h8a0qrpcv9t56qv200wzp1gb4le6xedhkbhbi0w5jjp2qv5r7ao1eq508195p5m943vk6p8bk0att6ygj19re4o1qnc92zn77rpnn4lx7zf1jw',
                channelComponent: 'w7wulhyq5l8vezuabfmcp4x7z7b08qvamlj71y8vyx7eznt7tpqe92y93rys2biyoma89kptm6bvk4bfjetzitu1m8v1z0q9jojgw4nxd84uolg58a6zrzarq2w5oki0z5a8xivk9tgulgqpy61rjwxjl8rbez7e',
                channelName: 'dq8eogvxsqwwyn2824l40ig8zuf5bspi3oypyytzmhdi8hgjl9nt0smbqdtrvz7lw6sqwhv81gjkna48500e05n3c7tqbjmwsc87apiai19cga8si9wqsa4ivs4onwdxap7eibq69s5zf2l5rmyb1gshm5dtrqkg',
                flowHash: 'hojhvw4e5yupekeotnbt2g0z0m9o34sz8bn9scas',
                flowParty: 'aiv9ek5zxot76rznu0o4yjw0k4wqdchlqxkx10tibfed6dka8sauwd5n0i0gn9bb6uyy7t9ftf4srnxtz5f7wfmz3hobklyr9sk7t1p0gwvn6vham1v0zu707jt5wf0f48ba8ce9yjnxb2309u8il7qmh0yjgshw',
                flowReceiverParty: '17s518xbb6lbivzeox4v2y9gcibhe0jykqjt9tfwgmflxgcuto3nqlc2nqyetblihwe9l69t9cdwpo5xqu4kq2e36yy0zovfpmnv4qgbnphi7iwk4lyc21au1y45wxr7k13fnhvdwyitdcgndbh6h9et0z2kvycu',
                flowComponent: 'edr2p1nd8tt6zyogg6wuoc8382r2t4vhfhr3bkbjqo9j7bxm7z2knsbpgsasea49cz519lv959ynyi599mhz7tru01kds0lr59l8561u801v0pfua5s5khyon527ybj67f9zohqntcdfo4tzckmvqmxxkthh22n4',
                flowReceiverComponent: 'h1kj25jnkcs9oxqazjz27vafreuzbwc6199nsaib11icb6x1bscur8l00hwyzxgh2rdfx7au5k8h0mdopisqrbio0o4cgxf4rj8oaxln3xqs7u0g5jnvyttyojdsh5ab5fvcxdw9qogig1o10l5t2iy18cdixoor',
                flowInterfaceName: '9tdtqpmiucothenecl2ok6n3ljjt6197srtx58ch29fvi2r2x25rls1xbs2aqhdi6dgsqfr3510mpfkudm2hkxwm5ceyqg4ommea8gpuv4xy6bpxbd7ln8k0wp6q8lhkq97mj626olyag136vlnbdnk4ppsmqwqc',
                flowInterfaceNamespace: 'in8kthterl6row8fi8vto6ijol1xmjg7piin9x7dgpvujbmbgqlu59v95op292amfzkorx13kigjjygl3mxm3pb3xek6h6ibo8mg366bt8bu8qp491ze9zfnazzwgou5yk7yp5t37rzm0wt6s7vv0sg847dc73bs',
                version: 'wa7xcv2r7njd3nyipesy',
                parameterGroup: '76l9fbsyz39kso8wg5rc0ma9bulzsyvf8c03755d4dnd2t64n8escvgvc7cn3wlsntyz1tlyckhhfn0q2bwfn7i0b5zvz3kx5lfri8rzibcmmek2rtkpjpvba0ez0vs45pvpwetng08nff757v5wybxstv0uwh5s47f66mrdh5jj5h395hfd8ow67fhihvpnibf5lt4thnm7wz2uxke17dwciq7e9o2ovxq38p1xt691nm80maxbr9d2o5q73h8',
                name: 'dc1i1o7puvqs7589hlpn67qkflbhxnjzgbuz4rsrt4j08dv6ofnhfhgxfpuf494jjwv1idyp50mstxm0g0l8ndy06slabpx2w2jp5m9l8sjy27hofwisq9yauc23ej0mar7yty53aahrvetggdo81l9fjwdtdw612kbw1c4310cg4n61nops8aoesfo4ruywx87cvqh49ck3qjpqixanlc7bx4kj2hxqkyx24ds6g65crvklwt13cyoxo5fi4zaaplxg76v6eugwdkm7b41jwq9ye2ho3qwsgbp6en4pn0kocx9m4f30esq0vr99g8luk',
                parameterName: 'xhf9g73j8xfxa4ihn3pfim0501sklk8g30ol18ht8hh998rx2cs6mp753uvmojyvf6qih5u9x8hocjwjrzfvtcrxscwnnvlmbnthxuxkd0p8qyr7sso15zac0f05vkyo9z6feu87nmr6bi1b45u819ahfpa7577i5hyq1p4ceiik9ijnxhpo7ws2lm6y15gs1nvi6xsuxwe7eltzoqe4kudxuk4gfpuige12fd7orcvipr2ie5560gkmflaja6uadt16zy572h1pybgqh2qw9gipo98fcmmdg88mvb96sblwm71epb9ty8j1x9csmrme',
                parameterValue: 'uuox5oh1ycg4j4kmrov2p0iad1wi353hipjyg40adpl6k9lxmdu0xbau9yy9rts43w4qa9b3mf2tq6ovn3885lgtmobiv1w00m1lmh9o6uxluwmspljwm1q2is1mfff5oe425592uvxqamgfhzbc7ua4pj5tox3pgvoupjggvu663czv6dx0zu6oldicu1jzcjmrib6bebfq6q195igi2ue6mlaflnuzvjtlhxj7st6omy6ymlwllg56jg74fe0vghtqksodtmprqc1dr69ab87wnxvxtng05528mj7mbyospnk9x9mlsqg8dfljdr53xq2shy6c2zd9pxeoeqg6oow2koar3x9iwvcskvtmxe79pp43n5epjox2x707vmga7exp54xcx604xkoyveed0c473nm5lqyahhtiqqsfqp0s6p06rq4em5mddopwwtimj7zrr6fihfofpme4lyq18ffz9d69iviumdkjb0py9ue3przuuuzo43zmiyrvn3ub443cco4shkzw963hju7o3anxn3ruih5kstvrqon8omu3puzgjmtnjyb0l9elnk0x64tn9821azo44vmto3r6jx3hyqd17acngxz1vhmk01jsw3hyr6u7yvt29dlwf2dhs13jtj3o7yv8mvtlcwhakzgxalm5vp511eepud1s75k490ml8jsr3r6n1clhmq5y5ju4rijyydb30qadzl2wew5nt92u5jsba8ft4x5hyhw4mrm1z6t01ddlntbpwmphyhjyp1cbymxjpkk0uqn298ms5h3kleh1xn8661jrv9v70ll8sc6brjl71k5a0cw2zdphxmjn6y5kk29no14htlp9vhs1yk8e0wlabcjdoq9l1ox99o7ypei9p6cps07hoqc5hr9ovkfvk3wsu4ncwi127x0xs0woqy38le6psnf7mpe514tpz7yfaj2gcvd9nvi5dcq4qdlflkv2nu1agaemokar1av7ledqw32d2f7b2eas9uruxojuewasthjmgihczfcnffq3761w55njv98b5nvlngw9jis9rs34k0v1langmflnao4hr07jz3g26rq6w71hgf36obo7guf1tzwmsxm0v1kwxprl7wapb7yznirag2cl94aienp9ykivgxu1lujo7cxgj8t7n85svkrta81m2fupvpf3b0amq32rszhmmahs2olknfrlbg5kwkabdpjhl6nq6znuftldsinx27jdefzajbagicr2nhfg6f2qsfchq6ensa16pcaxbeen7dsk715qxaiagotc85fgpl5jy01r3igp1goocfeeo8pib77ckslkvomwhs7vphpzpcwrlgnqwhppa3lx6jp7nb3b90p60raecldvq1wzwlxq7boeb69n9v6ks5iwtuzy0a113w5nsb5tzn6rgda7xwun7ea6zxbrll11wtfni0s808j23yomqd4qipt0d3vp763kf0ht8l4sri5bmukgizcghfyqlhf53rqflf8ya8xadc64cq6gan9i1jtj78tenwjwla5mwthepfvie7j6bcmpyv9vyo0gcfrrw5zh8714zlxrtid3s9jy01u9gvoa57uydn09a0cam13xaiivpea63nrxx7oe4hjwyfapslm188w7j2x6mkrhqvsofgng76k8qqvygh7xipm7wonf2jv951qm9i2oqy1u8qrn7c6fiq5tpw9tkjnkyzupd7ob92e0449otiygn5j8sswli8x3nbc2g408ex3z7oxsnqsrjazj50c61npfutlbu6loqpnas359x92awmigozypv867q2w8swdd0aauyi43vx0df4hmoej45ia1qo4ndypku5vqqk76fjyjt8g355cmtu91ejm9dah2hzh7e9yewcnz97xxj4xxk13cf7y61c2g02vup1jr90bi0vydr0rsrgneawstaq512yoml6mwz625tebkepsmn00l7j9nzajm666ykd0gyixi8528lelqym4r9415hpl13d4arieyq1cognrh3gz9v4qbot2v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: '2jeefffta4h3qv7yggkkl32uuyb8gybv6p1vecj0y6agn3pt2m',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'u0rk1xzdyre8mmmg5zcm',
                channelHash: 'qp30o08dqkthia57n5bu1cxez10j3hmmd2ufgihf',
                channelParty: 'flgo9orfp0wyxgvgb4bzhi1sbo7k5nvnltoi7p2dtagqllyf01xi9mwks05mlswnuc9fkgrsdcgyfvj6jq4fun28uhq7pz1kc2ij0yhyejnldrm120ia1jxyh1shuvno2e9qy9enx3gptslsf13zumgk8i835htd',
                channelComponent: '7wheqf87a3pebg73wjwg2nq7b801iorv3xo0ypzz4wkkdagg8hszmr8xw5az4t5f26dzopvbjsd4t6gs4k6nick5gach1140sjf421ylvctjp3w2tdg7mxqgje6c9u5slvbugs8fa8pay5qjmu39rod4jntdccna',
                channelName: '833i76sshrk8nyrondhg7noxi1d8tbiffed0dazsik6f7v0fhbiua9ckd48r0bm2st2xtlhmmir81ehhyij61xnfh6lshib34lf9pmjtb3l7yq0zwn2yjynicmonn6hqzu4s5cgd4q87fke4m9s07wewsyiq80fl',
                flowHash: 'dw9fsftjj4vur7dukuqurme7ouamm0ukwt2w7arz',
                flowParty: '2rdssj6c9d1b2teuc0dwsfvg8v6gilou349njdzafkkw0ekjh17pcka37h1c9aulvucols4dj9ilz37zd1xnu03v7c8hmx1whmw69cscwpbk36wzhp4k853uec4rmbhk3i54o14b68ahhiz4czjugq0j4kyef2pn',
                flowReceiverParty: '8sdxe4dc1p10xe8wekormltdas3t27vpp98abf12g8k4eol9zpw9qztap4aswtx0xdx8b9v4vijv5e0s5h3ged8d46mc1aze2r2iq2gqulqwz4k20vhbwcqkn1yej0059qqatsgqgkpq13xx225l75oea1dy9np5',
                flowComponent: 'rgjrpiwrmqcdbh2aopwut9ocicii48yigfq6txoq8abeqfoamzwj5voklghut8k1cdtxmj8j2pczugg0pb5kkbefpy92cmou5vw5edgz8o81s7lsbf5ei4j8jobrjdlw32s7tb0635ghtnd6pr5waoj90ahyd2oo',
                flowReceiverComponent: 'f8qq5030rfztgf7npwlnt17bhwlay2idif54vxjxf6cw1pi4ecrhnazc1eeuvjl8dts2yglwlt2nlj46fxe2y00cd93hrdop366alzz3nkzc1iskdzcx2ok8tmpf94s4wwlfvesnq3ti6yi78uoaa811g04nmyll',
                flowInterfaceName: 'vii439gbpybpsbuvrhtin2mx39ommsiq78v9b870ehj5zgjr29fdt4aqioj6cmx0xpxooithuvmoz4kxgtc5u1wqhkfchphi2xwc0073w7qyq85zeb5ape8frmlk2x79hhyp5717kr2mebngp33byt4jf8xsveo5',
                flowInterfaceNamespace: '6wix7pwl82ngxdo131ujv5pkxszvwogt03i6e95ruoaem25fqm3enl8jxa8l58f3c80how9iej2hnzowvx44qnbr7zpdbujgsr80yzsplgs1r5j9n6o6zf2ucxcmn42oyuttob1yo5xrpxugndl1nnmwzj7yueuf',
                version: 'ry5uyuvbc7qbt41aormn',
                parameterGroup: '46q0kvw1f7vasi41y081l4ezew320dv7dbokukle5pi7fs17zy9sz3gh04lpanm6pt6vyt4uu0i36furc14aiel8zh57kt5ga8ir56aoslj4ty2ef56zqwob9mpmp5c4d7w1g3m251fyd9lww4gaowi9mma5h2a41yc1l8qdoharji2673v8yjacvug2z0mfx3jspr0u20milalor1q2nkspi6rnydqwvpplfbv4poiz7k862mrp10i7lihs5ik',
                name: 'upr7gukp2va4u8irm4o5fdg566y5nml243irp6y1jwy6dl24o3ixrddqkt6mpgr5jornv1mwhlzjupdmpxgum66c500w74dkaycko2kbapvsux17syib1kgftu05tri95j8d52cduuxsg6m3ayvlnjou3u2rbl45fnkpjpda3y3xp8tnkcd96gejlmy02nc58qq1cm3i6l17ljyiq7uq0dcyroafjhwmn66ndz77gx8yvglaw3fw3inovq3dc43zkww4gnnb389h9yqldl3s74d5hnqn6d1guiagtyxp99by8n2ek8l4uulacj711suu',
                parameterName: 'mngqtr48b7j9px17xnn9nee0d12zntg9cy9on0ew2ziqjg3mqch7ns12xetvv43x388vlihucdawga85vdpnr6n0hmimlcoj79aqsmvwxxp5hx1afxz2xe89zs0ti728v402j2q47z7lo0mrrtcbq3gsnbojzb4hq0330vtav5ekw9jdknvhgp1x1seun1t0vl06tnr57b9j1ehwh9bnwtcxj1txv20cqbzw67jh05fzt3lvppflv24ux33u351woke3ufnnbnyw170oeo8v10qy329sump058cdoyf4p87hjx9u7g6ryl8ft6o2eyjdb',
                parameterValue: '2cnww02c6azchspluuxo97p3rvcmoirpj9kthaqppjijc3gjhtvzn1qwkhnb4zkwbe1xbgnpmkt5ffaamg24dkh8bq6jecsz8qijb0w7dwcgaw083p0nuqfb3sjfs8q7q34q74xh7kj5ikqiipo78j1t4gdk2y3cxnr4vfhmtkjhunf883ch07je351rbfmai1zlsyweg8lbp2u1hhz730bs6ed4qdz4o201tfa3ge30k2pg9owpojcefpk4uhlifueexd5batfuhwrx6m3qukaw3j5p6mg8ejsczrkign7le1cwrm8m41yak9qsc9a5v7vdigsvmgg0479vy00z3wkoqjbsppcpezqktg8kk16towofwxowro0nuezm89y2v936om9utrndvd5zhe9o087iv6ln83oy0189uh4e35s6f1k5jmbxx3v13hh3e910fgtnomtqxz97sb1rudvrlvu46dnuab8jckhglkfuatwps2jpioyf9jg9uzwm726gyv1crwhm01c8aexcd0fnp4bx9dkc4kyxz32wjed7f31bpi1fhrkb6dg18sojci7exn0m81w4n3axwgdw1olg4hv4448xyqm80ultd70exqstq1bhx39le95txt9hbzzadt9wqem3uhdfkiiilr8y56w53v1zcmf3ledbc327ozmfn7d9w0bqggj4ustd5wnf5ffl7mxeg7qxxg3tk3y44lk40555suatg7e7ek4f0afbnl9z6vhrtnof7uo6oixs3cn7yueykc80x8c98fz85hyikrn77zwdmvx2f01kz4ipbf3w0mxjhbflrplhe6rkzbpl65vtq40j0jw2p3cps5234rtlxvlzhrvcade9ibp9mtmgqgv0yfpvis9uz43knkrsdz3g47nqc1wkglwngmp5l39htxwgfaw1vsgeovxmft76fz9e8ui2nrgf50o768bbc5g76hnrq4h9dyslwc1ux9rsq44390nkts3n9w4e1cmpj7oue9h5vj0rl5hnz6vnvmv900h3lmj6waets756mb21cdh7bzhll7gm2h08dry567hgyj9mxxg1p1bfm19o4ih4x023zejrc9wpuvjugbs8fubuayja9ke8uw1zyxngsn5wta75te2mqcnpj50y02kluj6kzqsp1huhmxuh71ayv44x07865u1q24ywswjtjr6oj16anzy39xoslieyyf8821g83lk9ck3z8nvkiqvt8ruou982ukhvkchbwnh831wodi1c9pqdtfkspsrwg324ij8m2xf42pxcadqxv11zzf8cjmoo12ad5f5qtmwv2ala7tcu9elv6e9x4zhr7oybbxknfcojwq277dc23ufjqmugoqwr4ti410n705iu5nmseqf8zomoew2mp6aiahs73nu6or3fchm9c8k1qf0jfrlxlctxcp7wkyt3h2y7ypowxamch64a25c2pd6djn2zdtmr7ua42jup9sdbod0nqtfpwx70l3jty0wpcmipdn2qk122nbiqg7vyytdxtrcz7lej5d4hkqfnuynbe21hj66zm5avw3st41ety361diqpo7v2zbsxmuvc2iimqlx6qtyp02qwd6xvvrb6rngnhez8fw0wh60shgxs3sicry2adssd10qk781v9rj0ettg4vg16u6fvpvztz8alx5cc9m18la1pirb0o42xummhzn2salxk5k1g7awjr0wvjq3uya8m7wksh1iu3lx5e9ri7af6o2lq8fybjb0ao9hyof1881p7g9w3p2rt1tcx0mf635hpszx7x6udrhm1gyj5cqut5q6sz0lscctx8wu7i09evdildohduyvdps3dhtgm893c3bcmb59gn3nquubs4ub023l0qx3rp6rvyowljspfg9parbv6kuxfk4oc5i6pn5kbjq0gbhxrxfn05ver3n9lyuluz3ux6aio8evii4vrqtz0984865s9yqbx93hbfq7xxt1dquy0stdmuk3bwftb9pi3ypdjvjh1fyfliacbd8u4mqfex4w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: '9qpbywd0qu6sy30plvea59hiyek0y97j6eektq2w2kxlgoyma6',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: '0phkkw8ypp205er9bwdu',
                channelHash: 'nyvjpgcx3ywuq0madn0i2y6cnmjq4nzwojwfgz41',
                channelParty: 'dmyr3vxg751hj7104khvbyqxfiptwlg1wene4vzsbu4olhee5n16o44gf7lhsnb2l7paj0mb4zvv21byozr3xwgs94dcnurtp7zfl1fqt2whsry70pbrqzibd3htajel617djvnrahf6toxpjxklzlu2b8z61wk4',
                channelComponent: '720wvj36ctj91rwu4brt53uo5qdljfg37r55yndauu74cpf9lw0bo3j7q7zryxp4vjzdwpu4w7ewgmkiewkjx3iu333lmx4s5vk4xdf89yk6btq97xjuhgx63w5r44b1y1n1y0yj155mdw4ngnmoe8vswexvbhov',
                channelName: 'qwqincgw0pp3mr40gehufwi23n9kipx7ffxr2ro3zqpg826gc2poaoyawrgtmzptxy5ak9ist285fu607kk6h581f99o72nzh8j1sa8kiwqqbvc6ito2s5axpaozz1ngd6blndak3d1s7c55ouyv410worlgin7n',
                flowHash: 'sw1ow9cijtt9a1jj0i9nbaypxiha698l91l9j7m4',
                flowParty: 'u8i6cgcjzreakrrcmqrfoquisbk5dz1ypygfxnnz546sxhz1lfmvepuumoap9fwdc8du8ejs6m8701fs371ro18vmnigem19tyzmfvg3o7ptolbmd90o227lrkdmgs3q7dt8o82ckxbxyuy88yillehob3ky576x',
                flowReceiverParty: 'jncmymdusdg10rmyo4vhzgplcp6d3ufkpc7ic14w2bqfhfoqlk1inwacaso5571f1a3ujqpxl7te579v3dhg4aiq6xbdhawv1u27heawouj6qqk7eo2umka3npbvnvl2uecz6wiocls0dulzy0w22g5id8so0ead',
                flowComponent: '32nehpdp9m76c9vzudqpolkzl2kak32rp978gnxd5nu4fl7m95alp0ix87gt7lwyjl2jcthlgsdf297pt36f6q1lybbxd9qhzb3m4px51tg91sbch5p37z3xgraya50bfc6p9clqzfq9pd0zq5rakq9vk3e7eg0r',
                flowReceiverComponent: '3wl9piz88dptkltzf8turgkq0c391822s7vqea2ki5r24y844jo7u125f6qbmsxtn12qvc9c74a6ym8003ohdvfanc78txappkscy18w0r2ehj82un3b9mkjwswgl6ngugz165om4hsnyc0wlibzl9x0jx2aehqo',
                flowInterfaceName: '1432g1pbqk4mjtphtfa79ygkosfssv0nssrwnlm2czxk08i87cagiorpe36hliuhgfbsqshucgoe64b4bz3qeozll2gg9qul17936cmhuygqleazifi8lh9udhoocsmnxbp0o4g9dpxlyndb3o0cu0xoiod1ajxu',
                flowInterfaceNamespace: '85wgyo03q38j7u907y4rs9fsel07d0lowmfnjwdxsfa2vzkc8c2y4g55lz7om27g46u4hcvs6emjgwr4wu6drnqcdph9t4st31ljtr1nzu6j5ajdo6fe6ynob05l4udqcbfi8qbzizorhzz0ka6nxt282h3c0qxa',
                version: 'wsoudlgnrwsbs2sukw5m',
                parameterGroup: 'hf8774hf33n31r2npjicn52sx8kyex162ci01o8okh4xjw57zuejchv6k1bpjg4p72pdocr5r3yd7ncq4kthh6mkp22hm5btza4p0eufauar5k5dl7xw7sbwpqqopt3xtvkqfbgi8rpmcvju81pnsh0kc0mjv0y61ydc3eixa5me5lnlz31zu6dtf73f6aud1i6dz4thhfkbz8ri3ud71uzbyevpqj32qzqlax3fzyvtbkwnazx2hh3j30jr0af',
                name: 'av9ek7h66zbn4p7wdbkzv0hhs7n87a1t8vofhskwpfvja7cnsng18e9lhm0f1co5n2r60gdw92z36vyeq8btmc7yab7z03873ixk2iuaxxnk34bzgyiylf5yk89mmtmgebomckbf5cx92s9e2iq2l1tys637dj5i88iuwlrqb1ljr3s2j0yv7w88b4wf2i3hrgqnpcqpxqxyraxc99fthu03bh6c06r8a3su7eu96yuvhhahk5qn5pvfcm91k7vcv87wa6cz0fan8huizywpmcsox97gsecst7p30wgi3j77ev7y39cp4kmgwbutdwcd',
                parameterName: 'f73odz8tio1kr1tjv7ei23hq37gk360bi3onxt6hvkyjebqhddgx3vbhau5qvt6nl9xq7tgf4s3i7xo50khgesy0qs36d32sud0r2ynj9hr2shn3oziw2n3288ki9uc7fipv96n7sjz6pi7s9khp1ycoqi11213czeqrt7qq7zq6u3h3fibxw2h0c2i4q7ea1k50nqlhiwqleqtr1izajhpbyg5if7gtw387hwotfcu14scrnsnq4akfy5z09eeqwympqx5mfbb4l3s8upt4pdtom9g0jy8ddu8cn5p9pgst0v91f1yr3q86qu05vj3u',
                parameterValue: 'aj4rgt0p8hfzxdzoyxu6u1qo8cahjic75iu2vj1hc1zgeqmpcemxm9qciqlz2vw9jli5rzwof0hnhkyu8mjckerpszxqyn68pwaepfjits7konp9nqlzma92oelxfqtwfk6jbqxu3m23jdcv135jeggazg2m7q9kyzvzihczk97rplp1yf8rowjg6dr23n6kscrxy39tj8mbwxhm6ikcg3z0wvlgi78xvg184xaukgtkrtpitwyf48bf9y921891hpg2k0cw4elz4y3nlgpxghtum6z6vymkwnbca4o513ifhu78e2xtwvf1kmdeaiixwf8bbbq28bys8u8gssfkakbvaacke65jmhcd8xjx1qzsy6hbv3xvzadxx9rd8hu207xo9vby6yw88hho66f8kn8jz53wg82opfnrz4botok5ck5lqxawk1escr2dozg2w8em7fw55penw9lcg29c3o83dvbz0sm0nay048ba5mkbahyjuq0vtohg6irz49nd1cornn2mdvw8ud1i7bgiq10ect9kfpp7e430bs5lkhsy86s815l3517bnwdmyvw02ymfp40xbkp9c8nwmaewf1vjtqa4b31jxaj6l5a324iu27bwgns23s65qyxiqmstvv3t43h3dqlo4a5ywrx4mkriz6xvx08ettbx7l5qevowy5tmkb5jp57toxlgjw5z53ibssbpy1wd7xdk2a995nq2unsj0rqaxlnnfmxcotpms1mhm6khso1tx3qd7u1hczsa6fepty9ckow9k3axr6mwfbushqx7jo4qprkhbgk9ogg3y57lmtjifnmmmand3gk1pu24yr7axpl42hamun47o2tf030h3pkl7da0d3luyvd3d6wcp69hf0h2bx1yctvf6fbzkjxbxirm0lh1b6lxw6h17evh9i5iph7s4ehsk3xw4fw98q4sqei6xhg7iwowgnl4cesygv3vz6lz9upv8hrznu01ekzkmp7q8l3md0jzldbsv111dsjbmrvf25a9fi4mfgxgcp4q35y0431xyf5q2ojyfn2vdfietk0f5c79qqgj0js8xrver6qdyfazcva5xje4y2nvpz491ywlvdklmmlimetaeixcufhbbofue9pth30jhpezkeebulriq0mfg7p6pfgumvx9rt4fds56uthdsyb1mzrndpzkpjk6iblq5dznjfs6jqcvrhc26xcw8gbnikwavx9bavx569obhdlway7tp735folczudaidmvojbr8czx3d0iumh5uzo2yoajsbtxj54hfkg08dfuvdqm5vlqxuvavm1on1b90ci9c5xxmleaq53zbjmkh3yjryikp8ejmm6a62g3wvd1osgyeszoa03c6mrtvlwb41xyq7jt8kt5xxja0helwqznbjhlt6nyejensnz8lccqwdi3rqngm5yj13d8yghxt2zhe84el5dx9c125tybdgjutt3rupr2pad2dggpkjus7dzh3vg39ifbvctaot1t3d92f702y7nzx01a789465s6s8pcr2yhtv5hf0rxt707rrcbtz3t03hmoomflvupynim1jj9m17dxsxad552volk61v706zvmnck3kuyijamv186yavmdc8ays2u5w43aoe8tyalzldf97unjiw3hcjmz945m3herpvosfh945gkb349mcc7sly2pjr9j4rfux8xb7157lg4rf5iy19a9lhynhacl6t61b8p9wpoacqk7ys6nw7d9dh5689ahqxg7vbhni6aqlzppdn24n5e2zup914c26gqaqx3dn13fxsjo8ke2pm3yvj71udx7ju0mgguqlmkg70lacaybslnb84ebcqhipan4761j8ikcu37lndw54miyj8z8ue6ky46wa8xm3lofc6t2ugw19brezkb56y6mzth70y8yzx4yk7i64qtb1be40shcrf2tl472vryrohhgx5bfq3xypkxpfovccw6wout6t1tgfk87tnlsn9pd6dc5u2j3ke9yp3o43itry3op3o6e2ty6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 2048');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST cci/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .send({
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: 'e4el5um2fljyz18ldf6gtnxkr1vl8cioe3q9u05hisrfm43dpm',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'i5gf8oqjl8u9gltm2pkh',
                channelHash: 'kotv1o2pqxy1cuu8p05ej31fa0w9gtyj9bfcqe5n',
                channelParty: 'ls4s4v1p2q841n1zdb5s5uqy8kebvb8oglk0ko6wd68y4rcoi450j6pmx8d0mm0ebmixoo328ip2j0fs7y32t35ze7jrh4aj8830un0cb28k07x0doesa0zbp57cyxkvvwmkubr0d8ezq7tzbvgyh9cwsrca4pu8',
                channelComponent: '1mcrwi93wjn5hhayfi79q1mkc5uleksz2j22ef2xs25unlth7obekbx3esfhk0bnza3mb1bmazt119z99x0lot11i3ik8im15kanog295oyd8ns8zfst5vo4ucek9xs7co3kchqxfwntmob494l4w30i8bh5kv9x',
                channelName: 't7scazgv7adeve6qt4ocla7k4cpqr4sgdpsujp2aaf1c5m92km9aeofkmq2a4k2lpq0sqb5f5gjqnwzzhslfovc5nx7nupajs03jpode9npyba69o0ujj1dy7n9d3d7kcmb837m49s194vhiu87re9elokon49b4',
                flowHash: 'nnbkl10ljc8gzdhbcweztvi3s27f305spmromohd',
                flowParty: '3i1plxdihge6d7259e96bwtv2dczwkbo6az0i7m9k6x84h9z11580bvn0xm507vif7sbukhcvzo8cp15srzycfcvcto0ev704g0mgdmwlypaiaapgyx7vkmtdfhwarn2dlha069yicuid480a77l563it34l5szv',
                flowReceiverParty: 'pyru6465f0129op8hzm6qrzf40sx6mhkrkex8x5l27rapevgc9q4trwyacxp5ms0lfn3yapcwqulz8nha0h2qzqc6arbc22ndtb60nalrby11llf30or82qk4gbp8t5cvqdl91e1pe878gg9cap5sxpyvcb6nyj8',
                flowComponent: '7zughhd5idjbnnej1ho4dtii7mza5pu9enxcojl4l1wkugnupfcntmm3t2ljzw3kwvzy65w6fcn5ajwa2sedwz07n50zdcqrat2k9fr9pttez3n72ytibpvpt2a4a7g6yrt65hkmujfvdr4uaa9amvtf2kkyxm05',
                flowReceiverComponent: 'gr04m2f2xgu8hf2w6ht042b47sf651qb2pkdfhe6b7urncfpr8p4ly5whgo7pvinfskx3pyhrywp6aeevjrldnltg8qes2duafhih922hgsiewn1avgitjmxclphobarm6uo5s57uz28oyjrorruc1qdlutjis7p',
                flowInterfaceName: '8856pp0f5e3033npbr33wt32qo3f749kbsfmworlakfod9bg5ymid9hj0rctfw9px97zhoqqeew1zv09x6kwey0cv5mte4nqkwicxc3i6yq1dh8uxu43pzwv53c3gyp4k3knbvqqzednom33d0yj31nxggyw5ykc',
                flowInterfaceNamespace: 'etrgjn6d5p38j9ub2hbt7uixdjazfhjr146rlt20t56u4swlmfk1vz7arihsqfjfctz29oj0hod6kqo9g37ge19f9tk9lvc2rhg959chh1rqz9zpp9i8p8y7d2flcn7frovre0ozbp416djxzscxqvruc9rh1k6n',
                version: 'geddeb0cc6cqdvhayx1q',
                parameterGroup: 'tmt3v9pou0zp3vexsw8qqfgdo4pd4k8bpr192nh0kagyctg30cuauca3mr0szhs2itd3mpo2uc814sxawelo8zv47tld9amrf7jku7fm7fqndcax5k7wgj64xevlzycg2n81zbficn3jdv9kk1ornxxa5xdsz26xu43zqqn86v9blqqrffm33ebjm5tidnvl9lbo0js84btqaojqw6myvc9m7pz5t1spmg6tduhodwt1qihi19oqb5qbsx05r2y',
                name: 'sd2v4w5krtx7ianygu7s1tpuddywkgc7bxtqtnpdhglacuidf9h3zobkiyzeiq7oqyvpg0ok1jazql98odqt1hlyvk06d73g0pp7ou1x5cjnmu5axut3wrne3z7mu28pc7t2g0f0zame41ta95jisnczc3fjtk4zcq5auktp4luhid2wamgv8l9sbj65ll3fn583h9tbeswlce3t041h8n5hmpat5hj0dyxgiemqibn7xipo2e5trs93ol260uknncwcx1fi7ohe84fni7o8g29hp1ui94mh7ws8n1q74i31bwrxfg0y0h0sa9yv7axw',
                parameterName: '1xuba5ubdqer4godmupmno7neiux8654qjxx93rtpctzcccpns67mjt0nr5gsi6m33crnjbbbbfcpralxa1iklpw7v7w00izxf2a37qwmlf9z57hihna1f73e6ee9wa23fjtv9x8jkulq8da358abwq2pymv9uyu9do414792i1lgyeh99dhxdo3lfg6yx4z5ahbmjuk02iq9rrlxau2in7dns5bbzcrj4xt8yfhuqbaik612myuyqldb1z83y0sun0phfhjvubj7ev801o1q0tya8h9wcfkgnfusrfw5kf7aukexbs6fxqtgudpplay',
                parameterValue: '715ggdvv5np2b94wxwdm8o466ey9xlu67t74j3d4drn8x1w6t6e2fsohv8oehhjvh34fomnlbx5watk2154tqeklvrujkt3aahdxevmdt8lt8gwfhctnk1l1gtu2gsdmlpm0qtv5e0uc65xbqjfdezgdja0ca57h53p0qf34odk0132pyp2fsjaiw7r9266mxrnnu4uay3mlkucecr56ur3400x82t6kxomfy6etbksqyfb0cwajn9tl6qyv8v2xzrmo3llchwg2rho585r1y54jhocsi7v584kvmvqhtbgyhdjjfnmtkenuigglr61azi28l6zog3gd4ih9hxrvuolsj6h1qmf4l0ab83qh22ymq1s1s5l8sfhvy1q79sdnmahkhhgcy4ek3i0qiijts96lxno4cev83ouhwh5m88o44nc7r4q79huxhwh5gdatjxbcf61mbvkk2zkai3l7g0dushe4dorawjbbq5sheum8lyf34qn62onbmi79kfj8jav16uide4qaple27f99lt4sixylbj6kwnpzk6020txpor66v7fqwe9un7deoo9l7hfwa2xf7bs1rymii3nkppltaqlffg635rt8m2icge4o3vkquzdrd2e16y5bhxflr598dlfr28jc4mfakt25wvjzqpdjjl7slil5dzewmt4rg6g6far15mb6ot3x0hg1szrthswku69sh1ooq3jnidcm5ax9pt0i8hqy4xach09cw5obsi4tud0eejk7pp8r1nqcp5isvmzjcx1cagxfhqgevdrxtu4y3jggz5fzf9xnrzfugdaeikp4620x2211yke0uovodvg3pwwdnjcqurt9rt81ttthoyca0q611m2x3fid5wsuhvod6g0plhxidqp9uvkdt8d3p7ru4ocrm434yy9f58fk0056juv3muyw6xjmnwmfdw7v6p9u20b5todj50lbpz42ohdcfyqbcmf8p957859kzfseebfmrruzcwpc65ivpkf7k2ow5h58su6ejd0pbvhmtfyzuycphz6d4kn8sh0prhr83l80yyp5kq0nmeq5asurnc7174nzk8lznzm56xaqtu8mhbxwyugstt8vph965mkqo9niaxv6w41487i7nno5fq0ytqarfbxlqacy7z1n5xjr7cfrp79o64mm43c6vkaan5yx9t4b1cegzhghmqwv2j51biqrvsoymj967ieixproxf8jdu90h0sldqqb3v9pj744hq5jggikuht6rcv41vipv7t11kk2xtebvp9xgpull9lb9e80g5leorbu8uxl9gwjuixq3pd6z17cj6ep6d7fuqaf4w6bjlygpnnz0gjhl9dl3zzlsbh8zivsl9ll8ye42zdd44wsq5zwo4d3aihemel0gtfq2xrnbx18w7t9yikquscwv87xgxl1rkk78t63weroex5iagnaz01opzc0mmg2udobxo2qhbse8rxz9w4ryruifayhdsaxt507u58jznk72ucch18yb83s2l76jy2q5ay7lb65dbp5oc5fc9uc3ypv0xs7y7xnip9ulw26xuppvhbyuqg8f89mewif86mc651zv0n3zgg838w7h1orpfj0ie57kav80z6g51d7m619n53toxacqs27z4rkghstkrg9m73t8huw6rluaxeagk8p4czqw7t81h9pg735s2eovchqpahn1ooxakmzbsqkp1g0sesr8qkh43wvhs84g46kems2lpq3gjloprrl9120u538hqzttsq81us3dby1rdqgqgaxbbg63ldl8wum8h1dnzvg936s4s0m6pqeymvizyknih3nq3926ynlnhgzeuuy47tgnvhrikp2mhvcvqvmr5usqze42zdqlulxm68y1nfeyc9md20hfqbac0s2uqqg3diohlsjvpzneqvjzcjdkgf1lyv925ilj4qov3ufrj2ywutvrhvzecwywkhx8c5qd7mqytpefckdic3yf00te9owjvsp7e8xmu53symbkd7kap28utpu2j9nzzqe',
            })
            .expect(201);
    });

    test(`/REST:GET cci/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/modules/paginate')
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

    test(`/REST:GET cci/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'eb736a16-609b-4aa2-b301-a46d9fac5ef3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '09f0f9f9-e612-410f-aefc-15024ba1d0d7'));
    });

    test(`/REST:GET cci/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module/4b4661d2-3c8c-4942-85e1-d6004b975819')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/module/09f0f9f9-e612-410f-aefc-15024ba1d0d7')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '09f0f9f9-e612-410f-aefc-15024ba1d0d7'));
    });

    test(`/REST:GET cci/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c792bcd4-ddcb-436d-9ce2-c5de5e644b11',
                tenantId: '61d7f2a7-7059-49ad-82a0-0c63417c9b01',
                tenantCode: 'ps0aomv8vuzuq0xxdjpyckr2j4mc0e1708zcomdag4gxl2j27k',
                systemId: '54deb41f-100e-49ca-a5f9-91f160bb1869',
                systemName: 'gbkqq06mhm18iijbe1xq',
                channelHash: '96g3eb07zsxeuiwrj6nbbyf8mrdy46lvyyexj8o9',
                channelParty: 'munmuw0kxvl2vem0tvkok2an1dbiwp34yg2hx7sdy1i50t1b0x39pdifs6hgbzweogtnh6vvmkkmiqe30lkm7d6wzaj4wln1spt5tbj53m80m8imto496xisxlu4qtyzdfrn78my1zuljhcw1hgk16isabq5be27',
                channelComponent: '1y5qli7m1jy6bo6v7n0wag2618q2h5dnrn09il2ttm9dx8bixi8kmbdj5zv0vrrapkjtn58tjyrlbhyyjk2wh25a2ewqhad3p55vupflaszw3l64zchtcs737dmjj539kq43b4w7ulond3sv0ran924dwnnabzom',
                channelName: 'ofb8c8xlr8wblb2iwq57idhziwynwmzmhhpqhgic7b7c05y79c71pf3ew0k9usx6ndty0l1aou28tjtn5oyn5mu7irrhkfdlplcpi4ebezk6c7egld3r7coyuti3tjg0mr1hsktmcuglc0bhw8k5gwqqmtlyjili',
                flowHash: '6x7hcv5gw87szpyx6mhuj51h71oc4nanwqf4aqpt',
                flowParty: 'vo2kn6pwh4qigqqdvjad0vcfkgut9vg0jl0r1630jjm7zidg0nqlaem1pny44q7hfz4z1gjgdmczbe25yetdanv09b2esgi0dp6cpbw44foag0vl9snit8s1sjswaty07zmgk83lk1x3mz9da1w7qedsxh8oh02w',
                flowReceiverParty: '19tu7n3w23vwbbo5jyjcsfyf8q9aoui78sps7b0jt4s7yodx6lowx0ufcfjhxe2cbru8s77aui7ucf3i2fw6acpw4c3n1zi155z3gntefegx0vrq7gjkhbkknync7795pflcs4b0i8f6t2bcygpjo414st4w0c0a',
                flowComponent: 'vzd1pd4uc7kxham4gw9itdillmqnl8ga5hw0yulgrvvax7mi1cbcakf62latwbtx18hzk59z20keesl4ogeiq68ksfv4ooxxpl1lt2u3kqwux2f5w9o7jxlagvpnsgen6mxum5vvrqg8cka2kwdzoulapzs2oybb',
                flowReceiverComponent: 't6ivsbogygg9x5cf105s71b14ur0ccoba4d3fxtel1y7cqgbigimq55tb5vuuaw9kgiiqc9ypyd9tf36ub9vp4eu8fmnehjkudcrwd6x1ejr51rvp4p759cnlnwhej8r5ckyumogs2mvpk1cl383xa7dw2k42jzx',
                flowInterfaceName: 'krwjfy1w7q9c0biiczp3lodcmflgqldpjgi08nlvifzqcnxlhxwq53z86carbxv0csswuxpzu008ztm9ke4xzroru43wpvg1n21lx7g2mw81imuwzjohs8ra9asoyklx0j127p9971y2qinee97f0pfri68s3or0',
                flowInterfaceNamespace: 'gpde98ney8n19xii6u2golp5jalaa53i2hrm9tzg4iw5euo0glg1qmqw9ji11ceo3p3gswxhdpebc9z3zqf7adkjbfa5k0ja0ffy7bbkd405ae6cibvb3o7h1w43fzosscd1gxdbgh24jx8ww8qw54qo4ati9fzi',
                version: 'gipypgdkx2ygjkwxwzrh',
                parameterGroup: '9idx4pkbp9q6i36c9z9rlnzmas1sffhytrybdiq64mw1ois72ht75y60kepikyabic3fmov907yppf1h6juiv52vbmts2w59adtolrln55397prpqqv1xa6o8eqyft62fpfuer4ey2i1h9cvu2uzs55je8a3x2bvd7rkf1g0ilexjsugjbc9wdorhcw8tdl57ot8oie30hliwb767mhvckiz3b6qgf48605q0enniy3kywt02at0vmd6ko8gukw',
                name: 'oc22724p6levqiwxe86u0c8djpszrs8tc9wdljv10j8xalpsh7v3g2l5lwgbeaq22c82de40junp1f2mkyc2i84p3s38a2g3ccbw047arctll7c6igqhimcd51baj5dyihr0kf9dztp85k65f0dq1dcexv4cz3oautxdmb1loztpbk9guj9sz8h4g80pw19oaoa0z2q4v0l9txq48figvgitc8ge8wvazlv2bc9c6b9y8njkea77jypsgvzuvmobc9d5ubveug3dhju9qcsybip267ypg7pu3bdvxbgcbth0khsd2azrgk72o4xpzpu5',
                parameterName: 'hcsz1v0cg5rooc8mfsrz68f2vygla1zv1sohpv1k69qrltymcjcgw20xlu4616bfldmdizw81rsu21a57t3zjqgoucnntpbi7fch80f1xoqccijz6c029rwi6kqybo4kgad87u3xiajlgz6hpo426v1mf2rydc7s3e8cinn3mxs4qde0a1onm9ntii64rofql97v2yeg3m55a0d66lv6ekq3t8p83oscnoxx6fx0gmx5ml19hmenzw2jwuuo4fgzkqe8cme1qe5j33kmtmb9qf2dnulf1j7pf3s12tzdaj85cladut6owe7lhachh72w',
                parameterValue: 'ubsd77jzolo0ch6qgkw3aecdlmn3tt5lc4hbe16dxukvrjzkv07nb3ev99or8eekx2c32t92w627r6mj4gnb405aazilesxwjvkulcag7sd8m6yipmce5huqp3427a4ucxyoe9s4q6ttoku2549lau3kk9fvpabejd3nhxne0w6a18hsqno8o6kpnsvht3qg9wqpvvn4fh9me8j2xtzgr4bknfxmqt35w0hjljf01mybgj36c1sureir3igsf6ntw0fjreuk1iq0flt57hvxcvlsth9mltdylkx8wk2ou2ta3lhpgfanoixpbzwg420cfl98rx3zd4f3q4fdscfizljmbd1b654yb6kddl02og08qv8eg9oyw33d1jekrot2s3pf426jjj4t6cpn5jja3klm10yjnp7zi0dosqav5e6nw2ynr845iwmplgplsqg55iymz8awlmtyoxfgv8yvwqoy0ivq1adgi56znwbqxceihd1p0f1n36qtk5c0w09y0wdfnp1sb9w1a7wuxxu63wodgalxsjbzc33jxwtdzo6w47qjufvp5mgdg6xissyl97qwox8t08sjq5xvdkjjy5w16ghh76ktn1fcnsopvm86ig9t7loigigl3f2fsea1miiu1k3wrxzymc8dtfdkyp524dipxy6nu1y8r422vr5umem0zdcd43ke9hwndg5n051xfbao6g2zcgkjzceohwv2kiyl651dxr84axk3wtcqx2kib7plyqt43fo1ov3vv7j5yubqo10f2mukru4o5lxowjy7pp4jqnkxb3ur1v0z6lp5gbowctqxbk66wx7rasukvqktca8murvoc7wvs76zy8vv70ygp58o03x2ju3nttwkqg6o471hjx01zy7thm89rp7y11isla6j1x6y6t3ude6rfkbuitek1seviudvh5cpymedhtj7w4wqqcqkkp3h5jj0y85uyv5p0batgcfh3awwbtds88spszi4rzv1cxeu9q5om04nk22ofwtf1lj7jg30z48uiq6upqsuyy5qe37zsfjbhh4blodeyt8zn2s3f52rb4w9u0uwyk2n0amxfqxko7spsoc5fp0jrxupnelynr30z31ako9qwehdueeyxwi2ysyse4p3lggx9z7yljz9xa7qh805njwn1jx47lei6ff3ghjiewr79gjrth2zzt605rdek22ne99thnluuxpiwtt7t2mbul1ovdtomam4xpnrdz2t93mq6llub3vck3o8cx9fh55derc5kt0ap4qedjt2zaree2qdbnj5907w2jx88k7pmbo5j6iomset75d0e7wbrqj8zxnr6smsh9ebfjd86c6tk5lsqq9vi9xkepxwv1qt1u9ht5xcipn3n1ogobmzzbynv8juxj7s1uro8ags6ba9fcdq71j8oug427kfwn1bblbliuf9sr5pf6p9elq16xllimomu5pniv5qpien8ofh2xl6zegtkybzg212o7uhj7f51udxi7o0fhheaxw57zi0sr9nhqo2bf08x6b4mb6e8p9172bs4ik5dp7f4rhkmtmjgi9pk26o6zcxq4lwyoymg3k083tuj8xpfusbzk7vi3c3mdl7fghw39r1nh4yolkhk9had9a8czxrjlgk0msjthyzcnllxgtsctjb84r6f8k3nu3k0kwwgpudlex7a470tyd34gqxpaxq0hmjglzrsfx3tr5fhi22ysgonc41xo8t3y22lm3z1kbqn9tptvf7k49t25xcnscrau1wxl2el8vkyz5t95eerry6473vg1kcd3ck9tgswt125my01f42qr55n96f76w68irqryznpmhv5yadmdnazwo7z6iokgo6n4inhifntxk61uuppx2tkk1iqv580fui9lfq36o8cb0br0oaj66f1czdyy55w9gji06tg3rx7znrsbqcmuegngukgid3eon3nx52iwmzc7a56za0fixv24p5unm22l9a2jaubehtr20u0tmck8ns0ao63lvecsm0m0xhflilqcki',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                tenantCode: '222l8mz0sw8sw3a4lkrg4g7a61263kleog5xjenzrlhv5c9sa6',
                systemId: '909cdabb-585d-407c-96e1-22230600de11',
                systemName: 'k4ypi7kf1c3qesawwvk4',
                channelHash: 'cdqg24l12tmfa0h0vjp84hg07jcm61jfamj60e52',
                channelParty: 'u9dhv44h6hhu0t797fa0o31huivbkjsq4o9zt2x4drrelnvtwey6hvgk1elds3vxxl81o2q3m5i0w1udzri53n8gp9101yd9043bfm9j8m49gd0isjh9xaeskjti4e1rkj5871sot07bxc6a0jk3h5zd3y7h9226',
                channelComponent: 'cdxg23zvgm7l3vsk2boey4y3f41qjsbvgsf8lczlsckcjwuu59dtblxuwf6oq021hbjxbm5d03pd76nxmu3wagfraqjt236y8t0roim155ojynf84imt0h394jkh5wqxuwsr6n528adp5h421548x5qnqep2dioo',
                channelName: 'qu6iso2m2q880oso29c7fcsyz0375m0ijgv7g4z0i7pytip55m32c4oe1dx3y1qovsepxrfauq8zn02pjxi583ig9bzh2adxbmxpergrpkbhhxopd29qlvr9cfbvtvvgdww4znmrc53i2b3pve4enilp3exc1xpl',
                flowHash: '0ox245e05qq6n3vj8rtgdoxnwxc8beu4ozr25knb',
                flowParty: '2nrdwiwm81qssiuyeb2tob9esfuozum7mksbul8jea2rju87prtmptorax4cwjymibgcyfhvwykltfqqubla07otcn6llbyxn3lk485ja68zwk1wljhf2cwl6yk6fd1tjkqeiutw9t46d1tag0ze2fxtik58z28l',
                flowReceiverParty: '9lmexvc2zqn93c94qn9a2zxzrp06muop4t969gxo067qn0a1fs2rv8ppfdplrcq51sa7n6yhpcujigqvj98iynzzv5h95a45pfd41v3wfp7jlk4blo8b3v0qulg1ehknl2joq25q1nwv2g8kokiy1x8259n0f3md',
                flowComponent: 'wfk7pi5q78fra3k7fangp3jltqrp1tdpzl0z5dfsuyehcz5gevkml4cmmhg24k96in2pny5d2u128e5k4qkv81zgm9bah10nqtj2y5osmho6cpkm7e90npkins1zkum56y4wiucvbkqraqvbnvrnouuwades17oj',
                flowReceiverComponent: 'axs6hfqr7u9foz46iph7hfx2nyq41ndvisdqx7g7g88u3bxj7pnq4urghecmkbpyq8zylb6xtfrl9e44mnwc0mjgfhtbjsostf5qrx2nft9kc2gbp8glj6d4fo7u4zaz9vdyrdnyu6tkh3eaiumj58w7smvumdfs',
                flowInterfaceName: 'y5qd4dzxr1exdv2xsl4s06f3pqu98ab35v79vmk5i33sugkfo1rg8ytmo7hjwld7cupqes3crplx5o4116bdf3fy5yigwmajrgtgqc0qfl3h4wxwlreq7m1jdv4rzhww9lsvcduq76279s0p4vgxxuuisvcjqxxy',
                flowInterfaceNamespace: 'c1sw2x6h3scyyuxj0pgl8gu1wlzq8275gi1m0dpia0ehrwvku2mexceujc76dp8dyv7gn2a75s0hhb92n2r2kdnts1i9qtwn0jbnbtizhqgb2t9a12rhzth7r5lmt2k2dkp5wdrhtu6ejpproyxkl10ypcik93n0',
                version: 'g3bcnu5s59nipt1hm7ga',
                parameterGroup: '7erhqd51bwn905c6d30uo2dhjjifyuqe1nepbto5a10wpj68nobj51rxfhkzuexki8f4pxllrzznq1v510kr6azku1wwedelr389rhrbt62lr2hwutkz4j0wwy3ecpkkq49nwcemw3077264zuz3x5qpl3mbxre9dokdwdcakfdm7iszpzxwlthocfrlz3qx6iyncz9k3ga03d1o18xd3w4gzdyo05yf7gvwl34k6qttcuibmk592v93mqb17ev',
                name: 'u9ziev63ulmw13cvivem8g91r1k0zskkzdxju3rufcoph2bfev1lp9x7nk33fbwi3921dgcgqqrvi8hmy62ufg13okt960ur0yy5hsvo59hwk38qvckpyxhv1mn29o76mm00uppquzbojxsykumgxbrbzzrh25m1oppe9xo7dlie5syij81o77kqvv60ixv14s0l19lnlcholmk0cr742y1r7y609ub7jpf20n8shvas53xnnls7bdvxwklc0pqy27is2ku9yh4zwfeqvthuqz5w1gvo9ev8y8ssusmauvnv2a41xpmwzk8ccgwp1kw6',
                parameterName: 'wh0fi1giadd2eo6r5cte8bmfq1vzq6qjlp66egfh1a86by865m4ll1vh6gsfsjbfgyh54untbfovx1uebvbh6s34mw425t1u8k1zajo15cg2hb9v2vnpzmxfd04436wpulbs53zrmpzv0eeuycm1yxza5iofhh8wez1r3uhjkxbh82kos8oq5wmcwtwsibzuc9cwkn27p82y1ct9tro8lypslpmp4ndua1ciq10cxd4jyz1rhbq3bqil38qqqlrvdglhsaazgbjy1ayja0d9e6o1f6k97uhld69xdsu22sfc3za83gn1df1iwo5tbtbx',
                parameterValue: '8ea87zacpsv6pp7coje1d7is02h3ia91d678pexwhysdh5dn58jo7at108u63r108yl8t0j6mouz7jdrjpt7uz7gs0590f02w49gue2o8a3eaprwpa3mbkax7bzratvz242i4krfuf8zvora4dqqkaufbrpitf3cej1p50qtnbv0p27tspenh7o27msyl7wsivfq3ookt9p6l3r9jw8d043kqkrvdhnvqktzfhiemxjehqldtuidtk7grub4ygnk8x802nobm4rb6nw11q8xyoi9p18ssk8esnvj8y62t9n1pre02rz574mmvbh8dn2hhiaatadciwxj1qzr7vjjooh8vo4qrbmkrsq2cj6zvzqbqq26y18tf8aikjs6lxu7u6genc914bi6srtibz6ltkqrxsgi5dq526rodi1icvf9n85xrxjitmks8zdforeqhl3tpglyocvvobozk9paigzhhxo8kwhd0dypshn98er04az29yr2m8bgp87i79uexy8ws62ibzwkgdfycfsynds7wkqwmyka9rkztpdgl9eyw96fooks8efjrdmfkas0jqd09ufdvljeztfk3zwhjkx3i8f2lnk9qpy84uej1k5f5ory5qgse9ijq8b8r52lhwmprjrbwq6l5jz2zmju1ceupbeptx2xmpvilhjtj2ea3gargeyakh7m26qfkbdwzjtl2r0xuetdccfwpnir8n8fopv8b6np7uic6jbeyewwfq3yvrm2ro69505jo95i96hwwh9p037rvidvqjgazfwgzic38veezopgmb4xrcnx8269bpcgvab299ic0k6yvmwlzyhh2ee6s99ozbpnksm9zfaem75bw4quv6svtsy8agzev7hhilox59i82c39g6ouwn1dh7q0lk5zegt8nw0pzkn8up0s1j3bd21wm0e65m97mte7woke0fkkj0dgc22qrk3m8ux045mmyg7w539fmkkt82axc7o8vpraxilar6e9wny7pum3qslw7m1yqacx6gmip03vfx9oxjgw424szm71a3pg36pngla89l1iy1q333ts29ck9ga1relelfrebn8wbshsicflemjntq62c5s7fm0j3362mkb2atol219j5jxa5s4iel6205s5oiu4v1ko2zejv9riifsylry51b4jujpuxipk59rxupjqcktoacd8bj5j1vwuzgac3sasr2lze5uhexkyp1eny4e3enhb5a5edvj2eihcaj06tskjouo8eua3c4ywa4mrwnb1374zefujpc62h5rip2cf9a5gwiw3bmqhteotg81a6ybxp82m8zbl6fok6wxfvfnd1uvmmamc5480fcu5ij89wzakk1hapaza4udswm4xh2i9fw47nyosfnhih96nheexj7yz6ucq5aqvoxwqfsjit42qsqhjhgaobfbwfup3rmtiyphr4h5i8qqjcrgs0p23l0i374e6xy7s2wpeadpatq19b5sfgntcsdhbbyhvprjvjx306jhjjwwfvcumg0mwgg4io2uac9yi9tb7sb3v7gahe6bkkaulhcnlivp7wimtug3a6dfm831dedzanjsnq93etppngbxua0u3wywmbqqq0u7vckx27v43w9occm256udqfr6hdk8mrxaiz87vmsxfuablrurgaw6bzimg7ri3vz22htgk40wugvlell9fcjvol7pa8v0yd46954hazcst8q8rt9rd91lzpo2uavael7zo0yffz2mjt0oh4kgiq66ak6wi30lz6h7kq34snnls4fc5gcp2yzj7gjzbickn73butcgkcwyebosdfjfqso8cc63syzjsx2rgjahvzod43umfzdczg18hyl3p1o79j30gbkuo2djnbystqiq720eb2tmizh06pioe3jckdu085fya7ucqqj4gxkrucu2kcmekjv9mc67czlc4wo25v478vw8dk9yk43t9xbp82l26zlg308olvmhy2xq2eqot5zp73fwanpz7ak7oqnr50icgg8l5gel86xwi',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '09f0f9f9-e612-410f-aefc-15024ba1d0d7'));
    });

    test(`/REST:DELETE cci/module/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/module/ca7ed175-5dd8-4fe9-a80e-0a3549e770bc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/module/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/module/09f0f9f9-e612-410f-aefc-15024ba1d0d7')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateModuleInput!)
                    {
                        cciCreateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL cciCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateModuleInput!)
                    {
                        cciCreateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        id: '6fda96eb-5dce-47c6-bb39-85dfc491892a',
                        tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                        tenantCode: 'tcawxy3v3wi8hafegfyy0j98h27ss46p4hlmk5c5hirjmx93c0',
                        systemId: '909cdabb-585d-407c-96e1-22230600de11',
                        systemName: 'd88c0i3gwc8tzi1g7w62',
                        channelHash: 'fzgcmlb0uesw1gln1hr8ausql7ym3f0gaoj56zyg',
                        channelParty: '4qwpu51msuj3x5nvttejzu2v1uc4336v6gjg8ry88s71wugkbe5xfjdbtotyir10e0ezsa7wmv5yaibcft03nfv3qtr0gzire3w7zjy0ruo9ci2ng8kfv8nhxmu7s7ldd9papeuvauorvcfy4bpimnz35b45ffcy',
                        channelComponent: 'zoenjxofiugr2dn9ydwwrl3x0obvtyfakfvywwrqzi74xnguauwvscaucl9in10gd66hr8vvew4he28ghyluztehxeb5h6s58jqu73x0bzs36lmqrv4a4jehziaw5ntd0plbdjhpos8cjoyxdw07r7hh3q5zh3vk',
                        channelName: 'o4ai4icnwkl9cp8po1c8uxz7hyecy2ef9qndg20fe4i8wgjnbte7jxv4103zrc45csj0i4sij09e3ybh5khlj9h8izdtbq69xcba8dzrkq22olild30v4h9qktk3ay5jqz481l8clzc558xrm513p45iwrdd46bi',
                        flowHash: 'qup4itofhell1mwjv32e4cpge4w2koy1w1mt6luz',
                        flowParty: 'gjvz7tp17iz6h6meyv1ydcuhmze6k694211iyb2maa8lewtn6t2gie9yus5s4hx1bsaspt3efw50c6vhnwlza03bm6evhrgg6a99a4g1aj29s8i2qfpwaztcopyl1kq4wki4dvmvjhfc8jms8fpa66yptl5xiezk',
                        flowReceiverParty: 'o4pb3gwi44u8cubyymp4osp9lv0095sr7xya1efeipa9d1bzzhhhac39zdnl3swxrd7eyaerkz61x07d8kg0zr48t4qqg5e7vg83m6gn78gurh6dun7xbc2coq7fn8r3xe4p1cakfxrrbmpoif67z7075bncwlh9',
                        flowComponent: 'r64rldlg4tj6s6a38q4xt9deqtobseg0gawryru32sssad6j9yi5s4fpkx7pumaajl7fgduc8cv7icf01phb0wwrham5b0x0zak6u3hnihss45r3pfmy14qjgetk6vbwgaem9mgc4r55rnr93ic4m1y2wn5gtzj6',
                        flowReceiverComponent: '1fztopeb3h7i23u9g2577krtq7befr95w5ixbb4ghexknmlbbwcewv1h7zt11lvlqly06447i1w86geo0yod0zzr3up6xjahcaezphd2pecjvsq63rjx4wp3l92xngmrx6od0ygqtlgqbvx261nnt3qki0aqu8iv',
                        flowInterfaceName: 'rs6o6digu2jk0mny6p704wn71qylyctyxqssy32qkgrjau59zz8088tbxyt68zxc8pltcvzjrpnpth8xtg5kdgm4ttbcc52j5ibweme3q9mljdl1u5mrpu8skcugffj9n8hdscmkx5vmi97oc2ikjsh13ef0wtxc',
                        flowInterfaceNamespace: 'ncoss0i1va3w69q7do7l9b0o2u6go70yq4rqcuztzilfrgvkri4mh5tjpebpyalp0p590ap54nk0ptujtlp6u5x9svzswvtwmsl3ra1qiwq8z244e8rxr8a046u3roeeqnr32hnewle15lpx1sr8rx18gt3u3ybs',
                        version: 'zls2zv4jmlfidg0p5k2t',
                        parameterGroup: '4h578xtwb9yh5krdgho9buou6t8fr6u11g3extvvd6w1qdk49bjm200mnpu39udgbvag0tt0bbnvs8yc12waznsuhuh9vtflqjtwu1tot9vggvfd78gell640n7xo7rc901y3ogqd7cqlls8kw3k2lcsoiz4bmmqst2cwbope1cx5bjhr3dtgs8dbmuycon1c8izlo01ugvl4rzflxzb4v6tut2ayo53d9amm875t7vld8l5liucvfslztdm402',
                        name: '47ufnq88gxxhoofe8die8lgx6t2r9vrwxt3ym0mr9pz3qti89bgewau46orzjkhvquqrc8v14motmoq43onxjli8v6xrw47ir03l8ngr5aayl5lckivfvfu4g8drzqjc63znl4ivqry9etaem1un91j0busy0z8v9hjolwgteiix9yxrd8nbz1sr1x63iscdr6yqjt9eeky4cznix53atnmgubvevfeiilpisafmamx3qykwwyj9w00wigd0d4elp4cns0zzq2o2j3199xpw8t0syrnaqggw6qrlv81dkoxwl5beqsftjcwjo1v9idms',
                        parameterName: 'hpglgqz8apx0z11diy111ivumrg6u79jz1v2tm7fva46w8f8kdbqp07bmyt0v7msd12ztr2af4j87udaw718ow64ljzem45d26kno5yscelw9a1sqjema2t9qhpsiku1lp2ajgvpa2m8px2ymwf9xtk2t4mby7jt44fbrg4acx0azew2z6hfr1ih226tbevjqoab3ttck9omjbhv7dd57sdnaqm2nrv25p01yapg0css3j2w721huxpxcgp7zh55q0gm8zfcr248qmbwa5lpadhhthkodkhbzsz1wv8xg1ugmrpsc9sbbevbjdyb0ii4',
                        parameterValue: 'lxk8gf1lsldzh9adk7jipi4bcrnf4ngzgimgiqin9dnq8yxkkl57wi80vpgh1nqekp4n524g7hbp822taupxpfvjngvwcrs9rsnnkqfrvkk7gi32l4mlbqe4eq1x46rzkdzbfamzy0e0q5orzct6wsdcqdn562klm9nalo0o6r3tcx4o4fz5zoofjrylxexbtjw32cb5par706ifhiplnd12a9fragmij7tjwspvbqaq1wfsa7wfv6sl9jy9vuqbl6n03htz3n6qvajwkdlt8ud0zysqe5fd9rmvqe4j8fbso1ppr9wo7l8z85h0eq23wntcn4ws2twmg0dg9pgw2a81nz61iei57kqace0xlitzokdwfi80z7xtqd96wgq23u3atugpgm3dsxjzhjo2s1283fw2t1a4gexiyd66vgs6piz5y6hb6jdy5movjtn3r880gkw9dpsjx8buaqgsjooo9mmx1sqpo08olu4rm1md4sei3a1pvhtgub0zloykntbwn24werxwu9ylgt6vakyx38lk2wdovfl9zij093wegs42vbvt85mnc8tsssiv507m71tnwt6wawwtax0gddx4pssi2sk1yn5iq9w0kn0d0sqzg0vz275knutvnt1zg0wkrg6y2i8lhkcrgdpqg522n2uxv03d4z3y94u195zxore14al4pwyiobiov6t2pj7dsj4i2p6zaujncxn42nxdhajs3e8bmai50ud0zorpvyfr03fxrjtg1fddhi9hfdrod6haiqamjjd37yq2xnat8xk248p876bcl1bjjlbykcj3k862dcb0c5lr5vpr95h8nl9k6ezya7fj8s9bbi2xpvku0siooqtoco6ok421g7m8l3e1lgo1xh91f7siuzv3dj78dy6vkhb3cg4fb7jhg0w4pn573unoc9lsc9mhlnaegvon1qbypupzizkjw9dgaorbkddtdf2di0zrejyqxxpgtluymppus14cd0uaxxmnna862airs4x9g0hr70x4pvg3gwqm1m1ngui2i1do4xkzikefpaivbfz4cdcdvdr4g6y5kvy2buugvvrfjmjhdjpwsc7f20gjemgcwtfwhn6oc4uu10opygbtle8f5xd93i41wks08h2av7ppmw6l0xttcgsioe29kd0vrfe7p80b0tujhkxckzqpnaqvvd7va6zmrt0sy2855bzjq8uyxorohoia9qhfhrlafayvz4p06xxzfbp5cvoztsfa5kkikocqv8crdi099zt2zvh0t5a4d4zpwpm5bmojnejinvlg9srplicrkm5eo8tiiqtip2up0e16m91wru7eg9qaqkxyklz797qgsxxble6n1m6jukptfproe78soi8c53sc4ldf76yckcjxj1php0h9vrt6cix2gw73fsdes9idkhyaf3cqv223dacgdcaj44ifyqus17dl61ryp34qmm2wfjstcp0fnawyoy00dhz9uso2io9o66qj51vlxzfmqr5g1h43oj98e7mpmwm14itwywlmc4qb62mi10b72012ehrpyk2hpspyk5hdv89iq6h7ii2c2ndgin3sxlf82w4d9rzdlh6u1t891yk3jw5ubphbhk97mrn2kpo3p6hufqwgyftnuhdfjv4bon8eh952ezdygfwuembi9l5oyalwueqbcythr9o00bd0sobl67c0glyfp94vqf9kp5rlsn2mnmpke6npree104ap7ddc81zbj42oqr66ay2f3pw9mmok72i4bbj8qr6jepg4j4sp6ovni3ofyrlohlmjtjiprdquzzc2nwucidpgo9vau5daeq9w840nu5wo1ckxtqdk6qi1tf2t181u79hcf4tyo3c3os77j260hhtu6nvh2zayy0isy8lmjcn9mwpp34zy1tnkt4hwyc2tdj4hfj31w2r7b15k6jg01ijity73a8cdln59ulaqaoku2ht5p0kax5xanmj5kn78wqkfwmcz6kuji8tng5i0br1nqd4uvefy6d5fnr7rtvaife6m',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateModule).toHaveProperty('id', '6fda96eb-5dce-47c6-bb39-85dfc491892a');
            });
    });

    test(`/GraphQL cciPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindModule (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            id: '27058c37-713b-4230-8d9a-de9281b6e26f'
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

    test(`/GraphQL cciFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindModule (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModule.id).toStrictEqual('09f0f9f9-e612-410f-aefc-15024ba1d0d7');
            });
    });

    test(`/GraphQL cciFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '42745fc2-fcf3-4a86-9499-b359456cadcc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModuleById.id).toStrictEqual('09f0f9f9-e612-410f-aefc-15024ba1d0d7');
            });
    });

    test(`/GraphQL cciGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetModules (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateModuleInput!)
                    {
                        cciUpdateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        
                        id: '55750ffe-4496-4913-bb68-c1efe5139ec5',
                        tenantId: 'fe60c330-70c2-47bb-8bf8-ea52313c61d9',
                        tenantCode: '5smmz2govxcinnqbii2gi4yv5m7pl4ze16w2ogb6g6ainch7n2',
                        systemId: '0c971a25-edf6-4ec0-a77a-de1f8fc90de1',
                        systemName: 'jzvhq4okdwgumyzzupn9',
                        channelHash: 'in49joc9humk0rqu5q2xpp3ro9suofohid26zsjz',
                        channelParty: 'vqknof6wrt0zm6tzh8sjcg4wqx75eosy06veby167vidbsa5xrco8sb70kny79n24bndb3owryjw4sz9bpnpp2y6cxfitwb2xhlxfwynbf86p52repl9ndhl86mlh0f7ucs4nqbeet2awxzi0f7mv6ss3hv6sfos',
                        channelComponent: 'k0iszzgmzkjfn2o2lsskaij9hp1uzwsku95q0llnfol40xvu1x88o07lx3h0wt50azrtng5854pgidre93n923s96aqyjpd3jct9oadnv107urrj3o0d7dmq486r8m67jc3glb8r1r04fg4a5d6i5md3yx61nhvr',
                        channelName: 'aaolf8qz1ut7a9mg5ov3k2wj26prxpocvpv6skl3fsal3h4ika7bj0horexrg0g2pb5e26yv7dutc786bvxudchfpuegw0yt0bjszg54gl32s8dcyk59d0ivixhub9e16wt2cvi3q8qiphe9z7xgq0wwhv1kmv96',
                        flowHash: 'kzb70w2er306w6j4i571qk35kke5uk7beb70rbly',
                        flowParty: 'zultump2lskzh1w3u3v43acpjcqesup3bjppjawbu87of58yd6ymzy1iirdeheltz4abmxcx2foc8ngx0dzzb791nfnrlett618s3mqzbja660yohvmhjtvd4swrb7kg19hn0vw5d150reazfnhd7ggw63eo0imz',
                        flowReceiverParty: 'lxoqghtikqv6h86dsthrg6gsdu4ju9hemfzi4ner0bcgkjjqfek61p2rtlgv5rvo71dsz4s1tgib9ekvahlcrq6igoss4lxh2821yx0werqlpm6tdwffv6setwtor9zqwg58u9vsq24rhd39vekxk8mruck6d3cr',
                        flowComponent: '279p9jp9a99huccdwih5qrc9ernh9emrhkxuydcyypcpdyf8vrp5kusx3rjjrrvz1xzfwi58yjftl8142bznald6lf0xnaj7bj20z0dgrkgj2yhnorfztydjz1s2h72r7dinhfq3up3dq5bf64rfedmq7qv9z3hk',
                        flowReceiverComponent: 'nbc2l704vmrtnnde3yqwfu75llyha1k641r2iyyr9j7lkgkv9uv34skp4btikm4gxk5bprjqo2l8sa889ql93xctjj5inve6bz8ubly5p5h7a1e0ogdj0kw8u9ikwpzm4qomf4i4t3cfcm305kykn7g5mdl5nrhz',
                        flowInterfaceName: 'zc3sbgfyk8m8l2v2ztkqendscoktezuzq24sfaxllrfbq21xlhtvc5ht3bip37bxta4bou0nxtqwlhxt38my1iti5fhadkq6unf1yz2okfukdq60f1gui8keedomz15i0t0pbkb5vxw7wzco559079pzs7ziq905',
                        flowInterfaceNamespace: 'uol71fxwmbc0dhroo6aymcoipzwd2u5u7v0m598gu1pjo52cji8b65fjgehusivrwh64ztyplydxgyghu882dtw1a43sy8lutuh2n5giibh2oz1afa7jlu4012jhagfuimt7e2lv1e7lihb64hjsavt981o2co7u',
                        version: '3db4btwl9biy737v4198',
                        parameterGroup: '1fq9wdtekd35shrfnn7nsk21j1202hb7bkq8wplqu9ajhnt6lup1n6ahcuc652gsbhl9i3rh87i9fv6c227iok7ivclgun3vllfw0ciwubzys50evk4z68001xzkm4lzixg6dyouiggl43t8bxah7f46kne1hcpv4y217unueht776jr62j1lawmmv0vyicsukxjykxxriyhrknvthlzorft2ldi622lwsxu7qsh2vbr6v65fpcizjhu6444h58',
                        name: 'd2002niba21n5jsvtjr029n8d7n9gymdt3te69iesy7g0kdoqdz3elxjl5hb3t013jzskw73bvq99o3jftkysvmwvlh700rumkp30yg0xy2n2l83wecjukvegfsup71626xnd27fot3x5wwt8twfpak38bjbndwu6jgwhvsqubuv5r5x1gckb4nrse4h1bpfu42ahnngjrip19u5spx208zap5yih3znourth6phuzciskjp40igtkmkwqxy3whn617yvok1ab6eworgckjzj6pkow0m6r9lblbbxm92d70icjaswnt7k9bl7ehz1ltx',
                        parameterName: '3sngz42e0e1bz3g9bm1lp5yo4r2ujgv8a97yftbz1fni3o4f0k439xsyv5cm0jcxijgmfykhjjyzr4v2oztq7aqg4rebccm9egs15g975ntxm1jlgdldceiihnlnwx7vppx3oofqz7hv97a4r5icdosrz3hxupnviy50ucq7yy43lcmy0vnuo8wjwjxwr6jk7usdua1zg3k01onahflfylg2kb8frc4tel319413dfb54smhp1ma5h4c79bxim6w12ab695onsbfb8vd8uaqeaz2xapyvam1i83z3ka7nvg688lwxuvqt0pefkwogkul',
                        parameterValue: 'jrlig0in1il8mnn2ffz9m4w182fb9u6m2rq3u0xnemmff0lbee92g5irylc76ykhe3rjzjid5isk4oze66tmmstrqbxi27kr61z7xbtrojzgpmrpd2srsusf3v3sa23lht811ynf1sw043zncp1d6g6cekp6phmmyayi5d5qc1busf2byc4obbup8nmhk4kpso3dx8fyt6qbb2ybko5uoq13gsyuqbpta1rumhbz750a5jhdlk166qja7lzm8m4vndmloxvnmcc552nuxvih1v1l8rpxozg6d9viscvwvc1xm4rp6lmpwy0z3l9brw2lvxz0cahpduk5cy6spox5opflga2jambubqgwp0a8wro4czjrr7t94bviyndbuw7cek2ia3b4wtf42gqwfcy5zd1p53wklmjpvb1yrp61u5dhvxy86da2wpe7re9iydugsl7p05b2l2kxqbdcg53f1coq5tjypsxx7eb75ah8mt6xxce6tfi5j7vaob6npc0xpvv9ake1fzm5tvwiy22evm2430a9owalrbh0k4r7tk5bqoemmz81smailqn0ws8mc6lb640ymm5edal55dcywzm6lx1m7w9b838lcvtfaw9n0ohwe4jbxmb4s6cfzr2b0uo774u23la0x7nqrdremi1uij7h9jt8do9c4g015ufu5xo7sp4tm5ninscqj9of0q7on7b7umhie1nyzk9coaj3w0aulvg6nwtcgyzo6kjtkc9vdoohfssl91oogp1b6ctdb4cl4jo4rlg060o07ofomy3qhhin5a3pkym26bkygznb7cmxyc7vmp8z2jvfu8m0ffou6t6vknnm0pmzlcmxe6ud3vbhslnsnpz4inndlvdu8eedjxrikdi97cb9txgh89ky1urdz9vnbt37l2qrkt28zf08gu7jn1rh8gjud6y33rtfl6vhgmspsukb0wzi7tyidzhol6y0dzcxwryxrp6fdp5zx6tygt9ruugkh8zel36f19bu9ff2bi5r1lqk2pz0010rltnfpssvdanefw2qv7d1w6x7tt93wi1ovbnfhyley9f39uhi5njo8m4hibd06yovwyluums8qbpp3v1lpt0aulmre13dgsqtmwz4o50vyvtoaf1ektjhv08xi7acr1yn1mqhuntanoaq912zofovx4viqjiyl9k9ly5wf93mor3rh8rt9sgyi9h8aij5wpjjcaywg1f68zxy8qxe9y4w0cqfdggyj82d51hndqbpqzz5q237ouwvq7av5nclavusvjvas93vjox59txialhcmaz3a53uvvd15rcpoaw1lhxg825zy66szrtykguw86b07k3p92564vwm2rkiz603tgr81p164xkj6361jvoxeq6oa41r664dufrscm1y28mc7okp6md40a5jpqsu0zmv6zz6wmxl0sm64syha8dnvr6ast8yj261e5wtrickcuernw8m7va6hi1hakj2vnrt04s1k0gykfyxyqcze49p2xakyd8wlr5erixo4pmbf30w2615rj091e2xfog4b946mubeioh5bzlmhz1ryk4l1xxyd5y12spqxzgyodt0b1lht8iwiw3myru7my2nwqlemvsf2rnz7f4rg3dx38e38kyd3yfnccm6tw9anr6fvxauxysxtudno5n8s0y90gglwp3iq26ixiiju67yf9o0vds9c919zzr4g467i8ua51hrv9f4e39x10rzxk5iuz9jg8f215pvihck632lqnokb7ddohgl9veuuxw4mti4cya7jcvgbs64b98b1qnbpsn16og00upy8lpwno21jm1vtbd903puy7akkxrlepnv0eq1zkl5ae3mdg8sv9i9zxv15gkg2mndu83chlqyaerctr812b636vulcjrm47lwg3lfkwqo91inpde0bzd416wzm31vv6ye3jxf4jyhzlanqk3xi5u8e4oacdur2twr8s9ffdm0jgicv8va43w9venifzyx24hhlsu55ckqu9biixbumx801xuh',
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

    test(`/GraphQL cciUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateModuleInput!)
                    {
                        cciUpdateModule (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        
                        id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7',
                        tenantId: '0ad1f5ae-1e08-4982-9ecd-e6958c686b61',
                        tenantCode: 'cs1s43qpn5yyrsjx3a1gmwpsz3fkbzr7ctzd6ildp0m2lpwuul',
                        systemId: '909cdabb-585d-407c-96e1-22230600de11',
                        systemName: 'avt2mf5192jx7o0lohk9',
                        channelHash: 'ashlyqlau075pyfi275pw8nidoksdw3z8slkjge7',
                        channelParty: 'gasjkrie7ltqv2ob9rqlr3qp02j2axdsjjjs22oc42gz2ejh1vmelgyu0rm04r30vs6wi6o5i9flo8lgefs6km3vbxvpm8gzxuy9z8lcpmb2kdyw87kjwm2u40b0yfcqap4b5nevu4qhjjgj1zh9bk5ox61zt4b6',
                        channelComponent: 'rbxawmj4xy8mw7wkzxdjhhvcu0av8c2betytpwmr5secczwjmeeij22xnvopmeh7hryyr9e3d6wt8ypf91km1cythwzzw8e7gaf6zz7iw56xghw4xnzruzpnz31x7n8vyy43siycm4xblblh4vstchapymflwjny',
                        channelName: 'x10y48rccy8bz2qduw2ow329udaqtlept34tgrc553s0j9kz1i0pz1nad1n9jgowp86hmv77hz087c5td2yfl01ixydia71fjfevejpm3lq7q070ba5x37j5v7uexd0wh7i4cnd5x4mn440ckmgfb884j3x710ia',
                        flowHash: 'unf5x0qnndbqoil0ebcoofl4e15zq3c6olwrtksb',
                        flowParty: 'pahgl0azn87qib6mdwz0nqy5foxw6276lheiwzidzo0gwusgid00k302uwlaaqw4dn1g7dl5wufpatfpoa6258112ssu5fhh4qqw24u87vrz0rty8lqzz9rui1u7jrnp8z069mq8k96ajqvttx1t1kwdd3vn9c3j',
                        flowReceiverParty: 'ljyhpuqxozdbaauqkm1s7g131c8nkuktd6nxhzdxslzu6dlw0own63l2d6g5p0vxi7tdgehfwmrhgcd11b6hla0tbua2fxinl7ykek6bxv790tnbexpl7ppnvxgdotjuwjd7r9r7q3azeebtsh7hvoh9sryvyoly',
                        flowComponent: 'r4pp440chbx7mx7kbm8kfm5kw499cx9p4lkw5opzqq6xbyr0nn9pru0u69hxlkq0n5vuugflvla1e4vqyl05s36zawbsz8dmt4hwwuy53bfuy5td3o0nc6n7rrawk60ltk2hiyevv6eh6epk149acar25vpqswro',
                        flowReceiverComponent: 'mfjb2onnmrmz8hb7y47298k9yxew5illay8rxnk0clq83agwqc9nw1ugwvv1l8dsawg6mk6v69cisuanzn3k4olbuct75aepeysrxyg6d5lizzvw1u51aaiyfx62oj3q0ncq1fwpoe9mr3umb0m6b2rv2qet1ttk',
                        flowInterfaceName: 'bbidyjfmzvvljhm4vvohlqg57ln3f6ar6l049vip370xh3atc6bhmq1bpleyc7rbh6h24zxvul9ns1p7ospggadb8aamn978tlmu8hdy0k4p7d95pn70piek1t3p25v9c3uyo38u59pifwrcf5rahsbp5hpi96u6',
                        flowInterfaceNamespace: '43a23nkpoe65m6cyghne1xojcsiiwzha9kojgzdgpcva2nwtrdtypftz40gkefhtrg0zgp787qjfvgkyyebgc2w1fq57ikn9gjcrgv40oycpjnc0p4smth3eh5o35snp9t5yh893i1vdg5cx2rrx87xrh0ygz077',
                        version: '9vtyc9450bsrfggq5vy9',
                        parameterGroup: 'kztyyqiema63yz8qv923z6p80pwdr9vpr7s734xo5wmzpr05py3wdyt11fyk5kcdn9wl0dr9mop1ql8ka65lekgpg0mfmndu81gi4yit80lh6guu47y9z5w9vmt23i4c2qd8znor2ip7tsp5lhrxfg29raiovv2laci1a97s18cncz0np01nu36einztzfakgrqh6q7dqgc4p9nrapjrap6c6s9anf1oxr1c342moypr8uht8ebuuhddkv3etm4',
                        name: 'iyv09563pa91pnfrvzvlndiqa7v9ou9fpueswxnyhdzomb7yh3bzc8pug4gck7sdavj2um7t4ksig643jrnxibinwf7oyj65v4xqqxnrk8h2r6ge3ca8gk59fndx9tidwxkffs6lofn7xj5u5g2g97568bnj558d0h2pbevxmciixwvn9n30xt0qvrsynf59rliuczqr3z2fr60jtdccmuaq0hqb7idi1ty0d3tzxtb78hnra6hja84jszykj7f2cl5r2nriyfrq6mxl30aege04r3pdppqxxz3deqydxxqvqraqh2cwxukin35tdy0h',
                        parameterName: 'elbsgqtk4j84zcc698gggeigfoa94fon0vdn5xz0of8okdydk4e8mu315k0qvmt9gzqnmjhcphyydvoeakdimg0da36dxc2lt3x5ibjtc43bdqnuteabubdcyndwz385zm55kdst52v2pnru14gw7dfjv4ltmnladigcdwpzutkd2898po1b4w0t67c6czafgbivoqkncdu0r1htn7m9vp26m11osxktw2mpke40ghdukbmw1k6bcr0qla493y5wofh2857o4929c5xkngi9jjhuk14odxm5vc8ljo8tcj5bvycgvgzu4cl599z7aeda',
                        parameterValue: '6bqjw3qf3fpx8cjc1d5xvatb666cvxp1cwtxs9ve14qgjd92im7x1pgkqrbs0wjiv1ricoqvry2bv2s3yneiz83zboyd927tc3qzdq53f3y3fgmck0vav1ucqgrrybdepxxz9tgiafrguymmexwjclcxr2qbgcnt483vosnb9u51rfnrw9wjxavjif00cd1lnxz0ph0qh7iqhputjp24tbh4y7vfl17lt96p67xz6iujxpaggarb0lhd1ojsswpzfg9fzy2wm9frx63p1tvfbleihr3j9vycdhog18k8pa3qhzbk0rcvqfzccsoglgn7rkd46sstk7xu5v24ykjp10ic1by9pflc84p1j98hlubgyabpgbxulyskns1gjz0yh0869i42pypjot97wul5gwn8685ocjzs198l0ui67q8duvm8ot8ix2k3ghc10r87gef9do95036wfwkexs2ksbazbsoogj27jcat7kv768a61ukslwjwckbawxzrha2qqlp1w7ygce5br6mbmsubfvj5jd98xyl2lpwcqdt3wo5vy7ecj76y95kgy2jcyqybqh8h7revruqjg2y7hyqf7nk9z9y56fpd3apjbr6h0qomtzocmbv6rulqqf4h65t3n27swfix1q1d3n06kkegl8bbvnw3az5pse0n7llmk3hmbu2wuv817shmeykjgfd7afkud6ishbz1a2mxs3hi1fc6b2mrhv7ol49imxnkmym9tkbolksfwxcphe3ksdpb6tcvzfct82dqviyht7gyh08odribhuuasucm6tk0twurg78qag8ugi10gogm6oo3vx6lvyoqkkfmn3qufv6zybryqak3oi2cxqaj026jfsn24h13txfpox74igaf0ni3pbdha7gpib3hlyasybwccrj85ki15zcdlx6bdwj6g8l1y5c8n1e3o8wtarf0erkjjsep6fy3c2g3xjaujhvhy23lukaqu5gk4oyu3fwpsvsqu9903wa15zxkeyh0n772budyoss6xh651b1tqzawni74449yy42ehfzz0ip3fupbdgte4pbv02ucmaqmhe34frnd7m1cavxtywx7cibptx9zuf4sq60zo4uhnmib808k8qqlvjugw86a3b2rfuggukg2gn7wo2aphisua5xqjyzscenosjvvr7gz71kf8q5grsb62cn7gm2vlr35fgvr6kfmx71rjzx6uw4shn9d4k3wctqx1w0wap4p9zryaoie5xuctfo2af2tv7xnts1yhdbdwi07bxazqqjtscbkrrm049v53ojbf7ppg5xss200yj75tjb6ra73ywldbey25yacvywspc9jv5oxd6b6zrjkooqmphvtwuxt4b5hhc4aptnxpq5nmn3deu8lczzylakg32hxua6cfa43ip7yoodw0ap9j434nbb74yksrnd3u5jy2khbxo596nql1dxhbxllx6acworjogn7ejn61imy4tk65t0o7etj5qffa42mgelrgn56abqd7fupnonc09iuq3ksare90b9rkyvsr9vyoy258z20r7wf6qej0801h80ow5gusna84kncfk44gf4m2jw8y9dgxmvnwkfejwnuidfjcs6e8a98asarwqxj6chmt2775zai6bezi95hjdyqmzi4ywql7ipoaq42c8al7f5chyftx97keigazmobd2hyhfg394u4rat4zcwkgxznv1hxwfol5v01xmy52frdu5e42ugckqftxqkjppyvxordm96wpb8e2hyw7rzrxocqpaxfkhk2xs2ktxgru6rjrkccptjgn7bwu0v7w1bjwj3nw5ra8euzy5xo3rky0cj7d6hm471iseyok48meon01s8s5id58tjwu4y3l3j2tspvp8z1a0utxdcgiv28jt06sdzgqavn6p0myj4eloje4ln7xlw63f5e81o0wg1ra3cfp120iafnr7826bkepf2l8tiw84xg8ociwjnycuuvy73k2c096a9di1yh8pejzsebjry6pgzab6r3j8dn',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateModule.id).toStrictEqual('09f0f9f9-e612-410f-aefc-15024ba1d0d7');
            });
    });

    test(`/GraphQL cciDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '52001e17-424c-419a-b743-8495ba1dbfdc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteModuleById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '09f0f9f9-e612-410f-aefc-15024ba1d0d7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteModuleById.id).toStrictEqual('09f0f9f9-e612-410f-aefc-15024ba1d0d7');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});