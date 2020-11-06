import * as moment from 'moment-timezone';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Moment } from 'moment';
import { v4 as uuidv4 } from 'uuid';
declare const Buffer: any;

export class Utils
{
    public static now(): Moment
    {
        return moment();
    }

    public static nowTimestamp(): string
    {
        return moment().format('YYYY-MM-DD H:mm:ss');
    }

    public static sha1(data: string): string
    {
        const generator = crypto.createHash('sha1');
        generator.update(data);

        return generator.digest('hex');
    }

    public static base64Encode(data: string): string
    {
        return Buffer.from(data).toString('base64');
    }

    public static base64Decode(data: string): string
    {
        return Buffer.from(data, 'base64').toString('utf-8')
    }

    // map deeply object keys
    public static deepMapKeys(obj, fn): Object
    {
        return Array.isArray(obj)
            ? obj.map(val => Utils.deepMapKeys(val, fn))
            : typeof obj === 'object'
                ? Object.keys(obj).reduce((acc, current) => {
                    const key = fn(current);
                    const val = obj[current];
                    acc[key] = val !== null && typeof val === 'object' ? Utils.deepMapKeys(val, fn) : val;
                    return acc;
                }, {})
                : obj;
    }

    public static deepMapValues(obj, fn: Function): Object
    {
        if (Array.isArray(obj)) {
            return obj.map(function(val, key) {
                return (typeof val === 'object') ? Utils.deepMapValues(val, fn) : fn(val, key);
            });
        } else if (typeof obj === 'object') {
            const res = {};
            for (var key in obj) {
                var val = obj[key];
                if (typeof val === 'object') {
                    res[key] = Utils.deepMapValues(val, fn);
                } else {
                    res[key] = fn(val, key);
                }
            }
            return res;
        } else {
            return obj;
        }
    }

    public static hash(password: string, saltRounds: number = 10): string
    {
        return bcrypt.hashSync(password, saltRounds);
    }

    public static uuid(): string
    {
        return uuidv4();
    }
}