import Head from 'next/head';

import { siteMetadata } from '~/config/site-metadata';

interface IMetaTags {
  name?: string;
  property?: string;
  content: string;
}

interface ISeoProps {
  description?: string;

  meta?: IMetaTags[];
  title: string;
}

function Seo({ description, meta, title }: ISeoProps): JSX.Element {
  const metaDescription = description || siteMetadata.description;

  let metaTags: IMetaTags[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];

  metaTags = meta ? [...metaTags, ...meta] : [...metaTags];

  return (
    <Head>
      <link rel="icon" href="/favicon.svg" />
      {metaTags.map(({ name, content, property }) => (
        <meta key={name} name={name} property={property} content={content} />
      ))}
      <title>{`${title} :: ${siteMetadata.title}`}</title>
    </Head>
  );
}

Seo.defaultProps = {
  meta: [],
  description: ``,
};

export default Seo;
