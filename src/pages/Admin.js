import React,{useEffect,useState} from 'react';
import Navbar from "../components/Anav";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'

export default function Admin() {
  const [tableData, setTableData] = useState([]);
  const [editingHospital,setEditingHospital] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(null);

  const deleteHospital = (id) => {
    axios.delete(`https://vaccine-server-tj0x.onrender.com/delete/${id}`).then((response) => {
      if (response.status === 200) {
        setTableData(
          tableData.filter((val) => {
            return val.id !== id;
          })
        );
        console.log(`Employee with ID ${id} deleted successfully.`);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error('Error deleting employee:', error);
    });
  };

  const handleEdit = (id) => {
    const hospitalToEdit = tableData.find((hospital) => hospital.id === id);
    setEditingHospital(hospitalToEdit);
    openModal();
  };  

  const handleModalSave = () => {
    if (editingHospital) {
      axios.put(`https://vaccine-server-tj0x.onrender.com/updateData/${editingHospital.id}`, editingHospital)
        .then((response) => {
          console.log('Hospital edited:', response.data);
          closeModal();
        })
        .catch((error) => {
          console.error('Error editing Hospital:', error);
        });
    }
  };
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingHospital(null);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://vaccine-server-tj0x.onrender.com/fetchData');
            setTableData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
    const intervalId = setInterval(() => {
        fetchData();
    }, 2000);
    return () => clearInterval(intervalId);
}, []);

  return (
    <div className='out'>
      <Navbar />
      <div className='flex justify-center'>
        <Link to='/add'>
          <button className='btn bg-red-400 text-xl font-semibold mt-10'>Add Hospitals</button>
        </Link>
      </div>
      <div className='flex justify-center mt-5 mb-20'>
        <div className='flex justify-center items-center'>
          <table className="table table-zebra text-lg font-normal">
            <thead>
              <tr className='bg-red-400 text-lg font-black text-black'>
                <th>ID</th>
                <th>City</th>
                <th>Hospital Name</th>
                <th>Date</th>
                <th>Doseage Stock</th>
                <th>Slot 1 Count</th>
                <th>Slot 2 Count</th>
                <th>Slot 3 Count</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
                {tableData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.city}</td>
                    <td>{row.hname}</td>
                    <td>{row.ddate}</td>
                    <td>{row.count}</td>
                    <td>{row.slotone}</td>
                    <td>{row.slottwo}</td>
                    <td>{row.slotthree}</td>
                    <td>
                      <div>
                          <button className='w-20 text-lg btn btn-outline btn-ghost mb-5' onClick={()=>handleEdit(row.id)}>Edit</button><br/>
                          <button className='w-20 text-lg btn btn-outline btn-error' onClick={()=>deleteHospital(row.id)}>Delete</button>
                      </div>    
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className='flex justify-center p-52'>
          <div className='bg-red-300 p-8 w-1/2 rounded-lg'>
            <h2 className='text-lg font-semibold mb-5'>Edit Employee</h2>
            <div className='col-span-6'>
              <label>
                City:
                <input
                  className='input input-secondary border-2 border-black rounded-lg ml-2 mb-5'
                  type='text'
                  value={editingHospital ? editingHospital.city : ''}
                  onChange={(e) =>
                    setEditingHospital({
                      ...editingHospital,
                      city: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Hospital Name:
                <input
                  className='input input-secondary border-2 border-black rounded-lg ml-2 mb-5'
                  type='text'
                  value={editingHospital ? editingHospital.hname : ''}
                  onChange={(e) =>
                    setEditingHospital({
                      ...editingHospital,
                      hname: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Slots:
                <input
                  className='input input-secondary border-2 border-black rounded-lg ml-2 mb-5'
                  type='text'
                  value={editingHospital ? editingHospital.slots : ''}
                  onChange={(e) =>
                    setEditingHospital({
                      ...editingHospital,
                      slots: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Slot One:
                <input
                  className='input input-secondary border-2 border-black rounded-lg ml-2 mb-5'
                  type='text'
                  value={editingHospital ? editingHospital.slotone : ''}
                  onChange={(e) =>
                    setEditingHospital({
                      ...editingHospital,
                      slotone: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Slot Two:
                <input
                  className='input input-secondary border-2 border-black rounded-lg ml-2 mb-5'
                  type='text'
                  value={editingHospital ? editingHospital.slottwo : ''}
                  onChange={(e) =>
                    setEditingHospital({
                      ...editingHospital,
                      slottwo: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Slot Three:
                <input
                  className='input input-secondary border-2 border-black rounded-lg ml-2 mb-5'
                  type='number'
                  value={editingHospital ? editingHospital.slotthree : ''}
                  onChange={(e) =>
                    setEditingHospital({
                      ...editingHospital,
                      slotthree: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='col-span-6'>
              <label>
                Count:
                <input
                  className='input input-secondary border-2 border-black rounded-lg ml-2 mb-5'
                  type='text'
                  value={editingHospital ? editingHospital.count : ''}
                  onChange={(e) =>
                    setEditingHospital({
                      ...editingHospital,
                      count: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className='flex justify-center'>
              <button
                className='w-20 h-10 flex justify-center rounded-lg items-center bg-green-400 hover:bg-green-600 border-2 border-dashed border-black mr-2'
                onClick={handleModalSave}
              >
                Save
              </button>
              <button
                className='w-20 h-10 flex justify-center rounded-lg items-center bg-red-400 hover:bg-red-600 border-2 border-dashed border-black'
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
    </div>
  );
}
