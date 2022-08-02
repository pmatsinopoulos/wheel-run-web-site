import { TinaTemplate } from "tinacms";
import blockQuoteTemplateSchema from "./blockQuoteTemplateSchema";
import dateTimeTemplateSchema from "./dateTimeTemplateSchema";
import newsLetterSignupTemplateSchema from "./newsLetterSignupTemplateSchema";

const richTextTemplatesSchemas: TinaTemplate[] = [
  dateTimeTemplateSchema,
  blockQuoteTemplateSchema,
  newsLetterSignupTemplateSchema,
]

export default richTextTemplatesSchemas;
