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

        createMany: procedure.input($Schema.ActivityLogInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).activityLog.createMany(input as any))),

        create: procedure.input($Schema.ActivityLogInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).activityLog.create(input as any))),

        deleteMany: procedure.input($Schema.ActivityLogInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).activityLog.deleteMany(input as any))),

        delete: procedure.input($Schema.ActivityLogInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).activityLog.delete(input as any))),

        findFirst: procedure.input($Schema.ActivityLogInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).activityLog.findFirst(input as any))),

        findMany: procedure.input($Schema.ActivityLogInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).activityLog.findMany(input as any))),

        findUnique: procedure.input($Schema.ActivityLogInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).activityLog.findUnique(input as any))),

        updateMany: procedure.input($Schema.ActivityLogInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).activityLog.updateMany(input as any))),

        update: procedure.input($Schema.ActivityLogInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).activityLog.update(input as any))),

        count: procedure.input($Schema.ActivityLogInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).activityLog.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ActivityLogCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ActivityLogCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ActivityLogCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ActivityLogCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ActivityLogCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ActivityLogCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ActivityLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ActivityLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ActivityLogCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ActivityLogCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ActivityLogGetPayload<T>, Context>) => Promise<Prisma.ActivityLogGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ActivityLogDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ActivityLogDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ActivityLogDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ActivityLogDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ActivityLogDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ActivityLogDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ActivityLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ActivityLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ActivityLogDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ActivityLogDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ActivityLogGetPayload<T>, Context>) => Promise<Prisma.ActivityLogGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ActivityLogFindFirstArgs, TData = Prisma.ActivityLogGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ActivityLogFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ActivityLogGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ActivityLogFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ActivityLogFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ActivityLogGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ActivityLogGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ActivityLogFindManyArgs, TData = Array<Prisma.ActivityLogGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ActivityLogFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ActivityLogGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ActivityLogFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ActivityLogFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ActivityLogGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ActivityLogGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ActivityLogFindUniqueArgs, TData = Prisma.ActivityLogGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ActivityLogFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ActivityLogGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ActivityLogFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ActivityLogFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ActivityLogGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ActivityLogGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ActivityLogUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ActivityLogUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ActivityLogUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ActivityLogUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ActivityLogUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ActivityLogUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ActivityLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ActivityLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ActivityLogUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ActivityLogUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ActivityLogGetPayload<T>, Context>) => Promise<Prisma.ActivityLogGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ActivityLogCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ActivityLogCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ActivityLogCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ActivityLogCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ActivityLogCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ActivityLogCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ActivityLogCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ActivityLogCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
