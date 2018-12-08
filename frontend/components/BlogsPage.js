import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Blog from "./blogsPage/Blog";
import Pagination from "./Pagination";
import { perPage } from "../config";

const ALL_BLOGS_QUERY = gql`
  query ALL_BLOGS_QUERY($skip: Int = 0, $first: Int = ${perPage} ) {
    blogs(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      name
      email
      subject
      message
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const BlogsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Blogs extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        <Query
          query={ALL_BLOGS_QUERY}
          variables={{
            skip: this.props.page * perPage - perPage
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <BlogsList>
                {data.blogs.map(blog => (
                  <Blog blog={blog} key={blog.id} />
                ))}
              </BlogsList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default Blogs;
export { ALL_BLOGS_QUERY };
