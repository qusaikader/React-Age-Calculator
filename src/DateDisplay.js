import { useState , useEffect } from "react";
import "./DateDisplay.css"

const DateDisplay = (props) => {
    const [yearVal, setYearVal] = useState(null);
    const [monthVal, setMonthVal] = useState(null);
    const [dayVal, setDayVal] = useState(null);

    const calculateAge = (birthdate) => {
        const currentDate = new Date();
        const birthDate = new Date(birthdate.year, birthdate.month - 1 , birthdate.day);

        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const birthMonth = birthDate.getMonth();
        console.log(currentMonth);
        console.log(birthMonth);

        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        const yearDiff = age;

        let monthDiff
        if(currentMonth < birthMonth && currentDate.getDate() < birthDate.getDate()){
             monthDiff = 11 + currentMonth - birthMonth ;
        }else if(currentMonth < birthMonth && (currentDate.getDate() > birthDate.getDate() || currentDate.getDate() == birthDate.getDate())){
            monthDiff = 12 + currentMonth - birthMonth;
        } else if(currentMonth > birthMonth && currentDate.getDate() < birthDate.getDate() ){
            monthDiff = currentMonth - birthMonth - 1;
        }else if(currentMonth > birthMonth && (currentDate.getDate() > birthDate.getDate() || currentDate.getDate() == birthDate.getDate())){
            monthDiff = currentMonth - birthMonth;
        }else if(currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate()){
            monthDiff = currentMonth + 1+ (10 - birthMonth);
        }else if(currentMonth === birthMonth && (currentDate.getDate() > birthDate.getDate() || currentDate.getDate() == birthDate.getDate())){
            monthDiff = 0;
        }

        let dayDiff;
        if (currentDate.getDate() < birthDate.getDate()) {
            const daysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            dayDiff = currentDate.getDate() + (daysInCurrentMonth- birthDate.getDate());
        } else {
            dayDiff = currentDate.getDate() - birthDate.getDate();
        }

        return {
            years: yearDiff,
            months: monthDiff,
            days: dayDiff
        };
    };

    const ageData = props.data ? calculateAge(props.data) : null;

    useEffect(() => {
        if (ageData) {
            const interval = setInterval(() => {
                if (yearVal < ageData.years) {
                    setYearVal((prevYear) => prevYear + 1);
                }else if( yearVal > ageData.years){
                    setYearVal((prevYear) => prevYear - 1)
                }
                if (monthVal < ageData.months) {
                    setMonthVal((prevMonth) => prevMonth + 1);
                }
                else if(monthVal > ageData.months){
                    setMonthVal((prevMonth) => prevMonth - 1);
                }
                if (dayVal < ageData.days) {
                    setDayVal((prevDay) => prevDay + 1);
                }
                else if (dayVal > ageData.days) {
                    setDayVal((prevDay) => prevDay - 1);
                }
            }, 100); 
            return () => clearInterval(interval);
        }
    }, [ageData, yearVal, monthVal, dayVal]);

    return (
        <div className="date-card">
            <div className="displayField">
                {ageData ?  <h1 className="val">{yearVal}</h1>:  <h1 className="val">--</h1>}
                <h1 className="title">years</h1>
            </div>
            <div className="displayField">
                {ageData ?  <h1 className="val">{monthVal}</h1>:  <h1 className="val">--</h1>}
                <h1 className="title">months</h1>
            </div>
            <div className="displayField">
                {ageData ?  <h1 className="val">{dayVal}</h1>:  <h1 className="val">--</h1>}
                <h1 className="title">days</h1>
            </div>
        </div>
    );

}

export default DateDisplay;