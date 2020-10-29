import { BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment-timezone';

export function timezoneMiddleware(req: Request, res: Response, next: Function)
{
    if (req.header('X-Timezone'))
    {
        if (!moment.tz.zone(req.header('X-Timezone'))) throw new BadRequestException(`X-Timezone header has an incorrect value: ${req.header('X-Timezone')}`);

        // overwrite timezone that will be return the dates data
        moment.tz.setDefault(req.header('X-Timezone'));
    }
    else
    {
        // overwrite timezone that will be return the dates data
        moment.tz.setDefault(process.env.TZ);
    }
    next();
};
