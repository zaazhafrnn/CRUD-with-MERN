import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Navbar from '../component/Navbar';

const GET_STUDENT = gql`
  query {
    students {
      id
      nama
      hobi
      umur
      kelas
    }
  }
`;

const CREATE_STUDENT = gql`
  mutation CreateStudent($nama: String!, $hobi: String!, $umur: Int!, $kelas: Int!) {
    create(nama: $nama, hobi: $hobi, umur: $umur, kelas: $kelas) {
      id
      nama
      hobi
      umur
      kelas
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: ID!, $nama: String, $hobi: String, $umur: Int, $kelas: Int) {
    update(id: $id, nama: $nama, hobi: $hobi, umur: $umur, kelas: $kelas) {
      id
      nama
      hobi
      umur
      kelas
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation deleteStudent($id: ID!) {
    delete(id: $id) {
      id
      nama
      hobi
      umur
      kelas
    }
  }
`;

function Student() {
  const { loading, error, data } = useQuery(GET_STUDENT);
  const [createStudent] = useMutation(CREATE_STUDENT);
  const [updateStudent] = useMutation(UPDATE_STUDENT);
  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    refetchQueries: [{ query: GET_STUDENT }],
  });


  const [addFormData, setAddFormData] = useState({
    id: null,
    nama: '',
    hobi: '',
    umur: 0,
    kelas: 0,
  });

  const [editFormData, setEditFormData] = useState({
    id: null,
    nama: '',
    hobi: '',
    umur: 0,
    kelas: 0,
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
      await createStudent({
        variables: {
          nama: addFormData.nama,
          hobi: addFormData.hobi,
          umur: parseInt(addFormData.umur),
          kelas: parseInt(addFormData.kelas),
        },
        refetchQueries: [{ query: GET_STUDENT }],
      });
      showAddModal(true);
      setAddFormData({
        id: null,
        nama: '',
        hobi: '',
        umur: 0,
        kelas: 0,
      });
    } catch (error) {
      console.error('Error creating student:', error.message);
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (studentId) => {
    setEditItemId(studentId);
    setEditFormData({
      id: studentId,
      nama: data.students.find((p) => p.id === studentId).nama,
      hobi: data.students.find((p) => p.id === studentId).hobi,
      umur: data.students.find((p) => p.id === studentId).umur,
      kelas: data.students.find((p) => p.id === studentId).kelas,
    });

    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditFormData({
      id: null,
      nama: '',
      hobi: '',
      umur: 0,
      kelas: 0,
    });

    setShowEditModal(false);
  };

  const handleSaveEdit = async () => {
    try {
      await updateStudent({
        variables: {
          id: editFormData.id,
          nama: editFormData.nama,
          hobi: editFormData.hobi,
          umur: parseInt(editFormData.umur),
          kelas: parseInt(editFormData.kelas),
        },
        refetchQueries: [{ query: GET_STUDENT }],
      });
      setEditItemId(null);
      setEditFormData({
        id: null,
        nama: '',
        hobi: '',
        umur: 0,
        kelas: 0,
      });
      setShowEditModal(false);

    } catch (error) {
      console.error('Error updating student:', error.message);
    }
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleDelete = (studentId) => {
    setShowConfirmation(true);
    setStudentToDelete(studentId)
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteStudent({
        variables: {
          id: studentToDelete
        }
      });
      setShowConfirmation(false);
      setStudentToDelete(null);
    } catch (error) {
      console.error('Error deleting student', error.message);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setStudentToDelete(null);
  }

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
            Add Student
          </button>
        </div>



        <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
          <thead className="w-full rounded-lg bg-f4ece1 text-base font-semibold text-gray-900">
            <tr className="bg-gray-100 ">
              <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-gray-900">#</th>
              <th className="whitespace-nowrap py-3 pl-1 text-sm font-normal text-gray-900">Nama </th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-gray-900">Hobi</th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-gray-900">Umur</th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-gray-900">Kelas</th>
              <th className="whitespace-nowrap py-3 text-sm font-normal text-gray-900">Edit & Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.students.map((student, index) => (
              <React.Fragment key={student.id}>
                <tr className="cursor-pointer bg-gray-100 drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl">
                  <td className="rounded-l-lg py-4 pl-3 text-sm font-normal text-gray-700">{index + 1}</td>
                  <td className="px-1 py-4 text-sm font-normal text-gray-700">{student.nama}</td>
                  <td className="px-1 py-4 text-sm font-normal text-gray-700">{student.hobi}</td>
                  <td className="px-1 py-4 text-sm font-normal text-gray-700">{student.umur}</td>
                  <td className="px-2.5 py-4 text-sm font-normal text-gray-700">{student.kelas}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    <button
                      className="p-1 rounded hover:bg-neutral-400"
                      onClick={() => handleEdit(student.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                    <span className="px-3">|</span>
                    <button
                      className="p-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(student.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
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
                <p className="text-gray-900 font-medium">Are you sure you want to delete this student?</p>
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
                  <p className="text-gray-900 font-medium text-lg ml-4">Edit student</p>
                  <button onClick={handleCancelEdit} className="hover:bg-gray-300 rounded text-gray-500 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 bg-gray-100 rounded">
                  <div className="mb-4">
                    <label htmlFor="nama" className="block text-gray-700 font-medium">Nama</label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={editFormData.nama}
                      className="w-full border border-gray-500 p-2 rounded-md bg-gray-100 text-gray-800"
                      onChange={handleChangeEdit}
                      autoComplete='off'
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="hobi" className="block text-gray-700 font-medium">Hobi</label>
                    <input
                      type="text"
                      id="hobi"
                      name="hobi"
                      value={editFormData.hobi}
                      className="w-full border border-gray-500 p-2 rounded-md bg-gray-100 text-gray-800"
                      onChange={handleChangeEdit}
                      autoComplete='off'
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="umur" className="block text-gray-700 font-medium">Umur</label>
                    <input
                      type="number"
                      id="umur"
                      name="umur"
                      value={editFormData.umur}
                      className="w-full border border-gray-500 p-2 rounded-md bg-gray-100 text-gray-800"
                      onChange={handleChangeEdit}
                      autoComplete='off'
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="kelas" className="block text-gray-700 font-medium">Kelas</label>
                    <input
                      type="number"
                      id="kelas"
                      name="kelas"
                      value={editFormData.kelas}
                      className="w-full border border-gray-500 p-2 rounded-md bg-gray-100 text-gray-800"
                      onChange={handleChangeEdit}
                      autoComplete='off'
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="w-full max-w-md mx-auto mt-20 bg-gray-200 rounded-lg shadow-lg">
              <form onSubmit={handleCreate}>
                <div className="flex justify-between p-4">
                  <p className="text-gray-900 font-medium text-lg ml-4">Add student</p>
                  <button onClick={() => setShowAddModal(false)} className="hover:bg-gray-300 rounded text-gray-500 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 bg-gray-100 rounded">
                  <div className="mb-4">
                    <label htmlFor="nama" className="block text-gray-700 font-medium">Nama</label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={addFormData.nama}
                      className="w-full border border-gray-500 p-2 rounded-md bg-gray-100 text-gray-800"
                      onChange={handleChangeAdd}
                      autoComplete='off'
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="hobi" className="block text-gray-700 font-medium">Hobi</label>
                    <input
                      type="text"
                      id="hobi"
                      name="hobi"
                      value={addFormData.hobi}
                      className="w-full border border-gray-500 p-2 rounded-md bg-gray-100 text-gray-800"
                      onChange={handleChangeAdd}
                      autoComplete='off'
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="umur" className="block text-gray-700 font-medium">Umur</label>
                    <input
                      type="number"
                      id="umur"
                      name="umur"
                      value={addFormData.umur}
                      className="w-full border border-gray-500 p-2 rounded-md bg-gray-100 text-gray-800"
                      onChange={handleChangeAdd}
                      autoComplete='off'
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="kelas" className="block text-gray-700 font-medium">Kelas</label>
                    <input
                      type="number"
                      id="kelas"
                      name="kelas"
                      value={addFormData.kelas}
                      className="w-full border border-gray-500 p-2 rounded-md bg-gray-100 text-gray-800"
                      onChange={handleChangeAdd}
                      autoComplete='off'
                    />
                  </div>
                </div>

                <div className="p-4 flex justify-end space-x-4 bg-gray-100 rounded-b-lg">
                  <button onClick={() => setShowAddModal(false)} className="p-2 rounded hover:bg-neutral-700 text-gray-500 hover:text-slate-300">Cancel</button>
                  <button type="submit" className="px-4 p-2 rounded bg-green-600 hover:bg-green-300 text-white">Add Student</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Student;
