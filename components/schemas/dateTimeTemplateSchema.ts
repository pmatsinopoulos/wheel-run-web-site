import { TinaTemplate } from "tinacms";

const dateTimeTemplateSchema: TinaTemplate = {
  name: "DateTime",
  label: "Date & Time",
  // inline: true,
  fields: [
    {
      name: "format",
      label: "Format",
      type: "string",
      options: ["utc", "iso", "local"],
    },
  ],
}

export default dateTimeTemplateSchema;
