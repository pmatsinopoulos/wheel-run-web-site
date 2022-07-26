/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import components from "../util/components";
import formattedDate from "../util/formattedDate";

export const Post = (props) => {
  const theme = useTheme();
  const titleColorClasses = {
    blue: "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500",
    teal: "from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-300 to-pink-500",
    purple:
      "from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500",
    orange:
      "from-orange-300 to-orange-600 dark:from-orange-200 dark:to-orange-500",
    yellow:
      "from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500",
  };

  const formattedDateStr = formattedDate(props.date);

  return (
    <Section className="flex-1">
      <Container className={`flex-1 max-w-4xl pb-2`} size="large">
        <h2
          data-tinafield="title"
          className={`w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
        >
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${
              titleColorClasses[theme.color]
            }`}
          >
            {props.title}
          </span>
        </h2>
        <div
          data-tinafield="author"
          className="flex items-center justify-center mb-16"
        >
          {props.author && (
            <>
              <div className="flex-shrink-0 mr-4">
                <img
                  className="h-14 w-14 object-cover rounded-full shadow-sm"
                  src={props.author.avatar}
                  alt={props.author.name}
                />
              </div>
              <p className="text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                {props.author.name}
              </p>
              <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                —
              </span>
            </>
          )}
          <p
            data-tinafield="date"
            className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150"
          >
            {formattedDateStr}
          </p>
        </div>
        {props.heroImg && (
          <div data-tinafield="heroImg" className="mb-14">
            <img
              src={props.heroImg.image}
              className="block h-auto mx-auto"
            />
            {props.heroImg.imageBy && props.heroImg.imageFrom && (
              <div className="text-center mt-2 text-sm opacity-70">
                Image by <a href={props.heroImg.imageBy.url} className="hover:opacity-80 underline">{props.heroImg.imageBy.text}</a> from  <a href={props.heroImg.imageFrom.url} className="hover:opacity-80 underline">{props.heroImg.imageFrom.text}</a>
              </div>
            )}
          </div>
        )}
      </Container>
      <Container className={`flex-1 max-w-4xl pt-4`} size="large">
        <div className="prose dark:prose-dark  w-full max-w-none">
          <TinaMarkdown components={components} content={props._body} />
        </div>
      </Container>
    </Section>
  );
};
