import React from "react";

const Header = () => {
  return (
    <section className="sticky top-0 left-0 right-0 flex justify-between items-center border-b-2 pb-3 bg-white p-5">
      <h5 className="text-sm">Ho Municipal Hospital</h5>
      <div className="flex items-center">
        <p className="text-sm">Admin</p>
        <p className="h-7 w-7 rounded-full text-center text-sm bg-red-600 pt-1 ml-2 text-white">
          D
        </p>
      </div>
    </section>
  );
};

export default Header;
