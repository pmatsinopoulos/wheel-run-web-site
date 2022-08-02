import React from "react";
import type { TinaTemplate } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../util/section";
import { Container } from "../util/container";
import components from "../util/components";
import dateTimeTemplateSchema from "../schemas/dateTimeTemplateSchema";
import blockQuoteTemplateSchema from "../schemas/blockQuoteTemplateSchema";
import newsLetterSignupTemplateSchema from "../schemas/newsLetterSignupTemplateSchema";

export const Content = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color} id={data.id}>
      <Container
        className={`max-w-4xl prose prose-lg ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
      >
        <TinaMarkdown components={components} content={data.body} />
      </Container>
    </Section>
  );
};

export const contentBlockSchema: TinaTemplate = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      sectionLabel: "Content",
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
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
      type: "string",
      label: "id",
      name: "id",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
      templates: [
        dateTimeTemplateSchema,
        blockQuoteTemplateSchema,
        newsLetterSignupTemplateSchema,
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
