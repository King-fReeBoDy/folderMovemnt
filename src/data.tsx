interface IData {
  OPDNumber: string;
  NameOfPatient: string;
  SourceOfRequest: string;
  PrescriberName: string;
  Purpose: string;
  FolderTakenBy: string;
  FolderIssuedBy: string;
  DateOfIssue: string;
  FolderReceivedBy: string;
  DateOfReceiving: string;
}

const data: IData[] = [
  {
    OPDNumber: "G005986/22",
    NameOfPatient: "Kwaku",
    SourceOfRequest: "Ward",
    PrescriberName: "Trapcy",
    Purpose: "Admission",
    FolderTakenBy: "Free",
    FolderIssuedBy: "Efo",
    DateOfIssue: "2022-11-1",
    FolderReceivedBy: "Prince",
    DateOfReceiving: "2022-11-1",
  },
];

export default data;

// {
//   OPDNumber: "G005986/22",
//   NameOfPatient: "Kwaku",
//   SourceOfRequest: "Ward",
//   PrescriberName: "Trapcy",
//   Purpose: "Admission",
//   FolderTakenBy: "Free",
//   FolderIssuedBy: "Efo",
//   DateOfIssue: "2022-11-1",
//   FolderReceivedBy: "Prince",
//   DateOfReceiving: "2022-11-1",
// },
