  import React from 'react';
  import { Navigate, Outlet } from 'react-router-dom';
  import Cookies from 'js-cookie';



  export const NonAuthRoute= () => {
    const isLoggedInCookies = Cookies.get('loggedIn');
    const isLoggedInSession = JSON.parse(sessionStorage.getItem('loggedIn'));
    if(isLoggedInCookies){
      return (
        <>
          {!isLoggedInCookies ? <Outlet/> : <Navigate to={"/"}/>}
        </>
      );
    }
    else{
      return (
        <>
          {!isLoggedInSession ? <Outlet/> : <Navigate to={"/"}/>}
          
        </>
      );
    }
  };

  export const AuthRoute= () => {
    const isLoggedInCookies = Cookies.get('loggedIn');
    const isLoggedInSession = JSON.parse(sessionStorage.getItem('loggedIn'));
    if(isLoggedInCookies){
    return (
      <>
        {isLoggedInCookies ? <Outlet/> : <Navigate to={"/login"}/>}
      </>
    );
    }
    else{
      return (
        <>
          {isLoggedInSession ? <Outlet/> : <Navigate to={"/login"}/>}
        
        </>
      );
    }
  };

  export const AuthActiveRoute= () => {
    const isActiveDoctCookies = Cookies.get('ActiveDoct');
    const isLoggedInCookies = Cookies.get('loggedIn');

    if(isLoggedInCookies){
      return (
        <>
          {!isActiveDoctCookies || !isLoggedInCookies ? <Outlet/> : <Navigate to={"/"}/>}
          {/* {!isLoggedInCookies ? null: alert("Already Active is ON")} */}
        </>
      );
    }
  };

  // export const AdminAuthRoute= () => {
  //   const isLoggedInCookies = JSON.parse(decodeURI(Cookies.get('loggedIn')));
  //   // console.log(isLoggedInCookies)
  //   const isLoggedInSession = sessionStorage.getItem('loggedIn');
  //   if(isLoggedInCookies.email == "superadmin@gmail.com"){
  //   return (
  //     <>
  //       {isLoggedInCookies ? <Outlet/>:<Navigate to={"/"}/> }
  //     </>
  //   );
  //   }
  //   else{
  //     return (
  //       <>
  //         {isLoggedInSession ?  <Outlet/>: <Navigate to={"/"}/> }
  //       </>
  //     );
  //   }
  // };
