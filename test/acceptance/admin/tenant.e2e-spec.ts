import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ITenantRepository } from '@hades/admin/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/admin/tenant/infrastructure/mock/mock-tenant.repository';
import { AppModule } from './../../../src/app.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { config } from 'process';

describe('tenant', () => 
{
    let app: INestApplication;
    let repository: MockTenantRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
            })
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);

        await app.init();
    });

    it(`/REST:POST admin/tenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'w34yfr1wreww2eoypk5cvgomf2ilmh4wpqhf35g55l0mm3xf9mlx77co4z0orto3zk65exglte63tvgql2dq71y4459jq0ep6e6xbsc8mbmlwuaiqwvnutosmzhc8dztyr76fi2mxgdgf97tsejhae8cilvuv3zssk0fa0nq3vacu40akeha0fi9ybtlu2o0dq8du95n3gfa0wdcqbjfu3973tmp5jwg6ipsjjvz8lid7g63txcv3txs7zrarsg',
                code: '8f1a5sdoodsd1iq31pyt7deeisp4ejvmkcph6g1hg8wc1wv1z0',
                logo: 'bcw9hkvj2oj2m5v1c103ltcyevrilgy60wogbetg3627e3jfqfh71v8z9t9pzzoqseczhaxhj1btr5ivuf2zxtuwcpuxv8vqp9uwjhtcy7nhp0em6154n0kokbkwx65nf3fnlcfqdamuwremgkaoe55pex527d1i60z03jsvz24ddn52rplqwkevw52zdq65g4j41jefyv1wq6l15y6usutas5isllfpldrnbe0d8fc3sesxuarpkrnx03vib7q',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                
                name: '2i2kmgl5h971n826dbbac0li4du97a1j0pz1mg3pq060m29lcup7f7bweoqjqxzdhp5a1vxm5giyfl8p0jndd3ks9fvh5oebu9uzpfnxpbkcor75naic1glrqvuz92sibq8z41doexyp1opjav90hsruc0c7xjgwx8my9aqop1wobuyazby59v4l1c35emp8tydr9tyldk5d7xwgqi4aghdu8ddmickcm0s1r06b0zxwa7aamsfarmosg4zsmr5',
                code: '6j7ntkd5aqfgkojm8ga0natvrlij7pgqoyo3mhytyhm95ezgai',
                logo: '2nfzglu64zj00obb5hjzgnhhrjugqk7jfctlizq6iq7rtf0bf0bjpl60aobcbms7sjwrbck6oszmm4hok69zlp87e9h7ef6pc9o2d3oashs8or60ssa129s88zfqozc1fakkmu0wbboajfccs7kllkz4bkgse1oyvh98auk6nlig9mu8pqxb0n2n8outi3w06fgpqqg9laeyzvpy8padtmtwktarjjcma74tr02drgmiy94jkxuuda586tiqlnx',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: null,
                code: 'dtelm30qr6krbttsfkxe7l9l5z3nscbwewlf2gu9s80v15h6gt',
                logo: 'rxk9zvbknqs50zmw5omt0fa31s93ixf7klyu9zhuiol9wsqfuz8wnrmf27g172qzfn47dsd7h816nhj1i557ecr51idnb5ino59kzy7d2y5x56t8qxhis60gjob7c8nkwl6qvbmbm2s8xp2nw3b443seyn3oeb8at7fsw1avbsj22um8m8i9atqz8yq6gzjkcmb9qrkbl1s2irlffjyxibp4l9nys49ib3rbi66ku8hyd9ly1j1ag6ya2nn3mzw',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                
                code: 'n34linms6pfw2etwla7afp9ex4dwk6xbjoc339yu6w8197wqcw',
                logo: 'buo0k9wrckf87vlwavwmegxeut6g729dl2k0s7kcuvmo2zqscjig8ure404plr14ozkejokg9126804i5bbr42cq0g2uk10130sbh7l5lc6umvjlzqr2cuqyrp10pxcgo3ccxhfc168zoysagznnn9rxgwsxqhp18kdqe5fbuqz1suawji2h4uq4sf6xq2gpaqjswlx7fz4jq4x5v6wwnz1t0sb1liol3hi8b1e4o6r4jj79k5p486lameglw42',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: 'hs0zxnnxq8eq0yvf24dptbi9k4p9kirnxdgecldu8y3xuhes3ugabbd6lw4xen65ces24hoz2zogu8adg7sjb83bqpzfteetda44vfb3ad0m8g0ozjqzki94ab9ynhwt9jxy6pwhe1zewm6gqcbueafsz4slvgq9dul6z5d4rksgizrcvnm92tetl5lxwoipzpy2tsdkdo1g8z9ciqb4nrycxjqs5frjfkybx28odf9g80yfb51hvf8p3pgj3zn',
                code: null,
                logo: 'x1rwiaz0sgstqd8s8d69f9iyvfz91ui6ughyvk6trj7tavokwsl58gz77xe7xvo4gbeuwvlbxvj4ksqd1uz7y3fy5ipasdy4coyiu73ol3okmy6ck1zuv3yw77dka86udq23k5fqtswqdaxc0snkqpyqg7uem68b9u8m4gf00b9hqh5768v73jxjrxl9qcyiwxchwqv7qkqs5gg9dnnvoo3k17rfd9jhdny3gve460zhrgf85xuxrrd27gaemb9',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: 'pfbd6rbc2cbd87nhtoinuo83qg0rb06bk6bquoqiltasqqcnn8cfmfpn65vf6e9zwz2556ytexdflczj5s0lh1g5kgjvb0xn2aapex6sng2j29bwgbf282o2z3xo9h71ezcqnmkh6z7q2htx98ao4kzz9mv1ng942fd0ptf93t1xrdcrv7f8dxsbhb6oy3whmh1c2w4qwetw2ea24ahwlmojgtydz38tu2samvt9rknrmdhww2y88il921v58rj',
                
                logo: 'i9twljaca9797zo4qohqmznywafytir6w827b7lhhrhhcrux5mrpjb1971cgs8qv6nyesaald7v4bh055nxuvetleni19ea84vr7fo80a0v0zmv0nq071zpm7qh3di49d06t28zdmidhrh587062wldh75ns474yx8zp044kq9h25qgi3oys4g08gak3l90ww96914pel4tmangl95pg0ohgr8a2wp5vijlx8znejj1rp7ph2fpu2ivo5dfln63',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: 'otp51hihy88zoiov8bmqgueqpqgd7jhoh43bqw7qpmhisqzdz25xdmolnx64rwh2yyzfl79j9270tmo42awrx51bz2br3y91dguprdscwz2i4hou3ruusulwkaa56y57upe7pf8fylii5h82hepahcogzmlppvt7f1zkqezvs7u07kx1tc6weleu5ogtlytvtrn473j4ls9avrkwqggn47ztsmohp3byw5hi51kqskhi78xn3ogrolh5kowhs7b',
                code: 'o6ei6fuupqv2ngv3vhdzxqo24rbw8de93orouufh6nz31yo2en',
                logo: 'o192tkls4smqorwcbi7cbsmqosfbseamvjqk9jfef0w1kd819tjjkcjkrwjaauxx59yob4l5zaofcrk3t3mnn61rc5croiplcdm2xkioszr0hsyj71pd507z5v1j0dk42bullnd9ic0r3lkz93e5aclvtla3wiftowb3hgqe9keax214o7utogzg8dzono1r8eeyeqpk4gmtidlpf61x1w2mj7wu83y9o1tqyit9grdppcyu1y5nz6aakihfx4y',
                isActive: null,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: '3ypeggm9h961gz1baoaegntlhj4oebaacua6iorbllrqperihh5rnwkua59xzu0yrqecqht21eim608qbvqqem0q69itz5s7uusc0qf5fei36whl29gtftlfswkwux6gjwmvul4ffqk0q4wwuvg5kjc40cb84xsgz9eec9x7eq9fgnne7f5p70jnft5lpctnp9ykd9vez9m5cljr20szhnr9ziuotz7kiyab4nsn2lg8bgzfxdhbbfchq0pmwxk',
                code: 'ch5x10ourtpud2a6qdqlqwk4jo77u0g50eu0uewrx0m15ay189',
                logo: '6zr3oytzruvhnmleqpocxdwehhuq6mkzttds8mh9szueic34g32x80bf1935txhcqs7pu296xocrxfglsb6vgk2s5v1fpdlg5mbvlccmxy28x8c8expkk2gt71tmjzexvuk00kqz06676e4irr1kasldjmbt9cp73u1eutk012wd0n9jmthyvsmp51j3lktntlgwu2oo8chbyahofix9eyefkr214pvjwgvbb0scrkd6c20giymqvukrglzk5lv',
                
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'c9klcd8m1v25kb5h0mfe6331jh5273qvshlqd',
                name: 'ms322r7uk4va361i5jwa35ci4l8sfzwegjesowh3pncw3jebbihs30rnuw2tuym6nkts0nv996gywvm1oc1uvrls8rxtkl0lihr5kt0wxn3szphnrnsytr1ce42ea3pxr4os7oqyxr4wibks2bgmif5cphx4aw5idgbaqddmog0abclmwtjpx4bxk4l7d5z1sk8qefzita4kycz8eul4ps5n3vlfcb4heg8a5qh0a156p5arnb19f2kmrb20vh1',
                code: '9u9msisywhtefesqjapxoyor7u4qnn416ckzlu1qk7bu4swih5',
                logo: 'qsg7wyltrzzk1yb9nr59cfejkjlp18avqva9untn4un1m8rygrkv2e5r7pavjw1s8gsrbmv6bgl253bryuey0c71x4ucm9k7ockn3704iytkbnz6zvt6jpepecjqioy4m40y43m57l4p6uakpiu2k7xnnhd4gy803v9h1o3vg3eh83zei65512i7wfjkamnmw74bctqggnvcoke4ym1asksdyv1vyox361hlo9k703pqa51gb1rge1yjwo9ipb8',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: '6vnpvcm369xq4mi8k06t9pbahc3u5uvxjnrl26d3va5ve02xo3nnoytb6b85y7fi78erb11lvzvs5wkq6frlyq6mdvx1b3c5m6bjfoql0fkg6iivc51nnm924jpc9y65czchivddvaevys4xwgusdb9xzycxqthlsizfz1ma396iiuuf65yoxdbz7zyarx3amosl82be0zbr0wvcyrw74qx1uy6vct046x8kfi62x5qcd6jksjkql6znhvb0yjkf',
                code: 'zmgxh86hga9x1aniejv5ee3u3nmtfo8ekp0ppkqeux3xqv3zn7',
                logo: '2oerfkxh543z4j1erw3blmziyr9pao0gnvas3faj7wsnrp1u1eha1ukbluagpbytsh4462dhxtes31ipevylxqdly5r9i1ya40cm53yt3swex3gx8rn27w1p062b7jeh1hjgmmh3et86ixc8n9qqrinlmtsci9br47cigauqcli8qitwy1uovvirk68hxjfmtbqjmqwlqgvs998mwq9p1fsouqpuh554wcg5j0pwfb1tsuf7affvtylpj4k506l',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: '54isve2d6nnf9o0w3610ph8n5kk1jqjo5get8ty723ufgcn1sjxe7anona2j3odavv6g2j9zzfgxu4kfo361xkdn1tlnzxxsv910rckx8jigclu1t5zmclh625yoiyqwq6uwzcibceieqbf935pnihesqsomgoraonuzjxqjs0ih4dtvlbok22xh36bp5of4i0x3bg1byumnx513j6x060xpzegd3g9nhgfz5v34ax4pfo1ec96tkbz3j0ysgvw',
                code: 'iwcnqzxefde61ab7hswgpio846da23uh9ykz506ve5bzx6ulkxd',
                logo: 'stlk5hanvku317dhf6aol6e4lfqnzfjx5o4lpr0192kros2cb8n65w0v047361r9ukb80dl9w0i810zc0s76ypdggj0y4vpz6kz2gtby3khvrbcq74xskbenro835s38c49uyk3slr8haxqkjq0pvqoksh6pttwhco5u8c7hu2orbcq2x7bl7i15czygoxg9azg3lzeaym37f12s8svotf83vdzhao2womuz4j8cz144ounk6exsaxgj9xgvk0j',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });
    
    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: 'qpweezrjzsevx3hjsb9t6am4lbc5cfg0m4n5baasc06oxu0i8pixd4hhthmcs8oyhhddd6n06o2flmiolyl47rbnksgtk571gxpqb7bdoo719r21dh62jz3hzcy2l60zl7b53dha16vctchrb2njwqtuhpottxwwne3wf3u2cmna0yqh9eznhobn0dn44mapng3pboytjbufj5bgrow1q7mp562ojiorneid8475rnescx2g6474s1gxljvzsya',
                code: 'ut44jy17wcfe9cwulq9vxiisvi2xw1os855p07na4jk2xg1na2',
                logo: '1clpsympl47h9ux9d6oh02nsstunn1il830i1xfgkxut3of1wh7xmeqn8h73ahxj3v6kqc1fvtx4nq089gcy1a3qp442m6ybs7p0gobit3n84lszz3zpom1prtrol22olx5tuuc9od3pt8a7n5vln1hta3ofbyhgsnkm8ycogfwdl5jhqwmu8usgdtwmxtt9082ot97r3750qanu6iesv71c396u7u0ty5v2pm11l9aeb5sv6jhicb2t9kakz5zj',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });
    

    

    

    
    it(`/REST:POST admin/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: '0ghvjb1l2xty3a3i9izjp25x16assh0znwt6nlw3hss6508wlphm5fwm3txeo7m9izntumy42z4gwuhfukomy55y64iewfbvdeqv3ntwqk7zy3hyqfh32f6fiq6mau065zvsdfni5x4j2fty99g80a7j1lp7db63b8ma0gn29lu24n0phbhqeqrq8bmnnwfadnpduppdg5b55hwhdjg1zr5fj0z7pr6swi8x0g6eo8i7axi5yhghy8mvmyaasga',
                code: 'mllzx0peqsqke9t7gadstahzcxhe7ds2bxwd73x6al2m8vq61t',
                logo: 'tbr5hqh3vo31bgbxbrg61p051fke16is7qvqbvwzm3a816nhhmpe55utksnsdsgt7ml8awmhs9lscvimi6uusabt9sbq8jithgrhvzf3tc4l9b7fkbxzlt39bs0ju49bsbgicwpoybzydcf8fo0mwqh9hy80wru4nr612sv84o5hrgxxrtvdp3v0vj8z9eq3q1lhjrncepkxii56rny6fn4v7dwtjpm6qnfp7blpfccvbbx3482tgi2cugaugvn',
                isActive: 'true',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });
    

    

    it(`/REST:POST admin/tenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: 'qp32z325slyrivbyz8r0fw1ha3uftrm4ybnw4asrdm8qojd7runec951pp61vllx4wdamsisxmi3ysjk43s4oq0hw143e23376jruovsf0iodbbgwsjia3j4y0ulx4eqwt2gv96u6usn1enansiyzw2elvww0730a6cw0xl42nmd1dtbdx067sz7wrr4vn5n1hpj4c5jxccnt6tt66bzy4ai9uf8eyjtk3oelw31ymqzkjwez5lwq8wh6s6kmp8',
                code: '217q95akfsp2gb8e6eel51qjwj70e5n9phnuniscaosu2mnjdf',
                logo: 'thcg683uwlof8msw2ncmdejozn4djb794tjkcnpph43doel9rrhquwt3v6q670cjsyef9oyzok9727vqqtmzik6qj2m4cia5ynfp5hafacuhcyrcirg2nwqc5zhkso0rkndwy03n2inpzxdtkjjh9a2kew1bweoj6gg9s4wcwdtbxadgavrshnknm7tkxhdhq998fuc22bkanb66q52t45idfgrvdbyneai1jugpbzyynci9gkukmgbi1d2v32a',
                isActive: true,
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    it(`/REST:GET admin/tenants/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenants/paginate')
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

    it(`/REST:GET admin/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant')
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

    it(`/REST:GET admin/tenant`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '6e243e17-899f-42a2-8d0d-86cef1c96469'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6e243e17-899f-42a2-8d0d-86cef1c96469'));
    });

    it(`/REST:GET admin/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenant/6e243e17-899f-42a2-8d0d-86cef1c96469')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6e243e17-899f-42a2-8d0d-86cef1c96469'));
    });

    it(`/REST:GET admin/tenants`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/tenants')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd781f39c-6c75-48ac-bdc5-603a345d86c9',
                name: 'jnd92a5mnxqc3gr7gl5hgjp78uf3dflw4km70f0ailt0v2xmjya1p5d8d8swk5ynra93qjkz63kfi6z5tt62ybjbfse67osaxwwarmxkzwivkd7jtfu3x1q0oqwr074r0cgijnpy7onyyycrkcqrgw38hhdjk90upnsj0hlasm3xuwci51r9p9fqupljjp59s4w672o2mj6u2q241o50labnz49mpvrclgxmrw3h8i4nxksedf5qyvk6p743vin',
                code: 'fg5xcxv1gofoa7n5ztc77zof1jodrhfjus6snna9swi0q8ztfk',
                logo: 'w4ocisyypkbnd5y9vusp5cvuixctrs48xihttxzujvgarq5hs0rbob499espq129j0st4jesm6tnnuq7cw7m4woh1urid59zoresgag2gelnekrae9noe52l6p6s6icsv6wx81p163l2729mgvvsskdm69zaydf12wuz7hz7edcsr4z1w9rkd9lo2lyzxe6ir4hb4tt7bevzlpue940pk6ttcepv4cbi9asewk8kaojc0pifuf0fzgi84b41ru3',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    it(`/REST:PUT admin/tenant`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                name: 'eujn6im001v4fc9s1rwt36icn0suonr5owxeqiaodthee65r89l7ewglz0na3ayd6z4f8hdh8c1580zyl5ueb4v9vvhqb51k2rjqv83idzq5529yzoaiqgh8lf4ia96o9gttuwbobcr8kfhzb05lvchs1vky5ahgr1vu8f8ellemutd0knfbkunobhe2dx79hoserzwy6h12acning6auqk0mz5cgk2slip618snbdh5z7lx8pz97wfh799tpvf',
                code: 'c35ykzz18s3ggn42abdh26fkv7keyc8qy0ugl77wdhwxud3gx6',
                logo: 'pmixoeyzokvpaq6lgraenv09werh6sgn42eizazwaf3mmr2hnr8qnofxnwftb2deh2ivpcm736k5rh3o40tb4rqewm0xd4bde2dkyu1m6cdz0rhsg0zeetk66xvm5g41r8rrnq6n2ktcy7r58vaqt455at0nztvszsnnd9lds443tczaal6nrutf0725e131mjlccd6ajj9we89989w6vsaoeyf0ce5q5w8u02loeycxisrqnkouryij3d3ii5q',
                isActive: false,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6e243e17-899f-42a2-8d0d-86cef1c96469'));
    });

    it(`/REST:DELETE admin/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/tenant/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/tenant/6e243e17-899f-42a2-8d0d-86cef1c96469')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreateTenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateTenantInput!)
                    {
                        adminCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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

    it(`/GraphQL adminCreateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateTenantInput!)
                    {
                        adminCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '53645e2d-8b5f-4eae-bf0f-eddefa70f9c0',
                        name: '1wieus9k8abdbpyzy12xt4gx0dvdh6xat19zcru2kjw6ev86up38j2u3yhulehju997jqmyad93v6v6s6jehgc6xktzocfpetnpn5xzbvsbysspmbdy37rizjbkylrkxpb30h1vxtqfb1tk7n9kdz113jhf2dlwhdsgnwznpaeyt62ni4pzwow8iqc1hhy8uj02gc9h0znrums8hrjz2qx274hvvogo4kx1dl56q0s2fyjm0xyc0cwgpnrmwoup',
                        code: '1679bxgpbugkikhbypg1n86o8r5ahyjdd2xqfedli30u68m9te',
                        logo: '3hghy02jklwpbqxe9ja0yynjxwnu8qrzo8kag7l63rtk2zex477xuqxkr2ytb8n9ti8ypfxdmtbrnynsf3lez74hp9v4lumpfwezertb9chzn9pp64vo4rf0mjkpjxgaixrf50vmzbp1bx6qn842nmi42tez24h5lf9wicj3jqfkpk5ez5y55co439r59blo463lw3vjdnqlhedvx7r8qhoillcri0mle1mm052eeh3sblb9agy11bamubg79sy',
                        isActive: false,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateTenant).toHaveProperty('id', '53645e2d-8b5f-4eae-bf0f-eddefa70f9c0');
            });
    });

    it(`/GraphQL adminPaginateTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateTenants.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateTenants.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateTenants.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL adminFindTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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

    it(`/GraphQL adminFindTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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
                            value   : '6e243e17-899f-42a2-8d0d-86cef1c96469'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindTenant.id).toStrictEqual('6e243e17-899f-42a2-8d0d-86cef1c96469');
            });
    });

    it(`/GraphQL adminFindTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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

    it(`/GraphQL adminFindTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6e243e17-899f-42a2-8d0d-86cef1c96469'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindTenantById.id).toStrictEqual('6e243e17-899f-42a2-8d0d-86cef1c96469');
            });
    });

    it(`/GraphQL adminGetTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetTenants (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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
                for (const [index, value] of res.body.data.adminGetTenants.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL adminUpdateTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateTenantInput!)
                    {
                        adminUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '92aa4008-638e-4cd3-9216-cc168df00c04',
                        name: 'wmtv6jmo84iqnqz0pg4trm14kzdywvkgcbr7c2kwktjeq7kiz2arv5dfmjpwow11e62j0cperlwp11l3przgr0xdp2nk2w3y6r6tzj2hx0v5t0931cx47z2dx88bs2qrs6myaz64o51dy0q0lubkj1awkxy5do4y7jvwwrmdo0w12g5b9oa7drypszz5aq5a9irdjj33nrxm528zu57y015qpgtbmpwumf64zhs6ds54x2rq35gjq4nymj5aa3x',
                        code: 'dapdoql7mgbky92ivjqnyczpn2g2ggzep705e1zfn3npi7wxmr',
                        logo: 'juxn9lobhkhyt6lraxvf2qgmpzcuaz3huaq1x5v72yqxpltgq5xj6wrhn7meq52ctjqcqcywcr2nz8fuas8trhf5806zftyosemr5n49kczhczjpufk1nf4somoqbowmlaoo778x5lzi6va5o40hgy5ndobel9ubtw5poyzvds6w2asvr0r58x54uddhac6eiw5x9y4snz0odvshzfxhzuhdmkkd84lee6czusorotonao0qseipilm30sxd7mk',
                        isActive: false,
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

    it(`/GraphQL adminUpdateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateTenantInput!)
                    {
                        adminUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6e243e17-899f-42a2-8d0d-86cef1c96469',
                        name: '5n3c0zrqoqzkni0ir1rfqbdu9xtfrq45hr1otzhxyi250sec2pocv78jnqwn00sgo3ncish2j0durn6xf9jwvuk75nplqfem3qnyhafz2s9sjzqrgvtcd7773b1liuuwnl4vcqyejfclkxa98vz6mlzxnre2z2avf73htalyqv8rbt4ykaoufe67if8xf3l8rqvjufdstw6p8myefzxxvf6k0n19mvjwcys6selwj41bniupj0377ubgtjke0wh',
                        code: 'rbrvgi6go2n06vxs1qv9tv0tbmaz18ocy6ekxuvneyoag1801c',
                        logo: 'e530aqu0g3f3vojcz82eo57pjh1p1eki9gbj0p12zm8r1azwmn1rob3i9iqjhztlqhftomfdhkeq9qosczhqjku3upau0tajzu97ceel6xiepyjs2pqe2as75hheotvfmyk0uy3owq3oijo2i9f5bsqv4fyck9lgubcrqr8klihl7vj44lrka8u4f2t1bdwrtd0fbtn3jl5b2hjdaxtw4reoc8qyftd5fl83yo06fih1k9ef488wonxxfpzrmgp',
                        isActive: false,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateTenant.id).toStrictEqual('6e243e17-899f-42a2-8d0d-86cef1c96469');
            });
    });

    it(`/GraphQL adminDeleteTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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

    it(`/GraphQL adminDeleteTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6e243e17-899f-42a2-8d0d-86cef1c96469'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteTenantById.id).toStrictEqual('6e243e17-899f-42a2-8d0d-86cef1c96469');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});