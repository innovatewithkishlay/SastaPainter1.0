import React from 'react';
import BlogSection from '../components/BlogSection';

const BlogPage = () => {
    return (
        <div className="blog-page" style={{ paddingTop: '80px', minHeight: '100vh', background: '#fff' }}>
            <BlogSection />
        </div>
    );
};

export default BlogPage;
