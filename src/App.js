import './App.css';
import InputAgeForm from './InputAgeForm';
import DateDisplay from './DateDisplay';
import { useState } from 'react';

function App() {
  const [dateData, setDateData] = useState(null);

  const getDateData = (data) => {
    setDateData(data);
  }

  return (
    <div className='card'>
        <InputAgeForm onSubmitForm = {getDateData}/>
        <DateDisplay data = {dateData}/>
    </div>
  );
}

export default App;
