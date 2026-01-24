"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false, 
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        Loading...
      </Modal>
    );
  }

  if (isError || !data) {
    return (
      <Modal onClose={handleClose}>
        Error loading note
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <h2>{data.title}</h2>
      <p><b>Tag:</b> {data.tag}</p>
      <p>{data.content}</p>
      <small>
        {new Date(data.createdAt).toLocaleString()}
      </small>
    </Modal>
  );
}
