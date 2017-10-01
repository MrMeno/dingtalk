
import tools from './tools.js'

import arrow from './arrow.js'

import util from './util.js'

let firstweekday = 1

let week_lang = ['日', '一', '二', '三', '四', '五', '六']

function isLeapYear( year ) {
    return ( ( ( year % 4 ) == 0 ) && ( ( year % 100 ) != 0 ) || ( ( year % 400 ) == 0 ) )
}
function getDaysInMonth( year,month) {
    let days
    if ( month in [ 1, 3, 5, 7, 8, 10, 12 ] ) {
        days = tools.mathClass.range( 31 )
    } else if ( month in [ 4, 6, 9, 11 ] ) {
        days = tools.mathClass.range( 30 )
    } else if ( month == 2 && isLeapYear( year ) ) {
        days = tools.mathClass.range( 29 );
    } else {
        days = tools.mathClass.range( 28 );
    }
    return days;
}

function getweekheader(){
    return weekdays().map(function(i){ return week_lang[i]})
}
function weekdays() {
    let i = null
    return tools.mathClass.range(firstweekday,firstweekday + 7 ).map( function( i ) {
        return i % 7
    })
}

function monthdates( year, month ) {
        let local_month = month - 1
        let date = new Date( year, local_month, 1 )
        let loop = true
        let days = ( date.getDay() -firstweekday ) % 7
        let days_amount = getDaysInMonth( year, month )
        let _max_deep = (days != -1)&&(days < 5 || ( days >= 5 && days_amount < 31 ) )? 35 : 42
       if ( days==-1 )
            days =6 
        date = arrow.arrow.get( date ).replace( { days: -days }).get_date()
        let date_queue = []
        let counter = 0
        while( loop ) {
            try {
                if ( counter >= _max_deep ) { break }
                date_queue.push( date )
                date = arrow.arrow.get( date ).replace( { days: 1 }).get_date()

            } catch( e ) {
                break
            }
            counter++
        }
        return date_queue      
    }
  export function monthdayscalendar(params, result, cb) {
        let year_t = params.year, month_t = params.month
        let date_queue = monthdates( year_t, month_t).map( function(date) {
            let dat = [ date.getDay()]
            if ( date.getMonth() != month_t - 1 ) {
                dat.unshift( 0 )
            } else {
                dat.unshift( date.getDate() )
                dat.push(result[date.getDate()-1])
            }
            return dat
        })
        let daysPerMonth = tools.mathClass.range(0, date_queue.length, 7).map(function(x) {
            return date_queue.slice(x, x + 7)
        })
        let cal1 =  {
                year: parseInt(year_t),
                month: parseInt(month_t),
                calendar: {
                    days: getweekheader(),
                    weeks: daysPerMonth
                }
            }
        typeof cb == "function" && cb(cal1)
    }
