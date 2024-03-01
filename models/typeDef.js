const gql = require("graphql-tag");
const bcrypt = require('bcrypt');

const typeDefs = gql`
  scalar Date

  type Query {
    hello: String
    welcome(name: String): String
    students: [Student]
    student(id: ID): Student
    books: [Buku]
    book(id: ID): Buku
    peminjamans: [Peminjaman]
    users: [User]
  }

  type Student {
    id: ID
    nama: String
    hobi: String
    umur: Int
    kelas: Int
  }

  type Buku {
    id: ID
    judul: String
    tahun: Int
  }

  type Peminjaman {
    id: ID
    studentId: ID
    bukuId: ID
    tanggalPeminjaman: Date
  }

  type User {
    id: ID!
    username: String!
    password: String!
    hashedPassword: String!
  }

  type Mutation {
    create(nama: String, hobi: String, umur: Int, kelas: Int): Student
    update(id: ID, nama: String, hobi: String, umur: Int, kelas: Int): Student
    delete(id: ID): Student

    createBuku(id: ID, judul: String, tahun: Int): Buku
    updateBuku(id: ID, judul: String, tahun: Int): Buku
    deleteBuku(id: ID): Buku

    createPeminjaman(studentId: ID!, bukuId: ID!, tanggalPeminjaman: Date!): Peminjaman,
    updatePeminjaman(id: ID, studentId: ID, bukuId: ID, tanggalPeminjaman: Date): Peminjaman
    deletePeminjaman(id: ID): Peminjaman
  
    register(username: String!, password: String!): User
    login(username: String!, password: String!): Boolean
  }
`;

module.exports = { typeDefs };