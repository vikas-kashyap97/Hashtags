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

        createMany: procedure.input($Schema.HashtagInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).hashtag.createMany(input as any))),

        create: procedure.input($Schema.HashtagInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).hashtag.create(input as any))),

        deleteMany: procedure.input($Schema.HashtagInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).hashtag.deleteMany(input as any))),

        delete: procedure.input($Schema.HashtagInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).hashtag.delete(input as any))),

        findFirst: procedure.input($Schema.HashtagInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).hashtag.findFirst(input as any))),

        findMany: procedure.input($Schema.HashtagInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).hashtag.findMany(input as any))),

        findUnique: procedure.input($Schema.HashtagInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).hashtag.findUnique(input as any))),

        updateMany: procedure.input($Schema.HashtagInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).hashtag.updateMany(input as any))),

        update: procedure.input($Schema.HashtagInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).hashtag.update(input as any))),

        count: procedure.input($Schema.HashtagInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).hashtag.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.HashtagCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.HashtagCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.HashtagCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.HashtagCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.HashtagCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.HashtagCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.HashtagGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.HashtagGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.HashtagCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.HashtagCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.HashtagGetPayload<T>, Context>) => Promise<Prisma.HashtagGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.HashtagDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.HashtagDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.HashtagDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.HashtagDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.HashtagDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.HashtagDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.HashtagGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.HashtagGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.HashtagDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.HashtagDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.HashtagGetPayload<T>, Context>) => Promise<Prisma.HashtagGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.HashtagFindFirstArgs, TData = Prisma.HashtagGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.HashtagFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.HashtagGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.HashtagFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.HashtagFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.HashtagGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.HashtagGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.HashtagFindManyArgs, TData = Array<Prisma.HashtagGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.HashtagFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.HashtagGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.HashtagFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.HashtagFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.HashtagGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.HashtagGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.HashtagFindUniqueArgs, TData = Prisma.HashtagGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.HashtagFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.HashtagGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.HashtagFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.HashtagFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.HashtagGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.HashtagGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.HashtagUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.HashtagUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.HashtagUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.HashtagUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.HashtagUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.HashtagUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.HashtagGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.HashtagGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.HashtagUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.HashtagUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.HashtagGetPayload<T>, Context>) => Promise<Prisma.HashtagGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.HashtagCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.HashtagCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.HashtagCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.HashtagCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.HashtagCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.HashtagCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.HashtagCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.HashtagCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
