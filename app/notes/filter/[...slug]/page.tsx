import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function NotesByTagPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam, search: searchParam } = await searchParams;

  const tag =
    slug?.[0] && slug[0] !== "all"
      ? slug[0][0].toUpperCase() + slug[0].slice(1)
      : undefined;

  const page = Number(pageParam) || 1;
  const search = searchParam || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag], 
    queryFn: () =>
      getNotes({
        page,
        perPage: 12,
        search: search || undefined,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        tag={tag}
        initialPage={page}
        initialSearch={search}
      />
    </HydrationBoundary>
  );
}
