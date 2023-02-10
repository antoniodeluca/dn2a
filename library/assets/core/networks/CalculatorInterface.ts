interface Calculator {
    evaluate: (expression: string, scope: unknown) => number;
}

export { Calculator };
