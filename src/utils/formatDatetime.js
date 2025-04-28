export function formatDateTimeVN(dateString) {
  const date = new Date(dateString);

  // Chuyển sang giờ Việt Nam (GMT+7)
  const options = {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const parts = new Intl.DateTimeFormat('vi-VN', options).formatToParts(date);

  let day, month, year, hour, minute;
  for (const part of parts) {
    if (part.type === 'day') day = part.value;
    if (part.type === 'month') month = part.value;
    if (part.type === 'year') year = part.value;
    if (part.type === 'hour') hour = part.value;
    if (part.type === 'minute') minute = part.value;
  }

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

