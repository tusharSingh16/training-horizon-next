
import Navbar from '@/components/UserFlow/NavBar'
import SignUpcard from '@/components/UserFlow/SignUpcard'
import React, { Component } from 'react'

const page = () => {
  return (
    <>
    <Navbar/>
    <main className="flex justify-center items-center h-screen bg-transparent">
      <SignUpcard/>
    </main>
    </>
  )
}

export default page
