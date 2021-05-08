import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
    token = `bearer ${newToken}`
}
const getAll = async () => {
    const response =  await axios.get(baseUrl)
    return response.data
}

const removeBlog = async (blog) => {
    const response = await axios.delete(`${baseUrl}/${blog.id}`)
    return response.data
}
const postBlog = async (title, author, url, notifBanSetter) => {
    const config = {
        headers: { Authorization: token }
    }
    try {
        await axios
            .post(
                baseUrl,
                {
                    title: title,
                    author: author,
                    url: url
                },
                config
            )
        notifBanSetter(title)
    } catch (error) {
        notifBanSetter(error.response.data.error)
    }
}

const putBlog = async (id, title, author, url, likes) => {
    const config = {
        headers: { Authorization: token }
    }
    try {
        await axios
            .put(
                `${baseUrl}/${id}`,
                {
                    title: title,
                    author: author,
                    url: url,
                    likes: likes
                },
                config
            )
    } catch (error) {
        console.log(error)
    }
}
export default { getAll, postBlog, setToken, putBlog, removeBlog }