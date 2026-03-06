import { Card, Grid } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";
export default function Authentication() {
  return (
    <Grid container className="h-screen bg-zinc-400" wrap="nowrap">
      <Grid item xs={6} className="h-full w-[65%] overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7"
          alt="Social Media Background"
        />

      </Grid>

      
      <Grid item xs={6} className="h-full flex items-center justify-center ml-4">
        <Card className="w-[85%] p-8 rounded-3xl shadow-2xl mt-2">
          <div className="flex flex-col items-center mb-6 ">
            <h1 className="text-3xl font-bold text-indigo-600">
              Social Media
            </h1>
            <p className="text-center text-sm text-gray-600">
              Connecting Lives, Sharing Stories: Your Social World, Your Way
            </p>
          </div>

        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
        </Card>
      </Grid>

    </Grid>
  );
}
