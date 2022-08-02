import React from "react";
import { defineSchema, defineConfig, wrapFieldsWithMeta, TinaTemplate, TinaField } from "tinacms";
import { contentBlockSchema } from "../components/blocks/content";
import { twoColumnsContentBlockSchema } from "../components/blocks/twoColumnsContent";
import { featureBlockSchema } from "../components/blocks/features";
import { heroBlockSchema } from "../components/blocks/hero";
import { imageTextSectionSchema } from "../components/blocks/imageTextSection";
import { testimonialBlockSchema } from "../components/blocks/testimonial";
import { iconSchema } from "../components/util/icon";
import dateTimeTemplateSchema from "../components/schemas/dateTimeTemplateSchema";
import blockQuoteTemplateSchema from "../components/schemas/blockQuoteTemplateSchema";
import newsLetterSignupTemplateSchema from "../components/schemas/newsLetterSignupTemplateSchema";

const metaSchema: TinaField = {
  type: "object",
  label: "meta",
  name: "meta",
  fields: [
    {
      type: "string",
      label: "description",
      name: "description",
    },
    {
      type: "object",
      label: "og",
      name: "og",
      fields: [
        {
          label: "type",
          name: "type",
          type: "string",
        },
        {
          label: "image",
          name: "image",
          type: "image",
        },
        {
          type: "object",
          label: "namespace",
          name: "namespace",
          fields: [
            {
              type: "string",
              name: "value",
              label: "value",
            },
            {
              type: "string",
              name: "uri",
              label: "uri",
            }
          ]
        },
        {
          label: "Custom Meta",
          name: "customMeta",
          type: "object",
          list: true,
          fields: [
            {
              type: "string",
              name: "property",
              label: "Property",
            },
            {
              type: "string",
              name: "content",
              label: "Content"
            },
          ],
        },
      ],
    },
  ],
};

const schema = defineSchema({
  config: {
    media: {
      // If you wanted cloudinary do this
      loadCustomStore: async () => {
        const pack = await import("next-tinacms-cloudinary");
        return pack.TinaCloudCloudinaryMediaStore;
      },
      // this is the config for the tina cloud media store
      // tina: {
      //   publicFolder: "public",
      //   mediaRoot: "uploads",
      // },
    },
  },
  collections: [
    {
      label: "Blog Posts",
      name: "post",
      path: "content/posts",
      format: "mdx",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          isTitle: true,
          required: true,
        },
        {
          type: "image",
          name: "heroImg",
          label: "Hero Image",
        },
        {
          type: "rich-text",
          label: "Excerpt",
          name: "excerpt",
        },
        {
          type: "reference",
          label: "Author",
          name: "author",
          collections: ["author"],
        },
        {
          type: "datetime",
          label: "Posted Date",
          name: "date",
          ui: {
            dateFormat: "MMMM DD YYYY",
            timeFormat: "hh:mm A",
          },
        },
        {
          type: "string",
          label: "Section",
          name: "section",
        },
        {
          type: "string",
          label: "Tags",
          name: "tags",
          list: true
        },
        {
          type: "rich-text",
          label: "Body",
          name: "_body",
          templates: [
            dateTimeTemplateSchema,
            blockQuoteTemplateSchema,
            newsLetterSignupTemplateSchema,
          ],
          isBody: true,
        },
        metaSchema,
      ],
    },
    {
      label: "Global",
      name: "global",
      path: "content/global",
      format: "json",
      fields: [
        {
          type: "object",
          label: "head",
          name: "head",
          ui: {
            parse: () => '',
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <strong>head</strong> fields take their values dynamically
                </div>
              )
            }),
          },
          fields: [
            {
              type: "string",
              label: "title",
              name: "title",
            },
            {
              type: "object",
              label: "meta",
              name: "meta",
              fields: [
                {
                  type: "string",
                  label: "description",
                  name: "description",
                },
              ]
            },
          ]
        },
        {
          type: "object",
          label: "Header",
          name: "header",
          fields: [
            iconSchema,
            {
              type: "string",
              label: "Brand",
              name: "brand",
              options: ["Wheel Run"],
            },
            {
              type: "string",
              label: "Color",
              name: "color",
              options: [
                { label: "Default", value: "default" },
                { label: "Primary", value: "primary" },
              ],
            },
            {
              type: "object",
              label: "Nav Links",
              name: "nav",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.label };
                },
                defaultItem: {
                  href: "home",
                  label: "Home",
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Link",
                  name: "href",
                },
                {
                  type: "string",
                  label: "Label",
                  name: "label",
                },
              ],
            },
          ],
        },
        {
          type: "object",
          label: "Footer",
          name: "footer",
          fields: [
            {
              type: "string",
              label: "Color",
              name: "color",
              options: [
                { label: "Default", value: "default" },
                { label: "Primary", value: "primary" },
              ],
            },
            {
              type: "object",
              label: "Social Links",
              name: "social",
              fields: [
                {
                  type: "string",
                  label: "Facebook",
                  name: "facebook",
                },
                {
                  type: "string",
                  label: "Twitter",
                  name: "twitter",
                },
                {
                  type: "string",
                  label: "LinkedIn",
                  name: "linkedin",
                },
                {
                  type: "string",
                  label: "Github",
                  name: "github",
                },
              ],
            },
            {
              type: "boolean",
              label: "View Raw Data Button",
              name: "viewRawDataButton",
            },
          ],
        },
        {
          type: "object",
          label: "Theme",
          name: "theme",
          fields: [
            {
              type: "string",
              label: "Primary Color",
              name: "color",
              options: [
                {
                  label: "Blue",
                  value: "blue",
                },
                {
                  label: "Teal",
                  value: "teal",
                },
                {
                  label: "Green",
                  value: "green",
                },
                {
                  label: "Red",
                  value: "red",
                },
                {
                  label: "Pink",
                  value: "pink",
                },
                {
                  label: "Purple",
                  value: "purple",
                },
                {
                  label: "Orange",
                  value: "orange",
                },
                {
                  label: "Yellow",
                  value: "yellow",
                },
              ],
            },
            {
              type: "string",
              name: "font",
              label: "Font Family",
              options: [
                {
                  label: "System Sans",
                  value: "sans",
                },
                {
                  label: "Nunito",
                  value: "nunito",
                },
                {
                  label: "Lato",
                  value: "lato",
                },
              ],
            },
            {
              type: "string",
              name: "icon",
              label: "Icon Set",
              options: [
                {
                  label: "Boxicons",
                  value: "boxicon",
                },
                {
                  label: "Heroicons",
                  value: "heroicon",
                },
              ],
            },
            {
              type: "string",
              name: "darkMode",
              label: "Dark Mode",
              options: [
                {
                  label: "System",
                  value: "system",
                },
                {
                  label: "Light",
                  value: "light",
                },
                {
                  label: "Dark",
                  value: "dark",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Authors",
      name: "author",
      path: "content/authors",
      format: "md",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Avatar",
          name: "avatar",
        },
      ],
    },
    {
      label: "Pages",
      name: "page",
      path: "content/pages",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "Sections",
          ui: {
            visualSelector: true,
          },
          templates: [
            imageTextSectionSchema,
            heroBlockSchema,
            featureBlockSchema,
            contentBlockSchema,
            twoColumnsContentBlockSchema,
            testimonialBlockSchema,
          ],
        },
        metaSchema
      ],
    },
  ],
});

const branch = "main";
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

export const tinaConfig = defineConfig({
  apiURL,
  schema,
  cmsCallback: (cms) => {
    /**
     * Enables experimental branch switcher
     */
    cms.flags.set("branch-switcher", true);

    /**
     * When `tina-admin` is enabled, this plugin configures contextual editing for collections
     */
    import("tinacms").then(({ RouteMappingPlugin }) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        if (["author", "global"].includes(collection.name)) {
          return undefined;
        }
        if (["page"].includes(collection.name)) {
          if (document._sys.filename === "home") {
            return `/`;
          }
          if (document._sys.filename === "about") {
            return `/about`;
          }
          if (document._sys.filename === "contact") {
            return `/contact`;
          }
          return undefined;
        }
        return `/${collection.name}/${document._sys.filename}`;
      });
      cms.plugins.add(RouteMapping);
    });

    return cms;
  },
  formifyCallback: ({ formConfig, createForm, createGlobalForm }) => {
    if (formConfig.id === "content/global/index.json") {
      return createGlobalForm(formConfig);
    }

    return createForm(formConfig);
  },
});

export default schema;
