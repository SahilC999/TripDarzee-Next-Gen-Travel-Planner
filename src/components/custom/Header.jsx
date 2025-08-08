import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useNavigation } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import DarkModeToggle from "../DarkModeToggle";
import { useNavigate } from "react-router-dom";
import PackingList from '@/pages/PackingList';

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
   const navigation = useNavigation;

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
      console.log(storedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, []);

  const Navbar = () => {
    const navigate = useNavigate();  
    const handleSearch = () => {
      navigate("/bookings");  
    }};

   const login = useGoogleLogin({
          onSuccess: (codeResp) => GetUserProfile(codeResp),
          onError: (error) => console.log(error),
    })     
    
    const GetUserProfile = (tokenInfo) => {
      axios.get(`https:www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
          headers:{
              Authorization: `Bearer ${tokenInfo?.access_token}`,
              Accept: `Application/json`
          }
      }).then((resp) => {
          console.log(resp);
          localStorage.setItem('user', JSON.stringify(resp.data));
          setOpenDialog(false);
          window.location.reload();
      })
  }

  return (
    <div className="p-3 shadow-sm px-5 flex justify-between items-center">
      <img className="h-24 w-32 rounded-3xl" src="/logo.png" alt="Logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
             {/* <a href="/create-trip">
             <Button variant="outline" className="rounded-full">
             ➕ Create Trip
             </Button></a>
             <a href="/my-trip">
             <Button variant="outline" className="rounded-full">
               My Trips
             </Button></a>
             <a href="/flights">
             <Button variant="outline">
             🔍 Search Flights & Hotels
             </Button></a>
             <a href="/packing-list">
             <Button variant="outline">🎒 Packing List</Button>
           </a> */}
            <a href="/home">
              <Button variant="outline" className="rounded-full">
              🏠 Home
              </Button>
            </a>
            <a href="/about-us">
              <Button variant="outline" className="rounded-full">
              ℹ About Us
              </Button>
            </a>
            <a href="/faqs">
              <Button variant="outline" className="rounded-full">
              ❓ FAQs
              </Button>
            </a>
            {/* <img
              src={user?.picture} alt="User" className="h-[35px] w-[35px] rounded-full"
            /> */}
            <Popover>
              <PopoverTrigger><img
              src={user?.picture}
              alt="User"
              className="h-[35px] w-[35px] rounded-full"
            /></PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>LogOut</h2>
              </PopoverContent>
            </Popover>
          </div>
        
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
        
        <div>
              <Dialog open={openDialog}>
                          <DialogContent>
                              <DialogHeader>
                              <DialogTitle></DialogTitle>
                              <DialogDescription>
                                  <img className='h-24 w-32 justify-center flex' src="/logo.png" />
                                  <h2 className='font-bold text-lg mt-7 mb-1 text-black'>SignIn with Google</h2>
                                  <p>Signin with google authentication</p>
              
              
                                  <Button className='w-full mt-5 flex gap-4 items-center'
                                  onClick={login} >
                                     <FcGoogle className='h-7 w-7' />
                                     Sign in with Google
                                  </Button>
                              </DialogDescription>
                              </DialogHeader>
                          </DialogContent>
                      </Dialog>
            </div>
      </div>
      <DarkModeToggle />
    </div>
  );
}

export default Header;
