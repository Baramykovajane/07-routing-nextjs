'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from '@/styles/NotesPage.module.css';

const PER_PAGE = 12;

type Props = { tag?: string };

const NotesClient = ({ tag }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
  queryKey: ['notes', tag, page, debouncedSearch],
  queryFn: () =>
    getNotes({
      page,
      perPage: PER_PAGE,
      search: debouncedSearch || undefined,
      tag,
    }),
});

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
{isLoading && <p>Loading...</p>}
{isError && <p>Error loading notes</p>}
{!isLoading && !isError && data?.notes?.length ? (
  <NoteList notes={data.notes} />
) : (
  !isLoading && !isError && <p>No notes found</p>
)}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} onCreated={() => setPage(1)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;

