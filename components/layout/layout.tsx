import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "./header";
import { Footer } from "./footer";
import layoutData from "../../content/global/index.json";
import { Theme } from "./theme";

export const Layout = ({ rawData = {}, data = layoutData, children }) => {
  const router = useRouter();

  const headTitle = [data.head.title, data.header.brand].join(' - ')
  const headDescription = data.head.meta.description
  const ogPrefix = [
    'og',
    'https://ogp.me/ns#',
    data.head.meta.og.namespace?.value,
    data.head.meta.og.namespace?.uri
  ].join(': ')
  const ogType = data.head.meta.og.type
  const customOgMeta = data.head.meta.og.customMeta
  const ogImage = data.head.meta.og.image
  const ogUrl = `https://www.wheelrun.biz${router.asPath}`

  return (
    <>
      <Head>
        <html lang="en" prefix={ogPrefix}/>
        <title>{headTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={headDescription} />

        {/* ------- Open Graph Protocol ----------*/}
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={headTitle} />
        <meta property="og:description" content={headDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        {customOgMeta && (
          customOgMeta.map((customOgMetaItem, index) => {
            return (
              <meta property={customOgMetaItem.property} content={customOgMetaItem.content} key={`${customOgMetaItem.property}-${index}`}/>
            )
          })
        )}

        {/* ------- Twitter Metadat ----------*/}
        <meta property="twitter:title" content={headTitle} />
        <meta property="twitter:description" content={headDescription} />
        <meta property="twitter:card" content={ogImage} />

        {data.theme.font === "nunito" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {data.theme.font === "lato" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
              rel="stylesheet"
            />
          </>
        )}
      </Head>
      <Theme data={data?.theme}>
        <div
          className={`min-h-screen flex flex-col ${
            data.theme.font === "nunito" && "font-nunito"
          } ${data.theme.font === "lato" && "font-lato"} ${
            data.theme.font === "sans" && "font-sans"
          }`}
        >
          <Header data={data?.header} />
          <div className="flex-1 text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 flex flex-col">
            {children}
          </div>
          <Footer
            rawData={rawData}
            data={data?.footer}
            icon={data?.header.icon}
          />
        </div>
      </Theme>
    </>
  );
};
