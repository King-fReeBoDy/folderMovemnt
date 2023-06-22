export interface IEditModal {
  handleEditPatientModal: () => void;
}

const EditRecord = ({ handleEditPatientModal }: IEditModal) => {
  return (
    <section className="relative">
      <div className="fixed top-0 left-0 w-full h-full bg-black/90 z-10"></div>

      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex item-center justify-center z-20 bg-white p-5 rounded-lg">
        <form>
          <h2 className="text-2xl text-black font-bold text-center mb-5">
            Edit Record
          </h2>
          <section className="flex">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                OPD Number
              </label>
              <input type="text" className="p-2 border-2 rounded-lg" />
            </div>
            <div className="grid mb-5 ml-3">
              <label htmlFor="" className="text-xs">
                Name Of Patient
              </label>
              <input type="text" className="p-2 border-2 rounded-lg" />
            </div>
          </section>

          <section className="flex">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Source Of Request
              </label>
              <input type="text" className="p-2 border-2 rounded-lg" />
            </div>
            <div className="grid mb-5 ml-3">
              <label htmlFor="" className="text-xs">
                Prescriber Name
              </label>
              <input type="text" className="p-2 border-2 rounded-lg" />
            </div>
          </section>

          <section className="flex ">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Folder Taken By
              </label>
              <input type="text" className="p-2 border-2 rounded-lg" />
            </div>
            <div className="grid mb-5 ml-3">
              <label htmlFor="" className="text-xs">
                Folder Issue By
              </label>
              <input type="text" className="p-2 border-2 rounded-lg" />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3">
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Date Of Issue
              </label>
              <input type="date" className="p-2 border-2 rounded-lg w-full" />
            </div>
            <div className="grid mb-5">
              <label htmlFor="" className="text-xs">
                Folder Received By
              </label>
              <input type="text" className="p-2 border-2 rounded-lg" />
            </div>
          </section>
          <div className="grid mb-5">
            <label htmlFor="" className="text-xs">
              Date Of Receiving
            </label>
            <input type="date" className="p-2 border-2 rounded-lg" />
          </div>

          <div className="flex items-center my-5">
            <button className=" bg-blue-600 px-5 py-2 text-white border-2 border-blue-600 rounded-lg shadow-lg">
              <p className="ml-2">Save</p>
            </button>
            <button
              onClick={handleEditPatientModal}
              className=" ml-4 border-2 bg-gray-500 border-gray-500 text-white px-5 py-2 rounded-lg shadow-lg"
            >
              <p className="ml-2">Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditRecord;
