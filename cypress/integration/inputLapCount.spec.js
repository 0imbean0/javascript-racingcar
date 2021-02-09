import { SELECTOR, MESSAGE } from "../../src/js/constants.js";

describe("시도할 횟수 입력하기", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
    cy.window().then((win) => cy.stub(win, "alert").as("windowAlert"));
    cy.get(SELECTOR.CAR_NAME.INPUT).type("EAST, WEST, SOUTH, NORTH");
    cy.get(SELECTOR.CAR_NAME.BUTTON).click();
  });

  const testFailCase = (userInput, errorMessage) => {
    cy.get(SELECTOR.LAP_COUNT.INPUT).type(userInput);
    cy.get(SELECTOR.LAP_COUNT.BUTTON).click();

    cy.get("@windowAlert").should("be.calledWith", errorMessage);
    cy.get(SELECTOR.LAP_COUNT.INPUT).should("have.text", "");
  };

  // TODO: "10+10"  사용자가 입력하는 것과 cypress type이 상이한 것으로 보여짐. 검토 필요
  it("시도할 횟수는 숫자이다.", () => {
    [" ", "+-", "ㄱ", "10+10"].forEach((userInput) =>
      testFailCase(userInput, MESSAGE.LAP_COUNT.NOT_A_NUMBER)
    );
  });

      cy.get("@windowAlert").should(
        "be.calledWith",
        MESSAGE.LAP_COUNT.NOT_A_NUMBER
      );
      cy.get(SELECTOR.LAP_COUNT.INPUT).should("have.text", "");
    });
  });
});
