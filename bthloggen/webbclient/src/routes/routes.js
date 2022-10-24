const routes = {
    getData: function getData() {
        return "http://localhost:1337/data";
    },
    getDataByIP: function getDataByIP(ip) {
        return "http://localhost:1337/data?ip="+ip;
    },
    getDataByUrl: function getDataByUrl(url) {
        return "http://localhost:1337/data?url="+url;
    },
    getDataByDay: function getDataByDay(day) {
        return "http://localhost:1337/data?day="+day;
    },
    getDataByMonth: function getDataByMonth(month) {
        return "http://localhost:1337/data?month="+month;
    },
    getDataByTime: function getDataByTime(time) {
        return "http://localhost:1337/data?time="+time;
    },
    getDataByDayTime: function getDataByDayTime(dayTime) {
        return "http://localhost:1337/data?day="+dayTime;
    },
    getDataByMonthDayTime: function getDataByMonthDayTime(monthDayTime) {
        return "http://localhost:1337/data?month="+monthDayTime;
    },
};

module.exports = routes;

