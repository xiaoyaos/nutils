import moment from 'moment';

/**
 * 生成指定时间区间内时间间隔
 * @param interval 时间间隔
 * @param startTime 开始时间
 * @param endTime  结束时间
 * @param format 时间格式
 * @returns 
 */
export function DateStep(interval: moment.unitOfTime.DurationConstructor, startTime: string, endTime: string, format = 'YYYY-MM-DD HH:mm:ss') {
  endTime = moment(new Date(endTime)).format(format)
  startTime = moment(new Date(startTime)).format(format)
  let startVal = moment(new Date(startTime)).format(format)
  let dayArr: string[] = [];
  while (moment(startVal).isBefore(endTime)) {
    dayArr.push(startVal)
    // 自增
    startVal = moment(new Date(startVal)).add(1, interval).format(format);
  }
  // 将结束日期的天放进数组
  // if(interval == 'day' || interval == 'days'){
  dayArr.push(moment(new Date(endTime)).format(format))
  // }
  return dayArr
}