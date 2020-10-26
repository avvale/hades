import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '@hades/iam/user/domain/user.repository';
import { MockUserRepository } from '@hades/iam/user/infrastructure/mock/mock-user.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('user', () => 
{
    let app: INestApplication;
    let repository: MockUserRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IUserRepository)
            .useClass(MockUserRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockUserRepository>module.get<IUserRepository>(IUserRepository);

        await app.init();
    });

    test(`/REST:POST iam/user - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: null,
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'vtw4opzs497mmx9p0u6s6rosjb1eahwtkjcj6j1qq9nkhzelgadlc6byuh57r0ngzu7lqo8zz2wq1940hvyjku28yix0pyvuvzrp2gyfow8nm0ziak6n1v4sb6a8sf44j7xyfmqll7evwwwhvr9cz95eluvrlfd46rvozcu58aqy0xl6n67oegfl32x60okhi8bdcp8uszrjfma9l5ny6cucjeky1518q84bdl8b3mlzq12tkxbs3dsuhms6arb',
                surname: 'jp19b4mqwn5okln34d47fk589aifvy935oc88uxbxfjwkl1f9et38e9lbim2qmd88v4ozc775ko0wcyzeggr7whwic2ej5tk0lgmsj9snxgabzns3mhshrkfs0jern1cntlsux63npolcq82dedmu1fse7cnzbggfr7popmg2mydrx1znb3ms2u03ojl2ffb56z4fby8d1qvqtmutv25a0c42fk9ovmij084u2h20ofavcwzrxm3zzkolmvsu9l',
                avatar: 'c8anofldlye562oix5ixyfnxtex385h11hdw9c2qbjotteo7fndnacauaoyxzfwhemfgktclob0or2bqprq8f8fj92x310xjqn1mo14g40t5xn2c9i065086ph4msp0562yar56m5vd31errmf27182k55k5a3a1pyrs7bj9tkrgvjk3lb0h740txujgphrbzh0ss8x9w7z3vultzgwhjqr659dcb1a6h4s28gqqacq9gjk047g0jnfs0iqzrxv',
                mobile: 'gamfjbwtomnu9c7z7mwmiet193trzgdq5dg8kwx4566rcqzmbw1m8n8mrdex',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'fza85wm9u7j6b72k214sjjtu9fj0i0dwbzuyesuu6qdkhkhia842gcp6c0or7o8wvtqrobiqie7kj7n1xw6a30rsd56xxgttcmgfu96w1unfwki9yv5gy1r1',
                password: 'qafuzug9bei8nhi06rjzhkn8x7u1slzn7oajvvpc0kxpybqtz7g8xu6xtpug8z3l2w9v9w4b23ndq9tsqkheztmuhtl54gi6fpxcfy8ykq7gldva4fejcfx193niva2edbxk38j9lrp7ufs9o9y5ztvq1joupjozbhjisylz4tn4mzucsgsygnkvzkpmw8hu08w8wps7whwy6nz0yg4e2j5hmivypaoy534hg99b26s2fh8h9lg4hsuwh51utp2',
                rememberToken: 'k9w5pdngmybv1yj9no3fhadx48gwpau4wo9m4z6nlnduq9rzvqqmliomebevdrkgdggp6im17t0m20n4174ba6djl24lrmv7pavc4ostgxs6hyqxkv77dx7rxxhp409zvkasfk5jeq2v85m3hjljrmfb6e667n0hh0u4thh7s7acwsh6rzqso1slm6brxoi8wv0odp7ppeh5wtuofrdu17t4tzmbsrf9gndt9wb0ao70tpa3qjjlyvm6rktswo1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'uquqstld6w1me03mp7wv1oxxmgfz7g6e1cef5czqoxb6g1etn6nmb1p92d9jt2l8i9kdxmpp9ok9iol073tb065okjmkgrhaoizaxhhuc63nvjatabd4bzysb9qrn11bvn2n8lxlz57bs0hnsktojn016s3e7op33q6b73f83kcq3n63n49lnl6a2mq7z81qormdr915npb8dau1qnz2cia24o678myefcfkmszngmnbto3ims4os3ti99t1mg2',
                surname: 'cwu11p4s3mneem0gc7n9ca9188cf3tbdd72um0dg93tlck8cteqht43emlixiysoatldiv19dmootp1s1zrudk0glsjzgf6bksj65krhy9sch8mn69rw8x24bjkml5aljga652s2tzqa4mpm9tlpq4ni7tprbbnvu2sa8b4oc30vztuh2q0tl0kl6ll06eil5j6wjjt38tx4685wd0xwbikcqb7rr7ru41p6sdyk1uvcl7d8poejncomj9kbou8',
                avatar: '35d1tp3a0ejlcoaeiuc7fqyif3inzip7iyh4x9dv56kggttd600x0ikvtbe4de5zup636l85nzzdfpm5hcrkh1kzfllllc4zo83733bmm18xta2r0btxc99rken7ym9y78jimbitbyzfyjsm0j636l5dmj9uu60x97mrartfuvmwlvd8nz1f28vj27lfxlcnvxc23v0hivzsvda5ukgbf9yjpylm3ovnzwitiobiv6a5f2gqaakugnmih05g1i1',
                mobile: 'yulox2hjntgxvn4p43ep1lls8q2q1dfxii8ppizvs365h525ei6nq1iq0oaf',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: '5859hvnfm1p1y18qepdekewlaivmha10vcw5wj77m7wf43wspljaohrrztqvbfcwkx6oc14vvkzli6k8ufl2738crefhlff7cnetr5fthzv7ns6ysrp0z4nz',
                password: 'c9xs4qzt2oqppdtq4iimlvqj5c217il82c43wibgvb2b1og2k02i25qf2rrjtc6i3y6mx3fgah21gopr6ficjx140saf5xmpkiti2ji7bw2op819c1gg8dzn0yevr53miej2et9wmcbvn5rivtrcm4ghm0hupt2sbujf91ovju21y0szte6v54fidrktem8stzm60jakl2zmh9sewnkfokcmpuw17swlsy5pd5uv2nl34ymmtfjqfy1639h6uot',
                rememberToken: 'm9jl7edfxupo5sl1nv27m0cq7iujp3z7eck9nsxj99q94cf24kkkmd19svhxczzdzxj8y78z6oedcoiqynd4cs5xx1r81l4e12m454q2qr98ga052splguyydufet07a6tap55l2nxnd6qvi51k0wyu1kasu3p5ya1ly20j2f70v3na3y6xnuhbogy0xb06dlag53t7d3duh5l1qm0hih01x1e57tc45cmxs1gipvuo9fragn1zecvtr1o94nfj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: null,
                name: '19su7l3fcy3rhlhrxmtj1erudb4k39u1pdekjknvpc4plmao7s6ay0e2blzcs2i9s2gjgdqkis891jobkahi5ji6ivyipdl7z6bzxwcf9ggsmu7psndso7vg9tcq79r2r8msjopa94ow1czevjj0dhkblqyq9qnp7zw779l5u7pqkk2da2pgerxcastlpoleqf1dcxfcn50i09awrz0x0d9det748locukyx6vf9lftg7910eqm24oxffr9bmij',
                surname: 'isv77dwngqtembh4p59ppqt6nl7arffvetllhmqzid4e1uhvq22ggu5bf91y1ge51ahae2d4ec9xbr38myvh453n78kexbbpbtni4dqtqmiw18olkdastxfu9izjgyskt8q8oc5eqtncjmos05h6nu34oy8jkch4e6o3bjpbdzbkt9gv2uxo3bci27vwlcpmbcd53rushg3m61g0s12rphx14jhoexzwcfrfbk7bvw010lcl0vr2m9er2o6c8zx',
                avatar: 'ccne7q0hyx456jg8bxj8jrdre4f0h4u8lf0ek4p9tsydsnpq73f2m2nrg4vt33yccqf5ko50dtezqign2jb2jcxjlf022pwo0ykkih4vytnck50lrv4qm4sk3o202h83h3i31f52ndm3diibb7ec6a2twfudhd06bv4dbqvma5x0wyjt2ae95la7125jgjzk3ju6s6kffi886xdvywm5mueqhojhymh2cnshb4hxwijpfsxa2yco6r2q27vl0zs',
                mobile: 'l8kidqqv3hv4pyd3ejje22ps0p6g2gy7v58biq3dt7ocealzr3ayi2tiu51q',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'qoogy6zrejmf1dgtgvq93ram913z4a29bne0x8sgwc0tpd4uqq3nbtfw9pb10z7jarch73cq68sr4tdkc0ihidlmigzf3c2rsixm8c9vribkaqkurc4qgw90',
                password: 'nynakwuczkzfut0vx3mrpbtljtsuj9qh9vsyacadnpfho6ia521feqimlrmrnro1cap1q0p1e3zci82heu0tlu94ijt881zdufh3sfzvra8p76jq2xdivl1r0vca4wh037kj34etwv1q0bk58f0ryjxechnlah6lhqnnslc00zgob6tpjubhkn8nezc9etn1zs40cbl0ie8x3y2g2n5lvd1wmrylrr6qzzabc7kb7p7b09eil3j5ztiof3nnv5f',
                rememberToken: '1q5gvzb9msacexi8vsmcp9xmaxu0x4u2xd98gqw3f0g43ffxyu84ilnk0j192fnosx7rttpd0px4dsm4a2ew59kk1o7zsgw2dvbieg54op3keokikcvcvcdz1mgk22i7ldqup24ldzqjhkdluvygqsiq6qxlpr9lakntrq1e2bd9z0fbarzobwkj779a63hd34hcwti29f9nz414wt26gq14aga8ntlp5p99nnw82gxloa59ar0ckx5kwnbl6ob',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                
                name: '922li1983m9uwvq68truhxciswcp4vxcr5np0h4dliae2eqv67xl7b2c9v8mnx16fnhtzoee4x8ik8nyfhv0l6vg1dt3q01l7n988qtgjmaejkxsyce4x08k0an9iqqaceujdq14dwjmryqjafx9xhhosp553ol0kys66h62qblarq4bmico1leyfullwhpt841j0xr8jlbn3ri50lkietzaeusfejl68927hqz1kz0yesder1htho16avritqr',
                surname: 'zpi4kwnnmb62imryx1yso7wtfk5nom9rnrisfvgadzhikjkhqa34tl2e7j250acc77dxuq9m1rqb6cybwoj6k16v96g073lf9dcyzh2fz7sgaq72ca4y0y8kwrsj0n177kshw678xyyqpw6inz4waq86xqnqlxq9uzxsiwnzgvn0jf5c9foth3bmma6xchxgwoccp30q6iidqrkvmcpa2qo0jsppnia8kfpqripgwy3epdfq0pu5xkz93a1beci',
                avatar: '3r9nkyev07c906hfgsvvmpxd41bvghecaofrfk1ky1ng6svpeppnvqyxqgjsz5zx58vomsmo4d2i7k29cfazlja5l3k7rv75lfdeuaxcrugao8ms0teqzdy1hzeyaxadlsmqn2op2xemjp0u3rvw7hxubo0jhxij0osdezxq786awm5by46188psz1g618f946ketneaucem606yt4rbhz3tuwsdpvrvtkfeyss7poent9nbnsfacncf4ely05c',
                mobile: 'kth4a997hvkpud8eksyic12tybjm2n0u5famehr1ew015urs9doaqyeil35s',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'pm1nmaw0e7wqsenaurhok2zjbzq7gocv2izdt6n8i6xo6qiawgsfp3gzyi152jz8kmwoodkc9ufx9xizi2vsumc8ip6hgzhv6hxanpcee73eln8up2fpc9oj',
                password: 'm1k59eo59sxnh3d3ads3m9omas0x67i2grkj8m32k3rjux4nvpdvi7snjgtuglpq4c0tl6hd5szk35nhdbie1b16u4gvuyzanz5vk7ndo6c954teo9szml9xb0rpq61l4juqxdozufdsn0l6c4olr4cbj85h5cvt62oq374wbhf009u9u1bmqx1el4qbmccbnj5pxrgyrlcoyf2w48egyl6o3q0s3zt5jvimcv6bvjs7zlpzuiyns7wx3cj9wuv',
                rememberToken: 'o77nm2pwd071ssecpvleicwo0tvalilxrdvjkhu6v2n4crk3my4shod2krgzt6m4iejctdt5zkb9at08fncml3z340y0wki8z8lf3lkjzylxtiuljdj0s3xnxbpynm1z7tuq5g5oln5lgjnrgm5e8qb2h2laala6331ditwppvs4pbk0bbwmtkto32vayc8s2ml4nthfusixzodvtmqa16e3uslhcdtxlfou5zh2fa85vmo3qt0x62rijs8afg4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: null,
                surname: 'ddppufyz0t68kmmkxk067xt0bg8mw7zyd2ubqwgyfujaa7dkztzl467rx1m8jz99bmmqdrn9ewl1i4w4dgk0e6h4s3nelw1q88nss0e36ax9h467ktnc208wwfrm4bckzd9ic61dw6n75mzu2wkvjfsxv13d8fxd1ix3ndyut0ydmdqcccy5qea8igch0fuaw8mxir564eqv824a778n4hhzr30l6vli6xaz8flqe3ppdwcu0ofuufsog159qua',
                avatar: 'f7kvpuc9kpiibix3cac947njlxum7bnctp7mtk1y56hgnwyko5cc9y8hxdpskcaz8w8hn1m65bjsfyxm7w0ap260qkqq81zwl6htc8oym22qckhnyfevmx38m9ajvqkg0apehrosnrprmi2ji3fmhs4kt396fs2rdletueeckta3iqbx5vlpjhfzueiksak5f3oowzz3v312jv4gelmfkpioe5o1g0ue4ub59l1mymyfgttz97ccbe0elqof30o',
                mobile: '7euvo82g7qnn4qdjug73vnstxy1hhir5d7181yrreql69t9xlhny128749ur',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'wf383kaln4ywbc52924qdp2bme7pt1tonvt6iol020op87lghuas814g9hsuocoizu5mlsgv5v1xhqawf7yl2t0pdtgunuworb1dgfgkiknsv2c9zg094ije',
                password: 'n1r24upie4sdi6es5fj21lx6xlgjh19rjbigw47sulnwfmv2dze0neakyen4dc0d44lavf9c6sxt5sddmesufads28nar74lwisqozekat7gwel3ztbl9lhujrmo9am82ow9ivkegf9jqvuok2hqkxdgfc1mb2b75al4kyvdljyet30a0fynnnbaxz8ys2ag4vkrcxo167e5tjhyd0q9oo9lw1mblfnilma1s4aik89p8aify6web4o0m565u9j',
                rememberToken: 'gaeuzh25nv07ts56ehcysp6s94hrf1u8sxlkqtoujzhlakkqy38h7imr5fh5lzsbdn4av6fe3n2pjrtwl6o3idtm3roai12f5bif4uwp7ypzr5kys0n3i96andx9pu1k20yc24d2bs9n4km0w28b2jzk3mazvsd82yx9nhg82hvn489bpxbanxi94myqyn6xiqv2xtjdiwzwgwkmt9t4wngwmiplv21l3merqhk88r0zbeclian4dmg2bjqidne',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                
                surname: '6f4mkgo5vu9jvhscnui9g0benmt9zcygzk96mrfx9txtl5ydwo9ml1dl6nnw8cjv4olg5mwbshtdwlg8tf0whzvk6mft457n4ulmtwwwvegnt675a3y0f3w79pu17cszcczooz1ezb30rt6wm7xzlr5om9r0oalt3i8mqzo90itqsh10ctjsb1hskhjmamz0uu226xhuw1e22vqtv4l3pujluuw6zhr2oj4lb9y98zqhii9ymridok4acu09153',
                avatar: 'iqezoiqcbdl7cited5v5smlbgzvcrtxzxo1462arx4ziuawljbje5g4mofjoeugcr6ne4jsoci2k49ml8fspr3ebfhcta5mfk77u90wikv4ye7l31nv4jskajg2psl5zpbrvuvl0x3wso1jhhwsc0obn53j8ytqcyi3x8eyfq1saqqrxzcr440fn4hjezmwr7znaj9q6hyy13xo25fd6qkju71dpn6k92p0vbv4irodbvt6d9gksaoe5616eort',
                mobile: '5uim84qrm3wzopi7j5s3y5t1licdf1mhikmpdw7m21q989jtrhufhjlbfibj',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'voo6ha1j4c9udac6ijdkuqfuvreszbhjtp1mqv04rdmo5psjnbkvpnwbehaeq977aaq6nr9mtm8hvggygyohqymlybskcgfufdsndfivqh8u1o0hq989d4te',
                password: 'jn67khdnv62vdhqej2kyzib2kf8ph9udbcq6usq9v7no9ze2ti08y9wh34eppr91lvk5cpdmonp0jjezlah3dvbhyp6lrvaik600e52s70iyoyv11bdiunlb1dqp0pdf4rzm549dsjvktovkdo27risdnj48sx4j8c0io0349f8h7huk37ix4h7jx9vam9fcanxvqwa4xc45oxaewgo0ipeiu1goqw8h0hnx1jg8o4tbpmllv2r87t67c7fx165',
                rememberToken: 'x884zlaly4vwn2rkevts5trblwxkp2oxqxrywzevvp8byjcc2e4b6jxqebx9p805o30s0uyssnvwmci2w43fa9l44gt3gi5g3cv7ynqan2zw595h8bm836jm2jnj7tpbm39sc55ec9brbopc7cgikob2e4l5t2cejagitrxzupzqxrn439yzgx5vo290iwut1ze1ta8vky8gchn0gacl33v4hcyudrt09i9zknoghcu040osjx3b2iumclu87w8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: '6pch2o6zcrvakhnl0dnr0bja84ixif2htx086exlkercea8lrl4z5n6czvzw6yh17hkwkhu0wnrrv2020baqzy8kfkma9i0rtx4qt4l71tfq3jwvlpwzuei6hbsu3isb2iyxw3g9ebnnvyyd6vr70lachik187ciio4qtw7ub3gms6dkf74k1xczv6vdh34wjw84yu4q12gjie45lcc34ext1lia8lgjfblzvuaozvsoix0zvd2sfm91sjdxd82',
                surname: 'jccr2fxivmuf444kbcvonv4if7xk1gfe8u9iysyxvf2iavk22htjhc21chdl7sg9w3q5x0l7rlu0i09gf80dc2t58m2o9kwus1jojskqpi29xw3ahfzvelesg6uimmvj5s2yy8xq82834cqs18ltw93bgvcrlet26omtkjm9zqupwq8fgq7l9jms5g7hsm6nv7cgd5mi01i272phh2c42vn2rslvyvt7n4i87gomwmd0jwncw07z0fz71ppna4w',
                avatar: 'hsymcp5o3b1ztnyz01c7fnkz3fvuzpoe2xgxhf0ayomm7i7lmf37l16ypesjlplu10pzv578olaqeyky4f9twae6lgt6dj2y6r1sowo1gaqz0uhijdqza574u8pog1zzf1rt8nqiht1pdbw6ko65kquofdblgzkggxegh0zkc81lze12d7oajassb4lrbx18y597o24qqstxv1myn9ub4ftg7a11eifs16p6ct4y23xtwx823s7ul0buxog999u',
                mobile: 'eve5f94a5m46qi78vdunu798ojgndcw0iiqp636ah8uxmgrmkrxha7i9ait6',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: null,
                password: 't86jyf4iyxd7wf8kre7eq859oo69mjrgbiu27zazyh4hrrvr1dn4acgi2d91j1y3rin33wa7mwbnve9473k1t6eitxeu4rpd6g4z6ptju9z2dl5uazwch9mlf5vqnmyecjo69i9rweyl3ec8zgvil2q826e9r1qcavvticyu4g8vtp7yt35bpirwabga52gceiek84p9lyifhhxu5bu7xgbgnpqkhg4n4mue0zstckleen9v6a24neafu1ivzz7',
                rememberToken: 'hh3vtzmz02djl3socqcszq72yv9tx7uwzz999kqn7cugbg7tbane4eho7qkg2d8tefsa8d4lpq7l8f5m1rpml3r2xw469m5iw7nm0wu8e4ao49vfldnreuvktm5jrtsx08yu2bsfn6eifom19jwe100vamaydcqd6mdzl1rgzi5o9ptuz060xqf6e5lzgcf6ppq0xwx97ek2utmfq1v9sm89gil9w4u9n18otrvj7dhzblnzipz6fiq79c643tn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: '2789hh15qe7co1sf6m34tlpb7h2fwmo4jxpbw3v1dph7qyropebl17yvota277m1guy26wd1qp7dcddg53r7dzwe0c9upqwygdexk5vf99bzc2g5o6ioas6204qaj653yizv6w7dirf0lt5pz5rcjeui45lvr31kh06mu0rumaluycg8p7d0pfywhqp0o88qtn4mxfnmc1h8lft919ujmlvkksjjh6ihoiew7n5at4hl93wj8vwem10xkoxxn6u',
                surname: 'bqpnk9txbs9kss9yu5365b7qdwbnw5v6qwt3h8ou36coej0npryd8vz6ap1v7ctszdkcd8dzg7wmd9tiz1bqsvcgjpuxu35887kt3e46vdde3w7qccq4x7ni4n0ngbsy202hmfnwe7bay4bcuf6u1ufyrzxuz1wzixoawbfhgbxeejcxnnfnpkg4tl64q2gq1iejhji79b1xcxw8ys8x9s74f21zmro2mrqcqkeza2vtwofa6phq69pph41h6z8',
                avatar: 'bmpnas6bos4sqlekqd9hkud4dl0c269dchzdvsn8nsy98odzucd1rw4lza3trro8jwsacewgyi1cv46ew2ms3gryuh2idehq97xkqopy7v674ez5wj4i2oqse36de7o3tqas0zhoc1x5w1l0p52h9v3osp0urq388nisf6ofuscbkhec9kmo2nbcon14uvo24btirw6u49hvf1hknjpkx4rq800tnp1y26qlu13sejeuab7w0zx7c3emn2s8il8',
                mobile: 'xx3fjkl4j8yz3hk1fxr2siuzrvo7g32u2johjo2vr4xuwoecbtwiavuy523b',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                
                password: 'wctbtdb2sxbwulf2tmq8u1agulnb74li2j1v8bi7mgdfdfp1ef2k2jzzu5llg67jtuucmiiwq4bk9k8ci621nubc2o3qv7inum7q9dhh1ep9ngcsab6c3jiubbb7ra53mdglvp237mx4g02gekt50565h9c418akf9rcvuz7wtf0lt9r7u1mygxyswrr36o1o2zlrl4pxsrziv89kop2fnfuuy8yausj7lzs4ptzoeizq2sdk9pwmqtfpi65b7k',
                rememberToken: 'j2ttq003ns6q5fgv39awd9km9ceohvfl6je3kurdda1mrra3gyjwhxx1rpusu4qp3kk6odkj0uh7pnpbyoehsrtwvl6te1vi2wys2h47uc8u2loipkoeo61774ibszrryx9krr0x45w95k5n9oy2oipwqs6rpyp7c738882tv9j9j31fhepggzixsek9kg3fabohpcc84fu4y5yqmj78dqz9mgt9s90hqofwr7rffaumaqroiksd6hz9mmlfyoy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'zw84uycfeuf897s2zzyu5r2pyap3ht0z2u1cvauf0o71k5uo86v3ivjua1huigi7s3bs2v010yzgo94h5z5ly2f3lgi0vinnvmcdpkbd8zc5enuoq6wwsj0d0hpuet345xf6jkr1xl79oepj3zkzadukhwmjeb7t42ov42fuyiph56arwa9qsg78bc88eid3l06cqh2vvf7rp20jjtwv0zjjzba3jvw81k0hculi0yt3ndywrswzp3t4yjpup8d',
                surname: 'z55bka0orcp8z6jeq1v7k39lovb2p5jie3puy0uwx6gg6kh6xaolnlinsha271bebh0xov39q3w18xsymbmry305vb49io234a6ioo0w2hd5t40zie2qagbhmg8d8zx3t2ktnzteccmr38no4uk0ai1sjf3t1v0ytny127dre3ttky12qnmkcqbvd2r21vo48cq6d4l00tc5c3y4z0jbwvscmcd9mm3sn54ca46gn1o3pi3ut6az0d3jlhfijpt',
                avatar: '44jy4lk2nbilwymqxemkr7qkgmrnaqdurp7mwki87mxrt12sl48d5pdyuylnn28nypjear1xybsvcv3pwcxndr1w4begtluiwc32p13cdb7fk13y6fu181b828eanf7b11id8csspcpuboyocvd0zlc4tm0nkexz555ssewh0wfphotrqhccnbufw2syv1bmi98rpqc14ydpy2a5ye8951b35mk2yq408z8irpgw1cs3s7825o36cvctw1dsdy1',
                mobile: 'vhtjv4baqfs1p9dtmso96jm1m37koo8gl84x6ax9r01a8yossgiqjc0irsha',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: '66ge2h58lvg5lxvkeog3nw3jne6b73anro2sr0vb9abm9k51hs4ol1a5oode2yhii39ovljsdkc7141glnvv3q394gzl9en4oavml28zp0ofqkguaj8ed7ky',
                password: null,
                rememberToken: 'ot5cb5jk0xw4fwn1qkc4lnukx56o4ijotgor3ifqhyses17a7dnx73vr28hu27tcdw0ho1np4ur2y8lzjo5mn69w06j500ifud23iipzqj5lprjfzjp5y9fpr111won9qlhft143s1i3tx5b6bcffplbn9ohe79wf38x7mmic0maz36497yiycbmy321z0medv4t1dutfqfjyi6uinksjr7i1woba4mreqnmcrjbc0tt2r8e0qxsw189krq50g0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'w92d2gcppnb6lambw93as4qkjor5fv8tad3sozrdx4ueqfd9vdb9u8yu34uqkgwaqyyxzsj99hjxk3ug14b6zbyjxk99pmgz3o1cp01uye8vm6qql3exq48fn8dzeuakzq83jdmo5671iomisfq6mx48jlznx7jw6i7pwrsceh91qpujyz4i9nl8o8x6whxri20s1crofbmc30zcg6lu2as0flnu4gkjljehe6gssx2erwwtf377qy1l9y57rpa',
                surname: 'ihodpcufuxrk32ohr982j83yvgetsihri4reymwxv85lnu33euyz0hbngtc3i074le9p7v28l80ivwtt3xw73xoloxn0yd42ja7bvozv8ba1nxkyx3mfuouvvk0h4j3nzmfl53m5qyzxwwc89prgsc2r7w2buut9478ef0lhvjhcrp3t6hsgr3dybjmz7ko8bfo67aj0g4cp2wr4jfas3569cqkbac6wtdlkk862qbel4csp44pdbxnnijuvyjq',
                avatar: 'sz1xrz4aftpsno4sxyvhdd28t8a0kshcaugqhk7o5rxrjx89wgegvqzybvba2pcihixg4dimb81ynflz91lri2aikdhf96fzhcqdwo4b3l0pazkt802p86ug977d2elkf3xyr6437g4u0wwz6eg4q1mu9rium35o8axontw76l0871muwyjflocfu120xf4c4ug9k6mf4rnq9cfm9zmw73zgfgifhnqo6z43iuwgqo4uf5jdja2k97ni2ew2p22',
                mobile: '8yl6a2yl4g9q9dq63d7lt1zae9quj5p747ij1hau0n91p7l0py1tphhmexh8',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'on7s75v1in663pl3n2nm3j8ikaddzkuxkiql4vs53glt3xetrfm83xf45vcs87h1ubpq22w6mdj0rmz4f0dvjq9qhu4xrgwynh5ekcmo7id0juf5n54tbdc5',
                
                rememberToken: 'pkie72gm3as0ow8u9967n9kigw8a8ieresqokkin57pk9lhjkt16y19jk6vbhfev6u1f1zye1diypbuqkmwwm8iql7pee2ul5c9rr7fovucte6775jm5m34zjdj92e3uqquyh52h6z2ttdj6z5d5l51t60v2fvxd62ndsi8swl47fmz85c8iqo09g53244lt902t3hzwtdt6xrxffp5k2n20hkrld3bvyykhf5wsojzkheyfemv9uv3nija3nzw',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '6wq4jxv488s1l742ztfkorbu2668zd6m5zgpi',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: '21ex4xu1rl1j8b4gqshc97j0qfjp8umovwxh7gre3ds3m5e5rn6xk8r7w0xm1sorj9p9ddbnthcwv3u1yj6f50ikrvt4k4ft3ffeehz64egpxm8subntmywiz8894fi7zdiwcvfg2a13idopry7jb0l9eomahp7i7zswfko3zifmbncby5kl2cnk9oe4t98sjdtntjq9cm0sgrkjlcoc85gpjpyl2eijearskan5sy4rgez9is2sb9ba1zqmtk6',
                surname: 'bzusgpsyg9jxmh0kc4u0wuxy0qvpxmf4b95khudgls8dw3ktoz96vsaxq3n5w4kkw8mpbfnct85hdmjv6r57nvjvilvqxwb6v37rhmoddzglswidsj7fp5blx3w1dyubv5mbftn07v3fq1997e55vbudsbti4qj80vaaxxjwosjnhrpck5fyhr1ilzh9jqcrg4ejatgxfdsidz4cxbjhd90lco0dzkf7k7ilkanvbgg1z0lofa71929ege2yg7f',
                avatar: 'acgboh6yxiev6rq83v9ff41hrj37c77xynoajp8kqmkbbpzpbrm4heq9adw49g3ox7lc37vnf4hrgtm2fvc2inff2mbwi8zey1i9fz8wsu5suehg4nytuklhphlznp963x0lye7az8sqllei1kov7hxicmewd880yuq4ov4pt4leygcj7h9q3hvsdr8ggjiom3dpsmks2e3w7qs3btcxcs0mkibqem28r1bwiwsev7v7nqw4w89lzpwfg8za2py',
                mobile: 'eivqt96m1niwj9vm6picw59yfntta2b1740er7669u6hknvk80wv7d2a15zi',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: '0wjex6rhbfe6jwxqywg4huu83vrw05hoopbop9n0hav8uu31tr7qv6q8fnvgpb5n15pk42ovzeh9gxacgd2r1cc5bdc68lx9fwo10crgm2hz8oa1v6i2r1in',
                password: 'msu34li2428sqypos3qo677xqpepea65snzvu95gvh712nl9xv4qhfngsgynmuop6rhi3o2gmertod9hkjrfnsivthok4klwr22ef1575i3q7rss3eb7wa08np7pn4y4spis8k0odrwkhi96o6wybdmj2nszl0b1e6qniemitg8ilht3q3tkhdl1evl89o8je4ygp0aqmynd2smmsggnofzln0qwpwz0ovloaq9qkt61mzj0pz63wfb9oaalfa5',
                rememberToken: 'jznca6f3xw89x5ylxpfc2vl8bqog9t4wz8qmcx8sdx2q9tvcc4f85sidlvb9uehxamm9v1rvg3se53gdrrpiggj5e1vjaz6k4jlifq0udey4nra0z4wdx1z0bmx6l5474n4dw1jgpb6apimonrd9btmwadyfzeuauymjdi20k0gdlsvw8ht5gq0p1pq3ivz38xl6juijzwcm03jfdhzf7pt2hu1nkzvb1uja9ms768jbhc3984a1z8oy8nso6hy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: 'uvojyyadiluiptzrcbgrvumtkpe1fkmlu8g5g',
                name: 'b1mjdttosmszs2jnwpksq769xy2gkwtlj66bs24lv5gyg621qly8n99e0onxsu73fz0ngxry6k66cihj0xau3x85nrd4pk76b8fqexpn3htkqieo880jpkxca2e5k76b4fv3suygq5pr4v67vvg3h1vntra3jcki76h19hl19ntx7vocg1dx5j98904ek6t3s2gzyc78z8crbyixhl9t664hxfphu5vw8avwx928tw596z53zma0rsl72j8odk1',
                surname: 'nmsct7zecwy4e2mx41a2zg42iog5wb3c4xbto8m40xjj8k903in6umce77cjzcoy591p78zpt0lt9dx7peddmbox96y20eiknift2kevpbf5989s110ur67bd799zqyt0wwrqpahn0da2zaig9efjm1we62r0jk6jnsz7ien0qm41ltfg5gyrepmpr8binjwe4cx8obgi688xgursvrbfm60jjmhasygj8szsydshk4cngauf4pzx8a3f30p8la',
                avatar: 'z16vi1i2t6mi96tkq9p7fxnb2fb0pcjphklmbcxknpxigsxkr3ltej7gykogj9t0cejse8opqao7sa8vgddmng9do28n864svkg9szdgd94h01252lx0k3ti7z30zk1riv9f73hjky8ly8tmi9jg0vreewk1s838r7j2auygfh14iqxy9lehmis6rgg2lfbj3o2pw1iz2wizv732eqm4z8sa6k90hg1o7ua52679bvgm23vybr5wd7nz2qkjiy2',
                mobile: 'n3bl2b311tyum4u1fyzr297zze7u4n420rawbjqx3xkio7z3mjosmq18e745',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: '6x59wt2c2694o7bsvlv871c7bmqcs1t4xjaykgj958t9qf1iln39msht5eehmswf8bya1vbyvok85fease959u0urngt3fhgc7o5b7wfo00dgydd6chs8kr3',
                password: 'or631pq0s9sybkebw4cedhfm9pcdraypf0moinqrl7toyh6uytt6see8en7mdjombcrph499pqk224xl0qwm09sckxmpvaigzt2hus9anmkurtjuq9q8bwc34opu6w12tktnpe2fjyx10ifm6wy80yn256crvh98mudxcxxx0x3riv8jy57zle3juloa9yzlmi232ulvo8u5jzg4zzr6a5qgjyvzxu9q9q4cn15wqg40i09clrpr69qif14aao3',
                rememberToken: 'yqkkcnnga39r97s9nbi7mz6tihf1q77z0lo0its5jdue9tfuhbm9lnw0zl2vsd6etog7oia9s3hl5spw1k8j1oj4o584291h6pepfszsr6sncjoq5vhfbfqs7qkd7ds4p1hez1sit3xitfy72mwdycrwcw9pycx2uydbbkth1f4fec0nwsll7kkrd6uo0efvbupt5bh65zkz1h4iohwj8ij097iz3iiloehdghzml3s7sj5rco7qom34quj9vnq',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'uj4ivbrb69kx8vrkv6b1j7ii4g54p0i8zrozdq7cytj8msdfdovj8dz7omkqqt7z3h4mknmmhzv4rg8kdcchy42f8mnpi5n44na8buf8r3ga8kkp0h13ec30p5xpdcu0jzoxg5gjkn0fufxup6vc4oijypjgu659fit2utrkjc2bhpin4ulvhzeduv2xndprkw94zzd79x3f2ne8kqw2it25zemdt9oh5ntqn8jgge55r49zmzcsay0fhscxxpk',
                surname: 'vy4w0p6u2vi61d3091idvo0mw27hsfc0qzkzwbsir7xjxxmgvq7p6tmrddtvjfgleuk6eop8bzfmwdu83kuvlgaz6rj1yqrlavbtmmr2fnnbr2rbe861u1y7sjribb2pquzvgpcq92buh3d55yuc31m9m6yj1zfdrxps0hobcgy9if64vhti9rvvoai38gyajsk8ua983m5qfi6v5b1nk69lwmm7mw27z0774wtgkt4fa0u40husqsshm9f3vxi',
                avatar: 'ntxij8aem7ew1kdph9dlazc6onjo9xitm21sfzizgf6bt1ua4327juvsgm1jn5yh906m46tfydbwdkzexzt6l84f8vp7haknw5tqor86e4jhe7i932ixu9tjfoww0osulpyqkrwbboqi0w1rdeebegnxa0r01aaip6cw8xg3nj027pd02thdk58fi6qaxslrzj4cusjge19mxqm2t8s1z6cfqwyjqstx9q9y44h12quyyo9podlukdpjxt6dsn9',
                mobile: 'k2onfrlf97rkvakrsskjva5o7jm6e1gy0abpj734hn67rrahloqonachfs8v',
                langId: 'pjixo2jwthe7fciyidl43o8lvv7kl85zef4r2',
                username: 'dxrtu7f8mh938v7imov09kcjkepl5kcmsdtutbjttrq5gjwb3i0mqf7wm1yh1ea2dtxmvlarvv3qv8ncog9oj3r47w2xsg97lp7pzwtv4kh5sli9czvq0lvh',
                password: '0bxskgnzm7k6z8qbvk5z911klxo3q05w6taa5z555bdba184l33jrrnennyqmvqycbetv8lwj1jp0owmx2fpax2p3zcqqoe38d99stvtoh258epob4wkrj41u451y5bgj0v1gt92devomdy4h31cb3zchydjhn7d2je9zitlx3od9p72q4hmcxfa91jfw5y5rbt0go50l7ts2lh21ndkvl6qd5pm9zk305vist94forgd3ekjfp50h247tjmtns',
                rememberToken: '634q71kw609hayhhfzhlw0h1oh7dpukufzllrrbo67xnn3u8yih4ocwh1bm4ryej6wwudqnvhch7n3r2bj5447259f33bi75evgyhs3qnbz3xl4bvxvow169b13iee7lgxms1rhrwi1mrgv1wbd09ykj22vqbf0krrtdpxj9kj3cbaefuogz7t9x4y7cma7x6t8fszeat48oqhtp7gq2ilm450idm32mmfld4w5n05abpb3t8btbg97ol2k4tb5',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserLangId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'gu9mufdkqjtzkknbcn2llw1iqaq61xl7uf9dwdlek9clgua0n7dwmv9ixe37h96gqwxptwi2hkljb14b5hagwtx0tzbqkn0b4cf3rxf6amvoidzj8bkf2slnq4l1bcy5d0y8654qd1yreix5lq29btixkuww8voc32nt5165qozfe8kfliyafwz7fzicvdi7do9drxgobulolg1skf8e5peddlkr3155lcoiru1luwkpfts6mbwit9v1oono9ks6',
                surname: 'bhtaz6etdje4bz4stjdqju7m221sdve12v482u4gimmpcybpnbc4evvptzoaf69ld00kslb3v7dnf813ily1t8778h4qdgtuol7qukb6donzs73gxtcixdp754b1q9usrypu9x3kwugicn1czbs4ti53uhnhwgfz91agyldyum4rkjw0yvzolaywhwze49kkeciftg8qh7e4xblzf3o6zanvu0g8167hdqlyq2btgorxkvszx94drjg8eetdyqz',
                avatar: '0jp620ogmkvlq9kqftjzcsyo6xt7sz13ughncpmgpn98v4e7n3pq6g5gg74rn7ca1vd8mn1410xst0bm7fua1n0zb0y7v4x2a1y38ugu017bs14kxlmozhvtjucxravsjhy5q8r2b832sccqt9ov188iwmuvobq7orhdv2ahnpo8g1sp0ye57j769lahabm71es48ucyrkrvf6wlnww8kl288kcd23ye9v6z3kyz5u43lkyfam0dnwpsbp08b82',
                mobile: '98gjjh788uy5f0wj3hbw4ld7og8cudk8nqmdzdlydaze2bgucfz70c5exier',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: '6x7yhw8rscxke8li58r7iybto27uztiq38q2pl43ozmjlxl0noex1f6ntb1jb3up5fpr9o6cpkr5pd052pebycmyc143rgieagv1pkptmkcy6jk3nsi2g4ep',
                password: 'imqkn09tbz9sh7h6yvzn01ckxlgdp4u3vgkda8jdlvilgnfjpymay44ygcrsih8ge4p357twmjqcpu1llpvige2k1z28dg7xhuqvxzl9ympvgisicqxoq65dfm773kyagln3ddj5ttc1xir6td037nzjphmbe6yarvzdy1ibgnsxw74tpie1uw7p89rd7orsjeza5cnk921zdmjorm9ag240489fqk0qkk29aq6bwnahj3lwe1wi8bhxrs6tmex',
                rememberToken: 'vdo8uilp20l84yfrfpoffyedvu5lbl9rsqmmyagkb9r8hd6ty89b5zfz5pgig144rvmjdimq5zpo3bv5wbuqdi3b5edgx25zmulpcgpmxcjconwg0k0rv96ebwfdd56zd420l5dr1g2jppqmxz2su3pmgqsifhw63hgaf6zffc7t719b4stga0h6qskay467tm3wmekuhwvo22lpwcd82bmukxdg4a8tlc0hhtcy4kfv6h33d8c7ezpvk238gbb',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'xhqo3rgyg910ircw314lag31eemyav2zrikw4j7stzvvil4m4dcq3u0kkvysy96evwh3p1usze8gg1ms57ucuaia39knulz7zz9wr6awvbf82kndl70k2kmjw4xk3pv59aky5anf26dvd35i2psr1wmw11vpm514b79b6k8nisirpf7jcpfxszbk9y17793znttuvesbwm7q2ich8zz47ib6ailyaaersaruzr1ny9m1p0rk1gqjrna842el5ih',
                surname: '752q0xmvasxsvn0j828ltnzjfsj206uzxw5iaiu5mwjnh0jzq5dzrprjfbfkbsox90re03ilfu1q6ehvhdvzf6f0a9hqqnxcxaeg1do24xtiz4ohfv1gmbcbjqtleg1c66yuue3c4mrgokmxyzejnpecbkqr99u53ve24zlhg20tg4pduelu6ieo6r3ol3fdebnlc8qcwh5colvtixj767ao3pbgf24taehq6tsbyc8rykszkqyvepq1tlqdad5q',
                avatar: '19eitz1m9tti85qq67qe7axk9e4zt4vx7fla341dtt0eljv21ej7azn03m2fflzx3wrm5pd0t07dtao31vdmof3kzo1fwoam6ac32j2a88n33ar10nu2l1qi4sgw3z64i7eyt337rp43blu75q2pgz2ysgmwmf3a6fvuds1ziyxzv34np6k9bpkv46oc2gvwsxqzurk9tf5jk7wmav4y79hvithhm41amfbsl8jtufv29hm85vn4j8by4whu709',
                mobile: '4jp35sn3mza12bkw4znuw2mlcbbza7e9fodhpqxxfwlzq8ngrolhzzzj1506',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'qya4yvgvrhoht26miloabxbfpwov3kskgkr0hcxw6u1g0j2611ka384kdeqxw4l8ql1bnd4nm7rawo4w4seo5zomhidec9d1v5cbwagtexrna3ug737sj507',
                password: 'm0hguthjjwoxqbygmnbuodzzqwyq2cire3kfzr3yrrfbfynbcp86v8ixqm69obgjxkxnbfw5xil5rcn2flaxoh5myz4ui6iycxgve8lacqpbp9rpc9cd8tqbj7b1sm3210nq01jy2ndm1c5bl12b4nzn5a16k5hjudlgu1vv305pn1vbfuipvxaubqso31urojggfcniirxhnlg3ybupann1hgwdpp1y87jm1s7nkljddxv1depefesrpa6tx7y',
                rememberToken: 'bdyqd5a4j0hqla4dtf5muq9qpia22wcps30kmw5r1dwh2omo9d6l0onp6bn6v5z4q0bkwud3m477ulmfhrjdbqssb1qxuhsp2h674lobs600qy2dacvd6mh8w4o1dudayg8kg0x3kuwlpepljg8zlbvfbc5afrbjkwodgybhiba1a1ynp1orhkeru6c4juhdfe3qtm6bv17fad8a88827urienvqgy84ploashkmy1vmdjtpamlgdi4wgs5qavy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAvatar is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: '9gmcz116csic0ubg8rvu7lfwl146h7g3i2kxq9bl92jtqgzekz4zu0jbjf9iooy5qfym0fr0ugycxk19eg9xwv8c3p1yl599m9lnnbw1y0ppwwelq446pekchu831nsq7yxos2ypkxc2h4hoxdm50q0q5c0zhh3aykqoxf798dmfat2okk8ra8qv4uclcy2bp5ve4z1iel6z0ggddntpylzjop4vy94dp9qurl1hg9og89ea93qd4v6bvpmxc09',
                surname: '7r2y25icwci0jwdihoesfi8eoyo1xjvyxxdo2oivjzwtjqbtip8dhtojvvcrt6skmvig3b10yd97cql5g8ok4cquyy9xr5a8ygqf8mk6nsv8r067tpinb4qortp1xnck39p99cwvy0bqm6lmmjdcbneo3ztpzj9wc374yxctl6eldcnmuiza3ghgjsp1azop0evdld9v29syawdvtvn7m935cr37atmjj0vkv9lnayvv37cvidvljwxtjfkaq2w',
                avatar: 'c0yenwyl0v8r6hewr38j6w25qa3e43uycnpd7o76s49rknnzki654xcbsw7mcgmsmfehkt210qb8vr2iw7ajcex6i9r5j2yn43z1ki52lm9cjj9nokufb3qxk6nx9uusexc0ds3bwep8lzs2tw5ax6nwiaad9r15o9d6yr6wjaj0sqpr51b54wffifapjmhsz8sgf3v30bikh5cevyblcrh8zawq4sy6vw4sbt775if6u2pteb7g6uzatpeqnabo',
                mobile: 'fgg6haezyv2cymxs3umm9y3mms6qcklzxmwg41efiemllcpmrtmqgkv9yw60',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'urvx63uy59cau6h96m0ldruqc6t7jbjpkf2g4jj2yd7mmk4dr5e3sct4d5rueevlx5dh85cv8aleq2qqljk9qr0e4mkigi7dnitpjjy8a7yf5swj35el60uj',
                password: 'ksnrh6lafo16q2agsk1tdo12m9ae4j68ffdr63dl1feyx53fztpwxoc7nfg3zc0yq0tcczfki86mau7x56dqi74d9mt2efeehv3bpr3a3tn0dcxjo8gxqm5yo6jqic185o1wexjyby851sffpeovt7vq48avnrmkuevtdk097f8zrycx9i482kp7ivp8a1z654h0sybjrz3gwl92ydyc1kz8w05j7z1y3izuyvicml2uxv9ii76ep5zkpn7lzjq',
                rememberToken: 'ggtpuczthy083q4a0nw0htfhieh5popmho2ziv5x524melgcw1q1mcbe3qrge5rxa5q44xvkpx2hc5cv1kggyjafgntgz9lkwlxl6wyi870qyrjyxsy9zy7xcqflaa6jzyvu7ggty2nrqymr2jyusuq51dqioc2g9jsh6x9j2f4yg9gbu2gh466y262ijregyhdiyihgv7anbfhwfkb6ingfxh4btb0f1kj0lv0zi3vofdureazpq9x1wm8xi0x',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'ork8u4etxpg2eqcezgwwwqqmpjzyjcszq1chmahs63h070htv5o2avohr0swxzet7afs7t2bf8auto0lpj2ix1aqhfozt7vlb2cxp8inki1kk3lapy82e68ad5lphb3kyog6oucun7p64kvw36xbfyk453ijymj7o211xi7yhigxe9axige5cbqbmry8wibi22oekbp4b4z5n9g5qi1469fn7scw4sqpckmvnsdncrptsm81df9yuruuaqm22hq',
                surname: 'jbkmrbedifq57f865w5y9ss8vmcona8an5l70xqo0e6swdk8e6y84f4zy8t62s6epzbwpc0i88fsdnwwhc5rb6el1csx8lppf6yduy3tck8dahmcxysfvdrgb8suvavecge62chjynnl16w9mj0v8gcp426zo59ipa6suyqagef46imcr9ex8sl8kk6vqe47xz6nn1p1z48kxe1czc8ra8p7zgdrk6n6eslg70wnqh73qybiz6wtp9snq4bmont',
                avatar: 's6ky63pklj2m6c9701orcropiqquv3vlk7mserod7hi590vsxcrahq776n0he6sstjxcqg3lh542gb1b09cuuylb6bjqdhefhb7sygj8ufa9eaap1y734x1awdftq8n2bgo3e7fnjx8ht6vdqitcyyy5mjvzeafnq8imin83wcd1jpli2nr2jt2xvtggjdwdfks5h1urq31e8v2jexc8glwt4p9wlhivpzb7epmmq215rvegklnov5qe2a1v3c6',
                mobile: 'zsir39p76ius18tmjagluubvl03kjzonk3w815yc961jipk3j2tqyeb85v1lm',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'tlcr70p4uqcipuqwl4ghiifj9u3zd9tzkzifj8b2bevpt2o80ydoon8tbf84huud8ukb7mmgq0f0tx74be4zvze7qgcmttcjxp4wx306cz76rcdn74o44wg4',
                password: 'ddvyu338inc1qiena8oezdu18c024um7nlxabkn8sy1lqjgztq6jo5hk4wzz0kim4v6f74wospkbb5vak8btg1czzua0juw2c4mwdo9n65fkvly2bu2okj8x7j8hv7bv4qwxka0k7s6y7v25hcl0dnuzca0ysefoi9tozerir7e2fote6xq5sleulbsxur2b4mkm52su6nnv1tye87dvd6a1quuislkx372z85t5xbdj4enadleybfbc3zzmzam',
                rememberToken: '3t6ggo9sgfrdr94vcxcxepzmyrhfljnxrmnoq79pqya5k9p84xb2qi0inp0wf264cha9xhknfgpgay86m8mbcaoireegav4hyuparxq7f5m2yr7pcbmvyp779ffo3m4qouvkjbgrhjo7zvuuy61vh7ojabs071ysvnht1ukg0oy0itp7pcxqpibda5jkuqpy155sljf7q4p5m0l5yf2b0nkl1fedcbjm1lgl217ew1mv4m07i1sfomzgflzu0i0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: '3ajts5bbn9hgaiabxomq0ug7szl0o1w7j8cekiwzpoamwtulx27uxpzgurw8wh9ewdrazy29orc6l461idhfj2c1z2wdiri879zbd3d2cs5a7szq96an5b0sqyqeor8norhiq8cn7hvcpub121ji89oa8f9qeprm0qmjvcadsa2qdgtmr7xznacum5xv85h1f94o5r3v0t401hs9hcacjpa9d0ljlrtmrv8n0cqjaq4tdsucddbh1w50yq7cpqy',
                surname: 'advp1r872l9ppq0btbyolgduz5xie3oauksgtooyajoj9lacacmigvx7rybu0j7k78ma8w36av778vds14u0huijllhxr25w31ztxf9g9febqcyynabft52zmoa89msyuep8kjxphkg4whp7szqr9z3ouokoiy7ocfq5hv3wnxj0wkr1jjrf0twav2q4s7eqwm2umy23e4lk0lwc660skkqmszl8diyihzikut91mk63oyrb7co2to1kgjmnlfn',
                avatar: 'bnzq94w8lc6spq35miyg9513t7r1660xagu6r8y2o0mj3ysykme00p48rns45g70qwr7hoeywalb7bicj24rb8j9y961j8g4funasuqc4bntclphz85n2pzylwvhdlpk5n99cq3vwe1jtwaxqwr1hcnnfp0xi0xmo32s5yk1a45e027s6ocqebi0jcbxkjtpcij371eg0506av1szymv1w4sl7ueur0s0iwah04imtgsh2fx318c8jdxbja60xb',
                mobile: '967psbz99wt25t1cikeucsxjk45r9ojc5wiv78idweanu3n28fn1mfo7i7r8',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'zx1ym7xp2bmq0tuofbvydqrqe9qb3dxzs2ba3y95pc5yau40o2udp06fejovzsvdnx48oub831nrsm467pd4wnkx1qc00a7fi2ligy20fyufcvtblrh5ofda5',
                password: '1w1stcqarvwgcd8n7kui7707r59ead1lhwdyi0bt4917dx7y5b8j9pymooesxymohff8za3khn4947s5nekoibdlciqhqvz170scb5jg16tvaky1xns4rni2eoho9goen50nubser7t9l3xkmeay2tl8rhp57esrdx7t3xk2q4l2gh588k6p6qsuhpcyd78vf457l0t73d8b1p1owhx9xtiafep9uowmw9bcpzxozdg7of7k151zlxrgm1nmq34',
                rememberToken: 'c7s3ln3p2lp1vmfbkrwu5abu0zp2kl8khnal3gdn3g48l89qb18r6rj4bcyalaxh73vnn9ha8k7ki84wtz0f7ga059blkd30ndyzp0pe6xmzmj2ldvumbn38y5mptfe79kyvtr93fhgwtza7n7qrsh8hbxrearcz3azusgem44pzhgph2neha35n7f85qvulmqdnc645miappr6e1fy67pelyhy06bya5fqow7hz7e326ill9il32cgo320s7jh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'ff5rcnf2wgtfmub3bhbhpdw71rmrhudrkkgz7p43agz2ravgv69kvakqb0v7i5kvqf6s0aiedesppk1aiahwdd62sbyauf4jek23jvx8oauua0ri0lya8wsy09mm13tdjnb051xk00qolcs678wmn7rp7dmu247lhcsin9nuph5f2lwg345af2xd0hluwabx6cid6zvwfy1asxl5hm2d93voh4i878r2p0v5a82fhxgu2k5non4vlwtkqn6fjy6',
                surname: 'xqai005h3p1wdipzevo27oln4k620y0obefpl9k5tj5ynvf7k1kax5szb4kaw12mo5s90e0308y2proy994xdchvqlw9z9m6fabivrd76efao1mdyvrakimeeiwiane393utk3xd2we5cncrvhys2uqbpracl9sq61t904v5ozyuf0dv10tvvhkcwpga81maq0mi6f915wpx2zjze18jutbwtlr9lddl0bhjxov18k6ko0wcgshj91mmxtqgs1m',
                avatar: '0emnymsdy0o0s23dl3qb3ayp157610bfqpp2n6a1xgz8e4a8npspcqaavv8ktnhpn1zmqaf3ysrw9qfu2qmu7olqqoafvq3v3ut33nrsrrtepq1ux5lksboh91tzqf6v46l442rrub3dlhop3b6i7y3nzo4zmy4ct25jkcsmmkwsdm6l822sw37n6xm5is7d82cmea5l4q6gzr6pvtrtt8l3dejj9n3li6y62q7lyikdx0id8xuan1amqegot52',
                mobile: 'nh7pvoib3f8bibbgdv0qawg1snwxed7oy9uux79hsypm6xt0w4ae6gvlppha',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'ema215t4yswtcjp3uteubfnx9wy1tnekv978m0ac3z2v4fo1523ryr7iuirceprrojnksxsusap7npgbpbvh764hjdxl294xmyuvh4h6o818dzqma4a3uu5d',
                password: 'bmnctlvrzaorjs6ledoe83t4hxq1k221we1fw72mfy089vchbr9uee10lhr2jl33km6uulc9eqpynw85yh4qsi7plwuuwvxlungtjzfl61d4d2v5m0orfqrpagubl9go1x7898kh1h0zpvfl6rx72h6aihne93kep4w47ly0f1qv93mskhacy6vc2d5ccdii4pparex9yvkmuourl9tf76u1w49ihnvtlnow6z0aik3qrz4hd9yl0kti4enfp7a8',
                rememberToken: 'm1l0ni2gzrad0g8tkvw4pj21qzl4m80givxtaimu1nxqf46lti05z08dztvd8qey4oh0mevldqrbq90n0eaca86a7ctm4zeiskl3h1gw9fi2768b4fbsoer3hphujzrrsjwsu4uf7cgkcckypmdahovthbeg4og1bar33mhp16ckrnk3u1qc30czubvgoqc71orwb0531e8i3bk5bdstnsc73han0481ubde3pniv65syix7jqw6ewa44hif6l0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserRememberToken is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'fc3gt5x2yz7z1dxyj974ru6wuuely47adlfk6zge8u8ga72mmhhxt4i8nyiudmyvyez1kcmu0ellpoe9pmifn0g68gpeev2vo0brd11s55fk4qqmcophxy11p46lajn0gknsr2ssqbhyy9vdw43p76xrr08wqphh2v2rigrakdq37qfxug62pnh2l5h6jwjfvbthrz93dd0lvmntf2ak58dh44fonbbdpgsp0czpe8sxwug9dl60nxkhqxw38w3',
                surname: 'jvmfgyn1ofw7l152l4jz6h0duehbm28v3l6ziwwp2q0fd93b01vzcf6u5uqb7o8xhev33fqfqbos0vhxhgdy2rkozrrdhqtin8hz0hoj1dd0cxv1rcm5990yf3vp154m27qtz6sc7ztnq7shi4n8hs0qnz41h6559k8q5u9ce3xdn3m1uh4xk33ac91l0q08xesx4moqmd5j8xkseixonag1alfwg3ut7is0emvmsrr7gl51o5rntsrvg864nk3',
                avatar: 'gbogmbr8h5mktcp8hvasn6sonpez66a0ldop8wsjiakelk6ku4ehj721eza024i4uzpxq9j4f8vczyygzb5l5mzu63kcvy928jdcge09pzcrjolx1i7lexue5emmcr67mbmcak5pgswbj8sclcsux88h2ud3aj5m1j1p38pop6j8fv0ee7pyatgy50ewfbw4wpvvdtketilbks27w1cf9ewogo8xx51e9wcs4blgqcbnvkict0rkua7tmz6ycke',
                mobile: 'xzgk0ccc6905ct6qluap5540rrfb7mf3p1co7ixfm7n25modgoe6ydwb5c75',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'fqhlp4fgbmsacnqpql8fq7ge3t7mb0gslsyxlqsdtbks7wr6puekt8iv6dsgp2ivuxq2dkkawubpufznb3rt2ohkknab9zsezd6i73ezetpy3r9onw3uxkkn',
                password: 'al3t2uv2cxbfy83zwg9m1erkq65dverquznn21r3rcloyavojmzc80k0aei6jizybzbv9haw0oj5mpie617odofe8tbyffivn9tbymycpk9o38d0qzum308t6b92ruipc2plgg24sdu2b64ihvd0qfa36zt2mcosl4df2e4ds96r3wu11365dbf0thety2a4ngjwrdgi0l853bbr0c7ke1dw5w7ngi8anbrhnm0cs6dxqq6ybc3elrbbsy73uet',
                rememberToken: 'qfm9xfr0x37aag6bgm15carf4w46f1disd058tt6cmmita7z1qdr1cx5ma8rrsfe2qs4x2fjsl5bwbm7ccv0xmtibulxeu5a2y732karahqok8dji616e3h71h5p2qtxvkpbk2ymlv3aodsotctt6t1uvxoicyqfqnsgnx2bxon34kipowffgy917z14xwfktz1apeh3i7zyhls046ymy2hf23exm995tkm5dtfz4pmmseqaiyj3tmgl0x8o5nha',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserRememberToken is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST iam/user`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'wdqbeu5l2sxu6rryda0sp144olux5h84mljuurmkt0eg1gc9sract7ugvo2ls5yx7dyqqs69pqoz9zesl681d8nuf0drrpcm35yemrpo5viwaocu0m1emcnr98xu8nqq52u8euvurwcs3qwdxql3nnzxl0ijmo8hzqqllqied8xfqzviz4a7sgvcqjd12zphdyprnykwdlvxil87wbis2530o9jh4op9e95lopq2jtn2cmsn490ixnsef4yieoj',
                surname: 'tisjszjwi0q88r4cc4f1xq07qjxuhhi03biv2hby9jff4fyyiydmyq41j4b5py4h3v2cy4eschoj9yv7rudatzddk7lb81j6jvtbi7zikcpe4ke72vl07ggastwsdcuexw4f7wdgvrxo88gcfnuoecwb3ccuqlua3rf2ysl13f5a4ksi1al9sukral6x0cuyh8i339xngo1iji8chnqalegd1c7y5xjc6uud34w8e6dlexpms9qk8b6a2s2wuf2',
                avatar: 'r4mutycmhuj0wbelqs546cv6g97qp3f64toaj3rnl1h8sohwzemhmkrr071qwcskyuchs7jboprnaee392vbnn8lng1px2fflp7sxh9kgocnfzeyc1d13hjwuuzs7pdsgge0ykojyou61pir00ziiruieugluph9p3arnacvwnzp03mqg1muu362eqpje1zr11ql0ntgw4yo2hsolm1ocyljyjd6t6cgdi3esl1drn8p56scvut9lk0c4kpyqy8',
                mobile: '2q6n4vkal0bn47pgug8lhpsea0c2dmshht43rcrul3sd6cpyzgcg1sqmeur4',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'pbrmku6qfdnfbi2bksz8pzdrc5qqur5gcl5h0kjkoz23da7zhrxgr07hlt7207q7gcdqemvoqq8ra60tx0zt27wzibwxigu8r6rhxfw2gdxres4ietvhmri7',
                password: '003wl20xw7ba1tfkiymnpftwdnxkpzqhlq80bpbx2dwjlkby3bm0vt7vjx7eu9g3wpthtu578ydwq7c6vw3z4nbh7e7v1kob7xof3ap5qp25kvvuw27wq7anyybz6fwag4pzdxrcu13ph2f6kp8ozco4qg7wozj7m34wbao34yo2xeylblnz9x3xux3obv715d6p4w3fspp7237atflu7g0dj644jx1swje16cefxkiwn8q3yp3v8oihaphy28l',
                rememberToken: 'xlujbu7s0ots3844wy4fwaj6xewt0420i2ao1hri1ol18z93354hgank0w9ibs1bqhzlnad96gmjc88m5dou7p9vv0ynuil5lnzosxfqn6uby9icxjoatyc96eox36r0mbu4r9q35nb4fi3j9132imyqqbez2ss6vxc5ztyzvugwxetbzbx9ku2p8kkgx5a0t2mld5tywqv05y9vu4552x6zeqkc9vibp6upjz9okq0al491x0um1o6fvfe6dn7',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET iam/users/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users/paginate')
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

    test(`/REST:GET iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'ef5e3cc6-44a1-4ae3-93a4-7f090b005ffa'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/user`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd4509060-bfce-4080-a78b-5c384c0b0bde'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd4509060-bfce-4080-a78b-5c384c0b0bde'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/6335bf98-7caf-44c4-a9b0-bd5b1d628a3f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/d4509060-bfce-4080-a78b-5c384c0b0bde')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd4509060-bfce-4080-a78b-5c384c0b0bde'));
    });

    test(`/REST:GET iam/users`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cae75e0b-db75-4e32-b32a-01e3a68b4993',
                accountId: 'c6fcc513-7520-4132-9f9f-2e17f44a5f32',
                name: 'cbpkg9w9um4pjk50zloaktbsk6vy455en3j1mn7ugztgxuqv1vcrnhz8ide1eqy1yw64zftfin12z5i0yecwk8ips7ymwc865xn8bjfa579uzrnr8y23t7l9pxksktebw5plzf7qoqezaq72y53tnfzwd8xe9bu0rueoahk9svv8mlcqz3qhudhudfznn6eu5hhzhh5gneo6q4qkxx8tf57mraw65nk2e8yntjspf26pe4omsh8brvr3ho843nv',
                surname: '52ogjy81eovrmaqk1qigjklw99h235y8sy5xc8475huchj9ueexrbod1omw3583y04vekd7k3q9s52qdljnzvvzpssuqogisejo2wh5t90xqmior7e8wha8g9uaf1i7aq5uwrcolvests8uldjp84oj93t1cosr7g5o73y7rgfb9tdy3tbewj66nwlj1xoemgg4e6t29z755ydf6qzycxt0m9ywh71tlbs5lo86dbw415nmuuhfsrtcn0jyhaq6',
                avatar: '3wbj6fqm57djfjpzy4h610awdttcx3hh7n0u27uemydk399ezdifilswm1crngneh90zlm5rv5cqvdess89kbi9u4klho96ccxm7jtxq6qdowszp1hu9spiafi9lnc8m66hz8k4wnzd5kjltoc19hmvlbyfbidwdtki1fcl85ipagtm5dxtxyiu54rb5ku75koxkax822lvgknh91f271p8u8blpks3u2oek7dk25h3ixtbjvmr44go097t79po',
                mobile: 'jad42n18ljgwz0l003hgefbjsf5i8iimuy0jbod4f85n2xr33bue3715xkz7',
                langId: '0b392711-1321-4768-b1f0-9b328e5c07f9',
                username: 'b66vkxn262b5h613z22koy3rynkgwkhqt2ta0jlyrsjqa298m8bwkvwhu8zimqlu4syukeud6ih0cw4k1jm1bfe3u2d9yydo170ox6aeybq3m6agqeke8tkd',
                password: '5l9gdtu9ljdkiu86ummwrdewe3lhve8v050tqtml2noufzmhfn3h5bg9t4zg2agw2ap7oppoljuhhkhbotq2wcz6uwj2dfd1ye5qsai7dyuj8z1y433mkb8kz0xg79x128edegxbq26sk1k69kgc2hf8bjti0ic3beiw1e3jt2ibsis797zcwb9swlfgdt7p3pqchbv8rc81arxx8cpdfzjehl5v4p04kex104u90jxwpt788r9u15wjdx13ejf',
                rememberToken: '9vl9lne0k3ahz74lixuphnya5cnciyze93zltos204w6sxlxpe64gyyuv4x14h4xjwquthzsx3h00twqmeb3m454kmlu4x5l81s372qkcbc3v7dx72mpu8w6upongjzviwa41kt0fjj5x4y903cccdt9qaudqbonejx9d3vn1lfq8jocr7y5uxfel0kbzt0xkbbu43tzkal97el5qunajih1sfksqut1fd05hwhstldij3ibsbup4ttjxlaulcb',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT iam/user`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                name: 'ob666prtps32zo9j6j5ajebiuzblsx7wtspe8hsd85c4slw70dg7zcaeiwikno89x6vpzu4kncoevh02pwywmzjz6g8wo3lmczxkn1ilo193p9b151idx6u6jfntuq36uds5jo5fzw1cae0x1a4z502twifpc8rsc8bolzv4e1sm63i6sycirsienflnr6ntt2o4hlhbb8ea2wo8o37y1owxlsc8tykjq0mkugytqk7i0blyw6xpc1npan32jb9',
                surname: 'q0swu2li4doh3pq0fsdl719ejwqfs91pe5etyzfr5k37ptztg839dyn8g7oshid7t34eodpxewl1pq24ljwo7m2pa50rindhboklzf2htjepo1xi8rg982f7td9xgtihptlwpev6icg9yx0gqkn80i4n02wlj7d25r3dly7p3unexqiczg0911xfq9tq4rmjiip4pn5j76xr03lco5v895nsvq3wibkuncl95hhjwj8di7fkwkgo4s9zwahsm38',
                avatar: 'uak4pi4vw5wtthfjqt7e9gi6xto4beey4c11i6n3hbi1ltus6iswa1shbcxtyed7xugsoh6f9rvder5mabcagxd9kp3lk95jpm3akkl4jquz4uvyirrvxkp86swsfeqijw7xl1m6a85z8abpuya8fln55fmgkzj4vzgim3f379g4zmqclaxkgnjj0m83bzt0jt6a32i78jpqrnq8b8refao8y1ayyorj9bv9p5mkosl1c1siexnzcedp1d52tbo',
                mobile: '2v8fqqt452ijqc3bysi4x582el469kpp9odd53jtknhejgqabgsgqp3xo9ip',
                langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                username: 'c1oc6ocxe5zm3p5kc32a3xl7xs6lhibhhf4xts9lr5k0u3ste9c06v7s1x3zjobspvkm4p32is7exowmeo2znha3qxx1hen4pzhk0ysg35laft12et4p6nsg',
                password: 'ccd7gu6pxq5znyykqfg8itt6gkgynu7oe7y9cm9l3ty0bn59fv158u62o83jysr52vxf2ea92f2h1g4gakkw4wosn2x3acxcde1j8os9l3h9ga7na6338568qrowez366na2ojdz6u7rps56g83xkdd4xafcgo0g22ytaj177gwmrfoccot0qznnljr0wsf5sdtvogu97co8x2jw0bpyofhch19124ikg524lxxuxi7qpd0k4aee00slehmhyzs',
                rememberToken: '4g6tsbiiem5tbcpui71206djc5yn2zp5cweh5rhjkoh3bc4001d5x2abqn16f9yp3anvglr0nas06fys3dkryya9r8g37ebbnd0i2hwv2par3366vac6v0b2zrvva6r4gfgmq2oqpl6qtk3kl3f24zjs9h7znj4kuxg1gon99mpdfi46ipd3rymgzbnwbfezykaekzb9s0ovqi5k6wu0q564lfjrb86pw42a3i5ws41j7sqf0vunb2gdz01m0ic',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd4509060-bfce-4080-a78b-5c384c0b0bde'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/25b21ba0-00b6-4c16-8b7c-9e55dba6f18d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/d4509060-bfce-4080-a78b-5c384c0b0bde')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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

    test(`/GraphQL iamCreateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '292cad7f-b468-4208-946b-3d220a684030',
                        accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                        name: 'p0y12y0ui2pxyir4umvjmsjiyparomon6m64easdppymqjxtxkimxa65xkcvbnrzjsp722nh4txf388sctrm14icbzvra0r8avm6eyfna62u0utw86dx58v8s6mcjay0n2ayfabl5ob1djihvvdyff1vacb250djakupy61hmzz56bat18zkk4fza9zwcbj6ps6frsp463cy3vqdb1keqknc13isavj4vgmxr4curguualfl387pvarl9t10n94',
                        surname: 'h6mbil1a03z1m1eyky1ufa9fdky5o8bujvjv8capnd26q3ep0kbjyciwht3iu05eitu0l5enpi709knrhi6rc7xm4gmo4qb6t9jmm2na6q6gskcx3owd85dlvfwvrn7e3jbem8q3s3wnfuuzvxp6c7ixebsarq5ryprtujgdlncwes5w51e9vabfbw8638ldpgnpxxa8wlkc0ujuckp5yzs00kray1ysewvya6hm5j681lh26qvefoslyqeunbn',
                        avatar: 'oo93rbs0vltv3aot02fovphgflz41my7048woue9wr46u4kzn05in9mvcd8bg309i0rnsqckz65vt5x0sl002wli8mpnaea0ese2ksyxs8uo9uhz5iunfq2lpknav4cs51lyevz08p1fqfyt2t7hv4vyenh3febp8holg9zqkfu13qrdg41mma0f4fiikxkwdlb25cgd15z4aynxokm47ckzaytaqk6bga14kt5dg97ua0qovxrdd469kzeyny8',
                        mobile: 'trvo214bdfjh90nw0la12yfu16rfy9kkr01sk7yrf2evth8m45z8g769ztlw',
                        langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                        username: 'fegv4d32bld61p4s82z0y0ffjlspk6fdqqby3perxzjwpgt1oyxzhsfwx4i75msmfwev1p138hc06h4ibg0kq89xvtwesimrhpvjjqqgca4oqlrg8xylb6e9',
                        password: 'mudrkyvge5x6418be9zv2pnjxh5ltij5mql18pj94b4rywp72fd8pym4yqspkn8dhxmxk8x85eamzpy2z8ixytfudh2n5nnfumlml14nph0w5ozzch6ajho85w0lur20vzn5v2z3h0edftmkpyu6lps14uyz5ehpmjofjotzc2fbsr99zxglqtp5is69d8kgph403uo3cjbxviovkjrtz9axk2wmiu37y9bc0mi4irs74vnk3awebt7u864ohb1',
                        rememberToken: 'gjmxfnbig0s1xwew3pa3puycvxe73maabm4bpi0i66kx7tscturjm6c9v3130nw5di5o9g66fi57nb68z64vsbod0yri5zaapcylpxf81xhxwkasqjxopkgyl21z21m5letps8rx6fmee74avwjzoa4g8ms85xi5uqqqpezhl1m19a9c6cads805h2quanuqee3kcrs664t8jrkuxbx0p67p5wax05be3lgsig2t5s44e1ne3olc2i9cj3s0df8',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', '292cad7f-b468-4208-946b-3d220a684030');
            });
    });

    test(`/GraphQL iamPaginateUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateUsers (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateUsers.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindUser - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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
                            id: 'c31c9b25-f0f3-4ee5-9d7f-645f06b0af0c'
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

    test(`/GraphQL iamFindUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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
                            id: 'd4509060-bfce-4080-a78b-5c384c0b0bde'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('d4509060-bfce-4080-a78b-5c384c0b0bde');
            });
    });

    test(`/GraphQL iamFindUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9fd9161c-300f-4a96-be41-2bfedd92b3f7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindUserById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd4509060-bfce-4080-a78b-5c384c0b0bde'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('d4509060-bfce-4080-a78b-5c384c0b0bde');
            });
    });

    test(`/GraphQL iamGetUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetUsers (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetUsers.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateUser - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd072f7fb-e636-4954-a60e-d611e5b5b238',
                        accountId: '9e164b41-2b08-4cc9-9e67-69c6f55c7f0d',
                        name: '18tibmao7sbcuo9s70ucg6vmfc31lncv0zn74dcar5bqg3j52psol9puba5s245m5ofh2lyl9q16kn9jhmbwdezjpc8ah0p7i2cr3s9myjfiifs921k5vcamqeqrzxb7hz1dzk1wu2u36xsfth8qruq84rj64ag5d847bygwyumlq9w5cb59n8uw4dukmhie4tidt45tsrf9muw853aunikkx9qwdheekkk9cgfdabczkt9idc2qfrva8abyj8u',
                        surname: 'bwkwxhchfpukx9h15v68vbjc08iq6889988a8dt78chx81skb34gdrqd3rnysnzqzpeyvwzwsl40y4oovtspy1vu7vn0yt6ytz14a8a0xucqwvl78mlgjaj60y5kfvcdwyhfmf5d6d00l48l87bxm0ftefq4obb5xu9a6ucg7qy5u61djke5vh1i7zub9p9y7p03imac9o4gvl766mcm0men0pwyi3y7ff9swgxhd3sc4cwcspiw8ryzchd7ef1',
                        avatar: '61mhj94bwe54st9783o8kre4ojei13ycbpryhqec93t7c1xzl6om6nysurthwi3pyy6zp0ck8kb9ws9qaqneogbrotyy11g0p0kbr4feaueh3ockv3yxlt3t8xyzgy5lmtlu2lb2lfcauctyx42b2cvqiqda960xbu5900zg2mu9hd7zi89glfif9r2rtxuomotizg7gmpqswo6s8zr01he87q7d658dnvugue6c7spi42xrxll15pczgn9asjc',
                        mobile: 'ua419c054uvi4vzd7c0ywnkblvji3ptenh61q2jprp7jf75p8dltnn220qou',
                        langId: '476da486-df31-405b-a899-c830461ec7fa',
                        username: 'fvwtd1fvhplaull387a8l7qnt88ctpzwvpf5ame6ae7dh63d9jal3hu4l0gxcm07k5wgpjbgnztzm9j1mk3vai4n9dot9363of9l6i9anxyevu8e6ynhgfr2',
                        password: 'xe24sbng2g2etwune5gncwrkn3f8e47b6bd7m0j046pooj53y3ge43e7dznmngqbpooe4hn4bor4qvvr31ckqf9wupvaeonfb30espocr11xosgo7oswaiczg6xfgm4971z14jdoi31iiy7eddqo93yrkv7uvhinkoxvl6z7zsr44o2q0kieww4uu6tfj9ldv9842b6s6a9aulp0a63naqojdpqq29qriuw9z2n3e4iugympju3314j0gm276ru',
                        rememberToken: 'z0o1wd37wgvhntrs9tviqscffzin9e5f88enkumi2t774gfilwqarlptybfbqu1p42y8h72l7dn2k3r9xp3vg2o00i3typffsqpeygi8s9z33dnv20lpisb80vdrp91bu12ei38te0co8ps7ccswemejgmnn84gtd9gkws8ohliramx9a1z4l074rqb188m40qvwef2nkx698xa31gql674o7hjz11davfgmmg2qf480zrlurkuomhbnt56m3c8',
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

    test(`/GraphQL iamUpdateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd4509060-bfce-4080-a78b-5c384c0b0bde',
                        accountId: '12eaf98c-7fc6-488d-8df3-0bcd22a1f857',
                        name: '41o4p9vbxdgk3r7wpfn2smzv3hllbdkxq4ztm4q05wuz9zu0g1viz3mlg15btvk9jfihdnnyycdvtecxjbwt3bnotgi7wpedtwezj7qj22m3ggorqa33an78j0zjieiocw4tw03k7izct0vy2d9fvpa50yakxjg5cewji2pwadv3lnte40xnihwmaa7c8cwu6as0x8tp4tt7dwn48a7jy3epskdzitpck1fr279x8ehnes3vevrnew9bmaxis15',
                        surname: '27f5qrjs7p15oj173f65ddqbqb1inm3njnh888i6gporm8jjxt1exh0aeu3f5fdyz87b4ujwazxjq6a2bmwrhgh9op2swhw3h0k2fnlou4lq2bhgnl7ceeozvp3vie6aarsqd6sxitky33yfd2s2o3fzu3eioa99yjfi1ya7zbc7xid9yhv06t7qm075xgmc02213ewpznxxz9w2mulwyd75q213pemhlnzqa7zgltwrv5qmg75qast7ubtza2n',
                        avatar: '0yaqy0ghaqpkmdw1m82byhgna2022eax1o61wzayhb74uh4rvikr8rf3q4zl5sqx2yboxio5ikmc928hz3i8pjbfe032q6q17ovlp7d4041tu0026vcmfunr3cwiu9zh5kc18hswe5ecv9j6ed5anm7eatpfnythh45b1quzsz8tfvqlsjml0r967ndsr3ggu88hdng4m5op7bs4ig2n784i8qqi3egs07rkewb8zbgdpvjtrb5hmpm35jghlkf',
                        mobile: 'qilydmtra5fk392yomamaieg5f9u52d8ck5plyrux9d8tz09m4km7kgtkx4e',
                        langId: 'ce47d65c-5809-475a-a234-f7f2867d4418',
                        username: 'heynwnkkgxrxqvnmd731gg1fuagxwbdymgmdh06f63hir78d3by64ncumm5cls1rif5tze5x1n25ko7xmxvdqhosb10hzy8ilww69g7e8v94v5zl01hd6mvw',
                        password: '0506x8eio7a4g8q08id0ojj4py2at9b28yfa4g4tbd22wuvz3ra5deagdvjlumvnk1xbipbf5uudwaqfd6uabtdbhug6r05fou520n47j3aizfbz5n37m5186t62przjrejmlza712qvt1bj8heljbh5wn933zaykavhdea101n7ebq4pad4j2gsdm9w1ohtn614s1dwooo7opaepmm1hkcmvrggf58u73h9cbivh7t04mzv5bzy3veqiph3jch',
                        rememberToken: 'ejzbz4bp6euhka1s7mzxmn8pfonabvm4jv7z2p3zkztwfhe507rozmv0fv9l6qo28czirp7gsppd8rzdoyqmofqymba1bk15hzy05mvkra8hsnz171t2tadyi8gew6o5c7dsda1rvn4ex5pl52kyehkua6afu5tf2mdnzlvtkffhsvi9upz5tneft6bt0doxfszj4gwoa26jt8sftbf7c4aq2p3o332n327ntjim6y98i9c2qx71xmch88ur71e',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('d4509060-bfce-4080-a78b-5c384c0b0bde');
            });
    });

    test(`/GraphQL iamDeleteUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dd8230c9-c55b-4f1b-aff3-9895e5520298'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteUserById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd4509060-bfce-4080-a78b-5c384c0b0bde'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('d4509060-bfce-4080-a78b-5c384c0b0bde');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});