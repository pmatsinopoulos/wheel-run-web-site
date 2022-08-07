import { Post } from "../../components/posts/post";
import { ExperimentalGetTinaClient } from "../../.tina/__generated__/types";
import { useTina } from "tinacms/dist/edit-state";
import { Layout } from "../../components/layout";

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  if (data && data.post) {
    const layoutData = {
      ...data.global,
      parentClassName: "md:mx-8 lg:mx-44 xl:mx-[24rem] 2xl:mx-[32rem]",
      head: {
        title: data.post.title,
        meta: {
          ...data.post.meta,
          og: {
            ...data.post.meta?.og,
            type: 'article',
            image: data.post.heroImg,
            namespace: {
              value: 'article',
              uri: 'https://ogp.me/ns/article',
            },
            customMeta: [
              {
                property: "article:published_time",
                content: data.post.date,
              },
              {
                property: "article:modified_time",
                content: data.post.date,
              },
              {
                property: "article:author",
                content: data.post.author.name,
              },
              {
                property: "article:section",
                content: data.post.section,
              },
              ...(data.post.tags || []).map((tag) => {
                return (
                  {
                    property: "article:tag",
                    content: tag
                  }
                )
              })
            ],
          },
        },
      },
    };
    return (
      <Layout rawData={data} data={layoutData as any}>
        <Post {...data.post} />;
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>;
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const client = ExperimentalGetTinaClient();
  const tinaProps = await client.BlogPostQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths = async () => {
  const client = ExperimentalGetTinaClient();
  const postsListData = await client.postConnection();
  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
