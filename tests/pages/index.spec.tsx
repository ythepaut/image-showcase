import HomePage, { getStaticProps } from "../../src/pages";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";

describe("Home Page", () => {
  it("should render", () => {
    // When
    render(<HomePage images={[]} messages={{}} />);

    // Then
    const sectionElement = screen.getByRole("region");
    expect(sectionElement).toBeInTheDocument();
  });

  it("should fetch i18n messages", async () => {
    // When
    const response = (await getStaticProps({ locale: "en" })) as any;
    // Then
    expect(response.props.messages).toBeTruthy();
  });
});
