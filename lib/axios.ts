import axios from "axios"

async function getData() {
  try {
    const response = await axios.get("https://khemrajfekar.in/api/usersdata")
    return response.data.posts
  } catch (error) {
    console.log(error)
  }
}
export default getData
