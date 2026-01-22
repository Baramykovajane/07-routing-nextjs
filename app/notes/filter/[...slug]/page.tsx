

import { getNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import type { FetchNotesResponse } from "@/lib/api";

type Props = { params: { slug: string[] } };
const PER_PAGE = 12;

const NotesByTag = async ({ params }: Props) => {
  const { slug } = params;

  const tag = slug[0] === "all" ? undefined : slug[0];

  const data: FetchNotesResponse = await getNotes({
    page: 1,
    perPage: PER_PAGE,
    search: undefined,
    tag, 
  });

  if (!data?.notes?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">No notes found</p>
      </div>
    );
  }

  return <NoteList notes={data.notes} />;
};

export default NotesByTag;
