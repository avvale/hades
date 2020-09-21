import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0176a877-aaae-4d56-81c9-6ce61f569e60'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'PASSWORD_GRANT',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'nmj2dqnst0f3o3s43p8vth9k02gnekyaca5gv19pa92caaw8cpvq8alca8sic8ulca5cmf8s20vmq9wkc5jthwzypwg81dx30pi2362dlbfejiy5uhgljrdoynjwro12064btjvhwo5fte5g1a3wpp97nm4tjdvkau0rei07vfnjy7hv11syod3hy28okq5yjt2imnbpkjgosbrebz475ugl93u261341hleyyuo7hzxndlz3xlki579gwq3fcx'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'ln0lj07j3v7nin9oa7bdrc4e67ttafovknkwbts0qqivxbd2k4i6zyya9e7fqk1w15prerlisypy6rxhdzyjw1rkaq'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'ocm5lk3dm1srgclvgn219d4irztq927xudlzh6iu0r63pxscsqevh2zkuo82og5t8iqvq0jztbbx5wnk6awljhsajfjgbisanbbywbicjp00ucx3wnerjcv19d6su2cxh5zvvnb1onhtsjzbled0p5sc1cbnighvbqvschi6fz5c0c1jw8tjjjxng1j456lwjlnckaftezxe972l2d3kkvjza2x8gdbkl9wndsi9vs8gzgn2e0ytir9931g50l0o2d6y6p5a94fj5harz3f8qo1c3q36d3q92ff91jh6hq3g1y1jglvef9daxaoav075cq4n81s6gfnv0kh0wgn3eq96mhm8ohj9xu5b75nakqyhfmds473zb5wwq23zs7a7gdy8b9cwg3jbjzhvupgb0kqwkm6vuioq38u78jehbpjw4j6u1bc5ag2c25w4dhgcds8gzso3jqv4dsfdh8rfk7l79v31ypzyzc646ejkmntxs9z72wtydl196l0zeh4c19y77dyixa42up5q4zoox7ogy2ygw58fweik6ukj7apcopj2odtt2g2k51vtjsqs0ijwiefl92rz6q839p4no5o6ydbi2h1wmwq1zs3v1aveed1c8xf8tsvd5j2p4p6m8y7d3xe34i5uq6hwetw7bb3sgtqzlgnu1s3ryakgncdwvcfrconn23tp2749jslcoukzl3gqf83v7bde4nkzxv8cojh8ihnnag404xa3qnapypa848udc8u6m8135qndtbp32zgfo2xtd9befr38lzkvsuhu4czv4mkpkfmdgob1n3x7of0z5gghtj25so54x14sde300modevwjd858tddr6ihpo078tfws3cm6bwyjvz20qkerqy273wkuqykzgod97wf620w4z0itlk2vrlgdb56l6zs7wnqn0dihn9fhkwbkrd9t4fjn93j3mcleo13bkelri3uunaza08w6dbdp1s12k2bugh3ql5vrolaupdpnaq04lm9omx6fmuhgcqa7jinrkemmybxdzwp2cnnljnfilyzju6ccb9p42zbnl7vz71i6wg12rwx5yww3kxi5armdnoh70pbcn6lzd7yemraxycla762fj589vidf970gi12michfdvzaknhg1e8o4lf5mfrspr5llpbw3zswi3xj9qzlurlzt9d7dxsw7asov4f2icsgc83ms5i85y9i2kl472nemza3x8t6q5k0z543btow0n3zqkqsvvezczheadkp2ey4xpr2rjn8n9scii5wg5bigcgan3zodv9x9k64pjlk37rbi8wmfdg2hw6qoofit54hkolp7rileswh8vts2d85w3scetnsy2fnlrfjqqvo4dhuey5myhjijaeg0y94eoe69obagf5xxt2p5ldiizomsm0bgdpxj9yp78dxfq50te1auu8aecth5m1m6x2m35gwu8xo0j9p06lanrc2x8tied2dqd1oo33kbbumh2jdk96vsd18lz8znkknaxdaryhm4egm02oua0tiiel1kvxl7cu6lt8l0e3pqndujksp6a90cfpdqjjtewr6z00lgzng6icy46mh6yg172y7fjd0wbksjrvdv7f1hu3w8d1dt8rkswq00aqk76rotog4datsfyyeasjwnhjqoq6qauu021ftrofx945kvv4qwnj0w2qsex9eekkw2pma9bx3oq5dx181ng641yohoz9ul7l31jkcee6ccs394h0muluyau3j54sfn1tmhanl28mo4sv24ag1ppnxhe5b1086kpl7x9eehz8nfuv9t4tx397ctfj2svpum4xxkz8lphplsp6tcufnrzyeaprbs9y8ibbt5wyg7cqwb0nqa72hqdd63ld8bmd1bqwh7p050fqg8ra9bd1gmfeypslecsencwz6aibjehexco5k34rbo6w0f3dp9yx6qh1rdfc5fg4cyvt09o8kkyljwo5h4whflt5ezpvdt8t83mlhdtcoazmirgd9taz03cc2vr3glol4qjl3txs100ti'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'mtwsyogd1rdfq0wr61zb13xz193ypihtwx0wzu5h5klxur6574ye94fixa36vudfizep204k6d20nxgh9br4q7jk8ujt9spwmvsdigjurvt73y0j1rvvyfn9fa64f11pxpxcwli6ejve0dgzt1d0rrr89y6d9oouf8oef0duj78r99wqu05c8sc7jxhqby0gdriikshv0vitmma9nvydw0eyi4mr36idkv32thrmeun2f44523zl7c3s5caarvlfr9e9dt3bxjv397atyy73scfk7cbxav91dnix03arswi32cnfwjjf0qoiinjpa0j771ezjr1jmc7nih025c6mpwnruwyciuvdiul4yjbh9yqis6bt5veh3ta5h3zvoew14i2l8ih73pshd5yjdmb0tme3jwgtqyv60hrvqzwm1zmmyftgx55le3pk6oev9dz5m6zvo3mv7j9fodeq0lbgcgedbj617x7hpfpcnhmn0kl9dzc7o5t3aptkzuw54p0d7kj3y0rg33l8pf114fhdzdxgbnel30sqfx9a27f4dbasnjmg4xro650188ysztz4hrh9meoxxjr6rfj1fyv9pw96sbqm303s4j4ejeptq5hjxm0ti7gk8yakzzeq27d5f3su75dh69javogoue4hzl8d7zfke79wm2h99zov8iq1ho4ysptp7qp34a48zc5wokdn9gozdi16rl5psydci8yyu17xp9409a8796107of0quwbwripi9qobmdrqxchalmg5efjsm7fz84kpc4rlhp8gicaxsrbqxc2r3dbwtp279temk6i4socrgk8wja76zga3xztu2syku291k5i2kbm2128dugq4cistrlb6qnh27wyj4np7fn5gtyttopom1fwfx6psi13ux506g0t9a63syjmg1jxtziak244rcp3qbzcemuezec9hz0ycwktrhtr736hn8ab1x02vzggb546ptrpika0eypbis7ka8ju5nptlla67s0h4zvzkbh73h3j8rf1vskdeaconfetdfm2hxb3scedq8tz4h0n8nawsmqnx5r18pqtqetciu6il65wg8675fdty9wny5c15dqp20lxxyqqg3w6vv23oanf54f394clt2trh6erkdqy42ytbvhidtukhj2zp6ricgk3u6tmdyumjrs39qu0c1wbvzcu4eye5r2s999v8poaanz9vhcilzg01pclyyb442h0g4orbkqhw5oljipf6fpipz4qctayvj49qh6jcuugra2zsjywx54u4zlxodq084awrucbnd1b57q498fs6ehgdc845efbdod4fg7eja16f2qtmk4y00lo5rltpnx6owo04ex58hb9928dttlf5o2mh9sw61rfpkahgrjhayhi4kozuiqcpekzd7rra8qa0mcn7482w6z11k3vqh3sl9qamm3i6mtaiofg0hq3y42y5ojs08qs83c07oj4i9sig0sdilc4rt26h5u21iwho2ou150ec5s96ymbyn9fmmzjqxmazd631d8b1l8uofzikrex8h4d8vslazd8qv9co33i5dkkslix584rf26qjagzyf4x07n8jf1yewz2x8i7xoa6fmzut2uu8k1nwl9apeclqq83en9laejncoz1xk31m5rlivozgay65rjawvxvcgx8xenv90s26qco65keh3f8g3jmy498oeoiiyr6rjfmjc5y6xruy9jv2p5ct1zvtz79q1wmml0dskrx1vs7f8t11o5f4kb1yfuwxwmt51hxteh4hjaj5j6urf1cav9uf2jc8hzgauldx32nqenqeny0x1dzpid36nkdh3isastzolf04tjtf2wj8h3n5mljgnms9cxden3bupt0gs8kyogp6sc1qfc2thyqokxkldp7cqfvefq3mxb6vne0qv5jf8j22vatie8ddm8l1lr1mqki895scleywgcj48a8bifaw1ttwinc8o1itjaathjx6wif87ts2sy0jc5c6kehzmjrrcn0vydes5uu7s8u3xig'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'resourceCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    resourceCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 9856995077
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 5621890849
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
}
