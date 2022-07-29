import * as React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import OptionalLinkWrapper from "../util/optionalLinkWrapper";

const Column = ({ column, parentField }) => {
  return (
    <div className="pr-2">
      <h3
        data-tinafield={`${parentField}.title`}
        className="text-2xl font-semibold title-font mb-3"
      >
        {column.headline}
      </h3>
      <p data-tinafield={`${parentField}.text`} className="text-base opacity-80 leading-relaxed mb-2">
        {column.text}
      </p>
      {column.image && (
        <div className="h-20">
          <OptionalLinkWrapper hyperlink={column.image.hyperlink}>
            <img className="h-full" src={column.image.src} alt={column.image.alt} />
          </OptionalLinkWrapper>
        </div>
      )}
    </div>
  )
}

export const TwoColumnsContent = ({ data, parentField }) => {
  return (
    <Section id={data.id} color={data.color}>
      <Container
        size="large"
        className="gap-x-10 gap-y-8 items-center justify-center"
      >
        {data.headline && (
          <div>
            <h2
              id={data.id}
              data-tinafield={`${parentField}.headline`}
              className={`w-full relative	mb-10 text-5xl font-extrabold tracking-normal leading-tight title-font`}
            >
              <span
                className={`${data.color === "primary" ? "prose-primary" : "prose-gray"}`}
              >
                {data.headline}
              </span>
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {data.firstColumn && (
            <Column column={data.firstColumn} parentField={parentField} />
          )}

          {data.secondColumn && (
            <Column column={data.secondColumn} parentField={parentField} />
          )}
        </div>
      </Container>
    </Section >
  );
};

export const twoColumnsContentBlockSchema: TinaTemplate = {
  name: "twoColumnsContent",
  label: "Two Columns Content",
  ui: {
    defaultItem: {
      sectionLabel: "Two Columns Content",
    },
    itemProps: (item) => {
      return {
        label: item?.sectionLabel,
      };
    }
  },
  fields: [
    {
      type: "string",
      label: "Section Label",
      name: "sectionLabel",
    },
    {
      label: "id",
      type: "string",
      name: "id"
    },
    {
      label: "Headline",
      type: "string",
      name: "headline",
    },
    {
      label: "First Column",
      type: "object",
      name: "firstColumn",
      fields: [
        {
          label: "Headline",
          name: "headline",
          type: "string"
        },
        {
          label: "Text",
          name: "text",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          label: "Image with Optional Hyperlink",
          name: "image",
          type: "object",
          fields: [
            {
              label: "Src",
              type: "image",
              name: "src"
            },
            {
              label: "Alt Text",
              type: "string",
              name: "alt"
            },
            {
              label: "Hyperlink",
              type: "string",
              name: "hyperlink"
            }
          ]
        }
      ]
    },
    {
      label: "Second Column",
      type: "object",
      name: "secondColumn",
      fields: [
        {
          label: "Headline",
          name: "headline",
          type: "string"
        },
        {
          label: "Text",
          name: "text",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          label: "Image with Optional Hyperlink",
          name: "image",
          type: "object",
          fields: [
            {
              label: "Src",
              type: "image",
              name: "src"
            },
            {
              label: "Alt Text",
              type: "string",
              name: "alt"
            },
            {
              label: "Hyperlink",
              type: "string",
              name: "hyperlink"
            }
          ]
        }
      ]
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
