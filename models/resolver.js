const bcrypt = require('bcrypt');
const { Student } = require("./Student")
const { Buku } = require("./Buku")
const { Peminjaman } = require("./Peminjaman")
const { User } = require("./User")

const resolvers = {
  Query: {
    hello: () => "Hello from Reflectoring Blog",
    welcome: (parent, args) => `Hello ${args.name}`,
    students: async () => await Student.find({}),
    student: async (parent, args) => await Student.findById(args.id),
    books: async () => await Buku.find({}),
    book: async (parent, args) => await Buku.findById(args.id),
    peminjamans: async () => await Peminjaman.find({}),
  },

  Mutation: {
    create: async (parent, args) => {
      const newStudent = new Student({
        nama: args.nama,
        hobi: args.hobi,
        umur: args.umur,
        kelas: args.kelas
      });
      await newStudent.save();
      return newStudent;
    },
    createBuku: async (parent, args) => {
      const newBuku = new Buku({
        judul: args.judul, 
        tahun: args.tahun
      });
      await newBuku.save();
      return newBuku;
    },
    createPeminjaman: async (parent, args) => {
      const { studentId, bukuId, tanggalPeminjaman } = args;
      const parsedDate = new Date(tanggalPeminjaman);

      const newPeminjaman = new Peminjaman({
        studentId,
        bukuId,
        tanggalPeminjaman: parsedDate,
      })
      
      try {
        await newPeminjaman.save();
        return newPeminjaman;
      } catch (error){
        console.error('error creating', error.message);
        throw new Error('failed to create peminjaman')
      }
    },

    update: async (parent, args) => {
        const { id } = args;
        const result = await Student.findByIdAndUpdate(id, args);
        return result;
    },
    updateBuku: async (parent, args) => {
      const { id } = args;
      const result = await Buku.findByIdAndUpdate(id, args);
      return result;
    },
    updatePeminjaman: async (parent, args) => {
      const { id } = args;
      const result = await Peminjaman.findByIdAndUpdate(id, args);
      return result;
    },

    delete: async (parent, args) => {
      const {id} = args;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
        throw new Error(`not found`)
      }
      return deletedStudent
    },
    deleteBuku: async (parent, args) => {
      const {id} = args;
      const deletedBuku = await Buku.findByIdAndDelete(id);
      if (!deletedBuku) {
        throw new Error(`not found`)
      }
      return deletedBuku
    },
    deletePeminjaman: async (parent, args) => {
      const {id} = args;
      const deletedPeminjaman = await Peminjaman.findByIdAndDelete(id);
      if (!deletedPeminjaman) {
        throw new Error(`not found`)
      }
      return deletedPeminjaman
    },

    register: async (_, { username, password }) => {
      try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
          throw new Error('Username already exist')
        }

        const newUser = new User({
          username,
          password, 
          hashedPassword: '',
        })

        await newUser.save();

        return newUser
      } catch (error) {
        throw new Error(error.message)
      }
    },
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username })

        if (!user) {
          throw new Error('User not found')
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword)
        
        if (!isPasswordValid) {
          throw new error('Password is wrong')        }

        return true;
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },
};

module.exports = { resolvers };