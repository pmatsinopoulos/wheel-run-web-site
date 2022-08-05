import { TinaTemplate } from "tinacms";
import blockQuoteTemplateSchema from "./blockQuoteTemplateSchema";
import dateTimeTemplateSchema from "./dateTimeTemplateSchema";
import gistCodeBlockTemplateSchema from "./gistCodeBlockTemplateSchema";
import newsLetterSignupTemplateSchema from "./newsLetterSignupTemplateSchema";

const richTextTemplatesSchemas: TinaTemplate[] = [
  blockQuoteTemplateSchema,
  dateTimeTemplateSchema,
  gistCodeBlockTemplateSchema,
  newsLetterSignupTemplateSchema,
]

export default richTextTemplatesSchemas;
