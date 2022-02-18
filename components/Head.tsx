import NextHead from "next/head";

type Props = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

const Head = (props: Props) => {
  const pageTitle = props.title ? `${props.title} - InDaWeb` : "InDaWeb";
  const pageDescription =
    props.description || "This is a blog created with Next.js and GraphCMS";
  const pageImageUrl =
    props.imageUrl || "https://indawebblog.vercel.app/site.png";

  return (
    <NextHead>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} key="desc" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImageUrl} />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
