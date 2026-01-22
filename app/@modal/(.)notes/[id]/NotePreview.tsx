"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";

export default function NotePreviewClient({ note }: { note: Note }) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // ← ключовий момент
  };

  return (
    <Modal onClose={handleClose}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </Modal>
  );
}
