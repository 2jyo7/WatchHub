import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav>
  <div className="w-full py-3 border-b">
    <div className="flex justify-between px-20 items-center font-semibold">
      <div>
        <h1 className="text-2xl">WatchHub</h1>
      </div>
      <div className="flex xl:gap-10 md:gap-8  gap-2">
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Services</a>
        <a href="/">Testimonial</a>
      </div>
      <div>
        <button className="py-2 px-6 bg-black text-white rounded-3xl font-semibold">
          Contact
        </button>
      </div>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar