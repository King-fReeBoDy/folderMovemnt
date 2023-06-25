import React, { ReactNode, createContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { invoke } from "@tauri-apps/api";

interface IDataContext {
  editId: number | undefined;
  deleteId: number | undefined;
  records: Newrecord[];
  setRecords: (records: Newrecord[]) => void;
  setEditId: (id: number) => void;
  setDeleteId: (id: number) => void;
  getAllRecords: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

interface Newrecord {
  id: number;
  nameofpatient: string;
  opdnumber: string;
  sourceofrequest: string;
  requestingofficer: string;
  purpose: string;
  foldertakenby: string;
  folderissuedby: string;
  dateofissue: string;
  folderreceivedby: string;
  dateofreceiving: string;
}

export const DataContext = createContext<IDataContext>({
  editId: undefined,
  deleteId: undefined,
  records: [],
  setRecords: () => {},
  setEditId: () => {},
  setDeleteId: () => {},
  getAllRecords: async () => {},
});

const DataContextAPI: React.FC<Props> = ({ children }) => {
  const [records, setRecords] = useState<Newrecord[]>([]);
  const [editId, setEditId] = useState<number | undefined>();
  const [deleteId, setDeleteId] = useState<number | undefined>();

  const getAllRecords = async () => {
    try {
      const allRecords: Newrecord[] = JSON.parse(
        await invoke("get_all_records_command")
      );
      setRecords(allRecords.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        getAllRecords,
        editId,
        deleteId,
        records,
        setRecords,
        setEditId,
        setDeleteId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextAPI;
