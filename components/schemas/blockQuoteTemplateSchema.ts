import { TinaTemplate } from "tinacms";

const blockQuoteTemplateSchema: TinaTemplate = {
  name: "BlockQuote",
  label: "Block Quote",
  fields: [
    {
      name: "children",
      label: "Quote",
      type: "rich-text",
    },
    {
      name: "authorName",
      label: "Author",
      type: "string",
    },
  ],
}

export default blockQuoteTemplateSchema;
