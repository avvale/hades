import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'xub138xl7bzhqmret0bwuen7lxvxr0kaqcubgsfly5e911ey6v',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'ru0oblzbvo5pxd3ymrq3',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'kww9h0m1v92pq5iiveww8qcnilxyh2rvbgvcx9egd9coy0t5hplmuc1xktc6vuxljekprovj85at4caoen8jjcppo6gv4rfcn5bos5vs5b69kn2wb0x0nwf2rvfpy4bnls5b060ledqd9e0sovtmv25300pdwlh0b35o0rsfp0rj5mqvcthifi2h98m4wuqyuomim4y8m1ioq0lrhlchvtl4hv4ay0xj9vxormrsa6znqmurqccze2c0hzlomu9',
                name: 'u7fwyejylmnlsdfx8zh6oahexixwp0h9v1m0m7wgnpb8coybwo7bckwbs2m3tn3fjx59shnccminp241e53i3zx7gbtjij9jy4sr6al5pql6ig8is2xxw4jnogce0ixpu4abdovxelmz83qghiobj3g9nvrl96x2z220lto1sfhekfvlhlbbny1uke1b8bp337v1bpan94ohb9hn6lyplfn1vdpaxavskz9fa645tpvj22il4efrrqg6kc2l5tm',
                surname: 'apmw3286257o9gwg32ss4bvy0rswgh3wluwruvg20o9sbtav31sl0h5qcu5a0ow738c24kwu88r8sx02mfcl7ioswnxmithsgxnw6syteepdbkziblmwvvcdml2a1jvsiyp0ljrond9l376lkjso96u0uyt37sdue3qj75tgshg2h67h94zo76nnrofgrnvojduu77jszuxsw2ybfsykajpknkbtsnpiqi566rsjkz2s3z5e0tfaopvy4e7w9n4',
                email: 'f57mv5n6mrnjh8d0hx8px20ddmgynyv8iuvr7ehutmrg6j3nac3gnqyegclawsapadkuno4ot1etjvpws0t7a4omn0fn2jotjf9kysd9csha2vzy4juzhpf9',
                mobile: '7wr74tw8oa5ca4jgxj6eecdndo44ak2rls9m90adew9i8o4lwduvw0758e01',
                area: '6o6j852nmllu8gsxbqs4yx8fvgmh8hit5qp6kn9dyjpnitvtdjr2ox832rt49btgie1caplllpntyf5jjs7l0p9zd8g8sc0kz7w6htuqi39qftc57la09we1ayxw8ziohvhldsalu3qyuxvg7mh9whj8owq4y3dng99w0kiu09ced4yo3eqqyntmmwtt0t9v4r241gte1avnjrpxwnxk6hsk4nrx6wl11px7qkhrk1zsnz0n067peb939d465te',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'vumqdnpy5obmgnfkfwn7100q38v12sp3nhcoiaqskd8px9svpi',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: '4gmt6q55x7szpcmtpp6r',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '31qpz1n5eiadkfcw9uyv7g07g4cuge1pq9zbw66zou29zrks3za1kfktv0g2r2tb6isc3urup39ko78vutty5gsco0tz9icz1jh9iu0viotno3xfx7jqsxkgcv0o86q6bkqiqp50jundnjbkoeex2uhov9xk06rkd2llee34pf4fhp70x5mmknlozx864vn4plxze2cdx209fyanwlqmvycpoatdrzf5eq1gxjsibbc3pz637zfmqc0z5adljsb',
                name: '221xy8e1xx2z6go7j5zb7fe10pz2s8nc3tdncc3vhfjpvjlztkd1ppqx62qnox5bogegvtibkb8g9966e3ttvphiwid9zocsujspu8vfgm4ae782ys35gbrnncrocze1jen9ehjw299tnzjw6j6uogyjt7jvn65rzdodgp0g4hxo44v6mto4t3r8x5396zy2jgt723m01x8u44xzhvxe37gfs43bgw7q7e49ajny13ekcva13qmi5sjcszva115',
                surname: 'ggo4mucr7ebsbve1vrtbd3ilr3xz8orzu6oj181knaym8fbfzmdw622apvh0k145b5emzs0rhwrnbszm6l7zb73dlaxlxsau6ix7iup7be9sn05445psa0spejx3b6uhzk1u49i70o7z373786xohn277tps145ma753seh7kd5x7r49cwqg37p2v0wd37axgpk8vnrwi608m3rl8879igookw44txuzoj5k7133323p3unxoy6j3v897t613uv',
                email: 'in2z8adh3l84fm2kjqxcpor6izrvjwghj2mt9u12keorw08btl2duryikbhx1jbaktu6qome10w6umn3m2m7n4wlqp1uugks53af7kayki832d1vg3hxo8ji',
                mobile: '17xhaewu2qjvtq5z0bg4e1jdsu27wa2ueawzptkr16xwd4q81kqz45r3vhz7',
                area: 'nsm9095dsqheelz78pukfw1x4x85g79bqaeyr0vi3qcbt24c5crhgsei07t27a7akcaav430s1u6sde06tm68uic9bh9ic0hheeg9pp73tydprs3z6lgjnxp3t1hujngrzw94vmduf2or4jqxm0cfiasw9yn4rkuyd2hqe672ln4kvued9203aeb5a6iz4gbmcs3lgi9p94s2yjzr1lo6mf4lmr9vfdnbfs3i56jciq1eat7vzhld86za7cubji',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: null,
                tenantCode: 'tqxlamiwwgc3zu6e15f2v2vnsqsnccdv0j2mfebh68cgqg07h6',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'd995vbhgtjacaym2bx69',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'ss36xnquh293b82t4jxkux1vmtg3jh9j33khxse2b373hku1386kpsi82d8lqcawvxj6tt2nq610ztiditmx9rhx2kx8cztowt0hwnbjzs3k4bwj01c5qzoamu8rkh7lijk6epeh91b445i14gholvveh8r7vfpsfwxkeh2dnw2vg7jtpfd7xpopl8tpbhhowphbsh6f9lzjg9nl68ergqe0zd84wtiwz84uitb570zgk3ww3wkejc7o2nju7dh',
                name: 'qqsdtpro2yw6fjkct8e7xkwlk5x82rs0if1m2owyl5st6koder1sllp1n1b7tck8uqf06li9mzwh1r8k4op3q0hdoakrdk3oixg189ron523lp59dp08sjufi6vkz1au2jbn4savtoen24wuvrvb5qhkt0uomroc0wybsqyvj2chp1kv2778c389fp3niejezvyrnn35u1eln1kbd4kam4jvh2f5w775j50xiaschs0celm0v8xsi7mzabnoyes',
                surname: 'fg4nyhyp88n4231j2fwya7bio3abkorcsx17r5v5jmi9vn4gvgw5znij4p3n7znrg6kcbm3q4hkkyfs4zwemar0hu98xgjod8c2kkycssirc4u439ly2dmqyvjuaheb0kq1uizlq6gadn3s3aklsdbzykcxe6gsyd2v6cnj9l18xtvihup0jrasask83v7rlah9jp9lfasqp6irah0bk7vjx66mvf9c14f5ngh5wvlyhm10f8z0uym1gtb4clk6',
                email: 'wfpdk1mj28mgqw8v8sd1jsjnh68a3xa7jfnpdww6hrs2pk9qg3zzpq0t301ett8mfk9maztxi4yrsul7p3bptqral0d0xjnf40q4duxy8a58w5ptxhjeb9q2',
                mobile: '51t3pgr3xydt7huwxnd11ogz86o4ig760zvj4f6oic76xe31elewr6613nxr',
                area: 'o6skjgwhh15sjcepj6yvalzaytw8eya8zkqby3sb6arnrbrqdw6wb5w6kv4hhmef601say59lydd5iuw6a6oenof94t223glgpta3pbeyglr3opb1ltwoqlanrbulpfhoxr8i03sy9cntq6pxzysjohtjdols85cmh06ro3qpkfl99nfy9wgintgce8mg5kbohozdbvbbs0t24rxrkrz406zv3hql86u5pmnilf947cwkuhsat1qywzu339xshe',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                
                tenantCode: 'a6dms3op4y8xmjaj7py9t18bokp2hldfqpegknr3lilanok8m9',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: '6y84ofwsusgrcczt3olv',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'oujga9yqdveyylqyie73vrge7l1cwssxkn4yvmcxjsorp2p5y48npnyl3hifrj4ly1xmiix16w18svp38nomucw20hk1bemclikdes5wsxtdj1ydfs6qe2kit04o04mxid7fen679xniwrnwb5fa37q7go5lroncfaxqlf5g188tt5f4q2uk8ei04w4g92nvqkwh4827qy6hsnqfzawtdjekfhuup3w4qpp7lzsz0qlferj26bd5652demxzoj9',
                name: 'wx1s07dsefti9qwxnceruzxc0ioy1177hk8qrx9do454m8agq0llfsheavv390ohecq0peytpwu5o0jgbafeiw706twjhwluktajhkh7yz7m00mi60p9filcihx16heyg5wvkqiuueog0v3xorwhnkmotic5awxs3cevjt7rwj3xs7gser4o8lt0k1nm4c470qjezg1hqvmue07f000jti2xtmu3h4o9mwshtugn06p0drlo1ws9wgtx5qfcw8g',
                surname: '2ergyoajnz84bcen8nasvm4uut7t7kcnpo0tktytd073e6c1q6ufrdwt47co0eku35r47r6ympc3xzetmtpwc1cc5hp7lba4sj1lprmtb45mvjttpifrl9ki0gocvh17gj4liqz82lg9tqaq8ud1pwlufeo99d5xzw4tsow91lfix4mtzpsfori7rzbbkqntz3kdki85jwq95lzv4wyw62oejqvq67k8dcztx2wzb3izyk10y98ehqen8wrxpuk',
                email: '9anldn17s8t7tqeiiihx4fu464r5d4yh2aqst4sg44ed3towstgilc9acu0g8i3so2fvjb3n74ghmsd735c0ji6udecnsprurt9f4udotozirfs03y8ayy59',
                mobile: 'oo8vtbco9m7os3zqqmqspahlz5ln6f599fs22ng8w5eqyppks2cuol50jcp7',
                area: 'i1bw0rhwul4nhxa25bh9ugvl6397etjkgivyaro7r8v1il5k2b6az9rce2e9256vp20ykvaak28o48glcmn9golrt5kgebbs5h4ogpytfp6av9ytgepalijbyxnv28r6le9aornta0cf2sjvxoiv8gcd1dzjj4l3gkspnhi2tqwn0u38himbzrgqo919j2lxlzwhkjfp05vttkjkhf23t86gt2ed9qkh2578z05r0c1jf3tmo5d33nulmovg3lo',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: null,
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: '05t9lrrdovxy3nlhds99',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'q6ia3irnp4cj49700vlxdr1bgniw36m62vr43kazer6358fjxrdy0nl8jxkss7n7ukrli5kg9zoye8t4qc7wa1o2jqpih0ar75qg9k5vi9xtt2mstsrrwlurp9wwoyax0kakx9p8qa7tc747ikgzbkco5wfn69c1jepj5okliieofpaly0wlphcjqpo69hm3v4bxmthx6nvzlgax26m7z2r03t2wcmxvjvdohmzehjptw60ihjbghwhkmuxfxd0',
                name: 'wqrsfyqu10eoskih1rrl5gd7qpyxmnddtsxll1bwb33kbjz03k8vsrdnxneke7nefc8u7rbjbvb2e4ge4mouoqoq3flr32mgj3rxkqwgbmj5f9cande2i0qixrri7d8jsvngil5sffqd2z71g7o0lf37f8527i2qyu71g6dhlm8vu77oan47g20lus0g0ac2go2br2lk7le1nxua2ths2y3nw4ou2kpqg179g2lb0etx2rzmkxo1xa8i04x7p7u',
                surname: 'b0e1f45dvethtdgylwdbv98x23uagjuclunlcjtlmzix0vwkosrczne4j4x3zvdjb157y224ahp9twvssix1ys6bnoqqmjrc7q8lle6w7110w4hmqzvb6h9mg9kxwispedbnis6ofmhjvrnx1h51fij8gjyl6mwqc8ehaoof8m4e2d4p7wi8v8x576lkvwql3clsjpov3zs77wv7q9us1qrwvzx78aomrs1z04xfu6pv29iubydgct60216y0uw',
                email: 'jwtvy2y2547lsbdb5uocl68zyflhbr2p6n8ci99h1z20cj9bfwt52vcrbfq3t934k6gx2ube2iqy1h1epm2qqkhlxp1ffvi22921ymda83fppg11ygyvj1mt',
                mobile: 't2rrycff4ov7tj8gcbel0kvtezptp38niy9ureb46okqr1tahuvols47xyva',
                area: 'asxg1e1kupbdr6x2yf8z7tz9zx5l6bkt57r3lhf1h77vb3lssahuye7dd76aa2ok5muzom8wpg8ebjt3evqcx5s310y3lzta9pvpgrhlv1pdky2abz3h6eyvl3kjyuaqrktxz53ljynk3yw994lf5e1sii5ebmwg6wbdetcrw5q7o0li9886292f0iwxmsnojstqcdk8bfpgtcdpuvoyr42yp7xu8cejf2e7l28dlcfqt4j68u0qgrji0wdf9sm',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'zw6yqzlff3q8toxkom4i',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '808vwkup0efza558acdvksai17ywompodmgba59l8513o4rb98unmqs4pamxqas35oe9guyrqpu3723isqw1wqcpsvud8jcgyp07hjep8aynsnxlin8suxwuhtn0rjyxvtwyiucck322u4mxl3tk5fw6u6wihc19ftfl97w359ho8icy488tttrnyupm7m9ij6cmeiivj7rweqlcucwtb6f65nhy92t8p4g01gsn123qloch30dxk9ev34313zy',
                name: 'ad3k8yml9gbx0nwubr1t0w9huqkvlz6a7kpfyb62q6e1vgbw1jv74nclkxtirayji0oufdfquehgksmpjy4mozbmmyft442pct1tkq3zatvi4o87dka26gwcvy7sdg3a9l7mvsp7rw7gyyg7tt4p74w58efplqh2yygu05ap4r7qnezbpnxjhwxn1fksqsc1vcu363e3y5tb516wuc7zkku2cai5pqt46sizedzn0xbautn1gfcwbdn2pygcvco',
                surname: 'nk3fs6farw1vh1kxa20win0txzn4agzstcygmdmh1jn69mu7cwbvwb6a0akjjb8082mkse149xt5wjul5p1avl81qn033qhfl4ama58n8eb7q4evif4d9aghhe12wshxue490e5mrqcj7755pnbvt9t0tpx8s4m6dd1if49rtr7k76hcl22ojqvgiouynih5ng4eq88lmjuj5id71nzfkn0lu3skerbcranjw3380k431uaeyjheycrxsopjpia',
                email: 'jz5400j6i7hajlhqa7jesnhtri7kz56ysp912dcd9rej2azl78ait03o4kqwjvalpwnn0itml0qcv15bm2pgvp84hxkggplicvq2zbfhkzegn2cdmdetrc6o',
                mobile: 'jpx5jbj980li5ixdwvjkragdyqfpz1sklux9k7drh68jo6b8me6jt65x9nr3',
                area: 'dyl7fb95628n1fu61ujl782q6ofnxxtyppiwswska6ek2646i91ubhfnigdj62mawssf6x2zk8b4e6r7pvk8u3iyt9o8yptfyjd6xft3bvtsijurh6n2oa6ll5fwby7cq8w8fnw2zrzpju7o20xvk4c8ehpsrygy45opv7udz25u8g77bjipmaza30tk6jo38pmh24ansjs8rpyw44g96x172u3wyvvao3ipiwr3y72ar7js0hemtevmnxztu7y',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: '7z43csoms9vd7uzahjmrh9vnxp2expoco83gydk8rqfwyqeno9',
                systemId: null,
                systemName: '3niewvsfeb2jh8m8ilzy',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'cip8dahkhkcuqqrelheyd29gpu3d1l03n5ihech5kkx0nbvku5ly4tzr8qoiraiq1dcoc5mgdvsstq9762o73s8qn2xulleryrs7et0mvxeo5n0456ybwdjcej1xij2vj11zk7c59owutczevisoaz1jldh7mkhsyus8hm8yg35pxsddgz7dtcy27eg2pps3y9ctvwe16quvdmfve360asvo50ipi2zg54ftv2di511euc1szc6xs9yvda6njve',
                name: 'iwfq4iwh037vbzbnb9uktdv7dhl2qlihruoi13ntrgdg0fi8a8rqdypld6pl2qgtvah31dondsj7yq3iwqbrz5cnmg1grxa848upvwbre9sw8eixf5un9f4ft6yk06waf27m40dctakx89px1v01z1fe1xhj0dm83y9cen83ygpwui3ce95p0fccnfmo1iherpkwx2v7j2nfvxhfubuzc4rmphe6wl9u9c1raaiokizbcjgvqh114tg9ld74aj9',
                surname: 'r1tru4uk9an9q15mql2wan1nl7qmbd6q4hiiqmvdf81m03n6bc5rovhyk3ppxhd6u5hck2k0gqw8mgh16ullwsv7n0dlolnrspbufpi1xxbboexv5e6mmmlg1n23apax1ngpbx7c6p1qyjg26qopz66q2nq4yeavtcaquyjn1qe7g424lubql0a87vws8grzw7macgxe4hrmq80y1g75e7ro7ldv8wdwbmlbxq2u9s1vb89sq7l475pni66b57d',
                email: 'pg2p3dhkrycbtk6jv4x2sjqi1l4vuauargu6j1r0woqb0hhaotewljjwern6jlhin2ce1wtmze31evuxa06ms5m9ctvqyiwak2le395ouqyblpi72omofuo9',
                mobile: 'w363pywriumf95om4zt2my1fjqqhwmqb9yv0x8yd5rl7terlvo7jmj2mxjhf',
                area: 'pqhx7b4lbzu6481wxxukacvwinm0g3kgl0jvvt0kblbzgl6rdz70avlu0atpcgebt1ca9r9iro1kpxza2ig0ugdubtvn30idp4pnjfbd1i5bj0kd5ruzi7mj72rbs3lokg2dmdx8bt7cmsr2ma9n3pn1pvxm2fs5uxe9g7iktkra5fz1tka82lysq7ugbtehzeenexchxeir5jz0lb4hg74q7cvivjl40k1pkg2zmprj5yg26znxu2xk3k8o06v',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'l0qg90z5rmfh6lag3fsy6q6khfuwd1gxxaoezahmpmcr30pfk4',
                
                systemName: '3nvt3kpe56lmicouje9c',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'wh31dbqqfvo62v1e3gvt2rp4iqs5t3q9rdlmpoz6ii5mi59itfp4lm4y2lrpj7j6x4s7r4wr08eq8q37ooed6ngqkb3qsrkkop6bxzhtc56adyrdrux9ifv0pi406ccy4pyh71w9micguotge86zyi97zvv7a0xlj3vhtuv3bwxktx2tz7d2czp4bm947j003ur3hzcowpk7zre83updxo1bgl7e0cuaphpj0cyu5iegibxfe4kyphlwh1ylkl4',
                name: 't4zk8ceoretho2jh1vv4yypgnpzj7iqg6dtg1d1l8n14b0wtei1kc4bhmskmi22ii2fc8gpsmi6tad518xciojtxacpjan9ne8hr64hv1y56wptvzkxkmvyh9bnzu9ggrcvovr99pszp49jmaewdqulpeop5163mewlyplklhv9m9lygglgz808n3wir79jnnt1d4fiee0b193wbl3p2kz5ir1au91a83kxdfq88nupn1hagd2lo58frt99klf0',
                surname: '7vyad6kaocmd5mo58ltgbt11cogiuwba4urddz2thr12h4796t5eulaz7f4dldfo91k7jtn2zl6a9vt9zqht8anzdgejpuojju31361fqm42xn6jt0m432vncjixjbaoq85zm1i4mim0mnd33jq8c6vn6ofp9x8gnuvm1armrmhmiztd8v8wg32urg9zdvwxdt8nb6hg68hxftravivd3nvlsokrqaoe5tssuz89ht6kk3rr7l9cuio7mu5d8m1',
                email: 'pc3ib1aelu8o5gzhkkk3a943e3ztt265i4pei7b865lz1oxzyoq2z7p9uptapwxbuoqnm8kkqrwlkzp25admuxravhrsu2xri6ps9skalx21w3rdfgn0xxjy',
                mobile: '1euaearj1ixqm0e0zzj1e87pym4zhutov4qqvrbm5k8dr12xzdlenituu2j3',
                area: 'tl86xm7iyizcrzv4jrcppudshpy9lk9nxrdek4vtx3ch822gtzzir3k903mdsshbi8kr59aihdz54pqpqsof8i8ngiziomb3v4jz66c57mu1cafgm0glufnwmhuc7c9dmjnwsol0zwsssmz9j5yl9qhjemai2ohph1wsksuelbv68zw73ecx5l1e66ax7crgzpxu654o6xta0xvvwolxajlporta668n8duvzj0h9n535myemsurkjm05xnxup2',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'sxxq55ya0hkpik8tbfr022f92r4wo4jmhj9shypez5af4tju1g',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: null,
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '1j6fttrtktgoygaww8rb9q0da3xuleyuh86rb9ba6fv02hsn6wiqxucuwehlqp8emy5f8dppqjk85rb13qo7qp84sczp7nxo7fw868sc9kxzbihkji7vlcmu6wun748dl2wx6ksm0tze1u8sivwy00mhu4l96a662298kom0tojuvzh4rssv71qa1oa4gnotj8ubgs44s5dsbnu2rmjhr8pmouwe2tnox90vyaaudpxdjq5z0vzqftw6xfjrrp3',
                name: 'd9yteo72fiq4vg17mzbg6zkdoq7zqobz7o1c0th1hp2e4khfegnj0dtbw30vbgmxgon4ze67vwy9m2onny4t5q2m6seav2jpjp6w7yo4wau0zgo7ftqbb3rltuiu751qow2zr77vu23ol8egg4p7z53yf0c7piqv19xb4zsl4rij6x6kppmwjmd3ozl6l6spjrdv8z7ed0676dg0zu6sdnfu2oal8rkjrrmmyvndl20pfso47hsdwhi0949gex0',
                surname: 'ede6wdrmoko2417q99qwn7p5rzdkmba7isj7piij9e04xwoygq74nn6h6o7woo4ci9e8h6tesn5dx9xw7vu9y3ic2xfnjdh1j1qjf4c3bdbfor6rz67oy8z5o6oyxgjs6ub4mkb0c0tkr9vwc9p68e0ninlz645bcn6siq8rrggnh4dppxn345a0kk08xsiz3q8e6u88g6khpyv5sepgek15sis855wxm5dzfpsykslja9uibdx7x40j9e7wery',
                email: 'yiga6halevw6hkbimm29bdasyy7s6sdkd6tjh1w2ctnlgqwhmfgt7mo6pa761kr5ni41wzhhcdr5tlr69vaf61hwwknyl61m08sa9ikhlwul2xxavx9xpd3i',
                mobile: '1h8gw3lh0p3od7w5ku66flzzq8vemxjtkwyv8ntfdxgdgd88fbqrfm7yg4sw',
                area: '5bkvavhyuulq4fxg6sf3959gyoz3vnliebyrxqwtp17i1j0fbb565f4ibl2er4elbz5l8qtrcfclen8u2nvtfg331a1rr4q95io8hr5rlg8cpn99myofqvu725lc2gjssd61ea8xhse2auha8jo7fnsvht2y4x0vjh54ty0kr12kbyfdxtyhnjefab319s0jzk4pcrnk9vttk5x4uhxevva5yn674fzd9257sylbtagjn9nlnbk1jsm1plnmj7l',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'yfpwbehk2worc9gp1u1n00kgkengzs1pw64s0xx0cl3m6vwg21',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '9d5hdeapde5s8fk1hz2k4mwvd6trzpnx0gnufntdciog4olo4hcx6drfggae0ik8rn1ex5pxg9syu4f9er5lehyn71g421x6iqjd7mk1f5iew84l17tc3el28ynje3tzfmbbh9fvpqbhqp1zf7alui2jaaw9umsluijmklik0v3d5df3i5deiot8hrhteq50uwfzj70bqzgzayzx7a810969yjbdfksinql8hcvup0kqphk2xiwnmsp5axjd46b',
                name: '51obablzghx7ybwmwgocsb85hfb6q66ypfcjgokjzpv39w585eeuxtjjcy3cu8tbvms334ibz4917w8um5f1xsgelh5ilghq880lhouvdsoxe4wptawg32f2chd0bhezvg5txgfk9nabploslfmn9cslt3lv67m0dneo3jf0izhvrrdu95ny048lm2kirwwliwl39397gan9t6hnts2pr32qandc0sjssmmpi5p9y3dfig32t12ntsht7dzr6dr',
                surname: 'yve8hiejyrbvlk1nwpzm1beexlt4bvkkw8cpao1nd5qff9vzf3mwcpv05offhf99sdubn2mo2x52binxel3scer88qdlrbpgbnwhv40tndp4b6spvesiy2fwhfrtw9v1l9qf1sapwxftsiadfbrcgj75wq8jd0hzxz5j6go0mjkw3vrxrfe53ybw9dvqyheifm3tksy3oil64otx6qkzwlg9tugaocf25seh4z6omxljwb3l9p6sz568x9rmuf6',
                email: 'msr73uc6rs3vi6pi2d4ywz4n1aqqwo95lzbn0mo08hvtr47uj09f0172si3bk8xfzux84eqfnl3j4hejnqfv9p55kzdbmz4c6rvawizvpam2j93e5syxsx0a',
                mobile: '4gfjvexxueknhuwnostgzrcou6qr2s6gd4hw9brj5zad94z48feqp2trtpoa',
                area: 'kacqu4o6hdgwpy5swpazfxs690plr9mxrtwz9vwl0bhtt3o97cx746ew5ox4xywre82zos8tsi06t7dwx5f9zeq89fb5zmr2lev46upig4pgs8sz0xax2b7d0a6l7687yah7dd9g8znv6seg1akre1ugacq6ojt0jeiq8hfp4von9hsxmk2vuqzkepd9wyb0iemg91edtknol4ke7med85dx46es3361ajzkno2oenuwwxmy28v6v0d1qyzpc5e',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'hnh2b3tavh314ous6yszl7u7lrfm4fek3hsuq85qczejp8pwvp',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'figkhykktcrrbtjf9c39',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'wdhnkgynngyklontsdqgzqvh3bp6iozrq2nfz9ubn8yww7n4pnuolfws1yg3x83hlflqx7hdyqerzadxwgpyarx3elgdo8l62cfs2drgkl0qajgz4s9n9i1i9qk1uf8wvq5mzz3txu611u57pc1klif4komcnxg1w1exrbyrzp0va2qbuovmwo3ioeouqnua08klcy2ie5ito9gl2n86ch4uqd3rqlf73yg6s3klh1vtatgc5lmcfw99ucx85z2',
                name: null,
                surname: 'lo39h7456jrlit7uwvirsqrioykrid0y5hqw90qhiyx8hxh489vokomzpp4ovdio8ik4hbihigb73s9685qx2e1agiojk439oxzhvk4qe15rerhsrs525x2dtqn0g9uaqxeok9ehdgsebjb5ebmz4q28uy5ct4lhfagnurst3tl438vvf4i57q88vz42kn0da0uhngucsxij61gdjlqz5cqcr0al5uvvc78xleyylof2n793p5q1vh0q5er9f9w',
                email: 'obha2wy5pyyk975o2dljzjmsyhc8xlwx12b75aaz4xv2mroqb0lavgprvdeu8yj2yyvf3tikrhb5spq0llfghaxfgv6z8dzdy1t6aaqedqh0i5n4lzwnzink',
                mobile: 'rwyaj7xs7dp07qdqvxl1d77rnojkuaeq0wvj4ienh82dqjov1iako6asq7xb',
                area: 'evrm57aqsuyu5woatvuxk6tgrl3myf5mtp79cuqmellw457mcoo65fj4bpwxbsk9outqz3lwk8aas511wzeqtgmq1sqe8egt3cmhzuxy831xwf0qcwe86ingo0f51vul2ihh6kck6covklwkiaxels9jqgy29apd4b4wiox5e9mucc0je5bylr5nbugkkuavjkfnqrg7mru8sq0ovzwyvov9hxp1umgb2z3x9f0h9urupu6y7maico4hlgtxmhx',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'qvjcxpkslvid8mws9unu8k72zrjcp8krpxgjmisahi4n56n9il',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 't1s4djpgt9e5ao8xwdg1',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 've2k8ix1hc1mtl2yp2gvgr2fdu880fddhzgzebe1d8g3d9wsex87qlkf9t2chwyv90zawu79ck24e9d9kjf9nobi8zn9levl24adjjia2dwo84mu0fhdjxec6pxj86yx49b2hvrpcth7lvdbaabeikaawwtet8l597diovdocwqu2av915elwgnlafgur1ou1lws9kn1uo24017xc88wphjlm7d6ew910zu610dch0kn612ctujrm0wa195b2az',
                
                surname: 'yrsfk4l4wg1edov4eh5rb9myigg52n57s9jcry2jzcwq3a6lg0hh3es6t3e0nibq59jjampyxyh0jxsl6aq807f996fhw9rvvvmokt4mxezrzj0qfu2y7om5chfl9b9czamebqkik1mje5fuextl6krwnb32tq7jh5cozzz72s2pfm7ftus8wzrs9oir6ohqasxjx498pzg4cv958x0e80kgzx8qx01a9do350s5wfyxmqmskwksgzu2q7hueej',
                email: 'v0gek0i25xgeh0iqvzmxq8di5t30c7w3nwjehpc0cut9cx9yvoyi19kp0vob9y96mq8u5623duzeo46pnhpnyke2zh9dx2el0eaiqqaud4017lup46dl953y',
                mobile: '1btdbd83qbhy0qgu7hqwnx3rsaf95qbeybxheyqmd20x7serxhs2oh9711as',
                area: '6ev67g52tl8tr5rmuleko7utyjxprarfqqey24mpslgfb3zcjzw0p0a91t90gg7p7gu6fvkwt4hjc0c8yo7p2kqe3bxl3yp5folu4rpl19w6k6divptqviio8mrmsgxq17d80z02g1a46eeitr6j74vm7va3a7lg5s7054ymxhdheuokxml630emkjnqp2isn6ris849ludbox5vianoy46xhvu0hr77kngba6d8vptksh50kshpwf5gnsx50hi',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'm57p3hxywb02rictq7kbccu0n0exeive4nghhncedgmcvai1pw',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: '96x991itox6lnpw672az',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'k38taphsq5lk0cimn363jdcact9tly2756fu2on3u80pql77waivc1rgbt2qwc3xljevorx123xqqyhq545w8islnotjgau6rzl3p37b8t4ccbjhsc9egs2ka1wv4gxmevy4rgy6dowkouk76x8iezixsyipaflbid4u2ri21nm0s1e30mw3q2h34ro58vsiid5rxsrmsbgpnuietgop5xtwm8or1g8l3nqid8gttn1m8zdl4eqfq9oj95m7vbd',
                name: 'nr6x96cgu1fye8gwc1zrvr0ccpefyjbw2d53anvu0mbgka0a21vebeugt7b2y6h987my32ens47v3sck5zm5r633kq26x8sey9v697q69oms3kjfryc7n742d6jlwx8vyk43aktba70u3bchcm812ihizpqmv0sshda9gvb99w0bcrkuzvemdarhgnxnygj73wy8rz2gt91gqoh2qddpcts8xj9af5ivjeuqxet3lpezszwn84s3dam31tu3dks',
                surname: 'l2y5q6ffdrtlyjjzoxh3c542luezbeajfzdhxkxahqbhwgtw6tructaf2xpxxrgul0lc6ppouaeims6shue1ufj9avgge3fy9na2hmbhpqba2rf4ivcd77ptqwdmukrgy8rhmeg8ffp7w16do1lckxjb64cgdlqy4dds9xkeq549dq8iscbvhmkuhtb3yf9urk9xqce9dphp1a2pgijpuc8m52gsgroukne3qllmkrbfutw94vezup42yulqe14',
                email: null,
                mobile: '70azbajrn147imxn1hgomgv8tbevvok07i1mq1uhf8v2vqgmjzoawocn2csj',
                area: 'f5gt8zzu9b228kst4pi6yddyeyui06c5elyedvoo3nv1c38mykqj7tae4qlidcymrynp9q5fu3fbij07i8ggoxf6bv8jmviz9i0ut4cyu824479ojnv6wt5zgd9w2m4rvs99iy0ngjmjfo3p1mjnn6ji0azrfy5c4qapjayathuaz5nqv0wcqlzab5xw5thprntebutggf2jhgdntswypiwbbt2ncdcxjnoxrvv0duy0mwgr21hg8mwvohhypan',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: '8vaowtx31i46dg28giow6s351y0blzkjs3x9cfhr03sn0trhtv',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 's0abx518332np29trsyz',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'ipxt7wo3h1pntegzyhr7kifqde6x3k2peh1cpnvbmj4004dc1827bkthzvvez1mc0e40ly3feqduiatsx9cqtga6j208udxqft2a70wzya28e5re0lna3vz6r9qpwi3u6o0c2y8tg6123fcypoyifizmhuq5wugzd49hhyjjf3pdewpxc80xtpvp55bfub4sbdsra1yqxpoip1sez7w3ewzbnboeob52yrhwhwh6rh2q4nisxmjumgoyrv1zbg9',
                name: 'ry1wrcv07utd2o3r9na5kgjb2fzkp11gbn82xtcbh87o6yfgy8b1znyssm9dt23rqq15p5yxe0w3lbe03k7nl2540ps0nvpygg0wznu557hcu2tt32pbykoxa33be2r2h9811v73tk4bdx7xgq9nta7pnjdk4n6azstwxcocvl7kp4rw4qlj3eg2b4nosh7xz5lqrqthu2v3dr6dat2obvwfnb4pov1vdz9tnrxlzpbj2icmpq5d4zba6v03h3l',
                surname: 'oldxx9aed32dinrt591jj7yc9j0yrxo8xbkinkvpz71y421dpaqbvf17adotdmszvcv3j207wzixymsx3763t5cby9b751uqdg2j7o67a3f59tbmwcgbz55xqen29gdl7ig36anxa1nn73f85bemj6pusk5lo2o7ie425a4nn84fd3okfm9h9btt4e4gftyhco9cvgkvkhtg0wz937hcrd7uggxfagz9okpngi7ak5zqgazyayyko4usuqdeged',
                
                mobile: 'yi1trlwtcwjvlau17lty7slumrirsn5fdq07w7ccf3ezwxfogs64n1a508ep',
                area: '2p18vubz5ip7jif4e867ifm1kabg33a92mzzkidomk57scz335iw3szywgrwe0xrxmhs6s9xvlf1jv8twhhx3fnvdiudbg3au8a0unufp3piwibscejwgvsj1pg42qngulbwcpfiu81v1fd836e8pmjsp1196jhutjgs5zdnmwvjyhufp2x84madvk3c3sgjpqd3egd53c81l9ipz88ehvq6r5aapu6j41afjqs9n2x3mer4kfb7ovfpvytsus3',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: '6wli53pkyogs5gih9exx2f0s23l3w9b9mc2re4ejai3afwif5a',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'kk5q42i6b4pg4f63rpua',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '2saxspaj8faprpedv8aowm4rgk7axlscjfh34tcu9hv1egmlxlwxczgpq74xc77ivjylzjllw7908lmfhpnvukxsxil5pdt6w6qs1edv8cmtdw3tjxkjf9sgiis2dblez5vfsptxeaf61x06w11ab0ohdloamhpgtfmi55uh8bhygrttf3fc0jwhl70p2ydks2skdjhrucxbzn2k74vckb48r2mrpkjdggxuth2y375xazjcm8afevymc4xptfo',
                name: '4n98umbpaz9z5f7ix6apcaca4bdbw7u8bf4tq4vu6eaivcjqmurhv6wfq3964si1b4wyr9zoq1f0k2md3vhallmo0ln822966fu94ep6oymqh127uwlx45uogngtssgoqv2va0a7uowf0679izsztvofm1pp2ddulla8rdmhwo2fnmh2ctmq1aabjs7s0z3o3vuy5m3do4gj9llht5rwlq2olb6e3tqg9z5tikll5advsirz5drhkuaw94utghj',
                surname: 'v07pe03rmyvb1b6gklh4cr9h3dhr70xiln4j8eb5vnh8xxfngy6iu7gqe64z4une09c5q1o2uz95acsiwmcxzbo4qg1yd9wu9snm5zw7kkdo623nf2ilyz1qrl9spbof870d85rbmiyhijhmajb0hj9hfuvr8bwedguxab6maaa6yxjct4bj6wwo4p418q0wcide526guvnsthjhdo95ohg1y5or3aohwtqfq4tk7pstnhe02cx2ssu2w28388l',
                email: 'udl9e0qm38bbes5q4xbz0cv8z72mb82s4m7o7etoeitvaazig5o1ekpb5v54hxz25xsk0efm0glds6vb6ywhu1y2bk7bzsnbyl3hnxelfyosph0i7l3gdzby',
                mobile: '7bf9k3wdkyaq5gk1smrippcrymvs5koo68mk9vutbrovre7oblk6e21zbkx6',
                area: 'xnq0hvrw7z9btfvndbr1p3486yoawuhqnnyqdivoz1rb0zgpixn2o8x04o39vlc63ywosq6f3eiy181sit1oywfv1fhc11vxudblufzrz3hx51s4fl45i2jrhmwdux0hc4u6mi85w7lzmn9ff9vqsursvf1qul1pdsrycj350z4h7v0272ood3skdidbmidti61d457oleexfwnf8z49yg981nzxqp1hwdlwh7tci22dz9clk5rc4p729aiomdy',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: '0g1xaeoj4nbo2qn0veuvmdhlwpysuzbd12y54kzhtx48gdlon1',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'hub4vvn2m07yr9t48y6j',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '4w11m2hye8sp99peegqwsna0hzeg0bb8kv1erg7wr3ojdh3oaejgmr3gp28ac5j9cmye3a12ayih4n6ma02khp4yxnqn3ogha19d1lq90qfbstvi1o8cymi2fyti9pcu98h5jwvax88mjxm7nrd36adt3r3g23wgmud47l2czklgku8ve9g7o1yk5yq2ar3uqregyufd98ityo5g92m7lo515t9g87k7ef3t9n80pe4bo3m3rrbv5zx79o7djgp',
                name: 'ogjpqs6oukk1vcigjg4ory6uhkijxy8ib1xrfjhq4ojuj2m2dnfkn2r1x3gm94fwiqkrlspaj7otm03d4u7mouiybw5pjtbfcjdur66cp509i3h35jyzad2oratblgeahi99y0jb9b2kddi90a203creq7jd4cl351z5ywdjkf4405qha04yskib0rpg2nu9x08106ur4mb7hs6iyj5i5ngrvp6icjgxdmj6mjwhl1tlfzhz4n11ua6omuznr7q',
                surname: 'ljtfhx0u5kyl65eskokujd88cdv0g4hh6vcksjcn6tdloe2y625cu0u6wfzm0rm2bgq48kdml4ksm0nuhv2btbtlsvlg3y4afv3g9b7n27bddqwr8t1g68mctvnrdqmlkcsex31cbuhuj73i893vnqr69c12penepdrgp8jzjvfjmorv8vywptixvs5d1z8uu3gtq9yntwtpekrc9k6xbkhcyn28a6779huv6hln81ewtsgq5pgnb2avdnou4zz',
                email: 'xc0d060jsd83v7g3fldr2ptm0r1mycn4m6y13n752kjecferqs0xxh37o4oqplhb2qjln5xd4311pr7wc827vygxgxh25fkvx3kczq2lnnav5kn9uqh22ip0',
                mobile: '7fmshsd04m1g362i89bqmv8o64msewpj9upix7wzbgvf7uhahti96h2pqg9h',
                area: 'bc7tbwmzxpvpn0b340qrq0lbjtmmppmw3hj9lirhxqcz3suky65lxvad6gsdfnlvwtg0bey0d84m6tfze4pi8tgixm7tm4nbz3f8ouqvmlaykvo1qpvs76wnq9dthmzk0cs6v0ooc3fk2wru1da9a3eb4r7dv7vftlmho0nziq54fdo1m056wcuiww2iwzs2xwrkxo0g03bhsc450cytnf8fkuf4ibgeoypbbe5wvwgjvgrdfq805iafnzqvpgz',
                
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'alk2k95onwaboz80qunax017s61iwciu49faaifuum2ulilx07',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'vtvcelhqvzxw5i5itjtp',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '1fwdwbsn9vandhklci18m9frq8ei15bf351xpdma8npcz23sx7tqirhcelkv1yqc0r5louain7g1r14duaufkq9uyh9eeb7lt4jrxix2d02zuaxpfpabzo8rjx3ofvpidqr170isy0bf8dwxdtx9qkdnkd3fm23uns5dxl76lngprzhlb4pp8h1fz8dy49a4gfevxiia8rt2pyqb78y8h0y5dihxqxdra9ulhw7ytcwgkbwileh2vtglrefq4u5',
                name: 'eo99wj3dwcrzx8dkp25fowbhv67871e3gwtdda8737lrepirksf9r1h7wzfuy4bzdqd27qlaw1v671bphklbaxe44as16639cjqs9kxz2oifsjgjy7u9qo9j9t0m5dau0tl8ymtwlex7pcqhygl6ruugk1f1rx4velm5fwoz0hu9ra6zih6mrfx29poe65iql8ydsua9md8l8gvaw42fj670xeuej1x3t3up5gfenmcaydhtn9rx5znbzqbg3oh',
                surname: 'midyi1hearox3yk28w3ji5ru83qda3mynwteeo6usfcx4hdade9a40try3164cboxxxft2m7hgj7l1esac97wi181lvvlh1trj90z5p3odf83tqqm15kf3im7k1edtevos9o8ixzdgu1g1f891ast2p7ova3j9rsn3di2tfwuiff4bmmahg0p8jl71s9ix3dk5z8z83zgfv5rvyjbiids6q807liuhbrc651g874kqxn3zo40pvtqr7m1xn5en9',
                email: '77vox18ua91yhzkmk05fdiq8ksli0f1gbzfm4rgpmem12h6gz8m8c7ix7o0jzy0hxiu1qdku09629jsiigjzsrrddl0te2tclt99x55qnib4jsmjvk2edunv',
                mobile: 'k0nlobwv2vd9300knwpe2ded64hpnj8th2yjyg6qqques4ka7ztik1qfvdcr',
                area: 'whqyj4njl796pda47k6nb36tpzisj49kes2fqkgxqyy6j69u1yumx1dc00xh16kfanpe4ja72e4kkoufzplqu7euahju35q5cv3b4xupn3ahq5mjsh2hhza57cdtxkp241r2cvi096b2rni0ps06rg8ky1gj5rzcfx57y3z6io059ngwaeibfpo2u9fkimzzoguu4t2r95fso0d8gli69zetnpqqx4r0h89qs699ctlsltcp8419hi0f5aidvo9',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'xfgt2muid7u237af0tip5241vqvpq4elrmnmctwh6frm6dpjgr',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'mro4mtxjsrl3jhqjbgnq',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '9b0r9i2v3bt8tqchrdtbr6m1lvgeo8ap5a3gp1zsy8uooxes5ql3rzmw9bruukkn2v91i01a2yz5tq7pqqcm93zhrywh47fpwvl2jznjpr6u2z40ez0cb55iqt0hcrw1bbneqs5wjf5b5bwcjg4w219661h2z0anwy7w9omlfiu17eripnfcu5i32dd5v2wnaq8ybuu62x41x8u6ujsztuzo2zs4d8xksvkq5uiwokj3ce7h8bd2ywz5gzq96cm',
                name: 'pndezbjjlrffrl656a5tikv9rkwbpp7ttjp0h8qgo63i8rfscn4xwn92l62zdich5z1sgr0yhpjta6kjjq5fitwcpze42edjzqq5np0xbmigm8n62m73rjeyd6ykdeecn9h0oroia01yy72urkirhmdvfx1wgjer1ljf2wu23injv26j3am5jfdi0x5rrz0t289wk41j52eyigvvpbz5jx6lxgxhx2n1l77aj4nzwflkc5w2x23hanhy98oed7w',
                surname: 'q6mxacaht7yweed9nj7v2i0tggtmimu8ywn25r1vj95rintmar2vvo7145dpcjldxrna5a8sbfhn2i6hodr3fiuzcla32gk52pwkd0m6s2kwq5hnlzuj1zudltvd6xc8doqoi9uxl86t9ybcnz46vhc8r291aonmmsbd6jh5wu9zfl7wi7mhp2hhv7wvpwz8yqez6oulbmracku13d7nyvey8p86axzzijeopsyomxeaklhg15w8otgguyueyo7',
                email: 'rywka8ohuurm4vzgw6iy4lra9xqculn99fn0z3shzir0dbuy819r2vezjirg8o030p7ut2mjkofeyuyr64pjawsed7phaj73bn9r14sv9vy8d2w93x25t4rm',
                mobile: 'xcgh623eztiojnrtu8ojqe7upupth5maoy3fet7vb4kxzo0wrz631ftan05c',
                area: 'j01dqjsalubjcymgbcl2tvt96cy2pgpzw5iad2ibxevt0a04cqwnuw594namda8sp3ju44gim9s8okeun2ywyjqq5wnh5q7o5ck6qqne7zsz0itu21k0a2hq0p8s2mls94f5rdz67mxg6m876tub882zsg63abgzr9w3a0rgihwh82ouazu39z3tepqa9c1j1mymog4o8x9daahxci0v0dcy1le8omm13pvapvu6vymgrsit9czfzrre5marto6',
                hasConsentEmail: false,
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'u4210nphfjuoqwhhxs4l3kohz8mzrr8mipkad31w177jw8idpg',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'z9bgkomxov8sm7bcpey5',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'djjumgg0v9zuoakxhukxw2i7q7momxr87vryleuvutlamrdaj0s2bej4g8j2k7cgx1c5g4zgc0upoia1plk82h9h0f8lvgrprt6vahsng7ujvbouao3sdsuwc5x2aj2vgukvpmhupwjdwh4qkp7wkw31wtn00hlp9ifglyvmfsfn9hpviqsyl3czgj0gy13sbi8p2i7pv07iuq6y5aq4z1wgqq4lcwb5cpvg1z49fyofdpibcxx07cf3z1930wg',
                name: '5p77bgdhglqdwqod7kkmnjigzoubtppu1av5nwank3q98fzslmkwinanzeyqmmxdk9plt2gsfz7fw7ldz84bf3hp0wmpnbje67nsd846cokv81e3covb674tjrqyzhqndxjs781kl4i094od6n7e399yr0gp8aelqawu4onid15noq78erc0t9o2e16gl5zp9o7uivxmq02m8rs0zc8dfa9rikh23glgr6lz83gdva3h4mcw69wl6g4rx6lcbpn',
                surname: 'kbvkdj0y2rbwvgyrw0cih2ssr7pclh7r92dogrc07t116mzfro7mruphu6xbhi5kowt2nzd4mkh7ydevqn205dzrv4pjl5k84peqsrqoyr9uvk5sd04ryazx1w07nf9yj0kq3qwq7vib1mqc20uqtcpjt55a1psdqpdp37b1j8wzietkn8vypoqyk2j8qbwqrci0otvzu280b1u6gynbersdsfdiqsktstfcc1xhqq6sxwo1ky9o3jv16bxyaw5',
                email: '2x18j04f8holl0yl2hz6ctvvj1mscax6rwi06fwsurq728khesue9kcfhxauhd83lut7z61i74he6ja9jtq5005vgkqvlg1nn77nn7y43rnp5vgnolerd5qa',
                mobile: '2lqbrlvj07of59e3aliapskjas5u67ty33j23p8w9nkxamhjh2a9j3o5vn67',
                area: '0aqqvj8o3vies66e896ijhlvn9trwewgroypvyvl7uyqouzu3mrkiu5nkmkwtarc9on5s0y03y41fhr0j2diuwar65mp0rrmf85cww8ybq8t0mz54cvsdn4jjo64iygqbfef8ly352ztixvx45aiphzx68mcseh6nr8g9gfrzczu5cuhixfi7wl7aiunvo6saatiog2ymsehw3vl61eo3iqtt99cautgyykt9b2ooofu8syco4mqof7tck5hyb4',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'sj3vgxutgphtg4thiqqvkss1nkccprfiwuejkfu9kogwp5ievl',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'ro25hb33dxyqqwj83x6g',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'x32wohvyj647lhkqhwsxy1ftj5z6fsqagjb4fzqibfsnezavuypztrofcw7tpczzgz3ah229g0bydcyew15i5kjnagy3qb41xs707nvqdhvfvxzq4gomb93mliz8onxyhz8gzgwf597x4w1wd76qohkk694pzxc6pg386wwsu4mxo80vnfv78s71r3vaferzppdh1fo6hvnwb1bsps9q60mdak3wgnnobon4h49wuod26fxupk5a5nb05j3dyji',
                name: '5bv1vyzfl8wnh8d1mmu6xk5wbssu5ho3dy5xfgy82xjseek2p0ry7wrw3o2f14p55cfjfhfngh0kmd16c3focggp19prytcb714vmjbdvq44lr9d2jmbgh7945izhddwfw7ybgnp55k93q2ruxd3kxordtthpy1mfugxxuy697je5m6dt1d505hzf89ggmjtsnxzecltds2hho7hbt2ipvu1bpsq8xy67pb15i6qdfnin5ty79kvkb45e656369',
                surname: '7uojfs8lg3kw2olca64nr4sgslrn7oljm54k97y63lhmfview62wplwmwmv7n55wd1wqjaf4ic9e5p3cacxip0n1hfin9u2zdzfyngc3sdcmarky88hvmxnn4uvp87gablwfmn5r1iyw61h66xmww5cggse2zli54sgfixmxbcobzctwnckzt9940ja3o1g751anbscbo0wpkwwvbc1r3ysi52dwucqvaysk110r8zcnqf5ym3hocb0nvivd6c3',
                email: 'oass5vy0q8yoc09vslhfh4u28pqd17g1nj22kb9qpyepyxn12m8tel5c5rk62lucaprdawdd4590n8uhdm7v0qboj6scxhapd9xcm0132htbm3xu2j9xc7la',
                mobile: 'rrcrfs5qf9zp6ivgs9ner9qucl9ws1ps6vnr8gp94k8vz8sjd12lgyibh0yi',
                area: 'gh3021101y0i0i1n6jyrr9v6bcbmx1104ng01ponitcnjxcgesyztze57680r9pccp7tk9dvas4qjnwkkdkurr3awsun5h7wxlps863t1hk729zupkhvo3ny6mbogn7r0ahwu50yvpiig21v1h14498ezvfbio97upyb090qsu8ryjuvxxggdeoxrt54w84j0mpuwb4vrjs9m6eh76lrvct8f6dta2p9sglnl9fxq90mni1z66epd44mn4ces7z',
                hasConsentEmail: false,
                hasConsentMobile: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '34p7nnivpquxddzukxxq9wzld0ve09aqq5uo4',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'khg88mvb58uut815fu8e2xpl9sdo34jahn0qpacc4gkpeo20iq',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'mvfmr0u26vvy2l88iie4',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 't76mbeb2w536nrjt2nl3iwbec75s5g63s1lop70cv9h375m5aoz3q3wpn2brz21lfrnwu49y9sz53skpbdivc0n1y2yhd96u58uchlzqpn7d4bqyvxrqnws1hgaz9igg2lzw353dyqtfvlwxyatf6osuxuchgssp57dugu1b1lcnz43antgszjpvnoputnh74xpge9yt5jilq5sa9mzq6igd10c58j8fijip7w5mniyhrmic2d9w4zrjectz52f',
                name: 'acvx88y9fbh7ai73yp9nqznohsuowbgqpl9rdvwg5rsz9dgrtfjm41pd1d786j489zn3kbs2r2tme7o079vp6snvgp0anifp640vmzre932eg6otcmti867tpmll20nats3lyk0orxzh0gp5775vydvw9a5cnj7qfl2u91lhcmdiw8cxog75x3tynrolleuxj0nporldx1qm8ky658yfiu8ul0ilq1i9dvsjrvuq5g09btyet5lpgvte0n5rfrq',
                surname: '9fuzwa63ubg0d2qhmym5a8e4hvm4e6kobza2vq0yaddfntt5o2rrge8c6p6ufi9cau9w3j20y0yryiohu4jd3gla083786p64gaolh59veg2348h7xbettlysbfz4xgck9yb06fzplw8tbfjonom3fk0k2u066j1q61h5pfrhetcodixngierlewtsyfwh45c4slny6geqrwwjvl16foafaikb9vaf7azs94qopsr7z5nqznnaq1lf1ve3iy9im',
                email: 'i1q8tysogh6gukqm1fz7gij1kr1g6uvxnw85om9tkiqgw25w5tur9sjpjz12s467kqm7v2s7dwfu1wpwo6gc1ke8mgz94jzpg3nj254aue3uqvz5jce21nq6',
                mobile: '9baj2mkf3i6fiisbq073a32bft3gdqgs52g7cyqdxb85iz6jl9f9ufygnakl',
                area: 'ky4va1v8awpkgkwkjls8bu1miwq7b5i17r2t28i9hw55ha3nt1gn59tfzi6oew4jo974wtnrt0xsxdqv4mcpvgwne9wsdwxtihud1fpjxef0ap8rg1t8aq7mj9lte9t3ilsbpehn2tshrub7ugtkwtlgztud3rrtxqdct5f6h41sdh9rir2dzaxef4ik25vjivwwmu9xucguq9zmt35sr6u95zduacmzc0awrfc21e9aci8satyyzeo5ukh1vld',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: 'fmxookf66e5rpv5c4xjp0zapjhl4erl64qpbm',
                tenantCode: 'nxzkqmxngg6uu6nxgpxg02hbegsu1wmnsv1g255qoz5fgmefdo',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: '0vi4i2om5dzcbqf33prb',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '20rw8taux1ua04in03sqiw0qy0n7zchknogrwckacb06ndrns9xaqtv6xezzvrhkfuo1hgt11cakeolt4q4wqdfcv7mc6d0cwp8d3gq7eckfp0lb68zskssuw9h48unxj5if9ynsdqqwm4hzs5cet1ffj3ypaw2nsup6bs977w98l200bnysz0pv8g7ut21d65prywv2e3hyrn1jbhf6vuvlacti3dniatxtkrvq7ra0nn156uskx9vfovfs7ar',
                name: 'r599m0mhy4c2a8wcgwjh0oal0n7dalyrwbxyfd4sod4zu0vudx6bn4tvujte16xa14yb1h53j3bjvpow6o2fl2tw727a5c0qgyurccpn16hqduiuhl72kj07edhbd5zfto22m7ztehobkmc7p8ph2bo0ic1hb65n1vcq10g0st0y73ty53xezzh6cu8eql8kmr21xxh4n2j26sf5awdvnm3yzdnfv45cce20gnmt2b8sk11y3rh1nwr02xhrd09',
                surname: 'i8qner1vf2bu8htcm15v5mx3azy31qkt3zuiunbxqgyi2fwe9htcqlt2c86zeo34ocxffh861nvpkkhcciiccep95xx7uqhygyebiru7zpemtcdkiqi9y7zpc8tivlpqmdbnb9tuz4vr8o5t3so37bebtvml3gvnhy30vsn7qxd74g8y5knxj5deuc1xyo4i1y812q3e9a8yugj4utrn7xxtbr1vvzuiufzxfk8roagzodpzncinikncieaxq2k',
                email: 'pzke4we7jxrgnkc43jecodnp8zu2pyelaj41jbh262yafi05vn2qoixjf4425z8qnar1ct5mytf8fe5tgvg2wvibomj7r9omuxnz86yg5u464120lf8h8img',
                mobile: '0r0hmpsfaxq77u5ivlyfjq0tfwpsw4fep65effnyimlc5fya43yray1y3ttq',
                area: 'xrjuzbmlxy7v39yzceilkeqt1sfn9jabw7hjuazuwgmj37t0xjyv9ffb3a0kslbo73pyr6n8cs3xb5r4zhmtkywmphdb4csa4om41ap8f7ptlb8v64w2hjfzvgs8cqjdbzj80ebqtar9a06etnov57j7pm7b8jnrh5s7b81st8dk3sczinhwoj0dsg3da5pgkldedr3fvltg473o5e0uz46mm4p7agbvoy1t0jsbjm8calzvcb217cba2aw5rdy',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'z5saiul4g73ftt4v9s3xy0ht3xoekf7hsz896wuhb6kx56x3xs',
                systemId: '95wjeatphoxk83ni3oj0v9r9eiag86bvlukm8',
                systemName: 'k05717th1zx2b3fq02iv',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 's0hqac86opd3p33x9ply4gxmfs94zc4xohcnqdkp0470mqxx35pghbc474a9hl4f02neu7qvji4ldb1i4fuv0v6m0rbas7jmknjvk9ft01a1uvy3sb4w63d73hd9eqthz0r2jfm8tpf4ulrnb2ctcwj2c5qxhf0i9vuzdgzdiin2bwdpyrlqexc6yr6apm3gvmps6ut070tvyj01hq3b0aolehcn9wuu8chbpzumbwfkhvn7i0faqrgql8zvkr9',
                name: '7g04w6dszae2x14lztfvmm0v85317z8f64a2xmxsal22ibl3x1flti93kfaxrt3udl2439j5mvfvficiigw1pgaweos0r40isk7vaed9rnkbj7k6yyx4dn9kfvjgecv4sd0wk2zkwvxd6s2be8sddnk0pu4u5pfg2bmuabtj0ll9axi6tgvasmd3u8txhurzfp0koafwp8npx9jgtcy34tsk9ua97ft8qos2ppx23itnxju9eeij2xi496yyry0',
                surname: 'bm0lw08gmqhzatooh15os6iwit5rlsk31grddgp9iyko86d7ysxo66dl8eu1y1p26sxrdx8cqtmdi07jb4vz2x5rw24uu142rl7yulu5i5jq7b7ng029r5w07k003pzp3q3ook1bgvhsou1ju9iw5b97ekajkpmtzi7p1i2vd54qlih7ve0vas9fdqm9klc74jwkhqrr9d0a7imz6p3b6rwdm9szxsuaxti2z2x6n2wmgxb78skeh2sczll9v5f',
                email: 'il3p5755dmmy1rszp1d4zchm1xgh3qnamtp1d5bvm19i2r6kbdfs1dkhsfte21xl01pco7qqtixdxstl838lnb7xcpqkl8al9by730oxrxjpoz22xs4beoxf',
                mobile: '17ooxkqgqmharqkrbatk9mi7xulrgijekf1ncosmnrntxpne86dpg99zwx63',
                area: 'hyh7538q3y3lumdjumicsuraydu9zs8mzqbf8ev6fzncre9qdme2r4xuv6ayibeizf2w8aujj7c8wgqa0d1p6t67pnvl80r9zybci40befqfwfvsryg8t6u0ct1uhu41p0n8qkg6e6l0ial7krzoxkc7zo5bdfoc4qou9ljy70x5xn3yna2qcpyhsdoepr7ofhp5oa7my70nfszive10lnihcg53r38paem8x6nwz1lfx63q1it85g5wpjijka8',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'hd0gi15rjwpb09mvq0a2lrijf4mru303g1cm45e12dgwf3ofcf',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: '8mb1ewpjx00tqh147oj0',
                roleId: 'fdf5ewrs9fer8wg33t12stzwda61t3nolwois',
                roleName: 'p270lyvlmhc4ovhkh3hyl8kdkbqomey547b4yheffr1f92y4amzad5skzr3s010z6g96r3jc4e512qppmw5zlyg1t550zhskwjhl1u0b58ttx677xs3qag2qsr9w7y9gks2kfnwx8gow5u26x6xgv88kubq6o4ensi0hlupbxrc522lel486ooqn4mmxhtyhk8qu1xm3ddjmcedt3xff1je4qfylwasxyxk9t41aqyq74f36tf8d4sdt2mo4yqm',
                name: 'f55d07pgt0pyoq8hx355tnm09r86k59pzsmx8677hwsavo5sm67at2u1a6lrweyqka8y93opsdgyfqxyuq8ex8pbdcjit8g8ozt1pyv1v3p2mhxzsqdxs6ca43ry2pv3dwrsamjl081vf3a6aqllx2oxk6ovspuzlpt8tsxelhlorej68g89m6gpaioqalnodx89eesn0pu566zdp7ya6l9zeraaytweau4w3won02v4tsxzpcizth48hl6qu5e',
                surname: 'wfh6j3kvvvhbus3bnhn2rezg4sx9bia6x72rramww4ju29nodspiruj8r3tvh3uujfp93brm0dkgmrc4u0i4pn1iv2q98ww0zs75mik84vc50oxfozy90dey2rqir4jxshltyhuhnk1vkfwj1ljmnzf50vbh80qyok7frehb5rnbkuf1ifayi8b4abtsrzj5vcij5zjv6grgxrfeuc04amljaddbcg4qkqi15zj3rpqbyk1g8tz3psat8v4jzji',
                email: 'z0dj34pmqinexoc4yfuumpab53vyc3r4rbegnnjvf96655112e20y6nonr6arscov5fl3960734cagfgvnjg0ref6nkpc49eq3z7mc4p0riomjv2crx03g7e',
                mobile: 'yhljz6qzr7k3v35usn1lpal0nd0bj3hvqn1krxbow7cjrull3wjglegz86s1',
                area: 'smjwesn3n4uxr2k5p9yr9epl4s2mpg570pbycvreotcg5eejude62e9mmw1rz210ha4img9ry3pu7agflz5k89aipzs66wwgzd90nwturiyv8dsu7757gm8d8wb3xk95vh1bf3gb6e45ga8zaywxgpxxv1ctg16uzks8uuc0lvy771cfve5ztb87yqvsp6y6qjmkvd1qoz1na2vhp5dagxbl7z3y85f3w1qjw0zbbrxoerih1gk05b7ydq50k9q',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'y27ihz8u4kmhit5y1xqlvhmxt7yi11nv63p82tdxtxaheqcfoir',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'b8ai70cxu52h5xa15f6b',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '7jd58pyn08x8wf5fwsp7jp1rri5105v870l3toxk847245l0nbiroozk39x2g7zf87tyty6bppoi0wj6sl2zbaxikfe1fh9dhcyok710llk7dguwkcr6f4eyrzzjl9xk68x5fohvyatqakeg3p7o2u1wvnjh7adstwhewebekl7krpc4hiru3cnm1f5msnhrucmpeh83gn6c6go56erxr74l74q86tknaroyeo2sj95jjueyo2q0im5jl45vory',
                name: '15en8f7u7ay2gk6wyn22ojza1t2sferjc782pa96oxc37d4q2t72nfosst9w2gvzbi84h77ko8479ylj8d4iap7r4xh69qrpm2437o8te0arbnrbrs5wtqqavcomszyikn4fu7ol0nsqiioggrs3ibq6bvgsuijkmulplkyzni7ikcxnmi2d1zfyro2ue2wy6kgtzv0lplsmc14s9gvmcfn9z78akooxegkcp4xx0c4g5jb9a5ju2gr1j9u6mku',
                surname: 'uerslyv8lokdkz7ce5sw1lv2hdfvqh857rawoqpou1nl8so37yk6oy7njxk332go0vr4bje00gwi2venmeawaawk70mrv2ef53numrz5gtp7cz6ro9vpsoqdijpswjqr40b391y4lbdmswzlgdeshmq5ldqwf2ac3j2zi3ikd8idl54ywehnuo4ju9ir31oekp9jy1zrp0o8u8dxwis5vtscdkl2acmg90w4y4i9zigmghd7h6wvravn331jb3p',
                email: 'cph0dh7i2pqfyvpjs24tet03wooh364gxgyx8ebvuwxw1fosle59gauuskc53jw9vmd17eooq8q513jgn9yom7e03e1m7aprwmo60nf7fkqdef8eczegbsrn',
                mobile: 'xgqt078x14h7uk7rceqgulv3bez5a0f9u0j23znc1vyllzjrv0tnt0sj25bk',
                area: 'btny0w9vcsk8gt2nfzuizrh0hqru8lnh34cpeps260copzey509ssk6q07alnnavvf8tpywy8t2owa1rlkaveqqe7k9dplsyp2xhem9etdovvv2up2b0i4w0se3yoc7ny197td3cbenzo9gxvq6aibsx1yoplgcplzgfym23a04c95ekhb9pq3gjutse2lakurab16pejkupp2hdrnoqeyvwki340kq7514d6aor1gqvkj44w99vaovnzoi477f',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'edb2t6dydriwiy0vcs0x7r4qmbk8yi1rxhjmnu3ii0v1vd5b9m',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'h85ea5k4wuzw4p0ttfasg',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'mr083eoctyusvv2tqqiofrtaeo8lzc44luo0ooumn9w68y5znv47a3wtvt21g0ey01rlw5s60q3p1nke3z5wb53lv5ix6qpg8c5kh6h89z7aw08p3fmp2qr68vhx41iobnqaiufzhaztsxtu75628vtt36sz9akjpmzkv4xvwhfdljqxu9jylke6twgk83gay9tvzi6kzgmvxsin0qiuhf4tn7db4o7xqjkmgiu7r2i9fdmpo1ng4a5whflub0b',
                name: 'gz6f4ea8ig3uodsswbop9ex8dt4yxs0c1iyc2zhflt62oo2kgezyzo6gtprqgeddvlcqdbjliv2rjoh9s2ls4llurkldxz0m7t8bo674zane30j6e1x20rc3dcg6d5qmhtznqw8junk4v3nk28gfdrk7tt71tv10qx7iahz2h6n3u9l2nh9rskenb7tqkm2nmpjoef6fzrk9tgz2li5y5n8nroy666m60j04h3vvsfcp2wci7xx1r45dx9e8ot1',
                surname: 's7sm4ienui8s17kf5wrpt2gxpmfaezvqg6bx58fe8p2ca6kra0ymftwh9tu6jnjc7n4p3r26sohl29we16av6odjrldomhssw041tvyaqipf0bv5qha6mnw6b8j65k6nlkqxvr72g6zm5pgqe68by5sx0bsmiruww198ti4ro7j66xolaxcm01i5f0es42nxdf2ewejkewpqofqduk8rb2l5bc6uc6z0pxz51slsmj9h3sjtacr8d5isgq2p3fx',
                email: 'pamv9mqxumbf3xaihmxjx4rmf4cqrz626jgqp84f96imy0tvahuatafj1e9q4tlym0hwwvzhr6tsq0eozf43iff8zmxvqz5ewgubt9dp2n60ozpfx76alaim',
                mobile: 'g244jkg2vewiecxs0e1nd8uqzanavncl1kwjc8qaq9l3kzouub63nukmppqt',
                area: 'u2gjfcxms8wzetnm4xiec8is2jnmsufumnny9fok5h8j620xovcscc4rq1fqxmyer8k9a6k35z9rgm2fuamanjrk6ktae9rcuiaajb83lng15cugj56fl4zjsb0jb3wa94dvxgcoo5tfstwsrcgosz3a0eqvi30xp03n46b1obmzovdazoiwavzp17gq8i8dpgxw5hkq8hft90k1cgaisr1hz1eyh1zubabr0ygjodrzzzm6ziugr5vsqkt0amr',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: '3esb2ds4jc97eols69ffzqcabe0e0rx6ka27bf0liotuna4zjh',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'q2oo7sxexfb9wzqbqwom',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'zdrglw3udm9rmfzvafcmz48obbhn83zh8mfxq0wvfmrjh9jo8fjostkn0vkapnh8pygaf0mcsnx6zq9zlxt4qxf0fbkwklkck7vph6401ggxu8qles0grnxiby5ip3v40xqwvdd1tlqg4a9brqktpz1d8nlumnzvs3fhjr92moyi4qsjqc1zctxrfyn5vbdqns6qwsvish7svhxfvj6381irnn0c3oqn48pvjdlspacm5473gxaalf3b5d02oupd',
                name: 'q2q9wwyt6tawl2gib3evmjxqib3ny1aoah7tsiesr6udxgaeo8b9cp1pdacz7u7ido5nleowr7yjonh4tidfjs1tnfjblfby3ukgqw4r172naebs3lycck93t8ggi7izscs9y3u7kkks5gsh4r23ik0r3xoljp7ckz8zmkoeyeemckxva5cef5469484evko9lwaiee5j0nyzzdsuiwkaqe16b3ugib8dc8279mq4h1sbyoifm6s7hhgbp91jlb',
                surname: '7it5au2sbqwj0wa7hezu6q8g6j13u19z2c1yx0c0bd6nsbxbpiejazfj9ryoxs4ttpnca81x6myhgop0cedckyeppemvmws4bg1nd1m6us069salpkg3lpqamgh1w6p9byz1xpjhc3ude7ijbh9kfl5zwmc4naappsgxmkgzj8kvtt8odfd5k9j0ocy299ka2sejiffj7hvbeap0xwzucmxbnjj189wnq7fskmozmw5utpomaa28sawtdu6hh6f',
                email: 'tgoeopeb0kzqg9esgfss75qwpql2hax7mvmwtl41diz8zl0nq1yozpaaf2a28ud14oyfcg520ylpebo9htol4j8jgx3ocwju72cmnwzpt6yifw7xm7wemaeb',
                mobile: 'w3u6fgdd2318vev4cn4snft112p045q7um442vwbqxcfkiped6qkuf9an2vv',
                area: 'spzp17ad9gvpe654kxogn5etahu03phyg0pogy1j3ir838d35riy0cq6l9vn6xuz7amw4qr91nt7tesm6d421ae5pbaedmk41p8s0l792auvu5elr7dten2jjou2bl99xd5247put2rcnyhk89dqzkr399ey2lr0rn2geshnm4dd45dg2fdxwwvrmjepllyz06u6li53bbuwd8odq5hti0uc1mxiax6hewuqbfp5kj19xok3tc8ugs0ld7azvov',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'gvz4etni4rprxi170y9sp3gyz0xaf7y6v9kfbmkclfc0138qlv',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: '3rz8h5jdq4me5gaakufn',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'rbu0inaowdynkazou4r02hl48wsnvo8yht04wfve7gz0v8bu8eai3l7nic2gx50s4jlq1uq2zbsb7dyxlpze4vfsli22axrbd7q82wzxecspaihgnf306a6bldo0868dptx7oh2cxfww99p7qff7vtf6zdj7m4bcarlsyp1yoeavspq1cfd1f4dmvbjsyk303wlzrfugusvkxoroydeddxddn1q3mt1nb1ledlhg6lkeyb33dybxofql5pguxke',
                name: 'yce3o7e0icy61x9svxqblqgnr3uiyfws6s2o9ryqykvnnpcys71ck0nfirrdzzxw2gvzpj4t99p0u9swfl4c2k1cn5gdt3jabwzuuqiay3ry250whocqnt36pj2qrs5r8fi62crqvapto32qr7uetufs11mitogl4flzl5rdl0itg3f5279q2ndurpg1pg0jp6h6mqjzzlbmwl39an2ftt3omf6qvkh3n9kc1op4jv5e41hj037zcxqtmq6rsbx0',
                surname: 'qjcbq8e6dgl35dt9v3d6s51d36gqug5e36w3v19e310bbgaa9lgow4nh27qnw2fogohhqn4h3nwk72vydz0hk2een23b5s9s6dvozb7jmdsnjdqadtmg9apo5k9ra1ivefr5wgses14nswuz0726iecqo76h3kfsoz7yls9zyfemd5l6o1vtakint3418s5fn7fzpp5zom2apt45qz5oavlne86lz7nm48k36rxgzzfq5j7o0d4959ry6yfkprd',
                email: '684zevhzblflrcapftjdo0j7wulmy18dagqeygynptigt2c3ocowkx76vvhztnbpsckpohezzpo0qgopce1vy2aim9mok2aw62hpidhrz0qn0gdg9tlwhb0m',
                mobile: '5l6dyqr4c0xgulm56oslcrohnytke6sta2z6bcfj3y40fp0ndmgcfs0mluho',
                area: '2fxt6dpcnwdw4etq5gj66edct6zvyrr5h7ta855q9fovqgu63qzcm1fvb9akolnbzmn2y7wy9xr2phv93a2xf60bfv6a562d5279t64jbo3pcxo6uxg4kok6c20n8r5lz39z16oacwmcj0t8pjj0cil34ua3cxo5igl2tgdhzqt87c3d61l1z2qla2rwy8f8os53m07qxqy94dotvf0k3woi6quvi4j4crjts7ttsm01lhtqtlvyufko4tcr0i3',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'lkamkpb4s9wgst4dv8tukzjybwyrmcnsc0tsp9ifzghf2yezaz',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'wgouktvkqw2k3k33rqq1',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'r30njb5ykyyzuj0gi1jdq1we4u7ryqind0omiytm95f0jwkkgggxhybdhu8zi870vg3dk556xe0gco0jqbfcr45q41immkubx2uvnnurn8yblxeepuloobymzu8onjuhava260ao9eg1y4zysh6s2hxg6tsam45206ue6pqj1ki9ecbqpts0h8x87mii7tiy5zbwsjdv0ikg5lz38680tsfrk48tc02ptcqb2wce1hgnf6plv6hz8boynqlptm9',
                name: 'u3apdjm0c44f9xy5mnk515udpa3tlwv9ln8ugboiptpf11erhwoj27c1h5ngjr4gkcbxoat5bg1idf3ac572l9mqxg0uc4xrps6d4wr9gni8qdvuv9u20zg0ez9xu6bumletfthiuis58bmh5yfxrejcf0m06f3wzb84785o87acn2283sjhz5n2bh3xbl5t4273chmpfusuyc8ft7le0sjqrgwcm9yzcwsk1ykhuj0hsw7zaleeylcbe4k236d',
                surname: 'r60zxxsevmvw021rn3yrwcdndhml8m2u600yq8he9vaqzgfgnxr2ch948vviraz8ax85u2mhmi7oy5hendcyi85sg0hoj4vot6q2lxwlfrliuo7yprfi7siweoz9wj243sub28r954etib5desbv49oy8pasisnvvfv9ngs5an6kmc588kv7ebp7ncib8nst3d2nirhcj30ky3wlotu1k7k5sbhqya0k335c3qvov2bwf59htxbjqbgwry00ph3d',
                email: '5kn8w64rv01dq8s9cj6oqa953s0brhclq0q50n2rrdfz70xt5xk9gyfwadw4g9a1pnh46a4p7ty3ftqdygpf3ofankntp6ryid08wdaa7hsoo8zuollhsq2z',
                mobile: 'bu9t6e4o30nk3ky0yhcjev8qsdxxizxf30anwo3rs5el9fegj286c08m2nei',
                area: 'svna2p0y0gshg0l0i3kwo7pdxvdyni3lf8ut2ekdvm3qm7ivwpbh7jbi5h8vfzybrmqk0e2i0zip5j49b4abav3a7osaiedwocqorrwjlzgnios0ml0ix4ekbpwsn0l8eqgaa072uz3mb04njs3glu79qz4jlg1mejhfckomwsdyp3okye7ik25kfc3h6uaoomlcli1gv80xkchaws9m5oq3apq9pjo32sryoiw8w48yng5gohr54a8f0yjpj2y',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'z79s2dv68xx2600y8amf2rfekqxejq5ky04uci4k82g7xpbjzi',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'qt0pgxahoxjru7c1pkb3',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'kf4035xiu0myvrxabiedj7t48nrqk7vmhkt25y3njsts50rv9lenef14uk9ndsji8bosw286frb07s1mm52c6p0mkad8myd7q59xg4d4c8winev8cmizlyzkkkxnvpsxtlgb20kej6o1c7x0rtsi0d2rgt90al6kgdakyk3okg4ozfanbjh2yv8rto3thv9u1j4pzys9tyhdy1zkjaw810es25mtn5b8xpz3lk6r7dnwlj5vclvuo48qishx96h',
                name: 'fqauua58kewcs5jzuy2h5tff2s3akbui1q7no7xquyqs116wnwd0im42dsewy0vm4oepomszok3m6kyxkk0k2rqf0if0u7odkng1zu8cdb3u6ndxqn0lm2bai73wwxmj01vefl470e5rimt2kr7jgs774dhqxzajel8qzh34rk3op2co782ejfbt8bkqwivfeaivlqdg48jk94a9q4qsnbizh3qom7vujezbtvs0yhrb9ola0sa1fpdjjv0aeft',
                surname: 'qacc4mjxv36o1a4el1j8cyrfc9ivtm922audzs1a25kqioip48sr6hesli9uedend71tjvbnb489w86b5ksivvoi85c2h4p9vy8d5lpth4pikj313g8cufpp91d5ahsye6nk9jk02nmwi86lpoy6sr0bspht8y9v1wvovx1xr8r53yoa23pi59eyp1s525s1iq27kinr0bjpxlgiq9qh0k9cpu6zlg0dglhjrnrx0m3os7400rbj2lx2mrnwvbs',
                email: '2x8uyn39hj1jet3eaerlejffvhmnb0lbplvvubws5um1qy58fm4cmshw4nvcru5h4ks9242r2w6npqkgi9ur33jeabj3nazg4za6wb1p40vx8omq5gs2oev1g',
                mobile: 't5shc0295561u8o2679v2eai7cs0fpboic1lujfi6qg557539dowu8l29ysq',
                area: 'kruu4y45sqaiv2byz6xe9d5rvj9n9a7jtqh0eh84t78jr6x842qi4yuqixe9xxde2h9vek2kamog3gguum3odbhuv93w8aozgaz8jxjzrvbxg0kmx8lgbujeqfcqc6nr9b13d2xtt1g2j32i5izun0wrzraam0cewb08ddswhfzeum7f66vfqut9afyp9jtjcgt6ednz49utknhlzxkl89247kms5qtsyidck5uj263j4kca7fwx1tqvnjddq80',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'iu4q6svevf5lcookc0ahjrmqqpwocaw6zy1unix9h8zb6bewxa',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: '1te9s6ly4uglrrc6ufed',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '1sjl50zz4qmhrgbfc2h6qti3s1euyylcxw0o6pbhdm6jd24vnt0ua0kb24wjww6ie3u4kz51e1q1ucrj0wqr02f5dr2bb1l1ca3d1sr4z3fz6l43uabl6xuh0rwm3hn2u9w6kix2h4wfnl279bfhjnb849n1zol4nspytn0jna7303lsao7hu41b10lo9pb2zep30yv80ofl7ugw9mbf25vwvm84qvg0sw6fd3in9vsv9ess9vs0ydwlmhokcch',
                name: 'u1v336mpv7he6hqy2d4l9xnsmwhe3i4l2l9j1nuq0q43zqdyrvrq3sne1kvz31wd2d6atm5zn8n2kfl76byq3cdh8mw4tml5iz2hq7tny7hbhsz9n0fg0s2aebspoogfcw27cg0yv8t2fm3u7dwpdiaabqhngj36hsmx4k6xqlnj15bl4k5dytaurt5v5x8yy5ve261eq929q7ye0rixbaj55mkten5clgc18k78562amf8nephlm9jq4qf3ds3',
                surname: '34pzvk1e78ckmf22j5e6rvrz8b4gjfali7ty4r2vm7qldovlwju5zustih29e1bdyut5spdiqrbjy6iwr97jj8cl3zn1tq3hg3p9tbhx6dw39tc8c2vkzcdnkcz4hztqtojx98ypzch77rfw6hru4hwv4xunvllrfth1afuyvozy9n79gj9645ekblozzqzxpv013ttwo2ya96mercwmugeh5rytj0z8idnkhqd4fjndpy4vjgyyv19zs1fieqg',
                email: 'yb4jca09j3by2qmwirnuxdw6hh556zlojjp8t4ow97mjf45rrf7cg1amhixehamzhugdp3o0j0ji1iaydim7ze9gkx7dl6du0wuw78xt7fbvptgv08vbfhi4',
                mobile: '5f17y6vkiscoao09pydvku4gh1ez6b3kxxmeet9fsy1mqi3hwdzdpkd9vpuc6',
                area: '2f0ab9sja4x05t9km16zhdlhbzqugrag5l3cg50xj8jkah1m8997ecln3cod0lduxacdzclika0fged1lh3ynnh6r0rxjehsbeqtje94zio9qlobvow9f14tm3uycyj8a7d04vo0kbavo8crr4pszu8k72yqcx9m4n6mweh9rf7sb6l3pqk16fmfuln0d5ql3pmcdoa7dx9k0ierd9ua59pm7kehsy3k6don7clyiommg4qv9pzcvycck75181r',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: '88mu9e9lvckihby7awqwpejzp5ruy49j2avesi6btyuahktdsd',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'alisd3l93g8yq1jvnuno',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'iz70mqlibq67y0oobe9qke3q12xlbtihhmc22d2vc2vj4mq8m44rxxzwl6bwoqb04vkk564mc6ylps59nqylve6bsm9lqv13sh4h5bqrbdwxo63xsqqsjitv05o1hd66nt52vy94vrwm6af6qq5kbn3x07ufaq5gb7npg5d315cu2w886x83fdbcc37b9n7asho2ds0anaspzkxzufneghqepdvu41k6b5rx68hka25otgu0x3z0whxzgklrbxu',
                name: 'hyc05i3wigi0xv431isou5plpfg1dk7ytquzuem99f8w5x4acwa55tbc37n4xku9yqyt2ozvw8gf5yv0j51jv2tle258jbu5dygzqxksldw27fq60z55qj6qqlvy4aitkib912kedi44h3rxn8qxdkcwuetrwe975ykhlj1e2xpnw8vbrazh5tjao9697flsfjj9j7sxxvgbe6fusthb3inihv6yfan9tgtrkkte6hz3ktksgtsrlfqck6o1l7s',
                surname: 'p78jrpxt1d0aqh8q1ji1yejjce8e8vjsq1wsg430zdxhp5xe0uhkowdwpnhakyfjfkugaux0afgdlxu2sj1euzbxy99ju4cf9wa3c2fr5hm7jbc28t3kk15q35tmmv0rixyj1ebyclwqvkco1rxvdzczk2z1rp8dj6y2xqfuayu61zshcd5bexxa8z4gz2ks41ulturp0z76godjly8vscfjk3usq9k4i1ypsirlp6e8c8f6d4i40h4lyew340d',
                email: '6i4km83lm8kde28u1qbwg9drk346wi84xy11pppfc87wpdh2x9drxipzs3f2gpqroql3du5cdb4u308sz16ny06apvh2h5jaj5n7ko6j0yqzfhmcqg3h4dvm',
                mobile: 'c8qqkehu84yv35oli66snv40adiq8qi23xxzru0hji1an59sw3af2mbx4kk9',
                area: 'fg3y47276w7w6cwx3pyavdjhdzzef1su1lqwqsqcbsiwoa7qpn8cqrmc8hgelfzknq417doa3c8cl61ptytf0owzpas9wkk9bxm2ndwx7htz2edahefj57cvf9fgoirk4uwr7i2a2a2s39x1xaswz1gdrgw1hghxwtlulnc6hcqnud6hoin250xa4uc0kkfzdotn6rc4u858nawun75dgb80j72uvl42kmbmyohf7zi2nlsioi7ub3wqgm0hbkgx',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'qr4p6y5inyfzlc2kc28nxnjf5cq8psrsv0agdt7420zeb6jsu4',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: '8p5i114mnb3ah6f9sfr4',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'k8ani96ppw1v65q27b1m8md1y6vivxnwzbw3biv6pqkgs789qxqr4u1w547tng2xb3oi7bcfs5lp5d1mvytllrh1z0kfz8aaxiqxxp6lflle9itd5uf905le8dzie27yyt3bqk9kd40d4la7wbx1yvczaf6w5rlhghj3wnyhw8rits6ag83aqp9yxyqzelhy4ceqn87ib6dhljmad7mpg99cxvkmpt5bj6qckruki752r169h0yiyg6j31huxig',
                name: 'loiuaz2lki6n0oib8amyqjocg62o1ir9od3zb5856bsxjhwukd5gcb1vu3r7c3e9vc983ofmr7ot3yte2d4qlpe49xhp71fxeimo2qef18oinrcj4bteebi1ilgdwxq8i21x3vexb54bzrzt94aqqtjmdau7f2fsf1brnncmg8lrbowlnpfp3exal71g33amsih5d11or3yhpz7mzn2im4b25zwa718jz7xib962yqshwjml140y2fldmpwiejn',
                surname: 'hys9hcr6hlunbzr6s3s9ihx1y2b2kk10qy69cim19msc7xq54qi87g36zn6k3seg6ju6p690w6bqcffdf7f2shijts0xhf8h8ly59byw2i37atuu4rtw9jmg4mh2cgkzizv2pzkp46s5qoqnxq8kqx1zh6cl62wf6ljl0xux2mgbuv08jwm3ie2hiaufen0dq7dvxcqmbezq94ym4jtv0izu0zpnuqm8y3qs1uh44mj2hi2xud09u8vr78d9vum',
                email: 'shaboeox2dro7i21c5gu4o45cuux0doud4fhqhn8y2j76r2quxekr29h5pzrjiuxyfxk8ppdrtt8vy2sp5uauxntvicukig6ukjjqyhbdd8d950dfwgu9u5o',
                mobile: 'qku6r1ecb3xjqey92dfe8zscxipr09wc6j1ibbm5mqths0929jmgfeslqlvw',
                area: 'pepyoeueleq3vt2g36sbf7dn1ws23lerh5xdu53eq7a2wzspe8wbs1hy6vv7e4zkx56qilyzc7p3m6hc7itvdoh5axac0hq3ud803nifvali8nr7hy05u2xztq2g954cz47tv5qasgdz2vlkb2v1ps1enwtd0x1dgkyatfjk2v7x0eqes38l4w6b5hruukqfmgxk2yjoasbf9kryycdhnf013q1mo40wc08qj15el5qatezs3845pzo5xkf3hlq',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: '8z4qc0auye1ri0d3n86zw8illijc6pcaosb06zaxjn9zvbrvd5',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'bncex9nhysbhwmm20c9u',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'qyjp77ck2qwfuo93w37vflt9vwcefs700kw50p1xez507k31isxkvy29l1lxmbgk2viu6og9sysqdk8e2dyej2vwfwrlhzw7i4fmtl1c6mxz3cgtnvlc29kp7i3lo6bfd2ub79xbj4hr291k5q66j1ooudjqjqnjt6kom7ff6fihmttv8i44cubq6y6537pa2pdse0oq989ghta5imaci22o0cv9xnxnhs20pl2055knxom9dcapotr8re66los',
                name: 'xzh2605lvb8txpl8vghzjono4gj8d6f3y4zt9qejwlc65ji7mj1i65eczcc9iia7kr21z0tkw02qki88x4jn0rpklojfi0p66nghagm18ki2lj6aargsr452zqsm54yg0vyt0bnj8ro5izkm1zteowpxfp1qo0b7dqqfu7u6i2oj0q0zhszvfvbqbgk71m2lm8qqw5mhv55upm5wo9gddio55okj1eje2cppxpjhq0kskp3jn73mqac4qbwh0po',
                surname: 'zx89ky4kxy711pnajchk1od2zfu3102bd4r3axp8yux4id3n1bdn6g1vs9if31cufef2t969dzidt3soi3p1vqe6jddm18sbg6ju9s6sm6jw5r5w8krhwrsdc652sk7c04zqa5syugewuazoufbz6dt5tqtig3w7bbpjcikthfbgcu4pdf7svuzfx1jtac29z276rhpl24isk14u46w84a98wxrkcn8rlx1pg4s0rf8hrwb8otmnl95we4ui7k7',
                email: '5mbxc6xg3seml1w2pjwf4hcwtz69xqotrem9ki85mzan1tem3pv6er3dqile1mpewbda753w7yc0m4129826ihmetiglfdd1shpf7a3xtldwl3jupvvdxhf5',
                mobile: 'o24vd59fnftpyq7hz3jxtmfs2qvox5vjgf4fqulux0d46t7sijjq42tjqr2c',
                area: 'up5nqfl5v8ld69sdhvecixkr7q7nbaqoo19ayrdeo1wrgy622lbbk04afkomxjbbz2j43b4blq7woa0mbsxw42iolr42lzcm1rsmo2sdydffpinfornzqid39ug95opki5rpcm2i1qv2l5v6p3wo3vqzr2hf0yu8z1zx15wqarv6r4ma12ptsn1bo6bf5fajxfmvygr6geehq5rw0n6lhjzcvl3ai15tth4uveezqargga3yoon0vc67qmuke6x',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'eoxq1z07u8mc19s3etzi3lhqao9cpfzgd01nxxb1sdw2os6p9s',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'rlakvrhkf1iwmuz681ms',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'z6qzdqhfmqjv4dt2ivmk3nde24o83yb775czfjerz1xn9tmdgxgskp6i5sidj5xhdifvvthitunozxepa6llh58ob7qud2nkzghpxwoxi5kd4zf17d085e2nqfygohcwiv84m7hz89iuqsrtn95jsczy0lh6rne2rtxocybz5afmdtykvfwjcfceulbr9zirnhd70b650i0r47jpnwn43mnbdcmbwgzn7k9hpvot0p3yebinv11qf4phgmu90wr',
                name: '8dfk89iri085gahuqc4p8lbds9nxb0n9ea8mmucom3m6xnkue5zoumfxdzquh8m4eoedd8udy6htt1mcez56j3qderqq34jgooictv3cmqmtv9fxiiy5erj3w19qyz2g6i4ld9jdbm5hkiwiywb6s5tc0i32o29b0bpd3gy4jd09r5hxkmb4oprm7tdemhb4medugw8filmqu5782tmddtz83og3kkimkwnrcrhiwz83b0qeigd0nt8abyjeqeb',
                surname: 'exj9p06s4ups5yiccwp6xfyowgpz3wur7ju5zt21h2wmgbpsa4npv8c529d3ufansrxrmmub5y27seidccghjrkh4whmv6rl25kyriqg36q1r57i6fu707honxwh0f6vwknywvufywccdgga1ulvpqcdybxkkougallgfd1wswvwhoxdoboa80n6xvut2g0vr8tt3ub2cwtjpti6q4vrnvqr279zes8it0fq5uzoh7o22ssw0f103d29ajj2wbr',
                email: 'u4v0s022e7fn1phsxnbet8vmi5oc4vglxen9jdp5edh91mcmhtmnmgvdbzv9583t1jue5g4s2krayi739d1zbxxpbd5zauqwhjqr1xow4uca6po8gtp184ej',
                mobile: 'f2gh9fq290xi2ajcthshwf7f9f3ag9qvqx5dnkiq1tyfeqqt69i8xv4ql31l',
                area: 'gle9h3y0lalaez6uop02rahs8p4fc9xfk3zcznro04othqdd6n26fpejv4ynwij2xuteboywntqrua53ltesfledzbeibguvrlj7h4wdxwdxqvg1yas7e5x9hxwvjuhhq650lhw8autenvwgf86seb31l9oxb89fdhfpdrdmuqubziyu2hv7c82k8cpnoh693camc5rgpaawwnybv31jbtmxoo7y1dz9erxh1r2y1serkhkms10wlsyergng63w',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'sh23nzq08ogtecnn7z2ipuvegwehr9gggcqt8q4w9pc9rp1y10',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: 'fqld7odgyhnif4xg536n',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: '8gcip8gooe0b9k6y5mbj2xka21i6oh3m8fpk4udfetwtc95ylnygbfo59thivek60yxi85pialjbqfevc06ge8pb0rk3g86fqgg16zaaep2lda0y6tpizdlfav4hn0sp150avophy6bllarqn4l33oc2nvjo54ecknuq6q8vksjgu8o2zq1w58b1ruyxihmyafqp1y1wwkh9ry7akpmbos4i318rxpo8282pyfwx5fdek6nz39fqdm748alna01',
                name: 'rgccxxo27xwvs3hjmmfd5fs1zzeqcyfgfj9sdyydglwcx6xxkqvkp19b1hp5s9h028jesflbjwi2dl0m5cc4suowm7e5j0wiwpfuv6x1wesubox9e6zr5skkbqr0otqc1bh0676m32ohovhs2n7x6kbqzrw3smeoqu0rjpsigy4zn3yfrkfopkjbhyko8s3uoz185ypad8oz256d9vjdektdfqt6wmrpfy8uaett0y5n2ocqf3sc588s72zgjc7',
                surname: 'chbods45tfjjonkr04wi5j30d1t2jew3jxl21zg1y5kdar30tvnxfe86tjbky89ncyd5p9a7otg6ybkw4v37h9rxu4ux6pux77bkckcrtw5bqtzript71b4dwqbw5wgb844hxlp52zuvdsekpyd1yaz4um4uvy7obu32vt2ohbj21x0nagu6rhgunmk9qrd0s7das8jcegygqby0e5fnrhzq8242w072gxnmig4v6he11xvya009i21tp83jrqd',
                email: 'sk1d46l69xty36van0gviwf3pv6jerqfrivg8fpawd1llj48zag3pufufph0xb436stbhxnep914b3hvm999xnfvs6bxfsmbffd603kziqweedvrtulw7vbt',
                mobile: '7li1irgxmhfpc84z2q7mxnuifdnkahjw13r9jaqyr5qb76f0o7i88njpp8h7',
                area: 'nv38oso6vfrgsq0itlpe6b6qork2wustg8zcfn2txfb2xfg5b327ilncqs5wf8xy9ciqfpzc3qkh8foxr4babxp9628yha1z10mwwu3ekzlby5n7yepn3bbofs2rlgihgfv079pix9o44422mpu9jr3s7zg0conn0hz7gkcvbeuwn9gupjqevypv6jbrypbz4j6xuw7xnkvmxp4btzn2ehcofk4lzd5momzv4d53tw0j4cm39zus2r4xukyruyp',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
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

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
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

    test(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '2035d416-8470-47b9-81bc-b04e47fb2331'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2035d416-8470-47b9-81bc-b04e47fb2331'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/2035d416-8470-47b9-81bc-b04e47fb2331')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2035d416-8470-47b9-81bc-b04e47fb2331'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ec4f8cfa-1378-414f-911d-b33183ed6d0b',
                tenantId: '3e6cb0b5-8ae2-4c7a-ba4e-c0c6970a3966',
                tenantCode: '9u29i8fx1zih8ql8i2oldqeup1091mgjdiq5bfohfa04hrs1g4',
                systemId: '0f0563b4-ae07-4b67-9f7b-bcf7d8e3b552',
                systemName: '5815pgigb8mr6dof7odx',
                roleId: '3d214031-46f0-4ebc-bbdd-2a25ceaf5c11',
                roleName: '3n8igdbxx65y1a400pptvczvz4x803cm1vr1n8zom2ucsi7p4hz2uobujoch3ii7wzi1h9sch63r11zg4no06optcnxhbtxda3u98wq455hixl9p03x3d0a0fiqck6edu1ccjwz7uzb1s4o18evacpq01w05eqv8atg7e5is43flako2yyu6pra06ti0oikjm8k3mdgqb2ayyq7wm1fan1myj1qp7qv6qrq3luyaexup0ogw4tz514qt457b3se',
                name: 'xviueyru4bpd85cbf009e597mltt2jvui2zr8x7o0n1ouh5d02atdsl38zntmpr0qnhgt0b0v8oltiq9kvqrhqwca4hamb7ctuyk7wgz2xaanpj01dfx5vu3najid2uozo6rmj3lzp1yd3gdvzftnagzq8gazpckvr8hnsn5kmwi69hch565cbydctd6my422t59e4ry15xw79s2tjzg128ddpvf1wxlrvr017ypu3sjhoy4yas8mcxt3l6rnf4',
                surname: 'vrwlmdcz4mggbl61i7yfl532k34m6xb5uzb8g499ayl4lw1v7debeyt34mtdg5kuktrxvhrjg2sf4r4gs4tuimk37shtwjex6cj7iarowes7mx43x7k5xy6eqbdpqnytld6aqcd4v8cn7i0xsc1fyskika8rvz7derz77rjkbsrzfecm71ethpr5bpfi5wrnu490yv6f5qwm485ucl3q93rroykp1eswcjfu3mu2hdhcdf8p21g7f5i66u9fvl1',
                email: '24t67nj6ciizeicil36wz8amqbqony7k1dvffsfd63px8yotmg5o2ypg8cnyg8hywlgxd9s67rf4io3uqfn0a8uuu70oeqwsxow1qctmwdlvffu3oy2d9klj',
                mobile: 'h6o0zvg3gbhinvse2p311hkyx9mgls58cs97s9yxjh2ry6dllxvqzkhyfe12',
                area: 'oryusmi1h45h8igyy3g81d0v9vj9i0trukaei60zscpqa2jai94sdhvf58fic4bjlhlgu9wybbomj84ov0cqh0w1kuqwhlqml1gzpl8fd7wos84ke8dj4e571qjgaa5ph2joej9tb8mu0ebos5h3acx0c0qd69kzawj1fkdrheij7culyfcbdtu3l04mpfjuofvwwiyjp14dt85gacno0ek4823p5eacqpuihptiqi2hkcvxz8xllkj9r3rafu4',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                tenantCode: 'ny2q8rz37vmwj0xk7bek9jy82ademqwgkkdkx3s0213hix3pxu',
                systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                systemName: '8akc7x3muw9jpszpuldk',
                roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                roleName: 'brgwui5j5rgz0hn1gu66ftfkaqtzwtwn4q8snap08vyje1flntk9yqpnrpjdq29nyy5muchhab68hh9zovsmwrnjjxwdoqqxchx3plrc8lg9uyquv5et4f05y1xxgb5tk3lftr1ha7ro2bhkglmb63evgjqy2us9y74rfb7vchvwyhiqwq1aie8nlm4xkj3ya7j4y6p0fb65di6l502dykcw82lu6448qjkf1z2r3n5wg2xgf42dsn7cvnhhzum',
                name: 'mb0dpoyi4c7ibgh44vmd1491cin5l4sea37fxiyy0gv40bzh3xuauk9yomnawlh7kzg7h4rbkh6aqpiya5ni4c6n9e9v11smwpbmmt4i0t5serc69m2td3ccz8pyuifodwe0dx5830ra9ehdlpd9igbu5e8gc7z48j05l99fhr8va78wkg9qpvgfuk2vjmi7ng6ran8t60wulplveltpegksng8656mfi4sp6qhvf6ub440xaoyyaevw9gzzpbc',
                surname: 'sx1uyl0r9am03mxc4cpa9do4w67dvev8t3uksfiffls8bewu78mfw0u47a9mnutvz83dv8jg8gxqkh94cjh5bwcb8sydk28ddffm9a89px3b4ziw7w21qexziob7qvpt8wjpz1x3q3ct12dq7sxex4tjg2o5a72i7a8bfiuvpb82gi2i714khztkderbc24laoo0x1cqfytf3ilwxbif3wejf43bab351j4kzujlbczcb8byvnmmu35gpfseg5b',
                email: 'obza8u1b8b3r09zbrwpfija3mrbv5ddmysqzzgzpo1zbp9i9wyhimw6glvqg9w8qb6w295e476xa544kz805wdzlzqmusx5uisvpnx7tjx7ayd6p2wd7e1vc',
                mobile: '277mdd4by4lebcqykam3paprhyelqdnzlplafytf9xfqaeo299hdis3tqo2c',
                area: 'vf08nz56s12ynlpj9zb2ovhvuw42fjl1gdp86wtgmbeodui1xyqdj2ceu0unk38l54nbrdec9p6kta4rxsq9uyzzzbbvtra8x6f82tvlzunuy18788wfmbx980mq2ywo0kwgv7m2r2xqex9cq0619ovmktzcvxdvef4l6wd3fkumvlj8i3m11pn02am8l4oxajh99b20j5hunbnhltq2emfv3u3juaiab4letlv38uusbo8eg7qt3gs0ylpp4pz',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2035d416-8470-47b9-81bc-b04e47fb2331'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/2035d416-8470-47b9-81bc-b04e47fb2331')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '61398268-219d-4638-a3d1-1e27b1815e02',
                        tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                        tenantCode: '34lvvhklkfzm1dg0w752r4ssqidy6abbpekx7ojdvlyjntyz6y',
                        systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                        systemName: '94bfc9chvzlgl8g83jek',
                        roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                        roleName: 'g6y6ubah8c9z2gk5um76envow8p6s9rpx65002k3208jnefet18gii8oe3h7vb8vz4l26lliqx02gd9hav32w5hvxyk6c8591mua7tqn6oa8i7gnrkpphepwvy6pt10a53335hhvh8qao3l71ebuoswnfnjocj8ekfbgllwaw1fxseqgjbtm8mndwe75123oib1zw3b61f6lxfqu4wo0ka9dzydm084gi4phr2i6nfzdedrk6fh2v45y9ouycqe',
                        name: 'ruuofnw94et72vfhro2pp6bo7mbnsj0rwle8k4shyb0474tmjr8vy31d8hv3f3b6mpikosz25npjb7g8d7ygeow70zjomwynnw1ggyyh2zzkaf3cwhcclkwjm8x2ou0992w3nxui0tr1rchidl6mwtt5hlvxo2tmdwspegegxpybvu7ft2vgyheix3v8gbxrffhyxb7vc04exhwo7r2smq2kdjx0x5qxue8me0ctig0y89qjxwpulaxbh73gkz4',
                        surname: 'wmhxfx7tebolkgv5xlqdgg7xgmxqekq9r3429x9msjlaukcyqlrwmik36id1ca2wxuto5dniuzci3peao59udokxt3d1rxjgjgbbdl5bkhyhepaa5tiz9ddjxlpq6eberbapiy23kgwfeqsyin9v3dcxc5o2a0rjbpb9f5v1n2h0a21cm6mdpfzjj6ueu7xnavtdkx4vg40h8e18nyk282k1r2carorer0daa5fxqpqis8fakg1aegqy4ehzgl7',
                        email: '0e7c46uq6mq3kyfrbkaa91vtygcqei1oxr4aydud8k5hevtg4ebas222ednf6bbhws36426u6voptllihvegjng0za8i574asy2v96vy60khfz8n5imkcjqg',
                        mobile: 'k4wo8e8jn5enofvb7opbgsyba26gqsvuz5ger4darmx0gmfjdphejvuhqznd',
                        area: '3yc72uc5u02eseuhvme86smd5dyvw5f1my06iqqa29eo4p7om36v05o43obcl9zx1f1y36qdgpkbpc4mmjrkk3lg9xo218x4b0sztt1gr9sgln6q1ifs6dll3qzt1yxekqg7m9cb5m2c3esn4oocmyqs727ilo4rehibhssirwu4543w611nc71s954aht7ybzl6hcvkj7r2ej3eov9n8rrfsc0y4rnhobsnsefmwhkkcqkwmoae1bwlkd0xbs1',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '61398268-219d-4638-a3d1-1e27b1815e02');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : '2035d416-8470-47b9-81bc-b04e47fb2331'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('2035d416-8470-47b9-81bc-b04e47fb2331');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2035d416-8470-47b9-81bc-b04e47fb2331'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('2035d416-8470-47b9-81bc-b04e47fb2331');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '5ea8d036-f5f3-4707-9d48-e76f6117d017',
                        tenantId: '34afa300-69bb-4e65-a3b4-15263797b41f',
                        tenantCode: 'tfixp46l12om5df5kq3cbjdva9hbapnj4235jzlekvib7wauug',
                        systemId: 'f4be9fb5-b82a-494e-8bd0-7ece3b7c720f',
                        systemName: '082l5ggxfu1u8u6a0cxh',
                        roleId: 'e3dfae40-f12a-47bc-be8e-1ab7d37b4d4e',
                        roleName: 'kqvadnmx0jjzfooe69qn56i5sb0npl3u28gdqdb71u6bw0329lpl0m48wgu19dv4ttlkquzgk43wlskgyqsd0plajnahdj37bqbqrb9hf8dlbmm7ct7qpwk4mwaa9egaqhtdijymuxmzwo3x6oaahgbn42d3r8nkqhu9jwjg1yiurlajwxdhz9d613pg0cvk07cuhvu00j48rbtaoi4narid8rxg3h3m602zwq990r85xn75uptwgemsiqqic1v',
                        name: 'gtfnx07kinwjg288kdn015yp6t9cku83sszheuemj2xu9s894lzxvyr1k9w87zg8346u012vuhtz4u7ycdq33mwif82y9zk50j1144z7buqfnd4gxaury4h7hs45h6n5ukbrkdfn1mhmdbzcppb3j9ywzcgx1a9sjhmvtkdkwhchj6h2i9xfwmle71osr6gx84f09en4azjv90cphl22r309prs48ts0idnvsu8mlrcmb1kphmhpevfrlim6z3v',
                        surname: 'rc3imw1sfuml3e8j9mv5mnq0l2u8b9u86v30ncz6j15bzd6qjb2vct7xungljuu2q0cncz74fp90dhu11kqk20uq4if3n0iaiijyceylhc03gnuzv7dtptb2ca1dwlgs86j71krvgudqukr53k5j36txo74u9k1tzfgmq9kuaddvy4kmx5lpics3olno5rey2rygb0q1wyjko2og86nmfg4p2aimpi2o94ztnipusqhfvu2jovokf41p8ldd89y',
                        email: 'gmjchcdvyhamffesllmf71y8pucn2ko12hlip4h23hq5tdcaw0nzp10zjkg1r249di39ptszgzynwsoj2f04s663p2ip9qajeb9uv8kxszv7eh62w0183j7h',
                        mobile: '14q8mp4ssxhdhbrb3aa4qtlqkm2huc6w0fyl1e5nxhg31en8zi6f5ojobmd0',
                        area: 'i1rtvc1on16z0tm9uocw1mqgdkapatw5rv294gh1fj06l5xv1qdw7kmqd2ncniucfi5sxxb0hu36qdmka07s7vaijvgt1havnk8ixqeiv4psnugndvx761hufaz2i7t4jd74lb5icfyzh2xn1rq9o20066udezwxqaexjwo83q85q87vef3cpfbwj0lpiepv0i4zmegqk8ydy4g9ujof7yjgy0lwh9s6i6nugo188v8rxkbkibjlkoj4vaqm1zk',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: true,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2035d416-8470-47b9-81bc-b04e47fb2331',
                        tenantId: '580d0264-3741-489b-8e34-26bbd434caf1',
                        tenantCode: 'kzn6thlgoyqdhjbhsikhsm8btfwe1a6vbqmng1j4rem2tcxz38',
                        systemId: '11386785-b7df-4a1b-9ad5-72a80d67e95c',
                        systemName: 'ct1joayrmyp3vqnagwid',
                        roleId: '30f03758-c225-422b-8bd5-d17425ca3e86',
                        roleName: 'znrajc939yxbxb0s6eos5jjuf4kb9mw256tkqwjmzmj3ylmkp8c92ze27qysgx7ciqtv05cy8y8ssx6lgdl3uklnkb5e9h3007cs4s9tii2icgd4ol0h7bney5rlr0mnfcwdg7l073live48818jvipe9d7dxqqk3madmkqipgpqn7wwmziyaug4q6z7s3pwgpj7hhqal0f482zdietgejsu5d7qr9avq1j8937yhzfyhwsz3w5wkh8div0na26',
                        name: 'urqnfn2c43wxj5t3t4u2gvk1mnfr8qrcj3ckagv08ai7shln3q9aj5iov4o8hocdo7h8lp8vdh7n02wpvew26hatf8alzed2l4d5mx3a1bovyzym1ci5bj4b8nvy4ubrcu4rpne2rongqo8718vytmknhuv7d39ffwlcw8x0tqyndyeqo0o3il4vj34sa7vxgwp58tc6cskv0us9lysksrav55ujkc3fo6tely72xictqyexkiir5puaubpup3x',
                        surname: 'vktligyxu14egkuii9sua1rnqappfc4pszbykr1kzbiusluvwsyr8n4893wh0bnc3wfrctzn6649092ze98rnu7lum5uxlcmt0l526fjp7wuhtachbq3wfykpar6jk3j65i7qavo4aazfi8846vot3v55z96z3f786dmx0wq9zq8lp6yx3v3b1kmalaszd9ha5o3busgaqqpzydjv03xgx0gfclv8q002lb7hp99twa45c26kgd8ovy0cj3gay9',
                        email: 'mqsaatw5ppohcuvrxnlpofzsgfczpinhxrwvn72drd6rew6rikebh7vwm2czuuxi3zwggqd16z2ylsqguk0h5qcylhz4bd53zwr5jqi5nwovul9umr4ktmds',
                        mobile: 'g417akdi66ze6u4ztff1cy1ea38lnvdioodi3hing9tunhdk39yamf1al2bh',
                        area: '2pbud05gf92j90qr88o6h68invgnivcy3i9yls4oh1bd9vs5tdhac21d4vv1jofr2o57hikeaul4xpoe1myd1grugk3125sfv0htibl1qpch3to7wbz4w5ngtlp5l2hhlqelyobjirahizfczukuykwsgy6z80jj4iqepq0r41ut3o322uodpohgga3jormvuiodd48ep6qb9v2zg1dzxpoe1i9f88wgdcu7auhv63dvn18uo2ic3ui0uir6qhx',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('2035d416-8470-47b9-81bc-b04e47fb2331');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2035d416-8470-47b9-81bc-b04e47fb2331'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('2035d416-8470-47b9-81bc-b04e47fb2331');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});