import * as React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";

export const ImageTextSection = ({ data, parentField }) => {
  const theme = useTheme();
  const headlineColorClasses = {
    blue: "from-blue-400 to-blue-600",
    teal: "from-teal-400 to-teal-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-300 to-orange-600",
    yellow: "from-yellow-400 to-yellow-600",
  };

  return (
    <Section color={data.color}>
      <Container
        size="large"
        className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-8 items-center justify-center"
      >
        {data.image && (
          <div
            data-tinafield={`${parentField}.image`}
            className="row-start-1 flex justify-center"
          >
            <img
              className="w-full max-w-xs lg:max-w-none h-auto"
              alt={data.image.alt}
              src={data.image.src}
            />
          </div>
        )}
        <div className="row-start-2 lg:row-start-1 lg:col-start-1 lg:col-end-3 text-center lg:text-left">
          {data.headline && (
            <h2
              data-tinafield={`${parentField}.headline`}
              className={`w-full relative	mb-10 text-5xl font-extrabold tracking-normal leading-tight title-font`}
            >
              <span
                className={`${data.color === "primary" ? "prose-primary" : "prose-gray"}`}
              >
                {data.headline}
              </span>
            </h2>
          )}
          {data.text && (
            <div
              data-tinafield={`${parentField}.text`}
              className={`prose prose-lg mx-auto lg:mx-0 mb-10 ${data.color === "primary" ? `prose-primary` : `dark:prose-dark`
                }`}
            >
              <TinaMarkdown content={data.text} />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export const imageTextSectionSchema: TinaTemplate = {
  name: "imageTextSection",
  label: "Image Text Section",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      label: "Text",
      name: "text",
      type: "rich-text",
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
