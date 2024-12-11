// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoMatch from './components/nomatch/noMatch';
import Register from './components/Register';
import Login from './components/Login';
import { AddItem, EditItem, ItemList } from './components/CrudTest'; // Import CRUD components
import { AddSponsor, EditSponsor, SponsorList } from './components/sponsor'; // Import Sponsor components
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import Menu from "./components/menu";  // Import Menu Page
import AdminDashboard from "./components/Dashboard/admindashboard";  // Import Menu Page
import {AddPost , EditPost , PostList} from './components/posts';
import "./App.css"



function App() {
 
  return (
    <Router>
      <div>
     
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactForm />} />

          <Route path="ItemList" element={<ItemList />} />
          <Route path="/add" element={<AddItem />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/admin-panel" element={<AdminDashboard />} />
          
          <Route path="/items" element={<ItemList />} />
            <Route path="/add" element={<AddItem />} /> 
            <Route path="/edit/:id" element={<EditItem />} /> 


       {/* Sponsor Routes */}
       <Route path="/sponsors" element={<SponsorList />} /> {/* Lista e sponsorëve */}
          <Route path="/add-sponsor" element={<AddSponsor />} /> {/* Shto sponsor */}
          <Route path="/edit-sponsor/:id" element={<EditSponsor />} /> {/* Redakto sponsor */}

          <Route path="/posts" element={<PostList />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />

          {/* Authentication Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />


          <Route path="*" element={<NoMatch />} /> {/* Për rrugët e paidentifikuara */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
