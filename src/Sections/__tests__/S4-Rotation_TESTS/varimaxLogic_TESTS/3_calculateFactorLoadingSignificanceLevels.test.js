import calculateFactorLoadingSignificanceLevel from "../../../Rotation/varimaxLogic/3_calculateFactorLoadingSignificanceLevel";

const parameter1 = 33;

const testValue1 = 0.34119;

test("calculate factor loading significance levels", () => {
  const value1 = calculateFactorLoadingSignificanceLevel(parameter1);
  expect(value1).toEqual(testValue1);
});
