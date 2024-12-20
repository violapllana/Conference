import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoMatch from './components/nomatch/noMatch';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Menu from "./components/menu";  
import Dashboard from "./components/Dashboard";  
import { AddPost, EditPost, PostList } from './components/posts';
import { AddFeedback, EditFeedback, FeedbackList } from './components/feedback'; 
import { AddItem, EditItem, ItemList } from './components/CrudTest'; 
import { AddSponsor, EditSponsor, SponsorList } from './components/sponsor'; 
import AddParticipant from './components/addParticipant'; 
import Participants from './components/Participant';



import ContactForm from './components/ContactForm';
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
    
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
  
          {/* <Route path="/items" element={<ItemList />} />
          <Route path="/add" element={<AddItem />} /> 
          <Route path="/edit/:id" element={<EditItem />} />  */}

          {/* Sponsor Routes */}
          {/* <Route path="/sponsors" element={<SponsorList />} />
          <Route path="/add-sponsor" element={<AddSponsor />} />
          <Route path="/edit-sponsor/:id" element={<EditSponsor />} /> */}

          {/* Participant Routes (Updated) */}
          {/* <Route path="/participants" element={<ParticipantList />} />
          <Route path="/add-participant" element={<AddParticipant />} />
          <Route path="/edit-participant/:id" element={<EditParticipant />} /> */}

<Route path="/Add-participant" element={<AddParticipant />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="/dashboard" element={<Dashboard />} />

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
