import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="navbar">
      <h1>Menaxhimi i Konferencave</h1>
      <ul className="nav-links">
        {/* <li>
          <Link to="/">Lista e Konferencave</Link>
        </li> */}
        {/* Only show the admin links if the user is an admin */}
        {user?.role === 'admin' && (
          <>
           <li>
          <Link to="/ItemList">Lista e Konferencave</Link>
        </li>
            <li>
              <Link to="/add">Krijo Konferencë</Link>
            </li>
            <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
           
          </>
          
        )}
   {/* Show admin links if the user has a admin role */}
         {user?.role === 'admin' && (
          <>
            <li>
              <Link to="/sponsors">lista e sponzoreve</Link>
            </li>
            <li>
              <Link to="/add-sponsor">shto sponzor</Link>
            </li>
          </>
        )}
          {user?.role === 'admin' && (
          <>
            <li>
              <Link to="/posts">Lista e Postimeve</Link>
            </li>
            <li>
              <Link to="/add-post">Krijo Postim</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};


export default Navbar;
