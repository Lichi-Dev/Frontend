import axios from "axios";

export const fetchPhotos = async () => {
  const keywords = [
    "nature",
    "technology",
    "people",
    "sports",
    "food",
    "travel",
    "animals",
    "architecture",
    "fashion",
  ];
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

  const API_KEY = "44294603-e2d1624ed7cac68d22e96c668";
  const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${randomKeyword}&image_type=photo&per_page=9`;

  const response = await axios.get(API_URL);
  console.log(response);
  return response.data.hits;
};
