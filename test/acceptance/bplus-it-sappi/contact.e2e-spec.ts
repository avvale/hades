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
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'b5sxrsglqha5xd922h4h969bnecj41z8s4rc4nvfbpjuhmuxeq',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '0frq2rbh5xxwu6io2bl8',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'j254lu72h6hljdidjzsqcqb7b2embjdobjd8siuo3qrg1emf0u0i8hjnvol9u35k3h8q5wlga9oofs8lkv46w5mbz8njq3dadz9ype1wrfh0vemzta8rbaizvrgzx6lqhej5ktnhpckst9mmm4bsdv1kne36pyulijp33i2wfnzy4tl1fojo1s0gb7fafg6o2ew52p87kdt3z6prncfgmnjqahwai27mwa13qygf2gui3i51igdxun0c66nnus1',
                name: 'ia7d6ru5x1zo5plihrdsgp1bts3tkxsc3ph1aqst6y0r975bhh3p7ekw15kkfvmeh6hon7xn4vjjmj3wd9a9r83e9z2bl831u26bzi6dwvtx1s4gd62blavag9xc2i9szlajebm28ctg6yri2pkpc7515aoagjkb6hmlkymhay107fr4n8xe6mwkfncwev6yihmpe4yvstgttavkrfbmruos3656sle6x7aq1r5gcq7v5ahbl9hjkd9u7zamxzt',
                surname: 'm21a4dacur9rna6ozbske3j94rqwxda5xzo1xd6u5cnwwirgnheiqcbpzd968kvsrqey319sfn2tjqdkh9jqhq64lzzye7rz0owbojcv2oyo01qlsnuohx57cljwnr3bbyxkt4k346dvk4hmqdsxt87v1fvqory0gwzns2ys4po6ufa8lqhyem5j6yktyozlhonew1ktko8c9qz60s4pcslln6wz399d8sv866gh32j369lkfbcg7qlr6wkbacz',
                email: 'vmr7p8kgi7aylg155gb0hc2f44lehlq4gl3xah9w1p8j6trkxmenund6tox89e72lnkzt7motobxfe1o08pwi1r9ufix95t48okl97bm03rvay6rmm9bctx2',
                mobile: 'ufwjofldmr8oeejhlfr7i565q2q6eg9d8dpssv8gmdv7ogmvc1748hx9bgio',
                area: 'x1rsn458jqepdve9wdo83b3s3d1aibx8ecdfx2fg1ehurqd972rb56u62e7c5gh0n4p7ndzef9lbbiuuwdv8ul7dysufijsdgk11pa8tsondsjee6qrd5nlifznbupwg545irl2ftinap04eartxrkrmw60g98svmda97v69bhj9e7ekaoa9e7eczqozhhxnkoz5e8rzal4clq0uvarh4bq4r502afjyrtvt25v1kiv2dtwh6ydfoeqf633n1fo',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
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
                
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: '6gjev991oncmtoln1lha2two3uvile7f4n1rx2anqpocw9jdyd',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'zsfj4iwv5zuianmxkdn1',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'axfusp8dswqjzo2zix7c5zu1ry3upy7gildsw1z45vs14egyxt8nigxy5k114ivagwcxkifzm54dmh4pbmfxefsrchzn48efap9wnjxpaw62o7cghqyzz8bottsck911ttoduoowjchmhd3hvyjel9ud6kmhowvfyu2az9fd23h9zg182d1lxyr5tm5q9ztk4u7wpianoanorf9uw5xkpc61697jby0a6nvcc96m8wy2w1jlefops2nojp6a3kg',
                name: 'l26jpepdol5a0cz3rvc9wcubizuk579gizyllvehjnt03j0mvcta3nget9z3vdwl3got8vzpoxpc1vrgsniayxrhcqj84mhyi3yqfxlzlwehylgj8wn27m0dfcic2ya4ls4brmqb1cnu9ux0hhzsgmudecevvlrjxi9jgis2hk9fqs1g2xl4stbllbkqas5bfwacnfd0sftw8aq7tczm8xukiuzjzfglqycv5s5swrom0222q3jlwv85bk1j8em',
                surname: 'bvd87nu2ti9zicxstxdkm7lhy8ngmnotqy8ri7of6gh3otugmzcu4exh8aj51c7eill3h1stscz5f64h1jp1velxs7ioeyrylrlq1o17vsv98y3hef427bcs7fmqjllqs6eu8h5dtui1deitq8gaj49ufcbyenxluhd5yn1frblqce1eo7adilnccmv7dxouizc6kjjs21iq5zrzyq1vsuoopmoqm37ab9iqayh9lx0j1xqgiijogmxf0jp2idd',
                email: 'rp977vwqrqg128lbdgpiwmpu03h101iw8fx5cbfyni8bx5h6jh72xzof692rlpxthftf82nc68v7o66qucl9nucte448lfzxjj95vom9af3cqq08z4nysq1q',
                mobile: '78ynlbvutam0ttv798pfkl03ar387bgzu4m1dfloc51eor25wrxqa40pbjnd',
                area: 'w35wsfr0i5ys8pijkbn5kntxfdtm0tffa4qm76wbv6ovwbjog5vuq5ik289fceurhsrzopmqlkoag1zxtp8gdzc3bbrsu5mv4fzx9ts9l0vq9dxkj19x983shj6tgvgr6u1gqygmco4mjapubtmiw615tr8awoqxwjcjexk4mqauyesex3ybjj64ovwh8v6c7h0940f6r4fpun0cz5r3usk7w9b70j6s9nwx5h7baz2rtmm4hxg4afwqvu7lypw',
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: null,
                tenantCode: '8cp6uvd0d8uls3wr9qg3mtanu7mbda2kqp65a7d4iel3owqtb8',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'loltcslcczppvik4axci',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '7581tatrfgac25ckh7pye58o5uv50bckbqdwkldgs7hjaudl33b2dgvmkphvfqwl5mft97eheqfcw6f7rn0p10qz8mlnhrj2ryp6qun3qe2l4h3m4rf2xtj4cgh6hmr2wk3wsam89v511fwo75mihuklq9v3pya500ki79xm1ggfi78ckkdxytcth46o6939v8a1298wkail7vep48u9fu4ai0twy77g0w742icop5q637zzsm7fiyhqotvhas9',
                name: '38h8l041jlojlknzrdpkoy72tg1n65302pnd5tw9tnse6503s8stbigor0g4w19tz5osdzb28v7rsltatlg4xtyf3q6dp12pdhvzwkby7tvtonnnla3ruhnvdncf8mzrtx1z3131n4z0ia2usq5i7r7gmofeof7t53wgi0b96msijzgs644p9ugygupzjfumgopvr35u6moqwqhy6h3trms1fr9q77f2w3hkkp1hxjf95frxbdewe4cyeoeq2te',
                surname: '2fam9758ehj5rftuy2foyzh90jnkw18wabjmw4bfmw8h3jev9r8x3xlfbucd5x5ynve0j32d8erk1fur1m13x156ovrs7d5p88008kzf5j89rlaigqf7vccppu4221oso9v380b4awdhglt79vq7qy938za9nxmsoelyw9as4769bmozywkldccmdlpjvgbhhjpqz3fkmuz21jg6hlmiti7fnuokgywxf8u6oiassf9i3qzzry11nwp64rygro3',
                email: 'zbswo40i3hv9kqici3u5mn44tax77hyw2oih1ds7xbh32e4aai6es9kugd9tzwrjir1kpi6p5i8drrm3e877a8pjgutnvffvsih7uz4r3jy4l7lxhsagoejl',
                mobile: 'fdjunqvtsjlm9egx4ae8gmz17ikdjadlweks7k1sok8o3xkxf39aqsc0crz2',
                area: '9glhwbhyzzmsqv5kax418lye4bl9q0ojutf63z56nv5yahjudco047eceqbzyiya5mvwp4zhpr7hl1625rvzjr0qiziv8l6polnz6m9blfhl8ip4rsa1f5533gkaqanpsifk69gurcfbhpmopzm397fu09hvl0mqz8q7ijdloqdj17jye8gdtrjjthdtp6zmx14pl0wlkj67orkr6v5epoqk2yhy8opfwjfj8w9ycwf4n1gdlz0qisahavkp2rj',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                
                tenantCode: 'qdokmip6vs40guaxa79kscix84ih7grslzh7nq28vwhlpyre6n',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'on06aevcmy4j1pyrul0c',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '5p5n808rejb6c8x4klu98wpnoot6waf8g6xsl4hpeywofhsj110rptcm7q3r8pnxyx1s2pl9ygu0h5o6ulefkc03nv514vj03a083ip4ejhwwwh28b52i1oylj6keya37papz2zg34154trotnftmymozu5mrropred74oqeoulxj02zn5yjbq7pw9qgu5t7604f2vg61c39zyomfv2xj4jpxlpd7jz6r8mpe7lcpqdstfp1kwg6pssjcu7ik4c',
                name: 'j5wyvirmof01jdl3z2z17rcy2p6g2dcp9gox9b1h4d5r6m26e4dyuvu7y5jxamvsjoom60yder9ylq23nezir8a610hinwei0v0hykpqhxyxzlvx8fyhlqbgqbmu9xvnpd2bdji3wt4d1bx8lfcu4d3siti9lkwatwbs7mojp0vrdmyy7bgesbmkxxs0tlj1214zky72pnm93cd0js8for3f1nql8bvec1em96dqsfnuypz533un4xlb1foa5ir',
                surname: 'rl3o6atizw9e8nluoeks4uvfs4zpj9g4ydldlkq7kaojlooad85foxkzvxjtetq488zitbr2glm7o88oh17cqxb5kyx4mex9gy3m40pxzzv22vj5gyq7882uni66jbpn55ew3yxjokrko3bikmv3vdgirn674ui6hef72n4z4z20s6fe5oo1dqo3o6nppgzsctfqi7d5xas8jsxe8bjd10i970cr71lc0kmrz0j2munfprn4qd9j0zxk37s7va1',
                email: '13cnz90hcyob4uyx4gbqvt8c90k39abvyumwhlc1lp4g6clsb5djwwzg1lgdwqrr6djc1pz3xm3trzc00u5069xl8tp68yemdbgl9bylrjrs1mvjn10m81jy',
                mobile: '292heospmjnxwkuavxnwxda2xikb86yadrteraz3ytca036nfxzt50lc2q2v',
                area: 'n0ch6h8ziyvjw4oxfyqr86tpug027wt54b8gizrvyc5gguigt8snuxx1yz3m3mwanpp9gs1w0usldqpdx8oad8otmzw9ci2gc7skrq07awrmswvsspqphviyl27822sqfd5s82vmaysl2bdp0sfpf6esnr7gcibd600mm3d13t1mqdtwh3653vk52bsvkdo8hfpj2q28au119cor5wvkrxkuzdjdt5rn2p2fruowdrcgxahki0le7jlb2b9pdwn',
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: null,
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '8qq8fbu1x5u2oomdp1j0',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'vd2r8y859c9uyjkz9dw3igwyp0bx10mtxs6ruclxngw4mewxmgyxc51k70a5a9g0skx7nsz8l34mmq75a2mw057w9upeb4vwhibgwnhq33ue9cxalm8iqdbksr6p93pzpk317jiezttgzkef8m3dol3x74377cle2vimglsfl123ndy4cw1w04hgci1xrapfvw8xkqs6bm9ydl0m3tm2izl1gdum3073hcvd4z7h3t8kiznx4rx671ud2h8yihp',
                name: 'dqbs5hzxh9iqxr1uc0ywxlpve3gx4244a2jsw6l17t8cxy7p8dfnjkufg1ml3dztkvu8eqrd9typ0x32yb08zxgw1zrt2o8bh0ckk2dsgyo6dbjwl7c97bwxn3lpoi2tgi5vt6upzjbbscxwk9uoekn3ygxhuq5kl6jz6fl1yrm5tcfmab0w8860gdwfpjszfsd7su08nz9w16ar9jn4g2rmx0ez669m11ajdcopai0yomz0hmz20epkl2idefq',
                surname: '5lorq8mv8rt9cse5gobu41hc1wicwy9ll8m4zqm276kcteos8lkknm9wh27wn7fr9puhed1bx7xhiwpgbei257szvibt63jb0qqwx8la1ypopmlkssy6cwtpbjm3tl39v3rhj34qvbdnhbtyv112x3u7vxhvcrfrg4q7ewnykbm8734mrykvf8fqom4prkyw9yyit44h53jfczkb5vly5ylzjwgpem2cl3569lhkhb820yha6z1o2e26jpgx8i7',
                email: 'ozzvn2a44ktqb1twzbqdgxwq0vf84lc7i8iuvdwbvqe3d5auitil2uttwc45x2kzd56t4xcp6zk6p6npxxnjy4dcq9yuo6b5lj7yyqvitg4fjqtt2fkyo2ua',
                mobile: 'hiqodrbi3h9awe6po8w0g6x4vl09jfk0cxzjswh0ervxpj3znozg8avaegdb',
                area: 'w31t6xoptzi4z0ab207pnj3c6b904fonme330ybmuhn0mnxweddfzqarm7karf09kak8dugfq6jv9ijbhveus7qvo7r8yds3r0w9zd3fw5xurj29yc8l0rkshcyt3nheat9ug1a37slm9lkiywf7277bwysut4uadi0ywep07k70b5ngn5gxy8eoladf41jo3t2m6qnamkr78ujqxmieghzmhld3xrx8sk6bfomt4m5cdm4vf6i60898g1akme4',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '3awq9c50fmlapuwkuoan',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '6t3079qugedasy0rk62sv1r5vl2venp5nx1a5a59u4ou6cqox48nk63hmrr0rjxdlv49hu0hypk9wkj2gxqbbukrhja18lcrhiqg12ch0jahvfr8gypmarukbudv9oiiv7okelzewenx0k17zu2yf1c0sq6q9qdr9copd6adnpvj04ra1ryv43ejhfkl36f4hxr024vy8ef9y1pzpl37c70bjm5l0mcllwvqns5tmf2r5sjwfcqy2jbc5i6ykke',
                name: 'uhul85zl659fd8h5eklifvn7v17v2qg5a2wgemnnyvrplf0bspdpttq6pn4enhwpxrx1fr9n80hkee78jlfyjkckq8jgwel5mk4brquvy7lish1axnb5rwcqm5kp7838cl5c94mshf3cew82yclfb4gluyk437uw1iqwwo2uu2mqhozqaf1pgo87n1y9v8lrwv0cg8pfxbuucbfdsj0b9qhasfp1kt5awxfaytmvxvg185l1fymjirzgg0f8e1g',
                surname: 'cko1iom37sge5f63qe1dnpwcc1v0vdrk1vly65jlxzr1ayph76c18tv0yzpsri0di0atf326ddw51wf5hkmelj9u4ev85krkbvy4r3hlci3ymryjim4ecqffllyyovhlq4hzfx4wxnhjwl7jhp3o982977lha30fmdh7bhzbn4jlf210px39z3wjrgdcqkiodsorqk499mq46oxke92gyflm7g6rps1vumq807y0x8158zpiq6umnqwaysp2myh',
                email: 'nnn7qb059kksqrn3gtmq27i9f83n5cs1whtyrpvj9oasnu3bxivi4kfn0a4swy2v19c4bgijfascqopjcyd5fobcuun5k3rr99o50vjp0wdt3wuiav3ktfgr',
                mobile: 'j07m7y9x5fwl2yy90ij99i4snd3e9vel47x12i8g58a5bscoxl6g0ud90133',
                area: 'qhtk4i71nr2sns7b9dhm53lvwdibjp1j7jkb83w9qdvz0uneb4qfyjygt1mt4kazi8mcr1qsk01rsbkwksa1ya2mjggvhnebs90qzbkuy40firxdwbs4ch03598hua8t5avq34g81afefformzfvkx0hyokcdtrmy455t6ie3tatliqltxeuhvf6ywv2aekrk17uahvui4szm0bolzeqfh3af00xnia5jqupqjn8jny2x7nham6dtnd0nvl7ovq',
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'i031pmx0r2y89ep543hbm43c4unei0mskucxcqydkbyf3xwy4a',
                systemId: null,
                systemName: 'vbesepjnjdtg5304cnfo',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'xy7yn4zgrdwmeb1e3cmh2b8l7oc5nscesaff3517poxkazfmwb1m5e836ub185xbp8z4ge3j21v1bnfjj8cobkpggvsoyvrnxxt69io2qm3c0nybxh9ob4v1x5n6mduz8lwf8lsywswrukampjo70on8tjcb2s7ddhw5ts4a3wmmv504wwjlflc2ujvpqcya4uifzb9z54446im8oac0rr3ct6inkyyyjat22hray5havk4zbtzyt4ya1meu75q',
                name: 'l5gqmafiskrtwv0psk2xfdv0orwtrszwbx3bitodxq1vfd5oiplxewjjqyugmn8tbft0d2cviq7cyz9u0uwmrthiyzsmpegptf9r3osxa6eeeexe4co5zpm6j2wlz2icxa4b9lt8tb6dcgly6yzaijhk8s3yd0wpxmemqvmhdstcaczvogewsocl3tngyjvxlx03cj8a49ysbza55atwej0ri5vupux0ikmaz2mbt93ikq3ig0iuv0ucfml56to',
                surname: '9wzyfgmq1k4q1vzew0snjg46kou3u3w52ida406mzwbwsvtunn8mtq45b5b2omey8pbh6mxsp8o65v65r7en8m0k8236ykuzxstzfma0bmkfbgk89i5im36qm5j6izm13z78rb54m2t6pxnsxmq4arlptzqoqfxclftirjtcn3ojx8rkmizv1xakho47veoj71czwxvj4i41lws1f4x9hr6v8fo4db2p3rnbja1kmijs17nsieu6gifl5j6eavp',
                email: 'doz3lhg19f0vssutxa1262bnxjpl6uf3wa0ghkxs9mipgi28mol5p80wjg4gqzd16yjh1jact7442pinpny046fqgpxvwc285ui9h9ez2ynpcml54iu1ghky',
                mobile: '8ucbg64ktgew65qa5ajrh4drg0etkvw3tfxdslslh6fie0clidg5li26sq8b',
                area: 'yoj88557l0iwzcnqjutzz2e4tx0c2hnkodqb0e582x00q9fc89ev48rykt14nwtdj6rpxpn6xfktawe20w3wd71if8btsk6rjtaoay93lns4ckau06ad9dm61q9cyowk1pxbuzmn1ev47rgij2k9w3izu9yccqzpwsiqa4sto941r9ad1vze4hy4qf2rnlt7xfaj8tetgmbhgrzaqxrlwnhl7v7vh2pq77g4pngecs3rb1bcc8ljl1d73zakfvd',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'hbnl1c77c1u340n19d018gl5uinyu8hvoobphljokjx71x11a5',
                
                systemName: 'w6jiirk68vjkerx8xsw8',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '5y2pnhnd01e2c9oljmpqi8bi239zi7q0q5vc4jvobne9h0bums8wtg6tcblfza4jdcuij8nqxcqu34qx06byc7bbyrk109i0iccmgg8omi2qn5nrr8ldo0q2gpzidwoo3bilcdccbfeu1l7qy0e34oep3goyror8ekf8be3lqd8dylaxg6uzshx6zh6j5z1v02gbf282l7li2reon0n82nhjvpsefp2sy9b3bllrxyytvjgvmtzkau5hpn5ur5k',
                name: 'l11lomackz6m943eiufy74a1rsw2kumu5ik4z80183saveg3xi5g2q4o8h0x205qdasuhpfttmg6nmom3cly4jqizry2m9jlp6umnbg0b7ad3pypwypcteauupe133uphnrzcxcidxgkjb7l0duoaflwx8mv7rvc533k0kttnqn80sillzoz4be1gt17i8jeqx99rh05ewexsbsuacyf10voi83bktw5j75it359k81imwg868rc11wk4y0w8bl',
                surname: 'xosqcuihtta02rz38ucivp6h8u3j8rxwuaxzgq0mi4l6dh2ks58iq4zqtvqamq86a7dzldo4e8ut84lml6kxs35xdze7nlcm47cgcb59kioaz9wm4kx5l9tc53ufjukt23vkj8yvx17dpbqvz0tytntm6gzrq84eqd2pdkqmswnqtzn59z9ccioo1jpej2lgdkh5ad3rvtox0lbze3evyy0mpwn5v5lyx0q0anxhbsjk48rmjpnvbjs5bxp4pfp',
                email: 'pf7ip49t1uwbexuh4ntdsa8m89wi0z71aya6yn1d1167khvi63rwd8f6y0y664f3eztbjuwb0t3rgxc42xkd4ue6rs3cz3uzld6zywk1uelyiyadt51zlvj8',
                mobile: 'ofew68yyhl0jd1k85wn242m0mvxwg8l0mpc57m19i8kr0otcdjb66hu7zze8',
                area: 'dqzbgv8m10aquheletoxa5ox3f7lhkn3trehdvre5njmf8bzkyn88qry04myu30buxzmt0wgg4nsd84hzdg7kohs6nnwx0a6wmn3iaobve6vwh0dylesv2nqqcmsyby0krlytu0e97rk5z0n4o8stz9ojrrykwahih8woigsldzybkx0jr3ionrbzhbk8rcifzjzv4jiuykdkr2dkcro1bnk7q7shdgym2b10hg51tflcn7j7ecgggn7xg67k6t',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'zceh9nlvpwtwgakfs7nbbc1uorkin1p9bj7413rt0wietfso80',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: null,
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'ewfk2tgxsfbd1yzsmt3tdug4nc2k4opybgslvkaez7hiehhshia526m3maqcns705zfaxeloxtu7dyg0x2c97p0k5gm7e0rxse6qmpqrlu0mo03ty97w3qnvuwqn6pe2ficrhran6rkgyip1lzbhmonwdlqtmfuqgphecktkys007dfdi0drdhacv6qu6p98v7jgkvsltfxn4l3ys8y1bgf3v1lxxftnz5wb38srfz61lzf33kmka1lt94ojlw6',
                name: '2ulcaqttgz26rst6oj9hys5z4y3layfwgx01dcjtlefcpnywn7bks7wjcryi5twihyzhzwss2fslvc27rj2esjkuucg82gnjduhfrt0z3fvv1a0s53tj2xg1p89tldcdskpyof9ydnauoodhg666tmn5iqzd031w6h4bggvf3yem8r3eaw5j3l26i2tnmofaduf728ed7avv4benrehc2f02bpi6ll5r4eovslmu8x3e9e11hucot5cs1iydpk6',
                surname: 'vi46axzczez0yush8j1sg7uncfy0uadku93cu3y5ku0qf2t1raf1mfae1a39b3w5oaxq5qjrrg6bs0x9d3fiteor451fc5jl3j78up4677zmip5mb7x6cjw0psj3puljz492c77x37wjxnv6vklsea1s2vr85qo5mjt1knvqgqhykyahooxe50fq71pqn31xw518y1cn9sa8vfjsc8l4gh5lcuqluqcsexmvge71eonsnd5nlflw7cqu2lbqsc1',
                email: '9z4e70wdho127446c9mw2wjlqn3qxrbrewlbgkacwazyvqprhdg7l0u2muc38ylx7zjdexg8dc4shy5lzkvfnguhxy056o029wor11a37iu7baxrow8ejgpg',
                mobile: 'wpwyue694c5a8j0eipaekvwyeib5jeddkg7uedymno8815ynlmfnxs7kh8io',
                area: '73dnfrdl1tpssvuh4elmjgct8z646vvlsyvy0ci7notd26gpq1f92m7czd0aojj8hafd70hq197sdslkigrk5ij8wmucvjjt8m14nbodis5vss2axtsaifs8hwofu2d077xb3ae14et5x81fg4kdk7v17nzwre3sipj5l7datpibi6xvtg63p61s8hntbcf28h4tor8pu6mq6kf227e4hbm0p3ur2at7kgdgfx96r3tjqhcdb1dg87ipjyuxj04',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'immgs2h998n46wqlj9793gsjetrgy8qgbfdx357hsg879og3d6',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '4maexgpiggz4d3yyqj8jgwyqo5laajmhlg266qcckemcnbumtwdion28a7xw1q49c29auxvxbos18g6lew9dkejrwnt0mlm3e0jeocr87pm7nst8dvxwlcj2gmvqyunukysewm39t1yawqwmyhshvv60x2f1kfv4g8xyagd1rst56aarrmvt4sd2hy6dpo95e2ymj25sh3uwd8wrooa3j2arb4poesa23x6olxdsz5hx8dr0pf5iw3fp2uoati3',
                name: 'pbmkffn03yw0v29l0gtuf0mb340q86k8l0hpwxnmeekumkbuncl4r2xrwxcfk73bkntd9qw834xhbj5huve2soio9r0yxax7lt3oz431xqz2265jzjt5whob2x6s65rdy2kl1fmauycpn2mxgajlf4edv0fbfibailbjrx5xi15an9b2rp5e3srma7o03se5cdg6gq8orqz008c9gvfm5boorsbaxhrf8gfsv0a3c8fi4hsua6dsn8qq88sqdv5',
                surname: 'n4blc9rfbjq1222ykobkxc02eevza05ajbsui05r6ld9lo25ebbf8mggiyxv5pdrjb0wm2obg8a5eyq1ybckgudvz9u5kkxzleq3fmr5xsj679cxpwgue7tklpdzte0ylw8xlfcfbcjvdty4l2ove3quxivqpofbknatdbn4jcgtdzdxt2teyaiaquj18aibi1ojrnp7quvm6wdc7yj3apl4hzkfm1vari41e1p0mlap8mtqtpm8ler8aq2kojy',
                email: 'qzlgxm5xppcm83qhxj83y5j24ysa8wvl8ayh04o2zmmkz89e02va5zgyh9rihbgdbr2ttoeq1yguclzyv75megtv9faqewzugp82fcnspod2kjipmqaydx92',
                mobile: 'depwmyl4kexjdra8vftndfkgk50euaz2lomn1809znkp74wqw3byi5zoarag',
                area: '592nuo4mgs3njrlbvs2cct6wsdx19bilropyt2mkk21o9h7tdkkqpzozu94jxky15dfis43wt0q5x82r2xg1uggthgy79ek9w49ljnw72o2xh8s2efbh65u94zbycj4jks4liuw4pkwcj14ecypnkw7n0lp1s856pz9nwepbshpadgvqbf47sii42kgahnlakpbmab3r934fa48br3nqlrvayedt9ijm4iy9gm1e1ao4jenkz5errc1phw9k55w',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'k059be68gqiswyqkgmp1s5lq5vsnqius2ykse8qkce650db6jt',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '746a4fsd5noj1idgy33c',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'xim95ux5ze6ir88s2v1oj26b2wv4hacvpahjm46q0os2e0hi7cprxp7cr8vzx6vpmzk025lbvu0wyjyrd484vuspfjppuj9mapfw0i6n9h2x3kn2tre64y4sw4iroy97on72haj8d27nfgs6f27l998mszz91nqz8p19wqjnlcio0jtdkn7b2whqgmowpthd0q4vqlyb2sxb7wi0znfqwl9h23mphbwz76ysjuowa4vvcl95hy7a4at6qe0a3xg',
                name: null,
                surname: 'v1q2c6o9lamy2pfdgsvtitzf8qtufxbpxdixbsmm3tvh7awh5fsr11pamk79meg55i66prtztc1gatbnbprz61t7zmk88fekx7ywpeavjxblkgjlb35h65ljcc5drvsygxwnni2g7ez9ro0hy47y9l21kkd0lnlhbzom10icom5yra5vausqdrfr6fi5hxu9er39dj1rtx3j3vr5ayhwmw478spdbpcpjyvgrrmhi8j7fstgavubf81couruqby',
                email: 'advlsf4l0zf7qu1kyup378qvyt1hq0h31hd1hmsb0p7844edkfc06jye8stpre1bv8v3sa52kqjakju2mb1kcykwfdj9d2xnefk792xh5mdih9vrlqkz95sv',
                mobile: '68igvf8utab0tad8iq4jyrne4c5kgmi9tflcwvmzd0zw5906u7tj97rpp46h',
                area: 'frb97l5a29bby3wycpwfpruc140ywymwkg00nmzgi8sn8ou0t47w18tz9pt3j4mihzvsbjy23q94w7acwnwtrjb2q6s1im7bm4sufmecwewzcruqfq9bpd26rah1mn82xukzndnmqu8hookl5n6t0r27a4k3f9t8slb2li50kv9f2kz1okoadizt7i87qaj1ljkfq8jxhglhn9pp0dy321s6vi7w7oj0wv8svjc2v4hnd45hmow3li285loaobx',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'ppxbha0s041x51cosa5rllw3tjx632emp27m3kbwgss6x06l2n',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '92hmkilwodmv1t6g3yti',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'elu9rsxfyeo27agmsgx2tk83eqbnkb98xp2vr73asuubbdhjt4kz1re9kdr0t83x7gp5chqr0tfhidi480inani6kkgl6kdk6ok3m0w08znjozz4frdw531rhavx3950mznw3136u4ruhdno5m9likhnsb2n9gznc4vuq0x1r0gtvowfemuitijoqrdmrkpvwoec5cuivb8txqjzdhpq6i1b6lzrgxszxao2xmzgx5gfbb6abhajtq05edxt6iy',
                
                surname: 'ofeznnqyrvnejge483h9tf92mbf54d5kn96zvfnkhizqz1cmwdgkfvq6m1tft5lzh6mgmsyjhvvectqir8yxnchy6relstmyf57otqo539981hylgxhosxfwwsoj0hkpg8c5mp2duh8dg7nuoyf9qryyci6t0i81z81p5qyj63fmdl7sc84hqb9fwzruni9gyc2wnt5161ue7c0xus879q8j06qe6of7sg8lzkdhz3f3lje7to8rb4g2jdu04cf',
                email: 'pem7iviy9w96le3hwj5bwz83iakzhz7ceusglpx13de9w30qm4gd7cg397a9c9pzp4tkzxwo9gu6ne2415ufhru3ungxwx9jmhmwzb3h12q1l510ih5u9jgk',
                mobile: '1od19wqylf9zex4dfmbq5za1sg9yeel3ukd1lm3wr2dcna6pv0xvwq61yus9',
                area: 'g6q1gdvhcodq967rl4ng02l9gewlm1o08vrzlovesfmu5pgjaxttvzexqxchpv2yu20wir1ljdfaude71vjl4iyqoj4s2zi6mczqe0n4e9du0fqb8s63ib8ebmp8xio9agv4h3z27r1p32hk9z20lqsst38n3yplaxb0i108lsr5nljzi2h9xy8xqucpm7d5flupb8m72t5q606o7jwyr5on0nskl3ayhtgea574ll11e7z0x3x41l0obsixm33',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'l80ps2a6enkebcgsvusi0ftcwlcsyxqj41x40febpwx0ck71wc',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'otykzz0j83cixe2n1u5t',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'cb03s417ocn7m7ya836zwtvyv8i3q4im3gb3dgt3ivqirg50quy9ppw5ug33j4fvnqt2aw9chedjyrrvzpniab6se0ruryjmarpu1grxnha7gs4vn7ey8ij26c77fquxvtuc8l19lmv5769e20w5gt54oeqwjyzk2gd701az78gu74xxu4gu8gefotk8te12qu2al7g1vx7jer2nrlxjq0rei9fxdy6k49qxkb29rm4la4mpiirstomw7xqrwur',
                name: '9w1czdeyfjlmvuqi3bp4vf90dizv24cab4a4khenyfitozndoesx9a9msh7l3nfnocnwh37qe0cihbn51d5jn8t7bejfljdsb50p5mm3p51978b62vahrfqzu6ht0p0gvhp6nbqqsk57th8trkj2wbae0pkgyzlz7ucog8aomxaqsbthuieu2rukt95alwx7vhf0q62uzxgwrrf4ribi5lpgwxofeuhy5tc9p7tpso1rw3ka88j3uiidfc9n227',
                surname: '1tj6puibfl3txa36h7w3571iq8ve7o3wyaxwvsmynnfw96wn9aacofhpx2xqoxqkhahytjwzjieeolw4q9naot0uohyjomtzuvab69krqarxpipbfhumztux1ts3cw4xom77zmpo6uum4q87fz1nlgq1i5qypecp3yqksjo32m2ehajbkzobju6xifj952sxw40y4jnoqsarijv5t7zltmy7rsegral3hj1gu3xzodwz4n6q53kilrzaaspbl8o',
                email: null,
                mobile: '26f8weq7wczyj6eyyz14tk6vtdabpphhtg41zmxyqrppud75uos1p3eikt0h',
                area: 'yte13g2lyycbrik6rpmi5t3pr94ffwvmor05kda0vpb2lna2y3slha6afg6mr4cjzbnubaxbbbgv3bkn8jeryvvfryk430bsv6vk06jim95gs0g2hk9d8ub3a14sqhbbehhscc87pgoq04qwv9z65sngn2mg526t38a30nronwfefl2miznzqmt7dw2m8tvki7nnwf6fhkdq5h1nsvdi7sdrpai6763n1xkzpcsvgd0kwioppuetqlwtrm6q376',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'k3unq1ypkk1uz0roglofxw7riwz7piga52g1eus4vcrugwv74k',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'iks7ysvvu1kdw2vr59q1',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'p0ad3u06p4zrjygw62z06hhlnmuhi0cmdfdqqojeerpm2792vvlpg48f2l6l0rg5nyruv6d8q3qofrl3k6d29sqb7nir7pxr2gpo2n6vj5a9bghqmq7e7plh2mrva18h2syy21gu13sqzk6val2xk880yle5jl7lhitzk1hz84kjaclzo5zh6dsspkvrih16eyurnmg0trmsfkrgi5d8vw6nvbfz7twnbj4jx519tnvv43zldpxmtq14264y7gg',
                name: 'zham1ihvq86a964z27r4340956mh3tzfsq2n5c5zaolvh3ymw539efbcc9pqfsouyz2u80qp1utiztn5l7qvxxr1275mzf9lfrpvxi0t8p091k23tjl8i46tfvjzeutvr6w9ydtosg7qfo0etnvep6pybdgvgcp1h9wasyux3vdtmp9130rc2x5tz39e2j57sz8epu3j7c8stf3ux74zoudveugorpbk8cco98q4xa4u1tjuml8tcc7pvrczm7c',
                surname: 'bpr0cz4fws7zm7ss94tbodc2ak9eeo45ujwpwdamjh5lmj4pezumvqu5p1sn7r8ingamu6z4cuqes566pivus9sgoygkmokcilfccuhe0pmdnbx32liwjmamzdy5qjf7lt4ncsgdzt8cvg2spi53aj9zv61cv2rz5u734g9lk6r7vz9h6066coaqyqmvzyu2d2q1ovam4fjqr38ka34l7g6aaiwxbxv29aj7xv83nu1tf17ohjk7bq7p3goblbm',
                
                mobile: 'qa1z7snowbwl6kwk6u4qqsx61qnoyvay01hvhykapwxs3gwbvojm2ufz3qt9',
                area: 'rezihlyfjoaoapm0ba64qrcquz45orfpozvhdg6q1yo89qk3ouilhl3nkdcmsx487uw732psvsir2jf916z163mhn34d2d2nsjfmys1pk7c64zrmrg4a19zwfutpopxmn0stu16otnecv56fh1vkbtx5cqyyv2xt94c1vnsitq5rc65gpflfdw1tw7ccc35e76upmntbr5qpkjompwmn964usf14cj5inn9exfrsxzmhlt6wjn1ocqg5ad0fauv',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'h53b4dqx566jfygfniihj6tz9ikylsj0u4n1caatytb9nqgonn',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '3m86kh4pi494iin507hf',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'dzhv1b5e5jf4v95p3e8b91vndwf6hnquyrhik42eo40gw8ymst85ensid421n2h969d57ikljwqe5thmbu1vd31fzq3a36nli8cnucudfq0uhnc2ag4dqrm4kgfx9tawje7xyb6jx3aiind61bnjm2qkrnzk23jz18140ab8hai7urbstm4hsby2vyxu7w1zg322gysb4e4pg73xn0xeb1l6jhzx3i3b8i1xjjhfjee63k2rotnqjnl3g9pcgj0',
                name: 'hr2hu4l5lzfsbb1t6yyy35i75wbcwn3ctfzufajrnbnrkvrwl2ky9fx8cwq7vbzjhlyrapspfw6lz2hjua6wzhl7efucar7o1jtn3ayxuadt3agk988e3zl0fh8mbu0s4mdydxir8tvj5e7zkaak4mno82gv3dexb1sntb5wj9ey1jnqfzlpa08lziumzsexdl2pkjjd2lca947ylgseh0ms60wi9h8x0jnp3s6546m20p0zqudjtmtijsbwv02',
                surname: '2joi77zhdut7ds9j2o8lfynluz4ywffxjsvoazv84kaswoovl0ps75rvb88ydgmp49xh9xq5895ancjcqxye6f8bde3uygwq0mqbyf8sl43z5fft71g54g3kd9jyhcntuxdh355v0uh46ah6f08lqgg8lcah93j2v9tizknq51sqq6eukf1qud2gl6oe1cazobhoxryacdfvqe3r8t28w75xyfrtes58ij8q0z9pqsflicx6ozh3gm8sbc8wjgv',
                email: 'qit4d6evgh5z3848o8p3aqv4hl05wigbmqgdzlzdasobf6ztjxlz6a90af7ugys0x5u0vsrfuns1zedeu0pgls5iqt5m1wln8x0pgja5uriqvs8n2o25l2f5',
                mobile: 'h5uzikl4lvv2n6smstec8qwj8ga477r93vsmhlsq06jzxxk8pl3sh1lh9ztz',
                area: '6xee8aw61smqfngy6pfli8ivqtjuddscg5a0rttutndye3jf31lpqg1x4x4s844u0fsazc7rus8jonrxqbmry8gp2bkocv606cpoccuxtmi2y7ajak7lozj4ur9guhuv6tkx73rqloeivesq6ogeiyrn91mjt7x9bp8126lw77cyikxa2ky6oj5tcr2eo0iyuwvihxnlsctggn8xumo87ywzeqfpk96ctevdt5odh0flfsiqq5qd247lskbadtj',
                hasConsentEmail: null,
                hasConsentMobile: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'mut6r2ilm9tu53667fyxy1a3buz3sxmiz0mkcgrmk3k5l0w3gt',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '09aqe2frgq2ahum8fewk',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'qpyj86nzdnmeqb0ct8wahs9a6nvrscimzqggruvi8elqfrhbwzyf67j7zipkv6c4l15od1iqbfbcflo29w1h43k8ie0kt5cjzu7n1vew1bmztoij2vmt6aarf1h9o86qu0nwcyx8pyqa6dbqcchild2nl87q5ueuosy938se44sifjthf1zuif6mh8fih9p2yt27j8373n9j6z29dzkjds4orj54k255zg2eed1nygaxwv66fmm2r7bdtao1r2j',
                name: 'h4yi92qosc42andh1c3uenr6miiuledu83rqiz8su2ny69ly2kb0b6hwfbjy0pbb5i7ifwwagolnm7cg8gqbx6guz7dx7adoplomgoadg3yktblnybjubaxf0o1kk7pthb4oayguo3le5l08q587g4k13delt3o9mecyo6r14c4c2as9d160g4ypq89dhy9kjns4a1xk505taya2dbg1gn3gcug4350koxo9zp83kv5y8tjhj4c9sobnb3eo9du',
                surname: 'wyg7l12xzyc7zwsjifkzn2fhyvafpxkwg7dhnsx907gocobxiovrfb0dxxykla6ozty32z2htpps7knx0k2aysrwwv2xq24ie35xicob30sy0f5q6ulmwdcsenkotxx2s5jndpoamsh4om183oezzwn5mbcp64wse1bngymyrhzgramqaibfduvbx8hezbckpg69epm3vlj9dpkmqsrd21amsufz5s9g88w87v8ojwpor8x7gwjvbrthgjq5001',
                email: 'qex9hxhg1rhcvtpg8he74te2cmr4p92f7bkrclg5bffw4vogrvazk1cyl46j6rsba7my1jummiz082ksetsr3ex6m1dca4kco9fdh8rr0wojtpf3oj4um9iw',
                mobile: '0syvbq9dfk3bzyn8hn3o97q2b9tpeqpjk6h0ehh8apkdcmemjrl19m82fbgy',
                area: 's1wqc0t8u7rj9ejaeuk878ucwq5d98k4udousozysb5o0hd20winzwcoht15h71ncju3v2pq7cjmt8uqciy2vqm5pacrjsrxcdfiyauzl1lf8drnypfhjzu75f0tpc232c8my4or1v1m3wnfkj7rsw8m6cpqhrysrzbjc05hkv2wagtu2ww1mrmy2vqv96dcjkfqje99nvgr0u7rtdt5uyk181rlan5xmdxww0y7fgn1y84k85o7gy5wgaj462u',
                
                hasConsentMobile: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'iv4z1msg2jz8dce7vndg8mvvdc76i9wb611gdxmq8q9l1rxq86',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '81xfplci54h8cozo7epv',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'aul8oyalfwy10t9b15tzqzhee70zks3ygoaexn6dt25kml12gyl1ifgckq6ovxim1qkdhb0awwrfmgwr5nmaengfvanbvhrawrhg0ot5uv8oysaxxj70s2w1nbn8or8swn3z55c8vqamcfivqt1ebcxivebwrrats6i265ekyfjppp4tx4jge32c38an8ajbccghyrny56vckmdce18mhhf8071i7ey2ldz4e8l1a9zw96hohs2ita5h8iqoejy',
                name: 'uw9qorj5lurqsvn8zisddgt2juoan3yhjx6bhnk47ry8m3fc6yb9s4q90dwcu1hl2dmmpkjoc3utojo8secz0gzbhbsupakmn6y291sbrosgtka8j1i0uzhjcd3szeuzflk4jd8jtthww7lutsimu6o4xdkpal52sq8jhyrhwmsy1es0gbrtrpyinnyi9zmgogdtpebep03awxijn6xalth22qboolq94o634k8cpcxklw2d32issyydsn6gyh1',
                surname: '4syghitk06ccvk89ok3u842gerxdni8m9ohejaw7kit5gvohhym6yrcbno1fntp2y9re9yjya11cwxt0sima30tl4xysjnz017b90j4nua4py6jk68ytkkkmn4eapicf0i6qmze07xfbahc3vl9zq949r6n7wa1jvtbmymvvt4tiuqwc33cdfkpyl6l4gak8hkrglnfw15naf34s8pozwbrf0m2viad5s0ns2v8clkomimd6p4vlzhu3tbfxnji',
                email: 'jfrgnn3ni1cm1nogvelaiabbbynn5b0vwkfol96b62qxtvmilgneni9toj2b9hbn7oj820gof0jfa9gzj0d8qfp217nccp5ef2pb8ytymovnc9xve6yw6yh1',
                mobile: 'bas1ib5sp5tpemyyxnrrlbv27lkhspac0ip56wwqajzwyy0h7t85o9ahwx05',
                area: 'xrjcdxriomvnu0hhc80dwq8ip5xjswir2qc6ksh7pg3t5ygzecxorohzyfl9ckl4mw40xz3hx31y5k496k8fjf83j8ceynsqib3feue6k6j5vbjr4ji0lb8heoyobeexjaoregrsq809f2t685vrx648e750csc29l6fwv9hkkqv571g6dwmk8ix5eao1u16hj3398763qn7z267vcnjivn282cxopep4acc6ilvempup2b1zbw2zws8zgalw99',
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'p3h0nssg281tu9hk7yscee8cactjbn9avf65a1k8jaiatsanx4',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'dn9y7aak3oaga1q1tatf',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '76qsf5owqy5emk04evl1oq6ts7gsava1ei5rymy30iyt42pxb6pwv7yt0jwfe8caszqy441rl2js56vk4lje782t3cx6yqh9maji3z949m21698hzrw8yl8rhs5rnet6kziv6gcp3hykgps8jtfgldfuc86o5my0zrg2myoef37xgu1m04hqyzg58bb342r7mppe7k9co4w34xiibtw78s2094pst4wawcb7vq9qf5hohhryuq7u8gqna0yni0m',
                name: '2i3o3hn7gquc76yv81345o4uxhkjs3sv3dwiupqu302836ju3zt2w95hclo8kj37nqpwzkmc5zzz9zdlkm2qgonduy7i59yqtgtngim6mux0bhvfqmvjiyngl7tks5gubszdk01usxgs4ecekh9opxlc1umznnsfex2l483mzr5ja7yxkmt4epxoxn7pmcy6vz60uxta5k7vdock4r589d2ay3cr44k4uvnpxmb1uqk2ohc8t90pts0uf3hvxcd',
                surname: 'qsamlpbl93bhpwekpkqo7ddzt8fu0iua9ygeb4wa6fq5fktp745snu7r2ifoat8wadyedl0iqf4x13qqqxwceopjaj1ygc5dz3b3prqzqhgyvtvckl94yh6plq2ojn3egsum6ksbg16m5x9jioa5bqphblgxnwol9s20mkqnm0ap4wmri8hfdnnq777n0dbvypra6hqk6qjqd96sli8s1bfkk7uckr5406169lpzu2l30p8uxvlw7a587df2rzu',
                email: 'zrfos14ameourzv77onr1tak33gjmckr29d238qpfu7atftdyog8y61zbzulfqnvar3qge46hld4vyfmzc7qf7h3q8rd8l63fylpc9fzxpsno24jo01fhr0v',
                mobile: 'd1xxl2s6od4mk54k2f7jr245qmg2b92pwz8fi6uw6fkvsbgseua8ete55p7x',
                area: 'rzf7bzsvc0akqpku2rqfsb39chni1n2x6yykanq3jkq5e1yhhi8csqyfkvjwj386hmyip6yv7q9wnwkwemdu7iiwpttnrgv7477mwomwe2qkkmd00s85m8nmbitcspy7jomrsax3h80yojmh4p19m2czpy6p8jno0aft0gzirjqc0d21xljjb8jjqdecfh27qb74u424zds087sxyn5j18g9ptfmc3q3j7h9lbklwy0czhacqfwjz4vhdltlo1v',
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: '52qeusl3k8ei0a216skwvrblzuuat39hrfp94gg8d8i6t6so39',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'cnerbwmhj7ht7pa0qww4',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '2fv4w40kau7l5huv21f0mvbr9olhii125vjzklttzg3g0nvmh99etyn01uh9u049yv00yf47l3bhbiwv2e00ojfgm0cdy25hqnqzt427ym2mykvihw6nthqhxucrb5va4dcx2cnkpse01viugzsltjaijljn7gb0zpf9cc34yls97mjgxt21kf79i0rh5ji04tc7rxunll5gk44xnsrxa2530ybf1b1f715iwakqia5zec88igrqpxnmytanzgf',
                name: 'ekd23qp0e4uqnv0v7noyj7ean3j4smgvf1n8acbu2sat195sy288pplxcz1clx9owhoc7d55ssuc48dkjqry0rg74r52bbix6nfdvdj4nv959yyhzo28kfkkuh5t4hq0g2eld8i62xohje6sn8if0i71jysctuau2jxk3jxtdr1oobel6w5y5xjdy6qbuyyxf96yu5t5w7mbetfqjufkfdb9gkhp4pz3ag78uba6ld0p68w21lg1s8073iiq4wa',
                surname: 'k7sf8l8ioy7nuq8khb2dam15p1yh2i4h31220b7itm8tw2kiwqh6wqo147g0hry44vgwfd8ykhl3l8d4ff074y8aud12419nwl0c7u60xknqpdyixhzlio2jhhmxenafsb5r0igzdxjp4xi11khdbe69dbk46wliueqbjfdnfij7ngnwfcb5t2m05b7j99g6ra6c2nczarjvbgzz5fxnclh2pezgg55pvrz84bud7aolle30p7gl5d7nfe7jb7p',
                email: 'qftocicclfwu611e5u46d6op86kpa4sfevg5v15uvgln007g58z2dzamrnc5f5arrrszp32g7rw4wqjymw20bss7l7ekqa5muyfondo2mh7948ejxyhq425m',
                mobile: 'jf6xob65rkph7805idwuf21lqmhrk96zvpvsk28wedbtbwkuukywp2252ycj',
                area: '7intq5zc67ggfv1lvya3k6fr7i3f272ajxsvdsxv8ux0u27oyoz2jpthefm1tjtlx0ur4ykshh86pkio6xkrayylcdvp08omkff9ot9d5frej67htw7hofjhjcvi4v5fqwiqwoccfk4oqekqkn5fxxye38baofhcxw5g3i8mf1gys4lma5zf1mtqfg27lcf1go09gnen4c8v4s4vun4518ugn2jpji7kdfhldl3ya9got9eeegz1oiyehzxx3cj',
                hasConsentEmail: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'cr1qlel9uo4tzdxqu894fvo6gkv7blkjsgmapa0sgg7w00h0p2',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '8b80t0ighw4yvuhuk1co',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '31a4pfsxwlcy2j8dokhyst2d0013dhe6j4gjrceuuozl0nfj4z3s6ay39qx8woy8gjogl437b3yq7q6u4o1eln60hc8yise31lo21i9x9asroli7zlxf80hpjbkyb7iv0vhfylw58wot7jtqsp2rau7mqnqy0w0h86urwlhx55qbd65vb9h6hycgnqef169whekctoypd62o4tr4us9aucs9kgwp9agjzy13ncw73huz4z37kzly2glgovcslny',
                name: '624mxr5k4g6dyx3payt45oayouoi1vpsvikp5etualumdildpfb0vm4zp7eu19y66vzhpvj7m637upuxag7a63x5khdzwno0csllvaxj6hmmygbf9yxjohvnmeq93qvdpv0m5nkre8a2tf48h1k961zmv0h0ntkko9k7xyjj8p4m781j94x7mw19ynlrmmk3g5far5fkyfbxoxj5q640kykpcfh82imnbwlsy4uuzrf7uv1l5tnf32e4hrwetmp',
                surname: 'c1hjng8sp8yrwxxuy2a3hzeg329glp0vjj2ifqk3nnm604nqjertaipui6st0p6cx6puqc113xjdcfw55hs8gvlvzgqbwbpmevk7q5cqqntf03zvpbzbofkj1xm2tqkglmxs5jprdcgg27qczjefn8l1kxykqrohoxf8l0gyw2tginsez2kdut7w2hukcqw9m3ufh9dx0crogvrstyjmke62ol043ervwts5sjj7secne51nto79d2gbkgnyyk9',
                email: 'xj4bf8ryfcrsogr2d3ypmzgzjf0jql3sji5sjgcu4xbeu27xsno0w7om84qa3nkr8q83nja6d8ue7w3jewa1tb6aa51nvogy77i70snxtkj14q8ovdde7and',
                mobile: 'g003ag8igujcq55zz3sn1zgk5ffls0naqnwbod9qnlc04irb7367hbwpjtm0',
                area: 'shah1ln59afzd3e3y9znbhomewdkdk8y4agthlw6405kbj5w5pgspuqdhkwzmuxftez1dm6sd5x2p0x913n1nnehfp78cayk6nqykefxgu56rcva5oo9lf89o7zfk009x3k0q26f2l3wc90hlz01n6kn8erfb6nbjhieral6hal08lm295irdt8vb0zthc2tzpcadr4c26zd1qes8bqroatst04sw3nboa6n7jhx7f7ulcrfz2km1fty2tja5yp',
                hasConsentEmail: true,
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
                id: '7pwa8v0n5zo14451y8bxclpt8s5dhflx7i30m',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'zhuoh09uaqqaiht94gc0h4w8y3y6jxv9z9iq3g0qjl68pa76t1',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'iq4iooupb68ytf3ru75r',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'ccb3nphjv9a2dkk4k08b7hb1qjd9dz5x1adwg0ifcgb8ml1u07mtr4utpdntzk49tib24lihe0frgu6tyj0beqhkrh2f67v8pth0br0yki6l6x0cn6zqh9eutfa13gedcdlhvjvmbw3imes199feaaffpgbprhwwigu0rznydusgjvonvsrcc80p8gptqiefp2t9e8owgq3bo1w66daamty2mfg0a4kccpgijobz8c1ho8k41a05i1moaxmfri7',
                name: 'ygs569hbeup7ne1kh4gjvucp5affk4m4ihi5diumj04joyn9wpb1cerm44kuziujmnwhlda7duk6uuboz7s1d4tj09im083uxyx4lf7aa8ac0ghys2z9wwzwuqkpe7cef9p84uklltsljpzlp3dx6vl0ei5zfdxhwmovcib7nd14mi26sq68c2mpog7nvw4ol84pl2ghjl9g25nex20l24lf9e4gnwkppd4ce3n5xkrtjffcuvzhqpydc7fvhqq',
                surname: 'rxvpfejt7w1wne16abv1xg4qfxtdbunxhy017y1q7yeil97ykdox7898grqjhklf56i1oai7972xl7j9pvz50m9pd4fm99soaiqyk3bgfj6woufht23x2jh33559ccnpr3xfxwatviclgcqh00f2hrdht0avji84e6vbq6gi271iatzretledxewjt8uyoxaqskwm11rbcn5aw91blc0io6g1die6har8gi4dlz0ejt3sm054yoh2w5no7tgdi2',
                email: 'uv1qw4u9o1kt7ncaz06mhi7js4tj5tkudla9s9gsrrlq3a39jhqv7drenqlur199wijnmtrpj5dk9n4f8igiepdg74habaz5oi9nkqqp9h48n70puxyqmmrl',
                mobile: 'w80mhks4xcrv4egl5c72hg6txp0w6xd6gbkdhwsj2025tdobhz98rgb0otc3',
                area: 'c9kwd8w6qgcza9fma4222i843wimd4p9pujrykrwgi0enapjxulcizt5egau07u1l3knaiffu85yaqqs2jjr9lnbwb999fawywlztm61ef1eal95pxud9gtbzerh0ij508fw9rck2c2roh9wtfmkqc46tfwec58kwdw8ihx6z89q59ymqilw0n1pdnbv1xlmuivdgeq7kg1b2okzaoujwjgh5gs5abqce3y0y8wv8oepgd88shji7l27l0izvd6',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'w1q9ur8hi1ivgc0apkflgkosl2b9f29wqxw7q',
                tenantCode: 'y0zwdekui0c3ntne7qrcnjo52yuh39nk463gvw1g9gafq12d5b',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'iapqb4lhxk3u92gjbowt',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'tb00ademfddvu8gc5g1v3gx72fnzbqabq8wgyq5no7ia92o5il19uadqw1wcvhom2l4fs72vgb3rvo2jhqifnqujta5ugn9rm3mv8igsb156mtdy8p58ld4r7x7cplf0eng9dnmfpwikzb25gnaareu41p0fd39ts8o2ufvmk5ua4ran9tkvdmsl2m1nci9lcp6r2yluyx2ovzkq85mz9v0yj5gns7i3ai2yrk2mie0kvwk8jawrwkhfwcrls3x',
                name: 'eytzkxogg2fzu13kgzxn4eq59v6f7za8qb8m6fxemisk8yu87uhtk6g1pxgbqq6o96xo5cusyrj0q8gi1ae8z9ia0ossu66k2xuwxl1sbi9jqso8p64elb5yhczi92icuncbgzi0cift8p13twf3jcq9niaz3py94onejy0pbtfvxowlg6sp6ah5nv58zelrqjnm653kf42dzu8o25oguei7ntwmb6jnijptzl5i1jpgj06mp8rykib5ro5how2',
                surname: 'lgiepd35v7x3ensrlb06p7utkyypqakylq8rr21nd51mvseb9vfi4bko30m70gc5ix8m89bf35ne10d464nc5xccndb4ty1l40eqk0gjj1ohzjh0yhick8fbjiqii0svq1h86rqa7vwwu83w1qj9bc2i90sf411rjnhje9hsgzy8agy9855z1pdl47wv1m1b0vceunvha9ke0rnc6ygv0q11vo5s0roemgcvcmofw50hmqyrfs36dip4p9ku5kh',
                email: 'd5hipivri45ay2v4wurmnan9zdjwj3lpyh8qsvqptgbvk4170bdxvdl20yft42jdxb9fmxnq9v8z1aacn6pt95lyaq0jgjebsxbxwfts02ajbkh84lemvhws',
                mobile: '0n6f964fi4fnji662aw4167juwe98j46h7qothwkd4sf53ujir8qlgnzjrrh',
                area: 'vo5hpxmpxff6e3zqg5jvz9u56z3x5un3jdmhmhr0oepak39awburboi8cbydoeyfe40ita7h0ppsj5x4bal7zti1u40atxl26joxpm708elxlt5573xdceme0lphs4w0ezz283h8rpfrabmyvbxin47q1m4dne2jwra7b30165dbt1s3449z5ak9zz00l1ylvom6d8so9fmp9pocaro01u2d2hxcyptb0j13ri236ber0ov015wceoz2xr5miab',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'z3jw357j53a37r9yv3k4fhwh270i5yun1wg48mj96z4tc2zg5e',
                systemId: 'bne6h3hppjrv5g769w9o21fd5aeuhi2fhfjt1',
                systemName: '79n430y4zuotbubpcdi5',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'a9qhr1bcppog8e80xir7lw2gcm6wuzmapnprxnlngkur84mq0l1vkol47ep3vvww7y20r9ymv7h7x7h5c8kd4zt5ye6e1wz2qfm6dlwingy6q8utb7ynglhzbirdgas5cudbbakjbin3665sgsaano488hz8vv7hsmwpz0mx48qaipkuz8jse93r9v6v5ut29i80adqrdsau31og1eqjp1wd0a0qywwx8orfx5iffjot6vn1eaq4oer6wyt0a5r',
                name: 'sjtpjqqrywb048nei8qfh5blha2p8c090a9f7ilg0npydsz88gudxcoebkhq92c14m66face3vmqcy1i2rv1uiczuny5uxxanwkk0gi5icbr07emcnql9lwk7xpxiu3izxqnc8sh27ar3yb46d6lep7bwi5n1wna5fhdufbqfjxshs7gxzrc9zzkaetlim9y16z2yjotows8jhrxsja4sqx4w2g8vc75g4ifvb0029ytxyquc2iwz644htt0wly',
                surname: 'ddjxi7ojvex3m6719hrf2c8l5qnlm6i51jbrpd8m7362p6gzo31pfvbw6npzr3x76eqm9pzoqv634x359743behh7kzlayqr86yy45j33dyujd0uzr2gif43g5aswk1ynonay3mdz6oe85zz4kmqxiub0m1myynnitktrt9o6ernqce3wwa40cbmjxdcr7oh3yicvm1oadrbdt3askychucw6931xl6z3kl41fqg7exjsemo88fp8t1b10zcggn',
                email: 'zsblb0fpg9h8jj988g62z3e36fz9uyjlyckyb77gmonmxywf66kkm9zjr8xq3jvsxb362p75e8kv57uzqgpcjf6lp1xzs79ej8y3fy1bfzoiugfytrk71ao9',
                mobile: 'd559vlbbkvcldot3g04jpmy471jjmbw0mh4oxc7wne47j9b84lgxt3ktnt5c',
                area: 'py1jeruev9pj5bw8eh8encqp63arzv75t0wa2qqa93lat2vvaz082wond9hzwrur21p5xibmor4cxhjk6tv632bt0i4ei8ub5lvq7e41n1ebz6ozphaiyt4j7jgxcob554lbj49uoxdj1cimh7mbajgd03iearii2li22lgg698u1kwjrog24np7hkx0t8mnq5co2tf066e24xsmpcwmzo9gjvuwmv9ewl7nnocv6jdpew5c3a9u88aqpp34bic',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'cy997dqglkkkm4x2tkfhkr0h0gz82ew3ny77vj17etcfq30or4',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'yzyxf24sid160wc25hsi',
                roleId: 'a80rkrp7jpivu5tdbec6xdl3144jz98crx75y',
                roleName: 'md69jlj4mztk4tl8h0aqfio0d5f3tvxjgbuvw5xvkcx37mhww9oc4uhrhngk3atzn2d45l3ngfas6vxs5kgujk6t2o2wzcf4p6srvnoef6j5hdw3yco2qgh0n1etawat7ntndfsq4vf0kddfb7q2iivshxtcjy3h9dqm8750s48kx0u8aiz0otea5gun4m0ugvv2d43wrz1eiejjvgbvzjpaeevwb2juajq4my0vydipqpw0zlpgfcx7u2ahewe',
                name: '7jdpdwd79obus8sas5eccz6xv3311v798d1qiarb2hpo9rnwrqxqn23eqqvzqd3yuodv279mtwspxb26356zurs9clw2lvsrtyr12qtdtqlhot4q1tzngbkhy1irhf4rmz0zucljdb8xknzrop3w719wtq1sj8zewwetqa3k23kokheofwtsce66oi4ngta5w46282xqn96ht26fvnncyyp8ac8qe2zrhpx05hfe1aoeolnbamloqi65qpm8sv3',
                surname: 'cvocieliksf40wrv897eji56ocxcnoro4n6sdq4a75d8pj8bb0mywdlcbg6jpfdku2qilfk8tg2nzrhu19exbjw2txkpid9uxmkxvt99r1kbagl54odxsozr6wqawvmzesgb30ivdltv3xur1iud36cyplpa4qsg7qadtnc7map7m7rdcuv17nrmwknrjw9c17q20ci6x5c0nm4qf4z2rw7rqxhkpiwz9im4juat7k39tfq8s0iswh60ywrwfqs',
                email: 'j21kfatemrvg1c1b7vkgq1m9pyqlh31gvt29866hswghm8iyx4rhlv88tf3muslkkol3gq0b994tw3mil25049iwmrtccahxkew4amlsodbs5c7tkylv0o33',
                mobile: '1f1dcduhxqxsd8v8hjjy8wsw29103g69hrs96o4fqhps2dpk475eyhe54xlc',
                area: 'fuspe93o3523jdetkow6vak9fdfsgmeng4ls3o5k5y3gwynl3m7wu1mukojhdhcneijjoq7lpah4282w6zh07uzyim0e7q2cxh70xgsv0tl2y4m0i39f8vu79hu899p6f3oy25j9nxplso1onlx7h70pdirsg0sce237c72dbhqf09vczaxcmht1ll8w0c0x8gpe1z01ic7p1y8t012rvgy08rv9rqph4nmufwggc1anjh8srx8qhwilr2an9i1',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'gft3uzc8atn70k966ltaq2a3eqx9qlefm54rujiabvkknyuq4tn',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'qknnk6w30sevykh7zey8',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'hcw5edz69518yu3b1slbjq1jvy8n35rvjofheettboctbwne0rgs0045c7psd53vb3ufh0atfx3d05cfouoq31y7b11niohu4x1qw1a29n4qsiphrrxlrg6dk52o5m9d5embm8y1i4hnhufej15961c9isa00fdbiffwmkooujc6tpvhum65pkviz4hbd5fe67g2xfse7smytvxuquytco7lbhe9u0w1d3nr00zdjxgviq2nyutlk9gqwptl1yq',
                name: 'y0vsyw5obt3bwp0vx3j9c4kagmb1nneivmvrdandle6w6hiau3qbchqnrryt0xh944aog7hsccbet3aklki3frvhlc5jrdea05fhco2g3b8p6ig5qhp48kh7ppbh2sq3nkaphuar8gjt4c89a2irilrhmikremjcrj5s05na0pf1n8odnnuc09zkd9618w6q22edfl3u6wopzna8gdhpt3079ovh1udo5gc3hy0sbco2gk3otassxcoxly4g9gl',
                surname: 'wn660dlx5t60ygc03i1k30ibt10x562vu3olux0bjigpn43y58p0zzdw2xbhl9v6il8cqpm0gqrfnfoaaj1ook6ra9nngpi56kakkj5ziu4szx6vj5g1ujn4vha1ql3vn25ifg0ng0e2ls24clp2rrkecrdn69ax1jf4qznf1ml0wkylroxp7b3mydk1cb8antjems3u4oxyn1e9m4vbpyg8z3p2f9q7zvsm4uq4qi2zfnesxfquwwvbfzxs2wg',
                email: '5e0els4e2n290gflezwddnusni5r20k4sn1953ydyf8dr5kby5wwsqkw1t28ptaggvm24984d2iujlzydnlskglpo10zoa3muzphq9uji7jy5r98m0aakxgd',
                mobile: 'kyecxkxnzizmvadgebml78rdovw3hh7jd4bei9nmuruoyyzx69orlbw6sx86',
                area: 'cq10uvozav6hjidw5jxdpzm7v917x2s1pr9rvaaj1u8fc6hrp4aohxeabh845d24odb66toldp245os2g0dbwbk7wu7xkgq4pusea1em4igq2uqdr8z2o20yni8xnt0qzym5vv91ulz4eif4bh8ac609do94mzqw2qqgt3izgf1tomi0i9bixahuth6e3veojlqaq8pvsdat97nx55v0haaxskzttmc69xvpuhx9lm4rn3ue3ubydzdt7a1kdgx',
                hasConsentEmail: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'v4gybzh6roev3cgpnzwfgbmvzux48bxxzxf57c1g60iu1zi06x',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'dy4ft3otxt1qhwadxu9iv',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'zynhdxes8vmyhllsapr9ezp0ved6q82z2bsea6s7vxmt99o6uwuumgiol6vz0rrw8zlspwvp6x0rv5p46t9ysom5s5ayh59anlepmyqq4clholae60xym6izphxguj0p4xpc7l37tiafyg3o3wnb6gwgiz8h468w6mpabgifz28n678qf0qokbtybq0d9ngpusv88lo1pmov662ope4tbyvuu89u9sn1m3hr8uy21xswqtlbzwyafny9j1f2i83',
                name: '8o5ydj2excq9dd1w9gaach6ap45wdinl0txtm1fmh6lpmijpmr6oovons5k7enp0k5r4wu6h01bzpcdzfbxvdnm8efdmp311fwcrf797ma7p9e6ibxxey4tq9abwzefxpkd15zq15xeymgug5ncb12luqno2k35mc7ga0ddvi7nzoc022k7q988pz57jkvvqylfo6n3f84yyewfz86q6gzoptig67zupkq6tu93x7pc4qe9r266s6krnr9i1kp1',
                surname: '0rs69qssu03yp6nv1f30szakuwut2n9j42c2qmv2hrljnmec86p4byfugp0e1eideergmeua4fylrfihjjbgdl6912buw38pm9b4lhbqrm676qhphgqeaqxzrn4txixako5h7hzpuwkuu0dig8afi0v2zmab7z8t0v6m95ms7gtqzel3eohqeffdais9ks764h2xzdce7bm8odyig5oefr18g6u1bwgfhevqbi6dz96d2k1y3p8w25eyu4b1zc6',
                email: '3ai3jlf3gq50z9wscdxf6m59qkgx6pp4syn6asfqn776ns3imq3zr4cm9rq7v2yz5gyli5vplhcfz3nqb6jig6jru5v159a5v4ute1i73lj1bicjv4otd0zr',
                mobile: '3374okdavpskykg32h70ia8vgnp29g8j2ctch3nxx9k13lfst9irdw08duc1',
                area: 'pymulmkx9ozjg2nkl99w3yyoc8pgjs93a7cp1li6ndoo8zct09g13v8smpy8s3mo4wxyh3vzlpr6qz15ovd390o1urdxeutu3xnvrzqjkllyfxo0078r6hu97skngd31senn84n9e1y30d1it9fb2h9psn4dj92nhrd3mfloi05ax0rdp3w1jw8tn52imq4wq557ym9ef7nrjrjunpq7ide6t5bk8t2bbpic8dlaly1c1b33vjqopkcu945kazs',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: '93m2kvj2us55tq7zhrt4ryxxq1x2hgbpdfzyikwmeow376n9s8',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '2q0hv5nftphkmwyw2afi',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'fhae5eqdkr5icjshalw0faqf56qduojxwt7g78ruq6bk5cno0lhqu2ssl1nhlu1b9mj31cbrkh7gz3v7a904dhzbuyamura42wisj32zg1hilauyq04t9lo5db1txwki856j1s1934r5dh7e56m5ilt058atdv410oxfrztnura0415prqx0p4exyl9ns1ymcnw9b5yw5nrtbbg8jli3le9d5xdj8qmzgaixv2jd1ujgx6mseunslsotjead3h0l',
                name: 'upklv0kekgo29z6zhb13ikiafshsyac8pedlps7jwd68bn2ss0blrp5utdk8haqj5mbh31gk69nw5ltioif872kqctjbo05wt9ohu7x44ekp3hdc8rhhtzmclay21w5ejotiujiz4rxrfdoioia5z22joerfpz1gn1xun1yexxq4hkc9hyr6a4u9r9dfdykh4yulji0xn72wbn9he1uye5jeo9iae86ph1ny1fmojv36vzvppbet4vrug5ls32g',
                surname: 'ak5ceqkwgg4le6r8ym2nydu93tss4go1v2mqv19vyxano4bhujelh4ryzqm3bm72ewa0hof58d0lec032hy5rmgkuh07m2aocazl982rplelse5kf9j99irokqs46pwy2ttw79q536ykv3wfib9s5n8srov7v3525u1gz7s6h0kt3wbcpi6id19jirhjzv93bsx7ybuyy4xl0iy11xp2vg3na6a8tvtbqtr87roimy9l28cn0uvunijk9h2tahe',
                email: 'c8yojo1vqvjuiulpgyl2o9njo3f04sk98w82y38st6jokoote36i6iv4npui255nti9xh5como1yeukxp8u7x6gr02c5c2ny33d8zjyqei3qg741vp1qoaia',
                mobile: 'n61ytel7uogtti1e1pabjxfx10ylndrzbqilj9aho91mgsd892qbrfn2ig9t',
                area: 'agzhaglpy4ffwm4gy4ghezk0clg4e1a9i2jh22lst4ccc8qdjpahqni5oqmkd1kcikrih17qvelg1z1kqex48598ssizzpenn3v2qwhbubd75tup7wkizce17avx30bvcjt2af2xstp4ywunmhbz3zbmes77d5flusi62b5348lbqtkay9z9vq8ytyoxv1q7ts1zxe3vqmt9wj5emf77xoirgbpprcnjz96jlgzhl9h6z502pbmzpl24kznhqjo',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'tq01pg6h6z3656eyh3ra39j4spyx46v53u85ddlcm3pvj6xmfe',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'ohct5grqn6urqh2cf2ev',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'p9d45kwl0wj5vw1djnyqrtlpsm4jooa27p0fnkm6mnkxiq4dckanftzr8tc2xpg9okeim9567h5eeywfrt9075bfq8rm417u4suzz1c198f5wb35ylbr0074eivlee31c7ae31bkviudfwwloz70mufr8u5nv5g9s05w7e8olwgekiqple4iw9t7kyaigm294vx3lvcnmexs0s83sq3y27zbi3vrj5ikm7gfs9n9vq8qffypxm2mikjaiuggpm5',
                name: 'xj227junaqri9fginx4vev2kxhlihccxyqlef6r5ovexbdjiistbquw0e3bwk79trsqhxixcc2wye3rvzm8ivcg9v2sl9n5tghutycck1cdib175hxzgecxfy8f22aso7k3oxtsem9w86mybevtzp3k90aemq5stvvey4x73odxznsb5kfp0vjybqypo1bcufuk1nlsdwwgzwiixssyo5d5ik0i6tf32cixxzyz5bmgalnw45alf1xd0a7kw4b62',
                surname: '7fn5gx413ukh1xf1s0xxxr1lqpyyywnm2qww4penlhaqbna936jhxg4cc65xcmh7w44lcqy9dxkij5pkgxw1fgubn0fcfnncphgu9n03deg2qclmjcmscgfinjlisp38dc84zebdpdz8gjbapmp58yk4340o2pjx8duc4045oewdjlrzuo7hzikvz5cesb09xd32vl1tyi99ro9df9lvc811x5golzs1eccm1n1g6vhs0qmoh25ciajwl1mfk4t',
                email: 'tyuxgez2cyzexlp5vuf8iwnmmsf8ygmfk4y8jzikdbojgyqpgajt61tpm935v1cbkg8o1wwqu8xwdjsdwsr51ou9meqkcjb7jdfam9404pwagdgwpd576ejj',
                mobile: 'y7qvpdhxzgp60h44kt1emx29fd77e3m0wgobu96z9lawhbmk1c34yvv8mogf',
                area: '2gpmp8qjlk5rsxub8nyuf7fnet32sys1jhwz0anp422973xj3wb5iczi2c7x7epmbzv2mwvefxuy4awucsug2ozbpvdl17htfj0pmq7sz4jdyika74cnvj7sjyj6afl6evhnmhzcvs8uutfka2doz76pzmca0qoi313fvzey0upxeuvjr2lqe5xktdkllmj3co7ds73mmjl035a381o7y1f51jq19cq9kre39586b2rul97e98jiv69i5unmeja',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'a287tw1t2pek0jhknm9hahovmvnv920t6tb4iz5cd7k9nbk69l',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '3wsu65f1chzhsrrct4jc',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'p5keal69b3ewucwrovkr1ha102chuew59v98s9monf8duqnoju4h07ew1l75pjhqnzdstpq5agotyjhy4pplx2b1alok3y9xww5qb06yw0reole9wc16wut3jz61099w3lalaq0zyilvdz55ibvnyp23x8xv1ketccvx7ps0hp97hf9qys98cy55zdyn19ytdrz8e64ty7bl3jk8xzafxcc09vxodm94chegioo9ac41hm6pvdrvijzug3bvckk',
                name: 'amszxkrqjip90n0yrjcgqb3tw0193v0w9nc07kjy8omhqp58bh7p8nem63zqvdxt2tj74tqyjpgd7e60euzx0klj0bypfwmbcx2489uvz089zgmt24j4z297cwhvp2dzdf2d9hh5bhexztjti1cimaxou8oqfqcbjcs1af9ei7pwgv0w1zverhbzh6uqej5jlowu2o2p4g7hr9cc9ralm2goa9vypgam39yilbphr6m5xtcottqjl25t66zykwa',
                surname: 'uyrszt2v9847y3uumaofyai3hlt4umb5jzsknticwbxm43lpyaumkpidvilbpcghigrt1k5gheea15maw8tge11iz0u81m0ya368sf8o9hd1ylzjxkw57kf1gutrqgju7ivsv1e3jgkfv3ou6w89srcj2elva7wtupiat82ao00mmurwddcnyemwcdib20in3s2x9xsjb126tvrn8q1bdf9vtf3pjejyy3y25tv92llpyuqil2jfkiirmwdj3p63',
                email: '8c2hypb0rrbrdrpfzobcjayywcrepfo43mwusqn0twqe6d5q69pn1r7nvc2dco6hb8e0jy7mev6ve4nzhmyuu3nhqk1igzixfjvec2vnrnk8mmo9c80vc8mm',
                mobile: 'nep9ue11hnsxjl56y7ow3iyit4ik25h3zq5eeuty02fqiiy2vt8vg1ii2c4o',
                area: '7p7xs45dqrv05w5cx05bdd683rfvwrpt7r4bgqipoldf45ufpaja0c6aoad149zqxy47kwavpm2iixlucn598n6slsa8aq6n2ae64zohsrc15cwogp1s1dzombrjos6c5av6vn3b9b6tnsmoihq5l03yx31xfymol1zs3ofpnx5wj6nxnc49ung8s7jqmu0vyf347psq3be8rykshw6flb0stbq3xfckk2d30jf7lgedspctew802emcwahg99v',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'vif6ltk1ly79iifnekx7do0xcnrcc9j4cf7bqzqlrj571imk6c',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'nnpmesh1viz9tk70zjk3',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '08osrx45jvybdk49ehn3e9y92bovkzrw3vcg3yb2gno29dssghnovdt22nbx67lkwhmn72i4q15fs2849h1ut3a5gsudcbm8s697woowv2d3kxzsww7wvelgyquwlbnqygacakdobkwvkuxjvx7k6knecrk3nurnex7x3g09wp4ffjab35q3ioxdnofazpialq2xsvw2i3xr8mf0e6sdq2jsq4hbt6970g1uf0deyoho8vfih8dj33oqk1hkrz7',
                name: '04nyepjmivzj5zik3x7pkx9gjsn0rwm6a6m76yq00ijju3ugzx1membz7c00lew55cejsu5l29ppag8nfqkhh3ga71srq7jv2qe6mquec4fyjdkjr325zklzq0wus4gdbfg6jtj1m3z74lr3gz1ynn9a9zwcbr5xgvtbjcudofszc57sp0gr70omlwot2jxdosz0n6re22u1yqjr9fh64bfeths3htxwwpqy9imetliszazzzht0vzm9g4j83u3',
                surname: 'f5j70q6o1rsy0rkj4g4dvqh6xpbkzuy087xrygl2ernbm5q7dqr8du8i7reqos2f7un0vqmy443ru4rz8siybtemnzmxuruunp6z4hj5iiva0ooijfg6y16roohb53412cjtm7oofrjh5ulxxte5mwprfm4ch5x7ul9kdmxokpczdj61ssjkz8bnbsnockcpixse4l5edvjo6melrzkbqbds7uxqa0ocgl60wzgkxk52dmjdiw3922grrf39uog',
                email: 'cs0d4qbprmyf1xa3dpb2mzsebna762637yq1xp5ln5f74jla8oekj70u6rjgzd78uv7frr17fuc11lzxqb5c1pib20z8250pzlbkuwnvsam7bkho9ep3thwvu',
                mobile: '3n4etc4azxxsa5m0u96juct3o1le9159zh5estmkxef83tsvxix5y5gjkomt',
                area: 'diklx5lwbax9censegc1bchtkjs6ayocelqejsnk1g5tyop6yz4ht37krxtu9wb4gjuz27x4j30vres401a01274rg6e9ccm07xvxv3lsp114i0ki4tw8ll1dm2f6scohpo0wfbh6jzy8e30r38ebkyp83ksewx0vbnuzo9lhq996y40na21ek83arujwxvij3dq0zy5q3e2qlin44g9rpcuh4zccedmrnvl9qaoz6h1unx8lp3x3etqfti8ozq',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'n4fd4bwx8142fbia1qjcbjc60e2zpxy8x9sz6p0vdxxa0gboqi',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'x4srxtcrz2h599mqvjgv',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'qclk4mxoadpx2k277fvzrvjv7ojcvj365alkzjusi3o0qjm603cs9eoqojx7l5giabenf22lithj6xi1fwhvl3uipgubo6fk9z3kcaennz7ecmzryei0cilu8ryt2n6yktio6k1f7cx0txdlve0qy2tdcg0j7tfs9ceck14iprnvhfyjzk2idpb0ao1taiu7lvxng6xnipm9oqb34ki18coev4rzbwv350e7gnqj5n366w2h04j3p2c8kdwxt6z',
                name: 'y8q3sz7kmyk6rkthyf481aegpbeni2zlr3hb5f7jnkju2f0vyyp43zmnq3prijip2rzdf75pba9xwkj2hzbfudgcusaxq772kqtzmag9cv9c57yizryj4u6k0mw8h94h2gpphdjoy0fjwyfbee66z60ao2t3ztlk1xmd00u24d08pe41tgtqu1mmwxgi65owj78oi25nnp1l13i7e4n9rvv6v20nzohnoetcqfoevqp64pqf0afegtry41x9dt8',
                surname: 'y16a29vqat7uuzg1g24hrlqyz7myhb9er909323as2yg4avi5sic66d7knu4rrt4ngnu3zi8j4zubpbqbwrjyd2lhcluc7cds8smatqjf901o4d4yubsj822w0bbm7h91i4fyu6r8ofcxfucj8s7a808png1a2qam4fut5lg9cv9ip6bp6foqa8qll8k52uwz0hf5iz13jfheqsmgeo92mgxmsnjs28ln3b083xp2dtfafphevjra3gqfxv1oud',
                email: 'p19z1w19frq32v0xoun2sv7i2sq5ps1i8aily8odo8im0faytccyntljskbqrov3couf8g1qraw9f949a3epuoz1qy9ix6g37f7p3rhu3pnodseos741tuge',
                mobile: 'pncijkclocxmqj9vj7uxbenyzxn3r74uvfhbh7jsuctsezn93duvp1lvqrzrf',
                area: 'm24l7uekkcwm3le1ovp7t28q5ily6fu3bk7egyp4kucstwb7j9epayzo47xgc3wpi8b86w5f0209un1ynllm75br0s597qmezpmlbmgekppuldp3tg4gu3yjwumpv63pez99j7t8ly9o05gxftdi81yckr1riemhwpe2abdigumkuh8d9a7bnmxqxqjid8cwbf3usirysw80lbiqjs9i6kva5xfgk8ow76l8ho0gldizt95ac80jehrp37ck8fs',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'yxxa54pipkqqsi5lbisewyx51kwoyf6fqkt65jlbxi4mltg74q',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'xk2aloi06jpqnrn9038u',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'm69wij4pn0gw7vps4vsbun0ngjc5jj9z0not51hv9gun4zmf6bo7jgskgv0bt4nerxorrsj55wc14gbncu7l1djn5lvvxquv94gempd340kvaei2qiaulr9radptpdljkitm9z6bfmx6mrrsk4xh7com1vbwx5ryw7myvghzh2dwoeh0kd1bvd5cdfeb8p7h2z7rk7qyg5l6ci7k2bn6r0ddneg3ho5d3qm4hiecnpkyx6id2t8z2f8ytpqby72',
                name: 'zmtm3h9mplf5m1paohdb7myuswm40o017chcrfrv46rp1g7h4283i9hi66aou860r3ky7qjtowaqyl5jz5j0r71drev71kl24ot1nt8axev9r67r12ts43klhy5k507lt7ev9pbwiqvq4f1186knzcdfo6q67eckc15ncppuhepd888qwgwte3dts31759weee8vvmda7qud4jvz38c6pxkd57r7zbg77f5osyxyhphhkh6m99jsn5pjwvxtxpo',
                surname: '1i10qdrpyovgwjlcpex5wa5dib8zwj0ocpujdusd5pppzvmpl6m6ttoqa1aix73ae1xoh4ebr0n12ebh9osc4yhulbl8830xuzbgbab6vyvlczk0780twuydq97kecqag98yd9zk1p68uiqq8ndtkfdlbdyqeu29yt3gr0ypucquo5ig2oqio5sqsxzze7gamikj6kasjol7cm4n8j2roflfmkyhwwp07mt4uxy0ws7uxkgtiunhcxlh2bmhwao',
                email: 'p1j6n37fyouimhmuno58nl5cuwolr49fr7so3eb068vqkyvy2gtuic63m6th3zz24urnzd79e0hhyvoyv6ereiltuo4cb5dn3t99yfk0y3izxwp7xzcyc0cy',
                mobile: '84nfozh6w0g8iq3tcmwxdhartk45yr4ug8cyc6vmv1prxeww15srupqg18um',
                area: 'a5bdel5jxiic4by1go9krm48yc5g57ywta75oqu7jn3rax6401sh1rmdpb7vnqa2vkijm66lh32nl39k7w6envdmb30cdkc4rnkb4mnv36vasiu6yyq0nh1yyj7io7apy4t9vyu0c57o8bogggeht1quoszhqivthmp17ghn3lvtnntzdtmkvjav8i6cx3p74vt5uipghfxxlneghypj3oubbjjfqeolx8bwthdee2p9lqsedv58tmss7ak5lqtv',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'ge64mq9kd8jdsbrpi52rwor3s1k05x753klivvqrylaks9yvve',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'd6g8kk52jm5xeydv57ag',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '89h06pl8tjn3afostji7mqwy0z1l3altoxvms41jgav7e3fhd8ez184wutosi3livhoio6qneyj35toq9z2232p94x6hk1mqkh43n1aa0u3zk6kowv54korv7dtybhz5c1wqaj7etbh1945ma1pxdfayb0v9iuqsnrxq181mwkqgypuo3gmf564o15vd6w6rhg1v7zvewsqshbudffo4dc7xof2lucz6oy8403vxiukxlodler1tss2rn5x7qkf',
                name: '3ytsdprdzyob6a0hkmix51liel93o837nxw8cb30i9kk41uzwj49r799mv228wbrpidrsnvj84oy7j39w3m855xhylq77q1uhr7x2ovk2y5b2p7fw70fnjgnqal6ojkfztaqqec85nph6sppqdno4sq8yo9hwg0bn1s1u6zak9nngzxm9s7iz7t2zjlj82b227hqhukt9hp9227evl9xvwrk89l8ryzchkyu0o9xcak25sdwucell1ourt85zqz',
                surname: 'yde2t0b9sp1ztr1nojt371u3vx9sl99fo51q1c8ihim7wfddaxgcgnh8wxkifb6kddk8fdewgkyx9zyf7m2id9q0pf2j393nb6lo0c29g9gdraso0np4zhqbn4afjq30jna688cvhlzt8fr5otxqoknp1qpyaqvcwu3koztybpkp49wevx5q2ja8jbrhsykmhso373mdzq24skk1x7xnslvs610j0k1gybxxc4ejt2fs1hkqi0ib0c5oitzb1n9',
                email: 'ljq53dzqznirpvve3ap0eetio85l7ylkth6u90oswfalz5gtn682wg4ygh59j7fjyg6vt6db8pl8kga3wusmiaj89b1qv9rtnr1t0tgeumopcj4x4v5b9koh',
                mobile: '8b7jbcxdp26voju7e89rcvqo6k2bw1gtnnmw5phtbd7ibvbk3obrs3mkece6',
                area: '6vpwv0qb8hl8m8tfdpxfhla0w8y0jcay8qmllkoio91rd5srwp3opfbk4r6q3yqspwldgyqhck0ibzb6a894c2plvenldqsy1iyn74lj24udx1jfll37i6khdbebkk91jun4wdl9o4ie30ccrda2tqnte2vf7r60f05m4b4o8hrhbqatpv1go92t9twvejff7zdoxquhvcx80c8slandgokqry2odhiq1wohgajllbqscdmnl78170dxgzmbq77',
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: '17zebz7h22xsv23tlcdrpexnbz6zxioj0pb8vhhdognpmiaqtw',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '0r2v7ys3ot6wgypwz8j6',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '1qcfquatqt67xea31upd4rfit77q6welnz6rhu8kilstu6eq8xkeif4y9pn6xd14wy5onoqqcglayfpokoxcj9evfkjn3ncge58xh0kdmfo1w2ghlf0gq5v801mi85poobu5ay2ubpr58kj827bj3d16kgsjccprk3di4qry0apn26hw928lpc85siqf2wvmhaizfwoywuqdtjwl8tiwtf76k3w7pbdklyft75p0fi5kpkkogiz1ndvvyay2bkr',
                name: 'nwiy4jetefx7rsv3ah4naupacsvocqj59223sechdui30hny6j0rrb70od4ngt0eqqkyhyp3720rtwq4dwxl8slmuk9ip2t6ujpwzmrs9hzl8i10hg3qld91pqoaqo8bw07brjbwg6f8eheuy6ncclqpsux0gdr7ga214yd3hdoyqjw2oka5f4nkbbzb1g01ap473hhwo3qmyds2l5sh1iiqz4yvstajegoj01h4di864tfwwrc2vcgpy2o93aw',
                surname: 'i3qs004n8dn0uqdy1wf0mkbtzw3dxrnpma4zum9ys2y8s0tl0as2m1k4b2l8zpjubq60bi8osme8rjkgdkibwdyxu4kg1n91e0xby3c54vpftzrhpi5lnbyzhv5fo3netb22lmr92cx451ha3ri0lsjhdd3gx2ef5t0a5kaeqxj4mcmew92kkodix6i0mu2sv8tsdymznccwkyzx1mho91fw47nk6zu25qcizxobmngcmn5sv4d343rs4yu4r9s',
                email: 'lhfkbcuh38kdow6ybg3gz0dtxorlreivlggdp98zndhkjpaimv5c032hcn8nup28rw7xgw52uyt3i5hx7m5n1bopgtijmwt4bh4qeryvzv4rj5cemaztp4vi',
                mobile: 'f5atj0no5be7brxyb47wk1vzn4ra6anej1p9yr1erqaxziyyb6okhxsqv0nm',
                area: 'r1ebyu0qfgni9nyzjy3mxi8ylg29i2lirg85xrhdv7qwcupntctmukqwrnn7mcjgrwqubze2m3m5okhbq0nbhrckt7vmleenqq65c199ehrl8w05irrxwwmp6p2pgihds36r84vnzbya7hjm8qrjtbjtqsdg3y4qkv0rkkllbve7wx8jqkg8bh2ebmne34pqj7y0k0nwubre13ytptqx43sg7piapx535hw1vu6fpclpnwdn86fr576yxdco0ue',
                hasConsentEmail: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'cx3ojk971nw0a386uvjk0tp00akkep5xyjr2vr8hobi0g47gqp',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'aoocv0ybdarirdvokwlb',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'jnu40hvt9xc7312g3n5wgntw7kbph5780tgng9ekxugqzet6ukpn1lrkbayn75gl77tqdifgiu6b8cvrs5gq8ubsfhgjrel7ej19ss73yx31bbpu78hl5x7e9w09biqev6hixawh8yyn4kkfp8mza6v8eoguqvtp3ca8n5h9lx76t4nexddaldmv4jhtx8h2r41cxiyy557tp51hzj6lhtzfx77tnybypn2hveh9f85zq431kltj5esway66mbn',
                name: 'adbewcd4lyms5vpd80lqp7l034oae35oxxo6edljjnmtauz8mxjrw197fxnivtauhvay3nvzkex9mfmc7te7gyuayhqfgd2o8hlbx7v4ipf7d6h0jevr0yvigy55i0ypkah6mb84d8qmd13kliuq4qauuks1b6m2vsiijokx89cs2cfomyl97p7ioo0bbmx0pj5z1hgwhmw6afcw8k4yyr82f1oob1wrhkerf4c3ez7kl403gyjocbaxsxo0x37',
                surname: 'zivsrs8mbwpf3xwbcdje7pp6xwiz9qm592ecvaonk2e87f587em012gflnaaw9t8d0xwod9gwg71xcwumop57o5zk6f79d6y6h324dhync3fewljz9e4tqc5ljivry87em952zm23xo16kq17fhkbxbbmvufn0s6c2awwoo3c7bppfb2abpe5jwf4pcjva3b8sm177fsjexmpfkehucrtp26adlfzm5tk54h16pkcweaq8vvkb3pd3hnunnkwq3',
                email: 'sbkb5npsusrckjxa9fjoessb86vkafnoc52gc2cdyge0ibtx4fakwgqfsvr9nfmu249kq69bu2edq95w99xs6c09j1bfnoi2akcyno1ktvfotg7bsf0ggknz',
                mobile: '8n480i2zzzv1taxkxnhtbe0bahjg36n0uitr2dhru7t0o8va60hazqay6tze',
                area: 'qmvhbl29bl4xqxb6b5f5mre5dpf83gxg0wq0fuw5i8u5vciikwzlfqm9hpdw5c17jsfy5epty5yb6ho1txc61pktg8s1daaeqfajrdvir2in8ym6coao8xzzbzwvwosb8f0hgzsqgvm29nw6exyhldp9ndxpwi9xv6r09v54kff3td9s0s7o4r8vh7jl93mu35xzefky15i3ozezadswfspaw2egfc05c570e3enz1n5n97tjtk1do7r7umgycg',
                hasConsentEmail: true,
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
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'bqi8mxdx46rouvbxcibbhp5o2fs7si4kyx4fhqoiwwxe7ncw1f',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: '8pm4uujao6ceaymdhojl',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: '70062c9qigwkpe01r5jih9xlqdy1o8qvgltimckljlrk5aor044cqwiw864gbsu4uzf3b2xap3jl85xyf36w45ubipp0ybk2q1ps68jn6fboozoj5h8xiclaw2mpvygzbgncw21qmvfnvroce9zfeeudegqz25afy4tlmj386vz5yskfyg1o7r61unijysa8e99ci3dg1ik32un27mplq4h4x388n107y8cmfdkfi5sftnl80vy4m05uw6h1r4f',
                name: 'dgyfn0j29w2v8taqhtnl31hw5x6ze471u2mrz3ia0ypv75qfa3ibanzt3ecne8nyvlf48jz9uj50ccuqhhuo5k1gmvyloi5n58inzvi9w6vi8mxnaw8mu6irf4z4l08bi425izvbh5cheu1komlzzxg7glxtc8l3yzhciu68joogd6g0h12ekjgbhzwafltebwndupc0fewtsleg0jlcky4sh42nr0kivnjj0xdqavgg50fvbdy770ojrfoo8c1',
                surname: 'q3cs9yea7vvb6slfrb0xv4ka5p0pal6dl8b301q7cyoi0p5w4m3sq7xtstjybs4othxwl9285np5jlvg63bkc6dbi1vj8hnxjkmhfuzzr6ud7b7ocxe3xr0nop6p0n39gm6wahwxhzzmurel8fvh2g9k4ua0bsdmfzxn62zp7a99n6wevy223x67jsphppw7ov5l2pnlmscbiy85fxu9jywewnmkwb6zynae6cgbwjxs9krvl6b2p01g7qhbe4d',
                email: 'qwbnqqdzza8yuqwohb627wu0e22u8k3c2wdkt1nlqk5rne5x8s8mt1jp9zjr48lz5q7k12fch6fjw55bbt2fv0kc0ab6f0wjppcdwsivjy2wk6a0zdoe0krj',
                mobile: '14nb9jtwy0kjb8unc83qv54l620wq3gkzwbokjbzb32q3sixls15aam3rsjh',
                area: 'kn15qbg1pivz34wo1qw3312ydliy8ct9zdmdrv9gm677p9dddu6k3reohff2eu9hb4z6scaf3uu28z0w92pz1hoi3uv65bbkez6ugp4yx7d7pjr8gys5xn44wcj53a36mzsjgg6svcgtfbyveh4o2uef8wy6npmv3mu2slatd1ow3lc2prdz56sdasfi0cnpt9a8u0o5t2ip993lt8slwqgrcv6b454grzkxw5q7ijy93ybhia0u209i5bvgu8f',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                        value   : 'af06e73a-a913-4312-868b-9aefef33dc29'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'af06e73a-a913-4312-868b-9aefef33dc29'));
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
            .get('/bplus-it-sappi/contact/af06e73a-a913-4312-868b-9aefef33dc29')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'af06e73a-a913-4312-868b-9aefef33dc29'));
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
                
                id: '82c6cb46-c6ea-4f95-b294-1cf7e519fd57',
                tenantId: '54396aa5-6662-4e38-bd1b-9d5db43bdd94',
                tenantCode: 'q31e1inbng8stieg5if2kdim8egzy7zhq9gdk1pt1grk4rblvk',
                systemId: 'fe041265-5c57-4db2-b136-a82c37ea3bdd',
                systemName: 'gczdpd3i6ybzg3srsdb7',
                roleId: 'd0175d62-7b1c-4cdb-9179-60d8ab446b8a',
                roleName: 'lqi8ys0isxz195f9ikt7sey9itljtj2ocuxb83utwna0iwknq1oqxgnrqacytqiv593q0rcrhfywqzm9o2mkq00cp2zhk52q5kat8pi3ejyjl2ur4x8140nyizu4z3eaos3wbppe2omjwb969v5hjsp34sgzo7ww9km3j4hupnxb4yapzkhbtyuov3c1yqd2h4m3eoskr4w3b0sp2u6tduuhkiiihcvjuzu5om9wh8p701zeeygtw6ln438d9xs',
                name: 'hufs8025v37gwifiit066ci1v30sp61cffea9kduflx4lt9k8z8x4opul7lys2cehr3jty9ulzp07dkw1h3f1gj2m63bafk7aky8pr9fj023j2hf1jji3kzsq8apz30w445vawx8tll83ckvz16fu9a5ky8ji6ibryilhj5zf66zbm7l60s165p9hi96aqnhg1fwpfx0wxoqktkts3e4d64qvpe2ciqaorpzkrtxr65mbwtntz78u9515nuskuv',
                surname: '9lsl6culbfmralbw06vjrhwhadd6ehldtwlc2lwm0nl3cz1wtfast63e7srd9ngmuzxbvwnzakc9v2gax4gjq8jem213u3fm8zgjab24ahmac2o3ztnzglxgyx8nqao8nom6tnha0vzvpy1mze9k9bqxcyv9hg8m49nbsyskw6epnlkwn3xhbrrhwka0sc4ppaj61kx0yuhvjw2wo0fqwf1k2vo23mmb8uufef3ntxcjiyllhzife5s86hv53pu',
                email: 'qu3vasmdq0w10jmuaabp72601wj0l7eqwh1gwwbjsx68f8odxq7kf3qnfrdsshyq6ylue46ivhwe4px6ef4lpv44setj4jwvgcycjod4fhu68r8fhlaecgi8',
                mobile: 'a1w7xwxse2wwxwl9emww6uwbddiqtwoiq7htq1m7gena9zt4phsdhwktjntj',
                area: 'fay4h13s6w1dw73yu55lc5f6z2vxptipabmzolc6g12ggsxn5jyy447a36o47hia2u9nrazo8ib939cpogp40ndaz9r9c7okx0fhiiuhnpkhro95va4q03pe7n9tnbytqs9jjdcfvud4wuvckgo8na83mg3m7hwcx4cmamyx14ihgstfb5ywc3snnnrdc29ht1jcsrk4ttuqcn44slm69wilj5o26qy0tie10pksdiu715xi5vi1n8qxbypsuos',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                
                id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                tenantCode: 'm8ku9qzplm7nd2ftmt4fz8gu45qscxg8yzc48efaypk600qp14',
                systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                systemName: 'ceybvd59bz0a8hp8b6v2',
                roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                roleName: 'nwek9mr1oa1pgx43xsaqcdvruffv0fp79102um717exbwil08giowro684795ve6qmow17rel29wyshy6bka1l7ub2wh58ktk8b0uk5wpv5qepz57zp87xabsmlo7xhcr91m5c3064cm77jvvg6amt3bcpunb5p2twz3c50nbdvh0ja2k07b4ty9wbqh10glmfwbtgrw9ovbxzu4n4p4lo6ldhzugz46xyiwcesxemv43qpkusova0ckptuco89',
                name: 'lfy0lzyev6g409vnen6guxhg1o2epqxivamk80x0epzk7jzzg9en8sd6csxu4t4vluw7nbmn68dh6jyscr123qvcu3pqluuhlbq0z4t9arnls4i7h6xr9n3y4odxsyo2hsyqt1fpd6bdqtn2zif3qqfgj31cshq7ex6iq6b1oo75k80buw6u2puciyw6z42sdhdnvvax9zrjctnb0qlnf07ej2j01xu87dafpql77pv5v6nvqxtom5dep5jcepa',
                surname: 'zwgjyg3sutepf4h367duazqe9d11p5r1k418zj7yzq9fp8zr4px68gr2ho8q4wx96810z6ijp36mjgmd53mtp2qyfllq0nyqr94k7k1nqzae3lc80qexf4h5eelxlaabz8mbsr2l9olxtokhkih7h4tedalov9t2ga4znu7jm3cpa0zftuaz66snuohra5q5d4t8z56efibx2lnj8k6ku4kkkxmyzpzuo6j0y3r3z4tw9r5i74xdn3hd2p516lx',
                email: 'luhc3f6f8xgbme5d5x1m6uacz49v55i0bos866psr1rkg58wcxmbwyuu8yahiyqz1qbqvz4gvuq8g8pj05mcpcz6qz39fbz7nl0nb58p42ri1677zv9anvrk',
                mobile: 'vrih299rf2vtab27wafswbmaxk3sh5gjhoe3cssw4scogc1k3auqg7mq0xim',
                area: 'e3n1jmm71znrz2qoz0ht9z4rl4m05yysb8u6y65g05rm7cyd2zygih6ke03p5pfxy1msd6mj89yvuasra3q534csjtowc24v9illso0myamiu4p8dt5e5rfjq5njuxx72x0r1k75fspmxax6f4fxevwflaqw0kioq8gvmr23s9sno69v03gb4jhq61j22pgj61yemmyd7kxqxqogmcnjzvnjtjrzfi53g710hncu2qk32fqru1mh3wqr66evugu',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'af06e73a-a913-4312-868b-9aefef33dc29'));
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
            .delete('/bplus-it-sappi/contact/af06e73a-a913-4312-868b-9aefef33dc29')
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
                        id: '430feeb9-da81-472f-9a3f-802380021327',
                        tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                        tenantCode: '6j8gpe4ntjdiyo2ad0f03m15jth1k9pkjx27y1dp9sjeg6hkl1',
                        systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                        systemName: 'oh9z1p1nqstx4ypdrrpk',
                        roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                        roleName: 'a1dc71hk1wii95u27vdtf9m91fvy9pkf6e8etoh8aec3be6lh9vdkspj63qptm3ny4zaqzvfvp9jriss8tsut5i0yakv34hus5kgsdi83ft0kdtme7msejvtx00ld6vqwl5q46sqofntfxhkw5whyp5vojthynuchy11q6girqwb6b56hhoojikp1cadzwss0ft94f4nz75kbs1n6zyucr9b1o01f72g36lvgyggy43bq20q3qz0rh7jwbre83s',
                        name: '322g6o3uch13cddfv3rlnlsgmjywi0tm7qx7fpfe0ntr21w81ym6eyikuluufga99v59el69u2mk6pfk736vntg03du1fse20n8lijypa1eviclc0y1hnxxxhggkgyt80hfc0hb9iww6twfsp4rtaclt8l53lxfjaxgdpya3ix04i3kgfi0v7htayg29vit7rcntnsfyp1mc74dhf398fhkuy0ee44ogehy0nz78aj0kh10465fldkp3mmc9nxy',
                        surname: 'p00r1m9oumywi94i2o5l4h16jmdoxx9utda3e0w0wwr31feb32s4vvq0ltam0v2hwcmmavsdlw3g0d4kr9ya8eeoeh9cm3pxhs33o3fi1tavvw1wuri1ppjuzh3qm08luuo81niwmu5tvwnnb3r9a02f5wv0bwucdqkkektp8og1crh9madq3q9bzaqtak2v9ffn61uaaamj954rrshwjhcrv376lpcodhl5pvbwlmoszg9xpkouj1haku8ylzn',
                        email: 'nush9vk2l8y5j16fwqytnmw3jzil3a7df0e3oe8itdaq6fhy3wgz8n0rhvjf7kumklmsfv5upawf0cgwu7sfuk0wu42nml9huzwgmd07jibv5fnx69n4v0jh',
                        mobile: 'ue4ng0tt6e99rtzk3ge05d7d0rg25h162y05bitc78r52mge8hed717yfqnp',
                        area: '3w05jdoh9heipu5w2dgxd4xibsgl5nj48fuk1kvcvgn5l21jl1mcd7lv3wbwz2fq53m3izdzg028r9a5kojx0iynzzmibfcy87cy57ql3qbn99b2nyfi5pge748a4q5tae2hf2mbeve0vvx3uhjlkadb8b6x0e7j9jy1lajtl8m8rb65sow033la08lh14d3yfmmthrufrb9vri01nffow9edz3zegfd8vulp620o1dhepd3v0o2wbxzjz3yje6',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '430feeb9-da81-472f-9a3f-802380021327');
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
                            value   : 'af06e73a-a913-4312-868b-9aefef33dc29'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('af06e73a-a913-4312-868b-9aefef33dc29');
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
                    id: 'af06e73a-a913-4312-868b-9aefef33dc29'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('af06e73a-a913-4312-868b-9aefef33dc29');
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
                        
                        id: '605f61f4-4ddb-497c-a883-491f58e362e5',
                        tenantId: 'fbf3daca-6b3a-4481-8a36-92d2ff98284f',
                        tenantCode: 'vsktq4rgnhtzygr9h3wqw6xwv63u7id6drc6szoaz49a2p5x1q',
                        systemId: 'af0f4a13-cdd3-41b7-807f-17d289ed0e71',
                        systemName: '81x785e06udrzcohejba',
                        roleId: '8c3fdf1c-829f-4437-b389-a61e5c69fa97',
                        roleName: 'wzbkqx81zlef52t8i8cn5xcvckhu68mt1ppymn4yrpueiajiqcmevwmy3qsx9rwu107zovmbtf2201dio7d6e85xd3f581czfozcf3d7hbe6saa325owk7r8weyu5yfxkloiu3d2y3irrpriewp3yyga53jkdu8zfw83teq5d4ps1j2iib6ff3es6gj0n2a275zf4v6ozcje6booaovove4j421b1uq2f7756mdrh1jnt5fg8jj7570xlbtr6ux',
                        name: '66kuzjl7z5uu6tuvcyiyk5t2bo7plcpaykax2a8ynkngsuxgltaa4hce82hljyi3b18kkhh8vyb9ymreh14qz0pkgtdlbhv2t36qzfnf7xide1bhv0hee0bwztdzaj1ac4u60y9jwzjt8bj6i1hxj5zngpbcb5wcq2p7z4t0zxfdu8jl6v10feg2p1nzaiu48u8l1lidsqioh10q4dskf2dolhuq0l1mp4ni7bkaszsxlong6yivwqwx5qtzxtv',
                        surname: 'o3pnkp45rfy6h4weimhwgwxatwxa75bdhv0q1mk80w5i5nyevrtznhavu8j1v7x8kjl8leujfuyznzl69kfrkmbxogr34drk7ortou1q7uttvq4pz5ums4yukbljzyr9lm6zzacre4lwjc2fzy4d0s8mv7deu16srnoqfxgls5mz5lox6fol9jsn93wxc4ema92m0lhb4g29e4xp7lb51okmejg93fqqvdh4ctfpz2rmj0maro067wuziamxpc2',
                        email: '8pwewn017q6oh0cpgujss9xohbpqvr8ceog3h7jre8xpx9m8m7tsfz8772pimzte4sf7f2z0trogsots8o00itg0fwaufyg82jeyo785nqnuaso4mi1l12h8',
                        mobile: 'z9y4hcrifn3t5bpiugut890gdkucbjlus7du2yui4ciheu3gz7zwvbrki8xr',
                        area: 'b03tp8t0h3s1awm129squbz9aoxp4ngf9vh3rgkki4kklemrssh15jjxeztxvjwvb840t7y7khg3loxz2y57zm632ddbvubshxyelb77qpqm8vb97kwj2sge8l8wj21uou77twf3fkg8cxkcygyxjch2xl9qqqiy9rqak19q9di4933t1drmyi3cp9re93ijewd2r7869jpu6qrvu5k4aneolvsf9txurtejd6p9zeb6zkf35elzex73wnxu7t4',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
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
                        
                        id: 'af06e73a-a913-4312-868b-9aefef33dc29',
                        tenantId: 'b741d8e2-973c-4e89-88c3-ada737c839ca',
                        tenantCode: 'k5l4rdyrzhtuet9tbry1oo7b5l9jorotkvrocfv9d8nzr2ezhw',
                        systemId: '083426f0-6fac-44f3-8805-43894eab80e1',
                        systemName: 'dolu0oj5n8adswkxtbig',
                        roleId: '360a5cd6-ab91-40df-a0ea-9a99a91260f5',
                        roleName: '82i6nzggqt3b38lqgrf4hmb2bgucu1ngk1roqlnfps97pmp43cjso2j759ujbcf9xxnhnihhe8rbvc4sc6l0kw96j9lc97bb2bo3e2acpcyth8oigakzjx4wrq08ztg6sk9txtd2heskiqcm1a6n342vpd4a2ol3nw8k8e1gkk6rhnlzbxbwdagrfiwmmysro92oi2dgds80fn4cwhoh3cybxairmbzgne5ccktxic1l8oa16gjj3b0aqqik5sp',
                        name: '1lafqlt7yr3rxtnos6d2pvokk6za55ksdrisavlb9ca2ght2nyso2xzxghcz0es33l8figng0xb8vdlq33svndawp9z7jo6azpufgef2d9tq67xd5er5vk82zt3zpskflppw91bfz8or0txuurmetfb6xf8rc0sdj2kwk0iauoxwchekztcyp1lq2x76tt943msw2qib19eqq0xfknmlf2fdjvai2pzdcfqontwxpdjktmq0qcctmolr8wwfmm9',
                        surname: 'y0qbuspvu43w97hy499li5zh9a558ccltvj16ee9igywm3li88fw2uenl4qcgwsjx4r7sgizy2rrgo9u9yosrk3d7ei6qo6w5am7hgxh57l3ngnrucyitgn4nqxbmgo3eeb9vbigsankqnlum6y08yxiiovn1gm348xcrcozpylm3eamqoa7abdzsxmjl74rmjve2mikh7obyo66cubznzha9fuscn5j8oxgcbntomr8kwda72ohm0rn15b96jg',
                        email: 'iwbd2m0na81vi4u8e13ouxa7xous25f1ser91m9w3ep2snb5hye4loh4t9druuis4wvn7cbfmaq8g9l2xa1c6ongr2sdeps3g1sg17e8l47spgl55g8ww1zx',
                        mobile: 'rnfjj33vn8yergu6tclhclduplo0o4pknjzx8eeogwv5wsftr4z3bs9qhaia',
                        area: 'yazb0a1avqd5e6cy7vv8n30d9d5tjoj4uk8sr4fsy7pl3ysccsq3j1qqrevfwikixh2zwh3soq5ll5mhcnae37a6vy0jpvbon3gf4hecxxtacwebgquf72qfnqj1jzv8sjofyhzsexr1p3s8rh1y7vpa1bvxf7fdvx05revb32uy2f4qfl0npumgi41ukppnj85a8o6xa7xbuut6gc3inmrk087qfb7t6amt81s7g04s7o9c525qodsed5yuy0r',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('af06e73a-a913-4312-868b-9aefef33dc29');
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
                    id: 'af06e73a-a913-4312-868b-9aefef33dc29'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('af06e73a-a913-4312-868b-9aefef33dc29');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});