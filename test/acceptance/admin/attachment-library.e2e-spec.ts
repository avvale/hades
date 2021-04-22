import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment-library', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentLibraryRepository;

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
            .overrideProvider(IAttachmentLibraryRepository)
            .useClass(MockAttachmentLibraryRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment-library - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'wws5v4w4m4kccb95qpifnvn7uuyp5o97wk3bvpqdv4so45266q5eiyuy27k5so8hq3pkh50sv4ipgact8j2gan7i1lu7rbqcaqqsxj1ude2qh2qe3417bkd7ojxsczsjmq833f20c0i6ijkf6els3314ggrp1uz5r434j9pppxniuft3mfygh0swjalggphw5pnkr4bryfobbglvrh8vd8n757ue5cn6pswjlmza0iefj8bvjmiukbxzlh91m5x',
                pathname: 'umrs1u4uw9snjpz8k5z5ckkg6gbp8akmqmd5jm1h1szd4hepqvdvenecytbbed9pdxnwx7zno56rey8kd2mndxgyvg5rf901z29f9ubps95zf8zyqniiguxzg4l13t341v145q31ydvlkybe6sn7udu6k9uq6o1jdv4o1cwlpmb1khr3keve1valq3v145c80ini66ah9mbxyrk2ryrugqnmf3xnb3ifftw68ome81wovmwtmtndhxnkoa0c7bnoqz0ibdtjzpagkft9r0zbvsyu9bdvtchoc8fex1x9h7evv3dm57rgi4pfyem575mnj9yn687t39utn03sz35fkbknihw37bwa9dnuvsgaahoai48ynn70jyk0tb7aa5c6sns6rcj0fpjhaksy1fe4hpehj70hwrtd12pe9znk1fg7m59ey64lelf0nfnj6nsev7illgv88v03bx8yr02rnojs3nr9r2wkuwfih2b89namoy3k8p3dvnm99y1d9z2vfuci00lyxveb46p1xk5oeigd8hyh5kfo69h6qg2qajgdfrfsadayculdrrdkglwyyjdmd39egn23sjbv3damu60xp9grez71mk7bzet59n8jj7exrk8vjpgup53pwwno3ipd5jcrwp2katntvcxyi6blq42810zegr1cvfgpxaeuxq6gcex6ytkse1syuff5b02o3xuim0rxewz9prostcllgjp3937xnhguc3st53wokslquzr1qkuja21fr73lwd81fzqd4dfc0xga66tq7ar0wco6f3wc3gk6a8ir9dg2apobzdxadqsgpd3e6xyq8fp420mglrs8l9uql87mudargwbupjehgdjwianm5xe5q1argv0dq1cpfevaaflfw4rwij13oqcwx1qgafonp5vytcoa9me54ndeehqberjkpsshzya3l4bao3264nw6mmozj1anpk9kkfmnq5kqrjj5wvctzl4wy60kw3yrdoea3q35f21t2f7cr44lxvtu',
                filename: 'mcmi1e3yh91lafiofegdgc8lbkhgzbteqqjrtct8wbk4byohvvx2m6pfmhzjgpdpeghcrkqj5nhpqawha713h4kk7jia181vzup147qta05nxp6qk5vmdtmhr0k6zjg1i5nymehh1n7kr3u2csir4z8sep8zi3lzthiuon1pizy7g7m5cowutyhaggm9wx67gf7orl3zcf7ehxobg0d0vhac90tmh1grefhxsjxw284lbx7rkbfzavm3aegx8kr',
                url: 'ws3zx6s7y258x4rsxkd5xnt1yalsk8dnzkr7li10xl5i4e1cqcj2z93hlrmjft4ju4rrcky77paxaywkqxz2zgweazydgpet6efrnebkt49oblwja7cxp386qevzxblc64jlm2wn2rltv5hudlra4yu66ghnndqiwy90ev7sk823240yxaioh38wsql987sk8b20tw9r0ecue0bsxv1x2jrvtgtl5g3eob2jy7r1oasij1z16xs6gsrd7w9n9u4h8hndqwjii9e6g6xane2wrs7sdp4h51gh70l85yco1wwwhr0kuca54ouqg4m0t0tubfd7zj0ggvaxduvo9izkv3k7x6sek2ria9b4fjcqsd0iljp25gdb0662qpkypju2241yr2z5gfiirjmrtkwdmm2c5s7270wpau4eynhpo9dlx5g2vhdranm1iu3km25y6udbymhrsv2dbe2vsmxpp6galjycrc173zh39gt5mp4pm8l64hjzjz6i96nznd91thhua9k79fqvyi3xq5bt157wfqcp40fcr5t6upmmtv69tld91qtau45ckuc13y9xhfvzh60qx7em6xtakcywb8vfprvh7us1tr6x5uqdmouwz6sjz533ozzssgjbequ6lut5mjtlyrjuonxt9gv9a9lx1agv1zfociwqy2r8bctbr2idfke266h4cq9cn53xfz1w6yx9y34jlkwgrm6u3fqflcpx7z1kyql0of2ti5c4d72xobhlakj96jcj3wq9ndtcq0dg12nf5mrfbs030nmu9tvcalg86uw1x1jpna86hdvule8us0aurca4vb6y7jgekd017heu842daupf2rab00fmes99flc0zhotclpge0j739r2u9shdo2cv8v9hujycvo0gazaey4qlcdgsobm1zt6hwauhk8j2afiby9m7r9epf3lz2w0q89874cowupxkl0nn2axpc8u0io1doctgtgch2ve78cz8xub5wf0wqmylsegrptqkxlqec3c',
                mime: 'n0zu1c3wi0ejo1rfqkws6kenfkhe95eopwndjhcgdua53zceg3',
                extension: 'saofe61cz2yayddiy25x3r0ogybalfpn019d6njncdjwn45yz4',
                size: 7284785513,
                width: 252779,
                height: 601929,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                
                name: '9bp788zhgm7f8wwrrx2mqqbolyxpdfrch67g5c48yb6iul45mxzw6uw334po29x7ywpn9a4rclm88r438dg5iry5uk6eqekbb3p481d0gbqe04rv58xoczss6jrkn3xhmar2iwmic69v2y5xtj60vja0p5j6fiok9uvsy97unt4dqyjx28mxxpkz557m1t42vip55zuumt69u352ezd3rhb7gl079yiyqkdcc3mnj93li3blspbnvsdb3wdyr1s',
                pathname: 'uga0m7p34sbbi5acfxxadpw4juzeywi5aec87cd55sbls81tnx9udu9sju8k6iyor4gp9r4ta2aphjwobomql89wmzeobhy3ou89lpzlt7zk7ecgrpoqprqf4phujpdinnvpjo6x4yh51umr79ldzwlh6ezncrk28p9847tmlscgts7qahin2we7r4xulo3mxl1weqaxuq0jdxdil1scbgbij80gk0zisft6p4tkmqhq8qvvcqzvcvh6qjl1e7iu2rn7zirqm6gbatpevx3s4l21fbasc3c7xqtp1jk6bdvmsibmp1tgd6m8j20rytln7m5sfds4g0vuhqeqv5eol3grgojqtqg8znj2nulr1ayp1ls2umzw30xauyefalirqtnhc3g36d5na705axjnx8sy5ovvjgj732fhczto2trbiditd0eo552gy6ozeqvnf7b17spai0c53ck33tyynz31hhknjmo671ipkrpf67an8af1qsneqts6iavwekm44jh1mytyxem8tyt92z9oum8fbtk1b2t19tzfhzob24r9do8zqih495l3bfxv0k484drfwv2ov42mjqn5nafwer2xkm9n0atpwfug70f6spi5hhl95jg1zrbe5hk0jtzg29lb4v31shz091ed8dfs5fu4wlhlag1vtufhlmhqx1gwtz4bhxoufcwhlw1xny3p9e8773g3p4zy2fcue8q5fuugkj5fqxfq1nbrrbs52skck6nutu2x4hsdrffbmsz3qeifp6w8gn4u230lx7g8zn9lp2dcz0gnx0906a2r1scs1yb4yhe4bdkaadplkm8ub2oeycywlttcbn1dhdu2zy81wfbj229q1qtz4t3aaw32c2r0bogec75iffwefxmr01bor1qd6y5scscij0rf1d64705b26ztj0k7gr65cyss0kx799fftdk86ul1nt0fvkbpaagdxi5a0nosjf0yfw0lwpax1l98z5kk43nmkjkk9daeby30cttb62yng6g9',
                filename: 'vvwgd6lbehwrz3kwitlxzgxcbzkivcbfv3zfsclxlaeb3p7hvrvs1xvuozv6je76dl4ukwikbo76wltirfvtfbrifgwqr0yrmnk1jymg2x4q8bxt6y27dnof76uh04ohfb1n87y5kwi22krnrax3tb73lrod3a3elejeemk7txnryxhus18m3kpf7br2q2hqdn81oltj8xz4t7acxlt0nubsq130t9dcijw2r8do61etvz2pwvalpduatvfycla',
                url: 'hxkznxiqzgki1wfap0tfh8erz5icjaqawery0c4sb4joj8skge2n42rjooesud0h8ptem5hl5r4axxozkcljy37motlg3fh7lj0h7wtb56ufjb5o7ifzhv1s48pk1c2ecwzcquwlq7o3ynd29ygsh1e46w6ii2q7khdu8fl10o8r9zy32ivxosyozjz81hp1g9ydcfnls3yeoouuek602lxhzf5hygco2st02js1sb7c155ua7fguuldzv9cl7gv7nn2r8aejsxphs6y73tese1roh0hufwbnselc86u0g3x7fivd28x7j3kxz5mxvxl7ap2wqdk931se9crh3pqk8fqwk605v7rlgprzixh7dekp4zwy6npp89vjmr6tjmnitnlnzgtlg2vceu9jayfdi3tx8dx16dvchyng5ke6sxa1mxqa2aysl2ap4olxz9hwzch91oeden1rm90bvyeyw103q7quo62n4tlmz04dwl46vwxmko7fv8jpost78d8qi08wk4tsxg13ou19azp2c5ma51dcwg1324uf1zy4g6ypf3hckkyydyd4uj44r6uobw8x5n4wo7lxdj7v0zfbkjfamehx0afncx22vdxhsipgyhzympx957y7kellp7fkez35ko3s1z4gru6v77fet797qvjwsnfwnkipvu9br6zwhznd5w565lo8gak7bis0bvyus02rbd452d9k7xp12twsl7k4sfv2t9xoa2orxkgptgt8uqt4a8vvdagf7rabg7dxxi1j50ad1km70xciz1pu35xw7ic5j3cstwsgl6fppcae4pb8l3keczbzh7dno5oirfdzm751oh392fvt9e8ketvaboup1xthe1umhnazau4op4sgmrfczc0seuctwwcbhpm97b83ryykxdjmt7qmo234hml3lnw2xt4xlgcq7x1yzxd1x7ritzmu102h1vkcez6lz0fit6nskn7xm9fep2csar33kqo6n00fqi84dcbvxhg50x77ag4wg34',
                mime: '3xbvwypngi22jpi042tblmfuj6h0i6qp0nhdah4yn53ijw8uf7',
                extension: 'r3ajyp2x7t56n7jlvwqlrrpbfobe3i8at3ogxnqq8ur2o7i70o',
                size: 5667004129,
                width: 689224,
                height: 603045,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: '8vlmbz10rwp38v7yi8p24x4a782c7wztedtbyincb9ogslfkjz24vo552rj64ictjnmrhvag096daurdvsl5gm7dgf1trffu3j5n6wow7ov3yeivadk8uau9is5e2y9ekzirp8ih3hi8qzi6euc81c78z301sfquhr9wz5b4dgglyni6v7o5ajtcsgwedswy8igyc9nw83v4f0t7abj4m8b71luozoyvyg50rncbkbknl83u51aulquaqe5vhm5',
                pathname: null,
                filename: '17g0dihdy1dwcc1wzuofjnw8ud18wbv88xd0fgsy7a28a5abmnmbj8dsycpq03fygn5td1vn3rat53z9fzquoprk9ffwm7k9uozcda2h53wdpj28tilt30pw583rtthmdk674awab2xnw111k49jewb1ng83qeraihkmmeejbya0kpslewch2dej77zbjff7z8jup7qovodocmm4j0k0oekev1ypez6q9ipe4twqmfx48y4nvp8ppbhpw4ixrf5',
                url: 'p8b2fl6jjopece0eo0pmg3kwpaou4w5cvv1l0i0j80mosimctqcashwbo1rcii28clxzaos93oa4ypr8581xnfny2j2x0zjemuptmjp60pvjso2tfynu26td5yx720elm4gmpiugyxw4gqrym20ve0ayjsg0h71sq7oro88tsrxcz7kr85gquqa1u5akxpyn1p4gdgi3zg6yikmka6h6n02fp39x1us9gtoj7n9y2cykfusfqt5hj8j1965lfdkmtev1alh6i08m3umc8rqhto27u9vyzyzmc2llre4i0jw1lfalsi0iecpwjprfceiw6n02xqubpu8singe945qtsa8qgf6x2n5mcizhrp2pexfwo6x53waxyyiu2wjix69x08oltjru4pxd3mlog0rfhzhzjypl2dk0hwstam29xcn1g7dzdq2i2hlwk5e02tp3a9oo9pr4q4urdyvnoj4jtsler71b267i8ru4bd142gawxugwj9qh57vacibcoru1yv90xsp9ts0bl5zfl72gwkz6xo6ckef71hgvwyp6ebiviami5vod46kdxhut2w7gmlq91lw0l2m3tic58pktdzm7h67qge0pdwobjy2symy4u3snld92z1iwq6mbj7w48v607lcyfqnur925om2mhlebssrlzmwyue3jwcl2qxubwhr3zrqq37ivnqi7mqm3p73yb58qr3u3y7z9zoetujthjyvdeynbhj3uio5m398t5wccab8owh7h7gwbx3xnbdbrazb1r8yjirf1chppk801wrcs7og4f9jad1kjgthkpmsyrsn9d9oyxtc8apv07xb7tfmxoat4icm9jvr5hzlhc3sz1jfy1ybtwqibbfdv5djboiu0duzo2oer5fxc2mvm49qrl3znyexv8yepg3hzvmbbona74h4b3t1ag0eac1y5ectuetk94wajn5u3zcusbib0twgbi5cb0is9wruxoz8lcw21nd5vj23ffnnjyhuvigndyd7wjr1d1hb',
                mime: '72rzf35zan670ubg14lg6guszqtjkaxnslovdb6awjh4dooxgw',
                extension: 'hnzmrnkkznstz7de3rvz0ggdd8na8lcd6e99ocrnsa7cfo16m8',
                size: 1068380410,
                width: 651549,
                height: 598279,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: '29flzvrxywnz2g7yw1vki91l910gcrw496cp2cq977f2bqtewavl624o903ltn9libl87pfqwqszwhrw43ucr1pztjwy25xn52y4xrwluhuewgltoso55vn6oyeiwc2sb1uuubdggd7hdbm7oy6y84au4gmfd6ks5hpjriu9z5ehkpeop4hatosnixlbm5798benozlt0kbnwj0jmaqlztw8dm2c7ne9ym09f61zk141mxz303r5umk2b59ct8i',
                
                filename: 'rp0c6h48x2qx485noalq8qw7pdomgsar3g5ahvuw90oycs5ufucdwhan77zajm3jjw9fxp3yw04x1a2dptvgykjzeb4606n5tjyicejmk0hrzs3xi0fxdj121w84zqce5cu15up8m6qdnhoyi3r7zta10ksrr972pn1pxjmghj8de50oru23i9pgc1h2okql1zs3pfu9halnels5a5i9dkc73ep3u959tliyyoas043gtv3tu35e4wrjy9946zr',
                url: 'd2vaqu8wgx1hy7ogc7ldktdol3juwvjv5w507f9aethx3zmahy5ueo7qaajstff2t1m04dfanev25zxdw6vxwuvyolykmcp0yyualz9e94ft98tezy80r64u52k9nrjuz2s0m8ayka3xe09oqt99h41cfibf05wqrp368zws1t5usdcvqrr8whgndu64cm32n2j7nvz41el07pf660qu4okjk1wynr8ld54vxtys8lgw1z6wsc2p55ddlpqzq0bxzjgtauzpgmyu0vb53v6sk8iljeltjflh02w4wbq7v302c2nb2lv21c18jdfxu6ehl1lis6dmnfxa8ppozuaxnor9q6zkziwkdqf76otablww56qheo2gpbpt4jo6b3r0pkoe6sawd3kwjzknjha8mg2t4f2hcuwodfogxu5yhsbbhcre3hu4v0ocm3i39nz2wnqn3qaigkrjllltuwx4tai7uaj6ebup6jmf4q4ubheyjo2xyfs68zkeljwi0a7kzth15p86wegrhbn16iv97wanlb3fixqcno2cq9osx5iidv4b8mb0wmjnebif6smzo7mjt5u4ilry8c1q7uwonij5kyu67eg157fk3zfnx499g89u4wjch6c1mepji2r10am2oh4rvp0rfiuyjnz4kmpa02ca7t97fhpt1qzv6kakhjiezza3fl5y4uc3y7i7w3ldxq3matscessexm04wl3a2lu83gb3q45k7c415m8fb12byxzd4zf5gk57kwfbyeku6iayfk36smakp3qv0zwtpc4w6hbrqbjvskcokth9jlfvcw28rvgzvni7uqiiit2c4nbrw5se0khszeptdw5tjzqot5apq6f1caj5xiduupskz953w01w6v0drkl6y52280addn0q2dpwr1vxwo14aqnz2i0ttku60uxsw3rmyj078nripiqi4bus81ax7emn5s0rgpst9fv9cliap3vva4s1w5cv9w64ombpkjoekyy0igcy3hel8j19o0tz',
                mime: '9hzhsh6xh3aaroa88m2b8mnzw2qmanoojwdz84by3fyrn7gy1s',
                extension: '6777dbfeoucnhyuihbsuy0gozxwxvqfams374gzhosbdewyg2t',
                size: 5013051807,
                width: 929104,
                height: 354291,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'dtc411f7y11mode21l205cwzgpt6wjh8yth3w6r1d94o8ghsh84oz9aq557gn8ef269x1hikoy6mo93jisrlfasmqiuybkuk5kr7vdnhhv493v15bg5emilf7u80nrkip6ad12zdtou77tvpw8sbmlc7spdtg1gvua9nb95i6xfj72v4ix3mjbysaxqscdbjyjuwd99wcl4bkmlzncnexygmlzm2ihq3vot7uz2ukf8l0mdivm8febr1dicfbw1',
                pathname: '4jgdthdacvo26cwcr42bdcn0o971r7o37sw07tnsd6g7cjedl8lgibovqzbc3mryjytvgfzhzj46bdysz1yhssgr7cs82krmwqlw1i8tz9w7bm4ejidv6zn23zn8vuhgkabm78u63icxko4n68w3njorecoh5e8zwq2wzb9iir28ly72wn41laspz157b3i8d7v21eomw8hjnueaxvn31my00vw0qal6cnp8a12l2fbbzcbbichjefoyf4b951ki29wv4osj4h1c6835b5xreyxxquv6c1eccb85rzl59umk6nnz45ezkzz8wchal3psze0xbnmgutm9t0nj76fddva7na2aiss7e1ato92nojy4p2u07yvvqbup3vwxkybrcwylgthdeivmhn2npjz3r6luzsvginwknju41v7a4p8wcgzn92mn5apy0njp06ch41ncufi0hf4sucy07w37f0r4bs7h4s1rignmhjkly3c5qw59vrl8sii5elbd4toqzklwqu445gkzrjl9pda8lba0r8hxhlv14kxz3yjndvh5dlwoqs54fyv3ssz4z0jisn7ojgpbl41allq50iat80crzhhsxgdyawyv8t2aamlgh58po8xonj40sj2glffxe9pb5shy9tbilh91rgkosxm44gl4o02slnzeg3wrqmin7v3v3gh9mc42mc8prqzfi0ft2198q5gt8puvtbcpj98p2inyrk0s66bytxc4dfno3k3qqivuyj9csaf2flcbgpywpgw5k2qs2w6mcozaz1o7nwbnyl372b4cdrg2xomdfo561l2n7vnlhwayyn9dcuuz3dzd5s03im4p863ya1ze0wsh5u6vp34snyg3ovvifo72bttzlevj2wvjm2d94ufpdyx3b2i26pc6spscu93alksbggq09mqbbexqylw6maenp4rcgn6nkjjjvg3oqqksyjuw6yrvj8l6pillsk3n3dguxoov6bwkdb2685xoflgwvutspwgskegduhpf',
                filename: null,
                url: 'b8za8z4p8fmtkaxl0sp1jxcqzmftg5x2oe1yn92fvi7te0113vx0wag71jsijn802emu8ky8m8alm3iss6lqg1pz49sk7mxx66l15bavhkxceqsjlh6zeslf7pbs1plslejjn5o7u03so05ijm7puwadxfxk813nvg0l750xrva4ta5vudqalgyd91nsvxn348oo6vwm2jkt42sr5z6unbip04u5ey39kum1l9v5le7cz15dsdxynke0470sy84gnv14ziqfgzpo0dj55j6o08b9pqc6wrpmwchld6f0kxcm10ylic1jtr9c44sw8d1wzmd9fg0fe8hendx4frbxdwpf5bpit07i5pgb2qixaimjnyptse902v5jianhfhuxxzfa69kzy1oyko4370e20s8f2v2io7v28qmwln3gcd6iiay8i35v5u8j9cretretm665t3au6mx778dn5stlo7giynashnbxs2l99rcwv2n9rjx3lgh18jbmpyt6mdnr8ol22zgn4abz64w4cvplyhap7wrjy83m11nyama7mj82bw5p0rl8f4ww5g4iqiisnpu6c9ukug5ynisdqn39f7lh770fb0mh1ns05nwbmal5licyzvo6f5ck3xy0vdgsfqwyjqegpeu60ogfdhp9any5zmjnl30mdyxgt8bcesqcsz0pz1vit2s442aw4itkrwm490267juj5alx67owda76hao9zxyfer6mx97s7qaxce74gb9no5h1pat6iu0agrpmlr2xrbrv5eknguul6kevswij40g57176j7ihko9a4cn0mtb0wqynj6qv91khm2lqu1dmneir7alvzrq7mzy25f6w788m212ctyujtavmwlgpl5s2bc9n3iciaqkw2un4yepfzp7onet5hihotrfa04lod471bog7l2lctz8db3ktpjce0tbi3291b1o4vde5iaphz3ebaa258c02cmbnw0a6pmj5x7vg9wyverhq4qlg9q3f7j7h2qll26c9',
                mime: '28kchw6u64hk964ew7cjzz5zfpd6ek1vq39ntus2url48fqfhr',
                extension: 'ik9x5ddj2n39uxpf6os0i552txdaz6k0ponrn0v969lrd5bcqp',
                size: 8566243899,
                width: 903670,
                height: 737724,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: '7c9m12qy9rua5rkvtd7k4y7644jjmwk1l9et13veslb9dcozi7ibel1vw4u9th0ldzb6dhg5hagazzp6jerid3olh2sctobbrme0ubpost1pndopuqzs3tt3l11fx0whirv30mz3hw5ogf7k3hx6xkb7mu6ycujdkg88duex2k564lu3deh0hf9gra6eg8yoy6tlgh54vbdqqethckke4chexk2aenz5nw2ody9bgvsevxji12pmub2yqq1kh6e',
                pathname: 'v5e7yajyi1kt6lwrtsslv6qbl82kqrrwp4p5kn60s2822evu9bnz7e71x1isyvjyu13y3n8z0ri71dzgr85p20lewz8shg4r9otj4a2sbavpaaka4l23cynkmswju7qi10ysqzo47xxc1v9pptiulcv8bzrnsj3d01w2c6yendtsy9s0povuyh1vz7d7mwrx2ehemm5hxbeas12ep916jfuob7sf9jqwuilcjdpt30d7cz482po5xbvwtklxleub0fx0l65vkgrmf40el44xi057ehu612222dmy2t3k2jkecuiuceyu3nr7905o0ffnb58wegiefgsy1qxco6lc2vexf44y9uj7457b7o36roningm6t3dbn3bayyd4zweob7lbhs0o0ovj7hp1rktdl6kocv7iir6lunipd95n56g7aux5bi6kujbknx5k8hmt1u9eli723hi4txyxfsut2tlj467q1enebkiepvuwj6v44qlgmsud9z2f51vml6gvgbuje6814olnti2qimj714d5nafryf6vwi86g0gvwpam3nqni69o2qrfwtnm4xysveg0cwncd2ezw98xjbf7erfeq9eqhx7rkxcovd19cr6kynrix6aoaddw3erabnv5hp9qlaouv4pfv8to6t9su3xdmkt7873764guiem68gou3r27e59h9155fcycaymn9lpj69b947x8s4laf7nmsihvlckk46tymgq2w0695zec0fof1ki20wlhmedwktxiz7pizz8arr3vfbt8p7q4extg97gr5qvoqqtnm7l19jeiczparythiub8kb70sfkk4u4oitns1df5kb7m0os9xylc7ajyuvh2g5j5k1b736asnlaj3h948x4dvsy7uhgha2jueunu7mgbis567g4l8v3xj18pvojva9zbb4hiej8q4nsj30lrhpofff21wuyuh2rsx1bej075eazeo5pqeqx3c535hnzig3ufys3u92y094cwo6778neg43hr8vvw',
                
                url: 'u0qwnu58mjpuetg9n5uydovhho1xpvq7uchtdtfbvx6sevhe9elmgvk94dwhixw5d2h4rpv5w4uv8o0jdo5t6atq1s2bap7zezyzmcx9urtp597nev097y8glsp9hbflaunfqrjf3phw7p7fwaxp97vfy2goi3hk2d28pwqql4m6o4c98zxg0u55426du8fpjgpp2876t5jmg8de7v7t1y8tikdrobk0oc2dlhhedxncrb5wfu0kmbvdy00bg0ncm2w7o3fn8j2e8lobqkxlkqn40jnxoepy13axl5xagvyf4hdzs4crf62xv90csuzhn4iq69uca2ejj0l819es0f52k0dxjhmra2ognpmly1tj31ohz0l6ximhhoufucfhur00tt1aadp8kwtz7y1ihngof37nn8mpfccvzttelh60lxxz977i5eqtrlu8so7y8206df7254lqoicky51ggio2ev5crovb6ix4o4ndevhhrlp00n8anqauax06hr1vglsqcr605k1ixf66mducrpe1fvxqdkw5n2eot1judpvpbmlox05pngqdw77p323fzdcukorp57wjfb7gwcn9f7xn4gqf4ocmmrqhubq136yd4nad58r09t4975e2pp5fii3px1q6dva1wi8l5d0yh34lq1d8n60w2281muecqaumwcp2mjgyym0hlwsdcshruzrsarn9rl0amilq2rojb9j9ebxney09t16z4mgbcznefls7kmg6iw66z6sj6logz2shab0m5eijq1ibfnhpckhww6rkv7nm78buuq9peutgrps16ye0su377z8omhvlfcm9195ffnyqkjche6g9grslx2mbo2p6efyxlwpahw9qiwbqv9cbenzd7k5qm4tr94hebrbvir68j5n7l0p9qhijzncv89u4kpqp83x95jep8lqcgtjk9zdmifx8z9yhdb4s3ug1903uir34sbopl31r8do8e6tjowjqrz1w09nbmph1vrqvots31fbxuob7',
                mime: 'y0hwj37jcehdyp91i26bkg2s2dh1424nwwvxfxozztz0bkd2t4',
                extension: 'akaex5phsgfzrmtrxpxom5gv2ioynr64pqh8ramcvsp53qx8ic',
                size: 7225499261,
                width: 376039,
                height: 399512,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: '0luz9msj3gj9lk77dmyvxfjyz0kp66way0pjelq0azsf01j05sa0ruqcd9xyyqeu8hf49pcrba3hq2o8ocpwsn068lhmb4s8patn82n3c5iv3t6vi4j9j5zdpg76cqi9ttfqrszgpgmntwy7fr8ojl3un5pv4ib3ykj7jfwrhrhpuef8xmt76nmrmc8gx3y7f498n2u7fkbub6hrjw6b7p789lq345ap11ckerusz8664ze6bll4nqhbpixeeo5',
                pathname: 'vpemjkqw4wkzepqww7i7f0j2nwa4qjrcthjy3rgnlq6oqonbinyqjtc4olec0nngdblcyz5794uo4k0cexgx70c9h5vo05bf52ml3q4tnm9acuw055beqkzpko1ov2krn099o0g1dtzey55i8hjdu7nygyxtlcmwpnbu76w80lwszvv6gkbzuzpokausfeyk167e370pfiy63vns5h4ooe74u1oyp3ilns1ut2gm535cdl28onyudj3ugtwu067x6eral419y93tzh4u66ufialbdkyknyf95uwciv8ys0ywvaasix0gz1m8ymp5pakongv0g7f1jr4dj9ssvs8h8c91tg5p1x320azw0dzrj8r84hieyvoavzkhhsxr7ly69i8yqzwjqcnul8uaprcfgo3pwded3mq7lvx5zg4et5qsgmjr4wzvd7wioyhzepres132o24di6utdr7wvkzbb19a6gyujw2yxxaxp4c473ovd38ypg9vb616ac00ecvo5r0s4qgdkj2vftz5f7clou441lkd9nn3uqh3j80b6slnji6tfan8xo9sg99r8f0082tv60ttse81kipc2z90afw3feeirlz2kqiiv3i04scue2n8kx4y503xj9tq6uvq4ih4kdwdc3660yfwqz9plh8ksjbkfqvosyhqkas7zblwrao187me4mhhda76gwp6ly8m9hc1d8pq3gjgy3zj8nfyb2o3lmzg2fvgpn9cfztbo62az64z6cl71inki7clhzvzekln1uexi9epj4wrcl3nkg54wheneypg1gjl61scg8uryp06yz6r8g0yg91nqt7fdwlesf6by5e82d583scda66iqjqh0ufk3xsrcmzkcaoa3jahrfiad3vbmeg0s303e8hwxjlnqhn8z4oy834dscrseiaap54dtzgxf1t13dp8qm1kfb5rf5stxatt2tg87cg16pmxyfy2q9d4fxele1fh3rb0y0o3msajbk6qddc5bnyg03jqkx5nsib0',
                filename: '8gh4tzwpspdrj0ixicyhg7ptr53zla0a75swrvn6r1vm2iv6td7hnrewgh7g4nsdd5f5bowf4d2y5yv9ntqbh6gi2svlyy8ce3a6ge1gwy731hto561n9fx4cf5x4jfdrwhr3r842vegcgd28rq7rpz5zi4ph8vhon2in41vksmo27bl7lp60pa4qu9a9g9ayf1p0dltcw9jm9pr3qrez674yfqu0n5cps6xbrmzvk9jhmrmed7wku18e4gjd22',
                url: null,
                mime: '408q3y6hjq3up4n6m1q60kfajhf1ia6tu652tcfq58jk5kt70q',
                extension: 'kvi1da26y4lvh257mykvy5x0bp8kf7y8yllht04wvgm3purk0k',
                size: 4753813146,
                width: 753237,
                height: 619151,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'qwjhkeupvncitz6yfvvrgj8lmo6qnnms8h2wegznmx6eutklhp3tolyqt51rdnheg2kpptv3evi5tmgdx2zpnab38li79xyclroyvjtx3cb6vv02l0jxnulxazena75w1yru6ax4ikw6ykhoggf27jpll24e4fcv382q0n4m1ajokig64yosd4x2tgs0dyfkjji9gsm8gq6042e6gv2xvg1xmz3rk1kguhxpfwvgu5so1seeue717rihnu7ssqi',
                pathname: 'dyu5z8ciblojf11vbmzllof73aqa59yucx50rzx3i31yvokyd21jszpz38bkwu6zwc15q6z5hugxfxjse5nzm7lvd6y2cy9uv6adrm4bq7gn3cruedphei7roirlcklmxobmm1qpvxm1p0vncox0yfon7m030xar287cyssm1gnwol66xbhzjfmfpipxdbbfo6wxt7kiuz1je05b1e6qjd1sb002ynbc4t85hgdi5xkfxy79kquxphls3cr28ta6dnar0jhandpguotu6fj91wdrdk7p8dljeq8pwzd39qfhk3jiwt0cr06lzw3bf7m7d8lg1apg6xnbn4wbk95m4qwnip2i0oojwmbc0q03u72376hwzbs09p2fax978pseuupq4xhlrsmmrxrdflse4x41gew0fc0be1igi8xteprkmscrudksmfkkqjiz0ref2jaswya4pfplow0pwx74soyswxqvozbyy5pelr64kjqbklb99s0q8lw5bwktofhvupyfha3xf9e0xfjnzc2bitnu809omfc0lhawapz8jhkb0thv1sizlz0o2fvqp88rvhvugq0le2ev75qmpcsk4ilen5jzqhjsq1sgrh2c7rhrsym9591cc7wg9n1izyh5xnalxkzunbjy1au86eu80arbg0aack06nhkdt5dz28r093dyom0jvko0wzucvpn1b1ggpmrtpgon5c6r8nlj733dlexs446wwefwr8e74q5p4ff1xxspxkzjsvipmulwwnsss1km10hnh7yiry51c1vzu95b65etaqnfocelld3qf5qq14v6k3pvowma0xn0ovwnhxdtzefox35ll5a4e1z5oppvt0adn34tlmsjn7ihzpde29eqtcgi9fm4gs3tilrn0wrqzesd7g35t6pi8xmlfivek9fvf276efxf749gzdqclfcztnnwsvvx2p8kqbvbmz74oxg8w1vwj9roapy4usa8s53qmj8eesqkzhlr54xvrgoov2kq5agxq8qw',
                filename: 'gw2ga6pd9koitvw2pbegwwmsshlls8g5qojtm65r2km3qlsbo5eay2tmudjq7i5py95huy61pn9y1sa1ey94wqww6oze6u5x9l7oi43dk0d0nexcyi6b8vmoj1ipe4ipuz75f80mlpwsjzrod4xta2z7f0ndokcg43j6vvykro6tsgpimzdtdicv97919u7i30zu6836s4v20a1igr48oe7vn6fg39r6d5o7e1p98lcav09y8pqm9b8087zd9qv',
                
                mime: 'opac6t7etjo57s1iccruwc1nu3cqbpklhzo9r0c8eq9x2a8a7d',
                extension: 'qplvb93ybt5zvq0wweug8zplctl61xq8d1qna1i003ue6geosh',
                size: 5233365164,
                width: 829106,
                height: 905561,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'ai6uamx1f10lkrxriuw30vebfwgtsd0mqdaop349ggicpevilrppbrzxbebu3yeo74srzyn145wl63f7qjnjgfj96r62kwqlwgkkal9gox76fc8yyxftb2yzyearqgct5wwc6axcxvc6li9xnpkcsxl9u1fp74slb3ga2iyxf0gbz29h2maz3lg464hvamqywt2rpi83t90gf6g3601u10fpgc3kzmu632f17h8knnpm3x2m3s0kb4u1bzfmp8u',
                pathname: '0bh7wru104mvc08zi2bn63yzs03x13c5znb9j8eif1pbz9jnigq4v12beabab35btkgp68kxr1rhhaw5vbw91psv95cliap9hizqwggr4irdhztmu7cu7ar0ca33woq7svxffmb5sn39dcjauxl9btvppkaamk9mmwdw5uvlenr390kzru5yqcj7oeh8jt6iih3sezxq3csvo2b814ntkhp4hojv70cpghxxauv885pcjzrtlbpxmq7zhizjb66iw1g6jd3hr0rnbe10mdz5z7cz8n6knv1m03kfwdnt1i1w9eqo1f38k5628s3dp1q1jxtl08fb7aojvucorls57n691oselxz9e97icjai8bswzykbesjxgbchuduytti1v400vetzh2x2teg8rkgwh74r3lmtwsn0jk2xaw3lnbnxyu8e12t6kxnchmq404x9zrp8kh2ln498kg5319rczk02q5fw0lxq7uuk51sxl7jrx52eqycihbymtkp7j3f3927lvxkfmjifa10nbraenkjpfjl66bv28qtopp7bjqtkwcfunwuugmp7c6frzpyaxc3a4ps7fc0mi2q7svllxbcl2p0ef48cht34qmgk7wiw50bwg5gy54lt5pcwl9s0fiqu1toiitk5g2kpt87djtulqjlrbm3w39nx6yer3715hcvo3qj8fxhkon9rt2gwyywyic26gv6few4lhne3g5jeh0x4vvti4yune6ikoqxpqxue3wc3xqeqsf62mctye6tijnzmk4fyu0m42wlhahl1l9xgcinrlnydjrp0nppjtjqg745s8qvgcep7vvzivonseo08xys0mmtrybesbrpfv11fhoxqc15ww6wulafb3hea16yeurz36hg6op8orlxqh55kl492yzomxpmuumhm51picbk39c0ktwgta45u856q44e2b70mrujo4t48r3ierv6s5dcy9ew4s7iblas2ya7motd3j6ljxr29x82xjpvsqlg94rkh0u0yjnuz',
                filename: 'q7v3hhjlokuwfs6ma69kv5ny6gn79n779y5ln270h7yz5c28ofkx8hvl9xm4b9dx3jvx9xf2cfrdfu2ng4h54pwy0ktesxlpo19wvfj5wwrpozgp1qaqh5prxp1n5hx8mlqgxhx37ble8hbqk153mpic3w0vsdtyc6zblgsplqwjzbns5g1p7mai62w61rkol7u94055rywccnwpn1hpcx294pcxc41kgjw1uoqpk8t3v4sxak5n8kzn10ssxxp',
                url: 'uvfd5sn7wy780gum9ddi72iyxa1fqtmepp5i45fze499chais2532jcer5s1r31zom1mhdvmu6rv1rd8073eq1802vj893a45w4qfeyad89rnnklweqf2hb1gjogjbv44py954na4xgoatd6e4ozr2yk9t6d8tivgkonk2q7b0p9cb9zmo7u1cfg44ony4g7iyfw9s1c6z2wrmne2ntuwr9w7q7il8ybp21c5klrdutdrxinzqp747hz4udp3aj7h2wkjj8ylwct0kdl7ov2jyyb942q4ldey3nrlb5c1vn6dsol4ir3h86i023ncxep3kn6mmsm5gwv0oe9yt3h9jp5nuq82xwdeh3x3ly7beutc9mivvihz7jyscjgs3fcrlxst07vdaauuvy5try97fv329isioavu9ivzst10pv4r0102yohxa0f1y4ok7wd84xsw35dexbf0axz33xpjwlha5yonqn3m3reg72lu36q5gb8uly8elr9w7sz4gd0x5o9ncmfex22r554j8qdd8j4qi7xae1ghwz1qyehnizi1xzn5i3kvedf0excpb0hv8qg6kfesvlh0np911hfc19smin6x1b48nwsh9z0zcdyv7psoyfd3xqkjywbisylmymqnm57ro4xp99nzsxzf00ul9f8j8glyo1r5xpnrjp87i6vq1ao9amn36gu00dj8kkjxq52so5tlcjy37xnczphmd0tinvd2zu08pa8z73i6jg4z0v4crcp8y1iw4raixtg023vkdmyiwcrru6kon9dmk188z3agz3njezqat2sxgbxa6jqg4i6sauxjv8qtrv7gz5x0pgh3405jmdpelyv8fnpuv6qh5demqij2042pbpktqd0kwrhmcx97uti3e8yznoyk0trh8bbywtrecesgir7q3uslu9o15lg4s1i4kuw9524aac07tuov9fic7etdus3vqy9ed1sk3o23gzzsyxju0ufub0x1wkzv7i6vs904n3pmjn40fz3a3pn',
                mime: null,
                extension: '2pz39m74aq0r2xna3nxbzfmt4v9s441cmbpwnhxptsgepyq23h',
                size: 5869586545,
                width: 866211,
                height: 734309,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'evuu190qovdw6nab73fh12cclq7ze5ppnuwefj5d4kwhxiouscdiurxoua9bjf3o3n86sfskdpm687h25zstmok4bh9q4k522eiiiwvjkctj00ey1q5em9ib0kjiwb65zopd9rdwi2inog8jk3q1fdpy5870n4br81qmvxtu98vulcex1q9bcslhp3u2y8brfr16oen9wfbzwxa3dgkgdcryz3gs3bwrnblb93368i7g7m99jlbxoumajfbuhg0',
                pathname: 'beqiofztjnvl3mutodu2vqlpmq6h4nb1hwgh8mx2ufdhszqfghy8132x2rdkpen13918rispr0rcmdb5btg7c3pg5zeqr8ftvg3ytscjfi2xhvvh0lauwwn43eklg66hagahpxkrvb3oqmvctm7ui4dpih5rl50yy2rwzmrb0lh3pw8azgw733evorban522kgcyw8jd5ssv7xcwe4wt09itwggftxjtxj4hl2c7r5e6dyrgwirj0ceklbvjce6l62ommcn5af8jp1j9oma3qtpsjhjiavsi1y136tc4ybt8ar52k3qfk0gi18txkzbdlkddbpk4qdudbk0fxfe6plzopkuacb703wl4j8mrh9b6kijdfs99w3vo353wzjbgltrkulp7f6puz22pjsqg0xhtgkpumg1ad7cd6zf4f04h05js9fqfqesmmykpq8ivyyrgd3nd07gygtk763xzyxqfac8pc64kx2kvsitf913pr7oln6mk124rjo1o4jaciht07csqf6vlyx6tj2mvg6z1be92oiwmny9oh0ogp25fv5ema559k4qcpvxh9l2durloxm4subwtyupw9xzb86jujr2zm1ctiyu89kpjkak9p3foc414sou53cr1j8d39lvlgfocbojne98dd6oshgvpsis5q280mvsyw2yobcec2tf0tyil9bh0nxuuikhyccrulgq34u9uygzhyw7whwbjz6w2r5qtzklxq5agy16x3ybu9swzvlmi0h62yjyb5dfddmcosziobuwtyf0l3zbxpn781l7ut1sucztt7y3ejnaqnddlqcsdsp3qj7tijfwaremc1oft9t089dd4h58akrlcmre09uh1l1rmlx54lhkeenjphh0hn2czg0a8a4ro8majndz3a2anx6emj6gnvsojlkhcw8a76ymdn1u4mgxcbqu1s5xnhl6t9sf8u8fauvpx6zh3f1717a4yh2v2s8k4pke7muurh9qiqabbwpzjnq49ibgqfndq78tq',
                filename: 'ax3s95j6b9k7oci28aaa4r1xmsnh81rdm7lawhhn3wg5jg2mwfueew39vtcjodgkchjop63k6jw9u68k62jhp0d6ad9yrm0bojg2ffqz5honf0144z29ys3drbcipn4vzhuym3189yw98bii51clsp5wp2bpn37ifxz93sx4tumflru6evdit5f21yrlk8j5bdk3jia4pjwwzui6lb0c9eqe7jr911g78zxayip6y9xofp1lgxoew1pgajczprg',
                url: 'rs7x1i6a6pufxvf2tnr4hub2wcmeywb1pyvd4k3r19girsxz3z7q65honculc1b1nxganiljj3l7u5gt55040hq00sdpj530u8vhqabbd6oi5lriwe6wcecwa9fdphsnoakfe5vzr9poarme8a8ygo7ogwjegn7ohsev5pe1js0lw85lu2bcefk3ka6wurl0lwj1bfvzbd3dkdovr1akf69y3vg9mt9taijttlrs5hgu5q1t2uyu8wj1ox0gdlw3ms01i6zq5ojw9tp4lb619zfo51kradx6upgdqd4euyuwxhvu74phpkxkc6r2l0xg2w56k18t0ig9bjsdkkb8dfkzqpo4tk076jmfvuytxbuhf54g8qvxxx9jo2l33zlcfhdjx0uexivyt1jmvxlbi3z5m96zcntp0ola10yus0qljd8ui4zwb79qrizq2mc638ihzt0ohxbl6wla16qq5ov7yjv116ozz0fgksucbhfsxztmmz2kmcgirf0j6irdawcvzf1vwb7sowy0qvbpe6t194b3xu6c1fbymxq7qqvszh9vxovtl123psbsfe1l708hpz4jzs8qpmjhkjymhaze95i785tuuuva5dyop35icr1x5l4fyyxjpqlhv8cdjv0elvze2ozic2awoetwmtwr3juthddet9rpnlnni1gdg3jmfr31l8x5u715lo9ijthenesb3veycym5p7jcyocj4hdk2xkmvl25wiio3fo0f4h7lydv4v1vlsu9dh54q1vd2jdb22sw19yhevg4z7ijsi85vl67124apbe3n5mjav6lww38uwrcpcsry8ftpec0u954uvlsebpj6q3x4kbzibyuzmepmyamn1uda1qoycvd2nv0xtbvo6jjnvcowbqytd59adtoy2xcqr62xwxmjr5907cv8nbet53ogqmo5a2vzgriaio9okydpy314byapzxnwd08z2pyjxy9x9fr5pvpjy3cqb738dl3jrzn0kvrzz0vxsx7az1zvpup',
                
                extension: 'x8nflvs8tnd6lplqrpalse48nbh0lbxbx6u92kyh196k7q5hg8',
                size: 9029692155,
                width: 439261,
                height: 206535,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'd2555cryk0z0oek15s2dl04tz8bv11syq9kwryywpnumoxg6oclfyew0haw7i3fu88eide43bt5ewm5fpcs9zol67ct221hqion9mn7myt7zw7udwwavq37di9h8gpr435dyptxllqonhs41ano17z8epkcp9hxmr54z17f2di4mop2qh6ktg2ffe3k4igxf8px05qhuh48ykmv8cksgx3tnsc7nq2a4ls8tfda4h0exvls7c96hc8rtewx8ndc',
                pathname: '6wmf7ru1lexh7rzimxj0telols0ci2ge5lnjy6gwpjt6wo9vxifaigp930w82lf3gnrp9dsur7u1vmu6bopayr1m9d5bmp7dn71i6np2pts9gt0dpjajc5zu1u1jv350vsbf4degjhcy50pnh5ne1czvpmb1ud0zcq3xcfkm45j5ia8pa95w4gft7g0bw9bxk5rk1kl05mktxtdhd17eqcbs6mrkggwm0gai2w0pf1nto3983j6ett16q0nm6dkdspjy5ai88abkj36mgnkivpmmimrqw5pnmfkdns87lsgiip9jmq71j6bs0fih1xzgozs3dfwjwfawzhu5mdgswbnnfg96ewfprplioqmm4mutg4oet6glv8n6mjdugig9r5negitc0cs1ta5tr6kmsbd57dro83w2tdxi2s6dp25bahbrixrawnsprbq7j9zcsszszdsgnjcf36lisrbtukd3v76z3nn4d9lkf19foitked5g4fig9o6jlk452p6i4hvgla0n9xzxzs6gnxqedpr2c59hij85dx2iny9onvnuiwxfyfujbp6wbftw8k7upap6tojby8pdjl38bc9qethffmyl3zg8liobnm8vbiazt1b5pu8kia9gq5ijhc2mmgsfn7au66m2hsl3s02gvvo31rrtg4c9s2v9bxplk3xbgtnse4ium94tcqhb94osg5yft2crrj77z5a1i38ig06bwoo6z8kkxn7sp1jukwjd5oq8vxswhskh0v2tc1zkzjsibtxxass21o5nmex9fo28ng3zaz6vy47u8vkk9q1ycr73i446clunz7z0j5yrw5jqreviwspks0dthelgjixdmh32lfzgga7gqzdarhzsdzj6iayxft72cdim52rjgge8m78ua8nr0wjmmpceust6j9grb0fdn47ag7t4bp6qi9wgm80sdlwfufxcmzyoov1itfgdhxqbtd1svxyy2rfsijexobzob2z4kayypg2a8vsufn1g52x7q0be3acj',
                filename: 'mjqzggbu265rguzser8c4gs3d5ildj543mynrhm5gejfmpsf9qc2b6hlwl9t75gtfej68res5tcz3hki7uughw3fzjcunp5nihhqnxy15rye723c3ws2bk2h62fp8llpjsyyxgfy4wgehlylho7qtr354f806z1f0jfxbk65dfcha023fglkwlhugzmfbm01qolxmt452cbxkmmwbsono1kg8cfl5ud4jbab7m6n49nzwycz3anfgdzg00lk8gc',
                url: 'u8a84sd08zz05a8854otpwt2k2ud8dkltggiov1vgbhn7iibx10m1axt0hctzx8g0d2fj349vkgm4ep4jzv9tf4jud8g5vifeuxhn2s7sv6tgy762re7b9kybf4ygsgg54qgmzjtfgow6mlh03ul4mkm8oniygmwgrxuu8l2rwuokwyh6wxkg95r0lx1i464bg4s6fmsir96yyh4wb2iuj5uibvfnfm6l08mhj5ktzetsb9s6vr64myrsdde780cx2qx5198mku76vq1gq78xv0tdwhb57f4g3907t317htaohgxtsbkkko4bvu2s3x211fcyasl92ujw3yx79qr35uje1ysnvv6lzzrjiccw1m8nhu2a56fmgkn6rx1xewy4980rt8yfh5qm3cvfl7zxazxvbqvqxpacbnmk7wejwznpkf5hh08osbp6m7zd2cqxqbteqwnxm6ni89f4fmfscv5zfanw27hcago0aoft40vxfvjvchk7ei8tnb1g3qo7j69ad7sjc57mwdyq528n9vogsc9djrcba7gr3lpcyv77k5y01hd40r1uuknpn8pgv4zm3k06p1y7ditqeo85cr15ahqkeatqqoo5n5vciulpor81z3kop19zu77fx30y3csivkvjxti2p0zwfcq3xp01plwt08gws8f16ru98qjbvv4ul59705dnsfxa6a6svq835cnerhhya6d7vzdeamx9xb9bb3rgwomdp498hse1dsqgxo9e8yt11rovtwdmv7s99jbc0rjmq7go17qcspw8y329i800985sq8nx89pc7ycjozz77p4gjbwhknte3r78eafo45a62jxpv5a237muuchjlel14g7afiz6k1ggxcf5ow8d7o6h5yl3gpqg1ela08jwr2oamq3peiq5mnvst8zrhd1ff3vk2x5ze4kpu648hcrsj51o1bcgqdj5rirzo34u5v7jz4n9h9vjx60oq2iq07xuw3rkzkrkz7j1to3yoz2wjn3jqjvyyxr',
                mime: 'g9ji14mtb8ctrikxcwoma6ods4djslz2mqr4f1qa92olrn91w7',
                extension: 'rpx9jm7ndwxobmh1sz71gnvhif9sdi2d6sk6brsl7jw88ez006',
                size: null,
                width: 218553,
                height: 518835,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: '4kyr6vjajn1l85our2de6w8d61ktl57zdjsmt7uziz03shgvz87y6wzh0s1hwth5ziq9257cazqmwgnbevk71fjebfua1eyzpim84jxt8psisqyrtcp57jysok63ymsq8pmjuy7l8ouiccittcuce2hggzu0fa6a88lsekg2330yl3f53rv18chxvley21gon39xm5um00a7h10ogl4e6g4p4b22mphao913qeur0m8758goargus1snwadgwul',
                pathname: 'hlf3e4kl6m66fwrmubztsvuk486px2fcnghiwnx6fbklmm1l8jq03jktiw5muxy5l4cmlfknbd3kuhqey61lgbudpie4tf6vcu6bxoonol7esc2syj5rebj5m6awh4xswch3bg2zs1rqy80b7z43xbo1ozlw3oeanr9jrhytm82xooxh01jix7hywbabknw33mdrqb87eqo37qco3queajjcr1b3kkp2m9mnu6fkoy9csbmt8lr6q69o72wwzswntaxxsthbbw1id8dbpphftqrc0laqkz57tsq749k6naevynx1nlepe3yv1q9q5h99dfhwvu6g3f2ph4ajzz6b2kiapszi5ygud2znjxht8w2izxd1vicagoc6kn0a5vq3m003wcb8f4oo5a2xx4dk79wwzeos37l985z1lxn4bpdlfg7ha1f403xr8suo6349lvbch3h587gf45wd76nf00tbc6eah2861pemtyigqtu58p1suaht3lnkv1io2ai0dq3iz2j7k4la9jgb53g9rvmaaajohf3e9ftbikytkaax92knxvwixr1iablk8wqk9fwdf6wobu6x5k7gv4c44hzif1y3xntcxste9wnbk3hmbxlvaoj2wfu1z7v1uxla8nzq98v5zk5rnhy97zmnovgvpohhdjgo2zsi93jh293rznwl9pw62z8earu47aigztp6fjcz63uwqxzh0xsr8xvqea54e6xha6cm4mx3gqpq6t1g6onjxpxgwd9wzepnfrzdynocl51m7rmz1pwu9f4goaw2irknuk0xl2639oewctvf5ngqzqjqmzftstpuj1j4tv8hc6krtem87vwl7tmlekz5mp00oe0mi6gtfqr8aviy4k8trjgljvbetyfd48vn0idomr4xqtuep8x6mkktcv974rmlxjhsq27ufivr4q0ox600rekt4gletc5jw8ryt9d50f4xabpviz9sxjtt36qv8et789jdpycepdmobjqznazhgj77vchf5270',
                filename: '563p689g257h0utcsbw6ybsua1yiql8zk9ekvtmbexcnhzmjsfq9ka1048vgtt2qy3lo76gpzwzp79ipg4m1mzh8h0kpz5xet6utp3dey6lw9mf2ung1ai8nzjaogkyhe7vbklbfzthgy0c08fitoapeec03ye5iz3k7kv0ywn5o65gj01kf9urynx23jtumb02q4gbbpvzu831nm6ehl5g19iq8qyhz4wokarcfmt9jswgzh1n3ds51hvhp84f',
                url: 'q60tyyh8tjospu9e2z4pxo7y199ohyr5xiekgpemqxjrfc66vfcz44reqsxvd3w2kzm4qwwww30633pg47r4peqints9rgb3aijhqax2jbxb5gq523ooo8493wp1yanwkurv7aukv9canunhmdec08uid7ditb695wd61y3gii6cpw1bim4juvjhybu7w9zplta5853xef64mmad2pfn1jgjtop7rr9mxqlbpu25x9w1n0alshpm7brr0aiimqiwjf3od8gw8evw1e9vdn0miegfc7t3sgbkjl1v659eegjb65ftghe09x1cqh8d6l26nuok1hsu2xtsoj7wgbzt569vow2b9i5fpbpacdbz0wbctg5ts6ee3vf45ikcu3f96n8h2zfpl539ym6et9ujyv7fjst60hpn1z8mtbhl923u1c65fm9fuchmnvm40ri6u7ph02pazpz6ju587gupwr3kzvewk5mr018iar0qtod60xarkvs0g3ifxddepif9ktkt4cdyjtmmx3agk16446gnc34sg11oncee95yilcpleaftl1q9p9q3vz123ldxlmg4bt9b01hl7muqayfblgw8ocykq22sbk3wnlqd34dd4i7z9bjbwdrj3ymwlbdw1hsmy9c1lzqf7r8l57sb1xcbp5s5hfd8luj18pgl5vatm182yp1c56nkoauji3o0irozckem8amgludogwo1yfo33glojmlm1slrwubta4hkjlbx9ca03zomodmtvyrnjefxala3zrc3p5gn62by8wl0s2goszqt5o34ceyo9dnfo2w024du903ip7vh54l60msxxqqu6cjqp5pdfutcclbxjgd403jzwf1yl6howikisamc7nn1bjzyg8uub8ryshbrqmptzbnwnq1a6hhy4y7pm83sp2ggbcbh7fxa7eifrdufvr0me9kmm757p59j722e5d6iukx3mlpkma89als0ossntme97y5ybjfhp2jlk9mrpa8tes0dizibw1ct',
                mime: 'n93f04lom15k6a8preq8y51kfsmrbtjexaz8sbq2ukzfq8lal8',
                extension: 'bsysj530qh86ri18m60pw3f1f6zquq67kmihilpn6yoj6lud5b',
                
                width: 120824,
                height: 664843,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'tv4l0vy79wl9wstt0wap43djlxe3xb35bhny4',
                name: 'se4gyomfw6m43e0nyn7j3di0d9jsykvq6m09lfnm3f0ovceyui1j9g3weyavf98c2o3epa54puzefpjane277q44jvxz6ns1u2gbnaozpyl9z7vjpcw3vu7s7sus3xyf8joy02121cfjczhr42q4geop63ght8vennxo4anwhgod1o38krt0ha7x7k23zd1u6i0dmqlo9opyqxm7tdd5ohl1onb5fgwvlo4wvu5uq2euipujs98ktr8hodysku7',
                pathname: 'lgpc8u4p599jllmitwldiqhwioqd26utci8j7fcuvj4bnh7x4dcvtuwq34c0nyhf8xrmwjilaffyy8q1bgd4t9z9n2aimb3dsachfuct30k5y5pfz7hqkcimb66pej3j93fac6ye5spm2aqqzvba7ilgal7i2o6jehsjfmirpnxy3ybnvurpnq0bchis4xh6qv4iwabwmz86g6z8iefuzo0oqvedinrz081kou2yw88hfik8fh0eiagyf71ic192yhuo7vrsiljwqsup742z7pomlrdhh0hlgaioyse80wq9sptoaz9emhd70ewq5qviow6i9fp83ztsoknlr7t90p0ck6sfug4qzdc344bcfzvsnxa7tpwpsr8gpkdfz36ehajwinxmead0k34nqmiyl315dlkzebpxesyen5g9biesixnuzyd96kc1x952zo9gvgrgs4lt803xl30z50aslbvywu9zh8izu96edon9514hgvjrom6zanr0s0qe6ck6mio7rk534uejyq4n3x7su2kqqpx0ui7j9g7olk5j36boyzdltos2wdcnvrzsyrlkovdear406vha2ygq81r8xttsawov0qed8tfq504gbjv3y9x292d49eygitpb2d2ryqlt3knh7kkq4whxi57h2eor4sv3kc58udl9c02bpv9h8hzp945wyr9uzv4g5v3ro8oxvoa66q4yk59msum8baod3ww0dcwykt0bn5at4jy0uuohyfa8strl5pebuxgq6i8ccd103k49kx6zel7i7jq467jup9hb098sffqjixzbua8h2rmso0p4ixfvm3ke8q9fls8hqb184k0fsxbt8qckvq5zkz694vd7aa419xfvii9y8h23igezsdfaumhlmuurc8jya9phwdprzc5s4pzz23uiu0jy4lpe1d2c66dn7aqtv12jhdlhk1mv0upn3qsb56ohju7n6ws9x0gh00skxkbcberdkurphlzlu70hg88b03dzn0e90v1r1iro',
                filename: 'qmglh8rutwf9j18gj88bx1ikqh29hdrj7bnzboe3jhiw57vlbcdtgeiurps1584bcxdy0jvum3lvpaavifkayb55sx207p77b64wizh98m4kzqoqw37a73npak1p0lxgscyz6l6629nxjoeqt6djviamssikrjnf1npwe031afmd5ctzq3smsbcbd58f9oc043u1145t2mlqpwb4gn72kuiy11ituzx929636lbwsappbkiclk8rwoc25eofo3p',
                url: 'xmq6aludozn47aci2d0jxmp67fdkc3oci030qf0d5r0vlmpx1vcenr9hrgu0doys2rhjig0jklflkz6tqhbzvuirbklkvjbk8rntce08086xrplachekpcudr2eyhnxip7pfa4b6aqmne7iedlibnrigx7ivlib5tj5ijnfnr4u10f7j468c75jkyzgm2701swnp0685df8bvev9czzrz9dm8nf6pp6g8l0ssmfda1nkwcppyl0pxgw75s3qoo4djq62mxzkc3y3dq9a0d3xiothhkw4if8d56904yk6won4fsoghatpl40sxcmjn3iika65nluc7vk4ivbf3f4v1whlw1xtlrcpejz383m38nf16zl4ihfmelcjoaqmuxw11z9gljxbhq4er8gv3zea8od9zy142lpvoy0cm6if9akunan6z2i9cxli9oj5h1ppxc63avte2lx9ne692zwetx7al0p5gjl6cafz9vvnnz0v5wue2a8eyrh1ynflgj0ksamz4ejkq8ol3o05xxshv5820dnbwcgtqxpxt9gwseerqqobf0tysawn5mju6t7tuqyhfksdh3pfx0zfatvnt0iy273q64xs0q03lmr3srlvcp4m2ennmlyxllzuuw55xwt0aoh21f89wgcz2gmqyp0bviwieoft7dxo5qs6rx4urb2w9rxgpyytkq43dcb43yw4k5f8w03e5prp79ka6u9hy4ein217olvkxzvt7ccdavgd2bky937lhqr5dcuh001mxe047n0tr3d70d62wi4xcfpbayl6ggy7nd1239h72ua6x2z8whprgmh0rsnlkvzw9y3hjl3w82h32130i517tzkpgq66i6l5t3dmnpmhxzghpkcp4cxd563ynwd3d2ylcpt4hvctrtr6a54wump4mfre2v832maw5kkdix0cqhgvjqtnxf1u1uzc2knugo6nztx6duryu932l1wo8bhx1vet34kfkg83zoxujpuhqvxfincz6euv7e71mash',
                mime: '4ehjsweg1hbfm3z1prj8ppa37j0hiwnlf4bumxnuf24u86xja9',
                extension: 'qxtd5vreslybi3jvwyfie0jullmvb9z1jxewaj5qmy6o0a7tf9',
                size: 1219321697,
                width: 725373,
                height: 977101,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'ecxarquo1q9uptmbtta29agapmgtnfkfa7ybwpyu4yg03e0s42ufys12awipj82ui3daydpvq4bdoowiycqs98r8mkm5ycvjlqbg2v6u7q2otk78h3r653bjd1z96i8sbeq25sji06smfs8207kd83epzth5ji8f80u9f1h0pw61geznvac0u7ht9qt0fc3i97xfy3auokv8ktl2o9mnvuw2yt95vofmft6e4vvvzt3cq7fpajsuesow2386krtm',
                pathname: 'ix4h8hwqz78723wg0whw35dwj2vsxfle4sr4op9fn3asl1e0bgmepxguxhyxh332axiwpk2ukjf25b29oc81v73qpdpaqx6pwen3dciu6bs18tfmuidwrn8devz5e21hmxgu6fhqx6sudjqw5h3rqeylqvnvqd65guq9aq2h2rcd0lsoxl1joqkdj2zifo4699u843t73ymfwhye93oev3y8acfugplc2xjn25wc0k6h83o3h7o9jetgzwvbxl0lwajsrbntso2bx1cu02rpae8hxn1t9umw6xyovj8gjk62pmuillx5f3fre2ehmy4gs7srvh8yezenmojx6fey6co3xcoccf0ewcbc9qx0osvhrorqntmy977vmmu562oh6txdkuadne3y217jrt0u1grsnlpa9310nzpod43ulksj0h8epzc9oiahnczap4lez5hkbxij8krrmpsztsboj1mswzr0oyb8xc1ym8k678bhzpin7h1dltb80sfh51xy50ug2b2u4cf6s6rq0ch0s53cgf61yynibrk2x7m4zaloir2hja421jioimaxdsk287lg6da6ddf45j96214wis8f13uro62p477j5557yumx21zvmdlyhtm5d710t1oa6tni1y8fqgju55o33x48hbwijicenqy2ca9zkzllkgvzz9vn16dzu9ymdiksb0hvni26mv3s5tetsjw4nme3odz3tfxk1wyzinyi90tbpv61sd8cnswk26epx6mupt8qy4w97gulwdl03svaf6xl16kbexpyop44onwe00ao6jdslok95g0g8hvuen9sn4rz7hx6n8al5rffof1lhi8jw57gahfmu1kmc9ghf9514l9hcuzsbaj4u42bl57189ej3ktviolfmiutg36ika9kctr9f8g2gxf8ngj8njj3809hm1zpugtpp7xzoq28jooglex75b8wzea97vo1tz0mvqtlujxd5y3hffq25bly6z9p7djsmw3almek1idoj5a8',
                filename: 'jk8s803hixr3j2x5gld26pntvfhvothu6mbijqeadx2p1we9bmczj5nhox5k8hsu7zygt02eiq2kdwvqv7qdyg6ee3ciq145h9537w3l8dl11zbbg93p6yh06i2iish4e47gy043w67ipx3ji1qw2cep1xzwz8f7tbzc31fwk4t3cgsr797uekphkglu75xucrsyv5r503lxl0ljpnyc789xkht331rzawl23hcms6pn3l1dpqzvsv5dzzrqffu',
                url: 'qonos21h6hbxsrhu8y5lw1umr4250eh20onj42ioisqitbhgoktumbyovgxfu358h9a2e1js9007nzjn1vsbirk7vzk5r36vfowhiov98pre7bnz0j0jj4s5ektqnqyy4qruxgi7mjog2qmtyp7fe639q143fowpixlzywchqaygyq7nk8kj6292lkg6c7dno7qlvlua9kdofi423uar31l1g7uwbj03voisuu2s2yzfyxc3j2xid5zzshb73bvhnfuvpmzzmed8yi329nnn2cb85gb8t2i8b60wczywnwv0qz5otn7d5c1ri0gwth1p9z8qwobb9q1at05dlxj3auw5ij6a1bv4xylxpq1r7jywfsbbjkpbxve4dzukb9zz3rfmq9q5c1svg8aw7r4smppo29asqlpwontnmioaqda7zorevfoemtnqwkifo0n6zpkojck2czf84chss070stug59gcckxb3tfdlessx1ugl75oxdxahriqws1u0yr047gpj98khk9fc7weodcj4wnvi5dl97ilpk6pedeu9vmtufgum1gvp98aucipa1pwwifszwjhn2bmhx1k0s7y92l3fxerv0pl5cnj2tx024f029au5u5756bv4z8338cdiggmz6ur397synea8ipa3hcskeukqflcy5n93pilrq7suzr450dh3c0jy268776rxtdhmnoo3reoentk6rfq4w3ahzcqu1nws9f74wuf7trarxh0kh3463dx5t1i8rglpvczrwktc559kb2xhr17gufce8hki9xw3yo0b82l5f911sh4n6nk5c3m5ffxe72rcwmjhg44gfjbxcpwybxlsv6kufgzhhk1pk11b6nqpuqwo0tulha7tmzqhcj4dvm0fuko2jgi6ad5ex21y7pbjfwd8dy6472cmv0siqz41rbosz58iv3wtxb3vqptdljuru8cr5ws1oghz6mm7d9jnjnto8a3l6gi3vayfdrtr5vdzuw17kf4i6po727u0tb1',
                mime: 'lky5azd1ha9nc2sv23cn9v7bqrfzamoeekzz5uyheviygheex8',
                extension: 'mbvlk8flumovwmk5loooqfepf0mw1cxcozvhbbiu431ev0j3an',
                size: 2456631951,
                width: 733733,
                height: 494750,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'f0i7t54cs0dp4rct70clsqmzgaqx8e7053p0v7dcwnkivi6apauhems4dugwn6aeww4nqi2hnjay4xva9y16yb8eux4ec5fud06txafhni4larliixtizgl6bn670otkltx9md5n2n9p3so8kktii8i773u5ead5q2rv842s1lel8zkw21w3pc8zitd3565se4wvj1lytdovsgrvgpb5elds1fsubspwxp7w7inbcnzh1ke2x2r896ux7r4jlfn',
                pathname: 'r5bjoq4pvjy0nkluylenjgt0so2vufkdrho46tyzl954t9shvke1w6th02uyrv8ciufqctggg2ey9v46if5khmxw3xvtz31kxodvtlrtqd21u9imz13us0sfmmyypnti50agih5og84ctkeuyfsa3l24w3qhol2kkqbu9xbkwawj3jbu4b0od0qn9d2pj81sr174h4kitjx1y46pc37a7hk4eavqjq7eeeuvgeulmn6nhgc2l431p5vca5ranqj3qut25znvy1jgw83wax8jblyog3p9pkii8mnb54xffmyw7c4mdxucw7xge4h0sn2nn4du85g0cnfo58k21qm0kcf6y64gkbx9wd5b3sdf6dm8kfh83bw0p21sysvn7y62lv9wn1mjl3isc032svu0bfxs4zbno2l9ajxfhzt8syh1j9e19rc8ej8hyva9jm8i1o5khmj6wt0wq3iyg335cd0sh8aclil2hj0b8dvu77ew1hwa7hxe4vao481248f8d9zu8jq9vc8c21gc8lypbmooe90kbny0yr1outwl2n6jm41q1w68eajoa100obkgwj8mvn2vqe9lfnsahsq46nv6f7sa6q1icsoool9jt8y7tk39tas7iwx4umrc8rg0k55k2jjcjmase21aczl41f31zzqf5bjc7e5l2x2dt2es0i3agt2allzw3ojrmb8n1duyvxcr9dh6ruicmv9c3bxbnzqp1oj5f1a8nqyrewupr6p50k07dazvurbeof8ptvaiisu2h419h2c88ps9t5z6afaunkzpa0mu4goc50ong4jn0kvek863dxiy94feqxh6jokftac7auwxs60157qybx9nwpiacts595yo3acoi5wszz3e0h31wyrx0jdkscm90yqibhsyau3qgblyzggyo7lo1pyo064fdhk53ylmlo7wxq0sqbc9gw6cl5tfbyggc2hc4lxtana7iys1iw0fyn4r2r9lktetave57ho0eww46f4d7901jdgexri91',
                filename: 'yzkyig6rirf2uokygo50rqs94qhunm4w0kwmqpqij7sbwnegtlkb0j9yy8m71vn5ody1no8n0yjuz38p79zxh5aq3tcpa6hwfeymzhgywz3s0ep6d5s163fyi78brexx4f4eb8k4755m28bih5f8b3o0coem1ibd0ib4wnaexqxxsl2wrtbo1v7fghjbrcx996vxmky7a6o79noawj0v2bxkuytqxq5f805juhai6vkwqji6av79lv6em2356v0',
                url: '51wuv4asay35n33t7yaj1ebokynd806o4d44uydulg3nqgj8t62plqynkeiyxkteup60z79r9obkyqmrjn5r7cdiz1cbe1uixdmyeril8zj4l4ahqlxy5wzati2m0v2dle0e0xeqqfja3kv4f9y6wyjogjbxig328ml713r7daq3nhmsq5bna8iigrdho2r1blmajxep97unyj80mrhjjmyou74gv39rkw0nd5lkaloernbpj1ivpq3qjrrbewoehmzp37ev8ce83u7bvrd0402zu4vwmba9r2uozbdoy0j98js8kti8pj985q0lcf89d2uocwz1aurnnzbyvbyi7l17xrap6zf0fkbtp2lwdh2io63zw0kwut989qrhjqbx12e3rzvv3ikuohgmkfur4jdnjcv6p0o7aiqquqzl6y9ah88jmgor71yrevb7hvtjts2v0cjsvrk72y1lfwhfroml6sw74f9vbrp253kbekczvbre12dnetywn6uqolg04o2szi188z1104nibr17mxjtb2p62gblrnkf6v7qcowb27hsgwa4i095wcutgnbks0ud2jgbmlgqwbarbofjeksqq843c57kfgla7jevxc12kfl8ytrru5mz8kkbwcpjvckijql011081kzzb8cz7xezeo91ekqhj6z37vvbmq2co4ouv6evavhbusfaz0uycowg7in5npfn737868fu3voq5xwm9obi8bksfv23obhv2mxi17bxqj7h5aqaw165mdbh4268lr9u0m8thr7jzyc9tzbsfjalzdiiyxtdvdibj3zo6uv8gmhra0wli0aknssp9evtvsg0qts34scv742uk68khix14zvyha1pr8wdlmfyqx910v6jwed63kk9kotas1vga8dx1ayemvs19hmtjk0iio5ii49okyx0xjip1x2pyibj6d8r2voubs2rxrlkkl4z2fmsqknbdd9cor7vi9w0xxbssczjctg7u7qzkvwrbqea1el0eawgqrdk',
                mime: 'fgpf8otwi56f5y8dvbu24v92vwsxzaapivnakwdknu1nkdsvaq',
                extension: '3dbmxjgzenli20zoh4nbbncr9uitl2ch6s5zuczezezgccwn7l',
                size: 1833834224,
                width: 115827,
                height: 735283,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'qwftqg01brqkqsrx79nylk6x90a9bfh4n1eljrqqflz2mgj87eg0pgk210f5frj3nnnk7aybiyk44djqtaq8m3prkylijtaxyos77rdmtaeejbpugiwbfe6wmyvzb040fsp0xbuvre1igvg3nt2stifjpto4w24dplnib8t0sg7wsm18glo2nwl353aoygyd3bstlxtubewuuv3ynu6o42109ph7ex7zvr7ls84e9yhearz1y029rk0e1cedg7u',
                pathname: 'ji333as0zcbbrci49nuprak0nrg3y1wtlq82p0pjvcpneo87gh96b89uj92y3h5smowwcztjdo1e3m1p0ect4hizh7sipw29xjsevbxf62ocz015gxo8iibwp5q6r5v6n3btk5ej8lm5akmou8ui7fbsf9bi2jllk09aavbmoof28bmbs1dzoz18xu58ft3dwh8052n68nbdxnmi46zofq30ayjhm9pkc4j3q1x9d8aqgsl2r7jcpfb01abdrtix56e3ygx56uylaqy7pb4z3sc9g596s7em5zr2bsv8tq6o1hb9lxuqo9x6knpauvhm8wj6g3jk2by3mwac0me706ztduc5cgva0b6x6rqupjids87kozyptktz3z6atzos2zw2n2qs1ocnkxvfd7vakmv87tf1dyzu3ldgy59uyxv8k9wsb547zfevbff2ux7yz04c1n34aesb1aqf3ippirtzwjhslityru0qblsjdbulclcs2phepziur7xcpl1ummshd8yukjiz4c6lr37z5cn8jyffryh8c9ew11pkan3zizmpa421yk8y4pw3jouabk0nsjpkq2vp6bfkvlfvm3zdt9wnc8uhr6t9iidprq2lk50rdkasv8xygsdywad61xq8vt3gc5mdf1nrmytdjjt1ep1ywx47b0yiosxq4b9hlllk1ui148qvew7xyenjju2a6nvwr66748iusi7t69vkv7o6341rqhzojdi2t1kmozc0e354invm0w3hkddncyjamctg3jiqktdk5q6t6rq5znhhvmr6ptgm0ev3880vhfz1x9tj74gxs2rtk05ih95os4vxlrh51h9c9dly8o779bfgqcjxdsjttnrk84sumxm5qm4hksmlh356rn3dwna3iixte0jgxuesosacvxmkt4yf3hl8oplxvazzcssy6gf2xhbr5u0l5rbvzx0tue0ij22n2979527lddqs4pf3a3mjpy0ilnm7twx0xdga8t53xbebzwpwvwan4x01',
                filename: '0zpz03netnjm0w2m3metmc212xhtmhzpohmsmlra4r1yyukp3xi25xdchon33699i5sc9djhv40h925g8a94nycj4sudie8lpsg4s4yx2ec53hyqrkflsor8iwntrcpllfrxkb6rqlvw8hwst8a4ltzfsvnezah0smacqr6m3fuk0iigqr3ebajpsvaeopnlgvkyc4dxxd3xiqo2io7hj5hyhhunjq2hgf0qc8d758h9om74ec9okck3r3kkiril',
                url: 'r6ia6vtabvqdbl0h884jg8jbxby8y6ltj8zwlv3gnh21xfbqzratg1zy3tj6yrkhi9j2w679bc2c1rw0h8y4on3vopb3fcg0i3741ttlpftlgvu4n568qhy2d5isw3mmqihrj715h5y0q5d60aj6wmv0fl7zzhtltn07belj8izwssy82h8fbo8wm59lxelcm6x0sleg8kiij0adoj3m7aj3c2m1ue2ilbi3rlb7paasujfbqgtnf67n0xcxdsko59ld0bxd83tnrb0k7mxl9q5xnundm970xrp2k71m5c35grbuura2x8rueu2k62smcfodjl7ilkjpvz3gl8f15v5i3qy3uxzvny3ux7foe1ecrsevdkhq20j4h4iulk2z3j0b72jgkapvb8ycbccm87rrv6qmr52a87txkb3rnxwfbzsqr8bvpnlq6jj4z30johto3ilxi79impbk5h5k1g7q89g5w5z3xxh56emmxj2l5909r1e0wrld73s0zfh03kvkcsao0j7swoevdzgsan9f45t38nbjj47fq5jicnngs56ek6w9qh1r8ppd486l759njz8xdj7k4upupauqmlq5amxph5yndkqoxerqp1299v4uf2y87iirmqcki1mi2qn23ljlqubsir3nsl1wj7cj35iftou83qqqc2lfyvi4kn3jy679f5kj9yiairxghcelchi4thfv4ozat22pnag4fakha3quf3ljbzducc29her3lhdxm068pbknq7cgtzw9yqblnkn9g2mlxaepvwgn361tcpg0nrfh3tmmxzjvpktupjk5km3wznqgzv9u599d0mc4sx0ek272qqt6zuqbwpp3gd4ft8qv7lq23jqiffkjf3ze1k009ve3tq9jr28yc9gw3po02llpvzjod8kksa9ec878yvfvtymma0l56w1q2l7crk085ahev1opmbq25odmrnkch7e7iu613l9p11ikaulvp4px1co46vra40br5sms70khwr508h6p',
                mime: 'm3ad2opsv93wwtekv4en28nxrli74w26adkrbygq2o7vjpq061',
                extension: 'n0m709ep5kaztf80biqww93dxgnx2s5t1xps5567el6qh6771o',
                size: 5828994633,
                width: 238715,
                height: 774556,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 's5f1f37zzltx6on6cudke0nf2takgyh9eynqvmt1okwhqhfzwzpy2pdxm6x28bv3do082axp13yd0v8i3lh85go18cu08ppuvvg1v300wuvk00v068g3ikh61zj55uabgkorz91j8phlcq79dody0njsswd7hzzku59gmkircvrlm2ngf9od6exc7ywqid30dzanroslmukpd2yqj9cne4hb47kud4weu0g4051eq04co5dvviuo2ngnu5l55tz',
                pathname: 'egd1zmo61r2ncpzwydkr6cu57965ohqg2t8vsqzexhqhxjjcz9pb1smb8iafjjg9i0hhkor6xr5rdasykpdudt587qakcypqydvfurqpp1ezi79ji62ew9pbknl6p8g5mfllbsljad194yfsddl6mpt0scsw3ea8lbz0sbo63xmi2nuv0q3lz9lso34xsp85842rd4vr4at5ogwjxfq9xjmri0zr3f7ex6i5jsewqn0uc2wa7u66smo2s55wui9ujnn5276gqwptlda2tmrm63r01c1ag6ta30q56b7up4rsr67i05lnvo6gd2newhq817pn3mhcoeviv4d94gmu2dm0kpw5yqwki6rfyrowom7zrn2o50uxuiit04w7pmag2tamcjrs0uho6ve2rgudscjhp1d3qsnslrzkae2v7lp7l6lm29rqt5gq2yewyfigycop0ieh5em27jwtvo36xgtvb6hihnynjwboskjoffc1gm38jos0etitgzz4b9w421p4q53fs42xv2r4m1s8n4i0gquqss5zfmklvc1k8d0yphvl4aqinr7x5kh2lr0tao4e8sqy4i9jxbbdeeydbcxxbqiyvb7j73mtybwb57c5rsrm01xs3wi63h2jrvqfnea6m21hcesi0k9wrfkmxdvvwxvgnblz7u0xuz4619gtcuincn5idf27jkl95nv4cp70w2u98shvj6rhgae6s56v9b8n0kyntr5ef1imp1mnqp8hprsvznh9axhqyagd2g8qt5jvatuj2r838hah9l0ocn3kkoj9gfaqyu3ykvuoe12oh7blmrvq0pkswjhas7rhz0kwvf92s58d44wx1mywjxsy7oy6h0xalil4ss1fjxcl8hgzy2hrxm49fu2g6fotpy4m2xfsqye62dekq1d6c0hkaiwvu5n18ijuqgfq551y35m9nst5dop9zbyoo2xyynx2ymeqeoq7zyd31zhgimyq7l12pasbpy9mhtggyvpfkwseh8cyfeyu7toy',
                filename: '2rb76b1vv19h1fv62p9setbscbij1z2mjwoc47rw43t6f3i7uj22zdw5emakrhvu3kk5dwormymfr4r536a1izavljkiaw0a7y6dz6yykm5tkyh4whnptgo2yglxjz522wnvooatcu3svj6od1kqtnz2dtb8e8o5v4yt0fsamnsewxou52o9wyo7fpgdnglr8txargf6u8ta10onpmmvrepm9i110htlewyjowa9houpm1o4uidtuna1kuwmj4e',
                url: 'nuq5zzrdeh0bnt4i2vi72p5r352ajzw910wjfatup2fbyoww6opfe5dza819vkxitud5xope1cssnanu82dllmfp46j80h5s5m9815gdzcy9c9su9e3u5n4n3oznol3oiyvyylgdxoxmzx4kc3vhwbjt7v3upy1x2r0iwtljgjovj8rpx95wc6s1styat4aawd4lfnjkj6mqtzo77ynr6mkrcyx2ddny1w22014ao7pl7a475xxfnvwvvtgsdn9pnoll9qamdibzsbdqo06ffd6ah8qybtrh2uqnaauvb4zcvpkm2e8vyczarnooull670t4edtal8clela0pufpp3k2ww8dsegip01zotojhuj60rv5tnrd5h7knxwroejjltihlbebhu6dwqg0kbiuz78mycljrh1rhawez0y2kxsvlfzcnuqlsb1u443gna58e4mqanhafguz2fa2h4ft69ryz5hvhpdc57v89px4frh39bqarfb73vfzb9ir4vsr89pz11bzznhgsevgknjnayiybxox8q7b1ri3ulnfg7opnerldrclxyh5rt820lvnrh4ymdegwywqy6ois4cjwf9u1yjkge10sgwecunvo55np3lceonr5vy32taxbdof0uwf60ic19yp7ysah005bpjfj1itelmthjxakbrsy3xh4d0vfpkzrv04mllut0nroomce780jum7y450uv14zw7ceck36dohmsfldpfspp1gqwad2p36mgahj4pk5xai524fu6bnlxfb325bgcotn4zvcnjk3u23ck3udvw0nfzscmcoqzzuvkkev26dw2p3ye82emibibhvozf2lunahv6kgpvy7unewqkhqn3yal1fcfeh4p3ds14hlm0rudg7awjwzyiiu0nggex7gint5q71qiqrr0hjutba30p2fdxn946wb4kgagjddkgjcknip1mahuscj4inwlrjecwd32uofptdn0pl1s9ejezhnh5xisfc47tc5pzta4q4binms',
                mime: 'cmp4szpmj79eav0kk5ymaqxi9vn588128ssiq0yr9vdzpdztcn',
                extension: 'hxcjc3al602l89dueawsowwyqnf2p7j93vlq99wvpaziv2jeh1',
                size: 1403663420,
                width: 715294,
                height: 129577,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'cbjnys12lnm8ghcery2nm5h6uhmdsolyhbrjyv7k5dg65lsoyleg4yjx9u2wlr4n2l9zqq3etx5q9wjc2vruk513q3dq4u8o2955rdyvc1ec64cosxgn38m3zwc69gn9w4ucgscqp07tojcuo53xy3yemsm6b213b87e5x8w95wfm5hmdnuom4ew21v63xlvrfg6d5va7q0fifa0lv393qm0dzdb6zl4fx8o4a7jft5czpj2z1xlsv9kw2rfwf9',
                pathname: '2bqdx871r3efzu5zmw7di7b6wc1lw0an1rqvwbugkefz75891d5ju40n9fnau6uq2t2nwz5lols8xlhtcu2u9wfdyyt73mqp3gvrm6cl99b0ym0z8krj7q16olggstlik278vaqt61o3hz6ueliuz7xycashdyf4ligfmqv5y7x0f8uom7luzzorv7b0yj5z05fygeslkdcd4glsd7wgh78zbz32qb7g5bz6yy6xdmft9w0vs1xwzv6u8roenjwz17idutgkq1as4gf8httos4pb2pq8jgvd38pv9vezzdexn550zv40ij41nnl3iwgi7xhjxm6if3xnstw1v8qfn7g7mah13hocfenksziguuao7rhsyv7di6svcw3voipqqa5dv7t99impplqb3fbb94liox22q1h0tewi8lsxzzrdaonb0uy0anatunitfi5axv2n6e8r4ze2y73yumhs9dkpijxjacl53w51acf8ja3a5l8ya0ef3x9dqgvn5nvw8gy8tajl8kf0c8yudnvpii0k3r10omvcl1buqn5s0qsncdzg0jv41l0gszbm8ihwpqt70ity9frubf5phltlnfcyeadmfe49tg494u71k44cejh5l1rnma197870x3c4rr6003n4w94pclamfk065sacfrjdvdkmcir4k8soyhksx0hdi2gt5m8csuryp82bebintuoa299tbps5ll2ckllm1maayc381yvw7o5g3qum2qi8s920yxx0u4vnoetsjs53c5j9a9dnpavntn1mhyadhime8wvrrnhrlawinx4lkqh367rfohyz6och9xtxr2ntsb06nyk9tew0zsdfzpiy604hn4l95cc0ib1g62j8rjoi9wtjqow3n0qmhgmgj6yq1nwgtx3ii47m48fl6pzczahvix8xk2couhx50z6wt0kebfwo6szry4v4f1tvi9sss49mv99dkufjt2n20ixc7n044tbrxir80v0egcqjd1koh1h2vy4pnqzfigg8',
                filename: '2rt0r98jcih9yy5l3u42f4nwhmvjp9x5bo6joenojmnp0xtk5dfpgm6we08n9iv4aw9vypsaxdtyry0wv9phv3viush7aie9cwttkem6tfdv3e0tposzmkc6vdm0062faq6lmhscks1kwowkzglayj1yz2ns2prcjah928ks76ezromxko87tr2t38pktne4pjg4tqo1kixlgtu98taxe9kzjw5qviusydhemp6p4zlpxnzaf5htc867go0km4y',
                url: '40er1lho6thp68sikpv7buako6pekh348oub5mtk9brsj4z9nmfi50my1ib65qockoias3o4r5jpvhh5iasjc5gygyq1mdb5ugso6tubyeyc28yx6v5saf649k3ykgfo8w4odiavqlb9rbnos0dkyzb2op8qn5kjppj5rw4b9wph7xt0ost8o7yjfnk3p6w2odx651swj6m2m4n6j8le0ypkzoabf832zg1k7yg4s0zg6b1e56mit29iudasi0knnl1pyf31ypsmx975jyaq066oxxyf79enypp3r54gqy7ubyoqgwzgzxqqw9z8olbc2wjxwrnk6xaammq7q3049wpu1oyi3gmy8o59dd1zhdwrkd4lnj4g57il7mlena6lv7h4vouoe59700qichndiie2q2b6gp6p4x9z11nc5kfceqspw0q1nbqfvh98dlbdibubv54f9hh70aeueh7211vhz5qapvq5mp0w5xlbf49f6nulgeewkn9401ty3denp8os7n2gprqwhvqovp6brhqcnpmdfbpy80383xn8v4t4mm55cglqmlmb6pcaclnoumfglob4uf1b139gw25rdrvv72wp0gqvyun52hyor5wby7kdbgwpvofrh9qbvk5vqb230dcbldjjlcouh0ehott2nke2wn4xqr4dvtwnmi93pr5nsutht6sxylabl2oncmdn7t7mrp32qi4rqoek7kpcndgfm6qt1snw00uywpzt8y9yw7nnu86a8qtw043ot0wk9uq7ty79jmug7urf56z87uayfzf42ao0hlnn47wk5tenlf28ze7t3k1hi4w857qeyc1iziz4hz0nwgzy98uwebcmyv5wsndz8xr8wgj2yy5dqkya77py8d087f7iqx3334mc6fzr490aerfoyiccszg5foea5zmn4iy27zuxd7io0f17mwelf93vqg886b04pi1jme394c5xq8idva6awswmn88jorg5o7hsgkyesgmfqfpbxnt0t0khuwvg',
                mime: 'vwl9puwpr4d1dnzfrgwiljhemgb8k35q9fdixn5vn8ikt6en7g8',
                extension: 'hlxb0dor2tu8nfdkiomnoc705eb2b02w2lloly7r9h98w05e8s',
                size: 6591534775,
                width: 271551,
                height: 329677,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryExtension is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'y3o7w66om2o7imy79bvdz0v6euy5wmrjqyumwuiqi3v33c7fjwg9fwdmwd6px6omr3jk39mmg320w5ncmapoitkuflidkvcg0gcb4o1ijp7v0mvgwffwp85nn01sncmiu7zzgstnflizmrbfdmwpc2udrspaws34365qgl63ject8osp12846nktnqs42spcv5evmfzgajed0j499nukqiyvnuh896ds5o39wz6vhx6dexvkvqjb1nv90ncxffz',
                pathname: 'rhf80bzkpjzglp7lx1f4r6my6oxmd8mpuqon5r9kgv1p1513revrxgb30bre48sfqmmqbha4pg5lg3aiyc5pjpip4lc1mp7pr14ctds62omfk9me3185zzk1onqrssqecpn9xdyqnrwiyuybks0ulkvqo08k9y7dkf7xggsujahxg2mi6isfoymt0ssoldddbcp3syxscpfajp0qbwglmfkp8k5299okohvpris08yz563yc2gmz1wq21ybdo3jwt26ew5w3kz5vkurb6zpsdu7n411edswmln2fkg6i3ryzu5h832hzcx9guhtlcec4q394x1qp8fvkcocilwzo6px7tycjldwb4gq6wbaih8w3lsa7meqkmuozmpixj3wd2aiaydhqvfq0g9mlldh84r5uoz3y09fhqqakip43km73z9l76g3q3il2nm69cg2w7h8xs9tceattw0yfh89jnh02catty8v4ctad5vae9o5dbbohig1zl3ofa980j890jukuvmxprkwwj0vq8q34fn035z6lwwy5o68hybptpjyuwhtlhb43k224xvvrsd1uv6dfhfsnd5z9lg7grnaunjsveq6lxl5fbk8woz6dly3xilshl4itn6c236v618308at9vktwmepjs4aiir8h099wvxaxhgn54vsr35hgudadbfv9ytu9hsnwikaorpcn1a4a7oo3gsn1fv0ds2kfj8rryww8umjewlk5ky3mjf3pghnr6ce57evwjx0qol4txg8xnvg501g9vsdyb62ntndqh6cen6b02bhe3qmlnosf7p7nstn4xqev3nziyzyviazagtgycxg4g0vumxahqjg1svkrrn5w91iaa4ev4llhtvysuw39cve903di01scw6qx4eurr4kucs2krftk7ol1kpvgqqoukp89teg7utkh0qz3w9d238x31kmyn8mwf1kpkop29a2uc66c8u8o9puh0l327l4ntx9yooxabkxeq9e986p7dzbjwwsumgff',
                filename: 'r46hgmih5jaewlcxodslib6igqieqmh0ejd7jp19qzvofzylcn7n344v3qduwaq9kkxwvvundy8qryc78tqn9qbc44dr0pqvpx8gbwbdvvb5tug0tq9ph77bpc8groyxa8thip2bw0stsra4151lcg84073awoiu6o0z3e2lt8ugol2qsoigfy6p9719fbtq8cl60rkasp87g0z6pddsgor2tnk2emv8i2zakyfmqgbcsov1i2haqis4vv6laa0',
                url: '8vs2u5obapz120z1ck546ig8izhoqwduymvmvu3dzh26m29zxu5ezxft0brlfuakeo9n6x94zdtybk9xieg4fovzne6wzotwhzv95hvrzoltcesfrmod10s79ky9epk2enjo6lmny9g9cw7al8mkdmeifibpfvngid7tohqz5sk1x018qhmc275a176wxfr1t9jz8ycupr7plgavrot26iigw2joxyeokgtm0ld27a2834y4xnt8btfftd7xim3t7e9b6ab1lpen9sj2k9obc7akqcewtykpvu6m83fnn3l5prx4kemc5l5k7uknn2vig7bxfhc0gx3ade9lnbwp1uf0ffkrwaafmqceis7g88uxn999m68nveihfsm41d5zu5jt5gxovdgak1tawkqkb3xl8yyrxudf9ffb2u3estz4ymr50s9zfbu51hueyi8yiyi195mvv1g9ymfqt8thwh9zdstbxnruowuzh8n1ai43ot22zo3xtdy27xm65tm0zj7lheu6cs08kbp1wxiknibocvhfuiuuib6yqv3o0afzidjn9hap79pbxqr2y66dcjnoat9g3qd2u975qvmx5n9tws6jxqb8jj94h53co6zcjiltk1c3o9ded66tkie1nlsyjrbwgiz0k5at2xcqcdolfjaqh0hdfu03v890r822j0kwb6b7idwdbfeq6m712h53k4gk4uewtvt09124qbx3svltrw4kb4akl29vjxgecdyl7pbqhvukl7t8725xl1coqgal4biswmsoj55xwlz24e3ima3orgl8lo9tp9v7pum3r8hsl1ns79o8yyzwwai3n18c3fqsawyurap3c4a0wbcj2mhtpvqam4afiwh4ihbn6fsqc0twhinjg6u4nxgqcgcm6c5a2qeabkovpzwopkl2t3w9dzdpl0xrw23dyhh416s7533eon791ryxtfsc5cqveriiodu0kdu3245e9djhvu9b3n9rmyyh5kwenrc6z2gow3yiv9uacnwy',
                mime: '2xhcg9vv9qhkkhva37pidbep1e67ej80u4kdnm7rm57dw4vj6v',
                extension: 'ybbmi8oz8o3x6fib37bwgi8mheb6gij9edxzf5fnnxc2ux835it',
                size: 4248470737,
                width: 401931,
                height: 638325,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryExtension is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: '08pjfdhpnge7gyl0q9fmndmeggcryhnyuaulave9d7s0i533de2skn58karp8usvif711vie8u16rvlm7ns7kwkhmibjadus9rg0f4rtrgtw3bnmlm04znv894ffgyy8x3mr5wk0pie5yoe0tdnec2q986iwqkgm7bhwp37gi3ggmatctvc05oxflzt86ky5itfekum1szzjwi9vmnkk0iju3st4uh88bigjzu77xmtxlute6kt6ztu1xqwa5dh',
                pathname: 'vnsmxlqm6miszaad2xt12dwbk71iunvg5znp4x3nhetrc56mj5ievpcz266wo90qnrwxm9uhj0birv0h080poqbcf7o4fak1rtr40bpcy2pl2ipvqrs09bjm7k1t3bdq0m18ln6ype7acgbh75dcgn0btjp3brxe6smgf82gc612ssjab15jqlv9fdh9a1qp1jf4ow6mi5sg0frp6r0rg35szo2igkq2buis2klc3fg7xqzq5b3egp36k9x4sq83lyzxfoy6d5n9bhdht9k2ptxoh7r7wv4ncftyivx8qti6oqn5qtuvnjsl3w436ah72eco14mop0vyure8h8p4eumim5yyhthjg2jnrsvi74medin57m2nmavqa9fa7i1kidiqzkkacajmdcby3kfjfukmrnntkp99ydvpkxi5vab0su74rksmmfdxs9v9eeenx2usloionm2x0ogcou628gn7i3b5xpz46mjye1tzdqxhuuvs7khm4apmydra1qrdhnfk3z2o2g4okk5xmjyfkfl0i9903t5shrdvn5de3dhh9saop0iu5udjw2w3lxzydxxb3ozpe0oqy1uhh1jcm8rfdfpc8uzivi71wp367t1wtex3xdlvadvt5rtmia8j08nh90d2gg2ofesewl96mbu3rt8gc4vd13ib2duzop82rqzbfts7yfiylk1jvf7ys3z1qj90gbxj53k7llcpju8n2hop5jubp5x5k8ob3f1vgfegw8exlmmwpzjvt0exmndsu7l9268cfhwsowtigpyysfjo7rdcijn2py9rgi67vdmzga5lonfeafd05pr134z1uv9pek45koqva9jewqstzxj690039h0cod6yrk38i18ct9uqxx1bxm4bd5odhdj7oxxgryz00muqp7fhen6fiy2o7wa10yoz5un0hovj199sig3ctgahcpkaig2rbad928c2gvir6sqhr48cxbfjm6emxr4ai0fizf42ki3zl4krmxvecdrs2oxemppg',
                filename: 'eol3zz7mju6suadfylxzr14rb5b27ki3qbd13jk2zjugo9yizzmkj2shc0a4v4tlb3odho7x0pvzxr20b7lubuz33gcnhb41sk0e0ri6l91qcltoiy40omzin2tn23ro6vck4vk7nro4saftevo1yzdo3at5g7dyrh5x9myabzu0rkqfdu2010ez0f63yyfuy72dk6u8lph4rc95f9p2748uw3fssgu6i0xv1g2t0y6spjplnqa9j8yapbopw5n',
                url: 'wbhzoh5s5xkugslbzs5ijt6e7rjq410brnht8v79we8gm2itakf3w2hg8f65qcrcleapx2baljzttknppzoog8lb054uf62r5xlw60gb70o0qb354rqlpte5t5ru6zujhbzg6fprkbwm89nu1hgz2wf2gok81lk8yo1mdwro9o86ky7nzrky1fdg6jmdit612x607f8bmtl9xxq5ez7hlcpm1kcw9646im2b9wljj5q0qqx88qxkwuram95q1qxj6vougkfdrx7vvydhjsk3qsa1hcmauhw2lwc3y8gjr0wxflzw1g5tjjf5e31lm1skouq68pvh62zf9ncktxkvzenx3m9jvgpyzvqyr7s20xg1045pzqbr3atp7o4hq27slvkolmeehtddnof8phed711z4eo3zocifkmfvyexi40iiy5ohikt4znatpl7avi2cdwsm02w7ymoqh2pl3iz5dwhumt2b6h1cekkx2bdw1a8kibtbd5x9s9vh5smuz9hnq64oi2eqr2f9ytiwxr5t8trps7zsho22np1bnb9keqsm7w7u3jvf4o9fv8uq70e58i2ob2on5bciik1oun2ucqvkhcpyeymu4mj0601jty4lo01boeht5od950zcjb82vrueq8dugbimdgtwphd5awphe13sfaps7gc8rtkrp23pkn3kctip6zbxgdk1uci0haaf6pz6xig98nqa7yixquaxkv58c4ezs2eb37lc31x5mejrxe7bakagvwyshlxdh7vks49os81meyzzbfl4zu1xrkyavd38qyugeloyvkbjnf0pt8llxgtd4slstngh5cbj6e5o7hlsrro7la16kryg2gboji3amfzlzokmqlnlsq8vnyhbuf7pqs37pqgdz93l7m61wcp5yg0jr7uxh0gi5ed069sa3exjydipyv1t7lp7i4upcwha007t0t506yntppi08xaals0ia7lhz0abgd4v5tbzrjlsmxxo5o3p8aw2nfi42tkkakei49y',
                mime: 'wnlodxsfr6x6dxbehfflt8vz4zo5d9mekrk4q2rl42xpkvpepw',
                extension: 'abonlttax9bofwly9us6cvgqmdvjddk1lia80oafiq3mknyiob',
                size: 66605708440,
                width: 121432,
                height: 260706,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'xrdo5yi1zw27cr7lc5enhz4mjca0fto70acqm4u92bi0ypddonb5aq5d2lgko1ewxbhk9rqariw0y5ix493exeo1w0yis5xornh2cfonfrir1od02qz2by0uy1tslaxq1oiyzzq9idz0orjp450nt7e4iq6ezf40s0n3vq34ll6i693jmj8k3n1rryh35r86kro593jevqe033nrssmd356wveiobmem4s797zc4xpqbl22warvrneptl4yse8z',
                pathname: 'nj7ilvr8uqvzo117hdq33pvckat3hjj2gng76j54uydj3u7u8l0m1l8olkcrzmcq0l54fuqj1jilmwt8c1i5gqra3wqyrevs6jnefdjas90vcgiegx2yh70af2tqkj93gbbwkkslq3dl5815coqeibe1ogtz1e38ce8tbv3w0esgj1wjyrmt4c8qutyx2f90rxslvm42o2u1qxks1l5zjwhqzgru6l6fwa803kynk3odhwtofnobkclxgo1z93ez8sctzfma4xauftbrywswv2lxs2q9x9cchtztngz8wijbdwzctguvl1ta7xxgpxfmj4tuh0g93bu2sch7da3ghgxsctxf07vlukgchit1pna0naofub575dafksyezluocuxzlvq7cc35a07s7kpatrs0zx2ihb8t9iv3wy9kozqwg6j2iaxqxupyse29z7cyo9cwb1tao1qlzotypgrzrjs32w3fjbcy4kzwe5876wywtu391zxywfomsvnveiz191ujvmti8nuxukesx0sha0a6cm3nr4qnal2w9ytxxz2wqj4gqz6p3ru6pj4zmojz2ai9x5ynrc0ij4fo96s82we85ipgzd6ww6vx7jgjcs8t7c108w1obryc9zlxxjx841k7nbnev73aq4n9ggpcdo1i0x9td9852g5tsu7r6t2fnugt06lceekw795p1ek8noppfccjgeslkmo0cfbwbd26kec0ye5lsbb1qas25p0ptmgb5i0qkzjwr1h2f2ndoodfr7ig3alaf7q65p6ot8lg9rxnfvuhtyzkgs00njf80xe7irlqg6mt6hia57080fkwz7at4zulf6wh65bh64m6cqrlv66zavasrfe3qj5ypt8nnkzc1mbgqbu8bmcq9x3rp8i35q6j121bwkyr6aubjmtnoe8rrl0spej0ms0h43lyntgpqpml9xkhaxyilst0p6xhujkxe2d79eesh1hd8ewu8m8t1ya4p1vtsgbl6mfnsniyvriut6g4by8t',
                filename: 'efx9rslht5l3kjthmy4jmo6i25bc7tufbmtgz38svqnnafjt5pcyi0q1c0m7bym7rooldmls7j91p0gvk6p40v32cv68g29xrs0qcskmfbgservj91zkdl6ttunnpguk749vprvclyxvb8gcabzrzovbcpsdhp3xstiap12fc7y9qnoltnfiozmveuxtyapqf0z5l1bsf1slmw8t2b6plt5itrsbc1nbc08i0rolpdnsgb7d4vn3kv5dzebylns',
                url: 'e0y3ye4k7rw24zfq3zhgd1ftblcze3j7g02m9yt9jez7hphvgdestfw0nwuxorzvtxpgzbyxrsbz08hrerbbzc1y3i4mmqom1s9twa5aon77siywnxs1q66d6bhxzz9dmcd252ivei8zzjz4p97ckzw8ml6ntr9evjvotqehuwugyz8s3s1cwi76gy26ijyfneqfztda5qc1r85qt139v9bnehai2d7iv1c91r25tkzqk8z2kf95zqjpha2y9zhktouifrqcgylkewzqwkb254mxabs22lbgy9u4iejryut4apv17uokqvlhrzwa8evm4cc6sz0j2rpkdd1m53gogoss2fkjshh90emx07sczu42w55gwgtsxk2p6c7sl68mlqul7khddkmuy74soq9mhnjs6fzjj9hrn8uc0aaibntnkgoxvlif7f8tt8bte0lkvv8idlzbx3e8lyll9nbjw3pr9w83hx5wbie1tm5gjulkhqrqllv6bd7q4p4rstppu4kpqi8o3bnnxey8px5rlw7jl7c2fmf2usrhbae7ed79lf2ic3r8cllrtbqq1bu8zbsts0q9ol262xeeh2qwsl8kih10djnblrmznln4uudr32ctxk3zvcbtnc2k2h2r6zc4azf289pujola14etgjoknqfyxbkz68cdajl0iuvokp33pc9fnn3vdzqhig9qeaac3ojgt4vnkaafkj5uuzdvp9l22myo35aelnevdonb1k8h3o78rxm91eowm7fxwaqw495bhxz87g8ibroo9i7gmu2ynyznfymfvkl8i1gxzq9xq9x18n2wj6kv79csyk1722hl1lkmld7x1covnew1cqpp7ivklsyxm9643qb4gmwyi99z6dypz0mv6u3s5y2n79jg11559w31ren1wlrk3utmd6an11m6zr9tcai3uh3ewhi4bfkefe5hfk0fow41efczuesee1swirk6xx6j30yk16tv9l35ir5cal4drmalwb8r6oos22aizi1f',
                mime: '6mty4gl2nk0793zk31qqklrvkxnxhejwusir01pnusl35ofng8',
                extension: 'yuajeeuknwis2oeqwstyo0wuqz3ta8ybbrccqhqm2t2ft3ltkk',
                size: 9123078369,
                width: 7191429,
                height: 806927,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'hihe3dlktg3j3pwml5xehu55brgdpcdk902mv1rz0ppombxdf2kuk3j4mb2m97mmf4bhu7nqbb09jz33iyn07bx8l9gudkz97cgmc3gjk7y6mlclw8ckn9yuq7rqfgzvx1x4g300631ashjws4cxednxguhdqhynsb1r36oq9y38fltukzr4ytdvj6whvcih67b96uua4svaspo5za2sm6c6g794sh7lnwn8gbj4y623bdanncg6onwlofrk7xq',
                pathname: 'de9i33ytaedynv0et0kgr03i341yj09dxpw0ll8fieflv2q7xx4rl46ingzjigwbg299ib4q7ievz848v7zm4t4nhyyuamioccq9qd44prfhc4zsbqepropcmbfiexi2ukf47vjs42yifccm11d3tsew8ztpqtdr2vitan1krs6aug9izs3cfe0gdbgbvn6siswtcw0heiqpi4wy95abhpxf9ault7pe4em507advx2ak2g2bzwjyb7rbx9hw8p8ruap0gbgr08w6cv5gjz9bo99vc8xf1x8saf6oaqwt8ve9d8lcj0iuwcamgrlp4wkp4gofagtn31ut5lzbl42y5ceohcjkggncmufw4rki0tpxr2lvrnq6b1z5ssaydjnywkyk5xyed02gc83vpkfh2tw62edefijfvgn6cw5ul7pofwzi56847xkmh3hwpbsbhrpol746v32iwb6zsr2oybh81gsk6f92keksqf7udkdh85f6jk7r29x4ghuwr5chp2x4ssro1paubmdxg5fbx371gjptiatzb0hdh5qty20ms03tkzw0e3qch105tlm57k0xvva83500y8nf85sbnut5pr6m07zx16j6q25uar37s7hgfu7i6mkgqsxm782wz6cgxoyqcnbg8u1hq5jyyaqz4gcm78klent1kael26cobfkctr5v17a1fteo7u0lv2uoty8ptgb5ej35iu5kiiki5t5li9vaf4bsozm7qym8dw91lq1y3dhkwrk0dgjf8s61x3wweu2g1lrugwc7m0w2ocnni2bb4y93kas3onidysz458kbrfbpq2f7ao6gqwmy306ia3g6k36x8qa08ikzckqt53mndtvvrzyfwp243k04smqcrxfrxlulvh69jcbk9z7t7xyfhhn1ytl7eucmtgceex5gyu8xisavosmq4wbqdgodhm20595q0n346pevb1tollf7vm8dx9cqefil66lk5mjzdhei0l8g9pku6kbgzu0irtlttgsydzo',
                filename: '3xizf8up2ph7302a5872qvmixpfedg0hp8iid8om7jcmeng5vnubxuibjprb1yo24o1yvs08y490sb0e98eluici6kjczp7pmr8zbkxpmtz8i43ivs7iowu995i7a9ksy9i5qnvi16vxjygr1itqgteadiop1ukxg630p5lzyizd81xsywxr985xq6k43eh3n7dydd7wfqigiccv85kfryqtjwrunv2w071xq0odylli9ylc90gvf02xa5ozyop',
                url: 'jhzxi89xg49y1rjzh46y3rxce7e6omngximemkc2kdhh0x8x7gwj7y4wu5ntg5jxclk1thzwd9g93x0zz6wg2s9l0g8qshiknf39nzlubil03aw10d189y6wzisxf540z3spnof27ytzlk226fjxxt982hx7lfniuk7u4r1cp2hsm6mtvphjbrd7093zsu7ag30lc502ztzoiqdk8xel54226c83m1w7s0pyzyr6y8hge3qpc0t6fy1htyostsxnlin1osp20wsuxg3f919pzbet9xyoxpkf4b6g09bp4boraa95qmyv90ntbwofzuszln272ibdtbvygih6kjjascc6oiwihtvn8aght5vnwydsl1jvdqsdm52irr2n6u5gnlem1cg5gq5mhlx0gisr51ocznzh8gp5xfqy63a6i6bvq8ps5hrs8rfp2dvbmzw5g52io26qezcmshoqe7ksv24ohbcxvl92nb1e8tg6zesdt4epaegu0v0gh8ebp1ahthgl4e87au0fch3qyrepw0k8x59rxt5s0hvklw2x07i9kbj13nu45yhxfm1dr073c0zmcepreknss7d27zahna9xzigy4haeejfbt5vpwvy9kz9bgqz85igoywercyx55ri4p2lnrx45hfuz8yzefgb9rzploinarlzqmxxuciczy1uas6ix9vec3udra24e9vs20vq3ub6888lgwsgn8j07veyk8xs4zomcen9ppu4o2tjbe9teltjjexck41iux2jbeu6neu41j1q48ljtse1159mli31u4bdx4o9l4rp0xioplsmik0kshzfzcvagv9im38h1eysz9kbzd2d8vg09v0kfi8vjmznmuzlriy4jhrppitedsmo9e639rkb2lxodnvmxbbcine5u91tcee9f8po8767yhy30zgfh82hyc93aaw0xyvrexa0sm5q5dtpvv163aet7f1kz1623g36qhcewf9emlsgqwvoaho00xy5eds7eljvkdqjswul4',
                mime: '5eogpqa32bk43jntpmrka3mgb8rqd1zmbl94m27pzte3v5y4m4',
                extension: '1bu0lj7m0i76k4zufvulyd8ly68bho6lxiqp7iwjpqnibe6xl7',
                size: 9054988680,
                width: 844430,
                height: 5300271,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryHeight is too large, has a maximum length of 6');
            });
    });
    

    

    

    
    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'xcc8ck779wylia12s547p8vcuobiu2nylc9rp66ekazra4hw5uuhahx4xcj3obk9pwdults76howy6r7cauvr327rryu39gfetbo4gkgncc4aqkxp9h0yhtzojg0wxidr1gf9qv3x082wk3zemn0lu0lpgm0x3d5m3q464psipl679vwg1dyj8s1rbt9eg788jxi8jczlslgtal2jya4edsic2bkn7ae5bzfmovu6c00ciuuco40g8dhzyt5u2z',
                pathname: 'uy8i2a4w36v3ajthlfhl3yir7ar1sd84lk7i3rmlocm2otkfg9ko0y1dgvvj3l0ezwga7u1t99s768ptk2fjxbvf02ww1n44iujx9c8pf4kjwdsoyp4w5zxte4w7mw3fl5r7lpqg4mrt2sfl44mdgtza9pnjd7j5vktbytqlnh8w9jpbzjkagdzagiegez0g3227qyjbirzio15xdlsp4dy9ca2c07rxghbwdbk1th191y7ovklvdregzlmnhg2vq2ll9z3laoo19ut0h1uc3f5azv6sgoi1fmqepm0iiwltpejeto9nwi5ccqie15udjmo7beu1551cpxbw7mld41r8tu5ycwnk5ml5yppr23z5wuj2053amn4smr8bdxp3ub18amixit2c35pp550lk0k4tvfawat2mvn9mno52wmjileez0tohs6314cq74czlua3hgp3qj76po48lkulddul315aom1odyjy8cy22dz1rlb7h9ri2tq97031wx28lckcu7dnggdh2tk84phtizz3kk4v2cbmfqkz1pwhlmy0kx1i6b35m4rx2e96qgg9wpygnoo16v3ua5isv5fikj1vxjqyxuuy8nxhos5776kpucvfbb4gov6kweuzjpydjx6rwan9knj5guaim2kvvpi4ayockbz2pn7a3n33d008e86159phkj8f1rut47cbdaparbm8jirns72iun86oyiucfehg4spovjkqjdpb6iwl9vi3ba6givryzinhp52da4wz9t3hwdb0oy2xudi71v3n89e1c40powvxcmu2qf23wpjmjv0boyy2awndu1bl18s7wuvshu3tf99zhy1ozl6qxsheh91bja1lj0vh4d8b2y0frv8agz4wr32tnhiig435sf77hxoh188g0f41g7i5vkh0g1f9za4vr5df742um1pf5erjc56sd34jelhy4u7ongggy27j13ktidfslgp7rlvtf6cn1tbffcy6xkllro5rlyybg96vfbo1oio',
                filename: '6t8hb7pq3aatc782r97n7kigyiq7viwxl5nnl26tdlhoow6epgcky2bp0lq8hyv49g0pjee5x5dd6r0qt3sjdq5zpc5ycx05c6o4mds7ee78syig2tabjy1zc1gt1zalcc3aseduo6jthptgm5cbjkn15jpfy71rl92eh78mg2r6p2kic8w19rzs90j2qtah6o586xbu5hx57cj7ekqzznsn4gp01ff27xstjd635mv6b938cfpotz7hd503fyj',
                url: 'iurxgl2eoi671x2k5pcayzl3noyogfywa30d5jv7i9nb66cuyyyn04hrha2b50g6epwmm3ptl42ao217xuza4voxxid5vcgflrlx9ldbxcp3oyla66gxdq2u9jeo9drb310smmvwyi4stjgk9sc8whmfqj3hg9y1uvc9mvmw87mq8rq8gkdxlofa2gur2mn1t46yj4wbhfftgnmxoea5hug764a2exsaze3v9qctudk1n15jn38e86d29lboa43dr905xi6xrd7dcqimbi7caugdnz6fdgvwnwwnaemskxpprton164rpgprl8t251mym1eqp2jdiizxbm70ao8784utotu5xv0440ehowa6ebiwjc2qrxi3em7fu75z2j3vl2mvzze6z7ruo29h8aglzd8xjf0nz3mji5ozt2tbfnt9kyouwlmj9mvx2bw8ar584fo9t6brerkdvi8h1oy2ad7xz6ozc13fb7qlrzawud5tymaix2gtvromt4ko2li503apcaxy14p8hwbu1ycq6vwrlmw9llrq62v90k405ahlazxcwdmcvjknu34md0hh8be9xzed710yv4cow55s2wd8egq7alxmps8qx49v67pq76i6lclhehpcrlvdhhcyvxyyeqo1t7436dgd457th9r6cjjq88ne1ivm6eghmu7dkpmvg7tkyno6awi6y2uf1qfk9df75f8iq6ktu6vzoqbvreydbuppp0rfl5wxjm6ycelj4svnmuijn0ifosk7qaynmib81ryc3jhy3fgmxl4d5tmcw636pv2hc06a6vcwrtp4zc5w840xag5o41nijc9it1welwpc8xnzys88y3vjyhmd6j3qozzrjfmrko9i5z7whak7yrkgmxlry2cd9ryw336236ei1kscbuieukxpje2cu0b3ljeylmz7y03aowtzvh4tp4ag7hvr2kihlwqrtf8icm28o8m9hf3m5y5c5gkyjc5tdn9y86uhd78la9bixuyg9pmxxjrfj5xz',
                mime: 'ddpz7wni2174o8oe0molyh951skf7qbo61wxlz1rpnv7joz46e',
                extension: 'ntmygdzdolqtpb2w7fvupa9uej6tlpjw5h3xcfi1hc9co2qa0i',
                size: -9,
                width: 192678,
                height: 729268,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentLibrarySize must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/attachment-library`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'twy1pnlza3y39gpghri2p7e19jtqbq6ehybdhce1p46r3iyencszuktaqdbrahlafmhfjnb9jtq4i1hpnfptikjg28by921zbraw41xos6alk3crhi6a36mj3dmmail06tjboxlaywesh0o5d4bywk3vlwurvwos4ndj2nzk94tgniu730l7gbgxqiecqvjj68ew5s9exy3hve5ej47uygh3o8uen0hsoirb0nkaa5ip4ur8133rzwczbe2yicz',
                pathname: 'i6frug45vb40pxs7rkquxnmokksx10ml0czk5y8l9n2gah2sz3i6fdespbd7w0u2s266m3fhcrszhvb93h6j50in9g9trd3cbgvopc8z5hju2mwsyr49ocojmbcm5j73t28p6hhf93p1m8q49qoewt81deh3ffh7vljfso23de8x838snik9vc2i6zt5hgpxb2r7gqcoiw3srkobhyd7ty0m2g4w6is2h66upni1vc05o2d34uwpb3cxq0puhuqteknrrk5sab5h72kltktiukda8icwrpzt0xlv81gh208zaewaq9wyckcngpdsxtjgq3317tcrwraue0g1fiiowbxeaw26u0pra5fe86jzlnjxiadqjfd02ludhb2zuvwzrbmr36xafj6sbnr0cg53ta10hnvwnrr9yqay4u80k8gmm8x3bnr3nyv1yn2n4s940jmkcutiinv2iwennc9sk8tj0mrmsf4rp9q2njxxlwnk52ezb9x3i62xnlnln7npsvq340eg5oek28bfqlbdp4cc2c66bu6r1v0dgoaxat16exa4934snderyyh3zv2v3i4dc25kzuo9mgkpdbeqy7q8wy7c6g1r8zuen6kpuuvpxuun19i4m5qm2525i4s0m3rddjc684boql0kths1wee9uqclfujw0wxxapieolqzouhogvn6gv2pagziswn8mfz7b870sb778ecvoiqoaexedbrgj16ow8im8mligfj66qyqyeh22ni5nfhwd1l1xfxxulphpx4mmyc0hia9g7wfq8gvl7953mncp5mwq3aj4mbkjf94y7k3tkaye380dcialwi2vtek21af5mophbvxn6ykrnggohs8tnfjsl73xh2j6yj375wr6xni34eof5d3e7n5gzc1ja3bvjwsipp9el8l3vcfiaq4n7s7v23jzeopipwjs6svrd8rbtirk7dgo2x84uypoq42a58yfx2hg3ezaefnawwkezcgivz0s708if2pxta2jicteary',
                filename: '1h2io2wzh9wmtgsbb4cjv413jzzncsrtly4oo24qkyzcvn9rflox2o1o1t68f2y90oji9ynaz8p0ryo6q01lmikuct4x3rqlmg3swrms5b1tpe523aijk2bd95kn1w1te8sc94dnk6igssymfuyowffe3uwqqo9brndsolxkjmznhonqc21p367h0tjt2g9akwz4bzzn0gninjbvsmht1b0u257ifor129ptaimwe9p2qcsuzskmfwhop6lz9bi',
                url: '1uzrpyjamqj74p3qhvo2lzavajav4d7a3opgzoi2bnw0dizzc5nlm50lyoyseqm2oj62ovrenivy30ooibcrcwio9q3lhf9obe26qpjrc1aa68r5a0hn2fagzc8isavq3w4nhu7m3fnf3pllj19iybrk8oz44b32bkani3pic22lucyqivkvlcg9z2clt0z2ho00wqa9dvz0z6r11brzmefvnh1goilvt8f1l0n5eyeq95gzfv1gx4t0e5ul48q7ieb6m421zbndp8w2hkdb6kh7ho3qzryec48y534g3iemtuqwaw2lh3gx4wqbpy2mm2n06nl1z2npe839fsisggq4hj8h9dybwpiutee16lctym5q85o5u3m54s0vkaku2yjc97is1mzct1dfswgm3svqhs3bmqgqav0w1j04vri07n7xecrswoz7hpeyls7qprawqowiss5log60g1acuw8e8j5vpcrinjz60t0czx69q6cpor3xkydnca6fzwe9ej71qtp7e1613g8d1wvnxop6qmfj1a3rghr0b0geonn8kc137m6rl2y93tbrwahtlnr9lbf10cdkoxi29xwq6r5dyw8kj3ozzcge8wxeclox6htkjxedii2oyoym001jdz2e8v9gqwbedfahxtpqcfmzl1vpbf3t11b2c8apyge46k1xdosruvlc3p17u2iuwsco58v8h4e4h0ve6ebzdrnj502iu1fiplcwz37xizdglh5nyjn90q70hm5o0iff6gi5umoi73tp623uc1c6d6zgu4hh966788wirwjslfnkrksocltbjt4cdc8gicc446aauohvja2ll3qg9y978001m78efraizol3cv9hr2auihvyoev24qdepl8ckagjfpqj37gthif6f4t0pbsnpuddqvuor1tsu550ylhkintm68v4cfte6l2ym2a226on8rgqh5k5yeed9a8row67wtyhl8e14hf5p6b4rjpu9rck9b1cpxv4pgswa6rd832t',
                mime: '87pg0gz0v3n4wq1wzccvvjc5fv82eh172t9hx2rcbxuld74fu4',
                extension: '1p40o4eozn0sp3ygx2ns71mvtylbrxhj8l29f1k6hr6xmzkh7c',
                size: 8966118169,
                width: 545818,
                height: 406248,
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-libraries/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries/paginate')
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

    test(`/REST:GET admin/attachment-library - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '9c2457c2-15c6-4a24-83b5-8541ef2a7333'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a246ab6f-c46f-4547-94e9-88859b6a37bc'));
    });

    test(`/REST:GET admin/attachment-library/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/38e3bb7c-7ad7-4510-920e-bf095124be8a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/a246ab6f-c46f-4547-94e9-88859b6a37bc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a246ab6f-c46f-4547-94e9-88859b6a37bc'));
    });

    test(`/REST:GET admin/attachment-libraries`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-library - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                
                id: '47a386f8-9eff-4899-9096-f794f528d125',
                name: 'p7tvtwlc66857f43ad7cceqmwfv9rzn3bsmq40co6gao1vzsn764j06mcxxx8qc41b7ci3zwekg40b0kyvqej5x0bkfjopr82tzsx49l6iobzwj6ygaatr7h0pweyn7skh6ofkdy4xvqh3sc8214174leoxbdelvxtnenylfislwoirjdity03n0qd9qfqym14nruksrw9828m4649a1pjs45y80axfnu272ekgcjtocjxhc8odpectgp5yz77x',
                pathname: 'hmlwzab8gh7iemqb53r80ziylmcb5z0unt3t6udjet2zuey5hqksfb9c3tr8ar5f6rroa4r2aln01tc5nj8tljhtetp1lbas13vz8u79wumxnwzzxakcqaip8f4s29xj7a3mu8xgwzpt0i8pwqbmsjre2aeir6i9s4qsahunntnhwo79i5hanvcrqrry7vu4mlr4ufgz4s3zy3vmq0rubqza5tf9yleyf34y3h3xepn20sbdfbkk5shjg4mm1db6h3z96iyra6i5nmg6ce8ifhgoxe777g5bpuxkmas05ffcf9k8xy5gggl1g6zfrifwiizmtokjoavzn5bc2iuruinpzyjh9z9uoxgfum2aserzm1ooitulykydtwl6rkz5rtu9ibdzm1nm0kyn77m6uunz3uledt38424kwqgitkd3ary11jkjplhr64r3jdalog49qmbttk32j8g0elwjzs725ca54iqowesul95lfw9pbpdgflqpqszj8qz04c9zh3kchpermp3r52wcr47frw6t1l0bntkntxqb3u91kk5kp3jrzy38rgcrqxw9w2dw7x9a17r0ythkdqt3esa6anggttcl4b9akx2pkz48ohztayrovxp4tewn2g8kky91j6o2zpahw2uujyhvhhxrgpf9htusyaiwcctpe8cctw6n55iym9dr12nbd6xw5no10zulzum8bir7kcpmnwl858cacd28yc1xdtd4ji8dmhb9hm2l83x56vo9obzoxh9dobuyc12j1sylw3bgnlzqyq6n20uk4aia2muohl4v9jo7grit3xuez0ibp7y5f5oat6f11s465ihzu4t17dcdsvv6w2cgfz6xpqtbtte1e8jy4jm30eymo434h49k4kwhf81zfcqw59be2uvfou4wjyczx5sed5gmrxtruss81pebnvwxr41q587l5ld7pkjufqedyj91fwc70x0azls9nj9stgn8p8gagd5dyxwwoahtp4nihzvv6jf7qow8ttxm',
                filename: 'najluh8l8jcwqmmg1ksnksfn8iiuarn9vymvzw2265nvrfez2eifp0ar65aaoyyzg1a7vf7qracfp63pyk9ba6x08soh8jv0tepp69lc70zqn8xq38fpd1r1ebj14ooo104m85xc4uchkumxs9b0ugmaxhtrgx61o1wbsesmlipw59sqje4k465vex2qz9q83m08wwz6g9c14all9foqoo740xvkmkwd5vd8ioq1l4pn94o974zfvc1v8msup77',
                url: 'syv27e2q0rh2p6hcp21q94gskdzljgsexkyt17g362uo0kzvo6y8ea7u7cpmwrd7nn2xqybc0nrmi0ufmhlrfcxypel1ds6wll5qq21sb5u86tpco5dbdxfh0iywu7uiqgryccm0ov84xpavjj3dr284v1iz1gsgt7w9vffread4npls114jcmb1jr8nbf0civo98wwhauaytknzwldofl9wzh5i3jh2pe7188p9yjmtgfuf9kynwdqwqnvt3zsdf5wgnbev8bq5kek0b8b6j94inoqweg2srpd3fs88auqp39dgge5ifp2xx8gr7wal9agmvga5qzm3g74xpupiltd6cwidzocolkpya70o6u96boz2l78zkph73yjefdeeaklfzsy4vzexbd2ou2nr8ntxu0zoq83jidpamf41nbn7vedrvtxw06xpvs6w155pwxttc45p9ac28urk50kvcfr6hqletjhli2rfr9xrtko4m0e2spk6w4t4be7sk0p619gnypa5bkgce9lv6pdz358s73mqta86bos5ks2pb60zcqphhxf1acen1jeumwluyiky1b7u4gli0kmwvf0g3p1gl6imzteqe0w1q3ktbpf8hri29r8c4pv9g74fjhjaakp7lj9lpxr0fa2az6lfnjk4b6pobqxtclazlszcd2lk8inl33k6jy3ocu19o8vqrav0sim9wbmf17zgnqetgjenz2snkohn90dqaoe9u7g5t4o2e8pol9i44jezfribexktctye1tr37guwdm5jsdp6eoz6e46ofnwik8wrjp536irbj9x9rcritlke4wvtdbvo2ar2zhqcph16dc48m1timtv240r9veea7yr98on9c6dwmdr6ecubzbbxzslby59hua27jio7xlfeml2kapjuysm645e0uptmta2wqjtt5dlb1snzj01odwmh57bwg84smpttony8ir4osdvn9cmeacthtpxwmiwhdrhtqj0qx9kwtoznq0bq2hpzymx2',
                mime: 'kp1i340erumhbmqd3x74h4m5d0tdx9b7wzk2h0p6gvplovrja4',
                extension: 'fgwjmg3mvrbjiytj9xl0pw801tigt9domoiz7o8ocfo8hg0khf',
                size: 6122148809,
                width: 705340,
                height: 743226,
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-library`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                name: 'kpvvz8xrlxs5qxl1olvs7vb9j4t829dh15v91zir8pn9hg4bvlq0w2a8q6e9eudllbklukml4lo1acqbsruia15nk5z9elvyprkwo1kjerl8rg70ifepc5ic5f88gtncghljv4j9y5izm9xmd7kanq2sz7prwm0uombs5p64776krnejp7a7drh9guzb60cu3sou84l5xh8lzae75zpob0525ww6tpbcy6hoof4h1x5fwdkurg0zd7i31m3qi9k',
                pathname: '4cjjy3kr6062i819pfkmxeec2s9h8gouofi3aywgwbzf5zjmk4nsg54dz6xupzwtkast4gqc4zxmacl2fjxb7aiabcz7p15kbxsgokg5h4qrxggbc6fi38wb9mnp70jbfq2m2j98e425l3qtoalkznq35im9av8qa1uolh4zqa4inotrk0d5u4qr9axhwiotc8ox7bm7smnt29mesgpkppt82oyt6ytuk2nxo8dbciwdm087gdezvqlbqlinlpfj3xahvdjlx5ija06gdt722nne20bzvx34qmjq8ucsawibduv0zw0m1fdlfcmt97liv4ya2aioo3till3torc0k15gwuya1trk3p8446k05kstrajqu8zup63g93b27w1j244nsghyrn4e7r1qq5npx3uzx741nyb4n8gpnx4ng32nf6uzo4u33tvpwbg9x7k05lt5yldb1h2x5nwykwapcraurkz7vgkjmstk0jh5jr8kas37pc36hbmy4iechyute4yipal67qd6c1pdvelnip9vpuijq69ypyw9tr6f9cylrrfkag679zau7dhf2nt6n9nflxaqbgywybihaih7cfokqc1phfog9dskt1hum2enbap1b8n0vwzmx9vbodo0mo11lsz2z7ed2w8mxjqhov4fhq3ww6nahjinlhqe016lvdxiltozi5r8tmlsksl4x4b0i4fdkssso4q8d8r56mc3kq5sgnklr5ltrdws528l4dhxocox4lzvlppwcdghp7hgk5fe8mzgwlx69lmnmae3uaxtpxr5m4r1vezxy1favpg2qc7abonaho2jz4u57ligaib6bv0g9xt8e4n1sk06dpzr9nyf81ut497jur1sgvqeaalry0g9fu1mfikwy17auuyvkoyvrx0ltabja8zyis3mck8q9nsqu36aazoofyibbnvtdj5qxvl92qtrfax96l67k9r7df6b1unrpta8j6gxk9jqg1pt0jzzix1cghz05mccq4repkrpq21l',
                filename: 'q0z8f6ptgjyh6vj9u8reauguiqjduur6ymey5ic0diy0da64vhzloqvnspj2zluygm1sonkhzptch15btrjv1szenam0x1aohxd9nu3bb6txo5o5jtjdm1numvy8jgkll34c5lvz5pozmc0349q6saqeun2o6rhwgvc5a7tab5p4g26vng57wrkpf8q0kpj2hwgwp6f8c79isur08v6y9xjbd0tqx6a3cf4rzjlbv9xbvie0u4y017gip261jxs',
                url: 'qdur7v2s6ouecjecl9f3p61snaapon4m1yi48jeu2e9lc115jejk4vwrm20q272i59s6epelzjs8cbm4zdu58glz5d8r3fuxoer2l0py832s1m8boytbsmjb80b0437smnkakai0gez7g3lwzu8a7429l4edi1rfvcfoacpymqx4llqcon9ln9dpl6ry52mwljxu17y7ee889ynnz0p4w96aym1y9fmys9i1grgmx1c6ax81ik83uosq3wlaik0pvoy0aq3s95xykfeyj0jbw80ip4r7xk1ip71r02mhc9j9k80mqjernu1c59smq0lu9yybylq7jwakbgvfpuuf5wvn33816wbgn8nhsosihkuwnnz8t0vx1e3nw9eu1rclghv1lh1lq5ila325y4osyaheypkau8caukeg6yhdwh0qmk5pcpoj4ysfhdpmbzsstbye84pmwwi5d8xco1ho7e19p3u2c7pbpd4hrj4y1pjezdun9vd0v13jqm7bx0bw7hqlj0laca28i3jusy5rdlh5z0lfv5ld2dmcbiiighwc98gfvc5cm5h07yz32yn9r19q86lc4yrswcww08yiv8u9imzvldgcmmp4qc5t3st9ddi6901solcs3phoerb9969j01xl88ym5ypzartzx4ac9oep5aco5xacz4cnd6sszvdtmyxte8pjxk2yl8ykoeewubblxa7q4zswzt8otyevv0ezydxku0wyqa1hs9f3wxozc91jo0k6lusuil5uzd3ktsknuml6sld3r1wkw6sqlgbbvmt674v87b1079m6h1248uf2upj6fi498vr8ui8un8zxdg3q8xz70mu5v9v0hl3pn5lww9qhiv83l5cwaxnekhjwbcmbqlgk6ptwpe7p71yswj535crm5k7lzeiwkkmp38gksgm3vmxllm6lx05ezj08akiks7m8q27dcarxyhtkl2zqjj94xhfzh9zemb4bqawz5ki62pkbotiaitu3l7qstz7vpjwoxh0r',
                mime: 'cxw3lry5md4u4v641n9pbcinikrwuxtnz26nqi0x0pukxtp1jn',
                extension: 'q7olnp7zafu439i2by360nibqtxnp3spcxung9dlrmue0lkzoo',
                size: 8366031306,
                width: 222769,
                height: 788531,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a246ab6f-c46f-4547-94e9-88859b6a37bc'));
    });

    test(`/REST:DELETE admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/2e18958a-dde7-4053-8c9b-66663104b4e0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/a246ab6f-c46f-4547-94e9-88859b6a37bc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentLibrary - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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

    test(`/GraphQL adminCreateAttachmentLibrary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '563a8173-46bb-4226-96cf-39f1cda14f3c',
                        name: '1dmmxuj1zok844km8wtipcfzrj7u9p9amx2rb2unyye3fyfvufzsdjw195uwr4bn6y6qahre43am23qx5d8fp95jtor5oxztkfwtrgr9c7u311eowj0ego70k20d3o6yq4oftf0woorxmxb03m5r4atjob5xnyefm31expljh1t5mctncw7ryp930sq9026jxxfbb61c3j5neal0o01jx46aztch7ss4hcljym57fe6ssj6tcqbe0vzo0r0x6bk',
                        pathname: 'l3o40tw5uiraqhy995ilyvy5jmbh95bnmt8wc0xkexngt61ioefo318wqm5lnz27ac64dc41jmnqsy5ev4xpftmq8q0jcani8182zb6j0w925yroi87u9zykkwf9mp1u56wyahxwjhdswj4l7odg0jzklwfho46ajskrf81zwfw3j982sswf3fw7b2uzfel5ng54em07iumrypcwemzc21fpacfbkypx1e8744hozbs87vrn4d20m50im3rc3cgp478kxtzzehdstf67gmbrpqub951lrht8q5egvfz5sinixspcdyeowjrun2msj4wukit5rtrhkr25x9yqk28lz5vqb0np93meqxsgkxk5cx9drwzfq2mb845d6eo2ufj0z0ysxr8l010wmb6yuhevt51xu120c7ot95hf68ay363kvn4hm8svcz4zzjpx792s9tq4qkrekvc36xl9ya0apeydtbo0huvin7jorlicpus7jtsz0h71zr0jjm4r4rpwkavrwxik0z8kkd6amxp506e32niv5s2tx370yfk6cx4oip9tixxe8n716b0resmnwxdnnl9zupxjiat541yzpxkmbwi5a1nrqclhxgj2l1n898u3kkum22bf8nqgqc42x9vndq3ff143j8o6m7jhby25e0uxqrktf6bg2eqi1w2tma2u0gojjzklha09b1fpy4ksmsvakf28314kihggy067r8ufaqenq179ohvgpbszwgitd8wf8dqdev488i4jblfz8fugzu4vwjmsc42n6dq50fq6im91toxmqsuw7f2voy7ox7r85hc5sf7blbya305w0bhumslhtlehghu12gfd3kb49rpy41grvg5m06pp7ts8yw7axs7fqjovr7yo8f314jxrh3icpjjfbh9ui600h5lv7vv3m90unucpfynj4ut7fcyuzwq7atamk0k1h3prpz4jnbmttkfop8wy79u0hleafwf11kfccmm0cmp9p9ixarycfx0c7jwuxx4b',
                        filename: 'pacngy1irmgwi4rihvk6gm1lsjhbaa4wuog14lpaogz0qeywwgywu25xd99xbrctj668v6qdklqld2xpjdyypqftzwrsoktxpbxy6ex5z1bbs1ko5xfcwkfieizr1bq0osxovgc1jc7s1yozrxk9zc1qv00qf2u4b8ikw4wraql9ukpwrs9ozuptbyl84guanstbexcilzxn8gk6ac33l1txpak6fwco0a59pkzml2uepuh9y4nvw31vhdyjgod',
                        url: 'iawng08bs53zxdpclo5wq5ug2ua1llk3t33dxzdd0r8yoe2dctbpp3h7tldhf06yxkjdvxh9huvq3lkrk4u8rdyx9nwhpmuco3i4huiaq7gqo4txmtbkuqn7at35szlcjw7ghto5jvpg5zw1f4u5iuy4s56l36ub6ua044r3hiomtcy1tj82f7tt2yjx3de5cbpo3c1b0224efyenb72v18vld7s2zieq8c4x6qzlhfb2xit8qn5gmf6gdkfacxuw5awmztedz8fzo3habbqj6wb6qdfp1j8vesnryc1vmu6gayvoozsy58t9pi8cbnuibq90mq6ug0adgnjz73qgpvuzuzzhffqhmarh3dfgztfy1rnbzaoheq3p7bkr8fn3j77m7qp7snj2cirvyn1702logr3o9be2inp8ee8gjxhwoipyjohw515vgu94gdg8pi0c0dsr1a87vx8kf3na0maka5a6ldx5v3m2z7hkmb1iofvmfuz9v96ypez9i6d2ey1b4iyzccsa8w3xwrscsaubxa6znop53j0ymqe1qqhw2u5cvwri51nmji35eh3jpokvy7f6ei7nv8hdess3cbh2th4gioi4f5snyayd1rifjd3hpfwoiaotuhxp0r1l79rwh8cc6h3zf91zk65kqfo0whc9il9p505fwvehg218wjbitfrz8t0wz62er1oowfrue68w7755tyssjqitxxbq92k9hk6d54424dkl031hkn433jbu2v4ouifo6mgmafit38aigj75ld5jc6rj1m7m3e9c35rf1tz7b0e1lbzoqo785mqdkz7kq634rdqbrp4a4zzc011c3thalaprqbnsxig212uir86t3dncqjlkwug29f6ya1zkoexkplujyxbpajmwzgytgkt6weqslrewglomql9l9sukuf27dcx7ai8i1diz9x8omdgwpc9hxapcbno9b13z4d7jktq1t02p1r77lkqldbg0m0kszqje20n4r5id2tv6dta66xs',
                        mime: 'erw4ssv1ejkjvxh0q4g3uukh5dmfotrf14h2iq7w38fuko9our',
                        extension: '3t3cr8lz5n93kavpzpeyl6h50eoynh0u2518i4wd7fiakcvw8h',
                        size: 3191156489,
                        width: 543234,
                        height: 907762,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentLibrary).toHaveProperty('id', '563a8173-46bb-4226-96cf-39f1cda14f3c');
            });
    });

    test(`/GraphQL adminPaginateAttachmentLibraries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentLibraries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentLibraries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentLibrary - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: 'f2df0224-427a-4291-90f6-68bf121e8c33'
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

    test(`/GraphQL adminFindAttachmentLibrary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibrary.id).toStrictEqual('a246ab6f-c46f-4547-94e9-88859b6a37bc');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd3947987-8409-4708-9c59-48a89f41eafd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibraryById.id).toStrictEqual('a246ab6f-c46f-4547-94e9-88859b6a37bc');
            });
    });

    test(`/GraphQL adminGetAttachmentLibraries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentLibraries (query:$query)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                for (const [index, value] of res.body.data.adminGetAttachmentLibraries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentLibrary - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b60de43c-1a3d-4a06-bf82-698b7b3a706c',
                        name: 'mu185fcojre1wkpwgocd4gqsc8auasv7wxqr2l84zk7zqm9uk88mazox1upq7y5agh4csgahqqbbhdtq2dlrfedlanbx5adkncp8xlhw7s2408sbuz408ykk1p9jkxh6lrzvys38uw17kz5fmm25u6dzpxlmmucynvvagi7eo9x6gyfe19hh8xo64ufyhmj56wwus8pwg10lq5d8umk351a8qzbjynyml2ae445u6xk30d2cwijp2swfd9eb8q8',
                        pathname: '3q06wqmxtave9fprblew7td0b1niroc95uq3ksckddflubbjbrlf2onbb7fk4k5xtr5skmpqjacjp35hbjoa27wjsk7j37fudyckitrmrvh1pts46u7trl7wesxbvoo4yassy7hdqkq6kxzh94iw5312zpnklow8fyqpwrgfpw5x4w53deym84tvynw7fnd5w9ww1qn3jbe3r2tqblpotraoinn2esc608badxdx3vumo1a7catv96akbhk03fovdlydf6i9jn8ht720i0p0j43px5yc7evt1fav5cpyoeti94lx88fjpql7j3lh44thbll5sh05y5kayugsu65ap8ccwov15m37c301oaingfc19prhh68d0xctfqtcngpwnc5ejeqw1nvdiptmxn7kdd05cxwxj85wnm8k1035bchyc5i36rn72i6smg36ap2w46ky2umafn7rkdvstra6i407oi5d2oapl1o8thqtq5wnkzmvkdcdmq6zyvdghuck6ye5d6wmfejr0ibhnpk0amypogx9qx4rn6xmkeakaputzgg8m6co1keiqhw32gv4oe4l0y25flkt50dm6yu0lr7jdckxp1ijb1c0gkjt5qliz8o9drd3zxk0j15g0729xvdx0e0w9nbp24e52mpu2g7bx6ggok52c0aozd1mmt4u1p5y8ceush91slh49y0fixlkbxoqvkzil8p2pzrdr1ncmp0815ffm12xml88ye1eg90hp2zk76td66jgtap21oo45ykreptvw9itiaqcku422nnuuu9msgc4ycfeqcrexp521yg3hs542vf6zgqxglgkhjn7rygbb9o07uv8cphfcdwzdfhwf9mc7ind5daod5lrqwdu57zflkq0kunsoqg6527ly44s748e9s4okhkcd7e5y0jxmsn6c7q51d1z9hfhowc9nedjg825zqtjqhl731u8hx9o1l6xwsunehtqsj9t3vco2dmolrbpx782zvyk510rpkw7e4r6at6z',
                        filename: 'fmxwjzpt5e0ji4rvco81eklcqs1tm1y6bal05psmlajl3xwzg4zz1wos8tomrj6829zemj01ozvde4hyw83uc980zyds1odqbq2x6n0yy436wg52m66th58qxryyjaut3oj2tl4kkiaeb34esxai4ozkmf9vase8wl4v5n1eh252t25a7unjcj7vxjuqm4bjppf6zjoyqegxxl2en7v0kuf4svzfpxnrn2dqq247ijro08nezexsl1zyt111xlb',
                        url: 'xuttnzjwz5lf4kyudkjy31r1ohyzbb2h7py3brkcr1r0rrvzcfqembvuy17c2a25hux2xb13phvmx67uzu9bwkf6xalbnl68dtji55o7m0qh152c269tb25fdx7g84a1kp9zotz0yhz7lv94wgqrki2nyse9tk4tfz2u04pbi3juo7uf0hvyxvu7r5vcdc41hraf1cbrea1cjxksx1r4p0u6yc83y0eqi7kmdly8c3yfqa30ytlhm1awfnpxabrl6i53hdoqldfw94ji3r5jt369te1y0vd6487mb1sxithzf4g6ealy3njdnxcestb5xn8eze2inwip27vxkxd0ncaj4cw26fqtjalmkoo6dzp0yf0cnkwcg9k868w24rklrqiefe7a7q1qppmx10yhxzel2h5bx1pnjow9ns08fqjyeq59gcr4x1d4gxhwdw9hktc7y565q1t3nswtwsw83bx54xnhtvb85jyauu5g2ak93lg2rar5hpuzwu0lszjfoqzpa9xw7cktvyeq2bqafn7u3ftl24xql54x90sy5j8jhi7dduocf8armorecnzurtuyms4lpbvbawhfsxychvoalr8akcfge5x75zoyrvq7o6ok2eoyy9h3st9fzjxapca8ikuvzho3raco101o35vmqrsjcgps2t3jtehel6idwkhh8dhg0wu9igfythvm15r60xr0wintoojakzaoag0gv56jiut4u7pnszrj7awzmitj0nybgffwq7wu5t9ix0zyhm8vo1dtk8h8p4wzuh13gt5mkwyd29m7wtavz4eli4wd2t01i52vuiz3zt8juhyevg901roe4hdm19e82577sonv1wtkpprpw680adi072821q1esn3n5kstndxl69g8nzjg1bhp89uiyq7h27mjauu8x8uwm21ewk7j3ppxqagltkg1nh3hpwnx0sy5x13xqg7fnrcls6gfvrrtpslqmwz1w1littjhc2qxn06as1mraus3dyp48oc753se',
                        mime: 'gcha19vp8vyl2scmh8s8gplvsgeit428nfakvzb2lmg10gspgy',
                        extension: 'hded1d1d8kb9gkjc0ax0gga9zvty3xsw11zh6es6375y9z2xan',
                        size: 1032901699,
                        width: 162414,
                        height: 268869,
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

    test(`/GraphQL adminUpdateAttachmentLibrary`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc',
                        name: 'x4mcwo2qwho9py8cznvas8ynxvqgd33wbzgq17pq9k7id5a5y0gusgy2unuku5mjjwwxs8hfofwptu47m2t1hkjgvf6vykowo8xuxj0ozgil8j66hw5vunrb5rtdbk8chkyf9senzk2wloont3fg46vmktcc8p4xun1udiv49l40grcnje69ohabvx2ffgzls75aa2y2mcrif8rw0qnbsxha96thc5mkia9j4m1x3c2taj49oi945xlnzjh5dp8',
                        pathname: '8jae4cuhrjkxt8sav3ax3h2x10p4xknj3amc2mvgsg0ux4odgcm4adfqq2bevyn8p2a3tm090d0x8njylx4qy7b97rns5hivpt4m1oteimyojzqw4i1zx2ioy991tg567glihilwr8bzacty3z9t2w8347xwsyhc8bvjeuvl7l6wudbytff669thpc82777pdp7v93salm6al0yzygo893i9nwkes8jw2gtlihxlo1v8f3hw38uyb8j1jdao6bq9bobskpfqqajr47j9mzuov448neibq776wvdhxmmdf07jn5sl55dbtemuzjnvijh9z51ek534anjfrhugziu0dqvhr15hke4y6fe3c7gogja8viv2aesqbpwsfyalbw5m0ztmqktut26blnz4x88fxnho07844vdkvtdvtts62zp3bvsws3aesf58smnbfeam6kluk2ltjo0nj31r8t60gi1msc2qjbbymcytkhg7hgh61d1csxy9mrve3hp2tngxwuvpnijs6m6cj436ufcigdnac7x82enkv2qtoad8jezac457ct2asrpcw6lemkm9fjzpis1gm7613rseqebfqhkb01gskisrzvh8fljlt9si849dtcqd63bqngztspfp0p4gdle5edbdtgopcctu60052605ncyg51r2c0ut98m213p2npgcgnjdy8euwajwopb8v090ii4yezkgd32qwjaktte8coucrahfikw2yf9yrw1xepg9k29qscuauqb8iii0g9a8peopbifnmhiu1ba8twtp1e1b1sq2etbt5d9bpt4arnhzjw8w9n1jpf7262xj1c25k7hi8flxxhh5fw7anxk1c85ipclbzf4u2voo24f3o91hku1xzwzdoq6xdqvlbda2sld3spnvvs5bxogodfj41uvbewo4qryv0keimqj2n8kkj3p69szkzq82m20oumk9oecak27zcglnciy8o6ib7usoooeme6beg4iako2j4k2cuy03inhq1q6d',
                        filename: 'whsr9hcfppvrie77e799p7299hzfu2w1hr37o8m9qyrlaw0ciapsh7dbg0xyc3ks3770jrnk8vr861m0xl5c7inm66orr41det2kax3gm4t8fqdcoa89ly6rlxa89o36jcvgj3s05k09lh0xrop2c93z5f6gm1awiimopttv0ewa0e9jxiqd4xdss4zx8po0pkln50h5ggyd7f4oftybjq5l4o9ahs9h4c09f3oaojtz9b9s8mj38uia4vgjqll',
                        url: 'spz12146l3oc08p2h14lvzhtwbegkn21qvdjnasf7h7564jmpeujkdqs8iiiwevrpxcl485aezlfq63wgki217mzpo7nvzzkjwmwyg6tzsr8yvexqcjlp7awjh2sbhfs8qeceezkrzcqakutfpbzdbtai192czrqzjvn6qy1fra2plwx7y4p8mbpbjqlzej9rzj1aqe5va356cf52c3tmah7phkmu7x7165ts2cwhmu0wozzho63up7tlm9gdbkb4ue2qlnguzkgn56zfvn1ehou9alpcl0l2wuueevk3054zb1qcib4y0fy9ycis0nolwqk0qeb06mmsiwv6bfynnachk9q2yscsh0riov9q39rtrvfd2idh5bavwnwx5h2aep2gcwnhqorvnu53421k25d9vm6il3jaaqhecsxcxoxfm0un274y9j4arfsbrm5fwamhma8pol72iftvnhkdj7n2bb0xonfcj6p3l2jlkkimo65g1rohlfvblq7u3bypm8jzmxca8o5thdz7hll1womyo1dm1zho0yrdzgtgiwns2dt6c6frdnmjce5k6mtkks8xtdnq3gqu3wnnluz5p5qor36r9xwuuhytcyu3tpygvcr9gtdnbtan0s0zr7yhgkvtznhedrw526loh0ir6oo5qajp0vs9o159ekj3j8w7fek2kikaoit1bacl2cke7u22zir7ej251e6wty4h024d0v9up5m261wp4in5e7j3glc76035uc15fzgevgfdi5ey24ixs882zbp82r92sl800osqqy7zorthun1zyiwh59c7d7myvg64xug2rhvzmsf19ap8hka5si54ym3xwpgkilcg8qll5s0z191d7bnyxae699q3rfnii7yeimx9jds2tol65svj8xt38pmrrbh85ap6p5aatnj2angsvd6kl03q284zpa24nu1w9d0goyhvffbhz2a2tomz5u83da7s49wgfxgl908l71924bcb263vs5b5fl1635lwesi',
                        mime: 'fyqxgvsl1ch70jr5oa95ndh9657n7gw7sfg9jqf1vo0m64pw1n',
                        extension: '53b3ork89fshse5gkwl2tgt8mc6bud7w8dlc4ur0qj7pycw4zm',
                        size: 5102599979,
                        width: 499263,
                        height: 313499,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentLibrary.id).toStrictEqual('a246ab6f-c46f-4547-94e9-88859b6a37bc');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '800a108b-0ca3-4a98-acbb-4551cc03c0e1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {   
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a246ab6f-c46f-4547-94e9-88859b6a37bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentLibraryById.id).toStrictEqual('a246ab6f-c46f-4547-94e9-88859b6a37bc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});