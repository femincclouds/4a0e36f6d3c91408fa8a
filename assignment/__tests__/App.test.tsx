import { render } from "@testing-library/react-native";
import Home from "../src/screens/Home";
import CreateSlots from "../src/screens/CreateSlots";
import RegisterSlots from "../src/screens/RegisterSlots";
import ClearSlots from "../src/screens/ClearSlots";

describe("App suite", () => {
  it("works", () => {
    const test = true;
    expect(test).toBe(true);
  });

  it("renders home", () => {
    render(<Home navigation={{ navigate: () => {} }} />);
  });

  it("renders create screen", () => {
    render(<CreateSlots navigation={{ goBack: () => {} }} />);
  });

  it("renders register", () => {
    render(<RegisterSlots navigation={{ goBack: () => {} }} />);
  });

  it("renders clear screen", () => {
    render(<ClearSlots navigation={{ goBack: () => {} }} />);
  });

  it("matches home snapshot", () => {
    const tree = render(<Home navigation={{ navigate: () => {} }} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("matches create screen snapshot", () => {
    const tree = render(<CreateSlots navigation={{ goBack: () => {} }} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("matches register screen snapshot", () => {
    const tree = render(<RegisterSlots navigation={{ goback: () => {} }} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("matches clear screen snapshot", () => {
    const tree = render(<ClearSlots navigation={{ goBack: () => {} }} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("matches create screen testid", () => {
    const tree = render(<CreateSlots navigation={{ goBack: () => {} }} />);
    expect(tree.findByTestId("parking-create-text-input")).toBeTruthy();
  });
});
