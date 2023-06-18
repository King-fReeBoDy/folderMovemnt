import { useState } from "react";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AddRecord from "./AddRecord";

export interface IAddPatientToggle {
  handleToggleAddPatient: () => void;
}

function App() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [addPatientToggle, setAddPatientToggle] = useState(false);

  const handleSidebarToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const handleToggleAddPatient = () => {
    setAddPatientToggle(!addPatientToggle);
  };
  return (
    <div className="grid grid-cols-12 text-gray-600 w-full text-sm font-light">
      <div className={`${toggleSidebar ? "col-span-2" : "col-span-1"} `}>
        <Sidebar
          handleSidebarToggle={handleSidebarToggle}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div className={`${toggleSidebar ? "col-span-10" : "col-span-11"}`}>
        <Body handleToggleAddPatient={handleToggleAddPatient} />
      </div>
      {addPatientToggle && (
        <AddRecord handleToggleAddPatient={handleToggleAddPatient} />
      )}
    </div>
  );
}

export default App;
