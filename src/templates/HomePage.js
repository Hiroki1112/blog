import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import PostSection from '../components/PostSection'
import PostCategoriesNav from '../components/PostCategoriesNav'


export const byDate = posts => {
  const now = Date.now()
  return posts.filter(post => Date.parse(post.date) <= now)
}

export const byCategory = (posts, title, contentType) => {
  const isCategory = contentType === 'postCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title,
  subtitle,
  featuredImage,
  posts = [],
  postCategories = [],
  enableSearch = true,
  contentType }) => (
    <Location>
    {({ location }) => {
      let filteredPosts =
        posts && !!posts.length
          ? byCategory(byDate(posts), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
          post.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="Blog">
          <PageHeader
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!postCategories.length && (
            <section className="section thin">
              <div className="container">
                <PostCategoriesNav enableSearch categories={postCategories} />
              </div>
            </section>
          )}

          {!!posts.length && (
            <section className="section">
              <div className="container">
                <PostSection posts={filteredPosts} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page, posts, postCategories } }) => (
  <Layout
  meta={page.frontmatter.meta || false}
  title={page.frontmatter.title || false}
>
  <HomePageTemplate
    {...page}
    {...page.fields}
    {...page.frontmatter}
    posts={posts.edges.map(post => ({
      ...post.node,
      ...post.node.frontmatter,
      ...post.node.fields
    }))}
    postCategories={postCategories.edges.map(post => ({
      ...post.node,
      ...post.node.frontmatter,
      ...post.node.fields
    }))}
  />
</Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for BlogIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        excerpt
        template
        subtitle
        featuredImage
      }
    }

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    postCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "postCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

