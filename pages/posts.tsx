import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts } from "../components/posts";
import { ExperimentalGetTinaClient } from "../.tina/__generated__/types";
import { useTina } from "tinacms/dist/edit-state";
import { Layout } from "../components/layout";
import { Hero } from "../components/blocks/hero";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const posts = props.data.postConnection.edges;

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const layoutData = {
    ...props.data.global,
    head: {
      title: 'Blog',
      meta: {
        description: 'Tech and Industry Blog Posts',
        og: {
          type: 'website',
          image: 'https://res.cloudinary.com/oneth0usandwords/image/upload/v1659474047/wheel-run/production/website/automobile-1-beatle_gkoetg.jpg',
        },
      },
    },
    header: {
      ...data.global.header,
      brand: 'Wheel Run',
    },
  };

  const heroData = {
    id: 'blog-post-hero-section',
    color: "primary",
    image:  {
      src: layoutData.head.meta.og.image,
      alt: 'Old Beatle Car with Funcy Colors',
    },
    tagline: "Knowledge Base",
    headline: "BLOG POSTS",
  };

  const parentField = {

  };

  return (
    <Layout data={layoutData as any}>
      <Section className="flex-1">
        <Container size="large">
          <Hero data={heroData} parentField={parentField} />
          <Posts data={posts} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const client = ExperimentalGetTinaClient();
  const tinaProps = await client.PageQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
