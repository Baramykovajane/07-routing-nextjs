import { fetchNoteById } from "@/lib/api";
import { notFound } from "next/navigation";
import NotePreviewClient from "./NotePreview";

type Props = {
  params: {
    id: string;
  };
};

export default async function NotePreview({ params }: Props) {
  const note = await fetchNoteById(params.id).catch(() => null);

  if (!note) {
    notFound();
  }

  return <NotePreviewClient note={note} />;
}
