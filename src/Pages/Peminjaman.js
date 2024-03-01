import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Navbar from "../component/Navbar";

const GET_STUDENT = gql`
  query {
    students {
      id
      nama
    }
  }
`;

const GET_BOOKS = gql`
  query {
    books {
      id
      judul
    }
  }
`;

const GET_PEMINJAMAN = gql`
  query {
    peminjamans {
      id
      studentId
      bukuId
      tanggalPeminjaman
      
    }
  }
`;

const CREATE_PEMINJAMAN = gql`
  mutation createPeminjaman($studentId: ID!, $bukuId: ID!, $tanggalPeminjaman: Date!) {
    createPeminjaman(studentId: $studentId, bukuId: $bukuId, tanggalPeminjaman: $tanggalPeminjaman) {
      id
      studentId
      bukuId
      tanggalPeminjaman
    }
  }
`;

const UPDATE_PEMINJAMAN = gql`
  mutation updatePeminjaman($id: ID!, $studentId: ID, $bukuId: ID, $tanggalPeminjaman: Date) {
    updatePeminjaman(id: $id, studentId: $studentId, bukuId: $bukuId, tanggalPeminjaman: $tanggalPeminjaman) {
      id
      studentId
      bukuId
      tanggalPeminjaman
    }
  }
`;


const DELETE_PEMINJAMAN = gql`
  mutation deletePeminjaman($id: ID!) {
    deletePeminjaman(id: $id) {
      id
      studentId
      bukuId
      tanggalPeminjaman
    }
  }
`;

function Peminjaman() {
  const { loading: studentsLoading, data: studentsData } = useQuery(GET_STUDENT);
  const { loading: booksLoading, data: booksData } = useQuery(GET_BOOKS);

  const { loading, error, data } = useQuery(GET_PEMINJAMAN);
  const [createPeminjaman] = useMutation(CREATE_PEMINJAMAN);
  const [updatePeminjaman] = useMutation(UPDATE_PEMINJAMAN);
  const [deletePeminjaman] = useMutation(DELETE_PEMINJAMAN, {
    refetchQueries: [{ query: GET_PEMINJAMAN }],
  });

  const [addFormData, setAddFormData] = useState({
    id: null,
    studentId: '',
    bukuId: '',
    tanggalPeminjaman: '',
  });

  const [editFormData, setEditFormData] = useState({
    id: null,
    studentId: '',
    bukuId: '',
    tanggalPeminjaman: '',
  });

  const [editItemId, setEditItemId] = useState(null);

  const handleChangeAdd = (e) => {
    setAddFormData({
      ...addFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeEdit = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const handleCreate = async () => {
    try {
      await createPeminjaman({
        variables: {
          studentId: addFormData.studentId,
          bukuId: addFormData.bukuId,
          tanggalPeminjaman: addFormData.tanggalPeminjaman,
        },
        refetchQueries: [{ query: GET_PEMINJAMAN }]
      });
      setShowAddModal(true);
      setAddFormData({
        id: null,
        studentId: '',
        bukuId: '',
        tanggalPeminjaman: '',
      });
    } catch (error) {
      console.error('error creating data peminjaman: ', error.message);
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (peminjamanId) => {
    setEditItemId(peminjamanId);
    setEditFormData({
      id: peminjamanId,
      studentId: data.peminjamans.find((p) => p.id === peminjamanId).studentId,
      bukuId: data.peminjamans.find((p) => p.id === peminjamanId).bukuId,
      tanggalPeminjaman: data.peminjamans.find((p) => p.id === peminjamanId).tanggalPeminjaman,
    });

    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditFormData({
      id: null,
      studentId: '',
      bukuId: '',
      tanggalPeminjaman: '',
    });

    setShowEditModal(false);
  };

  const handleSaveEdit = async () => {
    try {
      await updatePeminjaman({
        variables: {
          id: editFormData.id,
          studentId: editFormData.studentId,
          bukuId: editFormData.bukuId,
          tanggalPeminjaman: editFormData.tanggalPeminjaman,
        },
        refetchQueries: [{ query: GET_PEMINJAMAN }],
      });
      setEditItemId(null);
      setEditFormData({
        id: null,
        studentId: '',
        bukuId: '',
        tanggalPeminjaman: '',
      });

      setShowEditModal(false);
    } catch (error) {
      console.error('error updating peminjaman', error.message);
    }
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [peminjamanToDelete, setPeminjamanToDelete] = useState(null);

  const handleDelete = (peminjamanId) => {
    setShowConfirmation(true);
    setPeminjamanToDelete(peminjamanId)
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePeminjaman({
        variables: {
          id: peminjamanToDelete
        }
      });
      setShowConfirmation(false);
      setPeminjamanToDelete(null);
    } catch (error) {
      console.log('error deleting peminjaman', error.message)
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setPeminjamanToDelete(null);
  }

  const formatDate = (dateString) => {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className="mt-24 m-10 overflow-hidden">
        <div className='flex justify-end mb-2'>
          <button className='p-2 bg-sky-600 rounded text-md text-white hover:bg-sky-700 flex items-center justify-self-end' onClick={() => setShowAddModal(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Peminjaman
          </button>
        </div>

        <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
          <thead className="w-full rounded-lg bg-f4ece1 text-base font-semibold text-gray-900">
            <tr className="bg-gray-100 ">
              <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-gray-900">#</th>
              <th className="whitespace-nowrap py-3 pl-1 text-sm font-normal text-gray-900">Nama Peminjam</th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-gray-900">Judul Buku</th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-gray-900">Tanggal Peminjaman</th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-gray-900">Edit & Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.peminjamans.map((peminjaman, index) => {
              const student = studentsData.students.find(
                s => s.id === peminjaman.studentId
              );
              const book = booksData.books.find(b => b.id === peminjaman.bukuId);

              return (
                <React.Fragment key={peminjaman.id}>
                  <tr className="cursor-pointer bg-gray-100 drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
                    <td className="rounded-l-lg py-4 pl-3 text-sm font-normal text-gray-700">{index + 1}</td>
                    <td className="px-1 py-4 text-sm font-normal text-gray-700 ">{student.nama}</td>
                    <td className="px-1 py-4 text-sm font-normal text-gray-700">{book.judul}</td>
                    <td className="px-1 py-4 text-sm font-normal text-gray-700">{formatDate(peminjaman.tanggalPeminjaman)}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                      <button
                        className="p-1 rounded hover:bg-neutral-400 text-blue-600"
                        onClick={() => handleEdit(peminjaman.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <span className="px-3">|</span>
                      <button
                        className="p-1 rounded hover:bg-red-500"
                        onClick={() => handleDelete(peminjaman.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}

          </tbody>
        </table>

        {showConfirmation && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-100 rounded-lg shadow p-6">

              <div className="flex justify-end">
                <button onClick={handleCancelDelete} className="hover:bg-gray-300 rounded text-gray-500 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-center mt-4 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="black" className="w-16 h-16 text-red-500 p-3 bg-red-500 rounded-full">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>

              <div className="mt-2 px-6 py-4">
                <p className="text-gray-900 font-medium">Are you sure you want to delete this book?</p>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button onClick={handleConfirmDelete} className="w-1/2 px-4 p-2 rounded bg-red-600 hover:bg-red-300 text-white">Yes, I'm Sure</button>
                <button onClick={handleCancelDelete} className="w-1/2 p-2 rounded hover:bg-gray-300 text-gray-500 hover:text-gray-600">Cancel</button>
              </div>

            </div>
          </div>
        )}



        {showEditModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="w-full max-w-md mx-auto mt-20 bg-gray-200 rounded-lg shadow-lg">
              <form onSubmit={handleSaveEdit}>
                <div className="flex justify-between p-4">
                  <p className="text-gray-900 font-medium text-lg ml-4">Edit Data Peminjaman</p>
                  <button onClick={handleCancelEdit} className="hover:bg-gray-300 rounded text-gray-500 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 bg-gray-100 rounded">
                  <div className="mb-4 flex flex-col md:flex-row">
                    <div className="mr-2 md:mr-4 md:w-1/2">
                      <label htmlFor="nama" className="block text-gray-700 font-medium mb-2">Nama Peminjam</label>
                      <select
                        name="studentId"
                        value={editFormData.studentId}
                        onChange={handleChangeEdit}
                        className="p-2 px-4 block w-full bg-gray-100 text-gray-800 border border-gray-500 font-medium mb-2 rounded"
                      >
                        <option value="">Select Student</option>
                        {studentsData && studentsData.students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.nama}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mr-2 md:mr-4 md:w-1/2">
                      <label htmlFor="judul" className="block text-gray-700 font-medium mb-2">Judul Buku</label>
                      <select
                        name="bukuId"
                        value={editFormData.bukuId}
                        onChange={handleChangeEdit}
                        className="p-2 px-4 block w-full bg-gray-100 text-gray-800 border border-gray-500 font-medium mb-2 rounded"
                      >
                        <option value="">Select Book</option>
                        {booksData.books.map((book) => (
                          <option key={book.id} value={book.id}>
                            {book.judul}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mr-2 mb-4">
                    <label htmlFor="tanggal" className="block text-gray-700 font-medium mb-2">Tanggal Peminjaman</label>
                    <input
                      type="date"
                      name="tanggalPeminjaman"
                      value={editFormData.tanggalPeminjaman}
                      onChange={handleChangeEdit}
                      placeholder="Tanggal Peminjaman"
                      className="p-2 px-4 block w-full bg-gray-100 text-gray-800 border border-gray-500 font-medium mb-2 rounded"
                    />
                  </div>

                </div>

                <div className="p-4 flex justify-end space-x-4 bg-gray-100 rounded-b-lg">
                  <button onClick={handleCancelEdit} className="p-2 rounded hover:bg-neutral-700 text-gray-500 hover:text-slate-300">Cancel</button>
                  <button type="submit" className="px-4 p-2 rounded bg-green-600 hover:bg-green-300 text-white">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
              <form onSubmit={handleCreate}>

                <div className="flex justify-between p-4">
                  <p className="text-gray-900 font-medium text-lg ml-4">Add Peminjaman</p>
                  <button onClick={() => setShowAddModal(false)} className="hover:bg-gray-300 rounded text-gray-500 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 bg-gray-100 rounded">
                  <div className="mb-4 flex flex-col md:flex-row">
                    <div className="mr-2 md:mr-4 md:w-1/2">
                      <label htmlFor="nama" className="block text-gray-700 font-medium mb-2">Nama Peminjam</label>
                      <select
                        name="studentId"
                        value={addFormData.studentId}
                        onChange={handleChangeAdd}
                        className="p-2 px-4 block w-full bg-gray-100 text-gray-800 border border-gray-500 font-medium mb-2 rounded"
                      >
                        <option value="">Select Student</option>
                        {studentsData && studentsData.students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.nama}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mr-2 md:mr-4 md:w-1/2">
                      <label htmlFor="judul" className="block text-gray-700 font-medium mb-2">Judul Buku</label>
                      <select
                        name="bukuId"
                        value={addFormData.bukuId}
                        onChange={handleChangeAdd}
                        className="p-2 px-4 block w-full bg-gray-100 text-gray-800 border border-gray-500 font-medium mb-2 rounded"
                      >
                        <option value="">Select Book</option>
                        {booksData.books.map((book) => (
                          <option key={book.id} value={book.id}>
                            {book.judul}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mr-2 mb-4">
                    <label htmlFor="tanggal" className="block text-gray-700 font-medium mb-2">Tanggal Peminjaman</label>
                    <input
                      type="date"
                      name="tanggalPeminjaman"
                      value={addFormData.tanggalPeminjaman}
                      onChange={handleChangeAdd}
                      placeholder="Tanggal Peminjaman"
                      className="p-2 px-4 block w-full bg-gray-100 text-gray-800 border border-gray-500 font-medium mb-2 rounded"
                    />
                  </div>

                </div>

                <div className="p-4 flex justify-end space-x-4 bg-gray-100 rounded-b-lg">
                  <button onClick={() => setShowAddModal(false)} className="p-2 rounded hover:bg-neutral-700 text-gray-500 hover:text-slate-300">Cancel</button>
                  <button type="submit" className="px-4 p-2 rounded bg-green-600 hover:bg-green-300 text-white">Add Peminjaman</button>
                </div>
              </form>
            </div>
          </div>
        )}



      </div>
    </>
  );
}

export default Peminjaman;