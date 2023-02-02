// Function to create avatar(short name) from name
export const avatarName = (name) => {
  const avatar = name
    .slice()
    .split(" ")
    .map((item) => item[0])
    .join("");
  return avatar;
};

// Function to generate dynamic endpoint url
export const useApiEndpoint = (data) => {
  const { builderId, userId, endpointKey, isFormData = false } = data;
  const endpoint = isFormData
    ? `${process.env.REACT_APP_DB_URL}/users/${userId}/resume/${builderId}/${endpointKey}.json`
    : `${process.env.REACT_APP_DB_URL}/users/${userId}/${endpointKey}.json`;

  return endpoint;
};

// Flatten Firebase response
export const flattenResponse = (data) => {
  const result = Object.entries(data).map((item) => {
    return { ...item[item.length - 1], id: item[0] };
  });

  return result;
};

// Checks if an object is empty
export const isEmptyObj = (obj) => Object.keys(obj).length === 0;
// Checks if an array is empty
export const isEmptyArray = (arr) => arr.length === 0;

// Get Years
export const getYears = function (startYear = 1980) {
  const currentYear = new Date().getFullYear();
  let years = [];
  while (startYear <= currentYear) {
    years.push("" + startYear++);
  }
  return years;
};

// Get Months
export const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];
