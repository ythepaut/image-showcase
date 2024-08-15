import { getStaticProps } from "../../src/pages";
import { expect } from "@jest/globals";

describe("Home Page", () => {
  it("should fetch i18n messages", async () => {
    const response = (await getStaticProps({ locale: "en" })) as any;
    expect(response.props.messages).toBeTruthy();
  });
});
