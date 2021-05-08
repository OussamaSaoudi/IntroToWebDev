import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, handleLike, handleRemove }) => {
    Blog.proptypes = {
        blog: PropTypes.object.isRequired,
        handleLike: PropTypes.func.isRequired,
        handleRemove: PropTypes.func.isRequired
    }
    const [showFull, setShowFull] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const showFullDiv = { ...blogStyle, display: showFull ? '' : 'none' }
    const hideFullDiv = { ...blogStyle, display: showFull ? 'none' : '' }
    return (
        <div>
            <div style={showFullDiv}>
                {blog.title}  <br/>
                {blog.url}<br/>
                likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button> <br/>
                {blog.author}<br/>
                <button onClick={() => handleRemove(blog)}>remove</button>
                <button onClick={() => setShowFull(!showFull)}>view</button>
            </div>
            <div style={hideFullDiv}>
                {blog.title}:
                <button onClick={() => setShowFull(!showFull)}>view</button>
            </div>
        </div>
    )}

export default Blog