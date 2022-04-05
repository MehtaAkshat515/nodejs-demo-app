
import path from 'path';
const __dirname = path.resolve();

// show html page
export const home = (req, res) => {
    //show this file when the "/" is requested
    res.sendFile(__dirname+"/source/pages/home.html");
}
// get today's date
export const getTodayDate = (req, res) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day+ "/" + month + "/" + year;

    res.json({
        today: newdate
    });
}
// get list of month names
export const getMonthsName = (req, res) => {
    res.json({
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    });
}

export const getPeople = (req, res) => {
    res.json([
        {
            FirstName: 'Akshat',
            LastName: 'Mehta',
            title: 'Devops Engineer'
        },
        {
            FirstName: 'Dishant',
            LastName: 'Lodaliya',
            title: 'Software Developer'
        },
        {
            FirstName: 'Jeet',
            LastName: 'Sodha',
            title: 'Web Developer'
        }
    ]);
}
