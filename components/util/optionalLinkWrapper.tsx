import * as React from "react";

const OptionalLinkWrapper = ({ hyperlink, children }) => {
  return hyperlink ? (
    <a href={hyperlink}>{children}</a>
  ) : children
}

export default OptionalLinkWrapper
