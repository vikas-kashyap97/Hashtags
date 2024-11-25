/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.ScheduleRuleInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).scheduleRule.createMany(input as any))),

        create: procedure.input($Schema.ScheduleRuleInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).scheduleRule.create(input as any))),

        deleteMany: procedure.input($Schema.ScheduleRuleInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).scheduleRule.deleteMany(input as any))),

        delete: procedure.input($Schema.ScheduleRuleInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).scheduleRule.delete(input as any))),

        findFirst: procedure.input($Schema.ScheduleRuleInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).scheduleRule.findFirst(input as any))),

        findMany: procedure.input($Schema.ScheduleRuleInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).scheduleRule.findMany(input as any))),

        findUnique: procedure.input($Schema.ScheduleRuleInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).scheduleRule.findUnique(input as any))),

        updateMany: procedure.input($Schema.ScheduleRuleInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).scheduleRule.updateMany(input as any))),

        update: procedure.input($Schema.ScheduleRuleInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).scheduleRule.update(input as any))),

        count: procedure.input($Schema.ScheduleRuleInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).scheduleRule.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ScheduleRuleCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ScheduleRuleCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ScheduleRuleCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ScheduleRuleCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ScheduleRuleCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ScheduleRuleCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ScheduleRuleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ScheduleRuleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ScheduleRuleCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ScheduleRuleCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ScheduleRuleGetPayload<T>, Context>) => Promise<Prisma.ScheduleRuleGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ScheduleRuleDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ScheduleRuleDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ScheduleRuleDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ScheduleRuleDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ScheduleRuleDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ScheduleRuleDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ScheduleRuleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ScheduleRuleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ScheduleRuleDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ScheduleRuleDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ScheduleRuleGetPayload<T>, Context>) => Promise<Prisma.ScheduleRuleGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ScheduleRuleFindFirstArgs, TData = Prisma.ScheduleRuleGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ScheduleRuleFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ScheduleRuleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ScheduleRuleFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ScheduleRuleFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ScheduleRuleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ScheduleRuleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ScheduleRuleFindManyArgs, TData = Array<Prisma.ScheduleRuleGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ScheduleRuleFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ScheduleRuleGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ScheduleRuleFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ScheduleRuleFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ScheduleRuleGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ScheduleRuleGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ScheduleRuleFindUniqueArgs, TData = Prisma.ScheduleRuleGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ScheduleRuleFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ScheduleRuleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ScheduleRuleFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ScheduleRuleFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ScheduleRuleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ScheduleRuleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ScheduleRuleUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ScheduleRuleUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ScheduleRuleUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ScheduleRuleUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ScheduleRuleUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ScheduleRuleUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ScheduleRuleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ScheduleRuleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ScheduleRuleUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ScheduleRuleUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ScheduleRuleGetPayload<T>, Context>) => Promise<Prisma.ScheduleRuleGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ScheduleRuleCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ScheduleRuleCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ScheduleRuleCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ScheduleRuleCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ScheduleRuleCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ScheduleRuleCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ScheduleRuleCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ScheduleRuleCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
