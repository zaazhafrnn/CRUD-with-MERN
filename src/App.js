import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import StudentList from './Pages/StudentList';
import BookList from './Pages/BookList';
import Peminjaman from './Pages/Peminjaman';
import Login from './Pages/Login';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const SERVER_GRAPHQL_SERVER = 'http://localhost:8000/graphql';

const client = new ApolloClient({
  uri: SERVER_GRAPHQL_SERVER,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/peminjaman" element={<Peminjaman />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
