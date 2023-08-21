import "./InputAgeForm.css"
import arrow from "./images/arrow.svg"
import { useState } from "react";

const InputAgeForm = (props) => {
    let flag = true;
    const validity = {
        d: false,
        y: false,
        m: false,
        ed: false,
        ey: false,
        em: false
    }

    const [enteredDay, setEnteredDay] = useState('');
    const [enteredYear, setEnteredYear] = useState('');
    const [enteredMonth, setEnteredMonth] = useState('');
    const [dayError, setDayError] = useState('');
    const [monthError, setMonthError] = useState('');
    const [yearError, setYearError] = useState('');

    const isValid = (day, month, year, currentYear) => {
        if (typeof(day) === 'string') {
            validity['ed'] = true;
        }
        if (typeof(month) === 'string') {
            validity['em'] = true;
        }
        if (typeof(year) === 'string') {
            validity['ey'] = true;
        }

        if( month < 1 || month > 12){
            validity['m'] = true;
        }

        if( day < 1 || day > 31 ){
            validity['d'] = true;
        }

        if( year < 1 || year > currentYear){
            validity['y'] = true;
        }
        
        if (
            (month === 4 || month === 6 || month === 9 || month === 11) && day > 30 ||
            (month === 2 && (day > 29 || (day > 28 && !isLeapYear(year))))
        ) {
            validity['m'] = true;
            validity['d'] = true;
        }

        for(const key in validity) {
            const value = validity[key];
            if(value === true){
                flag = false;
                if(key === 'd'){
                    setDayError("Must be a valid day");
                }
                if(key === 'y'){
                    setYearError('Must be a valid year');
                }
                if(key === 'm'){
                    setMonthError('Must be a valid month');
                }
                if(key === 'ed'){
                    setDayError('This field is required');
                }
                if(key === 'ey'){
                    setYearError('This field is required');
                }
                if(key === 'em'){
                    setMonthError('This field is required');
                }
            }
        }

        return flag;
    };

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };


    const handleValidation = (event) => {
        event.preventDefault();

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        if(isValid(enteredDay,enteredMonth,enteredYear,currentYear)){
            const data = {
                day: enteredDay,
                month: enteredMonth,
                year: enteredYear
            }

            props.onSubmitForm(data);

            setEnteredDay('');
            setEnteredMonth('');
            setEnteredYear('');
        }
    
    }


    return (
        <form onSubmit={handleValidation}>
            <div className="inputs">
                <div className="inputField">
                    <label className={dayError ? 'alert' : ''}>DAY</label>
                    <input className={dayError ? 'red-border' : ''} title="day" type="number" placeholder="DD"  value={enteredDay}
                        onChange={(e) => 
                        {
                            setEnteredDay(Number(e.target.value))
                            setDayError('');
                        }}/>
                     {dayError && <p>{dayError}</p>}
                </div>
                <div className="inputField">
                    <label className={monthError ? 'alert' : ''}>MONTH</label>
                    <input className={monthError ? 'red-border' : ''} title="month" type="number" placeholder="MM" value={enteredMonth}
                        onChange={(e) => 
                        {setEnteredMonth(Number(e.target.value))
                         setMonthError('');  
                        }}/>
                    {monthError && <p>{monthError}</p>}
                </div>
                <div className="inputField">
                    <label className={yearError ? 'alert' : ''}>YEAR</label>
                    <input className={yearError ? 'red-border' : ''} title="year" type="number" placeholder="YYYY" value={enteredYear}
                        onChange={(e) => 
                        {setEnteredYear(Number(e.target.value))
                         setYearError('');
                        }}/>
                    {yearError && <p>{yearError}</p>}
                </div> 
            </div>
            <div className="formFooter">
                <hr />
                <button type="submit">
                    <img src={arrow} alt="Submit" />
                </button>
            </div>
        </form>
    );
}

export default InputAgeForm;